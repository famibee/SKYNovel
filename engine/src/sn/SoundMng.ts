/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2019 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {CmnLib, IHTag, IVariable, IMain, IEvtMng, HArg} from './CmnLib';
import {Config} from './Config';
import {Howl} from 'howler';
import TWEEN = require('@tweenjs/tween.js');

interface ISndBuf {
	snd		: Howl;
	loop	: boolean;
	ret_ms	: number;
	end_ms	: number;
	resume	: boolean;
	onend	: ()=> void;

	twFade?			: TWEEN.Tween;
	resumeFade?		: boolean;
	onCompleteFade?	: ()=> {};
};

export class SoundMng {
	private hSndBuf	: {[name: string]: ISndBuf} = {};

	constructor(private cfg: Config, hTag: IHTag, private val: IVariable, private main: IMain) {
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

		const fncGlobalVol = (_name: string, val: any)=> Howler.volume(Number(val));
		fncGlobalVol('', val.getVal('sys:sn.sound.global_volume', 1));
		val.defValTrg('sys:sn.sound.global_volume', fncGlobalVol);

		this.val.setVal_Nochk('save', 'const.sn.loopPlaying', '{}');

		'mp3,m4a,ogg,aac,webm,flac,wav'.split(',').map(v=> val.setVal_Nochk('tmp', 'const.sn.sound.codecs.'+ v, Howler.codecs(v)));
	}

	private evtMng	: IEvtMng;
	setEvtMng(evtMng: IEvtMng) {this.evtMng = evtMng;}

	// 音量設定（独自拡張）
	private volume(hArg: HArg) {
		const buf = hArg.buf || 'SE';
		const bvn = 'const.sn.sound.'+ buf +'.volume';
		const arg_vol = this.getVol(hArg, 1);
		if (Number(this.val.getVal('sys:'+ bvn)) == arg_vol) return false;

		this.val.setVal_Nochk('sys', bvn, arg_vol)	// 基準音量（sys:）
		this.val.flush();	// fadese()内で必ずしも呼ばれないので

		// 再生中音声の一時的音量も変更
		hArg.time = 0;
		hArg.volume = Number(this.val.getVal('save:'+ bvn));	// 目標音量（save:）
		return this.fadese(hArg);
	}
	private getVol(hArg: HArg, def: number) {
		const vol = CmnLib.argChk_Num(hArg, 'volume', def);
		if (vol < 0) return 0;
		if (vol > 1) return 1;
		return vol;
	}

