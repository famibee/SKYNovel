const [, , ...aCmd] = process.argv;
const watch = aCmd.includes('--watch');

const {build} = require('vite');
const dts = require('vite-plugin-dts');
const {resolve} = require('path');
const {builtinModules} = require('module');

const oDts = {
	beforeWriteFile: pathOut=> {
		return {filePath: pathOut.replace('/src/', '/')};
	},
};

Promise.allSettled([
	// === ブラウザ用 ===
	build({
		build: {
			lib: {
				entry	: resolve(__dirname, 'web.ts'),
				fileName: _=> 'web.js',
				formats	: ['es'],
			},
		//	treeShaking	: true,		// 省略可
			sourcemap	: true,
			emptyOutDir	: false,
	//		minify	: true,
			watch,
		},
		plugins: [dts(oDts)],
	}),


	// === アプリ用 ===
	build({
		build: {
			lib: {
				entry	: resolve(__dirname, 'app.ts'),
				fileName: _=> 'app.js',
				formats	: ['es'],
			},
		//	treeShaking	: true,		// 省略可
			sourcemap	: true,
			emptyOutDir	: false,
	//		minify	: true,
			watch,
			rollupOptions: {
				external: [
					...builtinModules.flatMap(p=> [p, `node:${p}`]),
				],
			},
		},
		plugins: [dts(oDts)],
	}),

	build({
		build: {
			lib: {
				entry	: resolve(__dirname, 'appMain.ts'),
				fileName: _=> 'appMain.js',
				formats	: ['cjs'],
			},
		//	treeShaking	: true,		// 省略可
			sourcemap	: true,
			emptyOutDir	: false,
	//		minify	: true,
			watch,
			rollupOptions: {
				external: [
					'electron',
					'electron-devtools-installer',
					...builtinModules.flatMap(p=> [p, `node:${p}`]),
				],
			},
		},
		plugins: [dts(oDts)],
	}),

	build({
		build: {
			lib: {
				entry	: resolve(__dirname, 'preload.ts'),
				fileName: _=> 'preload.js',
				formats	: ['cjs'],
			},
		//	treeShaking	: true,		// 省略可
			sourcemap	: true,
			emptyOutDir	: false,
	//		minify	: true,
			watch,
			rollupOptions: {
				external: [
					'electron',
					...builtinModules.flatMap(p=> [p, `node:${p}`]),
				],
			},
		},
		plugins: [dts(oDts)],
	}),
]);
