# SKYNovel
[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/famibee/SKYNovel/blob/master/LICENSE)
![](https://img.shields.io/badge/platform-windows%20%7C%20macos-lightgrey.svg)

WebGL NovelGame framework by PixiJS

![logo.svg](test/icon.svg)

[CHANGELOG.md](https://github.com/famibee/SKYNovel/blob/master/CHANGELOG.md)

---
## description（説明）

- [コンセプトスライド](http://ugainovel.hiho.jp/skynovel/web.htm)
- [機能ギャラリー](http://ugainovel.hiho.jp/skynovel/gallery/)

## install ... npm i skynovel

## example

- Package
	- [simple sample project](https://github.com/famibee/SKYNovel_sample)
	- [Novelgame(Tate-gaki) sample project](https://github.com/famibee/SKYNovel_uc)

- Hello world（最小限のファイルによるプロジェクト）
	- webpack ... require("skynovel/core/lib/web")	// (on browser)

	- prj/prj.json
	>```json
	>{
	>	"save_ns": "skynovel.firstdaze",
	>	"search": ["mat"],
	>	"window": {
	>		"width": 300,
	>		"height": 300
	>	},
	>}
	>```
	- prj/mat/main.sn
	>```
	>[add_lay layer=mes class=txt]
	>
	>Hello world ![r]
	>雷《いかづち》の指《ゆび》でヒゲ焦し
	>[s]
	>```

---
## api (method)

(making...)

- [機能紹介]()
- [タグリファレンス]()
- [組み込み変数]()

---
## License ... [MIT](LICENSE)

---
## Famibee is ?
- [WebSite : 電子演劇部](https://famibee.blog.fc2.com/)
- [Github](https://github.com/famibee/SKYNovel)
- [npm](https://www.npmjs.com/package/skynovel)
- Twitter ([夕街昇雪](https://ugainovel.blog.fc2.com/))
