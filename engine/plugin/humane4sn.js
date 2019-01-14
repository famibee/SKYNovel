/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2019-2019 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import Humane from './humane4sn/humane.min.js';

import './humane4sn/bigbox.css';	// https://ics.media/entry/17376

//	import css from './humane4sn/bigbox.css';	// non err, output
												// err, output

//	const m0 = require('./humane4sn/bigbox.css');	// err, non output
//	const mod = require('./humane4sn/bigbox.css');	// err, non output
//	const mod = import('./humane4sn/bigbox.css');	// err, non output

//	require('./humane4sn/bigbox.css');	// err, non output but into web.js
//	const css = require('./humane4sn/bigbox.css');	// err, non output but into web.js, css = {}

export var init = hSN=> {


//	const mod = import('./humane4sn/bigbox.css');	// 有効にするとweb.0.jsとか増える
//	const css = import(/* webpackChunkName: "plugin" */ './humane4sn/bigbox.css');
		// 増えるにしても、名前を指定してみたり
//	console.log(`css:%o`, css);


/*
	const style = document.createElement('style');
	style.type = 'text/css';
	style.rel = 'stylesheet';
	style.href = './humane4sn/bigbox.css';	// ロードもしない
//	style.innerHTML = require('./humane4sn/bigbox.css');	// err
//	style.innerHTML = import('./humane4sn/bigbox.css');
//	style.innerHTML = require(hSN.path +'humane4sn/bigbox.css');
	document.getElementsByTagName('head')[0].appendChild(style);
*/

/*
	// non load, non err
	const link = document.createElement('link');
	link.rel = 'stylesheet';
//	link.href = 'engine/plugin/humane4sn/bigbox.css';
//	link.href = hSN.path +'humane4sn/bigbox.css';
	link.href = './humane4sn/bigbox.css';
*/

//	import('./humane4sn/bigbox.css').then(v=> console.log(v));
//	import('./humane4sn/bigbox.css').then(v=> {style.innerHTML = v});
//	fetch('./humane4sn/bigbox.css').then(v=> {style.innerHTML = v});
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
/*
	const humane = Humane.create();
	humane.log('humane');
*/

	hSN.hTag['notice'] = hArg=> {
		Humane.log(hArg.text);

		return false;
	};
};
