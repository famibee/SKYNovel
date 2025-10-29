## [1.63.15](https://github.com/famibee/SKYNovel/compare/v1.63.14...v1.63.15) (2025-10-29)


### Bug Fixes

* Publish to NPM Registry 手直し8 ([90aa634](https://github.com/famibee/SKYNovel/commit/90aa634012e55d29755bc1936116e10aeaade2a6))

## [1.63.14](https://github.com/famibee/SKYNovel/compare/v1.63.13...v1.63.14) (2025-10-29)


### Bug Fixes

* Publish to NPM Registry 手直し7 ([106a711](https://github.com/famibee/SKYNovel/commit/106a71189e659fc5ed85a4eeff7bf6deca583404))

## [1.63.13](https://github.com/famibee/SKYNovel/compare/v1.63.12...v1.63.13) (2025-10-29)


### Bug Fixes

* Publish to NPM Registry 手直し6 ([60d5113](https://github.com/famibee/SKYNovel/commit/60d51131790cb3e52a1afca730574a6f48e6ebe3))

## [1.63.12](https://github.com/famibee/SKYNovel/compare/v1.63.11...v1.63.12) (2025-10-29)


### Bug Fixes

* Publish to NPM Registry 手直し5 ([9986d85](https://github.com/famibee/SKYNovel/commit/9986d856170dedefd7f8cc68ccbe13e57a4fc356))

## [1.63.11](https://github.com/famibee/SKYNovel/compare/v1.63.10...v1.63.11) (2025-10-29)

：

* release.yml 手直し17 ([e753941](https://github.com/famibee/SKYNovel/commit/e75394193f535d82f93633185b94982881c8af72))

## [1.63.1](https://github.com/famibee/SKYNovel/compare/v1.63.0...v1.63.1) (2025-10-29)


### Bug Fixes

* release.yml 手直し ([5605015](https://github.com/famibee/SKYNovel/commit/5605015a71e7a3ff1d50582b79e237149142c4e5))

- fix: release.yml 手直し
	- npm Trusted PublishingでOIDCを使ってトークンレスでCIからnpmパッケージを公開
	- npm Provenance
	- set-output 使用廃止


# [1.63.0](https://github.com/famibee/SKYNovel/compare/v1.62.3...v1.63.0) (2025-10-28)


### Features

* ESLint 導入、一部指摘無効化しつつも全ソースクリンナップ完了 ([5b6621a](https://github.com/famibee/SKYNovel/commit/5b6621a57d3e69e3984950861cd82790c453bf72))

- feat: ESLint 導入、一部指摘無効化しつつも全ソースクリンナップ完了
	- @eslint/js: configs.recommended
	- typescript-eslint: configs.strictTypeChecked
	- typescript-eslint: configs.stylisticTypeChecked
	- jest.configs['flat/recommended']
	- plgImport.flatConfigs.recommended
	- plgImport.flatConfigs.typescript
- fix: セーブデータ関連の処理を手直し。型宣言厳密化、修正
- fix: 使い回す定数オブジェクトはファクトリメソッドで
	- なんらかの理由で定数が変更されたりディープコピーに弱かったりするため
- fix: async / await 関連の手直し
- feat: 再生開始時に sys:const.sn.sound.【buf】.volume（サウンドバッファの目標音量）がなければデフォルト値 1 で追加するように
- fix: src/appMain.ts の csj/ESM 共通点を src/appMain_cmn.ts に抽出
- fix: 履歴関係の手直し、src/sn/Log.ts に抽出
- fix: その他細かい手直し
- test: ギャラリーで一通り動作確認


## [1.62.3](https://github.com/famibee/SKYNovel/compare/v1.62.2...v1.62.3) (2025-09-20)


### Bug Fixes

* [wait_tsy] の chk_exist_tw 属性を廃止 ([2a2394d](https://github.com/famibee/SKYNovel/commit/2a2394d004b396b325b9da6ab7e1404faa33b533))

- fix: [wait_tsy] の chk_exist_tw 属性を廃止
	- [tsy]〜文字表示＆待ち＋[wait_tsy chk_exist_tw=true] という状況で、[tsy]のアニメが先に終り文字表示がゆっくり終了した場合、必ずエラーになってしまうため。


## [1.62.2](https://github.com/famibee/SKYNovel/compare/v1.62.1...v1.62.2) (2025-09-13)


### Bug Fixes

* クラス import に影響が出ていた定数の記述を EventMng -> CmnLib に変更 ([a52e596](https://github.com/famibee/SKYNovel/commit/a52e5961295ddb62ca0e79a8508ee0117c9dedac))

- fix: クラス import に影響が出ていた定数の記述を EventMng -> CmnLib に変更
- fix: プラグイン初期化時に await が抜けていたのを修正


## [1.62.1](https://github.com/famibee/SKYNovel/compare/v1.62.0...v1.62.1) (2025-08-31)


### Bug Fixes

* **src/sn/EventMng.ts:** 下矢印キーでの読み進めで一度しか効かず、読み進められない件 ([72bc092](https://github.com/famibee/SKYNovel/commit/72bc09276e4b89cad599d2d67549fe85b62bdc6e))

- fix(src/sn/EventMng.ts): 下矢印キーでの読み進めで一度しか効かず、読み進められない件
	- イベントダブリ弾き機構のミス。
- fix(src/sn/EventMng.ts): 矢印キー押下時にページが移動するので preventDefault() を行うように


# [1.62.0](https://github.com/famibee/SKYNovel/compare/v1.61.23...v1.62.0) (2025-08-27)


### Features

* イベント処理の状態遷移を簡素化、整理 ([8d7224f](https://github.com/famibee/SKYNovel/commit/8d7224f3331bbc680c4e5b696f2bb5b533e313e7))

- feat: イベント処理の状態遷移を簡素化、整理
	- refactor(src/sn/ReadState.ts): 削除（ReadState に昇華）
	- refactor(src/sn/ScriptIterator.ts): 文字表示町処理を、タグの処理直前に文字出現処理を終わらせる処理、として独立・抽出
	- refactor(src/sn/Reading.ts): 新規追加
		- ReadState.ts の機能を吸収、総ざらえ
	- 結果挙動が微妙に変わるものあるかも
	- ほぼ同じ処理のハズだが内部構造がかなり変わる [l][p][s][wait][waitclick][page]
	- fix: [quake time=1000][wq] で画面真っ暗になる件
	- fix(src/sn/LayerMng.ts): オートリードを文字表示中のクリックで止めづらい・止まってなかった件
	- fix: イベントリスナー元が window / main.cvs / appPixi.stage とバラバラだったのを整理
		- キーボードイベントは document.body
		- マウス（ポインター）は main.cvs
		- 右クリックは main.cvs
		- flame 右クリックなどはその contentDocument.body
		- ダークモード切り替え検知などは globalThis.matchMedia()
- feat: [page] の to 属性に最古（oldest）・最新（newest）のページに移動する値を追加
- feat: [page] の to 属性が oldest、newest、prev のどれかならページ移動状態に移行するように
- feat(src/sn/EventMng.ts): [event key=〜] でシンプルなジェスチャーイベントをサポート。以下が使える。
	longpress
	swiperight
	swipeleft
	swipeup
	swipedown
	- （tinygesture https://github.com/sciactive/tinygesture による）
- fix(src/sn/CmnInterface.ts): HSysBaseArg の定義が重複していたので ConfigBase へ統一
- fix(src/sn/ConfigBase.ts): HSysBaseArg.dip 定義を省略可能に修正
- fix(src/sn/Main.ts): スクリプトロードとその走査の非同期処理のミスを修正
- refactor: 大リファクタリング大会
- doc: [stop_quake] に canskip 属性があるのは無意味なので削除
- doc: [page] 記述更新
	- ページ遷移状態 -> ページ移動状態に表現変更
- test: ギャラリーで一通り動作確認
- test: 既読スキップ (?cur=mul_ev) も全組み合わせ動作確認

| ?cur=*** | 説明 | 確認 |
| ---- | ---- | ---- |
|| (レイヤアニメ) ||
| ext_fg	|			クロスフェードや動き | ✅ |
| tag_quake	|		画面を揺らす | ✅ |
| tag_tsy	|			トゥイーンアニメを行なう | ✅ @tweenjs/tween.js のクセが…… |
| ext_fg2	|			立ち絵を簡単に扱う | ✅ |
| glsl_slide	|		シェーダで画像切り替え | ✅ |
|| (画像・動画) ||
| tag_lay_face	|	画像も動画も重ねて表示 | ✅ |
| anime_png	|		アニメpng | ✅ |
| tag_lay_mov	|		mp4, webp動画再生 | ✅ |
| blendmode	|		ブレンドモード | ？✅ |
| filter	|			フィルター | ✅ |
| 3d_efk	|			Effekseerエフェクト | ✅ |
| 3d_base	|			３Ｄレイヤ（仕様策定中） | ✅ |
| 3d_gltf	|			glTF表示 | ✅ |
| emote_layer	|		えもふりレイヤ | ✅ |
| 3d_theta	|		天球表示 | ✅ |
|| (文字表示) ||
| ruby	|			直感的なルビ記法 | ✅ |
| ch_in_out	|		文字出現演出 | ✅ |
| font	|			フォント利用 | ✅ |
| txt_back	|		メッセージウインドウ | ✅ |
| txt_back2	|		複数メッセージウインドウ | ✅ |
| ch_button	|		文字ボタン・リンク | ✅ |
| kidoku	|			既読スキップ | ✅ |
| log_and_play	|	履歴と機能追加 | ✅ |
| line_breaking_rules	|		禁則処理と文字詰め | ✅ |
|| (スクリプト) ||
| debug	|			デバッグ機能 | ✅ |
| tag_if	|			if文を使える | ✅ |
| multiline	|		複数行タグやマクロ | ✅ |
| ext_for_call	|	for文を使える | ✅ |
| let_zenkaku	|		変数名に全角文字 | ✅ |
| anon_label	|		無名ラベル | ✅ |
| escape	|			エスケープ文字 | ✅ |
|| (サウンド) ||
| sound	|			サウンド再生 | ✅ |
|| (その他) ||
| frame	|			HTMLフレーム | ✅ |
| import	|			プレイデータ | 🔵🔵 |
| tag_page	|		ページ移動 | ✅ |
| mul_ev	|			複数イベント待ち | ✅ |
| 77slide	|			SKYNovel発表スライド | 🔵 |


## [1.61.23](https://github.com/famibee/SKYNovel/compare/v1.61.22...v1.61.23) (2025-07-20)


### Bug Fixes

* **src/sn/TxtLayer.ts:** 文字レイヤ背景の単色塗りに b_alpha が効かなかった件 ([303f74e](https://github.com/famibee/SKYNovel/commit/303f74e378bd2755876089b4e03dedad55c6d2ab))

-fix(src/sn/TxtLayer.ts): 文字レイヤ背景の単色塗りに b_alpha が効かなかった件


## [1.61.22](https://github.com/famibee/SKYNovel/compare/v1.61.21...v1.61.22) (2025-07-14)


### Bug Fixes

* **src/appMain.ts:** win版でウインドウ右部分に空白ができてしまう件 ([27eade8](https://github.com/famibee/SKYNovel/commit/27eade8620f30fa50562632cde904932b75e973b))

-fix(src/appMain.ts): win版でウインドウ右部分に空白ができてしまう件
-fix(src/appMain.ts): 終了→再度アプリ起動でウインドウ位置とサイズが復帰しない件
-fix(src/sn/CmnLib.ts, src/appMain.ts): mainプロセスで platform によるOS=windows判定が失敗するようになっていた件
-fix(src/appMain.ts): ウインドウイベント関係の初期化シーケンス処理を整理・修正
-fix(src/appMain.ts): Electron API 不具合の対処療法（後者はどうしようもない）
	- ウインドウ右辺をクリックするだけで nh が縦に短くなる件
	- ウインドウ下辺を変更しても、ContentSizeやSizeのhが変化しない件


## [1.61.21](https://github.com/famibee/SKYNovel/compare/v1.61.20...v1.61.21) (2025-06-25)


### Bug Fixes

* 画像表示でキャッシュの掛かり方によって表示されなくなる件 ([84dd319](https://github.com/famibee/SKYNovel/commit/84dd319daf5e600ebbecd3cfb87bc29543db3a88))

- fix: 画像表示でキャッシュの掛かり方によって表示されなくなる件
	- 立ち絵の差分が一部表示されない事がある件
	- 1.61.7 (2024-12-15) 付近でデグレード


## [1.61.20](https://github.com/famibee/SKYNovel/compare/v1.61.19...v1.61.20) (2025-06-24)


### Bug Fixes

* 一文中の[l]後〜次の[l]でクリック待ちが表示されず、ワンクリックして表示される場合がある件 ([161c1f4](https://github.com/famibee/SKYNovel/commit/161c1f4478d5191952b68ab3517abbec35988ba4))

- fix: 一文中の[l]後〜次の[l]でクリック待ちが表示されず、ワンクリックして表示される場合がある件
- fix: [ch_in_style][ch_out_style] に name属性に使えない文字を追加
	- 正規表現は /[{\s\.,*\{]/
- perf: 正規表現見直し
- perf: 文字表示時処理の見直し
- fix: ライブラリ更新
	- Electron 37.0.0 (Stable)
	- vite v7.0.0


## [1.61.19](https://github.com/famibee/SKYNovel/compare/v1.61.18...v1.61.19) (2025-05-10)


### Bug Fixes

* [export] 後にジャンプ先が異常になり永久ループになっていた件 ([89cd10c](https://github.com/famibee/SKYNovel/commit/89cd10c85284cd3938d7d85a1178cc297610ed43))
* [export] 後にジャンプ先が異常になり永久ループになっていた件 ([f2fd363](https://github.com/famibee/SKYNovel/commit/f2fd363f22e07e3e64fdf4fc8fa7881aabb7b423))

- fix: [export] 後にジャンプ先が異常になり永久ループになっていた件
- fix: Electron 32.0.0 移行の重大な変更（File.path 削除）に対応
- fix: ライブラリ更新
- test: test/Grammar.test.ts のテスト「test_let_ml_2022/10/15_1」が bun 実行でも通るようになったので対応


## [1.61.18](https://github.com/famibee/SKYNovel/compare/v1.61.17...v1.61.18) (2025-01-03)


### Bug Fixes

* リファクタリング、記述ミス修正 ([c33dfef](https://github.com/famibee/SKYNovel/commit/c33dfefb7771c1a339bf716094fe6f9aaf4a76c7))

- fix: リファクタリング、記述ミス修正
	- 一部文字列リテラルを定数化
	- getExt()、readFileSync() 関数不要に付き削除
	- 記述削除：process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
		- close されていた
			// 2018/05/08
			// disable security-warnings not working · Issue #11970 · electron/electron https://github.com/electron/electron/issues/11970


## [1.61.17](https://github.com/famibee/SKYNovel/compare/v1.61.16...v1.61.17) (2025-01-02)


### Bug Fixes

* **app.ts, web.ts:** HArg 型宣言の export が消えていたので追加 ([5ac3f63](https://github.com/famibee/SKYNovel/commit/5ac3f637c6c61abad4b32bbe68ea3d2c3f84eb77))

- fix(app.ts, web.ts): HArg 型宣言の export が消えていたので追加


## [1.61.16](https://github.com/famibee/SKYNovel/compare/v1.61.15...v1.61.16) (2025-01-01)


### Bug Fixes

* **build.ts, package.json:** アプリ系ファイルをブラウザ系と別フォルダ（dist_app）に ([8994e62](https://github.com/famibee/SKYNovel/commit/8994e62f6ca73eca913bc05cdcb29c0a19a25798))

- fix(build.ts, package.json): アプリ系ファイルをブラウザ系と別フォルダ（dist_app）に
	- package-lock.json・node_modules 削除と npm i が必要と思われる


## [1.61.15](https://github.com/famibee/SKYNovel/compare/v1.61.14...v1.61.15) (2025-01-01)


### Bug Fixes

* **build.ts:** appMain, preload を cjs ビルドに戻す ([2abec82](https://github.com/famibee/SKYNovel/commit/2abec825413f27c8c73f8b53cfbf8f5d53b092fd))

- fix(build.ts): appMain, preload を cjs ビルドに戻す。アプリ起動エラー
- fix(EventMng.ts, EventListenerCtn.ts): 記述ミス、不具合修正
	- load err fn:prj.json e:TypeError: e.addEventListener is not a function
	- ○Container は addListener ゆえ。メソッドを分ける＆onで。


## [1.61.14](https://github.com/famibee/SKYNovel/compare/v1.61.13...v1.61.14) (2024-12-31)


### Bug Fixes

* Github Action の Publish to NPM Registry でのエラー追求4 ([c65de0d](https://github.com/famibee/SKYNovel/commit/c65de0d35a7fef3300a42acaafd8fdd080a3530c))

## [1.61.13](https://github.com/famibee/SKYNovel/compare/v1.61.12...v1.61.13) (2024-12-31)


### Bug Fixes

* Github Action の Publish to NPM Registry でのエラー追求3 ([3470ccc](https://github.com/famibee/SKYNovel/commit/3470ccce16c227504529df54ef517b85145b7a7a))

## [1.61.12](https://github.com/famibee/SKYNovel/compare/v1.61.11...v1.61.12) (2024-12-31)


### Bug Fixes

* Github Action の Publish to NPM Registry でのエラー追求2 ([760307b](https://github.com/famibee/SKYNovel/commit/760307bdff76292f425b56c44c055b8ca490fae2))

## [1.61.11](https://github.com/famibee/SKYNovel/compare/v1.61.10...v1.61.11) (2024-12-31)


### Bug Fixes

* **build.ts:** 前回更新はできたが、気になるエラーにつき開発設定を変えて再度 ([301d097](https://github.com/famibee/SKYNovel/commit/301d0974fa2ada1deab9610f9053fe3631615c46))

## [1.61.10](https://github.com/famibee/SKYNovel/compare/v1.61.9...v1.61.10) (2024-12-31)


### Bug Fixes

* **build.ts:** appMain, preload も ESM ビルドに ([ad6101c](https://github.com/famibee/SKYNovel/commit/ad6101c40fa37c8eb4c8dd0a3b183816aec0516a))

- fix(build.ts): appMain, preload も ESM ビルドに
- style: コンストラクタ引数で private にできるものはするように
- fix: ライブラリ更新（npm リリースに失敗するので vite は 6.0.5 固定）
- docs: コードブロックライセンス年更新


## [1.61.9](https://github.com/famibee/SKYNovel/compare/v1.61.8...v1.61.9) (2024-12-26)


### Bug Fixes

* リファクタリング、記述ミス、不具合修正 ([c311fb1](https://github.com/famibee/SKYNovel/commit/c311fb140d1a782686597f030aeb4367207a9fd8))
* リファクタリング、記述ミス、不具合修正、テスト修正 ([0adbdd3](https://github.com/famibee/SKYNovel/commit/0adbdd3cfb55fa4e4db8316cd84b192d95673e99))

- fix: リファクタリング、記述ミス、不具合修正
- fix(SysWeb.ts, SysApp.ts): new を一旦終わらせ、次の Microtask で続きの処理を行うように
	- DOMContentLoaded は呼び出し側でやる
- fix(Main.ts): 開始時、終了時の処理修正
- fix(SysWeb.ts, SysApp.ts, Main.ts, EventMng.ts): ギャラリーリロード時の不具合対応処理を改良
- fix(ConfigBase.ts): 短絡メソッド（get cur(), get crypto()）削除、argプロパティを使わせるように
- style: 一部の any 型指定を厳密に
	- それで発見したミス修正（?.max_len?.max_len）
- test: テスト修正


## [1.61.8](https://github.com/famibee/SKYNovel/compare/v1.61.7...v1.61.8) (2024-12-15)


### Bug Fixes

* **.github/workflows/release.yml:** semantic-release 失敗していた件 ([a7fd2ea](https://github.com/famibee/SKYNovel/commit/a7fd2eaf01b8d3b1480819e6c697b9176e2480da))

- fix(.github/workflows/release.yml): semantic-release 失敗していた件
	- semantic-release のみ npm 担当、それ以外を bun 担当に


## [1.61.7](https://github.com/famibee/SKYNovel/compare/v1.61.6...v1.61.7) (2024-12-15)


### Bug Fixes

* 動的 import() を積極使用 ([3b375fd](https://github.com/famibee/SKYNovel/commit/3b375fd6d85d233463dc83f9f3a2ab3818bc72b3))

- fix: 動的 import() を積極使用
- fix: （大勢に影響ないが）await 忘れを追加
- fix(FrameMng): 画像ファイル名処理に正規表現ではなく String.split() を使用するように
- refactor: リファクタリング：forEach 削除（for や for of に変更）
- refactor: replaceScript_Wildcard() を Grammar に移動
- refactor: isWin 変数移動（appMain -> CmnLib）
- chore: import ステートメントになるべく type 指定をするように
- chore(.github/workflows/release.yml): コメント追加


## [1.61.6](https://github.com/famibee/SKYNovel/compare/v1.61.5...v1.61.6) (2024-11-16)


### Bug Fixes

* CI(GitHub Actions) に Semantic Release Action を使用 ([20953a4](https://github.com/famibee/SKYNovel/commit/20953a49e4dca3fbffdb5511e6bc3d5193f9db8c))

- fix: CI(GitHub Actions) に Semantic Release Action を使用
	- cycjimmy/semantic-release-action: GitHub Action for Semantic Release https://github.com/cycjimmy/semantic-release-action


## [1.61.5](https://github.com/famibee/SKYNovel/compare/v1.61.4...v1.61.5) (2024-11-16)


### Bug Fixes

* **Grammar.ts:** 正規表現微妙に手直し：修正5 ([c495fee](https://github.com/famibee/SKYNovel/commit/c495fee29d31d801eba07128de73f203959dbf54))

## [1.61.4](https://github.com/famibee/SKYNovel/compare/v1.61.3...v1.61.4) (2024-11-16)


### Bug Fixes

* **Grammar.ts:** 正規表現微妙に手直し ([b00109f](https://github.com/famibee/SKYNovel/commit/b00109ffd70a43d3efe03842113795d21349aee6))

## [1.61.3](https://github.com/famibee/SKYNovel/compare/v1.61.2...v1.61.3) (2024-11-16)


### Bug Fixes

* **Grammar.ts:** 正規表現微妙に手直し、パッケージマネージャー・tsx・jest・CI(GitHub Actions) を bun 担当に ([5afc278](https://github.com/famibee/SKYNovel/commit/5afc2785252829ac88b8548fe5bb324c525cfdc9))

- fix(Grammar.ts): 正規表現微妙に手直し
- chore: パッケージマネージャー・tsx・jest・CI(GitHub Actions) を bun 担当に


## [1.61.2](https://github.com/famibee/SKYNovel/compare/v1.61.1...v1.61.2) (2024-11-02)


### Bug Fixes

* 音声処理手直し、リファクタリング ([3f8f950](https://github.com/famibee/SKYNovel/commit/3f8f9501be40ffc85f79b098f9b671b58439825a))

- fix: 音声処理手直し、リファクタリング


## [1.61.1](https://github.com/famibee/SKYNovel/compare/v1.61.0...v1.61.1) (2024-11-02)


### Bug Fixes

* フレーム画面のスライダーなどでイベントが立て続けに発生した場合、[s]なども跳び越える場合がある件 ([e88d809](https://github.com/famibee/SKYNovel/commit/e88d8098eef125fcd9025b5fd1b16afe96ca3679))

- fix: フレーム画面のスライダーなどでイベントが立て続けに発生した場合、[s]なども跳び越える場合がある件
- fix: リファクタリング


# [1.61.0](https://github.com/famibee/SKYNovel/compare/v1.60.11...v1.61.0) (2024-11-02)


### Features

* 組み込み変数 sys:sn.sound.BGM.vol_mul_during_talking 追加 ([b816bf9](https://github.com/famibee/SKYNovel/commit/b816bf9ebbc55ee566ee17bc1581ec452ab81479))

- feat: 組み込み変数 sys:sn.sound.BGM.vol_mul_during_talking 追加
	- ボイス（VOICEバッファの音声）再生中のBGM音量への乗数。
	- 1.0より小さい数字にすると、ボイス再生中のBGM音量を絞ることができる。ボイス再生終了次第、BGMの音量は元に戻る。
	- 1.0にすると、この機能をOFFにできる。（後方互換）
- fix: キャッシュなし、あるいは即座に画像ロードできた際にエラーになる場合がある件
- fix: リファクタリング


## [1.60.11](https://github.com/famibee/SKYNovel/compare/v1.60.10...v1.60.11) (2024-10-30)


### Bug Fixes

* **tsconfig.json:** 設定再検討、それにともなう記述修正 ([f54f2a9](https://github.com/famibee/SKYNovel/commit/f54f2a97d86e344b54f1d86336283235467b739d))

- fix(tsconfig.json): 設定再検討、それにともなう記述修正
- chore(release.yml): 【node-version: '22'】に更新


## [1.60.10](https://github.com/famibee/SKYNovel/compare/v1.60.9...v1.60.10) (2024-10-24)


### Bug Fixes

* [trans glsl=] で rule 属性を指定しない動作が無効になっていたデグレード修正 ([40c98b8](https://github.com/famibee/SKYNovel/commit/40c98b8444426ebfb39676536b6ba98ac37c5195))

- fix: [trans glsl=] で rule 属性を指定しない動作が無効になっていたデグレード修正


## [1.60.9](https://github.com/famibee/SKYNovel/compare/v1.60.8...v1.60.9) (2024-10-24)


### Bug Fixes

* 直前２更新のデグレード修正 ([0831eee](https://github.com/famibee/SKYNovel/commit/0831eee8cabd9f6463a7d750c699d60a3bdbe0a6))

- fix: 直前２更新のデグレード修正
	- (a)本文中でリロードするとエラー、[load]から次に進んでしまう件
		- 【{E} (fn:_archive line:276) [return] スタックが空です】
	- (b)文字レイヤ背景画像が出ない件
	- (c)本文からタイトルに戻ると暗転で止まる
				- 1.60.8 ... (a)、(b)、(c)
				- 1.60.7 ... (a)
				- 1.60.6 ... ok
				- 1.60.5 ... ok


## [1.60.8](https://github.com/famibee/SKYNovel/compare/v1.60.7...v1.60.8) (2024-10-18)


### Bug Fixes

* [trans rule=] 時の GLSL を最適化 ([2de36ae](https://github.com/famibee/SKYNovel/commit/2de36ae234316fed174341753bcde73a3a495fac))

- fix: [trans rule=] 時の GLSL を最適化
- fix: リファクタリング


## [1.60.7](https://github.com/famibee/SKYNovel/compare/v1.60.6...v1.60.7) (2024-10-17)


### Bug Fixes

* イベント系修正、[s]からクリックや読み飛ばしで次に進んでしまうケースがあった件 ([c9064d4](https://github.com/famibee/SKYNovel/commit/c9064d41c6cd8d46d7e4aac9ab551b5c0d9b1572))

- fix: イベント系修正、[s]からクリックや読み飛ばしで次に進んでしまうケースがあった件
- fix(Main.ts): メインループをリファクタリング
- fix: startsWith、endsWith を積極使用


## [1.60.6](https://github.com/famibee/SKYNovel/compare/v1.60.5...v1.60.6) (2024-10-15)


### Bug Fixes

* esbuild-jest を tsx に切り替え ([82b1eeb](https://github.com/famibee/SKYNovel/commit/82b1eeb4e57124c78642e17a30c89bcfbaa88a96))

- fix: esbuild-jest を tsx に切り替え
- fix(Button.ts): 軽微な修正
- fix: startsWith、endsWith を積極使用
- fix: リファクタリング
- test: esbuild-jest がメンテされてないので ts-jest に切り替え


## [1.60.5](https://github.com/famibee/SKYNovel/compare/v1.60.4...v1.60.5) (2024-09-19)


### Bug Fixes

* **SysApp.ts:** [update_check] でキャッシュが利きすぎる件 ([c61eba8](https://github.com/famibee/SKYNovel/commit/c61eba828064db795965a47bd3cbd0b97d125f7f))

- fix(SysApp.ts): [update_check] でキャッシュが利きすぎる件


## [1.60.4](https://github.com/famibee/SKYNovel/compare/v1.60.3...v1.60.4) (2024-09-17)


### Bug Fixes

* **SoundMng.ts:** [page]移動やロード時にエラーになる場合がある件 ([c88dd59](https://github.com/famibee/SKYNovel/commit/c88dd596ef4e0914b7fc7b494f36c79220609041))

## v1.60.4
- fix(SoundMng.ts): [page]移動やロード時にエラーになる場合がある件


## [1.60.3](https://github.com/famibee/SKYNovel/compare/v1.60.2...v1.60.3) (2024-09-13)


### Bug Fixes

* Electron ウインドウの位置・サイズ指定で小数値を渡すと例外になる？　ぽい件に対応（四捨五入でいく） ([1f422b7](https://github.com/famibee/SKYNovel/commit/1f422b766265946cc857c599661daef0455da0a0))

- fix: Electron ウインドウの位置・サイズ指定で小数値を渡すと例外になる？　ぽい件に対応（四捨五入でいく）


## [1.60.2](https://github.com/famibee/SKYNovel/compare/v1.60.1...v1.60.2) (2024-09-12)


### Bug Fixes

* **ReadState.ts:** ページ遷移を to=next で抜けられない場合がある件 ([ea8e29e](https://github.com/famibee/SKYNovel/commit/ea8e29e822719b0f5fd785585c6e5d7492801a5c))

- fix(ReadState.ts): ページ遷移を to=next で抜けられない場合がある件


## [1.60.1](https://github.com/famibee/SKYNovel/compare/v1.60.0...v1.60.1) (2024-09-12)


### Bug Fixes

* **ScriptIterator.ts:** ページ移動では全画面黒で覆わないように。ちらつくので ([512fc86](https://github.com/famibee/SKYNovel/commit/512fc86331d1a9e02e06279f043366821cd99f95))

- fix(ScriptIterator.ts): ページ移動では全画面黒で覆わないように。ちらつくので


# [1.60.0](https://github.com/famibee/SKYNovel/compare/v1.59.0...v1.60.0) (2024-09-11)


### Features

* **ReadState.ts:** [page] に key 属性追加。ページ遷移状態中に有効にするグローバルイベントを限定できる ([fdb37be](https://github.com/famibee/SKYNovel/commit/fdb37be788759208c6d6292294d5ba42439117de))

- feat(ReadState.ts): [page] に key 属性追加。ページ遷移状態中に有効にするグローバルイベントを限定できる


# [1.59.0](https://github.com/famibee/SKYNovel/compare/v1.58.0...v1.59.0) (2024-09-11)


### Features

* **ReadState.ts:** [page to=load] でページ遷移状態で表示中ページからロードするように ([fbb49cc](https://github.com/famibee/SKYNovel/commit/fbb49cc155a4f0b773c5abf47c95a32409140892))

- feat(ReadState.ts): [page to=load] でページ遷移状態で表示中ページからロードするように
- fix(ReadState.ts): ページ遷移でのＢＧＭ再生も正しく復元し、不要な中断と再生をしないように
- fix(ScriptIterator.ts): 非同期処理修正
	- ページ遷移状態のprevで、BGM切り替えページで両方のBGMが同時に鳴る件
- refactor(LayerMng.ts, SoundMng.ts): リソース読み込み非同期処理を親に委譲するように
- refactor(Button.ts): デザインモード関係の不要な処理を削除
- style: アングルブラケット構文を as を使った型アサーションに統一


# [1.58.0](https://github.com/famibee/SKYNovel/compare/v1.57.0...v1.58.0) (2024-09-07)


### Features

* **ReadState.ts:** [page to=exit] でページ遷移状態を抜けるように ([56daeba](https://github.com/famibee/SKYNovel/commit/56daeba36ef42b399e721da7e43d7b95e856833a))

- feat(ReadState.ts): [page to=exit] でページ遷移状態を抜けるように
- feat(ReadState.ts): tmp:const.sn.isPaging 追加、ページ遷移状態か
- doc(開発者情報): 組み込み変数 tmp:const.sn.isPaging の説明を追加
- feat(ReadState.ts): ページ遷移状態出入り時の style 保存・復帰を厳密に
- feat(ReadState.ts): ページ遷移中 CSS スタイルを保存するように
- feat(ReadState.ts): save:const.sn.styPaging 追加、ページ遷移中 CSS スタイル
- doc(開発者情報): 組み込み変数 save:const.sn.styPaging の説明を追加
- fix(ReadState.ts): ページ遷移中は [page] の style 属性設定を無視するように
- fix(ReadState.ts): ページ遷移中は [page] の style・clear 属性設定でエラーになっていた件
- fix(SndBuf.ts): save:const.sn.loopPlaying に buf ごとの 音声ファイル名を保存するように
- ページ遷移状態でリロードすると？
	- ページ遷移状態を抜けて next 末尾の本文に戻る


# [1.57.0](https://github.com/famibee/SKYNovel/compare/v1.56.1...v1.57.0) (2024-09-06)


### Features

* **ページ遷移:** sys:const.sn.aPageLog 追加、ページ遷移用情報を保存するように ([e284276](https://github.com/famibee/SKYNovel/commit/e28427669d26519f569af577383ab39aec7b1329))

- feat(ページ遷移): sys:const.sn.aPageLog 追加、ページ遷移用情報を保存するように
	- ただし save:const.sn.sLog 同様、save:sn.doRecLog の影響を受ける
- fix(ReadState.ts): [page]の to 属性のページ遷移が上手く動作してなかった件
	- v1.53.8（イベント禁止状態 Rs_BanEvent 追加）でのデグレード
- fix(ReadState.ts): ページ遷移などで[p visible=false][l ...]で文字表示処理が開始されない件
- fix(ReadState.ts): ページ遷移で文字レイヤレベルのstyleを[p][l][s]段階で設定するように
- fix(ReadState.ts): [page] の style 属性初期値を 'color: yellow; text-shadow: 1px 1px 0 #000, -1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000;' に
- fix(ReadState.ts): [page] 移動中に [playbgm] が発生した場合に右クリックなどしないと次へ進まない件
- fix(appMain.ts): Windowsでウインドウサイズ変更の挙動修正
- fix(debug.token): 空白文字は表示しないように
- perf(Hyphenation.ts): 禁則設定がデフォルト値と同じ場合にセーブデータを省略するように
- perf(TxtStage.ts, GrpLayer.ts): デザインモード関係の不要なセーブデータを削除
- doc（開発者情報）: 組み込み変数 sys:const.sn.aPageLog の説明を追加


## [1.56.1](https://github.com/famibee/SKYNovel/compare/v1.56.0...v1.56.1) (2024-08-28)


### Bug Fixes

* **SysApp.ts:** 組み込み変数　画面の最大水平・垂直解像度をマルチウインドウ対応 ([3e414c1](https://github.com/famibee/SKYNovel/commit/3e414c1e5f770d7bc9438c58ff809d4b37cd2729))

- fix(SysApp.ts): 組み込み変数 const.sn.screenResolutionX, Y（画面の最大水平・垂直解像度）をマルチウインドウ対応
	- アプリウインドウ移動で表示されるディスプレイが変わった際にも、そのディスプレイの解像度が反映されるように
- fix(SysApp.ts): [window]によるサイズ変更が出来ない・保存していなかった件
- doc（開発者情報）: 組み込み変数 const.sn.screenResolutionX, Y（画面の最大水平・垂直解像度）の説明を追加


# [1.56.0](https://github.com/famibee/SKYNovel/compare/v1.55.2...v1.56.0) (2024-08-28)


### Features

* **アプリ版ウインドウ:** ウインドウサイズを変更できるように ([89ca00c](https://github.com/famibee/SKYNovel/commit/89ca00cbda23d42383a866bbefe51eaba043e511))

- feat(アプリ版ウインドウ): ウインドウサイズを変更できるように
	- リサイズ時はアスペクト比を固定し余白を作らない
- feat(アプリ版ウインドウ): ウインドウサイズを保存・復元するように
- feat(SysApp.ts): 組み込み変数 sys:const.sn.nativeWindow.w、〜.h を追加
- feat(SysBase.ts, EventMng.ts): [event] key属性での修飾子キー（AltやShift）でMetaも指定できるように
	- Macは ⌘ Command キー、 Windowsは Windows キー ⊞。
- fix(appMain.ts): devtool=false 設定でもアプリ版で表示できていた件
- fix(SysApp.ts): アプリ版ウインドウ移動で左にサブモニターがある際に移動できない件
	- メインモニター内（x>0）に戻す処理を入れていた。お節介かな
- fix(appMain.ts): 起動時にウインドウ位置（とサイズ）が確定してからウインドウ表示するように
- fix(appMain.ts): initRenderer()引数三つめを内部に取り込み（廃止予定）
- fix(appMain.ts): DevTools は 別ウィンドウに切り離すが画面内に戻せない形式に
- fix(SysApp.ts): アプリ版セーブ処理で関数ディープコピーしようとしエラーになっていた件
- fix(TxtStage.ts): dumpHtm 出力で CSS animation-delay を削除しきれないケースがあった件
- fix: ライブラリ更新
	- @tweenjs/tween.js 23.1.3 固定
	- Tween.autoStartOnUpdate=true、では対処できない
	- 現状、更新せず固定は以下の4つ
		- @pixi/sound          4.4.1   4.4.1   6.0.1
		- @tweenjs/tween.js   23.1.3  23.1.3  25.0.0
		- electron-store       8.2.0   8.2.0  10.0.0
		- pixi.js             6.5.10  6.5.10   8.3.3
- doc（タグリファレンス）: [snapshot]スナップショットは、ブラウザ版では限定的なサポートで、文字表示が正確ではないと明記


## [1.55.2](https://github.com/famibee/SKYNovel/compare/v1.55.1...v1.55.2) (2024-07-03)


### Bug Fixes

* **禁則処理:** ルビ・縦中横・傍点関連への禁則処理を修正 ([d7e434f](https://github.com/famibee/SKYNovel/commit/d7e434f75735560be604a9c67a0f6b14f44f9136))

- fix(禁則処理): ルビ・縦中横・傍点関連への禁則処理を修正
- fix(禁則処理): 複数文字ルビで改行位置がずれる場合がある件（前回の既知の問題１）
- fix: 文字レイアウト出力で不要な情報を削除するように（サイズ削減・余計な差異になるので）
- fix: 文字レイアウト出力で ' style=""' を削除するように（chromeで警告が出る）
- fix: リファクタリング


## [1.55.1](https://github.com/famibee/SKYNovel/compare/v1.55.0...v1.55.1) (2024-06-30)


### Bug Fixes

* **禁則処理:** ルビ・縦中横・傍点関連への禁則処理を修正 ([5727009](https://github.com/famibee/SKYNovel/commit/5727009d7b7e179912d659d96a427acf6eb1047a))

- fix(禁則処理): ルビ・縦中横・傍点関連への禁則処理を修正
	- ぶら下げ領域にはみ出す場合
	- 追い出しになる場合
- fix(文字レイヤ): クリック待ちが[tcy]の二文字目直下に行ってしまう件（safari以外）
- fix(CSS): いつの間にか Safari も縦中横（text-combine-upright）対応していたので、-webkit-text-combine(Firefox以外) の設定を削除
	- "text-combine" | Can I use... Support tables for HTML5, CSS3, etc https://caniuse.com/?search=text-combine
- test(禁則処理): ルビのテストデータ修正
	- ルビと改行状態のさまざまなケースでのテスト導入
- test(禁則処理): 「犬神使いと少年」スクリプト＋ debugHtm スイッチによりテスト
	- ~~既知の問題１~~：fn=ss_050 line=739 において一文字（広いルビ）がぶら下げ領域にはみ出す
		```scheme
		の明治二
		・井上圓《えん》了《りょう》
		の
		```
	- 既知の問題２：以下のような「。で終わらない非ぶら下げ文字」で、ぶら下げ領域にはみ出す不具合あり。ただ通常の使用ではまずない＆見た目的にそんな気にならないので保留。
		```scheme
		　こいつが無邪気なのか、強いのかは俺には分から口《☀》ビ《☂》末《⛈》[r]	;ok
		　こいつが無邪気なのか、強いのかは俺には分からな口末頭。[r]	;ok
		　こいつが無邪気なのか、強いのかは俺には分からな口《☀》末頭[r]	;ng
		　こいつが無邪気なのか、強いのかは俺には分からな口《☀》末《☂》頭[r]	;ng
		　こいつが無邪気なのか、強いのかは俺には分からな口末頭\	;ng
		```
- fix: リファクタリングなど


# [1.55.0](https://github.com/famibee/SKYNovel/compare/v1.54.1...v1.55.0) (2024-06-27)


### Features

* **文字レイヤ:** prj.json に debug.debugHtm スイッチ追加。文字レイヤの改行などの様子が分かるHTMLファイルを出力する ([7d06a9e](https://github.com/famibee/SKYNovel/commit/7d06a9e0e2775033173d91d26f0cb83deea7f1f9))

- feat(文字レイヤ): prj.json に debug.debugHtm スイッチ追加。文字レイヤの改行などの様子が分かるHTMLファイルを出力する
	- ブラウザ版では保存ダイアログが出てウザイので、アプリ版でのみ有効とする
	- [l][p]などで停止するたび、ダウンロードフォルダに上書き出力する
	- ファイル名は【dumpHtm layer=（レイヤ名） cls=txt(fn=（スクリプト名） line=（行番号）)】
- fix(アプリ版[log]): ipcRenderer.invoke() でエラーになっていたのを修正
	- 構造化複製アルゴリズムを使って引数をコピーできずエラー
	- Error: An object could not be cloned.
- fix(TxtStage.ts): animationend 時イベントで差し替え前提の #fncEndChIn を差し替えられない記述をしていた件
- fix(Pages.ts): 内部 nameプロパティ設定でのミス修正
- fix(TxtLayer.ts): destroy()時に無駄な new が発生していた件
- fix: リファクタリングなど


## [1.54.1](https://github.com/famibee/SKYNovel/compare/v1.54.0...v1.54.1) (2024-06-25)


### Bug Fixes

* **禁則処理:** ぶら下げ修正、テスト修正 ([7c1d73f](https://github.com/famibee/SKYNovel/commit/7c1d73fa18f600fdca02305e6c1300dd22d79c1b))

- fix(禁則処理): ぶら下げ修正、テスト修正
- fix(禁則処理): [r]などの改行判定ミス修正
	- [r]などの改行は、禁則処理を無効にしてスクリプターの意図に従う
- fix(禁則処理): 【[r]による改行後は追い出し処理をしない】判定で、取りこぼすケースがあった件
	- 不具合1
		```scheme
		[r]いう[r]		; 「い」の前に改行x2してしまう（一つは[r]）
		[p]
		```

	- 不具合2
		```scheme
			禁則[r]
			あ→改行[r]	; 「→」後に改行してしまう
			お
		[p]

			禁則[r]
			あ→改行;[r]	; →正常
			お
		[p]
		```
- fix: 残っていた内部的な全角空白を \&emsp; に置換


# [1.54.0](https://github.com/famibee/SKYNovel/compare/v1.53.13...v1.54.0) (2024-06-23)


### Features

* **文字レイヤ:** [lay]に bura・kinsoku_bura 属性追加。ぶら下げをサポート ([81f9472](https://github.com/famibee/SKYNovel/commit/81f94723c546a8cafe944b45e34e66686ba2b9dd))

- feat(文字レイヤ): [lay]に bura・kinsoku_bura 属性追加。ぶら下げをサポート
	- trueでぶら下げ有効。行末尾に二文字分のぶら下げ専用領域を確保する
	- 後方互換性のため、デフォルトは false、ぶら下げ無効（既存の動作）
	- 追い出しよりぶら下げを優先
	- 行頭禁則もぶら下げる
	- 二文字以上のぶら下げ・行頭禁則はあきらめて行頭に文字を続けていく
- feat(文字レイヤ): kinsoku_eol・kinsoku_bura 属性設定時に【行末禁則文字 != ぶら下げ文字】チェックするように
- feat(文字レイヤ): kinsoku_dns・kinsoku_bura 属性設定時に【分割禁止文字 != ぶら下げ文字】チェックするように
- feat(文字レイヤ): kinsoku_sol・kinsoku_eol・kinsoku_dns・kinsoku_bura・bura 属性の設定はレイヤクリアしても変更しないように
- fix(禁則処理): 追い出し（行末禁則）が追い出しが一文字多かった件
- fix(禁則処理): 追い出し（分割禁止）＋末尾行末禁則（例：〈……）で末尾行末禁則違反だった件
- fix(禁則処理): リファクタリング
- test(禁則処理): 自動テスト導入


## [1.53.13](https://github.com/famibee/SKYNovel/compare/v1.53.12...v1.53.13) (2024-06-17)


### Bug Fixes

* アプリ版がエラーで起動できないので非ESMライブラリに戻す ([5a225a9](https://github.com/famibee/SKYNovel/commit/5a225a980eee403a6c68d5993b6133131679b67a))

- fix: アプリ版がエラーで起動できないので非ESMライブラリに戻す
	- electron-store 10.0.0 → 8.2.0
	- ReferenceError: window is not defined
	- SKYNovel 1.53.7 (2024-05-30) から発生


## [1.53.12](https://github.com/famibee/SKYNovel/compare/v1.53.11...v1.53.12) (2024-06-17)


### Bug Fixes

* ライブラリ更新 ([db25c65](https://github.com/famibee/SKYNovel/commit/db25c65f0f12e7395878909da78a5f1bb38a3f13))

- fix: ライブラリ更新


## [1.53.11](https://github.com/famibee/SKYNovel/compare/v1.53.10...v1.53.11) (2024-06-09)


### Bug Fixes

* **イベント待ち処理:** 異なるイベント待ち同士が影響する件 ([9218ff8](https://github.com/famibee/SKYNovel/commit/9218ff8048f2da6bb04c14cf86d44d5b8446f148))

- fix(イベント待ち処理): 異なるイベント待ち同士が影響する件
	- このように[p]待ち中に[quake]終了で[p]待ちが解除されるなどの不具合
		```scheme
		*A01	[ch text='A01=' wait=0]	; quake / p
		[quake time=1000 hmax=8 vmax=8]
			[ch text='p.' wait=0]
			[p]勝手に進んだ？[r]	; 勝手に進んでしまう
		wq[wq]
		[r]END.[s]
		```

	- 以下のようなマトリックステストで動作確認
		- https://famibee.github.io/SKYNovel_gallery/index.html?cur=mul_ev

		| 発生＼待ち	| p | s | ws | wf | wq | wait_tsy | wt | wv | wait |
		| --			| -- | -- | -- | -- | -- | -- | -- | -- | -- |
		| A quake		| ❌️ | ok | ❌️ | ❌️ | ok | ❌️ | ok | ❌️ | ❌️ |
		| B fadese		| ok | ok | ok | ok | ok | ok | ok | ok | ok |
		| C playse		| ok | ok | ok | ok | ok | ok | ok | ok | ok |
		| D tsy			| ❌️ | ok | ❌️ | ❌️ | ❌️ | ❌️ | ❌️ | ❌️ | ❌️ |
		| E tsy_frame	| ❌️ | ok | ❌️ | ❌️ | ❌️ | ❌️ | ❌️ | ❌️ | ❌️ |
		| F trans		| ❌️ | ok | ❌️ | ❌️ | ok | ❌️ | ok | ❌️ | ❌️ |
		| G lay mov		| ok | ok | ok | ok | ok | ok | ok | ok | ok |

- fix(文法解析・&代入): &st_hv = 'back;' がエラーになっていた件
- fix(文法解析・&代入): タブ文字を&代入の末尾区切りとする仕様を変更
	- タブ文字に文法的な意味が生まれているのでよろしくない
	- = 以降をタブ文字で揃えたいときなどに妙な挙動になるので
- fix(文字レイヤ): 先頭の空白文字に内部的に付けるルビも【\&emsp;文字に\&emsp;ルビ】とするように
- fix(文字レイヤ): 組み込み変数 sys:sn.tagCh.doWait、sys:sn.tagCh.doWait_Kidoku を一時的に変更しても、直後の文字表示や[ch]に影響を与えなかった件
- fix(文字レイヤ): 表示文字の末尾が [ch wait=0] だと、ボタンやリンククリックを一度目受け付けない件
- fix(ムービーリソース破棄): stopVideo を SpritesMng で行うように
- perf(文法解析): 正規表現のタグ解析部で無駄な処理があったのを修正
- perf(文字表示関連、Variable): リファクタリング


## [1.53.10](https://github.com/famibee/SKYNovel/compare/v1.53.9...v1.53.10) (2024-06-05)


### Bug Fixes

* **文字レイヤ:** ルビ付き文字に背景指定（style='background:'）がある場合、「文字」と「ルビ」と「その二つを含んだ領域」の三つが個別に塗られるが、三つめは背景指定を削除するように ([3f7f200](https://github.com/famibee/SKYNovel/commit/3f7f2001f735b9842bf1768c4fdc841b329290f8))

- fix(文字レイヤ): ルビ付き文字に背景指定（style='background:'）がある場合、「文字」と「ルビ」と「その二つを含んだ領域」の三つが個別に塗られるが、三つめは背景指定を削除するように
- fix(文字レイヤ): [graph r=ルビ]指定時、ChromeとEdgeでルビが文字から少し離れる件
	- Safari や Firefox では問題ない
	- 内部的に【全角空白にルビ】としていたが、【\&emsp;にルビ】とするように
- perf（パフォーマンス）: querySelectorAll をなるべく使わないように


## [1.53.9](https://github.com/famibee/SKYNovel/compare/v1.53.8...v1.53.9) (2024-06-04)


### Bug Fixes

* **文字レイヤ:** ギャラリー用の試作機能として、CSS の text-shadow 設定するためだけの filter 属性があったので削除（v1.50.1 までの仕様） ([0e3d843](https://github.com/famibee/SKYNovel/commit/0e3d843faf63bfb58338033e61ba61f4b52287f0))

- fix(文字レイヤ): ギャラリー用の試作機能として、CSS の text-shadow 設定するためだけの filter 属性があったので削除（v1.50.1 までの仕様）
	- 指定したい場合は記述を style='text-shadow: 〜'に


## [1.53.8](https://github.com/famibee/SKYNovel/compare/v1.53.7...v1.53.8) (2024-06-04)


### Bug Fixes

* 本文開始時にクリック連打すると [call fn=_*] でいくつか飛ばされるなどの現象 ([8bd384e](https://github.com/famibee/SKYNovel/commit/8bd384e3d88a34097c5f93766cffc65d994663db))

- fix: 本文開始時にクリック連打すると [call fn=_*] でいくつか飛ばされるなどの現象
	- イベント禁止状態 Rs_BanEvent 追加
	- 同様のイベント一時無効化を以下にも適用
		- [add_frame][snapshot][playse join=true]
		- スクリプトロード
		- 画像ロード（画像レイヤ・文字レイヤ背景）
- fix: ギャラリーでクリックして進まなくなっている物があった件
	- 一個前 ver 1.53.7 でデグレード
- fix: [stop_tsy][finish_trans]でトゥイーンをstopしていなかった件
- fix(文字レイヤ): レイヤダンプ表示で undefined 値対応


## [1.53.7](https://github.com/famibee/SKYNovel/compare/v1.53.6...v1.53.7) (2024-05-30)


### Bug Fixes

* イベント関係不具合修正 ([53778f0](https://github.com/famibee/SKYNovel/commit/53778f0fbc5f6b50ae89e86546692aa5378e8fd2))

- fix([playse]系): join=true 時に押しっぱなしスキップなどの高速スキップ表示にイベント待ち停止が動いてしまう場合がある件（非同期処理修正）
- fix([playse]系): ロード完了時に内部状態が SsStop だった場合、リソースごと破棄されるとして再生しないように
- fix([ws][fade系][wv]): 予約イベントの発生待ちしないタイプのイベント待ち終了時、内部状態をイベント予約受付中に戻していなかった件
- fix(ReadState): イベント予約受付中状態から同状態に遷移しても resume が発生しないように
- fix(ReadState): [s]状態から内部状態遷移のみでイベント予約受付中状態へ移行しないように
- fix(ReadState): リファクタリング、コメント追加
	- メソッド変名 interface IEvtMng.breakLimitedEvent() -> breakEvent()
- fix: 画像/動画ロード失敗はスキップ時などであり得るので、trace表示のみに
- docs(タグリファレンス・開発者情報): リンクミス修正


## [1.53.6](https://github.com/famibee/SKYNovel/compare/v1.53.5...v1.53.6) (2024-05-09)


### Bug Fixes

* **GrpLayer.ts:** blendmode が効いてなかった件 ([78327af](https://github.com/famibee/SKYNovel/commit/78327af6c05f424fe9ab0b0fe38174be506d158c))

- fix(GrpLayer.ts): blendmode が効いてなかった件


## [1.53.5](https://github.com/famibee/SKYNovel/compare/v1.53.4...v1.53.5) (2024-05-09)


### Bug Fixes

* **マクロ:** マクロ内でタグやマクロを * なしで記述した場合、* ありのように値が渡される不具合 ([987b196](https://github.com/famibee/SKYNovel/commit/987b196da9976f34f8566701abcfc35d4a7d9e49))

- fix(マクロ): マクロ内でタグやマクロを * なしで記述した場合、* ありのように値が渡される不具合
	- 以下の例では [tst2] に * を渡したり渡さなかったりした場合の現象（n:tst2 の行）
	- 「*」を書けば mp: 変数がバケツリレーされ、 * を書かないと渡されない・クリアされる感じ
- fix([call]): [call] の引数渡し処理を [macro] で定義したマクロに動作を合わせるように
	- 以下の例では [call] に * を渡したり渡さなかったりした場合の現象
	- v1.51.0（タグ解析()内修正）のデグレード、そちらの修正はとりやめ
		- 【（v1.51.0）マクロ内で[call]した場合、中のタグやマクロで * を使用しても、最初のマクロに渡された引数を反映してなかった件】
	- 定義したマクロと [call] の引数渡し処理を合わせたが、引き続き定義したマクロに入った際にもローカルイベントをスタックしない。（マクロ脱出時にマクロ内で追加したローカルイベントが消えない）


　具体的には、（なにかの拡張機能末尾に）以下のような定義をした場合に、
```scheme
[macro name=tst]
	[trace text="&'n:'+ mp:n +' '+ (mp:a == mp:f ?'⭕️' :'❌️') +' f:'+ mp:f"]
[endmacro]

[macro name=tst2]
	[tst * n='tst2']
[endmacro]

[macro name=target]
	[tst n='A' a='undefined']
	[tst n='B*' * a='鑑定官_眼鏡']
	[tst n='C*' f='UPD c' a='UPD c']
	[tst n='D*' * f='UPD d' a='UPD d']
	[jump label=*jjj]

*jjj
	[tst n='G' a='undefined']
	[tst n='H*' * a='鑑定官_眼鏡']
	[tst n='I*' f='UPD i' a='UPD i']
	[tst n='J*' * f='UPD j' a='UPD j']

	[call label=*ccc]
	[call label=*ddd *]

	[tst2 a='undefined']
	[tst2 * a='鑑定官_眼鏡']
[endmacro]

	[target f=鑑定官_眼鏡]
[return]


*ccc
	[tst n='o' a='undefined']
	[tst n='p*' * a='undefined']
	[tst n='q*' f='UPD q' a='UPD q']
	[tst n='r*' * f='UPD r' a='UPD r']
[return]

*ddd
	[tst n='O' a='undefined']
	[tst n='P*' * a='鑑定官_眼鏡']
	[tst n='Q*' f='UPD Q' a='UPD Q']
	[tst n='R*' * f='UPD R' a='UPD R']
[return]
```


　v1.51.0 修正前は以下の動作だった。
```
n:A ⭕️ f:undefined
n:B* ⭕️ f:鑑定官_眼鏡
n:C* ⭕️ f:UPD c
n:D* ⭕️ f:UPD d
n:G ⭕️ f:undefined
n:H* ⭕️ f:鑑定官_眼鏡
n:I* ⭕️ f:UPD i
n:J* ⭕️ f:UPD j
n:o ⭕️ f:undefined
n:p* ⭕️ f:undefined -- ここも問題なかった
n:q* ⭕️ f:UPD q
n:r* ⭕️ f:UPD r
n:O ⭕️ f:undefined
n:P* ❌️ f:undefined	-- マクロ内で[call *]->[tst n='P*' *]-> f が渡されてない
n:Q* ⭕️ f:UPD Q
n:R* ⭕️ f:UPD R
n:tst2 ⭕️ f:undefined -- ここも問題なかった
n:tst2 ⭕️ f:鑑定官_眼鏡
```

　今回 v1.53.5 修正前は以下の動作だった。「P*」が直ったが「tst2 一つめ」に不具合。
```
n:A ⭕️ f:undefined
n:B* ⭕️ f:鑑定官_眼鏡
n:C* ⭕️ f:UPD c
n:D* ⭕️ f:UPD d
n:G ⭕️ f:undefined
n:H* ⭕️ f:鑑定官_眼鏡
n:I* ⭕️ f:UPD i
n:J* ⭕️ f:UPD j
n:o ⭕️ f:undefined
n:p* ❌️ f:鑑定官_眼鏡 -- デグレード
n:q* ⭕️ f:UPD q
n:r* ⭕️ f:UPD r
n:O ⭕️ f:undefined
n:P* ⭕️ f:鑑定官_眼鏡 -- ここは修正された
n:Q* ⭕️ f:UPD Q
n:R* ⭕️ f:UPD R
n:tst2 ❌️ f:鑑定官_眼鏡 -- デグレード
n:tst2 ⭕️ f:鑑定官_眼鏡
```

　今回 v1.53.5 修正後は次のような結果になる。
```
n:A ⭕️ f:undefined
n:B* ⭕️ f:鑑定官_眼鏡
n:C* ⭕️ f:UPD c
n:D* ⭕️ f:UPD d
n:G ⭕️ f:undefined
n:H* ⭕️ f:鑑定官_眼鏡
n:I* ⭕️ f:UPD i
n:J* ⭕️ f:UPD j
n:o ⭕️ f:undefined
n:p* ⭕️ f:undefined -- 今回修正された
n:q* ⭕️ f:UPD q
n:r* ⭕️ f:UPD r
n:O ⭕️ f:undefined
n:P* ⭕️ f:鑑定官_眼鏡
n:Q* ⭕️ f:UPD Q
n:R* ⭕️ f:UPD R
n:tst2 ⭕️ f:undefined -- 今回修正された
n:tst2 ⭕️ f:鑑定官_眼鏡
```


## [1.53.4](https://github.com/famibee/SKYNovel/compare/v1.53.3...v1.53.4) (2024-05-06)


### Bug Fixes

* グレースケールの綴りミス修正（greyscale -> grayscale） ([f68e0cf](https://github.com/famibee/SKYNovel/commit/f68e0cf6ef6cbd9d9ca59b4e8a503fec6a8e4d6f))

- fix: グレースケールの綴りミス修正（greyscale -> grayscale）


## [1.53.3](https://github.com/famibee/SKYNovel/compare/v1.53.2...v1.53.3) (2024-05-04)


### Bug Fixes

* **サウンド関係:** リソースを破棄したあと再度リソースを破棄する場合にエラーになっていた件 ([743d13c](https://github.com/famibee/SKYNovel/commit/743d13c636ac1ccbff4da9eb4379758851dc7d7f))

- fix(サウンド関係): リソースを破棄したあと再度リソースを破棄する場合にエラーになっていた件


## [1.53.2](https://github.com/famibee/SKYNovel/compare/v1.53.1...v1.53.2) (2024-05-04)


### Bug Fixes

* **フレーム画面:** v1.53.0 のデグレード修正 ([32171ad](https://github.com/famibee/SKYNovel/commit/32171ad33993e086e8640a586ab4dfe214741253))

- fix(フレーム画面): v1.53.0 のデグレード修正


## [1.53.1](https://github.com/famibee/SKYNovel/compare/v1.53.0...v1.53.1) (2024-05-03)


### Bug Fixes

* **フレーム画面:** 画像最適化（WebP化）対応 ([3e630f9](https://github.com/famibee/SKYNovel/commit/3e630f9ce62ed467937272abe0cbbaf03a01fff5))

- fix(フレーム画面): 画像最適化（WebP化）対応


# [1.53.0](https://github.com/famibee/SKYNovel/compare/v1.52.0...v1.53.0) (2024-05-02)


### Features

* **[add_frame]:** htmファイルに含まれる 'data-src="./' をhtmファイルがあるディレクトリを示すパス表記に置き換えるように ([5345d1d](https://github.com/famibee/SKYNovel/commit/5345d1de33c005c3eeb2d3361cc1d02bfd2cb83c))

- feat([add_frame]): htmファイルに含まれる 'data-src="./' をhtmファイルがあるディレクトリを示すパス表記に置き換えるように
	- (ex) 'data-src="prj/frames/'
	- Web版でパスエラーになるため
- fix: 1.50.0 で追加した const.sn.fn2ext.json 削除、改修がややこしいため
- fix(アプリ版 [snapshot]): で layer 属性に対応してなかった件


# [1.52.0](https://github.com/famibee/SKYNovel/compare/v1.51.0...v1.52.0) (2024-04-30)


### Features

* [tsy]にも filter などフィルター関連属性追加 ([a7aa58f](https://github.com/famibee/SKYNovel/commit/a7aa58f2ffe682182cb8176bb52b7df76d0320ad))

- feat: [tsy]にも filter などフィルター関連属性追加
	- [fg2]ではまだ上手く使えない
- feat: [wait_tsy]に true でトゥイーン存在チェックする chk_exist_tw 属性追加
	- name 属性のミスなどで [tsy]の終了を待ってない場合に気づきやすい
- fix: フィルター「blur」に指定できる属性 quality が重複しているのを削除
- fix: フィルター「tint」に指定できる属性 color を f_color に変名
- docs(タグリファレンス): [tsy] に name 属性説明抜けにつき追加


# [1.51.0](https://github.com/famibee/SKYNovel/compare/v1.50.1...v1.51.0) (2024-04-28)


### Features

* [add_filter][clear_filter][enable_filter]追加など ([c243842](https://github.com/famibee/SKYNovel/commit/c24384240b91e8fdeafe3ff4487f5d165119c181))

- feat: [add_filter]追加、レイヤにフィルターを追加する。
	- layer 属性は省略時全てのレイヤが対称、レイヤ名はカンマ区切りで複数可。
	- page=both でページ裏表両面に
	- 複数追加でき、フィルター処理は追加した順に適用される。
	- 次の組み込み済みフィルタを利用できる。
		- blur		…… ガウスぼかし
		- noise		…… ノイズエフェクト
		- color_matrix	…… カラーマトリックス
		- black_and_white	…… 白黒
		- brightness	…… 明るさを調整
		- browni	…… おいしいブラウニー
		- color_tone	…… カラートーン
		- contrast	…… コントラスト
		- greyscale	…… グレースケール
		- hue	…… 色相
		- kodachrome	…… コダクローム
		- lsd	…… LSD効果
		- negative	…… ネガティブ画像 (古典的なRGBマトリックスの逆)
		- night	…… ナイトエフェクト
		- polaroid	…… ポラロイド
		- predator	…… 捕食者効果、新しい独立したマトリックスを設定
		- saturate	…… 彩度。色の間の分離を増やします。
		- sepia		…… セピア
		- technicolor	…… テクニカラー
		- tint	…… 色合い。カラーマトリクスの対角線上に各チャネルを
		- to_bgr	…… 赤→青、青→赤
		- vintage	…… ビンテージ
- feat: [clear_filter]追加、レイヤのフィルターを全削除する。
	- layer 属性は省略時全てのレイヤが対称、レイヤ名はカンマ区切りで複数可。
	- page=both でページ裏表両面に
- feat: [enable_filter]追加、フィルター個別切替。個別にフィルター有効・無効を変更する。
	- layer 属性は省略時全てのレイヤが対称、レイヤ名はカンマ区切りで複数可。
	- page=both でページ裏表両面に
- feat: [lay] に filter・enable_filter 属性追加、レイヤ指定しつつフィルタも指定できるように
	- [add_filter]のような追加ではなく上書き
	- [fg]でも有効
- feat: [clear_lay] の filter 属性を clear_filter に変名
	- feat: [lay] に clear_filter 属性追加
	- feat: [er] に clear_filter 属性追加
- fix: マクロ内で[jump][call]した場合、中のタグやマクロで * を使用しても、最初のマクロに渡された引数を反映してなかった件

　具体的には、以下のような定義をした場合に、
```scheme
[macro name=tst]
	[trace text="&'yyy:'+ mp:yyy +' fn:'+ mp:fn"]
;	[trace text=%yyy]
;	[trace text=%fn]
[endmacro]

[macro name=target]
	[tst yyy='A']
	[tst yyy='B*' *]
	[tst yyy='C*' fn='UPD c']
	[tst yyy='D*' * fn='UPD d']
	[jump label=*jjj]

*jjj
	[tst yyy='G']
	[tst yyy='H*' *]
	[tst yyy='I*' fn='UPD i']
	[tst yyy='J*' * fn='UPD j']

	[call label=*ccc]
[endmacro]
```

```scheme
*ccc
	[tst yyy='O']
	[tst yyy='P*' *]
	[tst yyy='Q*' fn='UPD q']
	[tst yyy='R*' * fn='UPD r']
[return]
```

　以下を実行した場合、
```scheme
[target fn=鑑定官_眼鏡]
```

　修正前は以下の動作だった。
```
yyy:A fn:undefined
yyy:B* fn:鑑定官_眼鏡
yyy:C* fn:UPD c
yyy:D* fn:UPD d

yyy:G fn:undefined
yyy:H* fn:鑑定官_眼鏡
yyy:I* fn:UPD i
yyy:J* fn:UPD j

yyy:O fn:undefined
yyy:P* fn:undefined
yyy:Q* fn:UPD q
yyy:R* fn:UPD r
```

　修正後は次のような結果になる。「yyy:P*」部分が異なる。
```
 yyy:A fn:undefined
 yyy:B* fn:鑑定官_眼鏡
 yyy:C* fn:UPD c
 yyy:D* fn:UPD d

 yyy:G fn:undefined
 yyy:H* fn:鑑定官_眼鏡
 yyy:I* fn:UPD i
 yyy:J* fn:UPD j

 yyy:O fn:undefined
 yyy:P* fn:鑑定官_眼鏡
 yyy:Q* fn:UPD q
 yyy:R* fn:UPD r
```



## [1.50.1](https://github.com/famibee/SKYNovel/compare/v1.50.0...v1.50.1) (2024-04-21)


### Bug Fixes

* 非暗号化時に const.sn.fn2ext.json をセットしていなかった件 ([65eba71](https://github.com/famibee/SKYNovel/commit/65eba718e3e2e74f3246f8f0e8da5e74c58d06a3))

- fix: 非暗号化時に const.sn.fn2ext.json をセットしていなかった件


# [1.50.0](https://github.com/famibee/SKYNovel/compare/v1.49.2...v1.50.0) (2024-04-21)


### Features

* **組み込み変数:** const.sn.fn2ext.json 追加。ファイル名から拡張子がわかる json文字列。frame の HTML ファイルなどで必要なため ([f0f41b9](https://github.com/famibee/SKYNovel/commit/f0f41b97a2febbe201d2fa654da3b05e023590ee))

- feat(組み込み変数): const.sn.fn2ext.json 追加。ファイル名から拡張子がわかる json文字列。frame の HTML ファイルなどで必要なため
- docs(開発者情報): 組み込み変数の説明を拡張機能v4.16.0準拠に
- docs(タグリファレンス): 引数説明を拡張機能v4.16.0準拠に
- docs: 拡張機能のタグ・属性説明とタグリファレンスの内容を同期チェック
- docs: [macro]の引数説明記述で、値域・型の表記ゆれ統一と新規追加
- docs: 画像レイヤの fn 属性もカンマ区切りで複数指定可能である点を明記
	- この属性一つで基本画像（先頭）と差分名称（二つめ以降）を指定できる
	- 内部的に fn と face をcsv結合して扱っている
	- いつからかこの仕様だったが明示していなかった。扱いやすい場合も


## [1.49.2](https://github.com/famibee/SKYNovel/compare/v1.49.1...v1.49.2) (2024-04-13)


### Bug Fixes

* ライブラリ更新 ([ed56894](https://github.com/famibee/SKYNovel/commit/ed56894efa1e458cbbcb8cca3e486612d632b952))

- fix: ライブラリ更新
- refactor: （不具合ではない）マウスカーソル表示を pixi.js v7 以降に対応する記述に
- memo: 余談だがこれ以降は一部文字を合字フォントでコーディング
	* 対象：<= >= => == != === !== /= &&= ||= <- -> </> /\|> *** /* */ // 0 += -= *= >>= ## [] () @ | \\
	* 対象外：!~ ~ {} より コト


## [1.49.1](https://github.com/famibee/SKYNovel/compare/v1.49.0...v1.49.1) (2024-02-13)


### Bug Fixes

* 非暗号化時にアニメスプライトが表示されない件 ([bf308e5](https://github.com/famibee/SKYNovel/commit/bf308e5f029c0f5ad6362dee27bb00af38dfa2d5))

- fix: 非暗号化時にアニメスプライトが表示されない件


# [1.49.0](https://github.com/famibee/SKYNovel/compare/v1.48.15...v1.49.0) (2024-02-13)


### Features

* **IPluginInitArg:** 拡張機能 v4.15.0 対応、I/Fで余分な処理を削除・最適化 ([9a086a3](https://github.com/famibee/SKYNovel/commit/9a086a377605e6900c6af1c20e6eed060286dff1))

- feat(IPluginInitArg): 拡張機能 v4.15.0 対応、I/Fで余分な処理を削除・最適化
	- setDec(), setEnc() I/Fをasync化
	- async setDec()は string 専用とする
	- async setDecAB()追加、ArrayBuffer 専用とする
	- BREAKING CHANGE: 暗号化データに互換性なし、再生成必須
- fix(tsconfig.json): suppressImplicitAnyIndexErrors・newLine 削除（TypeScript 5.5 以降は完全に削除されるので）
- fix(buffer): ライブラリ削除。アプリ版 savePic() でも不要につき
- fix: ライブラリ更新


## [1.48.15](https://github.com/famibee/SKYNovel/compare/v1.48.14...v1.48.15) (2024-02-05)


### Bug Fixes

* **tween.js:** ライブラリ更新 ([6f48c03](https://github.com/famibee/SKYNovel/commit/6f48c0350e63c87dc90b3cc4132a1ebc193374ca))

- fix(tween.js): ライブラリ更新
- fix(release.yml): 【node-version: '20'】に更新


## [1.48.14](https://github.com/famibee/SKYNovel/compare/v1.48.13...v1.48.14) (2024-02-03)


### Bug Fixes

* NaNになるかもしれない値の ??（null合体演算子）による分岐処理を || に修正（src/sn/ReadState.ts） ([cf9b692](https://github.com/famibee/SKYNovel/commit/cf9b692ea9f7b28836d002c0aaa422b347d07c69))
* pub 1/11-1 ([c5ece62](https://github.com/famibee/SKYNovel/commit/c5ece62bff0bb1860035293a633053ac9e663a3e))
* pub 1/13-1 ([df07e6b](https://github.com/famibee/SKYNovel/commit/df07e6bd8ec7563f5633ea9219412c21e466f50a))
* pub 1/14-1 ([6f73d61](https://github.com/famibee/SKYNovel/commit/6f73d615c00e09abab7a05ce80c344612e306591))
* release.yml 更新1 ([fb23327](https://github.com/famibee/SKYNovel/commit/fb23327712d4d0db03cc68ccb36994344d2535bd))
* release.yml 更新2 ([99b14ed](https://github.com/famibee/SKYNovel/commit/99b14ed53ee3b0990cf25dc2d9d18ed903e29a95))
* release.yml 更新2.1 ([6bab75f](https://github.com/famibee/SKYNovel/commit/6bab75f94a48d219f0e1887d93c6425759dbe879))
* release.yml 更新2.2 ([e34a7bd](https://github.com/famibee/SKYNovel/commit/e34a7bd2255aa68bab82d77cd54b679276ff8e1b))
* キー更新 ([83cfb27](https://github.com/famibee/SKYNovel/commit/83cfb273fe60c6f3892dfd8f16f7a2f7c68a468a))
* キー更新2 ([f274ac8](https://github.com/famibee/SKYNovel/commit/f274ac8997f2f551ac2c9007f130efe983e63c09))
* キー更新3 ([411b2dd](https://github.com/famibee/SKYNovel/commit/411b2dd3f3554326a77a024f205faf1346ba820f))
* ライブラリ更新 ([b9bedf0](https://github.com/famibee/SKYNovel/commit/b9bedf0ce14f6cbeac9f333864e94db8d0e8164f))

- fix(ReadState): NaNになるかもしれない値の ??（null合体演算子）による分岐処理を || に修正
- test(PropParser.test): テストクラス MyVal の実装不足にダミー追記
- fix: tsconfig.json更新、useDefineForClassFields 追加
- fix(release.yml): 【node-version: '18'】に更新
- fix: ライブラリ更新
- docs: コードブロックライセンス年更新
- fix: pub 1/14-1


## [1.48.13](https://github.com/famibee/SKYNovel/compare/v1.48.12...v1.48.13) (2023-06-26)


### Bug Fixes

* スキップ中は（ごく稀に起こる）画像/動画ロード失敗エラーを DevTools のみ表示する ([d4009ff](https://github.com/famibee/SKYNovel/commit/d4009fffaad1c93c69d04dc16c08740bd3f3cc59))

- fix: スキップ中は（ごく稀に起こる）画像/動画ロード失敗エラーを DevTools のみに表示するように
- fix: [add_frame]で【sandbox="allow-scripts allow-same-origin"】はsandbox属性が無効になり、警告が出るだけで無意味につき削除
- fix: 既読処理で AreaKidoku が見つからない例外を出す処理をやめて正常ケースに乗せるように


## [1.48.12](https://github.com/famibee/SKYNovel/compare/v1.48.11...v1.48.12) (2023-06-25)


### Bug Fixes

* 使う前に不要になった画像リソースを、即 destroy() するように ([fb6c3d9](https://github.com/famibee/SKYNovel/commit/fb6c3d9eb0f87f626474bf459c5f1af30ef9636e))

- fix: 使う前に不要になった画像リソースを、即 destroy() するように


## [1.48.11](https://github.com/famibee/SKYNovel/compare/v1.48.10...v1.48.11) (2023-06-24)


### Bug Fixes

* 文字レイヤ背景の画像リソース破棄でエラーになる場合があった件（1.48.9デグレード） ([7259407](https://github.com/famibee/SKYNovel/commit/72594074a9a42163e4d044bef4ec40731e12a2cd))

- fix: 文字レイヤ背景の画像リソース破棄でエラーになる場合があった件（1.48.9デグレード）


## [1.48.10](https://github.com/famibee/SKYNovel/compare/v1.48.9...v1.48.10) (2023-06-24)


### Bug Fixes

* ライブラリ更新（@tweenjs/tween.js 21.0.0） ([2f40e12](https://github.com/famibee/SKYNovel/commit/2f40e12b46c26716cef396702bab3e8de1d6568f))

- fix: ライブラリ更新（@tweenjs/tween.js 21.0.0）


## [1.48.9](https://github.com/famibee/SKYNovel/compare/v1.48.8...v1.48.9) (2023-06-24)


### Bug Fixes

* 画像ロード終了と[trans]開始などの処理の兼ね合いをより厳密に管理するように ([9dd7527](https://github.com/famibee/SKYNovel/commit/9dd7527a2d172b4baa20d6758c2a24aff07b185f))

- fix: 画像ロード終了と[trans]開始などの処理の兼ね合いをより厳密に管理するように
- fix: 画像レイヤをリファクタリング、巨大クラス GrpLayer の役割を新規クラス SpritesMng に分散


## [1.48.8](https://github.com/famibee/SKYNovel/compare/v1.48.7...v1.48.8) (2023-06-22)


### Bug Fixes

* 自動読み進み＆[ws]で再生終了待ち中、クリックで[l][p]まで進み、再生終了で次に進む ([80f1abb](https://github.com/famibee/SKYNovel/commit/80f1abb9794c7702bf9fd2748de5ef361235a28b))

- fix: 自動読み進み＆[ws]で再生終了待ち中、クリックキャンセルで次の[l][p]に進んで放置、再生終了で次に進む件
- feat: [wv]にクリックキャンセル時の再生停止するかの stop 属性追加


## [1.48.7](https://github.com/famibee/SKYNovel/compare/v1.48.6...v1.48.7) (2023-06-21)


### Bug Fixes

* [ws canskip=false]の場合に、イベント予約せず待ちで停止していた件 ([fbc7824](https://github.com/famibee/SKYNovel/commit/fbc782420b03204a5e8d0f46e0030f46dc7737e6))

- fix: [ws canskip=false]の場合に、なにもイベント予約せずイベント待ちで停止していた件
- fix: [trans]〜[wt]中に右クリックメニューすると、強制的に戻って立ち絵表示なども再度行ってしまう件
- fix: [wt]などでキャンセルされなかった場合の後処理の不足を加筆
	- [wt][wait_tsy][wv][ws][wl][wf][wb]


## [1.48.6](https://github.com/famibee/SKYNovel/compare/v1.48.5...v1.48.6) (2023-06-18)


### Bug Fixes

* 文字表示関係修正、前回・前々回の件を解消 ([abcfccb](https://github.com/famibee/SKYNovel/commit/abcfccb753b7ef1256d812b0f342413aa828d245))

- fix: 文字表示関係修正、前回・前々回の件を解消


## [1.48.5](https://github.com/famibee/SKYNovel/compare/v1.48.4...v1.48.5) (2023-06-16)


### Bug Fixes

* 文字表示中のクリックで操作を受け付けなくなる件 ([e77ff86](https://github.com/famibee/SKYNovel/commit/e77ff86df0fc8f0d2ae359679ed08660443bef0b))

- fix: 文字表示中のクリックで操作を受け付けなくなる件
	- 前回の【オートリード時のクリック停止で〜】によるデグレード、いったん対応を無効化


## [1.48.4](https://github.com/famibee/SKYNovel/compare/v1.48.3...v1.48.4) (2023-06-15)


### Bug Fixes

* （文字表示以外の）Tween系をリファクタリング・統合 ([f202c3b](https://github.com/famibee/SKYNovel/commit/f202c3b09777b58a8152c5fa0867262913f5bfec))

- fix: （文字表示以外の）Tween系をリファクタリング・統合
	- [trans][wt][finish_trans][wait_tsy][stop_tsy][pause_tsy][resume_tsy][quake]
- fix: オートリード時のクリック停止で、通過した[wt][wait_tsy]のクリックキャンセル処理が走る件
	- クリック時に立ち絵などが移動するなどの現象、不定
- fix: 内部リード状態が変化するたびにヒント消去


## [1.48.3](https://github.com/famibee/SKYNovel/compare/v1.48.2...v1.48.3) (2023-06-14)


### Bug Fixes

* [tsy][wait_tsy]まわりをリファクタリング ([e5a73cc](https://github.com/famibee/SKYNovel/commit/e5a73cc14b388c100976e154d863d1000f60493c))

- fix: [tsy][wait_tsy][pause_tsy][resume_tsy][stop_tsy]まわりをリファクタリング
- fix: [tsy] でクリックスキップのタイミングとレイヤページの兼ね合いで不具合がある可能性に対処


## [1.48.2](https://github.com/famibee/SKYNovel/compare/v1.48.1...v1.48.2) (2023-06-12)


### Bug Fixes

* 前回の destroy() をループモノ(BGM)だけに限定 ([74aec62](https://github.com/famibee/SKYNovel/commit/74aec623f517150e00ee87acdaf4f0caeb86a43f))

- fix: 前回の destroy() をループモノ(BGM)だけに限定


## [1.48.1](https://github.com/famibee/SKYNovel/compare/v1.48.0...v1.48.1) (2023-06-12)


### Bug Fixes

* @pixi/sound@4.4.0 で stop() による再生停止しない場合があった件 ([836a537](https://github.com/famibee/SKYNovel/commit/836a53732dd7fe4d63dc1e351dd6c5a1ff4c8572))

- fix: @pixi/sound@4.4.0 で stop() による再生停止しない場合があり、destroy() もするように


# [1.48.0](https://github.com/famibee/SKYNovel/compare/v1.47.3...v1.48.0) (2023-06-10)


### Features

* セーブによるディスク書きこみ連打の対策（最短 500ms ほどは開ける） ([bcb6287](https://github.com/famibee/SKYNovel/commit/bcb6287097aedef8ff0c02a6aa343c4227f52118))

- feat: セーブによるディスク書きこみ連打の対策（最短 500ms ほどは開ける）
- fix: 【;[endmacro]】のようなコメント文を[endmacro]のように判定する場合がある件
- fix: esbuild 設定に【 target: 'esnext' 】追加、Safari・Firefox・Edge で動作確認


## [1.47.3](https://github.com/famibee/SKYNovel/compare/v1.47.2...v1.47.3) (2023-06-09)


### Bug Fixes

* [macro]内 ifブロック中で [return] 時、IFスタックを積み残す件 ([4d03461](https://github.com/famibee/SKYNovel/commit/4d03461341fa3c95e5a85e800e53b985feae93fd))

- fix: [macro]内で [if]ブロック中にて [return] によるマクロ脱出時、IFスタックを積み残す件
- fix: [call]先で [if]ブロック中にて [return] 脱出時、IFスタックを積み残す件
- fix: ページ移動の履歴記録数もログ保存長 prj.json：log.max_len で制限するように
- fix: 画像レイヤのページ情報でのムダに大きいスクリプター用情報を削除
- feat(組み込み変数): IFスタックの深さを返す const.sn.aIfStk.length 追加
- 保存データ mark でむやみに巨大になっているものを削除処理・設定値で対策。体感速度も落ちていた
	- fix: aIFStk が中身 -1 の巨大配列（とある作品で 321）に（前述のIFスタック積み残しによる）
	- fix: hPages 画像レイヤの idc_hArg - ":hMp:" - const.sn.macro のムダに大きいスクリプター用情報
	- fix: cfg.log.max_len: デフォルト値 1024 を 64 (ぐらい)に
		- save:const.sn.sLog が、とある作品で 367kB にもなっていた。
		- 元ネタの const.sn.log.json が追加される一方だった
			- AIRNovel：履歴の保存「行数」
			- SKYNovel：履歴の保存「ページ数」


## [1.47.2](https://github.com/famibee/SKYNovel/compare/v1.47.1...v1.47.2) (2023-06-07)


### Bug Fixes

* [wait]にFスキップで突っ込んだときにクリック待ちになる件 ([01a173a](https://github.com/famibee/SKYNovel/commit/01a173a0fe4e2040535a122f72066522e05ae461))

- fix: [wait]にFスキップで突っ込んだときにクリック待ちになる件


## [1.47.1](https://github.com/famibee/SKYNovel/compare/v1.47.0...v1.47.1) (2023-06-07)


### Bug Fixes

* [window]で centering=true 時に画面中央とずれた位置に移動していた件 ([4d17417](https://github.com/famibee/SKYNovel/commit/4d174176ce0054698f772895f973367161ad3292))

- fix: [window]で centering=true 時に画面中央とずれた位置に移動していた件


# [1.47.0](https://github.com/famibee/SKYNovel/compare/v1.46.1...v1.47.0) (2023-06-07)


### Features

* [page]に style 属性追加、ページ移動中の既読文字に適用出来るように ([988d66f](https://github.com/famibee/SKYNovel/commit/988d66f2f1095379bda80a9b333e0e3a4c6267f7))

- feat: [page]に style 属性追加、ページ移動中の既読文字に CSS Style を適用出来るように
	- ただし[span]区間ではその style 属性で（CSSプロパティごとに）上書きされる
	- デフォルトは文字色が黄色に（[page style='color: yellow;']）
	- 既知の問題：文字レイヤのサイズを小まめに変えるタイプの作品で、ページ移動中文字表示がはみ出す場合がある
- feat: [l] 停止からでも[page to=prev] が利いてページ移動ができるように
- fix: ページ移動、リファクタリングなど


## [1.46.1](https://github.com/famibee/SKYNovel/compare/v1.46.0...v1.46.1) (2023-06-02)


### Bug Fixes

* プラグイン側で画面サイズを取得出来ず、３Ｄレイヤなどが表示されなかった件 ([57da9b6](https://github.com/famibee/SKYNovel/commit/57da9b62158fbb80d0d7690838eb99a37dc336ba))

- fix: プラグイン側で画面サイズを取得出来ず、３Ｄレイヤなどが表示されなかった件
	- （恐らくセキュリティ強化により）プラグイン側でグローバルクラス変数の値（CmnLib.stageW, CmnLib.stageH）を取得出来なくなっていた（=0）ので、画面サイズを取得出来るプラグインインタフェイスを追加


# [1.46.0](https://github.com/famibee/SKYNovel/compare/v1.45.3...v1.46.0) (2023-06-02)


### Features

* 読み進みとクリック待ちなどイベントまわりを大改修 ([819070e](https://github.com/famibee/SKYNovel/commit/819070e7aaaedcacf9c46583f6f80b628114169e))

- feat: 読み進みとクリック待ちなどイベントまわりを大改修
	- feat: [ws]にクリックキャンセルで再生停止しない機能 stop=false （デフォルト=true）追加
	- feat: [wt]もイベント待ちするように
	- feat: BREAKING CHANGE: [wt][l][p][s]に global 属性（デフォルト=true）追加
	- fix: BREAKING CHANGE: [wait_tsy][wv][ws][wl][wf][wb] の global 属性デフォルト値を true に
	- feat: canskipとglobalを同時にtrue指定できない制限を撤廃
	- fix: [wait]の global 属性を廃止、イベント発生待ちを行わない仕様で無意味につき
- fix: [set_cancel_skip] スキップ中断予約 を廃止、不要に
- fix: v1.36.1 ... v1.37.0 の過程でのデグレード修正
	- [rec_ch]で履歴に付加情報を付けられる仕様が無効になっていた件
	- [rec_ch]の text属性デフォルト値を現在値に。指定必須になっていた
- fix: @pixi/sound@4.4.0 に更新


## [1.45.3](https://github.com/famibee/SKYNovel/compare/v1.45.2...v1.45.3) (2023-05-24)


### Bug Fixes

* リファクタリングと手直し ([9fac34e](https://github.com/famibee/SKYNovel/commit/9fac34ee32c20654c93ed3653309dde6762ae66e))

- fix: リファクタリングと手直し


## [1.45.2](https://github.com/famibee/SKYNovel/compare/v1.45.1...v1.45.2) (2023-05-22)


### Bug Fixes

* 強制スキップ中にも適度に文字が表示されるように ([9ea0315](https://github.com/famibee/SKYNovel/commit/9ea031525b75a20ffc64004806a8684363a85e28))

- fix: 強制スキップ中にも適度に文字が表示されるように
- fix: 内部的に強制スキップを自動読み進みと同等の判定処理に


## [1.45.1](https://github.com/famibee/SKYNovel/compare/v1.45.0...v1.45.1) (2023-05-22)


### Bug Fixes

* 自動読み進み中に停止で、クリックなどを受け付けなくなる状態になる件 ([7aaa326](https://github.com/famibee/SKYNovel/commit/7aaa3268fd0fd0d7d078715248d9aa1d46e85b6f))

- fix: 自動読み進み中に停止で、クリックなどを受け付けなくなる状態になる件
	- 自動読み進み時に[l][p]でグローバルイベントを予約していなかった
- fix: 自動読み進み停止で、クリック待ちが表示されない件


# [1.45.0](https://github.com/famibee/SKYNovel/compare/v1.44.1...v1.45.0) (2023-05-21)


### Features

* [l][p]のクリック待ちサイズをその時の文字レイヤフォントに合わせるように ([0e774fd](https://github.com/famibee/SKYNovel/commit/0e774fded3fe0c08eea64eb38fda72666aa4d7d2))

- feat: [l][p]のクリック待ち breakline・breakpage サイズをその時の文字レイヤフォントサイズに合わせるように
- feat: [l][p]にサイズを指定出来る width・height 属性を追加
- feat: [l][p]に位置を指定出来る x・y 属性を追加


## [1.44.1](https://github.com/famibee/SKYNovel/compare/v1.44.0...v1.44.1) (2023-05-17)


### Bug Fixes

* @popperjs/core まわりのパラメータミスを広域チェック ([28544f2](https://github.com/famibee/SKYNovel/commit/28544f27b920a3f997b9f017241cf3044cfb82a1))

- fix: @popperjs/core まわりのパラメータミスを広域チェック
	- fix: [button][link]の hint_opt 属性、デフォルト値ミスを修正
- fix: [p]改ページクリック待ちでのクリックで、ヒントを消すように
- docs: タグリファレンス [button][link]の hint_opt 属性 の文法（JSON）について説明追記、デフォルト値ミスも修正


# [1.44.0](https://github.com/famibee/SKYNovel/compare/v1.43.10...v1.44.0) (2023-05-16)


### Features

* [button][link]にクリックでブラウザを開ける url 属性を追加 ([90882df](https://github.com/famibee/SKYNovel/commit/90882df481c8960d37c8d1791fe936d9a0d4922a))

- feat: [button][link]にクリックでブラウザを開ける url 属性を追加
	- 内部で [navigate_to] を呼ぶ
	- ブラウザ・アプリ版・パッケージ版（Mac/Win）動作確認済
	- AIRNovelでは属性 href だったが、url に変名
	- [event]の内部処理もこれに合わせる
- fix: [event]でurl属性ありのイベント発生時、それ以降イベントが発生しなかった件
- fix: [link]で fn属性が省略された場合に実行中スクリプトとしない場合があった件
- fix: [link]で必要な属性が指定されなかった「fnまたはlabelまたはurlは必須です」エラーで、適切なスクリプト位置を表示するように
- fix: [link]で属性 clicksebuf, entersebuf, leavesebuf 省略時に「SYS」になっていなかった件（タグリファレンス・[button]に合わせた）
- docs: タグリファレンスの [button][link]に url 属性を追記、[event]には既にあったが更新
- 既知の問題（これ以前は無し）
	- TODO: アプリ版で[event key=sn:chgNavLang]が発生しない件
		- @famibee/skynovel@1.42.0 に戻してもダメ。もともと出来てないのでは？


## [1.43.10](https://github.com/famibee/SKYNovel/compare/v1.43.9...v1.43.10) (2023-05-15)


### Bug Fixes

* [xchgbuf]後のロードでエラーになる場合がある件 ([05a7ece](https://github.com/famibee/SKYNovel/commit/05a7ece48fb9a35f326541f8f5b1f34dc5892b92))

- fix: [xchgbuf]後のロードでエラーになる場合がある件
- fix: サウンドまわり微修正


## [1.43.9](https://github.com/famibee/SKYNovel/compare/v1.43.8...v1.43.9) (2023-05-14)


### Bug Fixes

* サウンドをステートパターンで大改修 ([1e3e329](https://github.com/famibee/SKYNovel/commit/1e3e329c9f334c7fd48ac4d01713eb48a74f5aa0))

- fix: サウンドをステートパターンで大改修
- fix: [playbgm]と[fadebgm]の短時間連続でエラーになる場合がある件
- fix: [quake][tsy][tsy_frame]の repeat属性で、0だけでなく負の値を指定した場合は無限ループとするように
- fix: 設定画面でボリューム変更しただけで音が消える件（v1.42.0 (2023-04-06)より）
	- ~~@pixi/sound@4.3.3 のせいだったので、しばらく 4.3.2 に下げる。~~
		- Fix mobile handling interruptions by bigtimebuddy · Pull Request #240 · pixijs/sound https://github.com/pixijs/sound/pull/240
		- Sound is suspended while window loses focus · Issue #243 · pixijs/sound https://github.com/pixijs/sound/issues/243
- docs: タグリファレンスの[quake]に属性 delay、repeat、yoyo の追記


## [1.43.8](https://github.com/famibee/SKYNovel/compare/v1.43.7...v1.43.8) (2023-05-09)


### Bug Fixes

* [button enabled=false pic=]で【画像は三等分しない】仕様でミス ([302f069](https://github.com/famibee/SKYNovel/commit/302f06940e9d831bf3e558f7d16223237420fe6d))

- fix: [button enabled=false pic=...]で【画像は三等分しない】仕様が三等分していた件
- fix: [playse]で end_ms 属性エラーチェックの判定ミスでエラーになる件
- fix: [playse]でループする場合のエラーメッセージで、停止スクリプト表示をしていなかった件
- docs: タグリファレンスの [graph]インライン画像表示 で属性 x, y は使えないので記述削除


## [1.43.7](https://github.com/famibee/SKYNovel/compare/v1.43.6...v1.43.7) (2023-05-08)


### Bug Fixes

* [l]直前が[tcy]や[graph]だと、余分に１クリックしないとクリック待ちしない件 ([e544948](https://github.com/famibee/SKYNovel/commit/e54494894b93850d139a9ec57db66df1a8c2ca0e))

- fix: [l]直前が[tcy]や[graph]だと、余分に１クリックしないとクリック待ちしない件
	- 例）[tcy t=!!][l]
	- 例）[graph pic=breakpage][l]
	- [span][l] 、は問題ない
	- [link label=*main]000[endlink][l] 、も問題ない
- fix: DesignCast クラスのスタブ化を深化


## [1.43.6](https://github.com/famibee/SKYNovel/compare/v1.43.5...v1.43.6) (2023-05-07)


### Bug Fixes

* デザインモード、塩漬けとする ([9c973c7](https://github.com/famibee/SKYNovel/commit/9c973c700cdcc6c186cd23ea140f32fd4ca02d00))

- fix: デザインモード、塩漬けとする
	- 保留中にライブラリの変更が激しいため、メンテナンスコスト的に moveableもいったん削除
	- DesignCast クラスをスタブ化


## [1.43.5](https://github.com/famibee/SKYNovel/compare/v1.43.4...v1.43.5) (2023-05-06)


### Bug Fixes

* 三項演算子で正しい判定をしない場合があった件 ([5e5ebc6](https://github.com/famibee/SKYNovel/commit/5e5ebc6ccadc88bd8de49e405948cda81e5ab99e))

- fix: 三項演算子で正しい判定をしない場合があった件
	- '& undefined ? null : 10' で null を返していた
	- '& 存在しない変数 ? null : 10' で null を返していた
- fix: 論理 NOT (前置 !) も同様の修正
- fix: isNaN() の実装を ECMAScript 2015 以降の Number.isNaN() 関数に変更
- fix: 擬似的な関数「Boolean()」を追加、js の Boolean に近い挙動
	- Boolean - JavaScript | MDN https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Boolean
- docs: 開発者向け情報に【式で使える演算子と関数】追記


## [1.43.4](https://github.com/famibee/SKYNovel/compare/v1.43.3...v1.43.4) (2023-05-01)


### Bug Fixes

* 組み込み変数 const.sn.last_page_plain_text 追加 ([c2dd1c8](https://github.com/famibee/SKYNovel/commit/c2dd1c8ff7f6bdc17d8df8db7faa5e678cca29f8))

- fix: 組み込み変数 const.sn.last_page_plain_text 追加
	- そのページの履歴テキストだが、《》文法を含まない const.sn.last_page_text にあたるもの
	- ルビは含まないものとする
	- セーブ・ロード画面の参照ページテキストに《》表記の文字が入るのを回避したい（テンプレも変更）
	- セーブ・ロード画面をテキストレイヤで作る人も居ると思われるので、変数の挙動変更ではなく新変数で
	- ログ画面は発生しない、対処済み
- fix: [save]の属性 textで【<br\/>】を削除する処理を削除。特に意味はないため


## [1.43.3](https://github.com/famibee/SKYNovel/compare/v1.43.2...v1.43.3) (2023-05-01)


### Bug Fixes

* [tsy]文字レイヤ移動に文字表示が追従しない件 ([047c870](https://github.com/famibee/SKYNovel/commit/047c8704d1a18db48c287f1b56fc95421cf82469))

- fix: [tsy]文字レイヤ移動に文字表示が追従しない件


## [1.43.2](https://github.com/famibee/SKYNovel/compare/v1.43.1...v1.43.2) (2023-04-30)


### Bug Fixes

* 【単項 -】演算がエラーになる場合があった件など、演算関係修正 ([69531fa](https://github.com/famibee/SKYNovel/commit/69531fa406ddbe735bdf42fe8325d2a4089463b5))

- fix: 【単項 -】演算がエラーになる場合があった件
- fix: -null、-false、-true をエラーとしていたが、jsにあわせた値 -0、-0、-1 を返すように
- fix: 【-未定義変数】をエラーとしていたが、NaNを返すように


## [1.43.1](https://github.com/famibee/SKYNovel/compare/v1.43.0...v1.43.1) (2023-04-17)


### Bug Fixes

* リロードやロードからの再開で、画像レイヤface差分の blendmode が正しくない件 ([1807fda](https://github.com/famibee/SKYNovel/commit/1807fda3a825ce6f8054e3d02dc9df8ac430f8a4))

- fix: リロードやロードからの再開で、画像レイヤface差分の blendmode が正しく再現されない件


# [1.43.0](https://github.com/famibee/SKYNovel/compare/v1.42.0...v1.43.0) (2023-04-09)


### Features

* 基底スクリプトから一部コピー（継承）する派生スクリプト機能追加。多言語対応しやすくする ([7e576cb](https://github.com/famibee/SKYNovel/commit/7e576cb2cfab383779b4604593f027debd54cf6b))

- feat: 基底スクリプトから一部コピー（継承）する派生スクリプト機能追加。多言語対応しやすくする
	- 【語彙説明】xx.zzz（@接尾辞なし形式）のファイルを【基底ファイル（ベース）】と呼ぶ。
	- 【語彙説明】xx@@yy.zzz（@が２つ＋接尾辞）のファイルを【接尾辞つきファイル】と呼ぶ。
	- 【語彙説明】xx@@@yy.zzz（@が３つ＋接尾辞）のファイルを【派生ファイル（サブ）】と呼ぶ。（今回追加した機能）
	- 【前提知識】[jump fn=xx] では通常 xx.sn をロードするが、&save:sn.userFnTail = 'yy'、などと接尾辞設定して以降は【接尾辞つきファイル】 xx@@yy.sn をロードする機能がある。これにより画像・音声ファイルなどを切り替え、多言語対応などに使える。
	- さて今回追加されたのは、【派生スクリプト】の「空行」へ【基底スクリプト】の「同じ行の内容をコピー（継承）」し、【接尾辞つきスクリプト】として扱うというもの。
	- この【派生】の仕組みがあれば、演出などのタグは【日本語版の基底】に集中でき、【派生】には他言語のセリフや地の文など、差異のみを記述できる。
		- 【接尾辞つきスクリプト】でスクリプトごと切り替えるより、メンテナンス性が高い。
		- 翻訳を外注に出す場合にも、テキストのみ・タグなし状態ファイルでやりとりできる。
			- フォント・ウインドウサイズ変更など、少々のタグは含むとしても。
- fix: save:sn.userFnTail に文字「@」を含むとエラーとするように
- fix: jump系タグで属性 fn に文字「@」を含むとエラーとするように
- fix: 言語変更イベントで画像テクスチャキャッシュをクリアするように
- fix: [reload_script]（スクリプト再読込）で派生スクリプトキャッシュも削除するように


# [1.42.0](https://github.com/famibee/SKYNovel/compare/v1.41.0...v1.42.0) (2023-04-06)


### Features

* ユーザー設定言語設定を返す const.sn.navigator.language 追加 ([1f04cdc](https://github.com/famibee/SKYNovel/commit/1f04cdc35b7fd3b0954649ee2207b11221ea6fc4))

- feat: 組み込み変数：ユーザーが最優先に設定している言語設定（IETF言語タグ）を返す const.sn.navigator.language を追加
- feat: 言語設定の変更を通知するイベント sn:chgNavLang 追加。以下で発生
	- ブラウザ版：ブラウザの言語設定を変更した時
	- アプリ版：OSの言語設定を変更した時
- fix: ライブラリ更新などによるコンパイルエラー修正
- fix: save:sn.userFnTail 変更しても、画像レイヤでキャッシュが利いてしまうため、言語変更イベントでキャッシュをクリアするように
- fix: [if]ブロック内で【未定義のタグ[endlet_ml]です】エラーが発生する件


# [1.41.0](https://github.com/famibee/SKYNovel/compare/v1.40.5...v1.41.0) (2023-03-10)


### Features

* フレームなどでの画像ロード処理で、パラメータを含んだファイル名に対応 ([a0f2372](https://github.com/famibee/SKYNovel/commit/a0f23727932cada102244656cb780cbd7215b261))

- feat: フレームなどでの画像ロード処理で、パラメータを含んだファイル名に対応
	- 処理前：userdata:/5/pic.jpg?u=1678372118404
	- 処理後：userdata:/5/pic.jpg
- fix: [snapshot]は保存終了を待つように
- fix: [snapshot]App版が layer指定を無視していた件。ブラウザ版と同じ処理を使用するように


## [1.40.5](https://github.com/famibee/SKYNovel/compare/v1.40.4...v1.40.5) (2023-03-08)


### Bug Fixes

* アプリ版セーブでサムネイルが保存・表示されない件 ([d5ff2bb](https://github.com/famibee/SKYNovel/commit/d5ff2bb895f0b086271ed64fe41501c6bd4fb004))

- fix: アプリ版セーブでサムネイルが保存・表示されない件


## [1.40.4](https://github.com/famibee/SKYNovel/compare/v1.40.3...v1.40.4) (2023-03-06)


### Bug Fixes

* 末尾文字表示でカーソルが次行先頭に来てしまう件 ([20a3741](https://github.com/famibee/SKYNovel/commit/20a3741c206e820e0659679b2f7bab2c7376d66c))

- fix: 末尾文字表示でカーソルが次行先頭に来てしまう件
	- 改行→クリック待ち、の後で改行が消えない事を確認
	- 冒頭クリック待ち＋改行での表示確認


## [1.40.3](https://github.com/famibee/SKYNovel/compare/v1.40.2...v1.40.3) (2023-02-06)


### Bug Fixes

* ライブラリ対応：gamepad.js v2.0.0 の変更に対応 ([55945da](https://github.com/famibee/SKYNovel/commit/55945dade14cb23fdb12075bfbc2ba38fc0c2049))

- fix: ライブラリ対応：gamepad.js v2.0.0 の変更に対応
	- https://github.com/Tom32i/gamepad.js/releases/tag/v2.0.0
- fix: ライブラリ更新


## [1.40.2](https://github.com/famibee/SKYNovel/compare/v1.40.1...v1.40.2) (2023-01-09)


### Bug Fixes

* ライブラリ更新、コードブロックライセンス年更新 ([bc80e49](https://github.com/famibee/SKYNovel/commit/bc80e496fd4ce4d792fa652a3d6780b0315d2b46))

- docs: コードブロックライセンス年更新
- fix: ライブラリ更新


## [1.40.1](https://github.com/famibee/SKYNovel/compare/v1.40.0...v1.40.1) (2022-12-14)


### Bug Fixes

* [link] style_disable属性などデフォ値を【color: gray;】に ([c028e5b](https://github.com/famibee/SKYNovel/commit/c028e5beccb947bc886b189105848d1872bf0c05))

- fix: [link]の style_disable, r_style_disable 属性デフォルト値を【color: gray;】に


# [1.40.0](https://github.com/famibee/SKYNovel/compare/v1.39.13...v1.40.0) (2022-12-14)


### Features

* [link]に enabled, style_disable など属性追加 ([14ffa9d](https://github.com/famibee/SKYNovel/commit/14ffa9d5ed3e3d2d4ceddc908d3da1ce887087f6))

- feat: [link]に enabled属性追加。condにより「表示するがリンクにしない」動作をする
- feat: [link]に style_disable, r_style_disable 属性追加。enabled=false 時のCSS


## [1.39.13](https://github.com/famibee/SKYNovel/compare/v1.39.12...v1.39.13) (2022-12-13)


### Bug Fixes

* アプリ版：暗号化プロジェクトでセーブするとサムネイル表示でエラーになる件 ([ab09a47](https://github.com/famibee/SKYNovel/commit/ab09a4745641b4cdf988a5c10561a93c17830b68))

- fix: アプリ版：暗号化プロジェクトでセーブするとサムネイル表示でエラーになる件
	- （内部処理）loadPic2Img()、すなわちフレームにおける【sn_repRes】を、非暗号化画像はそのまま返すように
	- セーブデータサムネイル用
- fix: 不要な ensureFileSync を削除・スナップショット保存処理へ移動


## [1.39.12](https://github.com/famibee/SKYNovel/compare/v1.39.11...v1.39.12) (2022-12-10)


### Bug Fixes

* 暗号化音声で Fスキップすると音関係エラーになる場合がある件 ([661636f](https://github.com/famibee/SKYNovel/commit/661636f85b73293ec11f3df032e672df7d912f2c))

- fix: 暗号化音声で Fスキップすると音関係エラーになる場合がある件


## [1.39.11](https://github.com/famibee/SKYNovel/compare/v1.39.10...v1.39.11) (2022-12-10)


### Bug Fixes

* 暗号化動画表示時にロードエラーになる件（revokeObjectURLが早すぎた） ([31b5c6c](https://github.com/famibee/SKYNovel/commit/31b5c6ca0c93ffb7d35e4b9fc47c1ecae3ba7292))

- fix: 暗号化動画表示時にロードエラーになる件（revokeObjectURLが早すぎた）
- fix: アプリ版：全画面時などで見える SKYNovel 表示以外の背景色を黒色に
- fix: アプリ版：起動中真っ白対策
- docs: 拡張機能公開先リンク修正


## [1.39.10](https://github.com/famibee/SKYNovel/compare/v1.39.9...v1.39.10) (2022-12-08)


### Bug Fixes

* 改行→クリック待ち、の後で改行が消える件 ([d17860a](https://github.com/famibee/SKYNovel/commit/d17860ab79dfbc2172b34d54ac332afce7078f8e))

- fix: 改行→クリック待ち、の後で改行が消える件
	- 以下の状況で改行が効かない。
> Ａ[l][r]
> 	[p]  
> Ｂ[s]  
- fix: AnalyzeTagArg.ts parseinDetail() の修正（エンジン動作には影響なし）


## [1.39.9](https://github.com/famibee/SKYNovel/compare/v1.39.8...v1.39.9) (2022-11-28)


### Bug Fixes

* [button]で enabled=false 時、style属性の文字色デフォを灰色に ([1d3290b](https://github.com/famibee/SKYNovel/commit/1d3290b201d7a1e9b0acea31534a5fd484503783))

- fix: [button]で enabled=false 時、style属性の文字色デフォルト値をグレーに
	- 旧：'{"fill": "black"}'
	- 新：'{"fill": "gray"}'


## [1.39.8](https://github.com/famibee/SKYNovel/compare/v1.39.7...v1.39.8) (2022-11-24)


### Bug Fixes

* ギャラリーでサンプルのボタン切り替えが三回目以降できない件（v1.35.2 から） ([7de2814](https://github.com/famibee/SKYNovel/commit/7de28143ccd61ae2cbaedc0bdbdc24a6eb4e6a41))

- fix: ギャラリーでサンプルのボタン切り替えが三回目以降できない件（v1.35.2 から）


## [1.39.7](https://github.com/famibee/SKYNovel/compare/v1.39.6...v1.39.7) (2022-11-24)


### Bug Fixes

* [snapshot]でエラーになる場合がある件 ([d44ef08](https://github.com/famibee/SKYNovel/commit/d44ef087951c5b79452194508477802e5682c5dd))

- fix: [snapshot]でエラーになる場合がある件
- fix: 内部微手直し
- fix: jest更新対応
	- @testing-library/react で「ReferenceError: document is not defined」みたいなエラーが出たときの対処法 - tech.Note https://tech.note.wlaboratory.com/entry/category/memo/jest/test/jest%2B%40testing-library-react


## [1.39.6](https://github.com/famibee/SKYNovel/compare/v1.39.5...v1.39.6) (2022-11-17)


### Bug Fixes

* ビルド再試行 ([e5c0630](https://github.com/famibee/SKYNovel/commit/e5c06309f4409c5d8ba6fce24209abcdd986f173))

- fix: ビルド再試行


## [1.39.5](https://github.com/famibee/SKYNovel/compare/v1.39.4...v1.39.5) (2022-11-17)


### Bug Fixes

* [trans]で hint を消すように ([7ae362e](https://github.com/famibee/SKYNovel/commit/7ae362e2adc55ca4af50101feb4b9c98cfe7070a))

- fix: [trans]で hint を消すように
- fix: @pixi/sound の preload はトラブルの元なので使用を控えるように
	- レスポンス向上のための音声ファイル先読みをしないように


## [1.39.4](https://github.com/famibee/SKYNovel/compare/v1.39.3...v1.39.4) (2022-11-16)


### Bug Fixes

* [fade系]非同期処理のエラー対策 ([4b0d297](https://github.com/famibee/SKYNovel/commit/4b0d2979ef2cfa58056319d861ca8e131fcd7a34))

- fix: [fade系]非同期処理のエラー対策
- fix: スキップ時に文字クリック待ちが左上になる件（前回のデグレード）
- fix: スキップ時にムービーを止めるように
- fix: ムービーリソースの破棄を明示


## [1.39.3](https://github.com/famibee/SKYNovel/compare/v1.39.2...v1.39.3) (2022-11-15)


### Bug Fixes

* [ch wait=0]な文字表示のみの画面で、ボタンクリック一度目が効かない件 ([113b204](https://github.com/famibee/SKYNovel/commit/113b204a8be3d288b4a19aa8b361af55a5f69fd8))

- fix: [ch wait=0]な文字表示のみの画面で、ボタンクリック一度目が効かない件
- fix: 右クリック戻りなどで文字表示が崩れる件


## [1.39.2](https://github.com/famibee/SKYNovel/compare/v1.39.1...v1.39.2) (2022-11-14)


### Bug Fixes

* [playse]系でループあり・ret_ms属性設定ありの場合にエラーになっていた件 ([f026719](https://github.com/famibee/SKYNovel/commit/f02671968d03565a8ff8d51e237f26e8dde1c16b))

- fix: [playse]系でループあり・ret_ms属性設定ありの場合にエラーになっていた件
- fix: キー押しっぱなしで早送り時、音まわりでエラーになる場合があった件
- fix: 【return undefined】をなるべく【return null】に
	- 【参考】JavaScript の undefined と null を完全に理解する http://nmi.jp/2022-10-17-Understanding-Undefined-And-Null
- fix: Web版[import]修正
- fix: 型エラー修正


## [1.39.1](https://github.com/famibee/SKYNovel/compare/v1.39.0...v1.39.1) (2022-11-06)


### Bug Fixes

* 禁則処理：クリック待ちが二つ以上あるページで、妙な場所で改行するケースがある件 ([8dfe093](https://github.com/famibee/SKYNovel/commit/8dfe0939b2f0af7eb3b81b42c6c9469138e0dd6a))

- fix: 禁則処理：クリック待ちが二つ以上あるページで、妙な場所で改行するケースがある件


# [1.39.0](https://github.com/famibee/SKYNovel/compare/v1.38.3...v1.39.0) (2022-11-06)


### Features

* 音声再生中か返す tmp:const.sn.sound.【buf】.playingを追加 ([cb7dfd5](https://github.com/famibee/SKYNovel/commit/cb7dfd501b53d3fd889e04bcddda6679405974e4))

- feat: 組み込み変数：サウンドバッファが再生中か返す tmp:const.sn.sound.【buf】.playingを追加


## [1.38.3](https://github.com/famibee/SKYNovel/compare/v1.38.2...v1.38.3) (2022-10-25)


### Bug Fixes

* 暗号化時にエラーになっていた件 ([47967ba](https://github.com/famibee/SKYNovel/commit/47967ba46ca863e73c762fecf19e0b423de3be79))

- fix: 暗号化時にエラーになっていた件
- test: 一部テストを【test.each(table)(name, fn, timeout)】形式で記述
	- test/PropParser.test.ts
	- test/RubySpliter.test.ts
- refactor: 一部テストの .at(0) を .charAt(0) に


## [1.38.2](https://github.com/famibee/SKYNovel/compare/v1.38.1...v1.38.2) (2022-10-22)


### Bug Fixes

* リファクタリングなどメンテ ([0f2267d](https://github.com/famibee/SKYNovel/commit/0f2267d434612c810d2423785bdc94bdece5b50d))

- fix: リファクタリングなどメンテ
- refactor: .charAt(0) を .at(0) に
- refactor: Config の大部分を新規基底クラス ConfigBase に
- chore: （内部）属性と値の位置をまとめて返す AnalyzeTagArg.parseinDetail() を、属性値がない【fn=】形式にもマッチするように（v_len: 0）


## [1.38.1](https://github.com/famibee/SKYNovel/compare/v1.38.0...v1.38.1) (2022-10-15)


### Bug Fixes

* タグ解析で負荷100%になる場合があった件（正規表現でカタストロフバックトラック） ([8d06070](https://github.com/famibee/SKYNovel/commit/8d060702116f191ae5ddbfc3ea67fd953a19cc57))
* タグ解析で負荷100%になる場合があった件（正規表現でカタストロフバックトラック） ([527f6aa](https://github.com/famibee/SKYNovel/commit/527f6aa433f2b2355f42f0e5c2a6010dbd25beaa))

- fix: タグ解析で負荷100%になる場合があった件（正規表現でカタストロフィバックトラック）
	- 再現【[let_ml name=aa\n】
- fix: [bracket2macro]にタグ・マクロ存在チェックを追加
- chore: （内部）AnalyzeTagArg.parseinDetail()追加、テストも
- refactor: HArg, ITag, IHTag の定義を CmnInterface.ts から Grammar.ts へ移動
- refactor: resolveScript()の大半を ScriptIterator.ts から Grammar.ts へ移動
- refactor: resolveScript()は splice ではなく flatMap を使用する方向で
- test: matchToken()より一層上の resolveScript()でのテストに
- test: [char2macro][bracket2macro]テスト追加
- test: [let_ml]関連テスト追加
- fix: リファクタリングなどメンテ


# [1.38.0](https://github.com/famibee/SKYNovel/compare/v1.37.1...v1.38.0) (2022-10-11)


### Features

* [tsy][tsy_frame]で吉里吉里の拡張的な属性path追加 ([061a61a](https://github.com/famibee/SKYNovel/commit/061a61a706ac976c738da72a0b46199ee0144c96))

- feat: [tsy][tsy_frame]で吉里吉里の拡張的な属性path追加
	- 半角丸括弧に囲んで属性 x、y、alpha の三つを指定する（吉里吉里仕様）
		- (1, 2, 0.3)
	- 以降はSKYNovel拡張
		- 変更しない項目を省略できる
			- (,10, 0.11) (12,,0.13 ) (14,15,) ()
		- [tsy]属性のような「初期位置からの相対値」形式
			- 先頭に=を追加する
			- (=-22)
		- [tsy]属性のような「範囲内でランダムな値」形式
			- 'か"で囲み、カンマ , で【最小値】【最大値】を区切る
			- ('=23,24','0.3, 1')
		- [tsy]属性をJSONで指定できる形式
			- 文字列は " で囲む
			- {"scale_x":100, "scale_y":"=101"}
			- 指定できる属性は[tsy]と同様、rotation・scale_x・pivot_x・width など
	- 動作が上手くいかないときは path 属性の解析に失敗しているかも？
		- 設定画面の debugLog スイッチを入れると、括弧ごとの逐次処理をコンソール出力する
		- JSON解析失敗はスイッチにかかわらず出力する
- docs: タグリファレンス[tsy][tsy_frame]に path 属性について追記
- fix: ループでの.exec() をなるべく .matchAll()に


## [1.37.1](https://github.com/famibee/SKYNovel/compare/v1.37.0...v1.37.1) (2022-10-10)


### Bug Fixes

* 履歴がダブることがある件 ([201602d](https://github.com/famibee/SKYNovel/commit/201602da9a54e6d272b1aec7dbc6dfb140259271))

- fix: 履歴がダブることがある件
- fix: .replace() をなるべく .replaceAll()に


# [1.37.0](https://github.com/famibee/SKYNovel/compare/v1.36.1...v1.37.0) (2022-10-10)


### Features

* [rec_ch]で[r]改行、style・r_style属性が使用できるように ([8a6a415](https://github.com/famibee/SKYNovel/commit/8a6a4150e5523ee990be13d0c8bb0379c0ca121f))

- feat: [rec_ch]で[r]改行、style・r_style属性が使用できるように
- fix: [rec_ch][rec_r]で履歴に記録されない件
- fix: [rec_ch]でルビ文法（《》）が使えなかった件
- docs: [rec_ch]で[r]改行、style・r_style属性の説明追加


## [1.36.1](https://github.com/famibee/SKYNovel/compare/v1.36.0...v1.36.1) (2022-10-08)


### Bug Fixes

* [er][l]で、先頭行の行頭ではなく最後にクリック待ちを表示した位置に表示されてしまう件 ([9a07a50](https://github.com/famibee/SKYNovel/commit/9a07a50b8fb69c3bf7f5f0396af1aa03271774db))

- fix: [er]してなにも表示しないまま[l][p]クリック待ちを行うと、先頭行の行頭ではなく最後にクリック待ちを表示した位置に表示されてしまう件
- fix: 吉里吉里文法のセーブラベル名【*001|セーブラベル名】指定時、全体をラベルと解釈してしまい「ラベルが見つからないエラー」になる件
	- 吉里吉里仕様のセーブラベル名にあたる機能は無いが、属性指定時に「|」後はデフォルト値解釈で無視されるので、「|」で分けて考えるべき
- docs: マクロリファレンスの誤記を修正
	- ただ、今後はマクロ定義そのものに記入された引数説明が一番信用できる


# [1.36.0](https://github.com/famibee/SKYNovel/compare/v1.35.4...v1.36.0) (2022-10-03)


### Features

* 属性名・ラベル名の \w+ 縛りを外した ([b01a6c1](https://github.com/famibee/SKYNovel/commit/b01a6c17260b08ec3e35d3ba492a95fec007f43e))

- feat: 属性名の \w+ 縛りを外した（AnalyzeTagArg.ts）
	- test: 属性名にハングル、中国語（簡体字・繁体字）、スペイン語、アラビア語、ベトナムの漢越語表記なども使えるテスト追加（AnalyzeTagArg.test.ts）
- feat: ラベル名の \w+ 縛りを外した（Grammar.ts）
	- perf: 少し高速化
	- test: タグ名にハングル、中国語（簡体字・繁体字）、スペイン語、アラビア語、ベトナムの漢越語が使える確認用テスト追加（Grammar.test.ts）
- perf: 正規表現をややスリム化（RubySpliter.ts）
	- test: 韓国・中国語（簡体字・繁体字）漢字のテスト追加（RubySpliter.test.ts）
- refactor: #searchPath 使用時、第二引数用の内部定数を enum に
- docs: [macro]の nowarn_unused、sum、%〜、detail 属性について追記


## [1.35.4](https://github.com/famibee/SKYNovel/compare/v1.35.3...v1.35.4) (2022-09-30)


### Bug Fixes

* マクロ定義時にマクロ名をチェックするように【正規表現：["'#;\\]　]+】 ([65fcbd2](https://github.com/famibee/SKYNovel/commit/65fcbd2b088e4de434840fd94211c9ffff59574e))

- fix: マクロ定義時にマクロ名をチェックするように【正規表現：["'#;\\]　]+】
- refactor: 分割代入を積極利用、配列には名前付け
- refactor: ()=> {return {...\}} を ()=> ({...\}) に
- refactor: forEach ループをできるだけ for..of に


## [1.35.3](https://github.com/famibee/SKYNovel/compare/v1.35.2...v1.35.3) (2022-09-23)


### Bug Fixes

* 非推奨気味な for..in ループを for..of Object.keysなどに ([4fcc2cf](https://github.com/famibee/SKYNovel/commit/4fcc2cf571ef0b3e8316d9bf710d1b0e3ffd69dc))

- fix: 非推奨気味な for..in ループを for..of Object.keys/values/entries()に
	- for..in が prototype汚染列挙問題とパフォーマンスがやや評判悪い
	- 不要なfilter、mapなどによる多重ループは避ける
- fix: リファクタリング


## [1.35.2](https://github.com/famibee/SKYNovel/compare/v1.35.1...v1.35.2) (2022-09-18)


### Bug Fixes

* アプリ版：全画面時にpixijs部分が左端による件 ([1e99048](https://github.com/famibee/SKYNovel/commit/1e99048f3f387cd846e33bae97a2f2e3f1fe5600))

- fix: アプリ版：全画面時にpixijs部分が左端による件
	- Winでも動作確認
- refactor: 手直し：addEventListener()リソースリーク対策
- docs: setTimeout() 使用箇所に clearTimeout() 必要性判断（setInterval()は不使用）


## [1.35.1](https://github.com/famibee/SKYNovel/compare/v1.35.0...v1.35.1) (2022-09-17)


### Bug Fixes

* [ch style='background...']が最初から出てしまう件 ([ef091d9](https://github.com/famibee/SKYNovel/commit/ef091d90a11ff87ac2e1240f032e6249c6ae84a6))

- fix: [ch style='background...']が最初から出てしまう件
- docs: [ch]でのみ、背景styleなどを一塊とする件を明記
- docs: [graph]から属性 ch_in_style、ch_out_style の記述を削除


# [1.35.0](https://github.com/famibee/SKYNovel/compare/v1.34.1...v1.35.0) (2022-09-17)


### Features

* [lay][span][ch][tcy][graph][ruby2]に r_style ([c2de19f](https://github.com/famibee/SKYNovel/commit/c2de19f928f259c9d086617a7f19b661244c890c))

- feat: [lay][span][ch][tcy][graph][ruby2]に属性 r_style 追加。ルビの style を指定。
	- 未指定時、文字色などは style属性 にならう
- feat: [link]に属性 r_style, r_style_hover, r_style_clicked 追加
- feat: [tcy][ruby2]に属性 style 追加
- feat: [lay][span]の属性 style・r_style で空文字【''など】を渡すとクリアできるように
- BREAKING CHANGE: [span][link]の style, r_style 属性設定を次の[link]でクリアしないように
- BREAKING CHANGE: [ch] style 属性による背景指定が文字個別になるように
	- 以前は text属性で一塊として背景指定されていた
- fix: [lay]の属性 style で指定を禁止している CSS について警告が出ていなかった件
- fix: [link]区間の縦中横[tcy]がフォーカスに反応しない件
- fix: [graph]の r属性が利かなかったのを修正
- fix: [ch][graph][link][ruby2][span][tcy]の属性にルビ記法の特殊文字「｜《》」が含まれていると不具合になる件
- fix: 禁則処理である文字の前の文字を調べる際、ルビ文字の末尾を見ていた件
- fix: [button]のフォーカス関連修正
- fix: 文字表示周り手直し、リファクタリングなど


## [1.34.1](https://github.com/famibee/SKYNovel/compare/v1.34.0...v1.34.1) (2022-09-11)


### Bug Fixes

* [span]で囲むと表示が崩れる件（前回のデグレード） ([7804fed](https://github.com/famibee/SKYNovel/commit/7804fedfc1fe244ceb9525e734d53c95bc904bb6))

- fix: [span]で囲むと表示が崩れる件（前回のデグレード）


# [1.34.0](https://github.com/famibee/SKYNovel/compare/v1.33.0...v1.34.0) (2022-09-11)


### Features

* ルビがある単語でも一文字ずつ出現表示するように（ルビはまとめて出現） ([e37bf17](https://github.com/famibee/SKYNovel/commit/e37bf17187281bf9a52256d2f97fdf2f24820538))

- feat: ルビがある単語でも一文字ずつ出現表示するように（ルビはまとめて出現）
- fix: 文字表示関連で細々修正


# [1.33.0](https://github.com/famibee/SKYNovel/compare/v1.32.2...v1.33.0) (2022-09-11)


### Features

* ルビ記法の《》内をdecodeURIComponentするように（AIRNovelより） ([2d8d6cf](https://github.com/famibee/SKYNovel/commit/2d8d6cfecde82765602fd6b655c8c819cb423122))

- feat: ルビ記法の《》内をdecodeURIComponent() するように（AIRNovelからの移植）
- fix: ルビ記法の《》内で半角スペースを区切りと見なさない \t 区切りを廃止
- docs: ルビ記法の項を追記


## [1.32.2](https://github.com/famibee/SKYNovel/compare/v1.32.1...v1.32.2) (2022-09-10)


### Bug Fixes

* ボタンクリックが二度必要になることがある件 ([2c8d487](https://github.com/famibee/SKYNovel/commit/2c8d487b12b99fc68e6f8cb740bf248b64afc11f))

- fix: ボタンクリックが二度必要になることがある件


## [1.32.1](https://github.com/famibee/SKYNovel/compare/v1.32.0...v1.32.1) (2022-09-09)


### Bug Fixes

* pan 追加によりエラーになる事があった件 ([32b573d](https://github.com/famibee/SKYNovel/commit/32b573dd9ef74bb0239eed415ac346271ad5df1e))

- fix: pan 追加によりエラーになる事があった件


# [1.32.0](https://github.com/famibee/SKYNovel/compare/v1.31.4...v1.32.0) (2022-09-09)


### Features

* [playse][playbgm]に属性 pan 追加。音を出す左右位置を指定できる ([9ce3bcd](https://github.com/famibee/SKYNovel/commit/9ce3bcd250d7feebe4dbb0fcaad0ca4619a47e8b))

- feat: [playse][playbgm]に属性 pan 追加。音を出す左右位置を指定できる
	- SKYNovel：-1.0=左端、0.0=中央(省略値)、1.0=右端
	- KAG3：パン (-100～0～100)。-100 が完全な左、0 が中央、100 が完全な右


## [1.31.4](https://github.com/famibee/SKYNovel/compare/v1.31.3...v1.31.4) (2022-09-09)


### Bug Fixes

* [ch wait]の指定が条件により 0 扱いになってしまう件 ([6faced9](https://github.com/famibee/SKYNovel/commit/6faced91c59cd1a33b844a7aae89702518e4f4c9))

- fix: [ch wait]の指定が条件により 0 扱いになってしまう件


## [1.31.3](https://github.com/famibee/SKYNovel/compare/v1.31.2...v1.31.3) (2022-09-07)


### Bug Fixes

* 文字出現中クリックで全文字瞬時表示＆停止せず、次の[l][p]なども飛ばしてしまう件 ([7636fa6](https://github.com/famibee/SKYNovel/commit/7636fa64340e90a562a1ec0190965c5315043781))

- fix: 文字出現中クリックで全文字瞬時表示＆停止せず、次の[l][p]なども飛ばしてしまう件
- fix: [wait]と文字表示を交互にすると、表示し終わってないのにクリック待ち表示が出る件
- fix: リファクタリングなどメンテ


## [1.31.2](https://github.com/famibee/SKYNovel/compare/v1.31.1...v1.31.2) (2022-09-02)


### Bug Fixes

* Chromeで動画自動再生時に起こることがあるエラーを回避する機能 ([e6f01c5](https://github.com/famibee/SKYNovel/commit/e6f01c5c1027d42cd499fb1ab7d804c2631c0f34))

- fix: Chrome 実行時で自動レジューム直後に動画を自動再生すると、ユーザーが未クリックにつき DOMException になるが、そのエラーを回避する機能
	- 【注意】コンソールに警告を出し、音声はミュートされます
	- アプリ版はそもそも無関係
	- テンプレの自動レジューム無効時（再開かタイトルからか聞くダイアログが出るとき）ならユーザーがクリックするので無関係
- fix: iOS版で、画像レイヤの動画再生でエラーが発生することがある件


## [1.31.1](https://github.com/famibee/SKYNovel/compare/v1.31.0...v1.31.1) (2022-09-01)


### Bug Fixes

* [r]による改行後は追い出し処理をしないように ([a0045f0](https://github.com/famibee/SKYNovel/commit/a0045f0af248698b19212fe20d507da03bdf7c0e))

- fix: [r]による改行後は追い出し処理をしないように
	- ノベルゲーム文体でよくある「……」行が続く描写で、追い出し（分割禁止）が発生してしまう件


# [1.31.0](https://github.com/famibee/SKYNovel/compare/v1.30.10...v1.31.0) (2022-09-01)


### Features

* [return]にfn・label属性追加。コールスタックを一つ破棄、戻り先を上書き指定 ([45a1879](https://github.com/famibee/SKYNovel/commit/45a1879fda4934c2384485eb0fdbec401ba6dac9))

- feat: [return]にfn・label属性追加。コールスタックを一つ破棄しつつ、戻り先を上書き指定できるように（マクロ内からジャンプしたいときなど）


## [1.30.10](https://github.com/famibee/SKYNovel/compare/v1.30.9...v1.30.10) (2022-08-31)


### Bug Fixes

* デグレードにつき[trans]での非同期処理を再度修正 ([07f263f](https://github.com/famibee/SKYNovel/commit/07f263f4158867b3c3b6287a19ac665ce60e16b9))

- fix: デグレードにつき[trans]での非同期処理を再度修正


## [1.30.9](https://github.com/famibee/SKYNovel/compare/v1.30.8...v1.30.9) (2022-08-31)


### Bug Fixes

* 画像レイヤのセーブデータで blendmode を正しく保存していなかった件 ([5a0d9f9](https://github.com/famibee/SKYNovel/commit/5a0d9f94eedd419bafcbc38647a45bb9461596a9))

- fix: 画像レイヤのセーブデータで blendmode を正しく保存していなかった件
- fix: [trans]での非同期処理修正
- fix: 画像ロードでの非同期処理修正


## [1.30.8](https://github.com/famibee/SKYNovel/compare/v1.30.7...v1.30.8) (2022-08-26)


### Bug Fixes

* ギャラリーでサンプル切り替え時、「Dummy」という横長のふきだしspan が増えていく件 ([a9a956b](https://github.com/famibee/SKYNovel/commit/a9a956b200d61b9c7159c21da1e2c1661d41702f))

- fix: ギャラリーでサンプル切り替え時、「Dummy」という横長のふきだし span が増えていく件


## [1.30.7](https://github.com/famibee/SKYNovel/compare/v1.30.6...v1.30.7) (2022-08-26)


### Bug Fixes

* [trans]時に back page の b_alpha などが見た目に反映されない件 ([23d44bf](https://github.com/famibee/SKYNovel/commit/23d44bf5a6b51b42af1f7b6537447304b63baee2))

- fix: [trans]時に back page の b_alpha や b_alpha_isfixed が見た目に反映されない件
- fix: ライブラリ更新


## [1.30.6](https://github.com/famibee/SKYNovel/compare/v1.30.5...v1.30.6) (2022-07-26)


### Bug Fixes

* [button]等hint_opt属性でmodifiersを指定しない場合Hintが非表示 ([ea6d693](https://github.com/famibee/SKYNovel/commit/ea6d693a5f3d797219878dd995cfcd9d9c7a0744))

- fix: [button]などの hint_opt 属性で、modifiers を指定しない場合に Hintが非表示・コンソールでエラーになっていた件


## [1.30.5](https://github.com/famibee/SKYNovel/compare/v1.30.4...v1.30.5) (2022-07-26)


### Bug Fixes

* tsconfig.json の target を ES2022に ([ba02e78](https://github.com/famibee/SKYNovel/commit/ba02e782add158126add0cd9d3d9aea8b57bce62))

- fix: tsconfig.json の target を ES2022に
- fix: ライブラリ更新


## [1.30.4](https://github.com/famibee/SKYNovel/compare/v1.30.3...v1.30.4) (2022-06-25)


### Bug Fixes

* [link wait=0]が効かない件 ([5b2e8da](https://github.com/famibee/SKYNovel/commit/5b2e8da8016f374d894ed4eb635636fae71eead6))

- fix: [link wait=0]が効かない件
- fix: [tcy]にも wait・style・ch_in_style・ch_out_style属性追加
- fix: 縦中横・ルビ付き縦中横の内部文法【《tcy｜451｜かし》】を廃止、他に会わせJSON形式に


## [1.30.3](https://github.com/famibee/SKYNovel/compare/v1.30.2...v1.30.3) (2022-05-31)


### Bug Fixes

* [link][span][ch]の表示関係修正 ([0a71b50](https://github.com/famibee/SKYNovel/commit/0a71b50683f03828df1922d913d9fc590c5885cd))

- fix: 単体[ch style=...]で background 指定時にスライドインせず最初から表示される件
- fix: [link][span]での style属性指定が、文字個別になる件
- fix: [span style=...]中、２文字以上textの[ch]で表示されない文字がある件
- fix: ２文字以上textの[ch]で[span]が閉じられていない件
	- （例）[ch text='あい' style=...] など
- fix: [span]で閉じられていない件
- fix: [ch text=...]内 [r] で改行しない件
	- （例）[ch text='ンー[r]〜']
- fix: [link]hover で style 表示が崩れる件
- ~~既知の問題~~
	- ~~[link wait=0]が効かない~~


## [1.30.2](https://github.com/famibee/SKYNovel/compare/v1.30.1...v1.30.2) (2022-05-26)


### Bug Fixes

* [link]文字列の途中で改行せず追い出される件 ([345219b](https://github.com/famibee/SKYNovel/commit/345219bcb84f9f2e88d06ce38a0e301b123264c5))

- fix: [link]文字列の途中で改行せず追い出される件
- fix: [ch style]などが効かなくなっていた件（22/1/13 デグレード）
- fix: リファクタリング


## [1.30.1](https://github.com/famibee/SKYNovel/compare/v1.30.0...v1.30.1) (2022-05-17)


### Bug Fixes

* 最初から左上に hint が表示されている件 ([c31e01b](https://github.com/famibee/SKYNovel/commit/c31e01b749f62fddb0cf649e1179bdd4f94bbd8c))

- fix: 最初から左上に hint が表示されている件


# [1.30.0](https://github.com/famibee/SKYNovel/compare/v1.29.8...v1.30.0) (2022-05-17)


### Features

* [button][link] の hintを @popperjs/core 駆動に変更 ([4d181fd](https://github.com/famibee/SKYNovel/commit/4d181fdd96ca1c70e69e2ffe597ff8bb4850d1da))

- feat: [button][link] の hintを @popperjs/core 駆動に変更
	- CSSカスタマイズしやすさを重視
	- hintの CSSを指定できる hint_style 属性追加
		- 例） hint_style='background-color: red;'
	- @popperjs/coreの動作を指定できる hint_opt 属性追加
		- 例） tooltips を上側、[Modifiers・Offset の Distance](https://popper.js.org/docs/v2/modifiers/offset/) を -30 に設定するには、
			hint_opt='{"placement": "top", "modifiers": [{"name": "offset", "options": {"offset": [0, -30]}}]}'
			- json部分を読みやすく展開すると……
```json
{
	"placement": "top",
	"modifiers": [
		{
			"name": "offset",
			"options": {
				"offset": [0, -30]
			}
		}
	]
}
```
	- BREAKING CHANGE: hint関連の属性は以下の通りに変更

| | 変更点 | 属性 | 必須 | 省略時 | 値域・型 | コメント |
|-|-|-|-|-|-|-|
| o | 変更 | hint |  | 表示しない | String | 指定した場合のみ、マウスカーソルを載せるとツールチップス表示する。~~<br/>hint(.pngなど)をプロジェクトに含めると、それをツールチップス図形として使う~~ |
| + | 追加 | hint_style | | （狭いので省略） | css | ツールチップ矩形のスタイル |
| + | 追加 | hint_opt | | | json | @popperjs/core の createPopper() の第三引数 |
| x | 廃止 | ~~hint_tate~~ |  | ~~文字レイヤの縦書き指定（writing-mode: vertical-rl なら true）~~ | ~~Boolean~~ | ~~ツールチップスをリンクに対してどの位置に表示するか。<br/>false：リンクの上に表示（横書き文字レイヤの動作）<br/>true：リンクの右に横倒しで表示（縦書き文字レイヤの動作）~~ |
| x | 廃止 | ~~hint_width~~ |  | ~~80~~ | ~~1〜ドット数~~ | ~~hintの幅を指定できる~~ |
| x | 廃止 | ~~hint_color~~ |  | ~~'white'~~ | ~~css色指定。'white', '#FF0000'など~~ | ~~文字色を指定~~ |
| x | 廃止 | ~~hint_font~~ |  | ~~'22px Arial'~~ | ~~文字サイズとフォント~~ | ~~hint文字サイズとフォントを指定~~ |

- fix: JSON系の属性設定時のエラーメッセージを詳細に


## [1.29.8](https://github.com/famibee/SKYNovel/compare/v1.29.7...v1.29.8) (2022-05-12)


### Bug Fixes

* [link]関係の不具合修正 ([5f9b84f](https://github.com/famibee/SKYNovel/commit/5f9b84f69071896e4fd3bf9a4beef58e45b72fd7))

- fix: 履歴記録 OFF時（save:sn.doRecLog = false）に[link]が押せない件
- fix: [link]で囲まれた最初の一文字のみ mouse over イベントを拾う件
- fix: [link]で囲まれたルビあり文字のみが、「背景色変更」される件


## [1.29.7](https://github.com/famibee/SKYNovel/compare/v1.29.6...v1.29.7) (2022-04-29)


### Bug Fixes

* ギャラリーで別のプロジェクトを選ぶとエラーになる件 ([9c2a4be](https://github.com/famibee/SKYNovel/commit/9c2a4bebea1d79caf8ad0db66066fd78b448d25f))

- fix: ギャラリーで別のプロジェクトを選ぶとエラーになる件
	- DOMException: Failed to execute ‘insertBefore’ on ‘Node’:
	- The node before which the new node is to be inserted is not a child of this node.
- fix: 不具合修正（修正忘れ：prj.json の backgroundColor を文字型に）


## [1.29.6](https://github.com/famibee/SKYNovel/compare/v1.29.5...v1.29.6) (2022-04-28)


### Bug Fixes

* ライブラリ更新 ([65a11ae](https://github.com/famibee/SKYNovel/commit/65a11aeaa259becb8bde76901d4daf25d9f49e4b))

- fix: ライブラリ更新


## [1.29.5](https://github.com/famibee/SKYNovel/compare/v1.29.4...v1.29.5) (2022-04-06)


### Bug Fixes

* Electron 18 対応 ([3d8b8b4](https://github.com/famibee/SKYNovel/commit/3d8b8b4a6c58e374bd5a7464ba720af2befe6d09))

- fix: Electron 18 対応
- fix: コメントが残っていたのを削除
- fix: gやyフラグを使わない正規表現のlastIndex=0リセット記述を削除


## [1.29.4](https://github.com/famibee/SKYNovel/compare/v1.29.3...v1.29.4) (2022-03-31)


### Bug Fixes

* 前回更新による後方互換性に対応 ([1c7ea8d](https://github.com/famibee/SKYNovel/commit/1c7ea8d3fce6d3918651d64d6dee3d230a2f4c32))

- fix: 前回更新による後方互換性に対応


## [1.29.3](https://github.com/famibee/SKYNovel/compare/v1.29.2...v1.29.3) (2022-03-31)


### Bug Fixes

* prj.json の backgroundColor を文字型に（拡張機能と同調） ([1d05712](https://github.com/famibee/SKYNovel/commit/1d05712b9a4601c3cf3212738ce79b1acc3d95e3))

- fix: prj.json の backgroundColor を文字型に（拡張機能と同調）
- fix: prj.json の型情報をより厳密に


## [1.29.2](https://github.com/famibee/SKYNovel/compare/v1.29.1...v1.29.2) (2022-03-22)


### Bug Fixes

* 必要最小限の import形式に変更 ([06b486a](https://github.com/famibee/SKYNovel/commit/06b486a7095b229ad2ddbbf58cb71f5a14b4b331))

- fix: 必要最小限の import形式に変更
- chore: src/build.js を src/build.ts に


## [1.29.1](https://github.com/famibee/SKYNovel/compare/v1.29.0...v1.29.1) (2022-03-04)


### Bug Fixes

* 文字レイヤに禁則処理文字を変更できる属性追加。対象文字を列挙した文字列を指定 ([c48b386](https://github.com/famibee/SKYNovel/commit/c48b3860e9380356ebe9319d04a78e521e4028a7))

- fix: 文字レイヤに禁則処理文字を変更できる属性追加。対象文字を列挙した文字列を指定
	- kinsoku_sol（行頭禁則）
	- kinsoku_eol（行末禁則）
	- kinsoku_dns（分割禁止）


# [1.29.0](https://github.com/famibee/SKYNovel/compare/v1.28.4...v1.29.0) (2022-02-28)


### Features

* BREAKING CHANGE: アプリ版[export] .spd をzip圧縮に変更 ([cb694f4](https://github.com/famibee/SKYNovel/commit/cb694f49db9fd1bfe85229656ffebbb3e037f269))

- feat: BREAKING CHANGE: アプリ版[export][import]データ .spd をzip圧縮に変更
	- よって後方互換性なし
- fix: アプリ版[export][import]でエラーになる件
- chore: ビルドツールを vite に変更
- chore: テストツールを esbuild-jest（と Jest 拡張機能）に変更。vitest は見送り
- chore: 一般的なライブラリを参考に、ビルド設定やフォルダ構造などを変更
	- .npmignore より package.json filesフィールドを活用
	- srcフォルダをルートへ移動、coreフォルダを廃止
	- 生成物を新規 distフォルダへ
	- package.json exportsフィールド追加・サブパスを指定
- docs: vite が検出しないのでタグリファレンスなどの URL を.htm から .html に変更


## [1.28.4](https://github.com/famibee/SKYNovel/compare/v1.28.3...v1.28.4) (2022-02-12)


### Bug Fixes

* 拡張子 woff ファイルを扱ってなかった件 ([b06faf3](https://github.com/famibee/SKYNovel/commit/b06faf36203c6b49fa9d8fd1444bb4588b7d4453))

- fix: 拡張子 woff ファイルを扱ってなかった件
- fix: テキストレイヤの破棄処理修正
- fix: AIRNovelにあったフォントチェック機能（未作成）を正式に削除（組み込み変数 sn.chkFontMode）、役割を拡張機能へ


## [1.28.3](https://github.com/famibee/SKYNovel/compare/v1.28.2...v1.28.3) (2022-02-08)


### Bug Fixes

* Safari / Firefox / Edge 動作確認と修正 ([f8caacf](https://github.com/famibee/SKYNovel/commit/f8caacfcf6b3825b624c3c868a63d54b0f893d85))

- fix: Safari / Firefox / Edge 動作確認と修正
- fix: Safari で TypeError になる件
- fix: ギャラリーで画面サイズ・全画面によってはテキストがずれる・サイズが合わない件
- fix: ギャラリーでSafariのみ左にずれる件
- docs: 【セーブデータの保存場所】にデバッグ実行時などを追記


## [1.28.2](https://github.com/famibee/SKYNovel/compare/v1.28.1...v1.28.2) (2022-02-04)


### Bug Fixes

* Winアプリ版：全画面モードから戻ると右端に余白、縦方向にも狭い ([280f7c6](https://github.com/famibee/SKYNovel/commit/280f7c6ae3008a8c904448ce201bd4eede52ef05))

- fix: Winアプリ版：全画面モードから戻ると右端に余白、縦方向にも狭い
- ~~既知の問題~~
	- ~~Winアプリ版：メニューやF11キーだと全画面モードで左端に寄る~~


## [1.28.1](https://github.com/famibee/SKYNovel/compare/v1.28.0...v1.28.1) (2022-02-03)


### Bug Fixes

* Winアプリ版：全画面モードで左端に寄る ([976a637](https://github.com/famibee/SKYNovel/commit/976a637205c118d66ac68695f85ea4c7879826b0))

- fix: Winアプリ版：全画面モードで左端に寄る
- fix: Macアプリ版：全画面モードから戻ると右端に余白、縦方向にも狭い
- ~~既知の問題~~
	- （次Verで解消）~~Winアプリ版：全画面モードから戻ると右端に余白、縦方向にも狭い~~


# [1.28.0](https://github.com/famibee/SKYNovel/compare/v1.27.9...v1.28.0) (2022-01-30)


### Features

* アプリメニューから予約イベントを発生できる機能（key名の指定のみ） ([40995e1](https://github.com/famibee/SKYNovel/commit/40995e101227818554f8125f34c79d4751430f98))

- feat: アプリメニューから予約イベントを発生できる機能（key名の指定のみ）
- fix: Winアプリ版の全画面モードで全画面にならず、左上に張り付き、拡大もされない
- ~~既知の問題~~
	- （次Verで解消） ~~Winアプリ版：全画面モードで左端に寄る~~
	- （次Verに移動） ~~Winアプリ版：全画面モードから戻ると右端にちょっと白い部分が……~~


## [1.27.9](https://github.com/famibee/SKYNovel/compare/v1.27.8...v1.27.9) (2022-01-29)


### Bug Fixes

* Winアプリ版で位置を動かすたびに下に広く右に少し広くなる件 ([68fec29](https://github.com/famibee/SKYNovel/commit/68fec29778836517e2032f50af53c02a74c8fe44))

- fix: Winアプリ版で位置を動かすたびに下に広く右に少し広くなる件
- fix: 全画面切り替え機能、内部をブラッシュアップ
- ~~既知の問題~~
	- （次Verで解消） ~~Winアプリ版の全画面モードで全画面にならず、左上に張り付き、拡大もされない~~


## [1.27.8](https://github.com/famibee/SKYNovel/compare/v1.27.7...v1.27.8) (2022-01-28)


### Bug Fixes

* ブラウザ版で全画面から ESCで戻ると画像が大きいままな件 ([bb41a02](https://github.com/famibee/SKYNovel/commit/bb41a02899b1c53aae330eba80f9b127c9336c7e))

- fix: ブラウザ版で全画面から ESCで戻ると画像が大きいままな件
- fix: アプリ版の全画面モードで表示サイズがおかしい件（v1.27.6でデグレード）
- fix: リファクタリング


## [1.27.7](https://github.com/famibee/SKYNovel/compare/v1.27.6...v1.27.7) (2022-01-24)


### Bug Fixes

* ギャラリーなど SKYNovel がページの一要素の場合で全画面表示が崩れる件 ([1df816a](https://github.com/famibee/SKYNovel/commit/1df816a4b2117a1231b7668217d8f3d91530a95e))

- fix: ギャラリーなど SKYNovel がページの一要素の場合で全画面表示が崩れる件


## [1.27.6](https://github.com/famibee/SKYNovel/compare/v1.27.5...v1.27.6) (2022-01-24)


### Bug Fixes

* ブラウザ版で全画面時にフレームサイズが小さいままな件 ([9da52b8](https://github.com/famibee/SKYNovel/commit/9da52b8550cbdf30986aef9047886e7b8cc433a5))

- fix: ブラウザ版で全画面時にフレームサイズが小さいままな件
- fix: 全画面だとヒントが見えない（たぶん画面外に出てる……？）
- fix: レイヤは画面リサイズ・スマホ回転時処理でフレームは全画面・ウインドウモード切り替え処理のみだったので、前者に統一
- fix: リファクタリング
- ~~既知の問題~~
	- ブラウザ版のみ全画面だとボタンの当たり判定が妙に広い
		- 中央から左のボタンは左に、右のボタンは右に広い
		- 本文で右端近いボタンは当たり判定の left も右にずれている
		- 当たり判定の上下幅は問題ない
		- アプリ版は問題ない
			- F12 DevTools を表示しているときだけ発生？
		- DevTools を消すと問題ないので、保留とする。
	- サンプル作ったら pixi.js 自体の問題なので報告した
		In full screen display, the hitArea collision detection is slightly longer to the left and right. · Issue #8132 · pixijs/pixijs https://github.com/pixijs/pixijs/issues/8132


## [1.27.5](https://github.com/famibee/SKYNovel/compare/v1.27.4...v1.27.5) (2022-01-21)


### Bug Fixes

* アプリ版で全画面時にフレームサイズが大きすぎる件、リファクタリング ([37d0a33](https://github.com/famibee/SKYNovel/commit/37d0a330dff7a90bd92f8d678165249367e35528))

- fix: アプリ版で全画面時にフレームサイズが大きすぎる件
- fix: ブラウザ版で全画面時にセンタリングするように
	- テンプレの doc/web.htm も変更（cssで「canvas」→「canvas#skynovel」）
- fix: リファクタリング：タグで引数取得時、分割代入積極使用
- fix: リファクタリング：一部をString()や + 演算子文字列結合ではなくテンプレートリテラルに


## [1.27.4](https://github.com/famibee/SKYNovel/compare/v1.27.3...v1.27.4) (2022-01-19)


### Bug Fixes

* ライブラリ更新 ([59c131a](https://github.com/famibee/SKYNovel/commit/59c131aa4fa58a964031037918567bdca9bc2f30))

- fix: ライブラリ更新


## [1.27.3](https://github.com/famibee/SKYNovel/compare/v1.27.2...v1.27.3) (2022-01-15)


### Bug Fixes

* ウインドウ位置が保存されない件 ([95f0786](https://github.com/famibee/SKYNovel/commit/95f0786e10a0ba4cc28c46f85e2ce5dd9a1359ad))

- fix: ウインドウ位置が保存されない件


## [1.27.2](https://github.com/famibee/SKYNovel/compare/v1.27.1...v1.27.2) (2022-01-13)


### Bug Fixes

* [r]を挟むと[span]色変更がキャンセルされる件 ([88224d3](https://github.com/famibee/SKYNovel/commit/88224d3f5c59a0d1501fc94b125fdad6e004a3e5))

- fix: [r]を挟むと[span]色変更がキャンセルされる件
- fix: [tcy]で[tcy t='Day 1']と半角を入れると表示が変になる件
- fix: （問題ないか確認しつつ）Promise.all を Promise.allSettled に

## [1.27.1](https://github.com/famibee/SKYNovel/compare/v1.27.0...v1.27.1) (2022-01-12)


### Bug Fixes

* [playse][stopse][fadeoutse]にてObjの扱いでエラーになる件 ([ed92d0b](https://github.com/famibee/SKYNovel/commit/ed92d0b82942f3fbaf0c9da338b76d21a29339d8))

- fix: [playse][stopse][fadeoutse]にてオブジェクトの扱いによりエラーになる場合に対応


# [1.27.0](https://github.com/famibee/SKYNovel/compare/v1.26.0...v1.27.0) (2022-01-11)


### Features

* [update_check]DLでアーキテクチャ（x32、x64など）別の対応が可能に ([b8e569f](https://github.com/famibee/SKYNovel/commit/b8e569febb418f69c58879cab036d370fa66a3f1))

- feat: [update_check]のアプリダウンロードでアーキテクチャ（ia32、x64など）別の対応が可能に
	- 拡張機能により生成された _index.json ファイルを使用
	- 旧版の .yml ファイルもしばらく対応する
- feat: アプリ実行時に OSや CPU アーキテクチャに対応するファイルが見つからない場合、同じOSのファイルをすべてダウンロードさせる
- fix: [update_check]でDLするか確認するダイアログを無効にしていたのを修正
- fix: [update_check]のダウンロードテクノロジーを[snapshot]と同じにし、保存ダイアログなしでダウンロードフォルダに保存するように


# [1.26.0](https://github.com/famibee/SKYNovel/compare/v1.25.10...v1.26.0) (2022-01-10)


### Features

* [tsy]にrender属性追加（半透明時に差分境界が見える件対応） ([0608345](https://github.com/famibee/SKYNovel/commit/060834572a621feafbf4df6c18b071041ca80ecd))

- feat: [tsy]にrender属性追加。trueを指定すると[trans]のように絵を合成してから不透明度を適用するように（半透明時に差分境界が見えなくなる）
- fix: nullではなくなるべくundefinedを使用するように（TypeScriptチームに倣い）


## [1.25.10](https://github.com/famibee/SKYNovel/compare/v1.25.9...v1.25.10) (2022-01-09)


### Bug Fixes

* 前更新で[trans]がちらつくようになったのを修正 ([75b83d6](https://github.com/famibee/SKYNovel/commit/75b83d68a474c674e7070a1e82668f63997a6e68))

- fix: 前更新で[trans]がちらつくようになったのを修正


## [1.25.9](https://github.com/famibee/SKYNovel/compare/v1.25.8...v1.25.9) (2022-01-09)


### Bug Fixes

* 動画やアニメスプライトを含まないレイヤのみのページの[trans]は処理を削減するように ([1e76a6f](https://github.com/famibee/SKYNovel/commit/1e76a6f900e3305abd292fcc4481323ee6978984))

- fix: 動画やアニメスプライトを含まないレイヤのみのページの[trans]は処理を削減するように


## [1.25.8](https://github.com/famibee/SKYNovel/compare/v1.25.7...v1.25.8) (2022-01-08)


### Bug Fixes

* 上げなおし：21年末時点版（ライブラリは更新） ([3f47a05](https://github.com/famibee/SKYNovel/commit/3f47a05fa9acd6121192b323950e647935ef56c6))

- fix: Windowsのみ：全画面から戻ると、一拍置いて極小画面サイズになる件
- fix: [fade]系にスキップ時処理を追記
- fix: 非パッケージだと versionが Electronの値になる件対応
- fix: const.sn.bookmark.json の値を実際のパスに置換しないように
- fix: [add_frame]での内部画像パス置換処理を修正
- fix: ライブラリ更新


## [1.25.7](https://github.com/famibee/SKYNovel/compare/v1.25.6...v1.25.7) (2021-12-28)


### Bug Fixes

* [update_check]アップデート機能が動作不良だったので、暫定修正 ([31e1f6d](https://github.com/famibee/SKYNovel/commit/31e1f6d9d16f12b657b3a7a317f712c3599a470f))

- fix: [update_check]アップデート機能が動作不良だったので、暫定修正


## [1.25.6](https://github.com/famibee/SKYNovel/compare/v1.25.5...v1.25.6) (2021-12-27)


### Bug Fixes

* [waitclick]にスキップや自動読み到達時は自動キャンセル。クリック二回必要になる ([af113cb](https://github.com/famibee/SKYNovel/commit/af113cb786b2523fcc312fab9b61477d3434258e))

- fix: [waitclick]にスキップや自動読み到達時は自動キャンセル。クリック二回必要になるので


## [1.25.5](https://github.com/famibee/SKYNovel/compare/v1.25.4...v1.25.5) (2021-12-26)


### Bug Fixes

* 自動読みとスキップ関係修正 ([155f660](https://github.com/famibee/SKYNovel/commit/155f6609068abf9234c8ce1fb2e59ebe8168dcb4))

- fix: [set_cancel_skip]でエラーになる場合がある件
- fix: 自動読みなどがクリックですぐに止まらない件
- fix: 自動読み中クリックでクリック待ち状態に移行するように
- fix: [ch]で属性waitを指定しないとスキップ時に文字表示がスキップされなかった件
- fix: [tsy_frame]で長押しスキップされない件
- fix: [waitclick]は吉里吉里仕様【スキップできない】記述から、スキップや自動読みさせないように


## [1.25.4](https://github.com/famibee/SKYNovel/compare/v1.25.3...v1.25.4) (2021-12-26)


### Bug Fixes

* ラベルジャンプ処理内で[let_ml][endlet_ml]ブロック以降の行番号が狂う件 ([92aff23](https://github.com/famibee/SKYNovel/commit/92aff2394630f4d3001b1c5db519b20410dffb0e))

- fix: ラベルジャンプ処理内で[let_ml][endlet_ml]ブロック以降の行番号が狂う件


## [1.25.3](https://github.com/famibee/SKYNovel/compare/v1.25.2...v1.25.3) (2021-12-25)


### Bug Fixes

* 本文冒頭でリジューム（load＆save）するとエラーになる件 ([1f3f978](https://github.com/famibee/SKYNovel/commit/1f3f978b81c85b97fc4988a21599a57cae6e4de3))

- fix: 本文冒頭でリジューム（load＆save）するとエラーになる件
- docs: [event]にcall属性記述が抜けていたのを修正


## [1.25.2](https://github.com/famibee/SKYNovel/compare/v1.25.1...v1.25.2) (2021-12-24)


### Bug Fixes

* 引数の省略時デフォルト値が空文字の場合、引数が渡されない件（a=%b|'' など） ([25f2a91](https://github.com/famibee/SKYNovel/commit/25f2a914d3c98e3a15014b3f0495b09fa6089d35))

- fix: 引数の省略時デフォルト値が空文字の場合、引数が渡されない件（a=%b|'' など）
- fix: 前回更新でややムダな処理があったのを改善
- fix: タグ名・resvTokenなど、内部使用属性名を同名属性指定により壊されない対策
- fix: AnalyzeTagArg テスト追記


## [1.25.1](https://github.com/famibee/SKYNovel/compare/v1.25.0...v1.25.1) (2021-12-24)


### Bug Fixes

* 右クリックから戻りでクリック待ちが左上へ移動する件 ([b68facc](https://github.com/famibee/SKYNovel/commit/b68facca6174769521c9d7bcc5c418526e28266c))

- fix: 右クリックから戻りでクリック待ちが左上へ移動する件


# [1.25.0](https://github.com/famibee/SKYNovel/compare/v1.24.2...v1.25.0) (2021-12-23)


### Features

* 文字レイヤ：クリック待ちマークの固定表示切替・表示位置を指定できる属性追加 ([0fbd99c](https://github.com/famibee/SKYNovel/commit/0fbd99cd902b595cf20e65db01c546fad0b3f91e))

- feat: 文字レイヤ：クリック待ちマークの固定表示切替・表示位置を指定できる属性追加
	- break_fixed、break_fixed_left、break_fixed_top
- fix: ルビ文字などが行末になった際に行幅が広がりすぎる件
- fix: クリック待ちマークは最後に表示した文字の次にぶら下がるように


## [1.24.2](https://github.com/famibee/SKYNovel/compare/v1.24.1...v1.24.2) (2021-12-22)


### Bug Fixes

* 行末ではないのに【〝】や【『】など行末禁則文字で改行してしまう件 ([da7b39e](https://github.com/famibee/SKYNovel/commit/da7b39e475e92ee42b54af2137ac42bd5364341d))

- fix: 行末ではないのに【〝】や【『】など行末禁則文字で改行してしまう件


## [1.24.1](https://github.com/famibee/SKYNovel/compare/v1.24.0...v1.24.1) (2021-12-19)


### Bug Fixes

* [tcy]（縦中横）を使うとフリーズする場合がある件 ([4419df4](https://github.com/famibee/SKYNovel/commit/4419df48599026460985ad5b5b27ee981fe26683))

- fix: [tcy]（縦中横）を使うとフリーズする場合がある件
- fix: [ch]で wait属性を指定しないと、他のstyle指定などが無効になる件


# [1.24.0](https://github.com/famibee/SKYNovel/compare/v1.23.2...v1.24.0) (2021-12-16)


### Features

* isNaN()演算子サポート ([33883dd](https://github.com/famibee/SKYNovel/commit/33883dd5241a0a2548649a2a1d13a1b464f241fd))

- feat: isNaN()演算子サポート
	- > https://www.ikkitang1211.site/entry/defer-null-undefined
	- > JavaScriptの仕様として、 toNumber(null) は 0 / toNumber(undefined) は NaN とするという取り決めがある
		- NaN が判定できると数値 undefined 判定の取りこぼししなくなる


## [1.23.2](https://github.com/famibee/SKYNovel/compare/v1.23.1...v1.23.2) (2021-12-13)


### Bug Fixes

* 通常文字表示待ち・既読文字表示待ちなどが0になる不具合（直前のデグレード） ([cdae513](https://github.com/famibee/SKYNovel/commit/cdae513f56342a63c0b1559b93206d605a9f2273))

- fix: 通常文字表示待ち・既読文字表示待ちなどが0になる不具合（1.23.0のデグレード）


## [1.23.1](https://github.com/famibee/SKYNovel/compare/v1.23.0...v1.23.1) (2021-12-12)


### Bug Fixes

* 文字レイヤサイズが[trans]などで正しくコピーされない件 ([925d84e](https://github.com/famibee/SKYNovel/commit/925d84efad4dcd13e826287fc8cd19a3eceea9c3))

- fix: 文字レイヤサイズが[trans]などで正しくコピーされない件
- docs: 文字レイヤ b_left、b_top、b_width、b_height 属性についての記述を削除
	- （SKYNovelには存在しない・高級な文字レイヤ背景は b_pic でやってもらう）


# [1.23.0](https://github.com/famibee/SKYNovel/compare/v1.22.3...v1.23.0) (2021-12-11)


### Features

* 文字レイヤのb_color属性などに色名前を使えるように ([f8f50b0](https://github.com/famibee/SKYNovel/commit/f8f50b0210b99aaf17cd0ca4db1879b6adcf8d32))

- feat: 文字レイヤのb_color属性などに色名前を使えるように
	- 文字レイヤのb_color属性
	- [snapshot]のb_color属性
	- doc/prj/prj.json の init.bg_color
- fix: 文字レイヤ背景色の b_colorで「#ffffff」形式の指定が出来なかったのを修正


## [1.22.3](https://github.com/famibee/SKYNovel/compare/v1.22.2...v1.22.3) (2021-12-09)


### Bug Fixes

* ツールチップ、画面全体の拡大縮小に対応 ([7311ebe](https://github.com/famibee/SKYNovel/commit/7311ebebb7f60f3a510912e3f147584b57f8ef80))

- fix: ツールチップ、画面全体の拡大縮小に対応


## [1.22.2](https://github.com/famibee/SKYNovel/compare/v1.22.1...v1.22.2) (2021-12-09)


### Bug Fixes

* 画像ボタンで、マウスホバー・クリック時の表示変化しない件 ([f30f11c](https://github.com/famibee/SKYNovel/commit/f30f11c3678730ae9e433384a2bf0a05e30e5dd6))

- fix: 画像ボタンで、マウスホバー・クリック時の表示変化しない件


## [1.22.1](https://github.com/famibee/SKYNovel/compare/v1.22.0...v1.22.1) (2021-12-09)


### Bug Fixes

* 画像ボタンで、イベント予約が画像ロード後まで遅延する件 ([e7f9f97](https://github.com/famibee/SKYNovel/commit/e7f9f97f113d967328282684df57d8159366c7aa))

- fix: 画像ボタンで、イベント予約が画像ロード後まで遅延する件
- fix: デバッグスイッチ debugLog=true 時にイベント待ちした際、予約済みイベント名をコンソールに表示するように


# [1.22.0](https://github.com/famibee/SKYNovel/compare/v1.21.0...v1.22.0) (2021-12-08)


### Features

* hintをHTML canvas要素で表示するように ([7f840bf](https://github.com/famibee/SKYNovel/commit/7f840bfc95566623f5f794f951f6ec29905577ee))

- feat: hintをHTML canvas要素で表示するように
- feat: hint_color属性でhint文字色を指定可能に（'white', '#FF0000'）
- feat: hint_font属性追加、hint文字サイズとフォントを指定する
- fix: hint_tate属性が無効になっていたのを再サポート
- fix: hint_tate属性省略時は、文字レイヤの縦書き指定（writing-mode: vertical-rl なら true）をデフォルトとする事を明記
- fix: 前更新から hint消ししてなかった件


# [1.21.0](https://github.com/famibee/SKYNovel/compare/v1.20.1...v1.21.0) (2021-12-04)


### Features

* [button][link]に hintの幅を指定できる hint_width 属性追加 ([38e14f5](https://github.com/famibee/SKYNovel/commit/38e14f52de5b113cbce5d5c96b864f3e880260de))

- feat: [button][link]に hintの幅を指定できる hint_width 属性追加
- fix: 背景あり文字ボタンのhintが右にずれる件
- fix: 縦書き時にhintが表示されない件
- fix: 背景あり文字ボタンの[dump_lay]でエラーになる件
- fix: ライブラリ更新


## [1.20.1](https://github.com/famibee/SKYNovel/compare/v1.20.0...v1.20.1) (2021-11-08)


### Bug Fixes

* 画像レイヤのデザインキャストがずれて表示されるのを修正 ([4c2013e](https://github.com/famibee/SKYNovel/commit/4c2013e2b5d11f38346e6328ccd9462446d68b91))

- fix: 画像レイヤのデザインキャストがずれて表示されるのを修正


# [1.20.0](https://github.com/famibee/SKYNovel/compare/v1.19.6...v1.20.0) (2021-11-07)


### Features

* [frame]に float、index、dive属性を追加 ([6c9b068](https://github.com/famibee/SKYNovel/commit/6c9b068b690c862273230a00be5bce69f1330ecd))

- feat: [frame]に float、index、dive属性を追加
- fix: ライブラリ更新


## [1.19.6](https://github.com/famibee/SKYNovel/compare/v1.19.5...v1.19.6) (2021-10-29)


### Bug Fixes

* ライブラリ更新 ([5865bd5](https://github.com/famibee/SKYNovel/commit/5865bd548652edb50b58616b7097f72f442745c8))

- fix: ライブラリ更新


## [1.19.5](https://github.com/famibee/SKYNovel/compare/v1.19.4...v1.19.5) (2021-10-17)


### Bug Fixes

* タグ[page]移動時、ページが変わらない場合はなにもしないように ([462db60](https://github.com/famibee/SKYNovel/commit/462db6048d2b3c08cda77f599bfa399ff08fd7d9))

- fix: タグ[page]移動時、ページが変わらない場合はなにもしないように


## [1.19.4](https://github.com/famibee/SKYNovel/compare/v1.19.3...v1.19.4) (2021-10-16)


### Bug Fixes

* 音声ファイルにキャッシュが利いてなかった件 ([19237ff](https://github.com/famibee/SKYNovel/commit/19237ff0395122e0dd6b98b7697aa84bb7a206b5))

- fix: 音声ファイルにキャッシュが利いてなかった件
- fix: ループしない音声をキャッシュするように
- fix: [p]停止からの復帰で音声キャッシュをクリアするように


## [1.19.3](https://github.com/famibee/SKYNovel/compare/v1.19.2...v1.19.3) (2021-10-16)


### Bug Fixes

* ライブラリ更新 ([5ac1ade](https://github.com/famibee/SKYNovel/commit/5ac1adec75bac57e5c799c4d226078999adb85da))

- fix: ライブラリ更新


## [1.19.2](https://github.com/famibee/SKYNovel/compare/v1.19.1...v1.19.2) (2021-10-11)


### Bug Fixes

* 画像レイヤの width, height の値異常を修正 ([6864c54](https://github.com/famibee/SKYNovel/commit/6864c54079b2a320ff06eb7cbe39db7b21d96442))

- fix: 画像レイヤの const.sn.lay[lay].fore.width, height の値異常を修正


## [1.19.1](https://github.com/famibee/SKYNovel/compare/v1.19.0...v1.19.1) (2021-10-11)


### Bug Fixes

* タグ[page]移動時、[tsy]処理を止めるように ([89b26d8](https://github.com/famibee/SKYNovel/commit/89b26d8e8c3c04edc823fed006ec170b84e7452c))

- fix: タグ[page]移動時、[tsy]処理を止めるように
- fix: [wait][wv][wait_tsy][wf][ws]では[page]用の停止位置を記録しないように
- fix: アプリ版、ウインドウを少し移動すると不具合
	- Mac: アプリがフリーズ
	- Win: ウインドウが最小サイズ化（最小化ではなく）
- docs: 【タグリファレンス】追加・[page]ページ移動
- ~~memo: 既知の問題~~：
	- ~~連打時にBGMが残り多重化してしまう件~~
		- fix: タグ[page]移動連打時でも、BGMや効果音を確実に止めるように


# [1.19.0](https://github.com/famibee/SKYNovel/compare/v1.18.11...v1.19.0) (2021-10-09)


### Features

* タグ[page]追加。本やWeb漫画のように、既読ページを前後移動できる機能 ([ab6c328](https://github.com/famibee/SKYNovel/commit/ab6c3281f6a5ac1913a7dd5490d3d3740bf72963))

- feat: タグ[page]追加。本やWeb漫画のように、既読ページを前後移動できる機能
	- （レイヤの fore/back ページ と、ページ移動の [page] の言葉で混乱しないよう注意）
	- [p][s]など（[l][waitclick]は対象外）停止位置を記録し、前後できる
	- ここでの【ページ】とは、【スクリプト先頭から一つめの[p]まで】、
		【[p]の次トークン（文字やタグなど）から次の[p]まで】、を指す。
	- &save:sn.doRecLog = true 状態でのみ停止位置を記録する。
	- save変数も復元する。
		- 前述二項の理由により、冒頭ページに &save:sn.doRecLog = true と [record_place]が必須。
		- （save変数復元で &save:sn.doRecLog = false になるケースがある）


## [1.18.11](https://github.com/famibee/SKYNovel/compare/v1.18.10...v1.18.11) (2021-10-08)


### Bug Fixes

* [if]ブロック内で行番号が狂う件 ([35e182f](https://github.com/famibee/SKYNovel/commit/35e182f6aa0e813aed8278ee68f78e2e46922638))

- fix: [if]ブロック内で行番号が狂う件
- fix: [if]ブロック内で複数行タグを使用した際、中の行番号が狂う件
- fix: save:const.sn.sLog の初期値を '[]' に
- memo: 作成中
	- feat: タグ[page]追加。本やWeb漫画のように手軽に前にも戻れる機能
		- [p][s]など（[l][waitclick]は対象外）停止位置を記録し、前後できる
		- ここでの【ページ】とは、スクリプト先頭から一つめの[p]まで、
		- [p]の次トークン（文字やタグなど）から次の[p]まで、を指す。


## [1.18.10](https://github.com/famibee/SKYNovel/compare/v1.18.9...v1.18.10) (2021-10-03)


### Bug Fixes

* ギャラリーのコンパイルでエラーになるのを修正 ([44d5180](https://github.com/famibee/SKYNovel/commit/44d5180fea7ab32dd4d3091e397eeddbfb0ddbd8))

- fix: ギャラリーのコンパイルでエラーになるのを修正


## [1.18.9](https://github.com/famibee/SKYNovel/compare/v1.18.8...v1.18.9) (2021-10-02)


### Bug Fixes

* Safariで動かなかった件（正規表現・肯定後読み使用による） ([88c427f](https://github.com/famibee/SKYNovel/commit/88c427f3bebb4134ba19fae64268808b188fc19c))

- fix: Safariで動かなかった件（正規表現・肯定後読み使用による）
- fix: # のプライベートクラスフィールドを積極使用


## [1.18.8](https://github.com/famibee/SKYNovel/compare/v1.18.7...v1.18.8) (2021-09-30)


### Bug Fixes

* 文字列にエスケープシーケンス文法導入 ([12d2d98](https://github.com/famibee/SKYNovel/commit/12d2d9812322a4142bf743f34e0683686760a99c))

- add: 文字列にエスケープシーケンス文法導入
	- クォーテーション（"や'）、ハッシュマーク（#）内にその文字を入れられる
- docs: 【開発者情報】更新、エスケープシーケンスについて追記
- docs: 【開発者情報】開発環境ビュー、テンプレウイザード、設定画面のスナップショット修正


## [1.18.7](https://github.com/famibee/SKYNovel/compare/v1.18.6...v1.18.7) (2021-09-22)


### Bug Fixes

* ライブラリ更新 ([f25f83f](https://github.com/famibee/SKYNovel/commit/f25f83fb6b8e2694007344c8c458f164a8daee83))

- fix: ライブラリ更新


## [1.18.6](https://github.com/famibee/SKYNovel/compare/v1.18.5...v1.18.6) (2021-09-21)


### Bug Fixes

* Webデバッグ：Fetch API に corsを設定（デバッグモードが起動しない件対応） ([4ce8b6a](https://github.com/famibee/SKYNovel/commit/4ce8b6a3fa89a9d064ba74f9ef7a8efcccbf109e))

- fix: Webデバッグ：Fetch API に cors を設定（デバッグモードが起動しない件対応）


## [1.18.5](https://github.com/famibee/SKYNovel/compare/v1.18.4...v1.18.5) (2021-09-20)


### Bug Fixes

* 暗号化サウンド再生エラーを修正 ([95d06e1](https://github.com/famibee/SKYNovel/commit/95d06e1759f4b1eb7429323b9e4d9277c3c7a53a))

- fix: 暗号化サウンド再生エラーを修正


## [1.18.4](https://github.com/famibee/SKYNovel/compare/v1.18.3...v1.18.4) (2021-09-18)


### Bug Fixes

* 本文からタイトルに戻るとBGMが消える件 ([e7f543c](https://github.com/famibee/SKYNovel/commit/e7f543cc411c99c8261bd22a727ed249d019d786))

- fix: 本文からタイトルに戻るとBGMが消える件
- fix: [xchgbuf]で save: 変数も交換するように
- fix: 不要な save:const.sn.loopPlaying ロードを削除
- docs: 【開発者情報】音量周りの記述修正


## [1.18.3](https://github.com/famibee/SKYNovel/compare/v1.18.2...v1.18.3) (2021-09-16)


### Bug Fixes

* Winアプリでウインドウサイズが最小になる件 ([a4acec3](https://github.com/famibee/SKYNovel/commit/a4acec3b57f82ba0088a9c8225bad0eb2f8f945f))

- fix: Winアプリでウインドウサイズが最小になる件
- fix: アプリで画面保存は Electron の機能を使用するように


## [1.18.2](https://github.com/famibee/SKYNovel/compare/v1.18.1...v1.18.2) (2021-09-15)


### Bug Fixes

* Electron 14 に更新、アプリ版対応 ([704c1d6](https://github.com/famibee/SKYNovel/commit/704c1d6f29da14b48caeb1ae2e73170272b05409))

- fix: Electron 14 に更新、アプリ版対応


## [1.18.1](https://github.com/famibee/SKYNovel/compare/v1.18.0...v1.18.1) (2021-09-14)


### Bug Fixes

* tsconfig.json 更新 es2021、replaceAll()の使用 ([4831aee](https://github.com/famibee/SKYNovel/commit/4831aeee9495050fc31d6ebd4b2e3865c4d1a3a0))

- fix: tsconfig.json 更新　target, lib を es2021 に（Node.js は 16.9.0 以上必須）
	- replaceAll()の使用


# [1.18.0](https://github.com/famibee/SKYNovel/compare/v1.17.11...v1.18.0) (2021-09-12)


### Features

* 復号化処理を重点見直し ([ff8c0c4](https://github.com/famibee/SKYNovel/commit/ff8c0c43d85e5f8cda17cbbec60b50b986b47d35))

- feat: BREAKING CHANGE: 復号化処理、SKYNovel 側でオブジェクト生成するように
- fix: BREAKING CHANGE: プラグインインタフェイス変更
	- 拡張機能 v3.14.0 以上に更新し、暗号化しない→する切り替えするだけでよい
	- fix: プラグイン init()は Promise式に
	- fix: 暗号化関係の async setPre を setDec に
- fix: コールバック記述を async/await 型にリファクタリング
- fix: 復号化処理を重点見直し、タイトル画面が見えない・BGMが短くループするなど解消
- fix: ライブラリ更新


## [1.17.11](https://github.com/famibee/SKYNovel/compare/v1.17.10...v1.17.11) (2021-08-19)


### Bug Fixes

* ライブラリ更新（webpack-dev-server 4.0.0 対応） ([af50850](https://github.com/famibee/SKYNovel/commit/af50850c875b9e608e493638e6fbcc372a4e8726))

- fix: ライブラリ更新（webpack-dev-server 4.0.0 対応）
- docs: 拡張機能に新規追加された【テンプレートから始める】を反映


## [1.17.10](https://github.com/famibee/SKYNovel/compare/v1.17.9...v1.17.10) (2021-08-15)


### Bug Fixes

* 開発環境の準備マニュアルを更新 ([c38b16f](https://github.com/famibee/SKYNovel/commit/c38b16f7e2ab6a78e48911586d85ec8827304fe3))

- fix: 開発環境の準備マニュアルを更新
- fix: ライブラリ更新


## [1.17.9](https://github.com/famibee/SKYNovel/compare/v1.17.8...v1.17.9) (2021-08-12)


### Bug Fixes

* tsconfig.json をルートへ移動、テストコードが影響を受けるのでその対応 ([d6f1793](https://github.com/famibee/SKYNovel/commit/d6f1793ba71958fc26adb80b39d77f8c6c336ea6))

- fix: tsconfig.json をルートへ移動、テストコードが影響を受けるのでその対応
- fix: ライブラリ更新


## [1.17.8](https://github.com/famibee/SKYNovel/compare/v1.17.7...v1.17.8) (2021-08-10)


### Bug Fixes

* ライブラリ更新（pixi.js 6.1.0以降対応） ([e8f389c](https://github.com/famibee/SKYNovel/commit/e8f389ceea5dcfc44e1334261be69274997ae5ea))

- fix: ライブラリ更新
- fix: pixi.js 6.1.0以降対応で、core/tsconfig.json に必須スイッチを追加
	- 【"esModuleInterop": true】
	- 【"allowSyntheticDefaultImports": true】
	- https://github.com/pixijs/pixijs/issues/7685#issuecomment-895676265
- fix: tsconfig.json 戻し　es2021 →【"target": "es2020",】
- fix: Loader.use(fn: (res, next: ()=> {} | undefined))につき警告、next()をnext?.()に書き換え


## [1.17.7](https://github.com/famibee/SKYNovel/compare/v1.17.6...v1.17.7) (2021-08-01)


### Bug Fixes

* ライブラリ更新 ([cda8e1e](https://github.com/famibee/SKYNovel/commit/cda8e1e7ed1937d31cbeb6e78519f5afdfa788cb))

- fix: ライブラリ更新
- fix: tsconfig.json 更新　es2020 →【"target": "es2021",】


## [1.17.6](https://github.com/famibee/SKYNovel/compare/v1.17.5...v1.17.6) (2021-06-29)


### Bug Fixes

* ライブラリ更新 ([33c7ef5](https://github.com/famibee/SKYNovel/commit/33c7ef53343b5a5a92dbf9534cf5549a89b05b22))

- fix: ライブラリ更新


## [1.17.5](https://github.com/famibee/SKYNovel/compare/v1.17.4...v1.17.5) (2021-06-20)


### Bug Fixes

* ライブラリ更新 ([ce87241](https://github.com/famibee/SKYNovel/commit/ce87241564cdb2c0bd9fa8138d0bd83dc9470774))

- fix: ライブラリ更新


## [1.17.4](https://github.com/famibee/SKYNovel/compare/v1.17.3...v1.17.4) (2021-06-12)


### Bug Fixes

* Github Action【Run npm test】でErrorになる対策 ([4bbab6c](https://github.com/famibee/SKYNovel/commit/4bbab6c8300dffbc668a4d00ef087a785dfc293f))
* ギャラリーでビルドエラーになる対策 ([b673ecc](https://github.com/famibee/SKYNovel/commit/b673eccbedcb8793d36b46f28fa784b6d694f1ab))

- fix: ギャラリーでビルドエラーになる対策
- fix: ライブラリ更新
- fix: Github Action【Run npm test】で「Error: Not supported」になるので mocha 8.4.0 に戻す


## [1.17.3](https://github.com/famibee/SKYNovel/compare/v1.17.2...v1.17.3) (2021-06-08)


### Bug Fixes

* overrideキーワード追加 ([1b8f7fb](https://github.com/famibee/SKYNovel/commit/1b8f7fb13a0372970cf62641c987c8fc0ebfbb84))

- fix: overrideキーワード追加


## [1.17.2](https://github.com/famibee/SKYNovel/compare/v1.17.1...v1.17.2) (2021-05-29)


### Bug Fixes

* ライブラリ更新 ([7f15277](https://github.com/famibee/SKYNovel/commit/7f15277f63711330fcb9e4d816fb7a4d1b5d0b90))

- fix: ライブラリ更新
- fix: HArgにギャラリーの3Dレイヤで使用する属性【camera_target?	: string;】を追加


## [1.17.1](https://github.com/famibee/SKYNovel/compare/v1.17.0...v1.17.1) (2021-05-25)


### Bug Fixes

* ライブラリ更新 ([5ca1ee8](https://github.com/famibee/SKYNovel/commit/5ca1ee842c966df5841b8e50f2f3f50686468822))

- fix: ライブラリ更新


# [1.17.0](https://github.com/famibee/SKYNovel/compare/v1.16.10...v1.17.0) (2021-05-18)


### Features

* BREAKING CHANGE: pixi.js 6、webpack 5 に更新 ([124eae4](https://github.com/famibee/SKYNovel/commit/124eae49c4a8f58fa8006cb18d213d44687040db))

feat: BREAKING CHANGE: pixi.js 6、webpack 5 に更新


## [1.16.10](https://github.com/famibee/SKYNovel/compare/v1.16.9...v1.16.10) (2021-05-18)


### Performance Improvements

* BREAKING CHANGE: pixi.js 6、webpack 5 に更新 ([6f0ecfd](https://github.com/famibee/SKYNovel/commit/6f0ecfd037fc62d6dc1518cc4dc8fa3b0f834f8e))

- BREAKING CHANGE: pixi.js 6、webpack 5 に更新（テンプレも更新必須）
- fix: デバッグ：暗号化時、一時停止で暗号化スクリプトを見に行く件（ファイル名暗号化で発現したらしい）
- memo: 【後に解消】~~既知の問題~~：
	- 暗号化時、BGMが短くループするようになってる？　効果音は正常っぽい。
	- 暗号化時、画像が出ない


## [1.16.9](https://github.com/famibee/SKYNovel/compare/v1.16.8...v1.16.9) (2021-05-18)


### Bug Fixes

* ライブラリ更新 ([3055eb5](https://github.com/famibee/SKYNovel/commit/3055eb5f91f004eb9264df98d87993190d85af61))

- fix: ライブラリ更新


## [1.16.8](https://github.com/famibee/SKYNovel/compare/v1.16.7...v1.16.8) (2021-05-17)


### Bug Fixes

* ライブラリ更新 ([16f03cc](https://github.com/famibee/SKYNovel/commit/16f03cc2ca667d915cc7c6fa8a26df67e8e3903e))
* ライブラリ更新2 ([f8ad459](https://github.com/famibee/SKYNovel/commit/f8ad4599a84ad5c989349184ebdbc4abc8b6f298))


### Performance Improvements

* pixi.js 6、webpack 5 に更新（テンプレ更新必須） ([0b5090e](https://github.com/famibee/SKYNovel/commit/0b5090ed702715f9079bd850bd6ef700be766eff))

- fix: ライブラリ更新2
- fix: ライブラリ更新

## [1.16.7](https://github.com/famibee/SKYNovel/compare/v1.16.6...v1.16.7) (2021-04-15)


### Bug Fixes

* デバッグ：パディングキャスト変更時にクリック待ち表示が追従してなかった件 ([af1598b](https://github.com/famibee/SKYNovel/commit/af1598b4fe6d7b340c8145a2148362d62ae6085e))

- fix: デバッグ：パディングキャスト変更時にクリック待ち表示が追従してなかった件
- fix: デバッグ：デザイン不変更のタグはデザイン定義先としないように


## [1.16.6](https://github.com/famibee/SKYNovel/compare/v1.16.5...v1.16.6) (2021-04-11)


### Bug Fixes

* 複数行タグで「|」を使う引数をコメントしてもできない件 ([4bcd4e7](https://github.com/famibee/SKYNovel/commit/4bcd4e7695477b4afbf55b933c42c1ef0a12e855))

- fix: 複数行タグで「|」を使う引数をコメントしてもできない件


## [1.16.5](https://github.com/famibee/SKYNovel/compare/v1.16.4...v1.16.5) (2021-04-10)


### Bug Fixes

* ライブラリ更新 ([7ef69b5](https://github.com/famibee/SKYNovel/commit/7ef69b56e7426dfef34a6e427e3bfa45a429ad74))

- fix: ライブラリ更新


## [1.16.4](https://github.com/famibee/SKYNovel/compare/v1.16.3...v1.16.4) (2021-04-03)


### Bug Fixes

* ブレークポイントが効かなくなっていた件 ([0fa25c9](https://github.com/famibee/SKYNovel/commit/0fa25c951b17681d51759c573d45639eadb6826e))

- fix: ブレークポイントが効かなくなっていた件
- fix: ブレーク時、タイトルに条件ブレークかヒットカウントブレークか明示するように


## [1.16.3](https://github.com/famibee/SKYNovel/compare/v1.16.2...v1.16.3) (2021-03-27)


### Bug Fixes

* （ギャラリーでは見えてるが）クリック待ち表示が見えない件 ([e5fb90b](https://github.com/famibee/SKYNovel/commit/e5fb90b481fb5915e560f710a003e2b37af5078a))

- fix: （ギャラリーでは見えてるが）クリック待ち表示が見えない件
- fix: new 系の記述の()を削除


## [1.16.2](https://github.com/famibee/SKYNovel/compare/v1.16.1...v1.16.2) (2021-03-26)


### Bug Fixes

* コールスタックの列表示が1少なかったのを修正 ([33ef5e4](https://github.com/famibee/SKYNovel/commit/33ef5e42b0b97ef5d79a5004ce6e725f11b6c53a))

- fix: コールスタックの列表示が1少なかったのを修正


## [1.16.1](https://github.com/famibee/SKYNovel/compare/v1.16.0...v1.16.1) (2021-03-23)


### Bug Fixes

* デバッグ：パディングキャストが表示されない件 ([0f120f2](https://github.com/famibee/SKYNovel/commit/0f120f296661c12fa099b16e0663e9308340ee55))

- fix: デバッグ：パディングキャストが表示されない件
- fix: デバッグ：クリックだけでスクリプト変更する件


# [1.16.0](https://github.com/famibee/SKYNovel/compare/v1.15.11...v1.16.0) (2021-03-23)


### Features

* **デバッグ:** [macro]にstepin属性追加。false指定でステップインしない ([f639080](https://github.com/famibee/SKYNovel/commit/f639080dc87bedcfe4f7c27f4c508ea1a8fc9718))

- feat(デバッグ): [macro]にstepin属性追加。false指定でステップインしない
- feat: mp:const.sn.macro.stepin追加、そのマクロ定義のstepin属性値を返す。省略時true
- feat: 非公開変数 mp:const.sn.macro追加、[macro]属性のJSON文字列
- feat: 非公開変数 mp:const.sn.macro_name をconst.sn.macro.nameに変名
- feat: 非公開変数 mp:const.sn.macro をスタック情報に含めデバッグに渡すように


## [1.15.11](https://github.com/famibee/SKYNovel/compare/v1.15.10...v1.15.11) (2021-03-22)


### Bug Fixes

* **DesignCast.ts:** 軽微な修正 ([6d0ebc2](https://github.com/famibee/SKYNovel/commit/6d0ebc220fd3f2ae035fbb0e9dc8978e153f8894))

- fix(DesignCast.ts): 軽微な修正
- fix: pixi.js@6.0.0準備2


## [1.15.10](https://github.com/famibee/SKYNovel/compare/v1.15.9...v1.15.10) (2021-03-19)


### Bug Fixes

* pixi.js@6.0.0準備 ([41605b4](https://github.com/famibee/SKYNovel/commit/41605b4b3879738f80f741d14ac38971f3aa008d))

- fix: pixi.js@6.0.0準備


## [1.15.9](https://github.com/famibee/SKYNovel/compare/v1.15.8...v1.15.9) (2021-03-16)


### Bug Fixes

* 細微な修正 ([5353a4a](https://github.com/famibee/SKYNovel/commit/5353a4a9cc5f539c69b6397da00c141e8a43130d))

- fix: ライブラリ更新
- fix: 細微な修正


## [1.15.8](https://github.com/famibee/SKYNovel/compare/v1.15.7...v1.15.8) (2021-03-10)


### Bug Fixes

* デバッグ：レイヤ構造で選択されてないとリアルタイムプレビュー的動作をしない件 ([76ed4b6](https://github.com/famibee/SKYNovel/commit/76ed4b66297ec64cb1ce138c2de7704c6068d576))

- fix: デバッグ：レイヤ構造で選択されてないとリアルタイムプレビュー的動作をしない件


## [1.15.7](https://github.com/famibee/SKYNovel/compare/v1.15.6...v1.15.7) (2021-03-06)


### Bug Fixes

* Incomplete string escaping or encoding ([a63ad3e](https://github.com/famibee/SKYNovel/commit/a63ad3e92179ec081df7ef7a68af2a0a3841e103))

- fix: Incomplete string escaping or encoding


## [1.15.6](https://github.com/famibee/SKYNovel/compare/v1.15.5...v1.15.6) (2021-03-06)


### Bug Fixes

* 正規表現最適化2（AnalyzeTagArg・REG_TAGARG） ([de80abb](https://github.com/famibee/SKYNovel/commit/de80abb6d14b7c6a4dedcc888d440d8623fb3ac2))

- fix: 正規表現最適化2（AnalyzeTagArg・REG_TAGARG）


## [1.15.5](https://github.com/famibee/SKYNovel/compare/v1.15.4...v1.15.5) (2021-03-06)


### Bug Fixes

* 正規表現最適化（AnalyzeTagArg・REG_TAGARG） ([cf1199e](https://github.com/famibee/SKYNovel/commit/cf1199ee266242200fff97b481d0656aafed99a4))

- fix: 正規表現最適化（AnalyzeTagArg・REG_TAGARG）


## [1.15.4](https://github.com/famibee/SKYNovel/compare/v1.15.3...v1.15.4) (2021-03-06)


### Bug Fixes

* 正規表現最適化 ([67385a0](https://github.com/famibee/SKYNovel/commit/67385a0a659e4c0adbda3a8722a98cdf45a43d13))

- fix: 正規表現最適化（Grammar・REG_TAG）


## [1.15.3](https://github.com/famibee/SKYNovel/compare/v1.15.2...v1.15.3) (2021-03-04)


### Bug Fixes

* electron v12.0.0対応（contextIsolation: false） ([7227319](https://github.com/famibee/SKYNovel/commit/7227319e1fa98947a659f12dba166f93f70f35f3))

- fix: electron v12.0.0対応（contextIsolation: false）
- fix: ライブラリ更新、electron更新（11.3.0→12.0.0）など
- fix: アプリ版でエラー。非デバッグ時にDesignCastの処理（レイヤのcvsResize系）が走ってた件
- fix: 内部的にsys.isDbg()ではなくCmnLib.isDbgへ変更


## [1.15.2](https://github.com/famibee/SKYNovel/compare/v1.15.1...v1.15.2) (2021-03-03)


### Bug Fixes

* デバッグ：キャスト操作時のヒント表示が画面外にはみ出ないように ([9e16a2b](https://github.com/famibee/SKYNovel/commit/9e16a2bb7135f122e40e606ad5283085f865399e))

- fix: デバッグ：キャスト操作時のヒント表示が画面外にはみ出ないように
- fix: デバッグ：パディングは回転できないように
- fix: デバッグ：パディングのヒント表示は独自のモノに
- fix: デバッグ：パディング左上移動UNDOが効かない件
- fix: デバッグ：パディングドラッグ時に親の文字レイヤまで動く件


## [1.15.1](https://github.com/famibee/SKYNovel/compare/v1.15.0...v1.15.1) (2021-02-27)


### Bug Fixes

* デバッグ：キャスト移動などで現在位置をヒント表示 ([cbd5a11](https://github.com/famibee/SKYNovel/commit/cbd5a11c443dfde668b49c97086dc7a5ab3d8df4))

- fix: デバッグ：キャスト移動などで現在位置をヒント表示
- fix: デバッグ：スクリプトからのreplaceToken()で回転が反映されない件
- fix: デバッグ：その他不具合修正


# [1.15.0](https://github.com/famibee/SKYNovel/compare/v1.14.0...v1.15.0) (2021-02-26)


### Features

* デバッグ：キャストで回転・移動・回転中心も操作できるように ([d79eb8c](https://github.com/famibee/SKYNovel/commit/d79eb8cd00515904da21ccf8b81e9c02371d9fd9))

- feat: デバッグ：キャストで回転も操作できるように
- feat: デバッグ：キャストで移動・回転中心も操作できるように
- feat: デバッグ：ボタンキャスト移動で他ボタンXYに近い場合はガイドラインを表示するように
- fix: [button][lay][tsy]タグリファレンスにpivot_x・pivot_y属性の説明を追記
- fix: [tsy backlay=true]終了時にpivot_x・pivot_y属性もコピーするように
- fix: デバッグ：状態変更トーストが画面拡大縮小状態で中心からずれる件
- fix: デバッグ：ダブルクリックで定義先へジャンプするように
- fix: デバッグ：プロジェクトに無いファイルドロップもとりあえず拡張機能へ通知するように
- fix: デバッグ：addPathリクエストで内部パス辞書に追加するように


# [1.14.0](https://github.com/famibee/SKYNovel/compare/v1.13.0...v1.14.0) (2021-02-21)


### Features

* デバッグ：キャストのGUIライブラリをdaybrush/moveableに変更 ([fae398b](https://github.com/famibee/SKYNovel/commit/fae398bfd903c8458cc28b8d7abdc2d68aecf49e))

- feat: デバッグ：キャストのGUIライブラリをdaybrush/moveableに変更
- fix: デバッグ：キャストを画面拡大縮小に対応


# [1.13.0](https://github.com/famibee/SKYNovel/compare/v1.12.1...v1.13.0) (2021-02-17)


### Features

* デバッグ：画像レイヤ・ボタンのキャストに画像ファイルをdropすると差し替えるように ([63ffe80](https://github.com/famibee/SKYNovel/commit/63ffe803e7dd9eac12616623c0a019b15a830af1))

- feat: デバッグ：画像レイヤ・文字ボタン・画像ボタンのキャストに画像ファイルをdropすると差し替えるように
- fix: カーソル・masumeが表示されなくなっていた件（v1.10.0 から）
- fix: 文字ボタンに背景画像をロードした際、文字サイズが拡大される件（v1.10.0 から）


## [1.12.1](https://github.com/famibee/SKYNovel/compare/v1.12.0...v1.12.1) (2021-02-16)


### Bug Fixes

* デバッグ用 openDevTools()が残っていたのを修正 ([3415837](https://github.com/famibee/SKYNovel/commit/34158373de7aab04ea91af534bc058d1d5ff243d))

- fix: デバッグ用 openDevTools()が残っていたのを修正


# [1.12.0](https://github.com/famibee/SKYNovel/compare/v1.11.0...v1.12.0) (2021-02-16)


### Features

* Electronウインドウ作成等をinitRenderer() にラップするように ([71525d0](https://github.com/famibee/SKYNovel/commit/71525d0ed8193709d6d6d380ad416c05b46b5163))

- feat: アプリ版：Electronウインドウ作成などを新設 SKYNovel.initRenderer() にラップするように（テンプレ更新：doc/app.js）
- fix: （まだ準備中）webpack 5 へ更新・対応
- fix: （まだ準備中）アプリ版：新セキュリティ機構 contextBridge / preload.js を使うように
- fix: SysNodeテスト：小さな派生クラスを作ってテスト対象とするように
- fix: 初回の初期化と、v1.11.0 まで未初期化変数があった件の対策


# [1.11.0](https://github.com/famibee/SKYNovel/compare/v1.10.1...v1.11.0) (2021-02-12)


### Features

* デバッグ：画像レイヤもドラッグ移動・サイズ変更できるように ([efbf13f](https://github.com/famibee/SKYNovel/commit/efbf13fdb556ce568e68a887f9051622500223b2))

- feat: デバッグ：画像レイヤもドラッグ移動・サイズ変更できるように
- fix: hintの文字が縦に大きい件


## [1.10.1](https://github.com/famibee/SKYNovel/compare/v1.10.0...v1.10.1) (2021-02-12)


### Bug Fixes

* [call]でマクロ変数をクリアしていたのを修正 ([500976f](https://github.com/famibee/SKYNovel/commit/500976fca87d955c93c2bf694f5b8dcdc3e785e2))

- fix: [call]でマクロ変数をクリアしていたのを修正
- fix: [pop_stack]でマクロ変数をクリアするように
- fix: 画像レイヤ[lay]でwidth・height指定時は、ロード画像サイズによらずそのサイズとするように
- fix: ライブラリ更新（electron-store 6.0.1→7.0.2）
	- テンプレの npm i -S electron-store と doc/app.js 追記必須


# [1.10.0](https://github.com/famibee/SKYNovel/compare/v1.9.1...v1.10.0) (2021-02-11)


### Features

* 文字パディングもドラッグ移動・サイズ変更できるように ([def8921](https://github.com/famibee/SKYNovel/commit/def8921783a26d32fb924c82100674c27d5773af))

- feat: デバッグ：文字パディングもドラッグ移動・サイズ変更できるように
- feat: 文字レイヤの[lay]にpl・pr・pt・pb属性追加、style設定（paddingLeftなど）に上書きできる
- feat: デバッグ：マクロ定義[macro]に属性 design_unit=true を追加すると、そのマクロへの引数変更とする（マクロの内部をサーチさせない）
- fix: Promise.allSettled()がエラーになるので tsconfig.json に lib: ["es2020"] 追加
- fix: SysApp.ts・SysNode.ts でライブラリ import を await import() 化
- fix: ライブラリ更新
- fix: webpack 5 準備（import()化など）
- fix: リファクタリング


## [1.9.1](https://github.com/famibee/SKYNovel/compare/v1.9.0...v1.9.1) (2021-02-02)


### Bug Fixes

* 非デバッグで、ボタンのツールチップス表示時に内部エラーになる件 ([e86f1a2](https://github.com/famibee/SKYNovel/commit/e86f1a2b7747796d8ee577d2daf4ad67d1d7ed4c))

- fix: 非デバッグで、ボタンのツールチップス表示時に内部エラーになる件


# [1.9.0](https://github.com/famibee/SKYNovel/compare/v1.8.2...v1.9.0) (2021-02-02)


### Features

* デバッグビューにレイヤ構造ビューを追加 ([f0fcee1](https://github.com/famibee/SKYNovel/commit/f0fcee10fc88d7420f91edc16cc86aa87e5f3d36))

- feat: デバッグビューにレイヤ構造ビューを追加
- feat: デバッグ：文字レイヤもドラッグ移動・サイズ変更できるように
- feat: デバッグ：ボタン長押しでスクリプトの該当箇所を開く
- feat: 文字レイヤの[lay]にwidth・height属性追加、style設定に上書きできるように
- fix: const.sn.lay.（レイヤ名）.（foreかback）.width、同.height の値が 1 なのを修正
- fix: デバッグ：ボタンは半透明オレンジに変更


## [1.8.2](https://github.com/famibee/SKYNovel/compare/v1.8.1...v1.8.2) (2021-01-30)


### Bug Fixes

* 青四角移動・変更後、実ボタンも変更するように ([8032d65](https://github.com/famibee/SKYNovel/commit/8032d654bd5d99fee913b862b48f430e81d04dc5))

- fix: 青四角移動・変更後、実ボタンも変更するように
- fix: 青四角の位置・サイズを変更した際、トークンが長くなる場合に止まる件


## [1.8.1](https://github.com/famibee/SKYNovel/compare/v1.8.0...v1.8.1) (2021-01-30)


### Bug Fixes

* Undoや手入力でも青四角を戻す・動かすように ([5ce4ac3](https://github.com/famibee/SKYNovel/commit/5ce4ac3ae24df4e1ad7663d624a1375b08e2945c))

- fix: Undoや手入力でも青四角を戻す・動かすように


# [1.8.0](https://github.com/famibee/SKYNovel/compare/v1.7.1...v1.8.0) (2021-01-30)


### Features

* デバッグ実行時、一時停止した際にボタン位置・サイズをdrag&dropで変更できる機能 ([2fa7481](https://github.com/famibee/SKYNovel/commit/2fa7481c01ac7591846a8086dde4ea4e2efe9c69))

- feat: デバッグ実行時、一時停止した際にボタン位置・サイズをdrag&dropで変更できる機能
- feat: .vscode/launch.jsonに stopOnEntry（最初の行で停止するか選べる）機能追加
- fix: デバッガ・アプリ間プロトコル改善、UMLシーケンス図・状態遷移図コメント追加
- fix: デバッガにおけるコールスタック表示を修正


## [1.7.1](https://github.com/famibee/SKYNovel/compare/v1.7.0...v1.7.1) (2021-01-24)


### Bug Fixes

* electron-store、7.0.0にするとアプリ版がエラーになるので6.0.1に戻し ([f7562a5](https://github.com/famibee/SKYNovel/commit/f7562a599d105eda969a31e72c82c40182dbf039))

- fix: electron-store、7.0.0にするとアプリ版がエラーになるので6.0.1に戻し


# [1.7.0](https://github.com/famibee/SKYNovel/compare/v1.6.38...v1.7.0) (2021-01-24)


### Features

* Web版でもデバッグできるように ([9db8737](https://github.com/famibee/SKYNovel/commit/9db8737e0daf4ae8d455596ad046d139791e87b5))
* Web版でもデバッグできるように(2) ([a2afba2](https://github.com/famibee/SKYNovel/commit/a2afba261ce4d77e2b0c26147b19582955834bef))

- feat: Web版でもデバッグできるように


## [1.6.38](https://github.com/famibee/SKYNovel/compare/v1.6.37...v1.6.38) (2021-01-18)


### Bug Fixes

* 画像ボタンクリック時に、fn省略ジャンプやコールでスクリプトが狂ってしまう場合がある件 ([d861ce6](https://github.com/famibee/SKYNovel/commit/d861ce6c0b556bfe4256e58df824e52719844289))

- fix: 画像ボタンクリック時に、fn省略ジャンプやコールでスクリプトが狂ってしまう場合がある件


## [1.6.37](https://github.com/famibee/SKYNovel/compare/v1.6.36...v1.6.37) (2021-01-18)


### Bug Fixes

* 画像ボタンや文字ボタン背景で同画像を、間を置かずロードした場合に最初一つしか表示されない件 ([b0b0041](https://github.com/famibee/SKYNovel/commit/b0b0041994aca6b5f40566ffe2afa006d259d563))

- fix: 画像ボタンや文字ボタン背景で同じ画像を、間を置かずロードした場合に最初一つしか表示されない件（副作用として警告がたくさん出る。これを抑制しようとしようとした処理によるデグレード）


## [1.6.36](https://github.com/famibee/SKYNovel/compare/v1.6.35...v1.6.36) (2021-01-18)


### Bug Fixes

* 変数名が短い変数と長いjson変数がある際、短い変数を参照するとエラーになる件 ([9439b97](https://github.com/famibee/SKYNovel/commit/9439b97c4e08d472eafe703e6b950adecc4e0dd1))

- fix: 変数名が短い変数と長いjson変数がある際、短い変数を参照するとエラーになる件
	mp:const.sn.sound = true
	mp:const.sn.sound.codecs = '{"aac": true, "flac": false}'
	// TypeError: Cannot use 'in' operator to search for 'codecs' in true
- fix: リファクタリング
- fix: ライブラリ更新
- fix: npm test:w で変更監視の過敏さを軽減、ソース変更をテストに反映するように。（現状、test/*.test.ts変更は反映されていない。npm watch再起動が必要）


## [1.6.35](https://github.com/famibee/SKYNovel/compare/v1.6.34...v1.6.35) (2021-01-14)


### Bug Fixes

* ダークモード変更イベント[event key=sn:chgDarkMode]追加 ([246f595](https://github.com/famibee/SKYNovel/commit/246f595d4855b32d4266a34047a40017e7558a07))

- fix: ダークモード変更イベント[event key=sn:chgDarkMode]追加
- fix: ダークモード変更判定APIが非推奨になっていたので更新


## [1.6.34](https://github.com/famibee/SKYNovel/compare/v1.6.33...v1.6.34) (2021-01-11)


### Bug Fixes

* ライブラリ更新 ([9067ae8](https://github.com/famibee/SKYNovel/commit/9067ae812238fcf5bdcff97478702845985f7b5f))

- fix: ライブラリ更新
- fix: [dump_script][event][set_focus]タグリファレンスにneed_err属性の記述追加


## [1.6.33](https://github.com/famibee/SKYNovel/compare/v1.6.32...v1.6.33) (2021-01-05)


### Bug Fixes

* ライブラリ更新 ([f7c343e](https://github.com/famibee/SKYNovel/commit/f7c343eefa4accced447bc7e87265b244bee814b))

- fix: ライブラリ更新


## [1.6.32](https://github.com/famibee/SKYNovel/compare/v1.6.31...v1.6.32) (2021-01-01)


### Bug Fixes

* Licenseブロック年表記更新 ([85aa2c4](https://github.com/famibee/SKYNovel/commit/85aa2c4a202e7851f99b245c81b35c58a77b6d73))

- fix: Licenseブロック年表記更新


## [1.6.31](https://github.com/famibee/SKYNovel/compare/v1.6.30...v1.6.31) (2021-01-01)


### Bug Fixes

* ライブラリ更新 ([ba81a0a](https://github.com/famibee/SKYNovel/commit/ba81a0ad79a2f928c2ae9ae642e9dbba5677defc))

- fix: ライブラリ更新


## [1.6.30](https://github.com/famibee/SKYNovel/compare/v1.6.29...v1.6.30) (2020-12-26)


### Bug Fixes

* アイコン更新、透過しないように ([47568ed](https://github.com/famibee/SKYNovel/commit/47568edf11e010f1f3d66a988caee14f16910450))

- fix: アイコン更新、透過しないように
- fix: ライブラリ更新


## [1.6.29](https://github.com/famibee/SKYNovel/compare/v1.6.28...v1.6.29) (2020-12-21)


### Bug Fixes

* スクリプト拡張子に「ssn」追加 ([05cc840](https://github.com/famibee/SKYNovel/commit/05cc8405739f8a5a5642ffceb1e99f33321433bc))

- fix: スクリプト拡張子に「ssn」追加
- fix: ライブラリ更新


## [1.6.28](https://github.com/famibee/SKYNovel/compare/v1.6.27...v1.6.28) (2020-12-15)


### Bug Fixes

* ライブラリ更新 ([faeb4dc](https://github.com/famibee/SKYNovel/commit/faeb4dc1a656e594b37e4cb7ad1f2c054883188e))

- fix: ライブラリ更新


## [1.6.27](https://github.com/famibee/SKYNovel/compare/v1.6.26...v1.6.27) (2020-12-13)


### Bug Fixes

* ドキュメント更新：フォント使用サンプル、mp4、現在H264しか再生できないらしい件追記 ([80205c8](https://github.com/famibee/SKYNovel/commit/80205c83d1991bc24c652cba9f5751ac389fcc8e))

- fix: ドキュメント更新：フォント使用サンプル、mp4、現在H264しか再生できないらしい件追記
- fix: ライブラリ更新


## [1.6.26](https://github.com/famibee/SKYNovel/compare/v1.6.25...v1.6.26) (2020-12-11)


### Bug Fixes

* 文字レイヤの[dump_lay]で、前回のクリック待ちまでの表示文字しかtxtに反映されない件 ([35348e4](https://github.com/famibee/SKYNovel/commit/35348e40b47a980f9c106b90603b4fd3e966ef5f))

- fix: 文字レイヤの[dump_lay]で、前回のクリック待ちまでの表示文字しかtxtに反映されない件
- fix: ライブラリ更新


## [1.6.25](https://github.com/famibee/SKYNovel/compare/v1.6.24...v1.6.25) (2020-11-26)


### Bug Fixes

* 文字ボタンが多数ある画面で一個ずつウェイトが入る件 ([ce46e8a](https://github.com/famibee/SKYNovel/commit/ce46e8af992c2e2c2f7546b7574230705467cebb))

- fix: 文字ボタンが多数ある画面で一個ずつウェイトが入る件


## [1.6.24](https://github.com/famibee/SKYNovel/compare/v1.6.23...v1.6.24) (2020-11-25)


### Bug Fixes

* .gitignore修正 ([b6850d4](https://github.com/famibee/SKYNovel/commit/b6850d416e782dd8cd82f677a183df27070d399c))

- fix: .gitignore修正


## [1.6.23](https://github.com/famibee/SKYNovel/compare/v1.6.22...v1.6.23) (2020-11-25)


### Bug Fixes

* HArgなどの型宣言修正（Interface → type） ([3ef8162](https://github.com/famibee/SKYNovel/commit/3ef8162c22d5dec72cb6bc78dc6b54984feace14))

- fix: HArgなどの型宣言修正（Interface → type）


## [1.6.22](https://github.com/famibee/SKYNovel/compare/v1.6.21...v1.6.22) (2020-11-25)


### Bug Fixes

* （ギャラリーでHArgなどの型宣言が見えないので）.npmignore修正 ([eb5c863](https://github.com/famibee/SKYNovel/commit/eb5c86313f942884ca4cf41e0477b18ead1df8bf))

- fix: ライブラリ更新
- fix: （ギャラリーでHArgなどの型宣言が見えないので）.npmignore修正


## [1.6.21](https://github.com/famibee/SKYNovel/compare/v1.6.20...v1.6.21) (2020-11-20)


### Bug Fixes

* ルール画像[trans]で中心位置がずれている件 ([9267d6f](https://github.com/famibee/SKYNovel/commit/9267d6f3027115d2a7a4c0ef1f934ddce9c34282))

- fix: ルール画像[trans]で中心位置がずれている件


## [1.6.20](https://github.com/famibee/SKYNovel/compare/v1.6.19...v1.6.20) (2020-11-20)


### Bug Fixes

* 同じバッファでロード前に再生しようとして警告がでる場合がある件 ([0e0e6a2](https://github.com/famibee/SKYNovel/commit/0e0e6a293417fd60988e8efcb6f5de2c041c588a))

- fix: 同じバッファでロード前に再生しようとして警告がでる場合がある件
- fix: コンパイルエラー解消


## [1.6.19](https://github.com/famibee/SKYNovel/compare/v1.6.18...v1.6.19) (2020-11-20)


### Bug Fixes

* コンパイルエラー解消、ライブラリ更新 ([f792c7a](https://github.com/famibee/SKYNovel/commit/f792c7a034d4ff90f4220f92e31396baa176e963))

- fix: コンパイルエラー解消
- fix: ライブラリ更新


## [1.6.18](https://github.com/famibee/SKYNovel/compare/v1.6.17...v1.6.18) (2020-11-19)


### Bug Fixes

* ライブラリ更新 ([782fad3](https://github.com/famibee/SKYNovel/commit/782fad32e9b48e8c063aed82012c49187458c821))

- fix: ライブラリ更新


## [1.6.17](https://github.com/famibee/SKYNovel/compare/v1.6.16...v1.6.17) (2020-11-13)


### Bug Fixes

* コンパイルエラー解消 ([ea38802](https://github.com/famibee/SKYNovel/commit/ea388022131cee98f97993c4cc590d54f74349ba))

- fix: コンパイルエラー解消


## [1.6.16](https://github.com/famibee/SKYNovel/compare/v1.6.15...v1.6.16) (2020-11-12)


### Bug Fixes

* 追い出し（行頭禁則 A）のデグレードミス修正 ([783a931](https://github.com/famibee/SKYNovel/commit/783a9319a0bd85e1efe1fddcb1a94b9f37816a9b))

- fix: 追い出し（行頭禁則 A）のデグレードミス修正


## [1.6.15](https://github.com/famibee/SKYNovel/compare/v1.6.14...v1.6.15) (2020-11-11)


### Bug Fixes

* [load]先直後にフェード操作があるとエラーになる場合がある件 ([51d299a](https://github.com/famibee/SKYNovel/commit/51d299a18465d3771e8f1d4fe9e1b9d5db41cb9f))

- fix: [load]先直後にフェード操作があるとエラーになる場合がある件
- fix: 追い出し時にdebugLogオンでコンソール出力するように


## [1.6.14](https://github.com/famibee/SKYNovel/compare/v1.6.13...v1.6.14) (2020-11-09)


### Bug Fixes

* 左右反転などした立ち絵の表示位置がおかしい件 ([bab67a8](https://github.com/famibee/SKYNovel/commit/bab67a8350981153beea44553c4257a0e93ce693))

- fix: 左右反転などした立ち絵の表示位置がおかしい件


## [1.6.13](https://github.com/famibee/SKYNovel/compare/v1.6.12...v1.6.13) (2020-11-06)


### Bug Fixes

* ロードやリロードで画像レイヤのalphaなどが復元されない件 ([57d54a2](https://github.com/famibee/SKYNovel/commit/57d54a2283e83ec9169364e9cb8a5690a1894c56))

- fix: ロードやリロードで画像レイヤのalphaなどが復元されない件


## [1.6.12](https://github.com/famibee/SKYNovel/compare/v1.6.11...v1.6.12) (2020-11-06)


### Bug Fixes

* @tweenjs/tween.jsの使用箇所修正 ([53041f3](https://github.com/famibee/SKYNovel/commit/53041f32e133246b9e74aef1d0999db309fe9322))

- fix: @tweenjs/tween.jsの使用箇所修正


## [1.6.11](https://github.com/famibee/SKYNovel/compare/v1.6.10...v1.6.11) (2020-11-05)


### Bug Fixes

* load時に複数画像ボタンが正しく復元されない件（セーブデータ非互換） ([8fe4b4a](https://github.com/famibee/SKYNovel/commit/8fe4b4a38b6f19eb542090efd73fd9335aea0c39))

- fix: load時に複数画像ボタンが正しく復元されない件（セーブデータ非互換）
- fix: 画像ロード非同期周りの処理をPromise.allSettled()駆動に変更
- fix: ライブラリ更新（@types/tween.jsは削除、@tweenjs/tween.jsのみに）


## [1.6.10](https://github.com/famibee/SKYNovel/compare/v1.6.9...v1.6.10) (2020-11-01)


### Bug Fixes

* 動画の音声に全体的音量の設定が反映されていないのを修正 ([2b88555](https://github.com/famibee/SKYNovel/commit/2b885550403315823b3bbe44ff07489a701d1715))

## v1.6.10
- fix: 動画の音声に全体的音量の設定が反映されていないのを修正
- feat: ムービー音量をサウンドバッファのように変更できるシステム変数 sys:sn.sound.movie_volume 追加


## [1.6.9](https://github.com/famibee/SKYNovel/compare/v1.6.8...v1.6.9) (2020-11-01)


### Bug Fixes

* ライブラリ更新（ただし @types/tween.js は 18.5.1 固定） ([676fe60](https://github.com/famibee/SKYNovel/commit/676fe60eaaafabda0a100a7f7fa8d7f9e360e1fd))

- fix: ライブラリ更新（ただし @types/tween.js 18.6.4 はコンパイルエラーになるので 18.5.1 固定）


## [1.6.8](https://github.com/famibee/SKYNovel/compare/v1.6.7...v1.6.8) (2020-10-22)


### Bug Fixes

* アプリ版が起動しない点を修正 ([02cc3cf](https://github.com/famibee/SKYNovel/commit/02cc3cf79bf1f0a253be94a429dd1049b8321c4a))

- fix: アプリ版が起動しない点を修正
	- ライブラリ戻し（webpack を 4.44.2、webpack-cli を 3.3.12に戻し）
	- tsconfig.json の target を es2019 に戻し
	- @types/node を 14.11.11 に戻し。14.14.* 系は保留
- fix: ライブラリ更新


## [1.6.7](https://github.com/famibee/SKYNovel/compare/v1.6.6...v1.6.7) (2020-10-20)


### Bug Fixes

* ライブラリ更新（webpack を 5.1.3、webpack-cli を 4.1.0に） ([48ce734](https://github.com/famibee/SKYNovel/commit/48ce7342ca721acdfeebb61c98f71ae54206a15b))

- fix: ライブラリ更新（webpack を 5.1.3、webpack-cli を 4.1.0に）
- fix: tsconfig.json の target を es2020 に更新


## [1.6.6](https://github.com/famibee/SKYNovel/compare/v1.6.5...v1.6.6) (2020-10-19)


### Bug Fixes

* node pathモジュールに少しだけ依存していた部分を正規表現に置き換え ([32f8f27](https://github.com/famibee/SKYNovel/commit/32f8f27ab58d05bc434886c275e4abd4ce697dec))

- fix: node pathモジュールに少しだけ依存していた部分を正規表現に置き換え
- fix: ライブラリ更新


## [1.6.5](https://github.com/famibee/SKYNovel/compare/v1.6.4...v1.6.5) (2020-09-26)


### Bug Fixes

* ライブラリ更新 ([78b67d4](https://github.com/famibee/SKYNovel/commit/78b67d46d3a480769093a4e7c1a4fe55784ba207))

- fix: ライブラリ更新


## [1.6.4](https://github.com/famibee/SKYNovel/compare/v1.6.3...v1.6.4) (2020-09-17)


### Bug Fixes

* [event key='dom=（略）' need_err=false] で無要素時エラー ([a84a87c](https://github.com/famibee/SKYNovel/commit/a84a87c3b0e4b97bd32de28dd37cd930b5308886))

- fix: [event key='dom=（略）' need_err=false] で要素が無い場合にエラーになる件


## [1.6.3](https://github.com/famibee/SKYNovel/compare/v1.6.2...v1.6.3) (2020-09-17)


### Bug Fixes

* あげミス・手直し2 ([c3b412c](https://github.com/famibee/SKYNovel/commit/c3b412c46b76e5c91d33caf2365d02e197a4094d))

- fix: あげミス・手直し2
- fix: .gitignore 記述修正


## [1.6.2](https://github.com/famibee/SKYNovel/compare/v1.6.1...v1.6.2) (2020-09-17)


### Bug Fixes

* クリックでフォーカスしたボタン等と、[set_focus]管理のフォーカスを一致させるよう ([2c7abc3](https://github.com/famibee/SKYNovel/commit/2c7abc352aa2886817c376a4b1aa2e8178e747bb))

- fix: クリックなどでフォーカスされたボタンやHTML要素と、[set_focus]管理のフォーカスを一致させるように
- fix: Click to play状態で、ゲームパッド左右でボタンにフォーカス移動する件
- fix: .gitignore 設定が一部反映されず GitHub にアップされていたものを削除


## [1.6.1](https://github.com/famibee/SKYNovel/compare/v1.6.0...v1.6.1) (2020-09-16)


### Bug Fixes

* 「data-focus="false"」指定を変更すればフォーカスさせるように ([dcaf419](https://github.com/famibee/SKYNovel/commit/dcaf419d86d4fab4b7eb65a4f49ac8be8d9a94c9))

- fix: 「data-focus="false"」指定を変更すればフォーカスさせるように
- fix: タグリファレンスに「data-focus="false"」指定について追記
- fix: [save]で const.sn.save.place が増えない不具合。タグリファレンス追記


# [1.6.0](https://github.com/famibee/SKYNovel/compare/v1.5.2...v1.6.0) (2020-09-14)


### Features

* [event]指定されたフォーム上のHTML要素にもフォーカス移動するように ([c12d205](https://github.com/famibee/SKYNovel/commit/c12d205adc204bb4f7b4b735c5b0b34d5819b128))

- feat: [event]指定されたフォーム上のHTML要素にもフォーカス移動するように
- feat: 上記機能、「data-focus="false"」指定でフォーカス移動しないように
- feat: テキストボックスなどでは上下キーでカーソルを左右移動
- feat: [set_focus add='dom=archive:.card-image,.btn_delete']のような（querySelectorAll()引数なセレクタ指定）でカーソルキー操作でフォーカス移動対象に加えるように
- feat: [set_focus del='dom=（略）']でフォーカス移動対象から外せるように
- feat: [set_focus to=null]でwindowにフォーカスを与えるように
- fix: ブラウザ版：全画面化したさい、const.sn.displayStateが成否逆
- fix: const.sn.last_page_text の値で、内部的に冒頭に追加される「　《　》」を「　」に置換するように
- fix: ロード時履歴情報が回復されない件
- fix: 現状必要性がないので未作成 const.Stage.mouseX、const.Stage.mouseY を削除


## [1.5.2](https://github.com/famibee/SKYNovel/compare/v1.5.1...v1.5.2) (2020-08-27)


### Bug Fixes

* クリック待ち用ダミー空白を削除、でデグレード ([8180e95](https://github.com/famibee/SKYNovel/commit/8180e950fd027eced2558280194f1a6c32ebc77f))

- fix: クリック待ち用ダミー空白を削除、でデグレード


## [1.5.1](https://github.com/famibee/SKYNovel/compare/v1.5.0...v1.5.1) (2020-08-27)


### Bug Fixes

* フォーカス移動時にツールチップスも表示するように ([a6164a0](https://github.com/famibee/SKYNovel/commit/a6164a01eab39ef0d39bd7a0b5c5573e0b83e90f))

- fix: フォーカス移動時にツールチップスも表示するように


# [1.5.0](https://github.com/famibee/SKYNovel/compare/v1.4.0...v1.5.0) (2020-08-27)


### Features

* フォーカス移動[set_focus]タグ作成、[button][link]を順次移動 ([f3d35d7](https://github.com/famibee/SKYNovel/commit/f3d35d771f4c98dc14d797e7de039c56fd8c2418))

- feat: フォーカス移動[set_focus]タグ作成、[button][link]を順次移動するように
- feat: [button][link]にフォーカス状態でEnterキーを押すとクリック扱いになるように
- feat: ゲームパッドサポート、上下左右とEnter・右クリック（ボタン番号の偶数奇数）イベントを起こす
- feat: [link]にstyle_hover、style_clicked属性追加
- fix: [button]のstyle、style_hover、style_clicked属性の反映ミスを修正
- fix: タグリファレンス：[wb][wl]にglobal属性追記
- fix: 新しい演算子（&&=、||=、??=）を積極使用（TypeScript 4.0.2）


# [1.4.0](https://github.com/famibee/SKYNovel/compare/v1.3.0...v1.4.0) (2020-08-25)


### Features

* [button][link]にマウスカーソルを載せるとツールチップス表示するhint属性 ([e29bb18](https://github.com/famibee/SKYNovel/commit/e29bb187f85d96acc8da45d9788f37d8b60d51f0))

- feat: [button][link]にマウスカーソルを載せるとツールチップス表示する hint属性追加
- feat: hint(.pngなど)をプロジェクトに含めると、それをツールチップスとして使うように
- feat: [button]にツールチップスをボタンに対してどの位置に表示するか指定するhint_tate属性追加
- breaking change: [button]style属性をCSS形式ではなくJSONに。タグリファレンスにもPIXI TextStyleと明記
- feat: 画像としてData URIをサポート、スクリプト埋め込み画像が可能に（ただし画像レイヤface属性には「,」区切りによる複数指定はできない）
- fix: ループ動画は[wv]をスルーするように
- fix: 「Flashではrotationは度だけど、pixijsではラジアンで度はangle」問題、rotationで度とするように統一
- fix: [button]ブラッシュアップ、scale_x・scale_y、画像ボタンでwidth・heightが効かない件など一通りチェック
- fix: 右クリックメニューなどが効かない件
- feat: プロジェクト設定のデバッグスイッチmasumeで、ボタンを紫四角で囲うように（文字ボタンは背景画像あっても文字部分のみ）


# [1.3.0](https://github.com/famibee/SKYNovel/compare/v1.2.10...v1.3.0) (2020-08-17)


### Features

* [wait][wv][wait_tsy][wf][ws]にglobal属性。不具合修正 ([b4746b1](https://github.com/famibee/SKYNovel/commit/b4746b1080de444b15dc87318dd7a899710a54b1))

- feat: [wait][wv][wait_tsy][wf][ws]にグローバルイベント待ちを有効/無効にする global属性（デフォルト=false）追加。ただしcanskipと同時にtrueにするとエラー
- feat: [trans][quake][wait]もFキースキップ・未読で停止するように
- feat: [wait][wv][wait_tsy][wf][ws]も既読スキップ・即時終端状態になるように
- feat: 文字レイヤの[dump_lay]でボタンについても情報を出力するように
- fix: [pause_tsy]で止めて[resume_tsy]再開時に最初からアニメしてしまう件
- fix: 既読スキップ中でも[waitclick]で止まる件
- fix: ライブラリ更新（@tweenjs/tween.js@18.6.0）対応
- fix: イベント関係内部修正
- fix: 既読スキップ周り修正


## [1.2.10](https://github.com/famibee/SKYNovel/compare/v1.2.9...v1.2.10) (2020-08-05)


### Bug Fixes

* 前回更新（1.2.9）でデグレードしたため、v1.2.8 相当に戻す ([41f5c67](https://github.com/famibee/SKYNovel/commit/41f5c67907850ad896dc52adfaa0e8382caaf8ab))

- fix: 前回更新（1.2.9）でデグレードしたため、v1.2.8 相当に戻す
- fix: ライブラリ更新


## [1.2.9](https://github.com/famibee/SKYNovel/compare/v1.2.8...v1.2.9) (2020-08-04)


### Bug Fixes

* [wait][wv][wait_tsy][wf][ws]、グローバルイベでキャンセルさせる ([804f0b1](https://github.com/famibee/SKYNovel/commit/804f0b1201c9cf4016b9f7f55b2165c9140b0a8b))

- fix: [wait][wv][wait_tsy][wf][ws]で待機中、グローバルイベント発生によるjump,call後に前述のイベント待ちがキャンセルされず発生してしまう不具合


## [1.2.8](https://github.com/famibee/SKYNovel/compare/v1.2.7...v1.2.8) (2020-08-03)


### Bug Fixes

* イベント関係手直し ([c524134](https://github.com/famibee/SKYNovel/commit/c524134e29641a0623fbd355e165032dd5f90e40))

- fix: イベント関係手直し
- fix: ライブラリ更新


## [1.2.7](https://github.com/famibee/SKYNovel/compare/v1.2.6...v1.2.7) (2020-07-27)


### Bug Fixes

* ライブラリ更新 ([3e3677a](https://github.com/famibee/SKYNovel/commit/3e3677ae5c77253ef7b7f6e8f0b06e15c26ec1f4))

- fix: ライブラリ更新


## [1.2.6](https://github.com/famibee/SKYNovel/compare/v1.2.5...v1.2.6) (2020-07-27)


### Bug Fixes

* [graph][span][link][endlink]不具合修正 ([24d17b4](https://github.com/famibee/SKYNovel/commit/24d17b45af8ee2da2f9fc42ac248ce0401b91cf0))

- fix: [span][link][endlink]でlayer属性が効かない件
- fix: [graph]、wait=0指定すると直後に「"》」など文字表示される件
- fix: [graph]、width, height, wait属性が効かない件
- fix: [graph]、styleでfont-size指定するように（文字表示に合わせる）
- fix: [graph]、x, y属性を追加。==100と文字表示位置からの相対指定もできる
- fix: ライブラリ更新


## [1.2.5](https://github.com/famibee/SKYNovel/compare/v1.2.4...v1.2.5) (2020-07-21)


### Bug Fixes

* 非暗号化時の[add_frame]処理を暗号化時となるべく同じに。キャッシュも利く ([31ebc1b](https://github.com/famibee/SKYNovel/commit/31ebc1b65930a71bccfcb577295f574bc204f67d))

- fix: 非暗号化時の[add_frame]処理を暗号化時となるべく同じに。キャッシュも利く
- fix: ライブラリ更新


## [1.2.4](https://github.com/famibee/SKYNovel/compare/v1.2.3...v1.2.4) (2020-07-19)


### Bug Fixes

* ライブラリ更新し切れておらず、リビルド ([3b3c368](https://github.com/famibee/SKYNovel/commit/3b3c3689d75fda2f327c02a91863685048dc8d90))

- fix: ライブラリ更新し切れておらず、リビルド


## [1.2.2](https://github.com/famibee/SKYNovel/compare/v1.2.1...v1.2.2) (2020-07-19)


### Bug Fixes

* ライブラリ更新 ([7df8dba](https://github.com/famibee/SKYNovel/commit/7df8dba07d86aa584f9b73eaa4026444e0476b67))

- fix: ライブラリ更新


## [1.2.1](https://github.com/famibee/SKYNovel/compare/v1.2.0...v1.2.1) (2020-07-14)


### Bug Fixes

* ライブラリ更新 ([beda444](https://github.com/famibee/SKYNovel/commit/beda444ae294bd476aecc818836452bfb5bf6687))

- fix: ライブラリ更新


# [1.2.0](https://github.com/famibee/SKYNovel/compare/v1.1.31...v1.2.0) (2020-07-14)


### Features

* [frame]にイベントを無視させるdisabled属性追加、フレームの連打時エラー対策 ([72d2aa0](https://github.com/famibee/SKYNovel/commit/72d2aa05b1b815fce95aaa7b6ae202c9dca0e484))

- feat: [frame]にイベントを無視させるdisabled属性追加（enabled 系と逆値なので注意、HTML DOMに合わせたため）
- fix: [event key='【フレーム名】:【DOMクエリー】']での連打時エラー対策
	- （押したまま部品外へ出たときもイベント発生させていたが、連打でトラブルので削除）
- fix: [add_frame]でのstyle指定ミス修正
- fix: [stopse]時 null対策


## [1.1.31](https://github.com/famibee/SKYNovel/compare/v1.1.30...v1.1.31) (2020-07-12)


### Bug Fixes

* 文字レイヤ有無にかかわらずイベント処理する方針に。ブラウザフルスクリーンAPIを最新対応に ([9f21348](https://github.com/famibee/SKYNovel/commit/9f21348fdc6161bd76d7d5022a14b37bc096621e))

- fix: 文字レイヤの有無にかかわらずイベントを処理する方針に。無視したい場合は（[call]先やその状況で）[event]予約などを行うなどし、そちらを「特殊な状況」とする。
- fix: ウェブ標準から削除された Document.fullscreen を使用しないように
	- Document.fullscreen - Web API | MDN https://developer.mozilla.org/ja/docs/Web/API/Document/fullscreen
- fix: ブラウザ・フルスクリーン系のAPIを最新対応に
- fix: const.sn.log.json、save:const.sn.sLog を軽量化


## [1.1.30](https://github.com/famibee/SKYNovel/compare/v1.1.29...v1.1.30) (2020-07-10)


### Bug Fixes

* 一度再生した動画を再度再生できない件 ([dd1bc95](https://github.com/famibee/SKYNovel/commit/dd1bc95163e4855a7981920a3c973feb94891903))

- fix: 一度再生した動画を再度再生できない件


## [1.1.29](https://github.com/famibee/SKYNovel/compare/v1.1.28...v1.1.29) (2020-07-09)


### Bug Fixes

* Firefox beta版で【戻るボタン無効化】処理そのものが、正式版で逆効果で削除 ([707aa69](https://github.com/famibee/SKYNovel/commit/707aa692e37ed5df6edb6d4cd6bae01276171ba1))

- fix: Firefox beta版で【戻るボタン無効化】していた処理そのものが、正式版で逆効果になっていたので削除
- fix: ライブラリ更新


## [1.1.28](https://github.com/famibee/SKYNovel/compare/v1.1.27...v1.1.28) (2020-07-07)


### Bug Fixes

* 簡易版ギャラリー向け修正、runSN()追加 ([c1e54a5](https://github.com/famibee/SKYNovel/commit/c1e54a5597979c3bdc81ed22e648d0e40ed58772))

- fix: 簡易版ギャラリー向け修正、runSN()追加
- upd: ライブラリ更新


## [1.1.27](https://github.com/famibee/SKYNovel/compare/v1.1.26...v1.1.27) (2020-07-06)


### Bug Fixes

* 【ブラウザ版】prj.json などの内部的パス指定を相対指定に ([dda3df5](https://github.com/famibee/SKYNovel/commit/dda3df5dd3c83493c51076819eeba645328203df))

- fix: 【ブラウザ版】prj.json などの内部的パス指定を相対指定に


## [1.1.26](https://github.com/famibee/SKYNovel/compare/v1.1.25...v1.1.26) (2020-07-02)


### Bug Fixes

* 履歴が効いて戻るボタンが押せてしまう件対応、Firefoxのみに限定するように ([cb708a8](https://github.com/famibee/SKYNovel/commit/cb708a8ee17e3b82daf14f1c90e0a851124cf8f7))

- fix: 履歴が効いて戻るボタンが押せてしまう件対応、Firefoxのみに限定するように


## [1.1.25](https://github.com/famibee/SKYNovel/compare/v1.1.24...v1.1.25) (2020-07-02)


### Bug Fixes

* 【暗号化時】rule画像処理の不具合。通常画像ロードと同じ処理を行うように ([b3915dd](https://github.com/famibee/SKYNovel/commit/b3915dd2a577dda980c63fbe892f43d51bdfc4ac))

- fix: 【暗号化時】rule画像処理の不具合。通常画像ロードと同じ処理を行うように
- fix: 内部的に[call fn=ext_*]などの展開処理でファイル名匿名化対応
- fix: 【Firefox】履歴が効いて戻るボタンが押せてしまう件
- fix: 【暗号化時＆Firefox】Frame系画面で「#close」が見つからないエラー（onloadが二度呼ばれる）対応
- upd：ライブラリ更新


## [1.1.24](https://github.com/famibee/SKYNovel/compare/v1.1.23...v1.1.24) (2020-06-24)


### Bug Fixes

* ライブラリ更新 ([58d6f9f](https://github.com/famibee/SKYNovel/commit/58d6f9fe509b7e2831193a0206c78e34db6eeb34))

- upd：ライブラリ更新


## [1.1.23](https://github.com/famibee/SKYNovel/compare/v1.1.22...v1.1.23) (2020-06-22)


### Bug Fixes

* @tweenjs/tween.js ライブラリVer戻し（18.6.0 → 18.5.0） ([adb616b](https://github.com/famibee/SKYNovel/commit/adb616b66388f7df4246231c652fb1ca2b4d13eb))

- fix: @tweenjs/tween.js ライブラリVer戻し（18.6.0 → 18.5.0）
（例えば[trans]キャンセルするとフリーズのような状態になる）


## [1.1.22](https://github.com/famibee/SKYNovel/compare/v1.1.21...v1.1.22) (2020-06-21)


### Bug Fixes

* SafariとFirefoxの不具合修正 ([d75317b](https://github.com/famibee/SKYNovel/commit/d75317bfd02430944ece7eb86207d51e465a793c))

- bug：Safariで「Unhandled Promise Rejection: TypeError: undefined is not an object (evaluating 'screen.orientation.angle')」エラー
- bug：Firefoxで「SyntaxError: invalid regexp group」エラー
- bug：FirefoxでFrameのスライダーなどをホバーすると、マウスアウトイベントなどが発生しスライダー操作したかのような状態になる不具合


## [1.1.21](https://github.com/famibee/SKYNovel/compare/v1.1.20...v1.1.21) (2020-06-20)


### Bug Fixes

* テスト用ダミー更新10（npmjsのタグ更新） ([00b5547](https://github.com/famibee/SKYNovel/commit/00b554797c0f45608951911a0d8de2d4dab908bf))

## [1.1.20](https://github.com/famibee/SKYNovel/compare/v1.1.19...v1.1.20) (2020-06-20)


### Bug Fixes

* テスト用ダミー更新9（npmjsのタグ更新） ([b329820](https://github.com/famibee/SKYNovel/commit/b329820763a3fa4ba12c6d97b50a8b5319dcea47))

## [1.1.19](https://github.com/famibee/SKYNovel/compare/v1.1.18...v1.1.19) (2020-06-20)


### Bug Fixes

* テスト用ダミー更新8 ([875fc2e](https://github.com/famibee/SKYNovel/commit/875fc2e434b23e34532e846932e2fdb5913f7d51))

## [1.1.18](https://github.com/famibee/SKYNovel/compare/v1.1.17...v1.1.18) (2020-06-20)


### Bug Fixes

* テスト用ダミー更新7 ([6a1b94a](https://github.com/famibee/SKYNovel/commit/6a1b94a74868679c4381de5fb8326cf42d9e2cbc))

## [1.1.17](https://github.com/famibee/SKYNovel/compare/v1.1.16...v1.1.17) (2020-06-20)


### Bug Fixes

* テスト用ダミー更新6 ([8e877f8](https://github.com/famibee/SKYNovel/commit/8e877f8c706395ae32b3a721550b5d2cdb6f2494))

## [1.1.16](https://github.com/famibee/SKYNovel/compare/v1.1.15...v1.1.16) (2020-06-20)


### Bug Fixes

* テスト用ダミー更新5 ([f125c87](https://github.com/famibee/SKYNovel/commit/f125c8795b6afa1ef5050f32526845eaf85650ac))

## [1.1.15](https://github.com/famibee/SKYNovel/compare/v1.1.14...v1.1.15) (2020-06-20)


### Bug Fixes

* テスト用ダミー更新4 ([12aee66](https://github.com/famibee/SKYNovel/commit/12aee6640bc5c942cabe61e5ecf1d26705c2e1cd))

## [1.1.14](https://github.com/famibee/SKYNovel/compare/v1.1.13...v1.1.14) (2020-06-20)


### Bug Fixes

* テスト用ダミー更新3 ([955de12](https://github.com/famibee/SKYNovel/commit/955de124873826725918703ddbf6305241110c66))

## [1.1.13](https://github.com/famibee/SKYNovel/compare/v1.1.12...v1.1.13) (2020-06-20)


### Bug Fixes

* テスト用ダミー更新2 ([df5bdda](https://github.com/famibee/SKYNovel/commit/df5bdda4f4615fc6599bd77181fd1e6503f935c1))

## [1.1.12](https://github.com/famibee/SKYNovel/compare/v1.1.11...v1.1.12) (2020-06-20)


### Bug Fixes

* テスト用ダミー更新 ([0f2f74f](https://github.com/famibee/SKYNovel/commit/0f2f74f25adea302aaf8b4ec42127794c9b46384))

## v1.1.12
- info：semantic-release 設定中
## v1.1.9 ... v1.1.11
- info：GitHub Actions 設定中
## v1.1.6 ... 1.1.8
- chg：GitHub Package をやめて npm に戻す
## v1.1.5
- chg：access public
## v1.1.4
- bug：ビルドエラー修正
## v1.1.3
- bug：素材の一部が画面外にはみ出す場合、スナップショットが画面サイズより大きくなる件
## v1.1.2
- bug：暗号化＆アプリでのみ、フレーム内から cssやjsロードしない件
- bug：暗号化時、非暗号化画像をGETしようとして出るエラーを抑制
## v1.1.1
- add：[call]もステップオーバーで飛ばせるように
- chg：アイコン【一歩進む】【一歩戻る】【ステップイン】【ステップアウト】は出しっぱなしに。停止中でイベントを受け付けない状態だと明示化
- bug：[import]でtar解凍を待たずに検証処理などが走っていた件
- bug：デバッグ＋暗号化時にセーブデータパスが間違っていたのを修正
- info：importは、CommonJSではなくなるべくES Modules形式で
- bug：引数ありだとステップオーバーでもマクロに入ってしまう件
## v1.1.0
- chg：デバッガー起動ではアプリ版セーブデータパス（userdata:）を変更
- bug：非パッケージアプリ版のセーブデータパスが、別アプリと被っていた件
	- （語句説明）
		- パッケージ済 ... 「exe生成」「app生成」で生成された *.app や *.dmg
		- 非パッケージ ... VSCode上からの起動（アプリ版を起動、デバッガー起動）
	- 旧
		- ok：パッケージ済
			（Win）C:\Users\【ユーザー名】\AppData\Roaming\【アプリ名】\storage\
			（Mac）/Users/【ユーザー名】/Library/Application Support/【アプリ名】/storage/
		- bug：非パッケージ
			（Win）C:\Users\【ユーザー名】\AppData\Roaming\Electron\
				→bug：「Electron」というアプリ名になってしまい別アプリと被っていた
			（Mac）/Users/【ユーザー名】/Library/Application Support/Electron/storage/
				→bug：「Electron」というアプリ名になってしまい別アプリと被っていた
	- 変更点（Win・Mac）
		- eq：パッケージ済
			変更なし、前述のまま
		- chg：非パッケージ（アプリ版を起動）
			アプリと同じパスに変更し、別アプリと被らないように（テンプレ変更にて対応）
		- new：非パッケージ（デバッガー起動）
			｛プロジェクトルート｝/.vscode/storage/
	- 新
		- パッケージ済・非パッケージ（アプリ版を起動）
			（Win）C:\Users\【ユーザー名】\AppData\Roaming\【アプリ名】\storage\
			（Mac）/Users/【ユーザー名】/Library/Application Support/【アプリ名】/storage/
		- 非パッケージ（デバッガー起動）
			｛プロジェクトルート｝/.vscode/storage/
- bug：ノーマルブレークポイントが効かない不具合
- bug：コールスタック表示で、深い階層でのタグコール表示で角括弧【[]】が抜けてる件
- add：「userdata:/」「downloads:/」指定で、途中のフォルダが無くてもエラーではなくフォルダ生成するように
- add：[copybookmark]でセーブデータパスに to, from 属性と同名のフォルダがあればコピーするように
- add：[erasebookmark]でセーブデータパスに place 属性と同名のフォルダがあれば削除するように
## v1.0.0
- new：VSCode拡張機能と通信するデバッガー機能（非パッケージ・デバッグ起動アプリのみ）
	- info：VSCode拡張機能 v3.0.0 以上
	- attach・launch 起動対応
	- 一時停止（たいていイベント待ちなのであまり使わないかも）
	- ステップイン（マクロなら中へ入る）
	- ステップオーバー（マクロなら中へ入らず、外に出たところまで飛ばす）
	- ステップアウト（マクロ内から外に出るまで飛ばす）
	- 再起動ボタン（ゲームエンジン冒頭から再開）
	- ブレークポイント停止（通ったら、タグや&変数操作処理前にブレーク）
		- 行ブレークポイント（行番号の左をクリックで赤丸マーク、そこで停止）
		- 条件式ブレークポイント（条件式が真なら、（略）処理前にブレーク）
		- ヒットカウントブレークポイント（ｎ回以上通ったら、（略）処理前にブレーク）
		- データブレークポイント（変数値が変化したときにブレーク）
		- 関数ブレークポイント（指定したタグやマクロが呼ばれる直前にブレーク）
	- 変数ビュー（スクリプト実行位置の変数値を表示）
		- 【値の設定】停止中、手入力で変数値変更
	- ウォッチ式ビュー
	- コールスタックビュー
- new：停止イベントなどデバッグイベント発生時、画面上にアイコン通知とタイトルに表記
## v0.22.0
- new：GitHub Packages 移行
- chg：パッケージ名をスコープ付きに変更 skynovel → @famibee/skynovel
- upd：ライブラリ更新
## v0.21.5
- add：デバッグモードで起動されたかを示す変数「const.sn.isDbg」追加
- chg：スクリプト終端エラーメッセージ修正
- info：オプショナルチェイニング演算子を積極使用
## v0.21.4
- bug：argChk_Num, argChk_Boolean の export 修正
## v0.21.3
- upd：将来削除される可能性？につき .substr()ではなく.slice()に
	- https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/substr
- upd：ライブラリ更新
- info：その他開発中機能
## v0.21.2
- info：===・!===演算子を積極使用、ライブラリ参照記述を修正
- upd：ライブラリ更新
## v0.21.1
- upd：ライブラリ更新
## v0.21.0
- add：[playse][playbgm]に属性start_ms（開始位置）、end_ms（終了位置）、ret_ms（ループ戻り位置）追加
## v0.20.6
- bug：グローバル音量ゼロでも、再開ダイアログのボタンにマウスホバー音が聞こえる件
## v0.20.5
- bug：ゲーム再開で「スタックが空」エラーになる件
- bug：[load]時にmp:変数をクリアされていない件
## v0.20.4
- breaking change：プラグイン用クラス定義追加と変更
## v0.20.3
- breaking change：webpackでumdモジュールバンドル化（後方互換性なし）
- bug：マクロ内の複数行タグで行番号が狂う件
- bug：マクロから呼び出し元に戻る際、mp:変数を復帰しない件
## v0.20.0
- breaking change：新テンプレ「doc」フォルダ構成変更（prj→doc/prj）対応（アプリ版のみ後方互換性なし）
- add：パッケージされたアプリかどうかを返す組み込み変数 const.sn.isPackaged 追加
- chg：タグリファレンス表記ゆれ修正「引数→属性」「コマンド→タグ」
## v0.19.7
- add：[tsy_frame]にchain属性追加
- add：[tsy_frame]も[tsy]風の相対値指定ができるように
## v0.19.6
- add：画像レイヤの[lay]にblendmode追加。設定はface差分画像などにも波及する
- add：[button]にblendmode追加
- bug：[add_lay]で画像ロード時、ロード終了を待たない件
## v0.19.5
- bug：マクロコールから戻ると行番号がNaNになる件
- del：[break_macro]廃止、[return]で代替可能
- upd：リファクタリング
## v0.19.4
- upd：Web版でも[log]ログ出力がダウンロードするように。（ただし連続だと間隔が開いてないと失敗する）
- del：[stats]廃止
## v0.19.3
- upd：es2019に更新、xregexpが不要に
## v0.19.2
- add：[export]プロジェクト名が違うプレイデータの場合、読み込まずDevToolエラー出力しsn:importedイベント発生しないように
- chg：[export]上記仕様に変更、プレイデータ更新
- add：プレイデータが暗号化版でない表記（no_crypto_）をファイル名前部に追加するように
## v0.19.1
- add：アプリ版[export][import]作成。アプリ版はスナップショットなども含めるように
- chg：プレイデータ拡張子、ウェブ版は.swpd、アプリ版は.spdとして互換性なしとする
- chg：[snapshot][log]もダウンロードフォルダに保存するように。デスクトップは極力使用しない
## v0.19.0
- add：[export]（プレイデータをエクスポート）追加
- add：[import]（プレイデータをインポート）追加
- chg：リファクタリング
## v0.18.2
- bug：複数行タグで行番号が狂う件
## v0.18.1
- bug：タグ名直後にコメントがあるとタグ名の一部になる不具合
- upd：文法解析やや高速化
## v0.18.0
- upd：複数行タグ正規表現不具合修正・テスト追加
- upd：属性の値で、【%xxx】記法だけでなくどんな値でも【|】による省略値指定ができるように
- bug：マクロ内で更にマクロを呼ぶ際、引数を渡さない件（v0.15.1でデグレード）
- chg：タグ記述で「*」じゃないリテラルでエラーの仕様、そのリテラルを属性名とし、1（booleanを求められる属性ではtrue）をセットする省略記法とする。（シンタックスハイライトにより必要性消滅）
- chg：リファクタリング
## v0.17.1
- upd：正規表現記述パフォーマンスチューニング・テスト改良
- bug：非暗号化画像を読むと停止する件
## v0.17.0
- add：暗号化アニメjsonサポート
- bug：改竄チェックは暗号化時のみとする
- bug：暗号化jsonが読めない件
## v0.16.3
- add：改竄チェック用ハッシュがあればチェックするように
## v0.16.2
- bug：動画復号化機能修正
## v0.16.1
- add：暗号化HTML内で暗号化画像を使用できる機能、キャッシュが効くように
## v0.16.0
- add：HTML復号化機能
- add：暗号化HTML内で暗号化画像を使用できる機能
- bug：グローバル音量変更時にエラー
- chg：DevTool禁止時のメッセージに追記
- chg：変数・関数名修正（crypt→crypto）
- del：「first_script」は廃止、main.sn固定に
- del：プロジェクト設定「nocode_reg」「nocode」「pack_exc」廃止
## v0.15.1
- del：プロジェクト設定「slideBaseSpan」廃止
- chg：プロジェクト設定「devtool」を開発者ツールの許可（不許可時は終了）、に機能変更
- chg：内部処理ログ表示・プロジェクト設定「devtool」を「debugLog」に変名
- upd：[add_frame]の src属性も拡張子を省略できるように
- bug：タグ・マクロ引数で text=&fn|'@@' 等の状況で |後のデフォルト値を採用しない件
## v0.15.0
- add：動画復号化機能（ (mp4|webm)→ bin）
## v0.14.0
- add：音声復号化機能（ (mp3|m4a|ogg|aac|webm|flac|wav)→ bin）
- upd：音声再生ライブラリを goldfire/howler.js から pixijs/pixi-sound に変更
- add：[button][link]の効果音はレスポンス向上のため音声ファイルを先読みするように
- add：[playse][playbgm]に speed属性（=1:元のまま、<1:遅い、>1:早い）
## v0.13.0
- add：画像復号化機能（ (jpe?g|png|svg|webp)→ bin）
## v0.12.10
- bug：アニメスプライトjson読み込みでエラーになっていた件
- upd：デーブデータ破損チェック
## v0.12.9
- upd：ライブラリ更新2
## v0.12.8
- upd：ライブラリ更新
## v0.12.7
- upd：画像暗号化作成中
## v0.12.6
- bug：prj.jsonの save_ns を見ていなかったのを修正
## v0.12.5
- bug：ブラウザリサイズ時に文字表示位置・フレームが追従しない件
## v0.12.4
- bug：半角空白が表示されない件
## v0.12.3
- bug：モバイルのみ文字レイヤ表示位置（left・top）変更時に文字とクリック待ちなどがずれる件
## v0.12.2
- bug：モバイル（And/iOS）のみマス目ズレ→カーソル位置がずれる件
- bug：モバイルでボタンクリックした際、へこんだまま戻らない件
- bug：モバイルでボタンクリックできず読み進める件
- add：新ギャラリー用非公開API追加
## v0.12.1
- bug：[ch]後に地の文があると、地の文表示終了までクリック待ちが出てる場合がある件
- bug：Firefox、文字レイヤ追加でエラーになる件
- bug：Firefox、ルビよせをサポート。ただし「right」のみ未サポート
- bug：Firefox、[ws]などが待たない不具合修正
## v0.12.0
- add：レスポンシブやリサイズ・回転イベントの対応
- del：旧式文字表示技術のレガシーコードを削除
- bug：タブレットタップが効かない件を修正
## v0.11.0
- add：行頭禁則文字・行末禁則文字・分割禁止文字を追い出しするように
- add：文字レイヤ[lay ffs='']で CSS の文字詰め font-feature-settingsでの「"pwid"」「"palt"」などサポート
- add：font-feature-settingsの対象としない文字を指定できる文字レイヤ[lay noffs=]追加
## v0.10.0
- add：更新チェック機能[update_check]追加(Windows/Mac)
## v0.9.7
- bug：最初に読み込んだスクリプトの行番号が異常な件
- bug：[return]から戻ったあと、行番号がundefined・NaNになる件
## v0.9.6
- bug：フレーム内ボタンが押せない件
## v0.9.5
- chg：文字レイヤの[lay alpha]変更で、ボタンやボタン背景も変更するように
- chg：文字レイヤ自身(alpha)と文字(style='opacity: 1.0;')で個別に透過度を指定できるように
- chg：[enable_event]で文字リンクも無効になるように
- bug：イベントを受ける文字レイヤが一つでも存在すれば、クリック待ち解除(false)するように
（「タイトルに戻りますか？」ボタンが効かない不具合）
## v0.9.4
- bug：prj.json の book要素などの解釈不具合
- add：const.sn.platform.os.family をJSON文字列による const.sn.platform にし、より多くの情報を提供
- bug：スマホでインライン画像アスペクト比が変わる対策
- bug：スマホで「451」などを縦中横した際に横幅が狭くなる件
- add：スマホ用疑似スワイプスクロール
## v0.9.3
- bug：skipすると文字リンクが押せなくなる件
## v0.9.2
- bug：[ch wait=0]のみの文字表示後、イベント待ちを行わない件
- bug：履歴に渡す「`」が「\`」になる
## v0.9.1
- add：特別な意味がある文字（&[;*｜《）や一文字マクロなどをそのまま表示できるエスケープ文字をprj.jsonに設定できるように
- bug：prj.jsonがエラー値に弱いので修正
- bug：ギャラリーで下部にスクロールして【RUN sample】ボタンを押して実行した際、インライン画像やクリック待ち記号がずれて表示される件
- chg：クラス構造やテストをリファクタリング
## v0.9.0
- add：[lay][span]にルビ揃え指定する r_align属性を追加
- bug：ギャラリーでフレームを表示し、他のサンプル表示すると残る
- bug：Safariのみ横書き文字が左にずれる件
- bug：[r][p]で一度クリックしないと[p]に行かない件
## v0.8.1
- bug：複数メッセージウインドウサンプルで、カレントでなくなった文字レイヤが半透明にならない件
- bug：ギャラリーでサンプル切り替え時に旧文字版が走る
- bug：[enable_event enabled=false]が効かない
- bug：履歴フレームの表示位置がずれる
## v0.8.0
- new：新文字表示技術、リリース
- add：履歴でも文字サイズ・背景色などstyle属性によるcss指定が反映されるように
- add：jsonの一要素を「.」表記で取り出せる書式、深い階層もサポート
- add：[rec_ch]仕様変更、text属性は必須でなくなり、その他属性を自由に指定できるように
- chg：save:const.sn.sLogを\f区切りではなくシンプルなjsonに（以前と非互換）（破壊的変更）内容が const.sn.log.json と同じに
- bug：const.sn.last_page_textが[current]文字レイヤの履歴テキストを返すように
- bug：[let_ml]不具合修正、内部的に改行などの数が変わる場合に対応
- bug：ルビ揃え指定と同時シリーズ（黒《center｜ヽ》）未作成、仮対応
- info：class Variableの自動テスト追加
## v0.7.2
- bug：テンプレのダイアログで文字が出ない件
- bug：レイヤ回転rotation属性で度ではなくラジアンで指定していた件
## v0.7.1
- bug：（新文字表示）複数メッセージウインドウ、フォーカスを失った方の文字が消える件
## v0.7.0
- labo：新文字表示技術実装中
- bug：初音館・桜テンプレで起動時エラーになる件
- add：[ch][link][span][graph]に style・wait・in_style・out_style属性追加（元からあればそれはそれ）
- add：[button]に文字ボタンでも背景画像を指定できる b_pic 属性を追加
- add：ダークモードか示す組み込み変数 const.sn.isDarkMode 追加、それによってエラーログの表示色変更
- add：タグリファレンス追記：[lay](文字レイヤ)[loadplugin][button]
## v0.6.29
- labo：新文字表示技術実装中：既読スキップ停止時、既読スキップするとクリック待ち記号が消える
- add：[event]でフレーム内テキストボックス・テキストエリアの入力やラジオボタンをサポート
- add：[add_frame][frame]に背景色指定の属性 b_color 追加
## v0.6.28
- bug：ギャラリーリロード時に＜head＞内にstyle要素がどんどん追加される件
- labo：新文字表示技術実装中：文字出現演出、画面外から飛んでくる系
- labo：新文字表示技術実装中：ページクリアせずの文字追加で、ルビなどが後からガクッとつまることがある件
- labo：新文字表示技術実装中：クリックキャンセル
- labo：新文字表示技術実装中：文字消去演出、join（文字を順番に出すか（true）同時か（false））
- labo：新文字表示技術実装中：文字表示スキップ
## v0.6.27
- add：jsonの一要素を「.」表記で取り出せる書式追加
	const.sn.sound.codecs = '{"aac": true, "flac": false}' という文字列が入っているとき、
	const.sn.sound.codecs.aac で true を返す。
- labo：文字出現演出を定義する[ch_in_style]追加（実装中）
- labo：文字レイヤの[lay]に文字出現演出を指定する in_style 属性追加（実装中）
- labo：新文字表示技術実装中
## v0.6.26
- labo：新文字表示技術実装中・スナップショット修正
## v0.6.25
- bug：Safariのみスナップショットが上下反転する件
## v0.6.24
- bug：クリック待ち表示位置がずれる件
## v0.6.23
- labo：新文字表示技術実装中
## v0.6.22
- bug：改ページ待ち中にギャラリーリロードで、異なるマークが同時に重なって表示される件
- bug：（つい最近の更新による）既読スキップで文字が消える
## v0.6.21
- bug：Fキースキップ中断ができない件
- bug：[trans]するたびに作業用＜span＞が増えていた件
- bug：ギャラリーでプロジェクトを切り替えるたびに＜span＞が増えていた件
- labo：新文字表示技術実装中
## v0.6.20
- bug：[call]→[return]したとき、行番号がずれる場合がある
- bug：無名ラベル修正
- labo：文字表示技術研究中
- upd：ライブラリ更新
## v0.6.19
- chg：フィルタ文字が重いのでPIXIフィルタではなくCSSで
- bug：サロゲートペア文字の扱いを修正・テスト追加
- labo：文字表示技術研究中
- upd：ライブラリ更新
## v0.6.18
- upd：ライブラリ更新
- upd：なるべく Nullish Coalescing を使用するように（TypeScript v3.7.2）
## v0.6.17
- chg：ライブラリ更新（pixi.jsを最新5.1.5に）
## v0.6.16
- upd：ライブラリ更新（pixi.js、@tweenjs/tween.js以外）
## v0.6.15
- chg：ライブラリダウングレード（@tweenjs/tween.js）
## v0.6.14
- chg：ライブラリ更新（@tweenjs/tween.js）
## v0.6.13
- chg：ホイールイベント名をAIRNovel準拠の UpWheel / DownWheel とする
- add：[event key=MiddleClick]追加
- chg：[tsy_frame]中はレイヤなどのイベントを受け付けないように
- add：タグリファレンス：[event]のkey属性の解説を更新（dom= など）
- add：タグリファレンス：HTMLフレーム系説明追加
## v0.6.12
- upd：ライブラリ更新
## v0.6.11
- chg：バック不透明度をテンプレでは0.5初期化、[clearsysvar]では1の齟齬、0.5に統一
- bug：[fadese(bgm)][fadeoutse(bgm)]でtime=0の際、stop指定が利かない件
## v0.6.10
- bug：ログ画面表示がundefinedになる件
- chg：const.sn.sLogをconst.sn.log.jsonに変名
## v0.6.9
- bug：[quake]終了時に内部バッファが 0,0 に戻らない件
## v0.6.8
- add：[lay]で開始したムービー再生の終了を待つ[wv]を追加
## v0.6.7
- bug：右クリックイベントが二回発生していた件
## v0.6.6
- chg：[save]のtxt属性をtext属性に変名
## v0.6.5
- bug：[ch record=false]でも履歴を更新してしまう件
- bug：セーブデータのサムネイルに出す文字が異常な件
## v0.6.4
- upd：[snapshot]修正、厳密な書き方に
## v0.6.3
- bug：アプリ版でスナップショットをセーブ出来ない件
## v0.6.2
- add：次のセーブplaceを示す変数 sys:const.sn.save.place 追加
- bug：ブラウザ版、sysなど保存した値が再起動で戻る件
## v0.6.1
- bug：[tsy][playse][fadese][tsy_frame]中に[l][p]などでクリック待ちすると、先に進まなくなる不具合
## v0.6.0
- add：スクリプト・sys:など変数データを暗号化・復号化する機能
- bug：テンプレ初回初期化時に無意味なダイアログが出る件
## v0.5.17
- bug：Winアプリ版で下部が短く背後が見える件
## v0.5.16
- upd：[toggle_full_screen] 全画面状態切替作り込み
- bug：ブラウザ版で全画面時にアルバム画面などのflameが小さいままな件
- bug：ブラウザ版でconst.sn.displayState値を設定していなかった件
## v0.5.15
- bug：全画面時にウインドウサイズが小さくなる件
- bug：全画面ではなくウインドウサイズ全画面化になっていた件
- bug：全画面時にflame系のサイズが小さい
- bug：全画面時に設定画面を開いてもスイッチが全画面でなくなる件
- bug：全画面からウインドウモードに戻った際に画面中央に移動してしまう件
- bug：右クリックしたまま要素を離れたときクリック扱いする動作が発生する件
## v0.5.14
- bug：ウインドウサイズが縦方向に短い不具合（Electron不具合ぽい）
## v0.5.12
- bug：Winアプリでウインドウの場所が保存・再現されない（MacはＯＫ）
- bug：Winアプリでウインドウを動かすたびに縦幅が狭くなっていく件対応
## v0.5.11
- chg：アプリ版も prj.json を参考にするように
- bug：アプリ版が起動しない不具合修正
## v0.5.10
- chg：プラグインsnsys_preを prj・path.json_ の為に先読みするように
- add：暗号化 prj・path.json_ 対応
- add：暗号化アニメjson_ 対応
- add：prj.json_も変更追従
## v0.5.9
- bug：暗号化スクリプトで[call fn=ext_*]などワイルドカード指定で不具合
## v0.5.8
- chg：prj.json の項目 save_ns が簡略化されたことに伴い、セーブデータに前置詞「skynovel.」を追加
- chg：prj.json の search セクションが不要になり、削除
- add：prj.json の init.bg_color に "#000000" 形式をサポート
## v0.5.6
- bug：チェックボタンに[event]登録すると、切り替えできなくなる不具合
- bug：エラーになり[let_frame]で値が取れない不具合
## v0.5.5
- bug：constructor引数のprotected変数宣言を修正
## v0.5.4
- add：スクリプトロードに復号機構追加
- chg：その他クラスインタフェイス追加・変更
- chg：constructor引数→変数宣言に readonly 追加
## v0.5.3
- add：[autowc]（文字ごとのウェイト）を追加、特定文字表示直後にウェイト
- add：上記機能設定値を保存するシステム変数追加
	save:const.sn.autowc.enabled、text、time
- upd：map()にする必要が無い部分をforEach()に修正（パフォーマンス）
- bug：pixi5で発生、ギャラリーでアニメSprite終了→別ゲーム起動時にエラー
- chg：pixi5で発生、ギャラリーでリロードボタン連打時に発生するエラー対策
## v0.5.2
- bug：pixi.js v5.0.3 でButtonのdropShadowColorに色名前が使えない不具合対応
## v0.5.1
- upd：pixi.js を v5.0.3 に更新
- bug：ルール画像による[trans]で中心がずれてる件
## v0.5.0
- add：最前面にデバッグ情報表示（エラーや[trace]の内容）
## v0.4.8
- bug：const.sn.bookmark.jsonの値にセーブデータキー値 place を追加
## v0.4.7
- bug：keydownイベントのイベント引数で、e.repeat を e.repeating としていた件
- bug：文字表示が乱れる件を修正・非同期処理改善
- add：スキップ時の高速文字表示処理作成
## v0.4.6
- bug：連打でカーソルが消えずに残る件
- add：[event key='dom=']系の要素が見つからないエラーのメッセージを詳細に
## v0.4.5
- bug：文字背景画像がキャッシュに残ってる際に停止する件
- bug：桜二周目、背景画像が出ない件
- chg：sn.Button.fontFamily を sn.button.fontFamily に変更
## v0.4.4
- add：文字ボタンフォントを指定するシステム変数 sn.Button.fontFamily 追加
## v0.4.2
- bug：画像レイヤ表示位置が再開時に再現されない件
## v0.4.1
- bug：pixi.jsオブジェクトへの右クリックで左クリックイベントと扱っていた件
- bug：クリック待ち中のみイベントを発生させるように
## v0.4.0
- bug：[dump_lay]による文字レイヤstyle表示で、cssTextではなくオブジェクト形式で表示するように
- add：組み込み変数 const.sn.lay.（レイヤ名）.（foreかback）.x と .y 追加
- chg：文字レイヤで[lay b_pic=null]という指定を不許可に。
	→エラーになる場合はスクリプトの「b_pic=null」を削除
- chg：タグやマクロに渡す属性に未定義値・変数を渡した場合、「そもそも渡さない」という挙動になるよう修正（AIRNovel的挙動）
## v0.3.10
- bug：先読み機構が悪さしてBGMが鳴らないので、凍結。
- bug：音量変更できない件（v0.3.9 にて発生）
- bug：起動時、保存していたグローバル音量値が復帰されず１になる件
## v0.3.9
- アプリ版[toggle_full_screen key=w]で処理しないように。ブラウザ用
- [event ... key=alt+enter]で大文字小文字関係なく指定できるように
- ブラウザ版[toggle_full_screen key=w]で全画面から戻れるように
- [toggle_full_screen key=...]でも修飾キーを使えるように
- ブラウザ版全画面で内容が左に寄る件、CSSで対応
## v0.3.8
- アプリ版で全画面にならず画面左一杯サイズになり、内容が左に寄る不具合
## v0.3.7
- [snapshot]でfn属性指定時にエラーになっていた件
## v0.3.6
- ロード時setChildIndex()で跳び番号indexでエラーになる場合の対応
- ロード時文字レイヤ、背景が表示されない件修正
## v0.3.5
- readonly・ReadonlyArrayや、URLSearchParamsを使用するように
## v0.3.4
- readonly修飾子を積極的に使うように
## v0.3.3
- ライブラリ更新、3Dレイヤ属性宣言変更など
## v0.3.2
- ギャラリーでのえもふり/Live 2D使用サンプル終了時、エラーになる件対応（遅延が必要）
## v0.3.1
- タグ・マクロリファレンス、開発者向け情報など統合
## v0.3.0
- プラグインインタフェイスに変数取得 getVal() 追加
- プラグインインタフェイスにメインループ停止からの復帰 resume() 追加
- プラグインインタフェイスにPIXI.(WebGL|Canvas)Rendererの render() 追加
## v0.2.8
- 機能ギャラリーのようなプロジェクトを切り替えられる状況で、【画面を揺らす】してる最中に【トゥイーンアニメを行なう】と、'remove' of null エラーになる件修正
## v0.2.7
- 不要なプロジェクトを削除
## v0.2.6
- （拡張機能が担当するので）スプライトシート用json自動生成機能を削除
## v0.2.5
- ライブラリ更新、SysNodeリファクタリング
## v0.2.4
- frame系がリサイズされてない件修正
## v0.2.3
- ライブラリ最新反映
## v0.2.2
- 画面に対して表示が大きい件修正（frame以外）
- アプリがバックグラウンドに移行した時・スリープした時、PIXIをstop()、また再開させる機構
## v0.2.1
- モバイル版作成中：iOS、過ぎ去った前を見る肯定後読み「(?＜=」がエラーになるので記述変更
## v0.2.0
- モバイル版作成中
## v0.1.12
- [button style=]を指定すると、ボタンの一部しか表示されない不具合
## v0.1.11
- プラグインインタフェイス【searchPath】追加
## v0.1.10
- プラグインでオリジナルレイヤ追加機構
- プロジェクトに型宣言(types / *.d.ts)追加
## v0.1.9
- ブラウザ版で機能ギャラリー対応・修正
## v0.1.8
- ブラウザ版で機能ギャラリー対応
## v0.1.7
- アプリ版でエラーになる件修正
## v0.1.6
- プラグイン機構追加（メッセージ用など、最も基本的でシンプルなインタフェイスで）
## v0.1.5
- 使ってなかった ts-node 削除、テスト通し
## v0.1.3
- プラグインや３Ｄなど無し状態で動作を確認
## v0.1.1
- 手直し中
## v0.1.0
- npmライブラリ化
- Initial commit
