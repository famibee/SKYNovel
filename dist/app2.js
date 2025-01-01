import { parse as ch, format as dh, resolve as ph } from "url";
var Ds = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Ti(i) {
  return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, "default") ? i.default : i;
}
var fr = { exports: {} };
/*!
 * Platform.js v1.3.6
 * Copyright 2014-2020 Benjamin Tan
 * Copyright 2011-2013 John-David Dalton
 * Available under MIT license
 */
var vh = fr.exports, Ls;
function _h() {
  return Ls || (Ls = 1, function(i, t) {
    (function() {
      var e = {
        function: !0,
        object: !0
      }, r = e[typeof window] && window || this, n = t, s = i && !i.nodeType && i, a = n && s && typeof Ds == "object" && Ds;
      a && (a.global === a || a.window === a || a.self === a) && (r = a);
      var o = Math.pow(2, 53) - 1, h = /\bOpera/, u = Object.prototype, l = u.hasOwnProperty, f = u.toString;
      function c(T) {
        return T = String(T), T.charAt(0).toUpperCase() + T.slice(1);
      }
      function d(T, C, O) {
        var U = {
          "10.0": "10",
          "6.4": "10 Technical Preview",
          "6.3": "8.1",
          "6.2": "8",
          "6.1": "Server 2008 R2 / 7",
          "6.0": "Server 2008 / Vista",
          "5.2": "Server 2003 / XP 64-bit",
          "5.1": "XP",
          "5.01": "2000 SP1",
          "5.0": "2000",
          "4.0": "NT",
          "4.90": "ME"
        };
        return C && O && /^Win/i.test(T) && !/^Windows Phone /i.test(T) && (U = U[/[\d.]+$/.exec(T)]) && (T = "Windows " + U), T = String(T), C && O && (T = T.replace(RegExp(C, "i"), O)), T = v(
          T.replace(/ ce$/i, " CE").replace(/\bhpw/i, "web").replace(/\bMacintosh\b/, "Mac OS").replace(/_PowerPC\b/i, " OS").replace(/\b(OS X) [^ \d]+/i, "$1").replace(/\bMac (OS X)\b/, "$1").replace(/\/(\d)/, " $1").replace(/_/g, ".").replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, "").replace(/\bx86\.64\b/gi, "x86_64").replace(/\b(Windows Phone) OS\b/, "$1").replace(/\b(Chrome OS \w+) [\d.]+\b/, "$1").split(" on ")[0]
        ), T;
      }
      function p(T, C) {
        var O = -1, U = T ? T.length : 0;
        if (typeof U == "number" && U > -1 && U <= o)
          for (; ++O < U; )
            C(T[O], O, T);
        else
          _(T, C);
      }
      function v(T) {
        return T = P(T), /^(?:webOS|i(?:OS|P))/.test(T) ? T : c(T);
      }
      function _(T, C) {
        for (var O in T)
          l.call(T, O) && C(T[O], O, T);
      }
      function g(T) {
        return T == null ? c(T) : f.call(T).slice(8, -1);
      }
      function I(T, C) {
        var O = T != null ? typeof T[C] : "number";
        return !/^(?:boolean|number|string|undefined)$/.test(O) && (O == "object" ? !!T[C] : !0);
      }
      function E(T) {
        return String(T).replace(/([ -])(?!$)/g, "$1?");
      }
      function B(T, C) {
        var O = null;
        return p(T, function(U, K) {
          O = C(O, U, K, T);
        }), O;
      }
      function P(T) {
        return String(T).replace(/^ +| +$/g, "");
      }
      function A(T) {
        var C = r, O = T && typeof T == "object" && g(T) != "String";
        O && (C = T, T = null);
        var U = C.navigator || {}, K = U.userAgent || "";
        T || (T = K);
        var nt = O ? !!U.likeChrome : /\bChrome\b/.test(T) && !/internal|\n/i.test(f.toString()), ft = "Object", W = O ? ft : "ScriptBridgingProxyObject", m = O ? ft : "Environment", b = O && C.java ? "JavaPackage" : g(C.java), y = O ? ft : "RuntimeObject", S = /\bJava/.test(b) && C.java, M = S && g(C.environment) == m, w = S ? "a" : "α", L = S ? "b" : "β", k = C.document || {}, Y = C.operamini || C.opera, $ = h.test($ = O && Y ? Y["[[Class]]"] : g(Y)) ? $ : Y = null, x, it = T, X = [], pt = null, Q = T == K, H = Q && Y && typeof Y.version == "function" && Y.version(), Et, tt = kt([
          { label: "EdgeHTML", pattern: "Edge" },
          "Trident",
          { label: "WebKit", pattern: "AppleWebKit" },
          "iCab",
          "Presto",
          "NetFront",
          "Tasman",
          "KHTML",
          "Gecko"
        ]), N = Ue([
          "Adobe AIR",
          "Arora",
          "Avant Browser",
          "Breach",
          "Camino",
          "Electron",
          "Epiphany",
          "Fennec",
          "Flock",
          "Galeon",
          "GreenBrowser",
          "iCab",
          "Iceweasel",
          "K-Meleon",
          "Konqueror",
          "Lunascape",
          "Maxthon",
          { label: "Microsoft Edge", pattern: "(?:Edge|Edg|EdgA|EdgiOS)" },
          "Midori",
          "Nook Browser",
          "PaleMoon",
          "PhantomJS",
          "Raven",
          "Rekonq",
          "RockMelt",
          { label: "Samsung Internet", pattern: "SamsungBrowser" },
          "SeaMonkey",
          { label: "Silk", pattern: "(?:Cloud9|Silk-Accelerated)" },
          "Sleipnir",
          "SlimBrowser",
          { label: "SRWare Iron", pattern: "Iron" },
          "Sunrise",
          "Swiftfox",
          "Vivaldi",
          "Waterfox",
          "WebPositive",
          { label: "Yandex Browser", pattern: "YaBrowser" },
          { label: "UC Browser", pattern: "UCBrowser" },
          "Opera Mini",
          { label: "Opera Mini", pattern: "OPiOS" },
          "Opera",
          { label: "Opera", pattern: "OPR" },
          "Chromium",
          "Chrome",
          { label: "Chrome", pattern: "(?:HeadlessChrome)" },
          { label: "Chrome Mobile", pattern: "(?:CriOS|CrMo)" },
          { label: "Firefox", pattern: "(?:Firefox|Minefield)" },
          { label: "Firefox for iOS", pattern: "FxiOS" },
          { label: "IE", pattern: "IEMobile" },
          { label: "IE", pattern: "MSIE" },
          "Safari"
        ]), G = er([
          { label: "BlackBerry", pattern: "BB10" },
          "BlackBerry",
          { label: "Galaxy S", pattern: "GT-I9000" },
          { label: "Galaxy S2", pattern: "GT-I9100" },
          { label: "Galaxy S3", pattern: "GT-I9300" },
          { label: "Galaxy S4", pattern: "GT-I9500" },
          { label: "Galaxy S5", pattern: "SM-G900" },
          { label: "Galaxy S6", pattern: "SM-G920" },
          { label: "Galaxy S6 Edge", pattern: "SM-G925" },
          { label: "Galaxy S7", pattern: "SM-G930" },
          { label: "Galaxy S7 Edge", pattern: "SM-G935" },
          "Google TV",
          "Lumia",
          "iPad",
          "iPod",
          "iPhone",
          "Kindle",
          { label: "Kindle Fire", pattern: "(?:Cloud9|Silk-Accelerated)" },
          "Nexus",
          "Nook",
          "PlayBook",
          "PlayStation Vita",
          "PlayStation",
          "TouchPad",
          "Transformer",
          { label: "Wii U", pattern: "WiiU" },
          "Wii",
          "Xbox One",
          { label: "Xbox 360", pattern: "Xbox" },
          "Xoom"
        ]), V = _e({
          Apple: { iPad: 1, iPhone: 1, iPod: 1 },
          Alcatel: {},
          Archos: {},
          Amazon: { Kindle: 1, "Kindle Fire": 1 },
          Asus: { Transformer: 1 },
          "Barnes & Noble": { Nook: 1 },
          BlackBerry: { PlayBook: 1 },
          Google: { "Google TV": 1, Nexus: 1 },
          HP: { TouchPad: 1 },
          HTC: {},
          Huawei: {},
          Lenovo: {},
          LG: {},
          Microsoft: { Xbox: 1, "Xbox One": 1 },
          Motorola: { Xoom: 1 },
          Nintendo: { "Wii U": 1, Wii: 1 },
          Nokia: { Lumia: 1 },
          Oppo: {},
          Samsung: { "Galaxy S": 1, "Galaxy S2": 1, "Galaxy S3": 1, "Galaxy S4": 1 },
          Sony: { PlayStation: 1, "PlayStation Vita": 1 },
          Xiaomi: { Mi: 1, Redmi: 1 }
        }), D = wr([
          "Windows Phone",
          "KaiOS",
          "Android",
          "CentOS",
          { label: "Chrome OS", pattern: "CrOS" },
          "Debian",
          { label: "DragonFly BSD", pattern: "DragonFly" },
          "Fedora",
          "FreeBSD",
          "Gentoo",
          "Haiku",
          "Kubuntu",
          "Linux Mint",
          "OpenBSD",
          "Red Hat",
          "SuSE",
          "Ubuntu",
          "Xubuntu",
          "Cygwin",
          "Symbian OS",
          "hpwOS",
          "webOS ",
          "webOS",
          "Tablet OS",
          "Tizen",
          "Linux",
          "Mac OS X",
          "Macintosh",
          "Mac",
          "Windows 98;",
          "Windows "
        ]);
        function kt(Dt) {
          return B(Dt, function(yt, ut) {
            return yt || RegExp("\\b" + (ut.pattern || E(ut)) + "\\b", "i").exec(T) && (ut.label || ut);
          });
        }
        function _e(Dt) {
          return B(Dt, function(yt, ut, Gt) {
            return yt || (ut[G] || ut[/^[a-z]+(?: +[a-z]+\b)*/i.exec(G)] || RegExp("\\b" + E(Gt) + "(?:\\b|\\w*\\d)", "i").exec(T)) && Gt;
          });
        }
        function Ue(Dt) {
          return B(Dt, function(yt, ut) {
            return yt || RegExp("\\b" + (ut.pattern || E(ut)) + "\\b", "i").exec(T) && (ut.label || ut);
          });
        }
        function wr(Dt) {
          return B(Dt, function(yt, ut) {
            var Gt = ut.pattern || E(ut);
            return !yt && (yt = RegExp("\\b" + Gt + "(?:/[\\d.]+|[ \\w.]*)", "i").exec(T)) && (yt = d(yt, Gt, ut.label || ut)), yt;
          });
        }
        function er(Dt) {
          return B(Dt, function(yt, ut) {
            var Gt = ut.pattern || E(ut);
            return !yt && (yt = RegExp("\\b" + Gt + " *\\d+[.\\w_]*", "i").exec(T) || RegExp("\\b" + Gt + " *\\w+-[\\w]*", "i").exec(T) || RegExp("\\b" + Gt + "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)", "i").exec(T)) && ((yt = String(ut.label && !RegExp(Gt, "i").test(ut.label) ? ut.label : yt).split("/"))[1] && !/[\d.]+/.test(yt[0]) && (yt[0] += " " + yt[1]), ut = ut.label || ut, yt = v(yt[0].replace(RegExp(Gt, "i"), ut).replace(RegExp("; *(?:" + ut + "[_-])?", "i"), " ").replace(RegExp("(" + ut + ")[-_.]?(\\w)", "i"), "$1 $2"))), yt;
          });
        }
        function rr(Dt) {
          return B(Dt, function(yt, ut) {
            return yt || (RegExp(ut + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)", "i").exec(T) || 0)[1] || null;
          });
        }
        function Sr() {
          return this.description || "";
        }
        if (tt && (tt = [tt]), /\bAndroid\b/.test(D) && !G && (x = /\bAndroid[^;]*;(.*?)(?:Build|\) AppleWebKit)\b/i.exec(T)) && (G = P(x[1]).replace(/^[a-z]{2}-[a-z]{2};\s*/i, "") || null), V && !G ? G = er([V]) : V && G && (G = G.replace(RegExp("^(" + E(V) + ")[-_.\\s]", "i"), V + " ").replace(RegExp("^(" + E(V) + ")[-_.]?(\\w)", "i"), V + " $2")), (x = /\bGoogle TV\b/.exec(G)) && (G = x[0]), /\bSimulator\b/i.test(T) && (G = (G ? G + " " : "") + "Simulator"), N == "Opera Mini" && /\bOPiOS\b/.test(T) && X.push("running in Turbo/Uncompressed mode"), N == "IE" && /\blike iPhone OS\b/.test(T) ? (x = A(T.replace(/like iPhone OS/, "")), V = x.manufacturer, G = x.product) : /^iP/.test(G) ? (N || (N = "Safari"), D = "iOS" + ((x = / OS ([\d_]+)/i.exec(T)) ? " " + x[1].replace(/_/g, ".") : "")) : N == "Konqueror" && /^Linux\b/i.test(D) ? D = "Kubuntu" : V && V != "Google" && (/Chrome/.test(N) && !/\bMobile Safari\b/i.test(T) || /\bVita\b/.test(G)) || /\bAndroid\b/.test(D) && /^Chrome/.test(N) && /\bVersion\//i.test(T) ? (N = "Android Browser", D = /\bAndroid\b/.test(D) ? D : "Android") : N == "Silk" ? (/\bMobi/i.test(T) || (D = "Android", X.unshift("desktop mode")), /Accelerated *= *true/i.test(T) && X.unshift("accelerated")) : N == "UC Browser" && /\bUCWEB\b/.test(T) ? X.push("speed mode") : N == "PaleMoon" && (x = /\bFirefox\/([\d.]+)\b/.exec(T)) ? X.push("identifying as Firefox " + x[1]) : N == "Firefox" && (x = /\b(Mobile|Tablet|TV)\b/i.exec(T)) ? (D || (D = "Firefox OS"), G || (G = x[1])) : !N || (x = !/\bMinefield\b/i.test(T) && /\b(?:Firefox|Safari)\b/.exec(N)) ? (N && !G && /[\/,]|^[^(]+?\)/.test(T.slice(T.indexOf(x + "/") + 8)) && (N = null), (x = G || V || D) && (G || V || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(D)) && (N = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(D) ? D : x) + " Browser")) : N == "Electron" && (x = (/\bChrome\/([\d.]+)\b/.exec(T) || 0)[1]) && X.push("Chromium " + x), H || (H = rr([
          "(?:Cloud9|CriOS|CrMo|Edge|Edg|EdgA|EdgiOS|FxiOS|HeadlessChrome|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$)|UCBrowser|YaBrowser)",
          "Version",
          E(N),
          "(?:Firefox|Minefield|NetFront)"
        ])), (x = tt == "iCab" && parseFloat(H) > 3 && "WebKit" || /\bOpera\b/.test(N) && (/\bOPR\b/.test(T) ? "Blink" : "Presto") || /\b(?:Midori|Nook|Safari)\b/i.test(T) && !/^(?:Trident|EdgeHTML)$/.test(tt) && "WebKit" || !tt && /\bMSIE\b/i.test(T) && (D == "Mac OS" ? "Tasman" : "Trident") || tt == "WebKit" && /\bPlayStation\b(?! Vita\b)/i.test(N) && "NetFront") && (tt = [x]), N == "IE" && (x = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(T) || 0)[1]) ? (N += " Mobile", D = "Windows Phone " + (/\+$/.test(x) ? x : x + ".x"), X.unshift("desktop mode")) : /\bWPDesktop\b/i.test(T) ? (N = "IE Mobile", D = "Windows Phone 8.x", X.unshift("desktop mode"), H || (H = (/\brv:([\d.]+)/.exec(T) || 0)[1])) : N != "IE" && tt == "Trident" && (x = /\brv:([\d.]+)/.exec(T)) && (N && X.push("identifying as " + N + (H ? " " + H : "")), N = "IE", H = x[1]), Q) {
          if (I(C, "global"))
            if (S && (x = S.lang.System, it = x.getProperty("os.arch"), D = D || x.getProperty("os.name") + " " + x.getProperty("os.version")), M) {
              try {
                H = C.require("ringo/engine").version.join("."), N = "RingoJS";
              } catch {
                (x = C.system) && x.global.system == C.system && (N = "Narwhal", D || (D = x[0].os || null));
              }
              N || (N = "Rhino");
            } else typeof C.process == "object" && !C.process.browser && (x = C.process) && (typeof x.versions == "object" && (typeof x.versions.electron == "string" ? (X.push("Node " + x.versions.node), N = "Electron", H = x.versions.electron) : typeof x.versions.nw == "string" && (X.push("Chromium " + H, "Node " + x.versions.node), N = "NW.js", H = x.versions.nw)), N || (N = "Node.js", it = x.arch, D = x.platform, H = /[\d.]+/.exec(x.version), H = H ? H[0] : null));
          else g(x = C.runtime) == W ? (N = "Adobe AIR", D = x.flash.system.Capabilities.os) : g(x = C.phantom) == y ? (N = "PhantomJS", H = (x = x.version || null) && x.major + "." + x.minor + "." + x.patch) : typeof k.documentMode == "number" && (x = /\bTrident\/(\d+)/i.exec(T)) ? (H = [H, k.documentMode], (x = +x[1] + 4) != H[1] && (X.push("IE " + H[1] + " mode"), tt && (tt[1] = ""), H[1] = x), H = N == "IE" ? String(H[1].toFixed(1)) : H[0]) : typeof k.documentMode == "number" && /^(?:Chrome|Firefox)\b/.test(N) && (X.push("masking as " + N + " " + H), N = "IE", H = "11.0", tt = ["Trident"], D = "Windows");
          D = D && v(D);
        }
        if (H && (x = /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(H) || /(?:alpha|beta)(?: ?\d)?/i.exec(T + ";" + (Q && U.appMinorVersion)) || /\bMinefield\b/i.test(T) && "a") && (pt = /b/i.test(x) ? "beta" : "alpha", H = H.replace(RegExp(x + "\\+?$"), "") + (pt == "beta" ? L : w) + (/\d+\+?/.exec(x) || "")), N == "Fennec" || N == "Firefox" && /\b(?:Android|Firefox OS|KaiOS)\b/.test(D))
          N = "Firefox Mobile";
        else if (N == "Maxthon" && H)
          H = H.replace(/\.[\d.]+/, ".x");
        else if (/\bXbox\b/i.test(G))
          G == "Xbox 360" && (D = null), G == "Xbox 360" && /\bIEMobile\b/.test(T) && X.unshift("mobile mode");
        else if ((/^(?:Chrome|IE|Opera)$/.test(N) || N && !G && !/Browser|Mobi/.test(N)) && (D == "Windows CE" || /Mobi/i.test(T)))
          N += " Mobile";
        else if (N == "IE" && Q)
          try {
            C.external === null && X.unshift("platform preview");
          } catch {
            X.unshift("embedded");
          }
        else (/\bBlackBerry\b/.test(G) || /\bBB10\b/.test(T)) && (x = (RegExp(G.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec(T) || 0)[1] || H) ? (x = [x, /BB10/.test(T)], D = (x[1] ? (G = null, V = "BlackBerry") : "Device Software") + " " + x[0], H = null) : this != _ && G != "Wii" && (Q && Y || /Opera/.test(N) && /\b(?:MSIE|Firefox)\b/i.test(T) || N == "Firefox" && /\bOS X (?:\d+\.){2,}/.test(D) || N == "IE" && (D && !/^Win/.test(D) && H > 5.5 || /\bWindows XP\b/.test(D) && H > 8 || H == 8 && !/\bTrident\b/.test(T))) && !h.test(x = A.call(_, T.replace(h, "") + ";")) && x.name && (x = "ing as " + x.name + ((x = x.version) ? " " + x : ""), h.test(N) ? (/\bIE\b/.test(x) && D == "Mac OS" && (D = null), x = "identify" + x) : (x = "mask" + x, $ ? N = v($.replace(/([a-z])([A-Z])/g, "$1 $2")) : N = "Opera", /\bIE\b/.test(x) && (D = null), Q || (H = null)), tt = ["Presto"], X.push(x));
        (x = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(T) || 0)[1]) && (x = [parseFloat(x.replace(/\.(\d)$/, ".0$1")), x], N == "Safari" && x[1].slice(-1) == "+" ? (N = "WebKit Nightly", pt = "alpha", H = x[1].slice(0, -1)) : (H == x[1] || H == (x[2] = (/\bSafari\/([\d.]+\+?)/i.exec(T) || 0)[1])) && (H = null), x[1] = (/\b(?:Headless)?Chrome\/([\d.]+)/i.exec(T) || 0)[1], x[0] == 537.36 && x[2] == 537.36 && parseFloat(x[1]) >= 28 && tt == "WebKit" && (tt = ["Blink"]), !Q || !nt && !x[1] ? (tt && (tt[1] = "like Safari"), x = (x = x[0], x < 400 ? 1 : x < 500 ? 2 : x < 526 ? 3 : x < 533 ? 4 : x < 534 ? "4+" : x < 535 ? 5 : x < 537 ? 6 : x < 538 ? 7 : x < 601 ? 8 : x < 602 ? 9 : x < 604 ? 10 : x < 606 ? 11 : x < 608 ? 12 : "12")) : (tt && (tt[1] = "like Chrome"), x = x[1] || (x = x[0], x < 530 ? 1 : x < 532 ? 2 : x < 532.05 ? 3 : x < 533 ? 4 : x < 534.03 ? 5 : x < 534.07 ? 6 : x < 534.1 ? 7 : x < 534.13 ? 8 : x < 534.16 ? 9 : x < 534.24 ? 10 : x < 534.3 ? 11 : x < 535.01 ? 12 : x < 535.02 ? "13+" : x < 535.07 ? 15 : x < 535.11 ? 16 : x < 535.19 ? 17 : x < 536.05 ? 18 : x < 536.1 ? 19 : x < 537.01 ? 20 : x < 537.11 ? "21+" : x < 537.13 ? 23 : x < 537.18 ? 24 : x < 537.24 ? 25 : x < 537.36 ? 26 : tt != "Blink" ? "27" : "28")), tt && (tt[1] += " " + (x += typeof x == "number" ? ".x" : /[.+]/.test(x) ? "" : "+")), N == "Safari" && (!H || parseInt(H) > 45) ? H = x : N == "Chrome" && /\bHeadlessChrome/i.test(T) && X.unshift("headless")), N == "Opera" && (x = /\bzbov|zvav$/.exec(D)) ? (N += " ", X.unshift("desktop mode"), x == "zvav" ? (N += "Mini", H = null) : N += "Mobile", D = D.replace(RegExp(" *" + x + "$"), "")) : N == "Safari" && /\bChrome\b/.exec(tt && tt[1]) ? (X.unshift("desktop mode"), N = "Chrome Mobile", H = null, /\bOS X\b/.test(D) ? (V = "Apple", D = "iOS 4.3+") : D = null) : /\bSRWare Iron\b/.test(N) && !H && (H = rr("Chrome")), H && H.indexOf(x = /[\d.]+$/.exec(D)) == 0 && T.indexOf("/" + x + "-") > -1 && (D = P(D.replace(x, ""))), D && D.indexOf(N) != -1 && !RegExp(N + " OS").test(D) && (D = D.replace(RegExp(" *" + E(N) + " *"), "")), tt && !/\b(?:Avant|Nook)\b/.test(N) && (/Browser|Lunascape|Maxthon/.test(N) || N != "Safari" && /^iOS/.test(D) && /\bSafari\b/.test(tt[1]) || /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|SRWare Iron|Vivaldi|Web)/.test(N) && tt[1]) && (x = tt[tt.length - 1]) && X.push(x), X.length && (X = ["(" + X.join("; ") + ")"]), V && G && G.indexOf(V) < 0 && X.push("on " + V), G && X.push((/^on /.test(X[X.length - 1]) ? "" : "on ") + G), D && (x = / ([\d.+]+)$/.exec(D), Et = x && D.charAt(D.length - x[0].length - 1) == "/", D = {
          architecture: 32,
          family: x && !Et ? D.replace(x[0], "") : D,
          version: x ? x[1] : null,
          toString: function() {
            var Dt = this.version;
            return this.family + (Dt && !Et ? " " + Dt : "") + (this.architecture == 64 ? " 64-bit" : "");
          }
        }), (x = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(it)) && !/\bi686\b/i.test(it) ? (D && (D.architecture = 64, D.family = D.family.replace(RegExp(" *" + x), "")), N && (/\bWOW64\b/i.test(T) || Q && /\w(?:86|32)$/.test(U.cpuClass || U.platform) && !/\bWin64; x64\b/i.test(T)) && X.unshift("32-bit")) : D && /^OS X/.test(D.family) && N == "Chrome" && parseFloat(H) >= 39 && (D.architecture = 64), T || (T = null);
        var Lt = {};
        return Lt.description = T, Lt.layout = tt && tt[0], Lt.manufacturer = V, Lt.name = N, Lt.prerelease = pt, Lt.product = G, Lt.ua = T, Lt.version = N && H, Lt.os = D || {
          /**
           * The CPU architecture the OS is built for.
           *
           * @memberOf platform.os
           * @type number|null
           */
          architecture: null,
          /**
           * The family of the OS.
           *
           * Common values include:
           * "Windows", "Windows Server 2008 R2 / 7", "Windows Server 2008 / Vista",
           * "Windows XP", "OS X", "Linux", "Ubuntu", "Debian", "Fedora", "Red Hat",
           * "SuSE", "Android", "iOS" and "Windows Phone"
           *
           * @memberOf platform.os
           * @type string|null
           */
          family: null,
          /**
           * The version of the OS.
           *
           * @memberOf platform.os
           * @type string|null
           */
          version: null,
          /**
           * Returns the OS string.
           *
           * @memberOf platform.os
           * @returns {string} The OS string.
           */
          toString: function() {
            return "null";
          }
        }, Lt.parse = A, Lt.toString = Sr, Lt.version && X.unshift(H), Lt.name && X.unshift(N), D && N && !(D == String(D).split(" ")[0] && (D == N.split(" ")[0] || G)) && X.push(G ? "(" + D + ")" : "on " + D), X.length && (Lt.description = X.join(" ")), Lt;
      }
      var R = A();
      n && s ? _(R, function(T, C) {
        n[C] = T;
      }) : r.platform = R;
    }).call(vh);
  }(fr, fr.exports)), fr.exports;
}
var Xe = _h();
const mh = /* @__PURE__ */ Ti(Xe);
function Ne(i) {
  return parseInt(String(i), 10);
}
function mt(i) {
  const t = parseInt(String(i), 10);
  return t < 0 ? -t : t;
}
"toInt" in String.prototype || (String.prototype.toInt = function() {
  return Ne(this);
});
"toUint" in String.prototype || (String.prototype.toUint = function() {
  const i = Ne(this);
  return i < 0 ? -i : i;
});
function Ya(i = "/", t = " ", e = ":", r = "") {
  const n = /* @__PURE__ */ new Date();
  return n.getFullYear() + i + String(100 + n.getMonth() + 1).slice(1, 3) + i + String(100 + n.getDate()).slice(1, 3) + t + String(100 + n.getHours()).slice(1, 3) + e + String(100 + n.getMinutes()).slice(1, 3) + (r === "" ? "" : r + String(n.getMilliseconds()));
}
const Wa = "/* SKYNovel */";
function S_() {
  const i = document.getElementsByTagName("head")[0], t = i.children.length;
  for (let e = t - 1; e >= 0; --e) {
    const r = i.children[e];
    r instanceof HTMLStyleElement && r.innerText.startsWith(Wa) && i.removeChild(r);
  }
}
function I_(i) {
  const t = document.createElement("style");
  t.innerHTML = Wa + i, document.getElementsByTagName("head")[0].appendChild(t);
}
function Z(i, t, e) {
  const r = i[t];
  if (!(t in i)) {
    if (isNaN(e)) throw `[${i[":タグ名"]}]属性 ${t} は必須です`;
    return i[t] = e, e;
  }
  const n = String(r).startsWith("0x") ? parseInt(r) : parseFloat(r);
  if (isNaN(n)) throw `[${i[":タグ名"]}]属性 ${t} の値【${r}】が数値ではありません`;
  return i[t] = n;
}
function vt(i, t, e) {
  if (!(t in i)) return i[t] = e;
  const r = i[t];
  if (r === null) return !1;
  const n = String(r);
  return i[t] = n === "false" ? !1 : !!n;
}
function Va(i) {
  if (i.startsWith("#")) return parseInt(i.slice(1), 16);
  const t = Number(i);
  if (!isNaN(t)) return t;
  if (i === "black") return 0;
  j.cc4ColorName.fillStyle = i;
  const e = j.cc4ColorName.fillStyle;
  if (e === "#000000") throw `色名前 ${i} が異常です`;
  return parseInt(e.slice(1), 16);
}
function P_(i, t, e) {
  const r = i[t];
  return r ? i[t] = Va(String(r)) : i[t] = e;
}
const gh = /JSON at position (\d+)$/;
function M_(i, t = "", e = "") {
  const r = (e.match(gh) ?? ["", ""])[1];
  return `[${i[":タグ名"]}] ${t} 属性の解析エラー : ${e}
${i[t]}${r ? `
${"^".padStart(Number(r))}` : ""}`;
}
const yh = /^[^\/\.]+$|[^\/]+(?=\.)/;
function bh(i) {
  return (i.match(yh) ?? [""])[0];
}
const xh = /\.([^\.]+)$/;
function C_(i) {
  return (i.match(xh) ?? ["", ""])[1];
}
class j {
  static stageW = 0;
  static stageH = 0;
  static debugLog = !1;
  static isSafari = Xe.name === "Safari";
  static isFirefox = Xe.name === "Firefox";
  static isMac = /OS X/.test(Xe.os?.family ?? "");
  static isWin = /Windows/.test(Xe.os?.family ?? "");
  static isMobile = !/(Windows|OS X)/.test(Xe.os?.family ?? "");
  static hDip = {};
  static isDbg = !1;
  static isPackaged = !1;
  static isDarkMode = !1;
  static cc4ColorName;
}
function Th(i) {
  var t = this.constructor;
  return this.then(
    function(e) {
      return t.resolve(i()).then(function() {
        return e;
      });
    },
    function(e) {
      return t.resolve(i()).then(function() {
        return t.reject(e);
      });
    }
  );
}
function Eh(i) {
  var t = this;
  return new t(function(e, r) {
    if (!(i && typeof i.length < "u"))
      return r(
        new TypeError(
          typeof i + " " + i + " is not iterable(cannot read property Symbol(Symbol.iterator))"
        )
      );
    var n = Array.prototype.slice.call(i);
    if (n.length === 0) return e([]);
    var s = n.length;
    function a(h, u) {
      if (u && (typeof u == "object" || typeof u == "function")) {
        var l = u.then;
        if (typeof l == "function") {
          l.call(
            u,
            function(f) {
              a(h, f);
            },
            function(f) {
              n[h] = { status: "rejected", reason: f }, --s === 0 && e(n);
            }
          );
          return;
        }
      }
      n[h] = { status: "fulfilled", value: u }, --s === 0 && e(n);
    }
    for (var o = 0; o < n.length; o++)
      a(o, n[o]);
  });
}
function $a(i, t) {
  this.name = "AggregateError", this.errors = i, this.message = t || "";
}
$a.prototype = Error.prototype;
function wh(i) {
  var t = this;
  return new t(function(e, r) {
    if (!(i && typeof i.length < "u"))
      return r(new TypeError("Promise.any accepts an array"));
    var n = Array.prototype.slice.call(i);
    if (n.length === 0) return r();
    for (var s = [], a = 0; a < n.length; a++)
      try {
        t.resolve(n[a]).then(e).catch(function(o) {
          s.push(o), s.length === n.length && r(
            new $a(
              s,
              "All promises were rejected"
            )
          );
        });
      } catch (o) {
        r(o);
      }
  });
}
var Sh = setTimeout;
function Za(i) {
  return !!(i && typeof i.length < "u");
}
function Ih() {
}
function Ph(i, t) {
  return function() {
    i.apply(t, arguments);
  };
}
function Tt(i) {
  if (!(this instanceof Tt))
    throw new TypeError("Promises must be constructed via new");
  if (typeof i != "function") throw new TypeError("not a function");
  this._state = 0, this._handled = !1, this._value = void 0, this._deferreds = [], Ja(i, this);
}
function qa(i, t) {
  for (; i._state === 3; )
    i = i._value;
  if (i._state === 0) {
    i._deferreds.push(t);
    return;
  }
  i._handled = !0, Tt._immediateFn(function() {
    var e = i._state === 1 ? t.onFulfilled : t.onRejected;
    if (e === null) {
      (i._state === 1 ? cn : vr)(t.promise, i._value);
      return;
    }
    var r;
    try {
      r = e(i._value);
    } catch (n) {
      vr(t.promise, n);
      return;
    }
    cn(t.promise, r);
  });
}
function cn(i, t) {
  try {
    if (t === i)
      throw new TypeError("A promise cannot be resolved with itself.");
    if (t && (typeof t == "object" || typeof t == "function")) {
      var e = t.then;
      if (t instanceof Tt) {
        i._state = 3, i._value = t, dn(i);
        return;
      } else if (typeof e == "function") {
        Ja(Ph(e, t), i);
        return;
      }
    }
    i._state = 1, i._value = t, dn(i);
  } catch (r) {
    vr(i, r);
  }
}
function vr(i, t) {
  i._state = 2, i._value = t, dn(i);
}
function dn(i) {
  i._state === 2 && i._deferreds.length === 0 && Tt._immediateFn(function() {
    i._handled || Tt._unhandledRejectionFn(i._value);
  });
  for (var t = 0, e = i._deferreds.length; t < e; t++)
    qa(i, i._deferreds[t]);
  i._deferreds = null;
}
function Mh(i, t, e) {
  this.onFulfilled = typeof i == "function" ? i : null, this.onRejected = typeof t == "function" ? t : null, this.promise = e;
}
function Ja(i, t) {
  var e = !1;
  try {
    i(
      function(r) {
        e || (e = !0, cn(t, r));
      },
      function(r) {
        e || (e = !0, vr(t, r));
      }
    );
  } catch (r) {
    if (e) return;
    e = !0, vr(t, r);
  }
}
Tt.prototype.catch = function(i) {
  return this.then(null, i);
};
Tt.prototype.then = function(i, t) {
  var e = new this.constructor(Ih);
  return qa(this, new Mh(i, t, e)), e;
};
Tt.prototype.finally = Th;
Tt.all = function(i) {
  return new Tt(function(t, e) {
    if (!Za(i))
      return e(new TypeError("Promise.all accepts an array"));
    var r = Array.prototype.slice.call(i);
    if (r.length === 0) return t([]);
    var n = r.length;
    function s(o, h) {
      try {
        if (h && (typeof h == "object" || typeof h == "function")) {
          var u = h.then;
          if (typeof u == "function") {
            u.call(
              h,
              function(l) {
                s(o, l);
              },
              e
            );
            return;
          }
        }
        r[o] = h, --n === 0 && t(r);
      } catch (l) {
        e(l);
      }
    }
    for (var a = 0; a < r.length; a++)
      s(a, r[a]);
  });
};
Tt.any = wh;
Tt.allSettled = Eh;
Tt.resolve = function(i) {
  return i && typeof i == "object" && i.constructor === Tt ? i : new Tt(function(t) {
    t(i);
  });
};
Tt.reject = function(i) {
  return new Tt(function(t, e) {
    e(i);
  });
};
Tt.race = function(i) {
  return new Tt(function(t, e) {
    if (!Za(i))
      return e(new TypeError("Promise.race accepts an array"));
    for (var r = 0, n = i.length; r < n; r++)
      Tt.resolve(i[r]).then(t, e);
  });
};
Tt._immediateFn = // @ts-ignore
typeof setImmediate == "function" && function(i) {
  setImmediate(i);
} || function(i) {
  Sh(i, 0);
};
Tt._unhandledRejectionFn = function(t) {
  typeof console < "u" && console && console.warn("Possible Unhandled Promise Rejection:", t);
};
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var Ai, Bs;
function Ch() {
  if (Bs) return Ai;
  Bs = 1;
  var i = Object.getOwnPropertySymbols, t = Object.prototype.hasOwnProperty, e = Object.prototype.propertyIsEnumerable;
  function r(s) {
    if (s == null)
      throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(s);
  }
  function n() {
    try {
      if (!Object.assign)
        return !1;
      var s = new String("abc");
      if (s[5] = "de", Object.getOwnPropertyNames(s)[0] === "5")
        return !1;
      for (var a = {}, o = 0; o < 10; o++)
        a["_" + String.fromCharCode(o)] = o;
      var h = Object.getOwnPropertyNames(a).map(function(l) {
        return a[l];
      });
      if (h.join("") !== "0123456789")
        return !1;
      var u = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(l) {
        u[l] = l;
      }), Object.keys(Object.assign({}, u)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return Ai = n() ? Object.assign : function(s, a) {
    for (var o, h = r(s), u, l = 1; l < arguments.length; l++) {
      o = Object(arguments[l]);
      for (var f in o)
        t.call(o, f) && (h[f] = o[f]);
      if (i) {
        u = i(o);
        for (var c = 0; c < u.length; c++)
          e.call(o, u[c]) && (h[u[c]] = o[u[c]]);
      }
    }
    return h;
  }, Ai;
}
var Ah = Ch();
const Rh = /* @__PURE__ */ Ti(Ah);
/*!
 * @pixi/polyfill - v6.5.10
 * Compiled Thu, 06 Jul 2023 15:25:11 UTC
 *
 * @pixi/polyfill is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
typeof globalThis > "u" && (typeof self < "u" ? self.globalThis = self : typeof global < "u" && (global.globalThis = global));
globalThis.Promise || (globalThis.Promise = Tt);
Object.assign || (Object.assign = Rh);
var Oh = 16;
Date.now && Date.prototype.getTime || (Date.now = function() {
  return (/* @__PURE__ */ new Date()).getTime();
});
if (!(globalThis.performance && globalThis.performance.now)) {
  var Nh = Date.now();
  globalThis.performance || (globalThis.performance = {}), globalThis.performance.now = function() {
    return Date.now() - Nh;
  };
}
var Ri = Date.now(), Fs = ["ms", "moz", "webkit", "o"];
for (var Oi = 0; Oi < Fs.length && !globalThis.requestAnimationFrame; ++Oi) {
  var Ni = Fs[Oi];
  globalThis.requestAnimationFrame = globalThis[Ni + "RequestAnimationFrame"], globalThis.cancelAnimationFrame = globalThis[Ni + "CancelAnimationFrame"] || globalThis[Ni + "CancelRequestAnimationFrame"];
}
globalThis.requestAnimationFrame || (globalThis.requestAnimationFrame = function(i) {
  if (typeof i != "function")
    throw new TypeError(i + "is not a function");
  var t = Date.now(), e = Oh + Ri - t;
  return e < 0 && (e = 0), Ri = t, globalThis.self.setTimeout(function() {
    Ri = Date.now(), i(performance.now());
  }, e);
});
globalThis.cancelAnimationFrame || (globalThis.cancelAnimationFrame = function(i) {
  return clearTimeout(i);
});
Math.sign || (Math.sign = function(t) {
  return t = Number(t), t === 0 || isNaN(t) ? t : t > 0 ? 1 : -1;
});
Number.isInteger || (Number.isInteger = function(t) {
  return typeof t == "number" && isFinite(t) && Math.floor(t) === t;
});
globalThis.ArrayBuffer || (globalThis.ArrayBuffer = Array);
globalThis.Float32Array || (globalThis.Float32Array = Array);
globalThis.Uint32Array || (globalThis.Uint32Array = Array);
globalThis.Uint16Array || (globalThis.Uint16Array = Array);
globalThis.Uint8Array || (globalThis.Uint8Array = Array);
globalThis.Int32Array || (globalThis.Int32Array = Array);
/*!
 * @pixi/constants - v6.5.10
 * Compiled Thu, 06 Jul 2023 15:25:11 UTC
 *
 * @pixi/constants is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
var de;
(function(i) {
  i[i.WEBGL_LEGACY = 0] = "WEBGL_LEGACY", i[i.WEBGL = 1] = "WEBGL", i[i.WEBGL2 = 2] = "WEBGL2";
})(de || (de = {}));
var _r;
(function(i) {
  i[i.UNKNOWN = 0] = "UNKNOWN", i[i.WEBGL = 1] = "WEBGL", i[i.CANVAS = 2] = "CANVAS";
})(_r || (_r = {}));
var ai;
(function(i) {
  i[i.COLOR = 16384] = "COLOR", i[i.DEPTH = 256] = "DEPTH", i[i.STENCIL = 1024] = "STENCIL";
})(ai || (ai = {}));
var q;
(function(i) {
  i[i.NORMAL = 0] = "NORMAL", i[i.ADD = 1] = "ADD", i[i.MULTIPLY = 2] = "MULTIPLY", i[i.SCREEN = 3] = "SCREEN", i[i.OVERLAY = 4] = "OVERLAY", i[i.DARKEN = 5] = "DARKEN", i[i.LIGHTEN = 6] = "LIGHTEN", i[i.COLOR_DODGE = 7] = "COLOR_DODGE", i[i.COLOR_BURN = 8] = "COLOR_BURN", i[i.HARD_LIGHT = 9] = "HARD_LIGHT", i[i.SOFT_LIGHT = 10] = "SOFT_LIGHT", i[i.DIFFERENCE = 11] = "DIFFERENCE", i[i.EXCLUSION = 12] = "EXCLUSION", i[i.HUE = 13] = "HUE", i[i.SATURATION = 14] = "SATURATION", i[i.COLOR = 15] = "COLOR", i[i.LUMINOSITY = 16] = "LUMINOSITY", i[i.NORMAL_NPM = 17] = "NORMAL_NPM", i[i.ADD_NPM = 18] = "ADD_NPM", i[i.SCREEN_NPM = 19] = "SCREEN_NPM", i[i.NONE = 20] = "NONE", i[i.SRC_OVER = 0] = "SRC_OVER", i[i.SRC_IN = 21] = "SRC_IN", i[i.SRC_OUT = 22] = "SRC_OUT", i[i.SRC_ATOP = 23] = "SRC_ATOP", i[i.DST_OVER = 24] = "DST_OVER", i[i.DST_IN = 25] = "DST_IN", i[i.DST_OUT = 26] = "DST_OUT", i[i.DST_ATOP = 27] = "DST_ATOP", i[i.ERASE = 26] = "ERASE", i[i.SUBTRACT = 28] = "SUBTRACT", i[i.XOR = 29] = "XOR";
})(q || (q = {}));
var $t;
(function(i) {
  i[i.POINTS = 0] = "POINTS", i[i.LINES = 1] = "LINES", i[i.LINE_LOOP = 2] = "LINE_LOOP", i[i.LINE_STRIP = 3] = "LINE_STRIP", i[i.TRIANGLES = 4] = "TRIANGLES", i[i.TRIANGLE_STRIP = 5] = "TRIANGLE_STRIP", i[i.TRIANGLE_FAN = 6] = "TRIANGLE_FAN";
})($t || ($t = {}));
var F;
(function(i) {
  i[i.RGBA = 6408] = "RGBA", i[i.RGB = 6407] = "RGB", i[i.RG = 33319] = "RG", i[i.RED = 6403] = "RED", i[i.RGBA_INTEGER = 36249] = "RGBA_INTEGER", i[i.RGB_INTEGER = 36248] = "RGB_INTEGER", i[i.RG_INTEGER = 33320] = "RG_INTEGER", i[i.RED_INTEGER = 36244] = "RED_INTEGER", i[i.ALPHA = 6406] = "ALPHA", i[i.LUMINANCE = 6409] = "LUMINANCE", i[i.LUMINANCE_ALPHA = 6410] = "LUMINANCE_ALPHA", i[i.DEPTH_COMPONENT = 6402] = "DEPTH_COMPONENT", i[i.DEPTH_STENCIL = 34041] = "DEPTH_STENCIL";
})(F || (F = {}));
var De;
(function(i) {
  i[i.TEXTURE_2D = 3553] = "TEXTURE_2D", i[i.TEXTURE_CUBE_MAP = 34067] = "TEXTURE_CUBE_MAP", i[i.TEXTURE_2D_ARRAY = 35866] = "TEXTURE_2D_ARRAY", i[i.TEXTURE_CUBE_MAP_POSITIVE_X = 34069] = "TEXTURE_CUBE_MAP_POSITIVE_X", i[i.TEXTURE_CUBE_MAP_NEGATIVE_X = 34070] = "TEXTURE_CUBE_MAP_NEGATIVE_X", i[i.TEXTURE_CUBE_MAP_POSITIVE_Y = 34071] = "TEXTURE_CUBE_MAP_POSITIVE_Y", i[i.TEXTURE_CUBE_MAP_NEGATIVE_Y = 34072] = "TEXTURE_CUBE_MAP_NEGATIVE_Y", i[i.TEXTURE_CUBE_MAP_POSITIVE_Z = 34073] = "TEXTURE_CUBE_MAP_POSITIVE_Z", i[i.TEXTURE_CUBE_MAP_NEGATIVE_Z = 34074] = "TEXTURE_CUBE_MAP_NEGATIVE_Z";
})(De || (De = {}));
var J;
(function(i) {
  i[i.UNSIGNED_BYTE = 5121] = "UNSIGNED_BYTE", i[i.UNSIGNED_SHORT = 5123] = "UNSIGNED_SHORT", i[i.UNSIGNED_SHORT_5_6_5 = 33635] = "UNSIGNED_SHORT_5_6_5", i[i.UNSIGNED_SHORT_4_4_4_4 = 32819] = "UNSIGNED_SHORT_4_4_4_4", i[i.UNSIGNED_SHORT_5_5_5_1 = 32820] = "UNSIGNED_SHORT_5_5_5_1", i[i.UNSIGNED_INT = 5125] = "UNSIGNED_INT", i[i.UNSIGNED_INT_10F_11F_11F_REV = 35899] = "UNSIGNED_INT_10F_11F_11F_REV", i[i.UNSIGNED_INT_2_10_10_10_REV = 33640] = "UNSIGNED_INT_2_10_10_10_REV", i[i.UNSIGNED_INT_24_8 = 34042] = "UNSIGNED_INT_24_8", i[i.UNSIGNED_INT_5_9_9_9_REV = 35902] = "UNSIGNED_INT_5_9_9_9_REV", i[i.BYTE = 5120] = "BYTE", i[i.SHORT = 5122] = "SHORT", i[i.INT = 5124] = "INT", i[i.FLOAT = 5126] = "FLOAT", i[i.FLOAT_32_UNSIGNED_INT_24_8_REV = 36269] = "FLOAT_32_UNSIGNED_INT_24_8_REV", i[i.HALF_FLOAT = 36193] = "HALF_FLOAT";
})(J || (J = {}));
var oi;
(function(i) {
  i[i.FLOAT = 0] = "FLOAT", i[i.INT = 1] = "INT", i[i.UINT = 2] = "UINT";
})(oi || (oi = {}));
var Jt;
(function(i) {
  i[i.NEAREST = 0] = "NEAREST", i[i.LINEAR = 1] = "LINEAR";
})(Jt || (Jt = {}));
var Qt;
(function(i) {
  i[i.CLAMP = 33071] = "CLAMP", i[i.REPEAT = 10497] = "REPEAT", i[i.MIRRORED_REPEAT = 33648] = "MIRRORED_REPEAT";
})(Qt || (Qt = {}));
var Zt;
(function(i) {
  i[i.OFF = 0] = "OFF", i[i.POW2 = 1] = "POW2", i[i.ON = 2] = "ON", i[i.ON_MANUAL = 3] = "ON_MANUAL";
})(Zt || (Zt = {}));
var qt;
(function(i) {
  i[i.NPM = 0] = "NPM", i[i.UNPACK = 1] = "UNPACK", i[i.PMA = 2] = "PMA", i[i.NO_PREMULTIPLIED_ALPHA = 0] = "NO_PREMULTIPLIED_ALPHA", i[i.PREMULTIPLY_ON_UPLOAD = 1] = "PREMULTIPLY_ON_UPLOAD", i[i.PREMULTIPLY_ALPHA = 2] = "PREMULTIPLY_ALPHA", i[i.PREMULTIPLIED_ALPHA = 2] = "PREMULTIPLIED_ALPHA";
})(qt || (qt = {}));
var Vt;
(function(i) {
  i[i.NO = 0] = "NO", i[i.YES = 1] = "YES", i[i.AUTO = 2] = "AUTO", i[i.BLEND = 0] = "BLEND", i[i.CLEAR = 1] = "CLEAR", i[i.BLIT = 2] = "BLIT";
})(Vt || (Vt = {}));
var hi;
(function(i) {
  i[i.AUTO = 0] = "AUTO", i[i.MANUAL = 1] = "MANUAL";
})(hi || (hi = {}));
var Ft;
(function(i) {
  i.LOW = "lowp", i.MEDIUM = "mediump", i.HIGH = "highp";
})(Ft || (Ft = {}));
var Pt;
(function(i) {
  i[i.NONE = 0] = "NONE", i[i.SCISSOR = 1] = "SCISSOR", i[i.STENCIL = 2] = "STENCIL", i[i.SPRITE = 3] = "SPRITE", i[i.COLOR = 4] = "COLOR";
})(Pt || (Pt = {}));
var ks;
(function(i) {
  i[i.RED = 1] = "RED", i[i.GREEN = 2] = "GREEN", i[i.BLUE = 4] = "BLUE", i[i.ALPHA = 8] = "ALPHA";
})(ks || (ks = {}));
var bt;
(function(i) {
  i[i.NONE = 0] = "NONE", i[i.LOW = 2] = "LOW", i[i.MEDIUM = 4] = "MEDIUM", i[i.HIGH = 8] = "HIGH";
})(bt || (bt = {}));
var te;
(function(i) {
  i[i.ELEMENT_ARRAY_BUFFER = 34963] = "ELEMENT_ARRAY_BUFFER", i[i.ARRAY_BUFFER = 34962] = "ARRAY_BUFFER", i[i.UNIFORM_BUFFER = 35345] = "UNIFORM_BUFFER";
})(te || (te = {}));
/*!
 * @pixi/settings - v6.5.10
 * Compiled Thu, 06 Jul 2023 15:25:11 UTC
 *
 * @pixi/settings is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
var Dh = {
  /**
   * Creates a canvas element of the given size.
   * This canvas is created using the browser's native canvas element.
   * @param width - width of the canvas
   * @param height - height of the canvas
   */
  createCanvas: function(i, t) {
    var e = document.createElement("canvas");
    return e.width = i, e.height = t, e;
  },
  getWebGLRenderingContext: function() {
    return WebGLRenderingContext;
  },
  getNavigator: function() {
    return navigator;
  },
  getBaseUrl: function() {
    var i;
    return (i = document.baseURI) !== null && i !== void 0 ? i : window.location.href;
  },
  fetch: function(i, t) {
    return fetch(i, t);
  }
}, Di = /iPhone/i, Us = /iPod/i, Gs = /iPad/i, js = /\biOS-universal(?:.+)Mac\b/i, Li = /\bAndroid(?:.+)Mobile\b/i, Hs = /Android/i, Ge = /(?:SD4930UR|\bSilk(?:.+)Mobile\b)/i, Ir = /Silk/i, oe = /Windows Phone/i, Xs = /\bWindows(?:.+)ARM\b/i, zs = /BlackBerry/i, Ys = /BB10/i, Ws = /Opera Mini/i, Vs = /\b(CriOS|Chrome)(?:.+)Mobile/i, $s = /Mobile(?:.+)Firefox\b/i, Zs = function(i) {
  return typeof i < "u" && i.platform === "MacIntel" && typeof i.maxTouchPoints == "number" && i.maxTouchPoints > 1 && typeof MSStream > "u";
};
function Lh(i) {
  return function(t) {
    return t.test(i);
  };
}
function Bh(i) {
  var t = {
    userAgent: "",
    platform: "",
    maxTouchPoints: 0
  };
  !i && typeof navigator < "u" ? t = {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    maxTouchPoints: navigator.maxTouchPoints || 0
  } : typeof i == "string" ? t.userAgent = i : i && i.userAgent && (t = {
    userAgent: i.userAgent,
    platform: i.platform,
    maxTouchPoints: i.maxTouchPoints || 0
  });
  var e = t.userAgent, r = e.split("[FBAN");
  typeof r[1] < "u" && (e = r[0]), r = e.split("Twitter"), typeof r[1] < "u" && (e = r[0]);
  var n = Lh(e), s = {
    apple: {
      phone: n(Di) && !n(oe),
      ipod: n(Us),
      tablet: !n(Di) && (n(Gs) || Zs(t)) && !n(oe),
      universal: n(js),
      device: (n(Di) || n(Us) || n(Gs) || n(js) || Zs(t)) && !n(oe)
    },
    amazon: {
      phone: n(Ge),
      tablet: !n(Ge) && n(Ir),
      device: n(Ge) || n(Ir)
    },
    android: {
      phone: !n(oe) && n(Ge) || !n(oe) && n(Li),
      tablet: !n(oe) && !n(Ge) && !n(Li) && (n(Ir) || n(Hs)),
      device: !n(oe) && (n(Ge) || n(Ir) || n(Li) || n(Hs)) || n(/\bokhttp\b/i)
    },
    windows: {
      phone: n(oe),
      tablet: n(Xs),
      device: n(oe) || n(Xs)
    },
    other: {
      blackberry: n(zs),
      blackberry10: n(Ys),
      opera: n(Ws),
      firefox: n($s),
      chrome: n(Vs),
      device: n(zs) || n(Ys) || n(Ws) || n($s) || n(Vs)
    },
    any: !1,
    phone: !1,
    tablet: !1
  };
  return s.any = s.apple.device || s.android.device || s.windows.device || s.other.device, s.phone = s.apple.phone || s.android.phone || s.windows.phone, s.tablet = s.apple.tablet || s.android.tablet || s.windows.tablet, s;
}
var Kt = Bh(globalThis.navigator);
function Fh() {
  return !Kt.apple.device;
}
function kh(i) {
  var t = !0;
  if (Kt.tablet || Kt.phone) {
    if (Kt.apple.device) {
      var e = navigator.userAgent.match(/OS (\d+)_(\d+)?/);
      if (e) {
        var r = parseInt(e[1], 10);
        r < 11 && (t = !1);
      }
    }
    if (Kt.android.device) {
      var e = navigator.userAgent.match(/Android\s([0-9.]*)/);
      if (e) {
        var r = parseInt(e[1], 10);
        r < 7 && (t = !1);
      }
    }
  }
  return t ? i : 4;
}
var z = {
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
  ADAPTER: Dh,
  /**
   * If set to true WebGL will attempt make textures mimpaped by default.
   * Mipmapping will only succeed if the base texture uploaded has power of two dimensions.
   * @static
   * @name MIPMAP_TEXTURES
   * @memberof PIXI.settings
   * @type {PIXI.MIPMAP_MODES}
   * @default PIXI.MIPMAP_MODES.POW2
   */
  MIPMAP_TEXTURES: Zt.POW2,
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
  FILTER_MULTISAMPLE: bt.NONE,
  /**
   * The maximum textures that this device supports.
   * @static
   * @name SPRITE_MAX_TEXTURES
   * @memberof PIXI.settings
   * @type {number}
   * @default 32
   */
  SPRITE_MAX_TEXTURES: kh(32),
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
  GC_MODE: hi.AUTO,
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
  WRAP_MODE: Qt.CLAMP,
  /**
   * Default scale mode for textures.
   * @static
   * @name SCALE_MODE
   * @memberof PIXI.settings
   * @type {PIXI.SCALE_MODES}
   * @default PIXI.SCALE_MODES.LINEAR
   */
  SCALE_MODE: Jt.LINEAR,
  /**
   * Default specify float precision in vertex shader.
   * @static
   * @name PRECISION_VERTEX
   * @memberof PIXI.settings
   * @type {PIXI.PRECISION}
   * @default PIXI.PRECISION.HIGH
   */
  PRECISION_VERTEX: Ft.HIGH,
  /**
   * Default specify float precision in fragment shader.
   * iOS is best set at highp due to https://github.com/pixijs/pixi.js/issues/3742
   * @static
   * @name PRECISION_FRAGMENT
   * @memberof PIXI.settings
   * @type {PIXI.PRECISION}
   * @default PIXI.PRECISION.MEDIUM
   */
  PRECISION_FRAGMENT: Kt.apple.device ? Ft.HIGH : Ft.MEDIUM,
  /**
   * Can we upload the same buffer in a single frame?
   * @static
   * @name CAN_UPLOAD_SAME_BUFFER
   * @memberof PIXI.settings
   * @type {boolean}
   */
  CAN_UPLOAD_SAME_BUFFER: Fh(),
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
}, Bi = { exports: {} }, qs;
function Uh() {
  return qs || (qs = 1, function(i) {
    var t = Object.prototype.hasOwnProperty, e = "~";
    function r() {
    }
    Object.create && (r.prototype = /* @__PURE__ */ Object.create(null), new r().__proto__ || (e = !1));
    function n(h, u, l) {
      this.fn = h, this.context = u, this.once = l || !1;
    }
    function s(h, u, l, f, c) {
      if (typeof l != "function")
        throw new TypeError("The listener must be a function");
      var d = new n(l, f || h, c), p = e ? e + u : u;
      return h._events[p] ? h._events[p].fn ? h._events[p] = [h._events[p], d] : h._events[p].push(d) : (h._events[p] = d, h._eventsCount++), h;
    }
    function a(h, u) {
      --h._eventsCount === 0 ? h._events = new r() : delete h._events[u];
    }
    function o() {
      this._events = new r(), this._eventsCount = 0;
    }
    o.prototype.eventNames = function() {
      var u = [], l, f;
      if (this._eventsCount === 0) return u;
      for (f in l = this._events)
        t.call(l, f) && u.push(e ? f.slice(1) : f);
      return Object.getOwnPropertySymbols ? u.concat(Object.getOwnPropertySymbols(l)) : u;
    }, o.prototype.listeners = function(u) {
      var l = e ? e + u : u, f = this._events[l];
      if (!f) return [];
      if (f.fn) return [f.fn];
      for (var c = 0, d = f.length, p = new Array(d); c < d; c++)
        p[c] = f[c].fn;
      return p;
    }, o.prototype.listenerCount = function(u) {
      var l = e ? e + u : u, f = this._events[l];
      return f ? f.fn ? 1 : f.length : 0;
    }, o.prototype.emit = function(u, l, f, c, d, p) {
      var v = e ? e + u : u;
      if (!this._events[v]) return !1;
      var _ = this._events[v], g = arguments.length, I, E;
      if (_.fn) {
        switch (_.once && this.removeListener(u, _.fn, void 0, !0), g) {
          case 1:
            return _.fn.call(_.context), !0;
          case 2:
            return _.fn.call(_.context, l), !0;
          case 3:
            return _.fn.call(_.context, l, f), !0;
          case 4:
            return _.fn.call(_.context, l, f, c), !0;
          case 5:
            return _.fn.call(_.context, l, f, c, d), !0;
          case 6:
            return _.fn.call(_.context, l, f, c, d, p), !0;
        }
        for (E = 1, I = new Array(g - 1); E < g; E++)
          I[E - 1] = arguments[E];
        _.fn.apply(_.context, I);
      } else {
        var B = _.length, P;
        for (E = 0; E < B; E++)
          switch (_[E].once && this.removeListener(u, _[E].fn, void 0, !0), g) {
            case 1:
              _[E].fn.call(_[E].context);
              break;
            case 2:
              _[E].fn.call(_[E].context, l);
              break;
            case 3:
              _[E].fn.call(_[E].context, l, f);
              break;
            case 4:
              _[E].fn.call(_[E].context, l, f, c);
              break;
            default:
              if (!I) for (P = 1, I = new Array(g - 1); P < g; P++)
                I[P - 1] = arguments[P];
              _[E].fn.apply(_[E].context, I);
          }
      }
      return !0;
    }, o.prototype.on = function(u, l, f) {
      return s(this, u, l, f, !1);
    }, o.prototype.once = function(u, l, f) {
      return s(this, u, l, f, !0);
    }, o.prototype.removeListener = function(u, l, f, c) {
      var d = e ? e + u : u;
      if (!this._events[d]) return this;
      if (!l)
        return a(this, d), this;
      var p = this._events[d];
      if (p.fn)
        p.fn === l && (!c || p.once) && (!f || p.context === f) && a(this, d);
      else {
        for (var v = 0, _ = [], g = p.length; v < g; v++)
          (p[v].fn !== l || c && !p[v].once || f && p[v].context !== f) && _.push(p[v]);
        _.length ? this._events[d] = _.length === 1 ? _[0] : _ : a(this, d);
      }
      return this;
    }, o.prototype.removeAllListeners = function(u) {
      var l;
      return u ? (l = e ? e + u : u, this._events[l] && a(this, l)) : (this._events = new r(), this._eventsCount = 0), this;
    }, o.prototype.off = o.prototype.removeListener, o.prototype.addListener = o.prototype.on, o.prefixed = e, o.EventEmitter = o, i.exports = o;
  }(Bi)), Bi.exports;
}
var Gh = Uh();
const qe = /* @__PURE__ */ Ti(Gh);
var Pr = { exports: {} }, Js;
function jh() {
  if (Js) return Pr.exports;
  Js = 1, Pr.exports = i, Pr.exports.default = i;
  function i(m, b, y) {
    y = y || 2;
    var S = b && b.length, M = S ? b[0] * y : m.length, w = t(m, 0, M, y, !0), L = [];
    if (!w || w.next === w.prev) return L;
    var k, Y, $, x, it, X, pt;
    if (S && (w = h(m, b, w, y)), m.length > 80 * y) {
      k = $ = m[0], Y = x = m[1];
      for (var Q = y; Q < M; Q += y)
        it = m[Q], X = m[Q + 1], it < k && (k = it), X < Y && (Y = X), it > $ && ($ = it), X > x && (x = X);
      pt = Math.max($ - k, x - Y), pt = pt !== 0 ? 32767 / pt : 0;
    }
    return r(w, L, y, k, Y, pt, 0), L;
  }
  function t(m, b, y, S, M) {
    var w, L;
    if (M === W(m, b, y, S) > 0)
      for (w = b; w < y; w += S) L = K(w, m[w], m[w + 1], L);
    else
      for (w = y - S; w >= b; w -= S) L = K(w, m[w], m[w + 1], L);
    return L && B(L, L.next) && (nt(L), L = L.next), L;
  }
  function e(m, b) {
    if (!m) return m;
    b || (b = m);
    var y = m, S;
    do
      if (S = !1, !y.steiner && (B(y, y.next) || E(y.prev, y, y.next) === 0)) {
        if (nt(y), y = b = y.prev, y === y.next) break;
        S = !0;
      } else
        y = y.next;
    while (S || y !== b);
    return b;
  }
  function r(m, b, y, S, M, w, L) {
    if (m) {
      !L && w && d(m, S, M, w);
      for (var k = m, Y, $; m.prev !== m.next; ) {
        if (Y = m.prev, $ = m.next, w ? s(m, S, M, w) : n(m)) {
          b.push(Y.i / y | 0), b.push(m.i / y | 0), b.push($.i / y | 0), nt(m), m = $.next, k = $.next;
          continue;
        }
        if (m = $, m === k) {
          L ? L === 1 ? (m = a(e(m), b, y), r(m, b, y, S, M, w, 2)) : L === 2 && o(m, b, y, S, M, w) : r(e(m), b, y, S, M, w, 1);
          break;
        }
      }
    }
  }
  function n(m) {
    var b = m.prev, y = m, S = m.next;
    if (E(b, y, S) >= 0) return !1;
    for (var M = b.x, w = y.x, L = S.x, k = b.y, Y = y.y, $ = S.y, x = M < w ? M < L ? M : L : w < L ? w : L, it = k < Y ? k < $ ? k : $ : Y < $ ? Y : $, X = M > w ? M > L ? M : L : w > L ? w : L, pt = k > Y ? k > $ ? k : $ : Y > $ ? Y : $, Q = S.next; Q !== b; ) {
      if (Q.x >= x && Q.x <= X && Q.y >= it && Q.y <= pt && g(M, k, w, Y, L, $, Q.x, Q.y) && E(Q.prev, Q, Q.next) >= 0) return !1;
      Q = Q.next;
    }
    return !0;
  }
  function s(m, b, y, S) {
    var M = m.prev, w = m, L = m.next;
    if (E(M, w, L) >= 0) return !1;
    for (var k = M.x, Y = w.x, $ = L.x, x = M.y, it = w.y, X = L.y, pt = k < Y ? k < $ ? k : $ : Y < $ ? Y : $, Q = x < it ? x < X ? x : X : it < X ? it : X, H = k > Y ? k > $ ? k : $ : Y > $ ? Y : $, Et = x > it ? x > X ? x : X : it > X ? it : X, tt = v(pt, Q, b, y, S), N = v(H, Et, b, y, S), G = m.prevZ, V = m.nextZ; G && G.z >= tt && V && V.z <= N; ) {
      if (G.x >= pt && G.x <= H && G.y >= Q && G.y <= Et && G !== M && G !== L && g(k, x, Y, it, $, X, G.x, G.y) && E(G.prev, G, G.next) >= 0 || (G = G.prevZ, V.x >= pt && V.x <= H && V.y >= Q && V.y <= Et && V !== M && V !== L && g(k, x, Y, it, $, X, V.x, V.y) && E(V.prev, V, V.next) >= 0)) return !1;
      V = V.nextZ;
    }
    for (; G && G.z >= tt; ) {
      if (G.x >= pt && G.x <= H && G.y >= Q && G.y <= Et && G !== M && G !== L && g(k, x, Y, it, $, X, G.x, G.y) && E(G.prev, G, G.next) >= 0) return !1;
      G = G.prevZ;
    }
    for (; V && V.z <= N; ) {
      if (V.x >= pt && V.x <= H && V.y >= Q && V.y <= Et && V !== M && V !== L && g(k, x, Y, it, $, X, V.x, V.y) && E(V.prev, V, V.next) >= 0) return !1;
      V = V.nextZ;
    }
    return !0;
  }
  function a(m, b, y) {
    var S = m;
    do {
      var M = S.prev, w = S.next.next;
      !B(M, w) && P(M, S, S.next, w) && C(M, w) && C(w, M) && (b.push(M.i / y | 0), b.push(S.i / y | 0), b.push(w.i / y | 0), nt(S), nt(S.next), S = m = w), S = S.next;
    } while (S !== m);
    return e(S);
  }
  function o(m, b, y, S, M, w) {
    var L = m;
    do {
      for (var k = L.next.next; k !== L.prev; ) {
        if (L.i !== k.i && I(L, k)) {
          var Y = U(L, k);
          L = e(L, L.next), Y = e(Y, Y.next), r(L, b, y, S, M, w, 0), r(Y, b, y, S, M, w, 0);
          return;
        }
        k = k.next;
      }
      L = L.next;
    } while (L !== m);
  }
  function h(m, b, y, S) {
    var M = [], w, L, k, Y, $;
    for (w = 0, L = b.length; w < L; w++)
      k = b[w] * S, Y = w < L - 1 ? b[w + 1] * S : m.length, $ = t(m, k, Y, S, !1), $ === $.next && ($.steiner = !0), M.push(_($));
    for (M.sort(u), w = 0; w < M.length; w++)
      y = l(M[w], y);
    return y;
  }
  function u(m, b) {
    return m.x - b.x;
  }
  function l(m, b) {
    var y = f(m, b);
    if (!y)
      return b;
    var S = U(y, m);
    return e(S, S.next), e(y, y.next);
  }
  function f(m, b) {
    var y = b, S = m.x, M = m.y, w = -1 / 0, L;
    do {
      if (M <= y.y && M >= y.next.y && y.next.y !== y.y) {
        var k = y.x + (M - y.y) * (y.next.x - y.x) / (y.next.y - y.y);
        if (k <= S && k > w && (w = k, L = y.x < y.next.x ? y : y.next, k === S))
          return L;
      }
      y = y.next;
    } while (y !== b);
    if (!L) return null;
    var Y = L, $ = L.x, x = L.y, it = 1 / 0, X;
    y = L;
    do
      S >= y.x && y.x >= $ && S !== y.x && g(M < x ? S : w, M, $, x, M < x ? w : S, M, y.x, y.y) && (X = Math.abs(M - y.y) / (S - y.x), C(y, m) && (X < it || X === it && (y.x > L.x || y.x === L.x && c(L, y))) && (L = y, it = X)), y = y.next;
    while (y !== Y);
    return L;
  }
  function c(m, b) {
    return E(m.prev, m, b.prev) < 0 && E(b.next, m, m.next) < 0;
  }
  function d(m, b, y, S) {
    var M = m;
    do
      M.z === 0 && (M.z = v(M.x, M.y, b, y, S)), M.prevZ = M.prev, M.nextZ = M.next, M = M.next;
    while (M !== m);
    M.prevZ.nextZ = null, M.prevZ = null, p(M);
  }
  function p(m) {
    var b, y, S, M, w, L, k, Y, $ = 1;
    do {
      for (y = m, m = null, w = null, L = 0; y; ) {
        for (L++, S = y, k = 0, b = 0; b < $ && (k++, S = S.nextZ, !!S); b++)
          ;
        for (Y = $; k > 0 || Y > 0 && S; )
          k !== 0 && (Y === 0 || !S || y.z <= S.z) ? (M = y, y = y.nextZ, k--) : (M = S, S = S.nextZ, Y--), w ? w.nextZ = M : m = M, M.prevZ = w, w = M;
        y = S;
      }
      w.nextZ = null, $ *= 2;
    } while (L > 1);
    return m;
  }
  function v(m, b, y, S, M) {
    return m = (m - y) * M | 0, b = (b - S) * M | 0, m = (m | m << 8) & 16711935, m = (m | m << 4) & 252645135, m = (m | m << 2) & 858993459, m = (m | m << 1) & 1431655765, b = (b | b << 8) & 16711935, b = (b | b << 4) & 252645135, b = (b | b << 2) & 858993459, b = (b | b << 1) & 1431655765, m | b << 1;
  }
  function _(m) {
    var b = m, y = m;
    do
      (b.x < y.x || b.x === y.x && b.y < y.y) && (y = b), b = b.next;
    while (b !== m);
    return y;
  }
  function g(m, b, y, S, M, w, L, k) {
    return (M - L) * (b - k) >= (m - L) * (w - k) && (m - L) * (S - k) >= (y - L) * (b - k) && (y - L) * (w - k) >= (M - L) * (S - k);
  }
  function I(m, b) {
    return m.next.i !== b.i && m.prev.i !== b.i && !T(m, b) && // dones't intersect other edges
    (C(m, b) && C(b, m) && O(m, b) && // locally visible
    (E(m.prev, m, b.prev) || E(m, b.prev, b)) || // does not create opposite-facing sectors
    B(m, b) && E(m.prev, m, m.next) > 0 && E(b.prev, b, b.next) > 0);
  }
  function E(m, b, y) {
    return (b.y - m.y) * (y.x - b.x) - (b.x - m.x) * (y.y - b.y);
  }
  function B(m, b) {
    return m.x === b.x && m.y === b.y;
  }
  function P(m, b, y, S) {
    var M = R(E(m, b, y)), w = R(E(m, b, S)), L = R(E(y, S, m)), k = R(E(y, S, b));
    return !!(M !== w && L !== k || M === 0 && A(m, y, b) || w === 0 && A(m, S, b) || L === 0 && A(y, m, S) || k === 0 && A(y, b, S));
  }
  function A(m, b, y) {
    return b.x <= Math.max(m.x, y.x) && b.x >= Math.min(m.x, y.x) && b.y <= Math.max(m.y, y.y) && b.y >= Math.min(m.y, y.y);
  }
  function R(m) {
    return m > 0 ? 1 : m < 0 ? -1 : 0;
  }
  function T(m, b) {
    var y = m;
    do {
      if (y.i !== m.i && y.next.i !== m.i && y.i !== b.i && y.next.i !== b.i && P(y, y.next, m, b)) return !0;
      y = y.next;
    } while (y !== m);
    return !1;
  }
  function C(m, b) {
    return E(m.prev, m, m.next) < 0 ? E(m, b, m.next) >= 0 && E(m, m.prev, b) >= 0 : E(m, b, m.prev) < 0 || E(m, m.next, b) < 0;
  }
  function O(m, b) {
    var y = m, S = !1, M = (m.x + b.x) / 2, w = (m.y + b.y) / 2;
    do
      y.y > w != y.next.y > w && y.next.y !== y.y && M < (y.next.x - y.x) * (w - y.y) / (y.next.y - y.y) + y.x && (S = !S), y = y.next;
    while (y !== m);
    return S;
  }
  function U(m, b) {
    var y = new ft(m.i, m.x, m.y), S = new ft(b.i, b.x, b.y), M = m.next, w = b.prev;
    return m.next = b, b.prev = m, y.next = M, M.prev = y, S.next = y, y.prev = S, w.next = S, S.prev = w, S;
  }
  function K(m, b, y, S) {
    var M = new ft(m, b, y);
    return S ? (M.next = S.next, M.prev = S, S.next.prev = M, S.next = M) : (M.prev = M, M.next = M), M;
  }
  function nt(m) {
    m.next.prev = m.prev, m.prev.next = m.next, m.prevZ && (m.prevZ.nextZ = m.nextZ), m.nextZ && (m.nextZ.prevZ = m.prevZ);
  }
  function ft(m, b, y) {
    this.i = m, this.x = b, this.y = y, this.prev = null, this.next = null, this.z = 0, this.prevZ = null, this.nextZ = null, this.steiner = !1;
  }
  i.deviation = function(m, b, y, S) {
    var M = b && b.length, w = M ? b[0] * y : m.length, L = Math.abs(W(m, 0, w, y));
    if (M)
      for (var k = 0, Y = b.length; k < Y; k++) {
        var $ = b[k] * y, x = k < Y - 1 ? b[k + 1] * y : m.length;
        L -= Math.abs(W(m, $, x, y));
      }
    var it = 0;
    for (k = 0; k < S.length; k += 3) {
      var X = S[k] * y, pt = S[k + 1] * y, Q = S[k + 2] * y;
      it += Math.abs(
        (m[X] - m[Q]) * (m[pt + 1] - m[X + 1]) - (m[X] - m[pt]) * (m[Q + 1] - m[X + 1])
      );
    }
    return L === 0 && it === 0 ? 0 : Math.abs((it - L) / L);
  };
  function W(m, b, y, S) {
    for (var M = 0, w = b, L = y - S; w < y; w += S)
      M += (m[L] - m[w]) * (m[w + 1] + m[L + 1]), L = w;
    return M;
  }
  return i.flatten = function(m) {
    for (var b = m[0][0].length, y = { vertices: [], holes: [], dimensions: b }, S = 0, M = 0; M < m.length; M++) {
      for (var w = 0; w < m[M].length; w++)
        for (var L = 0; L < b; L++) y.vertices.push(m[M][w][L]);
      M > 0 && (S += m[M - 1].length, y.holes.push(S));
    }
    return y;
  }, Pr.exports;
}
var Hh = jh();
const Ka = /* @__PURE__ */ Ti(Hh);
/*!
 * @pixi/utils - v6.5.10
 * Compiled Thu, 06 Jul 2023 15:25:11 UTC
 *
 * @pixi/utils is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
var ze = {
  parse: ch,
  format: dh,
  resolve: ph
};
z.RETINA_PREFIX = /@([0-9\.]+)x/;
z.FAIL_IF_MAJOR_PERFORMANCE_CAVEAT = !1;
var pn = !1, Ks = "6.5.10";
function Xh() {
  pn = !0;
}
function zh(i) {
  var t;
  if (!pn) {
    if (z.ADAPTER.getNavigator().userAgent.toLowerCase().indexOf("chrome") > -1) {
      var e = [
        `
 %c %c %c PixiJS ` + Ks + " - ✰ " + i + ` ✰  %c  %c  http://www.pixijs.com/  %c %c ♥%c♥%c♥ 

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
      (t = globalThis.console).log.apply(t, e);
    } else globalThis.console && globalThis.console.log("PixiJS " + Ks + " - " + i + " - http://www.pixijs.com/");
    pn = !0;
  }
}
var Fi;
function Yh() {
  return typeof Fi > "u" && (Fi = function() {
    var t = {
      stencil: !0,
      failIfMajorPerformanceCaveat: z.FAIL_IF_MAJOR_PERFORMANCE_CAVEAT
    };
    try {
      if (!z.ADAPTER.getWebGLRenderingContext())
        return !1;
      var e = z.ADAPTER.createCanvas(), r = e.getContext("webgl", t) || e.getContext("experimental-webgl", t), n = !!(r && r.getContextAttributes().stencil);
      if (r) {
        var s = r.getExtension("WEBGL_lose_context");
        s && s.loseContext();
      }
      return r = null, n;
    } catch {
      return !1;
    }
  }()), Fi;
}
var Wh = "#f0f8ff", Vh = "#faebd7", $h = "#00ffff", Zh = "#7fffd4", qh = "#f0ffff", Jh = "#f5f5dc", Kh = "#ffe4c4", Qh = "#000000", tu = "#ffebcd", eu = "#0000ff", ru = "#8a2be2", iu = "#a52a2a", nu = "#deb887", su = "#5f9ea0", au = "#7fff00", ou = "#d2691e", hu = "#ff7f50", uu = "#6495ed", lu = "#fff8dc", fu = "#dc143c", cu = "#00ffff", du = "#00008b", pu = "#008b8b", vu = "#b8860b", _u = "#a9a9a9", mu = "#006400", gu = "#a9a9a9", yu = "#bdb76b", bu = "#8b008b", xu = "#556b2f", Tu = "#ff8c00", Eu = "#9932cc", wu = "#8b0000", Su = "#e9967a", Iu = "#8fbc8f", Pu = "#483d8b", Mu = "#2f4f4f", Cu = "#2f4f4f", Au = "#00ced1", Ru = "#9400d3", Ou = "#ff1493", Nu = "#00bfff", Du = "#696969", Lu = "#696969", Bu = "#1e90ff", Fu = "#b22222", ku = "#fffaf0", Uu = "#228b22", Gu = "#ff00ff", ju = "#dcdcdc", Hu = "#f8f8ff", Xu = "#daa520", zu = "#ffd700", Yu = "#808080", Wu = "#008000", Vu = "#adff2f", $u = "#808080", Zu = "#f0fff0", qu = "#ff69b4", Ju = "#cd5c5c", Ku = "#4b0082", Qu = "#fffff0", tl = "#f0e68c", el = "#fff0f5", rl = "#e6e6fa", il = "#7cfc00", nl = "#fffacd", sl = "#add8e6", al = "#f08080", ol = "#e0ffff", hl = "#fafad2", ul = "#d3d3d3", ll = "#90ee90", fl = "#d3d3d3", cl = "#ffb6c1", dl = "#ffa07a", pl = "#20b2aa", vl = "#87cefa", _l = "#778899", ml = "#778899", gl = "#b0c4de", yl = "#ffffe0", bl = "#00ff00", xl = "#32cd32", Tl = "#faf0e6", El = "#ff00ff", wl = "#800000", Sl = "#66cdaa", Il = "#0000cd", Pl = "#ba55d3", Ml = "#9370db", Cl = "#3cb371", Al = "#7b68ee", Rl = "#00fa9a", Ol = "#48d1cc", Nl = "#c71585", Dl = "#191970", Ll = "#f5fffa", Bl = "#ffe4e1", Fl = "#ffe4b5", kl = "#ffdead", Ul = "#000080", Gl = "#fdf5e6", jl = "#808000", Hl = "#6b8e23", Xl = "#ffa500", zl = "#ff4500", Yl = "#da70d6", Wl = "#eee8aa", Vl = "#98fb98", $l = "#afeeee", Zl = "#db7093", ql = "#ffefd5", Jl = "#ffdab9", Kl = "#cd853f", Ql = "#ffc0cb", tf = "#dda0dd", ef = "#b0e0e6", rf = "#800080", nf = "#663399", sf = "#ff0000", af = "#bc8f8f", of = "#4169e1", hf = "#8b4513", uf = "#fa8072", lf = "#f4a460", ff = "#2e8b57", cf = "#fff5ee", df = "#a0522d", pf = "#c0c0c0", vf = "#87ceeb", _f = "#6a5acd", mf = "#708090", gf = "#708090", yf = "#fffafa", bf = "#00ff7f", xf = "#4682b4", Tf = "#d2b48c", Ef = "#008080", wf = "#d8bfd8", Sf = "#ff6347", If = "#40e0d0", Pf = "#ee82ee", Mf = "#f5deb3", Cf = "#ffffff", Af = "#f5f5f5", Rf = "#ffff00", Of = "#9acd32", Nf = {
  aliceblue: Wh,
  antiquewhite: Vh,
  aqua: $h,
  aquamarine: Zh,
  azure: qh,
  beige: Jh,
  bisque: Kh,
  black: Qh,
  blanchedalmond: tu,
  blue: eu,
  blueviolet: ru,
  brown: iu,
  burlywood: nu,
  cadetblue: su,
  chartreuse: au,
  chocolate: ou,
  coral: hu,
  cornflowerblue: uu,
  cornsilk: lu,
  crimson: fu,
  cyan: cu,
  darkblue: du,
  darkcyan: pu,
  darkgoldenrod: vu,
  darkgray: _u,
  darkgreen: mu,
  darkgrey: gu,
  darkkhaki: yu,
  darkmagenta: bu,
  darkolivegreen: xu,
  darkorange: Tu,
  darkorchid: Eu,
  darkred: wu,
  darksalmon: Su,
  darkseagreen: Iu,
  darkslateblue: Pu,
  darkslategray: Mu,
  darkslategrey: Cu,
  darkturquoise: Au,
  darkviolet: Ru,
  deeppink: Ou,
  deepskyblue: Nu,
  dimgray: Du,
  dimgrey: Lu,
  dodgerblue: Bu,
  firebrick: Fu,
  floralwhite: ku,
  forestgreen: Uu,
  fuchsia: Gu,
  gainsboro: ju,
  ghostwhite: Hu,
  goldenrod: Xu,
  gold: zu,
  gray: Yu,
  green: Wu,
  greenyellow: Vu,
  grey: $u,
  honeydew: Zu,
  hotpink: qu,
  indianred: Ju,
  indigo: Ku,
  ivory: Qu,
  khaki: tl,
  lavenderblush: el,
  lavender: rl,
  lawngreen: il,
  lemonchiffon: nl,
  lightblue: sl,
  lightcoral: al,
  lightcyan: ol,
  lightgoldenrodyellow: hl,
  lightgray: ul,
  lightgreen: ll,
  lightgrey: fl,
  lightpink: cl,
  lightsalmon: dl,
  lightseagreen: pl,
  lightskyblue: vl,
  lightslategray: _l,
  lightslategrey: ml,
  lightsteelblue: gl,
  lightyellow: yl,
  lime: bl,
  limegreen: xl,
  linen: Tl,
  magenta: El,
  maroon: wl,
  mediumaquamarine: Sl,
  mediumblue: Il,
  mediumorchid: Pl,
  mediumpurple: Ml,
  mediumseagreen: Cl,
  mediumslateblue: Al,
  mediumspringgreen: Rl,
  mediumturquoise: Ol,
  mediumvioletred: Nl,
  midnightblue: Dl,
  mintcream: Ll,
  mistyrose: Bl,
  moccasin: Fl,
  navajowhite: kl,
  navy: Ul,
  oldlace: Gl,
  olive: jl,
  olivedrab: Hl,
  orange: Xl,
  orangered: zl,
  orchid: Yl,
  palegoldenrod: Wl,
  palegreen: Vl,
  paleturquoise: $l,
  palevioletred: Zl,
  papayawhip: ql,
  peachpuff: Jl,
  peru: Kl,
  pink: Ql,
  plum: tf,
  powderblue: ef,
  purple: rf,
  rebeccapurple: nf,
  red: sf,
  rosybrown: af,
  royalblue: of,
  saddlebrown: hf,
  salmon: uf,
  sandybrown: lf,
  seagreen: ff,
  seashell: cf,
  sienna: df,
  silver: pf,
  skyblue: vf,
  slateblue: _f,
  slategray: mf,
  slategrey: gf,
  snow: yf,
  springgreen: bf,
  steelblue: xf,
  tan: Tf,
  teal: Ef,
  thistle: wf,
  tomato: Sf,
  turquoise: If,
  violet: Pf,
  wheat: Mf,
  white: Cf,
  whitesmoke: Af,
  yellow: Rf,
  yellowgreen: Of
};
function $e(i, t) {
  return t === void 0 && (t = []), t[0] = (i >> 16 & 255) / 255, t[1] = (i >> 8 & 255) / 255, t[2] = (i & 255) / 255, t;
}
function Qa(i) {
  var t = i.toString(16);
  return t = "000000".substring(0, 6 - t.length) + t, "#" + t;
}
function to(i) {
  return typeof i == "string" && (i = Nf[i.toLowerCase()] || i, i[0] === "#" && (i = i.slice(1))), parseInt(i, 16);
}
function Df() {
  for (var i = [], t = [], e = 0; e < 32; e++)
    i[e] = e, t[e] = e;
  i[q.NORMAL_NPM] = q.NORMAL, i[q.ADD_NPM] = q.ADD, i[q.SCREEN_NPM] = q.SCREEN, t[q.NORMAL] = q.NORMAL_NPM, t[q.ADD] = q.ADD_NPM, t[q.SCREEN] = q.SCREEN_NPM;
  var r = [];
  return r.push(t), r.push(i), r;
}
var eo = Df();
function ro(i, t) {
  return eo[t ? 1 : 0][i];
}
function Lf(i, t, e, r) {
  return e = e || new Float32Array(4), r || r === void 0 ? (e[0] = i[0] * t, e[1] = i[1] * t, e[2] = i[2] * t) : (e[0] = i[0], e[1] = i[1], e[2] = i[2]), e[3] = t, e;
}
function qn(i, t) {
  if (t === 1)
    return (t * 255 << 24) + i;
  if (t === 0)
    return 0;
  var e = i >> 16 & 255, r = i >> 8 & 255, n = i & 255;
  return e = e * t + 0.5 | 0, r = r * t + 0.5 | 0, n = n * t + 0.5 | 0, (t * 255 << 24) + (e << 16) + (r << 8) + n;
}
function io(i, t, e, r) {
  return e = e || new Float32Array(4), e[0] = (i >> 16 & 255) / 255, e[1] = (i >> 8 & 255) / 255, e[2] = (i & 255) / 255, (r || r === void 0) && (e[0] *= t, e[1] *= t, e[2] *= t), e[3] = t, e;
}
function Bf(i, t) {
  t === void 0 && (t = null);
  var e = i * 6;
  if (t = t || new Uint16Array(e), t.length !== e)
    throw new Error("Out buffer length is incorrect, got " + t.length + " and expected " + e);
  for (var r = 0, n = 0; r < e; r += 6, n += 4)
    t[r + 0] = n + 0, t[r + 1] = n + 1, t[r + 2] = n + 2, t[r + 3] = n + 0, t[r + 4] = n + 2, t[r + 5] = n + 3;
  return t;
}
function no(i) {
  if (i.BYTES_PER_ELEMENT === 4)
    return i instanceof Float32Array ? "Float32Array" : i instanceof Uint32Array ? "Uint32Array" : "Int32Array";
  if (i.BYTES_PER_ELEMENT === 2) {
    if (i instanceof Uint16Array)
      return "Uint16Array";
  } else if (i.BYTES_PER_ELEMENT === 1 && i instanceof Uint8Array)
    return "Uint8Array";
  return null;
}
function ui(i) {
  return i += i === 0 ? 1 : 0, --i, i |= i >>> 1, i |= i >>> 2, i |= i >>> 4, i |= i >>> 8, i |= i >>> 16, i + 1;
}
function Qs(i) {
  return !(i & i - 1) && !!i;
}
function ta(i) {
  var t = (i > 65535 ? 1 : 0) << 4;
  i >>>= t;
  var e = (i > 255 ? 1 : 0) << 3;
  return i >>>= e, t |= e, e = (i > 15 ? 1 : 0) << 2, i >>>= e, t |= e, e = (i > 3 ? 1 : 0) << 1, i >>>= e, t |= e, t | i >> 1;
}
function Ve(i, t, e) {
  var r = i.length, n;
  if (!(t >= r || e === 0)) {
    e = t + e > r ? r - t : e;
    var s = r - e;
    for (n = t; n < s; ++n)
      i[n] = i[n + e];
    i.length = s;
  }
}
function Ye(i) {
  return i === 0 ? 0 : i < 0 ? -1 : 1;
}
var Ff = 0;
function Be() {
  return ++Ff;
}
var ea = {};
function Bt(i, t, e) {
  if (e === void 0 && (e = 3), !ea[t]) {
    var r = new Error().stack;
    typeof r > "u" ? console.warn("PixiJS Deprecation Warning: ", t + `
Deprecated since v` + i) : (r = r.split(`
`).splice(e).join(`
`), console.groupCollapsed ? (console.groupCollapsed("%cPixiJS Deprecation Warning: %c%s", "color:#614108;background:#fffbe6", "font-weight:normal;color:#614108;background:#fffbe6", t + `
Deprecated since v` + i), console.warn(r), console.groupEnd()) : (console.warn("PixiJS Deprecation Warning: ", t + `
Deprecated since v` + i), console.warn(r))), ea[t] = !0;
  }
}
var ra = {}, Yt = /* @__PURE__ */ Object.create(null), ue = /* @__PURE__ */ Object.create(null);
function kf() {
  var i;
  for (i in Yt)
    delete Yt[i];
  for (i in ue)
    delete ue[i];
}
var ia = (
  /** @class */
  function() {
    function i(t, e, r) {
      this.canvas = z.ADAPTER.createCanvas(), this.context = this.canvas.getContext("2d"), this.resolution = r || z.RESOLUTION, this.resize(t, e);
    }
    return i.prototype.clear = function() {
      this.context.setTransform(1, 0, 0, 1, 0, 0), this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }, i.prototype.resize = function(t, e) {
      this.canvas.width = Math.round(t * this.resolution), this.canvas.height = Math.round(e * this.resolution);
    }, i.prototype.destroy = function() {
      this.context = null, this.canvas = null;
    }, Object.defineProperty(i.prototype, "width", {
      /**
       * The width of the canvas buffer in pixels.
       * @member {number}
       */
      get: function() {
        return this.canvas.width;
      },
      set: function(t) {
        this.canvas.width = Math.round(t);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "height", {
      /**
       * The height of the canvas buffer in pixels.
       * @member {number}
       */
      get: function() {
        return this.canvas.height;
      },
      set: function(t) {
        this.canvas.height = Math.round(t);
      },
      enumerable: !1,
      configurable: !0
    }), i;
  }()
);
function Uf(i) {
  var t = i.width, e = i.height, r = i.getContext("2d", {
    willReadFrequently: !0
  }), n = r.getImageData(0, 0, t, e), s = n.data, a = s.length, o = {
    top: null,
    left: null,
    right: null,
    bottom: null
  }, h = null, u, l, f;
  for (u = 0; u < a; u += 4)
    s[u + 3] !== 0 && (l = u / 4 % t, f = ~~(u / 4 / t), o.top === null && (o.top = f), (o.left === null || l < o.left) && (o.left = l), (o.right === null || o.right < l) && (o.right = l + 1), (o.bottom === null || o.bottom < f) && (o.bottom = f));
  return o.top !== null && (t = o.right - o.left, e = o.bottom - o.top + 1, h = r.getImageData(o.left, o.top, t, e)), {
    height: e,
    width: t,
    data: h
  };
}
var Mr;
function Gf(i, t) {
  if (t === void 0 && (t = globalThis.location), i.indexOf("data:") === 0)
    return "";
  t = t || globalThis.location, Mr || (Mr = document.createElement("a")), Mr.href = i;
  var e = ze.parse(Mr.href), r = !e.port && t.port === "" || e.port === t.port;
  return e.hostname !== t.hostname || !r || e.protocol !== t.protocol ? "anonymous" : "";
}
function li(i, t) {
  var e = z.RETINA_PREFIX.exec(i);
  return e ? parseFloat(e[1]) : t !== void 0 ? t : 1;
}
/*!
 * @pixi/math - v6.5.10
 * Compiled Thu, 06 Jul 2023 15:25:11 UTC
 *
 * @pixi/math is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
var fi = Math.PI * 2, jf = 180 / Math.PI, Hf = Math.PI / 180, Rt;
(function(i) {
  i[i.POLY = 0] = "POLY", i[i.RECT = 1] = "RECT", i[i.CIRC = 2] = "CIRC", i[i.ELIP = 3] = "ELIP", i[i.RREC = 4] = "RREC";
})(Rt || (Rt = {}));
var gt = (
  /** @class */
  function() {
    function i(t, e) {
      t === void 0 && (t = 0), e === void 0 && (e = 0), this.x = 0, this.y = 0, this.x = t, this.y = e;
    }
    return i.prototype.clone = function() {
      return new i(this.x, this.y);
    }, i.prototype.copyFrom = function(t) {
      return this.set(t.x, t.y), this;
    }, i.prototype.copyTo = function(t) {
      return t.set(this.x, this.y), t;
    }, i.prototype.equals = function(t) {
      return t.x === this.x && t.y === this.y;
    }, i.prototype.set = function(t, e) {
      return t === void 0 && (t = 0), e === void 0 && (e = t), this.x = t, this.y = e, this;
    }, i.prototype.toString = function() {
      return "[@pixi/math:Point x=" + this.x + " y=" + this.y + "]";
    }, i;
  }()
), Cr = [new gt(), new gt(), new gt(), new gt()], ht = (
  /** @class */
  function() {
    function i(t, e, r, n) {
      t === void 0 && (t = 0), e === void 0 && (e = 0), r === void 0 && (r = 0), n === void 0 && (n = 0), this.x = Number(t), this.y = Number(e), this.width = Number(r), this.height = Number(n), this.type = Rt.RECT;
    }
    return Object.defineProperty(i.prototype, "left", {
      /** Returns the left edge of the rectangle. */
      get: function() {
        return this.x;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "right", {
      /** Returns the right edge of the rectangle. */
      get: function() {
        return this.x + this.width;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "top", {
      /** Returns the top edge of the rectangle. */
      get: function() {
        return this.y;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "bottom", {
      /** Returns the bottom edge of the rectangle. */
      get: function() {
        return this.y + this.height;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i, "EMPTY", {
      /** A constant empty rectangle. */
      get: function() {
        return new i(0, 0, 0, 0);
      },
      enumerable: !1,
      configurable: !0
    }), i.prototype.clone = function() {
      return new i(this.x, this.y, this.width, this.height);
    }, i.prototype.copyFrom = function(t) {
      return this.x = t.x, this.y = t.y, this.width = t.width, this.height = t.height, this;
    }, i.prototype.copyTo = function(t) {
      return t.x = this.x, t.y = this.y, t.width = this.width, t.height = this.height, t;
    }, i.prototype.contains = function(t, e) {
      return this.width <= 0 || this.height <= 0 ? !1 : t >= this.x && t < this.x + this.width && e >= this.y && e < this.y + this.height;
    }, i.prototype.intersects = function(t, e) {
      if (!e) {
        var r = this.x < t.x ? t.x : this.x, n = this.right > t.right ? t.right : this.right;
        if (n <= r)
          return !1;
        var s = this.y < t.y ? t.y : this.y, a = this.bottom > t.bottom ? t.bottom : this.bottom;
        return a > s;
      }
      var o = this.left, h = this.right, u = this.top, l = this.bottom;
      if (h <= o || l <= u)
        return !1;
      var f = Cr[0].set(t.left, t.top), c = Cr[1].set(t.left, t.bottom), d = Cr[2].set(t.right, t.top), p = Cr[3].set(t.right, t.bottom);
      if (d.x <= f.x || c.y <= f.y)
        return !1;
      var v = Math.sign(e.a * e.d - e.b * e.c);
      if (v === 0 || (e.apply(f, f), e.apply(c, c), e.apply(d, d), e.apply(p, p), Math.max(f.x, c.x, d.x, p.x) <= o || Math.min(f.x, c.x, d.x, p.x) >= h || Math.max(f.y, c.y, d.y, p.y) <= u || Math.min(f.y, c.y, d.y, p.y) >= l))
        return !1;
      var _ = v * (c.y - f.y), g = v * (f.x - c.x), I = _ * o + g * u, E = _ * h + g * u, B = _ * o + g * l, P = _ * h + g * l;
      if (Math.max(I, E, B, P) <= _ * f.x + g * f.y || Math.min(I, E, B, P) >= _ * p.x + g * p.y)
        return !1;
      var A = v * (f.y - d.y), R = v * (d.x - f.x), T = A * o + R * u, C = A * h + R * u, O = A * o + R * l, U = A * h + R * l;
      return !(Math.max(T, C, O, U) <= A * f.x + R * f.y || Math.min(T, C, O, U) >= A * p.x + R * p.y);
    }, i.prototype.pad = function(t, e) {
      return t === void 0 && (t = 0), e === void 0 && (e = t), this.x -= t, this.y -= e, this.width += t * 2, this.height += e * 2, this;
    }, i.prototype.fit = function(t) {
      var e = Math.max(this.x, t.x), r = Math.min(this.x + this.width, t.x + t.width), n = Math.max(this.y, t.y), s = Math.min(this.y + this.height, t.y + t.height);
      return this.x = e, this.width = Math.max(r - e, 0), this.y = n, this.height = Math.max(s - n, 0), this;
    }, i.prototype.ceil = function(t, e) {
      t === void 0 && (t = 1), e === void 0 && (e = 1e-3);
      var r = Math.ceil((this.x + this.width - e) * t) / t, n = Math.ceil((this.y + this.height - e) * t) / t;
      return this.x = Math.floor((this.x + e) * t) / t, this.y = Math.floor((this.y + e) * t) / t, this.width = r - this.x, this.height = n - this.y, this;
    }, i.prototype.enlarge = function(t) {
      var e = Math.min(this.x, t.x), r = Math.max(this.x + this.width, t.x + t.width), n = Math.min(this.y, t.y), s = Math.max(this.y + this.height, t.y + t.height);
      return this.x = e, this.width = r - e, this.y = n, this.height = s - n, this;
    }, i.prototype.toString = function() {
      return "[@pixi/math:Rectangle x=" + this.x + " y=" + this.y + " width=" + this.width + " height=" + this.height + "]";
    }, i;
  }()
), Xf = (
  /** @class */
  function() {
    function i(t, e, r) {
      t === void 0 && (t = 0), e === void 0 && (e = 0), r === void 0 && (r = 0), this.x = t, this.y = e, this.radius = r, this.type = Rt.CIRC;
    }
    return i.prototype.clone = function() {
      return new i(this.x, this.y, this.radius);
    }, i.prototype.contains = function(t, e) {
      if (this.radius <= 0)
        return !1;
      var r = this.radius * this.radius, n = this.x - t, s = this.y - e;
      return n *= n, s *= s, n + s <= r;
    }, i.prototype.getBounds = function() {
      return new ht(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
    }, i.prototype.toString = function() {
      return "[@pixi/math:Circle x=" + this.x + " y=" + this.y + " radius=" + this.radius + "]";
    }, i;
  }()
), zf = (
  /** @class */
  function() {
    function i(t, e, r, n) {
      t === void 0 && (t = 0), e === void 0 && (e = 0), r === void 0 && (r = 0), n === void 0 && (n = 0), this.x = t, this.y = e, this.width = r, this.height = n, this.type = Rt.ELIP;
    }
    return i.prototype.clone = function() {
      return new i(this.x, this.y, this.width, this.height);
    }, i.prototype.contains = function(t, e) {
      if (this.width <= 0 || this.height <= 0)
        return !1;
      var r = (t - this.x) / this.width, n = (e - this.y) / this.height;
      return r *= r, n *= n, r + n <= 1;
    }, i.prototype.getBounds = function() {
      return new ht(this.x - this.width, this.y - this.height, this.width, this.height);
    }, i.prototype.toString = function() {
      return "[@pixi/math:Ellipse x=" + this.x + " y=" + this.y + " width=" + this.width + " height=" + this.height + "]";
    }, i;
  }()
), Qr = (
  /** @class */
  function() {
    function i() {
      for (var t = arguments, e = [], r = 0; r < arguments.length; r++)
        e[r] = t[r];
      var n = Array.isArray(e[0]) ? e[0] : e;
      if (typeof n[0] != "number") {
        for (var s = [], a = 0, o = n.length; a < o; a++)
          s.push(n[a].x, n[a].y);
        n = s;
      }
      this.points = n, this.type = Rt.POLY, this.closeStroke = !0;
    }
    return i.prototype.clone = function() {
      var t = this.points.slice(), e = new i(t);
      return e.closeStroke = this.closeStroke, e;
    }, i.prototype.contains = function(t, e) {
      for (var r = !1, n = this.points.length / 2, s = 0, a = n - 1; s < n; a = s++) {
        var o = this.points[s * 2], h = this.points[s * 2 + 1], u = this.points[a * 2], l = this.points[a * 2 + 1], f = h > e != l > e && t < (u - o) * ((e - h) / (l - h)) + o;
        f && (r = !r);
      }
      return r;
    }, i.prototype.toString = function() {
      return "[@pixi/math:Polygon" + ("closeStroke=" + this.closeStroke) + ("points=" + this.points.reduce(function(t, e) {
        return t + ", " + e;
      }, "") + "]");
    }, i;
  }()
), Yf = (
  /** @class */
  function() {
    function i(t, e, r, n, s) {
      t === void 0 && (t = 0), e === void 0 && (e = 0), r === void 0 && (r = 0), n === void 0 && (n = 0), s === void 0 && (s = 20), this.x = t, this.y = e, this.width = r, this.height = n, this.radius = s, this.type = Rt.RREC;
    }
    return i.prototype.clone = function() {
      return new i(this.x, this.y, this.width, this.height, this.radius);
    }, i.prototype.contains = function(t, e) {
      if (this.width <= 0 || this.height <= 0)
        return !1;
      if (t >= this.x && t <= this.x + this.width && e >= this.y && e <= this.y + this.height) {
        var r = Math.max(0, Math.min(this.radius, Math.min(this.width, this.height) / 2));
        if (e >= this.y + r && e <= this.y + this.height - r || t >= this.x + r && t <= this.x + this.width - r)
          return !0;
        var n = t - (this.x + r), s = e - (this.y + r), a = r * r;
        if (n * n + s * s <= a || (n = t - (this.x + this.width - r), n * n + s * s <= a) || (s = e - (this.y + this.height - r), n * n + s * s <= a) || (n = t - (this.x + r), n * n + s * s <= a))
          return !0;
      }
      return !1;
    }, i.prototype.toString = function() {
      return "[@pixi/math:RoundedRectangle x=" + this.x + " y=" + this.y + ("width=" + this.width + " height=" + this.height + " radius=" + this.radius + "]");
    }, i;
  }()
), We = (
  /** @class */
  function() {
    function i(t, e, r, n) {
      r === void 0 && (r = 0), n === void 0 && (n = 0), this._x = r, this._y = n, this.cb = t, this.scope = e;
    }
    return i.prototype.clone = function(t, e) {
      return t === void 0 && (t = this.cb), e === void 0 && (e = this.scope), new i(t, e, this._x, this._y);
    }, i.prototype.set = function(t, e) {
      return t === void 0 && (t = 0), e === void 0 && (e = t), (this._x !== t || this._y !== e) && (this._x = t, this._y = e, this.cb.call(this.scope)), this;
    }, i.prototype.copyFrom = function(t) {
      return (this._x !== t.x || this._y !== t.y) && (this._x = t.x, this._y = t.y, this.cb.call(this.scope)), this;
    }, i.prototype.copyTo = function(t) {
      return t.set(this._x, this._y), t;
    }, i.prototype.equals = function(t) {
      return t.x === this._x && t.y === this._y;
    }, i.prototype.toString = function() {
      return "[@pixi/math:ObservablePoint x=0 y=0 scope=" + this.scope + "]";
    }, Object.defineProperty(i.prototype, "x", {
      /** Position of the observable point on the x axis. */
      get: function() {
        return this._x;
      },
      set: function(t) {
        this._x !== t && (this._x = t, this.cb.call(this.scope));
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "y", {
      /** Position of the observable point on the y axis. */
      get: function() {
        return this._y;
      },
      set: function(t) {
        this._y !== t && (this._y = t, this.cb.call(this.scope));
      },
      enumerable: !1,
      configurable: !0
    }), i;
  }()
), At = (
  /** @class */
  function() {
    function i(t, e, r, n, s, a) {
      t === void 0 && (t = 1), e === void 0 && (e = 0), r === void 0 && (r = 0), n === void 0 && (n = 1), s === void 0 && (s = 0), a === void 0 && (a = 0), this.array = null, this.a = t, this.b = e, this.c = r, this.d = n, this.tx = s, this.ty = a;
    }
    return i.prototype.fromArray = function(t) {
      this.a = t[0], this.b = t[1], this.c = t[3], this.d = t[4], this.tx = t[2], this.ty = t[5];
    }, i.prototype.set = function(t, e, r, n, s, a) {
      return this.a = t, this.b = e, this.c = r, this.d = n, this.tx = s, this.ty = a, this;
    }, i.prototype.toArray = function(t, e) {
      this.array || (this.array = new Float32Array(9));
      var r = e || this.array;
      return t ? (r[0] = this.a, r[1] = this.b, r[2] = 0, r[3] = this.c, r[4] = this.d, r[5] = 0, r[6] = this.tx, r[7] = this.ty, r[8] = 1) : (r[0] = this.a, r[1] = this.c, r[2] = this.tx, r[3] = this.b, r[4] = this.d, r[5] = this.ty, r[6] = 0, r[7] = 0, r[8] = 1), r;
    }, i.prototype.apply = function(t, e) {
      e = e || new gt();
      var r = t.x, n = t.y;
      return e.x = this.a * r + this.c * n + this.tx, e.y = this.b * r + this.d * n + this.ty, e;
    }, i.prototype.applyInverse = function(t, e) {
      e = e || new gt();
      var r = 1 / (this.a * this.d + this.c * -this.b), n = t.x, s = t.y;
      return e.x = this.d * r * n + -this.c * r * s + (this.ty * this.c - this.tx * this.d) * r, e.y = this.a * r * s + -this.b * r * n + (-this.ty * this.a + this.tx * this.b) * r, e;
    }, i.prototype.translate = function(t, e) {
      return this.tx += t, this.ty += e, this;
    }, i.prototype.scale = function(t, e) {
      return this.a *= t, this.d *= e, this.c *= t, this.b *= e, this.tx *= t, this.ty *= e, this;
    }, i.prototype.rotate = function(t) {
      var e = Math.cos(t), r = Math.sin(t), n = this.a, s = this.c, a = this.tx;
      return this.a = n * e - this.b * r, this.b = n * r + this.b * e, this.c = s * e - this.d * r, this.d = s * r + this.d * e, this.tx = a * e - this.ty * r, this.ty = a * r + this.ty * e, this;
    }, i.prototype.append = function(t) {
      var e = this.a, r = this.b, n = this.c, s = this.d;
      return this.a = t.a * e + t.b * n, this.b = t.a * r + t.b * s, this.c = t.c * e + t.d * n, this.d = t.c * r + t.d * s, this.tx = t.tx * e + t.ty * n + this.tx, this.ty = t.tx * r + t.ty * s + this.ty, this;
    }, i.prototype.setTransform = function(t, e, r, n, s, a, o, h, u) {
      return this.a = Math.cos(o + u) * s, this.b = Math.sin(o + u) * s, this.c = -Math.sin(o - h) * a, this.d = Math.cos(o - h) * a, this.tx = t - (r * this.a + n * this.c), this.ty = e - (r * this.b + n * this.d), this;
    }, i.prototype.prepend = function(t) {
      var e = this.tx;
      if (t.a !== 1 || t.b !== 0 || t.c !== 0 || t.d !== 1) {
        var r = this.a, n = this.c;
        this.a = r * t.a + this.b * t.c, this.b = r * t.b + this.b * t.d, this.c = n * t.a + this.d * t.c, this.d = n * t.b + this.d * t.d;
      }
      return this.tx = e * t.a + this.ty * t.c + t.tx, this.ty = e * t.b + this.ty * t.d + t.ty, this;
    }, i.prototype.decompose = function(t) {
      var e = this.a, r = this.b, n = this.c, s = this.d, a = t.pivot, o = -Math.atan2(-n, s), h = Math.atan2(r, e), u = Math.abs(o + h);
      return u < 1e-5 || Math.abs(fi - u) < 1e-5 ? (t.rotation = h, t.skew.x = t.skew.y = 0) : (t.rotation = 0, t.skew.x = o, t.skew.y = h), t.scale.x = Math.sqrt(e * e + r * r), t.scale.y = Math.sqrt(n * n + s * s), t.position.x = this.tx + (a.x * e + a.y * n), t.position.y = this.ty + (a.x * r + a.y * s), t;
    }, i.prototype.invert = function() {
      var t = this.a, e = this.b, r = this.c, n = this.d, s = this.tx, a = t * n - e * r;
      return this.a = n / a, this.b = -e / a, this.c = -r / a, this.d = t / a, this.tx = (r * this.ty - n * s) / a, this.ty = -(t * this.ty - e * s) / a, this;
    }, i.prototype.identity = function() {
      return this.a = 1, this.b = 0, this.c = 0, this.d = 1, this.tx = 0, this.ty = 0, this;
    }, i.prototype.clone = function() {
      var t = new i();
      return t.a = this.a, t.b = this.b, t.c = this.c, t.d = this.d, t.tx = this.tx, t.ty = this.ty, t;
    }, i.prototype.copyTo = function(t) {
      return t.a = this.a, t.b = this.b, t.c = this.c, t.d = this.d, t.tx = this.tx, t.ty = this.ty, t;
    }, i.prototype.copyFrom = function(t) {
      return this.a = t.a, this.b = t.b, this.c = t.c, this.d = t.d, this.tx = t.tx, this.ty = t.ty, this;
    }, i.prototype.toString = function() {
      return "[@pixi/math:Matrix a=" + this.a + " b=" + this.b + " c=" + this.c + " d=" + this.d + " tx=" + this.tx + " ty=" + this.ty + "]";
    }, Object.defineProperty(i, "IDENTITY", {
      /**
       * A default (identity) matrix
       * @readonly
       */
      get: function() {
        return new i();
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i, "TEMP_MATRIX", {
      /**
       * A temp matrix
       * @readonly
       */
      get: function() {
        return new i();
      },
      enumerable: !1,
      configurable: !0
    }), i;
  }()
), Ce = [1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1, 0, 1], Ae = [0, 1, 1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1], Re = [0, -1, -1, -1, 0, 1, 1, 1, 0, 1, 1, 1, 0, -1, -1, -1], Oe = [1, 1, 0, -1, -1, -1, 0, 1, -1, -1, 0, 1, 1, 1, 0, -1], vn = [], so = [], Ar = Math.sign;
function Wf() {
  for (var i = 0; i < 16; i++) {
    var t = [];
    vn.push(t);
    for (var e = 0; e < 16; e++)
      for (var r = Ar(Ce[i] * Ce[e] + Re[i] * Ae[e]), n = Ar(Ae[i] * Ce[e] + Oe[i] * Ae[e]), s = Ar(Ce[i] * Re[e] + Re[i] * Oe[e]), a = Ar(Ae[i] * Re[e] + Oe[i] * Oe[e]), o = 0; o < 16; o++)
        if (Ce[o] === r && Ae[o] === n && Re[o] === s && Oe[o] === a) {
          t.push(o);
          break;
        }
  }
  for (var i = 0; i < 16; i++) {
    var h = new At();
    h.set(Ce[i], Ae[i], Re[i], Oe[i], 0, 0), so.push(h);
  }
}
Wf();
var xt = {
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
  uX: function(i) {
    return Ce[i];
  },
  /**
   * @memberof PIXI.groupD8
   * @param {PIXI.GD8Symmetry} ind - sprite rotation angle.
   * @returns {PIXI.GD8Symmetry} The Y-component of the U-axis
   *    after rotating the axes.
   */
  uY: function(i) {
    return Ae[i];
  },
  /**
   * @memberof PIXI.groupD8
   * @param {PIXI.GD8Symmetry} ind - sprite rotation angle.
   * @returns {PIXI.GD8Symmetry} The X-component of the V-axis
   *    after rotating the axes.
   */
  vX: function(i) {
    return Re[i];
  },
  /**
   * @memberof PIXI.groupD8
   * @param {PIXI.GD8Symmetry} ind - sprite rotation angle.
   * @returns {PIXI.GD8Symmetry} The Y-component of the V-axis
   *    after rotating the axes.
   */
  vY: function(i) {
    return Oe[i];
  },
  /**
   * @memberof PIXI.groupD8
   * @param {PIXI.GD8Symmetry} rotation - symmetry whose opposite
   *   is needed. Only rotations have opposite symmetries while
   *   reflections don't.
   * @returns {PIXI.GD8Symmetry} The opposite symmetry of `rotation`
   */
  inv: function(i) {
    return i & 8 ? i & 15 : -i & 7;
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
  add: function(i, t) {
    return vn[i][t];
  },
  /**
   * Reverse of `add`.
   * @memberof PIXI.groupD8
   * @param {PIXI.GD8Symmetry} rotationSecond - Second operation
   * @param {PIXI.GD8Symmetry} rotationFirst - First operation
   * @returns {PIXI.GD8Symmetry} Result
   */
  sub: function(i, t) {
    return vn[i][xt.inv(t)];
  },
  /**
   * Adds 180 degrees to rotation, which is a commutative
   * operation.
   * @memberof PIXI.groupD8
   * @param {number} rotation - The number to rotate.
   * @returns {number} Rotated number
   */
  rotate180: function(i) {
    return i ^ 4;
  },
  /**
   * Checks if the rotation angle is vertical, i.e. south
   * or north. It doesn't work for reflections.
   * @memberof PIXI.groupD8
   * @param {PIXI.GD8Symmetry} rotation - The number to check.
   * @returns {boolean} Whether or not the direction is vertical
   */
  isVertical: function(i) {
    return (i & 3) === 2;
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
  byDirection: function(i, t) {
    return Math.abs(i) * 2 <= Math.abs(t) ? t >= 0 ? xt.S : xt.N : Math.abs(t) * 2 <= Math.abs(i) ? i > 0 ? xt.E : xt.W : t > 0 ? i > 0 ? xt.SE : xt.SW : i > 0 ? xt.NE : xt.NW;
  },
  /**
   * Helps sprite to compensate texture packer rotation.
   * @memberof PIXI.groupD8
   * @param {PIXI.Matrix} matrix - sprite world matrix
   * @param {PIXI.GD8Symmetry} rotation - The rotation factor to use.
   * @param {number} tx - sprite anchoring
   * @param {number} ty - sprite anchoring
   */
  matrixAppendRotationInv: function(i, t, e, r) {
    e === void 0 && (e = 0), r === void 0 && (r = 0);
    var n = so[xt.inv(t)];
    n.tx = e, n.ty = r, i.append(n);
  }
}, ao = (
  /** @class */
  function() {
    function i() {
      this.worldTransform = new At(), this.localTransform = new At(), this.position = new We(this.onChange, this, 0, 0), this.scale = new We(this.onChange, this, 1, 1), this.pivot = new We(this.onChange, this, 0, 0), this.skew = new We(this.updateSkew, this, 0, 0), this._rotation = 0, this._cx = 1, this._sx = 0, this._cy = 0, this._sy = 1, this._localID = 0, this._currentLocalID = 0, this._worldID = 0, this._parentID = 0;
    }
    return i.prototype.onChange = function() {
      this._localID++;
    }, i.prototype.updateSkew = function() {
      this._cx = Math.cos(this._rotation + this.skew.y), this._sx = Math.sin(this._rotation + this.skew.y), this._cy = -Math.sin(this._rotation - this.skew.x), this._sy = Math.cos(this._rotation - this.skew.x), this._localID++;
    }, i.prototype.toString = function() {
      return "[@pixi/math:Transform " + ("position=(" + this.position.x + ", " + this.position.y + ") ") + ("rotation=" + this.rotation + " ") + ("scale=(" + this.scale.x + ", " + this.scale.y + ") ") + ("skew=(" + this.skew.x + ", " + this.skew.y + ") ") + "]";
    }, i.prototype.updateLocalTransform = function() {
      var t = this.localTransform;
      this._localID !== this._currentLocalID && (t.a = this._cx * this.scale.x, t.b = this._sx * this.scale.x, t.c = this._cy * this.scale.y, t.d = this._sy * this.scale.y, t.tx = this.position.x - (this.pivot.x * t.a + this.pivot.y * t.c), t.ty = this.position.y - (this.pivot.x * t.b + this.pivot.y * t.d), this._currentLocalID = this._localID, this._parentID = -1);
    }, i.prototype.updateTransform = function(t) {
      var e = this.localTransform;
      if (this._localID !== this._currentLocalID && (e.a = this._cx * this.scale.x, e.b = this._sx * this.scale.x, e.c = this._cy * this.scale.y, e.d = this._sy * this.scale.y, e.tx = this.position.x - (this.pivot.x * e.a + this.pivot.y * e.c), e.ty = this.position.y - (this.pivot.x * e.b + this.pivot.y * e.d), this._currentLocalID = this._localID, this._parentID = -1), this._parentID !== t._worldID) {
        var r = t.worldTransform, n = this.worldTransform;
        n.a = e.a * r.a + e.b * r.c, n.b = e.a * r.b + e.b * r.d, n.c = e.c * r.a + e.d * r.c, n.d = e.c * r.b + e.d * r.d, n.tx = e.tx * r.a + e.ty * r.c + r.tx, n.ty = e.tx * r.b + e.ty * r.d + r.ty, this._parentID = t._worldID, this._worldID++;
      }
    }, i.prototype.setFromMatrix = function(t) {
      t.decompose(this), this._localID++;
    }, Object.defineProperty(i.prototype, "rotation", {
      /** The rotation of the object in radians. */
      get: function() {
        return this._rotation;
      },
      set: function(t) {
        this._rotation !== t && (this._rotation = t, this.updateSkew());
      },
      enumerable: !1,
      configurable: !0
    }), i.IDENTITY = new i(), i;
  }()
);
/*!
 * @pixi/display - v6.5.10
 * Compiled Thu, 06 Jul 2023 15:25:11 UTC
 *
 * @pixi/display is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
z.SORTABLE_CHILDREN = !1;
var ci = (
  /** @class */
  function() {
    function i() {
      this.minX = 1 / 0, this.minY = 1 / 0, this.maxX = -1 / 0, this.maxY = -1 / 0, this.rect = null, this.updateID = -1;
    }
    return i.prototype.isEmpty = function() {
      return this.minX > this.maxX || this.minY > this.maxY;
    }, i.prototype.clear = function() {
      this.minX = 1 / 0, this.minY = 1 / 0, this.maxX = -1 / 0, this.maxY = -1 / 0;
    }, i.prototype.getRectangle = function(t) {
      return this.minX > this.maxX || this.minY > this.maxY ? ht.EMPTY : (t = t || new ht(0, 0, 1, 1), t.x = this.minX, t.y = this.minY, t.width = this.maxX - this.minX, t.height = this.maxY - this.minY, t);
    }, i.prototype.addPoint = function(t) {
      this.minX = Math.min(this.minX, t.x), this.maxX = Math.max(this.maxX, t.x), this.minY = Math.min(this.minY, t.y), this.maxY = Math.max(this.maxY, t.y);
    }, i.prototype.addPointMatrix = function(t, e) {
      var r = t.a, n = t.b, s = t.c, a = t.d, o = t.tx, h = t.ty, u = r * e.x + s * e.y + o, l = n * e.x + a * e.y + h;
      this.minX = Math.min(this.minX, u), this.maxX = Math.max(this.maxX, u), this.minY = Math.min(this.minY, l), this.maxY = Math.max(this.maxY, l);
    }, i.prototype.addQuad = function(t) {
      var e = this.minX, r = this.minY, n = this.maxX, s = this.maxY, a = t[0], o = t[1];
      e = a < e ? a : e, r = o < r ? o : r, n = a > n ? a : n, s = o > s ? o : s, a = t[2], o = t[3], e = a < e ? a : e, r = o < r ? o : r, n = a > n ? a : n, s = o > s ? o : s, a = t[4], o = t[5], e = a < e ? a : e, r = o < r ? o : r, n = a > n ? a : n, s = o > s ? o : s, a = t[6], o = t[7], e = a < e ? a : e, r = o < r ? o : r, n = a > n ? a : n, s = o > s ? o : s, this.minX = e, this.minY = r, this.maxX = n, this.maxY = s;
    }, i.prototype.addFrame = function(t, e, r, n, s) {
      this.addFrameMatrix(t.worldTransform, e, r, n, s);
    }, i.prototype.addFrameMatrix = function(t, e, r, n, s) {
      var a = t.a, o = t.b, h = t.c, u = t.d, l = t.tx, f = t.ty, c = this.minX, d = this.minY, p = this.maxX, v = this.maxY, _ = a * e + h * r + l, g = o * e + u * r + f;
      c = _ < c ? _ : c, d = g < d ? g : d, p = _ > p ? _ : p, v = g > v ? g : v, _ = a * n + h * r + l, g = o * n + u * r + f, c = _ < c ? _ : c, d = g < d ? g : d, p = _ > p ? _ : p, v = g > v ? g : v, _ = a * e + h * s + l, g = o * e + u * s + f, c = _ < c ? _ : c, d = g < d ? g : d, p = _ > p ? _ : p, v = g > v ? g : v, _ = a * n + h * s + l, g = o * n + u * s + f, c = _ < c ? _ : c, d = g < d ? g : d, p = _ > p ? _ : p, v = g > v ? g : v, this.minX = c, this.minY = d, this.maxX = p, this.maxY = v;
    }, i.prototype.addVertexData = function(t, e, r) {
      for (var n = this.minX, s = this.minY, a = this.maxX, o = this.maxY, h = e; h < r; h += 2) {
        var u = t[h], l = t[h + 1];
        n = u < n ? u : n, s = l < s ? l : s, a = u > a ? u : a, o = l > o ? l : o;
      }
      this.minX = n, this.minY = s, this.maxX = a, this.maxY = o;
    }, i.prototype.addVertices = function(t, e, r, n) {
      this.addVerticesMatrix(t.worldTransform, e, r, n);
    }, i.prototype.addVerticesMatrix = function(t, e, r, n, s, a) {
      s === void 0 && (s = 0), a === void 0 && (a = s);
      for (var o = t.a, h = t.b, u = t.c, l = t.d, f = t.tx, c = t.ty, d = this.minX, p = this.minY, v = this.maxX, _ = this.maxY, g = r; g < n; g += 2) {
        var I = e[g], E = e[g + 1], B = o * I + u * E + f, P = l * E + h * I + c;
        d = Math.min(d, B - s), v = Math.max(v, B + s), p = Math.min(p, P - a), _ = Math.max(_, P + a);
      }
      this.minX = d, this.minY = p, this.maxX = v, this.maxY = _;
    }, i.prototype.addBounds = function(t) {
      var e = this.minX, r = this.minY, n = this.maxX, s = this.maxY;
      this.minX = t.minX < e ? t.minX : e, this.minY = t.minY < r ? t.minY : r, this.maxX = t.maxX > n ? t.maxX : n, this.maxY = t.maxY > s ? t.maxY : s;
    }, i.prototype.addBoundsMask = function(t, e) {
      var r = t.minX > e.minX ? t.minX : e.minX, n = t.minY > e.minY ? t.minY : e.minY, s = t.maxX < e.maxX ? t.maxX : e.maxX, a = t.maxY < e.maxY ? t.maxY : e.maxY;
      if (r <= s && n <= a) {
        var o = this.minX, h = this.minY, u = this.maxX, l = this.maxY;
        this.minX = r < o ? r : o, this.minY = n < h ? n : h, this.maxX = s > u ? s : u, this.maxY = a > l ? a : l;
      }
    }, i.prototype.addBoundsMatrix = function(t, e) {
      this.addFrameMatrix(e, t.minX, t.minY, t.maxX, t.maxY);
    }, i.prototype.addBoundsArea = function(t, e) {
      var r = t.minX > e.x ? t.minX : e.x, n = t.minY > e.y ? t.minY : e.y, s = t.maxX < e.x + e.width ? t.maxX : e.x + e.width, a = t.maxY < e.y + e.height ? t.maxY : e.y + e.height;
      if (r <= s && n <= a) {
        var o = this.minX, h = this.minY, u = this.maxX, l = this.maxY;
        this.minX = r < o ? r : o, this.minY = n < h ? n : h, this.maxX = s > u ? s : u, this.maxY = a > l ? a : l;
      }
    }, i.prototype.pad = function(t, e) {
      t === void 0 && (t = 0), e === void 0 && (e = t), this.isEmpty() || (this.minX -= t, this.maxX += t, this.minY -= e, this.maxY += e);
    }, i.prototype.addFramePad = function(t, e, r, n, s, a) {
      t -= s, e -= a, r += s, n += a, this.minX = this.minX < t ? this.minX : t, this.maxX = this.maxX > r ? this.maxX : r, this.minY = this.minY < e ? this.minY : e, this.maxY = this.maxY > n ? this.maxY : n;
    }, i;
  }()
);
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var _n = function(i, t) {
  return _n = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, r) {
    e.__proto__ = r;
  } || function(e, r) {
    for (var n in r)
      r.hasOwnProperty(n) && (e[n] = r[n]);
  }, _n(i, t);
};
function Jn(i, t) {
  _n(i, t);
  function e() {
    this.constructor = i;
  }
  i.prototype = t === null ? Object.create(t) : (e.prototype = t.prototype, new e());
}
var St = (
  /** @class */
  function(i) {
    Jn(t, i);
    function t() {
      var e = i.call(this) || this;
      return e.tempDisplayObjectParent = null, e.transform = new ao(), e.alpha = 1, e.visible = !0, e.renderable = !0, e.cullable = !1, e.cullArea = null, e.parent = null, e.worldAlpha = 1, e._lastSortedIndex = 0, e._zIndex = 0, e.filterArea = null, e.filters = null, e._enabledFilters = null, e._bounds = new ci(), e._localBounds = null, e._boundsID = 0, e._boundsRect = null, e._localBoundsRect = null, e._mask = null, e._maskRefCount = 0, e._destroyed = !1, e.isSprite = !1, e.isMask = !1, e;
    }
    return t.mixin = function(e) {
      for (var r = Object.keys(e), n = 0; n < r.length; ++n) {
        var s = r[n];
        Object.defineProperty(t.prototype, s, Object.getOwnPropertyDescriptor(e, s));
      }
    }, Object.defineProperty(t.prototype, "destroyed", {
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
    }), t.prototype._recursivePostUpdateTransform = function() {
      this.parent ? (this.parent._recursivePostUpdateTransform(), this.transform.updateTransform(this.parent.transform)) : this.transform.updateTransform(this._tempDisplayObjectParent.transform);
    }, t.prototype.updateTransform = function() {
      this._boundsID++, this.transform.updateTransform(this.parent.transform), this.worldAlpha = this.alpha * this.parent.worldAlpha;
    }, t.prototype.getBounds = function(e, r) {
      return e || (this.parent ? (this._recursivePostUpdateTransform(), this.updateTransform()) : (this.parent = this._tempDisplayObjectParent, this.updateTransform(), this.parent = null)), this._bounds.updateID !== this._boundsID && (this.calculateBounds(), this._bounds.updateID = this._boundsID), r || (this._boundsRect || (this._boundsRect = new ht()), r = this._boundsRect), this._bounds.getRectangle(r);
    }, t.prototype.getLocalBounds = function(e) {
      e || (this._localBoundsRect || (this._localBoundsRect = new ht()), e = this._localBoundsRect), this._localBounds || (this._localBounds = new ci());
      var r = this.transform, n = this.parent;
      this.parent = null, this.transform = this._tempDisplayObjectParent.transform;
      var s = this._bounds, a = this._boundsID;
      this._bounds = this._localBounds;
      var o = this.getBounds(!1, e);
      return this.parent = n, this.transform = r, this._bounds = s, this._bounds.updateID += this._boundsID - a, o;
    }, t.prototype.toGlobal = function(e, r, n) {
      return n === void 0 && (n = !1), n || (this._recursivePostUpdateTransform(), this.parent ? this.displayObjectUpdateTransform() : (this.parent = this._tempDisplayObjectParent, this.displayObjectUpdateTransform(), this.parent = null)), this.worldTransform.apply(e, r);
    }, t.prototype.toLocal = function(e, r, n, s) {
      return r && (e = r.toGlobal(e, n, s)), s || (this._recursivePostUpdateTransform(), this.parent ? this.displayObjectUpdateTransform() : (this.parent = this._tempDisplayObjectParent, this.displayObjectUpdateTransform(), this.parent = null)), this.worldTransform.applyInverse(e, n);
    }, t.prototype.setParent = function(e) {
      if (!e || !e.addChild)
        throw new Error("setParent: Argument must be a Container");
      return e.addChild(this), e;
    }, t.prototype.setTransform = function(e, r, n, s, a, o, h, u, l) {
      return e === void 0 && (e = 0), r === void 0 && (r = 0), n === void 0 && (n = 1), s === void 0 && (s = 1), a === void 0 && (a = 0), o === void 0 && (o = 0), h === void 0 && (h = 0), u === void 0 && (u = 0), l === void 0 && (l = 0), this.position.x = e, this.position.y = r, this.scale.x = n || 1, this.scale.y = s || 1, this.rotation = a, this.skew.x = o, this.skew.y = h, this.pivot.x = u, this.pivot.y = l, this;
    }, t.prototype.destroy = function(e) {
      this.parent && this.parent.removeChild(this), this._destroyed = !0, this.transform = null, this.parent = null, this._bounds = null, this.mask = null, this.cullArea = null, this.filters = null, this.filterArea = null, this.hitArea = null, this.interactive = !1, this.interactiveChildren = !1, this.emit("destroyed"), this.removeAllListeners();
    }, Object.defineProperty(t.prototype, "_tempDisplayObjectParent", {
      /**
       * @protected
       * @member {PIXI.Container}
       */
      get: function() {
        return this.tempDisplayObjectParent === null && (this.tempDisplayObjectParent = new oo()), this.tempDisplayObjectParent;
      },
      enumerable: !1,
      configurable: !0
    }), t.prototype.enableTempParent = function() {
      var e = this.parent;
      return this.parent = this._tempDisplayObjectParent, e;
    }, t.prototype.disableTempParent = function(e) {
      this.parent = e;
    }, Object.defineProperty(t.prototype, "x", {
      /**
       * The position of the displayObject on the x axis relative to the local coordinates of the parent.
       * An alias to position.x
       */
      get: function() {
        return this.position.x;
      },
      set: function(e) {
        this.transform.position.x = e;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "y", {
      /**
       * The position of the displayObject on the y axis relative to the local coordinates of the parent.
       * An alias to position.y
       */
      get: function() {
        return this.position.y;
      },
      set: function(e) {
        this.transform.position.y = e;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "worldTransform", {
      /**
       * Current transform of the object based on world (parent) factors.
       * @readonly
       */
      get: function() {
        return this.transform.worldTransform;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "localTransform", {
      /**
       * Current transform of the object based on local factors: position, scale, other stuff.
       * @readonly
       */
      get: function() {
        return this.transform.localTransform;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "position", {
      /**
       * The coordinate of the object relative to the local coordinates of the parent.
       * @since 4.0.0
       */
      get: function() {
        return this.transform.position;
      },
      set: function(e) {
        this.transform.position.copyFrom(e);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "scale", {
      /**
       * The scale factors of this object along the local coordinate axes.
       *
       * The default scale is (1, 1).
       * @since 4.0.0
       */
      get: function() {
        return this.transform.scale;
      },
      set: function(e) {
        this.transform.scale.copyFrom(e);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "pivot", {
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
      set: function(e) {
        this.transform.pivot.copyFrom(e);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "skew", {
      /**
       * The skew factor for the object in radians.
       * @since 4.0.0
       */
      get: function() {
        return this.transform.skew;
      },
      set: function(e) {
        this.transform.skew.copyFrom(e);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "rotation", {
      /**
       * The rotation of the object in radians.
       * 'rotation' and 'angle' have the same effect on a display object; rotation is in radians, angle is in degrees.
       */
      get: function() {
        return this.transform.rotation;
      },
      set: function(e) {
        this.transform.rotation = e;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "angle", {
      /**
       * The angle of the object in degrees.
       * 'rotation' and 'angle' have the same effect on a display object; rotation is in radians, angle is in degrees.
       */
      get: function() {
        return this.transform.rotation * jf;
      },
      set: function(e) {
        this.transform.rotation = e * Hf;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "zIndex", {
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
      set: function(e) {
        this._zIndex = e, this.parent && (this.parent.sortDirty = !0);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "worldVisible", {
      /**
       * Indicates if the object is globally visible.
       * @readonly
       */
      get: function() {
        var e = this;
        do {
          if (!e.visible)
            return !1;
          e = e.parent;
        } while (e);
        return !0;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "mask", {
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
      set: function(e) {
        if (this._mask !== e) {
          if (this._mask) {
            var r = this._mask.isMaskData ? this._mask.maskObject : this._mask;
            r && (r._maskRefCount--, r._maskRefCount === 0 && (r.renderable = !0, r.isMask = !1));
          }
          if (this._mask = e, this._mask) {
            var r = this._mask.isMaskData ? this._mask.maskObject : this._mask;
            r && (r._maskRefCount === 0 && (r.renderable = !1, r.isMask = !0), r._maskRefCount++);
          }
        }
      },
      enumerable: !1,
      configurable: !0
    }), t;
  }(qe)
), oo = (
  /** @class */
  function(i) {
    Jn(t, i);
    function t() {
      var e = i !== null && i.apply(this, arguments) || this;
      return e.sortDirty = null, e;
    }
    return t;
  }(St)
);
St.prototype.displayObjectUpdateTransform = St.prototype.updateTransform;
function Vf(i, t) {
  return i.zIndex === t.zIndex ? i._lastSortedIndex - t._lastSortedIndex : i.zIndex - t.zIndex;
}
var re = (
  /** @class */
  function(i) {
    Jn(t, i);
    function t() {
      var e = i.call(this) || this;
      return e.children = [], e.sortableChildren = z.SORTABLE_CHILDREN, e.sortDirty = !1, e;
    }
    return t.prototype.onChildrenChange = function(e) {
    }, t.prototype.addChild = function() {
      for (var e = arguments, r = [], n = 0; n < arguments.length; n++)
        r[n] = e[n];
      if (r.length > 1)
        for (var s = 0; s < r.length; s++)
          this.addChild(r[s]);
      else {
        var a = r[0];
        a.parent && a.parent.removeChild(a), a.parent = this, this.sortDirty = !0, a.transform._parentID = -1, this.children.push(a), this._boundsID++, this.onChildrenChange(this.children.length - 1), this.emit("childAdded", a, this, this.children.length - 1), a.emit("added", this);
      }
      return r[0];
    }, t.prototype.addChildAt = function(e, r) {
      if (r < 0 || r > this.children.length)
        throw new Error(e + "addChildAt: The index " + r + " supplied is out of bounds " + this.children.length);
      return e.parent && e.parent.removeChild(e), e.parent = this, this.sortDirty = !0, e.transform._parentID = -1, this.children.splice(r, 0, e), this._boundsID++, this.onChildrenChange(r), e.emit("added", this), this.emit("childAdded", e, this, r), e;
    }, t.prototype.swapChildren = function(e, r) {
      if (e !== r) {
        var n = this.getChildIndex(e), s = this.getChildIndex(r);
        this.children[n] = r, this.children[s] = e, this.onChildrenChange(n < s ? n : s);
      }
    }, t.prototype.getChildIndex = function(e) {
      var r = this.children.indexOf(e);
      if (r === -1)
        throw new Error("The supplied DisplayObject must be a child of the caller");
      return r;
    }, t.prototype.setChildIndex = function(e, r) {
      if (r < 0 || r >= this.children.length)
        throw new Error("The index " + r + " supplied is out of bounds " + this.children.length);
      var n = this.getChildIndex(e);
      Ve(this.children, n, 1), this.children.splice(r, 0, e), this.onChildrenChange(r);
    }, t.prototype.getChildAt = function(e) {
      if (e < 0 || e >= this.children.length)
        throw new Error("getChildAt: Index (" + e + ") does not exist.");
      return this.children[e];
    }, t.prototype.removeChild = function() {
      for (var e = arguments, r = [], n = 0; n < arguments.length; n++)
        r[n] = e[n];
      if (r.length > 1)
        for (var s = 0; s < r.length; s++)
          this.removeChild(r[s]);
      else {
        var a = r[0], o = this.children.indexOf(a);
        if (o === -1)
          return null;
        a.parent = null, a.transform._parentID = -1, Ve(this.children, o, 1), this._boundsID++, this.onChildrenChange(o), a.emit("removed", this), this.emit("childRemoved", a, this, o);
      }
      return r[0];
    }, t.prototype.removeChildAt = function(e) {
      var r = this.getChildAt(e);
      return r.parent = null, r.transform._parentID = -1, Ve(this.children, e, 1), this._boundsID++, this.onChildrenChange(e), r.emit("removed", this), this.emit("childRemoved", r, this, e), r;
    }, t.prototype.removeChildren = function(e, r) {
      e === void 0 && (e = 0), r === void 0 && (r = this.children.length);
      var n = e, s = r, a = s - n, o;
      if (a > 0 && a <= s) {
        o = this.children.splice(n, a);
        for (var h = 0; h < o.length; ++h)
          o[h].parent = null, o[h].transform && (o[h].transform._parentID = -1);
        this._boundsID++, this.onChildrenChange(e);
        for (var h = 0; h < o.length; ++h)
          o[h].emit("removed", this), this.emit("childRemoved", o[h], this, h);
        return o;
      } else if (a === 0 && this.children.length === 0)
        return [];
      throw new RangeError("removeChildren: numeric values are outside the acceptable range.");
    }, t.prototype.sortChildren = function() {
      for (var e = !1, r = 0, n = this.children.length; r < n; ++r) {
        var s = this.children[r];
        s._lastSortedIndex = r, !e && s.zIndex !== 0 && (e = !0);
      }
      e && this.children.length > 1 && this.children.sort(Vf), this.sortDirty = !1;
    }, t.prototype.updateTransform = function() {
      this.sortableChildren && this.sortDirty && this.sortChildren(), this._boundsID++, this.transform.updateTransform(this.parent.transform), this.worldAlpha = this.alpha * this.parent.worldAlpha;
      for (var e = 0, r = this.children.length; e < r; ++e) {
        var n = this.children[e];
        n.visible && n.updateTransform();
      }
    }, t.prototype.calculateBounds = function() {
      this._bounds.clear(), this._calculateBounds();
      for (var e = 0; e < this.children.length; e++) {
        var r = this.children[e];
        if (!(!r.visible || !r.renderable))
          if (r.calculateBounds(), r._mask) {
            var n = r._mask.isMaskData ? r._mask.maskObject : r._mask;
            n ? (n.calculateBounds(), this._bounds.addBoundsMask(r._bounds, n._bounds)) : this._bounds.addBounds(r._bounds);
          } else r.filterArea ? this._bounds.addBoundsArea(r._bounds, r.filterArea) : this._bounds.addBounds(r._bounds);
      }
      this._bounds.updateID = this._boundsID;
    }, t.prototype.getLocalBounds = function(e, r) {
      r === void 0 && (r = !1);
      var n = i.prototype.getLocalBounds.call(this, e);
      if (!r)
        for (var s = 0, a = this.children.length; s < a; ++s) {
          var o = this.children[s];
          o.visible && o.updateTransform();
        }
      return n;
    }, t.prototype._calculateBounds = function() {
    }, t.prototype._renderWithCulling = function(e) {
      var r = e.renderTexture.sourceFrame;
      if (r.width > 0 && r.height > 0) {
        var n, s;
        if (this.cullArea ? (n = this.cullArea, s = this.worldTransform) : this._render !== t.prototype._render && (n = this.getBounds(!0)), n && r.intersects(n, s))
          this._render(e);
        else if (this.cullArea)
          return;
        for (var a = 0, o = this.children.length; a < o; ++a) {
          var h = this.children[a], u = h.cullable;
          h.cullable = u || !this.cullArea, h.render(e), h.cullable = u;
        }
      }
    }, t.prototype.render = function(e) {
      if (!(!this.visible || this.worldAlpha <= 0 || !this.renderable))
        if (this._mask || this.filters && this.filters.length)
          this.renderAdvanced(e);
        else if (this.cullable)
          this._renderWithCulling(e);
        else {
          this._render(e);
          for (var r = 0, n = this.children.length; r < n; ++r)
            this.children[r].render(e);
        }
    }, t.prototype.renderAdvanced = function(e) {
      var r = this.filters, n = this._mask;
      if (r) {
        this._enabledFilters || (this._enabledFilters = []), this._enabledFilters.length = 0;
        for (var s = 0; s < r.length; s++)
          r[s].enabled && this._enabledFilters.push(r[s]);
      }
      var a = r && this._enabledFilters && this._enabledFilters.length || n && (!n.isMaskData || n.enabled && (n.autoDetect || n.type !== Pt.NONE));
      if (a && e.batch.flush(), r && this._enabledFilters && this._enabledFilters.length && e.filter.push(this, this._enabledFilters), n && e.mask.push(this, this._mask), this.cullable)
        this._renderWithCulling(e);
      else {
        this._render(e);
        for (var s = 0, o = this.children.length; s < o; ++s)
          this.children[s].render(e);
      }
      a && e.batch.flush(), n && e.mask.pop(this), r && this._enabledFilters && this._enabledFilters.length && e.filter.pop();
    }, t.prototype._render = function(e) {
    }, t.prototype.destroy = function(e) {
      i.prototype.destroy.call(this), this.sortDirty = !1;
      var r = typeof e == "boolean" ? e : e && e.children, n = this.removeChildren(0, this.children.length);
      if (r)
        for (var s = 0; s < n.length; ++s)
          n[s].destroy(e);
    }, Object.defineProperty(t.prototype, "width", {
      /** The width of the Container, setting this will actually modify the scale to achieve the value set. */
      get: function() {
        return this.scale.x * this.getLocalBounds().width;
      },
      set: function(e) {
        var r = this.getLocalBounds().width;
        r !== 0 ? this.scale.x = e / r : this.scale.x = 1, this._width = e;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "height", {
      /** The height of the Container, setting this will actually modify the scale to achieve the value set. */
      get: function() {
        return this.scale.y * this.getLocalBounds().height;
      },
      set: function(e) {
        var r = this.getLocalBounds().height;
        r !== 0 ? this.scale.y = e / r : this.scale.y = 1, this._height = e;
      },
      enumerable: !1,
      configurable: !0
    }), t;
  }(St)
);
re.prototype.containerUpdateTransform = re.prototype.updateTransform;
/*!
 * @pixi/extensions - v6.5.10
 * Compiled Thu, 06 Jul 2023 15:25:11 UTC
 *
 * @pixi/extensions is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var dr = function() {
  return dr = Object.assign || function(t) {
    for (var e = arguments, r, n = 1, s = arguments.length; n < s; n++) {
      r = e[n];
      for (var a in r)
        Object.prototype.hasOwnProperty.call(r, a) && (t[a] = r[a]);
    }
    return t;
  }, dr.apply(this, arguments);
}, dt;
(function(i) {
  i.Application = "application", i.RendererPlugin = "renderer-webgl-plugin", i.CanvasRendererPlugin = "renderer-canvas-plugin", i.Loader = "loader", i.LoadParser = "load-parser", i.ResolveParser = "resolve-parser", i.CacheParser = "cache-parser", i.DetectionParser = "detection-parser";
})(dt || (dt = {}));
var na = function(i) {
  if (typeof i == "function" || typeof i == "object" && i.extension) {
    if (!i.extension)
      throw new Error("Extension class must have an extension object");
    var t = typeof i.extension != "object" ? { type: i.extension } : i.extension;
    i = dr(dr({}, t), { ref: i });
  }
  if (typeof i == "object")
    i = dr({}, i);
  else
    throw new Error("Invalid extension type");
  return typeof i.type == "string" && (i.type = [i.type]), i;
}, se = {
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
    for (var i = arguments, t = this, e = [], r = 0; r < arguments.length; r++)
      e[r] = i[r];
    return e.map(na).forEach(function(n) {
      n.type.forEach(function(s) {
        var a, o;
        return (o = (a = t._removeHandlers)[s]) === null || o === void 0 ? void 0 : o.call(a, n);
      });
    }), this;
  },
  /**
   * Register new extensions with PixiJS.
   * @param extensions - The spread of extensions to add to PixiJS.
   * @returns {PIXI.extensions} For chaining.
   */
  add: function() {
    for (var i = arguments, t = this, e = [], r = 0; r < arguments.length; r++)
      e[r] = i[r];
    return e.map(na).forEach(function(n) {
      n.type.forEach(function(s) {
        var a = t._addHandlers, o = t._queue;
        a[s] ? a[s](n) : (o[s] = o[s] || [], o[s].push(n));
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
  handle: function(i, t, e) {
    var r = this._addHandlers = this._addHandlers || {}, n = this._removeHandlers = this._removeHandlers || {};
    if (r[i] || n[i])
      throw new Error("Extension type " + i + " already has a handler");
    r[i] = t, n[i] = e;
    var s = this._queue;
    return s[i] && (s[i].forEach(function(a) {
      return t(a);
    }), delete s[i]), this;
  },
  /**
   * Handle a type, but using a map by `name` property.
   * @param type - Type of extension to handle.
   * @param map - The object map of named extensions.
   * @returns {PIXI.extensions} For chaining.
   */
  handleByMap: function(i, t) {
    return this.handle(i, function(e) {
      t[e.name] = e.ref;
    }, function(e) {
      delete t[e.name];
    });
  },
  /**
   * Handle a type, but using a list of extensions.
   * @param type - Type of extension to handle.
   * @param list - The list of extensions.
   * @returns {PIXI.extensions} For chaining.
   */
  handleByList: function(i, t) {
    return this.handle(i, function(e) {
      var r, n;
      t.includes(e.ref) || (t.push(e.ref), i === dt.Loader && ((n = (r = e.ref).add) === null || n === void 0 || n.call(r)));
    }, function(e) {
      var r = t.indexOf(e.ref);
      r !== -1 && t.splice(r, 1);
    });
  }
};
/*!
 * @pixi/runner - v6.5.10
 * Compiled Thu, 06 Jul 2023 15:25:11 UTC
 *
 * @pixi/runner is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
var Ot = (
  /** @class */
  function() {
    function i(t) {
      this.items = [], this._name = t, this._aliasCount = 0;
    }
    return i.prototype.emit = function(t, e, r, n, s, a, o, h) {
      if (arguments.length > 8)
        throw new Error("max arguments reached");
      var u = this, l = u.name, f = u.items;
      this._aliasCount++;
      for (var c = 0, d = f.length; c < d; c++)
        f[c][l](t, e, r, n, s, a, o, h);
      return f === this.items && this._aliasCount--, this;
    }, i.prototype.ensureNonAliasedItems = function() {
      this._aliasCount > 0 && this.items.length > 1 && (this._aliasCount = 0, this.items = this.items.slice(0));
    }, i.prototype.add = function(t) {
      return t[this._name] && (this.ensureNonAliasedItems(), this.remove(t), this.items.push(t)), this;
    }, i.prototype.remove = function(t) {
      var e = this.items.indexOf(t);
      return e !== -1 && (this.ensureNonAliasedItems(), this.items.splice(e, 1)), this;
    }, i.prototype.contains = function(t) {
      return this.items.indexOf(t) !== -1;
    }, i.prototype.removeAll = function() {
      return this.ensureNonAliasedItems(), this.items.length = 0, this;
    }, i.prototype.destroy = function() {
      this.removeAll(), this.items = null, this._name = null;
    }, Object.defineProperty(i.prototype, "empty", {
      /**
       * `true` if there are no this Runner contains no listeners
       * @readonly
       */
      get: function() {
        return this.items.length === 0;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "name", {
      /**
       * The name of the runner.
       * @readonly
       */
      get: function() {
        return this._name;
      },
      enumerable: !1,
      configurable: !0
    }), i;
  }()
);
Object.defineProperties(Ot.prototype, {
  /**
   * Alias for `emit`
   * @memberof PIXI.Runner#
   * @method dispatch
   * @see PIXI.Runner#emit
   */
  dispatch: { value: Ot.prototype.emit },
  /**
   * Alias for `emit`
   * @memberof PIXI.Runner#
   * @method run
   * @see PIXI.Runner#emit
   */
  run: { value: Ot.prototype.emit }
});
/*!
 * @pixi/ticker - v6.5.10
 * Compiled Thu, 06 Jul 2023 15:25:11 UTC
 *
 * @pixi/ticker is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
z.TARGET_FPMS = 0.06;
var pe;
(function(i) {
  i[i.INTERACTION = 50] = "INTERACTION", i[i.HIGH = 25] = "HIGH", i[i.NORMAL = 0] = "NORMAL", i[i.LOW = -25] = "LOW", i[i.UTILITY = -50] = "UTILITY";
})(pe || (pe = {}));
var ki = (
  /** @class */
  function() {
    function i(t, e, r, n) {
      e === void 0 && (e = null), r === void 0 && (r = 0), n === void 0 && (n = !1), this.next = null, this.previous = null, this._destroyed = !1, this.fn = t, this.context = e, this.priority = r, this.once = n;
    }
    return i.prototype.match = function(t, e) {
      return e === void 0 && (e = null), this.fn === t && this.context === e;
    }, i.prototype.emit = function(t) {
      this.fn && (this.context ? this.fn.call(this.context, t) : this.fn(t));
      var e = this.next;
      return this.once && this.destroy(!0), this._destroyed && (this.next = null), e;
    }, i.prototype.connect = function(t) {
      this.previous = t, t.next && (t.next.previous = this), this.next = t.next, t.next = this;
    }, i.prototype.destroy = function(t) {
      t === void 0 && (t = !1), this._destroyed = !0, this.fn = null, this.context = null, this.previous && (this.previous.next = this.next), this.next && (this.next.previous = this.previous);
      var e = this.next;
      return this.next = t ? null : e, this.previous = null, e;
    }, i;
  }()
), Nt = (
  /** @class */
  function() {
    function i() {
      var t = this;
      this.autoStart = !1, this.deltaTime = 1, this.lastTime = -1, this.speed = 1, this.started = !1, this._requestId = null, this._maxElapsedMS = 100, this._minElapsedMS = 0, this._protected = !1, this._lastFrame = -1, this._head = new ki(null, null, 1 / 0), this.deltaMS = 1 / z.TARGET_FPMS, this.elapsedMS = 1 / z.TARGET_FPMS, this._tick = function(e) {
        t._requestId = null, t.started && (t.update(e), t.started && t._requestId === null && t._head.next && (t._requestId = requestAnimationFrame(t._tick)));
      };
    }
    return i.prototype._requestIfNeeded = function() {
      this._requestId === null && this._head.next && (this.lastTime = performance.now(), this._lastFrame = this.lastTime, this._requestId = requestAnimationFrame(this._tick));
    }, i.prototype._cancelIfNeeded = function() {
      this._requestId !== null && (cancelAnimationFrame(this._requestId), this._requestId = null);
    }, i.prototype._startIfPossible = function() {
      this.started ? this._requestIfNeeded() : this.autoStart && this.start();
    }, i.prototype.add = function(t, e, r) {
      return r === void 0 && (r = pe.NORMAL), this._addListener(new ki(t, e, r));
    }, i.prototype.addOnce = function(t, e, r) {
      return r === void 0 && (r = pe.NORMAL), this._addListener(new ki(t, e, r, !0));
    }, i.prototype._addListener = function(t) {
      var e = this._head.next, r = this._head;
      if (!e)
        t.connect(r);
      else {
        for (; e; ) {
          if (t.priority > e.priority) {
            t.connect(r);
            break;
          }
          r = e, e = e.next;
        }
        t.previous || t.connect(r);
      }
      return this._startIfPossible(), this;
    }, i.prototype.remove = function(t, e) {
      for (var r = this._head.next; r; )
        r.match(t, e) ? r = r.destroy() : r = r.next;
      return this._head.next || this._cancelIfNeeded(), this;
    }, Object.defineProperty(i.prototype, "count", {
      /**
       * The number of listeners on this ticker, calculated by walking through linked list
       * @readonly
       * @member {number}
       */
      get: function() {
        if (!this._head)
          return 0;
        for (var t = 0, e = this._head; e = e.next; )
          t++;
        return t;
      },
      enumerable: !1,
      configurable: !0
    }), i.prototype.start = function() {
      this.started || (this.started = !0, this._requestIfNeeded());
    }, i.prototype.stop = function() {
      this.started && (this.started = !1, this._cancelIfNeeded());
    }, i.prototype.destroy = function() {
      if (!this._protected) {
        this.stop();
        for (var t = this._head.next; t; )
          t = t.destroy(!0);
        this._head.destroy(), this._head = null;
      }
    }, i.prototype.update = function(t) {
      t === void 0 && (t = performance.now());
      var e;
      if (t > this.lastTime) {
        if (e = this.elapsedMS = t - this.lastTime, e > this._maxElapsedMS && (e = this._maxElapsedMS), e *= this.speed, this._minElapsedMS) {
          var r = t - this._lastFrame | 0;
          if (r < this._minElapsedMS)
            return;
          this._lastFrame = t - r % this._minElapsedMS;
        }
        this.deltaMS = e, this.deltaTime = this.deltaMS * z.TARGET_FPMS;
        for (var n = this._head, s = n.next; s; )
          s = s.emit(this.deltaTime);
        n.next || this._cancelIfNeeded();
      } else
        this.deltaTime = this.deltaMS = this.elapsedMS = 0;
      this.lastTime = t;
    }, Object.defineProperty(i.prototype, "FPS", {
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
    }), Object.defineProperty(i.prototype, "minFPS", {
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
      set: function(t) {
        var e = Math.min(this.maxFPS, t), r = Math.min(Math.max(0, e) / 1e3, z.TARGET_FPMS);
        this._maxElapsedMS = 1 / r;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "maxFPS", {
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
      set: function(t) {
        if (t === 0)
          this._minElapsedMS = 0;
        else {
          var e = Math.max(this.minFPS, t);
          this._minElapsedMS = 1 / (e / 1e3);
        }
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i, "shared", {
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
        if (!i._shared) {
          var t = i._shared = new i();
          t.autoStart = !0, t._protected = !0;
        }
        return i._shared;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i, "system", {
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
        if (!i._system) {
          var t = i._system = new i();
          t.autoStart = !0, t._protected = !0;
        }
        return i._system;
      },
      enumerable: !1,
      configurable: !0
    }), i;
  }()
), $f = (
  /** @class */
  function() {
    function i() {
    }
    return i.init = function(t) {
      var e = this;
      t = Object.assign({
        autoStart: !0,
        sharedTicker: !1
      }, t), Object.defineProperty(this, "ticker", {
        set: function(r) {
          this._ticker && this._ticker.remove(this.render, this), this._ticker = r, r && r.add(this.render, this, pe.LOW);
        },
        get: function() {
          return this._ticker;
        }
      }), this.stop = function() {
        e._ticker.stop();
      }, this.start = function() {
        e._ticker.start();
      }, this._ticker = null, this.ticker = t.sharedTicker ? Nt.shared : new Nt(), t.autoStart && this.start();
    }, i.destroy = function() {
      if (this._ticker) {
        var t = this._ticker;
        this.ticker = null, t.destroy();
      }
    }, i.extension = dt.Application, i;
  }()
);
/*!
 * @pixi/core - v6.5.10
 * Compiled Thu, 06 Jul 2023 15:25:11 UTC
 *
 * @pixi/core is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
z.PREFER_ENV = Kt.any ? de.WEBGL : de.WEBGL2;
z.STRICT_TEXTURE_CACHE = !1;
var mr = [];
function Ei(i, t) {
  if (!i)
    return null;
  var e = "";
  if (typeof i == "string") {
    var r = /\.(\w{3,4})(?:$|\?|#)/i.exec(i);
    r && (e = r[1].toLowerCase());
  }
  for (var n = mr.length - 1; n >= 0; --n) {
    var s = mr[n];
    if (s.test && s.test(i, e))
      return new s(i, t);
  }
  throw new Error("Unrecognized source type to auto-detect Resource");
}
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var mn = function(i, t) {
  return mn = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, r) {
    e.__proto__ = r;
  } || function(e, r) {
    for (var n in r)
      r.hasOwnProperty(n) && (e[n] = r[n]);
  }, mn(i, t);
};
function _t(i, t) {
  mn(i, t);
  function e() {
    this.constructor = i;
  }
  i.prototype = t === null ? Object.create(t) : (e.prototype = t.prototype, new e());
}
var gn = function() {
  return gn = Object.assign || function(t) {
    for (var e = arguments, r, n = 1, s = arguments.length; n < s; n++) {
      r = e[n];
      for (var a in r)
        Object.prototype.hasOwnProperty.call(r, a) && (t[a] = r[a]);
    }
    return t;
  }, gn.apply(this, arguments);
};
function Zf(i, t) {
  var e = {};
  for (var r in i)
    Object.prototype.hasOwnProperty.call(i, r) && t.indexOf(r) < 0 && (e[r] = i[r]);
  if (i != null && typeof Object.getOwnPropertySymbols == "function")
    for (var n = 0, r = Object.getOwnPropertySymbols(i); n < r.length; n++)
      t.indexOf(r[n]) < 0 && Object.prototype.propertyIsEnumerable.call(i, r[n]) && (e[r[n]] = i[r[n]]);
  return e;
}
var Fe = (
  /** @class */
  function() {
    function i(t, e) {
      t === void 0 && (t = 0), e === void 0 && (e = 0), this._width = t, this._height = e, this.destroyed = !1, this.internal = !1, this.onResize = new Ot("setRealSize"), this.onUpdate = new Ot("update"), this.onError = new Ot("onError");
    }
    return i.prototype.bind = function(t) {
      this.onResize.add(t), this.onUpdate.add(t), this.onError.add(t), (this._width || this._height) && this.onResize.emit(this._width, this._height);
    }, i.prototype.unbind = function(t) {
      this.onResize.remove(t), this.onUpdate.remove(t), this.onError.remove(t);
    }, i.prototype.resize = function(t, e) {
      (t !== this._width || e !== this._height) && (this._width = t, this._height = e, this.onResize.emit(t, e));
    }, Object.defineProperty(i.prototype, "valid", {
      /**
       * Has been validated
       * @readonly
       */
      get: function() {
        return !!this._width && !!this._height;
      },
      enumerable: !1,
      configurable: !0
    }), i.prototype.update = function() {
      this.destroyed || this.onUpdate.emit();
    }, i.prototype.load = function() {
      return Promise.resolve(this);
    }, Object.defineProperty(i.prototype, "width", {
      /**
       * The width of the resource.
       * @readonly
       */
      get: function() {
        return this._width;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "height", {
      /**
       * The height of the resource.
       * @readonly
       */
      get: function() {
        return this._height;
      },
      enumerable: !1,
      configurable: !0
    }), i.prototype.style = function(t, e, r) {
      return !1;
    }, i.prototype.dispose = function() {
    }, i.prototype.destroy = function() {
      this.destroyed || (this.destroyed = !0, this.dispose(), this.onError.removeAll(), this.onError = null, this.onResize.removeAll(), this.onResize = null, this.onUpdate.removeAll(), this.onUpdate = null);
    }, i.test = function(t, e) {
      return !1;
    }, i;
  }()
), ke = (
  /** @class */
  function(i) {
    _t(t, i);
    function t(e, r) {
      var n = this, s = r || {}, a = s.width, o = s.height;
      if (!a || !o)
        throw new Error("BufferResource width or height invalid");
      return n = i.call(this, a, o) || this, n.data = e, n;
    }
    return t.prototype.upload = function(e, r, n) {
      var s = e.gl;
      s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL, r.alphaMode === qt.UNPACK);
      var a = r.realWidth, o = r.realHeight;
      return n.width === a && n.height === o ? s.texSubImage2D(r.target, 0, 0, 0, a, o, r.format, n.type, this.data) : (n.width = a, n.height = o, s.texImage2D(r.target, 0, n.internalFormat, a, o, 0, r.format, n.type, this.data)), !0;
    }, t.prototype.dispose = function() {
      this.data = null;
    }, t.test = function(e) {
      return e instanceof Float32Array || e instanceof Uint8Array || e instanceof Uint32Array;
    }, t;
  }(Fe)
), qf = {
  scaleMode: Jt.NEAREST,
  format: F.RGBA,
  alphaMode: qt.NPM
}, ot = (
  /** @class */
  function(i) {
    _t(t, i);
    function t(e, r) {
      e === void 0 && (e = null), r === void 0 && (r = null);
      var n = i.call(this) || this;
      r = r || {};
      var s = r.alphaMode, a = r.mipmap, o = r.anisotropicLevel, h = r.scaleMode, u = r.width, l = r.height, f = r.wrapMode, c = r.format, d = r.type, p = r.target, v = r.resolution, _ = r.resourceOptions;
      return e && !(e instanceof Fe) && (e = Ei(e, _), e.internal = !0), n.resolution = v || z.RESOLUTION, n.width = Math.round((u || 0) * n.resolution) / n.resolution, n.height = Math.round((l || 0) * n.resolution) / n.resolution, n._mipmap = a !== void 0 ? a : z.MIPMAP_TEXTURES, n.anisotropicLevel = o !== void 0 ? o : z.ANISOTROPIC_LEVEL, n._wrapMode = f || z.WRAP_MODE, n._scaleMode = h !== void 0 ? h : z.SCALE_MODE, n.format = c || F.RGBA, n.type = d || J.UNSIGNED_BYTE, n.target = p || De.TEXTURE_2D, n.alphaMode = s !== void 0 ? s : qt.UNPACK, n.uid = Be(), n.touched = 0, n.isPowerOfTwo = !1, n._refreshPOT(), n._glTextures = {}, n.dirtyId = 0, n.dirtyStyleId = 0, n.cacheId = null, n.valid = u > 0 && l > 0, n.textureCacheIds = [], n.destroyed = !1, n.resource = null, n._batchEnabled = 0, n._batchLocation = 0, n.parentTextureArray = null, n.setResource(e), n;
    }
    return Object.defineProperty(t.prototype, "realWidth", {
      /**
       * Pixel width of the source of this texture
       * @readonly
       */
      get: function() {
        return Math.round(this.width * this.resolution);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "realHeight", {
      /**
       * Pixel height of the source of this texture
       * @readonly
       */
      get: function() {
        return Math.round(this.height * this.resolution);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "mipmap", {
      /**
       * Mipmap mode of the texture, affects downscaled images
       * @default PIXI.settings.MIPMAP_TEXTURES
       */
      get: function() {
        return this._mipmap;
      },
      set: function(e) {
        this._mipmap !== e && (this._mipmap = e, this.dirtyStyleId++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "scaleMode", {
      /**
       * The scale mode to apply when scaling this texture
       * @default PIXI.settings.SCALE_MODE
       */
      get: function() {
        return this._scaleMode;
      },
      set: function(e) {
        this._scaleMode !== e && (this._scaleMode = e, this.dirtyStyleId++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "wrapMode", {
      /**
       * How the texture wraps
       * @default PIXI.settings.WRAP_MODE
       */
      get: function() {
        return this._wrapMode;
      },
      set: function(e) {
        this._wrapMode !== e && (this._wrapMode = e, this.dirtyStyleId++);
      },
      enumerable: !1,
      configurable: !0
    }), t.prototype.setStyle = function(e, r) {
      var n;
      return e !== void 0 && e !== this.scaleMode && (this.scaleMode = e, n = !0), r !== void 0 && r !== this.mipmap && (this.mipmap = r, n = !0), n && this.dirtyStyleId++, this;
    }, t.prototype.setSize = function(e, r, n) {
      return n = n || this.resolution, this.setRealSize(e * n, r * n, n);
    }, t.prototype.setRealSize = function(e, r, n) {
      return this.resolution = n || this.resolution, this.width = Math.round(e) / this.resolution, this.height = Math.round(r) / this.resolution, this._refreshPOT(), this.update(), this;
    }, t.prototype._refreshPOT = function() {
      this.isPowerOfTwo = Qs(this.realWidth) && Qs(this.realHeight);
    }, t.prototype.setResolution = function(e) {
      var r = this.resolution;
      return r === e ? this : (this.resolution = e, this.valid && (this.width = Math.round(this.width * r) / e, this.height = Math.round(this.height * r) / e, this.emit("update", this)), this._refreshPOT(), this);
    }, t.prototype.setResource = function(e) {
      if (this.resource === e)
        return this;
      if (this.resource)
        throw new Error("Resource can be set only once");
      return e.bind(this), this.resource = e, this;
    }, t.prototype.update = function() {
      this.valid ? (this.dirtyId++, this.dirtyStyleId++, this.emit("update", this)) : this.width > 0 && this.height > 0 && (this.valid = !0, this.emit("loaded", this), this.emit("update", this));
    }, t.prototype.onError = function(e) {
      this.emit("error", this, e);
    }, t.prototype.destroy = function() {
      this.resource && (this.resource.unbind(this), this.resource.internal && this.resource.destroy(), this.resource = null), this.cacheId && (delete ue[this.cacheId], delete Yt[this.cacheId], this.cacheId = null), this.dispose(), t.removeFromCache(this), this.textureCacheIds = null, this.destroyed = !0;
    }, t.prototype.dispose = function() {
      this.emit("dispose", this);
    }, t.prototype.castToBaseTexture = function() {
      return this;
    }, t.from = function(e, r, n) {
      n === void 0 && (n = z.STRICT_TEXTURE_CACHE);
      var s = typeof e == "string", a = null;
      if (s)
        a = e;
      else {
        if (!e._pixiId) {
          var o = r && r.pixiIdPrefix || "pixiid";
          e._pixiId = o + "_" + Be();
        }
        a = e._pixiId;
      }
      var h = ue[a];
      if (s && n && !h)
        throw new Error('The cacheId "' + a + '" does not exist in BaseTextureCache.');
      return h || (h = new t(e, r), h.cacheId = a, t.addToCache(h, a)), h;
    }, t.fromBuffer = function(e, r, n, s) {
      e = e || new Float32Array(r * n * 4);
      var a = new ke(e, { width: r, height: n }), o = e instanceof Float32Array ? J.FLOAT : J.UNSIGNED_BYTE;
      return new t(a, Object.assign({}, qf, s || { width: r, height: n, type: o }));
    }, t.addToCache = function(e, r) {
      r && (e.textureCacheIds.indexOf(r) === -1 && e.textureCacheIds.push(r), ue[r] && console.warn("BaseTexture added to the cache with an id [" + r + "] that already had an entry"), ue[r] = e);
    }, t.removeFromCache = function(e) {
      if (typeof e == "string") {
        var r = ue[e];
        if (r) {
          var n = r.textureCacheIds.indexOf(e);
          return n > -1 && r.textureCacheIds.splice(n, 1), delete ue[e], r;
        }
      } else if (e && e.textureCacheIds) {
        for (var s = 0; s < e.textureCacheIds.length; ++s)
          delete ue[e.textureCacheIds[s]];
        return e.textureCacheIds.length = 0, e;
      }
      return null;
    }, t._globalBatch = 0, t;
  }(qe)
), wi = (
  /** @class */
  function(i) {
    _t(t, i);
    function t(e, r) {
      var n = this, s = r || {}, a = s.width, o = s.height;
      n = i.call(this, a, o) || this, n.items = [], n.itemDirtyIds = [];
      for (var h = 0; h < e; h++) {
        var u = new ot();
        n.items.push(u), n.itemDirtyIds.push(-2);
      }
      return n.length = e, n._load = null, n.baseTexture = null, n;
    }
    return t.prototype.initFromArray = function(e, r) {
      for (var n = 0; n < this.length; n++)
        e[n] && (e[n].castToBaseTexture ? this.addBaseTextureAt(e[n].castToBaseTexture(), n) : e[n] instanceof Fe ? this.addResourceAt(e[n], n) : this.addResourceAt(Ei(e[n], r), n));
    }, t.prototype.dispose = function() {
      for (var e = 0, r = this.length; e < r; e++)
        this.items[e].destroy();
      this.items = null, this.itemDirtyIds = null, this._load = null;
    }, t.prototype.addResourceAt = function(e, r) {
      if (!this.items[r])
        throw new Error("Index " + r + " is out of bounds");
      return e.valid && !this.valid && this.resize(e.width, e.height), this.items[r].setResource(e), this;
    }, t.prototype.bind = function(e) {
      if (this.baseTexture !== null)
        throw new Error("Only one base texture per TextureArray is allowed");
      i.prototype.bind.call(this, e);
      for (var r = 0; r < this.length; r++)
        this.items[r].parentTextureArray = e, this.items[r].on("update", e.update, e);
    }, t.prototype.unbind = function(e) {
      i.prototype.unbind.call(this, e);
      for (var r = 0; r < this.length; r++)
        this.items[r].parentTextureArray = null, this.items[r].off("update", e.update, e);
    }, t.prototype.load = function() {
      var e = this;
      if (this._load)
        return this._load;
      var r = this.items.map(function(s) {
        return s.resource;
      }).filter(function(s) {
        return s;
      }), n = r.map(function(s) {
        return s.load();
      });
      return this._load = Promise.all(n).then(function() {
        var s = e.items[0], a = s.realWidth, o = s.realHeight;
        return e.resize(a, o), Promise.resolve(e);
      }), this._load;
    }, t;
  }(Fe)
), Kn = (
  /** @class */
  function(i) {
    _t(t, i);
    function t(e, r) {
      var n = this, s = r || {}, a = s.width, o = s.height, h, u;
      return Array.isArray(e) ? (h = e, u = e.length) : u = e, n = i.call(this, u, { width: a, height: o }) || this, h && n.initFromArray(h, r), n;
    }
    return t.prototype.addBaseTextureAt = function(e, r) {
      if (e.resource)
        this.addResourceAt(e.resource, r);
      else
        throw new Error("ArrayResource does not support RenderTexture");
      return this;
    }, t.prototype.bind = function(e) {
      i.prototype.bind.call(this, e), e.target = De.TEXTURE_2D_ARRAY;
    }, t.prototype.upload = function(e, r, n) {
      var s = this, a = s.length, o = s.itemDirtyIds, h = s.items, u = e.gl;
      n.dirtyId < 0 && u.texImage3D(u.TEXTURE_2D_ARRAY, 0, n.internalFormat, this._width, this._height, a, 0, r.format, n.type, null);
      for (var l = 0; l < a; l++) {
        var f = h[l];
        o[l] < f.dirtyId && (o[l] = f.dirtyId, f.valid && u.texSubImage3D(
          u.TEXTURE_2D_ARRAY,
          0,
          0,
          // xoffset
          0,
          // yoffset
          l,
          // zoffset
          f.resource.width,
          f.resource.height,
          1,
          r.format,
          n.type,
          f.resource.source
        ));
      }
      return !0;
    }, t;
  }(wi)
), ie = (
  /** @class */
  function(i) {
    _t(t, i);
    function t(e) {
      var r = this, n = e, s = n.naturalWidth || n.videoWidth || n.width, a = n.naturalHeight || n.videoHeight || n.height;
      return r = i.call(this, s, a) || this, r.source = e, r.noSubImage = !1, r;
    }
    return t.crossOrigin = function(e, r, n) {
      n === void 0 && r.indexOf("data:") !== 0 ? e.crossOrigin = Gf(r) : n !== !1 && (e.crossOrigin = typeof n == "string" ? n : "anonymous");
    }, t.prototype.upload = function(e, r, n, s) {
      var a = e.gl, o = r.realWidth, h = r.realHeight;
      if (s = s || this.source, s instanceof HTMLImageElement) {
        if (!s.complete || s.naturalWidth === 0)
          return !1;
      } else if (s instanceof HTMLVideoElement && s.readyState <= 1)
        return !1;
      return a.pixelStorei(a.UNPACK_PREMULTIPLY_ALPHA_WEBGL, r.alphaMode === qt.UNPACK), !this.noSubImage && r.target === a.TEXTURE_2D && n.width === o && n.height === h ? a.texSubImage2D(a.TEXTURE_2D, 0, 0, 0, r.format, n.type, s) : (n.width = o, n.height = h, a.texImage2D(r.target, 0, n.internalFormat, r.format, n.type, s)), !0;
    }, t.prototype.update = function() {
      if (!this.destroyed) {
        var e = this.source, r = e.naturalWidth || e.videoWidth || e.width, n = e.naturalHeight || e.videoHeight || e.height;
        this.resize(r, n), i.prototype.update.call(this);
      }
    }, t.prototype.dispose = function() {
      this.source = null;
    }, t;
  }(Fe)
), Qn = (
  /** @class */
  function(i) {
    _t(t, i);
    function t(e) {
      return i.call(this, e) || this;
    }
    return t.test = function(e) {
      var r = globalThis.OffscreenCanvas;
      return r && e instanceof r ? !0 : globalThis.HTMLCanvasElement && e instanceof HTMLCanvasElement;
    }, t;
  }(ie)
), ts = (
  /** @class */
  function(i) {
    _t(t, i);
    function t(e, r) {
      var n = this, s = r || {}, a = s.width, o = s.height, h = s.autoLoad, u = s.linkBaseTexture;
      if (e && e.length !== t.SIDES)
        throw new Error("Invalid length. Got " + e.length + ", expected 6");
      n = i.call(this, 6, { width: a, height: o }) || this;
      for (var l = 0; l < t.SIDES; l++)
        n.items[l].target = De.TEXTURE_CUBE_MAP_POSITIVE_X + l;
      return n.linkBaseTexture = u !== !1, e && n.initFromArray(e, r), h !== !1 && n.load(), n;
    }
    return t.prototype.bind = function(e) {
      i.prototype.bind.call(this, e), e.target = De.TEXTURE_CUBE_MAP;
    }, t.prototype.addBaseTextureAt = function(e, r, n) {
      if (!this.items[r])
        throw new Error("Index " + r + " is out of bounds");
      if (!this.linkBaseTexture || e.parentTextureArray || Object.keys(e._glTextures).length > 0)
        if (e.resource)
          this.addResourceAt(e.resource, r);
        else
          throw new Error("CubeResource does not support copying of renderTexture.");
      else
        e.target = De.TEXTURE_CUBE_MAP_POSITIVE_X + r, e.parentTextureArray = this.baseTexture, this.items[r] = e;
      return e.valid && !this.valid && this.resize(e.realWidth, e.realHeight), this.items[r] = e, this;
    }, t.prototype.upload = function(e, r, n) {
      for (var s = this.itemDirtyIds, a = 0; a < t.SIDES; a++) {
        var o = this.items[a];
        (s[a] < o.dirtyId || n.dirtyId < r.dirtyId) && (o.valid && o.resource ? (o.resource.upload(e, o, n), s[a] = o.dirtyId) : s[a] < -1 && (e.gl.texImage2D(o.target, 0, n.internalFormat, r.realWidth, r.realHeight, 0, r.format, n.type, null), s[a] = -1));
      }
      return !0;
    }, t.test = function(e) {
      return Array.isArray(e) && e.length === t.SIDES;
    }, t.SIDES = 6, t;
  }(wi)
), Si = (
  /** @class */
  function(i) {
    _t(t, i);
    function t(e, r) {
      var n = this;
      if (r = r || {}, !(e instanceof HTMLImageElement)) {
        var s = new Image();
        ie.crossOrigin(s, e, r.crossorigin), s.src = e, e = s;
      }
      return n = i.call(this, e) || this, !e.complete && n._width && n._height && (n._width = 0, n._height = 0), n.url = e.src, n._process = null, n.preserveBitmap = !1, n.createBitmap = (r.createBitmap !== void 0 ? r.createBitmap : z.CREATE_IMAGE_BITMAP) && !!globalThis.createImageBitmap, n.alphaMode = typeof r.alphaMode == "number" ? r.alphaMode : null, n.bitmap = null, n._load = null, r.autoLoad !== !1 && n.load(), n;
    }
    return t.prototype.load = function(e) {
      var r = this;
      return this._load ? this._load : (e !== void 0 && (this.createBitmap = e), this._load = new Promise(function(n, s) {
        var a = r.source;
        r.url = a.src;
        var o = function() {
          r.destroyed || (a.onload = null, a.onerror = null, r.resize(a.width, a.height), r._load = null, r.createBitmap ? n(r.process()) : n(r));
        };
        a.complete && a.src ? o() : (a.onload = o, a.onerror = function(h) {
          s(h), r.onError.emit(h);
        });
      }), this._load);
    }, t.prototype.process = function() {
      var e = this, r = this.source;
      if (this._process !== null)
        return this._process;
      if (this.bitmap !== null || !globalThis.createImageBitmap)
        return Promise.resolve(this);
      var n = globalThis.createImageBitmap, s = !r.crossOrigin || r.crossOrigin === "anonymous";
      return this._process = fetch(r.src, {
        mode: s ? "cors" : "no-cors"
      }).then(function(a) {
        return a.blob();
      }).then(function(a) {
        return n(a, 0, 0, r.width, r.height, {
          premultiplyAlpha: e.alphaMode === null || e.alphaMode === qt.UNPACK ? "premultiply" : "none"
        });
      }).then(function(a) {
        return e.destroyed ? Promise.reject() : (e.bitmap = a, e.update(), e._process = null, Promise.resolve(e));
      }), this._process;
    }, t.prototype.upload = function(e, r, n) {
      if (typeof this.alphaMode == "number" && (r.alphaMode = this.alphaMode), !this.createBitmap)
        return i.prototype.upload.call(this, e, r, n);
      if (!this.bitmap && (this.process(), !this.bitmap))
        return !1;
      if (i.prototype.upload.call(this, e, r, n, this.bitmap), !this.preserveBitmap) {
        var s = !0, a = r._glTextures;
        for (var o in a) {
          var h = a[o];
          if (h !== n && h.dirtyId !== r.dirtyId) {
            s = !1;
            break;
          }
        }
        s && (this.bitmap.close && this.bitmap.close(), this.bitmap = null);
      }
      return !0;
    }, t.prototype.dispose = function() {
      this.source.onload = null, this.source.onerror = null, i.prototype.dispose.call(this), this.bitmap && (this.bitmap.close(), this.bitmap = null), this._process = null, this._load = null;
    }, t.test = function(e) {
      return typeof e == "string" || e instanceof HTMLImageElement;
    }, t;
  }(ie)
), es = (
  /** @class */
  function(i) {
    _t(t, i);
    function t(e, r) {
      var n = this;
      return r = r || {}, n = i.call(this, z.ADAPTER.createCanvas()) || this, n._width = 0, n._height = 0, n.svg = e, n.scale = r.scale || 1, n._overrideWidth = r.width, n._overrideHeight = r.height, n._resolve = null, n._crossorigin = r.crossorigin, n._load = null, r.autoLoad !== !1 && n.load(), n;
    }
    return t.prototype.load = function() {
      var e = this;
      return this._load ? this._load : (this._load = new Promise(function(r) {
        if (e._resolve = function() {
          e.resize(e.source.width, e.source.height), r(e);
        }, t.SVG_XML.test(e.svg.trim())) {
          if (!btoa)
            throw new Error("Your browser doesn't support base64 conversions.");
          e.svg = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(e.svg)));
        }
        e._loadSvg();
      }), this._load);
    }, t.prototype._loadSvg = function() {
      var e = this, r = new Image();
      ie.crossOrigin(r, this.svg, this._crossorigin), r.src = this.svg, r.onerror = function(n) {
        e._resolve && (r.onerror = null, e.onError.emit(n));
      }, r.onload = function() {
        if (e._resolve) {
          var n = r.width, s = r.height;
          if (!n || !s)
            throw new Error("The SVG image must have width and height defined (in pixels), canvas API needs them.");
          var a = n * e.scale, o = s * e.scale;
          (e._overrideWidth || e._overrideHeight) && (a = e._overrideWidth || e._overrideHeight / s * n, o = e._overrideHeight || e._overrideWidth / n * s), a = Math.round(a), o = Math.round(o);
          var h = e.source;
          h.width = a, h.height = o, h._pixiId = "canvas_" + Be(), h.getContext("2d").drawImage(r, 0, 0, n, s, 0, 0, a, o), e._resolve(), e._resolve = null;
        }
      };
    }, t.getSize = function(e) {
      var r = t.SVG_SIZE.exec(e), n = {};
      return r && (n[r[1]] = Math.round(parseFloat(r[3])), n[r[5]] = Math.round(parseFloat(r[7]))), n;
    }, t.prototype.dispose = function() {
      i.prototype.dispose.call(this), this._resolve = null, this._crossorigin = null;
    }, t.test = function(e, r) {
      return r === "svg" || typeof e == "string" && e.startsWith("data:image/svg+xml") || typeof e == "string" && t.SVG_XML.test(e);
    }, t.SVG_XML = /^(<\?xml[^?]+\?>)?\s*(<!--[^(-->)]*-->)?\s*\<svg/m, t.SVG_SIZE = /<svg[^>]*(?:\s(width|height)=('|")(\d*(?:\.\d+)?)(?:px)?('|"))[^>]*(?:\s(width|height)=('|")(\d*(?:\.\d+)?)(?:px)?('|"))[^>]*>/i, t;
  }(ie)
), rs = (
  /** @class */
  function(i) {
    _t(t, i);
    function t(e, r) {
      var n = this;
      if (r = r || {}, !(e instanceof HTMLVideoElement)) {
        var s = document.createElement("video");
        s.setAttribute("preload", "auto"), s.setAttribute("webkit-playsinline", ""), s.setAttribute("playsinline", ""), typeof e == "string" && (e = [e]);
        var a = e[0].src || e[0];
        ie.crossOrigin(s, a, r.crossorigin);
        for (var o = 0; o < e.length; ++o) {
          var h = document.createElement("source"), u = e[o], l = u.src, f = u.mime;
          l = l || e[o];
          var c = l.split("?").shift().toLowerCase(), d = c.slice(c.lastIndexOf(".") + 1);
          f = f || t.MIME_TYPES[d] || "video/" + d, h.src = l, h.type = f, s.appendChild(h);
        }
        e = s;
      }
      return n = i.call(this, e) || this, n.noSubImage = !0, n._autoUpdate = !0, n._isConnectedToTicker = !1, n._updateFPS = r.updateFPS || 0, n._msToNextUpdate = 0, n.autoPlay = r.autoPlay !== !1, n._load = null, n._resolve = null, n._onCanPlay = n._onCanPlay.bind(n), n._onError = n._onError.bind(n), r.autoLoad !== !1 && n.load(), n;
    }
    return t.prototype.update = function(e) {
      if (!this.destroyed) {
        var r = Nt.shared.elapsedMS * this.source.playbackRate;
        this._msToNextUpdate = Math.floor(this._msToNextUpdate - r), (!this._updateFPS || this._msToNextUpdate <= 0) && (i.prototype.update.call(this), this._msToNextUpdate = this._updateFPS ? Math.floor(1e3 / this._updateFPS) : 0);
      }
    }, t.prototype.load = function() {
      var e = this;
      if (this._load)
        return this._load;
      var r = this.source;
      return (r.readyState === r.HAVE_ENOUGH_DATA || r.readyState === r.HAVE_FUTURE_DATA) && r.width && r.height && (r.complete = !0), r.addEventListener("play", this._onPlayStart.bind(this)), r.addEventListener("pause", this._onPlayStop.bind(this)), this._isSourceReady() ? this._onCanPlay() : (r.addEventListener("canplay", this._onCanPlay), r.addEventListener("canplaythrough", this._onCanPlay), r.addEventListener("error", this._onError, !0)), this._load = new Promise(function(n) {
        e.valid ? n(e) : (e._resolve = n, r.load());
      }), this._load;
    }, t.prototype._onError = function(e) {
      this.source.removeEventListener("error", this._onError, !0), this.onError.emit(e);
    }, t.prototype._isSourcePlaying = function() {
      var e = this.source;
      return !e.paused && !e.ended && this._isSourceReady();
    }, t.prototype._isSourceReady = function() {
      var e = this.source;
      return e.readyState > 2;
    }, t.prototype._onPlayStart = function() {
      this.valid || this._onCanPlay(), this.autoUpdate && !this._isConnectedToTicker && (Nt.shared.add(this.update, this), this._isConnectedToTicker = !0);
    }, t.prototype._onPlayStop = function() {
      this._isConnectedToTicker && (Nt.shared.remove(this.update, this), this._isConnectedToTicker = !1);
    }, t.prototype._onCanPlay = function() {
      var e = this.source;
      e.removeEventListener("canplay", this._onCanPlay), e.removeEventListener("canplaythrough", this._onCanPlay);
      var r = this.valid;
      this.resize(e.videoWidth, e.videoHeight), !r && this._resolve && (this._resolve(this), this._resolve = null), this._isSourcePlaying() ? this._onPlayStart() : this.autoPlay && e.play();
    }, t.prototype.dispose = function() {
      this._isConnectedToTicker && (Nt.shared.remove(this.update, this), this._isConnectedToTicker = !1);
      var e = this.source;
      e && (e.removeEventListener("error", this._onError, !0), e.pause(), e.src = "", e.load()), i.prototype.dispose.call(this);
    }, Object.defineProperty(t.prototype, "autoUpdate", {
      /** Should the base texture automatically update itself, set to true by default. */
      get: function() {
        return this._autoUpdate;
      },
      set: function(e) {
        e !== this._autoUpdate && (this._autoUpdate = e, !this._autoUpdate && this._isConnectedToTicker ? (Nt.shared.remove(this.update, this), this._isConnectedToTicker = !1) : this._autoUpdate && !this._isConnectedToTicker && this._isSourcePlaying() && (Nt.shared.add(this.update, this), this._isConnectedToTicker = !0));
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "updateFPS", {
      /**
       * How many times a second to update the texture from the video. Leave at 0 to update at every render.
       * A lower fps can help performance, as updating the texture at 60fps on a 30ps video may not be efficient.
       */
      get: function() {
        return this._updateFPS;
      },
      set: function(e) {
        e !== this._updateFPS && (this._updateFPS = e);
      },
      enumerable: !1,
      configurable: !0
    }), t.test = function(e, r) {
      return globalThis.HTMLVideoElement && e instanceof HTMLVideoElement || t.TYPES.indexOf(r) > -1;
    }, t.TYPES = ["mp4", "m4v", "webm", "ogg", "ogv", "h264", "avi", "mov"], t.MIME_TYPES = {
      ogv: "video/ogg",
      mov: "video/quicktime",
      m4v: "video/mp4"
    }, t;
  }(ie)
), is = (
  /** @class */
  function(i) {
    _t(t, i);
    function t(e) {
      return i.call(this, e) || this;
    }
    return t.test = function(e) {
      return !!globalThis.createImageBitmap && typeof ImageBitmap < "u" && e instanceof ImageBitmap;
    }, t;
  }(ie)
);
mr.push(Si, is, Qn, rs, es, ke, ts, Kn);
var ho = {
  __proto__: null,
  Resource: Fe,
  BaseImageResource: ie,
  INSTALLED: mr,
  autoDetectResource: Ei,
  AbstractMultiResource: wi,
  ArrayResource: Kn,
  BufferResource: ke,
  CanvasResource: Qn,
  CubeResource: ts,
  ImageResource: Si,
  SVGResource: es,
  VideoResource: rs,
  ImageBitmapResource: is
}, Jf = (
  /** @class */
  function(i) {
    _t(t, i);
    function t() {
      return i !== null && i.apply(this, arguments) || this;
    }
    return t.prototype.upload = function(e, r, n) {
      var s = e.gl;
      s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL, r.alphaMode === qt.UNPACK);
      var a = r.realWidth, o = r.realHeight;
      return n.width === a && n.height === o ? s.texSubImage2D(r.target, 0, 0, 0, a, o, r.format, n.type, this.data) : (n.width = a, n.height = o, s.texImage2D(r.target, 0, n.internalFormat, a, o, 0, r.format, n.type, this.data)), !0;
    }, t;
  }(ke)
), di = (
  /** @class */
  function() {
    function i(t, e) {
      this.width = Math.round(t || 100), this.height = Math.round(e || 100), this.stencil = !1, this.depth = !1, this.dirtyId = 0, this.dirtyFormat = 0, this.dirtySize = 0, this.depthTexture = null, this.colorTextures = [], this.glFramebuffers = {}, this.disposeRunner = new Ot("disposeFramebuffer"), this.multisample = bt.NONE;
    }
    return Object.defineProperty(i.prototype, "colorTexture", {
      /**
       * Reference to the colorTexture.
       * @readonly
       */
      get: function() {
        return this.colorTextures[0];
      },
      enumerable: !1,
      configurable: !0
    }), i.prototype.addColorTexture = function(t, e) {
      return t === void 0 && (t = 0), this.colorTextures[t] = e || new ot(null, {
        scaleMode: Jt.NEAREST,
        resolution: 1,
        mipmap: Zt.OFF,
        width: this.width,
        height: this.height
      }), this.dirtyId++, this.dirtyFormat++, this;
    }, i.prototype.addDepthTexture = function(t) {
      return this.depthTexture = t || new ot(new Jf(null, { width: this.width, height: this.height }), {
        scaleMode: Jt.NEAREST,
        resolution: 1,
        width: this.width,
        height: this.height,
        mipmap: Zt.OFF,
        format: F.DEPTH_COMPONENT,
        type: J.UNSIGNED_SHORT
      }), this.dirtyId++, this.dirtyFormat++, this;
    }, i.prototype.enableDepth = function() {
      return this.depth = !0, this.dirtyId++, this.dirtyFormat++, this;
    }, i.prototype.enableStencil = function() {
      return this.stencil = !0, this.dirtyId++, this.dirtyFormat++, this;
    }, i.prototype.resize = function(t, e) {
      if (t = Math.round(t), e = Math.round(e), !(t === this.width && e === this.height)) {
        this.width = t, this.height = e, this.dirtyId++, this.dirtySize++;
        for (var r = 0; r < this.colorTextures.length; r++) {
          var n = this.colorTextures[r], s = n.resolution;
          n.setSize(t / s, e / s);
        }
        if (this.depthTexture) {
          var s = this.depthTexture.resolution;
          this.depthTexture.setSize(t / s, e / s);
        }
      }
    }, i.prototype.dispose = function() {
      this.disposeRunner.emit(this, !1);
    }, i.prototype.destroyDepthTexture = function() {
      this.depthTexture && (this.depthTexture.destroy(), this.depthTexture = null, ++this.dirtyId, ++this.dirtyFormat);
    }, i;
  }()
), ns = (
  /** @class */
  function(i) {
    _t(t, i);
    function t(e) {
      e === void 0 && (e = {});
      var r = this;
      if (typeof e == "number") {
        var n = arguments[0], s = arguments[1], a = arguments[2], o = arguments[3];
        e = { width: n, height: s, scaleMode: a, resolution: o };
      }
      return e.width = e.width || 100, e.height = e.height || 100, e.multisample = e.multisample !== void 0 ? e.multisample : bt.NONE, r = i.call(this, null, e) || this, r.mipmap = Zt.OFF, r.valid = !0, r.clearColor = [0, 0, 0, 0], r.framebuffer = new di(r.realWidth, r.realHeight).addColorTexture(0, r), r.framebuffer.multisample = e.multisample, r.maskStack = [], r.filterStack = [{}], r;
    }
    return t.prototype.resize = function(e, r) {
      this.framebuffer.resize(e * this.resolution, r * this.resolution), this.setRealSize(this.framebuffer.width, this.framebuffer.height);
    }, t.prototype.dispose = function() {
      this.framebuffer.dispose(), i.prototype.dispose.call(this);
    }, t.prototype.destroy = function() {
      i.prototype.destroy.call(this), this.framebuffer.destroyDepthTexture(), this.framebuffer = null;
    }, t;
  }(ot)
), ss = (
  /** @class */
  function() {
    function i() {
      this.x0 = 0, this.y0 = 0, this.x1 = 1, this.y1 = 0, this.x2 = 1, this.y2 = 1, this.x3 = 0, this.y3 = 1, this.uvsFloat32 = new Float32Array(8);
    }
    return i.prototype.set = function(t, e, r) {
      var n = e.width, s = e.height;
      if (r) {
        var a = t.width / 2 / n, o = t.height / 2 / s, h = t.x / n + a, u = t.y / s + o;
        r = xt.add(r, xt.NW), this.x0 = h + a * xt.uX(r), this.y0 = u + o * xt.uY(r), r = xt.add(r, 2), this.x1 = h + a * xt.uX(r), this.y1 = u + o * xt.uY(r), r = xt.add(r, 2), this.x2 = h + a * xt.uX(r), this.y2 = u + o * xt.uY(r), r = xt.add(r, 2), this.x3 = h + a * xt.uX(r), this.y3 = u + o * xt.uY(r);
      } else
        this.x0 = t.x / n, this.y0 = t.y / s, this.x1 = (t.x + t.width) / n, this.y1 = t.y / s, this.x2 = (t.x + t.width) / n, this.y2 = (t.y + t.height) / s, this.x3 = t.x / n, this.y3 = (t.y + t.height) / s;
      this.uvsFloat32[0] = this.x0, this.uvsFloat32[1] = this.y0, this.uvsFloat32[2] = this.x1, this.uvsFloat32[3] = this.y1, this.uvsFloat32[4] = this.x2, this.uvsFloat32[5] = this.y2, this.uvsFloat32[6] = this.x3, this.uvsFloat32[7] = this.y3;
    }, i.prototype.toString = function() {
      return "[@pixi/core:TextureUvs " + ("x0=" + this.x0 + " y0=" + this.y0 + " ") + ("x1=" + this.x1 + " y1=" + this.y1 + " x2=" + this.x2 + " ") + ("y2=" + this.y2 + " x3=" + this.x3 + " y3=" + this.y3) + "]";
    }, i;
  }()
), sa = new ss();
function Rr(i) {
  i.destroy = function() {
  }, i.on = function() {
  }, i.once = function() {
  }, i.emit = function() {
  };
}
var et = (
  /** @class */
  function(i) {
    _t(t, i);
    function t(e, r, n, s, a, o) {
      var h = i.call(this) || this;
      if (h.noFrame = !1, r || (h.noFrame = !0, r = new ht(0, 0, 1, 1)), e instanceof t && (e = e.baseTexture), h.baseTexture = e, h._frame = r, h.trim = s, h.valid = !1, h._uvs = sa, h.uvMatrix = null, h.orig = n || r, h._rotate = Number(a || 0), a === !0)
        h._rotate = 2;
      else if (h._rotate % 2 !== 0)
        throw new Error("attempt to use diamond-shaped UVs. If you are sure, set rotation manually");
      return h.defaultAnchor = o ? new gt(o.x, o.y) : new gt(0, 0), h._updateID = 0, h.textureCacheIds = [], e.valid ? h.noFrame ? e.valid && h.onBaseTextureUpdated(e) : h.frame = r : e.once("loaded", h.onBaseTextureUpdated, h), h.noFrame && e.on("update", h.onBaseTextureUpdated, h), h;
    }
    return t.prototype.update = function() {
      this.baseTexture.resource && this.baseTexture.resource.update();
    }, t.prototype.onBaseTextureUpdated = function(e) {
      if (this.noFrame) {
        if (!this.baseTexture.valid)
          return;
        this._frame.width = e.width, this._frame.height = e.height, this.valid = !0, this.updateUvs();
      } else
        this.frame = this._frame;
      this.emit("update", this);
    }, t.prototype.destroy = function(e) {
      if (this.baseTexture) {
        if (e) {
          var r = this.baseTexture.resource;
          r && r.url && Yt[r.url] && t.removeFromCache(r.url), this.baseTexture.destroy();
        }
        this.baseTexture.off("loaded", this.onBaseTextureUpdated, this), this.baseTexture.off("update", this.onBaseTextureUpdated, this), this.baseTexture = null;
      }
      this._frame = null, this._uvs = null, this.trim = null, this.orig = null, this.valid = !1, t.removeFromCache(this), this.textureCacheIds = null;
    }, t.prototype.clone = function() {
      var e = this._frame.clone(), r = this._frame === this.orig ? e : this.orig.clone(), n = new t(this.baseTexture, !this.noFrame && e, r, this.trim && this.trim.clone(), this.rotate, this.defaultAnchor);
      return this.noFrame && (n._frame = e), n;
    }, t.prototype.updateUvs = function() {
      this._uvs === sa && (this._uvs = new ss()), this._uvs.set(this._frame, this.baseTexture, this.rotate), this._updateID++;
    }, t.from = function(e, r, n) {
      r === void 0 && (r = {}), n === void 0 && (n = z.STRICT_TEXTURE_CACHE);
      var s = typeof e == "string", a = null;
      if (s)
        a = e;
      else if (e instanceof ot) {
        if (!e.cacheId) {
          var o = r && r.pixiIdPrefix || "pixiid";
          e.cacheId = o + "-" + Be(), ot.addToCache(e, e.cacheId);
        }
        a = e.cacheId;
      } else {
        if (!e._pixiId) {
          var o = r && r.pixiIdPrefix || "pixiid";
          e._pixiId = o + "_" + Be();
        }
        a = e._pixiId;
      }
      var h = Yt[a];
      if (s && n && !h)
        throw new Error('The cacheId "' + a + '" does not exist in TextureCache.');
      return !h && !(e instanceof ot) ? (r.resolution || (r.resolution = li(e)), h = new t(new ot(e, r)), h.baseTexture.cacheId = a, ot.addToCache(h.baseTexture, a), t.addToCache(h, a)) : !h && e instanceof ot && (h = new t(e), t.addToCache(h, a)), h;
    }, t.fromURL = function(e, r) {
      var n = Object.assign({ autoLoad: !1 }, r?.resourceOptions), s = t.from(e, Object.assign({ resourceOptions: n }, r), !1), a = s.baseTexture.resource;
      return s.baseTexture.valid ? Promise.resolve(s) : a.load().then(function() {
        return Promise.resolve(s);
      });
    }, t.fromBuffer = function(e, r, n, s) {
      return new t(ot.fromBuffer(e, r, n, s));
    }, t.fromLoader = function(e, r, n, s) {
      var a = new ot(e, Object.assign({
        scaleMode: z.SCALE_MODE,
        resolution: li(r)
      }, s)), o = a.resource;
      o instanceof Si && (o.url = r);
      var h = new t(a);
      return n || (n = r), ot.addToCache(h.baseTexture, n), t.addToCache(h, n), n !== r && (ot.addToCache(h.baseTexture, r), t.addToCache(h, r)), h.baseTexture.valid ? Promise.resolve(h) : new Promise(function(u) {
        h.baseTexture.once("loaded", function() {
          return u(h);
        });
      });
    }, t.addToCache = function(e, r) {
      r && (e.textureCacheIds.indexOf(r) === -1 && e.textureCacheIds.push(r), Yt[r] && console.warn("Texture added to the cache with an id [" + r + "] that already had an entry"), Yt[r] = e);
    }, t.removeFromCache = function(e) {
      if (typeof e == "string") {
        var r = Yt[e];
        if (r) {
          var n = r.textureCacheIds.indexOf(e);
          return n > -1 && r.textureCacheIds.splice(n, 1), delete Yt[e], r;
        }
      } else if (e && e.textureCacheIds) {
        for (var s = 0; s < e.textureCacheIds.length; ++s)
          Yt[e.textureCacheIds[s]] === e && delete Yt[e.textureCacheIds[s]];
        return e.textureCacheIds.length = 0, e;
      }
      return null;
    }, Object.defineProperty(t.prototype, "resolution", {
      /**
       * Returns resolution of baseTexture
       * @readonly
       */
      get: function() {
        return this.baseTexture.resolution;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "frame", {
      /**
       * The frame specifies the region of the base texture that this texture uses.
       * Please call `updateUvs()` after you change coordinates of `frame` manually.
       */
      get: function() {
        return this._frame;
      },
      set: function(e) {
        this._frame = e, this.noFrame = !1;
        var r = e.x, n = e.y, s = e.width, a = e.height, o = r + s > this.baseTexture.width, h = n + a > this.baseTexture.height;
        if (o || h) {
          var u = o && h ? "and" : "or", l = "X: " + r + " + " + s + " = " + (r + s) + " > " + this.baseTexture.width, f = "Y: " + n + " + " + a + " = " + (n + a) + " > " + this.baseTexture.height;
          throw new Error("Texture Error: frame does not fit inside the base Texture dimensions: " + (l + " " + u + " " + f));
        }
        this.valid = s && a && this.baseTexture.valid, !this.trim && !this.rotate && (this.orig = e), this.valid && this.updateUvs();
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "rotate", {
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
      set: function(e) {
        this._rotate = e, this.valid && this.updateUvs();
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "width", {
      /** The width of the Texture in pixels. */
      get: function() {
        return this.orig.width;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "height", {
      /** The height of the Texture in pixels. */
      get: function() {
        return this.orig.height;
      },
      enumerable: !1,
      configurable: !0
    }), t.prototype.castToBaseTexture = function() {
      return this.baseTexture;
    }, Object.defineProperty(t, "EMPTY", {
      /** An empty texture, used often to not have to create multiple empty textures. Can not be destroyed. */
      get: function() {
        return t._EMPTY || (t._EMPTY = new t(new ot()), Rr(t._EMPTY), Rr(t._EMPTY.baseTexture)), t._EMPTY;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t, "WHITE", {
      /** A white texture of 16x16 size, used for graphics and other things Can not be destroyed. */
      get: function() {
        if (!t._WHITE) {
          var e = z.ADAPTER.createCanvas(16, 16), r = e.getContext("2d");
          e.width = 16, e.height = 16, r.fillStyle = "white", r.fillRect(0, 0, 16, 16), t._WHITE = new t(ot.from(e)), Rr(t._WHITE), Rr(t._WHITE.baseTexture);
        }
        return t._WHITE;
      },
      enumerable: !1,
      configurable: !0
    }), t;
  }(qe)
), Ee = (
  /** @class */
  function(i) {
    _t(t, i);
    function t(e, r) {
      var n = i.call(this, e, r) || this;
      return n.valid = !0, n.filterFrame = null, n.filterPoolKey = null, n.updateUvs(), n;
    }
    return Object.defineProperty(t.prototype, "framebuffer", {
      /**
       * Shortcut to `this.baseTexture.framebuffer`, saves baseTexture cast.
       * @readonly
       */
      get: function() {
        return this.baseTexture.framebuffer;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "multisample", {
      /**
       * Shortcut to `this.framebuffer.multisample`.
       * @default PIXI.MSAA_QUALITY.NONE
       */
      get: function() {
        return this.framebuffer.multisample;
      },
      set: function(e) {
        this.framebuffer.multisample = e;
      },
      enumerable: !1,
      configurable: !0
    }), t.prototype.resize = function(e, r, n) {
      n === void 0 && (n = !0);
      var s = this.baseTexture.resolution, a = Math.round(e * s) / s, o = Math.round(r * s) / s;
      this.valid = a > 0 && o > 0, this._frame.width = this.orig.width = a, this._frame.height = this.orig.height = o, n && this.baseTexture.resize(a, o), this.updateUvs();
    }, t.prototype.setResolution = function(e) {
      var r = this.baseTexture;
      r.resolution !== e && (r.setResolution(e), this.resize(r.width, r.height, !1));
    }, t.create = function(e) {
      for (var r = arguments, n = [], s = 1; s < arguments.length; s++)
        n[s - 1] = r[s];
      return typeof e == "number" && (Bt("6.0.0", "Arguments (width, height, scaleMode, resolution) have been deprecated."), e = {
        width: e,
        height: n[0],
        scaleMode: n[1],
        resolution: n[2]
      }), new t(new ns(e));
    }, t;
  }(et)
), uo = (
  /** @class */
  function() {
    function i(t) {
      this.texturePool = {}, this.textureOptions = t || {}, this.enableFullScreen = !1, this._pixelsWidth = 0, this._pixelsHeight = 0;
    }
    return i.prototype.createTexture = function(t, e, r) {
      r === void 0 && (r = bt.NONE);
      var n = new ns(Object.assign({
        width: t,
        height: e,
        resolution: 1,
        multisample: r
      }, this.textureOptions));
      return new Ee(n);
    }, i.prototype.getOptimalTexture = function(t, e, r, n) {
      r === void 0 && (r = 1), n === void 0 && (n = bt.NONE);
      var s;
      t = Math.ceil(t * r - 1e-6), e = Math.ceil(e * r - 1e-6), !this.enableFullScreen || t !== this._pixelsWidth || e !== this._pixelsHeight ? (t = ui(t), e = ui(e), s = ((t & 65535) << 16 | e & 65535) >>> 0, n > 1 && (s += n * 4294967296)) : s = n > 1 ? -n : -1, this.texturePool[s] || (this.texturePool[s] = []);
      var a = this.texturePool[s].pop();
      return a || (a = this.createTexture(t, e, n)), a.filterPoolKey = s, a.setResolution(r), a;
    }, i.prototype.getFilterTexture = function(t, e, r) {
      var n = this.getOptimalTexture(t.width, t.height, e || t.resolution, r || bt.NONE);
      return n.filterFrame = t.filterFrame, n;
    }, i.prototype.returnTexture = function(t) {
      var e = t.filterPoolKey;
      t.filterFrame = null, this.texturePool[e].push(t);
    }, i.prototype.returnFilterTexture = function(t) {
      this.returnTexture(t);
    }, i.prototype.clear = function(t) {
      if (t = t !== !1, t)
        for (var e in this.texturePool) {
          var r = this.texturePool[e];
          if (r)
            for (var n = 0; n < r.length; n++)
              r[n].destroy(!0);
        }
      this.texturePool = {};
    }, i.prototype.setScreenSize = function(t) {
      if (!(t.width === this._pixelsWidth && t.height === this._pixelsHeight)) {
        this.enableFullScreen = t.width > 0 && t.height > 0;
        for (var e in this.texturePool)
          if (Number(e) < 0) {
            var r = this.texturePool[e];
            if (r)
              for (var n = 0; n < r.length; n++)
                r[n].destroy(!0);
            this.texturePool[e] = [];
          }
        this._pixelsWidth = t.width, this._pixelsHeight = t.height;
      }
    }, i.SCREEN_KEY = -1, i;
  }()
), yn = (
  /** @class */
  function() {
    function i(t, e, r, n, s, a, o) {
      e === void 0 && (e = 0), r === void 0 && (r = !1), n === void 0 && (n = J.FLOAT), this.buffer = t, this.size = e, this.normalized = r, this.type = n, this.stride = s, this.start = a, this.instance = o;
    }
    return i.prototype.destroy = function() {
      this.buffer = null;
    }, i.from = function(t, e, r, n, s) {
      return new i(t, e, r, n, s);
    }, i;
  }()
), Kf = 0, Mt = (
  /** @class */
  function() {
    function i(t, e, r) {
      e === void 0 && (e = !0), r === void 0 && (r = !1), this.data = t || new Float32Array(1), this._glBuffers = {}, this._updateID = 0, this.index = r, this.static = e, this.id = Kf++, this.disposeRunner = new Ot("disposeBuffer");
    }
    return i.prototype.update = function(t) {
      t instanceof Array && (t = new Float32Array(t)), this.data = t || this.data, this._updateID++;
    }, i.prototype.dispose = function() {
      this.disposeRunner.emit(this, !1);
    }, i.prototype.destroy = function() {
      this.dispose(), this.data = null;
    }, Object.defineProperty(i.prototype, "index", {
      get: function() {
        return this.type === te.ELEMENT_ARRAY_BUFFER;
      },
      /**
       * Flags whether this is an index buffer.
       *
       * Index buffers are of type `ELEMENT_ARRAY_BUFFER`. Note that setting this property to false will make
       * the buffer of type `ARRAY_BUFFER`.
       *
       * For backwards compatibility.
       */
      set: function(t) {
        this.type = t ? te.ELEMENT_ARRAY_BUFFER : te.ARRAY_BUFFER;
      },
      enumerable: !1,
      configurable: !0
    }), i.from = function(t) {
      return t instanceof Array && (t = new Float32Array(t)), new i(t);
    }, i;
  }()
), Qf = {
  Float32Array,
  Uint32Array,
  Int32Array,
  Uint8Array
};
function tc(i, t) {
  for (var e = 0, r = 0, n = {}, s = 0; s < i.length; s++)
    r += t[s], e += i[s].length;
  for (var a = new ArrayBuffer(e * 4), o = null, h = 0, s = 0; s < i.length; s++) {
    var u = t[s], l = i[s], f = no(l);
    n[f] || (n[f] = new Qf[f](a)), o = n[f];
    for (var c = 0; c < l.length; c++) {
      var d = (c / u | 0) * r + h, p = c % u;
      o[d + p] = l[c];
    }
    h += u;
  }
  return new Float32Array(a);
}
var aa = { 5126: 4, 5123: 2, 5121: 1 }, ec = 0, rc = {
  Float32Array,
  Uint32Array,
  Int32Array,
  Uint8Array,
  Uint16Array
}, Je = (
  /** @class */
  function() {
    function i(t, e) {
      t === void 0 && (t = []), e === void 0 && (e = {}), this.buffers = t, this.indexBuffer = null, this.attributes = e, this.glVertexArrayObjects = {}, this.id = ec++, this.instanced = !1, this.instanceCount = 1, this.disposeRunner = new Ot("disposeGeometry"), this.refCount = 0;
    }
    return i.prototype.addAttribute = function(t, e, r, n, s, a, o, h) {
      if (r === void 0 && (r = 0), n === void 0 && (n = !1), h === void 0 && (h = !1), !e)
        throw new Error("You must pass a buffer when creating an attribute");
      e instanceof Mt || (e instanceof Array && (e = new Float32Array(e)), e = new Mt(e));
      var u = t.split("|");
      if (u.length > 1) {
        for (var l = 0; l < u.length; l++)
          this.addAttribute(u[l], e, r, n, s);
        return this;
      }
      var f = this.buffers.indexOf(e);
      return f === -1 && (this.buffers.push(e), f = this.buffers.length - 1), this.attributes[t] = new yn(f, r, n, s, a, o, h), this.instanced = this.instanced || h, this;
    }, i.prototype.getAttribute = function(t) {
      return this.attributes[t];
    }, i.prototype.getBuffer = function(t) {
      return this.buffers[this.getAttribute(t).buffer];
    }, i.prototype.addIndex = function(t) {
      return t instanceof Mt || (t instanceof Array && (t = new Uint16Array(t)), t = new Mt(t)), t.type = te.ELEMENT_ARRAY_BUFFER, this.indexBuffer = t, this.buffers.indexOf(t) === -1 && this.buffers.push(t), this;
    }, i.prototype.getIndex = function() {
      return this.indexBuffer;
    }, i.prototype.interleave = function() {
      if (this.buffers.length === 1 || this.buffers.length === 2 && this.indexBuffer)
        return this;
      var t = [], e = [], r = new Mt(), n;
      for (n in this.attributes) {
        var s = this.attributes[n], a = this.buffers[s.buffer];
        t.push(a.data), e.push(s.size * aa[s.type] / 4), s.buffer = 0;
      }
      for (r.data = tc(t, e), n = 0; n < this.buffers.length; n++)
        this.buffers[n] !== this.indexBuffer && this.buffers[n].destroy();
      return this.buffers = [r], this.indexBuffer && this.buffers.push(this.indexBuffer), this;
    }, i.prototype.getSize = function() {
      for (var t in this.attributes) {
        var e = this.attributes[t], r = this.buffers[e.buffer];
        return r.data.length / (e.stride / 4 || e.size);
      }
      return 0;
    }, i.prototype.dispose = function() {
      this.disposeRunner.emit(this, !1);
    }, i.prototype.destroy = function() {
      this.dispose(), this.buffers = null, this.indexBuffer = null, this.attributes = null;
    }, i.prototype.clone = function() {
      for (var t = new i(), e = 0; e < this.buffers.length; e++)
        t.buffers[e] = new Mt(this.buffers[e].data.slice(0));
      for (var e in this.attributes) {
        var r = this.attributes[e];
        t.attributes[e] = new yn(r.buffer, r.size, r.normalized, r.type, r.stride, r.start, r.instance);
      }
      return this.indexBuffer && (t.indexBuffer = t.buffers[this.buffers.indexOf(this.indexBuffer)], t.indexBuffer.type = te.ELEMENT_ARRAY_BUFFER), t;
    }, i.merge = function(t) {
      for (var e = new i(), r = [], n = [], s = [], a, o = 0; o < t.length; o++) {
        a = t[o];
        for (var h = 0; h < a.buffers.length; h++)
          n[h] = n[h] || 0, n[h] += a.buffers[h].data.length, s[h] = 0;
      }
      for (var o = 0; o < a.buffers.length; o++)
        r[o] = new rc[no(a.buffers[o].data)](n[o]), e.buffers[o] = new Mt(r[o]);
      for (var o = 0; o < t.length; o++) {
        a = t[o];
        for (var h = 0; h < a.buffers.length; h++)
          r[h].set(a.buffers[h].data, s[h]), s[h] += a.buffers[h].data.length;
      }
      if (e.attributes = a.attributes, a.indexBuffer) {
        e.indexBuffer = e.buffers[a.buffers.indexOf(a.indexBuffer)], e.indexBuffer.type = te.ELEMENT_ARRAY_BUFFER;
        for (var u = 0, l = 0, f = 0, c = 0, o = 0; o < a.buffers.length; o++)
          if (a.buffers[o] !== a.indexBuffer) {
            c = o;
            break;
          }
        for (var o in a.attributes) {
          var d = a.attributes[o];
          (d.buffer | 0) === c && (l += d.size * aa[d.type] / 4);
        }
        for (var o = 0; o < t.length; o++) {
          for (var p = t[o].indexBuffer.data, h = 0; h < p.length; h++)
            e.indexBuffer.data[h + f] += u;
          u += t[o].buffers[c].data.length / l, f += p.length;
        }
      }
      return e;
    }, i;
  }()
), lo = (
  /** @class */
  function(i) {
    _t(t, i);
    function t() {
      var e = i.call(this) || this;
      return e.addAttribute("aVertexPosition", new Float32Array([
        0,
        0,
        1,
        0,
        1,
        1,
        0,
        1
      ])).addIndex([0, 1, 3, 2]), e;
    }
    return t;
  }(Je)
), as = (
  /** @class */
  function(i) {
    _t(t, i);
    function t() {
      var e = i.call(this) || this;
      return e.vertices = new Float32Array([
        -1,
        -1,
        1,
        -1,
        1,
        1,
        -1,
        1
      ]), e.uvs = new Float32Array([
        0,
        0,
        1,
        0,
        1,
        1,
        0,
        1
      ]), e.vertexBuffer = new Mt(e.vertices), e.uvBuffer = new Mt(e.uvs), e.addAttribute("aVertexPosition", e.vertexBuffer).addAttribute("aTextureCoord", e.uvBuffer).addIndex([0, 1, 2, 0, 2, 3]), e;
    }
    return t.prototype.map = function(e, r) {
      var n = 0, s = 0;
      return this.uvs[0] = n, this.uvs[1] = s, this.uvs[2] = n + r.width / e.width, this.uvs[3] = s, this.uvs[4] = n + r.width / e.width, this.uvs[5] = s + r.height / e.height, this.uvs[6] = n, this.uvs[7] = s + r.height / e.height, n = r.x, s = r.y, this.vertices[0] = n, this.vertices[1] = s, this.vertices[2] = n + r.width, this.vertices[3] = s, this.vertices[4] = n + r.width, this.vertices[5] = s + r.height, this.vertices[6] = n, this.vertices[7] = s + r.height, this.invalidate(), this;
    }, t.prototype.invalidate = function() {
      return this.vertexBuffer._updateID++, this.uvBuffer._updateID++, this;
    }, t;
  }(Je)
), ic = 0, be = (
  /** @class */
  function() {
    function i(t, e, r) {
      this.group = !0, this.syncUniforms = {}, this.dirtyId = 0, this.id = ic++, this.static = !!e, this.ubo = !!r, t instanceof Mt ? (this.buffer = t, this.buffer.type = te.UNIFORM_BUFFER, this.autoManage = !1, this.ubo = !0) : (this.uniforms = t, this.ubo && (this.buffer = new Mt(new Float32Array(1)), this.buffer.type = te.UNIFORM_BUFFER, this.autoManage = !0));
    }
    return i.prototype.update = function() {
      this.dirtyId++, !this.autoManage && this.buffer && this.buffer.update();
    }, i.prototype.add = function(t, e, r) {
      if (!this.ubo)
        this.uniforms[t] = new i(e, r);
      else
        throw new Error("[UniformGroup] uniform groups in ubo mode cannot be modified, or have uniform groups nested in them");
    }, i.from = function(t, e, r) {
      return new i(t, e, r);
    }, i.uboFrom = function(t, e) {
      return new i(t, e ?? !0, !0);
    }, i;
  }()
), fo = (
  /** @class */
  function() {
    function i() {
      this.renderTexture = null, this.target = null, this.legacy = !1, this.resolution = 1, this.multisample = bt.NONE, this.sourceFrame = new ht(), this.destinationFrame = new ht(), this.bindingSourceFrame = new ht(), this.bindingDestinationFrame = new ht(), this.filters = [], this.transform = null;
    }
    return i.prototype.clear = function() {
      this.target = null, this.filters = null, this.renderTexture = null;
    }, i;
  }()
), Or = [new gt(), new gt(), new gt(), new gt()], Ui = new At(), os = (
  /** @class */
  function() {
    function i(t) {
      this.renderer = t, this.defaultFilterStack = [{}], this.texturePool = new uo(), this.texturePool.setScreenSize(t.view), this.statePool = [], this.quad = new lo(), this.quadUv = new as(), this.tempRect = new ht(), this.activeState = {}, this.globalUniforms = new be({
        outputFrame: new ht(),
        inputSize: new Float32Array(4),
        inputPixel: new Float32Array(4),
        inputClamp: new Float32Array(4),
        resolution: 1,
        // legacy variables
        filterArea: new Float32Array(4),
        filterClamp: new Float32Array(4)
      }, !0), this.forceClear = !1, this.useMaxPadding = !1;
    }
    return i.prototype.push = function(t, e) {
      for (var r, n, s = this.renderer, a = this.defaultFilterStack, o = this.statePool.pop() || new fo(), h = this.renderer.renderTexture, u = e[0].resolution, l = e[0].multisample, f = e[0].padding, c = e[0].autoFit, d = (r = e[0].legacy) !== null && r !== void 0 ? r : !0, p = 1; p < e.length; p++) {
        var v = e[p];
        u = Math.min(u, v.resolution), l = Math.min(l, v.multisample), f = this.useMaxPadding ? Math.max(f, v.padding) : f + v.padding, c = c && v.autoFit, d = d || ((n = v.legacy) !== null && n !== void 0 ? n : !0);
      }
      a.length === 1 && (this.defaultFilterStack[0].renderTexture = h.current), a.push(o), o.resolution = u, o.multisample = l, o.legacy = d, o.target = t, o.sourceFrame.copyFrom(t.filterArea || t.getBounds(!0)), o.sourceFrame.pad(f);
      var _ = this.tempRect.copyFrom(h.sourceFrame);
      s.projection.transform && this.transformAABB(Ui.copyFrom(s.projection.transform).invert(), _), c ? (o.sourceFrame.fit(_), (o.sourceFrame.width <= 0 || o.sourceFrame.height <= 0) && (o.sourceFrame.width = 0, o.sourceFrame.height = 0)) : o.sourceFrame.intersects(_) || (o.sourceFrame.width = 0, o.sourceFrame.height = 0), this.roundFrame(o.sourceFrame, h.current ? h.current.resolution : s.resolution, h.sourceFrame, h.destinationFrame, s.projection.transform), o.renderTexture = this.getOptimalFilterTexture(o.sourceFrame.width, o.sourceFrame.height, u, l), o.filters = e, o.destinationFrame.width = o.renderTexture.width, o.destinationFrame.height = o.renderTexture.height;
      var g = this.tempRect;
      g.x = 0, g.y = 0, g.width = o.sourceFrame.width, g.height = o.sourceFrame.height, o.renderTexture.filterFrame = o.sourceFrame, o.bindingSourceFrame.copyFrom(h.sourceFrame), o.bindingDestinationFrame.copyFrom(h.destinationFrame), o.transform = s.projection.transform, s.projection.transform = null, h.bind(o.renderTexture, o.sourceFrame, g), s.framebuffer.clear(0, 0, 0, 0);
    }, i.prototype.pop = function() {
      var t = this.defaultFilterStack, e = t.pop(), r = e.filters;
      this.activeState = e;
      var n = this.globalUniforms.uniforms;
      n.outputFrame = e.sourceFrame, n.resolution = e.resolution;
      var s = n.inputSize, a = n.inputPixel, o = n.inputClamp;
      if (s[0] = e.destinationFrame.width, s[1] = e.destinationFrame.height, s[2] = 1 / s[0], s[3] = 1 / s[1], a[0] = Math.round(s[0] * e.resolution), a[1] = Math.round(s[1] * e.resolution), a[2] = 1 / a[0], a[3] = 1 / a[1], o[0] = 0.5 * a[2], o[1] = 0.5 * a[3], o[2] = e.sourceFrame.width * s[2] - 0.5 * a[2], o[3] = e.sourceFrame.height * s[3] - 0.5 * a[3], e.legacy) {
        var h = n.filterArea;
        h[0] = e.destinationFrame.width, h[1] = e.destinationFrame.height, h[2] = e.sourceFrame.x, h[3] = e.sourceFrame.y, n.filterClamp = n.inputClamp;
      }
      this.globalUniforms.update();
      var u = t[t.length - 1];
      if (this.renderer.framebuffer.blit(), r.length === 1)
        r[0].apply(this, e.renderTexture, u.renderTexture, Vt.BLEND, e), this.returnFilterTexture(e.renderTexture);
      else {
        var l = e.renderTexture, f = this.getOptimalFilterTexture(l.width, l.height, e.resolution);
        f.filterFrame = l.filterFrame;
        var c = 0;
        for (c = 0; c < r.length - 1; ++c) {
          c === 1 && e.multisample > 1 && (f = this.getOptimalFilterTexture(l.width, l.height, e.resolution), f.filterFrame = l.filterFrame), r[c].apply(this, l, f, Vt.CLEAR, e);
          var d = l;
          l = f, f = d;
        }
        r[c].apply(this, l, u.renderTexture, Vt.BLEND, e), c > 1 && e.multisample > 1 && this.returnFilterTexture(e.renderTexture), this.returnFilterTexture(l), this.returnFilterTexture(f);
      }
      e.clear(), this.statePool.push(e);
    }, i.prototype.bindAndClear = function(t, e) {
      e === void 0 && (e = Vt.CLEAR);
      var r = this.renderer, n = r.renderTexture, s = r.state;
      if (t === this.defaultFilterStack[this.defaultFilterStack.length - 1].renderTexture ? this.renderer.projection.transform = this.activeState.transform : this.renderer.projection.transform = null, t && t.filterFrame) {
        var a = this.tempRect;
        a.x = 0, a.y = 0, a.width = t.filterFrame.width, a.height = t.filterFrame.height, n.bind(t, t.filterFrame, a);
      } else t !== this.defaultFilterStack[this.defaultFilterStack.length - 1].renderTexture ? n.bind(t) : this.renderer.renderTexture.bind(t, this.activeState.bindingSourceFrame, this.activeState.bindingDestinationFrame);
      var o = s.stateId & 1 || this.forceClear;
      (e === Vt.CLEAR || e === Vt.BLIT && o) && this.renderer.framebuffer.clear(0, 0, 0, 0);
    }, i.prototype.applyFilter = function(t, e, r, n) {
      var s = this.renderer;
      s.state.set(t.state), this.bindAndClear(r, n), t.uniforms.uSampler = e, t.uniforms.filterGlobals = this.globalUniforms, s.shader.bind(t), t.legacy = !!t.program.attributeData.aTextureCoord, t.legacy ? (this.quadUv.map(e._frame, e.filterFrame), s.geometry.bind(this.quadUv), s.geometry.draw($t.TRIANGLES)) : (s.geometry.bind(this.quad), s.geometry.draw($t.TRIANGLE_STRIP));
    }, i.prototype.calculateSpriteMatrix = function(t, e) {
      var r = this.activeState, n = r.sourceFrame, s = r.destinationFrame, a = e._texture.orig, o = t.set(s.width, 0, 0, s.height, n.x, n.y), h = e.worldTransform.copyTo(At.TEMP_MATRIX);
      return h.invert(), o.prepend(h), o.scale(1 / a.width, 1 / a.height), o.translate(e.anchor.x, e.anchor.y), o;
    }, i.prototype.destroy = function() {
      this.renderer = null, this.texturePool.clear(!1);
    }, i.prototype.getOptimalFilterTexture = function(t, e, r, n) {
      return r === void 0 && (r = 1), n === void 0 && (n = bt.NONE), this.texturePool.getOptimalTexture(t, e, r, n);
    }, i.prototype.getFilterTexture = function(t, e, r) {
      if (typeof t == "number") {
        var n = t;
        t = e, e = n;
      }
      t = t || this.activeState.renderTexture;
      var s = this.texturePool.getOptimalTexture(t.width, t.height, e || t.resolution, r || bt.NONE);
      return s.filterFrame = t.filterFrame, s;
    }, i.prototype.returnFilterTexture = function(t) {
      this.texturePool.returnTexture(t);
    }, i.prototype.emptyPool = function() {
      this.texturePool.clear(!0);
    }, i.prototype.resize = function() {
      this.texturePool.setScreenSize(this.renderer.view);
    }, i.prototype.transformAABB = function(t, e) {
      var r = Or[0], n = Or[1], s = Or[2], a = Or[3];
      r.set(e.left, e.top), n.set(e.left, e.bottom), s.set(e.right, e.top), a.set(e.right, e.bottom), t.apply(r, r), t.apply(n, n), t.apply(s, s), t.apply(a, a);
      var o = Math.min(r.x, n.x, s.x, a.x), h = Math.min(r.y, n.y, s.y, a.y), u = Math.max(r.x, n.x, s.x, a.x), l = Math.max(r.y, n.y, s.y, a.y);
      e.x = o, e.y = h, e.width = u - o, e.height = l - h;
    }, i.prototype.roundFrame = function(t, e, r, n, s) {
      if (!(t.width <= 0 || t.height <= 0 || r.width <= 0 || r.height <= 0)) {
        if (s) {
          var a = s.a, o = s.b, h = s.c, u = s.d;
          if ((Math.abs(o) > 1e-4 || Math.abs(h) > 1e-4) && (Math.abs(a) > 1e-4 || Math.abs(u) > 1e-4))
            return;
        }
        s = s ? Ui.copyFrom(s) : Ui.identity(), s.translate(-r.x, -r.y).scale(n.width / r.width, n.height / r.height).translate(n.x, n.y), this.transformAABB(s, t), t.ceil(e), this.transformAABB(s.invert(), t);
      }
    }, i;
  }()
), Er = (
  /** @class */
  function() {
    function i(t) {
      this.renderer = t;
    }
    return i.prototype.flush = function() {
    }, i.prototype.destroy = function() {
      this.renderer = null;
    }, i.prototype.start = function() {
    }, i.prototype.stop = function() {
      this.flush();
    }, i.prototype.render = function(t) {
    }, i;
  }()
), hs = (
  /** @class */
  function() {
    function i(t) {
      this.renderer = t, this.emptyRenderer = new Er(t), this.currentRenderer = this.emptyRenderer;
    }
    return i.prototype.setObjectRenderer = function(t) {
      this.currentRenderer !== t && (this.currentRenderer.stop(), this.currentRenderer = t, this.currentRenderer.start());
    }, i.prototype.flush = function() {
      this.setObjectRenderer(this.emptyRenderer);
    }, i.prototype.reset = function() {
      this.setObjectRenderer(this.emptyRenderer);
    }, i.prototype.copyBoundTextures = function(t, e) {
      for (var r = this.renderer.texture.boundTextures, n = e - 1; n >= 0; --n)
        t[n] = r[n] || null, t[n] && (t[n]._batchLocation = n);
    }, i.prototype.boundArray = function(t, e, r, n) {
      for (var s = t.elements, a = t.ids, o = t.count, h = 0, u = 0; u < o; u++) {
        var l = s[u], f = l._batchLocation;
        if (f >= 0 && f < n && e[f] === l) {
          a[u] = f;
          continue;
        }
        for (; h < n; ) {
          var c = e[h];
          if (c && c._batchEnabled === r && c._batchLocation === h) {
            h++;
            continue;
          }
          a[u] = h, l._batchLocation = h, e[h] = l;
          break;
        }
      }
    }, i.prototype.destroy = function() {
      this.renderer = null;
    }, i;
  }()
), oa = 0, us = (
  /** @class */
  function() {
    function i(t) {
      this.renderer = t, this.webGLVersion = 1, this.extensions = {}, this.supports = {
        uint32Indices: !1
      }, this.handleContextLost = this.handleContextLost.bind(this), this.handleContextRestored = this.handleContextRestored.bind(this), t.view.addEventListener("webglcontextlost", this.handleContextLost, !1), t.view.addEventListener("webglcontextrestored", this.handleContextRestored, !1);
    }
    return Object.defineProperty(i.prototype, "isLost", {
      /**
       * `true` if the context is lost
       * @readonly
       */
      get: function() {
        return !this.gl || this.gl.isContextLost();
      },
      enumerable: !1,
      configurable: !0
    }), i.prototype.contextChange = function(t) {
      this.gl = t, this.renderer.gl = t, this.renderer.CONTEXT_UID = oa++;
    }, i.prototype.initFromContext = function(t) {
      this.gl = t, this.validateContext(t), this.renderer.gl = t, this.renderer.CONTEXT_UID = oa++, this.renderer.runners.contextChange.emit(t);
    }, i.prototype.initFromOptions = function(t) {
      var e = this.createContext(this.renderer.view, t);
      this.initFromContext(e);
    }, i.prototype.createContext = function(t, e) {
      var r;
      if (z.PREFER_ENV >= de.WEBGL2 && (r = t.getContext("webgl2", e)), r)
        this.webGLVersion = 2;
      else if (this.webGLVersion = 1, r = t.getContext("webgl", e) || t.getContext("experimental-webgl", e), !r)
        throw new Error("This browser does not support WebGL. Try using the canvas renderer");
      return this.gl = r, this.getExtensions(), this.gl;
    }, i.prototype.getExtensions = function() {
      var t = this.gl, e = {
        loseContext: t.getExtension("WEBGL_lose_context"),
        anisotropicFiltering: t.getExtension("EXT_texture_filter_anisotropic"),
        floatTextureLinear: t.getExtension("OES_texture_float_linear"),
        s3tc: t.getExtension("WEBGL_compressed_texture_s3tc"),
        s3tc_sRGB: t.getExtension("WEBGL_compressed_texture_s3tc_srgb"),
        etc: t.getExtension("WEBGL_compressed_texture_etc"),
        etc1: t.getExtension("WEBGL_compressed_texture_etc1"),
        pvrtc: t.getExtension("WEBGL_compressed_texture_pvrtc") || t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc"),
        atc: t.getExtension("WEBGL_compressed_texture_atc"),
        astc: t.getExtension("WEBGL_compressed_texture_astc")
      };
      this.webGLVersion === 1 ? Object.assign(this.extensions, e, {
        drawBuffers: t.getExtension("WEBGL_draw_buffers"),
        depthTexture: t.getExtension("WEBGL_depth_texture"),
        vertexArrayObject: t.getExtension("OES_vertex_array_object") || t.getExtension("MOZ_OES_vertex_array_object") || t.getExtension("WEBKIT_OES_vertex_array_object"),
        uint32ElementIndex: t.getExtension("OES_element_index_uint"),
        // Floats and half-floats
        floatTexture: t.getExtension("OES_texture_float"),
        floatTextureLinear: t.getExtension("OES_texture_float_linear"),
        textureHalfFloat: t.getExtension("OES_texture_half_float"),
        textureHalfFloatLinear: t.getExtension("OES_texture_half_float_linear")
      }) : this.webGLVersion === 2 && Object.assign(this.extensions, e, {
        // Floats and half-floats
        colorBufferFloat: t.getExtension("EXT_color_buffer_float")
      });
    }, i.prototype.handleContextLost = function(t) {
      var e = this;
      t.preventDefault(), setTimeout(function() {
        e.gl.isContextLost() && e.extensions.loseContext && e.extensions.loseContext.restoreContext();
      }, 0);
    }, i.prototype.handleContextRestored = function() {
      this.renderer.runners.contextChange.emit(this.gl);
    }, i.prototype.destroy = function() {
      var t = this.renderer.view;
      this.renderer = null, t.removeEventListener("webglcontextlost", this.handleContextLost), t.removeEventListener("webglcontextrestored", this.handleContextRestored), this.gl.useProgram(null), this.extensions.loseContext && this.extensions.loseContext.loseContext();
    }, i.prototype.postrender = function() {
      this.renderer.renderingToScreen && this.gl.flush();
    }, i.prototype.validateContext = function(t) {
      var e = t.getContextAttributes(), r = "WebGL2RenderingContext" in globalThis && t instanceof globalThis.WebGL2RenderingContext;
      r && (this.webGLVersion = 2), e && !e.stencil && console.warn("Provided WebGL context does not have a stencil buffer, masks may not render correctly");
      var n = r || !!t.getExtension("OES_element_index_uint");
      this.supports.uint32Indices = n, n || console.warn("Provided WebGL context does not support 32 index buffer, complex graphics may not render correctly");
    }, i;
  }()
), co = (
  /** @class */
  /* @__PURE__ */ function() {
    function i(t) {
      this.framebuffer = t, this.stencil = null, this.dirtyId = -1, this.dirtyFormat = -1, this.dirtySize = -1, this.multisample = bt.NONE, this.msaaBuffer = null, this.blitFramebuffer = null, this.mipLevel = 0;
    }
    return i;
  }()
), nc = new ht(), ls = (
  /** @class */
  function() {
    function i(t) {
      this.renderer = t, this.managedFramebuffers = [], this.unknownFramebuffer = new di(10, 10), this.msaaSamples = null;
    }
    return i.prototype.contextChange = function() {
      this.disposeAll(!0);
      var t = this.gl = this.renderer.gl;
      if (this.CONTEXT_UID = this.renderer.CONTEXT_UID, this.current = this.unknownFramebuffer, this.viewport = new ht(), this.hasMRT = !0, this.writeDepthTexture = !0, this.renderer.context.webGLVersion === 1) {
        var e = this.renderer.context.extensions.drawBuffers, r = this.renderer.context.extensions.depthTexture;
        z.PREFER_ENV === de.WEBGL_LEGACY && (e = null, r = null), e ? t.drawBuffers = function(n) {
          return e.drawBuffersWEBGL(n);
        } : (this.hasMRT = !1, t.drawBuffers = function() {
        }), r || (this.writeDepthTexture = !1);
      } else
        this.msaaSamples = t.getInternalformatParameter(t.RENDERBUFFER, t.RGBA8, t.SAMPLES);
    }, i.prototype.bind = function(t, e, r) {
      r === void 0 && (r = 0);
      var n = this.gl;
      if (t) {
        var s = t.glFramebuffers[this.CONTEXT_UID] || this.initFramebuffer(t);
        this.current !== t && (this.current = t, n.bindFramebuffer(n.FRAMEBUFFER, s.framebuffer)), s.mipLevel !== r && (t.dirtyId++, t.dirtyFormat++, s.mipLevel = r), s.dirtyId !== t.dirtyId && (s.dirtyId = t.dirtyId, s.dirtyFormat !== t.dirtyFormat ? (s.dirtyFormat = t.dirtyFormat, s.dirtySize = t.dirtySize, this.updateFramebuffer(t, r)) : s.dirtySize !== t.dirtySize && (s.dirtySize = t.dirtySize, this.resizeFramebuffer(t)));
        for (var a = 0; a < t.colorTextures.length; a++) {
          var o = t.colorTextures[a];
          this.renderer.texture.unbind(o.parentTextureArray || o);
        }
        if (t.depthTexture && this.renderer.texture.unbind(t.depthTexture), e) {
          var h = e.width >> r, u = e.height >> r, l = h / e.width;
          this.setViewport(e.x * l, e.y * l, h, u);
        } else {
          var h = t.width >> r, u = t.height >> r;
          this.setViewport(0, 0, h, u);
        }
      } else
        this.current && (this.current = null, n.bindFramebuffer(n.FRAMEBUFFER, null)), e ? this.setViewport(e.x, e.y, e.width, e.height) : this.setViewport(0, 0, this.renderer.width, this.renderer.height);
    }, i.prototype.setViewport = function(t, e, r, n) {
      var s = this.viewport;
      t = Math.round(t), e = Math.round(e), r = Math.round(r), n = Math.round(n), (s.width !== r || s.height !== n || s.x !== t || s.y !== e) && (s.x = t, s.y = e, s.width = r, s.height = n, this.gl.viewport(t, e, r, n));
    }, Object.defineProperty(i.prototype, "size", {
      /**
       * Get the size of the current width and height. Returns object with `width` and `height` values.
       * @readonly
       */
      get: function() {
        return this.current ? { x: 0, y: 0, width: this.current.width, height: this.current.height } : { x: 0, y: 0, width: this.renderer.width, height: this.renderer.height };
      },
      enumerable: !1,
      configurable: !0
    }), i.prototype.clear = function(t, e, r, n, s) {
      s === void 0 && (s = ai.COLOR | ai.DEPTH);
      var a = this.gl;
      a.clearColor(t, e, r, n), a.clear(s);
    }, i.prototype.initFramebuffer = function(t) {
      var e = this.gl, r = new co(e.createFramebuffer());
      return r.multisample = this.detectSamples(t.multisample), t.glFramebuffers[this.CONTEXT_UID] = r, this.managedFramebuffers.push(t), t.disposeRunner.add(this), r;
    }, i.prototype.resizeFramebuffer = function(t) {
      var e = this.gl, r = t.glFramebuffers[this.CONTEXT_UID];
      r.msaaBuffer && (e.bindRenderbuffer(e.RENDERBUFFER, r.msaaBuffer), e.renderbufferStorageMultisample(e.RENDERBUFFER, r.multisample, e.RGBA8, t.width, t.height)), r.stencil && (e.bindRenderbuffer(e.RENDERBUFFER, r.stencil), r.msaaBuffer ? e.renderbufferStorageMultisample(e.RENDERBUFFER, r.multisample, e.DEPTH24_STENCIL8, t.width, t.height) : e.renderbufferStorage(e.RENDERBUFFER, e.DEPTH_STENCIL, t.width, t.height));
      var n = t.colorTextures, s = n.length;
      e.drawBuffers || (s = Math.min(s, 1));
      for (var a = 0; a < s; a++) {
        var o = n[a], h = o.parentTextureArray || o;
        this.renderer.texture.bind(h, 0);
      }
      t.depthTexture && this.writeDepthTexture && this.renderer.texture.bind(t.depthTexture, 0);
    }, i.prototype.updateFramebuffer = function(t, e) {
      var r = this.gl, n = t.glFramebuffers[this.CONTEXT_UID], s = t.colorTextures, a = s.length;
      r.drawBuffers || (a = Math.min(a, 1)), n.multisample > 1 && this.canMultisampleFramebuffer(t) ? (n.msaaBuffer = n.msaaBuffer || r.createRenderbuffer(), r.bindRenderbuffer(r.RENDERBUFFER, n.msaaBuffer), r.renderbufferStorageMultisample(r.RENDERBUFFER, n.multisample, r.RGBA8, t.width, t.height), r.framebufferRenderbuffer(r.FRAMEBUFFER, r.COLOR_ATTACHMENT0, r.RENDERBUFFER, n.msaaBuffer)) : n.msaaBuffer && (r.deleteRenderbuffer(n.msaaBuffer), n.msaaBuffer = null, n.blitFramebuffer && (n.blitFramebuffer.dispose(), n.blitFramebuffer = null));
      for (var o = [], h = 0; h < a; h++) {
        var u = s[h], l = u.parentTextureArray || u;
        this.renderer.texture.bind(l, 0), !(h === 0 && n.msaaBuffer) && (r.framebufferTexture2D(r.FRAMEBUFFER, r.COLOR_ATTACHMENT0 + h, u.target, l._glTextures[this.CONTEXT_UID].texture, e), o.push(r.COLOR_ATTACHMENT0 + h));
      }
      if (o.length > 1 && r.drawBuffers(o), t.depthTexture) {
        var f = this.writeDepthTexture;
        if (f) {
          var c = t.depthTexture;
          this.renderer.texture.bind(c, 0), r.framebufferTexture2D(r.FRAMEBUFFER, r.DEPTH_ATTACHMENT, r.TEXTURE_2D, c._glTextures[this.CONTEXT_UID].texture, e);
        }
      }
      (t.stencil || t.depth) && !(t.depthTexture && this.writeDepthTexture) ? (n.stencil = n.stencil || r.createRenderbuffer(), r.bindRenderbuffer(r.RENDERBUFFER, n.stencil), n.msaaBuffer ? r.renderbufferStorageMultisample(r.RENDERBUFFER, n.multisample, r.DEPTH24_STENCIL8, t.width, t.height) : r.renderbufferStorage(r.RENDERBUFFER, r.DEPTH_STENCIL, t.width, t.height), r.framebufferRenderbuffer(r.FRAMEBUFFER, r.DEPTH_STENCIL_ATTACHMENT, r.RENDERBUFFER, n.stencil)) : n.stencil && (r.deleteRenderbuffer(n.stencil), n.stencil = null);
    }, i.prototype.canMultisampleFramebuffer = function(t) {
      return this.renderer.context.webGLVersion !== 1 && t.colorTextures.length <= 1 && !t.depthTexture;
    }, i.prototype.detectSamples = function(t) {
      var e = this.msaaSamples, r = bt.NONE;
      if (t <= 1 || e === null)
        return r;
      for (var n = 0; n < e.length; n++)
        if (e[n] <= t) {
          r = e[n];
          break;
        }
      return r === 1 && (r = bt.NONE), r;
    }, i.prototype.blit = function(t, e, r) {
      var n = this, s = n.current, a = n.renderer, o = n.gl, h = n.CONTEXT_UID;
      if (a.context.webGLVersion === 2 && s) {
        var u = s.glFramebuffers[h];
        if (u) {
          if (!t) {
            if (!u.msaaBuffer)
              return;
            var l = s.colorTextures[0];
            if (!l)
              return;
            u.blitFramebuffer || (u.blitFramebuffer = new di(s.width, s.height), u.blitFramebuffer.addColorTexture(0, l)), t = u.blitFramebuffer, t.colorTextures[0] !== l && (t.colorTextures[0] = l, t.dirtyId++, t.dirtyFormat++), (t.width !== s.width || t.height !== s.height) && (t.width = s.width, t.height = s.height, t.dirtyId++, t.dirtySize++);
          }
          e || (e = nc, e.width = s.width, e.height = s.height), r || (r = e);
          var f = e.width === r.width && e.height === r.height;
          this.bind(t), o.bindFramebuffer(o.READ_FRAMEBUFFER, u.framebuffer), o.blitFramebuffer(e.left, e.top, e.right, e.bottom, r.left, r.top, r.right, r.bottom, o.COLOR_BUFFER_BIT, f ? o.NEAREST : o.LINEAR);
        }
      }
    }, i.prototype.disposeFramebuffer = function(t, e) {
      var r = t.glFramebuffers[this.CONTEXT_UID], n = this.gl;
      if (r) {
        delete t.glFramebuffers[this.CONTEXT_UID];
        var s = this.managedFramebuffers.indexOf(t);
        s >= 0 && this.managedFramebuffers.splice(s, 1), t.disposeRunner.remove(this), e || (n.deleteFramebuffer(r.framebuffer), r.msaaBuffer && n.deleteRenderbuffer(r.msaaBuffer), r.stencil && n.deleteRenderbuffer(r.stencil)), r.blitFramebuffer && r.blitFramebuffer.dispose();
      }
    }, i.prototype.disposeAll = function(t) {
      var e = this.managedFramebuffers;
      this.managedFramebuffers = [];
      for (var r = 0; r < e.length; r++)
        this.disposeFramebuffer(e[r], t);
    }, i.prototype.forceStencil = function() {
      var t = this.current;
      if (t) {
        var e = t.glFramebuffers[this.CONTEXT_UID];
        if (!(!e || e.stencil)) {
          t.stencil = !0;
          var r = t.width, n = t.height, s = this.gl, a = s.createRenderbuffer();
          s.bindRenderbuffer(s.RENDERBUFFER, a), e.msaaBuffer ? s.renderbufferStorageMultisample(s.RENDERBUFFER, e.multisample, s.DEPTH24_STENCIL8, r, n) : s.renderbufferStorage(s.RENDERBUFFER, s.DEPTH_STENCIL, r, n), e.stencil = a, s.framebufferRenderbuffer(s.FRAMEBUFFER, s.DEPTH_STENCIL_ATTACHMENT, s.RENDERBUFFER, a);
        }
      }
    }, i.prototype.reset = function() {
      this.current = this.unknownFramebuffer, this.viewport = new ht();
    }, i.prototype.destroy = function() {
      this.renderer = null;
    }, i;
  }()
), Gi = { 5126: 4, 5123: 2, 5121: 1 }, fs = (
  /** @class */
  function() {
    function i(t) {
      this.renderer = t, this._activeGeometry = null, this._activeVao = null, this.hasVao = !0, this.hasInstance = !0, this.canUseUInt32ElementIndex = !1, this.managedGeometries = {};
    }
    return i.prototype.contextChange = function() {
      this.disposeAll(!0);
      var t = this.gl = this.renderer.gl, e = this.renderer.context;
      if (this.CONTEXT_UID = this.renderer.CONTEXT_UID, e.webGLVersion !== 2) {
        var r = this.renderer.context.extensions.vertexArrayObject;
        z.PREFER_ENV === de.WEBGL_LEGACY && (r = null), r ? (t.createVertexArray = function() {
          return r.createVertexArrayOES();
        }, t.bindVertexArray = function(s) {
          return r.bindVertexArrayOES(s);
        }, t.deleteVertexArray = function(s) {
          return r.deleteVertexArrayOES(s);
        }) : (this.hasVao = !1, t.createVertexArray = function() {
          return null;
        }, t.bindVertexArray = function() {
          return null;
        }, t.deleteVertexArray = function() {
          return null;
        });
      }
      if (e.webGLVersion !== 2) {
        var n = t.getExtension("ANGLE_instanced_arrays");
        n ? (t.vertexAttribDivisor = function(s, a) {
          return n.vertexAttribDivisorANGLE(s, a);
        }, t.drawElementsInstanced = function(s, a, o, h, u) {
          return n.drawElementsInstancedANGLE(s, a, o, h, u);
        }, t.drawArraysInstanced = function(s, a, o, h) {
          return n.drawArraysInstancedANGLE(s, a, o, h);
        }) : this.hasInstance = !1;
      }
      this.canUseUInt32ElementIndex = e.webGLVersion === 2 || !!e.extensions.uint32ElementIndex;
    }, i.prototype.bind = function(t, e) {
      e = e || this.renderer.shader.shader;
      var r = this.gl, n = t.glVertexArrayObjects[this.CONTEXT_UID], s = !1;
      n || (this.managedGeometries[t.id] = t, t.disposeRunner.add(this), t.glVertexArrayObjects[this.CONTEXT_UID] = n = {}, s = !0);
      var a = n[e.program.id] || this.initGeometryVao(t, e, s);
      this._activeGeometry = t, this._activeVao !== a && (this._activeVao = a, this.hasVao ? r.bindVertexArray(a) : this.activateVao(t, e.program)), this.updateBuffers();
    }, i.prototype.reset = function() {
      this.unbind();
    }, i.prototype.updateBuffers = function() {
      for (var t = this._activeGeometry, e = this.renderer.buffer, r = 0; r < t.buffers.length; r++) {
        var n = t.buffers[r];
        e.update(n);
      }
    }, i.prototype.checkCompatibility = function(t, e) {
      var r = t.attributes, n = e.attributeData;
      for (var s in n)
        if (!r[s])
          throw new Error('shader and geometry incompatible, geometry missing the "' + s + '" attribute');
    }, i.prototype.getSignature = function(t, e) {
      var r = t.attributes, n = e.attributeData, s = ["g", t.id];
      for (var a in r)
        n[a] && s.push(a, n[a].location);
      return s.join("-");
    }, i.prototype.initGeometryVao = function(t, e, r) {
      r === void 0 && (r = !0);
      var n = this.gl, s = this.CONTEXT_UID, a = this.renderer.buffer, o = e.program;
      o.glPrograms[s] || this.renderer.shader.generateProgram(e), this.checkCompatibility(t, o);
      var h = this.getSignature(t, o), u = t.glVertexArrayObjects[this.CONTEXT_UID], l = u[h];
      if (l)
        return u[o.id] = l, l;
      var f = t.buffers, c = t.attributes, d = {}, p = {};
      for (var v in f)
        d[v] = 0, p[v] = 0;
      for (var v in c)
        !c[v].size && o.attributeData[v] ? c[v].size = o.attributeData[v].size : c[v].size || console.warn("PIXI Geometry attribute '" + v + "' size cannot be determined (likely the bound shader does not have the attribute)"), d[c[v].buffer] += c[v].size * Gi[c[v].type];
      for (var v in c) {
        var _ = c[v], g = _.size;
        _.stride === void 0 && (d[_.buffer] === g * Gi[_.type] ? _.stride = 0 : _.stride = d[_.buffer]), _.start === void 0 && (_.start = p[_.buffer], p[_.buffer] += g * Gi[_.type]);
      }
      l = n.createVertexArray(), n.bindVertexArray(l);
      for (var I = 0; I < f.length; I++) {
        var E = f[I];
        a.bind(E), r && E._glBuffers[s].refCount++;
      }
      return this.activateVao(t, o), this._activeVao = l, u[o.id] = l, u[h] = l, l;
    }, i.prototype.disposeGeometry = function(t, e) {
      var r;
      if (this.managedGeometries[t.id]) {
        delete this.managedGeometries[t.id];
        var n = t.glVertexArrayObjects[this.CONTEXT_UID], s = this.gl, a = t.buffers, o = (r = this.renderer) === null || r === void 0 ? void 0 : r.buffer;
        if (t.disposeRunner.remove(this), !!n) {
          if (o)
            for (var h = 0; h < a.length; h++) {
              var u = a[h]._glBuffers[this.CONTEXT_UID];
              u && (u.refCount--, u.refCount === 0 && !e && o.dispose(a[h], e));
            }
          if (!e) {
            for (var l in n)
              if (l[0] === "g") {
                var f = n[l];
                this._activeVao === f && this.unbind(), s.deleteVertexArray(f);
              }
          }
          delete t.glVertexArrayObjects[this.CONTEXT_UID];
        }
      }
    }, i.prototype.disposeAll = function(t) {
      for (var e = Object.keys(this.managedGeometries), r = 0; r < e.length; r++)
        this.disposeGeometry(this.managedGeometries[e[r]], t);
    }, i.prototype.activateVao = function(t, e) {
      var r = this.gl, n = this.CONTEXT_UID, s = this.renderer.buffer, a = t.buffers, o = t.attributes;
      t.indexBuffer && s.bind(t.indexBuffer);
      var h = null;
      for (var u in o) {
        var l = o[u], f = a[l.buffer], c = f._glBuffers[n];
        if (e.attributeData[u]) {
          h !== c && (s.bind(f), h = c);
          var d = e.attributeData[u].location;
          if (r.enableVertexAttribArray(d), r.vertexAttribPointer(d, l.size, l.type || r.FLOAT, l.normalized, l.stride, l.start), l.instance)
            if (this.hasInstance)
              r.vertexAttribDivisor(d, 1);
            else
              throw new Error("geometry error, GPU Instancing is not supported on this device");
        }
      }
    }, i.prototype.draw = function(t, e, r, n) {
      var s = this.gl, a = this._activeGeometry;
      if (a.indexBuffer) {
        var o = a.indexBuffer.data.BYTES_PER_ELEMENT, h = o === 2 ? s.UNSIGNED_SHORT : s.UNSIGNED_INT;
        o === 2 || o === 4 && this.canUseUInt32ElementIndex ? a.instanced ? s.drawElementsInstanced(t, e || a.indexBuffer.data.length, h, (r || 0) * o, n || 1) : s.drawElements(t, e || a.indexBuffer.data.length, h, (r || 0) * o) : console.warn("unsupported index buffer type: uint32");
      } else a.instanced ? s.drawArraysInstanced(t, r, e || a.getSize(), n || 1) : s.drawArrays(t, r, e || a.getSize());
      return this;
    }, i.prototype.unbind = function() {
      this.gl.bindVertexArray(null), this._activeVao = null, this._activeGeometry = null;
    }, i.prototype.destroy = function() {
      this.renderer = null;
    }, i;
  }()
), po = (
  /** @class */
  function() {
    function i(t) {
      t === void 0 && (t = null), this.type = Pt.NONE, this.autoDetect = !0, this.maskObject = t || null, this.pooled = !1, this.isMaskData = !0, this.resolution = null, this.multisample = z.FILTER_MULTISAMPLE, this.enabled = !0, this.colorMask = 15, this._filters = null, this._stencilCounter = 0, this._scissorCounter = 0, this._scissorRect = null, this._scissorRectLocal = null, this._colorMask = 15, this._target = null;
    }
    return Object.defineProperty(i.prototype, "filter", {
      /**
       * The sprite mask filter.
       * If set to `null`, the default sprite mask filter is used.
       * @default null
       */
      get: function() {
        return this._filters ? this._filters[0] : null;
      },
      set: function(t) {
        t ? this._filters ? this._filters[0] = t : this._filters = [t] : this._filters = null;
      },
      enumerable: !1,
      configurable: !0
    }), i.prototype.reset = function() {
      this.pooled && (this.maskObject = null, this.type = Pt.NONE, this.autoDetect = !0), this._target = null, this._scissorRectLocal = null;
    }, i.prototype.copyCountersOrReset = function(t) {
      t ? (this._stencilCounter = t._stencilCounter, this._scissorCounter = t._scissorCounter, this._scissorRect = t._scissorRect) : (this._stencilCounter = 0, this._scissorCounter = 0, this._scissorRect = null);
    }, i;
  }()
);
function ha(i, t, e) {
  var r = i.createShader(t);
  return i.shaderSource(r, e), i.compileShader(r), r;
}
function ua(i, t) {
  var e = i.getShaderSource(t).split(`
`).map(function(u, l) {
    return l + ": " + u;
  }), r = i.getShaderInfoLog(t), n = r.split(`
`), s = {}, a = n.map(function(u) {
    return parseFloat(u.replace(/^ERROR\: 0\:([\d]+)\:.*$/, "$1"));
  }).filter(function(u) {
    return u && !s[u] ? (s[u] = !0, !0) : !1;
  }), o = [""];
  a.forEach(function(u) {
    e[u - 1] = "%c" + e[u - 1] + "%c", o.push("background: #FF0000; color:#FFFFFF; font-size: 10px", "font-size: 10px");
  });
  var h = e.join(`
`);
  o[0] = h, console.error(r), console.groupCollapsed("click to view full shader code"), console.warn.apply(console, o), console.groupEnd();
}
function sc(i, t, e, r) {
  i.getProgramParameter(t, i.LINK_STATUS) || (i.getShaderParameter(e, i.COMPILE_STATUS) || ua(i, e), i.getShaderParameter(r, i.COMPILE_STATUS) || ua(i, r), console.error("PixiJS Error: Could not initialize shader."), i.getProgramInfoLog(t) !== "" && console.warn("PixiJS Warning: gl.getProgramInfoLog()", i.getProgramInfoLog(t)));
}
function ji(i) {
  for (var t = new Array(i), e = 0; e < t.length; e++)
    t[e] = !1;
  return t;
}
function vo(i, t) {
  switch (i) {
    case "float":
      return 0;
    case "vec2":
      return new Float32Array(2 * t);
    case "vec3":
      return new Float32Array(3 * t);
    case "vec4":
      return new Float32Array(4 * t);
    case "int":
    case "uint":
    case "sampler2D":
    case "sampler2DArray":
      return 0;
    case "ivec2":
      return new Int32Array(2 * t);
    case "ivec3":
      return new Int32Array(3 * t);
    case "ivec4":
      return new Int32Array(4 * t);
    case "uvec2":
      return new Uint32Array(2 * t);
    case "uvec3":
      return new Uint32Array(3 * t);
    case "uvec4":
      return new Uint32Array(4 * t);
    case "bool":
      return !1;
    case "bvec2":
      return ji(2 * t);
    case "bvec3":
      return ji(3 * t);
    case "bvec4":
      return ji(4 * t);
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
var _o = {}, ir = _o;
function mo() {
  if (ir === _o || ir && ir.isContextLost()) {
    var i = z.ADAPTER.createCanvas(), t = void 0;
    z.PREFER_ENV >= de.WEBGL2 && (t = i.getContext("webgl2", {})), t || (t = i.getContext("webgl", {}) || i.getContext("experimental-webgl", {}), t ? t.getExtension("WEBGL_draw_buffers") : t = null), ir = t;
  }
  return ir;
}
var Nr;
function ac() {
  if (!Nr) {
    Nr = Ft.MEDIUM;
    var i = mo();
    if (i && i.getShaderPrecisionFormat) {
      var t = i.getShaderPrecisionFormat(i.FRAGMENT_SHADER, i.HIGH_FLOAT);
      Nr = t.precision ? Ft.HIGH : Ft.MEDIUM;
    }
  }
  return Nr;
}
function la(i, t, e) {
  if (i.substring(0, 9) !== "precision") {
    var r = t;
    return t === Ft.HIGH && e !== Ft.HIGH && (r = Ft.MEDIUM), "precision " + r + ` float;
` + i;
  } else if (e !== Ft.HIGH && i.substring(0, 15) === "precision highp")
    return i.replace("precision highp", "precision mediump");
  return i;
}
var oc = {
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
function go(i) {
  return oc[i];
}
var Dr = null, fa = {
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
function yo(i, t) {
  if (!Dr) {
    var e = Object.keys(fa);
    Dr = {};
    for (var r = 0; r < e.length; ++r) {
      var n = e[r];
      Dr[i[n]] = fa[n];
    }
  }
  return Dr[t];
}
var Le = [
  // a float cache layer
  {
    test: function(i) {
      return i.type === "float" && i.size === 1 && !i.isArray;
    },
    code: function(i) {
      return `
            if(uv["` + i + '"] !== ud["' + i + `"].value)
            {
                ud["` + i + '"].value = uv["' + i + `"]
                gl.uniform1f(ud["` + i + '"].location, uv["' + i + `"])
            }
            `;
    }
  },
  // handling samplers
  {
    test: function(i, t) {
      return (i.type === "sampler2D" || i.type === "samplerCube" || i.type === "sampler2DArray") && i.size === 1 && !i.isArray && (t == null || t.castToBaseTexture !== void 0);
    },
    code: function(i) {
      return `t = syncData.textureCount++;

            renderer.texture.bind(uv["` + i + `"], t);

            if(ud["` + i + `"].value !== t)
            {
                ud["` + i + `"].value = t;
                gl.uniform1i(ud["` + i + `"].location, t);
; // eslint-disable-line max-len
            }`;
    }
  },
  // uploading pixi matrix object to mat3
  {
    test: function(i, t) {
      return i.type === "mat3" && i.size === 1 && !i.isArray && t.a !== void 0;
    },
    code: function(i) {
      return `
            gl.uniformMatrix3fv(ud["` + i + '"].location, false, uv["' + i + `"].toArray(true));
            `;
    },
    codeUbo: function(i) {
      return `
                var ` + i + "_matrix = uv." + i + `.toArray(true);

                data[offset] = ` + i + `_matrix[0];
                data[offset+1] = ` + i + `_matrix[1];
                data[offset+2] = ` + i + `_matrix[2];
        
                data[offset + 4] = ` + i + `_matrix[3];
                data[offset + 5] = ` + i + `_matrix[4];
                data[offset + 6] = ` + i + `_matrix[5];
        
                data[offset + 8] = ` + i + `_matrix[6];
                data[offset + 9] = ` + i + `_matrix[7];
                data[offset + 10] = ` + i + `_matrix[8];
            `;
    }
  },
  // uploading a pixi point as a vec2 with caching layer
  {
    test: function(i, t) {
      return i.type === "vec2" && i.size === 1 && !i.isArray && t.x !== void 0;
    },
    code: function(i) {
      return `
                cv = ud["` + i + `"].value;
                v = uv["` + i + `"];

                if(cv[0] !== v.x || cv[1] !== v.y)
                {
                    cv[0] = v.x;
                    cv[1] = v.y;
                    gl.uniform2f(ud["` + i + `"].location, v.x, v.y);
                }`;
    },
    codeUbo: function(i) {
      return `
                v = uv.` + i + `;

                data[offset] = v.x;
                data[offset+1] = v.y;
            `;
    }
  },
  // caching layer for a vec2
  {
    test: function(i) {
      return i.type === "vec2" && i.size === 1 && !i.isArray;
    },
    code: function(i) {
      return `
                cv = ud["` + i + `"].value;
                v = uv["` + i + `"];

                if(cv[0] !== v[0] || cv[1] !== v[1])
                {
                    cv[0] = v[0];
                    cv[1] = v[1];
                    gl.uniform2f(ud["` + i + `"].location, v[0], v[1]);
                }
            `;
    }
  },
  // upload a pixi rectangle as a vec4 with caching layer
  {
    test: function(i, t) {
      return i.type === "vec4" && i.size === 1 && !i.isArray && t.width !== void 0;
    },
    code: function(i) {
      return `
                cv = ud["` + i + `"].value;
                v = uv["` + i + `"];

                if(cv[0] !== v.x || cv[1] !== v.y || cv[2] !== v.width || cv[3] !== v.height)
                {
                    cv[0] = v.x;
                    cv[1] = v.y;
                    cv[2] = v.width;
                    cv[3] = v.height;
                    gl.uniform4f(ud["` + i + `"].location, v.x, v.y, v.width, v.height)
                }`;
    },
    codeUbo: function(i) {
      return `
                    v = uv.` + i + `;

                    data[offset] = v.x;
                    data[offset+1] = v.y;
                    data[offset+2] = v.width;
                    data[offset+3] = v.height;
                `;
    }
  },
  // a caching layer for vec4 uploading
  {
    test: function(i) {
      return i.type === "vec4" && i.size === 1 && !i.isArray;
    },
    code: function(i) {
      return `
                cv = ud["` + i + `"].value;
                v = uv["` + i + `"];

                if(cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])
                {
                    cv[0] = v[0];
                    cv[1] = v[1];
                    cv[2] = v[2];
                    cv[3] = v[3];

                    gl.uniform4f(ud["` + i + `"].location, v[0], v[1], v[2], v[3])
                }`;
    }
  }
], hc = {
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
}, uc = {
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
function lc(i, t) {
  var e, r = [`
        var v = null;
        var cv = null;
        var cu = null;
        var t = 0;
        var gl = renderer.gl;
    `];
  for (var n in i.uniforms) {
    var s = t[n];
    if (!s) {
      !((e = i.uniforms[n]) === null || e === void 0) && e.group && (i.uniforms[n].ubo ? r.push(`
                        renderer.shader.syncUniformBufferGroup(uv.` + n + ", '" + n + `');
                    `) : r.push(`
                        renderer.shader.syncUniformGroup(uv.` + n + `, syncData);
                    `));
      continue;
    }
    for (var a = i.uniforms[n], o = !1, h = 0; h < Le.length; h++)
      if (Le[h].test(s, a)) {
        r.push(Le[h].code(n, a)), o = !0;
        break;
      }
    if (!o) {
      var u = s.size === 1 && !s.isArray ? hc : uc, l = u[s.type].replace("location", 'ud["' + n + '"].location');
      r.push(`
            cu = ud["` + n + `"];
            cv = cu.value;
            v = uv["` + n + `"];
            ` + l + ";");
    }
  }
  return new Function("ud", "uv", "renderer", "syncData", r.join(`
`));
}
var fc = [
  "precision mediump float;",
  "void main(void){",
  "float test = 0.1;",
  "%forloop%",
  "gl_FragColor = vec4(0.0);",
  "}"
].join(`
`);
function cc(i) {
  for (var t = "", e = 0; e < i; ++e)
    e > 0 && (t += `
else `), e < i - 1 && (t += "if(test == " + e + ".0){}");
  return t;
}
function bo(i, t) {
  if (i === 0)
    throw new Error("Invalid value of `0` passed to `checkMaxIfStatementsInShader`");
  for (var e = t.createShader(t.FRAGMENT_SHADER); ; ) {
    var r = fc.replace(/%forloop%/gi, cc(i));
    if (t.shaderSource(e, r), t.compileShader(e), !t.getShaderParameter(e, t.COMPILE_STATUS))
      i = i / 2 | 0;
    else
      break;
  }
  return i;
}
var nr;
function dc() {
  if (typeof nr == "boolean")
    return nr;
  try {
    var i = new Function("param1", "param2", "param3", "return param1[param2] === param3;");
    nr = i({ a: "b" }, "a", "b") === !0;
  } catch {
    nr = !1;
  }
  return nr;
}
var pc = `varying vec2 vTextureCoord;

uniform sampler2D uSampler;

void main(void){
   gl_FragColor *= texture2D(uSampler, vTextureCoord);
}`, vc = `attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;

void main(void){
   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
   vTextureCoord = aTextureCoord;
}
`, _c = 0, Lr = {}, Ke = (
  /** @class */
  function() {
    function i(t, e, r) {
      r === void 0 && (r = "pixi-shader"), this.id = _c++, this.vertexSrc = t || i.defaultVertexSrc, this.fragmentSrc = e || i.defaultFragmentSrc, this.vertexSrc = this.vertexSrc.trim(), this.fragmentSrc = this.fragmentSrc.trim(), this.vertexSrc.substring(0, 8) !== "#version" && (r = r.replace(/\s+/g, "-"), Lr[r] ? (Lr[r]++, r += "-" + Lr[r]) : Lr[r] = 1, this.vertexSrc = "#define SHADER_NAME " + r + `
` + this.vertexSrc, this.fragmentSrc = "#define SHADER_NAME " + r + `
` + this.fragmentSrc, this.vertexSrc = la(this.vertexSrc, z.PRECISION_VERTEX, Ft.HIGH), this.fragmentSrc = la(this.fragmentSrc, z.PRECISION_FRAGMENT, ac())), this.glPrograms = {}, this.syncUniforms = null;
    }
    return Object.defineProperty(i, "defaultVertexSrc", {
      /**
       * The default vertex shader source.
       * @constant
       */
      get: function() {
        return vc;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i, "defaultFragmentSrc", {
      /**
       * The default fragment shader source.
       * @constant
       */
      get: function() {
        return pc;
      },
      enumerable: !1,
      configurable: !0
    }), i.from = function(t, e, r) {
      var n = t + e, s = ra[n];
      return s || (ra[n] = s = new i(t, e, r)), s;
    }, i;
  }()
), ce = (
  /** @class */
  function() {
    function i(t, e) {
      this.uniformBindCount = 0, this.program = t, e ? e instanceof be ? this.uniformGroup = e : this.uniformGroup = new be(e) : this.uniformGroup = new be({}), this.disposeRunner = new Ot("disposeShader");
    }
    return i.prototype.checkUniformExists = function(t, e) {
      if (e.uniforms[t])
        return !0;
      for (var r in e.uniforms) {
        var n = e.uniforms[r];
        if (n.group && this.checkUniformExists(t, n))
          return !0;
      }
      return !1;
    }, i.prototype.destroy = function() {
      this.uniformGroup = null, this.disposeRunner.emit(this), this.disposeRunner.destroy();
    }, Object.defineProperty(i.prototype, "uniforms", {
      /**
       * Shader uniform values, shortcut for `uniformGroup.uniforms`.
       * @readonly
       */
      get: function() {
        return this.uniformGroup.uniforms;
      },
      enumerable: !1,
      configurable: !0
    }), i.from = function(t, e, r) {
      var n = Ke.from(t, e);
      return new i(n, r);
    }, i;
  }()
), Hi = 0, Xi = 1, zi = 2, Yi = 3, Wi = 4, Vi = 5, we = (
  /** @class */
  function() {
    function i() {
      this.data = 0, this.blendMode = q.NORMAL, this.polygonOffset = 0, this.blend = !0, this.depthMask = !0;
    }
    return Object.defineProperty(i.prototype, "blend", {
      /**
       * Activates blending of the computed fragment color values.
       * @default true
       */
      get: function() {
        return !!(this.data & 1 << Hi);
      },
      set: function(t) {
        !!(this.data & 1 << Hi) !== t && (this.data ^= 1 << Hi);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "offsets", {
      /**
       * Activates adding an offset to depth values of polygon's fragments
       * @default false
       */
      get: function() {
        return !!(this.data & 1 << Xi);
      },
      set: function(t) {
        !!(this.data & 1 << Xi) !== t && (this.data ^= 1 << Xi);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "culling", {
      /**
       * Activates culling of polygons.
       * @default false
       */
      get: function() {
        return !!(this.data & 1 << zi);
      },
      set: function(t) {
        !!(this.data & 1 << zi) !== t && (this.data ^= 1 << zi);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "depthTest", {
      /**
       * Activates depth comparisons and updates to the depth buffer.
       * @default false
       */
      get: function() {
        return !!(this.data & 1 << Yi);
      },
      set: function(t) {
        !!(this.data & 1 << Yi) !== t && (this.data ^= 1 << Yi);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "depthMask", {
      /**
       * Enables or disables writing to the depth buffer.
       * @default true
       */
      get: function() {
        return !!(this.data & 1 << Vi);
      },
      set: function(t) {
        !!(this.data & 1 << Vi) !== t && (this.data ^= 1 << Vi);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "clockwiseFrontFace", {
      /**
       * Specifies whether or not front or back-facing polygons can be culled.
       * @default false
       */
      get: function() {
        return !!(this.data & 1 << Wi);
      },
      set: function(t) {
        !!(this.data & 1 << Wi) !== t && (this.data ^= 1 << Wi);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "blendMode", {
      /**
       * The blend mode to be applied when this state is set. Apply a value of `PIXI.BLEND_MODES.NORMAL` to reset the blend mode.
       * Setting this mode to anything other than NO_BLEND will automatically switch blending on.
       * @default PIXI.BLEND_MODES.NORMAL
       */
      get: function() {
        return this._blendMode;
      },
      set: function(t) {
        this.blend = t !== q.NONE, this._blendMode = t;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "polygonOffset", {
      /**
       * The polygon offset. Setting this property to anything other than 0 will automatically enable polygon offset fill.
       * @default 0
       */
      get: function() {
        return this._polygonOffset;
      },
      set: function(t) {
        this.offsets = !!t, this._polygonOffset = t;
      },
      enumerable: !1,
      configurable: !0
    }), i.prototype.toString = function() {
      return "[@pixi/core:State " + ("blendMode=" + this.blendMode + " ") + ("clockwiseFrontFace=" + this.clockwiseFrontFace + " ") + ("culling=" + this.culling + " ") + ("depthMask=" + this.depthMask + " ") + ("polygonOffset=" + this.polygonOffset) + "]";
    }, i.for2d = function() {
      var t = new i();
      return t.depthTest = !1, t.blend = !0, t;
    }, i;
  }()
), mc = `varying vec2 vTextureCoord;

uniform sampler2D uSampler;

void main(void){
   gl_FragColor = texture2D(uSampler, vTextureCoord);
}
`, gc = `attribute vec2 aVertexPosition;

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
`, ve = (
  /** @class */
  function(i) {
    _t(t, i);
    function t(e, r, n) {
      var s = this, a = Ke.from(e || t.defaultVertexSrc, r || t.defaultFragmentSrc);
      return s = i.call(this, a, n) || this, s.padding = 0, s.resolution = z.FILTER_RESOLUTION, s.multisample = z.FILTER_MULTISAMPLE, s.enabled = !0, s.autoFit = !0, s.state = new we(), s;
    }
    return t.prototype.apply = function(e, r, n, s, a) {
      e.applyFilter(this, r, n, s);
    }, Object.defineProperty(t.prototype, "blendMode", {
      /**
       * Sets the blend mode of the filter.
       * @default PIXI.BLEND_MODES.NORMAL
       */
      get: function() {
        return this.state.blendMode;
      },
      set: function(e) {
        this.state.blendMode = e;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "resolution", {
      /**
       * The resolution of the filter. Setting this to be lower will lower the quality but
       * increase the performance of the filter.
       */
      get: function() {
        return this._resolution;
      },
      set: function(e) {
        this._resolution = e;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t, "defaultVertexSrc", {
      /**
       * The default vertex shader source
       * @constant
       */
      get: function() {
        return gc;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t, "defaultFragmentSrc", {
      /**
       * The default fragment shader source
       * @constant
       */
      get: function() {
        return mc;
      },
      enumerable: !1,
      configurable: !0
    }), t;
  }(ce)
), yc = `attribute vec2 aVertexPosition;
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
`, bc = `varying vec2 vMaskCoord;
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
`, ca = new At(), Ii = (
  /** @class */
  function() {
    function i(t, e) {
      this._texture = t, this.mapCoord = new At(), this.uClampFrame = new Float32Array(4), this.uClampOffset = new Float32Array(2), this._textureID = -1, this._updateID = 0, this.clampOffset = 0, this.clampMargin = typeof e > "u" ? 0.5 : e, this.isSimple = !1;
    }
    return Object.defineProperty(i.prototype, "texture", {
      /** Texture property. */
      get: function() {
        return this._texture;
      },
      set: function(t) {
        this._texture = t, this._textureID = -1;
      },
      enumerable: !1,
      configurable: !0
    }), i.prototype.multiplyUvs = function(t, e) {
      e === void 0 && (e = t);
      for (var r = this.mapCoord, n = 0; n < t.length; n += 2) {
        var s = t[n], a = t[n + 1];
        e[n] = s * r.a + a * r.c + r.tx, e[n + 1] = s * r.b + a * r.d + r.ty;
      }
      return e;
    }, i.prototype.update = function(t) {
      var e = this._texture;
      if (!e || !e.valid || !t && this._textureID === e._updateID)
        return !1;
      this._textureID = e._updateID, this._updateID++;
      var r = e._uvs;
      this.mapCoord.set(r.x1 - r.x0, r.y1 - r.y0, r.x3 - r.x0, r.y3 - r.y0, r.x0, r.y0);
      var n = e.orig, s = e.trim;
      s && (ca.set(n.width / s.width, 0, 0, n.height / s.height, -s.x / s.width, -s.y / s.height), this.mapCoord.append(ca));
      var a = e.baseTexture, o = this.uClampFrame, h = this.clampMargin / a.resolution, u = this.clampOffset;
      return o[0] = (e._frame.x + h + u) / a.width, o[1] = (e._frame.y + h + u) / a.height, o[2] = (e._frame.x + e._frame.width - h + u) / a.width, o[3] = (e._frame.y + e._frame.height - h + u) / a.height, this.uClampOffset[0] = u / a.realWidth, this.uClampOffset[1] = u / a.realHeight, this.isSimple = e._frame.width === a.width && e._frame.height === a.height && e.rotate === 0, !0;
    }, i;
  }()
), xo = (
  /** @class */
  function(i) {
    _t(t, i);
    function t(e, r, n) {
      var s = this, a = null;
      return typeof e != "string" && r === void 0 && n === void 0 && (a = e, e = void 0, r = void 0, n = void 0), s = i.call(this, e || yc, r || bc, n) || this, s.maskSprite = a, s.maskMatrix = new At(), s;
    }
    return Object.defineProperty(t.prototype, "maskSprite", {
      /**
       * Sprite mask
       * @type {PIXI.DisplayObject}
       */
      get: function() {
        return this._maskSprite;
      },
      set: function(e) {
        this._maskSprite = e, this._maskSprite && (this._maskSprite.renderable = !1);
      },
      enumerable: !1,
      configurable: !0
    }), t.prototype.apply = function(e, r, n, s) {
      var a = this._maskSprite, o = a._texture;
      o.valid && (o.uvMatrix || (o.uvMatrix = new Ii(o, 0)), o.uvMatrix.update(), this.uniforms.npmAlpha = o.baseTexture.alphaMode ? 0 : 1, this.uniforms.mask = o, this.uniforms.otherMatrix = e.calculateSpriteMatrix(this.maskMatrix, a).prepend(o.uvMatrix.mapCoord), this.uniforms.alpha = a.worldAlpha, this.uniforms.maskClamp = o.uvMatrix.uClampFrame, e.applyFilter(this, r, n, s));
    }, t;
  }(ve)
), cs = (
  /** @class */
  function() {
    function i(t) {
      this.renderer = t, this.enableScissor = !0, this.alphaMaskPool = [], this.maskDataPool = [], this.maskStack = [], this.alphaMaskIndex = 0;
    }
    return i.prototype.setMaskStack = function(t) {
      this.maskStack = t, this.renderer.scissor.setMaskStack(t), this.renderer.stencil.setMaskStack(t);
    }, i.prototype.push = function(t, e) {
      var r = e;
      if (!r.isMaskData) {
        var n = this.maskDataPool.pop() || new po();
        n.pooled = !0, n.maskObject = e, r = n;
      }
      var s = this.maskStack.length !== 0 ? this.maskStack[this.maskStack.length - 1] : null;
      if (r.copyCountersOrReset(s), r._colorMask = s ? s._colorMask : 15, r.autoDetect && this.detect(r), r._target = t, r.type !== Pt.SPRITE && this.maskStack.push(r), r.enabled)
        switch (r.type) {
          case Pt.SCISSOR:
            this.renderer.scissor.push(r);
            break;
          case Pt.STENCIL:
            this.renderer.stencil.push(r);
            break;
          case Pt.SPRITE:
            r.copyCountersOrReset(null), this.pushSpriteMask(r);
            break;
          case Pt.COLOR:
            this.pushColorMask(r);
            break;
        }
      r.type === Pt.SPRITE && this.maskStack.push(r);
    }, i.prototype.pop = function(t) {
      var e = this.maskStack.pop();
      if (!(!e || e._target !== t)) {
        if (e.enabled)
          switch (e.type) {
            case Pt.SCISSOR:
              this.renderer.scissor.pop(e);
              break;
            case Pt.STENCIL:
              this.renderer.stencil.pop(e.maskObject);
              break;
            case Pt.SPRITE:
              this.popSpriteMask(e);
              break;
            case Pt.COLOR:
              this.popColorMask(e);
              break;
          }
        if (e.reset(), e.pooled && this.maskDataPool.push(e), this.maskStack.length !== 0) {
          var r = this.maskStack[this.maskStack.length - 1];
          r.type === Pt.SPRITE && r._filters && (r._filters[0].maskSprite = r.maskObject);
        }
      }
    }, i.prototype.detect = function(t) {
      var e = t.maskObject;
      e ? e.isSprite ? t.type = Pt.SPRITE : this.enableScissor && this.renderer.scissor.testScissor(t) ? t.type = Pt.SCISSOR : t.type = Pt.STENCIL : t.type = Pt.COLOR;
    }, i.prototype.pushSpriteMask = function(t) {
      var e, r, n = t.maskObject, s = t._target, a = t._filters;
      a || (a = this.alphaMaskPool[this.alphaMaskIndex], a || (a = this.alphaMaskPool[this.alphaMaskIndex] = [new xo()]));
      var o = this.renderer, h = o.renderTexture, u, l;
      if (h.current) {
        var f = h.current;
        u = t.resolution || f.resolution, l = (e = t.multisample) !== null && e !== void 0 ? e : f.multisample;
      } else
        u = t.resolution || o.resolution, l = (r = t.multisample) !== null && r !== void 0 ? r : o.multisample;
      a[0].resolution = u, a[0].multisample = l, a[0].maskSprite = n;
      var c = s.filterArea;
      s.filterArea = n.getBounds(!0), o.filter.push(s, a), s.filterArea = c, t._filters || this.alphaMaskIndex++;
    }, i.prototype.popSpriteMask = function(t) {
      this.renderer.filter.pop(), t._filters ? t._filters[0].maskSprite = null : (this.alphaMaskIndex--, this.alphaMaskPool[this.alphaMaskIndex][0].maskSprite = null);
    }, i.prototype.pushColorMask = function(t) {
      var e = t._colorMask, r = t._colorMask = e & t.colorMask;
      r !== e && this.renderer.gl.colorMask((r & 1) !== 0, (r & 2) !== 0, (r & 4) !== 0, (r & 8) !== 0);
    }, i.prototype.popColorMask = function(t) {
      var e = t._colorMask, r = this.maskStack.length > 0 ? this.maskStack[this.maskStack.length - 1]._colorMask : 15;
      r !== e && this.renderer.gl.colorMask((r & 1) !== 0, (r & 2) !== 0, (r & 4) !== 0, (r & 8) !== 0);
    }, i.prototype.destroy = function() {
      this.renderer = null;
    }, i;
  }()
), To = (
  /** @class */
  function() {
    function i(t) {
      this.renderer = t, this.maskStack = [], this.glConst = 0;
    }
    return i.prototype.getStackLength = function() {
      return this.maskStack.length;
    }, i.prototype.setMaskStack = function(t) {
      var e = this.renderer.gl, r = this.getStackLength();
      this.maskStack = t;
      var n = this.getStackLength();
      n !== r && (n === 0 ? e.disable(this.glConst) : (e.enable(this.glConst), this._useCurrent()));
    }, i.prototype._useCurrent = function() {
    }, i.prototype.destroy = function() {
      this.renderer = null, this.maskStack = null;
    }, i;
  }()
), da = new At(), pa = [], ds = (
  /** @class */
  function(i) {
    _t(t, i);
    function t(e) {
      var r = i.call(this, e) || this;
      return r.glConst = z.ADAPTER.getWebGLRenderingContext().SCISSOR_TEST, r;
    }
    return t.prototype.getStackLength = function() {
      var e = this.maskStack[this.maskStack.length - 1];
      return e ? e._scissorCounter : 0;
    }, t.prototype.calcScissorRect = function(e) {
      var r;
      if (!e._scissorRectLocal) {
        var n = e._scissorRect, s = e.maskObject, a = this.renderer, o = a.renderTexture, h = s.getBounds(!0, (r = pa.pop()) !== null && r !== void 0 ? r : new ht());
        this.roundFrameToPixels(h, o.current ? o.current.resolution : a.resolution, o.sourceFrame, o.destinationFrame, a.projection.transform), n && h.fit(n), e._scissorRectLocal = h;
      }
    }, t.isMatrixRotated = function(e) {
      if (!e)
        return !1;
      var r = e.a, n = e.b, s = e.c, a = e.d;
      return (Math.abs(n) > 1e-4 || Math.abs(s) > 1e-4) && (Math.abs(r) > 1e-4 || Math.abs(a) > 1e-4);
    }, t.prototype.testScissor = function(e) {
      var r = e.maskObject;
      if (!r.isFastRect || !r.isFastRect() || t.isMatrixRotated(r.worldTransform) || t.isMatrixRotated(this.renderer.projection.transform))
        return !1;
      this.calcScissorRect(e);
      var n = e._scissorRectLocal;
      return n.width > 0 && n.height > 0;
    }, t.prototype.roundFrameToPixels = function(e, r, n, s, a) {
      t.isMatrixRotated(a) || (a = a ? da.copyFrom(a) : da.identity(), a.translate(-n.x, -n.y).scale(s.width / n.width, s.height / n.height).translate(s.x, s.y), this.renderer.filter.transformAABB(a, e), e.fit(s), e.x = Math.round(e.x * r), e.y = Math.round(e.y * r), e.width = Math.round(e.width * r), e.height = Math.round(e.height * r));
    }, t.prototype.push = function(e) {
      e._scissorRectLocal || this.calcScissorRect(e);
      var r = this.renderer.gl;
      e._scissorRect || r.enable(r.SCISSOR_TEST), e._scissorCounter++, e._scissorRect = e._scissorRectLocal, this._useCurrent();
    }, t.prototype.pop = function(e) {
      var r = this.renderer.gl;
      e && pa.push(e._scissorRectLocal), this.getStackLength() > 0 ? this._useCurrent() : r.disable(r.SCISSOR_TEST);
    }, t.prototype._useCurrent = function() {
      var e = this.maskStack[this.maskStack.length - 1]._scissorRect, r;
      this.renderer.renderTexture.current ? r = e.y : r = this.renderer.height - e.height - e.y, this.renderer.gl.scissor(e.x, r, e.width, e.height);
    }, t;
  }(To)
), ps = (
  /** @class */
  function(i) {
    _t(t, i);
    function t(e) {
      var r = i.call(this, e) || this;
      return r.glConst = z.ADAPTER.getWebGLRenderingContext().STENCIL_TEST, r;
    }
    return t.prototype.getStackLength = function() {
      var e = this.maskStack[this.maskStack.length - 1];
      return e ? e._stencilCounter : 0;
    }, t.prototype.push = function(e) {
      var r = e.maskObject, n = this.renderer.gl, s = e._stencilCounter;
      s === 0 && (this.renderer.framebuffer.forceStencil(), n.clearStencil(0), n.clear(n.STENCIL_BUFFER_BIT), n.enable(n.STENCIL_TEST)), e._stencilCounter++;
      var a = e._colorMask;
      a !== 0 && (e._colorMask = 0, n.colorMask(!1, !1, !1, !1)), n.stencilFunc(n.EQUAL, s, 4294967295), n.stencilOp(n.KEEP, n.KEEP, n.INCR), r.renderable = !0, r.render(this.renderer), this.renderer.batch.flush(), r.renderable = !1, a !== 0 && (e._colorMask = a, n.colorMask((a & 1) !== 0, (a & 2) !== 0, (a & 4) !== 0, (a & 8) !== 0)), this._useCurrent();
    }, t.prototype.pop = function(e) {
      var r = this.renderer.gl;
      if (this.getStackLength() === 0)
        r.disable(r.STENCIL_TEST);
      else {
        var n = this.maskStack.length !== 0 ? this.maskStack[this.maskStack.length - 1] : null, s = n ? n._colorMask : 15;
        s !== 0 && (n._colorMask = 0, r.colorMask(!1, !1, !1, !1)), r.stencilOp(r.KEEP, r.KEEP, r.DECR), e.renderable = !0, e.render(this.renderer), this.renderer.batch.flush(), e.renderable = !1, s !== 0 && (n._colorMask = s, r.colorMask((s & 1) !== 0, (s & 2) !== 0, (s & 4) !== 0, (s & 8) !== 0)), this._useCurrent();
      }
    }, t.prototype._useCurrent = function() {
      var e = this.renderer.gl;
      e.stencilFunc(e.EQUAL, this.getStackLength(), 4294967295), e.stencilOp(e.KEEP, e.KEEP, e.KEEP);
    }, t;
  }(To)
), vs = (
  /** @class */
  function() {
    function i(t) {
      this.renderer = t, this.destinationFrame = null, this.sourceFrame = null, this.defaultFrame = null, this.projectionMatrix = new At(), this.transform = null;
    }
    return i.prototype.update = function(t, e, r, n) {
      this.destinationFrame = t || this.destinationFrame || this.defaultFrame, this.sourceFrame = e || this.sourceFrame || t, this.calculateProjection(this.destinationFrame, this.sourceFrame, r, n), this.transform && this.projectionMatrix.append(this.transform);
      var s = this.renderer;
      s.globalUniforms.uniforms.projectionMatrix = this.projectionMatrix, s.globalUniforms.update(), s.shader.shader && s.shader.syncUniformGroup(s.shader.shader.uniforms.globals);
    }, i.prototype.calculateProjection = function(t, e, r, n) {
      var s = this.projectionMatrix, a = n ? -1 : 1;
      s.identity(), s.a = 1 / e.width * 2, s.d = a * (1 / e.height * 2), s.tx = -1 - e.x * s.a, s.ty = -a - e.y * s.d;
    }, i.prototype.setTransform = function(t) {
    }, i.prototype.destroy = function() {
      this.renderer = null;
    }, i;
  }()
), Se = new ht(), sr = new ht(), _s = (
  /** @class */
  function() {
    function i(t) {
      this.renderer = t, this.clearColor = t._backgroundColorRgba, this.defaultMaskStack = [], this.current = null, this.sourceFrame = new ht(), this.destinationFrame = new ht(), this.viewportFrame = new ht();
    }
    return i.prototype.bind = function(t, e, r) {
      t === void 0 && (t = null);
      var n = this.renderer;
      this.current = t;
      var s, a, o;
      t ? (s = t.baseTexture, o = s.resolution, e || (Se.width = t.frame.width, Se.height = t.frame.height, e = Se), r || (sr.x = t.frame.x, sr.y = t.frame.y, sr.width = e.width, sr.height = e.height, r = sr), a = s.framebuffer) : (o = n.resolution, e || (Se.width = n.screen.width, Se.height = n.screen.height, e = Se), r || (r = Se, r.width = e.width, r.height = e.height));
      var h = this.viewportFrame;
      h.x = r.x * o, h.y = r.y * o, h.width = r.width * o, h.height = r.height * o, t || (h.y = n.view.height - (h.y + h.height)), h.ceil(), this.renderer.framebuffer.bind(a, h), this.renderer.projection.update(r, e, o, !a), t ? this.renderer.mask.setMaskStack(s.maskStack) : this.renderer.mask.setMaskStack(this.defaultMaskStack), this.sourceFrame.copyFrom(e), this.destinationFrame.copyFrom(r);
    }, i.prototype.clear = function(t, e) {
      this.current ? t = t || this.current.baseTexture.clearColor : t = t || this.clearColor;
      var r = this.destinationFrame, n = this.current ? this.current.baseTexture : this.renderer.screen, s = r.width !== n.width || r.height !== n.height;
      if (s) {
        var a = this.viewportFrame, o = a.x, h = a.y, u = a.width, l = a.height;
        o = Math.round(o), h = Math.round(h), u = Math.round(u), l = Math.round(l), this.renderer.gl.enable(this.renderer.gl.SCISSOR_TEST), this.renderer.gl.scissor(o, h, u, l);
      }
      this.renderer.framebuffer.clear(t[0], t[1], t[2], t[3], e), s && this.renderer.scissor.pop();
    }, i.prototype.resize = function() {
      this.bind(null);
    }, i.prototype.reset = function() {
      this.bind(null);
    }, i.prototype.destroy = function() {
      this.renderer = null;
    }, i;
  }()
);
function xc(i, t, e, r, n) {
  e.buffer.update(n);
}
var Tc = {
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
}, Eo = {
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
function wo(i) {
  for (var t = i.map(function(h) {
    return {
      data: h,
      offset: 0,
      dataLen: 0,
      dirty: 0
    };
  }), e = 0, r = 0, n = 0, s = 0; s < t.length; s++) {
    var a = t[s];
    if (e = Eo[a.data.type], a.data.size > 1 && (e = Math.max(e, 16) * a.data.size), a.dataLen = e, r % e !== 0 && r < 16) {
      var o = r % e % 16;
      r += o, n += o;
    }
    r + e > 16 ? (n = Math.ceil(n / 16) * 16, a.offset = n, n += e, r = e) : (a.offset = n, r += e, n += e);
  }
  return n = Math.ceil(n / 16) * 16, { uboElements: t, size: n };
}
function So(i, t) {
  var e = [];
  for (var r in i)
    t[r] && e.push(t[r]);
  return e.sort(function(n, s) {
    return n.index - s.index;
  }), e;
}
function Io(i, t) {
  if (!i.autoManage)
    return { size: 0, syncFunc: xc };
  for (var e = So(i.uniforms, t), r = wo(e), n = r.uboElements, s = r.size, a = [`
    var v = null;
    var v2 = null;
    var cv = null;
    var t = 0;
    var gl = renderer.gl
    var index = 0;
    var data = buffer.data;
    `], o = 0; o < n.length; o++) {
    for (var h = n[o], u = i.uniforms[h.data.name], l = h.data.name, f = !1, c = 0; c < Le.length; c++) {
      var d = Le[c];
      if (d.codeUbo && d.test(h.data, u)) {
        a.push("offset = " + h.offset / 4 + ";", Le[c].codeUbo(h.data.name, u)), f = !0;
        break;
      }
    }
    if (!f)
      if (h.data.size > 1) {
        var p = go(h.data.type), v = Math.max(Eo[h.data.type] / 16, 1), _ = p / v, g = (4 - _ % 4) % 4;
        a.push(`
                cv = ud.` + l + `.value;
                v = uv.` + l + `;
                offset = ` + h.offset / 4 + `;

                t = 0;

                for(var i=0; i < ` + h.data.size * v + `; i++)
                {
                    for(var j = 0; j < ` + _ + `; j++)
                    {
                        data[offset++] = v[t++];
                    }
                    offset += ` + g + `;
                }

                `);
      } else {
        var I = Tc[h.data.type];
        a.push(`
                cv = ud.` + l + `.value;
                v = uv.` + l + `;
                offset = ` + h.offset / 4 + `;
                ` + I + `;
                `);
      }
  }
  return a.push(`
       renderer.buffer.update(buffer);
    `), {
    size: s,
    // eslint-disable-next-line no-new-func
    syncFunc: new Function("ud", "uv", "renderer", "syncData", "buffer", a.join(`
`))
  };
}
var Ec = (
  /** @class */
  /* @__PURE__ */ function() {
    function i() {
    }
    return i;
  }()
), Po = (
  /** @class */
  function() {
    function i(t, e) {
      this.program = t, this.uniformData = e, this.uniformGroups = {}, this.uniformDirtyGroups = {}, this.uniformBufferBindings = {};
    }
    return i.prototype.destroy = function() {
      this.uniformData = null, this.uniformGroups = null, this.uniformDirtyGroups = null, this.uniformBufferBindings = null, this.program = null;
    }, i;
  }()
);
function wc(i, t) {
  for (var e = {}, r = t.getProgramParameter(i, t.ACTIVE_ATTRIBUTES), n = 0; n < r; n++) {
    var s = t.getActiveAttrib(i, n);
    if (s.name.indexOf("gl_") !== 0) {
      var a = yo(t, s.type), o = {
        type: a,
        name: s.name,
        size: go(a),
        location: t.getAttribLocation(i, s.name)
      };
      e[s.name] = o;
    }
  }
  return e;
}
function Sc(i, t) {
  for (var e = {}, r = t.getProgramParameter(i, t.ACTIVE_UNIFORMS), n = 0; n < r; n++) {
    var s = t.getActiveUniform(i, n), a = s.name.replace(/\[.*?\]$/, ""), o = !!s.name.match(/\[.*?\]$/), h = yo(t, s.type);
    e[a] = {
      name: a,
      index: n,
      type: h,
      size: s.size,
      isArray: o,
      value: vo(h, s.size)
    };
  }
  return e;
}
function Mo(i, t) {
  var e = ha(i, i.VERTEX_SHADER, t.vertexSrc), r = ha(i, i.FRAGMENT_SHADER, t.fragmentSrc), n = i.createProgram();
  if (i.attachShader(n, e), i.attachShader(n, r), i.linkProgram(n), i.getProgramParameter(n, i.LINK_STATUS) || sc(i, n, e, r), t.attributeData = wc(n, i), t.uniformData = Sc(n, i), !/^[ \t]*#[ \t]*version[ \t]+300[ \t]+es[ \t]*$/m.test(t.vertexSrc)) {
    var s = Object.keys(t.attributeData);
    s.sort(function(l, f) {
      return l > f ? 1 : -1;
    });
    for (var a = 0; a < s.length; a++)
      t.attributeData[s[a]].location = a, i.bindAttribLocation(n, a, s[a]);
    i.linkProgram(n);
  }
  i.deleteShader(e), i.deleteShader(r);
  var o = {};
  for (var a in t.uniformData) {
    var h = t.uniformData[a];
    o[a] = {
      location: i.getUniformLocation(n, a),
      value: vo(h.type, h.size)
    };
  }
  var u = new Po(n, o);
  return u;
}
var Ic = 0, Br = { textureCount: 0, uboCount: 0 }, ms = (
  /** @class */
  function() {
    function i(t) {
      this.destroyed = !1, this.renderer = t, this.systemCheck(), this.gl = null, this.shader = null, this.program = null, this.cache = {}, this._uboCache = {}, this.id = Ic++;
    }
    return i.prototype.systemCheck = function() {
      if (!dc())
        throw new Error("Current environment does not allow unsafe-eval, please use @pixi/unsafe-eval module to enable support.");
    }, i.prototype.contextChange = function(t) {
      this.gl = t, this.reset();
    }, i.prototype.bind = function(t, e) {
      t.disposeRunner.add(this), t.uniforms.globals = this.renderer.globalUniforms;
      var r = t.program, n = r.glPrograms[this.renderer.CONTEXT_UID] || this.generateProgram(t);
      return this.shader = t, this.program !== r && (this.program = r, this.gl.useProgram(n.program)), e || (Br.textureCount = 0, Br.uboCount = 0, this.syncUniformGroup(t.uniformGroup, Br)), n;
    }, i.prototype.setUniforms = function(t) {
      var e = this.shader.program, r = e.glPrograms[this.renderer.CONTEXT_UID];
      e.syncUniforms(r.uniformData, t, this.renderer);
    }, i.prototype.syncUniformGroup = function(t, e) {
      var r = this.getGlProgram();
      (!t.static || t.dirtyId !== r.uniformDirtyGroups[t.id]) && (r.uniformDirtyGroups[t.id] = t.dirtyId, this.syncUniforms(t, r, e));
    }, i.prototype.syncUniforms = function(t, e, r) {
      var n = t.syncUniforms[this.shader.program.id] || this.createSyncGroups(t);
      n(e.uniformData, t.uniforms, this.renderer, r);
    }, i.prototype.createSyncGroups = function(t) {
      var e = this.getSignature(t, this.shader.program.uniformData, "u");
      return this.cache[e] || (this.cache[e] = lc(t, this.shader.program.uniformData)), t.syncUniforms[this.shader.program.id] = this.cache[e], t.syncUniforms[this.shader.program.id];
    }, i.prototype.syncUniformBufferGroup = function(t, e) {
      var r = this.getGlProgram();
      if (!t.static || t.dirtyId !== 0 || !r.uniformGroups[t.id]) {
        t.dirtyId = 0;
        var n = r.uniformGroups[t.id] || this.createSyncBufferGroup(t, r, e);
        t.buffer.update(), n(r.uniformData, t.uniforms, this.renderer, Br, t.buffer);
      }
      this.renderer.buffer.bindBufferBase(t.buffer, r.uniformBufferBindings[e]);
    }, i.prototype.createSyncBufferGroup = function(t, e, r) {
      var n = this.renderer.gl;
      this.renderer.buffer.bind(t.buffer);
      var s = this.gl.getUniformBlockIndex(e.program, r);
      e.uniformBufferBindings[r] = this.shader.uniformBindCount, n.uniformBlockBinding(e.program, s, this.shader.uniformBindCount), this.shader.uniformBindCount++;
      var a = this.getSignature(t, this.shader.program.uniformData, "ubo"), o = this._uboCache[a];
      if (o || (o = this._uboCache[a] = Io(t, this.shader.program.uniformData)), t.autoManage) {
        var h = new Float32Array(o.size / 4);
        t.buffer.update(h);
      }
      return e.uniformGroups[t.id] = o.syncFunc, e.uniformGroups[t.id];
    }, i.prototype.getSignature = function(t, e, r) {
      var n = t.uniforms, s = [r + "-"];
      for (var a in n)
        s.push(a), e[a] && s.push(e[a].type);
      return s.join("-");
    }, i.prototype.getGlProgram = function() {
      return this.shader ? this.shader.program.glPrograms[this.renderer.CONTEXT_UID] : null;
    }, i.prototype.generateProgram = function(t) {
      var e = this.gl, r = t.program, n = Mo(e, r);
      return r.glPrograms[this.renderer.CONTEXT_UID] = n, n;
    }, i.prototype.reset = function() {
      this.program = null, this.shader = null;
    }, i.prototype.disposeShader = function(t) {
      this.shader === t && (this.shader = null);
    }, i.prototype.destroy = function() {
      this.renderer = null, this.destroyed = !0;
    }, i;
  }()
);
function Pc(i, t) {
  return t === void 0 && (t = []), t[q.NORMAL] = [i.ONE, i.ONE_MINUS_SRC_ALPHA], t[q.ADD] = [i.ONE, i.ONE], t[q.MULTIPLY] = [i.DST_COLOR, i.ONE_MINUS_SRC_ALPHA, i.ONE, i.ONE_MINUS_SRC_ALPHA], t[q.SCREEN] = [i.ONE, i.ONE_MINUS_SRC_COLOR, i.ONE, i.ONE_MINUS_SRC_ALPHA], t[q.OVERLAY] = [i.ONE, i.ONE_MINUS_SRC_ALPHA], t[q.DARKEN] = [i.ONE, i.ONE_MINUS_SRC_ALPHA], t[q.LIGHTEN] = [i.ONE, i.ONE_MINUS_SRC_ALPHA], t[q.COLOR_DODGE] = [i.ONE, i.ONE_MINUS_SRC_ALPHA], t[q.COLOR_BURN] = [i.ONE, i.ONE_MINUS_SRC_ALPHA], t[q.HARD_LIGHT] = [i.ONE, i.ONE_MINUS_SRC_ALPHA], t[q.SOFT_LIGHT] = [i.ONE, i.ONE_MINUS_SRC_ALPHA], t[q.DIFFERENCE] = [i.ONE, i.ONE_MINUS_SRC_ALPHA], t[q.EXCLUSION] = [i.ONE, i.ONE_MINUS_SRC_ALPHA], t[q.HUE] = [i.ONE, i.ONE_MINUS_SRC_ALPHA], t[q.SATURATION] = [i.ONE, i.ONE_MINUS_SRC_ALPHA], t[q.COLOR] = [i.ONE, i.ONE_MINUS_SRC_ALPHA], t[q.LUMINOSITY] = [i.ONE, i.ONE_MINUS_SRC_ALPHA], t[q.NONE] = [0, 0], t[q.NORMAL_NPM] = [i.SRC_ALPHA, i.ONE_MINUS_SRC_ALPHA, i.ONE, i.ONE_MINUS_SRC_ALPHA], t[q.ADD_NPM] = [i.SRC_ALPHA, i.ONE, i.ONE, i.ONE], t[q.SCREEN_NPM] = [i.SRC_ALPHA, i.ONE_MINUS_SRC_COLOR, i.ONE, i.ONE_MINUS_SRC_ALPHA], t[q.SRC_IN] = [i.DST_ALPHA, i.ZERO], t[q.SRC_OUT] = [i.ONE_MINUS_DST_ALPHA, i.ZERO], t[q.SRC_ATOP] = [i.DST_ALPHA, i.ONE_MINUS_SRC_ALPHA], t[q.DST_OVER] = [i.ONE_MINUS_DST_ALPHA, i.ONE], t[q.DST_IN] = [i.ZERO, i.SRC_ALPHA], t[q.DST_OUT] = [i.ZERO, i.ONE_MINUS_SRC_ALPHA], t[q.DST_ATOP] = [i.ONE_MINUS_DST_ALPHA, i.SRC_ALPHA], t[q.XOR] = [i.ONE_MINUS_DST_ALPHA, i.ONE_MINUS_SRC_ALPHA], t[q.SUBTRACT] = [i.ONE, i.ONE, i.ONE, i.ONE, i.FUNC_REVERSE_SUBTRACT, i.FUNC_ADD], t;
}
var Mc = 0, Cc = 1, Ac = 2, Rc = 3, Oc = 4, Nc = 5, gs = (
  /** @class */
  function() {
    function i() {
      this.gl = null, this.stateId = 0, this.polygonOffset = 0, this.blendMode = q.NONE, this._blendEq = !1, this.map = [], this.map[Mc] = this.setBlend, this.map[Cc] = this.setOffset, this.map[Ac] = this.setCullFace, this.map[Rc] = this.setDepthTest, this.map[Oc] = this.setFrontFace, this.map[Nc] = this.setDepthMask, this.checks = [], this.defaultState = new we(), this.defaultState.blend = !0;
    }
    return i.prototype.contextChange = function(t) {
      this.gl = t, this.blendModes = Pc(t), this.set(this.defaultState), this.reset();
    }, i.prototype.set = function(t) {
      if (t = t || this.defaultState, this.stateId !== t.data) {
        for (var e = this.stateId ^ t.data, r = 0; e; )
          e & 1 && this.map[r].call(this, !!(t.data & 1 << r)), e = e >> 1, r++;
        this.stateId = t.data;
      }
      for (var r = 0; r < this.checks.length; r++)
        this.checks[r](this, t);
    }, i.prototype.forceState = function(t) {
      t = t || this.defaultState;
      for (var e = 0; e < this.map.length; e++)
        this.map[e].call(this, !!(t.data & 1 << e));
      for (var e = 0; e < this.checks.length; e++)
        this.checks[e](this, t);
      this.stateId = t.data;
    }, i.prototype.setBlend = function(t) {
      this.updateCheck(i.checkBlendMode, t), this.gl[t ? "enable" : "disable"](this.gl.BLEND);
    }, i.prototype.setOffset = function(t) {
      this.updateCheck(i.checkPolygonOffset, t), this.gl[t ? "enable" : "disable"](this.gl.POLYGON_OFFSET_FILL);
    }, i.prototype.setDepthTest = function(t) {
      this.gl[t ? "enable" : "disable"](this.gl.DEPTH_TEST);
    }, i.prototype.setDepthMask = function(t) {
      this.gl.depthMask(t);
    }, i.prototype.setCullFace = function(t) {
      this.gl[t ? "enable" : "disable"](this.gl.CULL_FACE);
    }, i.prototype.setFrontFace = function(t) {
      this.gl.frontFace(this.gl[t ? "CW" : "CCW"]);
    }, i.prototype.setBlendMode = function(t) {
      if (t !== this.blendMode) {
        this.blendMode = t;
        var e = this.blendModes[t], r = this.gl;
        e.length === 2 ? r.blendFunc(e[0], e[1]) : r.blendFuncSeparate(e[0], e[1], e[2], e[3]), e.length === 6 ? (this._blendEq = !0, r.blendEquationSeparate(e[4], e[5])) : this._blendEq && (this._blendEq = !1, r.blendEquationSeparate(r.FUNC_ADD, r.FUNC_ADD));
      }
    }, i.prototype.setPolygonOffset = function(t, e) {
      this.gl.polygonOffset(t, e);
    }, i.prototype.reset = function() {
      this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, !1), this.forceState(this.defaultState), this._blendEq = !0, this.blendMode = -1, this.setBlendMode(0);
    }, i.prototype.updateCheck = function(t, e) {
      var r = this.checks.indexOf(t);
      e && r === -1 ? this.checks.push(t) : !e && r !== -1 && this.checks.splice(r, 1);
    }, i.checkBlendMode = function(t, e) {
      t.setBlendMode(e.blendMode);
    }, i.checkPolygonOffset = function(t, e) {
      t.setPolygonOffset(1, e.polygonOffset);
    }, i.prototype.destroy = function() {
      this.gl = null;
    }, i;
  }()
), ys = (
  /** @class */
  function() {
    function i(t) {
      this.renderer = t, this.count = 0, this.checkCount = 0, this.maxIdle = z.GC_MAX_IDLE, this.checkCountMax = z.GC_MAX_CHECK_COUNT, this.mode = z.GC_MODE;
    }
    return i.prototype.postrender = function() {
      this.renderer.renderingToScreen && (this.count++, this.mode !== hi.MANUAL && (this.checkCount++, this.checkCount > this.checkCountMax && (this.checkCount = 0, this.run())));
    }, i.prototype.run = function() {
      for (var t = this.renderer.texture, e = t.managedTextures, r = !1, n = 0; n < e.length; n++) {
        var s = e[n];
        !s.framebuffer && this.count - s.touched > this.maxIdle && (t.destroyTexture(s, !0), e[n] = null, r = !0);
      }
      if (r) {
        for (var a = 0, n = 0; n < e.length; n++)
          e[n] !== null && (e[a++] = e[n]);
        e.length = a;
      }
    }, i.prototype.unload = function(t) {
      var e = this.renderer.texture, r = t._texture;
      r && !r.framebuffer && e.destroyTexture(r);
      for (var n = t.children.length - 1; n >= 0; n--)
        this.unload(t.children[n]);
    }, i.prototype.destroy = function() {
      this.renderer = null;
    }, i;
  }()
);
function Dc(i) {
  var t, e, r, n, s, a, o, h, u, l, f, c, d, p, v, _, g, I, E, B, P, A, R;
  return "WebGL2RenderingContext" in globalThis && i instanceof globalThis.WebGL2RenderingContext ? R = (t = {}, t[J.UNSIGNED_BYTE] = (e = {}, e[F.RGBA] = i.RGBA8, e[F.RGB] = i.RGB8, e[F.RG] = i.RG8, e[F.RED] = i.R8, e[F.RGBA_INTEGER] = i.RGBA8UI, e[F.RGB_INTEGER] = i.RGB8UI, e[F.RG_INTEGER] = i.RG8UI, e[F.RED_INTEGER] = i.R8UI, e[F.ALPHA] = i.ALPHA, e[F.LUMINANCE] = i.LUMINANCE, e[F.LUMINANCE_ALPHA] = i.LUMINANCE_ALPHA, e), t[J.BYTE] = (r = {}, r[F.RGBA] = i.RGBA8_SNORM, r[F.RGB] = i.RGB8_SNORM, r[F.RG] = i.RG8_SNORM, r[F.RED] = i.R8_SNORM, r[F.RGBA_INTEGER] = i.RGBA8I, r[F.RGB_INTEGER] = i.RGB8I, r[F.RG_INTEGER] = i.RG8I, r[F.RED_INTEGER] = i.R8I, r), t[J.UNSIGNED_SHORT] = (n = {}, n[F.RGBA_INTEGER] = i.RGBA16UI, n[F.RGB_INTEGER] = i.RGB16UI, n[F.RG_INTEGER] = i.RG16UI, n[F.RED_INTEGER] = i.R16UI, n[F.DEPTH_COMPONENT] = i.DEPTH_COMPONENT16, n), t[J.SHORT] = (s = {}, s[F.RGBA_INTEGER] = i.RGBA16I, s[F.RGB_INTEGER] = i.RGB16I, s[F.RG_INTEGER] = i.RG16I, s[F.RED_INTEGER] = i.R16I, s), t[J.UNSIGNED_INT] = (a = {}, a[F.RGBA_INTEGER] = i.RGBA32UI, a[F.RGB_INTEGER] = i.RGB32UI, a[F.RG_INTEGER] = i.RG32UI, a[F.RED_INTEGER] = i.R32UI, a[F.DEPTH_COMPONENT] = i.DEPTH_COMPONENT24, a), t[J.INT] = (o = {}, o[F.RGBA_INTEGER] = i.RGBA32I, o[F.RGB_INTEGER] = i.RGB32I, o[F.RG_INTEGER] = i.RG32I, o[F.RED_INTEGER] = i.R32I, o), t[J.FLOAT] = (h = {}, h[F.RGBA] = i.RGBA32F, h[F.RGB] = i.RGB32F, h[F.RG] = i.RG32F, h[F.RED] = i.R32F, h[F.DEPTH_COMPONENT] = i.DEPTH_COMPONENT32F, h), t[J.HALF_FLOAT] = (u = {}, u[F.RGBA] = i.RGBA16F, u[F.RGB] = i.RGB16F, u[F.RG] = i.RG16F, u[F.RED] = i.R16F, u), t[J.UNSIGNED_SHORT_5_6_5] = (l = {}, l[F.RGB] = i.RGB565, l), t[J.UNSIGNED_SHORT_4_4_4_4] = (f = {}, f[F.RGBA] = i.RGBA4, f), t[J.UNSIGNED_SHORT_5_5_5_1] = (c = {}, c[F.RGBA] = i.RGB5_A1, c), t[J.UNSIGNED_INT_2_10_10_10_REV] = (d = {}, d[F.RGBA] = i.RGB10_A2, d[F.RGBA_INTEGER] = i.RGB10_A2UI, d), t[J.UNSIGNED_INT_10F_11F_11F_REV] = (p = {}, p[F.RGB] = i.R11F_G11F_B10F, p), t[J.UNSIGNED_INT_5_9_9_9_REV] = (v = {}, v[F.RGB] = i.RGB9_E5, v), t[J.UNSIGNED_INT_24_8] = (_ = {}, _[F.DEPTH_STENCIL] = i.DEPTH24_STENCIL8, _), t[J.FLOAT_32_UNSIGNED_INT_24_8_REV] = (g = {}, g[F.DEPTH_STENCIL] = i.DEPTH32F_STENCIL8, g), t) : R = (I = {}, I[J.UNSIGNED_BYTE] = (E = {}, E[F.RGBA] = i.RGBA, E[F.RGB] = i.RGB, E[F.ALPHA] = i.ALPHA, E[F.LUMINANCE] = i.LUMINANCE, E[F.LUMINANCE_ALPHA] = i.LUMINANCE_ALPHA, E), I[J.UNSIGNED_SHORT_5_6_5] = (B = {}, B[F.RGB] = i.RGB, B), I[J.UNSIGNED_SHORT_4_4_4_4] = (P = {}, P[F.RGBA] = i.RGBA, P), I[J.UNSIGNED_SHORT_5_5_5_1] = (A = {}, A[F.RGBA] = i.RGBA, A), I), R;
}
var ti = (
  /** @class */
  /* @__PURE__ */ function() {
    function i(t) {
      this.texture = t, this.width = -1, this.height = -1, this.dirtyId = -1, this.dirtyStyleId = -1, this.mipmap = !1, this.wrapMode = 33071, this.type = J.UNSIGNED_BYTE, this.internalFormat = F.RGBA, this.samplerType = 0;
    }
    return i;
  }()
), bs = (
  /** @class */
  function() {
    function i(t) {
      this.renderer = t, this.boundTextures = [], this.currentLocation = -1, this.managedTextures = [], this._unknownBoundTextures = !1, this.unknownTexture = new ot(), this.hasIntegerTextures = !1;
    }
    return i.prototype.contextChange = function() {
      var t = this.gl = this.renderer.gl;
      this.CONTEXT_UID = this.renderer.CONTEXT_UID, this.webGLVersion = this.renderer.context.webGLVersion, this.internalFormats = Dc(t);
      var e = t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS);
      this.boundTextures.length = e;
      for (var r = 0; r < e; r++)
        this.boundTextures[r] = null;
      this.emptyTextures = {};
      var n = new ti(t.createTexture());
      t.bindTexture(t.TEXTURE_2D, n.texture), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, 1, 1, 0, t.RGBA, t.UNSIGNED_BYTE, new Uint8Array(4)), this.emptyTextures[t.TEXTURE_2D] = n, this.emptyTextures[t.TEXTURE_CUBE_MAP] = new ti(t.createTexture()), t.bindTexture(t.TEXTURE_CUBE_MAP, this.emptyTextures[t.TEXTURE_CUBE_MAP].texture);
      for (var r = 0; r < 6; r++)
        t.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X + r, 0, t.RGBA, 1, 1, 0, t.RGBA, t.UNSIGNED_BYTE, null);
      t.texParameteri(t.TEXTURE_CUBE_MAP, t.TEXTURE_MAG_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_CUBE_MAP, t.TEXTURE_MIN_FILTER, t.LINEAR);
      for (var r = 0; r < this.boundTextures.length; r++)
        this.bind(null, r);
    }, i.prototype.bind = function(t, e) {
      e === void 0 && (e = 0);
      var r = this.gl;
      if (t = t?.castToBaseTexture(), t && t.valid && !t.parentTextureArray) {
        t.touched = this.renderer.textureGC.count;
        var n = t._glTextures[this.CONTEXT_UID] || this.initTexture(t);
        this.boundTextures[e] !== t && (this.currentLocation !== e && (this.currentLocation = e, r.activeTexture(r.TEXTURE0 + e)), r.bindTexture(t.target, n.texture)), n.dirtyId !== t.dirtyId ? (this.currentLocation !== e && (this.currentLocation = e, r.activeTexture(r.TEXTURE0 + e)), this.updateTexture(t)) : n.dirtyStyleId !== t.dirtyStyleId && this.updateTextureStyle(t), this.boundTextures[e] = t;
      } else
        this.currentLocation !== e && (this.currentLocation = e, r.activeTexture(r.TEXTURE0 + e)), r.bindTexture(r.TEXTURE_2D, this.emptyTextures[r.TEXTURE_2D].texture), this.boundTextures[e] = null;
    }, i.prototype.reset = function() {
      this._unknownBoundTextures = !0, this.hasIntegerTextures = !1, this.currentLocation = -1;
      for (var t = 0; t < this.boundTextures.length; t++)
        this.boundTextures[t] = this.unknownTexture;
    }, i.prototype.unbind = function(t) {
      var e = this, r = e.gl, n = e.boundTextures;
      if (this._unknownBoundTextures) {
        this._unknownBoundTextures = !1;
        for (var s = 0; s < n.length; s++)
          n[s] === this.unknownTexture && this.bind(null, s);
      }
      for (var s = 0; s < n.length; s++)
        n[s] === t && (this.currentLocation !== s && (r.activeTexture(r.TEXTURE0 + s), this.currentLocation = s), r.bindTexture(t.target, this.emptyTextures[t.target].texture), n[s] = null);
    }, i.prototype.ensureSamplerType = function(t) {
      var e = this, r = e.boundTextures, n = e.hasIntegerTextures, s = e.CONTEXT_UID;
      if (n)
        for (var a = t - 1; a >= 0; --a) {
          var o = r[a];
          if (o) {
            var h = o._glTextures[s];
            h.samplerType !== oi.FLOAT && this.renderer.texture.unbind(o);
          }
        }
    }, i.prototype.initTexture = function(t) {
      var e = new ti(this.gl.createTexture());
      return e.dirtyId = -1, t._glTextures[this.CONTEXT_UID] = e, this.managedTextures.push(t), t.on("dispose", this.destroyTexture, this), e;
    }, i.prototype.initTextureType = function(t, e) {
      var r, n;
      e.internalFormat = (n = (r = this.internalFormats[t.type]) === null || r === void 0 ? void 0 : r[t.format]) !== null && n !== void 0 ? n : t.format, this.webGLVersion === 2 && t.type === J.HALF_FLOAT ? e.type = this.gl.HALF_FLOAT : e.type = t.type;
    }, i.prototype.updateTexture = function(t) {
      var e = t._glTextures[this.CONTEXT_UID];
      if (e) {
        var r = this.renderer;
        if (this.initTextureType(t, e), t.resource && t.resource.upload(r, t, e))
          e.samplerType !== oi.FLOAT && (this.hasIntegerTextures = !0);
        else {
          var n = t.realWidth, s = t.realHeight, a = r.gl;
          (e.width !== n || e.height !== s || e.dirtyId < 0) && (e.width = n, e.height = s, a.texImage2D(t.target, 0, e.internalFormat, n, s, 0, t.format, e.type, null));
        }
        t.dirtyStyleId !== e.dirtyStyleId && this.updateTextureStyle(t), e.dirtyId = t.dirtyId;
      }
    }, i.prototype.destroyTexture = function(t, e) {
      var r = this.gl;
      if (t = t.castToBaseTexture(), t._glTextures[this.CONTEXT_UID] && (this.unbind(t), r.deleteTexture(t._glTextures[this.CONTEXT_UID].texture), t.off("dispose", this.destroyTexture, this), delete t._glTextures[this.CONTEXT_UID], !e)) {
        var n = this.managedTextures.indexOf(t);
        n !== -1 && Ve(this.managedTextures, n, 1);
      }
    }, i.prototype.updateTextureStyle = function(t) {
      var e = t._glTextures[this.CONTEXT_UID];
      e && ((t.mipmap === Zt.POW2 || this.webGLVersion !== 2) && !t.isPowerOfTwo ? e.mipmap = !1 : e.mipmap = t.mipmap >= 1, this.webGLVersion !== 2 && !t.isPowerOfTwo ? e.wrapMode = Qt.CLAMP : e.wrapMode = t.wrapMode, t.resource && t.resource.style(this.renderer, t, e) || this.setStyle(t, e), e.dirtyStyleId = t.dirtyStyleId);
    }, i.prototype.setStyle = function(t, e) {
      var r = this.gl;
      if (e.mipmap && t.mipmap !== Zt.ON_MANUAL && r.generateMipmap(t.target), r.texParameteri(t.target, r.TEXTURE_WRAP_S, e.wrapMode), r.texParameteri(t.target, r.TEXTURE_WRAP_T, e.wrapMode), e.mipmap) {
        r.texParameteri(t.target, r.TEXTURE_MIN_FILTER, t.scaleMode === Jt.LINEAR ? r.LINEAR_MIPMAP_LINEAR : r.NEAREST_MIPMAP_NEAREST);
        var n = this.renderer.context.extensions.anisotropicFiltering;
        if (n && t.anisotropicLevel > 0 && t.scaleMode === Jt.LINEAR) {
          var s = Math.min(t.anisotropicLevel, r.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT));
          r.texParameterf(t.target, n.TEXTURE_MAX_ANISOTROPY_EXT, s);
        }
      } else
        r.texParameteri(t.target, r.TEXTURE_MIN_FILTER, t.scaleMode === Jt.LINEAR ? r.LINEAR : r.NEAREST);
      r.texParameteri(t.target, r.TEXTURE_MAG_FILTER, t.scaleMode === Jt.LINEAR ? r.LINEAR : r.NEAREST);
    }, i.prototype.destroy = function() {
      this.renderer = null;
    }, i;
  }()
), Co = {
  __proto__: null,
  FilterSystem: os,
  BatchSystem: hs,
  ContextSystem: us,
  FramebufferSystem: ls,
  GeometrySystem: fs,
  MaskSystem: cs,
  ScissorSystem: ds,
  StencilSystem: ps,
  ProjectionSystem: vs,
  RenderTextureSystem: _s,
  ShaderSystem: ms,
  StateSystem: gs,
  TextureGCSystem: ys,
  TextureSystem: bs
}, $i = new At(), Ao = (
  /** @class */
  function(i) {
    _t(t, i);
    function t(e, r) {
      e === void 0 && (e = _r.UNKNOWN);
      var n = i.call(this) || this;
      return r = Object.assign({}, z.RENDER_OPTIONS, r), n.options = r, n.type = e, n.screen = new ht(0, 0, r.width, r.height), n.view = r.view || z.ADAPTER.createCanvas(), n.resolution = r.resolution || z.RESOLUTION, n.useContextAlpha = r.useContextAlpha, n.autoDensity = !!r.autoDensity, n.preserveDrawingBuffer = r.preserveDrawingBuffer, n.clearBeforeRender = r.clearBeforeRender, n._backgroundColor = 0, n._backgroundColorRgba = [0, 0, 0, 1], n._backgroundColorString = "#000000", n.backgroundColor = r.backgroundColor || n._backgroundColor, n.backgroundAlpha = r.backgroundAlpha, r.transparent !== void 0 && (Bt("6.0.0", "Option transparent is deprecated, please use backgroundAlpha instead."), n.useContextAlpha = r.transparent, n.backgroundAlpha = r.transparent ? 0 : 1), n._lastObjectRendered = null, n.plugins = {}, n;
    }
    return t.prototype.initPlugins = function(e) {
      for (var r in e)
        this.plugins[r] = new e[r](this);
    }, Object.defineProperty(t.prototype, "width", {
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
    }), Object.defineProperty(t.prototype, "height", {
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
    }), t.prototype.resize = function(e, r) {
      this.view.width = Math.round(e * this.resolution), this.view.height = Math.round(r * this.resolution);
      var n = this.view.width / this.resolution, s = this.view.height / this.resolution;
      this.screen.width = n, this.screen.height = s, this.autoDensity && (this.view.style.width = n + "px", this.view.style.height = s + "px"), this.emit("resize", n, s);
    }, t.prototype.generateTexture = function(e, r, n, s) {
      r === void 0 && (r = {}), typeof r == "number" && (Bt("6.1.0", "generateTexture options (scaleMode, resolution, region) are now object options."), r = { scaleMode: r, resolution: n, region: s });
      var a = r.region, o = Zf(r, ["region"]);
      s = a || e.getLocalBounds(null, !0), s.width === 0 && (s.width = 1), s.height === 0 && (s.height = 1);
      var h = Ee.create(gn({ width: s.width, height: s.height }, o));
      return $i.tx = -s.x, $i.ty = -s.y, this.render(e, {
        renderTexture: h,
        clear: !1,
        transform: $i,
        skipUpdateTransform: !!e.parent
      }), h;
    }, t.prototype.destroy = function(e) {
      for (var r in this.plugins)
        this.plugins[r].destroy(), this.plugins[r] = null;
      e && this.view.parentNode && this.view.parentNode.removeChild(this.view);
      var n = this;
      n.plugins = null, n.type = _r.UNKNOWN, n.view = null, n.screen = null, n._tempDisplayObjectParent = null, n.options = null, this._backgroundColorRgba = null, this._backgroundColorString = null, this._lastObjectRendered = null;
    }, Object.defineProperty(t.prototype, "backgroundColor", {
      /**
       * The background color to fill if not transparent
       * @member {number}
       */
      get: function() {
        return this._backgroundColor;
      },
      set: function(e) {
        this._backgroundColor = e, this._backgroundColorString = Qa(e), $e(e, this._backgroundColorRgba);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "backgroundAlpha", {
      /**
       * The background color alpha. Setting this to 0 will make the canvas transparent.
       * @member {number}
       */
      get: function() {
        return this._backgroundColorRgba[3];
      },
      set: function(e) {
        this._backgroundColorRgba[3] = e;
      },
      enumerable: !1,
      configurable: !0
    }), t;
  }(qe)
), Lc = (
  /** @class */
  /* @__PURE__ */ function() {
    function i(t) {
      this.buffer = t || null, this.updateID = -1, this.byteLength = -1, this.refCount = 0;
    }
    return i;
  }()
), Bc = (
  /** @class */
  function() {
    function i(t) {
      this.renderer = t, this.managedBuffers = {}, this.boundBufferBases = {};
    }
    return i.prototype.destroy = function() {
      this.renderer = null;
    }, i.prototype.contextChange = function() {
      this.disposeAll(!0), this.gl = this.renderer.gl, this.CONTEXT_UID = this.renderer.CONTEXT_UID;
    }, i.prototype.bind = function(t) {
      var e = this, r = e.gl, n = e.CONTEXT_UID, s = t._glBuffers[n] || this.createGLBuffer(t);
      r.bindBuffer(t.type, s.buffer);
    }, i.prototype.bindBufferBase = function(t, e) {
      var r = this, n = r.gl, s = r.CONTEXT_UID;
      if (this.boundBufferBases[e] !== t) {
        var a = t._glBuffers[s] || this.createGLBuffer(t);
        this.boundBufferBases[e] = t, n.bindBufferBase(n.UNIFORM_BUFFER, e, a.buffer);
      }
    }, i.prototype.bindBufferRange = function(t, e, r) {
      var n = this, s = n.gl, a = n.CONTEXT_UID;
      r = r || 0;
      var o = t._glBuffers[a] || this.createGLBuffer(t);
      s.bindBufferRange(s.UNIFORM_BUFFER, e || 0, o.buffer, r * 256, 256);
    }, i.prototype.update = function(t) {
      var e = this, r = e.gl, n = e.CONTEXT_UID, s = t._glBuffers[n];
      if (t._updateID !== s.updateID)
        if (s.updateID = t._updateID, r.bindBuffer(t.type, s.buffer), s.byteLength >= t.data.byteLength)
          r.bufferSubData(t.type, 0, t.data);
        else {
          var a = t.static ? r.STATIC_DRAW : r.DYNAMIC_DRAW;
          s.byteLength = t.data.byteLength, r.bufferData(t.type, t.data, a);
        }
    }, i.prototype.dispose = function(t, e) {
      if (this.managedBuffers[t.id]) {
        delete this.managedBuffers[t.id];
        var r = t._glBuffers[this.CONTEXT_UID], n = this.gl;
        t.disposeRunner.remove(this), r && (e || n.deleteBuffer(r.buffer), delete t._glBuffers[this.CONTEXT_UID]);
      }
    }, i.prototype.disposeAll = function(t) {
      for (var e = Object.keys(this.managedBuffers), r = 0; r < e.length; r++)
        this.dispose(this.managedBuffers[e[r]], t);
    }, i.prototype.createGLBuffer = function(t) {
      var e = this, r = e.CONTEXT_UID, n = e.gl;
      return t._glBuffers[r] = new Lc(n.createBuffer()), this.managedBuffers[t.id] = t, t.disposeRunner.add(this), t._glBuffers[r];
    }, i;
  }()
), xs = (
  /** @class */
  function(i) {
    _t(t, i);
    function t(e) {
      var r = i.call(this, _r.WEBGL, e) || this;
      return e = r.options, r.gl = null, r.CONTEXT_UID = 0, r.runners = {
        destroy: new Ot("destroy"),
        contextChange: new Ot("contextChange"),
        reset: new Ot("reset"),
        update: new Ot("update"),
        postrender: new Ot("postrender"),
        prerender: new Ot("prerender"),
        resize: new Ot("resize")
      }, r.runners.contextChange.add(r), r.globalUniforms = new be({
        projectionMatrix: new At()
      }, !0), r.addSystem(cs, "mask").addSystem(us, "context").addSystem(gs, "state").addSystem(ms, "shader").addSystem(bs, "texture").addSystem(Bc, "buffer").addSystem(fs, "geometry").addSystem(ls, "framebuffer").addSystem(ds, "scissor").addSystem(ps, "stencil").addSystem(vs, "projection").addSystem(ys, "textureGC").addSystem(os, "filter").addSystem(_s, "renderTexture").addSystem(hs, "batch"), r.initPlugins(t.__plugins), r.multisample = void 0, e.context ? r.context.initFromContext(e.context) : r.context.initFromOptions({
        alpha: !!r.useContextAlpha,
        antialias: e.antialias,
        premultipliedAlpha: r.useContextAlpha && r.useContextAlpha !== "notMultiplied",
        stencil: !0,
        preserveDrawingBuffer: e.preserveDrawingBuffer,
        powerPreference: r.options.powerPreference
      }), r.renderingToScreen = !0, zh(r.context.webGLVersion === 2 ? "WebGL 2" : "WebGL 1"), r.resize(r.options.width, r.options.height), r;
    }
    return t.create = function(e) {
      if (Yh())
        return new t(e);
      throw new Error('WebGL unsupported in this browser, use "pixi.js-legacy" for fallback canvas2d support.');
    }, t.prototype.contextChange = function() {
      var e = this.gl, r;
      if (this.context.webGLVersion === 1) {
        var n = e.getParameter(e.FRAMEBUFFER_BINDING);
        e.bindFramebuffer(e.FRAMEBUFFER, null), r = e.getParameter(e.SAMPLES), e.bindFramebuffer(e.FRAMEBUFFER, n);
      } else {
        var n = e.getParameter(e.DRAW_FRAMEBUFFER_BINDING);
        e.bindFramebuffer(e.DRAW_FRAMEBUFFER, null), r = e.getParameter(e.SAMPLES), e.bindFramebuffer(e.DRAW_FRAMEBUFFER, n);
      }
      r >= bt.HIGH ? this.multisample = bt.HIGH : r >= bt.MEDIUM ? this.multisample = bt.MEDIUM : r >= bt.LOW ? this.multisample = bt.LOW : this.multisample = bt.NONE;
    }, t.prototype.addSystem = function(e, r) {
      var n = new e(this);
      if (this[r])
        throw new Error('Whoops! The name "' + r + '" is already in use');
      this[r] = n;
      for (var s in this.runners)
        this.runners[s].add(n);
      return this;
    }, t.prototype.render = function(e, r) {
      var n, s, a, o;
      if (r && (r instanceof Ee ? (Bt("6.0.0", "Renderer#render arguments changed, use options instead."), n = r, s = arguments[2], a = arguments[3], o = arguments[4]) : (n = r.renderTexture, s = r.clear, a = r.transform, o = r.skipUpdateTransform)), this.renderingToScreen = !n, this.runners.prerender.emit(), this.emit("prerender"), this.projection.transform = a, !this.context.isLost) {
        if (n || (this._lastObjectRendered = e), !o) {
          var h = e.enableTempParent();
          e.updateTransform(), e.disableTempParent(h);
        }
        this.renderTexture.bind(n), this.batch.currentRenderer.start(), (s !== void 0 ? s : this.clearBeforeRender) && this.renderTexture.clear(), e.render(this), this.batch.currentRenderer.flush(), n && n.baseTexture.update(), this.runners.postrender.emit(), this.projection.transform = null, this.emit("postrender");
      }
    }, t.prototype.generateTexture = function(e, r, n, s) {
      r === void 0 && (r = {});
      var a = i.prototype.generateTexture.call(this, e, r, n, s);
      return this.framebuffer.blit(), a;
    }, t.prototype.resize = function(e, r) {
      i.prototype.resize.call(this, e, r), this.runners.resize.emit(this.screen.height, this.screen.width);
    }, t.prototype.reset = function() {
      return this.runners.reset.emit(), this;
    }, t.prototype.clear = function() {
      this.renderTexture.bind(), this.renderTexture.clear();
    }, t.prototype.destroy = function(e) {
      this.runners.destroy.emit();
      for (var r in this.runners)
        this.runners[r].destroy();
      i.prototype.destroy.call(this, e), this.gl = null;
    }, Object.defineProperty(t.prototype, "extract", {
      /**
       * Please use `plugins.extract` instead.
       * @member {PIXI.Extract} extract
       * @deprecated since 6.0.0
       * @readonly
       */
      get: function() {
        return Bt("6.0.0", "Renderer#extract has been deprecated, please use Renderer#plugins.extract instead."), this.plugins.extract;
      },
      enumerable: !1,
      configurable: !0
    }), t.registerPlugin = function(e, r) {
      Bt("6.5.0", "Renderer.registerPlugin() has been deprecated, please use extensions.add() instead."), se.add({
        name: e,
        type: dt.RendererPlugin,
        ref: r
      });
    }, t.__plugins = {}, t;
  }(Ao)
);
se.handleByMap(dt.RendererPlugin, xs.__plugins);
function Ro(i) {
  return xs.create(i);
}
var Fc = `attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;

void main(void)
{
    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
    vTextureCoord = aTextureCoord;
}`, kc = `attribute vec2 aVertexPosition;

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
`, Oo = Fc, Ts = kc, Uc = (
  /** @class */
  function() {
    function i(t) {
      Bt("6.1.0", "System class is deprecated, implemement ISystem interface instead."), this.renderer = t;
    }
    return i.prototype.destroy = function() {
      this.renderer = null;
    }, i;
  }()
), pi = (
  /** @class */
  /* @__PURE__ */ function() {
    function i() {
      this.texArray = null, this.blend = 0, this.type = $t.TRIANGLES, this.start = 0, this.size = 0, this.data = null;
    }
    return i;
  }()
), vi = (
  /** @class */
  function() {
    function i() {
      this.elements = [], this.ids = [], this.count = 0;
    }
    return i.prototype.clear = function() {
      for (var t = 0; t < this.count; t++)
        this.elements[t] = null;
      this.count = 0;
    }, i;
  }()
), _i = (
  /** @class */
  function() {
    function i(t) {
      typeof t == "number" ? this.rawBinaryData = new ArrayBuffer(t) : t instanceof Uint8Array ? this.rawBinaryData = t.buffer : this.rawBinaryData = t, this.uint32View = new Uint32Array(this.rawBinaryData), this.float32View = new Float32Array(this.rawBinaryData);
    }
    return Object.defineProperty(i.prototype, "int8View", {
      /** View on the raw binary data as a `Int8Array`. */
      get: function() {
        return this._int8View || (this._int8View = new Int8Array(this.rawBinaryData)), this._int8View;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "uint8View", {
      /** View on the raw binary data as a `Uint8Array`. */
      get: function() {
        return this._uint8View || (this._uint8View = new Uint8Array(this.rawBinaryData)), this._uint8View;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "int16View", {
      /**  View on the raw binary data as a `Int16Array`. */
      get: function() {
        return this._int16View || (this._int16View = new Int16Array(this.rawBinaryData)), this._int16View;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "uint16View", {
      /** View on the raw binary data as a `Uint16Array`. */
      get: function() {
        return this._uint16View || (this._uint16View = new Uint16Array(this.rawBinaryData)), this._uint16View;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "int32View", {
      /** View on the raw binary data as a `Int32Array`. */
      get: function() {
        return this._int32View || (this._int32View = new Int32Array(this.rawBinaryData)), this._int32View;
      },
      enumerable: !1,
      configurable: !0
    }), i.prototype.view = function(t) {
      return this[t + "View"];
    }, i.prototype.destroy = function() {
      this.rawBinaryData = null, this._int8View = null, this._uint8View = null, this._int16View = null, this._uint16View = null, this._int32View = null, this.uint32View = null, this.float32View = null;
    }, i.sizeOf = function(t) {
      switch (t) {
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
          throw new Error(t + " isn't a valid view type");
      }
    }, i;
  }()
), No = (
  /** @class */
  function(i) {
    _t(t, i);
    function t(e) {
      var r = i.call(this, e) || this;
      return r.shaderGenerator = null, r.geometryClass = null, r.vertexSize = null, r.state = we.for2d(), r.size = z.SPRITE_BATCH_SIZE * 4, r._vertexCount = 0, r._indexCount = 0, r._bufferedElements = [], r._bufferedTextures = [], r._bufferSize = 0, r._shader = null, r._packedGeometries = [], r._packedGeometryPoolSize = 2, r._flushId = 0, r._aBuffers = {}, r._iBuffers = {}, r.MAX_TEXTURES = 1, r.renderer.on("prerender", r.onPrerender, r), e.runners.contextChange.add(r), r._dcIndex = 0, r._aIndex = 0, r._iIndex = 0, r._attributeBuffer = null, r._indexBuffer = null, r._tempBoundTextures = [], r;
    }
    return t.prototype.contextChange = function() {
      var e = this.renderer.gl;
      z.PREFER_ENV === de.WEBGL_LEGACY ? this.MAX_TEXTURES = 1 : (this.MAX_TEXTURES = Math.min(e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS), z.SPRITE_MAX_TEXTURES), this.MAX_TEXTURES = bo(this.MAX_TEXTURES, e)), this._shader = this.shaderGenerator.generateShader(this.MAX_TEXTURES);
      for (var r = 0; r < this._packedGeometryPoolSize; r++)
        this._packedGeometries[r] = new this.geometryClass();
      this.initFlushBuffers();
    }, t.prototype.initFlushBuffers = function() {
      for (var e = t._drawCallPool, r = t._textureArrayPool, n = this.size / 4, s = Math.floor(n / this.MAX_TEXTURES) + 1; e.length < n; )
        e.push(new pi());
      for (; r.length < s; )
        r.push(new vi());
      for (var a = 0; a < this.MAX_TEXTURES; a++)
        this._tempBoundTextures[a] = null;
    }, t.prototype.onPrerender = function() {
      this._flushId = 0;
    }, t.prototype.render = function(e) {
      e._texture.valid && (this._vertexCount + e.vertexData.length / 2 > this.size && this.flush(), this._vertexCount += e.vertexData.length / 2, this._indexCount += e.indices.length, this._bufferedTextures[this._bufferSize] = e._texture.baseTexture, this._bufferedElements[this._bufferSize++] = e);
    }, t.prototype.buildTexturesAndDrawCalls = function() {
      var e = this, r = e._bufferedTextures, n = e.MAX_TEXTURES, s = t._textureArrayPool, a = this.renderer.batch, o = this._tempBoundTextures, h = this.renderer.textureGC.count, u = ++ot._globalBatch, l = 0, f = s[0], c = 0;
      a.copyBoundTextures(o, n);
      for (var d = 0; d < this._bufferSize; ++d) {
        var p = r[d];
        r[d] = null, p._batchEnabled !== u && (f.count >= n && (a.boundArray(f, o, u, n), this.buildDrawCalls(f, c, d), c = d, f = s[++l], ++u), p._batchEnabled = u, p.touched = h, f.elements[f.count++] = p);
      }
      f.count > 0 && (a.boundArray(f, o, u, n), this.buildDrawCalls(f, c, this._bufferSize), ++l, ++u);
      for (var d = 0; d < o.length; d++)
        o[d] = null;
      ot._globalBatch = u;
    }, t.prototype.buildDrawCalls = function(e, r, n) {
      var s = this, a = s._bufferedElements, o = s._attributeBuffer, h = s._indexBuffer, u = s.vertexSize, l = t._drawCallPool, f = this._dcIndex, c = this._aIndex, d = this._iIndex, p = l[f];
      p.start = this._iIndex, p.texArray = e;
      for (var v = r; v < n; ++v) {
        var _ = a[v], g = _._texture.baseTexture, I = eo[g.alphaMode ? 1 : 0][_.blendMode];
        a[v] = null, r < v && p.blend !== I && (p.size = d - p.start, r = v, p = l[++f], p.texArray = e, p.start = d), this.packInterleavedGeometry(_, o, h, c, d), c += _.vertexData.length / 2 * u, d += _.indices.length, p.blend = I;
      }
      r < n && (p.size = d - p.start, ++f), this._dcIndex = f, this._aIndex = c, this._iIndex = d;
    }, t.prototype.bindAndClearTexArray = function(e) {
      for (var r = this.renderer.texture, n = 0; n < e.count; n++)
        r.bind(e.elements[n], e.ids[n]), e.elements[n] = null;
      e.count = 0;
    }, t.prototype.updateGeometry = function() {
      var e = this, r = e._packedGeometries, n = e._attributeBuffer, s = e._indexBuffer;
      z.CAN_UPLOAD_SAME_BUFFER ? (r[this._flushId]._buffer.update(n.rawBinaryData), r[this._flushId]._indexBuffer.update(s), this.renderer.geometry.updateBuffers()) : (this._packedGeometryPoolSize <= this._flushId && (this._packedGeometryPoolSize++, r[this._flushId] = new this.geometryClass()), r[this._flushId]._buffer.update(n.rawBinaryData), r[this._flushId]._indexBuffer.update(s), this.renderer.geometry.bind(r[this._flushId]), this.renderer.geometry.updateBuffers(), this._flushId++);
    }, t.prototype.drawBatches = function() {
      for (var e = this._dcIndex, r = this.renderer, n = r.gl, s = r.state, a = t._drawCallPool, o = null, h = 0; h < e; h++) {
        var u = a[h], l = u.texArray, f = u.type, c = u.size, d = u.start, p = u.blend;
        o !== l && (o = l, this.bindAndClearTexArray(l)), this.state.blendMode = p, s.set(this.state), n.drawElements(f, c, n.UNSIGNED_SHORT, d * 2);
      }
    }, t.prototype.flush = function() {
      this._vertexCount !== 0 && (this._attributeBuffer = this.getAttributeBuffer(this._vertexCount), this._indexBuffer = this.getIndexBuffer(this._indexCount), this._aIndex = 0, this._iIndex = 0, this._dcIndex = 0, this.buildTexturesAndDrawCalls(), this.updateGeometry(), this.drawBatches(), this._bufferSize = 0, this._vertexCount = 0, this._indexCount = 0);
    }, t.prototype.start = function() {
      this.renderer.state.set(this.state), this.renderer.texture.ensureSamplerType(this.MAX_TEXTURES), this.renderer.shader.bind(this._shader), z.CAN_UPLOAD_SAME_BUFFER && this.renderer.geometry.bind(this._packedGeometries[this._flushId]);
    }, t.prototype.stop = function() {
      this.flush();
    }, t.prototype.destroy = function() {
      for (var e = 0; e < this._packedGeometryPoolSize; e++)
        this._packedGeometries[e] && this._packedGeometries[e].destroy();
      this.renderer.off("prerender", this.onPrerender, this), this._aBuffers = null, this._iBuffers = null, this._packedGeometries = null, this._attributeBuffer = null, this._indexBuffer = null, this._shader && (this._shader.destroy(), this._shader = null), i.prototype.destroy.call(this);
    }, t.prototype.getAttributeBuffer = function(e) {
      var r = ui(Math.ceil(e / 8)), n = ta(r), s = r * 8;
      this._aBuffers.length <= n && (this._iBuffers.length = n + 1);
      var a = this._aBuffers[s];
      return a || (this._aBuffers[s] = a = new _i(s * this.vertexSize * 4)), a;
    }, t.prototype.getIndexBuffer = function(e) {
      var r = ui(Math.ceil(e / 12)), n = ta(r), s = r * 12;
      this._iBuffers.length <= n && (this._iBuffers.length = n + 1);
      var a = this._iBuffers[n];
      return a || (this._iBuffers[n] = a = new Uint16Array(s)), a;
    }, t.prototype.packInterleavedGeometry = function(e, r, n, s, a) {
      for (var o = r.uint32View, h = r.float32View, u = s / this.vertexSize, l = e.uvs, f = e.indices, c = e.vertexData, d = e._texture.baseTexture._batchLocation, p = Math.min(e.worldAlpha, 1), v = p < 1 && e._texture.baseTexture.alphaMode ? qn(e._tintRGB, p) : e._tintRGB + (p * 255 << 24), _ = 0; _ < c.length; _ += 2)
        h[s++] = c[_], h[s++] = c[_ + 1], h[s++] = l[_], h[s++] = l[_ + 1], o[s++] = v, h[s++] = d;
      for (var _ = 0; _ < f.length; _++)
        n[a++] = u + f[_];
    }, t._drawCallPool = [], t._textureArrayPool = [], t;
  }(Er)
), Do = (
  /** @class */
  function() {
    function i(t, e) {
      if (this.vertexSrc = t, this.fragTemplate = e, this.programCache = {}, this.defaultGroupCache = {}, e.indexOf("%count%") < 0)
        throw new Error('Fragment template must contain "%count%".');
      if (e.indexOf("%forloop%") < 0)
        throw new Error('Fragment template must contain "%forloop%".');
    }
    return i.prototype.generateShader = function(t) {
      if (!this.programCache[t]) {
        for (var e = new Int32Array(t), r = 0; r < t; r++)
          e[r] = r;
        this.defaultGroupCache[t] = be.from({ uSamplers: e }, !0);
        var n = this.fragTemplate;
        n = n.replace(/%count%/gi, "" + t), n = n.replace(/%forloop%/gi, this.generateSampleSrc(t)), this.programCache[t] = new Ke(this.vertexSrc, n);
      }
      var s = {
        tint: new Float32Array([1, 1, 1, 1]),
        translationMatrix: new At(),
        default: this.defaultGroupCache[t]
      };
      return new ce(this.programCache[t], s);
    }, i.prototype.generateSampleSrc = function(t) {
      var e = "";
      e += `
`, e += `
`;
      for (var r = 0; r < t; r++)
        r > 0 && (e += `
else `), r < t - 1 && (e += "if(vTextureId < " + r + ".5)"), e += `
{`, e += `
	color = texture2D(uSamplers[` + r + "], vTextureCoord);", e += `
}`;
      return e += `
`, e += `
`, e;
    }, i;
  }()
), Es = (
  /** @class */
  function(i) {
    _t(t, i);
    function t(e) {
      e === void 0 && (e = !1);
      var r = i.call(this) || this;
      return r._buffer = new Mt(null, e, !1), r._indexBuffer = new Mt(null, e, !0), r.addAttribute("aVertexPosition", r._buffer, 2, !1, J.FLOAT).addAttribute("aTextureCoord", r._buffer, 2, !1, J.FLOAT).addAttribute("aColor", r._buffer, 4, !0, J.UNSIGNED_BYTE).addAttribute("aTextureId", r._buffer, 1, !0, J.FLOAT).addIndex(r._indexBuffer), r;
    }
    return t;
  }(Je)
), va = `precision highp float;
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
`, _a = `varying vec2 vTextureCoord;
varying vec4 vColor;
varying float vTextureId;
uniform sampler2D uSamplers[%count%];

void main(void){
    vec4 color;
    %forloop%
    gl_FragColor = color * vColor;
}
`, Lo = (
  /** @class */
  function() {
    function i() {
    }
    return i.create = function(t) {
      var e = Object.assign({
        vertex: va,
        fragment: _a,
        geometryClass: Es,
        vertexSize: 6
      }, t), r = e.vertex, n = e.fragment, s = e.vertexSize, a = e.geometryClass;
      return (
        /** @class */
        function(o) {
          _t(h, o);
          function h(u) {
            var l = o.call(this, u) || this;
            return l.shaderGenerator = new Do(r, n), l.geometryClass = a, l.vertexSize = s, l;
          }
          return h;
        }(No)
      );
    }, Object.defineProperty(i, "defaultVertexSrc", {
      /**
       * The default vertex shader source
       * @readonly
       */
      get: function() {
        return va;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i, "defaultFragmentTemplate", {
      /**
       * The default fragment shader source
       * @readonly
       */
      get: function() {
        return _a;
      },
      enumerable: !1,
      configurable: !0
    }), i;
  }()
), ws = Lo.create();
Object.assign(ws, {
  extension: {
    name: "batch",
    type: dt.RendererPlugin
  }
});
var Bo = {}, Gc = function(i) {
  Object.defineProperty(Bo, i, {
    get: function() {
      return Bt("6.0.0", "PIXI.systems." + i + " has moved to PIXI." + i), ho[i];
    }
  });
};
for (var Ss in ho)
  Gc(Ss);
var Fo = {}, jc = function(i) {
  Object.defineProperty(Fo, i, {
    get: function() {
      return Bt("6.0.0", "PIXI.resources." + i + " has moved to PIXI." + i), Co[i];
    }
  });
};
for (var Ss in Co)
  jc(Ss);
var Hc = "6.5.10";
const A_ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AbstractBatchRenderer: No,
  AbstractMultiResource: wi,
  AbstractRenderer: Ao,
  ArrayResource: Kn,
  Attribute: yn,
  BaseImageResource: ie,
  BaseRenderTexture: ns,
  BaseTexture: ot,
  BatchDrawCall: pi,
  BatchGeometry: Es,
  BatchPluginFactory: Lo,
  BatchRenderer: ws,
  BatchShaderGenerator: Do,
  BatchSystem: hs,
  BatchTextureArray: vi,
  Buffer: Mt,
  BufferResource: ke,
  CanvasResource: Qn,
  ContextSystem: us,
  CubeResource: ts,
  get ExtensionType() {
    return dt;
  },
  Filter: ve,
  FilterState: fo,
  FilterSystem: os,
  Framebuffer: di,
  FramebufferSystem: ls,
  GLFramebuffer: co,
  GLProgram: Po,
  GLTexture: ti,
  Geometry: Je,
  GeometrySystem: fs,
  IGLUniformData: Ec,
  INSTALLED: mr,
  ImageBitmapResource: is,
  ImageResource: Si,
  MaskData: po,
  MaskSystem: cs,
  ObjectRenderer: Er,
  Program: Ke,
  ProjectionSystem: vs,
  Quad: lo,
  QuadUv: as,
  RenderTexture: Ee,
  RenderTexturePool: uo,
  RenderTextureSystem: _s,
  Renderer: xs,
  Resource: Fe,
  SVGResource: es,
  ScissorSystem: ds,
  Shader: ce,
  ShaderSystem: ms,
  SpriteMaskFilter: xo,
  State: we,
  StateSystem: gs,
  StencilSystem: ps,
  System: Uc,
  Texture: et,
  TextureGCSystem: ys,
  TextureMatrix: Ii,
  TextureSystem: bs,
  TextureUvs: ss,
  UniformGroup: be,
  VERSION: Hc,
  VideoResource: rs,
  ViewableBuffer: _i,
  autoDetectRenderer: Ro,
  autoDetectResource: Ei,
  checkMaxIfStatementsInShader: bo,
  createUBOElements: wo,
  defaultFilterVertex: Ts,
  defaultVertex: Oo,
  extensions: se,
  generateProgram: Mo,
  generateUniformBufferSync: Io,
  getTestContext: mo,
  getUBOData: So,
  resources: Bo,
  systems: Fo,
  uniformParsers: Le
}, Symbol.toStringTag, { value: "Module" }));
/*!
 * @pixi/accessibility - v6.5.10
 * Compiled Thu, 06 Jul 2023 15:25:11 UTC
 *
 * @pixi/accessibility is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
var Xc = {
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
St.mixin(Xc);
var zc = 9, Fr = 100, Yc = 0, Wc = 0, ma = 2, ga = 1, Vc = -1e3, $c = -1e3, Zc = 2, qc = (
  /** @class */
  function() {
    function i(t) {
      this.debug = !1, this._isActive = !1, this._isMobileAccessibility = !1, this.pool = [], this.renderId = 0, this.children = [], this.androidUpdateCount = 0, this.androidUpdateFrequency = 500, this._hookDiv = null, (Kt.tablet || Kt.phone) && this.createTouchHook();
      var e = document.createElement("div");
      e.style.width = Fr + "px", e.style.height = Fr + "px", e.style.position = "absolute", e.style.top = Yc + "px", e.style.left = Wc + "px", e.style.zIndex = ma.toString(), this.div = e, this.renderer = t, this._onKeyDown = this._onKeyDown.bind(this), this._onMouseMove = this._onMouseMove.bind(this), globalThis.addEventListener("keydown", this._onKeyDown, !1);
    }
    return Object.defineProperty(i.prototype, "isActive", {
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
    }), Object.defineProperty(i.prototype, "isMobileAccessibility", {
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
    }), i.prototype.createTouchHook = function() {
      var t = this, e = document.createElement("button");
      e.style.width = ga + "px", e.style.height = ga + "px", e.style.position = "absolute", e.style.top = Vc + "px", e.style.left = $c + "px", e.style.zIndex = Zc.toString(), e.style.backgroundColor = "#FF0000", e.title = "select to enable accessibility for this content", e.addEventListener("focus", function() {
        t._isMobileAccessibility = !0, t.activate(), t.destroyTouchHook();
      }), document.body.appendChild(e), this._hookDiv = e;
    }, i.prototype.destroyTouchHook = function() {
      this._hookDiv && (document.body.removeChild(this._hookDiv), this._hookDiv = null);
    }, i.prototype.activate = function() {
      var t;
      this._isActive || (this._isActive = !0, globalThis.document.addEventListener("mousemove", this._onMouseMove, !0), globalThis.removeEventListener("keydown", this._onKeyDown, !1), this.renderer.on("postrender", this.update, this), (t = this.renderer.view.parentNode) === null || t === void 0 || t.appendChild(this.div));
    }, i.prototype.deactivate = function() {
      var t;
      !this._isActive || this._isMobileAccessibility || (this._isActive = !1, globalThis.document.removeEventListener("mousemove", this._onMouseMove, !0), globalThis.addEventListener("keydown", this._onKeyDown, !1), this.renderer.off("postrender", this.update), (t = this.div.parentNode) === null || t === void 0 || t.removeChild(this.div));
    }, i.prototype.updateAccessibleObjects = function(t) {
      if (!(!t.visible || !t.accessibleChildren)) {
        t.accessible && t.interactive && (t._accessibleActive || this.addChild(t), t.renderId = this.renderId);
        var e = t.children;
        if (e)
          for (var r = 0; r < e.length; r++)
            this.updateAccessibleObjects(e[r]);
      }
    }, i.prototype.update = function() {
      var t = performance.now();
      if (!(Kt.android.device && t < this.androidUpdateCount) && (this.androidUpdateCount = t + this.androidUpdateFrequency, !!this.renderer.renderingToScreen)) {
        this.renderer._lastObjectRendered && this.updateAccessibleObjects(this.renderer._lastObjectRendered);
        var e = this.renderer.view.getBoundingClientRect(), r = e.left, n = e.top, s = e.width, a = e.height, o = this.renderer, h = o.width, u = o.height, l = o.resolution, f = s / h * l, c = a / u * l, d = this.div;
        d.style.left = r + "px", d.style.top = n + "px", d.style.width = h + "px", d.style.height = u + "px";
        for (var p = 0; p < this.children.length; p++) {
          var v = this.children[p];
          if (v.renderId !== this.renderId)
            v._accessibleActive = !1, Ve(this.children, p, 1), this.div.removeChild(v._accessibleDiv), this.pool.push(v._accessibleDiv), v._accessibleDiv = null, p--;
          else {
            d = v._accessibleDiv;
            var _ = v.hitArea, g = v.worldTransform;
            v.hitArea ? (d.style.left = (g.tx + _.x * g.a) * f + "px", d.style.top = (g.ty + _.y * g.d) * c + "px", d.style.width = _.width * g.a * f + "px", d.style.height = _.height * g.d * c + "px") : (_ = v.getBounds(), this.capHitArea(_), d.style.left = _.x * f + "px", d.style.top = _.y * c + "px", d.style.width = _.width * f + "px", d.style.height = _.height * c + "px", d.title !== v.accessibleTitle && v.accessibleTitle !== null && (d.title = v.accessibleTitle), d.getAttribute("aria-label") !== v.accessibleHint && v.accessibleHint !== null && d.setAttribute("aria-label", v.accessibleHint)), (v.accessibleTitle !== d.title || v.tabIndex !== d.tabIndex) && (d.title = v.accessibleTitle, d.tabIndex = v.tabIndex, this.debug && this.updateDebugHTML(d));
          }
        }
        this.renderId++;
      }
    }, i.prototype.updateDebugHTML = function(t) {
      t.innerHTML = "type: " + t.type + "</br> title : " + t.title + "</br> tabIndex: " + t.tabIndex;
    }, i.prototype.capHitArea = function(t) {
      t.x < 0 && (t.width += t.x, t.x = 0), t.y < 0 && (t.height += t.y, t.y = 0);
      var e = this.renderer, r = e.width, n = e.height;
      t.x + t.width > r && (t.width = r - t.x), t.y + t.height > n && (t.height = n - t.y);
    }, i.prototype.addChild = function(t) {
      var e = this.pool.pop();
      e || (e = document.createElement("button"), e.style.width = Fr + "px", e.style.height = Fr + "px", e.style.backgroundColor = this.debug ? "rgba(255,255,255,0.5)" : "transparent", e.style.position = "absolute", e.style.zIndex = ma.toString(), e.style.borderStyle = "none", navigator.userAgent.toLowerCase().indexOf("chrome") > -1 ? e.setAttribute("aria-live", "off") : e.setAttribute("aria-live", "polite"), navigator.userAgent.match(/rv:.*Gecko\//) ? e.setAttribute("aria-relevant", "additions") : e.setAttribute("aria-relevant", "text"), e.addEventListener("click", this._onClick.bind(this)), e.addEventListener("focus", this._onFocus.bind(this)), e.addEventListener("focusout", this._onFocusOut.bind(this))), e.style.pointerEvents = t.accessiblePointerEvents, e.type = t.accessibleType, t.accessibleTitle && t.accessibleTitle !== null ? e.title = t.accessibleTitle : (!t.accessibleHint || t.accessibleHint === null) && (e.title = "displayObject " + t.tabIndex), t.accessibleHint && t.accessibleHint !== null && e.setAttribute("aria-label", t.accessibleHint), this.debug && this.updateDebugHTML(e), t._accessibleActive = !0, t._accessibleDiv = e, e.displayObject = t, this.children.push(t), this.div.appendChild(t._accessibleDiv), t._accessibleDiv.tabIndex = t.tabIndex;
    }, i.prototype._onClick = function(t) {
      var e = this.renderer.plugins.interaction, r = t.target.displayObject, n = e.eventData;
      e.dispatchEvent(r, "click", n), e.dispatchEvent(r, "pointertap", n), e.dispatchEvent(r, "tap", n);
    }, i.prototype._onFocus = function(t) {
      t.target.getAttribute("aria-live") || t.target.setAttribute("aria-live", "assertive");
      var e = this.renderer.plugins.interaction, r = t.target.displayObject, n = e.eventData;
      e.dispatchEvent(r, "mouseover", n);
    }, i.prototype._onFocusOut = function(t) {
      t.target.getAttribute("aria-live") || t.target.setAttribute("aria-live", "polite");
      var e = this.renderer.plugins.interaction, r = t.target.displayObject, n = e.eventData;
      e.dispatchEvent(r, "mouseout", n);
    }, i.prototype._onKeyDown = function(t) {
      t.keyCode === zc && this.activate();
    }, i.prototype._onMouseMove = function(t) {
      t.movementX === 0 && t.movementY === 0 || this.deactivate();
    }, i.prototype.destroy = function() {
      this.destroyTouchHook(), this.div = null, globalThis.document.removeEventListener("mousemove", this._onMouseMove, !0), globalThis.removeEventListener("keydown", this._onKeyDown), this.pool = null, this.children = null, this.renderer = null;
    }, i.extension = {
      name: "accessibility",
      type: [
        dt.RendererPlugin,
        dt.CanvasRendererPlugin
      ]
    }, i;
  }()
);
/*!
 * @pixi/interaction - v6.5.10
 * Compiled Thu, 06 Jul 2023 15:25:11 UTC
 *
 * @pixi/interaction is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
var ya = (
  /** @class */
  function() {
    function i() {
      this.pressure = 0, this.rotationAngle = 0, this.twist = 0, this.tangentialPressure = 0, this.global = new gt(), this.target = null, this.originalEvent = null, this.identifier = null, this.isPrimary = !1, this.button = 0, this.buttons = 0, this.width = 0, this.height = 0, this.tiltX = 0, this.tiltY = 0, this.pointerType = null, this.pressure = 0, this.rotationAngle = 0, this.twist = 0, this.tangentialPressure = 0;
    }
    return Object.defineProperty(i.prototype, "pointerId", {
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
    }), i.prototype.getLocalPosition = function(t, e, r) {
      return t.worldTransform.applyInverse(r || this.global, e);
    }, i.prototype.copyEvent = function(t) {
      "isPrimary" in t && t.isPrimary && (this.isPrimary = !0), this.button = "button" in t && t.button;
      var e = "buttons" in t && t.buttons;
      this.buttons = Number.isInteger(e) ? e : "which" in t && t.which, this.width = "width" in t && t.width, this.height = "height" in t && t.height, this.tiltX = "tiltX" in t && t.tiltX, this.tiltY = "tiltY" in t && t.tiltY, this.pointerType = "pointerType" in t && t.pointerType, this.pressure = "pressure" in t && t.pressure, this.rotationAngle = "rotationAngle" in t && t.rotationAngle, this.twist = "twist" in t && t.twist || 0, this.tangentialPressure = "tangentialPressure" in t && t.tangentialPressure || 0;
    }, i.prototype.reset = function() {
      this.isPrimary = !1;
    }, i;
  }()
);
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var bn = function(i, t) {
  return bn = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, r) {
    e.__proto__ = r;
  } || function(e, r) {
    for (var n in r)
      r.hasOwnProperty(n) && (e[n] = r[n]);
  }, bn(i, t);
};
function Jc(i, t) {
  bn(i, t);
  function e() {
    this.constructor = i;
  }
  i.prototype = t === null ? Object.create(t) : (e.prototype = t.prototype, new e());
}
var Kc = (
  /** @class */
  function() {
    function i() {
      this.stopped = !1, this.stopsPropagatingAt = null, this.stopPropagationHint = !1, this.target = null, this.currentTarget = null, this.type = null, this.data = null;
    }
    return i.prototype.stopPropagation = function() {
      this.stopped = !0, this.stopPropagationHint = !0, this.stopsPropagatingAt = this.currentTarget;
    }, i.prototype.reset = function() {
      this.stopped = !1, this.stopsPropagatingAt = null, this.stopPropagationHint = !1, this.currentTarget = null, this.target = null;
    }, i;
  }()
), Zi = (
  /** @class */
  function() {
    function i(t) {
      this._pointerId = t, this._flags = i.FLAGS.NONE;
    }
    return i.prototype._doSet = function(t, e) {
      e ? this._flags = this._flags | t : this._flags = this._flags & ~t;
    }, Object.defineProperty(i.prototype, "pointerId", {
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
    }), Object.defineProperty(i.prototype, "flags", {
      /**
       * State of the tracking data, expressed as bit flags
       * @private
       * @member {number}
       */
      get: function() {
        return this._flags;
      },
      set: function(t) {
        this._flags = t;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "none", {
      /**
       * Is the tracked event inactive (not over or down)?
       * @private
       * @member {number}
       */
      get: function() {
        return this._flags === i.FLAGS.NONE;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "over", {
      /**
       * Is the tracked event over the DisplayObject?
       * @private
       * @member {boolean}
       */
      get: function() {
        return (this._flags & i.FLAGS.OVER) !== 0;
      },
      set: function(t) {
        this._doSet(i.FLAGS.OVER, t);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "rightDown", {
      /**
       * Did the right mouse button come down in the DisplayObject?
       * @private
       * @member {boolean}
       */
      get: function() {
        return (this._flags & i.FLAGS.RIGHT_DOWN) !== 0;
      },
      set: function(t) {
        this._doSet(i.FLAGS.RIGHT_DOWN, t);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "leftDown", {
      /**
       * Did the left mouse button come down in the DisplayObject?
       * @private
       * @member {boolean}
       */
      get: function() {
        return (this._flags & i.FLAGS.LEFT_DOWN) !== 0;
      },
      set: function(t) {
        this._doSet(i.FLAGS.LEFT_DOWN, t);
      },
      enumerable: !1,
      configurable: !0
    }), i.FLAGS = Object.freeze({
      NONE: 0,
      OVER: 1,
      LEFT_DOWN: 2,
      RIGHT_DOWN: 4
    }), i;
  }()
), Qc = (
  /** @class */
  function() {
    function i() {
      this._tempPoint = new gt();
    }
    return i.prototype.recursiveFindHit = function(t, e, r, n, s) {
      var a;
      if (!e || !e.visible)
        return !1;
      var o = t.data.global;
      s = e.interactive || s;
      var h = !1, u = s, l = !0;
      if (e.hitArea)
        n && (e.worldTransform.applyInverse(o, this._tempPoint), e.hitArea.contains(this._tempPoint.x, this._tempPoint.y) ? h = !0 : (n = !1, l = !1)), u = !1;
      else if (e._mask && n) {
        var f = e._mask.isMaskData ? e._mask.maskObject : e._mask;
        f && !(!((a = f.containsPoint) === null || a === void 0) && a.call(f, o)) && (n = !1);
      }
      if (l && e.interactiveChildren && e.children)
        for (var c = e.children, d = c.length - 1; d >= 0; d--) {
          var p = c[d], v = this.recursiveFindHit(t, p, r, n, u);
          if (v) {
            if (!p.parent)
              continue;
            u = !1, v && (t.target && (n = !1), h = !0);
          }
        }
      return s && (n && !t.target && !e.hitArea && e.containsPoint && e.containsPoint(o) && (h = !0), e.interactive && (h && !t.target && (t.target = e), r && r(t, e, !!h))), h;
    }, i.prototype.findHit = function(t, e, r, n) {
      this.recursiveFindHit(t, e, r, n, !1);
    }, i;
  }()
), td = {
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
  set buttonMode(i) {
    i ? this.cursor = "pointer" : this.cursor === "pointer" && (this.cursor = null);
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
St.mixin(td);
var kr = 1, Ur = {
  target: null,
  data: {
    global: null
  }
}, ed = (
  /** @class */
  function(i) {
    Jc(t, i);
    function t(e, r) {
      var n = i.call(this) || this;
      return r = r || {}, n.renderer = e, n.autoPreventDefault = r.autoPreventDefault !== void 0 ? r.autoPreventDefault : !0, n.interactionFrequency = r.interactionFrequency || 10, n.mouse = new ya(), n.mouse.identifier = kr, n.mouse.global.set(-999999), n.activeInteractionData = {}, n.activeInteractionData[kr] = n.mouse, n.interactionDataPool = [], n.eventData = new Kc(), n.interactionDOMElement = null, n.moveWhenInside = !1, n.eventsAdded = !1, n.tickerAdded = !1, n.mouseOverRenderer = !("PointerEvent" in globalThis), n.supportsTouchEvents = "ontouchstart" in globalThis, n.supportsPointerEvents = !!globalThis.PointerEvent, n.onPointerUp = n.onPointerUp.bind(n), n.processPointerUp = n.processPointerUp.bind(n), n.onPointerCancel = n.onPointerCancel.bind(n), n.processPointerCancel = n.processPointerCancel.bind(n), n.onPointerDown = n.onPointerDown.bind(n), n.processPointerDown = n.processPointerDown.bind(n), n.onPointerMove = n.onPointerMove.bind(n), n.processPointerMove = n.processPointerMove.bind(n), n.onPointerOut = n.onPointerOut.bind(n), n.processPointerOverOut = n.processPointerOverOut.bind(n), n.onPointerOver = n.onPointerOver.bind(n), n.cursorStyles = {
        default: "inherit",
        pointer: "pointer"
      }, n.currentCursorMode = null, n.cursor = null, n.resolution = 1, n.delayedEvents = [], n.search = new Qc(), n._tempDisplayObject = new oo(), n._eventListenerOptions = { capture: !0, passive: !1 }, n._useSystemTicker = r.useSystemTicker !== void 0 ? r.useSystemTicker : !0, n.setTargetElement(n.renderer.view, n.renderer.resolution), n;
    }
    return Object.defineProperty(t.prototype, "useSystemTicker", {
      /**
       * Should the InteractionManager automatically add {@link tickerUpdate} to {@link PIXI.Ticker.system}.
       * @default true
       */
      get: function() {
        return this._useSystemTicker;
      },
      set: function(e) {
        this._useSystemTicker = e, e ? this.addTickerListener() : this.removeTickerListener();
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "lastObjectRendered", {
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
    }), t.prototype.hitTest = function(e, r) {
      return Ur.target = null, Ur.data.global = e, r || (r = this.lastObjectRendered), this.processInteractive(Ur, r, null, !0), Ur.target;
    }, t.prototype.setTargetElement = function(e, r) {
      r === void 0 && (r = 1), this.removeTickerListener(), this.removeEvents(), this.interactionDOMElement = e, this.resolution = r, this.addEvents(), this.addTickerListener();
    }, t.prototype.addTickerListener = function() {
      this.tickerAdded || !this.interactionDOMElement || !this._useSystemTicker || (Nt.system.add(this.tickerUpdate, this, pe.INTERACTION), this.tickerAdded = !0);
    }, t.prototype.removeTickerListener = function() {
      this.tickerAdded && (Nt.system.remove(this.tickerUpdate, this), this.tickerAdded = !1);
    }, t.prototype.addEvents = function() {
      if (!(this.eventsAdded || !this.interactionDOMElement)) {
        var e = this.interactionDOMElement.style;
        globalThis.navigator.msPointerEnabled ? (e.msContentZooming = "none", e.msTouchAction = "none") : this.supportsPointerEvents && (e.touchAction = "none"), this.supportsPointerEvents ? (globalThis.document.addEventListener("pointermove", this.onPointerMove, this._eventListenerOptions), this.interactionDOMElement.addEventListener("pointerdown", this.onPointerDown, this._eventListenerOptions), this.interactionDOMElement.addEventListener("pointerleave", this.onPointerOut, this._eventListenerOptions), this.interactionDOMElement.addEventListener("pointerover", this.onPointerOver, this._eventListenerOptions), globalThis.addEventListener("pointercancel", this.onPointerCancel, this._eventListenerOptions), globalThis.addEventListener("pointerup", this.onPointerUp, this._eventListenerOptions)) : (globalThis.document.addEventListener("mousemove", this.onPointerMove, this._eventListenerOptions), this.interactionDOMElement.addEventListener("mousedown", this.onPointerDown, this._eventListenerOptions), this.interactionDOMElement.addEventListener("mouseout", this.onPointerOut, this._eventListenerOptions), this.interactionDOMElement.addEventListener("mouseover", this.onPointerOver, this._eventListenerOptions), globalThis.addEventListener("mouseup", this.onPointerUp, this._eventListenerOptions)), this.supportsTouchEvents && (this.interactionDOMElement.addEventListener("touchstart", this.onPointerDown, this._eventListenerOptions), this.interactionDOMElement.addEventListener("touchcancel", this.onPointerCancel, this._eventListenerOptions), this.interactionDOMElement.addEventListener("touchend", this.onPointerUp, this._eventListenerOptions), this.interactionDOMElement.addEventListener("touchmove", this.onPointerMove, this._eventListenerOptions)), this.eventsAdded = !0;
      }
    }, t.prototype.removeEvents = function() {
      if (!(!this.eventsAdded || !this.interactionDOMElement)) {
        var e = this.interactionDOMElement.style;
        globalThis.navigator.msPointerEnabled ? (e.msContentZooming = "", e.msTouchAction = "") : this.supportsPointerEvents && (e.touchAction = ""), this.supportsPointerEvents ? (globalThis.document.removeEventListener("pointermove", this.onPointerMove, this._eventListenerOptions), this.interactionDOMElement.removeEventListener("pointerdown", this.onPointerDown, this._eventListenerOptions), this.interactionDOMElement.removeEventListener("pointerleave", this.onPointerOut, this._eventListenerOptions), this.interactionDOMElement.removeEventListener("pointerover", this.onPointerOver, this._eventListenerOptions), globalThis.removeEventListener("pointercancel", this.onPointerCancel, this._eventListenerOptions), globalThis.removeEventListener("pointerup", this.onPointerUp, this._eventListenerOptions)) : (globalThis.document.removeEventListener("mousemove", this.onPointerMove, this._eventListenerOptions), this.interactionDOMElement.removeEventListener("mousedown", this.onPointerDown, this._eventListenerOptions), this.interactionDOMElement.removeEventListener("mouseout", this.onPointerOut, this._eventListenerOptions), this.interactionDOMElement.removeEventListener("mouseover", this.onPointerOver, this._eventListenerOptions), globalThis.removeEventListener("mouseup", this.onPointerUp, this._eventListenerOptions)), this.supportsTouchEvents && (this.interactionDOMElement.removeEventListener("touchstart", this.onPointerDown, this._eventListenerOptions), this.interactionDOMElement.removeEventListener("touchcancel", this.onPointerCancel, this._eventListenerOptions), this.interactionDOMElement.removeEventListener("touchend", this.onPointerUp, this._eventListenerOptions), this.interactionDOMElement.removeEventListener("touchmove", this.onPointerMove, this._eventListenerOptions)), this.interactionDOMElement = null, this.eventsAdded = !1;
      }
    }, t.prototype.tickerUpdate = function(e) {
      this._deltaTime += e, !(this._deltaTime < this.interactionFrequency) && (this._deltaTime = 0, this.update());
    }, t.prototype.update = function() {
      if (this.interactionDOMElement) {
        if (this._didMove) {
          this._didMove = !1;
          return;
        }
        this.cursor = null;
        for (var e in this.activeInteractionData)
          if (this.activeInteractionData.hasOwnProperty(e)) {
            var r = this.activeInteractionData[e];
            if (r.originalEvent && r.pointerType !== "touch") {
              var n = this.configureInteractionEventForDOMEvent(this.eventData, r.originalEvent, r);
              this.processInteractive(n, this.lastObjectRendered, this.processPointerOverOut, !0);
            }
          }
        this.setCursorMode(this.cursor);
      }
    }, t.prototype.setCursorMode = function(e) {
      e = e || "default";
      var r = !0;
      if (globalThis.OffscreenCanvas && this.interactionDOMElement instanceof OffscreenCanvas && (r = !1), this.currentCursorMode !== e) {
        this.currentCursorMode = e;
        var n = this.cursorStyles[e];
        if (n)
          switch (typeof n) {
            case "string":
              r && (this.interactionDOMElement.style.cursor = n);
              break;
            case "function":
              n(e);
              break;
            case "object":
              r && Object.assign(this.interactionDOMElement.style, n);
              break;
          }
        else r && typeof e == "string" && !Object.prototype.hasOwnProperty.call(this.cursorStyles, e) && (this.interactionDOMElement.style.cursor = e);
      }
    }, t.prototype.dispatchEvent = function(e, r, n) {
      (!n.stopPropagationHint || e === n.stopsPropagatingAt) && (n.currentTarget = e, n.type = r, e.emit(r, n), e[r] && e[r](n));
    }, t.prototype.delayDispatchEvent = function(e, r, n) {
      this.delayedEvents.push({ displayObject: e, eventString: r, eventData: n });
    }, t.prototype.mapPositionToPoint = function(e, r, n) {
      var s;
      this.interactionDOMElement.parentElement ? s = this.interactionDOMElement.getBoundingClientRect() : s = {
        x: 0,
        y: 0,
        width: this.interactionDOMElement.width,
        height: this.interactionDOMElement.height,
        left: 0,
        top: 0
      };
      var a = 1 / this.resolution;
      e.x = (r - s.left) * (this.interactionDOMElement.width / s.width) * a, e.y = (n - s.top) * (this.interactionDOMElement.height / s.height) * a;
    }, t.prototype.processInteractive = function(e, r, n, s) {
      var a = this.search.findHit(e, r, n, s), o = this.delayedEvents;
      if (!o.length)
        return a;
      e.stopPropagationHint = !1;
      var h = o.length;
      this.delayedEvents = [];
      for (var u = 0; u < h; u++) {
        var l = o[u], f = l.displayObject, c = l.eventString, d = l.eventData;
        d.stopsPropagatingAt === f && (d.stopPropagationHint = !0), this.dispatchEvent(f, c, d);
      }
      return a;
    }, t.prototype.onPointerDown = function(e) {
      if (!(this.supportsTouchEvents && e.pointerType === "touch")) {
        var r = this.normalizeToPointerData(e);
        if (this.autoPreventDefault && r[0].isNormalized) {
          var n = e.cancelable || !("cancelable" in e);
          n && e.preventDefault();
        }
        for (var s = r.length, a = 0; a < s; a++) {
          var o = r[a], h = this.getInteractionDataForPointerId(o), u = this.configureInteractionEventForDOMEvent(this.eventData, o, h);
          if (u.data.originalEvent = e, this.processInteractive(u, this.lastObjectRendered, this.processPointerDown, !0), this.emit("pointerdown", u), o.pointerType === "touch")
            this.emit("touchstart", u);
          else if (o.pointerType === "mouse" || o.pointerType === "pen") {
            var l = o.button === 2;
            this.emit(l ? "rightdown" : "mousedown", this.eventData);
          }
        }
      }
    }, t.prototype.processPointerDown = function(e, r, n) {
      var s = e.data, a = e.data.identifier;
      if (n) {
        if (r.trackedPointers[a] || (r.trackedPointers[a] = new Zi(a)), this.dispatchEvent(r, "pointerdown", e), s.pointerType === "touch")
          this.dispatchEvent(r, "touchstart", e);
        else if (s.pointerType === "mouse" || s.pointerType === "pen") {
          var o = s.button === 2;
          o ? r.trackedPointers[a].rightDown = !0 : r.trackedPointers[a].leftDown = !0, this.dispatchEvent(r, o ? "rightdown" : "mousedown", e);
        }
      }
    }, t.prototype.onPointerComplete = function(e, r, n) {
      var s = this.normalizeToPointerData(e), a = s.length, o = e.target;
      e.composedPath && e.composedPath().length > 0 && (o = e.composedPath()[0]);
      for (var h = o !== this.interactionDOMElement ? "outside" : "", u = 0; u < a; u++) {
        var l = s[u], f = this.getInteractionDataForPointerId(l), c = this.configureInteractionEventForDOMEvent(this.eventData, l, f);
        if (c.data.originalEvent = e, this.processInteractive(c, this.lastObjectRendered, n, r || !h), this.emit(r ? "pointercancel" : "pointerup" + h, c), l.pointerType === "mouse" || l.pointerType === "pen") {
          var d = l.button === 2;
          this.emit(d ? "rightup" + h : "mouseup" + h, c);
        } else l.pointerType === "touch" && (this.emit(r ? "touchcancel" : "touchend" + h, c), this.releaseInteractionDataForPointerId(l.pointerId));
      }
    }, t.prototype.onPointerCancel = function(e) {
      this.supportsTouchEvents && e.pointerType === "touch" || this.onPointerComplete(e, !0, this.processPointerCancel);
    }, t.prototype.processPointerCancel = function(e, r) {
      var n = e.data, s = e.data.identifier;
      r.trackedPointers[s] !== void 0 && (delete r.trackedPointers[s], this.dispatchEvent(r, "pointercancel", e), n.pointerType === "touch" && this.dispatchEvent(r, "touchcancel", e));
    }, t.prototype.onPointerUp = function(e) {
      this.supportsTouchEvents && e.pointerType === "touch" || this.onPointerComplete(e, !1, this.processPointerUp);
    }, t.prototype.processPointerUp = function(e, r, n) {
      var s = e.data, a = e.data.identifier, o = r.trackedPointers[a], h = s.pointerType === "touch", u = s.pointerType === "mouse" || s.pointerType === "pen", l = !1;
      if (u) {
        var f = s.button === 2, c = Zi.FLAGS, d = f ? c.RIGHT_DOWN : c.LEFT_DOWN, p = o !== void 0 && o.flags & d;
        n ? (this.dispatchEvent(r, f ? "rightup" : "mouseup", e), p && (this.dispatchEvent(r, f ? "rightclick" : "click", e), l = !0)) : p && this.dispatchEvent(r, f ? "rightupoutside" : "mouseupoutside", e), o && (f ? o.rightDown = !1 : o.leftDown = !1);
      }
      n ? (this.dispatchEvent(r, "pointerup", e), h && this.dispatchEvent(r, "touchend", e), o && ((!u || l) && this.dispatchEvent(r, "pointertap", e), h && (this.dispatchEvent(r, "tap", e), o.over = !1))) : o && (this.dispatchEvent(r, "pointerupoutside", e), h && this.dispatchEvent(r, "touchendoutside", e)), o && o.none && delete r.trackedPointers[a];
    }, t.prototype.onPointerMove = function(e) {
      if (!(this.supportsTouchEvents && e.pointerType === "touch")) {
        var r = this.normalizeToPointerData(e);
        (r[0].pointerType === "mouse" || r[0].pointerType === "pen") && (this._didMove = !0, this.cursor = null);
        for (var n = r.length, s = 0; s < n; s++) {
          var a = r[s], o = this.getInteractionDataForPointerId(a), h = this.configureInteractionEventForDOMEvent(this.eventData, a, o);
          h.data.originalEvent = e, this.processInteractive(h, this.lastObjectRendered, this.processPointerMove, !0), this.emit("pointermove", h), a.pointerType === "touch" && this.emit("touchmove", h), (a.pointerType === "mouse" || a.pointerType === "pen") && this.emit("mousemove", h);
        }
        r[0].pointerType === "mouse" && this.setCursorMode(this.cursor);
      }
    }, t.prototype.processPointerMove = function(e, r, n) {
      var s = e.data, a = s.pointerType === "touch", o = s.pointerType === "mouse" || s.pointerType === "pen";
      o && this.processPointerOverOut(e, r, n), (!this.moveWhenInside || n) && (this.dispatchEvent(r, "pointermove", e), a && this.dispatchEvent(r, "touchmove", e), o && this.dispatchEvent(r, "mousemove", e));
    }, t.prototype.onPointerOut = function(e) {
      if (!(this.supportsTouchEvents && e.pointerType === "touch")) {
        var r = this.normalizeToPointerData(e), n = r[0];
        n.pointerType === "mouse" && (this.mouseOverRenderer = !1, this.setCursorMode(null));
        var s = this.getInteractionDataForPointerId(n), a = this.configureInteractionEventForDOMEvent(this.eventData, n, s);
        a.data.originalEvent = n, this.processInteractive(a, this.lastObjectRendered, this.processPointerOverOut, !1), this.emit("pointerout", a), n.pointerType === "mouse" || n.pointerType === "pen" ? this.emit("mouseout", a) : this.releaseInteractionDataForPointerId(s.identifier);
      }
    }, t.prototype.processPointerOverOut = function(e, r, n) {
      var s = e.data, a = e.data.identifier, o = s.pointerType === "mouse" || s.pointerType === "pen", h = r.trackedPointers[a];
      n && !h && (h = r.trackedPointers[a] = new Zi(a)), h !== void 0 && (n && this.mouseOverRenderer ? (h.over || (h.over = !0, this.delayDispatchEvent(r, "pointerover", e), o && this.delayDispatchEvent(r, "mouseover", e)), o && this.cursor === null && (this.cursor = r.cursor)) : h.over && (h.over = !1, this.dispatchEvent(r, "pointerout", this.eventData), o && this.dispatchEvent(r, "mouseout", e), h.none && delete r.trackedPointers[a]));
    }, t.prototype.onPointerOver = function(e) {
      if (!(this.supportsTouchEvents && e.pointerType === "touch")) {
        var r = this.normalizeToPointerData(e), n = r[0], s = this.getInteractionDataForPointerId(n), a = this.configureInteractionEventForDOMEvent(this.eventData, n, s);
        a.data.originalEvent = n, n.pointerType === "mouse" && (this.mouseOverRenderer = !0), this.emit("pointerover", a), (n.pointerType === "mouse" || n.pointerType === "pen") && this.emit("mouseover", a);
      }
    }, t.prototype.getInteractionDataForPointerId = function(e) {
      var r = e.pointerId, n;
      return r === kr || e.pointerType === "mouse" ? n = this.mouse : this.activeInteractionData[r] ? n = this.activeInteractionData[r] : (n = this.interactionDataPool.pop() || new ya(), n.identifier = r, this.activeInteractionData[r] = n), n.copyEvent(e), n;
    }, t.prototype.releaseInteractionDataForPointerId = function(e) {
      var r = this.activeInteractionData[e];
      r && (delete this.activeInteractionData[e], r.reset(), this.interactionDataPool.push(r));
    }, t.prototype.configureInteractionEventForDOMEvent = function(e, r, n) {
      return e.data = n, this.mapPositionToPoint(n.global, r.clientX, r.clientY), r.pointerType === "touch" && (r.globalX = n.global.x, r.globalY = n.global.y), n.originalEvent = r, e.reset(), e;
    }, t.prototype.normalizeToPointerData = function(e) {
      var r = [];
      if (this.supportsTouchEvents && e instanceof TouchEvent)
        for (var n = 0, s = e.changedTouches.length; n < s; n++) {
          var a = e.changedTouches[n];
          typeof a.button > "u" && (a.button = e.touches.length ? 1 : 0), typeof a.buttons > "u" && (a.buttons = e.touches.length ? 1 : 0), typeof a.isPrimary > "u" && (a.isPrimary = e.touches.length === 1 && e.type === "touchstart"), typeof a.width > "u" && (a.width = a.radiusX || 1), typeof a.height > "u" && (a.height = a.radiusY || 1), typeof a.tiltX > "u" && (a.tiltX = 0), typeof a.tiltY > "u" && (a.tiltY = 0), typeof a.pointerType > "u" && (a.pointerType = "touch"), typeof a.pointerId > "u" && (a.pointerId = a.identifier || 0), typeof a.pressure > "u" && (a.pressure = a.force || 0.5), typeof a.twist > "u" && (a.twist = 0), typeof a.tangentialPressure > "u" && (a.tangentialPressure = 0), typeof a.layerX > "u" && (a.layerX = a.offsetX = a.clientX), typeof a.layerY > "u" && (a.layerY = a.offsetY = a.clientY), a.isNormalized = !0, r.push(a);
        }
      else if (!globalThis.MouseEvent || e instanceof MouseEvent && (!this.supportsPointerEvents || !(e instanceof globalThis.PointerEvent))) {
        var o = e;
        typeof o.isPrimary > "u" && (o.isPrimary = !0), typeof o.width > "u" && (o.width = 1), typeof o.height > "u" && (o.height = 1), typeof o.tiltX > "u" && (o.tiltX = 0), typeof o.tiltY > "u" && (o.tiltY = 0), typeof o.pointerType > "u" && (o.pointerType = "mouse"), typeof o.pointerId > "u" && (o.pointerId = kr), typeof o.pressure > "u" && (o.pressure = 0.5), typeof o.twist > "u" && (o.twist = 0), typeof o.tangentialPressure > "u" && (o.tangentialPressure = 0), o.isNormalized = !0, r.push(o);
      } else
        r.push(e);
      return r;
    }, t.prototype.destroy = function() {
      this.removeEvents(), this.removeTickerListener(), this.removeAllListeners(), this.renderer = null, this.mouse = null, this.eventData = null, this.interactionDOMElement = null, this.onPointerDown = null, this.processPointerDown = null, this.onPointerUp = null, this.processPointerUp = null, this.onPointerCancel = null, this.processPointerCancel = null, this.onPointerMove = null, this.processPointerMove = null, this.onPointerOut = null, this.processPointerOverOut = null, this.onPointerOver = null, this.search = null;
    }, t.extension = {
      name: "interaction",
      type: [
        dt.RendererPlugin,
        dt.CanvasRendererPlugin
      ]
    }, t;
  }(qe)
);
/*!
 * @pixi/extract - v6.5.10
 * Compiled Thu, 06 Jul 2023 15:25:11 UTC
 *
 * @pixi/extract is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
var rd = new ht(), id = 4, nd = (
  /** @class */
  function() {
    function i(t) {
      this.renderer = t;
    }
    return i.prototype.image = function(t, e, r) {
      var n = new Image();
      return n.src = this.base64(t, e, r), n;
    }, i.prototype.base64 = function(t, e, r) {
      return this.canvas(t).toDataURL(e, r);
    }, i.prototype.canvas = function(t, e) {
      var r = this._rawPixels(t, e), n = r.pixels, s = r.width, a = r.height, o = r.flipY, h = new ia(s, a, 1), u = h.context.getImageData(0, 0, s, a);
      if (i.arrayPostDivide(n, u.data), h.context.putImageData(u, 0, 0), o) {
        var l = new ia(h.width, h.height, 1);
        l.context.scale(1, -1), l.context.drawImage(h.canvas, 0, -a), h.destroy(), h = l;
      }
      return h.canvas;
    }, i.prototype.pixels = function(t, e) {
      var r = this._rawPixels(t, e).pixels;
      return i.arrayPostDivide(r, r), r;
    }, i.prototype._rawPixels = function(t, e) {
      var r = this.renderer, n, s = !1, a, o = !1;
      if (t)
        if (t instanceof Ee)
          a = t;
        else {
          var h = r.context.webGLVersion >= 2 ? r.multisample : bt.NONE;
          if (a = this.renderer.generateTexture(t, { multisample: h }), h !== bt.NONE) {
            var u = Ee.create({
              width: a.width,
              height: a.height
            });
            r.framebuffer.bind(a.framebuffer), r.framebuffer.blit(u.framebuffer), r.framebuffer.bind(null), a.destroy(!0), a = u;
          }
          o = !0;
        }
      a ? (n = a.baseTexture.resolution, e = e ?? a.frame, s = !1, r.renderTexture.bind(a)) : (n = r.resolution, e || (e = rd, e.width = r.width, e.height = r.height), s = !0, r.renderTexture.bind(null));
      var l = Math.round(e.width * n), f = Math.round(e.height * n), c = new Uint8Array(id * l * f), d = r.gl;
      return d.readPixels(Math.round(e.x * n), Math.round(e.y * n), l, f, d.RGBA, d.UNSIGNED_BYTE, c), o && a.destroy(!0), { pixels: c, width: l, height: f, flipY: s };
    }, i.prototype.destroy = function() {
      this.renderer = null;
    }, i.arrayPostDivide = function(t, e) {
      for (var r = 0; r < t.length; r += 4) {
        var n = e[r + 3] = t[r + 3];
        n !== 0 ? (e[r] = Math.round(Math.min(t[r] * 255 / n, 255)), e[r + 1] = Math.round(Math.min(t[r + 1] * 255 / n, 255)), e[r + 2] = Math.round(Math.min(t[r + 2] * 255 / n, 255))) : (e[r] = t[r], e[r + 1] = t[r + 1], e[r + 2] = t[r + 2]);
      }
    }, i.extension = {
      name: "extract",
      type: dt.RendererPlugin
    }, i;
  }()
);
/*!
 * @pixi/loaders - v6.5.10
 * Compiled Thu, 06 Jul 2023 15:25:11 UTC
 *
 * @pixi/loaders is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
var Gr = (
  /** @class */
  function() {
    function i(t, e, r) {
      e === void 0 && (e = !1), this._fn = t, this._once = e, this._thisArg = r, this._next = this._prev = this._owner = null;
    }
    return i.prototype.detach = function() {
      return this._owner === null ? !1 : (this._owner.detach(this), !0);
    }, i;
  }()
);
function ba(i, t) {
  return i._head ? (i._tail._next = t, t._prev = i._tail, i._tail = t) : (i._head = t, i._tail = t), t._owner = i, t;
}
var le = (
  /** @class */
  function() {
    function i() {
      this._head = this._tail = void 0;
    }
    return i.prototype.handlers = function(t) {
      t === void 0 && (t = !1);
      var e = this._head;
      if (t)
        return !!e;
      for (var r = []; e; )
        r.push(e), e = e._next;
      return r;
    }, i.prototype.has = function(t) {
      if (!(t instanceof Gr))
        throw new Error("MiniSignal#has(): First arg must be a SignalBinding object.");
      return t._owner === this;
    }, i.prototype.dispatch = function() {
      for (var t = arguments, e = [], r = 0; r < arguments.length; r++)
        e[r] = t[r];
      var n = this._head;
      if (!n)
        return !1;
      for (; n; )
        n._once && this.detach(n), n._fn.apply(n._thisArg, e), n = n._next;
      return !0;
    }, i.prototype.add = function(t, e) {
      if (e === void 0 && (e = null), typeof t != "function")
        throw new Error("MiniSignal#add(): First arg must be a Function.");
      return ba(this, new Gr(t, !1, e));
    }, i.prototype.once = function(t, e) {
      if (e === void 0 && (e = null), typeof t != "function")
        throw new Error("MiniSignal#once(): First arg must be a Function.");
      return ba(this, new Gr(t, !0, e));
    }, i.prototype.detach = function(t) {
      if (!(t instanceof Gr))
        throw new Error("MiniSignal#detach(): First arg must be a SignalBinding object.");
      return t._owner !== this ? this : (t._prev && (t._prev._next = t._next), t._next && (t._next._prev = t._prev), t === this._head ? (this._head = t._next, t._next === null && (this._tail = null)) : t === this._tail && (this._tail = t._prev, this._tail._next = null), t._owner = null, this);
    }, i.prototype.detachAll = function() {
      var t = this._head;
      if (!t)
        return this;
      for (this._head = this._tail = null; t; )
        t._owner = null, t = t._next;
      return this;
    }, i;
  }()
);
function ko(i, t) {
  t = t || {};
  for (var e = {
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
  }, r = e.parser[t.strictMode ? "strict" : "loose"].exec(i), n = {}, s = 14; s--; )
    n[e.key[s]] = r[s] || "";
  return n[e.q.name] = {}, n[e.key[12]].replace(e.q.parser, function(a, o, h) {
    o && (n[e.q.name][o] = h);
  }), n;
}
var qi, jr = null, sd = 0, xa = 200, ad = 204, od = 1223, hd = 2;
function Ta() {
}
function Ea(i, t, e) {
  t && t.indexOf(".") === 0 && (t = t.substring(1)), t && (i[t] = e);
}
function Ji(i) {
  return i.toString().replace("object ", "");
}
var wt = (
  /** @class */
  function() {
    function i(t, e, r) {
      if (this._dequeue = Ta, this._onLoadBinding = null, this._elementTimer = 0, this._boundComplete = null, this._boundOnError = null, this._boundOnProgress = null, this._boundOnTimeout = null, this._boundXhrOnError = null, this._boundXhrOnTimeout = null, this._boundXhrOnAbort = null, this._boundXhrOnLoad = null, typeof t != "string" || typeof e != "string")
        throw new Error("Both name and url are required for constructing a resource.");
      r = r || {}, this._flags = 0, this._setFlag(i.STATUS_FLAGS.DATA_URL, e.indexOf("data:") === 0), this.name = t, this.url = e, this.extension = this._getExtension(), this.data = null, this.crossOrigin = r.crossOrigin === !0 ? "anonymous" : r.crossOrigin, this.timeout = r.timeout || 0, this.loadType = r.loadType || this._determineLoadType(), this.xhrType = r.xhrType, this.metadata = r.metadata || {}, this.error = null, this.xhr = null, this.children = [], this.type = i.TYPE.UNKNOWN, this.progressChunk = 0, this._dequeue = Ta, this._onLoadBinding = null, this._elementTimer = 0, this._boundComplete = this.complete.bind(this), this._boundOnError = this._onError.bind(this), this._boundOnProgress = this._onProgress.bind(this), this._boundOnTimeout = this._onTimeout.bind(this), this._boundXhrOnError = this._xhrOnError.bind(this), this._boundXhrOnTimeout = this._xhrOnTimeout.bind(this), this._boundXhrOnAbort = this._xhrOnAbort.bind(this), this._boundXhrOnLoad = this._xhrOnLoad.bind(this), this.onStart = new le(), this.onProgress = new le(), this.onComplete = new le(), this.onAfterMiddleware = new le();
    }
    return i.setExtensionLoadType = function(t, e) {
      Ea(i._loadTypeMap, t, e);
    }, i.setExtensionXhrType = function(t, e) {
      Ea(i._xhrTypeMap, t, e);
    }, Object.defineProperty(i.prototype, "isDataUrl", {
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
        return this._hasFlag(i.STATUS_FLAGS.DATA_URL);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "isComplete", {
      /**
       * Describes if this resource has finished loading. Is true when the resource has completely
       * loaded.
       * @readonly
       * @member {boolean}
       */
      get: function() {
        return this._hasFlag(i.STATUS_FLAGS.COMPLETE);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "isLoading", {
      /**
       * Describes if this resource is currently loading. Is true when the resource starts loading,
       * and is false again when complete.
       * @readonly
       * @member {boolean}
       */
      get: function() {
        return this._hasFlag(i.STATUS_FLAGS.LOADING);
      },
      enumerable: !1,
      configurable: !0
    }), i.prototype.complete = function() {
      this._clearEvents(), this._finish();
    }, i.prototype.abort = function(t) {
      if (!this.error) {
        if (this.error = new Error(t), this._clearEvents(), this.xhr)
          this.xhr.abort();
        else if (this.xdr)
          this.xdr.abort();
        else if (this.data)
          if (this.data.src)
            this.data.src = i.EMPTY_GIF;
          else
            for (; this.data.firstChild; )
              this.data.removeChild(this.data.firstChild);
        this._finish();
      }
    }, i.prototype.load = function(t) {
      var e = this;
      if (!this.isLoading) {
        if (this.isComplete) {
          t && setTimeout(function() {
            return t(e);
          }, 1);
          return;
        } else t && this.onComplete.once(t);
        switch (this._setFlag(i.STATUS_FLAGS.LOADING, !0), this.onStart.dispatch(this), (this.crossOrigin === !1 || typeof this.crossOrigin != "string") && (this.crossOrigin = this._determineCrossOrigin(this.url)), this.loadType) {
          case i.LOAD_TYPE.IMAGE:
            this.type = i.TYPE.IMAGE, this._loadElement("image");
            break;
          case i.LOAD_TYPE.AUDIO:
            this.type = i.TYPE.AUDIO, this._loadSourceElement("audio");
            break;
          case i.LOAD_TYPE.VIDEO:
            this.type = i.TYPE.VIDEO, this._loadSourceElement("video");
            break;
          case i.LOAD_TYPE.XHR:
          /* falls through */
          default:
            typeof qi > "u" && (qi = !!(globalThis.XDomainRequest && !("withCredentials" in new XMLHttpRequest()))), qi && this.crossOrigin ? this._loadXdr() : this._loadXhr();
            break;
        }
      }
    }, i.prototype._hasFlag = function(t) {
      return (this._flags & t) !== 0;
    }, i.prototype._setFlag = function(t, e) {
      this._flags = e ? this._flags | t : this._flags & ~t;
    }, i.prototype._clearEvents = function() {
      clearTimeout(this._elementTimer), this.data && this.data.removeEventListener && (this.data.removeEventListener("error", this._boundOnError, !1), this.data.removeEventListener("load", this._boundComplete, !1), this.data.removeEventListener("progress", this._boundOnProgress, !1), this.data.removeEventListener("canplaythrough", this._boundComplete, !1)), this.xhr && (this.xhr.removeEventListener ? (this.xhr.removeEventListener("error", this._boundXhrOnError, !1), this.xhr.removeEventListener("timeout", this._boundXhrOnTimeout, !1), this.xhr.removeEventListener("abort", this._boundXhrOnAbort, !1), this.xhr.removeEventListener("progress", this._boundOnProgress, !1), this.xhr.removeEventListener("load", this._boundXhrOnLoad, !1)) : (this.xhr.onerror = null, this.xhr.ontimeout = null, this.xhr.onprogress = null, this.xhr.onload = null));
    }, i.prototype._finish = function() {
      if (this.isComplete)
        throw new Error("Complete called again for an already completed resource.");
      this._setFlag(i.STATUS_FLAGS.COMPLETE, !0), this._setFlag(i.STATUS_FLAGS.LOADING, !1), this.onComplete.dispatch(this);
    }, i.prototype._loadElement = function(t) {
      this.metadata.loadElement ? this.data = this.metadata.loadElement : t === "image" && typeof globalThis.Image < "u" ? this.data = new Image() : this.data = document.createElement(t), this.crossOrigin && (this.data.crossOrigin = this.crossOrigin), this.metadata.skipSource || (this.data.src = this.url), this.data.addEventListener("error", this._boundOnError, !1), this.data.addEventListener("load", this._boundComplete, !1), this.data.addEventListener("progress", this._boundOnProgress, !1), this.timeout && (this._elementTimer = setTimeout(this._boundOnTimeout, this.timeout));
    }, i.prototype._loadSourceElement = function(t) {
      if (this.metadata.loadElement ? this.data = this.metadata.loadElement : t === "audio" && typeof globalThis.Audio < "u" ? this.data = new Audio() : this.data = document.createElement(t), this.data === null) {
        this.abort("Unsupported element: " + t);
        return;
      }
      if (this.crossOrigin && (this.data.crossOrigin = this.crossOrigin), !this.metadata.skipSource)
        if (navigator.isCocoonJS)
          this.data.src = Array.isArray(this.url) ? this.url[0] : this.url;
        else if (Array.isArray(this.url))
          for (var e = this.metadata.mimeType, r = 0; r < this.url.length; ++r)
            this.data.appendChild(this._createSource(t, this.url[r], Array.isArray(e) ? e[r] : e));
        else {
          var e = this.metadata.mimeType;
          this.data.appendChild(this._createSource(t, this.url, Array.isArray(e) ? e[0] : e));
        }
      this.data.addEventListener("error", this._boundOnError, !1), this.data.addEventListener("load", this._boundComplete, !1), this.data.addEventListener("progress", this._boundOnProgress, !1), this.data.addEventListener("canplaythrough", this._boundComplete, !1), this.data.load(), this.timeout && (this._elementTimer = setTimeout(this._boundOnTimeout, this.timeout));
    }, i.prototype._loadXhr = function() {
      typeof this.xhrType != "string" && (this.xhrType = this._determineXhrType());
      var t = this.xhr = new XMLHttpRequest();
      this.crossOrigin === "use-credentials" && (t.withCredentials = !0), t.open("GET", this.url, !0), t.timeout = this.timeout, this.xhrType === i.XHR_RESPONSE_TYPE.JSON || this.xhrType === i.XHR_RESPONSE_TYPE.DOCUMENT ? t.responseType = i.XHR_RESPONSE_TYPE.TEXT : t.responseType = this.xhrType, t.addEventListener("error", this._boundXhrOnError, !1), t.addEventListener("timeout", this._boundXhrOnTimeout, !1), t.addEventListener("abort", this._boundXhrOnAbort, !1), t.addEventListener("progress", this._boundOnProgress, !1), t.addEventListener("load", this._boundXhrOnLoad, !1), t.send();
    }, i.prototype._loadXdr = function() {
      typeof this.xhrType != "string" && (this.xhrType = this._determineXhrType());
      var t = this.xhr = new globalThis.XDomainRequest();
      t.timeout = this.timeout || 5e3, t.onerror = this._boundXhrOnError, t.ontimeout = this._boundXhrOnTimeout, t.onprogress = this._boundOnProgress, t.onload = this._boundXhrOnLoad, t.open("GET", this.url, !0), setTimeout(function() {
        return t.send();
      }, 1);
    }, i.prototype._createSource = function(t, e, r) {
      r || (r = t + "/" + this._getExtension(e));
      var n = document.createElement("source");
      return n.src = e, n.type = r, n;
    }, i.prototype._onError = function(t) {
      this.abort("Failed to load element using: " + t.target.nodeName);
    }, i.prototype._onProgress = function(t) {
      t && t.lengthComputable && this.onProgress.dispatch(this, t.loaded / t.total);
    }, i.prototype._onTimeout = function() {
      this.abort("Load timed out.");
    }, i.prototype._xhrOnError = function() {
      var t = this.xhr;
      this.abort(Ji(t) + " Request failed. Status: " + t.status + ', text: "' + t.statusText + '"');
    }, i.prototype._xhrOnTimeout = function() {
      var t = this.xhr;
      this.abort(Ji(t) + " Request timed out.");
    }, i.prototype._xhrOnAbort = function() {
      var t = this.xhr;
      this.abort(Ji(t) + " Request was aborted by the user.");
    }, i.prototype._xhrOnLoad = function() {
      var t = this.xhr, e = "", r = typeof t.status > "u" ? xa : t.status;
      (t.responseType === "" || t.responseType === "text" || typeof t.responseType > "u") && (e = t.responseText), r === sd && (e.length > 0 || t.responseType === i.XHR_RESPONSE_TYPE.BUFFER) ? r = xa : r === od && (r = ad);
      var n = r / 100 | 0;
      if (n === hd)
        if (this.xhrType === i.XHR_RESPONSE_TYPE.TEXT)
          this.data = e, this.type = i.TYPE.TEXT;
        else if (this.xhrType === i.XHR_RESPONSE_TYPE.JSON)
          try {
            this.data = JSON.parse(e), this.type = i.TYPE.JSON;
          } catch (o) {
            this.abort("Error trying to parse loaded json: " + o);
            return;
          }
        else if (this.xhrType === i.XHR_RESPONSE_TYPE.DOCUMENT)
          try {
            if (globalThis.DOMParser) {
              var s = new DOMParser();
              this.data = s.parseFromString(e, "text/xml");
            } else {
              var a = document.createElement("div");
              a.innerHTML = e, this.data = a;
            }
            this.type = i.TYPE.XML;
          } catch (o) {
            this.abort("Error trying to parse loaded xml: " + o);
            return;
          }
        else
          this.data = t.response || e;
      else {
        this.abort("[" + t.status + "] " + t.statusText + ": " + t.responseURL);
        return;
      }
      this.complete();
    }, i.prototype._determineCrossOrigin = function(t, e) {
      if (t.indexOf("data:") === 0)
        return "";
      if (globalThis.origin !== globalThis.location.origin)
        return "anonymous";
      e = e || globalThis.location, jr || (jr = document.createElement("a")), jr.href = t;
      var r = ko(jr.href, { strictMode: !0 }), n = !r.port && e.port === "" || r.port === e.port, s = r.protocol ? r.protocol + ":" : "";
      return r.host !== e.hostname || !n || s !== e.protocol ? "anonymous" : "";
    }, i.prototype._determineXhrType = function() {
      return i._xhrTypeMap[this.extension] || i.XHR_RESPONSE_TYPE.TEXT;
    }, i.prototype._determineLoadType = function() {
      return i._loadTypeMap[this.extension] || i.LOAD_TYPE.XHR;
    }, i.prototype._getExtension = function(t) {
      t === void 0 && (t = this.url);
      var e = "";
      if (this.isDataUrl) {
        var r = t.indexOf("/");
        e = t.substring(r + 1, t.indexOf(";", r));
      } else {
        var n = t.indexOf("?"), s = t.indexOf("#"), a = Math.min(n > -1 ? n : t.length, s > -1 ? s : t.length);
        t = t.substring(0, a), e = t.substring(t.lastIndexOf(".") + 1);
      }
      return e.toLowerCase();
    }, i.prototype._getMimeFromXhrType = function(t) {
      switch (t) {
        case i.XHR_RESPONSE_TYPE.BUFFER:
          return "application/octet-binary";
        case i.XHR_RESPONSE_TYPE.BLOB:
          return "application/blob";
        case i.XHR_RESPONSE_TYPE.DOCUMENT:
          return "application/xml";
        case i.XHR_RESPONSE_TYPE.JSON:
          return "application/json";
        case i.XHR_RESPONSE_TYPE.DEFAULT:
        case i.XHR_RESPONSE_TYPE.TEXT:
        /* falls through */
        default:
          return "text/plain";
      }
    }, i;
  }()
);
(function(i) {
  (function(t) {
    t[t.NONE = 0] = "NONE", t[t.DATA_URL = 1] = "DATA_URL", t[t.COMPLETE = 2] = "COMPLETE", t[t.LOADING = 4] = "LOADING";
  })(i.STATUS_FLAGS || (i.STATUS_FLAGS = {})), function(t) {
    t[t.UNKNOWN = 0] = "UNKNOWN", t[t.JSON = 1] = "JSON", t[t.XML = 2] = "XML", t[t.IMAGE = 3] = "IMAGE", t[t.AUDIO = 4] = "AUDIO", t[t.VIDEO = 5] = "VIDEO", t[t.TEXT = 6] = "TEXT";
  }(i.TYPE || (i.TYPE = {})), function(t) {
    t[t.XHR = 1] = "XHR", t[t.IMAGE = 2] = "IMAGE", t[t.AUDIO = 3] = "AUDIO", t[t.VIDEO = 4] = "VIDEO";
  }(i.LOAD_TYPE || (i.LOAD_TYPE = {})), function(t) {
    t.DEFAULT = "text", t.BUFFER = "arraybuffer", t.BLOB = "blob", t.DOCUMENT = "document", t.JSON = "json", t.TEXT = "text";
  }(i.XHR_RESPONSE_TYPE || (i.XHR_RESPONSE_TYPE = {})), i._loadTypeMap = {
    // images
    gif: i.LOAD_TYPE.IMAGE,
    png: i.LOAD_TYPE.IMAGE,
    bmp: i.LOAD_TYPE.IMAGE,
    jpg: i.LOAD_TYPE.IMAGE,
    jpeg: i.LOAD_TYPE.IMAGE,
    tif: i.LOAD_TYPE.IMAGE,
    tiff: i.LOAD_TYPE.IMAGE,
    webp: i.LOAD_TYPE.IMAGE,
    tga: i.LOAD_TYPE.IMAGE,
    avif: i.LOAD_TYPE.IMAGE,
    svg: i.LOAD_TYPE.IMAGE,
    "svg+xml": i.LOAD_TYPE.IMAGE,
    // audio
    mp3: i.LOAD_TYPE.AUDIO,
    ogg: i.LOAD_TYPE.AUDIO,
    wav: i.LOAD_TYPE.AUDIO,
    // videos
    mp4: i.LOAD_TYPE.VIDEO,
    webm: i.LOAD_TYPE.VIDEO
  }, i._xhrTypeMap = {
    // xml
    xhtml: i.XHR_RESPONSE_TYPE.DOCUMENT,
    html: i.XHR_RESPONSE_TYPE.DOCUMENT,
    htm: i.XHR_RESPONSE_TYPE.DOCUMENT,
    xml: i.XHR_RESPONSE_TYPE.DOCUMENT,
    tmx: i.XHR_RESPONSE_TYPE.DOCUMENT,
    svg: i.XHR_RESPONSE_TYPE.DOCUMENT,
    // This was added to handle Tiled Tileset XML, but .tsx is also a TypeScript React Component.
    // Since it is way less likely for people to be loading TypeScript files instead of Tiled files,
    // this should probably be fine.
    tsx: i.XHR_RESPONSE_TYPE.DOCUMENT,
    // images
    gif: i.XHR_RESPONSE_TYPE.BLOB,
    png: i.XHR_RESPONSE_TYPE.BLOB,
    bmp: i.XHR_RESPONSE_TYPE.BLOB,
    jpg: i.XHR_RESPONSE_TYPE.BLOB,
    jpeg: i.XHR_RESPONSE_TYPE.BLOB,
    tif: i.XHR_RESPONSE_TYPE.BLOB,
    tiff: i.XHR_RESPONSE_TYPE.BLOB,
    webp: i.XHR_RESPONSE_TYPE.BLOB,
    tga: i.XHR_RESPONSE_TYPE.BLOB,
    avif: i.XHR_RESPONSE_TYPE.BLOB,
    // json
    json: i.XHR_RESPONSE_TYPE.JSON,
    // text
    text: i.XHR_RESPONSE_TYPE.TEXT,
    txt: i.XHR_RESPONSE_TYPE.TEXT,
    // fonts
    ttf: i.XHR_RESPONSE_TYPE.BUFFER,
    otf: i.XHR_RESPONSE_TYPE.BUFFER
  }, i.EMPTY_GIF = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";
})(wt || (wt = {}));
function Ie() {
}
function ud(i) {
  return function() {
    for (var e = arguments, r = [], n = 0; n < arguments.length; n++)
      r[n] = e[n];
    if (i === null)
      throw new Error("Callback was already called.");
    var s = i;
    i = null, s.apply(this, r);
  };
}
var ld = (
  /** @class */
  /* @__PURE__ */ function() {
    function i(t, e) {
      this.data = t, this.callback = e;
    }
    return i;
  }()
), Ki = (
  /** @class */
  function() {
    function i(t, e) {
      var r = this;
      if (e === void 0 && (e = 1), this.workers = 0, this.saturated = Ie, this.unsaturated = Ie, this.empty = Ie, this.drain = Ie, this.error = Ie, this.started = !1, this.paused = !1, this._tasks = [], this._insert = function(n, s, a) {
        if (a && typeof a != "function")
          throw new Error("task callback must be a function");
        if (r.started = !0, n == null && r.idle()) {
          setTimeout(function() {
            return r.drain();
          }, 1);
          return;
        }
        var o = new ld(n, typeof a == "function" ? a : Ie);
        s ? r._tasks.unshift(o) : r._tasks.push(o), setTimeout(r.process, 1);
      }, this.process = function() {
        for (; !r.paused && r.workers < r.concurrency && r._tasks.length; ) {
          var n = r._tasks.shift();
          r._tasks.length === 0 && r.empty(), r.workers += 1, r.workers === r.concurrency && r.saturated(), r._worker(n.data, ud(r._next(n)));
        }
      }, this._worker = t, e === 0)
        throw new Error("Concurrency must not be zero");
      this.concurrency = e, this.buffer = e / 4;
    }
    return i.prototype._next = function(t) {
      var e = this;
      return function() {
        for (var r = arguments, n = [], s = 0; s < arguments.length; s++)
          n[s] = r[s];
        e.workers -= 1, t.callback.apply(t, n), n[0] != null && e.error(n[0], t.data), e.workers <= e.concurrency - e.buffer && e.unsaturated(), e.idle() && e.drain(), e.process();
      };
    }, i.prototype.push = function(t, e) {
      this._insert(t, !1, e);
    }, i.prototype.kill = function() {
      this.workers = 0, this.drain = Ie, this.started = !1, this._tasks = [];
    }, i.prototype.unshift = function(t, e) {
      this._insert(t, !0, e);
    }, i.prototype.length = function() {
      return this._tasks.length;
    }, i.prototype.running = function() {
      return this.workers;
    }, i.prototype.idle = function() {
      return this._tasks.length + this.workers === 0;
    }, i.prototype.pause = function() {
      this.paused !== !0 && (this.paused = !0);
    }, i.prototype.resume = function() {
      if (this.paused !== !1) {
        this.paused = !1;
        for (var t = 1; t <= this.concurrency; t++)
          this.process();
      }
    }, i.eachSeries = function(t, e, r, n) {
      var s = 0, a = t.length;
      function o(h) {
        if (h || s === a) {
          r && r(h);
          return;
        }
        n ? setTimeout(function() {
          e(t[s++], o);
        }, 1) : e(t[s++], o);
      }
      o();
    }, i.queue = function(t, e) {
      return new i(t, e);
    }, i;
  }()
), Qi = 100, fd = /(#[\w-]+)?$/, mi = (
  /** @class */
  function() {
    function i(t, e) {
      var r = this;
      t === void 0 && (t = ""), e === void 0 && (e = 10), this.progress = 0, this.loading = !1, this.defaultQueryString = "", this._beforeMiddleware = [], this._afterMiddleware = [], this._resourcesParsing = [], this._boundLoadResource = function(h, u) {
        return r._loadResource(h, u);
      }, this.resources = {}, this.baseUrl = t, this._beforeMiddleware = [], this._afterMiddleware = [], this._resourcesParsing = [], this._boundLoadResource = function(h, u) {
        return r._loadResource(h, u);
      }, this._queue = Ki.queue(this._boundLoadResource, e), this._queue.pause(), this.resources = {}, this.onProgress = new le(), this.onError = new le(), this.onLoad = new le(), this.onStart = new le(), this.onComplete = new le();
      for (var n = 0; n < i._plugins.length; ++n) {
        var s = i._plugins[n], a = s.pre, o = s.use;
        a && this.pre(a), o && this.use(o);
      }
      this._protected = !1;
    }
    return i.prototype._add = function(t, e, r, n) {
      if (this.loading && (!r || !r.parentResource))
        throw new Error("Cannot add resources while the loader is running.");
      if (this.resources[t])
        throw new Error('Resource named "' + t + '" already exists.');
      if (e = this._prepareUrl(e), this.resources[t] = new wt(t, e, r), typeof n == "function" && this.resources[t].onAfterMiddleware.once(n), this.loading) {
        for (var s = r.parentResource, a = [], o = 0; o < s.children.length; ++o)
          s.children[o].isComplete || a.push(s.children[o]);
        var h = s.progressChunk * (a.length + 1), u = h / (a.length + 2);
        s.children.push(this.resources[t]), s.progressChunk = u;
        for (var o = 0; o < a.length; ++o)
          a[o].progressChunk = u;
        this.resources[t].progressChunk = u;
      }
      return this._queue.push(this.resources[t]), this;
    }, i.prototype.pre = function(t) {
      return this._beforeMiddleware.push(t), this;
    }, i.prototype.use = function(t) {
      return this._afterMiddleware.push(t), this;
    }, i.prototype.reset = function() {
      this.progress = 0, this.loading = !1, this._queue.kill(), this._queue.pause();
      for (var t in this.resources) {
        var e = this.resources[t];
        e._onLoadBinding && e._onLoadBinding.detach(), e.isLoading && e.abort("loader reset");
      }
      return this.resources = {}, this;
    }, i.prototype.load = function(t) {
      if (Bt("6.5.0", "@pixi/loaders is being replaced with @pixi/assets in the next major release."), typeof t == "function" && this.onComplete.once(t), this.loading)
        return this;
      if (this._queue.idle())
        this._onStart(), this._onComplete();
      else {
        for (var e = this._queue._tasks.length, r = Qi / e, n = 0; n < this._queue._tasks.length; ++n)
          this._queue._tasks[n].data.progressChunk = r;
        this._onStart(), this._queue.resume();
      }
      return this;
    }, Object.defineProperty(i.prototype, "concurrency", {
      /**
       * The number of resources to load concurrently.
       * @default 10
       */
      get: function() {
        return this._queue.concurrency;
      },
      set: function(t) {
        this._queue.concurrency = t;
      },
      enumerable: !1,
      configurable: !0
    }), i.prototype._prepareUrl = function(t) {
      var e = ko(t, { strictMode: !0 }), r;
      if (e.protocol || !e.path || t.indexOf("//") === 0 ? r = t : this.baseUrl.length && this.baseUrl.lastIndexOf("/") !== this.baseUrl.length - 1 && t.charAt(0) !== "/" ? r = this.baseUrl + "/" + t : r = this.baseUrl + t, this.defaultQueryString) {
        var n = fd.exec(r)[0];
        r = r.slice(0, r.length - n.length), r.indexOf("?") !== -1 ? r += "&" + this.defaultQueryString : r += "?" + this.defaultQueryString, r += n;
      }
      return r;
    }, i.prototype._loadResource = function(t, e) {
      var r = this;
      t._dequeue = e, Ki.eachSeries(this._beforeMiddleware, function(n, s) {
        n.call(r, t, function() {
          s(t.isComplete ? {} : null);
        });
      }, function() {
        t.isComplete ? r._onLoad(t) : (t._onLoadBinding = t.onComplete.once(r._onLoad, r), t.load());
      }, !0);
    }, i.prototype._onStart = function() {
      this.progress = 0, this.loading = !0, this.onStart.dispatch(this);
    }, i.prototype._onComplete = function() {
      this.progress = Qi, this.loading = !1, this.onComplete.dispatch(this, this.resources);
    }, i.prototype._onLoad = function(t) {
      var e = this;
      t._onLoadBinding = null, this._resourcesParsing.push(t), t._dequeue(), Ki.eachSeries(this._afterMiddleware, function(r, n) {
        r.call(e, t, n);
      }, function() {
        t.onAfterMiddleware.dispatch(t), e.progress = Math.min(Qi, e.progress + t.progressChunk), e.onProgress.dispatch(e, t), t.error ? e.onError.dispatch(t.error, e, t) : e.onLoad.dispatch(e, t), e._resourcesParsing.splice(e._resourcesParsing.indexOf(t), 1), e._queue.idle() && e._resourcesParsing.length === 0 && e._onComplete();
      }, !0);
    }, i.prototype.destroy = function() {
      this._protected || this.reset();
    }, Object.defineProperty(i, "shared", {
      /** A premade instance of the loader that can be used to load resources. */
      get: function() {
        var t = i._shared;
        return t || (t = new i(), t._protected = !0, i._shared = t), t;
      },
      enumerable: !1,
      configurable: !0
    }), i.registerPlugin = function(t) {
      return Bt("6.5.0", "Loader.registerPlugin() is deprecated, use extensions.add() instead."), se.add({
        type: dt.Loader,
        ref: t
      }), i;
    }, i._plugins = [], i;
  }()
);
se.handleByList(dt.Loader, mi._plugins);
mi.prototype.add = function(t, e, r, n) {
  if (Array.isArray(t)) {
    for (var s = 0; s < t.length; ++s)
      this.add(t[s]);
    return this;
  }
  if (typeof t == "object" && (r = t, n = e || r.callback || r.onComplete, e = r.url, t = r.name || r.key || r.url), typeof e != "string" && (n = r, r = e, e = t), typeof e != "string")
    throw new Error("No url passed to add resource to loader.");
  return typeof r == "function" && (n = r, r = null), this._add(t, e, r, n);
};
var cd = (
  /** @class */
  function() {
    function i() {
    }
    return i.init = function(t) {
      t = Object.assign({
        sharedLoader: !1
      }, t), this.loader = t.sharedLoader ? mi.shared : new mi();
    }, i.destroy = function() {
      this.loader && (this.loader.destroy(), this.loader = null);
    }, i.extension = dt.Application, i;
  }()
), dd = (
  /** @class */
  function() {
    function i() {
    }
    return i.add = function() {
      wt.setExtensionLoadType("svg", wt.LOAD_TYPE.XHR), wt.setExtensionXhrType("svg", wt.XHR_RESPONSE_TYPE.TEXT);
    }, i.use = function(t, e) {
      if (t.data && (t.type === wt.TYPE.IMAGE || t.extension === "svg")) {
        var r = t.data, n = t.url, s = t.name, a = t.metadata;
        et.fromLoader(r, n, s, a).then(function(o) {
          t.texture = o, e();
        }).catch(e);
      } else
        e();
    }, i.extension = dt.Loader, i;
  }()
), pd = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
function vd(i) {
  for (var t = "", e = 0; e < i.length; ) {
    for (var r = [0, 0, 0], n = [0, 0, 0, 0], s = 0; s < r.length; ++s)
      e < i.length ? r[s] = i.charCodeAt(e++) & 255 : r[s] = 0;
    n[0] = r[0] >> 2, n[1] = (r[0] & 3) << 4 | r[1] >> 4, n[2] = (r[1] & 15) << 2 | r[2] >> 6, n[3] = r[2] & 63;
    var a = e - (i.length - 1);
    switch (a) {
      case 2:
        n[3] = 64, n[2] = 64;
        break;
      case 1:
        n[3] = 64;
        break;
    }
    for (var s = 0; s < n.length; ++s)
      t += pd.charAt(n[s]);
  }
  return t;
}
function _d(i, t) {
  if (!i.data) {
    t();
    return;
  }
  if (i.xhr && i.xhrType === wt.XHR_RESPONSE_TYPE.BLOB) {
    if (!self.Blob || typeof i.data == "string") {
      var e = i.xhr.getResponseHeader("content-type");
      if (e && e.indexOf("image") === 0) {
        i.data = new Image(), i.data.src = "data:" + e + ";base64," + vd(i.xhr.responseText), i.type = wt.TYPE.IMAGE, i.data.onload = function() {
          i.data.onload = null, t();
        };
        return;
      }
    } else if (i.data.type.indexOf("image") === 0) {
      var r = globalThis.URL || globalThis.webkitURL, n = r.createObjectURL(i.data);
      i.blob = i.data, i.data = new Image(), i.data.src = n, i.type = wt.TYPE.IMAGE, i.data.onload = function() {
        r.revokeObjectURL(n), i.data.onload = null, t();
      };
      return;
    }
  }
  t();
}
var md = (
  /** @class */
  function() {
    function i() {
    }
    return i.extension = dt.Loader, i.use = _d, i;
  }()
);
se.add(dd, md);
/*!
 * @pixi/compressed-textures - v6.5.10
 * Compiled Thu, 06 Jul 2023 15:25:11 UTC
 *
 * @pixi/compressed-textures is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
var ct, st;
(function(i) {
  i[i.COMPRESSED_RGB_S3TC_DXT1_EXT = 33776] = "COMPRESSED_RGB_S3TC_DXT1_EXT", i[i.COMPRESSED_RGBA_S3TC_DXT1_EXT = 33777] = "COMPRESSED_RGBA_S3TC_DXT1_EXT", i[i.COMPRESSED_RGBA_S3TC_DXT3_EXT = 33778] = "COMPRESSED_RGBA_S3TC_DXT3_EXT", i[i.COMPRESSED_RGBA_S3TC_DXT5_EXT = 33779] = "COMPRESSED_RGBA_S3TC_DXT5_EXT", i[i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT = 35917] = "COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT", i[i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT = 35918] = "COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT", i[i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT = 35919] = "COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT", i[i.COMPRESSED_SRGB_S3TC_DXT1_EXT = 35916] = "COMPRESSED_SRGB_S3TC_DXT1_EXT", i[i.COMPRESSED_R11_EAC = 37488] = "COMPRESSED_R11_EAC", i[i.COMPRESSED_SIGNED_R11_EAC = 37489] = "COMPRESSED_SIGNED_R11_EAC", i[i.COMPRESSED_RG11_EAC = 37490] = "COMPRESSED_RG11_EAC", i[i.COMPRESSED_SIGNED_RG11_EAC = 37491] = "COMPRESSED_SIGNED_RG11_EAC", i[i.COMPRESSED_RGB8_ETC2 = 37492] = "COMPRESSED_RGB8_ETC2", i[i.COMPRESSED_RGBA8_ETC2_EAC = 37496] = "COMPRESSED_RGBA8_ETC2_EAC", i[i.COMPRESSED_SRGB8_ETC2 = 37493] = "COMPRESSED_SRGB8_ETC2", i[i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC = 37497] = "COMPRESSED_SRGB8_ALPHA8_ETC2_EAC", i[i.COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2 = 37494] = "COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2", i[i.COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2 = 37495] = "COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2", i[i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG = 35840] = "COMPRESSED_RGB_PVRTC_4BPPV1_IMG", i[i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG = 35842] = "COMPRESSED_RGBA_PVRTC_4BPPV1_IMG", i[i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG = 35841] = "COMPRESSED_RGB_PVRTC_2BPPV1_IMG", i[i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG = 35843] = "COMPRESSED_RGBA_PVRTC_2BPPV1_IMG", i[i.COMPRESSED_RGB_ETC1_WEBGL = 36196] = "COMPRESSED_RGB_ETC1_WEBGL", i[i.COMPRESSED_RGB_ATC_WEBGL = 35986] = "COMPRESSED_RGB_ATC_WEBGL", i[i.COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL = 35986] = "COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL", i[i.COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL = 34798] = "COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL", i[i.COMPRESSED_RGBA_ASTC_4x4_KHR = 37808] = "COMPRESSED_RGBA_ASTC_4x4_KHR";
})(st || (st = {}));
var gi = (ct = {}, // WEBGL_compressed_texture_s3tc
ct[st.COMPRESSED_RGB_S3TC_DXT1_EXT] = 0.5, ct[st.COMPRESSED_RGBA_S3TC_DXT1_EXT] = 0.5, ct[st.COMPRESSED_RGBA_S3TC_DXT3_EXT] = 1, ct[st.COMPRESSED_RGBA_S3TC_DXT5_EXT] = 1, // WEBGL_compressed_texture_s3tc
ct[st.COMPRESSED_SRGB_S3TC_DXT1_EXT] = 0.5, ct[st.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT] = 0.5, ct[st.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT] = 1, ct[st.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT] = 1, // WEBGL_compressed_texture_etc
ct[st.COMPRESSED_R11_EAC] = 0.5, ct[st.COMPRESSED_SIGNED_R11_EAC] = 0.5, ct[st.COMPRESSED_RG11_EAC] = 1, ct[st.COMPRESSED_SIGNED_RG11_EAC] = 1, ct[st.COMPRESSED_RGB8_ETC2] = 0.5, ct[st.COMPRESSED_RGBA8_ETC2_EAC] = 1, ct[st.COMPRESSED_SRGB8_ETC2] = 0.5, ct[st.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC] = 1, ct[st.COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2] = 0.5, ct[st.COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2] = 0.5, // WEBGL_compressed_texture_pvrtc
ct[st.COMPRESSED_RGB_PVRTC_4BPPV1_IMG] = 0.5, ct[st.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG] = 0.5, ct[st.COMPRESSED_RGB_PVRTC_2BPPV1_IMG] = 0.25, ct[st.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG] = 0.25, // WEBGL_compressed_texture_etc1
ct[st.COMPRESSED_RGB_ETC1_WEBGL] = 0.5, // @see https://www.khronos.org/registry/OpenGL/extensions/AMD/AMD_compressed_ATC_texture.txt
// WEBGL_compressed_texture_atc
ct[st.COMPRESSED_RGB_ATC_WEBGL] = 0.5, ct[st.COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL] = 1, ct[st.COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL] = 1, // @see https://registry.khronos.org/OpenGL/extensions/KHR/KHR_texture_compression_astc_hdr.txt
// WEBGL_compressed_texture_astc
/* eslint-disable-next-line camelcase */
ct[st.COMPRESSED_RGBA_ASTC_4x4_KHR] = 1, ct);
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var xn = function(i, t) {
  return xn = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, r) {
    e.__proto__ = r;
  } || function(e, r) {
    for (var n in r)
      r.hasOwnProperty(n) && (e[n] = r[n]);
  }, xn(i, t);
};
function Uo(i, t) {
  xn(i, t);
  function e() {
    this.constructor = i;
  }
  i.prototype = t === null ? Object.create(t) : (e.prototype = t.prototype, new e());
}
function gd(i, t, e, r) {
  function n(s) {
    return s instanceof e ? s : new e(function(a) {
      a(s);
    });
  }
  return new (e || (e = Promise))(function(s, a) {
    function o(l) {
      try {
        u(r.next(l));
      } catch (f) {
        a(f);
      }
    }
    function h(l) {
      try {
        u(r.throw(l));
      } catch (f) {
        a(f);
      }
    }
    function u(l) {
      l.done ? s(l.value) : n(l.value).then(o, h);
    }
    u((r = r.apply(i, [])).next());
  });
}
function yd(i, t) {
  var e = { label: 0, sent: function() {
    if (s[0] & 1)
      throw s[1];
    return s[1];
  }, trys: [], ops: [] }, r, n, s, a;
  return a = { next: o(0), throw: o(1), return: o(2) }, typeof Symbol == "function" && (a[Symbol.iterator] = function() {
    return this;
  }), a;
  function o(u) {
    return function(l) {
      return h([u, l]);
    };
  }
  function h(u) {
    if (r)
      throw new TypeError("Generator is already executing.");
    for (; e; )
      try {
        if (r = 1, n && (s = u[0] & 2 ? n.return : u[0] ? n.throw || ((s = n.return) && s.call(n), 0) : n.next) && !(s = s.call(n, u[1])).done)
          return s;
        switch (n = 0, s && (u = [u[0] & 2, s.value]), u[0]) {
          case 0:
          case 1:
            s = u;
            break;
          case 4:
            return e.label++, { value: u[1], done: !1 };
          case 5:
            e.label++, n = u[1], u = [0];
            continue;
          case 7:
            u = e.ops.pop(), e.trys.pop();
            continue;
          default:
            if (s = e.trys, !(s = s.length > 0 && s[s.length - 1]) && (u[0] === 6 || u[0] === 2)) {
              e = 0;
              continue;
            }
            if (u[0] === 3 && (!s || u[1] > s[0] && u[1] < s[3])) {
              e.label = u[1];
              break;
            }
            if (u[0] === 6 && e.label < s[1]) {
              e.label = s[1], s = u;
              break;
            }
            if (s && e.label < s[2]) {
              e.label = s[2], e.ops.push(u);
              break;
            }
            s[2] && e.ops.pop(), e.trys.pop();
            continue;
        }
        u = t.call(i, e);
      } catch (l) {
        u = [6, l], n = 0;
      } finally {
        r = s = 0;
      }
    if (u[0] & 5)
      throw u[1];
    return { value: u[0] ? u[1] : void 0, done: !0 };
  }
}
var bd = (
  /** @class */
  function(i) {
    Uo(t, i);
    function t(e, r) {
      r === void 0 && (r = { width: 1, height: 1, autoLoad: !0 });
      var n = this, s, a;
      return typeof e == "string" ? (s = e, a = new Uint8Array()) : (s = null, a = e), n = i.call(this, a, r) || this, n.origin = s, n.buffer = a ? new _i(a) : null, n.origin && r.autoLoad !== !1 && n.load(), a && a.length && (n.loaded = !0, n.onBlobLoaded(n.buffer.rawBinaryData)), n;
    }
    return t.prototype.onBlobLoaded = function(e) {
    }, t.prototype.load = function() {
      return gd(this, void 0, Promise, function() {
        var e, r, n;
        return yd(this, function(s) {
          switch (s.label) {
            case 0:
              return [4, fetch(this.origin)];
            case 1:
              return e = s.sent(), [4, e.blob()];
            case 2:
              return r = s.sent(), [4, r.arrayBuffer()];
            case 3:
              return n = s.sent(), this.data = new Uint32Array(n), this.buffer = new _i(n), this.loaded = !0, this.onBlobLoaded(n), this.update(), [2, this];
          }
        });
      });
    }, t;
  }(ke)
), Tn = (
  /** @class */
  function(i) {
    Uo(t, i);
    function t(e, r) {
      var n = i.call(this, e, r) || this;
      return n.format = r.format, n.levels = r.levels || 1, n._width = r.width, n._height = r.height, n._extension = t._formatToExtension(n.format), (r.levelBuffers || n.buffer) && (n._levelBuffers = r.levelBuffers || t._createLevelBuffers(
        e instanceof Uint8Array ? e : n.buffer.uint8View,
        n.format,
        n.levels,
        4,
        4,
        // PVRTC has 8x4 blocks in 2bpp mode
        n.width,
        n.height
      )), n;
    }
    return t.prototype.upload = function(e, r, n) {
      var s = e.gl, a = e.context.extensions[this._extension];
      if (!a)
        throw new Error(this._extension + " textures are not supported on the current machine");
      if (!this._levelBuffers)
        return !1;
      for (var o = 0, h = this.levels; o < h; o++) {
        var u = this._levelBuffers[o], l = u.levelID, f = u.levelWidth, c = u.levelHeight, d = u.levelBuffer;
        s.compressedTexImage2D(s.TEXTURE_2D, l, this.format, f, c, 0, d);
      }
      return !0;
    }, t.prototype.onBlobLoaded = function() {
      this._levelBuffers = t._createLevelBuffers(
        this.buffer.uint8View,
        this.format,
        this.levels,
        4,
        4,
        // PVRTC has 8x4 blocks in 2bpp mode
        this.width,
        this.height
      );
    }, t._formatToExtension = function(e) {
      if (e >= 33776 && e <= 33779)
        return "s3tc";
      if (e >= 37488 && e <= 37497)
        return "etc";
      if (e >= 35840 && e <= 35843)
        return "pvrtc";
      if (e >= 36196)
        return "etc1";
      if (e >= 35986 && e <= 34798)
        return "atc";
      throw new Error("Invalid (compressed) texture format given!");
    }, t._createLevelBuffers = function(e, r, n, s, a, o, h) {
      for (var u = new Array(n), l = e.byteOffset, f = o, c = h, d = f + s - 1 & ~(s - 1), p = c + a - 1 & ~(a - 1), v = d * p * gi[r], _ = 0; _ < n; _++)
        u[_] = {
          levelID: _,
          levelWidth: n > 1 ? f : d,
          levelHeight: n > 1 ? c : p,
          levelBuffer: new Uint8Array(e.buffer, l, v)
        }, l += v, f = f >> 1 || 1, c = c >> 1 || 1, d = f + s - 1 & ~(s - 1), p = c + a - 1 & ~(a - 1), v = d * p * gi[r];
      return u;
    }, t;
  }(bd)
), xd = (
  /** @class */
  function() {
    function i() {
    }
    return i.use = function(t, e) {
      var r = t.data, n = this;
      if (t.type === wt.TYPE.JSON && r && r.cacheID && r.textures) {
        for (var s = r.textures, a = void 0, o = void 0, h = 0, u = s.length; h < u; h++) {
          var l = s[h], f = l.src, c = l.format;
          if (c || (o = f), i.textureFormats[c]) {
            a = f;
            break;
          }
        }
        if (a = a || o, !a) {
          e(new Error("Cannot load compressed-textures in " + t.url + ", make sure you provide a fallback"));
          return;
        }
        if (a === t.url) {
          e(new Error("URL of compressed texture cannot be the same as the manifest's URL"));
          return;
        }
        var d = {
          crossOrigin: t.crossOrigin,
          metadata: t.metadata.imageMetadata,
          parentResource: t
        }, p = ze.resolve(t.url.replace(n.baseUrl, ""), a), v = r.cacheID;
        n.add(v, p, d, function(_) {
          if (_.error) {
            e(_.error);
            return;
          }
          var g = _.texture, I = g === void 0 ? null : g, E = _.textures, B = E === void 0 ? {} : E;
          Object.assign(t, { texture: I, textures: B }), e();
        });
      } else
        e();
    }, Object.defineProperty(i, "textureExtensions", {
      /**  Map of available texture extensions. */
      get: function() {
        if (!i._textureExtensions) {
          var t = z.ADAPTER.createCanvas(), e = t.getContext("webgl");
          if (!e)
            return console.warn("WebGL not available for compressed textures. Silently failing."), {};
          var r = {
            s3tc: e.getExtension("WEBGL_compressed_texture_s3tc"),
            s3tc_sRGB: e.getExtension("WEBGL_compressed_texture_s3tc_srgb"),
            etc: e.getExtension("WEBGL_compressed_texture_etc"),
            etc1: e.getExtension("WEBGL_compressed_texture_etc1"),
            pvrtc: e.getExtension("WEBGL_compressed_texture_pvrtc") || e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc"),
            atc: e.getExtension("WEBGL_compressed_texture_atc"),
            astc: e.getExtension("WEBGL_compressed_texture_astc")
          };
          i._textureExtensions = r;
        }
        return i._textureExtensions;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i, "textureFormats", {
      /** Map of available texture formats. */
      get: function() {
        if (!i._textureFormats) {
          var t = i.textureExtensions;
          i._textureFormats = {};
          for (var e in t) {
            var r = t[e];
            r && Object.assign(i._textureFormats, Object.getPrototypeOf(r));
          }
        }
        return i._textureFormats;
      },
      enumerable: !1,
      configurable: !0
    }), i.extension = dt.Loader, i;
  }()
);
function Go(i, t, e) {
  var r = {
    textures: {},
    texture: null
  };
  if (!t)
    return r;
  var n = t.map(function(s) {
    return new et(new ot(s, Object.assign({
      mipmap: Zt.OFF,
      alphaMode: qt.NO_PREMULTIPLIED_ALPHA
    }, e)));
  });
  return n.forEach(function(s, a) {
    var o = s.baseTexture, h = i + "-" + (a + 1);
    ot.addToCache(o, h), et.addToCache(s, h), a === 0 && (ot.addToCache(o, i), et.addToCache(s, i), r.texture = s), r.textures[h] = s;
  }), r;
}
var ar, jt, tn = 4, Hr = 124, Td = 32, wa = 20, Ed = 542327876, Xr = {
  SIZE: 1,
  FLAGS: 2,
  HEIGHT: 3,
  WIDTH: 4,
  MIPMAP_COUNT: 7,
  PIXEL_FORMAT: 19
}, wd = {
  SIZE: 0,
  FLAGS: 1,
  FOURCC: 2,
  RGB_BITCOUNT: 3,
  R_BIT_MASK: 4,
  G_BIT_MASK: 5,
  B_BIT_MASK: 6,
  A_BIT_MASK: 7
}, zr = {
  DXGI_FORMAT: 0,
  RESOURCE_DIMENSION: 1,
  MISC_FLAG: 2,
  ARRAY_SIZE: 3,
  MISC_FLAGS2: 4
}, zt;
(function(i) {
  i[i.DXGI_FORMAT_UNKNOWN = 0] = "DXGI_FORMAT_UNKNOWN", i[i.DXGI_FORMAT_R32G32B32A32_TYPELESS = 1] = "DXGI_FORMAT_R32G32B32A32_TYPELESS", i[i.DXGI_FORMAT_R32G32B32A32_FLOAT = 2] = "DXGI_FORMAT_R32G32B32A32_FLOAT", i[i.DXGI_FORMAT_R32G32B32A32_UINT = 3] = "DXGI_FORMAT_R32G32B32A32_UINT", i[i.DXGI_FORMAT_R32G32B32A32_SINT = 4] = "DXGI_FORMAT_R32G32B32A32_SINT", i[i.DXGI_FORMAT_R32G32B32_TYPELESS = 5] = "DXGI_FORMAT_R32G32B32_TYPELESS", i[i.DXGI_FORMAT_R32G32B32_FLOAT = 6] = "DXGI_FORMAT_R32G32B32_FLOAT", i[i.DXGI_FORMAT_R32G32B32_UINT = 7] = "DXGI_FORMAT_R32G32B32_UINT", i[i.DXGI_FORMAT_R32G32B32_SINT = 8] = "DXGI_FORMAT_R32G32B32_SINT", i[i.DXGI_FORMAT_R16G16B16A16_TYPELESS = 9] = "DXGI_FORMAT_R16G16B16A16_TYPELESS", i[i.DXGI_FORMAT_R16G16B16A16_FLOAT = 10] = "DXGI_FORMAT_R16G16B16A16_FLOAT", i[i.DXGI_FORMAT_R16G16B16A16_UNORM = 11] = "DXGI_FORMAT_R16G16B16A16_UNORM", i[i.DXGI_FORMAT_R16G16B16A16_UINT = 12] = "DXGI_FORMAT_R16G16B16A16_UINT", i[i.DXGI_FORMAT_R16G16B16A16_SNORM = 13] = "DXGI_FORMAT_R16G16B16A16_SNORM", i[i.DXGI_FORMAT_R16G16B16A16_SINT = 14] = "DXGI_FORMAT_R16G16B16A16_SINT", i[i.DXGI_FORMAT_R32G32_TYPELESS = 15] = "DXGI_FORMAT_R32G32_TYPELESS", i[i.DXGI_FORMAT_R32G32_FLOAT = 16] = "DXGI_FORMAT_R32G32_FLOAT", i[i.DXGI_FORMAT_R32G32_UINT = 17] = "DXGI_FORMAT_R32G32_UINT", i[i.DXGI_FORMAT_R32G32_SINT = 18] = "DXGI_FORMAT_R32G32_SINT", i[i.DXGI_FORMAT_R32G8X24_TYPELESS = 19] = "DXGI_FORMAT_R32G8X24_TYPELESS", i[i.DXGI_FORMAT_D32_FLOAT_S8X24_UINT = 20] = "DXGI_FORMAT_D32_FLOAT_S8X24_UINT", i[i.DXGI_FORMAT_R32_FLOAT_X8X24_TYPELESS = 21] = "DXGI_FORMAT_R32_FLOAT_X8X24_TYPELESS", i[i.DXGI_FORMAT_X32_TYPELESS_G8X24_UINT = 22] = "DXGI_FORMAT_X32_TYPELESS_G8X24_UINT", i[i.DXGI_FORMAT_R10G10B10A2_TYPELESS = 23] = "DXGI_FORMAT_R10G10B10A2_TYPELESS", i[i.DXGI_FORMAT_R10G10B10A2_UNORM = 24] = "DXGI_FORMAT_R10G10B10A2_UNORM", i[i.DXGI_FORMAT_R10G10B10A2_UINT = 25] = "DXGI_FORMAT_R10G10B10A2_UINT", i[i.DXGI_FORMAT_R11G11B10_FLOAT = 26] = "DXGI_FORMAT_R11G11B10_FLOAT", i[i.DXGI_FORMAT_R8G8B8A8_TYPELESS = 27] = "DXGI_FORMAT_R8G8B8A8_TYPELESS", i[i.DXGI_FORMAT_R8G8B8A8_UNORM = 28] = "DXGI_FORMAT_R8G8B8A8_UNORM", i[i.DXGI_FORMAT_R8G8B8A8_UNORM_SRGB = 29] = "DXGI_FORMAT_R8G8B8A8_UNORM_SRGB", i[i.DXGI_FORMAT_R8G8B8A8_UINT = 30] = "DXGI_FORMAT_R8G8B8A8_UINT", i[i.DXGI_FORMAT_R8G8B8A8_SNORM = 31] = "DXGI_FORMAT_R8G8B8A8_SNORM", i[i.DXGI_FORMAT_R8G8B8A8_SINT = 32] = "DXGI_FORMAT_R8G8B8A8_SINT", i[i.DXGI_FORMAT_R16G16_TYPELESS = 33] = "DXGI_FORMAT_R16G16_TYPELESS", i[i.DXGI_FORMAT_R16G16_FLOAT = 34] = "DXGI_FORMAT_R16G16_FLOAT", i[i.DXGI_FORMAT_R16G16_UNORM = 35] = "DXGI_FORMAT_R16G16_UNORM", i[i.DXGI_FORMAT_R16G16_UINT = 36] = "DXGI_FORMAT_R16G16_UINT", i[i.DXGI_FORMAT_R16G16_SNORM = 37] = "DXGI_FORMAT_R16G16_SNORM", i[i.DXGI_FORMAT_R16G16_SINT = 38] = "DXGI_FORMAT_R16G16_SINT", i[i.DXGI_FORMAT_R32_TYPELESS = 39] = "DXGI_FORMAT_R32_TYPELESS", i[i.DXGI_FORMAT_D32_FLOAT = 40] = "DXGI_FORMAT_D32_FLOAT", i[i.DXGI_FORMAT_R32_FLOAT = 41] = "DXGI_FORMAT_R32_FLOAT", i[i.DXGI_FORMAT_R32_UINT = 42] = "DXGI_FORMAT_R32_UINT", i[i.DXGI_FORMAT_R32_SINT = 43] = "DXGI_FORMAT_R32_SINT", i[i.DXGI_FORMAT_R24G8_TYPELESS = 44] = "DXGI_FORMAT_R24G8_TYPELESS", i[i.DXGI_FORMAT_D24_UNORM_S8_UINT = 45] = "DXGI_FORMAT_D24_UNORM_S8_UINT", i[i.DXGI_FORMAT_R24_UNORM_X8_TYPELESS = 46] = "DXGI_FORMAT_R24_UNORM_X8_TYPELESS", i[i.DXGI_FORMAT_X24_TYPELESS_G8_UINT = 47] = "DXGI_FORMAT_X24_TYPELESS_G8_UINT", i[i.DXGI_FORMAT_R8G8_TYPELESS = 48] = "DXGI_FORMAT_R8G8_TYPELESS", i[i.DXGI_FORMAT_R8G8_UNORM = 49] = "DXGI_FORMAT_R8G8_UNORM", i[i.DXGI_FORMAT_R8G8_UINT = 50] = "DXGI_FORMAT_R8G8_UINT", i[i.DXGI_FORMAT_R8G8_SNORM = 51] = "DXGI_FORMAT_R8G8_SNORM", i[i.DXGI_FORMAT_R8G8_SINT = 52] = "DXGI_FORMAT_R8G8_SINT", i[i.DXGI_FORMAT_R16_TYPELESS = 53] = "DXGI_FORMAT_R16_TYPELESS", i[i.DXGI_FORMAT_R16_FLOAT = 54] = "DXGI_FORMAT_R16_FLOAT", i[i.DXGI_FORMAT_D16_UNORM = 55] = "DXGI_FORMAT_D16_UNORM", i[i.DXGI_FORMAT_R16_UNORM = 56] = "DXGI_FORMAT_R16_UNORM", i[i.DXGI_FORMAT_R16_UINT = 57] = "DXGI_FORMAT_R16_UINT", i[i.DXGI_FORMAT_R16_SNORM = 58] = "DXGI_FORMAT_R16_SNORM", i[i.DXGI_FORMAT_R16_SINT = 59] = "DXGI_FORMAT_R16_SINT", i[i.DXGI_FORMAT_R8_TYPELESS = 60] = "DXGI_FORMAT_R8_TYPELESS", i[i.DXGI_FORMAT_R8_UNORM = 61] = "DXGI_FORMAT_R8_UNORM", i[i.DXGI_FORMAT_R8_UINT = 62] = "DXGI_FORMAT_R8_UINT", i[i.DXGI_FORMAT_R8_SNORM = 63] = "DXGI_FORMAT_R8_SNORM", i[i.DXGI_FORMAT_R8_SINT = 64] = "DXGI_FORMAT_R8_SINT", i[i.DXGI_FORMAT_A8_UNORM = 65] = "DXGI_FORMAT_A8_UNORM", i[i.DXGI_FORMAT_R1_UNORM = 66] = "DXGI_FORMAT_R1_UNORM", i[i.DXGI_FORMAT_R9G9B9E5_SHAREDEXP = 67] = "DXGI_FORMAT_R9G9B9E5_SHAREDEXP", i[i.DXGI_FORMAT_R8G8_B8G8_UNORM = 68] = "DXGI_FORMAT_R8G8_B8G8_UNORM", i[i.DXGI_FORMAT_G8R8_G8B8_UNORM = 69] = "DXGI_FORMAT_G8R8_G8B8_UNORM", i[i.DXGI_FORMAT_BC1_TYPELESS = 70] = "DXGI_FORMAT_BC1_TYPELESS", i[i.DXGI_FORMAT_BC1_UNORM = 71] = "DXGI_FORMAT_BC1_UNORM", i[i.DXGI_FORMAT_BC1_UNORM_SRGB = 72] = "DXGI_FORMAT_BC1_UNORM_SRGB", i[i.DXGI_FORMAT_BC2_TYPELESS = 73] = "DXGI_FORMAT_BC2_TYPELESS", i[i.DXGI_FORMAT_BC2_UNORM = 74] = "DXGI_FORMAT_BC2_UNORM", i[i.DXGI_FORMAT_BC2_UNORM_SRGB = 75] = "DXGI_FORMAT_BC2_UNORM_SRGB", i[i.DXGI_FORMAT_BC3_TYPELESS = 76] = "DXGI_FORMAT_BC3_TYPELESS", i[i.DXGI_FORMAT_BC3_UNORM = 77] = "DXGI_FORMAT_BC3_UNORM", i[i.DXGI_FORMAT_BC3_UNORM_SRGB = 78] = "DXGI_FORMAT_BC3_UNORM_SRGB", i[i.DXGI_FORMAT_BC4_TYPELESS = 79] = "DXGI_FORMAT_BC4_TYPELESS", i[i.DXGI_FORMAT_BC4_UNORM = 80] = "DXGI_FORMAT_BC4_UNORM", i[i.DXGI_FORMAT_BC4_SNORM = 81] = "DXGI_FORMAT_BC4_SNORM", i[i.DXGI_FORMAT_BC5_TYPELESS = 82] = "DXGI_FORMAT_BC5_TYPELESS", i[i.DXGI_FORMAT_BC5_UNORM = 83] = "DXGI_FORMAT_BC5_UNORM", i[i.DXGI_FORMAT_BC5_SNORM = 84] = "DXGI_FORMAT_BC5_SNORM", i[i.DXGI_FORMAT_B5G6R5_UNORM = 85] = "DXGI_FORMAT_B5G6R5_UNORM", i[i.DXGI_FORMAT_B5G5R5A1_UNORM = 86] = "DXGI_FORMAT_B5G5R5A1_UNORM", i[i.DXGI_FORMAT_B8G8R8A8_UNORM = 87] = "DXGI_FORMAT_B8G8R8A8_UNORM", i[i.DXGI_FORMAT_B8G8R8X8_UNORM = 88] = "DXGI_FORMAT_B8G8R8X8_UNORM", i[i.DXGI_FORMAT_R10G10B10_XR_BIAS_A2_UNORM = 89] = "DXGI_FORMAT_R10G10B10_XR_BIAS_A2_UNORM", i[i.DXGI_FORMAT_B8G8R8A8_TYPELESS = 90] = "DXGI_FORMAT_B8G8R8A8_TYPELESS", i[i.DXGI_FORMAT_B8G8R8A8_UNORM_SRGB = 91] = "DXGI_FORMAT_B8G8R8A8_UNORM_SRGB", i[i.DXGI_FORMAT_B8G8R8X8_TYPELESS = 92] = "DXGI_FORMAT_B8G8R8X8_TYPELESS", i[i.DXGI_FORMAT_B8G8R8X8_UNORM_SRGB = 93] = "DXGI_FORMAT_B8G8R8X8_UNORM_SRGB", i[i.DXGI_FORMAT_BC6H_TYPELESS = 94] = "DXGI_FORMAT_BC6H_TYPELESS", i[i.DXGI_FORMAT_BC6H_UF16 = 95] = "DXGI_FORMAT_BC6H_UF16", i[i.DXGI_FORMAT_BC6H_SF16 = 96] = "DXGI_FORMAT_BC6H_SF16", i[i.DXGI_FORMAT_BC7_TYPELESS = 97] = "DXGI_FORMAT_BC7_TYPELESS", i[i.DXGI_FORMAT_BC7_UNORM = 98] = "DXGI_FORMAT_BC7_UNORM", i[i.DXGI_FORMAT_BC7_UNORM_SRGB = 99] = "DXGI_FORMAT_BC7_UNORM_SRGB", i[i.DXGI_FORMAT_AYUV = 100] = "DXGI_FORMAT_AYUV", i[i.DXGI_FORMAT_Y410 = 101] = "DXGI_FORMAT_Y410", i[i.DXGI_FORMAT_Y416 = 102] = "DXGI_FORMAT_Y416", i[i.DXGI_FORMAT_NV12 = 103] = "DXGI_FORMAT_NV12", i[i.DXGI_FORMAT_P010 = 104] = "DXGI_FORMAT_P010", i[i.DXGI_FORMAT_P016 = 105] = "DXGI_FORMAT_P016", i[i.DXGI_FORMAT_420_OPAQUE = 106] = "DXGI_FORMAT_420_OPAQUE", i[i.DXGI_FORMAT_YUY2 = 107] = "DXGI_FORMAT_YUY2", i[i.DXGI_FORMAT_Y210 = 108] = "DXGI_FORMAT_Y210", i[i.DXGI_FORMAT_Y216 = 109] = "DXGI_FORMAT_Y216", i[i.DXGI_FORMAT_NV11 = 110] = "DXGI_FORMAT_NV11", i[i.DXGI_FORMAT_AI44 = 111] = "DXGI_FORMAT_AI44", i[i.DXGI_FORMAT_IA44 = 112] = "DXGI_FORMAT_IA44", i[i.DXGI_FORMAT_P8 = 113] = "DXGI_FORMAT_P8", i[i.DXGI_FORMAT_A8P8 = 114] = "DXGI_FORMAT_A8P8", i[i.DXGI_FORMAT_B4G4R4A4_UNORM = 115] = "DXGI_FORMAT_B4G4R4A4_UNORM", i[i.DXGI_FORMAT_P208 = 116] = "DXGI_FORMAT_P208", i[i.DXGI_FORMAT_V208 = 117] = "DXGI_FORMAT_V208", i[i.DXGI_FORMAT_V408 = 118] = "DXGI_FORMAT_V408", i[i.DXGI_FORMAT_SAMPLER_FEEDBACK_MIN_MIP_OPAQUE = 119] = "DXGI_FORMAT_SAMPLER_FEEDBACK_MIN_MIP_OPAQUE", i[i.DXGI_FORMAT_SAMPLER_FEEDBACK_MIP_REGION_USED_OPAQUE = 120] = "DXGI_FORMAT_SAMPLER_FEEDBACK_MIP_REGION_USED_OPAQUE", i[i.DXGI_FORMAT_FORCE_UINT = 121] = "DXGI_FORMAT_FORCE_UINT";
})(zt || (zt = {}));
var En;
(function(i) {
  i[i.DDS_DIMENSION_TEXTURE1D = 2] = "DDS_DIMENSION_TEXTURE1D", i[i.DDS_DIMENSION_TEXTURE2D = 3] = "DDS_DIMENSION_TEXTURE2D", i[i.DDS_DIMENSION_TEXTURE3D = 6] = "DDS_DIMENSION_TEXTURE3D";
})(En || (En = {}));
var Sd = 1, Id = 2, Pd = 4, Md = 64, Cd = 512, Ad = 131072, Rd = 827611204, Od = 861165636, Nd = 894720068, Dd = 808540228, Ld = 4, Bd = (ar = {}, ar[Rd] = st.COMPRESSED_RGBA_S3TC_DXT1_EXT, ar[Od] = st.COMPRESSED_RGBA_S3TC_DXT3_EXT, ar[Nd] = st.COMPRESSED_RGBA_S3TC_DXT5_EXT, ar), Fd = (jt = {}, // WEBGL_compressed_texture_s3tc
jt[zt.DXGI_FORMAT_BC1_TYPELESS] = st.COMPRESSED_RGBA_S3TC_DXT1_EXT, jt[zt.DXGI_FORMAT_BC1_UNORM] = st.COMPRESSED_RGBA_S3TC_DXT1_EXT, jt[zt.DXGI_FORMAT_BC2_TYPELESS] = st.COMPRESSED_RGBA_S3TC_DXT3_EXT, jt[zt.DXGI_FORMAT_BC2_UNORM] = st.COMPRESSED_RGBA_S3TC_DXT3_EXT, jt[zt.DXGI_FORMAT_BC3_TYPELESS] = st.COMPRESSED_RGBA_S3TC_DXT5_EXT, jt[zt.DXGI_FORMAT_BC3_UNORM] = st.COMPRESSED_RGBA_S3TC_DXT5_EXT, // WEBGL_compressed_texture_s3tc_srgb
jt[zt.DXGI_FORMAT_BC1_UNORM_SRGB] = st.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT, jt[zt.DXGI_FORMAT_BC2_UNORM_SRGB] = st.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT, jt[zt.DXGI_FORMAT_BC3_UNORM_SRGB] = st.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT, jt);
function kd(i) {
  var t = new Uint32Array(i), e = t[0];
  if (e !== Ed)
    throw new Error("Invalid DDS file magic word");
  var r = new Uint32Array(i, 0, Hr / Uint32Array.BYTES_PER_ELEMENT), n = r[Xr.HEIGHT], s = r[Xr.WIDTH], a = r[Xr.MIPMAP_COUNT], o = new Uint32Array(i, Xr.PIXEL_FORMAT * Uint32Array.BYTES_PER_ELEMENT, Td / Uint32Array.BYTES_PER_ELEMENT), h = o[Sd];
  if (h & Pd) {
    var u = o[wd.FOURCC];
    if (u !== Dd) {
      var l = Bd[u], f = tn + Hr, c = new Uint8Array(i, f), d = new Tn(c, {
        format: l,
        width: s,
        height: n,
        levels: a
        // CompressedTextureResource will separate the levelBuffers for us!
      });
      return [d];
    }
    var p = tn + Hr, v = new Uint32Array(t.buffer, p, wa / Uint32Array.BYTES_PER_ELEMENT), _ = v[zr.DXGI_FORMAT], g = v[zr.RESOURCE_DIMENSION], I = v[zr.MISC_FLAG], E = v[zr.ARRAY_SIZE], B = Fd[_];
    if (B === void 0)
      throw new Error("DDSParser cannot parse texture data with DXGI format " + _);
    if (I === Ld)
      throw new Error("DDSParser does not support cubemap textures");
    if (g === En.DDS_DIMENSION_TEXTURE3D)
      throw new Error("DDSParser does not supported 3D texture data");
    var P = new Array(), A = tn + Hr + wa;
    if (E === 1)
      P.push(new Uint8Array(i, A));
    else {
      for (var R = gi[B], T = 0, C = s, O = n, U = 0; U < a; U++) {
        var K = Math.max(1, C + 3 & -4), nt = Math.max(1, O + 3 & -4), ft = K * nt * R;
        T += ft, C = C >>> 1, O = O >>> 1;
      }
      for (var W = A, U = 0; U < E; U++)
        P.push(new Uint8Array(i, W, T)), W += T;
    }
    return P.map(function(m) {
      return new Tn(m, {
        format: B,
        width: s,
        height: n,
        levels: a
      });
    });
  }
  throw h & Md ? new Error("DDSParser does not support uncompressed texture data.") : h & Cd ? new Error("DDSParser does not supported YUV uncompressed texture data.") : h & Ad ? new Error("DDSParser does not support single-channel (lumninance) texture data!") : h & Id ? new Error("DDSParser does not support single-channel (alpha) texture data!") : new Error("DDSParser failed to load a texture file due to an unknown reason!");
}
var me, he, or, Sa = [171, 75, 84, 88, 32, 49, 49, 187, 13, 10, 26, 10], Ud = 67305985, Ht = {
  FILE_IDENTIFIER: 0,
  ENDIANNESS: 12,
  GL_TYPE: 16,
  GL_TYPE_SIZE: 20,
  GL_FORMAT: 24,
  GL_INTERNAL_FORMAT: 28,
  GL_BASE_INTERNAL_FORMAT: 32,
  PIXEL_WIDTH: 36,
  PIXEL_HEIGHT: 40,
  PIXEL_DEPTH: 44,
  NUMBER_OF_ARRAY_ELEMENTS: 48,
  NUMBER_OF_FACES: 52,
  NUMBER_OF_MIPMAP_LEVELS: 56,
  BYTES_OF_KEY_VALUE_DATA: 60
}, wn = 64, Ia = (me = {}, me[J.UNSIGNED_BYTE] = 1, me[J.UNSIGNED_SHORT] = 2, me[J.INT] = 4, me[J.UNSIGNED_INT] = 4, me[J.FLOAT] = 4, me[J.HALF_FLOAT] = 8, me), Gd = (he = {}, he[F.RGBA] = 4, he[F.RGB] = 3, he[F.RG] = 2, he[F.RED] = 1, he[F.LUMINANCE] = 1, he[F.LUMINANCE_ALPHA] = 2, he[F.ALPHA] = 1, he), jd = (or = {}, or[J.UNSIGNED_SHORT_4_4_4_4] = 2, or[J.UNSIGNED_SHORT_5_5_5_1] = 2, or[J.UNSIGNED_SHORT_5_6_5] = 2, or);
function Hd(i, t, e) {
  e === void 0 && (e = !1);
  var r = new DataView(t);
  if (!Xd(i, r))
    return null;
  var n = r.getUint32(Ht.ENDIANNESS, !0) === Ud, s = r.getUint32(Ht.GL_TYPE, n), a = r.getUint32(Ht.GL_FORMAT, n), o = r.getUint32(Ht.GL_INTERNAL_FORMAT, n), h = r.getUint32(Ht.PIXEL_WIDTH, n), u = r.getUint32(Ht.PIXEL_HEIGHT, n) || 1, l = r.getUint32(Ht.PIXEL_DEPTH, n) || 1, f = r.getUint32(Ht.NUMBER_OF_ARRAY_ELEMENTS, n) || 1, c = r.getUint32(Ht.NUMBER_OF_FACES, n), d = r.getUint32(Ht.NUMBER_OF_MIPMAP_LEVELS, n), p = r.getUint32(Ht.BYTES_OF_KEY_VALUE_DATA, n);
  if (u === 0 || l !== 1)
    throw new Error("Only 2D textures are supported");
  if (c !== 1)
    throw new Error("CubeTextures are not supported by KTXLoader yet!");
  if (f !== 1)
    throw new Error("WebGL does not support array textures");
  var v = 4, _ = 4, g = h + 3 & -4, I = u + 3 & -4, E = new Array(f), B = h * u;
  s === 0 && (B = g * I);
  var P;
  if (s !== 0 ? Ia[s] ? P = Ia[s] * Gd[a] : P = jd[s] : P = gi[o], P === void 0)
    throw new Error("Unable to resolve the pixel format stored in the *.ktx file!");
  for (var A = e ? Yd(r, p, n) : null, R = B * P, T = R, C = h, O = u, U = g, K = I, nt = wn + p, ft = 0; ft < d; ft++) {
    for (var W = r.getUint32(nt, n), m = nt + 4, b = 0; b < f; b++) {
      var y = E[b];
      y || (y = E[b] = new Array(d)), y[ft] = {
        levelID: ft,
        // don't align mipWidth when texture not compressed! (glType not zero)
        levelWidth: d > 1 || s !== 0 ? C : U,
        levelHeight: d > 1 || s !== 0 ? O : K,
        levelBuffer: new Uint8Array(t, m, T)
      }, m += T;
    }
    nt += W + 4, nt = nt % 4 !== 0 ? nt + 4 - nt % 4 : nt, C = C >> 1 || 1, O = O >> 1 || 1, U = C + v - 1 & ~(v - 1), K = O + _ - 1 & ~(_ - 1), T = U * K * P;
  }
  return s !== 0 ? {
    uncompressed: E.map(function(S) {
      var M = S[0].levelBuffer, w = !1;
      return s === J.FLOAT ? M = new Float32Array(S[0].levelBuffer.buffer, S[0].levelBuffer.byteOffset, S[0].levelBuffer.byteLength / 4) : s === J.UNSIGNED_INT ? (w = !0, M = new Uint32Array(S[0].levelBuffer.buffer, S[0].levelBuffer.byteOffset, S[0].levelBuffer.byteLength / 4)) : s === J.INT && (w = !0, M = new Int32Array(S[0].levelBuffer.buffer, S[0].levelBuffer.byteOffset, S[0].levelBuffer.byteLength / 4)), {
        resource: new ke(M, {
          width: S[0].levelWidth,
          height: S[0].levelHeight
        }),
        type: s,
        format: w ? zd(a) : a
      };
    }),
    kvData: A
  } : {
    compressed: E.map(function(S) {
      return new Tn(null, {
        format: o,
        width: h,
        height: u,
        levels: d,
        levelBuffers: S
      });
    }),
    kvData: A
  };
}
function Xd(i, t) {
  for (var e = 0; e < Sa.length; e++)
    if (t.getUint8(e) !== Sa[e])
      return console.error(i + " is not a valid *.ktx file!"), !1;
  return !0;
}
function zd(i) {
  switch (i) {
    case F.RGBA:
      return F.RGBA_INTEGER;
    case F.RGB:
      return F.RGB_INTEGER;
    case F.RG:
      return F.RG_INTEGER;
    case F.RED:
      return F.RED_INTEGER;
    default:
      return i;
  }
}
function Yd(i, t, e) {
  for (var r = /* @__PURE__ */ new Map(), n = 0; n < t; ) {
    var s = i.getUint32(wn + n, e), a = wn + n + 4, o = 3 - (s + 3) % 4;
    if (s === 0 || s > t - n) {
      console.error("KTXLoader: keyAndValueByteSize out of bounds");
      break;
    }
    for (var h = 0; h < s && i.getUint8(a + h) !== 0; h++)
      ;
    if (h === -1) {
      console.error("KTXLoader: Failed to find null byte terminating kvData key");
      break;
    }
    var u = new TextDecoder().decode(new Uint8Array(i.buffer, a, h)), l = new DataView(i.buffer, a + h + 1, s - h - 1);
    r.set(u, l), n += 4 + s + o;
  }
  return r;
}
wt.setExtensionXhrType("dds", wt.XHR_RESPONSE_TYPE.BUFFER);
var Wd = (
  /** @class */
  function() {
    function i() {
    }
    return i.use = function(t, e) {
      if (t.extension === "dds" && t.data)
        try {
          Object.assign(t, Go(t.name || t.url, kd(t.data), t.metadata));
        } catch (r) {
          e(r);
          return;
        }
      e();
    }, i.extension = dt.Loader, i;
  }()
);
wt.setExtensionXhrType("ktx", wt.XHR_RESPONSE_TYPE.BUFFER);
var Vd = (
  /** @class */
  function() {
    function i() {
    }
    return i.use = function(t, e) {
      if (t.extension === "ktx" && t.data)
        try {
          var r = t.name || t.url, n = Hd(r, t.data, this.loadKeyValueData), s = n.compressed, a = n.uncompressed, o = n.kvData;
          if (s) {
            var h = Go(r, s, t.metadata);
            if (o && h.textures)
              for (var u in h.textures)
                h.textures[u].baseTexture.ktxKeyValueData = o;
            Object.assign(t, h);
          } else if (a) {
            var l = {};
            a.forEach(function(f, c) {
              var d = new et(new ot(f.resource, {
                mipmap: Zt.OFF,
                alphaMode: qt.NO_PREMULTIPLIED_ALPHA,
                type: f.type,
                format: f.format
              })), p = r + "-" + (c + 1);
              o && (d.baseTexture.ktxKeyValueData = o), ot.addToCache(d.baseTexture, p), et.addToCache(d, p), c === 0 && (l[r] = d, ot.addToCache(d.baseTexture, r), et.addToCache(d, r)), l[p] = d;
            }), Object.assign(t, { textures: l });
          }
        } catch (f) {
          e(f);
          return;
        }
      e();
    }, i.extension = dt.Loader, i.loadKeyValueData = !1, i;
  }()
);
/*!
 * @pixi/particle-container - v6.5.10
 * Compiled Thu, 06 Jul 2023 15:25:11 UTC
 *
 * @pixi/particle-container is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var Sn = function(i, t) {
  return Sn = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, r) {
    e.__proto__ = r;
  } || function(e, r) {
    for (var n in r)
      r.hasOwnProperty(n) && (e[n] = r[n]);
  }, Sn(i, t);
};
function jo(i, t) {
  Sn(i, t);
  function e() {
    this.constructor = i;
  }
  i.prototype = t === null ? Object.create(t) : (e.prototype = t.prototype, new e());
}
(function(i) {
  jo(t, i);
  function t(e, r, n, s) {
    e === void 0 && (e = 1500), n === void 0 && (n = 16384), s === void 0 && (s = !1);
    var a = i.call(this) || this, o = 16384;
    return n > o && (n = o), a._properties = [!1, !0, !1, !1, !1], a._maxSize = e, a._batchSize = n, a._buffers = null, a._bufferUpdateIDs = [], a._updateID = 0, a.interactiveChildren = !1, a.blendMode = q.NORMAL, a.autoResize = s, a.roundPixels = !0, a.baseTexture = null, a.setProperties(r), a._tint = 0, a.tintRgb = new Float32Array(4), a.tint = 16777215, a;
  }
  return t.prototype.setProperties = function(e) {
    e && (this._properties[0] = "vertices" in e || "scale" in e ? !!e.vertices || !!e.scale : this._properties[0], this._properties[1] = "position" in e ? !!e.position : this._properties[1], this._properties[2] = "rotation" in e ? !!e.rotation : this._properties[2], this._properties[3] = "uvs" in e ? !!e.uvs : this._properties[3], this._properties[4] = "tint" in e || "alpha" in e ? !!e.tint || !!e.alpha : this._properties[4]);
  }, t.prototype.updateTransform = function() {
    this.displayObjectUpdateTransform();
  }, Object.defineProperty(t.prototype, "tint", {
    /**
     * The tint applied to the container. This is a hex value.
     * A value of 0xFFFFFF will remove any tint effect.
     * IMPORTANT: This is a WebGL only feature and will be ignored by the canvas renderer.
     * @default 0xFFFFFF
     */
    get: function() {
      return this._tint;
    },
    set: function(e) {
      this._tint = e, $e(e, this.tintRgb);
    },
    enumerable: !1,
    configurable: !0
  }), t.prototype.render = function(e) {
    var r = this;
    !this.visible || this.worldAlpha <= 0 || !this.children.length || !this.renderable || (this.baseTexture || (this.baseTexture = this.children[0]._texture.baseTexture, this.baseTexture.valid || this.baseTexture.once("update", function() {
      return r.onChildrenChange(0);
    })), e.batch.setObjectRenderer(e.plugins.particle), e.plugins.particle.render(this));
  }, t.prototype.onChildrenChange = function(e) {
    for (var r = Math.floor(e / this._batchSize); this._bufferUpdateIDs.length < r; )
      this._bufferUpdateIDs.push(0);
    this._bufferUpdateIDs[r] = ++this._updateID;
  }, t.prototype.dispose = function() {
    if (this._buffers) {
      for (var e = 0; e < this._buffers.length; ++e)
        this._buffers[e].destroy();
      this._buffers = null;
    }
  }, t.prototype.destroy = function(e) {
    i.prototype.destroy.call(this, e), this.dispose(), this._properties = null, this._buffers = null, this._bufferUpdateIDs = null;
  }, t;
})(re);
var Pa = (
  /** @class */
  function() {
    function i(t, e, r) {
      this.geometry = new Je(), this.indexBuffer = null, this.size = r, this.dynamicProperties = [], this.staticProperties = [];
      for (var n = 0; n < t.length; ++n) {
        var s = t[n];
        s = {
          attributeName: s.attributeName,
          size: s.size,
          uploadFunction: s.uploadFunction,
          type: s.type || J.FLOAT,
          offset: s.offset
        }, e[n] ? this.dynamicProperties.push(s) : this.staticProperties.push(s);
      }
      this.staticStride = 0, this.staticBuffer = null, this.staticData = null, this.staticDataUint32 = null, this.dynamicStride = 0, this.dynamicBuffer = null, this.dynamicData = null, this.dynamicDataUint32 = null, this._updateID = 0, this.initBuffers();
    }
    return i.prototype.initBuffers = function() {
      var t = this.geometry, e = 0;
      this.indexBuffer = new Mt(Bf(this.size), !0, !0), t.addIndex(this.indexBuffer), this.dynamicStride = 0;
      for (var r = 0; r < this.dynamicProperties.length; ++r) {
        var n = this.dynamicProperties[r];
        n.offset = e, e += n.size, this.dynamicStride += n.size;
      }
      var s = new ArrayBuffer(this.size * this.dynamicStride * 4 * 4);
      this.dynamicData = new Float32Array(s), this.dynamicDataUint32 = new Uint32Array(s), this.dynamicBuffer = new Mt(this.dynamicData, !1, !1);
      var a = 0;
      this.staticStride = 0;
      for (var r = 0; r < this.staticProperties.length; ++r) {
        var n = this.staticProperties[r];
        n.offset = a, a += n.size, this.staticStride += n.size;
      }
      var o = new ArrayBuffer(this.size * this.staticStride * 4 * 4);
      this.staticData = new Float32Array(o), this.staticDataUint32 = new Uint32Array(o), this.staticBuffer = new Mt(this.staticData, !0, !1);
      for (var r = 0; r < this.dynamicProperties.length; ++r) {
        var n = this.dynamicProperties[r];
        t.addAttribute(n.attributeName, this.dynamicBuffer, 0, n.type === J.UNSIGNED_BYTE, n.type, this.dynamicStride * 4, n.offset * 4);
      }
      for (var r = 0; r < this.staticProperties.length; ++r) {
        var n = this.staticProperties[r];
        t.addAttribute(n.attributeName, this.staticBuffer, 0, n.type === J.UNSIGNED_BYTE, n.type, this.staticStride * 4, n.offset * 4);
      }
    }, i.prototype.uploadDynamic = function(t, e, r) {
      for (var n = 0; n < this.dynamicProperties.length; n++) {
        var s = this.dynamicProperties[n];
        s.uploadFunction(t, e, r, s.type === J.UNSIGNED_BYTE ? this.dynamicDataUint32 : this.dynamicData, this.dynamicStride, s.offset);
      }
      this.dynamicBuffer._updateID++;
    }, i.prototype.uploadStatic = function(t, e, r) {
      for (var n = 0; n < this.staticProperties.length; n++) {
        var s = this.staticProperties[n];
        s.uploadFunction(t, e, r, s.type === J.UNSIGNED_BYTE ? this.staticDataUint32 : this.staticData, this.staticStride, s.offset);
      }
      this.staticBuffer._updateID++;
    }, i.prototype.destroy = function() {
      this.indexBuffer = null, this.dynamicProperties = null, this.dynamicBuffer = null, this.dynamicData = null, this.dynamicDataUint32 = null, this.staticProperties = null, this.staticBuffer = null, this.staticData = null, this.staticDataUint32 = null, this.geometry.destroy();
    }, i;
  }()
), $d = `varying vec2 vTextureCoord;
varying vec4 vColor;

uniform sampler2D uSampler;

void main(void){
    vec4 color = texture2D(uSampler, vTextureCoord) * vColor;
    gl_FragColor = color;
}`, Zd = `attribute vec2 aVertexPosition;
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
`, qd = (
  /** @class */
  function(i) {
    jo(t, i);
    function t(e) {
      var r = i.call(this, e) || this;
      return r.shader = null, r.properties = null, r.tempMatrix = new At(), r.properties = [
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
          type: J.UNSIGNED_BYTE,
          uploadFunction: r.uploadTint,
          offset: 0
        }
      ], r.shader = ce.from(Zd, $d, {}), r.state = we.for2d(), r;
    }
    return t.prototype.render = function(e) {
      var r = e.children, n = e._maxSize, s = e._batchSize, a = this.renderer, o = r.length;
      if (o !== 0) {
        o > n && !e.autoResize && (o = n);
        var h = e._buffers;
        h || (h = e._buffers = this.generateBuffers(e));
        var u = r[0]._texture.baseTexture, l = u.alphaMode > 0;
        this.state.blendMode = ro(e.blendMode, l), a.state.set(this.state);
        var f = a.gl, c = e.worldTransform.copyTo(this.tempMatrix);
        c.prepend(a.globalUniforms.uniforms.projectionMatrix), this.shader.uniforms.translationMatrix = c.toArray(!0), this.shader.uniforms.uColor = Lf(e.tintRgb, e.worldAlpha, this.shader.uniforms.uColor, l), this.shader.uniforms.uSampler = u, this.renderer.shader.bind(this.shader);
        for (var d = !1, p = 0, v = 0; p < o; p += s, v += 1) {
          var _ = o - p;
          _ > s && (_ = s), v >= h.length && h.push(this._generateOneMoreBuffer(e));
          var g = h[v];
          g.uploadDynamic(r, p, _);
          var I = e._bufferUpdateIDs[v] || 0;
          d = d || g._updateID < I, d && (g._updateID = e._updateID, g.uploadStatic(r, p, _)), a.geometry.bind(g.geometry), f.drawElements(f.TRIANGLES, _ * 6, f.UNSIGNED_SHORT, 0);
        }
      }
    }, t.prototype.generateBuffers = function(e) {
      for (var r = [], n = e._maxSize, s = e._batchSize, a = e._properties, o = 0; o < n; o += s)
        r.push(new Pa(this.properties, a, s));
      return r;
    }, t.prototype._generateOneMoreBuffer = function(e) {
      var r = e._batchSize, n = e._properties;
      return new Pa(this.properties, n, r);
    }, t.prototype.uploadVertices = function(e, r, n, s, a, o) {
      for (var h = 0, u = 0, l = 0, f = 0, c = 0; c < n; ++c) {
        var d = e[r + c], p = d._texture, v = d.scale.x, _ = d.scale.y, g = p.trim, I = p.orig;
        g ? (u = g.x - d.anchor.x * I.width, h = u + g.width, f = g.y - d.anchor.y * I.height, l = f + g.height) : (h = I.width * (1 - d.anchor.x), u = I.width * -d.anchor.x, l = I.height * (1 - d.anchor.y), f = I.height * -d.anchor.y), s[o] = u * v, s[o + 1] = f * _, s[o + a] = h * v, s[o + a + 1] = f * _, s[o + a * 2] = h * v, s[o + a * 2 + 1] = l * _, s[o + a * 3] = u * v, s[o + a * 3 + 1] = l * _, o += a * 4;
      }
    }, t.prototype.uploadPosition = function(e, r, n, s, a, o) {
      for (var h = 0; h < n; h++) {
        var u = e[r + h].position;
        s[o] = u.x, s[o + 1] = u.y, s[o + a] = u.x, s[o + a + 1] = u.y, s[o + a * 2] = u.x, s[o + a * 2 + 1] = u.y, s[o + a * 3] = u.x, s[o + a * 3 + 1] = u.y, o += a * 4;
      }
    }, t.prototype.uploadRotation = function(e, r, n, s, a, o) {
      for (var h = 0; h < n; h++) {
        var u = e[r + h].rotation;
        s[o] = u, s[o + a] = u, s[o + a * 2] = u, s[o + a * 3] = u, o += a * 4;
      }
    }, t.prototype.uploadUvs = function(e, r, n, s, a, o) {
      for (var h = 0; h < n; ++h) {
        var u = e[r + h]._texture._uvs;
        u ? (s[o] = u.x0, s[o + 1] = u.y0, s[o + a] = u.x1, s[o + a + 1] = u.y1, s[o + a * 2] = u.x2, s[o + a * 2 + 1] = u.y2, s[o + a * 3] = u.x3, s[o + a * 3 + 1] = u.y3, o += a * 4) : (s[o] = 0, s[o + 1] = 0, s[o + a] = 0, s[o + a + 1] = 0, s[o + a * 2] = 0, s[o + a * 2 + 1] = 0, s[o + a * 3] = 0, s[o + a * 3 + 1] = 0, o += a * 4);
      }
    }, t.prototype.uploadTint = function(e, r, n, s, a, o) {
      for (var h = 0; h < n; ++h) {
        var u = e[r + h], l = u._texture.baseTexture.alphaMode > 0, f = u.alpha, c = f < 1 && l ? qn(u._tintRGB, f) : u._tintRGB + (f * 255 << 24);
        s[o] = c, s[o + a] = c, s[o + a * 2] = c, s[o + a * 3] = c, o += a * 4;
      }
    }, t.prototype.destroy = function() {
      i.prototype.destroy.call(this), this.shader && (this.shader.destroy(), this.shader = null), this.tempMatrix = null;
    }, t.extension = {
      name: "particle",
      type: dt.RendererPlugin
    }, t;
  }(Er)
);
/*!
 * @pixi/graphics - v6.5.10
 * Compiled Thu, 06 Jul 2023 15:25:11 UTC
 *
 * @pixi/graphics is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
var fe;
(function(i) {
  i.MITER = "miter", i.BEVEL = "bevel", i.ROUND = "round";
})(fe || (fe = {}));
var ye;
(function(i) {
  i.BUTT = "butt", i.ROUND = "round", i.SQUARE = "square";
})(ye || (ye = {}));
var gr = {
  adaptive: !0,
  maxLength: 10,
  minSegments: 8,
  maxSegments: 2048,
  epsilon: 1e-4,
  _segmentsCount: function(i, t) {
    if (t === void 0 && (t = 20), !this.adaptive || !i || isNaN(i))
      return t;
    var e = Math.ceil(i / this.maxLength);
    return e < this.minSegments ? e = this.minSegments : e > this.maxSegments && (e = this.maxSegments), e;
  }
}, Ho = (
  /** @class */
  function() {
    function i() {
      this.color = 16777215, this.alpha = 1, this.texture = et.WHITE, this.matrix = null, this.visible = !1, this.reset();
    }
    return i.prototype.clone = function() {
      var t = new i();
      return t.color = this.color, t.alpha = this.alpha, t.texture = this.texture, t.matrix = this.matrix, t.visible = this.visible, t;
    }, i.prototype.reset = function() {
      this.color = 16777215, this.alpha = 1, this.texture = et.WHITE, this.matrix = null, this.visible = !1;
    }, i.prototype.destroy = function() {
      this.texture = null, this.matrix = null;
    }, i;
  }()
);
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var In = function(i, t) {
  return In = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, r) {
    e.__proto__ = r;
  } || function(e, r) {
    for (var n in r)
      r.hasOwnProperty(n) && (e[n] = r[n]);
  }, In(i, t);
};
function Is(i, t) {
  In(i, t);
  function e() {
    this.constructor = i;
  }
  i.prototype = t === null ? Object.create(t) : (e.prototype = t.prototype, new e());
}
function Ma(i, t) {
  var e, r;
  t === void 0 && (t = !1);
  var n = i.length;
  if (!(n < 6)) {
    for (var s = 0, a = 0, o = i[n - 2], h = i[n - 1]; a < n; a += 2) {
      var u = i[a], l = i[a + 1];
      s += (u - o) * (l + h), o = u, h = l;
    }
    if (!t && s > 0 || t && s <= 0)
      for (var f = n / 2, a = f + f % 2; a < n; a += 2) {
        var c = n - a - 2, d = n - a - 1, p = a, v = a + 1;
        e = [i[p], i[c]], i[c] = e[0], i[p] = e[1], r = [i[v], i[d]], i[d] = r[0], i[v] = r[1];
      }
  }
}
var Xo = {
  build: function(i) {
    i.points = i.shape.points.slice();
  },
  triangulate: function(i, t) {
    var e = i.points, r = i.holes, n = t.points, s = t.indices;
    if (e.length >= 6) {
      Ma(e, !1);
      for (var a = [], o = 0; o < r.length; o++) {
        var h = r[o];
        Ma(h.points, !0), a.push(e.length / 2), e = e.concat(h.points);
      }
      var u = Ka(e, a, 2);
      if (!u)
        return;
      for (var l = n.length / 2, o = 0; o < u.length; o += 3)
        s.push(u[o] + l), s.push(u[o + 1] + l), s.push(u[o + 2] + l);
      for (var o = 0; o < e.length; o++)
        n.push(e[o]);
    }
  }
}, yi = {
  build: function(i) {
    var t = i.points, e, r, n, s, a, o;
    if (i.type === Rt.CIRC) {
      var h = i.shape;
      e = h.x, r = h.y, a = o = h.radius, n = s = 0;
    } else if (i.type === Rt.ELIP) {
      var u = i.shape;
      e = u.x, r = u.y, a = u.width, o = u.height, n = s = 0;
    } else {
      var l = i.shape, f = l.width / 2, c = l.height / 2;
      e = l.x + f, r = l.y + c, a = o = Math.max(0, Math.min(l.radius, Math.min(f, c))), n = f - a, s = c - o;
    }
    if (!(a >= 0 && o >= 0 && n >= 0 && s >= 0)) {
      t.length = 0;
      return;
    }
    var d = Math.ceil(2.3 * Math.sqrt(a + o)), p = d * 8 + (n ? 4 : 0) + (s ? 4 : 0);
    if (t.length = p, p !== 0) {
      if (d === 0) {
        t.length = 8, t[0] = t[6] = e + n, t[1] = t[3] = r + s, t[2] = t[4] = e - n, t[5] = t[7] = r - s;
        return;
      }
      var v = 0, _ = d * 4 + (n ? 2 : 0) + 2, g = _, I = p;
      {
        var E = n + a, B = s, P = e + E, A = e - E, R = r + B;
        if (t[v++] = P, t[v++] = R, t[--_] = R, t[--_] = A, s) {
          var T = r - B;
          t[g++] = A, t[g++] = T, t[--I] = T, t[--I] = P;
        }
      }
      for (var C = 1; C < d; C++) {
        var O = Math.PI / 2 * (C / d), E = n + Math.cos(O) * a, B = s + Math.sin(O) * o, P = e + E, A = e - E, R = r + B, T = r - B;
        t[v++] = P, t[v++] = R, t[--_] = R, t[--_] = A, t[g++] = A, t[g++] = T, t[--I] = T, t[--I] = P;
      }
      {
        var E = n, B = s + o, P = e + E, A = e - E, R = r + B, T = r - B;
        t[v++] = P, t[v++] = R, t[--I] = T, t[--I] = P, n && (t[v++] = A, t[v++] = R, t[--I] = T, t[--I] = A);
      }
    }
  },
  triangulate: function(i, t) {
    var e = i.points, r = t.points, n = t.indices;
    if (e.length !== 0) {
      var s = r.length / 2, a = s, o, h;
      if (i.type !== Rt.RREC) {
        var u = i.shape;
        o = u.x, h = u.y;
      } else {
        var l = i.shape;
        o = l.x + l.width / 2, h = l.y + l.height / 2;
      }
      var f = i.matrix;
      r.push(i.matrix ? f.a * o + f.c * h + f.tx : o, i.matrix ? f.b * o + f.d * h + f.ty : h), s++, r.push(e[0], e[1]);
      for (var c = 2; c < e.length; c += 2)
        r.push(e[c], e[c + 1]), n.push(s++, a, s);
      n.push(a + 1, a, s);
    }
  }
}, Jd = {
  build: function(i) {
    var t = i.shape, e = t.x, r = t.y, n = t.width, s = t.height, a = i.points;
    a.length = 0, a.push(e, r, e + n, r, e + n, r + s, e, r + s);
  },
  triangulate: function(i, t) {
    var e = i.points, r = t.points, n = r.length / 2;
    r.push(e[0], e[1], e[2], e[3], e[6], e[7], e[4], e[5]), t.indices.push(n, n + 1, n + 2, n + 1, n + 2, n + 3);
  }
};
function je(i, t, e) {
  var r = t - i;
  return i + r * e;
}
function Yr(i, t, e, r, n, s, a) {
  a === void 0 && (a = []);
  for (var o = 20, h = a, u = 0, l = 0, f = 0, c = 0, d = 0, p = 0, v = 0, _ = 0; v <= o; ++v)
    _ = v / o, u = je(i, e, _), l = je(t, r, _), f = je(e, n, _), c = je(r, s, _), d = je(u, f, _), p = je(l, c, _), !(v === 0 && h[h.length - 2] === d && h[h.length - 1] === p) && h.push(d, p);
  return h;
}
var Kd = {
  build: function(i) {
    if (bi.nextRoundedRectBehavior) {
      yi.build(i);
      return;
    }
    var t = i.shape, e = i.points, r = t.x, n = t.y, s = t.width, a = t.height, o = Math.max(0, Math.min(t.radius, Math.min(s, a) / 2));
    e.length = 0, o ? (Yr(r, n + o, r, n, r + o, n, e), Yr(r + s - o, n, r + s, n, r + s, n + o, e), Yr(r + s, n + a - o, r + s, n + a, r + s - o, n + a, e), Yr(r + o, n + a, r, n + a, r, n + a - o, e)) : e.push(r, n, r + s, n, r + s, n + a, r, n + a);
  },
  triangulate: function(i, t) {
    if (bi.nextRoundedRectBehavior) {
      yi.triangulate(i, t);
      return;
    }
    for (var e = i.points, r = t.points, n = t.indices, s = r.length / 2, a = Ka(e, null, 2), o = 0, h = a.length; o < h; o += 3)
      n.push(a[o] + s), n.push(a[o + 1] + s), n.push(a[o + 2] + s);
    for (var o = 0, h = e.length; o < h; o++)
      r.push(e[o], e[++o]);
  }
};
function Ca(i, t, e, r, n, s, a, o) {
  var h = i - e * n, u = t - r * n, l = i + e * s, f = t + r * s, c, d;
  a ? (c = r, d = -e) : (c = -r, d = e);
  var p = h + c, v = u + d, _ = l + c, g = f + d;
  return o.push(p, v), o.push(_, g), 2;
}
function Pe(i, t, e, r, n, s, a, o) {
  var h = e - i, u = r - t, l = Math.atan2(h, u), f = Math.atan2(n - i, s - t);
  o && l < f ? l += Math.PI * 2 : !o && l > f && (f += Math.PI * 2);
  var c = l, d = f - l, p = Math.abs(d), v = Math.sqrt(h * h + u * u), _ = (15 * p * Math.sqrt(v) / Math.PI >> 0) + 1, g = d / _;
  if (c += g, o) {
    a.push(i, t), a.push(e, r);
    for (var I = 1, E = c; I < _; I++, E += g)
      a.push(i, t), a.push(i + Math.sin(E) * v, t + Math.cos(E) * v);
    a.push(i, t), a.push(n, s);
  } else {
    a.push(e, r), a.push(i, t);
    for (var I = 1, E = c; I < _; I++, E += g)
      a.push(i + Math.sin(E) * v, t + Math.cos(E) * v), a.push(i, t);
    a.push(n, s), a.push(i, t);
  }
  return _ * 2;
}
function Qd(i, t) {
  var e = i.shape, r = i.points || e.points.slice(), n = t.closePointEps;
  if (r.length !== 0) {
    var s = i.lineStyle, a = new gt(r[0], r[1]), o = new gt(r[r.length - 2], r[r.length - 1]), h = e.type !== Rt.POLY || e.closeStroke, u = Math.abs(a.x - o.x) < n && Math.abs(a.y - o.y) < n;
    if (h) {
      r = r.slice(), u && (r.pop(), r.pop(), o.set(r[r.length - 2], r[r.length - 1]));
      var l = (a.x + o.x) * 0.5, f = (o.y + a.y) * 0.5;
      r.unshift(l, f), r.push(l, f);
    }
    var c = t.points, d = r.length / 2, p = r.length, v = c.length / 2, _ = s.width / 2, g = _ * _, I = s.miterLimit * s.miterLimit, E = r[0], B = r[1], P = r[2], A = r[3], R = 0, T = 0, C = -(B - A), O = E - P, U = 0, K = 0, nt = Math.sqrt(C * C + O * O);
    C /= nt, O /= nt, C *= _, O *= _;
    var ft = s.alignment, W = (1 - ft) * 2, m = ft * 2;
    h || (s.cap === ye.ROUND ? p += Pe(E - C * (W - m) * 0.5, B - O * (W - m) * 0.5, E - C * W, B - O * W, E + C * m, B + O * m, c, !0) + 2 : s.cap === ye.SQUARE && (p += Ca(E, B, C, O, W, m, !0, c))), c.push(E - C * W, B - O * W), c.push(E + C * m, B + O * m);
    for (var b = 1; b < d - 1; ++b) {
      E = r[(b - 1) * 2], B = r[(b - 1) * 2 + 1], P = r[b * 2], A = r[b * 2 + 1], R = r[(b + 1) * 2], T = r[(b + 1) * 2 + 1], C = -(B - A), O = E - P, nt = Math.sqrt(C * C + O * O), C /= nt, O /= nt, C *= _, O *= _, U = -(A - T), K = P - R, nt = Math.sqrt(U * U + K * K), U /= nt, K /= nt, U *= _, K *= _;
      var y = P - E, S = B - A, M = P - R, w = T - A, L = y * M + S * w, k = S * M - w * y, Y = k < 0;
      if (Math.abs(k) < 1e-3 * Math.abs(L)) {
        c.push(P - C * W, A - O * W), c.push(P + C * m, A + O * m), L >= 0 && (s.join === fe.ROUND ? p += Pe(P, A, P - C * W, A - O * W, P - U * W, A - K * W, c, !1) + 4 : p += 2, c.push(P - U * m, A - K * m), c.push(P + U * W, A + K * W));
        continue;
      }
      var $ = (-C + E) * (-O + A) - (-C + P) * (-O + B), x = (-U + R) * (-K + A) - (-U + P) * (-K + T), it = (y * x - M * $) / k, X = (w * $ - S * x) / k, pt = (it - P) * (it - P) + (X - A) * (X - A), Q = P + (it - P) * W, H = A + (X - A) * W, Et = P - (it - P) * m, tt = A - (X - A) * m, N = Math.min(y * y + S * S, M * M + w * w), G = Y ? W : m, V = N + G * G * g, D = pt <= V;
      D ? s.join === fe.BEVEL || pt / g > I ? (Y ? (c.push(Q, H), c.push(P + C * m, A + O * m), c.push(Q, H), c.push(P + U * m, A + K * m)) : (c.push(P - C * W, A - O * W), c.push(Et, tt), c.push(P - U * W, A - K * W), c.push(Et, tt)), p += 2) : s.join === fe.ROUND ? Y ? (c.push(Q, H), c.push(P + C * m, A + O * m), p += Pe(P, A, P + C * m, A + O * m, P + U * m, A + K * m, c, !0) + 4, c.push(Q, H), c.push(P + U * m, A + K * m)) : (c.push(P - C * W, A - O * W), c.push(Et, tt), p += Pe(P, A, P - C * W, A - O * W, P - U * W, A - K * W, c, !1) + 4, c.push(P - U * W, A - K * W), c.push(Et, tt)) : (c.push(Q, H), c.push(Et, tt)) : (c.push(P - C * W, A - O * W), c.push(P + C * m, A + O * m), s.join === fe.ROUND ? Y ? p += Pe(P, A, P + C * m, A + O * m, P + U * m, A + K * m, c, !0) + 2 : p += Pe(P, A, P - C * W, A - O * W, P - U * W, A - K * W, c, !1) + 2 : s.join === fe.MITER && pt / g <= I && (Y ? (c.push(Et, tt), c.push(Et, tt)) : (c.push(Q, H), c.push(Q, H)), p += 2), c.push(P - U * W, A - K * W), c.push(P + U * m, A + K * m), p += 2);
    }
    E = r[(d - 2) * 2], B = r[(d - 2) * 2 + 1], P = r[(d - 1) * 2], A = r[(d - 1) * 2 + 1], C = -(B - A), O = E - P, nt = Math.sqrt(C * C + O * O), C /= nt, O /= nt, C *= _, O *= _, c.push(P - C * W, A - O * W), c.push(P + C * m, A + O * m), h || (s.cap === ye.ROUND ? p += Pe(P - C * (W - m) * 0.5, A - O * (W - m) * 0.5, P - C * W, A - O * W, P + C * m, A + O * m, c, !1) + 2 : s.cap === ye.SQUARE && (p += Ca(P, A, C, O, W, m, !1, c)));
    for (var kt = t.indices, _e = gr.epsilon * gr.epsilon, b = v; b < p + v - 2; ++b)
      E = c[b * 2], B = c[b * 2 + 1], P = c[(b + 1) * 2], A = c[(b + 1) * 2 + 1], R = c[(b + 2) * 2], T = c[(b + 2) * 2 + 1], !(Math.abs(E * (A - T) + P * (T - B) + R * (B - A)) < _e) && kt.push(b, b + 1, b + 2);
  }
}
function tp(i, t) {
  var e = 0, r = i.shape, n = i.points || r.points, s = r.type !== Rt.POLY || r.closeStroke;
  if (n.length !== 0) {
    var a = t.points, o = t.indices, h = n.length / 2, u = a.length / 2, l = u;
    for (a.push(n[0], n[1]), e = 1; e < h; e++)
      a.push(n[e * 2], n[e * 2 + 1]), o.push(l, l + 1), l++;
    s && o.push(l, u);
  }
}
function Aa(i, t) {
  i.lineStyle.native ? tp(i, t) : Qd(i, t);
}
var Ra = (
  /** @class */
  function() {
    function i() {
    }
    return i.curveTo = function(t, e, r, n, s, a) {
      var o = a[a.length - 2], h = a[a.length - 1], u = h - e, l = o - t, f = n - e, c = r - t, d = Math.abs(u * c - l * f);
      if (d < 1e-8 || s === 0)
        return (a[a.length - 2] !== t || a[a.length - 1] !== e) && a.push(t, e), null;
      var p = u * u + l * l, v = f * f + c * c, _ = u * f + l * c, g = s * Math.sqrt(p) / d, I = s * Math.sqrt(v) / d, E = g * _ / p, B = I * _ / v, P = g * c + I * l, A = g * f + I * u, R = l * (I + E), T = u * (I + E), C = c * (g + B), O = f * (g + B), U = Math.atan2(T - A, R - P), K = Math.atan2(O - A, C - P);
      return {
        cx: P + t,
        cy: A + e,
        radius: s,
        startAngle: U,
        endAngle: K,
        anticlockwise: l * f > c * u
      };
    }, i.arc = function(t, e, r, n, s, a, o, h, u) {
      for (var l = o - a, f = gr._segmentsCount(Math.abs(l) * s, Math.ceil(Math.abs(l) / fi) * 40), c = l / (f * 2), d = c * 2, p = Math.cos(c), v = Math.sin(c), _ = f - 1, g = _ % 1 / _, I = 0; I <= _; ++I) {
        var E = I + g * I, B = c + a + d * E, P = Math.cos(B), A = -Math.sin(B);
        u.push((p * P + v * A) * s + r, (p * -A + v * P) * s + n);
      }
    }, i;
  }()
), ep = (
  /** @class */
  function() {
    function i() {
    }
    return i.curveLength = function(t, e, r, n, s, a, o, h) {
      for (var u = 10, l = 0, f = 0, c = 0, d = 0, p = 0, v = 0, _ = 0, g = 0, I = 0, E = 0, B = 0, P = t, A = e, R = 1; R <= u; ++R)
        f = R / u, c = f * f, d = c * f, p = 1 - f, v = p * p, _ = v * p, g = _ * t + 3 * v * f * r + 3 * p * c * s + d * o, I = _ * e + 3 * v * f * n + 3 * p * c * a + d * h, E = P - g, B = A - I, P = g, A = I, l += Math.sqrt(E * E + B * B);
      return l;
    }, i.curveTo = function(t, e, r, n, s, a, o) {
      var h = o[o.length - 2], u = o[o.length - 1];
      o.length -= 2;
      var l = gr._segmentsCount(i.curveLength(h, u, t, e, r, n, s, a)), f = 0, c = 0, d = 0, p = 0, v = 0;
      o.push(h, u);
      for (var _ = 1, g = 0; _ <= l; ++_)
        g = _ / l, f = 1 - g, c = f * f, d = c * f, p = g * g, v = p * g, o.push(d * h + 3 * c * g * t + 3 * f * p * r + v * s, d * u + 3 * c * g * e + 3 * f * p * n + v * a);
    }, i;
  }()
), rp = (
  /** @class */
  function() {
    function i() {
    }
    return i.curveLength = function(t, e, r, n, s, a) {
      var o = t - 2 * r + s, h = e - 2 * n + a, u = 2 * r - 2 * t, l = 2 * n - 2 * e, f = 4 * (o * o + h * h), c = 4 * (o * u + h * l), d = u * u + l * l, p = 2 * Math.sqrt(f + c + d), v = Math.sqrt(f), _ = 2 * f * v, g = 2 * Math.sqrt(d), I = c / v;
      return (_ * p + v * c * (p - g) + (4 * d * f - c * c) * Math.log((2 * v + I + p) / (I + g))) / (4 * _);
    }, i.curveTo = function(t, e, r, n, s) {
      for (var a = s[s.length - 2], o = s[s.length - 1], h = gr._segmentsCount(i.curveLength(a, o, t, e, r, n)), u = 0, l = 0, f = 1; f <= h; ++f) {
        var c = f / h;
        u = a + (t - a) * c, l = o + (e - o) * c, s.push(u + (t + (r - t) * c - u) * c, l + (e + (n - e) * c - l) * c);
      }
    }, i;
  }()
), ip = (
  /** @class */
  function() {
    function i() {
      this.reset();
    }
    return i.prototype.begin = function(t, e, r) {
      this.reset(), this.style = t, this.start = e, this.attribStart = r;
    }, i.prototype.end = function(t, e) {
      this.attribSize = e - this.attribStart, this.size = t - this.start;
    }, i.prototype.reset = function() {
      this.style = null, this.size = 0, this.start = 0, this.attribStart = 0, this.attribSize = 0;
    }, i;
  }()
), Me, en = (Me = {}, Me[Rt.POLY] = Xo, Me[Rt.CIRC] = yi, Me[Rt.ELIP] = yi, Me[Rt.RECT] = Jd, Me[Rt.RREC] = Kd, Me), Oa = [], Wr = [], Na = (
  /** @class */
  function() {
    function i(t, e, r, n) {
      e === void 0 && (e = null), r === void 0 && (r = null), n === void 0 && (n = null), this.points = [], this.holes = [], this.shape = t, this.lineStyle = r, this.fillStyle = e, this.matrix = n, this.type = t.type;
    }
    return i.prototype.clone = function() {
      return new i(this.shape, this.fillStyle, this.lineStyle, this.matrix);
    }, i.prototype.destroy = function() {
      this.shape = null, this.holes.length = 0, this.holes = null, this.points.length = 0, this.points = null, this.lineStyle = null, this.fillStyle = null;
    }, i;
  }()
), He = new gt(), np = (
  /** @class */
  function(i) {
    Is(t, i);
    function t() {
      var e = i.call(this) || this;
      return e.closePointEps = 1e-4, e.boundsPadding = 0, e.uvsFloat32 = null, e.indicesUint16 = null, e.batchable = !1, e.points = [], e.colors = [], e.uvs = [], e.indices = [], e.textureIds = [], e.graphicsData = [], e.drawCalls = [], e.batchDirty = -1, e.batches = [], e.dirty = 0, e.cacheDirty = -1, e.clearDirty = 0, e.shapeIndex = 0, e._bounds = new ci(), e.boundsDirty = -1, e;
    }
    return Object.defineProperty(t.prototype, "bounds", {
      /**
       * Get the current bounds of the graphic geometry.
       * @readonly
       */
      get: function() {
        return this.updateBatches(), this.boundsDirty !== this.dirty && (this.boundsDirty = this.dirty, this.calculateBounds()), this._bounds;
      },
      enumerable: !1,
      configurable: !0
    }), t.prototype.invalidate = function() {
      this.boundsDirty = -1, this.dirty++, this.batchDirty++, this.shapeIndex = 0, this.points.length = 0, this.colors.length = 0, this.uvs.length = 0, this.indices.length = 0, this.textureIds.length = 0;
      for (var e = 0; e < this.drawCalls.length; e++)
        this.drawCalls[e].texArray.clear(), Wr.push(this.drawCalls[e]);
      this.drawCalls.length = 0;
      for (var e = 0; e < this.batches.length; e++) {
        var r = this.batches[e];
        r.reset(), Oa.push(r);
      }
      this.batches.length = 0;
    }, t.prototype.clear = function() {
      return this.graphicsData.length > 0 && (this.invalidate(), this.clearDirty++, this.graphicsData.length = 0), this;
    }, t.prototype.drawShape = function(e, r, n, s) {
      r === void 0 && (r = null), n === void 0 && (n = null), s === void 0 && (s = null);
      var a = new Na(e, r, n, s);
      return this.graphicsData.push(a), this.dirty++, this;
    }, t.prototype.drawHole = function(e, r) {
      if (r === void 0 && (r = null), !this.graphicsData.length)
        return null;
      var n = new Na(e, null, null, r), s = this.graphicsData[this.graphicsData.length - 1];
      return n.lineStyle = s.lineStyle, s.holes.push(n), this.dirty++, this;
    }, t.prototype.destroy = function() {
      i.prototype.destroy.call(this);
      for (var e = 0; e < this.graphicsData.length; ++e)
        this.graphicsData[e].destroy();
      this.points.length = 0, this.points = null, this.colors.length = 0, this.colors = null, this.uvs.length = 0, this.uvs = null, this.indices.length = 0, this.indices = null, this.indexBuffer.destroy(), this.indexBuffer = null, this.graphicsData.length = 0, this.graphicsData = null, this.drawCalls.length = 0, this.drawCalls = null, this.batches.length = 0, this.batches = null, this._bounds = null;
    }, t.prototype.containsPoint = function(e) {
      for (var r = this.graphicsData, n = 0; n < r.length; ++n) {
        var s = r[n];
        if (s.fillStyle.visible && s.shape && (s.matrix ? s.matrix.applyInverse(e, He) : He.copyFrom(e), s.shape.contains(He.x, He.y))) {
          var a = !1;
          if (s.holes)
            for (var o = 0; o < s.holes.length; o++) {
              var h = s.holes[o];
              if (h.shape.contains(He.x, He.y)) {
                a = !0;
                break;
              }
            }
          if (!a)
            return !0;
        }
      }
      return !1;
    }, t.prototype.updateBatches = function() {
      if (!this.graphicsData.length) {
        this.batchable = !0;
        return;
      }
      if (this.validateBatching()) {
        this.cacheDirty = this.dirty;
        var e = this.uvs, r = this.graphicsData, n = null, s = null;
        this.batches.length > 0 && (n = this.batches[this.batches.length - 1], s = n.style);
        for (var a = this.shapeIndex; a < r.length; a++) {
          this.shapeIndex++;
          var o = r[a], h = o.fillStyle, u = o.lineStyle, l = en[o.type];
          l.build(o), o.matrix && this.transformPoints(o.points, o.matrix), (h.visible || u.visible) && this.processHoles(o.holes);
          for (var f = 0; f < 2; f++) {
            var c = f === 0 ? h : u;
            if (c.visible) {
              var d = c.texture.baseTexture, p = this.indices.length, v = this.points.length / 2;
              d.wrapMode = Qt.REPEAT, f === 0 ? this.processFill(o) : this.processLine(o);
              var _ = this.points.length / 2 - v;
              _ !== 0 && (n && !this._compareStyles(s, c) && (n.end(p, v), n = null), n || (n = Oa.pop() || new ip(), n.begin(c, p, v), this.batches.push(n), s = c), this.addUvs(this.points, e, c.texture, v, _, c.matrix));
            }
          }
        }
        var g = this.indices.length, I = this.points.length / 2;
        if (n && n.end(g, I), this.batches.length === 0) {
          this.batchable = !0;
          return;
        }
        var E = I > 65535;
        this.indicesUint16 && this.indices.length === this.indicesUint16.length && E === this.indicesUint16.BYTES_PER_ELEMENT > 2 ? this.indicesUint16.set(this.indices) : this.indicesUint16 = E ? new Uint32Array(this.indices) : new Uint16Array(this.indices), this.batchable = this.isBatchable(), this.batchable ? this.packBatches() : this.buildDrawCalls();
      }
    }, t.prototype._compareStyles = function(e, r) {
      return !(!e || !r || e.texture.baseTexture !== r.texture.baseTexture || e.color + e.alpha !== r.color + r.alpha || !!e.native != !!r.native);
    }, t.prototype.validateBatching = function() {
      if (this.dirty === this.cacheDirty || !this.graphicsData.length)
        return !1;
      for (var e = 0, r = this.graphicsData.length; e < r; e++) {
        var n = this.graphicsData[e], s = n.fillStyle, a = n.lineStyle;
        if (s && !s.texture.baseTexture.valid || a && !a.texture.baseTexture.valid)
          return !1;
      }
      return !0;
    }, t.prototype.packBatches = function() {
      this.batchDirty++, this.uvsFloat32 = new Float32Array(this.uvs);
      for (var e = this.batches, r = 0, n = e.length; r < n; r++)
        for (var s = e[r], a = 0; a < s.size; a++) {
          var o = s.start + a;
          this.indicesUint16[o] = this.indicesUint16[o] - s.attribStart;
        }
    }, t.prototype.isBatchable = function() {
      if (this.points.length > 65535 * 2)
        return !1;
      for (var e = this.batches, r = 0; r < e.length; r++)
        if (e[r].style.native)
          return !1;
      return this.points.length < t.BATCHABLE_SIZE * 2;
    }, t.prototype.buildDrawCalls = function() {
      for (var e = ++ot._globalBatch, r = 0; r < this.drawCalls.length; r++)
        this.drawCalls[r].texArray.clear(), Wr.push(this.drawCalls[r]);
      this.drawCalls.length = 0;
      var n = this.colors, s = this.textureIds, a = Wr.pop();
      a || (a = new pi(), a.texArray = new vi()), a.texArray.count = 0, a.start = 0, a.size = 0, a.type = $t.TRIANGLES;
      var o = 0, h = null, u = 0, l = !1, f = $t.TRIANGLES, c = 0;
      this.drawCalls.push(a);
      for (var r = 0; r < this.batches.length; r++) {
        var d = this.batches[r], p = 8, v = d.style, _ = v.texture.baseTexture;
        l !== !!v.native && (l = !!v.native, f = l ? $t.LINES : $t.TRIANGLES, h = null, o = p, e++), h !== _ && (h = _, _._batchEnabled !== e && (o === p && (e++, o = 0, a.size > 0 && (a = Wr.pop(), a || (a = new pi(), a.texArray = new vi()), this.drawCalls.push(a)), a.start = c, a.size = 0, a.texArray.count = 0, a.type = f), _.touched = 1, _._batchEnabled = e, _._batchLocation = o, _.wrapMode = Qt.REPEAT, a.texArray.elements[a.texArray.count++] = _, o++)), a.size += d.size, c += d.size, u = _._batchLocation, this.addColors(n, v.color, v.alpha, d.attribSize, d.attribStart), this.addTextureIds(s, u, d.attribSize, d.attribStart);
      }
      ot._globalBatch = e, this.packAttributes();
    }, t.prototype.packAttributes = function() {
      for (var e = this.points, r = this.uvs, n = this.colors, s = this.textureIds, a = new ArrayBuffer(e.length * 3 * 4), o = new Float32Array(a), h = new Uint32Array(a), u = 0, l = 0; l < e.length / 2; l++)
        o[u++] = e[l * 2], o[u++] = e[l * 2 + 1], o[u++] = r[l * 2], o[u++] = r[l * 2 + 1], h[u++] = n[l], o[u++] = s[l];
      this._buffer.update(a), this._indexBuffer.update(this.indicesUint16);
    }, t.prototype.processFill = function(e) {
      if (e.holes.length)
        Xo.triangulate(e, this);
      else {
        var r = en[e.type];
        r.triangulate(e, this);
      }
    }, t.prototype.processLine = function(e) {
      Aa(e, this);
      for (var r = 0; r < e.holes.length; r++)
        Aa(e.holes[r], this);
    }, t.prototype.processHoles = function(e) {
      for (var r = 0; r < e.length; r++) {
        var n = e[r], s = en[n.type];
        s.build(n), n.matrix && this.transformPoints(n.points, n.matrix);
      }
    }, t.prototype.calculateBounds = function() {
      var e = this._bounds;
      e.clear(), e.addVertexData(this.points, 0, this.points.length), e.pad(this.boundsPadding, this.boundsPadding);
    }, t.prototype.transformPoints = function(e, r) {
      for (var n = 0; n < e.length / 2; n++) {
        var s = e[n * 2], a = e[n * 2 + 1];
        e[n * 2] = r.a * s + r.c * a + r.tx, e[n * 2 + 1] = r.b * s + r.d * a + r.ty;
      }
    }, t.prototype.addColors = function(e, r, n, s, a) {
      a === void 0 && (a = 0);
      var o = (r >> 16) + (r & 65280) + ((r & 255) << 16), h = qn(o, n);
      e.length = Math.max(e.length, a + s);
      for (var u = 0; u < s; u++)
        e[a + u] = h;
    }, t.prototype.addTextureIds = function(e, r, n, s) {
      s === void 0 && (s = 0), e.length = Math.max(e.length, s + n);
      for (var a = 0; a < n; a++)
        e[s + a] = r;
    }, t.prototype.addUvs = function(e, r, n, s, a, o) {
      o === void 0 && (o = null);
      for (var h = 0, u = r.length, l = n.frame; h < a; ) {
        var f = e[(s + h) * 2], c = e[(s + h) * 2 + 1];
        if (o) {
          var d = o.a * f + o.c * c + o.tx;
          c = o.b * f + o.d * c + o.ty, f = d;
        }
        h++, r.push(f / l.width, c / l.height);
      }
      var p = n.baseTexture;
      (l.width < p.width || l.height < p.height) && this.adjustUvs(r, n, u, a);
    }, t.prototype.adjustUvs = function(e, r, n, s) {
      for (var a = r.baseTexture, o = 1e-6, h = n + s * 2, u = r.frame, l = u.width / a.width, f = u.height / a.height, c = u.x / u.width, d = u.y / u.height, p = Math.floor(e[n] + o), v = Math.floor(e[n + 1] + o), _ = n + 2; _ < h; _ += 2)
        p = Math.min(p, Math.floor(e[_] + o)), v = Math.min(v, Math.floor(e[_ + 1] + o));
      c -= p, d -= v;
      for (var _ = n; _ < h; _ += 2)
        e[_] = (e[_] + c) * l, e[_ + 1] = (e[_ + 1] + d) * f;
    }, t.BATCHABLE_SIZE = 100, t;
  }(Es)
), sp = (
  /** @class */
  function(i) {
    Is(t, i);
    function t() {
      var e = i !== null && i.apply(this, arguments) || this;
      return e.width = 0, e.alignment = 0.5, e.native = !1, e.cap = ye.BUTT, e.join = fe.MITER, e.miterLimit = 10, e;
    }
    return t.prototype.clone = function() {
      var e = new t();
      return e.color = this.color, e.alpha = this.alpha, e.texture = this.texture, e.matrix = this.matrix, e.visible = this.visible, e.width = this.width, e.alignment = this.alignment, e.native = this.native, e.cap = this.cap, e.join = this.join, e.miterLimit = this.miterLimit, e;
    }, t.prototype.reset = function() {
      i.prototype.reset.call(this), this.color = 0, this.alignment = 0.5, this.width = 0, this.native = !1;
    }, t;
  }(Ho)
), ap = new Float32Array(3), rn = {}, bi = (
  /** @class */
  function(i) {
    Is(t, i);
    function t(e) {
      e === void 0 && (e = null);
      var r = i.call(this) || this;
      return r.shader = null, r.pluginName = "batch", r.currentPath = null, r.batches = [], r.batchTint = -1, r.batchDirty = -1, r.vertexData = null, r._fillStyle = new Ho(), r._lineStyle = new sp(), r._matrix = null, r._holeMode = !1, r.state = we.for2d(), r._geometry = e || new np(), r._geometry.refCount++, r._transformID = -1, r.tint = 16777215, r.blendMode = q.NORMAL, r;
    }
    return Object.defineProperty(t.prototype, "geometry", {
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
    }), t.prototype.clone = function() {
      return this.finishPoly(), new t(this._geometry);
    }, Object.defineProperty(t.prototype, "blendMode", {
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
      set: function(e) {
        this.state.blendMode = e;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "tint", {
      /**
       * The tint applied to each graphic shape. This is a hex value. A value of
       * 0xFFFFFF will remove any tint effect.
       * @default 0xFFFFFF
       */
      get: function() {
        return this._tint;
      },
      set: function(e) {
        this._tint = e;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "fill", {
      /**
       * The current fill style.
       * @readonly
       */
      get: function() {
        return this._fillStyle;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "line", {
      /**
       * The current line style.
       * @readonly
       */
      get: function() {
        return this._lineStyle;
      },
      enumerable: !1,
      configurable: !0
    }), t.prototype.lineStyle = function(e, r, n, s, a) {
      return e === void 0 && (e = null), r === void 0 && (r = 0), n === void 0 && (n = 1), s === void 0 && (s = 0.5), a === void 0 && (a = !1), typeof e == "number" && (e = { width: e, color: r, alpha: n, alignment: s, native: a }), this.lineTextureStyle(e);
    }, t.prototype.lineTextureStyle = function(e) {
      e = Object.assign({
        width: 0,
        texture: et.WHITE,
        color: e && e.texture ? 16777215 : 0,
        alpha: 1,
        matrix: null,
        alignment: 0.5,
        native: !1,
        cap: ye.BUTT,
        join: fe.MITER,
        miterLimit: 10
      }, e), this.currentPath && this.startPoly();
      var r = e.width > 0 && e.alpha > 0;
      return r ? (e.matrix && (e.matrix = e.matrix.clone(), e.matrix.invert()), Object.assign(this._lineStyle, { visible: r }, e)) : this._lineStyle.reset(), this;
    }, t.prototype.startPoly = function() {
      if (this.currentPath) {
        var e = this.currentPath.points, r = this.currentPath.points.length;
        r > 2 && (this.drawShape(this.currentPath), this.currentPath = new Qr(), this.currentPath.closeStroke = !1, this.currentPath.points.push(e[r - 2], e[r - 1]));
      } else
        this.currentPath = new Qr(), this.currentPath.closeStroke = !1;
    }, t.prototype.finishPoly = function() {
      this.currentPath && (this.currentPath.points.length > 2 ? (this.drawShape(this.currentPath), this.currentPath = null) : this.currentPath.points.length = 0);
    }, t.prototype.moveTo = function(e, r) {
      return this.startPoly(), this.currentPath.points[0] = e, this.currentPath.points[1] = r, this;
    }, t.prototype.lineTo = function(e, r) {
      this.currentPath || this.moveTo(0, 0);
      var n = this.currentPath.points, s = n[n.length - 2], a = n[n.length - 1];
      return (s !== e || a !== r) && n.push(e, r), this;
    }, t.prototype._initCurve = function(e, r) {
      e === void 0 && (e = 0), r === void 0 && (r = 0), this.currentPath ? this.currentPath.points.length === 0 && (this.currentPath.points = [e, r]) : this.moveTo(e, r);
    }, t.prototype.quadraticCurveTo = function(e, r, n, s) {
      this._initCurve();
      var a = this.currentPath.points;
      return a.length === 0 && this.moveTo(0, 0), rp.curveTo(e, r, n, s, a), this;
    }, t.prototype.bezierCurveTo = function(e, r, n, s, a, o) {
      return this._initCurve(), ep.curveTo(e, r, n, s, a, o, this.currentPath.points), this;
    }, t.prototype.arcTo = function(e, r, n, s, a) {
      this._initCurve(e, r);
      var o = this.currentPath.points, h = Ra.curveTo(e, r, n, s, a, o);
      if (h) {
        var u = h.cx, l = h.cy, f = h.radius, c = h.startAngle, d = h.endAngle, p = h.anticlockwise;
        this.arc(u, l, f, c, d, p);
      }
      return this;
    }, t.prototype.arc = function(e, r, n, s, a, o) {
      if (o === void 0 && (o = !1), s === a)
        return this;
      !o && a <= s ? a += fi : o && s <= a && (s += fi);
      var h = a - s;
      if (h === 0)
        return this;
      var u = e + Math.cos(s) * n, l = r + Math.sin(s) * n, f = this._geometry.closePointEps, c = this.currentPath ? this.currentPath.points : null;
      if (c) {
        var d = Math.abs(c[c.length - 2] - u), p = Math.abs(c[c.length - 1] - l);
        d < f && p < f || c.push(u, l);
      } else
        this.moveTo(u, l), c = this.currentPath.points;
      return Ra.arc(u, l, e, r, n, s, a, o, c), this;
    }, t.prototype.beginFill = function(e, r) {
      return e === void 0 && (e = 0), r === void 0 && (r = 1), this.beginTextureFill({ texture: et.WHITE, color: e, alpha: r });
    }, t.prototype.beginTextureFill = function(e) {
      e = Object.assign({
        texture: et.WHITE,
        color: 16777215,
        alpha: 1,
        matrix: null
      }, e), this.currentPath && this.startPoly();
      var r = e.alpha > 0;
      return r ? (e.matrix && (e.matrix = e.matrix.clone(), e.matrix.invert()), Object.assign(this._fillStyle, { visible: r }, e)) : this._fillStyle.reset(), this;
    }, t.prototype.endFill = function() {
      return this.finishPoly(), this._fillStyle.reset(), this;
    }, t.prototype.drawRect = function(e, r, n, s) {
      return this.drawShape(new ht(e, r, n, s));
    }, t.prototype.drawRoundedRect = function(e, r, n, s, a) {
      return this.drawShape(new Yf(e, r, n, s, a));
    }, t.prototype.drawCircle = function(e, r, n) {
      return this.drawShape(new Xf(e, r, n));
    }, t.prototype.drawEllipse = function(e, r, n, s) {
      return this.drawShape(new zf(e, r, n, s));
    }, t.prototype.drawPolygon = function() {
      for (var e = arguments, r = [], n = 0; n < arguments.length; n++)
        r[n] = e[n];
      var s, a = !0, o = r[0];
      o.points ? (a = o.closeStroke, s = o.points) : Array.isArray(r[0]) ? s = r[0] : s = r;
      var h = new Qr(s);
      return h.closeStroke = a, this.drawShape(h), this;
    }, t.prototype.drawShape = function(e) {
      return this._holeMode ? this._geometry.drawHole(e, this._matrix) : this._geometry.drawShape(e, this._fillStyle.clone(), this._lineStyle.clone(), this._matrix), this;
    }, t.prototype.clear = function() {
      return this._geometry.clear(), this._lineStyle.reset(), this._fillStyle.reset(), this._boundsID++, this._matrix = null, this._holeMode = !1, this.currentPath = null, this;
    }, t.prototype.isFastRect = function() {
      var e = this._geometry.graphicsData;
      return e.length === 1 && e[0].shape.type === Rt.RECT && !e[0].matrix && !e[0].holes.length && !(e[0].lineStyle.visible && e[0].lineStyle.width);
    }, t.prototype._render = function(e) {
      this.finishPoly();
      var r = this._geometry;
      r.updateBatches(), r.batchable ? (this.batchDirty !== r.batchDirty && this._populateBatches(), this._renderBatched(e)) : (e.batch.flush(), this._renderDirect(e));
    }, t.prototype._populateBatches = function() {
      var e = this._geometry, r = this.blendMode, n = e.batches.length;
      this.batchTint = -1, this._transformID = -1, this.batchDirty = e.batchDirty, this.batches.length = n, this.vertexData = new Float32Array(e.points);
      for (var s = 0; s < n; s++) {
        var a = e.batches[s], o = a.style.color, h = new Float32Array(this.vertexData.buffer, a.attribStart * 4 * 2, a.attribSize * 2), u = new Float32Array(e.uvsFloat32.buffer, a.attribStart * 4 * 2, a.attribSize * 2), l = new Uint16Array(e.indicesUint16.buffer, a.start * 2, a.size), f = {
          vertexData: h,
          blendMode: r,
          indices: l,
          uvs: u,
          _batchRGB: $e(o),
          _tintRGB: o,
          _texture: a.style.texture,
          alpha: a.style.alpha,
          worldAlpha: 1
        };
        this.batches[s] = f;
      }
    }, t.prototype._renderBatched = function(e) {
      if (this.batches.length) {
        e.batch.setObjectRenderer(e.plugins[this.pluginName]), this.calculateVertices(), this.calculateTints();
        for (var r = 0, n = this.batches.length; r < n; r++) {
          var s = this.batches[r];
          s.worldAlpha = this.worldAlpha * s.alpha, e.plugins[this.pluginName].render(s);
        }
      }
    }, t.prototype._renderDirect = function(e) {
      var r = this._resolveDirectShader(e), n = this._geometry, s = this.tint, a = this.worldAlpha, o = r.uniforms, h = n.drawCalls;
      o.translationMatrix = this.transform.worldTransform, o.tint[0] = (s >> 16 & 255) / 255 * a, o.tint[1] = (s >> 8 & 255) / 255 * a, o.tint[2] = (s & 255) / 255 * a, o.tint[3] = a, e.shader.bind(r), e.geometry.bind(n, r), e.state.set(this.state);
      for (var u = 0, l = h.length; u < l; u++)
        this._renderDrawCallDirect(e, n.drawCalls[u]);
    }, t.prototype._renderDrawCallDirect = function(e, r) {
      for (var n = r.texArray, s = r.type, a = r.size, o = r.start, h = n.count, u = 0; u < h; u++)
        e.texture.bind(n.elements[u], u);
      e.geometry.draw(s, a, o);
    }, t.prototype._resolveDirectShader = function(e) {
      var r = this.shader, n = this.pluginName;
      if (!r) {
        if (!rn[n]) {
          for (var s = e.plugins[n].MAX_TEXTURES, a = new Int32Array(s), o = 0; o < s; o++)
            a[o] = o;
          var h = {
            tint: new Float32Array([1, 1, 1, 1]),
            translationMatrix: new At(),
            default: be.from({ uSamplers: a }, !0)
          }, u = e.plugins[n]._shader.program;
          rn[n] = new ce(u, h);
        }
        r = rn[n];
      }
      return r;
    }, t.prototype._calculateBounds = function() {
      this.finishPoly();
      var e = this._geometry;
      if (e.graphicsData.length) {
        var r = e.bounds, n = r.minX, s = r.minY, a = r.maxX, o = r.maxY;
        this._bounds.addFrame(this.transform, n, s, a, o);
      }
    }, t.prototype.containsPoint = function(e) {
      return this.worldTransform.applyInverse(e, t._TEMP_POINT), this._geometry.containsPoint(t._TEMP_POINT);
    }, t.prototype.calculateTints = function() {
      if (this.batchTint !== this.tint) {
        this.batchTint = this.tint;
        for (var e = $e(this.tint, ap), r = 0; r < this.batches.length; r++) {
          var n = this.batches[r], s = n._batchRGB, a = e[0] * s[0] * 255, o = e[1] * s[1] * 255, h = e[2] * s[2] * 255, u = (a << 16) + (o << 8) + (h | 0);
          n._tintRGB = (u >> 16) + (u & 65280) + ((u & 255) << 16);
        }
      }
    }, t.prototype.calculateVertices = function() {
      var e = this.transform._worldID;
      if (this._transformID !== e) {
        this._transformID = e;
        for (var r = this.transform.worldTransform, n = r.a, s = r.b, a = r.c, o = r.d, h = r.tx, u = r.ty, l = this._geometry.points, f = this.vertexData, c = 0, d = 0; d < l.length; d += 2) {
          var p = l[d], v = l[d + 1];
          f[c++] = n * p + a * v + h, f[c++] = o * v + s * p + u;
        }
      }
    }, t.prototype.closePath = function() {
      var e = this.currentPath;
      return e && (e.closeStroke = !0, this.finishPoly()), this;
    }, t.prototype.setMatrix = function(e) {
      return this._matrix = e, this;
    }, t.prototype.beginHole = function() {
      return this.finishPoly(), this._holeMode = !0, this;
    }, t.prototype.endHole = function() {
      return this.finishPoly(), this._holeMode = !1, this;
    }, t.prototype.destroy = function(e) {
      this._geometry.refCount--, this._geometry.refCount === 0 && this._geometry.dispose(), this._matrix = null, this.currentPath = null, this._lineStyle.destroy(), this._lineStyle = null, this._fillStyle.destroy(), this._fillStyle = null, this._geometry = null, this.shader = null, this.vertexData = null, this.batches.length = 0, this.batches = null, i.prototype.destroy.call(this, e);
    }, t.nextRoundedRectBehavior = !1, t._TEMP_POINT = new gt(), t;
  }(re)
);
/*!
 * @pixi/sprite - v6.5.10
 * Compiled Thu, 06 Jul 2023 15:25:11 UTC
 *
 * @pixi/sprite is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var Pn = function(i, t) {
  return Pn = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, r) {
    e.__proto__ = r;
  } || function(e, r) {
    for (var n in r)
      r.hasOwnProperty(n) && (e[n] = r[n]);
  }, Pn(i, t);
};
function op(i, t) {
  Pn(i, t);
  function e() {
    this.constructor = i;
  }
  i.prototype = t === null ? Object.create(t) : (e.prototype = t.prototype, new e());
}
var hr = new gt(), hp = new Uint16Array([0, 1, 2, 0, 2, 3]), xe = (
  /** @class */
  function(i) {
    op(t, i);
    function t(e) {
      var r = i.call(this) || this;
      return r._anchor = new We(r._onAnchorUpdate, r, e ? e.defaultAnchor.x : 0, e ? e.defaultAnchor.y : 0), r._texture = null, r._width = 0, r._height = 0, r._tint = null, r._tintRGB = null, r.tint = 16777215, r.blendMode = q.NORMAL, r._cachedTint = 16777215, r.uvs = null, r.texture = e || et.EMPTY, r.vertexData = new Float32Array(8), r.vertexTrimmedData = null, r._transformID = -1, r._textureID = -1, r._transformTrimmedID = -1, r._textureTrimmedID = -1, r.indices = hp, r.pluginName = "batch", r.isSprite = !0, r._roundPixels = z.ROUND_PIXELS, r;
    }
    return t.prototype._onTextureUpdate = function() {
      this._textureID = -1, this._textureTrimmedID = -1, this._cachedTint = 16777215, this._width && (this.scale.x = Ye(this.scale.x) * this._width / this._texture.orig.width), this._height && (this.scale.y = Ye(this.scale.y) * this._height / this._texture.orig.height);
    }, t.prototype._onAnchorUpdate = function() {
      this._transformID = -1, this._transformTrimmedID = -1;
    }, t.prototype.calculateVertices = function() {
      var e = this._texture;
      if (!(this._transformID === this.transform._worldID && this._textureID === e._updateID)) {
        this._textureID !== e._updateID && (this.uvs = this._texture._uvs.uvsFloat32), this._transformID = this.transform._worldID, this._textureID = e._updateID;
        var r = this.transform.worldTransform, n = r.a, s = r.b, a = r.c, o = r.d, h = r.tx, u = r.ty, l = this.vertexData, f = e.trim, c = e.orig, d = this._anchor, p = 0, v = 0, _ = 0, g = 0;
        if (f ? (v = f.x - d._x * c.width, p = v + f.width, g = f.y - d._y * c.height, _ = g + f.height) : (v = -d._x * c.width, p = v + c.width, g = -d._y * c.height, _ = g + c.height), l[0] = n * v + a * g + h, l[1] = o * g + s * v + u, l[2] = n * p + a * g + h, l[3] = o * g + s * p + u, l[4] = n * p + a * _ + h, l[5] = o * _ + s * p + u, l[6] = n * v + a * _ + h, l[7] = o * _ + s * v + u, this._roundPixels)
          for (var I = z.RESOLUTION, E = 0; E < l.length; ++E)
            l[E] = Math.round((l[E] * I | 0) / I);
      }
    }, t.prototype.calculateTrimmedVertices = function() {
      if (!this.vertexTrimmedData)
        this.vertexTrimmedData = new Float32Array(8);
      else if (this._transformTrimmedID === this.transform._worldID && this._textureTrimmedID === this._texture._updateID)
        return;
      this._transformTrimmedID = this.transform._worldID, this._textureTrimmedID = this._texture._updateID;
      var e = this._texture, r = this.vertexTrimmedData, n = e.orig, s = this._anchor, a = this.transform.worldTransform, o = a.a, h = a.b, u = a.c, l = a.d, f = a.tx, c = a.ty, d = -s._x * n.width, p = d + n.width, v = -s._y * n.height, _ = v + n.height;
      r[0] = o * d + u * v + f, r[1] = l * v + h * d + c, r[2] = o * p + u * v + f, r[3] = l * v + h * p + c, r[4] = o * p + u * _ + f, r[5] = l * _ + h * p + c, r[6] = o * d + u * _ + f, r[7] = l * _ + h * d + c;
    }, t.prototype._render = function(e) {
      this.calculateVertices(), e.batch.setObjectRenderer(e.plugins[this.pluginName]), e.plugins[this.pluginName].render(this);
    }, t.prototype._calculateBounds = function() {
      var e = this._texture.trim, r = this._texture.orig;
      !e || e.width === r.width && e.height === r.height ? (this.calculateVertices(), this._bounds.addQuad(this.vertexData)) : (this.calculateTrimmedVertices(), this._bounds.addQuad(this.vertexTrimmedData));
    }, t.prototype.getLocalBounds = function(e) {
      return this.children.length === 0 ? (this._localBounds || (this._localBounds = new ci()), this._localBounds.minX = this._texture.orig.width * -this._anchor._x, this._localBounds.minY = this._texture.orig.height * -this._anchor._y, this._localBounds.maxX = this._texture.orig.width * (1 - this._anchor._x), this._localBounds.maxY = this._texture.orig.height * (1 - this._anchor._y), e || (this._localBoundsRect || (this._localBoundsRect = new ht()), e = this._localBoundsRect), this._localBounds.getRectangle(e)) : i.prototype.getLocalBounds.call(this, e);
    }, t.prototype.containsPoint = function(e) {
      this.worldTransform.applyInverse(e, hr);
      var r = this._texture.orig.width, n = this._texture.orig.height, s = -r * this.anchor.x, a = 0;
      return hr.x >= s && hr.x < s + r && (a = -n * this.anchor.y, hr.y >= a && hr.y < a + n);
    }, t.prototype.destroy = function(e) {
      i.prototype.destroy.call(this, e), this._texture.off("update", this._onTextureUpdate, this), this._anchor = null;
      var r = typeof e == "boolean" ? e : e && e.texture;
      if (r) {
        var n = typeof e == "boolean" ? e : e && e.baseTexture;
        this._texture.destroy(!!n);
      }
      this._texture = null;
    }, t.from = function(e, r) {
      var n = e instanceof et ? e : et.from(e, r);
      return new t(n);
    }, Object.defineProperty(t.prototype, "roundPixels", {
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
      set: function(e) {
        this._roundPixels !== e && (this._transformID = -1), this._roundPixels = e;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "width", {
      /** The width of the sprite, setting this will actually modify the scale to achieve the value set. */
      get: function() {
        return Math.abs(this.scale.x) * this._texture.orig.width;
      },
      set: function(e) {
        var r = Ye(this.scale.x) || 1;
        this.scale.x = r * e / this._texture.orig.width, this._width = e;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "height", {
      /** The height of the sprite, setting this will actually modify the scale to achieve the value set. */
      get: function() {
        return Math.abs(this.scale.y) * this._texture.orig.height;
      },
      set: function(e) {
        var r = Ye(this.scale.y) || 1;
        this.scale.y = r * e / this._texture.orig.height, this._height = e;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "anchor", {
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
      set: function(e) {
        this._anchor.copyFrom(e);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "tint", {
      /**
       * The tint applied to the sprite. This is a hex value.
       *
       * A value of 0xFFFFFF will remove any tint effect.
       * @default 0xFFFFFF
       */
      get: function() {
        return this._tint;
      },
      set: function(e) {
        this._tint = e, this._tintRGB = (e >> 16) + (e & 65280) + ((e & 255) << 16);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "texture", {
      /** The texture that the sprite is using. */
      get: function() {
        return this._texture;
      },
      set: function(e) {
        this._texture !== e && (this._texture && this._texture.off("update", this._onTextureUpdate, this), this._texture = e || et.EMPTY, this._cachedTint = 16777215, this._textureID = -1, this._textureTrimmedID = -1, e && (e.baseTexture.valid ? this._onTextureUpdate() : e.once("update", this._onTextureUpdate, this)));
      },
      enumerable: !1,
      configurable: !0
    }), t;
  }(re)
);
/*!
 * @pixi/text - v6.5.10
 * Compiled Thu, 06 Jul 2023 15:25:11 UTC
 *
 * @pixi/text is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var Mn = function(i, t) {
  return Mn = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, r) {
    e.__proto__ = r;
  } || function(e, r) {
    for (var n in r)
      r.hasOwnProperty(n) && (e[n] = r[n]);
  }, Mn(i, t);
};
function up(i, t) {
  Mn(i, t);
  function e() {
    this.constructor = i;
  }
  i.prototype = t === null ? Object.create(t) : (e.prototype = t.prototype, new e());
}
var yr;
(function(i) {
  i[i.LINEAR_VERTICAL = 0] = "LINEAR_VERTICAL", i[i.LINEAR_HORIZONTAL = 1] = "LINEAR_HORIZONTAL";
})(yr || (yr = {}));
var nn = {
  align: "left",
  breakWords: !1,
  dropShadow: !1,
  dropShadowAlpha: 1,
  dropShadowAngle: Math.PI / 6,
  dropShadowBlur: 0,
  dropShadowColor: "black",
  dropShadowDistance: 5,
  fill: "black",
  fillGradientType: yr.LINEAR_VERTICAL,
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
}, lp = [
  "serif",
  "sans-serif",
  "monospace",
  "cursive",
  "fantasy",
  "system-ui"
], Ze = (
  /** @class */
  function() {
    function i(t) {
      this.styleID = 0, this.reset(), an(this, t, t);
    }
    return i.prototype.clone = function() {
      var t = {};
      return an(t, this, nn), new i(t);
    }, i.prototype.reset = function() {
      an(this, nn, nn);
    }, Object.defineProperty(i.prototype, "align", {
      /**
       * Alignment for multiline text ('left', 'center' or 'right'), does not affect single line text
       *
       * @member {string}
       */
      get: function() {
        return this._align;
      },
      set: function(t) {
        this._align !== t && (this._align = t, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "breakWords", {
      /** Indicates if lines can be wrapped within words, it needs wordWrap to be set to true. */
      get: function() {
        return this._breakWords;
      },
      set: function(t) {
        this._breakWords !== t && (this._breakWords = t, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "dropShadow", {
      /** Set a drop shadow for the text. */
      get: function() {
        return this._dropShadow;
      },
      set: function(t) {
        this._dropShadow !== t && (this._dropShadow = t, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "dropShadowAlpha", {
      /** Set alpha for the drop shadow. */
      get: function() {
        return this._dropShadowAlpha;
      },
      set: function(t) {
        this._dropShadowAlpha !== t && (this._dropShadowAlpha = t, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "dropShadowAngle", {
      /** Set a angle of the drop shadow. */
      get: function() {
        return this._dropShadowAngle;
      },
      set: function(t) {
        this._dropShadowAngle !== t && (this._dropShadowAngle = t, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "dropShadowBlur", {
      /** Set a shadow blur radius. */
      get: function() {
        return this._dropShadowBlur;
      },
      set: function(t) {
        this._dropShadowBlur !== t && (this._dropShadowBlur = t, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "dropShadowColor", {
      /** A fill style to be used on the dropshadow e.g 'red', '#00FF00'. */
      get: function() {
        return this._dropShadowColor;
      },
      set: function(t) {
        var e = sn(t);
        this._dropShadowColor !== e && (this._dropShadowColor = e, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "dropShadowDistance", {
      /** Set a distance of the drop shadow. */
      get: function() {
        return this._dropShadowDistance;
      },
      set: function(t) {
        this._dropShadowDistance !== t && (this._dropShadowDistance = t, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "fill", {
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
      set: function(t) {
        var e = sn(t);
        this._fill !== e && (this._fill = e, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "fillGradientType", {
      /**
       * If fill is an array of colours to create a gradient, this can change the type/direction of the gradient.
       *
       * @see PIXI.TEXT_GRADIENT
       */
      get: function() {
        return this._fillGradientType;
      },
      set: function(t) {
        this._fillGradientType !== t && (this._fillGradientType = t, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "fillGradientStops", {
      /**
       * If fill is an array of colours to create a gradient, this array can set the stop points
       * (numbers between 0 and 1) for the color, overriding the default behaviour of evenly spacing them.
       */
      get: function() {
        return this._fillGradientStops;
      },
      set: function(t) {
        fp(this._fillGradientStops, t) || (this._fillGradientStops = t, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "fontFamily", {
      /** The font family. */
      get: function() {
        return this._fontFamily;
      },
      set: function(t) {
        this.fontFamily !== t && (this._fontFamily = t, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "fontSize", {
      /**
       * The font size
       * (as a number it converts to px, but as a string, equivalents are '26px','20pt','160%' or '1.6em')
       */
      get: function() {
        return this._fontSize;
      },
      set: function(t) {
        this._fontSize !== t && (this._fontSize = t, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "fontStyle", {
      /**
       * The font style
       * ('normal', 'italic' or 'oblique')
       *
       * @member {string}
       */
      get: function() {
        return this._fontStyle;
      },
      set: function(t) {
        this._fontStyle !== t && (this._fontStyle = t, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "fontVariant", {
      /**
       * The font variant
       * ('normal' or 'small-caps')
       *
       * @member {string}
       */
      get: function() {
        return this._fontVariant;
      },
      set: function(t) {
        this._fontVariant !== t && (this._fontVariant = t, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "fontWeight", {
      /**
       * The font weight
       * ('normal', 'bold', 'bolder', 'lighter' and '100', '200', '300', '400', '500', '600', '700', 800' or '900')
       *
       * @member {string}
       */
      get: function() {
        return this._fontWeight;
      },
      set: function(t) {
        this._fontWeight !== t && (this._fontWeight = t, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "letterSpacing", {
      /** The amount of spacing between letters, default is 0. */
      get: function() {
        return this._letterSpacing;
      },
      set: function(t) {
        this._letterSpacing !== t && (this._letterSpacing = t, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "lineHeight", {
      /** The line height, a number that represents the vertical space that a letter uses. */
      get: function() {
        return this._lineHeight;
      },
      set: function(t) {
        this._lineHeight !== t && (this._lineHeight = t, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "leading", {
      /** The space between lines. */
      get: function() {
        return this._leading;
      },
      set: function(t) {
        this._leading !== t && (this._leading = t, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "lineJoin", {
      /**
       * The lineJoin property sets the type of corner created, it can resolve spiked text issues.
       * Default is 'miter' (creates a sharp corner).
       *
       * @member {string}
       */
      get: function() {
        return this._lineJoin;
      },
      set: function(t) {
        this._lineJoin !== t && (this._lineJoin = t, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "miterLimit", {
      /**
       * The miter limit to use when using the 'miter' lineJoin mode.
       *
       * This can reduce or increase the spikiness of rendered text.
       */
      get: function() {
        return this._miterLimit;
      },
      set: function(t) {
        this._miterLimit !== t && (this._miterLimit = t, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "padding", {
      /**
       * Occasionally some fonts are cropped. Adding some padding will prevent this from happening
       * by adding padding to all sides of the text.
       */
      get: function() {
        return this._padding;
      },
      set: function(t) {
        this._padding !== t && (this._padding = t, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "stroke", {
      /**
       * A canvas fillstyle that will be used on the text stroke
       * e.g 'blue', '#FCFF00'
       */
      get: function() {
        return this._stroke;
      },
      set: function(t) {
        var e = sn(t);
        this._stroke !== e && (this._stroke = e, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "strokeThickness", {
      /**
       * A number that represents the thickness of the stroke.
       *
       * @default 0
       */
      get: function() {
        return this._strokeThickness;
      },
      set: function(t) {
        this._strokeThickness !== t && (this._strokeThickness = t, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "textBaseline", {
      /**
       * The baseline of the text that is rendered.
       *
       * @member {string}
       */
      get: function() {
        return this._textBaseline;
      },
      set: function(t) {
        this._textBaseline !== t && (this._textBaseline = t, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "trim", {
      /** Trim transparent borders. */
      get: function() {
        return this._trim;
      },
      set: function(t) {
        this._trim !== t && (this._trim = t, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "whiteSpace", {
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
      set: function(t) {
        this._whiteSpace !== t && (this._whiteSpace = t, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "wordWrap", {
      /** Indicates if word wrap should be used. */
      get: function() {
        return this._wordWrap;
      },
      set: function(t) {
        this._wordWrap !== t && (this._wordWrap = t, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "wordWrapWidth", {
      /** The width at which text will wrap, it needs wordWrap to be set to true. */
      get: function() {
        return this._wordWrapWidth;
      },
      set: function(t) {
        this._wordWrapWidth !== t && (this._wordWrapWidth = t, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), i.prototype.toFontString = function() {
      var t = typeof this.fontSize == "number" ? this.fontSize + "px" : this.fontSize, e = this.fontFamily;
      Array.isArray(this.fontFamily) || (e = this.fontFamily.split(","));
      for (var r = e.length - 1; r >= 0; r--) {
        var n = e[r].trim();
        !/([\"\'])[^\'\"]+\1/.test(n) && lp.indexOf(n) < 0 && (n = '"' + n + '"'), e[r] = n;
      }
      return this.fontStyle + " " + this.fontVariant + " " + this.fontWeight + " " + t + " " + e.join(",");
    }, i;
  }()
);
function Da(i) {
  return typeof i == "number" ? Qa(i) : (typeof i == "string" && i.indexOf("0x") === 0 && (i = i.replace("0x", "#")), i);
}
function sn(i) {
  if (Array.isArray(i)) {
    for (var t = 0; t < i.length; ++t)
      i[t] = Da(i[t]);
    return i;
  } else
    return Da(i);
}
function fp(i, t) {
  if (!Array.isArray(i) || !Array.isArray(t) || i.length !== t.length)
    return !1;
  for (var e = 0; e < i.length; ++e)
    if (i[e] !== t[e])
      return !1;
  return !0;
}
function an(i, t, e) {
  for (var r in e)
    Array.isArray(t[r]) ? i[r] = t[r].slice() : i[r] = t[r];
}
var Vr = {
  // TextMetrics requires getImageData readback for measuring fonts.
  willReadFrequently: !0
}, ae = (
  /** @class */
  function() {
    function i(t, e, r, n, s, a, o, h, u) {
      this.text = t, this.style = e, this.width = r, this.height = n, this.lines = s, this.lineWidths = a, this.lineHeight = o, this.maxLineWidth = h, this.fontProperties = u;
    }
    return i.measureText = function(t, e, r, n) {
      n === void 0 && (n = i._canvas), r = r ?? e.wordWrap;
      var s = e.toFontString(), a = i.measureFont(s);
      a.fontSize === 0 && (a.fontSize = e.fontSize, a.ascent = e.fontSize);
      var o = n.getContext("2d", Vr);
      o.font = s;
      for (var h = r ? i.wordWrap(t, e, n) : t, u = h.split(/(?:\r\n|\r|\n)/), l = new Array(u.length), f = 0, c = 0; c < u.length; c++) {
        var d = o.measureText(u[c]).width + (u[c].length - 1) * e.letterSpacing;
        l[c] = d, f = Math.max(f, d);
      }
      var p = f + e.strokeThickness;
      e.dropShadow && (p += e.dropShadowDistance);
      var v = e.lineHeight || a.fontSize + e.strokeThickness, _ = Math.max(v, a.fontSize + e.strokeThickness) + (u.length - 1) * (v + e.leading);
      return e.dropShadow && (_ += e.dropShadowDistance), new i(t, e, p, _, u, l, v + e.leading, f, a);
    }, i.wordWrap = function(t, e, r) {
      r === void 0 && (r = i._canvas);
      for (var n = r.getContext("2d", Vr), s = 0, a = "", o = "", h = /* @__PURE__ */ Object.create(null), u = e.letterSpacing, l = e.whiteSpace, f = i.collapseSpaces(l), c = i.collapseNewlines(l), d = !f, p = e.wordWrapWidth + u, v = i.tokenize(t), _ = 0; _ < v.length; _++) {
        var g = v[_];
        if (i.isNewline(g)) {
          if (!c) {
            o += i.addLine(a), d = !f, a = "", s = 0;
            continue;
          }
          g = " ";
        }
        if (f) {
          var I = i.isBreakingSpace(g), E = i.isBreakingSpace(a[a.length - 1]);
          if (I && E)
            continue;
        }
        var B = i.getFromCache(g, u, h, n);
        if (B > p)
          if (a !== "" && (o += i.addLine(a), a = "", s = 0), i.canBreakWords(g, e.breakWords))
            for (var P = i.wordWrapSplit(g), A = 0; A < P.length; A++) {
              for (var R = P[A], T = 1; P[A + T]; ) {
                var C = P[A + T], O = R[R.length - 1];
                if (!i.canBreakChars(O, C, g, A, e.breakWords))
                  R += C;
                else
                  break;
                T++;
              }
              A += R.length - 1;
              var U = i.getFromCache(R, u, h, n);
              U + s > p && (o += i.addLine(a), d = !1, a = "", s = 0), a += R, s += U;
            }
          else {
            a.length > 0 && (o += i.addLine(a), a = "", s = 0);
            var K = _ === v.length - 1;
            o += i.addLine(g, !K), d = !1, a = "", s = 0;
          }
        else
          B + s > p && (d = !1, o += i.addLine(a), a = "", s = 0), (a.length > 0 || !i.isBreakingSpace(g) || d) && (a += g, s += B);
      }
      return o += i.addLine(a, !1), o;
    }, i.addLine = function(t, e) {
      return e === void 0 && (e = !0), t = i.trimRight(t), t = e ? t + `
` : t, t;
    }, i.getFromCache = function(t, e, r, n) {
      var s = r[t];
      if (typeof s != "number") {
        var a = t.length * e;
        s = n.measureText(t).width + a, r[t] = s;
      }
      return s;
    }, i.collapseSpaces = function(t) {
      return t === "normal" || t === "pre-line";
    }, i.collapseNewlines = function(t) {
      return t === "normal";
    }, i.trimRight = function(t) {
      if (typeof t != "string")
        return "";
      for (var e = t.length - 1; e >= 0; e--) {
        var r = t[e];
        if (!i.isBreakingSpace(r))
          break;
        t = t.slice(0, -1);
      }
      return t;
    }, i.isNewline = function(t) {
      return typeof t != "string" ? !1 : i._newlines.indexOf(t.charCodeAt(0)) >= 0;
    }, i.isBreakingSpace = function(t, e) {
      return typeof t != "string" ? !1 : i._breakingSpaces.indexOf(t.charCodeAt(0)) >= 0;
    }, i.tokenize = function(t) {
      var e = [], r = "";
      if (typeof t != "string")
        return e;
      for (var n = 0; n < t.length; n++) {
        var s = t[n], a = t[n + 1];
        if (i.isBreakingSpace(s, a) || i.isNewline(s)) {
          r !== "" && (e.push(r), r = ""), e.push(s);
          continue;
        }
        r += s;
      }
      return r !== "" && e.push(r), e;
    }, i.canBreakWords = function(t, e) {
      return e;
    }, i.canBreakChars = function(t, e, r, n, s) {
      return !0;
    }, i.wordWrapSplit = function(t) {
      return t.split("");
    }, i.measureFont = function(t) {
      if (i._fonts[t])
        return i._fonts[t];
      var e = {
        ascent: 0,
        descent: 0,
        fontSize: 0
      }, r = i._canvas, n = i._context;
      n.font = t;
      var s = i.METRICS_STRING + i.BASELINE_SYMBOL, a = Math.ceil(n.measureText(s).width), o = Math.ceil(n.measureText(i.BASELINE_SYMBOL).width), h = Math.ceil(i.HEIGHT_MULTIPLIER * o);
      o = o * i.BASELINE_MULTIPLIER | 0, r.width = a, r.height = h, n.fillStyle = "#f00", n.fillRect(0, 0, a, h), n.font = t, n.textBaseline = "alphabetic", n.fillStyle = "#000", n.fillText(s, 0, o);
      var u = n.getImageData(0, 0, a, h).data, l = u.length, f = a * 4, c = 0, d = 0, p = !1;
      for (c = 0; c < o; ++c) {
        for (var v = 0; v < f; v += 4)
          if (u[d + v] !== 255) {
            p = !0;
            break;
          }
        if (!p)
          d += f;
        else
          break;
      }
      for (e.ascent = o - c, d = l - f, p = !1, c = h; c > o; --c) {
        for (var v = 0; v < f; v += 4)
          if (u[d + v] !== 255) {
            p = !0;
            break;
          }
        if (!p)
          d -= f;
        else
          break;
      }
      return e.descent = c - o, e.fontSize = e.ascent + e.descent, i._fonts[t] = e, e;
    }, i.clearMetrics = function(t) {
      t === void 0 && (t = ""), t ? delete i._fonts[t] : i._fonts = {};
    }, Object.defineProperty(i, "_canvas", {
      /**
       * Cached canvas element for measuring text
       * TODO: this should be private, but isn't because of backward compat, will fix later.
       * @ignore
       */
      get: function() {
        if (!i.__canvas) {
          var t = void 0;
          try {
            var e = new OffscreenCanvas(0, 0), r = e.getContext("2d", Vr);
            if (r && r.measureText)
              return i.__canvas = e, e;
            t = z.ADAPTER.createCanvas();
          } catch {
            t = z.ADAPTER.createCanvas();
          }
          t.width = t.height = 10, i.__canvas = t;
        }
        return i.__canvas;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i, "_context", {
      /**
       * TODO: this should be private, but isn't because of backward compat, will fix later.
       * @ignore
       */
      get: function() {
        return i.__context || (i.__context = i._canvas.getContext("2d", Vr)), i.__context;
      },
      enumerable: !1,
      configurable: !0
    }), i;
  }()
);
ae._fonts = {};
ae.METRICS_STRING = "|ÉqÅ";
ae.BASELINE_SYMBOL = "M";
ae.BASELINE_MULTIPLIER = 1.4;
ae.HEIGHT_MULTIPLIER = 2;
ae._newlines = [
  10,
  13
];
ae._breakingSpaces = [
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
var cp = {
  texture: !0,
  children: !1,
  baseTexture: !0
}, zo = (
  /** @class */
  function(i) {
    up(t, i);
    function t(e, r, n) {
      var s = this, a = !1;
      n || (n = z.ADAPTER.createCanvas(), a = !0), n.width = 3, n.height = 3;
      var o = et.from(n);
      return o.orig = new ht(), o.trim = new ht(), s = i.call(this, o) || this, s._ownCanvas = a, s.canvas = n, s.context = n.getContext("2d", {
        // required for trimming to work without warnings
        willReadFrequently: !0
      }), s._resolution = z.RESOLUTION, s._autoResolution = !0, s._text = null, s._style = null, s._styleListener = null, s._font = "", s.text = e, s.style = r, s.localStyleID = -1, s;
    }
    return t.prototype.updateText = function(e) {
      var r = this._style;
      if (this.localStyleID !== r.styleID && (this.dirty = !0, this.localStyleID = r.styleID), !(!this.dirty && e)) {
        this._font = this._style.toFontString();
        var n = this.context, s = ae.measureText(this._text || " ", this._style, this._style.wordWrap, this.canvas), a = s.width, o = s.height, h = s.lines, u = s.lineHeight, l = s.lineWidths, f = s.maxLineWidth, c = s.fontProperties;
        this.canvas.width = Math.ceil(Math.ceil(Math.max(1, a) + r.padding * 2) * this._resolution), this.canvas.height = Math.ceil(Math.ceil(Math.max(1, o) + r.padding * 2) * this._resolution), n.scale(this._resolution, this._resolution), n.clearRect(0, 0, this.canvas.width, this.canvas.height), n.font = this._font, n.lineWidth = r.strokeThickness, n.textBaseline = r.textBaseline, n.lineJoin = r.lineJoin, n.miterLimit = r.miterLimit;
        for (var d, p, v = r.dropShadow ? 2 : 1, _ = 0; _ < v; ++_) {
          var g = r.dropShadow && _ === 0, I = g ? Math.ceil(Math.max(1, o) + r.padding * 2) : 0, E = I * this._resolution;
          if (g) {
            n.fillStyle = "black", n.strokeStyle = "black";
            var B = r.dropShadowColor, P = $e(typeof B == "number" ? B : to(B)), A = r.dropShadowBlur * this._resolution, R = r.dropShadowDistance * this._resolution;
            n.shadowColor = "rgba(" + P[0] * 255 + "," + P[1] * 255 + "," + P[2] * 255 + "," + r.dropShadowAlpha + ")", n.shadowBlur = A, n.shadowOffsetX = Math.cos(r.dropShadowAngle) * R, n.shadowOffsetY = Math.sin(r.dropShadowAngle) * R + E;
          } else
            n.fillStyle = this._generateFillStyle(r, h, s), n.strokeStyle = r.stroke, n.shadowColor = "black", n.shadowBlur = 0, n.shadowOffsetX = 0, n.shadowOffsetY = 0;
          var T = (u - c.fontSize) / 2;
          (!t.nextLineHeightBehavior || u - c.fontSize < 0) && (T = 0);
          for (var C = 0; C < h.length; C++)
            d = r.strokeThickness / 2, p = r.strokeThickness / 2 + C * u + c.ascent + T, r.align === "right" ? d += f - l[C] : r.align === "center" && (d += (f - l[C]) / 2), r.stroke && r.strokeThickness && this.drawLetterSpacing(h[C], d + r.padding, p + r.padding - I, !0), r.fill && this.drawLetterSpacing(h[C], d + r.padding, p + r.padding - I);
        }
        this.updateTexture();
      }
    }, t.prototype.drawLetterSpacing = function(e, r, n, s) {
      s === void 0 && (s = !1);
      var a = this._style, o = a.letterSpacing, h = t.experimentalLetterSpacing && ("letterSpacing" in CanvasRenderingContext2D.prototype || "textLetterSpacing" in CanvasRenderingContext2D.prototype);
      if (o === 0 || h) {
        h && (this.context.letterSpacing = o, this.context.textLetterSpacing = o), s ? this.context.strokeText(e, r, n) : this.context.fillText(e, r, n);
        return;
      }
      for (var u = r, l = Array.from ? Array.from(e) : e.split(""), f = this.context.measureText(e).width, c = 0, d = 0; d < l.length; ++d) {
        var p = l[d];
        s ? this.context.strokeText(p, u, n) : this.context.fillText(p, u, n);
        for (var v = "", _ = d + 1; _ < l.length; ++_)
          v += l[_];
        c = this.context.measureText(v).width, u += f - c + o, f = c;
      }
    }, t.prototype.updateTexture = function() {
      var e = this.canvas;
      if (this._style.trim) {
        var r = Uf(e);
        r.data && (e.width = r.width, e.height = r.height, this.context.putImageData(r.data, 0, 0));
      }
      var n = this._texture, s = this._style, a = s.trim ? 0 : s.padding, o = n.baseTexture;
      n.trim.width = n._frame.width = e.width / this._resolution, n.trim.height = n._frame.height = e.height / this._resolution, n.trim.x = -a, n.trim.y = -a, n.orig.width = n._frame.width - a * 2, n.orig.height = n._frame.height - a * 2, this._onTextureUpdate(), o.setRealSize(e.width, e.height, this._resolution), n.updateUvs(), this.dirty = !1;
    }, t.prototype._render = function(e) {
      this._autoResolution && this._resolution !== e.resolution && (this._resolution = e.resolution, this.dirty = !0), this.updateText(!0), i.prototype._render.call(this, e);
    }, t.prototype.updateTransform = function() {
      this.updateText(!0), i.prototype.updateTransform.call(this);
    }, t.prototype.getBounds = function(e, r) {
      return this.updateText(!0), this._textureID === -1 && (e = !1), i.prototype.getBounds.call(this, e, r);
    }, t.prototype.getLocalBounds = function(e) {
      return this.updateText(!0), i.prototype.getLocalBounds.call(this, e);
    }, t.prototype._calculateBounds = function() {
      this.calculateVertices(), this._bounds.addQuad(this.vertexData);
    }, t.prototype._generateFillStyle = function(e, r, n) {
      var s = e.fill;
      if (Array.isArray(s)) {
        if (s.length === 1)
          return s[0];
      } else return s;
      var a, o = e.dropShadow ? e.dropShadowDistance : 0, h = e.padding || 0, u = this.canvas.width / this._resolution - o - h * 2, l = this.canvas.height / this._resolution - o - h * 2, f = s.slice(), c = e.fillGradientStops.slice();
      if (!c.length)
        for (var d = f.length + 1, p = 1; p < d; ++p)
          c.push(p / d);
      if (f.unshift(s[0]), c.unshift(0), f.push(s[s.length - 1]), c.push(1), e.fillGradientType === yr.LINEAR_VERTICAL) {
        a = this.context.createLinearGradient(u / 2, h, u / 2, l + h);
        for (var v = n.fontProperties.fontSize + e.strokeThickness, p = 0; p < r.length; p++) {
          var _ = n.lineHeight * (p - 1) + v, g = n.lineHeight * p, I = g;
          p > 0 && _ > g && (I = (g + _) / 2);
          var E = g + v, B = n.lineHeight * (p + 1), P = E;
          p + 1 < r.length && B < E && (P = (E + B) / 2);
          for (var A = (P - I) / l, R = 0; R < f.length; R++) {
            var T = 0;
            typeof c[R] == "number" ? T = c[R] : T = R / f.length;
            var C = Math.min(1, Math.max(0, I / l + T * A));
            C = Number(C.toFixed(5)), a.addColorStop(C, f[R]);
          }
        }
      } else {
        a = this.context.createLinearGradient(h, l / 2, u + h, l / 2);
        for (var O = f.length + 1, U = 1, p = 0; p < f.length; p++) {
          var K = void 0;
          typeof c[p] == "number" ? K = c[p] : K = U / O, a.addColorStop(K, f[p]), U++;
        }
      }
      return a;
    }, t.prototype.destroy = function(e) {
      typeof e == "boolean" && (e = { children: e }), e = Object.assign({}, cp, e), i.prototype.destroy.call(this, e), this._ownCanvas && (this.canvas.height = this.canvas.width = 0), this.context = null, this.canvas = null, this._style = null;
    }, Object.defineProperty(t.prototype, "width", {
      /** The width of the Text, setting this will actually modify the scale to achieve the value set. */
      get: function() {
        return this.updateText(!0), Math.abs(this.scale.x) * this._texture.orig.width;
      },
      set: function(e) {
        this.updateText(!0);
        var r = Ye(this.scale.x) || 1;
        this.scale.x = r * e / this._texture.orig.width, this._width = e;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "height", {
      /** The height of the Text, setting this will actually modify the scale to achieve the value set. */
      get: function() {
        return this.updateText(!0), Math.abs(this.scale.y) * this._texture.orig.height;
      },
      set: function(e) {
        this.updateText(!0);
        var r = Ye(this.scale.y) || 1;
        this.scale.y = r * e / this._texture.orig.height, this._height = e;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "style", {
      /**
       * Set the style of the text.
       *
       * Set up an event listener to listen for changes on the style object and mark the text as dirty.
       */
      get: function() {
        return this._style;
      },
      set: function(e) {
        e = e || {}, e instanceof Ze ? this._style = e : this._style = new Ze(e), this.localStyleID = -1, this.dirty = !0;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "text", {
      /** Set the copy for the text object. To split a line you can use '\n'. */
      get: function() {
        return this._text;
      },
      set: function(e) {
        e = String(e ?? ""), this._text !== e && (this._text = e, this.dirty = !0);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "resolution", {
      /**
       * The resolution / device pixel ratio of the canvas.
       *
       * This is set to automatically match the renderer resolution by default, but can be overridden by setting manually.
       * @default 1
       */
      get: function() {
        return this._resolution;
      },
      set: function(e) {
        this._autoResolution = !1, this._resolution !== e && (this._resolution = e, this.dirty = !0);
      },
      enumerable: !1,
      configurable: !0
    }), t.nextLineHeightBehavior = !1, t.experimentalLetterSpacing = !1, t;
  }(xe)
);
/*!
 * @pixi/prepare - v6.5.10
 * Compiled Thu, 06 Jul 2023 15:25:11 UTC
 *
 * @pixi/prepare is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
z.UPLOADS_PER_FRAME = 4;
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var Cn = function(i, t) {
  return Cn = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, r) {
    e.__proto__ = r;
  } || function(e, r) {
    for (var n in r)
      r.hasOwnProperty(n) && (e[n] = r[n]);
  }, Cn(i, t);
};
function dp(i, t) {
  Cn(i, t);
  function e() {
    this.constructor = i;
  }
  i.prototype = t === null ? Object.create(t) : (e.prototype = t.prototype, new e());
}
var pp = (
  /** @class */
  function() {
    function i(t) {
      this.maxItemsPerFrame = t, this.itemsLeft = 0;
    }
    return i.prototype.beginFrame = function() {
      this.itemsLeft = this.maxItemsPerFrame;
    }, i.prototype.allowedToUpload = function() {
      return this.itemsLeft-- > 0;
    }, i;
  }()
);
function vp(i, t) {
  var e = !1;
  if (i && i._textures && i._textures.length) {
    for (var r = 0; r < i._textures.length; r++)
      if (i._textures[r] instanceof et) {
        var n = i._textures[r].baseTexture;
        t.indexOf(n) === -1 && (t.push(n), e = !0);
      }
  }
  return e;
}
function _p(i, t) {
  if (i.baseTexture instanceof ot) {
    var e = i.baseTexture;
    return t.indexOf(e) === -1 && t.push(e), !0;
  }
  return !1;
}
function mp(i, t) {
  if (i._texture && i._texture instanceof et) {
    var e = i._texture.baseTexture;
    return t.indexOf(e) === -1 && t.push(e), !0;
  }
  return !1;
}
function gp(i, t) {
  return t instanceof zo ? (t.updateText(!0), !0) : !1;
}
function yp(i, t) {
  if (t instanceof Ze) {
    var e = t.toFontString();
    return ae.measureFont(e), !0;
  }
  return !1;
}
function bp(i, t) {
  if (i instanceof zo) {
    t.indexOf(i.style) === -1 && t.push(i.style), t.indexOf(i) === -1 && t.push(i);
    var e = i._texture.baseTexture;
    return t.indexOf(e) === -1 && t.push(e), !0;
  }
  return !1;
}
function xp(i, t) {
  return i instanceof Ze ? (t.indexOf(i) === -1 && t.push(i), !0) : !1;
}
var Tp = (
  /** @class */
  function() {
    function i(t) {
      var e = this;
      this.limiter = new pp(z.UPLOADS_PER_FRAME), this.renderer = t, this.uploadHookHelper = null, this.queue = [], this.addHooks = [], this.uploadHooks = [], this.completes = [], this.ticking = !1, this.delayedTick = function() {
        e.queue && e.prepareItems();
      }, this.registerFindHook(bp), this.registerFindHook(xp), this.registerFindHook(vp), this.registerFindHook(_p), this.registerFindHook(mp), this.registerUploadHook(gp), this.registerUploadHook(yp);
    }
    return i.prototype.upload = function(t, e) {
      var r = this;
      return typeof t == "function" && (e = t, t = null), e && Bt("6.5.0", "BasePrepare.upload callback is deprecated, use the return Promise instead."), new Promise(function(n) {
        t && r.add(t);
        var s = function() {
          e?.(), n();
        };
        r.queue.length ? (r.completes.push(s), r.ticking || (r.ticking = !0, Nt.system.addOnce(r.tick, r, pe.UTILITY))) : s();
      });
    }, i.prototype.tick = function() {
      setTimeout(this.delayedTick, 0);
    }, i.prototype.prepareItems = function() {
      for (this.limiter.beginFrame(); this.queue.length && this.limiter.allowedToUpload(); ) {
        var t = this.queue[0], e = !1;
        if (t && !t._destroyed) {
          for (var r = 0, n = this.uploadHooks.length; r < n; r++)
            if (this.uploadHooks[r](this.uploadHookHelper, t)) {
              this.queue.shift(), e = !0;
              break;
            }
        }
        e || this.queue.shift();
      }
      if (this.queue.length)
        Nt.system.addOnce(this.tick, this, pe.UTILITY);
      else {
        this.ticking = !1;
        var s = this.completes.slice(0);
        this.completes.length = 0;
        for (var r = 0, n = s.length; r < n; r++)
          s[r]();
      }
    }, i.prototype.registerFindHook = function(t) {
      return t && this.addHooks.push(t), this;
    }, i.prototype.registerUploadHook = function(t) {
      return t && this.uploadHooks.push(t), this;
    }, i.prototype.add = function(t) {
      for (var e = 0, r = this.addHooks.length; e < r && !this.addHooks[e](t, this.queue); e++)
        ;
      if (t instanceof re)
        for (var e = t.children.length - 1; e >= 0; e--)
          this.add(t.children[e]);
      return this;
    }, i.prototype.destroy = function() {
      this.ticking && Nt.system.remove(this.tick, this), this.ticking = !1, this.addHooks = null, this.uploadHooks = null, this.renderer = null, this.completes = null, this.queue = null, this.limiter = null, this.uploadHookHelper = null;
    }, i;
  }()
);
function Yo(i, t) {
  return t instanceof ot ? (t._glTextures[i.CONTEXT_UID] || i.texture.bind(t), !0) : !1;
}
function Ep(i, t) {
  if (!(t instanceof bi))
    return !1;
  var e = t.geometry;
  t.finishPoly(), e.updateBatches();
  for (var r = e.batches, n = 0; n < r.length; n++) {
    var s = r[n].style.texture;
    s && Yo(i, s.baseTexture);
  }
  return e.batchable || i.geometry.bind(e, t._resolveDirectShader(i)), !0;
}
function wp(i, t) {
  return i instanceof bi ? (t.push(i), !0) : !1;
}
var Sp = (
  /** @class */
  function(i) {
    dp(t, i);
    function t(e) {
      var r = i.call(this, e) || this;
      return r.uploadHookHelper = r.renderer, r.registerFindHook(wp), r.registerUploadHook(Yo), r.registerUploadHook(Ep), r;
    }
    return t.extension = {
      name: "prepare",
      type: dt.RendererPlugin
    }, t;
  }(Tp)
);
/*!
 * @pixi/spritesheet - v6.5.10
 * Compiled Thu, 06 Jul 2023 15:25:11 UTC
 *
 * @pixi/spritesheet is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
var Ip = (
  /** @class */
  function() {
    function i(t, e, r) {
      r === void 0 && (r = null), this.linkedSheets = [], this._texture = t instanceof et ? t : null, this.baseTexture = t instanceof ot ? t : this._texture.baseTexture, this.textures = {}, this.animations = {}, this.data = e;
      var n = this.baseTexture.resource;
      this.resolution = this._updateResolution(r || (n ? n.url : null)), this._frames = this.data.frames, this._frameKeys = Object.keys(this._frames), this._batchIndex = 0, this._callback = null;
    }
    return i.prototype._updateResolution = function(t) {
      t === void 0 && (t = null);
      var e = this.data.meta.scale, r = li(t, null);
      return r === null && (r = e !== void 0 ? parseFloat(e) : 1), r !== 1 && this.baseTexture.setResolution(r), r;
    }, i.prototype.parse = function(t) {
      var e = this;
      return t && Bt("6.5.0", "Spritesheet.parse callback is deprecated, use the return Promise instead."), new Promise(function(r) {
        e._callback = function(n) {
          t?.(n), r(n);
        }, e._batchIndex = 0, e._frameKeys.length <= i.BATCH_SIZE ? (e._processFrames(0), e._processAnimations(), e._parseComplete()) : e._nextBatch();
      });
    }, i.prototype._processFrames = function(t) {
      for (var e = t, r = i.BATCH_SIZE; e - t < r && e < this._frameKeys.length; ) {
        var n = this._frameKeys[e], s = this._frames[n], a = s.frame;
        if (a) {
          var o = null, h = null, u = s.trimmed !== !1 && s.sourceSize ? s.sourceSize : s.frame, l = new ht(0, 0, Math.floor(u.w) / this.resolution, Math.floor(u.h) / this.resolution);
          s.rotated ? o = new ht(Math.floor(a.x) / this.resolution, Math.floor(a.y) / this.resolution, Math.floor(a.h) / this.resolution, Math.floor(a.w) / this.resolution) : o = new ht(Math.floor(a.x) / this.resolution, Math.floor(a.y) / this.resolution, Math.floor(a.w) / this.resolution, Math.floor(a.h) / this.resolution), s.trimmed !== !1 && s.spriteSourceSize && (h = new ht(Math.floor(s.spriteSourceSize.x) / this.resolution, Math.floor(s.spriteSourceSize.y) / this.resolution, Math.floor(a.w) / this.resolution, Math.floor(a.h) / this.resolution)), this.textures[n] = new et(this.baseTexture, o, l, h, s.rotated ? 2 : 0, s.anchor), et.addToCache(this.textures[n], n);
        }
        e++;
      }
    }, i.prototype._processAnimations = function() {
      var t = this.data.animations || {};
      for (var e in t) {
        this.animations[e] = [];
        for (var r = 0; r < t[e].length; r++) {
          var n = t[e][r];
          this.animations[e].push(this.textures[n]);
        }
      }
    }, i.prototype._parseComplete = function() {
      var t = this._callback;
      this._callback = null, this._batchIndex = 0, t.call(this, this.textures);
    }, i.prototype._nextBatch = function() {
      var t = this;
      this._processFrames(this._batchIndex * i.BATCH_SIZE), this._batchIndex++, setTimeout(function() {
        t._batchIndex * i.BATCH_SIZE < t._frameKeys.length ? t._nextBatch() : (t._processAnimations(), t._parseComplete());
      }, 0);
    }, i.prototype.destroy = function(t) {
      var e;
      t === void 0 && (t = !1);
      for (var r in this.textures)
        this.textures[r].destroy();
      this._frames = null, this._frameKeys = null, this.data = null, this.textures = null, t && ((e = this._texture) === null || e === void 0 || e.destroy(), this.baseTexture.destroy()), this._texture = null, this.baseTexture = null, this.linkedSheets = [];
    }, i.BATCH_SIZE = 1e3, i;
  }()
), Pp = (
  /** @class */
  function() {
    function i() {
    }
    return i.use = function(t, e) {
      var r, n, s = this, a = t.name + "_image";
      if (!t.data || t.type !== wt.TYPE.JSON || !t.data.frames || s.resources[a]) {
        e();
        return;
      }
      var o = (n = (r = t.data) === null || r === void 0 ? void 0 : r.meta) === null || n === void 0 ? void 0 : n.related_multi_packs;
      if (Array.isArray(o))
        for (var h = function(p) {
          if (typeof p != "string")
            return "continue";
          var v = p.replace(".json", ""), _ = ze.resolve(t.url.replace(s.baseUrl, ""), p);
          if (s.resources[v] || Object.values(s.resources).some(function(I) {
            return ze.format(ze.parse(I.url)) === _;
          }))
            return "continue";
          var g = {
            crossOrigin: t.crossOrigin,
            loadType: wt.LOAD_TYPE.XHR,
            xhrType: wt.XHR_RESPONSE_TYPE.JSON,
            parentResource: t,
            metadata: t.metadata
          };
          s.add(v, _, g);
        }, u = 0, l = o; u < l.length; u++) {
          var f = l[u];
          h(f);
        }
      var c = {
        crossOrigin: t.crossOrigin,
        metadata: t.metadata.imageMetadata,
        parentResource: t
      }, d = i.getResourcePath(t, s.baseUrl);
      s.add(a, d, c, function(v) {
        if (v.error) {
          e(v.error);
          return;
        }
        var _ = new Ip(v.texture, t.data, t.url);
        _.parse().then(function() {
          t.spritesheet = _, t.textures = _.textures, e();
        });
      });
    }, i.getResourcePath = function(t, e) {
      return t.isDataUrl ? t.data.meta.image : ze.resolve(t.url.replace(e, ""), t.data.meta.image);
    }, i.extension = dt.Loader, i;
  }()
);
/*!
 * @pixi/sprite-tiling - v6.5.10
 * Compiled Thu, 06 Jul 2023 15:25:11 UTC
 *
 * @pixi/sprite-tiling is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var An = function(i, t) {
  return An = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, r) {
    e.__proto__ = r;
  } || function(e, r) {
    for (var n in r)
      r.hasOwnProperty(n) && (e[n] = r[n]);
  }, An(i, t);
};
function Wo(i, t) {
  An(i, t);
  function e() {
    this.constructor = i;
  }
  i.prototype = t === null ? Object.create(t) : (e.prototype = t.prototype, new e());
}
var ur = new gt();
(function(i) {
  Wo(t, i);
  function t(e, r, n) {
    r === void 0 && (r = 100), n === void 0 && (n = 100);
    var s = i.call(this, e) || this;
    return s.tileTransform = new ao(), s._width = r, s._height = n, s.uvMatrix = s.texture.uvMatrix || new Ii(e), s.pluginName = "tilingSprite", s.uvRespectAnchor = !1, s;
  }
  return Object.defineProperty(t.prototype, "clampMargin", {
    /**
     * Changes frame clamping in corresponding textureTransform, shortcut
     * Change to -0.5 to add a pixel to the edge, recommended for transparent trimmed textures in atlas
     * @default 0.5
     * @member {number}
     */
    get: function() {
      return this.uvMatrix.clampMargin;
    },
    set: function(e) {
      this.uvMatrix.clampMargin = e, this.uvMatrix.update(!0);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "tileScale", {
    /** The scaling of the image that is being tiled. */
    get: function() {
      return this.tileTransform.scale;
    },
    set: function(e) {
      this.tileTransform.scale.copyFrom(e);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "tilePosition", {
    /** The offset of the image that is being tiled. */
    get: function() {
      return this.tileTransform.position;
    },
    set: function(e) {
      this.tileTransform.position.copyFrom(e);
    },
    enumerable: !1,
    configurable: !0
  }), t.prototype._onTextureUpdate = function() {
    this.uvMatrix && (this.uvMatrix.texture = this._texture), this._cachedTint = 16777215;
  }, t.prototype._render = function(e) {
    var r = this._texture;
    !r || !r.valid || (this.tileTransform.updateLocalTransform(), this.uvMatrix.update(), e.batch.setObjectRenderer(e.plugins[this.pluginName]), e.plugins[this.pluginName].render(this));
  }, t.prototype._calculateBounds = function() {
    var e = this._width * -this._anchor._x, r = this._height * -this._anchor._y, n = this._width * (1 - this._anchor._x), s = this._height * (1 - this._anchor._y);
    this._bounds.addFrame(this.transform, e, r, n, s);
  }, t.prototype.getLocalBounds = function(e) {
    return this.children.length === 0 ? (this._bounds.minX = this._width * -this._anchor._x, this._bounds.minY = this._height * -this._anchor._y, this._bounds.maxX = this._width * (1 - this._anchor._x), this._bounds.maxY = this._height * (1 - this._anchor._y), e || (this._localBoundsRect || (this._localBoundsRect = new ht()), e = this._localBoundsRect), this._bounds.getRectangle(e)) : i.prototype.getLocalBounds.call(this, e);
  }, t.prototype.containsPoint = function(e) {
    this.worldTransform.applyInverse(e, ur);
    var r = this._width, n = this._height, s = -r * this.anchor._x;
    if (ur.x >= s && ur.x < s + r) {
      var a = -n * this.anchor._y;
      if (ur.y >= a && ur.y < a + n)
        return !0;
    }
    return !1;
  }, t.prototype.destroy = function(e) {
    i.prototype.destroy.call(this, e), this.tileTransform = null, this.uvMatrix = null;
  }, t.from = function(e, r) {
    var n = e instanceof et ? e : et.from(e, r);
    return new t(n, r.width, r.height);
  }, Object.defineProperty(t.prototype, "width", {
    /** The width of the sprite, setting this will actually modify the scale to achieve the value set. */
    get: function() {
      return this._width;
    },
    set: function(e) {
      this._width = e;
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "height", {
    /** The height of the TilingSprite, setting this will actually modify the scale to achieve the value set. */
    get: function() {
      return this._height;
    },
    set: function(e) {
      this._height = e;
    },
    enumerable: !1,
    configurable: !0
  }), t;
})(xe);
var Mp = `#version 100
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
`, La = `#version 100
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
`, Cp = `#version 100
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
`, Ap = `#version 300 es
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
`, Rp = `#version 300 es
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
`, $r = new At(), Op = (
  /** @class */
  function(i) {
    Wo(t, i);
    function t(e) {
      var r = i.call(this, e) || this;
      return e.runners.contextChange.add(r), r.quad = new as(), r.state = we.for2d(), r;
    }
    return t.prototype.contextChange = function() {
      var e = this.renderer, r = { globals: e.globalUniforms };
      this.simpleShader = ce.from(La, Mp, r), this.shader = e.context.webGLVersion > 1 ? ce.from(Ap, Rp, r) : ce.from(La, Cp, r);
    }, t.prototype.render = function(e) {
      var r = this.renderer, n = this.quad, s = n.vertices;
      s[0] = s[6] = e._width * -e.anchor.x, s[1] = s[3] = e._height * -e.anchor.y, s[2] = s[4] = e._width * (1 - e.anchor.x), s[5] = s[7] = e._height * (1 - e.anchor.y);
      var a = e.uvRespectAnchor ? e.anchor.x : 0, o = e.uvRespectAnchor ? e.anchor.y : 0;
      s = n.uvs, s[0] = s[6] = -a, s[1] = s[3] = -o, s[2] = s[4] = 1 - a, s[5] = s[7] = 1 - o, n.invalidate();
      var h = e._texture, u = h.baseTexture, l = u.alphaMode > 0, f = e.tileTransform.localTransform, c = e.uvMatrix, d = u.isPowerOfTwo && h.frame.width === u.width && h.frame.height === u.height;
      d && (u._glTextures[r.CONTEXT_UID] ? d = u.wrapMode !== Qt.CLAMP : u.wrapMode === Qt.CLAMP && (u.wrapMode = Qt.REPEAT));
      var p = d ? this.simpleShader : this.shader, v = h.width, _ = h.height, g = e._width, I = e._height;
      $r.set(f.a * v / g, f.b * v / I, f.c * _ / g, f.d * _ / I, f.tx / g, f.ty / I), $r.invert(), d ? $r.prepend(c.mapCoord) : (p.uniforms.uMapCoord = c.mapCoord.toArray(!0), p.uniforms.uClampFrame = c.uClampFrame, p.uniforms.uClampOffset = c.uClampOffset), p.uniforms.uTransform = $r.toArray(!0), p.uniforms.uColor = io(e.tint, e.worldAlpha, p.uniforms.uColor, l), p.uniforms.translationMatrix = e.transform.worldTransform.toArray(!0), p.uniforms.uSampler = h, r.shader.bind(p), r.geometry.bind(n), this.state.blendMode = ro(e.blendMode, l), r.state.set(this.state), r.geometry.draw(this.renderer.gl.TRIANGLES, 6, 0);
    }, t.extension = {
      name: "tilingSprite",
      type: dt.RendererPlugin
    }, t;
  }(Er)
);
/*!
 * @pixi/mesh - v6.5.10
 * Compiled Thu, 06 Jul 2023 15:25:11 UTC
 *
 * @pixi/mesh is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var Rn = function(i, t) {
  return Rn = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, r) {
    e.__proto__ = r;
  } || function(e, r) {
    for (var n in r)
      r.hasOwnProperty(n) && (e[n] = r[n]);
  }, Rn(i, t);
};
function Ps(i, t) {
  Rn(i, t);
  function e() {
    this.constructor = i;
  }
  i.prototype = t === null ? Object.create(t) : (e.prototype = t.prototype, new e());
}
var Np = (
  /** @class */
  function() {
    function i(t, e) {
      this.uvBuffer = t, this.uvMatrix = e, this.data = null, this._bufferUpdateId = -1, this._textureUpdateId = -1, this._updateID = 0;
    }
    return i.prototype.update = function(t) {
      if (!(!t && this._bufferUpdateId === this.uvBuffer._updateID && this._textureUpdateId === this.uvMatrix._updateID)) {
        this._bufferUpdateId = this.uvBuffer._updateID, this._textureUpdateId = this.uvMatrix._updateID;
        var e = this.uvBuffer.data;
        (!this.data || this.data.length !== e.length) && (this.data = new Float32Array(e.length)), this.uvMatrix.multiplyUvs(e, this.data), this._updateID++;
      }
    }, i;
  }()
), on = new gt(), Ba = new Qr(), br = (
  /** @class */
  function(i) {
    Ps(t, i);
    function t(e, r, n, s) {
      s === void 0 && (s = $t.TRIANGLES);
      var a = i.call(this) || this;
      return a.geometry = e, a.shader = r, a.state = n || we.for2d(), a.drawMode = s, a.start = 0, a.size = 0, a.uvs = null, a.indices = null, a.vertexData = new Float32Array(1), a.vertexDirty = -1, a._transformID = -1, a._roundPixels = z.ROUND_PIXELS, a.batchUvs = null, a;
    }
    return Object.defineProperty(t.prototype, "geometry", {
      /**
       * Includes vertex positions, face indices, normals, colors, UVs, and
       * custom attributes within buffers, reducing the cost of passing all
       * this data to the GPU. Can be shared between multiple Mesh objects.
       */
      get: function() {
        return this._geometry;
      },
      set: function(e) {
        this._geometry !== e && (this._geometry && (this._geometry.refCount--, this._geometry.refCount === 0 && this._geometry.dispose()), this._geometry = e, this._geometry && this._geometry.refCount++, this.vertexDirty = -1);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "uvBuffer", {
      /**
       * To change mesh uv's, change its uvBuffer data and increment its _updateID.
       * @readonly
       */
      get: function() {
        return this.geometry.buffers[1];
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "verticesBuffer", {
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
    }), Object.defineProperty(t.prototype, "material", {
      get: function() {
        return this.shader;
      },
      /** Alias for {@link PIXI.Mesh#shader}. */
      set: function(e) {
        this.shader = e;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "blendMode", {
      get: function() {
        return this.state.blendMode;
      },
      /**
       * The blend mode to be applied to the Mesh. Apply a value of
       * `PIXI.BLEND_MODES.NORMAL` to reset the blend mode.
       * @default PIXI.BLEND_MODES.NORMAL;
       */
      set: function(e) {
        this.state.blendMode = e;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "roundPixels", {
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
      set: function(e) {
        this._roundPixels !== e && (this._transformID = -1), this._roundPixels = e;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "tint", {
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
      set: function(e) {
        this.shader.tint = e;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "texture", {
      /** The texture that the Mesh uses. Null for non-MeshMaterial shaders */
      get: function() {
        return "texture" in this.shader ? this.shader.texture : null;
      },
      set: function(e) {
        this.shader.texture = e;
      },
      enumerable: !1,
      configurable: !0
    }), t.prototype._render = function(e) {
      var r = this.geometry.buffers[0].data, n = this.shader;
      n.batchable && this.drawMode === $t.TRIANGLES && r.length < t.BATCHABLE_SIZE * 2 ? this._renderToBatch(e) : this._renderDefault(e);
    }, t.prototype._renderDefault = function(e) {
      var r = this.shader;
      r.alpha = this.worldAlpha, r.update && r.update(), e.batch.flush(), r.uniforms.translationMatrix = this.transform.worldTransform.toArray(!0), e.shader.bind(r), e.state.set(this.state), e.geometry.bind(this.geometry, r), e.geometry.draw(this.drawMode, this.size, this.start, this.geometry.instanceCount);
    }, t.prototype._renderToBatch = function(e) {
      var r = this.geometry, n = this.shader;
      n.uvMatrix && (n.uvMatrix.update(), this.calculateUvs()), this.calculateVertices(), this.indices = r.indexBuffer.data, this._tintRGB = n._tintRGB, this._texture = n.texture;
      var s = this.material.pluginName;
      e.batch.setObjectRenderer(e.plugins[s]), e.plugins[s].render(this);
    }, t.prototype.calculateVertices = function() {
      var e = this.geometry, r = e.buffers[0], n = r.data, s = r._updateID;
      if (!(s === this.vertexDirty && this._transformID === this.transform._worldID)) {
        this._transformID = this.transform._worldID, this.vertexData.length !== n.length && (this.vertexData = new Float32Array(n.length));
        for (var a = this.transform.worldTransform, o = a.a, h = a.b, u = a.c, l = a.d, f = a.tx, c = a.ty, d = this.vertexData, p = 0; p < d.length / 2; p++) {
          var v = n[p * 2], _ = n[p * 2 + 1];
          d[p * 2] = o * v + u * _ + f, d[p * 2 + 1] = h * v + l * _ + c;
        }
        if (this._roundPixels)
          for (var g = z.RESOLUTION, p = 0; p < d.length; ++p)
            d[p] = Math.round((d[p] * g | 0) / g);
        this.vertexDirty = s;
      }
    }, t.prototype.calculateUvs = function() {
      var e = this.geometry.buffers[1], r = this.shader;
      r.uvMatrix.isSimple ? this.uvs = e.data : (this.batchUvs || (this.batchUvs = new Np(e, r.uvMatrix)), this.batchUvs.update(), this.uvs = this.batchUvs.data);
    }, t.prototype._calculateBounds = function() {
      this.calculateVertices(), this._bounds.addVertexData(this.vertexData, 0, this.vertexData.length);
    }, t.prototype.containsPoint = function(e) {
      if (!this.getBounds().contains(e.x, e.y))
        return !1;
      this.worldTransform.applyInverse(e, on);
      for (var r = this.geometry.getBuffer("aVertexPosition").data, n = Ba.points, s = this.geometry.getIndex().data, a = s.length, o = this.drawMode === 4 ? 3 : 1, h = 0; h + 2 < a; h += o) {
        var u = s[h] * 2, l = s[h + 1] * 2, f = s[h + 2] * 2;
        if (n[0] = r[u], n[1] = r[u + 1], n[2] = r[l], n[3] = r[l + 1], n[4] = r[f], n[5] = r[f + 1], Ba.contains(on.x, on.y))
          return !0;
      }
      return !1;
    }, t.prototype.destroy = function(e) {
      i.prototype.destroy.call(this, e), this._cachedTexture && (this._cachedTexture.destroy(), this._cachedTexture = null), this.geometry = null, this.shader = null, this.state = null, this.uvs = null, this.indices = null, this.vertexData = null;
    }, t.BATCHABLE_SIZE = 100, t;
  }(re)
), Dp = `varying vec2 vTextureCoord;
uniform vec4 uColor;

uniform sampler2D uSampler;

void main(void)
{
    gl_FragColor = texture2D(uSampler, vTextureCoord) * uColor;
}
`, Lp = `attribute vec2 aVertexPosition;
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
`, xr = (
  /** @class */
  function(i) {
    Ps(t, i);
    function t(e, r) {
      var n = this, s = {
        uSampler: e,
        alpha: 1,
        uTextureMatrix: At.IDENTITY,
        uColor: new Float32Array([1, 1, 1, 1])
      };
      return r = Object.assign({
        tint: 16777215,
        alpha: 1,
        pluginName: "batch"
      }, r), r.uniforms && Object.assign(s, r.uniforms), n = i.call(this, r.program || Ke.from(Lp, Dp), s) || this, n._colorDirty = !1, n.uvMatrix = new Ii(e), n.batchable = r.program === void 0, n.pluginName = r.pluginName, n.tint = r.tint, n.alpha = r.alpha, n;
    }
    return Object.defineProperty(t.prototype, "texture", {
      /** Reference to the texture being rendered. */
      get: function() {
        return this.uniforms.uSampler;
      },
      set: function(e) {
        this.uniforms.uSampler !== e && (!this.uniforms.uSampler.baseTexture.alphaMode != !e.baseTexture.alphaMode && (this._colorDirty = !0), this.uniforms.uSampler = e, this.uvMatrix.texture = e);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "alpha", {
      get: function() {
        return this._alpha;
      },
      /**
       * This gets automatically set by the object using this.
       * @default 1
       */
      set: function(e) {
        e !== this._alpha && (this._alpha = e, this._colorDirty = !0);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "tint", {
      get: function() {
        return this._tint;
      },
      /**
       * Multiply tint for the material.
       * @default 0xFFFFFF
       */
      set: function(e) {
        e !== this._tint && (this._tint = e, this._tintRGB = (e >> 16) + (e & 65280) + ((e & 255) << 16), this._colorDirty = !0);
      },
      enumerable: !1,
      configurable: !0
    }), t.prototype.update = function() {
      if (this._colorDirty) {
        this._colorDirty = !1;
        var e = this.texture.baseTexture;
        io(this._tint, this._alpha, this.uniforms.uColor, e.alphaMode);
      }
      this.uvMatrix.update() && (this.uniforms.uTextureMatrix = this.uvMatrix.mapCoord);
    }, t;
  }(ce)
), Pi = (
  /** @class */
  function(i) {
    Ps(t, i);
    function t(e, r, n) {
      var s = i.call(this) || this, a = new Mt(e), o = new Mt(r, !0), h = new Mt(n, !0, !0);
      return s.addAttribute("aVertexPosition", a, 2, !1, J.FLOAT).addAttribute("aTextureCoord", o, 2, !1, J.FLOAT).addIndex(h), s._updateId = -1, s;
    }
    return Object.defineProperty(t.prototype, "vertexDirtyId", {
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
    }), t;
  }(Je)
);
/*!
 * @pixi/text-bitmap - v6.5.10
 * Compiled Thu, 06 Jul 2023 15:25:11 UTC
 *
 * @pixi/text-bitmap is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var On = function(i, t) {
  return On = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, r) {
    e.__proto__ = r;
  } || function(e, r) {
    for (var n in r)
      r.hasOwnProperty(n) && (e[n] = r[n]);
  }, On(i, t);
};
function Bp(i, t) {
  On(i, t);
  function e() {
    this.constructor = i;
  }
  i.prototype = t === null ? Object.create(t) : (e.prototype = t.prototype, new e());
}
var xi = (
  /** @class */
  /* @__PURE__ */ function() {
    function i() {
      this.info = [], this.common = [], this.page = [], this.char = [], this.kerning = [], this.distanceField = [];
    }
    return i;
  }()
), Fp = (
  /** @class */
  function() {
    function i() {
    }
    return i.test = function(t) {
      return typeof t == "string" && t.indexOf("info face=") === 0;
    }, i.parse = function(t) {
      var e = t.match(/^[a-z]+\s+.+$/gm), r = {
        info: [],
        common: [],
        page: [],
        char: [],
        chars: [],
        kerning: [],
        kernings: [],
        distanceField: []
      };
      for (var n in e) {
        var s = e[n].match(/^[a-z]+/gm)[0], a = e[n].match(/[a-zA-Z]+=([^\s"']+|"([^"]*)")/gm), o = {};
        for (var h in a) {
          var u = a[h].split("="), l = u[0], f = u[1].replace(/"/gm, ""), c = parseFloat(f), d = isNaN(c) ? f : c;
          o[l] = d;
        }
        r[s].push(o);
      }
      var p = new xi();
      return r.info.forEach(function(v) {
        return p.info.push({
          face: v.face,
          size: parseInt(v.size, 10)
        });
      }), r.common.forEach(function(v) {
        return p.common.push({
          lineHeight: parseInt(v.lineHeight, 10)
        });
      }), r.page.forEach(function(v) {
        return p.page.push({
          id: parseInt(v.id, 10),
          file: v.file
        });
      }), r.char.forEach(function(v) {
        return p.char.push({
          id: parseInt(v.id, 10),
          page: parseInt(v.page, 10),
          x: parseInt(v.x, 10),
          y: parseInt(v.y, 10),
          width: parseInt(v.width, 10),
          height: parseInt(v.height, 10),
          xoffset: parseInt(v.xoffset, 10),
          yoffset: parseInt(v.yoffset, 10),
          xadvance: parseInt(v.xadvance, 10)
        });
      }), r.kerning.forEach(function(v) {
        return p.kerning.push({
          first: parseInt(v.first, 10),
          second: parseInt(v.second, 10),
          amount: parseInt(v.amount, 10)
        });
      }), r.distanceField.forEach(function(v) {
        return p.distanceField.push({
          distanceRange: parseInt(v.distanceRange, 10),
          fieldType: v.fieldType
        });
      }), p;
    }, i;
  }()
), Nn = (
  /** @class */
  function() {
    function i() {
    }
    return i.test = function(t) {
      return t instanceof XMLDocument && t.getElementsByTagName("page").length && t.getElementsByTagName("info")[0].getAttribute("face") !== null;
    }, i.parse = function(t) {
      for (var e = new xi(), r = t.getElementsByTagName("info"), n = t.getElementsByTagName("common"), s = t.getElementsByTagName("page"), a = t.getElementsByTagName("char"), o = t.getElementsByTagName("kerning"), h = t.getElementsByTagName("distanceField"), u = 0; u < r.length; u++)
        e.info.push({
          face: r[u].getAttribute("face"),
          size: parseInt(r[u].getAttribute("size"), 10)
        });
      for (var u = 0; u < n.length; u++)
        e.common.push({
          lineHeight: parseInt(n[u].getAttribute("lineHeight"), 10)
        });
      for (var u = 0; u < s.length; u++)
        e.page.push({
          id: parseInt(s[u].getAttribute("id"), 10) || 0,
          file: s[u].getAttribute("file")
        });
      for (var u = 0; u < a.length; u++) {
        var l = a[u];
        e.char.push({
          id: parseInt(l.getAttribute("id"), 10),
          page: parseInt(l.getAttribute("page"), 10) || 0,
          x: parseInt(l.getAttribute("x"), 10),
          y: parseInt(l.getAttribute("y"), 10),
          width: parseInt(l.getAttribute("width"), 10),
          height: parseInt(l.getAttribute("height"), 10),
          xoffset: parseInt(l.getAttribute("xoffset"), 10),
          yoffset: parseInt(l.getAttribute("yoffset"), 10),
          xadvance: parseInt(l.getAttribute("xadvance"), 10)
        });
      }
      for (var u = 0; u < o.length; u++)
        e.kerning.push({
          first: parseInt(o[u].getAttribute("first"), 10),
          second: parseInt(o[u].getAttribute("second"), 10),
          amount: parseInt(o[u].getAttribute("amount"), 10)
        });
      for (var u = 0; u < h.length; u++)
        e.distanceField.push({
          fieldType: h[u].getAttribute("fieldType"),
          distanceRange: parseInt(h[u].getAttribute("distanceRange"), 10)
        });
      return e;
    }, i;
  }()
), kp = (
  /** @class */
  function() {
    function i() {
    }
    return i.test = function(t) {
      if (typeof t == "string" && t.indexOf("<font>") > -1) {
        var e = new globalThis.DOMParser().parseFromString(t, "text/xml");
        return Nn.test(e);
      }
      return !1;
    }, i.parse = function(t) {
      var e = new globalThis.DOMParser().parseFromString(t, "text/xml");
      return Nn.parse(e);
    }, i;
  }()
), hn = [
  Fp,
  Nn,
  kp
];
function Vo(i) {
  for (var t = 0; t < hn.length; t++)
    if (hn[t].test(i))
      return hn[t];
  return null;
}
function Up(i, t, e, r, n, s) {
  var a = e.fill;
  if (Array.isArray(a)) {
    if (a.length === 1)
      return a[0];
  } else return a;
  var o, h = e.dropShadow ? e.dropShadowDistance : 0, u = e.padding || 0, l = i.width / r - h - u * 2, f = i.height / r - h - u * 2, c = a.slice(), d = e.fillGradientStops.slice();
  if (!d.length)
    for (var p = c.length + 1, v = 1; v < p; ++v)
      d.push(v / p);
  if (c.unshift(a[0]), d.unshift(0), c.push(a[a.length - 1]), d.push(1), e.fillGradientType === yr.LINEAR_VERTICAL) {
    o = t.createLinearGradient(l / 2, u, l / 2, f + u);
    for (var _ = 0, g = s.fontProperties.fontSize + e.strokeThickness, I = g / f, v = 0; v < n.length; v++)
      for (var E = s.lineHeight * v, B = 0; B < c.length; B++) {
        var P = 0;
        typeof d[B] == "number" ? P = d[B] : P = B / c.length;
        var A = E / f + P * I, R = Math.max(_, A);
        R = Math.min(R, 1), o.addColorStop(R, c[B]), _ = R;
      }
  } else {
    o = t.createLinearGradient(u, f / 2, l + u, f / 2);
    for (var T = c.length + 1, C = 1, v = 0; v < c.length; v++) {
      var O = void 0;
      typeof d[v] == "number" ? O = d[v] : O = C / T, o.addColorStop(O, c[v]), C++;
    }
  }
  return o;
}
function Gp(i, t, e, r, n, s, a) {
  var o = e.text, h = e.fontProperties;
  t.translate(r, n), t.scale(s, s);
  var u = a.strokeThickness / 2, l = -(a.strokeThickness / 2);
  if (t.font = a.toFontString(), t.lineWidth = a.strokeThickness, t.textBaseline = a.textBaseline, t.lineJoin = a.lineJoin, t.miterLimit = a.miterLimit, t.fillStyle = Up(i, t, a, s, [o], e), t.strokeStyle = a.stroke, a.dropShadow) {
    var f = a.dropShadowColor, c = $e(typeof f == "number" ? f : to(f)), d = a.dropShadowBlur * s, p = a.dropShadowDistance * s;
    t.shadowColor = "rgba(" + c[0] * 255 + "," + c[1] * 255 + "," + c[2] * 255 + "," + a.dropShadowAlpha + ")", t.shadowBlur = d, t.shadowOffsetX = Math.cos(a.dropShadowAngle) * p, t.shadowOffsetY = Math.sin(a.dropShadowAngle) * p;
  } else
    t.shadowColor = "black", t.shadowBlur = 0, t.shadowOffsetX = 0, t.shadowOffsetY = 0;
  a.stroke && a.strokeThickness && t.strokeText(o, u, l + e.lineHeight - h.descent), a.fill && t.fillText(o, u, l + e.lineHeight - h.descent), t.setTransform(1, 0, 0, 1, 0, 0), t.fillStyle = "rgba(0, 0, 0, 0)";
}
function $o(i) {
  return Array.from ? Array.from(i) : i.split("");
}
function jp(i) {
  typeof i == "string" && (i = [i]);
  for (var t = [], e = 0, r = i.length; e < r; e++) {
    var n = i[e];
    if (Array.isArray(n)) {
      if (n.length !== 2)
        throw new Error("[BitmapFont]: Invalid character range length, expecting 2 got " + n.length + ".");
      var s = n[0].charCodeAt(0), a = n[1].charCodeAt(0);
      if (a < s)
        throw new Error("[BitmapFont]: Invalid character range.");
      for (var o = s, h = a; o <= h; o++)
        t.push(String.fromCharCode(o));
    } else
      t.push.apply(t, $o(n));
  }
  if (t.length === 0)
    throw new Error("[BitmapFont]: Empty set when resolving characters.");
  return t;
}
function ei(i) {
  return i.codePointAt ? i.codePointAt(0) : i.charCodeAt(0);
}
var ge = (
  /** @class */
  function() {
    function i(t, e, r) {
      var n, s, a = t.info[0], o = t.common[0], h = t.page[0], u = t.distanceField[0], l = li(h.file), f = {};
      this._ownsTextures = r, this.font = a.face, this.size = a.size, this.lineHeight = o.lineHeight / l, this.chars = {}, this.pageTextures = f;
      for (var c = 0; c < t.page.length; c++) {
        var d = t.page[c], p = d.id, v = d.file;
        f[p] = e instanceof Array ? e[c] : e[v], u?.fieldType && u.fieldType !== "none" && (f[p].baseTexture.alphaMode = qt.NO_PREMULTIPLIED_ALPHA, f[p].baseTexture.mipmap = Zt.OFF);
      }
      for (var c = 0; c < t.char.length; c++) {
        var _ = t.char[c], p = _.id, g = _.page, I = t.char[c], E = I.x, B = I.y, P = I.width, A = I.height, R = I.xoffset, T = I.yoffset, C = I.xadvance;
        E /= l, B /= l, P /= l, A /= l, R /= l, T /= l, C /= l;
        var O = new ht(E + f[g].frame.x / l, B + f[g].frame.y / l, P, A);
        this.chars[p] = {
          xOffset: R,
          yOffset: T,
          xAdvance: C,
          kerning: {},
          texture: new et(f[g].baseTexture, O),
          page: g
        };
      }
      for (var c = 0; c < t.kerning.length; c++) {
        var U = t.kerning[c], K = U.first, nt = U.second, ft = U.amount;
        K /= l, nt /= l, ft /= l, this.chars[nt] && (this.chars[nt].kerning[K] = ft);
      }
      this.distanceFieldRange = u?.distanceRange, this.distanceFieldType = (s = (n = u?.fieldType) === null || n === void 0 ? void 0 : n.toLowerCase()) !== null && s !== void 0 ? s : "none";
    }
    return i.prototype.destroy = function() {
      for (var t in this.chars)
        this.chars[t].texture.destroy(), this.chars[t].texture = null;
      for (var t in this.pageTextures)
        this._ownsTextures && this.pageTextures[t].destroy(!0), this.pageTextures[t] = null;
      this.chars = null, this.pageTextures = null;
    }, i.install = function(t, e, r) {
      var n;
      if (t instanceof xi)
        n = t;
      else {
        var s = Vo(t);
        if (!s)
          throw new Error("Unrecognized data format for font.");
        n = s.parse(t);
      }
      e instanceof et && (e = [e]);
      var a = new i(n, e, r);
      return i.available[a.font] = a, a;
    }, i.uninstall = function(t) {
      var e = i.available[t];
      if (!e)
        throw new Error("No font found named '" + t + "'");
      e.destroy(), delete i.available[t];
    }, i.from = function(t, e, r) {
      if (!t)
        throw new Error("[BitmapFont] Property `name` is required.");
      var n = Object.assign({}, i.defaultOptions, r), s = n.chars, a = n.padding, o = n.resolution, h = n.textureWidth, u = n.textureHeight, l = jp(s), f = e instanceof Ze ? e : new Ze(e), c = h, d = new xi();
      d.info[0] = {
        face: f.fontFamily,
        size: f.fontSize
      }, d.common[0] = {
        lineHeight: f.fontSize
      };
      for (var p = 0, v = 0, _, g, I, E = 0, B = [], P = 0; P < l.length; P++) {
        _ || (_ = z.ADAPTER.createCanvas(), _.width = h, _.height = u, g = _.getContext("2d"), I = new ot(_, { resolution: o }), B.push(new et(I)), d.page.push({
          id: B.length - 1,
          file: ""
        }));
        var A = l[P], R = ae.measureText(A, f, !1, _), T = R.width, C = Math.ceil(R.height), O = Math.ceil((f.fontStyle === "italic" ? 2 : 1) * T);
        if (v >= u - C * o) {
          if (v === 0)
            throw new Error("[BitmapFont] textureHeight " + u + "px is too small " + ("(fontFamily: '" + f.fontFamily + "', fontSize: " + f.fontSize + "px, char: '" + A + "')"));
          --P, _ = null, g = null, I = null, v = 0, p = 0, E = 0;
          continue;
        }
        if (E = Math.max(C + R.fontProperties.descent, E), O * o + p >= c) {
          if (p === 0)
            throw new Error("[BitmapFont] textureWidth " + h + "px is too small " + ("(fontFamily: '" + f.fontFamily + "', fontSize: " + f.fontSize + "px, char: '" + A + "')"));
          --P, v += E * o, v = Math.ceil(v), p = 0, E = 0;
          continue;
        }
        Gp(_, g, R, p, v, o, f);
        var U = ei(R.text);
        d.char.push({
          id: U,
          page: B.length - 1,
          x: p / o,
          y: v / o,
          width: O,
          height: C,
          xoffset: 0,
          yoffset: 0,
          xadvance: Math.ceil(T - (f.dropShadow ? f.dropShadowDistance : 0) - (f.stroke ? f.strokeThickness : 0))
        }), p += (O + 2 * a) * o, p = Math.ceil(p);
      }
      if (!r?.skipKerning)
        for (var P = 0, K = l.length; P < K; P++)
          for (var nt = l[P], ft = 0; ft < K; ft++) {
            var W = l[ft], m = g.measureText(nt).width, b = g.measureText(W).width, y = g.measureText(nt + W).width, S = y - (m + b);
            S && d.kerning.push({
              first: ei(nt),
              second: ei(W),
              amount: S
            });
          }
      var M = new i(d, B, !0);
      return i.available[t] !== void 0 && i.uninstall(t), i.available[t] = M, M;
    }, i.ALPHA = [["a", "z"], ["A", "Z"], " "], i.NUMERIC = [["0", "9"]], i.ALPHANUMERIC = [["a", "z"], ["A", "Z"], ["0", "9"], " "], i.ASCII = [[" ", "~"]], i.defaultOptions = {
      resolution: 1,
      textureWidth: 512,
      textureHeight: 512,
      padding: 4,
      chars: i.ALPHANUMERIC
    }, i.available = {}, i;
  }()
), Hp = `// Pixi texture info\r
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
`, Xp = `// Mesh material default fragment\r
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
`, Fa = [], ka = [], Ua = [];
(function(i) {
  Bp(t, i);
  function t(e, r) {
    r === void 0 && (r = {});
    var n = i.call(this) || this;
    n._tint = 16777215;
    var s = Object.assign({}, t.styleDefaults, r), a = s.align, o = s.tint, h = s.maxWidth, u = s.letterSpacing, l = s.fontName, f = s.fontSize;
    if (!ge.available[l])
      throw new Error('Missing BitmapFont "' + l + '"');
    return n._activePagesMeshData = [], n._textWidth = 0, n._textHeight = 0, n._align = a, n._tint = o, n._font = void 0, n._fontName = l, n._fontSize = f, n.text = e, n._maxWidth = h, n._maxLineHeight = 0, n._letterSpacing = u, n._anchor = new We(function() {
      n.dirty = !0;
    }, n, 0, 0), n._roundPixels = z.ROUND_PIXELS, n.dirty = !0, n._resolution = z.RESOLUTION, n._autoResolution = !0, n._textureCache = {}, n;
  }
  return t.prototype.updateText = function() {
    for (var e, r = ge.available[this._fontName], n = this.fontSize, s = n / r.size, a = new gt(), o = [], h = [], u = [], l = this._text.replace(/(?:\r\n|\r)/g, `
`) || " ", f = $o(l), c = this._maxWidth * r.size / n, d = r.distanceFieldType === "none" ? Fa : ka, p = null, v = 0, _ = 0, g = 0, I = -1, E = 0, B = 0, P = 0, A = 0, R = 0; R < f.length; R++) {
      var T = f[R], C = ei(T);
      if (/(?:\s)/.test(T) && (I = R, E = v, A++), T === "\r" || T === `
`) {
        h.push(v), u.push(-1), _ = Math.max(_, v), ++g, ++B, a.x = 0, a.y += r.lineHeight, p = null, A = 0;
        continue;
      }
      var O = r.chars[C];
      if (O) {
        p && O.kerning[p] && (a.x += O.kerning[p]);
        var U = Ua.pop() || {
          texture: et.EMPTY,
          line: 0,
          charCode: 0,
          prevSpaces: 0,
          position: new gt()
        };
        U.texture = O.texture, U.line = g, U.charCode = C, U.position.x = a.x + O.xOffset + this._letterSpacing / 2, U.position.y = a.y + O.yOffset, U.prevSpaces = A, o.push(U), v = U.position.x + Math.max(O.xAdvance - O.xOffset, O.texture.orig.width), a.x += O.xAdvance + this._letterSpacing, P = Math.max(P, O.yOffset + O.texture.height), p = C, I !== -1 && c > 0 && a.x > c && (++B, Ve(o, 1 + I - B, 1 + R - I), R = I, I = -1, h.push(E), u.push(o.length > 0 ? o[o.length - 1].prevSpaces : 0), _ = Math.max(_, E), g++, a.x = 0, a.y += r.lineHeight, p = null, A = 0);
      }
    }
    var K = f[f.length - 1];
    K !== "\r" && K !== `
` && (/(?:\s)/.test(K) && (v = E), h.push(v), _ = Math.max(_, v), u.push(-1));
    for (var nt = [], R = 0; R <= g; R++) {
      var ft = 0;
      this._align === "right" ? ft = _ - h[R] : this._align === "center" ? ft = (_ - h[R]) / 2 : this._align === "justify" && (ft = u[R] < 0 ? 0 : (_ - h[R]) / u[R]), nt.push(ft);
    }
    var W = o.length, m = {}, b = [], y = this._activePagesMeshData;
    d.push.apply(d, y);
    for (var R = 0; R < W; R++) {
      var S = o[R].texture, M = S.baseTexture.uid;
      if (!m[M]) {
        var w = d.pop();
        if (!w) {
          var L = new Pi(), k = void 0, Y = void 0;
          r.distanceFieldType === "none" ? (k = new xr(et.EMPTY), Y = q.NORMAL) : (k = new xr(et.EMPTY, { program: Ke.from(Xp, Hp), uniforms: { uFWidth: 0 } }), Y = q.NORMAL_NPM);
          var $ = new br(L, k);
          $.blendMode = Y, w = {
            index: 0,
            indexCount: 0,
            vertexCount: 0,
            uvsCount: 0,
            total: 0,
            mesh: $,
            vertices: null,
            uvs: null,
            indices: null
          };
        }
        w.index = 0, w.indexCount = 0, w.vertexCount = 0, w.uvsCount = 0, w.total = 0;
        var x = this._textureCache;
        x[M] = x[M] || new et(S.baseTexture), w.mesh.texture = x[M], w.mesh.tint = this._tint, b.push(w), m[M] = w;
      }
      m[M].total++;
    }
    for (var R = 0; R < y.length; R++)
      b.indexOf(y[R]) === -1 && this.removeChild(y[R].mesh);
    for (var R = 0; R < b.length; R++)
      b[R].mesh.parent !== this && this.addChild(b[R].mesh);
    this._activePagesMeshData = b;
    for (var R in m) {
      var w = m[R], it = w.total;
      if (!(((e = w.indices) === null || e === void 0 ? void 0 : e.length) > 6 * it) || w.vertices.length < br.BATCHABLE_SIZE * 2)
        w.vertices = new Float32Array(4 * 2 * it), w.uvs = new Float32Array(4 * 2 * it), w.indices = new Uint16Array(6 * it);
      else
        for (var X = w.total, pt = w.vertices, Q = X * 4 * 2; Q < pt.length; Q++)
          pt[Q] = 0;
      w.mesh.size = 6 * it;
    }
    for (var R = 0; R < W; R++) {
      var T = o[R], H = T.position.x + nt[T.line] * (this._align === "justify" ? T.prevSpaces : 1);
      this._roundPixels && (H = Math.round(H));
      var Et = H * s, tt = T.position.y * s, S = T.texture, N = m[S.baseTexture.uid], G = S.frame, V = S._uvs, D = N.index++;
      N.indices[D * 6 + 0] = 0 + D * 4, N.indices[D * 6 + 1] = 1 + D * 4, N.indices[D * 6 + 2] = 2 + D * 4, N.indices[D * 6 + 3] = 0 + D * 4, N.indices[D * 6 + 4] = 2 + D * 4, N.indices[D * 6 + 5] = 3 + D * 4, N.vertices[D * 8 + 0] = Et, N.vertices[D * 8 + 1] = tt, N.vertices[D * 8 + 2] = Et + G.width * s, N.vertices[D * 8 + 3] = tt, N.vertices[D * 8 + 4] = Et + G.width * s, N.vertices[D * 8 + 5] = tt + G.height * s, N.vertices[D * 8 + 6] = Et, N.vertices[D * 8 + 7] = tt + G.height * s, N.uvs[D * 8 + 0] = V.x0, N.uvs[D * 8 + 1] = V.y0, N.uvs[D * 8 + 2] = V.x1, N.uvs[D * 8 + 3] = V.y1, N.uvs[D * 8 + 4] = V.x2, N.uvs[D * 8 + 5] = V.y2, N.uvs[D * 8 + 6] = V.x3, N.uvs[D * 8 + 7] = V.y3;
    }
    this._textWidth = _ * s, this._textHeight = (a.y + r.lineHeight) * s;
    for (var R in m) {
      var w = m[R];
      if (this.anchor.x !== 0 || this.anchor.y !== 0)
        for (var kt = 0, _e = this._textWidth * this.anchor.x, Ue = this._textHeight * this.anchor.y, wr = 0; wr < w.total; wr++)
          w.vertices[kt++] -= _e, w.vertices[kt++] -= Ue, w.vertices[kt++] -= _e, w.vertices[kt++] -= Ue, w.vertices[kt++] -= _e, w.vertices[kt++] -= Ue, w.vertices[kt++] -= _e, w.vertices[kt++] -= Ue;
      this._maxLineHeight = P * s;
      var er = w.mesh.geometry.getBuffer("aVertexPosition"), rr = w.mesh.geometry.getBuffer("aTextureCoord"), Sr = w.mesh.geometry.getIndex();
      er.data = w.vertices, rr.data = w.uvs, Sr.data = w.indices, er.update(), rr.update(), Sr.update();
    }
    for (var R = 0; R < o.length; R++)
      Ua.push(o[R]);
    this._font = r, this.dirty = !1;
  }, t.prototype.updateTransform = function() {
    this.validate(), this.containerUpdateTransform();
  }, t.prototype._render = function(e) {
    this._autoResolution && this._resolution !== e.resolution && (this._resolution = e.resolution, this.dirty = !0);
    var r = ge.available[this._fontName], n = r.distanceFieldRange, s = r.distanceFieldType, a = r.size;
    if (s !== "none")
      for (var o = this.worldTransform, h = o.a, u = o.b, l = o.c, f = o.d, c = Math.sqrt(h * h + u * u), d = Math.sqrt(l * l + f * f), p = (Math.abs(c) + Math.abs(d)) / 2, v = this.fontSize / a, _ = 0, g = this._activePagesMeshData; _ < g.length; _++) {
        var I = g[_];
        I.mesh.shader.uniforms.uFWidth = p * n * v * this._resolution;
      }
    i.prototype._render.call(this, e);
  }, t.prototype.getLocalBounds = function() {
    return this.validate(), i.prototype.getLocalBounds.call(this);
  }, t.prototype.validate = function() {
    var e = ge.available[this._fontName];
    if (!e)
      throw new Error('Missing BitmapFont "' + this._fontName + '"');
    this._font !== e && (this.dirty = !0), this.dirty && this.updateText();
  }, Object.defineProperty(t.prototype, "tint", {
    /**
     * The tint of the BitmapText object.
     * @default 0xffffff
     */
    get: function() {
      return this._tint;
    },
    set: function(e) {
      if (this._tint !== e) {
        this._tint = e;
        for (var r = 0; r < this._activePagesMeshData.length; r++)
          this._activePagesMeshData[r].mesh.tint = e;
      }
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "align", {
    /**
     * The alignment of the BitmapText object.
     * @member {string}
     * @default 'left'
     */
    get: function() {
      return this._align;
    },
    set: function(e) {
      this._align !== e && (this._align = e, this.dirty = !0);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "fontName", {
    /** The name of the BitmapFont. */
    get: function() {
      return this._fontName;
    },
    set: function(e) {
      if (!ge.available[e])
        throw new Error('Missing BitmapFont "' + e + '"');
      this._fontName !== e && (this._fontName = e, this.dirty = !0);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "fontSize", {
    /** The size of the font to display. */
    get: function() {
      var e;
      return (e = this._fontSize) !== null && e !== void 0 ? e : ge.available[this._fontName].size;
    },
    set: function(e) {
      this._fontSize !== e && (this._fontSize = e, this.dirty = !0);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "anchor", {
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
    set: function(e) {
      typeof e == "number" ? this._anchor.set(e) : this._anchor.copyFrom(e);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "text", {
    /** The text of the BitmapText object. */
    get: function() {
      return this._text;
    },
    set: function(e) {
      e = String(e ?? ""), this._text !== e && (this._text = e, this.dirty = !0);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "maxWidth", {
    /**
     * The max width of this bitmap text in pixels. If the text provided is longer than the
     * value provided, line breaks will be automatically inserted in the last whitespace.
     * Disable by setting the value to 0.
     */
    get: function() {
      return this._maxWidth;
    },
    set: function(e) {
      this._maxWidth !== e && (this._maxWidth = e, this.dirty = !0);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "maxLineHeight", {
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
  }), Object.defineProperty(t.prototype, "textWidth", {
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
  }), Object.defineProperty(t.prototype, "letterSpacing", {
    /** Additional space between characters. */
    get: function() {
      return this._letterSpacing;
    },
    set: function(e) {
      this._letterSpacing !== e && (this._letterSpacing = e, this.dirty = !0);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "roundPixels", {
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
    set: function(e) {
      e !== this._roundPixels && (this._roundPixels = e, this.dirty = !0);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "textHeight", {
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
  }), Object.defineProperty(t.prototype, "resolution", {
    /**
     * The resolution / device pixel ratio of the canvas.
     *
     * This is set to automatically match the renderer resolution by default, but can be overridden by setting manually.
     * @default 1
     */
    get: function() {
      return this._resolution;
    },
    set: function(e) {
      this._autoResolution = !1, this._resolution !== e && (this._resolution = e, this.dirty = !0);
    },
    enumerable: !1,
    configurable: !0
  }), t.prototype.destroy = function(e) {
    var r = this._textureCache, n = ge.available[this._fontName], s = n.distanceFieldType === "none" ? Fa : ka;
    s.push.apply(s, this._activePagesMeshData);
    for (var a = 0, o = this._activePagesMeshData; a < o.length; a++) {
      var h = o[a];
      this.removeChild(h.mesh);
    }
    this._activePagesMeshData = [], s.filter(function(f) {
      return r[f.mesh.texture.baseTexture.uid];
    }).forEach(function(f) {
      f.mesh.texture = et.EMPTY;
    });
    for (var u in r) {
      var l = r[u];
      l.destroy(), delete r[u];
    }
    this._font = null, this._textureCache = null, i.prototype.destroy.call(this, e);
  }, t.styleDefaults = {
    align: "left",
    tint: 16777215,
    maxWidth: 0,
    letterSpacing: 0
  }, t;
})(re);
var zp = (
  /** @class */
  function() {
    function i() {
    }
    return i.add = function() {
      wt.setExtensionXhrType("fnt", wt.XHR_RESPONSE_TYPE.TEXT);
    }, i.use = function(t, e) {
      var r = Vo(t.data);
      if (!r) {
        e();
        return;
      }
      for (var n = i.getBaseUrl(this, t), s = r.parse(t.data), a = {}, o = function(v) {
        a[v.metadata.pageFile] = v.texture, Object.keys(a).length === s.page.length && (t.bitmapFont = ge.install(s, a, !0), e());
      }, h = 0; h < s.page.length; ++h) {
        var u = s.page[h].file, l = n + u, f = !1;
        for (var c in this.resources) {
          var d = this.resources[c];
          if (d.url === l) {
            d.metadata.pageFile = u, d.texture ? o(d) : d.onAfterMiddleware.add(o), f = !0;
            break;
          }
        }
        if (!f) {
          var p = {
            crossOrigin: t.crossOrigin,
            loadType: wt.LOAD_TYPE.IMAGE,
            metadata: Object.assign({ pageFile: u }, t.metadata.imageMetadata),
            parentResource: t
          };
          this.add(l, p, o);
        }
      }
    }, i.getBaseUrl = function(t, e) {
      var r = e.isDataUrl ? "" : i.dirname(e.url);
      return e.isDataUrl && (r === "." && (r = ""), t.baseUrl && r && t.baseUrl.charAt(t.baseUrl.length - 1) === "/" && (r += "/")), r = r.replace(t.baseUrl, ""), r && r.charAt(r.length - 1) !== "/" && (r += "/"), r;
    }, i.dirname = function(t) {
      var e = t.replace(/\\/g, "/").replace(/\/$/, "").replace(/\/[^\/]*$/, "");
      return e === t ? "." : e === "" ? "/" : e;
    }, i.extension = dt.Loader, i;
  }()
);
/*!
 * @pixi/filter-alpha - v6.5.10
 * Compiled Thu, 06 Jul 2023 15:25:11 UTC
 *
 * @pixi/filter-alpha is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var Dn = function(i, t) {
  return Dn = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, r) {
    e.__proto__ = r;
  } || function(e, r) {
    for (var n in r)
      r.hasOwnProperty(n) && (e[n] = r[n]);
  }, Dn(i, t);
};
function Yp(i, t) {
  Dn(i, t);
  function e() {
    this.constructor = i;
  }
  i.prototype = t === null ? Object.create(t) : (e.prototype = t.prototype, new e());
}
var Wp = `varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform float uAlpha;

void main(void)
{
   gl_FragColor = texture2D(uSampler, vTextureCoord) * uAlpha;
}
`, Vp = (
  /** @class */
  function(i) {
    Yp(t, i);
    function t(e) {
      e === void 0 && (e = 1);
      var r = i.call(this, Oo, Wp, { uAlpha: 1 }) || this;
      return r.alpha = e, r;
    }
    return Object.defineProperty(t.prototype, "alpha", {
      /**
       * Coefficient for alpha multiplication
       * @default 1
       */
      get: function() {
        return this.uniforms.uAlpha;
      },
      set: function(e) {
        this.uniforms.uAlpha = e;
      },
      enumerable: !1,
      configurable: !0
    }), t;
  }(ve)
);
/*!
 * @pixi/filter-blur - v6.5.10
 * Compiled Thu, 06 Jul 2023 15:25:11 UTC
 *
 * @pixi/filter-blur is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var Ln = function(i, t) {
  return Ln = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, r) {
    e.__proto__ = r;
  } || function(e, r) {
    for (var n in r)
      r.hasOwnProperty(n) && (e[n] = r[n]);
  }, Ln(i, t);
};
function Zo(i, t) {
  Ln(i, t);
  function e() {
    this.constructor = i;
  }
  i.prototype = t === null ? Object.create(t) : (e.prototype = t.prototype, new e());
}
var $p = `
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
function Zp(i, t) {
  var e = Math.ceil(i / 2), r = $p, n = "", s;
  t ? s = "vBlurTexCoords[%index%] =  textureCoord + vec2(%sampleIndex% * strength, 0.0);" : s = "vBlurTexCoords[%index%] =  textureCoord + vec2(0.0, %sampleIndex% * strength);";
  for (var a = 0; a < i; a++) {
    var o = s.replace("%index%", a.toString());
    o = o.replace("%sampleIndex%", a - (e - 1) + ".0"), n += o, n += `
`;
  }
  return r = r.replace("%blur%", n), r = r.replace("%size%", i.toString()), r;
}
var qp = {
  5: [0.153388, 0.221461, 0.250301],
  7: [0.071303, 0.131514, 0.189879, 0.214607],
  9: [0.028532, 0.067234, 0.124009, 0.179044, 0.20236],
  11: [93e-4, 0.028002, 0.065984, 0.121703, 0.175713, 0.198596],
  13: [2406e-6, 9255e-6, 0.027867, 0.065666, 0.121117, 0.174868, 0.197641],
  15: [489e-6, 2403e-6, 9246e-6, 0.02784, 0.065602, 0.120999, 0.174697, 0.197448]
}, Jp = [
  "varying vec2 vBlurTexCoords[%size%];",
  "uniform sampler2D uSampler;",
  "void main(void)",
  "{",
  "    gl_FragColor = vec4(0.0);",
  "    %blur%",
  "}"
].join(`
`);
function Kp(i) {
  for (var t = qp[i], e = t.length, r = Jp, n = "", s = "gl_FragColor += texture2D(uSampler, vBlurTexCoords[%index%]) * %value%;", a, o = 0; o < i; o++) {
    var h = s.replace("%index%", o.toString());
    a = o, o >= e && (a = i - o - 1), h = h.replace("%value%", t[a].toString()), n += h, n += `
`;
  }
  return r = r.replace("%blur%", n), r = r.replace("%size%", i.toString()), r;
}
var Bn = (
  /** @class */
  function(i) {
    Zo(t, i);
    function t(e, r, n, s, a) {
      r === void 0 && (r = 8), n === void 0 && (n = 4), s === void 0 && (s = z.FILTER_RESOLUTION), a === void 0 && (a = 5);
      var o = this, h = Zp(a, e), u = Kp(a);
      return o = i.call(
        this,
        // vertex shader
        h,
        // fragment shader
        u
      ) || this, o.horizontal = e, o.resolution = s, o._quality = 0, o.quality = n, o.blur = r, o;
    }
    return t.prototype.apply = function(e, r, n, s) {
      if (n ? this.horizontal ? this.uniforms.strength = 1 / n.width * (n.width / r.width) : this.uniforms.strength = 1 / n.height * (n.height / r.height) : this.horizontal ? this.uniforms.strength = 1 / e.renderer.width * (e.renderer.width / r.width) : this.uniforms.strength = 1 / e.renderer.height * (e.renderer.height / r.height), this.uniforms.strength *= this.strength, this.uniforms.strength /= this.passes, this.passes === 1)
        e.applyFilter(this, r, n, s);
      else {
        var a = e.getFilterTexture(), o = e.renderer, h = r, u = a;
        this.state.blend = !1, e.applyFilter(this, h, u, Vt.CLEAR);
        for (var l = 1; l < this.passes - 1; l++) {
          e.bindAndClear(h, Vt.BLIT), this.uniforms.uSampler = u;
          var f = u;
          u = h, h = f, o.shader.bind(this), o.geometry.draw(5);
        }
        this.state.blend = !0, e.applyFilter(this, u, n, s), e.returnFilterTexture(a);
      }
    }, Object.defineProperty(t.prototype, "blur", {
      /**
       * Sets the strength of both the blur.
       * @default 16
       */
      get: function() {
        return this.strength;
      },
      set: function(e) {
        this.padding = 1 + Math.abs(e) * 2, this.strength = e;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "quality", {
      /**
       * Sets the quality of the blur by modifying the number of passes. More passes means higher
       * quality bluring but the lower the performance.
       * @default 4
       */
      get: function() {
        return this._quality;
      },
      set: function(e) {
        this._quality = e, this.passes = e;
      },
      enumerable: !1,
      configurable: !0
    }), t;
  }(ve)
), Qp = (
  /** @class */
  function(i) {
    Zo(t, i);
    function t(e, r, n, s) {
      e === void 0 && (e = 8), r === void 0 && (r = 4), n === void 0 && (n = z.FILTER_RESOLUTION), s === void 0 && (s = 5);
      var a = i.call(this) || this;
      return a.blurXFilter = new Bn(!0, e, r, n, s), a.blurYFilter = new Bn(!1, e, r, n, s), a.resolution = n, a.quality = r, a.blur = e, a.repeatEdgePixels = !1, a;
    }
    return t.prototype.apply = function(e, r, n, s) {
      var a = Math.abs(this.blurXFilter.strength), o = Math.abs(this.blurYFilter.strength);
      if (a && o) {
        var h = e.getFilterTexture();
        this.blurXFilter.apply(e, r, h, Vt.CLEAR), this.blurYFilter.apply(e, h, n, s), e.returnFilterTexture(h);
      } else o ? this.blurYFilter.apply(e, r, n, s) : this.blurXFilter.apply(e, r, n, s);
    }, t.prototype.updatePadding = function() {
      this._repeatEdgePixels ? this.padding = 0 : this.padding = Math.max(Math.abs(this.blurXFilter.strength), Math.abs(this.blurYFilter.strength)) * 2;
    }, Object.defineProperty(t.prototype, "blur", {
      /**
       * Sets the strength of both the blurX and blurY properties simultaneously
       * @default 2
       */
      get: function() {
        return this.blurXFilter.blur;
      },
      set: function(e) {
        this.blurXFilter.blur = this.blurYFilter.blur = e, this.updatePadding();
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "quality", {
      /**
       * Sets the number of passes for blur. More passes means higher quality bluring.
       * @default 1
       */
      get: function() {
        return this.blurXFilter.quality;
      },
      set: function(e) {
        this.blurXFilter.quality = this.blurYFilter.quality = e;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "blurX", {
      /**
       * Sets the strength of the blurX property
       * @default 2
       */
      get: function() {
        return this.blurXFilter.blur;
      },
      set: function(e) {
        this.blurXFilter.blur = e, this.updatePadding();
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "blurY", {
      /**
       * Sets the strength of the blurY property
       * @default 2
       */
      get: function() {
        return this.blurYFilter.blur;
      },
      set: function(e) {
        this.blurYFilter.blur = e, this.updatePadding();
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "blendMode", {
      /**
       * Sets the blendmode of the filter
       * @default PIXI.BLEND_MODES.NORMAL
       */
      get: function() {
        return this.blurYFilter.blendMode;
      },
      set: function(e) {
        this.blurYFilter.blendMode = e;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "repeatEdgePixels", {
      /**
       * If set to true the edge of the target will be clamped
       * @default false
       */
      get: function() {
        return this._repeatEdgePixels;
      },
      set: function(e) {
        this._repeatEdgePixels = e, this.updatePadding();
      },
      enumerable: !1,
      configurable: !0
    }), t;
  }(ve)
);
/*!
 * @pixi/filter-color-matrix - v6.5.10
 * Compiled Thu, 06 Jul 2023 15:25:11 UTC
 *
 * @pixi/filter-color-matrix is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var Fn = function(i, t) {
  return Fn = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, r) {
    e.__proto__ = r;
  } || function(e, r) {
    for (var n in r)
      r.hasOwnProperty(n) && (e[n] = r[n]);
  }, Fn(i, t);
};
function tv(i, t) {
  Fn(i, t);
  function e() {
    this.constructor = i;
  }
  i.prototype = t === null ? Object.create(t) : (e.prototype = t.prototype, new e());
}
var ev = `varying vec2 vTextureCoord;
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
`, kn = (
  /** @class */
  function(i) {
    tv(t, i);
    function t() {
      var e = this, r = {
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
      return e = i.call(this, Ts, ev, r) || this, e.alpha = 1, e;
    }
    return t.prototype._loadMatrix = function(e, r) {
      r === void 0 && (r = !1);
      var n = e;
      r && (this._multiply(n, this.uniforms.m, e), n = this._colorMatrix(n)), this.uniforms.m = n;
    }, t.prototype._multiply = function(e, r, n) {
      return e[0] = r[0] * n[0] + r[1] * n[5] + r[2] * n[10] + r[3] * n[15], e[1] = r[0] * n[1] + r[1] * n[6] + r[2] * n[11] + r[3] * n[16], e[2] = r[0] * n[2] + r[1] * n[7] + r[2] * n[12] + r[3] * n[17], e[3] = r[0] * n[3] + r[1] * n[8] + r[2] * n[13] + r[3] * n[18], e[4] = r[0] * n[4] + r[1] * n[9] + r[2] * n[14] + r[3] * n[19] + r[4], e[5] = r[5] * n[0] + r[6] * n[5] + r[7] * n[10] + r[8] * n[15], e[6] = r[5] * n[1] + r[6] * n[6] + r[7] * n[11] + r[8] * n[16], e[7] = r[5] * n[2] + r[6] * n[7] + r[7] * n[12] + r[8] * n[17], e[8] = r[5] * n[3] + r[6] * n[8] + r[7] * n[13] + r[8] * n[18], e[9] = r[5] * n[4] + r[6] * n[9] + r[7] * n[14] + r[8] * n[19] + r[9], e[10] = r[10] * n[0] + r[11] * n[5] + r[12] * n[10] + r[13] * n[15], e[11] = r[10] * n[1] + r[11] * n[6] + r[12] * n[11] + r[13] * n[16], e[12] = r[10] * n[2] + r[11] * n[7] + r[12] * n[12] + r[13] * n[17], e[13] = r[10] * n[3] + r[11] * n[8] + r[12] * n[13] + r[13] * n[18], e[14] = r[10] * n[4] + r[11] * n[9] + r[12] * n[14] + r[13] * n[19] + r[14], e[15] = r[15] * n[0] + r[16] * n[5] + r[17] * n[10] + r[18] * n[15], e[16] = r[15] * n[1] + r[16] * n[6] + r[17] * n[11] + r[18] * n[16], e[17] = r[15] * n[2] + r[16] * n[7] + r[17] * n[12] + r[18] * n[17], e[18] = r[15] * n[3] + r[16] * n[8] + r[17] * n[13] + r[18] * n[18], e[19] = r[15] * n[4] + r[16] * n[9] + r[17] * n[14] + r[18] * n[19] + r[19], e;
    }, t.prototype._colorMatrix = function(e) {
      var r = new Float32Array(e);
      return r[4] /= 255, r[9] /= 255, r[14] /= 255, r[19] /= 255, r;
    }, t.prototype.brightness = function(e, r) {
      var n = [
        e,
        0,
        0,
        0,
        0,
        0,
        e,
        0,
        0,
        0,
        0,
        0,
        e,
        0,
        0,
        0,
        0,
        0,
        1,
        0
      ];
      this._loadMatrix(n, r);
    }, t.prototype.tint = function(e, r) {
      var n = e >> 16 & 255, s = e >> 8 & 255, a = e & 255, o = [
        n / 255,
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
        a / 255,
        0,
        0,
        0,
        0,
        0,
        1,
        0
      ];
      this._loadMatrix(o, r);
    }, t.prototype.greyscale = function(e, r) {
      var n = [
        e,
        e,
        e,
        0,
        0,
        e,
        e,
        e,
        0,
        0,
        e,
        e,
        e,
        0,
        0,
        0,
        0,
        0,
        1,
        0
      ];
      this._loadMatrix(n, r);
    }, t.prototype.blackAndWhite = function(e) {
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
      this._loadMatrix(r, e);
    }, t.prototype.hue = function(e, r) {
      e = (e || 0) / 180 * Math.PI;
      var n = Math.cos(e), s = Math.sin(e), a = Math.sqrt, o = 1 / 3, h = a(o), u = n + (1 - n) * o, l = o * (1 - n) - h * s, f = o * (1 - n) + h * s, c = o * (1 - n) + h * s, d = n + o * (1 - n), p = o * (1 - n) - h * s, v = o * (1 - n) - h * s, _ = o * (1 - n) + h * s, g = n + o * (1 - n), I = [
        u,
        l,
        f,
        0,
        0,
        c,
        d,
        p,
        0,
        0,
        v,
        _,
        g,
        0,
        0,
        0,
        0,
        0,
        1,
        0
      ];
      this._loadMatrix(I, r);
    }, t.prototype.contrast = function(e, r) {
      var n = (e || 0) + 1, s = -0.5 * (n - 1), a = [
        n,
        0,
        0,
        0,
        s,
        0,
        n,
        0,
        0,
        s,
        0,
        0,
        n,
        0,
        s,
        0,
        0,
        0,
        1,
        0
      ];
      this._loadMatrix(a, r);
    }, t.prototype.saturate = function(e, r) {
      e === void 0 && (e = 0);
      var n = e * 2 / 3 + 1, s = (n - 1) * -0.5, a = [
        n,
        s,
        s,
        0,
        0,
        s,
        n,
        s,
        0,
        0,
        s,
        s,
        n,
        0,
        0,
        0,
        0,
        0,
        1,
        0
      ];
      this._loadMatrix(a, r);
    }, t.prototype.desaturate = function() {
      this.saturate(-1);
    }, t.prototype.negative = function(e) {
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
      this._loadMatrix(r, e);
    }, t.prototype.sepia = function(e) {
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
      this._loadMatrix(r, e);
    }, t.prototype.technicolor = function(e) {
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
      this._loadMatrix(r, e);
    }, t.prototype.polaroid = function(e) {
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
      this._loadMatrix(r, e);
    }, t.prototype.toBGR = function(e) {
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
      this._loadMatrix(r, e);
    }, t.prototype.kodachrome = function(e) {
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
      this._loadMatrix(r, e);
    }, t.prototype.browni = function(e) {
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
      this._loadMatrix(r, e);
    }, t.prototype.vintage = function(e) {
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
      this._loadMatrix(r, e);
    }, t.prototype.colorTone = function(e, r, n, s, a) {
      e = e || 0.2, r = r || 0.15, n = n || 16770432, s = s || 3375104;
      var o = (n >> 16 & 255) / 255, h = (n >> 8 & 255) / 255, u = (n & 255) / 255, l = (s >> 16 & 255) / 255, f = (s >> 8 & 255) / 255, c = (s & 255) / 255, d = [
        0.3,
        0.59,
        0.11,
        0,
        0,
        o,
        h,
        u,
        e,
        0,
        l,
        f,
        c,
        r,
        0,
        o - l,
        h - f,
        u - c,
        0,
        0
      ];
      this._loadMatrix(d, a);
    }, t.prototype.night = function(e, r) {
      e = e || 0.1;
      var n = [
        e * -2,
        -e,
        0,
        0,
        0,
        -e,
        0,
        e,
        0,
        0,
        0,
        e,
        e * 2,
        0,
        0,
        0,
        0,
        0,
        1,
        0
      ];
      this._loadMatrix(n, r);
    }, t.prototype.predator = function(e, r) {
      var n = [
        // row 1
        11.224130630493164 * e,
        -4.794486999511719 * e,
        -2.8746118545532227 * e,
        0 * e,
        0.40342438220977783 * e,
        // row 2
        -3.6330697536468506 * e,
        9.193157196044922 * e,
        -2.951810836791992 * e,
        0 * e,
        -1.316135048866272 * e,
        // row 3
        -3.2184197902679443 * e,
        -4.2375030517578125 * e,
        7.476448059082031 * e,
        0 * e,
        0.8044459223747253 * e,
        // row 4
        0,
        0,
        0,
        1,
        0
      ];
      this._loadMatrix(n, r);
    }, t.prototype.lsd = function(e) {
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
      this._loadMatrix(r, e);
    }, t.prototype.reset = function() {
      var e = [
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
      this._loadMatrix(e, !1);
    }, Object.defineProperty(t.prototype, "matrix", {
      /**
       * The matrix of the color matrix filter
       * @member {number[]}
       * @default [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0]
       */
      get: function() {
        return this.uniforms.m;
      },
      set: function(e) {
        this.uniforms.m = e;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "alpha", {
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
      set: function(e) {
        this.uniforms.uAlpha = e;
      },
      enumerable: !1,
      configurable: !0
    }), t;
  }(ve)
);
kn.prototype.grayscale = kn.prototype.greyscale;
/*!
 * @pixi/filter-displacement - v6.5.10
 * Compiled Thu, 06 Jul 2023 15:25:11 UTC
 *
 * @pixi/filter-displacement is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var Un = function(i, t) {
  return Un = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, r) {
    e.__proto__ = r;
  } || function(e, r) {
    for (var n in r)
      r.hasOwnProperty(n) && (e[n] = r[n]);
  }, Un(i, t);
};
function rv(i, t) {
  Un(i, t);
  function e() {
    this.constructor = i;
  }
  i.prototype = t === null ? Object.create(t) : (e.prototype = t.prototype, new e());
}
var iv = `varying vec2 vFilterCoord;
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
`, nv = `attribute vec2 aVertexPosition;

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
`, sv = (
  /** @class */
  function(i) {
    rv(t, i);
    function t(e, r) {
      var n = this, s = new At();
      return e.renderable = !1, n = i.call(this, nv, iv, {
        mapSampler: e._texture,
        filterMatrix: s,
        scale: { x: 1, y: 1 },
        rotation: new Float32Array([1, 0, 0, 1])
      }) || this, n.maskSprite = e, n.maskMatrix = s, r == null && (r = 20), n.scale = new gt(r, r), n;
    }
    return t.prototype.apply = function(e, r, n, s) {
      this.uniforms.filterMatrix = e.calculateSpriteMatrix(this.maskMatrix, this.maskSprite), this.uniforms.scale.x = this.scale.x, this.uniforms.scale.y = this.scale.y;
      var a = this.maskSprite.worldTransform, o = Math.sqrt(a.a * a.a + a.b * a.b), h = Math.sqrt(a.c * a.c + a.d * a.d);
      o !== 0 && h !== 0 && (this.uniforms.rotation[0] = a.a / o, this.uniforms.rotation[1] = a.b / o, this.uniforms.rotation[2] = a.c / h, this.uniforms.rotation[3] = a.d / h), e.applyFilter(this, r, n, s);
    }, Object.defineProperty(t.prototype, "map", {
      /** The texture used for the displacement map. Must be power of 2 sized texture. */
      get: function() {
        return this.uniforms.mapSampler;
      },
      set: function(e) {
        this.uniforms.mapSampler = e;
      },
      enumerable: !1,
      configurable: !0
    }), t;
  }(ve)
);
/*!
 * @pixi/filter-fxaa - v6.5.10
 * Compiled Thu, 06 Jul 2023 15:25:11 UTC
 *
 * @pixi/filter-fxaa is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var Gn = function(i, t) {
  return Gn = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, r) {
    e.__proto__ = r;
  } || function(e, r) {
    for (var n in r)
      r.hasOwnProperty(n) && (e[n] = r[n]);
  }, Gn(i, t);
};
function av(i, t) {
  Gn(i, t);
  function e() {
    this.constructor = i;
  }
  i.prototype = t === null ? Object.create(t) : (e.prototype = t.prototype, new e());
}
var ov = `
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
`, hv = `varying vec2 v_rgbNW;
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
`, uv = (
  /** @class */
  function(i) {
    av(t, i);
    function t() {
      return i.call(this, ov, hv) || this;
    }
    return t;
  }(ve)
);
/*!
 * @pixi/filter-noise - v6.5.10
 * Compiled Thu, 06 Jul 2023 15:25:11 UTC
 *
 * @pixi/filter-noise is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var jn = function(i, t) {
  return jn = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, r) {
    e.__proto__ = r;
  } || function(e, r) {
    for (var n in r)
      r.hasOwnProperty(n) && (e[n] = r[n]);
  }, jn(i, t);
};
function lv(i, t) {
  jn(i, t);
  function e() {
    this.constructor = i;
  }
  i.prototype = t === null ? Object.create(t) : (e.prototype = t.prototype, new e());
}
var fv = `precision highp float;

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
`, cv = (
  /** @class */
  function(i) {
    lv(t, i);
    function t(e, r) {
      e === void 0 && (e = 0.5), r === void 0 && (r = Math.random());
      var n = i.call(this, Ts, fv, {
        uNoise: 0,
        uSeed: 0
      }) || this;
      return n.noise = e, n.seed = r, n;
    }
    return Object.defineProperty(t.prototype, "noise", {
      /**
       * The amount of noise to apply, this value should be in the range (0, 1].
       * @default 0.5
       */
      get: function() {
        return this.uniforms.uNoise;
      },
      set: function(e) {
        this.uniforms.uNoise = e;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "seed", {
      /** A seed value to apply to the random noise generation. `Math.random()` is a good value to use. */
      get: function() {
        return this.uniforms.uSeed;
      },
      set: function(e) {
        this.uniforms.uSeed = e;
      },
      enumerable: !1,
      configurable: !0
    }), t;
  }(ve)
);
/*!
 * @pixi/mixin-cache-as-bitmap - v6.5.10
 * Compiled Thu, 06 Jul 2023 15:25:11 UTC
 *
 * @pixi/mixin-cache-as-bitmap is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
var qo = new At();
St.prototype._cacheAsBitmap = !1;
St.prototype._cacheData = null;
St.prototype._cacheAsBitmapResolution = null;
St.prototype._cacheAsBitmapMultisample = bt.NONE;
var dv = (
  /** @class */
  /* @__PURE__ */ function() {
    function i() {
      this.textureCacheId = null, this.originalRender = null, this.originalRenderCanvas = null, this.originalCalculateBounds = null, this.originalGetLocalBounds = null, this.originalUpdateTransform = null, this.originalDestroy = null, this.originalMask = null, this.originalFilterArea = null, this.originalContainsPoint = null, this.sprite = null;
    }
    return i;
  }()
);
Object.defineProperties(St.prototype, {
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
    set: function(i) {
      i !== this._cacheAsBitmapResolution && (this._cacheAsBitmapResolution = i, this.cacheAsBitmap && (this.cacheAsBitmap = !1, this.cacheAsBitmap = !0));
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
    set: function(i) {
      i !== this._cacheAsBitmapMultisample && (this._cacheAsBitmapMultisample = i, this.cacheAsBitmap && (this.cacheAsBitmap = !1, this.cacheAsBitmap = !0));
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
    set: function(i) {
      if (this._cacheAsBitmap !== i) {
        this._cacheAsBitmap = i;
        var t;
        i ? (this._cacheData || (this._cacheData = new dv()), t = this._cacheData, t.originalRender = this.render, t.originalRenderCanvas = this.renderCanvas, t.originalUpdateTransform = this.updateTransform, t.originalCalculateBounds = this.calculateBounds, t.originalGetLocalBounds = this.getLocalBounds, t.originalDestroy = this.destroy, t.originalContainsPoint = this.containsPoint, t.originalMask = this._mask, t.originalFilterArea = this.filterArea, this.render = this._renderCached, this.renderCanvas = this._renderCachedCanvas, this.destroy = this._cacheAsBitmapDestroy) : (t = this._cacheData, t.sprite && this._destroyCachedDisplayObject(), this.render = t.originalRender, this.renderCanvas = t.originalRenderCanvas, this.calculateBounds = t.originalCalculateBounds, this.getLocalBounds = t.originalGetLocalBounds, this.destroy = t.originalDestroy, this.updateTransform = t.originalUpdateTransform, this.containsPoint = t.originalContainsPoint, this._mask = t.originalMask, this.filterArea = t.originalFilterArea);
      }
    }
  }
});
St.prototype._renderCached = function(t) {
  !this.visible || this.worldAlpha <= 0 || !this.renderable || (this._initCachedDisplayObject(t), this._cacheData.sprite.transform._worldID = this.transform._worldID, this._cacheData.sprite.worldAlpha = this.worldAlpha, this._cacheData.sprite._render(t));
};
St.prototype._initCachedDisplayObject = function(t) {
  var e;
  if (!(this._cacheData && this._cacheData.sprite)) {
    var r = this.alpha;
    this.alpha = 1, t.batch.flush();
    var n = this.getLocalBounds(null, !0).clone();
    if (this.filters && this.filters.length) {
      var s = this.filters[0].padding;
      n.pad(s);
    }
    n.ceil(z.RESOLUTION);
    var a = t.renderTexture.current, o = t.renderTexture.sourceFrame.clone(), h = t.renderTexture.destinationFrame.clone(), u = t.projection.transform, l = Ee.create({
      width: n.width,
      height: n.height,
      resolution: this.cacheAsBitmapResolution || t.resolution,
      multisample: (e = this.cacheAsBitmapMultisample) !== null && e !== void 0 ? e : t.multisample
    }), f = "cacheAsBitmap_" + Be();
    this._cacheData.textureCacheId = f, ot.addToCache(l.baseTexture, f), et.addToCache(l, f);
    var c = this.transform.localTransform.copyTo(qo).invert().translate(-n.x, -n.y);
    this.render = this._cacheData.originalRender, t.render(this, { renderTexture: l, clear: !0, transform: c, skipUpdateTransform: !1 }), t.framebuffer.blit(), t.projection.transform = u, t.renderTexture.bind(a, o, h), this.render = this._renderCached, this.updateTransform = this.displayObjectUpdateTransform, this.calculateBounds = this._calculateCachedBounds, this.getLocalBounds = this._getCachedLocalBounds, this._mask = null, this.filterArea = null, this.alpha = r;
    var d = new xe(l);
    d.transform.worldTransform = this.transform.worldTransform, d.anchor.x = -(n.x / n.width), d.anchor.y = -(n.y / n.height), d.alpha = r, d._bounds = this._bounds, this._cacheData.sprite = d, this.transform._parentID = -1, this.parent ? this.updateTransform() : (this.enableTempParent(), this.updateTransform(), this.disableTempParent(null)), this.containsPoint = d.containsPoint.bind(d);
  }
};
St.prototype._renderCachedCanvas = function(t) {
  !this.visible || this.worldAlpha <= 0 || !this.renderable || (this._initCachedDisplayObjectCanvas(t), this._cacheData.sprite.worldAlpha = this.worldAlpha, this._cacheData.sprite._renderCanvas(t));
};
St.prototype._initCachedDisplayObjectCanvas = function(t) {
  if (!(this._cacheData && this._cacheData.sprite)) {
    var e = this.getLocalBounds(null, !0), r = this.alpha;
    this.alpha = 1;
    var n = t.context, s = t._projTransform;
    e.ceil(z.RESOLUTION);
    var a = Ee.create({ width: e.width, height: e.height }), o = "cacheAsBitmap_" + Be();
    this._cacheData.textureCacheId = o, ot.addToCache(a.baseTexture, o), et.addToCache(a, o);
    var h = qo;
    this.transform.localTransform.copyTo(h), h.invert(), h.tx -= e.x, h.ty -= e.y, this.renderCanvas = this._cacheData.originalRenderCanvas, t.render(this, { renderTexture: a, clear: !0, transform: h, skipUpdateTransform: !1 }), t.context = n, t._projTransform = s, this.renderCanvas = this._renderCachedCanvas, this.updateTransform = this.displayObjectUpdateTransform, this.calculateBounds = this._calculateCachedBounds, this.getLocalBounds = this._getCachedLocalBounds, this._mask = null, this.filterArea = null, this.alpha = r;
    var u = new xe(a);
    u.transform.worldTransform = this.transform.worldTransform, u.anchor.x = -(e.x / e.width), u.anchor.y = -(e.y / e.height), u.alpha = r, u._bounds = this._bounds, this._cacheData.sprite = u, this.transform._parentID = -1, this.parent ? this.updateTransform() : (this.parent = t._tempDisplayObjectParent, this.updateTransform(), this.parent = null), this.containsPoint = u.containsPoint.bind(u);
  }
};
St.prototype._calculateCachedBounds = function() {
  this._bounds.clear(), this._cacheData.sprite.transform._worldID = this.transform._worldID, this._cacheData.sprite._calculateBounds(), this._bounds.updateID = this._boundsID;
};
St.prototype._getCachedLocalBounds = function() {
  return this._cacheData.sprite.getLocalBounds(null);
};
St.prototype._destroyCachedDisplayObject = function() {
  this._cacheData.sprite._texture.destroy(!0), this._cacheData.sprite = null, ot.removeFromCache(this._cacheData.textureCacheId), et.removeFromCache(this._cacheData.textureCacheId), this._cacheData.textureCacheId = null;
};
St.prototype._cacheAsBitmapDestroy = function(t) {
  this.cacheAsBitmap = !1, this.destroy(t);
};
/*!
 * @pixi/mixin-get-child-by-name - v6.5.10
 * Compiled Thu, 06 Jul 2023 15:25:11 UTC
 *
 * @pixi/mixin-get-child-by-name is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
St.prototype.name = null;
re.prototype.getChildByName = function(t, e) {
  for (var r = 0, n = this.children.length; r < n; r++)
    if (this.children[r].name === t)
      return this.children[r];
  if (e)
    for (var r = 0, n = this.children.length; r < n; r++) {
      var s = this.children[r];
      if (s.getChildByName) {
        var a = s.getChildByName(t, !0);
        if (a)
          return a;
      }
    }
  return null;
};
/*!
 * @pixi/mixin-get-global-position - v6.5.10
 * Compiled Thu, 06 Jul 2023 15:25:11 UTC
 *
 * @pixi/mixin-get-global-position is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
St.prototype.getGlobalPosition = function(t, e) {
  return t === void 0 && (t = new gt()), e === void 0 && (e = !1), this.parent ? this.parent.toGlobal(this.position, t, e) : (t.x = this.position.x, t.y = this.position.y), t;
};
/*!
 * @pixi/app - v6.5.10
 * Compiled Thu, 06 Jul 2023 15:25:11 UTC
 *
 * @pixi/app is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
var pv = (
  /** @class */
  function() {
    function i() {
    }
    return i.init = function(t) {
      var e = this;
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
        e._resizeTo && (e.cancelResize(), e._resizeId = requestAnimationFrame(function() {
          return e.resize();
        }));
      }, this.cancelResize = function() {
        e._resizeId && (cancelAnimationFrame(e._resizeId), e._resizeId = null);
      }, this.resize = function() {
        if (e._resizeTo) {
          e.cancelResize();
          var r, n;
          if (e._resizeTo === globalThis.window)
            r = globalThis.innerWidth, n = globalThis.innerHeight;
          else {
            var s = e._resizeTo, a = s.clientWidth, o = s.clientHeight;
            r = a, n = o;
          }
          e.renderer.resize(r, n);
        }
      }, this._resizeId = null, this._resizeTo = null, this.resizeTo = t.resizeTo || null;
    }, i.destroy = function() {
      globalThis.removeEventListener("resize", this.queueResize), this.cancelResize(), this.cancelResize = null, this.queueResize = null, this.resizeTo = null, this.resize = null;
    }, i.extension = dt.Application, i;
  }()
), Jo = (
  /** @class */
  function() {
    function i(t) {
      var e = this;
      this.stage = new re(), t = Object.assign({
        forceCanvas: !1
      }, t), this.renderer = Ro(t), i._plugins.forEach(function(r) {
        r.init.call(e, t);
      });
    }
    return i.registerPlugin = function(t) {
      Bt("6.5.0", "Application.registerPlugin() is deprecated, use extensions.add()"), se.add({
        type: dt.Application,
        ref: t
      });
    }, i.prototype.render = function() {
      this.renderer.render(this.stage);
    }, Object.defineProperty(i.prototype, "view", {
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
    }), Object.defineProperty(i.prototype, "screen", {
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
    }), i.prototype.destroy = function(t, e) {
      var r = this, n = i._plugins.slice(0);
      n.reverse(), n.forEach(function(s) {
        s.destroy.call(r);
      }), this.stage.destroy(e), this.stage = null, this.renderer.destroy(t), this.renderer = null;
    }, i._plugins = [], i;
  }()
);
se.handleByList(dt.Application, Jo._plugins);
se.add(pv);
/*!
 * @pixi/mesh-extras - v6.5.10
 * Compiled Thu, 06 Jul 2023 15:25:11 UTC
 *
 * @pixi/mesh-extras is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var Hn = function(i, t) {
  return Hn = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, r) {
    e.__proto__ = r;
  } || function(e, r) {
    for (var n in r)
      r.hasOwnProperty(n) && (e[n] = r[n]);
  }, Hn(i, t);
};
function Qe(i, t) {
  Hn(i, t);
  function e() {
    this.constructor = i;
  }
  i.prototype = t === null ? Object.create(t) : (e.prototype = t.prototype, new e());
}
var vv = (
  /** @class */
  function(i) {
    Qe(t, i);
    function t(e, r, n, s) {
      e === void 0 && (e = 100), r === void 0 && (r = 100), n === void 0 && (n = 10), s === void 0 && (s = 10);
      var a = i.call(this) || this;
      return a.segWidth = n, a.segHeight = s, a.width = e, a.height = r, a.build(), a;
    }
    return t.prototype.build = function() {
      for (var e = this.segWidth * this.segHeight, r = [], n = [], s = [], a = this.segWidth - 1, o = this.segHeight - 1, h = this.width / a, u = this.height / o, l = 0; l < e; l++) {
        var f = l % this.segWidth, c = l / this.segWidth | 0;
        r.push(f * h, c * u), n.push(f / a, c / o);
      }
      for (var d = a * o, l = 0; l < d; l++) {
        var p = l % a, v = l / a | 0, _ = v * this.segWidth + p, g = v * this.segWidth + p + 1, I = (v + 1) * this.segWidth + p, E = (v + 1) * this.segWidth + p + 1;
        s.push(_, g, I, g, E, I);
      }
      this.buffers[0].data = new Float32Array(r), this.buffers[1].data = new Float32Array(n), this.indexBuffer.data = new Uint16Array(s), this.buffers[0].update(), this.buffers[1].update(), this.indexBuffer.update();
    }, t;
  }(Pi)
), _v = (
  /** @class */
  function(i) {
    Qe(t, i);
    function t(e, r, n) {
      e === void 0 && (e = 200), n === void 0 && (n = 0);
      var s = i.call(this, new Float32Array(r.length * 4), new Float32Array(r.length * 4), new Uint16Array((r.length - 1) * 6)) || this;
      return s.points = r, s._width = e, s.textureScale = n, s.build(), s;
    }
    return Object.defineProperty(t.prototype, "width", {
      /**
       * The width (i.e., thickness) of the rope.
       * @readonly
       */
      get: function() {
        return this._width;
      },
      enumerable: !1,
      configurable: !0
    }), t.prototype.build = function() {
      var e = this.points;
      if (e) {
        var r = this.getBuffer("aVertexPosition"), n = this.getBuffer("aTextureCoord"), s = this.getIndex();
        if (!(e.length < 1)) {
          r.data.length / 4 !== e.length && (r.data = new Float32Array(e.length * 4), n.data = new Float32Array(e.length * 4), s.data = new Uint16Array((e.length - 1) * 6));
          var a = n.data, o = s.data;
          a[0] = 0, a[1] = 0, a[2] = 0, a[3] = 1;
          for (var h = 0, u = e[0], l = this._width * this.textureScale, f = e.length, c = 0; c < f; c++) {
            var d = c * 4;
            if (this.textureScale > 0) {
              var p = u.x - e[c].x, v = u.y - e[c].y, _ = Math.sqrt(p * p + v * v);
              u = e[c], h += _ / l;
            } else
              h = c / (f - 1);
            a[d] = h, a[d + 1] = 0, a[d + 2] = h, a[d + 3] = 1;
          }
          for (var g = 0, c = 0; c < f - 1; c++) {
            var d = c * 2;
            o[g++] = d, o[g++] = d + 1, o[g++] = d + 2, o[g++] = d + 2, o[g++] = d + 1, o[g++] = d + 3;
          }
          n.update(), s.update(), this.updateVertices();
        }
      }
    }, t.prototype.updateVertices = function() {
      var e = this.points;
      if (!(e.length < 1)) {
        for (var r = e[0], n, s = 0, a = 0, o = this.buffers[0].data, h = e.length, u = 0; u < h; u++) {
          var l = e[u], f = u * 4;
          u < e.length - 1 ? n = e[u + 1] : n = l, a = -(n.x - r.x), s = n.y - r.y;
          var c = Math.sqrt(s * s + a * a), d = this.textureScale > 0 ? this.textureScale * this._width / 2 : this._width / 2;
          s /= c, a /= c, s *= d, a *= d, o[f] = l.x + s, o[f + 1] = l.y + a, o[f + 2] = l.x - s, o[f + 3] = l.y - a, r = l;
        }
        this.buffers[0].update();
      }
    }, t.prototype.update = function() {
      this.textureScale > 0 ? this.build() : this.updateVertices();
    }, t;
  }(Pi)
);
(function(i) {
  Qe(t, i);
  function t(e, r, n) {
    n === void 0 && (n = 0);
    var s = this, a = new _v(e.height, r, n), o = new xr(e);
    return n > 0 && (e.baseTexture.wrapMode = Qt.REPEAT), s = i.call(this, a, o) || this, s.autoUpdate = !0, s;
  }
  return t.prototype._render = function(e) {
    var r = this.geometry;
    (this.autoUpdate || r._width !== this.shader.texture.height) && (r._width = this.shader.texture.height, r.update()), i.prototype._render.call(this, e);
  }, t;
})(br);
var mv = (
  /** @class */
  function(i) {
    Qe(t, i);
    function t(e, r, n) {
      var s = this, a = new vv(e.width, e.height, r, n), o = new xr(et.WHITE);
      return s = i.call(this, a, o) || this, s.texture = e, s.autoResize = !0, s;
    }
    return t.prototype.textureUpdated = function() {
      this._textureID = this.shader.texture._updateID;
      var e = this.geometry, r = this.shader.texture, n = r.width, s = r.height;
      this.autoResize && (e.width !== n || e.height !== s) && (e.width = this.shader.texture.width, e.height = this.shader.texture.height, e.build());
    }, Object.defineProperty(t.prototype, "texture", {
      get: function() {
        return this.shader.texture;
      },
      set: function(e) {
        this.shader.texture !== e && (this.shader.texture = e, this._textureID = -1, e.baseTexture.valid ? this.textureUpdated() : e.once("update", this.textureUpdated, this));
      },
      enumerable: !1,
      configurable: !0
    }), t.prototype._render = function(e) {
      this._textureID !== this.shader.texture._updateID && this.textureUpdated(), i.prototype._render.call(this, e);
    }, t.prototype.destroy = function(e) {
      this.shader.texture.off("update", this.textureUpdated, this), i.prototype.destroy.call(this, e);
    }, t;
  }(br)
);
(function(i) {
  Qe(t, i);
  function t(e, r, n, s, a) {
    e === void 0 && (e = et.EMPTY);
    var o = this, h = new Pi(r, n, s);
    h.getBuffer("aVertexPosition").static = !1;
    var u = new xr(e);
    return o = i.call(this, h, u, null, a) || this, o.autoUpdate = !0, o;
  }
  return Object.defineProperty(t.prototype, "vertices", {
    /**
     * Collection of vertices data.
     * @type {Float32Array}
     */
    get: function() {
      return this.geometry.getBuffer("aVertexPosition").data;
    },
    set: function(e) {
      this.geometry.getBuffer("aVertexPosition").data = e;
    },
    enumerable: !1,
    configurable: !0
  }), t.prototype._render = function(e) {
    this.autoUpdate && this.geometry.getBuffer("aVertexPosition").update(), i.prototype._render.call(this, e);
  }, t;
})(br);
var Zr = 10;
(function(i) {
  Qe(t, i);
  function t(e, r, n, s, a) {
    r === void 0 && (r = Zr), n === void 0 && (n = Zr), s === void 0 && (s = Zr), a === void 0 && (a = Zr);
    var o = i.call(this, et.WHITE, 4, 4) || this;
    return o._origWidth = e.orig.width, o._origHeight = e.orig.height, o._width = o._origWidth, o._height = o._origHeight, o._leftWidth = r, o._rightWidth = s, o._topHeight = n, o._bottomHeight = a, o.texture = e, o;
  }
  return t.prototype.textureUpdated = function() {
    this._textureID = this.shader.texture._updateID, this._refresh();
  }, Object.defineProperty(t.prototype, "vertices", {
    get: function() {
      return this.geometry.getBuffer("aVertexPosition").data;
    },
    set: function(e) {
      this.geometry.getBuffer("aVertexPosition").data = e;
    },
    enumerable: !1,
    configurable: !0
  }), t.prototype.updateHorizontalVertices = function() {
    var e = this.vertices, r = this._getMinScale();
    e[9] = e[11] = e[13] = e[15] = this._topHeight * r, e[17] = e[19] = e[21] = e[23] = this._height - this._bottomHeight * r, e[25] = e[27] = e[29] = e[31] = this._height;
  }, t.prototype.updateVerticalVertices = function() {
    var e = this.vertices, r = this._getMinScale();
    e[2] = e[10] = e[18] = e[26] = this._leftWidth * r, e[4] = e[12] = e[20] = e[28] = this._width - this._rightWidth * r, e[6] = e[14] = e[22] = e[30] = this._width;
  }, t.prototype._getMinScale = function() {
    var e = this._leftWidth + this._rightWidth, r = this._width > e ? 1 : this._width / e, n = this._topHeight + this._bottomHeight, s = this._height > n ? 1 : this._height / n, a = Math.min(r, s);
    return a;
  }, Object.defineProperty(t.prototype, "width", {
    /** The width of the NineSlicePlane, setting this will actually modify the vertices and UV's of this plane. */
    get: function() {
      return this._width;
    },
    set: function(e) {
      this._width = e, this._refresh();
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "height", {
    /** The height of the NineSlicePlane, setting this will actually modify the vertices and UV's of this plane. */
    get: function() {
      return this._height;
    },
    set: function(e) {
      this._height = e, this._refresh();
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "leftWidth", {
    /** The width of the left column. */
    get: function() {
      return this._leftWidth;
    },
    set: function(e) {
      this._leftWidth = e, this._refresh();
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "rightWidth", {
    /** The width of the right column. */
    get: function() {
      return this._rightWidth;
    },
    set: function(e) {
      this._rightWidth = e, this._refresh();
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "topHeight", {
    /** The height of the top row. */
    get: function() {
      return this._topHeight;
    },
    set: function(e) {
      this._topHeight = e, this._refresh();
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "bottomHeight", {
    /** The height of the bottom row. */
    get: function() {
      return this._bottomHeight;
    },
    set: function(e) {
      this._bottomHeight = e, this._refresh();
    },
    enumerable: !1,
    configurable: !0
  }), t.prototype._refresh = function() {
    var e = this.texture, r = this.geometry.buffers[1].data;
    this._origWidth = e.orig.width, this._origHeight = e.orig.height;
    var n = 1 / this._origWidth, s = 1 / this._origHeight;
    r[0] = r[8] = r[16] = r[24] = 0, r[1] = r[3] = r[5] = r[7] = 0, r[6] = r[14] = r[22] = r[30] = 1, r[25] = r[27] = r[29] = r[31] = 1, r[2] = r[10] = r[18] = r[26] = n * this._leftWidth, r[4] = r[12] = r[20] = r[28] = 1 - n * this._rightWidth, r[9] = r[11] = r[13] = r[15] = s * this._topHeight, r[17] = r[19] = r[21] = r[23] = 1 - s * this._bottomHeight, this.updateHorizontalVertices(), this.updateVerticalVertices(), this.geometry.buffers[0].update(), this.geometry.buffers[1].update();
  }, t;
})(mv);
/*!
 * @pixi/sprite-animated - v6.5.10
 * Compiled Thu, 06 Jul 2023 15:25:11 UTC
 *
 * @pixi/sprite-animated is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var Xn = function(i, t) {
  return Xn = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, r) {
    e.__proto__ = r;
  } || function(e, r) {
    for (var n in r)
      r.hasOwnProperty(n) && (e[n] = r[n]);
  }, Xn(i, t);
};
function gv(i, t) {
  Xn(i, t);
  function e() {
    this.constructor = i;
  }
  i.prototype = t === null ? Object.create(t) : (e.prototype = t.prototype, new e());
}
var R_ = (
  /** @class */
  function(i) {
    gv(t, i);
    function t(e, r) {
      r === void 0 && (r = !0);
      var n = i.call(this, e[0] instanceof et ? e[0] : e[0].texture) || this;
      return n._textures = null, n._durations = null, n._autoUpdate = r, n._isConnectedToTicker = !1, n.animationSpeed = 1, n.loop = !0, n.updateAnchor = !1, n.onComplete = null, n.onFrameChange = null, n.onLoop = null, n._currentTime = 0, n._playing = !1, n._previousFrame = null, n.textures = e, n;
    }
    return t.prototype.stop = function() {
      this._playing && (this._playing = !1, this._autoUpdate && this._isConnectedToTicker && (Nt.shared.remove(this.update, this), this._isConnectedToTicker = !1));
    }, t.prototype.play = function() {
      this._playing || (this._playing = !0, this._autoUpdate && !this._isConnectedToTicker && (Nt.shared.add(this.update, this, pe.HIGH), this._isConnectedToTicker = !0));
    }, t.prototype.gotoAndStop = function(e) {
      this.stop();
      var r = this.currentFrame;
      this._currentTime = e, r !== this.currentFrame && this.updateTexture();
    }, t.prototype.gotoAndPlay = function(e) {
      var r = this.currentFrame;
      this._currentTime = e, r !== this.currentFrame && this.updateTexture(), this.play();
    }, t.prototype.update = function(e) {
      if (this._playing) {
        var r = this.animationSpeed * e, n = this.currentFrame;
        if (this._durations !== null) {
          var s = this._currentTime % 1 * this._durations[this.currentFrame];
          for (s += r / 60 * 1e3; s < 0; )
            this._currentTime--, s += this._durations[this.currentFrame];
          var a = Math.sign(this.animationSpeed * e);
          for (this._currentTime = Math.floor(this._currentTime); s >= this._durations[this.currentFrame]; )
            s -= this._durations[this.currentFrame] * a, this._currentTime += a;
          this._currentTime += s / this._durations[this.currentFrame];
        } else
          this._currentTime += r;
        this._currentTime < 0 && !this.loop ? (this.gotoAndStop(0), this.onComplete && this.onComplete()) : this._currentTime >= this._textures.length && !this.loop ? (this.gotoAndStop(this._textures.length - 1), this.onComplete && this.onComplete()) : n !== this.currentFrame && (this.loop && this.onLoop && (this.animationSpeed > 0 && this.currentFrame < n ? this.onLoop() : this.animationSpeed < 0 && this.currentFrame > n && this.onLoop()), this.updateTexture());
      }
    }, t.prototype.updateTexture = function() {
      var e = this.currentFrame;
      this._previousFrame !== e && (this._previousFrame = e, this._texture = this._textures[e], this._textureID = -1, this._textureTrimmedID = -1, this._cachedTint = 16777215, this.uvs = this._texture._uvs.uvsFloat32, this.updateAnchor && this._anchor.copyFrom(this._texture.defaultAnchor), this.onFrameChange && this.onFrameChange(this.currentFrame));
    }, t.prototype.destroy = function(e) {
      this.stop(), i.prototype.destroy.call(this, e), this.onComplete = null, this.onFrameChange = null, this.onLoop = null;
    }, t.fromFrames = function(e) {
      for (var r = [], n = 0; n < e.length; ++n)
        r.push(et.from(e[n]));
      return new t(r);
    }, t.fromImages = function(e) {
      for (var r = [], n = 0; n < e.length; ++n)
        r.push(et.from(e[n]));
      return new t(r);
    }, Object.defineProperty(t.prototype, "totalFrames", {
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
    }), Object.defineProperty(t.prototype, "textures", {
      /** The array of textures used for this AnimatedSprite. */
      get: function() {
        return this._textures;
      },
      set: function(e) {
        if (e[0] instanceof et)
          this._textures = e, this._durations = null;
        else {
          this._textures = [], this._durations = [];
          for (var r = 0; r < e.length; r++)
            this._textures.push(e[r].texture), this._durations.push(e[r].time);
        }
        this._previousFrame = null, this.gotoAndStop(0), this.updateTexture();
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "currentFrame", {
      /**
       * The AnimatedSprites current frame index.
       * @readonly
       */
      get: function() {
        var e = Math.floor(this._currentTime) % this._textures.length;
        return e < 0 && (e += this._textures.length), e;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "playing", {
      /**
       * Indicates if the AnimatedSprite is currently playing.
       * @readonly
       */
      get: function() {
        return this._playing;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "autoUpdate", {
      /** Whether to use PIXI.Ticker.shared to auto update animation time. */
      get: function() {
        return this._autoUpdate;
      },
      set: function(e) {
        e !== this._autoUpdate && (this._autoUpdate = e, !this._autoUpdate && this._isConnectedToTicker ? (Nt.shared.remove(this.update, this), this._isConnectedToTicker = !1) : this._autoUpdate && !this._isConnectedToTicker && this._playing && (Nt.shared.add(this.update, this), this._isConnectedToTicker = !0));
      },
      enumerable: !1,
      configurable: !0
    }), t;
  }(xe)
);
/*!
 * pixi.js - v6.5.10
 * Compiled Thu, 06 Jul 2023 15:25:11 UTC
 *
 * pixi.js is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
se.add(
  // Install renderer plugins
  qc,
  nd,
  ed,
  qd,
  Sp,
  ws,
  Op,
  // Install loader plugins
  zp,
  xd,
  Wd,
  Vd,
  Pp,
  // Install application plugins
  $f,
  cd
);
var yv = {
  AlphaFilter: Vp,
  BlurFilter: Qp,
  BlurFilterPass: Bn,
  ColorMatrixFilter: kn,
  DisplacementFilter: sv,
  FXAAFilter: uv,
  NoiseFilter: cv
};
class bv {
  // リソースリーク対策
  #t = [];
  addC(t, e, r, n = {}) {
    t.on(e, r, n), this.#t.push(() => t.off(e, r, n));
  }
  add(t, e, r, n = {}) {
    if (t instanceof qe) {
      t.on(e, r, n), this.#t.push(() => t.off(e, r, n));
      return;
    }
    t.addEventListener(e, r, n), this.#t.push(() => t.removeEventListener(e, r, { capture: n.capture ?? !1 }));
  }
  clear() {
    for (const t of this.#t) t();
    this.#t = [];
  }
  get isEmpty() {
    return this.#t.length === 0;
  }
}
var Tr = /* @__PURE__ */ ((i) => (i.DEFAULT = "", i.SP_GSM = "png|jpg|jpeg|json|svg|webp|mp4|webm", i.SCRIPT = "sn|ssn", i.FONT = "woff2|woff|otf|ttf", i.SOUND = "mp3|m4a|ogg|aac|flac|wav", i.HTML = "htm|html", i.CSS = "css", i.SN = "sn", i.TST_PNGPNG_ = "png|png_", i.TST_HH = "hh", i.TST_EEE = "eee", i.TST_GGG = "ggg", i.TST_PNGXML = "png|xml", i))(Tr || {});
const xv = {
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
    token: !1,
    tag: !1,
    putCh: !1,
    debugLog: !1,
    baseTx: !1,
    masume: !1,
    // テキストレイヤ：ガイドマス目を表示するか
    variable: !1,
    dumpHtm: !1
  },
  code: {},
  // 暗号化しないフォルダ
  debuger_token: ""
  // デバッガとの接続トークン
};
class Tv {
  constructor(t) {
    this.sys = t;
  }
  oCfg = xv;
  userFnTail = "";
  // 4tst public
  hPathFn2Exts = {};
  async load(t) {
    if (this.oCfg.save_ns = t?.save_ns ?? this.oCfg.save_ns, this.oCfg.window.width = Number(t?.window?.width ?? this.oCfg.window.width), this.oCfg.window.height = Number(t?.window?.height ?? this.oCfg.window.height), this.oCfg.book = { ...this.oCfg.book, ...t.book }, this.oCfg.log.max_len = t.log?.max_len ?? this.oCfg.log.max_len, this.oCfg.init = { ...this.oCfg.init, ...t.init }, this.oCfg.debug = { ...this.oCfg.debug, ...t.debug }, this.oCfg.debuger_token = t.debuger_token, await this.sys.loadPath(this.hPathFn2Exts, this), this.#t = this.matchPath(
      "^breakline$",
      "png|jpg|jpeg|json|svg|webp|mp4|webm"
      /* SP_GSM */
    ).length > 0, this.#e = this.matchPath(
      "^breakpage$",
      "png|jpg|jpeg|json|svg|webp|mp4|webm"
      /* SP_GSM */
    ).length > 0, this.sys.arg.crypto)
      for (const [e, r] of Object.entries(this.hPathFn2Exts))
        for (const [n, s] of Object.entries(r)) {
          if (!n.startsWith(":") || !n.endsWith(":id")) continue;
          const a = s.slice(s.lastIndexOf("/") + 1), o = r[n.slice(0, -10)] ?? "", u = await (await this.sys.fetch(o)).text(), l = this.sys.hash(u);
          if (a !== l) throw `ファイル改竄エラーです fn:${o}`;
        }
    else
      for (const [e, r] of Object.entries(this.hPathFn2Exts))
        for (const n of Object.keys(r))
          n.startsWith(":");
  }
  #t = !1;
  get existsBreakline() {
    return this.#t;
  }
  #e = !1;
  get existsBreakpage() {
    return this.#e;
  }
  getNs() {
    return `skynovel.${this.oCfg.save_ns} - `;
  }
  #i = /([^\/\s]+)\.([^\d]\w+)/;
  // 4 match 498 step(~1ms)  https://regex101.com/r/tpVgmI/1
  searchPath(t, e = "") {
    if (!t) throw "[searchPath] fnが空です";
    if (t.startsWith("http://")) return t;
    const r = t.match(this.#i);
    let n = r ? r[1] : t;
    const s = r ? r[2] : "";
    if (this.userFnTail) {
      const h = n + "@@" + this.userFnTail;
      if (h in this.hPathFn2Exts) {
        if (e === "") n = h;
        else for (const u of Object.keys(this.hPathFn2Exts[h] ?? {}))
          if (`|${e}|`.includes(`|${u}|`)) {
            n = h;
            break;
          }
      }
    }
    const a = this.hPathFn2Exts[n];
    if (!a) throw `サーチパスに存在しないファイル【${t}】です`;
    if (!s) {
      const h = Ne(a[":cnt"]);
      if (e === "") {
        if (h > 1) throw `指定ファイル【${t}】が複数マッチします。サーチ対象拡張子群【${e}】で絞り込むか、ファイル名を個別にして下さい。`;
        return t;
      }
      const u = `|${e}|`;
      if (h > 1) {
        let l = 0;
        for (const f of Object.keys(a))
          if (u.includes(`|${f}|`) && ++l > 1)
            throw `指定ファイル【${t}】が複数マッチします。サーチ対象拡張子群【${e}】で絞り込むか、ファイル名を個別にして下さい。`;
      }
      for (const l of Object.keys(a))
        if (u.includes(`|${l}|`)) return a[l];
      throw `サーチ対象拡張子群【${e}】にマッチするファイルがサーチパスに存在しません。探索ファイル名=【${t}】`;
    }
    if (e !== "" && !`|${e}|`.includes(`|${s}|`))
      throw `指定ファイルの拡張子【${s}】は、サーチ対象拡張子群【${e}】にマッチしません。探索ファイル名=【${t}】`;
    const o = a[s];
    if (!o) throw `サーチパスに存在しない拡張子【${s}】です。探索ファイル名=【${t}】、サーチ対象拡張子群【${e}】`;
    return o;
  }
  matchPath(t, e = "") {
    const r = [], n = new RegExp(t), s = new RegExp(e);
    for (const [a, o] of Object.entries(this.hPathFn2Exts)) {
      if (a.search(n) === -1) continue;
      if (e === "") {
        r.push(o);
        continue;
      }
      const h = {};
      let u = !1;
      for (const l of Object.keys(o))
        l.search(s) !== -1 && (h[l] = a, u = !0);
      u && r.push(h);
    }
    return r;
  }
  addPath(t, e) {
    const r = {};
    for (const [n, s] of Object.entries(e))
      r[n] = (n.startsWith(":") ? "" : this.sys.arg.cur) + s;
    this.hPathFn2Exts[t] = r;
  }
}
const ne = /* @__PURE__ */ Object.create(null);
ne.open = "0";
ne.close = "1";
ne.ping = "2";
ne.pong = "3";
ne.message = "4";
ne.upgrade = "5";
ne.noop = "6";
const ri = /* @__PURE__ */ Object.create(null);
Object.keys(ne).forEach((i) => {
  ri[ne[i]] = i;
});
const zn = { type: "error", data: "parser error" }, Ko = typeof Blob == "function" || typeof Blob < "u" && Object.prototype.toString.call(Blob) === "[object BlobConstructor]", Qo = typeof ArrayBuffer == "function", th = (i) => typeof ArrayBuffer.isView == "function" ? ArrayBuffer.isView(i) : i && i.buffer instanceof ArrayBuffer, Ms = ({ type: i, data: t }, e, r) => Ko && t instanceof Blob ? e ? r(t) : Ga(t, r) : Qo && (t instanceof ArrayBuffer || th(t)) ? e ? r(t) : Ga(new Blob([t]), r) : r(ne[i] + (t || "")), Ga = (i, t) => {
  const e = new FileReader();
  return e.onload = function() {
    const r = e.result.split(",")[1];
    t("b" + (r || ""));
  }, e.readAsDataURL(i);
};
function ja(i) {
  return i instanceof Uint8Array ? i : i instanceof ArrayBuffer ? new Uint8Array(i) : new Uint8Array(i.buffer, i.byteOffset, i.byteLength);
}
let un;
function Ev(i, t) {
  if (Ko && i.data instanceof Blob)
    return i.data.arrayBuffer().then(ja).then(t);
  if (Qo && (i.data instanceof ArrayBuffer || th(i.data)))
    return t(ja(i.data));
  Ms(i, !1, (e) => {
    un || (un = new TextEncoder()), t(un.encode(e));
  });
}
const Ha = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", cr = typeof Uint8Array > "u" ? [] : new Uint8Array(256);
for (let i = 0; i < Ha.length; i++)
  cr[Ha.charCodeAt(i)] = i;
const wv = (i) => {
  let t = i.length * 0.75, e = i.length, r, n = 0, s, a, o, h;
  i[i.length - 1] === "=" && (t--, i[i.length - 2] === "=" && t--);
  const u = new ArrayBuffer(t), l = new Uint8Array(u);
  for (r = 0; r < e; r += 4)
    s = cr[i.charCodeAt(r)], a = cr[i.charCodeAt(r + 1)], o = cr[i.charCodeAt(r + 2)], h = cr[i.charCodeAt(r + 3)], l[n++] = s << 2 | a >> 4, l[n++] = (a & 15) << 4 | o >> 2, l[n++] = (o & 3) << 6 | h & 63;
  return u;
}, Sv = typeof ArrayBuffer == "function", Cs = (i, t) => {
  if (typeof i != "string")
    return {
      type: "message",
      data: eh(i, t)
    };
  const e = i.charAt(0);
  return e === "b" ? {
    type: "message",
    data: Iv(i.substring(1), t)
  } : ri[e] ? i.length > 1 ? {
    type: ri[e],
    data: i.substring(1)
  } : {
    type: ri[e]
  } : zn;
}, Iv = (i, t) => {
  if (Sv) {
    const e = wv(i);
    return eh(e, t);
  } else
    return { base64: !0, data: i };
}, eh = (i, t) => {
  switch (t) {
    case "blob":
      return i instanceof Blob ? i : new Blob([i]);
    case "arraybuffer":
    default:
      return i instanceof ArrayBuffer ? i : i.buffer;
  }
}, rh = "", Pv = (i, t) => {
  const e = i.length, r = new Array(e);
  let n = 0;
  i.forEach((s, a) => {
    Ms(s, !1, (o) => {
      r[a] = o, ++n === e && t(r.join(rh));
    });
  });
}, Mv = (i, t) => {
  const e = i.split(rh), r = [];
  for (let n = 0; n < e.length; n++) {
    const s = Cs(e[n], t);
    if (r.push(s), s.type === "error")
      break;
  }
  return r;
};
function Cv() {
  return new TransformStream({
    transform(i, t) {
      Ev(i, (e) => {
        const r = e.length;
        let n;
        if (r < 126)
          n = new Uint8Array(1), new DataView(n.buffer).setUint8(0, r);
        else if (r < 65536) {
          n = new Uint8Array(3);
          const s = new DataView(n.buffer);
          s.setUint8(0, 126), s.setUint16(1, r);
        } else {
          n = new Uint8Array(9);
          const s = new DataView(n.buffer);
          s.setUint8(0, 127), s.setBigUint64(1, BigInt(r));
        }
        i.data && typeof i.data != "string" && (n[0] |= 128), t.enqueue(n), t.enqueue(e);
      });
    }
  });
}
let ln;
function qr(i) {
  return i.reduce((t, e) => t + e.length, 0);
}
function Jr(i, t) {
  if (i[0].length === t)
    return i.shift();
  const e = new Uint8Array(t);
  let r = 0;
  for (let n = 0; n < t; n++)
    e[n] = i[0][r++], r === i[0].length && (i.shift(), r = 0);
  return i.length && r < i[0].length && (i[0] = i[0].slice(r)), e;
}
function Av(i, t) {
  ln || (ln = new TextDecoder());
  const e = [];
  let r = 0, n = -1, s = !1;
  return new TransformStream({
    transform(a, o) {
      for (e.push(a); ; ) {
        if (r === 0) {
          if (qr(e) < 1)
            break;
          const h = Jr(e, 1);
          s = (h[0] & 128) === 128, n = h[0] & 127, n < 126 ? r = 3 : n === 126 ? r = 1 : r = 2;
        } else if (r === 1) {
          if (qr(e) < 2)
            break;
          const h = Jr(e, 2);
          n = new DataView(h.buffer, h.byteOffset, h.length).getUint16(0), r = 3;
        } else if (r === 2) {
          if (qr(e) < 8)
            break;
          const h = Jr(e, 8), u = new DataView(h.buffer, h.byteOffset, h.length), l = u.getUint32(0);
          if (l > Math.pow(2, 21) - 1) {
            o.enqueue(zn);
            break;
          }
          n = l * Math.pow(2, 32) + u.getUint32(4), r = 3;
        } else {
          if (qr(e) < n)
            break;
          const h = Jr(e, n);
          o.enqueue(Cs(s ? h : ln.decode(h), t)), r = 0;
        }
        if (n === 0 || n > i) {
          o.enqueue(zn);
          break;
        }
      }
    }
  });
}
const ih = 4;
function Ct(i) {
  if (i) return Rv(i);
}
function Rv(i) {
  for (var t in Ct.prototype)
    i[t] = Ct.prototype[t];
  return i;
}
Ct.prototype.on = Ct.prototype.addEventListener = function(i, t) {
  return this._callbacks = this._callbacks || {}, (this._callbacks["$" + i] = this._callbacks["$" + i] || []).push(t), this;
};
Ct.prototype.once = function(i, t) {
  function e() {
    this.off(i, e), t.apply(this, arguments);
  }
  return e.fn = t, this.on(i, e), this;
};
Ct.prototype.off = Ct.prototype.removeListener = Ct.prototype.removeAllListeners = Ct.prototype.removeEventListener = function(i, t) {
  if (this._callbacks = this._callbacks || {}, arguments.length == 0)
    return this._callbacks = {}, this;
  var e = this._callbacks["$" + i];
  if (!e) return this;
  if (arguments.length == 1)
    return delete this._callbacks["$" + i], this;
  for (var r, n = 0; n < e.length; n++)
    if (r = e[n], r === t || r.fn === t) {
      e.splice(n, 1);
      break;
    }
  return e.length === 0 && delete this._callbacks["$" + i], this;
};
Ct.prototype.emit = function(i) {
  this._callbacks = this._callbacks || {};
  for (var t = new Array(arguments.length - 1), e = this._callbacks["$" + i], r = 1; r < arguments.length; r++)
    t[r - 1] = arguments[r];
  if (e) {
    e = e.slice(0);
    for (var r = 0, n = e.length; r < n; ++r)
      e[r].apply(this, t);
  }
  return this;
};
Ct.prototype.emitReserved = Ct.prototype.emit;
Ct.prototype.listeners = function(i) {
  return this._callbacks = this._callbacks || {}, this._callbacks["$" + i] || [];
};
Ct.prototype.hasListeners = function(i) {
  return !!this.listeners(i).length;
};
const Mi = typeof Promise == "function" && typeof Promise.resolve == "function" ? (t) => Promise.resolve().then(t) : (t, e) => e(t, 0), Ut = typeof self < "u" ? self : typeof window < "u" ? window : Function("return this")(), Ov = "arraybuffer";
function nh(i, ...t) {
  return t.reduce((e, r) => (i.hasOwnProperty(r) && (e[r] = i[r]), e), {});
}
const Nv = Ut.setTimeout, Dv = Ut.clearTimeout;
function Ci(i, t) {
  t.useNativeTimers ? (i.setTimeoutFn = Nv.bind(Ut), i.clearTimeoutFn = Dv.bind(Ut)) : (i.setTimeoutFn = Ut.setTimeout.bind(Ut), i.clearTimeoutFn = Ut.clearTimeout.bind(Ut));
}
const Lv = 1.33;
function Bv(i) {
  return typeof i == "string" ? Fv(i) : Math.ceil((i.byteLength || i.size) * Lv);
}
function Fv(i) {
  let t = 0, e = 0;
  for (let r = 0, n = i.length; r < n; r++)
    t = i.charCodeAt(r), t < 128 ? e += 1 : t < 2048 ? e += 2 : t < 55296 || t >= 57344 ? e += 3 : (r++, e += 4);
  return e;
}
function sh() {
  return Date.now().toString(36).substring(3) + Math.random().toString(36).substring(2, 5);
}
function kv(i) {
  let t = "";
  for (let e in i)
    i.hasOwnProperty(e) && (t.length && (t += "&"), t += encodeURIComponent(e) + "=" + encodeURIComponent(i[e]));
  return t;
}
function Uv(i) {
  let t = {}, e = i.split("&");
  for (let r = 0, n = e.length; r < n; r++) {
    let s = e[r].split("=");
    t[decodeURIComponent(s[0])] = decodeURIComponent(s[1]);
  }
  return t;
}
class Gv extends Error {
  constructor(t, e, r) {
    super(t), this.description = e, this.context = r, this.type = "TransportError";
  }
}
class As extends Ct {
  /**
   * Transport abstract constructor.
   *
   * @param {Object} opts - options
   * @protected
   */
  constructor(t) {
    super(), this.writable = !1, Ci(this, t), this.opts = t, this.query = t.query, this.socket = t.socket, this.supportsBinary = !t.forceBase64;
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
  onError(t, e, r) {
    return super.emitReserved("error", new Gv(t, e, r)), this;
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
  send(t) {
    this.readyState === "open" && this.write(t);
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
  onData(t) {
    const e = Cs(t, this.socket.binaryType);
    this.onPacket(e);
  }
  /**
   * Called with a decoded packet.
   *
   * @protected
   */
  onPacket(t) {
    super.emitReserved("packet", t);
  }
  /**
   * Called upon close.
   *
   * @protected
   */
  onClose(t) {
    this.readyState = "closed", super.emitReserved("close", t);
  }
  /**
   * Pauses the transport, in order not to lose packets during an upgrade.
   *
   * @param onPause
   */
  pause(t) {
  }
  createUri(t, e = {}) {
    return t + "://" + this._hostname() + this._port() + this.opts.path + this._query(e);
  }
  _hostname() {
    const t = this.opts.hostname;
    return t.indexOf(":") === -1 ? t : "[" + t + "]";
  }
  _port() {
    return this.opts.port && (this.opts.secure && +(this.opts.port !== 443) || !this.opts.secure && Number(this.opts.port) !== 80) ? ":" + this.opts.port : "";
  }
  _query(t) {
    const e = kv(t);
    return e.length ? "?" + e : "";
  }
}
class jv extends As {
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
  pause(t) {
    this.readyState = "pausing";
    const e = () => {
      this.readyState = "paused", t();
    };
    if (this._polling || !this.writable) {
      let r = 0;
      this._polling && (r++, this.once("pollComplete", function() {
        --r || e();
      })), this.writable || (r++, this.once("drain", function() {
        --r || e();
      }));
    } else
      e();
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
  onData(t) {
    const e = (r) => {
      if (this.readyState === "opening" && r.type === "open" && this.onOpen(), r.type === "close")
        return this.onClose({ description: "transport closed by the server" }), !1;
      this.onPacket(r);
    };
    Mv(t, this.socket.binaryType).forEach(e), this.readyState !== "closed" && (this._polling = !1, this.emitReserved("pollComplete"), this.readyState === "open" && this._poll());
  }
  /**
   * For polling, send a close packet.
   *
   * @protected
   */
  doClose() {
    const t = () => {
      this.write([{ type: "close" }]);
    };
    this.readyState === "open" ? t() : this.once("open", t);
  }
  /**
   * Writes a packets payload.
   *
   * @param {Array} packets - data packets
   * @protected
   */
  write(t) {
    this.writable = !1, Pv(t, (e) => {
      this.doWrite(e, () => {
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
    const t = this.opts.secure ? "https" : "http", e = this.query || {};
    return this.opts.timestampRequests !== !1 && (e[this.opts.timestampParam] = sh()), !this.supportsBinary && !e.sid && (e.b64 = 1), this.createUri(t, e);
  }
}
let ah = !1;
try {
  ah = typeof XMLHttpRequest < "u" && "withCredentials" in new XMLHttpRequest();
} catch {
}
const Hv = ah;
function Xv() {
}
class zv extends jv {
  /**
   * XHR Polling constructor.
   *
   * @param {Object} opts
   * @package
   */
  constructor(t) {
    if (super(t), typeof location < "u") {
      const e = location.protocol === "https:";
      let r = location.port;
      r || (r = e ? "443" : "80"), this.xd = typeof location < "u" && t.hostname !== location.hostname || r !== t.port;
    }
  }
  /**
   * Sends data.
   *
   * @param {String} data to send.
   * @param {Function} called upon flush.
   * @private
   */
  doWrite(t, e) {
    const r = this.request({
      method: "POST",
      data: t
    });
    r.on("success", e), r.on("error", (n, s) => {
      this.onError("xhr post error", n, s);
    });
  }
  /**
   * Starts a poll cycle.
   *
   * @private
   */
  doPoll() {
    const t = this.request();
    t.on("data", this.onData.bind(this)), t.on("error", (e, r) => {
      this.onError("xhr poll error", e, r);
    }), this.pollXhr = t;
  }
}
class ee extends Ct {
  /**
   * Request constructor
   *
   * @param {Object} options
   * @package
   */
  constructor(t, e, r) {
    super(), this.createRequest = t, Ci(this, r), this._opts = r, this._method = r.method || "GET", this._uri = e, this._data = r.data !== void 0 ? r.data : null, this._create();
  }
  /**
   * Creates the XHR object and sends the request.
   *
   * @private
   */
  _create() {
    var t;
    const e = nh(this._opts, "agent", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
    e.xdomain = !!this._opts.xd;
    const r = this._xhr = this.createRequest(e);
    try {
      r.open(this._method, this._uri, !0);
      try {
        if (this._opts.extraHeaders) {
          r.setDisableHeaderCheck && r.setDisableHeaderCheck(!0);
          for (let n in this._opts.extraHeaders)
            this._opts.extraHeaders.hasOwnProperty(n) && r.setRequestHeader(n, this._opts.extraHeaders[n]);
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
      (t = this._opts.cookieJar) === null || t === void 0 || t.addCookies(r), "withCredentials" in r && (r.withCredentials = this._opts.withCredentials), this._opts.requestTimeout && (r.timeout = this._opts.requestTimeout), r.onreadystatechange = () => {
        var n;
        r.readyState === 3 && ((n = this._opts.cookieJar) === null || n === void 0 || n.parseCookies(
          // @ts-ignore
          r.getResponseHeader("set-cookie")
        )), r.readyState === 4 && (r.status === 200 || r.status === 1223 ? this._onLoad() : this.setTimeoutFn(() => {
          this._onError(typeof r.status == "number" ? r.status : 0);
        }, 0));
      }, r.send(this._data);
    } catch (n) {
      this.setTimeoutFn(() => {
        this._onError(n);
      }, 0);
      return;
    }
    typeof document < "u" && (this._index = ee.requestsCount++, ee.requests[this._index] = this);
  }
  /**
   * Called upon error.
   *
   * @private
   */
  _onError(t) {
    this.emitReserved("error", t, this._xhr), this._cleanup(!0);
  }
  /**
   * Cleans up house.
   *
   * @private
   */
  _cleanup(t) {
    if (!(typeof this._xhr > "u" || this._xhr === null)) {
      if (this._xhr.onreadystatechange = Xv, t)
        try {
          this._xhr.abort();
        } catch {
        }
      typeof document < "u" && delete ee.requests[this._index], this._xhr = null;
    }
  }
  /**
   * Called upon load.
   *
   * @private
   */
  _onLoad() {
    const t = this._xhr.responseText;
    t !== null && (this.emitReserved("data", t), this.emitReserved("success"), this._cleanup());
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
ee.requestsCount = 0;
ee.requests = {};
if (typeof document < "u") {
  if (typeof attachEvent == "function")
    attachEvent("onunload", Xa);
  else if (typeof addEventListener == "function") {
    const i = "onpagehide" in Ut ? "pagehide" : "unload";
    addEventListener(i, Xa, !1);
  }
}
function Xa() {
  for (let i in ee.requests)
    ee.requests.hasOwnProperty(i) && ee.requests[i].abort();
}
const Yv = function() {
  const i = oh({
    xdomain: !1
  });
  return i && i.responseType !== null;
}();
class Wv extends zv {
  constructor(t) {
    super(t);
    const e = t && t.forceBase64;
    this.supportsBinary = Yv && !e;
  }
  request(t = {}) {
    return Object.assign(t, { xd: this.xd }, this.opts), new ee(oh, this.uri(), t);
  }
}
function oh(i) {
  const t = i.xdomain;
  try {
    if (typeof XMLHttpRequest < "u" && (!t || Hv))
      return new XMLHttpRequest();
  } catch {
  }
  if (!t)
    try {
      return new Ut[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
    } catch {
    }
}
const hh = typeof navigator < "u" && typeof navigator.product == "string" && navigator.product.toLowerCase() === "reactnative";
class Vv extends As {
  get name() {
    return "websocket";
  }
  doOpen() {
    const t = this.uri(), e = this.opts.protocols, r = hh ? {} : nh(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");
    this.opts.extraHeaders && (r.headers = this.opts.extraHeaders);
    try {
      this.ws = this.createSocket(t, e, r);
    } catch (n) {
      return this.emitReserved("error", n);
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
    }, this.ws.onclose = (t) => this.onClose({
      description: "websocket connection closed",
      context: t
    }), this.ws.onmessage = (t) => this.onData(t.data), this.ws.onerror = (t) => this.onError("websocket error", t);
  }
  write(t) {
    this.writable = !1;
    for (let e = 0; e < t.length; e++) {
      const r = t[e], n = e === t.length - 1;
      Ms(r, this.supportsBinary, (s) => {
        try {
          this.doWrite(r, s);
        } catch {
        }
        n && Mi(() => {
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
    const t = this.opts.secure ? "wss" : "ws", e = this.query || {};
    return this.opts.timestampRequests && (e[this.opts.timestampParam] = sh()), this.supportsBinary || (e.b64 = 1), this.createUri(t, e);
  }
}
const fn = Ut.WebSocket || Ut.MozWebSocket;
class $v extends Vv {
  createSocket(t, e, r) {
    return hh ? new fn(t, e, r) : e ? new fn(t, e) : new fn(t);
  }
  doWrite(t, e) {
    this.ws.send(e);
  }
}
class Zv extends As {
  get name() {
    return "webtransport";
  }
  doOpen() {
    try {
      this._transport = new WebTransport(this.createUri("https"), this.opts.transportOptions[this.name]);
    } catch (t) {
      return this.emitReserved("error", t);
    }
    this._transport.closed.then(() => {
      this.onClose();
    }).catch((t) => {
      this.onError("webtransport error", t);
    }), this._transport.ready.then(() => {
      this._transport.createBidirectionalStream().then((t) => {
        const e = Av(Number.MAX_SAFE_INTEGER, this.socket.binaryType), r = t.readable.pipeThrough(e).getReader(), n = Cv();
        n.readable.pipeTo(t.writable), this._writer = n.writable.getWriter();
        const s = () => {
          r.read().then(({ done: o, value: h }) => {
            o || (this.onPacket(h), s());
          }).catch((o) => {
          });
        };
        s();
        const a = { type: "open" };
        this.query.sid && (a.data = `{"sid":"${this.query.sid}"}`), this._writer.write(a).then(() => this.onOpen());
      });
    });
  }
  write(t) {
    this.writable = !1;
    for (let e = 0; e < t.length; e++) {
      const r = t[e], n = e === t.length - 1;
      this._writer.write(r).then(() => {
        n && Mi(() => {
          this.writable = !0, this.emitReserved("drain");
        }, this.setTimeoutFn);
      });
    }
  }
  doClose() {
    var t;
    (t = this._transport) === null || t === void 0 || t.close();
  }
}
const qv = {
  websocket: $v,
  webtransport: Zv,
  polling: Wv
}, Jv = /^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/, Kv = [
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
function Yn(i) {
  if (i.length > 8e3)
    throw "URI too long";
  const t = i, e = i.indexOf("["), r = i.indexOf("]");
  e != -1 && r != -1 && (i = i.substring(0, e) + i.substring(e, r).replace(/:/g, ";") + i.substring(r, i.length));
  let n = Jv.exec(i || ""), s = {}, a = 14;
  for (; a--; )
    s[Kv[a]] = n[a] || "";
  return e != -1 && r != -1 && (s.source = t, s.host = s.host.substring(1, s.host.length - 1).replace(/;/g, ":"), s.authority = s.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), s.ipv6uri = !0), s.pathNames = Qv(s, s.path), s.queryKey = t_(s, s.query), s;
}
function Qv(i, t) {
  const e = /\/{2,9}/g, r = t.replace(e, "/").split("/");
  return (t.slice(0, 1) == "/" || t.length === 0) && r.splice(0, 1), t.slice(-1) == "/" && r.splice(r.length - 1, 1), r;
}
function t_(i, t) {
  const e = {};
  return t.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function(r, n, s) {
    n && (e[n] = s);
  }), e;
}
const Wn = typeof addEventListener == "function" && typeof removeEventListener == "function", ii = [];
Wn && addEventListener("offline", () => {
  ii.forEach((i) => i());
}, !1);
class Te extends Ct {
  /**
   * Socket constructor.
   *
   * @param {String|Object} uri - uri or options
   * @param {Object} opts - options
   */
  constructor(t, e) {
    if (super(), this.binaryType = Ov, this.writeBuffer = [], this._prevBufferLen = 0, this._pingInterval = -1, this._pingTimeout = -1, this._maxPayload = -1, this._pingTimeoutTime = 1 / 0, t && typeof t == "object" && (e = t, t = null), t) {
      const r = Yn(t);
      e.hostname = r.host, e.secure = r.protocol === "https" || r.protocol === "wss", e.port = r.port, r.query && (e.query = r.query);
    } else e.host && (e.hostname = Yn(e.host).host);
    Ci(this, e), this.secure = e.secure != null ? e.secure : typeof location < "u" && location.protocol === "https:", e.hostname && !e.port && (e.port = this.secure ? "443" : "80"), this.hostname = e.hostname || (typeof location < "u" ? location.hostname : "localhost"), this.port = e.port || (typeof location < "u" && location.port ? location.port : this.secure ? "443" : "80"), this.transports = [], this._transportsByName = {}, e.transports.forEach((r) => {
      const n = r.prototype.name;
      this.transports.push(n), this._transportsByName[n] = r;
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
    }, e), this.opts.path = this.opts.path.replace(/\/$/, "") + (this.opts.addTrailingSlash ? "/" : ""), typeof this.opts.query == "string" && (this.opts.query = Uv(this.opts.query)), Wn && (this.opts.closeOnBeforeunload && (this._beforeunloadEventListener = () => {
      this.transport && (this.transport.removeAllListeners(), this.transport.close());
    }, addEventListener("beforeunload", this._beforeunloadEventListener, !1)), this.hostname !== "localhost" && (this._offlineEventListener = () => {
      this._onClose("transport close", {
        description: "network connection lost"
      });
    }, ii.push(this._offlineEventListener))), this.opts.withCredentials && (this._cookieJar = void 0), this._open();
  }
  /**
   * Creates transport of the given type.
   *
   * @param {String} name - transport name
   * @return {Transport}
   * @private
   */
  createTransport(t) {
    const e = Object.assign({}, this.opts.query);
    e.EIO = ih, e.transport = t, this.id && (e.sid = this.id);
    const r = Object.assign({}, this.opts, {
      query: e,
      socket: this,
      hostname: this.hostname,
      secure: this.secure,
      port: this.port
    }, this.opts.transportOptions[t]);
    return new this._transportsByName[t](r);
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
    const t = this.opts.rememberUpgrade && Te.priorWebsocketSuccess && this.transports.indexOf("websocket") !== -1 ? "websocket" : this.transports[0];
    this.readyState = "opening";
    const e = this.createTransport(t);
    e.open(), this.setTransport(e);
  }
  /**
   * Sets the current transport. Disables the existing one (if any).
   *
   * @private
   */
  setTransport(t) {
    this.transport && this.transport.removeAllListeners(), this.transport = t, t.on("drain", this._onDrain.bind(this)).on("packet", this._onPacket.bind(this)).on("error", this._onError.bind(this)).on("close", (e) => this._onClose("transport close", e));
  }
  /**
   * Called when connection is deemed open.
   *
   * @private
   */
  onOpen() {
    this.readyState = "open", Te.priorWebsocketSuccess = this.transport.name === "websocket", this.emitReserved("open"), this.flush();
  }
  /**
   * Handles a packet.
   *
   * @private
   */
  _onPacket(t) {
    if (this.readyState === "opening" || this.readyState === "open" || this.readyState === "closing")
      switch (this.emitReserved("packet", t), this.emitReserved("heartbeat"), t.type) {
        case "open":
          this.onHandshake(JSON.parse(t.data));
          break;
        case "ping":
          this._sendPacket("pong"), this.emitReserved("ping"), this.emitReserved("pong"), this._resetPingTimeout();
          break;
        case "error":
          const e = new Error("server error");
          e.code = t.data, this._onError(e);
          break;
        case "message":
          this.emitReserved("data", t.data), this.emitReserved("message", t.data);
          break;
      }
  }
  /**
   * Called upon handshake completion.
   *
   * @param {Object} data - handshake obj
   * @private
   */
  onHandshake(t) {
    this.emitReserved("handshake", t), this.id = t.sid, this.transport.query.sid = t.sid, this._pingInterval = t.pingInterval, this._pingTimeout = t.pingTimeout, this._maxPayload = t.maxPayload, this.onOpen(), this.readyState !== "closed" && this._resetPingTimeout();
  }
  /**
   * Sets and resets ping timeout timer based on server pings.
   *
   * @private
   */
  _resetPingTimeout() {
    this.clearTimeoutFn(this._pingTimeoutTimer);
    const t = this._pingInterval + this._pingTimeout;
    this._pingTimeoutTime = Date.now() + t, this._pingTimeoutTimer = this.setTimeoutFn(() => {
      this._onClose("ping timeout");
    }, t), this.opts.autoUnref && this._pingTimeoutTimer.unref();
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
      const t = this._getWritablePackets();
      this.transport.send(t), this._prevBufferLen = t.length, this.emitReserved("flush");
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
    let e = 1;
    for (let r = 0; r < this.writeBuffer.length; r++) {
      const n = this.writeBuffer[r].data;
      if (n && (e += Bv(n)), r > 0 && e > this._maxPayload)
        return this.writeBuffer.slice(0, r);
      e += 2;
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
    const t = Date.now() > this._pingTimeoutTime;
    return t && (this._pingTimeoutTime = 0, Mi(() => {
      this._onClose("ping timeout");
    }, this.setTimeoutFn)), t;
  }
  /**
   * Sends a message.
   *
   * @param {String} msg - message.
   * @param {Object} options.
   * @param {Function} fn - callback function.
   * @return {Socket} for chaining.
   */
  write(t, e, r) {
    return this._sendPacket("message", t, e, r), this;
  }
  /**
   * Sends a message. Alias of {@link Socket#write}.
   *
   * @param {String} msg - message.
   * @param {Object} options.
   * @param {Function} fn - callback function.
   * @return {Socket} for chaining.
   */
  send(t, e, r) {
    return this._sendPacket("message", t, e, r), this;
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
  _sendPacket(t, e, r, n) {
    if (typeof e == "function" && (n = e, e = void 0), typeof r == "function" && (n = r, r = null), this.readyState === "closing" || this.readyState === "closed")
      return;
    r = r || {}, r.compress = r.compress !== !1;
    const s = {
      type: t,
      data: e,
      options: r
    };
    this.emitReserved("packetCreate", s), this.writeBuffer.push(s), n && this.once("flush", n), this.flush();
  }
  /**
   * Closes the connection.
   */
  close() {
    const t = () => {
      this._onClose("forced close"), this.transport.close();
    }, e = () => {
      this.off("upgrade", e), this.off("upgradeError", e), t();
    }, r = () => {
      this.once("upgrade", e), this.once("upgradeError", e);
    };
    return (this.readyState === "opening" || this.readyState === "open") && (this.readyState = "closing", this.writeBuffer.length ? this.once("drain", () => {
      this.upgrading ? r() : t();
    }) : this.upgrading ? r() : t()), this;
  }
  /**
   * Called upon transport error
   *
   * @private
   */
  _onError(t) {
    if (Te.priorWebsocketSuccess = !1, this.opts.tryAllTransports && this.transports.length > 1 && this.readyState === "opening")
      return this.transports.shift(), this._open();
    this.emitReserved("error", t), this._onClose("transport error", t);
  }
  /**
   * Called upon transport close.
   *
   * @private
   */
  _onClose(t, e) {
    if (this.readyState === "opening" || this.readyState === "open" || this.readyState === "closing") {
      if (this.clearTimeoutFn(this._pingTimeoutTimer), this.transport.removeAllListeners("close"), this.transport.close(), this.transport.removeAllListeners(), Wn && (this._beforeunloadEventListener && removeEventListener("beforeunload", this._beforeunloadEventListener, !1), this._offlineEventListener)) {
        const r = ii.indexOf(this._offlineEventListener);
        r !== -1 && ii.splice(r, 1);
      }
      this.readyState = "closed", this.id = null, this.emitReserved("close", t, e), this.writeBuffer = [], this._prevBufferLen = 0;
    }
  }
}
Te.protocol = ih;
class e_ extends Te {
  constructor() {
    super(...arguments), this._upgrades = [];
  }
  onOpen() {
    if (super.onOpen(), this.readyState === "open" && this.opts.upgrade)
      for (let t = 0; t < this._upgrades.length; t++)
        this._probe(this._upgrades[t]);
  }
  /**
   * Probes a transport.
   *
   * @param {String} name - transport name
   * @private
   */
  _probe(t) {
    let e = this.createTransport(t), r = !1;
    Te.priorWebsocketSuccess = !1;
    const n = () => {
      r || (e.send([{ type: "ping", data: "probe" }]), e.once("packet", (f) => {
        if (!r)
          if (f.type === "pong" && f.data === "probe") {
            if (this.upgrading = !0, this.emitReserved("upgrading", e), !e)
              return;
            Te.priorWebsocketSuccess = e.name === "websocket", this.transport.pause(() => {
              r || this.readyState !== "closed" && (l(), this.setTransport(e), e.send([{ type: "upgrade" }]), this.emitReserved("upgrade", e), e = null, this.upgrading = !1, this.flush());
            });
          } else {
            const c = new Error("probe error");
            c.transport = e.name, this.emitReserved("upgradeError", c);
          }
      }));
    };
    function s() {
      r || (r = !0, l(), e.close(), e = null);
    }
    const a = (f) => {
      const c = new Error("probe error: " + f);
      c.transport = e.name, s(), this.emitReserved("upgradeError", c);
    };
    function o() {
      a("transport closed");
    }
    function h() {
      a("socket closed");
    }
    function u(f) {
      e && f.name !== e.name && s();
    }
    const l = () => {
      e.removeListener("open", n), e.removeListener("error", a), e.removeListener("close", o), this.off("close", h), this.off("upgrading", u);
    };
    e.once("open", n), e.once("error", a), e.once("close", o), this.once("close", h), this.once("upgrading", u), this._upgrades.indexOf("webtransport") !== -1 && t !== "webtransport" ? this.setTimeoutFn(() => {
      r || e.open();
    }, 200) : e.open();
  }
  onHandshake(t) {
    this._upgrades = this._filterUpgrades(t.upgrades), super.onHandshake(t);
  }
  /**
   * Filters upgrades, returning only those matching client transports.
   *
   * @param {Array} upgrades - server upgrades
   * @private
   */
  _filterUpgrades(t) {
    const e = [];
    for (let r = 0; r < t.length; r++)
      ~this.transports.indexOf(t[r]) && e.push(t[r]);
    return e;
  }
}
let r_ = class extends e_ {
  constructor(t, e = {}) {
    const r = typeof t == "object" ? t : e;
    (!r.transports || r.transports && typeof r.transports[0] == "string") && (r.transports = (r.transports || ["polling", "websocket", "webtransport"]).map((n) => qv[n]).filter((n) => !!n)), super(t, r);
  }
};
function i_(i, t = "", e) {
  let r = i;
  e = e || typeof location < "u" && location, i == null && (i = e.protocol + "//" + e.host), typeof i == "string" && (i.charAt(0) === "/" && (i.charAt(1) === "/" ? i = e.protocol + i : i = e.host + i), /^(https?|wss?):\/\//.test(i) || (typeof e < "u" ? i = e.protocol + "//" + i : i = "https://" + i), r = Yn(i)), r.port || (/^(http|ws)$/.test(r.protocol) ? r.port = "80" : /^(http|ws)s$/.test(r.protocol) && (r.port = "443")), r.path = r.path || "/";
  const s = r.host.indexOf(":") !== -1 ? "[" + r.host + "]" : r.host;
  return r.id = r.protocol + "://" + s + ":" + r.port + t, r.href = r.protocol + "://" + s + (e && e.port === r.port ? "" : ":" + r.port), r;
}
const n_ = typeof ArrayBuffer == "function", s_ = (i) => typeof ArrayBuffer.isView == "function" ? ArrayBuffer.isView(i) : i.buffer instanceof ArrayBuffer, uh = Object.prototype.toString, a_ = typeof Blob == "function" || typeof Blob < "u" && uh.call(Blob) === "[object BlobConstructor]", o_ = typeof File == "function" || typeof File < "u" && uh.call(File) === "[object FileConstructor]";
function Rs(i) {
  return n_ && (i instanceof ArrayBuffer || s_(i)) || a_ && i instanceof Blob || o_ && i instanceof File;
}
function ni(i, t) {
  if (!i || typeof i != "object")
    return !1;
  if (Array.isArray(i)) {
    for (let e = 0, r = i.length; e < r; e++)
      if (ni(i[e]))
        return !0;
    return !1;
  }
  if (Rs(i))
    return !0;
  if (i.toJSON && typeof i.toJSON == "function" && arguments.length === 1)
    return ni(i.toJSON(), !0);
  for (const e in i)
    if (Object.prototype.hasOwnProperty.call(i, e) && ni(i[e]))
      return !0;
  return !1;
}
function h_(i) {
  const t = [], e = i.data, r = i;
  return r.data = Vn(e, t), r.attachments = t.length, { packet: r, buffers: t };
}
function Vn(i, t) {
  if (!i)
    return i;
  if (Rs(i)) {
    const e = { _placeholder: !0, num: t.length };
    return t.push(i), e;
  } else if (Array.isArray(i)) {
    const e = new Array(i.length);
    for (let r = 0; r < i.length; r++)
      e[r] = Vn(i[r], t);
    return e;
  } else if (typeof i == "object" && !(i instanceof Date)) {
    const e = {};
    for (const r in i)
      Object.prototype.hasOwnProperty.call(i, r) && (e[r] = Vn(i[r], t));
    return e;
  }
  return i;
}
function u_(i, t) {
  return i.data = $n(i.data, t), delete i.attachments, i;
}
function $n(i, t) {
  if (!i)
    return i;
  if (i && i._placeholder === !0) {
    if (typeof i.num == "number" && i.num >= 0 && i.num < t.length)
      return t[i.num];
    throw new Error("illegal attachments");
  } else if (Array.isArray(i))
    for (let e = 0; e < i.length; e++)
      i[e] = $n(i[e], t);
  else if (typeof i == "object")
    for (const e in i)
      Object.prototype.hasOwnProperty.call(i, e) && (i[e] = $n(i[e], t));
  return i;
}
const l_ = [
  "connect",
  "connect_error",
  "disconnect",
  "disconnecting",
  "newListener",
  "removeListener"
  // used by the Node.js EventEmitter
], f_ = 5;
var at;
(function(i) {
  i[i.CONNECT = 0] = "CONNECT", i[i.DISCONNECT = 1] = "DISCONNECT", i[i.EVENT = 2] = "EVENT", i[i.ACK = 3] = "ACK", i[i.CONNECT_ERROR = 4] = "CONNECT_ERROR", i[i.BINARY_EVENT = 5] = "BINARY_EVENT", i[i.BINARY_ACK = 6] = "BINARY_ACK";
})(at || (at = {}));
class c_ {
  /**
   * Encoder constructor
   *
   * @param {function} replacer - custom replacer to pass down to JSON.parse
   */
  constructor(t) {
    this.replacer = t;
  }
  /**
   * Encode a packet as a single string if non-binary, or as a
   * buffer sequence, depending on packet type.
   *
   * @param {Object} obj - packet object
   */
  encode(t) {
    return (t.type === at.EVENT || t.type === at.ACK) && ni(t) ? this.encodeAsBinary({
      type: t.type === at.EVENT ? at.BINARY_EVENT : at.BINARY_ACK,
      nsp: t.nsp,
      data: t.data,
      id: t.id
    }) : [this.encodeAsString(t)];
  }
  /**
   * Encode packet as string.
   */
  encodeAsString(t) {
    let e = "" + t.type;
    return (t.type === at.BINARY_EVENT || t.type === at.BINARY_ACK) && (e += t.attachments + "-"), t.nsp && t.nsp !== "/" && (e += t.nsp + ","), t.id != null && (e += t.id), t.data != null && (e += JSON.stringify(t.data, this.replacer)), e;
  }
  /**
   * Encode packet as 'buffer sequence' by removing blobs, and
   * deconstructing packet into object with placeholders and
   * a list of buffers.
   */
  encodeAsBinary(t) {
    const e = h_(t), r = this.encodeAsString(e.packet), n = e.buffers;
    return n.unshift(r), n;
  }
}
function za(i) {
  return Object.prototype.toString.call(i) === "[object Object]";
}
class Os extends Ct {
  /**
   * Decoder constructor
   *
   * @param {function} reviver - custom reviver to pass down to JSON.stringify
   */
  constructor(t) {
    super(), this.reviver = t;
  }
  /**
   * Decodes an encoded packet string into packet JSON.
   *
   * @param {String} obj - encoded packet
   */
  add(t) {
    let e;
    if (typeof t == "string") {
      if (this.reconstructor)
        throw new Error("got plaintext data when reconstructing a packet");
      e = this.decodeString(t);
      const r = e.type === at.BINARY_EVENT;
      r || e.type === at.BINARY_ACK ? (e.type = r ? at.EVENT : at.ACK, this.reconstructor = new d_(e), e.attachments === 0 && super.emitReserved("decoded", e)) : super.emitReserved("decoded", e);
    } else if (Rs(t) || t.base64)
      if (this.reconstructor)
        e = this.reconstructor.takeBinaryData(t), e && (this.reconstructor = null, super.emitReserved("decoded", e));
      else
        throw new Error("got binary data when not reconstructing a packet");
    else
      throw new Error("Unknown type: " + t);
  }
  /**
   * Decode a packet String (JSON data)
   *
   * @param {String} str
   * @return {Object} packet
   */
  decodeString(t) {
    let e = 0;
    const r = {
      type: Number(t.charAt(0))
    };
    if (at[r.type] === void 0)
      throw new Error("unknown packet type " + r.type);
    if (r.type === at.BINARY_EVENT || r.type === at.BINARY_ACK) {
      const s = e + 1;
      for (; t.charAt(++e) !== "-" && e != t.length; )
        ;
      const a = t.substring(s, e);
      if (a != Number(a) || t.charAt(e) !== "-")
        throw new Error("Illegal attachments");
      r.attachments = Number(a);
    }
    if (t.charAt(e + 1) === "/") {
      const s = e + 1;
      for (; ++e && !(t.charAt(e) === "," || e === t.length); )
        ;
      r.nsp = t.substring(s, e);
    } else
      r.nsp = "/";
    const n = t.charAt(e + 1);
    if (n !== "" && Number(n) == n) {
      const s = e + 1;
      for (; ++e; ) {
        const a = t.charAt(e);
        if (a == null || Number(a) != a) {
          --e;
          break;
        }
        if (e === t.length)
          break;
      }
      r.id = Number(t.substring(s, e + 1));
    }
    if (t.charAt(++e)) {
      const s = this.tryParse(t.substr(e));
      if (Os.isPayloadValid(r.type, s))
        r.data = s;
      else
        throw new Error("invalid payload");
    }
    return r;
  }
  tryParse(t) {
    try {
      return JSON.parse(t, this.reviver);
    } catch {
      return !1;
    }
  }
  static isPayloadValid(t, e) {
    switch (t) {
      case at.CONNECT:
        return za(e);
      case at.DISCONNECT:
        return e === void 0;
      case at.CONNECT_ERROR:
        return typeof e == "string" || za(e);
      case at.EVENT:
      case at.BINARY_EVENT:
        return Array.isArray(e) && (typeof e[0] == "number" || typeof e[0] == "string" && l_.indexOf(e[0]) === -1);
      case at.ACK:
      case at.BINARY_ACK:
        return Array.isArray(e);
    }
  }
  /**
   * Deallocates a parser's resources
   */
  destroy() {
    this.reconstructor && (this.reconstructor.finishedReconstruction(), this.reconstructor = null);
  }
}
class d_ {
  constructor(t) {
    this.packet = t, this.buffers = [], this.reconPack = t;
  }
  /**
   * Method to be called when binary data received from connection
   * after a BINARY_EVENT packet.
   *
   * @param {Buffer | ArrayBuffer} binData - the raw binary data received
   * @return {null | Object} returns null if more binary data is expected or
   *   a reconstructed packet object if all buffers have been received.
   */
  takeBinaryData(t) {
    if (this.buffers.push(t), this.buffers.length === this.reconPack.attachments) {
      const e = u_(this.reconPack, this.buffers);
      return this.finishedReconstruction(), e;
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
const p_ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Decoder: Os,
  Encoder: c_,
  get PacketType() {
    return at;
  },
  protocol: f_
}, Symbol.toStringTag, { value: "Module" }));
function Wt(i, t, e) {
  return i.on(t, e), function() {
    i.off(t, e);
  };
}
const v_ = Object.freeze({
  connect: 1,
  connect_error: 1,
  disconnect: 1,
  disconnecting: 1,
  // EventEmitter reserved events: https://nodejs.org/api/events.html#events_event_newlistener
  newListener: 1,
  removeListener: 1
});
class lh extends Ct {
  /**
   * `Socket` constructor.
   */
  constructor(t, e, r) {
    super(), this.connected = !1, this.recovered = !1, this.receiveBuffer = [], this.sendBuffer = [], this._queue = [], this._queueSeq = 0, this.ids = 0, this.acks = {}, this.flags = {}, this.io = t, this.nsp = e, r && r.auth && (this.auth = r.auth), this._opts = Object.assign({}, r), this.io._autoConnect && this.open();
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
    const t = this.io;
    this.subs = [
      Wt(t, "open", this.onopen.bind(this)),
      Wt(t, "packet", this.onpacket.bind(this)),
      Wt(t, "error", this.onerror.bind(this)),
      Wt(t, "close", this.onclose.bind(this))
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
  send(...t) {
    return t.unshift("message"), this.emit.apply(this, t), this;
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
  emit(t, ...e) {
    var r, n, s;
    if (v_.hasOwnProperty(t))
      throw new Error('"' + t.toString() + '" is a reserved event name');
    if (e.unshift(t), this._opts.retries && !this.flags.fromQueue && !this.flags.volatile)
      return this._addToQueue(e), this;
    const a = {
      type: at.EVENT,
      data: e
    };
    if (a.options = {}, a.options.compress = this.flags.compress !== !1, typeof e[e.length - 1] == "function") {
      const l = this.ids++, f = e.pop();
      this._registerAckCallback(l, f), a.id = l;
    }
    const o = (n = (r = this.io.engine) === null || r === void 0 ? void 0 : r.transport) === null || n === void 0 ? void 0 : n.writable, h = this.connected && !(!((s = this.io.engine) === null || s === void 0) && s._hasPingExpired());
    return this.flags.volatile && !o || (h ? (this.notifyOutgoingListeners(a), this.packet(a)) : this.sendBuffer.push(a)), this.flags = {}, this;
  }
  /**
   * @private
   */
  _registerAckCallback(t, e) {
    var r;
    const n = (r = this.flags.timeout) !== null && r !== void 0 ? r : this._opts.ackTimeout;
    if (n === void 0) {
      this.acks[t] = e;
      return;
    }
    const s = this.io.setTimeoutFn(() => {
      delete this.acks[t];
      for (let o = 0; o < this.sendBuffer.length; o++)
        this.sendBuffer[o].id === t && this.sendBuffer.splice(o, 1);
      e.call(this, new Error("operation has timed out"));
    }, n), a = (...o) => {
      this.io.clearTimeoutFn(s), e.apply(this, o);
    };
    a.withError = !0, this.acks[t] = a;
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
  emitWithAck(t, ...e) {
    return new Promise((r, n) => {
      const s = (a, o) => a ? n(a) : r(o);
      s.withError = !0, e.push(s), this.emit(t, ...e);
    });
  }
  /**
   * Add the packet to the queue.
   * @param args
   * @private
   */
  _addToQueue(t) {
    let e;
    typeof t[t.length - 1] == "function" && (e = t.pop());
    const r = {
      id: this._queueSeq++,
      tryCount: 0,
      pending: !1,
      args: t,
      flags: Object.assign({ fromQueue: !0 }, this.flags)
    };
    t.push((n, ...s) => r !== this._queue[0] ? void 0 : (n !== null ? r.tryCount > this._opts.retries && (this._queue.shift(), e && e(n)) : (this._queue.shift(), e && e(null, ...s)), r.pending = !1, this._drainQueue())), this._queue.push(r), this._drainQueue();
  }
  /**
   * Send the first packet of the queue, and wait for an acknowledgement from the server.
   * @param force - whether to resend a packet that has not been acknowledged yet
   *
   * @private
   */
  _drainQueue(t = !1) {
    if (!this.connected || this._queue.length === 0)
      return;
    const e = this._queue[0];
    e.pending && !t || (e.pending = !0, e.tryCount++, this.flags = e.flags, this.emit.apply(this, e.args));
  }
  /**
   * Sends a packet.
   *
   * @param packet
   * @private
   */
  packet(t) {
    t.nsp = this.nsp, this.io._packet(t);
  }
  /**
   * Called upon engine `open`.
   *
   * @private
   */
  onopen() {
    typeof this.auth == "function" ? this.auth((t) => {
      this._sendConnectPacket(t);
    }) : this._sendConnectPacket(this.auth);
  }
  /**
   * Sends a CONNECT packet to initiate the Socket.IO session.
   *
   * @param data
   * @private
   */
  _sendConnectPacket(t) {
    this.packet({
      type: at.CONNECT,
      data: this._pid ? Object.assign({ pid: this._pid, offset: this._lastOffset }, t) : t
    });
  }
  /**
   * Called upon engine or manager `error`.
   *
   * @param err
   * @private
   */
  onerror(t) {
    this.connected || this.emitReserved("connect_error", t);
  }
  /**
   * Called upon engine `close`.
   *
   * @param reason
   * @param description
   * @private
   */
  onclose(t, e) {
    this.connected = !1, delete this.id, this.emitReserved("disconnect", t, e), this._clearAcks();
  }
  /**
   * Clears the acknowledgement handlers upon disconnection, since the client will never receive an acknowledgement from
   * the server.
   *
   * @private
   */
  _clearAcks() {
    Object.keys(this.acks).forEach((t) => {
      if (!this.sendBuffer.some((r) => String(r.id) === t)) {
        const r = this.acks[t];
        delete this.acks[t], r.withError && r.call(this, new Error("socket has been disconnected"));
      }
    });
  }
  /**
   * Called with socket packet.
   *
   * @param packet
   * @private
   */
  onpacket(t) {
    if (t.nsp === this.nsp)
      switch (t.type) {
        case at.CONNECT:
          t.data && t.data.sid ? this.onconnect(t.data.sid, t.data.pid) : this.emitReserved("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
          break;
        case at.EVENT:
        case at.BINARY_EVENT:
          this.onevent(t);
          break;
        case at.ACK:
        case at.BINARY_ACK:
          this.onack(t);
          break;
        case at.DISCONNECT:
          this.ondisconnect();
          break;
        case at.CONNECT_ERROR:
          this.destroy();
          const r = new Error(t.data.message);
          r.data = t.data.data, this.emitReserved("connect_error", r);
          break;
      }
  }
  /**
   * Called upon a server event.
   *
   * @param packet
   * @private
   */
  onevent(t) {
    const e = t.data || [];
    t.id != null && e.push(this.ack(t.id)), this.connected ? this.emitEvent(e) : this.receiveBuffer.push(Object.freeze(e));
  }
  emitEvent(t) {
    if (this._anyListeners && this._anyListeners.length) {
      const e = this._anyListeners.slice();
      for (const r of e)
        r.apply(this, t);
    }
    super.emit.apply(this, t), this._pid && t.length && typeof t[t.length - 1] == "string" && (this._lastOffset = t[t.length - 1]);
  }
  /**
   * Produces an ack callback to emit with an event.
   *
   * @private
   */
  ack(t) {
    const e = this;
    let r = !1;
    return function(...n) {
      r || (r = !0, e.packet({
        type: at.ACK,
        id: t,
        data: n
      }));
    };
  }
  /**
   * Called upon a server acknowledgement.
   *
   * @param packet
   * @private
   */
  onack(t) {
    const e = this.acks[t.id];
    typeof e == "function" && (delete this.acks[t.id], e.withError && t.data.unshift(null), e.apply(this, t.data));
  }
  /**
   * Called upon server connect.
   *
   * @private
   */
  onconnect(t, e) {
    this.id = t, this.recovered = e && this._pid === e, this._pid = e, this.connected = !0, this.emitBuffered(), this.emitReserved("connect"), this._drainQueue(!0);
  }
  /**
   * Emit buffered events (received and emitted).
   *
   * @private
   */
  emitBuffered() {
    this.receiveBuffer.forEach((t) => this.emitEvent(t)), this.receiveBuffer = [], this.sendBuffer.forEach((t) => {
      this.notifyOutgoingListeners(t), this.packet(t);
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
    this.subs && (this.subs.forEach((t) => t()), this.subs = void 0), this.io._destroy(this);
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
    return this.connected && this.packet({ type: at.DISCONNECT }), this.destroy(), this.connected && this.onclose("io client disconnect"), this;
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
  compress(t) {
    return this.flags.compress = t, this;
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
  timeout(t) {
    return this.flags.timeout = t, this;
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
  onAny(t) {
    return this._anyListeners = this._anyListeners || [], this._anyListeners.push(t), this;
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
  prependAny(t) {
    return this._anyListeners = this._anyListeners || [], this._anyListeners.unshift(t), this;
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
  offAny(t) {
    if (!this._anyListeners)
      return this;
    if (t) {
      const e = this._anyListeners;
      for (let r = 0; r < e.length; r++)
        if (t === e[r])
          return e.splice(r, 1), this;
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
  onAnyOutgoing(t) {
    return this._anyOutgoingListeners = this._anyOutgoingListeners || [], this._anyOutgoingListeners.push(t), this;
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
  prependAnyOutgoing(t) {
    return this._anyOutgoingListeners = this._anyOutgoingListeners || [], this._anyOutgoingListeners.unshift(t), this;
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
  offAnyOutgoing(t) {
    if (!this._anyOutgoingListeners)
      return this;
    if (t) {
      const e = this._anyOutgoingListeners;
      for (let r = 0; r < e.length; r++)
        if (t === e[r])
          return e.splice(r, 1), this;
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
  notifyOutgoingListeners(t) {
    if (this._anyOutgoingListeners && this._anyOutgoingListeners.length) {
      const e = this._anyOutgoingListeners.slice();
      for (const r of e)
        r.apply(this, t.data);
    }
  }
}
function tr(i) {
  i = i || {}, this.ms = i.min || 100, this.max = i.max || 1e4, this.factor = i.factor || 2, this.jitter = i.jitter > 0 && i.jitter <= 1 ? i.jitter : 0, this.attempts = 0;
}
tr.prototype.duration = function() {
  var i = this.ms * Math.pow(this.factor, this.attempts++);
  if (this.jitter) {
    var t = Math.random(), e = Math.floor(t * this.jitter * i);
    i = Math.floor(t * 10) & 1 ? i + e : i - e;
  }
  return Math.min(i, this.max) | 0;
};
tr.prototype.reset = function() {
  this.attempts = 0;
};
tr.prototype.setMin = function(i) {
  this.ms = i;
};
tr.prototype.setMax = function(i) {
  this.max = i;
};
tr.prototype.setJitter = function(i) {
  this.jitter = i;
};
class Zn extends Ct {
  constructor(t, e) {
    var r;
    super(), this.nsps = {}, this.subs = [], t && typeof t == "object" && (e = t, t = void 0), e = e || {}, e.path = e.path || "/socket.io", this.opts = e, Ci(this, e), this.reconnection(e.reconnection !== !1), this.reconnectionAttempts(e.reconnectionAttempts || 1 / 0), this.reconnectionDelay(e.reconnectionDelay || 1e3), this.reconnectionDelayMax(e.reconnectionDelayMax || 5e3), this.randomizationFactor((r = e.randomizationFactor) !== null && r !== void 0 ? r : 0.5), this.backoff = new tr({
      min: this.reconnectionDelay(),
      max: this.reconnectionDelayMax(),
      jitter: this.randomizationFactor()
    }), this.timeout(e.timeout == null ? 2e4 : e.timeout), this._readyState = "closed", this.uri = t;
    const n = e.parser || p_;
    this.encoder = new n.Encoder(), this.decoder = new n.Decoder(), this._autoConnect = e.autoConnect !== !1, this._autoConnect && this.open();
  }
  reconnection(t) {
    return arguments.length ? (this._reconnection = !!t, t || (this.skipReconnect = !0), this) : this._reconnection;
  }
  reconnectionAttempts(t) {
    return t === void 0 ? this._reconnectionAttempts : (this._reconnectionAttempts = t, this);
  }
  reconnectionDelay(t) {
    var e;
    return t === void 0 ? this._reconnectionDelay : (this._reconnectionDelay = t, (e = this.backoff) === null || e === void 0 || e.setMin(t), this);
  }
  randomizationFactor(t) {
    var e;
    return t === void 0 ? this._randomizationFactor : (this._randomizationFactor = t, (e = this.backoff) === null || e === void 0 || e.setJitter(t), this);
  }
  reconnectionDelayMax(t) {
    var e;
    return t === void 0 ? this._reconnectionDelayMax : (this._reconnectionDelayMax = t, (e = this.backoff) === null || e === void 0 || e.setMax(t), this);
  }
  timeout(t) {
    return arguments.length ? (this._timeout = t, this) : this._timeout;
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
  open(t) {
    if (~this._readyState.indexOf("open"))
      return this;
    this.engine = new r_(this.uri, this.opts);
    const e = this.engine, r = this;
    this._readyState = "opening", this.skipReconnect = !1;
    const n = Wt(e, "open", function() {
      r.onopen(), t && t();
    }), s = (o) => {
      this.cleanup(), this._readyState = "closed", this.emitReserved("error", o), t ? t(o) : this.maybeReconnectOnOpen();
    }, a = Wt(e, "error", s);
    if (this._timeout !== !1) {
      const o = this._timeout, h = this.setTimeoutFn(() => {
        n(), s(new Error("timeout")), e.close();
      }, o);
      this.opts.autoUnref && h.unref(), this.subs.push(() => {
        this.clearTimeoutFn(h);
      });
    }
    return this.subs.push(n), this.subs.push(a), this;
  }
  /**
   * Alias for open()
   *
   * @return self
   * @public
   */
  connect(t) {
    return this.open(t);
  }
  /**
   * Called upon transport open.
   *
   * @private
   */
  onopen() {
    this.cleanup(), this._readyState = "open", this.emitReserved("open");
    const t = this.engine;
    this.subs.push(
      Wt(t, "ping", this.onping.bind(this)),
      Wt(t, "data", this.ondata.bind(this)),
      Wt(t, "error", this.onerror.bind(this)),
      Wt(t, "close", this.onclose.bind(this)),
      // @ts-ignore
      Wt(this.decoder, "decoded", this.ondecoded.bind(this))
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
  ondata(t) {
    try {
      this.decoder.add(t);
    } catch (e) {
      this.onclose("parse error", e);
    }
  }
  /**
   * Called when parser fully decodes a packet.
   *
   * @private
   */
  ondecoded(t) {
    Mi(() => {
      this.emitReserved("packet", t);
    }, this.setTimeoutFn);
  }
  /**
   * Called upon socket error.
   *
   * @private
   */
  onerror(t) {
    this.emitReserved("error", t);
  }
  /**
   * Creates a new socket for the given `nsp`.
   *
   * @return {Socket}
   * @public
   */
  socket(t, e) {
    let r = this.nsps[t];
    return r ? this._autoConnect && !r.active && r.connect() : (r = new lh(this, t, e), this.nsps[t] = r), r;
  }
  /**
   * Called upon a socket close.
   *
   * @param socket
   * @private
   */
  _destroy(t) {
    const e = Object.keys(this.nsps);
    for (const r of e)
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
  _packet(t) {
    const e = this.encoder.encode(t);
    for (let r = 0; r < e.length; r++)
      this.engine.write(e[r], t.options);
  }
  /**
   * Clean up transport subscriptions and packet buffer.
   *
   * @private
   */
  cleanup() {
    this.subs.forEach((t) => t()), this.subs.length = 0, this.decoder.destroy();
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
  onclose(t, e) {
    var r;
    this.cleanup(), (r = this.engine) === null || r === void 0 || r.close(), this.backoff.reset(), this._readyState = "closed", this.emitReserved("close", t, e), this._reconnection && !this.skipReconnect && this.reconnect();
  }
  /**
   * Attempt a reconnection.
   *
   * @private
   */
  reconnect() {
    if (this._reconnecting || this.skipReconnect)
      return this;
    const t = this;
    if (this.backoff.attempts >= this._reconnectionAttempts)
      this.backoff.reset(), this.emitReserved("reconnect_failed"), this._reconnecting = !1;
    else {
      const e = this.backoff.duration();
      this._reconnecting = !0;
      const r = this.setTimeoutFn(() => {
        t.skipReconnect || (this.emitReserved("reconnect_attempt", t.backoff.attempts), !t.skipReconnect && t.open((n) => {
          n ? (t._reconnecting = !1, t.reconnect(), this.emitReserved("reconnect_error", n)) : t.onreconnect();
        }));
      }, e);
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
    const t = this.backoff.attempts;
    this._reconnecting = !1, this.backoff.reset(), this.emitReserved("reconnect", t);
  }
}
const lr = {};
function si(i, t) {
  typeof i == "object" && (t = i, i = void 0), t = t || {};
  const e = i_(i, t.path || "/socket.io"), r = e.source, n = e.id, s = e.path, a = lr[n] && s in lr[n].nsps, o = t.forceNew || t["force new connection"] || t.multiplex === !1 || a;
  let h;
  return o ? h = new Zn(r, t) : (lr[n] || (lr[n] = new Zn(r, t)), h = lr[n]), e.query && !t.query && (t.query = e.queryKey), h.socket(e.path, t);
}
Object.assign(si, {
  Manager: Zn,
  Socket: lh,
  io: si,
  connect: si
});
class pr {
  constructor(t = {}, e) {
    this.hPlg = t, this.arg = e;
  }
  hFactoryCls = {};
  elc = new bv();
  async loaded(...[t]) {
    const e = t.snsys_pre;
    return delete t.snsys_pre, e?.init({
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
      setDec: (r) => this.dec = r,
      setDecAB: (r) => this.#m = r,
      setEnc: (r) => this.enc = r,
      getStK: (r) => this.stk = r,
      getHash: (r) => this.hash = r
    });
  }
  fetch = (t, e) => fetch(t, e);
  destroy() {
    this.elc.clear();
  }
  resolution = 1;
  cfg;
  async loadPath(t, e) {
    this.cfg = e;
  }
  data = { sys: {}, mark: {}, kidoku: {} };
  async initVal(t, e, r) {
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
  async run() {
  }
  val;
  main;
  init(t, e, r, n) {
    this.val = r, this.main = n;
    let s = "";
    try {
      r.setSys(this), s = "sys", s += Number(r.getVal("sys:TextLayer.Back.Alpha", 1)), s = "kidoku", r.saveKidoku();
    } catch (a) {
      console.error(`セーブデータ（${s}）が壊れています。一度クリアする必要があります(b) %o`, a);
    }
    return t.close = (a) => this.close(a), t.export = (a) => this._export(a), t.import = (a) => this._import(a), t.navigate_to = (a) => this.navigate_to(a), t.title = (a) => this.title(a), t.toggle_full_screen = (a) => this.#y(a), t.update_check = (a) => this.update_check(a), t.window = (a) => this.window(a), r.setVal_Nochk("tmp", "const.sn.isApp", () => this.isApp), r.setVal_Nochk("tmp", "const.sn.isDbg", () => j.isDbg), r.setVal_Nochk("tmp", "const.sn.isPackaged", () => j.isPackaged), r.defTmp("const.sn.displayState", () => this.isFullScr), r.setVal_Nochk("sys", pr.VALNM_CFG_NS, this.cfg.oCfg.save_ns), r.flush(), j.isDbg && this.attach_debug(n), this.hFactoryCls = {}, Object.values(this.hPlg).map((a) => a.init({
      getInfo: this.#i,
      addTag: (o, h) => {
        if (t[o]) throw `すでに定義済みのタグ[${o}]です`;
        t[o] = h;
      },
      addLayCls: (o, h) => {
        if (this.hFactoryCls[o]) throw `すでに定義済みのレイヤcls【${o}】です`;
        this.hFactoryCls[o] = h;
      },
      searchPath: (o, h = Tr.DEFAULT) => this.cfg.searchPath(o, h),
      getVal: r.getVal,
      resume: () => n.resume(),
      render: (o, h, u = !1) => e.renderer.render(o, { renderTexture: h, clear: u }),
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
    }));
  }
  static VALNM_CFG_NS = "const.sn.cfg.ns";
  #i = () => ({
    window: {
      width: j.stageW,
      height: j.stageH
    }
  });
  #r = 0;
  #a = 0;
  #s = 1;
  #o = 0;
  #h = 0;
  #u = 0;
  #n = 0;
  get cvsWidth() {
    return this.#r;
  }
  get cvsHeight() {
    return this.#a;
  }
  get cvsScale() {
    return this.#s;
  }
  get ofsLeft4elm() {
    return this.#o;
  }
  get ofsTop4elm() {
    return this.#h;
  }
  get ofsPadLeft_Dom2PIXI() {
    return this.#u;
  }
  get ofsPadTop_Dom2PIXI() {
    return this.#n;
  }
  isFullScr = !1;
  cvsResize() {
    let t = globalThis.innerWidth, e = globalThis.innerHeight;
    const r = this.main.cvs, n = r.parentElement !== document.body;
    if (n) {
      const h = globalThis.getComputedStyle(r);
      t = parseFloat(h.width), e = parseFloat(h.height);
    }
    if (j.isMobile) {
      const u = (screen.orientation?.angle ?? 0) % 180 === 0;
      (u && t > e || !u && t < e) && ([t, e] = [e, t]);
    }
    const s = r.getBoundingClientRect();
    if (vt(j.hDip, "expanding", !0) || n || j.stageW > t || j.stageH > e)
      if (j.stageW / j.stageH <= t / e ? (this.#a = e, this.#r = j.stageW / j.stageH * e) : (this.#r = t, this.#a = j.stageH / j.stageW * t), this.#s = this.#r / j.stageW, n)
        this.#u = 0, this.#n = 0;
      else {
        const h = 1 - this.#s;
        j.isMobile ? (this.#u = (t - this.#r) / 2 * h, this.#n = (e - this.#a) / 2 * h) : (this.#u = s.left * h, this.#n = s.top * h);
      }
    else
      this.#r = j.stageW, this.#a = j.stageH, this.#s = 1, this.#u = 0, this.#n = 0;
    const a = r.parentElement.style;
    n || (a.position = "relative", a.width = `${this.#r}px`, a.height = `${this.#a}px`);
    const o = r.style;
    o.width = a.width, o.height = a.height, n ? (this.#o = s.left, this.#h = s.top) : (this.#o = 0, this.#h = 0), this.isFullScr && (this.#o += (t - this.#r) / 2, this.#h += (e - this.#a) / 2);
  }
  // デバッガ接続
  attach_debug(t) {
    this.attach_debug = () => {
    };
    const e = document.createElement("style");
    e.innerHTML = `/* SKYNovel Dbg */
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
}`, document.getElementsByTagName("head")[0].appendChild(e), this.addHook((r, n) => this.#f[r]?.(n)), this.#l = si(`http://localhost:${this.extPort}`), this.#l.on("data", (r, n) => {
      this.callHook(r, n);
    }).on("disconnect", () => t.setLoop(!0)), this.callHook = (r, n) => {
      for (const s of this.#_) s(r, n);
    };
  }
  extPort = 3776;
  end() {
    this.#l?.disconnect(), this.#l = void 0;
  }
  #l = void 0;
  #f = {
    auth: (t) => {
      if (t.t !== this.cfg.oCfg.debuger_token) {
        this.end();
        return;
      }
      this.toast("接続");
    },
    continue: () => this.toast("再生"),
    disconnect: () => this.toast("切断"),
    restart: async (t) => {
      this.send2Dbg(t?.ri ?? "", {}), this.end(), await this.run();
    },
    pause: () => this.toast("一時停止"),
    stopOnEntry: () => this.toast("一時停止"),
    stopOnDataBreakpoint: () => this.toast("注意"),
    stopOnBreakpoint: () => this.toast("注意"),
    stopOnStep: () => this.toast("一歩進む"),
    stopOnStepIn: () => this.toast("ステップイン"),
    stopOnStepOut: () => this.toast("ステップアウト"),
    stopOnBackstep: () => this.toast("一歩戻る"),
    _addPath: (t) => this.cfg.addPath(t.fn, t.o)
  };
  toast(t) {
    const e = document.body;
    for (const a of [
      ...Array.from(e.getElementsByClassName("sn_BounceIn")),
      ...Array.from(e.getElementsByClassName("sn_HopIn"))
    ]) a.remove();
    const r = document.createElement("img"), n = pr.#g[t];
    if (!n) throw new Error(`toast 名ミス=${t}`);
    r.src = `data:image/svg+xml;base64,${n.dat}`;
    const s = Math.min(j.stageW, j.stageH) / 4 * this.#s;
    r.width = r.height = s, r.style.cssText = `position: absolute;
left: ${(j.stageW - s) / 2 * this.#s + s * (n.dx ?? 0)}px;
top: ${(j.stageH - s) / 2 * this.#s + s * (n.dy ?? 0)}px;`, r.classList.add("sn_toast", n.ease ?? "sn_BounceInOut"), n.ease || r.addEventListener("animationend", () => e.removeChild(r), { once: !0, passive: !0 }), e.insertBefore(r, this.main.cvs);
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
  setFire(t) {
    this.fire = t;
  }
  #_ = [];
  addHook(t) {
    this.#_.push(t);
  }
  callHook = (t, e) => {
  };
  send2Dbg = (t, e) => {
    this.#l?.emit("data", t, e);
  };
  copyBMFolder = (t, e) => {
  };
  eraseBMFolder = (t) => {
  };
  close = () => !1;
  _export = () => !1;
  _import = () => !1;
  navigate_to = () => !1;
  title = (t) => {
    const { text: e } = t;
    if (!e) throw "[title] textは必須です";
    return this.#d = e, this.titleSub(this.#d + this.#p), !1;
  };
  #d = "";
  titleSub(t) {
  }
  #y = (t) => {
    if (!t.key)
      return this.tglFlscr_sub(), !1;
    const e = t.key.toLowerCase();
    return this.elc.add(document, "keydown", (r) => {
      pr.modKey(r) + r.key.toLowerCase() === e && (r.stopPropagation(), this.tglFlscr_sub());
    }, { passive: !0 }), !1;
  };
  static modKey(t) {
    return (t.altKey ? t.key === "Alt" ? "" : "alt+" : "") + (t.ctrlKey ? t.key === "Control" ? "" : "ctrl+" : "") + (t.metaKey ? t.key === "Meta" ? "" : "meta+" : "") + (t.shiftKey ? t.key === "Shift" ? "" : "shift+" : "");
  }
  tglFlscr_sub() {
  }
  update_check = () => !1;
  window = () => !1;
  #p = "";
  setTitleInfo(t) {
    this.#p = t, this.titleSub(this.#d + this.#p);
  }
  #m = () => Promise.resolve({ ext_num: 0, ab: new ArrayBuffer(0) });
  dec = (t, e) => Promise.resolve(e);
  async decAB(t) {
    const { ext_num: e, ab: r } = await this.#m(t), n = this.#b[e];
    return n?.fnc ? await n.fnc(r) : r;
  }
  #b = {
    1: { ext: "jpeg", fnc: (t) => this.#c(t, "image/jpeg") },
    2: { ext: "png", fnc: (t) => this.#c(t, "image/png") },
    3: { ext: "svg", fnc: (t) => this.#c(t, "image/svg+xml") },
    4: { ext: "webp", fnc: (t) => this.#c(t, "image/webp") },
    //	10	: {ext: 'mp3', fnc: async ab=> ab},
    //	11	: {ext: 'm4a', fnc: async ab=> ab},
    //	12	: {ext: 'ogg', fnc: async ab=> ab},
    //	13	: {ext: 'aac', fnc: async ab=> ab},
    //	14	: {ext: 'flac', fnc: async ab=> ab},
    //	15	: {ext: 'wav', fnc: async ab=> ab},
    20: { ext: "mp4", fnc: (t) => this.#v(t, "video/mp4") },
    21: { ext: "webm", fnc: (t) => this.#v(t, "video/webm") },
    22: { ext: "ogv", fnc: (t) => this.#v(t, "video/ogv") }
  };
  #c = (t, e) => new Promise((r, n) => {
    const s = new Blob([t], { type: e }), a = new Image();
    a.onload = () => r(a), a.onerror = (o) => n(o), a.src = URL.createObjectURL(s);
  });
  #v = (t, e) => new Promise((r, n) => {
    const s = new Blob([t], { type: e }), a = document.createElement("video");
    this.elc.add(a, "error", () => n(a?.error?.message ?? "")), this.elc.add(a, "canplay", () => r(a)), a.src = URL.createObjectURL(s);
  });
  enc = async (t) => t;
  stk = () => "";
  hash = (t) => "";
  isApp = !1;
  $path_downloads = "";
  get path_downloads() {
    return this.$path_downloads;
  }
  $path_userdata = "";
  get path_userdata() {
    return this.$path_userdata;
  }
  capturePage(t, e, r, n) {
  }
  async savePic(t, e) {
  }
  async ensureFileSync(t) {
  }
  async appendFile(t, e) {
  }
  async outputFile(t, e) {
  }
}
class __ extends pr {
  async loadPath(t, e) {
    await super.loadPath(t, e);
    const r = this.arg.cur + "path.json", n = await (await this.fetch(r)).text(), s = JSON.parse(await this.dec(r, n));
    for (const [a, o] of Object.entries(s)) {
      const h = t[a] = o;
      for (const [u, l] of Object.entries(h))
        u !== ":cnt" && (h[u] = this.arg.cur + l);
    }
  }
  init(t, e, r, n) {
    const s = super.init(t, e, r, n);
    return document.body.style.backgroundColor = "#000", s;
  }
  isApp = !0;
  async savePic(t, e) {
    const r = e.slice(e.indexOf(",", 20) + 1);
    try {
      this.ensureFileSync(t), await this.writeFileSync(t, r), j.debugLog && console.log(`画像ファイル ${t} を保存しました`);
    } catch (n) {
      throw n;
    }
  }
  async readFileSync(t) {
    return "";
  }
  async writeFileSync(t, e, r) {
  }
}
class rt {
  constructor(t, e, r) {
    this.sys = t, rt.#t = r, rt.#e = e, rt.#i = e.title, rt.myTrace = rt.#h, e.log = (n) => this.#s(n), e.trace = (n) => this.#o(n), rt.#r = document.createElement("span"), rt.#r.hidden = !0, rt.#r.textContent = "", rt.#r.style.cssText = `	z-index: ${Number.MAX_SAFE_INTEGER};
			position: absolute; left: 0; top: 0;
			color: black;
			background-color: rgba(255, 255, 255, 0.7);`, document.body.appendChild(rt.#r);
  }
  static #t;
  static #e;
  static #i;
  static #r;
  destroy() {
    rt.#i = () => !1, document.body.removeChild(rt.#r), rt.myTrace = rt.trace_beforeNew;
  }
  // ログ出力
  #a = !0;
  #s(t) {
    let e = "";
    return this.#a && (this.#a = !1, e = `== ${mh.description} ==
`), this.sys.appendFile(
      this.sys.path_downloads + "log.txt",
      `${e}--- ${Ya("-", "_", "")} [fn:${rt.#t.scriptFn} line:${rt.#t.lineNum}] prj:${this.sys.arg.cur}
${t.text || `(text is ${t.text})`}
`
    ), !1;
  }
  #o(t) {
    return rt.myTrace(t.text || `(text is ${t.text})`, "I"), !1;
  }
  // private禁止、galleryでエラーになる
  static trace_beforeNew = (t, e = "E") => {
    let r = `{${e}} ` + t, n = "";
    switch (e) {
      case "D":
        n = `color:#${j.isDarkMode ? "49F" : "05A"};`;
        break;
      case "W":
        n = "color:#FF8800;";
        break;
      case "F":
        n = "color:#BB0000;";
        break;
      case "ET":
        throw r;
      case "E":
        console.error("%c" + r, "color:#FF3300;");
        return;
      default:
        n = "color:black;", r = " " + r;
    }
    console.info("%c" + r, n);
  };
  static myTrace = rt.trace_beforeNew;
  static strPos = () => rt.#t.lineNum > 0 ? `(fn:${rt.#t.scriptFn} line:${rt.#t.lineNum}) ` : "";
  static #h = (t, e = "E") => {
    let r = `{${e}} ` + rt.strPos() + t;
    rt.#u(r, e);
    let n = "";
    switch (e) {
      case "D":
        n = `color:#${j.isDarkMode ? "49F" : "05A"};`;
        break;
      case "W":
        n = "color:#F80;";
        break;
      case "F":
        n = "color:#B00;";
        break;
      case "ET":
      case "E":
        if (rt.#i({ text: t }), this.#e.dump_lay({}), this.#e.dump_val({}), rt.#t.dumpErrForeLine(), this.#e.dump_stack({}), e === "ET") throw r;
        console.error("%c" + r, "color:#F30;");
        return;
      default:
        n = "", r = " " + r;
    }
    console.info("%c" + r, n);
  };
  static #u = (t, e) => {
    let r = "";
    switch (e) {
      case "D":
        r = "color:#05A;";
        break;
      case "W":
        r = "color:#F80;";
        break;
      case "F":
        r = "color:#B00;";
        break;
      case "ET":
      case "E":
        r = "color:#F30;";
        break;
      default:
        r = "";
    }
    rt.#r.innerHTML += `<span style='${r}'>${t}</span><br/>`, rt.#r.hidden = !1;
  };
}
class Ns extends Tv {
  constructor(t) {
    super(t), this.sys = t;
  }
  static async generate(t) {
    const e = new Ns(t), r = t.arg.cur + "prj.json", n = await t.fetch(r);
    if (!n.ok) throw Error(n.statusText);
    const s = await t.dec(r, await n.text());
    return await e.load(JSON.parse(s)), e;
  }
  async load(t) {
    await super.load(t), j.stageW = t.window.width, j.stageH = t.window.height, j.debugLog = t.debug.debugLog;
  }
  searchPath(t, e = Tr.DEFAULT) {
    return t.startsWith("downloads:/") ? this.sys.path_downloads + t.slice(11) : t.startsWith("userdata:/") ? this.sys.path_userdata + "storage/" + t.slice(10) : super.searchPath(t, e);
  }
}
class m_ {
  // 87 match 2725 step(0.5ms) PCRE2 https://regex101.com/r/aeN57J/1
  /*
  ;[^\n]*
  |	(?<key>[^\s="'#|;]+)
  	(?: \s | ;[^\n]*\n)*
  	=
  	(?: \s | ;[^\n]*\n)*
  	(?:	(?<val> [^\s"'#|;]+)
  	|	(["'#]) (?<val2>.*?) \3 )
  	(?: \|
  		(?: (?<def> [^\s"'#;]+)
  	|	(["'#]) (?<def2>.*?) \6 ) )?
  |	(?<literal>[^\s;]+)
  	*/
  #t = /;[^\n]*|(?<key>[^\s="'#|;]+)(?:\s|;[^\n]*\n)*=(?:\s|;[^\n]*\n)*(?:(?<val>[^\s"'#|;]+)|(["'#])(?<val2>.*?)\3)(?:\|(?:(?<def>[^\s"'#;]+)|(["'#])(?<def2>.*?)\6))?|(?<literal>[^\s;]+)/g;
  // 【属性 = 値 | 省略値】の分析
  parse(t) {
    this.#i = {}, this.#r = !1;
    for (const { groups: e } of t.matchAll(this.#t)) {
      const { key: r, val: n, val2: s, def: a, def2: o, literal: h } = e;
      r ? this.#i[r] = {
        val: n ?? s ?? "",
        def: a ?? o
      } : h && (h === "*" ? this.#r = !0 : this.#i[h] = { val: "1" });
    }
  }
  // 属性と値の位置をまとめて返す
  parseinDetail(t, e, r, n) {
    const s = {}, a = t.slice(1 + e, -1);
    for (const { groups: o, index: h, 0: u } of a.matchAll(this.#t)) {
      if (h === void 0) continue;
      const { key: l, val: f, val2: c = "", literal: d } = o;
      if (d) {
        if (d.endsWith("=")) {
          const I = d.length - 1, { ch: E } = this.#e(e, r, n, a, h + I);
          s[d.slice(0, -1)] = {
            k_ln: r,
            k_ch: E - I,
            v_ln: r,
            v_ch: E + 1,
            //	v_ch: ch +1+lenNm +literal.length +1,
            v_len: 0
          };
        }
        continue;
      }
      if (!l) continue;
      const { ln: p, ch: v } = this.#e(e, r, n, a, h), { ln: _, ch: g } = this.#e(e, r, n, a, h + u.lastIndexOf(f ?? c ?? "") - (f ? 0 : 1));
      s[l] = { k_ln: p, k_ch: v, v_ln: _, v_ch: g, v_len: f ? f.length : c.length + 2 };
    }
    return s;
  }
  #e(t, e, r, n, s) {
    const o = n.slice(0, s).split(`
`), h = o.length;
    return {
      ln: e + h - 1,
      ch: h < 2 ? r + 1 + t + s : o.at(-1).length
    };
  }
  #i = {};
  get hPrm() {
    return this.#i;
  }
  #r = !1;
  get isKomeParam() {
    return this.#r;
  }
}
const fh = /(?<name>[^\s;\]]+)/;
function g_(i) {
  const e = fh.exec(i.slice(1, -1))?.groups;
  if (!e) throw `タグ記述【${i}】異常です(タグ解析)`;
  const r = e.name;
  return [r, i.slice(1 + r.length, -1)];
}
function y_(i) {
  const e = fh.exec(i.slice(1))?.groups;
  if (!e) throw `タグ記述【${i}】異常です(タグ解析)`;
  return e.name;
}
function b_(i) {
  const t = i.replaceAll("==", "＝").replaceAll("!=", "≠").split("="), e = t.length;
  if (e < 2 || e > 3) throw "「&計算」書式では「=」指定が一つか二つ必要です";
  const [r, n, s] = t;
  if (n.startsWith("&")) throw "「&計算」書式では「&」指定が不要です";
  return {
    name: r.replaceAll("＝", "==").replaceAll("≠", "!="),
    text: n.replaceAll("＝", "==").replaceAll("≠", "!="),
    cast: e === 3 ? s.trim() : void 0
  };
}
class N_ {
  constructor(t) {
    this.cfg = t, this.setEscape("");
  }
  #t;
  setEscape(t) {
    if (this.#n && t in this.#n) throw "[エスケープ文字] char【" + t + "】が登録済みの括弧マクロまたは一文字マクロです";
    this.#t = new RegExp(
      (t ? `\\${t}\\S|` : "") + // エスケープシーケンス
      `\\n+|\\t+|\\[let_ml\\s+[^\\]]+\\].+?(?=\\[endlet_ml[\\]\\s])|\\[(?:[^"'#;\\]]+|(["'#]).*?\\1|;[^\\n]*)*?]|;[^\\n]*|&[^&\\n]+&|&&?(?:[^"'#;\\n&]+|(["'#]).*?\\2)+|^\\*[^\\s\\[&;\\\\]+|[^\\n\\t\\[;${t ? `\\${t}` : ""}]+`,
      // 本文
      "gs"
    ), this.#e = new RegExp(`[\\w\\s;[\\]*=&｜《》${t ? `\\${t}` : ""}]`), this.#l = new RegExp(`[\\n\\t;\\[*&${t ? `\\${t}` : ""}]`);
  }
  // 括弧マクロの定義
  bracket2macro(t, e, r, n) {
    const { name: s, text: a } = t;
    if (!s) throw "[bracket2macro] nameは必須です";
    if (!a) throw "[bracket2macro] textは必須です";
    const o = a.at(0);
    if (!o) throw "[bracket2macro] textは必須です";
    if (a.length !== 2) throw "[bracket2macro] textは括弧の前後を示す二文字を指定してください";
    if (!(s in e)) throw `[bracket2macro] 未定義のタグ又はマクロ[${s}]です`;
    this.#n ??= {};
    const h = a.charAt(1);
    if (o in this.#n) throw "[bracket2macro] text【" + o + "】が登録済みの括弧マクロまたは一文字マクロです";
    if (h in this.#n) throw "[bracket2macro] text【" + h + "】が登録済みの括弧マクロまたは一文字マクロです";
    if (this.#e.test(o)) throw "[bracket2macro] text【" + o + "】は括弧マクロに使用できない文字です";
    if (this.#e.test(h)) throw "[bracket2macro] text【" + h + "】は括弧マクロに使用できない文字です";
    this.#n[h] = "0", this.#n[o] = `[${s} text=`, this.addC2M(`\\${o}[^\\${h}]*\\${h}`, `\\${o}\\${h}`), this.#f(r, n);
  }
  // 一文字マクロの定義
  char2macro(t, e, r, n) {
    const { char: s, name: a } = t;
    if (!s) throw "[char2macro] charは必須です";
    if (this.#n ??= {}, s in this.#n) throw "[char2macro] char【" + s + "】が登録済みの括弧マクロまたは一文字マクロです";
    if (this.#e.test(s)) throw "[char2macro] char【" + s + "】は一文字マクロに使用できない文字です";
    if (!a) throw "[char2macro] nameは必須です";
    if (!(a in e)) throw `[char2macro] 未定義のタグ又はマクロ[${a}]です`;
    this.#n[s] = `[${a}]`, this.addC2M(`\\${s}`, `\\${s}`), this.#f(r, n);
  }
  #e;
  #i = new RegExp("");
  #r = "";
  #a = "";
  addC2M(t, e) {
    this.#r += `${t}|`, this.#a += `${e}`, this.#i = new RegExp(
      `(${this.#r}[^${this.#a}]+)`,
      "g"
    );
  }
  resolveScript(t) {
    const e = t.replaceAll(/\r\n?/g, `
`).match(this.#t)?.flatMap((n) => {
      if (!this.testTagLetml(n)) return n;
      const s = /^([^\]]+?])(.*)$/s.exec(n);
      if (!s) return n;
      const [, a, o] = s;
      return [a, o];
    }) ?? [], r = { aToken: e, len: e.length, aLNum: [] };
    return this.#f(r), this.#h(r), r;
  }
  #s = /^\[(call|loadplugin)\s/;
  #o = /\bfn\s*=\s*[^\s\]]+/;
  #h(t) {
    for (let e = t.len - 1; e >= 0; --e) {
      const r = t.aToken[e];
      if (!this.#s.test(r)) continue;
      const [n, s] = g_(r);
      this.#u.parse(s);
      const a = this.#u.hPrm.fn;
      if (!a) continue;
      const { val: o } = a;
      if (!o || !o.endsWith("*")) continue;
      t.aToken.splice(e, 1, "	", "; " + r), t.aLNum.splice(e, 1, NaN, NaN);
      const h = n === "loadplugin" ? Tr.CSS : Tr.SN, u = this.cfg.matchPath("^" + o.slice(0, -1) + ".*", h);
      for (const l of u) {
        const f = r.replace(
          this.#o,
          "fn=" + decodeURIComponent(bh(l[h]))
        );
        t.aToken.splice(e, 0, f), t.aLNum.splice(e, 0, NaN);
      }
    }
    t.len = t.aToken.length;
  }
  #u = new m_();
  testTagLetml(t) {
    return /^\[let_ml\s/.test(t);
  }
  testTagEndLetml(t) {
    return /^\[endlet_ml\s*]/.test(t);
  }
  analyzToken(t) {
    return this.#t.lastIndex = 0, this.#t.exec(t);
  }
  #n;
  #l;
  #f(t, e = 0) {
    if (this.#n) {
      for (let r = t.len - 1; r >= e; --r) {
        const n = t.aToken[r];
        if (this.testNoTxt(n.at(0) ?? `
`)) continue;
        const s = t.aLNum[r], a = n.match(this.#i);
        if (!a) continue;
        let o = 1;
        for (let h = a.length - 1; h >= 0; --h) {
          let u = a[h];
          const l = this.#n[u.at(0) ?? " "];
          l && (u = l + (l.endsWith("]") ? "" : `'${u.slice(1, -1)}']`)), t.aToken.splice(r, o, u), t.aLNum.splice(r, o, s), o = 0;
        }
      }
      t.len = t.aToken.length;
    }
  }
  testNoTxt(t) {
    return this.#l.test(t);
  }
  //4tst
}
const Kr = "skynovel";
class x_ {
  constructor(t) {
    this.sys = t, Xh(), Ns.generate(t).then((e) => this.#a(e)).catch((e) => console.error("load err fn:prj.json e:%o", e));
  }
  cvs;
  #t = /* @__PURE__ */ Object.create(null);
  // タグ処理辞書
  #e;
  #i;
  #r = [];
  async #a(t) {
    const e = {
      width: t.oCfg.window.width,
      height: t.oCfg.window.height,
      backgroundColor: Va(String(t.oCfg.init.bg_color)),
      // このString()は後方互換性のため必須
      //	resolution		: sys.resolution,
      resolution: globalThis.devicePixelRatio ?? 1
      // 理想
    }, r = document.getElementById(Kr);
    if (r) {
      const a = r.cloneNode(!0);
      a.id = Kr, e.view = r;
      const o = r.parentNode;
      this.#r.unshift(() => o.appendChild(a));
    } else {
      const a = document.createElement("canvas");
      a.id = Kr, e.view = a, document.body.appendChild(a), this.#r.unshift(() => document.body.removeChild(a));
    }
    const n = new Jo(e);
    this.#r.unshift(() => {
      kf(), this.sys.destroy(), n.destroy(!1);
    }), this.cvs = n.view, this.cvs.id = Kr + "_act", r || document.body.appendChild(this.cvs);
    const s = document.createElement("canvas")?.getContext("2d");
    if (!s) throw "#init cc err";
    j.cc4ColorName = s, await Promise.all([
      import("./Variable.js"),
      import("./PropParser.js"),
      import("./SoundMng.js"),
      import("./ScriptIterator.js"),
      import("./LayerMng.js").then((a) => a.L),
      import("./EventMng.js")
    ]).then(async ([
      { Variable: a },
      { PropParser: o },
      { SoundMng: h },
      { ScriptIterator: u },
      { LayerMng: l },
      { EventMng: f }
    ]) => {
      const c = new a(t, this.#t), d = new o(c, t.oCfg.init.escape ?? "\\");
      this.#o = (g, I, E, B) => c.setVal_Nochk(g, I, E, B), this.#n = (g) => d.getValAmpersand(g), this.#l = (g) => d.parse(g), await Promise.allSettled(this.sys.init(this.#t, n, c, this)), this.#t.title({ text: t.oCfg.book.title || "SKYNovel" });
      const p = new h(t, this.#t, c, this, this.sys);
      this.#r.unshift(() => p.destroy()), this.#e = new u(t, this.#t, this, c, d, p, this.sys), this.#r.unshift(() => this.#e.destroy());
      const v = new rt(this.sys, this.#t, this.#e);
      this.#r.unshift(() => v.destroy()), this.errScript = (g, I = !0) => {
        if (this.stop(), rt.myTrace(g), j.debugLog && console.log("🍜 SKYNovel err!"), I) throw g;
      }, this.#i = new l(t, this.#t, n, c, this, this.#e, this.sys, p, d), this.#r.unshift(() => this.#i.destroy());
      const _ = new f(t, this.#t, n, this, this.#i, c, p, this.#e, this.sys);
      this.#r.unshift(() => _.destroy()), this.#r.unshift(() => {
        this.stop(), this.#h = !1, this.#t = {};
      }), this.#t.jump({ fn: "main" }), this.stop();
    });
  }
  destroy() {
    if (!this.#s) {
      this.#s = !0, this.cvs.parentElement?.removeChild(this.cvs);
      for (const t of this.#r) t();
      this.#r = [];
    }
  }
  #s = !1;
  isDestroyed = () => this.#s;
  errScript = (t, e = !0) => {
  };
  resumeByJumpOrCall(t) {
    if (t.url) {
      this.#t.navigate_to(t), this.#e.jumpJustBefore();
      return;
    }
    this.#o("tmp", "sn.eventArg", t.arg ?? ""), this.#o("tmp", "sn.eventLabel", t.label ?? ""), vt(t, "call", !1) ? (this.#e.subIdxToken(), this.#t.call(t)) : (this.#t.clear_event({}), this.#t.jump(t)), this.resume();
  }
  #o = (t, e, r, n = !1) => {
  };
  resume() {
    this.#s || (this.#i.clearBreak(), this.#e.noticeBreak(!1), queueMicrotask(() => this.#u()));
  }
  stop = () => {
    this.#e.noticeBreak(!0);
  };
  setLoop(t, e = "") {
    (this.#h = t) ? this.resume() : this.stop(), this.sys.setTitleInfo(e ? ` -- ${e}中` : "");
  }
  #h = !0;
  //MARK: メイン処理（シナリオ解析）
  #u() {
    for (; this.#h; ) {
      let t = this.#e.nextToken();
      if (!t) return;
      const e = t.charCodeAt(0);
      if (e !== 9) {
        if (e === 10) {
          this.#e.addLineNum(t.length);
          continue;
        }
        if (e === 91) {
          if (this.#e.isBreak(t)) return;
          try {
            const r = (t.match(/\n/g) ?? []).length;
            if (r > 0 && this.#e.addLineNum(r), this.#e.タグ解析(t)) {
              this.stop();
              return;
            }
            continue;
          } catch (r) {
            r instanceof Error ? this.errScript(`[${y_(t)}]タグ解析中例外 mes=${r.message}(${r.name})`, !1) : this.errScript(String(r), !1);
            return;
          }
        }
        if (e === 38)
          try {
            if (!t.endsWith("&")) {
              if (this.#e.isBreak(t)) return;
              const r = b_(t.slice(1));
              r.name = this.#n(r.name), r.text = String(this.#l(r.text)), this.#t.let(r);
              continue;
            }
            if (t.charAt(1) === "&") throw new Error("「&表示&」書式では「&」指定が不要です");
            t = String(this.#l(t.slice(1, -1)));
          } catch (r) {
            this.errScript(
              r instanceof Error ? `& 変数操作・表示 mes=${r.message}(${r.name})` : String(r),
              !1
            );
            return;
          }
        else {
          if (e === 59) continue;
          if (e === 42 && t.length > 1) continue;
        }
        try {
          this.#i.setNormalChWait(), this.#i.currentTxtlayForeNeedErr.tagCh(t);
        } catch (r) {
          this.errScript(
            r instanceof Error ? `文字表示 mes=${r.message}(${r.name})` : String(r),
            !1
          );
          return;
        }
      }
    }
  }
  #n = (t) => "";
  #l = (t) => {
  };
}
const lt = window.to_app;
class D_ extends __ {
  constructor(...[t = {}, e = { cur: "prj/", crypto: !1, dip: "" }]) {
    super(t, e), queueMicrotask(async () => this.loaded(t, e));
  }
  async loaded(...[t, e]) {
    await super.loaded(t, e), this.#t = await lt.getInfo(), j.isPackaged = this.#t.isPackaged, this.arg = e = { ...e, cur: this.#t.getAppPath.replaceAll("\\", "/") + (j.isPackaged ? "/doc/" : "/") + e.cur }, this.$path_downloads = this.#t.downloads.replaceAll("\\", "/") + "/", lt.on("log", (r, n) => console.info("[main log] %o", n)), j.isDbg = !!this.#t.env.SKYNOVEL_DBG && !j.isPackaged, j.isDbg && (this.extPort = mt(this.#t.env.SKYNOVEL_PORT ?? "3776")), await this.run();
  }
  #t = {
    getAppPath: "",
    isPackaged: !1,
    downloads: "",
    userData: "",
    getVersion: "",
    env: {},
    platform: "",
    arch: ""
  };
  fetch = (t) => fetch(t, { cache: "no-store" });
  ensureFileSync = lt.ensureFileSync;
  readFileSync = lt.readFileSync;
  writeFileSync = lt.writeFileSync;
  appendFile = lt.appendFile;
  outputFile = lt.outputFile;
  $path_userdata = "";
  $path_downloads = "";
  async initVal(t, e, r) {
    e["const.sn.isDebugger"] = !1, this.$path_userdata = j.isDbg ? this.#t.getAppPath.slice(0, -3) + ".vscode/" : this.#t.userData.replaceAll("\\", "/") + "/", this.flushSub = () => {
      lt.flush(JSON.parse(JSON.stringify(this.data)));
    }, this.#e().then(async () => {
      const n = e["const.sn.isFirstBoot"] = await lt.Store_isEmpty();
      if (n)
        this.data.sys = t.sys, this.data.mark = t.mark, this.data.kidoku = t.kidoku, this.flush();
      else {
        const u = await lt.Store_get();
        this.data.sys = u.sys, this.data.mark = u.mark, this.data.kidoku = u.kidoku;
      }
      const s = this.data.sys["const.sn.nativeWindow.x"] ?? 0, a = this.data.sys["const.sn.nativeWindow.y"] ?? 0, o = this.data.sys["const.sn.nativeWindow.w"] ?? j.stageW, h = this.data.sys["const.sn.nativeWindow.h"] ?? j.stageH;
      lt.inited(this.cfg.oCfg, { c: n, x: s, y: a, w: o, h }), lt.on("save_win_inf", (u, { x: l, y: f, w: c, h: d, scrw: p, scrh: v }) => {
        this.val.setVal_Nochk("sys", "const.sn.nativeWindow.x", l), this.val.setVal_Nochk("sys", "const.sn.nativeWindow.y", f), this.val.setVal_Nochk("sys", "const.sn.nativeWindow.w", c), this.val.setVal_Nochk("sys", "const.sn.nativeWindow.h", d), this.flush(), e["const.sn.screenResolutionX"] = p, e["const.sn.screenResolutionY"] = v;
      }), r(this.data);
    });
  }
  #e = () => lt.Store({
    cwd: this.$path_userdata + "storage",
    name: this.arg.crypto ? "data_" : "data",
    encryptionKey: this.arg.crypto ? this.stk() : void 0
  });
  #i;
  async run() {
    this.#i && this.#i.destroy(), this.#i = new x_(this);
  }
  init(t, e, r, n) {
    const s = super.init(t, e, r, n);
    lt.on("shutdown", (o) => n.destroy());
    const a = new Event("click");
    return lt.on("fire", (o, h) => this.fire(h, a)), s;
  }
  cvsResize() {
    super.cvsResize();
    const t = this.main.cvs, e = t.parentElement.style, r = t.style;
    this.isFullScr ? (e.position = "", e.width = "", e.height = "", r.position = "fixed", r.left = `${this.ofsLeft4elm}px`, r.top = `${this.ofsTop4elm}px`) : (e.position = "relative", e.width = `${this.cvsWidth}px`, e.height = `${this.cvsHeight}px`, r.position = "relative", r.left = "", r.top = "");
  }
  copyBMFolder = async (t, e) => {
    const r = `${this.$path_userdata}storage/${t}/`, n = `${this.$path_userdata}storage/${e}/`;
    await lt.existsSync(r) && lt.copySync(r, n);
  };
  eraseBMFolder = async (t) => {
    await lt.removeSync(`${this.$path_userdata}storage/${t}/`);
  };
  // アプリの終了
  close = () => (lt.win_close(), !1);
  // プレイデータをエクスポート
  _export = () => (lt.zip(
    this.$path_userdata + "storage/",
    this.$path_downloads + (this.arg.crypto ? "" : "no_crypto_") + this.cfg.getNs() + Ya("-", "_", "") + ".spd"
  ), j.debugLog && console.log("プレイデータをエクスポートしました"), this.fire("sn:exported", new Event("click")), !1);
  // プレイデータをインポート
  _import = () => {
    const t = this.flush;
    return new Promise((e, r) => {
      const n = document.createElement("input");
      n.type = "file", n.accept = ".spd, text/plain", n.onchange = () => {
        const s = n.files?.[0];
        s ? e(s.path) : r();
      }, n.click();
    }).then(async (e) => {
      this.flush = () => {
      }, lt.unzip(e, this.$path_userdata + "storage/"), await this.#e();
      const r = await lt.Store_get();
      this.data.sys = r.sys, this.data.mark = r.mark, this.data.kidoku = r.kidoku, this.flush = t, this.flush(), this.val.updateData(r), j.debugLog && console.log("プレイデータをインポートしました"), this.fire("sn:imported", new Event("click"));
    }), !1;
  };
  // ＵＲＬを開く
  navigate_to = (t) => {
    const { url: e } = t;
    if (!e) throw "[navigate_to] urlは必須です";
    return lt.navigate_to(e), !1;
  };
  // タイトル指定
  titleSub(t) {
    lt.win_setTitle(t);
  }
  // 全画面状態切替
  tglFlscr_sub = async () => lt.setSimpleFullScreen(
    this.isFullScr = !await lt.isSimpleFullScreen()
  );
  // 更新チェック
  update_check = (t) => {
    const { url: e } = t;
    if (!e) throw "[update_check] urlは必須です";
    if (!e.endsWith("/")) throw "[update_check] urlの最後は/です";
    return j.debugLog && rt.myTrace(`[update_check] url=${e}`, "D"), (async () => {
      let r = {}, n = "", s = "";
      const a = await this.fetch(e + "_index.json");
      if (a.ok)
        j.debugLog && rt.myTrace("[update_check] _index.jsonを取得しました", "D"), r = await a.json(), s = r.version;
      else {
        const l = await this.fetch(e + `latest${j.isMac ? "-mac" : ""}.yml`);
        if (!l.ok) {
          j.debugLog && rt.myTrace("[update_check] [update_check] .ymlが見つかりません");
          return;
        }
        j.debugLog && rt.myTrace("[update_check] .ymlを取得しました", "D"), n = await l.text();
        const c = /version: (.+)/.exec(n)?.[1];
        if (!c) throw "[update_check] .yml に version が見つかりません";
        s = c;
      }
      const o = this.#t.getVersion;
      if (j.debugLog && rt.myTrace(`[update_check] 現在ver=${o} 新規ver=${s}`, "D"), s === o) {
        j.debugLog && rt.myTrace("[update_check] バージョン更新なし", "I");
        return;
      }
      const h = {
        title: "アプリ更新",
        icon: this.#t.getAppPath + "/app/icon.png",
        buttons: ["OK", "Cancel"],
        defaultId: 0,
        cancelId: 1,
        message: `アプリ【${this.cfg.oCfg.book.title}】に更新があります。
ダウンロードしますか？`,
        detail: `現在 NOW ver ${o}
新規 NEW ver ${s}`
      }, { response: u } = await lt.showMessageBox(h);
      if (!(u > 0)) {
        if (j.debugLog && rt.myTrace("[update_check] アプリダウンロード開始", "D"), a.ok) {
          const l = this.#t.platform + "_" + this.#t.arch, { cn: f, path: c } = r[l];
          if (f) await this.#r(e, l + "-" + f, c);
          else {
            let d = "";
            const p = new RegExp("^" + this.#t.platform + "_"), v = Object.entries(r).flatMap(([g, { path: I, cn: E }]) => p.test(g) ? (d += `
- ` + I, () => this.#r(e, g + "-" + E, I)) : []);
            h.message = `CPU = ${this.#t.arch}
に対応するファイルが見つかりません。同じOSのファイルをすべてダウンロードしますか？`, h.detail = v.length + " 個ファイルがあります" + d;
            const { response: _ } = await lt.showMessageBox(h);
            if (_ > 0) return;
            await Promise.allSettled(v);
          }
        } else {
          const l = /path: (.+)/.exec(n);
          if (!l) throw "[update_check] path が見つかりません";
          const [, f] = l;
          if (!f) throw "[update_check] path が見つかりません.";
          j.debugLog && rt.myTrace(`[update_check] path=${f}`, "D");
          const c = /sha512: (.+)/.exec(n);
          if (!c) throw "[update_check] sha512 が見つかりません";
          const [, d] = c;
          j.debugLog && rt.myTrace(`[update_check] sha=${d}=`, "D");
          const [, p, v] = /(.+)(\.\w+)/.exec(f) ?? ["", "", ""];
          await this.#r(e, p + "-" + this.#t.arch + v, f);
        }
        j.debugLog && rt.myTrace("アプリファイルを保存しました", "D"), h.buttons.pop(), h.message = `アプリ【${this.cfg.oCfg.book.title}】の更新パッケージを
ダウンロードしました`, lt.showMessageBox(h);
      }
    })(), !1;
  };
  async #r(t, e, r) {
    j.debugLog && rt.myTrace(`[update_check] アプリファイルDL試行... url=${t + e}`, "D");
    const n = await this.fetch(t + e);
    if (!n.ok) {
      j.debugLog && rt.myTrace(`[update_check] アプリファイルが見つかりません url=${t + r}`);
      return;
    }
    const s = this.#t.downloads + "/" + r;
    j.debugLog && rt.myTrace(`[update_check] pathDL=${s}`, "D");
    const a = await n.arrayBuffer();
    await this.writeFileSync(s, new DataView(a));
  }
  // アプリウインドウ設定
  window = (t) => {
    const e = Z(t, "x", Number(this.val.getVal("sys:const.sn.nativeWindow.x", 0))), r = Z(t, "y", Number(this.val.getVal("sys:const.sn.nativeWindow.y", 0))), n = Z(t, "w", Number(this.val.getVal("sys:const.sn.nativeWindow.w", j.stageW))), s = Z(t, "h", Number(this.val.getVal("sys:const.sn.nativeWindow.h", j.stageH)));
    return lt.window(vt(t, "centering", !1), e, r, j.stageW, j.stageH), this.val.setVal_Nochk("sys", "const.sn.nativeWindow.x", e), this.val.setVal_Nochk("sys", "const.sn.nativeWindow.y", r), this.val.setVal_Nochk("sys", "const.sn.nativeWindow.w", n), this.val.setVal_Nochk("sys", "const.sn.nativeWindow.h", s), this.flush(), !1;
  };
  capturePage(t, e, r, n) {
    lt.capturePage(t, e, r).then(() => n());
  }
}
const { BlurFilter: T_, ColorMatrixFilter: It, NoiseFilter: E_ } = yv;
class Xt {
  layname = "";
  name_ = "";
  set name(t) {
    this.name_ = t;
  }
  get name() {
    return this.name_;
  }
  ctn = new xe(et.EMPTY);
  // tsy用
  get alpha() {
    return this.ctn.alpha;
  }
  set alpha(t) {
    this.ctn.alpha = t;
  }
  get height() {
    return this.ctn.height;
  }
  get rotation() {
    return this.ctn.angle;
  }
  set rotation(t) {
    this.ctn.angle = t;
  }
  get scale_x() {
    return this.ctn.scale.x;
  }
  set scale_x(t) {
    this.ctn.scale.x = t;
  }
  get scale_y() {
    return this.ctn.scale.y;
  }
  set scale_y(t) {
    this.ctn.scale.y = t;
  }
  get width() {
    return this.ctn.width;
  }
  get x() {
    return this.ctn.x;
  }
  set x(t) {
    this.procSetX(t), this.ctn.x = t;
  }
  procSetX(t) {
  }
  // set を override できないので
  get y() {
    return this.ctn.y;
  }
  set y(t) {
    this.procSetY(t), this.ctn.y = t;
  }
  procSetY(t) {
  }
  // set を override できないので
  destroy() {
  }
  lay(t) {
    const e = this.ctn;
    return "alpha" in t && (e.alpha = Z(t, "alpha", 1)), Xt.setBlendmode(e, t), ("pivot_x" in t || "pivot_y" in t) && e.pivot.set(
      Z(t, "pivot_x", e.pivot.x),
      Z(t, "pivot_y", e.pivot.y)
    ), "rotation" in t && (e.angle = Z(t, "rotation", 0)), ("scale_x" in t || "scale_y" in t) && e.scale.set(
      Z(t, "scale_x", e.scale.x),
      Z(t, "scale_y", e.scale.y)
    ), "visible" in t && (e.visible = vt(t, "visible", !0)), "filter" in t && (e.filters = [Xt.bldFilters(t)], this.aFltHArg = [t]), !1;
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
  static bldFilters(t) {
    const { filter: e = "" } = t, r = Xt.hBldFilter[e];
    if (!r) throw "filter が異常です";
    const n = r(t);
    n.enabled = vt(t, "enable_filter", !0);
    const { blendmode: s } = t;
    return s && (n.blendMode = Xt.getBlendmodeNum(s)), n;
  }
  // https://github.com/pixijs/filters
  static hBldFilter = {
    // https://pixijs.download/v6.5.10/docs/PIXI.filters.BlurFilter.html
    blur: (t) => {
      const e = new T_(
        Z(t, "strength", 8),
        // 強さ
        Z(t, "quality", 4),
        // 品質
        "resolution" in t ? Z(t, "resolution", 0) : void 0,
        // 解像度
        Z(t, "kernel_size", 5)
        // カーネルサイズ。値は 5、7、9、11、13、15。
      );
      return e.blurX = mt(Z(t, "blur_x", 2)), e.blurY = mt(Z(t, "blur_y", 2)), e.repeatEdgePixels = vt(t, "repeat_edge_pixels", !1), e;
    },
    // https://pixijs.download/v6.5.10/docs/PIXI.filters.NoiseFilter.html
    noise: (t) => new E_(
      // ノイズエフェクト
      Z(t, "noise", 0.5),
      // 適用するノイズの量。この値は (0, 1] の範囲内
      "seed" in t ? Z(t, "seed", 0) : void 0
      // ランダム ノイズの生成に適用するシード値。 Math.random() を使用するのが適切な値です。
    ),
    // https://pixijs.download/v6.5.10/docs/PIXI.filters.ColorMatrixFilter.html
    color_matrix: (t) => {
      const e = new It();
      e.alpha = mt(Z(t, "alpha", 1));
      const { matrix: r = "" } = t;
      if (r) {
        const n = r.split(","), s = n.length;
        if (s !== 20) throw `matrix の個数（${s}）が 20 ではありません`;
        for (let a = 0; a < s; ++a) e.matrix[a] = mt(n[a]);
      } else
        e.matrix[0] = mt(Z(t, "rtor", 1)), e.matrix[1] = mt(Z(t, "gtor", 0)), e.matrix[2] = mt(Z(t, "btor", 0)), e.matrix[3] = mt(Z(t, "ator", 0)), e.matrix[4] = mt(Z(t, "pr", 0)), e.matrix[5] = mt(Z(t, "rtog", 0)), e.matrix[6] = mt(Z(t, "gtog", 1)), e.matrix[7] = mt(Z(t, "btog", 0)), e.matrix[8] = mt(Z(t, "atog", 0)), e.matrix[9] = mt(Z(t, "pg", 0)), e.matrix[10] = mt(Z(t, "rtob", 0)), e.matrix[11] = mt(Z(t, "gtob", 0)), e.matrix[12] = mt(Z(t, "btob", 1)), e.matrix[13] = mt(Z(t, "atob", 0)), e.matrix[14] = mt(Z(t, "pb", 0)), e.matrix[15] = mt(Z(t, "rtoa", 0)), e.matrix[16] = mt(Z(t, "gtoa", 0)), e.matrix[17] = mt(Z(t, "btoa", 0)), e.matrix[18] = mt(Z(t, "atoa", 1)), e.matrix[19] = mt(Z(t, "pa", 0));
      return e;
    },
    black_and_white: (t) => {
      const e = new It();
      return e.blackAndWhite(
        vt(t, "multiply", !1)
        // true の場合、現在の行列と行列を乗算
      ), e;
    },
    brightness: (t) => {
      const e = new It();
      return e.brightness(
        Z(t, "b", 0.5),
        // 明るさの値 (0 ～ 1、0 は黒)
        vt(t, "multiply", !1)
        // true の場合、現在の行列と行列を乗算
      ), e;
    },
    browni: (t) => {
      const e = new It();
      return e.browni(
        vt(t, "multiply", !0)
        // true の場合、現在の行列と行列を乗算
      ), e;
    },
    color_tone: (t) => {
      const e = new It();
      return e.colorTone(
        Z(t, "desaturation", 0.5),
        Z(t, "toned", 0.5),
        Z(t, "light_color", 16770432),
        Z(t, "dark_color", 16770432),
        vt(t, "multiply", !1)
        // true の場合、現在の行列と行列を乗算
      ), e;
    },
    contrast: (t) => {
      const e = new It();
      return e.contrast(
        Z(t, "amount", 0.5),
        // コントラストの値 (0-1)
        vt(t, "multiply", !1)
        // true の場合、現在の行列と行列を乗算
      ), e;
    },
    grayscale: (t) => {
      const e = new It();
      return e.grayscale(
        Z(t, "scale", 0.5),
        // グレーの値 (0 ～ 1、0 は黒)
        vt(t, "multiply", !1)
        // true の場合、現在の行列と行列を乗算
      ), e;
    },
    hue: (t) => {
      const e = new It();
      return e.hue(
        Z(t, "f_rotation", 90),
        // 0だと変化なしで分かりづらいので
        // 度単位
        vt(t, "multiply", !1)
        // true の場合、現在の行列と行列を乗算
      ), e;
    },
    kodachrome: (t) => {
      const e = new It();
      return e.kodachrome(
        vt(t, "multiply", !0)
        // true の場合、現在の行列と行列を乗算
      ), e;
    },
    lsd: (t) => {
      const e = new It();
      return e.lsd(
        vt(t, "multiply", !1)
        // true の場合、現在の行列と行列を乗算
      ), e;
    },
    negative: (t) => {
      const e = new It();
      return e.negative(
        vt(t, "multiply", !1)
        // true の場合、現在の行列と行列を乗算
      ), e;
    },
    night: (t) => {
      const e = new It();
      return e.night(
        Z(t, "intensity", 0.5),
        // 夜の効果の強さ
        vt(t, "multiply", !1)
        // true の場合、現在の行列と行列を乗算
      ), e;
    },
    polaroid: (t) => {
      const e = new It();
      return e.polaroid(
        vt(t, "multiply", !1)
        // true の場合、現在の行列と行列を乗算
      ), e;
    },
    predator: (t) => {
      const e = new It();
      return e.predator(
        Z(t, "amount", 0.5),
        // 捕食者は自分の将来の犠牲者をどれほど感じているか
        vt(t, "multiply", !1)
        // true の場合、現在の行列と行列を乗算
      ), e;
    },
    saturate: (t) => {
      const e = new It();
      return e.saturate(
        Z(t, "amount", 0.5),
        // 飽和量(0～1)
        vt(t, "multiply", !1)
        // true の場合、現在の行列と行列を乗算
      ), e;
    },
    sepia: (t) => {
      const e = new It();
      return e.sepia(
        vt(t, "multiply", !1)
        // true の場合、現在の行列と行列を乗算
      ), e;
    },
    technicolor: (t) => {
      const e = new It();
      return e.technicolor(
        vt(t, "multiply", !0)
        // true の場合、現在の行列と行列を乗算
      ), e;
    },
    tint: (t) => {
      const e = new It();
      return e.tint(
        Z(t, "f_color", 8947848),
        // 色合いの色。 これは 16 進数値です。
        vt(t, "multiply", !1)
        // true の場合、現在の行列と行列を乗算
      ), e;
    },
    to_bgr: (t) => {
      const e = new It();
      return e.toBGR(
        vt(t, "multiply", !1)
        // true の場合、現在の行列と行列を乗算
      ), e;
    },
    vintage: (t) => {
      const e = new It();
      return e.vintage(
        vt(t, "multiply", !0)
        // true の場合、現在の行列と行列を乗算
      ), e;
    }
  };
  static setBlendmode(t, e) {
    const { blendmode: r } = e;
    if (!r) return;
    const n = Xt.getBlendmodeNum(r);
    t instanceof xe && (t.blendMode = n);
    for (const s of t.children)
      s instanceof xe && (s.blendMode = n);
  }
  static getBlendmodeNum(t) {
    if (!t) return q.NORMAL;
    const e = Xt.#t[t];
    if (e !== void 0) return e;
    throw `${t} はサポートされない blendmode です`;
  }
  static #t = {
    normal: q.NORMAL,
    add: q.ADD,
    multiply: q.MULTIPLY,
    screen: q.SCREEN
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
  static getNum2Blendmode(t) {
    return Xt.#e[t] ?? "normal";
  }
  static #e = {
    0: "normal",
    1: "add",
    2: "multiply",
    3: "screen"
  };
  // アニメ・動画があるか
  get containMovement() {
    return !1;
  }
  renderStart() {
  }
  renderEnd() {
  }
  clearLay(t) {
    this.ctn.alpha = 1, this.ctn.blendMode = q.NORMAL, this.ctn.pivot.set(0, 0), this.ctn.angle = 0, this.ctn.scale.set(1, 1), vt(t, "clear_filter", !1) && (this.ctn.filters = null, this.aFltHArg = []);
  }
  copy(t, e) {
    const r = this.name_;
    this.playback(t.record(), e), this.name = r;
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
  playback(t, e) {
    this.name = t.name, this.clearLay({ clear_filter: !0 }), this.ctn.alpha = t.alpha, this.ctn.blendMode = t.blendMode, this.ctn.angle = t.rotation, this.ctn.scale.set(t.scale_x, t.scale_y), this.ctn.pivot.set(t.pivot_x, t.pivot_y), this.ctn.position.set(t.x, t.y), this.ctn.visible = t.visible, this.aFltHArg = t.aFltHArg ?? [], this.ctn.filters = this.aFltHArg.length === 0 ? null : this.aFltHArg.map((r) => Xt.bldFilters(r));
  }
  snapshot(t, e) {
    t.render(this.ctn, { clear: !1 }), e();
  }
  snapshot_end() {
  }
  makeDesignCast(t) {
  }
  makeDesignCastChildren(t) {
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
    return ` "idx":${this.ctn.parent.getChildIndex(this.ctn)}, "visible":"${this.ctn.visible}", "left":${this.ctn.x}, "top":${this.ctn.y}, "alpha":${this.ctn.alpha}, "rotation":${this.ctn.angle}, "name":"${this.name_}", "scale_x":${this.ctn.scale.x}, "scale_y":${this.ctn.scale.y}, "filters": [${this.aFltHArg.map((t) => `"${t.filter}"`).join(",")}]`;
  }
  static setXY(t, e, r, n = !1, s = !1) {
    if (e.pos) {
      Xt.setXYByPos(t, e.pos, r);
      return;
    }
    const a = t.getBounds(), o = r.scale.x < 0 ? -r.scale.x : r.scale.x, h = o === 1 ? a.width : a.width * o, u = r.scale.y < 0 ? -r.scale.y : r.scale.y, l = u === 1 ? a.height : a.height * u;
    let f = r.x;
    "left" in e ? (f = Z(e, "left", 0), f > -1 && f < 1 && (f *= j.stageW)) : "center" in e ? (f = Z(e, "center", 0), f > -1 && f < 1 && (f *= j.stageW), f = f - (s ? h / 3 : h) / 2) : "right" in e ? (f = Z(e, "right", 0), f > -1 && f < 1 && (f *= j.stageW), f = f - (s ? h / 3 : h)) : "s_right" in e && (f = Z(e, "s_right", 0), f > -1 && f < 1 && (f *= j.stageW), f = j.stageW - f - (s ? h / 3 : h)), r.x = Ne(r.scale.x < 0 ? f + (s ? h / 3 : h) : f);
    let c = r.y;
    "top" in e ? (c = Z(e, "top", 0), c > -1 && c < 1 && (c *= j.stageH)) : "middle" in e ? (c = Z(e, "middle", 0), c > -1 && c < 1 && (c *= j.stageH), c = c - l / 2) : "bottom" in e ? (c = Z(e, "bottom", 0), c > -1 && c < 1 && (c *= j.stageH), c = c - l) : "s_bottom" in e && (c = Z(e, "s_bottom", 0), c > -1 && c < 1 && (c *= j.stageH), c = j.stageH - c - l), r.y = Ne(r.scale.y < 0 ? c + l : c), n && !("left" in e) && !("center" in e) && !("right" in e) && !("s_right" in e) && !("top" in e) && !("middle" in e) && !("bottom" in e) && !("s_bottom" in e) && Xt.setXYByPos(t, "c", r);
  }
  static setXYByPos(t, e, r) {
    if (e === "stay") return;
    if (t === void 0) throw "setXYByPos base === undefined";
    if (r === void 0) throw "setXYByPos result === undefined";
    const n = t.getBounds(), s = r.scale.x < 0 ? -r.scale.x : r.scale.x, a = s === 1 ? n.width : n.width * s, o = r.scale.y < 0 ? -r.scale.y : r.scale.y, h = o === 1 ? n.height : n.height * o;
    let u = 0;
    !e || e === "c" ? u = j.stageW * 0.5 : e === "r" ? u = j.stageW - a * 0.5 : e === "l" ? u = a * 0.5 : u = Ne(e), r.x = Ne(u - a * 0.5), r.y = j.stageH - h, r.scale.x < 0 && (r.x += a), r.scale.y < 0 && (r.y += h);
  }
  static setXYCenter(t) {
    const e = t.getBounds();
    t.x = (j.stageW - e.width) * 0.5, t.y = (j.stageH - e.height) * 0.5;
  }
}
export {
  m_ as A,
  ot as B,
  j as C,
  rt as D,
  bv as E,
  Ze as F,
  N_ as G,
  zo as H,
  S_ as I,
  P_ as J,
  C_ as K,
  mi as L,
  Va as M,
  Ro as N,
  ve as O,
  D_ as P,
  ht as R,
  Tr as S,
  Nt as T,
  vt as a,
  Z as b,
  wt as c,
  qe as d,
  se as e,
  bh as f,
  Ya as g,
  g_ as h,
  Ne as i,
  re as j,
  I_ as k,
  kf as l,
  pr as m,
  A_ as n,
  M_ as o,
  mh as p,
  Yt as q,
  q as r,
  et as s,
  y_ as t,
  mt as u,
  R_ as v,
  xe as w,
  Xt as x,
  Ee as y,
  bi as z
};
//# sourceMappingURL=app2.js.map