	// BGM/効果音のフェードアウト（loadから使うのでマクロ化禁止）
	private fadeoutbgm(hArg: HArg) {hArg.volume = 0; return this.fadebgm(hArg);}
	// 効果音のフェードアウト（loadから使うのでマクロ化禁止）
	private fadeoutse(hArg: HArg) {hArg.volume = 0; return this.fadese(hArg);}
	// BGMのフェード（loadから使うのでマクロ化禁止）
	private fadebgm(hArg: HArg) {hArg.buf = 'BGM'; return this.fadese(hArg);}
	// 効果音のフェード
	private fadese(hArg: HArg) {
		this.stopfadese(hArg);

		const buf = hArg.buf || 'SE';
		const oSb = this.hSndBuf[buf];
		if (! oSb || ! oSb.snd.playing()) return false;

		const bvn = 'const.sn.sound.'+ buf +'.volume';
		const savevol = this.getVol(hArg, NaN);
		this.val.setVal_Nochk('save', bvn, savevol);	// 目標音量（save:）
		const vol = savevol * Number(this.val.getVal('sys:'+ bvn, 1))
		const stop = CmnLib.argChk_Boolean(hArg, 'stop', (hArg.volume == 0));
		if (stop) {
			this.delLoopPlay(buf);
			this.val.setVal_Nochk('save', 'const.sn.sound.'+ buf +'.fn', '');
				// 先行して
		}
		this.val.flush();

		if (CmnLib.argChk_Num(hArg, 'time', NaN) == 0) {
			oSb.snd.volume(vol);
			return false;
		}

		const ease = hArg.ease ?CmnLib.hEase[hArg.ease]: TWEEN.Easing.Linear.None;
		if (! ease) throw '異常なease指定です';
		const repeat = CmnLib.argChk_Num(hArg, 'repeat', 1);
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
				if (oSb.onCompleteFade) oSb.onCompleteFade();
			});
		oSb.twFade.start();

		return false;
	}

	// BGM の演奏
	private playbgm(hArg: HArg) {
		hArg.buf = 'BGM';
		hArg.canskip = false;
		CmnLib.argChk_Boolean(hArg, 'loop', true);
		return this.playse(hArg);
	}

	// 効果音の再生
	private playse(hArg: HArg) {
		const buf = hArg.buf || 'SE';
		this.stopse({buf: buf});
		const fn = hArg.fn;
		if (! fn) throw('[playse] fnは必須です(buf='+ buf +')');

		// isSkipKeyDown()は此処のみとする。タイミングによって変わる
		if (CmnLib.argChk_Boolean(hArg, 'canskip', true)
			&& this.evtMng.isSkipKeyDown()) return false;

		const loop = CmnLib.argChk_Boolean(hArg, 'loop', false);
		this.addLoopPlay(buf, loop);

		// この辺で属性を増減したら、loadFromSaveObj()にも反映する
		const nm = 'const.sn.sound.'+ buf +'.';
		this.val.setVal_Nochk('save', nm +'fn', fn);
		const savevol = this.getVol(hArg, 1);
		this.val.setVal_Nochk('save', nm +'volume', savevol);	// 目標音量（save:）
		const vol = savevol * Number(this.val.getVal('sys:'+ nm +'volume', 1));
		const ret_ms = CmnLib.argChk_Num(hArg, 'ret_ms', 0);
		this.val.setVal_Nochk('save', nm +'ret_ms', ret_ms);
		const end_ms = CmnLib.argChk_Num(hArg, 'end_ms', 0);
		this.val.setVal_Nochk('save', nm +'end_ms', end_ms);
		this.val.flush();

		const o: IHowlProperties = {
			src: this.cfg.searchPath(fn, Config.EXT_SOUND),
			//src: ['sound.webm', 'sound.mp3', 'sound.wav'],
			autoplay: true,
			loop: loop,
			volume: vol,
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
	private stop_allse(_hArg?: HArg) {
		for (const buf in this.hSndBuf) this.stopse({buf: buf});
		this.hSndBuf = {};
		return false;
	}
	// BGM 演奏の停止（loadから使うのでマクロ化禁止）
	private stopbgm(hArg: HArg) {hArg.buf = 'BGM'; return this.stopse(hArg);}
	// 効果音再生の停止
	private stopse(hArg: HArg) {
		const buf = hArg.buf || 'SE';
		this.stopfadese(hArg);
		this.delLoopPlay(buf);

		const oSb = this.hSndBuf[buf];
		if (oSb) oSb.snd.stop();

		return false;
	}

	// BGM フェードの終了待ち
	private wb(hArg: HArg) {hArg.buf = 'BGM'; return this.wf(hArg);}

	// 効果音フェードの終了待ち
	private wf(hArg: HArg) {
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
	private stopfadese(hArg: HArg) {
		const buf = hArg.buf || 'SE';
		const oSb = this.hSndBuf[buf];
		if (! oSb || ! oSb.twFade) return false;

		oSb.twFade.stop().end();	// stop()とend()は別

		return false;
	}

	// BGM 再生の終了待ち
	private wl(hArg: HArg) {hArg.buf = 'BGM'; return this.ws(hArg);}
	// 効果音再生の終了待ち
	private ws(hArg: HArg) {
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
	private xchgbuf(hArg: HArg) {	// TODO: xchgbuf()が未テスト
		const buf = hArg.buf || 'SE';
		const buf2 = hArg.buf2 || 'SE';
		[this.hSndBuf[buf], this.hSndBuf[buf2]] = [this.hSndBuf[buf2], this.hSndBuf[buf]];
		// const oSb = this.hSndBuf[buf];
		// this.hSndBuf[buf] = this.hSndBuf[buf2];
		// this.hSndBuf[buf2] = oSb;

		return false;
	}


	loadAheadSnd(_aFn: string[]): void {
		_aFn.map(fn=> new Howl({
			src: this.cfg.searchPath(fn, Config.EXT_SOUND),
			autoplay: false,
		}));
	}

	// しおりの読込（BGM状態復元）
	playLoopFromSaveObj(): void {
		const loopPlaying = String(this.val.getVal('save:const.sn.loopPlaying', '{}'));
		this.val.flush();
		if (loopPlaying == '{}') {this.stop_allse(); return;}

		const aFnc: {(): void}[] = [];
		const hBuf = JSON.parse(loopPlaying);
		for (const buf in hBuf) {
			const nm = 'save:const.sn.sound.'+ buf +'.';
			const hArg = {
				fn		: String(this.val.getVal(nm +'fn')),
				buf		: buf,
				join	: false,
				loop	: true,
				volume	: Number(this.val.getVal(nm +'volume')),
				ret_ms	: Number(this.val.getVal(nm +'ret_ms')),
				end_ms	: Number(this.val.getVal(nm +'end_ms')),
			};
			aFnc.push(()=> {
				if (hArg.buf == 'BGM') this.playbgm(hArg);
				else this.playse(hArg);
			});
		}
		this.stop_allse();
		aFnc.map(f=> f());
	}
	private addLoopPlay(buf: string, is_loop: Boolean): void {
		if (! is_loop) {this.delLoopPlay(buf); return;}

		const hBuf = JSON.parse(String(this.val.getVal('save:const.sn.loopPlaying', '{}')));
		hBuf[buf] = 0;
		this.val.setVal_Nochk('save', 'const.sn.loopPlaying', JSON.stringify(hBuf));
		this.val.flush();
	}
	private delLoopPlay(buf: string): void {
		const hBuf = JSON.parse(String(this.val.getVal('save:const.sn.loopPlaying', '{}')));
		delete hBuf[buf];
		this.val.setVal_Nochk('save', 'const.sn.loopPlaying', JSON.stringify(hBuf));
		this.val.flush();
	}

}
