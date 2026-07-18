/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2022-2025 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

const [, , ...aCmd] = process.argv;
const watch = aCmd.includes('--watch') ?{} :null;

import {build, type BuildEnvironmentOptions} from 'vite';
import dts, {type PluginOptions} from 'vite-plugin-dts';
import {builtinModules} from 'node:module';

const oBuild: BuildEnvironmentOptions = {
	target		: 'esnext',

	sourcemap	: true,
	emptyOutDir	: false,
//	minify		: 'terser',
	reportCompressedSize	: false,
	watch,
};
const output = { // entry chunk assets それぞれの書き出し名の指定
	entryFileNames: '[name].js',
	chunkFileNames: '[name].js',
	assetFileNames: '[name].[ext]',
};
const oDts: PluginOptions = {
	beforeWriteFile: pathOut=> ({
		filePath: pathOut.replace('/src/', '/'),
	}),
};


const aP = [];

// === ブラウザ用 ===
aP.push(build({
	build: {
		...oBuild,
		lib: {
			entry	: './src/web',
			fileName: _=> 'web.js',
			formats	: ['es'],
		},
		rolldownOptions: {output},
	},
	plugins: watch ? [] : [dts(oDts)],
}));

// === アプリ用 ===
aP.push(build({
	build: {
		...oBuild,
		lib: {
			entry	: './src/app',
			fileName: _=> 'app.js',
			formats	: ['es'],
		},
		outDir	: 'dist_app',
		rolldownOptions: {
			external: builtinModules.flatMap(p=> [p, `node:${p}`]),
			output,
		},
	},
	plugins: watch ? [] : [dts(oDts)],
}));

aP.push(build({
	build: {
		...oBuild,
		lib: {
			entry	: './src/appMain',
			fileName: _=> 'appMain.js',
			formats	: ['cjs'],
		},
		outDir	: 'dist_app',
		rolldownOptions: {
			external: [
				'electron',
				'electron-devtools-installer',
				'fs-extra',
				'electron-store',
				'adm-zip',
				...builtinModules.flatMap(p=> [p, `node:${p}`]),
			],
			output,
		},
	},
	plugins: watch ? [] : [dts(oDts)],
}));

aP.push(build({
	build: {
		...oBuild,
		lib: {
			entry	: './src/preload',
			fileName: _=> 'preload.js',
			formats	: ['cjs'],
		},
		outDir	: 'dist_app',
		rolldownOptions: {
			external: [
				'electron',
				...builtinModules.flatMap(p=> [p, `node:${p}`]),
			],
			output,
		},
	},
	plugins: watch ? [] : [dts(oDts)],
}));

void Promise.allSettled(aP);
