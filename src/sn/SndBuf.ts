/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2023-2025 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {CmnLib, type IEvtMng, argChk_Boolean, argChk_Num} from './CmnLib';
import type {T_Variable, T_Main} from './CmnInterface';
import {SEARCH_PATH_ARG_EXT} from './ConfigBase';
import type {Config} from './Config';
import type {SysBase} from './SysBase';
import type {TArg} from './Grammar';
import {CmnTween} from './CmnTween';
import {Reading} from './Reading';

import {Loader, LoaderResource} from 'pixi.js';
import {sound, Sound, type Options, filters} from '@pixi/sound';
import {Tween, remove} from '@tweenjs/tween.js'

class SndInf {
	static	 #vol_mul_talking = 1;

	stt		: ISndState;
	loop	= false;

	readonly	#proc_id;
	get procID() {return this.#proc_id}

	constructor(
			readonly	fn		: string,
			readonly	buf		: string,
			readonly	start_ms: number,
			readonly	end_ms	: number,
			readonly	ret_ms	: number,
	private	readonly	volume	: number,
			readonly	pan		: number,
	public				snd		: Sound | null,
	) {
		this.stt = snd ?new SsPlaying(this) :new SsLoading(this);
		this.#proc_id = Reading.procID;
		if (snd) this.addSnd(snd);
	}
	addSnd(snd: Sound) {
		this.snd = snd;
		this.loop = snd.loop;
	//	if (! this.loop) sound.add(this.fn, snd);	// 手動キャッシュすると単発連打で無音に

		this.stt.onLoad(this);
		if (this.pan !== 0) snd.filters = [new filters.StereoFilter(this.pan)];

		this.setVol = vol=> {snd.volume = vol};
		this.tw = ()=> new Tween(snd);
		this.onPlayEnd = ()=> {this.stt.onPlayEnd(this.buf); this.#onStop()};
		this.stop = ()=> {snd.stop(); this.#onStop()};
		this.destroy = ()=> snd.destroy();

		// タブのミュート中や AudioContext.state === 'suspended' の場合は
		//	再生もされないので再生終了イベントも発生しないため、タイマーで擬似的に発生させる
		if (! this.loop && CmnLib.needClick2Play()) {
			setTimeout(()=> this.onPlayEnd(), (
				snd.duration
				-this.start_ms
				-(this.end_ms <= 0
					// 負の値は「末尾から何ms手前を終端とするか」
					? this.end_ms
					// 正の値は「冒頭から何ms目を終端とするか」
					: this.end_ms === SndBuf.MAX_END_MS
					? 0		// ありえない巨大定数 = 音声ファイルの末端
					: snd.duration -this.end_ms)
			) *1000);
		}

		switch (this.buf) {		// セリフ再生中はBGM音量を絞る
			case BUF_VOICE:{
				const v = Number(val.getVal('sys:sn.sound.BGM.vol_mul_talking') ?? 1);		// 歴史的経緯で ??
				if (v === 1) break;

				SndInf.#vol_mul_talking = v;
				const b = hSndBuf[BUF_BGM];
				if (b) b.setVol(this.volume * SndInf.#vol_mul_talking);
			}	break;

			case BUF_BGM:
				snd.volume = this.volume * SndInf.#vol_mul_talking;
				break;
		}
	}
		#onStop = ()=> {
			this.#onStop = ()=> { /* empty */ };
			if (SndInf.#vol_mul_talking === 1 || this.buf !== BUF_VOICE) return;

			// ボリュームを戻す
			SndInf.#vol_mul_talking = 1;
			const b = hSndBuf[BUF_BGM];
			if (b) b.setVol(this.volume * SndInf.#vol_mul_talking);
		}

	setVol(_vol: number) { /* empty */ }
	tw(): Tween<Sound> | undefined {return undefined}
	onPlayEnd() { /* empty */ }
	stop() { /* empty */ }
	destroy() { /* empty */ }
}


let cfg	: Config;
let val	: T_Variable;
let main: T_Main;
let sys	: SysBase;
let hSndBuf	: HSndBuf;

let evtMng	: IEvtMng;

export type HSndBuf = {[buf: string]: SndBuf}
export	const	BUF_BGM		= 'BGM';
export	const	BUF_SE		= 'SE';
		const	BUF_VOICE	= 'VOICE';


export class SndBuf {
	static	#hLP	: {[buf: string]: string}	= {};
	static	init($cfg: Config, $val: T_Variable, $main: T_Main, $sys: SysBase, $hSndBuf: HSndBuf) {
		SndBuf.#hLP = {};
		cfg	= $cfg;
		val	= $val;
		main= $main;
		sys	= $sys;
		hSndBuf	= $hSndBuf;
	}
	static	setEvtMng($evtMng: IEvtMng) {evtMng = $evtMng}
	static	delLoopPlay(buf: string): void {
		// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
		delete SndBuf.#hLP[buf];
		const vn = 'const.sn.sound.'+ buf +'.';
		val.setVal_Nochk('save', vn +'fn', '');
		val.setVal_Nochk('save', 'const.sn.loopPlaying', JSON.stringify(SndBuf.#hLP));
		val.flush();
	}
	static	getVol(hArg: TArg, def: number): number {
		const vol = argChk_Num(hArg, 'volume', def);
		if (vol < 0) return 0;
		if (vol > 1) return 1;
		return vol;
	}
	static	xchgbuf({buf: buf1 = BUF_SE, buf2 = BUF_SE}: TArg) {
		if (buf1 === buf2) throw `[xchgbuf] buf:${buf1} が同じ値です`;

		const n1 = 'const.sn.sound.'+ buf1 +'.';
		const v1 = Number(val.getVal('save:'+ n1 +'volume'));
		const f1 = String(val.getVal('save:'+ n1 +'fn'));
		const n2 = 'const.sn.sound.'+ buf2 +'.';
		const v2 = Number(val.getVal('save:'+ n2 +'volume'));
		const f2 = String(val.getVal('save:'+ n2 +'fn'));
		val.setVal_Nochk('save', n1 +'volume', v2);
		val.setVal_Nochk('save', n2 +'volume', v1);
		val.setVal_Nochk('save', n1 +'fn', f2);
		val.setVal_Nochk('save', n2 +'fn', f1);

		if (buf1 in SndBuf.#hLP !== buf2 in SndBuf.#hLP) {	// 演算子の優先順位確認済
			if (buf1 in SndBuf.#hLP)
					// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
					{delete SndBuf.#hLP[buf1]; SndBuf.#hLP[buf2] = f1}
			// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
			else	{delete SndBuf.#hLP[buf2]; SndBuf.#hLP[buf1] = f2}
			val.setVal_Nochk('save', 'const.sn.loopPlaying', JSON.stringify(SndBuf.#hLP));
		}
		val.flush();
	}


	static	readonly	MAX_END_MS	= 999000;


	readonly #si		: SndInf;
	readonly needLoad;


	constructor(
		readonly hArg	: TArg,
		readonly buf	: string,
		readonly fn		: string,
	) {
		const start_ms = argChk_Num(hArg, 'start_ms', 0);
		const end_ms = argChk_Num(hArg, 'end_ms', SndBuf.MAX_END_MS);
		const ret_ms = argChk_Num(hArg, 'ret_ms', 0);
		const pan = argChk_Num(hArg, 'pan', 0);
		const speed = argChk_Num(hArg, 'speed', 1);

		if (start_ms < 0) throw `[playse] start_ms:${String(start_ms)} が負の値です`;
		if (ret_ms < 0) throw `[playse] ret_ms:${String(ret_ms)} が負の値です`;
		if (0 < end_ms) {
			if (end_ms <= start_ms) throw `[playse] start_ms:${String(start_ms)} >= end_ms:${String(end_ms)} は異常値です`;
			if (end_ms <= ret_ms) throw `[playse] ret_ms:${String(ret_ms)} >= end_ms:${String(end_ms)} は異常値です`;
		}

		// この辺で属性を増減したら、loadFromSaveObj()にも反映する
		const vn = 'const.sn.sound.'+ buf +'.';
		val.setVal_Nochk('save', vn +'fn', fn);
		const savevol = SndBuf.getVol(hArg, 1);
		val.setVal_Nochk('save', vn +'volume', savevol);// 目標音量（save:）
		const volume = savevol * Number(val.getVal('sys:'+ vn +'volume', 1, true));

		const loop = argChk_Boolean(hArg, 'loop', false);
		if (loop) {
			SndBuf.#hLP[buf] = fn;
			val.setVal_Nochk('save', 'const.sn.loopPlaying', JSON.stringify(SndBuf.#hLP));
		}
		else SndBuf.delLoopPlay(buf);
		val.setVal_Nochk('save', vn +'start_ms', start_ms);
		val.setVal_Nochk('save', vn +'end_ms', end_ms);
		val.setVal_Nochk('save', vn +'ret_ms', ret_ms);
		val.setVal_Nochk('tmp', vn +'playing', true);
		val.flush();

		const snd = <Sound | null>sound.find(fn);	// キャッシュにあるか
		this.#si = new SndInf(
			fn,
			buf,
			start_ms,
			end_ms,
			ret_ms,
			volume,
			pan,
			snd,
		);
		// @pixi/sound用基本パラメータ
		const o: Options = {
			loop,
			speed,
			volume,
			loaded	: (e: unknown, s2)=> {
				if (this.#si.stt.isDestroy) return;
				// eslint-disable-next-line @typescript-eslint/no-base-to-string
				if (e) {main.errScript(`ロード失敗です SndBuf fn:${fn} ${String(e)}`, false); return}
				if (! s2) return;

				this.#si.addSnd(s2);
				if (pan !== 0) s2.filters = [new filters.StereoFilter(pan)];
			//	if (! o.loop) sound.add(fn, snd);	// 手動キャッシュすると単発連打で無音に
				hArg.fnc?.();
			},
		};

		// start_ms・end_ms機能→@pixi/sound準備
		let sp_nm = '';
		if (0 < start_ms || end_ms < SndBuf.MAX_END_MS) {
			sp_nm = `${fn};${String(start_ms)};${String(end_ms)};${String(ret_ms)}`;
			const os = (o.sprites ??= {})[sp_nm] = {
				start	: start_ms /1000,
				end		: end_ms /1000,
			};
			o.preload = true;		// loaded発生用、トラブルの元なので使用を控えたい
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const old = o.loaded!;
			o.loaded = (e, s0)=> {
				if (this.#si.stt.isDestroy) return;

				old(e, s0);
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				const s2 = s0!;
				const d = s2.duration;
				if (os.end < 0) {	// 負の値は末尾から
					os.end += d;
					s2.removeSprites(sp_nm);
					s2.addSprites(sp_nm, os);
				}
				if (os.end <= os.start) main.errScript(`[playse] end_ms:${String(end_ms)}(${String(os.end *1000)}) >= start_ms:${String(start_ms)} は異常値です`);
				if (os.end *1000 <= ret_ms) main.errScript(`[playse] end_ms:${String(end_ms)}(${String(os.end *1000)}) <= ret_ms:${String(ret_ms)} は異常値です`);
				if (d <= os.start) main.errScript(`[playse] 音声ファイル再生時間:${String(d *1000)} <= start_ms:${String(start_ms)} は異常値です`);
				if (end_ms !== SndBuf.MAX_END_MS && d <= os.end) main.errScript(`[playse] 音声ファイル再生時間:${String(d *1000)} <= end_ms:${String(end_ms)} は異常値です`);

				void s2.play(sp_nm, snd=> o.complete?.(snd));
					// 流れ的にはすぐ下の「ループなし/あり」を呼ぶ
			};
		}
		else o.autoPlay = true;

		// ループなし ... 再生完了イベント
		if (! loop) o.complete = ()=> {
			stop2var(this.#si, buf);
			this.#si.onPlayEnd();
		};
		// ループあり ... ret_ms処理
		else if (ret_ms !== 0) {
			o.loop = false;	// 一周目はループなしとする
			o.complete = snd=> {
				const d = snd.duration;
				const start	= ret_ms /1000;
				const end	= end_ms /1000;
				if (d <= start) main.errScript(`[playse] 音声ファイル再生時間:${String(d *1000)} <= ret_ms:${String(ret_ms)} は異常値です`);

				void snd.play({	// 一周目はループなし、なのでキャッシュされてる
					...o,
					start,
					end		: end < 0 ?end +d :end,// 負の値は末尾から
				//	speed,		// 重複
					loop	: true,
				//	volume,		// 重複
				//-	muted?: boolean;
					filters	: pan !== 0 ?[new filters.StereoFilter(pan)] :[],
				//-	complete?: CompleteCallback;
				//-	loaded?: LoadedCallback;
				//-	singleInstance?: boolean;
				});
				//不要 this.#sb.snd = snd;	// this.#sb.snd === snd (true)
			};
		}

		this.#initVol();
		if (snd) {
			snd.volume = volume;	// 再生のたびに音量を戻す
			if (sp_nm) this.#playseSub(fn, o);
			else if (snd.isPlayable) {
				const ab = snd.options.source;
				if (! (ab instanceof ArrayBuffer)
					|| ab.byteLength === 0) void snd.play(o);
				else this.#si.addSnd(Sound.from({
					...o,
					url		: snd.options.url,
					source	: ab,
				}));
			}
			if (pan !== 0) snd.filters = [new filters.StereoFilter(pan)];
			this.needLoad = false;
			return;
		}

		const join = this.needLoad = argChk_Boolean(hArg, 'join', true);
		// an時代・瀬戸愛羅さんより https://famibee.blog.fc2.com/blog-entry-106.html
		// デフォルトでjoin=trueの方が初心者に優しい
		if (join) {
			const RPN_LOADED = this.#si.procID +`loaded buf:${buf} fn:${fn}`;
			Reading.beginProc(RPN_LOADED);
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const old = o.loaded!;
			o.loaded = (e, s2)=> {
				old(e, s2);
				Reading.endProc(RPN_LOADED);
			};
		}
		this.#playseSub(fn, o);
	}
	#initVol = ()=> {
		sound.volumeAll = Number(val.getVal('sys:sn.sound.global_volume', 1));
		this.#initVol = ()=> { /* empty */ };
	};
	#playseSub(fn: string, o: Options) {
		const src = cfg.searchPath(fn, SEARCH_PATH_ARG_EXT.SOUND);
		if (! src.endsWith('.bin')) {o.url = src; Sound.from(o); return}

		(new Loader).add({name: fn, url: src, xhrType: LoaderResource.XHR_RESPONSE_TYPE.BUFFER,})
		.use((res, next)=> {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			void sys.decAB(res.data).then(y=> {res.data = y})
			.catch((e: unknown)=> main.errScript(`Sound ロード失敗ですc fn:${res.name} ${String(e)}`, false))
			.finally(()=> next());
		})
		.load((_ldr, hRes)=> {	// このあと o.loaded() もコールされる
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			o.source = hRes[fn]?.data;
			Sound.from(o);
		});
	}


	setVol(vol: number) {this.#si.setVol(vol)}

	ws =(hArg: TArg)=> this.#si.stt.ws(this.#si, hArg);
	stopse({buf = BUF_SE}: TArg) {
		stop2var(this.#si, buf);
		this.#si.stt.stopse(this.#si);
	}

	fade =(hArg: TArg)=> this.#si.stt.fade(this.#si, hArg);
	wf =(hArg: TArg)=> this.#si.stt.wf(this.#si, hArg);
	stopfadese =(hArg: TArg)=> this.#si.stt.stopfadese(this.#si, hArg);

}


// =================================================
function stop2var({loop}: SndInf, buf: string) {
	if (loop) {SndBuf.delLoopPlay(buf); return}

	const vn = 'const.sn.sound.'+ buf +'.';
	val.setVal_Nochk('tmp', vn +'playing', false);
	val.flush();
}

// =================================================


type ISndState = {
	// type も class に implements できるらしい！ https://qiita.com/tkrkt/items/d01b96363e58a7df830e
	onLoad(si: SndInf)	: void;
	stopse(si: SndInf)	: void;
	ws(si: SndInf, hArg: TArg): boolean;
	onPlayEnd(buf: string)	: void;
	fade(si: SndInf, hArg: TArg): void;
	wf(si: SndInf, hArg: TArg): boolean;
	compFade(buf: string)	: void;
	stopfadese(si: SndInf, hArg: TArg): void;
	isDestroy	: boolean;
}

class SsLoading implements ISndState {
	constructor(readonly si: SndInf) {}
	onLoad(si: SndInf)	{si.stt = new SsPlaying(si)}
	stopse(si: SndInf)	{si.stt = new SsStop(si, false)}
	ws =()=> false;
	onPlayEnd() {this.si.stt = new SsStop(this.si, false)}	// ok
	fade() { /* empty */ }			// ok
	wf =()=> false;					// ok
	compFade() { /* empty */ }		// ok
	stopfadese() { /* empty */ }	// ok
	readonly	isDestroy	= false;
}

class SsPlaying implements ISndState {
	constructor(readonly si: SndInf) {}
	onLoad() { /* empty */ }		// ok
	stopse(si: SndInf)	{si.stt = new SsStop(si)}
	ws(si: SndInf, hArg: TArg) {
		if (si.loop) return false;

		si.stt = new SsWaitingStop(si);
		const canskip = argChk_Boolean(hArg, 'canskip', false);
		const stop = argChk_Boolean(hArg, 'stop', true);
		if (canskip && evtMng.isSkipping) {
			if (stop) si.stt.stopse(si); else si.stt.onPlayEnd = ()=> { /* empty */ };
			return false;
		}

		const {buf = BUF_SE} = hArg;
		const fin = ()=> {
			stop2var(si, buf);
			si.onPlayEnd();	// まず一回やる
			if (stop) si.stt.stopse(si); else si.stt.onPlayEnd = ()=> { /* empty */ };
				// else後は SsWaitingStop か SsStop の想定
		};
		Reading.beginProc(si.procID +'ws', fin, true, canskip ?fin :undefined);
		return true;
	}
	onPlayEnd() {this.si.stt = new SsStop(this.si, false)}	// ok
	fade(si: SndInf, hArg: TArg) {
		const {buf = BUF_SE} = hArg;

		const vn = 'const.sn.sound.'+ buf +'.';
		const bnV = vn +'volume';
		const savevol = SndBuf.getVol(hArg, NaN);
		val.setVal_Nochk('save', bnV, savevol);	// 目標音量（save:）
		const vol = savevol * Number(val.getVal('sys:'+ bnV, 1))
		const stop = argChk_Boolean(hArg, 'stop', savevol === 0);
			// this.getVol() により savevol = hArg.volume
		if (stop) SndBuf.delLoopPlay(buf);	// fade中reloadなど、できるだけ早く情報更新か
		val.flush();

		const time = argChk_Num(hArg, 'time', NaN);
		const delay = argChk_Num(hArg, 'delay', 0);
		if (time === 0 && delay === 0 || evtMng.isSkipping) {
			si.setVol(vol);
			si.stt = stop ? new SsStop(si) : new SsPlaying(si);
			return;
		}

		if (! si.snd) return
// console.log(`fadese start buf:${buf} from:%f to:%f`, si.snd.volume, vol);
		const tw = si.tw();
		if (! tw) return;

		CmnTween.setTwProp(tw, hArg)
		.to({volume: vol}, time)
		.onUpdate((d: {volume: number})=> {
			if (si.snd?.isPlaying) {si.snd.volume = d.volume; return}

			// レア発生の不具合対応
			//	以下のエラーの対策。ただ、レア発生ゆえにこれで直ったかが確認できていない
/*
pixi-sound.esm.mjs:9 Uncaught TypeError: Cannot read properties of null (reading 'length')
    at n.refresh (pixi-sound.esm.mjs:9:21344)
    at n.set (pixi-sound.esm.mjs:9:21627)
    at e._updateProperties (tween.esm.js:805:37)
    at e.update (tween.esm.js:731:14)
    at e.update (tween.esm.js:263:36)
    at #e [as fn] (CmnTween.ts:40:27)
    at i.emit (ticker.mjs:98:22)
    at i.update (ticker.mjs:458:37)
    at _tick (ticker.mjs:226:23)
n.refresh @ pixi-sound.esm.mjs:9
*/
			tw.stop();
			tw.onComplete();
		})
		.onComplete(()=> {
			remove(tw);
			si.stt.compFade(buf);
			si.stt = stop ? new SsStop(si) : new SsPlaying(si);
		})
		.start();

		si.stt = new SsFade(tw, si);
	}
	wf =()=> false;					// ok
	compFade() { /* empty */ }		// ok
	stopfadese() { /* empty */ }	// ok
	readonly	isDestroy	= false;
}

class SsWaitingStop implements ISndState {
	constructor(readonly si: SndInf) {}
	onLoad() { /* empty */ }		// ok
	stopse(si: SndInf)	{si.stt = new SsStop(si)}
	ws =()=> false;					// ok
	onPlayEnd()	{					// ok
		this.si.stt = new SsStop(this.si, false);
		Reading.notifyEndProc(this.si.procID +'ws');
	}
	fade() { /* empty */ }			// ok
	wf =()=> false;					// ok
	compFade() { /* empty */ }		// ok
	stopfadese() { /* empty */ }	// ok
	readonly	isDestroy	= false;
}

class SsFade implements ISndState {
	constructor(readonly tw: Tween<Sound>, private readonly si: SndInf) {}
	onLoad() { /* empty */ }		// ok
	stopse(si: SndInf)	{this.stopfadese(); si.stt = new SsStop(si)}	// 順番厳守
	ws =()=> false;					// ok ?
	onPlayEnd() {this.stopfadese(); this.si.stt = new SsStop(this.si, false)}	// ok
	fade() { /* empty */ }			// ok
	wf(si: SndInf, hArg: TArg) {
		si.stt = new SsWaitingFade(si);
		const canskip = argChk_Boolean(hArg, 'canskip', false);
		if (canskip && evtMng.isSkipping) {this.stopfadese(); return false}

		const fin = ()=> this.stopfadese();
		Reading.beginProc(si.procID +'wf', fin, true, canskip ?fin :undefined);
		return true;
	}
	compFade() { /* empty */ }		// ok
	stopfadese =()=> this.si.stop();
	readonly	isDestroy	= false;
}

class SsWaitingFade implements ISndState {
	constructor(private readonly si: SndInf) {}
	onLoad() { /* empty */ }		// ok
	stopse(si: SndInf)	{this.stopfadese(); si.stt = new SsStop(si)}
	ws =()=> false;					// ok
	onPlayEnd() {this.stopfadese(); this.si.stt = new SsStop(this.si, false)}	// ok
	fade() { /* empty */ }			// ok
	wf =()=> false;					// ok
	compFade() {Reading.notifyEndProc(this.si.procID +'wf')}
	stopfadese =()=> this.si.stop();
	readonly	isDestroy	= false;
}

class SsStop implements ISndState {
	constructor(readonly si: SndInf, readonly stop = true) {
		if (! stop) return;

		si.stop();
		if (! si.loop) return;	// destroy がないと再生が残るケースが。効果音だと破棄が激しいのでループモノ(BGM)だけにする

		si.destroy();
		si.destroy = ()=> { /* empty */ };	// 再度コール時エラー対策
	}
	onLoad() { /* empty */ }		// ok
	stopse() {/* empty */ }			// ok
	ws =()=> false;					// ok
	onPlayEnd() {/* empty */ }		// ok
	fade() { /* empty */ }			// ok
	wf =()=> false;		// ok
	compFade() { /* empty */ }		// ok
	stopfadese() { /* empty */ }	// ok
	readonly	isDestroy	= true;
}
