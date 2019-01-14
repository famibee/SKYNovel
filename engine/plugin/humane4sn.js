/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2019-2019 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import Humane from './humane4sn/humane.min.js';
import '!style-loader!css-loader!./humane4sn/bigbox.css';

export var init = hSN=> {
	Humane.baseCls = 'humane-bigbox';
/*
	const humane = Humane.create();
	humane.log('humane');
*/
	hSN.hTag['notice'] = hArg=> {
		Humane.log(hArg.text);

		return false;
	};
};
