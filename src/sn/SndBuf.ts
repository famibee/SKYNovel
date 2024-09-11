/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2023-2024 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {IEvtMng, argChk_Boolean, argChk_Num} from './CmnLib';
import {IVariable, IMain} from './CmnInterface';
import {SEARCH_PATH_ARG_EXT} from './ConfigBase';
import {Config} from './Config';
import {SysBase} from './SysBase';
import {HArg} from './Grammar';
import {CmnTween} from './CmnTween';
import {disableEvent, enableEvent} from './ReadState';

import {Loader, LoaderResource} from 'pixi.js';
import {sound, Sound, Options, filters} from '@pixi/sound';
import {Tween, remove} from '@tweenjs/tween.js'

interface ISndBuf {
	fn		: string;
	stt		: ISndState;
	snd		: Sound;
	loop	: boolean;
	start_ms: number;
	end_ms	: number;
	ret_ms	: number;
	pan		: number;
}

let cfg	: Config;
let val	: IVariable;
let main: IMain;
let sys	: SysBase;
let evtMng	: IEvtMng;

export class SndBuf {
	static	#hLP	: {[buf: string]: string}	= {};
	static	init($cfg: Config, $val: IVariable, $main: IMain, $sys: SysBase) {
		SndBuf.#hLP = {};
		cfg	= $cfg;
		val	= $val;
		main= $main;
		sys	= $sys;
	}
	static	setEvtMng($evtMng: IEvtMng) {evtMng = $evtMng}
	static	delLoopPlay(buf: string): void {
		delete SndBuf.#hLP[buf];
		const vn = 'const.sn.sound.'+ buf +'.';
		val.setVal_Nochk('save', vn +'fn', '');
		val.setVal_Nochk('save', 'const.sn.loopPlaying', JSON.stringify(SndBuf.#hLP));
		val.flush();
	}
	static	getVol(hArg: HArg, def: number): number {
		const vol = argChk_Num(hArg, 'volume', def);
		if (vol < 0) return 0;
		if (vol > 1) return 1;
		return vol;
	}
	static	xchgbuf(hArg: HArg) {
		const {buf: buf1 = 'SE', buf2 = 'SE'} = hArg;
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
					{delete SndBuf.#hLP[buf1]; SndBuf.#hLP[buf2] = f1}
			else	{delete SndBuf.#hLP[buf2]; SndBuf.#hLP[buf1] = f2}
			val.setVal_Nochk('save', 'const.sn.loopPlaying', JSON.stringify(SndBuf.#hLP));
		}
		val.flush();
	}


	#sb		: ISndBuf;

	#fn		= '';
	get fn() {return this.#fn}

	static	readonly	#MAX_END_MS	= 999000;
	init(hArg: HArg): boolean {
		const {buf = 'SE', fn = ''} = hArg;
		this.#fn = fn;

		const start_ms = argChk_Num(hArg, 'start_ms', 0);
		const end_ms = argChk_Num(hArg, 'end_ms', SndBuf.#MAX_END_MS);
		const ret_ms = argChk_Num(hArg, 'ret_ms', 0);
		const pan = argChk_Num(hArg, 'pan', 0);
		const speed = argChk_Num(hArg, 'speed', 1);

		if (start_ms < 0) throw `[playse] start_ms:${start_ms} が負の値です`;
		if (ret_ms < 0) throw `[playse] ret_ms:${ret_ms} が負の値です`;
		if (0 < end_ms) {
			if (end_ms <= start_ms) throw `[playse] start_ms:${start_ms} >= end_ms:${end_ms} は異常値です`;
			if (end_ms <= ret_ms) throw `[playse] ret_ms:${ret_ms} >= end_ms:${end_ms} は異常値です`;
		}

		// この辺で属性を増減したら、loadFromSaveObj()にも反映する
		const vn = 'const.sn.sound.'+ buf +'.';
		val.setVal_Nochk('save', vn +'fn', fn);
		const savevol = SndBuf.getVol(hArg, 1);
		val.setVal_Nochk('save', vn +'volume', savevol);// 目標音量（save:）
		const volume = savevol * Number(val.getVal('sys:'+ vn +'volume', 1));

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

		const snd = sound.find(fn);	// キャッシュにあるか
		this.#sb = {
			fn,
			stt		: snd ?new SsPlaying :new SsLoading,
			snd,
			loop,
			start_ms,
			end_ms,
			ret_ms	: 0,
			pan,
		};
		// @pixi/sound用基本パラメータ
		const o: Options = {
			loop,
			speed,
			volume,
			loaded	: (e, s2)=> {
				if (this.#sb.stt.isDestroy) return;
				if (e) {main.errScript(`Sound ロード失敗ですa fn:${fn} ${e}`, false); return}
				if (! s2) return;

				this.#sb.snd = s2;
				this.#sb.stt.onLoad(this.#sb);
				if (pan !== 0) s2.filters = [new filters.StereoFilter(pan)];
			//	if (! o.loop) sound.add(fn, snd);	// 手動キャッシュすると単発連打で無音に
				hArg.fnc?.();
			},
		};

		// start_ms・end_ms機能→@pixi/sound準備
		let sp_nm = '';
		if (0 < start_ms || end_ms < SndBuf.#MAX_END_MS) {
			sp_nm = `${fn};${start_ms};${end_ms};${ret_ms}`;
			const os = (o.sprites ??= {})[sp_nm] = {
				start	: start_ms /1000,
				end		: end_ms /1000,
			};
			o.preload = true;		// loaded発生用、トラブルの元なので使用を控えたい
			const old = o.loaded!;
			o.loaded = (e, s0)=> {
				if (this.#sb.stt.isDestroy) return;

				old(e, s0);
				const s2 = s0!;
				const d = s2.duration;
				if (os.end < 0) {	// 負の値は末尾から
					os.end += d;
					s2.removeSprites(sp_nm);
					s2.addSprites(sp_nm, os);
				}
				if (os.end <= os.start) main.errScript(`[playse] end_ms:${end_ms}(${os.end *1000}) >= start_ms:${start_ms} は異常値です`);
				if (os.end *1000 <= ret_ms) main.errScript(`[playse] end_ms:${end_ms}(${os.end *1000}) <= ret_ms:${ret_ms} は異常値です`);
				if (d <= os.start) main.errScript(`[playse] 音声ファイル再生時間:${d *1000} <= start_ms:${start_ms} は異常値です`);
				if (end_ms !== SndBuf.#MAX_END_MS && d <= os.end) main.errScript(`[playse] 音声ファイル再生時間:${d *1000} <= end_ms:${end_ms} は異常値です`);

				s2.play(sp_nm, snd=> {
					o.complete?.(snd);	// 流れ的にはすぐ下の「ループなし/あり」を呼ぶ
					if (! loop) this.#sb.stt.onPlayEnd(buf);
				});
			};
		}
		else o.autoPlay = true;

		// ループなし ... 再生完了イベント
		if (! loop) o.complete = ()=> {stop2var(this.#sb, buf); this.#sb.stt.onPlayEnd(buf)};
		// ループあり ... ret_ms処理
		else if (ret_ms !== 0) {
			o.loop = false;	// 一周目はループなしとする
			o.complete = async snd=> {
				const d = snd.duration;
				const start	= ret_ms /1000;
				const end	= end_ms /1000;
				if (d <= start) main.errScript(`[playse] 音声ファイル再生時間:${d *1000} <=  ret_ms:${ret_ms} は異常値です`);

				await snd.play({	// 一周目はループなし、なのでキャッシュされてる
					...o,
					start,
					end		: (end < 0) ?end +d :end,// 負の値は末尾から
				//	speed,		// 重複
					loop	: true,
				//	volume,		// 重複
				//-	muted?: boolean;
					filters	: (pan !== 0) ?[new filters.StereoFilter(pan)] :[],
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
					|| ab.byteLength === 0) snd.play(o);
				else {
					this.#sb.snd = Sound.from({
					...o,
					url		: snd.options.url,
					source	: ab,
				})}
				if (pan !== 0) snd.filters = [new filters.StereoFilter(pan)];
			}
			return false;
		}

		const join = argChk_Boolean(hArg, 'join', true);
		if (join) {
			disableEvent();
			const old = o.loaded!;
			o.loaded = (e, s2)=> {
				if (! this.#sb.stt.isDestroy) old(e, s2);
				enableEvent();
			};
		}
		this.#playseSub(fn, o);

		return join;
	}
	#initVol = ()=> {
		sound.volumeAll = Number(val.getVal('sys:sn.sound.global_volume', 1));
		this.#initVol = ()=> {};
	};
	#playseSub(fn: string, o: Options): void {
		const url = cfg.searchPath(fn, SEARCH_PATH_ARG_EXT.SOUND);
	//	const url = 'http://localhost:8080/prj/audio/title.{ogg,mp3}';
		if (url.slice(-4) !== '.bin') {
			o.url = url;
			Sound.from(o);
			return;
		}

		(new Loader).add({name: fn, url, xhrType: LoaderResource.XHR_RESPONSE_TYPE.BUFFER,})
		.use(async (res, next)=> {
			try {
				res.data = await sys.decAB(res.data);
			} catch (e) {
				main.errScript(`Sound ロード失敗ですc fn:${res.name} ${e}`, false);
			}
			next();
		})
		.load((_ldr, hRes)=> {	// このあと o.loaded() もコールされる
			o.source = hRes[fn]?.data;
			Sound.from(o);
		});
	}


	ws =(hArg: HArg)=> this.#sb.stt.ws(this.#sb, hArg);
	stopse(hArg: HArg) {
		const {buf = 'SE'} = hArg;
		stop2var(this.#sb, buf);
		this.#sb.stt.stopse(this.#sb);
	}

	fade =(hArg: HArg)=> this.#sb.stt.fade(this.#sb, hArg);
	wf =(hArg: HArg)=> this.#sb.stt.wf(this.#sb, hArg);
	stopfadese =(hArg: HArg)=> this.#sb.stt.stopfadese(this.#sb, hArg);

}


// =================================================
function stop2var(sb: ISndBuf, buf: string): void {
	if (sb.loop) SndBuf.delLoopPlay(buf);
	else {
		const vn = 'const.sn.sound.'+ buf +'.';
		val.setVal_Nochk('tmp', vn +'playing', false);
		val.flush();
	}
}


function stopfadese(tw: Tween<Sound>): void {tw.stop().end()}	// stop()とend()は別

// =================================================


interface ISndState {
	onLoad(sb: ISndBuf)	: void;
	stopse(sb: ISndBuf)	: void;
	ws(sb: ISndBuf, hArg: HArg): boolean;
	onPlayEnd(buf: string)	: void;
	fade(sb: ISndBuf, hArg: HArg): void;
	wf(sb: ISndBuf, hArg: HArg): boolean;
	compFade(buf: string)	: void;
	stopfadese(sb: ISndBuf, hArg: HArg): void;
	isDestroy	: boolean;
}

class SsLoading implements ISndState {
	onLoad(sb: ISndBuf)	{sb.stt = new SsPlaying}
	stopse(sb: ISndBuf)	{sb.stt = new SsStop(sb, false)}
	ws =()=> false;
	onPlayEnd() {}		// ok
	fade() {}			// ok
	wf =()=> false;		// ok
	compFade() {}		// ok
	stopfadese() {}		// ok
	readonly	isDestroy	= false;
}

class SsPlaying implements ISndState {
	onLoad() {}			// ok
	stopse(sb: ISndBuf)	{sb.stt = new SsStop(sb)}
	ws(sb: ISndBuf, hArg: HArg) {
		if (sb.loop) return false;

		const {buf = 'SE'} = hArg;
		const stop = argChk_Boolean(hArg, 'stop', true);
		argChk_Boolean(hArg, 'canskip', false);	// waitEvent() のデフォルトと違うので先行上書き
		if (evtMng.waitEvent('buf:'+ buf, hArg, ()=> {	// 順番固定
			stop2var(sb, buf);
			sb.stt.onPlayEnd(buf);	// まず一回やる
			if (stop) sb.stt.stopse(sb); else sb.stt.onPlayEnd = ()=> {};
				// else後は SsWaitingStop か SsStop の想定
		})) {
			sb.stt = new SsWaitingStop;
			return true;
		}

		return false;
	}
	onPlayEnd() {}		// ok
	fade(sb: ISndBuf, hArg: HArg) {
		const {buf = 'SE'} = hArg;

		const vn = 'const.sn.sound.'+ buf +'.';
		const bnV = vn +'volume';
		const savevol = SndBuf.getVol(hArg, NaN);
		val.setVal_Nochk('save', bnV, savevol);	// 目標音量（save:）
		const vol = savevol * Number(val.getVal('sys:'+ bnV, 1))
		const stop = argChk_Boolean(hArg, 'stop', (savevol === 0));
			// this.getVol() により savevol = hArg.volume
		if (stop) SndBuf.delLoopPlay(buf);	// fade中reloadなど、できるだけ早く情報更新か
		val.flush();

		const time = argChk_Num(hArg, 'time', NaN);
		const delay = argChk_Num(hArg, 'delay', 0);
		if ((time === 0 && delay === 0) || evtMng.isSkipping) {
			sb.snd.volume = vol;
			sb.stt = stop ? new SsStop(sb) : new SsPlaying;
			return;
		}

//console.log('fadese start from:%f to:%f', sb.snd.volume, vol);
		const tw = new Tween(sb.snd);
		CmnTween.setTwProp(tw, hArg)
		.to({volume: vol}, time)
		.onComplete(()=> {
			remove(tw);
			sb.stt.compFade(buf);
			sb.stt = stop ? new SsStop(sb) : new SsPlaying;
		})
		.start();

		sb.stt = new SsFade(tw);
	}
	wf =()=> false;		// ok
	compFade() {}		// ok
	stopfadese() {}		// ok
	readonly	isDestroy	= false;
}

class SsWaitingStop implements ISndState {
	onLoad() {}			// ok
	stopse(sb: ISndBuf)	{sb.stt = new SsStop(sb)}
	ws =()=> false;		// ok
	onPlayEnd(buf: string)	{evtMng.breakEvent('buf:'+ buf)}
	fade() {}			// ok
	wf =()=> false;		// ok
	compFade() {}		// ok
	stopfadese() {}		// ok
	readonly	isDestroy	= false;
}

class SsFade implements ISndState {
	constructor(readonly tw: Tween<Sound>) {}
	onLoad() {}			// ok
	stopse(sb: ISndBuf)	{stopfadese(this.tw); sb.stt = new SsStop(sb)}	// 順番厳守
	ws =()=> false;		// ok ?
	onPlayEnd() {}		// ok
	fade() {}			// ok
	wf(sb: ISndBuf, hArg: HArg) {
		const {buf = 'SE'} = hArg;
		argChk_Boolean(hArg, 'canskip', false);	// waitEvent() のデフォルトと違うので先行上書き
		if (evtMng.waitEvent('buf:'+ buf, hArg, ()=> stopfadese(this.tw))) {
			sb.stt = new SsWaitingFade(this.tw);
			return true;
		}

		return false;
	}
	compFade() {}		// ok
	stopfadese =()=> stopfadese(this.tw);
	readonly	isDestroy	= false;
}

class SsWaitingFade implements ISndState {
	constructor(readonly tw: Tween<Sound>) {}
	onLoad() {}			// ok
	stopse(sb: ISndBuf)	{stopfadese(this.tw); sb.stt = new SsStop(sb)}
	ws =()=> false;		// ok
	onPlayEnd() {}		// ok
	fade() {}			// ok
	wf =()=> false;		// ok
	compFade(buf: string) {evtMng.breakEvent('buf:'+ buf)}
	stopfadese =()=> stopfadese(this.tw);
	readonly	isDestroy	= false;
}

class SsStop implements ISndState {
	constructor(readonly sb: ISndBuf, readonly stop = true) {
		if (stop) {
			sb.snd.stop();
			if (! sb.loop) return;

			sb.snd.destroy();
			sb.snd.destroy = ()=> {};	// 再度コール時エラー対策
		}
	}	// destroy がないと再生が残るケースが。効果音だと破棄が激しいのでループモノ(BGM)だけにする
	onLoad() {}			// ok
	stopse() {}			// ok
	ws =()=> false;		// ok
	onPlayEnd() {}		// ok
	fade() {}			// ok
	wf =()=> false;		// ok
	compFade() {}		// ok
	stopfadese() {}		// ok
	readonly	isDestroy	= true;
}
