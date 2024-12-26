/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2024-2024 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {DEF_CFG} from '../src/sn/ConfigBase';
import {SysNode} from '../src/sn/SysNode';
import hPath from './path.json';


export class SysTest extends SysNode {
	override	fetch = (url: string)=> Promise.resolve(new Response(
		JSON.stringify( url === 'test/prj.json' ? DEF_CFG : hPath )
	));
}
