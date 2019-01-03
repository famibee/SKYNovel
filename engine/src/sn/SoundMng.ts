/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2019 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {CmnLib, IHTag, IVariable, IMain, IEvtMng} from './CmnLib';
import {Config} from './Config';
import {Howl} from 'howler';
import TWEEN = require('@tweenjs/tween.js');

interface ISndBuf {
	snd		: Howl;
	loop	: boolean;
	ret_ms	: number;
	end_ms	: number;
	resume	: boolean;
	onend?	: ()=> void;

	twFade?			: TWEEN.Tween;
	resumeFade?		: boolean;
	onCompleteFade?	: ()=> {};
};

export class SoundMng {
	private hSndBuf	: {[name: string]: ISndBuf} = {};

	constructor(private cfg: Config, private hTag: IHTag, private val: IVariable, private main: IMain) {
		hTag.volume		= o=> this.volume(o);		// 音量設定（独自拡張）
		hTag.fadebgm	= o=> this.fadebgm(o);		// BGMのフェード
		hTag.fadeoutbgm	= o=> this.fadeoutbgm(o);	// BGMのフェードアウト
		hTag.fadeoutse	= o=> this.fadeoutse(o);	// 効果音のフェードアウト
		hTag.fadese		= o=> this.fadese(o);		// 効果音のフェード
		hTag.playbgm	= o=> this.playbgm(o);		// BGM の演奏
		hTag.playse		= o=> this.playse(o);		// 効果音の再生
		hTag.stop_allse	= o=> this.stop_allse(o);	// 全効果音再生の停止
		hTag.stopbgm	= o=> this.stopbgm(o);		// BGM 演奏の停止
		hTag.stopse		= o=> this.stopse(o);		// 効果音再生の停止
		hTag.wb			= o=> this.wb(o);			// BGM フェードの終了待ち
		hTag.wf			= o=> this.wf(o);			// 効果音フェードの終了待ち
		hTag.stopfadese	= o=> this.stopfadese(o);	// 音声フェードの停止
		hTag.wl			= o=> this.wl(o);			// BGM 再生の終了待ち
		hTag.ws			= o=> this.ws(o);			// 効果音再生の終了待ち
		hTag.xchgbuf	= o=> this.xchgbuf(o);		// 再生トラックの交換

		const fncGlobalVol = (name: string, val: any)=> Howler.volume(Number(val));
		fncGlobalVol('', val.getVal('sys:sn.sound.global_volume', 1));
		val.defValTrg('sys:sn.sound.global_volume', fncGlobalVol);

		this.flush = ()=> val.flush();
	}
	private flush	= () =>{};

	private evtMng	: IEvtMng	= null;
	setEvtMng(evtMng: IEvtMng) {this.evtMng = evtMng;}

	// 音量設定（独自拡張）
	private volume(hArg) {
		const buf = hArg.buf || 'SE';
		const bvn = 'const.sn.sound.'+ buf +'.volume';
		const arg_vol = this.getVol(hArg, 1);
		if (Number(this.val.getVal('sys:'+ bvn)) == arg_vol) return false;

		this.val.setVal_Nochk('sys', bvn, arg_vol)	// 基準音量（sys:）
		this.flush();	// fadese()内で必ずしも呼ばれないので

		// 再生中音声の一時的音量も変更
		hArg.time = 0;
		hArg.volume = this.val.getVal('save:'+ bvn);	// 目標音量（save:）
		return this.hTag.fadese(hArg);
	}
	private getVol(hArg, def) {
		const vol = CmnLib.argChk_Num(hArg, 'volume', def);
		if (vol < 0) return 0;
		if (vol > 1) return 1;
		return vol;
	}

