function int(n) {
  return parseInt(String(n), 10);
}
function uint(n) {
  const e = parseInt(String(n), 10);
  return e < 0 ? -e : e;
}
"toInt" in String.prototype || (String.prototype.toInt = function() {
  return int(this);
});
"toUint" in String.prototype || (String.prototype.toUint = function() {
  const n = int(this);
  return n < 0 ? -n : n;
});
function getDateStr(n = "/", e = " ", t = ":", r = "") {
  const a = /* @__PURE__ */ new Date();
  return String(a.getFullYear()) + n + String(100 + a.getMonth() + 1).slice(1, 3) + n + String(100 + a.getDate()).slice(1, 3) + e + String(100 + a.getHours()).slice(1, 3) + t + String(100 + a.getMinutes()).slice(1, 3) + (r === "" ? "" : r + String(a.getMilliseconds()));
}
const css_key4del = "/* SKYNovel */";
function initStyle() {
  const n = document.getElementsByTagName("head")[0], e = n.children.length;
  for (let t = e - 1; t >= 0; --t) {
    const r = n.children[t];
    r instanceof HTMLStyleElement && r.innerText.startsWith(css_key4del) && n.removeChild(r);
  }
}
function addStyle(n) {
  const e = document.createElement("style");
  e.innerHTML = css_key4del + n, document.getElementsByTagName("head")[0].appendChild(e);
}
const EVNM_BUTTON = "pointerdown", EVNM_CLICK = "pointerdown", EVNM_KEY = "keydown", RPN_COMP_CHIN = "compChIn";
function argChk_Num(n, e, t) {
  const r = n[e];
  if (!(e in n)) {
    if (isNaN(t)) throw `[${n[":タグ名"] ?? ""}]属性 ${e} は必須です`;
    return n[e] = t, t;
  }
  const a = String(r).startsWith("0x") ? parseInt(r) : parseFloat(r);
  if (isNaN(a)) throw `[${n[":タグ名"] ?? ""}]属性 ${e} の値【${String(r)}】が数値ではありません`;
  return n[e] = a, a;
}
function argChk_Boolean(n, e, t) {
  if (!(e in n))
    return n[e] = t, t;
  const r = n[e];
  if (r === null) return !1;
  const a = String(r);
  return n[e] = a === "false" ? !1 : !!a;
}
function parseColor(n) {
  if (n.startsWith("#")) return parseInt(n.slice(1), 16);
  const e = Number(n);
  if (!isNaN(e)) return e;
  if (n === "black") return 0;
  CmnLib.cc4ColorName.fillStyle = n;
  const t = CmnLib.cc4ColorName.fillStyle;
  if (t === "#000000") throw `色名前 ${n} が異常です`;
  return parseInt(t.slice(1), 16);
}
function argChk_Color(n, e, t) {
  const r = n[e];
  return r ? n[e] = parseColor(String(r)) : (n[e] = t, t);
}
const REG_ERRMES_JSON = /JSON at position (\d+)$/;
function mesErrJSON(n, e = "", t = "") {
  const r = (REG_ERRMES_JSON.exec(t) ?? ["", ""])[1];
  return `[${n[":タグ名"] ?? ""}] ${e} 属性の解析エラー : ${t}
${// eslint-disable-next-line @typescript-eslint/no-base-to-string
  String(n[e])}${r ? `
${"^".padStart(Number(r))}` : ""}`;
}
const REG_FN = /^[^/.]+$|[^/]+(?=\.)/;
function getFn(n) {
  return (REG_FN.exec(n) ?? [""])[0];
}
class CmnLib {
  static async init() {
    const e = await import("./platform.js").then((t) => t.p);
    this.platform = JSON.stringify(e), this.plat_desc = e.description ?? "", this.isSafari = e.name === "Safari", this.isFirefox = e.name === "Firefox", this.isMac = (e.os?.family ?? "").includes("OS X"), this.isMobile = !/(Windows|OS X)/.test(e.os?.family ?? "");
  }
  static stageW = 0;
  static stageH = 0;
  static debugLog = !1;
  static platform;
  static plat_desc;
  static isSafari;
  static isFirefox;
  static isMac;
  static isMobile;
  static hDip = {};
  static isDbg = !1;
  static isPackaged = !1;
  static needClick2Play() {
    return "AudioContext" in globalThis ? (CmnLib.#t = new globalThis.AudioContext(), CmnLib.needClick2Play = () => CmnLib.#t.state === "suspended") : CmnLib.needClick2Play = () => !1, CmnLib.needClick2Play();
  }
  static #t;
  static isDarkMode = !1;
  static cc4ColorName;
}
function creSAVEDATA() {
  return {
    "sn.userFnTail": "",
    "const.sn.autowc.enabled": !1,
    // （文字ごとのウェイト）enabled属性で指定した値。
    "const.sn.autowc.text": "",
    // （文字ごとのウェイト）同名属性で指定した値。
    "const.sn.autowc.time": 0,
    // textとtimeは常に同数にすること
    "const.sn.mesLayer": "",
    // デフォルト文字レイヤ
    // 'const.sn.sound.【buf】.fn'	: '',	// サウンドバッファの再生ファイル名
    // 'const.sn.sound.【buf】.volume'	: 1,// サウンドバッファの目標音量
    "const.sn.styPaging": "color: yellow; text-shadow: 1px 1px 0 #000, -1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000;",
    // ページ遷移中 CSS スタイル
    "sn.doRecLog": !1,
    // テキストを履歴に記録するか
    "const.sn.sLog": "[]",
    // 履歴テキスト（JSON文字列）
    "const.sn.loopPlaying": "{}",
    // ループ中のサウンドバッファ
    "const.sn.scriptFn": "",
    // 最後に[record_place]したスクリプト名
    "const.sn.scriptIdx": 0
    // 最後に[record_place]したスクリプトインデックス（行番号ではなく内部トークン単位）
    // 'const.sn.layer.（文字レイヤ名）.enabled'	: true,	// 文字レイヤのenabled値
  };
}
function creSYS_DATA() {
  return {
    "const.sn.cfg.ns": "",
    // [import]時のチェック用
    "const.sn.aPageLog": "[]",
    // ページ遷移用情報（JSON文字列）
    "const.sn.nativeWindow.x": 0,
    // 実数；横座標
    "const.sn.nativeWindow.y": 0,
    // 実数；縦座標
    "const.sn.nativeWindow.w": CmnLib.stageW,
    // 実数；横幅
    "const.sn.nativeWindow.h": CmnLib.stageH,
    // 実数；縦幅
    "const.sn.save.place": 1,
    // 次のセーブplaceを示す
    "const.sn.sound.BGM.volume": 1,
    // BGMの基準音量（buf="BGM"の効果音）
    "const.sn.sound.SE.volume": 1,
    // 効果音の基準音量（buf="SE"の効果音）
    "const.sn.sound.SYS.volume": 1,
    // システムの基準音量（buf="SYS"の効果音）
    // 'const.sn.sound.【buf】.volume': 1,	// システムの基準音量（buf="【buf】"の効果音）
    "sn.auto.msecLineWait": 500,
    // 未読テキストの改行待ち時間（ミリ秒）
    "sn.auto.msecLineWait_Kidoku": 500,
    // 既読テキストの改行待ち時間（ミリ秒）
    "sn.auto.msecPageWait": 3500,
    // 未読テキストの改ページ待ち時間（ミリ秒）
    "sn.auto.msecPageWait_Kidoku": 3500,
    // 既読テキストの改ページ待ち時間（ミリ秒）
    "sn.skip.mode": "s",
    // スキップモード。
    "sn.sound.BGM.vol_mul_talking": 1,
    // ボイス（VOICEバッファの音声）再生中のBGM音量への乗数
    "sn.sound.global_volume": (n, e) => 1,
    // 全体的な音量を設定する
    "sn.sound.movie_volume": (n, e) => 1,
    // ムービー音量を設定する
    "sn.tagCh.canskip": !0,
    // テキストをクリックなどでスキップ可能か
    "sn.tagCh.doWait": !0,
    // 未読テキストにウェイトを掛けるか
    "sn.tagCh.doWait_Kidoku": !0,
    // 既読テキストにウェイトを掛けるか
    "sn.tagCh.msecWait": 10,
    // 未読テキスト待ち時間（ミリ秒）
    "sn.tagCh.msecWait_Kidoku": 10,
    // 既読テキスト待ち時間（ミリ秒）
    "TextLayer.Back.Alpha": 0.5
    // バック不透明度。テキストウインドウの背景の濃度。0.0で透明、1.0で不透明
  };
}
function creTMP_DATA() {
  return {
    "const.Date.getDateStr": () => getDateStr(),
    // 変数参照時の日時を返す
    "const.Date.getTime": () => (/* @__PURE__ */ new Date()).getTime(),
    "const.sn.bookmark.json": "[]",
    // SKYNovel内部によるsave:の管理用
    // 'const.sn.config.（略）'	: ,	// prj.jsonの内容を返す
    "const.sn.config.window.width": 0,
    "const.sn.config.window.height": 0,
    "const.sn.config.book.title": "",
    "const.sn.config.book.version": "",
    "const.sn.displayState": !1,
    // ウインドウ・フルスクリーン状態。trueならフルスクリーン
    // 'const.sn.frm.（フレーム名）'	: true,	// [add_frame]でロードされた id属性が存在するか
    // 'const.sn.frm.（フレーム名）.alpha'	: 1,	// フレームの不透明度
    // 'const.sn.frm.（フレーム名）.x'		: 0,	// フレームの座標。画面左上を(0, 0)とする座標。leftやtopでないことに注意
    // 'const.sn.frm.（フレーム名）.y'		: 0,	// 実数；縦座標
    // 'const.sn.frm.（フレーム名）.scale_x': 1,	// cssでのtransform: scaleの値
    // 'const.sn.frm.（フレーム名）.scale_y': 1,	// cssでのtransform: scaleの値
    // 'const.sn.frm.（フレーム名）.rotate'	: 0,	// cssでのrotate、回転角度（単位：deg 度）、正の値は時計回り
    // 'const.sn.frm.（フレーム名）.width'	: prjのアプリ横幅画面サイズ,	// フレームの横幅
    // 'const.sn.frm.（フレーム名）.height'	: prjのアプリ縦幅画面サイズ,	// フレームの縦幅
    // 'const.sn.frm.（フレーム名）.visible': true,	// フレームが表示されているか。visible属性の値を返す
    "const.sn.isApp": !1,
    // アプリ版か
    "const.sn.isDbg": !1,
    // デバッグモードか
    "const.sn.isPackaged": !1,
    // パッケージされたアプリか(Electron API - app.isPackaged)
    "const.sn.isPaging": !1,
    // ページ遷移状態か
    "const.sn.isDarkMode": !1,
    // ダークモードか
    "const.sn.isDebugger": !0,
    // ブラウザ実行、それもVSCode・npmによる「起動：ブラウザ版」上での実行か
    "const.sn.isFirstBoot": !0,
    // ゲームがインストールされてから、初めての起動か（起動されるまでデータが空だったか）
    "const.sn.isKidoku": !0,
    // この変数を参照した位置は既読か。参照「後」必ず既読になる点に注意
    "const.sn.key.alternate": !1,
    // ALTキー（MacならOptionキー）が押されているか
    "const.sn.key.back": !1,
    // back 〃
    "const.sn.key.command": !1,
    // command 〃
    "const.sn.key.control": !1,
    // control 〃
    "const.sn.key.end": !1,
    // end 〃
    "const.sn.key.escape": !1,
    // escape 〃
    "const.sn.last_page_plain_text": "",
    // そのページの履歴テキスト（《》文法とルビを含まない）
    "const.sn.last_page_text": "",
    // そのページの履歴テキスト（《》文法もそのまま）
    // 'const.sn.lay.（レイヤ名）'		: true,	// レイヤが[add_lay]され存在するか
    // 'const.sn.lay.（レイヤ名）.（foreかback）.alpha'		: 0.0〜1.0,	// レイヤの不透明度
    // 'const.sn.lay.（レイヤ名）.（foreかback）.width'		: 1,	// レイヤの横幅。ただし文字レイヤの場合は1、画像レイヤの場合、画像読込後でないと0
    // 'const.sn.lay.（レイヤ名）.（foreかback）.height'		: 1,	// レイヤの縦幅。ただし文字レイヤの場合は1、画像レイヤの場合、画像読込後でないと0
    // 'const.sn.lay.（レイヤ名）.（foreかback）.visible'		: true,	// レイヤが表示されているか。visible属性の値を返す
    // 'const.sn.lay.（レイヤ名）.（foreかback）.x'		: 0,	// 実数；横座標</td><td rowspan="2">レイヤの座標。画面左上を(0, 0)とする座標。leftやtopでないことに注意
    // 'const.sn.lay.（レイヤ名）.（foreかback）.y'		: 0,	// 実数；縦座標
    "const.sn.Math.PI": Math.PI,
    // 円周率
    "const.sn.navigator.language": "jp",
    // ユーザーが最優先に設定している言語設定
    "const.sn.needClick2Play": !1,
    // ブラウザ実行で、クリックされるまで音声再生が差し止められている状態か。なにかクリックされれば falseになる
    "const.sn.platform": CmnLib.platform,
    // 環境による
    "const.sn.screenResolutionX": screen.availWidth,
    // 画面の最大水平解像度
    "const.sn.screenResolutionY": screen.availHeight,
    // 画面の最大垂直解像度
    // ここでは正確な値は分からない。保存していた前回終了時の位置にウインドウを動かしてから、そのディスプレイののサイズを取得するまでは。
    "const.sn.sound.codecs": "",
    // ゲーム実行環境がどのコーデックをサポートしているか
    // 'const.sn.sound.【buf】.playing'		: 再生状態による,	// サウンドバッファが再生中か<br/>
    "const.sn.aIfStk.length": 1,
    // IFスタックの深さ（[if]するたびに増）
    "const.sn.vctCallStk.length": 0,
    // コールスタックの深さ（[call]するたびに増）
    "sn.auto.enabled": !1,
    // 自動読みすすみモードかどうか
    "sn.button.fontFamily": "'Hiragino Sans', 'Hiragino Kaku Gothic ProN', '游ゴシック Medium', meiryo, sans-serif",
    // 文字ボタンフォントを指定
    // 'sn.event.domdata.（任意）'		: ''[event]でフレーム内のHTML要素に登録したイベントで、そのイベント発生時、HTML要素のdata-（任意）属性で指定された値。使い道は開発者が自由に決めていい
    "sn.eventArg": "",
    // [button]等のイベント発生時、そのボタンタグのarg属性で指定された値。使い道は開発者が自由に決めていい
    "sn.eventLabel": "",
    // [button]等のイベント発生時、そのボタンタグのlabel属性で指定された値。使い道は開発者が自由に決めていい
    "sn.skip.all": !1,
    // false（初期値）なら既読のみをスキップ
    "sn.skip.enabled": !1,
    // 次の選択肢(/未読)まで進む が有効か
    "sn.tagL.enabled": !0
    // 頁末まで一気に読み進むか(l無視)
  };
}
function finallyConstructor(n) {
  var e = this.constructor;
  return this.then(
    function(t) {
      return e.resolve(n()).then(function() {
        return t;
      });
    },
    function(t) {
      return e.resolve(n()).then(function() {
        return e.reject(t);
      });
    }
  );
}
function allSettled(n) {
  var e = this;
  return new e(function(t, r) {
    if (!(n && typeof n.length < "u"))
      return r(
        new TypeError(
          typeof n + " " + n + " is not iterable(cannot read property Symbol(Symbol.iterator))"
        )
      );
    var a = Array.prototype.slice.call(n);
    if (a.length === 0) return t([]);
    var o = a.length;
    function s(h, l) {
      if (l && (typeof l == "object" || typeof l == "function")) {
        var c = l.then;
        if (typeof c == "function") {
          c.call(
            l,
            function(v) {
              s(h, v);
            },
            function(v) {
              a[h] = { status: "rejected", reason: v }, --o === 0 && t(a);
            }
          );
          return;
        }
      }
      a[h] = { status: "fulfilled", value: l }, --o === 0 && t(a);
    }
    for (var u = 0; u < a.length; u++)
      s(u, a[u]);
  });
}
function AggregateError$1(n, e) {
  this.name = "AggregateError", this.errors = n, this.message = e || "";
}
AggregateError$1.prototype = Error.prototype;
function any(n) {
  var e = this;
  return new e(function(t, r) {
    if (!(n && typeof n.length < "u"))
      return r(new TypeError("Promise.any accepts an array"));
    var a = Array.prototype.slice.call(n);
    if (a.length === 0) return r();
    for (var o = [], s = 0; s < a.length; s++)
      try {
        e.resolve(a[s]).then(t).catch(function(u) {
          o.push(u), o.length === a.length && r(
            new AggregateError$1(
              o,
              "All promises were rejected"
            )
          );
        });
      } catch (u) {
        r(u);
      }
  });
}
var setTimeoutFunc = setTimeout;
function isArray(n) {
  return !!(n && typeof n.length < "u");
}
function noop() {
}
function bind(n, e) {
  return function() {
    n.apply(e, arguments);
  };
}
function Promise$1(n) {
  if (!(this instanceof Promise$1))
    throw new TypeError("Promises must be constructed via new");
  if (typeof n != "function") throw new TypeError("not a function");
  this._state = 0, this._handled = !1, this._value = void 0, this._deferreds = [], doResolve(n, this);
}
function handle(n, e) {
  for (; n._state === 3; )
    n = n._value;
  if (n._state === 0) {
    n._deferreds.push(e);
    return;
  }
  n._handled = !0, Promise$1._immediateFn(function() {
    var t = n._state === 1 ? e.onFulfilled : e.onRejected;
    if (t === null) {
      (n._state === 1 ? resolve : reject)(e.promise, n._value);
      return;
    }
    var r;
    try {
      r = t(n._value);
    } catch (a) {
      reject(e.promise, a);
      return;
    }
    resolve(e.promise, r);
  });
}
function resolve(n, e) {
  try {
    if (e === n)
      throw new TypeError("A promise cannot be resolved with itself.");
    if (e && (typeof e == "object" || typeof e == "function")) {
      var t = e.then;
      if (e instanceof Promise$1) {
        n._state = 3, n._value = e, finale(n);
        return;
      } else if (typeof t == "function") {
        doResolve(bind(t, e), n);
        return;
      }
    }
    n._state = 1, n._value = e, finale(n);
  } catch (r) {
    reject(n, r);
  }
}
function reject(n, e) {
  n._state = 2, n._value = e, finale(n);
}
function finale(n) {
  n._state === 2 && n._deferreds.length === 0 && Promise$1._immediateFn(function() {
    n._handled || Promise$1._unhandledRejectionFn(n._value);
  });
  for (var e = 0, t = n._deferreds.length; e < t; e++)
    handle(n, n._deferreds[e]);
  n._deferreds = null;
}
function Handler(n, e, t) {
  this.onFulfilled = typeof n == "function" ? n : null, this.onRejected = typeof e == "function" ? e : null, this.promise = t;
}
function doResolve(n, e) {
  var t = !1;
  try {
    n(
      function(r) {
        t || (t = !0, resolve(e, r));
      },
      function(r) {
        t || (t = !0, reject(e, r));
      }
    );
  } catch (r) {
    if (t) return;
    t = !0, reject(e, r);
  }
}
Promise$1.prototype.catch = function(n) {
  return this.then(null, n);
};
Promise$1.prototype.then = function(n, e) {
  var t = new this.constructor(noop);
  return handle(this, new Handler(n, e, t)), t;
};
Promise$1.prototype.finally = finallyConstructor;
Promise$1.all = function(n) {
  return new Promise$1(function(e, t) {
    if (!isArray(n))
      return t(new TypeError("Promise.all accepts an array"));
    var r = Array.prototype.slice.call(n);
    if (r.length === 0) return e([]);
    var a = r.length;
    function o(u, h) {
      try {
        if (h && (typeof h == "object" || typeof h == "function")) {
          var l = h.then;
          if (typeof l == "function") {
            l.call(
              h,
              function(c) {
                o(u, c);
              },
              t
            );
            return;
          }
        }
        r[u] = h, --a === 0 && e(r);
      } catch (c) {
        t(c);
      }
    }
    for (var s = 0; s < r.length; s++)
      o(s, r[s]);
  });
};
Promise$1.any = any;
Promise$1.allSettled = allSettled;
Promise$1.resolve = function(n) {
  return n && typeof n == "object" && n.constructor === Promise$1 ? n : new Promise$1(function(e) {
    e(n);
  });
};
Promise$1.reject = function(n) {
  return new Promise$1(function(e, t) {
    t(n);
  });
};
Promise$1.race = function(n) {
  return new Promise$1(function(e, t) {
    if (!isArray(n))
      return t(new TypeError("Promise.race accepts an array"));
    for (var r = 0, a = n.length; r < a; r++)
      Promise$1.resolve(n[r]).then(e, t);
  });
};
Promise$1._immediateFn = // @ts-ignore
typeof setImmediate == "function" && function(n) {
  setImmediate(n);
} || function(n) {
  setTimeoutFunc(n, 0);
};
Promise$1._unhandledRejectionFn = function(e) {
  typeof console < "u" && console && console.warn("Possible Unhandled Promise Rejection:", e);
};
var commonjsGlobal = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function getDefaultExportFromCjs(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
function getAugmentedNamespace(n) {
  if (Object.prototype.hasOwnProperty.call(n, "__esModule")) return n;
  var e = n.default;
  if (typeof e == "function") {
    var t = function r() {
      var a = !1;
      try {
        a = this instanceof r;
      } catch {
      }
      return a ? Reflect.construct(e, arguments, this.constructor) : e.apply(this, arguments);
    };
    t.prototype = e.prototype;
  } else t = {};
  return Object.defineProperty(t, "__esModule", { value: !0 }), Object.keys(n).forEach(function(r) {
    var a = Object.getOwnPropertyDescriptor(n, r);
    Object.defineProperty(t, r, a.get ? a : {
      enumerable: !0,
      get: function() {
        return n[r];
      }
    });
  }), t;
}
var objectAssign$1, hasRequiredObjectAssign;
function requireObjectAssign() {
  if (hasRequiredObjectAssign) return objectAssign$1;
  hasRequiredObjectAssign = 1;
  var n = Object.getOwnPropertySymbols, e = Object.prototype.hasOwnProperty, t = Object.prototype.propertyIsEnumerable;
  function r(o) {
    if (o == null)
      throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(o);
  }
  function a() {
    try {
      if (!Object.assign)
        return !1;
      var o = new String("abc");
      if (o[5] = "de", Object.getOwnPropertyNames(o)[0] === "5")
        return !1;
      for (var s = {}, u = 0; u < 10; u++)
        s["_" + String.fromCharCode(u)] = u;
      var h = Object.getOwnPropertyNames(s).map(function(c) {
        return s[c];
      });
      if (h.join("") !== "0123456789")
        return !1;
      var l = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(c) {
        l[c] = c;
      }), Object.keys(Object.assign({}, l)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return objectAssign$1 = a() ? Object.assign : function(o, s) {
    for (var u, h = r(o), l, c = 1; c < arguments.length; c++) {
      u = Object(arguments[c]);
      for (var v in u)
        e.call(u, v) && (h[v] = u[v]);
      if (n) {
        l = n(u);
        for (var d = 0; d < l.length; d++)
          t.call(u, l[d]) && (h[l[d]] = u[l[d]]);
      }
    }
    return h;
  }, objectAssign$1;
}
var objectAssignExports = requireObjectAssign();
const objectAssign = /* @__PURE__ */ getDefaultExportFromCjs(objectAssignExports);
typeof globalThis > "u" && (typeof self < "u" ? self.globalThis = self : typeof global < "u" && (global.globalThis = global));
globalThis.Promise || (globalThis.Promise = Promise$1);
Object.assign || (Object.assign = objectAssign);
var ONE_FRAME_TIME = 16;
Date.now && Date.prototype.getTime || (Date.now = function() {
  return (/* @__PURE__ */ new Date()).getTime();
});
if (!(globalThis.performance && globalThis.performance.now)) {
  var startTime_1 = Date.now();
  globalThis.performance || (globalThis.performance = {}), globalThis.performance.now = function() {
    return Date.now() - startTime_1;
  };
}
var lastTime = Date.now(), vendors = ["ms", "moz", "webkit", "o"];
for (var x = 0; x < vendors.length && !globalThis.requestAnimationFrame; ++x) {
  var p = vendors[x];
  globalThis.requestAnimationFrame = globalThis[p + "RequestAnimationFrame"], globalThis.cancelAnimationFrame = globalThis[p + "CancelAnimationFrame"] || globalThis[p + "CancelRequestAnimationFrame"];
}
globalThis.requestAnimationFrame || (globalThis.requestAnimationFrame = function(n) {
  if (typeof n != "function")
    throw new TypeError(n + "is not a function");
  var e = Date.now(), t = ONE_FRAME_TIME + lastTime - e;
  return t < 0 && (t = 0), lastTime = e, globalThis.self.setTimeout(function() {
    lastTime = Date.now(), n(performance.now());
  }, t);
});
globalThis.cancelAnimationFrame || (globalThis.cancelAnimationFrame = function(n) {
  return clearTimeout(n);
});
Math.sign || (Math.sign = function(e) {
  return e = Number(e), e === 0 || isNaN(e) ? e : e > 0 ? 1 : -1;
});
Number.isInteger || (Number.isInteger = function(e) {
  return typeof e == "number" && isFinite(e) && Math.floor(e) === e;
});
globalThis.ArrayBuffer || (globalThis.ArrayBuffer = Array);
globalThis.Float32Array || (globalThis.Float32Array = Array);
globalThis.Uint32Array || (globalThis.Uint32Array = Array);
globalThis.Uint16Array || (globalThis.Uint16Array = Array);
globalThis.Uint8Array || (globalThis.Uint8Array = Array);
globalThis.Int32Array || (globalThis.Int32Array = Array);
var ENV;
(function(n) {
  n[n.WEBGL_LEGACY = 0] = "WEBGL_LEGACY", n[n.WEBGL = 1] = "WEBGL", n[n.WEBGL2 = 2] = "WEBGL2";
})(ENV || (ENV = {}));
var RENDERER_TYPE;
(function(n) {
  n[n.UNKNOWN = 0] = "UNKNOWN", n[n.WEBGL = 1] = "WEBGL", n[n.CANVAS = 2] = "CANVAS";
})(RENDERER_TYPE || (RENDERER_TYPE = {}));
var BUFFER_BITS;
(function(n) {
  n[n.COLOR = 16384] = "COLOR", n[n.DEPTH = 256] = "DEPTH", n[n.STENCIL = 1024] = "STENCIL";
})(BUFFER_BITS || (BUFFER_BITS = {}));
var BLEND_MODES;
(function(n) {
  n[n.NORMAL = 0] = "NORMAL", n[n.ADD = 1] = "ADD", n[n.MULTIPLY = 2] = "MULTIPLY", n[n.SCREEN = 3] = "SCREEN", n[n.OVERLAY = 4] = "OVERLAY", n[n.DARKEN = 5] = "DARKEN", n[n.LIGHTEN = 6] = "LIGHTEN", n[n.COLOR_DODGE = 7] = "COLOR_DODGE", n[n.COLOR_BURN = 8] = "COLOR_BURN", n[n.HARD_LIGHT = 9] = "HARD_LIGHT", n[n.SOFT_LIGHT = 10] = "SOFT_LIGHT", n[n.DIFFERENCE = 11] = "DIFFERENCE", n[n.EXCLUSION = 12] = "EXCLUSION", n[n.HUE = 13] = "HUE", n[n.SATURATION = 14] = "SATURATION", n[n.COLOR = 15] = "COLOR", n[n.LUMINOSITY = 16] = "LUMINOSITY", n[n.NORMAL_NPM = 17] = "NORMAL_NPM", n[n.ADD_NPM = 18] = "ADD_NPM", n[n.SCREEN_NPM = 19] = "SCREEN_NPM", n[n.NONE = 20] = "NONE", n[n.SRC_OVER = 0] = "SRC_OVER", n[n.SRC_IN = 21] = "SRC_IN", n[n.SRC_OUT = 22] = "SRC_OUT", n[n.SRC_ATOP = 23] = "SRC_ATOP", n[n.DST_OVER = 24] = "DST_OVER", n[n.DST_IN = 25] = "DST_IN", n[n.DST_OUT = 26] = "DST_OUT", n[n.DST_ATOP = 27] = "DST_ATOP", n[n.ERASE = 26] = "ERASE", n[n.SUBTRACT = 28] = "SUBTRACT", n[n.XOR = 29] = "XOR";
})(BLEND_MODES || (BLEND_MODES = {}));
var DRAW_MODES;
(function(n) {
  n[n.POINTS = 0] = "POINTS", n[n.LINES = 1] = "LINES", n[n.LINE_LOOP = 2] = "LINE_LOOP", n[n.LINE_STRIP = 3] = "LINE_STRIP", n[n.TRIANGLES = 4] = "TRIANGLES", n[n.TRIANGLE_STRIP = 5] = "TRIANGLE_STRIP", n[n.TRIANGLE_FAN = 6] = "TRIANGLE_FAN";
})(DRAW_MODES || (DRAW_MODES = {}));
var FORMATS;
(function(n) {
  n[n.RGBA = 6408] = "RGBA", n[n.RGB = 6407] = "RGB", n[n.RG = 33319] = "RG", n[n.RED = 6403] = "RED", n[n.RGBA_INTEGER = 36249] = "RGBA_INTEGER", n[n.RGB_INTEGER = 36248] = "RGB_INTEGER", n[n.RG_INTEGER = 33320] = "RG_INTEGER", n[n.RED_INTEGER = 36244] = "RED_INTEGER", n[n.ALPHA = 6406] = "ALPHA", n[n.LUMINANCE = 6409] = "LUMINANCE", n[n.LUMINANCE_ALPHA = 6410] = "LUMINANCE_ALPHA", n[n.DEPTH_COMPONENT = 6402] = "DEPTH_COMPONENT", n[n.DEPTH_STENCIL = 34041] = "DEPTH_STENCIL";
})(FORMATS || (FORMATS = {}));
var TARGETS;
(function(n) {
  n[n.TEXTURE_2D = 3553] = "TEXTURE_2D", n[n.TEXTURE_CUBE_MAP = 34067] = "TEXTURE_CUBE_MAP", n[n.TEXTURE_2D_ARRAY = 35866] = "TEXTURE_2D_ARRAY", n[n.TEXTURE_CUBE_MAP_POSITIVE_X = 34069] = "TEXTURE_CUBE_MAP_POSITIVE_X", n[n.TEXTURE_CUBE_MAP_NEGATIVE_X = 34070] = "TEXTURE_CUBE_MAP_NEGATIVE_X", n[n.TEXTURE_CUBE_MAP_POSITIVE_Y = 34071] = "TEXTURE_CUBE_MAP_POSITIVE_Y", n[n.TEXTURE_CUBE_MAP_NEGATIVE_Y = 34072] = "TEXTURE_CUBE_MAP_NEGATIVE_Y", n[n.TEXTURE_CUBE_MAP_POSITIVE_Z = 34073] = "TEXTURE_CUBE_MAP_POSITIVE_Z", n[n.TEXTURE_CUBE_MAP_NEGATIVE_Z = 34074] = "TEXTURE_CUBE_MAP_NEGATIVE_Z";
})(TARGETS || (TARGETS = {}));
var TYPES;
(function(n) {
  n[n.UNSIGNED_BYTE = 5121] = "UNSIGNED_BYTE", n[n.UNSIGNED_SHORT = 5123] = "UNSIGNED_SHORT", n[n.UNSIGNED_SHORT_5_6_5 = 33635] = "UNSIGNED_SHORT_5_6_5", n[n.UNSIGNED_SHORT_4_4_4_4 = 32819] = "UNSIGNED_SHORT_4_4_4_4", n[n.UNSIGNED_SHORT_5_5_5_1 = 32820] = "UNSIGNED_SHORT_5_5_5_1", n[n.UNSIGNED_INT = 5125] = "UNSIGNED_INT", n[n.UNSIGNED_INT_10F_11F_11F_REV = 35899] = "UNSIGNED_INT_10F_11F_11F_REV", n[n.UNSIGNED_INT_2_10_10_10_REV = 33640] = "UNSIGNED_INT_2_10_10_10_REV", n[n.UNSIGNED_INT_24_8 = 34042] = "UNSIGNED_INT_24_8", n[n.UNSIGNED_INT_5_9_9_9_REV = 35902] = "UNSIGNED_INT_5_9_9_9_REV", n[n.BYTE = 5120] = "BYTE", n[n.SHORT = 5122] = "SHORT", n[n.INT = 5124] = "INT", n[n.FLOAT = 5126] = "FLOAT", n[n.FLOAT_32_UNSIGNED_INT_24_8_REV = 36269] = "FLOAT_32_UNSIGNED_INT_24_8_REV", n[n.HALF_FLOAT = 36193] = "HALF_FLOAT";
})(TYPES || (TYPES = {}));
var SAMPLER_TYPES;
(function(n) {
  n[n.FLOAT = 0] = "FLOAT", n[n.INT = 1] = "INT", n[n.UINT = 2] = "UINT";
})(SAMPLER_TYPES || (SAMPLER_TYPES = {}));
var SCALE_MODES;
(function(n) {
  n[n.NEAREST = 0] = "NEAREST", n[n.LINEAR = 1] = "LINEAR";
})(SCALE_MODES || (SCALE_MODES = {}));
var WRAP_MODES;
(function(n) {
  n[n.CLAMP = 33071] = "CLAMP", n[n.REPEAT = 10497] = "REPEAT", n[n.MIRRORED_REPEAT = 33648] = "MIRRORED_REPEAT";
})(WRAP_MODES || (WRAP_MODES = {}));
var MIPMAP_MODES;
(function(n) {
  n[n.OFF = 0] = "OFF", n[n.POW2 = 1] = "POW2", n[n.ON = 2] = "ON", n[n.ON_MANUAL = 3] = "ON_MANUAL";
})(MIPMAP_MODES || (MIPMAP_MODES = {}));
var ALPHA_MODES;
(function(n) {
  n[n.NPM = 0] = "NPM", n[n.UNPACK = 1] = "UNPACK", n[n.PMA = 2] = "PMA", n[n.NO_PREMULTIPLIED_ALPHA = 0] = "NO_PREMULTIPLIED_ALPHA", n[n.PREMULTIPLY_ON_UPLOAD = 1] = "PREMULTIPLY_ON_UPLOAD", n[n.PREMULTIPLY_ALPHA = 2] = "PREMULTIPLY_ALPHA", n[n.PREMULTIPLIED_ALPHA = 2] = "PREMULTIPLIED_ALPHA";
})(ALPHA_MODES || (ALPHA_MODES = {}));
var CLEAR_MODES;
(function(n) {
  n[n.NO = 0] = "NO", n[n.YES = 1] = "YES", n[n.AUTO = 2] = "AUTO", n[n.BLEND = 0] = "BLEND", n[n.CLEAR = 1] = "CLEAR", n[n.BLIT = 2] = "BLIT";
})(CLEAR_MODES || (CLEAR_MODES = {}));
var GC_MODES;
(function(n) {
  n[n.AUTO = 0] = "AUTO", n[n.MANUAL = 1] = "MANUAL";
})(GC_MODES || (GC_MODES = {}));
var PRECISION;
(function(n) {
  n.LOW = "lowp", n.MEDIUM = "mediump", n.HIGH = "highp";
})(PRECISION || (PRECISION = {}));
var MASK_TYPES;
(function(n) {
  n[n.NONE = 0] = "NONE", n[n.SCISSOR = 1] = "SCISSOR", n[n.STENCIL = 2] = "STENCIL", n[n.SPRITE = 3] = "SPRITE", n[n.COLOR = 4] = "COLOR";
})(MASK_TYPES || (MASK_TYPES = {}));
var COLOR_MASK_BITS;
(function(n) {
  n[n.RED = 1] = "RED", n[n.GREEN = 2] = "GREEN", n[n.BLUE = 4] = "BLUE", n[n.ALPHA = 8] = "ALPHA";
})(COLOR_MASK_BITS || (COLOR_MASK_BITS = {}));
var MSAA_QUALITY;
(function(n) {
  n[n.NONE = 0] = "NONE", n[n.LOW = 2] = "LOW", n[n.MEDIUM = 4] = "MEDIUM", n[n.HIGH = 8] = "HIGH";
})(MSAA_QUALITY || (MSAA_QUALITY = {}));
var BUFFER_TYPE;
(function(n) {
  n[n.ELEMENT_ARRAY_BUFFER = 34963] = "ELEMENT_ARRAY_BUFFER", n[n.ARRAY_BUFFER = 34962] = "ARRAY_BUFFER", n[n.UNIFORM_BUFFER = 35345] = "UNIFORM_BUFFER";
})(BUFFER_TYPE || (BUFFER_TYPE = {}));
var BrowserAdapter = {
  /**
   * Creates a canvas element of the given size.
   * This canvas is created using the browser's native canvas element.
   * @param width - width of the canvas
   * @param height - height of the canvas
   */
  createCanvas: function(n, e) {
    var t = document.createElement("canvas");
    return t.width = n, t.height = e, t;
  },
  getWebGLRenderingContext: function() {
    return WebGLRenderingContext;
  },
  getNavigator: function() {
    return navigator;
  },
  getBaseUrl: function() {
    var n;
    return (n = document.baseURI) !== null && n !== void 0 ? n : window.location.href;
  },
  fetch: function(n, e) {
    return fetch(n, e);
  }
}, appleIphone = /iPhone/i, appleIpod = /iPod/i, appleTablet = /iPad/i, appleUniversal = /\biOS-universal(?:.+)Mac\b/i, androidPhone = /\bAndroid(?:.+)Mobile\b/i, androidTablet = /Android/i, amazonPhone = /(?:SD4930UR|\bSilk(?:.+)Mobile\b)/i, amazonTablet = /Silk/i, windowsPhone = /Windows Phone/i, windowsTablet = /\bWindows(?:.+)ARM\b/i, otherBlackBerry = /BlackBerry/i, otherBlackBerry10 = /BB10/i, otherOpera = /Opera Mini/i, otherChrome = /\b(CriOS|Chrome)(?:.+)Mobile/i, otherFirefox = /Mobile(?:.+)Firefox\b/i, isAppleTabletOnIos13 = function(n) {
  return typeof n < "u" && n.platform === "MacIntel" && typeof n.maxTouchPoints == "number" && n.maxTouchPoints > 1 && typeof MSStream > "u";
};
function createMatch(n) {
  return function(e) {
    return e.test(n);
  };
}
function isMobile$1(n) {
  var e = {
    userAgent: "",
    platform: "",
    maxTouchPoints: 0
  };
  !n && typeof navigator < "u" ? e = {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    maxTouchPoints: navigator.maxTouchPoints || 0
  } : typeof n == "string" ? e.userAgent = n : n && n.userAgent && (e = {
    userAgent: n.userAgent,
    platform: n.platform,
    maxTouchPoints: n.maxTouchPoints || 0
  });
  var t = e.userAgent, r = t.split("[FBAN");
  typeof r[1] < "u" && (t = r[0]), r = t.split("Twitter"), typeof r[1] < "u" && (t = r[0]);
  var a = createMatch(t), o = {
    apple: {
      phone: a(appleIphone) && !a(windowsPhone),
      ipod: a(appleIpod),
      tablet: !a(appleIphone) && (a(appleTablet) || isAppleTabletOnIos13(e)) && !a(windowsPhone),
      universal: a(appleUniversal),
      device: (a(appleIphone) || a(appleIpod) || a(appleTablet) || a(appleUniversal) || isAppleTabletOnIos13(e)) && !a(windowsPhone)
    },
    amazon: {
      phone: a(amazonPhone),
      tablet: !a(amazonPhone) && a(amazonTablet),
      device: a(amazonPhone) || a(amazonTablet)
    },
    android: {
      phone: !a(windowsPhone) && a(amazonPhone) || !a(windowsPhone) && a(androidPhone),
      tablet: !a(windowsPhone) && !a(amazonPhone) && !a(androidPhone) && (a(amazonTablet) || a(androidTablet)),
      device: !a(windowsPhone) && (a(amazonPhone) || a(amazonTablet) || a(androidPhone) || a(androidTablet)) || a(/\bokhttp\b/i)
    },
    windows: {
      phone: a(windowsPhone),
      tablet: a(windowsTablet),
      device: a(windowsPhone) || a(windowsTablet)
    },
    other: {
      blackberry: a(otherBlackBerry),
      blackberry10: a(otherBlackBerry10),
      opera: a(otherOpera),
      firefox: a(otherFirefox),
      chrome: a(otherChrome),
      device: a(otherBlackBerry) || a(otherBlackBerry10) || a(otherOpera) || a(otherFirefox) || a(otherChrome)
    },
    any: !1,
    phone: !1,
    tablet: !1
  };
  return o.any = o.apple.device || o.android.device || o.windows.device || o.other.device, o.phone = o.apple.phone || o.android.phone || o.windows.phone, o.tablet = o.apple.tablet || o.android.tablet || o.windows.tablet, o;
}
var isMobile = isMobile$1(globalThis.navigator);
function canUploadSameBuffer() {
  return !isMobile.apple.device;
}
function maxRecommendedTextures(n) {
  var e = !0;
  if (isMobile.tablet || isMobile.phone) {
    if (isMobile.apple.device) {
      var t = navigator.userAgent.match(/OS (\d+)_(\d+)?/);
      if (t) {
        var r = parseInt(t[1], 10);
        r < 11 && (e = !1);
      }
    }
    if (isMobile.android.device) {
      var t = navigator.userAgent.match(/Android\s([0-9.]*)/);
      if (t) {
        var r = parseInt(t[1], 10);
        r < 7 && (e = !1);
      }
    }
  }
  return e ? n : 4;
}
var settings = {
  /**
   * This adapter is used to call methods that are platform dependent.
   * For example `document.createElement` only runs on the web but fails in node environments.
   * This allows us to support more platforms by abstracting away specific implementations per platform.
   *
   * By default the adapter is set to work in the browser. However you can create your own
   * by implementing the `IAdapter` interface. See `IAdapter` for more information.
   * @name ADAPTER
   * @memberof PIXI.settings
   * @type {PIXI.IAdapter}
   * @default PIXI.BrowserAdapter
   */
  ADAPTER: BrowserAdapter,
  /**
   * If set to true WebGL will attempt make textures mimpaped by default.
   * Mipmapping will only succeed if the base texture uploaded has power of two dimensions.
   * @static
   * @name MIPMAP_TEXTURES
   * @memberof PIXI.settings
   * @type {PIXI.MIPMAP_MODES}
   * @default PIXI.MIPMAP_MODES.POW2
   */
  MIPMAP_TEXTURES: MIPMAP_MODES.POW2,
  /**
   * Default anisotropic filtering level of textures.
   * Usually from 0 to 16
   * @static
   * @name ANISOTROPIC_LEVEL
   * @memberof PIXI.settings
   * @type {number}
   * @default 0
   */
  ANISOTROPIC_LEVEL: 0,
  /**
   * Default resolution / device pixel ratio of the renderer.
   * @static
   * @name RESOLUTION
   * @memberof PIXI.settings
   * @type {number}
   * @default 1
   */
  RESOLUTION: 1,
  /**
   * Default filter resolution.
   * @static
   * @name FILTER_RESOLUTION
   * @memberof PIXI.settings
   * @type {number}
   * @default 1
   */
  FILTER_RESOLUTION: 1,
  /**
   * Default filter samples.
   * @static
   * @name FILTER_MULTISAMPLE
   * @memberof PIXI.settings
   * @type {PIXI.MSAA_QUALITY}
   * @default PIXI.MSAA_QUALITY.NONE
   */
  FILTER_MULTISAMPLE: MSAA_QUALITY.NONE,
  /**
   * The maximum textures that this device supports.
   * @static
   * @name SPRITE_MAX_TEXTURES
   * @memberof PIXI.settings
   * @type {number}
   * @default 32
   */
  SPRITE_MAX_TEXTURES: maxRecommendedTextures(32),
  // TODO: maybe change to SPRITE.BATCH_SIZE: 2000
  // TODO: maybe add PARTICLE.BATCH_SIZE: 15000
  /**
   * The default sprite batch size.
   *
   * The default aims to balance desktop and mobile devices.
   * @static
   * @name SPRITE_BATCH_SIZE
   * @memberof PIXI.settings
   * @type {number}
   * @default 4096
   */
  SPRITE_BATCH_SIZE: 4096,
  /**
   * The default render options if none are supplied to {@link PIXI.Renderer}
   * or {@link PIXI.CanvasRenderer}.
   * @static
   * @name RENDER_OPTIONS
   * @memberof PIXI.settings
   * @type {object}
   * @property {boolean} [antialias=false] - {@link PIXI.IRendererOptions.antialias}
   * @property {boolean} [autoDensity=false] - {@link PIXI.IRendererOptions.autoDensity}
   * @property {number} [backgroundAlpha=1] - {@link PIXI.IRendererOptions.backgroundAlpha}
   * @property {number} [backgroundColor=0x000000] - {@link PIXI.IRendererOptions.backgroundColor}
   * @property {boolean} [clearBeforeRender=true] - {@link PIXI.IRendererOptions.clearBeforeRender}
   * @property {number} [height=600] - {@link PIXI.IRendererOptions.height}
   * @property {boolean} [preserveDrawingBuffer=false] - {@link PIXI.IRendererOptions.preserveDrawingBuffer}
   * @property {boolean|'notMultiplied'} [useContextAlpha=true] - {@link PIXI.IRendererOptions.useContextAlpha}
   * @property {HTMLCanvasElement} [view=null] - {@link PIXI.IRendererOptions.view}
   * @property {number} [width=800] - {@link PIXI.IRendererOptions.width}
   */
  RENDER_OPTIONS: {
    view: null,
    width: 800,
    height: 600,
    autoDensity: !1,
    backgroundColor: 0,
    backgroundAlpha: 1,
    useContextAlpha: !0,
    clearBeforeRender: !0,
    antialias: !1,
    preserveDrawingBuffer: !1
  },
  /**
   * Default Garbage Collection mode.
   * @static
   * @name GC_MODE
   * @memberof PIXI.settings
   * @type {PIXI.GC_MODES}
   * @default PIXI.GC_MODES.AUTO
   */
  GC_MODE: GC_MODES.AUTO,
  /**
   * Default Garbage Collection max idle.
   * @static
   * @name GC_MAX_IDLE
   * @memberof PIXI.settings
   * @type {number}
   * @default 3600
   */
  GC_MAX_IDLE: 60 * 60,
  /**
   * Default Garbage Collection maximum check count.
   * @static
   * @name GC_MAX_CHECK_COUNT
   * @memberof PIXI.settings
   * @type {number}
   * @default 600
   */
  GC_MAX_CHECK_COUNT: 60 * 10,
  /**
   * Default wrap modes that are supported by pixi.
   * @static
   * @name WRAP_MODE
   * @memberof PIXI.settings
   * @type {PIXI.WRAP_MODES}
   * @default PIXI.WRAP_MODES.CLAMP
   */
  WRAP_MODE: WRAP_MODES.CLAMP,
  /**
   * Default scale mode for textures.
   * @static
   * @name SCALE_MODE
   * @memberof PIXI.settings
   * @type {PIXI.SCALE_MODES}
   * @default PIXI.SCALE_MODES.LINEAR
   */
  SCALE_MODE: SCALE_MODES.LINEAR,
  /**
   * Default specify float precision in vertex shader.
   * @static
   * @name PRECISION_VERTEX
   * @memberof PIXI.settings
   * @type {PIXI.PRECISION}
   * @default PIXI.PRECISION.HIGH
   */
  PRECISION_VERTEX: PRECISION.HIGH,
  /**
   * Default specify float precision in fragment shader.
   * iOS is best set at highp due to https://github.com/pixijs/pixi.js/issues/3742
   * @static
   * @name PRECISION_FRAGMENT
   * @memberof PIXI.settings
   * @type {PIXI.PRECISION}
   * @default PIXI.PRECISION.MEDIUM
   */
  PRECISION_FRAGMENT: isMobile.apple.device ? PRECISION.HIGH : PRECISION.MEDIUM,
  /**
   * Can we upload the same buffer in a single frame?
   * @static
   * @name CAN_UPLOAD_SAME_BUFFER
   * @memberof PIXI.settings
   * @type {boolean}
   */
  CAN_UPLOAD_SAME_BUFFER: canUploadSameBuffer(),
  /**
   * Enables bitmap creation before image load. This feature is experimental.
   * @static
   * @name CREATE_IMAGE_BITMAP
   * @memberof PIXI.settings
   * @type {boolean}
   * @default false
   */
  CREATE_IMAGE_BITMAP: !1,
  /**
   * If true PixiJS will Math.floor() x/y values when rendering, stopping pixel interpolation.
   * Advantages can include sharper image quality (like text) and faster rendering on canvas.
   * The main disadvantage is movement of objects may appear less smooth.
   * @static
   * @constant
   * @memberof PIXI.settings
   * @type {boolean}
   * @default false
   */
  ROUND_PIXELS: !1
}, eventemitter3 = { exports: {} }, hasRequiredEventemitter3;
function requireEventemitter3() {
  return hasRequiredEventemitter3 || (hasRequiredEventemitter3 = 1, function(n) {
    var e = Object.prototype.hasOwnProperty, t = "~";
    function r() {
    }
    Object.create && (r.prototype = /* @__PURE__ */ Object.create(null), new r().__proto__ || (t = !1));
    function a(h, l, c) {
      this.fn = h, this.context = l, this.once = c || !1;
    }
    function o(h, l, c, v, d) {
      if (typeof c != "function")
        throw new TypeError("The listener must be a function");
      var g = new a(c, v || h, d), m = t ? t + l : l;
      return h._events[m] ? h._events[m].fn ? h._events[m] = [h._events[m], g] : h._events[m].push(g) : (h._events[m] = g, h._eventsCount++), h;
    }
    function s(h, l) {
      --h._eventsCount === 0 ? h._events = new r() : delete h._events[l];
    }
    function u() {
      this._events = new r(), this._eventsCount = 0;
    }
    u.prototype.eventNames = function() {
      var l = [], c, v;
      if (this._eventsCount === 0) return l;
      for (v in c = this._events)
        e.call(c, v) && l.push(t ? v.slice(1) : v);
      return Object.getOwnPropertySymbols ? l.concat(Object.getOwnPropertySymbols(c)) : l;
    }, u.prototype.listeners = function(l) {
      var c = t ? t + l : l, v = this._events[c];
      if (!v) return [];
      if (v.fn) return [v.fn];
      for (var d = 0, g = v.length, m = new Array(g); d < g; d++)
        m[d] = v[d].fn;
      return m;
    }, u.prototype.listenerCount = function(l) {
      var c = t ? t + l : l, v = this._events[c];
      return v ? v.fn ? 1 : v.length : 0;
    }, u.prototype.emit = function(l, c, v, d, g, m) {
      var _ = t ? t + l : l;
      if (!this._events[_]) return !1;
      var y = this._events[_], b = arguments.length, S, O;
      if (y.fn) {
        switch (y.once && this.removeListener(l, y.fn, void 0, !0), b) {
          case 1:
            return y.fn.call(y.context), !0;
          case 2:
            return y.fn.call(y.context, c), !0;
          case 3:
            return y.fn.call(y.context, c, v), !0;
          case 4:
            return y.fn.call(y.context, c, v, d), !0;
          case 5:
            return y.fn.call(y.context, c, v, d, g), !0;
          case 6:
            return y.fn.call(y.context, c, v, d, g, m), !0;
        }
        for (O = 1, S = new Array(b - 1); O < b; O++)
          S[O - 1] = arguments[O];
        y.fn.apply(y.context, S);
      } else {
        var D = y.length, E;
        for (O = 0; O < D; O++)
          switch (y[O].once && this.removeListener(l, y[O].fn, void 0, !0), b) {
            case 1:
              y[O].fn.call(y[O].context);
              break;
            case 2:
              y[O].fn.call(y[O].context, c);
              break;
            case 3:
              y[O].fn.call(y[O].context, c, v);
              break;
            case 4:
              y[O].fn.call(y[O].context, c, v, d);
              break;
            default:
              if (!S) for (E = 1, S = new Array(b - 1); E < b; E++)
                S[E - 1] = arguments[E];
              y[O].fn.apply(y[O].context, S);
          }
      }
      return !0;
    }, u.prototype.on = function(l, c, v) {
      return o(this, l, c, v, !1);
    }, u.prototype.once = function(l, c, v) {
      return o(this, l, c, v, !0);
    }, u.prototype.removeListener = function(l, c, v, d) {
      var g = t ? t + l : l;
      if (!this._events[g]) return this;
      if (!c)
        return s(this, g), this;
      var m = this._events[g];
      if (m.fn)
        m.fn === c && (!d || m.once) && (!v || m.context === v) && s(this, g);
      else {
        for (var _ = 0, y = [], b = m.length; _ < b; _++)
          (m[_].fn !== c || d && !m[_].once || v && m[_].context !== v) && y.push(m[_]);
        y.length ? this._events[g] = y.length === 1 ? y[0] : y : s(this, g);
      }
      return this;
    }, u.prototype.removeAllListeners = function(l) {
      var c;
      return l ? (c = t ? t + l : l, this._events[c] && s(this, c)) : (this._events = new r(), this._eventsCount = 0), this;
    }, u.prototype.off = u.prototype.removeListener, u.prototype.addListener = u.prototype.on, u.prefixed = t, u.EventEmitter = u, n.exports = u;
  }(eventemitter3)), eventemitter3.exports;
}
var eventemitter3Exports = requireEventemitter3();
const i = /* @__PURE__ */ getDefaultExportFromCjs(eventemitter3Exports);
var earcut$1 = { exports: {} }, hasRequiredEarcut;
function requireEarcut() {
  if (hasRequiredEarcut) return earcut$1.exports;
  hasRequiredEarcut = 1, earcut$1.exports = n, earcut$1.exports.default = n;
  function n(P, I, T) {
    T = T || 2;
    var C = I && I.length, R = C ? I[0] * T : P.length, w = e(P, 0, R, T, !0), N = [];
    if (!w || w.next === w.prev) return N;
    var L, F, z, J, V, Z, q;
    if (C && (w = h(P, I, w, T)), P.length > 80 * T) {
      L = z = P[0], F = J = P[1];
      for (var W = T; W < R; W += T)
        V = P[W], Z = P[W + 1], V < L && (L = V), Z < F && (F = Z), V > z && (z = V), Z > J && (J = Z);
      q = Math.max(z - L, J - F), q = q !== 0 ? 32767 / q : 0;
    }
    return r(w, N, T, L, F, q, 0), N;
  }
  function e(P, I, T, C, R) {
    var w, N;
    if (R === Y(P, I, T, C) > 0)
      for (w = I; w < T; w += C) N = G(w, P[w], P[w + 1], N);
    else
      for (w = T - C; w >= I; w -= C) N = G(w, P[w], P[w + 1], N);
    return N && D(N, N.next) && (K(N), N = N.next), N;
  }
  function t(P, I) {
    if (!P) return P;
    I || (I = P);
    var T = P, C;
    do
      if (C = !1, !T.steiner && (D(T, T.next) || O(T.prev, T, T.next) === 0)) {
        if (K(T), T = I = T.prev, T === T.next) break;
        C = !0;
      } else
        T = T.next;
    while (C || T !== I);
    return I;
  }
  function r(P, I, T, C, R, w, N) {
    if (P) {
      !N && w && g(P, C, R, w);
      for (var L = P, F, z; P.prev !== P.next; ) {
        if (F = P.prev, z = P.next, w ? o(P, C, R, w) : a(P)) {
          I.push(F.i / T | 0), I.push(P.i / T | 0), I.push(z.i / T | 0), K(P), P = z.next, L = z.next;
          continue;
        }
        if (P = z, P === L) {
          N ? N === 1 ? (P = s(t(P), I, T), r(P, I, T, C, R, w, 2)) : N === 2 && u(P, I, T, C, R, w) : r(t(P), I, T, C, R, w, 1);
          break;
        }
      }
    }
  }
  function a(P) {
    var I = P.prev, T = P, C = P.next;
    if (O(I, T, C) >= 0) return !1;
    for (var R = I.x, w = T.x, N = C.x, L = I.y, F = T.y, z = C.y, J = R < w ? R < N ? R : N : w < N ? w : N, V = L < F ? L < z ? L : z : F < z ? F : z, Z = R > w ? R > N ? R : N : w > N ? w : N, q = L > F ? L > z ? L : z : F > z ? F : z, W = C.next; W !== I; ) {
      if (W.x >= J && W.x <= Z && W.y >= V && W.y <= q && b(R, L, w, F, N, z, W.x, W.y) && O(W.prev, W, W.next) >= 0) return !1;
      W = W.next;
    }
    return !0;
  }
  function o(P, I, T, C) {
    var R = P.prev, w = P, N = P.next;
    if (O(R, w, N) >= 0) return !1;
    for (var L = R.x, F = w.x, z = N.x, J = R.y, V = w.y, Z = N.y, q = L < F ? L < z ? L : z : F < z ? F : z, W = J < V ? J < Z ? J : Z : V < Z ? V : Z, Q = L > F ? L > z ? L : z : F > z ? F : z, et = J > V ? J > Z ? J : Z : V > Z ? V : Z, st = _(q, W, I, T, C), nt = _(Q, et, I, T, C), it = P.prevZ, rt = P.nextZ; it && it.z >= st && rt && rt.z <= nt; ) {
      if (it.x >= q && it.x <= Q && it.y >= W && it.y <= et && it !== R && it !== N && b(L, J, F, V, z, Z, it.x, it.y) && O(it.prev, it, it.next) >= 0 || (it = it.prevZ, rt.x >= q && rt.x <= Q && rt.y >= W && rt.y <= et && rt !== R && rt !== N && b(L, J, F, V, z, Z, rt.x, rt.y) && O(rt.prev, rt, rt.next) >= 0)) return !1;
      rt = rt.nextZ;
    }
    for (; it && it.z >= st; ) {
      if (it.x >= q && it.x <= Q && it.y >= W && it.y <= et && it !== R && it !== N && b(L, J, F, V, z, Z, it.x, it.y) && O(it.prev, it, it.next) >= 0) return !1;
      it = it.prevZ;
    }
    for (; rt && rt.z <= nt; ) {
      if (rt.x >= q && rt.x <= Q && rt.y >= W && rt.y <= et && rt !== R && rt !== N && b(L, J, F, V, z, Z, rt.x, rt.y) && O(rt.prev, rt, rt.next) >= 0) return !1;
      rt = rt.nextZ;
    }
    return !0;
  }
  function s(P, I, T) {
    var C = P;
    do {
      var R = C.prev, w = C.next.next;
      !D(R, w) && E(R, C, C.next, w) && B(R, w) && B(w, R) && (I.push(R.i / T | 0), I.push(C.i / T | 0), I.push(w.i / T | 0), K(C), K(C.next), C = P = w), C = C.next;
    } while (C !== P);
    return t(C);
  }
  function u(P, I, T, C, R, w) {
    var N = P;
    do {
      for (var L = N.next.next; L !== N.prev; ) {
        if (N.i !== L.i && S(N, L)) {
          var F = X(N, L);
          N = t(N, N.next), F = t(F, F.next), r(N, I, T, C, R, w, 0), r(F, I, T, C, R, w, 0);
          return;
        }
        L = L.next;
      }
      N = N.next;
    } while (N !== P);
  }
  function h(P, I, T, C) {
    var R = [], w, N, L, F, z;
    for (w = 0, N = I.length; w < N; w++)
      L = I[w] * C, F = w < N - 1 ? I[w + 1] * C : P.length, z = e(P, L, F, C, !1), z === z.next && (z.steiner = !0), R.push(y(z));
    for (R.sort(l), w = 0; w < R.length; w++)
      T = c(R[w], T);
    return T;
  }
  function l(P, I) {
    return P.x - I.x;
  }
  function c(P, I) {
    var T = v(P, I);
    if (!T)
      return I;
    var C = X(T, P);
    return t(C, C.next), t(T, T.next);
  }
  function v(P, I) {
    var T = I, C = P.x, R = P.y, w = -1 / 0, N;
    do {
      if (R <= T.y && R >= T.next.y && T.next.y !== T.y) {
        var L = T.x + (R - T.y) * (T.next.x - T.x) / (T.next.y - T.y);
        if (L <= C && L > w && (w = L, N = T.x < T.next.x ? T : T.next, L === C))
          return N;
      }
      T = T.next;
    } while (T !== I);
    if (!N) return null;
    var F = N, z = N.x, J = N.y, V = 1 / 0, Z;
    T = N;
    do
      C >= T.x && T.x >= z && C !== T.x && b(R < J ? C : w, R, z, J, R < J ? w : C, R, T.x, T.y) && (Z = Math.abs(R - T.y) / (C - T.x), B(T, P) && (Z < V || Z === V && (T.x > N.x || T.x === N.x && d(N, T))) && (N = T, V = Z)), T = T.next;
    while (T !== F);
    return N;
  }
  function d(P, I) {
    return O(P.prev, P, I.prev) < 0 && O(I.next, P, P.next) < 0;
  }
  function g(P, I, T, C) {
    var R = P;
    do
      R.z === 0 && (R.z = _(R.x, R.y, I, T, C)), R.prevZ = R.prev, R.nextZ = R.next, R = R.next;
    while (R !== P);
    R.prevZ.nextZ = null, R.prevZ = null, m(R);
  }
  function m(P) {
    var I, T, C, R, w, N, L, F, z = 1;
    do {
      for (T = P, P = null, w = null, N = 0; T; ) {
        for (N++, C = T, L = 0, I = 0; I < z && (L++, C = C.nextZ, !!C); I++)
          ;
        for (F = z; L > 0 || F > 0 && C; )
          L !== 0 && (F === 0 || !C || T.z <= C.z) ? (R = T, T = T.nextZ, L--) : (R = C, C = C.nextZ, F--), w ? w.nextZ = R : P = R, R.prevZ = w, w = R;
        T = C;
      }
      w.nextZ = null, z *= 2;
    } while (N > 1);
    return P;
  }
  function _(P, I, T, C, R) {
    return P = (P - T) * R | 0, I = (I - C) * R | 0, P = (P | P << 8) & 16711935, P = (P | P << 4) & 252645135, P = (P | P << 2) & 858993459, P = (P | P << 1) & 1431655765, I = (I | I << 8) & 16711935, I = (I | I << 4) & 252645135, I = (I | I << 2) & 858993459, I = (I | I << 1) & 1431655765, P | I << 1;
  }
  function y(P) {
    var I = P, T = P;
    do
      (I.x < T.x || I.x === T.x && I.y < T.y) && (T = I), I = I.next;
    while (I !== P);
    return T;
  }
  function b(P, I, T, C, R, w, N, L) {
    return (R - N) * (I - L) >= (P - N) * (w - L) && (P - N) * (C - L) >= (T - N) * (I - L) && (T - N) * (w - L) >= (R - N) * (C - L);
  }
  function S(P, I) {
    return P.next.i !== I.i && P.prev.i !== I.i && !$(P, I) && // dones't intersect other edges
    (B(P, I) && B(I, P) && U(P, I) && // locally visible
    (O(P.prev, P, I.prev) || O(P, I.prev, I)) || // does not create opposite-facing sectors
    D(P, I) && O(P.prev, P, P.next) > 0 && O(I.prev, I, I.next) > 0);
  }
  function O(P, I, T) {
    return (I.y - P.y) * (T.x - I.x) - (I.x - P.x) * (T.y - I.y);
  }
  function D(P, I) {
    return P.x === I.x && P.y === I.y;
  }
  function E(P, I, T, C) {
    var R = A(O(P, I, T)), w = A(O(P, I, C)), N = A(O(T, C, P)), L = A(O(T, C, I));
    return !!(R !== w && N !== L || R === 0 && M(P, T, I) || w === 0 && M(P, C, I) || N === 0 && M(T, P, C) || L === 0 && M(T, I, C));
  }
  function M(P, I, T) {
    return I.x <= Math.max(P.x, T.x) && I.x >= Math.min(P.x, T.x) && I.y <= Math.max(P.y, T.y) && I.y >= Math.min(P.y, T.y);
  }
  function A(P) {
    return P > 0 ? 1 : P < 0 ? -1 : 0;
  }
  function $(P, I) {
    var T = P;
    do {
      if (T.i !== P.i && T.next.i !== P.i && T.i !== I.i && T.next.i !== I.i && E(T, T.next, P, I)) return !0;
      T = T.next;
    } while (T !== P);
    return !1;
  }
  function B(P, I) {
    return O(P.prev, P, P.next) < 0 ? O(P, I, P.next) >= 0 && O(P, P.prev, I) >= 0 : O(P, I, P.prev) < 0 || O(P, P.next, I) < 0;
  }
  function U(P, I) {
    var T = P, C = !1, R = (P.x + I.x) / 2, w = (P.y + I.y) / 2;
    do
      T.y > w != T.next.y > w && T.next.y !== T.y && R < (T.next.x - T.x) * (w - T.y) / (T.next.y - T.y) + T.x && (C = !C), T = T.next;
    while (T !== P);
    return C;
  }
  function X(P, I) {
    var T = new tt(P.i, P.x, P.y), C = new tt(I.i, I.x, I.y), R = P.next, w = I.prev;
    return P.next = I, I.prev = P, T.next = R, R.prev = T, C.next = T, T.prev = C, w.next = C, C.prev = w, C;
  }
  function G(P, I, T, C) {
    var R = new tt(P, I, T);
    return C ? (R.next = C.next, R.prev = C, C.next.prev = R, C.next = R) : (R.prev = R, R.next = R), R;
  }
  function K(P) {
    P.next.prev = P.prev, P.prev.next = P.next, P.prevZ && (P.prevZ.nextZ = P.nextZ), P.nextZ && (P.nextZ.prevZ = P.prevZ);
  }
  function tt(P, I, T) {
    this.i = P, this.x = I, this.y = T, this.prev = null, this.next = null, this.z = 0, this.prevZ = null, this.nextZ = null, this.steiner = !1;
  }
  n.deviation = function(P, I, T, C) {
    var R = I && I.length, w = R ? I[0] * T : P.length, N = Math.abs(Y(P, 0, w, T));
    if (R)
      for (var L = 0, F = I.length; L < F; L++) {
        var z = I[L] * T, J = L < F - 1 ? I[L + 1] * T : P.length;
        N -= Math.abs(Y(P, z, J, T));
      }
    var V = 0;
    for (L = 0; L < C.length; L += 3) {
      var Z = C[L] * T, q = C[L + 1] * T, W = C[L + 2] * T;
      V += Math.abs(
        (P[Z] - P[W]) * (P[q + 1] - P[Z + 1]) - (P[Z] - P[q]) * (P[W + 1] - P[Z + 1])
      );
    }
    return N === 0 && V === 0 ? 0 : Math.abs((V - N) / N);
  };
  function Y(P, I, T, C) {
    for (var R = 0, w = I, N = T - C; w < T; w += C)
      R += (P[N] - P[w]) * (P[w + 1] + P[N + 1]), N = w;
    return R;
  }
  return n.flatten = function(P) {
    for (var I = P[0][0].length, T = { vertices: [], holes: [], dimensions: I }, C = 0, R = 0; R < P.length; R++) {
      for (var w = 0; w < P[R].length; w++)
        for (var N = 0; N < I; N++) T.vertices.push(P[R][w][N]);
      R > 0 && (C += P[R - 1].length, T.holes.push(C));
    }
    return T;
  }, earcut$1.exports;
}
var earcutExports = requireEarcut();
const earcut = /* @__PURE__ */ getDefaultExportFromCjs(earcutExports);
var url$2 = {}, punycode$1 = { exports: {} };
var punycode = punycode$1.exports, hasRequiredPunycode;
function requirePunycode() {
  return hasRequiredPunycode || (hasRequiredPunycode = 1, function(n, e) {
    (function(t) {
      var r = e && !e.nodeType && e, a = n && !n.nodeType && n, o = typeof commonjsGlobal == "object" && commonjsGlobal;
      (o.global === o || o.window === o || o.self === o) && (t = o);
      var s, u = 2147483647, h = 36, l = 1, c = 26, v = 38, d = 700, g = 72, m = 128, _ = "-", y = /^xn--/, b = /[^\x20-\x7E]/, S = /[\x2E\u3002\uFF0E\uFF61]/g, O = {
        overflow: "Overflow: input needs wider integers to process",
        "not-basic": "Illegal input >= 0x80 (not a basic code point)",
        "invalid-input": "Invalid input"
      }, D = h - l, E = Math.floor, M = String.fromCharCode, A;
      function $(R) {
        throw new RangeError(O[R]);
      }
      function B(R, w) {
        for (var N = R.length, L = []; N--; )
          L[N] = w(R[N]);
        return L;
      }
      function U(R, w) {
        var N = R.split("@"), L = "";
        N.length > 1 && (L = N[0] + "@", R = N[1]), R = R.replace(S, ".");
        var F = R.split("."), z = B(F, w).join(".");
        return L + z;
      }
      function X(R) {
        for (var w = [], N = 0, L = R.length, F, z; N < L; )
          F = R.charCodeAt(N++), F >= 55296 && F <= 56319 && N < L ? (z = R.charCodeAt(N++), (z & 64512) == 56320 ? w.push(((F & 1023) << 10) + (z & 1023) + 65536) : (w.push(F), N--)) : w.push(F);
        return w;
      }
      function G(R) {
        return B(R, function(w) {
          var N = "";
          return w > 65535 && (w -= 65536, N += M(w >>> 10 & 1023 | 55296), w = 56320 | w & 1023), N += M(w), N;
        }).join("");
      }
      function K(R) {
        return R - 48 < 10 ? R - 22 : R - 65 < 26 ? R - 65 : R - 97 < 26 ? R - 97 : h;
      }
      function tt(R, w) {
        return R + 22 + 75 * (R < 26) - ((w != 0) << 5);
      }
      function Y(R, w, N) {
        var L = 0;
        for (R = N ? E(R / d) : R >> 1, R += E(R / w); R > D * c >> 1; L += h)
          R = E(R / D);
        return E(L + (D + 1) * R / (R + v));
      }
      function P(R) {
        var w = [], N = R.length, L, F = 0, z = m, J = g, V, Z, q, W, Q, et, st, nt, it;
        for (V = R.lastIndexOf(_), V < 0 && (V = 0), Z = 0; Z < V; ++Z)
          R.charCodeAt(Z) >= 128 && $("not-basic"), w.push(R.charCodeAt(Z));
        for (q = V > 0 ? V + 1 : 0; q < N; ) {
          for (W = F, Q = 1, et = h; q >= N && $("invalid-input"), st = K(R.charCodeAt(q++)), (st >= h || st > E((u - F) / Q)) && $("overflow"), F += st * Q, nt = et <= J ? l : et >= J + c ? c : et - J, !(st < nt); et += h)
            it = h - nt, Q > E(u / it) && $("overflow"), Q *= it;
          L = w.length + 1, J = Y(F - W, L, W == 0), E(F / L) > u - z && $("overflow"), z += E(F / L), F %= L, w.splice(F++, 0, z);
        }
        return G(w);
      }
      function I(R) {
        var w, N, L, F, z, J, V, Z, q, W, Q, et = [], st, nt, it, rt;
        for (R = X(R), st = R.length, w = m, N = 0, z = g, J = 0; J < st; ++J)
          Q = R[J], Q < 128 && et.push(M(Q));
        for (L = F = et.length, F && et.push(_); L < st; ) {
          for (V = u, J = 0; J < st; ++J)
            Q = R[J], Q >= w && Q < V && (V = Q);
          for (nt = L + 1, V - w > E((u - N) / nt) && $("overflow"), N += (V - w) * nt, w = V, J = 0; J < st; ++J)
            if (Q = R[J], Q < w && ++N > u && $("overflow"), Q == w) {
              for (Z = N, q = h; W = q <= z ? l : q >= z + c ? c : q - z, !(Z < W); q += h)
                rt = Z - W, it = h - W, et.push(
                  M(tt(W + rt % it, 0))
                ), Z = E(rt / it);
              et.push(M(tt(Z, 0))), z = Y(N, nt, L == F), N = 0, ++L;
            }
          ++N, ++w;
        }
        return et.join("");
      }
      function T(R) {
        return U(R, function(w) {
          return y.test(w) ? P(w.slice(4).toLowerCase()) : w;
        });
      }
      function C(R) {
        return U(R, function(w) {
          return b.test(w) ? "xn--" + I(w) : w;
        });
      }
      if (s = {
        /**
         * A string representing the current Punycode.js version number.
         * @memberOf punycode
         * @type String
         */
        version: "1.4.1",
        /**
         * An object of methods to convert from JavaScript's internal character
         * representation (UCS-2) to Unicode code points, and back.
         * @see <https://mathiasbynens.be/notes/javascript-encoding>
         * @memberOf punycode
         * @type Object
         */
        ucs2: {
          decode: X,
          encode: G
        },
        decode: P,
        encode: I,
        toASCII: C,
        toUnicode: T
      }, r && a)
        if (n.exports == r)
          a.exports = s;
        else
          for (A in s)
            s.hasOwnProperty(A) && (r[A] = s[A]);
      else
        t.punycode = s;
    })(punycode);
  }(punycode$1, punycode$1.exports)), punycode$1.exports;
}
var esErrors, hasRequiredEsErrors;
function requireEsErrors() {
  return hasRequiredEsErrors || (hasRequiredEsErrors = 1, esErrors = Error), esErrors;
}
var _eval, hasRequired_eval;
function require_eval() {
  return hasRequired_eval || (hasRequired_eval = 1, _eval = EvalError), _eval;
}
var range, hasRequiredRange;
function requireRange() {
  return hasRequiredRange || (hasRequiredRange = 1, range = RangeError), range;
}
var ref, hasRequiredRef;
function requireRef() {
  return hasRequiredRef || (hasRequiredRef = 1, ref = ReferenceError), ref;
}
var syntax, hasRequiredSyntax;
function requireSyntax() {
  return hasRequiredSyntax || (hasRequiredSyntax = 1, syntax = SyntaxError), syntax;
}
var type, hasRequiredType;
function requireType() {
  return hasRequiredType || (hasRequiredType = 1, type = TypeError), type;
}
var uri, hasRequiredUri;
function requireUri() {
  return hasRequiredUri || (hasRequiredUri = 1, uri = URIError), uri;
}
var shams$3, hasRequiredShams$3;
function requireShams$3() {
  return hasRequiredShams$3 || (hasRequiredShams$3 = 1, shams$3 = function() {
    if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function")
      return !1;
    if (typeof Symbol.iterator == "symbol")
      return !0;
    var e = {}, t = Symbol("test"), r = Object(t);
    if (typeof t == "string" || Object.prototype.toString.call(t) !== "[object Symbol]" || Object.prototype.toString.call(r) !== "[object Symbol]")
      return !1;
    var a = 42;
    e[t] = a;
    for (t in e)
      return !1;
    if (typeof Object.keys == "function" && Object.keys(e).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(e).length !== 0)
      return !1;
    var o = Object.getOwnPropertySymbols(e);
    if (o.length !== 1 || o[0] !== t || !Object.prototype.propertyIsEnumerable.call(e, t))
      return !1;
    if (typeof Object.getOwnPropertyDescriptor == "function") {
      var s = Object.getOwnPropertyDescriptor(e, t);
      if (s.value !== a || s.enumerable !== !0)
        return !1;
    }
    return !0;
  }), shams$3;
}
var hasSymbols$3, hasRequiredHasSymbols$3;
function requireHasSymbols$3() {
  if (hasRequiredHasSymbols$3) return hasSymbols$3;
  hasRequiredHasSymbols$3 = 1;
  var n = typeof Symbol < "u" && Symbol, e = requireShams$3();
  return hasSymbols$3 = function() {
    return typeof n != "function" || typeof Symbol != "function" || typeof n("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 : e();
  }, hasSymbols$3;
}
var hasProto$3, hasRequiredHasProto$3;
function requireHasProto$3() {
  if (hasRequiredHasProto$3) return hasProto$3;
  hasRequiredHasProto$3 = 1;
  var n = {
    __proto__: null,
    foo: {}
  }, e = Object;
  return hasProto$3 = function() {
    return { __proto__: n }.foo === n.foo && !(n instanceof e);
  }, hasProto$3;
}
var implementation, hasRequiredImplementation;
function requireImplementation() {
  if (hasRequiredImplementation) return implementation;
  hasRequiredImplementation = 1;
  var n = "Function.prototype.bind called on incompatible ", e = Object.prototype.toString, t = Math.max, r = "[object Function]", a = function(h, l) {
    for (var c = [], v = 0; v < h.length; v += 1)
      c[v] = h[v];
    for (var d = 0; d < l.length; d += 1)
      c[d + h.length] = l[d];
    return c;
  }, o = function(h, l) {
    for (var c = [], v = l, d = 0; v < h.length; v += 1, d += 1)
      c[d] = h[v];
    return c;
  }, s = function(u, h) {
    for (var l = "", c = 0; c < u.length; c += 1)
      l += u[c], c + 1 < u.length && (l += h);
    return l;
  };
  return implementation = function(h) {
    var l = this;
    if (typeof l != "function" || e.apply(l) !== r)
      throw new TypeError(n + l);
    for (var c = o(arguments, 1), v, d = function() {
      if (this instanceof v) {
        var b = l.apply(
          this,
          a(c, arguments)
        );
        return Object(b) === b ? b : this;
      }
      return l.apply(
        h,
        a(c, arguments)
      );
    }, g = t(0, l.length - c.length), m = [], _ = 0; _ < g; _++)
      m[_] = "$" + _;
    if (v = Function("binder", "return function (" + s(m, ",") + "){ return binder.apply(this,arguments); }")(d), l.prototype) {
      var y = function() {
      };
      y.prototype = l.prototype, v.prototype = new y(), y.prototype = null;
    }
    return v;
  }, implementation;
}
var functionBind, hasRequiredFunctionBind;
function requireFunctionBind() {
  if (hasRequiredFunctionBind) return functionBind;
  hasRequiredFunctionBind = 1;
  var n = requireImplementation();
  return functionBind = Function.prototype.bind || n, functionBind;
}
var hasown, hasRequiredHasown;
function requireHasown() {
  if (hasRequiredHasown) return hasown;
  hasRequiredHasown = 1;
  var n = Function.prototype.call, e = Object.prototype.hasOwnProperty, t = requireFunctionBind();
  return hasown = t.call(n, e), hasown;
}
var getIntrinsic$3, hasRequiredGetIntrinsic$3;
function requireGetIntrinsic$3() {
  if (hasRequiredGetIntrinsic$3) return getIntrinsic$3;
  hasRequiredGetIntrinsic$3 = 1;
  var n, e = /* @__PURE__ */ requireEsErrors(), t = /* @__PURE__ */ require_eval(), r = /* @__PURE__ */ requireRange(), a = /* @__PURE__ */ requireRef(), o = /* @__PURE__ */ requireSyntax(), s = /* @__PURE__ */ requireType(), u = /* @__PURE__ */ requireUri(), h = Function, l = function(I) {
    try {
      return h('"use strict"; return (' + I + ").constructor;")();
    } catch {
    }
  }, c = Object.getOwnPropertyDescriptor;
  if (c)
    try {
      c({}, "");
    } catch {
      c = null;
    }
  var v = function() {
    throw new s();
  }, d = c ? function() {
    try {
      return arguments.callee, v;
    } catch {
      try {
        return c(arguments, "callee").get;
      } catch {
        return v;
      }
    }
  }() : v, g = requireHasSymbols$3()(), m = /* @__PURE__ */ requireHasProto$3()(), _ = Object.getPrototypeOf || (m ? function(I) {
    return I.__proto__;
  } : null), y = {}, b = typeof Uint8Array > "u" || !_ ? n : _(Uint8Array), S = {
    __proto__: null,
    "%AggregateError%": typeof AggregateError > "u" ? n : AggregateError,
    "%Array%": Array,
    "%ArrayBuffer%": typeof ArrayBuffer > "u" ? n : ArrayBuffer,
    "%ArrayIteratorPrototype%": g && _ ? _([][Symbol.iterator]()) : n,
    "%AsyncFromSyncIteratorPrototype%": n,
    "%AsyncFunction%": y,
    "%AsyncGenerator%": y,
    "%AsyncGeneratorFunction%": y,
    "%AsyncIteratorPrototype%": y,
    "%Atomics%": typeof Atomics > "u" ? n : Atomics,
    "%BigInt%": typeof BigInt > "u" ? n : BigInt,
    "%BigInt64Array%": typeof BigInt64Array > "u" ? n : BigInt64Array,
    "%BigUint64Array%": typeof BigUint64Array > "u" ? n : BigUint64Array,
    "%Boolean%": Boolean,
    "%DataView%": typeof DataView > "u" ? n : DataView,
    "%Date%": Date,
    "%decodeURI%": decodeURI,
    "%decodeURIComponent%": decodeURIComponent,
    "%encodeURI%": encodeURI,
    "%encodeURIComponent%": encodeURIComponent,
    "%Error%": e,
    "%eval%": eval,
    // eslint-disable-line no-eval
    "%EvalError%": t,
    "%Float32Array%": typeof Float32Array > "u" ? n : Float32Array,
    "%Float64Array%": typeof Float64Array > "u" ? n : Float64Array,
    "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? n : FinalizationRegistry,
    "%Function%": h,
    "%GeneratorFunction%": y,
    "%Int8Array%": typeof Int8Array > "u" ? n : Int8Array,
    "%Int16Array%": typeof Int16Array > "u" ? n : Int16Array,
    "%Int32Array%": typeof Int32Array > "u" ? n : Int32Array,
    "%isFinite%": isFinite,
    "%isNaN%": isNaN,
    "%IteratorPrototype%": g && _ ? _(_([][Symbol.iterator]())) : n,
    "%JSON%": typeof JSON == "object" ? JSON : n,
    "%Map%": typeof Map > "u" ? n : Map,
    "%MapIteratorPrototype%": typeof Map > "u" || !g || !_ ? n : _((/* @__PURE__ */ new Map())[Symbol.iterator]()),
    "%Math%": Math,
    "%Number%": Number,
    "%Object%": Object,
    "%parseFloat%": parseFloat,
    "%parseInt%": parseInt,
    "%Promise%": typeof Promise > "u" ? n : Promise,
    "%Proxy%": typeof Proxy > "u" ? n : Proxy,
    "%RangeError%": r,
    "%ReferenceError%": a,
    "%Reflect%": typeof Reflect > "u" ? n : Reflect,
    "%RegExp%": RegExp,
    "%Set%": typeof Set > "u" ? n : Set,
    "%SetIteratorPrototype%": typeof Set > "u" || !g || !_ ? n : _((/* @__PURE__ */ new Set())[Symbol.iterator]()),
    "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? n : SharedArrayBuffer,
    "%String%": String,
    "%StringIteratorPrototype%": g && _ ? _(""[Symbol.iterator]()) : n,
    "%Symbol%": g ? Symbol : n,
    "%SyntaxError%": o,
    "%ThrowTypeError%": d,
    "%TypedArray%": b,
    "%TypeError%": s,
    "%Uint8Array%": typeof Uint8Array > "u" ? n : Uint8Array,
    "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? n : Uint8ClampedArray,
    "%Uint16Array%": typeof Uint16Array > "u" ? n : Uint16Array,
    "%Uint32Array%": typeof Uint32Array > "u" ? n : Uint32Array,
    "%URIError%": u,
    "%WeakMap%": typeof WeakMap > "u" ? n : WeakMap,
    "%WeakRef%": typeof WeakRef > "u" ? n : WeakRef,
    "%WeakSet%": typeof WeakSet > "u" ? n : WeakSet
  };
  if (_)
    try {
      null.error;
    } catch (I) {
      var O = _(_(I));
      S["%Error.prototype%"] = O;
    }
  var D = function I(T) {
    var C;
    if (T === "%AsyncFunction%")
      C = l("async function () {}");
    else if (T === "%GeneratorFunction%")
      C = l("function* () {}");
    else if (T === "%AsyncGeneratorFunction%")
      C = l("async function* () {}");
    else if (T === "%AsyncGenerator%") {
      var R = I("%AsyncGeneratorFunction%");
      R && (C = R.prototype);
    } else if (T === "%AsyncIteratorPrototype%") {
      var w = I("%AsyncGenerator%");
      w && _ && (C = _(w.prototype));
    }
    return S[T] = C, C;
  }, E = {
    __proto__: null,
    "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
    "%ArrayPrototype%": ["Array", "prototype"],
    "%ArrayProto_entries%": ["Array", "prototype", "entries"],
    "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
    "%ArrayProto_keys%": ["Array", "prototype", "keys"],
    "%ArrayProto_values%": ["Array", "prototype", "values"],
    "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
    "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
    "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
    "%BooleanPrototype%": ["Boolean", "prototype"],
    "%DataViewPrototype%": ["DataView", "prototype"],
    "%DatePrototype%": ["Date", "prototype"],
    "%ErrorPrototype%": ["Error", "prototype"],
    "%EvalErrorPrototype%": ["EvalError", "prototype"],
    "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
    "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
    "%FunctionPrototype%": ["Function", "prototype"],
    "%Generator%": ["GeneratorFunction", "prototype"],
    "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
    "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
    "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
    "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
    "%JSONParse%": ["JSON", "parse"],
    "%JSONStringify%": ["JSON", "stringify"],
    "%MapPrototype%": ["Map", "prototype"],
    "%NumberPrototype%": ["Number", "prototype"],
    "%ObjectPrototype%": ["Object", "prototype"],
    "%ObjProto_toString%": ["Object", "prototype", "toString"],
    "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
    "%PromisePrototype%": ["Promise", "prototype"],
    "%PromiseProto_then%": ["Promise", "prototype", "then"],
    "%Promise_all%": ["Promise", "all"],
    "%Promise_reject%": ["Promise", "reject"],
    "%Promise_resolve%": ["Promise", "resolve"],
    "%RangeErrorPrototype%": ["RangeError", "prototype"],
    "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
    "%RegExpPrototype%": ["RegExp", "prototype"],
    "%SetPrototype%": ["Set", "prototype"],
    "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
    "%StringPrototype%": ["String", "prototype"],
    "%SymbolPrototype%": ["Symbol", "prototype"],
    "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
    "%TypedArrayPrototype%": ["TypedArray", "prototype"],
    "%TypeErrorPrototype%": ["TypeError", "prototype"],
    "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
    "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
    "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
    "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
    "%URIErrorPrototype%": ["URIError", "prototype"],
    "%WeakMapPrototype%": ["WeakMap", "prototype"],
    "%WeakSetPrototype%": ["WeakSet", "prototype"]
  }, M = requireFunctionBind(), A = /* @__PURE__ */ requireHasown(), $ = M.call(Function.call, Array.prototype.concat), B = M.call(Function.apply, Array.prototype.splice), U = M.call(Function.call, String.prototype.replace), X = M.call(Function.call, String.prototype.slice), G = M.call(Function.call, RegExp.prototype.exec), K = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, tt = /\\(\\)?/g, Y = function(T) {
    var C = X(T, 0, 1), R = X(T, -1);
    if (C === "%" && R !== "%")
      throw new o("invalid intrinsic syntax, expected closing `%`");
    if (R === "%" && C !== "%")
      throw new o("invalid intrinsic syntax, expected opening `%`");
    var w = [];
    return U(T, K, function(N, L, F, z) {
      w[w.length] = F ? U(z, tt, "$1") : L || N;
    }), w;
  }, P = function(T, C) {
    var R = T, w;
    if (A(E, R) && (w = E[R], R = "%" + w[0] + "%"), A(S, R)) {
      var N = S[R];
      if (N === y && (N = D(R)), typeof N > "u" && !C)
        throw new s("intrinsic " + T + " exists, but is not available. Please file an issue!");
      return {
        alias: w,
        name: R,
        value: N
      };
    }
    throw new o("intrinsic " + T + " does not exist!");
  };
  return getIntrinsic$3 = function(T, C) {
    if (typeof T != "string" || T.length === 0)
      throw new s("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof C != "boolean")
      throw new s('"allowMissing" argument must be a boolean');
    if (G(/^%?[^%]*%?$/, T) === null)
      throw new o("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var R = Y(T), w = R.length > 0 ? R[0] : "", N = P("%" + w + "%", C), L = N.name, F = N.value, z = !1, J = N.alias;
    J && (w = J[0], B(R, $([0, 1], J)));
    for (var V = 1, Z = !0; V < R.length; V += 1) {
      var q = R[V], W = X(q, 0, 1), Q = X(q, -1);
      if ((W === '"' || W === "'" || W === "`" || Q === '"' || Q === "'" || Q === "`") && W !== Q)
        throw new o("property names with quotes must have matching quotes");
      if ((q === "constructor" || !Z) && (z = !0), w += "." + q, L = "%" + w + "%", A(S, L))
        F = S[L];
      else if (F != null) {
        if (!(q in F)) {
          if (!C)
            throw new s("base intrinsic for " + T + " exists, but the property is not available.");
          return;
        }
        if (c && V + 1 >= R.length) {
          var et = c(F, q);
          Z = !!et, Z && "get" in et && !("originalValue" in et.get) ? F = et.get : F = F[q];
        } else
          Z = A(F, q), F = F[q];
        Z && !z && (S[L] = F);
      }
    }
    return F;
  }, getIntrinsic$3;
}
var callBind = { exports: {} }, shams$2, hasRequiredShams$2;
function requireShams$2() {
  return hasRequiredShams$2 || (hasRequiredShams$2 = 1, shams$2 = function() {
    if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function")
      return !1;
    if (typeof Symbol.iterator == "symbol")
      return !0;
    var e = {}, t = Symbol("test"), r = Object(t);
    if (typeof t == "string" || Object.prototype.toString.call(t) !== "[object Symbol]" || Object.prototype.toString.call(r) !== "[object Symbol]")
      return !1;
    var a = 42;
    e[t] = a;
    for (t in e)
      return !1;
    if (typeof Object.keys == "function" && Object.keys(e).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(e).length !== 0)
      return !1;
    var o = Object.getOwnPropertySymbols(e);
    if (o.length !== 1 || o[0] !== t || !Object.prototype.propertyIsEnumerable.call(e, t))
      return !1;
    if (typeof Object.getOwnPropertyDescriptor == "function") {
      var s = Object.getOwnPropertyDescriptor(e, t);
      if (s.value !== a || s.enumerable !== !0)
        return !1;
    }
    return !0;
  }), shams$2;
}
var hasSymbols$2, hasRequiredHasSymbols$2;
function requireHasSymbols$2() {
  if (hasRequiredHasSymbols$2) return hasSymbols$2;
  hasRequiredHasSymbols$2 = 1;
  var n = typeof Symbol < "u" && Symbol, e = requireShams$2();
  return hasSymbols$2 = function() {
    return typeof n != "function" || typeof Symbol != "function" || typeof n("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 : e();
  }, hasSymbols$2;
}
var hasProto$2, hasRequiredHasProto$2;
function requireHasProto$2() {
  if (hasRequiredHasProto$2) return hasProto$2;
  hasRequiredHasProto$2 = 1;
  var n = {
    __proto__: null,
    foo: {}
  }, e = Object;
  return hasProto$2 = function() {
    return { __proto__: n }.foo === n.foo && !(n instanceof e);
  }, hasProto$2;
}
var getIntrinsic$2, hasRequiredGetIntrinsic$2;
function requireGetIntrinsic$2() {
  if (hasRequiredGetIntrinsic$2) return getIntrinsic$2;
  hasRequiredGetIntrinsic$2 = 1;
  var n, e = /* @__PURE__ */ requireEsErrors(), t = /* @__PURE__ */ require_eval(), r = /* @__PURE__ */ requireRange(), a = /* @__PURE__ */ requireRef(), o = /* @__PURE__ */ requireSyntax(), s = /* @__PURE__ */ requireType(), u = /* @__PURE__ */ requireUri(), h = Function, l = function(I) {
    try {
      return h('"use strict"; return (' + I + ").constructor;")();
    } catch {
    }
  }, c = Object.getOwnPropertyDescriptor;
  if (c)
    try {
      c({}, "");
    } catch {
      c = null;
    }
  var v = function() {
    throw new s();
  }, d = c ? function() {
    try {
      return arguments.callee, v;
    } catch {
      try {
        return c(arguments, "callee").get;
      } catch {
        return v;
      }
    }
  }() : v, g = requireHasSymbols$2()(), m = /* @__PURE__ */ requireHasProto$2()(), _ = Object.getPrototypeOf || (m ? function(I) {
    return I.__proto__;
  } : null), y = {}, b = typeof Uint8Array > "u" || !_ ? n : _(Uint8Array), S = {
    __proto__: null,
    "%AggregateError%": typeof AggregateError > "u" ? n : AggregateError,
    "%Array%": Array,
    "%ArrayBuffer%": typeof ArrayBuffer > "u" ? n : ArrayBuffer,
    "%ArrayIteratorPrototype%": g && _ ? _([][Symbol.iterator]()) : n,
    "%AsyncFromSyncIteratorPrototype%": n,
    "%AsyncFunction%": y,
    "%AsyncGenerator%": y,
    "%AsyncGeneratorFunction%": y,
    "%AsyncIteratorPrototype%": y,
    "%Atomics%": typeof Atomics > "u" ? n : Atomics,
    "%BigInt%": typeof BigInt > "u" ? n : BigInt,
    "%BigInt64Array%": typeof BigInt64Array > "u" ? n : BigInt64Array,
    "%BigUint64Array%": typeof BigUint64Array > "u" ? n : BigUint64Array,
    "%Boolean%": Boolean,
    "%DataView%": typeof DataView > "u" ? n : DataView,
    "%Date%": Date,
    "%decodeURI%": decodeURI,
    "%decodeURIComponent%": decodeURIComponent,
    "%encodeURI%": encodeURI,
    "%encodeURIComponent%": encodeURIComponent,
    "%Error%": e,
    "%eval%": eval,
    // eslint-disable-line no-eval
    "%EvalError%": t,
    "%Float32Array%": typeof Float32Array > "u" ? n : Float32Array,
    "%Float64Array%": typeof Float64Array > "u" ? n : Float64Array,
    "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? n : FinalizationRegistry,
    "%Function%": h,
    "%GeneratorFunction%": y,
    "%Int8Array%": typeof Int8Array > "u" ? n : Int8Array,
    "%Int16Array%": typeof Int16Array > "u" ? n : Int16Array,
    "%Int32Array%": typeof Int32Array > "u" ? n : Int32Array,
    "%isFinite%": isFinite,
    "%isNaN%": isNaN,
    "%IteratorPrototype%": g && _ ? _(_([][Symbol.iterator]())) : n,
    "%JSON%": typeof JSON == "object" ? JSON : n,
    "%Map%": typeof Map > "u" ? n : Map,
    "%MapIteratorPrototype%": typeof Map > "u" || !g || !_ ? n : _((/* @__PURE__ */ new Map())[Symbol.iterator]()),
    "%Math%": Math,
    "%Number%": Number,
    "%Object%": Object,
    "%parseFloat%": parseFloat,
    "%parseInt%": parseInt,
    "%Promise%": typeof Promise > "u" ? n : Promise,
    "%Proxy%": typeof Proxy > "u" ? n : Proxy,
    "%RangeError%": r,
    "%ReferenceError%": a,
    "%Reflect%": typeof Reflect > "u" ? n : Reflect,
    "%RegExp%": RegExp,
    "%Set%": typeof Set > "u" ? n : Set,
    "%SetIteratorPrototype%": typeof Set > "u" || !g || !_ ? n : _((/* @__PURE__ */ new Set())[Symbol.iterator]()),
    "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? n : SharedArrayBuffer,
    "%String%": String,
    "%StringIteratorPrototype%": g && _ ? _(""[Symbol.iterator]()) : n,
    "%Symbol%": g ? Symbol : n,
    "%SyntaxError%": o,
    "%ThrowTypeError%": d,
    "%TypedArray%": b,
    "%TypeError%": s,
    "%Uint8Array%": typeof Uint8Array > "u" ? n : Uint8Array,
    "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? n : Uint8ClampedArray,
    "%Uint16Array%": typeof Uint16Array > "u" ? n : Uint16Array,
    "%Uint32Array%": typeof Uint32Array > "u" ? n : Uint32Array,
    "%URIError%": u,
    "%WeakMap%": typeof WeakMap > "u" ? n : WeakMap,
    "%WeakRef%": typeof WeakRef > "u" ? n : WeakRef,
    "%WeakSet%": typeof WeakSet > "u" ? n : WeakSet
  };
  if (_)
    try {
      null.error;
    } catch (I) {
      var O = _(_(I));
      S["%Error.prototype%"] = O;
    }
  var D = function I(T) {
    var C;
    if (T === "%AsyncFunction%")
      C = l("async function () {}");
    else if (T === "%GeneratorFunction%")
      C = l("function* () {}");
    else if (T === "%AsyncGeneratorFunction%")
      C = l("async function* () {}");
    else if (T === "%AsyncGenerator%") {
      var R = I("%AsyncGeneratorFunction%");
      R && (C = R.prototype);
    } else if (T === "%AsyncIteratorPrototype%") {
      var w = I("%AsyncGenerator%");
      w && _ && (C = _(w.prototype));
    }
    return S[T] = C, C;
  }, E = {
    __proto__: null,
    "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
    "%ArrayPrototype%": ["Array", "prototype"],
    "%ArrayProto_entries%": ["Array", "prototype", "entries"],
    "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
    "%ArrayProto_keys%": ["Array", "prototype", "keys"],
    "%ArrayProto_values%": ["Array", "prototype", "values"],
    "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
    "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
    "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
    "%BooleanPrototype%": ["Boolean", "prototype"],
    "%DataViewPrototype%": ["DataView", "prototype"],
    "%DatePrototype%": ["Date", "prototype"],
    "%ErrorPrototype%": ["Error", "prototype"],
    "%EvalErrorPrototype%": ["EvalError", "prototype"],
    "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
    "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
    "%FunctionPrototype%": ["Function", "prototype"],
    "%Generator%": ["GeneratorFunction", "prototype"],
    "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
    "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
    "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
    "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
    "%JSONParse%": ["JSON", "parse"],
    "%JSONStringify%": ["JSON", "stringify"],
    "%MapPrototype%": ["Map", "prototype"],
    "%NumberPrototype%": ["Number", "prototype"],
    "%ObjectPrototype%": ["Object", "prototype"],
    "%ObjProto_toString%": ["Object", "prototype", "toString"],
    "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
    "%PromisePrototype%": ["Promise", "prototype"],
    "%PromiseProto_then%": ["Promise", "prototype", "then"],
    "%Promise_all%": ["Promise", "all"],
    "%Promise_reject%": ["Promise", "reject"],
    "%Promise_resolve%": ["Promise", "resolve"],
    "%RangeErrorPrototype%": ["RangeError", "prototype"],
    "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
    "%RegExpPrototype%": ["RegExp", "prototype"],
    "%SetPrototype%": ["Set", "prototype"],
    "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
    "%StringPrototype%": ["String", "prototype"],
    "%SymbolPrototype%": ["Symbol", "prototype"],
    "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
    "%TypedArrayPrototype%": ["TypedArray", "prototype"],
    "%TypeErrorPrototype%": ["TypeError", "prototype"],
    "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
    "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
    "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
    "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
    "%URIErrorPrototype%": ["URIError", "prototype"],
    "%WeakMapPrototype%": ["WeakMap", "prototype"],
    "%WeakSetPrototype%": ["WeakSet", "prototype"]
  }, M = requireFunctionBind(), A = /* @__PURE__ */ requireHasown(), $ = M.call(Function.call, Array.prototype.concat), B = M.call(Function.apply, Array.prototype.splice), U = M.call(Function.call, String.prototype.replace), X = M.call(Function.call, String.prototype.slice), G = M.call(Function.call, RegExp.prototype.exec), K = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, tt = /\\(\\)?/g, Y = function(T) {
    var C = X(T, 0, 1), R = X(T, -1);
    if (C === "%" && R !== "%")
      throw new o("invalid intrinsic syntax, expected closing `%`");
    if (R === "%" && C !== "%")
      throw new o("invalid intrinsic syntax, expected opening `%`");
    var w = [];
    return U(T, K, function(N, L, F, z) {
      w[w.length] = F ? U(z, tt, "$1") : L || N;
    }), w;
  }, P = function(T, C) {
    var R = T, w;
    if (A(E, R) && (w = E[R], R = "%" + w[0] + "%"), A(S, R)) {
      var N = S[R];
      if (N === y && (N = D(R)), typeof N > "u" && !C)
        throw new s("intrinsic " + T + " exists, but is not available. Please file an issue!");
      return {
        alias: w,
        name: R,
        value: N
      };
    }
    throw new o("intrinsic " + T + " does not exist!");
  };
  return getIntrinsic$2 = function(T, C) {
    if (typeof T != "string" || T.length === 0)
      throw new s("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof C != "boolean")
      throw new s('"allowMissing" argument must be a boolean');
    if (G(/^%?[^%]*%?$/, T) === null)
      throw new o("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var R = Y(T), w = R.length > 0 ? R[0] : "", N = P("%" + w + "%", C), L = N.name, F = N.value, z = !1, J = N.alias;
    J && (w = J[0], B(R, $([0, 1], J)));
    for (var V = 1, Z = !0; V < R.length; V += 1) {
      var q = R[V], W = X(q, 0, 1), Q = X(q, -1);
      if ((W === '"' || W === "'" || W === "`" || Q === '"' || Q === "'" || Q === "`") && W !== Q)
        throw new o("property names with quotes must have matching quotes");
      if ((q === "constructor" || !Z) && (z = !0), w += "." + q, L = "%" + w + "%", A(S, L))
        F = S[L];
      else if (F != null) {
        if (!(q in F)) {
          if (!C)
            throw new s("base intrinsic for " + T + " exists, but the property is not available.");
          return;
        }
        if (c && V + 1 >= R.length) {
          var et = c(F, q);
          Z = !!et, Z && "get" in et && !("originalValue" in et.get) ? F = et.get : F = F[q];
        } else
          Z = A(F, q), F = F[q];
        Z && !z && (S[L] = F);
      }
    }
    return F;
  }, getIntrinsic$2;
}
var shams$1, hasRequiredShams$1;
function requireShams$1() {
  return hasRequiredShams$1 || (hasRequiredShams$1 = 1, shams$1 = function() {
    if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function")
      return !1;
    if (typeof Symbol.iterator == "symbol")
      return !0;
    var e = {}, t = Symbol("test"), r = Object(t);
    if (typeof t == "string" || Object.prototype.toString.call(t) !== "[object Symbol]" || Object.prototype.toString.call(r) !== "[object Symbol]")
      return !1;
    var a = 42;
    e[t] = a;
    for (t in e)
      return !1;
    if (typeof Object.keys == "function" && Object.keys(e).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(e).length !== 0)
      return !1;
    var o = Object.getOwnPropertySymbols(e);
    if (o.length !== 1 || o[0] !== t || !Object.prototype.propertyIsEnumerable.call(e, t))
      return !1;
    if (typeof Object.getOwnPropertyDescriptor == "function") {
      var s = Object.getOwnPropertyDescriptor(e, t);
      if (s.value !== a || s.enumerable !== !0)
        return !1;
    }
    return !0;
  }), shams$1;
}
var hasSymbols$1, hasRequiredHasSymbols$1;
function requireHasSymbols$1() {
  if (hasRequiredHasSymbols$1) return hasSymbols$1;
  hasRequiredHasSymbols$1 = 1;
  var n = typeof Symbol < "u" && Symbol, e = requireShams$1();
  return hasSymbols$1 = function() {
    return typeof n != "function" || typeof Symbol != "function" || typeof n("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 : e();
  }, hasSymbols$1;
}
var hasProto$1, hasRequiredHasProto$1;
function requireHasProto$1() {
  if (hasRequiredHasProto$1) return hasProto$1;
  hasRequiredHasProto$1 = 1;
  var n = {
    __proto__: null,
    foo: {}
  }, e = Object;
  return hasProto$1 = function() {
    return { __proto__: n }.foo === n.foo && !(n instanceof e);
  }, hasProto$1;
}
var getIntrinsic$1, hasRequiredGetIntrinsic$1;
function requireGetIntrinsic$1() {
  if (hasRequiredGetIntrinsic$1) return getIntrinsic$1;
  hasRequiredGetIntrinsic$1 = 1;
  var n, e = /* @__PURE__ */ requireEsErrors(), t = /* @__PURE__ */ require_eval(), r = /* @__PURE__ */ requireRange(), a = /* @__PURE__ */ requireRef(), o = /* @__PURE__ */ requireSyntax(), s = /* @__PURE__ */ requireType(), u = /* @__PURE__ */ requireUri(), h = Function, l = function(I) {
    try {
      return h('"use strict"; return (' + I + ").constructor;")();
    } catch {
    }
  }, c = Object.getOwnPropertyDescriptor;
  if (c)
    try {
      c({}, "");
    } catch {
      c = null;
    }
  var v = function() {
    throw new s();
  }, d = c ? function() {
    try {
      return arguments.callee, v;
    } catch {
      try {
        return c(arguments, "callee").get;
      } catch {
        return v;
      }
    }
  }() : v, g = requireHasSymbols$1()(), m = /* @__PURE__ */ requireHasProto$1()(), _ = Object.getPrototypeOf || (m ? function(I) {
    return I.__proto__;
  } : null), y = {}, b = typeof Uint8Array > "u" || !_ ? n : _(Uint8Array), S = {
    __proto__: null,
    "%AggregateError%": typeof AggregateError > "u" ? n : AggregateError,
    "%Array%": Array,
    "%ArrayBuffer%": typeof ArrayBuffer > "u" ? n : ArrayBuffer,
    "%ArrayIteratorPrototype%": g && _ ? _([][Symbol.iterator]()) : n,
    "%AsyncFromSyncIteratorPrototype%": n,
    "%AsyncFunction%": y,
    "%AsyncGenerator%": y,
    "%AsyncGeneratorFunction%": y,
    "%AsyncIteratorPrototype%": y,
    "%Atomics%": typeof Atomics > "u" ? n : Atomics,
    "%BigInt%": typeof BigInt > "u" ? n : BigInt,
    "%BigInt64Array%": typeof BigInt64Array > "u" ? n : BigInt64Array,
    "%BigUint64Array%": typeof BigUint64Array > "u" ? n : BigUint64Array,
    "%Boolean%": Boolean,
    "%DataView%": typeof DataView > "u" ? n : DataView,
    "%Date%": Date,
    "%decodeURI%": decodeURI,
    "%decodeURIComponent%": decodeURIComponent,
    "%encodeURI%": encodeURI,
    "%encodeURIComponent%": encodeURIComponent,
    "%Error%": e,
    "%eval%": eval,
    // eslint-disable-line no-eval
    "%EvalError%": t,
    "%Float32Array%": typeof Float32Array > "u" ? n : Float32Array,
    "%Float64Array%": typeof Float64Array > "u" ? n : Float64Array,
    "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? n : FinalizationRegistry,
    "%Function%": h,
    "%GeneratorFunction%": y,
    "%Int8Array%": typeof Int8Array > "u" ? n : Int8Array,
    "%Int16Array%": typeof Int16Array > "u" ? n : Int16Array,
    "%Int32Array%": typeof Int32Array > "u" ? n : Int32Array,
    "%isFinite%": isFinite,
    "%isNaN%": isNaN,
    "%IteratorPrototype%": g && _ ? _(_([][Symbol.iterator]())) : n,
    "%JSON%": typeof JSON == "object" ? JSON : n,
    "%Map%": typeof Map > "u" ? n : Map,
    "%MapIteratorPrototype%": typeof Map > "u" || !g || !_ ? n : _((/* @__PURE__ */ new Map())[Symbol.iterator]()),
    "%Math%": Math,
    "%Number%": Number,
    "%Object%": Object,
    "%parseFloat%": parseFloat,
    "%parseInt%": parseInt,
    "%Promise%": typeof Promise > "u" ? n : Promise,
    "%Proxy%": typeof Proxy > "u" ? n : Proxy,
    "%RangeError%": r,
    "%ReferenceError%": a,
    "%Reflect%": typeof Reflect > "u" ? n : Reflect,
    "%RegExp%": RegExp,
    "%Set%": typeof Set > "u" ? n : Set,
    "%SetIteratorPrototype%": typeof Set > "u" || !g || !_ ? n : _((/* @__PURE__ */ new Set())[Symbol.iterator]()),
    "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? n : SharedArrayBuffer,
    "%String%": String,
    "%StringIteratorPrototype%": g && _ ? _(""[Symbol.iterator]()) : n,
    "%Symbol%": g ? Symbol : n,
    "%SyntaxError%": o,
    "%ThrowTypeError%": d,
    "%TypedArray%": b,
    "%TypeError%": s,
    "%Uint8Array%": typeof Uint8Array > "u" ? n : Uint8Array,
    "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? n : Uint8ClampedArray,
    "%Uint16Array%": typeof Uint16Array > "u" ? n : Uint16Array,
    "%Uint32Array%": typeof Uint32Array > "u" ? n : Uint32Array,
    "%URIError%": u,
    "%WeakMap%": typeof WeakMap > "u" ? n : WeakMap,
    "%WeakRef%": typeof WeakRef > "u" ? n : WeakRef,
    "%WeakSet%": typeof WeakSet > "u" ? n : WeakSet
  };
  if (_)
    try {
      null.error;
    } catch (I) {
      var O = _(_(I));
      S["%Error.prototype%"] = O;
    }
  var D = function I(T) {
    var C;
    if (T === "%AsyncFunction%")
      C = l("async function () {}");
    else if (T === "%GeneratorFunction%")
      C = l("function* () {}");
    else if (T === "%AsyncGeneratorFunction%")
      C = l("async function* () {}");
    else if (T === "%AsyncGenerator%") {
      var R = I("%AsyncGeneratorFunction%");
      R && (C = R.prototype);
    } else if (T === "%AsyncIteratorPrototype%") {
      var w = I("%AsyncGenerator%");
      w && _ && (C = _(w.prototype));
    }
    return S[T] = C, C;
  }, E = {
    __proto__: null,
    "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
    "%ArrayPrototype%": ["Array", "prototype"],
    "%ArrayProto_entries%": ["Array", "prototype", "entries"],
    "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
    "%ArrayProto_keys%": ["Array", "prototype", "keys"],
    "%ArrayProto_values%": ["Array", "prototype", "values"],
    "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
    "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
    "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
    "%BooleanPrototype%": ["Boolean", "prototype"],
    "%DataViewPrototype%": ["DataView", "prototype"],
    "%DatePrototype%": ["Date", "prototype"],
    "%ErrorPrototype%": ["Error", "prototype"],
    "%EvalErrorPrototype%": ["EvalError", "prototype"],
    "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
    "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
    "%FunctionPrototype%": ["Function", "prototype"],
    "%Generator%": ["GeneratorFunction", "prototype"],
    "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
    "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
    "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
    "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
    "%JSONParse%": ["JSON", "parse"],
    "%JSONStringify%": ["JSON", "stringify"],
    "%MapPrototype%": ["Map", "prototype"],
    "%NumberPrototype%": ["Number", "prototype"],
    "%ObjectPrototype%": ["Object", "prototype"],
    "%ObjProto_toString%": ["Object", "prototype", "toString"],
    "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
    "%PromisePrototype%": ["Promise", "prototype"],
    "%PromiseProto_then%": ["Promise", "prototype", "then"],
    "%Promise_all%": ["Promise", "all"],
    "%Promise_reject%": ["Promise", "reject"],
    "%Promise_resolve%": ["Promise", "resolve"],
    "%RangeErrorPrototype%": ["RangeError", "prototype"],
    "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
    "%RegExpPrototype%": ["RegExp", "prototype"],
    "%SetPrototype%": ["Set", "prototype"],
    "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
    "%StringPrototype%": ["String", "prototype"],
    "%SymbolPrototype%": ["Symbol", "prototype"],
    "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
    "%TypedArrayPrototype%": ["TypedArray", "prototype"],
    "%TypeErrorPrototype%": ["TypeError", "prototype"],
    "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
    "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
    "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
    "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
    "%URIErrorPrototype%": ["URIError", "prototype"],
    "%WeakMapPrototype%": ["WeakMap", "prototype"],
    "%WeakSetPrototype%": ["WeakSet", "prototype"]
  }, M = requireFunctionBind(), A = /* @__PURE__ */ requireHasown(), $ = M.call(Function.call, Array.prototype.concat), B = M.call(Function.apply, Array.prototype.splice), U = M.call(Function.call, String.prototype.replace), X = M.call(Function.call, String.prototype.slice), G = M.call(Function.call, RegExp.prototype.exec), K = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, tt = /\\(\\)?/g, Y = function(T) {
    var C = X(T, 0, 1), R = X(T, -1);
    if (C === "%" && R !== "%")
      throw new o("invalid intrinsic syntax, expected closing `%`");
    if (R === "%" && C !== "%")
      throw new o("invalid intrinsic syntax, expected opening `%`");
    var w = [];
    return U(T, K, function(N, L, F, z) {
      w[w.length] = F ? U(z, tt, "$1") : L || N;
    }), w;
  }, P = function(T, C) {
    var R = T, w;
    if (A(E, R) && (w = E[R], R = "%" + w[0] + "%"), A(S, R)) {
      var N = S[R];
      if (N === y && (N = D(R)), typeof N > "u" && !C)
        throw new s("intrinsic " + T + " exists, but is not available. Please file an issue!");
      return {
        alias: w,
        name: R,
        value: N
      };
    }
    throw new o("intrinsic " + T + " does not exist!");
  };
  return getIntrinsic$1 = function(T, C) {
    if (typeof T != "string" || T.length === 0)
      throw new s("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof C != "boolean")
      throw new s('"allowMissing" argument must be a boolean');
    if (G(/^%?[^%]*%?$/, T) === null)
      throw new o("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var R = Y(T), w = R.length > 0 ? R[0] : "", N = P("%" + w + "%", C), L = N.name, F = N.value, z = !1, J = N.alias;
    J && (w = J[0], B(R, $([0, 1], J)));
    for (var V = 1, Z = !0; V < R.length; V += 1) {
      var q = R[V], W = X(q, 0, 1), Q = X(q, -1);
      if ((W === '"' || W === "'" || W === "`" || Q === '"' || Q === "'" || Q === "`") && W !== Q)
        throw new o("property names with quotes must have matching quotes");
      if ((q === "constructor" || !Z) && (z = !0), w += "." + q, L = "%" + w + "%", A(S, L))
        F = S[L];
      else if (F != null) {
        if (!(q in F)) {
          if (!C)
            throw new s("base intrinsic for " + T + " exists, but the property is not available.");
          return;
        }
        if (c && V + 1 >= R.length) {
          var et = c(F, q);
          Z = !!et, Z && "get" in et && !("originalValue" in et.get) ? F = et.get : F = F[q];
        } else
          Z = A(F, q), F = F[q];
        Z && !z && (S[L] = F);
      }
    }
    return F;
  }, getIntrinsic$1;
}
var esDefineProperty, hasRequiredEsDefineProperty;
function requireEsDefineProperty() {
  if (hasRequiredEsDefineProperty) return esDefineProperty;
  hasRequiredEsDefineProperty = 1;
  var n = /* @__PURE__ */ requireGetIntrinsic$1(), e = n("%Object.defineProperty%", !0) || !1;
  if (e)
    try {
      e({}, "a", { value: 1 });
    } catch {
      e = !1;
    }
  return esDefineProperty = e, esDefineProperty;
}
var shams, hasRequiredShams;
function requireShams() {
  return hasRequiredShams || (hasRequiredShams = 1, shams = function() {
    if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function")
      return !1;
    if (typeof Symbol.iterator == "symbol")
      return !0;
    var e = {}, t = Symbol("test"), r = Object(t);
    if (typeof t == "string" || Object.prototype.toString.call(t) !== "[object Symbol]" || Object.prototype.toString.call(r) !== "[object Symbol]")
      return !1;
    var a = 42;
    e[t] = a;
    for (t in e)
      return !1;
    if (typeof Object.keys == "function" && Object.keys(e).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(e).length !== 0)
      return !1;
    var o = Object.getOwnPropertySymbols(e);
    if (o.length !== 1 || o[0] !== t || !Object.prototype.propertyIsEnumerable.call(e, t))
      return !1;
    if (typeof Object.getOwnPropertyDescriptor == "function") {
      var s = Object.getOwnPropertyDescriptor(e, t);
      if (s.value !== a || s.enumerable !== !0)
        return !1;
    }
    return !0;
  }), shams;
}
var hasSymbols, hasRequiredHasSymbols;
function requireHasSymbols() {
  if (hasRequiredHasSymbols) return hasSymbols;
  hasRequiredHasSymbols = 1;
  var n = typeof Symbol < "u" && Symbol, e = requireShams();
  return hasSymbols = function() {
    return typeof n != "function" || typeof Symbol != "function" || typeof n("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 : e();
  }, hasSymbols;
}
var hasProto, hasRequiredHasProto;
function requireHasProto() {
  if (hasRequiredHasProto) return hasProto;
  hasRequiredHasProto = 1;
  var n = {
    __proto__: null,
    foo: {}
  }, e = Object;
  return hasProto = function() {
    return { __proto__: n }.foo === n.foo && !(n instanceof e);
  }, hasProto;
}
var getIntrinsic, hasRequiredGetIntrinsic;
function requireGetIntrinsic() {
  if (hasRequiredGetIntrinsic) return getIntrinsic;
  hasRequiredGetIntrinsic = 1;
  var n, e = /* @__PURE__ */ requireEsErrors(), t = /* @__PURE__ */ require_eval(), r = /* @__PURE__ */ requireRange(), a = /* @__PURE__ */ requireRef(), o = /* @__PURE__ */ requireSyntax(), s = /* @__PURE__ */ requireType(), u = /* @__PURE__ */ requireUri(), h = Function, l = function(I) {
    try {
      return h('"use strict"; return (' + I + ").constructor;")();
    } catch {
    }
  }, c = Object.getOwnPropertyDescriptor;
  if (c)
    try {
      c({}, "");
    } catch {
      c = null;
    }
  var v = function() {
    throw new s();
  }, d = c ? function() {
    try {
      return arguments.callee, v;
    } catch {
      try {
        return c(arguments, "callee").get;
      } catch {
        return v;
      }
    }
  }() : v, g = requireHasSymbols()(), m = /* @__PURE__ */ requireHasProto()(), _ = Object.getPrototypeOf || (m ? function(I) {
    return I.__proto__;
  } : null), y = {}, b = typeof Uint8Array > "u" || !_ ? n : _(Uint8Array), S = {
    __proto__: null,
    "%AggregateError%": typeof AggregateError > "u" ? n : AggregateError,
    "%Array%": Array,
    "%ArrayBuffer%": typeof ArrayBuffer > "u" ? n : ArrayBuffer,
    "%ArrayIteratorPrototype%": g && _ ? _([][Symbol.iterator]()) : n,
    "%AsyncFromSyncIteratorPrototype%": n,
    "%AsyncFunction%": y,
    "%AsyncGenerator%": y,
    "%AsyncGeneratorFunction%": y,
    "%AsyncIteratorPrototype%": y,
    "%Atomics%": typeof Atomics > "u" ? n : Atomics,
    "%BigInt%": typeof BigInt > "u" ? n : BigInt,
    "%BigInt64Array%": typeof BigInt64Array > "u" ? n : BigInt64Array,
    "%BigUint64Array%": typeof BigUint64Array > "u" ? n : BigUint64Array,
    "%Boolean%": Boolean,
    "%DataView%": typeof DataView > "u" ? n : DataView,
    "%Date%": Date,
    "%decodeURI%": decodeURI,
    "%decodeURIComponent%": decodeURIComponent,
    "%encodeURI%": encodeURI,
    "%encodeURIComponent%": encodeURIComponent,
    "%Error%": e,
    "%eval%": eval,
    // eslint-disable-line no-eval
    "%EvalError%": t,
    "%Float32Array%": typeof Float32Array > "u" ? n : Float32Array,
    "%Float64Array%": typeof Float64Array > "u" ? n : Float64Array,
    "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? n : FinalizationRegistry,
    "%Function%": h,
    "%GeneratorFunction%": y,
    "%Int8Array%": typeof Int8Array > "u" ? n : Int8Array,
    "%Int16Array%": typeof Int16Array > "u" ? n : Int16Array,
    "%Int32Array%": typeof Int32Array > "u" ? n : Int32Array,
    "%isFinite%": isFinite,
    "%isNaN%": isNaN,
    "%IteratorPrototype%": g && _ ? _(_([][Symbol.iterator]())) : n,
    "%JSON%": typeof JSON == "object" ? JSON : n,
    "%Map%": typeof Map > "u" ? n : Map,
    "%MapIteratorPrototype%": typeof Map > "u" || !g || !_ ? n : _((/* @__PURE__ */ new Map())[Symbol.iterator]()),
    "%Math%": Math,
    "%Number%": Number,
    "%Object%": Object,
    "%parseFloat%": parseFloat,
    "%parseInt%": parseInt,
    "%Promise%": typeof Promise > "u" ? n : Promise,
    "%Proxy%": typeof Proxy > "u" ? n : Proxy,
    "%RangeError%": r,
    "%ReferenceError%": a,
    "%Reflect%": typeof Reflect > "u" ? n : Reflect,
    "%RegExp%": RegExp,
    "%Set%": typeof Set > "u" ? n : Set,
    "%SetIteratorPrototype%": typeof Set > "u" || !g || !_ ? n : _((/* @__PURE__ */ new Set())[Symbol.iterator]()),
    "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? n : SharedArrayBuffer,
    "%String%": String,
    "%StringIteratorPrototype%": g && _ ? _(""[Symbol.iterator]()) : n,
    "%Symbol%": g ? Symbol : n,
    "%SyntaxError%": o,
    "%ThrowTypeError%": d,
    "%TypedArray%": b,
    "%TypeError%": s,
    "%Uint8Array%": typeof Uint8Array > "u" ? n : Uint8Array,
    "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? n : Uint8ClampedArray,
    "%Uint16Array%": typeof Uint16Array > "u" ? n : Uint16Array,
    "%Uint32Array%": typeof Uint32Array > "u" ? n : Uint32Array,
    "%URIError%": u,
    "%WeakMap%": typeof WeakMap > "u" ? n : WeakMap,
    "%WeakRef%": typeof WeakRef > "u" ? n : WeakRef,
    "%WeakSet%": typeof WeakSet > "u" ? n : WeakSet
  };
  if (_)
    try {
      null.error;
    } catch (I) {
      var O = _(_(I));
      S["%Error.prototype%"] = O;
    }
  var D = function I(T) {
    var C;
    if (T === "%AsyncFunction%")
      C = l("async function () {}");
    else if (T === "%GeneratorFunction%")
      C = l("function* () {}");
    else if (T === "%AsyncGeneratorFunction%")
      C = l("async function* () {}");
    else if (T === "%AsyncGenerator%") {
      var R = I("%AsyncGeneratorFunction%");
      R && (C = R.prototype);
    } else if (T === "%AsyncIteratorPrototype%") {
      var w = I("%AsyncGenerator%");
      w && _ && (C = _(w.prototype));
    }
    return S[T] = C, C;
  }, E = {
    __proto__: null,
    "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
    "%ArrayPrototype%": ["Array", "prototype"],
    "%ArrayProto_entries%": ["Array", "prototype", "entries"],
    "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
    "%ArrayProto_keys%": ["Array", "prototype", "keys"],
    "%ArrayProto_values%": ["Array", "prototype", "values"],
    "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
    "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
    "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
    "%BooleanPrototype%": ["Boolean", "prototype"],
    "%DataViewPrototype%": ["DataView", "prototype"],
    "%DatePrototype%": ["Date", "prototype"],
    "%ErrorPrototype%": ["Error", "prototype"],
    "%EvalErrorPrototype%": ["EvalError", "prototype"],
    "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
    "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
    "%FunctionPrototype%": ["Function", "prototype"],
    "%Generator%": ["GeneratorFunction", "prototype"],
    "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
    "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
    "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
    "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
    "%JSONParse%": ["JSON", "parse"],
    "%JSONStringify%": ["JSON", "stringify"],
    "%MapPrototype%": ["Map", "prototype"],
    "%NumberPrototype%": ["Number", "prototype"],
    "%ObjectPrototype%": ["Object", "prototype"],
    "%ObjProto_toString%": ["Object", "prototype", "toString"],
    "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
    "%PromisePrototype%": ["Promise", "prototype"],
    "%PromiseProto_then%": ["Promise", "prototype", "then"],
    "%Promise_all%": ["Promise", "all"],
    "%Promise_reject%": ["Promise", "reject"],
    "%Promise_resolve%": ["Promise", "resolve"],
    "%RangeErrorPrototype%": ["RangeError", "prototype"],
    "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
    "%RegExpPrototype%": ["RegExp", "prototype"],
    "%SetPrototype%": ["Set", "prototype"],
    "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
    "%StringPrototype%": ["String", "prototype"],
    "%SymbolPrototype%": ["Symbol", "prototype"],
    "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
    "%TypedArrayPrototype%": ["TypedArray", "prototype"],
    "%TypeErrorPrototype%": ["TypeError", "prototype"],
    "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
    "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
    "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
    "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
    "%URIErrorPrototype%": ["URIError", "prototype"],
    "%WeakMapPrototype%": ["WeakMap", "prototype"],
    "%WeakSetPrototype%": ["WeakSet", "prototype"]
  }, M = requireFunctionBind(), A = /* @__PURE__ */ requireHasown(), $ = M.call(Function.call, Array.prototype.concat), B = M.call(Function.apply, Array.prototype.splice), U = M.call(Function.call, String.prototype.replace), X = M.call(Function.call, String.prototype.slice), G = M.call(Function.call, RegExp.prototype.exec), K = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, tt = /\\(\\)?/g, Y = function(T) {
    var C = X(T, 0, 1), R = X(T, -1);
    if (C === "%" && R !== "%")
      throw new o("invalid intrinsic syntax, expected closing `%`");
    if (R === "%" && C !== "%")
      throw new o("invalid intrinsic syntax, expected opening `%`");
    var w = [];
    return U(T, K, function(N, L, F, z) {
      w[w.length] = F ? U(z, tt, "$1") : L || N;
    }), w;
  }, P = function(T, C) {
    var R = T, w;
    if (A(E, R) && (w = E[R], R = "%" + w[0] + "%"), A(S, R)) {
      var N = S[R];
      if (N === y && (N = D(R)), typeof N > "u" && !C)
        throw new s("intrinsic " + T + " exists, but is not available. Please file an issue!");
      return {
        alias: w,
        name: R,
        value: N
      };
    }
    throw new o("intrinsic " + T + " does not exist!");
  };
  return getIntrinsic = function(T, C) {
    if (typeof T != "string" || T.length === 0)
      throw new s("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof C != "boolean")
      throw new s('"allowMissing" argument must be a boolean');
    if (G(/^%?[^%]*%?$/, T) === null)
      throw new o("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var R = Y(T), w = R.length > 0 ? R[0] : "", N = P("%" + w + "%", C), L = N.name, F = N.value, z = !1, J = N.alias;
    J && (w = J[0], B(R, $([0, 1], J)));
    for (var V = 1, Z = !0; V < R.length; V += 1) {
      var q = R[V], W = X(q, 0, 1), Q = X(q, -1);
      if ((W === '"' || W === "'" || W === "`" || Q === '"' || Q === "'" || Q === "`") && W !== Q)
        throw new o("property names with quotes must have matching quotes");
      if ((q === "constructor" || !Z) && (z = !0), w += "." + q, L = "%" + w + "%", A(S, L))
        F = S[L];
      else if (F != null) {
        if (!(q in F)) {
          if (!C)
            throw new s("base intrinsic for " + T + " exists, but the property is not available.");
          return;
        }
        if (c && V + 1 >= R.length) {
          var et = c(F, q);
          Z = !!et, Z && "get" in et && !("originalValue" in et.get) ? F = et.get : F = F[q];
        } else
          Z = A(F, q), F = F[q];
        Z && !z && (S[L] = F);
      }
    }
    return F;
  }, getIntrinsic;
}
var gopd$1, hasRequiredGopd$1;
function requireGopd$1() {
  if (hasRequiredGopd$1) return gopd$1;
  hasRequiredGopd$1 = 1;
  var n = /* @__PURE__ */ requireGetIntrinsic(), e = n("%Object.getOwnPropertyDescriptor%", !0);
  if (e)
    try {
      e([], "length");
    } catch {
      e = null;
    }
  return gopd$1 = e, gopd$1;
}
var defineDataProperty, hasRequiredDefineDataProperty;
function requireDefineDataProperty() {
  if (hasRequiredDefineDataProperty) return defineDataProperty;
  hasRequiredDefineDataProperty = 1;
  var n = /* @__PURE__ */ requireEsDefineProperty(), e = /* @__PURE__ */ requireSyntax(), t = /* @__PURE__ */ requireType(), r = /* @__PURE__ */ requireGopd$1();
  return defineDataProperty = function(o, s, u) {
    if (!o || typeof o != "object" && typeof o != "function")
      throw new t("`obj` must be an object or a function`");
    if (typeof s != "string" && typeof s != "symbol")
      throw new t("`property` must be a string or a symbol`");
    if (arguments.length > 3 && typeof arguments[3] != "boolean" && arguments[3] !== null)
      throw new t("`nonEnumerable`, if provided, must be a boolean or null");
    if (arguments.length > 4 && typeof arguments[4] != "boolean" && arguments[4] !== null)
      throw new t("`nonWritable`, if provided, must be a boolean or null");
    if (arguments.length > 5 && typeof arguments[5] != "boolean" && arguments[5] !== null)
      throw new t("`nonConfigurable`, if provided, must be a boolean or null");
    if (arguments.length > 6 && typeof arguments[6] != "boolean")
      throw new t("`loose`, if provided, must be a boolean");
    var h = arguments.length > 3 ? arguments[3] : null, l = arguments.length > 4 ? arguments[4] : null, c = arguments.length > 5 ? arguments[5] : null, v = arguments.length > 6 ? arguments[6] : !1, d = !!r && r(o, s);
    if (n)
      n(o, s, {
        configurable: c === null && d ? d.configurable : !c,
        enumerable: h === null && d ? d.enumerable : !h,
        value: u,
        writable: l === null && d ? d.writable : !l
      });
    else if (v || !h && !l && !c)
      o[s] = u;
    else
      throw new e("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
  }, defineDataProperty;
}
var hasPropertyDescriptors_1, hasRequiredHasPropertyDescriptors;
function requireHasPropertyDescriptors() {
  if (hasRequiredHasPropertyDescriptors) return hasPropertyDescriptors_1;
  hasRequiredHasPropertyDescriptors = 1;
  var n = /* @__PURE__ */ requireEsDefineProperty(), e = function() {
    return !!n;
  };
  return e.hasArrayLengthDefineBug = function() {
    if (!n)
      return null;
    try {
      return n([], "length", { value: 1 }).length !== 1;
    } catch {
      return !0;
    }
  }, hasPropertyDescriptors_1 = e, hasPropertyDescriptors_1;
}
var gopd, hasRequiredGopd;
function requireGopd() {
  if (hasRequiredGopd) return gopd;
  hasRequiredGopd = 1;
  var n = /* @__PURE__ */ requireGetIntrinsic$2(), e = n("%Object.getOwnPropertyDescriptor%", !0);
  if (e)
    try {
      e([], "length");
    } catch {
      e = null;
    }
  return gopd = e, gopd;
}
var setFunctionLength, hasRequiredSetFunctionLength;
function requireSetFunctionLength() {
  if (hasRequiredSetFunctionLength) return setFunctionLength;
  hasRequiredSetFunctionLength = 1;
  var n = /* @__PURE__ */ requireGetIntrinsic$2(), e = /* @__PURE__ */ requireDefineDataProperty(), t = /* @__PURE__ */ requireHasPropertyDescriptors()(), r = /* @__PURE__ */ requireGopd(), a = /* @__PURE__ */ requireType(), o = n("%Math.floor%");
  return setFunctionLength = function(u, h) {
    if (typeof u != "function")
      throw new a("`fn` is not a function");
    if (typeof h != "number" || h < 0 || h > 4294967295 || o(h) !== h)
      throw new a("`length` must be a positive 32-bit integer");
    var l = arguments.length > 2 && !!arguments[2], c = !0, v = !0;
    if ("length" in u && r) {
      var d = r(u, "length");
      d && !d.configurable && (c = !1), d && !d.writable && (v = !1);
    }
    return (c || v || !l) && (t ? e(
      /** @type {Parameters<define>[0]} */
      u,
      "length",
      h,
      !0,
      !0
    ) : e(
      /** @type {Parameters<define>[0]} */
      u,
      "length",
      h
    )), u;
  }, setFunctionLength;
}
var hasRequiredCallBind;
function requireCallBind() {
  return hasRequiredCallBind || (hasRequiredCallBind = 1, function(n) {
    var e = requireFunctionBind(), t = /* @__PURE__ */ requireGetIntrinsic$3(), r = /* @__PURE__ */ requireSetFunctionLength(), a = /* @__PURE__ */ requireType(), o = t("%Function.prototype.apply%"), s = t("%Function.prototype.call%"), u = t("%Reflect.apply%", !0) || e.call(s, o), h = /* @__PURE__ */ requireEsDefineProperty(), l = t("%Math.max%");
    n.exports = function(d) {
      if (typeof d != "function")
        throw new a("a function is required");
      var g = u(e, s, arguments);
      return r(
        g,
        1 + l(0, d.length - (arguments.length - 1)),
        !0
      );
    };
    var c = function() {
      return u(e, o, arguments);
    };
    h ? h(n.exports, "apply", { value: c }) : n.exports.apply = c;
  }(callBind)), callBind.exports;
}
var callBound, hasRequiredCallBound;
function requireCallBound() {
  if (hasRequiredCallBound) return callBound;
  hasRequiredCallBound = 1;
  var n = /* @__PURE__ */ requireGetIntrinsic$3(), e = requireCallBind(), t = e(n("String.prototype.indexOf"));
  return callBound = function(a, o) {
    var s = n(a, !!o);
    return typeof s == "function" && t(a, ".prototype.") > -1 ? e(s) : s;
  }, callBound;
}
const __viteBrowserExternal = {}, __viteBrowserExternal$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: __viteBrowserExternal
}, Symbol.toStringTag, { value: "Module" })), require$$0 = /* @__PURE__ */ getAugmentedNamespace(__viteBrowserExternal$1);
var objectInspect, hasRequiredObjectInspect;
function requireObjectInspect() {
  if (hasRequiredObjectInspect) return objectInspect;
  hasRequiredObjectInspect = 1;
  var n = typeof Map == "function" && Map.prototype, e = Object.getOwnPropertyDescriptor && n ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null, t = n && e && typeof e.get == "function" ? e.get : null, r = n && Map.prototype.forEach, a = typeof Set == "function" && Set.prototype, o = Object.getOwnPropertyDescriptor && a ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null, s = a && o && typeof o.get == "function" ? o.get : null, u = a && Set.prototype.forEach, h = typeof WeakMap == "function" && WeakMap.prototype, l = h ? WeakMap.prototype.has : null, c = typeof WeakSet == "function" && WeakSet.prototype, v = c ? WeakSet.prototype.has : null, d = typeof WeakRef == "function" && WeakRef.prototype, g = d ? WeakRef.prototype.deref : null, m = Boolean.prototype.valueOf, _ = Object.prototype.toString, y = Function.prototype.toString, b = String.prototype.match, S = String.prototype.slice, O = String.prototype.replace, D = String.prototype.toUpperCase, E = String.prototype.toLowerCase, M = RegExp.prototype.test, A = Array.prototype.concat, $ = Array.prototype.join, B = Array.prototype.slice, U = Math.floor, X = typeof BigInt == "function" ? BigInt.prototype.valueOf : null, G = Object.getOwnPropertySymbols, K = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Symbol.prototype.toString : null, tt = typeof Symbol == "function" && typeof Symbol.iterator == "object", Y = typeof Symbol == "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === tt || !0) ? Symbol.toStringTag : null, P = Object.prototype.propertyIsEnumerable, I = (typeof Reflect == "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(k) {
    return k.__proto__;
  } : null);
  function T(k, H) {
    if (k === 1 / 0 || k === -1 / 0 || k !== k || k && k > -1e3 && k < 1e3 || M.call(/e/, H))
      return H;
    var ut = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
    if (typeof k == "number") {
      var ht = k < 0 ? -U(-k) : U(k);
      if (ht !== k) {
        var lt = String(ht), ot = S.call(H, lt.length + 1);
        return O.call(lt, ut, "$&_") + "." + O.call(O.call(ot, /([0-9]{3})/g, "$&_"), /_$/, "");
      }
    }
    return O.call(H, ut, "$&_");
  }
  var C = require$$0, R = C.custom, w = st(R) ? R : null, N = {
    __proto__: null,
    double: '"',
    single: "'"
  }, L = {
    __proto__: null,
    double: /(["\\])/g,
    single: /(['\\])/g
  };
  objectInspect = function k(H, ut, ht, lt) {
    var ot = ut || {};
    if (rt(ot, "quoteStyle") && !rt(N, ot.quoteStyle))
      throw new TypeError('option "quoteStyle" must be "single" or "double"');
    if (rt(ot, "maxStringLength") && (typeof ot.maxStringLength == "number" ? ot.maxStringLength < 0 && ot.maxStringLength !== 1 / 0 : ot.maxStringLength !== null))
      throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
    var vt = rt(ot, "customInspect") ? ot.customInspect : !0;
    if (typeof vt != "boolean" && vt !== "symbol")
      throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
    if (rt(ot, "indent") && ot.indent !== null && ot.indent !== "	" && !(parseInt(ot.indent, 10) === ot.indent && ot.indent > 0))
      throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
    if (rt(ot, "numericSeparator") && typeof ot.numericSeparator != "boolean")
      throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
    var _t = ot.numericSeparator;
    if (typeof H > "u")
      return "undefined";
    if (H === null)
      return "null";
    if (typeof H == "boolean")
      return H ? "true" : "false";
    if (typeof H == "string")
      return kt(H, ot);
    if (typeof H == "number") {
      if (H === 0)
        return 1 / 0 / H > 0 ? "0" : "-0";
      var ct = String(H);
      return _t ? T(H, ct) : ct;
    }
    if (typeof H == "bigint") {
      var yt = String(H) + "n";
      return _t ? T(H, yt) : yt;
    }
    var Ct = typeof ot.depth > "u" ? 5 : ot.depth;
    if (typeof ht > "u" && (ht = 0), ht >= Ct && Ct > 0 && typeof H == "object")
      return J(H) ? "[Array]" : "[Object]";
    var mt = Kt(ot, ht);
    if (typeof lt > "u")
      lt = [];
    else if (pt(lt, H) >= 0)
      return "[Circular]";
    function dt(bt, It, te) {
      if (It && (lt = B.call(lt), lt.push(It)), te) {
        var Vt = {
          depth: ot.depth
        };
        return rt(ot, "quoteStyle") && (Vt.quoteStyle = ot.quoteStyle), k(bt, Vt, ht + 1, lt);
      }
      return k(bt, ot, ht + 1, lt);
    }
    if (typeof H == "function" && !Z(H)) {
      var jt = ft(H), Ht = Rt(H, dt);
      return "[Function" + (jt ? ": " + jt : " (anonymous)") + "]" + (Ht.length > 0 ? " { " + $.call(Ht, ", ") + " }" : "");
    }
    if (st(H)) {
      var $t = tt ? O.call(String(H), /^(Symbol\(.*\))_[^)]*$/, "$1") : K.call(H);
      return typeof H == "object" && !tt ? Et($t) : $t;
    }
    if (Wt(H)) {
      for (var Tt = "<" + E.call(String(H.nodeName)), Dt = H.attributes || [], wt = 0; wt < Dt.length; wt++)
        Tt += " " + Dt[wt].name + "=" + F(z(Dt[wt].value), "double", ot);
      return Tt += ">", H.childNodes && H.childNodes.length && (Tt += "..."), Tt += "</" + E.call(String(H.nodeName)) + ">", Tt;
    }
    if (J(H)) {
      if (H.length === 0)
        return "[]";
      var Nt = Rt(H, dt);
      return mt && !Jt(Nt) ? "[" + Mt(Nt, mt) + "]" : "[ " + $.call(Nt, ", ") + " ]";
    }
    if (q(H)) {
      var Lt = Rt(H, dt);
      return !("cause" in Error.prototype) && "cause" in H && !P.call(H, "cause") ? "{ [" + String(H) + "] " + $.call(A.call("[cause]: " + dt(H.cause), Lt), ", ") + " }" : Lt.length === 0 ? "[" + String(H) + "]" : "{ [" + String(H) + "] " + $.call(Lt, ", ") + " }";
    }
    if (typeof H == "object" && vt) {
      if (w && typeof H[w] == "function" && C)
        return C(H, { depth: Ct - ht });
      if (vt !== "symbol" && typeof H.inspect == "function")
        return H.inspect();
    }
    if (gt(H)) {
      var Xt = [];
      return r && r.call(H, function(bt, It) {
        Xt.push(dt(It, H, !0) + " => " + dt(bt, H));
      }), Gt("Map", t.call(H), Xt, mt);
    }
    if (At(H)) {
      var zt = [];
      return u && u.call(H, function(bt) {
        zt.push(dt(bt, H));
      }), Gt("Set", s.call(H), zt, mt);
    }
    if (St(H))
      return Ot("WeakMap");
    if (Pt(H))
      return Ot("WeakSet");
    if (xt(H))
      return Ot("WeakRef");
    if (Q(H))
      return Et(dt(Number(H)));
    if (nt(H))
      return Et(dt(X.call(H)));
    if (et(H))
      return Et(m.call(H));
    if (W(H))
      return Et(dt(String(H)));
    if (typeof window < "u" && H === window)
      return "{ [object Window] }";
    if (typeof globalThis < "u" && H === globalThis || typeof commonjsGlobal < "u" && H === commonjsGlobal)
      return "{ [object globalThis] }";
    if (!V(H) && !Z(H)) {
      var Ft = Rt(H, dt), Yt = I ? I(H) === Object.prototype : H instanceof Object || H.constructor === Object, Bt = H instanceof Object ? "" : "null prototype", qt = !Yt && Y && Object(H) === H && Y in H ? S.call(at(H), 8, -1) : Bt ? "Object" : "", Qt = Yt || typeof H.constructor != "function" ? "" : H.constructor.name ? H.constructor.name + " " : "", Ut = Qt + (qt || Bt ? "[" + $.call(A.call([], qt || [], Bt || []), ": ") + "] " : "");
      return Ft.length === 0 ? Ut + "{}" : mt ? Ut + "{" + Mt(Ft, mt) + "}" : Ut + "{ " + $.call(Ft, ", ") + " }";
    }
    return String(H);
  };
  function F(k, H, ut) {
    var ht = ut.quoteStyle || H, lt = N[ht];
    return lt + k + lt;
  }
  function z(k) {
    return O.call(String(k), /"/g, "&quot;");
  }
  function J(k) {
    return at(k) === "[object Array]" && (!Y || !(typeof k == "object" && Y in k));
  }
  function V(k) {
    return at(k) === "[object Date]" && (!Y || !(typeof k == "object" && Y in k));
  }
  function Z(k) {
    return at(k) === "[object RegExp]" && (!Y || !(typeof k == "object" && Y in k));
  }
  function q(k) {
    return at(k) === "[object Error]" && (!Y || !(typeof k == "object" && Y in k));
  }
  function W(k) {
    return at(k) === "[object String]" && (!Y || !(typeof k == "object" && Y in k));
  }
  function Q(k) {
    return at(k) === "[object Number]" && (!Y || !(typeof k == "object" && Y in k));
  }
  function et(k) {
    return at(k) === "[object Boolean]" && (!Y || !(typeof k == "object" && Y in k));
  }
  function st(k) {
    if (tt)
      return k && typeof k == "object" && k instanceof Symbol;
    if (typeof k == "symbol")
      return !0;
    if (!k || typeof k != "object" || !K)
      return !1;
    try {
      return K.call(k), !0;
    } catch {
    }
    return !1;
  }
  function nt(k) {
    if (!k || typeof k != "object" || !X)
      return !1;
    try {
      return X.call(k), !0;
    } catch {
    }
    return !1;
  }
  var it = Object.prototype.hasOwnProperty || function(k) {
    return k in this;
  };
  function rt(k, H) {
    return it.call(k, H);
  }
  function at(k) {
    return _.call(k);
  }
  function ft(k) {
    if (k.name)
      return k.name;
    var H = b.call(y.call(k), /^function\s*([\w$]+)/);
    return H ? H[1] : null;
  }
  function pt(k, H) {
    if (k.indexOf)
      return k.indexOf(H);
    for (var ut = 0, ht = k.length; ut < ht; ut++)
      if (k[ut] === H)
        return ut;
    return -1;
  }
  function gt(k) {
    if (!t || !k || typeof k != "object")
      return !1;
    try {
      t.call(k);
      try {
        s.call(k);
      } catch {
        return !0;
      }
      return k instanceof Map;
    } catch {
    }
    return !1;
  }
  function St(k) {
    if (!l || !k || typeof k != "object")
      return !1;
    try {
      l.call(k, l);
      try {
        v.call(k, v);
      } catch {
        return !0;
      }
      return k instanceof WeakMap;
    } catch {
    }
    return !1;
  }
  function xt(k) {
    if (!g || !k || typeof k != "object")
      return !1;
    try {
      return g.call(k), !0;
    } catch {
    }
    return !1;
  }
  function At(k) {
    if (!s || !k || typeof k != "object")
      return !1;
    try {
      s.call(k);
      try {
        t.call(k);
      } catch {
        return !0;
      }
      return k instanceof Set;
    } catch {
    }
    return !1;
  }
  function Pt(k) {
    if (!v || !k || typeof k != "object")
      return !1;
    try {
      v.call(k, v);
      try {
        l.call(k, l);
      } catch {
        return !0;
      }
      return k instanceof WeakSet;
    } catch {
    }
    return !1;
  }
  function Wt(k) {
    return !k || typeof k != "object" ? !1 : typeof HTMLElement < "u" && k instanceof HTMLElement ? !0 : typeof k.nodeName == "string" && typeof k.getAttribute == "function";
  }
  function kt(k, H) {
    if (k.length > H.maxStringLength) {
      var ut = k.length - H.maxStringLength, ht = "... " + ut + " more character" + (ut > 1 ? "s" : "");
      return kt(S.call(k, 0, H.maxStringLength), H) + ht;
    }
    var lt = L[H.quoteStyle || "single"];
    lt.lastIndex = 0;
    var ot = O.call(O.call(k, lt, "\\$1"), /[\x00-\x1f]/g, Zt);
    return F(ot, "single", H);
  }
  function Zt(k) {
    var H = k.charCodeAt(0), ut = {
      8: "b",
      9: "t",
      10: "n",
      12: "f",
      13: "r"
    }[H];
    return ut ? "\\" + ut : "\\x" + (H < 16 ? "0" : "") + D.call(H.toString(16));
  }
  function Et(k) {
    return "Object(" + k + ")";
  }
  function Ot(k) {
    return k + " { ? }";
  }
  function Gt(k, H, ut, ht) {
    var lt = ht ? Mt(ut, ht) : $.call(ut, ", ");
    return k + " (" + H + ") {" + lt + "}";
  }
  function Jt(k) {
    for (var H = 0; H < k.length; H++)
      if (pt(k[H], `
`) >= 0)
        return !1;
    return !0;
  }
  function Kt(k, H) {
    var ut;
    if (k.indent === "	")
      ut = "	";
    else if (typeof k.indent == "number" && k.indent > 0)
      ut = $.call(Array(k.indent + 1), " ");
    else
      return null;
    return {
      base: ut,
      prev: $.call(Array(H + 1), ut)
    };
  }
  function Mt(k, H) {
    if (k.length === 0)
      return "";
    var ut = `
` + H.prev + H.base;
    return ut + $.call(k, "," + ut) + `
` + H.prev;
  }
  function Rt(k, H) {
    var ut = J(k), ht = [];
    if (ut) {
      ht.length = k.length;
      for (var lt = 0; lt < k.length; lt++)
        ht[lt] = rt(k, lt) ? H(k[lt], k) : "";
    }
    var ot = typeof G == "function" ? G(k) : [], vt;
    if (tt) {
      vt = {};
      for (var _t = 0; _t < ot.length; _t++)
        vt["$" + ot[_t]] = ot[_t];
    }
    for (var ct in k)
      rt(k, ct) && (ut && String(Number(ct)) === ct && ct < k.length || tt && vt["$" + ct] instanceof Symbol || (M.call(/[^\w$]/, ct) ? ht.push(H(ct, k) + ": " + H(k[ct], k)) : ht.push(ct + ": " + H(k[ct], k))));
    if (typeof G == "function")
      for (var yt = 0; yt < ot.length; yt++)
        P.call(k, ot[yt]) && ht.push("[" + H(ot[yt]) + "]: " + H(k[ot[yt]], k));
    return ht;
  }
  return objectInspect;
}
var sideChannel, hasRequiredSideChannel;
function requireSideChannel() {
  if (hasRequiredSideChannel) return sideChannel;
  hasRequiredSideChannel = 1;
  var n = /* @__PURE__ */ requireGetIntrinsic$3(), e = requireCallBound(), t = /* @__PURE__ */ requireObjectInspect(), r = /* @__PURE__ */ requireType(), a = n("%WeakMap%", !0), o = n("%Map%", !0), s = e("WeakMap.prototype.get", !0), u = e("WeakMap.prototype.set", !0), h = e("WeakMap.prototype.has", !0), l = e("Map.prototype.get", !0), c = e("Map.prototype.set", !0), v = e("Map.prototype.has", !0), d = function(y, b) {
    for (var S = y, O; (O = S.next) !== null; S = O)
      if (O.key === b)
        return S.next = O.next, O.next = /** @type {NonNullable<typeof list.next>} */
        y.next, y.next = O, O;
  }, g = function(y, b) {
    var S = d(y, b);
    return S && S.value;
  }, m = function(y, b, S) {
    var O = d(y, b);
    O ? O.value = S : y.next = /** @type {import('.').ListNode<typeof value>} */
    {
      // eslint-disable-line no-param-reassign, no-extra-parens
      key: b,
      next: y.next,
      value: S
    };
  }, _ = function(y, b) {
    return !!d(y, b);
  };
  return sideChannel = function() {
    var b, S, O, D = {
      assert: function(E) {
        if (!D.has(E))
          throw new r("Side channel does not contain " + t(E));
      },
      get: function(E) {
        if (a && E && (typeof E == "object" || typeof E == "function")) {
          if (b)
            return s(b, E);
        } else if (o) {
          if (S)
            return l(S, E);
        } else if (O)
          return g(O, E);
      },
      has: function(E) {
        if (a && E && (typeof E == "object" || typeof E == "function")) {
          if (b)
            return h(b, E);
        } else if (o) {
          if (S)
            return v(S, E);
        } else if (O)
          return _(O, E);
        return !1;
      },
      set: function(E, M) {
        a && E && (typeof E == "object" || typeof E == "function") ? (b || (b = new a()), u(b, E, M)) : o ? (S || (S = new o()), c(S, E, M)) : (O || (O = { key: {}, next: null }), m(O, E, M));
      }
    };
    return D;
  }, sideChannel;
}
var formats$1, hasRequiredFormats;
function requireFormats() {
  if (hasRequiredFormats) return formats$1;
  hasRequiredFormats = 1;
  var n = String.prototype.replace, e = /%20/g, t = {
    RFC1738: "RFC1738",
    RFC3986: "RFC3986"
  };
  return formats$1 = {
    default: t.RFC3986,
    formatters: {
      RFC1738: function(r) {
        return n.call(r, e, "+");
      },
      RFC3986: function(r) {
        return String(r);
      }
    },
    RFC1738: t.RFC1738,
    RFC3986: t.RFC3986
  }, formats$1;
}
var utils, hasRequiredUtils;
function requireUtils() {
  if (hasRequiredUtils) return utils;
  hasRequiredUtils = 1;
  var n = /* @__PURE__ */ requireFormats(), e = Object.prototype.hasOwnProperty, t = Array.isArray, r = function() {
    for (var y = [], b = 0; b < 256; ++b)
      y.push("%" + ((b < 16 ? "0" : "") + b.toString(16)).toUpperCase());
    return y;
  }(), a = function(b) {
    for (; b.length > 1; ) {
      var S = b.pop(), O = S.obj[S.prop];
      if (t(O)) {
        for (var D = [], E = 0; E < O.length; ++E)
          typeof O[E] < "u" && D.push(O[E]);
        S.obj[S.prop] = D;
      }
    }
  }, o = function(b, S) {
    for (var O = S && S.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, D = 0; D < b.length; ++D)
      typeof b[D] < "u" && (O[D] = b[D]);
    return O;
  }, s = function y(b, S, O) {
    if (!S)
      return b;
    if (typeof S != "object") {
      if (t(b))
        b.push(S);
      else if (b && typeof b == "object")
        (O && (O.plainObjects || O.allowPrototypes) || !e.call(Object.prototype, S)) && (b[S] = !0);
      else
        return [b, S];
      return b;
    }
    if (!b || typeof b != "object")
      return [b].concat(S);
    var D = b;
    return t(b) && !t(S) && (D = o(b, O)), t(b) && t(S) ? (S.forEach(function(E, M) {
      if (e.call(b, M)) {
        var A = b[M];
        A && typeof A == "object" && E && typeof E == "object" ? b[M] = y(A, E, O) : b.push(E);
      } else
        b[M] = E;
    }), b) : Object.keys(S).reduce(function(E, M) {
      var A = S[M];
      return e.call(E, M) ? E[M] = y(E[M], A, O) : E[M] = A, E;
    }, D);
  }, u = function(b, S) {
    return Object.keys(S).reduce(function(O, D) {
      return O[D] = S[D], O;
    }, b);
  }, h = function(y, b, S) {
    var O = y.replace(/\+/g, " ");
    if (S === "iso-8859-1")
      return O.replace(/%[0-9a-f]{2}/gi, unescape);
    try {
      return decodeURIComponent(O);
    } catch {
      return O;
    }
  }, l = 1024, c = function(b, S, O, D, E) {
    if (b.length === 0)
      return b;
    var M = b;
    if (typeof b == "symbol" ? M = Symbol.prototype.toString.call(b) : typeof b != "string" && (M = String(b)), O === "iso-8859-1")
      return escape(M).replace(/%u[0-9a-f]{4}/gi, function(K) {
        return "%26%23" + parseInt(K.slice(2), 16) + "%3B";
      });
    for (var A = "", $ = 0; $ < M.length; $ += l) {
      for (var B = M.length >= l ? M.slice($, $ + l) : M, U = [], X = 0; X < B.length; ++X) {
        var G = B.charCodeAt(X);
        if (G === 45 || G === 46 || G === 95 || G === 126 || G >= 48 && G <= 57 || G >= 65 && G <= 90 || G >= 97 && G <= 122 || E === n.RFC1738 && (G === 40 || G === 41)) {
          U[U.length] = B.charAt(X);
          continue;
        }
        if (G < 128) {
          U[U.length] = r[G];
          continue;
        }
        if (G < 2048) {
          U[U.length] = r[192 | G >> 6] + r[128 | G & 63];
          continue;
        }
        if (G < 55296 || G >= 57344) {
          U[U.length] = r[224 | G >> 12] + r[128 | G >> 6 & 63] + r[128 | G & 63];
          continue;
        }
        X += 1, G = 65536 + ((G & 1023) << 10 | B.charCodeAt(X) & 1023), U[U.length] = r[240 | G >> 18] + r[128 | G >> 12 & 63] + r[128 | G >> 6 & 63] + r[128 | G & 63];
      }
      A += U.join("");
    }
    return A;
  }, v = function(b) {
    for (var S = [{ obj: { o: b }, prop: "o" }], O = [], D = 0; D < S.length; ++D)
      for (var E = S[D], M = E.obj[E.prop], A = Object.keys(M), $ = 0; $ < A.length; ++$) {
        var B = A[$], U = M[B];
        typeof U == "object" && U !== null && O.indexOf(U) === -1 && (S.push({ obj: M, prop: B }), O.push(U));
      }
    return a(S), b;
  }, d = function(b) {
    return Object.prototype.toString.call(b) === "[object RegExp]";
  }, g = function(b) {
    return !b || typeof b != "object" ? !1 : !!(b.constructor && b.constructor.isBuffer && b.constructor.isBuffer(b));
  }, m = function(b, S) {
    return [].concat(b, S);
  }, _ = function(b, S) {
    if (t(b)) {
      for (var O = [], D = 0; D < b.length; D += 1)
        O.push(S(b[D]));
      return O;
    }
    return S(b);
  };
  return utils = {
    arrayToObject: o,
    assign: u,
    combine: m,
    compact: v,
    decode: h,
    encode: c,
    isBuffer: g,
    isRegExp: d,
    maybeMap: _,
    merge: s
  }, utils;
}
var stringify_1, hasRequiredStringify;
function requireStringify() {
  if (hasRequiredStringify) return stringify_1;
  hasRequiredStringify = 1;
  var n = requireSideChannel(), e = /* @__PURE__ */ requireUtils(), t = /* @__PURE__ */ requireFormats(), r = Object.prototype.hasOwnProperty, a = {
    brackets: function(y) {
      return y + "[]";
    },
    comma: "comma",
    indices: function(y, b) {
      return y + "[" + b + "]";
    },
    repeat: function(y) {
      return y;
    }
  }, o = Array.isArray, s = Array.prototype.push, u = function(_, y) {
    s.apply(_, o(y) ? y : [y]);
  }, h = Date.prototype.toISOString, l = t.default, c = {
    addQueryPrefix: !1,
    allowDots: !1,
    allowEmptyArrays: !1,
    arrayFormat: "indices",
    charset: "utf-8",
    charsetSentinel: !1,
    delimiter: "&",
    encode: !0,
    encodeDotInKeys: !1,
    encoder: e.encode,
    encodeValuesOnly: !1,
    format: l,
    formatter: t.formatters[l],
    // deprecated
    indices: !1,
    serializeDate: function(y) {
      return h.call(y);
    },
    skipNulls: !1,
    strictNullHandling: !1
  }, v = function(y) {
    return typeof y == "string" || typeof y == "number" || typeof y == "boolean" || typeof y == "symbol" || typeof y == "bigint";
  }, d = {}, g = function _(y, b, S, O, D, E, M, A, $, B, U, X, G, K, tt, Y, P, I) {
    for (var T = y, C = I, R = 0, w = !1; (C = C.get(d)) !== void 0 && !w; ) {
      var N = C.get(y);
      if (R += 1, typeof N < "u") {
        if (N === R)
          throw new RangeError("Cyclic object value");
        w = !0;
      }
      typeof C.get(d) > "u" && (R = 0);
    }
    if (typeof B == "function" ? T = B(b, T) : T instanceof Date ? T = G(T) : S === "comma" && o(T) && (T = e.maybeMap(T, function(it) {
      return it instanceof Date ? G(it) : it;
    })), T === null) {
      if (E)
        return $ && !Y ? $(b, c.encoder, P, "key", K) : b;
      T = "";
    }
    if (v(T) || e.isBuffer(T)) {
      if ($) {
        var L = Y ? b : $(b, c.encoder, P, "key", K);
        return [tt(L) + "=" + tt($(T, c.encoder, P, "value", K))];
      }
      return [tt(b) + "=" + tt(String(T))];
    }
    var F = [];
    if (typeof T > "u")
      return F;
    var z;
    if (S === "comma" && o(T))
      Y && $ && (T = e.maybeMap(T, $)), z = [{ value: T.length > 0 ? T.join(",") || null : void 0 }];
    else if (o(B))
      z = B;
    else {
      var J = Object.keys(T);
      z = U ? J.sort(U) : J;
    }
    var V = A ? b.replace(/\./g, "%2E") : b, Z = O && o(T) && T.length === 1 ? V + "[]" : V;
    if (D && o(T) && T.length === 0)
      return Z + "[]";
    for (var q = 0; q < z.length; ++q) {
      var W = z[q], Q = typeof W == "object" && typeof W.value < "u" ? W.value : T[W];
      if (!(M && Q === null)) {
        var et = X && A ? W.replace(/\./g, "%2E") : W, st = o(T) ? typeof S == "function" ? S(Z, et) : Z : Z + (X ? "." + et : "[" + et + "]");
        I.set(y, R);
        var nt = n();
        nt.set(d, I), u(F, _(
          Q,
          st,
          S,
          O,
          D,
          E,
          M,
          A,
          S === "comma" && Y && o(T) ? null : $,
          B,
          U,
          X,
          G,
          K,
          tt,
          Y,
          P,
          nt
        ));
      }
    }
    return F;
  }, m = function(y) {
    if (!y)
      return c;
    if (typeof y.allowEmptyArrays < "u" && typeof y.allowEmptyArrays != "boolean")
      throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
    if (typeof y.encodeDotInKeys < "u" && typeof y.encodeDotInKeys != "boolean")
      throw new TypeError("`encodeDotInKeys` option can only be `true` or `false`, when provided");
    if (y.encoder !== null && typeof y.encoder < "u" && typeof y.encoder != "function")
      throw new TypeError("Encoder has to be a function.");
    var b = y.charset || c.charset;
    if (typeof y.charset < "u" && y.charset !== "utf-8" && y.charset !== "iso-8859-1")
      throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
    var S = t.default;
    if (typeof y.format < "u") {
      if (!r.call(t.formatters, y.format))
        throw new TypeError("Unknown format option provided.");
      S = y.format;
    }
    var O = t.formatters[S], D = c.filter;
    (typeof y.filter == "function" || o(y.filter)) && (D = y.filter);
    var E;
    if (y.arrayFormat in a ? E = y.arrayFormat : "indices" in y ? E = y.indices ? "indices" : "repeat" : E = c.arrayFormat, "commaRoundTrip" in y && typeof y.commaRoundTrip != "boolean")
      throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
    var M = typeof y.allowDots > "u" ? y.encodeDotInKeys === !0 ? !0 : c.allowDots : !!y.allowDots;
    return {
      addQueryPrefix: typeof y.addQueryPrefix == "boolean" ? y.addQueryPrefix : c.addQueryPrefix,
      allowDots: M,
      allowEmptyArrays: typeof y.allowEmptyArrays == "boolean" ? !!y.allowEmptyArrays : c.allowEmptyArrays,
      arrayFormat: E,
      charset: b,
      charsetSentinel: typeof y.charsetSentinel == "boolean" ? y.charsetSentinel : c.charsetSentinel,
      commaRoundTrip: y.commaRoundTrip,
      delimiter: typeof y.delimiter > "u" ? c.delimiter : y.delimiter,
      encode: typeof y.encode == "boolean" ? y.encode : c.encode,
      encodeDotInKeys: typeof y.encodeDotInKeys == "boolean" ? y.encodeDotInKeys : c.encodeDotInKeys,
      encoder: typeof y.encoder == "function" ? y.encoder : c.encoder,
      encodeValuesOnly: typeof y.encodeValuesOnly == "boolean" ? y.encodeValuesOnly : c.encodeValuesOnly,
      filter: D,
      format: S,
      formatter: O,
      serializeDate: typeof y.serializeDate == "function" ? y.serializeDate : c.serializeDate,
      skipNulls: typeof y.skipNulls == "boolean" ? y.skipNulls : c.skipNulls,
      sort: typeof y.sort == "function" ? y.sort : null,
      strictNullHandling: typeof y.strictNullHandling == "boolean" ? y.strictNullHandling : c.strictNullHandling
    };
  };
  return stringify_1 = function(_, y) {
    var b = _, S = m(y), O, D;
    typeof S.filter == "function" ? (D = S.filter, b = D("", b)) : o(S.filter) && (D = S.filter, O = D);
    var E = [];
    if (typeof b != "object" || b === null)
      return "";
    var M = a[S.arrayFormat], A = M === "comma" && S.commaRoundTrip;
    O || (O = Object.keys(b)), S.sort && O.sort(S.sort);
    for (var $ = n(), B = 0; B < O.length; ++B) {
      var U = O[B];
      S.skipNulls && b[U] === null || u(E, g(
        b[U],
        U,
        M,
        A,
        S.allowEmptyArrays,
        S.strictNullHandling,
        S.skipNulls,
        S.encodeDotInKeys,
        S.encode ? S.encoder : null,
        S.filter,
        S.sort,
        S.allowDots,
        S.serializeDate,
        S.format,
        S.formatter,
        S.encodeValuesOnly,
        S.charset,
        $
      ));
    }
    var X = E.join(S.delimiter), G = S.addQueryPrefix === !0 ? "?" : "";
    return S.charsetSentinel && (S.charset === "iso-8859-1" ? G += "utf8=%26%2310003%3B&" : G += "utf8=%E2%9C%93&"), X.length > 0 ? G + X : "";
  }, stringify_1;
}
var parse$1, hasRequiredParse;
function requireParse() {
  if (hasRequiredParse) return parse$1;
  hasRequiredParse = 1;
  var n = /* @__PURE__ */ requireUtils(), e = Object.prototype.hasOwnProperty, t = Array.isArray, r = {
    allowDots: !1,
    allowEmptyArrays: !1,
    allowPrototypes: !1,
    allowSparse: !1,
    arrayLimit: 20,
    charset: "utf-8",
    charsetSentinel: !1,
    comma: !1,
    decodeDotInKeys: !1,
    decoder: n.decode,
    delimiter: "&",
    depth: 5,
    duplicates: "combine",
    ignoreQueryPrefix: !1,
    interpretNumericEntities: !1,
    parameterLimit: 1e3,
    parseArrays: !0,
    plainObjects: !1,
    strictDepth: !1,
    strictNullHandling: !1
  }, a = function(d) {
    return d.replace(/&#(\d+);/g, function(g, m) {
      return String.fromCharCode(parseInt(m, 10));
    });
  }, o = function(d, g) {
    return d && typeof d == "string" && g.comma && d.indexOf(",") > -1 ? d.split(",") : d;
  }, s = "utf8=%26%2310003%3B", u = "utf8=%E2%9C%93", h = function(g, m) {
    var _ = { __proto__: null }, y = m.ignoreQueryPrefix ? g.replace(/^\?/, "") : g;
    y = y.replace(/%5B/gi, "[").replace(/%5D/gi, "]");
    var b = m.parameterLimit === 1 / 0 ? void 0 : m.parameterLimit, S = y.split(m.delimiter, b), O = -1, D, E = m.charset;
    if (m.charsetSentinel)
      for (D = 0; D < S.length; ++D)
        S[D].indexOf("utf8=") === 0 && (S[D] === u ? E = "utf-8" : S[D] === s && (E = "iso-8859-1"), O = D, D = S.length);
    for (D = 0; D < S.length; ++D)
      if (D !== O) {
        var M = S[D], A = M.indexOf("]="), $ = A === -1 ? M.indexOf("=") : A + 1, B, U;
        $ === -1 ? (B = m.decoder(M, r.decoder, E, "key"), U = m.strictNullHandling ? null : "") : (B = m.decoder(M.slice(0, $), r.decoder, E, "key"), U = n.maybeMap(
          o(M.slice($ + 1), m),
          function(G) {
            return m.decoder(G, r.decoder, E, "value");
          }
        )), U && m.interpretNumericEntities && E === "iso-8859-1" && (U = a(U)), M.indexOf("[]=") > -1 && (U = t(U) ? [U] : U);
        var X = e.call(_, B);
        X && m.duplicates === "combine" ? _[B] = n.combine(_[B], U) : (!X || m.duplicates === "last") && (_[B] = U);
      }
    return _;
  }, l = function(d, g, m, _) {
    for (var y = _ ? g : o(g, m), b = d.length - 1; b >= 0; --b) {
      var S, O = d[b];
      if (O === "[]" && m.parseArrays)
        S = m.allowEmptyArrays && (y === "" || m.strictNullHandling && y === null) ? [] : [].concat(y);
      else {
        S = m.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
        var D = O.charAt(0) === "[" && O.charAt(O.length - 1) === "]" ? O.slice(1, -1) : O, E = m.decodeDotInKeys ? D.replace(/%2E/g, ".") : D, M = parseInt(E, 10);
        !m.parseArrays && E === "" ? S = { 0: y } : !isNaN(M) && O !== E && String(M) === E && M >= 0 && m.parseArrays && M <= m.arrayLimit ? (S = [], S[M] = y) : E !== "__proto__" && (S[E] = y);
      }
      y = S;
    }
    return y;
  }, c = function(g, m, _, y) {
    if (g) {
      var b = _.allowDots ? g.replace(/\.([^.[]+)/g, "[$1]") : g, S = /(\[[^[\]]*])/, O = /(\[[^[\]]*])/g, D = _.depth > 0 && S.exec(b), E = D ? b.slice(0, D.index) : b, M = [];
      if (E) {
        if (!_.plainObjects && e.call(Object.prototype, E) && !_.allowPrototypes)
          return;
        M.push(E);
      }
      for (var A = 0; _.depth > 0 && (D = O.exec(b)) !== null && A < _.depth; ) {
        if (A += 1, !_.plainObjects && e.call(Object.prototype, D[1].slice(1, -1)) && !_.allowPrototypes)
          return;
        M.push(D[1]);
      }
      if (D) {
        if (_.strictDepth === !0)
          throw new RangeError("Input depth exceeded depth option of " + _.depth + " and strictDepth is true");
        M.push("[" + b.slice(D.index) + "]");
      }
      return l(M, m, _, y);
    }
  }, v = function(g) {
    if (!g)
      return r;
    if (typeof g.allowEmptyArrays < "u" && typeof g.allowEmptyArrays != "boolean")
      throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
    if (typeof g.decodeDotInKeys < "u" && typeof g.decodeDotInKeys != "boolean")
      throw new TypeError("`decodeDotInKeys` option can only be `true` or `false`, when provided");
    if (g.decoder !== null && typeof g.decoder < "u" && typeof g.decoder != "function")
      throw new TypeError("Decoder has to be a function.");
    if (typeof g.charset < "u" && g.charset !== "utf-8" && g.charset !== "iso-8859-1")
      throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
    var m = typeof g.charset > "u" ? r.charset : g.charset, _ = typeof g.duplicates > "u" ? r.duplicates : g.duplicates;
    if (_ !== "combine" && _ !== "first" && _ !== "last")
      throw new TypeError("The duplicates option must be either combine, first, or last");
    var y = typeof g.allowDots > "u" ? g.decodeDotInKeys === !0 ? !0 : r.allowDots : !!g.allowDots;
    return {
      allowDots: y,
      allowEmptyArrays: typeof g.allowEmptyArrays == "boolean" ? !!g.allowEmptyArrays : r.allowEmptyArrays,
      allowPrototypes: typeof g.allowPrototypes == "boolean" ? g.allowPrototypes : r.allowPrototypes,
      allowSparse: typeof g.allowSparse == "boolean" ? g.allowSparse : r.allowSparse,
      arrayLimit: typeof g.arrayLimit == "number" ? g.arrayLimit : r.arrayLimit,
      charset: m,
      charsetSentinel: typeof g.charsetSentinel == "boolean" ? g.charsetSentinel : r.charsetSentinel,
      comma: typeof g.comma == "boolean" ? g.comma : r.comma,
      decodeDotInKeys: typeof g.decodeDotInKeys == "boolean" ? g.decodeDotInKeys : r.decodeDotInKeys,
      decoder: typeof g.decoder == "function" ? g.decoder : r.decoder,
      delimiter: typeof g.delimiter == "string" || n.isRegExp(g.delimiter) ? g.delimiter : r.delimiter,
      // eslint-disable-next-line no-implicit-coercion, no-extra-parens
      depth: typeof g.depth == "number" || g.depth === !1 ? +g.depth : r.depth,
      duplicates: _,
      ignoreQueryPrefix: g.ignoreQueryPrefix === !0,
      interpretNumericEntities: typeof g.interpretNumericEntities == "boolean" ? g.interpretNumericEntities : r.interpretNumericEntities,
      parameterLimit: typeof g.parameterLimit == "number" ? g.parameterLimit : r.parameterLimit,
      parseArrays: g.parseArrays !== !1,
      plainObjects: typeof g.plainObjects == "boolean" ? g.plainObjects : r.plainObjects,
      strictDepth: typeof g.strictDepth == "boolean" ? !!g.strictDepth : r.strictDepth,
      strictNullHandling: typeof g.strictNullHandling == "boolean" ? g.strictNullHandling : r.strictNullHandling
    };
  };
  return parse$1 = function(d, g) {
    var m = v(g);
    if (d === "" || d === null || typeof d > "u")
      return m.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
    for (var _ = typeof d == "string" ? h(d, m) : d, y = m.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, b = Object.keys(_), S = 0; S < b.length; ++S) {
      var O = b[S], D = c(O, _[O], m, typeof d == "string");
      y = n.merge(y, D, m);
    }
    return m.allowSparse === !0 ? y : n.compact(y);
  }, parse$1;
}
var lib, hasRequiredLib;
function requireLib() {
  if (hasRequiredLib) return lib;
  hasRequiredLib = 1;
  var n = /* @__PURE__ */ requireStringify(), e = /* @__PURE__ */ requireParse(), t = /* @__PURE__ */ requireFormats();
  return lib = {
    formats: t,
    parse: e,
    stringify: n
  }, lib;
}
var hasRequiredUrl;
function requireUrl() {
  if (hasRequiredUrl) return url$2;
  hasRequiredUrl = 1;
  var n = requirePunycode();
  function e() {
    this.protocol = null, this.slashes = null, this.auth = null, this.host = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.query = null, this.pathname = null, this.path = null, this.href = null;
  }
  var t = /^([a-z0-9.+-]+:)/i, r = /:[0-9]*$/, a = /^(\/\/?(?!\/)[^?\s]*)(\?[^\s]*)?$/, o = [
    "<",
    ">",
    '"',
    "`",
    " ",
    "\r",
    `
`,
    "	"
  ], s = [
    "{",
    "}",
    "|",
    "\\",
    "^",
    "`"
  ].concat(o), u = ["'"].concat(s), h = [
    "%",
    "/",
    "?",
    ";",
    "#"
  ].concat(u), l = [
    "/",
    "?",
    "#"
  ], c = 255, v = /^[+a-z0-9A-Z_-]{0,63}$/, d = /^([+a-z0-9A-Z_-]{0,63})(.*)$/, g = {
    javascript: !0,
    "javascript:": !0
  }, m = {
    javascript: !0,
    "javascript:": !0
  }, _ = {
    http: !0,
    https: !0,
    ftp: !0,
    gopher: !0,
    file: !0,
    "http:": !0,
    "https:": !0,
    "ftp:": !0,
    "gopher:": !0,
    "file:": !0
  }, y = /* @__PURE__ */ requireLib();
  function b(E, M, A) {
    if (E && typeof E == "object" && E instanceof e)
      return E;
    var $ = new e();
    return $.parse(E, M, A), $;
  }
  e.prototype.parse = function(E, M, A) {
    if (typeof E != "string")
      throw new TypeError("Parameter 'url' must be a string, not " + typeof E);
    var $ = E.indexOf("?"), B = $ !== -1 && $ < E.indexOf("#") ? "?" : "#", U = E.split(B), X = /\\/g;
    U[0] = U[0].replace(X, "/"), E = U.join(B);
    var G = E;
    if (G = G.trim(), !A && E.split("#").length === 1) {
      var K = a.exec(G);
      if (K)
        return this.path = G, this.href = G, this.pathname = K[1], K[2] ? (this.search = K[2], M ? this.query = y.parse(this.search.substr(1)) : this.query = this.search.substr(1)) : M && (this.search = "", this.query = {}), this;
    }
    var tt = t.exec(G);
    if (tt) {
      tt = tt[0];
      var Y = tt.toLowerCase();
      this.protocol = Y, G = G.substr(tt.length);
    }
    if (A || tt || G.match(/^\/\/[^@/]+@[^@/]+/)) {
      var P = G.substr(0, 2) === "//";
      P && !(tt && m[tt]) && (G = G.substr(2), this.slashes = !0);
    }
    if (!m[tt] && (P || tt && !_[tt])) {
      for (var I = -1, T = 0; T < l.length; T++) {
        var C = G.indexOf(l[T]);
        C !== -1 && (I === -1 || C < I) && (I = C);
      }
      var R, w;
      I === -1 ? w = G.lastIndexOf("@") : w = G.lastIndexOf("@", I), w !== -1 && (R = G.slice(0, w), G = G.slice(w + 1), this.auth = decodeURIComponent(R)), I = -1;
      for (var T = 0; T < h.length; T++) {
        var C = G.indexOf(h[T]);
        C !== -1 && (I === -1 || C < I) && (I = C);
      }
      I === -1 && (I = G.length), this.host = G.slice(0, I), G = G.slice(I), this.parseHost(), this.hostname = this.hostname || "";
      var N = this.hostname[0] === "[" && this.hostname[this.hostname.length - 1] === "]";
      if (!N)
        for (var L = this.hostname.split(/\./), T = 0, F = L.length; T < F; T++) {
          var z = L[T];
          if (z && !z.match(v)) {
            for (var J = "", V = 0, Z = z.length; V < Z; V++)
              z.charCodeAt(V) > 127 ? J += "x" : J += z[V];
            if (!J.match(v)) {
              var q = L.slice(0, T), W = L.slice(T + 1), Q = z.match(d);
              Q && (q.push(Q[1]), W.unshift(Q[2])), W.length && (G = "/" + W.join(".") + G), this.hostname = q.join(".");
              break;
            }
          }
        }
      this.hostname.length > c ? this.hostname = "" : this.hostname = this.hostname.toLowerCase(), N || (this.hostname = n.toASCII(this.hostname));
      var et = this.port ? ":" + this.port : "", st = this.hostname || "";
      this.host = st + et, this.href += this.host, N && (this.hostname = this.hostname.substr(1, this.hostname.length - 2), G[0] !== "/" && (G = "/" + G));
    }
    if (!g[Y])
      for (var T = 0, F = u.length; T < F; T++) {
        var nt = u[T];
        if (G.indexOf(nt) !== -1) {
          var it = encodeURIComponent(nt);
          it === nt && (it = escape(nt)), G = G.split(nt).join(it);
        }
      }
    var rt = G.indexOf("#");
    rt !== -1 && (this.hash = G.substr(rt), G = G.slice(0, rt));
    var at = G.indexOf("?");
    if (at !== -1 ? (this.search = G.substr(at), this.query = G.substr(at + 1), M && (this.query = y.parse(this.query)), G = G.slice(0, at)) : M && (this.search = "", this.query = {}), G && (this.pathname = G), _[Y] && this.hostname && !this.pathname && (this.pathname = "/"), this.pathname || this.search) {
      var et = this.pathname || "", ft = this.search || "";
      this.path = et + ft;
    }
    return this.href = this.format(), this;
  };
  function S(E) {
    return typeof E == "string" && (E = b(E)), E instanceof e ? E.format() : e.prototype.format.call(E);
  }
  e.prototype.format = function() {
    var E = this.auth || "";
    E && (E = encodeURIComponent(E), E = E.replace(/%3A/i, ":"), E += "@");
    var M = this.protocol || "", A = this.pathname || "", $ = this.hash || "", B = !1, U = "";
    this.host ? B = E + this.host : this.hostname && (B = E + (this.hostname.indexOf(":") === -1 ? this.hostname : "[" + this.hostname + "]"), this.port && (B += ":" + this.port)), this.query && typeof this.query == "object" && Object.keys(this.query).length && (U = y.stringify(this.query, {
      arrayFormat: "repeat",
      addQueryPrefix: !1
    }));
    var X = this.search || U && "?" + U || "";
    return M && M.substr(-1) !== ":" && (M += ":"), this.slashes || (!M || _[M]) && B !== !1 ? (B = "//" + (B || ""), A && A.charAt(0) !== "/" && (A = "/" + A)) : B || (B = ""), $ && $.charAt(0) !== "#" && ($ = "#" + $), X && X.charAt(0) !== "?" && (X = "?" + X), A = A.replace(/[?#]/g, function(G) {
      return encodeURIComponent(G);
    }), X = X.replace("#", "%23"), M + B + A + X + $;
  };
  function O(E, M) {
    return b(E, !1, !0).resolve(M);
  }
  e.prototype.resolve = function(E) {
    return this.resolveObject(b(E, !1, !0)).format();
  };
  function D(E, M) {
    return E ? b(E, !1, !0).resolveObject(M) : M;
  }
  return e.prototype.resolveObject = function(E) {
    if (typeof E == "string") {
      var M = new e();
      M.parse(E, !1, !0), E = M;
    }
    for (var A = new e(), $ = Object.keys(this), B = 0; B < $.length; B++) {
      var U = $[B];
      A[U] = this[U];
    }
    if (A.hash = E.hash, E.href === "")
      return A.href = A.format(), A;
    if (E.slashes && !E.protocol) {
      for (var X = Object.keys(E), G = 0; G < X.length; G++) {
        var K = X[G];
        K !== "protocol" && (A[K] = E[K]);
      }
      return _[A.protocol] && A.hostname && !A.pathname && (A.pathname = "/", A.path = A.pathname), A.href = A.format(), A;
    }
    if (E.protocol && E.protocol !== A.protocol) {
      if (!_[E.protocol]) {
        for (var tt = Object.keys(E), Y = 0; Y < tt.length; Y++) {
          var P = tt[Y];
          A[P] = E[P];
        }
        return A.href = A.format(), A;
      }
      if (A.protocol = E.protocol, !E.host && !m[E.protocol]) {
        for (var F = (E.pathname || "").split("/"); F.length && !(E.host = F.shift()); )
          ;
        E.host || (E.host = ""), E.hostname || (E.hostname = ""), F[0] !== "" && F.unshift(""), F.length < 2 && F.unshift(""), A.pathname = F.join("/");
      } else
        A.pathname = E.pathname;
      if (A.search = E.search, A.query = E.query, A.host = E.host || "", A.auth = E.auth, A.hostname = E.hostname || E.host, A.port = E.port, A.pathname || A.search) {
        var I = A.pathname || "", T = A.search || "";
        A.path = I + T;
      }
      return A.slashes = A.slashes || E.slashes, A.href = A.format(), A;
    }
    var C = A.pathname && A.pathname.charAt(0) === "/", R = E.host || E.pathname && E.pathname.charAt(0) === "/", w = R || C || A.host && E.pathname, N = w, L = A.pathname && A.pathname.split("/") || [], F = E.pathname && E.pathname.split("/") || [], z = A.protocol && !_[A.protocol];
    if (z && (A.hostname = "", A.port = null, A.host && (L[0] === "" ? L[0] = A.host : L.unshift(A.host)), A.host = "", E.protocol && (E.hostname = null, E.port = null, E.host && (F[0] === "" ? F[0] = E.host : F.unshift(E.host)), E.host = null), w = w && (F[0] === "" || L[0] === "")), R)
      A.host = E.host || E.host === "" ? E.host : A.host, A.hostname = E.hostname || E.hostname === "" ? E.hostname : A.hostname, A.search = E.search, A.query = E.query, L = F;
    else if (F.length)
      L || (L = []), L.pop(), L = L.concat(F), A.search = E.search, A.query = E.query;
    else if (E.search != null) {
      if (z) {
        A.host = L.shift(), A.hostname = A.host;
        var J = A.host && A.host.indexOf("@") > 0 ? A.host.split("@") : !1;
        J && (A.auth = J.shift(), A.hostname = J.shift(), A.host = A.hostname);
      }
      return A.search = E.search, A.query = E.query, (A.pathname !== null || A.search !== null) && (A.path = (A.pathname ? A.pathname : "") + (A.search ? A.search : "")), A.href = A.format(), A;
    }
    if (!L.length)
      return A.pathname = null, A.search ? A.path = "/" + A.search : A.path = null, A.href = A.format(), A;
    for (var V = L.slice(-1)[0], Z = (A.host || E.host || L.length > 1) && (V === "." || V === "..") || V === "", q = 0, W = L.length; W >= 0; W--)
      V = L[W], V === "." ? L.splice(W, 1) : V === ".." ? (L.splice(W, 1), q++) : q && (L.splice(W, 1), q--);
    if (!w && !N)
      for (; q--; q)
        L.unshift("..");
    w && L[0] !== "" && (!L[0] || L[0].charAt(0) !== "/") && L.unshift(""), Z && L.join("/").substr(-1) !== "/" && L.push("");
    var Q = L[0] === "" || L[0] && L[0].charAt(0) === "/";
    if (z) {
      A.hostname = Q ? "" : L.length ? L.shift() : "", A.host = A.hostname;
      var J = A.host && A.host.indexOf("@") > 0 ? A.host.split("@") : !1;
      J && (A.auth = J.shift(), A.hostname = J.shift(), A.host = A.hostname);
    }
    return w = w || A.host && L.length, w && !Q && L.unshift(""), L.length > 0 ? A.pathname = L.join("/") : (A.pathname = null, A.path = null), (A.pathname !== null || A.search !== null) && (A.path = (A.pathname ? A.pathname : "") + (A.search ? A.search : "")), A.auth = E.auth || A.auth, A.slashes = A.slashes || E.slashes, A.href = A.format(), A;
  }, e.prototype.parseHost = function() {
    var E = this.host, M = r.exec(E);
    M && (M = M[0], M !== ":" && (this.port = M.substr(1)), E = E.substr(0, E.length - M.length)), E && (this.hostname = E);
  }, url$2.parse = b, url$2.resolve = O, url$2.resolveObject = D, url$2.format = S, url$2.Url = e, url$2;
}
var urlExports = requireUrl();
var url$1 = {
  parse: urlExports.parse,
  format: urlExports.format,
  resolve: urlExports.resolve
};
settings.RETINA_PREFIX = /@([0-9\.]+)x/;
settings.FAIL_IF_MAJOR_PERFORMANCE_CAVEAT = !1;
var saidHello = !1, VERSION = "6.5.10";
function skipHello() {
  saidHello = !0;
}
function sayHello(n) {
  var e;
  if (!saidHello) {
    if (settings.ADAPTER.getNavigator().userAgent.toLowerCase().indexOf("chrome") > -1) {
      var t = [
        `
 %c %c %c PixiJS ` + VERSION + " - ✰ " + n + ` ✰  %c  %c  http://www.pixijs.com/  %c %c ♥%c♥%c♥ 

`,
        "background: #ff66a5; padding:5px 0;",
        "background: #ff66a5; padding:5px 0;",
        "color: #ff66a5; background: #030307; padding:5px 0;",
        "background: #ff66a5; padding:5px 0;",
        "background: #ffc3dc; padding:5px 0;",
        "background: #ff66a5; padding:5px 0;",
        "color: #ff2424; background: #fff; padding:5px 0;",
        "color: #ff2424; background: #fff; padding:5px 0;",
        "color: #ff2424; background: #fff; padding:5px 0;"
      ];
      (e = globalThis.console).log.apply(e, t);
    } else globalThis.console && globalThis.console.log("PixiJS " + VERSION + " - " + n + " - http://www.pixijs.com/");
    saidHello = !0;
  }
}
var supported;
function isWebGLSupported() {
  return typeof supported > "u" && (supported = function() {
    var e = {
      stencil: !0,
      failIfMajorPerformanceCaveat: settings.FAIL_IF_MAJOR_PERFORMANCE_CAVEAT
    };
    try {
      if (!settings.ADAPTER.getWebGLRenderingContext())
        return !1;
      var t = settings.ADAPTER.createCanvas(), r = t.getContext("webgl", e) || t.getContext("experimental-webgl", e), a = !!(r && r.getContextAttributes().stencil);
      if (r) {
        var o = r.getExtension("WEBGL_lose_context");
        o && o.loseContext();
      }
      return r = null, a;
    } catch {
      return !1;
    }
  }()), supported;
}
var aliceblue = "#f0f8ff", antiquewhite = "#faebd7", aqua = "#00ffff", aquamarine = "#7fffd4", azure = "#f0ffff", beige = "#f5f5dc", bisque = "#ffe4c4", black = "#000000", blanchedalmond = "#ffebcd", blue = "#0000ff", blueviolet = "#8a2be2", brown = "#a52a2a", burlywood = "#deb887", cadetblue = "#5f9ea0", chartreuse = "#7fff00", chocolate = "#d2691e", coral = "#ff7f50", cornflowerblue = "#6495ed", cornsilk = "#fff8dc", crimson = "#dc143c", cyan = "#00ffff", darkblue = "#00008b", darkcyan = "#008b8b", darkgoldenrod = "#b8860b", darkgray = "#a9a9a9", darkgreen = "#006400", darkgrey = "#a9a9a9", darkkhaki = "#bdb76b", darkmagenta = "#8b008b", darkolivegreen = "#556b2f", darkorange = "#ff8c00", darkorchid = "#9932cc", darkred = "#8b0000", darksalmon = "#e9967a", darkseagreen = "#8fbc8f", darkslateblue = "#483d8b", darkslategray = "#2f4f4f", darkslategrey = "#2f4f4f", darkturquoise = "#00ced1", darkviolet = "#9400d3", deeppink = "#ff1493", deepskyblue = "#00bfff", dimgray = "#696969", dimgrey = "#696969", dodgerblue = "#1e90ff", firebrick = "#b22222", floralwhite = "#fffaf0", forestgreen = "#228b22", fuchsia = "#ff00ff", gainsboro = "#dcdcdc", ghostwhite = "#f8f8ff", goldenrod = "#daa520", gold = "#ffd700", gray = "#808080", green = "#008000", greenyellow = "#adff2f", grey = "#808080", honeydew = "#f0fff0", hotpink = "#ff69b4", indianred = "#cd5c5c", indigo = "#4b0082", ivory = "#fffff0", khaki = "#f0e68c", lavenderblush = "#fff0f5", lavender = "#e6e6fa", lawngreen = "#7cfc00", lemonchiffon = "#fffacd", lightblue = "#add8e6", lightcoral = "#f08080", lightcyan = "#e0ffff", lightgoldenrodyellow = "#fafad2", lightgray = "#d3d3d3", lightgreen = "#90ee90", lightgrey = "#d3d3d3", lightpink = "#ffb6c1", lightsalmon = "#ffa07a", lightseagreen = "#20b2aa", lightskyblue = "#87cefa", lightslategray = "#778899", lightslategrey = "#778899", lightsteelblue = "#b0c4de", lightyellow = "#ffffe0", lime = "#00ff00", limegreen = "#32cd32", linen = "#faf0e6", magenta = "#ff00ff", maroon = "#800000", mediumaquamarine = "#66cdaa", mediumblue = "#0000cd", mediumorchid = "#ba55d3", mediumpurple = "#9370db", mediumseagreen = "#3cb371", mediumslateblue = "#7b68ee", mediumspringgreen = "#00fa9a", mediumturquoise = "#48d1cc", mediumvioletred = "#c71585", midnightblue = "#191970", mintcream = "#f5fffa", mistyrose = "#ffe4e1", moccasin = "#ffe4b5", navajowhite = "#ffdead", navy = "#000080", oldlace = "#fdf5e6", olive = "#808000", olivedrab = "#6b8e23", orange = "#ffa500", orangered = "#ff4500", orchid = "#da70d6", palegoldenrod = "#eee8aa", palegreen = "#98fb98", paleturquoise = "#afeeee", palevioletred = "#db7093", papayawhip = "#ffefd5", peachpuff = "#ffdab9", peru = "#cd853f", pink = "#ffc0cb", plum = "#dda0dd", powderblue = "#b0e0e6", purple = "#800080", rebeccapurple = "#663399", red = "#ff0000", rosybrown = "#bc8f8f", royalblue = "#4169e1", saddlebrown = "#8b4513", salmon = "#fa8072", sandybrown = "#f4a460", seagreen = "#2e8b57", seashell = "#fff5ee", sienna = "#a0522d", silver = "#c0c0c0", skyblue = "#87ceeb", slateblue = "#6a5acd", slategray = "#708090", slategrey = "#708090", snow = "#fffafa", springgreen = "#00ff7f", steelblue = "#4682b4", tan = "#d2b48c", teal = "#008080", thistle = "#d8bfd8", tomato = "#ff6347", turquoise = "#40e0d0", violet = "#ee82ee", wheat = "#f5deb3", white = "#ffffff", whitesmoke = "#f5f5f5", yellow = "#ffff00", yellowgreen = "#9acd32", cssColorNames = {
  aliceblue,
  antiquewhite,
  aqua,
  aquamarine,
  azure,
  beige,
  bisque,
  black,
  blanchedalmond,
  blue,
  blueviolet,
  brown,
  burlywood,
  cadetblue,
  chartreuse,
  chocolate,
  coral,
  cornflowerblue,
  cornsilk,
  crimson,
  cyan,
  darkblue,
  darkcyan,
  darkgoldenrod,
  darkgray,
  darkgreen,
  darkgrey,
  darkkhaki,
  darkmagenta,
  darkolivegreen,
  darkorange,
  darkorchid,
  darkred,
  darksalmon,
  darkseagreen,
  darkslateblue,
  darkslategray,
  darkslategrey,
  darkturquoise,
  darkviolet,
  deeppink,
  deepskyblue,
  dimgray,
  dimgrey,
  dodgerblue,
  firebrick,
  floralwhite,
  forestgreen,
  fuchsia,
  gainsboro,
  ghostwhite,
  goldenrod,
  gold,
  gray,
  green,
  greenyellow,
  grey,
  honeydew,
  hotpink,
  indianred,
  indigo,
  ivory,
  khaki,
  lavenderblush,
  lavender,
  lawngreen,
  lemonchiffon,
  lightblue,
  lightcoral,
  lightcyan,
  lightgoldenrodyellow,
  lightgray,
  lightgreen,
  lightgrey,
  lightpink,
  lightsalmon,
  lightseagreen,
  lightskyblue,
  lightslategray,
  lightslategrey,
  lightsteelblue,
  lightyellow,
  lime,
  limegreen,
  linen,
  magenta,
  maroon,
  mediumaquamarine,
  mediumblue,
  mediumorchid,
  mediumpurple,
  mediumseagreen,
  mediumslateblue,
  mediumspringgreen,
  mediumturquoise,
  mediumvioletred,
  midnightblue,
  mintcream,
  mistyrose,
  moccasin,
  navajowhite,
  navy,
  oldlace,
  olive,
  olivedrab,
  orange,
  orangered,
  orchid,
  palegoldenrod,
  palegreen,
  paleturquoise,
  palevioletred,
  papayawhip,
  peachpuff,
  peru,
  pink,
  plum,
  powderblue,
  purple,
  rebeccapurple,
  red,
  rosybrown,
  royalblue,
  saddlebrown,
  salmon,
  sandybrown,
  seagreen,
  seashell,
  sienna,
  silver,
  skyblue,
  slateblue,
  slategray,
  slategrey,
  snow,
  springgreen,
  steelblue,
  tan,
  teal,
  thistle,
  tomato,
  turquoise,
  violet,
  wheat,
  white,
  whitesmoke,
  yellow,
  yellowgreen
};
function hex2rgb(n, e) {
  return e === void 0 && (e = []), e[0] = (n >> 16 & 255) / 255, e[1] = (n >> 8 & 255) / 255, e[2] = (n & 255) / 255, e;
}
function hex2string(n) {
  var e = n.toString(16);
  return e = "000000".substring(0, 6 - e.length) + e, "#" + e;
}
function string2hex(n) {
  return typeof n == "string" && (n = cssColorNames[n.toLowerCase()] || n, n[0] === "#" && (n = n.slice(1))), parseInt(n, 16);
}
function mapPremultipliedBlendModes() {
  for (var n = [], e = [], t = 0; t < 32; t++)
    n[t] = t, e[t] = t;
  n[BLEND_MODES.NORMAL_NPM] = BLEND_MODES.NORMAL, n[BLEND_MODES.ADD_NPM] = BLEND_MODES.ADD, n[BLEND_MODES.SCREEN_NPM] = BLEND_MODES.SCREEN, e[BLEND_MODES.NORMAL] = BLEND_MODES.NORMAL_NPM, e[BLEND_MODES.ADD] = BLEND_MODES.ADD_NPM, e[BLEND_MODES.SCREEN] = BLEND_MODES.SCREEN_NPM;
  var r = [];
  return r.push(e), r.push(n), r;
}
var premultiplyBlendMode = mapPremultipliedBlendModes();
function correctBlendMode(n, e) {
  return premultiplyBlendMode[e ? 1 : 0][n];
}
function premultiplyRgba(n, e, t, r) {
  return t = t || new Float32Array(4), r || r === void 0 ? (t[0] = n[0] * e, t[1] = n[1] * e, t[2] = n[2] * e) : (t[0] = n[0], t[1] = n[1], t[2] = n[2]), t[3] = e, t;
}
function premultiplyTint(n, e) {
  if (e === 1)
    return (e * 255 << 24) + n;
  if (e === 0)
    return 0;
  var t = n >> 16 & 255, r = n >> 8 & 255, a = n & 255;
  return t = t * e + 0.5 | 0, r = r * e + 0.5 | 0, a = a * e + 0.5 | 0, (e * 255 << 24) + (t << 16) + (r << 8) + a;
}
function premultiplyTintToRgba(n, e, t, r) {
  return t = t || new Float32Array(4), t[0] = (n >> 16 & 255) / 255, t[1] = (n >> 8 & 255) / 255, t[2] = (n & 255) / 255, (r || r === void 0) && (t[0] *= e, t[1] *= e, t[2] *= e), t[3] = e, t;
}
function createIndicesForQuads(n, e) {
  e === void 0 && (e = null);
  var t = n * 6;
  if (e = e || new Uint16Array(t), e.length !== t)
    throw new Error("Out buffer length is incorrect, got " + e.length + " and expected " + t);
  for (var r = 0, a = 0; r < t; r += 6, a += 4)
    e[r + 0] = a + 0, e[r + 1] = a + 1, e[r + 2] = a + 2, e[r + 3] = a + 0, e[r + 4] = a + 2, e[r + 5] = a + 3;
  return e;
}
function getBufferType(n) {
  if (n.BYTES_PER_ELEMENT === 4)
    return n instanceof Float32Array ? "Float32Array" : n instanceof Uint32Array ? "Uint32Array" : "Int32Array";
  if (n.BYTES_PER_ELEMENT === 2) {
    if (n instanceof Uint16Array)
      return "Uint16Array";
  } else if (n.BYTES_PER_ELEMENT === 1 && n instanceof Uint8Array)
    return "Uint8Array";
  return null;
}
function nextPow2(n) {
  return n += n === 0 ? 1 : 0, --n, n |= n >>> 1, n |= n >>> 2, n |= n >>> 4, n |= n >>> 8, n |= n >>> 16, n + 1;
}
function isPow2(n) {
  return !(n & n - 1) && !!n;
}
function log2(n) {
  var e = (n > 65535 ? 1 : 0) << 4;
  n >>>= e;
  var t = (n > 255 ? 1 : 0) << 3;
  return n >>>= t, e |= t, t = (n > 15 ? 1 : 0) << 2, n >>>= t, e |= t, t = (n > 3 ? 1 : 0) << 1, n >>>= t, e |= t, e | n >> 1;
}
function removeItems(n, e, t) {
  var r = n.length, a;
  if (!(e >= r || t === 0)) {
    t = e + t > r ? r - e : t;
    var o = r - t;
    for (a = e; a < o; ++a)
      n[a] = n[a + t];
    n.length = o;
  }
}
function sign(n) {
  return n === 0 ? 0 : n < 0 ? -1 : 1;
}
var nextUid = 0;
function uid() {
  return ++nextUid;
}
var warnings = {};
function deprecation(n, e, t) {
  if (t === void 0 && (t = 3), !warnings[e]) {
    var r = new Error().stack;
    typeof r > "u" ? console.warn("PixiJS Deprecation Warning: ", e + `
Deprecated since v` + n) : (r = r.split(`
`).splice(t).join(`
`), console.groupCollapsed ? (console.groupCollapsed("%cPixiJS Deprecation Warning: %c%s", "color:#614108;background:#fffbe6", "font-weight:normal;color:#614108;background:#fffbe6", e + `
Deprecated since v` + n), console.warn(r), console.groupEnd()) : (console.warn("PixiJS Deprecation Warning: ", e + `
Deprecated since v` + n), console.warn(r))), warnings[e] = !0;
  }
}
var ProgramCache = {}, TextureCache = /* @__PURE__ */ Object.create(null), BaseTextureCache = /* @__PURE__ */ Object.create(null);
function clearTextureCache() {
  var n;
  for (n in TextureCache)
    delete TextureCache[n];
  for (n in BaseTextureCache)
    delete BaseTextureCache[n];
}
var CanvasRenderTarget = (
  /** @class */
  function() {
    function n(e, t, r) {
      this.canvas = settings.ADAPTER.createCanvas(), this.context = this.canvas.getContext("2d"), this.resolution = r || settings.RESOLUTION, this.resize(e, t);
    }
    return n.prototype.clear = function() {
      this.context.setTransform(1, 0, 0, 1, 0, 0), this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }, n.prototype.resize = function(e, t) {
      this.canvas.width = Math.round(e * this.resolution), this.canvas.height = Math.round(t * this.resolution);
    }, n.prototype.destroy = function() {
      this.context = null, this.canvas = null;
    }, Object.defineProperty(n.prototype, "width", {
      /**
       * The width of the canvas buffer in pixels.
       * @member {number}
       */
      get: function() {
        return this.canvas.width;
      },
      set: function(e) {
        this.canvas.width = Math.round(e);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n.prototype, "height", {
      /**
       * The height of the canvas buffer in pixels.
       * @member {number}
       */
      get: function() {
        return this.canvas.height;
      },
      set: function(e) {
        this.canvas.height = Math.round(e);
      },
      enumerable: !1,
      configurable: !0
    }), n;
  }()
);
function trimCanvas(n) {
  var e = n.width, t = n.height, r = n.getContext("2d", {
    willReadFrequently: !0
  }), a = r.getImageData(0, 0, e, t), o = a.data, s = o.length, u = {
    top: null,
    left: null,
    right: null,
    bottom: null
  }, h = null, l, c, v;
  for (l = 0; l < s; l += 4)
    o[l + 3] !== 0 && (c = l / 4 % e, v = ~~(l / 4 / e), u.top === null && (u.top = v), (u.left === null || c < u.left) && (u.left = c), (u.right === null || u.right < c) && (u.right = c + 1), (u.bottom === null || u.bottom < v) && (u.bottom = v));
  return u.top !== null && (e = u.right - u.left, t = u.bottom - u.top + 1, h = r.getImageData(u.left, u.top, e, t)), {
    height: t,
    width: e,
    data: h
  };
}
var tempAnchor$1;
function determineCrossOrigin(n, e) {
  if (e === void 0 && (e = globalThis.location), n.indexOf("data:") === 0)
    return "";
  e = e || globalThis.location, tempAnchor$1 || (tempAnchor$1 = document.createElement("a")), tempAnchor$1.href = n;
  var t = url$1.parse(tempAnchor$1.href), r = !t.port && e.port === "" || t.port === e.port;
  return t.hostname !== e.hostname || !r || t.protocol !== e.protocol ? "anonymous" : "";
}
function getResolutionOfUrl(n, e) {
  var t = settings.RETINA_PREFIX.exec(n);
  return t ? parseFloat(t[1]) : e !== void 0 ? e : 1;
}
var PI_2 = Math.PI * 2, RAD_TO_DEG = 180 / Math.PI, DEG_TO_RAD = Math.PI / 180, SHAPES;
(function(n) {
  n[n.POLY = 0] = "POLY", n[n.RECT = 1] = "RECT", n[n.CIRC = 2] = "CIRC", n[n.ELIP = 3] = "ELIP", n[n.RREC = 4] = "RREC";
})(SHAPES || (SHAPES = {}));
var Point = (
  /** @class */
  function() {
    function n(e, t) {
      e === void 0 && (e = 0), t === void 0 && (t = 0), this.x = 0, this.y = 0, this.x = e, this.y = t;
    }
    return n.prototype.clone = function() {
      return new n(this.x, this.y);
    }, n.prototype.copyFrom = function(e) {
      return this.set(e.x, e.y), this;
    }, n.prototype.copyTo = function(e) {
      return e.set(this.x, this.y), e;
    }, n.prototype.equals = function(e) {
      return e.x === this.x && e.y === this.y;
    }, n.prototype.set = function(e, t) {
      return e === void 0 && (e = 0), t === void 0 && (t = e), this.x = e, this.y = t, this;
    }, n.prototype.toString = function() {
      return "[@pixi/math:Point x=" + this.x + " y=" + this.y + "]";
    }, n;
  }()
), tempPoints$1 = [new Point(), new Point(), new Point(), new Point()], Rectangle = (
  /** @class */
  function() {
    function n(e, t, r, a) {
      e === void 0 && (e = 0), t === void 0 && (t = 0), r === void 0 && (r = 0), a === void 0 && (a = 0), this.x = Number(e), this.y = Number(t), this.width = Number(r), this.height = Number(a), this.type = SHAPES.RECT;
    }
    return Object.defineProperty(n.prototype, "left", {
      /** Returns the left edge of the rectangle. */
      get: function() {
        return this.x;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n.prototype, "right", {
      /** Returns the right edge of the rectangle. */
      get: function() {
        return this.x + this.width;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n.prototype, "top", {
      /** Returns the top edge of the rectangle. */
      get: function() {
        return this.y;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n.prototype, "bottom", {
      /** Returns the bottom edge of the rectangle. */
      get: function() {
        return this.y + this.height;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n, "EMPTY", {
      /** A constant empty rectangle. */
      get: function() {
        return new n(0, 0, 0, 0);
      },
      enumerable: !1,
      configurable: !0
    }), n.prototype.clone = function() {
      return new n(this.x, this.y, this.width, this.height);
    }, n.prototype.copyFrom = function(e) {
      return this.x = e.x, this.y = e.y, this.width = e.width, this.height = e.height, this;
    }, n.prototype.copyTo = function(e) {
      return e.x = this.x, e.y = this.y, e.width = this.width, e.height = this.height, e;
    }, n.prototype.contains = function(e, t) {
      return this.width <= 0 || this.height <= 0 ? !1 : e >= this.x && e < this.x + this.width && t >= this.y && t < this.y + this.height;
    }, n.prototype.intersects = function(e, t) {
      if (!t) {
        var r = this.x < e.x ? e.x : this.x, a = this.right > e.right ? e.right : this.right;
        if (a <= r)
          return !1;
        var o = this.y < e.y ? e.y : this.y, s = this.bottom > e.bottom ? e.bottom : this.bottom;
        return s > o;
      }
      var u = this.left, h = this.right, l = this.top, c = this.bottom;
      if (h <= u || c <= l)
        return !1;
      var v = tempPoints$1[0].set(e.left, e.top), d = tempPoints$1[1].set(e.left, e.bottom), g = tempPoints$1[2].set(e.right, e.top), m = tempPoints$1[3].set(e.right, e.bottom);
      if (g.x <= v.x || d.y <= v.y)
        return !1;
      var _ = Math.sign(t.a * t.d - t.b * t.c);
      if (_ === 0 || (t.apply(v, v), t.apply(d, d), t.apply(g, g), t.apply(m, m), Math.max(v.x, d.x, g.x, m.x) <= u || Math.min(v.x, d.x, g.x, m.x) >= h || Math.max(v.y, d.y, g.y, m.y) <= l || Math.min(v.y, d.y, g.y, m.y) >= c))
        return !1;
      var y = _ * (d.y - v.y), b = _ * (v.x - d.x), S = y * u + b * l, O = y * h + b * l, D = y * u + b * c, E = y * h + b * c;
      if (Math.max(S, O, D, E) <= y * v.x + b * v.y || Math.min(S, O, D, E) >= y * m.x + b * m.y)
        return !1;
      var M = _ * (v.y - g.y), A = _ * (g.x - v.x), $ = M * u + A * l, B = M * h + A * l, U = M * u + A * c, X = M * h + A * c;
      return !(Math.max($, B, U, X) <= M * v.x + A * v.y || Math.min($, B, U, X) >= M * m.x + A * m.y);
    }, n.prototype.pad = function(e, t) {
      return e === void 0 && (e = 0), t === void 0 && (t = e), this.x -= e, this.y -= t, this.width += e * 2, this.height += t * 2, this;
    }, n.prototype.fit = function(e) {
      var t = Math.max(this.x, e.x), r = Math.min(this.x + this.width, e.x + e.width), a = Math.max(this.y, e.y), o = Math.min(this.y + this.height, e.y + e.height);
      return this.x = t, this.width = Math.max(r - t, 0), this.y = a, this.height = Math.max(o - a, 0), this;
    }, n.prototype.ceil = function(e, t) {
      e === void 0 && (e = 1), t === void 0 && (t = 1e-3);
      var r = Math.ceil((this.x + this.width - t) * e) / e, a = Math.ceil((this.y + this.height - t) * e) / e;
      return this.x = Math.floor((this.x + t) * e) / e, this.y = Math.floor((this.y + t) * e) / e, this.width = r - this.x, this.height = a - this.y, this;
    }, n.prototype.enlarge = function(e) {
      var t = Math.min(this.x, e.x), r = Math.max(this.x + this.width, e.x + e.width), a = Math.min(this.y, e.y), o = Math.max(this.y + this.height, e.y + e.height);
      return this.x = t, this.width = r - t, this.y = a, this.height = o - a, this;
    }, n.prototype.toString = function() {
      return "[@pixi/math:Rectangle x=" + this.x + " y=" + this.y + " width=" + this.width + " height=" + this.height + "]";
    }, n;
  }()
), Circle = (
  /** @class */
  function() {
    function n(e, t, r) {
      e === void 0 && (e = 0), t === void 0 && (t = 0), r === void 0 && (r = 0), this.x = e, this.y = t, this.radius = r, this.type = SHAPES.CIRC;
    }
    return n.prototype.clone = function() {
      return new n(this.x, this.y, this.radius);
    }, n.prototype.contains = function(e, t) {
      if (this.radius <= 0)
        return !1;
      var r = this.radius * this.radius, a = this.x - e, o = this.y - t;
      return a *= a, o *= o, a + o <= r;
    }, n.prototype.getBounds = function() {
      return new Rectangle(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
    }, n.prototype.toString = function() {
      return "[@pixi/math:Circle x=" + this.x + " y=" + this.y + " radius=" + this.radius + "]";
    }, n;
  }()
), Ellipse = (
  /** @class */
  function() {
    function n(e, t, r, a) {
      e === void 0 && (e = 0), t === void 0 && (t = 0), r === void 0 && (r = 0), a === void 0 && (a = 0), this.x = e, this.y = t, this.width = r, this.height = a, this.type = SHAPES.ELIP;
    }
    return n.prototype.clone = function() {
      return new n(this.x, this.y, this.width, this.height);
    }, n.prototype.contains = function(e, t) {
      if (this.width <= 0 || this.height <= 0)
        return !1;
      var r = (e - this.x) / this.width, a = (t - this.y) / this.height;
      return r *= r, a *= a, r + a <= 1;
    }, n.prototype.getBounds = function() {
      return new Rectangle(this.x - this.width, this.y - this.height, this.width, this.height);
    }, n.prototype.toString = function() {
      return "[@pixi/math:Ellipse x=" + this.x + " y=" + this.y + " width=" + this.width + " height=" + this.height + "]";
    }, n;
  }()
), Polygon = (
  /** @class */
  function() {
    function n() {
      for (var e = arguments, t = [], r = 0; r < arguments.length; r++)
        t[r] = e[r];
      var a = Array.isArray(t[0]) ? t[0] : t;
      if (typeof a[0] != "number") {
        for (var o = [], s = 0, u = a.length; s < u; s++)
          o.push(a[s].x, a[s].y);
        a = o;
      }
      this.points = a, this.type = SHAPES.POLY, this.closeStroke = !0;
    }
    return n.prototype.clone = function() {
      var e = this.points.slice(), t = new n(e);
      return t.closeStroke = this.closeStroke, t;
    }, n.prototype.contains = function(e, t) {
      for (var r = !1, a = this.points.length / 2, o = 0, s = a - 1; o < a; s = o++) {
        var u = this.points[o * 2], h = this.points[o * 2 + 1], l = this.points[s * 2], c = this.points[s * 2 + 1], v = h > t != c > t && e < (l - u) * ((t - h) / (c - h)) + u;
        v && (r = !r);
      }
      return r;
    }, n.prototype.toString = function() {
      return "[@pixi/math:Polygon" + ("closeStroke=" + this.closeStroke) + ("points=" + this.points.reduce(function(e, t) {
        return e + ", " + t;
      }, "") + "]");
    }, n;
  }()
), RoundedRectangle = (
  /** @class */
  function() {
    function n(e, t, r, a, o) {
      e === void 0 && (e = 0), t === void 0 && (t = 0), r === void 0 && (r = 0), a === void 0 && (a = 0), o === void 0 && (o = 20), this.x = e, this.y = t, this.width = r, this.height = a, this.radius = o, this.type = SHAPES.RREC;
    }
    return n.prototype.clone = function() {
      return new n(this.x, this.y, this.width, this.height, this.radius);
    }, n.prototype.contains = function(e, t) {
      if (this.width <= 0 || this.height <= 0)
        return !1;
      if (e >= this.x && e <= this.x + this.width && t >= this.y && t <= this.y + this.height) {
        var r = Math.max(0, Math.min(this.radius, Math.min(this.width, this.height) / 2));
        if (t >= this.y + r && t <= this.y + this.height - r || e >= this.x + r && e <= this.x + this.width - r)
          return !0;
        var a = e - (this.x + r), o = t - (this.y + r), s = r * r;
        if (a * a + o * o <= s || (a = e - (this.x + this.width - r), a * a + o * o <= s) || (o = t - (this.y + this.height - r), a * a + o * o <= s) || (a = e - (this.x + r), a * a + o * o <= s))
          return !0;
      }
      return !1;
    }, n.prototype.toString = function() {
      return "[@pixi/math:RoundedRectangle x=" + this.x + " y=" + this.y + ("width=" + this.width + " height=" + this.height + " radius=" + this.radius + "]");
    }, n;
  }()
), ObservablePoint = (
  /** @class */
  function() {
    function n(e, t, r, a) {
      r === void 0 && (r = 0), a === void 0 && (a = 0), this._x = r, this._y = a, this.cb = e, this.scope = t;
    }
    return n.prototype.clone = function(e, t) {
      return e === void 0 && (e = this.cb), t === void 0 && (t = this.scope), new n(e, t, this._x, this._y);
    }, n.prototype.set = function(e, t) {
      return e === void 0 && (e = 0), t === void 0 && (t = e), (this._x !== e || this._y !== t) && (this._x = e, this._y = t, this.cb.call(this.scope)), this;
    }, n.prototype.copyFrom = function(e) {
      return (this._x !== e.x || this._y !== e.y) && (this._x = e.x, this._y = e.y, this.cb.call(this.scope)), this;
    }, n.prototype.copyTo = function(e) {
      return e.set(this._x, this._y), e;
    }, n.prototype.equals = function(e) {
      return e.x === this._x && e.y === this._y;
    }, n.prototype.toString = function() {
      return "[@pixi/math:ObservablePoint x=0 y=0 scope=" + this.scope + "]";
    }, Object.defineProperty(n.prototype, "x", {
      /** Position of the observable point on the x axis. */
      get: function() {
        return this._x;
      },
      set: function(e) {
        this._x !== e && (this._x = e, this.cb.call(this.scope));
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n.prototype, "y", {
      /** Position of the observable point on the y axis. */
      get: function() {
        return this._y;
      },
      set: function(e) {
        this._y !== e && (this._y = e, this.cb.call(this.scope));
      },
      enumerable: !1,
      configurable: !0
    }), n;
  }()
), Matrix = (
  /** @class */
  function() {
    function n(e, t, r, a, o, s) {
      e === void 0 && (e = 1), t === void 0 && (t = 0), r === void 0 && (r = 0), a === void 0 && (a = 1), o === void 0 && (o = 0), s === void 0 && (s = 0), this.array = null, this.a = e, this.b = t, this.c = r, this.d = a, this.tx = o, this.ty = s;
    }
    return n.prototype.fromArray = function(e) {
      this.a = e[0], this.b = e[1], this.c = e[3], this.d = e[4], this.tx = e[2], this.ty = e[5];
    }, n.prototype.set = function(e, t, r, a, o, s) {
      return this.a = e, this.b = t, this.c = r, this.d = a, this.tx = o, this.ty = s, this;
    }, n.prototype.toArray = function(e, t) {
      this.array || (this.array = new Float32Array(9));
      var r = t || this.array;
      return e ? (r[0] = this.a, r[1] = this.b, r[2] = 0, r[3] = this.c, r[4] = this.d, r[5] = 0, r[6] = this.tx, r[7] = this.ty, r[8] = 1) : (r[0] = this.a, r[1] = this.c, r[2] = this.tx, r[3] = this.b, r[4] = this.d, r[5] = this.ty, r[6] = 0, r[7] = 0, r[8] = 1), r;
    }, n.prototype.apply = function(e, t) {
      t = t || new Point();
      var r = e.x, a = e.y;
      return t.x = this.a * r + this.c * a + this.tx, t.y = this.b * r + this.d * a + this.ty, t;
    }, n.prototype.applyInverse = function(e, t) {
      t = t || new Point();
      var r = 1 / (this.a * this.d + this.c * -this.b), a = e.x, o = e.y;
      return t.x = this.d * r * a + -this.c * r * o + (this.ty * this.c - this.tx * this.d) * r, t.y = this.a * r * o + -this.b * r * a + (-this.ty * this.a + this.tx * this.b) * r, t;
    }, n.prototype.translate = function(e, t) {
      return this.tx += e, this.ty += t, this;
    }, n.prototype.scale = function(e, t) {
      return this.a *= e, this.d *= t, this.c *= e, this.b *= t, this.tx *= e, this.ty *= t, this;
    }, n.prototype.rotate = function(e) {
      var t = Math.cos(e), r = Math.sin(e), a = this.a, o = this.c, s = this.tx;
      return this.a = a * t - this.b * r, this.b = a * r + this.b * t, this.c = o * t - this.d * r, this.d = o * r + this.d * t, this.tx = s * t - this.ty * r, this.ty = s * r + this.ty * t, this;
    }, n.prototype.append = function(e) {
      var t = this.a, r = this.b, a = this.c, o = this.d;
      return this.a = e.a * t + e.b * a, this.b = e.a * r + e.b * o, this.c = e.c * t + e.d * a, this.d = e.c * r + e.d * o, this.tx = e.tx * t + e.ty * a + this.tx, this.ty = e.tx * r + e.ty * o + this.ty, this;
    }, n.prototype.setTransform = function(e, t, r, a, o, s, u, h, l) {
      return this.a = Math.cos(u + l) * o, this.b = Math.sin(u + l) * o, this.c = -Math.sin(u - h) * s, this.d = Math.cos(u - h) * s, this.tx = e - (r * this.a + a * this.c), this.ty = t - (r * this.b + a * this.d), this;
    }, n.prototype.prepend = function(e) {
      var t = this.tx;
      if (e.a !== 1 || e.b !== 0 || e.c !== 0 || e.d !== 1) {
        var r = this.a, a = this.c;
        this.a = r * e.a + this.b * e.c, this.b = r * e.b + this.b * e.d, this.c = a * e.a + this.d * e.c, this.d = a * e.b + this.d * e.d;
      }
      return this.tx = t * e.a + this.ty * e.c + e.tx, this.ty = t * e.b + this.ty * e.d + e.ty, this;
    }, n.prototype.decompose = function(e) {
      var t = this.a, r = this.b, a = this.c, o = this.d, s = e.pivot, u = -Math.atan2(-a, o), h = Math.atan2(r, t), l = Math.abs(u + h);
      return l < 1e-5 || Math.abs(PI_2 - l) < 1e-5 ? (e.rotation = h, e.skew.x = e.skew.y = 0) : (e.rotation = 0, e.skew.x = u, e.skew.y = h), e.scale.x = Math.sqrt(t * t + r * r), e.scale.y = Math.sqrt(a * a + o * o), e.position.x = this.tx + (s.x * t + s.y * a), e.position.y = this.ty + (s.x * r + s.y * o), e;
    }, n.prototype.invert = function() {
      var e = this.a, t = this.b, r = this.c, a = this.d, o = this.tx, s = e * a - t * r;
      return this.a = a / s, this.b = -t / s, this.c = -r / s, this.d = e / s, this.tx = (r * this.ty - a * o) / s, this.ty = -(e * this.ty - t * o) / s, this;
    }, n.prototype.identity = function() {
      return this.a = 1, this.b = 0, this.c = 0, this.d = 1, this.tx = 0, this.ty = 0, this;
    }, n.prototype.clone = function() {
      var e = new n();
      return e.a = this.a, e.b = this.b, e.c = this.c, e.d = this.d, e.tx = this.tx, e.ty = this.ty, e;
    }, n.prototype.copyTo = function(e) {
      return e.a = this.a, e.b = this.b, e.c = this.c, e.d = this.d, e.tx = this.tx, e.ty = this.ty, e;
    }, n.prototype.copyFrom = function(e) {
      return this.a = e.a, this.b = e.b, this.c = e.c, this.d = e.d, this.tx = e.tx, this.ty = e.ty, this;
    }, n.prototype.toString = function() {
      return "[@pixi/math:Matrix a=" + this.a + " b=" + this.b + " c=" + this.c + " d=" + this.d + " tx=" + this.tx + " ty=" + this.ty + "]";
    }, Object.defineProperty(n, "IDENTITY", {
      /**
       * A default (identity) matrix
       * @readonly
       */
      get: function() {
        return new n();
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n, "TEMP_MATRIX", {
      /**
       * A temp matrix
       * @readonly
       */
      get: function() {
        return new n();
      },
      enumerable: !1,
      configurable: !0
    }), n;
  }()
), ux = [1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1, 0, 1], uy = [0, 1, 1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1], vx = [0, -1, -1, -1, 0, 1, 1, 1, 0, 1, 1, 1, 0, -1, -1, -1], vy = [1, 1, 0, -1, -1, -1, 0, 1, -1, -1, 0, 1, 1, 1, 0, -1], rotationCayley = [], rotationMatrices = [], signum = Math.sign;
function init() {
  for (var n = 0; n < 16; n++) {
    var e = [];
    rotationCayley.push(e);
    for (var t = 0; t < 16; t++)
      for (var r = signum(ux[n] * ux[t] + vx[n] * uy[t]), a = signum(uy[n] * ux[t] + vy[n] * uy[t]), o = signum(ux[n] * vx[t] + vx[n] * vy[t]), s = signum(uy[n] * vx[t] + vy[n] * vy[t]), u = 0; u < 16; u++)
        if (ux[u] === r && uy[u] === a && vx[u] === o && vy[u] === s) {
          e.push(u);
          break;
        }
  }
  for (var n = 0; n < 16; n++) {
    var h = new Matrix();
    h.set(ux[n], uy[n], vx[n], vy[n], 0, 0), rotationMatrices.push(h);
  }
}
init();
var groupD8 = {
  /**
   * | Rotation | Direction |
   * |----------|-----------|
   * | 0°       | East      |
   * @memberof PIXI.groupD8
   * @constant {PIXI.GD8Symmetry}
   */
  E: 0,
  /**
   * | Rotation | Direction |
   * |----------|-----------|
   * | 45°↻     | Southeast |
   * @memberof PIXI.groupD8
   * @constant {PIXI.GD8Symmetry}
   */
  SE: 1,
  /**
   * | Rotation | Direction |
   * |----------|-----------|
   * | 90°↻     | South     |
   * @memberof PIXI.groupD8
   * @constant {PIXI.GD8Symmetry}
   */
  S: 2,
  /**
   * | Rotation | Direction |
   * |----------|-----------|
   * | 135°↻    | Southwest |
   * @memberof PIXI.groupD8
   * @constant {PIXI.GD8Symmetry}
   */
  SW: 3,
  /**
   * | Rotation | Direction |
   * |----------|-----------|
   * | 180°     | West      |
   * @memberof PIXI.groupD8
   * @constant {PIXI.GD8Symmetry}
   */
  W: 4,
  /**
   * | Rotation    | Direction    |
   * |-------------|--------------|
   * | -135°/225°↻ | Northwest    |
   * @memberof PIXI.groupD8
   * @constant {PIXI.GD8Symmetry}
   */
  NW: 5,
  /**
   * | Rotation    | Direction    |
   * |-------------|--------------|
   * | -90°/270°↻  | North        |
   * @memberof PIXI.groupD8
   * @constant {PIXI.GD8Symmetry}
   */
  N: 6,
  /**
   * | Rotation    | Direction    |
   * |-------------|--------------|
   * | -45°/315°↻  | Northeast    |
   * @memberof PIXI.groupD8
   * @constant {PIXI.GD8Symmetry}
   */
  NE: 7,
  /**
   * Reflection about Y-axis.
   * @memberof PIXI.groupD8
   * @constant {PIXI.GD8Symmetry}
   */
  MIRROR_VERTICAL: 8,
  /**
   * Reflection about the main diagonal.
   * @memberof PIXI.groupD8
   * @constant {PIXI.GD8Symmetry}
   */
  MAIN_DIAGONAL: 10,
  /**
   * Reflection about X-axis.
   * @memberof PIXI.groupD8
   * @constant {PIXI.GD8Symmetry}
   */
  MIRROR_HORIZONTAL: 12,
  /**
   * Reflection about reverse diagonal.
   * @memberof PIXI.groupD8
   * @constant {PIXI.GD8Symmetry}
   */
  REVERSE_DIAGONAL: 14,
  /**
   * @memberof PIXI.groupD8
   * @param {PIXI.GD8Symmetry} ind - sprite rotation angle.
   * @returns {PIXI.GD8Symmetry} The X-component of the U-axis
   *    after rotating the axes.
   */
  uX: function(n) {
    return ux[n];
  },
  /**
   * @memberof PIXI.groupD8
   * @param {PIXI.GD8Symmetry} ind - sprite rotation angle.
   * @returns {PIXI.GD8Symmetry} The Y-component of the U-axis
   *    after rotating the axes.
   */
  uY: function(n) {
    return uy[n];
  },
  /**
   * @memberof PIXI.groupD8
   * @param {PIXI.GD8Symmetry} ind - sprite rotation angle.
   * @returns {PIXI.GD8Symmetry} The X-component of the V-axis
   *    after rotating the axes.
   */
  vX: function(n) {
    return vx[n];
  },
  /**
   * @memberof PIXI.groupD8
   * @param {PIXI.GD8Symmetry} ind - sprite rotation angle.
   * @returns {PIXI.GD8Symmetry} The Y-component of the V-axis
   *    after rotating the axes.
   */
  vY: function(n) {
    return vy[n];
  },
  /**
   * @memberof PIXI.groupD8
   * @param {PIXI.GD8Symmetry} rotation - symmetry whose opposite
   *   is needed. Only rotations have opposite symmetries while
   *   reflections don't.
   * @returns {PIXI.GD8Symmetry} The opposite symmetry of `rotation`
   */
  inv: function(n) {
    return n & 8 ? n & 15 : -n & 7;
  },
  /**
   * Composes the two D8 operations.
   *
   * Taking `^` as reflection:
   *
   * |       | E=0 | S=2 | W=4 | N=6 | E^=8 | S^=10 | W^=12 | N^=14 |
   * |-------|-----|-----|-----|-----|------|-------|-------|-------|
   * | E=0   | E   | S   | W   | N   | E^   | S^    | W^    | N^    |
   * | S=2   | S   | W   | N   | E   | S^   | W^    | N^    | E^    |
   * | W=4   | W   | N   | E   | S   | W^   | N^    | E^    | S^    |
   * | N=6   | N   | E   | S   | W   | N^   | E^    | S^    | W^    |
   * | E^=8  | E^  | N^  | W^  | S^  | E    | N     | W     | S     |
   * | S^=10 | S^  | E^  | N^  | W^  | S    | E     | N     | W     |
   * | W^=12 | W^  | S^  | E^  | N^  | W    | S     | E     | N     |
   * | N^=14 | N^  | W^  | S^  | E^  | N    | W     | S     | E     |
   *
   * [This is a Cayley table]{@link https://en.wikipedia.org/wiki/Cayley_table}
   * @memberof PIXI.groupD8
   * @param {PIXI.GD8Symmetry} rotationSecond - Second operation, which
   *   is the row in the above cayley table.
   * @param {PIXI.GD8Symmetry} rotationFirst - First operation, which
   *   is the column in the above cayley table.
   * @returns {PIXI.GD8Symmetry} Composed operation
   */
  add: function(n, e) {
    return rotationCayley[n][e];
  },
  /**
   * Reverse of `add`.
   * @memberof PIXI.groupD8
   * @param {PIXI.GD8Symmetry} rotationSecond - Second operation
   * @param {PIXI.GD8Symmetry} rotationFirst - First operation
   * @returns {PIXI.GD8Symmetry} Result
   */
  sub: function(n, e) {
    return rotationCayley[n][groupD8.inv(e)];
  },
  /**
   * Adds 180 degrees to rotation, which is a commutative
   * operation.
   * @memberof PIXI.groupD8
   * @param {number} rotation - The number to rotate.
   * @returns {number} Rotated number
   */
  rotate180: function(n) {
    return n ^ 4;
  },
  /**
   * Checks if the rotation angle is vertical, i.e. south
   * or north. It doesn't work for reflections.
   * @memberof PIXI.groupD8
   * @param {PIXI.GD8Symmetry} rotation - The number to check.
   * @returns {boolean} Whether or not the direction is vertical
   */
  isVertical: function(n) {
    return (n & 3) === 2;
  },
  /**
   * Approximates the vector `V(dx,dy)` into one of the
   * eight directions provided by `groupD8`.
   * @memberof PIXI.groupD8
   * @param {number} dx - X-component of the vector
   * @param {number} dy - Y-component of the vector
   * @returns {PIXI.GD8Symmetry} Approximation of the vector into
   *  one of the eight symmetries.
   */
  byDirection: function(n, e) {
    return Math.abs(n) * 2 <= Math.abs(e) ? e >= 0 ? groupD8.S : groupD8.N : Math.abs(e) * 2 <= Math.abs(n) ? n > 0 ? groupD8.E : groupD8.W : e > 0 ? n > 0 ? groupD8.SE : groupD8.SW : n > 0 ? groupD8.NE : groupD8.NW;
  },
  /**
   * Helps sprite to compensate texture packer rotation.
   * @memberof PIXI.groupD8
   * @param {PIXI.Matrix} matrix - sprite world matrix
   * @param {PIXI.GD8Symmetry} rotation - The rotation factor to use.
   * @param {number} tx - sprite anchoring
   * @param {number} ty - sprite anchoring
   */
  matrixAppendRotationInv: function(n, e, t, r) {
    t === void 0 && (t = 0), r === void 0 && (r = 0);
    var a = rotationMatrices[groupD8.inv(e)];
    a.tx = t, a.ty = r, n.append(a);
  }
}, Transform = (
  /** @class */
  function() {
    function n() {
      this.worldTransform = new Matrix(), this.localTransform = new Matrix(), this.position = new ObservablePoint(this.onChange, this, 0, 0), this.scale = new ObservablePoint(this.onChange, this, 1, 1), this.pivot = new ObservablePoint(this.onChange, this, 0, 0), this.skew = new ObservablePoint(this.updateSkew, this, 0, 0), this._rotation = 0, this._cx = 1, this._sx = 0, this._cy = 0, this._sy = 1, this._localID = 0, this._currentLocalID = 0, this._worldID = 0, this._parentID = 0;
    }
    return n.prototype.onChange = function() {
      this._localID++;
    }, n.prototype.updateSkew = function() {
      this._cx = Math.cos(this._rotation + this.skew.y), this._sx = Math.sin(this._rotation + this.skew.y), this._cy = -Math.sin(this._rotation - this.skew.x), this._sy = Math.cos(this._rotation - this.skew.x), this._localID++;
    }, n.prototype.toString = function() {
      return "[@pixi/math:Transform " + ("position=(" + this.position.x + ", " + this.position.y + ") ") + ("rotation=" + this.rotation + " ") + ("scale=(" + this.scale.x + ", " + this.scale.y + ") ") + ("skew=(" + this.skew.x + ", " + this.skew.y + ") ") + "]";
    }, n.prototype.updateLocalTransform = function() {
      var e = this.localTransform;
      this._localID !== this._currentLocalID && (e.a = this._cx * this.scale.x, e.b = this._sx * this.scale.x, e.c = this._cy * this.scale.y, e.d = this._sy * this.scale.y, e.tx = this.position.x - (this.pivot.x * e.a + this.pivot.y * e.c), e.ty = this.position.y - (this.pivot.x * e.b + this.pivot.y * e.d), this._currentLocalID = this._localID, this._parentID = -1);
    }, n.prototype.updateTransform = function(e) {
      var t = this.localTransform;
      if (this._localID !== this._currentLocalID && (t.a = this._cx * this.scale.x, t.b = this._sx * this.scale.x, t.c = this._cy * this.scale.y, t.d = this._sy * this.scale.y, t.tx = this.position.x - (this.pivot.x * t.a + this.pivot.y * t.c), t.ty = this.position.y - (this.pivot.x * t.b + this.pivot.y * t.d), this._currentLocalID = this._localID, this._parentID = -1), this._parentID !== e._worldID) {
        var r = e.worldTransform, a = this.worldTransform;
        a.a = t.a * r.a + t.b * r.c, a.b = t.a * r.b + t.b * r.d, a.c = t.c * r.a + t.d * r.c, a.d = t.c * r.b + t.d * r.d, a.tx = t.tx * r.a + t.ty * r.c + r.tx, a.ty = t.tx * r.b + t.ty * r.d + r.ty, this._parentID = e._worldID, this._worldID++;
      }
    }, n.prototype.setFromMatrix = function(e) {
      e.decompose(this), this._localID++;
    }, Object.defineProperty(n.prototype, "rotation", {
      /** The rotation of the object in radians. */
      get: function() {
        return this._rotation;
      },
      set: function(e) {
        this._rotation !== e && (this._rotation = e, this.updateSkew());
      },
      enumerable: !1,
      configurable: !0
    }), n.IDENTITY = new n(), n;
  }()
);
settings.SORTABLE_CHILDREN = !1;
var Bounds = (
  /** @class */
  function() {
    function n() {
      this.minX = 1 / 0, this.minY = 1 / 0, this.maxX = -1 / 0, this.maxY = -1 / 0, this.rect = null, this.updateID = -1;
    }
    return n.prototype.isEmpty = function() {
      return this.minX > this.maxX || this.minY > this.maxY;
    }, n.prototype.clear = function() {
      this.minX = 1 / 0, this.minY = 1 / 0, this.maxX = -1 / 0, this.maxY = -1 / 0;
    }, n.prototype.getRectangle = function(e) {
      return this.minX > this.maxX || this.minY > this.maxY ? Rectangle.EMPTY : (e = e || new Rectangle(0, 0, 1, 1), e.x = this.minX, e.y = this.minY, e.width = this.maxX - this.minX, e.height = this.maxY - this.minY, e);
    }, n.prototype.addPoint = function(e) {
      this.minX = Math.min(this.minX, e.x), this.maxX = Math.max(this.maxX, e.x), this.minY = Math.min(this.minY, e.y), this.maxY = Math.max(this.maxY, e.y);
    }, n.prototype.addPointMatrix = function(e, t) {
      var r = e.a, a = e.b, o = e.c, s = e.d, u = e.tx, h = e.ty, l = r * t.x + o * t.y + u, c = a * t.x + s * t.y + h;
      this.minX = Math.min(this.minX, l), this.maxX = Math.max(this.maxX, l), this.minY = Math.min(this.minY, c), this.maxY = Math.max(this.maxY, c);
    }, n.prototype.addQuad = function(e) {
      var t = this.minX, r = this.minY, a = this.maxX, o = this.maxY, s = e[0], u = e[1];
      t = s < t ? s : t, r = u < r ? u : r, a = s > a ? s : a, o = u > o ? u : o, s = e[2], u = e[3], t = s < t ? s : t, r = u < r ? u : r, a = s > a ? s : a, o = u > o ? u : o, s = e[4], u = e[5], t = s < t ? s : t, r = u < r ? u : r, a = s > a ? s : a, o = u > o ? u : o, s = e[6], u = e[7], t = s < t ? s : t, r = u < r ? u : r, a = s > a ? s : a, o = u > o ? u : o, this.minX = t, this.minY = r, this.maxX = a, this.maxY = o;
    }, n.prototype.addFrame = function(e, t, r, a, o) {
      this.addFrameMatrix(e.worldTransform, t, r, a, o);
    }, n.prototype.addFrameMatrix = function(e, t, r, a, o) {
      var s = e.a, u = e.b, h = e.c, l = e.d, c = e.tx, v = e.ty, d = this.minX, g = this.minY, m = this.maxX, _ = this.maxY, y = s * t + h * r + c, b = u * t + l * r + v;
      d = y < d ? y : d, g = b < g ? b : g, m = y > m ? y : m, _ = b > _ ? b : _, y = s * a + h * r + c, b = u * a + l * r + v, d = y < d ? y : d, g = b < g ? b : g, m = y > m ? y : m, _ = b > _ ? b : _, y = s * t + h * o + c, b = u * t + l * o + v, d = y < d ? y : d, g = b < g ? b : g, m = y > m ? y : m, _ = b > _ ? b : _, y = s * a + h * o + c, b = u * a + l * o + v, d = y < d ? y : d, g = b < g ? b : g, m = y > m ? y : m, _ = b > _ ? b : _, this.minX = d, this.minY = g, this.maxX = m, this.maxY = _;
    }, n.prototype.addVertexData = function(e, t, r) {
      for (var a = this.minX, o = this.minY, s = this.maxX, u = this.maxY, h = t; h < r; h += 2) {
        var l = e[h], c = e[h + 1];
        a = l < a ? l : a, o = c < o ? c : o, s = l > s ? l : s, u = c > u ? c : u;
      }
      this.minX = a, this.minY = o, this.maxX = s, this.maxY = u;
    }, n.prototype.addVertices = function(e, t, r, a) {
      this.addVerticesMatrix(e.worldTransform, t, r, a);
    }, n.prototype.addVerticesMatrix = function(e, t, r, a, o, s) {
      o === void 0 && (o = 0), s === void 0 && (s = o);
      for (var u = e.a, h = e.b, l = e.c, c = e.d, v = e.tx, d = e.ty, g = this.minX, m = this.minY, _ = this.maxX, y = this.maxY, b = r; b < a; b += 2) {
        var S = t[b], O = t[b + 1], D = u * S + l * O + v, E = c * O + h * S + d;
        g = Math.min(g, D - o), _ = Math.max(_, D + o), m = Math.min(m, E - s), y = Math.max(y, E + s);
      }
      this.minX = g, this.minY = m, this.maxX = _, this.maxY = y;
    }, n.prototype.addBounds = function(e) {
      var t = this.minX, r = this.minY, a = this.maxX, o = this.maxY;
      this.minX = e.minX < t ? e.minX : t, this.minY = e.minY < r ? e.minY : r, this.maxX = e.maxX > a ? e.maxX : a, this.maxY = e.maxY > o ? e.maxY : o;
    }, n.prototype.addBoundsMask = function(e, t) {
      var r = e.minX > t.minX ? e.minX : t.minX, a = e.minY > t.minY ? e.minY : t.minY, o = e.maxX < t.maxX ? e.maxX : t.maxX, s = e.maxY < t.maxY ? e.maxY : t.maxY;
      if (r <= o && a <= s) {
        var u = this.minX, h = this.minY, l = this.maxX, c = this.maxY;
        this.minX = r < u ? r : u, this.minY = a < h ? a : h, this.maxX = o > l ? o : l, this.maxY = s > c ? s : c;
      }
    }, n.prototype.addBoundsMatrix = function(e, t) {
      this.addFrameMatrix(t, e.minX, e.minY, e.maxX, e.maxY);
    }, n.prototype.addBoundsArea = function(e, t) {
      var r = e.minX > t.x ? e.minX : t.x, a = e.minY > t.y ? e.minY : t.y, o = e.maxX < t.x + t.width ? e.maxX : t.x + t.width, s = e.maxY < t.y + t.height ? e.maxY : t.y + t.height;
      if (r <= o && a <= s) {
        var u = this.minX, h = this.minY, l = this.maxX, c = this.maxY;
        this.minX = r < u ? r : u, this.minY = a < h ? a : h, this.maxX = o > l ? o : l, this.maxY = s > c ? s : c;
      }
    }, n.prototype.pad = function(e, t) {
      e === void 0 && (e = 0), t === void 0 && (t = e), this.isEmpty() || (this.minX -= e, this.maxX += e, this.minY -= t, this.maxY += t);
    }, n.prototype.addFramePad = function(e, t, r, a, o, s) {
      e -= o, t -= s, r += o, a += s, this.minX = this.minX < e ? this.minX : e, this.maxX = this.maxX > r ? this.maxX : r, this.minY = this.minY < t ? this.minY : t, this.maxY = this.maxY > a ? this.maxY : a;
    }, n;
  }()
);
var extendStatics$j = function(n, e) {
  return extendStatics$j = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, r) {
    t.__proto__ = r;
  } || function(t, r) {
    for (var a in r)
      r.hasOwnProperty(a) && (t[a] = r[a]);
  }, extendStatics$j(n, e);
};
function __extends$j(n, e) {
  extendStatics$j(n, e);
  function t() {
    this.constructor = n;
  }
  n.prototype = e === null ? Object.create(e) : (t.prototype = e.prototype, new t());
}
var DisplayObject = (
  /** @class */
  function(n) {
    __extends$j(e, n);
    function e() {
      var t = n.call(this) || this;
      return t.tempDisplayObjectParent = null, t.transform = new Transform(), t.alpha = 1, t.visible = !0, t.renderable = !0, t.cullable = !1, t.cullArea = null, t.parent = null, t.worldAlpha = 1, t._lastSortedIndex = 0, t._zIndex = 0, t.filterArea = null, t.filters = null, t._enabledFilters = null, t._bounds = new Bounds(), t._localBounds = null, t._boundsID = 0, t._boundsRect = null, t._localBoundsRect = null, t._mask = null, t._maskRefCount = 0, t._destroyed = !1, t.isSprite = !1, t.isMask = !1, t;
    }
    return e.mixin = function(t) {
      for (var r = Object.keys(t), a = 0; a < r.length; ++a) {
        var o = r[a];
        Object.defineProperty(e.prototype, o, Object.getOwnPropertyDescriptor(t, o));
      }
    }, Object.defineProperty(e.prototype, "destroyed", {
      /**
       * Fired when this DisplayObject is added to a Container.
       * @instance
       * @event added
       * @param {PIXI.Container} container - The container added to.
       */
      /**
       * Fired when this DisplayObject is removed from a Container.
       * @instance
       * @event removed
       * @param {PIXI.Container} container - The container removed from.
       */
      /**
       * Fired when this DisplayObject is destroyed. This event is emitted once
       * destroy is finished.
       * @instance
       * @event destroyed
       */
      /** Readonly flag for destroyed display objects. */
      get: function() {
        return this._destroyed;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype._recursivePostUpdateTransform = function() {
      this.parent ? (this.parent._recursivePostUpdateTransform(), this.transform.updateTransform(this.parent.transform)) : this.transform.updateTransform(this._tempDisplayObjectParent.transform);
    }, e.prototype.updateTransform = function() {
      this._boundsID++, this.transform.updateTransform(this.parent.transform), this.worldAlpha = this.alpha * this.parent.worldAlpha;
    }, e.prototype.getBounds = function(t, r) {
      return t || (this.parent ? (this._recursivePostUpdateTransform(), this.updateTransform()) : (this.parent = this._tempDisplayObjectParent, this.updateTransform(), this.parent = null)), this._bounds.updateID !== this._boundsID && (this.calculateBounds(), this._bounds.updateID = this._boundsID), r || (this._boundsRect || (this._boundsRect = new Rectangle()), r = this._boundsRect), this._bounds.getRectangle(r);
    }, e.prototype.getLocalBounds = function(t) {
      t || (this._localBoundsRect || (this._localBoundsRect = new Rectangle()), t = this._localBoundsRect), this._localBounds || (this._localBounds = new Bounds());
      var r = this.transform, a = this.parent;
      this.parent = null, this.transform = this._tempDisplayObjectParent.transform;
      var o = this._bounds, s = this._boundsID;
      this._bounds = this._localBounds;
      var u = this.getBounds(!1, t);
      return this.parent = a, this.transform = r, this._bounds = o, this._bounds.updateID += this._boundsID - s, u;
    }, e.prototype.toGlobal = function(t, r, a) {
      return a === void 0 && (a = !1), a || (this._recursivePostUpdateTransform(), this.parent ? this.displayObjectUpdateTransform() : (this.parent = this._tempDisplayObjectParent, this.displayObjectUpdateTransform(), this.parent = null)), this.worldTransform.apply(t, r);
    }, e.prototype.toLocal = function(t, r, a, o) {
      return r && (t = r.toGlobal(t, a, o)), o || (this._recursivePostUpdateTransform(), this.parent ? this.displayObjectUpdateTransform() : (this.parent = this._tempDisplayObjectParent, this.displayObjectUpdateTransform(), this.parent = null)), this.worldTransform.applyInverse(t, a);
    }, e.prototype.setParent = function(t) {
      if (!t || !t.addChild)
        throw new Error("setParent: Argument must be a Container");
      return t.addChild(this), t;
    }, e.prototype.setTransform = function(t, r, a, o, s, u, h, l, c) {
      return t === void 0 && (t = 0), r === void 0 && (r = 0), a === void 0 && (a = 1), o === void 0 && (o = 1), s === void 0 && (s = 0), u === void 0 && (u = 0), h === void 0 && (h = 0), l === void 0 && (l = 0), c === void 0 && (c = 0), this.position.x = t, this.position.y = r, this.scale.x = a || 1, this.scale.y = o || 1, this.rotation = s, this.skew.x = u, this.skew.y = h, this.pivot.x = l, this.pivot.y = c, this;
    }, e.prototype.destroy = function(t) {
      this.parent && this.parent.removeChild(this), this._destroyed = !0, this.transform = null, this.parent = null, this._bounds = null, this.mask = null, this.cullArea = null, this.filters = null, this.filterArea = null, this.hitArea = null, this.interactive = !1, this.interactiveChildren = !1, this.emit("destroyed"), this.removeAllListeners();
    }, Object.defineProperty(e.prototype, "_tempDisplayObjectParent", {
      /**
       * @protected
       * @member {PIXI.Container}
       */
      get: function() {
        return this.tempDisplayObjectParent === null && (this.tempDisplayObjectParent = new TemporaryDisplayObject()), this.tempDisplayObjectParent;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.enableTempParent = function() {
      var t = this.parent;
      return this.parent = this._tempDisplayObjectParent, t;
    }, e.prototype.disableTempParent = function(t) {
      this.parent = t;
    }, Object.defineProperty(e.prototype, "x", {
      /**
       * The position of the displayObject on the x axis relative to the local coordinates of the parent.
       * An alias to position.x
       */
      get: function() {
        return this.position.x;
      },
      set: function(t) {
        this.transform.position.x = t;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "y", {
      /**
       * The position of the displayObject on the y axis relative to the local coordinates of the parent.
       * An alias to position.y
       */
      get: function() {
        return this.position.y;
      },
      set: function(t) {
        this.transform.position.y = t;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "worldTransform", {
      /**
       * Current transform of the object based on world (parent) factors.
       * @readonly
       */
      get: function() {
        return this.transform.worldTransform;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "localTransform", {
      /**
       * Current transform of the object based on local factors: position, scale, other stuff.
       * @readonly
       */
      get: function() {
        return this.transform.localTransform;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "position", {
      /**
       * The coordinate of the object relative to the local coordinates of the parent.
       * @since 4.0.0
       */
      get: function() {
        return this.transform.position;
      },
      set: function(t) {
        this.transform.position.copyFrom(t);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "scale", {
      /**
       * The scale factors of this object along the local coordinate axes.
       *
       * The default scale is (1, 1).
       * @since 4.0.0
       */
      get: function() {
        return this.transform.scale;
      },
      set: function(t) {
        this.transform.scale.copyFrom(t);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "pivot", {
      /**
       * The center of rotation, scaling, and skewing for this display object in its local space. The `position`
       * is the projection of `pivot` in the parent's local space.
       *
       * By default, the pivot is the origin (0, 0).
       * @since 4.0.0
       */
      get: function() {
        return this.transform.pivot;
      },
      set: function(t) {
        this.transform.pivot.copyFrom(t);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "skew", {
      /**
       * The skew factor for the object in radians.
       * @since 4.0.0
       */
      get: function() {
        return this.transform.skew;
      },
      set: function(t) {
        this.transform.skew.copyFrom(t);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "rotation", {
      /**
       * The rotation of the object in radians.
       * 'rotation' and 'angle' have the same effect on a display object; rotation is in radians, angle is in degrees.
       */
      get: function() {
        return this.transform.rotation;
      },
      set: function(t) {
        this.transform.rotation = t;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "angle", {
      /**
       * The angle of the object in degrees.
       * 'rotation' and 'angle' have the same effect on a display object; rotation is in radians, angle is in degrees.
       */
      get: function() {
        return this.transform.rotation * RAD_TO_DEG;
      },
      set: function(t) {
        this.transform.rotation = t * DEG_TO_RAD;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "zIndex", {
      /**
       * The zIndex of the displayObject.
       *
       * If a container has the sortableChildren property set to true, children will be automatically
       * sorted by zIndex value; a higher value will mean it will be moved towards the end of the array,
       * and thus rendered on top of other display objects within the same container.
       * @see PIXI.Container#sortableChildren
       */
      get: function() {
        return this._zIndex;
      },
      set: function(t) {
        this._zIndex = t, this.parent && (this.parent.sortDirty = !0);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "worldVisible", {
      /**
       * Indicates if the object is globally visible.
       * @readonly
       */
      get: function() {
        var t = this;
        do {
          if (!t.visible)
            return !1;
          t = t.parent;
        } while (t);
        return !0;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "mask", {
      /**
       * Sets a mask for the displayObject. A mask is an object that limits the visibility of an
       * object to the shape of the mask applied to it. In PixiJS a regular mask must be a
       * {@link PIXI.Graphics} or a {@link PIXI.Sprite} object. This allows for much faster masking in canvas as it
       * utilities shape clipping. Furthermore, a mask of an object must be in the subtree of its parent.
       * Otherwise, `getLocalBounds` may calculate incorrect bounds, which makes the container's width and height wrong.
       * To remove a mask, set this property to `null`.
       *
       * For sprite mask both alpha and red channel are used. Black mask is the same as transparent mask.
       * @example
       * const graphics = new PIXI.Graphics();
       * graphics.beginFill(0xFF3300);
       * graphics.drawRect(50, 250, 100, 100);
       * graphics.endFill();
       *
       * const sprite = new PIXI.Sprite(texture);
       * sprite.mask = graphics;
       * @todo At the moment, PIXI.CanvasRenderer doesn't support PIXI.Sprite as mask.
       */
      get: function() {
        return this._mask;
      },
      set: function(t) {
        if (this._mask !== t) {
          if (this._mask) {
            var r = this._mask.isMaskData ? this._mask.maskObject : this._mask;
            r && (r._maskRefCount--, r._maskRefCount === 0 && (r.renderable = !0, r.isMask = !1));
          }
          if (this._mask = t, this._mask) {
            var r = this._mask.isMaskData ? this._mask.maskObject : this._mask;
            r && (r._maskRefCount === 0 && (r.renderable = !1, r.isMask = !0), r._maskRefCount++);
          }
        }
      },
      enumerable: !1,
      configurable: !0
    }), e;
  }(i)
), TemporaryDisplayObject = (
  /** @class */
  function(n) {
    __extends$j(e, n);
    function e() {
      var t = n !== null && n.apply(this, arguments) || this;
      return t.sortDirty = null, t;
    }
    return e;
  }(DisplayObject)
);
DisplayObject.prototype.displayObjectUpdateTransform = DisplayObject.prototype.updateTransform;
function sortChildren(n, e) {
  return n.zIndex === e.zIndex ? n._lastSortedIndex - e._lastSortedIndex : n.zIndex - e.zIndex;
}
var Container = (
  /** @class */
  function(n) {
    __extends$j(e, n);
    function e() {
      var t = n.call(this) || this;
      return t.children = [], t.sortableChildren = settings.SORTABLE_CHILDREN, t.sortDirty = !1, t;
    }
    return e.prototype.onChildrenChange = function(t) {
    }, e.prototype.addChild = function() {
      for (var t = arguments, r = [], a = 0; a < arguments.length; a++)
        r[a] = t[a];
      if (r.length > 1)
        for (var o = 0; o < r.length; o++)
          this.addChild(r[o]);
      else {
        var s = r[0];
        s.parent && s.parent.removeChild(s), s.parent = this, this.sortDirty = !0, s.transform._parentID = -1, this.children.push(s), this._boundsID++, this.onChildrenChange(this.children.length - 1), this.emit("childAdded", s, this, this.children.length - 1), s.emit("added", this);
      }
      return r[0];
    }, e.prototype.addChildAt = function(t, r) {
      if (r < 0 || r > this.children.length)
        throw new Error(t + "addChildAt: The index " + r + " supplied is out of bounds " + this.children.length);
      return t.parent && t.parent.removeChild(t), t.parent = this, this.sortDirty = !0, t.transform._parentID = -1, this.children.splice(r, 0, t), this._boundsID++, this.onChildrenChange(r), t.emit("added", this), this.emit("childAdded", t, this, r), t;
    }, e.prototype.swapChildren = function(t, r) {
      if (t !== r) {
        var a = this.getChildIndex(t), o = this.getChildIndex(r);
        this.children[a] = r, this.children[o] = t, this.onChildrenChange(a < o ? a : o);
      }
    }, e.prototype.getChildIndex = function(t) {
      var r = this.children.indexOf(t);
      if (r === -1)
        throw new Error("The supplied DisplayObject must be a child of the caller");
      return r;
    }, e.prototype.setChildIndex = function(t, r) {
      if (r < 0 || r >= this.children.length)
        throw new Error("The index " + r + " supplied is out of bounds " + this.children.length);
      var a = this.getChildIndex(t);
      removeItems(this.children, a, 1), this.children.splice(r, 0, t), this.onChildrenChange(r);
    }, e.prototype.getChildAt = function(t) {
      if (t < 0 || t >= this.children.length)
        throw new Error("getChildAt: Index (" + t + ") does not exist.");
      return this.children[t];
    }, e.prototype.removeChild = function() {
      for (var t = arguments, r = [], a = 0; a < arguments.length; a++)
        r[a] = t[a];
      if (r.length > 1)
        for (var o = 0; o < r.length; o++)
          this.removeChild(r[o]);
      else {
        var s = r[0], u = this.children.indexOf(s);
        if (u === -1)
          return null;
        s.parent = null, s.transform._parentID = -1, removeItems(this.children, u, 1), this._boundsID++, this.onChildrenChange(u), s.emit("removed", this), this.emit("childRemoved", s, this, u);
      }
      return r[0];
    }, e.prototype.removeChildAt = function(t) {
      var r = this.getChildAt(t);
      return r.parent = null, r.transform._parentID = -1, removeItems(this.children, t, 1), this._boundsID++, this.onChildrenChange(t), r.emit("removed", this), this.emit("childRemoved", r, this, t), r;
    }, e.prototype.removeChildren = function(t, r) {
      t === void 0 && (t = 0), r === void 0 && (r = this.children.length);
      var a = t, o = r, s = o - a, u;
      if (s > 0 && s <= o) {
        u = this.children.splice(a, s);
        for (var h = 0; h < u.length; ++h)
          u[h].parent = null, u[h].transform && (u[h].transform._parentID = -1);
        this._boundsID++, this.onChildrenChange(t);
        for (var h = 0; h < u.length; ++h)
          u[h].emit("removed", this), this.emit("childRemoved", u[h], this, h);
        return u;
      } else if (s === 0 && this.children.length === 0)
        return [];
      throw new RangeError("removeChildren: numeric values are outside the acceptable range.");
    }, e.prototype.sortChildren = function() {
      for (var t = !1, r = 0, a = this.children.length; r < a; ++r) {
        var o = this.children[r];
        o._lastSortedIndex = r, !t && o.zIndex !== 0 && (t = !0);
      }
      t && this.children.length > 1 && this.children.sort(sortChildren), this.sortDirty = !1;
    }, e.prototype.updateTransform = function() {
      this.sortableChildren && this.sortDirty && this.sortChildren(), this._boundsID++, this.transform.updateTransform(this.parent.transform), this.worldAlpha = this.alpha * this.parent.worldAlpha;
      for (var t = 0, r = this.children.length; t < r; ++t) {
        var a = this.children[t];
        a.visible && a.updateTransform();
      }
    }, e.prototype.calculateBounds = function() {
      this._bounds.clear(), this._calculateBounds();
      for (var t = 0; t < this.children.length; t++) {
        var r = this.children[t];
        if (!(!r.visible || !r.renderable))
          if (r.calculateBounds(), r._mask) {
            var a = r._mask.isMaskData ? r._mask.maskObject : r._mask;
            a ? (a.calculateBounds(), this._bounds.addBoundsMask(r._bounds, a._bounds)) : this._bounds.addBounds(r._bounds);
          } else r.filterArea ? this._bounds.addBoundsArea(r._bounds, r.filterArea) : this._bounds.addBounds(r._bounds);
      }
      this._bounds.updateID = this._boundsID;
    }, e.prototype.getLocalBounds = function(t, r) {
      r === void 0 && (r = !1);
      var a = n.prototype.getLocalBounds.call(this, t);
      if (!r)
        for (var o = 0, s = this.children.length; o < s; ++o) {
          var u = this.children[o];
          u.visible && u.updateTransform();
        }
      return a;
    }, e.prototype._calculateBounds = function() {
    }, e.prototype._renderWithCulling = function(t) {
      var r = t.renderTexture.sourceFrame;
      if (r.width > 0 && r.height > 0) {
        var a, o;
        if (this.cullArea ? (a = this.cullArea, o = this.worldTransform) : this._render !== e.prototype._render && (a = this.getBounds(!0)), a && r.intersects(a, o))
          this._render(t);
        else if (this.cullArea)
          return;
        for (var s = 0, u = this.children.length; s < u; ++s) {
          var h = this.children[s], l = h.cullable;
          h.cullable = l || !this.cullArea, h.render(t), h.cullable = l;
        }
      }
    }, e.prototype.render = function(t) {
      if (!(!this.visible || this.worldAlpha <= 0 || !this.renderable))
        if (this._mask || this.filters && this.filters.length)
          this.renderAdvanced(t);
        else if (this.cullable)
          this._renderWithCulling(t);
        else {
          this._render(t);
          for (var r = 0, a = this.children.length; r < a; ++r)
            this.children[r].render(t);
        }
    }, e.prototype.renderAdvanced = function(t) {
      var r = this.filters, a = this._mask;
      if (r) {
        this._enabledFilters || (this._enabledFilters = []), this._enabledFilters.length = 0;
        for (var o = 0; o < r.length; o++)
          r[o].enabled && this._enabledFilters.push(r[o]);
      }
      var s = r && this._enabledFilters && this._enabledFilters.length || a && (!a.isMaskData || a.enabled && (a.autoDetect || a.type !== MASK_TYPES.NONE));
      if (s && t.batch.flush(), r && this._enabledFilters && this._enabledFilters.length && t.filter.push(this, this._enabledFilters), a && t.mask.push(this, this._mask), this.cullable)
        this._renderWithCulling(t);
      else {
        this._render(t);
        for (var o = 0, u = this.children.length; o < u; ++o)
          this.children[o].render(t);
      }
      s && t.batch.flush(), a && t.mask.pop(this), r && this._enabledFilters && this._enabledFilters.length && t.filter.pop();
    }, e.prototype._render = function(t) {
    }, e.prototype.destroy = function(t) {
      n.prototype.destroy.call(this), this.sortDirty = !1;
      var r = typeof t == "boolean" ? t : t && t.children, a = this.removeChildren(0, this.children.length);
      if (r)
        for (var o = 0; o < a.length; ++o)
          a[o].destroy(t);
    }, Object.defineProperty(e.prototype, "width", {
      /** The width of the Container, setting this will actually modify the scale to achieve the value set. */
      get: function() {
        return this.scale.x * this.getLocalBounds().width;
      },
      set: function(t) {
        var r = this.getLocalBounds().width;
        r !== 0 ? this.scale.x = t / r : this.scale.x = 1, this._width = t;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "height", {
      /** The height of the Container, setting this will actually modify the scale to achieve the value set. */
      get: function() {
        return this.scale.y * this.getLocalBounds().height;
      },
      set: function(t) {
        var r = this.getLocalBounds().height;
        r !== 0 ? this.scale.y = t / r : this.scale.y = 1, this._height = t;
      },
      enumerable: !1,
      configurable: !0
    }), e;
  }(DisplayObject)
);
Container.prototype.containerUpdateTransform = Container.prototype.updateTransform;
var __assign$1 = function() {
  return __assign$1 = Object.assign || function(e) {
    for (var t = arguments, r, a = 1, o = arguments.length; a < o; a++) {
      r = t[a];
      for (var s in r)
        Object.prototype.hasOwnProperty.call(r, s) && (e[s] = r[s]);
    }
    return e;
  }, __assign$1.apply(this, arguments);
}, ExtensionType;
(function(n) {
  n.Application = "application", n.RendererPlugin = "renderer-webgl-plugin", n.CanvasRendererPlugin = "renderer-canvas-plugin", n.Loader = "loader", n.LoadParser = "load-parser", n.ResolveParser = "resolve-parser", n.CacheParser = "cache-parser", n.DetectionParser = "detection-parser";
})(ExtensionType || (ExtensionType = {}));
var normalizeExtension = function(n) {
  if (typeof n == "function" || typeof n == "object" && n.extension) {
    if (!n.extension)
      throw new Error("Extension class must have an extension object");
    var e = typeof n.extension != "object" ? { type: n.extension } : n.extension;
    n = __assign$1(__assign$1({}, e), { ref: n });
  }
  if (typeof n == "object")
    n = __assign$1({}, n);
  else
    throw new Error("Invalid extension type");
  return typeof n.type == "string" && (n.type = [n.type]), n;
}, extensions = {
  /** @ignore */
  _addHandlers: null,
  /** @ignore */
  _removeHandlers: null,
  /** @ignore */
  _queue: {},
  /**
   * Remove extensions from PixiJS.
   * @param extensions - Extensions to be removed.
   * @returns {PIXI.extensions} For chaining.
   */
  remove: function() {
    for (var n = arguments, e = this, t = [], r = 0; r < arguments.length; r++)
      t[r] = n[r];
    return t.map(normalizeExtension).forEach(function(a) {
      a.type.forEach(function(o) {
        var s, u;
        return (u = (s = e._removeHandlers)[o]) === null || u === void 0 ? void 0 : u.call(s, a);
      });
    }), this;
  },
  /**
   * Register new extensions with PixiJS.
   * @param extensions - The spread of extensions to add to PixiJS.
   * @returns {PIXI.extensions} For chaining.
   */
  add: function() {
    for (var n = arguments, e = this, t = [], r = 0; r < arguments.length; r++)
      t[r] = n[r];
    return t.map(normalizeExtension).forEach(function(a) {
      a.type.forEach(function(o) {
        var s = e._addHandlers, u = e._queue;
        s[o] ? s[o](a) : (u[o] = u[o] || [], u[o].push(a));
      });
    }), this;
  },
  /**
   * Internal method to handle extensions by name.
   * @param type - The extension type.
   * @param onAdd  - Function for handling when extensions are added/registered passes {@link PIXI.ExtensionFormat}.
   * @param onRemove  - Function for handling when extensions are removed/unregistered passes {@link PIXI.ExtensionFormat}.
   * @returns {PIXI.extensions} For chaining.
   */
  handle: function(n, e, t) {
    var r = this._addHandlers = this._addHandlers || {}, a = this._removeHandlers = this._removeHandlers || {};
    if (r[n] || a[n])
      throw new Error("Extension type " + n + " already has a handler");
    r[n] = e, a[n] = t;
    var o = this._queue;
    return o[n] && (o[n].forEach(function(s) {
      return e(s);
    }), delete o[n]), this;
  },
  /**
   * Handle a type, but using a map by `name` property.
   * @param type - Type of extension to handle.
   * @param map - The object map of named extensions.
   * @returns {PIXI.extensions} For chaining.
   */
  handleByMap: function(n, e) {
    return this.handle(n, function(t) {
      e[t.name] = t.ref;
    }, function(t) {
      delete e[t.name];
    });
  },
  /**
   * Handle a type, but using a list of extensions.
   * @param type - Type of extension to handle.
   * @param list - The list of extensions.
   * @returns {PIXI.extensions} For chaining.
   */
  handleByList: function(n, e) {
    return this.handle(n, function(t) {
      var r, a;
      e.includes(t.ref) || (e.push(t.ref), n === ExtensionType.Loader && ((a = (r = t.ref).add) === null || a === void 0 || a.call(r)));
    }, function(t) {
      var r = e.indexOf(t.ref);
      r !== -1 && e.splice(r, 1);
    });
  }
};
var Runner = (
  /** @class */
  function() {
    function n(e) {
      this.items = [], this._name = e, this._aliasCount = 0;
    }
    return n.prototype.emit = function(e, t, r, a, o, s, u, h) {
      if (arguments.length > 8)
        throw new Error("max arguments reached");
      var l = this, c = l.name, v = l.items;
      this._aliasCount++;
      for (var d = 0, g = v.length; d < g; d++)
        v[d][c](e, t, r, a, o, s, u, h);
      return v === this.items && this._aliasCount--, this;
    }, n.prototype.ensureNonAliasedItems = function() {
      this._aliasCount > 0 && this.items.length > 1 && (this._aliasCount = 0, this.items = this.items.slice(0));
    }, n.prototype.add = function(e) {
      return e[this._name] && (this.ensureNonAliasedItems(), this.remove(e), this.items.push(e)), this;
    }, n.prototype.remove = function(e) {
      var t = this.items.indexOf(e);
      return t !== -1 && (this.ensureNonAliasedItems(), this.items.splice(t, 1)), this;
    }, n.prototype.contains = function(e) {
      return this.items.indexOf(e) !== -1;
    }, n.prototype.removeAll = function() {
      return this.ensureNonAliasedItems(), this.items.length = 0, this;
    }, n.prototype.destroy = function() {
      this.removeAll(), this.items = null, this._name = null;
    }, Object.defineProperty(n.prototype, "empty", {
      /**
       * `true` if there are no this Runner contains no listeners
       * @readonly
       */
      get: function() {
        return this.items.length === 0;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n.prototype, "name", {
      /**
       * The name of the runner.
       * @readonly
       */
      get: function() {
        return this._name;
      },
      enumerable: !1,
      configurable: !0
    }), n;
  }()
);
Object.defineProperties(Runner.prototype, {
  /**
   * Alias for `emit`
   * @memberof PIXI.Runner#
   * @method dispatch
   * @see PIXI.Runner#emit
   */
  dispatch: { value: Runner.prototype.emit },
  /**
   * Alias for `emit`
   * @memberof PIXI.Runner#
   * @method run
   * @see PIXI.Runner#emit
   */
  run: { value: Runner.prototype.emit }
});
settings.TARGET_FPMS = 0.06;
var UPDATE_PRIORITY;
(function(n) {
  n[n.INTERACTION = 50] = "INTERACTION", n[n.HIGH = 25] = "HIGH", n[n.NORMAL = 0] = "NORMAL", n[n.LOW = -25] = "LOW", n[n.UTILITY = -50] = "UTILITY";
})(UPDATE_PRIORITY || (UPDATE_PRIORITY = {}));
var TickerListener = (
  /** @class */
  function() {
    function n(e, t, r, a) {
      t === void 0 && (t = null), r === void 0 && (r = 0), a === void 0 && (a = !1), this.next = null, this.previous = null, this._destroyed = !1, this.fn = e, this.context = t, this.priority = r, this.once = a;
    }
    return n.prototype.match = function(e, t) {
      return t === void 0 && (t = null), this.fn === e && this.context === t;
    }, n.prototype.emit = function(e) {
      this.fn && (this.context ? this.fn.call(this.context, e) : this.fn(e));
      var t = this.next;
      return this.once && this.destroy(!0), this._destroyed && (this.next = null), t;
    }, n.prototype.connect = function(e) {
      this.previous = e, e.next && (e.next.previous = this), this.next = e.next, e.next = this;
    }, n.prototype.destroy = function(e) {
      e === void 0 && (e = !1), this._destroyed = !0, this.fn = null, this.context = null, this.previous && (this.previous.next = this.next), this.next && (this.next.previous = this.previous);
      var t = this.next;
      return this.next = e ? null : t, this.previous = null, t;
    }, n;
  }()
), Ticker = (
  /** @class */
  function() {
    function n() {
      var e = this;
      this.autoStart = !1, this.deltaTime = 1, this.lastTime = -1, this.speed = 1, this.started = !1, this._requestId = null, this._maxElapsedMS = 100, this._minElapsedMS = 0, this._protected = !1, this._lastFrame = -1, this._head = new TickerListener(null, null, 1 / 0), this.deltaMS = 1 / settings.TARGET_FPMS, this.elapsedMS = 1 / settings.TARGET_FPMS, this._tick = function(t) {
        e._requestId = null, e.started && (e.update(t), e.started && e._requestId === null && e._head.next && (e._requestId = requestAnimationFrame(e._tick)));
      };
    }
    return n.prototype._requestIfNeeded = function() {
      this._requestId === null && this._head.next && (this.lastTime = performance.now(), this._lastFrame = this.lastTime, this._requestId = requestAnimationFrame(this._tick));
    }, n.prototype._cancelIfNeeded = function() {
      this._requestId !== null && (cancelAnimationFrame(this._requestId), this._requestId = null);
    }, n.prototype._startIfPossible = function() {
      this.started ? this._requestIfNeeded() : this.autoStart && this.start();
    }, n.prototype.add = function(e, t, r) {
      return r === void 0 && (r = UPDATE_PRIORITY.NORMAL), this._addListener(new TickerListener(e, t, r));
    }, n.prototype.addOnce = function(e, t, r) {
      return r === void 0 && (r = UPDATE_PRIORITY.NORMAL), this._addListener(new TickerListener(e, t, r, !0));
    }, n.prototype._addListener = function(e) {
      var t = this._head.next, r = this._head;
      if (!t)
        e.connect(r);
      else {
        for (; t; ) {
          if (e.priority > t.priority) {
            e.connect(r);
            break;
          }
          r = t, t = t.next;
        }
        e.previous || e.connect(r);
      }
      return this._startIfPossible(), this;
    }, n.prototype.remove = function(e, t) {
      for (var r = this._head.next; r; )
        r.match(e, t) ? r = r.destroy() : r = r.next;
      return this._head.next || this._cancelIfNeeded(), this;
    }, Object.defineProperty(n.prototype, "count", {
      /**
       * The number of listeners on this ticker, calculated by walking through linked list
       * @readonly
       * @member {number}
       */
      get: function() {
        if (!this._head)
          return 0;
        for (var e = 0, t = this._head; t = t.next; )
          e++;
        return e;
      },
      enumerable: !1,
      configurable: !0
    }), n.prototype.start = function() {
      this.started || (this.started = !0, this._requestIfNeeded());
    }, n.prototype.stop = function() {
      this.started && (this.started = !1, this._cancelIfNeeded());
    }, n.prototype.destroy = function() {
      if (!this._protected) {
        this.stop();
        for (var e = this._head.next; e; )
          e = e.destroy(!0);
        this._head.destroy(), this._head = null;
      }
    }, n.prototype.update = function(e) {
      e === void 0 && (e = performance.now());
      var t;
      if (e > this.lastTime) {
        if (t = this.elapsedMS = e - this.lastTime, t > this._maxElapsedMS && (t = this._maxElapsedMS), t *= this.speed, this._minElapsedMS) {
          var r = e - this._lastFrame | 0;
          if (r < this._minElapsedMS)
            return;
          this._lastFrame = e - r % this._minElapsedMS;
        }
        this.deltaMS = t, this.deltaTime = this.deltaMS * settings.TARGET_FPMS;
        for (var a = this._head, o = a.next; o; )
          o = o.emit(this.deltaTime);
        a.next || this._cancelIfNeeded();
      } else
        this.deltaTime = this.deltaMS = this.elapsedMS = 0;
      this.lastTime = e;
    }, Object.defineProperty(n.prototype, "FPS", {
      /**
       * The frames per second at which this ticker is running.
       * The default is approximately 60 in most modern browsers.
       * **Note:** This does not factor in the value of
       * {@link PIXI.Ticker#speed}, which is specific
       * to scaling {@link PIXI.Ticker#deltaTime}.
       * @member {number}
       * @readonly
       */
      get: function() {
        return 1e3 / this.elapsedMS;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n.prototype, "minFPS", {
      /**
       * Manages the maximum amount of milliseconds allowed to
       * elapse between invoking {@link PIXI.Ticker#update}.
       * This value is used to cap {@link PIXI.Ticker#deltaTime},
       * but does not effect the measured value of {@link PIXI.Ticker#FPS}.
       * When setting this property it is clamped to a value between
       * `0` and `PIXI.settings.TARGET_FPMS * 1000`.
       * @member {number}
       * @default 10
       */
      get: function() {
        return 1e3 / this._maxElapsedMS;
      },
      set: function(e) {
        var t = Math.min(this.maxFPS, e), r = Math.min(Math.max(0, t) / 1e3, settings.TARGET_FPMS);
        this._maxElapsedMS = 1 / r;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n.prototype, "maxFPS", {
      /**
       * Manages the minimum amount of milliseconds required to
       * elapse between invoking {@link PIXI.Ticker#update}.
       * This will effect the measured value of {@link PIXI.Ticker#FPS}.
       * If it is set to `0`, then there is no limit; PixiJS will render as many frames as it can.
       * Otherwise it will be at least `minFPS`
       * @member {number}
       * @default 0
       */
      get: function() {
        return this._minElapsedMS ? Math.round(1e3 / this._minElapsedMS) : 0;
      },
      set: function(e) {
        if (e === 0)
          this._minElapsedMS = 0;
        else {
          var t = Math.max(this.minFPS, e);
          this._minElapsedMS = 1 / (t / 1e3);
        }
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n, "shared", {
      /**
       * The shared ticker instance used by {@link PIXI.AnimatedSprite} and by
       * {@link PIXI.VideoResource} to update animation frames / video textures.
       *
       * It may also be used by {@link PIXI.Application} if created with the `sharedTicker` option property set to true.
       *
       * The property {@link PIXI.Ticker#autoStart} is set to `true` for this instance.
       * Please follow the examples for usage, including how to opt-out of auto-starting the shared ticker.
       * @example
       * let ticker = PIXI.Ticker.shared;
       * // Set this to prevent starting this ticker when listeners are added.
       * // By default this is true only for the PIXI.Ticker.shared instance.
       * ticker.autoStart = false;
       * // FYI, call this to ensure the ticker is stopped. It should be stopped
       * // if you have not attempted to render anything yet.
       * ticker.stop();
       * // Call this when you are ready for a running shared ticker.
       * ticker.start();
       * @example
       * // You may use the shared ticker to render...
       * let renderer = PIXI.autoDetectRenderer();
       * let stage = new PIXI.Container();
       * document.body.appendChild(renderer.view);
       * ticker.add(function (time) {
       *     renderer.render(stage);
       * });
       * @example
       * // Or you can just update it manually.
       * ticker.autoStart = false;
       * ticker.stop();
       * function animate(time) {
       *     ticker.update(time);
       *     renderer.render(stage);
       *     requestAnimationFrame(animate);
       * }
       * animate(performance.now());
       * @member {PIXI.Ticker}
       * @static
       */
      get: function() {
        if (!n._shared) {
          var e = n._shared = new n();
          e.autoStart = !0, e._protected = !0;
        }
        return n._shared;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n, "system", {
      /**
       * The system ticker instance used by {@link PIXI.InteractionManager} and by
       * {@link PIXI.BasePrepare} for core timing functionality that shouldn't usually need to be paused,
       * unlike the `shared` ticker which drives visual animations and rendering which may want to be paused.
       *
       * The property {@link PIXI.Ticker#autoStart} is set to `true` for this instance.
       * @member {PIXI.Ticker}
       * @static
       */
      get: function() {
        if (!n._system) {
          var e = n._system = new n();
          e.autoStart = !0, e._protected = !0;
        }
        return n._system;
      },
      enumerable: !1,
      configurable: !0
    }), n;
  }()
), TickerPlugin = (
  /** @class */
  function() {
    function n() {
    }
    return n.init = function(e) {
      var t = this;
      e = Object.assign({
        autoStart: !0,
        sharedTicker: !1
      }, e), Object.defineProperty(this, "ticker", {
        set: function(r) {
          this._ticker && this._ticker.remove(this.render, this), this._ticker = r, r && r.add(this.render, this, UPDATE_PRIORITY.LOW);
        },
        get: function() {
          return this._ticker;
        }
      }), this.stop = function() {
        t._ticker.stop();
      }, this.start = function() {
        t._ticker.start();
      }, this._ticker = null, this.ticker = e.sharedTicker ? Ticker.shared : new Ticker(), e.autoStart && this.start();
    }, n.destroy = function() {
      if (this._ticker) {
        var e = this._ticker;
        this.ticker = null, e.destroy();
      }
    }, n.extension = ExtensionType.Application, n;
  }()
);
settings.PREFER_ENV = isMobile.any ? ENV.WEBGL : ENV.WEBGL2;
settings.STRICT_TEXTURE_CACHE = !1;
var INSTALLED = [];
function autoDetectResource(n, e) {
  if (!n)
    return null;
  var t = "";
  if (typeof n == "string") {
    var r = /\.(\w{3,4})(?:$|\?|#)/i.exec(n);
    r && (t = r[1].toLowerCase());
  }
  for (var a = INSTALLED.length - 1; a >= 0; --a) {
    var o = INSTALLED[a];
    if (o.test && o.test(n, t))
      return new o(n, e);
  }
  throw new Error("Unrecognized source type to auto-detect Resource");
}
var extendStatics$i = function(n, e) {
  return extendStatics$i = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, r) {
    t.__proto__ = r;
  } || function(t, r) {
    for (var a in r)
      r.hasOwnProperty(a) && (t[a] = r[a]);
  }, extendStatics$i(n, e);
};
function __extends$i(n, e) {
  extendStatics$i(n, e);
  function t() {
    this.constructor = n;
  }
  n.prototype = e === null ? Object.create(e) : (t.prototype = e.prototype, new t());
}
var __assign = function() {
  return __assign = Object.assign || function(e) {
    for (var t = arguments, r, a = 1, o = arguments.length; a < o; a++) {
      r = t[a];
      for (var s in r)
        Object.prototype.hasOwnProperty.call(r, s) && (e[s] = r[s]);
    }
    return e;
  }, __assign.apply(this, arguments);
};
function __rest(n, e) {
  var t = {};
  for (var r in n)
    Object.prototype.hasOwnProperty.call(n, r) && e.indexOf(r) < 0 && (t[r] = n[r]);
  if (n != null && typeof Object.getOwnPropertySymbols == "function")
    for (var a = 0, r = Object.getOwnPropertySymbols(n); a < r.length; a++)
      e.indexOf(r[a]) < 0 && Object.prototype.propertyIsEnumerable.call(n, r[a]) && (t[r[a]] = n[r[a]]);
  return t;
}
var Resource = (
  /** @class */
  function() {
    function n(e, t) {
      e === void 0 && (e = 0), t === void 0 && (t = 0), this._width = e, this._height = t, this.destroyed = !1, this.internal = !1, this.onResize = new Runner("setRealSize"), this.onUpdate = new Runner("update"), this.onError = new Runner("onError");
    }
    return n.prototype.bind = function(e) {
      this.onResize.add(e), this.onUpdate.add(e), this.onError.add(e), (this._width || this._height) && this.onResize.emit(this._width, this._height);
    }, n.prototype.unbind = function(e) {
      this.onResize.remove(e), this.onUpdate.remove(e), this.onError.remove(e);
    }, n.prototype.resize = function(e, t) {
      (e !== this._width || t !== this._height) && (this._width = e, this._height = t, this.onResize.emit(e, t));
    }, Object.defineProperty(n.prototype, "valid", {
      /**
       * Has been validated
       * @readonly
       */
      get: function() {
        return !!this._width && !!this._height;
      },
      enumerable: !1,
      configurable: !0
    }), n.prototype.update = function() {
      this.destroyed || this.onUpdate.emit();
    }, n.prototype.load = function() {
      return Promise.resolve(this);
    }, Object.defineProperty(n.prototype, "width", {
      /**
       * The width of the resource.
       * @readonly
       */
      get: function() {
        return this._width;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n.prototype, "height", {
      /**
       * The height of the resource.
       * @readonly
       */
      get: function() {
        return this._height;
      },
      enumerable: !1,
      configurable: !0
    }), n.prototype.style = function(e, t, r) {
      return !1;
    }, n.prototype.dispose = function() {
    }, n.prototype.destroy = function() {
      this.destroyed || (this.destroyed = !0, this.dispose(), this.onError.removeAll(), this.onError = null, this.onResize.removeAll(), this.onResize = null, this.onUpdate.removeAll(), this.onUpdate = null);
    }, n.test = function(e, t) {
      return !1;
    }, n;
  }()
), BufferResource = (
  /** @class */
  function(n) {
    __extends$i(e, n);
    function e(t, r) {
      var a = this, o = r || {}, s = o.width, u = o.height;
      if (!s || !u)
        throw new Error("BufferResource width or height invalid");
      return a = n.call(this, s, u) || this, a.data = t, a;
    }
    return e.prototype.upload = function(t, r, a) {
      var o = t.gl;
      o.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL, r.alphaMode === ALPHA_MODES.UNPACK);
      var s = r.realWidth, u = r.realHeight;
      return a.width === s && a.height === u ? o.texSubImage2D(r.target, 0, 0, 0, s, u, r.format, a.type, this.data) : (a.width = s, a.height = u, o.texImage2D(r.target, 0, a.internalFormat, s, u, 0, r.format, a.type, this.data)), !0;
    }, e.prototype.dispose = function() {
      this.data = null;
    }, e.test = function(t) {
      return t instanceof Float32Array || t instanceof Uint8Array || t instanceof Uint32Array;
    }, e;
  }(Resource)
), defaultBufferOptions = {
  scaleMode: SCALE_MODES.NEAREST,
  format: FORMATS.RGBA,
  alphaMode: ALPHA_MODES.NPM
}, BaseTexture = (
  /** @class */
  function(n) {
    __extends$i(e, n);
    function e(t, r) {
      t === void 0 && (t = null), r === void 0 && (r = null);
      var a = n.call(this) || this;
      r = r || {};
      var o = r.alphaMode, s = r.mipmap, u = r.anisotropicLevel, h = r.scaleMode, l = r.width, c = r.height, v = r.wrapMode, d = r.format, g = r.type, m = r.target, _ = r.resolution, y = r.resourceOptions;
      return t && !(t instanceof Resource) && (t = autoDetectResource(t, y), t.internal = !0), a.resolution = _ || settings.RESOLUTION, a.width = Math.round((l || 0) * a.resolution) / a.resolution, a.height = Math.round((c || 0) * a.resolution) / a.resolution, a._mipmap = s !== void 0 ? s : settings.MIPMAP_TEXTURES, a.anisotropicLevel = u !== void 0 ? u : settings.ANISOTROPIC_LEVEL, a._wrapMode = v || settings.WRAP_MODE, a._scaleMode = h !== void 0 ? h : settings.SCALE_MODE, a.format = d || FORMATS.RGBA, a.type = g || TYPES.UNSIGNED_BYTE, a.target = m || TARGETS.TEXTURE_2D, a.alphaMode = o !== void 0 ? o : ALPHA_MODES.UNPACK, a.uid = uid(), a.touched = 0, a.isPowerOfTwo = !1, a._refreshPOT(), a._glTextures = {}, a.dirtyId = 0, a.dirtyStyleId = 0, a.cacheId = null, a.valid = l > 0 && c > 0, a.textureCacheIds = [], a.destroyed = !1, a.resource = null, a._batchEnabled = 0, a._batchLocation = 0, a.parentTextureArray = null, a.setResource(t), a;
    }
    return Object.defineProperty(e.prototype, "realWidth", {
      /**
       * Pixel width of the source of this texture
       * @readonly
       */
      get: function() {
        return Math.round(this.width * this.resolution);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "realHeight", {
      /**
       * Pixel height of the source of this texture
       * @readonly
       */
      get: function() {
        return Math.round(this.height * this.resolution);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "mipmap", {
      /**
       * Mipmap mode of the texture, affects downscaled images
       * @default PIXI.settings.MIPMAP_TEXTURES
       */
      get: function() {
        return this._mipmap;
      },
      set: function(t) {
        this._mipmap !== t && (this._mipmap = t, this.dirtyStyleId++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "scaleMode", {
      /**
       * The scale mode to apply when scaling this texture
       * @default PIXI.settings.SCALE_MODE
       */
      get: function() {
        return this._scaleMode;
      },
      set: function(t) {
        this._scaleMode !== t && (this._scaleMode = t, this.dirtyStyleId++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "wrapMode", {
      /**
       * How the texture wraps
       * @default PIXI.settings.WRAP_MODE
       */
      get: function() {
        return this._wrapMode;
      },
      set: function(t) {
        this._wrapMode !== t && (this._wrapMode = t, this.dirtyStyleId++);
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.setStyle = function(t, r) {
      var a;
      return t !== void 0 && t !== this.scaleMode && (this.scaleMode = t, a = !0), r !== void 0 && r !== this.mipmap && (this.mipmap = r, a = !0), a && this.dirtyStyleId++, this;
    }, e.prototype.setSize = function(t, r, a) {
      return a = a || this.resolution, this.setRealSize(t * a, r * a, a);
    }, e.prototype.setRealSize = function(t, r, a) {
      return this.resolution = a || this.resolution, this.width = Math.round(t) / this.resolution, this.height = Math.round(r) / this.resolution, this._refreshPOT(), this.update(), this;
    }, e.prototype._refreshPOT = function() {
      this.isPowerOfTwo = isPow2(this.realWidth) && isPow2(this.realHeight);
    }, e.prototype.setResolution = function(t) {
      var r = this.resolution;
      return r === t ? this : (this.resolution = t, this.valid && (this.width = Math.round(this.width * r) / t, this.height = Math.round(this.height * r) / t, this.emit("update", this)), this._refreshPOT(), this);
    }, e.prototype.setResource = function(t) {
      if (this.resource === t)
        return this;
      if (this.resource)
        throw new Error("Resource can be set only once");
      return t.bind(this), this.resource = t, this;
    }, e.prototype.update = function() {
      this.valid ? (this.dirtyId++, this.dirtyStyleId++, this.emit("update", this)) : this.width > 0 && this.height > 0 && (this.valid = !0, this.emit("loaded", this), this.emit("update", this));
    }, e.prototype.onError = function(t) {
      this.emit("error", this, t);
    }, e.prototype.destroy = function() {
      this.resource && (this.resource.unbind(this), this.resource.internal && this.resource.destroy(), this.resource = null), this.cacheId && (delete BaseTextureCache[this.cacheId], delete TextureCache[this.cacheId], this.cacheId = null), this.dispose(), e.removeFromCache(this), this.textureCacheIds = null, this.destroyed = !0;
    }, e.prototype.dispose = function() {
      this.emit("dispose", this);
    }, e.prototype.castToBaseTexture = function() {
      return this;
    }, e.from = function(t, r, a) {
      a === void 0 && (a = settings.STRICT_TEXTURE_CACHE);
      var o = typeof t == "string", s = null;
      if (o)
        s = t;
      else {
        if (!t._pixiId) {
          var u = r && r.pixiIdPrefix || "pixiid";
          t._pixiId = u + "_" + uid();
        }
        s = t._pixiId;
      }
      var h = BaseTextureCache[s];
      if (o && a && !h)
        throw new Error('The cacheId "' + s + '" does not exist in BaseTextureCache.');
      return h || (h = new e(t, r), h.cacheId = s, e.addToCache(h, s)), h;
    }, e.fromBuffer = function(t, r, a, o) {
      t = t || new Float32Array(r * a * 4);
      var s = new BufferResource(t, { width: r, height: a }), u = t instanceof Float32Array ? TYPES.FLOAT : TYPES.UNSIGNED_BYTE;
      return new e(s, Object.assign({}, defaultBufferOptions, o || { width: r, height: a, type: u }));
    }, e.addToCache = function(t, r) {
      r && (t.textureCacheIds.indexOf(r) === -1 && t.textureCacheIds.push(r), BaseTextureCache[r] && console.warn("BaseTexture added to the cache with an id [" + r + "] that already had an entry"), BaseTextureCache[r] = t);
    }, e.removeFromCache = function(t) {
      if (typeof t == "string") {
        var r = BaseTextureCache[t];
        if (r) {
          var a = r.textureCacheIds.indexOf(t);
          return a > -1 && r.textureCacheIds.splice(a, 1), delete BaseTextureCache[t], r;
        }
      } else if (t && t.textureCacheIds) {
        for (var o = 0; o < t.textureCacheIds.length; ++o)
          delete BaseTextureCache[t.textureCacheIds[o]];
        return t.textureCacheIds.length = 0, t;
      }
      return null;
    }, e._globalBatch = 0, e;
  }(i)
), AbstractMultiResource = (
  /** @class */
  function(n) {
    __extends$i(e, n);
    function e(t, r) {
      var a = this, o = r || {}, s = o.width, u = o.height;
      a = n.call(this, s, u) || this, a.items = [], a.itemDirtyIds = [];
      for (var h = 0; h < t; h++) {
        var l = new BaseTexture();
        a.items.push(l), a.itemDirtyIds.push(-2);
      }
      return a.length = t, a._load = null, a.baseTexture = null, a;
    }
    return e.prototype.initFromArray = function(t, r) {
      for (var a = 0; a < this.length; a++)
        t[a] && (t[a].castToBaseTexture ? this.addBaseTextureAt(t[a].castToBaseTexture(), a) : t[a] instanceof Resource ? this.addResourceAt(t[a], a) : this.addResourceAt(autoDetectResource(t[a], r), a));
    }, e.prototype.dispose = function() {
      for (var t = 0, r = this.length; t < r; t++)
        this.items[t].destroy();
      this.items = null, this.itemDirtyIds = null, this._load = null;
    }, e.prototype.addResourceAt = function(t, r) {
      if (!this.items[r])
        throw new Error("Index " + r + " is out of bounds");
      return t.valid && !this.valid && this.resize(t.width, t.height), this.items[r].setResource(t), this;
    }, e.prototype.bind = function(t) {
      if (this.baseTexture !== null)
        throw new Error("Only one base texture per TextureArray is allowed");
      n.prototype.bind.call(this, t);
      for (var r = 0; r < this.length; r++)
        this.items[r].parentTextureArray = t, this.items[r].on("update", t.update, t);
    }, e.prototype.unbind = function(t) {
      n.prototype.unbind.call(this, t);
      for (var r = 0; r < this.length; r++)
        this.items[r].parentTextureArray = null, this.items[r].off("update", t.update, t);
    }, e.prototype.load = function() {
      var t = this;
      if (this._load)
        return this._load;
      var r = this.items.map(function(o) {
        return o.resource;
      }).filter(function(o) {
        return o;
      }), a = r.map(function(o) {
        return o.load();
      });
      return this._load = Promise.all(a).then(function() {
        var o = t.items[0], s = o.realWidth, u = o.realHeight;
        return t.resize(s, u), Promise.resolve(t);
      }), this._load;
    }, e;
  }(Resource)
), ArrayResource = (
  /** @class */
  function(n) {
    __extends$i(e, n);
    function e(t, r) {
      var a = this, o = r || {}, s = o.width, u = o.height, h, l;
      return Array.isArray(t) ? (h = t, l = t.length) : l = t, a = n.call(this, l, { width: s, height: u }) || this, h && a.initFromArray(h, r), a;
    }
    return e.prototype.addBaseTextureAt = function(t, r) {
      if (t.resource)
        this.addResourceAt(t.resource, r);
      else
        throw new Error("ArrayResource does not support RenderTexture");
      return this;
    }, e.prototype.bind = function(t) {
      n.prototype.bind.call(this, t), t.target = TARGETS.TEXTURE_2D_ARRAY;
    }, e.prototype.upload = function(t, r, a) {
      var o = this, s = o.length, u = o.itemDirtyIds, h = o.items, l = t.gl;
      a.dirtyId < 0 && l.texImage3D(l.TEXTURE_2D_ARRAY, 0, a.internalFormat, this._width, this._height, s, 0, r.format, a.type, null);
      for (var c = 0; c < s; c++) {
        var v = h[c];
        u[c] < v.dirtyId && (u[c] = v.dirtyId, v.valid && l.texSubImage3D(
          l.TEXTURE_2D_ARRAY,
          0,
          0,
          // xoffset
          0,
          // yoffset
          c,
          // zoffset
          v.resource.width,
          v.resource.height,
          1,
          r.format,
          a.type,
          v.resource.source
        ));
      }
      return !0;
    }, e;
  }(AbstractMultiResource)
), BaseImageResource = (
  /** @class */
  function(n) {
    __extends$i(e, n);
    function e(t) {
      var r = this, a = t, o = a.naturalWidth || a.videoWidth || a.width, s = a.naturalHeight || a.videoHeight || a.height;
      return r = n.call(this, o, s) || this, r.source = t, r.noSubImage = !1, r;
    }
    return e.crossOrigin = function(t, r, a) {
      a === void 0 && r.indexOf("data:") !== 0 ? t.crossOrigin = determineCrossOrigin(r) : a !== !1 && (t.crossOrigin = typeof a == "string" ? a : "anonymous");
    }, e.prototype.upload = function(t, r, a, o) {
      var s = t.gl, u = r.realWidth, h = r.realHeight;
      if (o = o || this.source, o instanceof HTMLImageElement) {
        if (!o.complete || o.naturalWidth === 0)
          return !1;
      } else if (o instanceof HTMLVideoElement && o.readyState <= 1)
        return !1;
      return s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL, r.alphaMode === ALPHA_MODES.UNPACK), !this.noSubImage && r.target === s.TEXTURE_2D && a.width === u && a.height === h ? s.texSubImage2D(s.TEXTURE_2D, 0, 0, 0, r.format, a.type, o) : (a.width = u, a.height = h, s.texImage2D(r.target, 0, a.internalFormat, r.format, a.type, o)), !0;
    }, e.prototype.update = function() {
      if (!this.destroyed) {
        var t = this.source, r = t.naturalWidth || t.videoWidth || t.width, a = t.naturalHeight || t.videoHeight || t.height;
        this.resize(r, a), n.prototype.update.call(this);
      }
    }, e.prototype.dispose = function() {
      this.source = null;
    }, e;
  }(Resource)
), CanvasResource = (
  /** @class */
  function(n) {
    __extends$i(e, n);
    function e(t) {
      return n.call(this, t) || this;
    }
    return e.test = function(t) {
      var r = globalThis.OffscreenCanvas;
      return r && t instanceof r ? !0 : globalThis.HTMLCanvasElement && t instanceof HTMLCanvasElement;
    }, e;
  }(BaseImageResource)
), CubeResource = (
  /** @class */
  function(n) {
    __extends$i(e, n);
    function e(t, r) {
      var a = this, o = r || {}, s = o.width, u = o.height, h = o.autoLoad, l = o.linkBaseTexture;
      if (t && t.length !== e.SIDES)
        throw new Error("Invalid length. Got " + t.length + ", expected 6");
      a = n.call(this, 6, { width: s, height: u }) || this;
      for (var c = 0; c < e.SIDES; c++)
        a.items[c].target = TARGETS.TEXTURE_CUBE_MAP_POSITIVE_X + c;
      return a.linkBaseTexture = l !== !1, t && a.initFromArray(t, r), h !== !1 && a.load(), a;
    }
    return e.prototype.bind = function(t) {
      n.prototype.bind.call(this, t), t.target = TARGETS.TEXTURE_CUBE_MAP;
    }, e.prototype.addBaseTextureAt = function(t, r, a) {
      if (!this.items[r])
        throw new Error("Index " + r + " is out of bounds");
      if (!this.linkBaseTexture || t.parentTextureArray || Object.keys(t._glTextures).length > 0)
        if (t.resource)
          this.addResourceAt(t.resource, r);
        else
          throw new Error("CubeResource does not support copying of renderTexture.");
      else
        t.target = TARGETS.TEXTURE_CUBE_MAP_POSITIVE_X + r, t.parentTextureArray = this.baseTexture, this.items[r] = t;
      return t.valid && !this.valid && this.resize(t.realWidth, t.realHeight), this.items[r] = t, this;
    }, e.prototype.upload = function(t, r, a) {
      for (var o = this.itemDirtyIds, s = 0; s < e.SIDES; s++) {
        var u = this.items[s];
        (o[s] < u.dirtyId || a.dirtyId < r.dirtyId) && (u.valid && u.resource ? (u.resource.upload(t, u, a), o[s] = u.dirtyId) : o[s] < -1 && (t.gl.texImage2D(u.target, 0, a.internalFormat, r.realWidth, r.realHeight, 0, r.format, a.type, null), o[s] = -1));
      }
      return !0;
    }, e.test = function(t) {
      return Array.isArray(t) && t.length === e.SIDES;
    }, e.SIDES = 6, e;
  }(AbstractMultiResource)
), ImageResource = (
  /** @class */
  function(n) {
    __extends$i(e, n);
    function e(t, r) {
      var a = this;
      if (r = r || {}, !(t instanceof HTMLImageElement)) {
        var o = new Image();
        BaseImageResource.crossOrigin(o, t, r.crossorigin), o.src = t, t = o;
      }
      return a = n.call(this, t) || this, !t.complete && a._width && a._height && (a._width = 0, a._height = 0), a.url = t.src, a._process = null, a.preserveBitmap = !1, a.createBitmap = (r.createBitmap !== void 0 ? r.createBitmap : settings.CREATE_IMAGE_BITMAP) && !!globalThis.createImageBitmap, a.alphaMode = typeof r.alphaMode == "number" ? r.alphaMode : null, a.bitmap = null, a._load = null, r.autoLoad !== !1 && a.load(), a;
    }
    return e.prototype.load = function(t) {
      var r = this;
      return this._load ? this._load : (t !== void 0 && (this.createBitmap = t), this._load = new Promise(function(a, o) {
        var s = r.source;
        r.url = s.src;
        var u = function() {
          r.destroyed || (s.onload = null, s.onerror = null, r.resize(s.width, s.height), r._load = null, r.createBitmap ? a(r.process()) : a(r));
        };
        s.complete && s.src ? u() : (s.onload = u, s.onerror = function(h) {
          o(h), r.onError.emit(h);
        });
      }), this._load);
    }, e.prototype.process = function() {
      var t = this, r = this.source;
      if (this._process !== null)
        return this._process;
      if (this.bitmap !== null || !globalThis.createImageBitmap)
        return Promise.resolve(this);
      var a = globalThis.createImageBitmap, o = !r.crossOrigin || r.crossOrigin === "anonymous";
      return this._process = fetch(r.src, {
        mode: o ? "cors" : "no-cors"
      }).then(function(s) {
        return s.blob();
      }).then(function(s) {
        return a(s, 0, 0, r.width, r.height, {
          premultiplyAlpha: t.alphaMode === null || t.alphaMode === ALPHA_MODES.UNPACK ? "premultiply" : "none"
        });
      }).then(function(s) {
        return t.destroyed ? Promise.reject() : (t.bitmap = s, t.update(), t._process = null, Promise.resolve(t));
      }), this._process;
    }, e.prototype.upload = function(t, r, a) {
      if (typeof this.alphaMode == "number" && (r.alphaMode = this.alphaMode), !this.createBitmap)
        return n.prototype.upload.call(this, t, r, a);
      if (!this.bitmap && (this.process(), !this.bitmap))
        return !1;
      if (n.prototype.upload.call(this, t, r, a, this.bitmap), !this.preserveBitmap) {
        var o = !0, s = r._glTextures;
        for (var u in s) {
          var h = s[u];
          if (h !== a && h.dirtyId !== r.dirtyId) {
            o = !1;
            break;
          }
        }
        o && (this.bitmap.close && this.bitmap.close(), this.bitmap = null);
      }
      return !0;
    }, e.prototype.dispose = function() {
      this.source.onload = null, this.source.onerror = null, n.prototype.dispose.call(this), this.bitmap && (this.bitmap.close(), this.bitmap = null), this._process = null, this._load = null;
    }, e.test = function(t) {
      return typeof t == "string" || t instanceof HTMLImageElement;
    }, e;
  }(BaseImageResource)
), SVGResource = (
  /** @class */
  function(n) {
    __extends$i(e, n);
    function e(t, r) {
      var a = this;
      return r = r || {}, a = n.call(this, settings.ADAPTER.createCanvas()) || this, a._width = 0, a._height = 0, a.svg = t, a.scale = r.scale || 1, a._overrideWidth = r.width, a._overrideHeight = r.height, a._resolve = null, a._crossorigin = r.crossorigin, a._load = null, r.autoLoad !== !1 && a.load(), a;
    }
    return e.prototype.load = function() {
      var t = this;
      return this._load ? this._load : (this._load = new Promise(function(r) {
        if (t._resolve = function() {
          t.resize(t.source.width, t.source.height), r(t);
        }, e.SVG_XML.test(t.svg.trim())) {
          if (!btoa)
            throw new Error("Your browser doesn't support base64 conversions.");
          t.svg = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(t.svg)));
        }
        t._loadSvg();
      }), this._load);
    }, e.prototype._loadSvg = function() {
      var t = this, r = new Image();
      BaseImageResource.crossOrigin(r, this.svg, this._crossorigin), r.src = this.svg, r.onerror = function(a) {
        t._resolve && (r.onerror = null, t.onError.emit(a));
      }, r.onload = function() {
        if (t._resolve) {
          var a = r.width, o = r.height;
          if (!a || !o)
            throw new Error("The SVG image must have width and height defined (in pixels), canvas API needs them.");
          var s = a * t.scale, u = o * t.scale;
          (t._overrideWidth || t._overrideHeight) && (s = t._overrideWidth || t._overrideHeight / o * a, u = t._overrideHeight || t._overrideWidth / a * o), s = Math.round(s), u = Math.round(u);
          var h = t.source;
          h.width = s, h.height = u, h._pixiId = "canvas_" + uid(), h.getContext("2d").drawImage(r, 0, 0, a, o, 0, 0, s, u), t._resolve(), t._resolve = null;
        }
      };
    }, e.getSize = function(t) {
      var r = e.SVG_SIZE.exec(t), a = {};
      return r && (a[r[1]] = Math.round(parseFloat(r[3])), a[r[5]] = Math.round(parseFloat(r[7]))), a;
    }, e.prototype.dispose = function() {
      n.prototype.dispose.call(this), this._resolve = null, this._crossorigin = null;
    }, e.test = function(t, r) {
      return r === "svg" || typeof t == "string" && t.startsWith("data:image/svg+xml") || typeof t == "string" && e.SVG_XML.test(t);
    }, e.SVG_XML = /^(<\?xml[^?]+\?>)?\s*(<!--[^(-->)]*-->)?\s*\<svg/m, e.SVG_SIZE = /<svg[^>]*(?:\s(width|height)=('|")(\d*(?:\.\d+)?)(?:px)?('|"))[^>]*(?:\s(width|height)=('|")(\d*(?:\.\d+)?)(?:px)?('|"))[^>]*>/i, e;
  }(BaseImageResource)
), VideoResource = (
  /** @class */
  function(n) {
    __extends$i(e, n);
    function e(t, r) {
      var a = this;
      if (r = r || {}, !(t instanceof HTMLVideoElement)) {
        var o = document.createElement("video");
        o.setAttribute("preload", "auto"), o.setAttribute("webkit-playsinline", ""), o.setAttribute("playsinline", ""), typeof t == "string" && (t = [t]);
        var s = t[0].src || t[0];
        BaseImageResource.crossOrigin(o, s, r.crossorigin);
        for (var u = 0; u < t.length; ++u) {
          var h = document.createElement("source"), l = t[u], c = l.src, v = l.mime;
          c = c || t[u];
          var d = c.split("?").shift().toLowerCase(), g = d.slice(d.lastIndexOf(".") + 1);
          v = v || e.MIME_TYPES[g] || "video/" + g, h.src = c, h.type = v, o.appendChild(h);
        }
        t = o;
      }
      return a = n.call(this, t) || this, a.noSubImage = !0, a._autoUpdate = !0, a._isConnectedToTicker = !1, a._updateFPS = r.updateFPS || 0, a._msToNextUpdate = 0, a.autoPlay = r.autoPlay !== !1, a._load = null, a._resolve = null, a._onCanPlay = a._onCanPlay.bind(a), a._onError = a._onError.bind(a), r.autoLoad !== !1 && a.load(), a;
    }
    return e.prototype.update = function(t) {
      if (!this.destroyed) {
        var r = Ticker.shared.elapsedMS * this.source.playbackRate;
        this._msToNextUpdate = Math.floor(this._msToNextUpdate - r), (!this._updateFPS || this._msToNextUpdate <= 0) && (n.prototype.update.call(this), this._msToNextUpdate = this._updateFPS ? Math.floor(1e3 / this._updateFPS) : 0);
      }
    }, e.prototype.load = function() {
      var t = this;
      if (this._load)
        return this._load;
      var r = this.source;
      return (r.readyState === r.HAVE_ENOUGH_DATA || r.readyState === r.HAVE_FUTURE_DATA) && r.width && r.height && (r.complete = !0), r.addEventListener("play", this._onPlayStart.bind(this)), r.addEventListener("pause", this._onPlayStop.bind(this)), this._isSourceReady() ? this._onCanPlay() : (r.addEventListener("canplay", this._onCanPlay), r.addEventListener("canplaythrough", this._onCanPlay), r.addEventListener("error", this._onError, !0)), this._load = new Promise(function(a) {
        t.valid ? a(t) : (t._resolve = a, r.load());
      }), this._load;
    }, e.prototype._onError = function(t) {
      this.source.removeEventListener("error", this._onError, !0), this.onError.emit(t);
    }, e.prototype._isSourcePlaying = function() {
      var t = this.source;
      return !t.paused && !t.ended && this._isSourceReady();
    }, e.prototype._isSourceReady = function() {
      var t = this.source;
      return t.readyState > 2;
    }, e.prototype._onPlayStart = function() {
      this.valid || this._onCanPlay(), this.autoUpdate && !this._isConnectedToTicker && (Ticker.shared.add(this.update, this), this._isConnectedToTicker = !0);
    }, e.prototype._onPlayStop = function() {
      this._isConnectedToTicker && (Ticker.shared.remove(this.update, this), this._isConnectedToTicker = !1);
    }, e.prototype._onCanPlay = function() {
      var t = this.source;
      t.removeEventListener("canplay", this._onCanPlay), t.removeEventListener("canplaythrough", this._onCanPlay);
      var r = this.valid;
      this.resize(t.videoWidth, t.videoHeight), !r && this._resolve && (this._resolve(this), this._resolve = null), this._isSourcePlaying() ? this._onPlayStart() : this.autoPlay && t.play();
    }, e.prototype.dispose = function() {
      this._isConnectedToTicker && (Ticker.shared.remove(this.update, this), this._isConnectedToTicker = !1);
      var t = this.source;
      t && (t.removeEventListener("error", this._onError, !0), t.pause(), t.src = "", t.load()), n.prototype.dispose.call(this);
    }, Object.defineProperty(e.prototype, "autoUpdate", {
      /** Should the base texture automatically update itself, set to true by default. */
      get: function() {
        return this._autoUpdate;
      },
      set: function(t) {
        t !== this._autoUpdate && (this._autoUpdate = t, !this._autoUpdate && this._isConnectedToTicker ? (Ticker.shared.remove(this.update, this), this._isConnectedToTicker = !1) : this._autoUpdate && !this._isConnectedToTicker && this._isSourcePlaying() && (Ticker.shared.add(this.update, this), this._isConnectedToTicker = !0));
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "updateFPS", {
      /**
       * How many times a second to update the texture from the video. Leave at 0 to update at every render.
       * A lower fps can help performance, as updating the texture at 60fps on a 30ps video may not be efficient.
       */
      get: function() {
        return this._updateFPS;
      },
      set: function(t) {
        t !== this._updateFPS && (this._updateFPS = t);
      },
      enumerable: !1,
      configurable: !0
    }), e.test = function(t, r) {
      return globalThis.HTMLVideoElement && t instanceof HTMLVideoElement || e.TYPES.indexOf(r) > -1;
    }, e.TYPES = ["mp4", "m4v", "webm", "ogg", "ogv", "h264", "avi", "mov"], e.MIME_TYPES = {
      ogv: "video/ogg",
      mov: "video/quicktime",
      m4v: "video/mp4"
    }, e;
  }(BaseImageResource)
), ImageBitmapResource = (
  /** @class */
  function(n) {
    __extends$i(e, n);
    function e(t) {
      return n.call(this, t) || this;
    }
    return e.test = function(t) {
      return !!globalThis.createImageBitmap && typeof ImageBitmap < "u" && t instanceof ImageBitmap;
    }, e;
  }(BaseImageResource)
);
INSTALLED.push(ImageResource, ImageBitmapResource, CanvasResource, VideoResource, SVGResource, BufferResource, CubeResource, ArrayResource);
var DepthResource = (
  /** @class */
  function(n) {
    __extends$i(e, n);
    function e() {
      return n !== null && n.apply(this, arguments) || this;
    }
    return e.prototype.upload = function(t, r, a) {
      var o = t.gl;
      o.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL, r.alphaMode === ALPHA_MODES.UNPACK);
      var s = r.realWidth, u = r.realHeight;
      return a.width === s && a.height === u ? o.texSubImage2D(r.target, 0, 0, 0, s, u, r.format, a.type, this.data) : (a.width = s, a.height = u, o.texImage2D(r.target, 0, a.internalFormat, s, u, 0, r.format, a.type, this.data)), !0;
    }, e;
  }(BufferResource)
), Framebuffer = (
  /** @class */
  function() {
    function n(e, t) {
      this.width = Math.round(e || 100), this.height = Math.round(t || 100), this.stencil = !1, this.depth = !1, this.dirtyId = 0, this.dirtyFormat = 0, this.dirtySize = 0, this.depthTexture = null, this.colorTextures = [], this.glFramebuffers = {}, this.disposeRunner = new Runner("disposeFramebuffer"), this.multisample = MSAA_QUALITY.NONE;
    }
    return Object.defineProperty(n.prototype, "colorTexture", {
      /**
       * Reference to the colorTexture.
       * @readonly
       */
      get: function() {
        return this.colorTextures[0];
      },
      enumerable: !1,
      configurable: !0
    }), n.prototype.addColorTexture = function(e, t) {
      return e === void 0 && (e = 0), this.colorTextures[e] = t || new BaseTexture(null, {
        scaleMode: SCALE_MODES.NEAREST,
        resolution: 1,
        mipmap: MIPMAP_MODES.OFF,
        width: this.width,
        height: this.height
      }), this.dirtyId++, this.dirtyFormat++, this;
    }, n.prototype.addDepthTexture = function(e) {
      return this.depthTexture = e || new BaseTexture(new DepthResource(null, { width: this.width, height: this.height }), {
        scaleMode: SCALE_MODES.NEAREST,
        resolution: 1,
        width: this.width,
        height: this.height,
        mipmap: MIPMAP_MODES.OFF,
        format: FORMATS.DEPTH_COMPONENT,
        type: TYPES.UNSIGNED_SHORT
      }), this.dirtyId++, this.dirtyFormat++, this;
    }, n.prototype.enableDepth = function() {
      return this.depth = !0, this.dirtyId++, this.dirtyFormat++, this;
    }, n.prototype.enableStencil = function() {
      return this.stencil = !0, this.dirtyId++, this.dirtyFormat++, this;
    }, n.prototype.resize = function(e, t) {
      if (e = Math.round(e), t = Math.round(t), !(e === this.width && t === this.height)) {
        this.width = e, this.height = t, this.dirtyId++, this.dirtySize++;
        for (var r = 0; r < this.colorTextures.length; r++) {
          var a = this.colorTextures[r], o = a.resolution;
          a.setSize(e / o, t / o);
        }
        if (this.depthTexture) {
          var o = this.depthTexture.resolution;
          this.depthTexture.setSize(e / o, t / o);
        }
      }
    }, n.prototype.dispose = function() {
      this.disposeRunner.emit(this, !1);
    }, n.prototype.destroyDepthTexture = function() {
      this.depthTexture && (this.depthTexture.destroy(), this.depthTexture = null, ++this.dirtyId, ++this.dirtyFormat);
    }, n;
  }()
), BaseRenderTexture = (
  /** @class */
  function(n) {
    __extends$i(e, n);
    function e(t) {
      t === void 0 && (t = {});
      var r = this;
      if (typeof t == "number") {
        var a = arguments[0], o = arguments[1], s = arguments[2], u = arguments[3];
        t = { width: a, height: o, scaleMode: s, resolution: u };
      }
      return t.width = t.width || 100, t.height = t.height || 100, t.multisample = t.multisample !== void 0 ? t.multisample : MSAA_QUALITY.NONE, r = n.call(this, null, t) || this, r.mipmap = MIPMAP_MODES.OFF, r.valid = !0, r.clearColor = [0, 0, 0, 0], r.framebuffer = new Framebuffer(r.realWidth, r.realHeight).addColorTexture(0, r), r.framebuffer.multisample = t.multisample, r.maskStack = [], r.filterStack = [{}], r;
    }
    return e.prototype.resize = function(t, r) {
      this.framebuffer.resize(t * this.resolution, r * this.resolution), this.setRealSize(this.framebuffer.width, this.framebuffer.height);
    }, e.prototype.dispose = function() {
      this.framebuffer.dispose(), n.prototype.dispose.call(this);
    }, e.prototype.destroy = function() {
      n.prototype.destroy.call(this), this.framebuffer.destroyDepthTexture(), this.framebuffer = null;
    }, e;
  }(BaseTexture)
), TextureUvs = (
  /** @class */
  function() {
    function n() {
      this.x0 = 0, this.y0 = 0, this.x1 = 1, this.y1 = 0, this.x2 = 1, this.y2 = 1, this.x3 = 0, this.y3 = 1, this.uvsFloat32 = new Float32Array(8);
    }
    return n.prototype.set = function(e, t, r) {
      var a = t.width, o = t.height;
      if (r) {
        var s = e.width / 2 / a, u = e.height / 2 / o, h = e.x / a + s, l = e.y / o + u;
        r = groupD8.add(r, groupD8.NW), this.x0 = h + s * groupD8.uX(r), this.y0 = l + u * groupD8.uY(r), r = groupD8.add(r, 2), this.x1 = h + s * groupD8.uX(r), this.y1 = l + u * groupD8.uY(r), r = groupD8.add(r, 2), this.x2 = h + s * groupD8.uX(r), this.y2 = l + u * groupD8.uY(r), r = groupD8.add(r, 2), this.x3 = h + s * groupD8.uX(r), this.y3 = l + u * groupD8.uY(r);
      } else
        this.x0 = e.x / a, this.y0 = e.y / o, this.x1 = (e.x + e.width) / a, this.y1 = e.y / o, this.x2 = (e.x + e.width) / a, this.y2 = (e.y + e.height) / o, this.x3 = e.x / a, this.y3 = (e.y + e.height) / o;
      this.uvsFloat32[0] = this.x0, this.uvsFloat32[1] = this.y0, this.uvsFloat32[2] = this.x1, this.uvsFloat32[3] = this.y1, this.uvsFloat32[4] = this.x2, this.uvsFloat32[5] = this.y2, this.uvsFloat32[6] = this.x3, this.uvsFloat32[7] = this.y3;
    }, n.prototype.toString = function() {
      return "[@pixi/core:TextureUvs " + ("x0=" + this.x0 + " y0=" + this.y0 + " ") + ("x1=" + this.x1 + " y1=" + this.y1 + " x2=" + this.x2 + " ") + ("y2=" + this.y2 + " x3=" + this.x3 + " y3=" + this.y3) + "]";
    }, n;
  }()
), DEFAULT_UVS = new TextureUvs();
function removeAllHandlers(n) {
  n.destroy = function() {
  }, n.on = function() {
  }, n.once = function() {
  }, n.emit = function() {
  };
}
var Texture = (
  /** @class */
  function(n) {
    __extends$i(e, n);
    function e(t, r, a, o, s, u) {
      var h = n.call(this) || this;
      if (h.noFrame = !1, r || (h.noFrame = !0, r = new Rectangle(0, 0, 1, 1)), t instanceof e && (t = t.baseTexture), h.baseTexture = t, h._frame = r, h.trim = o, h.valid = !1, h._uvs = DEFAULT_UVS, h.uvMatrix = null, h.orig = a || r, h._rotate = Number(s || 0), s === !0)
        h._rotate = 2;
      else if (h._rotate % 2 !== 0)
        throw new Error("attempt to use diamond-shaped UVs. If you are sure, set rotation manually");
      return h.defaultAnchor = u ? new Point(u.x, u.y) : new Point(0, 0), h._updateID = 0, h.textureCacheIds = [], t.valid ? h.noFrame ? t.valid && h.onBaseTextureUpdated(t) : h.frame = r : t.once("loaded", h.onBaseTextureUpdated, h), h.noFrame && t.on("update", h.onBaseTextureUpdated, h), h;
    }
    return e.prototype.update = function() {
      this.baseTexture.resource && this.baseTexture.resource.update();
    }, e.prototype.onBaseTextureUpdated = function(t) {
      if (this.noFrame) {
        if (!this.baseTexture.valid)
          return;
        this._frame.width = t.width, this._frame.height = t.height, this.valid = !0, this.updateUvs();
      } else
        this.frame = this._frame;
      this.emit("update", this);
    }, e.prototype.destroy = function(t) {
      if (this.baseTexture) {
        if (t) {
          var r = this.baseTexture.resource;
          r && r.url && TextureCache[r.url] && e.removeFromCache(r.url), this.baseTexture.destroy();
        }
        this.baseTexture.off("loaded", this.onBaseTextureUpdated, this), this.baseTexture.off("update", this.onBaseTextureUpdated, this), this.baseTexture = null;
      }
      this._frame = null, this._uvs = null, this.trim = null, this.orig = null, this.valid = !1, e.removeFromCache(this), this.textureCacheIds = null;
    }, e.prototype.clone = function() {
      var t = this._frame.clone(), r = this._frame === this.orig ? t : this.orig.clone(), a = new e(this.baseTexture, !this.noFrame && t, r, this.trim && this.trim.clone(), this.rotate, this.defaultAnchor);
      return this.noFrame && (a._frame = t), a;
    }, e.prototype.updateUvs = function() {
      this._uvs === DEFAULT_UVS && (this._uvs = new TextureUvs()), this._uvs.set(this._frame, this.baseTexture, this.rotate), this._updateID++;
    }, e.from = function(t, r, a) {
      r === void 0 && (r = {}), a === void 0 && (a = settings.STRICT_TEXTURE_CACHE);
      var o = typeof t == "string", s = null;
      if (o)
        s = t;
      else if (t instanceof BaseTexture) {
        if (!t.cacheId) {
          var u = r && r.pixiIdPrefix || "pixiid";
          t.cacheId = u + "-" + uid(), BaseTexture.addToCache(t, t.cacheId);
        }
        s = t.cacheId;
      } else {
        if (!t._pixiId) {
          var u = r && r.pixiIdPrefix || "pixiid";
          t._pixiId = u + "_" + uid();
        }
        s = t._pixiId;
      }
      var h = TextureCache[s];
      if (o && a && !h)
        throw new Error('The cacheId "' + s + '" does not exist in TextureCache.');
      return !h && !(t instanceof BaseTexture) ? (r.resolution || (r.resolution = getResolutionOfUrl(t)), h = new e(new BaseTexture(t, r)), h.baseTexture.cacheId = s, BaseTexture.addToCache(h.baseTexture, s), e.addToCache(h, s)) : !h && t instanceof BaseTexture && (h = new e(t), e.addToCache(h, s)), h;
    }, e.fromURL = function(t, r) {
      var a = Object.assign({ autoLoad: !1 }, r?.resourceOptions), o = e.from(t, Object.assign({ resourceOptions: a }, r), !1), s = o.baseTexture.resource;
      return o.baseTexture.valid ? Promise.resolve(o) : s.load().then(function() {
        return Promise.resolve(o);
      });
    }, e.fromBuffer = function(t, r, a, o) {
      return new e(BaseTexture.fromBuffer(t, r, a, o));
    }, e.fromLoader = function(t, r, a, o) {
      var s = new BaseTexture(t, Object.assign({
        scaleMode: settings.SCALE_MODE,
        resolution: getResolutionOfUrl(r)
      }, o)), u = s.resource;
      u instanceof ImageResource && (u.url = r);
      var h = new e(s);
      return a || (a = r), BaseTexture.addToCache(h.baseTexture, a), e.addToCache(h, a), a !== r && (BaseTexture.addToCache(h.baseTexture, r), e.addToCache(h, r)), h.baseTexture.valid ? Promise.resolve(h) : new Promise(function(l) {
        h.baseTexture.once("loaded", function() {
          return l(h);
        });
      });
    }, e.addToCache = function(t, r) {
      r && (t.textureCacheIds.indexOf(r) === -1 && t.textureCacheIds.push(r), TextureCache[r] && console.warn("Texture added to the cache with an id [" + r + "] that already had an entry"), TextureCache[r] = t);
    }, e.removeFromCache = function(t) {
      if (typeof t == "string") {
        var r = TextureCache[t];
        if (r) {
          var a = r.textureCacheIds.indexOf(t);
          return a > -1 && r.textureCacheIds.splice(a, 1), delete TextureCache[t], r;
        }
      } else if (t && t.textureCacheIds) {
        for (var o = 0; o < t.textureCacheIds.length; ++o)
          TextureCache[t.textureCacheIds[o]] === t && delete TextureCache[t.textureCacheIds[o]];
        return t.textureCacheIds.length = 0, t;
      }
      return null;
    }, Object.defineProperty(e.prototype, "resolution", {
      /**
       * Returns resolution of baseTexture
       * @readonly
       */
      get: function() {
        return this.baseTexture.resolution;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "frame", {
      /**
       * The frame specifies the region of the base texture that this texture uses.
       * Please call `updateUvs()` after you change coordinates of `frame` manually.
       */
      get: function() {
        return this._frame;
      },
      set: function(t) {
        this._frame = t, this.noFrame = !1;
        var r = t.x, a = t.y, o = t.width, s = t.height, u = r + o > this.baseTexture.width, h = a + s > this.baseTexture.height;
        if (u || h) {
          var l = u && h ? "and" : "or", c = "X: " + r + " + " + o + " = " + (r + o) + " > " + this.baseTexture.width, v = "Y: " + a + " + " + s + " = " + (a + s) + " > " + this.baseTexture.height;
          throw new Error("Texture Error: frame does not fit inside the base Texture dimensions: " + (c + " " + l + " " + v));
        }
        this.valid = o && s && this.baseTexture.valid, !this.trim && !this.rotate && (this.orig = t), this.valid && this.updateUvs();
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "rotate", {
      /**
       * Indicates whether the texture is rotated inside the atlas
       * set to 2 to compensate for texture packer rotation
       * set to 6 to compensate for spine packer rotation
       * can be used to rotate or mirror sprites
       * See {@link PIXI.groupD8} for explanation
       */
      get: function() {
        return this._rotate;
      },
      set: function(t) {
        this._rotate = t, this.valid && this.updateUvs();
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "width", {
      /** The width of the Texture in pixels. */
      get: function() {
        return this.orig.width;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "height", {
      /** The height of the Texture in pixels. */
      get: function() {
        return this.orig.height;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.castToBaseTexture = function() {
      return this.baseTexture;
    }, Object.defineProperty(e, "EMPTY", {
      /** An empty texture, used often to not have to create multiple empty textures. Can not be destroyed. */
      get: function() {
        return e._EMPTY || (e._EMPTY = new e(new BaseTexture()), removeAllHandlers(e._EMPTY), removeAllHandlers(e._EMPTY.baseTexture)), e._EMPTY;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e, "WHITE", {
      /** A white texture of 16x16 size, used for graphics and other things Can not be destroyed. */
      get: function() {
        if (!e._WHITE) {
          var t = settings.ADAPTER.createCanvas(16, 16), r = t.getContext("2d");
          t.width = 16, t.height = 16, r.fillStyle = "white", r.fillRect(0, 0, 16, 16), e._WHITE = new e(BaseTexture.from(t)), removeAllHandlers(e._WHITE), removeAllHandlers(e._WHITE.baseTexture);
        }
        return e._WHITE;
      },
      enumerable: !1,
      configurable: !0
    }), e;
  }(i)
), RenderTexture = (
  /** @class */
  function(n) {
    __extends$i(e, n);
    function e(t, r) {
      var a = n.call(this, t, r) || this;
      return a.valid = !0, a.filterFrame = null, a.filterPoolKey = null, a.updateUvs(), a;
    }
    return Object.defineProperty(e.prototype, "framebuffer", {
      /**
       * Shortcut to `this.baseTexture.framebuffer`, saves baseTexture cast.
       * @readonly
       */
      get: function() {
        return this.baseTexture.framebuffer;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "multisample", {
      /**
       * Shortcut to `this.framebuffer.multisample`.
       * @default PIXI.MSAA_QUALITY.NONE
       */
      get: function() {
        return this.framebuffer.multisample;
      },
      set: function(t) {
        this.framebuffer.multisample = t;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.resize = function(t, r, a) {
      a === void 0 && (a = !0);
      var o = this.baseTexture.resolution, s = Math.round(t * o) / o, u = Math.round(r * o) / o;
      this.valid = s > 0 && u > 0, this._frame.width = this.orig.width = s, this._frame.height = this.orig.height = u, a && this.baseTexture.resize(s, u), this.updateUvs();
    }, e.prototype.setResolution = function(t) {
      var r = this.baseTexture;
      r.resolution !== t && (r.setResolution(t), this.resize(r.width, r.height, !1));
    }, e.create = function(t) {
      for (var r = arguments, a = [], o = 1; o < arguments.length; o++)
        a[o - 1] = r[o];
      return typeof t == "number" && (deprecation("6.0.0", "Arguments (width, height, scaleMode, resolution) have been deprecated."), t = {
        width: t,
        height: a[0],
        scaleMode: a[1],
        resolution: a[2]
      }), new e(new BaseRenderTexture(t));
    }, e;
  }(Texture)
), RenderTexturePool = (
  /** @class */
  function() {
    function n(e) {
      this.texturePool = {}, this.textureOptions = e || {}, this.enableFullScreen = !1, this._pixelsWidth = 0, this._pixelsHeight = 0;
    }
    return n.prototype.createTexture = function(e, t, r) {
      r === void 0 && (r = MSAA_QUALITY.NONE);
      var a = new BaseRenderTexture(Object.assign({
        width: e,
        height: t,
        resolution: 1,
        multisample: r
      }, this.textureOptions));
      return new RenderTexture(a);
    }, n.prototype.getOptimalTexture = function(e, t, r, a) {
      r === void 0 && (r = 1), a === void 0 && (a = MSAA_QUALITY.NONE);
      var o;
      e = Math.ceil(e * r - 1e-6), t = Math.ceil(t * r - 1e-6), !this.enableFullScreen || e !== this._pixelsWidth || t !== this._pixelsHeight ? (e = nextPow2(e), t = nextPow2(t), o = ((e & 65535) << 16 | t & 65535) >>> 0, a > 1 && (o += a * 4294967296)) : o = a > 1 ? -a : -1, this.texturePool[o] || (this.texturePool[o] = []);
      var s = this.texturePool[o].pop();
      return s || (s = this.createTexture(e, t, a)), s.filterPoolKey = o, s.setResolution(r), s;
    }, n.prototype.getFilterTexture = function(e, t, r) {
      var a = this.getOptimalTexture(e.width, e.height, t || e.resolution, r || MSAA_QUALITY.NONE);
      return a.filterFrame = e.filterFrame, a;
    }, n.prototype.returnTexture = function(e) {
      var t = e.filterPoolKey;
      e.filterFrame = null, this.texturePool[t].push(e);
    }, n.prototype.returnFilterTexture = function(e) {
      this.returnTexture(e);
    }, n.prototype.clear = function(e) {
      if (e = e !== !1, e)
        for (var t in this.texturePool) {
          var r = this.texturePool[t];
          if (r)
            for (var a = 0; a < r.length; a++)
              r[a].destroy(!0);
        }
      this.texturePool = {};
    }, n.prototype.setScreenSize = function(e) {
      if (!(e.width === this._pixelsWidth && e.height === this._pixelsHeight)) {
        this.enableFullScreen = e.width > 0 && e.height > 0;
        for (var t in this.texturePool)
          if (Number(t) < 0) {
            var r = this.texturePool[t];
            if (r)
              for (var a = 0; a < r.length; a++)
                r[a].destroy(!0);
            this.texturePool[t] = [];
          }
        this._pixelsWidth = e.width, this._pixelsHeight = e.height;
      }
    }, n.SCREEN_KEY = -1, n;
  }()
), Attribute = (
  /** @class */
  function() {
    function n(e, t, r, a, o, s, u) {
      t === void 0 && (t = 0), r === void 0 && (r = !1), a === void 0 && (a = TYPES.FLOAT), this.buffer = e, this.size = t, this.normalized = r, this.type = a, this.stride = o, this.start = s, this.instance = u;
    }
    return n.prototype.destroy = function() {
      this.buffer = null;
    }, n.from = function(e, t, r, a, o) {
      return new n(e, t, r, a, o);
    }, n;
  }()
), UID$4 = 0, Buffer = (
  /** @class */
  function() {
    function n(e, t, r) {
      t === void 0 && (t = !0), r === void 0 && (r = !1), this.data = e || new Float32Array(1), this._glBuffers = {}, this._updateID = 0, this.index = r, this.static = t, this.id = UID$4++, this.disposeRunner = new Runner("disposeBuffer");
    }
    return n.prototype.update = function(e) {
      e instanceof Array && (e = new Float32Array(e)), this.data = e || this.data, this._updateID++;
    }, n.prototype.dispose = function() {
      this.disposeRunner.emit(this, !1);
    }, n.prototype.destroy = function() {
      this.dispose(), this.data = null;
    }, Object.defineProperty(n.prototype, "index", {
      get: function() {
        return this.type === BUFFER_TYPE.ELEMENT_ARRAY_BUFFER;
      },
      /**
       * Flags whether this is an index buffer.
       *
       * Index buffers are of type `ELEMENT_ARRAY_BUFFER`. Note that setting this property to false will make
       * the buffer of type `ARRAY_BUFFER`.
       *
       * For backwards compatibility.
       */
      set: function(e) {
        this.type = e ? BUFFER_TYPE.ELEMENT_ARRAY_BUFFER : BUFFER_TYPE.ARRAY_BUFFER;
      },
      enumerable: !1,
      configurable: !0
    }), n.from = function(e) {
      return e instanceof Array && (e = new Float32Array(e)), new n(e);
    }, n;
  }()
), map$1 = {
  Float32Array,
  Uint32Array,
  Int32Array,
  Uint8Array
};
function interleaveTypedArrays(n, e) {
  for (var t = 0, r = 0, a = {}, o = 0; o < n.length; o++)
    r += e[o], t += n[o].length;
  for (var s = new ArrayBuffer(t * 4), u = null, h = 0, o = 0; o < n.length; o++) {
    var l = e[o], c = n[o], v = getBufferType(c);
    a[v] || (a[v] = new map$1[v](s)), u = a[v];
    for (var d = 0; d < c.length; d++) {
      var g = (d / l | 0) * r + h, m = d % l;
      u[g + m] = c[d];
    }
    h += l;
  }
  return new Float32Array(s);
}
var byteSizeMap$1 = { 5126: 4, 5123: 2, 5121: 1 }, UID$3 = 0, map = {
  Float32Array,
  Uint32Array,
  Int32Array,
  Uint8Array,
  Uint16Array
}, Geometry = (
  /** @class */
  function() {
    function n(e, t) {
      e === void 0 && (e = []), t === void 0 && (t = {}), this.buffers = e, this.indexBuffer = null, this.attributes = t, this.glVertexArrayObjects = {}, this.id = UID$3++, this.instanced = !1, this.instanceCount = 1, this.disposeRunner = new Runner("disposeGeometry"), this.refCount = 0;
    }
    return n.prototype.addAttribute = function(e, t, r, a, o, s, u, h) {
      if (r === void 0 && (r = 0), a === void 0 && (a = !1), h === void 0 && (h = !1), !t)
        throw new Error("You must pass a buffer when creating an attribute");
      t instanceof Buffer || (t instanceof Array && (t = new Float32Array(t)), t = new Buffer(t));
      var l = e.split("|");
      if (l.length > 1) {
        for (var c = 0; c < l.length; c++)
          this.addAttribute(l[c], t, r, a, o);
        return this;
      }
      var v = this.buffers.indexOf(t);
      return v === -1 && (this.buffers.push(t), v = this.buffers.length - 1), this.attributes[e] = new Attribute(v, r, a, o, s, u, h), this.instanced = this.instanced || h, this;
    }, n.prototype.getAttribute = function(e) {
      return this.attributes[e];
    }, n.prototype.getBuffer = function(e) {
      return this.buffers[this.getAttribute(e).buffer];
    }, n.prototype.addIndex = function(e) {
      return e instanceof Buffer || (e instanceof Array && (e = new Uint16Array(e)), e = new Buffer(e)), e.type = BUFFER_TYPE.ELEMENT_ARRAY_BUFFER, this.indexBuffer = e, this.buffers.indexOf(e) === -1 && this.buffers.push(e), this;
    }, n.prototype.getIndex = function() {
      return this.indexBuffer;
    }, n.prototype.interleave = function() {
      if (this.buffers.length === 1 || this.buffers.length === 2 && this.indexBuffer)
        return this;
      var e = [], t = [], r = new Buffer(), a;
      for (a in this.attributes) {
        var o = this.attributes[a], s = this.buffers[o.buffer];
        e.push(s.data), t.push(o.size * byteSizeMap$1[o.type] / 4), o.buffer = 0;
      }
      for (r.data = interleaveTypedArrays(e, t), a = 0; a < this.buffers.length; a++)
        this.buffers[a] !== this.indexBuffer && this.buffers[a].destroy();
      return this.buffers = [r], this.indexBuffer && this.buffers.push(this.indexBuffer), this;
    }, n.prototype.getSize = function() {
      for (var e in this.attributes) {
        var t = this.attributes[e], r = this.buffers[t.buffer];
        return r.data.length / (t.stride / 4 || t.size);
      }
      return 0;
    }, n.prototype.dispose = function() {
      this.disposeRunner.emit(this, !1);
    }, n.prototype.destroy = function() {
      this.dispose(), this.buffers = null, this.indexBuffer = null, this.attributes = null;
    }, n.prototype.clone = function() {
      for (var e = new n(), t = 0; t < this.buffers.length; t++)
        e.buffers[t] = new Buffer(this.buffers[t].data.slice(0));
      for (var t in this.attributes) {
        var r = this.attributes[t];
        e.attributes[t] = new Attribute(r.buffer, r.size, r.normalized, r.type, r.stride, r.start, r.instance);
      }
      return this.indexBuffer && (e.indexBuffer = e.buffers[this.buffers.indexOf(this.indexBuffer)], e.indexBuffer.type = BUFFER_TYPE.ELEMENT_ARRAY_BUFFER), e;
    }, n.merge = function(e) {
      for (var t = new n(), r = [], a = [], o = [], s, u = 0; u < e.length; u++) {
        s = e[u];
        for (var h = 0; h < s.buffers.length; h++)
          a[h] = a[h] || 0, a[h] += s.buffers[h].data.length, o[h] = 0;
      }
      for (var u = 0; u < s.buffers.length; u++)
        r[u] = new map[getBufferType(s.buffers[u].data)](a[u]), t.buffers[u] = new Buffer(r[u]);
      for (var u = 0; u < e.length; u++) {
        s = e[u];
        for (var h = 0; h < s.buffers.length; h++)
          r[h].set(s.buffers[h].data, o[h]), o[h] += s.buffers[h].data.length;
      }
      if (t.attributes = s.attributes, s.indexBuffer) {
        t.indexBuffer = t.buffers[s.buffers.indexOf(s.indexBuffer)], t.indexBuffer.type = BUFFER_TYPE.ELEMENT_ARRAY_BUFFER;
        for (var l = 0, c = 0, v = 0, d = 0, u = 0; u < s.buffers.length; u++)
          if (s.buffers[u] !== s.indexBuffer) {
            d = u;
            break;
          }
        for (var u in s.attributes) {
          var g = s.attributes[u];
          (g.buffer | 0) === d && (c += g.size * byteSizeMap$1[g.type] / 4);
        }
        for (var u = 0; u < e.length; u++) {
          for (var m = e[u].indexBuffer.data, h = 0; h < m.length; h++)
            t.indexBuffer.data[h + v] += l;
          l += e[u].buffers[d].data.length / c, v += m.length;
        }
      }
      return t;
    }, n;
  }()
), Quad = (
  /** @class */
  function(n) {
    __extends$i(e, n);
    function e() {
      var t = n.call(this) || this;
      return t.addAttribute("aVertexPosition", new Float32Array([
        0,
        0,
        1,
        0,
        1,
        1,
        0,
        1
      ])).addIndex([0, 1, 3, 2]), t;
    }
    return e;
  }(Geometry)
), QuadUv = (
  /** @class */
  function(n) {
    __extends$i(e, n);
    function e() {
      var t = n.call(this) || this;
      return t.vertices = new Float32Array([
        -1,
        -1,
        1,
        -1,
        1,
        1,
        -1,
        1
      ]), t.uvs = new Float32Array([
        0,
        0,
        1,
        0,
        1,
        1,
        0,
        1
      ]), t.vertexBuffer = new Buffer(t.vertices), t.uvBuffer = new Buffer(t.uvs), t.addAttribute("aVertexPosition", t.vertexBuffer).addAttribute("aTextureCoord", t.uvBuffer).addIndex([0, 1, 2, 0, 2, 3]), t;
    }
    return e.prototype.map = function(t, r) {
      var a = 0, o = 0;
      return this.uvs[0] = a, this.uvs[1] = o, this.uvs[2] = a + r.width / t.width, this.uvs[3] = o, this.uvs[4] = a + r.width / t.width, this.uvs[5] = o + r.height / t.height, this.uvs[6] = a, this.uvs[7] = o + r.height / t.height, a = r.x, o = r.y, this.vertices[0] = a, this.vertices[1] = o, this.vertices[2] = a + r.width, this.vertices[3] = o, this.vertices[4] = a + r.width, this.vertices[5] = o + r.height, this.vertices[6] = a, this.vertices[7] = o + r.height, this.invalidate(), this;
    }, e.prototype.invalidate = function() {
      return this.vertexBuffer._updateID++, this.uvBuffer._updateID++, this;
    }, e;
  }(Geometry)
), UID$2 = 0, UniformGroup = (
  /** @class */
  function() {
    function n(e, t, r) {
      this.group = !0, this.syncUniforms = {}, this.dirtyId = 0, this.id = UID$2++, this.static = !!t, this.ubo = !!r, e instanceof Buffer ? (this.buffer = e, this.buffer.type = BUFFER_TYPE.UNIFORM_BUFFER, this.autoManage = !1, this.ubo = !0) : (this.uniforms = e, this.ubo && (this.buffer = new Buffer(new Float32Array(1)), this.buffer.type = BUFFER_TYPE.UNIFORM_BUFFER, this.autoManage = !0));
    }
    return n.prototype.update = function() {
      this.dirtyId++, !this.autoManage && this.buffer && this.buffer.update();
    }, n.prototype.add = function(e, t, r) {
      if (!this.ubo)
        this.uniforms[e] = new n(t, r);
      else
        throw new Error("[UniformGroup] uniform groups in ubo mode cannot be modified, or have uniform groups nested in them");
    }, n.from = function(e, t, r) {
      return new n(e, t, r);
    }, n.uboFrom = function(e, t) {
      return new n(e, t ?? !0, !0);
    }, n;
  }()
), FilterState = (
  /** @class */
  function() {
    function n() {
      this.renderTexture = null, this.target = null, this.legacy = !1, this.resolution = 1, this.multisample = MSAA_QUALITY.NONE, this.sourceFrame = new Rectangle(), this.destinationFrame = new Rectangle(), this.bindingSourceFrame = new Rectangle(), this.bindingDestinationFrame = new Rectangle(), this.filters = [], this.transform = null;
    }
    return n.prototype.clear = function() {
      this.target = null, this.filters = null, this.renderTexture = null;
    }, n;
  }()
), tempPoints = [new Point(), new Point(), new Point(), new Point()], tempMatrix$2 = new Matrix(), FilterSystem = (
  /** @class */
  function() {
    function n(e) {
      this.renderer = e, this.defaultFilterStack = [{}], this.texturePool = new RenderTexturePool(), this.texturePool.setScreenSize(e.view), this.statePool = [], this.quad = new Quad(), this.quadUv = new QuadUv(), this.tempRect = new Rectangle(), this.activeState = {}, this.globalUniforms = new UniformGroup({
        outputFrame: new Rectangle(),
        inputSize: new Float32Array(4),
        inputPixel: new Float32Array(4),
        inputClamp: new Float32Array(4),
        resolution: 1,
        // legacy variables
        filterArea: new Float32Array(4),
        filterClamp: new Float32Array(4)
      }, !0), this.forceClear = !1, this.useMaxPadding = !1;
    }
    return n.prototype.push = function(e, t) {
      for (var r, a, o = this.renderer, s = this.defaultFilterStack, u = this.statePool.pop() || new FilterState(), h = this.renderer.renderTexture, l = t[0].resolution, c = t[0].multisample, v = t[0].padding, d = t[0].autoFit, g = (r = t[0].legacy) !== null && r !== void 0 ? r : !0, m = 1; m < t.length; m++) {
        var _ = t[m];
        l = Math.min(l, _.resolution), c = Math.min(c, _.multisample), v = this.useMaxPadding ? Math.max(v, _.padding) : v + _.padding, d = d && _.autoFit, g = g || ((a = _.legacy) !== null && a !== void 0 ? a : !0);
      }
      s.length === 1 && (this.defaultFilterStack[0].renderTexture = h.current), s.push(u), u.resolution = l, u.multisample = c, u.legacy = g, u.target = e, u.sourceFrame.copyFrom(e.filterArea || e.getBounds(!0)), u.sourceFrame.pad(v);
      var y = this.tempRect.copyFrom(h.sourceFrame);
      o.projection.transform && this.transformAABB(tempMatrix$2.copyFrom(o.projection.transform).invert(), y), d ? (u.sourceFrame.fit(y), (u.sourceFrame.width <= 0 || u.sourceFrame.height <= 0) && (u.sourceFrame.width = 0, u.sourceFrame.height = 0)) : u.sourceFrame.intersects(y) || (u.sourceFrame.width = 0, u.sourceFrame.height = 0), this.roundFrame(u.sourceFrame, h.current ? h.current.resolution : o.resolution, h.sourceFrame, h.destinationFrame, o.projection.transform), u.renderTexture = this.getOptimalFilterTexture(u.sourceFrame.width, u.sourceFrame.height, l, c), u.filters = t, u.destinationFrame.width = u.renderTexture.width, u.destinationFrame.height = u.renderTexture.height;
      var b = this.tempRect;
      b.x = 0, b.y = 0, b.width = u.sourceFrame.width, b.height = u.sourceFrame.height, u.renderTexture.filterFrame = u.sourceFrame, u.bindingSourceFrame.copyFrom(h.sourceFrame), u.bindingDestinationFrame.copyFrom(h.destinationFrame), u.transform = o.projection.transform, o.projection.transform = null, h.bind(u.renderTexture, u.sourceFrame, b), o.framebuffer.clear(0, 0, 0, 0);
    }, n.prototype.pop = function() {
      var e = this.defaultFilterStack, t = e.pop(), r = t.filters;
      this.activeState = t;
      var a = this.globalUniforms.uniforms;
      a.outputFrame = t.sourceFrame, a.resolution = t.resolution;
      var o = a.inputSize, s = a.inputPixel, u = a.inputClamp;
      if (o[0] = t.destinationFrame.width, o[1] = t.destinationFrame.height, o[2] = 1 / o[0], o[3] = 1 / o[1], s[0] = Math.round(o[0] * t.resolution), s[1] = Math.round(o[1] * t.resolution), s[2] = 1 / s[0], s[3] = 1 / s[1], u[0] = 0.5 * s[2], u[1] = 0.5 * s[3], u[2] = t.sourceFrame.width * o[2] - 0.5 * s[2], u[3] = t.sourceFrame.height * o[3] - 0.5 * s[3], t.legacy) {
        var h = a.filterArea;
        h[0] = t.destinationFrame.width, h[1] = t.destinationFrame.height, h[2] = t.sourceFrame.x, h[3] = t.sourceFrame.y, a.filterClamp = a.inputClamp;
      }
      this.globalUniforms.update();
      var l = e[e.length - 1];
      if (this.renderer.framebuffer.blit(), r.length === 1)
        r[0].apply(this, t.renderTexture, l.renderTexture, CLEAR_MODES.BLEND, t), this.returnFilterTexture(t.renderTexture);
      else {
        var c = t.renderTexture, v = this.getOptimalFilterTexture(c.width, c.height, t.resolution);
        v.filterFrame = c.filterFrame;
        var d = 0;
        for (d = 0; d < r.length - 1; ++d) {
          d === 1 && t.multisample > 1 && (v = this.getOptimalFilterTexture(c.width, c.height, t.resolution), v.filterFrame = c.filterFrame), r[d].apply(this, c, v, CLEAR_MODES.CLEAR, t);
          var g = c;
          c = v, v = g;
        }
        r[d].apply(this, c, l.renderTexture, CLEAR_MODES.BLEND, t), d > 1 && t.multisample > 1 && this.returnFilterTexture(t.renderTexture), this.returnFilterTexture(c), this.returnFilterTexture(v);
      }
      t.clear(), this.statePool.push(t);
    }, n.prototype.bindAndClear = function(e, t) {
      t === void 0 && (t = CLEAR_MODES.CLEAR);
      var r = this.renderer, a = r.renderTexture, o = r.state;
      if (e === this.defaultFilterStack[this.defaultFilterStack.length - 1].renderTexture ? this.renderer.projection.transform = this.activeState.transform : this.renderer.projection.transform = null, e && e.filterFrame) {
        var s = this.tempRect;
        s.x = 0, s.y = 0, s.width = e.filterFrame.width, s.height = e.filterFrame.height, a.bind(e, e.filterFrame, s);
      } else e !== this.defaultFilterStack[this.defaultFilterStack.length - 1].renderTexture ? a.bind(e) : this.renderer.renderTexture.bind(e, this.activeState.bindingSourceFrame, this.activeState.bindingDestinationFrame);
      var u = o.stateId & 1 || this.forceClear;
      (t === CLEAR_MODES.CLEAR || t === CLEAR_MODES.BLIT && u) && this.renderer.framebuffer.clear(0, 0, 0, 0);
    }, n.prototype.applyFilter = function(e, t, r, a) {
      var o = this.renderer;
      o.state.set(e.state), this.bindAndClear(r, a), e.uniforms.uSampler = t, e.uniforms.filterGlobals = this.globalUniforms, o.shader.bind(e), e.legacy = !!e.program.attributeData.aTextureCoord, e.legacy ? (this.quadUv.map(t._frame, t.filterFrame), o.geometry.bind(this.quadUv), o.geometry.draw(DRAW_MODES.TRIANGLES)) : (o.geometry.bind(this.quad), o.geometry.draw(DRAW_MODES.TRIANGLE_STRIP));
    }, n.prototype.calculateSpriteMatrix = function(e, t) {
      var r = this.activeState, a = r.sourceFrame, o = r.destinationFrame, s = t._texture.orig, u = e.set(o.width, 0, 0, o.height, a.x, a.y), h = t.worldTransform.copyTo(Matrix.TEMP_MATRIX);
      return h.invert(), u.prepend(h), u.scale(1 / s.width, 1 / s.height), u.translate(t.anchor.x, t.anchor.y), u;
    }, n.prototype.destroy = function() {
      this.renderer = null, this.texturePool.clear(!1);
    }, n.prototype.getOptimalFilterTexture = function(e, t, r, a) {
      return r === void 0 && (r = 1), a === void 0 && (a = MSAA_QUALITY.NONE), this.texturePool.getOptimalTexture(e, t, r, a);
    }, n.prototype.getFilterTexture = function(e, t, r) {
      if (typeof e == "number") {
        var a = e;
        e = t, t = a;
      }
      e = e || this.activeState.renderTexture;
      var o = this.texturePool.getOptimalTexture(e.width, e.height, t || e.resolution, r || MSAA_QUALITY.NONE);
      return o.filterFrame = e.filterFrame, o;
    }, n.prototype.returnFilterTexture = function(e) {
      this.texturePool.returnTexture(e);
    }, n.prototype.emptyPool = function() {
      this.texturePool.clear(!0);
    }, n.prototype.resize = function() {
      this.texturePool.setScreenSize(this.renderer.view);
    }, n.prototype.transformAABB = function(e, t) {
      var r = tempPoints[0], a = tempPoints[1], o = tempPoints[2], s = tempPoints[3];
      r.set(t.left, t.top), a.set(t.left, t.bottom), o.set(t.right, t.top), s.set(t.right, t.bottom), e.apply(r, r), e.apply(a, a), e.apply(o, o), e.apply(s, s);
      var u = Math.min(r.x, a.x, o.x, s.x), h = Math.min(r.y, a.y, o.y, s.y), l = Math.max(r.x, a.x, o.x, s.x), c = Math.max(r.y, a.y, o.y, s.y);
      t.x = u, t.y = h, t.width = l - u, t.height = c - h;
    }, n.prototype.roundFrame = function(e, t, r, a, o) {
      if (!(e.width <= 0 || e.height <= 0 || r.width <= 0 || r.height <= 0)) {
        if (o) {
          var s = o.a, u = o.b, h = o.c, l = o.d;
          if ((Math.abs(u) > 1e-4 || Math.abs(h) > 1e-4) && (Math.abs(s) > 1e-4 || Math.abs(l) > 1e-4))
            return;
        }
        o = o ? tempMatrix$2.copyFrom(o) : tempMatrix$2.identity(), o.translate(-r.x, -r.y).scale(a.width / r.width, a.height / r.height).translate(a.x, a.y), this.transformAABB(o, e), e.ceil(t), this.transformAABB(o.invert(), e);
      }
    }, n;
  }()
), ObjectRenderer = (
  /** @class */
  function() {
    function n(e) {
      this.renderer = e;
    }
    return n.prototype.flush = function() {
    }, n.prototype.destroy = function() {
      this.renderer = null;
    }, n.prototype.start = function() {
    }, n.prototype.stop = function() {
      this.flush();
    }, n.prototype.render = function(e) {
    }, n;
  }()
), BatchSystem = (
  /** @class */
  function() {
    function n(e) {
      this.renderer = e, this.emptyRenderer = new ObjectRenderer(e), this.currentRenderer = this.emptyRenderer;
    }
    return n.prototype.setObjectRenderer = function(e) {
      this.currentRenderer !== e && (this.currentRenderer.stop(), this.currentRenderer = e, this.currentRenderer.start());
    }, n.prototype.flush = function() {
      this.setObjectRenderer(this.emptyRenderer);
    }, n.prototype.reset = function() {
      this.setObjectRenderer(this.emptyRenderer);
    }, n.prototype.copyBoundTextures = function(e, t) {
      for (var r = this.renderer.texture.boundTextures, a = t - 1; a >= 0; --a)
        e[a] = r[a] || null, e[a] && (e[a]._batchLocation = a);
    }, n.prototype.boundArray = function(e, t, r, a) {
      for (var o = e.elements, s = e.ids, u = e.count, h = 0, l = 0; l < u; l++) {
        var c = o[l], v = c._batchLocation;
        if (v >= 0 && v < a && t[v] === c) {
          s[l] = v;
          continue;
        }
        for (; h < a; ) {
          var d = t[h];
          if (d && d._batchEnabled === r && d._batchLocation === h) {
            h++;
            continue;
          }
          s[l] = h, c._batchLocation = h, t[h] = c;
          break;
        }
      }
    }, n.prototype.destroy = function() {
      this.renderer = null;
    }, n;
  }()
), CONTEXT_UID_COUNTER = 0, ContextSystem = (
  /** @class */
  function() {
    function n(e) {
      this.renderer = e, this.webGLVersion = 1, this.extensions = {}, this.supports = {
        uint32Indices: !1
      }, this.handleContextLost = this.handleContextLost.bind(this), this.handleContextRestored = this.handleContextRestored.bind(this), e.view.addEventListener("webglcontextlost", this.handleContextLost, !1), e.view.addEventListener("webglcontextrestored", this.handleContextRestored, !1);
    }
    return Object.defineProperty(n.prototype, "isLost", {
      /**
       * `true` if the context is lost
       * @readonly
       */
      get: function() {
        return !this.gl || this.gl.isContextLost();
      },
      enumerable: !1,
      configurable: !0
    }), n.prototype.contextChange = function(e) {
      this.gl = e, this.renderer.gl = e, this.renderer.CONTEXT_UID = CONTEXT_UID_COUNTER++;
    }, n.prototype.initFromContext = function(e) {
      this.gl = e, this.validateContext(e), this.renderer.gl = e, this.renderer.CONTEXT_UID = CONTEXT_UID_COUNTER++, this.renderer.runners.contextChange.emit(e);
    }, n.prototype.initFromOptions = function(e) {
      var t = this.createContext(this.renderer.view, e);
      this.initFromContext(t);
    }, n.prototype.createContext = function(e, t) {
      var r;
      if (settings.PREFER_ENV >= ENV.WEBGL2 && (r = e.getContext("webgl2", t)), r)
        this.webGLVersion = 2;
      else if (this.webGLVersion = 1, r = e.getContext("webgl", t) || e.getContext("experimental-webgl", t), !r)
        throw new Error("This browser does not support WebGL. Try using the canvas renderer");
      return this.gl = r, this.getExtensions(), this.gl;
    }, n.prototype.getExtensions = function() {
      var e = this.gl, t = {
        loseContext: e.getExtension("WEBGL_lose_context"),
        anisotropicFiltering: e.getExtension("EXT_texture_filter_anisotropic"),
        floatTextureLinear: e.getExtension("OES_texture_float_linear"),
        s3tc: e.getExtension("WEBGL_compressed_texture_s3tc"),
        s3tc_sRGB: e.getExtension("WEBGL_compressed_texture_s3tc_srgb"),
        etc: e.getExtension("WEBGL_compressed_texture_etc"),
        etc1: e.getExtension("WEBGL_compressed_texture_etc1"),
        pvrtc: e.getExtension("WEBGL_compressed_texture_pvrtc") || e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc"),
        atc: e.getExtension("WEBGL_compressed_texture_atc"),
        astc: e.getExtension("WEBGL_compressed_texture_astc")
      };
      this.webGLVersion === 1 ? Object.assign(this.extensions, t, {
        drawBuffers: e.getExtension("WEBGL_draw_buffers"),
        depthTexture: e.getExtension("WEBGL_depth_texture"),
        vertexArrayObject: e.getExtension("OES_vertex_array_object") || e.getExtension("MOZ_OES_vertex_array_object") || e.getExtension("WEBKIT_OES_vertex_array_object"),
        uint32ElementIndex: e.getExtension("OES_element_index_uint"),
        // Floats and half-floats
        floatTexture: e.getExtension("OES_texture_float"),
        floatTextureLinear: e.getExtension("OES_texture_float_linear"),
        textureHalfFloat: e.getExtension("OES_texture_half_float"),
        textureHalfFloatLinear: e.getExtension("OES_texture_half_float_linear")
      }) : this.webGLVersion === 2 && Object.assign(this.extensions, t, {
        // Floats and half-floats
        colorBufferFloat: e.getExtension("EXT_color_buffer_float")
      });
    }, n.prototype.handleContextLost = function(e) {
      var t = this;
      e.preventDefault(), setTimeout(function() {
        t.gl.isContextLost() && t.extensions.loseContext && t.extensions.loseContext.restoreContext();
      }, 0);
    }, n.prototype.handleContextRestored = function() {
      this.renderer.runners.contextChange.emit(this.gl);
    }, n.prototype.destroy = function() {
      var e = this.renderer.view;
      this.renderer = null, e.removeEventListener("webglcontextlost", this.handleContextLost), e.removeEventListener("webglcontextrestored", this.handleContextRestored), this.gl.useProgram(null), this.extensions.loseContext && this.extensions.loseContext.loseContext();
    }, n.prototype.postrender = function() {
      this.renderer.renderingToScreen && this.gl.flush();
    }, n.prototype.validateContext = function(e) {
      var t = e.getContextAttributes(), r = "WebGL2RenderingContext" in globalThis && e instanceof globalThis.WebGL2RenderingContext;
      r && (this.webGLVersion = 2), t && !t.stencil && console.warn("Provided WebGL context does not have a stencil buffer, masks may not render correctly");
      var a = r || !!e.getExtension("OES_element_index_uint");
      this.supports.uint32Indices = a, a || console.warn("Provided WebGL context does not support 32 index buffer, complex graphics may not render correctly");
    }, n;
  }()
), GLFramebuffer = (
  /** @class */
  /* @__PURE__ */ function() {
    function n(e) {
      this.framebuffer = e, this.stencil = null, this.dirtyId = -1, this.dirtyFormat = -1, this.dirtySize = -1, this.multisample = MSAA_QUALITY.NONE, this.msaaBuffer = null, this.blitFramebuffer = null, this.mipLevel = 0;
    }
    return n;
  }()
), tempRectangle = new Rectangle(), FramebufferSystem = (
  /** @class */
  function() {
    function n(e) {
      this.renderer = e, this.managedFramebuffers = [], this.unknownFramebuffer = new Framebuffer(10, 10), this.msaaSamples = null;
    }
    return n.prototype.contextChange = function() {
      this.disposeAll(!0);
      var e = this.gl = this.renderer.gl;
      if (this.CONTEXT_UID = this.renderer.CONTEXT_UID, this.current = this.unknownFramebuffer, this.viewport = new Rectangle(), this.hasMRT = !0, this.writeDepthTexture = !0, this.renderer.context.webGLVersion === 1) {
        var t = this.renderer.context.extensions.drawBuffers, r = this.renderer.context.extensions.depthTexture;
        settings.PREFER_ENV === ENV.WEBGL_LEGACY && (t = null, r = null), t ? e.drawBuffers = function(a) {
          return t.drawBuffersWEBGL(a);
        } : (this.hasMRT = !1, e.drawBuffers = function() {
        }), r || (this.writeDepthTexture = !1);
      } else
        this.msaaSamples = e.getInternalformatParameter(e.RENDERBUFFER, e.RGBA8, e.SAMPLES);
    }, n.prototype.bind = function(e, t, r) {
      r === void 0 && (r = 0);
      var a = this.gl;
      if (e) {
        var o = e.glFramebuffers[this.CONTEXT_UID] || this.initFramebuffer(e);
        this.current !== e && (this.current = e, a.bindFramebuffer(a.FRAMEBUFFER, o.framebuffer)), o.mipLevel !== r && (e.dirtyId++, e.dirtyFormat++, o.mipLevel = r), o.dirtyId !== e.dirtyId && (o.dirtyId = e.dirtyId, o.dirtyFormat !== e.dirtyFormat ? (o.dirtyFormat = e.dirtyFormat, o.dirtySize = e.dirtySize, this.updateFramebuffer(e, r)) : o.dirtySize !== e.dirtySize && (o.dirtySize = e.dirtySize, this.resizeFramebuffer(e)));
        for (var s = 0; s < e.colorTextures.length; s++) {
          var u = e.colorTextures[s];
          this.renderer.texture.unbind(u.parentTextureArray || u);
        }
        if (e.depthTexture && this.renderer.texture.unbind(e.depthTexture), t) {
          var h = t.width >> r, l = t.height >> r, c = h / t.width;
          this.setViewport(t.x * c, t.y * c, h, l);
        } else {
          var h = e.width >> r, l = e.height >> r;
          this.setViewport(0, 0, h, l);
        }
      } else
        this.current && (this.current = null, a.bindFramebuffer(a.FRAMEBUFFER, null)), t ? this.setViewport(t.x, t.y, t.width, t.height) : this.setViewport(0, 0, this.renderer.width, this.renderer.height);
    }, n.prototype.setViewport = function(e, t, r, a) {
      var o = this.viewport;
      e = Math.round(e), t = Math.round(t), r = Math.round(r), a = Math.round(a), (o.width !== r || o.height !== a || o.x !== e || o.y !== t) && (o.x = e, o.y = t, o.width = r, o.height = a, this.gl.viewport(e, t, r, a));
    }, Object.defineProperty(n.prototype, "size", {
      /**
       * Get the size of the current width and height. Returns object with `width` and `height` values.
       * @readonly
       */
      get: function() {
        return this.current ? { x: 0, y: 0, width: this.current.width, height: this.current.height } : { x: 0, y: 0, width: this.renderer.width, height: this.renderer.height };
      },
      enumerable: !1,
      configurable: !0
    }), n.prototype.clear = function(e, t, r, a, o) {
      o === void 0 && (o = BUFFER_BITS.COLOR | BUFFER_BITS.DEPTH);
      var s = this.gl;
      s.clearColor(e, t, r, a), s.clear(o);
    }, n.prototype.initFramebuffer = function(e) {
      var t = this.gl, r = new GLFramebuffer(t.createFramebuffer());
      return r.multisample = this.detectSamples(e.multisample), e.glFramebuffers[this.CONTEXT_UID] = r, this.managedFramebuffers.push(e), e.disposeRunner.add(this), r;
    }, n.prototype.resizeFramebuffer = function(e) {
      var t = this.gl, r = e.glFramebuffers[this.CONTEXT_UID];
      r.msaaBuffer && (t.bindRenderbuffer(t.RENDERBUFFER, r.msaaBuffer), t.renderbufferStorageMultisample(t.RENDERBUFFER, r.multisample, t.RGBA8, e.width, e.height)), r.stencil && (t.bindRenderbuffer(t.RENDERBUFFER, r.stencil), r.msaaBuffer ? t.renderbufferStorageMultisample(t.RENDERBUFFER, r.multisample, t.DEPTH24_STENCIL8, e.width, e.height) : t.renderbufferStorage(t.RENDERBUFFER, t.DEPTH_STENCIL, e.width, e.height));
      var a = e.colorTextures, o = a.length;
      t.drawBuffers || (o = Math.min(o, 1));
      for (var s = 0; s < o; s++) {
        var u = a[s], h = u.parentTextureArray || u;
        this.renderer.texture.bind(h, 0);
      }
      e.depthTexture && this.writeDepthTexture && this.renderer.texture.bind(e.depthTexture, 0);
    }, n.prototype.updateFramebuffer = function(e, t) {
      var r = this.gl, a = e.glFramebuffers[this.CONTEXT_UID], o = e.colorTextures, s = o.length;
      r.drawBuffers || (s = Math.min(s, 1)), a.multisample > 1 && this.canMultisampleFramebuffer(e) ? (a.msaaBuffer = a.msaaBuffer || r.createRenderbuffer(), r.bindRenderbuffer(r.RENDERBUFFER, a.msaaBuffer), r.renderbufferStorageMultisample(r.RENDERBUFFER, a.multisample, r.RGBA8, e.width, e.height), r.framebufferRenderbuffer(r.FRAMEBUFFER, r.COLOR_ATTACHMENT0, r.RENDERBUFFER, a.msaaBuffer)) : a.msaaBuffer && (r.deleteRenderbuffer(a.msaaBuffer), a.msaaBuffer = null, a.blitFramebuffer && (a.blitFramebuffer.dispose(), a.blitFramebuffer = null));
      for (var u = [], h = 0; h < s; h++) {
        var l = o[h], c = l.parentTextureArray || l;
        this.renderer.texture.bind(c, 0), !(h === 0 && a.msaaBuffer) && (r.framebufferTexture2D(r.FRAMEBUFFER, r.COLOR_ATTACHMENT0 + h, l.target, c._glTextures[this.CONTEXT_UID].texture, t), u.push(r.COLOR_ATTACHMENT0 + h));
      }
      if (u.length > 1 && r.drawBuffers(u), e.depthTexture) {
        var v = this.writeDepthTexture;
        if (v) {
          var d = e.depthTexture;
          this.renderer.texture.bind(d, 0), r.framebufferTexture2D(r.FRAMEBUFFER, r.DEPTH_ATTACHMENT, r.TEXTURE_2D, d._glTextures[this.CONTEXT_UID].texture, t);
        }
      }
      (e.stencil || e.depth) && !(e.depthTexture && this.writeDepthTexture) ? (a.stencil = a.stencil || r.createRenderbuffer(), r.bindRenderbuffer(r.RENDERBUFFER, a.stencil), a.msaaBuffer ? r.renderbufferStorageMultisample(r.RENDERBUFFER, a.multisample, r.DEPTH24_STENCIL8, e.width, e.height) : r.renderbufferStorage(r.RENDERBUFFER, r.DEPTH_STENCIL, e.width, e.height), r.framebufferRenderbuffer(r.FRAMEBUFFER, r.DEPTH_STENCIL_ATTACHMENT, r.RENDERBUFFER, a.stencil)) : a.stencil && (r.deleteRenderbuffer(a.stencil), a.stencil = null);
    }, n.prototype.canMultisampleFramebuffer = function(e) {
      return this.renderer.context.webGLVersion !== 1 && e.colorTextures.length <= 1 && !e.depthTexture;
    }, n.prototype.detectSamples = function(e) {
      var t = this.msaaSamples, r = MSAA_QUALITY.NONE;
      if (e <= 1 || t === null)
        return r;
      for (var a = 0; a < t.length; a++)
        if (t[a] <= e) {
          r = t[a];
          break;
        }
      return r === 1 && (r = MSAA_QUALITY.NONE), r;
    }, n.prototype.blit = function(e, t, r) {
      var a = this, o = a.current, s = a.renderer, u = a.gl, h = a.CONTEXT_UID;
      if (s.context.webGLVersion === 2 && o) {
        var l = o.glFramebuffers[h];
        if (l) {
          if (!e) {
            if (!l.msaaBuffer)
              return;
            var c = o.colorTextures[0];
            if (!c)
              return;
            l.blitFramebuffer || (l.blitFramebuffer = new Framebuffer(o.width, o.height), l.blitFramebuffer.addColorTexture(0, c)), e = l.blitFramebuffer, e.colorTextures[0] !== c && (e.colorTextures[0] = c, e.dirtyId++, e.dirtyFormat++), (e.width !== o.width || e.height !== o.height) && (e.width = o.width, e.height = o.height, e.dirtyId++, e.dirtySize++);
          }
          t || (t = tempRectangle, t.width = o.width, t.height = o.height), r || (r = t);
          var v = t.width === r.width && t.height === r.height;
          this.bind(e), u.bindFramebuffer(u.READ_FRAMEBUFFER, l.framebuffer), u.blitFramebuffer(t.left, t.top, t.right, t.bottom, r.left, r.top, r.right, r.bottom, u.COLOR_BUFFER_BIT, v ? u.NEAREST : u.LINEAR);
        }
      }
    }, n.prototype.disposeFramebuffer = function(e, t) {
      var r = e.glFramebuffers[this.CONTEXT_UID], a = this.gl;
      if (r) {
        delete e.glFramebuffers[this.CONTEXT_UID];
        var o = this.managedFramebuffers.indexOf(e);
        o >= 0 && this.managedFramebuffers.splice(o, 1), e.disposeRunner.remove(this), t || (a.deleteFramebuffer(r.framebuffer), r.msaaBuffer && a.deleteRenderbuffer(r.msaaBuffer), r.stencil && a.deleteRenderbuffer(r.stencil)), r.blitFramebuffer && r.blitFramebuffer.dispose();
      }
    }, n.prototype.disposeAll = function(e) {
      var t = this.managedFramebuffers;
      this.managedFramebuffers = [];
      for (var r = 0; r < t.length; r++)
        this.disposeFramebuffer(t[r], e);
    }, n.prototype.forceStencil = function() {
      var e = this.current;
      if (e) {
        var t = e.glFramebuffers[this.CONTEXT_UID];
        if (!(!t || t.stencil)) {
          e.stencil = !0;
          var r = e.width, a = e.height, o = this.gl, s = o.createRenderbuffer();
          o.bindRenderbuffer(o.RENDERBUFFER, s), t.msaaBuffer ? o.renderbufferStorageMultisample(o.RENDERBUFFER, t.multisample, o.DEPTH24_STENCIL8, r, a) : o.renderbufferStorage(o.RENDERBUFFER, o.DEPTH_STENCIL, r, a), t.stencil = s, o.framebufferRenderbuffer(o.FRAMEBUFFER, o.DEPTH_STENCIL_ATTACHMENT, o.RENDERBUFFER, s);
        }
      }
    }, n.prototype.reset = function() {
      this.current = this.unknownFramebuffer, this.viewport = new Rectangle();
    }, n.prototype.destroy = function() {
      this.renderer = null;
    }, n;
  }()
), byteSizeMap = { 5126: 4, 5123: 2, 5121: 1 }, GeometrySystem = (
  /** @class */
  function() {
    function n(e) {
      this.renderer = e, this._activeGeometry = null, this._activeVao = null, this.hasVao = !0, this.hasInstance = !0, this.canUseUInt32ElementIndex = !1, this.managedGeometries = {};
    }
    return n.prototype.contextChange = function() {
      this.disposeAll(!0);
      var e = this.gl = this.renderer.gl, t = this.renderer.context;
      if (this.CONTEXT_UID = this.renderer.CONTEXT_UID, t.webGLVersion !== 2) {
        var r = this.renderer.context.extensions.vertexArrayObject;
        settings.PREFER_ENV === ENV.WEBGL_LEGACY && (r = null), r ? (e.createVertexArray = function() {
          return r.createVertexArrayOES();
        }, e.bindVertexArray = function(o) {
          return r.bindVertexArrayOES(o);
        }, e.deleteVertexArray = function(o) {
          return r.deleteVertexArrayOES(o);
        }) : (this.hasVao = !1, e.createVertexArray = function() {
          return null;
        }, e.bindVertexArray = function() {
          return null;
        }, e.deleteVertexArray = function() {
          return null;
        });
      }
      if (t.webGLVersion !== 2) {
        var a = e.getExtension("ANGLE_instanced_arrays");
        a ? (e.vertexAttribDivisor = function(o, s) {
          return a.vertexAttribDivisorANGLE(o, s);
        }, e.drawElementsInstanced = function(o, s, u, h, l) {
          return a.drawElementsInstancedANGLE(o, s, u, h, l);
        }, e.drawArraysInstanced = function(o, s, u, h) {
          return a.drawArraysInstancedANGLE(o, s, u, h);
        }) : this.hasInstance = !1;
      }
      this.canUseUInt32ElementIndex = t.webGLVersion === 2 || !!t.extensions.uint32ElementIndex;
    }, n.prototype.bind = function(e, t) {
      t = t || this.renderer.shader.shader;
      var r = this.gl, a = e.glVertexArrayObjects[this.CONTEXT_UID], o = !1;
      a || (this.managedGeometries[e.id] = e, e.disposeRunner.add(this), e.glVertexArrayObjects[this.CONTEXT_UID] = a = {}, o = !0);
      var s = a[t.program.id] || this.initGeometryVao(e, t, o);
      this._activeGeometry = e, this._activeVao !== s && (this._activeVao = s, this.hasVao ? r.bindVertexArray(s) : this.activateVao(e, t.program)), this.updateBuffers();
    }, n.prototype.reset = function() {
      this.unbind();
    }, n.prototype.updateBuffers = function() {
      for (var e = this._activeGeometry, t = this.renderer.buffer, r = 0; r < e.buffers.length; r++) {
        var a = e.buffers[r];
        t.update(a);
      }
    }, n.prototype.checkCompatibility = function(e, t) {
      var r = e.attributes, a = t.attributeData;
      for (var o in a)
        if (!r[o])
          throw new Error('shader and geometry incompatible, geometry missing the "' + o + '" attribute');
    }, n.prototype.getSignature = function(e, t) {
      var r = e.attributes, a = t.attributeData, o = ["g", e.id];
      for (var s in r)
        a[s] && o.push(s, a[s].location);
      return o.join("-");
    }, n.prototype.initGeometryVao = function(e, t, r) {
      r === void 0 && (r = !0);
      var a = this.gl, o = this.CONTEXT_UID, s = this.renderer.buffer, u = t.program;
      u.glPrograms[o] || this.renderer.shader.generateProgram(t), this.checkCompatibility(e, u);
      var h = this.getSignature(e, u), l = e.glVertexArrayObjects[this.CONTEXT_UID], c = l[h];
      if (c)
        return l[u.id] = c, c;
      var v = e.buffers, d = e.attributes, g = {}, m = {};
      for (var _ in v)
        g[_] = 0, m[_] = 0;
      for (var _ in d)
        !d[_].size && u.attributeData[_] ? d[_].size = u.attributeData[_].size : d[_].size || console.warn("PIXI Geometry attribute '" + _ + "' size cannot be determined (likely the bound shader does not have the attribute)"), g[d[_].buffer] += d[_].size * byteSizeMap[d[_].type];
      for (var _ in d) {
        var y = d[_], b = y.size;
        y.stride === void 0 && (g[y.buffer] === b * byteSizeMap[y.type] ? y.stride = 0 : y.stride = g[y.buffer]), y.start === void 0 && (y.start = m[y.buffer], m[y.buffer] += b * byteSizeMap[y.type]);
      }
      c = a.createVertexArray(), a.bindVertexArray(c);
      for (var S = 0; S < v.length; S++) {
        var O = v[S];
        s.bind(O), r && O._glBuffers[o].refCount++;
      }
      return this.activateVao(e, u), this._activeVao = c, l[u.id] = c, l[h] = c, c;
    }, n.prototype.disposeGeometry = function(e, t) {
      var r;
      if (this.managedGeometries[e.id]) {
        delete this.managedGeometries[e.id];
        var a = e.glVertexArrayObjects[this.CONTEXT_UID], o = this.gl, s = e.buffers, u = (r = this.renderer) === null || r === void 0 ? void 0 : r.buffer;
        if (e.disposeRunner.remove(this), !!a) {
          if (u)
            for (var h = 0; h < s.length; h++) {
              var l = s[h]._glBuffers[this.CONTEXT_UID];
              l && (l.refCount--, l.refCount === 0 && !t && u.dispose(s[h], t));
            }
          if (!t) {
            for (var c in a)
              if (c[0] === "g") {
                var v = a[c];
                this._activeVao === v && this.unbind(), o.deleteVertexArray(v);
              }
          }
          delete e.glVertexArrayObjects[this.CONTEXT_UID];
        }
      }
    }, n.prototype.disposeAll = function(e) {
      for (var t = Object.keys(this.managedGeometries), r = 0; r < t.length; r++)
        this.disposeGeometry(this.managedGeometries[t[r]], e);
    }, n.prototype.activateVao = function(e, t) {
      var r = this.gl, a = this.CONTEXT_UID, o = this.renderer.buffer, s = e.buffers, u = e.attributes;
      e.indexBuffer && o.bind(e.indexBuffer);
      var h = null;
      for (var l in u) {
        var c = u[l], v = s[c.buffer], d = v._glBuffers[a];
        if (t.attributeData[l]) {
          h !== d && (o.bind(v), h = d);
          var g = t.attributeData[l].location;
          if (r.enableVertexAttribArray(g), r.vertexAttribPointer(g, c.size, c.type || r.FLOAT, c.normalized, c.stride, c.start), c.instance)
            if (this.hasInstance)
              r.vertexAttribDivisor(g, 1);
            else
              throw new Error("geometry error, GPU Instancing is not supported on this device");
        }
      }
    }, n.prototype.draw = function(e, t, r, a) {
      var o = this.gl, s = this._activeGeometry;
      if (s.indexBuffer) {
        var u = s.indexBuffer.data.BYTES_PER_ELEMENT, h = u === 2 ? o.UNSIGNED_SHORT : o.UNSIGNED_INT;
        u === 2 || u === 4 && this.canUseUInt32ElementIndex ? s.instanced ? o.drawElementsInstanced(e, t || s.indexBuffer.data.length, h, (r || 0) * u, a || 1) : o.drawElements(e, t || s.indexBuffer.data.length, h, (r || 0) * u) : console.warn("unsupported index buffer type: uint32");
      } else s.instanced ? o.drawArraysInstanced(e, r, t || s.getSize(), a || 1) : o.drawArrays(e, r, t || s.getSize());
      return this;
    }, n.prototype.unbind = function() {
      this.gl.bindVertexArray(null), this._activeVao = null, this._activeGeometry = null;
    }, n.prototype.destroy = function() {
      this.renderer = null;
    }, n;
  }()
), MaskData = (
  /** @class */
  function() {
    function n(e) {
      e === void 0 && (e = null), this.type = MASK_TYPES.NONE, this.autoDetect = !0, this.maskObject = e || null, this.pooled = !1, this.isMaskData = !0, this.resolution = null, this.multisample = settings.FILTER_MULTISAMPLE, this.enabled = !0, this.colorMask = 15, this._filters = null, this._stencilCounter = 0, this._scissorCounter = 0, this._scissorRect = null, this._scissorRectLocal = null, this._colorMask = 15, this._target = null;
    }
    return Object.defineProperty(n.prototype, "filter", {
      /**
       * The sprite mask filter.
       * If set to `null`, the default sprite mask filter is used.
       * @default null
       */
      get: function() {
        return this._filters ? this._filters[0] : null;
      },
      set: function(e) {
        e ? this._filters ? this._filters[0] = e : this._filters = [e] : this._filters = null;
      },
      enumerable: !1,
      configurable: !0
    }), n.prototype.reset = function() {
      this.pooled && (this.maskObject = null, this.type = MASK_TYPES.NONE, this.autoDetect = !0), this._target = null, this._scissorRectLocal = null;
    }, n.prototype.copyCountersOrReset = function(e) {
      e ? (this._stencilCounter = e._stencilCounter, this._scissorCounter = e._scissorCounter, this._scissorRect = e._scissorRect) : (this._stencilCounter = 0, this._scissorCounter = 0, this._scissorRect = null);
    }, n;
  }()
);
function compileShader(n, e, t) {
  var r = n.createShader(e);
  return n.shaderSource(r, t), n.compileShader(r), r;
}
function logPrettyShaderError(n, e) {
  var t = n.getShaderSource(e).split(`
`).map(function(l, c) {
    return c + ": " + l;
  }), r = n.getShaderInfoLog(e), a = r.split(`
`), o = {}, s = a.map(function(l) {
    return parseFloat(l.replace(/^ERROR\: 0\:([\d]+)\:.*$/, "$1"));
  }).filter(function(l) {
    return l && !o[l] ? (o[l] = !0, !0) : !1;
  }), u = [""];
  s.forEach(function(l) {
    t[l - 1] = "%c" + t[l - 1] + "%c", u.push("background: #FF0000; color:#FFFFFF; font-size: 10px", "font-size: 10px");
  });
  var h = t.join(`
`);
  u[0] = h, console.error(r), console.groupCollapsed("click to view full shader code"), console.warn.apply(console, u), console.groupEnd();
}
function logProgramError(n, e, t, r) {
  n.getProgramParameter(e, n.LINK_STATUS) || (n.getShaderParameter(t, n.COMPILE_STATUS) || logPrettyShaderError(n, t), n.getShaderParameter(r, n.COMPILE_STATUS) || logPrettyShaderError(n, r), console.error("PixiJS Error: Could not initialize shader."), n.getProgramInfoLog(e) !== "" && console.warn("PixiJS Warning: gl.getProgramInfoLog()", n.getProgramInfoLog(e)));
}
function booleanArray(n) {
  for (var e = new Array(n), t = 0; t < e.length; t++)
    e[t] = !1;
  return e;
}
function defaultValue(n, e) {
  switch (n) {
    case "float":
      return 0;
    case "vec2":
      return new Float32Array(2 * e);
    case "vec3":
      return new Float32Array(3 * e);
    case "vec4":
      return new Float32Array(4 * e);
    case "int":
    case "uint":
    case "sampler2D":
    case "sampler2DArray":
      return 0;
    case "ivec2":
      return new Int32Array(2 * e);
    case "ivec3":
      return new Int32Array(3 * e);
    case "ivec4":
      return new Int32Array(4 * e);
    case "uvec2":
      return new Uint32Array(2 * e);
    case "uvec3":
      return new Uint32Array(3 * e);
    case "uvec4":
      return new Uint32Array(4 * e);
    case "bool":
      return !1;
    case "bvec2":
      return booleanArray(2 * e);
    case "bvec3":
      return booleanArray(3 * e);
    case "bvec4":
      return booleanArray(4 * e);
    case "mat2":
      return new Float32Array([
        1,
        0,
        0,
        1
      ]);
    case "mat3":
      return new Float32Array([
        1,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        1
      ]);
    case "mat4":
      return new Float32Array([
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1
      ]);
  }
  return null;
}
var unknownContext = {}, context = unknownContext;
function getTestContext() {
  if (context === unknownContext || context && context.isContextLost()) {
    var n = settings.ADAPTER.createCanvas(), e = void 0;
    settings.PREFER_ENV >= ENV.WEBGL2 && (e = n.getContext("webgl2", {})), e || (e = n.getContext("webgl", {}) || n.getContext("experimental-webgl", {}), e ? e.getExtension("WEBGL_draw_buffers") : e = null), context = e;
  }
  return context;
}
var maxFragmentPrecision;
function getMaxFragmentPrecision() {
  if (!maxFragmentPrecision) {
    maxFragmentPrecision = PRECISION.MEDIUM;
    var n = getTestContext();
    if (n && n.getShaderPrecisionFormat) {
      var e = n.getShaderPrecisionFormat(n.FRAGMENT_SHADER, n.HIGH_FLOAT);
      maxFragmentPrecision = e.precision ? PRECISION.HIGH : PRECISION.MEDIUM;
    }
  }
  return maxFragmentPrecision;
}
function setPrecision(n, e, t) {
  if (n.substring(0, 9) !== "precision") {
    var r = e;
    return e === PRECISION.HIGH && t !== PRECISION.HIGH && (r = PRECISION.MEDIUM), "precision " + r + ` float;
` + n;
  } else if (t !== PRECISION.HIGH && n.substring(0, 15) === "precision highp")
    return n.replace("precision highp", "precision mediump");
  return n;
}
var GLSL_TO_SIZE = {
  float: 1,
  vec2: 2,
  vec3: 3,
  vec4: 4,
  int: 1,
  ivec2: 2,
  ivec3: 3,
  ivec4: 4,
  uint: 1,
  uvec2: 2,
  uvec3: 3,
  uvec4: 4,
  bool: 1,
  bvec2: 2,
  bvec3: 3,
  bvec4: 4,
  mat2: 4,
  mat3: 9,
  mat4: 16,
  sampler2D: 1
};
function mapSize(n) {
  return GLSL_TO_SIZE[n];
}
var GL_TABLE = null, GL_TO_GLSL_TYPES = {
  FLOAT: "float",
  FLOAT_VEC2: "vec2",
  FLOAT_VEC3: "vec3",
  FLOAT_VEC4: "vec4",
  INT: "int",
  INT_VEC2: "ivec2",
  INT_VEC3: "ivec3",
  INT_VEC4: "ivec4",
  UNSIGNED_INT: "uint",
  UNSIGNED_INT_VEC2: "uvec2",
  UNSIGNED_INT_VEC3: "uvec3",
  UNSIGNED_INT_VEC4: "uvec4",
  BOOL: "bool",
  BOOL_VEC2: "bvec2",
  BOOL_VEC3: "bvec3",
  BOOL_VEC4: "bvec4",
  FLOAT_MAT2: "mat2",
  FLOAT_MAT3: "mat3",
  FLOAT_MAT4: "mat4",
  SAMPLER_2D: "sampler2D",
  INT_SAMPLER_2D: "sampler2D",
  UNSIGNED_INT_SAMPLER_2D: "sampler2D",
  SAMPLER_CUBE: "samplerCube",
  INT_SAMPLER_CUBE: "samplerCube",
  UNSIGNED_INT_SAMPLER_CUBE: "samplerCube",
  SAMPLER_2D_ARRAY: "sampler2DArray",
  INT_SAMPLER_2D_ARRAY: "sampler2DArray",
  UNSIGNED_INT_SAMPLER_2D_ARRAY: "sampler2DArray"
};
function mapType(n, e) {
  if (!GL_TABLE) {
    var t = Object.keys(GL_TO_GLSL_TYPES);
    GL_TABLE = {};
    for (var r = 0; r < t.length; ++r) {
      var a = t[r];
      GL_TABLE[n[a]] = GL_TO_GLSL_TYPES[a];
    }
  }
  return GL_TABLE[e];
}
var uniformParsers = [
  // a float cache layer
  {
    test: function(n) {
      return n.type === "float" && n.size === 1 && !n.isArray;
    },
    code: function(n) {
      return `
            if(uv["` + n + '"] !== ud["' + n + `"].value)
            {
                ud["` + n + '"].value = uv["' + n + `"]
                gl.uniform1f(ud["` + n + '"].location, uv["' + n + `"])
            }
            `;
    }
  },
  // handling samplers
  {
    test: function(n, e) {
      return (n.type === "sampler2D" || n.type === "samplerCube" || n.type === "sampler2DArray") && n.size === 1 && !n.isArray && (e == null || e.castToBaseTexture !== void 0);
    },
    code: function(n) {
      return `t = syncData.textureCount++;

            renderer.texture.bind(uv["` + n + `"], t);

            if(ud["` + n + `"].value !== t)
            {
                ud["` + n + `"].value = t;
                gl.uniform1i(ud["` + n + `"].location, t);
; // eslint-disable-line max-len
            }`;
    }
  },
  // uploading pixi matrix object to mat3
  {
    test: function(n, e) {
      return n.type === "mat3" && n.size === 1 && !n.isArray && e.a !== void 0;
    },
    code: function(n) {
      return `
            gl.uniformMatrix3fv(ud["` + n + '"].location, false, uv["' + n + `"].toArray(true));
            `;
    },
    codeUbo: function(n) {
      return `
                var ` + n + "_matrix = uv." + n + `.toArray(true);

                data[offset] = ` + n + `_matrix[0];
                data[offset+1] = ` + n + `_matrix[1];
                data[offset+2] = ` + n + `_matrix[2];
        
                data[offset + 4] = ` + n + `_matrix[3];
                data[offset + 5] = ` + n + `_matrix[4];
                data[offset + 6] = ` + n + `_matrix[5];
        
                data[offset + 8] = ` + n + `_matrix[6];
                data[offset + 9] = ` + n + `_matrix[7];
                data[offset + 10] = ` + n + `_matrix[8];
            `;
    }
  },
  // uploading a pixi point as a vec2 with caching layer
  {
    test: function(n, e) {
      return n.type === "vec2" && n.size === 1 && !n.isArray && e.x !== void 0;
    },
    code: function(n) {
      return `
                cv = ud["` + n + `"].value;
                v = uv["` + n + `"];

                if(cv[0] !== v.x || cv[1] !== v.y)
                {
                    cv[0] = v.x;
                    cv[1] = v.y;
                    gl.uniform2f(ud["` + n + `"].location, v.x, v.y);
                }`;
    },
    codeUbo: function(n) {
      return `
                v = uv.` + n + `;

                data[offset] = v.x;
                data[offset+1] = v.y;
            `;
    }
  },
  // caching layer for a vec2
  {
    test: function(n) {
      return n.type === "vec2" && n.size === 1 && !n.isArray;
    },
    code: function(n) {
      return `
                cv = ud["` + n + `"].value;
                v = uv["` + n + `"];

                if(cv[0] !== v[0] || cv[1] !== v[1])
                {
                    cv[0] = v[0];
                    cv[1] = v[1];
                    gl.uniform2f(ud["` + n + `"].location, v[0], v[1]);
                }
            `;
    }
  },
  // upload a pixi rectangle as a vec4 with caching layer
  {
    test: function(n, e) {
      return n.type === "vec4" && n.size === 1 && !n.isArray && e.width !== void 0;
    },
    code: function(n) {
      return `
                cv = ud["` + n + `"].value;
                v = uv["` + n + `"];

                if(cv[0] !== v.x || cv[1] !== v.y || cv[2] !== v.width || cv[3] !== v.height)
                {
                    cv[0] = v.x;
                    cv[1] = v.y;
                    cv[2] = v.width;
                    cv[3] = v.height;
                    gl.uniform4f(ud["` + n + `"].location, v.x, v.y, v.width, v.height)
                }`;
    },
    codeUbo: function(n) {
      return `
                    v = uv.` + n + `;

                    data[offset] = v.x;
                    data[offset+1] = v.y;
                    data[offset+2] = v.width;
                    data[offset+3] = v.height;
                `;
    }
  },
  // a caching layer for vec4 uploading
  {
    test: function(n) {
      return n.type === "vec4" && n.size === 1 && !n.isArray;
    },
    code: function(n) {
      return `
                cv = ud["` + n + `"].value;
                v = uv["` + n + `"];

                if(cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])
                {
                    cv[0] = v[0];
                    cv[1] = v[1];
                    cv[2] = v[2];
                    cv[3] = v[3];

                    gl.uniform4f(ud["` + n + `"].location, v[0], v[1], v[2], v[3])
                }`;
    }
  }
], GLSL_TO_SINGLE_SETTERS_CACHED = {
  float: `
    if (cv !== v)
    {
        cu.value = v;
        gl.uniform1f(location, v);
    }`,
  vec2: `
    if (cv[0] !== v[0] || cv[1] !== v[1])
    {
        cv[0] = v[0];
        cv[1] = v[1];

        gl.uniform2f(location, v[0], v[1])
    }`,
  vec3: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];

        gl.uniform3f(location, v[0], v[1], v[2])
    }`,
  vec4: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];
        cv[3] = v[3];

        gl.uniform4f(location, v[0], v[1], v[2], v[3]);
    }`,
  int: `
    if (cv !== v)
    {
        cu.value = v;

        gl.uniform1i(location, v);
    }`,
  ivec2: `
    if (cv[0] !== v[0] || cv[1] !== v[1])
    {
        cv[0] = v[0];
        cv[1] = v[1];

        gl.uniform2i(location, v[0], v[1]);
    }`,
  ivec3: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];

        gl.uniform3i(location, v[0], v[1], v[2]);
    }`,
  ivec4: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];
        cv[3] = v[3];

        gl.uniform4i(location, v[0], v[1], v[2], v[3]);
    }`,
  uint: `
    if (cv !== v)
    {
        cu.value = v;

        gl.uniform1ui(location, v);
    }`,
  uvec2: `
    if (cv[0] !== v[0] || cv[1] !== v[1])
    {
        cv[0] = v[0];
        cv[1] = v[1];

        gl.uniform2ui(location, v[0], v[1]);
    }`,
  uvec3: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];

        gl.uniform3ui(location, v[0], v[1], v[2]);
    }`,
  uvec4: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];
        cv[3] = v[3];

        gl.uniform4ui(location, v[0], v[1], v[2], v[3]);
    }`,
  bool: `
    if (cv !== v)
    {
        cu.value = v;
        gl.uniform1i(location, v);
    }`,
  bvec2: `
    if (cv[0] != v[0] || cv[1] != v[1])
    {
        cv[0] = v[0];
        cv[1] = v[1];

        gl.uniform2i(location, v[0], v[1]);
    }`,
  bvec3: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];

        gl.uniform3i(location, v[0], v[1], v[2]);
    }`,
  bvec4: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];
        cv[3] = v[3];

        gl.uniform4i(location, v[0], v[1], v[2], v[3]);
    }`,
  mat2: "gl.uniformMatrix2fv(location, false, v)",
  mat3: "gl.uniformMatrix3fv(location, false, v)",
  mat4: "gl.uniformMatrix4fv(location, false, v)",
  sampler2D: `
    if (cv !== v)
    {
        cu.value = v;

        gl.uniform1i(location, v);
    }`,
  samplerCube: `
    if (cv !== v)
    {
        cu.value = v;

        gl.uniform1i(location, v);
    }`,
  sampler2DArray: `
    if (cv !== v)
    {
        cu.value = v;

        gl.uniform1i(location, v);
    }`
}, GLSL_TO_ARRAY_SETTERS = {
  float: "gl.uniform1fv(location, v)",
  vec2: "gl.uniform2fv(location, v)",
  vec3: "gl.uniform3fv(location, v)",
  vec4: "gl.uniform4fv(location, v)",
  mat4: "gl.uniformMatrix4fv(location, false, v)",
  mat3: "gl.uniformMatrix3fv(location, false, v)",
  mat2: "gl.uniformMatrix2fv(location, false, v)",
  int: "gl.uniform1iv(location, v)",
  ivec2: "gl.uniform2iv(location, v)",
  ivec3: "gl.uniform3iv(location, v)",
  ivec4: "gl.uniform4iv(location, v)",
  uint: "gl.uniform1uiv(location, v)",
  uvec2: "gl.uniform2uiv(location, v)",
  uvec3: "gl.uniform3uiv(location, v)",
  uvec4: "gl.uniform4uiv(location, v)",
  bool: "gl.uniform1iv(location, v)",
  bvec2: "gl.uniform2iv(location, v)",
  bvec3: "gl.uniform3iv(location, v)",
  bvec4: "gl.uniform4iv(location, v)",
  sampler2D: "gl.uniform1iv(location, v)",
  samplerCube: "gl.uniform1iv(location, v)",
  sampler2DArray: "gl.uniform1iv(location, v)"
};
function generateUniformsSync(n, e) {
  var t, r = [`
        var v = null;
        var cv = null;
        var cu = null;
        var t = 0;
        var gl = renderer.gl;
    `];
  for (var a in n.uniforms) {
    var o = e[a];
    if (!o) {
      !((t = n.uniforms[a]) === null || t === void 0) && t.group && (n.uniforms[a].ubo ? r.push(`
                        renderer.shader.syncUniformBufferGroup(uv.` + a + ", '" + a + `');
                    `) : r.push(`
                        renderer.shader.syncUniformGroup(uv.` + a + `, syncData);
                    `));
      continue;
    }
    for (var s = n.uniforms[a], u = !1, h = 0; h < uniformParsers.length; h++)
      if (uniformParsers[h].test(o, s)) {
        r.push(uniformParsers[h].code(a, s)), u = !0;
        break;
      }
    if (!u) {
      var l = o.size === 1 && !o.isArray ? GLSL_TO_SINGLE_SETTERS_CACHED : GLSL_TO_ARRAY_SETTERS, c = l[o.type].replace("location", 'ud["' + a + '"].location');
      r.push(`
            cu = ud["` + a + `"];
            cv = cu.value;
            v = uv["` + a + `"];
            ` + c + ";");
    }
  }
  return new Function("ud", "uv", "renderer", "syncData", r.join(`
`));
}
var fragTemplate$1 = [
  "precision mediump float;",
  "void main(void){",
  "float test = 0.1;",
  "%forloop%",
  "gl_FragColor = vec4(0.0);",
  "}"
].join(`
`);
function generateIfTestSrc(n) {
  for (var e = "", t = 0; t < n; ++t)
    t > 0 && (e += `
else `), t < n - 1 && (e += "if(test == " + t + ".0){}");
  return e;
}
function checkMaxIfStatementsInShader(n, e) {
  if (n === 0)
    throw new Error("Invalid value of `0` passed to `checkMaxIfStatementsInShader`");
  for (var t = e.createShader(e.FRAGMENT_SHADER); ; ) {
    var r = fragTemplate$1.replace(/%forloop%/gi, generateIfTestSrc(n));
    if (e.shaderSource(t, r), e.compileShader(t), !e.getShaderParameter(t, e.COMPILE_STATUS))
      n = n / 2 | 0;
    else
      break;
  }
  return n;
}
var unsafeEval;
function unsafeEvalSupported() {
  if (typeof unsafeEval == "boolean")
    return unsafeEval;
  try {
    var n = new Function("param1", "param2", "param3", "return param1[param2] === param3;");
    unsafeEval = n({ a: "b" }, "a", "b") === !0;
  } catch {
    unsafeEval = !1;
  }
  return unsafeEval;
}
var defaultFragment$2 = `varying vec2 vTextureCoord;

uniform sampler2D uSampler;

void main(void){
   gl_FragColor *= texture2D(uSampler, vTextureCoord);
}`, defaultVertex$3 = `attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;

void main(void){
   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
   vTextureCoord = aTextureCoord;
}
`, UID$1 = 0, nameCache = {}, Program = (
  /** @class */
  function() {
    function n(e, t, r) {
      r === void 0 && (r = "pixi-shader"), this.id = UID$1++, this.vertexSrc = e || n.defaultVertexSrc, this.fragmentSrc = t || n.defaultFragmentSrc, this.vertexSrc = this.vertexSrc.trim(), this.fragmentSrc = this.fragmentSrc.trim(), this.vertexSrc.substring(0, 8) !== "#version" && (r = r.replace(/\s+/g, "-"), nameCache[r] ? (nameCache[r]++, r += "-" + nameCache[r]) : nameCache[r] = 1, this.vertexSrc = "#define SHADER_NAME " + r + `
` + this.vertexSrc, this.fragmentSrc = "#define SHADER_NAME " + r + `
` + this.fragmentSrc, this.vertexSrc = setPrecision(this.vertexSrc, settings.PRECISION_VERTEX, PRECISION.HIGH), this.fragmentSrc = setPrecision(this.fragmentSrc, settings.PRECISION_FRAGMENT, getMaxFragmentPrecision())), this.glPrograms = {}, this.syncUniforms = null;
    }
    return Object.defineProperty(n, "defaultVertexSrc", {
      /**
       * The default vertex shader source.
       * @constant
       */
      get: function() {
        return defaultVertex$3;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n, "defaultFragmentSrc", {
      /**
       * The default fragment shader source.
       * @constant
       */
      get: function() {
        return defaultFragment$2;
      },
      enumerable: !1,
      configurable: !0
    }), n.from = function(e, t, r) {
      var a = e + t, o = ProgramCache[a];
      return o || (ProgramCache[a] = o = new n(e, t, r)), o;
    }, n;
  }()
), Shader = (
  /** @class */
  function() {
    function n(e, t) {
      this.uniformBindCount = 0, this.program = e, t ? t instanceof UniformGroup ? this.uniformGroup = t : this.uniformGroup = new UniformGroup(t) : this.uniformGroup = new UniformGroup({}), this.disposeRunner = new Runner("disposeShader");
    }
    return n.prototype.checkUniformExists = function(e, t) {
      if (t.uniforms[e])
        return !0;
      for (var r in t.uniforms) {
        var a = t.uniforms[r];
        if (a.group && this.checkUniformExists(e, a))
          return !0;
      }
      return !1;
    }, n.prototype.destroy = function() {
      this.uniformGroup = null, this.disposeRunner.emit(this), this.disposeRunner.destroy();
    }, Object.defineProperty(n.prototype, "uniforms", {
      /**
       * Shader uniform values, shortcut for `uniformGroup.uniforms`.
       * @readonly
       */
      get: function() {
        return this.uniformGroup.uniforms;
      },
      enumerable: !1,
      configurable: !0
    }), n.from = function(e, t, r) {
      var a = Program.from(e, t);
      return new n(a, r);
    }, n;
  }()
), BLEND$1 = 0, OFFSET$1 = 1, CULLING$1 = 2, DEPTH_TEST$1 = 3, WINDING$1 = 4, DEPTH_MASK$1 = 5, State = (
  /** @class */
  function() {
    function n() {
      this.data = 0, this.blendMode = BLEND_MODES.NORMAL, this.polygonOffset = 0, this.blend = !0, this.depthMask = !0;
    }
    return Object.defineProperty(n.prototype, "blend", {
      /**
       * Activates blending of the computed fragment color values.
       * @default true
       */
      get: function() {
        return !!(this.data & 1 << BLEND$1);
      },
      set: function(e) {
        !!(this.data & 1 << BLEND$1) !== e && (this.data ^= 1 << BLEND$1);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n.prototype, "offsets", {
      /**
       * Activates adding an offset to depth values of polygon's fragments
       * @default false
       */
      get: function() {
        return !!(this.data & 1 << OFFSET$1);
      },
      set: function(e) {
        !!(this.data & 1 << OFFSET$1) !== e && (this.data ^= 1 << OFFSET$1);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n.prototype, "culling", {
      /**
       * Activates culling of polygons.
       * @default false
       */
      get: function() {
        return !!(this.data & 1 << CULLING$1);
      },
      set: function(e) {
        !!(this.data & 1 << CULLING$1) !== e && (this.data ^= 1 << CULLING$1);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n.prototype, "depthTest", {
      /**
       * Activates depth comparisons and updates to the depth buffer.
       * @default false
       */
      get: function() {
        return !!(this.data & 1 << DEPTH_TEST$1);
      },
      set: function(e) {
        !!(this.data & 1 << DEPTH_TEST$1) !== e && (this.data ^= 1 << DEPTH_TEST$1);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n.prototype, "depthMask", {
      /**
       * Enables or disables writing to the depth buffer.
       * @default true
       */
      get: function() {
        return !!(this.data & 1 << DEPTH_MASK$1);
      },
      set: function(e) {
        !!(this.data & 1 << DEPTH_MASK$1) !== e && (this.data ^= 1 << DEPTH_MASK$1);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n.prototype, "clockwiseFrontFace", {
      /**
       * Specifies whether or not front or back-facing polygons can be culled.
       * @default false
       */
      get: function() {
        return !!(this.data & 1 << WINDING$1);
      },
      set: function(e) {
        !!(this.data & 1 << WINDING$1) !== e && (this.data ^= 1 << WINDING$1);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n.prototype, "blendMode", {
      /**
       * The blend mode to be applied when this state is set. Apply a value of `PIXI.BLEND_MODES.NORMAL` to reset the blend mode.
       * Setting this mode to anything other than NO_BLEND will automatically switch blending on.
       * @default PIXI.BLEND_MODES.NORMAL
       */
      get: function() {
        return this._blendMode;
      },
      set: function(e) {
        this.blend = e !== BLEND_MODES.NONE, this._blendMode = e;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n.prototype, "polygonOffset", {
      /**
       * The polygon offset. Setting this property to anything other than 0 will automatically enable polygon offset fill.
       * @default 0
       */
      get: function() {
        return this._polygonOffset;
      },
      set: function(e) {
        this.offsets = !!e, this._polygonOffset = e;
      },
      enumerable: !1,
      configurable: !0
    }), n.prototype.toString = function() {
      return "[@pixi/core:State " + ("blendMode=" + this.blendMode + " ") + ("clockwiseFrontFace=" + this.clockwiseFrontFace + " ") + ("culling=" + this.culling + " ") + ("depthMask=" + this.depthMask + " ") + ("polygonOffset=" + this.polygonOffset) + "]";
    }, n.for2d = function() {
      var e = new n();
      return e.depthTest = !1, e.blend = !0, e;
    }, n;
  }()
), defaultFragment$1 = `varying vec2 vTextureCoord;

uniform sampler2D uSampler;

void main(void){
   gl_FragColor = texture2D(uSampler, vTextureCoord);
}
`, defaultVertex$2 = `attribute vec2 aVertexPosition;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;

uniform vec4 inputSize;
uniform vec4 outputFrame;

vec4 filterVertexPosition( void )
{
    vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;

    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);
}

vec2 filterTextureCoord( void )
{
    return aVertexPosition * (outputFrame.zw * inputSize.zw);
}

void main(void)
{
    gl_Position = filterVertexPosition();
    vTextureCoord = filterTextureCoord();
}
`, Filter = (
  /** @class */
  function(n) {
    __extends$i(e, n);
    function e(t, r, a) {
      var o = this, s = Program.from(t || e.defaultVertexSrc, r || e.defaultFragmentSrc);
      return o = n.call(this, s, a) || this, o.padding = 0, o.resolution = settings.FILTER_RESOLUTION, o.multisample = settings.FILTER_MULTISAMPLE, o.enabled = !0, o.autoFit = !0, o.state = new State(), o;
    }
    return e.prototype.apply = function(t, r, a, o, s) {
      t.applyFilter(this, r, a, o);
    }, Object.defineProperty(e.prototype, "blendMode", {
      /**
       * Sets the blend mode of the filter.
       * @default PIXI.BLEND_MODES.NORMAL
       */
      get: function() {
        return this.state.blendMode;
      },
      set: function(t) {
        this.state.blendMode = t;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "resolution", {
      /**
       * The resolution of the filter. Setting this to be lower will lower the quality but
       * increase the performance of the filter.
       */
      get: function() {
        return this._resolution;
      },
      set: function(t) {
        this._resolution = t;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e, "defaultVertexSrc", {
      /**
       * The default vertex shader source
       * @constant
       */
      get: function() {
        return defaultVertex$2;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e, "defaultFragmentSrc", {
      /**
       * The default fragment shader source
       * @constant
       */
      get: function() {
        return defaultFragment$1;
      },
      enumerable: !1,
      configurable: !0
    }), e;
  }(Shader)
), vertex$4 = `attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;
uniform mat3 otherMatrix;

varying vec2 vMaskCoord;
varying vec2 vTextureCoord;

void main(void)
{
    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);

    vTextureCoord = aTextureCoord;
    vMaskCoord = ( otherMatrix * vec3( aTextureCoord, 1.0)  ).xy;
}
`, fragment$7 = `varying vec2 vMaskCoord;
varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D mask;
uniform float alpha;
uniform float npmAlpha;
uniform vec4 maskClamp;

void main(void)
{
    float clip = step(3.5,
        step(maskClamp.x, vMaskCoord.x) +
        step(maskClamp.y, vMaskCoord.y) +
        step(vMaskCoord.x, maskClamp.z) +
        step(vMaskCoord.y, maskClamp.w));

    vec4 original = texture2D(uSampler, vTextureCoord);
    vec4 masky = texture2D(mask, vMaskCoord);
    float alphaMul = 1.0 - npmAlpha * (1.0 - masky.a);

    original *= (alphaMul * masky.r * alpha * clip);

    gl_FragColor = original;
}
`, tempMat$1 = new Matrix(), TextureMatrix = (
  /** @class */
  function() {
    function n(e, t) {
      this._texture = e, this.mapCoord = new Matrix(), this.uClampFrame = new Float32Array(4), this.uClampOffset = new Float32Array(2), this._textureID = -1, this._updateID = 0, this.clampOffset = 0, this.clampMargin = typeof t > "u" ? 0.5 : t, this.isSimple = !1;
    }
    return Object.defineProperty(n.prototype, "texture", {
      /** Texture property. */
      get: function() {
        return this._texture;
      },
      set: function(e) {
        this._texture = e, this._textureID = -1;
      },
      enumerable: !1,
      configurable: !0
    }), n.prototype.multiplyUvs = function(e, t) {
      t === void 0 && (t = e);
      for (var r = this.mapCoord, a = 0; a < e.length; a += 2) {
        var o = e[a], s = e[a + 1];
        t[a] = o * r.a + s * r.c + r.tx, t[a + 1] = o * r.b + s * r.d + r.ty;
      }
      return t;
    }, n.prototype.update = function(e) {
      var t = this._texture;
      if (!t || !t.valid || !e && this._textureID === t._updateID)
        return !1;
      this._textureID = t._updateID, this._updateID++;
      var r = t._uvs;
      this.mapCoord.set(r.x1 - r.x0, r.y1 - r.y0, r.x3 - r.x0, r.y3 - r.y0, r.x0, r.y0);
      var a = t.orig, o = t.trim;
      o && (tempMat$1.set(a.width / o.width, 0, 0, a.height / o.height, -o.x / o.width, -o.y / o.height), this.mapCoord.append(tempMat$1));
      var s = t.baseTexture, u = this.uClampFrame, h = this.clampMargin / s.resolution, l = this.clampOffset;
      return u[0] = (t._frame.x + h + l) / s.width, u[1] = (t._frame.y + h + l) / s.height, u[2] = (t._frame.x + t._frame.width - h + l) / s.width, u[3] = (t._frame.y + t._frame.height - h + l) / s.height, this.uClampOffset[0] = l / s.realWidth, this.uClampOffset[1] = l / s.realHeight, this.isSimple = t._frame.width === s.width && t._frame.height === s.height && t.rotate === 0, !0;
    }, n;
  }()
), SpriteMaskFilter = (
  /** @class */
  function(n) {
    __extends$i(e, n);
    function e(t, r, a) {
      var o = this, s = null;
      return typeof t != "string" && r === void 0 && a === void 0 && (s = t, t = void 0, r = void 0, a = void 0), o = n.call(this, t || vertex$4, r || fragment$7, a) || this, o.maskSprite = s, o.maskMatrix = new Matrix(), o;
    }
    return Object.defineProperty(e.prototype, "maskSprite", {
      /**
       * Sprite mask
       * @type {PIXI.DisplayObject}
       */
      get: function() {
        return this._maskSprite;
      },
      set: function(t) {
        this._maskSprite = t, this._maskSprite && (this._maskSprite.renderable = !1);
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.apply = function(t, r, a, o) {
      var s = this._maskSprite, u = s._texture;
      u.valid && (u.uvMatrix || (u.uvMatrix = new TextureMatrix(u, 0)), u.uvMatrix.update(), this.uniforms.npmAlpha = u.baseTexture.alphaMode ? 0 : 1, this.uniforms.mask = u, this.uniforms.otherMatrix = t.calculateSpriteMatrix(this.maskMatrix, s).prepend(u.uvMatrix.mapCoord), this.uniforms.alpha = s.worldAlpha, this.uniforms.maskClamp = u.uvMatrix.uClampFrame, t.applyFilter(this, r, a, o));
    }, e;
  }(Filter)
), MaskSystem = (
  /** @class */
  function() {
    function n(e) {
      this.renderer = e, this.enableScissor = !0, this.alphaMaskPool = [], this.maskDataPool = [], this.maskStack = [], this.alphaMaskIndex = 0;
    }
    return n.prototype.setMaskStack = function(e) {
      this.maskStack = e, this.renderer.scissor.setMaskStack(e), this.renderer.stencil.setMaskStack(e);
    }, n.prototype.push = function(e, t) {
      var r = t;
      if (!r.isMaskData) {
        var a = this.maskDataPool.pop() || new MaskData();
        a.pooled = !0, a.maskObject = t, r = a;
      }
      var o = this.maskStack.length !== 0 ? this.maskStack[this.maskStack.length - 1] : null;
      if (r.copyCountersOrReset(o), r._colorMask = o ? o._colorMask : 15, r.autoDetect && this.detect(r), r._target = e, r.type !== MASK_TYPES.SPRITE && this.maskStack.push(r), r.enabled)
        switch (r.type) {
          case MASK_TYPES.SCISSOR:
            this.renderer.scissor.push(r);
            break;
          case MASK_TYPES.STENCIL:
            this.renderer.stencil.push(r);
            break;
          case MASK_TYPES.SPRITE:
            r.copyCountersOrReset(null), this.pushSpriteMask(r);
            break;
          case MASK_TYPES.COLOR:
            this.pushColorMask(r);
            break;
        }
      r.type === MASK_TYPES.SPRITE && this.maskStack.push(r);
    }, n.prototype.pop = function(e) {
      var t = this.maskStack.pop();
      if (!(!t || t._target !== e)) {
        if (t.enabled)
          switch (t.type) {
            case MASK_TYPES.SCISSOR:
              this.renderer.scissor.pop(t);
              break;
            case MASK_TYPES.STENCIL:
              this.renderer.stencil.pop(t.maskObject);
              break;
            case MASK_TYPES.SPRITE:
              this.popSpriteMask(t);
              break;
            case MASK_TYPES.COLOR:
              this.popColorMask(t);
              break;
          }
        if (t.reset(), t.pooled && this.maskDataPool.push(t), this.maskStack.length !== 0) {
          var r = this.maskStack[this.maskStack.length - 1];
          r.type === MASK_TYPES.SPRITE && r._filters && (r._filters[0].maskSprite = r.maskObject);
        }
      }
    }, n.prototype.detect = function(e) {
      var t = e.maskObject;
      t ? t.isSprite ? e.type = MASK_TYPES.SPRITE : this.enableScissor && this.renderer.scissor.testScissor(e) ? e.type = MASK_TYPES.SCISSOR : e.type = MASK_TYPES.STENCIL : e.type = MASK_TYPES.COLOR;
    }, n.prototype.pushSpriteMask = function(e) {
      var t, r, a = e.maskObject, o = e._target, s = e._filters;
      s || (s = this.alphaMaskPool[this.alphaMaskIndex], s || (s = this.alphaMaskPool[this.alphaMaskIndex] = [new SpriteMaskFilter()]));
      var u = this.renderer, h = u.renderTexture, l, c;
      if (h.current) {
        var v = h.current;
        l = e.resolution || v.resolution, c = (t = e.multisample) !== null && t !== void 0 ? t : v.multisample;
      } else
        l = e.resolution || u.resolution, c = (r = e.multisample) !== null && r !== void 0 ? r : u.multisample;
      s[0].resolution = l, s[0].multisample = c, s[0].maskSprite = a;
      var d = o.filterArea;
      o.filterArea = a.getBounds(!0), u.filter.push(o, s), o.filterArea = d, e._filters || this.alphaMaskIndex++;
    }, n.prototype.popSpriteMask = function(e) {
      this.renderer.filter.pop(), e._filters ? e._filters[0].maskSprite = null : (this.alphaMaskIndex--, this.alphaMaskPool[this.alphaMaskIndex][0].maskSprite = null);
    }, n.prototype.pushColorMask = function(e) {
      var t = e._colorMask, r = e._colorMask = t & e.colorMask;
      r !== t && this.renderer.gl.colorMask((r & 1) !== 0, (r & 2) !== 0, (r & 4) !== 0, (r & 8) !== 0);
    }, n.prototype.popColorMask = function(e) {
      var t = e._colorMask, r = this.maskStack.length > 0 ? this.maskStack[this.maskStack.length - 1]._colorMask : 15;
      r !== t && this.renderer.gl.colorMask((r & 1) !== 0, (r & 2) !== 0, (r & 4) !== 0, (r & 8) !== 0);
    }, n.prototype.destroy = function() {
      this.renderer = null;
    }, n;
  }()
), AbstractMaskSystem = (
  /** @class */
  function() {
    function n(e) {
      this.renderer = e, this.maskStack = [], this.glConst = 0;
    }
    return n.prototype.getStackLength = function() {
      return this.maskStack.length;
    }, n.prototype.setMaskStack = function(e) {
      var t = this.renderer.gl, r = this.getStackLength();
      this.maskStack = e;
      var a = this.getStackLength();
      a !== r && (a === 0 ? t.disable(this.glConst) : (t.enable(this.glConst), this._useCurrent()));
    }, n.prototype._useCurrent = function() {
    }, n.prototype.destroy = function() {
      this.renderer = null, this.maskStack = null;
    }, n;
  }()
), tempMatrix$1 = new Matrix(), rectPool = [], ScissorSystem = (
  /** @class */
  function(n) {
    __extends$i(e, n);
    function e(t) {
      var r = n.call(this, t) || this;
      return r.glConst = settings.ADAPTER.getWebGLRenderingContext().SCISSOR_TEST, r;
    }
    return e.prototype.getStackLength = function() {
      var t = this.maskStack[this.maskStack.length - 1];
      return t ? t._scissorCounter : 0;
    }, e.prototype.calcScissorRect = function(t) {
      var r;
      if (!t._scissorRectLocal) {
        var a = t._scissorRect, o = t.maskObject, s = this.renderer, u = s.renderTexture, h = o.getBounds(!0, (r = rectPool.pop()) !== null && r !== void 0 ? r : new Rectangle());
        this.roundFrameToPixels(h, u.current ? u.current.resolution : s.resolution, u.sourceFrame, u.destinationFrame, s.projection.transform), a && h.fit(a), t._scissorRectLocal = h;
      }
    }, e.isMatrixRotated = function(t) {
      if (!t)
        return !1;
      var r = t.a, a = t.b, o = t.c, s = t.d;
      return (Math.abs(a) > 1e-4 || Math.abs(o) > 1e-4) && (Math.abs(r) > 1e-4 || Math.abs(s) > 1e-4);
    }, e.prototype.testScissor = function(t) {
      var r = t.maskObject;
      if (!r.isFastRect || !r.isFastRect() || e.isMatrixRotated(r.worldTransform) || e.isMatrixRotated(this.renderer.projection.transform))
        return !1;
      this.calcScissorRect(t);
      var a = t._scissorRectLocal;
      return a.width > 0 && a.height > 0;
    }, e.prototype.roundFrameToPixels = function(t, r, a, o, s) {
      e.isMatrixRotated(s) || (s = s ? tempMatrix$1.copyFrom(s) : tempMatrix$1.identity(), s.translate(-a.x, -a.y).scale(o.width / a.width, o.height / a.height).translate(o.x, o.y), this.renderer.filter.transformAABB(s, t), t.fit(o), t.x = Math.round(t.x * r), t.y = Math.round(t.y * r), t.width = Math.round(t.width * r), t.height = Math.round(t.height * r));
    }, e.prototype.push = function(t) {
      t._scissorRectLocal || this.calcScissorRect(t);
      var r = this.renderer.gl;
      t._scissorRect || r.enable(r.SCISSOR_TEST), t._scissorCounter++, t._scissorRect = t._scissorRectLocal, this._useCurrent();
    }, e.prototype.pop = function(t) {
      var r = this.renderer.gl;
      t && rectPool.push(t._scissorRectLocal), this.getStackLength() > 0 ? this._useCurrent() : r.disable(r.SCISSOR_TEST);
    }, e.prototype._useCurrent = function() {
      var t = this.maskStack[this.maskStack.length - 1]._scissorRect, r;
      this.renderer.renderTexture.current ? r = t.y : r = this.renderer.height - t.height - t.y, this.renderer.gl.scissor(t.x, r, t.width, t.height);
    }, e;
  }(AbstractMaskSystem)
), StencilSystem = (
  /** @class */
  function(n) {
    __extends$i(e, n);
    function e(t) {
      var r = n.call(this, t) || this;
      return r.glConst = settings.ADAPTER.getWebGLRenderingContext().STENCIL_TEST, r;
    }
    return e.prototype.getStackLength = function() {
      var t = this.maskStack[this.maskStack.length - 1];
      return t ? t._stencilCounter : 0;
    }, e.prototype.push = function(t) {
      var r = t.maskObject, a = this.renderer.gl, o = t._stencilCounter;
      o === 0 && (this.renderer.framebuffer.forceStencil(), a.clearStencil(0), a.clear(a.STENCIL_BUFFER_BIT), a.enable(a.STENCIL_TEST)), t._stencilCounter++;
      var s = t._colorMask;
      s !== 0 && (t._colorMask = 0, a.colorMask(!1, !1, !1, !1)), a.stencilFunc(a.EQUAL, o, 4294967295), a.stencilOp(a.KEEP, a.KEEP, a.INCR), r.renderable = !0, r.render(this.renderer), this.renderer.batch.flush(), r.renderable = !1, s !== 0 && (t._colorMask = s, a.colorMask((s & 1) !== 0, (s & 2) !== 0, (s & 4) !== 0, (s & 8) !== 0)), this._useCurrent();
    }, e.prototype.pop = function(t) {
      var r = this.renderer.gl;
      if (this.getStackLength() === 0)
        r.disable(r.STENCIL_TEST);
      else {
        var a = this.maskStack.length !== 0 ? this.maskStack[this.maskStack.length - 1] : null, o = a ? a._colorMask : 15;
        o !== 0 && (a._colorMask = 0, r.colorMask(!1, !1, !1, !1)), r.stencilOp(r.KEEP, r.KEEP, r.DECR), t.renderable = !0, t.render(this.renderer), this.renderer.batch.flush(), t.renderable = !1, o !== 0 && (a._colorMask = o, r.colorMask((o & 1) !== 0, (o & 2) !== 0, (o & 4) !== 0, (o & 8) !== 0)), this._useCurrent();
      }
    }, e.prototype._useCurrent = function() {
      var t = this.renderer.gl;
      t.stencilFunc(t.EQUAL, this.getStackLength(), 4294967295), t.stencilOp(t.KEEP, t.KEEP, t.KEEP);
    }, e;
  }(AbstractMaskSystem)
), ProjectionSystem = (
  /** @class */
  function() {
    function n(e) {
      this.renderer = e, this.destinationFrame = null, this.sourceFrame = null, this.defaultFrame = null, this.projectionMatrix = new Matrix(), this.transform = null;
    }
    return n.prototype.update = function(e, t, r, a) {
      this.destinationFrame = e || this.destinationFrame || this.defaultFrame, this.sourceFrame = t || this.sourceFrame || e, this.calculateProjection(this.destinationFrame, this.sourceFrame, r, a), this.transform && this.projectionMatrix.append(this.transform);
      var o = this.renderer;
      o.globalUniforms.uniforms.projectionMatrix = this.projectionMatrix, o.globalUniforms.update(), o.shader.shader && o.shader.syncUniformGroup(o.shader.shader.uniforms.globals);
    }, n.prototype.calculateProjection = function(e, t, r, a) {
      var o = this.projectionMatrix, s = a ? -1 : 1;
      o.identity(), o.a = 1 / t.width * 2, o.d = s * (1 / t.height * 2), o.tx = -1 - t.x * o.a, o.ty = -s - t.y * o.d;
    }, n.prototype.setTransform = function(e) {
    }, n.prototype.destroy = function() {
      this.renderer = null;
    }, n;
  }()
), tempRect = new Rectangle(), tempRect2 = new Rectangle(), RenderTextureSystem = (
  /** @class */
  function() {
    function n(e) {
      this.renderer = e, this.clearColor = e._backgroundColorRgba, this.defaultMaskStack = [], this.current = null, this.sourceFrame = new Rectangle(), this.destinationFrame = new Rectangle(), this.viewportFrame = new Rectangle();
    }
    return n.prototype.bind = function(e, t, r) {
      e === void 0 && (e = null);
      var a = this.renderer;
      this.current = e;
      var o, s, u;
      e ? (o = e.baseTexture, u = o.resolution, t || (tempRect.width = e.frame.width, tempRect.height = e.frame.height, t = tempRect), r || (tempRect2.x = e.frame.x, tempRect2.y = e.frame.y, tempRect2.width = t.width, tempRect2.height = t.height, r = tempRect2), s = o.framebuffer) : (u = a.resolution, t || (tempRect.width = a.screen.width, tempRect.height = a.screen.height, t = tempRect), r || (r = tempRect, r.width = t.width, r.height = t.height));
      var h = this.viewportFrame;
      h.x = r.x * u, h.y = r.y * u, h.width = r.width * u, h.height = r.height * u, e || (h.y = a.view.height - (h.y + h.height)), h.ceil(), this.renderer.framebuffer.bind(s, h), this.renderer.projection.update(r, t, u, !s), e ? this.renderer.mask.setMaskStack(o.maskStack) : this.renderer.mask.setMaskStack(this.defaultMaskStack), this.sourceFrame.copyFrom(t), this.destinationFrame.copyFrom(r);
    }, n.prototype.clear = function(e, t) {
      this.current ? e = e || this.current.baseTexture.clearColor : e = e || this.clearColor;
      var r = this.destinationFrame, a = this.current ? this.current.baseTexture : this.renderer.screen, o = r.width !== a.width || r.height !== a.height;
      if (o) {
        var s = this.viewportFrame, u = s.x, h = s.y, l = s.width, c = s.height;
        u = Math.round(u), h = Math.round(h), l = Math.round(l), c = Math.round(c), this.renderer.gl.enable(this.renderer.gl.SCISSOR_TEST), this.renderer.gl.scissor(u, h, l, c);
      }
      this.renderer.framebuffer.clear(e[0], e[1], e[2], e[3], t), o && this.renderer.scissor.pop();
    }, n.prototype.resize = function() {
      this.bind(null);
    }, n.prototype.reset = function() {
      this.bind(null);
    }, n.prototype.destroy = function() {
      this.renderer = null;
    }, n;
  }()
);
function uboUpdate(n, e, t, r, a) {
  t.buffer.update(a);
}
var UBO_TO_SINGLE_SETTERS = {
  float: `
        data[offset] = v;
    `,
  vec2: `
        data[offset] = v[0];
        data[offset+1] = v[1];
    `,
  vec3: `
        data[offset] = v[0];
        data[offset+1] = v[1];
        data[offset+2] = v[2];

    `,
  vec4: `
        data[offset] = v[0];
        data[offset+1] = v[1];
        data[offset+2] = v[2];
        data[offset+3] = v[3];
    `,
  mat2: `
        data[offset] = v[0];
        data[offset+1] = v[1];

        data[offset+4] = v[2];
        data[offset+5] = v[3];
    `,
  mat3: `
        data[offset] = v[0];
        data[offset+1] = v[1];
        data[offset+2] = v[2];

        data[offset + 4] = v[3];
        data[offset + 5] = v[4];
        data[offset + 6] = v[5];

        data[offset + 8] = v[6];
        data[offset + 9] = v[7];
        data[offset + 10] = v[8];
    `,
  mat4: `
        for(var i = 0; i < 16; i++)
        {
            data[offset + i] = v[i];
        }
    `
}, GLSL_TO_STD40_SIZE = {
  float: 4,
  vec2: 8,
  vec3: 12,
  vec4: 16,
  int: 4,
  ivec2: 8,
  ivec3: 12,
  ivec4: 16,
  uint: 4,
  uvec2: 8,
  uvec3: 12,
  uvec4: 16,
  bool: 4,
  bvec2: 8,
  bvec3: 12,
  bvec4: 16,
  mat2: 16 * 2,
  mat3: 16 * 3,
  mat4: 16 * 4
};
function createUBOElements(n) {
  for (var e = n.map(function(h) {
    return {
      data: h,
      offset: 0,
      dataLen: 0,
      dirty: 0
    };
  }), t = 0, r = 0, a = 0, o = 0; o < e.length; o++) {
    var s = e[o];
    if (t = GLSL_TO_STD40_SIZE[s.data.type], s.data.size > 1 && (t = Math.max(t, 16) * s.data.size), s.dataLen = t, r % t !== 0 && r < 16) {
      var u = r % t % 16;
      r += u, a += u;
    }
    r + t > 16 ? (a = Math.ceil(a / 16) * 16, s.offset = a, a += t, r = t) : (s.offset = a, r += t, a += t);
  }
  return a = Math.ceil(a / 16) * 16, { uboElements: e, size: a };
}
function getUBOData(n, e) {
  var t = [];
  for (var r in n)
    e[r] && t.push(e[r]);
  return t.sort(function(a, o) {
    return a.index - o.index;
  }), t;
}
function generateUniformBufferSync(n, e) {
  if (!n.autoManage)
    return { size: 0, syncFunc: uboUpdate };
  for (var t = getUBOData(n.uniforms, e), r = createUBOElements(t), a = r.uboElements, o = r.size, s = [`
    var v = null;
    var v2 = null;
    var cv = null;
    var t = 0;
    var gl = renderer.gl
    var index = 0;
    var data = buffer.data;
    `], u = 0; u < a.length; u++) {
    for (var h = a[u], l = n.uniforms[h.data.name], c = h.data.name, v = !1, d = 0; d < uniformParsers.length; d++) {
      var g = uniformParsers[d];
      if (g.codeUbo && g.test(h.data, l)) {
        s.push("offset = " + h.offset / 4 + ";", uniformParsers[d].codeUbo(h.data.name, l)), v = !0;
        break;
      }
    }
    if (!v)
      if (h.data.size > 1) {
        var m = mapSize(h.data.type), _ = Math.max(GLSL_TO_STD40_SIZE[h.data.type] / 16, 1), y = m / _, b = (4 - y % 4) % 4;
        s.push(`
                cv = ud.` + c + `.value;
                v = uv.` + c + `;
                offset = ` + h.offset / 4 + `;

                t = 0;

                for(var i=0; i < ` + h.data.size * _ + `; i++)
                {
                    for(var j = 0; j < ` + y + `; j++)
                    {
                        data[offset++] = v[t++];
                    }
                    offset += ` + b + `;
                }

                `);
      } else {
        var S = UBO_TO_SINGLE_SETTERS[h.data.type];
        s.push(`
                cv = ud.` + c + `.value;
                v = uv.` + c + `;
                offset = ` + h.offset / 4 + `;
                ` + S + `;
                `);
      }
  }
  return s.push(`
       renderer.buffer.update(buffer);
    `), {
    size: o,
    // eslint-disable-next-line no-new-func
    syncFunc: new Function("ud", "uv", "renderer", "syncData", "buffer", s.join(`
`))
  };
}
var GLProgram = (
  /** @class */
  function() {
    function n(e, t) {
      this.program = e, this.uniformData = t, this.uniformGroups = {}, this.uniformDirtyGroups = {}, this.uniformBufferBindings = {};
    }
    return n.prototype.destroy = function() {
      this.uniformData = null, this.uniformGroups = null, this.uniformDirtyGroups = null, this.uniformBufferBindings = null, this.program = null;
    }, n;
  }()
);
function getAttributeData(n, e) {
  for (var t = {}, r = e.getProgramParameter(n, e.ACTIVE_ATTRIBUTES), a = 0; a < r; a++) {
    var o = e.getActiveAttrib(n, a);
    if (o.name.indexOf("gl_") !== 0) {
      var s = mapType(e, o.type), u = {
        type: s,
        name: o.name,
        size: mapSize(s),
        location: e.getAttribLocation(n, o.name)
      };
      t[o.name] = u;
    }
  }
  return t;
}
function getUniformData(n, e) {
  for (var t = {}, r = e.getProgramParameter(n, e.ACTIVE_UNIFORMS), a = 0; a < r; a++) {
    var o = e.getActiveUniform(n, a), s = o.name.replace(/\[.*?\]$/, ""), u = !!o.name.match(/\[.*?\]$/), h = mapType(e, o.type);
    t[s] = {
      name: s,
      index: a,
      type: h,
      size: o.size,
      isArray: u,
      value: defaultValue(h, o.size)
    };
  }
  return t;
}
function generateProgram(n, e) {
  var t = compileShader(n, n.VERTEX_SHADER, e.vertexSrc), r = compileShader(n, n.FRAGMENT_SHADER, e.fragmentSrc), a = n.createProgram();
  if (n.attachShader(a, t), n.attachShader(a, r), n.linkProgram(a), n.getProgramParameter(a, n.LINK_STATUS) || logProgramError(n, a, t, r), e.attributeData = getAttributeData(a, n), e.uniformData = getUniformData(a, n), !/^[ \t]*#[ \t]*version[ \t]+300[ \t]+es[ \t]*$/m.test(e.vertexSrc)) {
    var o = Object.keys(e.attributeData);
    o.sort(function(c, v) {
      return c > v ? 1 : -1;
    });
    for (var s = 0; s < o.length; s++)
      e.attributeData[o[s]].location = s, n.bindAttribLocation(a, s, o[s]);
    n.linkProgram(a);
  }
  n.deleteShader(t), n.deleteShader(r);
  var u = {};
  for (var s in e.uniformData) {
    var h = e.uniformData[s];
    u[s] = {
      location: n.getUniformLocation(a, s),
      value: defaultValue(h.type, h.size)
    };
  }
  var l = new GLProgram(a, u);
  return l;
}
var UID = 0, defaultSyncData = { textureCount: 0, uboCount: 0 }, ShaderSystem = (
  /** @class */
  function() {
    function n(e) {
      this.destroyed = !1, this.renderer = e, this.systemCheck(), this.gl = null, this.shader = null, this.program = null, this.cache = {}, this._uboCache = {}, this.id = UID++;
    }
    return n.prototype.systemCheck = function() {
      if (!unsafeEvalSupported())
        throw new Error("Current environment does not allow unsafe-eval, please use @pixi/unsafe-eval module to enable support.");
    }, n.prototype.contextChange = function(e) {
      this.gl = e, this.reset();
    }, n.prototype.bind = function(e, t) {
      e.disposeRunner.add(this), e.uniforms.globals = this.renderer.globalUniforms;
      var r = e.program, a = r.glPrograms[this.renderer.CONTEXT_UID] || this.generateProgram(e);
      return this.shader = e, this.program !== r && (this.program = r, this.gl.useProgram(a.program)), t || (defaultSyncData.textureCount = 0, defaultSyncData.uboCount = 0, this.syncUniformGroup(e.uniformGroup, defaultSyncData)), a;
    }, n.prototype.setUniforms = function(e) {
      var t = this.shader.program, r = t.glPrograms[this.renderer.CONTEXT_UID];
      t.syncUniforms(r.uniformData, e, this.renderer);
    }, n.prototype.syncUniformGroup = function(e, t) {
      var r = this.getGlProgram();
      (!e.static || e.dirtyId !== r.uniformDirtyGroups[e.id]) && (r.uniformDirtyGroups[e.id] = e.dirtyId, this.syncUniforms(e, r, t));
    }, n.prototype.syncUniforms = function(e, t, r) {
      var a = e.syncUniforms[this.shader.program.id] || this.createSyncGroups(e);
      a(t.uniformData, e.uniforms, this.renderer, r);
    }, n.prototype.createSyncGroups = function(e) {
      var t = this.getSignature(e, this.shader.program.uniformData, "u");
      return this.cache[t] || (this.cache[t] = generateUniformsSync(e, this.shader.program.uniformData)), e.syncUniforms[this.shader.program.id] = this.cache[t], e.syncUniforms[this.shader.program.id];
    }, n.prototype.syncUniformBufferGroup = function(e, t) {
      var r = this.getGlProgram();
      if (!e.static || e.dirtyId !== 0 || !r.uniformGroups[e.id]) {
        e.dirtyId = 0;
        var a = r.uniformGroups[e.id] || this.createSyncBufferGroup(e, r, t);
        e.buffer.update(), a(r.uniformData, e.uniforms, this.renderer, defaultSyncData, e.buffer);
      }
      this.renderer.buffer.bindBufferBase(e.buffer, r.uniformBufferBindings[t]);
    }, n.prototype.createSyncBufferGroup = function(e, t, r) {
      var a = this.renderer.gl;
      this.renderer.buffer.bind(e.buffer);
      var o = this.gl.getUniformBlockIndex(t.program, r);
      t.uniformBufferBindings[r] = this.shader.uniformBindCount, a.uniformBlockBinding(t.program, o, this.shader.uniformBindCount), this.shader.uniformBindCount++;
      var s = this.getSignature(e, this.shader.program.uniformData, "ubo"), u = this._uboCache[s];
      if (u || (u = this._uboCache[s] = generateUniformBufferSync(e, this.shader.program.uniformData)), e.autoManage) {
        var h = new Float32Array(u.size / 4);
        e.buffer.update(h);
      }
      return t.uniformGroups[e.id] = u.syncFunc, t.uniformGroups[e.id];
    }, n.prototype.getSignature = function(e, t, r) {
      var a = e.uniforms, o = [r + "-"];
      for (var s in a)
        o.push(s), t[s] && o.push(t[s].type);
      return o.join("-");
    }, n.prototype.getGlProgram = function() {
      return this.shader ? this.shader.program.glPrograms[this.renderer.CONTEXT_UID] : null;
    }, n.prototype.generateProgram = function(e) {
      var t = this.gl, r = e.program, a = generateProgram(t, r);
      return r.glPrograms[this.renderer.CONTEXT_UID] = a, a;
    }, n.prototype.reset = function() {
      this.program = null, this.shader = null;
    }, n.prototype.disposeShader = function(e) {
      this.shader === e && (this.shader = null);
    }, n.prototype.destroy = function() {
      this.renderer = null, this.destroyed = !0;
    }, n;
  }()
);
function mapWebGLBlendModesToPixi(n, e) {
  return e === void 0 && (e = []), e[BLEND_MODES.NORMAL] = [n.ONE, n.ONE_MINUS_SRC_ALPHA], e[BLEND_MODES.ADD] = [n.ONE, n.ONE], e[BLEND_MODES.MULTIPLY] = [n.DST_COLOR, n.ONE_MINUS_SRC_ALPHA, n.ONE, n.ONE_MINUS_SRC_ALPHA], e[BLEND_MODES.SCREEN] = [n.ONE, n.ONE_MINUS_SRC_COLOR, n.ONE, n.ONE_MINUS_SRC_ALPHA], e[BLEND_MODES.OVERLAY] = [n.ONE, n.ONE_MINUS_SRC_ALPHA], e[BLEND_MODES.DARKEN] = [n.ONE, n.ONE_MINUS_SRC_ALPHA], e[BLEND_MODES.LIGHTEN] = [n.ONE, n.ONE_MINUS_SRC_ALPHA], e[BLEND_MODES.COLOR_DODGE] = [n.ONE, n.ONE_MINUS_SRC_ALPHA], e[BLEND_MODES.COLOR_BURN] = [n.ONE, n.ONE_MINUS_SRC_ALPHA], e[BLEND_MODES.HARD_LIGHT] = [n.ONE, n.ONE_MINUS_SRC_ALPHA], e[BLEND_MODES.SOFT_LIGHT] = [n.ONE, n.ONE_MINUS_SRC_ALPHA], e[BLEND_MODES.DIFFERENCE] = [n.ONE, n.ONE_MINUS_SRC_ALPHA], e[BLEND_MODES.EXCLUSION] = [n.ONE, n.ONE_MINUS_SRC_ALPHA], e[BLEND_MODES.HUE] = [n.ONE, n.ONE_MINUS_SRC_ALPHA], e[BLEND_MODES.SATURATION] = [n.ONE, n.ONE_MINUS_SRC_ALPHA], e[BLEND_MODES.COLOR] = [n.ONE, n.ONE_MINUS_SRC_ALPHA], e[BLEND_MODES.LUMINOSITY] = [n.ONE, n.ONE_MINUS_SRC_ALPHA], e[BLEND_MODES.NONE] = [0, 0], e[BLEND_MODES.NORMAL_NPM] = [n.SRC_ALPHA, n.ONE_MINUS_SRC_ALPHA, n.ONE, n.ONE_MINUS_SRC_ALPHA], e[BLEND_MODES.ADD_NPM] = [n.SRC_ALPHA, n.ONE, n.ONE, n.ONE], e[BLEND_MODES.SCREEN_NPM] = [n.SRC_ALPHA, n.ONE_MINUS_SRC_COLOR, n.ONE, n.ONE_MINUS_SRC_ALPHA], e[BLEND_MODES.SRC_IN] = [n.DST_ALPHA, n.ZERO], e[BLEND_MODES.SRC_OUT] = [n.ONE_MINUS_DST_ALPHA, n.ZERO], e[BLEND_MODES.SRC_ATOP] = [n.DST_ALPHA, n.ONE_MINUS_SRC_ALPHA], e[BLEND_MODES.DST_OVER] = [n.ONE_MINUS_DST_ALPHA, n.ONE], e[BLEND_MODES.DST_IN] = [n.ZERO, n.SRC_ALPHA], e[BLEND_MODES.DST_OUT] = [n.ZERO, n.ONE_MINUS_SRC_ALPHA], e[BLEND_MODES.DST_ATOP] = [n.ONE_MINUS_DST_ALPHA, n.SRC_ALPHA], e[BLEND_MODES.XOR] = [n.ONE_MINUS_DST_ALPHA, n.ONE_MINUS_SRC_ALPHA], e[BLEND_MODES.SUBTRACT] = [n.ONE, n.ONE, n.ONE, n.ONE, n.FUNC_REVERSE_SUBTRACT, n.FUNC_ADD], e;
}
var BLEND = 0, OFFSET = 1, CULLING = 2, DEPTH_TEST = 3, WINDING = 4, DEPTH_MASK = 5, StateSystem = (
  /** @class */
  function() {
    function n() {
      this.gl = null, this.stateId = 0, this.polygonOffset = 0, this.blendMode = BLEND_MODES.NONE, this._blendEq = !1, this.map = [], this.map[BLEND] = this.setBlend, this.map[OFFSET] = this.setOffset, this.map[CULLING] = this.setCullFace, this.map[DEPTH_TEST] = this.setDepthTest, this.map[WINDING] = this.setFrontFace, this.map[DEPTH_MASK] = this.setDepthMask, this.checks = [], this.defaultState = new State(), this.defaultState.blend = !0;
    }
    return n.prototype.contextChange = function(e) {
      this.gl = e, this.blendModes = mapWebGLBlendModesToPixi(e), this.set(this.defaultState), this.reset();
    }, n.prototype.set = function(e) {
      if (e = e || this.defaultState, this.stateId !== e.data) {
        for (var t = this.stateId ^ e.data, r = 0; t; )
          t & 1 && this.map[r].call(this, !!(e.data & 1 << r)), t = t >> 1, r++;
        this.stateId = e.data;
      }
      for (var r = 0; r < this.checks.length; r++)
        this.checks[r](this, e);
    }, n.prototype.forceState = function(e) {
      e = e || this.defaultState;
      for (var t = 0; t < this.map.length; t++)
        this.map[t].call(this, !!(e.data & 1 << t));
      for (var t = 0; t < this.checks.length; t++)
        this.checks[t](this, e);
      this.stateId = e.data;
    }, n.prototype.setBlend = function(e) {
      this.updateCheck(n.checkBlendMode, e), this.gl[e ? "enable" : "disable"](this.gl.BLEND);
    }, n.prototype.setOffset = function(e) {
      this.updateCheck(n.checkPolygonOffset, e), this.gl[e ? "enable" : "disable"](this.gl.POLYGON_OFFSET_FILL);
    }, n.prototype.setDepthTest = function(e) {
      this.gl[e ? "enable" : "disable"](this.gl.DEPTH_TEST);
    }, n.prototype.setDepthMask = function(e) {
      this.gl.depthMask(e);
    }, n.prototype.setCullFace = function(e) {
      this.gl[e ? "enable" : "disable"](this.gl.CULL_FACE);
    }, n.prototype.setFrontFace = function(e) {
      this.gl.frontFace(this.gl[e ? "CW" : "CCW"]);
    }, n.prototype.setBlendMode = function(e) {
      if (e !== this.blendMode) {
        this.blendMode = e;
        var t = this.blendModes[e], r = this.gl;
        t.length === 2 ? r.blendFunc(t[0], t[1]) : r.blendFuncSeparate(t[0], t[1], t[2], t[3]), t.length === 6 ? (this._blendEq = !0, r.blendEquationSeparate(t[4], t[5])) : this._blendEq && (this._blendEq = !1, r.blendEquationSeparate(r.FUNC_ADD, r.FUNC_ADD));
      }
    }, n.prototype.setPolygonOffset = function(e, t) {
      this.gl.polygonOffset(e, t);
    }, n.prototype.reset = function() {
      this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, !1), this.forceState(this.defaultState), this._blendEq = !0, this.blendMode = -1, this.setBlendMode(0);
    }, n.prototype.updateCheck = function(e, t) {
      var r = this.checks.indexOf(e);
      t && r === -1 ? this.checks.push(e) : !t && r !== -1 && this.checks.splice(r, 1);
    }, n.checkBlendMode = function(e, t) {
      e.setBlendMode(t.blendMode);
    }, n.checkPolygonOffset = function(e, t) {
      e.setPolygonOffset(1, t.polygonOffset);
    }, n.prototype.destroy = function() {
      this.gl = null;
    }, n;
  }()
), TextureGCSystem = (
  /** @class */
  function() {
    function n(e) {
      this.renderer = e, this.count = 0, this.checkCount = 0, this.maxIdle = settings.GC_MAX_IDLE, this.checkCountMax = settings.GC_MAX_CHECK_COUNT, this.mode = settings.GC_MODE;
    }
    return n.prototype.postrender = function() {
      this.renderer.renderingToScreen && (this.count++, this.mode !== GC_MODES.MANUAL && (this.checkCount++, this.checkCount > this.checkCountMax && (this.checkCount = 0, this.run())));
    }, n.prototype.run = function() {
      for (var e = this.renderer.texture, t = e.managedTextures, r = !1, a = 0; a < t.length; a++) {
        var o = t[a];
        !o.framebuffer && this.count - o.touched > this.maxIdle && (e.destroyTexture(o, !0), t[a] = null, r = !0);
      }
      if (r) {
        for (var s = 0, a = 0; a < t.length; a++)
          t[a] !== null && (t[s++] = t[a]);
        t.length = s;
      }
    }, n.prototype.unload = function(e) {
      var t = this.renderer.texture, r = e._texture;
      r && !r.framebuffer && t.destroyTexture(r);
      for (var a = e.children.length - 1; a >= 0; a--)
        this.unload(e.children[a]);
    }, n.prototype.destroy = function() {
      this.renderer = null;
    }, n;
  }()
);
function mapTypeAndFormatToInternalFormat(n) {
  var e, t, r, a, o, s, u, h, l, c, v, d, g, m, _, y, b, S, O, D, E, M, A;
  return "WebGL2RenderingContext" in globalThis && n instanceof globalThis.WebGL2RenderingContext ? A = (e = {}, e[TYPES.UNSIGNED_BYTE] = (t = {}, t[FORMATS.RGBA] = n.RGBA8, t[FORMATS.RGB] = n.RGB8, t[FORMATS.RG] = n.RG8, t[FORMATS.RED] = n.R8, t[FORMATS.RGBA_INTEGER] = n.RGBA8UI, t[FORMATS.RGB_INTEGER] = n.RGB8UI, t[FORMATS.RG_INTEGER] = n.RG8UI, t[FORMATS.RED_INTEGER] = n.R8UI, t[FORMATS.ALPHA] = n.ALPHA, t[FORMATS.LUMINANCE] = n.LUMINANCE, t[FORMATS.LUMINANCE_ALPHA] = n.LUMINANCE_ALPHA, t), e[TYPES.BYTE] = (r = {}, r[FORMATS.RGBA] = n.RGBA8_SNORM, r[FORMATS.RGB] = n.RGB8_SNORM, r[FORMATS.RG] = n.RG8_SNORM, r[FORMATS.RED] = n.R8_SNORM, r[FORMATS.RGBA_INTEGER] = n.RGBA8I, r[FORMATS.RGB_INTEGER] = n.RGB8I, r[FORMATS.RG_INTEGER] = n.RG8I, r[FORMATS.RED_INTEGER] = n.R8I, r), e[TYPES.UNSIGNED_SHORT] = (a = {}, a[FORMATS.RGBA_INTEGER] = n.RGBA16UI, a[FORMATS.RGB_INTEGER] = n.RGB16UI, a[FORMATS.RG_INTEGER] = n.RG16UI, a[FORMATS.RED_INTEGER] = n.R16UI, a[FORMATS.DEPTH_COMPONENT] = n.DEPTH_COMPONENT16, a), e[TYPES.SHORT] = (o = {}, o[FORMATS.RGBA_INTEGER] = n.RGBA16I, o[FORMATS.RGB_INTEGER] = n.RGB16I, o[FORMATS.RG_INTEGER] = n.RG16I, o[FORMATS.RED_INTEGER] = n.R16I, o), e[TYPES.UNSIGNED_INT] = (s = {}, s[FORMATS.RGBA_INTEGER] = n.RGBA32UI, s[FORMATS.RGB_INTEGER] = n.RGB32UI, s[FORMATS.RG_INTEGER] = n.RG32UI, s[FORMATS.RED_INTEGER] = n.R32UI, s[FORMATS.DEPTH_COMPONENT] = n.DEPTH_COMPONENT24, s), e[TYPES.INT] = (u = {}, u[FORMATS.RGBA_INTEGER] = n.RGBA32I, u[FORMATS.RGB_INTEGER] = n.RGB32I, u[FORMATS.RG_INTEGER] = n.RG32I, u[FORMATS.RED_INTEGER] = n.R32I, u), e[TYPES.FLOAT] = (h = {}, h[FORMATS.RGBA] = n.RGBA32F, h[FORMATS.RGB] = n.RGB32F, h[FORMATS.RG] = n.RG32F, h[FORMATS.RED] = n.R32F, h[FORMATS.DEPTH_COMPONENT] = n.DEPTH_COMPONENT32F, h), e[TYPES.HALF_FLOAT] = (l = {}, l[FORMATS.RGBA] = n.RGBA16F, l[FORMATS.RGB] = n.RGB16F, l[FORMATS.RG] = n.RG16F, l[FORMATS.RED] = n.R16F, l), e[TYPES.UNSIGNED_SHORT_5_6_5] = (c = {}, c[FORMATS.RGB] = n.RGB565, c), e[TYPES.UNSIGNED_SHORT_4_4_4_4] = (v = {}, v[FORMATS.RGBA] = n.RGBA4, v), e[TYPES.UNSIGNED_SHORT_5_5_5_1] = (d = {}, d[FORMATS.RGBA] = n.RGB5_A1, d), e[TYPES.UNSIGNED_INT_2_10_10_10_REV] = (g = {}, g[FORMATS.RGBA] = n.RGB10_A2, g[FORMATS.RGBA_INTEGER] = n.RGB10_A2UI, g), e[TYPES.UNSIGNED_INT_10F_11F_11F_REV] = (m = {}, m[FORMATS.RGB] = n.R11F_G11F_B10F, m), e[TYPES.UNSIGNED_INT_5_9_9_9_REV] = (_ = {}, _[FORMATS.RGB] = n.RGB9_E5, _), e[TYPES.UNSIGNED_INT_24_8] = (y = {}, y[FORMATS.DEPTH_STENCIL] = n.DEPTH24_STENCIL8, y), e[TYPES.FLOAT_32_UNSIGNED_INT_24_8_REV] = (b = {}, b[FORMATS.DEPTH_STENCIL] = n.DEPTH32F_STENCIL8, b), e) : A = (S = {}, S[TYPES.UNSIGNED_BYTE] = (O = {}, O[FORMATS.RGBA] = n.RGBA, O[FORMATS.RGB] = n.RGB, O[FORMATS.ALPHA] = n.ALPHA, O[FORMATS.LUMINANCE] = n.LUMINANCE, O[FORMATS.LUMINANCE_ALPHA] = n.LUMINANCE_ALPHA, O), S[TYPES.UNSIGNED_SHORT_5_6_5] = (D = {}, D[FORMATS.RGB] = n.RGB, D), S[TYPES.UNSIGNED_SHORT_4_4_4_4] = (E = {}, E[FORMATS.RGBA] = n.RGBA, E), S[TYPES.UNSIGNED_SHORT_5_5_5_1] = (M = {}, M[FORMATS.RGBA] = n.RGBA, M), S), A;
}
var GLTexture = (
  /** @class */
  /* @__PURE__ */ function() {
    function n(e) {
      this.texture = e, this.width = -1, this.height = -1, this.dirtyId = -1, this.dirtyStyleId = -1, this.mipmap = !1, this.wrapMode = 33071, this.type = TYPES.UNSIGNED_BYTE, this.internalFormat = FORMATS.RGBA, this.samplerType = 0;
    }
    return n;
  }()
), TextureSystem = (
  /** @class */
  function() {
    function n(e) {
      this.renderer = e, this.boundTextures = [], this.currentLocation = -1, this.managedTextures = [], this._unknownBoundTextures = !1, this.unknownTexture = new BaseTexture(), this.hasIntegerTextures = !1;
    }
    return n.prototype.contextChange = function() {
      var e = this.gl = this.renderer.gl;
      this.CONTEXT_UID = this.renderer.CONTEXT_UID, this.webGLVersion = this.renderer.context.webGLVersion, this.internalFormats = mapTypeAndFormatToInternalFormat(e);
      var t = e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS);
      this.boundTextures.length = t;
      for (var r = 0; r < t; r++)
        this.boundTextures[r] = null;
      this.emptyTextures = {};
      var a = new GLTexture(e.createTexture());
      e.bindTexture(e.TEXTURE_2D, a.texture), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, 1, 1, 0, e.RGBA, e.UNSIGNED_BYTE, new Uint8Array(4)), this.emptyTextures[e.TEXTURE_2D] = a, this.emptyTextures[e.TEXTURE_CUBE_MAP] = new GLTexture(e.createTexture()), e.bindTexture(e.TEXTURE_CUBE_MAP, this.emptyTextures[e.TEXTURE_CUBE_MAP].texture);
      for (var r = 0; r < 6; r++)
        e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + r, 0, e.RGBA, 1, 1, 0, e.RGBA, e.UNSIGNED_BYTE, null);
      e.texParameteri(e.TEXTURE_CUBE_MAP, e.TEXTURE_MAG_FILTER, e.LINEAR), e.texParameteri(e.TEXTURE_CUBE_MAP, e.TEXTURE_MIN_FILTER, e.LINEAR);
      for (var r = 0; r < this.boundTextures.length; r++)
        this.bind(null, r);
    }, n.prototype.bind = function(e, t) {
      t === void 0 && (t = 0);
      var r = this.gl;
      if (e = e?.castToBaseTexture(), e && e.valid && !e.parentTextureArray) {
        e.touched = this.renderer.textureGC.count;
        var a = e._glTextures[this.CONTEXT_UID] || this.initTexture(e);
        this.boundTextures[t] !== e && (this.currentLocation !== t && (this.currentLocation = t, r.activeTexture(r.TEXTURE0 + t)), r.bindTexture(e.target, a.texture)), a.dirtyId !== e.dirtyId ? (this.currentLocation !== t && (this.currentLocation = t, r.activeTexture(r.TEXTURE0 + t)), this.updateTexture(e)) : a.dirtyStyleId !== e.dirtyStyleId && this.updateTextureStyle(e), this.boundTextures[t] = e;
      } else
        this.currentLocation !== t && (this.currentLocation = t, r.activeTexture(r.TEXTURE0 + t)), r.bindTexture(r.TEXTURE_2D, this.emptyTextures[r.TEXTURE_2D].texture), this.boundTextures[t] = null;
    }, n.prototype.reset = function() {
      this._unknownBoundTextures = !0, this.hasIntegerTextures = !1, this.currentLocation = -1;
      for (var e = 0; e < this.boundTextures.length; e++)
        this.boundTextures[e] = this.unknownTexture;
    }, n.prototype.unbind = function(e) {
      var t = this, r = t.gl, a = t.boundTextures;
      if (this._unknownBoundTextures) {
        this._unknownBoundTextures = !1;
        for (var o = 0; o < a.length; o++)
          a[o] === this.unknownTexture && this.bind(null, o);
      }
      for (var o = 0; o < a.length; o++)
        a[o] === e && (this.currentLocation !== o && (r.activeTexture(r.TEXTURE0 + o), this.currentLocation = o), r.bindTexture(e.target, this.emptyTextures[e.target].texture), a[o] = null);
    }, n.prototype.ensureSamplerType = function(e) {
      var t = this, r = t.boundTextures, a = t.hasIntegerTextures, o = t.CONTEXT_UID;
      if (a)
        for (var s = e - 1; s >= 0; --s) {
          var u = r[s];
          if (u) {
            var h = u._glTextures[o];
            h.samplerType !== SAMPLER_TYPES.FLOAT && this.renderer.texture.unbind(u);
          }
        }
    }, n.prototype.initTexture = function(e) {
      var t = new GLTexture(this.gl.createTexture());
      return t.dirtyId = -1, e._glTextures[this.CONTEXT_UID] = t, this.managedTextures.push(e), e.on("dispose", this.destroyTexture, this), t;
    }, n.prototype.initTextureType = function(e, t) {
      var r, a;
      t.internalFormat = (a = (r = this.internalFormats[e.type]) === null || r === void 0 ? void 0 : r[e.format]) !== null && a !== void 0 ? a : e.format, this.webGLVersion === 2 && e.type === TYPES.HALF_FLOAT ? t.type = this.gl.HALF_FLOAT : t.type = e.type;
    }, n.prototype.updateTexture = function(e) {
      var t = e._glTextures[this.CONTEXT_UID];
      if (t) {
        var r = this.renderer;
        if (this.initTextureType(e, t), e.resource && e.resource.upload(r, e, t))
          t.samplerType !== SAMPLER_TYPES.FLOAT && (this.hasIntegerTextures = !0);
        else {
          var a = e.realWidth, o = e.realHeight, s = r.gl;
          (t.width !== a || t.height !== o || t.dirtyId < 0) && (t.width = a, t.height = o, s.texImage2D(e.target, 0, t.internalFormat, a, o, 0, e.format, t.type, null));
        }
        e.dirtyStyleId !== t.dirtyStyleId && this.updateTextureStyle(e), t.dirtyId = e.dirtyId;
      }
    }, n.prototype.destroyTexture = function(e, t) {
      var r = this.gl;
      if (e = e.castToBaseTexture(), e._glTextures[this.CONTEXT_UID] && (this.unbind(e), r.deleteTexture(e._glTextures[this.CONTEXT_UID].texture), e.off("dispose", this.destroyTexture, this), delete e._glTextures[this.CONTEXT_UID], !t)) {
        var a = this.managedTextures.indexOf(e);
        a !== -1 && removeItems(this.managedTextures, a, 1);
      }
    }, n.prototype.updateTextureStyle = function(e) {
      var t = e._glTextures[this.CONTEXT_UID];
      t && ((e.mipmap === MIPMAP_MODES.POW2 || this.webGLVersion !== 2) && !e.isPowerOfTwo ? t.mipmap = !1 : t.mipmap = e.mipmap >= 1, this.webGLVersion !== 2 && !e.isPowerOfTwo ? t.wrapMode = WRAP_MODES.CLAMP : t.wrapMode = e.wrapMode, e.resource && e.resource.style(this.renderer, e, t) || this.setStyle(e, t), t.dirtyStyleId = e.dirtyStyleId);
    }, n.prototype.setStyle = function(e, t) {
      var r = this.gl;
      if (t.mipmap && e.mipmap !== MIPMAP_MODES.ON_MANUAL && r.generateMipmap(e.target), r.texParameteri(e.target, r.TEXTURE_WRAP_S, t.wrapMode), r.texParameteri(e.target, r.TEXTURE_WRAP_T, t.wrapMode), t.mipmap) {
        r.texParameteri(e.target, r.TEXTURE_MIN_FILTER, e.scaleMode === SCALE_MODES.LINEAR ? r.LINEAR_MIPMAP_LINEAR : r.NEAREST_MIPMAP_NEAREST);
        var a = this.renderer.context.extensions.anisotropicFiltering;
        if (a && e.anisotropicLevel > 0 && e.scaleMode === SCALE_MODES.LINEAR) {
          var o = Math.min(e.anisotropicLevel, r.getParameter(a.MAX_TEXTURE_MAX_ANISOTROPY_EXT));
          r.texParameterf(e.target, a.TEXTURE_MAX_ANISOTROPY_EXT, o);
        }
      } else
        r.texParameteri(e.target, r.TEXTURE_MIN_FILTER, e.scaleMode === SCALE_MODES.LINEAR ? r.LINEAR : r.NEAREST);
      r.texParameteri(e.target, r.TEXTURE_MAG_FILTER, e.scaleMode === SCALE_MODES.LINEAR ? r.LINEAR : r.NEAREST);
    }, n.prototype.destroy = function() {
      this.renderer = null;
    }, n;
  }()
), tempMatrix = new Matrix(), AbstractRenderer = (
  /** @class */
  function(n) {
    __extends$i(e, n);
    function e(t, r) {
      t === void 0 && (t = RENDERER_TYPE.UNKNOWN);
      var a = n.call(this) || this;
      return r = Object.assign({}, settings.RENDER_OPTIONS, r), a.options = r, a.type = t, a.screen = new Rectangle(0, 0, r.width, r.height), a.view = r.view || settings.ADAPTER.createCanvas(), a.resolution = r.resolution || settings.RESOLUTION, a.useContextAlpha = r.useContextAlpha, a.autoDensity = !!r.autoDensity, a.preserveDrawingBuffer = r.preserveDrawingBuffer, a.clearBeforeRender = r.clearBeforeRender, a._backgroundColor = 0, a._backgroundColorRgba = [0, 0, 0, 1], a._backgroundColorString = "#000000", a.backgroundColor = r.backgroundColor || a._backgroundColor, a.backgroundAlpha = r.backgroundAlpha, r.transparent !== void 0 && (deprecation("6.0.0", "Option transparent is deprecated, please use backgroundAlpha instead."), a.useContextAlpha = r.transparent, a.backgroundAlpha = r.transparent ? 0 : 1), a._lastObjectRendered = null, a.plugins = {}, a;
    }
    return e.prototype.initPlugins = function(t) {
      for (var r in t)
        this.plugins[r] = new t[r](this);
    }, Object.defineProperty(e.prototype, "width", {
      /**
       * Same as view.width, actual number of pixels in the canvas by horizontal.
       * @member {number}
       * @readonly
       * @default 800
       */
      get: function() {
        return this.view.width;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "height", {
      /**
       * Same as view.height, actual number of pixels in the canvas by vertical.
       * @member {number}
       * @readonly
       * @default 600
       */
      get: function() {
        return this.view.height;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.resize = function(t, r) {
      this.view.width = Math.round(t * this.resolution), this.view.height = Math.round(r * this.resolution);
      var a = this.view.width / this.resolution, o = this.view.height / this.resolution;
      this.screen.width = a, this.screen.height = o, this.autoDensity && (this.view.style.width = a + "px", this.view.style.height = o + "px"), this.emit("resize", a, o);
    }, e.prototype.generateTexture = function(t, r, a, o) {
      r === void 0 && (r = {}), typeof r == "number" && (deprecation("6.1.0", "generateTexture options (scaleMode, resolution, region) are now object options."), r = { scaleMode: r, resolution: a, region: o });
      var s = r.region, u = __rest(r, ["region"]);
      o = s || t.getLocalBounds(null, !0), o.width === 0 && (o.width = 1), o.height === 0 && (o.height = 1);
      var h = RenderTexture.create(__assign({ width: o.width, height: o.height }, u));
      return tempMatrix.tx = -o.x, tempMatrix.ty = -o.y, this.render(t, {
        renderTexture: h,
        clear: !1,
        transform: tempMatrix,
        skipUpdateTransform: !!t.parent
      }), h;
    }, e.prototype.destroy = function(t) {
      for (var r in this.plugins)
        this.plugins[r].destroy(), this.plugins[r] = null;
      t && this.view.parentNode && this.view.parentNode.removeChild(this.view);
      var a = this;
      a.plugins = null, a.type = RENDERER_TYPE.UNKNOWN, a.view = null, a.screen = null, a._tempDisplayObjectParent = null, a.options = null, this._backgroundColorRgba = null, this._backgroundColorString = null, this._lastObjectRendered = null;
    }, Object.defineProperty(e.prototype, "backgroundColor", {
      /**
       * The background color to fill if not transparent
       * @member {number}
       */
      get: function() {
        return this._backgroundColor;
      },
      set: function(t) {
        this._backgroundColor = t, this._backgroundColorString = hex2string(t), hex2rgb(t, this._backgroundColorRgba);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "backgroundAlpha", {
      /**
       * The background color alpha. Setting this to 0 will make the canvas transparent.
       * @member {number}
       */
      get: function() {
        return this._backgroundColorRgba[3];
      },
      set: function(t) {
        this._backgroundColorRgba[3] = t;
      },
      enumerable: !1,
      configurable: !0
    }), e;
  }(i)
), GLBuffer = (
  /** @class */
  /* @__PURE__ */ function() {
    function n(e) {
      this.buffer = e || null, this.updateID = -1, this.byteLength = -1, this.refCount = 0;
    }
    return n;
  }()
), BufferSystem = (
  /** @class */
  function() {
    function n(e) {
      this.renderer = e, this.managedBuffers = {}, this.boundBufferBases = {};
    }
    return n.prototype.destroy = function() {
      this.renderer = null;
    }, n.prototype.contextChange = function() {
      this.disposeAll(!0), this.gl = this.renderer.gl, this.CONTEXT_UID = this.renderer.CONTEXT_UID;
    }, n.prototype.bind = function(e) {
      var t = this, r = t.gl, a = t.CONTEXT_UID, o = e._glBuffers[a] || this.createGLBuffer(e);
      r.bindBuffer(e.type, o.buffer);
    }, n.prototype.bindBufferBase = function(e, t) {
      var r = this, a = r.gl, o = r.CONTEXT_UID;
      if (this.boundBufferBases[t] !== e) {
        var s = e._glBuffers[o] || this.createGLBuffer(e);
        this.boundBufferBases[t] = e, a.bindBufferBase(a.UNIFORM_BUFFER, t, s.buffer);
      }
    }, n.prototype.bindBufferRange = function(e, t, r) {
      var a = this, o = a.gl, s = a.CONTEXT_UID;
      r = r || 0;
      var u = e._glBuffers[s] || this.createGLBuffer(e);
      o.bindBufferRange(o.UNIFORM_BUFFER, t || 0, u.buffer, r * 256, 256);
    }, n.prototype.update = function(e) {
      var t = this, r = t.gl, a = t.CONTEXT_UID, o = e._glBuffers[a];
      if (e._updateID !== o.updateID)
        if (o.updateID = e._updateID, r.bindBuffer(e.type, o.buffer), o.byteLength >= e.data.byteLength)
          r.bufferSubData(e.type, 0, e.data);
        else {
          var s = e.static ? r.STATIC_DRAW : r.DYNAMIC_DRAW;
          o.byteLength = e.data.byteLength, r.bufferData(e.type, e.data, s);
        }
    }, n.prototype.dispose = function(e, t) {
      if (this.managedBuffers[e.id]) {
        delete this.managedBuffers[e.id];
        var r = e._glBuffers[this.CONTEXT_UID], a = this.gl;
        e.disposeRunner.remove(this), r && (t || a.deleteBuffer(r.buffer), delete e._glBuffers[this.CONTEXT_UID]);
      }
    }, n.prototype.disposeAll = function(e) {
      for (var t = Object.keys(this.managedBuffers), r = 0; r < t.length; r++)
        this.dispose(this.managedBuffers[t[r]], e);
    }, n.prototype.createGLBuffer = function(e) {
      var t = this, r = t.CONTEXT_UID, a = t.gl;
      return e._glBuffers[r] = new GLBuffer(a.createBuffer()), this.managedBuffers[e.id] = e, e.disposeRunner.add(this), e._glBuffers[r];
    }, n;
  }()
), Renderer = (
  /** @class */
  function(n) {
    __extends$i(e, n);
    function e(t) {
      var r = n.call(this, RENDERER_TYPE.WEBGL, t) || this;
      return t = r.options, r.gl = null, r.CONTEXT_UID = 0, r.runners = {
        destroy: new Runner("destroy"),
        contextChange: new Runner("contextChange"),
        reset: new Runner("reset"),
        update: new Runner("update"),
        postrender: new Runner("postrender"),
        prerender: new Runner("prerender"),
        resize: new Runner("resize")
      }, r.runners.contextChange.add(r), r.globalUniforms = new UniformGroup({
        projectionMatrix: new Matrix()
      }, !0), r.addSystem(MaskSystem, "mask").addSystem(ContextSystem, "context").addSystem(StateSystem, "state").addSystem(ShaderSystem, "shader").addSystem(TextureSystem, "texture").addSystem(BufferSystem, "buffer").addSystem(GeometrySystem, "geometry").addSystem(FramebufferSystem, "framebuffer").addSystem(ScissorSystem, "scissor").addSystem(StencilSystem, "stencil").addSystem(ProjectionSystem, "projection").addSystem(TextureGCSystem, "textureGC").addSystem(FilterSystem, "filter").addSystem(RenderTextureSystem, "renderTexture").addSystem(BatchSystem, "batch"), r.initPlugins(e.__plugins), r.multisample = void 0, t.context ? r.context.initFromContext(t.context) : r.context.initFromOptions({
        alpha: !!r.useContextAlpha,
        antialias: t.antialias,
        premultipliedAlpha: r.useContextAlpha && r.useContextAlpha !== "notMultiplied",
        stencil: !0,
        preserveDrawingBuffer: t.preserveDrawingBuffer,
        powerPreference: r.options.powerPreference
      }), r.renderingToScreen = !0, sayHello(r.context.webGLVersion === 2 ? "WebGL 2" : "WebGL 1"), r.resize(r.options.width, r.options.height), r;
    }
    return e.create = function(t) {
      if (isWebGLSupported())
        return new e(t);
      throw new Error('WebGL unsupported in this browser, use "pixi.js-legacy" for fallback canvas2d support.');
    }, e.prototype.contextChange = function() {
      var t = this.gl, r;
      if (this.context.webGLVersion === 1) {
        var a = t.getParameter(t.FRAMEBUFFER_BINDING);
        t.bindFramebuffer(t.FRAMEBUFFER, null), r = t.getParameter(t.SAMPLES), t.bindFramebuffer(t.FRAMEBUFFER, a);
      } else {
        var a = t.getParameter(t.DRAW_FRAMEBUFFER_BINDING);
        t.bindFramebuffer(t.DRAW_FRAMEBUFFER, null), r = t.getParameter(t.SAMPLES), t.bindFramebuffer(t.DRAW_FRAMEBUFFER, a);
      }
      r >= MSAA_QUALITY.HIGH ? this.multisample = MSAA_QUALITY.HIGH : r >= MSAA_QUALITY.MEDIUM ? this.multisample = MSAA_QUALITY.MEDIUM : r >= MSAA_QUALITY.LOW ? this.multisample = MSAA_QUALITY.LOW : this.multisample = MSAA_QUALITY.NONE;
    }, e.prototype.addSystem = function(t, r) {
      var a = new t(this);
      if (this[r])
        throw new Error('Whoops! The name "' + r + '" is already in use');
      this[r] = a;
      for (var o in this.runners)
        this.runners[o].add(a);
      return this;
    }, e.prototype.render = function(t, r) {
      var a, o, s, u;
      if (r && (r instanceof RenderTexture ? (deprecation("6.0.0", "Renderer#render arguments changed, use options instead."), a = r, o = arguments[2], s = arguments[3], u = arguments[4]) : (a = r.renderTexture, o = r.clear, s = r.transform, u = r.skipUpdateTransform)), this.renderingToScreen = !a, this.runners.prerender.emit(), this.emit("prerender"), this.projection.transform = s, !this.context.isLost) {
        if (a || (this._lastObjectRendered = t), !u) {
          var h = t.enableTempParent();
          t.updateTransform(), t.disableTempParent(h);
        }
        this.renderTexture.bind(a), this.batch.currentRenderer.start(), (o !== void 0 ? o : this.clearBeforeRender) && this.renderTexture.clear(), t.render(this), this.batch.currentRenderer.flush(), a && a.baseTexture.update(), this.runners.postrender.emit(), this.projection.transform = null, this.emit("postrender");
      }
    }, e.prototype.generateTexture = function(t, r, a, o) {
      r === void 0 && (r = {});
      var s = n.prototype.generateTexture.call(this, t, r, a, o);
      return this.framebuffer.blit(), s;
    }, e.prototype.resize = function(t, r) {
      n.prototype.resize.call(this, t, r), this.runners.resize.emit(this.screen.height, this.screen.width);
    }, e.prototype.reset = function() {
      return this.runners.reset.emit(), this;
    }, e.prototype.clear = function() {
      this.renderTexture.bind(), this.renderTexture.clear();
    }, e.prototype.destroy = function(t) {
      this.runners.destroy.emit();
      for (var r in this.runners)
        this.runners[r].destroy();
      n.prototype.destroy.call(this, t), this.gl = null;
    }, Object.defineProperty(e.prototype, "extract", {
      /**
       * Please use `plugins.extract` instead.
       * @member {PIXI.Extract} extract
       * @deprecated since 6.0.0
       * @readonly
       */
      get: function() {
        return deprecation("6.0.0", "Renderer#extract has been deprecated, please use Renderer#plugins.extract instead."), this.plugins.extract;
      },
      enumerable: !1,
      configurable: !0
    }), e.registerPlugin = function(t, r) {
      deprecation("6.5.0", "Renderer.registerPlugin() has been deprecated, please use extensions.add() instead."), extensions.add({
        name: t,
        type: ExtensionType.RendererPlugin,
        ref: r
      });
    }, e.__plugins = {}, e;
  }(AbstractRenderer)
);
extensions.handleByMap(ExtensionType.RendererPlugin, Renderer.__plugins);
function autoDetectRenderer(n) {
  return Renderer.create(n);
}
var $defaultVertex = `attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;

void main(void)
{
    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
    vTextureCoord = aTextureCoord;
}`, $defaultFilterVertex = `attribute vec2 aVertexPosition;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;

uniform vec4 inputSize;
uniform vec4 outputFrame;

vec4 filterVertexPosition( void )
{
    vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;

    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);
}

vec2 filterTextureCoord( void )
{
    return aVertexPosition * (outputFrame.zw * inputSize.zw);
}

void main(void)
{
    gl_Position = filterVertexPosition();
    vTextureCoord = filterTextureCoord();
}
`, defaultVertex$1 = $defaultVertex, defaultFilterVertex = $defaultFilterVertex, BatchDrawCall = (
  /** @class */
  /* @__PURE__ */ function() {
    function n() {
      this.texArray = null, this.blend = 0, this.type = DRAW_MODES.TRIANGLES, this.start = 0, this.size = 0, this.data = null;
    }
    return n;
  }()
), BatchTextureArray = (
  /** @class */
  function() {
    function n() {
      this.elements = [], this.ids = [], this.count = 0;
    }
    return n.prototype.clear = function() {
      for (var e = 0; e < this.count; e++)
        this.elements[e] = null;
      this.count = 0;
    }, n;
  }()
), ViewableBuffer = (
  /** @class */
  function() {
    function n(e) {
      typeof e == "number" ? this.rawBinaryData = new ArrayBuffer(e) : e instanceof Uint8Array ? this.rawBinaryData = e.buffer : this.rawBinaryData = e, this.uint32View = new Uint32Array(this.rawBinaryData), this.float32View = new Float32Array(this.rawBinaryData);
    }
    return Object.defineProperty(n.prototype, "int8View", {
      /** View on the raw binary data as a `Int8Array`. */
      get: function() {
        return this._int8View || (this._int8View = new Int8Array(this.rawBinaryData)), this._int8View;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n.prototype, "uint8View", {
      /** View on the raw binary data as a `Uint8Array`. */
      get: function() {
        return this._uint8View || (this._uint8View = new Uint8Array(this.rawBinaryData)), this._uint8View;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n.prototype, "int16View", {
      /**  View on the raw binary data as a `Int16Array`. */
      get: function() {
        return this._int16View || (this._int16View = new Int16Array(this.rawBinaryData)), this._int16View;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n.prototype, "uint16View", {
      /** View on the raw binary data as a `Uint16Array`. */
      get: function() {
        return this._uint16View || (this._uint16View = new Uint16Array(this.rawBinaryData)), this._uint16View;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n.prototype, "int32View", {
      /** View on the raw binary data as a `Int32Array`. */
      get: function() {
        return this._int32View || (this._int32View = new Int32Array(this.rawBinaryData)), this._int32View;
      },
      enumerable: !1,
      configurable: !0
    }), n.prototype.view = function(e) {
      return this[e + "View"];
    }, n.prototype.destroy = function() {
      this.rawBinaryData = null, this._int8View = null, this._uint8View = null, this._int16View = null, this._uint16View = null, this._int32View = null, this.uint32View = null, this.float32View = null;
    }, n.sizeOf = function(e) {
      switch (e) {
        case "int8":
        case "uint8":
          return 1;
        case "int16":
        case "uint16":
          return 2;
        case "int32":
        case "uint32":
        case "float32":
          return 4;
        default:
          throw new Error(e + " isn't a valid view type");
      }
    }, n;
  }()
), AbstractBatchRenderer = (
  /** @class */
  function(n) {
    __extends$i(e, n);
    function e(t) {
      var r = n.call(this, t) || this;
      return r.shaderGenerator = null, r.geometryClass = null, r.vertexSize = null, r.state = State.for2d(), r.size = settings.SPRITE_BATCH_SIZE * 4, r._vertexCount = 0, r._indexCount = 0, r._bufferedElements = [], r._bufferedTextures = [], r._bufferSize = 0, r._shader = null, r._packedGeometries = [], r._packedGeometryPoolSize = 2, r._flushId = 0, r._aBuffers = {}, r._iBuffers = {}, r.MAX_TEXTURES = 1, r.renderer.on("prerender", r.onPrerender, r), t.runners.contextChange.add(r), r._dcIndex = 0, r._aIndex = 0, r._iIndex = 0, r._attributeBuffer = null, r._indexBuffer = null, r._tempBoundTextures = [], r;
    }
    return e.prototype.contextChange = function() {
      var t = this.renderer.gl;
      settings.PREFER_ENV === ENV.WEBGL_LEGACY ? this.MAX_TEXTURES = 1 : (this.MAX_TEXTURES = Math.min(t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS), settings.SPRITE_MAX_TEXTURES), this.MAX_TEXTURES = checkMaxIfStatementsInShader(this.MAX_TEXTURES, t)), this._shader = this.shaderGenerator.generateShader(this.MAX_TEXTURES);
      for (var r = 0; r < this._packedGeometryPoolSize; r++)
        this._packedGeometries[r] = new this.geometryClass();
      this.initFlushBuffers();
    }, e.prototype.initFlushBuffers = function() {
      for (var t = e._drawCallPool, r = e._textureArrayPool, a = this.size / 4, o = Math.floor(a / this.MAX_TEXTURES) + 1; t.length < a; )
        t.push(new BatchDrawCall());
      for (; r.length < o; )
        r.push(new BatchTextureArray());
      for (var s = 0; s < this.MAX_TEXTURES; s++)
        this._tempBoundTextures[s] = null;
    }, e.prototype.onPrerender = function() {
      this._flushId = 0;
    }, e.prototype.render = function(t) {
      t._texture.valid && (this._vertexCount + t.vertexData.length / 2 > this.size && this.flush(), this._vertexCount += t.vertexData.length / 2, this._indexCount += t.indices.length, this._bufferedTextures[this._bufferSize] = t._texture.baseTexture, this._bufferedElements[this._bufferSize++] = t);
    }, e.prototype.buildTexturesAndDrawCalls = function() {
      var t = this, r = t._bufferedTextures, a = t.MAX_TEXTURES, o = e._textureArrayPool, s = this.renderer.batch, u = this._tempBoundTextures, h = this.renderer.textureGC.count, l = ++BaseTexture._globalBatch, c = 0, v = o[0], d = 0;
      s.copyBoundTextures(u, a);
      for (var g = 0; g < this._bufferSize; ++g) {
        var m = r[g];
        r[g] = null, m._batchEnabled !== l && (v.count >= a && (s.boundArray(v, u, l, a), this.buildDrawCalls(v, d, g), d = g, v = o[++c], ++l), m._batchEnabled = l, m.touched = h, v.elements[v.count++] = m);
      }
      v.count > 0 && (s.boundArray(v, u, l, a), this.buildDrawCalls(v, d, this._bufferSize), ++c, ++l);
      for (var g = 0; g < u.length; g++)
        u[g] = null;
      BaseTexture._globalBatch = l;
    }, e.prototype.buildDrawCalls = function(t, r, a) {
      var o = this, s = o._bufferedElements, u = o._attributeBuffer, h = o._indexBuffer, l = o.vertexSize, c = e._drawCallPool, v = this._dcIndex, d = this._aIndex, g = this._iIndex, m = c[v];
      m.start = this._iIndex, m.texArray = t;
      for (var _ = r; _ < a; ++_) {
        var y = s[_], b = y._texture.baseTexture, S = premultiplyBlendMode[b.alphaMode ? 1 : 0][y.blendMode];
        s[_] = null, r < _ && m.blend !== S && (m.size = g - m.start, r = _, m = c[++v], m.texArray = t, m.start = g), this.packInterleavedGeometry(y, u, h, d, g), d += y.vertexData.length / 2 * l, g += y.indices.length, m.blend = S;
      }
      r < a && (m.size = g - m.start, ++v), this._dcIndex = v, this._aIndex = d, this._iIndex = g;
    }, e.prototype.bindAndClearTexArray = function(t) {
      for (var r = this.renderer.texture, a = 0; a < t.count; a++)
        r.bind(t.elements[a], t.ids[a]), t.elements[a] = null;
      t.count = 0;
    }, e.prototype.updateGeometry = function() {
      var t = this, r = t._packedGeometries, a = t._attributeBuffer, o = t._indexBuffer;
      settings.CAN_UPLOAD_SAME_BUFFER ? (r[this._flushId]._buffer.update(a.rawBinaryData), r[this._flushId]._indexBuffer.update(o), this.renderer.geometry.updateBuffers()) : (this._packedGeometryPoolSize <= this._flushId && (this._packedGeometryPoolSize++, r[this._flushId] = new this.geometryClass()), r[this._flushId]._buffer.update(a.rawBinaryData), r[this._flushId]._indexBuffer.update(o), this.renderer.geometry.bind(r[this._flushId]), this.renderer.geometry.updateBuffers(), this._flushId++);
    }, e.prototype.drawBatches = function() {
      for (var t = this._dcIndex, r = this.renderer, a = r.gl, o = r.state, s = e._drawCallPool, u = null, h = 0; h < t; h++) {
        var l = s[h], c = l.texArray, v = l.type, d = l.size, g = l.start, m = l.blend;
        u !== c && (u = c, this.bindAndClearTexArray(c)), this.state.blendMode = m, o.set(this.state), a.drawElements(v, d, a.UNSIGNED_SHORT, g * 2);
      }
    }, e.prototype.flush = function() {
      this._vertexCount !== 0 && (this._attributeBuffer = this.getAttributeBuffer(this._vertexCount), this._indexBuffer = this.getIndexBuffer(this._indexCount), this._aIndex = 0, this._iIndex = 0, this._dcIndex = 0, this.buildTexturesAndDrawCalls(), this.updateGeometry(), this.drawBatches(), this._bufferSize = 0, this._vertexCount = 0, this._indexCount = 0);
    }, e.prototype.start = function() {
      this.renderer.state.set(this.state), this.renderer.texture.ensureSamplerType(this.MAX_TEXTURES), this.renderer.shader.bind(this._shader), settings.CAN_UPLOAD_SAME_BUFFER && this.renderer.geometry.bind(this._packedGeometries[this._flushId]);
    }, e.prototype.stop = function() {
      this.flush();
    }, e.prototype.destroy = function() {
      for (var t = 0; t < this._packedGeometryPoolSize; t++)
        this._packedGeometries[t] && this._packedGeometries[t].destroy();
      this.renderer.off("prerender", this.onPrerender, this), this._aBuffers = null, this._iBuffers = null, this._packedGeometries = null, this._attributeBuffer = null, this._indexBuffer = null, this._shader && (this._shader.destroy(), this._shader = null), n.prototype.destroy.call(this);
    }, e.prototype.getAttributeBuffer = function(t) {
      var r = nextPow2(Math.ceil(t / 8)), a = log2(r), o = r * 8;
      this._aBuffers.length <= a && (this._iBuffers.length = a + 1);
      var s = this._aBuffers[o];
      return s || (this._aBuffers[o] = s = new ViewableBuffer(o * this.vertexSize * 4)), s;
    }, e.prototype.getIndexBuffer = function(t) {
      var r = nextPow2(Math.ceil(t / 12)), a = log2(r), o = r * 12;
      this._iBuffers.length <= a && (this._iBuffers.length = a + 1);
      var s = this._iBuffers[a];
      return s || (this._iBuffers[a] = s = new Uint16Array(o)), s;
    }, e.prototype.packInterleavedGeometry = function(t, r, a, o, s) {
      for (var u = r.uint32View, h = r.float32View, l = o / this.vertexSize, c = t.uvs, v = t.indices, d = t.vertexData, g = t._texture.baseTexture._batchLocation, m = Math.min(t.worldAlpha, 1), _ = m < 1 && t._texture.baseTexture.alphaMode ? premultiplyTint(t._tintRGB, m) : t._tintRGB + (m * 255 << 24), y = 0; y < d.length; y += 2)
        h[o++] = d[y], h[o++] = d[y + 1], h[o++] = c[y], h[o++] = c[y + 1], u[o++] = _, h[o++] = g;
      for (var y = 0; y < v.length; y++)
        a[s++] = l + v[y];
    }, e._drawCallPool = [], e._textureArrayPool = [], e;
  }(ObjectRenderer)
), BatchShaderGenerator = (
  /** @class */
  function() {
    function n(e, t) {
      if (this.vertexSrc = e, this.fragTemplate = t, this.programCache = {}, this.defaultGroupCache = {}, t.indexOf("%count%") < 0)
        throw new Error('Fragment template must contain "%count%".');
      if (t.indexOf("%forloop%") < 0)
        throw new Error('Fragment template must contain "%forloop%".');
    }
    return n.prototype.generateShader = function(e) {
      if (!this.programCache[e]) {
        for (var t = new Int32Array(e), r = 0; r < e; r++)
          t[r] = r;
        this.defaultGroupCache[e] = UniformGroup.from({ uSamplers: t }, !0);
        var a = this.fragTemplate;
        a = a.replace(/%count%/gi, "" + e), a = a.replace(/%forloop%/gi, this.generateSampleSrc(e)), this.programCache[e] = new Program(this.vertexSrc, a);
      }
      var o = {
        tint: new Float32Array([1, 1, 1, 1]),
        translationMatrix: new Matrix(),
        default: this.defaultGroupCache[e]
      };
      return new Shader(this.programCache[e], o);
    }, n.prototype.generateSampleSrc = function(e) {
      var t = "";
      t += `
`, t += `
`;
      for (var r = 0; r < e; r++)
        r > 0 && (t += `
else `), r < e - 1 && (t += "if(vTextureId < " + r + ".5)"), t += `
{`, t += `
	color = texture2D(uSamplers[` + r + "], vTextureCoord);", t += `
}`;
      return t += `
`, t += `
`, t;
    }, n;
  }()
), BatchGeometry = (
  /** @class */
  function(n) {
    __extends$i(e, n);
    function e(t) {
      t === void 0 && (t = !1);
      var r = n.call(this) || this;
      return r._buffer = new Buffer(null, t, !1), r._indexBuffer = new Buffer(null, t, !0), r.addAttribute("aVertexPosition", r._buffer, 2, !1, TYPES.FLOAT).addAttribute("aTextureCoord", r._buffer, 2, !1, TYPES.FLOAT).addAttribute("aColor", r._buffer, 4, !0, TYPES.UNSIGNED_BYTE).addAttribute("aTextureId", r._buffer, 1, !0, TYPES.FLOAT).addIndex(r._indexBuffer), r;
    }
    return e;
  }(Geometry)
), defaultVertex = `precision highp float;
attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;
attribute vec4 aColor;
attribute float aTextureId;

uniform mat3 projectionMatrix;
uniform mat3 translationMatrix;
uniform vec4 tint;

varying vec2 vTextureCoord;
varying vec4 vColor;
varying float vTextureId;

void main(void){
    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);

    vTextureCoord = aTextureCoord;
    vTextureId = aTextureId;
    vColor = aColor * tint;
}
`, defaultFragment = `varying vec2 vTextureCoord;
varying vec4 vColor;
varying float vTextureId;
uniform sampler2D uSamplers[%count%];

void main(void){
    vec4 color;
    %forloop%
    gl_FragColor = color * vColor;
}
`, BatchPluginFactory = (
  /** @class */
  function() {
    function n() {
    }
    return n.create = function(e) {
      var t = Object.assign({
        vertex: defaultVertex,
        fragment: defaultFragment,
        geometryClass: BatchGeometry,
        vertexSize: 6
      }, e), r = t.vertex, a = t.fragment, o = t.vertexSize, s = t.geometryClass;
      return (
        /** @class */
        function(u) {
          __extends$i(h, u);
          function h(l) {
            var c = u.call(this, l) || this;
            return c.shaderGenerator = new BatchShaderGenerator(r, a), c.geometryClass = s, c.vertexSize = o, c;
          }
          return h;
        }(AbstractBatchRenderer)
      );
    }, Object.defineProperty(n, "defaultVertexSrc", {
      /**
       * The default vertex shader source
       * @readonly
       */
      get: function() {
        return defaultVertex;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n, "defaultFragmentTemplate", {
      /**
       * The default fragment shader source
       * @readonly
       */
      get: function() {
        return defaultFragment;
      },
      enumerable: !1,
      configurable: !0
    }), n;
  }()
), BatchRenderer = BatchPluginFactory.create();
Object.assign(BatchRenderer, {
  extension: {
    name: "batch",
    type: ExtensionType.RendererPlugin
  }
});
var accessibleTarget = {
  /**
   *  Flag for if the object is accessible. If true AccessibilityManager will overlay a
   *   shadow div with attributes set
   * @member {boolean}
   * @memberof PIXI.DisplayObject#
   */
  accessible: !1,
  /**
   * Sets the title attribute of the shadow div
   * If accessibleTitle AND accessibleHint has not been this will default to 'displayObject [tabIndex]'
   * @member {?string}
   * @memberof PIXI.DisplayObject#
   */
  accessibleTitle: null,
  /**
   * Sets the aria-label attribute of the shadow div
   * @member {string}
   * @memberof PIXI.DisplayObject#
   */
  accessibleHint: null,
  /**
   * @member {number}
   * @memberof PIXI.DisplayObject#
   * @private
   * @todo Needs docs.
   */
  tabIndex: 0,
  /**
   * @member {boolean}
   * @memberof PIXI.DisplayObject#
   * @todo Needs docs.
   */
  _accessibleActive: !1,
  /**
   * @member {boolean}
   * @memberof PIXI.DisplayObject#
   * @todo Needs docs.
   */
  _accessibleDiv: null,
  /**
   * Specify the type of div the accessible layer is. Screen readers treat the element differently
   * depending on this type. Defaults to button.
   * @member {string}
   * @memberof PIXI.DisplayObject#
   * @default 'button'
   */
  accessibleType: "button",
  /**
   * Specify the pointer-events the accessible div will use
   * Defaults to auto.
   * @member {string}
   * @memberof PIXI.DisplayObject#
   * @default 'auto'
   */
  accessiblePointerEvents: "auto",
  /**
   * Setting to false will prevent any children inside this container to
   * be accessible. Defaults to true.
   * @member {boolean}
   * @memberof PIXI.DisplayObject#
   * @default true
   */
  accessibleChildren: !0,
  renderId: -1
};
DisplayObject.mixin(accessibleTarget);
var KEY_CODE_TAB = 9, DIV_TOUCH_SIZE = 100, DIV_TOUCH_POS_X = 0, DIV_TOUCH_POS_Y = 0, DIV_TOUCH_ZINDEX = 2, DIV_HOOK_SIZE = 1, DIV_HOOK_POS_X = -1e3, DIV_HOOK_POS_Y = -1e3, DIV_HOOK_ZINDEX = 2, AccessibilityManager = (
  /** @class */
  function() {
    function n(e) {
      this.debug = !1, this._isActive = !1, this._isMobileAccessibility = !1, this.pool = [], this.renderId = 0, this.children = [], this.androidUpdateCount = 0, this.androidUpdateFrequency = 500, this._hookDiv = null, (isMobile.tablet || isMobile.phone) && this.createTouchHook();
      var t = document.createElement("div");
      t.style.width = DIV_TOUCH_SIZE + "px", t.style.height = DIV_TOUCH_SIZE + "px", t.style.position = "absolute", t.style.top = DIV_TOUCH_POS_X + "px", t.style.left = DIV_TOUCH_POS_Y + "px", t.style.zIndex = DIV_TOUCH_ZINDEX.toString(), this.div = t, this.renderer = e, this._onKeyDown = this._onKeyDown.bind(this), this._onMouseMove = this._onMouseMove.bind(this), globalThis.addEventListener("keydown", this._onKeyDown, !1);
    }
    return Object.defineProperty(n.prototype, "isActive", {
      /**
       * Value of `true` if accessibility is currently active and accessibility layers are showing.
       * @member {boolean}
       * @readonly
       */
      get: function() {
        return this._isActive;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n.prototype, "isMobileAccessibility", {
      /**
       * Value of `true` if accessibility is enabled for touch devices.
       * @member {boolean}
       * @readonly
       */
      get: function() {
        return this._isMobileAccessibility;
      },
      enumerable: !1,
      configurable: !0
    }), n.prototype.createTouchHook = function() {
      var e = this, t = document.createElement("button");
      t.style.width = DIV_HOOK_SIZE + "px", t.style.height = DIV_HOOK_SIZE + "px", t.style.position = "absolute", t.style.top = DIV_HOOK_POS_X + "px", t.style.left = DIV_HOOK_POS_Y + "px", t.style.zIndex = DIV_HOOK_ZINDEX.toString(), t.style.backgroundColor = "#FF0000", t.title = "select to enable accessibility for this content", t.addEventListener("focus", function() {
        e._isMobileAccessibility = !0, e.activate(), e.destroyTouchHook();
      }), document.body.appendChild(t), this._hookDiv = t;
    }, n.prototype.destroyTouchHook = function() {
      this._hookDiv && (document.body.removeChild(this._hookDiv), this._hookDiv = null);
    }, n.prototype.activate = function() {
      var e;
      this._isActive || (this._isActive = !0, globalThis.document.addEventListener("mousemove", this._onMouseMove, !0), globalThis.removeEventListener("keydown", this._onKeyDown, !1), this.renderer.on("postrender", this.update, this), (e = this.renderer.view.parentNode) === null || e === void 0 || e.appendChild(this.div));
    }, n.prototype.deactivate = function() {
      var e;
      !this._isActive || this._isMobileAccessibility || (this._isActive = !1, globalThis.document.removeEventListener("mousemove", this._onMouseMove, !0), globalThis.addEventListener("keydown", this._onKeyDown, !1), this.renderer.off("postrender", this.update), (e = this.div.parentNode) === null || e === void 0 || e.removeChild(this.div));
    }, n.prototype.updateAccessibleObjects = function(e) {
      if (!(!e.visible || !e.accessibleChildren)) {
        e.accessible && e.interactive && (e._accessibleActive || this.addChild(e), e.renderId = this.renderId);
        var t = e.children;
        if (t)
          for (var r = 0; r < t.length; r++)
            this.updateAccessibleObjects(t[r]);
      }
    }, n.prototype.update = function() {
      var e = performance.now();
      if (!(isMobile.android.device && e < this.androidUpdateCount) && (this.androidUpdateCount = e + this.androidUpdateFrequency, !!this.renderer.renderingToScreen)) {
        this.renderer._lastObjectRendered && this.updateAccessibleObjects(this.renderer._lastObjectRendered);
        var t = this.renderer.view.getBoundingClientRect(), r = t.left, a = t.top, o = t.width, s = t.height, u = this.renderer, h = u.width, l = u.height, c = u.resolution, v = o / h * c, d = s / l * c, g = this.div;
        g.style.left = r + "px", g.style.top = a + "px", g.style.width = h + "px", g.style.height = l + "px";
        for (var m = 0; m < this.children.length; m++) {
          var _ = this.children[m];
          if (_.renderId !== this.renderId)
            _._accessibleActive = !1, removeItems(this.children, m, 1), this.div.removeChild(_._accessibleDiv), this.pool.push(_._accessibleDiv), _._accessibleDiv = null, m--;
          else {
            g = _._accessibleDiv;
            var y = _.hitArea, b = _.worldTransform;
            _.hitArea ? (g.style.left = (b.tx + y.x * b.a) * v + "px", g.style.top = (b.ty + y.y * b.d) * d + "px", g.style.width = y.width * b.a * v + "px", g.style.height = y.height * b.d * d + "px") : (y = _.getBounds(), this.capHitArea(y), g.style.left = y.x * v + "px", g.style.top = y.y * d + "px", g.style.width = y.width * v + "px", g.style.height = y.height * d + "px", g.title !== _.accessibleTitle && _.accessibleTitle !== null && (g.title = _.accessibleTitle), g.getAttribute("aria-label") !== _.accessibleHint && _.accessibleHint !== null && g.setAttribute("aria-label", _.accessibleHint)), (_.accessibleTitle !== g.title || _.tabIndex !== g.tabIndex) && (g.title = _.accessibleTitle, g.tabIndex = _.tabIndex, this.debug && this.updateDebugHTML(g));
          }
        }
        this.renderId++;
      }
    }, n.prototype.updateDebugHTML = function(e) {
      e.innerHTML = "type: " + e.type + "</br> title : " + e.title + "</br> tabIndex: " + e.tabIndex;
    }, n.prototype.capHitArea = function(e) {
      e.x < 0 && (e.width += e.x, e.x = 0), e.y < 0 && (e.height += e.y, e.y = 0);
      var t = this.renderer, r = t.width, a = t.height;
      e.x + e.width > r && (e.width = r - e.x), e.y + e.height > a && (e.height = a - e.y);
    }, n.prototype.addChild = function(e) {
      var t = this.pool.pop();
      t || (t = document.createElement("button"), t.style.width = DIV_TOUCH_SIZE + "px", t.style.height = DIV_TOUCH_SIZE + "px", t.style.backgroundColor = this.debug ? "rgba(255,255,255,0.5)" : "transparent", t.style.position = "absolute", t.style.zIndex = DIV_TOUCH_ZINDEX.toString(), t.style.borderStyle = "none", navigator.userAgent.toLowerCase().indexOf("chrome") > -1 ? t.setAttribute("aria-live", "off") : t.setAttribute("aria-live", "polite"), navigator.userAgent.match(/rv:.*Gecko\//) ? t.setAttribute("aria-relevant", "additions") : t.setAttribute("aria-relevant", "text"), t.addEventListener("click", this._onClick.bind(this)), t.addEventListener("focus", this._onFocus.bind(this)), t.addEventListener("focusout", this._onFocusOut.bind(this))), t.style.pointerEvents = e.accessiblePointerEvents, t.type = e.accessibleType, e.accessibleTitle && e.accessibleTitle !== null ? t.title = e.accessibleTitle : (!e.accessibleHint || e.accessibleHint === null) && (t.title = "displayObject " + e.tabIndex), e.accessibleHint && e.accessibleHint !== null && t.setAttribute("aria-label", e.accessibleHint), this.debug && this.updateDebugHTML(t), e._accessibleActive = !0, e._accessibleDiv = t, t.displayObject = e, this.children.push(e), this.div.appendChild(e._accessibleDiv), e._accessibleDiv.tabIndex = e.tabIndex;
    }, n.prototype._onClick = function(e) {
      var t = this.renderer.plugins.interaction, r = e.target.displayObject, a = t.eventData;
      t.dispatchEvent(r, "click", a), t.dispatchEvent(r, "pointertap", a), t.dispatchEvent(r, "tap", a);
    }, n.prototype._onFocus = function(e) {
      e.target.getAttribute("aria-live") || e.target.setAttribute("aria-live", "assertive");
      var t = this.renderer.plugins.interaction, r = e.target.displayObject, a = t.eventData;
      t.dispatchEvent(r, "mouseover", a);
    }, n.prototype._onFocusOut = function(e) {
      e.target.getAttribute("aria-live") || e.target.setAttribute("aria-live", "polite");
      var t = this.renderer.plugins.interaction, r = e.target.displayObject, a = t.eventData;
      t.dispatchEvent(r, "mouseout", a);
    }, n.prototype._onKeyDown = function(e) {
      e.keyCode === KEY_CODE_TAB && this.activate();
    }, n.prototype._onMouseMove = function(e) {
      e.movementX === 0 && e.movementY === 0 || this.deactivate();
    }, n.prototype.destroy = function() {
      this.destroyTouchHook(), this.div = null, globalThis.document.removeEventListener("mousemove", this._onMouseMove, !0), globalThis.removeEventListener("keydown", this._onKeyDown), this.pool = null, this.children = null, this.renderer = null;
    }, n.extension = {
      name: "accessibility",
      type: [
        ExtensionType.RendererPlugin,
        ExtensionType.CanvasRendererPlugin
      ]
    }, n;
  }()
);
var InteractionData = (
  /** @class */
  function() {
    function n() {
      this.pressure = 0, this.rotationAngle = 0, this.twist = 0, this.tangentialPressure = 0, this.global = new Point(), this.target = null, this.originalEvent = null, this.identifier = null, this.isPrimary = !1, this.button = 0, this.buttons = 0, this.width = 0, this.height = 0, this.tiltX = 0, this.tiltY = 0, this.pointerType = null, this.pressure = 0, this.rotationAngle = 0, this.twist = 0, this.tangentialPressure = 0;
    }
    return Object.defineProperty(n.prototype, "pointerId", {
      /**
       * The unique identifier of the pointer. It will be the same as `identifier`.
       * @readonly
       * @see https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/pointerId
       */
      get: function() {
        return this.identifier;
      },
      enumerable: !1,
      configurable: !0
    }), n.prototype.getLocalPosition = function(e, t, r) {
      return e.worldTransform.applyInverse(r || this.global, t);
    }, n.prototype.copyEvent = function(e) {
      "isPrimary" in e && e.isPrimary && (this.isPrimary = !0), this.button = "button" in e && e.button;
      var t = "buttons" in e && e.buttons;
      this.buttons = Number.isInteger(t) ? t : "which" in e && e.which, this.width = "width" in e && e.width, this.height = "height" in e && e.height, this.tiltX = "tiltX" in e && e.tiltX, this.tiltY = "tiltY" in e && e.tiltY, this.pointerType = "pointerType" in e && e.pointerType, this.pressure = "pressure" in e && e.pressure, this.rotationAngle = "rotationAngle" in e && e.rotationAngle, this.twist = "twist" in e && e.twist || 0, this.tangentialPressure = "tangentialPressure" in e && e.tangentialPressure || 0;
    }, n.prototype.reset = function() {
      this.isPrimary = !1;
    }, n;
  }()
);
var extendStatics$h = function(n, e) {
  return extendStatics$h = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, r) {
    t.__proto__ = r;
  } || function(t, r) {
    for (var a in r)
      r.hasOwnProperty(a) && (t[a] = r[a]);
  }, extendStatics$h(n, e);
};
function __extends$h(n, e) {
  extendStatics$h(n, e);
  function t() {
    this.constructor = n;
  }
  n.prototype = e === null ? Object.create(e) : (t.prototype = e.prototype, new t());
}
var InteractionEvent = (
  /** @class */
  function() {
    function n() {
      this.stopped = !1, this.stopsPropagatingAt = null, this.stopPropagationHint = !1, this.target = null, this.currentTarget = null, this.type = null, this.data = null;
    }
    return n.prototype.stopPropagation = function() {
      this.stopped = !0, this.stopPropagationHint = !0, this.stopsPropagatingAt = this.currentTarget;
    }, n.prototype.reset = function() {
      this.stopped = !1, this.stopsPropagatingAt = null, this.stopPropagationHint = !1, this.currentTarget = null, this.target = null;
    }, n;
  }()
), InteractionTrackingData = (
  /** @class */
  function() {
    function n(e) {
      this._pointerId = e, this._flags = n.FLAGS.NONE;
    }
    return n.prototype._doSet = function(e, t) {
      t ? this._flags = this._flags | e : this._flags = this._flags & ~e;
    }, Object.defineProperty(n.prototype, "pointerId", {
      /**
       * Unique pointer id of the event
       * @readonly
       * @private
       * @member {number}
       */
      get: function() {
        return this._pointerId;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n.prototype, "flags", {
      /**
       * State of the tracking data, expressed as bit flags
       * @private
       * @member {number}
       */
      get: function() {
        return this._flags;
      },
      set: function(e) {
        this._flags = e;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n.prototype, "none", {
      /**
       * Is the tracked event inactive (not over or down)?
       * @private
       * @member {number}
       */
      get: function() {
        return this._flags === n.FLAGS.NONE;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n.prototype, "over", {
      /**
       * Is the tracked event over the DisplayObject?
       * @private
       * @member {boolean}
       */
      get: function() {
        return (this._flags & n.FLAGS.OVER) !== 0;
      },
      set: function(e) {
        this._doSet(n.FLAGS.OVER, e);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n.prototype, "rightDown", {
      /**
       * Did the right mouse button come down in the DisplayObject?
       * @private
       * @member {boolean}
       */
      get: function() {
        return (this._flags & n.FLAGS.RIGHT_DOWN) !== 0;
      },
      set: function(e) {
        this._doSet(n.FLAGS.RIGHT_DOWN, e);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n.prototype, "leftDown", {
      /**
       * Did the left mouse button come down in the DisplayObject?
       * @private
       * @member {boolean}
       */
      get: function() {
        return (this._flags & n.FLAGS.LEFT_DOWN) !== 0;
      },
      set: function(e) {
        this._doSet(n.FLAGS.LEFT_DOWN, e);
      },
      enumerable: !1,
      configurable: !0
    }), n.FLAGS = Object.freeze({
      NONE: 0,
      OVER: 1,
      LEFT_DOWN: 2,
      RIGHT_DOWN: 4
    }), n;
  }()
), TreeSearch = (
  /** @class */
  function() {
    function n() {
      this._tempPoint = new Point();
    }
    return n.prototype.recursiveFindHit = function(e, t, r, a, o) {
      var s;
      if (!t || !t.visible)
        return !1;
      var u = e.data.global;
      o = t.interactive || o;
      var h = !1, l = o, c = !0;
      if (t.hitArea)
        a && (t.worldTransform.applyInverse(u, this._tempPoint), t.hitArea.contains(this._tempPoint.x, this._tempPoint.y) ? h = !0 : (a = !1, c = !1)), l = !1;
      else if (t._mask && a) {
        var v = t._mask.isMaskData ? t._mask.maskObject : t._mask;
        v && !(!((s = v.containsPoint) === null || s === void 0) && s.call(v, u)) && (a = !1);
      }
      if (c && t.interactiveChildren && t.children)
        for (var d = t.children, g = d.length - 1; g >= 0; g--) {
          var m = d[g], _ = this.recursiveFindHit(e, m, r, a, l);
          if (_) {
            if (!m.parent)
              continue;
            l = !1, _ && (e.target && (a = !1), h = !0);
          }
        }
      return o && (a && !e.target && !t.hitArea && t.containsPoint && t.containsPoint(u) && (h = !0), t.interactive && (h && !e.target && (e.target = t), r && r(e, t, !!h))), h;
    }, n.prototype.findHit = function(e, t, r, a) {
      this.recursiveFindHit(e, t, r, a, !1);
    }, n;
  }()
), interactiveTarget = {
  interactive: !1,
  interactiveChildren: !0,
  hitArea: null,
  /**
   * If enabled, the mouse cursor use the pointer behavior when hovered over the displayObject if it is interactive
   * Setting this changes the 'cursor' property to `'pointer'`.
   * @example
   * const sprite = new PIXI.Sprite(texture);
   * sprite.interactive = true;
   * sprite.buttonMode = true;
   * @member {boolean}
   * @memberof PIXI.DisplayObject#
   */
  get buttonMode() {
    return this.cursor === "pointer";
  },
  set buttonMode(n) {
    n ? this.cursor = "pointer" : this.cursor === "pointer" && (this.cursor = null);
  },
  /**
   * This defines what cursor mode is used when the mouse cursor
   * is hovered over the displayObject.
   * @example
   * const sprite = new PIXI.Sprite(texture);
   * sprite.interactive = true;
   * sprite.cursor = 'wait';
   * @see https://developer.mozilla.org/en/docs/Web/CSS/cursor
   * @member {string}
   * @memberof PIXI.DisplayObject#
   */
  cursor: null,
  /**
   * Internal set of all active pointers, by identifier
   * @member {Map<number, InteractionTrackingData>}
   * @memberof PIXI.DisplayObject#
   * @private
   */
  get trackedPointers() {
    return this._trackedPointers === void 0 && (this._trackedPointers = {}), this._trackedPointers;
  },
  /**
   * Map of all tracked pointers, by identifier. Use trackedPointers to access.
   * @private
   * @type {Map<number, InteractionTrackingData>}
   */
  _trackedPointers: void 0
};
DisplayObject.mixin(interactiveTarget);
var MOUSE_POINTER_ID = 1, hitTestEvent = {
  target: null,
  data: {
    global: null
  }
}, InteractionManager = (
  /** @class */
  function(n) {
    __extends$h(e, n);
    function e(t, r) {
      var a = n.call(this) || this;
      return r = r || {}, a.renderer = t, a.autoPreventDefault = r.autoPreventDefault !== void 0 ? r.autoPreventDefault : !0, a.interactionFrequency = r.interactionFrequency || 10, a.mouse = new InteractionData(), a.mouse.identifier = MOUSE_POINTER_ID, a.mouse.global.set(-999999), a.activeInteractionData = {}, a.activeInteractionData[MOUSE_POINTER_ID] = a.mouse, a.interactionDataPool = [], a.eventData = new InteractionEvent(), a.interactionDOMElement = null, a.moveWhenInside = !1, a.eventsAdded = !1, a.tickerAdded = !1, a.mouseOverRenderer = !("PointerEvent" in globalThis), a.supportsTouchEvents = "ontouchstart" in globalThis, a.supportsPointerEvents = !!globalThis.PointerEvent, a.onPointerUp = a.onPointerUp.bind(a), a.processPointerUp = a.processPointerUp.bind(a), a.onPointerCancel = a.onPointerCancel.bind(a), a.processPointerCancel = a.processPointerCancel.bind(a), a.onPointerDown = a.onPointerDown.bind(a), a.processPointerDown = a.processPointerDown.bind(a), a.onPointerMove = a.onPointerMove.bind(a), a.processPointerMove = a.processPointerMove.bind(a), a.onPointerOut = a.onPointerOut.bind(a), a.processPointerOverOut = a.processPointerOverOut.bind(a), a.onPointerOver = a.onPointerOver.bind(a), a.cursorStyles = {
        default: "inherit",
        pointer: "pointer"
      }, a.currentCursorMode = null, a.cursor = null, a.resolution = 1, a.delayedEvents = [], a.search = new TreeSearch(), a._tempDisplayObject = new TemporaryDisplayObject(), a._eventListenerOptions = { capture: !0, passive: !1 }, a._useSystemTicker = r.useSystemTicker !== void 0 ? r.useSystemTicker : !0, a.setTargetElement(a.renderer.view, a.renderer.resolution), a;
    }
    return Object.defineProperty(e.prototype, "useSystemTicker", {
      /**
       * Should the InteractionManager automatically add {@link tickerUpdate} to {@link PIXI.Ticker.system}.
       * @default true
       */
      get: function() {
        return this._useSystemTicker;
      },
      set: function(t) {
        this._useSystemTicker = t, t ? this.addTickerListener() : this.removeTickerListener();
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "lastObjectRendered", {
      /**
       * Last rendered object or temp object.
       * @readonly
       * @protected
       */
      get: function() {
        return this.renderer._lastObjectRendered || this._tempDisplayObject;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.hitTest = function(t, r) {
      return hitTestEvent.target = null, hitTestEvent.data.global = t, r || (r = this.lastObjectRendered), this.processInteractive(hitTestEvent, r, null, !0), hitTestEvent.target;
    }, e.prototype.setTargetElement = function(t, r) {
      r === void 0 && (r = 1), this.removeTickerListener(), this.removeEvents(), this.interactionDOMElement = t, this.resolution = r, this.addEvents(), this.addTickerListener();
    }, e.prototype.addTickerListener = function() {
      this.tickerAdded || !this.interactionDOMElement || !this._useSystemTicker || (Ticker.system.add(this.tickerUpdate, this, UPDATE_PRIORITY.INTERACTION), this.tickerAdded = !0);
    }, e.prototype.removeTickerListener = function() {
      this.tickerAdded && (Ticker.system.remove(this.tickerUpdate, this), this.tickerAdded = !1);
    }, e.prototype.addEvents = function() {
      if (!(this.eventsAdded || !this.interactionDOMElement)) {
        var t = this.interactionDOMElement.style;
        globalThis.navigator.msPointerEnabled ? (t.msContentZooming = "none", t.msTouchAction = "none") : this.supportsPointerEvents && (t.touchAction = "none"), this.supportsPointerEvents ? (globalThis.document.addEventListener("pointermove", this.onPointerMove, this._eventListenerOptions), this.interactionDOMElement.addEventListener("pointerdown", this.onPointerDown, this._eventListenerOptions), this.interactionDOMElement.addEventListener("pointerleave", this.onPointerOut, this._eventListenerOptions), this.interactionDOMElement.addEventListener("pointerover", this.onPointerOver, this._eventListenerOptions), globalThis.addEventListener("pointercancel", this.onPointerCancel, this._eventListenerOptions), globalThis.addEventListener("pointerup", this.onPointerUp, this._eventListenerOptions)) : (globalThis.document.addEventListener("mousemove", this.onPointerMove, this._eventListenerOptions), this.interactionDOMElement.addEventListener("mousedown", this.onPointerDown, this._eventListenerOptions), this.interactionDOMElement.addEventListener("mouseout", this.onPointerOut, this._eventListenerOptions), this.interactionDOMElement.addEventListener("mouseover", this.onPointerOver, this._eventListenerOptions), globalThis.addEventListener("mouseup", this.onPointerUp, this._eventListenerOptions)), this.supportsTouchEvents && (this.interactionDOMElement.addEventListener("touchstart", this.onPointerDown, this._eventListenerOptions), this.interactionDOMElement.addEventListener("touchcancel", this.onPointerCancel, this._eventListenerOptions), this.interactionDOMElement.addEventListener("touchend", this.onPointerUp, this._eventListenerOptions), this.interactionDOMElement.addEventListener("touchmove", this.onPointerMove, this._eventListenerOptions)), this.eventsAdded = !0;
      }
    }, e.prototype.removeEvents = function() {
      if (!(!this.eventsAdded || !this.interactionDOMElement)) {
        var t = this.interactionDOMElement.style;
        globalThis.navigator.msPointerEnabled ? (t.msContentZooming = "", t.msTouchAction = "") : this.supportsPointerEvents && (t.touchAction = ""), this.supportsPointerEvents ? (globalThis.document.removeEventListener("pointermove", this.onPointerMove, this._eventListenerOptions), this.interactionDOMElement.removeEventListener("pointerdown", this.onPointerDown, this._eventListenerOptions), this.interactionDOMElement.removeEventListener("pointerleave", this.onPointerOut, this._eventListenerOptions), this.interactionDOMElement.removeEventListener("pointerover", this.onPointerOver, this._eventListenerOptions), globalThis.removeEventListener("pointercancel", this.onPointerCancel, this._eventListenerOptions), globalThis.removeEventListener("pointerup", this.onPointerUp, this._eventListenerOptions)) : (globalThis.document.removeEventListener("mousemove", this.onPointerMove, this._eventListenerOptions), this.interactionDOMElement.removeEventListener("mousedown", this.onPointerDown, this._eventListenerOptions), this.interactionDOMElement.removeEventListener("mouseout", this.onPointerOut, this._eventListenerOptions), this.interactionDOMElement.removeEventListener("mouseover", this.onPointerOver, this._eventListenerOptions), globalThis.removeEventListener("mouseup", this.onPointerUp, this._eventListenerOptions)), this.supportsTouchEvents && (this.interactionDOMElement.removeEventListener("touchstart", this.onPointerDown, this._eventListenerOptions), this.interactionDOMElement.removeEventListener("touchcancel", this.onPointerCancel, this._eventListenerOptions), this.interactionDOMElement.removeEventListener("touchend", this.onPointerUp, this._eventListenerOptions), this.interactionDOMElement.removeEventListener("touchmove", this.onPointerMove, this._eventListenerOptions)), this.interactionDOMElement = null, this.eventsAdded = !1;
      }
    }, e.prototype.tickerUpdate = function(t) {
      this._deltaTime += t, !(this._deltaTime < this.interactionFrequency) && (this._deltaTime = 0, this.update());
    }, e.prototype.update = function() {
      if (this.interactionDOMElement) {
        if (this._didMove) {
          this._didMove = !1;
          return;
        }
        this.cursor = null;
        for (var t in this.activeInteractionData)
          if (this.activeInteractionData.hasOwnProperty(t)) {
            var r = this.activeInteractionData[t];
            if (r.originalEvent && r.pointerType !== "touch") {
              var a = this.configureInteractionEventForDOMEvent(this.eventData, r.originalEvent, r);
              this.processInteractive(a, this.lastObjectRendered, this.processPointerOverOut, !0);
            }
          }
        this.setCursorMode(this.cursor);
      }
    }, e.prototype.setCursorMode = function(t) {
      t = t || "default";
      var r = !0;
      if (globalThis.OffscreenCanvas && this.interactionDOMElement instanceof OffscreenCanvas && (r = !1), this.currentCursorMode !== t) {
        this.currentCursorMode = t;
        var a = this.cursorStyles[t];
        if (a)
          switch (typeof a) {
            case "string":
              r && (this.interactionDOMElement.style.cursor = a);
              break;
            case "function":
              a(t);
              break;
            case "object":
              r && Object.assign(this.interactionDOMElement.style, a);
              break;
          }
        else r && typeof t == "string" && !Object.prototype.hasOwnProperty.call(this.cursorStyles, t) && (this.interactionDOMElement.style.cursor = t);
      }
    }, e.prototype.dispatchEvent = function(t, r, a) {
      (!a.stopPropagationHint || t === a.stopsPropagatingAt) && (a.currentTarget = t, a.type = r, t.emit(r, a), t[r] && t[r](a));
    }, e.prototype.delayDispatchEvent = function(t, r, a) {
      this.delayedEvents.push({ displayObject: t, eventString: r, eventData: a });
    }, e.prototype.mapPositionToPoint = function(t, r, a) {
      var o;
      this.interactionDOMElement.parentElement ? o = this.interactionDOMElement.getBoundingClientRect() : o = {
        x: 0,
        y: 0,
        width: this.interactionDOMElement.width,
        height: this.interactionDOMElement.height,
        left: 0,
        top: 0
      };
      var s = 1 / this.resolution;
      t.x = (r - o.left) * (this.interactionDOMElement.width / o.width) * s, t.y = (a - o.top) * (this.interactionDOMElement.height / o.height) * s;
    }, e.prototype.processInteractive = function(t, r, a, o) {
      var s = this.search.findHit(t, r, a, o), u = this.delayedEvents;
      if (!u.length)
        return s;
      t.stopPropagationHint = !1;
      var h = u.length;
      this.delayedEvents = [];
      for (var l = 0; l < h; l++) {
        var c = u[l], v = c.displayObject, d = c.eventString, g = c.eventData;
        g.stopsPropagatingAt === v && (g.stopPropagationHint = !0), this.dispatchEvent(v, d, g);
      }
      return s;
    }, e.prototype.onPointerDown = function(t) {
      if (!(this.supportsTouchEvents && t.pointerType === "touch")) {
        var r = this.normalizeToPointerData(t);
        if (this.autoPreventDefault && r[0].isNormalized) {
          var a = t.cancelable || !("cancelable" in t);
          a && t.preventDefault();
        }
        for (var o = r.length, s = 0; s < o; s++) {
          var u = r[s], h = this.getInteractionDataForPointerId(u), l = this.configureInteractionEventForDOMEvent(this.eventData, u, h);
          if (l.data.originalEvent = t, this.processInteractive(l, this.lastObjectRendered, this.processPointerDown, !0), this.emit("pointerdown", l), u.pointerType === "touch")
            this.emit("touchstart", l);
          else if (u.pointerType === "mouse" || u.pointerType === "pen") {
            var c = u.button === 2;
            this.emit(c ? "rightdown" : "mousedown", this.eventData);
          }
        }
      }
    }, e.prototype.processPointerDown = function(t, r, a) {
      var o = t.data, s = t.data.identifier;
      if (a) {
        if (r.trackedPointers[s] || (r.trackedPointers[s] = new InteractionTrackingData(s)), this.dispatchEvent(r, "pointerdown", t), o.pointerType === "touch")
          this.dispatchEvent(r, "touchstart", t);
        else if (o.pointerType === "mouse" || o.pointerType === "pen") {
          var u = o.button === 2;
          u ? r.trackedPointers[s].rightDown = !0 : r.trackedPointers[s].leftDown = !0, this.dispatchEvent(r, u ? "rightdown" : "mousedown", t);
        }
      }
    }, e.prototype.onPointerComplete = function(t, r, a) {
      var o = this.normalizeToPointerData(t), s = o.length, u = t.target;
      t.composedPath && t.composedPath().length > 0 && (u = t.composedPath()[0]);
      for (var h = u !== this.interactionDOMElement ? "outside" : "", l = 0; l < s; l++) {
        var c = o[l], v = this.getInteractionDataForPointerId(c), d = this.configureInteractionEventForDOMEvent(this.eventData, c, v);
        if (d.data.originalEvent = t, this.processInteractive(d, this.lastObjectRendered, a, r || !h), this.emit(r ? "pointercancel" : "pointerup" + h, d), c.pointerType === "mouse" || c.pointerType === "pen") {
          var g = c.button === 2;
          this.emit(g ? "rightup" + h : "mouseup" + h, d);
        } else c.pointerType === "touch" && (this.emit(r ? "touchcancel" : "touchend" + h, d), this.releaseInteractionDataForPointerId(c.pointerId));
      }
    }, e.prototype.onPointerCancel = function(t) {
      this.supportsTouchEvents && t.pointerType === "touch" || this.onPointerComplete(t, !0, this.processPointerCancel);
    }, e.prototype.processPointerCancel = function(t, r) {
      var a = t.data, o = t.data.identifier;
      r.trackedPointers[o] !== void 0 && (delete r.trackedPointers[o], this.dispatchEvent(r, "pointercancel", t), a.pointerType === "touch" && this.dispatchEvent(r, "touchcancel", t));
    }, e.prototype.onPointerUp = function(t) {
      this.supportsTouchEvents && t.pointerType === "touch" || this.onPointerComplete(t, !1, this.processPointerUp);
    }, e.prototype.processPointerUp = function(t, r, a) {
      var o = t.data, s = t.data.identifier, u = r.trackedPointers[s], h = o.pointerType === "touch", l = o.pointerType === "mouse" || o.pointerType === "pen", c = !1;
      if (l) {
        var v = o.button === 2, d = InteractionTrackingData.FLAGS, g = v ? d.RIGHT_DOWN : d.LEFT_DOWN, m = u !== void 0 && u.flags & g;
        a ? (this.dispatchEvent(r, v ? "rightup" : "mouseup", t), m && (this.dispatchEvent(r, v ? "rightclick" : "click", t), c = !0)) : m && this.dispatchEvent(r, v ? "rightupoutside" : "mouseupoutside", t), u && (v ? u.rightDown = !1 : u.leftDown = !1);
      }
      a ? (this.dispatchEvent(r, "pointerup", t), h && this.dispatchEvent(r, "touchend", t), u && ((!l || c) && this.dispatchEvent(r, "pointertap", t), h && (this.dispatchEvent(r, "tap", t), u.over = !1))) : u && (this.dispatchEvent(r, "pointerupoutside", t), h && this.dispatchEvent(r, "touchendoutside", t)), u && u.none && delete r.trackedPointers[s];
    }, e.prototype.onPointerMove = function(t) {
      if (!(this.supportsTouchEvents && t.pointerType === "touch")) {
        var r = this.normalizeToPointerData(t);
        (r[0].pointerType === "mouse" || r[0].pointerType === "pen") && (this._didMove = !0, this.cursor = null);
        for (var a = r.length, o = 0; o < a; o++) {
          var s = r[o], u = this.getInteractionDataForPointerId(s), h = this.configureInteractionEventForDOMEvent(this.eventData, s, u);
          h.data.originalEvent = t, this.processInteractive(h, this.lastObjectRendered, this.processPointerMove, !0), this.emit("pointermove", h), s.pointerType === "touch" && this.emit("touchmove", h), (s.pointerType === "mouse" || s.pointerType === "pen") && this.emit("mousemove", h);
        }
        r[0].pointerType === "mouse" && this.setCursorMode(this.cursor);
      }
    }, e.prototype.processPointerMove = function(t, r, a) {
      var o = t.data, s = o.pointerType === "touch", u = o.pointerType === "mouse" || o.pointerType === "pen";
      u && this.processPointerOverOut(t, r, a), (!this.moveWhenInside || a) && (this.dispatchEvent(r, "pointermove", t), s && this.dispatchEvent(r, "touchmove", t), u && this.dispatchEvent(r, "mousemove", t));
    }, e.prototype.onPointerOut = function(t) {
      if (!(this.supportsTouchEvents && t.pointerType === "touch")) {
        var r = this.normalizeToPointerData(t), a = r[0];
        a.pointerType === "mouse" && (this.mouseOverRenderer = !1, this.setCursorMode(null));
        var o = this.getInteractionDataForPointerId(a), s = this.configureInteractionEventForDOMEvent(this.eventData, a, o);
        s.data.originalEvent = a, this.processInteractive(s, this.lastObjectRendered, this.processPointerOverOut, !1), this.emit("pointerout", s), a.pointerType === "mouse" || a.pointerType === "pen" ? this.emit("mouseout", s) : this.releaseInteractionDataForPointerId(o.identifier);
      }
    }, e.prototype.processPointerOverOut = function(t, r, a) {
      var o = t.data, s = t.data.identifier, u = o.pointerType === "mouse" || o.pointerType === "pen", h = r.trackedPointers[s];
      a && !h && (h = r.trackedPointers[s] = new InteractionTrackingData(s)), h !== void 0 && (a && this.mouseOverRenderer ? (h.over || (h.over = !0, this.delayDispatchEvent(r, "pointerover", t), u && this.delayDispatchEvent(r, "mouseover", t)), u && this.cursor === null && (this.cursor = r.cursor)) : h.over && (h.over = !1, this.dispatchEvent(r, "pointerout", this.eventData), u && this.dispatchEvent(r, "mouseout", t), h.none && delete r.trackedPointers[s]));
    }, e.prototype.onPointerOver = function(t) {
      if (!(this.supportsTouchEvents && t.pointerType === "touch")) {
        var r = this.normalizeToPointerData(t), a = r[0], o = this.getInteractionDataForPointerId(a), s = this.configureInteractionEventForDOMEvent(this.eventData, a, o);
        s.data.originalEvent = a, a.pointerType === "mouse" && (this.mouseOverRenderer = !0), this.emit("pointerover", s), (a.pointerType === "mouse" || a.pointerType === "pen") && this.emit("mouseover", s);
      }
    }, e.prototype.getInteractionDataForPointerId = function(t) {
      var r = t.pointerId, a;
      return r === MOUSE_POINTER_ID || t.pointerType === "mouse" ? a = this.mouse : this.activeInteractionData[r] ? a = this.activeInteractionData[r] : (a = this.interactionDataPool.pop() || new InteractionData(), a.identifier = r, this.activeInteractionData[r] = a), a.copyEvent(t), a;
    }, e.prototype.releaseInteractionDataForPointerId = function(t) {
      var r = this.activeInteractionData[t];
      r && (delete this.activeInteractionData[t], r.reset(), this.interactionDataPool.push(r));
    }, e.prototype.configureInteractionEventForDOMEvent = function(t, r, a) {
      return t.data = a, this.mapPositionToPoint(a.global, r.clientX, r.clientY), r.pointerType === "touch" && (r.globalX = a.global.x, r.globalY = a.global.y), a.originalEvent = r, t.reset(), t;
    }, e.prototype.normalizeToPointerData = function(t) {
      var r = [];
      if (this.supportsTouchEvents && t instanceof TouchEvent)
        for (var a = 0, o = t.changedTouches.length; a < o; a++) {
          var s = t.changedTouches[a];
          typeof s.button > "u" && (s.button = t.touches.length ? 1 : 0), typeof s.buttons > "u" && (s.buttons = t.touches.length ? 1 : 0), typeof s.isPrimary > "u" && (s.isPrimary = t.touches.length === 1 && t.type === "touchstart"), typeof s.width > "u" && (s.width = s.radiusX || 1), typeof s.height > "u" && (s.height = s.radiusY || 1), typeof s.tiltX > "u" && (s.tiltX = 0), typeof s.tiltY > "u" && (s.tiltY = 0), typeof s.pointerType > "u" && (s.pointerType = "touch"), typeof s.pointerId > "u" && (s.pointerId = s.identifier || 0), typeof s.pressure > "u" && (s.pressure = s.force || 0.5), typeof s.twist > "u" && (s.twist = 0), typeof s.tangentialPressure > "u" && (s.tangentialPressure = 0), typeof s.layerX > "u" && (s.layerX = s.offsetX = s.clientX), typeof s.layerY > "u" && (s.layerY = s.offsetY = s.clientY), s.isNormalized = !0, r.push(s);
        }
      else if (!globalThis.MouseEvent || t instanceof MouseEvent && (!this.supportsPointerEvents || !(t instanceof globalThis.PointerEvent))) {
        var u = t;
        typeof u.isPrimary > "u" && (u.isPrimary = !0), typeof u.width > "u" && (u.width = 1), typeof u.height > "u" && (u.height = 1), typeof u.tiltX > "u" && (u.tiltX = 0), typeof u.tiltY > "u" && (u.tiltY = 0), typeof u.pointerType > "u" && (u.pointerType = "mouse"), typeof u.pointerId > "u" && (u.pointerId = MOUSE_POINTER_ID), typeof u.pressure > "u" && (u.pressure = 0.5), typeof u.twist > "u" && (u.twist = 0), typeof u.tangentialPressure > "u" && (u.tangentialPressure = 0), u.isNormalized = !0, r.push(u);
      } else
        r.push(t);
      return r;
    }, e.prototype.destroy = function() {
      this.removeEvents(), this.removeTickerListener(), this.removeAllListeners(), this.renderer = null, this.mouse = null, this.eventData = null, this.interactionDOMElement = null, this.onPointerDown = null, this.processPointerDown = null, this.onPointerUp = null, this.processPointerUp = null, this.onPointerCancel = null, this.processPointerCancel = null, this.onPointerMove = null, this.processPointerMove = null, this.onPointerOut = null, this.processPointerOverOut = null, this.onPointerOver = null, this.search = null;
    }, e.extension = {
      name: "interaction",
      type: [
        ExtensionType.RendererPlugin,
        ExtensionType.CanvasRendererPlugin
      ]
    }, e;
  }(i)
);
var TEMP_RECT = new Rectangle(), BYTES_PER_PIXEL = 4, Extract = (
  /** @class */
  function() {
    function n(e) {
      this.renderer = e;
    }
    return n.prototype.image = function(e, t, r) {
      var a = new Image();
      return a.src = this.base64(e, t, r), a;
    }, n.prototype.base64 = function(e, t, r) {
      return this.canvas(e).toDataURL(t, r);
    }, n.prototype.canvas = function(e, t) {
      var r = this._rawPixels(e, t), a = r.pixels, o = r.width, s = r.height, u = r.flipY, h = new CanvasRenderTarget(o, s, 1), l = h.context.getImageData(0, 0, o, s);
      if (n.arrayPostDivide(a, l.data), h.context.putImageData(l, 0, 0), u) {
        var c = new CanvasRenderTarget(h.width, h.height, 1);
        c.context.scale(1, -1), c.context.drawImage(h.canvas, 0, -s), h.destroy(), h = c;
      }
      return h.canvas;
    }, n.prototype.pixels = function(e, t) {
      var r = this._rawPixels(e, t).pixels;
      return n.arrayPostDivide(r, r), r;
    }, n.prototype._rawPixels = function(e, t) {
      var r = this.renderer, a, o = !1, s, u = !1;
      if (e)
        if (e instanceof RenderTexture)
          s = e;
        else {
          var h = r.context.webGLVersion >= 2 ? r.multisample : MSAA_QUALITY.NONE;
          if (s = this.renderer.generateTexture(e, { multisample: h }), h !== MSAA_QUALITY.NONE) {
            var l = RenderTexture.create({
              width: s.width,
              height: s.height
            });
            r.framebuffer.bind(s.framebuffer), r.framebuffer.blit(l.framebuffer), r.framebuffer.bind(null), s.destroy(!0), s = l;
          }
          u = !0;
        }
      s ? (a = s.baseTexture.resolution, t = t ?? s.frame, o = !1, r.renderTexture.bind(s)) : (a = r.resolution, t || (t = TEMP_RECT, t.width = r.width, t.height = r.height), o = !0, r.renderTexture.bind(null));
      var c = Math.round(t.width * a), v = Math.round(t.height * a), d = new Uint8Array(BYTES_PER_PIXEL * c * v), g = r.gl;
      return g.readPixels(Math.round(t.x * a), Math.round(t.y * a), c, v, g.RGBA, g.UNSIGNED_BYTE, d), u && s.destroy(!0), { pixels: d, width: c, height: v, flipY: o };
    }, n.prototype.destroy = function() {
      this.renderer = null;
    }, n.arrayPostDivide = function(e, t) {
      for (var r = 0; r < e.length; r += 4) {
        var a = t[r + 3] = e[r + 3];
        a !== 0 ? (t[r] = Math.round(Math.min(e[r] * 255 / a, 255)), t[r + 1] = Math.round(Math.min(e[r + 1] * 255 / a, 255)), t[r + 2] = Math.round(Math.min(e[r + 2] * 255 / a, 255))) : (t[r] = e[r], t[r + 1] = e[r + 1], t[r + 2] = e[r + 2]);
      }
    }, n.extension = {
      name: "extract",
      type: ExtensionType.RendererPlugin
    }, n;
  }()
);
var SignalBinding = (
  /** @class */
  function() {
    function n(e, t, r) {
      t === void 0 && (t = !1), this._fn = e, this._once = t, this._thisArg = r, this._next = this._prev = this._owner = null;
    }
    return n.prototype.detach = function() {
      return this._owner === null ? !1 : (this._owner.detach(this), !0);
    }, n;
  }()
);
function _addSignalBinding(n, e) {
  return n._head ? (n._tail._next = e, e._prev = n._tail, n._tail = e) : (n._head = e, n._tail = e), e._owner = n, e;
}
var Signal = (
  /** @class */
  function() {
    function n() {
      this._head = this._tail = void 0;
    }
    return n.prototype.handlers = function(e) {
      e === void 0 && (e = !1);
      var t = this._head;
      if (e)
        return !!t;
      for (var r = []; t; )
        r.push(t), t = t._next;
      return r;
    }, n.prototype.has = function(e) {
      if (!(e instanceof SignalBinding))
        throw new Error("MiniSignal#has(): First arg must be a SignalBinding object.");
      return e._owner === this;
    }, n.prototype.dispatch = function() {
      for (var e = arguments, t = [], r = 0; r < arguments.length; r++)
        t[r] = e[r];
      var a = this._head;
      if (!a)
        return !1;
      for (; a; )
        a._once && this.detach(a), a._fn.apply(a._thisArg, t), a = a._next;
      return !0;
    }, n.prototype.add = function(e, t) {
      if (t === void 0 && (t = null), typeof e != "function")
        throw new Error("MiniSignal#add(): First arg must be a Function.");
      return _addSignalBinding(this, new SignalBinding(e, !1, t));
    }, n.prototype.once = function(e, t) {
      if (t === void 0 && (t = null), typeof e != "function")
        throw new Error("MiniSignal#once(): First arg must be a Function.");
      return _addSignalBinding(this, new SignalBinding(e, !0, t));
    }, n.prototype.detach = function(e) {
      if (!(e instanceof SignalBinding))
        throw new Error("MiniSignal#detach(): First arg must be a SignalBinding object.");
      return e._owner !== this ? this : (e._prev && (e._prev._next = e._next), e._next && (e._next._prev = e._prev), e === this._head ? (this._head = e._next, e._next === null && (this._tail = null)) : e === this._tail && (this._tail = e._prev, this._tail._next = null), e._owner = null, this);
    }, n.prototype.detachAll = function() {
      var e = this._head;
      if (!e)
        return this;
      for (this._head = this._tail = null; e; )
        e._owner = null, e = e._next;
      return this;
    }, n;
  }()
);
function parseUri(n, e) {
  e = e || {};
  for (var t = {
    // eslint-disable-next-line max-len
    key: ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"],
    q: {
      name: "queryKey",
      parser: /(?:^|&)([^&=]*)=?([^&]*)/g
    },
    parser: {
      // eslint-disable-next-line max-len
      strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
      // eslint-disable-next-line max-len
      loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
    }
  }, r = t.parser[e.strictMode ? "strict" : "loose"].exec(n), a = {}, o = 14; o--; )
    a[t.key[o]] = r[o] || "";
  return a[t.q.name] = {}, a[t.key[12]].replace(t.q.parser, function(s, u, h) {
    u && (a[t.q.name][u] = h);
  }), a;
}
var useXdr, tempAnchor = null, STATUS_NONE = 0, STATUS_OK = 200, STATUS_EMPTY = 204, STATUS_IE_BUG_EMPTY = 1223, STATUS_TYPE_OK = 2;
function _noop$1() {
}
function setExtMap(n, e, t) {
  e && e.indexOf(".") === 0 && (e = e.substring(1)), e && (n[e] = t);
}
function reqType(n) {
  return n.toString().replace("object ", "");
}
var LoaderResource = (
  /** @class */
  function() {
    function n(e, t, r) {
      if (this._dequeue = _noop$1, this._onLoadBinding = null, this._elementTimer = 0, this._boundComplete = null, this._boundOnError = null, this._boundOnProgress = null, this._boundOnTimeout = null, this._boundXhrOnError = null, this._boundXhrOnTimeout = null, this._boundXhrOnAbort = null, this._boundXhrOnLoad = null, typeof e != "string" || typeof t != "string")
        throw new Error("Both name and url are required for constructing a resource.");
      r = r || {}, this._flags = 0, this._setFlag(n.STATUS_FLAGS.DATA_URL, t.indexOf("data:") === 0), this.name = e, this.url = t, this.extension = this._getExtension(), this.data = null, this.crossOrigin = r.crossOrigin === !0 ? "anonymous" : r.crossOrigin, this.timeout = r.timeout || 0, this.loadType = r.loadType || this._determineLoadType(), this.xhrType = r.xhrType, this.metadata = r.metadata || {}, this.error = null, this.xhr = null, this.children = [], this.type = n.TYPE.UNKNOWN, this.progressChunk = 0, this._dequeue = _noop$1, this._onLoadBinding = null, this._elementTimer = 0, this._boundComplete = this.complete.bind(this), this._boundOnError = this._onError.bind(this), this._boundOnProgress = this._onProgress.bind(this), this._boundOnTimeout = this._onTimeout.bind(this), this._boundXhrOnError = this._xhrOnError.bind(this), this._boundXhrOnTimeout = this._xhrOnTimeout.bind(this), this._boundXhrOnAbort = this._xhrOnAbort.bind(this), this._boundXhrOnLoad = this._xhrOnLoad.bind(this), this.onStart = new Signal(), this.onProgress = new Signal(), this.onComplete = new Signal(), this.onAfterMiddleware = new Signal();
    }
    return n.setExtensionLoadType = function(e, t) {
      setExtMap(n._loadTypeMap, e, t);
    }, n.setExtensionXhrType = function(e, t) {
      setExtMap(n._xhrTypeMap, e, t);
    }, Object.defineProperty(n.prototype, "isDataUrl", {
      /**
       * When the resource starts to load.
       * @memberof PIXI.LoaderResource
       * @callback OnStartSignal
       * @param {PIXI.Resource} resource - The resource that the event happened on.
       */
      /**
       * When the resource reports loading progress.
       * @memberof PIXI.LoaderResource
       * @callback OnProgressSignal
       * @param {PIXI.Resource} resource - The resource that the event happened on.
       * @param {number} percentage - The progress of the load in the range [0, 1].
       */
      /**
       * When the resource finishes loading.
       * @memberof PIXI.LoaderResource
       * @callback OnCompleteSignal
       * @param {PIXI.Resource} resource - The resource that the event happened on.
       */
      /**
       * @memberof PIXI.LoaderResource
       * @typedef {object} IMetadata
       * @property {HTMLImageElement|HTMLAudioElement|HTMLVideoElement} [loadElement=null] - The
       *      element to use for loading, instead of creating one.
       * @property {boolean} [skipSource=false] - Skips adding source(s) to the load element. This
       *      is useful if you want to pass in a `loadElement` that you already added load sources to.
       * @property {string|string[]} [mimeType] - The mime type to use for the source element
       *      of a video/audio elment. If the urls are an array, you can pass this as an array as well
       *      where each index is the mime type to use for the corresponding url index.
       */
      /**
       * Stores whether or not this url is a data url.
       * @readonly
       * @member {boolean}
       */
      get: function() {
        return this._hasFlag(n.STATUS_FLAGS.DATA_URL);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n.prototype, "isComplete", {
      /**
       * Describes if this resource has finished loading. Is true when the resource has completely
       * loaded.
       * @readonly
       * @member {boolean}
       */
      get: function() {
        return this._hasFlag(n.STATUS_FLAGS.COMPLETE);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n.prototype, "isLoading", {
      /**
       * Describes if this resource is currently loading. Is true when the resource starts loading,
       * and is false again when complete.
       * @readonly
       * @member {boolean}
       */
      get: function() {
        return this._hasFlag(n.STATUS_FLAGS.LOADING);
      },
      enumerable: !1,
      configurable: !0
    }), n.prototype.complete = function() {
      this._clearEvents(), this._finish();
    }, n.prototype.abort = function(e) {
      if (!this.error) {
        if (this.error = new Error(e), this._clearEvents(), this.xhr)
          this.xhr.abort();
        else if (this.xdr)
          this.xdr.abort();
        else if (this.data)
          if (this.data.src)
            this.data.src = n.EMPTY_GIF;
          else
            for (; this.data.firstChild; )
              this.data.removeChild(this.data.firstChild);
        this._finish();
      }
    }, n.prototype.load = function(e) {
      var t = this;
      if (!this.isLoading) {
        if (this.isComplete) {
          e && setTimeout(function() {
            return e(t);
          }, 1);
          return;
        } else e && this.onComplete.once(e);
        switch (this._setFlag(n.STATUS_FLAGS.LOADING, !0), this.onStart.dispatch(this), (this.crossOrigin === !1 || typeof this.crossOrigin != "string") && (this.crossOrigin = this._determineCrossOrigin(this.url)), this.loadType) {
          case n.LOAD_TYPE.IMAGE:
            this.type = n.TYPE.IMAGE, this._loadElement("image");
            break;
          case n.LOAD_TYPE.AUDIO:
            this.type = n.TYPE.AUDIO, this._loadSourceElement("audio");
            break;
          case n.LOAD_TYPE.VIDEO:
            this.type = n.TYPE.VIDEO, this._loadSourceElement("video");
            break;
          case n.LOAD_TYPE.XHR:
          /* falls through */
          default:
            typeof useXdr > "u" && (useXdr = !!(globalThis.XDomainRequest && !("withCredentials" in new XMLHttpRequest()))), useXdr && this.crossOrigin ? this._loadXdr() : this._loadXhr();
            break;
        }
      }
    }, n.prototype._hasFlag = function(e) {
      return (this._flags & e) !== 0;
    }, n.prototype._setFlag = function(e, t) {
      this._flags = t ? this._flags | e : this._flags & ~e;
    }, n.prototype._clearEvents = function() {
      clearTimeout(this._elementTimer), this.data && this.data.removeEventListener && (this.data.removeEventListener("error", this._boundOnError, !1), this.data.removeEventListener("load", this._boundComplete, !1), this.data.removeEventListener("progress", this._boundOnProgress, !1), this.data.removeEventListener("canplaythrough", this._boundComplete, !1)), this.xhr && (this.xhr.removeEventListener ? (this.xhr.removeEventListener("error", this._boundXhrOnError, !1), this.xhr.removeEventListener("timeout", this._boundXhrOnTimeout, !1), this.xhr.removeEventListener("abort", this._boundXhrOnAbort, !1), this.xhr.removeEventListener("progress", this._boundOnProgress, !1), this.xhr.removeEventListener("load", this._boundXhrOnLoad, !1)) : (this.xhr.onerror = null, this.xhr.ontimeout = null, this.xhr.onprogress = null, this.xhr.onload = null));
    }, n.prototype._finish = function() {
      if (this.isComplete)
        throw new Error("Complete called again for an already completed resource.");
      this._setFlag(n.STATUS_FLAGS.COMPLETE, !0), this._setFlag(n.STATUS_FLAGS.LOADING, !1), this.onComplete.dispatch(this);
    }, n.prototype._loadElement = function(e) {
      this.metadata.loadElement ? this.data = this.metadata.loadElement : e === "image" && typeof globalThis.Image < "u" ? this.data = new Image() : this.data = document.createElement(e), this.crossOrigin && (this.data.crossOrigin = this.crossOrigin), this.metadata.skipSource || (this.data.src = this.url), this.data.addEventListener("error", this._boundOnError, !1), this.data.addEventListener("load", this._boundComplete, !1), this.data.addEventListener("progress", this._boundOnProgress, !1), this.timeout && (this._elementTimer = setTimeout(this._boundOnTimeout, this.timeout));
    }, n.prototype._loadSourceElement = function(e) {
      if (this.metadata.loadElement ? this.data = this.metadata.loadElement : e === "audio" && typeof globalThis.Audio < "u" ? this.data = new Audio() : this.data = document.createElement(e), this.data === null) {
        this.abort("Unsupported element: " + e);
        return;
      }
      if (this.crossOrigin && (this.data.crossOrigin = this.crossOrigin), !this.metadata.skipSource)
        if (navigator.isCocoonJS)
          this.data.src = Array.isArray(this.url) ? this.url[0] : this.url;
        else if (Array.isArray(this.url))
          for (var t = this.metadata.mimeType, r = 0; r < this.url.length; ++r)
            this.data.appendChild(this._createSource(e, this.url[r], Array.isArray(t) ? t[r] : t));
        else {
          var t = this.metadata.mimeType;
          this.data.appendChild(this._createSource(e, this.url, Array.isArray(t) ? t[0] : t));
        }
      this.data.addEventListener("error", this._boundOnError, !1), this.data.addEventListener("load", this._boundComplete, !1), this.data.addEventListener("progress", this._boundOnProgress, !1), this.data.addEventListener("canplaythrough", this._boundComplete, !1), this.data.load(), this.timeout && (this._elementTimer = setTimeout(this._boundOnTimeout, this.timeout));
    }, n.prototype._loadXhr = function() {
      typeof this.xhrType != "string" && (this.xhrType = this._determineXhrType());
      var e = this.xhr = new XMLHttpRequest();
      this.crossOrigin === "use-credentials" && (e.withCredentials = !0), e.open("GET", this.url, !0), e.timeout = this.timeout, this.xhrType === n.XHR_RESPONSE_TYPE.JSON || this.xhrType === n.XHR_RESPONSE_TYPE.DOCUMENT ? e.responseType = n.XHR_RESPONSE_TYPE.TEXT : e.responseType = this.xhrType, e.addEventListener("error", this._boundXhrOnError, !1), e.addEventListener("timeout", this._boundXhrOnTimeout, !1), e.addEventListener("abort", this._boundXhrOnAbort, !1), e.addEventListener("progress", this._boundOnProgress, !1), e.addEventListener("load", this._boundXhrOnLoad, !1), e.send();
    }, n.prototype._loadXdr = function() {
      typeof this.xhrType != "string" && (this.xhrType = this._determineXhrType());
      var e = this.xhr = new globalThis.XDomainRequest();
      e.timeout = this.timeout || 5e3, e.onerror = this._boundXhrOnError, e.ontimeout = this._boundXhrOnTimeout, e.onprogress = this._boundOnProgress, e.onload = this._boundXhrOnLoad, e.open("GET", this.url, !0), setTimeout(function() {
        return e.send();
      }, 1);
    }, n.prototype._createSource = function(e, t, r) {
      r || (r = e + "/" + this._getExtension(t));
      var a = document.createElement("source");
      return a.src = t, a.type = r, a;
    }, n.prototype._onError = function(e) {
      this.abort("Failed to load element using: " + e.target.nodeName);
    }, n.prototype._onProgress = function(e) {
      e && e.lengthComputable && this.onProgress.dispatch(this, e.loaded / e.total);
    }, n.prototype._onTimeout = function() {
      this.abort("Load timed out.");
    }, n.prototype._xhrOnError = function() {
      var e = this.xhr;
      this.abort(reqType(e) + " Request failed. Status: " + e.status + ', text: "' + e.statusText + '"');
    }, n.prototype._xhrOnTimeout = function() {
      var e = this.xhr;
      this.abort(reqType(e) + " Request timed out.");
    }, n.prototype._xhrOnAbort = function() {
      var e = this.xhr;
      this.abort(reqType(e) + " Request was aborted by the user.");
    }, n.prototype._xhrOnLoad = function() {
      var e = this.xhr, t = "", r = typeof e.status > "u" ? STATUS_OK : e.status;
      (e.responseType === "" || e.responseType === "text" || typeof e.responseType > "u") && (t = e.responseText), r === STATUS_NONE && (t.length > 0 || e.responseType === n.XHR_RESPONSE_TYPE.BUFFER) ? r = STATUS_OK : r === STATUS_IE_BUG_EMPTY && (r = STATUS_EMPTY);
      var a = r / 100 | 0;
      if (a === STATUS_TYPE_OK)
        if (this.xhrType === n.XHR_RESPONSE_TYPE.TEXT)
          this.data = t, this.type = n.TYPE.TEXT;
        else if (this.xhrType === n.XHR_RESPONSE_TYPE.JSON)
          try {
            this.data = JSON.parse(t), this.type = n.TYPE.JSON;
          } catch (u) {
            this.abort("Error trying to parse loaded json: " + u);
            return;
          }
        else if (this.xhrType === n.XHR_RESPONSE_TYPE.DOCUMENT)
          try {
            if (globalThis.DOMParser) {
              var o = new DOMParser();
              this.data = o.parseFromString(t, "text/xml");
            } else {
              var s = document.createElement("div");
              s.innerHTML = t, this.data = s;
            }
            this.type = n.TYPE.XML;
          } catch (u) {
            this.abort("Error trying to parse loaded xml: " + u);
            return;
          }
        else
          this.data = e.response || t;
      else {
        this.abort("[" + e.status + "] " + e.statusText + ": " + e.responseURL);
        return;
      }
      this.complete();
    }, n.prototype._determineCrossOrigin = function(e, t) {
      if (e.indexOf("data:") === 0)
        return "";
      if (globalThis.origin !== globalThis.location.origin)
        return "anonymous";
      t = t || globalThis.location, tempAnchor || (tempAnchor = document.createElement("a")), tempAnchor.href = e;
      var r = parseUri(tempAnchor.href, { strictMode: !0 }), a = !r.port && t.port === "" || r.port === t.port, o = r.protocol ? r.protocol + ":" : "";
      return r.host !== t.hostname || !a || o !== t.protocol ? "anonymous" : "";
    }, n.prototype._determineXhrType = function() {
      return n._xhrTypeMap[this.extension] || n.XHR_RESPONSE_TYPE.TEXT;
    }, n.prototype._determineLoadType = function() {
      return n._loadTypeMap[this.extension] || n.LOAD_TYPE.XHR;
    }, n.prototype._getExtension = function(e) {
      e === void 0 && (e = this.url);
      var t = "";
      if (this.isDataUrl) {
        var r = e.indexOf("/");
        t = e.substring(r + 1, e.indexOf(";", r));
      } else {
        var a = e.indexOf("?"), o = e.indexOf("#"), s = Math.min(a > -1 ? a : e.length, o > -1 ? o : e.length);
        e = e.substring(0, s), t = e.substring(e.lastIndexOf(".") + 1);
      }
      return t.toLowerCase();
    }, n.prototype._getMimeFromXhrType = function(e) {
      switch (e) {
        case n.XHR_RESPONSE_TYPE.BUFFER:
          return "application/octet-binary";
        case n.XHR_RESPONSE_TYPE.BLOB:
          return "application/blob";
        case n.XHR_RESPONSE_TYPE.DOCUMENT:
          return "application/xml";
        case n.XHR_RESPONSE_TYPE.JSON:
          return "application/json";
        case n.XHR_RESPONSE_TYPE.DEFAULT:
        case n.XHR_RESPONSE_TYPE.TEXT:
        /* falls through */
        default:
          return "text/plain";
      }
    }, n;
  }()
);
(function(n) {
  (function(e) {
    e[e.NONE = 0] = "NONE", e[e.DATA_URL = 1] = "DATA_URL", e[e.COMPLETE = 2] = "COMPLETE", e[e.LOADING = 4] = "LOADING";
  })(n.STATUS_FLAGS || (n.STATUS_FLAGS = {})), function(e) {
    e[e.UNKNOWN = 0] = "UNKNOWN", e[e.JSON = 1] = "JSON", e[e.XML = 2] = "XML", e[e.IMAGE = 3] = "IMAGE", e[e.AUDIO = 4] = "AUDIO", e[e.VIDEO = 5] = "VIDEO", e[e.TEXT = 6] = "TEXT";
  }(n.TYPE || (n.TYPE = {})), function(e) {
    e[e.XHR = 1] = "XHR", e[e.IMAGE = 2] = "IMAGE", e[e.AUDIO = 3] = "AUDIO", e[e.VIDEO = 4] = "VIDEO";
  }(n.LOAD_TYPE || (n.LOAD_TYPE = {})), function(e) {
    e.DEFAULT = "text", e.BUFFER = "arraybuffer", e.BLOB = "blob", e.DOCUMENT = "document", e.JSON = "json", e.TEXT = "text";
  }(n.XHR_RESPONSE_TYPE || (n.XHR_RESPONSE_TYPE = {})), n._loadTypeMap = {
    // images
    gif: n.LOAD_TYPE.IMAGE,
    png: n.LOAD_TYPE.IMAGE,
    bmp: n.LOAD_TYPE.IMAGE,
    jpg: n.LOAD_TYPE.IMAGE,
    jpeg: n.LOAD_TYPE.IMAGE,
    tif: n.LOAD_TYPE.IMAGE,
    tiff: n.LOAD_TYPE.IMAGE,
    webp: n.LOAD_TYPE.IMAGE,
    tga: n.LOAD_TYPE.IMAGE,
    avif: n.LOAD_TYPE.IMAGE,
    svg: n.LOAD_TYPE.IMAGE,
    "svg+xml": n.LOAD_TYPE.IMAGE,
    // audio
    mp3: n.LOAD_TYPE.AUDIO,
    ogg: n.LOAD_TYPE.AUDIO,
    wav: n.LOAD_TYPE.AUDIO,
    // videos
    mp4: n.LOAD_TYPE.VIDEO,
    webm: n.LOAD_TYPE.VIDEO
  }, n._xhrTypeMap = {
    // xml
    xhtml: n.XHR_RESPONSE_TYPE.DOCUMENT,
    html: n.XHR_RESPONSE_TYPE.DOCUMENT,
    htm: n.XHR_RESPONSE_TYPE.DOCUMENT,
    xml: n.XHR_RESPONSE_TYPE.DOCUMENT,
    tmx: n.XHR_RESPONSE_TYPE.DOCUMENT,
    svg: n.XHR_RESPONSE_TYPE.DOCUMENT,
    // This was added to handle Tiled Tileset XML, but .tsx is also a TypeScript React Component.
    // Since it is way less likely for people to be loading TypeScript files instead of Tiled files,
    // this should probably be fine.
    tsx: n.XHR_RESPONSE_TYPE.DOCUMENT,
    // images
    gif: n.XHR_RESPONSE_TYPE.BLOB,
    png: n.XHR_RESPONSE_TYPE.BLOB,
    bmp: n.XHR_RESPONSE_TYPE.BLOB,
    jpg: n.XHR_RESPONSE_TYPE.BLOB,
    jpeg: n.XHR_RESPONSE_TYPE.BLOB,
    tif: n.XHR_RESPONSE_TYPE.BLOB,
    tiff: n.XHR_RESPONSE_TYPE.BLOB,
    webp: n.XHR_RESPONSE_TYPE.BLOB,
    tga: n.XHR_RESPONSE_TYPE.BLOB,
    avif: n.XHR_RESPONSE_TYPE.BLOB,
    // json
    json: n.XHR_RESPONSE_TYPE.JSON,
    // text
    text: n.XHR_RESPONSE_TYPE.TEXT,
    txt: n.XHR_RESPONSE_TYPE.TEXT,
    // fonts
    ttf: n.XHR_RESPONSE_TYPE.BUFFER,
    otf: n.XHR_RESPONSE_TYPE.BUFFER
  }, n.EMPTY_GIF = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";
})(LoaderResource || (LoaderResource = {}));
function _noop() {
}
function onlyOnce(n) {
  return function() {
    for (var t = arguments, r = [], a = 0; a < arguments.length; a++)
      r[a] = t[a];
    if (n === null)
      throw new Error("Callback was already called.");
    var o = n;
    n = null, o.apply(this, r);
  };
}
var AsyncQueueItem = (
  /** @class */
  /* @__PURE__ */ function() {
    function n(e, t) {
      this.data = e, this.callback = t;
    }
    return n;
  }()
), AsyncQueue = (
  /** @class */
  function() {
    function n(e, t) {
      var r = this;
      if (t === void 0 && (t = 1), this.workers = 0, this.saturated = _noop, this.unsaturated = _noop, this.empty = _noop, this.drain = _noop, this.error = _noop, this.started = !1, this.paused = !1, this._tasks = [], this._insert = function(a, o, s) {
        if (s && typeof s != "function")
          throw new Error("task callback must be a function");
        if (r.started = !0, a == null && r.idle()) {
          setTimeout(function() {
            return r.drain();
          }, 1);
          return;
        }
        var u = new AsyncQueueItem(a, typeof s == "function" ? s : _noop);
        o ? r._tasks.unshift(u) : r._tasks.push(u), setTimeout(r.process, 1);
      }, this.process = function() {
        for (; !r.paused && r.workers < r.concurrency && r._tasks.length; ) {
          var a = r._tasks.shift();
          r._tasks.length === 0 && r.empty(), r.workers += 1, r.workers === r.concurrency && r.saturated(), r._worker(a.data, onlyOnce(r._next(a)));
        }
      }, this._worker = e, t === 0)
        throw new Error("Concurrency must not be zero");
      this.concurrency = t, this.buffer = t / 4;
    }
    return n.prototype._next = function(e) {
      var t = this;
      return function() {
        for (var r = arguments, a = [], o = 0; o < arguments.length; o++)
          a[o] = r[o];
        t.workers -= 1, e.callback.apply(e, a), a[0] != null && t.error(a[0], e.data), t.workers <= t.concurrency - t.buffer && t.unsaturated(), t.idle() && t.drain(), t.process();
      };
    }, n.prototype.push = function(e, t) {
      this._insert(e, !1, t);
    }, n.prototype.kill = function() {
      this.workers = 0, this.drain = _noop, this.started = !1, this._tasks = [];
    }, n.prototype.unshift = function(e, t) {
      this._insert(e, !0, t);
    }, n.prototype.length = function() {
      return this._tasks.length;
    }, n.prototype.running = function() {
      return this.workers;
    }, n.prototype.idle = function() {
      return this._tasks.length + this.workers === 0;
    }, n.prototype.pause = function() {
      this.paused !== !0 && (this.paused = !0);
    }, n.prototype.resume = function() {
      if (this.paused !== !1) {
        this.paused = !1;
        for (var e = 1; e <= this.concurrency; e++)
          this.process();
      }
    }, n.eachSeries = function(e, t, r, a) {
      var o = 0, s = e.length;
      function u(h) {
        if (h || o === s) {
          r && r(h);
          return;
        }
        a ? setTimeout(function() {
          t(e[o++], u);
        }, 1) : t(e[o++], u);
      }
      u();
    }, n.queue = function(e, t) {
      return new n(e, t);
    }, n;
  }()
), MAX_PROGRESS = 100, rgxExtractUrlHash = /(#[\w-]+)?$/, Loader = (
  /** @class */
  function() {
    function n(e, t) {
      var r = this;
      e === void 0 && (e = ""), t === void 0 && (t = 10), this.progress = 0, this.loading = !1, this.defaultQueryString = "", this._beforeMiddleware = [], this._afterMiddleware = [], this._resourcesParsing = [], this._boundLoadResource = function(h, l) {
        return r._loadResource(h, l);
      }, this.resources = {}, this.baseUrl = e, this._beforeMiddleware = [], this._afterMiddleware = [], this._resourcesParsing = [], this._boundLoadResource = function(h, l) {
        return r._loadResource(h, l);
      }, this._queue = AsyncQueue.queue(this._boundLoadResource, t), this._queue.pause(), this.resources = {}, this.onProgress = new Signal(), this.onError = new Signal(), this.onLoad = new Signal(), this.onStart = new Signal(), this.onComplete = new Signal();
      for (var a = 0; a < n._plugins.length; ++a) {
        var o = n._plugins[a], s = o.pre, u = o.use;
        s && this.pre(s), u && this.use(u);
      }
      this._protected = !1;
    }
    return n.prototype._add = function(e, t, r, a) {
      if (this.loading && (!r || !r.parentResource))
        throw new Error("Cannot add resources while the loader is running.");
      if (this.resources[e])
        throw new Error('Resource named "' + e + '" already exists.');
      if (t = this._prepareUrl(t), this.resources[e] = new LoaderResource(e, t, r), typeof a == "function" && this.resources[e].onAfterMiddleware.once(a), this.loading) {
        for (var o = r.parentResource, s = [], u = 0; u < o.children.length; ++u)
          o.children[u].isComplete || s.push(o.children[u]);
        var h = o.progressChunk * (s.length + 1), l = h / (s.length + 2);
        o.children.push(this.resources[e]), o.progressChunk = l;
        for (var u = 0; u < s.length; ++u)
          s[u].progressChunk = l;
        this.resources[e].progressChunk = l;
      }
      return this._queue.push(this.resources[e]), this;
    }, n.prototype.pre = function(e) {
      return this._beforeMiddleware.push(e), this;
    }, n.prototype.use = function(e) {
      return this._afterMiddleware.push(e), this;
    }, n.prototype.reset = function() {
      this.progress = 0, this.loading = !1, this._queue.kill(), this._queue.pause();
      for (var e in this.resources) {
        var t = this.resources[e];
        t._onLoadBinding && t._onLoadBinding.detach(), t.isLoading && t.abort("loader reset");
      }
      return this.resources = {}, this;
    }, n.prototype.load = function(e) {
      if (deprecation("6.5.0", "@pixi/loaders is being replaced with @pixi/assets in the next major release."), typeof e == "function" && this.onComplete.once(e), this.loading)
        return this;
      if (this._queue.idle())
        this._onStart(), this._onComplete();
      else {
        for (var t = this._queue._tasks.length, r = MAX_PROGRESS / t, a = 0; a < this._queue._tasks.length; ++a)
          this._queue._tasks[a].data.progressChunk = r;
        this._onStart(), this._queue.resume();
      }
      return this;
    }, Object.defineProperty(n.prototype, "concurrency", {
      /**
       * The number of resources to load concurrently.
       * @default 10
       */
      get: function() {
        return this._queue.concurrency;
      },
      set: function(e) {
        this._queue.concurrency = e;
      },
      enumerable: !1,
      configurable: !0
    }), n.prototype._prepareUrl = function(e) {
      var t = parseUri(e, { strictMode: !0 }), r;
      if (t.protocol || !t.path || e.indexOf("//") === 0 ? r = e : this.baseUrl.length && this.baseUrl.lastIndexOf("/") !== this.baseUrl.length - 1 && e.charAt(0) !== "/" ? r = this.baseUrl + "/" + e : r = this.baseUrl + e, this.defaultQueryString) {
        var a = rgxExtractUrlHash.exec(r)[0];
        r = r.slice(0, r.length - a.length), r.indexOf("?") !== -1 ? r += "&" + this.defaultQueryString : r += "?" + this.defaultQueryString, r += a;
      }
      return r;
    }, n.prototype._loadResource = function(e, t) {
      var r = this;
      e._dequeue = t, AsyncQueue.eachSeries(this._beforeMiddleware, function(a, o) {
        a.call(r, e, function() {
          o(e.isComplete ? {} : null);
        });
      }, function() {
        e.isComplete ? r._onLoad(e) : (e._onLoadBinding = e.onComplete.once(r._onLoad, r), e.load());
      }, !0);
    }, n.prototype._onStart = function() {
      this.progress = 0, this.loading = !0, this.onStart.dispatch(this);
    }, n.prototype._onComplete = function() {
      this.progress = MAX_PROGRESS, this.loading = !1, this.onComplete.dispatch(this, this.resources);
    }, n.prototype._onLoad = function(e) {
      var t = this;
      e._onLoadBinding = null, this._resourcesParsing.push(e), e._dequeue(), AsyncQueue.eachSeries(this._afterMiddleware, function(r, a) {
        r.call(t, e, a);
      }, function() {
        e.onAfterMiddleware.dispatch(e), t.progress = Math.min(MAX_PROGRESS, t.progress + e.progressChunk), t.onProgress.dispatch(t, e), e.error ? t.onError.dispatch(e.error, t, e) : t.onLoad.dispatch(t, e), t._resourcesParsing.splice(t._resourcesParsing.indexOf(e), 1), t._queue.idle() && t._resourcesParsing.length === 0 && t._onComplete();
      }, !0);
    }, n.prototype.destroy = function() {
      this._protected || this.reset();
    }, Object.defineProperty(n, "shared", {
      /** A premade instance of the loader that can be used to load resources. */
      get: function() {
        var e = n._shared;
        return e || (e = new n(), e._protected = !0, n._shared = e), e;
      },
      enumerable: !1,
      configurable: !0
    }), n.registerPlugin = function(e) {
      return deprecation("6.5.0", "Loader.registerPlugin() is deprecated, use extensions.add() instead."), extensions.add({
        type: ExtensionType.Loader,
        ref: e
      }), n;
    }, n._plugins = [], n;
  }()
);
extensions.handleByList(ExtensionType.Loader, Loader._plugins);
Loader.prototype.add = function(e, t, r, a) {
  if (Array.isArray(e)) {
    for (var o = 0; o < e.length; ++o)
      this.add(e[o]);
    return this;
  }
  if (typeof e == "object" && (r = e, a = t || r.callback || r.onComplete, t = r.url, e = r.name || r.key || r.url), typeof t != "string" && (a = r, r = t, t = e), typeof t != "string")
    throw new Error("No url passed to add resource to loader.");
  return typeof r == "function" && (a = r, r = null), this._add(e, t, r, a);
};
var AppLoaderPlugin = (
  /** @class */
  function() {
    function n() {
    }
    return n.init = function(e) {
      e = Object.assign({
        sharedLoader: !1
      }, e), this.loader = e.sharedLoader ? Loader.shared : new Loader();
    }, n.destroy = function() {
      this.loader && (this.loader.destroy(), this.loader = null);
    }, n.extension = ExtensionType.Application, n;
  }()
), TextureLoader = (
  /** @class */
  function() {
    function n() {
    }
    return n.add = function() {
      LoaderResource.setExtensionLoadType("svg", LoaderResource.LOAD_TYPE.XHR), LoaderResource.setExtensionXhrType("svg", LoaderResource.XHR_RESPONSE_TYPE.TEXT);
    }, n.use = function(e, t) {
      if (e.data && (e.type === LoaderResource.TYPE.IMAGE || e.extension === "svg")) {
        var r = e.data, a = e.url, o = e.name, s = e.metadata;
        Texture.fromLoader(r, a, o, s).then(function(u) {
          e.texture = u, t();
        }).catch(t);
      } else
        t();
    }, n.extension = ExtensionType.Loader, n;
  }()
), _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
function encodeBinary(n) {
  for (var e = "", t = 0; t < n.length; ) {
    for (var r = [0, 0, 0], a = [0, 0, 0, 0], o = 0; o < r.length; ++o)
      t < n.length ? r[o] = n.charCodeAt(t++) & 255 : r[o] = 0;
    a[0] = r[0] >> 2, a[1] = (r[0] & 3) << 4 | r[1] >> 4, a[2] = (r[1] & 15) << 2 | r[2] >> 6, a[3] = r[2] & 63;
    var s = t - (n.length - 1);
    switch (s) {
      case 2:
        a[3] = 64, a[2] = 64;
        break;
      case 1:
        a[3] = 64;
        break;
    }
    for (var o = 0; o < a.length; ++o)
      e += _keyStr.charAt(a[o]);
  }
  return e;
}
function parsing(n, e) {
  if (!n.data) {
    e();
    return;
  }
  if (n.xhr && n.xhrType === LoaderResource.XHR_RESPONSE_TYPE.BLOB) {
    if (!self.Blob || typeof n.data == "string") {
      var t = n.xhr.getResponseHeader("content-type");
      if (t && t.indexOf("image") === 0) {
        n.data = new Image(), n.data.src = "data:" + t + ";base64," + encodeBinary(n.xhr.responseText), n.type = LoaderResource.TYPE.IMAGE, n.data.onload = function() {
          n.data.onload = null, e();
        };
        return;
      }
    } else if (n.data.type.indexOf("image") === 0) {
      var r = globalThis.URL || globalThis.webkitURL, a = r.createObjectURL(n.data);
      n.blob = n.data, n.data = new Image(), n.data.src = a, n.type = LoaderResource.TYPE.IMAGE, n.data.onload = function() {
        r.revokeObjectURL(a), n.data.onload = null, e();
      };
      return;
    }
  }
  e();
}
var ParsingLoader = (
  /** @class */
  function() {
    function n() {
    }
    return n.extension = ExtensionType.Loader, n.use = parsing, n;
  }()
);
extensions.add(TextureLoader, ParsingLoader);
var _a$2, INTERNAL_FORMATS;
(function(n) {
  n[n.COMPRESSED_RGB_S3TC_DXT1_EXT = 33776] = "COMPRESSED_RGB_S3TC_DXT1_EXT", n[n.COMPRESSED_RGBA_S3TC_DXT1_EXT = 33777] = "COMPRESSED_RGBA_S3TC_DXT1_EXT", n[n.COMPRESSED_RGBA_S3TC_DXT3_EXT = 33778] = "COMPRESSED_RGBA_S3TC_DXT3_EXT", n[n.COMPRESSED_RGBA_S3TC_DXT5_EXT = 33779] = "COMPRESSED_RGBA_S3TC_DXT5_EXT", n[n.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT = 35917] = "COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT", n[n.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT = 35918] = "COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT", n[n.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT = 35919] = "COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT", n[n.COMPRESSED_SRGB_S3TC_DXT1_EXT = 35916] = "COMPRESSED_SRGB_S3TC_DXT1_EXT", n[n.COMPRESSED_R11_EAC = 37488] = "COMPRESSED_R11_EAC", n[n.COMPRESSED_SIGNED_R11_EAC = 37489] = "COMPRESSED_SIGNED_R11_EAC", n[n.COMPRESSED_RG11_EAC = 37490] = "COMPRESSED_RG11_EAC", n[n.COMPRESSED_SIGNED_RG11_EAC = 37491] = "COMPRESSED_SIGNED_RG11_EAC", n[n.COMPRESSED_RGB8_ETC2 = 37492] = "COMPRESSED_RGB8_ETC2", n[n.COMPRESSED_RGBA8_ETC2_EAC = 37496] = "COMPRESSED_RGBA8_ETC2_EAC", n[n.COMPRESSED_SRGB8_ETC2 = 37493] = "COMPRESSED_SRGB8_ETC2", n[n.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC = 37497] = "COMPRESSED_SRGB8_ALPHA8_ETC2_EAC", n[n.COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2 = 37494] = "COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2", n[n.COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2 = 37495] = "COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2", n[n.COMPRESSED_RGB_PVRTC_4BPPV1_IMG = 35840] = "COMPRESSED_RGB_PVRTC_4BPPV1_IMG", n[n.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG = 35842] = "COMPRESSED_RGBA_PVRTC_4BPPV1_IMG", n[n.COMPRESSED_RGB_PVRTC_2BPPV1_IMG = 35841] = "COMPRESSED_RGB_PVRTC_2BPPV1_IMG", n[n.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG = 35843] = "COMPRESSED_RGBA_PVRTC_2BPPV1_IMG", n[n.COMPRESSED_RGB_ETC1_WEBGL = 36196] = "COMPRESSED_RGB_ETC1_WEBGL", n[n.COMPRESSED_RGB_ATC_WEBGL = 35986] = "COMPRESSED_RGB_ATC_WEBGL", n[n.COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL = 35986] = "COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL", n[n.COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL = 34798] = "COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL", n[n.COMPRESSED_RGBA_ASTC_4x4_KHR = 37808] = "COMPRESSED_RGBA_ASTC_4x4_KHR";
})(INTERNAL_FORMATS || (INTERNAL_FORMATS = {}));
var INTERNAL_FORMAT_TO_BYTES_PER_PIXEL = (_a$2 = {}, // WEBGL_compressed_texture_s3tc
_a$2[INTERNAL_FORMATS.COMPRESSED_RGB_S3TC_DXT1_EXT] = 0.5, _a$2[INTERNAL_FORMATS.COMPRESSED_RGBA_S3TC_DXT1_EXT] = 0.5, _a$2[INTERNAL_FORMATS.COMPRESSED_RGBA_S3TC_DXT3_EXT] = 1, _a$2[INTERNAL_FORMATS.COMPRESSED_RGBA_S3TC_DXT5_EXT] = 1, // WEBGL_compressed_texture_s3tc
_a$2[INTERNAL_FORMATS.COMPRESSED_SRGB_S3TC_DXT1_EXT] = 0.5, _a$2[INTERNAL_FORMATS.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT] = 0.5, _a$2[INTERNAL_FORMATS.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT] = 1, _a$2[INTERNAL_FORMATS.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT] = 1, // WEBGL_compressed_texture_etc
_a$2[INTERNAL_FORMATS.COMPRESSED_R11_EAC] = 0.5, _a$2[INTERNAL_FORMATS.COMPRESSED_SIGNED_R11_EAC] = 0.5, _a$2[INTERNAL_FORMATS.COMPRESSED_RG11_EAC] = 1, _a$2[INTERNAL_FORMATS.COMPRESSED_SIGNED_RG11_EAC] = 1, _a$2[INTERNAL_FORMATS.COMPRESSED_RGB8_ETC2] = 0.5, _a$2[INTERNAL_FORMATS.COMPRESSED_RGBA8_ETC2_EAC] = 1, _a$2[INTERNAL_FORMATS.COMPRESSED_SRGB8_ETC2] = 0.5, _a$2[INTERNAL_FORMATS.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC] = 1, _a$2[INTERNAL_FORMATS.COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2] = 0.5, _a$2[INTERNAL_FORMATS.COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2] = 0.5, // WEBGL_compressed_texture_pvrtc
_a$2[INTERNAL_FORMATS.COMPRESSED_RGB_PVRTC_4BPPV1_IMG] = 0.5, _a$2[INTERNAL_FORMATS.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG] = 0.5, _a$2[INTERNAL_FORMATS.COMPRESSED_RGB_PVRTC_2BPPV1_IMG] = 0.25, _a$2[INTERNAL_FORMATS.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG] = 0.25, // WEBGL_compressed_texture_etc1
_a$2[INTERNAL_FORMATS.COMPRESSED_RGB_ETC1_WEBGL] = 0.5, // @see https://www.khronos.org/registry/OpenGL/extensions/AMD/AMD_compressed_ATC_texture.txt
// WEBGL_compressed_texture_atc
_a$2[INTERNAL_FORMATS.COMPRESSED_RGB_ATC_WEBGL] = 0.5, _a$2[INTERNAL_FORMATS.COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL] = 1, _a$2[INTERNAL_FORMATS.COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL] = 1, // @see https://registry.khronos.org/OpenGL/extensions/KHR/KHR_texture_compression_astc_hdr.txt
// WEBGL_compressed_texture_astc
/* eslint-disable-next-line camelcase */
_a$2[INTERNAL_FORMATS.COMPRESSED_RGBA_ASTC_4x4_KHR] = 1, _a$2);
var extendStatics$g = function(n, e) {
  return extendStatics$g = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, r) {
    t.__proto__ = r;
  } || function(t, r) {
    for (var a in r)
      r.hasOwnProperty(a) && (t[a] = r[a]);
  }, extendStatics$g(n, e);
};
function __extends$g(n, e) {
  extendStatics$g(n, e);
  function t() {
    this.constructor = n;
  }
  n.prototype = e === null ? Object.create(e) : (t.prototype = e.prototype, new t());
}
function __awaiter(n, e, t, r) {
  function a(o) {
    return o instanceof t ? o : new t(function(s) {
      s(o);
    });
  }
  return new (t || (t = Promise))(function(o, s) {
    function u(c) {
      try {
        l(r.next(c));
      } catch (v) {
        s(v);
      }
    }
    function h(c) {
      try {
        l(r.throw(c));
      } catch (v) {
        s(v);
      }
    }
    function l(c) {
      c.done ? o(c.value) : a(c.value).then(u, h);
    }
    l((r = r.apply(n, [])).next());
  });
}
function __generator(n, e) {
  var t = { label: 0, sent: function() {
    if (o[0] & 1)
      throw o[1];
    return o[1];
  }, trys: [], ops: [] }, r, a, o, s;
  return s = { next: u(0), throw: u(1), return: u(2) }, typeof Symbol == "function" && (s[Symbol.iterator] = function() {
    return this;
  }), s;
  function u(l) {
    return function(c) {
      return h([l, c]);
    };
  }
  function h(l) {
    if (r)
      throw new TypeError("Generator is already executing.");
    for (; t; )
      try {
        if (r = 1, a && (o = l[0] & 2 ? a.return : l[0] ? a.throw || ((o = a.return) && o.call(a), 0) : a.next) && !(o = o.call(a, l[1])).done)
          return o;
        switch (a = 0, o && (l = [l[0] & 2, o.value]), l[0]) {
          case 0:
          case 1:
            o = l;
            break;
          case 4:
            return t.label++, { value: l[1], done: !1 };
          case 5:
            t.label++, a = l[1], l = [0];
            continue;
          case 7:
            l = t.ops.pop(), t.trys.pop();
            continue;
          default:
            if (o = t.trys, !(o = o.length > 0 && o[o.length - 1]) && (l[0] === 6 || l[0] === 2)) {
              t = 0;
              continue;
            }
            if (l[0] === 3 && (!o || l[1] > o[0] && l[1] < o[3])) {
              t.label = l[1];
              break;
            }
            if (l[0] === 6 && t.label < o[1]) {
              t.label = o[1], o = l;
              break;
            }
            if (o && t.label < o[2]) {
              t.label = o[2], t.ops.push(l);
              break;
            }
            o[2] && t.ops.pop(), t.trys.pop();
            continue;
        }
        l = e.call(n, t);
      } catch (c) {
        l = [6, c], a = 0;
      } finally {
        r = o = 0;
      }
    if (l[0] & 5)
      throw l[1];
    return { value: l[0] ? l[1] : void 0, done: !0 };
  }
}
var BlobResource = (
  /** @class */
  function(n) {
    __extends$g(e, n);
    function e(t, r) {
      r === void 0 && (r = { width: 1, height: 1, autoLoad: !0 });
      var a = this, o, s;
      return typeof t == "string" ? (o = t, s = new Uint8Array()) : (o = null, s = t), a = n.call(this, s, r) || this, a.origin = o, a.buffer = s ? new ViewableBuffer(s) : null, a.origin && r.autoLoad !== !1 && a.load(), s && s.length && (a.loaded = !0, a.onBlobLoaded(a.buffer.rawBinaryData)), a;
    }
    return e.prototype.onBlobLoaded = function(t) {
    }, e.prototype.load = function() {
      return __awaiter(this, void 0, Promise, function() {
        var t, r, a;
        return __generator(this, function(o) {
          switch (o.label) {
            case 0:
              return [4, fetch(this.origin)];
            case 1:
              return t = o.sent(), [4, t.blob()];
            case 2:
              return r = o.sent(), [4, r.arrayBuffer()];
            case 3:
              return a = o.sent(), this.data = new Uint32Array(a), this.buffer = new ViewableBuffer(a), this.loaded = !0, this.onBlobLoaded(a), this.update(), [2, this];
          }
        });
      });
    }, e;
  }(BufferResource)
), CompressedTextureResource = (
  /** @class */
  function(n) {
    __extends$g(e, n);
    function e(t, r) {
      var a = n.call(this, t, r) || this;
      return a.format = r.format, a.levels = r.levels || 1, a._width = r.width, a._height = r.height, a._extension = e._formatToExtension(a.format), (r.levelBuffers || a.buffer) && (a._levelBuffers = r.levelBuffers || e._createLevelBuffers(
        t instanceof Uint8Array ? t : a.buffer.uint8View,
        a.format,
        a.levels,
        4,
        4,
        // PVRTC has 8x4 blocks in 2bpp mode
        a.width,
        a.height
      )), a;
    }
    return e.prototype.upload = function(t, r, a) {
      var o = t.gl, s = t.context.extensions[this._extension];
      if (!s)
        throw new Error(this._extension + " textures are not supported on the current machine");
      if (!this._levelBuffers)
        return !1;
      for (var u = 0, h = this.levels; u < h; u++) {
        var l = this._levelBuffers[u], c = l.levelID, v = l.levelWidth, d = l.levelHeight, g = l.levelBuffer;
        o.compressedTexImage2D(o.TEXTURE_2D, c, this.format, v, d, 0, g);
      }
      return !0;
    }, e.prototype.onBlobLoaded = function() {
      this._levelBuffers = e._createLevelBuffers(
        this.buffer.uint8View,
        this.format,
        this.levels,
        4,
        4,
        // PVRTC has 8x4 blocks in 2bpp mode
        this.width,
        this.height
      );
    }, e._formatToExtension = function(t) {
      if (t >= 33776 && t <= 33779)
        return "s3tc";
      if (t >= 37488 && t <= 37497)
        return "etc";
      if (t >= 35840 && t <= 35843)
        return "pvrtc";
      if (t >= 36196)
        return "etc1";
      if (t >= 35986 && t <= 34798)
        return "atc";
      throw new Error("Invalid (compressed) texture format given!");
    }, e._createLevelBuffers = function(t, r, a, o, s, u, h) {
      for (var l = new Array(a), c = t.byteOffset, v = u, d = h, g = v + o - 1 & ~(o - 1), m = d + s - 1 & ~(s - 1), _ = g * m * INTERNAL_FORMAT_TO_BYTES_PER_PIXEL[r], y = 0; y < a; y++)
        l[y] = {
          levelID: y,
          levelWidth: a > 1 ? v : g,
          levelHeight: a > 1 ? d : m,
          levelBuffer: new Uint8Array(t.buffer, c, _)
        }, c += _, v = v >> 1 || 1, d = d >> 1 || 1, g = v + o - 1 & ~(o - 1), m = d + s - 1 & ~(s - 1), _ = g * m * INTERNAL_FORMAT_TO_BYTES_PER_PIXEL[r];
      return l;
    }, e;
  }(BlobResource)
), CompressedTextureLoader = (
  /** @class */
  function() {
    function n() {
    }
    return n.use = function(e, t) {
      var r = e.data, a = this;
      if (e.type === LoaderResource.TYPE.JSON && r && r.cacheID && r.textures) {
        for (var o = r.textures, s = void 0, u = void 0, h = 0, l = o.length; h < l; h++) {
          var c = o[h], v = c.src, d = c.format;
          if (d || (u = v), n.textureFormats[d]) {
            s = v;
            break;
          }
        }
        if (s = s || u, !s) {
          t(new Error("Cannot load compressed-textures in " + e.url + ", make sure you provide a fallback"));
          return;
        }
        if (s === e.url) {
          t(new Error("URL of compressed texture cannot be the same as the manifest's URL"));
          return;
        }
        var g = {
          crossOrigin: e.crossOrigin,
          metadata: e.metadata.imageMetadata,
          parentResource: e
        }, m = url$1.resolve(e.url.replace(a.baseUrl, ""), s), _ = r.cacheID;
        a.add(_, m, g, function(y) {
          if (y.error) {
            t(y.error);
            return;
          }
          var b = y.texture, S = b === void 0 ? null : b, O = y.textures, D = O === void 0 ? {} : O;
          Object.assign(e, { texture: S, textures: D }), t();
        });
      } else
        t();
    }, Object.defineProperty(n, "textureExtensions", {
      /**  Map of available texture extensions. */
      get: function() {
        if (!n._textureExtensions) {
          var e = settings.ADAPTER.createCanvas(), t = e.getContext("webgl");
          if (!t)
            return console.warn("WebGL not available for compressed textures. Silently failing."), {};
          var r = {
            s3tc: t.getExtension("WEBGL_compressed_texture_s3tc"),
            s3tc_sRGB: t.getExtension("WEBGL_compressed_texture_s3tc_srgb"),
            etc: t.getExtension("WEBGL_compressed_texture_etc"),
            etc1: t.getExtension("WEBGL_compressed_texture_etc1"),
            pvrtc: t.getExtension("WEBGL_compressed_texture_pvrtc") || t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc"),
            atc: t.getExtension("WEBGL_compressed_texture_atc"),
            astc: t.getExtension("WEBGL_compressed_texture_astc")
          };
          n._textureExtensions = r;
        }
        return n._textureExtensions;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n, "textureFormats", {
      /** Map of available texture formats. */
      get: function() {
        if (!n._textureFormats) {
          var e = n.textureExtensions;
          n._textureFormats = {};
          for (var t in e) {
            var r = e[t];
            r && Object.assign(n._textureFormats, Object.getPrototypeOf(r));
          }
        }
        return n._textureFormats;
      },
      enumerable: !1,
      configurable: !0
    }), n.extension = ExtensionType.Loader, n;
  }()
);
function registerCompressedTextures(n, e, t) {
  var r = {
    textures: {},
    texture: null
  };
  if (!e)
    return r;
  var a = e.map(function(o) {
    return new Texture(new BaseTexture(o, Object.assign({
      mipmap: MIPMAP_MODES.OFF,
      alphaMode: ALPHA_MODES.NO_PREMULTIPLIED_ALPHA
    }, t)));
  });
  return a.forEach(function(o, s) {
    var u = o.baseTexture, h = n + "-" + (s + 1);
    BaseTexture.addToCache(u, h), Texture.addToCache(o, h), s === 0 && (BaseTexture.addToCache(u, n), Texture.addToCache(o, n), r.texture = o), r.textures[h] = o;
  }), r;
}
var _a$1, _b$1, DDS_MAGIC_SIZE = 4, DDS_HEADER_SIZE = 124, DDS_HEADER_PF_SIZE = 32, DDS_HEADER_DX10_SIZE = 20, DDS_MAGIC = 542327876, DDS_FIELDS = {
  HEIGHT: 3,
  WIDTH: 4,
  MIPMAP_COUNT: 7,
  PIXEL_FORMAT: 19
}, DDS_PF_FIELDS = {
  FOURCC: 2
}, DDS_DX10_FIELDS = {
  DXGI_FORMAT: 0,
  RESOURCE_DIMENSION: 1,
  MISC_FLAG: 2,
  ARRAY_SIZE: 3
}, DXGI_FORMAT;
(function(n) {
  n[n.DXGI_FORMAT_UNKNOWN = 0] = "DXGI_FORMAT_UNKNOWN", n[n.DXGI_FORMAT_R32G32B32A32_TYPELESS = 1] = "DXGI_FORMAT_R32G32B32A32_TYPELESS", n[n.DXGI_FORMAT_R32G32B32A32_FLOAT = 2] = "DXGI_FORMAT_R32G32B32A32_FLOAT", n[n.DXGI_FORMAT_R32G32B32A32_UINT = 3] = "DXGI_FORMAT_R32G32B32A32_UINT", n[n.DXGI_FORMAT_R32G32B32A32_SINT = 4] = "DXGI_FORMAT_R32G32B32A32_SINT", n[n.DXGI_FORMAT_R32G32B32_TYPELESS = 5] = "DXGI_FORMAT_R32G32B32_TYPELESS", n[n.DXGI_FORMAT_R32G32B32_FLOAT = 6] = "DXGI_FORMAT_R32G32B32_FLOAT", n[n.DXGI_FORMAT_R32G32B32_UINT = 7] = "DXGI_FORMAT_R32G32B32_UINT", n[n.DXGI_FORMAT_R32G32B32_SINT = 8] = "DXGI_FORMAT_R32G32B32_SINT", n[n.DXGI_FORMAT_R16G16B16A16_TYPELESS = 9] = "DXGI_FORMAT_R16G16B16A16_TYPELESS", n[n.DXGI_FORMAT_R16G16B16A16_FLOAT = 10] = "DXGI_FORMAT_R16G16B16A16_FLOAT", n[n.DXGI_FORMAT_R16G16B16A16_UNORM = 11] = "DXGI_FORMAT_R16G16B16A16_UNORM", n[n.DXGI_FORMAT_R16G16B16A16_UINT = 12] = "DXGI_FORMAT_R16G16B16A16_UINT", n[n.DXGI_FORMAT_R16G16B16A16_SNORM = 13] = "DXGI_FORMAT_R16G16B16A16_SNORM", n[n.DXGI_FORMAT_R16G16B16A16_SINT = 14] = "DXGI_FORMAT_R16G16B16A16_SINT", n[n.DXGI_FORMAT_R32G32_TYPELESS = 15] = "DXGI_FORMAT_R32G32_TYPELESS", n[n.DXGI_FORMAT_R32G32_FLOAT = 16] = "DXGI_FORMAT_R32G32_FLOAT", n[n.DXGI_FORMAT_R32G32_UINT = 17] = "DXGI_FORMAT_R32G32_UINT", n[n.DXGI_FORMAT_R32G32_SINT = 18] = "DXGI_FORMAT_R32G32_SINT", n[n.DXGI_FORMAT_R32G8X24_TYPELESS = 19] = "DXGI_FORMAT_R32G8X24_TYPELESS", n[n.DXGI_FORMAT_D32_FLOAT_S8X24_UINT = 20] = "DXGI_FORMAT_D32_FLOAT_S8X24_UINT", n[n.DXGI_FORMAT_R32_FLOAT_X8X24_TYPELESS = 21] = "DXGI_FORMAT_R32_FLOAT_X8X24_TYPELESS", n[n.DXGI_FORMAT_X32_TYPELESS_G8X24_UINT = 22] = "DXGI_FORMAT_X32_TYPELESS_G8X24_UINT", n[n.DXGI_FORMAT_R10G10B10A2_TYPELESS = 23] = "DXGI_FORMAT_R10G10B10A2_TYPELESS", n[n.DXGI_FORMAT_R10G10B10A2_UNORM = 24] = "DXGI_FORMAT_R10G10B10A2_UNORM", n[n.DXGI_FORMAT_R10G10B10A2_UINT = 25] = "DXGI_FORMAT_R10G10B10A2_UINT", n[n.DXGI_FORMAT_R11G11B10_FLOAT = 26] = "DXGI_FORMAT_R11G11B10_FLOAT", n[n.DXGI_FORMAT_R8G8B8A8_TYPELESS = 27] = "DXGI_FORMAT_R8G8B8A8_TYPELESS", n[n.DXGI_FORMAT_R8G8B8A8_UNORM = 28] = "DXGI_FORMAT_R8G8B8A8_UNORM", n[n.DXGI_FORMAT_R8G8B8A8_UNORM_SRGB = 29] = "DXGI_FORMAT_R8G8B8A8_UNORM_SRGB", n[n.DXGI_FORMAT_R8G8B8A8_UINT = 30] = "DXGI_FORMAT_R8G8B8A8_UINT", n[n.DXGI_FORMAT_R8G8B8A8_SNORM = 31] = "DXGI_FORMAT_R8G8B8A8_SNORM", n[n.DXGI_FORMAT_R8G8B8A8_SINT = 32] = "DXGI_FORMAT_R8G8B8A8_SINT", n[n.DXGI_FORMAT_R16G16_TYPELESS = 33] = "DXGI_FORMAT_R16G16_TYPELESS", n[n.DXGI_FORMAT_R16G16_FLOAT = 34] = "DXGI_FORMAT_R16G16_FLOAT", n[n.DXGI_FORMAT_R16G16_UNORM = 35] = "DXGI_FORMAT_R16G16_UNORM", n[n.DXGI_FORMAT_R16G16_UINT = 36] = "DXGI_FORMAT_R16G16_UINT", n[n.DXGI_FORMAT_R16G16_SNORM = 37] = "DXGI_FORMAT_R16G16_SNORM", n[n.DXGI_FORMAT_R16G16_SINT = 38] = "DXGI_FORMAT_R16G16_SINT", n[n.DXGI_FORMAT_R32_TYPELESS = 39] = "DXGI_FORMAT_R32_TYPELESS", n[n.DXGI_FORMAT_D32_FLOAT = 40] = "DXGI_FORMAT_D32_FLOAT", n[n.DXGI_FORMAT_R32_FLOAT = 41] = "DXGI_FORMAT_R32_FLOAT", n[n.DXGI_FORMAT_R32_UINT = 42] = "DXGI_FORMAT_R32_UINT", n[n.DXGI_FORMAT_R32_SINT = 43] = "DXGI_FORMAT_R32_SINT", n[n.DXGI_FORMAT_R24G8_TYPELESS = 44] = "DXGI_FORMAT_R24G8_TYPELESS", n[n.DXGI_FORMAT_D24_UNORM_S8_UINT = 45] = "DXGI_FORMAT_D24_UNORM_S8_UINT", n[n.DXGI_FORMAT_R24_UNORM_X8_TYPELESS = 46] = "DXGI_FORMAT_R24_UNORM_X8_TYPELESS", n[n.DXGI_FORMAT_X24_TYPELESS_G8_UINT = 47] = "DXGI_FORMAT_X24_TYPELESS_G8_UINT", n[n.DXGI_FORMAT_R8G8_TYPELESS = 48] = "DXGI_FORMAT_R8G8_TYPELESS", n[n.DXGI_FORMAT_R8G8_UNORM = 49] = "DXGI_FORMAT_R8G8_UNORM", n[n.DXGI_FORMAT_R8G8_UINT = 50] = "DXGI_FORMAT_R8G8_UINT", n[n.DXGI_FORMAT_R8G8_SNORM = 51] = "DXGI_FORMAT_R8G8_SNORM", n[n.DXGI_FORMAT_R8G8_SINT = 52] = "DXGI_FORMAT_R8G8_SINT", n[n.DXGI_FORMAT_R16_TYPELESS = 53] = "DXGI_FORMAT_R16_TYPELESS", n[n.DXGI_FORMAT_R16_FLOAT = 54] = "DXGI_FORMAT_R16_FLOAT", n[n.DXGI_FORMAT_D16_UNORM = 55] = "DXGI_FORMAT_D16_UNORM", n[n.DXGI_FORMAT_R16_UNORM = 56] = "DXGI_FORMAT_R16_UNORM", n[n.DXGI_FORMAT_R16_UINT = 57] = "DXGI_FORMAT_R16_UINT", n[n.DXGI_FORMAT_R16_SNORM = 58] = "DXGI_FORMAT_R16_SNORM", n[n.DXGI_FORMAT_R16_SINT = 59] = "DXGI_FORMAT_R16_SINT", n[n.DXGI_FORMAT_R8_TYPELESS = 60] = "DXGI_FORMAT_R8_TYPELESS", n[n.DXGI_FORMAT_R8_UNORM = 61] = "DXGI_FORMAT_R8_UNORM", n[n.DXGI_FORMAT_R8_UINT = 62] = "DXGI_FORMAT_R8_UINT", n[n.DXGI_FORMAT_R8_SNORM = 63] = "DXGI_FORMAT_R8_SNORM", n[n.DXGI_FORMAT_R8_SINT = 64] = "DXGI_FORMAT_R8_SINT", n[n.DXGI_FORMAT_A8_UNORM = 65] = "DXGI_FORMAT_A8_UNORM", n[n.DXGI_FORMAT_R1_UNORM = 66] = "DXGI_FORMAT_R1_UNORM", n[n.DXGI_FORMAT_R9G9B9E5_SHAREDEXP = 67] = "DXGI_FORMAT_R9G9B9E5_SHAREDEXP", n[n.DXGI_FORMAT_R8G8_B8G8_UNORM = 68] = "DXGI_FORMAT_R8G8_B8G8_UNORM", n[n.DXGI_FORMAT_G8R8_G8B8_UNORM = 69] = "DXGI_FORMAT_G8R8_G8B8_UNORM", n[n.DXGI_FORMAT_BC1_TYPELESS = 70] = "DXGI_FORMAT_BC1_TYPELESS", n[n.DXGI_FORMAT_BC1_UNORM = 71] = "DXGI_FORMAT_BC1_UNORM", n[n.DXGI_FORMAT_BC1_UNORM_SRGB = 72] = "DXGI_FORMAT_BC1_UNORM_SRGB", n[n.DXGI_FORMAT_BC2_TYPELESS = 73] = "DXGI_FORMAT_BC2_TYPELESS", n[n.DXGI_FORMAT_BC2_UNORM = 74] = "DXGI_FORMAT_BC2_UNORM", n[n.DXGI_FORMAT_BC2_UNORM_SRGB = 75] = "DXGI_FORMAT_BC2_UNORM_SRGB", n[n.DXGI_FORMAT_BC3_TYPELESS = 76] = "DXGI_FORMAT_BC3_TYPELESS", n[n.DXGI_FORMAT_BC3_UNORM = 77] = "DXGI_FORMAT_BC3_UNORM", n[n.DXGI_FORMAT_BC3_UNORM_SRGB = 78] = "DXGI_FORMAT_BC3_UNORM_SRGB", n[n.DXGI_FORMAT_BC4_TYPELESS = 79] = "DXGI_FORMAT_BC4_TYPELESS", n[n.DXGI_FORMAT_BC4_UNORM = 80] = "DXGI_FORMAT_BC4_UNORM", n[n.DXGI_FORMAT_BC4_SNORM = 81] = "DXGI_FORMAT_BC4_SNORM", n[n.DXGI_FORMAT_BC5_TYPELESS = 82] = "DXGI_FORMAT_BC5_TYPELESS", n[n.DXGI_FORMAT_BC5_UNORM = 83] = "DXGI_FORMAT_BC5_UNORM", n[n.DXGI_FORMAT_BC5_SNORM = 84] = "DXGI_FORMAT_BC5_SNORM", n[n.DXGI_FORMAT_B5G6R5_UNORM = 85] = "DXGI_FORMAT_B5G6R5_UNORM", n[n.DXGI_FORMAT_B5G5R5A1_UNORM = 86] = "DXGI_FORMAT_B5G5R5A1_UNORM", n[n.DXGI_FORMAT_B8G8R8A8_UNORM = 87] = "DXGI_FORMAT_B8G8R8A8_UNORM", n[n.DXGI_FORMAT_B8G8R8X8_UNORM = 88] = "DXGI_FORMAT_B8G8R8X8_UNORM", n[n.DXGI_FORMAT_R10G10B10_XR_BIAS_A2_UNORM = 89] = "DXGI_FORMAT_R10G10B10_XR_BIAS_A2_UNORM", n[n.DXGI_FORMAT_B8G8R8A8_TYPELESS = 90] = "DXGI_FORMAT_B8G8R8A8_TYPELESS", n[n.DXGI_FORMAT_B8G8R8A8_UNORM_SRGB = 91] = "DXGI_FORMAT_B8G8R8A8_UNORM_SRGB", n[n.DXGI_FORMAT_B8G8R8X8_TYPELESS = 92] = "DXGI_FORMAT_B8G8R8X8_TYPELESS", n[n.DXGI_FORMAT_B8G8R8X8_UNORM_SRGB = 93] = "DXGI_FORMAT_B8G8R8X8_UNORM_SRGB", n[n.DXGI_FORMAT_BC6H_TYPELESS = 94] = "DXGI_FORMAT_BC6H_TYPELESS", n[n.DXGI_FORMAT_BC6H_UF16 = 95] = "DXGI_FORMAT_BC6H_UF16", n[n.DXGI_FORMAT_BC6H_SF16 = 96] = "DXGI_FORMAT_BC6H_SF16", n[n.DXGI_FORMAT_BC7_TYPELESS = 97] = "DXGI_FORMAT_BC7_TYPELESS", n[n.DXGI_FORMAT_BC7_UNORM = 98] = "DXGI_FORMAT_BC7_UNORM", n[n.DXGI_FORMAT_BC7_UNORM_SRGB = 99] = "DXGI_FORMAT_BC7_UNORM_SRGB", n[n.DXGI_FORMAT_AYUV = 100] = "DXGI_FORMAT_AYUV", n[n.DXGI_FORMAT_Y410 = 101] = "DXGI_FORMAT_Y410", n[n.DXGI_FORMAT_Y416 = 102] = "DXGI_FORMAT_Y416", n[n.DXGI_FORMAT_NV12 = 103] = "DXGI_FORMAT_NV12", n[n.DXGI_FORMAT_P010 = 104] = "DXGI_FORMAT_P010", n[n.DXGI_FORMAT_P016 = 105] = "DXGI_FORMAT_P016", n[n.DXGI_FORMAT_420_OPAQUE = 106] = "DXGI_FORMAT_420_OPAQUE", n[n.DXGI_FORMAT_YUY2 = 107] = "DXGI_FORMAT_YUY2", n[n.DXGI_FORMAT_Y210 = 108] = "DXGI_FORMAT_Y210", n[n.DXGI_FORMAT_Y216 = 109] = "DXGI_FORMAT_Y216", n[n.DXGI_FORMAT_NV11 = 110] = "DXGI_FORMAT_NV11", n[n.DXGI_FORMAT_AI44 = 111] = "DXGI_FORMAT_AI44", n[n.DXGI_FORMAT_IA44 = 112] = "DXGI_FORMAT_IA44", n[n.DXGI_FORMAT_P8 = 113] = "DXGI_FORMAT_P8", n[n.DXGI_FORMAT_A8P8 = 114] = "DXGI_FORMAT_A8P8", n[n.DXGI_FORMAT_B4G4R4A4_UNORM = 115] = "DXGI_FORMAT_B4G4R4A4_UNORM", n[n.DXGI_FORMAT_P208 = 116] = "DXGI_FORMAT_P208", n[n.DXGI_FORMAT_V208 = 117] = "DXGI_FORMAT_V208", n[n.DXGI_FORMAT_V408 = 118] = "DXGI_FORMAT_V408", n[n.DXGI_FORMAT_SAMPLER_FEEDBACK_MIN_MIP_OPAQUE = 119] = "DXGI_FORMAT_SAMPLER_FEEDBACK_MIN_MIP_OPAQUE", n[n.DXGI_FORMAT_SAMPLER_FEEDBACK_MIP_REGION_USED_OPAQUE = 120] = "DXGI_FORMAT_SAMPLER_FEEDBACK_MIP_REGION_USED_OPAQUE", n[n.DXGI_FORMAT_FORCE_UINT = 121] = "DXGI_FORMAT_FORCE_UINT";
})(DXGI_FORMAT || (DXGI_FORMAT = {}));
var D3D10_RESOURCE_DIMENSION;
(function(n) {
  n[n.DDS_DIMENSION_TEXTURE1D = 2] = "DDS_DIMENSION_TEXTURE1D", n[n.DDS_DIMENSION_TEXTURE2D = 3] = "DDS_DIMENSION_TEXTURE2D", n[n.DDS_DIMENSION_TEXTURE3D = 6] = "DDS_DIMENSION_TEXTURE3D";
})(D3D10_RESOURCE_DIMENSION || (D3D10_RESOURCE_DIMENSION = {}));
var PF_FLAGS = 1, DDPF_ALPHA = 2, DDPF_FOURCC = 4, DDPF_RGB = 64, DDPF_YUV = 512, DDPF_LUMINANCE = 131072, FOURCC_DXT1 = 827611204, FOURCC_DXT3 = 861165636, FOURCC_DXT5 = 894720068, FOURCC_DX10 = 808540228, DDS_RESOURCE_MISC_TEXTURECUBE = 4, FOURCC_TO_FORMAT = (_a$1 = {}, _a$1[FOURCC_DXT1] = INTERNAL_FORMATS.COMPRESSED_RGBA_S3TC_DXT1_EXT, _a$1[FOURCC_DXT3] = INTERNAL_FORMATS.COMPRESSED_RGBA_S3TC_DXT3_EXT, _a$1[FOURCC_DXT5] = INTERNAL_FORMATS.COMPRESSED_RGBA_S3TC_DXT5_EXT, _a$1), DXGI_TO_FORMAT = (_b$1 = {}, // WEBGL_compressed_texture_s3tc
_b$1[DXGI_FORMAT.DXGI_FORMAT_BC1_TYPELESS] = INTERNAL_FORMATS.COMPRESSED_RGBA_S3TC_DXT1_EXT, _b$1[DXGI_FORMAT.DXGI_FORMAT_BC1_UNORM] = INTERNAL_FORMATS.COMPRESSED_RGBA_S3TC_DXT1_EXT, _b$1[DXGI_FORMAT.DXGI_FORMAT_BC2_TYPELESS] = INTERNAL_FORMATS.COMPRESSED_RGBA_S3TC_DXT3_EXT, _b$1[DXGI_FORMAT.DXGI_FORMAT_BC2_UNORM] = INTERNAL_FORMATS.COMPRESSED_RGBA_S3TC_DXT3_EXT, _b$1[DXGI_FORMAT.DXGI_FORMAT_BC3_TYPELESS] = INTERNAL_FORMATS.COMPRESSED_RGBA_S3TC_DXT5_EXT, _b$1[DXGI_FORMAT.DXGI_FORMAT_BC3_UNORM] = INTERNAL_FORMATS.COMPRESSED_RGBA_S3TC_DXT5_EXT, // WEBGL_compressed_texture_s3tc_srgb
_b$1[DXGI_FORMAT.DXGI_FORMAT_BC1_UNORM_SRGB] = INTERNAL_FORMATS.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT, _b$1[DXGI_FORMAT.DXGI_FORMAT_BC2_UNORM_SRGB] = INTERNAL_FORMATS.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT, _b$1[DXGI_FORMAT.DXGI_FORMAT_BC3_UNORM_SRGB] = INTERNAL_FORMATS.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT, _b$1);
function parseDDS(n) {
  var e = new Uint32Array(n), t = e[0];
  if (t !== DDS_MAGIC)
    throw new Error("Invalid DDS file magic word");
  var r = new Uint32Array(n, 0, DDS_HEADER_SIZE / Uint32Array.BYTES_PER_ELEMENT), a = r[DDS_FIELDS.HEIGHT], o = r[DDS_FIELDS.WIDTH], s = r[DDS_FIELDS.MIPMAP_COUNT], u = new Uint32Array(n, DDS_FIELDS.PIXEL_FORMAT * Uint32Array.BYTES_PER_ELEMENT, DDS_HEADER_PF_SIZE / Uint32Array.BYTES_PER_ELEMENT), h = u[PF_FLAGS];
  if (h & DDPF_FOURCC) {
    var l = u[DDS_PF_FIELDS.FOURCC];
    if (l !== FOURCC_DX10) {
      var c = FOURCC_TO_FORMAT[l], v = DDS_MAGIC_SIZE + DDS_HEADER_SIZE, d = new Uint8Array(n, v), g = new CompressedTextureResource(d, {
        format: c,
        width: o,
        height: a,
        levels: s
        // CompressedTextureResource will separate the levelBuffers for us!
      });
      return [g];
    }
    var m = DDS_MAGIC_SIZE + DDS_HEADER_SIZE, _ = new Uint32Array(e.buffer, m, DDS_HEADER_DX10_SIZE / Uint32Array.BYTES_PER_ELEMENT), y = _[DDS_DX10_FIELDS.DXGI_FORMAT], b = _[DDS_DX10_FIELDS.RESOURCE_DIMENSION], S = _[DDS_DX10_FIELDS.MISC_FLAG], O = _[DDS_DX10_FIELDS.ARRAY_SIZE], D = DXGI_TO_FORMAT[y];
    if (D === void 0)
      throw new Error("DDSParser cannot parse texture data with DXGI format " + y);
    if (S === DDS_RESOURCE_MISC_TEXTURECUBE)
      throw new Error("DDSParser does not support cubemap textures");
    if (b === D3D10_RESOURCE_DIMENSION.DDS_DIMENSION_TEXTURE3D)
      throw new Error("DDSParser does not supported 3D texture data");
    var E = new Array(), M = DDS_MAGIC_SIZE + DDS_HEADER_SIZE + DDS_HEADER_DX10_SIZE;
    if (O === 1)
      E.push(new Uint8Array(n, M));
    else {
      for (var A = INTERNAL_FORMAT_TO_BYTES_PER_PIXEL[D], $ = 0, B = o, U = a, X = 0; X < s; X++) {
        var G = Math.max(1, B + 3 & -4), K = Math.max(1, U + 3 & -4), tt = G * K * A;
        $ += tt, B = B >>> 1, U = U >>> 1;
      }
      for (var Y = M, X = 0; X < O; X++)
        E.push(new Uint8Array(n, Y, $)), Y += $;
    }
    return E.map(function(P) {
      return new CompressedTextureResource(P, {
        format: D,
        width: o,
        height: a,
        levels: s
      });
    });
  }
  throw h & DDPF_RGB ? new Error("DDSParser does not support uncompressed texture data.") : h & DDPF_YUV ? new Error("DDSParser does not supported YUV uncompressed texture data.") : h & DDPF_LUMINANCE ? new Error("DDSParser does not support single-channel (lumninance) texture data!") : h & DDPF_ALPHA ? new Error("DDSParser does not support single-channel (alpha) texture data!") : new Error("DDSParser failed to load a texture file due to an unknown reason!");
}
var _a$3, _b, _c, FILE_IDENTIFIER = [171, 75, 84, 88, 32, 49, 49, 187, 13, 10, 26, 10], ENDIANNESS = 67305985, KTX_FIELDS = {
  ENDIANNESS: 12,
  GL_TYPE: 16,
  GL_FORMAT: 24,
  GL_INTERNAL_FORMAT: 28,
  PIXEL_WIDTH: 36,
  PIXEL_HEIGHT: 40,
  PIXEL_DEPTH: 44,
  NUMBER_OF_ARRAY_ELEMENTS: 48,
  NUMBER_OF_FACES: 52,
  NUMBER_OF_MIPMAP_LEVELS: 56,
  BYTES_OF_KEY_VALUE_DATA: 60
}, FILE_HEADER_SIZE = 64, TYPES_TO_BYTES_PER_COMPONENT = (_a$3 = {}, _a$3[TYPES.UNSIGNED_BYTE] = 1, _a$3[TYPES.UNSIGNED_SHORT] = 2, _a$3[TYPES.INT] = 4, _a$3[TYPES.UNSIGNED_INT] = 4, _a$3[TYPES.FLOAT] = 4, _a$3[TYPES.HALF_FLOAT] = 8, _a$3), FORMATS_TO_COMPONENTS = (_b = {}, _b[FORMATS.RGBA] = 4, _b[FORMATS.RGB] = 3, _b[FORMATS.RG] = 2, _b[FORMATS.RED] = 1, _b[FORMATS.LUMINANCE] = 1, _b[FORMATS.LUMINANCE_ALPHA] = 2, _b[FORMATS.ALPHA] = 1, _b), TYPES_TO_BYTES_PER_PIXEL = (_c = {}, _c[TYPES.UNSIGNED_SHORT_4_4_4_4] = 2, _c[TYPES.UNSIGNED_SHORT_5_5_5_1] = 2, _c[TYPES.UNSIGNED_SHORT_5_6_5] = 2, _c);
function parseKTX(n, e, t) {
  t === void 0 && (t = !1);
  var r = new DataView(e);
  if (!validate(n, r))
    return null;
  var a = r.getUint32(KTX_FIELDS.ENDIANNESS, !0) === ENDIANNESS, o = r.getUint32(KTX_FIELDS.GL_TYPE, a), s = r.getUint32(KTX_FIELDS.GL_FORMAT, a), u = r.getUint32(KTX_FIELDS.GL_INTERNAL_FORMAT, a), h = r.getUint32(KTX_FIELDS.PIXEL_WIDTH, a), l = r.getUint32(KTX_FIELDS.PIXEL_HEIGHT, a) || 1, c = r.getUint32(KTX_FIELDS.PIXEL_DEPTH, a) || 1, v = r.getUint32(KTX_FIELDS.NUMBER_OF_ARRAY_ELEMENTS, a) || 1, d = r.getUint32(KTX_FIELDS.NUMBER_OF_FACES, a), g = r.getUint32(KTX_FIELDS.NUMBER_OF_MIPMAP_LEVELS, a), m = r.getUint32(KTX_FIELDS.BYTES_OF_KEY_VALUE_DATA, a);
  if (l === 0 || c !== 1)
    throw new Error("Only 2D textures are supported");
  if (d !== 1)
    throw new Error("CubeTextures are not supported by KTXLoader yet!");
  if (v !== 1)
    throw new Error("WebGL does not support array textures");
  var _ = 4, y = 4, b = h + 3 & -4, S = l + 3 & -4, O = new Array(v), D = h * l;
  o === 0 && (D = b * S);
  var E;
  if (o !== 0 ? TYPES_TO_BYTES_PER_COMPONENT[o] ? E = TYPES_TO_BYTES_PER_COMPONENT[o] * FORMATS_TO_COMPONENTS[s] : E = TYPES_TO_BYTES_PER_PIXEL[o] : E = INTERNAL_FORMAT_TO_BYTES_PER_PIXEL[u], E === void 0)
    throw new Error("Unable to resolve the pixel format stored in the *.ktx file!");
  for (var M = t ? parseKvData(r, m, a) : null, A = D * E, $ = A, B = h, U = l, X = b, G = S, K = FILE_HEADER_SIZE + m, tt = 0; tt < g; tt++) {
    for (var Y = r.getUint32(K, a), P = K + 4, I = 0; I < v; I++) {
      var T = O[I];
      T || (T = O[I] = new Array(g)), T[tt] = {
        levelID: tt,
        // don't align mipWidth when texture not compressed! (glType not zero)
        levelWidth: g > 1 || o !== 0 ? B : X,
        levelHeight: g > 1 || o !== 0 ? U : G,
        levelBuffer: new Uint8Array(e, P, $)
      }, P += $;
    }
    K += Y + 4, K = K % 4 !== 0 ? K + 4 - K % 4 : K, B = B >> 1 || 1, U = U >> 1 || 1, X = B + _ - 1 & -4, G = U + y - 1 & -4, $ = X * G * E;
  }
  return o !== 0 ? {
    uncompressed: O.map(function(C) {
      var R = C[0].levelBuffer, w = !1;
      return o === TYPES.FLOAT ? R = new Float32Array(C[0].levelBuffer.buffer, C[0].levelBuffer.byteOffset, C[0].levelBuffer.byteLength / 4) : o === TYPES.UNSIGNED_INT ? (w = !0, R = new Uint32Array(C[0].levelBuffer.buffer, C[0].levelBuffer.byteOffset, C[0].levelBuffer.byteLength / 4)) : o === TYPES.INT && (w = !0, R = new Int32Array(C[0].levelBuffer.buffer, C[0].levelBuffer.byteOffset, C[0].levelBuffer.byteLength / 4)), {
        resource: new BufferResource(R, {
          width: C[0].levelWidth,
          height: C[0].levelHeight
        }),
        type: o,
        format: w ? convertFormatToInteger(s) : s
      };
    }),
    kvData: M
  } : {
    compressed: O.map(function(C) {
      return new CompressedTextureResource(null, {
        format: u,
        width: h,
        height: l,
        levels: g,
        levelBuffers: C
      });
    }),
    kvData: M
  };
}
function validate(n, e) {
  for (var t = 0; t < FILE_IDENTIFIER.length; t++)
    if (e.getUint8(t) !== FILE_IDENTIFIER[t])
      return console.error(n + " is not a valid *.ktx file!"), !1;
  return !0;
}
function convertFormatToInteger(n) {
  switch (n) {
    case FORMATS.RGBA:
      return FORMATS.RGBA_INTEGER;
    case FORMATS.RGB:
      return FORMATS.RGB_INTEGER;
    case FORMATS.RG:
      return FORMATS.RG_INTEGER;
    case FORMATS.RED:
      return FORMATS.RED_INTEGER;
    default:
      return n;
  }
}
function parseKvData(n, e, t) {
  for (var r = /* @__PURE__ */ new Map(), a = 0; a < e; ) {
    var o = n.getUint32(FILE_HEADER_SIZE + a, t), s = FILE_HEADER_SIZE + a + 4, u = 3 - (o + 3) % 4;
    if (o === 0 || o > e - a) {
      console.error("KTXLoader: keyAndValueByteSize out of bounds");
      break;
    }
    for (var h = 0; h < o && n.getUint8(s + h) !== 0; h++)
      ;
    if (h === -1) {
      console.error("KTXLoader: Failed to find null byte terminating kvData key");
      break;
    }
    var l = new TextDecoder().decode(new Uint8Array(n.buffer, s, h)), c = new DataView(n.buffer, s + h + 1, o - h - 1);
    r.set(l, c), a += 4 + o + u;
  }
  return r;
}
LoaderResource.setExtensionXhrType("dds", LoaderResource.XHR_RESPONSE_TYPE.BUFFER);
var DDSLoader = (
  /** @class */
  function() {
    function n() {
    }
    return n.use = function(e, t) {
      if (e.extension === "dds" && e.data)
        try {
          Object.assign(e, registerCompressedTextures(e.name || e.url, parseDDS(e.data), e.metadata));
        } catch (r) {
          t(r);
          return;
        }
      t();
    }, n.extension = ExtensionType.Loader, n;
  }()
);
LoaderResource.setExtensionXhrType("ktx", LoaderResource.XHR_RESPONSE_TYPE.BUFFER);
var KTXLoader = (
  /** @class */
  function() {
    function n() {
    }
    return n.use = function(e, t) {
      if (e.extension === "ktx" && e.data)
        try {
          var r = e.name || e.url, a = parseKTX(r, e.data, this.loadKeyValueData), o = a.compressed, s = a.uncompressed, u = a.kvData;
          if (o) {
            var h = registerCompressedTextures(r, o, e.metadata);
            if (u && h.textures)
              for (var l in h.textures)
                h.textures[l].baseTexture.ktxKeyValueData = u;
            Object.assign(e, h);
          } else if (s) {
            var c = {};
            s.forEach(function(v, d) {
              var g = new Texture(new BaseTexture(v.resource, {
                mipmap: MIPMAP_MODES.OFF,
                alphaMode: ALPHA_MODES.NO_PREMULTIPLIED_ALPHA,
                type: v.type,
                format: v.format
              })), m = r + "-" + (d + 1);
              u && (g.baseTexture.ktxKeyValueData = u), BaseTexture.addToCache(g.baseTexture, m), Texture.addToCache(g, m), d === 0 && (c[r] = g, BaseTexture.addToCache(g.baseTexture, r), Texture.addToCache(g, r)), c[m] = g;
            }), Object.assign(e, { textures: c });
          }
        } catch (v) {
          t(v);
          return;
        }
      t();
    }, n.extension = ExtensionType.Loader, n.loadKeyValueData = !1, n;
  }()
);
var extendStatics$f = function(n, e) {
  return extendStatics$f = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, r) {
    t.__proto__ = r;
  } || function(t, r) {
    for (var a in r)
      r.hasOwnProperty(a) && (t[a] = r[a]);
  }, extendStatics$f(n, e);
};
function __extends$f(n, e) {
  extendStatics$f(n, e);
  function t() {
    this.constructor = n;
  }
  n.prototype = e === null ? Object.create(e) : (t.prototype = e.prototype, new t());
}
(function(n) {
  __extends$f(e, n);
  function e(t, r, a, o) {
    t === void 0 && (t = 1500), a === void 0 && (a = 16384), o === void 0 && (o = !1);
    var s = n.call(this) || this, u = 16384;
    return a > u && (a = u), s._properties = [!1, !0, !1, !1, !1], s._maxSize = t, s._batchSize = a, s._buffers = null, s._bufferUpdateIDs = [], s._updateID = 0, s.interactiveChildren = !1, s.blendMode = BLEND_MODES.NORMAL, s.autoResize = o, s.roundPixels = !0, s.baseTexture = null, s.setProperties(r), s._tint = 0, s.tintRgb = new Float32Array(4), s.tint = 16777215, s;
  }
  return e.prototype.setProperties = function(t) {
    t && (this._properties[0] = "vertices" in t || "scale" in t ? !!t.vertices || !!t.scale : this._properties[0], this._properties[1] = "position" in t ? !!t.position : this._properties[1], this._properties[2] = "rotation" in t ? !!t.rotation : this._properties[2], this._properties[3] = "uvs" in t ? !!t.uvs : this._properties[3], this._properties[4] = "tint" in t || "alpha" in t ? !!t.tint || !!t.alpha : this._properties[4]);
  }, e.prototype.updateTransform = function() {
    this.displayObjectUpdateTransform();
  }, Object.defineProperty(e.prototype, "tint", {
    /**
     * The tint applied to the container. This is a hex value.
     * A value of 0xFFFFFF will remove any tint effect.
     * IMPORTANT: This is a WebGL only feature and will be ignored by the canvas renderer.
     * @default 0xFFFFFF
     */
    get: function() {
      return this._tint;
    },
    set: function(t) {
      this._tint = t, hex2rgb(t, this.tintRgb);
    },
    enumerable: !1,
    configurable: !0
  }), e.prototype.render = function(t) {
    var r = this;
    !this.visible || this.worldAlpha <= 0 || !this.children.length || !this.renderable || (this.baseTexture || (this.baseTexture = this.children[0]._texture.baseTexture, this.baseTexture.valid || this.baseTexture.once("update", function() {
      return r.onChildrenChange(0);
    })), t.batch.setObjectRenderer(t.plugins.particle), t.plugins.particle.render(this));
  }, e.prototype.onChildrenChange = function(t) {
    for (var r = Math.floor(t / this._batchSize); this._bufferUpdateIDs.length < r; )
      this._bufferUpdateIDs.push(0);
    this._bufferUpdateIDs[r] = ++this._updateID;
  }, e.prototype.dispose = function() {
    if (this._buffers) {
      for (var t = 0; t < this._buffers.length; ++t)
        this._buffers[t].destroy();
      this._buffers = null;
    }
  }, e.prototype.destroy = function(t) {
    n.prototype.destroy.call(this, t), this.dispose(), this._properties = null, this._buffers = null, this._bufferUpdateIDs = null;
  }, e;
})(Container);
var ParticleBuffer = (
  /** @class */
  function() {
    function n(e, t, r) {
      this.geometry = new Geometry(), this.indexBuffer = null, this.size = r, this.dynamicProperties = [], this.staticProperties = [];
      for (var a = 0; a < e.length; ++a) {
        var o = e[a];
        o = {
          attributeName: o.attributeName,
          size: o.size,
          uploadFunction: o.uploadFunction,
          type: o.type || TYPES.FLOAT,
          offset: o.offset
        }, t[a] ? this.dynamicProperties.push(o) : this.staticProperties.push(o);
      }
      this.staticStride = 0, this.staticBuffer = null, this.staticData = null, this.staticDataUint32 = null, this.dynamicStride = 0, this.dynamicBuffer = null, this.dynamicData = null, this.dynamicDataUint32 = null, this._updateID = 0, this.initBuffers();
    }
    return n.prototype.initBuffers = function() {
      var e = this.geometry, t = 0;
      this.indexBuffer = new Buffer(createIndicesForQuads(this.size), !0, !0), e.addIndex(this.indexBuffer), this.dynamicStride = 0;
      for (var r = 0; r < this.dynamicProperties.length; ++r) {
        var a = this.dynamicProperties[r];
        a.offset = t, t += a.size, this.dynamicStride += a.size;
      }
      var o = new ArrayBuffer(this.size * this.dynamicStride * 4 * 4);
      this.dynamicData = new Float32Array(o), this.dynamicDataUint32 = new Uint32Array(o), this.dynamicBuffer = new Buffer(this.dynamicData, !1, !1);
      var s = 0;
      this.staticStride = 0;
      for (var r = 0; r < this.staticProperties.length; ++r) {
        var a = this.staticProperties[r];
        a.offset = s, s += a.size, this.staticStride += a.size;
      }
      var u = new ArrayBuffer(this.size * this.staticStride * 4 * 4);
      this.staticData = new Float32Array(u), this.staticDataUint32 = new Uint32Array(u), this.staticBuffer = new Buffer(this.staticData, !0, !1);
      for (var r = 0; r < this.dynamicProperties.length; ++r) {
        var a = this.dynamicProperties[r];
        e.addAttribute(a.attributeName, this.dynamicBuffer, 0, a.type === TYPES.UNSIGNED_BYTE, a.type, this.dynamicStride * 4, a.offset * 4);
      }
      for (var r = 0; r < this.staticProperties.length; ++r) {
        var a = this.staticProperties[r];
        e.addAttribute(a.attributeName, this.staticBuffer, 0, a.type === TYPES.UNSIGNED_BYTE, a.type, this.staticStride * 4, a.offset * 4);
      }
    }, n.prototype.uploadDynamic = function(e, t, r) {
      for (var a = 0; a < this.dynamicProperties.length; a++) {
        var o = this.dynamicProperties[a];
        o.uploadFunction(e, t, r, o.type === TYPES.UNSIGNED_BYTE ? this.dynamicDataUint32 : this.dynamicData, this.dynamicStride, o.offset);
      }
      this.dynamicBuffer._updateID++;
    }, n.prototype.uploadStatic = function(e, t, r) {
      for (var a = 0; a < this.staticProperties.length; a++) {
        var o = this.staticProperties[a];
        o.uploadFunction(e, t, r, o.type === TYPES.UNSIGNED_BYTE ? this.staticDataUint32 : this.staticData, this.staticStride, o.offset);
      }
      this.staticBuffer._updateID++;
    }, n.prototype.destroy = function() {
      this.indexBuffer = null, this.dynamicProperties = null, this.dynamicBuffer = null, this.dynamicData = null, this.dynamicDataUint32 = null, this.staticProperties = null, this.staticBuffer = null, this.staticData = null, this.staticDataUint32 = null, this.geometry.destroy();
    }, n;
  }()
), fragment$6 = `varying vec2 vTextureCoord;
varying vec4 vColor;

uniform sampler2D uSampler;

void main(void){
    vec4 color = texture2D(uSampler, vTextureCoord) * vColor;
    gl_FragColor = color;
}`, vertex$3 = `attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;
attribute vec4 aColor;

attribute vec2 aPositionCoord;
attribute float aRotation;

uniform mat3 translationMatrix;
uniform vec4 uColor;

varying vec2 vTextureCoord;
varying vec4 vColor;

void main(void){
    float x = (aVertexPosition.x) * cos(aRotation) - (aVertexPosition.y) * sin(aRotation);
    float y = (aVertexPosition.x) * sin(aRotation) + (aVertexPosition.y) * cos(aRotation);

    vec2 v = vec2(x, y);
    v = v + aPositionCoord;

    gl_Position = vec4((translationMatrix * vec3(v, 1.0)).xy, 0.0, 1.0);

    vTextureCoord = aTextureCoord;
    vColor = aColor * uColor;
}
`, ParticleRenderer = (
  /** @class */
  function(n) {
    __extends$f(e, n);
    function e(t) {
      var r = n.call(this, t) || this;
      return r.shader = null, r.properties = null, r.tempMatrix = new Matrix(), r.properties = [
        // verticesData
        {
          attributeName: "aVertexPosition",
          size: 2,
          uploadFunction: r.uploadVertices,
          offset: 0
        },
        // positionData
        {
          attributeName: "aPositionCoord",
          size: 2,
          uploadFunction: r.uploadPosition,
          offset: 0
        },
        // rotationData
        {
          attributeName: "aRotation",
          size: 1,
          uploadFunction: r.uploadRotation,
          offset: 0
        },
        // uvsData
        {
          attributeName: "aTextureCoord",
          size: 2,
          uploadFunction: r.uploadUvs,
          offset: 0
        },
        // tintData
        {
          attributeName: "aColor",
          size: 1,
          type: TYPES.UNSIGNED_BYTE,
          uploadFunction: r.uploadTint,
          offset: 0
        }
      ], r.shader = Shader.from(vertex$3, fragment$6, {}), r.state = State.for2d(), r;
    }
    return e.prototype.render = function(t) {
      var r = t.children, a = t._maxSize, o = t._batchSize, s = this.renderer, u = r.length;
      if (u !== 0) {
        u > a && !t.autoResize && (u = a);
        var h = t._buffers;
        h || (h = t._buffers = this.generateBuffers(t));
        var l = r[0]._texture.baseTexture, c = l.alphaMode > 0;
        this.state.blendMode = correctBlendMode(t.blendMode, c), s.state.set(this.state);
        var v = s.gl, d = t.worldTransform.copyTo(this.tempMatrix);
        d.prepend(s.globalUniforms.uniforms.projectionMatrix), this.shader.uniforms.translationMatrix = d.toArray(!0), this.shader.uniforms.uColor = premultiplyRgba(t.tintRgb, t.worldAlpha, this.shader.uniforms.uColor, c), this.shader.uniforms.uSampler = l, this.renderer.shader.bind(this.shader);
        for (var g = !1, m = 0, _ = 0; m < u; m += o, _ += 1) {
          var y = u - m;
          y > o && (y = o), _ >= h.length && h.push(this._generateOneMoreBuffer(t));
          var b = h[_];
          b.uploadDynamic(r, m, y);
          var S = t._bufferUpdateIDs[_] || 0;
          g = g || b._updateID < S, g && (b._updateID = t._updateID, b.uploadStatic(r, m, y)), s.geometry.bind(b.geometry), v.drawElements(v.TRIANGLES, y * 6, v.UNSIGNED_SHORT, 0);
        }
      }
    }, e.prototype.generateBuffers = function(t) {
      for (var r = [], a = t._maxSize, o = t._batchSize, s = t._properties, u = 0; u < a; u += o)
        r.push(new ParticleBuffer(this.properties, s, o));
      return r;
    }, e.prototype._generateOneMoreBuffer = function(t) {
      var r = t._batchSize, a = t._properties;
      return new ParticleBuffer(this.properties, a, r);
    }, e.prototype.uploadVertices = function(t, r, a, o, s, u) {
      for (var h = 0, l = 0, c = 0, v = 0, d = 0; d < a; ++d) {
        var g = t[r + d], m = g._texture, _ = g.scale.x, y = g.scale.y, b = m.trim, S = m.orig;
        b ? (l = b.x - g.anchor.x * S.width, h = l + b.width, v = b.y - g.anchor.y * S.height, c = v + b.height) : (h = S.width * (1 - g.anchor.x), l = S.width * -g.anchor.x, c = S.height * (1 - g.anchor.y), v = S.height * -g.anchor.y), o[u] = l * _, o[u + 1] = v * y, o[u + s] = h * _, o[u + s + 1] = v * y, o[u + s * 2] = h * _, o[u + s * 2 + 1] = c * y, o[u + s * 3] = l * _, o[u + s * 3 + 1] = c * y, u += s * 4;
      }
    }, e.prototype.uploadPosition = function(t, r, a, o, s, u) {
      for (var h = 0; h < a; h++) {
        var l = t[r + h].position;
        o[u] = l.x, o[u + 1] = l.y, o[u + s] = l.x, o[u + s + 1] = l.y, o[u + s * 2] = l.x, o[u + s * 2 + 1] = l.y, o[u + s * 3] = l.x, o[u + s * 3 + 1] = l.y, u += s * 4;
      }
    }, e.prototype.uploadRotation = function(t, r, a, o, s, u) {
      for (var h = 0; h < a; h++) {
        var l = t[r + h].rotation;
        o[u] = l, o[u + s] = l, o[u + s * 2] = l, o[u + s * 3] = l, u += s * 4;
      }
    }, e.prototype.uploadUvs = function(t, r, a, o, s, u) {
      for (var h = 0; h < a; ++h) {
        var l = t[r + h]._texture._uvs;
        l ? (o[u] = l.x0, o[u + 1] = l.y0, o[u + s] = l.x1, o[u + s + 1] = l.y1, o[u + s * 2] = l.x2, o[u + s * 2 + 1] = l.y2, o[u + s * 3] = l.x3, o[u + s * 3 + 1] = l.y3, u += s * 4) : (o[u] = 0, o[u + 1] = 0, o[u + s] = 0, o[u + s + 1] = 0, o[u + s * 2] = 0, o[u + s * 2 + 1] = 0, o[u + s * 3] = 0, o[u + s * 3 + 1] = 0, u += s * 4);
      }
    }, e.prototype.uploadTint = function(t, r, a, o, s, u) {
      for (var h = 0; h < a; ++h) {
        var l = t[r + h], c = l._texture.baseTexture.alphaMode > 0, v = l.alpha, d = v < 1 && c ? premultiplyTint(l._tintRGB, v) : l._tintRGB + (v * 255 << 24);
        o[u] = d, o[u + s] = d, o[u + s * 2] = d, o[u + s * 3] = d, u += s * 4;
      }
    }, e.prototype.destroy = function() {
      n.prototype.destroy.call(this), this.shader && (this.shader.destroy(), this.shader = null), this.tempMatrix = null;
    }, e.extension = {
      name: "particle",
      type: ExtensionType.RendererPlugin
    }, e;
  }(ObjectRenderer)
);
var LINE_JOIN;
(function(n) {
  n.MITER = "miter", n.BEVEL = "bevel", n.ROUND = "round";
})(LINE_JOIN || (LINE_JOIN = {}));
var LINE_CAP;
(function(n) {
  n.BUTT = "butt", n.ROUND = "round", n.SQUARE = "square";
})(LINE_CAP || (LINE_CAP = {}));
var GRAPHICS_CURVES = {
  adaptive: !0,
  maxLength: 10,
  minSegments: 8,
  maxSegments: 2048,
  epsilon: 1e-4,
  _segmentsCount: function(n, e) {
    if (e === void 0 && (e = 20), !this.adaptive || !n || isNaN(n))
      return e;
    var t = Math.ceil(n / this.maxLength);
    return t < this.minSegments ? t = this.minSegments : t > this.maxSegments && (t = this.maxSegments), t;
  }
}, FillStyle = (
  /** @class */
  function() {
    function n() {
      this.color = 16777215, this.alpha = 1, this.texture = Texture.WHITE, this.matrix = null, this.visible = !1, this.reset();
    }
    return n.prototype.clone = function() {
      var e = new n();
      return e.color = this.color, e.alpha = this.alpha, e.texture = this.texture, e.matrix = this.matrix, e.visible = this.visible, e;
    }, n.prototype.reset = function() {
      this.color = 16777215, this.alpha = 1, this.texture = Texture.WHITE, this.matrix = null, this.visible = !1;
    }, n.prototype.destroy = function() {
      this.texture = null, this.matrix = null;
    }, n;
  }()
);
var extendStatics$e = function(n, e) {
  return extendStatics$e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, r) {
    t.__proto__ = r;
  } || function(t, r) {
    for (var a in r)
      r.hasOwnProperty(a) && (t[a] = r[a]);
  }, extendStatics$e(n, e);
};
function __extends$e(n, e) {
  extendStatics$e(n, e);
  function t() {
    this.constructor = n;
  }
  n.prototype = e === null ? Object.create(e) : (t.prototype = e.prototype, new t());
}
function fixOrientation(n, e) {
  var t, r;
  e === void 0 && (e = !1);
  var a = n.length;
  if (!(a < 6)) {
    for (var o = 0, s = 0, u = n[a - 2], h = n[a - 1]; s < a; s += 2) {
      var l = n[s], c = n[s + 1];
      o += (l - u) * (c + h), u = l, h = c;
    }
    if (!e && o > 0 || e && o <= 0)
      for (var v = a / 2, s = v + v % 2; s < a; s += 2) {
        var d = a - s - 2, g = a - s - 1, m = s, _ = s + 1;
        t = [n[m], n[d]], n[d] = t[0], n[m] = t[1], r = [n[_], n[g]], n[g] = r[0], n[_] = r[1];
      }
  }
}
var buildPoly = {
  build: function(n) {
    n.points = n.shape.points.slice();
  },
  triangulate: function(n, e) {
    var t = n.points, r = n.holes, a = e.points, o = e.indices;
    if (t.length >= 6) {
      fixOrientation(t, !1);
      for (var s = [], u = 0; u < r.length; u++) {
        var h = r[u];
        fixOrientation(h.points, !0), s.push(t.length / 2), t = t.concat(h.points);
      }
      var l = earcut(t, s, 2);
      if (!l)
        return;
      for (var c = a.length / 2, u = 0; u < l.length; u += 3)
        o.push(l[u] + c), o.push(l[u + 1] + c), o.push(l[u + 2] + c);
      for (var u = 0; u < t.length; u++)
        a.push(t[u]);
    }
  }
}, buildCircle = {
  build: function(n) {
    var e = n.points, t, r, a, o, s, u;
    if (n.type === SHAPES.CIRC) {
      var h = n.shape;
      t = h.x, r = h.y, s = u = h.radius, a = o = 0;
    } else if (n.type === SHAPES.ELIP) {
      var l = n.shape;
      t = l.x, r = l.y, s = l.width, u = l.height, a = o = 0;
    } else {
      var c = n.shape, v = c.width / 2, d = c.height / 2;
      t = c.x + v, r = c.y + d, s = u = Math.max(0, Math.min(c.radius, Math.min(v, d))), a = v - s, o = d - u;
    }
    if (!(s >= 0 && u >= 0 && a >= 0 && o >= 0)) {
      e.length = 0;
      return;
    }
    var g = Math.ceil(2.3 * Math.sqrt(s + u)), m = g * 8 + (a ? 4 : 0) + (o ? 4 : 0);
    if (e.length = m, m !== 0) {
      if (g === 0) {
        e.length = 8, e[0] = e[6] = t + a, e[1] = e[3] = r + o, e[2] = e[4] = t - a, e[5] = e[7] = r - o;
        return;
      }
      var _ = 0, y = g * 4 + (a ? 2 : 0) + 2, b = y, S = m;
      {
        var O = a + s, D = o, E = t + O, M = t - O, A = r + D;
        if (e[_++] = E, e[_++] = A, e[--y] = A, e[--y] = M, o) {
          var $ = r - D;
          e[b++] = M, e[b++] = $, e[--S] = $, e[--S] = E;
        }
      }
      for (var B = 1; B < g; B++) {
        var U = Math.PI / 2 * (B / g), O = a + Math.cos(U) * s, D = o + Math.sin(U) * u, E = t + O, M = t - O, A = r + D, $ = r - D;
        e[_++] = E, e[_++] = A, e[--y] = A, e[--y] = M, e[b++] = M, e[b++] = $, e[--S] = $, e[--S] = E;
      }
      {
        var O = a, D = o + u, E = t + O, M = t - O, A = r + D, $ = r - D;
        e[_++] = E, e[_++] = A, e[--S] = $, e[--S] = E, a && (e[_++] = M, e[_++] = A, e[--S] = $, e[--S] = M);
      }
    }
  },
  triangulate: function(n, e) {
    var t = n.points, r = e.points, a = e.indices;
    if (t.length !== 0) {
      var o = r.length / 2, s = o, u, h;
      if (n.type !== SHAPES.RREC) {
        var l = n.shape;
        u = l.x, h = l.y;
      } else {
        var c = n.shape;
        u = c.x + c.width / 2, h = c.y + c.height / 2;
      }
      var v = n.matrix;
      r.push(n.matrix ? v.a * u + v.c * h + v.tx : u, n.matrix ? v.b * u + v.d * h + v.ty : h), o++, r.push(t[0], t[1]);
      for (var d = 2; d < t.length; d += 2)
        r.push(t[d], t[d + 1]), a.push(o++, s, o);
      a.push(s + 1, s, o);
    }
  }
}, buildRectangle = {
  build: function(n) {
    var e = n.shape, t = e.x, r = e.y, a = e.width, o = e.height, s = n.points;
    s.length = 0, s.push(t, r, t + a, r, t + a, r + o, t, r + o);
  },
  triangulate: function(n, e) {
    var t = n.points, r = e.points, a = r.length / 2;
    r.push(t[0], t[1], t[2], t[3], t[6], t[7], t[4], t[5]), e.indices.push(a, a + 1, a + 2, a + 1, a + 2, a + 3);
  }
};
function getPt(n, e, t) {
  var r = e - n;
  return n + r * t;
}
function quadraticBezierCurve(n, e, t, r, a, o, s) {
  s === void 0 && (s = []);
  for (var u = 20, h = s, l = 0, c = 0, v = 0, d = 0, g = 0, m = 0, _ = 0, y = 0; _ <= u; ++_)
    y = _ / u, l = getPt(n, t, y), c = getPt(e, r, y), v = getPt(t, a, y), d = getPt(r, o, y), g = getPt(l, v, y), m = getPt(c, d, y), !(_ === 0 && h[h.length - 2] === g && h[h.length - 1] === m) && h.push(g, m);
  return h;
}
var buildRoundedRectangle = {
  build: function(n) {
    if (Graphics.nextRoundedRectBehavior) {
      buildCircle.build(n);
      return;
    }
    var e = n.shape, t = n.points, r = e.x, a = e.y, o = e.width, s = e.height, u = Math.max(0, Math.min(e.radius, Math.min(o, s) / 2));
    t.length = 0, u ? (quadraticBezierCurve(r, a + u, r, a, r + u, a, t), quadraticBezierCurve(r + o - u, a, r + o, a, r + o, a + u, t), quadraticBezierCurve(r + o, a + s - u, r + o, a + s, r + o - u, a + s, t), quadraticBezierCurve(r + u, a + s, r, a + s, r, a + s - u, t)) : t.push(r, a, r + o, a, r + o, a + s, r, a + s);
  },
  triangulate: function(n, e) {
    if (Graphics.nextRoundedRectBehavior) {
      buildCircle.triangulate(n, e);
      return;
    }
    for (var t = n.points, r = e.points, a = e.indices, o = r.length / 2, s = earcut(t, null, 2), u = 0, h = s.length; u < h; u += 3)
      a.push(s[u] + o), a.push(s[u + 1] + o), a.push(s[u + 2] + o);
    for (var u = 0, h = t.length; u < h; u++)
      r.push(t[u], t[++u]);
  }
};
function square(n, e, t, r, a, o, s, u) {
  var h = n - t * a, l = e - r * a, c = n + t * o, v = e + r * o, d, g;
  s ? (d = r, g = -t) : (d = -r, g = t);
  var m = h + d, _ = l + g, y = c + d, b = v + g;
  return u.push(m, _), u.push(y, b), 2;
}
function round(n, e, t, r, a, o, s, u) {
  var h = t - n, l = r - e, c = Math.atan2(h, l), v = Math.atan2(a - n, o - e);
  u && c < v ? c += Math.PI * 2 : !u && c > v && (v += Math.PI * 2);
  var d = c, g = v - c, m = Math.abs(g), _ = Math.sqrt(h * h + l * l), y = (15 * m * Math.sqrt(_) / Math.PI >> 0) + 1, b = g / y;
  if (d += b, u) {
    s.push(n, e), s.push(t, r);
    for (var S = 1, O = d; S < y; S++, O += b)
      s.push(n, e), s.push(n + Math.sin(O) * _, e + Math.cos(O) * _);
    s.push(n, e), s.push(a, o);
  } else {
    s.push(t, r), s.push(n, e);
    for (var S = 1, O = d; S < y; S++, O += b)
      s.push(n + Math.sin(O) * _, e + Math.cos(O) * _), s.push(n, e);
    s.push(a, o), s.push(n, e);
  }
  return y * 2;
}
function buildNonNativeLine(n, e) {
  var t = n.shape, r = n.points || t.points.slice(), a = e.closePointEps;
  if (r.length !== 0) {
    var o = n.lineStyle, s = new Point(r[0], r[1]), u = new Point(r[r.length - 2], r[r.length - 1]), h = t.type !== SHAPES.POLY || t.closeStroke, l = Math.abs(s.x - u.x) < a && Math.abs(s.y - u.y) < a;
    if (h) {
      r = r.slice(), l && (r.pop(), r.pop(), u.set(r[r.length - 2], r[r.length - 1]));
      var c = (s.x + u.x) * 0.5, v = (u.y + s.y) * 0.5;
      r.unshift(c, v), r.push(c, v);
    }
    var d = e.points, g = r.length / 2, m = r.length, _ = d.length / 2, y = o.width / 2, b = y * y, S = o.miterLimit * o.miterLimit, O = r[0], D = r[1], E = r[2], M = r[3], A = 0, $ = 0, B = -(D - M), U = O - E, X = 0, G = 0, K = Math.sqrt(B * B + U * U);
    B /= K, U /= K, B *= y, U *= y;
    var tt = o.alignment, Y = (1 - tt) * 2, P = tt * 2;
    h || (o.cap === LINE_CAP.ROUND ? m += round(O - B * (Y - P) * 0.5, D - U * (Y - P) * 0.5, O - B * Y, D - U * Y, O + B * P, D + U * P, d, !0) + 2 : o.cap === LINE_CAP.SQUARE && (m += square(O, D, B, U, Y, P, !0, d))), d.push(O - B * Y, D - U * Y), d.push(O + B * P, D + U * P);
    for (var I = 1; I < g - 1; ++I) {
      O = r[(I - 1) * 2], D = r[(I - 1) * 2 + 1], E = r[I * 2], M = r[I * 2 + 1], A = r[(I + 1) * 2], $ = r[(I + 1) * 2 + 1], B = -(D - M), U = O - E, K = Math.sqrt(B * B + U * U), B /= K, U /= K, B *= y, U *= y, X = -(M - $), G = E - A, K = Math.sqrt(X * X + G * G), X /= K, G /= K, X *= y, G *= y;
      var T = E - O, C = D - M, R = E - A, w = $ - M, N = T * R + C * w, L = C * R - w * T, F = L < 0;
      if (Math.abs(L) < 1e-3 * Math.abs(N)) {
        d.push(E - B * Y, M - U * Y), d.push(E + B * P, M + U * P), N >= 0 && (o.join === LINE_JOIN.ROUND ? m += round(E, M, E - B * Y, M - U * Y, E - X * Y, M - G * Y, d, !1) + 4 : m += 2, d.push(E - X * P, M - G * P), d.push(E + X * Y, M + G * Y));
        continue;
      }
      var z = (-B + O) * (-U + M) - (-B + E) * (-U + D), J = (-X + A) * (-G + M) - (-X + E) * (-G + $), V = (T * J - R * z) / L, Z = (w * z - C * J) / L, q = (V - E) * (V - E) + (Z - M) * (Z - M), W = E + (V - E) * Y, Q = M + (Z - M) * Y, et = E - (V - E) * P, st = M - (Z - M) * P, nt = Math.min(T * T + C * C, R * R + w * w), it = F ? Y : P, rt = nt + it * it * b, at = q <= rt;
      at ? o.join === LINE_JOIN.BEVEL || q / b > S ? (F ? (d.push(W, Q), d.push(E + B * P, M + U * P), d.push(W, Q), d.push(E + X * P, M + G * P)) : (d.push(E - B * Y, M - U * Y), d.push(et, st), d.push(E - X * Y, M - G * Y), d.push(et, st)), m += 2) : o.join === LINE_JOIN.ROUND ? F ? (d.push(W, Q), d.push(E + B * P, M + U * P), m += round(E, M, E + B * P, M + U * P, E + X * P, M + G * P, d, !0) + 4, d.push(W, Q), d.push(E + X * P, M + G * P)) : (d.push(E - B * Y, M - U * Y), d.push(et, st), m += round(E, M, E - B * Y, M - U * Y, E - X * Y, M - G * Y, d, !1) + 4, d.push(E - X * Y, M - G * Y), d.push(et, st)) : (d.push(W, Q), d.push(et, st)) : (d.push(E - B * Y, M - U * Y), d.push(E + B * P, M + U * P), o.join === LINE_JOIN.ROUND ? F ? m += round(E, M, E + B * P, M + U * P, E + X * P, M + G * P, d, !0) + 2 : m += round(E, M, E - B * Y, M - U * Y, E - X * Y, M - G * Y, d, !1) + 2 : o.join === LINE_JOIN.MITER && q / b <= S && (F ? (d.push(et, st), d.push(et, st)) : (d.push(W, Q), d.push(W, Q)), m += 2), d.push(E - X * Y, M - G * Y), d.push(E + X * P, M + G * P), m += 2);
    }
    O = r[(g - 2) * 2], D = r[(g - 2) * 2 + 1], E = r[(g - 1) * 2], M = r[(g - 1) * 2 + 1], B = -(D - M), U = O - E, K = Math.sqrt(B * B + U * U), B /= K, U /= K, B *= y, U *= y, d.push(E - B * Y, M - U * Y), d.push(E + B * P, M + U * P), h || (o.cap === LINE_CAP.ROUND ? m += round(E - B * (Y - P) * 0.5, M - U * (Y - P) * 0.5, E - B * Y, M - U * Y, E + B * P, M + U * P, d, !1) + 2 : o.cap === LINE_CAP.SQUARE && (m += square(E, M, B, U, Y, P, !1, d)));
    for (var ft = e.indices, pt = GRAPHICS_CURVES.epsilon * GRAPHICS_CURVES.epsilon, I = _; I < m + _ - 2; ++I)
      O = d[I * 2], D = d[I * 2 + 1], E = d[(I + 1) * 2], M = d[(I + 1) * 2 + 1], A = d[(I + 2) * 2], $ = d[(I + 2) * 2 + 1], !(Math.abs(O * (M - $) + E * ($ - D) + A * (D - M)) < pt) && ft.push(I, I + 1, I + 2);
  }
}
function buildNativeLine(n, e) {
  var t = 0, r = n.shape, a = n.points || r.points, o = r.type !== SHAPES.POLY || r.closeStroke;
  if (a.length !== 0) {
    var s = e.points, u = e.indices, h = a.length / 2, l = s.length / 2, c = l;
    for (s.push(a[0], a[1]), t = 1; t < h; t++)
      s.push(a[t * 2], a[t * 2 + 1]), u.push(c, c + 1), c++;
    o && u.push(c, l);
  }
}
function buildLine(n, e) {
  n.lineStyle.native ? buildNativeLine(n, e) : buildNonNativeLine(n, e);
}
var ArcUtils = (
  /** @class */
  function() {
    function n() {
    }
    return n.curveTo = function(e, t, r, a, o, s) {
      var u = s[s.length - 2], h = s[s.length - 1], l = h - t, c = u - e, v = a - t, d = r - e, g = Math.abs(l * d - c * v);
      if (g < 1e-8 || o === 0)
        return (s[s.length - 2] !== e || s[s.length - 1] !== t) && s.push(e, t), null;
      var m = l * l + c * c, _ = v * v + d * d, y = l * v + c * d, b = o * Math.sqrt(m) / g, S = o * Math.sqrt(_) / g, O = b * y / m, D = S * y / _, E = b * d + S * c, M = b * v + S * l, A = c * (S + O), $ = l * (S + O), B = d * (b + D), U = v * (b + D), X = Math.atan2($ - M, A - E), G = Math.atan2(U - M, B - E);
      return {
        cx: E + e,
        cy: M + t,
        radius: o,
        startAngle: X,
        endAngle: G,
        anticlockwise: c * v > d * l
      };
    }, n.arc = function(e, t, r, a, o, s, u, h, l) {
      for (var c = u - s, v = GRAPHICS_CURVES._segmentsCount(Math.abs(c) * o, Math.ceil(Math.abs(c) / PI_2) * 40), d = c / (v * 2), g = d * 2, m = Math.cos(d), _ = Math.sin(d), y = v - 1, b = y % 1 / y, S = 0; S <= y; ++S) {
        var O = S + b * S, D = d + s + g * O, E = Math.cos(D), M = -Math.sin(D);
        l.push((m * E + _ * M) * o + r, (m * -M + _ * E) * o + a);
      }
    }, n;
  }()
), BezierUtils = (
  /** @class */
  function() {
    function n() {
    }
    return n.curveLength = function(e, t, r, a, o, s, u, h) {
      for (var l = 10, c = 0, v = 0, d = 0, g = 0, m = 0, _ = 0, y = 0, b = 0, S = 0, O = 0, D = 0, E = e, M = t, A = 1; A <= l; ++A)
        v = A / l, d = v * v, g = d * v, m = 1 - v, _ = m * m, y = _ * m, b = y * e + 3 * _ * v * r + 3 * m * d * o + g * u, S = y * t + 3 * _ * v * a + 3 * m * d * s + g * h, O = E - b, D = M - S, E = b, M = S, c += Math.sqrt(O * O + D * D);
      return c;
    }, n.curveTo = function(e, t, r, a, o, s, u) {
      var h = u[u.length - 2], l = u[u.length - 1];
      u.length -= 2;
      var c = GRAPHICS_CURVES._segmentsCount(n.curveLength(h, l, e, t, r, a, o, s)), v = 0, d = 0, g = 0, m = 0, _ = 0;
      u.push(h, l);
      for (var y = 1, b = 0; y <= c; ++y)
        b = y / c, v = 1 - b, d = v * v, g = d * v, m = b * b, _ = m * b, u.push(g * h + 3 * d * b * e + 3 * v * m * r + _ * o, g * l + 3 * d * b * t + 3 * v * m * a + _ * s);
    }, n;
  }()
), QuadraticUtils = (
  /** @class */
  function() {
    function n() {
    }
    return n.curveLength = function(e, t, r, a, o, s) {
      var u = e - 2 * r + o, h = t - 2 * a + s, l = 2 * r - 2 * e, c = 2 * a - 2 * t, v = 4 * (u * u + h * h), d = 4 * (u * l + h * c), g = l * l + c * c, m = 2 * Math.sqrt(v + d + g), _ = Math.sqrt(v), y = 2 * v * _, b = 2 * Math.sqrt(g), S = d / _;
      return (y * m + _ * d * (m - b) + (4 * g * v - d * d) * Math.log((2 * _ + S + m) / (S + b))) / (4 * y);
    }, n.curveTo = function(e, t, r, a, o) {
      for (var s = o[o.length - 2], u = o[o.length - 1], h = GRAPHICS_CURVES._segmentsCount(n.curveLength(s, u, e, t, r, a)), l = 0, c = 0, v = 1; v <= h; ++v) {
        var d = v / h;
        l = s + (e - s) * d, c = u + (t - u) * d, o.push(l + (e + (r - e) * d - l) * d, c + (t + (a - t) * d - c) * d);
      }
    }, n;
  }()
), BatchPart = (
  /** @class */
  function() {
    function n() {
      this.reset();
    }
    return n.prototype.begin = function(e, t, r) {
      this.reset(), this.style = e, this.start = t, this.attribStart = r;
    }, n.prototype.end = function(e, t) {
      this.attribSize = t - this.attribStart, this.size = e - this.start;
    }, n.prototype.reset = function() {
      this.style = null, this.size = 0, this.start = 0, this.attribStart = 0, this.attribSize = 0;
    }, n;
  }()
), _a, FILL_COMMANDS = (_a = {}, _a[SHAPES.POLY] = buildPoly, _a[SHAPES.CIRC] = buildCircle, _a[SHAPES.ELIP] = buildCircle, _a[SHAPES.RECT] = buildRectangle, _a[SHAPES.RREC] = buildRoundedRectangle, _a), BATCH_POOL = [], DRAW_CALL_POOL = [], GraphicsData = (
  /** @class */
  function() {
    function n(e, t, r, a) {
      t === void 0 && (t = null), r === void 0 && (r = null), a === void 0 && (a = null), this.points = [], this.holes = [], this.shape = e, this.lineStyle = r, this.fillStyle = t, this.matrix = a, this.type = e.type;
    }
    return n.prototype.clone = function() {
      return new n(this.shape, this.fillStyle, this.lineStyle, this.matrix);
    }, n.prototype.destroy = function() {
      this.shape = null, this.holes.length = 0, this.holes = null, this.points.length = 0, this.points = null, this.lineStyle = null, this.fillStyle = null;
    }, n;
  }()
), tmpPoint = new Point(), GraphicsGeometry = (
  /** @class */
  function(n) {
    __extends$e(e, n);
    function e() {
      var t = n.call(this) || this;
      return t.closePointEps = 1e-4, t.boundsPadding = 0, t.uvsFloat32 = null, t.indicesUint16 = null, t.batchable = !1, t.points = [], t.colors = [], t.uvs = [], t.indices = [], t.textureIds = [], t.graphicsData = [], t.drawCalls = [], t.batchDirty = -1, t.batches = [], t.dirty = 0, t.cacheDirty = -1, t.clearDirty = 0, t.shapeIndex = 0, t._bounds = new Bounds(), t.boundsDirty = -1, t;
    }
    return Object.defineProperty(e.prototype, "bounds", {
      /**
       * Get the current bounds of the graphic geometry.
       * @readonly
       */
      get: function() {
        return this.updateBatches(), this.boundsDirty !== this.dirty && (this.boundsDirty = this.dirty, this.calculateBounds()), this._bounds;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.invalidate = function() {
      this.boundsDirty = -1, this.dirty++, this.batchDirty++, this.shapeIndex = 0, this.points.length = 0, this.colors.length = 0, this.uvs.length = 0, this.indices.length = 0, this.textureIds.length = 0;
      for (var t = 0; t < this.drawCalls.length; t++)
        this.drawCalls[t].texArray.clear(), DRAW_CALL_POOL.push(this.drawCalls[t]);
      this.drawCalls.length = 0;
      for (var t = 0; t < this.batches.length; t++) {
        var r = this.batches[t];
        r.reset(), BATCH_POOL.push(r);
      }
      this.batches.length = 0;
    }, e.prototype.clear = function() {
      return this.graphicsData.length > 0 && (this.invalidate(), this.clearDirty++, this.graphicsData.length = 0), this;
    }, e.prototype.drawShape = function(t, r, a, o) {
      r === void 0 && (r = null), a === void 0 && (a = null), o === void 0 && (o = null);
      var s = new GraphicsData(t, r, a, o);
      return this.graphicsData.push(s), this.dirty++, this;
    }, e.prototype.drawHole = function(t, r) {
      if (r === void 0 && (r = null), !this.graphicsData.length)
        return null;
      var a = new GraphicsData(t, null, null, r), o = this.graphicsData[this.graphicsData.length - 1];
      return a.lineStyle = o.lineStyle, o.holes.push(a), this.dirty++, this;
    }, e.prototype.destroy = function() {
      n.prototype.destroy.call(this);
      for (var t = 0; t < this.graphicsData.length; ++t)
        this.graphicsData[t].destroy();
      this.points.length = 0, this.points = null, this.colors.length = 0, this.colors = null, this.uvs.length = 0, this.uvs = null, this.indices.length = 0, this.indices = null, this.indexBuffer.destroy(), this.indexBuffer = null, this.graphicsData.length = 0, this.graphicsData = null, this.drawCalls.length = 0, this.drawCalls = null, this.batches.length = 0, this.batches = null, this._bounds = null;
    }, e.prototype.containsPoint = function(t) {
      for (var r = this.graphicsData, a = 0; a < r.length; ++a) {
        var o = r[a];
        if (o.fillStyle.visible && o.shape && (o.matrix ? o.matrix.applyInverse(t, tmpPoint) : tmpPoint.copyFrom(t), o.shape.contains(tmpPoint.x, tmpPoint.y))) {
          var s = !1;
          if (o.holes)
            for (var u = 0; u < o.holes.length; u++) {
              var h = o.holes[u];
              if (h.shape.contains(tmpPoint.x, tmpPoint.y)) {
                s = !0;
                break;
              }
            }
          if (!s)
            return !0;
        }
      }
      return !1;
    }, e.prototype.updateBatches = function() {
      if (!this.graphicsData.length) {
        this.batchable = !0;
        return;
      }
      if (this.validateBatching()) {
        this.cacheDirty = this.dirty;
        var t = this.uvs, r = this.graphicsData, a = null, o = null;
        this.batches.length > 0 && (a = this.batches[this.batches.length - 1], o = a.style);
        for (var s = this.shapeIndex; s < r.length; s++) {
          this.shapeIndex++;
          var u = r[s], h = u.fillStyle, l = u.lineStyle, c = FILL_COMMANDS[u.type];
          c.build(u), u.matrix && this.transformPoints(u.points, u.matrix), (h.visible || l.visible) && this.processHoles(u.holes);
          for (var v = 0; v < 2; v++) {
            var d = v === 0 ? h : l;
            if (d.visible) {
              var g = d.texture.baseTexture, m = this.indices.length, _ = this.points.length / 2;
              g.wrapMode = WRAP_MODES.REPEAT, v === 0 ? this.processFill(u) : this.processLine(u);
              var y = this.points.length / 2 - _;
              y !== 0 && (a && !this._compareStyles(o, d) && (a.end(m, _), a = null), a || (a = BATCH_POOL.pop() || new BatchPart(), a.begin(d, m, _), this.batches.push(a), o = d), this.addUvs(this.points, t, d.texture, _, y, d.matrix));
            }
          }
        }
        var b = this.indices.length, S = this.points.length / 2;
        if (a && a.end(b, S), this.batches.length === 0) {
          this.batchable = !0;
          return;
        }
        var O = S > 65535;
        this.indicesUint16 && this.indices.length === this.indicesUint16.length && O === this.indicesUint16.BYTES_PER_ELEMENT > 2 ? this.indicesUint16.set(this.indices) : this.indicesUint16 = O ? new Uint32Array(this.indices) : new Uint16Array(this.indices), this.batchable = this.isBatchable(), this.batchable ? this.packBatches() : this.buildDrawCalls();
      }
    }, e.prototype._compareStyles = function(t, r) {
      return !(!t || !r || t.texture.baseTexture !== r.texture.baseTexture || t.color + t.alpha !== r.color + r.alpha || !!t.native != !!r.native);
    }, e.prototype.validateBatching = function() {
      if (this.dirty === this.cacheDirty || !this.graphicsData.length)
        return !1;
      for (var t = 0, r = this.graphicsData.length; t < r; t++) {
        var a = this.graphicsData[t], o = a.fillStyle, s = a.lineStyle;
        if (o && !o.texture.baseTexture.valid || s && !s.texture.baseTexture.valid)
          return !1;
      }
      return !0;
    }, e.prototype.packBatches = function() {
      this.batchDirty++, this.uvsFloat32 = new Float32Array(this.uvs);
      for (var t = this.batches, r = 0, a = t.length; r < a; r++)
        for (var o = t[r], s = 0; s < o.size; s++) {
          var u = o.start + s;
          this.indicesUint16[u] = this.indicesUint16[u] - o.attribStart;
        }
    }, e.prototype.isBatchable = function() {
      if (this.points.length > 65535 * 2)
        return !1;
      for (var t = this.batches, r = 0; r < t.length; r++)
        if (t[r].style.native)
          return !1;
      return this.points.length < e.BATCHABLE_SIZE * 2;
    }, e.prototype.buildDrawCalls = function() {
      for (var t = ++BaseTexture._globalBatch, r = 0; r < this.drawCalls.length; r++)
        this.drawCalls[r].texArray.clear(), DRAW_CALL_POOL.push(this.drawCalls[r]);
      this.drawCalls.length = 0;
      var a = this.colors, o = this.textureIds, s = DRAW_CALL_POOL.pop();
      s || (s = new BatchDrawCall(), s.texArray = new BatchTextureArray()), s.texArray.count = 0, s.start = 0, s.size = 0, s.type = DRAW_MODES.TRIANGLES;
      var u = 0, h = null, l = 0, c = !1, v = DRAW_MODES.TRIANGLES, d = 0;
      this.drawCalls.push(s);
      for (var r = 0; r < this.batches.length; r++) {
        var g = this.batches[r], m = 8, _ = g.style, y = _.texture.baseTexture;
        c !== !!_.native && (c = !!_.native, v = c ? DRAW_MODES.LINES : DRAW_MODES.TRIANGLES, h = null, u = m, t++), h !== y && (h = y, y._batchEnabled !== t && (u === m && (t++, u = 0, s.size > 0 && (s = DRAW_CALL_POOL.pop(), s || (s = new BatchDrawCall(), s.texArray = new BatchTextureArray()), this.drawCalls.push(s)), s.start = d, s.size = 0, s.texArray.count = 0, s.type = v), y.touched = 1, y._batchEnabled = t, y._batchLocation = u, y.wrapMode = WRAP_MODES.REPEAT, s.texArray.elements[s.texArray.count++] = y, u++)), s.size += g.size, d += g.size, l = y._batchLocation, this.addColors(a, _.color, _.alpha, g.attribSize, g.attribStart), this.addTextureIds(o, l, g.attribSize, g.attribStart);
      }
      BaseTexture._globalBatch = t, this.packAttributes();
    }, e.prototype.packAttributes = function() {
      for (var t = this.points, r = this.uvs, a = this.colors, o = this.textureIds, s = new ArrayBuffer(t.length * 3 * 4), u = new Float32Array(s), h = new Uint32Array(s), l = 0, c = 0; c < t.length / 2; c++)
        u[l++] = t[c * 2], u[l++] = t[c * 2 + 1], u[l++] = r[c * 2], u[l++] = r[c * 2 + 1], h[l++] = a[c], u[l++] = o[c];
      this._buffer.update(s), this._indexBuffer.update(this.indicesUint16);
    }, e.prototype.processFill = function(t) {
      if (t.holes.length)
        buildPoly.triangulate(t, this);
      else {
        var r = FILL_COMMANDS[t.type];
        r.triangulate(t, this);
      }
    }, e.prototype.processLine = function(t) {
      buildLine(t, this);
      for (var r = 0; r < t.holes.length; r++)
        buildLine(t.holes[r], this);
    }, e.prototype.processHoles = function(t) {
      for (var r = 0; r < t.length; r++) {
        var a = t[r], o = FILL_COMMANDS[a.type];
        o.build(a), a.matrix && this.transformPoints(a.points, a.matrix);
      }
    }, e.prototype.calculateBounds = function() {
      var t = this._bounds;
      t.clear(), t.addVertexData(this.points, 0, this.points.length), t.pad(this.boundsPadding, this.boundsPadding);
    }, e.prototype.transformPoints = function(t, r) {
      for (var a = 0; a < t.length / 2; a++) {
        var o = t[a * 2], s = t[a * 2 + 1];
        t[a * 2] = r.a * o + r.c * s + r.tx, t[a * 2 + 1] = r.b * o + r.d * s + r.ty;
      }
    }, e.prototype.addColors = function(t, r, a, o, s) {
      s === void 0 && (s = 0);
      var u = (r >> 16) + (r & 65280) + ((r & 255) << 16), h = premultiplyTint(u, a);
      t.length = Math.max(t.length, s + o);
      for (var l = 0; l < o; l++)
        t[s + l] = h;
    }, e.prototype.addTextureIds = function(t, r, a, o) {
      o === void 0 && (o = 0), t.length = Math.max(t.length, o + a);
      for (var s = 0; s < a; s++)
        t[o + s] = r;
    }, e.prototype.addUvs = function(t, r, a, o, s, u) {
      u === void 0 && (u = null);
      for (var h = 0, l = r.length, c = a.frame; h < s; ) {
        var v = t[(o + h) * 2], d = t[(o + h) * 2 + 1];
        if (u) {
          var g = u.a * v + u.c * d + u.tx;
          d = u.b * v + u.d * d + u.ty, v = g;
        }
        h++, r.push(v / c.width, d / c.height);
      }
      var m = a.baseTexture;
      (c.width < m.width || c.height < m.height) && this.adjustUvs(r, a, l, s);
    }, e.prototype.adjustUvs = function(t, r, a, o) {
      for (var s = r.baseTexture, u = 1e-6, h = a + o * 2, l = r.frame, c = l.width / s.width, v = l.height / s.height, d = l.x / l.width, g = l.y / l.height, m = Math.floor(t[a] + u), _ = Math.floor(t[a + 1] + u), y = a + 2; y < h; y += 2)
        m = Math.min(m, Math.floor(t[y] + u)), _ = Math.min(_, Math.floor(t[y + 1] + u));
      d -= m, g -= _;
      for (var y = a; y < h; y += 2)
        t[y] = (t[y] + d) * c, t[y + 1] = (t[y + 1] + g) * v;
    }, e.BATCHABLE_SIZE = 100, e;
  }(BatchGeometry)
), LineStyle = (
  /** @class */
  function(n) {
    __extends$e(e, n);
    function e() {
      var t = n !== null && n.apply(this, arguments) || this;
      return t.width = 0, t.alignment = 0.5, t.native = !1, t.cap = LINE_CAP.BUTT, t.join = LINE_JOIN.MITER, t.miterLimit = 10, t;
    }
    return e.prototype.clone = function() {
      var t = new e();
      return t.color = this.color, t.alpha = this.alpha, t.texture = this.texture, t.matrix = this.matrix, t.visible = this.visible, t.width = this.width, t.alignment = this.alignment, t.native = this.native, t.cap = this.cap, t.join = this.join, t.miterLimit = this.miterLimit, t;
    }, e.prototype.reset = function() {
      n.prototype.reset.call(this), this.color = 0, this.alignment = 0.5, this.width = 0, this.native = !1;
    }, e;
  }(FillStyle)
), temp = new Float32Array(3), DEFAULT_SHADERS = {}, Graphics = (
  /** @class */
  function(n) {
    __extends$e(e, n);
    function e(t) {
      t === void 0 && (t = null);
      var r = n.call(this) || this;
      return r.shader = null, r.pluginName = "batch", r.currentPath = null, r.batches = [], r.batchTint = -1, r.batchDirty = -1, r.vertexData = null, r._fillStyle = new FillStyle(), r._lineStyle = new LineStyle(), r._matrix = null, r._holeMode = !1, r.state = State.for2d(), r._geometry = t || new GraphicsGeometry(), r._geometry.refCount++, r._transformID = -1, r.tint = 16777215, r.blendMode = BLEND_MODES.NORMAL, r;
    }
    return Object.defineProperty(e.prototype, "geometry", {
      /**
       * Includes vertex positions, face indices, normals, colors, UVs, and
       * custom attributes within buffers, reducing the cost of passing all
       * this data to the GPU. Can be shared between multiple Mesh or Graphics objects.
       * @readonly
       */
      get: function() {
        return this._geometry;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.clone = function() {
      return this.finishPoly(), new e(this._geometry);
    }, Object.defineProperty(e.prototype, "blendMode", {
      get: function() {
        return this.state.blendMode;
      },
      /**
       * The blend mode to be applied to the graphic shape. Apply a value of
       * `PIXI.BLEND_MODES.NORMAL` to reset the blend mode.  Note that, since each
       * primitive in the GraphicsGeometry list is rendered sequentially, modes
       * such as `PIXI.BLEND_MODES.ADD` and `PIXI.BLEND_MODES.MULTIPLY` will
       * be applied per-primitive.
       * @default PIXI.BLEND_MODES.NORMAL
       */
      set: function(t) {
        this.state.blendMode = t;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "tint", {
      /**
       * The tint applied to each graphic shape. This is a hex value. A value of
       * 0xFFFFFF will remove any tint effect.
       * @default 0xFFFFFF
       */
      get: function() {
        return this._tint;
      },
      set: function(t) {
        this._tint = t;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "fill", {
      /**
       * The current fill style.
       * @readonly
       */
      get: function() {
        return this._fillStyle;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "line", {
      /**
       * The current line style.
       * @readonly
       */
      get: function() {
        return this._lineStyle;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.lineStyle = function(t, r, a, o, s) {
      return t === void 0 && (t = null), r === void 0 && (r = 0), a === void 0 && (a = 1), o === void 0 && (o = 0.5), s === void 0 && (s = !1), typeof t == "number" && (t = { width: t, color: r, alpha: a, alignment: o, native: s }), this.lineTextureStyle(t);
    }, e.prototype.lineTextureStyle = function(t) {
      t = Object.assign({
        width: 0,
        texture: Texture.WHITE,
        color: t && t.texture ? 16777215 : 0,
        alpha: 1,
        matrix: null,
        alignment: 0.5,
        native: !1,
        cap: LINE_CAP.BUTT,
        join: LINE_JOIN.MITER,
        miterLimit: 10
      }, t), this.currentPath && this.startPoly();
      var r = t.width > 0 && t.alpha > 0;
      return r ? (t.matrix && (t.matrix = t.matrix.clone(), t.matrix.invert()), Object.assign(this._lineStyle, { visible: r }, t)) : this._lineStyle.reset(), this;
    }, e.prototype.startPoly = function() {
      if (this.currentPath) {
        var t = this.currentPath.points, r = this.currentPath.points.length;
        r > 2 && (this.drawShape(this.currentPath), this.currentPath = new Polygon(), this.currentPath.closeStroke = !1, this.currentPath.points.push(t[r - 2], t[r - 1]));
      } else
        this.currentPath = new Polygon(), this.currentPath.closeStroke = !1;
    }, e.prototype.finishPoly = function() {
      this.currentPath && (this.currentPath.points.length > 2 ? (this.drawShape(this.currentPath), this.currentPath = null) : this.currentPath.points.length = 0);
    }, e.prototype.moveTo = function(t, r) {
      return this.startPoly(), this.currentPath.points[0] = t, this.currentPath.points[1] = r, this;
    }, e.prototype.lineTo = function(t, r) {
      this.currentPath || this.moveTo(0, 0);
      var a = this.currentPath.points, o = a[a.length - 2], s = a[a.length - 1];
      return (o !== t || s !== r) && a.push(t, r), this;
    }, e.prototype._initCurve = function(t, r) {
      t === void 0 && (t = 0), r === void 0 && (r = 0), this.currentPath ? this.currentPath.points.length === 0 && (this.currentPath.points = [t, r]) : this.moveTo(t, r);
    }, e.prototype.quadraticCurveTo = function(t, r, a, o) {
      this._initCurve();
      var s = this.currentPath.points;
      return s.length === 0 && this.moveTo(0, 0), QuadraticUtils.curveTo(t, r, a, o, s), this;
    }, e.prototype.bezierCurveTo = function(t, r, a, o, s, u) {
      return this._initCurve(), BezierUtils.curveTo(t, r, a, o, s, u, this.currentPath.points), this;
    }, e.prototype.arcTo = function(t, r, a, o, s) {
      this._initCurve(t, r);
      var u = this.currentPath.points, h = ArcUtils.curveTo(t, r, a, o, s, u);
      if (h) {
        var l = h.cx, c = h.cy, v = h.radius, d = h.startAngle, g = h.endAngle, m = h.anticlockwise;
        this.arc(l, c, v, d, g, m);
      }
      return this;
    }, e.prototype.arc = function(t, r, a, o, s, u) {
      if (u === void 0 && (u = !1), o === s)
        return this;
      !u && s <= o ? s += PI_2 : u && o <= s && (o += PI_2);
      var h = s - o;
      if (h === 0)
        return this;
      var l = t + Math.cos(o) * a, c = r + Math.sin(o) * a, v = this._geometry.closePointEps, d = this.currentPath ? this.currentPath.points : null;
      if (d) {
        var g = Math.abs(d[d.length - 2] - l), m = Math.abs(d[d.length - 1] - c);
        g < v && m < v || d.push(l, c);
      } else
        this.moveTo(l, c), d = this.currentPath.points;
      return ArcUtils.arc(l, c, t, r, a, o, s, u, d), this;
    }, e.prototype.beginFill = function(t, r) {
      return t === void 0 && (t = 0), r === void 0 && (r = 1), this.beginTextureFill({ texture: Texture.WHITE, color: t, alpha: r });
    }, e.prototype.beginTextureFill = function(t) {
      t = Object.assign({
        texture: Texture.WHITE,
        color: 16777215,
        alpha: 1,
        matrix: null
      }, t), this.currentPath && this.startPoly();
      var r = t.alpha > 0;
      return r ? (t.matrix && (t.matrix = t.matrix.clone(), t.matrix.invert()), Object.assign(this._fillStyle, { visible: r }, t)) : this._fillStyle.reset(), this;
    }, e.prototype.endFill = function() {
      return this.finishPoly(), this._fillStyle.reset(), this;
    }, e.prototype.drawRect = function(t, r, a, o) {
      return this.drawShape(new Rectangle(t, r, a, o));
    }, e.prototype.drawRoundedRect = function(t, r, a, o, s) {
      return this.drawShape(new RoundedRectangle(t, r, a, o, s));
    }, e.prototype.drawCircle = function(t, r, a) {
      return this.drawShape(new Circle(t, r, a));
    }, e.prototype.drawEllipse = function(t, r, a, o) {
      return this.drawShape(new Ellipse(t, r, a, o));
    }, e.prototype.drawPolygon = function() {
      for (var t = arguments, r = [], a = 0; a < arguments.length; a++)
        r[a] = t[a];
      var o, s = !0, u = r[0];
      u.points ? (s = u.closeStroke, o = u.points) : Array.isArray(r[0]) ? o = r[0] : o = r;
      var h = new Polygon(o);
      return h.closeStroke = s, this.drawShape(h), this;
    }, e.prototype.drawShape = function(t) {
      return this._holeMode ? this._geometry.drawHole(t, this._matrix) : this._geometry.drawShape(t, this._fillStyle.clone(), this._lineStyle.clone(), this._matrix), this;
    }, e.prototype.clear = function() {
      return this._geometry.clear(), this._lineStyle.reset(), this._fillStyle.reset(), this._boundsID++, this._matrix = null, this._holeMode = !1, this.currentPath = null, this;
    }, e.prototype.isFastRect = function() {
      var t = this._geometry.graphicsData;
      return t.length === 1 && t[0].shape.type === SHAPES.RECT && !t[0].matrix && !t[0].holes.length && !(t[0].lineStyle.visible && t[0].lineStyle.width);
    }, e.prototype._render = function(t) {
      this.finishPoly();
      var r = this._geometry;
      r.updateBatches(), r.batchable ? (this.batchDirty !== r.batchDirty && this._populateBatches(), this._renderBatched(t)) : (t.batch.flush(), this._renderDirect(t));
    }, e.prototype._populateBatches = function() {
      var t = this._geometry, r = this.blendMode, a = t.batches.length;
      this.batchTint = -1, this._transformID = -1, this.batchDirty = t.batchDirty, this.batches.length = a, this.vertexData = new Float32Array(t.points);
      for (var o = 0; o < a; o++) {
        var s = t.batches[o], u = s.style.color, h = new Float32Array(this.vertexData.buffer, s.attribStart * 4 * 2, s.attribSize * 2), l = new Float32Array(t.uvsFloat32.buffer, s.attribStart * 4 * 2, s.attribSize * 2), c = new Uint16Array(t.indicesUint16.buffer, s.start * 2, s.size), v = {
          vertexData: h,
          blendMode: r,
          indices: c,
          uvs: l,
          _batchRGB: hex2rgb(u),
          _tintRGB: u,
          _texture: s.style.texture,
          alpha: s.style.alpha,
          worldAlpha: 1
        };
        this.batches[o] = v;
      }
    }, e.prototype._renderBatched = function(t) {
      if (this.batches.length) {
        t.batch.setObjectRenderer(t.plugins[this.pluginName]), this.calculateVertices(), this.calculateTints();
        for (var r = 0, a = this.batches.length; r < a; r++) {
          var o = this.batches[r];
          o.worldAlpha = this.worldAlpha * o.alpha, t.plugins[this.pluginName].render(o);
        }
      }
    }, e.prototype._renderDirect = function(t) {
      var r = this._resolveDirectShader(t), a = this._geometry, o = this.tint, s = this.worldAlpha, u = r.uniforms, h = a.drawCalls;
      u.translationMatrix = this.transform.worldTransform, u.tint[0] = (o >> 16 & 255) / 255 * s, u.tint[1] = (o >> 8 & 255) / 255 * s, u.tint[2] = (o & 255) / 255 * s, u.tint[3] = s, t.shader.bind(r), t.geometry.bind(a, r), t.state.set(this.state);
      for (var l = 0, c = h.length; l < c; l++)
        this._renderDrawCallDirect(t, a.drawCalls[l]);
    }, e.prototype._renderDrawCallDirect = function(t, r) {
      for (var a = r.texArray, o = r.type, s = r.size, u = r.start, h = a.count, l = 0; l < h; l++)
        t.texture.bind(a.elements[l], l);
      t.geometry.draw(o, s, u);
    }, e.prototype._resolveDirectShader = function(t) {
      var r = this.shader, a = this.pluginName;
      if (!r) {
        if (!DEFAULT_SHADERS[a]) {
          for (var o = t.plugins[a].MAX_TEXTURES, s = new Int32Array(o), u = 0; u < o; u++)
            s[u] = u;
          var h = {
            tint: new Float32Array([1, 1, 1, 1]),
            translationMatrix: new Matrix(),
            default: UniformGroup.from({ uSamplers: s }, !0)
          }, l = t.plugins[a]._shader.program;
          DEFAULT_SHADERS[a] = new Shader(l, h);
        }
        r = DEFAULT_SHADERS[a];
      }
      return r;
    }, e.prototype._calculateBounds = function() {
      this.finishPoly();
      var t = this._geometry;
      if (t.graphicsData.length) {
        var r = t.bounds, a = r.minX, o = r.minY, s = r.maxX, u = r.maxY;
        this._bounds.addFrame(this.transform, a, o, s, u);
      }
    }, e.prototype.containsPoint = function(t) {
      return this.worldTransform.applyInverse(t, e._TEMP_POINT), this._geometry.containsPoint(e._TEMP_POINT);
    }, e.prototype.calculateTints = function() {
      if (this.batchTint !== this.tint) {
        this.batchTint = this.tint;
        for (var t = hex2rgb(this.tint, temp), r = 0; r < this.batches.length; r++) {
          var a = this.batches[r], o = a._batchRGB, s = t[0] * o[0] * 255, u = t[1] * o[1] * 255, h = t[2] * o[2] * 255, l = (s << 16) + (u << 8) + (h | 0);
          a._tintRGB = (l >> 16) + (l & 65280) + ((l & 255) << 16);
        }
      }
    }, e.prototype.calculateVertices = function() {
      var t = this.transform._worldID;
      if (this._transformID !== t) {
        this._transformID = t;
        for (var r = this.transform.worldTransform, a = r.a, o = r.b, s = r.c, u = r.d, h = r.tx, l = r.ty, c = this._geometry.points, v = this.vertexData, d = 0, g = 0; g < c.length; g += 2) {
          var m = c[g], _ = c[g + 1];
          v[d++] = a * m + s * _ + h, v[d++] = u * _ + o * m + l;
        }
      }
    }, e.prototype.closePath = function() {
      var t = this.currentPath;
      return t && (t.closeStroke = !0, this.finishPoly()), this;
    }, e.prototype.setMatrix = function(t) {
      return this._matrix = t, this;
    }, e.prototype.beginHole = function() {
      return this.finishPoly(), this._holeMode = !0, this;
    }, e.prototype.endHole = function() {
      return this.finishPoly(), this._holeMode = !1, this;
    }, e.prototype.destroy = function(t) {
      this._geometry.refCount--, this._geometry.refCount === 0 && this._geometry.dispose(), this._matrix = null, this.currentPath = null, this._lineStyle.destroy(), this._lineStyle = null, this._fillStyle.destroy(), this._fillStyle = null, this._geometry = null, this.shader = null, this.vertexData = null, this.batches.length = 0, this.batches = null, n.prototype.destroy.call(this, t);
    }, e.nextRoundedRectBehavior = !1, e._TEMP_POINT = new Point(), e;
  }(Container)
);
var extendStatics$d = function(n, e) {
  return extendStatics$d = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, r) {
    t.__proto__ = r;
  } || function(t, r) {
    for (var a in r)
      r.hasOwnProperty(a) && (t[a] = r[a]);
  }, extendStatics$d(n, e);
};
function __extends$d(n, e) {
  extendStatics$d(n, e);
  function t() {
    this.constructor = n;
  }
  n.prototype = e === null ? Object.create(e) : (t.prototype = e.prototype, new t());
}
var tempPoint$2 = new Point(), indices = new Uint16Array([0, 1, 2, 0, 2, 3]), Sprite = (
  /** @class */
  function(n) {
    __extends$d(e, n);
    function e(t) {
      var r = n.call(this) || this;
      return r._anchor = new ObservablePoint(r._onAnchorUpdate, r, t ? t.defaultAnchor.x : 0, t ? t.defaultAnchor.y : 0), r._texture = null, r._width = 0, r._height = 0, r._tint = null, r._tintRGB = null, r.tint = 16777215, r.blendMode = BLEND_MODES.NORMAL, r._cachedTint = 16777215, r.uvs = null, r.texture = t || Texture.EMPTY, r.vertexData = new Float32Array(8), r.vertexTrimmedData = null, r._transformID = -1, r._textureID = -1, r._transformTrimmedID = -1, r._textureTrimmedID = -1, r.indices = indices, r.pluginName = "batch", r.isSprite = !0, r._roundPixels = settings.ROUND_PIXELS, r;
    }
    return e.prototype._onTextureUpdate = function() {
      this._textureID = -1, this._textureTrimmedID = -1, this._cachedTint = 16777215, this._width && (this.scale.x = sign(this.scale.x) * this._width / this._texture.orig.width), this._height && (this.scale.y = sign(this.scale.y) * this._height / this._texture.orig.height);
    }, e.prototype._onAnchorUpdate = function() {
      this._transformID = -1, this._transformTrimmedID = -1;
    }, e.prototype.calculateVertices = function() {
      var t = this._texture;
      if (!(this._transformID === this.transform._worldID && this._textureID === t._updateID)) {
        this._textureID !== t._updateID && (this.uvs = this._texture._uvs.uvsFloat32), this._transformID = this.transform._worldID, this._textureID = t._updateID;
        var r = this.transform.worldTransform, a = r.a, o = r.b, s = r.c, u = r.d, h = r.tx, l = r.ty, c = this.vertexData, v = t.trim, d = t.orig, g = this._anchor, m = 0, _ = 0, y = 0, b = 0;
        if (v ? (_ = v.x - g._x * d.width, m = _ + v.width, b = v.y - g._y * d.height, y = b + v.height) : (_ = -g._x * d.width, m = _ + d.width, b = -g._y * d.height, y = b + d.height), c[0] = a * _ + s * b + h, c[1] = u * b + o * _ + l, c[2] = a * m + s * b + h, c[3] = u * b + o * m + l, c[4] = a * m + s * y + h, c[5] = u * y + o * m + l, c[6] = a * _ + s * y + h, c[7] = u * y + o * _ + l, this._roundPixels)
          for (var S = settings.RESOLUTION, O = 0; O < c.length; ++O)
            c[O] = Math.round((c[O] * S | 0) / S);
      }
    }, e.prototype.calculateTrimmedVertices = function() {
      if (!this.vertexTrimmedData)
        this.vertexTrimmedData = new Float32Array(8);
      else if (this._transformTrimmedID === this.transform._worldID && this._textureTrimmedID === this._texture._updateID)
        return;
      this._transformTrimmedID = this.transform._worldID, this._textureTrimmedID = this._texture._updateID;
      var t = this._texture, r = this.vertexTrimmedData, a = t.orig, o = this._anchor, s = this.transform.worldTransform, u = s.a, h = s.b, l = s.c, c = s.d, v = s.tx, d = s.ty, g = -o._x * a.width, m = g + a.width, _ = -o._y * a.height, y = _ + a.height;
      r[0] = u * g + l * _ + v, r[1] = c * _ + h * g + d, r[2] = u * m + l * _ + v, r[3] = c * _ + h * m + d, r[4] = u * m + l * y + v, r[5] = c * y + h * m + d, r[6] = u * g + l * y + v, r[7] = c * y + h * g + d;
    }, e.prototype._render = function(t) {
      this.calculateVertices(), t.batch.setObjectRenderer(t.plugins[this.pluginName]), t.plugins[this.pluginName].render(this);
    }, e.prototype._calculateBounds = function() {
      var t = this._texture.trim, r = this._texture.orig;
      !t || t.width === r.width && t.height === r.height ? (this.calculateVertices(), this._bounds.addQuad(this.vertexData)) : (this.calculateTrimmedVertices(), this._bounds.addQuad(this.vertexTrimmedData));
    }, e.prototype.getLocalBounds = function(t) {
      return this.children.length === 0 ? (this._localBounds || (this._localBounds = new Bounds()), this._localBounds.minX = this._texture.orig.width * -this._anchor._x, this._localBounds.minY = this._texture.orig.height * -this._anchor._y, this._localBounds.maxX = this._texture.orig.width * (1 - this._anchor._x), this._localBounds.maxY = this._texture.orig.height * (1 - this._anchor._y), t || (this._localBoundsRect || (this._localBoundsRect = new Rectangle()), t = this._localBoundsRect), this._localBounds.getRectangle(t)) : n.prototype.getLocalBounds.call(this, t);
    }, e.prototype.containsPoint = function(t) {
      this.worldTransform.applyInverse(t, tempPoint$2);
      var r = this._texture.orig.width, a = this._texture.orig.height, o = -r * this.anchor.x, s = 0;
      return tempPoint$2.x >= o && tempPoint$2.x < o + r && (s = -a * this.anchor.y, tempPoint$2.y >= s && tempPoint$2.y < s + a);
    }, e.prototype.destroy = function(t) {
      n.prototype.destroy.call(this, t), this._texture.off("update", this._onTextureUpdate, this), this._anchor = null;
      var r = typeof t == "boolean" ? t : t && t.texture;
      if (r) {
        var a = typeof t == "boolean" ? t : t && t.baseTexture;
        this._texture.destroy(!!a);
      }
      this._texture = null;
    }, e.from = function(t, r) {
      var a = t instanceof Texture ? t : Texture.from(t, r);
      return new e(a);
    }, Object.defineProperty(e.prototype, "roundPixels", {
      get: function() {
        return this._roundPixels;
      },
      /**
       * If true PixiJS will Math.floor() x/y values when rendering, stopping pixel interpolation.
       *
       * Advantages can include sharper image quality (like text) and faster rendering on canvas.
       * The main disadvantage is movement of objects may appear less smooth.
       *
       * To set the global default, change {@link PIXI.settings.ROUND_PIXELS}.
       * @default false
       */
      set: function(t) {
        this._roundPixels !== t && (this._transformID = -1), this._roundPixels = t;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "width", {
      /** The width of the sprite, setting this will actually modify the scale to achieve the value set. */
      get: function() {
        return Math.abs(this.scale.x) * this._texture.orig.width;
      },
      set: function(t) {
        var r = sign(this.scale.x) || 1;
        this.scale.x = r * t / this._texture.orig.width, this._width = t;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "height", {
      /** The height of the sprite, setting this will actually modify the scale to achieve the value set. */
      get: function() {
        return Math.abs(this.scale.y) * this._texture.orig.height;
      },
      set: function(t) {
        var r = sign(this.scale.y) || 1;
        this.scale.y = r * t / this._texture.orig.height, this._height = t;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "anchor", {
      /**
       * The anchor sets the origin point of the sprite. The default value is taken from the {@link PIXI.Texture|Texture}
       * and passed to the constructor.
       *
       * The default is `(0,0)`, this means the sprite's origin is the top left.
       *
       * Setting the anchor to `(0.5,0.5)` means the sprite's origin is centered.
       *
       * Setting the anchor to `(1,1)` would mean the sprite's origin point will be the bottom right corner.
       *
       * If you pass only single parameter, it will set both x and y to the same value as shown in the example below.
       * @example
       * const sprite = new PIXI.Sprite(texture);
       * sprite.anchor.set(0.5); // This will set the origin to center. (0.5) is same as (0.5, 0.5).
       */
      get: function() {
        return this._anchor;
      },
      set: function(t) {
        this._anchor.copyFrom(t);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "tint", {
      /**
       * The tint applied to the sprite. This is a hex value.
       *
       * A value of 0xFFFFFF will remove any tint effect.
       * @default 0xFFFFFF
       */
      get: function() {
        return this._tint;
      },
      set: function(t) {
        this._tint = t, this._tintRGB = (t >> 16) + (t & 65280) + ((t & 255) << 16);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "texture", {
      /** The texture that the sprite is using. */
      get: function() {
        return this._texture;
      },
      set: function(t) {
        this._texture !== t && (this._texture && this._texture.off("update", this._onTextureUpdate, this), this._texture = t || Texture.EMPTY, this._cachedTint = 16777215, this._textureID = -1, this._textureTrimmedID = -1, t && (t.baseTexture.valid ? this._onTextureUpdate() : t.once("update", this._onTextureUpdate, this)));
      },
      enumerable: !1,
      configurable: !0
    }), e;
  }(Container)
);
var extendStatics$c = function(n, e) {
  return extendStatics$c = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, r) {
    t.__proto__ = r;
  } || function(t, r) {
    for (var a in r)
      r.hasOwnProperty(a) && (t[a] = r[a]);
  }, extendStatics$c(n, e);
};
function __extends$c(n, e) {
  extendStatics$c(n, e);
  function t() {
    this.constructor = n;
  }
  n.prototype = e === null ? Object.create(e) : (t.prototype = e.prototype, new t());
}
var TEXT_GRADIENT;
(function(n) {
  n[n.LINEAR_VERTICAL = 0] = "LINEAR_VERTICAL", n[n.LINEAR_HORIZONTAL = 1] = "LINEAR_HORIZONTAL";
})(TEXT_GRADIENT || (TEXT_GRADIENT = {}));
var defaultStyle = {
  align: "left",
  breakWords: !1,
  dropShadow: !1,
  dropShadowAlpha: 1,
  dropShadowAngle: Math.PI / 6,
  dropShadowBlur: 0,
  dropShadowColor: "black",
  dropShadowDistance: 5,
  fill: "black",
  fillGradientType: TEXT_GRADIENT.LINEAR_VERTICAL,
  fillGradientStops: [],
  fontFamily: "Arial",
  fontSize: 26,
  fontStyle: "normal",
  fontVariant: "normal",
  fontWeight: "normal",
  letterSpacing: 0,
  lineHeight: 0,
  lineJoin: "miter",
  miterLimit: 10,
  padding: 0,
  stroke: "black",
  strokeThickness: 0,
  textBaseline: "alphabetic",
  trim: !1,
  whiteSpace: "pre",
  wordWrap: !1,
  wordWrapWidth: 100,
  leading: 0
}, genericFontFamilies = [
  "serif",
  "sans-serif",
  "monospace",
  "cursive",
  "fantasy",
  "system-ui"
], TextStyle = (
  /** @class */
  function() {
    function n(e) {
      this.styleID = 0, this.reset(), deepCopyProperties(this, e, e);
    }
    return n.prototype.clone = function() {
      var e = {};
      return deepCopyProperties(e, this, defaultStyle), new n(e);
    }, n.prototype.reset = function() {
      deepCopyProperties(this, defaultStyle, defaultStyle);
    }, Object.defineProperty(n.prototype, "align", {
      /**
       * Alignment for multiline text ('left', 'center' or 'right'), does not affect single line text
       *
       * @member {string}
       */
      get: function() {
        return this._align;
      },
      set: function(e) {
        this._align !== e && (this._align = e, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n.prototype, "breakWords", {
      /** Indicates if lines can be wrapped within words, it needs wordWrap to be set to true. */
      get: function() {
        return this._breakWords;
      },
      set: function(e) {
        this._breakWords !== e && (this._breakWords = e, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n.prototype, "dropShadow", {
      /** Set a drop shadow for the text. */
      get: function() {
        return this._dropShadow;
      },
      set: function(e) {
        this._dropShadow !== e && (this._dropShadow = e, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n.prototype, "dropShadowAlpha", {
      /** Set alpha for the drop shadow. */
      get: function() {
        return this._dropShadowAlpha;
      },
      set: function(e) {
        this._dropShadowAlpha !== e && (this._dropShadowAlpha = e, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n.prototype, "dropShadowAngle", {
      /** Set a angle of the drop shadow. */
      get: function() {
        return this._dropShadowAngle;
      },
      set: function(e) {
        this._dropShadowAngle !== e && (this._dropShadowAngle = e, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n.prototype, "dropShadowBlur", {
      /** Set a shadow blur radius. */
      get: function() {
        return this._dropShadowBlur;
      },
      set: function(e) {
        this._dropShadowBlur !== e && (this._dropShadowBlur = e, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n.prototype, "dropShadowColor", {
      /** A fill style to be used on the dropshadow e.g 'red', '#00FF00'. */
      get: function() {
        return this._dropShadowColor;
      },
      set: function(e) {
        var t = getColor(e);
        this._dropShadowColor !== t && (this._dropShadowColor = t, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n.prototype, "dropShadowDistance", {
      /** Set a distance of the drop shadow. */
      get: function() {
        return this._dropShadowDistance;
      },
      set: function(e) {
        this._dropShadowDistance !== e && (this._dropShadowDistance = e, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n.prototype, "fill", {
      /**
       * A canvas fillstyle that will be used on the text e.g 'red', '#00FF00'.
       *
       * Can be an array to create a gradient eg ['#000000','#FFFFFF']
       * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle|MDN}
       *
       * @member {string|string[]|number|number[]|CanvasGradient|CanvasPattern}
       */
      get: function() {
        return this._fill;
      },
      set: function(e) {
        var t = getColor(e);
        this._fill !== t && (this._fill = t, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n.prototype, "fillGradientType", {
      /**
       * If fill is an array of colours to create a gradient, this can change the type/direction of the gradient.
       *
       * @see PIXI.TEXT_GRADIENT
       */
      get: function() {
        return this._fillGradientType;
      },
      set: function(e) {
        this._fillGradientType !== e && (this._fillGradientType = e, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n.prototype, "fillGradientStops", {
      /**
       * If fill is an array of colours to create a gradient, this array can set the stop points
       * (numbers between 0 and 1) for the color, overriding the default behaviour of evenly spacing them.
       */
      get: function() {
        return this._fillGradientStops;
      },
      set: function(e) {
        areArraysEqual(this._fillGradientStops, e) || (this._fillGradientStops = e, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n.prototype, "fontFamily", {
      /** The font family. */
      get: function() {
        return this._fontFamily;
      },
      set: function(e) {
        this.fontFamily !== e && (this._fontFamily = e, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n.prototype, "fontSize", {
      /**
       * The font size
       * (as a number it converts to px, but as a string, equivalents are '26px','20pt','160%' or '1.6em')
       */
      get: function() {
        return this._fontSize;
      },
      set: function(e) {
        this._fontSize !== e && (this._fontSize = e, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n.prototype, "fontStyle", {
      /**
       * The font style
       * ('normal', 'italic' or 'oblique')
       *
       * @member {string}
       */
      get: function() {
        return this._fontStyle;
      },
      set: function(e) {
        this._fontStyle !== e && (this._fontStyle = e, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n.prototype, "fontVariant", {
      /**
       * The font variant
       * ('normal' or 'small-caps')
       *
       * @member {string}
       */
      get: function() {
        return this._fontVariant;
      },
      set: function(e) {
        this._fontVariant !== e && (this._fontVariant = e, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n.prototype, "fontWeight", {
      /**
       * The font weight
       * ('normal', 'bold', 'bolder', 'lighter' and '100', '200', '300', '400', '500', '600', '700', 800' or '900')
       *
       * @member {string}
       */
      get: function() {
        return this._fontWeight;
      },
      set: function(e) {
        this._fontWeight !== e && (this._fontWeight = e, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n.prototype, "letterSpacing", {
      /** The amount of spacing between letters, default is 0. */
      get: function() {
        return this._letterSpacing;
      },
      set: function(e) {
        this._letterSpacing !== e && (this._letterSpacing = e, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n.prototype, "lineHeight", {
      /** The line height, a number that represents the vertical space that a letter uses. */
      get: function() {
        return this._lineHeight;
      },
      set: function(e) {
        this._lineHeight !== e && (this._lineHeight = e, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n.prototype, "leading", {
      /** The space between lines. */
      get: function() {
        return this._leading;
      },
      set: function(e) {
        this._leading !== e && (this._leading = e, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n.prototype, "lineJoin", {
      /**
       * The lineJoin property sets the type of corner created, it can resolve spiked text issues.
       * Default is 'miter' (creates a sharp corner).
       *
       * @member {string}
       */
      get: function() {
        return this._lineJoin;
      },
      set: function(e) {
        this._lineJoin !== e && (this._lineJoin = e, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n.prototype, "miterLimit", {
      /**
       * The miter limit to use when using the 'miter' lineJoin mode.
       *
       * This can reduce or increase the spikiness of rendered text.
       */
      get: function() {
        return this._miterLimit;
      },
      set: function(e) {
        this._miterLimit !== e && (this._miterLimit = e, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n.prototype, "padding", {
      /**
       * Occasionally some fonts are cropped. Adding some padding will prevent this from happening
       * by adding padding to all sides of the text.
       */
      get: function() {
        return this._padding;
      },
      set: function(e) {
        this._padding !== e && (this._padding = e, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n.prototype, "stroke", {
      /**
       * A canvas fillstyle that will be used on the text stroke
       * e.g 'blue', '#FCFF00'
       */
      get: function() {
        return this._stroke;
      },
      set: function(e) {
        var t = getColor(e);
        this._stroke !== t && (this._stroke = t, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n.prototype, "strokeThickness", {
      /**
       * A number that represents the thickness of the stroke.
       *
       * @default 0
       */
      get: function() {
        return this._strokeThickness;
      },
      set: function(e) {
        this._strokeThickness !== e && (this._strokeThickness = e, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n.prototype, "textBaseline", {
      /**
       * The baseline of the text that is rendered.
       *
       * @member {string}
       */
      get: function() {
        return this._textBaseline;
      },
      set: function(e) {
        this._textBaseline !== e && (this._textBaseline = e, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n.prototype, "trim", {
      /** Trim transparent borders. */
      get: function() {
        return this._trim;
      },
      set: function(e) {
        this._trim !== e && (this._trim = e, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n.prototype, "whiteSpace", {
      /**
       * How newlines and spaces should be handled.
       * Default is 'pre' (preserve, preserve).
       *
       *  value       | New lines     |   Spaces
       *  ---         | ---           |   ---
       * 'normal'     | Collapse      |   Collapse
       * 'pre'        | Preserve      |   Preserve
       * 'pre-line'   | Preserve      |   Collapse
       *
       * @member {string}
       */
      get: function() {
        return this._whiteSpace;
      },
      set: function(e) {
        this._whiteSpace !== e && (this._whiteSpace = e, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n.prototype, "wordWrap", {
      /** Indicates if word wrap should be used. */
      get: function() {
        return this._wordWrap;
      },
      set: function(e) {
        this._wordWrap !== e && (this._wordWrap = e, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n.prototype, "wordWrapWidth", {
      /** The width at which text will wrap, it needs wordWrap to be set to true. */
      get: function() {
        return this._wordWrapWidth;
      },
      set: function(e) {
        this._wordWrapWidth !== e && (this._wordWrapWidth = e, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), n.prototype.toFontString = function() {
      var e = typeof this.fontSize == "number" ? this.fontSize + "px" : this.fontSize, t = this.fontFamily;
      Array.isArray(this.fontFamily) || (t = this.fontFamily.split(","));
      for (var r = t.length - 1; r >= 0; r--) {
        var a = t[r].trim();
        !/([\"\'])[^\'\"]+\1/.test(a) && genericFontFamilies.indexOf(a) < 0 && (a = '"' + a + '"'), t[r] = a;
      }
      return this.fontStyle + " " + this.fontVariant + " " + this.fontWeight + " " + e + " " + t.join(",");
    }, n;
  }()
);
function getSingleColor(n) {
  return typeof n == "number" ? hex2string(n) : (typeof n == "string" && n.indexOf("0x") === 0 && (n = n.replace("0x", "#")), n);
}
function getColor(n) {
  if (Array.isArray(n)) {
    for (var e = 0; e < n.length; ++e)
      n[e] = getSingleColor(n[e]);
    return n;
  } else
    return getSingleColor(n);
}
function areArraysEqual(n, e) {
  if (!Array.isArray(n) || !Array.isArray(e) || n.length !== e.length)
    return !1;
  for (var t = 0; t < n.length; ++t)
    if (n[t] !== e[t])
      return !1;
  return !0;
}
function deepCopyProperties(n, e, t) {
  for (var r in t)
    Array.isArray(e[r]) ? n[r] = e[r].slice() : n[r] = e[r];
}
var contextSettings = {
  // TextMetrics requires getImageData readback for measuring fonts.
  willReadFrequently: !0
}, TextMetrics = (
  /** @class */
  function() {
    function n(e, t, r, a, o, s, u, h, l) {
      this.text = e, this.style = t, this.width = r, this.height = a, this.lines = o, this.lineWidths = s, this.lineHeight = u, this.maxLineWidth = h, this.fontProperties = l;
    }
    return n.measureText = function(e, t, r, a) {
      a === void 0 && (a = n._canvas), r = r ?? t.wordWrap;
      var o = t.toFontString(), s = n.measureFont(o);
      s.fontSize === 0 && (s.fontSize = t.fontSize, s.ascent = t.fontSize);
      var u = a.getContext("2d", contextSettings);
      u.font = o;
      for (var h = r ? n.wordWrap(e, t, a) : e, l = h.split(/(?:\r\n|\r|\n)/), c = new Array(l.length), v = 0, d = 0; d < l.length; d++) {
        var g = u.measureText(l[d]).width + (l[d].length - 1) * t.letterSpacing;
        c[d] = g, v = Math.max(v, g);
      }
      var m = v + t.strokeThickness;
      t.dropShadow && (m += t.dropShadowDistance);
      var _ = t.lineHeight || s.fontSize + t.strokeThickness, y = Math.max(_, s.fontSize + t.strokeThickness) + (l.length - 1) * (_ + t.leading);
      return t.dropShadow && (y += t.dropShadowDistance), new n(e, t, m, y, l, c, _ + t.leading, v, s);
    }, n.wordWrap = function(e, t, r) {
      r === void 0 && (r = n._canvas);
      for (var a = r.getContext("2d", contextSettings), o = 0, s = "", u = "", h = /* @__PURE__ */ Object.create(null), l = t.letterSpacing, c = t.whiteSpace, v = n.collapseSpaces(c), d = n.collapseNewlines(c), g = !v, m = t.wordWrapWidth + l, _ = n.tokenize(e), y = 0; y < _.length; y++) {
        var b = _[y];
        if (n.isNewline(b)) {
          if (!d) {
            u += n.addLine(s), g = !v, s = "", o = 0;
            continue;
          }
          b = " ";
        }
        if (v) {
          var S = n.isBreakingSpace(b), O = n.isBreakingSpace(s[s.length - 1]);
          if (S && O)
            continue;
        }
        var D = n.getFromCache(b, l, h, a);
        if (D > m)
          if (s !== "" && (u += n.addLine(s), s = "", o = 0), n.canBreakWords(b, t.breakWords))
            for (var E = n.wordWrapSplit(b), M = 0; M < E.length; M++) {
              for (var A = E[M], $ = 1; E[M + $]; ) {
                var B = E[M + $], U = A[A.length - 1];
                if (!n.canBreakChars(U, B, b, M, t.breakWords))
                  A += B;
                else
                  break;
                $++;
              }
              M += A.length - 1;
              var X = n.getFromCache(A, l, h, a);
              X + o > m && (u += n.addLine(s), g = !1, s = "", o = 0), s += A, o += X;
            }
          else {
            s.length > 0 && (u += n.addLine(s), s = "", o = 0);
            var G = y === _.length - 1;
            u += n.addLine(b, !G), g = !1, s = "", o = 0;
          }
        else
          D + o > m && (g = !1, u += n.addLine(s), s = "", o = 0), (s.length > 0 || !n.isBreakingSpace(b) || g) && (s += b, o += D);
      }
      return u += n.addLine(s, !1), u;
    }, n.addLine = function(e, t) {
      return t === void 0 && (t = !0), e = n.trimRight(e), e = t ? e + `
` : e, e;
    }, n.getFromCache = function(e, t, r, a) {
      var o = r[e];
      if (typeof o != "number") {
        var s = e.length * t;
        o = a.measureText(e).width + s, r[e] = o;
      }
      return o;
    }, n.collapseSpaces = function(e) {
      return e === "normal" || e === "pre-line";
    }, n.collapseNewlines = function(e) {
      return e === "normal";
    }, n.trimRight = function(e) {
      if (typeof e != "string")
        return "";
      for (var t = e.length - 1; t >= 0; t--) {
        var r = e[t];
        if (!n.isBreakingSpace(r))
          break;
        e = e.slice(0, -1);
      }
      return e;
    }, n.isNewline = function(e) {
      return typeof e != "string" ? !1 : n._newlines.indexOf(e.charCodeAt(0)) >= 0;
    }, n.isBreakingSpace = function(e, t) {
      return typeof e != "string" ? !1 : n._breakingSpaces.indexOf(e.charCodeAt(0)) >= 0;
    }, n.tokenize = function(e) {
      var t = [], r = "";
      if (typeof e != "string")
        return t;
      for (var a = 0; a < e.length; a++) {
        var o = e[a], s = e[a + 1];
        if (n.isBreakingSpace(o, s) || n.isNewline(o)) {
          r !== "" && (t.push(r), r = ""), t.push(o);
          continue;
        }
        r += o;
      }
      return r !== "" && t.push(r), t;
    }, n.canBreakWords = function(e, t) {
      return t;
    }, n.canBreakChars = function(e, t, r, a, o) {
      return !0;
    }, n.wordWrapSplit = function(e) {
      return e.split("");
    }, n.measureFont = function(e) {
      if (n._fonts[e])
        return n._fonts[e];
      var t = {
        ascent: 0,
        descent: 0,
        fontSize: 0
      }, r = n._canvas, a = n._context;
      a.font = e;
      var o = n.METRICS_STRING + n.BASELINE_SYMBOL, s = Math.ceil(a.measureText(o).width), u = Math.ceil(a.measureText(n.BASELINE_SYMBOL).width), h = Math.ceil(n.HEIGHT_MULTIPLIER * u);
      u = u * n.BASELINE_MULTIPLIER | 0, r.width = s, r.height = h, a.fillStyle = "#f00", a.fillRect(0, 0, s, h), a.font = e, a.textBaseline = "alphabetic", a.fillStyle = "#000", a.fillText(o, 0, u);
      var l = a.getImageData(0, 0, s, h).data, c = l.length, v = s * 4, d = 0, g = 0, m = !1;
      for (d = 0; d < u; ++d) {
        for (var _ = 0; _ < v; _ += 4)
          if (l[g + _] !== 255) {
            m = !0;
            break;
          }
        if (!m)
          g += v;
        else
          break;
      }
      for (t.ascent = u - d, g = c - v, m = !1, d = h; d > u; --d) {
        for (var _ = 0; _ < v; _ += 4)
          if (l[g + _] !== 255) {
            m = !0;
            break;
          }
        if (!m)
          g -= v;
        else
          break;
      }
      return t.descent = d - u, t.fontSize = t.ascent + t.descent, n._fonts[e] = t, t;
    }, n.clearMetrics = function(e) {
      e === void 0 && (e = ""), e ? delete n._fonts[e] : n._fonts = {};
    }, Object.defineProperty(n, "_canvas", {
      /**
       * Cached canvas element for measuring text
       * TODO: this should be private, but isn't because of backward compat, will fix later.
       * @ignore
       */
      get: function() {
        if (!n.__canvas) {
          var e = void 0;
          try {
            var t = new OffscreenCanvas(0, 0), r = t.getContext("2d", contextSettings);
            if (r && r.measureText)
              return n.__canvas = t, t;
            e = settings.ADAPTER.createCanvas();
          } catch {
            e = settings.ADAPTER.createCanvas();
          }
          e.width = e.height = 10, n.__canvas = e;
        }
        return n.__canvas;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n, "_context", {
      /**
       * TODO: this should be private, but isn't because of backward compat, will fix later.
       * @ignore
       */
      get: function() {
        return n.__context || (n.__context = n._canvas.getContext("2d", contextSettings)), n.__context;
      },
      enumerable: !1,
      configurable: !0
    }), n;
  }()
);
TextMetrics._fonts = {};
TextMetrics.METRICS_STRING = "|ÉqÅ";
TextMetrics.BASELINE_SYMBOL = "M";
TextMetrics.BASELINE_MULTIPLIER = 1.4;
TextMetrics.HEIGHT_MULTIPLIER = 2;
TextMetrics._newlines = [
  10,
  13
];
TextMetrics._breakingSpaces = [
  9,
  32,
  8192,
  8193,
  8194,
  8195,
  8196,
  8197,
  8198,
  8200,
  8201,
  8202,
  8287,
  12288
];
var defaultDestroyOptions = {
  texture: !0,
  children: !1,
  baseTexture: !0
}, Text = (
  /** @class */
  function(n) {
    __extends$c(e, n);
    function e(t, r, a) {
      var o = this, s = !1;
      a || (a = settings.ADAPTER.createCanvas(), s = !0), a.width = 3, a.height = 3;
      var u = Texture.from(a);
      return u.orig = new Rectangle(), u.trim = new Rectangle(), o = n.call(this, u) || this, o._ownCanvas = s, o.canvas = a, o.context = a.getContext("2d", {
        // required for trimming to work without warnings
        willReadFrequently: !0
      }), o._resolution = settings.RESOLUTION, o._autoResolution = !0, o._text = null, o._style = null, o._styleListener = null, o._font = "", o.text = t, o.style = r, o.localStyleID = -1, o;
    }
    return e.prototype.updateText = function(t) {
      var r = this._style;
      if (this.localStyleID !== r.styleID && (this.dirty = !0, this.localStyleID = r.styleID), !(!this.dirty && t)) {
        this._font = this._style.toFontString();
        var a = this.context, o = TextMetrics.measureText(this._text || " ", this._style, this._style.wordWrap, this.canvas), s = o.width, u = o.height, h = o.lines, l = o.lineHeight, c = o.lineWidths, v = o.maxLineWidth, d = o.fontProperties;
        this.canvas.width = Math.ceil(Math.ceil(Math.max(1, s) + r.padding * 2) * this._resolution), this.canvas.height = Math.ceil(Math.ceil(Math.max(1, u) + r.padding * 2) * this._resolution), a.scale(this._resolution, this._resolution), a.clearRect(0, 0, this.canvas.width, this.canvas.height), a.font = this._font, a.lineWidth = r.strokeThickness, a.textBaseline = r.textBaseline, a.lineJoin = r.lineJoin, a.miterLimit = r.miterLimit;
        for (var g, m, _ = r.dropShadow ? 2 : 1, y = 0; y < _; ++y) {
          var b = r.dropShadow && y === 0, S = b ? Math.ceil(Math.max(1, u) + r.padding * 2) : 0, O = S * this._resolution;
          if (b) {
            a.fillStyle = "black", a.strokeStyle = "black";
            var D = r.dropShadowColor, E = hex2rgb(typeof D == "number" ? D : string2hex(D)), M = r.dropShadowBlur * this._resolution, A = r.dropShadowDistance * this._resolution;
            a.shadowColor = "rgba(" + E[0] * 255 + "," + E[1] * 255 + "," + E[2] * 255 + "," + r.dropShadowAlpha + ")", a.shadowBlur = M, a.shadowOffsetX = Math.cos(r.dropShadowAngle) * A, a.shadowOffsetY = Math.sin(r.dropShadowAngle) * A + O;
          } else
            a.fillStyle = this._generateFillStyle(r, h, o), a.strokeStyle = r.stroke, a.shadowColor = "black", a.shadowBlur = 0, a.shadowOffsetX = 0, a.shadowOffsetY = 0;
          var $ = (l - d.fontSize) / 2;
          (!e.nextLineHeightBehavior || l - d.fontSize < 0) && ($ = 0);
          for (var B = 0; B < h.length; B++)
            g = r.strokeThickness / 2, m = r.strokeThickness / 2 + B * l + d.ascent + $, r.align === "right" ? g += v - c[B] : r.align === "center" && (g += (v - c[B]) / 2), r.stroke && r.strokeThickness && this.drawLetterSpacing(h[B], g + r.padding, m + r.padding - S, !0), r.fill && this.drawLetterSpacing(h[B], g + r.padding, m + r.padding - S);
        }
        this.updateTexture();
      }
    }, e.prototype.drawLetterSpacing = function(t, r, a, o) {
      o === void 0 && (o = !1);
      var s = this._style, u = s.letterSpacing, h = e.experimentalLetterSpacing && ("letterSpacing" in CanvasRenderingContext2D.prototype || "textLetterSpacing" in CanvasRenderingContext2D.prototype);
      if (u === 0 || h) {
        h && (this.context.letterSpacing = u, this.context.textLetterSpacing = u), o ? this.context.strokeText(t, r, a) : this.context.fillText(t, r, a);
        return;
      }
      for (var l = r, c = Array.from ? Array.from(t) : t.split(""), v = this.context.measureText(t).width, d = 0, g = 0; g < c.length; ++g) {
        var m = c[g];
        o ? this.context.strokeText(m, l, a) : this.context.fillText(m, l, a);
        for (var _ = "", y = g + 1; y < c.length; ++y)
          _ += c[y];
        d = this.context.measureText(_).width, l += v - d + u, v = d;
      }
    }, e.prototype.updateTexture = function() {
      var t = this.canvas;
      if (this._style.trim) {
        var r = trimCanvas(t);
        r.data && (t.width = r.width, t.height = r.height, this.context.putImageData(r.data, 0, 0));
      }
      var a = this._texture, o = this._style, s = o.trim ? 0 : o.padding, u = a.baseTexture;
      a.trim.width = a._frame.width = t.width / this._resolution, a.trim.height = a._frame.height = t.height / this._resolution, a.trim.x = -s, a.trim.y = -s, a.orig.width = a._frame.width - s * 2, a.orig.height = a._frame.height - s * 2, this._onTextureUpdate(), u.setRealSize(t.width, t.height, this._resolution), a.updateUvs(), this.dirty = !1;
    }, e.prototype._render = function(t) {
      this._autoResolution && this._resolution !== t.resolution && (this._resolution = t.resolution, this.dirty = !0), this.updateText(!0), n.prototype._render.call(this, t);
    }, e.prototype.updateTransform = function() {
      this.updateText(!0), n.prototype.updateTransform.call(this);
    }, e.prototype.getBounds = function(t, r) {
      return this.updateText(!0), this._textureID === -1 && (t = !1), n.prototype.getBounds.call(this, t, r);
    }, e.prototype.getLocalBounds = function(t) {
      return this.updateText(!0), n.prototype.getLocalBounds.call(this, t);
    }, e.prototype._calculateBounds = function() {
      this.calculateVertices(), this._bounds.addQuad(this.vertexData);
    }, e.prototype._generateFillStyle = function(t, r, a) {
      var o = t.fill;
      if (Array.isArray(o)) {
        if (o.length === 1)
          return o[0];
      } else return o;
      var s, u = t.dropShadow ? t.dropShadowDistance : 0, h = t.padding || 0, l = this.canvas.width / this._resolution - u - h * 2, c = this.canvas.height / this._resolution - u - h * 2, v = o.slice(), d = t.fillGradientStops.slice();
      if (!d.length)
        for (var g = v.length + 1, m = 1; m < g; ++m)
          d.push(m / g);
      if (v.unshift(o[0]), d.unshift(0), v.push(o[o.length - 1]), d.push(1), t.fillGradientType === TEXT_GRADIENT.LINEAR_VERTICAL) {
        s = this.context.createLinearGradient(l / 2, h, l / 2, c + h);
        for (var _ = a.fontProperties.fontSize + t.strokeThickness, m = 0; m < r.length; m++) {
          var y = a.lineHeight * (m - 1) + _, b = a.lineHeight * m, S = b;
          m > 0 && y > b && (S = (b + y) / 2);
          var O = b + _, D = a.lineHeight * (m + 1), E = O;
          m + 1 < r.length && D < O && (E = (O + D) / 2);
          for (var M = (E - S) / c, A = 0; A < v.length; A++) {
            var $ = 0;
            typeof d[A] == "number" ? $ = d[A] : $ = A / v.length;
            var B = Math.min(1, Math.max(0, S / c + $ * M));
            B = Number(B.toFixed(5)), s.addColorStop(B, v[A]);
          }
        }
      } else {
        s = this.context.createLinearGradient(h, c / 2, l + h, c / 2);
        for (var U = v.length + 1, X = 1, m = 0; m < v.length; m++) {
          var G = void 0;
          typeof d[m] == "number" ? G = d[m] : G = X / U, s.addColorStop(G, v[m]), X++;
        }
      }
      return s;
    }, e.prototype.destroy = function(t) {
      typeof t == "boolean" && (t = { children: t }), t = Object.assign({}, defaultDestroyOptions, t), n.prototype.destroy.call(this, t), this._ownCanvas && (this.canvas.height = this.canvas.width = 0), this.context = null, this.canvas = null, this._style = null;
    }, Object.defineProperty(e.prototype, "width", {
      /** The width of the Text, setting this will actually modify the scale to achieve the value set. */
      get: function() {
        return this.updateText(!0), Math.abs(this.scale.x) * this._texture.orig.width;
      },
      set: function(t) {
        this.updateText(!0);
        var r = sign(this.scale.x) || 1;
        this.scale.x = r * t / this._texture.orig.width, this._width = t;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "height", {
      /** The height of the Text, setting this will actually modify the scale to achieve the value set. */
      get: function() {
        return this.updateText(!0), Math.abs(this.scale.y) * this._texture.orig.height;
      },
      set: function(t) {
        this.updateText(!0);
        var r = sign(this.scale.y) || 1;
        this.scale.y = r * t / this._texture.orig.height, this._height = t;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "style", {
      /**
       * Set the style of the text.
       *
       * Set up an event listener to listen for changes on the style object and mark the text as dirty.
       */
      get: function() {
        return this._style;
      },
      set: function(t) {
        t = t || {}, t instanceof TextStyle ? this._style = t : this._style = new TextStyle(t), this.localStyleID = -1, this.dirty = !0;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "text", {
      /** Set the copy for the text object. To split a line you can use '\n'. */
      get: function() {
        return this._text;
      },
      set: function(t) {
        t = String(t ?? ""), this._text !== t && (this._text = t, this.dirty = !0);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "resolution", {
      /**
       * The resolution / device pixel ratio of the canvas.
       *
       * This is set to automatically match the renderer resolution by default, but can be overridden by setting manually.
       * @default 1
       */
      get: function() {
        return this._resolution;
      },
      set: function(t) {
        this._autoResolution = !1, this._resolution !== t && (this._resolution = t, this.dirty = !0);
      },
      enumerable: !1,
      configurable: !0
    }), e.nextLineHeightBehavior = !1, e.experimentalLetterSpacing = !1, e;
  }(Sprite)
);
settings.UPLOADS_PER_FRAME = 4;
var extendStatics$b = function(n, e) {
  return extendStatics$b = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, r) {
    t.__proto__ = r;
  } || function(t, r) {
    for (var a in r)
      r.hasOwnProperty(a) && (t[a] = r[a]);
  }, extendStatics$b(n, e);
};
function __extends$b(n, e) {
  extendStatics$b(n, e);
  function t() {
    this.constructor = n;
  }
  n.prototype = e === null ? Object.create(e) : (t.prototype = e.prototype, new t());
}
var CountLimiter = (
  /** @class */
  function() {
    function n(e) {
      this.maxItemsPerFrame = e, this.itemsLeft = 0;
    }
    return n.prototype.beginFrame = function() {
      this.itemsLeft = this.maxItemsPerFrame;
    }, n.prototype.allowedToUpload = function() {
      return this.itemsLeft-- > 0;
    }, n;
  }()
);
function findMultipleBaseTextures(n, e) {
  var t = !1;
  if (n && n._textures && n._textures.length) {
    for (var r = 0; r < n._textures.length; r++)
      if (n._textures[r] instanceof Texture) {
        var a = n._textures[r].baseTexture;
        e.indexOf(a) === -1 && (e.push(a), t = !0);
      }
  }
  return t;
}
function findBaseTexture(n, e) {
  if (n.baseTexture instanceof BaseTexture) {
    var t = n.baseTexture;
    return e.indexOf(t) === -1 && e.push(t), !0;
  }
  return !1;
}
function findTexture(n, e) {
  if (n._texture && n._texture instanceof Texture) {
    var t = n._texture.baseTexture;
    return e.indexOf(t) === -1 && e.push(t), !0;
  }
  return !1;
}
function drawText(n, e) {
  return e instanceof Text ? (e.updateText(!0), !0) : !1;
}
function calculateTextStyle(n, e) {
  if (e instanceof TextStyle) {
    var t = e.toFontString();
    return TextMetrics.measureFont(t), !0;
  }
  return !1;
}
function findText(n, e) {
  if (n instanceof Text) {
    e.indexOf(n.style) === -1 && e.push(n.style), e.indexOf(n) === -1 && e.push(n);
    var t = n._texture.baseTexture;
    return e.indexOf(t) === -1 && e.push(t), !0;
  }
  return !1;
}
function findTextStyle(n, e) {
  return n instanceof TextStyle ? (e.indexOf(n) === -1 && e.push(n), !0) : !1;
}
var BasePrepare = (
  /** @class */
  function() {
    function n(e) {
      var t = this;
      this.limiter = new CountLimiter(settings.UPLOADS_PER_FRAME), this.renderer = e, this.uploadHookHelper = null, this.queue = [], this.addHooks = [], this.uploadHooks = [], this.completes = [], this.ticking = !1, this.delayedTick = function() {
        t.queue && t.prepareItems();
      }, this.registerFindHook(findText), this.registerFindHook(findTextStyle), this.registerFindHook(findMultipleBaseTextures), this.registerFindHook(findBaseTexture), this.registerFindHook(findTexture), this.registerUploadHook(drawText), this.registerUploadHook(calculateTextStyle);
    }
    return n.prototype.upload = function(e, t) {
      var r = this;
      return typeof e == "function" && (t = e, e = null), t && deprecation("6.5.0", "BasePrepare.upload callback is deprecated, use the return Promise instead."), new Promise(function(a) {
        e && r.add(e);
        var o = function() {
          t?.(), a();
        };
        r.queue.length ? (r.completes.push(o), r.ticking || (r.ticking = !0, Ticker.system.addOnce(r.tick, r, UPDATE_PRIORITY.UTILITY))) : o();
      });
    }, n.prototype.tick = function() {
      setTimeout(this.delayedTick, 0);
    }, n.prototype.prepareItems = function() {
      for (this.limiter.beginFrame(); this.queue.length && this.limiter.allowedToUpload(); ) {
        var e = this.queue[0], t = !1;
        if (e && !e._destroyed) {
          for (var r = 0, a = this.uploadHooks.length; r < a; r++)
            if (this.uploadHooks[r](this.uploadHookHelper, e)) {
              this.queue.shift(), t = !0;
              break;
            }
        }
        t || this.queue.shift();
      }
      if (this.queue.length)
        Ticker.system.addOnce(this.tick, this, UPDATE_PRIORITY.UTILITY);
      else {
        this.ticking = !1;
        var o = this.completes.slice(0);
        this.completes.length = 0;
        for (var r = 0, a = o.length; r < a; r++)
          o[r]();
      }
    }, n.prototype.registerFindHook = function(e) {
      return e && this.addHooks.push(e), this;
    }, n.prototype.registerUploadHook = function(e) {
      return e && this.uploadHooks.push(e), this;
    }, n.prototype.add = function(e) {
      for (var t = 0, r = this.addHooks.length; t < r && !this.addHooks[t](e, this.queue); t++)
        ;
      if (e instanceof Container)
        for (var t = e.children.length - 1; t >= 0; t--)
          this.add(e.children[t]);
      return this;
    }, n.prototype.destroy = function() {
      this.ticking && Ticker.system.remove(this.tick, this), this.ticking = !1, this.addHooks = null, this.uploadHooks = null, this.renderer = null, this.completes = null, this.queue = null, this.limiter = null, this.uploadHookHelper = null;
    }, n;
  }()
);
function uploadBaseTextures(n, e) {
  return e instanceof BaseTexture ? (e._glTextures[n.CONTEXT_UID] || n.texture.bind(e), !0) : !1;
}
function uploadGraphics(n, e) {
  if (!(e instanceof Graphics))
    return !1;
  var t = e.geometry;
  e.finishPoly(), t.updateBatches();
  for (var r = t.batches, a = 0; a < r.length; a++) {
    var o = r[a].style.texture;
    o && uploadBaseTextures(n, o.baseTexture);
  }
  return t.batchable || n.geometry.bind(t, e._resolveDirectShader(n)), !0;
}
function findGraphics(n, e) {
  return n instanceof Graphics ? (e.push(n), !0) : !1;
}
var Prepare = (
  /** @class */
  function(n) {
    __extends$b(e, n);
    function e(t) {
      var r = n.call(this, t) || this;
      return r.uploadHookHelper = r.renderer, r.registerFindHook(findGraphics), r.registerUploadHook(uploadBaseTextures), r.registerUploadHook(uploadGraphics), r;
    }
    return e.extension = {
      name: "prepare",
      type: ExtensionType.RendererPlugin
    }, e;
  }(BasePrepare)
);
var Spritesheet = (
  /** @class */
  function() {
    function n(e, t, r) {
      r === void 0 && (r = null), this.linkedSheets = [], this._texture = e instanceof Texture ? e : null, this.baseTexture = e instanceof BaseTexture ? e : this._texture.baseTexture, this.textures = {}, this.animations = {}, this.data = t;
      var a = this.baseTexture.resource;
      this.resolution = this._updateResolution(r || (a ? a.url : null)), this._frames = this.data.frames, this._frameKeys = Object.keys(this._frames), this._batchIndex = 0, this._callback = null;
    }
    return n.prototype._updateResolution = function(e) {
      e === void 0 && (e = null);
      var t = this.data.meta.scale, r = getResolutionOfUrl(e, null);
      return r === null && (r = t !== void 0 ? parseFloat(t) : 1), r !== 1 && this.baseTexture.setResolution(r), r;
    }, n.prototype.parse = function(e) {
      var t = this;
      return e && deprecation("6.5.0", "Spritesheet.parse callback is deprecated, use the return Promise instead."), new Promise(function(r) {
        t._callback = function(a) {
          e?.(a), r(a);
        }, t._batchIndex = 0, t._frameKeys.length <= n.BATCH_SIZE ? (t._processFrames(0), t._processAnimations(), t._parseComplete()) : t._nextBatch();
      });
    }, n.prototype._processFrames = function(e) {
      for (var t = e, r = n.BATCH_SIZE; t - e < r && t < this._frameKeys.length; ) {
        var a = this._frameKeys[t], o = this._frames[a], s = o.frame;
        if (s) {
          var u = null, h = null, l = o.trimmed !== !1 && o.sourceSize ? o.sourceSize : o.frame, c = new Rectangle(0, 0, Math.floor(l.w) / this.resolution, Math.floor(l.h) / this.resolution);
          o.rotated ? u = new Rectangle(Math.floor(s.x) / this.resolution, Math.floor(s.y) / this.resolution, Math.floor(s.h) / this.resolution, Math.floor(s.w) / this.resolution) : u = new Rectangle(Math.floor(s.x) / this.resolution, Math.floor(s.y) / this.resolution, Math.floor(s.w) / this.resolution, Math.floor(s.h) / this.resolution), o.trimmed !== !1 && o.spriteSourceSize && (h = new Rectangle(Math.floor(o.spriteSourceSize.x) / this.resolution, Math.floor(o.spriteSourceSize.y) / this.resolution, Math.floor(s.w) / this.resolution, Math.floor(s.h) / this.resolution)), this.textures[a] = new Texture(this.baseTexture, u, c, h, o.rotated ? 2 : 0, o.anchor), Texture.addToCache(this.textures[a], a);
        }
        t++;
      }
    }, n.prototype._processAnimations = function() {
      var e = this.data.animations || {};
      for (var t in e) {
        this.animations[t] = [];
        for (var r = 0; r < e[t].length; r++) {
          var a = e[t][r];
          this.animations[t].push(this.textures[a]);
        }
      }
    }, n.prototype._parseComplete = function() {
      var e = this._callback;
      this._callback = null, this._batchIndex = 0, e.call(this, this.textures);
    }, n.prototype._nextBatch = function() {
      var e = this;
      this._processFrames(this._batchIndex * n.BATCH_SIZE), this._batchIndex++, setTimeout(function() {
        e._batchIndex * n.BATCH_SIZE < e._frameKeys.length ? e._nextBatch() : (e._processAnimations(), e._parseComplete());
      }, 0);
    }, n.prototype.destroy = function(e) {
      var t;
      e === void 0 && (e = !1);
      for (var r in this.textures)
        this.textures[r].destroy();
      this._frames = null, this._frameKeys = null, this.data = null, this.textures = null, e && ((t = this._texture) === null || t === void 0 || t.destroy(), this.baseTexture.destroy()), this._texture = null, this.baseTexture = null, this.linkedSheets = [];
    }, n.BATCH_SIZE = 1e3, n;
  }()
), SpritesheetLoader = (
  /** @class */
  function() {
    function n() {
    }
    return n.use = function(e, t) {
      var r, a, o = this, s = e.name + "_image";
      if (!e.data || e.type !== LoaderResource.TYPE.JSON || !e.data.frames || o.resources[s]) {
        t();
        return;
      }
      var u = (a = (r = e.data) === null || r === void 0 ? void 0 : r.meta) === null || a === void 0 ? void 0 : a.related_multi_packs;
      if (Array.isArray(u))
        for (var h = function(m) {
          if (typeof m != "string")
            return "continue";
          var _ = m.replace(".json", ""), y = url$1.resolve(e.url.replace(o.baseUrl, ""), m);
          if (o.resources[_] || Object.values(o.resources).some(function(S) {
            return url$1.format(url$1.parse(S.url)) === y;
          }))
            return "continue";
          var b = {
            crossOrigin: e.crossOrigin,
            loadType: LoaderResource.LOAD_TYPE.XHR,
            xhrType: LoaderResource.XHR_RESPONSE_TYPE.JSON,
            parentResource: e,
            metadata: e.metadata
          };
          o.add(_, y, b);
        }, l = 0, c = u; l < c.length; l++) {
          var v = c[l];
          h(v);
        }
      var d = {
        crossOrigin: e.crossOrigin,
        metadata: e.metadata.imageMetadata,
        parentResource: e
      }, g = n.getResourcePath(e, o.baseUrl);
      o.add(s, g, d, function(_) {
        if (_.error) {
          t(_.error);
          return;
        }
        var y = new Spritesheet(_.texture, e.data, e.url);
        y.parse().then(function() {
          e.spritesheet = y, e.textures = y.textures, t();
        });
      });
    }, n.getResourcePath = function(e, t) {
      return e.isDataUrl ? e.data.meta.image : url$1.resolve(e.url.replace(t, ""), e.data.meta.image);
    }, n.extension = ExtensionType.Loader, n;
  }()
);
var extendStatics$a = function(n, e) {
  return extendStatics$a = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, r) {
    t.__proto__ = r;
  } || function(t, r) {
    for (var a in r)
      r.hasOwnProperty(a) && (t[a] = r[a]);
  }, extendStatics$a(n, e);
};
function __extends$a(n, e) {
  extendStatics$a(n, e);
  function t() {
    this.constructor = n;
  }
  n.prototype = e === null ? Object.create(e) : (t.prototype = e.prototype, new t());
}
var tempPoint$1 = new Point();
(function(n) {
  __extends$a(e, n);
  function e(t, r, a) {
    r === void 0 && (r = 100), a === void 0 && (a = 100);
    var o = n.call(this, t) || this;
    return o.tileTransform = new Transform(), o._width = r, o._height = a, o.uvMatrix = o.texture.uvMatrix || new TextureMatrix(t), o.pluginName = "tilingSprite", o.uvRespectAnchor = !1, o;
  }
  return Object.defineProperty(e.prototype, "clampMargin", {
    /**
     * Changes frame clamping in corresponding textureTransform, shortcut
     * Change to -0.5 to add a pixel to the edge, recommended for transparent trimmed textures in atlas
     * @default 0.5
     * @member {number}
     */
    get: function() {
      return this.uvMatrix.clampMargin;
    },
    set: function(t) {
      this.uvMatrix.clampMargin = t, this.uvMatrix.update(!0);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(e.prototype, "tileScale", {
    /** The scaling of the image that is being tiled. */
    get: function() {
      return this.tileTransform.scale;
    },
    set: function(t) {
      this.tileTransform.scale.copyFrom(t);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(e.prototype, "tilePosition", {
    /** The offset of the image that is being tiled. */
    get: function() {
      return this.tileTransform.position;
    },
    set: function(t) {
      this.tileTransform.position.copyFrom(t);
    },
    enumerable: !1,
    configurable: !0
  }), e.prototype._onTextureUpdate = function() {
    this.uvMatrix && (this.uvMatrix.texture = this._texture), this._cachedTint = 16777215;
  }, e.prototype._render = function(t) {
    var r = this._texture;
    !r || !r.valid || (this.tileTransform.updateLocalTransform(), this.uvMatrix.update(), t.batch.setObjectRenderer(t.plugins[this.pluginName]), t.plugins[this.pluginName].render(this));
  }, e.prototype._calculateBounds = function() {
    var t = this._width * -this._anchor._x, r = this._height * -this._anchor._y, a = this._width * (1 - this._anchor._x), o = this._height * (1 - this._anchor._y);
    this._bounds.addFrame(this.transform, t, r, a, o);
  }, e.prototype.getLocalBounds = function(t) {
    return this.children.length === 0 ? (this._bounds.minX = this._width * -this._anchor._x, this._bounds.minY = this._height * -this._anchor._y, this._bounds.maxX = this._width * (1 - this._anchor._x), this._bounds.maxY = this._height * (1 - this._anchor._y), t || (this._localBoundsRect || (this._localBoundsRect = new Rectangle()), t = this._localBoundsRect), this._bounds.getRectangle(t)) : n.prototype.getLocalBounds.call(this, t);
  }, e.prototype.containsPoint = function(t) {
    this.worldTransform.applyInverse(t, tempPoint$1);
    var r = this._width, a = this._height, o = -r * this.anchor._x;
    if (tempPoint$1.x >= o && tempPoint$1.x < o + r) {
      var s = -a * this.anchor._y;
      if (tempPoint$1.y >= s && tempPoint$1.y < s + a)
        return !0;
    }
    return !1;
  }, e.prototype.destroy = function(t) {
    n.prototype.destroy.call(this, t), this.tileTransform = null, this.uvMatrix = null;
  }, e.from = function(t, r) {
    var a = t instanceof Texture ? t : Texture.from(t, r);
    return new e(a, r.width, r.height);
  }, Object.defineProperty(e.prototype, "width", {
    /** The width of the sprite, setting this will actually modify the scale to achieve the value set. */
    get: function() {
      return this._width;
    },
    set: function(t) {
      this._width = t;
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(e.prototype, "height", {
    /** The height of the TilingSprite, setting this will actually modify the scale to achieve the value set. */
    get: function() {
      return this._height;
    },
    set: function(t) {
      this._height = t;
    },
    enumerable: !1,
    configurable: !0
  }), e;
})(Sprite);
var fragmentSimpleSrc = `#version 100
#define SHADER_NAME Tiling-Sprite-Simple-100

precision lowp float;

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform vec4 uColor;

void main(void)
{
    vec4 texSample = texture2D(uSampler, vTextureCoord);
    gl_FragColor = texSample * uColor;
}
`, gl1VertexSrc = `#version 100
#define SHADER_NAME Tiling-Sprite-100

precision lowp float;

attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;
uniform mat3 translationMatrix;
uniform mat3 uTransform;

varying vec2 vTextureCoord;

void main(void)
{
    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);

    vTextureCoord = (uTransform * vec3(aTextureCoord, 1.0)).xy;
}
`, gl1FragmentSrc = `#version 100
#ifdef GL_EXT_shader_texture_lod
    #extension GL_EXT_shader_texture_lod : enable
#endif
#define SHADER_NAME Tiling-Sprite-100

precision lowp float;

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform vec4 uColor;
uniform mat3 uMapCoord;
uniform vec4 uClampFrame;
uniform vec2 uClampOffset;

void main(void)
{
    vec2 coord = vTextureCoord + ceil(uClampOffset - vTextureCoord);
    coord = (uMapCoord * vec3(coord, 1.0)).xy;
    vec2 unclamped = coord;
    coord = clamp(coord, uClampFrame.xy, uClampFrame.zw);

    #ifdef GL_EXT_shader_texture_lod
        vec4 texSample = unclamped == coord
            ? texture2D(uSampler, coord) 
            : texture2DLodEXT(uSampler, coord, 0);
    #else
        vec4 texSample = texture2D(uSampler, coord);
    #endif

    gl_FragColor = texSample * uColor;
}
`, gl2VertexSrc = `#version 300 es
#define SHADER_NAME Tiling-Sprite-300

precision lowp float;

in vec2 aVertexPosition;
in vec2 aTextureCoord;

uniform mat3 projectionMatrix;
uniform mat3 translationMatrix;
uniform mat3 uTransform;

out vec2 vTextureCoord;

void main(void)
{
    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);

    vTextureCoord = (uTransform * vec3(aTextureCoord, 1.0)).xy;
}
`, gl2FragmentSrc = `#version 300 es
#define SHADER_NAME Tiling-Sprite-100

precision lowp float;

in vec2 vTextureCoord;

out vec4 fragmentColor;

uniform sampler2D uSampler;
uniform vec4 uColor;
uniform mat3 uMapCoord;
uniform vec4 uClampFrame;
uniform vec2 uClampOffset;

void main(void)
{
    vec2 coord = vTextureCoord + ceil(uClampOffset - vTextureCoord);
    coord = (uMapCoord * vec3(coord, 1.0)).xy;
    vec2 unclamped = coord;
    coord = clamp(coord, uClampFrame.xy, uClampFrame.zw);

    vec4 texSample = texture(uSampler, coord, unclamped == coord ? 0.0f : -32.0f);// lod-bias very negative to force lod 0

    fragmentColor = texSample * uColor;
}
`, tempMat = new Matrix(), TilingSpriteRenderer = (
  /** @class */
  function(n) {
    __extends$a(e, n);
    function e(t) {
      var r = n.call(this, t) || this;
      return t.runners.contextChange.add(r), r.quad = new QuadUv(), r.state = State.for2d(), r;
    }
    return e.prototype.contextChange = function() {
      var t = this.renderer, r = { globals: t.globalUniforms };
      this.simpleShader = Shader.from(gl1VertexSrc, fragmentSimpleSrc, r), this.shader = t.context.webGLVersion > 1 ? Shader.from(gl2VertexSrc, gl2FragmentSrc, r) : Shader.from(gl1VertexSrc, gl1FragmentSrc, r);
    }, e.prototype.render = function(t) {
      var r = this.renderer, a = this.quad, o = a.vertices;
      o[0] = o[6] = t._width * -t.anchor.x, o[1] = o[3] = t._height * -t.anchor.y, o[2] = o[4] = t._width * (1 - t.anchor.x), o[5] = o[7] = t._height * (1 - t.anchor.y);
      var s = t.uvRespectAnchor ? t.anchor.x : 0, u = t.uvRespectAnchor ? t.anchor.y : 0;
      o = a.uvs, o[0] = o[6] = -s, o[1] = o[3] = -u, o[2] = o[4] = 1 - s, o[5] = o[7] = 1 - u, a.invalidate();
      var h = t._texture, l = h.baseTexture, c = l.alphaMode > 0, v = t.tileTransform.localTransform, d = t.uvMatrix, g = l.isPowerOfTwo && h.frame.width === l.width && h.frame.height === l.height;
      g && (l._glTextures[r.CONTEXT_UID] ? g = l.wrapMode !== WRAP_MODES.CLAMP : l.wrapMode === WRAP_MODES.CLAMP && (l.wrapMode = WRAP_MODES.REPEAT));
      var m = g ? this.simpleShader : this.shader, _ = h.width, y = h.height, b = t._width, S = t._height;
      tempMat.set(v.a * _ / b, v.b * _ / S, v.c * y / b, v.d * y / S, v.tx / b, v.ty / S), tempMat.invert(), g ? tempMat.prepend(d.mapCoord) : (m.uniforms.uMapCoord = d.mapCoord.toArray(!0), m.uniforms.uClampFrame = d.uClampFrame, m.uniforms.uClampOffset = d.uClampOffset), m.uniforms.uTransform = tempMat.toArray(!0), m.uniforms.uColor = premultiplyTintToRgba(t.tint, t.worldAlpha, m.uniforms.uColor, c), m.uniforms.translationMatrix = t.transform.worldTransform.toArray(!0), m.uniforms.uSampler = h, r.shader.bind(m), r.geometry.bind(a), this.state.blendMode = correctBlendMode(t.blendMode, c), r.state.set(this.state), r.geometry.draw(this.renderer.gl.TRIANGLES, 6, 0);
    }, e.extension = {
      name: "tilingSprite",
      type: ExtensionType.RendererPlugin
    }, e;
  }(ObjectRenderer)
);
var extendStatics$9 = function(n, e) {
  return extendStatics$9 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, r) {
    t.__proto__ = r;
  } || function(t, r) {
    for (var a in r)
      r.hasOwnProperty(a) && (t[a] = r[a]);
  }, extendStatics$9(n, e);
};
function __extends$9(n, e) {
  extendStatics$9(n, e);
  function t() {
    this.constructor = n;
  }
  n.prototype = e === null ? Object.create(e) : (t.prototype = e.prototype, new t());
}
var MeshBatchUvs = (
  /** @class */
  function() {
    function n(e, t) {
      this.uvBuffer = e, this.uvMatrix = t, this.data = null, this._bufferUpdateId = -1, this._textureUpdateId = -1, this._updateID = 0;
    }
    return n.prototype.update = function(e) {
      if (!(!e && this._bufferUpdateId === this.uvBuffer._updateID && this._textureUpdateId === this.uvMatrix._updateID)) {
        this._bufferUpdateId = this.uvBuffer._updateID, this._textureUpdateId = this.uvMatrix._updateID;
        var t = this.uvBuffer.data;
        (!this.data || this.data.length !== t.length) && (this.data = new Float32Array(t.length)), this.uvMatrix.multiplyUvs(t, this.data), this._updateID++;
      }
    }, n;
  }()
), tempPoint = new Point(), tempPolygon = new Polygon(), Mesh = (
  /** @class */
  function(n) {
    __extends$9(e, n);
    function e(t, r, a, o) {
      o === void 0 && (o = DRAW_MODES.TRIANGLES);
      var s = n.call(this) || this;
      return s.geometry = t, s.shader = r, s.state = a || State.for2d(), s.drawMode = o, s.start = 0, s.size = 0, s.uvs = null, s.indices = null, s.vertexData = new Float32Array(1), s.vertexDirty = -1, s._transformID = -1, s._roundPixels = settings.ROUND_PIXELS, s.batchUvs = null, s;
    }
    return Object.defineProperty(e.prototype, "geometry", {
      /**
       * Includes vertex positions, face indices, normals, colors, UVs, and
       * custom attributes within buffers, reducing the cost of passing all
       * this data to the GPU. Can be shared between multiple Mesh objects.
       */
      get: function() {
        return this._geometry;
      },
      set: function(t) {
        this._geometry !== t && (this._geometry && (this._geometry.refCount--, this._geometry.refCount === 0 && this._geometry.dispose()), this._geometry = t, this._geometry && this._geometry.refCount++, this.vertexDirty = -1);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "uvBuffer", {
      /**
       * To change mesh uv's, change its uvBuffer data and increment its _updateID.
       * @readonly
       */
      get: function() {
        return this.geometry.buffers[1];
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "verticesBuffer", {
      /**
       * To change mesh vertices, change its uvBuffer data and increment its _updateID.
       * Incrementing _updateID is optional because most of Mesh objects do it anyway.
       * @readonly
       */
      get: function() {
        return this.geometry.buffers[0];
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "material", {
      get: function() {
        return this.shader;
      },
      /** Alias for {@link PIXI.Mesh#shader}. */
      set: function(t) {
        this.shader = t;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "blendMode", {
      get: function() {
        return this.state.blendMode;
      },
      /**
       * The blend mode to be applied to the Mesh. Apply a value of
       * `PIXI.BLEND_MODES.NORMAL` to reset the blend mode.
       * @default PIXI.BLEND_MODES.NORMAL;
       */
      set: function(t) {
        this.state.blendMode = t;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "roundPixels", {
      get: function() {
        return this._roundPixels;
      },
      /**
       * If true PixiJS will Math.floor() x/y values when rendering, stopping pixel interpolation.
       * Advantages can include sharper image quality (like text) and faster rendering on canvas.
       * The main disadvantage is movement of objects may appear less smooth.
       * To set the global default, change {@link PIXI.settings.ROUND_PIXELS}
       * @default false
       */
      set: function(t) {
        this._roundPixels !== t && (this._transformID = -1), this._roundPixels = t;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "tint", {
      /**
       * The multiply tint applied to the Mesh. This is a hex value. A value of
       * `0xFFFFFF` will remove any tint effect.
       *
       * Null for non-MeshMaterial shaders
       * @default 0xFFFFFF
       */
      get: function() {
        return "tint" in this.shader ? this.shader.tint : null;
      },
      set: function(t) {
        this.shader.tint = t;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "texture", {
      /** The texture that the Mesh uses. Null for non-MeshMaterial shaders */
      get: function() {
        return "texture" in this.shader ? this.shader.texture : null;
      },
      set: function(t) {
        this.shader.texture = t;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype._render = function(t) {
      var r = this.geometry.buffers[0].data, a = this.shader;
      a.batchable && this.drawMode === DRAW_MODES.TRIANGLES && r.length < e.BATCHABLE_SIZE * 2 ? this._renderToBatch(t) : this._renderDefault(t);
    }, e.prototype._renderDefault = function(t) {
      var r = this.shader;
      r.alpha = this.worldAlpha, r.update && r.update(), t.batch.flush(), r.uniforms.translationMatrix = this.transform.worldTransform.toArray(!0), t.shader.bind(r), t.state.set(this.state), t.geometry.bind(this.geometry, r), t.geometry.draw(this.drawMode, this.size, this.start, this.geometry.instanceCount);
    }, e.prototype._renderToBatch = function(t) {
      var r = this.geometry, a = this.shader;
      a.uvMatrix && (a.uvMatrix.update(), this.calculateUvs()), this.calculateVertices(), this.indices = r.indexBuffer.data, this._tintRGB = a._tintRGB, this._texture = a.texture;
      var o = this.material.pluginName;
      t.batch.setObjectRenderer(t.plugins[o]), t.plugins[o].render(this);
    }, e.prototype.calculateVertices = function() {
      var t = this.geometry, r = t.buffers[0], a = r.data, o = r._updateID;
      if (!(o === this.vertexDirty && this._transformID === this.transform._worldID)) {
        this._transformID = this.transform._worldID, this.vertexData.length !== a.length && (this.vertexData = new Float32Array(a.length));
        for (var s = this.transform.worldTransform, u = s.a, h = s.b, l = s.c, c = s.d, v = s.tx, d = s.ty, g = this.vertexData, m = 0; m < g.length / 2; m++) {
          var _ = a[m * 2], y = a[m * 2 + 1];
          g[m * 2] = u * _ + l * y + v, g[m * 2 + 1] = h * _ + c * y + d;
        }
        if (this._roundPixels)
          for (var b = settings.RESOLUTION, m = 0; m < g.length; ++m)
            g[m] = Math.round((g[m] * b | 0) / b);
        this.vertexDirty = o;
      }
    }, e.prototype.calculateUvs = function() {
      var t = this.geometry.buffers[1], r = this.shader;
      r.uvMatrix.isSimple ? this.uvs = t.data : (this.batchUvs || (this.batchUvs = new MeshBatchUvs(t, r.uvMatrix)), this.batchUvs.update(), this.uvs = this.batchUvs.data);
    }, e.prototype._calculateBounds = function() {
      this.calculateVertices(), this._bounds.addVertexData(this.vertexData, 0, this.vertexData.length);
    }, e.prototype.containsPoint = function(t) {
      if (!this.getBounds().contains(t.x, t.y))
        return !1;
      this.worldTransform.applyInverse(t, tempPoint);
      for (var r = this.geometry.getBuffer("aVertexPosition").data, a = tempPolygon.points, o = this.geometry.getIndex().data, s = o.length, u = this.drawMode === 4 ? 3 : 1, h = 0; h + 2 < s; h += u) {
        var l = o[h] * 2, c = o[h + 1] * 2, v = o[h + 2] * 2;
        if (a[0] = r[l], a[1] = r[l + 1], a[2] = r[c], a[3] = r[c + 1], a[4] = r[v], a[5] = r[v + 1], tempPolygon.contains(tempPoint.x, tempPoint.y))
          return !0;
      }
      return !1;
    }, e.prototype.destroy = function(t) {
      n.prototype.destroy.call(this, t), this._cachedTexture && (this._cachedTexture.destroy(), this._cachedTexture = null), this.geometry = null, this.shader = null, this.state = null, this.uvs = null, this.indices = null, this.vertexData = null;
    }, e.BATCHABLE_SIZE = 100, e;
  }(Container)
), fragment$5 = `varying vec2 vTextureCoord;
uniform vec4 uColor;

uniform sampler2D uSampler;

void main(void)
{
    gl_FragColor = texture2D(uSampler, vTextureCoord) * uColor;
}
`, vertex$2 = `attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;
uniform mat3 translationMatrix;
uniform mat3 uTextureMatrix;

varying vec2 vTextureCoord;

void main(void)
{
    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);

    vTextureCoord = (uTextureMatrix * vec3(aTextureCoord, 1.0)).xy;
}
`, MeshMaterial = (
  /** @class */
  function(n) {
    __extends$9(e, n);
    function e(t, r) {
      var a = this, o = {
        uSampler: t,
        alpha: 1,
        uTextureMatrix: Matrix.IDENTITY,
        uColor: new Float32Array([1, 1, 1, 1])
      };
      return r = Object.assign({
        tint: 16777215,
        alpha: 1,
        pluginName: "batch"
      }, r), r.uniforms && Object.assign(o, r.uniforms), a = n.call(this, r.program || Program.from(vertex$2, fragment$5), o) || this, a._colorDirty = !1, a.uvMatrix = new TextureMatrix(t), a.batchable = r.program === void 0, a.pluginName = r.pluginName, a.tint = r.tint, a.alpha = r.alpha, a;
    }
    return Object.defineProperty(e.prototype, "texture", {
      /** Reference to the texture being rendered. */
      get: function() {
        return this.uniforms.uSampler;
      },
      set: function(t) {
        this.uniforms.uSampler !== t && (!this.uniforms.uSampler.baseTexture.alphaMode != !t.baseTexture.alphaMode && (this._colorDirty = !0), this.uniforms.uSampler = t, this.uvMatrix.texture = t);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "alpha", {
      get: function() {
        return this._alpha;
      },
      /**
       * This gets automatically set by the object using this.
       * @default 1
       */
      set: function(t) {
        t !== this._alpha && (this._alpha = t, this._colorDirty = !0);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "tint", {
      get: function() {
        return this._tint;
      },
      /**
       * Multiply tint for the material.
       * @default 0xFFFFFF
       */
      set: function(t) {
        t !== this._tint && (this._tint = t, this._tintRGB = (t >> 16) + (t & 65280) + ((t & 255) << 16), this._colorDirty = !0);
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.update = function() {
      if (this._colorDirty) {
        this._colorDirty = !1;
        var t = this.texture.baseTexture;
        premultiplyTintToRgba(this._tint, this._alpha, this.uniforms.uColor, t.alphaMode);
      }
      this.uvMatrix.update() && (this.uniforms.uTextureMatrix = this.uvMatrix.mapCoord);
    }, e;
  }(Shader)
), MeshGeometry = (
  /** @class */
  function(n) {
    __extends$9(e, n);
    function e(t, r, a) {
      var o = n.call(this) || this, s = new Buffer(t), u = new Buffer(r, !0), h = new Buffer(a, !0, !0);
      return o.addAttribute("aVertexPosition", s, 2, !1, TYPES.FLOAT).addAttribute("aTextureCoord", u, 2, !1, TYPES.FLOAT).addIndex(h), o._updateId = -1, o;
    }
    return Object.defineProperty(e.prototype, "vertexDirtyId", {
      /**
       * If the vertex position is updated.
       * @readonly
       * @private
       */
      get: function() {
        return this.buffers[0]._updateID;
      },
      enumerable: !1,
      configurable: !0
    }), e;
  }(Geometry)
);
var extendStatics$8 = function(n, e) {
  return extendStatics$8 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, r) {
    t.__proto__ = r;
  } || function(t, r) {
    for (var a in r)
      r.hasOwnProperty(a) && (t[a] = r[a]);
  }, extendStatics$8(n, e);
};
function __extends$8(n, e) {
  extendStatics$8(n, e);
  function t() {
    this.constructor = n;
  }
  n.prototype = e === null ? Object.create(e) : (t.prototype = e.prototype, new t());
}
var BitmapFontData = (
  /** @class */
  /* @__PURE__ */ function() {
    function n() {
      this.info = [], this.common = [], this.page = [], this.char = [], this.kerning = [], this.distanceField = [];
    }
    return n;
  }()
), TextFormat = (
  /** @class */
  function() {
    function n() {
    }
    return n.test = function(e) {
      return typeof e == "string" && e.indexOf("info face=") === 0;
    }, n.parse = function(e) {
      var t = e.match(/^[a-z]+\s+.+$/gm), r = {
        info: [],
        common: [],
        page: [],
        char: [],
        chars: [],
        kerning: [],
        kernings: [],
        distanceField: []
      };
      for (var a in t) {
        var o = t[a].match(/^[a-z]+/gm)[0], s = t[a].match(/[a-zA-Z]+=([^\s"']+|"([^"]*)")/gm), u = {};
        for (var h in s) {
          var l = s[h].split("="), c = l[0], v = l[1].replace(/"/gm, ""), d = parseFloat(v), g = isNaN(d) ? v : d;
          u[c] = g;
        }
        r[o].push(u);
      }
      var m = new BitmapFontData();
      return r.info.forEach(function(_) {
        return m.info.push({
          face: _.face,
          size: parseInt(_.size, 10)
        });
      }), r.common.forEach(function(_) {
        return m.common.push({
          lineHeight: parseInt(_.lineHeight, 10)
        });
      }), r.page.forEach(function(_) {
        return m.page.push({
          id: parseInt(_.id, 10),
          file: _.file
        });
      }), r.char.forEach(function(_) {
        return m.char.push({
          id: parseInt(_.id, 10),
          page: parseInt(_.page, 10),
          x: parseInt(_.x, 10),
          y: parseInt(_.y, 10),
          width: parseInt(_.width, 10),
          height: parseInt(_.height, 10),
          xoffset: parseInt(_.xoffset, 10),
          yoffset: parseInt(_.yoffset, 10),
          xadvance: parseInt(_.xadvance, 10)
        });
      }), r.kerning.forEach(function(_) {
        return m.kerning.push({
          first: parseInt(_.first, 10),
          second: parseInt(_.second, 10),
          amount: parseInt(_.amount, 10)
        });
      }), r.distanceField.forEach(function(_) {
        return m.distanceField.push({
          distanceRange: parseInt(_.distanceRange, 10),
          fieldType: _.fieldType
        });
      }), m;
    }, n;
  }()
), XMLFormat = (
  /** @class */
  function() {
    function n() {
    }
    return n.test = function(e) {
      return e instanceof XMLDocument && e.getElementsByTagName("page").length && e.getElementsByTagName("info")[0].getAttribute("face") !== null;
    }, n.parse = function(e) {
      for (var t = new BitmapFontData(), r = e.getElementsByTagName("info"), a = e.getElementsByTagName("common"), o = e.getElementsByTagName("page"), s = e.getElementsByTagName("char"), u = e.getElementsByTagName("kerning"), h = e.getElementsByTagName("distanceField"), l = 0; l < r.length; l++)
        t.info.push({
          face: r[l].getAttribute("face"),
          size: parseInt(r[l].getAttribute("size"), 10)
        });
      for (var l = 0; l < a.length; l++)
        t.common.push({
          lineHeight: parseInt(a[l].getAttribute("lineHeight"), 10)
        });
      for (var l = 0; l < o.length; l++)
        t.page.push({
          id: parseInt(o[l].getAttribute("id"), 10) || 0,
          file: o[l].getAttribute("file")
        });
      for (var l = 0; l < s.length; l++) {
        var c = s[l];
        t.char.push({
          id: parseInt(c.getAttribute("id"), 10),
          page: parseInt(c.getAttribute("page"), 10) || 0,
          x: parseInt(c.getAttribute("x"), 10),
          y: parseInt(c.getAttribute("y"), 10),
          width: parseInt(c.getAttribute("width"), 10),
          height: parseInt(c.getAttribute("height"), 10),
          xoffset: parseInt(c.getAttribute("xoffset"), 10),
          yoffset: parseInt(c.getAttribute("yoffset"), 10),
          xadvance: parseInt(c.getAttribute("xadvance"), 10)
        });
      }
      for (var l = 0; l < u.length; l++)
        t.kerning.push({
          first: parseInt(u[l].getAttribute("first"), 10),
          second: parseInt(u[l].getAttribute("second"), 10),
          amount: parseInt(u[l].getAttribute("amount"), 10)
        });
      for (var l = 0; l < h.length; l++)
        t.distanceField.push({
          fieldType: h[l].getAttribute("fieldType"),
          distanceRange: parseInt(h[l].getAttribute("distanceRange"), 10)
        });
      return t;
    }, n;
  }()
), XMLStringFormat = (
  /** @class */
  function() {
    function n() {
    }
    return n.test = function(e) {
      if (typeof e == "string" && e.indexOf("<font>") > -1) {
        var t = new globalThis.DOMParser().parseFromString(e, "text/xml");
        return XMLFormat.test(t);
      }
      return !1;
    }, n.parse = function(e) {
      var t = new globalThis.DOMParser().parseFromString(e, "text/xml");
      return XMLFormat.parse(t);
    }, n;
  }()
), formats = [
  TextFormat,
  XMLFormat,
  XMLStringFormat
];
function autoDetectFormat(n) {
  for (var e = 0; e < formats.length; e++)
    if (formats[e].test(n))
      return formats[e];
  return null;
}
function generateFillStyle(n, e, t, r, a, o) {
  var s = t.fill;
  if (Array.isArray(s)) {
    if (s.length === 1)
      return s[0];
  } else return s;
  var u, h = t.dropShadow ? t.dropShadowDistance : 0, l = t.padding || 0, c = n.width / r - h - l * 2, v = n.height / r - h - l * 2, d = s.slice(), g = t.fillGradientStops.slice();
  if (!g.length)
    for (var m = d.length + 1, _ = 1; _ < m; ++_)
      g.push(_ / m);
  if (d.unshift(s[0]), g.unshift(0), d.push(s[s.length - 1]), g.push(1), t.fillGradientType === TEXT_GRADIENT.LINEAR_VERTICAL) {
    u = e.createLinearGradient(c / 2, l, c / 2, v + l);
    for (var y = 0, b = o.fontProperties.fontSize + t.strokeThickness, S = b / v, _ = 0; _ < a.length; _++)
      for (var O = o.lineHeight * _, D = 0; D < d.length; D++) {
        var E = 0;
        typeof g[D] == "number" ? E = g[D] : E = D / d.length;
        var M = O / v + E * S, A = Math.max(y, M);
        A = Math.min(A, 1), u.addColorStop(A, d[D]), y = A;
      }
  } else {
    u = e.createLinearGradient(l, v / 2, c + l, v / 2);
    for (var $ = d.length + 1, B = 1, _ = 0; _ < d.length; _++) {
      var U = void 0;
      typeof g[_] == "number" ? U = g[_] : U = B / $, u.addColorStop(U, d[_]), B++;
    }
  }
  return u;
}
function drawGlyph(n, e, t, r, a, o, s) {
  var u = t.text, h = t.fontProperties;
  e.translate(r, a), e.scale(o, o);
  var l = s.strokeThickness / 2, c = -(s.strokeThickness / 2);
  if (e.font = s.toFontString(), e.lineWidth = s.strokeThickness, e.textBaseline = s.textBaseline, e.lineJoin = s.lineJoin, e.miterLimit = s.miterLimit, e.fillStyle = generateFillStyle(n, e, s, o, [u], t), e.strokeStyle = s.stroke, s.dropShadow) {
    var v = s.dropShadowColor, d = hex2rgb(typeof v == "number" ? v : string2hex(v)), g = s.dropShadowBlur * o, m = s.dropShadowDistance * o;
    e.shadowColor = "rgba(" + d[0] * 255 + "," + d[1] * 255 + "," + d[2] * 255 + "," + s.dropShadowAlpha + ")", e.shadowBlur = g, e.shadowOffsetX = Math.cos(s.dropShadowAngle) * m, e.shadowOffsetY = Math.sin(s.dropShadowAngle) * m;
  } else
    e.shadowColor = "black", e.shadowBlur = 0, e.shadowOffsetX = 0, e.shadowOffsetY = 0;
  s.stroke && s.strokeThickness && e.strokeText(u, l, c + t.lineHeight - h.descent), s.fill && e.fillText(u, l, c + t.lineHeight - h.descent), e.setTransform(1, 0, 0, 1, 0, 0), e.fillStyle = "rgba(0, 0, 0, 0)";
}
function splitTextToCharacters(n) {
  return Array.from ? Array.from(n) : n.split("");
}
function resolveCharacters(n) {
  typeof n == "string" && (n = [n]);
  for (var e = [], t = 0, r = n.length; t < r; t++) {
    var a = n[t];
    if (Array.isArray(a)) {
      if (a.length !== 2)
        throw new Error("[BitmapFont]: Invalid character range length, expecting 2 got " + a.length + ".");
      var o = a[0].charCodeAt(0), s = a[1].charCodeAt(0);
      if (s < o)
        throw new Error("[BitmapFont]: Invalid character range.");
      for (var u = o, h = s; u <= h; u++)
        e.push(String.fromCharCode(u));
    } else
      e.push.apply(e, splitTextToCharacters(a));
  }
  if (e.length === 0)
    throw new Error("[BitmapFont]: Empty set when resolving characters.");
  return e;
}
function extractCharCode(n) {
  return n.codePointAt ? n.codePointAt(0) : n.charCodeAt(0);
}
var BitmapFont = (
  /** @class */
  function() {
    function n(e, t, r) {
      var a, o, s = e.info[0], u = e.common[0], h = e.page[0], l = e.distanceField[0], c = getResolutionOfUrl(h.file), v = {};
      this._ownsTextures = r, this.font = s.face, this.size = s.size, this.lineHeight = u.lineHeight / c, this.chars = {}, this.pageTextures = v;
      for (var d = 0; d < e.page.length; d++) {
        var g = e.page[d], m = g.id, _ = g.file;
        v[m] = t instanceof Array ? t[d] : t[_], l?.fieldType && l.fieldType !== "none" && (v[m].baseTexture.alphaMode = ALPHA_MODES.NO_PREMULTIPLIED_ALPHA, v[m].baseTexture.mipmap = MIPMAP_MODES.OFF);
      }
      for (var d = 0; d < e.char.length; d++) {
        var y = e.char[d], m = y.id, b = y.page, S = e.char[d], O = S.x, D = S.y, E = S.width, M = S.height, A = S.xoffset, $ = S.yoffset, B = S.xadvance;
        O /= c, D /= c, E /= c, M /= c, A /= c, $ /= c, B /= c;
        var U = new Rectangle(O + v[b].frame.x / c, D + v[b].frame.y / c, E, M);
        this.chars[m] = {
          xOffset: A,
          yOffset: $,
          xAdvance: B,
          kerning: {},
          texture: new Texture(v[b].baseTexture, U),
          page: b
        };
      }
      for (var d = 0; d < e.kerning.length; d++) {
        var X = e.kerning[d], G = X.first, K = X.second, tt = X.amount;
        G /= c, K /= c, tt /= c, this.chars[K] && (this.chars[K].kerning[G] = tt);
      }
      this.distanceFieldRange = l?.distanceRange, this.distanceFieldType = (o = (a = l?.fieldType) === null || a === void 0 ? void 0 : a.toLowerCase()) !== null && o !== void 0 ? o : "none";
    }
    return n.prototype.destroy = function() {
      for (var e in this.chars)
        this.chars[e].texture.destroy(), this.chars[e].texture = null;
      for (var e in this.pageTextures)
        this._ownsTextures && this.pageTextures[e].destroy(!0), this.pageTextures[e] = null;
      this.chars = null, this.pageTextures = null;
    }, n.install = function(e, t, r) {
      var a;
      if (e instanceof BitmapFontData)
        a = e;
      else {
        var o = autoDetectFormat(e);
        if (!o)
          throw new Error("Unrecognized data format for font.");
        a = o.parse(e);
      }
      t instanceof Texture && (t = [t]);
      var s = new n(a, t, r);
      return n.available[s.font] = s, s;
    }, n.uninstall = function(e) {
      var t = n.available[e];
      if (!t)
        throw new Error("No font found named '" + e + "'");
      t.destroy(), delete n.available[e];
    }, n.from = function(e, t, r) {
      if (!e)
        throw new Error("[BitmapFont] Property `name` is required.");
      var a = Object.assign({}, n.defaultOptions, r), o = a.chars, s = a.padding, u = a.resolution, h = a.textureWidth, l = a.textureHeight, c = resolveCharacters(o), v = t instanceof TextStyle ? t : new TextStyle(t), d = h, g = new BitmapFontData();
      g.info[0] = {
        face: v.fontFamily,
        size: v.fontSize
      }, g.common[0] = {
        lineHeight: v.fontSize
      };
      for (var m = 0, _ = 0, y, b, S, O = 0, D = [], E = 0; E < c.length; E++) {
        y || (y = settings.ADAPTER.createCanvas(), y.width = h, y.height = l, b = y.getContext("2d"), S = new BaseTexture(y, { resolution: u }), D.push(new Texture(S)), g.page.push({
          id: D.length - 1,
          file: ""
        }));
        var M = c[E], A = TextMetrics.measureText(M, v, !1, y), $ = A.width, B = Math.ceil(A.height), U = Math.ceil((v.fontStyle === "italic" ? 2 : 1) * $);
        if (_ >= l - B * u) {
          if (_ === 0)
            throw new Error("[BitmapFont] textureHeight " + l + "px is too small " + ("(fontFamily: '" + v.fontFamily + "', fontSize: " + v.fontSize + "px, char: '" + M + "')"));
          --E, y = null, b = null, S = null, _ = 0, m = 0, O = 0;
          continue;
        }
        if (O = Math.max(B + A.fontProperties.descent, O), U * u + m >= d) {
          if (m === 0)
            throw new Error("[BitmapFont] textureWidth " + h + "px is too small " + ("(fontFamily: '" + v.fontFamily + "', fontSize: " + v.fontSize + "px, char: '" + M + "')"));
          --E, _ += O * u, _ = Math.ceil(_), m = 0, O = 0;
          continue;
        }
        drawGlyph(y, b, A, m, _, u, v);
        var X = extractCharCode(A.text);
        g.char.push({
          id: X,
          page: D.length - 1,
          x: m / u,
          y: _ / u,
          width: U,
          height: B,
          xoffset: 0,
          yoffset: 0,
          xadvance: Math.ceil($ - (v.dropShadow ? v.dropShadowDistance : 0) - (v.stroke ? v.strokeThickness : 0))
        }), m += (U + 2 * s) * u, m = Math.ceil(m);
      }
      if (!r?.skipKerning)
        for (var E = 0, G = c.length; E < G; E++)
          for (var K = c[E], tt = 0; tt < G; tt++) {
            var Y = c[tt], P = b.measureText(K).width, I = b.measureText(Y).width, T = b.measureText(K + Y).width, C = T - (P + I);
            C && g.kerning.push({
              first: extractCharCode(K),
              second: extractCharCode(Y),
              amount: C
            });
          }
      var R = new n(g, D, !0);
      return n.available[e] !== void 0 && n.uninstall(e), n.available[e] = R, R;
    }, n.ALPHA = [["a", "z"], ["A", "Z"], " "], n.NUMERIC = [["0", "9"]], n.ALPHANUMERIC = [["a", "z"], ["A", "Z"], ["0", "9"], " "], n.ASCII = [[" ", "~"]], n.defaultOptions = {
      resolution: 1,
      textureWidth: 512,
      textureHeight: 512,
      padding: 4,
      chars: n.ALPHANUMERIC
    }, n.available = {}, n;
  }()
), msdfFrag = `// Pixi texture info\r
varying vec2 vTextureCoord;\r
uniform sampler2D uSampler;\r
\r
// Tint\r
uniform vec4 uColor;\r
\r
// on 2D applications fwidth is screenScale / glyphAtlasScale * distanceFieldRange\r
uniform float uFWidth;\r
\r
void main(void) {\r
\r
  // To stack MSDF and SDF we need a non-pre-multiplied-alpha texture.\r
  vec4 texColor = texture2D(uSampler, vTextureCoord);\r
\r
  // MSDF\r
  float median = texColor.r + texColor.g + texColor.b -\r
                  min(texColor.r, min(texColor.g, texColor.b)) -\r
                  max(texColor.r, max(texColor.g, texColor.b));\r
  // SDF\r
  median = min(median, texColor.a);\r
\r
  float screenPxDistance = uFWidth * (median - 0.5);\r
  float alpha = clamp(screenPxDistance + 0.5, 0.0, 1.0);\r
  if (median < 0.01) {\r
    alpha = 0.0;\r
  } else if (median > 0.99) {\r
    alpha = 1.0;\r
  }\r
\r
  // NPM Textures, NPM outputs\r
  gl_FragColor = vec4(uColor.rgb, uColor.a * alpha);\r
\r
}\r
`, msdfVert = `// Mesh material default fragment\r
attribute vec2 aVertexPosition;\r
attribute vec2 aTextureCoord;\r
\r
uniform mat3 projectionMatrix;\r
uniform mat3 translationMatrix;\r
uniform mat3 uTextureMatrix;\r
\r
varying vec2 vTextureCoord;\r
\r
void main(void)\r
{\r
    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\r
\r
    vTextureCoord = (uTextureMatrix * vec3(aTextureCoord, 1.0)).xy;\r
}\r
`, pageMeshDataDefaultPageMeshData = [], pageMeshDataMSDFPageMeshData = [], charRenderDataPool = [];
(function(n) {
  __extends$8(e, n);
  function e(t, r) {
    r === void 0 && (r = {});
    var a = n.call(this) || this;
    a._tint = 16777215;
    var o = Object.assign({}, e.styleDefaults, r), s = o.align, u = o.tint, h = o.maxWidth, l = o.letterSpacing, c = o.fontName, v = o.fontSize;
    if (!BitmapFont.available[c])
      throw new Error('Missing BitmapFont "' + c + '"');
    return a._activePagesMeshData = [], a._textWidth = 0, a._textHeight = 0, a._align = s, a._tint = u, a._font = void 0, a._fontName = c, a._fontSize = v, a.text = t, a._maxWidth = h, a._maxLineHeight = 0, a._letterSpacing = l, a._anchor = new ObservablePoint(function() {
      a.dirty = !0;
    }, a, 0, 0), a._roundPixels = settings.ROUND_PIXELS, a.dirty = !0, a._resolution = settings.RESOLUTION, a._autoResolution = !0, a._textureCache = {}, a;
  }
  return e.prototype.updateText = function() {
    for (var t, r = BitmapFont.available[this._fontName], a = this.fontSize, o = a / r.size, s = new Point(), u = [], h = [], l = [], c = this._text.replace(/(?:\r\n|\r)/g, `
`) || " ", v = splitTextToCharacters(c), d = this._maxWidth * r.size / a, g = r.distanceFieldType === "none" ? pageMeshDataDefaultPageMeshData : pageMeshDataMSDFPageMeshData, m = null, _ = 0, y = 0, b = 0, S = -1, O = 0, D = 0, E = 0, M = 0, A = 0; A < v.length; A++) {
      var $ = v[A], B = extractCharCode($);
      if (/(?:\s)/.test($) && (S = A, O = _, M++), $ === "\r" || $ === `
`) {
        h.push(_), l.push(-1), y = Math.max(y, _), ++b, ++D, s.x = 0, s.y += r.lineHeight, m = null, M = 0;
        continue;
      }
      var U = r.chars[B];
      if (U) {
        m && U.kerning[m] && (s.x += U.kerning[m]);
        var X = charRenderDataPool.pop() || {
          texture: Texture.EMPTY,
          line: 0,
          charCode: 0,
          prevSpaces: 0,
          position: new Point()
        };
        X.texture = U.texture, X.line = b, X.charCode = B, X.position.x = s.x + U.xOffset + this._letterSpacing / 2, X.position.y = s.y + U.yOffset, X.prevSpaces = M, u.push(X), _ = X.position.x + Math.max(U.xAdvance - U.xOffset, U.texture.orig.width), s.x += U.xAdvance + this._letterSpacing, E = Math.max(E, U.yOffset + U.texture.height), m = B, S !== -1 && d > 0 && s.x > d && (++D, removeItems(u, 1 + S - D, 1 + A - S), A = S, S = -1, h.push(O), l.push(u.length > 0 ? u[u.length - 1].prevSpaces : 0), y = Math.max(y, O), b++, s.x = 0, s.y += r.lineHeight, m = null, M = 0);
      }
    }
    var G = v[v.length - 1];
    G !== "\r" && G !== `
` && (/(?:\s)/.test(G) && (_ = O), h.push(_), y = Math.max(y, _), l.push(-1));
    for (var K = [], A = 0; A <= b; A++) {
      var tt = 0;
      this._align === "right" ? tt = y - h[A] : this._align === "center" ? tt = (y - h[A]) / 2 : this._align === "justify" && (tt = l[A] < 0 ? 0 : (y - h[A]) / l[A]), K.push(tt);
    }
    var Y = u.length, P = {}, I = [], T = this._activePagesMeshData;
    g.push.apply(g, T);
    for (var A = 0; A < Y; A++) {
      var C = u[A].texture, R = C.baseTexture.uid;
      if (!P[R]) {
        var w = g.pop();
        if (!w) {
          var N = new MeshGeometry(), L = void 0, F = void 0;
          r.distanceFieldType === "none" ? (L = new MeshMaterial(Texture.EMPTY), F = BLEND_MODES.NORMAL) : (L = new MeshMaterial(Texture.EMPTY, { program: Program.from(msdfVert, msdfFrag), uniforms: { uFWidth: 0 } }), F = BLEND_MODES.NORMAL_NPM);
          var z = new Mesh(N, L);
          z.blendMode = F, w = {
            index: 0,
            indexCount: 0,
            vertexCount: 0,
            uvsCount: 0,
            total: 0,
            mesh: z,
            vertices: null,
            uvs: null,
            indices: null
          };
        }
        w.index = 0, w.indexCount = 0, w.vertexCount = 0, w.uvsCount = 0, w.total = 0;
        var J = this._textureCache;
        J[R] = J[R] || new Texture(C.baseTexture), w.mesh.texture = J[R], w.mesh.tint = this._tint, I.push(w), P[R] = w;
      }
      P[R].total++;
    }
    for (var A = 0; A < T.length; A++)
      I.indexOf(T[A]) === -1 && this.removeChild(T[A].mesh);
    for (var A = 0; A < I.length; A++)
      I[A].mesh.parent !== this && this.addChild(I[A].mesh);
    this._activePagesMeshData = I;
    for (var A in P) {
      var w = P[A], V = w.total;
      if (!(((t = w.indices) === null || t === void 0 ? void 0 : t.length) > 6 * V) || w.vertices.length < Mesh.BATCHABLE_SIZE * 2)
        w.vertices = new Float32Array(4 * 2 * V), w.uvs = new Float32Array(4 * 2 * V), w.indices = new Uint16Array(6 * V);
      else
        for (var Z = w.total, q = w.vertices, W = Z * 4 * 2; W < q.length; W++)
          q[W] = 0;
      w.mesh.size = 6 * V;
    }
    for (var A = 0; A < Y; A++) {
      var $ = u[A], Q = $.position.x + K[$.line] * (this._align === "justify" ? $.prevSpaces : 1);
      this._roundPixels && (Q = Math.round(Q));
      var et = Q * o, st = $.position.y * o, C = $.texture, nt = P[C.baseTexture.uid], it = C.frame, rt = C._uvs, at = nt.index++;
      nt.indices[at * 6 + 0] = 0 + at * 4, nt.indices[at * 6 + 1] = 1 + at * 4, nt.indices[at * 6 + 2] = 2 + at * 4, nt.indices[at * 6 + 3] = 0 + at * 4, nt.indices[at * 6 + 4] = 2 + at * 4, nt.indices[at * 6 + 5] = 3 + at * 4, nt.vertices[at * 8 + 0] = et, nt.vertices[at * 8 + 1] = st, nt.vertices[at * 8 + 2] = et + it.width * o, nt.vertices[at * 8 + 3] = st, nt.vertices[at * 8 + 4] = et + it.width * o, nt.vertices[at * 8 + 5] = st + it.height * o, nt.vertices[at * 8 + 6] = et, nt.vertices[at * 8 + 7] = st + it.height * o, nt.uvs[at * 8 + 0] = rt.x0, nt.uvs[at * 8 + 1] = rt.y0, nt.uvs[at * 8 + 2] = rt.x1, nt.uvs[at * 8 + 3] = rt.y1, nt.uvs[at * 8 + 4] = rt.x2, nt.uvs[at * 8 + 5] = rt.y2, nt.uvs[at * 8 + 6] = rt.x3, nt.uvs[at * 8 + 7] = rt.y3;
    }
    this._textWidth = y * o, this._textHeight = (s.y + r.lineHeight) * o;
    for (var A in P) {
      var w = P[A];
      if (this.anchor.x !== 0 || this.anchor.y !== 0)
        for (var ft = 0, pt = this._textWidth * this.anchor.x, gt = this._textHeight * this.anchor.y, St = 0; St < w.total; St++)
          w.vertices[ft++] -= pt, w.vertices[ft++] -= gt, w.vertices[ft++] -= pt, w.vertices[ft++] -= gt, w.vertices[ft++] -= pt, w.vertices[ft++] -= gt, w.vertices[ft++] -= pt, w.vertices[ft++] -= gt;
      this._maxLineHeight = E * o;
      var xt = w.mesh.geometry.getBuffer("aVertexPosition"), At = w.mesh.geometry.getBuffer("aTextureCoord"), Pt = w.mesh.geometry.getIndex();
      xt.data = w.vertices, At.data = w.uvs, Pt.data = w.indices, xt.update(), At.update(), Pt.update();
    }
    for (var A = 0; A < u.length; A++)
      charRenderDataPool.push(u[A]);
    this._font = r, this.dirty = !1;
  }, e.prototype.updateTransform = function() {
    this.validate(), this.containerUpdateTransform();
  }, e.prototype._render = function(t) {
    this._autoResolution && this._resolution !== t.resolution && (this._resolution = t.resolution, this.dirty = !0);
    var r = BitmapFont.available[this._fontName], a = r.distanceFieldRange, o = r.distanceFieldType, s = r.size;
    if (o !== "none")
      for (var u = this.worldTransform, h = u.a, l = u.b, c = u.c, v = u.d, d = Math.sqrt(h * h + l * l), g = Math.sqrt(c * c + v * v), m = (Math.abs(d) + Math.abs(g)) / 2, _ = this.fontSize / s, y = 0, b = this._activePagesMeshData; y < b.length; y++) {
        var S = b[y];
        S.mesh.shader.uniforms.uFWidth = m * a * _ * this._resolution;
      }
    n.prototype._render.call(this, t);
  }, e.prototype.getLocalBounds = function() {
    return this.validate(), n.prototype.getLocalBounds.call(this);
  }, e.prototype.validate = function() {
    var t = BitmapFont.available[this._fontName];
    if (!t)
      throw new Error('Missing BitmapFont "' + this._fontName + '"');
    this._font !== t && (this.dirty = !0), this.dirty && this.updateText();
  }, Object.defineProperty(e.prototype, "tint", {
    /**
     * The tint of the BitmapText object.
     * @default 0xffffff
     */
    get: function() {
      return this._tint;
    },
    set: function(t) {
      if (this._tint !== t) {
        this._tint = t;
        for (var r = 0; r < this._activePagesMeshData.length; r++)
          this._activePagesMeshData[r].mesh.tint = t;
      }
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(e.prototype, "align", {
    /**
     * The alignment of the BitmapText object.
     * @member {string}
     * @default 'left'
     */
    get: function() {
      return this._align;
    },
    set: function(t) {
      this._align !== t && (this._align = t, this.dirty = !0);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(e.prototype, "fontName", {
    /** The name of the BitmapFont. */
    get: function() {
      return this._fontName;
    },
    set: function(t) {
      if (!BitmapFont.available[t])
        throw new Error('Missing BitmapFont "' + t + '"');
      this._fontName !== t && (this._fontName = t, this.dirty = !0);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(e.prototype, "fontSize", {
    /** The size of the font to display. */
    get: function() {
      var t;
      return (t = this._fontSize) !== null && t !== void 0 ? t : BitmapFont.available[this._fontName].size;
    },
    set: function(t) {
      this._fontSize !== t && (this._fontSize = t, this.dirty = !0);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(e.prototype, "anchor", {
    /**
     * The anchor sets the origin point of the text.
     *
     * The default is `(0,0)`, this means the text's origin is the top left.
     *
     * Setting the anchor to `(0.5,0.5)` means the text's origin is centered.
     *
     * Setting the anchor to `(1,1)` would mean the text's origin point will be the bottom right corner.
     */
    get: function() {
      return this._anchor;
    },
    set: function(t) {
      typeof t == "number" ? this._anchor.set(t) : this._anchor.copyFrom(t);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(e.prototype, "text", {
    /** The text of the BitmapText object. */
    get: function() {
      return this._text;
    },
    set: function(t) {
      t = String(t ?? ""), this._text !== t && (this._text = t, this.dirty = !0);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(e.prototype, "maxWidth", {
    /**
     * The max width of this bitmap text in pixels. If the text provided is longer than the
     * value provided, line breaks will be automatically inserted in the last whitespace.
     * Disable by setting the value to 0.
     */
    get: function() {
      return this._maxWidth;
    },
    set: function(t) {
      this._maxWidth !== t && (this._maxWidth = t, this.dirty = !0);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(e.prototype, "maxLineHeight", {
    /**
     * The max line height. This is useful when trying to use the total height of the Text,
     * i.e. when trying to vertically align.
     * @readonly
     */
    get: function() {
      return this.validate(), this._maxLineHeight;
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(e.prototype, "textWidth", {
    /**
     * The width of the overall text, different from fontSize,
     * which is defined in the style object.
     * @readonly
     */
    get: function() {
      return this.validate(), this._textWidth;
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(e.prototype, "letterSpacing", {
    /** Additional space between characters. */
    get: function() {
      return this._letterSpacing;
    },
    set: function(t) {
      this._letterSpacing !== t && (this._letterSpacing = t, this.dirty = !0);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(e.prototype, "roundPixels", {
    /**
     * If true PixiJS will Math.floor() x/y values when rendering, stopping pixel interpolation.
     * Advantages can include sharper image quality (like text) and faster rendering on canvas.
     * The main disadvantage is movement of objects may appear less smooth.
     * To set the global default, change {@link PIXI.settings.ROUND_PIXELS}
     * @default PIXI.settings.ROUND_PIXELS
     */
    get: function() {
      return this._roundPixels;
    },
    set: function(t) {
      t !== this._roundPixels && (this._roundPixels = t, this.dirty = !0);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(e.prototype, "textHeight", {
    /**
     * The height of the overall text, different from fontSize,
     * which is defined in the style object.
     * @readonly
     */
    get: function() {
      return this.validate(), this._textHeight;
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(e.prototype, "resolution", {
    /**
     * The resolution / device pixel ratio of the canvas.
     *
     * This is set to automatically match the renderer resolution by default, but can be overridden by setting manually.
     * @default 1
     */
    get: function() {
      return this._resolution;
    },
    set: function(t) {
      this._autoResolution = !1, this._resolution !== t && (this._resolution = t, this.dirty = !0);
    },
    enumerable: !1,
    configurable: !0
  }), e.prototype.destroy = function(t) {
    var r = this._textureCache, a = BitmapFont.available[this._fontName], o = a.distanceFieldType === "none" ? pageMeshDataDefaultPageMeshData : pageMeshDataMSDFPageMeshData;
    o.push.apply(o, this._activePagesMeshData);
    for (var s = 0, u = this._activePagesMeshData; s < u.length; s++) {
      var h = u[s];
      this.removeChild(h.mesh);
    }
    this._activePagesMeshData = [], o.filter(function(v) {
      return r[v.mesh.texture.baseTexture.uid];
    }).forEach(function(v) {
      v.mesh.texture = Texture.EMPTY;
    });
    for (var l in r) {
      var c = r[l];
      c.destroy(), delete r[l];
    }
    this._font = null, this._textureCache = null, n.prototype.destroy.call(this, t);
  }, e.styleDefaults = {
    align: "left",
    tint: 16777215,
    maxWidth: 0,
    letterSpacing: 0
  }, e;
})(Container);
var BitmapFontLoader = (
  /** @class */
  function() {
    function n() {
    }
    return n.add = function() {
      LoaderResource.setExtensionXhrType("fnt", LoaderResource.XHR_RESPONSE_TYPE.TEXT);
    }, n.use = function(e, t) {
      var r = autoDetectFormat(e.data);
      if (!r) {
        t();
        return;
      }
      for (var a = n.getBaseUrl(this, e), o = r.parse(e.data), s = {}, u = function(_) {
        s[_.metadata.pageFile] = _.texture, Object.keys(s).length === o.page.length && (e.bitmapFont = BitmapFont.install(o, s, !0), t());
      }, h = 0; h < o.page.length; ++h) {
        var l = o.page[h].file, c = a + l, v = !1;
        for (var d in this.resources) {
          var g = this.resources[d];
          if (g.url === c) {
            g.metadata.pageFile = l, g.texture ? u(g) : g.onAfterMiddleware.add(u), v = !0;
            break;
          }
        }
        if (!v) {
          var m = {
            crossOrigin: e.crossOrigin,
            loadType: LoaderResource.LOAD_TYPE.IMAGE,
            metadata: Object.assign({ pageFile: l }, e.metadata.imageMetadata),
            parentResource: e
          };
          this.add(c, m, u);
        }
      }
    }, n.getBaseUrl = function(e, t) {
      var r = t.isDataUrl ? "" : n.dirname(t.url);
      return t.isDataUrl && (r === "." && (r = ""), e.baseUrl && r && e.baseUrl.charAt(e.baseUrl.length - 1) === "/" && (r += "/")), r = r.replace(e.baseUrl, ""), r && r.charAt(r.length - 1) !== "/" && (r += "/"), r;
    }, n.dirname = function(e) {
      var t = e.replace(/\\/g, "/").replace(/\/$/, "").replace(/\/[^\/]*$/, "");
      return t === e ? "." : t === "" ? "/" : t;
    }, n.extension = ExtensionType.Loader, n;
  }()
);
var extendStatics$7 = function(n, e) {
  return extendStatics$7 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, r) {
    t.__proto__ = r;
  } || function(t, r) {
    for (var a in r)
      r.hasOwnProperty(a) && (t[a] = r[a]);
  }, extendStatics$7(n, e);
};
function __extends$7(n, e) {
  extendStatics$7(n, e);
  function t() {
    this.constructor = n;
  }
  n.prototype = e === null ? Object.create(e) : (t.prototype = e.prototype, new t());
}
var fragment$4 = `varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform float uAlpha;

void main(void)
{
   gl_FragColor = texture2D(uSampler, vTextureCoord) * uAlpha;
}
`;
(function(n) {
  __extends$7(e, n);
  function e(t) {
    t === void 0 && (t = 1);
    var r = n.call(this, defaultVertex$1, fragment$4, { uAlpha: 1 }) || this;
    return r.alpha = t, r;
  }
  return Object.defineProperty(e.prototype, "alpha", {
    /**
     * Coefficient for alpha multiplication
     * @default 1
     */
    get: function() {
      return this.uniforms.uAlpha;
    },
    set: function(t) {
      this.uniforms.uAlpha = t;
    },
    enumerable: !1,
    configurable: !0
  }), e;
})(Filter);
var extendStatics$6 = function(n, e) {
  return extendStatics$6 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, r) {
    t.__proto__ = r;
  } || function(t, r) {
    for (var a in r)
      r.hasOwnProperty(a) && (t[a] = r[a]);
  }, extendStatics$6(n, e);
};
function __extends$6(n, e) {
  extendStatics$6(n, e);
  function t() {
    this.constructor = n;
  }
  n.prototype = e === null ? Object.create(e) : (t.prototype = e.prototype, new t());
}
var vertTemplate = `
    attribute vec2 aVertexPosition;

    uniform mat3 projectionMatrix;

    uniform float strength;

    varying vec2 vBlurTexCoords[%size%];

    uniform vec4 inputSize;
    uniform vec4 outputFrame;

    vec4 filterVertexPosition( void )
    {
        vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;

        return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);
    }

    vec2 filterTextureCoord( void )
    {
        return aVertexPosition * (outputFrame.zw * inputSize.zw);
    }

    void main(void)
    {
        gl_Position = filterVertexPosition();

        vec2 textureCoord = filterTextureCoord();
        %blur%
    }`;
function generateBlurVertSource(n, e) {
  var t = Math.ceil(n / 2), r = vertTemplate, a = "", o;
  e ? o = "vBlurTexCoords[%index%] =  textureCoord + vec2(%sampleIndex% * strength, 0.0);" : o = "vBlurTexCoords[%index%] =  textureCoord + vec2(0.0, %sampleIndex% * strength);";
  for (var s = 0; s < n; s++) {
    var u = o.replace("%index%", s.toString());
    u = u.replace("%sampleIndex%", s - (t - 1) + ".0"), a += u, a += `
`;
  }
  return r = r.replace("%blur%", a), r = r.replace("%size%", n.toString()), r;
}
var GAUSSIAN_VALUES = {
  5: [0.153388, 0.221461, 0.250301],
  7: [0.071303, 0.131514, 0.189879, 0.214607],
  9: [0.028532, 0.067234, 0.124009, 0.179044, 0.20236],
  11: [93e-4, 0.028002, 0.065984, 0.121703, 0.175713, 0.198596],
  13: [2406e-6, 9255e-6, 0.027867, 0.065666, 0.121117, 0.174868, 0.197641],
  15: [489e-6, 2403e-6, 9246e-6, 0.02784, 0.065602, 0.120999, 0.174697, 0.197448]
}, fragTemplate = [
  "varying vec2 vBlurTexCoords[%size%];",
  "uniform sampler2D uSampler;",
  "void main(void)",
  "{",
  "    gl_FragColor = vec4(0.0);",
  "    %blur%",
  "}"
].join(`
`);
function generateBlurFragSource(n) {
  for (var e = GAUSSIAN_VALUES[n], t = e.length, r = fragTemplate, a = "", o = "gl_FragColor += texture2D(uSampler, vBlurTexCoords[%index%]) * %value%;", s, u = 0; u < n; u++) {
    var h = o.replace("%index%", u.toString());
    s = u, u >= t && (s = n - u - 1), h = h.replace("%value%", e[s].toString()), a += h, a += `
`;
  }
  return r = r.replace("%blur%", a), r = r.replace("%size%", n.toString()), r;
}
var BlurFilterPass = (
  /** @class */
  function(n) {
    __extends$6(e, n);
    function e(t, r, a, o, s) {
      r === void 0 && (r = 8), a === void 0 && (a = 4), o === void 0 && (o = settings.FILTER_RESOLUTION), s === void 0 && (s = 5);
      var u = this, h = generateBlurVertSource(s, t), l = generateBlurFragSource(s);
      return u = n.call(
        this,
        // vertex shader
        h,
        // fragment shader
        l
      ) || this, u.horizontal = t, u.resolution = o, u._quality = 0, u.quality = a, u.blur = r, u;
    }
    return e.prototype.apply = function(t, r, a, o) {
      if (a ? this.horizontal ? this.uniforms.strength = 1 / a.width * (a.width / r.width) : this.uniforms.strength = 1 / a.height * (a.height / r.height) : this.horizontal ? this.uniforms.strength = 1 / t.renderer.width * (t.renderer.width / r.width) : this.uniforms.strength = 1 / t.renderer.height * (t.renderer.height / r.height), this.uniforms.strength *= this.strength, this.uniforms.strength /= this.passes, this.passes === 1)
        t.applyFilter(this, r, a, o);
      else {
        var s = t.getFilterTexture(), u = t.renderer, h = r, l = s;
        this.state.blend = !1, t.applyFilter(this, h, l, CLEAR_MODES.CLEAR);
        for (var c = 1; c < this.passes - 1; c++) {
          t.bindAndClear(h, CLEAR_MODES.BLIT), this.uniforms.uSampler = l;
          var v = l;
          l = h, h = v, u.shader.bind(this), u.geometry.draw(5);
        }
        this.state.blend = !0, t.applyFilter(this, l, a, o), t.returnFilterTexture(s);
      }
    }, Object.defineProperty(e.prototype, "blur", {
      /**
       * Sets the strength of both the blur.
       * @default 16
       */
      get: function() {
        return this.strength;
      },
      set: function(t) {
        this.padding = 1 + Math.abs(t) * 2, this.strength = t;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "quality", {
      /**
       * Sets the quality of the blur by modifying the number of passes. More passes means higher
       * quality bluring but the lower the performance.
       * @default 4
       */
      get: function() {
        return this._quality;
      },
      set: function(t) {
        this._quality = t, this.passes = t;
      },
      enumerable: !1,
      configurable: !0
    }), e;
  }(Filter)
), BlurFilter$1 = (
  /** @class */
  function(n) {
    __extends$6(e, n);
    function e(t, r, a, o) {
      t === void 0 && (t = 8), r === void 0 && (r = 4), a === void 0 && (a = settings.FILTER_RESOLUTION), o === void 0 && (o = 5);
      var s = n.call(this) || this;
      return s.blurXFilter = new BlurFilterPass(!0, t, r, a, o), s.blurYFilter = new BlurFilterPass(!1, t, r, a, o), s.resolution = a, s.quality = r, s.blur = t, s.repeatEdgePixels = !1, s;
    }
    return e.prototype.apply = function(t, r, a, o) {
      var s = Math.abs(this.blurXFilter.strength), u = Math.abs(this.blurYFilter.strength);
      if (s && u) {
        var h = t.getFilterTexture();
        this.blurXFilter.apply(t, r, h, CLEAR_MODES.CLEAR), this.blurYFilter.apply(t, h, a, o), t.returnFilterTexture(h);
      } else u ? this.blurYFilter.apply(t, r, a, o) : this.blurXFilter.apply(t, r, a, o);
    }, e.prototype.updatePadding = function() {
      this._repeatEdgePixels ? this.padding = 0 : this.padding = Math.max(Math.abs(this.blurXFilter.strength), Math.abs(this.blurYFilter.strength)) * 2;
    }, Object.defineProperty(e.prototype, "blur", {
      /**
       * Sets the strength of both the blurX and blurY properties simultaneously
       * @default 2
       */
      get: function() {
        return this.blurXFilter.blur;
      },
      set: function(t) {
        this.blurXFilter.blur = this.blurYFilter.blur = t, this.updatePadding();
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "quality", {
      /**
       * Sets the number of passes for blur. More passes means higher quality bluring.
       * @default 1
       */
      get: function() {
        return this.blurXFilter.quality;
      },
      set: function(t) {
        this.blurXFilter.quality = this.blurYFilter.quality = t;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "blurX", {
      /**
       * Sets the strength of the blurX property
       * @default 2
       */
      get: function() {
        return this.blurXFilter.blur;
      },
      set: function(t) {
        this.blurXFilter.blur = t, this.updatePadding();
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "blurY", {
      /**
       * Sets the strength of the blurY property
       * @default 2
       */
      get: function() {
        return this.blurYFilter.blur;
      },
      set: function(t) {
        this.blurYFilter.blur = t, this.updatePadding();
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "blendMode", {
      /**
       * Sets the blendmode of the filter
       * @default PIXI.BLEND_MODES.NORMAL
       */
      get: function() {
        return this.blurYFilter.blendMode;
      },
      set: function(t) {
        this.blurYFilter.blendMode = t;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "repeatEdgePixels", {
      /**
       * If set to true the edge of the target will be clamped
       * @default false
       */
      get: function() {
        return this._repeatEdgePixels;
      },
      set: function(t) {
        this._repeatEdgePixels = t, this.updatePadding();
      },
      enumerable: !1,
      configurable: !0
    }), e;
  }(Filter)
);
var extendStatics$5 = function(n, e) {
  return extendStatics$5 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, r) {
    t.__proto__ = r;
  } || function(t, r) {
    for (var a in r)
      r.hasOwnProperty(a) && (t[a] = r[a]);
  }, extendStatics$5(n, e);
};
function __extends$5(n, e) {
  extendStatics$5(n, e);
  function t() {
    this.constructor = n;
  }
  n.prototype = e === null ? Object.create(e) : (t.prototype = e.prototype, new t());
}
var fragment$3 = `varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float m[20];
uniform float uAlpha;

void main(void)
{
    vec4 c = texture2D(uSampler, vTextureCoord);

    if (uAlpha == 0.0) {
        gl_FragColor = c;
        return;
    }

    // Un-premultiply alpha before applying the color matrix. See issue #3539.
    if (c.a > 0.0) {
      c.rgb /= c.a;
    }

    vec4 result;

    result.r = (m[0] * c.r);
        result.r += (m[1] * c.g);
        result.r += (m[2] * c.b);
        result.r += (m[3] * c.a);
        result.r += m[4];

    result.g = (m[5] * c.r);
        result.g += (m[6] * c.g);
        result.g += (m[7] * c.b);
        result.g += (m[8] * c.a);
        result.g += m[9];

    result.b = (m[10] * c.r);
       result.b += (m[11] * c.g);
       result.b += (m[12] * c.b);
       result.b += (m[13] * c.a);
       result.b += m[14];

    result.a = (m[15] * c.r);
       result.a += (m[16] * c.g);
       result.a += (m[17] * c.b);
       result.a += (m[18] * c.a);
       result.a += m[19];

    vec3 rgb = mix(c.rgb, result.rgb, uAlpha);

    // Premultiply alpha again.
    rgb *= result.a;

    gl_FragColor = vec4(rgb, result.a);
}
`, ColorMatrixFilter$1 = (
  /** @class */
  function(n) {
    __extends$5(e, n);
    function e() {
      var t = this, r = {
        m: new Float32Array([
          1,
          0,
          0,
          0,
          0,
          0,
          1,
          0,
          0,
          0,
          0,
          0,
          1,
          0,
          0,
          0,
          0,
          0,
          1,
          0
        ]),
        uAlpha: 1
      };
      return t = n.call(this, defaultFilterVertex, fragment$3, r) || this, t.alpha = 1, t;
    }
    return e.prototype._loadMatrix = function(t, r) {
      r === void 0 && (r = !1);
      var a = t;
      r && (this._multiply(a, this.uniforms.m, t), a = this._colorMatrix(a)), this.uniforms.m = a;
    }, e.prototype._multiply = function(t, r, a) {
      return t[0] = r[0] * a[0] + r[1] * a[5] + r[2] * a[10] + r[3] * a[15], t[1] = r[0] * a[1] + r[1] * a[6] + r[2] * a[11] + r[3] * a[16], t[2] = r[0] * a[2] + r[1] * a[7] + r[2] * a[12] + r[3] * a[17], t[3] = r[0] * a[3] + r[1] * a[8] + r[2] * a[13] + r[3] * a[18], t[4] = r[0] * a[4] + r[1] * a[9] + r[2] * a[14] + r[3] * a[19] + r[4], t[5] = r[5] * a[0] + r[6] * a[5] + r[7] * a[10] + r[8] * a[15], t[6] = r[5] * a[1] + r[6] * a[6] + r[7] * a[11] + r[8] * a[16], t[7] = r[5] * a[2] + r[6] * a[7] + r[7] * a[12] + r[8] * a[17], t[8] = r[5] * a[3] + r[6] * a[8] + r[7] * a[13] + r[8] * a[18], t[9] = r[5] * a[4] + r[6] * a[9] + r[7] * a[14] + r[8] * a[19] + r[9], t[10] = r[10] * a[0] + r[11] * a[5] + r[12] * a[10] + r[13] * a[15], t[11] = r[10] * a[1] + r[11] * a[6] + r[12] * a[11] + r[13] * a[16], t[12] = r[10] * a[2] + r[11] * a[7] + r[12] * a[12] + r[13] * a[17], t[13] = r[10] * a[3] + r[11] * a[8] + r[12] * a[13] + r[13] * a[18], t[14] = r[10] * a[4] + r[11] * a[9] + r[12] * a[14] + r[13] * a[19] + r[14], t[15] = r[15] * a[0] + r[16] * a[5] + r[17] * a[10] + r[18] * a[15], t[16] = r[15] * a[1] + r[16] * a[6] + r[17] * a[11] + r[18] * a[16], t[17] = r[15] * a[2] + r[16] * a[7] + r[17] * a[12] + r[18] * a[17], t[18] = r[15] * a[3] + r[16] * a[8] + r[17] * a[13] + r[18] * a[18], t[19] = r[15] * a[4] + r[16] * a[9] + r[17] * a[14] + r[18] * a[19] + r[19], t;
    }, e.prototype._colorMatrix = function(t) {
      var r = new Float32Array(t);
      return r[4] /= 255, r[9] /= 255, r[14] /= 255, r[19] /= 255, r;
    }, e.prototype.brightness = function(t, r) {
      var a = [
        t,
        0,
        0,
        0,
        0,
        0,
        t,
        0,
        0,
        0,
        0,
        0,
        t,
        0,
        0,
        0,
        0,
        0,
        1,
        0
      ];
      this._loadMatrix(a, r);
    }, e.prototype.tint = function(t, r) {
      var a = t >> 16 & 255, o = t >> 8 & 255, s = t & 255, u = [
        a / 255,
        0,
        0,
        0,
        0,
        0,
        o / 255,
        0,
        0,
        0,
        0,
        0,
        s / 255,
        0,
        0,
        0,
        0,
        0,
        1,
        0
      ];
      this._loadMatrix(u, r);
    }, e.prototype.greyscale = function(t, r) {
      var a = [
        t,
        t,
        t,
        0,
        0,
        t,
        t,
        t,
        0,
        0,
        t,
        t,
        t,
        0,
        0,
        0,
        0,
        0,
        1,
        0
      ];
      this._loadMatrix(a, r);
    }, e.prototype.blackAndWhite = function(t) {
      var r = [
        0.3,
        0.6,
        0.1,
        0,
        0,
        0.3,
        0.6,
        0.1,
        0,
        0,
        0.3,
        0.6,
        0.1,
        0,
        0,
        0,
        0,
        0,
        1,
        0
      ];
      this._loadMatrix(r, t);
    }, e.prototype.hue = function(t, r) {
      t = (t || 0) / 180 * Math.PI;
      var a = Math.cos(t), o = Math.sin(t), s = Math.sqrt, u = 1 / 3, h = s(u), l = a + (1 - a) * u, c = u * (1 - a) - h * o, v = u * (1 - a) + h * o, d = u * (1 - a) + h * o, g = a + u * (1 - a), m = u * (1 - a) - h * o, _ = u * (1 - a) - h * o, y = u * (1 - a) + h * o, b = a + u * (1 - a), S = [
        l,
        c,
        v,
        0,
        0,
        d,
        g,
        m,
        0,
        0,
        _,
        y,
        b,
        0,
        0,
        0,
        0,
        0,
        1,
        0
      ];
      this._loadMatrix(S, r);
    }, e.prototype.contrast = function(t, r) {
      var a = (t || 0) + 1, o = -0.5 * (a - 1), s = [
        a,
        0,
        0,
        0,
        o,
        0,
        a,
        0,
        0,
        o,
        0,
        0,
        a,
        0,
        o,
        0,
        0,
        0,
        1,
        0
      ];
      this._loadMatrix(s, r);
    }, e.prototype.saturate = function(t, r) {
      t === void 0 && (t = 0);
      var a = t * 2 / 3 + 1, o = (a - 1) * -0.5, s = [
        a,
        o,
        o,
        0,
        0,
        o,
        a,
        o,
        0,
        0,
        o,
        o,
        a,
        0,
        0,
        0,
        0,
        0,
        1,
        0
      ];
      this._loadMatrix(s, r);
    }, e.prototype.desaturate = function() {
      this.saturate(-1);
    }, e.prototype.negative = function(t) {
      var r = [
        -1,
        0,
        0,
        1,
        0,
        0,
        -1,
        0,
        1,
        0,
        0,
        0,
        -1,
        1,
        0,
        0,
        0,
        0,
        1,
        0
      ];
      this._loadMatrix(r, t);
    }, e.prototype.sepia = function(t) {
      var r = [
        0.393,
        0.7689999,
        0.18899999,
        0,
        0,
        0.349,
        0.6859999,
        0.16799999,
        0,
        0,
        0.272,
        0.5339999,
        0.13099999,
        0,
        0,
        0,
        0,
        0,
        1,
        0
      ];
      this._loadMatrix(r, t);
    }, e.prototype.technicolor = function(t) {
      var r = [
        1.9125277891456083,
        -0.8545344976951645,
        -0.09155508482755585,
        0,
        11.793603434377337,
        -0.3087833385928097,
        1.7658908555458428,
        -0.10601743074722245,
        0,
        -70.35205161461398,
        -0.231103377548616,
        -0.7501899197440212,
        1.847597816108189,
        0,
        30.950940869491138,
        0,
        0,
        0,
        1,
        0
      ];
      this._loadMatrix(r, t);
    }, e.prototype.polaroid = function(t) {
      var r = [
        1.438,
        -0.062,
        -0.062,
        0,
        0,
        -0.122,
        1.378,
        -0.122,
        0,
        0,
        -0.016,
        -0.016,
        1.483,
        0,
        0,
        0,
        0,
        0,
        1,
        0
      ];
      this._loadMatrix(r, t);
    }, e.prototype.toBGR = function(t) {
      var r = [
        0,
        0,
        1,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        0
      ];
      this._loadMatrix(r, t);
    }, e.prototype.kodachrome = function(t) {
      var r = [
        1.1285582396593525,
        -0.3967382283601348,
        -0.03992559172921793,
        0,
        63.72958762196502,
        -0.16404339962244616,
        1.0835251566291304,
        -0.05498805115633132,
        0,
        24.732407896706203,
        -0.16786010706155763,
        -0.5603416277695248,
        1.6014850761964943,
        0,
        35.62982807460946,
        0,
        0,
        0,
        1,
        0
      ];
      this._loadMatrix(r, t);
    }, e.prototype.browni = function(t) {
      var r = [
        0.5997023498159715,
        0.34553243048391263,
        -0.2708298674538042,
        0,
        47.43192855600873,
        -0.037703249837783157,
        0.8609577587992641,
        0.15059552388459913,
        0,
        -36.96841498319127,
        0.24113635128153335,
        -0.07441037908422492,
        0.44972182064877153,
        0,
        -7.562075277591283,
        0,
        0,
        0,
        1,
        0
      ];
      this._loadMatrix(r, t);
    }, e.prototype.vintage = function(t) {
      var r = [
        0.6279345635605994,
        0.3202183420819367,
        -0.03965408211312453,
        0,
        9.651285835294123,
        0.02578397704808868,
        0.6441188644374771,
        0.03259127616149294,
        0,
        7.462829176470591,
        0.0466055556782719,
        -0.0851232987247891,
        0.5241648018700465,
        0,
        5.159190588235296,
        0,
        0,
        0,
        1,
        0
      ];
      this._loadMatrix(r, t);
    }, e.prototype.colorTone = function(t, r, a, o, s) {
      t = t || 0.2, r = r || 0.15, a = a || 16770432, o = o || 3375104;
      var u = (a >> 16 & 255) / 255, h = (a >> 8 & 255) / 255, l = (a & 255) / 255, c = (o >> 16 & 255) / 255, v = (o >> 8 & 255) / 255, d = (o & 255) / 255, g = [
        0.3,
        0.59,
        0.11,
        0,
        0,
        u,
        h,
        l,
        t,
        0,
        c,
        v,
        d,
        r,
        0,
        u - c,
        h - v,
        l - d,
        0,
        0
      ];
      this._loadMatrix(g, s);
    }, e.prototype.night = function(t, r) {
      t = t || 0.1;
      var a = [
        t * -2,
        -t,
        0,
        0,
        0,
        -t,
        0,
        t,
        0,
        0,
        0,
        t,
        t * 2,
        0,
        0,
        0,
        0,
        0,
        1,
        0
      ];
      this._loadMatrix(a, r);
    }, e.prototype.predator = function(t, r) {
      var a = [
        // row 1
        11.224130630493164 * t,
        -4.794486999511719 * t,
        -2.8746118545532227 * t,
        0 * t,
        0.40342438220977783 * t,
        // row 2
        -3.6330697536468506 * t,
        9.193157196044922 * t,
        -2.951810836791992 * t,
        0 * t,
        -1.316135048866272 * t,
        // row 3
        -3.2184197902679443 * t,
        -4.2375030517578125 * t,
        7.476448059082031 * t,
        0 * t,
        0.8044459223747253 * t,
        // row 4
        0,
        0,
        0,
        1,
        0
      ];
      this._loadMatrix(a, r);
    }, e.prototype.lsd = function(t) {
      var r = [
        2,
        -0.4,
        0.5,
        0,
        0,
        -0.5,
        2,
        -0.4,
        0,
        0,
        -0.4,
        -0.5,
        3,
        0,
        0,
        0,
        0,
        0,
        1,
        0
      ];
      this._loadMatrix(r, t);
    }, e.prototype.reset = function() {
      var t = [
        1,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        1,
        0
      ];
      this._loadMatrix(t, !1);
    }, Object.defineProperty(e.prototype, "matrix", {
      /**
       * The matrix of the color matrix filter
       * @member {number[]}
       * @default [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0]
       */
      get: function() {
        return this.uniforms.m;
      },
      set: function(t) {
        this.uniforms.m = t;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "alpha", {
      /**
       * The opacity value to use when mixing the original and resultant colors.
       *
       * When the value is 0, the original color is used without modification.
       * When the value is 1, the result color is used.
       * When in the range (0, 1) the color is interpolated between the original and result by this amount.
       * @default 1
       */
      get: function() {
        return this.uniforms.uAlpha;
      },
      set: function(t) {
        this.uniforms.uAlpha = t;
      },
      enumerable: !1,
      configurable: !0
    }), e;
  }(Filter)
);
ColorMatrixFilter$1.prototype.grayscale = ColorMatrixFilter$1.prototype.greyscale;
var extendStatics$4 = function(n, e) {
  return extendStatics$4 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, r) {
    t.__proto__ = r;
  } || function(t, r) {
    for (var a in r)
      r.hasOwnProperty(a) && (t[a] = r[a]);
  }, extendStatics$4(n, e);
};
function __extends$4(n, e) {
  extendStatics$4(n, e);
  function t() {
    this.constructor = n;
  }
  n.prototype = e === null ? Object.create(e) : (t.prototype = e.prototype, new t());
}
var fragment$2 = `varying vec2 vFilterCoord;
varying vec2 vTextureCoord;

uniform vec2 scale;
uniform mat2 rotation;
uniform sampler2D uSampler;
uniform sampler2D mapSampler;

uniform highp vec4 inputSize;
uniform vec4 inputClamp;

void main(void)
{
  vec4 map =  texture2D(mapSampler, vFilterCoord);

  map -= 0.5;
  map.xy = scale * inputSize.zw * (rotation * map.xy);

  gl_FragColor = texture2D(uSampler, clamp(vec2(vTextureCoord.x + map.x, vTextureCoord.y + map.y), inputClamp.xy, inputClamp.zw));
}
`, vertex$1 = `attribute vec2 aVertexPosition;

uniform mat3 projectionMatrix;
uniform mat3 filterMatrix;

varying vec2 vTextureCoord;
varying vec2 vFilterCoord;

uniform vec4 inputSize;
uniform vec4 outputFrame;

vec4 filterVertexPosition( void )
{
    vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;

    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);
}

vec2 filterTextureCoord( void )
{
    return aVertexPosition * (outputFrame.zw * inputSize.zw);
}

void main(void)
{
	gl_Position = filterVertexPosition();
	vTextureCoord = filterTextureCoord();
	vFilterCoord = ( filterMatrix * vec3( vTextureCoord, 1.0)  ).xy;
}
`;
(function(n) {
  __extends$4(e, n);
  function e(t, r) {
    var a = this, o = new Matrix();
    return t.renderable = !1, a = n.call(this, vertex$1, fragment$2, {
      mapSampler: t._texture,
      filterMatrix: o,
      scale: { x: 1, y: 1 },
      rotation: new Float32Array([1, 0, 0, 1])
    }) || this, a.maskSprite = t, a.maskMatrix = o, r == null && (r = 20), a.scale = new Point(r, r), a;
  }
  return e.prototype.apply = function(t, r, a, o) {
    this.uniforms.filterMatrix = t.calculateSpriteMatrix(this.maskMatrix, this.maskSprite), this.uniforms.scale.x = this.scale.x, this.uniforms.scale.y = this.scale.y;
    var s = this.maskSprite.worldTransform, u = Math.sqrt(s.a * s.a + s.b * s.b), h = Math.sqrt(s.c * s.c + s.d * s.d);
    u !== 0 && h !== 0 && (this.uniforms.rotation[0] = s.a / u, this.uniforms.rotation[1] = s.b / u, this.uniforms.rotation[2] = s.c / h, this.uniforms.rotation[3] = s.d / h), t.applyFilter(this, r, a, o);
  }, Object.defineProperty(e.prototype, "map", {
    /** The texture used for the displacement map. Must be power of 2 sized texture. */
    get: function() {
      return this.uniforms.mapSampler;
    },
    set: function(t) {
      this.uniforms.mapSampler = t;
    },
    enumerable: !1,
    configurable: !0
  }), e;
})(Filter);
var extendStatics$3 = function(n, e) {
  return extendStatics$3 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, r) {
    t.__proto__ = r;
  } || function(t, r) {
    for (var a in r)
      r.hasOwnProperty(a) && (t[a] = r[a]);
  }, extendStatics$3(n, e);
};
function __extends$3(n, e) {
  extendStatics$3(n, e);
  function t() {
    this.constructor = n;
  }
  n.prototype = e === null ? Object.create(e) : (t.prototype = e.prototype, new t());
}
var vertex = `
attribute vec2 aVertexPosition;

uniform mat3 projectionMatrix;

varying vec2 v_rgbNW;
varying vec2 v_rgbNE;
varying vec2 v_rgbSW;
varying vec2 v_rgbSE;
varying vec2 v_rgbM;

varying vec2 vFragCoord;

uniform vec4 inputSize;
uniform vec4 outputFrame;

vec4 filterVertexPosition( void )
{
    vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;

    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);
}

void texcoords(vec2 fragCoord, vec2 inverseVP,
               out vec2 v_rgbNW, out vec2 v_rgbNE,
               out vec2 v_rgbSW, out vec2 v_rgbSE,
               out vec2 v_rgbM) {
    v_rgbNW = (fragCoord + vec2(-1.0, -1.0)) * inverseVP;
    v_rgbNE = (fragCoord + vec2(1.0, -1.0)) * inverseVP;
    v_rgbSW = (fragCoord + vec2(-1.0, 1.0)) * inverseVP;
    v_rgbSE = (fragCoord + vec2(1.0, 1.0)) * inverseVP;
    v_rgbM = vec2(fragCoord * inverseVP);
}

void main(void) {

   gl_Position = filterVertexPosition();

   vFragCoord = aVertexPosition * outputFrame.zw;

   texcoords(vFragCoord, inputSize.zw, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);
}
`, fragment$1 = `varying vec2 v_rgbNW;
varying vec2 v_rgbNE;
varying vec2 v_rgbSW;
varying vec2 v_rgbSE;
varying vec2 v_rgbM;

varying vec2 vFragCoord;
uniform sampler2D uSampler;
uniform highp vec4 inputSize;


/**
 Basic FXAA implementation based on the code on geeks3d.com with the
 modification that the texture2DLod stuff was removed since it's
 unsupported by WebGL.

 --

 From:
 https://github.com/mitsuhiko/webgl-meincraft

 Copyright (c) 2011 by Armin Ronacher.

 Some rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are
 met:

 * Redistributions of source code must retain the above copyright
 notice, this list of conditions and the following disclaimer.

 * Redistributions in binary form must reproduce the above
 copyright notice, this list of conditions and the following
 disclaimer in the documentation and/or other materials provided
 with the distribution.

 * The names of the contributors may not be used to endorse or
 promote products derived from this software without specific
 prior written permission.

 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

#ifndef FXAA_REDUCE_MIN
#define FXAA_REDUCE_MIN   (1.0/ 128.0)
#endif
#ifndef FXAA_REDUCE_MUL
#define FXAA_REDUCE_MUL   (1.0 / 8.0)
#endif
#ifndef FXAA_SPAN_MAX
#define FXAA_SPAN_MAX     8.0
#endif

//optimized version for mobile, where dependent
//texture reads can be a bottleneck
vec4 fxaa(sampler2D tex, vec2 fragCoord, vec2 inverseVP,
          vec2 v_rgbNW, vec2 v_rgbNE,
          vec2 v_rgbSW, vec2 v_rgbSE,
          vec2 v_rgbM) {
    vec4 color;
    vec3 rgbNW = texture2D(tex, v_rgbNW).xyz;
    vec3 rgbNE = texture2D(tex, v_rgbNE).xyz;
    vec3 rgbSW = texture2D(tex, v_rgbSW).xyz;
    vec3 rgbSE = texture2D(tex, v_rgbSE).xyz;
    vec4 texColor = texture2D(tex, v_rgbM);
    vec3 rgbM  = texColor.xyz;
    vec3 luma = vec3(0.299, 0.587, 0.114);
    float lumaNW = dot(rgbNW, luma);
    float lumaNE = dot(rgbNE, luma);
    float lumaSW = dot(rgbSW, luma);
    float lumaSE = dot(rgbSE, luma);
    float lumaM  = dot(rgbM,  luma);
    float lumaMin = min(lumaM, min(min(lumaNW, lumaNE), min(lumaSW, lumaSE)));
    float lumaMax = max(lumaM, max(max(lumaNW, lumaNE), max(lumaSW, lumaSE)));

    mediump vec2 dir;
    dir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));
    dir.y =  ((lumaNW + lumaSW) - (lumaNE + lumaSE));

    float dirReduce = max((lumaNW + lumaNE + lumaSW + lumaSE) *
                          (0.25 * FXAA_REDUCE_MUL), FXAA_REDUCE_MIN);

    float rcpDirMin = 1.0 / (min(abs(dir.x), abs(dir.y)) + dirReduce);
    dir = min(vec2(FXAA_SPAN_MAX, FXAA_SPAN_MAX),
              max(vec2(-FXAA_SPAN_MAX, -FXAA_SPAN_MAX),
                  dir * rcpDirMin)) * inverseVP;

    vec3 rgbA = 0.5 * (
                       texture2D(tex, fragCoord * inverseVP + dir * (1.0 / 3.0 - 0.5)).xyz +
                       texture2D(tex, fragCoord * inverseVP + dir * (2.0 / 3.0 - 0.5)).xyz);
    vec3 rgbB = rgbA * 0.5 + 0.25 * (
                                     texture2D(tex, fragCoord * inverseVP + dir * -0.5).xyz +
                                     texture2D(tex, fragCoord * inverseVP + dir * 0.5).xyz);

    float lumaB = dot(rgbB, luma);
    if ((lumaB < lumaMin) || (lumaB > lumaMax))
        color = vec4(rgbA, texColor.a);
    else
        color = vec4(rgbB, texColor.a);
    return color;
}

void main() {

      vec4 color;

      color = fxaa(uSampler, vFragCoord, inputSize.zw, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);

      gl_FragColor = color;
}
`;
(function(n) {
  __extends$3(e, n);
  function e() {
    return n.call(this, vertex, fragment$1) || this;
  }
  return e;
})(Filter);
var extendStatics$2 = function(n, e) {
  return extendStatics$2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, r) {
    t.__proto__ = r;
  } || function(t, r) {
    for (var a in r)
      r.hasOwnProperty(a) && (t[a] = r[a]);
  }, extendStatics$2(n, e);
};
function __extends$2(n, e) {
  extendStatics$2(n, e);
  function t() {
    this.constructor = n;
  }
  n.prototype = e === null ? Object.create(e) : (t.prototype = e.prototype, new t());
}
var fragment = `precision highp float;

varying vec2 vTextureCoord;
varying vec4 vColor;

uniform float uNoise;
uniform float uSeed;
uniform sampler2D uSampler;

float rand(vec2 co)
{
    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

void main()
{
    vec4 color = texture2D(uSampler, vTextureCoord);
    float randomValue = rand(gl_FragCoord.xy * uSeed);
    float diff = (randomValue - 0.5) * uNoise;

    // Un-premultiply alpha before applying the color matrix. See issue #3539.
    if (color.a > 0.0) {
        color.rgb /= color.a;
    }

    color.r += diff;
    color.g += diff;
    color.b += diff;

    // Premultiply alpha again.
    color.rgb *= color.a;

    gl_FragColor = color;
}
`, NoiseFilter$1 = (
  /** @class */
  function(n) {
    __extends$2(e, n);
    function e(t, r) {
      t === void 0 && (t = 0.5), r === void 0 && (r = Math.random());
      var a = n.call(this, defaultFilterVertex, fragment, {
        uNoise: 0,
        uSeed: 0
      }) || this;
      return a.noise = t, a.seed = r, a;
    }
    return Object.defineProperty(e.prototype, "noise", {
      /**
       * The amount of noise to apply, this value should be in the range (0, 1].
       * @default 0.5
       */
      get: function() {
        return this.uniforms.uNoise;
      },
      set: function(t) {
        this.uniforms.uNoise = t;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "seed", {
      /** A seed value to apply to the random noise generation. `Math.random()` is a good value to use. */
      get: function() {
        return this.uniforms.uSeed;
      },
      set: function(t) {
        this.uniforms.uSeed = t;
      },
      enumerable: !1,
      configurable: !0
    }), e;
  }(Filter)
);
var _tempMatrix = new Matrix();
DisplayObject.prototype._cacheAsBitmap = !1;
DisplayObject.prototype._cacheData = null;
DisplayObject.prototype._cacheAsBitmapResolution = null;
DisplayObject.prototype._cacheAsBitmapMultisample = MSAA_QUALITY.NONE;
var CacheData = (
  /** @class */
  /* @__PURE__ */ function() {
    function n() {
      this.textureCacheId = null, this.originalRender = null, this.originalRenderCanvas = null, this.originalCalculateBounds = null, this.originalGetLocalBounds = null, this.originalUpdateTransform = null, this.originalDestroy = null, this.originalMask = null, this.originalFilterArea = null, this.originalContainsPoint = null, this.sprite = null;
    }
    return n;
  }()
);
Object.defineProperties(DisplayObject.prototype, {
  /**
   * The resolution to use for cacheAsBitmap. By default this will use the renderer's resolution
   * but can be overriden for performance. Lower values will reduce memory usage at the expense
   * of render quality. A falsey value of `null` or `0` will default to the renderer's resolution.
   * If `cacheAsBitmap` is set to `true`, this will re-render with the new resolution.
   * @member {number} cacheAsBitmapResolution
   * @memberof PIXI.DisplayObject#
   * @default null
   */
  cacheAsBitmapResolution: {
    get: function() {
      return this._cacheAsBitmapResolution;
    },
    set: function(n) {
      n !== this._cacheAsBitmapResolution && (this._cacheAsBitmapResolution = n, this.cacheAsBitmap && (this.cacheAsBitmap = !1, this.cacheAsBitmap = !0));
    }
  },
  /**
   * The number of samples to use for cacheAsBitmap. If set to `null`, the renderer's
   * sample count is used.
   * If `cacheAsBitmap` is set to `true`, this will re-render with the new number of samples.
   * @member {number} cacheAsBitmapMultisample
   * @memberof PIXI.DisplayObject#
   * @default PIXI.MSAA_QUALITY.NONE
   */
  cacheAsBitmapMultisample: {
    get: function() {
      return this._cacheAsBitmapMultisample;
    },
    set: function(n) {
      n !== this._cacheAsBitmapMultisample && (this._cacheAsBitmapMultisample = n, this.cacheAsBitmap && (this.cacheAsBitmap = !1, this.cacheAsBitmap = !0));
    }
  },
  /**
   * Set this to true if you want this display object to be cached as a bitmap.
   * This basically takes a snap shot of the display object as it is at that moment. It can
   * provide a performance benefit for complex static displayObjects.
   * To remove simply set this property to `false`
   *
   * IMPORTANT GOTCHA - Make sure that all your textures are preloaded BEFORE setting this property to true
   * as it will take a snapshot of what is currently there. If the textures have not loaded then they will not appear.
   * @member {boolean}
   * @memberof PIXI.DisplayObject#
   */
  cacheAsBitmap: {
    get: function() {
      return this._cacheAsBitmap;
    },
    set: function(n) {
      if (this._cacheAsBitmap !== n) {
        this._cacheAsBitmap = n;
        var e;
        n ? (this._cacheData || (this._cacheData = new CacheData()), e = this._cacheData, e.originalRender = this.render, e.originalRenderCanvas = this.renderCanvas, e.originalUpdateTransform = this.updateTransform, e.originalCalculateBounds = this.calculateBounds, e.originalGetLocalBounds = this.getLocalBounds, e.originalDestroy = this.destroy, e.originalContainsPoint = this.containsPoint, e.originalMask = this._mask, e.originalFilterArea = this.filterArea, this.render = this._renderCached, this.renderCanvas = this._renderCachedCanvas, this.destroy = this._cacheAsBitmapDestroy) : (e = this._cacheData, e.sprite && this._destroyCachedDisplayObject(), this.render = e.originalRender, this.renderCanvas = e.originalRenderCanvas, this.calculateBounds = e.originalCalculateBounds, this.getLocalBounds = e.originalGetLocalBounds, this.destroy = e.originalDestroy, this.updateTransform = e.originalUpdateTransform, this.containsPoint = e.originalContainsPoint, this._mask = e.originalMask, this.filterArea = e.originalFilterArea);
      }
    }
  }
});
DisplayObject.prototype._renderCached = function(e) {
  !this.visible || this.worldAlpha <= 0 || !this.renderable || (this._initCachedDisplayObject(e), this._cacheData.sprite.transform._worldID = this.transform._worldID, this._cacheData.sprite.worldAlpha = this.worldAlpha, this._cacheData.sprite._render(e));
};
DisplayObject.prototype._initCachedDisplayObject = function(e) {
  var t;
  if (!(this._cacheData && this._cacheData.sprite)) {
    var r = this.alpha;
    this.alpha = 1, e.batch.flush();
    var a = this.getLocalBounds(null, !0).clone();
    if (this.filters && this.filters.length) {
      var o = this.filters[0].padding;
      a.pad(o);
    }
    a.ceil(settings.RESOLUTION);
    var s = e.renderTexture.current, u = e.renderTexture.sourceFrame.clone(), h = e.renderTexture.destinationFrame.clone(), l = e.projection.transform, c = RenderTexture.create({
      width: a.width,
      height: a.height,
      resolution: this.cacheAsBitmapResolution || e.resolution,
      multisample: (t = this.cacheAsBitmapMultisample) !== null && t !== void 0 ? t : e.multisample
    }), v = "cacheAsBitmap_" + uid();
    this._cacheData.textureCacheId = v, BaseTexture.addToCache(c.baseTexture, v), Texture.addToCache(c, v);
    var d = this.transform.localTransform.copyTo(_tempMatrix).invert().translate(-a.x, -a.y);
    this.render = this._cacheData.originalRender, e.render(this, { renderTexture: c, clear: !0, transform: d, skipUpdateTransform: !1 }), e.framebuffer.blit(), e.projection.transform = l, e.renderTexture.bind(s, u, h), this.render = this._renderCached, this.updateTransform = this.displayObjectUpdateTransform, this.calculateBounds = this._calculateCachedBounds, this.getLocalBounds = this._getCachedLocalBounds, this._mask = null, this.filterArea = null, this.alpha = r;
    var g = new Sprite(c);
    g.transform.worldTransform = this.transform.worldTransform, g.anchor.x = -(a.x / a.width), g.anchor.y = -(a.y / a.height), g.alpha = r, g._bounds = this._bounds, this._cacheData.sprite = g, this.transform._parentID = -1, this.parent ? this.updateTransform() : (this.enableTempParent(), this.updateTransform(), this.disableTempParent(null)), this.containsPoint = g.containsPoint.bind(g);
  }
};
DisplayObject.prototype._renderCachedCanvas = function(e) {
  !this.visible || this.worldAlpha <= 0 || !this.renderable || (this._initCachedDisplayObjectCanvas(e), this._cacheData.sprite.worldAlpha = this.worldAlpha, this._cacheData.sprite._renderCanvas(e));
};
DisplayObject.prototype._initCachedDisplayObjectCanvas = function(e) {
  if (!(this._cacheData && this._cacheData.sprite)) {
    var t = this.getLocalBounds(null, !0), r = this.alpha;
    this.alpha = 1;
    var a = e.context, o = e._projTransform;
    t.ceil(settings.RESOLUTION);
    var s = RenderTexture.create({ width: t.width, height: t.height }), u = "cacheAsBitmap_" + uid();
    this._cacheData.textureCacheId = u, BaseTexture.addToCache(s.baseTexture, u), Texture.addToCache(s, u);
    var h = _tempMatrix;
    this.transform.localTransform.copyTo(h), h.invert(), h.tx -= t.x, h.ty -= t.y, this.renderCanvas = this._cacheData.originalRenderCanvas, e.render(this, { renderTexture: s, clear: !0, transform: h, skipUpdateTransform: !1 }), e.context = a, e._projTransform = o, this.renderCanvas = this._renderCachedCanvas, this.updateTransform = this.displayObjectUpdateTransform, this.calculateBounds = this._calculateCachedBounds, this.getLocalBounds = this._getCachedLocalBounds, this._mask = null, this.filterArea = null, this.alpha = r;
    var l = new Sprite(s);
    l.transform.worldTransform = this.transform.worldTransform, l.anchor.x = -(t.x / t.width), l.anchor.y = -(t.y / t.height), l.alpha = r, l._bounds = this._bounds, this._cacheData.sprite = l, this.transform._parentID = -1, this.parent ? this.updateTransform() : (this.parent = e._tempDisplayObjectParent, this.updateTransform(), this.parent = null), this.containsPoint = l.containsPoint.bind(l);
  }
};
DisplayObject.prototype._calculateCachedBounds = function() {
  this._bounds.clear(), this._cacheData.sprite.transform._worldID = this.transform._worldID, this._cacheData.sprite._calculateBounds(), this._bounds.updateID = this._boundsID;
};
DisplayObject.prototype._getCachedLocalBounds = function() {
  return this._cacheData.sprite.getLocalBounds(null);
};
DisplayObject.prototype._destroyCachedDisplayObject = function() {
  this._cacheData.sprite._texture.destroy(!0), this._cacheData.sprite = null, BaseTexture.removeFromCache(this._cacheData.textureCacheId), Texture.removeFromCache(this._cacheData.textureCacheId), this._cacheData.textureCacheId = null;
};
DisplayObject.prototype._cacheAsBitmapDestroy = function(e) {
  this.cacheAsBitmap = !1, this.destroy(e);
};
DisplayObject.prototype.name = null;
Container.prototype.getChildByName = function(e, t) {
  for (var r = 0, a = this.children.length; r < a; r++)
    if (this.children[r].name === e)
      return this.children[r];
  if (t)
    for (var r = 0, a = this.children.length; r < a; r++) {
      var o = this.children[r];
      if (o.getChildByName) {
        var s = o.getChildByName(e, !0);
        if (s)
          return s;
      }
    }
  return null;
};
DisplayObject.prototype.getGlobalPosition = function(e, t) {
  return e === void 0 && (e = new Point()), t === void 0 && (t = !1), this.parent ? this.parent.toGlobal(this.position, e, t) : (e.x = this.position.x, e.y = this.position.y), e;
};
var ResizePlugin = (
  /** @class */
  function() {
    function n() {
    }
    return n.init = function(e) {
      var t = this;
      Object.defineProperty(
        this,
        "resizeTo",
        /**
         * The HTML element or window to automatically resize the
         * renderer's view element to match width and height.
         * @member {Window|HTMLElement}
         * @name resizeTo
         * @memberof PIXI.Application#
         */
        {
          set: function(r) {
            globalThis.removeEventListener("resize", this.queueResize), this._resizeTo = r, r && (globalThis.addEventListener("resize", this.queueResize), this.resize());
          },
          get: function() {
            return this._resizeTo;
          }
        }
      ), this.queueResize = function() {
        t._resizeTo && (t.cancelResize(), t._resizeId = requestAnimationFrame(function() {
          return t.resize();
        }));
      }, this.cancelResize = function() {
        t._resizeId && (cancelAnimationFrame(t._resizeId), t._resizeId = null);
      }, this.resize = function() {
        if (t._resizeTo) {
          t.cancelResize();
          var r, a;
          if (t._resizeTo === globalThis.window)
            r = globalThis.innerWidth, a = globalThis.innerHeight;
          else {
            var o = t._resizeTo, s = o.clientWidth, u = o.clientHeight;
            r = s, a = u;
          }
          t.renderer.resize(r, a);
        }
      }, this._resizeId = null, this._resizeTo = null, this.resizeTo = e.resizeTo || null;
    }, n.destroy = function() {
      globalThis.removeEventListener("resize", this.queueResize), this.cancelResize(), this.cancelResize = null, this.queueResize = null, this.resizeTo = null, this.resize = null;
    }, n.extension = ExtensionType.Application, n;
  }()
), Application = (
  /** @class */
  function() {
    function n(e) {
      var t = this;
      this.stage = new Container(), e = Object.assign({
        forceCanvas: !1
      }, e), this.renderer = autoDetectRenderer(e), n._plugins.forEach(function(r) {
        r.init.call(t, e);
      });
    }
    return n.registerPlugin = function(e) {
      deprecation("6.5.0", "Application.registerPlugin() is deprecated, use extensions.add()"), extensions.add({
        type: ExtensionType.Application,
        ref: e
      });
    }, n.prototype.render = function() {
      this.renderer.render(this.stage);
    }, Object.defineProperty(n.prototype, "view", {
      /**
       * Reference to the renderer's canvas element.
       * @member {HTMLCanvasElement}
       * @readonly
       */
      get: function() {
        return this.renderer.view;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n.prototype, "screen", {
      /**
       * Reference to the renderer's screen rectangle. Its safe to use as `filterArea` or `hitArea` for the whole screen.
       * @member {PIXI.Rectangle}
       * @readonly
       */
      get: function() {
        return this.renderer.screen;
      },
      enumerable: !1,
      configurable: !0
    }), n.prototype.destroy = function(e, t) {
      var r = this, a = n._plugins.slice(0);
      a.reverse(), a.forEach(function(o) {
        o.destroy.call(r);
      }), this.stage.destroy(t), this.stage = null, this.renderer.destroy(e), this.renderer = null;
    }, n._plugins = [], n;
  }()
);
extensions.handleByList(ExtensionType.Application, Application._plugins);
extensions.add(ResizePlugin);
var extendStatics$1 = function(n, e) {
  return extendStatics$1 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, r) {
    t.__proto__ = r;
  } || function(t, r) {
    for (var a in r)
      r.hasOwnProperty(a) && (t[a] = r[a]);
  }, extendStatics$1(n, e);
};
function __extends$1(n, e) {
  extendStatics$1(n, e);
  function t() {
    this.constructor = n;
  }
  n.prototype = e === null ? Object.create(e) : (t.prototype = e.prototype, new t());
}
var PlaneGeometry = (
  /** @class */
  function(n) {
    __extends$1(e, n);
    function e(t, r, a, o) {
      t === void 0 && (t = 100), r === void 0 && (r = 100), a === void 0 && (a = 10), o === void 0 && (o = 10);
      var s = n.call(this) || this;
      return s.segWidth = a, s.segHeight = o, s.width = t, s.height = r, s.build(), s;
    }
    return e.prototype.build = function() {
      for (var t = this.segWidth * this.segHeight, r = [], a = [], o = [], s = this.segWidth - 1, u = this.segHeight - 1, h = this.width / s, l = this.height / u, c = 0; c < t; c++) {
        var v = c % this.segWidth, d = c / this.segWidth | 0;
        r.push(v * h, d * l), a.push(v / s, d / u);
      }
      for (var g = s * u, c = 0; c < g; c++) {
        var m = c % s, _ = c / s | 0, y = _ * this.segWidth + m, b = _ * this.segWidth + m + 1, S = (_ + 1) * this.segWidth + m, O = (_ + 1) * this.segWidth + m + 1;
        o.push(y, b, S, b, O, S);
      }
      this.buffers[0].data = new Float32Array(r), this.buffers[1].data = new Float32Array(a), this.indexBuffer.data = new Uint16Array(o), this.buffers[0].update(), this.buffers[1].update(), this.indexBuffer.update();
    }, e;
  }(MeshGeometry)
), RopeGeometry = (
  /** @class */
  function(n) {
    __extends$1(e, n);
    function e(t, r, a) {
      t === void 0 && (t = 200), a === void 0 && (a = 0);
      var o = n.call(this, new Float32Array(r.length * 4), new Float32Array(r.length * 4), new Uint16Array((r.length - 1) * 6)) || this;
      return o.points = r, o._width = t, o.textureScale = a, o.build(), o;
    }
    return Object.defineProperty(e.prototype, "width", {
      /**
       * The width (i.e., thickness) of the rope.
       * @readonly
       */
      get: function() {
        return this._width;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.build = function() {
      var t = this.points;
      if (t) {
        var r = this.getBuffer("aVertexPosition"), a = this.getBuffer("aTextureCoord"), o = this.getIndex();
        if (!(t.length < 1)) {
          r.data.length / 4 !== t.length && (r.data = new Float32Array(t.length * 4), a.data = new Float32Array(t.length * 4), o.data = new Uint16Array((t.length - 1) * 6));
          var s = a.data, u = o.data;
          s[0] = 0, s[1] = 0, s[2] = 0, s[3] = 1;
          for (var h = 0, l = t[0], c = this._width * this.textureScale, v = t.length, d = 0; d < v; d++) {
            var g = d * 4;
            if (this.textureScale > 0) {
              var m = l.x - t[d].x, _ = l.y - t[d].y, y = Math.sqrt(m * m + _ * _);
              l = t[d], h += y / c;
            } else
              h = d / (v - 1);
            s[g] = h, s[g + 1] = 0, s[g + 2] = h, s[g + 3] = 1;
          }
          for (var b = 0, d = 0; d < v - 1; d++) {
            var g = d * 2;
            u[b++] = g, u[b++] = g + 1, u[b++] = g + 2, u[b++] = g + 2, u[b++] = g + 1, u[b++] = g + 3;
          }
          a.update(), o.update(), this.updateVertices();
        }
      }
    }, e.prototype.updateVertices = function() {
      var t = this.points;
      if (!(t.length < 1)) {
        for (var r = t[0], a, o = 0, s = 0, u = this.buffers[0].data, h = t.length, l = 0; l < h; l++) {
          var c = t[l], v = l * 4;
          l < t.length - 1 ? a = t[l + 1] : a = c, s = -(a.x - r.x), o = a.y - r.y;
          var d = Math.sqrt(o * o + s * s), g = this.textureScale > 0 ? this.textureScale * this._width / 2 : this._width / 2;
          o /= d, s /= d, o *= g, s *= g, u[v] = c.x + o, u[v + 1] = c.y + s, u[v + 2] = c.x - o, u[v + 3] = c.y - s, r = c;
        }
        this.buffers[0].update();
      }
    }, e.prototype.update = function() {
      this.textureScale > 0 ? this.build() : this.updateVertices();
    }, e;
  }(MeshGeometry)
);
(function(n) {
  __extends$1(e, n);
  function e(t, r, a) {
    a === void 0 && (a = 0);
    var o = this, s = new RopeGeometry(t.height, r, a), u = new MeshMaterial(t);
    return a > 0 && (t.baseTexture.wrapMode = WRAP_MODES.REPEAT), o = n.call(this, s, u) || this, o.autoUpdate = !0, o;
  }
  return e.prototype._render = function(t) {
    var r = this.geometry;
    (this.autoUpdate || r._width !== this.shader.texture.height) && (r._width = this.shader.texture.height, r.update()), n.prototype._render.call(this, t);
  }, e;
})(Mesh);
var SimplePlane = (
  /** @class */
  function(n) {
    __extends$1(e, n);
    function e(t, r, a) {
      var o = this, s = new PlaneGeometry(t.width, t.height, r, a), u = new MeshMaterial(Texture.WHITE);
      return o = n.call(this, s, u) || this, o.texture = t, o.autoResize = !0, o;
    }
    return e.prototype.textureUpdated = function() {
      this._textureID = this.shader.texture._updateID;
      var t = this.geometry, r = this.shader.texture, a = r.width, o = r.height;
      this.autoResize && (t.width !== a || t.height !== o) && (t.width = this.shader.texture.width, t.height = this.shader.texture.height, t.build());
    }, Object.defineProperty(e.prototype, "texture", {
      get: function() {
        return this.shader.texture;
      },
      set: function(t) {
        this.shader.texture !== t && (this.shader.texture = t, this._textureID = -1, t.baseTexture.valid ? this.textureUpdated() : t.once("update", this.textureUpdated, this));
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype._render = function(t) {
      this._textureID !== this.shader.texture._updateID && this.textureUpdated(), n.prototype._render.call(this, t);
    }, e.prototype.destroy = function(t) {
      this.shader.texture.off("update", this.textureUpdated, this), n.prototype.destroy.call(this, t);
    }, e;
  }(Mesh)
);
(function(n) {
  __extends$1(e, n);
  function e(t, r, a, o, s) {
    t === void 0 && (t = Texture.EMPTY);
    var u = this, h = new MeshGeometry(r, a, o);
    h.getBuffer("aVertexPosition").static = !1;
    var l = new MeshMaterial(t);
    return u = n.call(this, h, l, null, s) || this, u.autoUpdate = !0, u;
  }
  return Object.defineProperty(e.prototype, "vertices", {
    /**
     * Collection of vertices data.
     * @type {Float32Array}
     */
    get: function() {
      return this.geometry.getBuffer("aVertexPosition").data;
    },
    set: function(t) {
      this.geometry.getBuffer("aVertexPosition").data = t;
    },
    enumerable: !1,
    configurable: !0
  }), e.prototype._render = function(t) {
    this.autoUpdate && this.geometry.getBuffer("aVertexPosition").update(), n.prototype._render.call(this, t);
  }, e;
})(Mesh);
var DEFAULT_BORDER_SIZE = 10;
(function(n) {
  __extends$1(e, n);
  function e(t, r, a, o, s) {
    r === void 0 && (r = DEFAULT_BORDER_SIZE), a === void 0 && (a = DEFAULT_BORDER_SIZE), o === void 0 && (o = DEFAULT_BORDER_SIZE), s === void 0 && (s = DEFAULT_BORDER_SIZE);
    var u = n.call(this, Texture.WHITE, 4, 4) || this;
    return u._origWidth = t.orig.width, u._origHeight = t.orig.height, u._width = u._origWidth, u._height = u._origHeight, u._leftWidth = r, u._rightWidth = o, u._topHeight = a, u._bottomHeight = s, u.texture = t, u;
  }
  return e.prototype.textureUpdated = function() {
    this._textureID = this.shader.texture._updateID, this._refresh();
  }, Object.defineProperty(e.prototype, "vertices", {
    get: function() {
      return this.geometry.getBuffer("aVertexPosition").data;
    },
    set: function(t) {
      this.geometry.getBuffer("aVertexPosition").data = t;
    },
    enumerable: !1,
    configurable: !0
  }), e.prototype.updateHorizontalVertices = function() {
    var t = this.vertices, r = this._getMinScale();
    t[9] = t[11] = t[13] = t[15] = this._topHeight * r, t[17] = t[19] = t[21] = t[23] = this._height - this._bottomHeight * r, t[25] = t[27] = t[29] = t[31] = this._height;
  }, e.prototype.updateVerticalVertices = function() {
    var t = this.vertices, r = this._getMinScale();
    t[2] = t[10] = t[18] = t[26] = this._leftWidth * r, t[4] = t[12] = t[20] = t[28] = this._width - this._rightWidth * r, t[6] = t[14] = t[22] = t[30] = this._width;
  }, e.prototype._getMinScale = function() {
    var t = this._leftWidth + this._rightWidth, r = this._width > t ? 1 : this._width / t, a = this._topHeight + this._bottomHeight, o = this._height > a ? 1 : this._height / a, s = Math.min(r, o);
    return s;
  }, Object.defineProperty(e.prototype, "width", {
    /** The width of the NineSlicePlane, setting this will actually modify the vertices and UV's of this plane. */
    get: function() {
      return this._width;
    },
    set: function(t) {
      this._width = t, this._refresh();
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(e.prototype, "height", {
    /** The height of the NineSlicePlane, setting this will actually modify the vertices and UV's of this plane. */
    get: function() {
      return this._height;
    },
    set: function(t) {
      this._height = t, this._refresh();
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(e.prototype, "leftWidth", {
    /** The width of the left column. */
    get: function() {
      return this._leftWidth;
    },
    set: function(t) {
      this._leftWidth = t, this._refresh();
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(e.prototype, "rightWidth", {
    /** The width of the right column. */
    get: function() {
      return this._rightWidth;
    },
    set: function(t) {
      this._rightWidth = t, this._refresh();
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(e.prototype, "topHeight", {
    /** The height of the top row. */
    get: function() {
      return this._topHeight;
    },
    set: function(t) {
      this._topHeight = t, this._refresh();
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(e.prototype, "bottomHeight", {
    /** The height of the bottom row. */
    get: function() {
      return this._bottomHeight;
    },
    set: function(t) {
      this._bottomHeight = t, this._refresh();
    },
    enumerable: !1,
    configurable: !0
  }), e.prototype._refresh = function() {
    var t = this.texture, r = this.geometry.buffers[1].data;
    this._origWidth = t.orig.width, this._origHeight = t.orig.height;
    var a = 1 / this._origWidth, o = 1 / this._origHeight;
    r[0] = r[8] = r[16] = r[24] = 0, r[1] = r[3] = r[5] = r[7] = 0, r[6] = r[14] = r[22] = r[30] = 1, r[25] = r[27] = r[29] = r[31] = 1, r[2] = r[10] = r[18] = r[26] = a * this._leftWidth, r[4] = r[12] = r[20] = r[28] = 1 - a * this._rightWidth, r[9] = r[11] = r[13] = r[15] = o * this._topHeight, r[17] = r[19] = r[21] = r[23] = 1 - o * this._bottomHeight, this.updateHorizontalVertices(), this.updateVerticalVertices(), this.geometry.buffers[0].update(), this.geometry.buffers[1].update();
  }, e;
})(SimplePlane);
var extendStatics = function(n, e) {
  return extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, r) {
    t.__proto__ = r;
  } || function(t, r) {
    for (var a in r)
      r.hasOwnProperty(a) && (t[a] = r[a]);
  }, extendStatics(n, e);
};
function __extends(n, e) {
  extendStatics(n, e);
  function t() {
    this.constructor = n;
  }
  n.prototype = e === null ? Object.create(e) : (t.prototype = e.prototype, new t());
}
var AnimatedSprite = (
  /** @class */
  function(n) {
    __extends(e, n);
    function e(t, r) {
      r === void 0 && (r = !0);
      var a = n.call(this, t[0] instanceof Texture ? t[0] : t[0].texture) || this;
      return a._textures = null, a._durations = null, a._autoUpdate = r, a._isConnectedToTicker = !1, a.animationSpeed = 1, a.loop = !0, a.updateAnchor = !1, a.onComplete = null, a.onFrameChange = null, a.onLoop = null, a._currentTime = 0, a._playing = !1, a._previousFrame = null, a.textures = t, a;
    }
    return e.prototype.stop = function() {
      this._playing && (this._playing = !1, this._autoUpdate && this._isConnectedToTicker && (Ticker.shared.remove(this.update, this), this._isConnectedToTicker = !1));
    }, e.prototype.play = function() {
      this._playing || (this._playing = !0, this._autoUpdate && !this._isConnectedToTicker && (Ticker.shared.add(this.update, this, UPDATE_PRIORITY.HIGH), this._isConnectedToTicker = !0));
    }, e.prototype.gotoAndStop = function(t) {
      this.stop();
      var r = this.currentFrame;
      this._currentTime = t, r !== this.currentFrame && this.updateTexture();
    }, e.prototype.gotoAndPlay = function(t) {
      var r = this.currentFrame;
      this._currentTime = t, r !== this.currentFrame && this.updateTexture(), this.play();
    }, e.prototype.update = function(t) {
      if (this._playing) {
        var r = this.animationSpeed * t, a = this.currentFrame;
        if (this._durations !== null) {
          var o = this._currentTime % 1 * this._durations[this.currentFrame];
          for (o += r / 60 * 1e3; o < 0; )
            this._currentTime--, o += this._durations[this.currentFrame];
          var s = Math.sign(this.animationSpeed * t);
          for (this._currentTime = Math.floor(this._currentTime); o >= this._durations[this.currentFrame]; )
            o -= this._durations[this.currentFrame] * s, this._currentTime += s;
          this._currentTime += o / this._durations[this.currentFrame];
        } else
          this._currentTime += r;
        this._currentTime < 0 && !this.loop ? (this.gotoAndStop(0), this.onComplete && this.onComplete()) : this._currentTime >= this._textures.length && !this.loop ? (this.gotoAndStop(this._textures.length - 1), this.onComplete && this.onComplete()) : a !== this.currentFrame && (this.loop && this.onLoop && (this.animationSpeed > 0 && this.currentFrame < a ? this.onLoop() : this.animationSpeed < 0 && this.currentFrame > a && this.onLoop()), this.updateTexture());
      }
    }, e.prototype.updateTexture = function() {
      var t = this.currentFrame;
      this._previousFrame !== t && (this._previousFrame = t, this._texture = this._textures[t], this._textureID = -1, this._textureTrimmedID = -1, this._cachedTint = 16777215, this.uvs = this._texture._uvs.uvsFloat32, this.updateAnchor && this._anchor.copyFrom(this._texture.defaultAnchor), this.onFrameChange && this.onFrameChange(this.currentFrame));
    }, e.prototype.destroy = function(t) {
      this.stop(), n.prototype.destroy.call(this, t), this.onComplete = null, this.onFrameChange = null, this.onLoop = null;
    }, e.fromFrames = function(t) {
      for (var r = [], a = 0; a < t.length; ++a)
        r.push(Texture.from(t[a]));
      return new e(r);
    }, e.fromImages = function(t) {
      for (var r = [], a = 0; a < t.length; ++a)
        r.push(Texture.from(t[a]));
      return new e(r);
    }, Object.defineProperty(e.prototype, "totalFrames", {
      /**
       * The total number of frames in the AnimatedSprite. This is the same as number of textures
       * assigned to the AnimatedSprite.
       * @readonly
       * @default 0
       */
      get: function() {
        return this._textures.length;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "textures", {
      /** The array of textures used for this AnimatedSprite. */
      get: function() {
        return this._textures;
      },
      set: function(t) {
        if (t[0] instanceof Texture)
          this._textures = t, this._durations = null;
        else {
          this._textures = [], this._durations = [];
          for (var r = 0; r < t.length; r++)
            this._textures.push(t[r].texture), this._durations.push(t[r].time);
        }
        this._previousFrame = null, this.gotoAndStop(0), this.updateTexture();
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "currentFrame", {
      /**
       * The AnimatedSprites current frame index.
       * @readonly
       */
      get: function() {
        var t = Math.floor(this._currentTime) % this._textures.length;
        return t < 0 && (t += this._textures.length), t;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "playing", {
      /**
       * Indicates if the AnimatedSprite is currently playing.
       * @readonly
       */
      get: function() {
        return this._playing;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "autoUpdate", {
      /** Whether to use PIXI.Ticker.shared to auto update animation time. */
      get: function() {
        return this._autoUpdate;
      },
      set: function(t) {
        t !== this._autoUpdate && (this._autoUpdate = t, !this._autoUpdate && this._isConnectedToTicker ? (Ticker.shared.remove(this.update, this), this._isConnectedToTicker = !1) : this._autoUpdate && !this._isConnectedToTicker && this._playing && (Ticker.shared.add(this.update, this), this._isConnectedToTicker = !0));
      },
      enumerable: !1,
      configurable: !0
    }), e;
  }(Sprite)
);
extensions.add(
  // Install renderer plugins
  AccessibilityManager,
  Extract,
  InteractionManager,
  ParticleRenderer,
  Prepare,
  BatchRenderer,
  TilingSpriteRenderer,
  // Install loader plugins
  BitmapFontLoader,
  CompressedTextureLoader,
  DDSLoader,
  KTXLoader,
  SpritesheetLoader,
  // Install application plugins
  TickerPlugin,
  AppLoaderPlugin
);
var filters = {
  BlurFilter: BlurFilter$1,
  ColorMatrixFilter: ColorMatrixFilter$1,
  NoiseFilter: NoiseFilter$1
};
class EventListenerCtn {
  // リソースリーク対策
  #t = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  add(e, t, r, a = {}) {
    if (e instanceof i) {
      e.on(t, r, a), this.#t.push(() => e.off(t, r, a));
      return;
    }
    e.addEventListener(t, r, a), this.#t.push(() => e.removeEventListener(t, r, { capture: a.capture ?? !1 }));
  }
  clear() {
    for (const e of this.#t) e();
    this.#t = [];
  }
  get isEmpty() {
    return this.#t.length === 0;
  }
}
var SEARCH_PATH_ARG_EXT = /* @__PURE__ */ ((n) => (n.DEFAULT = "", n.SP_GSM = "png|jpg|jpeg|json|svg|webp|mp4|webm", n.SCRIPT = "sn|ssn", n.FONT = "woff2|woff|otf|ttf", n.SOUND = "mp3|m4a|ogg|aac|flac|wav", n.HTML = "htm|html", n.CSS = "css", n.SN = "sn", n.TST_PNGPNG_ = "png|png_", n.TST_HH = "hh", n.TST_EEE = "eee", n.TST_GGG = "ggg", n.TST_PNGXML = "png|xml", n))(SEARCH_PATH_ARG_EXT || {});
function creCFG() {
  return {
    save_ns: "",
    // 扱うセーブデータを一意に識別するキーワード文字列
    window: {
      // アプリケーションウインドウサイズ
      width: 300,
      height: 300
    },
    book: {
      // プロジェクトの詳細情報です
      title: "",
      //作品タイトル
      creator: "",
      //著作者。同人ならペンネーム
      cre_url: "",
      //著作者URL。ツイッターやメール、サイトなど
      publisher: "",
      //出版社。同人ならサークル名
      pub_url: "",
      //出版社URL。無ければ省略します
      detail: "",
      // 内容紹介。端的に記入
      version: "1.0"
    },
    log: { max_len: 64 },
    // プレイヤーが読んだ文章を読み返せる履歴のページ数
    init: {
      bg_color: "#000000",
      // 背景色
      tagch_msecwait: 10,
      // 通常文字表示待ち時間（未読／既読）
      auto_msecpagewait: 3500,
      // 自動文字表示、行クリック待ち時間（未読／既読）
      escape: ""
      // エスケープ文字
    },
    debug: {
      devtool: !1,
      dumpHtm: !1,
      token: !1,
      tag: !1,
      putCh: !1,
      debugLog: !1,
      baseTx: !1,
      masume: !1,
      // テキストレイヤ：ガイドマス目を表示するか
      variable: !1
    },
    code: {},
    // 暗号化しないフォルダ
    debuger_token: ""
    // デバッガとの接続トークン
  };
}
class ConfigBase {
  constructor(e) {
    this.sys = e;
  }
  oCfg = creCFG();
  userFnTail = "";
  // 4tst public
  hPathFn2Exts = {};
  //	Main.generate() -> Config.generate() -> Config.load() ->
  async load(e) {
    this.oCfg.save_ns = e.save_ns ?? this.oCfg.save_ns, e.window ??= { width: 300, height: 300 }, this.oCfg.window.width = e.window.width, this.oCfg.window.height = e.window.height, this.oCfg.book = { ...this.oCfg.book, ...e.book }, this.oCfg.log.max_len = e.log?.max_len ?? this.oCfg.log.max_len, this.oCfg.init = { ...this.oCfg.init, ...e.init }, this.oCfg.debug = { ...this.oCfg.debug, ...e.debug }, this.oCfg.debuger_token = e.debuger_token;
    const t = this.sys.arg.cur + "path.json", r = await this.sys.fetch(t);
    if (!r.ok) throw Error(r.statusText);
    const a = await r.text(), o = JSON.parse(await this.sys.dec(t, a));
    for (const [s, u] of Object.entries(o)) {
      const h = this.hPathFn2Exts[s] = u;
      for (const [l, c] of Object.entries(h))
        l !== ":cnt" && (h[l] = this.sys.arg.cur + c);
    }
    if (this.#t = this.matchPath(
      "^breakline$",
      "png|jpg|jpeg|json|svg|webp|mp4|webm"
      /* SP_GSM */
    ).length > 0, this.#e = this.matchPath(
      "^breakpage$",
      "png|jpg|jpeg|json|svg|webp|mp4|webm"
      /* SP_GSM */
    ).length > 0, this.sys.arg.crypto)
      for (const [s, u] of Object.entries(this.hPathFn2Exts))
        for (const [h, l] of Object.entries(u)) {
          if (!h.startsWith(":") || !h.endsWith(":id")) continue;
          const c = l.slice(l.lastIndexOf("/") + 1), v = u[h.slice(0, -10)] ?? "", g = await (await this.sys.fetch(v)).text(), m = this.sys.hash(g);
          if (c !== m) throw `ファイル改竄エラーです fn:${v}`;
        }
  }
  #t = !1;
  get existsBreakline() {
    return this.#t;
  }
  #e = !1;
  get existsBreakpage() {
    return this.#e;
  }
  get headNs() {
    return `skynovel.${this.oCfg.save_ns} - `;
  }
  #i = /([^/\s]+)\.([^\d]\w+)/;
  // 4 match 498 step(~1ms)  https://regex101.com/r/tpVgmI/1
  searchPath(e, t = "") {
    if (!e) throw "[searchPath] fnが空です";
    if (e.startsWith("http://")) return e;
    const r = e.match(this.#i);
    let a = r ? r[1] ?? "" : e;
    const o = r ? r[2] : "";
    if (this.userFnTail) {
      const h = a + "@@" + this.userFnTail;
      if (h in this.hPathFn2Exts) {
        if (t === "") a = h;
        else for (const l of Object.keys(this.hPathFn2Exts[h] ?? {}))
          if (`|${t}|`.includes(`|${l}|`)) {
            a = h;
            break;
          }
      }
    }
    const s = this.hPathFn2Exts[a];
    if (!s) throw `サーチパスに存在しないファイル【${e}】です`;
    if (!o) {
      const h = int(s[":cnt"]);
      if (t === "") {
        if (h > 1) throw `指定ファイル【${e}】が複数マッチします。サーチ対象拡張子群【${t}】で絞り込むか、ファイル名を個別にして下さい。`;
        return e;
      }
      const l = `|${t}|`;
      if (h > 1) {
        let c = 0;
        for (const v of Object.keys(s))
          if (l.includes(`|${v}|`) && ++c > 1)
            throw `指定ファイル【${e}】が複数マッチします。サーチ対象拡張子群【${t}】で絞り込むか、ファイル名を個別にして下さい。`;
      }
      for (const [c, v] of Object.entries(s))
        if (l.includes(`|${c}|`)) return v;
      throw `サーチ対象拡張子群【${t}】にマッチするファイルがサーチパスに存在しません。探索ファイル名=【${e}】`;
    }
    if (t !== "" && !`|${t}|`.includes(`|${o}|`))
      throw `指定ファイルの拡張子【${o}】は、サーチ対象拡張子群【${t}】にマッチしません。探索ファイル名=【${e}】`;
    const u = s[o];
    if (!u) throw `サーチパスに存在しない拡張子【${o}】です。探索ファイル名=【${e}】、サーチ対象拡張子群【${t}】`;
    return u;
  }
  matchPath(e, t = "") {
    const r = [], a = new RegExp(e), o = new RegExp(t);
    for (const [s, u] of Object.entries(this.hPathFn2Exts)) {
      if (s.search(a) === -1) continue;
      if (t === "") {
        r.push(u);
        continue;
      }
      const h = {};
      let l = !1;
      for (const c of Object.keys(u))
        c.search(o) !== -1 && (h[c] = s, l = !0);
      l && r.push(h);
    }
    return r;
  }
  addPath(e, t) {
    const r = {};
    for (const [a, o] of Object.entries(t))
      r[a] = (a.startsWith(":") ? "" : this.sys.arg.cur) + String(o);
    this.hPathFn2Exts[e] = r;
  }
}
const PACKET_TYPES = /* @__PURE__ */ Object.create(null);
PACKET_TYPES.open = "0";
PACKET_TYPES.close = "1";
PACKET_TYPES.ping = "2";
PACKET_TYPES.pong = "3";
PACKET_TYPES.message = "4";
PACKET_TYPES.upgrade = "5";
PACKET_TYPES.noop = "6";
const PACKET_TYPES_REVERSE = /* @__PURE__ */ Object.create(null);
Object.keys(PACKET_TYPES).forEach((n) => {
  PACKET_TYPES_REVERSE[PACKET_TYPES[n]] = n;
});
const ERROR_PACKET = { type: "error", data: "parser error" }, withNativeBlob$1 = typeof Blob == "function" || typeof Blob < "u" && Object.prototype.toString.call(Blob) === "[object BlobConstructor]", withNativeArrayBuffer$2 = typeof ArrayBuffer == "function", isView$1 = (n) => typeof ArrayBuffer.isView == "function" ? ArrayBuffer.isView(n) : n && n.buffer instanceof ArrayBuffer, encodePacket = ({ type: n, data: e }, t, r) => withNativeBlob$1 && e instanceof Blob ? t ? r(e) : encodeBlobAsBase64(e, r) : withNativeArrayBuffer$2 && (e instanceof ArrayBuffer || isView$1(e)) ? t ? r(e) : encodeBlobAsBase64(new Blob([e]), r) : r(PACKET_TYPES[n] + (e || "")), encodeBlobAsBase64 = (n, e) => {
  const t = new FileReader();
  return t.onload = function() {
    const r = t.result.split(",")[1];
    e("b" + (r || ""));
  }, t.readAsDataURL(n);
};
function toArray(n) {
  return n instanceof Uint8Array ? n : n instanceof ArrayBuffer ? new Uint8Array(n) : new Uint8Array(n.buffer, n.byteOffset, n.byteLength);
}
let TEXT_ENCODER;
function encodePacketToBinary(n, e) {
  if (withNativeBlob$1 && n.data instanceof Blob)
    return n.data.arrayBuffer().then(toArray).then(e);
  if (withNativeArrayBuffer$2 && (n.data instanceof ArrayBuffer || isView$1(n.data)))
    return e(toArray(n.data));
  encodePacket(n, !1, (t) => {
    TEXT_ENCODER || (TEXT_ENCODER = new TextEncoder()), e(TEXT_ENCODER.encode(t));
  });
}
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", lookup$1 = typeof Uint8Array > "u" ? [] : new Uint8Array(256);
for (let n = 0; n < chars.length; n++)
  lookup$1[chars.charCodeAt(n)] = n;
const decode$1 = (n) => {
  let e = n.length * 0.75, t = n.length, r, a = 0, o, s, u, h;
  n[n.length - 1] === "=" && (e--, n[n.length - 2] === "=" && e--);
  const l = new ArrayBuffer(e), c = new Uint8Array(l);
  for (r = 0; r < t; r += 4)
    o = lookup$1[n.charCodeAt(r)], s = lookup$1[n.charCodeAt(r + 1)], u = lookup$1[n.charCodeAt(r + 2)], h = lookup$1[n.charCodeAt(r + 3)], c[a++] = o << 2 | s >> 4, c[a++] = (s & 15) << 4 | u >> 2, c[a++] = (u & 3) << 6 | h & 63;
  return l;
}, withNativeArrayBuffer$1 = typeof ArrayBuffer == "function", decodePacket = (n, e) => {
  if (typeof n != "string")
    return {
      type: "message",
      data: mapBinary(n, e)
    };
  const t = n.charAt(0);
  return t === "b" ? {
    type: "message",
    data: decodeBase64Packet(n.substring(1), e)
  } : PACKET_TYPES_REVERSE[t] ? n.length > 1 ? {
    type: PACKET_TYPES_REVERSE[t],
    data: n.substring(1)
  } : {
    type: PACKET_TYPES_REVERSE[t]
  } : ERROR_PACKET;
}, decodeBase64Packet = (n, e) => {
  if (withNativeArrayBuffer$1) {
    const t = decode$1(n);
    return mapBinary(t, e);
  } else
    return { base64: !0, data: n };
}, mapBinary = (n, e) => {
  switch (e) {
    case "blob":
      return n instanceof Blob ? n : new Blob([n]);
    case "arraybuffer":
    default:
      return n instanceof ArrayBuffer ? n : n.buffer;
  }
}, SEPARATOR = "", encodePayload = (n, e) => {
  const t = n.length, r = new Array(t);
  let a = 0;
  n.forEach((o, s) => {
    encodePacket(o, !1, (u) => {
      r[s] = u, ++a === t && e(r.join(SEPARATOR));
    });
  });
}, decodePayload = (n, e) => {
  const t = n.split(SEPARATOR), r = [];
  for (let a = 0; a < t.length; a++) {
    const o = decodePacket(t[a], e);
    if (r.push(o), o.type === "error")
      break;
  }
  return r;
};
function createPacketEncoderStream() {
  return new TransformStream({
    transform(n, e) {
      encodePacketToBinary(n, (t) => {
        const r = t.length;
        let a;
        if (r < 126)
          a = new Uint8Array(1), new DataView(a.buffer).setUint8(0, r);
        else if (r < 65536) {
          a = new Uint8Array(3);
          const o = new DataView(a.buffer);
          o.setUint8(0, 126), o.setUint16(1, r);
        } else {
          a = new Uint8Array(9);
          const o = new DataView(a.buffer);
          o.setUint8(0, 127), o.setBigUint64(1, BigInt(r));
        }
        n.data && typeof n.data != "string" && (a[0] |= 128), e.enqueue(a), e.enqueue(t);
      });
    }
  });
}
let TEXT_DECODER;
function totalLength(n) {
  return n.reduce((e, t) => e + t.length, 0);
}
function concatChunks(n, e) {
  if (n[0].length === e)
    return n.shift();
  const t = new Uint8Array(e);
  let r = 0;
  for (let a = 0; a < e; a++)
    t[a] = n[0][r++], r === n[0].length && (n.shift(), r = 0);
  return n.length && r < n[0].length && (n[0] = n[0].slice(r)), t;
}
function createPacketDecoderStream(n, e) {
  TEXT_DECODER || (TEXT_DECODER = new TextDecoder());
  const t = [];
  let r = 0, a = -1, o = !1;
  return new TransformStream({
    transform(s, u) {
      for (t.push(s); ; ) {
        if (r === 0) {
          if (totalLength(t) < 1)
            break;
          const h = concatChunks(t, 1);
          o = (h[0] & 128) === 128, a = h[0] & 127, a < 126 ? r = 3 : a === 126 ? r = 1 : r = 2;
        } else if (r === 1) {
          if (totalLength(t) < 2)
            break;
          const h = concatChunks(t, 2);
          a = new DataView(h.buffer, h.byteOffset, h.length).getUint16(0), r = 3;
        } else if (r === 2) {
          if (totalLength(t) < 8)
            break;
          const h = concatChunks(t, 8), l = new DataView(h.buffer, h.byteOffset, h.length), c = l.getUint32(0);
          if (c > Math.pow(2, 21) - 1) {
            u.enqueue(ERROR_PACKET);
            break;
          }
          a = c * Math.pow(2, 32) + l.getUint32(4), r = 3;
        } else {
          if (totalLength(t) < a)
            break;
          const h = concatChunks(t, a);
          u.enqueue(decodePacket(o ? h : TEXT_DECODER.decode(h), e)), r = 0;
        }
        if (a === 0 || a > n) {
          u.enqueue(ERROR_PACKET);
          break;
        }
      }
    }
  });
}
const protocol$1 = 4;
function Emitter(n) {
  if (n) return mixin(n);
}
function mixin(n) {
  for (var e in Emitter.prototype)
    n[e] = Emitter.prototype[e];
  return n;
}
Emitter.prototype.on = Emitter.prototype.addEventListener = function(n, e) {
  return this._callbacks = this._callbacks || {}, (this._callbacks["$" + n] = this._callbacks["$" + n] || []).push(e), this;
};
Emitter.prototype.once = function(n, e) {
  function t() {
    this.off(n, t), e.apply(this, arguments);
  }
  return t.fn = e, this.on(n, t), this;
};
Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function(n, e) {
  if (this._callbacks = this._callbacks || {}, arguments.length == 0)
    return this._callbacks = {}, this;
  var t = this._callbacks["$" + n];
  if (!t) return this;
  if (arguments.length == 1)
    return delete this._callbacks["$" + n], this;
  for (var r, a = 0; a < t.length; a++)
    if (r = t[a], r === e || r.fn === e) {
      t.splice(a, 1);
      break;
    }
  return t.length === 0 && delete this._callbacks["$" + n], this;
};
Emitter.prototype.emit = function(n) {
  this._callbacks = this._callbacks || {};
  for (var e = new Array(arguments.length - 1), t = this._callbacks["$" + n], r = 1; r < arguments.length; r++)
    e[r - 1] = arguments[r];
  if (t) {
    t = t.slice(0);
    for (var r = 0, a = t.length; r < a; ++r)
      t[r].apply(this, e);
  }
  return this;
};
Emitter.prototype.emitReserved = Emitter.prototype.emit;
Emitter.prototype.listeners = function(n) {
  return this._callbacks = this._callbacks || {}, this._callbacks["$" + n] || [];
};
Emitter.prototype.hasListeners = function(n) {
  return !!this.listeners(n).length;
};
const nextTick = typeof Promise == "function" && typeof Promise.resolve == "function" ? (e) => Promise.resolve().then(e) : (e, t) => t(e, 0), globalThisShim = typeof self < "u" ? self : typeof window < "u" ? window : Function("return this")(), defaultBinaryType = "arraybuffer";
function createCookieJar() {
}
function pick(n, ...e) {
  return e.reduce((t, r) => (n.hasOwnProperty(r) && (t[r] = n[r]), t), {});
}
const NATIVE_SET_TIMEOUT = globalThisShim.setTimeout, NATIVE_CLEAR_TIMEOUT = globalThisShim.clearTimeout;
function installTimerFunctions(n, e) {
  e.useNativeTimers ? (n.setTimeoutFn = NATIVE_SET_TIMEOUT.bind(globalThisShim), n.clearTimeoutFn = NATIVE_CLEAR_TIMEOUT.bind(globalThisShim)) : (n.setTimeoutFn = globalThisShim.setTimeout.bind(globalThisShim), n.clearTimeoutFn = globalThisShim.clearTimeout.bind(globalThisShim));
}
const BASE64_OVERHEAD = 1.33;
function byteLength(n) {
  return typeof n == "string" ? utf8Length(n) : Math.ceil((n.byteLength || n.size) * BASE64_OVERHEAD);
}
function utf8Length(n) {
  let e = 0, t = 0;
  for (let r = 0, a = n.length; r < a; r++)
    e = n.charCodeAt(r), e < 128 ? t += 1 : e < 2048 ? t += 2 : e < 55296 || e >= 57344 ? t += 3 : (r++, t += 4);
  return t;
}
function randomString() {
  return Date.now().toString(36).substring(3) + Math.random().toString(36).substring(2, 5);
}
function encode(n) {
  let e = "";
  for (let t in n)
    n.hasOwnProperty(t) && (e.length && (e += "&"), e += encodeURIComponent(t) + "=" + encodeURIComponent(n[t]));
  return e;
}
function decode(n) {
  let e = {}, t = n.split("&");
  for (let r = 0, a = t.length; r < a; r++) {
    let o = t[r].split("=");
    e[decodeURIComponent(o[0])] = decodeURIComponent(o[1]);
  }
  return e;
}
class TransportError extends Error {
  constructor(e, t, r) {
    super(e), this.description = t, this.context = r, this.type = "TransportError";
  }
}
class Transport extends Emitter {
  /**
   * Transport abstract constructor.
   *
   * @param {Object} opts - options
   * @protected
   */
  constructor(e) {
    super(), this.writable = !1, installTimerFunctions(this, e), this.opts = e, this.query = e.query, this.socket = e.socket, this.supportsBinary = !e.forceBase64;
  }
  /**
   * Emits an error.
   *
   * @param {String} reason
   * @param description
   * @param context - the error context
   * @return {Transport} for chaining
   * @protected
   */
  onError(e, t, r) {
    return super.emitReserved("error", new TransportError(e, t, r)), this;
  }
  /**
   * Opens the transport.
   */
  open() {
    return this.readyState = "opening", this.doOpen(), this;
  }
  /**
   * Closes the transport.
   */
  close() {
    return (this.readyState === "opening" || this.readyState === "open") && (this.doClose(), this.onClose()), this;
  }
  /**
   * Sends multiple packets.
   *
   * @param {Array} packets
   */
  send(e) {
    this.readyState === "open" && this.write(e);
  }
  /**
   * Called upon open
   *
   * @protected
   */
  onOpen() {
    this.readyState = "open", this.writable = !0, super.emitReserved("open");
  }
  /**
   * Called with data.
   *
   * @param {String} data
   * @protected
   */
  onData(e) {
    const t = decodePacket(e, this.socket.binaryType);
    this.onPacket(t);
  }
  /**
   * Called with a decoded packet.
   *
   * @protected
   */
  onPacket(e) {
    super.emitReserved("packet", e);
  }
  /**
   * Called upon close.
   *
   * @protected
   */
  onClose(e) {
    this.readyState = "closed", super.emitReserved("close", e);
  }
  /**
   * Pauses the transport, in order not to lose packets during an upgrade.
   *
   * @param onPause
   */
  pause(e) {
  }
  createUri(e, t = {}) {
    return e + "://" + this._hostname() + this._port() + this.opts.path + this._query(t);
  }
  _hostname() {
    const e = this.opts.hostname;
    return e.indexOf(":") === -1 ? e : "[" + e + "]";
  }
  _port() {
    return this.opts.port && (this.opts.secure && +(this.opts.port !== 443) || !this.opts.secure && Number(this.opts.port) !== 80) ? ":" + this.opts.port : "";
  }
  _query(e) {
    const t = encode(e);
    return t.length ? "?" + t : "";
  }
}
class Polling extends Transport {
  constructor() {
    super(...arguments), this._polling = !1;
  }
  get name() {
    return "polling";
  }
  /**
   * Opens the socket (triggers polling). We write a PING message to determine
   * when the transport is open.
   *
   * @protected
   */
  doOpen() {
    this._poll();
  }
  /**
   * Pauses polling.
   *
   * @param {Function} onPause - callback upon buffers are flushed and transport is paused
   * @package
   */
  pause(e) {
    this.readyState = "pausing";
    const t = () => {
      this.readyState = "paused", e();
    };
    if (this._polling || !this.writable) {
      let r = 0;
      this._polling && (r++, this.once("pollComplete", function() {
        --r || t();
      })), this.writable || (r++, this.once("drain", function() {
        --r || t();
      }));
    } else
      t();
  }
  /**
   * Starts polling cycle.
   *
   * @private
   */
  _poll() {
    this._polling = !0, this.doPoll(), this.emitReserved("poll");
  }
  /**
   * Overloads onData to detect payloads.
   *
   * @protected
   */
  onData(e) {
    const t = (r) => {
      if (this.readyState === "opening" && r.type === "open" && this.onOpen(), r.type === "close")
        return this.onClose({ description: "transport closed by the server" }), !1;
      this.onPacket(r);
    };
    decodePayload(e, this.socket.binaryType).forEach(t), this.readyState !== "closed" && (this._polling = !1, this.emitReserved("pollComplete"), this.readyState === "open" && this._poll());
  }
  /**
   * For polling, send a close packet.
   *
   * @protected
   */
  doClose() {
    const e = () => {
      this.write([{ type: "close" }]);
    };
    this.readyState === "open" ? e() : this.once("open", e);
  }
  /**
   * Writes a packets payload.
   *
   * @param {Array} packets - data packets
   * @protected
   */
  write(e) {
    this.writable = !1, encodePayload(e, (t) => {
      this.doWrite(t, () => {
        this.writable = !0, this.emitReserved("drain");
      });
    });
  }
  /**
   * Generates uri for connection.
   *
   * @private
   */
  uri() {
    const e = this.opts.secure ? "https" : "http", t = this.query || {};
    return this.opts.timestampRequests !== !1 && (t[this.opts.timestampParam] = randomString()), !this.supportsBinary && !t.sid && (t.b64 = 1), this.createUri(e, t);
  }
}
let value = !1;
try {
  value = typeof XMLHttpRequest < "u" && "withCredentials" in new XMLHttpRequest();
} catch {
}
const hasCORS = value;
function empty() {
}
class BaseXHR extends Polling {
  /**
   * XHR Polling constructor.
   *
   * @param {Object} opts
   * @package
   */
  constructor(e) {
    if (super(e), typeof location < "u") {
      const t = location.protocol === "https:";
      let r = location.port;
      r || (r = t ? "443" : "80"), this.xd = typeof location < "u" && e.hostname !== location.hostname || r !== e.port;
    }
  }
  /**
   * Sends data.
   *
   * @param {String} data to send.
   * @param {Function} called upon flush.
   * @private
   */
  doWrite(e, t) {
    const r = this.request({
      method: "POST",
      data: e
    });
    r.on("success", t), r.on("error", (a, o) => {
      this.onError("xhr post error", a, o);
    });
  }
  /**
   * Starts a poll cycle.
   *
   * @private
   */
  doPoll() {
    const e = this.request();
    e.on("data", this.onData.bind(this)), e.on("error", (t, r) => {
      this.onError("xhr poll error", t, r);
    }), this.pollXhr = e;
  }
}
class Request extends Emitter {
  /**
   * Request constructor
   *
   * @param {Object} options
   * @package
   */
  constructor(e, t, r) {
    super(), this.createRequest = e, installTimerFunctions(this, r), this._opts = r, this._method = r.method || "GET", this._uri = t, this._data = r.data !== void 0 ? r.data : null, this._create();
  }
  /**
   * Creates the XHR object and sends the request.
   *
   * @private
   */
  _create() {
    var e;
    const t = pick(this._opts, "agent", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
    t.xdomain = !!this._opts.xd;
    const r = this._xhr = this.createRequest(t);
    try {
      r.open(this._method, this._uri, !0);
      try {
        if (this._opts.extraHeaders) {
          r.setDisableHeaderCheck && r.setDisableHeaderCheck(!0);
          for (let a in this._opts.extraHeaders)
            this._opts.extraHeaders.hasOwnProperty(a) && r.setRequestHeader(a, this._opts.extraHeaders[a]);
        }
      } catch {
      }
      if (this._method === "POST")
        try {
          r.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
        } catch {
        }
      try {
        r.setRequestHeader("Accept", "*/*");
      } catch {
      }
      (e = this._opts.cookieJar) === null || e === void 0 || e.addCookies(r), "withCredentials" in r && (r.withCredentials = this._opts.withCredentials), this._opts.requestTimeout && (r.timeout = this._opts.requestTimeout), r.onreadystatechange = () => {
        var a;
        r.readyState === 3 && ((a = this._opts.cookieJar) === null || a === void 0 || a.parseCookies(
          // @ts-ignore
          r.getResponseHeader("set-cookie")
        )), r.readyState === 4 && (r.status === 200 || r.status === 1223 ? this._onLoad() : this.setTimeoutFn(() => {
          this._onError(typeof r.status == "number" ? r.status : 0);
        }, 0));
      }, r.send(this._data);
    } catch (a) {
      this.setTimeoutFn(() => {
        this._onError(a);
      }, 0);
      return;
    }
    typeof document < "u" && (this._index = Request.requestsCount++, Request.requests[this._index] = this);
  }
  /**
   * Called upon error.
   *
   * @private
   */
  _onError(e) {
    this.emitReserved("error", e, this._xhr), this._cleanup(!0);
  }
  /**
   * Cleans up house.
   *
   * @private
   */
  _cleanup(e) {
    if (!(typeof this._xhr > "u" || this._xhr === null)) {
      if (this._xhr.onreadystatechange = empty, e)
        try {
          this._xhr.abort();
        } catch {
        }
      typeof document < "u" && delete Request.requests[this._index], this._xhr = null;
    }
  }
  /**
   * Called upon load.
   *
   * @private
   */
  _onLoad() {
    const e = this._xhr.responseText;
    e !== null && (this.emitReserved("data", e), this.emitReserved("success"), this._cleanup());
  }
  /**
   * Aborts the request.
   *
   * @package
   */
  abort() {
    this._cleanup();
  }
}
Request.requestsCount = 0;
Request.requests = {};
if (typeof document < "u") {
  if (typeof attachEvent == "function")
    attachEvent("onunload", unloadHandler);
  else if (typeof addEventListener == "function") {
    const n = "onpagehide" in globalThisShim ? "pagehide" : "unload";
    addEventListener(n, unloadHandler, !1);
  }
}
function unloadHandler() {
  for (let n in Request.requests)
    Request.requests.hasOwnProperty(n) && Request.requests[n].abort();
}
const hasXHR2 = function() {
  const n = newRequest({
    xdomain: !1
  });
  return n && n.responseType !== null;
}();
class XHR extends BaseXHR {
  constructor(e) {
    super(e);
    const t = e && e.forceBase64;
    this.supportsBinary = hasXHR2 && !t;
  }
  request(e = {}) {
    return Object.assign(e, { xd: this.xd }, this.opts), new Request(newRequest, this.uri(), e);
  }
}
function newRequest(n) {
  const e = n.xdomain;
  try {
    if (typeof XMLHttpRequest < "u" && (!e || hasCORS))
      return new XMLHttpRequest();
  } catch {
  }
  if (!e)
    try {
      return new globalThisShim[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
    } catch {
    }
}
const isReactNative = typeof navigator < "u" && typeof navigator.product == "string" && navigator.product.toLowerCase() === "reactnative";
class BaseWS extends Transport {
  get name() {
    return "websocket";
  }
  doOpen() {
    const e = this.uri(), t = this.opts.protocols, r = isReactNative ? {} : pick(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");
    this.opts.extraHeaders && (r.headers = this.opts.extraHeaders);
    try {
      this.ws = this.createSocket(e, t, r);
    } catch (a) {
      return this.emitReserved("error", a);
    }
    this.ws.binaryType = this.socket.binaryType, this.addEventListeners();
  }
  /**
   * Adds event listeners to the socket
   *
   * @private
   */
  addEventListeners() {
    this.ws.onopen = () => {
      this.opts.autoUnref && this.ws._socket.unref(), this.onOpen();
    }, this.ws.onclose = (e) => this.onClose({
      description: "websocket connection closed",
      context: e
    }), this.ws.onmessage = (e) => this.onData(e.data), this.ws.onerror = (e) => this.onError("websocket error", e);
  }
  write(e) {
    this.writable = !1;
    for (let t = 0; t < e.length; t++) {
      const r = e[t], a = t === e.length - 1;
      encodePacket(r, this.supportsBinary, (o) => {
        try {
          this.doWrite(r, o);
        } catch {
        }
        a && nextTick(() => {
          this.writable = !0, this.emitReserved("drain");
        }, this.setTimeoutFn);
      });
    }
  }
  doClose() {
    typeof this.ws < "u" && (this.ws.onerror = () => {
    }, this.ws.close(), this.ws = null);
  }
  /**
   * Generates uri for connection.
   *
   * @private
   */
  uri() {
    const e = this.opts.secure ? "wss" : "ws", t = this.query || {};
    return this.opts.timestampRequests && (t[this.opts.timestampParam] = randomString()), this.supportsBinary || (t.b64 = 1), this.createUri(e, t);
  }
}
const WebSocketCtor = globalThisShim.WebSocket || globalThisShim.MozWebSocket;
class WS extends BaseWS {
  createSocket(e, t, r) {
    return isReactNative ? new WebSocketCtor(e, t, r) : t ? new WebSocketCtor(e, t) : new WebSocketCtor(e);
  }
  doWrite(e, t) {
    this.ws.send(t);
  }
}
class WT extends Transport {
  get name() {
    return "webtransport";
  }
  doOpen() {
    try {
      this._transport = new WebTransport(this.createUri("https"), this.opts.transportOptions[this.name]);
    } catch (e) {
      return this.emitReserved("error", e);
    }
    this._transport.closed.then(() => {
      this.onClose();
    }).catch((e) => {
      this.onError("webtransport error", e);
    }), this._transport.ready.then(() => {
      this._transport.createBidirectionalStream().then((e) => {
        const t = createPacketDecoderStream(Number.MAX_SAFE_INTEGER, this.socket.binaryType), r = e.readable.pipeThrough(t).getReader(), a = createPacketEncoderStream();
        a.readable.pipeTo(e.writable), this._writer = a.writable.getWriter();
        const o = () => {
          r.read().then(({ done: u, value: h }) => {
            u || (this.onPacket(h), o());
          }).catch((u) => {
          });
        };
        o();
        const s = { type: "open" };
        this.query.sid && (s.data = `{"sid":"${this.query.sid}"}`), this._writer.write(s).then(() => this.onOpen());
      });
    });
  }
  write(e) {
    this.writable = !1;
    for (let t = 0; t < e.length; t++) {
      const r = e[t], a = t === e.length - 1;
      this._writer.write(r).then(() => {
        a && nextTick(() => {
          this.writable = !0, this.emitReserved("drain");
        }, this.setTimeoutFn);
      });
    }
  }
  doClose() {
    var e;
    (e = this._transport) === null || e === void 0 || e.close();
  }
}
const transports = {
  websocket: WS,
  webtransport: WT,
  polling: XHR
}, re = /^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/, parts = [
  "source",
  "protocol",
  "authority",
  "userInfo",
  "user",
  "password",
  "host",
  "port",
  "relative",
  "path",
  "directory",
  "file",
  "query",
  "anchor"
];
function parse(n) {
  if (n.length > 8e3)
    throw "URI too long";
  const e = n, t = n.indexOf("["), r = n.indexOf("]");
  t != -1 && r != -1 && (n = n.substring(0, t) + n.substring(t, r).replace(/:/g, ";") + n.substring(r, n.length));
  let a = re.exec(n || ""), o = {}, s = 14;
  for (; s--; )
    o[parts[s]] = a[s] || "";
  return t != -1 && r != -1 && (o.source = e, o.host = o.host.substring(1, o.host.length - 1).replace(/;/g, ":"), o.authority = o.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), o.ipv6uri = !0), o.pathNames = pathNames(o, o.path), o.queryKey = queryKey(o, o.query), o;
}
function pathNames(n, e) {
  const t = /\/{2,9}/g, r = e.replace(t, "/").split("/");
  return (e.slice(0, 1) == "/" || e.length === 0) && r.splice(0, 1), e.slice(-1) == "/" && r.splice(r.length - 1, 1), r;
}
function queryKey(n, e) {
  const t = {};
  return e.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function(r, a, o) {
    a && (t[a] = o);
  }), t;
}
const withEventListeners = typeof addEventListener == "function" && typeof removeEventListener == "function", OFFLINE_EVENT_LISTENERS = [];
withEventListeners && addEventListener("offline", () => {
  OFFLINE_EVENT_LISTENERS.forEach((n) => n());
}, !1);
class SocketWithoutUpgrade extends Emitter {
  /**
   * Socket constructor.
   *
   * @param {String|Object} uri - uri or options
   * @param {Object} opts - options
   */
  constructor(e, t) {
    if (super(), this.binaryType = defaultBinaryType, this.writeBuffer = [], this._prevBufferLen = 0, this._pingInterval = -1, this._pingTimeout = -1, this._maxPayload = -1, this._pingTimeoutTime = 1 / 0, e && typeof e == "object" && (t = e, e = null), e) {
      const r = parse(e);
      t.hostname = r.host, t.secure = r.protocol === "https" || r.protocol === "wss", t.port = r.port, r.query && (t.query = r.query);
    } else t.host && (t.hostname = parse(t.host).host);
    installTimerFunctions(this, t), this.secure = t.secure != null ? t.secure : typeof location < "u" && location.protocol === "https:", t.hostname && !t.port && (t.port = this.secure ? "443" : "80"), this.hostname = t.hostname || (typeof location < "u" ? location.hostname : "localhost"), this.port = t.port || (typeof location < "u" && location.port ? location.port : this.secure ? "443" : "80"), this.transports = [], this._transportsByName = {}, t.transports.forEach((r) => {
      const a = r.prototype.name;
      this.transports.push(a), this._transportsByName[a] = r;
    }), this.opts = Object.assign({
      path: "/engine.io",
      agent: !1,
      withCredentials: !1,
      upgrade: !0,
      timestampParam: "t",
      rememberUpgrade: !1,
      addTrailingSlash: !0,
      rejectUnauthorized: !0,
      perMessageDeflate: {
        threshold: 1024
      },
      transportOptions: {},
      closeOnBeforeunload: !1
    }, t), this.opts.path = this.opts.path.replace(/\/$/, "") + (this.opts.addTrailingSlash ? "/" : ""), typeof this.opts.query == "string" && (this.opts.query = decode(this.opts.query)), withEventListeners && (this.opts.closeOnBeforeunload && (this._beforeunloadEventListener = () => {
      this.transport && (this.transport.removeAllListeners(), this.transport.close());
    }, addEventListener("beforeunload", this._beforeunloadEventListener, !1)), this.hostname !== "localhost" && (this._offlineEventListener = () => {
      this._onClose("transport close", {
        description: "network connection lost"
      });
    }, OFFLINE_EVENT_LISTENERS.push(this._offlineEventListener))), this.opts.withCredentials && (this._cookieJar = void 0), this._open();
  }
  /**
   * Creates transport of the given type.
   *
   * @param {String} name - transport name
   * @return {Transport}
   * @private
   */
  createTransport(e) {
    const t = Object.assign({}, this.opts.query);
    t.EIO = protocol$1, t.transport = e, this.id && (t.sid = this.id);
    const r = Object.assign({}, this.opts, {
      query: t,
      socket: this,
      hostname: this.hostname,
      secure: this.secure,
      port: this.port
    }, this.opts.transportOptions[e]);
    return new this._transportsByName[e](r);
  }
  /**
   * Initializes transport to use and starts probe.
   *
   * @private
   */
  _open() {
    if (this.transports.length === 0) {
      this.setTimeoutFn(() => {
        this.emitReserved("error", "No transports available");
      }, 0);
      return;
    }
    const e = this.opts.rememberUpgrade && SocketWithoutUpgrade.priorWebsocketSuccess && this.transports.indexOf("websocket") !== -1 ? "websocket" : this.transports[0];
    this.readyState = "opening";
    const t = this.createTransport(e);
    t.open(), this.setTransport(t);
  }
  /**
   * Sets the current transport. Disables the existing one (if any).
   *
   * @private
   */
  setTransport(e) {
    this.transport && this.transport.removeAllListeners(), this.transport = e, e.on("drain", this._onDrain.bind(this)).on("packet", this._onPacket.bind(this)).on("error", this._onError.bind(this)).on("close", (t) => this._onClose("transport close", t));
  }
  /**
   * Called when connection is deemed open.
   *
   * @private
   */
  onOpen() {
    this.readyState = "open", SocketWithoutUpgrade.priorWebsocketSuccess = this.transport.name === "websocket", this.emitReserved("open"), this.flush();
  }
  /**
   * Handles a packet.
   *
   * @private
   */
  _onPacket(e) {
    if (this.readyState === "opening" || this.readyState === "open" || this.readyState === "closing")
      switch (this.emitReserved("packet", e), this.emitReserved("heartbeat"), e.type) {
        case "open":
          this.onHandshake(JSON.parse(e.data));
          break;
        case "ping":
          this._sendPacket("pong"), this.emitReserved("ping"), this.emitReserved("pong"), this._resetPingTimeout();
          break;
        case "error":
          const t = new Error("server error");
          t.code = e.data, this._onError(t);
          break;
        case "message":
          this.emitReserved("data", e.data), this.emitReserved("message", e.data);
          break;
      }
  }
  /**
   * Called upon handshake completion.
   *
   * @param {Object} data - handshake obj
   * @private
   */
  onHandshake(e) {
    this.emitReserved("handshake", e), this.id = e.sid, this.transport.query.sid = e.sid, this._pingInterval = e.pingInterval, this._pingTimeout = e.pingTimeout, this._maxPayload = e.maxPayload, this.onOpen(), this.readyState !== "closed" && this._resetPingTimeout();
  }
  /**
   * Sets and resets ping timeout timer based on server pings.
   *
   * @private
   */
  _resetPingTimeout() {
    this.clearTimeoutFn(this._pingTimeoutTimer);
    const e = this._pingInterval + this._pingTimeout;
    this._pingTimeoutTime = Date.now() + e, this._pingTimeoutTimer = this.setTimeoutFn(() => {
      this._onClose("ping timeout");
    }, e), this.opts.autoUnref && this._pingTimeoutTimer.unref();
  }
  /**
   * Called on `drain` event
   *
   * @private
   */
  _onDrain() {
    this.writeBuffer.splice(0, this._prevBufferLen), this._prevBufferLen = 0, this.writeBuffer.length === 0 ? this.emitReserved("drain") : this.flush();
  }
  /**
   * Flush write buffers.
   *
   * @private
   */
  flush() {
    if (this.readyState !== "closed" && this.transport.writable && !this.upgrading && this.writeBuffer.length) {
      const e = this._getWritablePackets();
      this.transport.send(e), this._prevBufferLen = e.length, this.emitReserved("flush");
    }
  }
  /**
   * Ensure the encoded size of the writeBuffer is below the maxPayload value sent by the server (only for HTTP
   * long-polling)
   *
   * @private
   */
  _getWritablePackets() {
    if (!(this._maxPayload && this.transport.name === "polling" && this.writeBuffer.length > 1))
      return this.writeBuffer;
    let t = 1;
    for (let r = 0; r < this.writeBuffer.length; r++) {
      const a = this.writeBuffer[r].data;
      if (a && (t += byteLength(a)), r > 0 && t > this._maxPayload)
        return this.writeBuffer.slice(0, r);
      t += 2;
    }
    return this.writeBuffer;
  }
  /**
   * Checks whether the heartbeat timer has expired but the socket has not yet been notified.
   *
   * Note: this method is private for now because it does not really fit the WebSocket API, but if we put it in the
   * `write()` method then the message would not be buffered by the Socket.IO client.
   *
   * @return {boolean}
   * @private
   */
  /* private */
  _hasPingExpired() {
    if (!this._pingTimeoutTime)
      return !0;
    const e = Date.now() > this._pingTimeoutTime;
    return e && (this._pingTimeoutTime = 0, nextTick(() => {
      this._onClose("ping timeout");
    }, this.setTimeoutFn)), e;
  }
  /**
   * Sends a message.
   *
   * @param {String} msg - message.
   * @param {Object} options.
   * @param {Function} fn - callback function.
   * @return {Socket} for chaining.
   */
  write(e, t, r) {
    return this._sendPacket("message", e, t, r), this;
  }
  /**
   * Sends a message. Alias of {@link Socket#write}.
   *
   * @param {String} msg - message.
   * @param {Object} options.
   * @param {Function} fn - callback function.
   * @return {Socket} for chaining.
   */
  send(e, t, r) {
    return this._sendPacket("message", e, t, r), this;
  }
  /**
   * Sends a packet.
   *
   * @param {String} type: packet type.
   * @param {String} data.
   * @param {Object} options.
   * @param {Function} fn - callback function.
   * @private
   */
  _sendPacket(e, t, r, a) {
    if (typeof t == "function" && (a = t, t = void 0), typeof r == "function" && (a = r, r = null), this.readyState === "closing" || this.readyState === "closed")
      return;
    r = r || {}, r.compress = r.compress !== !1;
    const o = {
      type: e,
      data: t,
      options: r
    };
    this.emitReserved("packetCreate", o), this.writeBuffer.push(o), a && this.once("flush", a), this.flush();
  }
  /**
   * Closes the connection.
   */
  close() {
    const e = () => {
      this._onClose("forced close"), this.transport.close();
    }, t = () => {
      this.off("upgrade", t), this.off("upgradeError", t), e();
    }, r = () => {
      this.once("upgrade", t), this.once("upgradeError", t);
    };
    return (this.readyState === "opening" || this.readyState === "open") && (this.readyState = "closing", this.writeBuffer.length ? this.once("drain", () => {
      this.upgrading ? r() : e();
    }) : this.upgrading ? r() : e()), this;
  }
  /**
   * Called upon transport error
   *
   * @private
   */
  _onError(e) {
    if (SocketWithoutUpgrade.priorWebsocketSuccess = !1, this.opts.tryAllTransports && this.transports.length > 1 && this.readyState === "opening")
      return this.transports.shift(), this._open();
    this.emitReserved("error", e), this._onClose("transport error", e);
  }
  /**
   * Called upon transport close.
   *
   * @private
   */
  _onClose(e, t) {
    if (this.readyState === "opening" || this.readyState === "open" || this.readyState === "closing") {
      if (this.clearTimeoutFn(this._pingTimeoutTimer), this.transport.removeAllListeners("close"), this.transport.close(), this.transport.removeAllListeners(), withEventListeners && (this._beforeunloadEventListener && removeEventListener("beforeunload", this._beforeunloadEventListener, !1), this._offlineEventListener)) {
        const r = OFFLINE_EVENT_LISTENERS.indexOf(this._offlineEventListener);
        r !== -1 && OFFLINE_EVENT_LISTENERS.splice(r, 1);
      }
      this.readyState = "closed", this.id = null, this.emitReserved("close", e, t), this.writeBuffer = [], this._prevBufferLen = 0;
    }
  }
}
SocketWithoutUpgrade.protocol = protocol$1;
class SocketWithUpgrade extends SocketWithoutUpgrade {
  constructor() {
    super(...arguments), this._upgrades = [];
  }
  onOpen() {
    if (super.onOpen(), this.readyState === "open" && this.opts.upgrade)
      for (let e = 0; e < this._upgrades.length; e++)
        this._probe(this._upgrades[e]);
  }
  /**
   * Probes a transport.
   *
   * @param {String} name - transport name
   * @private
   */
  _probe(e) {
    let t = this.createTransport(e), r = !1;
    SocketWithoutUpgrade.priorWebsocketSuccess = !1;
    const a = () => {
      r || (t.send([{ type: "ping", data: "probe" }]), t.once("packet", (v) => {
        if (!r)
          if (v.type === "pong" && v.data === "probe") {
            if (this.upgrading = !0, this.emitReserved("upgrading", t), !t)
              return;
            SocketWithoutUpgrade.priorWebsocketSuccess = t.name === "websocket", this.transport.pause(() => {
              r || this.readyState !== "closed" && (c(), this.setTransport(t), t.send([{ type: "upgrade" }]), this.emitReserved("upgrade", t), t = null, this.upgrading = !1, this.flush());
            });
          } else {
            const d = new Error("probe error");
            d.transport = t.name, this.emitReserved("upgradeError", d);
          }
      }));
    };
    function o() {
      r || (r = !0, c(), t.close(), t = null);
    }
    const s = (v) => {
      const d = new Error("probe error: " + v);
      d.transport = t.name, o(), this.emitReserved("upgradeError", d);
    };
    function u() {
      s("transport closed");
    }
    function h() {
      s("socket closed");
    }
    function l(v) {
      t && v.name !== t.name && o();
    }
    const c = () => {
      t.removeListener("open", a), t.removeListener("error", s), t.removeListener("close", u), this.off("close", h), this.off("upgrading", l);
    };
    t.once("open", a), t.once("error", s), t.once("close", u), this.once("close", h), this.once("upgrading", l), this._upgrades.indexOf("webtransport") !== -1 && e !== "webtransport" ? this.setTimeoutFn(() => {
      r || t.open();
    }, 200) : t.open();
  }
  onHandshake(e) {
    this._upgrades = this._filterUpgrades(e.upgrades), super.onHandshake(e);
  }
  /**
   * Filters upgrades, returning only those matching client transports.
   *
   * @param {Array} upgrades - server upgrades
   * @private
   */
  _filterUpgrades(e) {
    const t = [];
    for (let r = 0; r < e.length; r++)
      ~this.transports.indexOf(e[r]) && t.push(e[r]);
    return t;
  }
}
let Socket$1 = class extends SocketWithUpgrade {
  constructor(e, t = {}) {
    const r = typeof e == "object" ? e : t;
    (!r.transports || r.transports && typeof r.transports[0] == "string") && (r.transports = (r.transports || ["polling", "websocket", "webtransport"]).map((a) => transports[a]).filter((a) => !!a)), super(e, r);
  }
};
function url(n, e = "", t) {
  let r = n;
  t = t || typeof location < "u" && location, n == null && (n = t.protocol + "//" + t.host), typeof n == "string" && (n.charAt(0) === "/" && (n.charAt(1) === "/" ? n = t.protocol + n : n = t.host + n), /^(https?|wss?):\/\//.test(n) || (typeof t < "u" ? n = t.protocol + "//" + n : n = "https://" + n), r = parse(n)), r.port || (/^(http|ws)$/.test(r.protocol) ? r.port = "80" : /^(http|ws)s$/.test(r.protocol) && (r.port = "443")), r.path = r.path || "/";
  const o = r.host.indexOf(":") !== -1 ? "[" + r.host + "]" : r.host;
  return r.id = r.protocol + "://" + o + ":" + r.port + e, r.href = r.protocol + "://" + o + (t && t.port === r.port ? "" : ":" + r.port), r;
}
const withNativeArrayBuffer = typeof ArrayBuffer == "function", isView = (n) => typeof ArrayBuffer.isView == "function" ? ArrayBuffer.isView(n) : n.buffer instanceof ArrayBuffer, toString = Object.prototype.toString, withNativeBlob = typeof Blob == "function" || typeof Blob < "u" && toString.call(Blob) === "[object BlobConstructor]", withNativeFile = typeof File == "function" || typeof File < "u" && toString.call(File) === "[object FileConstructor]";
function isBinary(n) {
  return withNativeArrayBuffer && (n instanceof ArrayBuffer || isView(n)) || withNativeBlob && n instanceof Blob || withNativeFile && n instanceof File;
}
function hasBinary(n, e) {
  if (!n || typeof n != "object")
    return !1;
  if (Array.isArray(n)) {
    for (let t = 0, r = n.length; t < r; t++)
      if (hasBinary(n[t]))
        return !0;
    return !1;
  }
  if (isBinary(n))
    return !0;
  if (n.toJSON && typeof n.toJSON == "function" && arguments.length === 1)
    return hasBinary(n.toJSON(), !0);
  for (const t in n)
    if (Object.prototype.hasOwnProperty.call(n, t) && hasBinary(n[t]))
      return !0;
  return !1;
}
function deconstructPacket(n) {
  const e = [], t = n.data, r = n;
  return r.data = _deconstructPacket(t, e), r.attachments = e.length, { packet: r, buffers: e };
}
function _deconstructPacket(n, e) {
  if (!n)
    return n;
  if (isBinary(n)) {
    const t = { _placeholder: !0, num: e.length };
    return e.push(n), t;
  } else if (Array.isArray(n)) {
    const t = new Array(n.length);
    for (let r = 0; r < n.length; r++)
      t[r] = _deconstructPacket(n[r], e);
    return t;
  } else if (typeof n == "object" && !(n instanceof Date)) {
    const t = {};
    for (const r in n)
      Object.prototype.hasOwnProperty.call(n, r) && (t[r] = _deconstructPacket(n[r], e));
    return t;
  }
  return n;
}
function reconstructPacket(n, e) {
  return n.data = _reconstructPacket(n.data, e), delete n.attachments, n;
}
function _reconstructPacket(n, e) {
  if (!n)
    return n;
  if (n && n._placeholder === !0) {
    if (typeof n.num == "number" && n.num >= 0 && n.num < e.length)
      return e[n.num];
    throw new Error("illegal attachments");
  } else if (Array.isArray(n))
    for (let t = 0; t < n.length; t++)
      n[t] = _reconstructPacket(n[t], e);
  else if (typeof n == "object")
    for (const t in n)
      Object.prototype.hasOwnProperty.call(n, t) && (n[t] = _reconstructPacket(n[t], e));
  return n;
}
const RESERVED_EVENTS$1 = [
  "connect",
  "connect_error",
  "disconnect",
  "disconnecting",
  "newListener",
  "removeListener"
  // used by the Node.js EventEmitter
], protocol = 5;
var PacketType;
(function(n) {
  n[n.CONNECT = 0] = "CONNECT", n[n.DISCONNECT = 1] = "DISCONNECT", n[n.EVENT = 2] = "EVENT", n[n.ACK = 3] = "ACK", n[n.CONNECT_ERROR = 4] = "CONNECT_ERROR", n[n.BINARY_EVENT = 5] = "BINARY_EVENT", n[n.BINARY_ACK = 6] = "BINARY_ACK";
})(PacketType || (PacketType = {}));
class Encoder {
  /**
   * Encoder constructor
   *
   * @param {function} replacer - custom replacer to pass down to JSON.parse
   */
  constructor(e) {
    this.replacer = e;
  }
  /**
   * Encode a packet as a single string if non-binary, or as a
   * buffer sequence, depending on packet type.
   *
   * @param {Object} obj - packet object
   */
  encode(e) {
    return (e.type === PacketType.EVENT || e.type === PacketType.ACK) && hasBinary(e) ? this.encodeAsBinary({
      type: e.type === PacketType.EVENT ? PacketType.BINARY_EVENT : PacketType.BINARY_ACK,
      nsp: e.nsp,
      data: e.data,
      id: e.id
    }) : [this.encodeAsString(e)];
  }
  /**
   * Encode packet as string.
   */
  encodeAsString(e) {
    let t = "" + e.type;
    return (e.type === PacketType.BINARY_EVENT || e.type === PacketType.BINARY_ACK) && (t += e.attachments + "-"), e.nsp && e.nsp !== "/" && (t += e.nsp + ","), e.id != null && (t += e.id), e.data != null && (t += JSON.stringify(e.data, this.replacer)), t;
  }
  /**
   * Encode packet as 'buffer sequence' by removing blobs, and
   * deconstructing packet into object with placeholders and
   * a list of buffers.
   */
  encodeAsBinary(e) {
    const t = deconstructPacket(e), r = this.encodeAsString(t.packet), a = t.buffers;
    return a.unshift(r), a;
  }
}
function isObject(n) {
  return Object.prototype.toString.call(n) === "[object Object]";
}
class Decoder extends Emitter {
  /**
   * Decoder constructor
   *
   * @param {function} reviver - custom reviver to pass down to JSON.stringify
   */
  constructor(e) {
    super(), this.reviver = e;
  }
  /**
   * Decodes an encoded packet string into packet JSON.
   *
   * @param {String} obj - encoded packet
   */
  add(e) {
    let t;
    if (typeof e == "string") {
      if (this.reconstructor)
        throw new Error("got plaintext data when reconstructing a packet");
      t = this.decodeString(e);
      const r = t.type === PacketType.BINARY_EVENT;
      r || t.type === PacketType.BINARY_ACK ? (t.type = r ? PacketType.EVENT : PacketType.ACK, this.reconstructor = new BinaryReconstructor(t), t.attachments === 0 && super.emitReserved("decoded", t)) : super.emitReserved("decoded", t);
    } else if (isBinary(e) || e.base64)
      if (this.reconstructor)
        t = this.reconstructor.takeBinaryData(e), t && (this.reconstructor = null, super.emitReserved("decoded", t));
      else
        throw new Error("got binary data when not reconstructing a packet");
    else
      throw new Error("Unknown type: " + e);
  }
  /**
   * Decode a packet String (JSON data)
   *
   * @param {String} str
   * @return {Object} packet
   */
  decodeString(e) {
    let t = 0;
    const r = {
      type: Number(e.charAt(0))
    };
    if (PacketType[r.type] === void 0)
      throw new Error("unknown packet type " + r.type);
    if (r.type === PacketType.BINARY_EVENT || r.type === PacketType.BINARY_ACK) {
      const o = t + 1;
      for (; e.charAt(++t) !== "-" && t != e.length; )
        ;
      const s = e.substring(o, t);
      if (s != Number(s) || e.charAt(t) !== "-")
        throw new Error("Illegal attachments");
      r.attachments = Number(s);
    }
    if (e.charAt(t + 1) === "/") {
      const o = t + 1;
      for (; ++t && !(e.charAt(t) === "," || t === e.length); )
        ;
      r.nsp = e.substring(o, t);
    } else
      r.nsp = "/";
    const a = e.charAt(t + 1);
    if (a !== "" && Number(a) == a) {
      const o = t + 1;
      for (; ++t; ) {
        const s = e.charAt(t);
        if (s == null || Number(s) != s) {
          --t;
          break;
        }
        if (t === e.length)
          break;
      }
      r.id = Number(e.substring(o, t + 1));
    }
    if (e.charAt(++t)) {
      const o = this.tryParse(e.substr(t));
      if (Decoder.isPayloadValid(r.type, o))
        r.data = o;
      else
        throw new Error("invalid payload");
    }
    return r;
  }
  tryParse(e) {
    try {
      return JSON.parse(e, this.reviver);
    } catch {
      return !1;
    }
  }
  static isPayloadValid(e, t) {
    switch (e) {
      case PacketType.CONNECT:
        return isObject(t);
      case PacketType.DISCONNECT:
        return t === void 0;
      case PacketType.CONNECT_ERROR:
        return typeof t == "string" || isObject(t);
      case PacketType.EVENT:
      case PacketType.BINARY_EVENT:
        return Array.isArray(t) && (typeof t[0] == "number" || typeof t[0] == "string" && RESERVED_EVENTS$1.indexOf(t[0]) === -1);
      case PacketType.ACK:
      case PacketType.BINARY_ACK:
        return Array.isArray(t);
    }
  }
  /**
   * Deallocates a parser's resources
   */
  destroy() {
    this.reconstructor && (this.reconstructor.finishedReconstruction(), this.reconstructor = null);
  }
}
class BinaryReconstructor {
  constructor(e) {
    this.packet = e, this.buffers = [], this.reconPack = e;
  }
  /**
   * Method to be called when binary data received from connection
   * after a BINARY_EVENT packet.
   *
   * @param {Buffer | ArrayBuffer} binData - the raw binary data received
   * @return {null | Object} returns null if more binary data is expected or
   *   a reconstructed packet object if all buffers have been received.
   */
  takeBinaryData(e) {
    if (this.buffers.push(e), this.buffers.length === this.reconPack.attachments) {
      const t = reconstructPacket(this.reconPack, this.buffers);
      return this.finishedReconstruction(), t;
    }
    return null;
  }
  /**
   * Cleans up binary packet reconstruction variables.
   */
  finishedReconstruction() {
    this.reconPack = null, this.buffers = [];
  }
}
const parser = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Decoder,
  Encoder,
  get PacketType() {
    return PacketType;
  },
  protocol
}, Symbol.toStringTag, { value: "Module" }));
function on(n, e, t) {
  return n.on(e, t), function() {
    n.off(e, t);
  };
}
const RESERVED_EVENTS = Object.freeze({
  connect: 1,
  connect_error: 1,
  disconnect: 1,
  disconnecting: 1,
  // EventEmitter reserved events: https://nodejs.org/api/events.html#events_event_newlistener
  newListener: 1,
  removeListener: 1
});
class Socket extends Emitter {
  /**
   * `Socket` constructor.
   */
  constructor(e, t, r) {
    super(), this.connected = !1, this.recovered = !1, this.receiveBuffer = [], this.sendBuffer = [], this._queue = [], this._queueSeq = 0, this.ids = 0, this.acks = {}, this.flags = {}, this.io = e, this.nsp = t, r && r.auth && (this.auth = r.auth), this._opts = Object.assign({}, r), this.io._autoConnect && this.open();
  }
  /**
   * Whether the socket is currently disconnected
   *
   * @example
   * const socket = io();
   *
   * socket.on("connect", () => {
   *   console.log(socket.disconnected); // false
   * });
   *
   * socket.on("disconnect", () => {
   *   console.log(socket.disconnected); // true
   * });
   */
  get disconnected() {
    return !this.connected;
  }
  /**
   * Subscribe to open, close and packet events
   *
   * @private
   */
  subEvents() {
    if (this.subs)
      return;
    const e = this.io;
    this.subs = [
      on(e, "open", this.onopen.bind(this)),
      on(e, "packet", this.onpacket.bind(this)),
      on(e, "error", this.onerror.bind(this)),
      on(e, "close", this.onclose.bind(this))
    ];
  }
  /**
   * Whether the Socket will try to reconnect when its Manager connects or reconnects.
   *
   * @example
   * const socket = io();
   *
   * console.log(socket.active); // true
   *
   * socket.on("disconnect", (reason) => {
   *   if (reason === "io server disconnect") {
   *     // the disconnection was initiated by the server, you need to manually reconnect
   *     console.log(socket.active); // false
   *   }
   *   // else the socket will automatically try to reconnect
   *   console.log(socket.active); // true
   * });
   */
  get active() {
    return !!this.subs;
  }
  /**
   * "Opens" the socket.
   *
   * @example
   * const socket = io({
   *   autoConnect: false
   * });
   *
   * socket.connect();
   */
  connect() {
    return this.connected ? this : (this.subEvents(), this.io._reconnecting || this.io.open(), this.io._readyState === "open" && this.onopen(), this);
  }
  /**
   * Alias for {@link connect()}.
   */
  open() {
    return this.connect();
  }
  /**
   * Sends a `message` event.
   *
   * This method mimics the WebSocket.send() method.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send
   *
   * @example
   * socket.send("hello");
   *
   * // this is equivalent to
   * socket.emit("message", "hello");
   *
   * @return self
   */
  send(...e) {
    return e.unshift("message"), this.emit.apply(this, e), this;
  }
  /**
   * Override `emit`.
   * If the event is in `events`, it's emitted normally.
   *
   * @example
   * socket.emit("hello", "world");
   *
   * // all serializable datastructures are supported (no need to call JSON.stringify)
   * socket.emit("hello", 1, "2", { 3: ["4"], 5: Uint8Array.from([6]) });
   *
   * // with an acknowledgement from the server
   * socket.emit("hello", "world", (val) => {
   *   // ...
   * });
   *
   * @return self
   */
  emit(e, ...t) {
    var r, a, o;
    if (RESERVED_EVENTS.hasOwnProperty(e))
      throw new Error('"' + e.toString() + '" is a reserved event name');
    if (t.unshift(e), this._opts.retries && !this.flags.fromQueue && !this.flags.volatile)
      return this._addToQueue(t), this;
    const s = {
      type: PacketType.EVENT,
      data: t
    };
    if (s.options = {}, s.options.compress = this.flags.compress !== !1, typeof t[t.length - 1] == "function") {
      const c = this.ids++, v = t.pop();
      this._registerAckCallback(c, v), s.id = c;
    }
    const u = (a = (r = this.io.engine) === null || r === void 0 ? void 0 : r.transport) === null || a === void 0 ? void 0 : a.writable, h = this.connected && !(!((o = this.io.engine) === null || o === void 0) && o._hasPingExpired());
    return this.flags.volatile && !u || (h ? (this.notifyOutgoingListeners(s), this.packet(s)) : this.sendBuffer.push(s)), this.flags = {}, this;
  }
  /**
   * @private
   */
  _registerAckCallback(e, t) {
    var r;
    const a = (r = this.flags.timeout) !== null && r !== void 0 ? r : this._opts.ackTimeout;
    if (a === void 0) {
      this.acks[e] = t;
      return;
    }
    const o = this.io.setTimeoutFn(() => {
      delete this.acks[e];
      for (let u = 0; u < this.sendBuffer.length; u++)
        this.sendBuffer[u].id === e && this.sendBuffer.splice(u, 1);
      t.call(this, new Error("operation has timed out"));
    }, a), s = (...u) => {
      this.io.clearTimeoutFn(o), t.apply(this, u);
    };
    s.withError = !0, this.acks[e] = s;
  }
  /**
   * Emits an event and waits for an acknowledgement
   *
   * @example
   * // without timeout
   * const response = await socket.emitWithAck("hello", "world");
   *
   * // with a specific timeout
   * try {
   *   const response = await socket.timeout(1000).emitWithAck("hello", "world");
   * } catch (err) {
   *   // the server did not acknowledge the event in the given delay
   * }
   *
   * @return a Promise that will be fulfilled when the server acknowledges the event
   */
  emitWithAck(e, ...t) {
    return new Promise((r, a) => {
      const o = (s, u) => s ? a(s) : r(u);
      o.withError = !0, t.push(o), this.emit(e, ...t);
    });
  }
  /**
   * Add the packet to the queue.
   * @param args
   * @private
   */
  _addToQueue(e) {
    let t;
    typeof e[e.length - 1] == "function" && (t = e.pop());
    const r = {
      id: this._queueSeq++,
      tryCount: 0,
      pending: !1,
      args: e,
      flags: Object.assign({ fromQueue: !0 }, this.flags)
    };
    e.push((a, ...o) => r !== this._queue[0] ? void 0 : (a !== null ? r.tryCount > this._opts.retries && (this._queue.shift(), t && t(a)) : (this._queue.shift(), t && t(null, ...o)), r.pending = !1, this._drainQueue())), this._queue.push(r), this._drainQueue();
  }
  /**
   * Send the first packet of the queue, and wait for an acknowledgement from the server.
   * @param force - whether to resend a packet that has not been acknowledged yet
   *
   * @private
   */
  _drainQueue(e = !1) {
    if (!this.connected || this._queue.length === 0)
      return;
    const t = this._queue[0];
    t.pending && !e || (t.pending = !0, t.tryCount++, this.flags = t.flags, this.emit.apply(this, t.args));
  }
  /**
   * Sends a packet.
   *
   * @param packet
   * @private
   */
  packet(e) {
    e.nsp = this.nsp, this.io._packet(e);
  }
  /**
   * Called upon engine `open`.
   *
   * @private
   */
  onopen() {
    typeof this.auth == "function" ? this.auth((e) => {
      this._sendConnectPacket(e);
    }) : this._sendConnectPacket(this.auth);
  }
  /**
   * Sends a CONNECT packet to initiate the Socket.IO session.
   *
   * @param data
   * @private
   */
  _sendConnectPacket(e) {
    this.packet({
      type: PacketType.CONNECT,
      data: this._pid ? Object.assign({ pid: this._pid, offset: this._lastOffset }, e) : e
    });
  }
  /**
   * Called upon engine or manager `error`.
   *
   * @param err
   * @private
   */
  onerror(e) {
    this.connected || this.emitReserved("connect_error", e);
  }
  /**
   * Called upon engine `close`.
   *
   * @param reason
   * @param description
   * @private
   */
  onclose(e, t) {
    this.connected = !1, delete this.id, this.emitReserved("disconnect", e, t), this._clearAcks();
  }
  /**
   * Clears the acknowledgement handlers upon disconnection, since the client will never receive an acknowledgement from
   * the server.
   *
   * @private
   */
  _clearAcks() {
    Object.keys(this.acks).forEach((e) => {
      if (!this.sendBuffer.some((r) => String(r.id) === e)) {
        const r = this.acks[e];
        delete this.acks[e], r.withError && r.call(this, new Error("socket has been disconnected"));
      }
    });
  }
  /**
   * Called with socket packet.
   *
   * @param packet
   * @private
   */
  onpacket(e) {
    if (e.nsp === this.nsp)
      switch (e.type) {
        case PacketType.CONNECT:
          e.data && e.data.sid ? this.onconnect(e.data.sid, e.data.pid) : this.emitReserved("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
          break;
        case PacketType.EVENT:
        case PacketType.BINARY_EVENT:
          this.onevent(e);
          break;
        case PacketType.ACK:
        case PacketType.BINARY_ACK:
          this.onack(e);
          break;
        case PacketType.DISCONNECT:
          this.ondisconnect();
          break;
        case PacketType.CONNECT_ERROR:
          this.destroy();
          const r = new Error(e.data.message);
          r.data = e.data.data, this.emitReserved("connect_error", r);
          break;
      }
  }
  /**
   * Called upon a server event.
   *
   * @param packet
   * @private
   */
  onevent(e) {
    const t = e.data || [];
    e.id != null && t.push(this.ack(e.id)), this.connected ? this.emitEvent(t) : this.receiveBuffer.push(Object.freeze(t));
  }
  emitEvent(e) {
    if (this._anyListeners && this._anyListeners.length) {
      const t = this._anyListeners.slice();
      for (const r of t)
        r.apply(this, e);
    }
    super.emit.apply(this, e), this._pid && e.length && typeof e[e.length - 1] == "string" && (this._lastOffset = e[e.length - 1]);
  }
  /**
   * Produces an ack callback to emit with an event.
   *
   * @private
   */
  ack(e) {
    const t = this;
    let r = !1;
    return function(...a) {
      r || (r = !0, t.packet({
        type: PacketType.ACK,
        id: e,
        data: a
      }));
    };
  }
  /**
   * Called upon a server acknowledgement.
   *
   * @param packet
   * @private
   */
  onack(e) {
    const t = this.acks[e.id];
    typeof t == "function" && (delete this.acks[e.id], t.withError && e.data.unshift(null), t.apply(this, e.data));
  }
  /**
   * Called upon server connect.
   *
   * @private
   */
  onconnect(e, t) {
    this.id = e, this.recovered = t && this._pid === t, this._pid = t, this.connected = !0, this.emitBuffered(), this.emitReserved("connect"), this._drainQueue(!0);
  }
  /**
   * Emit buffered events (received and emitted).
   *
   * @private
   */
  emitBuffered() {
    this.receiveBuffer.forEach((e) => this.emitEvent(e)), this.receiveBuffer = [], this.sendBuffer.forEach((e) => {
      this.notifyOutgoingListeners(e), this.packet(e);
    }), this.sendBuffer = [];
  }
  /**
   * Called upon server disconnect.
   *
   * @private
   */
  ondisconnect() {
    this.destroy(), this.onclose("io server disconnect");
  }
  /**
   * Called upon forced client/server side disconnections,
   * this method ensures the manager stops tracking us and
   * that reconnections don't get triggered for this.
   *
   * @private
   */
  destroy() {
    this.subs && (this.subs.forEach((e) => e()), this.subs = void 0), this.io._destroy(this);
  }
  /**
   * Disconnects the socket manually. In that case, the socket will not try to reconnect.
   *
   * If this is the last active Socket instance of the {@link Manager}, the low-level connection will be closed.
   *
   * @example
   * const socket = io();
   *
   * socket.on("disconnect", (reason) => {
   *   // console.log(reason); prints "io client disconnect"
   * });
   *
   * socket.disconnect();
   *
   * @return self
   */
  disconnect() {
    return this.connected && this.packet({ type: PacketType.DISCONNECT }), this.destroy(), this.connected && this.onclose("io client disconnect"), this;
  }
  /**
   * Alias for {@link disconnect()}.
   *
   * @return self
   */
  close() {
    return this.disconnect();
  }
  /**
   * Sets the compress flag.
   *
   * @example
   * socket.compress(false).emit("hello");
   *
   * @param compress - if `true`, compresses the sending data
   * @return self
   */
  compress(e) {
    return this.flags.compress = e, this;
  }
  /**
   * Sets a modifier for a subsequent event emission that the event message will be dropped when this socket is not
   * ready to send messages.
   *
   * @example
   * socket.volatile.emit("hello"); // the server may or may not receive it
   *
   * @returns self
   */
  get volatile() {
    return this.flags.volatile = !0, this;
  }
  /**
   * Sets a modifier for a subsequent event emission that the callback will be called with an error when the
   * given number of milliseconds have elapsed without an acknowledgement from the server:
   *
   * @example
   * socket.timeout(5000).emit("my-event", (err) => {
   *   if (err) {
   *     // the server did not acknowledge the event in the given delay
   *   }
   * });
   *
   * @returns self
   */
  timeout(e) {
    return this.flags.timeout = e, this;
  }
  /**
   * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
   * callback.
   *
   * @example
   * socket.onAny((event, ...args) => {
   *   console.log(`got ${event}`);
   * });
   *
   * @param listener
   */
  onAny(e) {
    return this._anyListeners = this._anyListeners || [], this._anyListeners.push(e), this;
  }
  /**
   * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
   * callback. The listener is added to the beginning of the listeners array.
   *
   * @example
   * socket.prependAny((event, ...args) => {
   *   console.log(`got event ${event}`);
   * });
   *
   * @param listener
   */
  prependAny(e) {
    return this._anyListeners = this._anyListeners || [], this._anyListeners.unshift(e), this;
  }
  /**
   * Removes the listener that will be fired when any event is emitted.
   *
   * @example
   * const catchAllListener = (event, ...args) => {
   *   console.log(`got event ${event}`);
   * }
   *
   * socket.onAny(catchAllListener);
   *
   * // remove a specific listener
   * socket.offAny(catchAllListener);
   *
   * // or remove all listeners
   * socket.offAny();
   *
   * @param listener
   */
  offAny(e) {
    if (!this._anyListeners)
      return this;
    if (e) {
      const t = this._anyListeners;
      for (let r = 0; r < t.length; r++)
        if (e === t[r])
          return t.splice(r, 1), this;
    } else
      this._anyListeners = [];
    return this;
  }
  /**
   * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
   * e.g. to remove listeners.
   */
  listenersAny() {
    return this._anyListeners || [];
  }
  /**
   * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
   * callback.
   *
   * Note: acknowledgements sent to the server are not included.
   *
   * @example
   * socket.onAnyOutgoing((event, ...args) => {
   *   console.log(`sent event ${event}`);
   * });
   *
   * @param listener
   */
  onAnyOutgoing(e) {
    return this._anyOutgoingListeners = this._anyOutgoingListeners || [], this._anyOutgoingListeners.push(e), this;
  }
  /**
   * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
   * callback. The listener is added to the beginning of the listeners array.
   *
   * Note: acknowledgements sent to the server are not included.
   *
   * @example
   * socket.prependAnyOutgoing((event, ...args) => {
   *   console.log(`sent event ${event}`);
   * });
   *
   * @param listener
   */
  prependAnyOutgoing(e) {
    return this._anyOutgoingListeners = this._anyOutgoingListeners || [], this._anyOutgoingListeners.unshift(e), this;
  }
  /**
   * Removes the listener that will be fired when any event is emitted.
   *
   * @example
   * const catchAllListener = (event, ...args) => {
   *   console.log(`sent event ${event}`);
   * }
   *
   * socket.onAnyOutgoing(catchAllListener);
   *
   * // remove a specific listener
   * socket.offAnyOutgoing(catchAllListener);
   *
   * // or remove all listeners
   * socket.offAnyOutgoing();
   *
   * @param [listener] - the catch-all listener (optional)
   */
  offAnyOutgoing(e) {
    if (!this._anyOutgoingListeners)
      return this;
    if (e) {
      const t = this._anyOutgoingListeners;
      for (let r = 0; r < t.length; r++)
        if (e === t[r])
          return t.splice(r, 1), this;
    } else
      this._anyOutgoingListeners = [];
    return this;
  }
  /**
   * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
   * e.g. to remove listeners.
   */
  listenersAnyOutgoing() {
    return this._anyOutgoingListeners || [];
  }
  /**
   * Notify the listeners for each packet sent
   *
   * @param packet
   *
   * @private
   */
  notifyOutgoingListeners(e) {
    if (this._anyOutgoingListeners && this._anyOutgoingListeners.length) {
      const t = this._anyOutgoingListeners.slice();
      for (const r of t)
        r.apply(this, e.data);
    }
  }
}
function Backoff(n) {
  n = n || {}, this.ms = n.min || 100, this.max = n.max || 1e4, this.factor = n.factor || 2, this.jitter = n.jitter > 0 && n.jitter <= 1 ? n.jitter : 0, this.attempts = 0;
}
Backoff.prototype.duration = function() {
  var n = this.ms * Math.pow(this.factor, this.attempts++);
  if (this.jitter) {
    var e = Math.random(), t = Math.floor(e * this.jitter * n);
    n = (Math.floor(e * 10) & 1) == 0 ? n - t : n + t;
  }
  return Math.min(n, this.max) | 0;
};
Backoff.prototype.reset = function() {
  this.attempts = 0;
};
Backoff.prototype.setMin = function(n) {
  this.ms = n;
};
Backoff.prototype.setMax = function(n) {
  this.max = n;
};
Backoff.prototype.setJitter = function(n) {
  this.jitter = n;
};
class Manager extends Emitter {
  constructor(e, t) {
    var r;
    super(), this.nsps = {}, this.subs = [], e && typeof e == "object" && (t = e, e = void 0), t = t || {}, t.path = t.path || "/socket.io", this.opts = t, installTimerFunctions(this, t), this.reconnection(t.reconnection !== !1), this.reconnectionAttempts(t.reconnectionAttempts || 1 / 0), this.reconnectionDelay(t.reconnectionDelay || 1e3), this.reconnectionDelayMax(t.reconnectionDelayMax || 5e3), this.randomizationFactor((r = t.randomizationFactor) !== null && r !== void 0 ? r : 0.5), this.backoff = new Backoff({
      min: this.reconnectionDelay(),
      max: this.reconnectionDelayMax(),
      jitter: this.randomizationFactor()
    }), this.timeout(t.timeout == null ? 2e4 : t.timeout), this._readyState = "closed", this.uri = e;
    const a = t.parser || parser;
    this.encoder = new a.Encoder(), this.decoder = new a.Decoder(), this._autoConnect = t.autoConnect !== !1, this._autoConnect && this.open();
  }
  reconnection(e) {
    return arguments.length ? (this._reconnection = !!e, e || (this.skipReconnect = !0), this) : this._reconnection;
  }
  reconnectionAttempts(e) {
    return e === void 0 ? this._reconnectionAttempts : (this._reconnectionAttempts = e, this);
  }
  reconnectionDelay(e) {
    var t;
    return e === void 0 ? this._reconnectionDelay : (this._reconnectionDelay = e, (t = this.backoff) === null || t === void 0 || t.setMin(e), this);
  }
  randomizationFactor(e) {
    var t;
    return e === void 0 ? this._randomizationFactor : (this._randomizationFactor = e, (t = this.backoff) === null || t === void 0 || t.setJitter(e), this);
  }
  reconnectionDelayMax(e) {
    var t;
    return e === void 0 ? this._reconnectionDelayMax : (this._reconnectionDelayMax = e, (t = this.backoff) === null || t === void 0 || t.setMax(e), this);
  }
  timeout(e) {
    return arguments.length ? (this._timeout = e, this) : this._timeout;
  }
  /**
   * Starts trying to reconnect if reconnection is enabled and we have not
   * started reconnecting yet
   *
   * @private
   */
  maybeReconnectOnOpen() {
    !this._reconnecting && this._reconnection && this.backoff.attempts === 0 && this.reconnect();
  }
  /**
   * Sets the current transport `socket`.
   *
   * @param {Function} fn - optional, callback
   * @return self
   * @public
   */
  open(e) {
    if (~this._readyState.indexOf("open"))
      return this;
    this.engine = new Socket$1(this.uri, this.opts);
    const t = this.engine, r = this;
    this._readyState = "opening", this.skipReconnect = !1;
    const a = on(t, "open", function() {
      r.onopen(), e && e();
    }), o = (u) => {
      this.cleanup(), this._readyState = "closed", this.emitReserved("error", u), e ? e(u) : this.maybeReconnectOnOpen();
    }, s = on(t, "error", o);
    if (this._timeout !== !1) {
      const u = this._timeout, h = this.setTimeoutFn(() => {
        a(), o(new Error("timeout")), t.close();
      }, u);
      this.opts.autoUnref && h.unref(), this.subs.push(() => {
        this.clearTimeoutFn(h);
      });
    }
    return this.subs.push(a), this.subs.push(s), this;
  }
  /**
   * Alias for open()
   *
   * @return self
   * @public
   */
  connect(e) {
    return this.open(e);
  }
  /**
   * Called upon transport open.
   *
   * @private
   */
  onopen() {
    this.cleanup(), this._readyState = "open", this.emitReserved("open");
    const e = this.engine;
    this.subs.push(
      on(e, "ping", this.onping.bind(this)),
      on(e, "data", this.ondata.bind(this)),
      on(e, "error", this.onerror.bind(this)),
      on(e, "close", this.onclose.bind(this)),
      // @ts-ignore
      on(this.decoder, "decoded", this.ondecoded.bind(this))
    );
  }
  /**
   * Called upon a ping.
   *
   * @private
   */
  onping() {
    this.emitReserved("ping");
  }
  /**
   * Called with data.
   *
   * @private
   */
  ondata(e) {
    try {
      this.decoder.add(e);
    } catch (t) {
      this.onclose("parse error", t);
    }
  }
  /**
   * Called when parser fully decodes a packet.
   *
   * @private
   */
  ondecoded(e) {
    nextTick(() => {
      this.emitReserved("packet", e);
    }, this.setTimeoutFn);
  }
  /**
   * Called upon socket error.
   *
   * @private
   */
  onerror(e) {
    this.emitReserved("error", e);
  }
  /**
   * Creates a new socket for the given `nsp`.
   *
   * @return {Socket}
   * @public
   */
  socket(e, t) {
    let r = this.nsps[e];
    return r ? this._autoConnect && !r.active && r.connect() : (r = new Socket(this, e, t), this.nsps[e] = r), r;
  }
  /**
   * Called upon a socket close.
   *
   * @param socket
   * @private
   */
  _destroy(e) {
    const t = Object.keys(this.nsps);
    for (const r of t)
      if (this.nsps[r].active)
        return;
    this._close();
  }
  /**
   * Writes a packet.
   *
   * @param packet
   * @private
   */
  _packet(e) {
    const t = this.encoder.encode(e);
    for (let r = 0; r < t.length; r++)
      this.engine.write(t[r], e.options);
  }
  /**
   * Clean up transport subscriptions and packet buffer.
   *
   * @private
   */
  cleanup() {
    this.subs.forEach((e) => e()), this.subs.length = 0, this.decoder.destroy();
  }
  /**
   * Close the current socket.
   *
   * @private
   */
  _close() {
    this.skipReconnect = !0, this._reconnecting = !1, this.onclose("forced close");
  }
  /**
   * Alias for close()
   *
   * @private
   */
  disconnect() {
    return this._close();
  }
  /**
   * Called when:
   *
   * - the low-level engine is closed
   * - the parser encountered a badly formatted packet
   * - all sockets are disconnected
   *
   * @private
   */
  onclose(e, t) {
    var r;
    this.cleanup(), (r = this.engine) === null || r === void 0 || r.close(), this.backoff.reset(), this._readyState = "closed", this.emitReserved("close", e, t), this._reconnection && !this.skipReconnect && this.reconnect();
  }
  /**
   * Attempt a reconnection.
   *
   * @private
   */
  reconnect() {
    if (this._reconnecting || this.skipReconnect)
      return this;
    const e = this;
    if (this.backoff.attempts >= this._reconnectionAttempts)
      this.backoff.reset(), this.emitReserved("reconnect_failed"), this._reconnecting = !1;
    else {
      const t = this.backoff.duration();
      this._reconnecting = !0;
      const r = this.setTimeoutFn(() => {
        e.skipReconnect || (this.emitReserved("reconnect_attempt", e.backoff.attempts), !e.skipReconnect && e.open((a) => {
          a ? (e._reconnecting = !1, e.reconnect(), this.emitReserved("reconnect_error", a)) : e.onreconnect();
        }));
      }, t);
      this.opts.autoUnref && r.unref(), this.subs.push(() => {
        this.clearTimeoutFn(r);
      });
    }
  }
  /**
   * Called upon successful reconnect.
   *
   * @private
   */
  onreconnect() {
    const e = this.backoff.attempts;
    this._reconnecting = !1, this.backoff.reset(), this.emitReserved("reconnect", e);
  }
}
const cache = {};
function lookup(n, e) {
  typeof n == "object" && (e = n, n = void 0), e = e || {};
  const t = url(n, e.path || "/socket.io"), r = t.source, a = t.id, o = t.path, s = cache[a] && o in cache[a].nsps, u = e.forceNew || e["force new connection"] || e.multiplex === !1 || s;
  let h;
  return u ? h = new Manager(r, e) : (cache[a] || (cache[a] = new Manager(r, e)), h = cache[a]), t.query && !e.query && (e.query = t.queryKey), h.socket(t.path, e);
}
Object.assign(lookup, {
  Manager,
  Socket,
  io: lookup,
  connect: lookup
});
class SysBase {
  constructor(e = {}, t) {
    this.hPlg = e, this.arg = t;
  }
  elc = new EventListenerCtn();
  hFactoryCls = {};
  destroy() {
    this.elc.clear();
  }
  async loaded(...[e]) {
    const t = e.snsys_pre;
    return delete e.snsys_pre, t?.init({
      getInfo: this.#i,
      addTag: () => {
      },
      addLayCls: () => {
      },
      searchPath: () => "",
      getVal: () => ({}),
      resume: () => {
      },
      render: () => {
      },
      setDec: (r) => {
        this.dec = r;
      },
      setDecAB: (r) => {
        this.#y = r;
      },
      setEnc: (r) => {
        this.enc = r;
      },
      getStK: (r) => {
        this.stk = r;
      },
      getHash: (r) => {
        this.hash = r;
      }
    });
  }
  main = void 0;
  cfg;
  setMain(e, t) {
    this.main = e, this.cfg = t;
  }
  async run() {
    const [{ Main: e }, { TxtLayer: t }, { GrpLayer: r }] = await Promise.all([
      import("./Main.js").then((a) => a.M),
      import("./TxtLayer.js").then((a) => a.b),
      import("./GrpLayer.js").then((a) => a.a)
    ]);
    this.hFactoryCls = {
      grp: () => new r(),
      txt: () => new t()
    }, this.run = async () => {
      this.main?.destroy(), this.main = await e.generate(this);
    }, await this.run();
  }
  stop() {
    this.main?.destroy(), this.main = void 0;
  }
  fetch = (e, t) => fetch(e, t);
  data = {
    sys: creSYS_DATA(),
    mark: {},
    kidoku: {}
  };
  async initVal(e, t) {
  }
  flush() {
    if (this.#t) {
      this.#e = !0;
      return;
    }
    this.flushSub(), this.#t = setTimeout(() => {
      this.#t = void 0, this.#e && (this.#e = !1, this.flush());
    }, 500);
  }
  #t = void 0;
  #e = !1;
  flushSub() {
  }
  val;
  init(e, t, r) {
    const a = [];
    this.val = r;
    let o = "";
    return a.push(
      r.init().then(() => {
        o = "sys", o += String(r.getVal("sys:TextLayer.Back.Alpha", 1)), o = "kidoku", r.saveKidoku();
      }).catch((s) => console.error(`セーブデータ（${o}）が壊れています。一度クリアする必要があります(b) %o`, s))
    ), e.close = (s) => this.close(s), e.export = (s) => this._export(s), e.import = (s) => this._import(s), e.navigate_to = (s) => this.navigate_to(s), e.title = (s) => this.title(s), e.toggle_full_screen = (s) => this.#m(s), e.update_check = (s) => this.update_check(s), e.window = (s) => this.window(s), e.title({ text: this.cfg.oCfg.book.title || "SKYNovel" }), r.defTmp("const.sn.isApp", () => this.isApp), r.defTmp("const.sn.isDbg", () => CmnLib.isDbg), r.defTmp("const.sn.isPackaged", () => CmnLib.isPackaged), r.defTmp("const.sn.needClick2Play", () => CmnLib.needClick2Play()), r.defTmp("const.sn.displayState", () => this.isFullScr), r.setVal_Nochk("sys", "const.sn.cfg.ns", this.cfg.oCfg.save_ns), r.flush(), CmnLib.isDbg && this.attach_debug(this.main), [
      ...a,
      ...Object.values(this.hPlg).map((s) => s.init({
        getInfo: this.#i,
        addTag: (u, h) => {
          if (u in e) throw `すでに定義済みのタグ[${u}]です`;
          e[u] = h;
        },
        addLayCls: (u, h) => {
          if (u in this.hFactoryCls) throw `すでに定義済みのレイヤcls【${u}】です`;
          this.hFactoryCls[u] = h;
        },
        searchPath: (u, h = SEARCH_PATH_ARG_EXT.DEFAULT) => this.cfg.searchPath(u, h),
        getVal: (u, h) => r.getVal(u, h),
        resume: () => this.main?.resume(),
        render: (u, h, l = !1) => t.renderer.render(u, { renderTexture: h, clear: l }),
        setDec: () => {
        },
        setDecAB: () => {
        },
        setEnc: () => {
        },
        getStK: () => {
        },
        getHash: () => {
        }
      }))
    ];
  }
  #i = () => ({
    window: {
      width: CmnLib.stageW,
      height: CmnLib.stageH
    }
  });
  #r = 0;
  #n = 0;
  #a = 1;
  #h = 0;
  #l = 0;
  #o = 0;
  #s = 0;
  get cvsWidth() {
    return this.#r;
  }
  get cvsHeight() {
    return this.#n;
  }
  get cvsScale() {
    return this.#a;
  }
  get ofsLeft4elm() {
    return this.#h;
  }
  get ofsTop4elm() {
    return this.#l;
  }
  get ofsPadLeft_Dom2PIXI() {
    return this.#o;
  }
  get ofsPadTop_Dom2PIXI() {
    return this.#s;
  }
  isFullScr = !1;
  cvsResize() {
    if (!this.main) return;
    let e = globalThis.innerWidth, t = globalThis.innerHeight;
    const r = this.main.cvs, a = r.parentElement !== document.body;
    if (a) {
      const h = globalThis.getComputedStyle(r);
      e = parseFloat(h.width), t = parseFloat(h.height);
    }
    if (CmnLib.isMobile) {
      const l = screen.orientation.angle % 180 === 0;
      (l && e > t || !l && e < t) && ([e, t] = [t, e]);
    }
    const o = r.getBoundingClientRect();
    if (argChk_Boolean(CmnLib.hDip, "expanding", !0) || a || CmnLib.stageW > e || CmnLib.stageH > t)
      if (CmnLib.stageW / CmnLib.stageH <= e / t ? (this.#n = t, this.#r = CmnLib.stageW / CmnLib.stageH * t) : (this.#r = e, this.#n = CmnLib.stageH / CmnLib.stageW * e), this.#a = this.#r / CmnLib.stageW, a)
        this.#o = 0, this.#s = 0;
      else {
        const h = 1 - this.#a;
        CmnLib.isMobile ? (this.#o = (e - this.#r) / 2 * h, this.#s = (t - this.#n) / 2 * h) : (this.#o = o.left * h, this.#s = o.top * h);
      }
    else
      this.#r = CmnLib.stageW, this.#n = CmnLib.stageH, this.#a = 1, this.#o = 0, this.#s = 0;
    const s = r.parentElement.style;
    a || (s.position = "relative", s.width = `${String(this.#r)}px`, s.height = `${String(this.#n)}px`);
    const u = r.style;
    u.width = s.width, u.height = s.height, a ? (this.#h = o.left, this.#l = o.top) : (this.#h = 0, this.#l = 0), this.isFullScr && (this.#h += (e - this.#r) / 2, this.#l += (t - this.#n) / 2);
  }
  // === vite-electron 用コード ===
  use4ViteElectron(e, t, r, a) {
    return !1;
  }
  // デバッガ接続
  attach_debug(e) {
    this.attach_debug = () => {
    };
    const t = document.createElement("style");
    t.innerHTML = `/* SKYNovel Dbg */
.sn_BounceInOut { animation: sn_kfBounceInOut linear 1.5s; }
@keyframes sn_kfBounceInOut{
0%	{opacity: 0;	transform: scaleX(0.30) scaleY(0.30);}
10%	{opacity: 1;	transform: scaleX(1.10) scaleY(1.10);}
20%	{				transform: scaleX(0.95) scaleY(0.95);}
30%	{				transform: scaleX(1.00) scaleY(1.00);}
70%	{opacity: 1;}
100%{opacity: 0;}
}
.sn_BounceIn { animation: sn_kfBounceIn linear 0.3s; }
@keyframes sn_kfBounceIn{
0%	{opacity: 0;	transform: scaleX(0.30) scaleY(0.30);}
50%	{opacity: 1;	transform: scaleX(1.10) scaleY(1.10);}
100%{				transform: scaleX(0.95) scaleY(0.95);}
}
.sn_HopIn { animation: sn_kfHopIn linear 0.8s; }
@keyframes sn_kfHopIn{
0%	{transform:	translate(0px,   0px);}
15% {transform:	translate(0px, -25px);}
30% {transform:	translate(0px,   0px);}
45% {transform:	translate(0px, -15px);}
60% {transform:	translate(0px,   0px);}
75% {transform:	translate(0px,  -5px);}
100%{transform:	translate(0px,   0px);}
}`, document.getElementsByTagName("head")[0].appendChild(t), this.addHook((r, a) => this.#_[r]?.(a)), this.#u = lookup(`http://localhost:${String(this.extPort)}`), this.#u.on("data", (r, a) => {
      this.callHook(r, a);
    }).on("disconnect", () => e.setLoop(!0)), this.callHook = (r, a) => {
      for (const o of this.#v) o(r, a);
    };
  }
  extPort = 3776;
  end() {
    this.#u?.disconnect(), this.#u = void 0;
  }
  #u = void 0;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  #_ = {
    auth: (e) => {
      if (e.t !== this.cfg.oCfg.debuger_token) {
        this.end();
        return;
      }
      this.toast("接続");
    },
    continue: () => this.toast("再生"),
    disconnect: () => this.toast("切断"),
    restart: (e) => {
      this.send2Dbg(e?.ri ?? "", {}), this.end(), this.run();
    },
    pause: () => this.toast("一時停止"),
    stopOnEntry: () => this.toast("一時停止"),
    stopOnDataBreakpoint: () => this.toast("注意"),
    stopOnBreakpoint: () => this.toast("注意"),
    stopOnStep: () => this.toast("一歩進む"),
    stopOnStepIn: () => this.toast("ステップイン"),
    stopOnStepOut: () => this.toast("ステップアウト"),
    stopOnBackstep: () => this.toast("一歩戻る"),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    _addPath: (e) => this.cfg.addPath(e.fn, e.o)
  };
  toast(e) {
    if (!this.main) return;
    const t = document.body;
    for (const s of [
      ...Array.from(t.getElementsByClassName("sn_BounceIn")),
      ...Array.from(t.getElementsByClassName("sn_HopIn"))
    ]) s.remove();
    const r = document.createElement("img"), a = SysBase.#g[e];
    if (!a) throw new Error(`toast 名ミス=${e}`);
    r.src = `data:image/svg+xml;base64,${a.dat}`;
    const o = Math.min(CmnLib.stageW, CmnLib.stageH) / 4 * this.#a;
    r.width = r.height = o, r.style.cssText = `position: absolute;
left: ${String(
      (CmnLib.stageW - o) / 2 * this.#a + o * (a.dx ?? 0)
    )}px;
top: ${String(
      (CmnLib.stageH - o) / 2 * this.#a + o * (a.dy ?? 0)
    )}px;`, r.classList.add("sn_toast", a.ease ?? "sn_BounceInOut"), a.ease || r.addEventListener("animationend", () => t.removeChild(r), { once: !0, passive: !0 }), t.insertBefore(r, this.main.cvs);
  }
  static #g = {
    // Thanks ICOOON MONO https://icooon-mono.com/ 、 https://vectr.com/ で 640x640化、ImageOptim経由、Base64エンコーダー https://lab.syncer.jp/Tool/Base64-encode/
    接続: { dx: -1, dat: "PHN2ZyBoZWlnaHQ9IjY0MCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmlld0JveD0iMCAwIDY0MCA2NDAiIHdpZHRoPSI2NDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxwYXRoIGlkPSJhIiBkPSJtNjQwIDMyMGMwIDE3Ni43My0xNDMuMjcgMzIwLTMyMCAzMjBzLTMyMC0xNDMuMjctMzIwLTMyMCAxNDMuMjctMzIwIDMyMC0zMjAgMzIwIDE0My4yNyAzMjAgMzIweiIvPjxwYXRoIGlkPSJiIiBkPSJtMCAyOTJ2NTUuODhoMTI3LjEzYzEyLjM3IDQ2IDU0LjEyIDc5Ljg3IDEwNCA3OS44N2g3Ny44N3YtMjE1LjYyYy00Ni43MyAwLTcyLjY4IDAtNzcuODggMC00OS43NCAwLTkxLjYyIDMzLjg3LTEwMy45OSA3OS44Ny0xNi45NSAwLTU5LjMzIDAtMTI3LjEzIDB6Ii8+PHBhdGggaWQ9ImMiIGQ9Im01MTIuODggMjkyYy0xMi4zOC00Ni01NC4xMy03OS44Ny0xMDQtNzkuODctNS4yMSAwLTMxLjIxIDAtNzggMHYyMTUuNzRoNzcuODdjNDkuODggMCA5MS43NS0zMy44NyAxMDQtNzkuODdoMTI3LjI1di01NmMtNzYuMjcgMC0xMTguNjUgMC0xMjcuMTIgMHoiLz48L2RlZnM+PHVzZSBmaWxsPSIjMmUyZTJlIiB4bGluazpocmVmPSIjYSIvPjx1c2UgZmlsbD0ibm9uZSIgeGxpbms6aHJlZj0iI2EiLz48dXNlIGZpbGw9IiMzYWFiZDIiIHhsaW5rOmhyZWY9IiNiIi8+PHVzZSBmaWxsPSJub25lIiB4bGluazpocmVmPSIjYiIvPjx1c2UgZmlsbD0iIzNhYWJkMiIgeGxpbms6aHJlZj0iI2MiLz48dXNlIGZpbGw9Im5vbmUiIHhsaW5rOmhyZWY9IiNjIi8+PC9zdmc+" },
    切断: { dat: "PHN2ZyBoZWlnaHQ9IjY0MCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmlld0JveD0iMCAwIDY0MCA2NDAiIHdpZHRoPSI2NDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxwYXRoIGlkPSJhIiBkPSJtNjQwIDMyMGMwIDE3Ni43My0xNDMuMjcgMzIwLTMyMCAzMjBzLTMyMC0xNDMuMjctMzIwLTMyMCAxNDMuMjctMzIwIDMyMC0zMjAgMzIwIDE0My4yNyAzMjAgMzIweiIvPjxwYXRoIGlkPSJiIiBkPSJtMTkxLjUzIDIyMS4yNGMtNDUuNjggMC04NC4wMSAzMS4wNC05NS4zIDczLjE2LTYuNDEgMC0zOC40OSAwLTk2LjIzIDB2NTEuMjFoOTYuMjNjMTEuMyA0Mi4xMSA0OS42MyA3My4xNiA5NS4zIDczLjE2aDcxLjMzdi00OC4yNGg1My43OHYtMTAxLjA1aC01My43OHYtNDguMjRjLTQyLjggMC02Ni41NyAwLTcxLjMzIDB6Ii8+PHBhdGggaWQ9ImMiIGQ9Im00NDguNDcgMjIxLjIzYy00Ljc2IDAtMjguNTMgMC03MS4zMyAwdjE5Ny41M2g3MS4zM2M0NS42OCAwIDgzLjk5LTMxLjA0IDk1LjI5LTczLjE1aDk2LjI0di01MS4yMWgtOTYuMjRjLTMzLjA4LTQ4Ljc4LTY0Ljg0LTczLjE3LTk1LjI5LTczLjE3eiIvPjwvZGVmcz48dXNlIGZpbGw9IiMyZTJlMmUiIHhsaW5rOmhyZWY9IiNhIi8+PHVzZSBmaWxsPSJub25lIiB4bGluazpocmVmPSIjYSIvPjx1c2UgZmlsbD0iI2RmNTY1NiIgeGxpbms6aHJlZj0iI2IiLz48dXNlIGZpbGw9Im5vbmUiIHhsaW5rOmhyZWY9IiNiIi8+PHVzZSBmaWxsPSIjZGY1NjU2IiB4bGluazpocmVmPSIjYyIvPjx1c2UgZmlsbD0ibm9uZSIgeGxpbms6aHJlZj0iI2MiLz48L3N2Zz4=" },
    再生: { dat: "PHN2ZyBoZWlnaHQ9IjY0MCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmlld0JveD0iMCAwIDY0MCA2NDAiIHdpZHRoPSI2NDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxwYXRoIGlkPSJhIiBkPSJtMCAzMjBjMCAxNzYuNzIgMTQzLjI4IDMyMCAzMjAgMzIwczMyMC0xNDMuMjggMzIwLTMyMC0xNDMuMjgtMzIwLTMyMC0zMjAtMzIwIDE0My4yOC0zMjAgMzIwem0yNTguODMgMTExLjA1Yy0xLjI5Ljc5LTIuOTMuODMtNC4yNi4wNC0xLjI5LS43NC0yLjExLTIuMTItMi4xMS0zLjY3IDAtNy4xNiAwLTQyLjk3IDAtMTA3LjQzczAtMTAwLjI3IDAtMTA3LjQzYzAtMS41My44Mi0yLjkzIDIuMTEtMy42OCAxLjMzLS43NiAyLjk3LS43MiA0LjI2LjA0IDE4IDEwLjc1IDE2MiA5Ni43MSAxODAgMTA3LjQ2IDEuMjkuNzMgMi4wNSAyLjE0IDIuMDUgMy42MSAwIDEuNDktLjc2IDIuODgtMi4wNSAzLjYzLTM2IDIxLjQ5LTE2MiA5Ni42OS0xODAgMTA3LjQzeiIvPjwvZGVmcz48cGF0aCBkPSJtMTU0LjU3IDE3MC4xOWgzNDYuMTV2MzA3LjY5aC0zNDYuMTV6IiBmaWxsPSIjZmZmIi8+PHVzZSBmaWxsPSIjMmUyZTJlIiB4bGluazpocmVmPSIjYSIvPjx1c2UgZmlsbD0ibm9uZSIgeGxpbms6aHJlZj0iI2EiLz48L3N2Zz4=" },
    一時停止: { dat: "PHN2ZyBoZWlnaHQ9IjY0MCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmlld0JveD0iMCAwIDY0MCA2NDAiIHdpZHRoPSI2NDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxwYXRoIGlkPSJhIiBkPSJtMCAzMjBjMCAxNzYuNzIgMTQzLjI4IDMyMCAzMjAgMzIwczMyMC0xNDMuMjggMzIwLTMyMC0xNDMuMjgtMzIwLTMyMC0zMjAtMzIwIDE0My4yOC0zMjAgMzIwem0yMDAgMTAwdi0yMDBoODB2MjAwem0xNjAgMHYtMjAwaDgwdjIwMHoiLz48L2RlZnM+PHBhdGggZD0ibTE0Ny40OSAxODAuNDFoMzUyLjR2MjgyLjY5aC0zNTIuNHoiIGZpbGw9IiNmZmYiLz48dXNlIGZpbGw9IiMyZTJlMmUiIHhsaW5rOmhyZWY9IiNhIi8+PHVzZSBmaWxsPSJub25lIiB4bGluazpocmVmPSIjYSIvPjwvc3ZnPg==" },
    注意: { ease: "sn_HopIn", dat: "PHN2ZyBoZWlnaHQ9IjY0MCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmlld0JveD0iMCAwIDY0MCA2NDAiIHdpZHRoPSI2NDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxwYXRoIGlkPSJhIiBkPSJtMzQzLjM0IDI5LjJjLTEwLjM3LTE3Ljk3LTM2LjMxLTE3Ljk3LTQ2LjY5IDAtMjkuMyA1MC43NS0yNjMuNyA0NTYuNzQtMjkzIDUwNy40OS0xMC4zNyAxNy45NyAyLjU5IDQwLjQ0IDIzLjM0IDQwLjQ0aDU4Ni4wMWMyMC43NSAwIDMzLjcyLTIyLjQ2IDIzLjM1LTQwLjQ0LTU4LjYtMTAxLjUtMjYzLjctNDU2Ljc0LTI5My4wMS01MDcuNDl6bS0yMy4zNCA0ODIuODNjLTE0LjUyIDAtMjYuMjktMi43MS0yNi4yOS02LjA2IDAtNC4yMSAwLTM3Ljg2IDAtNDIuMDcgMC0zLjM1IDExLjc3LTYuMDcgMjYuMjktNi4wN3MyNi4yOSAyLjcyIDI2LjI5IDYuMDd2NDIuMDdjLTcuODQgNC4wNC0xNi42MSA2LjA2LTI2LjI5IDYuMDZ6bTIxLjk5LTEwMy44NGMwIDUuNDMtOS44NSA5LjgzLTIxLjk5IDkuODMtMTIuMTUgMC0yMS45OS00LjQtMjEuOTktOS44MyAwLS4xMy4wNy0uMjUuMDgtLjM4LTEuMzctMTcuNTYtMTIuMy0xNTguMDYtMTMuNjctMTc1LjYyIDAtNS40MyAxNS45My05Ljg0IDM1LjU4LTkuODRzMzUuNTggNC40MSAzNS41OCA5Ljg0Yy0uOTEgMTEuNy01LjQ3IDcwLjI1LTEzLjY3IDE3NS42Mi4wNi4xNi4wOC4yOS4wOC4zOHoiLz48L2RlZnM+PHBhdGggZD0ibTI0MS4yOSAxOTEuNDRoMTQ1LjQ5djM1MS42NmgtMTQ1LjQ5eiIgZmlsbD0iI2ZmZiIvPjx1c2UgZmlsbD0iI2QyYmYzYSIgeGxpbms6aHJlZj0iI2EiLz48dXNlIGZpbGw9Im5vbmUiIHhsaW5rOmhyZWY9IiNhIi8+PC9zdmc+" },
    一歩進む: { ease: "sn_BounceIn", dat: "PHN2ZyBoZWlnaHQ9IjY0MCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmlld0JveD0iMCAwIDY0MCA2NDAiIHdpZHRoPSI2NDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxwYXRoIGlkPSJhIiBkPSJtMCAzMjBjMCAxNzYuNzIgMTQzLjI4IDMyMCAzMjAgMzIwczMyMC0xNDMuMjggMzIwLTMyMC0xNDMuMjgtMzIwLTMyMC0zMjAtMzIwIDE0My4yOC0zMjAgMzIwem0zNzYuOTMgOTEuOTdjMC01My41MSAwLTgzLjI0IDAtODkuMTktLjE1LjE0LS4yNS4zNC0uNDQuNDUtMTYuMTEgOS42Mi0xNDQuOTUgODYuNTQtMTYxLjA2IDk2LjE1LTEuMTUuNjktMi42Mi43My0zLjgxLjAyLTEuMTUtLjY0LTEuODktMS44OS0xLjg5LTMuMjggMC02LjQxIDAtMzguNDQgMC05Ni4xMSAwLTU3LjY5IDAtODkuNzQgMC05Ni4xNSAwLTEuMzUuNzQtMi42MiAxLjg5LTMuMjkgMS4xOS0uNjggMi42Ni0uNjQgMy44MS4wNCAxNi4xMSA5LjYyIDE0NC45NSA4Ni41NCAxNjEuMDYgOTYuMTYuMTkuMS4yOS4zMS40NC40NSAwLTYuMTMgMC0zNi43NyAwLTkxLjkyaDUzLjMydjE4Ni42N3oiLz48L2RlZnM+PHBhdGggZD0ibTE0Ny40OSAxNTQuMmgzNTIuNHYzMDguOWgtMzUyLjR6IiBmaWxsPSIjZmZmIi8+PHVzZSBmaWxsPSIjMmUyZTJlIiB4bGluazpocmVmPSIjYSIvPjx1c2UgZmlsbD0ibm9uZSIgeGxpbms6aHJlZj0iI2EiLz48L3N2Zz4=" },
    一歩戻る: { ease: "sn_BounceIn", dat: "PHN2ZyBoZWlnaHQ9IjY0MCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmlld0JveD0iMCAwIDY0MCA2NDAiIHdpZHRoPSI2NDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxwYXRoIGlkPSJhIiBkPSJtMCAzMjBjMCAxNzYuNzIgMTQzLjI4IDMyMCAzMjAgMzIwczMyMC0xNDMuMjggMzIwLTMyMC0xNDMuMjgtMzIwLTMyMC0zMjAtMzIwIDE0My4yOC0zMjAgMzIwem00MzAuMjcgOTYuMTRjMCAxLjM1LS43NCAyLjYyLTEuODkgMy4yOC0xLjE5LjY5LTIuNjYuNjUtMy44MS0uMDMtMTYuMTEtOS42Mi0xNDQuOTUtODYuNTQtMTYxLjA1LTk2LjE2LS4yLS4xLS4yOS0uMzEtLjQ1LS40NXY5MS45MmgtNTMuMzJ2LTE4Ni42N2g1My4zMnY4OS4xOWMuMTYtLjE0LjI1LS4zNC40NS0uNDUgMTYuMS05LjYyIDE0NC45NC04Ni41NCAxNjEuMDUtOTYuMTYgMS4xNS0uNjggMi42Mi0uNzIgMy44MS0uMDEgMS4xNS42NCAxLjg5IDEuODkgMS44OSAzLjI4djk2LjExeiIvPjwvZGVmcz48cGF0aCBkPSJtMTQ3LjQ5IDE1NC4yaDM1Mi40djMwOC45aC0zNTIuNHoiIGZpbGw9IiNmZmYiLz48dXNlIGZpbGw9IiMyZTJlMmUiIHhsaW5rOmhyZWY9IiNhIi8+PHVzZSBmaWxsPSJub25lIiB4bGluazpocmVmPSIjYSIvPjwvc3ZnPg==" },
    ステップイン: { ease: "sn_BounceIn", dat: "PHN2ZyBoZWlnaHQ9IjY0MCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmlld0JveD0iMCAwIDY0MCA2NDAiIHdpZHRoPSI2NDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxwYXRoIGlkPSJhIiBkPSJtMCAzMTkuOTljMCAxNzYuNzQgMTQzLjI3IDMyMC4wMSAzMjAuMDEgMzIwLjAxIDE3Ni43MiAwIDMxOS45OS0xNDMuMjcgMzE5Ljk5LTMyMC4wMSAwLTE3Ni43Mi0xNDMuMjctMzE5Ljk5LTMxOS45OS0zMTkuOTktMTc2Ljc0IDAtMzIwLjAxIDE0My4yNy0zMjAuMDEgMzE5Ljk5em0xNTMuMDUtMjkuNzIgNTUuMTItNTUuMTMgMTExLjg0IDExMS44MiAxMTEuODItMTExLjgyIDU1LjEyIDU1LjEyLTE2Ni45NCAxNjYuOTd6Ii8+PC9kZWZzPjxwYXRoIGQ9Im0xNDcuNDkgMTU0LjJoMzUyLjR2MzA4LjloLTM1Mi40eiIgZmlsbD0iI2ZmZiIvPjx1c2UgZmlsbD0iIzJlMmUyZSIgeGxpbms6aHJlZj0iI2EiLz48dXNlIGZpbGw9Im5vbmUiIHhsaW5rOmhyZWY9IiNhIi8+PC9zdmc+" },
    ステップアウト: { ease: "sn_BounceIn", dat: "PHN2ZyBoZWlnaHQ9IjY0MCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmlld0JveD0iMCAwIDY0MCA2NDAiIHdpZHRoPSI2NDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxwYXRoIGlkPSJhIiBkPSJtMCAzMjAuMDFjMCAxNzYuNzIgMTQzLjI3IDMxOS45OSAzMTkuOTkgMzE5Ljk5IDE3Ni43NCAwIDMyMC4wMS0xNDMuMjcgMzIwLjAxLTMxOS45OSAwLTE3Ni43NC0xNDMuMjctMzIwLjAxLTMyMC4wMS0zMjAuMDEtMTc2LjcyIDAtMzE5Ljk5IDE0My4yNy0zMTkuOTkgMzIwLjAxem0zMTkuOTktMjYuOTgtMTExLjgyIDExMS44My01NS4xMi01NS4xMyAxNjYuOTQtMTY2Ljk2IDE2Ni45NiAxNjYuOTYtNTUuMTIgNTUuMTN6Ii8+PC9kZWZzPjxwYXRoIGQ9Im0xNDcuNDkgMTU0LjJoMzUyLjR2MzA4LjloLTM1Mi40eiIgZmlsbD0iI2ZmZiIvPjx1c2UgZmlsbD0iIzJlMmUyZSIgeGxpbms6aHJlZj0iI2EiLz48dXNlIGZpbGw9Im5vbmUiIHhsaW5rOmhyZWY9IiNhIi8+PC9zdmc+" }
  };
  pathBaseCnvSnPath4Dbg = "";
  fire;
  setFire(e) {
    this.fire = e;
  }
  #v = [];
  addHook(e) {
    this.#v.push(e);
  }
  callHook = (e, t) => {
  };
  send2Dbg = (e, t) => {
    this.#u?.emit("data", e, t);
  };
  copyBMFolder = (e, t) => {
  };
  eraseBMFolder = (e) => {
  };
  close = () => !1;
  _export = () => !1;
  _import = () => !1;
  navigate_to = () => !1;
  title = (e) => {
    const { text: t } = e;
    if (!t) throw "[title] textは必須です";
    return this.#c = t, this.titleSub(this.#c + this.#d), !1;
  };
  #c = "";
  titleSub(e) {
  }
  #m = (e) => {
    if (!e.key)
      return this.tglFlscr_sub().catch((r) => SysBase.tglFlscr_HdrErr(r)), !1;
    const t = e.key.toLowerCase();
    return this.elc.add(document, EVNM_KEY, (r) => {
      SysBase.modKey(r) + r.key.toLowerCase() === t && (r.stopPropagation(), this.tglFlscr_sub().catch((o) => SysBase.tglFlscr_HdrErr(o)));
    }, { passive: !0 }), !1;
  };
  static tglFlscr_HdrErr(e) {
    e instanceof TypeError && console.error("フルスクリーン化でエラーです。ブラウザ環境でキー入力きっかけでないと発生します"), console.error(`fn:SysBase.ts tglFlscr ${String(e)}`);
  }
  static modKey(e) {
    return (e.altKey ? e.key === "Alt" ? "" : "alt+" : "") + (e.ctrlKey ? e.key === "Control" ? "" : "ctrl+" : "") + (e.metaKey ? e.key === "Meta" ? "" : "meta+" : "") + (e.shiftKey ? e.key === "Shift" ? "" : "shift+" : "");
  }
  async tglFlscr_sub() {
  }
  update_check = () => !1;
  window = () => !1;
  #d = "";
  setTitleInfo(e) {
    this.#d = e, this.titleSub(this.#c + this.#d);
  }
  #y = () => Promise.resolve({ ext_num: 0, ab: new ArrayBuffer(0) });
  dec = (e, t) => Promise.resolve(t);
  async decAB(e) {
    const { ext_num: t, ab: r } = await this.#y(e), a = this.#b[t];
    return a?.fnc ? await a.fnc(r) : r;
  }
  #b = {
    1: { ext: "jpeg", fnc: (e) => this.#f(e, "image/jpeg") },
    2: { ext: "png", fnc: (e) => this.#f(e, "image/png") },
    3: { ext: "svg", fnc: (e) => this.#f(e, "image/svg+xml") },
    4: { ext: "webp", fnc: (e) => this.#f(e, "image/webp") },
    //	10	: {ext: 'mp3', fnc: async ab=> ab},
    //	11	: {ext: 'm4a', fnc: async ab=> ab},
    //	12	: {ext: 'ogg', fnc: async ab=> ab},
    //	13	: {ext: 'aac', fnc: async ab=> ab},
    //	14	: {ext: 'flac', fnc: async ab=> ab},
    //	15	: {ext: 'wav', fnc: async ab=> ab},
    20: { ext: "mp4", fnc: (e) => this.#p(e, "video/mp4") },
    21: { ext: "webm", fnc: (e) => this.#p(e, "video/webm") },
    22: { ext: "ogv", fnc: (e) => this.#p(e, "video/ogv") }
  };
  #f = (e, t) => new Promise((r, a) => {
    const o = new Blob([e], { type: t }), s = new Image();
    s.onload = () => r(s), s.onerror = (u) => a(new Error(u instanceof Event ? u.type : u)), s.src = URL.createObjectURL(o);
  });
  #p = (e, t) => new Promise((r, a) => {
    const o = new Blob([e], { type: t }), s = document.createElement("video");
    this.elc.add(s, "error", () => a(new Error(s.error?.message ?? ""))), this.elc.add(s, "canplay", () => r(s)), s.src = URL.createObjectURL(o);
  });
  // eslint-disable-next-line @typescript-eslint/require-await
  enc = async (e) => e;
  stk = () => "";
  hash = (e) => "";
  isApp = !1;
  $path_downloads = "";
  get path_downloads() {
    return this.$path_downloads;
  }
  $path_userdata = "";
  get path_userdata() {
    return this.$path_userdata;
  }
  capturePage(e, t, r, a) {
  }
  async savePic(e, t) {
  }
  async ensureFile(e) {
  }
  async appendFile(e, t) {
  }
  async outputFile(e, t) {
  }
}
var util, hasRequiredUtil;
function requireUtil() {
  if (hasRequiredUtil) return util;
  hasRequiredUtil = 1;
  var n = a(), e = o(), t = s(), r = typeof window < "u" ? window : commonjsGlobal;
  util = {
    assign: n,
    create: e,
    trim: t,
    bind: u,
    slice: h,
    each: l,
    map: c,
    pluck: v,
    isList: d,
    isFunction: g,
    isObject: m,
    Global: r
  };
  function a() {
    return Object.assign ? Object.assign : function(y, b, S, O) {
      for (var D = 1; D < arguments.length; D++)
        l(Object(arguments[D]), function(E, M) {
          y[M] = E;
        });
      return y;
    };
  }
  function o() {
    if (Object.create)
      return function(y, b, S, O) {
        var D = h(arguments, 1);
        return n.apply(this, [Object.create(y)].concat(D));
      };
    {
      let _ = function() {
      };
      return function(b, S, O, D) {
        var E = h(arguments, 1);
        return _.prototype = b, n.apply(this, [new _()].concat(E));
      };
    }
  }
  function s() {
    return String.prototype.trim ? function(y) {
      return String.prototype.trim.call(y);
    } : function(y) {
      return y.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
    };
  }
  function u(_, y) {
    return function() {
      return y.apply(_, Array.prototype.slice.call(arguments, 0));
    };
  }
  function h(_, y) {
    return Array.prototype.slice.call(_, y || 0);
  }
  function l(_, y) {
    v(_, function(b, S) {
      return y(b, S), !1;
    });
  }
  function c(_, y) {
    var b = d(_) ? [] : {};
    return v(_, function(S, O) {
      return b[O] = y(S, O), !1;
    }), b;
  }
  function v(_, y) {
    if (d(_)) {
      for (var b = 0; b < _.length; b++)
        if (y(_[b], b))
          return _[b];
    } else
      for (var S in _)
        if (_.hasOwnProperty(S) && y(_[S], S))
          return _[S];
  }
  function d(_) {
    return _ != null && typeof _ != "function" && typeof _.length == "number";
  }
  function g(_) {
    return _ && {}.toString.call(_) === "[object Function]";
  }
  function m(_) {
    return _ && {}.toString.call(_) === "[object Object]";
  }
  return util;
}
var storeEngine, hasRequiredStoreEngine;
function requireStoreEngine() {
  if (hasRequiredStoreEngine) return storeEngine;
  hasRequiredStoreEngine = 1;
  var n = requireUtil(), e = n.slice, t = n.pluck, r = n.each, a = n.bind, o = n.create, s = n.isList, u = n.isFunction, h = n.isObject;
  storeEngine = {
    createStore: v
  };
  var l = {
    version: "2.0.12",
    enabled: !1,
    // get returns the value of the given key. If that value
    // is undefined, it returns optionalDefaultValue instead.
    get: function(d, g) {
      var m = this.storage.read(this._namespacePrefix + d);
      return this._deserialize(m, g);
    },
    // set will store the given value at key and returns value.
    // Calling set with value === undefined is equivalent to calling remove.
    set: function(d, g) {
      return g === void 0 ? this.remove(d) : (this.storage.write(this._namespacePrefix + d, this._serialize(g)), g);
    },
    // remove deletes the key and value stored at the given key.
    remove: function(d) {
      this.storage.remove(this._namespacePrefix + d);
    },
    // each will call the given callback once for each key-value pair
    // in this store.
    each: function(d) {
      var g = this;
      this.storage.each(function(m, _) {
        d.call(g, g._deserialize(m), (_ || "").replace(g._namespaceRegexp, ""));
      });
    },
    // clearAll will remove all the stored key-value pairs in this store.
    clearAll: function() {
      this.storage.clearAll();
    },
    // additional functionality that can't live in plugins
    // ---------------------------------------------------
    // hasNamespace returns true if this store instance has the given namespace.
    hasNamespace: function(d) {
      return this._namespacePrefix == "__storejs_" + d + "_";
    },
    // createStore creates a store.js instance with the first
    // functioning storage in the list of storage candidates,
    // and applies the the given mixins to the instance.
    createStore: function() {
      return v.apply(this, arguments);
    },
    addPlugin: function(d) {
      this._addPlugin(d);
    },
    namespace: function(d) {
      return v(this.storage, this.plugins, d);
    }
  };
  function c() {
    var d = typeof console > "u" ? null : console;
    if (d) {
      var g = d.warn ? d.warn : d.log;
      g.apply(d, arguments);
    }
  }
  function v(d, g, m) {
    m || (m = ""), d && !s(d) && (d = [d]), g && !s(g) && (g = [g]);
    var _ = m ? "__storejs_" + m + "_" : "", y = m ? new RegExp("^" + _) : null, b = /^[a-zA-Z0-9_\-]*$/;
    if (!b.test(m))
      throw new Error("store.js namespaces can only have alphanumerics + underscores and dashes");
    var S = {
      _namespacePrefix: _,
      _namespaceRegexp: y,
      _testStorage: function(D) {
        try {
          var E = "__storejs__test__";
          D.write(E, E);
          var M = D.read(E) === E;
          return D.remove(E), M;
        } catch {
          return !1;
        }
      },
      _assignPluginFnProp: function(D, E) {
        var M = this[E];
        this[E] = function() {
          var $ = e(arguments, 0), B = this;
          function U() {
            if (M)
              return r(arguments, function(G, K) {
                $[K] = G;
              }), M.apply(B, $);
          }
          var X = [U].concat($);
          return D.apply(B, X);
        };
      },
      _serialize: function(D) {
        return JSON.stringify(D);
      },
      _deserialize: function(D, E) {
        if (!D)
          return E;
        var M = "";
        try {
          M = JSON.parse(D);
        } catch {
          M = D;
        }
        return M !== void 0 ? M : E;
      },
      _addStorage: function(D) {
        this.enabled || this._testStorage(D) && (this.storage = D, this.enabled = !0);
      },
      _addPlugin: function(D) {
        var E = this;
        if (s(D)) {
          r(D, function($) {
            E._addPlugin($);
          });
          return;
        }
        var M = t(this.plugins, function($) {
          return D === $;
        });
        if (!M) {
          if (this.plugins.push(D), !u(D))
            throw new Error("Plugins must be function values that return objects");
          var A = D.call(this);
          if (!h(A))
            throw new Error("Plugins must return an object of function properties");
          r(A, function($, B) {
            if (!u($))
              throw new Error("Bad plugin property: " + B + " from plugin " + D.name + ". Plugins should only return functions.");
            E._assignPluginFnProp($, B);
          });
        }
      },
      // Put deprecated properties in the private API, so as to not expose it to accidential
      // discovery through inspection of the store object.
      // Deprecated: addStorage
      addStorage: function(D) {
        c("store.addStorage(storage) is deprecated. Use createStore([storages])"), this._addStorage(D);
      }
    }, O = o(S, l, {
      plugins: []
    });
    return O.raw = {}, r(O, function(D, E) {
      u(D) && (O.raw[E] = a(O, D));
    }), r(d, function(D) {
      O._addStorage(D);
    }), r(g, function(D) {
      O._addPlugin(D);
    }), O;
  }
  return storeEngine;
}
var localStorage_1, hasRequiredLocalStorage;
function requireLocalStorage() {
  if (hasRequiredLocalStorage) return localStorage_1;
  hasRequiredLocalStorage = 1;
  var n = requireUtil(), e = n.Global;
  localStorage_1 = {
    name: "localStorage",
    read: r,
    write: a,
    each: o,
    remove: s,
    clearAll: u
  };
  function t() {
    return e.localStorage;
  }
  function r(h) {
    return t().getItem(h);
  }
  function a(h, l) {
    return t().setItem(h, l);
  }
  function o(h) {
    for (var l = t().length - 1; l >= 0; l--) {
      var c = t().key(l);
      h(r(c), c);
    }
  }
  function s(h) {
    return t().removeItem(h);
  }
  function u() {
    return t().clear();
  }
  return localStorage_1;
}
var oldFFGlobalStorage, hasRequiredOldFFGlobalStorage;
function requireOldFFGlobalStorage() {
  if (hasRequiredOldFFGlobalStorage) return oldFFGlobalStorage;
  hasRequiredOldFFGlobalStorage = 1;
  var n = requireUtil(), e = n.Global;
  oldFFGlobalStorage = {
    name: "oldFF-globalStorage",
    read: r,
    write: a,
    each: o,
    remove: s,
    clearAll: u
  };
  var t = e.globalStorage;
  function r(h) {
    return t[h];
  }
  function a(h, l) {
    t[h] = l;
  }
  function o(h) {
    for (var l = t.length - 1; l >= 0; l--) {
      var c = t.key(l);
      h(t[c], c);
    }
  }
  function s(h) {
    return t.removeItem(h);
  }
  function u() {
    o(function(h, l) {
      delete t[h];
    });
  }
  return oldFFGlobalStorage;
}
var oldIEUserDataStorage, hasRequiredOldIEUserDataStorage;
function requireOldIEUserDataStorage() {
  if (hasRequiredOldIEUserDataStorage) return oldIEUserDataStorage;
  hasRequiredOldIEUserDataStorage = 1;
  var n = requireUtil(), e = n.Global;
  oldIEUserDataStorage = {
    name: "oldIE-userDataStorage",
    write: s,
    read: u,
    each: h,
    remove: l,
    clearAll: c
  };
  var t = "storejs", r = e.document, a = g(), o = (e.navigator ? e.navigator.userAgent : "").match(/ (MSIE 8|MSIE 9|MSIE 10)\./);
  function s(m, _) {
    if (!o) {
      var y = d(m);
      a(function(b) {
        b.setAttribute(y, _), b.save(t);
      });
    }
  }
  function u(m) {
    if (!o) {
      var _ = d(m), y = null;
      return a(function(b) {
        y = b.getAttribute(_);
      }), y;
    }
  }
  function h(m) {
    a(function(_) {
      for (var y = _.XMLDocument.documentElement.attributes, b = y.length - 1; b >= 0; b--) {
        var S = y[b];
        m(_.getAttribute(S.name), S.name);
      }
    });
  }
  function l(m) {
    var _ = d(m);
    a(function(y) {
      y.removeAttribute(_), y.save(t);
    });
  }
  function c() {
    a(function(m) {
      var _ = m.XMLDocument.documentElement.attributes;
      m.load(t);
      for (var y = _.length - 1; y >= 0; y--)
        m.removeAttribute(_[y].name);
      m.save(t);
    });
  }
  var v = new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g");
  function d(m) {
    return m.replace(/^\d/, "___$&").replace(v, "___");
  }
  function g() {
    if (!r || !r.documentElement || !r.documentElement.addBehavior)
      return null;
    var m = "script", _, y, b;
    try {
      y = new ActiveXObject("htmlfile"), y.open(), y.write("<" + m + ">document.w=window</" + m + '><iframe src="/favicon.ico"></iframe>'), y.close(), _ = y.w.frames[0].document, b = _.createElement("div");
    } catch {
      b = r.createElement("div"), _ = r.body;
    }
    return function(S) {
      var O = [].slice.call(arguments, 0);
      O.unshift(b), _.appendChild(b), b.addBehavior("#default#userData"), b.load(t), S.apply(this, O), _.removeChild(b);
    };
  }
  return oldIEUserDataStorage;
}
var cookieStorage, hasRequiredCookieStorage;
function requireCookieStorage() {
  if (hasRequiredCookieStorage) return cookieStorage;
  hasRequiredCookieStorage = 1;
  var n = requireUtil(), e = n.Global, t = n.trim;
  cookieStorage = {
    name: "cookieStorage",
    read: a,
    write: s,
    each: o,
    remove: u,
    clearAll: h
  };
  var r = e.document;
  function a(c) {
    if (!c || !l(c))
      return null;
    var v = "(?:^|.*;\\s*)" + escape(c).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*";
    return unescape(r.cookie.replace(new RegExp(v), "$1"));
  }
  function o(c) {
    for (var v = r.cookie.split(/; ?/g), d = v.length - 1; d >= 0; d--)
      if (t(v[d])) {
        var g = v[d].split("="), m = unescape(g[0]), _ = unescape(g[1]);
        c(_, m);
      }
  }
  function s(c, v) {
    c && (r.cookie = escape(c) + "=" + escape(v) + "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/");
  }
  function u(c) {
    !c || !l(c) || (r.cookie = escape(c) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/");
  }
  function h() {
    o(function(c, v) {
      u(v);
    });
  }
  function l(c) {
    return new RegExp("(?:^|;\\s*)" + escape(c).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=").test(r.cookie);
  }
  return cookieStorage;
}
var sessionStorage_1, hasRequiredSessionStorage;
function requireSessionStorage() {
  if (hasRequiredSessionStorage) return sessionStorage_1;
  hasRequiredSessionStorage = 1;
  var n = requireUtil(), e = n.Global;
  sessionStorage_1 = {
    name: "sessionStorage",
    read: r,
    write: a,
    each: o,
    remove: s,
    clearAll: u
  };
  function t() {
    return e.sessionStorage;
  }
  function r(h) {
    return t().getItem(h);
  }
  function a(h, l) {
    return t().setItem(h, l);
  }
  function o(h) {
    for (var l = t().length - 1; l >= 0; l--) {
      var c = t().key(l);
      h(r(c), c);
    }
  }
  function s(h) {
    return t().removeItem(h);
  }
  function u() {
    return t().clear();
  }
  return sessionStorage_1;
}
var memoryStorage_1, hasRequiredMemoryStorage;
function requireMemoryStorage() {
  if (hasRequiredMemoryStorage) return memoryStorage_1;
  hasRequiredMemoryStorage = 1, memoryStorage_1 = {
    name: "memoryStorage",
    read: e,
    write: t,
    each: r,
    remove: a,
    clearAll: o
  };
  var n = {};
  function e(s) {
    return n[s];
  }
  function t(s, u) {
    n[s] = u;
  }
  function r(s) {
    for (var u in n)
      n.hasOwnProperty(u) && s(n[u], u);
  }
  function a(s) {
    delete n[s];
  }
  function o(s) {
    n = {};
  }
  return memoryStorage_1;
}
var all, hasRequiredAll;
function requireAll() {
  return hasRequiredAll || (hasRequiredAll = 1, all = [
    // Listed in order of usage preference
    requireLocalStorage(),
    requireOldFFGlobalStorage(),
    requireOldIEUserDataStorage(),
    requireCookieStorage(),
    requireSessionStorage(),
    requireMemoryStorage()
  ]), all;
}
var json2$1 = {}, hasRequiredJson2$1;
function requireJson2$1() {
  return hasRequiredJson2$1 || (hasRequiredJson2$1 = 1, typeof JSON != "object" && (JSON = {}), function() {
    var rx_one = /^[\],:{}\s]*$/, rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, rx_four = /(?:^|:|,)(?:\s*\[)+/g, rx_escapable = /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
    function f(n) {
      return n < 10 ? "0" + n : n;
    }
    function this_value() {
      return this.valueOf();
    }
    typeof Date.prototype.toJSON != "function" && (Date.prototype.toJSON = function() {
      return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null;
    }, Boolean.prototype.toJSON = this_value, Number.prototype.toJSON = this_value, String.prototype.toJSON = this_value);
    var gap, indent, meta, rep;
    function quote(n) {
      return rx_escapable.lastIndex = 0, rx_escapable.test(n) ? '"' + n.replace(rx_escapable, function(e) {
        var t = meta[e];
        return typeof t == "string" ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4);
      }) + '"' : '"' + n + '"';
    }
    function str(n, e) {
      var t, r, a, o, s = gap, u, h = e[n];
      switch (h && typeof h == "object" && typeof h.toJSON == "function" && (h = h.toJSON(n)), typeof rep == "function" && (h = rep.call(e, n, h)), typeof h) {
        case "string":
          return quote(h);
        case "number":
          return isFinite(h) ? String(h) : "null";
        case "boolean":
        case "null":
          return String(h);
        // If the type is "object", we might be dealing with an object or an array or
        // null.
        case "object":
          if (!h)
            return "null";
          if (gap += indent, u = [], Object.prototype.toString.apply(h) === "[object Array]") {
            for (o = h.length, t = 0; t < o; t += 1)
              u[t] = str(t, h) || "null";
            return a = u.length === 0 ? "[]" : gap ? `[
` + gap + u.join(`,
` + gap) + `
` + s + "]" : "[" + u.join(",") + "]", gap = s, a;
          }
          if (rep && typeof rep == "object")
            for (o = rep.length, t = 0; t < o; t += 1)
              typeof rep[t] == "string" && (r = rep[t], a = str(r, h), a && u.push(quote(r) + (gap ? ": " : ":") + a));
          else
            for (r in h)
              Object.prototype.hasOwnProperty.call(h, r) && (a = str(r, h), a && u.push(quote(r) + (gap ? ": " : ":") + a));
          return a = u.length === 0 ? "{}" : gap ? `{
` + gap + u.join(`,
` + gap) + `
` + s + "}" : "{" + u.join(",") + "}", gap = s, a;
      }
    }
    typeof JSON.stringify != "function" && (meta = {
      // table of character substitutions
      "\b": "\\b",
      "	": "\\t",
      "\n": "\\n",
      "\f": "\\f",
      "\r": "\\r",
      '"': '\\"',
      "\\": "\\\\"
    }, JSON.stringify = function(n, e, t) {
      var r;
      if (gap = "", indent = "", typeof t == "number")
        for (r = 0; r < t; r += 1)
          indent += " ";
      else typeof t == "string" && (indent = t);
      if (rep = e, e && typeof e != "function" && (typeof e != "object" || typeof e.length != "number"))
        throw new Error("JSON.stringify");
      return str("", { "": n });
    }), typeof JSON.parse != "function" && (JSON.parse = function(text, reviver) {
      var j;
      function walk(n, e) {
        var t, r, a = n[e];
        if (a && typeof a == "object")
          for (t in a)
            Object.prototype.hasOwnProperty.call(a, t) && (r = walk(a, t), r !== void 0 ? a[t] = r : delete a[t]);
        return reviver.call(n, e, a);
      }
      if (text = String(text), rx_dangerous.lastIndex = 0, rx_dangerous.test(text) && (text = text.replace(rx_dangerous, function(n) {
        return "\\u" + ("0000" + n.charCodeAt(0).toString(16)).slice(-4);
      })), rx_one.test(
        text.replace(rx_two, "@").replace(rx_three, "]").replace(rx_four, "")
      ))
        return j = eval("(" + text + ")"), typeof reviver == "function" ? walk({ "": j }, "") : j;
      throw new SyntaxError("JSON.parse");
    });
  }()), json2$1;
}
var json2, hasRequiredJson2;
function requireJson2() {
  if (hasRequiredJson2) return json2;
  hasRequiredJson2 = 1, json2 = n;
  function n() {
    return requireJson2$1(), {};
  }
  return json2;
}
var store_legacy, hasRequiredStore_legacy;
function requireStore_legacy() {
  if (hasRequiredStore_legacy) return store_legacy;
  hasRequiredStore_legacy = 1;
  var n = requireStoreEngine(), e = requireAll(), t = [requireJson2()];
  return store_legacy = n.createStore(e, t), store_legacy;
}
var store_legacyExports = requireStore_legacy();
const store = /* @__PURE__ */ getDefaultExportFromCjs(store_legacyExports);
const devtools = {
  isOpen: !1,
  orientation: void 0
}, threshold = 170, emitEvent = (n, e) => {
  globalThis.dispatchEvent(new globalThis.CustomEvent("devtoolschange", {
    detail: {
      isOpen: n,
      orientation: e
    }
  }));
}, main = ({ emitEvents: n = !0 } = {}) => {
  const e = globalThis.outerWidth - globalThis.innerWidth > threshold, t = globalThis.outerHeight - globalThis.innerHeight > threshold, r = e ? "vertical" : "horizontal";
  !(t && e) && (globalThis.Firebug && globalThis.Firebug.chrome && globalThis.Firebug.chrome.isInitialized || e || t) ? ((!devtools.isOpen || devtools.orientation !== r) && n && emitEvent(!0, r), devtools.isOpen = !0, devtools.orientation = r) : (devtools.isOpen && n && emitEvent(!1, void 0), devtools.isOpen = !1, devtools.orientation = void 0);
};
main({ emitEvents: !1 });
setInterval(main, 500);
class SysWeb extends SysBase {
  #t;
  constructor(...[e = {}, t = { cur: "prj/", crypto: !1, dip: "" }]) {
    super(e, t);
    const r = t.cur.split("/");
    this.#t = r.length > 2 ? r.slice(0, -2).join("/") + "/" : "", this.loaded(e, t);
  }
  async loaded(...[e, t]) {
    await super.loaded(e, t), document.querySelectorAll("[data-prj]").forEach((s) => {
      const u = s.attributes.getNamedItem("data-prj");
      u && s.addEventListener("click", () => {
        this.runSN(u.value);
      }, { passive: !0 });
    }), document.querySelectorAll("[data-reload]").forEach(
      (s) => s.addEventListener("click", () => {
        this.run();
      }, { passive: !0 })
      //this.elc.add(v, 'click', ()=> {void this.run()}, {passive: true})
      // ギャラリーであっても、ここには一度しか来ないので
    ), t.dip && (CmnLib.hDip = JSON.parse(t.dip));
    const r = new URLSearchParams(location.search), a = r.get("dip");
    if (a && (CmnLib.hDip = { ...CmnLib.hDip, ...JSON.parse(a.replaceAll("%2C", ",")) }), !argChk_Boolean(CmnLib.hDip, "oninit_run", !0)) return;
    argChk_Boolean(CmnLib.hDip, "dbg", !1) && (CmnLib.isDbg = !0, this.fetch = (s, u) => fetch(s, { ...u, mode: "cors" })), this.extPort = argChk_Num(CmnLib.hDip, "port", this.extPort);
    const o = r.get("cur");
    o && (t.cur = this.#t + o + "/"), await this.run();
  }
  #e = ":";
  async runSN(e) {
    this.arg.cur = this.#t + e + "/", this.#e !== this.arg.cur && (this.#e = this.arg.cur, await this.run());
  }
  async initVal(e, t) {
    const r = encodeURIComponent(document.location.hostname);
    e["const.sn.isDebugger"] = r === "localhost" || r === "127.0.0.1";
    const a = this.cfg.headNs;
    this.flushSub = this.arg.crypto ? async () => {
      store.set(a + "sys_", await this.enc(JSON.stringify(this.data.sys))), store.set(a + "mark_", await this.enc(JSON.stringify(this.data.mark))), store.set(a + "kidoku_", await this.enc(JSON.stringify(this.data.kidoku)));
    } : () => {
      store.set(a + "sys", this.data.sys), store.set(a + "mark", this.data.mark), store.set(a + "kidoku", this.data.kidoku);
    };
    const o = a + (this.arg.crypto ? "sys_" : "sys");
    if (e["const.sn.isFirstBoot"] = store.get(o) === void 0) {
      this.data.sys = {}, this.data.mark = {}, this.data.kidoku = {}, t(this.data);
      return;
    }
    if (!this.arg.crypto) {
      this.data.sys = store.get(a + "sys"), this.data.mark = store.get(a + "mark"), this.data.kidoku = store.get(a + "kidoku"), t(this.data);
      return;
    }
    let s = "";
    try {
      s = "sys", this.data.sys = JSON.parse(await this.dec("json", store.get(a + "sys_"))), s += String(this.val.getVal("sys:TextLayer.Back.Alpha", 1)), s = "mark", this.data.mark = JSON.parse(await this.dec("json", store.get(a + "mark_"))), s = "kidoku", this.data.kidoku = JSON.parse(await this.dec("json", store.get(a + "kidoku_")));
    } catch (u) {
      console.error(`セーブデータ（${s}）が壊れています。一度クリアする必要があります(a) %o`, u);
    }
    t(this.data);
  }
  init(e, t, r) {
    const a = super.init(e, t, r), o = t.view.parentElement;
    if ("requestFullscreen" in document.body)
      this.tglFlscr_sub = this.isFullScr ? () => document.exitFullscreen() : () => o.requestFullscreen(), this.elc.add(document, "fullscreenchange", () => {
        this.isFullScr = !!document.fullscreenElement;
      });
    else {
      const s = document;
      this.tglFlscr_sub = this.isFullScr ? () => s.webkitCancelFullScreen() : () => o.webkitRequestFullscreen(), this.elc.add(document, "fullscreenchange", () => {
        this.isFullScr = !!s.webkitFullscreenElement;
      });
    }
    return this.cfg.oCfg.debug.devtool || this.elc.add(globalThis, "devtoolschange", (s) => {
      s.detail.isOpen && (console.error("DevToolは禁止されています。許可する場合は【プロジェクト設定】の【devtool】をONに。"), this.main?.destroy());
    }, { once: !0, passive: !0 }), a;
  }
  cvsResize() {
    if (super.cvsResize(), !this.isFullScr || !this.main) return;
    const e = this.main.cvs.style;
    e.width = e.height = "";
  }
  pathBaseCnvSnPath4Dbg = "${pathbase}/";
  // プレイデータをエクスポート
  _export = () => ((async () => {
    const e = JSON.stringify({
      sys: this.data.sys,
      mark: this.data.mark,
      kidoku: this.data.kidoku
    }), t = this.arg.crypto ? await this.enc(e) : e, r = new Blob([t], { type: "text/json" }), a = document.createElement("a");
    a.href = URL.createObjectURL(r), a.download = (this.arg.crypto ? "" : "no_crypto_") + this.cfg.headNs + getDateStr("-", "_", "") + ".swpd", a.click(), CmnLib.debugLog && console.log("プレイデータをエクスポートしました"), setTimeout(() => this.fire("sn:exported", new MouseEvent("click")), 10);
  })(), !1);
  // プレイデータをインポート
  _import = () => (new Promise((e, t) => {
    const r = document.createElement("input");
    r.type = "file", r.accept = ".swpd, text/plain", r.onchange = () => {
      const a = r.files?.[0];
      a ? e(a) : t(new Error("ファイル選択に失敗しました"));
    }, r.click();
  }).then(async (e) => {
    const t = await e.text(), r = JSON.parse(this.arg.crypto ? await this.dec("json", t) : t);
    if (r.sys["const.sn.cfg.ns"] !== this.cfg.oCfg.save_ns) {
      console.error(`別のゲーム【プロジェクト名=${r.sys["const.sn.cfg.ns"]}】のプレイデータです`);
      return;
    }
    this.data.sys = r.sys, this.data.mark = r.mark, this.data.kidoku = r.kidoku, this.flush(), this.val.updateData(r), CmnLib.debugLog && console.log("プレイデータをインポートしました"), this.fire("sn:imported", new MouseEvent("click"));
  }).catch((e) => console.error(`異常なプレイデータです ${String(e)}`)), !1);
  // ＵＲＬを開く
  navigate_to = (e) => {
    const { url: t } = e;
    if (!t) throw "[navigate_to] urlは必須です";
    return globalThis.open(t, "_blank"), !1;
  };
  // タイトル指定
  titleSub(e) {
    document.title = e, document.querySelectorAll("[data-title]").forEach((t) => {
      t.textContent = e;
    });
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async savePic(e, t) {
    const r = document.createElement("a");
    r.href = t, r.download = e, r.click(), CmnLib.debugLog && console.log("画像ファイルをダウンロードします");
  }
  #i = {};
  async appendFile(e, t) {
    const r = (this.#i[e] ?? "") + t;
    this.#i[e] = r, await this.outputFile(e, r);
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async outputFile(e, t) {
    const r = new Blob([t], { type: "text/json" }), a = document.createElement("a");
    a.href = URL.createObjectURL(r), a.download = e, a.click();
  }
}
const { BlurFilter, ColorMatrixFilter, NoiseFilter } = filters;
class Layer {
  layname = "";
  name_ = "";
  set name(e) {
    this.name_ = e;
  }
  get name() {
    return this.name_;
  }
  ctn = new Sprite(Texture.EMPTY);
  // tsy用
  get alpha() {
    return this.ctn.alpha;
  }
  set alpha(e) {
    this.ctn.alpha = e;
  }
  get height() {
    return this.ctn.height;
  }
  get rotation() {
    return this.ctn.angle;
  }
  set rotation(e) {
    this.ctn.angle = e;
  }
  get scale_x() {
    return this.ctn.scale.x;
  }
  set scale_x(e) {
    this.ctn.scale.x = e;
  }
  get scale_y() {
    return this.ctn.scale.y;
  }
  set scale_y(e) {
    this.ctn.scale.y = e;
  }
  get width() {
    return this.ctn.width;
  }
  get x() {
    return this.ctn.x;
  }
  set x(e) {
    this.procSetX(e), this.ctn.x = e;
  }
  procSetX(e) {
  }
  // set を override できないので
  get y() {
    return this.ctn.y;
  }
  set y(e) {
    this.procSetY(e), this.ctn.y = e;
  }
  procSetY(e) {
  }
  // set を override できないので
  destroy() {
  }
  lay(e) {
    const t = this.ctn;
    return "alpha" in e && (t.alpha = argChk_Num(e, "alpha", 1)), Layer.setBlendmode(t, e), ("pivot_x" in e || "pivot_y" in e) && t.pivot.set(
      argChk_Num(e, "pivot_x", t.pivot.x),
      argChk_Num(e, "pivot_y", t.pivot.y)
    ), "rotation" in e && (t.angle = argChk_Num(e, "rotation", 0)), ("scale_x" in e || "scale_y" in e) && t.scale.set(
      argChk_Num(e, "scale_x", t.scale.x),
      argChk_Num(e, "scale_y", t.scale.y)
    ), "visible" in e && (t.visible = argChk_Boolean(e, "visible", !0)), "filter" in e && (t.filters = [Layer.bldFilters(e)], this.aFltHArg = [e]), !1;
  }
  aFltHArg = [];
  /*
  * 現状未サポート
  	* FXAAFilter		geeks3d.com のコードに基づいた基本的な FXAA (高速近似アンチエイリアシング) の実装ですが、WebGL でサポートされていないため、texture2DLod 要素が削除されたという変更が加えられています。
  	* 	https://pixijs.download/v6.5.10/docs/PIXI.filters.FXAAFilter.html
  	* DisplacementFilter	指定されたテクスチャ (ディスプレイスメント マップと呼ばれる) のピクセル値を使用して、オブジェクトのディスプレイスメントを実行します。
  	* 	https://pixijs.download/v6.5.10/docs/PIXI.filters.DisplacementFilter.html
  	* 		人形城のヒビキとかのやつ？
  */
  // フィルター生成
  static bldFilters(e) {
    const { filter: t = "" } = e, r = Layer.hBldFilter[t];
    if (!r) throw "filter が異常です";
    const a = r(e);
    a.enabled = argChk_Boolean(e, "enable_filter", !0);
    const { blendmode: o } = e;
    return o && (a.blendMode = Layer.getBlendmodeNum(o)), a;
  }
  // https://github.com/pixijs/filters
  static hBldFilter = {
    // https://pixijs.download/v6.5.10/docs/PIXI.filters.BlurFilter.html
    blur: (e) => {
      const t = new BlurFilter(
        argChk_Num(e, "strength", 8),
        // 強さ
        argChk_Num(e, "quality", 4),
        // 品質
        "resolution" in e ? argChk_Num(e, "resolution", 0) : void 0,
        // 解像度
        argChk_Num(e, "kernel_size", 5)
        // カーネルサイズ。値は 5、7、9、11、13、15。
      );
      return t.blurX = uint(argChk_Num(e, "blur_x", 2)), t.blurY = uint(argChk_Num(e, "blur_y", 2)), t.repeatEdgePixels = argChk_Boolean(e, "repeat_edge_pixels", !1), t;
    },
    // https://pixijs.download/v6.5.10/docs/PIXI.filters.NoiseFilter.html
    noise: (e) => new NoiseFilter(
      // ノイズエフェクト
      argChk_Num(e, "noise", 0.5),
      // 適用するノイズの量。この値は (0, 1] の範囲内
      "seed" in e ? argChk_Num(e, "seed", 0) : void 0
      // ランダム ノイズの生成に適用するシード値。 Math.random() を使用するのが適切な値です。
    ),
    // https://pixijs.download/v6.5.10/docs/PIXI.filters.ColorMatrixFilter.html
    color_matrix: (e) => {
      const t = new ColorMatrixFilter();
      t.alpha = uint(argChk_Num(e, "alpha", 1));
      const { matrix: r = "" } = e;
      if (r) {
        const a = r.split(","), o = a.length;
        if (o !== 20) throw `matrix の個数（${String(o)}）が 20 ではありません`;
        for (let s = 0; s < o; ++s) t.matrix[s] = uint(a[s]);
      } else
        t.matrix[0] = uint(argChk_Num(e, "rtor", 1)), t.matrix[1] = uint(argChk_Num(e, "gtor", 0)), t.matrix[2] = uint(argChk_Num(e, "btor", 0)), t.matrix[3] = uint(argChk_Num(e, "ator", 0)), t.matrix[4] = uint(argChk_Num(e, "pr", 0)), t.matrix[5] = uint(argChk_Num(e, "rtog", 0)), t.matrix[6] = uint(argChk_Num(e, "gtog", 1)), t.matrix[7] = uint(argChk_Num(e, "btog", 0)), t.matrix[8] = uint(argChk_Num(e, "atog", 0)), t.matrix[9] = uint(argChk_Num(e, "pg", 0)), t.matrix[10] = uint(argChk_Num(e, "rtob", 0)), t.matrix[11] = uint(argChk_Num(e, "gtob", 0)), t.matrix[12] = uint(argChk_Num(e, "btob", 1)), t.matrix[13] = uint(argChk_Num(e, "atob", 0)), t.matrix[14] = uint(argChk_Num(e, "pb", 0)), t.matrix[15] = uint(argChk_Num(e, "rtoa", 0)), t.matrix[16] = uint(argChk_Num(e, "gtoa", 0)), t.matrix[17] = uint(argChk_Num(e, "btoa", 0)), t.matrix[18] = uint(argChk_Num(e, "atoa", 1)), t.matrix[19] = uint(argChk_Num(e, "pa", 0));
      return t;
    },
    black_and_white: (e) => {
      const t = new ColorMatrixFilter();
      return t.blackAndWhite(
        argChk_Boolean(e, "multiply", !1)
        // true の場合、現在の行列と行列を乗算
      ), t;
    },
    brightness: (e) => {
      const t = new ColorMatrixFilter();
      return t.brightness(
        argChk_Num(e, "b", 0.5),
        // 明るさの値 (0 ～ 1、0 は黒)
        argChk_Boolean(e, "multiply", !1)
        // true の場合、現在の行列と行列を乗算
      ), t;
    },
    browni: (e) => {
      const t = new ColorMatrixFilter();
      return t.browni(
        argChk_Boolean(e, "multiply", !0)
        // true の場合、現在の行列と行列を乗算
      ), t;
    },
    color_tone: (e) => {
      const t = new ColorMatrixFilter();
      return t.colorTone(
        argChk_Num(e, "desaturation", 0.5),
        argChk_Num(e, "toned", 0.5),
        argChk_Num(e, "light_color", 16770432),
        argChk_Num(e, "dark_color", 16770432),
        argChk_Boolean(e, "multiply", !1)
        // true の場合、現在の行列と行列を乗算
      ), t;
    },
    contrast: (e) => {
      const t = new ColorMatrixFilter();
      return t.contrast(
        argChk_Num(e, "amount", 0.5),
        // コントラストの値 (0-1)
        argChk_Boolean(e, "multiply", !1)
        // true の場合、現在の行列と行列を乗算
      ), t;
    },
    grayscale: (e) => {
      const t = new ColorMatrixFilter();
      return t.grayscale(
        argChk_Num(e, "scale", 0.5),
        // グレーの値 (0 ～ 1、0 は黒)
        argChk_Boolean(e, "multiply", !1)
        // true の場合、現在の行列と行列を乗算
      ), t;
    },
    hue: (e) => {
      const t = new ColorMatrixFilter();
      return t.hue(
        argChk_Num(e, "f_rotation", 90),
        // 0だと変化なしで分かりづらいので
        // 度単位
        argChk_Boolean(e, "multiply", !1)
        // true の場合、現在の行列と行列を乗算
      ), t;
    },
    kodachrome: (e) => {
      const t = new ColorMatrixFilter();
      return t.kodachrome(
        argChk_Boolean(e, "multiply", !0)
        // true の場合、現在の行列と行列を乗算
      ), t;
    },
    lsd: (e) => {
      const t = new ColorMatrixFilter();
      return t.lsd(
        argChk_Boolean(e, "multiply", !1)
        // true の場合、現在の行列と行列を乗算
      ), t;
    },
    negative: (e) => {
      const t = new ColorMatrixFilter();
      return t.negative(
        argChk_Boolean(e, "multiply", !1)
        // true の場合、現在の行列と行列を乗算
      ), t;
    },
    night: (e) => {
      const t = new ColorMatrixFilter();
      return t.night(
        argChk_Num(e, "intensity", 0.5),
        // 夜の効果の強さ
        argChk_Boolean(e, "multiply", !1)
        // true の場合、現在の行列と行列を乗算
      ), t;
    },
    polaroid: (e) => {
      const t = new ColorMatrixFilter();
      return t.polaroid(
        argChk_Boolean(e, "multiply", !1)
        // true の場合、現在の行列と行列を乗算
      ), t;
    },
    predator: (e) => {
      const t = new ColorMatrixFilter();
      return t.predator(
        argChk_Num(e, "amount", 0.5),
        // 捕食者は自分の将来の犠牲者をどれほど感じているか
        argChk_Boolean(e, "multiply", !1)
        // true の場合、現在の行列と行列を乗算
      ), t;
    },
    saturate: (e) => {
      const t = new ColorMatrixFilter();
      return t.saturate(
        argChk_Num(e, "amount", 0.5),
        // 飽和量(0～1)
        argChk_Boolean(e, "multiply", !1)
        // true の場合、現在の行列と行列を乗算
      ), t;
    },
    sepia: (e) => {
      const t = new ColorMatrixFilter();
      return t.sepia(
        argChk_Boolean(e, "multiply", !1)
        // true の場合、現在の行列と行列を乗算
      ), t;
    },
    technicolor: (e) => {
      const t = new ColorMatrixFilter();
      return t.technicolor(
        argChk_Boolean(e, "multiply", !0)
        // true の場合、現在の行列と行列を乗算
      ), t;
    },
    tint: (e) => {
      const t = new ColorMatrixFilter();
      return t.tint(
        argChk_Num(e, "f_color", 8947848),
        // 色合いの色。 これは 16 進数値です。
        argChk_Boolean(e, "multiply", !1)
        // true の場合、現在の行列と行列を乗算
      ), t;
    },
    to_bgr: (e) => {
      const t = new ColorMatrixFilter();
      return t.toBGR(
        argChk_Boolean(e, "multiply", !1)
        // true の場合、現在の行列と行列を乗算
      ), t;
    },
    vintage: (e) => {
      const t = new ColorMatrixFilter();
      return t.vintage(
        argChk_Boolean(e, "multiply", !0)
        // true の場合、現在の行列と行列を乗算
      ), t;
    }
  };
  static setBlendmode(e, t) {
    const { blendmode: r } = t;
    if (!r) return;
    const a = Layer.getBlendmodeNum(r);
    e instanceof Sprite && (e.blendMode = a);
    for (const o of e.children)
      o instanceof Sprite && (o.blendMode = a);
  }
  static getBlendmodeNum(e) {
    if (!e) return BLEND_MODES.NORMAL;
    const t = Layer.#t[e];
    if (t !== void 0) return t;
    throw `${e} はサポートされない blendmode です`;
  }
  static #t = {
    normal: BLEND_MODES.NORMAL,
    add: BLEND_MODES.ADD,
    multiply: BLEND_MODES.MULTIPLY,
    screen: BLEND_MODES.SCREEN
    /*
    		'overlay'		: BLEND_MODES.OVERLAY,
    		'darken'		: BLEND_MODES.DARKEN,
    		'lighten'		: BLEND_MODES.LIGHTEN,
    		'color_dodge'	: BLEND_MODES.COLOR_DODGE,
    		'color_burn'	: BLEND_MODES.COLOR_BURN,
    		'hard_light'	: BLEND_MODES.HARD_LIGHT,
    		'soft_light'	: BLEND_MODES.SOFT_LIGHT,
    		'difference'	: BLEND_MODES.DIFFERENCE,
    		'exclusion'		: BLEND_MODES.EXCLUSION,
    		'hue'			: BLEND_MODES.HUE,
    		'saturation'	: BLEND_MODES.SATURATION,
    		'color'			: BLEND_MODES.COLOR,
    		'luminosity'	: BLEND_MODES.LUMINOSITY,
    
    		'normal_npm'	: BLEND_MODES.NORMAL_NPM,
    		'add_npm'		: BLEND_MODES.ADD_NPM,
    		'screen_npm'	: BLEND_MODES.SCREEN_NPM,
    		'none'			: BLEND_MODES.NONE,
    		'src_in'		: BLEND_MODES.SRC_IN,
    		'src_out'		: BLEND_MODES.SRC_OUT,
    		'src_atop'		: BLEND_MODES.SRC_ATOP,
    		'dst_over'		: BLEND_MODES.DST_OVER,
    		'dst_in'		: BLEND_MODES.DST_IN,
    		'dst_out'		: BLEND_MODES.DST_OUT,
    		'dst_atop'		: BLEND_MODES.DST_ATOP,
    		'subtract'		: BLEND_MODES.SUBTRACT,
    		'src_over'		: BLEND_MODES.SRC_OVER,
    		'erase'			: BLEND_MODES.ERASE,
    		'xor'			: BLEND_MODES.XOR,
    */
  };
  static getNum2Blendmode(e) {
    return Layer.#e[e] ?? "normal";
  }
  static #e = {
    0: "normal",
    1: "add",
    2: "multiply",
    3: "screen"
  };
  // アニメ・動画があるか
  // eslint-disable-next-line @typescript-eslint/class-literal-property-style
  get containMovement() {
    return !1;
  }
  renderStart(e) {
  }
  renderEnd() {
  }
  clearLay(e) {
    this.ctn.alpha = 1, this.ctn.blendMode = BLEND_MODES.NORMAL, this.ctn.pivot.set(0, 0), this.ctn.angle = 0, this.ctn.scale.set(1, 1), argChk_Boolean(e, "clear_filter", !1) && (this.ctn.filters = null, this.aFltHArg = []);
  }
  copy(e, t) {
    const r = this.name_;
    this.playback(e.record(), t), this.name = r;
  }
  record() {
    return {
      name: this.name_,
      idx: this.ctn.parent.getChildIndex(this.ctn),
      alpha: this.ctn.alpha,
      blendMode: this.ctn.blendMode,
      rotation: this.ctn.angle,
      scale_x: this.ctn.scale.x,
      scale_y: this.ctn.scale.y,
      pivot_x: this.ctn.pivot.x,
      pivot_y: this.ctn.pivot.y,
      x: this.ctn.x,
      y: this.ctn.y,
      visible: this.ctn.visible,
      aFltHArg: this.aFltHArg
    };
  }
  playback(e, t) {
    this.name = e.name, this.clearLay({ clear_filter: !0 }), this.ctn.alpha = e.alpha, this.ctn.blendMode = e.blendMode, this.ctn.angle = e.rotation, this.ctn.scale.set(e.scale_x, e.scale_y), this.ctn.pivot.set(e.pivot_x, e.pivot_y), this.ctn.position.set(e.x, e.y), this.ctn.visible = e.visible, this.aFltHArg = e.aFltHArg ?? [], this.ctn.filters = this.aFltHArg.length === 0 ? null : this.aFltHArg.map((r) => Layer.bldFilters(r));
  }
  snapshot(e, t) {
    e.render(this.ctn, { clear: !1 }), t();
  }
  snapshot_end() {
  }
  makeDesignCast(e) {
  }
  makeDesignCastChildren(e) {
  }
  showDesignCast() {
  }
  showDesignCastChildren() {
  }
  cvsResize() {
  }
  cvsResizeChildren() {
  }
  dump() {
    return ` "idx":${String(this.ctn.parent.getChildIndex(this.ctn))}, "visible":"${String(this.ctn.visible)}", "left":${String(this.ctn.x)}, "top":${String(this.ctn.y)}, "alpha":${String(this.ctn.alpha)}, "rotation":${String(this.ctn.angle)}, "name":"${this.name_}", "scale_x":${String(this.ctn.scale.x)}, "scale_y":${String(this.ctn.scale.y)}, "filters": [${this.aFltHArg.map((e) => `"${e.filter ?? ""}"`).join(",")}]`;
  }
  static setXY(e, t, r, a = !1, o = !1) {
    if (t.pos) {
      Layer.setXYByPos(e, t.pos, r);
      return;
    }
    const s = e.getBounds(), u = r.scale.x < 0 ? -r.scale.x : r.scale.x, h = u === 1 ? s.width : s.width * u, l = r.scale.y < 0 ? -r.scale.y : r.scale.y, c = l === 1 ? s.height : s.height * l;
    let v = r.x;
    "left" in t ? (v = argChk_Num(t, "left", 0), v > -1 && v < 1 && (v *= CmnLib.stageW)) : "center" in t ? (v = argChk_Num(t, "center", 0), v > -1 && v < 1 && (v *= CmnLib.stageW), v -= (o ? h / 3 : h) / 2) : "right" in t ? (v = argChk_Num(t, "right", 0), v > -1 && v < 1 && (v *= CmnLib.stageW), v -= o ? h / 3 : h) : "s_right" in t && (v = argChk_Num(t, "s_right", 0), v > -1 && v < 1 && (v *= CmnLib.stageW), v = CmnLib.stageW - v - (o ? h / 3 : h)), r.x = int(r.scale.x < 0 ? v + (o ? h / 3 : h) : v);
    let d = r.y;
    "top" in t ? (d = argChk_Num(t, "top", 0), d > -1 && d < 1 && (d *= CmnLib.stageH)) : "middle" in t ? (d = argChk_Num(t, "middle", 0), d > -1 && d < 1 && (d *= CmnLib.stageH), d -= c / 2) : "bottom" in t ? (d = argChk_Num(t, "bottom", 0), d > -1 && d < 1 && (d *= CmnLib.stageH), d -= c) : "s_bottom" in t && (d = argChk_Num(t, "s_bottom", 0), d > -1 && d < 1 && (d *= CmnLib.stageH), d = CmnLib.stageH - d - c), r.y = int(r.scale.y < 0 ? d + c : d), a && !("left" in t) && !("center" in t) && !("right" in t) && !("s_right" in t) && !("top" in t) && !("middle" in t) && !("bottom" in t) && !("s_bottom" in t) && Layer.setXYByPos(e, "c", r);
  }
  static setXYByPos(e, t, r) {
    if (t === "stay") return;
    const a = e.getBounds(), o = r.scale.x < 0 ? -r.scale.x : r.scale.x, s = o === 1 ? a.width : a.width * o, u = r.scale.y < 0 ? -r.scale.y : r.scale.y, h = u === 1 ? a.height : a.height * u;
    let l = 0;
    !t || t === "c" ? l = CmnLib.stageW * 0.5 : t === "r" ? l = CmnLib.stageW - s * 0.5 : t === "l" ? l = s * 0.5 : l = int(t), r.x = int(l - s * 0.5), r.y = CmnLib.stageH - h, r.scale.x < 0 && (r.x += s), r.scale.y < 0 && (r.y += h);
  }
  static setXYCenter(e) {
    const t = e.getBounds();
    e.x = (CmnLib.stageW - t.width) * 0.5, e.y = (CmnLib.stageH - t.height) * 0.5;
  }
}
export {
  Application as A,
  AnimatedSprite as B,
  ConfigBase as C,
  EVNM_KEY as D,
  EventListenerCtn as E,
  Filter as F,
  Graphics as G,
  EVNM_CLICK as H,
  SysBase as I,
  EVNM_BUTTON as J,
  mesErrJSON as K,
  Loader as L,
  Rectangle as M,
  initStyle as N,
  TextStyle as O,
  Text as P,
  TextureCache as Q,
  RPN_COMP_CHIN as R,
  SEARCH_PATH_ARG_EXT as S,
  Ticker as T,
  BLEND_MODES as U,
  SysWeb as V,
  CmnLib as a,
  getFn as b,
  commonjsGlobal as c,
  clearTextureCache as d,
  argChk_Boolean as e,
  getDateStr as f,
  getDefaultExportFromCjs as g,
  creSAVEDATA as h,
  creTMP_DATA as i,
  int as j,
  creSYS_DATA as k,
  argChk_Num as l,
  i as m,
  LoaderResource as n,
  extensions as o,
  parseColor as p,
  Container as q,
  argChk_Color as r,
  skipHello as s,
  autoDetectRenderer as t,
  uint as u,
  RenderTexture as v,
  addStyle as w,
  Sprite as x,
  Texture as y,
  Layer as z
};
//# sourceMappingURL=web2.js.map
