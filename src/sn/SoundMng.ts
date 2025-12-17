/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2025 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {type IEvtMng, argChk_Boolean, argChk_Num} from './CmnLib';
import type {T_HTag, TArg} from './Grammar';
import type {T_Variable, T_Main, T_NoticeChgVolume} from './CmnInterface';
import type {Config} from './Config';
import type {SysBase} from './SysBase';
import {BUF_BGM, BUF_SE, SndBuf, xchgbuf} from './SndBuf';

import {Howler} from 'howler';


export type HSndBuf = {[buf: string]: SndBuf}


export class SoundMng {
	#hSndBuf	: HSndBuf	= {};
	#getSndBuf(buf: string) {return this.#hSndBuf[buf]}

	constructor(cfg: Config, hTag: T_HTag, private readonly val: T_Variable, main: T_Main, sys: SysBase) {
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
		hTag.stopfadese	= ()=> false;				// 音声フェードの停止（廃止）
		hTag.wl			= o=> this.#wl(o);			// BGM 再生の終了待ち
		hTag.ws			= o=> this.#ws(o);			// 効果音再生の終了待ち
		hTag.xchgbuf	= o=> this.#xchgbuf(o);		// 再生トラックの交換

		val.setVal_Nochk('save', 'const.sn.loopPlaying', '{}');

		const codecs: {[ext: string]: boolean} = {};
		for (const ext of 'aac,caf,dolby,flac,m4a,m4b,mp3,mp4,mpeg,oga,ogg,opus,wav,weba,webm'.split(',')) codecs[ext] = Howler.codecs(ext);
		val.setVal_Nochk('tmp', 'const.sn.sound.codecs', JSON.stringify(codecs));
		// - PixiJS Sound
		// aiff,caf,mid,mp3,mpeg,oga,ogg,opus,wav,wma
		// - Howl
		// aac,caf,dolby,flac,m4a,m4b,mp3,mp4,mpeg,oga,ogg,opus,wav,weba,webm

		SndBuf.init(cfg, val, main, sys, buf=> this.#getSndBuf(buf));
	}

	#evtMng	: IEvtMng;
	setEvtMng(evtMng: IEvtMng) {this.#evtMng = evtMng; SndBuf.setEvtMng(evtMng)}
	setNoticeChgVolume(setGlbVol: T_NoticeChgVolume, setMovVol: T_NoticeChgVolume) {
		this.val.defValTrg('sys:sn.sound.global_volume', (_, val)=> {
			const v = Number(val);
			Howler.volume(v);
			setGlbVol(v);
		});
		this.val.defValTrg('sys:sn.sound.movie_volume', (_, val)=> setMovVol(Number(val)));

		// 起動時初期値セット
		this.val.setVal_Nochk('sys', 'sn.sound.global_volume', <number>this.val.getVal('sys:sn.sound.global_volume', 1));
		this.val.setVal_Nochk('sys', 'sn.sound.movie_volume', <number>this.val.getVal('sys:sn.sound.movie_volume', 1));
	}

	//MARK: 音量設定（独自拡張）
	#volume(hArg: TArg) {
		const {buf = BUF_SE} = hArg;
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
	#getVol(hArg: TArg, def: number) {
		const vol = argChk_Num(hArg, 'volume', def);
		if (vol < 0) return 0;
		if (vol > 1) return 1;
		return vol;
	}

	//MARK: BGM/効果音のフェードアウト（loadから使うのでマクロ化禁止）
	#fadeoutbgm(hArg: TArg) {hArg.volume = 0; return this.#fadebgm(hArg)}
	//MARK: 効果音のフェードアウト（loadから使うのでマクロ化禁止）
	#fadeoutse(hArg: TArg) {hArg.volume = 0; return this.#fadese(hArg)}
	//MARK: BGMのフェード（loadから使うのでマクロ化禁止）
	#fadebgm(hArg: TArg) {hArg.buf = BUF_BGM; return this.#fadese(hArg)}
	//MARK: 効果音のフェード
	#fadese(hArg: TArg) {
		const {buf = BUF_SE} = hArg;
		this.#hSndBuf[buf]?.fade(hArg);

		return false;
	}