	// BGMのフェードアウト（loadで使うのでマクロ化禁止）
	private fadeoutbgm(hArg) {
		hArg.volume = 0;
		CmnLib.argChk_Boolean(hArg, 'stop', true);
		this.val.setVal_Nochk('save', 'const.sn.fnBgm', '');
		//this.flush();	// すぐ下でflush()
		return this.hTag.fadebgm(hArg);
	}
	// 効果音のフェードアウト（loadで使うのでマクロ化禁止）
	private fadeoutse(hArg) {
		hArg.volume = 0;
		CmnLib.argChk_Boolean(hArg, 'stop', true);
		return this.hTag.fadese(hArg);
	}

	// BGMのフェード（loadで使うのでマクロ化禁止）
	private fadebgm(hArg) {hArg.buf = 'BGM'; return this.hTag.fadese(hArg);}
	// 効果音のフェード
	private fadese(hArg) {	//console.log('fadese:');
		this.stopfadese(hArg);

		const buf = hArg.buf || 'SE';
		const oSb = this.hSndBuf[buf];
		if (! oSb || ! oSb.snd.playing()) return false;

		const bvn = 'const.sn.sound.'+ buf +'.volume';
		const savevol = this.getVol(hArg, NaN);
		this.val.setVal_Nochk('save', bvn, savevol);	// 目標音量（save:）
//console.log('fadese: buf:'+ buf +' savevol:'+ savevol);
		const vol = savevol * Number(this.val.getVal('sys:'+ bvn, 1))
//console.log('  save:'+ savevol +' sys:'+ this.val.getVal('sys:'+ bvn) +' =vol:'+ vol);
		this.flush();

		if (CmnLib.argChk_Num(hArg, 'time', NaN) == 0) {
			oSb.snd.volume(vol);
			return false;
		}

		const ease = hArg.ease ?CmnLib.hEase[hArg.ease]: TWEEN.Easing.Linear.None;
		if (! ease) throw '異常なease指定です';
		const repeat = CmnLib.argChk_Num(hArg, 'repeat', 1);
		const stop = CmnLib.argChk_Boolean(hArg, 'stop', false);
//console.log('fadese start from:%f to:%f', oSb.snd.volume(), vol);
		oSb.twFade = new TWEEN.Tween({v: oSb.snd.volume()})
			.to({v: vol}, CmnLib.argChk_Num(hArg, 'time', NaN))
			.delay(CmnLib.argChk_Num(hArg, 'delay', 0))
			.easing(ease)
			.repeat(repeat == 0 ?Infinity :(repeat -1))	// 一度リピート→計二回なので
			.yoyo(CmnLib.argChk_Boolean(hArg, 'yoyo', false))
			.onUpdate(o=> {if (oSb.snd.playing()) oSb.snd.volume(o.v);})
			.onComplete(()=> {	//console.log('fadese: onComplete');
				// [xchgbuf]をされるかもしれないので、外のoSb使用不可
				const oSb = this.hSndBuf[buf];
				if (! oSb || ! oSb.twFade) return;
				delete oSb.twFade;
				if (stop) {
					if (buf == 'BGM') this.stopbgm(hArg); else this.stopse(hArg);
				}
				if (oSb.resumeFade) {
					this.evtMng.popLocalEvts();	// [wf]したのにキャンセルされなかった時用
					this.main.resume();
				}
				if ('onCompleteFade' in oSb) oSb.onCompleteFade();
			});
		oSb.twFade.start();

		return false;
	}

	// BGM の演奏
	private playbgm(hArg) {
		hArg.buf = 'BGM';
		hArg.canskip = false;
		this.val.setVal_Nochk('save', 'const.sn.fnBgm', hArg.fn);
		this.flush();
		CmnLib.argChk_Boolean(hArg, 'loop', true);
		return this.hTag.playse(hArg);
	}

