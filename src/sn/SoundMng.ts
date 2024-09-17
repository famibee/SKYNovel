/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2024 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {IEvtMng, argChk_Boolean, argChk_Num} from './CmnLib';
import {IHTag, HArg} from './Grammar';
import {IVariable, IMain, INoticeChgVolume} from './CmnInterface';
import {Config} from './Config';
import {SysBase} from './SysBase';
import {SndBuf} from './SndBuf';

import {sound, utils} from '@pixi/sound';


export class SoundMng {
	#hSndBuf	: {[buf: string]: SndBuf}	= {};

	constructor(cfg: Config, hTag: IHTag, readonly val: IVariable, main: IMain, sys: SysBase) {
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

		val.setVal_Nochk('save', 'const.sn.loopPlaying', '{}');

		val.setVal_Nochk('tmp', 'const.sn.sound.codecs', JSON.stringify(utils.supported));

		SndBuf.init(cfg, val, main, sys);
		sound.disableAutoPause = true;
	}

	#evtMng	: IEvtMng;
	setEvtMng(evtMng: IEvtMng) {this.#evtMng = evtMng; SndBuf.setEvtMng(evtMng)}
	setNoticeChgVolume(setGlbVol: INoticeChgVolume, setMovVol: INoticeChgVolume) {
		this.val.defValTrg('sys:sn.sound.global_volume', (_name: string, val: any)=> setGlbVol(sound.volumeAll = Number(val)));
		this.val.defValTrg('sys:sn.sound.movie_volume', (_name: string, val: any)=> setMovVol(Number(val)));

		// 起動時初期値セット
		this.val.setVal_Nochk('sys', 'sn.sound.global_volume', this.val.getVal('sys:sn.sound.global_volume', 1));
		this.val.setVal_Nochk('sys', 'sn.sound.movie_volume', this.val.getVal('sys:sn.sound.movie_volume', 1));
	}

	//MARK: 音量設定（独自拡張）
	#volume(hArg: HArg) {
		const {buf = 'SE'} = hArg;
		const vnV = 'const.sn.sound.'+ buf +'.volume';
		const arg_vol = this.#getVol(hArg, 1);
		if (Number(this.val.getVal('sys:'+ vnV)) === arg_vol) return false;

		this.val.setVal_Nochk('sys', vnV, arg_vol)	// 基準音量（sys:）
		this.val.flush();	// fadese()内で必ずしも呼ばれないので

		// 再生中音声の一時的音量も変更
		hArg.time = 0;
		hArg.volume = Number(this.val.getVal('save:'+ vnV));	// 目標音量（save:）
		return this.#fadese(hArg);
	}
	#getVol(hArg: HArg, def: number) {
		const vol = argChk_Num(hArg, 'volume', def);
		if (vol < 0) return 0;
		if (vol > 1) return 1;
		return vol;
	}

	//MARK: BGM/効果音のフェードアウト（loadから使うのでマクロ化禁止）
	#fadeoutbgm(hArg: HArg) {hArg.volume = 0; return this.#fadebgm(hArg)}
	//MARK: 効果音のフェードアウト（loadから使うのでマクロ化禁止）
	#fadeoutse(hArg: HArg) {hArg.volume = 0; return this.#fadese(hArg)}
	//MARK: BGMのフェード（loadから使うのでマクロ化禁止）
	#fadebgm(hArg: HArg) {hArg.buf = 'BGM'; return this.#fadese(hArg)}
	//MARK: 効果音のフェード
	#fadese(hArg: HArg) {
		const {buf = 'SE'} = hArg;
		this.#stopfadese(hArg);
		this.#hSndBuf[buf]?.fade(hArg);

		return false;
	}

	//MARK: BGM の演奏
	#playbgm(hArg: HArg) {
		hArg.buf = 'BGM';
		hArg.canskip = false;
		argChk_Boolean(hArg, 'loop', true);
		return this.#playse(hArg);
	}

	//MARK: 効果音の再生
	#playse(hArg: HArg) {
		const {buf = 'SE', fn} = hArg;
		this.#stopse({buf});
		if (! fn) throw `fnは必須です buf:${buf}`;

		// isSkipKeyDown()は此処のみとする。タイミングによって変わる
		if (argChk_Boolean(hArg, 'canskip', true) && this.#evtMng.isSkipping) return false;

		const sb = this.#hSndBuf[buf] = new SndBuf;
		return sb.init(hArg);
	}

	clearCache() {sound.removeAll()}

	//MARK: 全効果音再生の停止
	#stop_allse() {
		for (const buf of Object.keys(this.#hSndBuf)) this.#stopse({buf});
		this.#hSndBuf = {};

		sound.stopAll();	// 念のため

		return false;
	}
	//MARK: BGM 演奏の停止（loadから使うのでマクロ化禁止）
	#stopbgm(hArg: HArg) {hArg.buf = 'BGM'; return this.#stopse(hArg)}
	//MARK: 効果音再生の停止
	#stopse(hArg: HArg) {
		const {buf = 'SE'} = hArg;
		this.#hSndBuf[buf]?.stopse(hArg);

		return false;
	}

	//MARK: BGM フェードの終了待ち
	#wb(hArg: HArg) {hArg.buf = 'BGM'; return this.#wf(hArg)}

	//MARK: 効果音フェードの終了待ち
	#wf(hArg: HArg) {
		const {buf = 'SE'} = hArg;
		return this.#hSndBuf[buf]?.wf(hArg);
	}

	//MARK: 音声フェードの停止
	#stopfadese(hArg: HArg) {
		const {buf = 'SE'} = hArg;
		this.#hSndBuf[buf]?.stopfadese(hArg);

		return false;
	}

	//MARK: BGM 再生の終了待ち
	#wl(hArg: HArg) {hArg.buf = 'BGM'; return this.#ws(hArg)}
	//MARK: 効果音再生の終了待ち
	#ws(hArg: HArg) {
		const {buf = 'SE'} = hArg;
		return this.#hSndBuf[buf]?.ws(hArg);
	}

	//MARK: 再生トラックの交換
	#xchgbuf(hArg: HArg) {
		const {buf: buf1 = 'SE', buf2 = 'SE'} = hArg;
		if (buf1 === buf2) return false;

		[this.#hSndBuf[buf1], this.#hSndBuf[buf2]] =
		[this.#hSndBuf[buf2], this.#hSndBuf[buf1]];
		SndBuf.xchgbuf(hArg);

		return false;
	}

	//MARK: しおりの読込（BGM状態復元）
	playLoopFromSaveObj(all_stop_and_play: boolean): Promise<void>[] {
		const lp = String(this.val.getVal('save:const.sn.loopPlaying', '{}'));
		if (lp === '{}') {this.#stop_allse(); this.clearCache(); return []}
/*
					(Now)#hSndBuf
					stop	play
	hSaveLP	stop	-		stop		--[1]
	(to)	play	play	stop/play	--[2]
			eq play	play	-			--[2]
*/
		const hSaveLP: {[buf: string]: string} = JSON.parse(lp);
		if (all_stop_and_play) {this.#stop_allse(); this.clearCache()}
		else for (const [buf, sb] of Object.entries(this.#hSndBuf)) {
			// [1] #hSndBuf（再生中）だが hSaveLP（再生予定） にない buf -> stop
			if (! (buf in hSaveLP)) sb?.stopse({buf});
		}

		// [2] hSaveLP（再生予定）を再生。だが#hSndBuf（再生中）の状況で処理変更
		return Object.entries(hSaveLP).map(([buf, fn])=> new Promise(re=> {
			const sb = this.#hSndBuf[buf]
			if (! all_stop_and_play && sb) {
				if (sb.fn === fn) {re(); return}
				//sb.stopse({buf});	// 再生中 fn !== 再生予定 fn なら stop
					// #playbgm()、#playse() 内で stop するので省略
			}

			const vm = 'save:const.sn.sound.'+ buf +'.';
			const hArg = {
				fn,
				buf,
				join	: false,
				loop	: true,
				volume	: Number(this.val.getVal(vm +'volume')),
				start_ms: Number(this.val.getVal(vm +'start_ms')),
				end_ms	: Number(this.val.getVal(vm +'end_ms')),
				ret_ms	: Number(this.val.getVal(vm +'ret_ms')),
				fnc		: re,	// loaded
			};
			if (hArg.buf === 'BGM') this.#playbgm(hArg);
			else this.#playse(hArg);
		}));
	}

	destroy() {this.#stop_allse(); this.clearCache()}

}
