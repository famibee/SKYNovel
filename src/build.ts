/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2022-2025 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

const [, , ...aCmd] = process.argv;
const watch = aCmd.includes('--watch') ?{} :null;
const web = aCmd.includes('--web') ?{} :null;
const app = aCmd.includes('--app') ?{} :null;

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

// === ブラウザ用 ===
if (! app)
build({
	build: {
		...oBuild,
		lib: {
			entry	: './src/web',
			fileName: _=> 'web.js',
			formats	: ['es'],
		},
		rollupOptions: {output},
	},
	plugins: [dts(oDts)],
});

// === アプリ用 ===
if (! web)
build({
	build: {
		...oBuild,
		lib: {
			entry	: './src/app',
			fileName: _=> 'app.js',
			formats	: ['es'],
		},
		outDir	: 'dist_app',
		rollupOptions: {
			external: [
				...builtinModules.flatMap(p=> [p, `node:${p}`]),
			],
			output,
		},
	},
	plugins: [dts(oDts)],
});

if (! web && ! app) {
build({
	build: {
		...oBuild,
		lib: {
			entry	: './src/appMain',
			fileName: _=> 'appMain.js',
			formats	: ['cjs'],
		},
		outDir	: 'dist_app',
		rollupOptions: {
			external: [
				'electron',
				'electron-devtools-installer',
				...builtinModules.flatMap(p=> [p, `node:${p}`]),
			],
			output,
		},
	},
	plugins: [dts(oDts)],
});

build({
	build: {
		...oBuild,
		lib: {
			entry	: './src/preload',
			fileName: _=> 'preload.js',
			formats	: ['cjs'],
		},
		outDir	: 'dist_app',
		rollupOptions: {
			external: [
				'electron',
				...builtinModules.flatMap(p=> [p, `node:${p}`]),
			],
			output,
		},
	},
	plugins: [dts(oDts)],
});

}