	// 効果音の再生
	private playse(hArg) {
		const buf = hArg.buf || 'SE';
		this.stopse({buf: buf});
		const fn = hArg.fn;
		if (! fn) throw('[playse] fnは必須です(buf='+ buf +')');

		// isSkipKeyDown()は此処のみとする。タイミングによって変わる
		if (CmnLib.argChk_Boolean(hArg, 'canskip', true)
			&& this.evtMng.isSkipKeyDown()) return false;

		const loop = CmnLib.argChk_Boolean(hArg, 'loop', false);

		// この辺で属性を増減したら、loadFromSaveObj()にも反映する
		const nm = 'const.sn.sound.'+ buf +'.';
		const savevol = this.getVol(hArg, 1);
		this.val.setVal_Nochk('save', nm +'volume', savevol);	// 目標音量（save:）
		const vol = savevol * Number(this.val.getVal('sys:'+ nm +'volume', 1));
		const ret_ms = CmnLib.argChk_Num(hArg, 'ret_ms', 0);
		this.val.setVal_Nochk('save', 'const.sn.sound.'+ buf +'.ret_ms', ret_ms);
		const end_ms = CmnLib.argChk_Num(hArg, 'end_ms', 0);
		this.val.setVal_Nochk('save', 'const.sn.sound.'+ buf +'.end_ms', end_ms);
		this.flush();

		const o: IHowlProperties = {
			src: this.cfg.searchPath(fn, Config.EXT_SOUND),
			//src: ['sound.webm', 'sound.mp3', 'sound.wav'],
			autoplay: true,
			loop: loop,
			volume: vol,
			//preload: true,
			//sprite: {key: [offset, duration, (loop)]},
		};
		if (! loop) o.onend = ()=> {
			// [xchgbuf]をされるかもしれないので、外のoSb使用不可
			const oSb = this.hSndBuf[buf];
			if (! oSb) return;
			oSb.onend();
		};
		const join = CmnLib.argChk_Boolean(hArg, 'join', true);
		if (join) o.onload = ()=> this.main.resume();
		this.hSndBuf[buf] = {
			snd		: new Howl(o),
			loop	: loop,
			ret_ms	: ret_ms,
			end_ms	: end_ms,
			resume	: false,
			onend	: ()=> {	//console.log('playse: onend');
				// [xchgbuf]をされるかもしれないので、外のoSb使用不可
				const oSb = this.hSndBuf[buf];
				if (! oSb) return;
				//delete this.hSndBuf[buf];
					// [xchgbuf]をされるかもしれないので、delete不可
					// 【2018/06/25】cache=falseならここでunload()？
					//	const cache = CmnLib.argChk_Boolean(hArg, 'cache', true);
				this.stopfadese(hArg);	// 止めた方が良いかなと
				if (oSb.resume) {
					this.evtMng.popLocalEvts();	// [ws]したのにキャンセルされなかった時用
					this.main.resume();
				}
			},
		};

		return join;
	}

	// 全効果音再生の停止
	private stop_allse(hArg = null) {
		this.val.setVal_Nochk('save', 'const.sn.fnBgm', '');
		//this.flush();	// すぐ下でflush()
		for (const buf in this.hSndBuf) this.stopse({buf: buf});
		this.hSndBuf = {};
		return false;
	}
	// BGM 演奏の停止（マクロ化禁止）
	private stopbgm(hArg) {
		hArg.buf = 'BGM';
		this.val.setVal_Nochk('save', 'const.sn.fnBgm', '');
		//this.flush();	// すぐ下でflush()
		return this.hTag.stopse(hArg);
	}
	// 効果音再生の停止
	private stopse(hArg) {
		const buf = hArg.buf || 'SE';
		this.stopfadese(hArg);

		const oSb = this.hSndBuf[buf];
		if (oSb) oSb.snd.stop();

		return false;
	}

	// BGM フェードの終了待ち
	private wb(hArg) {hArg.buf = 'BGM'; return this.hTag.wf(hArg);}

