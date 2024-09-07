/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2024 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {HArg} from './Grammar';
import {IVariable} from './CmnInterface';
import {Layer} from './Layer';
import {SysBase} from './SysBase';
import {argChk_Boolean} from './CmnLib';

import {Container} from 'pixi.js';

export class Pages {
	#pg: {fore: Layer, back: Layer};

	constructor(layname: string, readonly cls: string, fore: Container, back: Container, readonly hArg: HArg, readonly sys: SysBase, readonly val: IVariable, readonly ret: {isWait: boolean}) {
		const fncF = sys.hFactoryCls[cls];
		if (! fncF) throw `属性 class【${cls}】が不正です`;

		const f = fncF();
		const b = fncF();
		f.layname =
		b.layname = layname;
		const nm = hArg[':id_tag'] = `layer:${layname} cls:${cls} page:`;
		f.spLay.name = f.name = nm +'A';
		b.spLay.name = b.name = nm +'B';
		fore.addChild(f.spLay);
		back.addChild(b.spLay);
		argChk_Boolean(hArg, 'visible', true);
		argChk_Boolean(hArg, 'visible', true);// SKYNovelではデフォルトはtrueとする
		ret.isWait = f.lay(hArg) || b.lay(hArg);
		this.#pg = {fore: f, back: b};

		// 組み込み変数
		const valnm = `const.sn.lay.${layname}`;
		val.setVal_Nochk('tmp', valnm, true);
		val.defTmp(valnm +'.fore.alpha', ()=> this.#pg.fore.alpha);
		val.defTmp(valnm +'.back.alpha', ()=> this.#pg.back.alpha);
		val.defTmp(valnm +'.fore.height', ()=> this.#pg.fore.height);
		val.defTmp(valnm +'.back.height', ()=> this.#pg.back.height);
		val.defTmp(valnm +'.fore.visible', ()=> this.#pg.fore.spLay.visible);
		val.defTmp(valnm +'.back.visible', ()=> this.#pg.back.spLay.visible);
		val.defTmp(valnm +'.fore.width', ()=> this.#pg.fore.width);
		val.defTmp(valnm +'.back.width', ()=> this.#pg.back.width);
		val.defTmp(valnm +'.fore.x', ()=> this.#pg.fore.x);
		val.defTmp(valnm +'.back.x', ()=> this.#pg.back.x);
		val.defTmp(valnm +'.fore.y', ()=> this.#pg.fore.y);
		val.defTmp(valnm +'.back.y', ()=> this.#pg.back.y);
	}
	destroy() {
		this.#pg.fore.destroy();
		this.#pg.back.destroy();
	}

	readonly lay = (hArg: HArg)=> this.getPage(hArg).lay(hArg);
	readonly getPage = (hArg: HArg)=>
		(Pages.argChk_page(hArg, 'fore') !== 'back')
			? this.#pg.fore
			: this.#pg.back;
	static	argChk_page(hash: HArg, def: string): string {
		const v = hash.page ?? def;
		if (v === 'fore') return hash.page = v;
		if (v === 'back') return hash.page = v;

		throw Error('属性 page【'+ v +'】が不正です');
	}
	get fore(): Layer {return this.#pg.fore}
	get back(): Layer {return this.#pg.back}

	transPage(aPrm: Promise<void>[]): void {
		[this.#pg.back, this.#pg.fore] = [this.#pg.fore, this.#pg.back];
		this.#pg.back.copy(this.#pg.fore, aPrm);
	}

}
