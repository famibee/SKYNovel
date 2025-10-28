/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2021-2025 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import type {HArg} from './Grammar';
import type {IPropParser} from './CmnInterface';
import type {SysBase} from './SysBase';
import type {ScriptIterator} from './ScriptIterator';
import type {HPage} from './LayerMng';
import type {HPRM} from './AnalyzeTagArg';
import type {TxtStage} from './TxtStage';
import type {Button} from './Button';
import type {GrpLayer} from './GrpLayer';
import type {Config} from './Config';

import type {Application, Text, Sprite} from 'pixi.js';


export class DesignCast {
	static	init(_appPixi: Application, _sys: SysBase, _scrItr: ScriptIterator, _prpPrs: IPropParser, _cfg: Config, _hPages: HPage) { /* empty */ }
	static	cvsResizeDesign() { /* empty */ }
//	static	readonly	#alzTagArg	= new AnalyzeTagArg;


	constructor(readonly bg_col: string, readonly isLay = false) {}
	destroy() { /* empty */ }

	gethArg(): HArg {return this.hArg}
	protected	hArg	: HArg	= {};
	sethArg(hArg: HArg): void {
		this.hArg = hArg;
	}

	setOther(_hPrm: HPRM) { /* empty */ }

	adopt(_idcCh: DesignCast) {	// 養子縁組
	}

	static	enterMode() { /* empty */ }
	static	allHide() { /* empty */ }
	set visible(_v: boolean) { /* empty */ }
	static	leaveMode() { /* empty */ }


	cvsResize() { /* empty */ }
	make() { /* empty */ }
	static replaceToken(_o: unknown) { /* empty */ }

}


// 画像レイヤ
export class GrpLayDesignCast extends DesignCast {
	constructor(_ctn: Sprite, _gl: GrpLayer) {super('#29e', true)}
	setSp(_sp: Sprite) { /* empty */ }
}

// 文字レイヤ
export class TxtLayDesignCast extends DesignCast {
	constructor(_ctn: Sprite, _ts: TxtStage) {
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
	setSp(_sp: Sprite) { /* empty */ }
}
