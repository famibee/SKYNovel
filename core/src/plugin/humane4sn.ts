/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2019-2019 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {HArg, IPluginInitArg} from '../sn/CmnLib';

// 当プラグイン使用時は以下が必要
//	npm i -S humane-js
//	npm i -D @types/humane
const Humane = require('humane-js');
import '!style-loader!css-loader!../../../node_modules/humane-js/themes/bigbox.css';

export var init = (hSN: IPluginInitArg)=> {
	Humane.baseCls = 'humane-bigbox';
/*
	const humane = Humane.create();
	humane.log('humane');
*/
	hSN.addTag('notice', (hArg: HArg)=> {
		Humane.log(hArg.text);

		return false;
	});
};