	// 効果音フェードの終了待ち
	private wf(hArg) {
		const buf = hArg.buf || 'SE';
		const oSb = this.hSndBuf[buf];
		if (! oSb || ! oSb.twFade) return false;
		if (! oSb.snd.playing()) return false;

		oSb.resumeFade = true;
		this.evtMng.stdWait(
			()=> {this.stopfadese(hArg)},
			CmnLib.argChk_Boolean(hArg, 'canskip', true)
		);
		return true;
	}

	// 音声フェードの停止
	private stopfadese(hArg) {
		const buf = hArg.buf || 'SE';
		const oSb = this.hSndBuf[buf];
		if (! oSb || ! oSb.twFade) return false;

		oSb.twFade.stop().end();	// stop()とend()は別

		return false;
	}

	// BGM 再生の終了待ち
	private wl(hArg) {hArg.buf = 'BGM'; return this.hTag.ws(hArg);}
	// 効果音再生の終了待ち
	private ws(hArg) {
		const buf = hArg.buf || 'SE';
		const oSb = this.hSndBuf[buf];
		if (! oSb || ! oSb.snd.playing() || oSb.loop) return false;

		oSb.resume = true;
		this.evtMng.stdWait(
			()=> {
				this.stopse(hArg);
				// [xchgbuf]をされるかもしれないので、外のoSb使用不可
				const oSb = this.hSndBuf[buf];
				if (! oSb || ! oSb.snd.playing() || oSb.loop) return;
				oSb.onend();
			},
			CmnLib.argChk_Boolean(hArg, 'canskip', false)
		);
		return true;
	}

	// 再生トラックの交換
	private xchgbuf(hArg) {
		// TODO:xchgbuf()が未テスト
		const buf = hArg.buf || 'SE';
		const buf2 = hArg.buf2 || 'SE';
		[this.hSndBuf[buf], this.hSndBuf[buf2]] = [this.hSndBuf[buf2], this.hSndBuf[buf]];
//		const oSb = this.hSndBuf[buf];
//		this.hSndBuf[buf] = this.hSndBuf[buf2];
//		this.hSndBuf[buf2] = oSb;

		return false;
	}


	loadAheadSnd(aFn: string[]): void {
		// TODO:loadAheadSnd()が未作成
		;
	}

	// しおりの読込（BGM状態復元）
	loadFromSaveObj(hArg: any): [] {
		// TODO: loadFromSaveObj()未作成
		return [];
/*
		const oSB = {};
		if (! hArg.reload_sound) {
			save = hScopeVal.save;
			sys = hScopeVal.sys;
		}
		const bufs_lp_play
			= (save['const.sn.bufs_lp_play'] ||= '');
		flush();
//MainThread.myTrace('loadFromSaveObj:('+ bufs_lp_play +')', 'F');
		if (bufs_lp_play == '') {
			stop_allse();
			return [];
		}

		const ab:Array = bufs_lp_play.split(':');
		const len:uint = ab.length;
		for (var i:uint=0; i<len; ++i) {
			const buf:String = ab[i];
			const nm:String = 'const.sn.sound.'+ buf +'.';
			oSB[buf] = {
				fn		:save[nm +'fn']
			,	buf		:buf
			,	join	:true
			,	loop	:true
			,	volume	:save[nm +'volume']
			,	ret_ms	:save[nm +'ret_ms']
			,	end_ms	:save[nm +'end_ms']
			}
//MainThread.myTrace(' buf:'+ buf +': fn:'+ oSB[buf].fn +':', 'D');
		}

		this.stop_allse();

		const aFnc = [];
		for (i=0; i<len; ++i) {
			const buf2:String = ab[i];
//MainThread.myTrace(' buf:'+ buf2 +': fn:'+ oSB[buf2].fn +':', 'F');
			if (! buf2 || ! oSB[buf2].fn) {
				delPlayBuf(buf2);
				continue;
			};
			aFnc.push({
				fnc: (buf2 == 'BGM') ?playbgm :playse
			,	arg: oSB[buf2] });
		}
		// アプリ全体の音量はsys:なので処理不要

		return aFnc;
*/
	}

}
