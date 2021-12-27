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
- memo: 既知の問題：
	- 連打時にBGMが残り多重化してしまう件
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
- memo: 【後に解消】既知の問題：
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
- bug：ギャラリーリロード時に<head>内にstyle要素がどんどん追加される件
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
- bug：[trans]するたびに作業用<span>が増えていた件
- bug：ギャラリーでプロジェクトを切り替えるたびに<span>が増えていた件
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
- モバイル版作成中：iOS、過ぎ去った前を見る肯定後読み「(?<=」がエラーになるので記述変更
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
