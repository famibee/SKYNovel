/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2025-2025 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import type {TArg, T_HTag} from './Grammar';
import type {T_Variable} from './CmnInterface';
import type {T_CFG} from './ConfigBase';


export type T_LOG = {
	recText		: (txt: string)=> void;
	pagebreak: ()=> void;
};

type T_LOG_DATA = TArg & {
	text	: string;	// 履歴文字列
}


// ログ管理
//	・要求仕様
//		[ch][rec_ch][rec_r][reset_rec] で履歴を記録・操作し、
//		変数 🦀const.sn.log.json を取得したときにいい感じの値を返す。
export class Log implements T_LOG {
	#LastLog	: T_LOG_DATA	= {text: ''};	// 🌾
	#aLog		: T_LOG_DATA[]	= [];			// 🍚


	constructor(private readonly oCfg: T_CFG, private readonly hTag: T_HTag, private readonly val: T_Variable) {
		hTag.rec_ch			= o=> this.#rec_ch(o);		// 履歴書き込み
		hTag.rec_r			= o=> this.#rec_r(o);		// 履歴改行
		hTag.reset_rec		= o=> this.#reset_rec(o);	// 履歴リセット

		// 履歴 JSON テキスト
		// 【内部変数】（ざっくりと）🦀 = 🍚this.#aLog + 🌾this.#LastLog
		val.defTmp('const.sn.log.json', ()=> {
			// HTML連結を一つにまとめる（始端終端のタグのみにする）
			//	text追加時ではなく、値を参照されるこのときまで遅らせて処理
			this.#LastLog.text =	// 🌾
			this.#LastLog.text
			.replaceAll('</span><span class=\'sn_ch\'>', '');

			const o = [...this.#aLog, this.#LastLog];	// 🍚 + 🌾
			return JSON.stringify(o);	// 🦀
		});
		this.recText('');
	}

	// [ch] からコールされる
	//	[ch]		// 文字を追加する
		// recText(text: string) コール
		// 	🌾this.#LastLog		= {text};	// 置換でよい
		// 	🍊save:const.sn.sLog = 🦀const.sn.log.json	// これを起動したい
	recText(text: string) {
		this.#LastLog.text = text;		// 🌾 text は置換でよい
		this.val.setVal_Nochk('save', 'const.sn.sLog',	// 🍊 リプレイ時の回復用
			String(this.val.getVal('const.sn.log.json'))	// これを起動したい
		);
	}

	//MARK: 履歴書き込み
	//	🌾this.#LastLog = {...hArg, text: 🌾this.#LastLog.text};
	#rec_ch(hArg: TArg) {
		this.#LastLog = {...hArg, text: this.#LastLog.text};
		if (! hArg.text) {
			this.val.setVal_Nochk('save', 'const.sn.sLog',// 🍊 リプレイ時の回復用
				String(this.val.getVal('const.sn.log.json'))// これを起動したい
			);
			return false;
		}

		hArg.record = true;
		hArg.style ??= '';
		hArg.style += 'display: none;';	// gotxt内で削除し履歴に表示
		hArg.wait = 0;
		return this.hTag.ch(hArg);	// この先は text, style, r_style 以外破棄されてしまうので注意
	}

	//MARK: 履歴改行
	#rec_r(hArg: TArg) {return this.#rec_ch({...hArg, text: '[r]'})}

	//MARK: 履歴リセット
	//	以下をクリア。text で置き換え値を設定できる
	//	🌾this.#LastLog		= {text: hArg.text ?? ''};
	//	🍚this.#aLog		= []
	//	🍊save:const.sn.sLog= hArg.text ?[{text:"${hArg.text}"}] : []
	#reset_rec(hArg: TArg) {
		this.#aLog = [];
		hArg.text ??= '';
		this.#LastLog = {text: hArg.text};	// 🌾
		this.val.setVal_Nochk('save', 'const.sn.sLog', JSON.stringify([this.#LastLog]));	// 🍊 リプレイ時の回復用

		return false;
	}

	//MARK: 履歴改ページ
	pagebreak() {
		this.#LastLog.text =	// 🌾
		this.#LastLog.text
		.replaceAll('</span><span class=\'sn_ch\'>', '');

		if (! this.#LastLog.text) return;	//	🌾this.#LastLog

		if (this.#aLog.push(this.#LastLog) > this.oCfg.log.max_len) this.#aLog = this.#aLog.slice(-this.oCfg.log.max_len);
		this.#LastLog = {text: ''};		// 🌾
	}

	//MARK: 履歴回復
	// save:const.sn.sLog からの復帰
	playback() {
		this.#aLog = <T_LOG_DATA[]>JSON.parse(String(this.val.getVal('save:const.sn.sLog')));		// 🍚this.#aLog	= 🍊 リプレイ時の回復用
		this.#LastLog = {text: ''};		// 🌾
	}

}
