/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2024-2025 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {creCFG} from '../src/sn/ConfigBase';
import {SysBase} from '../src/sn/SysBase';
import hPath from './path.json';


export class SysTest extends SysBase {
	override	fetch = (url: string)=> Promise.resolve(new Response(
		JSON.stringify( url === 'test/prj.json' ? creCFG() : hPath )
	));
}
