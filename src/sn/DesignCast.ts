/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2021-2024 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {HArg} from './Grammar';
import {IPropParser} from './CmnInterface';
import {SysBase} from './SysBase';
import {ScriptIterator} from './ScriptIterator';
import {HPage} from './LayerMng';
import {AnalyzeTagArg, HPRM} from './AnalyzeTagArg';
import {TxtStage} from './TxtStage';
import {Button} from './Button';
import {GrpLayer} from './GrpLayer';
import {Config} from './Config';

import {Application, Text, Sprite} from 'pixi.js';


export class DesignCast {
	static	init(_appPixi: Application, _sys: SysBase, _scrItr: ScriptIterator, _prpPrs: IPropParser, _alzTagArg: AnalyzeTagArg, _cfg: Config, _hPages: HPage) {}
	static	cvsResizeDesign() {}


	constructor(readonly bg_col: string, readonly isLay = false) {}
	destroy() {}

	gethArg(): HArg {return this.hArg}
	protected	hArg	: HArg	= {};
	sethArg(hArg: HArg): void {
		this.hArg = hArg;
	}

	setOther(_hPrm: HPRM) {}

	adopt(_idcCh: DesignCast) {	// 養子縁組
	}

	static	enterMode() {}
	static	allHide() {}
	set visible(_v: boolean) {}
	static	leaveMode() {}


	cvsResize() {}
	make() {}
	static replaceToken(_o: any) {}

}


// 画像レイヤ
export class GrpLayDesignCast extends DesignCast {
	constructor(_spLay: Sprite, _gl: GrpLayer) {super('#29e', true)}
	setSp(_sp: Sprite) {}
}

// 文字レイヤ
export class TxtLayDesignCast extends DesignCast {
	constructor(_spLay: Sprite, _ts: TxtStage) {
		super('#29e', true);
	}
}
// 文字レイヤ・パディング
export class TxtLayPadDesignCast extends DesignCast {
	constructor(_ts: TxtStage) {super('#9e2')}
}

// 文字レイヤ・ボタン基本
export class BtnDesignCast extends DesignCast {
	constructor(protected readonly btn: Button, override readonly hArg: HArg) {
		super('#e92');
	}
}
// 文字レイヤ・文字ボタン
export class TxtBtnDesignCast extends BtnDesignCast {
	constructor(btn: Button, hArg: HArg, _txt: Text) {
		super(btn, hArg);
	}
}

// 文字レイヤ・画像ボタン
export class PicBtnDesignCast extends BtnDesignCast {
	constructor(btn: Button, hArg: HArg) {super(btn, hArg)}
	setSp(_sp: Sprite) {}
}