	//MARK: BGM の演奏
	#playbgm(hArg: TArg) {
		hArg.buf = BUF_BGM;
		hArg.canskip = false;
		argChk_Boolean(hArg, 'loop', true);
		return this.#playse(hArg);
	}

	//MARK: 効果音の再生
	#playse(hArg: TArg) {
		const {buf = BUF_SE} = hArg;
		this.#stopse({buf});

		// isSkipping()は此処のみとする。タイミングによって変わる
		if (argChk_Boolean(hArg, 'canskip', true) && this.#evtMng.isSkipping) return false;

		this.#initVol();

		const join = argChk_Boolean(hArg, 'join', true);
			// an時代・瀬戸愛羅さんより https://famibee.blog.fc2.com/blog-entry-106.html
			// デフォルトでjoin=trueの方が初心者に優しい
		this.#hSndBuf[buf] = SndBuf.generate(hArg, buf, join);

		return join;
	}
	#initVol = ()=> {
		Howler.volume(Number(this.val.getVal('sys:sn.sound.global_volume', 1)));
		this.#initVol = ()=> { /* empty */ };
	};

	//MARK: 全効果音再生の停止
	#stop_allse() {
		for (const buf of Object.keys(this.#hSndBuf)) this.#stopse({buf});
		this.#hSndBuf = {};

		Howler.unload();

		return false;
	}
	//MARK: BGM 演奏の停止（loadから使うのでマクロ化禁止）
	#stopbgm(hArg: TArg) {hArg.buf = BUF_BGM; return this.#stopse(hArg)}
	//MARK: 効果音再生の停止
	#stopse(hArg: TArg) {
		const {buf = BUF_SE} = hArg;
		this.#hSndBuf[buf]?.stopse();

		return false;
	}

	//MARK: BGM フェードの終了待ち
	#wb(hArg: TArg) {hArg.buf = BUF_BGM; return this.#wf(hArg)}

	//MARK: 効果音フェードの終了待ち
	#wf(hArg: TArg) {
		const {buf = BUF_SE} = hArg;
		return this.#hSndBuf[buf]?.wf(hArg) ?? false;
	}

	//MARK: BGM 再生の終了待ち
	#wl(hArg: TArg) {hArg.buf = BUF_BGM; return this.#ws(hArg)}
	//MARK: 効果音再生の終了待ち
	#ws(hArg: TArg) {
		const {buf = BUF_SE} = hArg;
		return this.#hSndBuf[buf]?.ws(hArg) ?? false;
	}

	//MARK: 再生トラックの交換
	#xchgbuf(hArg: TArg) {
		const {buf: buf1 = BUF_SE, buf2 = BUF_SE} = hArg;
		if (buf1 === buf2) return false;

		const a = this.#hSndBuf[buf1];	// 分割代入の変数交換だと noUncheckedIndexedAccess エラーになるので
		const b = this.#hSndBuf[buf2];
		// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
		if (a) this.#hSndBuf[buf2] = a; else delete this.#hSndBuf[buf2];
		// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
		if (b) this.#hSndBuf[buf1] = b; else delete this.#hSndBuf[buf1];

		xchgbuf(hArg);

		return false;
	}

	//MARK: しおりの読込（BGM状態復元）
	playLoopFromSaveObj(all_stop_and_play: boolean): Promise<void>[] {
		const lp = String(this.val.getVal('save:const.sn.loopPlaying', '{}'));
		if (lp === '{}') {this.#stop_allse(); return []}
/*
					(Now)#hSndBuf
					stop	play
	hSaveLP	stop	-		stop		--[1]
	(to)	play	play	stop/play	--[2]
			eq play	play	-			--[2]
*/
		const hSaveLP = <{[buf: string]: string}>JSON.parse(lp);
		if (all_stop_and_play) this.#stop_allse();
		else for (const [buf, sb] of Object.entries(this.#hSndBuf)) {
			// [1] #hSndBuf（再生中）だが hSaveLP（再生予定） にない buf -> stop
			if (! (buf in hSaveLP)) sb.stopse();
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
			if (hArg.buf === BUF_BGM) this.#playbgm(hArg);
			else this.#playse(hArg);
		}));
	}

	destroy() {this.#stop_allse()}

}
