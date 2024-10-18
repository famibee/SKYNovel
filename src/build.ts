/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2022-2024 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

const [, , ...aCmd] = process.argv;
const watch = aCmd.includes('--watch') ?{} :null;
const web = aCmd.includes('--web') ?{} :null;

import {build} from 'vite';
import dts, {PluginOptions} from 'vite-plugin-dts';
import {resolve} from 'node:path';
import {builtinModules} from 'node:module';

const oDts: PluginOptions = {
	beforeWriteFile: pathOut=> {
		return {filePath: pathOut.replace('/src/', '/')};
	},
};

// === ブラウザ用 ===
build({
	build: {
		target		: 'esnext',
		lib: {
			entry	: resolve(__dirname, 'web'),
			fileName: _=> 'web.js',
			formats	: ['es'],
		},
		sourcemap	: true,
		emptyOutDir	: false,
//		minify		: 'terser',
		reportCompressedSize	: false,
		watch,
		rollupOptions: {
			output: { // entry chunk assets それぞれの書き出し名の指定
				entryFileNames: `[name].js`,
				chunkFileNames: `[name].js`,
				assetFileNames: `[name].[ext]`,
			},
		},
	},
	plugins: [dts(oDts)],
});
if (! web) {

// === アプリ用 ===
build({
	build: {
		target		: 'esnext',
		lib: {
			entry	: resolve(__dirname, 'app'),
			fileName: _=> 'app.js',
			formats	: ['es'],
		},
		sourcemap	: true,
		emptyOutDir	: false,
//		minify		: 'terser',
		reportCompressedSize	: false,
		watch,
		rollupOptions: {
			external: [
				...builtinModules.flatMap(p=> [p, `node:${p}`]),
			],
			output: { // entry chunk assets それぞれの書き出し名の指定
				entryFileNames: `[name].js`,
				chunkFileNames: `[name].js`,
				assetFileNames: `[name].[ext]`,
			},
		},
	},
	plugins: [dts(oDts)],
});

build({
	build: {
		target		: 'esnext',
		lib: {
			entry	: resolve(__dirname, 'appMain'),
			fileName: _=> 'appMain.js',
			formats	: ['cjs'],
		},
		sourcemap	: true,
		emptyOutDir	: false,
//		minify		: 'terser',
		reportCompressedSize	: false,
		watch,
		rollupOptions: {
			external: [
				'electron',
				'electron-devtools-installer',
				...builtinModules.flatMap(p=> [p, `node:${p}`]),
			],
			output: { // entry chunk assets それぞれの書き出し名の指定
				entryFileNames: `[name].js`,
				chunkFileNames: `[name].js`,
				assetFileNames: `[name].[ext]`,
			},
		},
	},
	plugins: [dts(oDts)],
});

build({
	build: {
		target		: 'esnext',
		lib: {
			entry	: resolve(__dirname, 'preload'),
			fileName: _=> 'preload.js',
			formats	: ['cjs'],
		},
		sourcemap	: true,
		emptyOutDir	: false,
//		minify		: 'terser',
		reportCompressedSize	: false,
		watch,
		rollupOptions: {
			external: [
				'electron',
				...builtinModules.flatMap(p=> [p, `node:${p}`]),
			],
			output: { // entry chunk assets それぞれの書き出し名の指定
				entryFileNames: `[name].js`,
				chunkFileNames: `[name].js`,
				assetFileNames: `[name].[ext]`,
			},
		},
	},
	plugins: [dts(oDts)],
});

}
