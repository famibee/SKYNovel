/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {Layer} from './Layer';
import {HArg} from './CmnLib';

export class Pages {
	constructor(name: string, public cls: string, private page: {fore: Layer, back: Layer}) {
		page.fore.name = `lay:${name} cls:${cls} page:0`;	// 4Debug
		if (page.back) {
			page.back.name = `lay:${name} cls:${cls} page:1`;	// 4Debug
		}
		else {
			page.back = page.fore;
		}
	}
	destroy() {
		this.page.fore.destroy();
		this.page.back.destroy();
	}

	lay(hArg: HArg): boolean {return this.getPage(hArg).lay(hArg);}
	getPage(hArg: HArg): Layer {
		return (Pages.argChk_page(hArg, 'fore') != 'back')
			? this.page.fore
			: this.page.back;
	}
	static	argChk_page(hash: HArg, def: string): string {
		const v = hash.page || def;
		if (v == 'fore') return hash.page = v;
		if (v == 'back') return hash.page = v;

		throw Error('属性 page【'+ v +'】が不正です');
	}
	get fore(): Layer {return this.page.fore;}
	get back(): Layer {return this.page.back;}

	transPage(): void {
		[this.page.back, this.page.fore] = [this.page.fore, this.page.back];
		this.page.back.copy(this.page.fore);
	}
/*
	recordAMF(o:IDataOutput):void {
		page.fore.recordAMF(o);
	//	if (page.back == page.fore) return;
			// 無駄だがデータ互換性が無くなるので
		page.back.recordAMF(o);
	}
	playbackAMF(i:IDataInput, ldMng:LoadMng):void {
		page.fore.playbackAMF(i, ldMng);
	//	if (page.back == page.fore) return;
			// 無駄だがデータ互換性が無くなるので
		page.back.playbackAMF(i, ldMng);
	}*/
};
