import {defineConfig, globalIgnores} from 'eslint/config'
import js from '@eslint/js'
import jest from 'eslint-plugin-jest'
import {configs, parser, plugin} from 'typescript-eslint'
import globals from 'globals'
import plgImport from 'eslint-plugin-import'

// glob 確認用
// import {glob} from 'glob'
// const paths = await glob('{src,test}/**/*.ts', {ignore: 'node_modules/**'});
// console.log(`fn:eslint.config.mts len:${paths.length} \n = ${paths.join('\n = ')}`);


export default defineConfig([
// ]);const a = ([	// 一時的 OFF 用
	globalIgnores([
		'eslint.config.mts',	// このファイル自身はチェックせず
	]),
	js.configs.recommended,
	configs.recommendedTypeChecked,
	configs.strictTypeChecked,		// バグも検出できる、より独自のルールを含むスーパーセット
	configs.stylisticTypeChecked, {// バグを大幅に検出したりロジックを変更したりすることなく、一貫したスタイルを適用する追加ルール。
		languageOptions: {
			parser,
			parserOptions: {
				projectService: true,
				// project: './tsconfig.eslint.json',	// なくてもいい？
				tsconfigRootDir: import.meta.dirname,
			},
			globals: {
				...globals.browser,	// Webブラウザ(Client)環境の場合
				...globals.node,	// Node.js(Server)環境の場合
				...jest.environments.globals.globals,
				NodeJS : true,
			},
		},
		// ignores: ['eslint.config.mts'],	// このファイル自身はチェックせず
			// 上の globalIgnores があればいらないみたい
		settings: {
			jest: {version: 'latest'},
		},
		plugins: {
			js,
			jest,
			'@typescript-eslint': plugin,
		},
		extends: [],
	},
	jest.configs['flat/recommended'],
	plgImport.flatConfigs.recommended,
	plgImport.flatConfigs.typescript,
	{
		name: 'ほぼすべての ts',
		files: ['{src,test}/**/*.ts'],
		rules: {
			// 未使用変数チェックの回避 _
			'no-unused-vars': 'off',	// VSC がやるので
			'@typescript-eslint/no-unused-vars': 'off',
			'no-extra-semi': 'warn',	// セミコロン ; の重複
			'quotes': ['warn', 'single'],
			// awaitを忘れないように
			'@typescript-eslint/no-floating-promises': ['error', {
				ignoreIIFE: true,	// IIFEでは怒られないように
			}],
			// async/awaitを使うべきではない書き方を怒ってくれる
			'@typescript-eslint/no-misused-promises': 'error',

			'@typescript-eslint/consistent-type-definitions': ['error', 'type'],
			'@typescript-eslint/consistent-indexed-object-style': ['error', 'index-signature'],
			// 'no-empty-function': 'off',
			// '@typescript-eslint/no-empty-function': 'off',
			'@typescript-eslint/no-confusing-void-expression': 'off',
			// 'no-throw-literal': 'error',
			'no-throw-literal': 'off',	// できれば有効にした方がいい
			'@typescript-eslint/only-throw-error': 'off',
			'@typescript-eslint/consistent-type-assertions': ['error', {
				arrayLiteralTypeAssertions: 'allow',
				assertionStyle: 'angle-bracket',
				objectLiteralTypeAssertions: 'allow',
			}],

			'import/no-unresolved': 'off',

			// ESLintのエラールール。日本語ざっくり解説[可能性があるエラー編] https://qiita.com/M-ISO/items/f9097a75b362206c2a99
			'no-control-regex': 'error',
			'no-extra-parens': 'warn',
			'no-regex-spaces': 'error',

			// ESLintのエラールール。日本語ざっくり解説[ES6編] https://qiita.com/M-ISO/items/f0c2f0e669db32cf4efb
			'object-shorthand': 'error',

			// ESLintのエラールール。日本語ざっくり解説[スタイル編] https://qiita.com/M-ISO/items/113ddd448bdc496af783
			// brace-style
			// no-nested-ternary
			'no-trailing-spaces': 'error',
			'no-unneeded-ternary': 'error',
			// one-var
			'operator-assignment': 'error',
			'semi-spacing': ['error', {before: false, after: true}],
			'space-before-function-paren': ['error', {
				anonymous: 'never',
				named: 'never',
				asyncArrow: 'always'
			}],
			'space-unary-ops': ['error', {
				overrides: {'!': true, '~': true},
			}],
			// spaced-comment

			// ESLintのエラールール。日本語ざっくり解説[ベストプラクティス編] https://qiita.com/M-ISO/items/4cd183e2496c2937a53e
			// curly: ['error', 'multi-or-nest'],
			'eqeqeq': 'error',
			'no-alert': 'error',
			'no-else-return': 'error',
			'no-eval': 'error',
			'no-extend-native': 'error',
			'no-invalid-this': 'error',
			'no-labels': 'error',
			'no-loop-func': 'error',
			'no-multi-str': 'error',
			'no-new-wrappers': 'error',
			'no-param-reassign': 'error',
			'no-process-env': 'error',
			'no-return-assign': 'error',
			'no-script-url': 'error',
			'no-unused-expressions': 'error',
			'no-useless-call': 'error',
			'no-useless-concat': 'error',
		},
	},
]);
