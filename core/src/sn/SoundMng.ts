/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2021 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {IEvtMng, argChk_Boolean, argChk_Num} from './CmnLib';
import {CmnTween} from './CmnTween';
import {IHTag, IVariable, IMain, HArg, INoticeChgVolume} from './CmnInterface';
import {Config} from './Config';
import {SysBase} from './SysBase';

import {sound, utils, Sound, Options} from '@pixi/sound';
import {Loader, LoaderResource} from 'pixi.js';
import {Tween} from '@tweenjs/tween.js'

interface ISndBuf {
	now_buf	: string;
	snd		: Sound;
	loop	: boolean;
	start_ms: number;
	end_ms	: number;
	ret_ms	: number;
	resume	: boolean;
	playing	: ()=> boolean;
	onend	: ()=> void;

	twFade?		: Tween<{v: number}>;
	resumeFade?	: boolean;
};

export class SoundMng {
	#hSndBuf	: {[buf: string]: ISndBuf}	= {};
	#hLP		: {[buf: string]: 0}		= {};

	constructor(private readonly cfg: Config, hTag: IHTag, private readonly val: IVariable, private readonly main: IMain, private readonly sys: SysBase) {
		hTag.volume		= o=> this.#volume(o);		// 音量設定（独自拡張）
		hTag.fadebgm	= o=> this.#fadebgm(o);		// BGMのフェード
		hTag.fadeoutbgm	= o=> this.#fadeoutbgm(o);	// BGMのフェードアウト
		hTag.fadeoutse	= o=> this.#fadeoutse(o);	// 効果音のフェードアウト
		hTag.fadese		= o=> this.#fadese(o);		// 効果音のフェード
		hTag.playbgm	= o=> this.#playbgm(o);		// BGM の演奏
		hTag.playse		= o=> this.#playse(o);		// 効果音の再生
		hTag.stop_allse	= ()=> this.#stop_allse();	// 全効果音再生の停止
		hTag.stopbgm	= o=> this.#stopbgm(o);		// BGM 演奏の停止
		hTag.stopse		= o=> this.#stopse(o);		// 効果音再生の停止
		hTag.wb			= o=> this.#wb(o);			// BGM フェードの終了待ち
		hTag.wf			= o=> this.#wf(o);			// 効果音フェードの終了待ち
		hTag.stopfadese	= o=> this.#stopfadese(o);	// 音声フェードの停止
		hTag.wl			= o=> this.#wl(o);			// BGM 再生の終了待ち
		hTag.ws			= o=> this.#ws(o);			// 効果音再生の終了待ち
		hTag.xchgbuf	= o=> this.#xchgbuf(o);		// 再生トラックの交換

		this.val.setVal_Nochk('save', 'const.sn.loopPlaying', '{}');

		val.setVal_Nochk('tmp', 'const.sn.sound.codecs', JSON.stringify(utils.supported));
	}

