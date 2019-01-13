/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2019-2019 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import Humane from './humane4sn/humane.min.js';

	import css from './humane4sn/bigbox.css';

//	import './humane4sn/bigbox.css';		// err/non output
//	import * as './humane4sn/bigbox.css';	// err
//	const m0 = require('./humane4sn/bigbox.css');	// err/non output
//	const mod = require('./humane4sn/bigbox.css');	// err/non output
//	const mod = import('./humane4sn/bigbox.css');	// err/non output
//	require('./humane4sn/bigbox.css');

export var init = hSN=> {
console.log(`path=${hSN.path}`);


//	console.log(css.toString());
//	const mod = import('./humane4sn/bigbox.css');	// 有効にするとweb.0.jsとか増える
//	const css = import(/* webpackChunkName: "plugin" */ './humane4sn/bigbox.css');
		// 増えるにしても、名前を指定してみたり

/*
	const humane = Humane.create();
	humane.log('humane');
*/
/*
	const link = document.createElement('link');
	link.rel = 'stylesheet';
//	link.href = 'engine/plugin/humane4sn/bigbox.css';
	link.href = hSN.path +'humane4sn/bigbox.css';
*/
/*
	const style = document.createElement('style');
	style.type = 'text/css';
//	style.innerHTML = require('./humane4sn/bigbox.css');
//	style.innerHTML = import('./humane4sn/bigbox.css');
//	style.innerHTML = require(hSN.path +'humane4sn/bigbox.css');
	document.getElementsByTagName('head')[0].appendChild(style);

	import('./humane4sn/bigbox.css').then(v=> console.log(v));
*/


/*
	const style = document.createElement('style');
	document.getElementsByTagName('head')[0].appendChild(style);
	style.type = 'text/css';
//	style.innerHTML = require('./humane4sn/bigbox.css');
//	import('./humane4sn/bigbox.css').then(v=> {style.innerHTML = v});
	fetch('./humane4sn/bigbox.css').then(v=> {style.innerHTML = v});
*/
/*
	<style type="text/css">@import "cssファイル";</style>
	<link rel="stylesheet" type="text/css" href="cssファイル" />
*/
/*
	const link = document.createElement('link');
	link.rel = 'stylesheet';
	link.type = 'text/css';
	link.href = './humane4sn/bigbox.css';
	const style = document.createElement('style');
	document.getElementsByTagName('head')[0].appendChild(style);
	style.type = 'text/css';
	style.innerHTML = '@import "./humane4sn/bigbox.css";';
	// Refused to apply style from 'http://localhost:8080/humane4sn/bigbox.css' because its MIME type ('text/html') is not a supported stylesheet MIME type, and strict MIME checking is enabled.
*/

	Humane.baseCls = 'humane-bigbox';

	hSN.hTag['notice'] = hArg=> {
		Humane.log(hArg.text);

		return false;
	};
};
