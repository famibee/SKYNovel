/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2019-2019 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import Humane from './humane4sn/humane.min.js';

export var init = (_hSN)=> {
/*
	const humane = Humane.create();
	humane.log('humane');
*/
	const link = document.createElement('link');
	link.rel = 'stylesheet';
	link.href = 'engine/plugin/humane4sn/bigbox.css';
//	link.href = './humane4sn/bigbox.css';
	document.getElementsByTagName('head')[0].appendChild(link);
	Humane.baseCls = 'humane-bigbox';


//console.log(`path:${_hSN.path}`);

	_hSN.hTag['notice'] = hArg=> {
		Humane.log(hArg.text);

		return false;
	};

};