	#evtMng	: IEvtMng;
	setEvtMng(evtMng: IEvtMng) {this.#evtMng = evtMng;}
	setNoticeChgVolume(setGlbVol: INoticeChgVolume, setMovVol: INoticeChgVolume) {
		this.val.defValTrg('sys:sn.sound.global_volume', (_name: string, val: any)=> setGlbVol(sound.volumeAll = Number(val)));
		this.val.defValTrg('sys:sn.sound.movie_volume', (_name: string, val: any)=> setMovVol(Number(val)));

		// 起動時初期値セット
		this.val.setVal_Nochk('sys', 'sn.sound.global_volume', this.val.getVal('sys:sn.sound.global_volume', 1));
		this.val.setVal_Nochk('sys', 'sn.sound.movie_volume', this.val.getVal('sys:sn.sound.movie_volume', 1));
	}

	// 音量設定（独自拡張）
	#volume(hArg: HArg) {
		const buf = hArg.buf ?? 'SE';
		const bvn = 'const.sn.sound.'+ buf +'.volume';
		const arg_vol = this.#getVol(hArg, 1);
		if (Number(this.val.getVal('sys:'+ bvn)) === arg_vol) return false;

		this.val.setVal_Nochk('sys', bvn, arg_vol)	// 基準音量（sys:）
		this.val.flush();	// fadese()内で必ずしも呼ばれないので

		// 再生中音声の一時的音量も変更
		hArg.time = 0;
		hArg.volume = Number(this.val.getVal('save:'+ bvn));	// 目標音量（save:）
		return this.#fadese(hArg);
	}
	#getVol(hArg: HArg, def: number) {
		const vol = argChk_Num(hArg, 'volume', def);
		if (vol < 0) return 0;
		if (vol > 1) return 1;
		return vol;
	}

	// BGM/効果音のフェードアウト（loadから使うのでマクロ化禁止）
	#fadeoutbgm(hArg: HArg) {hArg.volume = 0; return this.#fadebgm(hArg);}
	// 効果音のフェードアウト（loadから使うのでマクロ化禁止）
	#fadeoutse(hArg: HArg) {hArg.volume = 0; return this.#fadese(hArg);}
	// BGMのフェード（loadから使うのでマクロ化禁止）
	#fadebgm(hArg: HArg) {hArg.buf = 'BGM'; return this.#fadese(hArg);}
	// 効果音のフェード
	#fadese(hArg: HArg) {
		this.#stopfadese(hArg);

		const buf = hArg.buf ?? 'SE';
		const oSb = this.#hSndBuf[buf];
		if (! oSb?.playing() || ! oSb.snd) return false;

		const bvn = 'const.sn.sound.'+ buf +'.volume';
		const savevol = this.#getVol(hArg, NaN);
		this.val.setVal_Nochk('save', bvn, savevol);	// 目標音量（save:）
		const vol = savevol * Number(this.val.getVal('sys:'+ bvn, 1))
		const stop = argChk_Boolean(hArg, 'stop', (savevol === 0));
			// this.getVol() により savevol = hArg.volume
		if (stop) {
			this.#delLoopPlay(buf);
			this.val.setVal_Nochk('save', 'const.sn.sound.'+ buf +'.fn', '');
				// 先行して
		}
		this.val.flush();

		if (argChk_Num(hArg, 'time', NaN) === 0) {
			oSb.snd.volume = vol;
			if (stop) this.#stopse(hArg);
			return false;
		}

		const ease = CmnTween.ease(hArg.ease);
		const repeat = argChk_Num(hArg, 'repeat', 1);
		//console.log('fadese start from:%f to:%f', oSb.snd.volume, vol);
		oSb.twFade = new Tween({v: oSb.snd.volume})
		.to({v: vol}, argChk_Num(hArg, 'time', NaN))
		.delay(argChk_Num(hArg, 'delay', 0))
		.easing(ease)
		.repeat(repeat === 0 ?Infinity :(repeat -1))	// 一度リピート→計二回なので
		.yoyo(argChk_Boolean(hArg, 'yoyo', false))
		.onUpdate(o=> {if (oSb.playing()) oSb.snd.volume = o.v;})
		.onComplete(()=> {
			// [xchgbuf]をされるかもしれないので、外のoSb使用不可
			const oSb2 = this.#hSndBuf[hArg.buf = oSb.now_buf];
			if (! oSb2?.twFade) return;

			delete oSb2.twFade;
			if (stop) this.#stopse(hArg);
			if (oSb2.resumeFade) this.main.resume();
		})
		.start();

		return false;
	}

	// BGM の演奏
	#playbgm(hArg: HArg) {
		hArg.buf = 'BGM';
		hArg.canskip = false;
		argChk_Boolean(hArg, 'loop', true);
		return this.#playse(hArg);
	}

	// 効果音の再生
	static	readonly	#MAX_END_MS	= 999000;
	#playse(hArg: HArg) {
		const buf = hArg.buf ?? 'SE';
		this.#stopse({buf});
		const fn = hArg.fn;
		if (! fn) throw '[playse] fnは必須です(buf='+ buf +')';

		// isSkipKeyDown()は此処のみとする。タイミングによって変わる
		if (argChk_Boolean(hArg, 'canskip', true)
			&& this.#evtMng.isSkipKeyDown()) return false;

		const loop = argChk_Boolean(hArg, 'loop', false);
		this.#addLoopPlay(buf, loop);

		// この辺で属性を増減したら、loadFromSaveObj()にも反映する
		const nm = 'const.sn.sound.'+ buf +'.';
		this.val.setVal_Nochk('save', nm +'fn', fn);
		const savevol = this.#getVol(hArg, 1);
		this.val.setVal_Nochk('save', nm +'volume', savevol);	// 目標音量（save:）
		const vol = savevol * Number(this.val.getVal('sys:'+ nm +'volume', 1));

		const start_ms = argChk_Num(hArg, 'start_ms', 0);
		const end_ms = argChk_Num(hArg, 'end_ms', SoundMng.#MAX_END_MS);
		const ret_ms = argChk_Num(hArg, 'ret_ms', 0);

		if (start_ms < 0) throw `[playse] start_ms:${start_ms} が負の値です`;
		if (ret_ms < 0) throw `[playse] ret_ms:${ret_ms} が負の値です`;
		if (end_ms > 0) {
			if (start_ms >= end_ms) throw `[playse] start_ms:${start_ms} >= end_ms:${end_ms} は異常値です`;
			if (ret_ms >= end_ms) throw `[playse] ret_ms:${ret_ms} >= end_ms:${end_ms} は異常値です`;
		}

		this.val.setVal_Nochk('save', nm +'start_ms', start_ms);
		this.val.setVal_Nochk('save', nm +'end_ms', end_ms);
		this.val.setVal_Nochk('save', nm +'ret_ms', ret_ms);
		this.val.flush();

		const snd = sound.find(fn);	// バッファにあるか
		const oSb: ISndBuf = this.#hSndBuf[buf] = {
			now_buf	: buf,
			snd		: snd,
			loop	: loop,
			start_ms: start_ms,
			end_ms	: end_ms,
			ret_ms	: ret_ms,
			resume	: false,
			playing	: ()=> true,	// [ws]的にはここでtrueが欲しい
			onend	: ()=> {
				// [xchgbuf]をされるかもしれないので、外のoSb使用不可
				const oSb2 = this.#hSndBuf[hArg.buf = oSb.now_buf];
				if (! oSb2) return;

				delete this.#hSndBuf[hArg.buf];
				oSb2.playing = ()=> false;
				// NOTE: 【2018/06/25】cache=falseならここでunload()？
				this.#stopfadese(hArg);	// 止めた方が良いかなと
				if (oSb2.resume) this.main.resume();
			},
		};

		// @pixi/sound用基本パラメータ
		const o: Options = {
			loop	: loop,
			volume	: vol,
			speed	: argChk_Num(hArg, 'speed', 1),
			sprites	: {},
			loaded	: (e, snd)=> {
				if (e) {this.main.errScript(`Sound ロード失敗ですa fn:${fn} ${e}`, false); return;}
				if (! snd) return;

				// [xchgbuf]をされるかもしれないので、外のoSb使用不可
				const oSb2 = this.#hSndBuf[oSb.now_buf];
				if (oSb2) oSb2.snd = snd;
			},
		};

		// start_ms・end_ms機能→@pixi/sound準備
		let sp_nm = '';
		if (start_ms > 0 || end_ms < SoundMng.#MAX_END_MS) {
			sp_nm = `${fn};${start_ms};${end_ms};${ret_ms}`;
			const os = o.sprites![sp_nm] = {
				start	: start_ms /1000,
				end		: end_ms /1000,
			};
			o.preload = true;		// loaded発生用
			const old = o.loaded;
			o.loaded = (e, snd2)=> {
				if (e) {this.main.errScript(`Sound ロード失敗ですb fn:${fn} ${e}`, false); return;}
				if (! snd2) return;

				const d = snd2.duration;
				old?.(e, snd2);
				if (os.end < 0) {	// 負の値は末尾から
					os.end += d;
					snd2.removeSprites(sp_nm);
					snd2.addSprites(sp_nm, os);

					if (os.start >= os.end) throw `[playse] start_ms:${start_ms} >= end_ms:${end_ms}(${os.end *1000}) は異常値です`;
					if (ret_ms >= os.end *1000) throw `[playse] ret_ms:${ret_ms} >= end_ms:${end_ms}(${os.end *1000}) は異常値です`;
				}
				if (os.start >= d) throw`[playse] start_ms:${start_ms} >= 音声ファイル再生時間:${d} は異常値です`;
				if (end_ms !== SoundMng.#MAX_END_MS && os.end >= d) throw`[playse] end_ms:${end_ms} >= 音声ファイル再生時間:${d} は異常値です`;

				snd2.play(sp_nm, o.complete);	// completeがundefinedでもいい
			};
		}
		else o.autoPlay = true;

		// ループなし ... 再生完了イベント
		if (! loop) o.complete = ()=> this.#hSndBuf[oSb.now_buf]?.onend();
			// [xchgbuf]をされるかもしれないので、外のoSb使用不可
		// ループあり ... ret_ms処理
		else if (ret_ms !== 0) {
			o.loop = false;	// 一周目はループなしとする
			o.complete = snd=> {
				const d = snd.duration;
				const sp_nm2 = `${fn};loop2;${end_ms};${ret_ms}`;
				const o2: Options = {	// oのコピーからやるとトラブルの元だった
					preload	: true,		// loaded発生用
					loop	: true,
					volume	: vol,
					speed	: o.speed,
					sprites	: {},
					loaded	: (_, snd2)=> {
						if (! snd2) return;

						// [xchgbuf]をされるかもしれないので、外のoSb使用不可
						const oSb2 = this.#hSndBuf[oSb.now_buf];
						if (oSb2) oSb2.snd = snd2;
						snd2.play(sp_nm2);
					},
				};

				const o2s = o2.sprites![sp_nm2] = {
					start	: ret_ms /1000,
					end		: end_ms /1000,
				};
				if (o2s.end < 0) {	// 負の値は末尾から
					o2s.end += d;
					snd.removeSprites(sp_nm2);
					snd.addSprites(sp_nm2, o2s);
				}
				if (o2s.start >= d) throw`[playse] ret_ms:${ret_ms} >= 音声ファイル再生時間:${d} は異常値です`;

				this.#playseSub(fn, o2);
			}
		}

		this.#initVol();
		if (snd) {
			snd.volume = vol;	// 再生のたびに音量を戻す
			if (sp_nm) this.#playseSub(fn, o);
			else if (snd.isPlayable) {
				const ab = snd.options.source;
				if (! (ab instanceof ArrayBuffer) || ab.byteLength === 0) {
					this.#playseSub(fn, o);
				}
				else oSb.snd = Sound.from({
					...o,
					url		: snd.options.url,
					source	: snd.options.source,
				});
			}
			return false;
		}

		const join = argChk_Boolean(hArg, 'join', true);
		if (join) {
			const old = o.loaded;
			o.loaded = (e, snd)=> {this.main.resume(); old?.(e, snd)};
		}
		this.#playseSub(fn, o);

		return join;
	}
	#playseSub(fn: string, o: Options) {
		const url = this.cfg.searchPath(fn, Config.EXT_SOUND);
	//	const url = 'http://localhost:8080/prj/audio/title.{ogg,mp3}';
		if (url.slice(-4) !== '.bin') {
			o.url = url;
			Sound.from(o);
			return;
		}

		(new Loader()).add({name: fn, url, xhrType: LoaderResource.XHR_RESPONSE_TYPE.BUFFER,})
		.use((res, next)=> {
			this.sys.dec(res.extension, res.data)
			.then(r=> {res.data = r; next?.()})
			.catch(e=> this.main.errScript(`Sound ロード失敗です fn:${res.name} ${e}`, false));
		})
		.load((_ldr, hRes)=> {
			o.source = hRes[fn]?.data;
			Sound.from(o);
		});
	}
	#initVol = ()=> {
		sound.volumeAll = Number(this.val.getVal('sys:sn.sound.global_volume', 1));
		this.#initVol = ()=> {};
	};

	// 全効果音再生の停止
	#stop_allse() {
