/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2019 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {HArg, typeLayerClass, IVariable} from './CmnLib';
import {Layer} from './Layer';
import {GrpLayer} from './GrpLayer';
import {TxtLayer} from './TxtLayer';
import {ThreeDLayer} from './ThreeDLayer';

import { Container } from 'pixi.js';

export class Pages {
	private pg: {fore: Layer, back: Layer};

	constructor(layer: string, private cls_: typeLayerClass, fore: Container, hArgFore: HArg, back: Container, hArgBack: HArg, val: IVariable) {
		switch (cls_) {
		case 'grp':	this.pg = {fore: new GrpLayer, back: new GrpLayer};	break;
		case 'txt':	this.pg = {fore: new TxtLayer, back: new TxtLayer};	break;
		case '3d':	this.pg = {fore: new ThreeDLayer, back: new ThreeDLayer}; break;
		default:	throw `属性 class【${cls_}】が不正です`;
		}
		this.pg.fore.name = `layer:${layer} cls:${cls_} page:A`;
		this.pg.back.name = `layer:${layer} cls:${cls_} page:B`;
		fore.addChild(this.fore.cnt);
		back.addChild(this.back.cnt);
		this.fore.lay(hArgFore);
		this.back.lay(hArgBack);

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
	}
	destroy() {
		this.pg.fore.destroy();
		this.pg.back.destroy();
	}

	lay(hArg: HArg): boolean {return this.getPage(hArg).lay(hArg);}
	getPage(hArg: HArg): Layer {
		return (Pages.argChk_page(hArg, 'fore') != 'back')
			? this.pg.fore
			: this.pg.back;
	}
	static	argChk_page(hash: HArg, def: string): string {
		const v = hash.page || def;
		if (v == 'fore') return hash.page = v;
		if (v == 'back') return hash.page = v;

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
