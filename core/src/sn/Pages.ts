/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2020 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {HArg, IVariable} from './CmnInterface';
import {Layer} from './Layer';
import {SysBase} from './SysBase';
import {argChk_Boolean} from './CmnLib';

import {Container} from 'pixi.js';

export class Pages {
	private pg: {fore: Layer, back: Layer};

	constructor(layer: string, private readonly cls_: string, fore: Container, hArgFore: HArg, back: Container, hArgBack: HArg, sys: SysBase, val: IVariable, ret: {isWait: boolean}) {
		const fncF = sys.hFactoryCls[cls_];
		if (! fncF) throw `属性 class【${cls_}】が不正です`;

		this.pg = {fore: fncF(), back: fncF()};
		this.pg.fore.layname = layer;
		this.pg.back.layname = layer;
		this.pg.fore.name = `layer:${layer} cls:${cls_} page:A`;
		this.pg.back.name = `layer:${layer} cls:${cls_} page:B`;
		fore.addChild(this.fore.cnt);
		back.addChild(this.back.cnt);
		argChk_Boolean(hArgFore, 'visible', true);
		argChk_Boolean(hArgBack, 'visible', true);
			// SKYNovelではデフォルトはtrueとする
		ret.isWait = this.fore.lay(hArgFore);
		ret.isWait ||= this.back.lay(hArgBack);

		// 組み込み変数
		const valnm = `const.sn.lay.${layer}`;
		val.setVal_Nochk('tmp', valnm, true);
		val.defTmp(valnm +'.fore.alpha', ()=> this.pg.fore.alpha);
		val.defTmp(valnm +'.back.alpha', ()=> this.pg.back.alpha);
		val.defTmp(valnm +'.fore.height', ()=> this.pg.fore.height);
		val.defTmp(valnm +'.back.height', ()=> this.pg.back.height);
		val.defTmp(valnm +'.fore.visible', ()=> this.pg.fore.cnt.visible);
		val.defTmp(valnm +'.back.visible', ()=> this.pg.back.cnt.visible);
		val.defTmp(valnm +'.fore.width', ()=> this.pg.fore.width);
		val.defTmp(valnm +'.back.width', ()=> this.pg.back.width);
		val.defTmp(valnm +'.fore.x', ()=> this.pg.fore.x);
		val.defTmp(valnm +'.back.x', ()=> this.pg.back.x);
		val.defTmp(valnm +'.fore.y', ()=> this.pg.fore.y);
		val.defTmp(valnm +'.back.y', ()=> this.pg.back.y);
	}
	destroy() {
		this.pg.fore.destroy();
		this.pg.back.destroy();
	}

	readonly lay = (hArg: HArg)=> this.getPage(hArg).lay(hArg);
	readonly getPage = (hArg: HArg)=>
		(Pages.argChk_page(hArg, 'fore') !== 'back')
			? this.pg.fore
			: this.pg.back;
	static	argChk_page(hash: HArg, def: string): string {
		const v = hash.page ?? def;
		if (v === 'fore') return hash.page = v;
		if (v === 'back') return hash.page = v;

		throw Error('属性 page【'+ v +'】が不正です');
	}
	get cls() {return this.cls_;}
	get fore(): Layer {return this.pg.fore;}
	get back(): Layer {return this.pg.back;}

	transPage(): void {
		[this.pg.back, this.pg.fore] = [this.pg.fore, this.pg.back];
		this.pg.back.copy(this.pg.fore);
	}

}