//		sound.pauseAll();
//		sound.stopAll();
		sound.removeAll();	// NOTE: 連打でも残る。なにかオブジェクトが残っている

		for (const buf in this.#hSndBuf) this.#stopse({buf});
		this.#hSndBuf = {};
		return false;
	}
	// BGM 演奏の停止（loadから使うのでマクロ化禁止）
	#stopbgm(hArg: HArg) {hArg.buf = 'BGM'; return this.#stopse(hArg);}
	// 効果音再生の停止
	#stopse(hArg: HArg) {
		const buf = hArg.buf ?? 'SE';
		this.#stopfadese(hArg);
		this.#delLoopPlay(buf);

		this.#hSndBuf[buf]?.snd?.stop();

		return false;
	}

	// BGM フェードの終了待ち
	#wb(hArg: HArg) {hArg.buf = 'BGM'; return this.#wf(hArg);}

	// 効果音フェードの終了待ち
	#wf(hArg: HArg) {
		const buf = hArg.buf ?? 'SE';
		const oSb = this.#hSndBuf[buf];
		if (! oSb?.twFade || ! oSb.playing()) return false;

		return oSb.resumeFade = this.#evtMng.waitEvent(
			()=> this.#stopfadese(hArg),
			argChk_Boolean(hArg, 'canskip', true),
			argChk_Boolean(hArg, 'global', false),
		);
	}

	// 音声フェードの停止
	#stopfadese(hArg: HArg) {
		const buf = hArg.buf ?? 'SE';
		this.#hSndBuf[buf]?.twFade?.stop().end();	// stop()とend()は別

		return false;
	}

	// BGM 再生の終了待ち
	#wl(hArg: HArg) {hArg.buf = 'BGM'; return this.#ws(hArg);}
	// 効果音再生の終了待ち
	#ws(hArg: HArg) {
		const buf = hArg.buf ?? 'SE';
		const oSb = this.#hSndBuf[buf];
		if (! oSb?.playing() || oSb.loop) return false;

		return oSb.resume = this.#evtMng.waitEvent(
			()=> {
				hArg.buf = oSb.now_buf;
				this.#stopse(hArg);
				// [xchgbuf]をされるかもしれないので、外のoSb使用不可
				const oSb2 = this.#hSndBuf[hArg.buf];
				if (! oSb2?.playing() || oSb2.loop) return;
				oSb2.onend();
			},
			argChk_Boolean(hArg, 'canskip', false),
			argChk_Boolean(hArg, 'global', false),
		);
	}

	// 再生トラックの交換
	#xchgbuf(hArg: HArg) {
		const buf1 = hArg.buf ?? 'SE';
		const buf2 = hArg.buf2 ?? 'SE';
		if (buf1 === buf2) return false;

		const sb1 = this.#hSndBuf[buf1];
		if (sb1) sb1.now_buf = buf2;
		const sb2 = this.#hSndBuf[buf2];
		if (sb2) sb2.now_buf = buf1;
		[this.#hSndBuf[buf1], this.#hSndBuf[buf2]] = [sb2, sb1];

		const n1 = 'const.sn.sound.'+ buf1 +'.';
		const v1 = Number(this.val.getVal('save:'+ n1 +'volume'));
		const f1 = Number(this.val.getVal('save:'+ n1 +'fn'));
		const n2 = 'const.sn.sound.'+ buf2 +'.';
		const v2 = Number(this.val.getVal('save:'+ n2 +'volume'));
		const f2 = Number(this.val.getVal('save:'+ n2 +'fn'));
		this.val.setVal_Nochk('save', n1 +'volume', v2);
		this.val.setVal_Nochk('save', n2 +'volume', v1);
		this.val.setVal_Nochk('save', n1 +'fn', f2);
		this.val.setVal_Nochk('save', n2 +'fn', f1);

		if (buf1 in this.#hLP === buf2 in this.#hLP) {	// 演算子の優先順位確認済み
			if (buf1 in this.#hLP) {delete this.#hLP[buf1]; this.#hLP[buf2] = 0;}
			else				  {delete this.#hLP[buf2]; this.#hLP[buf1] = 0;}
			this.val.setVal_Nochk('save', 'const.sn.loopPlaying', JSON.stringify(this.#hLP));
		}
		this.val.flush();

		return false;
	}

	// レスポンス向上のため音声ファイルを先読み
	loadAheadSnd(hArg: HArg): void {
		[hArg.clickse, hArg.enterse, hArg.leavese].forEach(fn=> {
			if (! fn || sound.exists(fn)) return;

			this.#playseSub(fn, {preload: true, autoPlay: false});
		});
	}

	// しおりの読込（BGM状態復元）
	playLoopFromSaveObj(): void {
		const lp = String(this.val.getVal('save:const.sn.loopPlaying', '{}'));
		this.val.flush();
		if (lp === '{}') {this.#stop_allse(); return;}

		const aFnc: {(): void}[] = [];
		this.#hLP = JSON.parse(lp);
		for (const buf in this.#hLP) {
			const nm = 'save:const.sn.sound.'+ buf +'.';
			const hArg = {
				fn		: String(this.val.getVal(nm +'fn')),
				buf		: buf,
				join	: false,
				loop	: true,
				volume	: Number(this.val.getVal(nm +'volume')),
				start_ms: Number(this.val.getVal(nm +'start_ms')),
				end_ms	: Number(this.val.getVal(nm +'end_ms')),
				ret_ms	: Number(this.val.getVal(nm +'ret_ms')),
			};
			aFnc.push(()=> {
				if (hArg.buf === 'BGM') this.#playbgm(hArg);
				else this.#playse(hArg);
			});
		}
		this.#stop_allse();
		aFnc.forEach(f=> f());
	}
	#addLoopPlay(buf: string, is_loop: Boolean): void {
		if (! is_loop) {this.#delLoopPlay(buf); return;}

		this.#hLP[buf] = 0;
		this.val.setVal_Nochk('save', 'const.sn.loopPlaying', JSON.stringify(this.#hLP));
		this.val.flush();
	}
	#delLoopPlay(buf: string): void {
		delete this.#hLP[buf];
		this.val.setVal_Nochk('save', 'const.sn.loopPlaying', JSON.stringify(this.#hLP));
		this.val.flush();
	}

}
