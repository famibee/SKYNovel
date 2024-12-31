import Bc, { ipcMain as ae, dialog as Hc, shell as Wc, BrowserWindow as Kc, app as ct, screen as zi } from "electron";
import Be from "fs";
import Xc from "constants";
import Zc from "stream";
import Ii from "util";
import $c from "assert";
import ue from "path";
import bc from "crypto";
import Jc from "events";
import Yc from "os";
import Rc from "zlib";
var nt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Oc(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var tt = { exports: {} };
/*!
 * Platform.js v1.3.6
 * Copyright 2014-2020 Benjamin Tan
 * Copyright 2011-2013 John-David Dalton
 * Available under MIT license
 */
var Qc = tt.exports, Vi;
function eu() {
  return Vi || (Vi = 1, function(e, t) {
    (function() {
      var a = {
        function: !0,
        object: !0
      }, s = a[typeof window] && window || this, u = t, o = e && !e.nodeType && e, r = u && o && typeof nt == "object" && nt;
      r && (r.global === r || r.window === r || r.self === r) && (s = r);
      var f = Math.pow(2, 53) - 1, n = /\bOpera/, i = Object.prototype, d = i.hasOwnProperty, E = i.toString;
      function g($) {
        return $ = String($), $.charAt(0).toUpperCase() + $.slice(1);
      }
      function p($, O, T) {
        var k = {
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
        return O && T && /^Win/i.test($) && !/^Windows Phone /i.test($) && (k = k[/[\d.]+$/.exec($)]) && ($ = "Windows " + k), $ = String($), O && T && ($ = $.replace(RegExp(O, "i"), T)), $ = b(
          $.replace(/ ce$/i, " CE").replace(/\bhpw/i, "web").replace(/\bMacintosh\b/, "Mac OS").replace(/_PowerPC\b/i, " OS").replace(/\b(OS X) [^ \d]+/i, "$1").replace(/\bMac (OS X)\b/, "$1").replace(/\/(\d)/, " $1").replace(/_/g, ".").replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, "").replace(/\bx86\.64\b/gi, "x86_64").replace(/\b(Windows Phone) OS\b/, "$1").replace(/\b(Chrome OS \w+) [\d.]+\b/, "$1").split(" on ")[0]
        ), $;
      }
      function w($, O) {
        var T = -1, k = $ ? $.length : 0;
        if (typeof k == "number" && k > -1 && k <= f)
          for (; ++T < k; )
            O($[T], T, $);
        else
          l($, O);
      }
      function b($) {
        return $ = v($), /^(?:webOS|i(?:OS|P))/.test($) ? $ : g($);
      }
      function l($, O) {
        for (var T in $)
          d.call($, T) && O($[T], T, $);
      }
      function h($) {
        return $ == null ? g($) : E.call($).slice(8, -1);
      }
      function c($, O) {
        var T = $ != null ? typeof $[O] : "number";
        return !/^(?:boolean|number|string|undefined)$/.test(T) && (T == "object" ? !!$[O] : !0);
      }
      function m($) {
        return String($).replace(/([ -])(?!$)/g, "$1?");
      }
      function y($, O) {
        var T = null;
        return w($, function(k, H) {
          T = O(T, k, H, $);
        }), T;
      }
      function v($) {
        return String($).replace(/^ +| +$/g, "");
      }
      function _($) {
        var O = s, T = $ && typeof $ == "object" && h($) != "String";
        T && (O = $, $ = null);
        var k = O.navigator || {}, H = k.userAgent || "";
        $ || ($ = H);
        var U = T ? !!k.likeChrome : /\bChrome\b/.test($) && !/internal|\n/i.test(E.toString()), z = "Object", V = T ? z : "ScriptBridgingProxyObject", Z = T ? z : "Environment", B = T && O.java ? "JavaPackage" : h(O.java), A = T ? z : "RuntimeObject", x = /\bJava/.test(B) && O.java, D = x && h(O.environment) == Z, C = x ? "a" : "α", j = x ? "b" : "β", L = O.document || {}, R = O.operamini || O.opera, N = n.test(N = T && R ? R["[[Class]]"] : h(R)) ? N : R = null, I, K = $, W = [], Q = null, J = $ == H, P = J && R && typeof R.version == "function" && R.version(), q, M = Se([
          { label: "EdgeHTML", pattern: "Edge" },
          "Trident",
          { label: "WebKit", pattern: "AppleWebKit" },
          "iCab",
          "Presto",
          "NetFront",
          "Tasman",
          "KHTML",
          "Gecko"
        ]), F = pe([
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
        ]), G = Te([
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
        ]), Y = me({
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
        }), X = fe([
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
        function Se(ce) {
          return y(ce, function(se, re) {
            return se || RegExp("\\b" + (re.pattern || m(re)) + "\\b", "i").exec($) && (re.label || re);
          });
        }
        function me(ce) {
          return y(ce, function(se, re, ge) {
            return se || (re[G] || re[/^[a-z]+(?: +[a-z]+\b)*/i.exec(G)] || RegExp("\\b" + m(ge) + "(?:\\b|\\w*\\d)", "i").exec($)) && ge;
          });
        }
        function pe(ce) {
          return y(ce, function(se, re) {
            return se || RegExp("\\b" + (re.pattern || m(re)) + "\\b", "i").exec($) && (re.label || re);
          });
        }
        function fe(ce) {
          return y(ce, function(se, re) {
            var ge = re.pattern || m(re);
            return !se && (se = RegExp("\\b" + ge + "(?:/[\\d.]+|[ \\w.]*)", "i").exec($)) && (se = p(se, ge, re.label || re)), se;
          });
        }
        function Te(ce) {
          return y(ce, function(se, re) {
            var ge = re.pattern || m(re);
            return !se && (se = RegExp("\\b" + ge + " *\\d+[.\\w_]*", "i").exec($) || RegExp("\\b" + ge + " *\\w+-[\\w]*", "i").exec($) || RegExp("\\b" + ge + "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)", "i").exec($)) && ((se = String(re.label && !RegExp(ge, "i").test(re.label) ? re.label : se).split("/"))[1] && !/[\d.]+/.test(se[0]) && (se[0] += " " + se[1]), re = re.label || re, se = b(se[0].replace(RegExp(ge, "i"), re).replace(RegExp("; *(?:" + re + "[_-])?", "i"), " ").replace(RegExp("(" + re + ")[-_.]?(\\w)", "i"), "$1 $2"))), se;
          });
        }
        function ye(ce) {
          return y(ce, function(se, re) {
            return se || (RegExp(re + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)", "i").exec($) || 0)[1] || null;
          });
        }
        function Ke() {
          return this.description || "";
        }
        if (M && (M = [M]), /\bAndroid\b/.test(X) && !G && (I = /\bAndroid[^;]*;(.*?)(?:Build|\) AppleWebKit)\b/i.exec($)) && (G = v(I[1]).replace(/^[a-z]{2}-[a-z]{2};\s*/i, "") || null), Y && !G ? G = Te([Y]) : Y && G && (G = G.replace(RegExp("^(" + m(Y) + ")[-_.\\s]", "i"), Y + " ").replace(RegExp("^(" + m(Y) + ")[-_.]?(\\w)", "i"), Y + " $2")), (I = /\bGoogle TV\b/.exec(G)) && (G = I[0]), /\bSimulator\b/i.test($) && (G = (G ? G + " " : "") + "Simulator"), F == "Opera Mini" && /\bOPiOS\b/.test($) && W.push("running in Turbo/Uncompressed mode"), F == "IE" && /\blike iPhone OS\b/.test($) ? (I = _($.replace(/like iPhone OS/, "")), Y = I.manufacturer, G = I.product) : /^iP/.test(G) ? (F || (F = "Safari"), X = "iOS" + ((I = / OS ([\d_]+)/i.exec($)) ? " " + I[1].replace(/_/g, ".") : "")) : F == "Konqueror" && /^Linux\b/i.test(X) ? X = "Kubuntu" : Y && Y != "Google" && (/Chrome/.test(F) && !/\bMobile Safari\b/i.test($) || /\bVita\b/.test(G)) || /\bAndroid\b/.test(X) && /^Chrome/.test(F) && /\bVersion\//i.test($) ? (F = "Android Browser", X = /\bAndroid\b/.test(X) ? X : "Android") : F == "Silk" ? (/\bMobi/i.test($) || (X = "Android", W.unshift("desktop mode")), /Accelerated *= *true/i.test($) && W.unshift("accelerated")) : F == "UC Browser" && /\bUCWEB\b/.test($) ? W.push("speed mode") : F == "PaleMoon" && (I = /\bFirefox\/([\d.]+)\b/.exec($)) ? W.push("identifying as Firefox " + I[1]) : F == "Firefox" && (I = /\b(Mobile|Tablet|TV)\b/i.exec($)) ? (X || (X = "Firefox OS"), G || (G = I[1])) : !F || (I = !/\bMinefield\b/i.test($) && /\b(?:Firefox|Safari)\b/.exec(F)) ? (F && !G && /[\/,]|^[^(]+?\)/.test($.slice($.indexOf(I + "/") + 8)) && (F = null), (I = G || Y || X) && (G || Y || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(X)) && (F = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(X) ? X : I) + " Browser")) : F == "Electron" && (I = (/\bChrome\/([\d.]+)\b/.exec($) || 0)[1]) && W.push("Chromium " + I), P || (P = ye([
          "(?:Cloud9|CriOS|CrMo|Edge|Edg|EdgA|EdgiOS|FxiOS|HeadlessChrome|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$)|UCBrowser|YaBrowser)",
          "Version",
          m(F),
          "(?:Firefox|Minefield|NetFront)"
        ])), (I = M == "iCab" && parseFloat(P) > 3 && "WebKit" || /\bOpera\b/.test(F) && (/\bOPR\b/.test($) ? "Blink" : "Presto") || /\b(?:Midori|Nook|Safari)\b/i.test($) && !/^(?:Trident|EdgeHTML)$/.test(M) && "WebKit" || !M && /\bMSIE\b/i.test($) && (X == "Mac OS" ? "Tasman" : "Trident") || M == "WebKit" && /\bPlayStation\b(?! Vita\b)/i.test(F) && "NetFront") && (M = [I]), F == "IE" && (I = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec($) || 0)[1]) ? (F += " Mobile", X = "Windows Phone " + (/\+$/.test(I) ? I : I + ".x"), W.unshift("desktop mode")) : /\bWPDesktop\b/i.test($) ? (F = "IE Mobile", X = "Windows Phone 8.x", W.unshift("desktop mode"), P || (P = (/\brv:([\d.]+)/.exec($) || 0)[1])) : F != "IE" && M == "Trident" && (I = /\brv:([\d.]+)/.exec($)) && (F && W.push("identifying as " + F + (P ? " " + P : "")), F = "IE", P = I[1]), J) {
          if (c(O, "global"))
            if (x && (I = x.lang.System, K = I.getProperty("os.arch"), X = X || I.getProperty("os.name") + " " + I.getProperty("os.version")), D) {
              try {
                P = O.require("ringo/engine").version.join("."), F = "RingoJS";
              } catch {
                (I = O.system) && I.global.system == O.system && (F = "Narwhal", X || (X = I[0].os || null));
              }
              F || (F = "Rhino");
            } else typeof O.process == "object" && !O.process.browser && (I = O.process) && (typeof I.versions == "object" && (typeof I.versions.electron == "string" ? (W.push("Node " + I.versions.node), F = "Electron", P = I.versions.electron) : typeof I.versions.nw == "string" && (W.push("Chromium " + P, "Node " + I.versions.node), F = "NW.js", P = I.versions.nw)), F || (F = "Node.js", K = I.arch, X = I.platform, P = /[\d.]+/.exec(I.version), P = P ? P[0] : null));
          else h(I = O.runtime) == V ? (F = "Adobe AIR", X = I.flash.system.Capabilities.os) : h(I = O.phantom) == A ? (F = "PhantomJS", P = (I = I.version || null) && I.major + "." + I.minor + "." + I.patch) : typeof L.documentMode == "number" && (I = /\bTrident\/(\d+)/i.exec($)) ? (P = [P, L.documentMode], (I = +I[1] + 4) != P[1] && (W.push("IE " + P[1] + " mode"), M && (M[1] = ""), P[1] = I), P = F == "IE" ? String(P[1].toFixed(1)) : P[0]) : typeof L.documentMode == "number" && /^(?:Chrome|Firefox)\b/.test(F) && (W.push("masking as " + F + " " + P), F = "IE", P = "11.0", M = ["Trident"], X = "Windows");
          X = X && b(X);
        }
        if (P && (I = /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(P) || /(?:alpha|beta)(?: ?\d)?/i.exec($ + ";" + (J && k.appMinorVersion)) || /\bMinefield\b/i.test($) && "a") && (Q = /b/i.test(I) ? "beta" : "alpha", P = P.replace(RegExp(I + "\\+?$"), "") + (Q == "beta" ? j : C) + (/\d+\+?/.exec(I) || "")), F == "Fennec" || F == "Firefox" && /\b(?:Android|Firefox OS|KaiOS)\b/.test(X))
          F = "Firefox Mobile";
        else if (F == "Maxthon" && P)
          P = P.replace(/\.[\d.]+/, ".x");
        else if (/\bXbox\b/i.test(G))
          G == "Xbox 360" && (X = null), G == "Xbox 360" && /\bIEMobile\b/.test($) && W.unshift("mobile mode");
        else if ((/^(?:Chrome|IE|Opera)$/.test(F) || F && !G && !/Browser|Mobi/.test(F)) && (X == "Windows CE" || /Mobi/i.test($)))
          F += " Mobile";
        else if (F == "IE" && J)
          try {
            O.external === null && W.unshift("platform preview");
          } catch {
            W.unshift("embedded");
          }
        else (/\bBlackBerry\b/.test(G) || /\bBB10\b/.test($)) && (I = (RegExp(G.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec($) || 0)[1] || P) ? (I = [I, /BB10/.test($)], X = (I[1] ? (G = null, Y = "BlackBerry") : "Device Software") + " " + I[0], P = null) : this != l && G != "Wii" && (J && R || /Opera/.test(F) && /\b(?:MSIE|Firefox)\b/i.test($) || F == "Firefox" && /\bOS X (?:\d+\.){2,}/.test(X) || F == "IE" && (X && !/^Win/.test(X) && P > 5.5 || /\bWindows XP\b/.test(X) && P > 8 || P == 8 && !/\bTrident\b/.test($))) && !n.test(I = _.call(l, $.replace(n, "") + ";")) && I.name && (I = "ing as " + I.name + ((I = I.version) ? " " + I : ""), n.test(F) ? (/\bIE\b/.test(I) && X == "Mac OS" && (X = null), I = "identify" + I) : (I = "mask" + I, N ? F = b(N.replace(/([a-z])([A-Z])/g, "$1 $2")) : F = "Opera", /\bIE\b/.test(I) && (X = null), J || (P = null)), M = ["Presto"], W.push(I));
        (I = (/\bAppleWebKit\/([\d.]+\+?)/i.exec($) || 0)[1]) && (I = [parseFloat(I.replace(/\.(\d)$/, ".0$1")), I], F == "Safari" && I[1].slice(-1) == "+" ? (F = "WebKit Nightly", Q = "alpha", P = I[1].slice(0, -1)) : (P == I[1] || P == (I[2] = (/\bSafari\/([\d.]+\+?)/i.exec($) || 0)[1])) && (P = null), I[1] = (/\b(?:Headless)?Chrome\/([\d.]+)/i.exec($) || 0)[1], I[0] == 537.36 && I[2] == 537.36 && parseFloat(I[1]) >= 28 && M == "WebKit" && (M = ["Blink"]), !J || !U && !I[1] ? (M && (M[1] = "like Safari"), I = (I = I[0], I < 400 ? 1 : I < 500 ? 2 : I < 526 ? 3 : I < 533 ? 4 : I < 534 ? "4+" : I < 535 ? 5 : I < 537 ? 6 : I < 538 ? 7 : I < 601 ? 8 : I < 602 ? 9 : I < 604 ? 10 : I < 606 ? 11 : I < 608 ? 12 : "12")) : (M && (M[1] = "like Chrome"), I = I[1] || (I = I[0], I < 530 ? 1 : I < 532 ? 2 : I < 532.05 ? 3 : I < 533 ? 4 : I < 534.03 ? 5 : I < 534.07 ? 6 : I < 534.1 ? 7 : I < 534.13 ? 8 : I < 534.16 ? 9 : I < 534.24 ? 10 : I < 534.3 ? 11 : I < 535.01 ? 12 : I < 535.02 ? "13+" : I < 535.07 ? 15 : I < 535.11 ? 16 : I < 535.19 ? 17 : I < 536.05 ? 18 : I < 536.1 ? 19 : I < 537.01 ? 20 : I < 537.11 ? "21+" : I < 537.13 ? 23 : I < 537.18 ? 24 : I < 537.24 ? 25 : I < 537.36 ? 26 : M != "Blink" ? "27" : "28")), M && (M[1] += " " + (I += typeof I == "number" ? ".x" : /[.+]/.test(I) ? "" : "+")), F == "Safari" && (!P || parseInt(P) > 45) ? P = I : F == "Chrome" && /\bHeadlessChrome/i.test($) && W.unshift("headless")), F == "Opera" && (I = /\bzbov|zvav$/.exec(X)) ? (F += " ", W.unshift("desktop mode"), I == "zvav" ? (F += "Mini", P = null) : F += "Mobile", X = X.replace(RegExp(" *" + I + "$"), "")) : F == "Safari" && /\bChrome\b/.exec(M && M[1]) ? (W.unshift("desktop mode"), F = "Chrome Mobile", P = null, /\bOS X\b/.test(X) ? (Y = "Apple", X = "iOS 4.3+") : X = null) : /\bSRWare Iron\b/.test(F) && !P && (P = ye("Chrome")), P && P.indexOf(I = /[\d.]+$/.exec(X)) == 0 && $.indexOf("/" + I + "-") > -1 && (X = v(X.replace(I, ""))), X && X.indexOf(F) != -1 && !RegExp(F + " OS").test(X) && (X = X.replace(RegExp(" *" + m(F) + " *"), "")), M && !/\b(?:Avant|Nook)\b/.test(F) && (/Browser|Lunascape|Maxthon/.test(F) || F != "Safari" && /^iOS/.test(X) && /\bSafari\b/.test(M[1]) || /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|SRWare Iron|Vivaldi|Web)/.test(F) && M[1]) && (I = M[M.length - 1]) && W.push(I), W.length && (W = ["(" + W.join("; ") + ")"]), Y && G && G.indexOf(Y) < 0 && W.push("on " + Y), G && W.push((/^on /.test(W[W.length - 1]) ? "" : "on ") + G), X && (I = / ([\d.+]+)$/.exec(X), q = I && X.charAt(X.length - I[0].length - 1) == "/", X = {
          architecture: 32,
          family: I && !q ? X.replace(I[0], "") : X,
          version: I ? I[1] : null,
          toString: function() {
            var ce = this.version;
            return this.family + (ce && !q ? " " + ce : "") + (this.architecture == 64 ? " 64-bit" : "");
          }
        }), (I = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(K)) && !/\bi686\b/i.test(K) ? (X && (X.architecture = 64, X.family = X.family.replace(RegExp(" *" + I), "")), F && (/\bWOW64\b/i.test($) || J && /\w(?:86|32)$/.test(k.cpuClass || k.platform) && !/\bWin64; x64\b/i.test($)) && W.unshift("32-bit")) : X && /^OS X/.test(X.family) && F == "Chrome" && parseFloat(P) >= 39 && (X.architecture = 64), $ || ($ = null);
        var le = {};
        return le.description = $, le.layout = M && M[0], le.manufacturer = Y, le.name = F, le.prerelease = Q, le.product = G, le.ua = $, le.version = F && P, le.os = X || {
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
        }, le.parse = _, le.toString = Ke, le.version && W.unshift(P), le.name && W.unshift(F), X && F && !(X == String(X).split(" ")[0] && (X == F.split(" ")[0] || G)) && W.push(G ? "(" + X + ")" : "on " + X), W.length && (le.description = W.join(" ")), le;
      }
      var S = _();
      u && o ? l(S, function($, O) {
        u[O] = $;
      }) : s.platform = S;
    }).call(Qc);
  }(tt, tt.exports)), tt.exports;
}
var Xe = eu();
function Ic(e) {
  return parseInt(String(e), 10);
}
"toInt" in String.prototype || (String.prototype.toInt = function() {
  return Ic(this);
});
"toUint" in String.prototype || (String.prototype.toUint = function() {
  const e = Ic(this);
  return e < 0 ? -e : e;
});
class Or {
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
var Ir = {}, ut = {}, Gi;
function he() {
  return Gi || (Gi = 1, ut.fromCallback = function(e) {
    return Object.defineProperty(function(...t) {
      if (typeof t[t.length - 1] == "function") e.apply(this, t);
      else
        return new Promise((a, s) => {
          t.push((u, o) => u != null ? s(u) : a(o)), e.apply(this, t);
        });
    }, "name", { value: e.name });
  }, ut.fromPromise = function(e) {
    return Object.defineProperty(function(...t) {
      const a = t[t.length - 1];
      if (typeof a != "function") return e.apply(this, t);
      t.pop(), e.apply(this, t).then((s) => a(null, s), a);
    }, "name", { value: e.name });
  }), ut;
}
var Nr, Bi;
function tu() {
  if (Bi) return Nr;
  Bi = 1;
  var e = Xc, t = process.cwd, a = null, s = process.env.GRACEFUL_FS_PLATFORM || process.platform;
  process.cwd = function() {
    return a || (a = t.call(process)), a;
  };
  try {
    process.cwd();
  } catch {
  }
  if (typeof process.chdir == "function") {
    var u = process.chdir;
    process.chdir = function(r) {
      a = null, u.call(process, r);
    }, Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, u);
  }
  Nr = o;
  function o(r) {
    e.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && f(r), r.lutimes || n(r), r.chown = E(r.chown), r.fchown = E(r.fchown), r.lchown = E(r.lchown), r.chmod = i(r.chmod), r.fchmod = i(r.fchmod), r.lchmod = i(r.lchmod), r.chownSync = g(r.chownSync), r.fchownSync = g(r.fchownSync), r.lchownSync = g(r.lchownSync), r.chmodSync = d(r.chmodSync), r.fchmodSync = d(r.fchmodSync), r.lchmodSync = d(r.lchmodSync), r.stat = p(r.stat), r.fstat = p(r.fstat), r.lstat = p(r.lstat), r.statSync = w(r.statSync), r.fstatSync = w(r.fstatSync), r.lstatSync = w(r.lstatSync), r.chmod && !r.lchmod && (r.lchmod = function(l, h, c) {
      c && process.nextTick(c);
    }, r.lchmodSync = function() {
    }), r.chown && !r.lchown && (r.lchown = function(l, h, c, m) {
      m && process.nextTick(m);
    }, r.lchownSync = function() {
    }), s === "win32" && (r.rename = typeof r.rename != "function" ? r.rename : function(l) {
      function h(c, m, y) {
        var v = Date.now(), _ = 0;
        l(c, m, function S($) {
          if ($ && ($.code === "EACCES" || $.code === "EPERM" || $.code === "EBUSY") && Date.now() - v < 6e4) {
            setTimeout(function() {
              r.stat(m, function(O, T) {
                O && O.code === "ENOENT" ? l(c, m, S) : y($);
              });
            }, _), _ < 100 && (_ += 10);
            return;
          }
          y && y($);
        });
      }
      return Object.setPrototypeOf && Object.setPrototypeOf(h, l), h;
    }(r.rename)), r.read = typeof r.read != "function" ? r.read : function(l) {
      function h(c, m, y, v, _, S) {
        var $;
        if (S && typeof S == "function") {
          var O = 0;
          $ = function(T, k, H) {
            if (T && T.code === "EAGAIN" && O < 10)
              return O++, l.call(r, c, m, y, v, _, $);
            S.apply(this, arguments);
          };
        }
        return l.call(r, c, m, y, v, _, $);
      }
      return Object.setPrototypeOf && Object.setPrototypeOf(h, l), h;
    }(r.read), r.readSync = typeof r.readSync != "function" ? r.readSync : /* @__PURE__ */ function(l) {
      return function(h, c, m, y, v) {
        for (var _ = 0; ; )
          try {
            return l.call(r, h, c, m, y, v);
          } catch (S) {
            if (S.code === "EAGAIN" && _ < 10) {
              _++;
              continue;
            }
            throw S;
          }
      };
    }(r.readSync);
    function f(l) {
      l.lchmod = function(h, c, m) {
        l.open(
          h,
          e.O_WRONLY | e.O_SYMLINK,
          c,
          function(y, v) {
            if (y) {
              m && m(y);
              return;
            }
            l.fchmod(v, c, function(_) {
              l.close(v, function(S) {
                m && m(_ || S);
              });
            });
          }
        );
      }, l.lchmodSync = function(h, c) {
        var m = l.openSync(h, e.O_WRONLY | e.O_SYMLINK, c), y = !0, v;
        try {
          v = l.fchmodSync(m, c), y = !1;
        } finally {
          if (y)
            try {
              l.closeSync(m);
            } catch {
            }
          else
            l.closeSync(m);
        }
        return v;
      };
    }
    function n(l) {
      e.hasOwnProperty("O_SYMLINK") && l.futimes ? (l.lutimes = function(h, c, m, y) {
        l.open(h, e.O_SYMLINK, function(v, _) {
          if (v) {
            y && y(v);
            return;
          }
          l.futimes(_, c, m, function(S) {
            l.close(_, function($) {
              y && y(S || $);
            });
          });
        });
      }, l.lutimesSync = function(h, c, m) {
        var y = l.openSync(h, e.O_SYMLINK), v, _ = !0;
        try {
          v = l.futimesSync(y, c, m), _ = !1;
        } finally {
          if (_)
            try {
              l.closeSync(y);
            } catch {
            }
          else
            l.closeSync(y);
        }
        return v;
      }) : l.futimes && (l.lutimes = function(h, c, m, y) {
        y && process.nextTick(y);
      }, l.lutimesSync = function() {
      });
    }
    function i(l) {
      return l && function(h, c, m) {
        return l.call(r, h, c, function(y) {
          b(y) && (y = null), m && m.apply(this, arguments);
        });
      };
    }
    function d(l) {
      return l && function(h, c) {
        try {
          return l.call(r, h, c);
        } catch (m) {
          if (!b(m)) throw m;
        }
      };
    }
    function E(l) {
      return l && function(h, c, m, y) {
        return l.call(r, h, c, m, function(v) {
          b(v) && (v = null), y && y.apply(this, arguments);
        });
      };
    }
    function g(l) {
      return l && function(h, c, m) {
        try {
          return l.call(r, h, c, m);
        } catch (y) {
          if (!b(y)) throw y;
        }
      };
    }
    function p(l) {
      return l && function(h, c, m) {
        typeof c == "function" && (m = c, c = null);
        function y(v, _) {
          _ && (_.uid < 0 && (_.uid += 4294967296), _.gid < 0 && (_.gid += 4294967296)), m && m.apply(this, arguments);
        }
        return c ? l.call(r, h, c, y) : l.call(r, h, y);
      };
    }
    function w(l) {
      return l && function(h, c) {
        var m = c ? l.call(r, h, c) : l.call(r, h);
        return m && (m.uid < 0 && (m.uid += 4294967296), m.gid < 0 && (m.gid += 4294967296)), m;
      };
    }
    function b(l) {
      if (!l || l.code === "ENOSYS")
        return !0;
      var h = !process.getuid || process.getuid() !== 0;
      return !!(h && (l.code === "EINVAL" || l.code === "EPERM"));
    }
  }
  return Nr;
}
var Pr, Hi;
function ru() {
  if (Hi) return Pr;
  Hi = 1;
  var e = Zc.Stream;
  Pr = t;
  function t(a) {
    return {
      ReadStream: s,
      WriteStream: u
    };
    function s(o, r) {
      if (!(this instanceof s)) return new s(o, r);
      e.call(this);
      var f = this;
      this.path = o, this.fd = null, this.readable = !0, this.paused = !1, this.flags = "r", this.mode = 438, this.bufferSize = 64 * 1024, r = r || {};
      for (var n = Object.keys(r), i = 0, d = n.length; i < d; i++) {
        var E = n[i];
        this[E] = r[E];
      }
      if (this.encoding && this.setEncoding(this.encoding), this.start !== void 0) {
        if (typeof this.start != "number")
          throw TypeError("start must be a Number");
        if (this.end === void 0)
          this.end = 1 / 0;
        else if (typeof this.end != "number")
          throw TypeError("end must be a Number");
        if (this.start > this.end)
          throw new Error("start must be <= end");
        this.pos = this.start;
      }
      if (this.fd !== null) {
        process.nextTick(function() {
          f._read();
        });
        return;
      }
      a.open(this.path, this.flags, this.mode, function(g, p) {
        if (g) {
          f.emit("error", g), f.readable = !1;
          return;
        }
        f.fd = p, f.emit("open", p), f._read();
      });
    }
    function u(o, r) {
      if (!(this instanceof u)) return new u(o, r);
      e.call(this), this.path = o, this.fd = null, this.writable = !0, this.flags = "w", this.encoding = "binary", this.mode = 438, this.bytesWritten = 0, r = r || {};
      for (var f = Object.keys(r), n = 0, i = f.length; n < i; n++) {
        var d = f[n];
        this[d] = r[d];
      }
      if (this.start !== void 0) {
        if (typeof this.start != "number")
          throw TypeError("start must be a Number");
        if (this.start < 0)
          throw new Error("start must be >= zero");
        this.pos = this.start;
      }
      this.busy = !1, this._queue = [], this.fd === null && (this._open = a.open, this._queue.push([this._open, this.path, this.flags, this.mode, void 0]), this.flush());
    }
  }
  return Pr;
}
var Tr, Wi;
function nu() {
  if (Wi) return Tr;
  Wi = 1, Tr = t;
  var e = Object.getPrototypeOf || function(a) {
    return a.__proto__;
  };
  function t(a) {
    if (a === null || typeof a != "object")
      return a;
    if (a instanceof Object)
      var s = { __proto__: e(a) };
    else
      var s = /* @__PURE__ */ Object.create(null);
    return Object.getOwnPropertyNames(a).forEach(function(u) {
      Object.defineProperty(s, u, Object.getOwnPropertyDescriptor(a, u));
    }), s;
  }
  return Tr;
}
var ft, Ki;
function it() {
  if (Ki) return ft;
  Ki = 1;
  var e = Be, t = tu(), a = ru(), s = nu(), u = Ii, o, r;
  typeof Symbol == "function" && typeof Symbol.for == "function" ? (o = Symbol.for("graceful-fs.queue"), r = Symbol.for("graceful-fs.previous")) : (o = "___graceful-fs.queue", r = "___graceful-fs.previous");
  function f() {
  }
  function n(l, h) {
    Object.defineProperty(l, o, {
      get: function() {
        return h;
      }
    });
  }
  var i = f;
  if (u.debuglog ? i = u.debuglog("gfs4") : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && (i = function() {
    var l = u.format.apply(u, arguments);
    l = "GFS4: " + l.split(/\n/).join(`
GFS4: `), console.error(l);
  }), !e[o]) {
    var d = nt[o] || [];
    n(e, d), e.close = function(l) {
      function h(c, m) {
        return l.call(e, c, function(y) {
          y || w(), typeof m == "function" && m.apply(this, arguments);
        });
      }
      return Object.defineProperty(h, r, {
        value: l
      }), h;
    }(e.close), e.closeSync = function(l) {
      function h(c) {
        l.apply(e, arguments), w();
      }
      return Object.defineProperty(h, r, {
        value: l
      }), h;
    }(e.closeSync), /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && process.on("exit", function() {
      i(e[o]), $c.equal(e[o].length, 0);
    });
  }
  nt[o] || n(nt, e[o]), ft = E(s(e)), process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !e.__patched && (ft = E(e), e.__patched = !0);
  function E(l) {
    t(l), l.gracefulify = E, l.createReadStream = C, l.createWriteStream = j;
    var h = l.readFile;
    l.readFile = c;
    function c(N, I, K) {
      return typeof I == "function" && (K = I, I = null), W(N, I, K);
      function W(Q, J, P, q) {
        return h(Q, J, function(M) {
          M && (M.code === "EMFILE" || M.code === "ENFILE") ? g([W, [Q, J, P], M, q || Date.now(), Date.now()]) : typeof P == "function" && P.apply(this, arguments);
        });
      }
    }
    var m = l.writeFile;
    l.writeFile = y;
    function y(N, I, K, W) {
      return typeof K == "function" && (W = K, K = null), Q(N, I, K, W);
      function Q(J, P, q, M, F) {
        return m(J, P, q, function(G) {
          G && (G.code === "EMFILE" || G.code === "ENFILE") ? g([Q, [J, P, q, M], G, F || Date.now(), Date.now()]) : typeof M == "function" && M.apply(this, arguments);
        });
      }
    }
    var v = l.appendFile;
    v && (l.appendFile = _);
    function _(N, I, K, W) {
      return typeof K == "function" && (W = K, K = null), Q(N, I, K, W);
      function Q(J, P, q, M, F) {
        return v(J, P, q, function(G) {
          G && (G.code === "EMFILE" || G.code === "ENFILE") ? g([Q, [J, P, q, M], G, F || Date.now(), Date.now()]) : typeof M == "function" && M.apply(this, arguments);
        });
      }
    }
    var S = l.copyFile;
    S && (l.copyFile = $);
    function $(N, I, K, W) {
      return typeof K == "function" && (W = K, K = 0), Q(N, I, K, W);
      function Q(J, P, q, M, F) {
        return S(J, P, q, function(G) {
          G && (G.code === "EMFILE" || G.code === "ENFILE") ? g([Q, [J, P, q, M], G, F || Date.now(), Date.now()]) : typeof M == "function" && M.apply(this, arguments);
        });
      }
    }
    var O = l.readdir;
    l.readdir = k;
    var T = /^v[0-5]\./;
    function k(N, I, K) {
      typeof I == "function" && (K = I, I = null);
      var W = T.test(process.version) ? function(P, q, M, F) {
        return O(P, Q(
          P,
          q,
          M,
          F
        ));
      } : function(P, q, M, F) {
        return O(P, q, Q(
          P,
          q,
          M,
          F
        ));
      };
      return W(N, I, K);
      function Q(J, P, q, M) {
        return function(F, G) {
          F && (F.code === "EMFILE" || F.code === "ENFILE") ? g([
            W,
            [J, P, q],
            F,
            M || Date.now(),
            Date.now()
          ]) : (G && G.sort && G.sort(), typeof q == "function" && q.call(this, F, G));
        };
      }
    }
    if (process.version.substr(0, 4) === "v0.8") {
      var H = a(l);
      B = H.ReadStream, x = H.WriteStream;
    }
    var U = l.ReadStream;
    U && (B.prototype = Object.create(U.prototype), B.prototype.open = A);
    var z = l.WriteStream;
    z && (x.prototype = Object.create(z.prototype), x.prototype.open = D), Object.defineProperty(l, "ReadStream", {
      get: function() {
        return B;
      },
      set: function(N) {
        B = N;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(l, "WriteStream", {
      get: function() {
        return x;
      },
      set: function(N) {
        x = N;
      },
      enumerable: !0,
      configurable: !0
    });
    var V = B;
    Object.defineProperty(l, "FileReadStream", {
      get: function() {
        return V;
      },
      set: function(N) {
        V = N;
      },
      enumerable: !0,
      configurable: !0
    });
    var Z = x;
    Object.defineProperty(l, "FileWriteStream", {
      get: function() {
        return Z;
      },
      set: function(N) {
        Z = N;
      },
      enumerable: !0,
      configurable: !0
    });
    function B(N, I) {
      return this instanceof B ? (U.apply(this, arguments), this) : B.apply(Object.create(B.prototype), arguments);
    }
    function A() {
      var N = this;
      R(N.path, N.flags, N.mode, function(I, K) {
        I ? (N.autoClose && N.destroy(), N.emit("error", I)) : (N.fd = K, N.emit("open", K), N.read());
      });
    }
    function x(N, I) {
      return this instanceof x ? (z.apply(this, arguments), this) : x.apply(Object.create(x.prototype), arguments);
    }
    function D() {
      var N = this;
      R(N.path, N.flags, N.mode, function(I, K) {
        I ? (N.destroy(), N.emit("error", I)) : (N.fd = K, N.emit("open", K));
      });
    }
    function C(N, I) {
      return new l.ReadStream(N, I);
    }
    function j(N, I) {
      return new l.WriteStream(N, I);
    }
    var L = l.open;
    l.open = R;
    function R(N, I, K, W) {
      return typeof K == "function" && (W = K, K = null), Q(N, I, K, W);
      function Q(J, P, q, M, F) {
        return L(J, P, q, function(G, Y) {
          G && (G.code === "EMFILE" || G.code === "ENFILE") ? g([Q, [J, P, q, M], G, F || Date.now(), Date.now()]) : typeof M == "function" && M.apply(this, arguments);
        });
      }
    }
    return l;
  }
  function g(l) {
    i("ENQUEUE", l[0].name, l[1]), e[o].push(l), b();
  }
  var p;
  function w() {
    for (var l = Date.now(), h = 0; h < e[o].length; ++h)
      e[o][h].length > 2 && (e[o][h][3] = l, e[o][h][4] = l);
    b();
  }
  function b() {
    if (clearTimeout(p), p = void 0, e[o].length !== 0) {
      var l = e[o].shift(), h = l[0], c = l[1], m = l[2], y = l[3], v = l[4];
      if (y === void 0)
        i("RETRY", h.name, c), h.apply(null, c);
      else if (Date.now() - y >= 6e4) {
        i("TIMEOUT", h.name, c);
        var _ = c.pop();
        typeof _ == "function" && _.call(null, m);
      } else {
        var S = Date.now() - v, $ = Math.max(v - y, 1), O = Math.min($ * 1.2, 100);
        S >= O ? (i("RETRY", h.name, c), h.apply(null, c.concat([y]))) : e[o].push(l);
      }
      p === void 0 && (p = setTimeout(b, 0));
    }
  }
  return ft;
}
var Xi;
function _e() {
  return Xi || (Xi = 1, function(e) {
    const t = he().fromCallback, a = it(), s = [
      "access",
      "appendFile",
      "chmod",
      "chown",
      "close",
      "copyFile",
      "fchmod",
      "fchown",
      "fdatasync",
      "fstat",
      "fsync",
      "ftruncate",
      "futimes",
      "lchmod",
      "lchown",
      "link",
      "lstat",
      "mkdir",
      "mkdtemp",
      "open",
      "opendir",
      "readdir",
      "readFile",
      "readlink",
      "realpath",
      "rename",
      "rm",
      "rmdir",
      "stat",
      "symlink",
      "truncate",
      "unlink",
      "utimes",
      "writeFile"
    ].filter((u) => typeof a[u] == "function");
    Object.assign(e, a), s.forEach((u) => {
      e[u] = t(a[u]);
    }), e.exists = function(u, o) {
      return typeof o == "function" ? a.exists(u, o) : new Promise((r) => a.exists(u, r));
    }, e.read = function(u, o, r, f, n, i) {
      return typeof i == "function" ? a.read(u, o, r, f, n, i) : new Promise((d, E) => {
        a.read(u, o, r, f, n, (g, p, w) => {
          if (g) return E(g);
          d({ bytesRead: p, buffer: w });
        });
      });
    }, e.write = function(u, o, ...r) {
      return typeof r[r.length - 1] == "function" ? a.write(u, o, ...r) : new Promise((f, n) => {
        a.write(u, o, ...r, (i, d, E) => {
          if (i) return n(i);
          f({ bytesWritten: d, buffer: E });
        });
      });
    }, e.readv = function(u, o, ...r) {
      return typeof r[r.length - 1] == "function" ? a.readv(u, o, ...r) : new Promise((f, n) => {
        a.readv(u, o, ...r, (i, d, E) => {
          if (i) return n(i);
          f({ bytesRead: d, buffers: E });
        });
      });
    }, e.writev = function(u, o, ...r) {
      return typeof r[r.length - 1] == "function" ? a.writev(u, o, ...r) : new Promise((f, n) => {
        a.writev(u, o, ...r, (i, d, E) => {
          if (i) return n(i);
          f({ bytesWritten: d, buffers: E });
        });
      });
    }, typeof a.realpath.native == "function" ? e.realpath.native = t(a.realpath.native) : process.emitWarning(
      "fs.realpath.native is not a function. Is fs being monkey-patched?",
      "Warning",
      "fs-extra-WARN0003"
    );
  }(Ir)), Ir;
}
var lt = {}, Cr = {}, Zi;
function iu() {
  if (Zi) return Cr;
  Zi = 1;
  const e = ue;
  return Cr.checkPath = function(a) {
    if (process.platform === "win32" && /[<>:"|?*]/.test(a.replace(e.parse(a).root, ""))) {
      const u = new Error(`Path contains invalid characters: ${a}`);
      throw u.code = "EINVAL", u;
    }
  }, Cr;
}
var Ji;
function su() {
  if (Ji) return lt;
  Ji = 1;
  const e = /* @__PURE__ */ _e(), { checkPath: t } = /* @__PURE__ */ iu(), a = (s) => {
    const u = { mode: 511 };
    return typeof s == "number" ? s : { ...u, ...s }.mode;
  };
  return lt.makeDir = async (s, u) => (t(s), e.mkdir(s, {
    mode: a(u),
    recursive: !0
  })), lt.makeDirSync = (s, u) => (t(s), e.mkdirSync(s, {
    mode: a(u),
    recursive: !0
  })), lt;
}
var Dr, Yi;
function Pe() {
  if (Yi) return Dr;
  Yi = 1;
  const e = he().fromPromise, { makeDir: t, makeDirSync: a } = /* @__PURE__ */ su(), s = e(t);
  return Dr = {
    mkdirs: s,
    mkdirsSync: a,
    // alias
    mkdirp: s,
    mkdirpSync: a,
    ensureDir: s,
    ensureDirSync: a
  }, Dr;
}
var Lr, Qi;
function ze() {
  if (Qi) return Lr;
  Qi = 1;
  const e = he().fromPromise, t = /* @__PURE__ */ _e();
  function a(s) {
    return t.access(s).then(() => !0).catch(() => !1);
  }
  return Lr = {
    pathExists: e(a),
    pathExistsSync: t.existsSync
  }, Lr;
}
var Ar, es;
function Nc() {
  if (es) return Ar;
  es = 1;
  const e = /* @__PURE__ */ _e(), t = he().fromPromise;
  async function a(u, o, r) {
    const f = await e.open(u, "r+");
    let n = null;
    try {
      await e.futimes(f, o, r);
    } finally {
      try {
        await e.close(f);
      } catch (i) {
        n = i;
      }
    }
    if (n)
      throw n;
  }
  function s(u, o, r) {
    const f = e.openSync(u, "r+");
    return e.futimesSync(f, o, r), e.closeSync(f);
  }
  return Ar = {
    utimesMillis: t(a),
    utimesMillisSync: s
  }, Ar;
}
var Fr, ts;
function He() {
  if (ts) return Fr;
  ts = 1;
  const e = /* @__PURE__ */ _e(), t = ue, a = he().fromPromise;
  function s(g, p, w) {
    const b = w.dereference ? (l) => e.stat(l, { bigint: !0 }) : (l) => e.lstat(l, { bigint: !0 });
    return Promise.all([
      b(g),
      b(p).catch((l) => {
        if (l.code === "ENOENT") return null;
        throw l;
      })
    ]).then(([l, h]) => ({ srcStat: l, destStat: h }));
  }
  function u(g, p, w) {
    let b;
    const l = w.dereference ? (c) => e.statSync(c, { bigint: !0 }) : (c) => e.lstatSync(c, { bigint: !0 }), h = l(g);
    try {
      b = l(p);
    } catch (c) {
      if (c.code === "ENOENT") return { srcStat: h, destStat: null };
      throw c;
    }
    return { srcStat: h, destStat: b };
  }
  async function o(g, p, w, b) {
    const { srcStat: l, destStat: h } = await s(g, p, b);
    if (h) {
      if (i(l, h)) {
        const c = t.basename(g), m = t.basename(p);
        if (w === "move" && c !== m && c.toLowerCase() === m.toLowerCase())
          return { srcStat: l, destStat: h, isChangingCase: !0 };
        throw new Error("Source and destination must not be the same.");
      }
      if (l.isDirectory() && !h.isDirectory())
        throw new Error(`Cannot overwrite non-directory '${p}' with directory '${g}'.`);
      if (!l.isDirectory() && h.isDirectory())
        throw new Error(`Cannot overwrite directory '${p}' with non-directory '${g}'.`);
    }
    if (l.isDirectory() && d(g, p))
      throw new Error(E(g, p, w));
    return { srcStat: l, destStat: h };
  }
  function r(g, p, w, b) {
    const { srcStat: l, destStat: h } = u(g, p, b);
    if (h) {
      if (i(l, h)) {
        const c = t.basename(g), m = t.basename(p);
        if (w === "move" && c !== m && c.toLowerCase() === m.toLowerCase())
          return { srcStat: l, destStat: h, isChangingCase: !0 };
        throw new Error("Source and destination must not be the same.");
      }
      if (l.isDirectory() && !h.isDirectory())
        throw new Error(`Cannot overwrite non-directory '${p}' with directory '${g}'.`);
      if (!l.isDirectory() && h.isDirectory())
        throw new Error(`Cannot overwrite directory '${p}' with non-directory '${g}'.`);
    }
    if (l.isDirectory() && d(g, p))
      throw new Error(E(g, p, w));
    return { srcStat: l, destStat: h };
  }
  async function f(g, p, w, b) {
    const l = t.resolve(t.dirname(g)), h = t.resolve(t.dirname(w));
    if (h === l || h === t.parse(h).root) return;
    let c;
    try {
      c = await e.stat(h, { bigint: !0 });
    } catch (m) {
      if (m.code === "ENOENT") return;
      throw m;
    }
    if (i(p, c))
      throw new Error(E(g, w, b));
    return f(g, p, h, b);
  }
  function n(g, p, w, b) {
    const l = t.resolve(t.dirname(g)), h = t.resolve(t.dirname(w));
    if (h === l || h === t.parse(h).root) return;
    let c;
    try {
      c = e.statSync(h, { bigint: !0 });
    } catch (m) {
      if (m.code === "ENOENT") return;
      throw m;
    }
    if (i(p, c))
      throw new Error(E(g, w, b));
    return n(g, p, h, b);
  }
  function i(g, p) {
    return p.ino && p.dev && p.ino === g.ino && p.dev === g.dev;
  }
  function d(g, p) {
    const w = t.resolve(g).split(t.sep).filter((l) => l), b = t.resolve(p).split(t.sep).filter((l) => l);
    return w.every((l, h) => b[h] === l);
  }
  function E(g, p, w) {
    return `Cannot ${w} '${g}' to a subdirectory of itself, '${p}'.`;
  }
  return Fr = {
    // checkPaths
    checkPaths: a(o),
    checkPathsSync: r,
    // checkParent
    checkParentPaths: a(f),
    checkParentPathsSync: n,
    // Misc
    isSrcSubdir: d,
    areIdentical: i
  }, Fr;
}
var qr, rs;
function ou() {
  if (rs) return qr;
  rs = 1;
  const e = /* @__PURE__ */ _e(), t = ue, { mkdirs: a } = /* @__PURE__ */ Pe(), { pathExists: s } = /* @__PURE__ */ ze(), { utimesMillis: u } = /* @__PURE__ */ Nc(), o = /* @__PURE__ */ He();
  async function r(b, l, h = {}) {
    typeof h == "function" && (h = { filter: h }), h.clobber = "clobber" in h ? !!h.clobber : !0, h.overwrite = "overwrite" in h ? !!h.overwrite : h.clobber, h.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
      `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
      "Warning",
      "fs-extra-WARN0001"
    );
    const { srcStat: c, destStat: m } = await o.checkPaths(b, l, "copy", h);
    if (await o.checkParentPaths(b, c, l, "copy"), !await f(b, l, h)) return;
    const v = t.dirname(l);
    await s(v) || await a(v), await n(m, b, l, h);
  }
  async function f(b, l, h) {
    return h.filter ? h.filter(b, l) : !0;
  }
  async function n(b, l, h, c) {
    const y = await (c.dereference ? e.stat : e.lstat)(l);
    if (y.isDirectory()) return p(y, b, l, h, c);
    if (y.isFile() || y.isCharacterDevice() || y.isBlockDevice()) return i(y, b, l, h, c);
    if (y.isSymbolicLink()) return w(b, l, h, c);
    throw y.isSocket() ? new Error(`Cannot copy a socket file: ${l}`) : y.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${l}`) : new Error(`Unknown file: ${l}`);
  }
  async function i(b, l, h, c, m) {
    if (!l) return d(b, h, c, m);
    if (m.overwrite)
      return await e.unlink(c), d(b, h, c, m);
    if (m.errorOnExist)
      throw new Error(`'${c}' already exists`);
  }
  async function d(b, l, h, c) {
    if (await e.copyFile(l, h), c.preserveTimestamps) {
      E(b.mode) && await g(h, b.mode);
      const m = await e.stat(l);
      await u(h, m.atime, m.mtime);
    }
    return e.chmod(h, b.mode);
  }
  function E(b) {
    return (b & 128) === 0;
  }
  function g(b, l) {
    return e.chmod(b, l | 128);
  }
  async function p(b, l, h, c, m) {
    l || await e.mkdir(c);
    const y = await e.readdir(h);
    await Promise.all(y.map(async (v) => {
      const _ = t.join(h, v), S = t.join(c, v);
      if (!await f(_, S, m)) return;
      const { destStat: O } = await o.checkPaths(_, S, "copy", m);
      return n(O, _, S, m);
    })), l || await e.chmod(c, b.mode);
  }
  async function w(b, l, h, c) {
    let m = await e.readlink(l);
    if (c.dereference && (m = t.resolve(process.cwd(), m)), !b)
      return e.symlink(m, h);
    let y = null;
    try {
      y = await e.readlink(h);
    } catch (v) {
      if (v.code === "EINVAL" || v.code === "UNKNOWN") return e.symlink(m, h);
      throw v;
    }
    if (c.dereference && (y = t.resolve(process.cwd(), y)), o.isSrcSubdir(m, y))
      throw new Error(`Cannot copy '${m}' to a subdirectory of itself, '${y}'.`);
    if (o.isSrcSubdir(y, m))
      throw new Error(`Cannot overwrite '${y}' with '${m}'.`);
    return await e.unlink(h), e.symlink(m, h);
  }
  return qr = r, qr;
}
var kr, ns;
function au() {
  if (ns) return kr;
  ns = 1;
  const e = it(), t = ue, a = Pe().mkdirsSync, s = Nc().utimesMillisSync, u = /* @__PURE__ */ He();
  function o(v, _, S) {
    typeof S == "function" && (S = { filter: S }), S = S || {}, S.clobber = "clobber" in S ? !!S.clobber : !0, S.overwrite = "overwrite" in S ? !!S.overwrite : S.clobber, S.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
      `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
      "Warning",
      "fs-extra-WARN0002"
    );
    const { srcStat: $, destStat: O } = u.checkPathsSync(v, _, "copy", S);
    if (u.checkParentPathsSync(v, $, _, "copy"), S.filter && !S.filter(v, _)) return;
    const T = t.dirname(_);
    return e.existsSync(T) || a(T), r(O, v, _, S);
  }
  function r(v, _, S, $) {
    const T = ($.dereference ? e.statSync : e.lstatSync)(_);
    if (T.isDirectory()) return b(T, v, _, S, $);
    if (T.isFile() || T.isCharacterDevice() || T.isBlockDevice()) return f(T, v, _, S, $);
    if (T.isSymbolicLink()) return m(v, _, S, $);
    throw T.isSocket() ? new Error(`Cannot copy a socket file: ${_}`) : T.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${_}`) : new Error(`Unknown file: ${_}`);
  }
  function f(v, _, S, $, O) {
    return _ ? n(v, S, $, O) : i(v, S, $, O);
  }
  function n(v, _, S, $) {
    if ($.overwrite)
      return e.unlinkSync(S), i(v, _, S, $);
    if ($.errorOnExist)
      throw new Error(`'${S}' already exists`);
  }
  function i(v, _, S, $) {
    return e.copyFileSync(_, S), $.preserveTimestamps && d(v.mode, _, S), p(S, v.mode);
  }
  function d(v, _, S) {
    return E(v) && g(S, v), w(_, S);
  }
  function E(v) {
    return (v & 128) === 0;
  }
  function g(v, _) {
    return p(v, _ | 128);
  }
  function p(v, _) {
    return e.chmodSync(v, _);
  }
  function w(v, _) {
    const S = e.statSync(v);
    return s(_, S.atime, S.mtime);
  }
  function b(v, _, S, $, O) {
    return _ ? h(S, $, O) : l(v.mode, S, $, O);
  }
  function l(v, _, S, $) {
    return e.mkdirSync(S), h(_, S, $), p(S, v);
  }
  function h(v, _, S) {
    e.readdirSync(v).forEach(($) => c($, v, _, S));
  }
  function c(v, _, S, $) {
    const O = t.join(_, v), T = t.join(S, v);
    if ($.filter && !$.filter(O, T)) return;
    const { destStat: k } = u.checkPathsSync(O, T, "copy", $);
    return r(k, O, T, $);
  }
  function m(v, _, S, $) {
    let O = e.readlinkSync(_);
    if ($.dereference && (O = t.resolve(process.cwd(), O)), v) {
      let T;
      try {
        T = e.readlinkSync(S);
      } catch (k) {
        if (k.code === "EINVAL" || k.code === "UNKNOWN") return e.symlinkSync(O, S);
        throw k;
      }
      if ($.dereference && (T = t.resolve(process.cwd(), T)), u.isSrcSubdir(O, T))
        throw new Error(`Cannot copy '${O}' to a subdirectory of itself, '${T}'.`);
      if (u.isSrcSubdir(T, O))
        throw new Error(`Cannot overwrite '${T}' with '${O}'.`);
      return y(O, S);
    } else
      return e.symlinkSync(O, S);
  }
  function y(v, _) {
    return e.unlinkSync(_), e.symlinkSync(v, _);
  }
  return kr = o, kr;
}
var jr, is;
function Ni() {
  if (is) return jr;
  is = 1;
  const e = he().fromPromise;
  return jr = {
    copy: e(/* @__PURE__ */ ou()),
    copySync: /* @__PURE__ */ au()
  }, jr;
}
var Mr, ss;
function yr() {
  if (ss) return Mr;
  ss = 1;
  const e = it(), t = he().fromCallback;
  function a(u, o) {
    e.rm(u, { recursive: !0, force: !0 }, o);
  }
  function s(u) {
    e.rmSync(u, { recursive: !0, force: !0 });
  }
  return Mr = {
    remove: t(a),
    removeSync: s
  }, Mr;
}
var xr, os;
function cu() {
  if (os) return xr;
  os = 1;
  const e = he().fromPromise, t = /* @__PURE__ */ _e(), a = ue, s = /* @__PURE__ */ Pe(), u = /* @__PURE__ */ yr(), o = e(async function(n) {
    let i;
    try {
      i = await t.readdir(n);
    } catch {
      return s.mkdirs(n);
    }
    return Promise.all(i.map((d) => u.remove(a.join(n, d))));
  });
  function r(f) {
    let n;
    try {
      n = t.readdirSync(f);
    } catch {
      return s.mkdirsSync(f);
    }
    n.forEach((i) => {
      i = a.join(f, i), u.removeSync(i);
    });
  }
  return xr = {
    emptyDirSync: r,
    emptydirSync: r,
    emptyDir: o,
    emptydir: o
  }, xr;
}
var Ur, as;
function uu() {
  if (as) return Ur;
  as = 1;
  const e = he().fromPromise, t = ue, a = /* @__PURE__ */ _e(), s = /* @__PURE__ */ Pe();
  async function u(r) {
    let f;
    try {
      f = await a.stat(r);
    } catch {
    }
    if (f && f.isFile()) return;
    const n = t.dirname(r);
    let i = null;
    try {
      i = await a.stat(n);
    } catch (d) {
      if (d.code === "ENOENT") {
        await s.mkdirs(n), await a.writeFile(r, "");
        return;
      } else
        throw d;
    }
    i.isDirectory() ? await a.writeFile(r, "") : await a.readdir(n);
  }
  function o(r) {
    let f;
    try {
      f = a.statSync(r);
    } catch {
    }
    if (f && f.isFile()) return;
    const n = t.dirname(r);
    try {
      a.statSync(n).isDirectory() || a.readdirSync(n);
    } catch (i) {
      if (i && i.code === "ENOENT") s.mkdirsSync(n);
      else throw i;
    }
    a.writeFileSync(r, "");
  }
  return Ur = {
    createFile: e(u),
    createFileSync: o
  }, Ur;
}
var zr, cs;
function fu() {
  if (cs) return zr;
  cs = 1;
  const e = he().fromPromise, t = ue, a = /* @__PURE__ */ _e(), s = /* @__PURE__ */ Pe(), { pathExists: u } = /* @__PURE__ */ ze(), { areIdentical: o } = /* @__PURE__ */ He();
  async function r(n, i) {
    let d;
    try {
      d = await a.lstat(i);
    } catch {
    }
    let E;
    try {
      E = await a.lstat(n);
    } catch (w) {
      throw w.message = w.message.replace("lstat", "ensureLink"), w;
    }
    if (d && o(E, d)) return;
    const g = t.dirname(i);
    await u(g) || await s.mkdirs(g), await a.link(n, i);
  }
  function f(n, i) {
    let d;
    try {
      d = a.lstatSync(i);
    } catch {
    }
    try {
      const p = a.lstatSync(n);
      if (d && o(p, d)) return;
    } catch (p) {
      throw p.message = p.message.replace("lstat", "ensureLink"), p;
    }
    const E = t.dirname(i);
    return a.existsSync(E) || s.mkdirsSync(E), a.linkSync(n, i);
  }
  return zr = {
    createLink: e(r),
    createLinkSync: f
  }, zr;
}
var Vr, us;
function lu() {
  if (us) return Vr;
  us = 1;
  const e = ue, t = /* @__PURE__ */ _e(), { pathExists: a } = /* @__PURE__ */ ze(), s = he().fromPromise;
  async function u(r, f) {
    if (e.isAbsolute(r)) {
      try {
        await t.lstat(r);
      } catch (E) {
        throw E.message = E.message.replace("lstat", "ensureSymlink"), E;
      }
      return {
        toCwd: r,
        toDst: r
      };
    }
    const n = e.dirname(f), i = e.join(n, r);
    if (await a(i))
      return {
        toCwd: i,
        toDst: r
      };
    try {
      await t.lstat(r);
    } catch (E) {
      throw E.message = E.message.replace("lstat", "ensureSymlink"), E;
    }
    return {
      toCwd: r,
      toDst: e.relative(n, r)
    };
  }
  function o(r, f) {
    if (e.isAbsolute(r)) {
      if (!t.existsSync(r)) throw new Error("absolute srcpath does not exist");
      return {
        toCwd: r,
        toDst: r
      };
    }
    const n = e.dirname(f), i = e.join(n, r);
    if (t.existsSync(i))
      return {
        toCwd: i,
        toDst: r
      };
    if (!t.existsSync(r)) throw new Error("relative srcpath does not exist");
    return {
      toCwd: r,
      toDst: e.relative(n, r)
    };
  }
  return Vr = {
    symlinkPaths: s(u),
    symlinkPathsSync: o
  }, Vr;
}
var Gr, fs;
function du() {
  if (fs) return Gr;
  fs = 1;
  const e = /* @__PURE__ */ _e(), t = he().fromPromise;
  async function a(u, o) {
    if (o) return o;
    let r;
    try {
      r = await e.lstat(u);
    } catch {
      return "file";
    }
    return r && r.isDirectory() ? "dir" : "file";
  }
  function s(u, o) {
    if (o) return o;
    let r;
    try {
      r = e.lstatSync(u);
    } catch {
      return "file";
    }
    return r && r.isDirectory() ? "dir" : "file";
  }
  return Gr = {
    symlinkType: t(a),
    symlinkTypeSync: s
  }, Gr;
}
var Br, ls;
function hu() {
  if (ls) return Br;
  ls = 1;
  const e = he().fromPromise, t = ue, a = /* @__PURE__ */ _e(), { mkdirs: s, mkdirsSync: u } = /* @__PURE__ */ Pe(), { symlinkPaths: o, symlinkPathsSync: r } = /* @__PURE__ */ lu(), { symlinkType: f, symlinkTypeSync: n } = /* @__PURE__ */ du(), { pathExists: i } = /* @__PURE__ */ ze(), { areIdentical: d } = /* @__PURE__ */ He();
  async function E(p, w, b) {
    let l;
    try {
      l = await a.lstat(w);
    } catch {
    }
    if (l && l.isSymbolicLink()) {
      const [y, v] = await Promise.all([
        a.stat(p),
        a.stat(w)
      ]);
      if (d(y, v)) return;
    }
    const h = await o(p, w);
    p = h.toDst;
    const c = await f(h.toCwd, b), m = t.dirname(w);
    return await i(m) || await s(m), a.symlink(p, w, c);
  }
  function g(p, w, b) {
    let l;
    try {
      l = a.lstatSync(w);
    } catch {
    }
    if (l && l.isSymbolicLink()) {
      const y = a.statSync(p), v = a.statSync(w);
      if (d(y, v)) return;
    }
    const h = r(p, w);
    p = h.toDst, b = n(h.toCwd, b);
    const c = t.dirname(w);
    return a.existsSync(c) || u(c), a.symlinkSync(p, w, b);
  }
  return Br = {
    createSymlink: e(E),
    createSymlinkSync: g
  }, Br;
}
var Hr, ds;
function mu() {
  if (ds) return Hr;
  ds = 1;
  const { createFile: e, createFileSync: t } = /* @__PURE__ */ uu(), { createLink: a, createLinkSync: s } = /* @__PURE__ */ fu(), { createSymlink: u, createSymlinkSync: o } = /* @__PURE__ */ hu();
  return Hr = {
    // file
    createFile: e,
    createFileSync: t,
    ensureFile: e,
    ensureFileSync: t,
    // link
    createLink: a,
    createLinkSync: s,
    ensureLink: a,
    ensureLinkSync: s,
    // symlink
    createSymlink: u,
    createSymlinkSync: o,
    ensureSymlink: u,
    ensureSymlinkSync: o
  }, Hr;
}
var Wr, hs;
function Pi() {
  if (hs) return Wr;
  hs = 1;
  function e(a, { EOL: s = `
`, finalEOL: u = !0, replacer: o = null, spaces: r } = {}) {
    const f = u ? s : "";
    return JSON.stringify(a, o, r).replace(/\n/g, s) + f;
  }
  function t(a) {
    return Buffer.isBuffer(a) && (a = a.toString("utf8")), a.replace(/^\uFEFF/, "");
  }
  return Wr = { stringify: e, stripBom: t }, Wr;
}
var Kr, ms;
function pu() {
  if (ms) return Kr;
  ms = 1;
  let e;
  try {
    e = it();
  } catch {
    e = Be;
  }
  const t = he(), { stringify: a, stripBom: s } = Pi();
  async function u(E, g = {}) {
    typeof g == "string" && (g = { encoding: g });
    const p = g.fs || e, w = "throws" in g ? g.throws : !0;
    let b = await t.fromCallback(p.readFile)(E, g);
    b = s(b);
    let l;
    try {
      l = JSON.parse(b, g ? g.reviver : null);
    } catch (h) {
      if (w)
        throw h.message = `${E}: ${h.message}`, h;
      return null;
    }
    return l;
  }
  const o = t.fromPromise(u);
  function r(E, g = {}) {
    typeof g == "string" && (g = { encoding: g });
    const p = g.fs || e, w = "throws" in g ? g.throws : !0;
    try {
      let b = p.readFileSync(E, g);
      return b = s(b), JSON.parse(b, g.reviver);
    } catch (b) {
      if (w)
        throw b.message = `${E}: ${b.message}`, b;
      return null;
    }
  }
  async function f(E, g, p = {}) {
    const w = p.fs || e, b = a(g, p);
    await t.fromCallback(w.writeFile)(E, b, p);
  }
  const n = t.fromPromise(f);
  function i(E, g, p = {}) {
    const w = p.fs || e, b = a(g, p);
    return w.writeFileSync(E, b, p);
  }
  return Kr = {
    readFile: o,
    readFileSync: r,
    writeFile: n,
    writeFileSync: i
  }, Kr;
}
var Xr, ps;
function yu() {
  if (ps) return Xr;
  ps = 1;
  const e = pu();
  return Xr = {
    // jsonfile exports
    readJson: e.readFile,
    readJsonSync: e.readFileSync,
    writeJson: e.writeFile,
    writeJsonSync: e.writeFileSync
  }, Xr;
}
var Zr, ys;
function Ti() {
  if (ys) return Zr;
  ys = 1;
  const e = he().fromPromise, t = /* @__PURE__ */ _e(), a = ue, s = /* @__PURE__ */ Pe(), u = ze().pathExists;
  async function o(f, n, i = "utf-8") {
    const d = a.dirname(f);
    return await u(d) || await s.mkdirs(d), t.writeFile(f, n, i);
  }
  function r(f, ...n) {
    const i = a.dirname(f);
    t.existsSync(i) || s.mkdirsSync(i), t.writeFileSync(f, ...n);
  }
  return Zr = {
    outputFile: e(o),
    outputFileSync: r
  }, Zr;
}
var Jr, vs;
function vu() {
  if (vs) return Jr;
  vs = 1;
  const { stringify: e } = Pi(), { outputFile: t } = /* @__PURE__ */ Ti();
  async function a(s, u, o = {}) {
    const r = e(u, o);
    await t(s, r, o);
  }
  return Jr = a, Jr;
}
var Yr, Es;
function Eu() {
  if (Es) return Yr;
  Es = 1;
  const { stringify: e } = Pi(), { outputFileSync: t } = /* @__PURE__ */ Ti();
  function a(s, u, o) {
    const r = e(u, o);
    t(s, r, o);
  }
  return Yr = a, Yr;
}
var Qr, gs;
function gu() {
  if (gs) return Qr;
  gs = 1;
  const e = he().fromPromise, t = /* @__PURE__ */ yu();
  return t.outputJson = e(/* @__PURE__ */ vu()), t.outputJsonSync = /* @__PURE__ */ Eu(), t.outputJSON = t.outputJson, t.outputJSONSync = t.outputJsonSync, t.writeJSON = t.writeJson, t.writeJSONSync = t.writeJsonSync, t.readJSON = t.readJson, t.readJSONSync = t.readJsonSync, Qr = t, Qr;
}
var en, _s;
function _u() {
  if (_s) return en;
  _s = 1;
  const e = /* @__PURE__ */ _e(), t = ue, { copy: a } = /* @__PURE__ */ Ni(), { remove: s } = /* @__PURE__ */ yr(), { mkdirp: u } = /* @__PURE__ */ Pe(), { pathExists: o } = /* @__PURE__ */ ze(), r = /* @__PURE__ */ He();
  async function f(d, E, g = {}) {
    const p = g.overwrite || g.clobber || !1, { srcStat: w, isChangingCase: b = !1 } = await r.checkPaths(d, E, "move", g);
    await r.checkParentPaths(d, w, E, "move");
    const l = t.dirname(E);
    return t.parse(l).root !== l && await u(l), n(d, E, p, b);
  }
  async function n(d, E, g, p) {
    if (!p) {
      if (g)
        await s(E);
      else if (await o(E))
        throw new Error("dest already exists.");
    }
    try {
      await e.rename(d, E);
    } catch (w) {
      if (w.code !== "EXDEV")
        throw w;
      await i(d, E, g);
    }
  }
  async function i(d, E, g) {
    return await a(d, E, {
      overwrite: g,
      errorOnExist: !0,
      preserveTimestamps: !0
    }), s(d);
  }
  return en = f, en;
}
var tn, Ss;
function Su() {
  if (Ss) return tn;
  Ss = 1;
  const e = it(), t = ue, a = Ni().copySync, s = yr().removeSync, u = Pe().mkdirpSync, o = /* @__PURE__ */ He();
  function r(E, g, p) {
    p = p || {};
    const w = p.overwrite || p.clobber || !1, { srcStat: b, isChangingCase: l = !1 } = o.checkPathsSync(E, g, "move", p);
    return o.checkParentPathsSync(E, b, g, "move"), f(g) || u(t.dirname(g)), n(E, g, w, l);
  }
  function f(E) {
    const g = t.dirname(E);
    return t.parse(g).root === g;
  }
  function n(E, g, p, w) {
    if (w) return i(E, g, p);
    if (p)
      return s(g), i(E, g, p);
    if (e.existsSync(g)) throw new Error("dest already exists.");
    return i(E, g, p);
  }
  function i(E, g, p) {
    try {
      e.renameSync(E, g);
    } catch (w) {
      if (w.code !== "EXDEV") throw w;
      return d(E, g, p);
    }
  }
  function d(E, g, p) {
    return a(E, g, {
      overwrite: p,
      errorOnExist: !0,
      preserveTimestamps: !0
    }), s(E);
  }
  return tn = r, tn;
}
var rn, ws;
function wu() {
  if (ws) return rn;
  ws = 1;
  const e = he().fromPromise;
  return rn = {
    move: e(/* @__PURE__ */ _u()),
    moveSync: /* @__PURE__ */ Su()
  }, rn;
}
var nn, $s;
function $u() {
  return $s || ($s = 1, nn = {
    // Export promiseified graceful-fs:
    .../* @__PURE__ */ _e(),
    // Export extra methods:
    .../* @__PURE__ */ Ni(),
    .../* @__PURE__ */ cu(),
    .../* @__PURE__ */ mu(),
    .../* @__PURE__ */ gu(),
    .../* @__PURE__ */ Pe(),
    .../* @__PURE__ */ wu(),
    .../* @__PURE__ */ Ti(),
    .../* @__PURE__ */ ze(),
    .../* @__PURE__ */ yr()
  }), nn;
}
var $e = /* @__PURE__ */ $u(), rt = { exports: {} }, sn, bs;
function bu() {
  return bs || (bs = 1, sn = (e) => {
    const t = typeof e;
    return e !== null && (t === "object" || t === "function");
  }), sn;
}
var on, Rs;
function Ru() {
  if (Rs) return on;
  Rs = 1;
  const e = bu(), t = /* @__PURE__ */ new Set([
    "__proto__",
    "prototype",
    "constructor"
  ]), a = (u) => !u.some((o) => t.has(o));
  function s(u) {
    const o = u.split("."), r = [];
    for (let f = 0; f < o.length; f++) {
      let n = o[f];
      for (; n[n.length - 1] === "\\" && o[f + 1] !== void 0; )
        n = n.slice(0, -1) + ".", n += o[++f];
      r.push(n);
    }
    return a(r) ? r : [];
  }
  return on = {
    get(u, o, r) {
      if (!e(u) || typeof o != "string")
        return r === void 0 ? u : r;
      const f = s(o);
      if (f.length !== 0) {
        for (let n = 0; n < f.length; n++)
          if (u = u[f[n]], u == null) {
            if (n !== f.length - 1)
              return r;
            break;
          }
        return u === void 0 ? r : u;
      }
    },
    set(u, o, r) {
      if (!e(u) || typeof o != "string")
        return u;
      const f = u, n = s(o);
      for (let i = 0; i < n.length; i++) {
        const d = n[i];
        e(u[d]) || (u[d] = {}), i === n.length - 1 && (u[d] = r), u = u[d];
      }
      return f;
    },
    delete(u, o) {
      if (!e(u) || typeof o != "string")
        return !1;
      const r = s(o);
      for (let f = 0; f < r.length; f++) {
        const n = r[f];
        if (f === r.length - 1)
          return delete u[n], !0;
        if (u = u[n], !e(u))
          return !1;
      }
    },
    has(u, o) {
      if (!e(u) || typeof o != "string")
        return !1;
      const r = s(o);
      if (r.length === 0)
        return !1;
      for (let f = 0; f < r.length; f++)
        if (e(u)) {
          if (!(r[f] in u))
            return !1;
          u = u[r[f]];
        } else
          return !1;
      return !0;
    }
  }, on;
}
var dt = { exports: {} }, ht = { exports: {} }, mt = { exports: {} }, pt = { exports: {} }, Os;
function Ou() {
  if (Os) return pt.exports;
  Os = 1;
  const e = Be;
  return pt.exports = (t) => new Promise((a) => {
    e.access(t, (s) => {
      a(!s);
    });
  }), pt.exports.sync = (t) => {
    try {
      return e.accessSync(t), !0;
    } catch {
      return !1;
    }
  }, pt.exports;
}
var yt = { exports: {} }, vt = { exports: {} }, Is;
function Iu() {
  if (Is) return vt.exports;
  Is = 1;
  const e = (t, ...a) => new Promise((s) => {
    s(t(...a));
  });
  return vt.exports = e, vt.exports.default = e, vt.exports;
}
var Ns;
function Nu() {
  if (Ns) return yt.exports;
  Ns = 1;
  const e = Iu(), t = (a) => {
    if (!((Number.isInteger(a) || a === 1 / 0) && a > 0))
      return Promise.reject(new TypeError("Expected `concurrency` to be a number from 1 and up"));
    const s = [];
    let u = 0;
    const o = () => {
      u--, s.length > 0 && s.shift()();
    }, r = (i, d, ...E) => {
      u++;
      const g = e(i, ...E);
      d(g), g.then(o, o);
    }, f = (i, d, ...E) => {
      u < a ? r(i, d, ...E) : s.push(r.bind(null, i, d, ...E));
    }, n = (i, ...d) => new Promise((E) => f(i, E, ...d));
    return Object.defineProperties(n, {
      activeCount: {
        get: () => u
      },
      pendingCount: {
        get: () => s.length
      },
      clearQueue: {
        value: () => {
          s.length = 0;
        }
      }
    }), n;
  };
  return yt.exports = t, yt.exports.default = t, yt.exports;
}
var an, Ps;
function Pu() {
  if (Ps) return an;
  Ps = 1;
  const e = Nu();
  class t extends Error {
    constructor(o) {
      super(), this.value = o;
    }
  }
  const a = (u, o) => Promise.resolve(u).then(o), s = (u) => Promise.all(u).then((o) => o[1] === !0 && Promise.reject(new t(o[0])));
  return an = (u, o, r) => {
    r = Object.assign({
      concurrency: 1 / 0,
      preserveOrder: !0
    }, r);
    const f = e(r.concurrency), n = [...u].map((d) => [d, f(a, d, o)]), i = e(r.preserveOrder ? 1 : 1 / 0);
    return Promise.all(n.map((d) => i(s, d))).then(() => {
    }).catch((d) => d instanceof t ? d.value : Promise.reject(d));
  }, an;
}
var Ts;
function Tu() {
  if (Ts) return mt.exports;
  Ts = 1;
  const e = ue, t = Ou(), a = Pu();
  return mt.exports = (s, u) => (u = Object.assign({
    cwd: process.cwd()
  }, u), a(s, (o) => t(e.resolve(u.cwd, o)), u)), mt.exports.sync = (s, u) => {
    u = Object.assign({
      cwd: process.cwd()
    }, u);
    for (const o of s)
      if (t.sync(e.resolve(u.cwd, o)))
        return o;
  }, mt.exports;
}
var Cs;
function Cu() {
  if (Cs) return ht.exports;
  Cs = 1;
  const e = ue, t = Tu();
  return ht.exports = (a, s = {}) => {
    const u = e.resolve(s.cwd || ""), { root: o } = e.parse(u), r = [].concat(a);
    return new Promise((f) => {
      (function n(i) {
        t(r, { cwd: i }).then((d) => {
          d ? f(e.join(i, d)) : i === o ? f(null) : n(e.dirname(i));
        });
      })(u);
    });
  }, ht.exports.sync = (a, s = {}) => {
    let u = e.resolve(s.cwd || "");
    const { root: o } = e.parse(u), r = [].concat(a);
    for (; ; ) {
      const f = t.sync(r, { cwd: u });
      if (f)
        return e.join(u, f);
      if (u === o)
        return null;
      u = e.dirname(u);
    }
  }, ht.exports;
}
var Ds;
function Du() {
  if (Ds) return dt.exports;
  Ds = 1;
  const e = Cu();
  return dt.exports = async ({ cwd: t } = {}) => e("package.json", { cwd: t }), dt.exports.sync = ({ cwd: t } = {}) => e.sync("package.json", { cwd: t }), dt.exports;
}
var Et = { exports: {} }, Ls;
function Lu() {
  if (Ls) return Et.exports;
  Ls = 1;
  const e = ue, t = Yc, a = t.homedir(), s = t.tmpdir(), { env: u } = process, o = (i) => {
    const d = e.join(a, "Library");
    return {
      data: e.join(d, "Application Support", i),
      config: e.join(d, "Preferences", i),
      cache: e.join(d, "Caches", i),
      log: e.join(d, "Logs", i),
      temp: e.join(s, i)
    };
  }, r = (i) => {
    const d = u.APPDATA || e.join(a, "AppData", "Roaming"), E = u.LOCALAPPDATA || e.join(a, "AppData", "Local");
    return {
      // Data/config/cache/log are invented by me as Windows isn't opinionated about this
      data: e.join(E, i, "Data"),
      config: e.join(d, i, "Config"),
      cache: e.join(E, i, "Cache"),
      log: e.join(E, i, "Log"),
      temp: e.join(s, i)
    };
  }, f = (i) => {
    const d = e.basename(a);
    return {
      data: e.join(u.XDG_DATA_HOME || e.join(a, ".local", "share"), i),
      config: e.join(u.XDG_CONFIG_HOME || e.join(a, ".config"), i),
      cache: e.join(u.XDG_CACHE_HOME || e.join(a, ".cache"), i),
      // https://wiki.debian.org/XDGBaseDirectorySpecification#state
      log: e.join(u.XDG_STATE_HOME || e.join(a, ".local", "state"), i),
      temp: e.join(s, d, i)
    };
  }, n = (i, d) => {
    if (typeof i != "string")
      throw new TypeError(`Expected string, got ${typeof i}`);
    return d = Object.assign({ suffix: "nodejs" }, d), d.suffix && (i += `-${d.suffix}`), process.platform === "darwin" ? o(i) : process.platform === "win32" ? r(i) : f(i);
  };
  return Et.exports = n, Et.exports.default = n, Et.exports;
}
var be = {}, oe = {}, As;
function st() {
  if (As) return oe;
  As = 1, Object.defineProperty(oe, "__esModule", { value: !0 }), oe.NOOP = oe.LIMIT_FILES_DESCRIPTORS = oe.LIMIT_BASENAME_LENGTH = oe.IS_USER_ROOT = oe.IS_POSIX = oe.DEFAULT_TIMEOUT_SYNC = oe.DEFAULT_TIMEOUT_ASYNC = oe.DEFAULT_WRITE_OPTIONS = oe.DEFAULT_READ_OPTIONS = oe.DEFAULT_FOLDER_MODE = oe.DEFAULT_FILE_MODE = oe.DEFAULT_ENCODING = void 0;
  const e = "utf8";
  oe.DEFAULT_ENCODING = e;
  const t = 438;
  oe.DEFAULT_FILE_MODE = t;
  const a = 511;
  oe.DEFAULT_FOLDER_MODE = a;
  const s = {};
  oe.DEFAULT_READ_OPTIONS = s;
  const u = {};
  oe.DEFAULT_WRITE_OPTIONS = u;
  const o = 5e3;
  oe.DEFAULT_TIMEOUT_ASYNC = o;
  const r = 100;
  oe.DEFAULT_TIMEOUT_SYNC = r;
  const f = !!process.getuid;
  oe.IS_POSIX = f;
  const n = process.getuid ? !process.getuid() : !1;
  oe.IS_USER_ROOT = n;
  const i = 128;
  oe.LIMIT_BASENAME_LENGTH = i;
  const d = 1e4;
  oe.LIMIT_FILES_DESCRIPTORS = d;
  const E = () => {
  };
  return oe.NOOP = E, oe;
}
var gt = {}, qe = {}, Fs;
function Au() {
  if (Fs) return qe;
  Fs = 1, Object.defineProperty(qe, "__esModule", { value: !0 }), qe.attemptifySync = qe.attemptifyAsync = void 0;
  const e = st(), t = (s, u = e.NOOP) => function() {
    return s.apply(void 0, arguments).catch(u);
  };
  qe.attemptifyAsync = t;
  const a = (s, u = e.NOOP) => function() {
    try {
      return s.apply(void 0, arguments);
    } catch (o) {
      return u(o);
    }
  };
  return qe.attemptifySync = a, qe;
}
var _t = {}, qs;
function Fu() {
  if (qs) return _t;
  qs = 1, Object.defineProperty(_t, "__esModule", { value: !0 });
  const e = st(), t = {
    isChangeErrorOk: (a) => {
      const { code: s } = a;
      return s === "ENOSYS" || !e.IS_USER_ROOT && (s === "EINVAL" || s === "EPERM");
    },
    isRetriableError: (a) => {
      const { code: s } = a;
      return s === "EMFILE" || s === "ENFILE" || s === "EAGAIN" || s === "EBUSY" || s === "EACCESS" || s === "EACCS" || s === "EPERM";
    },
    onChangeError: (a) => {
      if (!t.isChangeErrorOk(a))
        throw a;
    }
  };
  return _t.default = t, _t;
}
var ke = {}, St = {}, ks;
function qu() {
  if (ks) return St;
  ks = 1, Object.defineProperty(St, "__esModule", { value: !0 });
  const t = {
    interval: 25,
    intervalId: void 0,
    limit: st().LIMIT_FILES_DESCRIPTORS,
    queueActive: /* @__PURE__ */ new Set(),
    queueWaiting: /* @__PURE__ */ new Set(),
    init: () => {
      t.intervalId || (t.intervalId = setInterval(t.tick, t.interval));
    },
    reset: () => {
      t.intervalId && (clearInterval(t.intervalId), delete t.intervalId);
    },
    add: (a) => {
      t.queueWaiting.add(a), t.queueActive.size < t.limit / 2 ? t.tick() : t.init();
    },
    remove: (a) => {
      t.queueWaiting.delete(a), t.queueActive.delete(a);
    },
    schedule: () => new Promise((a) => {
      const s = () => t.remove(u), u = () => a(s);
      t.add(u);
    }),
    tick: () => {
      if (!(t.queueActive.size >= t.limit)) {
        if (!t.queueWaiting.size)
          return t.reset();
        for (const a of t.queueWaiting) {
          if (t.queueActive.size >= t.limit)
            break;
          t.queueWaiting.delete(a), t.queueActive.add(a), a();
        }
      }
    }
  };
  return St.default = t, St;
}
var js;
function ku() {
  if (js) return ke;
  js = 1, Object.defineProperty(ke, "__esModule", { value: !0 }), ke.retryifySync = ke.retryifyAsync = void 0;
  const e = qu(), t = (s, u) => function(o) {
    return function r() {
      return e.default.schedule().then((f) => s.apply(void 0, arguments).then((n) => (f(), n), (n) => {
        if (f(), Date.now() >= o)
          throw n;
        if (u(n)) {
          const i = Math.round(100 + 400 * Math.random());
          return new Promise((E) => setTimeout(E, i)).then(() => r.apply(void 0, arguments));
        }
        throw n;
      }));
    };
  };
  ke.retryifyAsync = t;
  const a = (s, u) => function(o) {
    return function r() {
      try {
        return s.apply(void 0, arguments);
      } catch (f) {
        if (Date.now() > o)
          throw f;
        if (u(f))
          return r.apply(void 0, arguments);
        throw f;
      }
    };
  };
  return ke.retryifySync = a, ke;
}
var Ms;
function Pc() {
  if (Ms) return gt;
  Ms = 1, Object.defineProperty(gt, "__esModule", { value: !0 });
  const e = Be, t = Ii, a = Au(), s = Fu(), u = ku(), o = {
    chmodAttempt: a.attemptifyAsync(t.promisify(e.chmod), s.default.onChangeError),
    chownAttempt: a.attemptifyAsync(t.promisify(e.chown), s.default.onChangeError),
    closeAttempt: a.attemptifyAsync(t.promisify(e.close)),
    fsyncAttempt: a.attemptifyAsync(t.promisify(e.fsync)),
    mkdirAttempt: a.attemptifyAsync(t.promisify(e.mkdir)),
    realpathAttempt: a.attemptifyAsync(t.promisify(e.realpath)),
    statAttempt: a.attemptifyAsync(t.promisify(e.stat)),
    unlinkAttempt: a.attemptifyAsync(t.promisify(e.unlink)),
    closeRetry: u.retryifyAsync(t.promisify(e.close), s.default.isRetriableError),
    fsyncRetry: u.retryifyAsync(t.promisify(e.fsync), s.default.isRetriableError),
    openRetry: u.retryifyAsync(t.promisify(e.open), s.default.isRetriableError),
    readFileRetry: u.retryifyAsync(t.promisify(e.readFile), s.default.isRetriableError),
    renameRetry: u.retryifyAsync(t.promisify(e.rename), s.default.isRetriableError),
    statRetry: u.retryifyAsync(t.promisify(e.stat), s.default.isRetriableError),
    writeRetry: u.retryifyAsync(t.promisify(e.write), s.default.isRetriableError),
    chmodSyncAttempt: a.attemptifySync(e.chmodSync, s.default.onChangeError),
    chownSyncAttempt: a.attemptifySync(e.chownSync, s.default.onChangeError),
    closeSyncAttempt: a.attemptifySync(e.closeSync),
    mkdirSyncAttempt: a.attemptifySync(e.mkdirSync),
    realpathSyncAttempt: a.attemptifySync(e.realpathSync),
    statSyncAttempt: a.attemptifySync(e.statSync),
    unlinkSyncAttempt: a.attemptifySync(e.unlinkSync),
    closeSyncRetry: u.retryifySync(e.closeSync, s.default.isRetriableError),
    fsyncSyncRetry: u.retryifySync(e.fsyncSync, s.default.isRetriableError),
    openSyncRetry: u.retryifySync(e.openSync, s.default.isRetriableError),
    readFileSyncRetry: u.retryifySync(e.readFileSync, s.default.isRetriableError),
    renameSyncRetry: u.retryifySync(e.renameSync, s.default.isRetriableError),
    statSyncRetry: u.retryifySync(e.statSync, s.default.isRetriableError),
    writeSyncRetry: u.retryifySync(e.writeSync, s.default.isRetriableError)
  };
  return gt.default = o, gt;
}
var wt = {}, xs;
function ju() {
  if (xs) return wt;
  xs = 1, Object.defineProperty(wt, "__esModule", { value: !0 });
  const e = {
    isFunction: (t) => typeof t == "function",
    isString: (t) => typeof t == "string",
    isUndefined: (t) => typeof t > "u"
  };
  return wt.default = e, wt;
}
var $t = {}, Us;
function Mu() {
  if (Us) return $t;
  Us = 1, Object.defineProperty($t, "__esModule", { value: !0 });
  const e = {}, t = {
    next: (a) => {
      const s = e[a];
      if (!s)
        return;
      s.shift();
      const u = s[0];
      u ? u(() => t.next(a)) : delete e[a];
    },
    schedule: (a) => new Promise((s) => {
      let u = e[a];
      u || (u = e[a] = []), u.push(s), !(u.length > 1) && s(() => t.next(a));
    })
  };
  return $t.default = t, $t;
}
var bt = {}, zs;
function xu() {
  if (zs) return bt;
  zs = 1, Object.defineProperty(bt, "__esModule", { value: !0 });
  const e = ue, t = st(), a = Pc(), s = {
    store: {},
    create: (u) => {
      const o = `000000${Math.floor(Math.random() * 16777215).toString(16)}`.slice(-6), r = Date.now().toString().slice(-10), f = "tmp-", n = `.${f}${r}${o}`;
      return `${u}${n}`;
    },
    get: (u, o, r = !0) => {
      const f = s.truncate(o(u));
      return f in s.store ? s.get(u, o, r) : (s.store[f] = r, [f, () => delete s.store[f]]);
    },
    purge: (u) => {
      s.store[u] && (delete s.store[u], a.default.unlinkAttempt(u));
    },
    purgeSync: (u) => {
      s.store[u] && (delete s.store[u], a.default.unlinkSyncAttempt(u));
    },
    purgeSyncAll: () => {
      for (const u in s.store)
        s.purgeSync(u);
    },
    truncate: (u) => {
      const o = e.basename(u);
      if (o.length <= t.LIMIT_BASENAME_LENGTH)
        return u;
      const r = /^(\.?)(.*?)((?:\.[^.]+)?(?:\.tmp-\d{10}[a-f0-9]{6})?)$/.exec(o);
      if (!r)
        return u;
      const f = o.length - t.LIMIT_BASENAME_LENGTH;
      return `${u.slice(0, -o.length)}${r[1]}${r[2].slice(0, -f)}${r[3]}`;
    }
  };
  return process.on("exit", s.purgeSyncAll), bt.default = s, bt;
}
var Vs;
function Uu() {
  if (Vs) return be;
  Vs = 1, Object.defineProperty(be, "__esModule", { value: !0 }), be.writeFileSync = be.writeFile = be.readFileSync = be.readFile = void 0;
  const e = ue, t = st(), a = Pc(), s = ju(), u = Mu(), o = xu();
  function r(E, g = t.DEFAULT_READ_OPTIONS) {
    var p;
    if (s.default.isString(g))
      return r(E, { encoding: g });
    const w = Date.now() + ((p = g.timeout) !== null && p !== void 0 ? p : t.DEFAULT_TIMEOUT_ASYNC);
    return a.default.readFileRetry(w)(E, g);
  }
  be.readFile = r;
  function f(E, g = t.DEFAULT_READ_OPTIONS) {
    var p;
    if (s.default.isString(g))
      return f(E, { encoding: g });
    const w = Date.now() + ((p = g.timeout) !== null && p !== void 0 ? p : t.DEFAULT_TIMEOUT_SYNC);
    return a.default.readFileSyncRetry(w)(E, g);
  }
  be.readFileSync = f;
  const n = (E, g, p, w) => {
    if (s.default.isFunction(p))
      return n(E, g, t.DEFAULT_WRITE_OPTIONS, p);
    const b = i(E, g, p);
    return w && b.then(w, w), b;
  };
  be.writeFile = n;
  const i = async (E, g, p = t.DEFAULT_WRITE_OPTIONS) => {
    var w;
    if (s.default.isString(p))
      return i(E, g, { encoding: p });
    const b = Date.now() + ((w = p.timeout) !== null && w !== void 0 ? w : t.DEFAULT_TIMEOUT_ASYNC);
    let l = null, h = null, c = null, m = null, y = null;
    try {
      p.schedule && (l = await p.schedule(E)), h = await u.default.schedule(E), E = await a.default.realpathAttempt(E) || E, [m, c] = o.default.get(E, p.tmpCreate || o.default.create, p.tmpPurge !== !1);
      const v = t.IS_POSIX && s.default.isUndefined(p.chown), _ = s.default.isUndefined(p.mode);
      if (v || _) {
        const $ = await a.default.statAttempt(E);
        $ && (p = { ...p }, v && (p.chown = { uid: $.uid, gid: $.gid }), _ && (p.mode = $.mode));
      }
      const S = e.dirname(E);
      await a.default.mkdirAttempt(S, {
        mode: t.DEFAULT_FOLDER_MODE,
        recursive: !0
      }), y = await a.default.openRetry(b)(m, "w", p.mode || t.DEFAULT_FILE_MODE), p.tmpCreated && p.tmpCreated(m), s.default.isString(g) ? await a.default.writeRetry(b)(y, g, 0, p.encoding || t.DEFAULT_ENCODING) : s.default.isUndefined(g) || await a.default.writeRetry(b)(y, g, 0, g.length, 0), p.fsync !== !1 && (p.fsyncWait !== !1 ? await a.default.fsyncRetry(b)(y) : a.default.fsyncAttempt(y)), await a.default.closeRetry(b)(y), y = null, p.chown && await a.default.chownAttempt(m, p.chown.uid, p.chown.gid), p.mode && await a.default.chmodAttempt(m, p.mode);
      try {
        await a.default.renameRetry(b)(m, E);
      } catch ($) {
        if ($.code !== "ENAMETOOLONG")
          throw $;
        await a.default.renameRetry(b)(m, o.default.truncate(E));
      }
      c(), m = null;
    } finally {
      y && await a.default.closeAttempt(y), m && o.default.purge(m), l && l(), h && h();
    }
  }, d = (E, g, p = t.DEFAULT_WRITE_OPTIONS) => {
    var w;
    if (s.default.isString(p))
      return d(E, g, { encoding: p });
    const b = Date.now() + ((w = p.timeout) !== null && w !== void 0 ? w : t.DEFAULT_TIMEOUT_SYNC);
    let l = null, h = null, c = null;
    try {
      E = a.default.realpathSyncAttempt(E) || E, [h, l] = o.default.get(E, p.tmpCreate || o.default.create, p.tmpPurge !== !1);
      const m = t.IS_POSIX && s.default.isUndefined(p.chown), y = s.default.isUndefined(p.mode);
      if (m || y) {
        const _ = a.default.statSyncAttempt(E);
        _ && (p = { ...p }, m && (p.chown = { uid: _.uid, gid: _.gid }), y && (p.mode = _.mode));
      }
      const v = e.dirname(E);
      a.default.mkdirSyncAttempt(v, {
        mode: t.DEFAULT_FOLDER_MODE,
        recursive: !0
      }), c = a.default.openSyncRetry(b)(h, "w", p.mode || t.DEFAULT_FILE_MODE), p.tmpCreated && p.tmpCreated(h), s.default.isString(g) ? a.default.writeSyncRetry(b)(c, g, 0, p.encoding || t.DEFAULT_ENCODING) : s.default.isUndefined(g) || a.default.writeSyncRetry(b)(c, g, 0, g.length, 0), p.fsync !== !1 && (p.fsyncWait !== !1 ? a.default.fsyncSyncRetry(b)(c) : a.default.fsyncAttempt(c)), a.default.closeSyncRetry(b)(c), c = null, p.chown && a.default.chownSyncAttempt(h, p.chown.uid, p.chown.gid), p.mode && a.default.chmodSyncAttempt(h, p.mode);
      try {
        a.default.renameSyncRetry(b)(h, E);
      } catch (_) {
        if (_.code !== "ENAMETOOLONG")
          throw _;
        a.default.renameSyncRetry(b)(h, o.default.truncate(E));
      }
      l(), h = null;
    } finally {
      c && a.default.closeSyncAttempt(c), h && o.default.purge(h);
    }
  };
  return be.writeFileSync = d, be;
}
var Rt = { exports: {} }, cn = {}, Ce = {}, je = {}, un = {}, fn = {}, ln = {}, Gs;
function mr() {
  return Gs || (Gs = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.regexpCode = e.getEsmExportName = e.getProperty = e.safeStringify = e.stringify = e.strConcat = e.addCodeArg = e.str = e._ = e.nil = e._Code = e.Name = e.IDENTIFIER = e._CodeOrName = void 0;
    class t {
    }
    e._CodeOrName = t, e.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
    class a extends t {
      constructor(c) {
        if (super(), !e.IDENTIFIER.test(c))
          throw new Error("CodeGen: name must be a valid identifier");
        this.str = c;
      }
      toString() {
        return this.str;
      }
      emptyStr() {
        return !1;
      }
      get names() {
        return { [this.str]: 1 };
      }
    }
    e.Name = a;
    class s extends t {
      constructor(c) {
        super(), this._items = typeof c == "string" ? [c] : c;
      }
      toString() {
        return this.str;
      }
      emptyStr() {
        if (this._items.length > 1)
          return !1;
        const c = this._items[0];
        return c === "" || c === '""';
      }
      get str() {
        var c;
        return (c = this._str) !== null && c !== void 0 ? c : this._str = this._items.reduce((m, y) => `${m}${y}`, "");
      }
      get names() {
        var c;
        return (c = this._names) !== null && c !== void 0 ? c : this._names = this._items.reduce((m, y) => (y instanceof a && (m[y.str] = (m[y.str] || 0) + 1), m), {});
      }
    }
    e._Code = s, e.nil = new s("");
    function u(h, ...c) {
      const m = [h[0]];
      let y = 0;
      for (; y < c.length; )
        f(m, c[y]), m.push(h[++y]);
      return new s(m);
    }
    e._ = u;
    const o = new s("+");
    function r(h, ...c) {
      const m = [p(h[0])];
      let y = 0;
      for (; y < c.length; )
        m.push(o), f(m, c[y]), m.push(o, p(h[++y]));
      return n(m), new s(m);
    }
    e.str = r;
    function f(h, c) {
      c instanceof s ? h.push(...c._items) : c instanceof a ? h.push(c) : h.push(E(c));
    }
    e.addCodeArg = f;
    function n(h) {
      let c = 1;
      for (; c < h.length - 1; ) {
        if (h[c] === o) {
          const m = i(h[c - 1], h[c + 1]);
          if (m !== void 0) {
            h.splice(c - 1, 3, m);
            continue;
          }
          h[c++] = "+";
        }
        c++;
      }
    }
    function i(h, c) {
      if (c === '""')
        return h;
      if (h === '""')
        return c;
      if (typeof h == "string")
        return c instanceof a || h[h.length - 1] !== '"' ? void 0 : typeof c != "string" ? `${h.slice(0, -1)}${c}"` : c[0] === '"' ? h.slice(0, -1) + c.slice(1) : void 0;
      if (typeof c == "string" && c[0] === '"' && !(h instanceof a))
        return `"${h}${c.slice(1)}`;
    }
    function d(h, c) {
      return c.emptyStr() ? h : h.emptyStr() ? c : r`${h}${c}`;
    }
    e.strConcat = d;
    function E(h) {
      return typeof h == "number" || typeof h == "boolean" || h === null ? h : p(Array.isArray(h) ? h.join(",") : h);
    }
    function g(h) {
      return new s(p(h));
    }
    e.stringify = g;
    function p(h) {
      return JSON.stringify(h).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
    }
    e.safeStringify = p;
    function w(h) {
      return typeof h == "string" && e.IDENTIFIER.test(h) ? new s(`.${h}`) : u`[${h}]`;
    }
    e.getProperty = w;
    function b(h) {
      if (typeof h == "string" && e.IDENTIFIER.test(h))
        return new s(`${h}`);
      throw new Error(`CodeGen: invalid export name: ${h}, use explicit $id name mapping`);
    }
    e.getEsmExportName = b;
    function l(h) {
      return new s(h.toString());
    }
    e.regexpCode = l;
  }(ln)), ln;
}
var dn = {}, Bs;
function Hs() {
  return Bs || (Bs = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
    const t = mr();
    class a extends Error {
      constructor(i) {
        super(`CodeGen: "code" for ${i} not defined`), this.value = i.value;
      }
    }
    var s;
    (function(n) {
      n[n.Started = 0] = "Started", n[n.Completed = 1] = "Completed";
    })(s || (e.UsedValueState = s = {})), e.varKinds = {
      const: new t.Name("const"),
      let: new t.Name("let"),
      var: new t.Name("var")
    };
    class u {
      constructor({ prefixes: i, parent: d } = {}) {
        this._names = {}, this._prefixes = i, this._parent = d;
      }
      toName(i) {
        return i instanceof t.Name ? i : this.name(i);
      }
      name(i) {
        return new t.Name(this._newName(i));
      }
      _newName(i) {
        const d = this._names[i] || this._nameGroup(i);
        return `${i}${d.index++}`;
      }
      _nameGroup(i) {
        var d, E;
        if (!((E = (d = this._parent) === null || d === void 0 ? void 0 : d._prefixes) === null || E === void 0) && E.has(i) || this._prefixes && !this._prefixes.has(i))
          throw new Error(`CodeGen: prefix "${i}" is not allowed in this scope`);
        return this._names[i] = { prefix: i, index: 0 };
      }
    }
    e.Scope = u;
    class o extends t.Name {
      constructor(i, d) {
        super(d), this.prefix = i;
      }
      setValue(i, { property: d, itemIndex: E }) {
        this.value = i, this.scopePath = (0, t._)`.${new t.Name(d)}[${E}]`;
      }
    }
    e.ValueScopeName = o;
    const r = (0, t._)`\n`;
    class f extends u {
      constructor(i) {
        super(i), this._values = {}, this._scope = i.scope, this.opts = { ...i, _n: i.lines ? r : t.nil };
      }
      get() {
        return this._scope;
      }
      name(i) {
        return new o(i, this._newName(i));
      }
      value(i, d) {
        var E;
        if (d.ref === void 0)
          throw new Error("CodeGen: ref must be passed in value");
        const g = this.toName(i), { prefix: p } = g, w = (E = d.key) !== null && E !== void 0 ? E : d.ref;
        let b = this._values[p];
        if (b) {
          const c = b.get(w);
          if (c)
            return c;
        } else
          b = this._values[p] = /* @__PURE__ */ new Map();
        b.set(w, g);
        const l = this._scope[p] || (this._scope[p] = []), h = l.length;
        return l[h] = d.ref, g.setValue(d, { property: p, itemIndex: h }), g;
      }
      getValue(i, d) {
        const E = this._values[i];
        if (E)
          return E.get(d);
      }
      scopeRefs(i, d = this._values) {
        return this._reduceValues(d, (E) => {
          if (E.scopePath === void 0)
            throw new Error(`CodeGen: name "${E}" has no value`);
          return (0, t._)`${i}${E.scopePath}`;
        });
      }
      scopeCode(i = this._values, d, E) {
        return this._reduceValues(i, (g) => {
          if (g.value === void 0)
            throw new Error(`CodeGen: name "${g}" has no value`);
          return g.value.code;
        }, d, E);
      }
      _reduceValues(i, d, E = {}, g) {
        let p = t.nil;
        for (const w in i) {
          const b = i[w];
          if (!b)
            continue;
          const l = E[w] = E[w] || /* @__PURE__ */ new Map();
          b.forEach((h) => {
            if (l.has(h))
              return;
            l.set(h, s.Started);
            let c = d(h);
            if (c) {
              const m = this.opts.es5 ? e.varKinds.var : e.varKinds.const;
              p = (0, t._)`${p}${m} ${h} = ${c};${this.opts._n}`;
            } else if (c = g?.(h))
              p = (0, t._)`${p}${c}${this.opts._n}`;
            else
              throw new a(h);
            l.set(h, s.Completed);
          });
        }
        return p;
      }
    }
    e.ValueScope = f;
  }(dn)), dn;
}
var Ws;
function te() {
  return Ws || (Ws = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
    const t = mr(), a = Hs();
    var s = mr();
    Object.defineProperty(e, "_", { enumerable: !0, get: function() {
      return s._;
    } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
      return s.str;
    } }), Object.defineProperty(e, "strConcat", { enumerable: !0, get: function() {
      return s.strConcat;
    } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
      return s.nil;
    } }), Object.defineProperty(e, "getProperty", { enumerable: !0, get: function() {
      return s.getProperty;
    } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
      return s.stringify;
    } }), Object.defineProperty(e, "regexpCode", { enumerable: !0, get: function() {
      return s.regexpCode;
    } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
      return s.Name;
    } });
    var u = Hs();
    Object.defineProperty(e, "Scope", { enumerable: !0, get: function() {
      return u.Scope;
    } }), Object.defineProperty(e, "ValueScope", { enumerable: !0, get: function() {
      return u.ValueScope;
    } }), Object.defineProperty(e, "ValueScopeName", { enumerable: !0, get: function() {
      return u.ValueScopeName;
    } }), Object.defineProperty(e, "varKinds", { enumerable: !0, get: function() {
      return u.varKinds;
    } }), e.operators = {
      GT: new t._Code(">"),
      GTE: new t._Code(">="),
      LT: new t._Code("<"),
      LTE: new t._Code("<="),
      EQ: new t._Code("==="),
      NEQ: new t._Code("!=="),
      NOT: new t._Code("!"),
      OR: new t._Code("||"),
      AND: new t._Code("&&"),
      ADD: new t._Code("+")
    };
    class o {
      optimizeNodes() {
        return this;
      }
      optimizeNames(R, N) {
        return this;
      }
    }
    class r extends o {
      constructor(R, N, I) {
        super(), this.varKind = R, this.name = N, this.rhs = I;
      }
      render({ es5: R, _n: N }) {
        const I = R ? a.varKinds.var : this.varKind, K = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
        return `${I} ${this.name}${K};` + N;
      }
      optimizeNames(R, N) {
        if (R[this.name.str])
          return this.rhs && (this.rhs = z(this.rhs, R, N)), this;
      }
      get names() {
        return this.rhs instanceof t._CodeOrName ? this.rhs.names : {};
      }
    }
    class f extends o {
      constructor(R, N, I) {
        super(), this.lhs = R, this.rhs = N, this.sideEffects = I;
      }
      render({ _n: R }) {
        return `${this.lhs} = ${this.rhs};` + R;
      }
      optimizeNames(R, N) {
        if (!(this.lhs instanceof t.Name && !R[this.lhs.str] && !this.sideEffects))
          return this.rhs = z(this.rhs, R, N), this;
      }
      get names() {
        const R = this.lhs instanceof t.Name ? {} : { ...this.lhs.names };
        return U(R, this.rhs);
      }
    }
    class n extends f {
      constructor(R, N, I, K) {
        super(R, I, K), this.op = N;
      }
      render({ _n: R }) {
        return `${this.lhs} ${this.op}= ${this.rhs};` + R;
      }
    }
    class i extends o {
      constructor(R) {
        super(), this.label = R, this.names = {};
      }
      render({ _n: R }) {
        return `${this.label}:` + R;
      }
    }
    class d extends o {
      constructor(R) {
        super(), this.label = R, this.names = {};
      }
      render({ _n: R }) {
        return `break${this.label ? ` ${this.label}` : ""};` + R;
      }
    }
    class E extends o {
      constructor(R) {
        super(), this.error = R;
      }
      render({ _n: R }) {
        return `throw ${this.error};` + R;
      }
      get names() {
        return this.error.names;
      }
    }
    class g extends o {
      constructor(R) {
        super(), this.code = R;
      }
      render({ _n: R }) {
        return `${this.code};` + R;
      }
      optimizeNodes() {
        return `${this.code}` ? this : void 0;
      }
      optimizeNames(R, N) {
        return this.code = z(this.code, R, N), this;
      }
      get names() {
        return this.code instanceof t._CodeOrName ? this.code.names : {};
      }
    }
    class p extends o {
      constructor(R = []) {
        super(), this.nodes = R;
      }
      render(R) {
        return this.nodes.reduce((N, I) => N + I.render(R), "");
      }
      optimizeNodes() {
        const { nodes: R } = this;
        let N = R.length;
        for (; N--; ) {
          const I = R[N].optimizeNodes();
          Array.isArray(I) ? R.splice(N, 1, ...I) : I ? R[N] = I : R.splice(N, 1);
        }
        return R.length > 0 ? this : void 0;
      }
      optimizeNames(R, N) {
        const { nodes: I } = this;
        let K = I.length;
        for (; K--; ) {
          const W = I[K];
          W.optimizeNames(R, N) || (V(R, W.names), I.splice(K, 1));
        }
        return I.length > 0 ? this : void 0;
      }
      get names() {
        return this.nodes.reduce((R, N) => H(R, N.names), {});
      }
    }
    class w extends p {
      render(R) {
        return "{" + R._n + super.render(R) + "}" + R._n;
      }
    }
    class b extends p {
    }
    class l extends w {
    }
    l.kind = "else";
    class h extends w {
      constructor(R, N) {
        super(N), this.condition = R;
      }
      render(R) {
        let N = `if(${this.condition})` + super.render(R);
        return this.else && (N += "else " + this.else.render(R)), N;
      }
      optimizeNodes() {
        super.optimizeNodes();
        const R = this.condition;
        if (R === !0)
          return this.nodes;
        let N = this.else;
        if (N) {
          const I = N.optimizeNodes();
          N = this.else = Array.isArray(I) ? new l(I) : I;
        }
        if (N)
          return R === !1 ? N instanceof h ? N : N.nodes : this.nodes.length ? this : new h(Z(R), N instanceof h ? [N] : N.nodes);
        if (!(R === !1 || !this.nodes.length))
          return this;
      }
      optimizeNames(R, N) {
        var I;
        if (this.else = (I = this.else) === null || I === void 0 ? void 0 : I.optimizeNames(R, N), !!(super.optimizeNames(R, N) || this.else))
          return this.condition = z(this.condition, R, N), this;
      }
      get names() {
        const R = super.names;
        return U(R, this.condition), this.else && H(R, this.else.names), R;
      }
    }
    h.kind = "if";
    class c extends w {
    }
    c.kind = "for";
    class m extends c {
      constructor(R) {
        super(), this.iteration = R;
      }
      render(R) {
        return `for(${this.iteration})` + super.render(R);
      }
      optimizeNames(R, N) {
        if (super.optimizeNames(R, N))
          return this.iteration = z(this.iteration, R, N), this;
      }
      get names() {
        return H(super.names, this.iteration.names);
      }
    }
    class y extends c {
      constructor(R, N, I, K) {
        super(), this.varKind = R, this.name = N, this.from = I, this.to = K;
      }
      render(R) {
        const N = R.es5 ? a.varKinds.var : this.varKind, { name: I, from: K, to: W } = this;
        return `for(${N} ${I}=${K}; ${I}<${W}; ${I}++)` + super.render(R);
      }
      get names() {
        const R = U(super.names, this.from);
        return U(R, this.to);
      }
    }
    class v extends c {
      constructor(R, N, I, K) {
        super(), this.loop = R, this.varKind = N, this.name = I, this.iterable = K;
      }
      render(R) {
        return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(R);
      }
      optimizeNames(R, N) {
        if (super.optimizeNames(R, N))
          return this.iterable = z(this.iterable, R, N), this;
      }
      get names() {
        return H(super.names, this.iterable.names);
      }
    }
    class _ extends w {
      constructor(R, N, I) {
        super(), this.name = R, this.args = N, this.async = I;
      }
      render(R) {
        return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(R);
      }
    }
    _.kind = "func";
    class S extends p {
      render(R) {
        return "return " + super.render(R);
      }
    }
    S.kind = "return";
    class $ extends w {
      render(R) {
        let N = "try" + super.render(R);
        return this.catch && (N += this.catch.render(R)), this.finally && (N += this.finally.render(R)), N;
      }
      optimizeNodes() {
        var R, N;
        return super.optimizeNodes(), (R = this.catch) === null || R === void 0 || R.optimizeNodes(), (N = this.finally) === null || N === void 0 || N.optimizeNodes(), this;
      }
      optimizeNames(R, N) {
        var I, K;
        return super.optimizeNames(R, N), (I = this.catch) === null || I === void 0 || I.optimizeNames(R, N), (K = this.finally) === null || K === void 0 || K.optimizeNames(R, N), this;
      }
      get names() {
        const R = super.names;
        return this.catch && H(R, this.catch.names), this.finally && H(R, this.finally.names), R;
      }
    }
    class O extends w {
      constructor(R) {
        super(), this.error = R;
      }
      render(R) {
        return `catch(${this.error})` + super.render(R);
      }
    }
    O.kind = "catch";
    class T extends w {
      render(R) {
        return "finally" + super.render(R);
      }
    }
    T.kind = "finally";
    class k {
      constructor(R, N = {}) {
        this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = { ...N, _n: N.lines ? `
` : "" }, this._extScope = R, this._scope = new a.Scope({ parent: R }), this._nodes = [new b()];
      }
      toString() {
        return this._root.render(this.opts);
      }
      // returns unique name in the internal scope
      name(R) {
        return this._scope.name(R);
      }
      // reserves unique name in the external scope
      scopeName(R) {
        return this._extScope.name(R);
      }
      // reserves unique name in the external scope and assigns value to it
      scopeValue(R, N) {
        const I = this._extScope.value(R, N);
        return (this._values[I.prefix] || (this._values[I.prefix] = /* @__PURE__ */ new Set())).add(I), I;
      }
      getScopeValue(R, N) {
        return this._extScope.getValue(R, N);
      }
      // return code that assigns values in the external scope to the names that are used internally
      // (same names that were returned by gen.scopeName or gen.scopeValue)
      scopeRefs(R) {
        return this._extScope.scopeRefs(R, this._values);
      }
      scopeCode() {
        return this._extScope.scopeCode(this._values);
      }
      _def(R, N, I, K) {
        const W = this._scope.toName(N);
        return I !== void 0 && K && (this._constants[W.str] = I), this._leafNode(new r(R, W, I)), W;
      }
      // `const` declaration (`var` in es5 mode)
      const(R, N, I) {
        return this._def(a.varKinds.const, R, N, I);
      }
      // `let` declaration with optional assignment (`var` in es5 mode)
      let(R, N, I) {
        return this._def(a.varKinds.let, R, N, I);
      }
      // `var` declaration with optional assignment
      var(R, N, I) {
        return this._def(a.varKinds.var, R, N, I);
      }
      // assignment code
      assign(R, N, I) {
        return this._leafNode(new f(R, N, I));
      }
      // `+=` code
      add(R, N) {
        return this._leafNode(new n(R, e.operators.ADD, N));
      }
      // appends passed SafeExpr to code or executes Block
      code(R) {
        return typeof R == "function" ? R() : R !== t.nil && this._leafNode(new g(R)), this;
      }
      // returns code for object literal for the passed argument list of key-value pairs
      object(...R) {
        const N = ["{"];
        for (const [I, K] of R)
          N.length > 1 && N.push(","), N.push(I), (I !== K || this.opts.es5) && (N.push(":"), (0, t.addCodeArg)(N, K));
        return N.push("}"), new t._Code(N);
      }
      // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
      if(R, N, I) {
        if (this._blockNode(new h(R)), N && I)
          this.code(N).else().code(I).endIf();
        else if (N)
          this.code(N).endIf();
        else if (I)
          throw new Error('CodeGen: "else" body without "then" body');
        return this;
      }
      // `else if` clause - invalid without `if` or after `else` clauses
      elseIf(R) {
        return this._elseNode(new h(R));
      }
      // `else` clause - only valid after `if` or `else if` clauses
      else() {
        return this._elseNode(new l());
      }
      // end `if` statement (needed if gen.if was used only with condition)
      endIf() {
        return this._endBlockNode(h, l);
      }
      _for(R, N) {
        return this._blockNode(R), N && this.code(N).endFor(), this;
      }
      // a generic `for` clause (or statement if `forBody` is passed)
      for(R, N) {
        return this._for(new m(R), N);
      }
      // `for` statement for a range of values
      forRange(R, N, I, K, W = this.opts.es5 ? a.varKinds.var : a.varKinds.let) {
        const Q = this._scope.toName(R);
        return this._for(new y(W, Q, N, I), () => K(Q));
      }
      // `for-of` statement (in es5 mode replace with a normal for loop)
      forOf(R, N, I, K = a.varKinds.const) {
        const W = this._scope.toName(R);
        if (this.opts.es5) {
          const Q = N instanceof t.Name ? N : this.var("_arr", N);
          return this.forRange("_i", 0, (0, t._)`${Q}.length`, (J) => {
            this.var(W, (0, t._)`${Q}[${J}]`), I(W);
          });
        }
        return this._for(new v("of", K, W, N), () => I(W));
      }
      // `for-in` statement.
      // With option `ownProperties` replaced with a `for-of` loop for object keys
      forIn(R, N, I, K = this.opts.es5 ? a.varKinds.var : a.varKinds.const) {
        if (this.opts.ownProperties)
          return this.forOf(R, (0, t._)`Object.keys(${N})`, I);
        const W = this._scope.toName(R);
        return this._for(new v("in", K, W, N), () => I(W));
      }
      // end `for` loop
      endFor() {
        return this._endBlockNode(c);
      }
      // `label` statement
      label(R) {
        return this._leafNode(new i(R));
      }
      // `break` statement
      break(R) {
        return this._leafNode(new d(R));
      }
      // `return` statement
      return(R) {
        const N = new S();
        if (this._blockNode(N), this.code(R), N.nodes.length !== 1)
          throw new Error('CodeGen: "return" should have one node');
        return this._endBlockNode(S);
      }
      // `try` statement
      try(R, N, I) {
        if (!N && !I)
          throw new Error('CodeGen: "try" without "catch" and "finally"');
        const K = new $();
        if (this._blockNode(K), this.code(R), N) {
          const W = this.name("e");
          this._currNode = K.catch = new O(W), N(W);
        }
        return I && (this._currNode = K.finally = new T(), this.code(I)), this._endBlockNode(O, T);
      }
      // `throw` statement
      throw(R) {
        return this._leafNode(new E(R));
      }
      // start self-balancing block
      block(R, N) {
        return this._blockStarts.push(this._nodes.length), R && this.code(R).endBlock(N), this;
      }
      // end the current self-balancing block
      endBlock(R) {
        const N = this._blockStarts.pop();
        if (N === void 0)
          throw new Error("CodeGen: not in self-balancing block");
        const I = this._nodes.length - N;
        if (I < 0 || R !== void 0 && I !== R)
          throw new Error(`CodeGen: wrong number of nodes: ${I} vs ${R} expected`);
        return this._nodes.length = N, this;
      }
      // `function` heading (or definition if funcBody is passed)
      func(R, N = t.nil, I, K) {
        return this._blockNode(new _(R, N, I)), K && this.code(K).endFunc(), this;
      }
      // end function definition
      endFunc() {
        return this._endBlockNode(_);
      }
      optimize(R = 1) {
        for (; R-- > 0; )
          this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
      }
      _leafNode(R) {
        return this._currNode.nodes.push(R), this;
      }
      _blockNode(R) {
        this._currNode.nodes.push(R), this._nodes.push(R);
      }
      _endBlockNode(R, N) {
        const I = this._currNode;
        if (I instanceof R || N && I instanceof N)
          return this._nodes.pop(), this;
        throw new Error(`CodeGen: not in block "${N ? `${R.kind}/${N.kind}` : R.kind}"`);
      }
      _elseNode(R) {
        const N = this._currNode;
        if (!(N instanceof h))
          throw new Error('CodeGen: "else" without "if"');
        return this._currNode = N.else = R, this;
      }
      get _root() {
        return this._nodes[0];
      }
      get _currNode() {
        const R = this._nodes;
        return R[R.length - 1];
      }
      set _currNode(R) {
        const N = this._nodes;
        N[N.length - 1] = R;
      }
    }
    e.CodeGen = k;
    function H(L, R) {
      for (const N in R)
        L[N] = (L[N] || 0) + (R[N] || 0);
      return L;
    }
    function U(L, R) {
      return R instanceof t._CodeOrName ? H(L, R.names) : L;
    }
    function z(L, R, N) {
      if (L instanceof t.Name)
        return I(L);
      if (!K(L))
        return L;
      return new t._Code(L._items.reduce((W, Q) => (Q instanceof t.Name && (Q = I(Q)), Q instanceof t._Code ? W.push(...Q._items) : W.push(Q), W), []));
      function I(W) {
        const Q = N[W.str];
        return Q === void 0 || R[W.str] !== 1 ? W : (delete R[W.str], Q);
      }
      function K(W) {
        return W instanceof t._Code && W._items.some((Q) => Q instanceof t.Name && R[Q.str] === 1 && N[Q.str] !== void 0);
      }
    }
    function V(L, R) {
      for (const N in R)
        L[N] = (L[N] || 0) - (R[N] || 0);
    }
    function Z(L) {
      return typeof L == "boolean" || typeof L == "number" || L === null ? !L : (0, t._)`!${j(L)}`;
    }
    e.not = Z;
    const B = C(e.operators.AND);
    function A(...L) {
      return L.reduce(B);
    }
    e.and = A;
    const x = C(e.operators.OR);
    function D(...L) {
      return L.reduce(x);
    }
    e.or = D;
    function C(L) {
      return (R, N) => R === t.nil ? N : N === t.nil ? R : (0, t._)`${j(R)} ${L} ${j(N)}`;
    }
    function j(L) {
      return L instanceof t.Name ? L : (0, t._)`(${L})`;
    }
  }(fn)), fn;
}
var ee = {}, Ks;
function ne() {
  if (Ks) return ee;
  Ks = 1, Object.defineProperty(ee, "__esModule", { value: !0 }), ee.checkStrictMode = ee.getErrorPath = ee.Type = ee.useFunc = ee.setEvaluated = ee.evaluatedPropsToName = ee.mergeEvaluated = ee.eachItem = ee.unescapeJsonPointer = ee.escapeJsonPointer = ee.escapeFragment = ee.unescapeFragment = ee.schemaRefOrVal = ee.schemaHasRulesButRef = ee.schemaHasRules = ee.checkUnknownRules = ee.alwaysValidSchema = ee.toHash = void 0;
  const e = te(), t = mr();
  function a(v) {
    const _ = {};
    for (const S of v)
      _[S] = !0;
    return _;
  }
  ee.toHash = a;
  function s(v, _) {
    return typeof _ == "boolean" ? _ : Object.keys(_).length === 0 ? !0 : (u(v, _), !o(_, v.self.RULES.all));
  }
  ee.alwaysValidSchema = s;
  function u(v, _ = v.schema) {
    const { opts: S, self: $ } = v;
    if (!S.strictSchema || typeof _ == "boolean")
      return;
    const O = $.RULES.keywords;
    for (const T in _)
      O[T] || y(v, `unknown keyword: "${T}"`);
  }
  ee.checkUnknownRules = u;
  function o(v, _) {
    if (typeof v == "boolean")
      return !v;
    for (const S in v)
      if (_[S])
        return !0;
    return !1;
  }
  ee.schemaHasRules = o;
  function r(v, _) {
    if (typeof v == "boolean")
      return !v;
    for (const S in v)
      if (S !== "$ref" && _.all[S])
        return !0;
    return !1;
  }
  ee.schemaHasRulesButRef = r;
  function f({ topSchemaRef: v, schemaPath: _ }, S, $, O) {
    if (!O) {
      if (typeof S == "number" || typeof S == "boolean")
        return S;
      if (typeof S == "string")
        return (0, e._)`${S}`;
    }
    return (0, e._)`${v}${_}${(0, e.getProperty)($)}`;
  }
  ee.schemaRefOrVal = f;
  function n(v) {
    return E(decodeURIComponent(v));
  }
  ee.unescapeFragment = n;
  function i(v) {
    return encodeURIComponent(d(v));
  }
  ee.escapeFragment = i;
  function d(v) {
    return typeof v == "number" ? `${v}` : v.replace(/~/g, "~0").replace(/\//g, "~1");
  }
  ee.escapeJsonPointer = d;
  function E(v) {
    return v.replace(/~1/g, "/").replace(/~0/g, "~");
  }
  ee.unescapeJsonPointer = E;
  function g(v, _) {
    if (Array.isArray(v))
      for (const S of v)
        _(S);
    else
      _(v);
  }
  ee.eachItem = g;
  function p({ mergeNames: v, mergeToName: _, mergeValues: S, resultToName: $ }) {
    return (O, T, k, H) => {
      const U = k === void 0 ? T : k instanceof e.Name ? (T instanceof e.Name ? v(O, T, k) : _(O, T, k), k) : T instanceof e.Name ? (_(O, k, T), T) : S(T, k);
      return H === e.Name && !(U instanceof e.Name) ? $(O, U) : U;
    };
  }
  ee.mergeEvaluated = {
    props: p({
      mergeNames: (v, _, S) => v.if((0, e._)`${S} !== true && ${_} !== undefined`, () => {
        v.if((0, e._)`${_} === true`, () => v.assign(S, !0), () => v.assign(S, (0, e._)`${S} || {}`).code((0, e._)`Object.assign(${S}, ${_})`));
      }),
      mergeToName: (v, _, S) => v.if((0, e._)`${S} !== true`, () => {
        _ === !0 ? v.assign(S, !0) : (v.assign(S, (0, e._)`${S} || {}`), b(v, S, _));
      }),
      mergeValues: (v, _) => v === !0 ? !0 : { ...v, ..._ },
      resultToName: w
    }),
    items: p({
      mergeNames: (v, _, S) => v.if((0, e._)`${S} !== true && ${_} !== undefined`, () => v.assign(S, (0, e._)`${_} === true ? true : ${S} > ${_} ? ${S} : ${_}`)),
      mergeToName: (v, _, S) => v.if((0, e._)`${S} !== true`, () => v.assign(S, _ === !0 ? !0 : (0, e._)`${S} > ${_} ? ${S} : ${_}`)),
      mergeValues: (v, _) => v === !0 ? !0 : Math.max(v, _),
      resultToName: (v, _) => v.var("items", _)
    })
  };
  function w(v, _) {
    if (_ === !0)
      return v.var("props", !0);
    const S = v.var("props", (0, e._)`{}`);
    return _ !== void 0 && b(v, S, _), S;
  }
  ee.evaluatedPropsToName = w;
  function b(v, _, S) {
    Object.keys(S).forEach(($) => v.assign((0, e._)`${_}${(0, e.getProperty)($)}`, !0));
  }
  ee.setEvaluated = b;
  const l = {};
  function h(v, _) {
    return v.scopeValue("func", {
      ref: _,
      code: l[_.code] || (l[_.code] = new t._Code(_.code))
    });
  }
  ee.useFunc = h;
  var c;
  (function(v) {
    v[v.Num = 0] = "Num", v[v.Str = 1] = "Str";
  })(c || (ee.Type = c = {}));
  function m(v, _, S) {
    if (v instanceof e.Name) {
      const $ = _ === c.Num;
      return S ? $ ? (0, e._)`"[" + ${v} + "]"` : (0, e._)`"['" + ${v} + "']"` : $ ? (0, e._)`"/" + ${v}` : (0, e._)`"/" + ${v}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
    }
    return S ? (0, e.getProperty)(v).toString() : "/" + d(v);
  }
  ee.getErrorPath = m;
  function y(v, _, S = v.opts.strictSchema) {
    if (S) {
      if (_ = `strict mode: ${_}`, S === !0)
        throw new Error(_);
      v.self.logger.warn(_);
    }
  }
  return ee.checkStrictMode = y, ee;
}
var Ot = {}, Xs;
function Fe() {
  if (Xs) return Ot;
  Xs = 1, Object.defineProperty(Ot, "__esModule", { value: !0 });
  const e = te(), t = {
    // validation function arguments
    data: new e.Name("data"),
    // data passed to validation function
    // args passed from referencing schema
    valCxt: new e.Name("valCxt"),
    // validation/data context - should not be used directly, it is destructured to the names below
    instancePath: new e.Name("instancePath"),
    parentData: new e.Name("parentData"),
    parentDataProperty: new e.Name("parentDataProperty"),
    rootData: new e.Name("rootData"),
    // root data - same as the data passed to the first/top validation function
    dynamicAnchors: new e.Name("dynamicAnchors"),
    // used to support recursiveRef and dynamicRef
    // function scoped variables
    vErrors: new e.Name("vErrors"),
    // null or array of validation errors
    errors: new e.Name("errors"),
    // counter of validation errors
    this: new e.Name("this"),
    // "globals"
    self: new e.Name("self"),
    scope: new e.Name("scope"),
    // JTD serialize/parse name for JSON string and position
    json: new e.Name("json"),
    jsonPos: new e.Name("jsonPos"),
    jsonLen: new e.Name("jsonLen"),
    jsonPart: new e.Name("jsonPart")
  };
  return Ot.default = t, Ot;
}
var Zs;
function vr() {
  return Zs || (Zs = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
    const t = te(), a = ne(), s = Fe();
    e.keywordError = {
      message: ({ keyword: l }) => (0, t.str)`must pass "${l}" keyword validation`
    }, e.keyword$DataError = {
      message: ({ keyword: l, schemaType: h }) => h ? (0, t.str)`"${l}" keyword must be ${h} ($data)` : (0, t.str)`"${l}" keyword is invalid ($data)`
    };
    function u(l, h = e.keywordError, c, m) {
      const { it: y } = l, { gen: v, compositeRule: _, allErrors: S } = y, $ = E(l, h, c);
      m ?? (_ || S) ? n(v, $) : i(y, (0, t._)`[${$}]`);
    }
    e.reportError = u;
    function o(l, h = e.keywordError, c) {
      const { it: m } = l, { gen: y, compositeRule: v, allErrors: _ } = m, S = E(l, h, c);
      n(y, S), v || _ || i(m, s.default.vErrors);
    }
    e.reportExtraError = o;
    function r(l, h) {
      l.assign(s.default.errors, h), l.if((0, t._)`${s.default.vErrors} !== null`, () => l.if(h, () => l.assign((0, t._)`${s.default.vErrors}.length`, h), () => l.assign(s.default.vErrors, null)));
    }
    e.resetErrorsCount = r;
    function f({ gen: l, keyword: h, schemaValue: c, data: m, errsCount: y, it: v }) {
      if (y === void 0)
        throw new Error("ajv implementation error");
      const _ = l.name("err");
      l.forRange("i", y, s.default.errors, (S) => {
        l.const(_, (0, t._)`${s.default.vErrors}[${S}]`), l.if((0, t._)`${_}.instancePath === undefined`, () => l.assign((0, t._)`${_}.instancePath`, (0, t.strConcat)(s.default.instancePath, v.errorPath))), l.assign((0, t._)`${_}.schemaPath`, (0, t.str)`${v.errSchemaPath}/${h}`), v.opts.verbose && (l.assign((0, t._)`${_}.schema`, c), l.assign((0, t._)`${_}.data`, m));
      });
    }
    e.extendErrors = f;
    function n(l, h) {
      const c = l.const("err", h);
      l.if((0, t._)`${s.default.vErrors} === null`, () => l.assign(s.default.vErrors, (0, t._)`[${c}]`), (0, t._)`${s.default.vErrors}.push(${c})`), l.code((0, t._)`${s.default.errors}++`);
    }
    function i(l, h) {
      const { gen: c, validateName: m, schemaEnv: y } = l;
      y.$async ? c.throw((0, t._)`new ${l.ValidationError}(${h})`) : (c.assign((0, t._)`${m}.errors`, h), c.return(!1));
    }
    const d = {
      keyword: new t.Name("keyword"),
      schemaPath: new t.Name("schemaPath"),
      // also used in JTD errors
      params: new t.Name("params"),
      propertyName: new t.Name("propertyName"),
      message: new t.Name("message"),
      schema: new t.Name("schema"),
      parentSchema: new t.Name("parentSchema")
    };
    function E(l, h, c) {
      const { createErrors: m } = l.it;
      return m === !1 ? (0, t._)`{}` : g(l, h, c);
    }
    function g(l, h, c = {}) {
      const { gen: m, it: y } = l, v = [
        p(y, c),
        w(l, c)
      ];
      return b(l, h, v), m.object(...v);
    }
    function p({ errorPath: l }, { instancePath: h }) {
      const c = h ? (0, t.str)`${l}${(0, a.getErrorPath)(h, a.Type.Str)}` : l;
      return [s.default.instancePath, (0, t.strConcat)(s.default.instancePath, c)];
    }
    function w({ keyword: l, it: { errSchemaPath: h } }, { schemaPath: c, parentSchema: m }) {
      let y = m ? h : (0, t.str)`${h}/${l}`;
      return c && (y = (0, t.str)`${y}${(0, a.getErrorPath)(c, a.Type.Str)}`), [d.schemaPath, y];
    }
    function b(l, { params: h, message: c }, m) {
      const { keyword: y, data: v, schemaValue: _, it: S } = l, { opts: $, propertyName: O, topSchemaRef: T, schemaPath: k } = S;
      m.push([d.keyword, y], [d.params, typeof h == "function" ? h(l) : h || (0, t._)`{}`]), $.messages && m.push([d.message, typeof c == "function" ? c(l) : c]), $.verbose && m.push([d.schema, _], [d.parentSchema, (0, t._)`${T}${k}`], [s.default.data, v]), O && m.push([d.propertyName, O]);
    }
  }(un)), un;
}
var Js;
function zu() {
  if (Js) return je;
  Js = 1, Object.defineProperty(je, "__esModule", { value: !0 }), je.boolOrEmptySchema = je.topBoolOrEmptySchema = void 0;
  const e = vr(), t = te(), a = Fe(), s = {
    message: "boolean schema is false"
  };
  function u(f) {
    const { gen: n, schema: i, validateName: d } = f;
    i === !1 ? r(f, !1) : typeof i == "object" && i.$async === !0 ? n.return(a.default.data) : (n.assign((0, t._)`${d}.errors`, null), n.return(!0));
  }
  je.topBoolOrEmptySchema = u;
  function o(f, n) {
    const { gen: i, schema: d } = f;
    d === !1 ? (i.var(n, !1), r(f)) : i.var(n, !0);
  }
  je.boolOrEmptySchema = o;
  function r(f, n) {
    const { gen: i, data: d } = f, E = {
      gen: i,
      keyword: "false schema",
      data: d,
      schema: !1,
      schemaCode: !1,
      schemaValue: !1,
      params: {},
      it: f
    };
    (0, e.reportError)(E, s, void 0, n);
  }
  return je;
}
var de = {}, Me = {}, Ys;
function Tc() {
  if (Ys) return Me;
  Ys = 1, Object.defineProperty(Me, "__esModule", { value: !0 }), Me.getRules = Me.isJSONType = void 0;
  const e = ["string", "number", "integer", "boolean", "null", "object", "array"], t = new Set(e);
  function a(u) {
    return typeof u == "string" && t.has(u);
  }
  Me.isJSONType = a;
  function s() {
    const u = {
      number: { type: "number", rules: [] },
      string: { type: "string", rules: [] },
      array: { type: "array", rules: [] },
      object: { type: "object", rules: [] }
    };
    return {
      types: { ...u, integer: !0, boolean: !0, null: !0 },
      rules: [{ rules: [] }, u.number, u.string, u.array, u.object],
      post: { rules: [] },
      all: {},
      keywords: {}
    };
  }
  return Me.getRules = s, Me;
}
var De = {}, Qs;
function Cc() {
  if (Qs) return De;
  Qs = 1, Object.defineProperty(De, "__esModule", { value: !0 }), De.shouldUseRule = De.shouldUseGroup = De.schemaHasRulesForType = void 0;
  function e({ schema: s, self: u }, o) {
    const r = u.RULES.types[o];
    return r && r !== !0 && t(s, r);
  }
  De.schemaHasRulesForType = e;
  function t(s, u) {
    return u.rules.some((o) => a(s, o));
  }
  De.shouldUseGroup = t;
  function a(s, u) {
    var o;
    return s[u.keyword] !== void 0 || ((o = u.definition.implements) === null || o === void 0 ? void 0 : o.some((r) => s[r] !== void 0));
  }
  return De.shouldUseRule = a, De;
}
var eo;
function pr() {
  if (eo) return de;
  eo = 1, Object.defineProperty(de, "__esModule", { value: !0 }), de.reportTypeError = de.checkDataTypes = de.checkDataType = de.coerceAndCheckDataType = de.getJSONTypes = de.getSchemaTypes = de.DataType = void 0;
  const e = Tc(), t = Cc(), a = vr(), s = te(), u = ne();
  var o;
  (function(c) {
    c[c.Correct = 0] = "Correct", c[c.Wrong = 1] = "Wrong";
  })(o || (de.DataType = o = {}));
  function r(c) {
    const m = f(c.type);
    if (m.includes("null")) {
      if (c.nullable === !1)
        throw new Error("type: null contradicts nullable: false");
    } else {
      if (!m.length && c.nullable !== void 0)
        throw new Error('"nullable" cannot be used without "type"');
      c.nullable === !0 && m.push("null");
    }
    return m;
  }
  de.getSchemaTypes = r;
  function f(c) {
    const m = Array.isArray(c) ? c : c ? [c] : [];
    if (m.every(e.isJSONType))
      return m;
    throw new Error("type must be JSONType or JSONType[]: " + m.join(","));
  }
  de.getJSONTypes = f;
  function n(c, m) {
    const { gen: y, data: v, opts: _ } = c, S = d(m, _.coerceTypes), $ = m.length > 0 && !(S.length === 0 && m.length === 1 && (0, t.schemaHasRulesForType)(c, m[0]));
    if ($) {
      const O = w(m, v, _.strictNumbers, o.Wrong);
      y.if(O, () => {
        S.length ? E(c, m, S) : l(c);
      });
    }
    return $;
  }
  de.coerceAndCheckDataType = n;
  const i = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
  function d(c, m) {
    return m ? c.filter((y) => i.has(y) || m === "array" && y === "array") : [];
  }
  function E(c, m, y) {
    const { gen: v, data: _, opts: S } = c, $ = v.let("dataType", (0, s._)`typeof ${_}`), O = v.let("coerced", (0, s._)`undefined`);
    S.coerceTypes === "array" && v.if((0, s._)`${$} == 'object' && Array.isArray(${_}) && ${_}.length == 1`, () => v.assign(_, (0, s._)`${_}[0]`).assign($, (0, s._)`typeof ${_}`).if(w(m, _, S.strictNumbers), () => v.assign(O, _))), v.if((0, s._)`${O} !== undefined`);
    for (const k of y)
      (i.has(k) || k === "array" && S.coerceTypes === "array") && T(k);
    v.else(), l(c), v.endIf(), v.if((0, s._)`${O} !== undefined`, () => {
      v.assign(_, O), g(c, O);
    });
    function T(k) {
      switch (k) {
        case "string":
          v.elseIf((0, s._)`${$} == "number" || ${$} == "boolean"`).assign(O, (0, s._)`"" + ${_}`).elseIf((0, s._)`${_} === null`).assign(O, (0, s._)`""`);
          return;
        case "number":
          v.elseIf((0, s._)`${$} == "boolean" || ${_} === null
              || (${$} == "string" && ${_} && ${_} == +${_})`).assign(O, (0, s._)`+${_}`);
          return;
        case "integer":
          v.elseIf((0, s._)`${$} === "boolean" || ${_} === null
              || (${$} === "string" && ${_} && ${_} == +${_} && !(${_} % 1))`).assign(O, (0, s._)`+${_}`);
          return;
        case "boolean":
          v.elseIf((0, s._)`${_} === "false" || ${_} === 0 || ${_} === null`).assign(O, !1).elseIf((0, s._)`${_} === "true" || ${_} === 1`).assign(O, !0);
          return;
        case "null":
          v.elseIf((0, s._)`${_} === "" || ${_} === 0 || ${_} === false`), v.assign(O, null);
          return;
        case "array":
          v.elseIf((0, s._)`${$} === "string" || ${$} === "number"
              || ${$} === "boolean" || ${_} === null`).assign(O, (0, s._)`[${_}]`);
      }
    }
  }
  function g({ gen: c, parentData: m, parentDataProperty: y }, v) {
    c.if((0, s._)`${m} !== undefined`, () => c.assign((0, s._)`${m}[${y}]`, v));
  }
  function p(c, m, y, v = o.Correct) {
    const _ = v === o.Correct ? s.operators.EQ : s.operators.NEQ;
    let S;
    switch (c) {
      case "null":
        return (0, s._)`${m} ${_} null`;
      case "array":
        S = (0, s._)`Array.isArray(${m})`;
        break;
      case "object":
        S = (0, s._)`${m} && typeof ${m} == "object" && !Array.isArray(${m})`;
        break;
      case "integer":
        S = $((0, s._)`!(${m} % 1) && !isNaN(${m})`);
        break;
      case "number":
        S = $();
        break;
      default:
        return (0, s._)`typeof ${m} ${_} ${c}`;
    }
    return v === o.Correct ? S : (0, s.not)(S);
    function $(O = s.nil) {
      return (0, s.and)((0, s._)`typeof ${m} == "number"`, O, y ? (0, s._)`isFinite(${m})` : s.nil);
    }
  }
  de.checkDataType = p;
  function w(c, m, y, v) {
    if (c.length === 1)
      return p(c[0], m, y, v);
    let _;
    const S = (0, u.toHash)(c);
    if (S.array && S.object) {
      const $ = (0, s._)`typeof ${m} != "object"`;
      _ = S.null ? $ : (0, s._)`!${m} || ${$}`, delete S.null, delete S.array, delete S.object;
    } else
      _ = s.nil;
    S.number && delete S.integer;
    for (const $ in S)
      _ = (0, s.and)(_, p($, m, y, v));
    return _;
  }
  de.checkDataTypes = w;
  const b = {
    message: ({ schema: c }) => `must be ${c}`,
    params: ({ schema: c, schemaValue: m }) => typeof c == "string" ? (0, s._)`{type: ${c}}` : (0, s._)`{type: ${m}}`
  };
  function l(c) {
    const m = h(c);
    (0, a.reportError)(m, b);
  }
  de.reportTypeError = l;
  function h(c) {
    const { gen: m, data: y, schema: v } = c, _ = (0, u.schemaRefOrVal)(c, v, "type");
    return {
      gen: m,
      keyword: "type",
      data: y,
      schema: v.type,
      schemaCode: _,
      schemaValue: _,
      parentSchema: v,
      params: {},
      it: c
    };
  }
  return de;
}
var Ze = {}, to;
function Vu() {
  if (to) return Ze;
  to = 1, Object.defineProperty(Ze, "__esModule", { value: !0 }), Ze.assignDefaults = void 0;
  const e = te(), t = ne();
  function a(u, o) {
    const { properties: r, items: f } = u.schema;
    if (o === "object" && r)
      for (const n in r)
        s(u, n, r[n].default);
    else o === "array" && Array.isArray(f) && f.forEach((n, i) => s(u, i, n.default));
  }
  Ze.assignDefaults = a;
  function s(u, o, r) {
    const { gen: f, compositeRule: n, data: i, opts: d } = u;
    if (r === void 0)
      return;
    const E = (0, e._)`${i}${(0, e.getProperty)(o)}`;
    if (n) {
      (0, t.checkStrictMode)(u, `default is ignored for: ${E}`);
      return;
    }
    let g = (0, e._)`${E} === undefined`;
    d.useDefaults === "empty" && (g = (0, e._)`${g} || ${E} === null || ${E} === ""`), f.if(g, (0, e._)`${E} = ${(0, e.stringify)(r)}`);
  }
  return Ze;
}
var Re = {}, ie = {}, ro;
function Oe() {
  if (ro) return ie;
  ro = 1, Object.defineProperty(ie, "__esModule", { value: !0 }), ie.validateUnion = ie.validateArray = ie.usePattern = ie.callValidateCode = ie.schemaProperties = ie.allSchemaProperties = ie.noPropertyInData = ie.propertyInData = ie.isOwnProperty = ie.hasPropFunc = ie.reportMissingProp = ie.checkMissingProp = ie.checkReportMissingProp = void 0;
  const e = te(), t = ne(), a = Fe(), s = ne();
  function u(c, m) {
    const { gen: y, data: v, it: _ } = c;
    y.if(d(y, v, m, _.opts.ownProperties), () => {
      c.setParams({ missingProperty: (0, e._)`${m}` }, !0), c.error();
    });
  }
  ie.checkReportMissingProp = u;
  function o({ gen: c, data: m, it: { opts: y } }, v, _) {
    return (0, e.or)(...v.map((S) => (0, e.and)(d(c, m, S, y.ownProperties), (0, e._)`${_} = ${S}`)));
  }
  ie.checkMissingProp = o;
  function r(c, m) {
    c.setParams({ missingProperty: m }, !0), c.error();
  }
  ie.reportMissingProp = r;
  function f(c) {
    return c.scopeValue("func", {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      ref: Object.prototype.hasOwnProperty,
      code: (0, e._)`Object.prototype.hasOwnProperty`
    });
  }
  ie.hasPropFunc = f;
  function n(c, m, y) {
    return (0, e._)`${f(c)}.call(${m}, ${y})`;
  }
  ie.isOwnProperty = n;
  function i(c, m, y, v) {
    const _ = (0, e._)`${m}${(0, e.getProperty)(y)} !== undefined`;
    return v ? (0, e._)`${_} && ${n(c, m, y)}` : _;
  }
  ie.propertyInData = i;
  function d(c, m, y, v) {
    const _ = (0, e._)`${m}${(0, e.getProperty)(y)} === undefined`;
    return v ? (0, e.or)(_, (0, e.not)(n(c, m, y))) : _;
  }
  ie.noPropertyInData = d;
  function E(c) {
    return c ? Object.keys(c).filter((m) => m !== "__proto__") : [];
  }
  ie.allSchemaProperties = E;
  function g(c, m) {
    return E(m).filter((y) => !(0, t.alwaysValidSchema)(c, m[y]));
  }
  ie.schemaProperties = g;
  function p({ schemaCode: c, data: m, it: { gen: y, topSchemaRef: v, schemaPath: _, errorPath: S }, it: $ }, O, T, k) {
    const H = k ? (0, e._)`${c}, ${m}, ${v}${_}` : m, U = [
      [a.default.instancePath, (0, e.strConcat)(a.default.instancePath, S)],
      [a.default.parentData, $.parentData],
      [a.default.parentDataProperty, $.parentDataProperty],
      [a.default.rootData, a.default.rootData]
    ];
    $.opts.dynamicRef && U.push([a.default.dynamicAnchors, a.default.dynamicAnchors]);
    const z = (0, e._)`${H}, ${y.object(...U)}`;
    return T !== e.nil ? (0, e._)`${O}.call(${T}, ${z})` : (0, e._)`${O}(${z})`;
  }
  ie.callValidateCode = p;
  const w = (0, e._)`new RegExp`;
  function b({ gen: c, it: { opts: m } }, y) {
    const v = m.unicodeRegExp ? "u" : "", { regExp: _ } = m.code, S = _(y, v);
    return c.scopeValue("pattern", {
      key: S.toString(),
      ref: S,
      code: (0, e._)`${_.code === "new RegExp" ? w : (0, s.useFunc)(c, _)}(${y}, ${v})`
    });
  }
  ie.usePattern = b;
  function l(c) {
    const { gen: m, data: y, keyword: v, it: _ } = c, S = m.name("valid");
    if (_.allErrors) {
      const O = m.let("valid", !0);
      return $(() => m.assign(O, !1)), O;
    }
    return m.var(S, !0), $(() => m.break()), S;
    function $(O) {
      const T = m.const("len", (0, e._)`${y}.length`);
      m.forRange("i", 0, T, (k) => {
        c.subschema({
          keyword: v,
          dataProp: k,
          dataPropType: t.Type.Num
        }, S), m.if((0, e.not)(S), O);
      });
    }
  }
  ie.validateArray = l;
  function h(c) {
    const { gen: m, schema: y, keyword: v, it: _ } = c;
    if (!Array.isArray(y))
      throw new Error("ajv implementation error");
    if (y.some((T) => (0, t.alwaysValidSchema)(_, T)) && !_.opts.unevaluated)
      return;
    const $ = m.let("valid", !1), O = m.name("_valid");
    m.block(() => y.forEach((T, k) => {
      const H = c.subschema({
        keyword: v,
        schemaProp: k,
        compositeRule: !0
      }, O);
      m.assign($, (0, e._)`${$} || ${O}`), c.mergeValidEvaluated(H, O) || m.if((0, e.not)($));
    })), c.result($, () => c.reset(), () => c.error(!0));
  }
  return ie.validateUnion = h, ie;
}
var no;
function Gu() {
  if (no) return Re;
  no = 1, Object.defineProperty(Re, "__esModule", { value: !0 }), Re.validateKeywordUsage = Re.validSchemaType = Re.funcKeywordCode = Re.macroKeywordCode = void 0;
  const e = te(), t = Fe(), a = Oe(), s = vr();
  function u(g, p) {
    const { gen: w, keyword: b, schema: l, parentSchema: h, it: c } = g, m = p.macro.call(c.self, l, h, c), y = i(w, b, m);
    c.opts.validateSchema !== !1 && c.self.validateSchema(m, !0);
    const v = w.name("valid");
    g.subschema({
      schema: m,
      schemaPath: e.nil,
      errSchemaPath: `${c.errSchemaPath}/${b}`,
      topSchemaRef: y,
      compositeRule: !0
    }, v), g.pass(v, () => g.error(!0));
  }
  Re.macroKeywordCode = u;
  function o(g, p) {
    var w;
    const { gen: b, keyword: l, schema: h, parentSchema: c, $data: m, it: y } = g;
    n(y, p);
    const v = !m && p.compile ? p.compile.call(y.self, h, c, y) : p.validate, _ = i(b, l, v), S = b.let("valid");
    g.block$data(S, $), g.ok((w = p.valid) !== null && w !== void 0 ? w : S);
    function $() {
      if (p.errors === !1)
        k(), p.modifying && r(g), H(() => g.error());
      else {
        const U = p.async ? O() : T();
        p.modifying && r(g), H(() => f(g, U));
      }
    }
    function O() {
      const U = b.let("ruleErrs", null);
      return b.try(() => k((0, e._)`await `), (z) => b.assign(S, !1).if((0, e._)`${z} instanceof ${y.ValidationError}`, () => b.assign(U, (0, e._)`${z}.errors`), () => b.throw(z))), U;
    }
    function T() {
      const U = (0, e._)`${_}.errors`;
      return b.assign(U, null), k(e.nil), U;
    }
    function k(U = p.async ? (0, e._)`await ` : e.nil) {
      const z = y.opts.passContext ? t.default.this : t.default.self, V = !("compile" in p && !m || p.schema === !1);
      b.assign(S, (0, e._)`${U}${(0, a.callValidateCode)(g, _, z, V)}`, p.modifying);
    }
    function H(U) {
      var z;
      b.if((0, e.not)((z = p.valid) !== null && z !== void 0 ? z : S), U);
    }
  }
  Re.funcKeywordCode = o;
  function r(g) {
    const { gen: p, data: w, it: b } = g;
    p.if(b.parentData, () => p.assign(w, (0, e._)`${b.parentData}[${b.parentDataProperty}]`));
  }
  function f(g, p) {
    const { gen: w } = g;
    w.if((0, e._)`Array.isArray(${p})`, () => {
      w.assign(t.default.vErrors, (0, e._)`${t.default.vErrors} === null ? ${p} : ${t.default.vErrors}.concat(${p})`).assign(t.default.errors, (0, e._)`${t.default.vErrors}.length`), (0, s.extendErrors)(g);
    }, () => g.error());
  }
  function n({ schemaEnv: g }, p) {
    if (p.async && !g.$async)
      throw new Error("async keyword in sync schema");
  }
  function i(g, p, w) {
    if (w === void 0)
      throw new Error(`keyword "${p}" failed to compile`);
    return g.scopeValue("keyword", typeof w == "function" ? { ref: w } : { ref: w, code: (0, e.stringify)(w) });
  }
  function d(g, p, w = !1) {
    return !p.length || p.some((b) => b === "array" ? Array.isArray(g) : b === "object" ? g && typeof g == "object" && !Array.isArray(g) : typeof g == b || w && typeof g > "u");
  }
  Re.validSchemaType = d;
  function E({ schema: g, opts: p, self: w, errSchemaPath: b }, l, h) {
    if (Array.isArray(l.keyword) ? !l.keyword.includes(h) : l.keyword !== h)
      throw new Error("ajv implementation error");
    const c = l.dependencies;
    if (c?.some((m) => !Object.prototype.hasOwnProperty.call(g, m)))
      throw new Error(`parent schema must have dependencies of ${h}: ${c.join(",")}`);
    if (l.validateSchema && !l.validateSchema(g[h])) {
      const y = `keyword "${h}" value is invalid at path "${b}": ` + w.errorsText(l.validateSchema.errors);
      if (p.validateSchema === "log")
        w.logger.error(y);
      else
        throw new Error(y);
    }
  }
  return Re.validateKeywordUsage = E, Re;
}
var Le = {}, io;
function Bu() {
  if (io) return Le;
  io = 1, Object.defineProperty(Le, "__esModule", { value: !0 }), Le.extendSubschemaMode = Le.extendSubschemaData = Le.getSubschema = void 0;
  const e = te(), t = ne();
  function a(o, { keyword: r, schemaProp: f, schema: n, schemaPath: i, errSchemaPath: d, topSchemaRef: E }) {
    if (r !== void 0 && n !== void 0)
      throw new Error('both "keyword" and "schema" passed, only one allowed');
    if (r !== void 0) {
      const g = o.schema[r];
      return f === void 0 ? {
        schema: g,
        schemaPath: (0, e._)`${o.schemaPath}${(0, e.getProperty)(r)}`,
        errSchemaPath: `${o.errSchemaPath}/${r}`
      } : {
        schema: g[f],
        schemaPath: (0, e._)`${o.schemaPath}${(0, e.getProperty)(r)}${(0, e.getProperty)(f)}`,
        errSchemaPath: `${o.errSchemaPath}/${r}/${(0, t.escapeFragment)(f)}`
      };
    }
    if (n !== void 0) {
      if (i === void 0 || d === void 0 || E === void 0)
        throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
      return {
        schema: n,
        schemaPath: i,
        topSchemaRef: E,
        errSchemaPath: d
      };
    }
    throw new Error('either "keyword" or "schema" must be passed');
  }
  Le.getSubschema = a;
  function s(o, r, { dataProp: f, dataPropType: n, data: i, dataTypes: d, propertyName: E }) {
    if (i !== void 0 && f !== void 0)
      throw new Error('both "data" and "dataProp" passed, only one allowed');
    const { gen: g } = r;
    if (f !== void 0) {
      const { errorPath: w, dataPathArr: b, opts: l } = r, h = g.let("data", (0, e._)`${r.data}${(0, e.getProperty)(f)}`, !0);
      p(h), o.errorPath = (0, e.str)`${w}${(0, t.getErrorPath)(f, n, l.jsPropertySyntax)}`, o.parentDataProperty = (0, e._)`${f}`, o.dataPathArr = [...b, o.parentDataProperty];
    }
    if (i !== void 0) {
      const w = i instanceof e.Name ? i : g.let("data", i, !0);
      p(w), E !== void 0 && (o.propertyName = E);
    }
    d && (o.dataTypes = d);
    function p(w) {
      o.data = w, o.dataLevel = r.dataLevel + 1, o.dataTypes = [], r.definedProperties = /* @__PURE__ */ new Set(), o.parentData = r.data, o.dataNames = [...r.dataNames, w];
    }
  }
  Le.extendSubschemaData = s;
  function u(o, { jtdDiscriminator: r, jtdMetadata: f, compositeRule: n, createErrors: i, allErrors: d }) {
    n !== void 0 && (o.compositeRule = n), i !== void 0 && (o.createErrors = i), d !== void 0 && (o.allErrors = d), o.jtdDiscriminator = r, o.jtdMetadata = f;
  }
  return Le.extendSubschemaMode = u, Le;
}
var ve = {}, hn, so;
function Dc() {
  return so || (so = 1, hn = function e(t, a) {
    if (t === a) return !0;
    if (t && a && typeof t == "object" && typeof a == "object") {
      if (t.constructor !== a.constructor) return !1;
      var s, u, o;
      if (Array.isArray(t)) {
        if (s = t.length, s != a.length) return !1;
        for (u = s; u-- !== 0; )
          if (!e(t[u], a[u])) return !1;
        return !0;
      }
      if (t.constructor === RegExp) return t.source === a.source && t.flags === a.flags;
      if (t.valueOf !== Object.prototype.valueOf) return t.valueOf() === a.valueOf();
      if (t.toString !== Object.prototype.toString) return t.toString() === a.toString();
      if (o = Object.keys(t), s = o.length, s !== Object.keys(a).length) return !1;
      for (u = s; u-- !== 0; )
        if (!Object.prototype.hasOwnProperty.call(a, o[u])) return !1;
      for (u = s; u-- !== 0; ) {
        var r = o[u];
        if (!e(t[r], a[r])) return !1;
      }
      return !0;
    }
    return t !== t && a !== a;
  }), hn;
}
var mn = { exports: {} }, oo;
function Hu() {
  if (oo) return mn.exports;
  oo = 1;
  var e = mn.exports = function(s, u, o) {
    typeof u == "function" && (o = u, u = {}), o = u.cb || o;
    var r = typeof o == "function" ? o : o.pre || function() {
    }, f = o.post || function() {
    };
    t(u, r, f, s, "", s);
  };
  e.keywords = {
    additionalItems: !0,
    items: !0,
    contains: !0,
    additionalProperties: !0,
    propertyNames: !0,
    not: !0,
    if: !0,
    then: !0,
    else: !0
  }, e.arrayKeywords = {
    items: !0,
    allOf: !0,
    anyOf: !0,
    oneOf: !0
  }, e.propsKeywords = {
    $defs: !0,
    definitions: !0,
    properties: !0,
    patternProperties: !0,
    dependencies: !0
  }, e.skipKeywords = {
    default: !0,
    enum: !0,
    const: !0,
    required: !0,
    maximum: !0,
    minimum: !0,
    exclusiveMaximum: !0,
    exclusiveMinimum: !0,
    multipleOf: !0,
    maxLength: !0,
    minLength: !0,
    pattern: !0,
    format: !0,
    maxItems: !0,
    minItems: !0,
    uniqueItems: !0,
    maxProperties: !0,
    minProperties: !0
  };
  function t(s, u, o, r, f, n, i, d, E, g) {
    if (r && typeof r == "object" && !Array.isArray(r)) {
      u(r, f, n, i, d, E, g);
      for (var p in r) {
        var w = r[p];
        if (Array.isArray(w)) {
          if (p in e.arrayKeywords)
            for (var b = 0; b < w.length; b++)
              t(s, u, o, w[b], f + "/" + p + "/" + b, n, f, p, r, b);
        } else if (p in e.propsKeywords) {
          if (w && typeof w == "object")
            for (var l in w)
              t(s, u, o, w[l], f + "/" + p + "/" + a(l), n, f, p, r, l);
        } else (p in e.keywords || s.allKeys && !(p in e.skipKeywords)) && t(s, u, o, w, f + "/" + p, n, f, p, r);
      }
      o(r, f, n, i, d, E, g);
    }
  }
  function a(s) {
    return s.replace(/~/g, "~0").replace(/\//g, "~1");
  }
  return mn.exports;
}
var ao;
function Er() {
  if (ao) return ve;
  ao = 1, Object.defineProperty(ve, "__esModule", { value: !0 }), ve.getSchemaRefs = ve.resolveUrl = ve.normalizeId = ve._getFullPath = ve.getFullPath = ve.inlineRef = void 0;
  const e = ne(), t = Dc(), a = Hu(), s = /* @__PURE__ */ new Set([
    "type",
    "format",
    "pattern",
    "maxLength",
    "minLength",
    "maxProperties",
    "minProperties",
    "maxItems",
    "minItems",
    "maximum",
    "minimum",
    "uniqueItems",
    "multipleOf",
    "required",
    "enum",
    "const"
  ]);
  function u(b, l = !0) {
    return typeof b == "boolean" ? !0 : l === !0 ? !r(b) : l ? f(b) <= l : !1;
  }
  ve.inlineRef = u;
  const o = /* @__PURE__ */ new Set([
    "$ref",
    "$recursiveRef",
    "$recursiveAnchor",
    "$dynamicRef",
    "$dynamicAnchor"
  ]);
  function r(b) {
    for (const l in b) {
      if (o.has(l))
        return !0;
      const h = b[l];
      if (Array.isArray(h) && h.some(r) || typeof h == "object" && r(h))
        return !0;
    }
    return !1;
  }
  function f(b) {
    let l = 0;
    for (const h in b) {
      if (h === "$ref")
        return 1 / 0;
      if (l++, !s.has(h) && (typeof b[h] == "object" && (0, e.eachItem)(b[h], (c) => l += f(c)), l === 1 / 0))
        return 1 / 0;
    }
    return l;
  }
  function n(b, l = "", h) {
    h !== !1 && (l = E(l));
    const c = b.parse(l);
    return i(b, c);
  }
  ve.getFullPath = n;
  function i(b, l) {
    return b.serialize(l).split("#")[0] + "#";
  }
  ve._getFullPath = i;
  const d = /#\/?$/;
  function E(b) {
    return b ? b.replace(d, "") : "";
  }
  ve.normalizeId = E;
  function g(b, l, h) {
    return h = E(h), b.resolve(l, h);
  }
  ve.resolveUrl = g;
  const p = /^[a-z_][-a-z0-9._]*$/i;
  function w(b, l) {
    if (typeof b == "boolean")
      return {};
    const { schemaId: h, uriResolver: c } = this.opts, m = E(b[h] || l), y = { "": m }, v = n(c, m, !1), _ = {}, S = /* @__PURE__ */ new Set();
    return a(b, { allKeys: !0 }, (T, k, H, U) => {
      if (U === void 0)
        return;
      const z = v + k;
      let V = y[U];
      typeof T[h] == "string" && (V = Z.call(this, T[h])), B.call(this, T.$anchor), B.call(this, T.$dynamicAnchor), y[k] = V;
      function Z(A) {
        const x = this.opts.uriResolver.resolve;
        if (A = E(V ? x(V, A) : A), S.has(A))
          throw O(A);
        S.add(A);
        let D = this.refs[A];
        return typeof D == "string" && (D = this.refs[D]), typeof D == "object" ? $(T, D.schema, A) : A !== E(z) && (A[0] === "#" ? ($(T, _[A], A), _[A] = T) : this.refs[A] = z), A;
      }
      function B(A) {
        if (typeof A == "string") {
          if (!p.test(A))
            throw new Error(`invalid anchor "${A}"`);
          Z.call(this, `#${A}`);
        }
      }
    }), _;
    function $(T, k, H) {
      if (k !== void 0 && !t(T, k))
        throw O(H);
    }
    function O(T) {
      return new Error(`reference "${T}" resolves to more than one schema`);
    }
  }
  return ve.getSchemaRefs = w, ve;
}
var co;
function gr() {
  if (co) return Ce;
  co = 1, Object.defineProperty(Ce, "__esModule", { value: !0 }), Ce.getData = Ce.KeywordCxt = Ce.validateFunctionCode = void 0;
  const e = zu(), t = pr(), a = Cc(), s = pr(), u = Vu(), o = Gu(), r = Bu(), f = te(), n = Fe(), i = Er(), d = ne(), E = vr();
  function g(P) {
    if (v(P) && (S(P), y(P))) {
      l(P);
      return;
    }
    p(P, () => (0, e.topBoolOrEmptySchema)(P));
  }
  Ce.validateFunctionCode = g;
  function p({ gen: P, validateName: q, schema: M, schemaEnv: F, opts: G }, Y) {
    G.code.es5 ? P.func(q, (0, f._)`${n.default.data}, ${n.default.valCxt}`, F.$async, () => {
      P.code((0, f._)`"use strict"; ${c(M, G)}`), b(P, G), P.code(Y);
    }) : P.func(q, (0, f._)`${n.default.data}, ${w(G)}`, F.$async, () => P.code(c(M, G)).code(Y));
  }
  function w(P) {
    return (0, f._)`{${n.default.instancePath}="", ${n.default.parentData}, ${n.default.parentDataProperty}, ${n.default.rootData}=${n.default.data}${P.dynamicRef ? (0, f._)`, ${n.default.dynamicAnchors}={}` : f.nil}}={}`;
  }
  function b(P, q) {
    P.if(n.default.valCxt, () => {
      P.var(n.default.instancePath, (0, f._)`${n.default.valCxt}.${n.default.instancePath}`), P.var(n.default.parentData, (0, f._)`${n.default.valCxt}.${n.default.parentData}`), P.var(n.default.parentDataProperty, (0, f._)`${n.default.valCxt}.${n.default.parentDataProperty}`), P.var(n.default.rootData, (0, f._)`${n.default.valCxt}.${n.default.rootData}`), q.dynamicRef && P.var(n.default.dynamicAnchors, (0, f._)`${n.default.valCxt}.${n.default.dynamicAnchors}`);
    }, () => {
      P.var(n.default.instancePath, (0, f._)`""`), P.var(n.default.parentData, (0, f._)`undefined`), P.var(n.default.parentDataProperty, (0, f._)`undefined`), P.var(n.default.rootData, n.default.data), q.dynamicRef && P.var(n.default.dynamicAnchors, (0, f._)`{}`);
    });
  }
  function l(P) {
    const { schema: q, opts: M, gen: F } = P;
    p(P, () => {
      M.$comment && q.$comment && U(P), T(P), F.let(n.default.vErrors, null), F.let(n.default.errors, 0), M.unevaluated && h(P), $(P), z(P);
    });
  }
  function h(P) {
    const { gen: q, validateName: M } = P;
    P.evaluated = q.const("evaluated", (0, f._)`${M}.evaluated`), q.if((0, f._)`${P.evaluated}.dynamicProps`, () => q.assign((0, f._)`${P.evaluated}.props`, (0, f._)`undefined`)), q.if((0, f._)`${P.evaluated}.dynamicItems`, () => q.assign((0, f._)`${P.evaluated}.items`, (0, f._)`undefined`));
  }
  function c(P, q) {
    const M = typeof P == "object" && P[q.schemaId];
    return M && (q.code.source || q.code.process) ? (0, f._)`/*# sourceURL=${M} */` : f.nil;
  }
  function m(P, q) {
    if (v(P) && (S(P), y(P))) {
      _(P, q);
      return;
    }
    (0, e.boolOrEmptySchema)(P, q);
  }
  function y({ schema: P, self: q }) {
    if (typeof P == "boolean")
      return !P;
    for (const M in P)
      if (q.RULES.all[M])
        return !0;
    return !1;
  }
  function v(P) {
    return typeof P.schema != "boolean";
  }
  function _(P, q) {
    const { schema: M, gen: F, opts: G } = P;
    G.$comment && M.$comment && U(P), k(P), H(P);
    const Y = F.const("_errs", n.default.errors);
    $(P, Y), F.var(q, (0, f._)`${Y} === ${n.default.errors}`);
  }
  function S(P) {
    (0, d.checkUnknownRules)(P), O(P);
  }
  function $(P, q) {
    if (P.opts.jtd)
      return Z(P, [], !1, q);
    const M = (0, t.getSchemaTypes)(P.schema), F = (0, t.coerceAndCheckDataType)(P, M);
    Z(P, M, !F, q);
  }
  function O(P) {
    const { schema: q, errSchemaPath: M, opts: F, self: G } = P;
    q.$ref && F.ignoreKeywordsWithRef && (0, d.schemaHasRulesButRef)(q, G.RULES) && G.logger.warn(`$ref: keywords ignored in schema at path "${M}"`);
  }
  function T(P) {
    const { schema: q, opts: M } = P;
    q.default !== void 0 && M.useDefaults && M.strictSchema && (0, d.checkStrictMode)(P, "default is ignored in the schema root");
  }
  function k(P) {
    const q = P.schema[P.opts.schemaId];
    q && (P.baseId = (0, i.resolveUrl)(P.opts.uriResolver, P.baseId, q));
  }
  function H(P) {
    if (P.schema.$async && !P.schemaEnv.$async)
      throw new Error("async schema in sync schema");
  }
  function U({ gen: P, schemaEnv: q, schema: M, errSchemaPath: F, opts: G }) {
    const Y = M.$comment;
    if (G.$comment === !0)
      P.code((0, f._)`${n.default.self}.logger.log(${Y})`);
    else if (typeof G.$comment == "function") {
      const X = (0, f.str)`${F}/$comment`, Se = P.scopeValue("root", { ref: q.root });
      P.code((0, f._)`${n.default.self}.opts.$comment(${Y}, ${X}, ${Se}.schema)`);
    }
  }
  function z(P) {
    const { gen: q, schemaEnv: M, validateName: F, ValidationError: G, opts: Y } = P;
    M.$async ? q.if((0, f._)`${n.default.errors} === 0`, () => q.return(n.default.data), () => q.throw((0, f._)`new ${G}(${n.default.vErrors})`)) : (q.assign((0, f._)`${F}.errors`, n.default.vErrors), Y.unevaluated && V(P), q.return((0, f._)`${n.default.errors} === 0`));
  }
  function V({ gen: P, evaluated: q, props: M, items: F }) {
    M instanceof f.Name && P.assign((0, f._)`${q}.props`, M), F instanceof f.Name && P.assign((0, f._)`${q}.items`, F);
  }
  function Z(P, q, M, F) {
    const { gen: G, schema: Y, data: X, allErrors: Se, opts: me, self: pe } = P, { RULES: fe } = pe;
    if (Y.$ref && (me.ignoreKeywordsWithRef || !(0, d.schemaHasRulesButRef)(Y, fe))) {
      G.block(() => K(P, "$ref", fe.all.$ref.definition));
      return;
    }
    me.jtd || A(P, q), G.block(() => {
      for (const ye of fe.rules)
        Te(ye);
      Te(fe.post);
    });
    function Te(ye) {
      (0, a.shouldUseGroup)(Y, ye) && (ye.type ? (G.if((0, s.checkDataType)(ye.type, X, me.strictNumbers)), B(P, ye), q.length === 1 && q[0] === ye.type && M && (G.else(), (0, s.reportTypeError)(P)), G.endIf()) : B(P, ye), Se || G.if((0, f._)`${n.default.errors} === ${F || 0}`));
    }
  }
  function B(P, q) {
    const { gen: M, schema: F, opts: { useDefaults: G } } = P;
    G && (0, u.assignDefaults)(P, q.type), M.block(() => {
      for (const Y of q.rules)
        (0, a.shouldUseRule)(F, Y) && K(P, Y.keyword, Y.definition, q.type);
    });
  }
  function A(P, q) {
    P.schemaEnv.meta || !P.opts.strictTypes || (x(P, q), P.opts.allowUnionTypes || D(P, q), C(P, P.dataTypes));
  }
  function x(P, q) {
    if (q.length) {
      if (!P.dataTypes.length) {
        P.dataTypes = q;
        return;
      }
      q.forEach((M) => {
        L(P.dataTypes, M) || N(P, `type "${M}" not allowed by context "${P.dataTypes.join(",")}"`);
      }), R(P, q);
    }
  }
  function D(P, q) {
    q.length > 1 && !(q.length === 2 && q.includes("null")) && N(P, "use allowUnionTypes to allow union type keyword");
  }
  function C(P, q) {
    const M = P.self.RULES.all;
    for (const F in M) {
      const G = M[F];
      if (typeof G == "object" && (0, a.shouldUseRule)(P.schema, G)) {
        const { type: Y } = G.definition;
        Y.length && !Y.some((X) => j(q, X)) && N(P, `missing type "${Y.join(",")}" for keyword "${F}"`);
      }
    }
  }
  function j(P, q) {
    return P.includes(q) || q === "number" && P.includes("integer");
  }
  function L(P, q) {
    return P.includes(q) || q === "integer" && P.includes("number");
  }
  function R(P, q) {
    const M = [];
    for (const F of P.dataTypes)
      L(q, F) ? M.push(F) : q.includes("integer") && F === "number" && M.push("integer");
    P.dataTypes = M;
  }
  function N(P, q) {
    const M = P.schemaEnv.baseId + P.errSchemaPath;
    q += ` at "${M}" (strictTypes)`, (0, d.checkStrictMode)(P, q, P.opts.strictTypes);
  }
  class I {
    constructor(q, M, F) {
      if ((0, o.validateKeywordUsage)(q, M, F), this.gen = q.gen, this.allErrors = q.allErrors, this.keyword = F, this.data = q.data, this.schema = q.schema[F], this.$data = M.$data && q.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, d.schemaRefOrVal)(q, this.schema, F, this.$data), this.schemaType = M.schemaType, this.parentSchema = q.schema, this.params = {}, this.it = q, this.def = M, this.$data)
        this.schemaCode = q.gen.const("vSchema", J(this.$data, q));
      else if (this.schemaCode = this.schemaValue, !(0, o.validSchemaType)(this.schema, M.schemaType, M.allowUndefined))
        throw new Error(`${F} value must be ${JSON.stringify(M.schemaType)}`);
      ("code" in M ? M.trackErrors : M.errors !== !1) && (this.errsCount = q.gen.const("_errs", n.default.errors));
    }
    result(q, M, F) {
      this.failResult((0, f.not)(q), M, F);
    }
    failResult(q, M, F) {
      this.gen.if(q), F ? F() : this.error(), M ? (this.gen.else(), M(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
    }
    pass(q, M) {
      this.failResult((0, f.not)(q), void 0, M);
    }
    fail(q) {
      if (q === void 0) {
        this.error(), this.allErrors || this.gen.if(!1);
        return;
      }
      this.gen.if(q), this.error(), this.allErrors ? this.gen.endIf() : this.gen.else();
    }
    fail$data(q) {
      if (!this.$data)
        return this.fail(q);
      const { schemaCode: M } = this;
      this.fail((0, f._)`${M} !== undefined && (${(0, f.or)(this.invalid$data(), q)})`);
    }
    error(q, M, F) {
      if (M) {
        this.setParams(M), this._error(q, F), this.setParams({});
        return;
      }
      this._error(q, F);
    }
    _error(q, M) {
      (q ? E.reportExtraError : E.reportError)(this, this.def.error, M);
    }
    $dataError() {
      (0, E.reportError)(this, this.def.$dataError || E.keyword$DataError);
    }
    reset() {
      if (this.errsCount === void 0)
        throw new Error('add "trackErrors" to keyword definition');
      (0, E.resetErrorsCount)(this.gen, this.errsCount);
    }
    ok(q) {
      this.allErrors || this.gen.if(q);
    }
    setParams(q, M) {
      M ? Object.assign(this.params, q) : this.params = q;
    }
    block$data(q, M, F = f.nil) {
      this.gen.block(() => {
        this.check$data(q, F), M();
      });
    }
    check$data(q = f.nil, M = f.nil) {
      if (!this.$data)
        return;
      const { gen: F, schemaCode: G, schemaType: Y, def: X } = this;
      F.if((0, f.or)((0, f._)`${G} === undefined`, M)), q !== f.nil && F.assign(q, !0), (Y.length || X.validateSchema) && (F.elseIf(this.invalid$data()), this.$dataError(), q !== f.nil && F.assign(q, !1)), F.else();
    }
    invalid$data() {
      const { gen: q, schemaCode: M, schemaType: F, def: G, it: Y } = this;
      return (0, f.or)(X(), Se());
      function X() {
        if (F.length) {
          if (!(M instanceof f.Name))
            throw new Error("ajv implementation error");
          const me = Array.isArray(F) ? F : [F];
          return (0, f._)`${(0, s.checkDataTypes)(me, M, Y.opts.strictNumbers, s.DataType.Wrong)}`;
        }
        return f.nil;
      }
      function Se() {
        if (G.validateSchema) {
          const me = q.scopeValue("validate$data", { ref: G.validateSchema });
          return (0, f._)`!${me}(${M})`;
        }
        return f.nil;
      }
    }
    subschema(q, M) {
      const F = (0, r.getSubschema)(this.it, q);
      (0, r.extendSubschemaData)(F, this.it, q), (0, r.extendSubschemaMode)(F, q);
      const G = { ...this.it, ...F, items: void 0, props: void 0 };
      return m(G, M), G;
    }
    mergeEvaluated(q, M) {
      const { it: F, gen: G } = this;
      F.opts.unevaluated && (F.props !== !0 && q.props !== void 0 && (F.props = d.mergeEvaluated.props(G, q.props, F.props, M)), F.items !== !0 && q.items !== void 0 && (F.items = d.mergeEvaluated.items(G, q.items, F.items, M)));
    }
    mergeValidEvaluated(q, M) {
      const { it: F, gen: G } = this;
      if (F.opts.unevaluated && (F.props !== !0 || F.items !== !0))
        return G.if(M, () => this.mergeEvaluated(q, f.Name)), !0;
    }
  }
  Ce.KeywordCxt = I;
  function K(P, q, M, F) {
    const G = new I(P, M, q);
    "code" in M ? M.code(G, F) : G.$data && M.validate ? (0, o.funcKeywordCode)(G, M) : "macro" in M ? (0, o.macroKeywordCode)(G, M) : (M.compile || M.validate) && (0, o.funcKeywordCode)(G, M);
  }
  const W = /^\/(?:[^~]|~0|~1)*$/, Q = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
  function J(P, { dataLevel: q, dataNames: M, dataPathArr: F }) {
    let G, Y;
    if (P === "")
      return n.default.rootData;
    if (P[0] === "/") {
      if (!W.test(P))
        throw new Error(`Invalid JSON-pointer: ${P}`);
      G = P, Y = n.default.rootData;
    } else {
      const pe = Q.exec(P);
      if (!pe)
        throw new Error(`Invalid JSON-pointer: ${P}`);
      const fe = +pe[1];
      if (G = pe[2], G === "#") {
        if (fe >= q)
          throw new Error(me("property/index", fe));
        return F[q - fe];
      }
      if (fe > q)
        throw new Error(me("data", fe));
      if (Y = M[q - fe], !G)
        return Y;
    }
    let X = Y;
    const Se = G.split("/");
    for (const pe of Se)
      pe && (Y = (0, f._)`${Y}${(0, f.getProperty)((0, d.unescapeJsonPointer)(pe))}`, X = (0, f._)`${X} && ${Y}`);
    return X;
    function me(pe, fe) {
      return `Cannot access ${pe} ${fe} levels up, current level is ${q}`;
    }
  }
  return Ce.getData = J, Ce;
}
var It = {}, uo;
function Ci() {
  if (uo) return It;
  uo = 1, Object.defineProperty(It, "__esModule", { value: !0 });
  class e extends Error {
    constructor(a) {
      super("validation failed"), this.errors = a, this.ajv = this.validation = !0;
    }
  }
  return It.default = e, It;
}
var Nt = {}, fo;
function _r() {
  if (fo) return Nt;
  fo = 1, Object.defineProperty(Nt, "__esModule", { value: !0 });
  const e = Er();
  class t extends Error {
    constructor(s, u, o, r) {
      super(r || `can't resolve reference ${o} from id ${u}`), this.missingRef = (0, e.resolveUrl)(s, u, o), this.missingSchema = (0, e.normalizeId)((0, e.getFullPath)(s, this.missingRef));
    }
  }
  return Nt.default = t, Nt;
}
var we = {}, lo;
function Di() {
  if (lo) return we;
  lo = 1, Object.defineProperty(we, "__esModule", { value: !0 }), we.resolveSchema = we.getCompilingSchema = we.resolveRef = we.compileSchema = we.SchemaEnv = void 0;
  const e = te(), t = Ci(), a = Fe(), s = Er(), u = ne(), o = gr();
  class r {
    constructor(h) {
      var c;
      this.refs = {}, this.dynamicAnchors = {};
      let m;
      typeof h.schema == "object" && (m = h.schema), this.schema = h.schema, this.schemaId = h.schemaId, this.root = h.root || this, this.baseId = (c = h.baseId) !== null && c !== void 0 ? c : (0, s.normalizeId)(m?.[h.schemaId || "$id"]), this.schemaPath = h.schemaPath, this.localRefs = h.localRefs, this.meta = h.meta, this.$async = m?.$async, this.refs = {};
    }
  }
  we.SchemaEnv = r;
  function f(l) {
    const h = d.call(this, l);
    if (h)
      return h;
    const c = (0, s.getFullPath)(this.opts.uriResolver, l.root.baseId), { es5: m, lines: y } = this.opts.code, { ownProperties: v } = this.opts, _ = new e.CodeGen(this.scope, { es5: m, lines: y, ownProperties: v });
    let S;
    l.$async && (S = _.scopeValue("Error", {
      ref: t.default,
      code: (0, e._)`require("ajv/dist/runtime/validation_error").default`
    }));
    const $ = _.scopeName("validate");
    l.validateName = $;
    const O = {
      gen: _,
      allErrors: this.opts.allErrors,
      data: a.default.data,
      parentData: a.default.parentData,
      parentDataProperty: a.default.parentDataProperty,
      dataNames: [a.default.data],
      dataPathArr: [e.nil],
      // TODO can its length be used as dataLevel if nil is removed?
      dataLevel: 0,
      dataTypes: [],
      definedProperties: /* @__PURE__ */ new Set(),
      topSchemaRef: _.scopeValue("schema", this.opts.code.source === !0 ? { ref: l.schema, code: (0, e.stringify)(l.schema) } : { ref: l.schema }),
      validateName: $,
      ValidationError: S,
      schema: l.schema,
      schemaEnv: l,
      rootId: c,
      baseId: l.baseId || c,
      schemaPath: e.nil,
      errSchemaPath: l.schemaPath || (this.opts.jtd ? "" : "#"),
      errorPath: (0, e._)`""`,
      opts: this.opts,
      self: this
    };
    let T;
    try {
      this._compilations.add(l), (0, o.validateFunctionCode)(O), _.optimize(this.opts.code.optimize);
      const k = _.toString();
      T = `${_.scopeRefs(a.default.scope)}return ${k}`, this.opts.code.process && (T = this.opts.code.process(T, l));
      const U = new Function(`${a.default.self}`, `${a.default.scope}`, T)(this, this.scope.get());
      if (this.scope.value($, { ref: U }), U.errors = null, U.schema = l.schema, U.schemaEnv = l, l.$async && (U.$async = !0), this.opts.code.source === !0 && (U.source = { validateName: $, validateCode: k, scopeValues: _._values }), this.opts.unevaluated) {
        const { props: z, items: V } = O;
        U.evaluated = {
          props: z instanceof e.Name ? void 0 : z,
          items: V instanceof e.Name ? void 0 : V,
          dynamicProps: z instanceof e.Name,
          dynamicItems: V instanceof e.Name
        }, U.source && (U.source.evaluated = (0, e.stringify)(U.evaluated));
      }
      return l.validate = U, l;
    } catch (k) {
      throw delete l.validate, delete l.validateName, T && this.logger.error("Error compiling schema, function code:", T), k;
    } finally {
      this._compilations.delete(l);
    }
  }
  we.compileSchema = f;
  function n(l, h, c) {
    var m;
    c = (0, s.resolveUrl)(this.opts.uriResolver, h, c);
    const y = l.refs[c];
    if (y)
      return y;
    let v = g.call(this, l, c);
    if (v === void 0) {
      const _ = (m = l.localRefs) === null || m === void 0 ? void 0 : m[c], { schemaId: S } = this.opts;
      _ && (v = new r({ schema: _, schemaId: S, root: l, baseId: h }));
    }
    if (v !== void 0)
      return l.refs[c] = i.call(this, v);
  }
  we.resolveRef = n;
  function i(l) {
    return (0, s.inlineRef)(l.schema, this.opts.inlineRefs) ? l.schema : l.validate ? l : f.call(this, l);
  }
  function d(l) {
    for (const h of this._compilations)
      if (E(h, l))
        return h;
  }
  we.getCompilingSchema = d;
  function E(l, h) {
    return l.schema === h.schema && l.root === h.root && l.baseId === h.baseId;
  }
  function g(l, h) {
    let c;
    for (; typeof (c = this.refs[h]) == "string"; )
      h = c;
    return c || this.schemas[h] || p.call(this, l, h);
  }
  function p(l, h) {
    const c = this.opts.uriResolver.parse(h), m = (0, s._getFullPath)(this.opts.uriResolver, c);
    let y = (0, s.getFullPath)(this.opts.uriResolver, l.baseId, void 0);
    if (Object.keys(l.schema).length > 0 && m === y)
      return b.call(this, c, l);
    const v = (0, s.normalizeId)(m), _ = this.refs[v] || this.schemas[v];
    if (typeof _ == "string") {
      const S = p.call(this, l, _);
      return typeof S?.schema != "object" ? void 0 : b.call(this, c, S);
    }
    if (typeof _?.schema == "object") {
      if (_.validate || f.call(this, _), v === (0, s.normalizeId)(h)) {
        const { schema: S } = _, { schemaId: $ } = this.opts, O = S[$];
        return O && (y = (0, s.resolveUrl)(this.opts.uriResolver, y, O)), new r({ schema: S, schemaId: $, root: l, baseId: y });
      }
      return b.call(this, c, _);
    }
  }
  we.resolveSchema = p;
  const w = /* @__PURE__ */ new Set([
    "properties",
    "patternProperties",
    "enum",
    "dependencies",
    "definitions"
  ]);
  function b(l, { baseId: h, schema: c, root: m }) {
    var y;
    if (((y = l.fragment) === null || y === void 0 ? void 0 : y[0]) !== "/")
      return;
    for (const S of l.fragment.slice(1).split("/")) {
      if (typeof c == "boolean")
        return;
      const $ = c[(0, u.unescapeFragment)(S)];
      if ($ === void 0)
        return;
      c = $;
      const O = typeof c == "object" && c[this.opts.schemaId];
      !w.has(S) && O && (h = (0, s.resolveUrl)(this.opts.uriResolver, h, O));
    }
    let v;
    if (typeof c != "boolean" && c.$ref && !(0, u.schemaHasRulesButRef)(c, this.RULES)) {
      const S = (0, s.resolveUrl)(this.opts.uriResolver, h, c.$ref);
      v = p.call(this, m, S);
    }
    const { schemaId: _ } = this.opts;
    if (v = v || new r({ schema: c, schemaId: _, root: m, baseId: h }), v.schema !== v.root.schema)
      return v;
  }
  return we;
}
const Wu = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", Ku = "Meta-schema for $data reference (JSON AnySchema extension proposal)", Xu = "object", Zu = ["$data"], Ju = { $data: { type: "string", anyOf: [{ format: "relative-json-pointer" }, { format: "json-pointer" }] } }, Yu = !1, Qu = {
  $id: Wu,
  description: Ku,
  type: Xu,
  required: Zu,
  properties: Ju,
  additionalProperties: Yu
};
var Pt = {}, Je = { exports: {} }, pn, ho;
function ef() {
  return ho || (ho = 1, pn = {
    HEX: {
      0: 0,
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
      8: 8,
      9: 9,
      a: 10,
      A: 10,
      b: 11,
      B: 11,
      c: 12,
      C: 12,
      d: 13,
      D: 13,
      e: 14,
      E: 14,
      f: 15,
      F: 15
    }
  }), pn;
}
var yn, mo;
function tf() {
  if (mo) return yn;
  mo = 1;
  const { HEX: e } = ef();
  function t(w) {
    if (r(w, ".") < 3)
      return { host: w, isIPV4: !1 };
    const b = w.match(/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/u) || [], [l] = b;
    return l ? { host: o(l, "."), isIPV4: !0 } : { host: w, isIPV4: !1 };
  }
  function a(w, b = !1) {
    let l = "", h = !0;
    for (const c of w) {
      if (e[c] === void 0) return;
      c !== "0" && h === !0 && (h = !1), h || (l += c);
    }
    return b && l.length === 0 && (l = "0"), l;
  }
  function s(w) {
    let b = 0;
    const l = { error: !1, address: "", zone: "" }, h = [], c = [];
    let m = !1, y = !1, v = !1;
    function _() {
      if (c.length) {
        if (m === !1) {
          const S = a(c);
          if (S !== void 0)
            h.push(S);
          else
            return l.error = !0, !1;
        }
        c.length = 0;
      }
      return !0;
    }
    for (let S = 0; S < w.length; S++) {
      const $ = w[S];
      if (!($ === "[" || $ === "]"))
        if ($ === ":") {
          if (y === !0 && (v = !0), !_())
            break;
          if (b++, h.push(":"), b > 7) {
            l.error = !0;
            break;
          }
          S - 1 >= 0 && w[S - 1] === ":" && (y = !0);
          continue;
        } else if ($ === "%") {
          if (!_())
            break;
          m = !0;
        } else {
          c.push($);
          continue;
        }
    }
    return c.length && (m ? l.zone = c.join("") : v ? h.push(c.join("")) : h.push(a(c))), l.address = h.join(""), l;
  }
  function u(w, b = {}) {
    if (r(w, ":") < 2)
      return { host: w, isIPV6: !1 };
    const l = s(w);
    if (l.error)
      return { host: w, isIPV6: !1 };
    {
      let h = l.address, c = l.address;
      return l.zone && (h += "%" + l.zone, c += "%25" + l.zone), { host: h, escapedHost: c, isIPV6: !0 };
    }
  }
  function o(w, b) {
    let l = "", h = !0;
    const c = w.length;
    for (let m = 0; m < c; m++) {
      const y = w[m];
      y === "0" && h ? (m + 1 <= c && w[m + 1] === b || m + 1 === c) && (l += y, h = !1) : (y === b ? h = !0 : h = !1, l += y);
    }
    return l;
  }
  function r(w, b) {
    let l = 0;
    for (let h = 0; h < w.length; h++)
      w[h] === b && l++;
    return l;
  }
  const f = /^\.\.?\//u, n = /^\/\.(?:\/|$)/u, i = /^\/\.\.(?:\/|$)/u, d = /^\/?(?:.|\n)*?(?=\/|$)/u;
  function E(w) {
    const b = [];
    for (; w.length; )
      if (w.match(f))
        w = w.replace(f, "");
      else if (w.match(n))
        w = w.replace(n, "/");
      else if (w.match(i))
        w = w.replace(i, "/"), b.pop();
      else if (w === "." || w === "..")
        w = "";
      else {
        const l = w.match(d);
        if (l) {
          const h = l[0];
          w = w.slice(h.length), b.push(h);
        } else
          throw new Error("Unexpected dot segment condition");
      }
    return b.join("");
  }
  function g(w, b) {
    const l = b !== !0 ? escape : unescape;
    return w.scheme !== void 0 && (w.scheme = l(w.scheme)), w.userinfo !== void 0 && (w.userinfo = l(w.userinfo)), w.host !== void 0 && (w.host = l(w.host)), w.path !== void 0 && (w.path = l(w.path)), w.query !== void 0 && (w.query = l(w.query)), w.fragment !== void 0 && (w.fragment = l(w.fragment)), w;
  }
  function p(w, b) {
    const l = [];
    if (w.userinfo !== void 0 && (l.push(w.userinfo), l.push("@")), w.host !== void 0) {
      let h = unescape(w.host);
      const c = t(h);
      if (c.isIPV4)
        h = c.host;
      else {
        const m = u(c.host, { isIPV4: !1 });
        m.isIPV6 === !0 ? h = `[${m.escapedHost}]` : h = w.host;
      }
      l.push(h);
    }
    return (typeof w.port == "number" || typeof w.port == "string") && (l.push(":"), l.push(String(w.port))), l.length ? l.join("") : void 0;
  }
  return yn = {
    recomposeAuthority: p,
    normalizeComponentEncoding: g,
    removeDotSegments: E,
    normalizeIPv4: t,
    normalizeIPv6: u,
    stringArrayToHexStripped: a
  }, yn;
}
var vn, po;
function rf() {
  if (po) return vn;
  po = 1;
  const e = /^[\da-f]{8}\b-[\da-f]{4}\b-[\da-f]{4}\b-[\da-f]{4}\b-[\da-f]{12}$/iu, t = /([\da-z][\d\-a-z]{0,31}):((?:[\w!$'()*+,\-.:;=@]|%[\da-f]{2})+)/iu;
  function a(c) {
    return typeof c.secure == "boolean" ? c.secure : String(c.scheme).toLowerCase() === "wss";
  }
  function s(c) {
    return c.host || (c.error = c.error || "HTTP URIs must have a host."), c;
  }
  function u(c) {
    const m = String(c.scheme).toLowerCase() === "https";
    return (c.port === (m ? 443 : 80) || c.port === "") && (c.port = void 0), c.path || (c.path = "/"), c;
  }
  function o(c) {
    return c.secure = a(c), c.resourceName = (c.path || "/") + (c.query ? "?" + c.query : ""), c.path = void 0, c.query = void 0, c;
  }
  function r(c) {
    if ((c.port === (a(c) ? 443 : 80) || c.port === "") && (c.port = void 0), typeof c.secure == "boolean" && (c.scheme = c.secure ? "wss" : "ws", c.secure = void 0), c.resourceName) {
      const [m, y] = c.resourceName.split("?");
      c.path = m && m !== "/" ? m : void 0, c.query = y, c.resourceName = void 0;
    }
    return c.fragment = void 0, c;
  }
  function f(c, m) {
    if (!c.path)
      return c.error = "URN can not be parsed", c;
    const y = c.path.match(t);
    if (y) {
      const v = m.scheme || c.scheme || "urn";
      c.nid = y[1].toLowerCase(), c.nss = y[2];
      const _ = `${v}:${m.nid || c.nid}`, S = h[_];
      c.path = void 0, S && (c = S.parse(c, m));
    } else
      c.error = c.error || "URN can not be parsed.";
    return c;
  }
  function n(c, m) {
    const y = m.scheme || c.scheme || "urn", v = c.nid.toLowerCase(), _ = `${y}:${m.nid || v}`, S = h[_];
    S && (c = S.serialize(c, m));
    const $ = c, O = c.nss;
    return $.path = `${v || m.nid}:${O}`, m.skipEscape = !0, $;
  }
  function i(c, m) {
    const y = c;
    return y.uuid = y.nss, y.nss = void 0, !m.tolerant && (!y.uuid || !e.test(y.uuid)) && (y.error = y.error || "UUID is not valid."), y;
  }
  function d(c) {
    const m = c;
    return m.nss = (c.uuid || "").toLowerCase(), m;
  }
  const E = {
    scheme: "http",
    domainHost: !0,
    parse: s,
    serialize: u
  }, g = {
    scheme: "https",
    domainHost: E.domainHost,
    parse: s,
    serialize: u
  }, p = {
    scheme: "ws",
    domainHost: !0,
    parse: o,
    serialize: r
  }, w = {
    scheme: "wss",
    domainHost: p.domainHost,
    parse: p.parse,
    serialize: p.serialize
  }, h = {
    http: E,
    https: g,
    ws: p,
    wss: w,
    urn: {
      scheme: "urn",
      parse: f,
      serialize: n,
      skipNormalize: !0
    },
    "urn:uuid": {
      scheme: "urn:uuid",
      parse: i,
      serialize: d,
      skipNormalize: !0
    }
  };
  return vn = h, vn;
}
var yo;
function nf() {
  if (yo) return Je.exports;
  yo = 1;
  const { normalizeIPv6: e, normalizeIPv4: t, removeDotSegments: a, recomposeAuthority: s, normalizeComponentEncoding: u } = tf(), o = rf();
  function r(l, h) {
    return typeof l == "string" ? l = d(w(l, h), h) : typeof l == "object" && (l = w(d(l, h), h)), l;
  }
  function f(l, h, c) {
    const m = Object.assign({ scheme: "null" }, c), y = n(w(l, m), w(h, m), m, !0);
    return d(y, { ...m, skipEscape: !0 });
  }
  function n(l, h, c, m) {
    const y = {};
    return m || (l = w(d(l, c), c), h = w(d(h, c), c)), c = c || {}, !c.tolerant && h.scheme ? (y.scheme = h.scheme, y.userinfo = h.userinfo, y.host = h.host, y.port = h.port, y.path = a(h.path || ""), y.query = h.query) : (h.userinfo !== void 0 || h.host !== void 0 || h.port !== void 0 ? (y.userinfo = h.userinfo, y.host = h.host, y.port = h.port, y.path = a(h.path || ""), y.query = h.query) : (h.path ? (h.path.charAt(0) === "/" ? y.path = a(h.path) : ((l.userinfo !== void 0 || l.host !== void 0 || l.port !== void 0) && !l.path ? y.path = "/" + h.path : l.path ? y.path = l.path.slice(0, l.path.lastIndexOf("/") + 1) + h.path : y.path = h.path, y.path = a(y.path)), y.query = h.query) : (y.path = l.path, h.query !== void 0 ? y.query = h.query : y.query = l.query), y.userinfo = l.userinfo, y.host = l.host, y.port = l.port), y.scheme = l.scheme), y.fragment = h.fragment, y;
  }
  function i(l, h, c) {
    return typeof l == "string" ? (l = unescape(l), l = d(u(w(l, c), !0), { ...c, skipEscape: !0 })) : typeof l == "object" && (l = d(u(l, !0), { ...c, skipEscape: !0 })), typeof h == "string" ? (h = unescape(h), h = d(u(w(h, c), !0), { ...c, skipEscape: !0 })) : typeof h == "object" && (h = d(u(h, !0), { ...c, skipEscape: !0 })), l.toLowerCase() === h.toLowerCase();
  }
  function d(l, h) {
    const c = {
      host: l.host,
      scheme: l.scheme,
      userinfo: l.userinfo,
      port: l.port,
      path: l.path,
      query: l.query,
      nid: l.nid,
      nss: l.nss,
      uuid: l.uuid,
      fragment: l.fragment,
      reference: l.reference,
      resourceName: l.resourceName,
      secure: l.secure,
      error: ""
    }, m = Object.assign({}, h), y = [], v = o[(m.scheme || c.scheme || "").toLowerCase()];
    v && v.serialize && v.serialize(c, m), c.path !== void 0 && (m.skipEscape ? c.path = unescape(c.path) : (c.path = escape(c.path), c.scheme !== void 0 && (c.path = c.path.split("%3A").join(":")))), m.reference !== "suffix" && c.scheme && y.push(c.scheme, ":");
    const _ = s(c, m);
    if (_ !== void 0 && (m.reference !== "suffix" && y.push("//"), y.push(_), c.path && c.path.charAt(0) !== "/" && y.push("/")), c.path !== void 0) {
      let S = c.path;
      !m.absolutePath && (!v || !v.absolutePath) && (S = a(S)), _ === void 0 && (S = S.replace(/^\/\//u, "/%2F")), y.push(S);
    }
    return c.query !== void 0 && y.push("?", c.query), c.fragment !== void 0 && y.push("#", c.fragment), y.join("");
  }
  const E = Array.from({ length: 127 }, (l, h) => /[^!"$&'()*+,\-.;=_`a-z{}~]/u.test(String.fromCharCode(h)));
  function g(l) {
    let h = 0;
    for (let c = 0, m = l.length; c < m; ++c)
      if (h = l.charCodeAt(c), h > 126 || E[h])
        return !0;
    return !1;
  }
  const p = /^(?:([^#/:?]+):)?(?:\/\/((?:([^#/?@]*)@)?(\[[^#/?\]]+\]|[^#/:?]*)(?::(\d*))?))?([^#?]*)(?:\?([^#]*))?(?:#((?:.|[\n\r])*))?/u;
  function w(l, h) {
    const c = Object.assign({}, h), m = {
      scheme: void 0,
      userinfo: void 0,
      host: "",
      port: void 0,
      path: "",
      query: void 0,
      fragment: void 0
    }, y = l.indexOf("%") !== -1;
    let v = !1;
    c.reference === "suffix" && (l = (c.scheme ? c.scheme + ":" : "") + "//" + l);
    const _ = l.match(p);
    if (_) {
      if (m.scheme = _[1], m.userinfo = _[3], m.host = _[4], m.port = parseInt(_[5], 10), m.path = _[6] || "", m.query = _[7], m.fragment = _[8], isNaN(m.port) && (m.port = _[5]), m.host) {
        const $ = t(m.host);
        if ($.isIPV4 === !1) {
          const O = e($.host, { isIPV4: !1 });
          m.host = O.host.toLowerCase(), v = O.isIPV6;
        } else
          m.host = $.host, v = !0;
      }
      m.scheme === void 0 && m.userinfo === void 0 && m.host === void 0 && m.port === void 0 && !m.path && m.query === void 0 ? m.reference = "same-document" : m.scheme === void 0 ? m.reference = "relative" : m.fragment === void 0 ? m.reference = "absolute" : m.reference = "uri", c.reference && c.reference !== "suffix" && c.reference !== m.reference && (m.error = m.error || "URI is not a " + c.reference + " reference.");
      const S = o[(c.scheme || m.scheme || "").toLowerCase()];
      if (!c.unicodeSupport && (!S || !S.unicodeSupport) && m.host && (c.domainHost || S && S.domainHost) && v === !1 && g(m.host))
        try {
          m.host = URL.domainToASCII(m.host.toLowerCase());
        } catch ($) {
          m.error = m.error || "Host's domain name can not be converted to ASCII: " + $;
        }
      (!S || S && !S.skipNormalize) && (y && m.scheme !== void 0 && (m.scheme = unescape(m.scheme)), y && m.host !== void 0 && (m.host = unescape(m.host)), m.path !== void 0 && m.path.length && (m.path = escape(unescape(m.path))), m.fragment !== void 0 && m.fragment.length && (m.fragment = encodeURI(decodeURIComponent(m.fragment)))), S && S.parse && S.parse(m, c);
    } else
      m.error = m.error || "URI can not be parsed.";
    return m;
  }
  const b = {
    SCHEMES: o,
    normalize: r,
    resolve: f,
    resolveComponents: n,
    equal: i,
    serialize: d,
    parse: w
  };
  return Je.exports = b, Je.exports.default = b, Je.exports.fastUri = b, Je.exports;
}
var vo;
function sf() {
  if (vo) return Pt;
  vo = 1, Object.defineProperty(Pt, "__esModule", { value: !0 });
  const e = nf();
  return e.code = 'require("ajv/dist/runtime/uri").default', Pt.default = e, Pt;
}
var Eo;
function of() {
  return Eo || (Eo = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = void 0;
    var t = gr();
    Object.defineProperty(e, "KeywordCxt", { enumerable: !0, get: function() {
      return t.KeywordCxt;
    } });
    var a = te();
    Object.defineProperty(e, "_", { enumerable: !0, get: function() {
      return a._;
    } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
      return a.str;
    } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
      return a.stringify;
    } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
      return a.nil;
    } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
      return a.Name;
    } }), Object.defineProperty(e, "CodeGen", { enumerable: !0, get: function() {
      return a.CodeGen;
    } });
    const s = Ci(), u = _r(), o = Tc(), r = Di(), f = te(), n = Er(), i = pr(), d = ne(), E = Qu, g = sf(), p = (D, C) => new RegExp(D, C);
    p.code = "new RegExp";
    const w = ["removeAdditional", "useDefaults", "coerceTypes"], b = /* @__PURE__ */ new Set([
      "validate",
      "serialize",
      "parse",
      "wrapper",
      "root",
      "schema",
      "keyword",
      "pattern",
      "formats",
      "validate$data",
      "func",
      "obj",
      "Error"
    ]), l = {
      errorDataPath: "",
      format: "`validateFormats: false` can be used instead.",
      nullable: '"nullable" keyword is supported by default.',
      jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
      extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
      missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
      processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
      sourceCode: "Use option `code: {source: true}`",
      strictDefaults: "It is default now, see option `strict`.",
      strictKeywords: "It is default now, see option `strict`.",
      uniqueItems: '"uniqueItems" keyword is always validated.',
      unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
      cache: "Map is used as cache, schema object as key.",
      serialize: "Map is used as cache, schema object as key.",
      ajvErrors: "It is default now."
    }, h = {
      ignoreKeywordsWithRef: "",
      jsPropertySyntax: "",
      unicode: '"minLength"/"maxLength" account for unicode characters by default.'
    }, c = 200;
    function m(D) {
      var C, j, L, R, N, I, K, W, Q, J, P, q, M, F, G, Y, X, Se, me, pe, fe, Te, ye, Ke, le;
      const ce = D.strict, se = (C = D.code) === null || C === void 0 ? void 0 : C.optimize, re = se === !0 || se === void 0 ? 1 : se || 0, ge = (L = (j = D.code) === null || j === void 0 ? void 0 : j.regExp) !== null && L !== void 0 ? L : p, Gc = (R = D.uriResolver) !== null && R !== void 0 ? R : g.default;
      return {
        strictSchema: (I = (N = D.strictSchema) !== null && N !== void 0 ? N : ce) !== null && I !== void 0 ? I : !0,
        strictNumbers: (W = (K = D.strictNumbers) !== null && K !== void 0 ? K : ce) !== null && W !== void 0 ? W : !0,
        strictTypes: (J = (Q = D.strictTypes) !== null && Q !== void 0 ? Q : ce) !== null && J !== void 0 ? J : "log",
        strictTuples: (q = (P = D.strictTuples) !== null && P !== void 0 ? P : ce) !== null && q !== void 0 ? q : "log",
        strictRequired: (F = (M = D.strictRequired) !== null && M !== void 0 ? M : ce) !== null && F !== void 0 ? F : !1,
        code: D.code ? { ...D.code, optimize: re, regExp: ge } : { optimize: re, regExp: ge },
        loopRequired: (G = D.loopRequired) !== null && G !== void 0 ? G : c,
        loopEnum: (Y = D.loopEnum) !== null && Y !== void 0 ? Y : c,
        meta: (X = D.meta) !== null && X !== void 0 ? X : !0,
        messages: (Se = D.messages) !== null && Se !== void 0 ? Se : !0,
        inlineRefs: (me = D.inlineRefs) !== null && me !== void 0 ? me : !0,
        schemaId: (pe = D.schemaId) !== null && pe !== void 0 ? pe : "$id",
        addUsedSchema: (fe = D.addUsedSchema) !== null && fe !== void 0 ? fe : !0,
        validateSchema: (Te = D.validateSchema) !== null && Te !== void 0 ? Te : !0,
        validateFormats: (ye = D.validateFormats) !== null && ye !== void 0 ? ye : !0,
        unicodeRegExp: (Ke = D.unicodeRegExp) !== null && Ke !== void 0 ? Ke : !0,
        int32range: (le = D.int32range) !== null && le !== void 0 ? le : !0,
        uriResolver: Gc
      };
    }
    class y {
      constructor(C = {}) {
        this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), C = this.opts = { ...C, ...m(C) };
        const { es5: j, lines: L } = this.opts.code;
        this.scope = new f.ValueScope({ scope: {}, prefixes: b, es5: j, lines: L }), this.logger = H(C.logger);
        const R = C.validateFormats;
        C.validateFormats = !1, this.RULES = (0, o.getRules)(), v.call(this, l, C, "NOT SUPPORTED"), v.call(this, h, C, "DEPRECATED", "warn"), this._metaOpts = T.call(this), C.formats && $.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), C.keywords && O.call(this, C.keywords), typeof C.meta == "object" && this.addMetaSchema(C.meta), S.call(this), C.validateFormats = R;
      }
      _addVocabularies() {
        this.addKeyword("$async");
      }
      _addDefaultMetaSchema() {
        const { $data: C, meta: j, schemaId: L } = this.opts;
        let R = E;
        L === "id" && (R = { ...E }, R.id = R.$id, delete R.$id), j && C && this.addMetaSchema(R, R[L], !1);
      }
      defaultMeta() {
        const { meta: C, schemaId: j } = this.opts;
        return this.opts.defaultMeta = typeof C == "object" ? C[j] || C : void 0;
      }
      validate(C, j) {
        let L;
        if (typeof C == "string") {
          if (L = this.getSchema(C), !L)
            throw new Error(`no schema with key or ref "${C}"`);
        } else
          L = this.compile(C);
        const R = L(j);
        return "$async" in L || (this.errors = L.errors), R;
      }
      compile(C, j) {
        const L = this._addSchema(C, j);
        return L.validate || this._compileSchemaEnv(L);
      }
      compileAsync(C, j) {
        if (typeof this.opts.loadSchema != "function")
          throw new Error("options.loadSchema should be a function");
        const { loadSchema: L } = this.opts;
        return R.call(this, C, j);
        async function R(J, P) {
          await N.call(this, J.$schema);
          const q = this._addSchema(J, P);
          return q.validate || I.call(this, q);
        }
        async function N(J) {
          J && !this.getSchema(J) && await R.call(this, { $ref: J }, !0);
        }
        async function I(J) {
          try {
            return this._compileSchemaEnv(J);
          } catch (P) {
            if (!(P instanceof u.default))
              throw P;
            return K.call(this, P), await W.call(this, P.missingSchema), I.call(this, J);
          }
        }
        function K({ missingSchema: J, missingRef: P }) {
          if (this.refs[J])
            throw new Error(`AnySchema ${J} is loaded but ${P} cannot be resolved`);
        }
        async function W(J) {
          const P = await Q.call(this, J);
          this.refs[J] || await N.call(this, P.$schema), this.refs[J] || this.addSchema(P, J, j);
        }
        async function Q(J) {
          const P = this._loading[J];
          if (P)
            return P;
          try {
            return await (this._loading[J] = L(J));
          } finally {
            delete this._loading[J];
          }
        }
      }
      // Adds schema to the instance
      addSchema(C, j, L, R = this.opts.validateSchema) {
        if (Array.isArray(C)) {
          for (const I of C)
            this.addSchema(I, void 0, L, R);
          return this;
        }
        let N;
        if (typeof C == "object") {
          const { schemaId: I } = this.opts;
          if (N = C[I], N !== void 0 && typeof N != "string")
            throw new Error(`schema ${I} must be string`);
        }
        return j = (0, n.normalizeId)(j || N), this._checkUnique(j), this.schemas[j] = this._addSchema(C, L, j, R, !0), this;
      }
      // Add schema that will be used to validate other schemas
      // options in META_IGNORE_OPTIONS are alway set to false
      addMetaSchema(C, j, L = this.opts.validateSchema) {
        return this.addSchema(C, j, !0, L), this;
      }
      //  Validate schema against its meta-schema
      validateSchema(C, j) {
        if (typeof C == "boolean")
          return !0;
        let L;
        if (L = C.$schema, L !== void 0 && typeof L != "string")
          throw new Error("$schema must be a string");
        if (L = L || this.opts.defaultMeta || this.defaultMeta(), !L)
          return this.logger.warn("meta-schema not available"), this.errors = null, !0;
        const R = this.validate(L, C);
        if (!R && j) {
          const N = "schema is invalid: " + this.errorsText();
          if (this.opts.validateSchema === "log")
            this.logger.error(N);
          else
            throw new Error(N);
        }
        return R;
      }
      // Get compiled schema by `key` or `ref`.
      // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
      getSchema(C) {
        let j;
        for (; typeof (j = _.call(this, C)) == "string"; )
          C = j;
        if (j === void 0) {
          const { schemaId: L } = this.opts, R = new r.SchemaEnv({ schema: {}, schemaId: L });
          if (j = r.resolveSchema.call(this, R, C), !j)
            return;
          this.refs[C] = j;
        }
        return j.validate || this._compileSchemaEnv(j);
      }
      // Remove cached schema(s).
      // If no parameter is passed all schemas but meta-schemas are removed.
      // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
      // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
      removeSchema(C) {
        if (C instanceof RegExp)
          return this._removeAllSchemas(this.schemas, C), this._removeAllSchemas(this.refs, C), this;
        switch (typeof C) {
          case "undefined":
            return this._removeAllSchemas(this.schemas), this._removeAllSchemas(this.refs), this._cache.clear(), this;
          case "string": {
            const j = _.call(this, C);
            return typeof j == "object" && this._cache.delete(j.schema), delete this.schemas[C], delete this.refs[C], this;
          }
          case "object": {
            const j = C;
            this._cache.delete(j);
            let L = C[this.opts.schemaId];
            return L && (L = (0, n.normalizeId)(L), delete this.schemas[L], delete this.refs[L]), this;
          }
          default:
            throw new Error("ajv.removeSchema: invalid parameter");
        }
      }
      // add "vocabulary" - a collection of keywords
      addVocabulary(C) {
        for (const j of C)
          this.addKeyword(j);
        return this;
      }
      addKeyword(C, j) {
        let L;
        if (typeof C == "string")
          L = C, typeof j == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), j.keyword = L);
        else if (typeof C == "object" && j === void 0) {
          if (j = C, L = j.keyword, Array.isArray(L) && !L.length)
            throw new Error("addKeywords: keyword must be string or non-empty array");
        } else
          throw new Error("invalid addKeywords parameters");
        if (z.call(this, L, j), !j)
          return (0, d.eachItem)(L, (N) => V.call(this, N)), this;
        B.call(this, j);
        const R = {
          ...j,
          type: (0, i.getJSONTypes)(j.type),
          schemaType: (0, i.getJSONTypes)(j.schemaType)
        };
        return (0, d.eachItem)(L, R.type.length === 0 ? (N) => V.call(this, N, R) : (N) => R.type.forEach((I) => V.call(this, N, R, I))), this;
      }
      getKeyword(C) {
        const j = this.RULES.all[C];
        return typeof j == "object" ? j.definition : !!j;
      }
      // Remove keyword
      removeKeyword(C) {
        const { RULES: j } = this;
        delete j.keywords[C], delete j.all[C];
        for (const L of j.rules) {
          const R = L.rules.findIndex((N) => N.keyword === C);
          R >= 0 && L.rules.splice(R, 1);
        }
        return this;
      }
      // Add format
      addFormat(C, j) {
        return typeof j == "string" && (j = new RegExp(j)), this.formats[C] = j, this;
      }
      errorsText(C = this.errors, { separator: j = ", ", dataVar: L = "data" } = {}) {
        return !C || C.length === 0 ? "No errors" : C.map((R) => `${L}${R.instancePath} ${R.message}`).reduce((R, N) => R + j + N);
      }
      $dataMetaSchema(C, j) {
        const L = this.RULES.all;
        C = JSON.parse(JSON.stringify(C));
        for (const R of j) {
          const N = R.split("/").slice(1);
          let I = C;
          for (const K of N)
            I = I[K];
          for (const K in L) {
            const W = L[K];
            if (typeof W != "object")
              continue;
            const { $data: Q } = W.definition, J = I[K];
            Q && J && (I[K] = x(J));
          }
        }
        return C;
      }
      _removeAllSchemas(C, j) {
        for (const L in C) {
          const R = C[L];
          (!j || j.test(L)) && (typeof R == "string" ? delete C[L] : R && !R.meta && (this._cache.delete(R.schema), delete C[L]));
        }
      }
      _addSchema(C, j, L, R = this.opts.validateSchema, N = this.opts.addUsedSchema) {
        let I;
        const { schemaId: K } = this.opts;
        if (typeof C == "object")
          I = C[K];
        else {
          if (this.opts.jtd)
            throw new Error("schema must be object");
          if (typeof C != "boolean")
            throw new Error("schema must be object or boolean");
        }
        let W = this._cache.get(C);
        if (W !== void 0)
          return W;
        L = (0, n.normalizeId)(I || L);
        const Q = n.getSchemaRefs.call(this, C, L);
        return W = new r.SchemaEnv({ schema: C, schemaId: K, meta: j, baseId: L, localRefs: Q }), this._cache.set(W.schema, W), N && !L.startsWith("#") && (L && this._checkUnique(L), this.refs[L] = W), R && this.validateSchema(C, !0), W;
      }
      _checkUnique(C) {
        if (this.schemas[C] || this.refs[C])
          throw new Error(`schema with key or id "${C}" already exists`);
      }
      _compileSchemaEnv(C) {
        if (C.meta ? this._compileMetaSchema(C) : r.compileSchema.call(this, C), !C.validate)
          throw new Error("ajv implementation error");
        return C.validate;
      }
      _compileMetaSchema(C) {
        const j = this.opts;
        this.opts = this._metaOpts;
        try {
          r.compileSchema.call(this, C);
        } finally {
          this.opts = j;
        }
      }
    }
    y.ValidationError = s.default, y.MissingRefError = u.default, e.default = y;
    function v(D, C, j, L = "error") {
      for (const R in D) {
        const N = R;
        N in C && this.logger[L](`${j}: option ${R}. ${D[N]}`);
      }
    }
    function _(D) {
      return D = (0, n.normalizeId)(D), this.schemas[D] || this.refs[D];
    }
    function S() {
      const D = this.opts.schemas;
      if (D)
        if (Array.isArray(D))
          this.addSchema(D);
        else
          for (const C in D)
            this.addSchema(D[C], C);
    }
    function $() {
      for (const D in this.opts.formats) {
        const C = this.opts.formats[D];
        C && this.addFormat(D, C);
      }
    }
    function O(D) {
      if (Array.isArray(D)) {
        this.addVocabulary(D);
        return;
      }
      this.logger.warn("keywords option as map is deprecated, pass array");
      for (const C in D) {
        const j = D[C];
        j.keyword || (j.keyword = C), this.addKeyword(j);
      }
    }
    function T() {
      const D = { ...this.opts };
      for (const C of w)
        delete D[C];
      return D;
    }
    const k = { log() {
    }, warn() {
    }, error() {
    } };
    function H(D) {
      if (D === !1)
        return k;
      if (D === void 0)
        return console;
      if (D.log && D.warn && D.error)
        return D;
      throw new Error("logger must implement log, warn and error methods");
    }
    const U = /^[a-z_$][a-z0-9_$:-]*$/i;
    function z(D, C) {
      const { RULES: j } = this;
      if ((0, d.eachItem)(D, (L) => {
        if (j.keywords[L])
          throw new Error(`Keyword ${L} is already defined`);
        if (!U.test(L))
          throw new Error(`Keyword ${L} has invalid name`);
      }), !!C && C.$data && !("code" in C || "validate" in C))
        throw new Error('$data keyword must have "code" or "validate" function');
    }
    function V(D, C, j) {
      var L;
      const R = C?.post;
      if (j && R)
        throw new Error('keyword with "post" flag cannot have "type"');
      const { RULES: N } = this;
      let I = R ? N.post : N.rules.find(({ type: W }) => W === j);
      if (I || (I = { type: j, rules: [] }, N.rules.push(I)), N.keywords[D] = !0, !C)
        return;
      const K = {
        keyword: D,
        definition: {
          ...C,
          type: (0, i.getJSONTypes)(C.type),
          schemaType: (0, i.getJSONTypes)(C.schemaType)
        }
      };
      C.before ? Z.call(this, I, K, C.before) : I.rules.push(K), N.all[D] = K, (L = C.implements) === null || L === void 0 || L.forEach((W) => this.addKeyword(W));
    }
    function Z(D, C, j) {
      const L = D.rules.findIndex((R) => R.keyword === j);
      L >= 0 ? D.rules.splice(L, 0, C) : (D.rules.push(C), this.logger.warn(`rule ${j} is not defined`));
    }
    function B(D) {
      let { metaSchema: C } = D;
      C !== void 0 && (D.$data && this.opts.$data && (C = x(C)), D.validateSchema = this.compile(C, !0));
    }
    const A = {
      $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
    };
    function x(D) {
      return { anyOf: [D, A] };
    }
  }(cn)), cn;
}
var Tt = {}, Ct = {}, Dt = {}, go;
function af() {
  if (go) return Dt;
  go = 1, Object.defineProperty(Dt, "__esModule", { value: !0 });
  const e = {
    keyword: "id",
    code() {
      throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
    }
  };
  return Dt.default = e, Dt;
}
var Ae = {}, _o;
function cf() {
  if (_o) return Ae;
  _o = 1, Object.defineProperty(Ae, "__esModule", { value: !0 }), Ae.callRef = Ae.getValidate = void 0;
  const e = _r(), t = Oe(), a = te(), s = Fe(), u = Di(), o = ne(), r = {
    keyword: "$ref",
    schemaType: "string",
    code(i) {
      const { gen: d, schema: E, it: g } = i, { baseId: p, schemaEnv: w, validateName: b, opts: l, self: h } = g, { root: c } = w;
      if ((E === "#" || E === "#/") && p === c.baseId)
        return y();
      const m = u.resolveRef.call(h, c, p, E);
      if (m === void 0)
        throw new e.default(g.opts.uriResolver, p, E);
      if (m instanceof u.SchemaEnv)
        return v(m);
      return _(m);
      function y() {
        if (w === c)
          return n(i, b, w, w.$async);
        const S = d.scopeValue("root", { ref: c });
        return n(i, (0, a._)`${S}.validate`, c, c.$async);
      }
      function v(S) {
        const $ = f(i, S);
        n(i, $, S, S.$async);
      }
      function _(S) {
        const $ = d.scopeValue("schema", l.code.source === !0 ? { ref: S, code: (0, a.stringify)(S) } : { ref: S }), O = d.name("valid"), T = i.subschema({
          schema: S,
          dataTypes: [],
          schemaPath: a.nil,
          topSchemaRef: $,
          errSchemaPath: E
        }, O);
        i.mergeEvaluated(T), i.ok(O);
      }
    }
  };
  function f(i, d) {
    const { gen: E } = i;
    return d.validate ? E.scopeValue("validate", { ref: d.validate }) : (0, a._)`${E.scopeValue("wrapper", { ref: d })}.validate`;
  }
  Ae.getValidate = f;
  function n(i, d, E, g) {
    const { gen: p, it: w } = i, { allErrors: b, schemaEnv: l, opts: h } = w, c = h.passContext ? s.default.this : a.nil;
    g ? m() : y();
    function m() {
      if (!l.$async)
        throw new Error("async schema referenced by sync schema");
      const S = p.let("valid");
      p.try(() => {
        p.code((0, a._)`await ${(0, t.callValidateCode)(i, d, c)}`), _(d), b || p.assign(S, !0);
      }, ($) => {
        p.if((0, a._)`!(${$} instanceof ${w.ValidationError})`, () => p.throw($)), v($), b || p.assign(S, !1);
      }), i.ok(S);
    }
    function y() {
      i.result((0, t.callValidateCode)(i, d, c), () => _(d), () => v(d));
    }
    function v(S) {
      const $ = (0, a._)`${S}.errors`;
      p.assign(s.default.vErrors, (0, a._)`${s.default.vErrors} === null ? ${$} : ${s.default.vErrors}.concat(${$})`), p.assign(s.default.errors, (0, a._)`${s.default.vErrors}.length`);
    }
    function _(S) {
      var $;
      if (!w.opts.unevaluated)
        return;
      const O = ($ = E?.validate) === null || $ === void 0 ? void 0 : $.evaluated;
      if (w.props !== !0)
        if (O && !O.dynamicProps)
          O.props !== void 0 && (w.props = o.mergeEvaluated.props(p, O.props, w.props));
        else {
          const T = p.var("props", (0, a._)`${S}.evaluated.props`);
          w.props = o.mergeEvaluated.props(p, T, w.props, a.Name);
        }
      if (w.items !== !0)
        if (O && !O.dynamicItems)
          O.items !== void 0 && (w.items = o.mergeEvaluated.items(p, O.items, w.items));
        else {
          const T = p.var("items", (0, a._)`${S}.evaluated.items`);
          w.items = o.mergeEvaluated.items(p, T, w.items, a.Name);
        }
    }
  }
  return Ae.callRef = n, Ae.default = r, Ae;
}
var So;
function uf() {
  if (So) return Ct;
  So = 1, Object.defineProperty(Ct, "__esModule", { value: !0 });
  const e = af(), t = cf(), a = [
    "$schema",
    "$id",
    "$defs",
    "$vocabulary",
    { keyword: "$comment" },
    "definitions",
    e.default,
    t.default
  ];
  return Ct.default = a, Ct;
}
var Lt = {}, At = {}, wo;
function ff() {
  if (wo) return At;
  wo = 1, Object.defineProperty(At, "__esModule", { value: !0 });
  const e = te(), t = e.operators, a = {
    maximum: { okStr: "<=", ok: t.LTE, fail: t.GT },
    minimum: { okStr: ">=", ok: t.GTE, fail: t.LT },
    exclusiveMaximum: { okStr: "<", ok: t.LT, fail: t.GTE },
    exclusiveMinimum: { okStr: ">", ok: t.GT, fail: t.LTE }
  }, s = {
    message: ({ keyword: o, schemaCode: r }) => (0, e.str)`must be ${a[o].okStr} ${r}`,
    params: ({ keyword: o, schemaCode: r }) => (0, e._)`{comparison: ${a[o].okStr}, limit: ${r}}`
  }, u = {
    keyword: Object.keys(a),
    type: "number",
    schemaType: "number",
    $data: !0,
    error: s,
    code(o) {
      const { keyword: r, data: f, schemaCode: n } = o;
      o.fail$data((0, e._)`${f} ${a[r].fail} ${n} || isNaN(${f})`);
    }
  };
  return At.default = u, At;
}
var Ft = {}, $o;
function lf() {
  if ($o) return Ft;
  $o = 1, Object.defineProperty(Ft, "__esModule", { value: !0 });
  const e = te(), a = {
    keyword: "multipleOf",
    type: "number",
    schemaType: "number",
    $data: !0,
    error: {
      message: ({ schemaCode: s }) => (0, e.str)`must be multiple of ${s}`,
      params: ({ schemaCode: s }) => (0, e._)`{multipleOf: ${s}}`
    },
    code(s) {
      const { gen: u, data: o, schemaCode: r, it: f } = s, n = f.opts.multipleOfPrecision, i = u.let("res"), d = n ? (0, e._)`Math.abs(Math.round(${i}) - ${i}) > 1e-${n}` : (0, e._)`${i} !== parseInt(${i})`;
      s.fail$data((0, e._)`(${r} === 0 || (${i} = ${o}/${r}, ${d}))`);
    }
  };
  return Ft.default = a, Ft;
}
var qt = {}, kt = {}, bo;
function df() {
  if (bo) return kt;
  bo = 1, Object.defineProperty(kt, "__esModule", { value: !0 });
  function e(t) {
    const a = t.length;
    let s = 0, u = 0, o;
    for (; u < a; )
      s++, o = t.charCodeAt(u++), o >= 55296 && o <= 56319 && u < a && (o = t.charCodeAt(u), (o & 64512) === 56320 && u++);
    return s;
  }
  return kt.default = e, e.code = 'require("ajv/dist/runtime/ucs2length").default', kt;
}
var Ro;
function hf() {
  if (Ro) return qt;
  Ro = 1, Object.defineProperty(qt, "__esModule", { value: !0 });
  const e = te(), t = ne(), a = df(), u = {
    keyword: ["maxLength", "minLength"],
    type: "string",
    schemaType: "number",
    $data: !0,
    error: {
      message({ keyword: o, schemaCode: r }) {
        const f = o === "maxLength" ? "more" : "fewer";
        return (0, e.str)`must NOT have ${f} than ${r} characters`;
      },
      params: ({ schemaCode: o }) => (0, e._)`{limit: ${o}}`
    },
    code(o) {
      const { keyword: r, data: f, schemaCode: n, it: i } = o, d = r === "maxLength" ? e.operators.GT : e.operators.LT, E = i.opts.unicode === !1 ? (0, e._)`${f}.length` : (0, e._)`${(0, t.useFunc)(o.gen, a.default)}(${f})`;
      o.fail$data((0, e._)`${E} ${d} ${n}`);
    }
  };
  return qt.default = u, qt;
}
var jt = {}, Oo;
function mf() {
  if (Oo) return jt;
  Oo = 1, Object.defineProperty(jt, "__esModule", { value: !0 });
  const e = Oe(), t = te(), s = {
    keyword: "pattern",
    type: "string",
    schemaType: "string",
    $data: !0,
    error: {
      message: ({ schemaCode: u }) => (0, t.str)`must match pattern "${u}"`,
      params: ({ schemaCode: u }) => (0, t._)`{pattern: ${u}}`
    },
    code(u) {
      const { data: o, $data: r, schema: f, schemaCode: n, it: i } = u, d = i.opts.unicodeRegExp ? "u" : "", E = r ? (0, t._)`(new RegExp(${n}, ${d}))` : (0, e.usePattern)(u, f);
      u.fail$data((0, t._)`!${E}.test(${o})`);
    }
  };
  return jt.default = s, jt;
}
var Mt = {}, Io;
function pf() {
  if (Io) return Mt;
  Io = 1, Object.defineProperty(Mt, "__esModule", { value: !0 });
  const e = te(), a = {
    keyword: ["maxProperties", "minProperties"],
    type: "object",
    schemaType: "number",
    $data: !0,
    error: {
      message({ keyword: s, schemaCode: u }) {
        const o = s === "maxProperties" ? "more" : "fewer";
        return (0, e.str)`must NOT have ${o} than ${u} properties`;
      },
      params: ({ schemaCode: s }) => (0, e._)`{limit: ${s}}`
    },
    code(s) {
      const { keyword: u, data: o, schemaCode: r } = s, f = u === "maxProperties" ? e.operators.GT : e.operators.LT;
      s.fail$data((0, e._)`Object.keys(${o}).length ${f} ${r}`);
    }
  };
  return Mt.default = a, Mt;
}
var xt = {}, No;
function yf() {
  if (No) return xt;
  No = 1, Object.defineProperty(xt, "__esModule", { value: !0 });
  const e = Oe(), t = te(), a = ne(), u = {
    keyword: "required",
    type: "object",
    schemaType: "array",
    $data: !0,
    error: {
      message: ({ params: { missingProperty: o } }) => (0, t.str)`must have required property '${o}'`,
      params: ({ params: { missingProperty: o } }) => (0, t._)`{missingProperty: ${o}}`
    },
    code(o) {
      const { gen: r, schema: f, schemaCode: n, data: i, $data: d, it: E } = o, { opts: g } = E;
      if (!d && f.length === 0)
        return;
      const p = f.length >= g.loopRequired;
      if (E.allErrors ? w() : b(), g.strictRequired) {
        const c = o.parentSchema.properties, { definedProperties: m } = o.it;
        for (const y of f)
          if (c?.[y] === void 0 && !m.has(y)) {
            const v = E.schemaEnv.baseId + E.errSchemaPath, _ = `required property "${y}" is not defined at "${v}" (strictRequired)`;
            (0, a.checkStrictMode)(E, _, E.opts.strictRequired);
          }
      }
      function w() {
        if (p || d)
          o.block$data(t.nil, l);
        else
          for (const c of f)
            (0, e.checkReportMissingProp)(o, c);
      }
      function b() {
        const c = r.let("missing");
        if (p || d) {
          const m = r.let("valid", !0);
          o.block$data(m, () => h(c, m)), o.ok(m);
        } else
          r.if((0, e.checkMissingProp)(o, f, c)), (0, e.reportMissingProp)(o, c), r.else();
      }
      function l() {
        r.forOf("prop", n, (c) => {
          o.setParams({ missingProperty: c }), r.if((0, e.noPropertyInData)(r, i, c, g.ownProperties), () => o.error());
        });
      }
      function h(c, m) {
        o.setParams({ missingProperty: c }), r.forOf(c, n, () => {
          r.assign(m, (0, e.propertyInData)(r, i, c, g.ownProperties)), r.if((0, t.not)(m), () => {
            o.error(), r.break();
          });
        }, t.nil);
      }
    }
  };
  return xt.default = u, xt;
}
var Ut = {}, Po;
function vf() {
  if (Po) return Ut;
  Po = 1, Object.defineProperty(Ut, "__esModule", { value: !0 });
  const e = te(), a = {
    keyword: ["maxItems", "minItems"],
    type: "array",
    schemaType: "number",
    $data: !0,
    error: {
      message({ keyword: s, schemaCode: u }) {
        const o = s === "maxItems" ? "more" : "fewer";
        return (0, e.str)`must NOT have ${o} than ${u} items`;
      },
      params: ({ schemaCode: s }) => (0, e._)`{limit: ${s}}`
    },
    code(s) {
      const { keyword: u, data: o, schemaCode: r } = s, f = u === "maxItems" ? e.operators.GT : e.operators.LT;
      s.fail$data((0, e._)`${o}.length ${f} ${r}`);
    }
  };
  return Ut.default = a, Ut;
}
var zt = {}, Vt = {}, To;
function Li() {
  if (To) return Vt;
  To = 1, Object.defineProperty(Vt, "__esModule", { value: !0 });
  const e = Dc();
  return e.code = 'require("ajv/dist/runtime/equal").default', Vt.default = e, Vt;
}
var Co;
function Ef() {
  if (Co) return zt;
  Co = 1, Object.defineProperty(zt, "__esModule", { value: !0 });
  const e = pr(), t = te(), a = ne(), s = Li(), o = {
    keyword: "uniqueItems",
    type: "array",
    schemaType: "boolean",
    $data: !0,
    error: {
      message: ({ params: { i: r, j: f } }) => (0, t.str)`must NOT have duplicate items (items ## ${f} and ${r} are identical)`,
      params: ({ params: { i: r, j: f } }) => (0, t._)`{i: ${r}, j: ${f}}`
    },
    code(r) {
      const { gen: f, data: n, $data: i, schema: d, parentSchema: E, schemaCode: g, it: p } = r;
      if (!i && !d)
        return;
      const w = f.let("valid"), b = E.items ? (0, e.getSchemaTypes)(E.items) : [];
      r.block$data(w, l, (0, t._)`${g} === false`), r.ok(w);
      function l() {
        const y = f.let("i", (0, t._)`${n}.length`), v = f.let("j");
        r.setParams({ i: y, j: v }), f.assign(w, !0), f.if((0, t._)`${y} > 1`, () => (h() ? c : m)(y, v));
      }
      function h() {
        return b.length > 0 && !b.some((y) => y === "object" || y === "array");
      }
      function c(y, v) {
        const _ = f.name("item"), S = (0, e.checkDataTypes)(b, _, p.opts.strictNumbers, e.DataType.Wrong), $ = f.const("indices", (0, t._)`{}`);
        f.for((0, t._)`;${y}--;`, () => {
          f.let(_, (0, t._)`${n}[${y}]`), f.if(S, (0, t._)`continue`), b.length > 1 && f.if((0, t._)`typeof ${_} == "string"`, (0, t._)`${_} += "_"`), f.if((0, t._)`typeof ${$}[${_}] == "number"`, () => {
            f.assign(v, (0, t._)`${$}[${_}]`), r.error(), f.assign(w, !1).break();
          }).code((0, t._)`${$}[${_}] = ${y}`);
        });
      }
      function m(y, v) {
        const _ = (0, a.useFunc)(f, s.default), S = f.name("outer");
        f.label(S).for((0, t._)`;${y}--;`, () => f.for((0, t._)`${v} = ${y}; ${v}--;`, () => f.if((0, t._)`${_}(${n}[${y}], ${n}[${v}])`, () => {
          r.error(), f.assign(w, !1).break(S);
        })));
      }
    }
  };
  return zt.default = o, zt;
}
var Gt = {}, Do;
function gf() {
  if (Do) return Gt;
  Do = 1, Object.defineProperty(Gt, "__esModule", { value: !0 });
  const e = te(), t = ne(), a = Li(), u = {
    keyword: "const",
    $data: !0,
    error: {
      message: "must be equal to constant",
      params: ({ schemaCode: o }) => (0, e._)`{allowedValue: ${o}}`
    },
    code(o) {
      const { gen: r, data: f, $data: n, schemaCode: i, schema: d } = o;
      n || d && typeof d == "object" ? o.fail$data((0, e._)`!${(0, t.useFunc)(r, a.default)}(${f}, ${i})`) : o.fail((0, e._)`${d} !== ${f}`);
    }
  };
  return Gt.default = u, Gt;
}
var Bt = {}, Lo;
function _f() {
  if (Lo) return Bt;
  Lo = 1, Object.defineProperty(Bt, "__esModule", { value: !0 });
  const e = te(), t = ne(), a = Li(), u = {
    keyword: "enum",
    schemaType: "array",
    $data: !0,
    error: {
      message: "must be equal to one of the allowed values",
      params: ({ schemaCode: o }) => (0, e._)`{allowedValues: ${o}}`
    },
    code(o) {
      const { gen: r, data: f, $data: n, schema: i, schemaCode: d, it: E } = o;
      if (!n && i.length === 0)
        throw new Error("enum must have non-empty array");
      const g = i.length >= E.opts.loopEnum;
      let p;
      const w = () => p ?? (p = (0, t.useFunc)(r, a.default));
      let b;
      if (g || n)
        b = r.let("valid"), o.block$data(b, l);
      else {
        if (!Array.isArray(i))
          throw new Error("ajv implementation error");
        const c = r.const("vSchema", d);
        b = (0, e.or)(...i.map((m, y) => h(c, y)));
      }
      o.pass(b);
      function l() {
        r.assign(b, !1), r.forOf("v", d, (c) => r.if((0, e._)`${w()}(${f}, ${c})`, () => r.assign(b, !0).break()));
      }
      function h(c, m) {
        const y = i[m];
        return typeof y == "object" && y !== null ? (0, e._)`${w()}(${f}, ${c}[${m}])` : (0, e._)`${f} === ${y}`;
      }
    }
  };
  return Bt.default = u, Bt;
}
var Ao;
function Sf() {
  if (Ao) return Lt;
  Ao = 1, Object.defineProperty(Lt, "__esModule", { value: !0 });
  const e = ff(), t = lf(), a = hf(), s = mf(), u = pf(), o = yf(), r = vf(), f = Ef(), n = gf(), i = _f(), d = [
    // number
    e.default,
    t.default,
    // string
    a.default,
    s.default,
    // object
    u.default,
    o.default,
    // array
    r.default,
    f.default,
    // any
    { keyword: "type", schemaType: ["string", "array"] },
    { keyword: "nullable", schemaType: "boolean" },
    n.default,
    i.default
  ];
  return Lt.default = d, Lt;
}
var Ht = {}, Ve = {}, Fo;
function Lc() {
  if (Fo) return Ve;
  Fo = 1, Object.defineProperty(Ve, "__esModule", { value: !0 }), Ve.validateAdditionalItems = void 0;
  const e = te(), t = ne(), s = {
    keyword: "additionalItems",
    type: "array",
    schemaType: ["boolean", "object"],
    before: "uniqueItems",
    error: {
      message: ({ params: { len: o } }) => (0, e.str)`must NOT have more than ${o} items`,
      params: ({ params: { len: o } }) => (0, e._)`{limit: ${o}}`
    },
    code(o) {
      const { parentSchema: r, it: f } = o, { items: n } = r;
      if (!Array.isArray(n)) {
        (0, t.checkStrictMode)(f, '"additionalItems" is ignored when "items" is not an array of schemas');
        return;
      }
      u(o, n);
    }
  };
  function u(o, r) {
    const { gen: f, schema: n, data: i, keyword: d, it: E } = o;
    E.items = !0;
    const g = f.const("len", (0, e._)`${i}.length`);
    if (n === !1)
      o.setParams({ len: r.length }), o.pass((0, e._)`${g} <= ${r.length}`);
    else if (typeof n == "object" && !(0, t.alwaysValidSchema)(E, n)) {
      const w = f.var("valid", (0, e._)`${g} <= ${r.length}`);
      f.if((0, e.not)(w), () => p(w)), o.ok(w);
    }
    function p(w) {
      f.forRange("i", r.length, g, (b) => {
        o.subschema({ keyword: d, dataProp: b, dataPropType: t.Type.Num }, w), E.allErrors || f.if((0, e.not)(w), () => f.break());
      });
    }
  }
  return Ve.validateAdditionalItems = u, Ve.default = s, Ve;
}
var Wt = {}, Ge = {}, qo;
function Ac() {
  if (qo) return Ge;
  qo = 1, Object.defineProperty(Ge, "__esModule", { value: !0 }), Ge.validateTuple = void 0;
  const e = te(), t = ne(), a = Oe(), s = {
    keyword: "items",
    type: "array",
    schemaType: ["object", "array", "boolean"],
    before: "uniqueItems",
    code(o) {
      const { schema: r, it: f } = o;
      if (Array.isArray(r))
        return u(o, "additionalItems", r);
      f.items = !0, !(0, t.alwaysValidSchema)(f, r) && o.ok((0, a.validateArray)(o));
    }
  };
  function u(o, r, f = o.schema) {
    const { gen: n, parentSchema: i, data: d, keyword: E, it: g } = o;
    b(i), g.opts.unevaluated && f.length && g.items !== !0 && (g.items = t.mergeEvaluated.items(n, f.length, g.items));
    const p = n.name("valid"), w = n.const("len", (0, e._)`${d}.length`);
    f.forEach((l, h) => {
      (0, t.alwaysValidSchema)(g, l) || (n.if((0, e._)`${w} > ${h}`, () => o.subschema({
        keyword: E,
        schemaProp: h,
        dataProp: h
      }, p)), o.ok(p));
    });
    function b(l) {
      const { opts: h, errSchemaPath: c } = g, m = f.length, y = m === l.minItems && (m === l.maxItems || l[r] === !1);
      if (h.strictTuples && !y) {
        const v = `"${E}" is ${m}-tuple, but minItems or maxItems/${r} are not specified or different at path "${c}"`;
        (0, t.checkStrictMode)(g, v, h.strictTuples);
      }
    }
  }
  return Ge.validateTuple = u, Ge.default = s, Ge;
}
var ko;
function wf() {
  if (ko) return Wt;
  ko = 1, Object.defineProperty(Wt, "__esModule", { value: !0 });
  const e = Ac(), t = {
    keyword: "prefixItems",
    type: "array",
    schemaType: ["array"],
    before: "uniqueItems",
    code: (a) => (0, e.validateTuple)(a, "items")
  };
  return Wt.default = t, Wt;
}
var Kt = {}, jo;
function $f() {
  if (jo) return Kt;
  jo = 1, Object.defineProperty(Kt, "__esModule", { value: !0 });
  const e = te(), t = ne(), a = Oe(), s = Lc(), o = {
    keyword: "items",
    type: "array",
    schemaType: ["object", "boolean"],
    before: "uniqueItems",
    error: {
      message: ({ params: { len: r } }) => (0, e.str)`must NOT have more than ${r} items`,
      params: ({ params: { len: r } }) => (0, e._)`{limit: ${r}}`
    },
    code(r) {
      const { schema: f, parentSchema: n, it: i } = r, { prefixItems: d } = n;
      i.items = !0, !(0, t.alwaysValidSchema)(i, f) && (d ? (0, s.validateAdditionalItems)(r, d) : r.ok((0, a.validateArray)(r)));
    }
  };
  return Kt.default = o, Kt;
}
var Xt = {}, Mo;
function bf() {
  if (Mo) return Xt;
  Mo = 1, Object.defineProperty(Xt, "__esModule", { value: !0 });
  const e = te(), t = ne(), s = {
    keyword: "contains",
    type: "array",
    schemaType: ["object", "boolean"],
    before: "uniqueItems",
    trackErrors: !0,
    error: {
      message: ({ params: { min: u, max: o } }) => o === void 0 ? (0, e.str)`must contain at least ${u} valid item(s)` : (0, e.str)`must contain at least ${u} and no more than ${o} valid item(s)`,
      params: ({ params: { min: u, max: o } }) => o === void 0 ? (0, e._)`{minContains: ${u}}` : (0, e._)`{minContains: ${u}, maxContains: ${o}}`
    },
    code(u) {
      const { gen: o, schema: r, parentSchema: f, data: n, it: i } = u;
      let d, E;
      const { minContains: g, maxContains: p } = f;
      i.opts.next ? (d = g === void 0 ? 1 : g, E = p) : d = 1;
      const w = o.const("len", (0, e._)`${n}.length`);
      if (u.setParams({ min: d, max: E }), E === void 0 && d === 0) {
        (0, t.checkStrictMode)(i, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
        return;
      }
      if (E !== void 0 && d > E) {
        (0, t.checkStrictMode)(i, '"minContains" > "maxContains" is always invalid'), u.fail();
        return;
      }
      if ((0, t.alwaysValidSchema)(i, r)) {
        let m = (0, e._)`${w} >= ${d}`;
        E !== void 0 && (m = (0, e._)`${m} && ${w} <= ${E}`), u.pass(m);
        return;
      }
      i.items = !0;
      const b = o.name("valid");
      E === void 0 && d === 1 ? h(b, () => o.if(b, () => o.break())) : d === 0 ? (o.let(b, !0), E !== void 0 && o.if((0, e._)`${n}.length > 0`, l)) : (o.let(b, !1), l()), u.result(b, () => u.reset());
      function l() {
        const m = o.name("_valid"), y = o.let("count", 0);
        h(m, () => o.if(m, () => c(y)));
      }
      function h(m, y) {
        o.forRange("i", 0, w, (v) => {
          u.subschema({
            keyword: "contains",
            dataProp: v,
            dataPropType: t.Type.Num,
            compositeRule: !0
          }, m), y();
        });
      }
      function c(m) {
        o.code((0, e._)`${m}++`), E === void 0 ? o.if((0, e._)`${m} >= ${d}`, () => o.assign(b, !0).break()) : (o.if((0, e._)`${m} > ${E}`, () => o.assign(b, !1).break()), d === 1 ? o.assign(b, !0) : o.if((0, e._)`${m} >= ${d}`, () => o.assign(b, !0)));
      }
    }
  };
  return Xt.default = s, Xt;
}
var En = {}, xo;
function Rf() {
  return xo || (xo = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
    const t = te(), a = ne(), s = Oe();
    e.error = {
      message: ({ params: { property: n, depsCount: i, deps: d } }) => {
        const E = i === 1 ? "property" : "properties";
        return (0, t.str)`must have ${E} ${d} when property ${n} is present`;
      },
      params: ({ params: { property: n, depsCount: i, deps: d, missingProperty: E } }) => (0, t._)`{property: ${n},
    missingProperty: ${E},
    depsCount: ${i},
    deps: ${d}}`
      // TODO change to reference
    };
    const u = {
      keyword: "dependencies",
      type: "object",
      schemaType: "object",
      error: e.error,
      code(n) {
        const [i, d] = o(n);
        r(n, i), f(n, d);
      }
    };
    function o({ schema: n }) {
      const i = {}, d = {};
      for (const E in n) {
        if (E === "__proto__")
          continue;
        const g = Array.isArray(n[E]) ? i : d;
        g[E] = n[E];
      }
      return [i, d];
    }
    function r(n, i = n.schema) {
      const { gen: d, data: E, it: g } = n;
      if (Object.keys(i).length === 0)
        return;
      const p = d.let("missing");
      for (const w in i) {
        const b = i[w];
        if (b.length === 0)
          continue;
        const l = (0, s.propertyInData)(d, E, w, g.opts.ownProperties);
        n.setParams({
          property: w,
          depsCount: b.length,
          deps: b.join(", ")
        }), g.allErrors ? d.if(l, () => {
          for (const h of b)
            (0, s.checkReportMissingProp)(n, h);
        }) : (d.if((0, t._)`${l} && (${(0, s.checkMissingProp)(n, b, p)})`), (0, s.reportMissingProp)(n, p), d.else());
      }
    }
    e.validatePropertyDeps = r;
    function f(n, i = n.schema) {
      const { gen: d, data: E, keyword: g, it: p } = n, w = d.name("valid");
      for (const b in i)
        (0, a.alwaysValidSchema)(p, i[b]) || (d.if(
          (0, s.propertyInData)(d, E, b, p.opts.ownProperties),
          () => {
            const l = n.subschema({ keyword: g, schemaProp: b }, w);
            n.mergeValidEvaluated(l, w);
          },
          () => d.var(w, !0)
          // TODO var
        ), n.ok(w));
    }
    e.validateSchemaDeps = f, e.default = u;
  }(En)), En;
}
var Zt = {}, Uo;
function Of() {
  if (Uo) return Zt;
  Uo = 1, Object.defineProperty(Zt, "__esModule", { value: !0 });
  const e = te(), t = ne(), s = {
    keyword: "propertyNames",
    type: "object",
    schemaType: ["object", "boolean"],
    error: {
      message: "property name must be valid",
      params: ({ params: u }) => (0, e._)`{propertyName: ${u.propertyName}}`
    },
    code(u) {
      const { gen: o, schema: r, data: f, it: n } = u;
      if ((0, t.alwaysValidSchema)(n, r))
        return;
      const i = o.name("valid");
      o.forIn("key", f, (d) => {
        u.setParams({ propertyName: d }), u.subschema({
          keyword: "propertyNames",
          data: d,
          dataTypes: ["string"],
          propertyName: d,
          compositeRule: !0
        }, i), o.if((0, e.not)(i), () => {
          u.error(!0), n.allErrors || o.break();
        });
      }), u.ok(i);
    }
  };
  return Zt.default = s, Zt;
}
var Jt = {}, zo;
function Fc() {
  if (zo) return Jt;
  zo = 1, Object.defineProperty(Jt, "__esModule", { value: !0 });
  const e = Oe(), t = te(), a = Fe(), s = ne(), o = {
    keyword: "additionalProperties",
    type: ["object"],
    schemaType: ["boolean", "object"],
    allowUndefined: !0,
    trackErrors: !0,
    error: {
      message: "must NOT have additional properties",
      params: ({ params: r }) => (0, t._)`{additionalProperty: ${r.additionalProperty}}`
    },
    code(r) {
      const { gen: f, schema: n, parentSchema: i, data: d, errsCount: E, it: g } = r;
      if (!E)
        throw new Error("ajv implementation error");
      const { allErrors: p, opts: w } = g;
      if (g.props = !0, w.removeAdditional !== "all" && (0, s.alwaysValidSchema)(g, n))
        return;
      const b = (0, e.allSchemaProperties)(i.properties), l = (0, e.allSchemaProperties)(i.patternProperties);
      h(), r.ok((0, t._)`${E} === ${a.default.errors}`);
      function h() {
        f.forIn("key", d, (_) => {
          !b.length && !l.length ? y(_) : f.if(c(_), () => y(_));
        });
      }
      function c(_) {
        let S;
        if (b.length > 8) {
          const $ = (0, s.schemaRefOrVal)(g, i.properties, "properties");
          S = (0, e.isOwnProperty)(f, $, _);
        } else b.length ? S = (0, t.or)(...b.map(($) => (0, t._)`${_} === ${$}`)) : S = t.nil;
        return l.length && (S = (0, t.or)(S, ...l.map(($) => (0, t._)`${(0, e.usePattern)(r, $)}.test(${_})`))), (0, t.not)(S);
      }
      function m(_) {
        f.code((0, t._)`delete ${d}[${_}]`);
      }
      function y(_) {
        if (w.removeAdditional === "all" || w.removeAdditional && n === !1) {
          m(_);
          return;
        }
        if (n === !1) {
          r.setParams({ additionalProperty: _ }), r.error(), p || f.break();
          return;
        }
        if (typeof n == "object" && !(0, s.alwaysValidSchema)(g, n)) {
          const S = f.name("valid");
          w.removeAdditional === "failing" ? (v(_, S, !1), f.if((0, t.not)(S), () => {
            r.reset(), m(_);
          })) : (v(_, S), p || f.if((0, t.not)(S), () => f.break()));
        }
      }
      function v(_, S, $) {
        const O = {
          keyword: "additionalProperties",
          dataProp: _,
          dataPropType: s.Type.Str
        };
        $ === !1 && Object.assign(O, {
          compositeRule: !0,
          createErrors: !1,
          allErrors: !1
        }), r.subschema(O, S);
      }
    }
  };
  return Jt.default = o, Jt;
}
var Yt = {}, Vo;
function If() {
  if (Vo) return Yt;
  Vo = 1, Object.defineProperty(Yt, "__esModule", { value: !0 });
  const e = gr(), t = Oe(), a = ne(), s = Fc(), u = {
    keyword: "properties",
    type: "object",
    schemaType: "object",
    code(o) {
      const { gen: r, schema: f, parentSchema: n, data: i, it: d } = o;
      d.opts.removeAdditional === "all" && n.additionalProperties === void 0 && s.default.code(new e.KeywordCxt(d, s.default, "additionalProperties"));
      const E = (0, t.allSchemaProperties)(f);
      for (const l of E)
        d.definedProperties.add(l);
      d.opts.unevaluated && E.length && d.props !== !0 && (d.props = a.mergeEvaluated.props(r, (0, a.toHash)(E), d.props));
      const g = E.filter((l) => !(0, a.alwaysValidSchema)(d, f[l]));
      if (g.length === 0)
        return;
      const p = r.name("valid");
      for (const l of g)
        w(l) ? b(l) : (r.if((0, t.propertyInData)(r, i, l, d.opts.ownProperties)), b(l), d.allErrors || r.else().var(p, !0), r.endIf()), o.it.definedProperties.add(l), o.ok(p);
      function w(l) {
        return d.opts.useDefaults && !d.compositeRule && f[l].default !== void 0;
      }
      function b(l) {
        o.subschema({
          keyword: "properties",
          schemaProp: l,
          dataProp: l
        }, p);
      }
    }
  };
  return Yt.default = u, Yt;
}
var Qt = {}, Go;
function Nf() {
  if (Go) return Qt;
  Go = 1, Object.defineProperty(Qt, "__esModule", { value: !0 });
  const e = Oe(), t = te(), a = ne(), s = ne(), u = {
    keyword: "patternProperties",
    type: "object",
    schemaType: "object",
    code(o) {
      const { gen: r, schema: f, data: n, parentSchema: i, it: d } = o, { opts: E } = d, g = (0, e.allSchemaProperties)(f), p = g.filter((y) => (0, a.alwaysValidSchema)(d, f[y]));
      if (g.length === 0 || p.length === g.length && (!d.opts.unevaluated || d.props === !0))
        return;
      const w = E.strictSchema && !E.allowMatchingProperties && i.properties, b = r.name("valid");
      d.props !== !0 && !(d.props instanceof t.Name) && (d.props = (0, s.evaluatedPropsToName)(r, d.props));
      const { props: l } = d;
      h();
      function h() {
        for (const y of g)
          w && c(y), d.allErrors ? m(y) : (r.var(b, !0), m(y), r.if(b));
      }
      function c(y) {
        for (const v in w)
          new RegExp(y).test(v) && (0, a.checkStrictMode)(d, `property ${v} matches pattern ${y} (use allowMatchingProperties)`);
      }
      function m(y) {
        r.forIn("key", n, (v) => {
          r.if((0, t._)`${(0, e.usePattern)(o, y)}.test(${v})`, () => {
            const _ = p.includes(y);
            _ || o.subschema({
              keyword: "patternProperties",
              schemaProp: y,
              dataProp: v,
              dataPropType: s.Type.Str
            }, b), d.opts.unevaluated && l !== !0 ? r.assign((0, t._)`${l}[${v}]`, !0) : !_ && !d.allErrors && r.if((0, t.not)(b), () => r.break());
          });
        });
      }
    }
  };
  return Qt.default = u, Qt;
}
var er = {}, Bo;
function Pf() {
  if (Bo) return er;
  Bo = 1, Object.defineProperty(er, "__esModule", { value: !0 });
  const e = ne(), t = {
    keyword: "not",
    schemaType: ["object", "boolean"],
    trackErrors: !0,
    code(a) {
      const { gen: s, schema: u, it: o } = a;
      if ((0, e.alwaysValidSchema)(o, u)) {
        a.fail();
        return;
      }
      const r = s.name("valid");
      a.subschema({
        keyword: "not",
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }, r), a.failResult(r, () => a.reset(), () => a.error());
    },
    error: { message: "must NOT be valid" }
  };
  return er.default = t, er;
}
var tr = {}, Ho;
function Tf() {
  if (Ho) return tr;
  Ho = 1, Object.defineProperty(tr, "__esModule", { value: !0 });
  const t = {
    keyword: "anyOf",
    schemaType: "array",
    trackErrors: !0,
    code: Oe().validateUnion,
    error: { message: "must match a schema in anyOf" }
  };
  return tr.default = t, tr;
}
var rr = {}, Wo;
function Cf() {
  if (Wo) return rr;
  Wo = 1, Object.defineProperty(rr, "__esModule", { value: !0 });
  const e = te(), t = ne(), s = {
    keyword: "oneOf",
    schemaType: "array",
    trackErrors: !0,
    error: {
      message: "must match exactly one schema in oneOf",
      params: ({ params: u }) => (0, e._)`{passingSchemas: ${u.passing}}`
    },
    code(u) {
      const { gen: o, schema: r, parentSchema: f, it: n } = u;
      if (!Array.isArray(r))
        throw new Error("ajv implementation error");
      if (n.opts.discriminator && f.discriminator)
        return;
      const i = r, d = o.let("valid", !1), E = o.let("passing", null), g = o.name("_valid");
      u.setParams({ passing: E }), o.block(p), u.result(d, () => u.reset(), () => u.error(!0));
      function p() {
        i.forEach((w, b) => {
          let l;
          (0, t.alwaysValidSchema)(n, w) ? o.var(g, !0) : l = u.subschema({
            keyword: "oneOf",
            schemaProp: b,
            compositeRule: !0
          }, g), b > 0 && o.if((0, e._)`${g} && ${d}`).assign(d, !1).assign(E, (0, e._)`[${E}, ${b}]`).else(), o.if(g, () => {
            o.assign(d, !0), o.assign(E, b), l && u.mergeEvaluated(l, e.Name);
          });
        });
      }
    }
  };
  return rr.default = s, rr;
}
var nr = {}, Ko;
function Df() {
  if (Ko) return nr;
  Ko = 1, Object.defineProperty(nr, "__esModule", { value: !0 });
  const e = ne(), t = {
    keyword: "allOf",
    schemaType: "array",
    code(a) {
      const { gen: s, schema: u, it: o } = a;
      if (!Array.isArray(u))
        throw new Error("ajv implementation error");
      const r = s.name("valid");
      u.forEach((f, n) => {
        if ((0, e.alwaysValidSchema)(o, f))
          return;
        const i = a.subschema({ keyword: "allOf", schemaProp: n }, r);
        a.ok(r), a.mergeEvaluated(i);
      });
    }
  };
  return nr.default = t, nr;
}
var ir = {}, Xo;
function Lf() {
  if (Xo) return ir;
  Xo = 1, Object.defineProperty(ir, "__esModule", { value: !0 });
  const e = te(), t = ne(), s = {
    keyword: "if",
    schemaType: ["object", "boolean"],
    trackErrors: !0,
    error: {
      message: ({ params: o }) => (0, e.str)`must match "${o.ifClause}" schema`,
      params: ({ params: o }) => (0, e._)`{failingKeyword: ${o.ifClause}}`
    },
    code(o) {
      const { gen: r, parentSchema: f, it: n } = o;
      f.then === void 0 && f.else === void 0 && (0, t.checkStrictMode)(n, '"if" without "then" and "else" is ignored');
      const i = u(n, "then"), d = u(n, "else");
      if (!i && !d)
        return;
      const E = r.let("valid", !0), g = r.name("_valid");
      if (p(), o.reset(), i && d) {
        const b = r.let("ifClause");
        o.setParams({ ifClause: b }), r.if(g, w("then", b), w("else", b));
      } else i ? r.if(g, w("then")) : r.if((0, e.not)(g), w("else"));
      o.pass(E, () => o.error(!0));
      function p() {
        const b = o.subschema({
          keyword: "if",
          compositeRule: !0,
          createErrors: !1,
          allErrors: !1
        }, g);
        o.mergeEvaluated(b);
      }
      function w(b, l) {
        return () => {
          const h = o.subschema({ keyword: b }, g);
          r.assign(E, g), o.mergeValidEvaluated(h, E), l ? r.assign(l, (0, e._)`${b}`) : o.setParams({ ifClause: b });
        };
      }
    }
  };
  function u(o, r) {
    const f = o.schema[r];
    return f !== void 0 && !(0, t.alwaysValidSchema)(o, f);
  }
  return ir.default = s, ir;
}
var sr = {}, Zo;
function Af() {
  if (Zo) return sr;
  Zo = 1, Object.defineProperty(sr, "__esModule", { value: !0 });
  const e = ne(), t = {
    keyword: ["then", "else"],
    schemaType: ["object", "boolean"],
    code({ keyword: a, parentSchema: s, it: u }) {
      s.if === void 0 && (0, e.checkStrictMode)(u, `"${a}" without "if" is ignored`);
    }
  };
  return sr.default = t, sr;
}
var Jo;
function Ff() {
  if (Jo) return Ht;
  Jo = 1, Object.defineProperty(Ht, "__esModule", { value: !0 });
  const e = Lc(), t = wf(), a = Ac(), s = $f(), u = bf(), o = Rf(), r = Of(), f = Fc(), n = If(), i = Nf(), d = Pf(), E = Tf(), g = Cf(), p = Df(), w = Lf(), b = Af();
  function l(h = !1) {
    const c = [
      // any
      d.default,
      E.default,
      g.default,
      p.default,
      w.default,
      b.default,
      // object
      r.default,
      f.default,
      o.default,
      n.default,
      i.default
    ];
    return h ? c.push(t.default, s.default) : c.push(e.default, a.default), c.push(u.default), c;
  }
  return Ht.default = l, Ht;
}
var or = {}, ar = {}, Yo;
function qf() {
  if (Yo) return ar;
  Yo = 1, Object.defineProperty(ar, "__esModule", { value: !0 });
  const e = te(), a = {
    keyword: "format",
    type: ["number", "string"],
    schemaType: "string",
    $data: !0,
    error: {
      message: ({ schemaCode: s }) => (0, e.str)`must match format "${s}"`,
      params: ({ schemaCode: s }) => (0, e._)`{format: ${s}}`
    },
    code(s, u) {
      const { gen: o, data: r, $data: f, schema: n, schemaCode: i, it: d } = s, { opts: E, errSchemaPath: g, schemaEnv: p, self: w } = d;
      if (!E.validateFormats)
        return;
      f ? b() : l();
      function b() {
        const h = o.scopeValue("formats", {
          ref: w.formats,
          code: E.code.formats
        }), c = o.const("fDef", (0, e._)`${h}[${i}]`), m = o.let("fType"), y = o.let("format");
        o.if((0, e._)`typeof ${c} == "object" && !(${c} instanceof RegExp)`, () => o.assign(m, (0, e._)`${c}.type || "string"`).assign(y, (0, e._)`${c}.validate`), () => o.assign(m, (0, e._)`"string"`).assign(y, c)), s.fail$data((0, e.or)(v(), _()));
        function v() {
          return E.strictSchema === !1 ? e.nil : (0, e._)`${i} && !${y}`;
        }
        function _() {
          const S = p.$async ? (0, e._)`(${c}.async ? await ${y}(${r}) : ${y}(${r}))` : (0, e._)`${y}(${r})`, $ = (0, e._)`(typeof ${y} == "function" ? ${S} : ${y}.test(${r}))`;
          return (0, e._)`${y} && ${y} !== true && ${m} === ${u} && !${$}`;
        }
      }
      function l() {
        const h = w.formats[n];
        if (!h) {
          v();
          return;
        }
        if (h === !0)
          return;
        const [c, m, y] = _(h);
        c === u && s.pass(S());
        function v() {
          if (E.strictSchema === !1) {
            w.logger.warn($());
            return;
          }
          throw new Error($());
          function $() {
            return `unknown format "${n}" ignored in schema at path "${g}"`;
          }
        }
        function _($) {
          const O = $ instanceof RegExp ? (0, e.regexpCode)($) : E.code.formats ? (0, e._)`${E.code.formats}${(0, e.getProperty)(n)}` : void 0, T = o.scopeValue("formats", { key: n, ref: $, code: O });
          return typeof $ == "object" && !($ instanceof RegExp) ? [$.type || "string", $.validate, (0, e._)`${T}.validate`] : ["string", $, T];
        }
        function S() {
          if (typeof h == "object" && !(h instanceof RegExp) && h.async) {
            if (!p.$async)
              throw new Error("async format in sync schema");
            return (0, e._)`await ${y}(${r})`;
          }
          return typeof m == "function" ? (0, e._)`${y}(${r})` : (0, e._)`${y}.test(${r})`;
        }
      }
    }
  };
  return ar.default = a, ar;
}
var Qo;
function kf() {
  if (Qo) return or;
  Qo = 1, Object.defineProperty(or, "__esModule", { value: !0 });
  const t = [qf().default];
  return or.default = t, or;
}
var xe = {}, ea;
function jf() {
  return ea || (ea = 1, Object.defineProperty(xe, "__esModule", { value: !0 }), xe.contentVocabulary = xe.metadataVocabulary = void 0, xe.metadataVocabulary = [
    "title",
    "description",
    "default",
    "deprecated",
    "readOnly",
    "writeOnly",
    "examples"
  ], xe.contentVocabulary = [
    "contentMediaType",
    "contentEncoding",
    "contentSchema"
  ]), xe;
}
var ta;
function Mf() {
  if (ta) return Tt;
  ta = 1, Object.defineProperty(Tt, "__esModule", { value: !0 });
  const e = uf(), t = Sf(), a = Ff(), s = kf(), u = jf(), o = [
    e.default,
    t.default,
    (0, a.default)(),
    s.default,
    u.metadataVocabulary,
    u.contentVocabulary
  ];
  return Tt.default = o, Tt;
}
var cr = {}, Ye = {}, ra;
function xf() {
  if (ra) return Ye;
  ra = 1, Object.defineProperty(Ye, "__esModule", { value: !0 }), Ye.DiscrError = void 0;
  var e;
  return function(t) {
    t.Tag = "tag", t.Mapping = "mapping";
  }(e || (Ye.DiscrError = e = {})), Ye;
}
var na;
function Uf() {
  if (na) return cr;
  na = 1, Object.defineProperty(cr, "__esModule", { value: !0 });
  const e = te(), t = xf(), a = Di(), s = _r(), u = ne(), r = {
    keyword: "discriminator",
    type: "object",
    schemaType: "object",
    error: {
      message: ({ params: { discrError: f, tagName: n } }) => f === t.DiscrError.Tag ? `tag "${n}" must be string` : `value of tag "${n}" must be in oneOf`,
      params: ({ params: { discrError: f, tag: n, tagName: i } }) => (0, e._)`{error: ${f}, tag: ${i}, tagValue: ${n}}`
    },
    code(f) {
      const { gen: n, data: i, schema: d, parentSchema: E, it: g } = f, { oneOf: p } = E;
      if (!g.opts.discriminator)
        throw new Error("discriminator: requires discriminator option");
      const w = d.propertyName;
      if (typeof w != "string")
        throw new Error("discriminator: requires propertyName");
      if (d.mapping)
        throw new Error("discriminator: mapping is not supported");
      if (!p)
        throw new Error("discriminator: requires oneOf keyword");
      const b = n.let("valid", !1), l = n.const("tag", (0, e._)`${i}${(0, e.getProperty)(w)}`);
      n.if((0, e._)`typeof ${l} == "string"`, () => h(), () => f.error(!1, { discrError: t.DiscrError.Tag, tag: l, tagName: w })), f.ok(b);
      function h() {
        const y = m();
        n.if(!1);
        for (const v in y)
          n.elseIf((0, e._)`${l} === ${v}`), n.assign(b, c(y[v]));
        n.else(), f.error(!1, { discrError: t.DiscrError.Mapping, tag: l, tagName: w }), n.endIf();
      }
      function c(y) {
        const v = n.name("valid"), _ = f.subschema({ keyword: "oneOf", schemaProp: y }, v);
        return f.mergeEvaluated(_, e.Name), v;
      }
      function m() {
        var y;
        const v = {}, _ = $(E);
        let S = !0;
        for (let k = 0; k < p.length; k++) {
          let H = p[k];
          if (H?.$ref && !(0, u.schemaHasRulesButRef)(H, g.self.RULES)) {
            const z = H.$ref;
            if (H = a.resolveRef.call(g.self, g.schemaEnv.root, g.baseId, z), H instanceof a.SchemaEnv && (H = H.schema), H === void 0)
              throw new s.default(g.opts.uriResolver, g.baseId, z);
          }
          const U = (y = H?.properties) === null || y === void 0 ? void 0 : y[w];
          if (typeof U != "object")
            throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${w}"`);
          S = S && (_ || $(H)), O(U, k);
        }
        if (!S)
          throw new Error(`discriminator: "${w}" must be required`);
        return v;
        function $({ required: k }) {
          return Array.isArray(k) && k.includes(w);
        }
        function O(k, H) {
          if (k.const)
            T(k.const, H);
          else if (k.enum)
            for (const U of k.enum)
              T(U, H);
          else
            throw new Error(`discriminator: "properties/${w}" must have "const" or "enum"`);
        }
        function T(k, H) {
          if (typeof k != "string" || k in v)
            throw new Error(`discriminator: "${w}" values must be unique strings`);
          v[k] = H;
        }
      }
    }
  };
  return cr.default = r, cr;
}
const zf = "http://json-schema.org/draft-07/schema#", Vf = "http://json-schema.org/draft-07/schema#", Gf = "Core schema meta-schema", Bf = { schemaArray: { type: "array", minItems: 1, items: { $ref: "#" } }, nonNegativeInteger: { type: "integer", minimum: 0 }, nonNegativeIntegerDefault0: { allOf: [{ $ref: "#/definitions/nonNegativeInteger" }, { default: 0 }] }, simpleTypes: { enum: ["array", "boolean", "integer", "null", "number", "object", "string"] }, stringArray: { type: "array", items: { type: "string" }, uniqueItems: !0, default: [] } }, Hf = ["object", "boolean"], Wf = { $id: { type: "string", format: "uri-reference" }, $schema: { type: "string", format: "uri" }, $ref: { type: "string", format: "uri-reference" }, $comment: { type: "string" }, title: { type: "string" }, description: { type: "string" }, default: !0, readOnly: { type: "boolean", default: !1 }, examples: { type: "array", items: !0 }, multipleOf: { type: "number", exclusiveMinimum: 0 }, maximum: { type: "number" }, exclusiveMaximum: { type: "number" }, minimum: { type: "number" }, exclusiveMinimum: { type: "number" }, maxLength: { $ref: "#/definitions/nonNegativeInteger" }, minLength: { $ref: "#/definitions/nonNegativeIntegerDefault0" }, pattern: { type: "string", format: "regex" }, additionalItems: { $ref: "#" }, items: { anyOf: [{ $ref: "#" }, { $ref: "#/definitions/schemaArray" }], default: !0 }, maxItems: { $ref: "#/definitions/nonNegativeInteger" }, minItems: { $ref: "#/definitions/nonNegativeIntegerDefault0" }, uniqueItems: { type: "boolean", default: !1 }, contains: { $ref: "#" }, maxProperties: { $ref: "#/definitions/nonNegativeInteger" }, minProperties: { $ref: "#/definitions/nonNegativeIntegerDefault0" }, required: { $ref: "#/definitions/stringArray" }, additionalProperties: { $ref: "#" }, definitions: { type: "object", additionalProperties: { $ref: "#" }, default: {} }, properties: { type: "object", additionalProperties: { $ref: "#" }, default: {} }, patternProperties: { type: "object", additionalProperties: { $ref: "#" }, propertyNames: { format: "regex" }, default: {} }, dependencies: { type: "object", additionalProperties: { anyOf: [{ $ref: "#" }, { $ref: "#/definitions/stringArray" }] } }, propertyNames: { $ref: "#" }, const: !0, enum: { type: "array", items: !0, minItems: 1, uniqueItems: !0 }, type: { anyOf: [{ $ref: "#/definitions/simpleTypes" }, { type: "array", items: { $ref: "#/definitions/simpleTypes" }, minItems: 1, uniqueItems: !0 }] }, format: { type: "string" }, contentMediaType: { type: "string" }, contentEncoding: { type: "string" }, if: { $ref: "#" }, then: { $ref: "#" }, else: { $ref: "#" }, allOf: { $ref: "#/definitions/schemaArray" }, anyOf: { $ref: "#/definitions/schemaArray" }, oneOf: { $ref: "#/definitions/schemaArray" }, not: { $ref: "#" } }, Kf = {
  $schema: zf,
  $id: Vf,
  title: Gf,
  definitions: Bf,
  type: Hf,
  properties: Wf,
  default: !0
};
var ia;
function qc() {
  return ia || (ia = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv = void 0;
    const a = of(), s = Mf(), u = Uf(), o = Kf, r = ["/properties"], f = "http://json-schema.org/draft-07/schema";
    class n extends a.default {
      _addVocabularies() {
        super._addVocabularies(), s.default.forEach((w) => this.addVocabulary(w)), this.opts.discriminator && this.addKeyword(u.default);
      }
      _addDefaultMetaSchema() {
        if (super._addDefaultMetaSchema(), !this.opts.meta)
          return;
        const w = this.opts.$data ? this.$dataMetaSchema(o, r) : o;
        this.addMetaSchema(w, f, !1), this.refs["http://json-schema.org/schema"] = f;
      }
      defaultMeta() {
        return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(f) ? f : void 0);
      }
    }
    t.Ajv = n, e.exports = t = n, e.exports.Ajv = n, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = n;
    var i = gr();
    Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
      return i.KeywordCxt;
    } });
    var d = te();
    Object.defineProperty(t, "_", { enumerable: !0, get: function() {
      return d._;
    } }), Object.defineProperty(t, "str", { enumerable: !0, get: function() {
      return d.str;
    } }), Object.defineProperty(t, "stringify", { enumerable: !0, get: function() {
      return d.stringify;
    } }), Object.defineProperty(t, "nil", { enumerable: !0, get: function() {
      return d.nil;
    } }), Object.defineProperty(t, "Name", { enumerable: !0, get: function() {
      return d.Name;
    } }), Object.defineProperty(t, "CodeGen", { enumerable: !0, get: function() {
      return d.CodeGen;
    } });
    var E = Ci();
    Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
      return E.default;
    } });
    var g = _r();
    Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
      return g.default;
    } });
  }(Rt, Rt.exports)), Rt.exports;
}
var ur = { exports: {} }, gn = {}, sa;
function Xf() {
  return sa || (sa = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.formatNames = e.fastFormats = e.fullFormats = void 0;
    function t(O, T) {
      return { validate: O, compare: T };
    }
    e.fullFormats = {
      // date: http://tools.ietf.org/html/rfc3339#section-5.6
      date: t(o, r),
      // date-time: http://tools.ietf.org/html/rfc3339#section-5.6
      time: t(n, i),
      "date-time": t(E, g),
      // duration: https://tools.ietf.org/html/rfc3339#appendix-A
      duration: /^P(?!$)((\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?|(\d+W)?)$/,
      uri: b,
      "uri-reference": /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i,
      // uri-template: https://tools.ietf.org/html/rfc6570
      "uri-template": /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i,
      // For the source: https://gist.github.com/dperini/729294
      // For test cases: https://mathiasbynens.be/demo/url-regex
      url: /^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)(?:\.(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu,
      email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
      hostname: /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i,
      // optimized https://www.safaribooksonline.com/library/view/regular-expressions-cookbook/9780596802837/ch07s16.html
      ipv4: /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/,
      ipv6: /^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i,
      regex: $,
      // uuid: http://tools.ietf.org/html/rfc4122
      uuid: /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i,
      // JSON-pointer: https://tools.ietf.org/html/rfc6901
      // uri fragment: https://tools.ietf.org/html/rfc3986#appendix-A
      "json-pointer": /^(?:\/(?:[^~/]|~0|~1)*)*$/,
      "json-pointer-uri-fragment": /^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i,
      // relative JSON-pointer: http://tools.ietf.org/html/draft-luff-relative-json-pointer-00
      "relative-json-pointer": /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/,
      // the following formats are used by the openapi specification: https://spec.openapis.org/oas/v3.0.0#data-types
      // byte: https://github.com/miguelmota/is-base64
      byte: h,
      // signed 32 bit integer
      int32: { type: "number", validate: y },
      // signed 64 bit integer
      int64: { type: "number", validate: v },
      // C-type float
      float: { type: "number", validate: _ },
      // C-type double
      double: { type: "number", validate: _ },
      // hint to the UI to hide input strings
      password: !0,
      // unchecked string payload
      binary: !0
    }, e.fastFormats = {
      ...e.fullFormats,
      date: t(/^\d\d\d\d-[0-1]\d-[0-3]\d$/, r),
      time: t(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, i),
      "date-time": t(/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, g),
      // uri: https://github.com/mafintosh/is-my-json-valid/blob/master/formats.js
      uri: /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/)?[^\s]*$/i,
      "uri-reference": /^(?:(?:[a-z][a-z0-9+\-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i,
      // email (sources from jsen validator):
      // http://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address#answer-8829363
      // http://www.w3.org/TR/html5/forms.html#valid-e-mail-address (search for 'wilful violation')
      email: /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i
    }, e.formatNames = Object.keys(e.fullFormats);
    function a(O) {
      return O % 4 === 0 && (O % 100 !== 0 || O % 400 === 0);
    }
    const s = /^(\d\d\d\d)-(\d\d)-(\d\d)$/, u = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    function o(O) {
      const T = s.exec(O);
      if (!T)
        return !1;
      const k = +T[1], H = +T[2], U = +T[3];
      return H >= 1 && H <= 12 && U >= 1 && U <= (H === 2 && a(k) ? 29 : u[H]);
    }
    function r(O, T) {
      if (O && T)
        return O > T ? 1 : O < T ? -1 : 0;
    }
    const f = /^(\d\d):(\d\d):(\d\d)(\.\d+)?(z|[+-]\d\d(?::?\d\d)?)?$/i;
    function n(O, T) {
      const k = f.exec(O);
      if (!k)
        return !1;
      const H = +k[1], U = +k[2], z = +k[3], V = k[5];
      return (H <= 23 && U <= 59 && z <= 59 || H === 23 && U === 59 && z === 60) && (!T || V !== "");
    }
    function i(O, T) {
      if (!(O && T))
        return;
      const k = f.exec(O), H = f.exec(T);
      if (k && H)
        return O = k[1] + k[2] + k[3] + (k[4] || ""), T = H[1] + H[2] + H[3] + (H[4] || ""), O > T ? 1 : O < T ? -1 : 0;
    }
    const d = /t|\s/i;
    function E(O) {
      const T = O.split(d);
      return T.length === 2 && o(T[0]) && n(T[1], !0);
    }
    function g(O, T) {
      if (!(O && T))
        return;
      const [k, H] = O.split(d), [U, z] = T.split(d), V = r(k, U);
      if (V !== void 0)
        return V || i(H, z);
    }
    const p = /\/|:/, w = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
    function b(O) {
      return p.test(O) && w.test(O);
    }
    const l = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
    function h(O) {
      return l.lastIndex = 0, l.test(O);
    }
    const c = -(2 ** 31), m = 2 ** 31 - 1;
    function y(O) {
      return Number.isInteger(O) && O <= m && O >= c;
    }
    function v(O) {
      return Number.isInteger(O);
    }
    function _() {
      return !0;
    }
    const S = /[^\\]\\Z/;
    function $(O) {
      if (S.test(O))
        return !1;
      try {
        return new RegExp(O), !0;
      } catch {
        return !1;
      }
    }
  }(gn)), gn;
}
var _n = {}, oa;
function Zf() {
  return oa || (oa = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.formatLimitDefinition = void 0;
    const t = qc(), a = te(), s = a.operators, u = {
      formatMaximum: { okStr: "<=", ok: s.LTE, fail: s.GT },
      formatMinimum: { okStr: ">=", ok: s.GTE, fail: s.LT },
      formatExclusiveMaximum: { okStr: "<", ok: s.LT, fail: s.GTE },
      formatExclusiveMinimum: { okStr: ">", ok: s.GT, fail: s.LTE }
    }, o = {
      message: ({ keyword: f, schemaCode: n }) => a.str`should be ${u[f].okStr} ${n}`,
      params: ({ keyword: f, schemaCode: n }) => a._`{comparison: ${u[f].okStr}, limit: ${n}}`
    };
    e.formatLimitDefinition = {
      keyword: Object.keys(u),
      type: "string",
      schemaType: "string",
      $data: !0,
      error: o,
      code(f) {
        const { gen: n, data: i, schemaCode: d, keyword: E, it: g } = f, { opts: p, self: w } = g;
        if (!p.validateFormats)
          return;
        const b = new t.KeywordCxt(g, w.RULES.all.format.definition, "format");
        b.$data ? l() : h();
        function l() {
          const m = n.scopeValue("formats", {
            ref: w.formats,
            code: p.code.formats
          }), y = n.const("fmt", a._`${m}[${b.schemaCode}]`);
          f.fail$data(a.or(a._`typeof ${y} != "object"`, a._`${y} instanceof RegExp`, a._`typeof ${y}.compare != "function"`, c(y)));
        }
        function h() {
          const m = b.schema, y = w.formats[m];
          if (!y || y === !0)
            return;
          if (typeof y != "object" || y instanceof RegExp || typeof y.compare != "function")
            throw new Error(`"${E}": format "${m}" does not define "compare" function`);
          const v = n.scopeValue("formats", {
            key: m,
            ref: y,
            code: p.code.formats ? a._`${p.code.formats}${a.getProperty(m)}` : void 0
          });
          f.fail$data(c(v));
        }
        function c(m) {
          return a._`${m}.compare(${i}, ${d}) ${u[E].fail} 0`;
        }
      },
      dependencies: ["format"]
    };
    const r = (f) => (f.addKeyword(e.formatLimitDefinition), f);
    e.default = r;
  }(_n)), _n;
}
var aa;
function Jf() {
  return aa || (aa = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", { value: !0 });
    const a = Xf(), s = Zf(), u = te(), o = new u.Name("fullFormats"), r = new u.Name("fastFormats"), f = (i, d = { keywords: !0 }) => {
      if (Array.isArray(d))
        return n(i, d, a.fullFormats, o), i;
      const [E, g] = d.mode === "fast" ? [a.fastFormats, r] : [a.fullFormats, o], p = d.formats || a.formatNames;
      return n(i, p, E, g), d.keywords && s.default(i), i;
    };
    f.get = (i, d = "full") => {
      const g = (d === "fast" ? a.fastFormats : a.fullFormats)[i];
      if (!g)
        throw new Error(`Unknown format "${i}"`);
      return g;
    };
    function n(i, d, E, g) {
      var p, w;
      (p = (w = i.opts.code).formats) !== null && p !== void 0 || (w.formats = u._`require("ajv-formats/dist/formats").${g}`);
      for (const b of d)
        i.addFormat(b, E[b]);
    }
    e.exports = t = f, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = f;
  }(ur, ur.exports)), ur.exports;
}
var Sn, ca;
function Yf() {
  if (ca) return Sn;
  ca = 1;
  const e = (n, i, d, E) => {
    if (d === "length" || d === "prototype" || d === "arguments" || d === "caller")
      return;
    const g = Object.getOwnPropertyDescriptor(n, d), p = Object.getOwnPropertyDescriptor(i, d);
    !t(g, p) && E || Object.defineProperty(n, d, p);
  }, t = function(n, i) {
    return n === void 0 || n.configurable || n.writable === i.writable && n.enumerable === i.enumerable && n.configurable === i.configurable && (n.writable || n.value === i.value);
  }, a = (n, i) => {
    const d = Object.getPrototypeOf(i);
    d !== Object.getPrototypeOf(n) && Object.setPrototypeOf(n, d);
  }, s = (n, i) => `/* Wrapped ${n}*/
${i}`, u = Object.getOwnPropertyDescriptor(Function.prototype, "toString"), o = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name"), r = (n, i, d) => {
    const E = d === "" ? "" : `with ${d.trim()}() `, g = s.bind(null, E, i.toString());
    Object.defineProperty(g, "name", o), Object.defineProperty(n, "toString", { ...u, value: g });
  };
  return Sn = (n, i, { ignoreNonConfigurable: d = !1 } = {}) => {
    const { name: E } = n;
    for (const g of Reflect.ownKeys(i))
      e(n, i, g, d);
    return a(n, i), r(n, i, E), n;
  }, Sn;
}
var wn, ua;
function Qf() {
  if (ua) return wn;
  ua = 1;
  const e = Yf();
  return wn = (t, a = {}) => {
    if (typeof t != "function")
      throw new TypeError(`Expected the first argument to be a function, got \`${typeof t}\``);
    const {
      wait: s = 0,
      before: u = !1,
      after: o = !0
    } = a;
    if (!u && !o)
      throw new Error("Both `before` and `after` are false, function wouldn't be called.");
    let r, f;
    const n = function(...i) {
      const d = this, E = () => {
        r = void 0, o && (f = t.apply(d, i));
      }, g = u && !r;
      return clearTimeout(r), r = setTimeout(E, s), g && (f = t.apply(d, i)), f;
    };
    return e(n, t), n.cancel = () => {
      r && (clearTimeout(r), r = void 0);
    }, n;
  }, wn;
}
var fr = { exports: {} }, $n, fa;
function Sr() {
  if (fa) return $n;
  fa = 1;
  const e = "2.0.0", t = 256, a = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
  9007199254740991, s = 16, u = t - 6;
  return $n = {
    MAX_LENGTH: t,
    MAX_SAFE_COMPONENT_LENGTH: s,
    MAX_SAFE_BUILD_LENGTH: u,
    MAX_SAFE_INTEGER: a,
    RELEASE_TYPES: [
      "major",
      "premajor",
      "minor",
      "preminor",
      "patch",
      "prepatch",
      "prerelease"
    ],
    SEMVER_SPEC_VERSION: e,
    FLAG_INCLUDE_PRERELEASE: 1,
    FLAG_LOOSE: 2
  }, $n;
}
var bn, la;
function wr() {
  return la || (la = 1, bn = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...t) => console.error("SEMVER", ...t) : () => {
  }), bn;
}
var da;
function ot() {
  return da || (da = 1, function(e, t) {
    const {
      MAX_SAFE_COMPONENT_LENGTH: a,
      MAX_SAFE_BUILD_LENGTH: s,
      MAX_LENGTH: u
    } = Sr(), o = wr();
    t = e.exports = {};
    const r = t.re = [], f = t.safeRe = [], n = t.src = [], i = t.t = {};
    let d = 0;
    const E = "[a-zA-Z0-9-]", g = [
      ["\\s", 1],
      ["\\d", u],
      [E, s]
    ], p = (b) => {
      for (const [l, h] of g)
        b = b.split(`${l}*`).join(`${l}{0,${h}}`).split(`${l}+`).join(`${l}{1,${h}}`);
      return b;
    }, w = (b, l, h) => {
      const c = p(l), m = d++;
      o(b, m, l), i[b] = m, n[m] = l, r[m] = new RegExp(l, h ? "g" : void 0), f[m] = new RegExp(c, h ? "g" : void 0);
    };
    w("NUMERICIDENTIFIER", "0|[1-9]\\d*"), w("NUMERICIDENTIFIERLOOSE", "\\d+"), w("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${E}*`), w("MAINVERSION", `(${n[i.NUMERICIDENTIFIER]})\\.(${n[i.NUMERICIDENTIFIER]})\\.(${n[i.NUMERICIDENTIFIER]})`), w("MAINVERSIONLOOSE", `(${n[i.NUMERICIDENTIFIERLOOSE]})\\.(${n[i.NUMERICIDENTIFIERLOOSE]})\\.(${n[i.NUMERICIDENTIFIERLOOSE]})`), w("PRERELEASEIDENTIFIER", `(?:${n[i.NUMERICIDENTIFIER]}|${n[i.NONNUMERICIDENTIFIER]})`), w("PRERELEASEIDENTIFIERLOOSE", `(?:${n[i.NUMERICIDENTIFIERLOOSE]}|${n[i.NONNUMERICIDENTIFIER]})`), w("PRERELEASE", `(?:-(${n[i.PRERELEASEIDENTIFIER]}(?:\\.${n[i.PRERELEASEIDENTIFIER]})*))`), w("PRERELEASELOOSE", `(?:-?(${n[i.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${n[i.PRERELEASEIDENTIFIERLOOSE]})*))`), w("BUILDIDENTIFIER", `${E}+`), w("BUILD", `(?:\\+(${n[i.BUILDIDENTIFIER]}(?:\\.${n[i.BUILDIDENTIFIER]})*))`), w("FULLPLAIN", `v?${n[i.MAINVERSION]}${n[i.PRERELEASE]}?${n[i.BUILD]}?`), w("FULL", `^${n[i.FULLPLAIN]}$`), w("LOOSEPLAIN", `[v=\\s]*${n[i.MAINVERSIONLOOSE]}${n[i.PRERELEASELOOSE]}?${n[i.BUILD]}?`), w("LOOSE", `^${n[i.LOOSEPLAIN]}$`), w("GTLT", "((?:<|>)?=?)"), w("XRANGEIDENTIFIERLOOSE", `${n[i.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), w("XRANGEIDENTIFIER", `${n[i.NUMERICIDENTIFIER]}|x|X|\\*`), w("XRANGEPLAIN", `[v=\\s]*(${n[i.XRANGEIDENTIFIER]})(?:\\.(${n[i.XRANGEIDENTIFIER]})(?:\\.(${n[i.XRANGEIDENTIFIER]})(?:${n[i.PRERELEASE]})?${n[i.BUILD]}?)?)?`), w("XRANGEPLAINLOOSE", `[v=\\s]*(${n[i.XRANGEIDENTIFIERLOOSE]})(?:\\.(${n[i.XRANGEIDENTIFIERLOOSE]})(?:\\.(${n[i.XRANGEIDENTIFIERLOOSE]})(?:${n[i.PRERELEASELOOSE]})?${n[i.BUILD]}?)?)?`), w("XRANGE", `^${n[i.GTLT]}\\s*${n[i.XRANGEPLAIN]}$`), w("XRANGELOOSE", `^${n[i.GTLT]}\\s*${n[i.XRANGEPLAINLOOSE]}$`), w("COERCEPLAIN", `(^|[^\\d])(\\d{1,${a}})(?:\\.(\\d{1,${a}}))?(?:\\.(\\d{1,${a}}))?`), w("COERCE", `${n[i.COERCEPLAIN]}(?:$|[^\\d])`), w("COERCEFULL", n[i.COERCEPLAIN] + `(?:${n[i.PRERELEASE]})?(?:${n[i.BUILD]})?(?:$|[^\\d])`), w("COERCERTL", n[i.COERCE], !0), w("COERCERTLFULL", n[i.COERCEFULL], !0), w("LONETILDE", "(?:~>?)"), w("TILDETRIM", `(\\s*)${n[i.LONETILDE]}\\s+`, !0), t.tildeTrimReplace = "$1~", w("TILDE", `^${n[i.LONETILDE]}${n[i.XRANGEPLAIN]}$`), w("TILDELOOSE", `^${n[i.LONETILDE]}${n[i.XRANGEPLAINLOOSE]}$`), w("LONECARET", "(?:\\^)"), w("CARETTRIM", `(\\s*)${n[i.LONECARET]}\\s+`, !0), t.caretTrimReplace = "$1^", w("CARET", `^${n[i.LONECARET]}${n[i.XRANGEPLAIN]}$`), w("CARETLOOSE", `^${n[i.LONECARET]}${n[i.XRANGEPLAINLOOSE]}$`), w("COMPARATORLOOSE", `^${n[i.GTLT]}\\s*(${n[i.LOOSEPLAIN]})$|^$`), w("COMPARATOR", `^${n[i.GTLT]}\\s*(${n[i.FULLPLAIN]})$|^$`), w("COMPARATORTRIM", `(\\s*)${n[i.GTLT]}\\s*(${n[i.LOOSEPLAIN]}|${n[i.XRANGEPLAIN]})`, !0), t.comparatorTrimReplace = "$1$2$3", w("HYPHENRANGE", `^\\s*(${n[i.XRANGEPLAIN]})\\s+-\\s+(${n[i.XRANGEPLAIN]})\\s*$`), w("HYPHENRANGELOOSE", `^\\s*(${n[i.XRANGEPLAINLOOSE]})\\s+-\\s+(${n[i.XRANGEPLAINLOOSE]})\\s*$`), w("STAR", "(<|>)?=?\\s*\\*"), w("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), w("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
  }(fr, fr.exports)), fr.exports;
}
var Rn, ha;
function Ai() {
  if (ha) return Rn;
  ha = 1;
  const e = Object.freeze({ loose: !0 }), t = Object.freeze({});
  return Rn = (s) => s ? typeof s != "object" ? e : s : t, Rn;
}
var On, ma;
function kc() {
  if (ma) return On;
  ma = 1;
  const e = /^[0-9]+$/, t = (s, u) => {
    const o = e.test(s), r = e.test(u);
    return o && r && (s = +s, u = +u), s === u ? 0 : o && !r ? -1 : r && !o ? 1 : s < u ? -1 : 1;
  };
  return On = {
    compareIdentifiers: t,
    rcompareIdentifiers: (s, u) => t(u, s)
  }, On;
}
var In, pa;
function Ee() {
  if (pa) return In;
  pa = 1;
  const e = wr(), { MAX_LENGTH: t, MAX_SAFE_INTEGER: a } = Sr(), { safeRe: s, t: u } = ot(), o = Ai(), { compareIdentifiers: r } = kc();
  class f {
    constructor(i, d) {
      if (d = o(d), i instanceof f) {
        if (i.loose === !!d.loose && i.includePrerelease === !!d.includePrerelease)
          return i;
        i = i.version;
      } else if (typeof i != "string")
        throw new TypeError(`Invalid version. Must be a string. Got type "${typeof i}".`);
      if (i.length > t)
        throw new TypeError(
          `version is longer than ${t} characters`
        );
      e("SemVer", i, d), this.options = d, this.loose = !!d.loose, this.includePrerelease = !!d.includePrerelease;
      const E = i.trim().match(d.loose ? s[u.LOOSE] : s[u.FULL]);
      if (!E)
        throw new TypeError(`Invalid Version: ${i}`);
      if (this.raw = i, this.major = +E[1], this.minor = +E[2], this.patch = +E[3], this.major > a || this.major < 0)
        throw new TypeError("Invalid major version");
      if (this.minor > a || this.minor < 0)
        throw new TypeError("Invalid minor version");
      if (this.patch > a || this.patch < 0)
        throw new TypeError("Invalid patch version");
      E[4] ? this.prerelease = E[4].split(".").map((g) => {
        if (/^[0-9]+$/.test(g)) {
          const p = +g;
          if (p >= 0 && p < a)
            return p;
        }
        return g;
      }) : this.prerelease = [], this.build = E[5] ? E[5].split(".") : [], this.format();
    }
    format() {
      return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
    }
    toString() {
      return this.version;
    }
    compare(i) {
      if (e("SemVer.compare", this.version, this.options, i), !(i instanceof f)) {
        if (typeof i == "string" && i === this.version)
          return 0;
        i = new f(i, this.options);
      }
      return i.version === this.version ? 0 : this.compareMain(i) || this.comparePre(i);
    }
    compareMain(i) {
      return i instanceof f || (i = new f(i, this.options)), r(this.major, i.major) || r(this.minor, i.minor) || r(this.patch, i.patch);
    }
    comparePre(i) {
      if (i instanceof f || (i = new f(i, this.options)), this.prerelease.length && !i.prerelease.length)
        return -1;
      if (!this.prerelease.length && i.prerelease.length)
        return 1;
      if (!this.prerelease.length && !i.prerelease.length)
        return 0;
      let d = 0;
      do {
        const E = this.prerelease[d], g = i.prerelease[d];
        if (e("prerelease compare", d, E, g), E === void 0 && g === void 0)
          return 0;
        if (g === void 0)
          return 1;
        if (E === void 0)
          return -1;
        if (E === g)
          continue;
        return r(E, g);
      } while (++d);
    }
    compareBuild(i) {
      i instanceof f || (i = new f(i, this.options));
      let d = 0;
      do {
        const E = this.build[d], g = i.build[d];
        if (e("build compare", d, E, g), E === void 0 && g === void 0)
          return 0;
        if (g === void 0)
          return 1;
        if (E === void 0)
          return -1;
        if (E === g)
          continue;
        return r(E, g);
      } while (++d);
    }
    // preminor will bump the version up to the next minor release, and immediately
    // down to pre-release. premajor and prepatch work the same way.
    inc(i, d, E) {
      switch (i) {
        case "premajor":
          this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", d, E);
          break;
        case "preminor":
          this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", d, E);
          break;
        case "prepatch":
          this.prerelease.length = 0, this.inc("patch", d, E), this.inc("pre", d, E);
          break;
        // If the input is a non-prerelease version, this acts the same as
        // prepatch.
        case "prerelease":
          this.prerelease.length === 0 && this.inc("patch", d, E), this.inc("pre", d, E);
          break;
        case "major":
          (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) && this.major++, this.minor = 0, this.patch = 0, this.prerelease = [];
          break;
        case "minor":
          (this.patch !== 0 || this.prerelease.length === 0) && this.minor++, this.patch = 0, this.prerelease = [];
          break;
        case "patch":
          this.prerelease.length === 0 && this.patch++, this.prerelease = [];
          break;
        // This probably shouldn't be used publicly.
        // 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.
        case "pre": {
          const g = Number(E) ? 1 : 0;
          if (!d && E === !1)
            throw new Error("invalid increment argument: identifier is empty");
          if (this.prerelease.length === 0)
            this.prerelease = [g];
          else {
            let p = this.prerelease.length;
            for (; --p >= 0; )
              typeof this.prerelease[p] == "number" && (this.prerelease[p]++, p = -2);
            if (p === -1) {
              if (d === this.prerelease.join(".") && E === !1)
                throw new Error("invalid increment argument: identifier already exists");
              this.prerelease.push(g);
            }
          }
          if (d) {
            let p = [d, g];
            E === !1 && (p = [d]), r(this.prerelease[0], d) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = p) : this.prerelease = p;
          }
          break;
        }
        default:
          throw new Error(`invalid increment argument: ${i}`);
      }
      return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
    }
  }
  return In = f, In;
}
var Nn, ya;
function We() {
  if (ya) return Nn;
  ya = 1;
  const e = Ee();
  return Nn = (a, s, u = !1) => {
    if (a instanceof e)
      return a;
    try {
      return new e(a, s);
    } catch (o) {
      if (!u)
        return null;
      throw o;
    }
  }, Nn;
}
var Pn, va;
function el() {
  if (va) return Pn;
  va = 1;
  const e = We();
  return Pn = (a, s) => {
    const u = e(a, s);
    return u ? u.version : null;
  }, Pn;
}
var Tn, Ea;
function tl() {
  if (Ea) return Tn;
  Ea = 1;
  const e = We();
  return Tn = (a, s) => {
    const u = e(a.trim().replace(/^[=v]+/, ""), s);
    return u ? u.version : null;
  }, Tn;
}
var Cn, ga;
function rl() {
  if (ga) return Cn;
  ga = 1;
  const e = Ee();
  return Cn = (a, s, u, o, r) => {
    typeof u == "string" && (r = o, o = u, u = void 0);
    try {
      return new e(
        a instanceof e ? a.version : a,
        u
      ).inc(s, o, r).version;
    } catch {
      return null;
    }
  }, Cn;
}
var Dn, _a;
function nl() {
  if (_a) return Dn;
  _a = 1;
  const e = We();
  return Dn = (a, s) => {
    const u = e(a, null, !0), o = e(s, null, !0), r = u.compare(o);
    if (r === 0)
      return null;
    const f = r > 0, n = f ? u : o, i = f ? o : u, d = !!n.prerelease.length;
    if (!!i.prerelease.length && !d)
      return !i.patch && !i.minor ? "major" : n.patch ? "patch" : n.minor ? "minor" : "major";
    const g = d ? "pre" : "";
    return u.major !== o.major ? g + "major" : u.minor !== o.minor ? g + "minor" : u.patch !== o.patch ? g + "patch" : "prerelease";
  }, Dn;
}
var Ln, Sa;
function il() {
  if (Sa) return Ln;
  Sa = 1;
  const e = Ee();
  return Ln = (a, s) => new e(a, s).major, Ln;
}
var An, wa;
function sl() {
  if (wa) return An;
  wa = 1;
  const e = Ee();
  return An = (a, s) => new e(a, s).minor, An;
}
var Fn, $a;
function ol() {
  if ($a) return Fn;
  $a = 1;
  const e = Ee();
  return Fn = (a, s) => new e(a, s).patch, Fn;
}
var qn, ba;
function al() {
  if (ba) return qn;
  ba = 1;
  const e = We();
  return qn = (a, s) => {
    const u = e(a, s);
    return u && u.prerelease.length ? u.prerelease : null;
  }, qn;
}
var kn, Ra;
function Ie() {
  if (Ra) return kn;
  Ra = 1;
  const e = Ee();
  return kn = (a, s, u) => new e(a, u).compare(new e(s, u)), kn;
}
var jn, Oa;
function cl() {
  if (Oa) return jn;
  Oa = 1;
  const e = Ie();
  return jn = (a, s, u) => e(s, a, u), jn;
}
var Mn, Ia;
function ul() {
  if (Ia) return Mn;
  Ia = 1;
  const e = Ie();
  return Mn = (a, s) => e(a, s, !0), Mn;
}
var xn, Na;
function Fi() {
  if (Na) return xn;
  Na = 1;
  const e = Ee();
  return xn = (a, s, u) => {
    const o = new e(a, u), r = new e(s, u);
    return o.compare(r) || o.compareBuild(r);
  }, xn;
}
var Un, Pa;
function fl() {
  if (Pa) return Un;
  Pa = 1;
  const e = Fi();
  return Un = (a, s) => a.sort((u, o) => e(u, o, s)), Un;
}
var zn, Ta;
function ll() {
  if (Ta) return zn;
  Ta = 1;
  const e = Fi();
  return zn = (a, s) => a.sort((u, o) => e(o, u, s)), zn;
}
var Vn, Ca;
function $r() {
  if (Ca) return Vn;
  Ca = 1;
  const e = Ie();
  return Vn = (a, s, u) => e(a, s, u) > 0, Vn;
}
var Gn, Da;
function qi() {
  if (Da) return Gn;
  Da = 1;
  const e = Ie();
  return Gn = (a, s, u) => e(a, s, u) < 0, Gn;
}
var Bn, La;
function jc() {
  if (La) return Bn;
  La = 1;
  const e = Ie();
  return Bn = (a, s, u) => e(a, s, u) === 0, Bn;
}
var Hn, Aa;
function Mc() {
  if (Aa) return Hn;
  Aa = 1;
  const e = Ie();
  return Hn = (a, s, u) => e(a, s, u) !== 0, Hn;
}
var Wn, Fa;
function ki() {
  if (Fa) return Wn;
  Fa = 1;
  const e = Ie();
  return Wn = (a, s, u) => e(a, s, u) >= 0, Wn;
}
var Kn, qa;
function ji() {
  if (qa) return Kn;
  qa = 1;
  const e = Ie();
  return Kn = (a, s, u) => e(a, s, u) <= 0, Kn;
}
var Xn, ka;
function xc() {
  if (ka) return Xn;
  ka = 1;
  const e = jc(), t = Mc(), a = $r(), s = ki(), u = qi(), o = ji();
  return Xn = (f, n, i, d) => {
    switch (n) {
      case "===":
        return typeof f == "object" && (f = f.version), typeof i == "object" && (i = i.version), f === i;
      case "!==":
        return typeof f == "object" && (f = f.version), typeof i == "object" && (i = i.version), f !== i;
      case "":
      case "=":
      case "==":
        return e(f, i, d);
      case "!=":
        return t(f, i, d);
      case ">":
        return a(f, i, d);
      case ">=":
        return s(f, i, d);
      case "<":
        return u(f, i, d);
      case "<=":
        return o(f, i, d);
      default:
        throw new TypeError(`Invalid operator: ${n}`);
    }
  }, Xn;
}
var Zn, ja;
function dl() {
  if (ja) return Zn;
  ja = 1;
  const e = Ee(), t = We(), { safeRe: a, t: s } = ot();
  return Zn = (o, r) => {
    if (o instanceof e)
      return o;
    if (typeof o == "number" && (o = String(o)), typeof o != "string")
      return null;
    r = r || {};
    let f = null;
    if (!r.rtl)
      f = o.match(r.includePrerelease ? a[s.COERCEFULL] : a[s.COERCE]);
    else {
      const p = r.includePrerelease ? a[s.COERCERTLFULL] : a[s.COERCERTL];
      let w;
      for (; (w = p.exec(o)) && (!f || f.index + f[0].length !== o.length); )
        (!f || w.index + w[0].length !== f.index + f[0].length) && (f = w), p.lastIndex = w.index + w[1].length + w[2].length;
      p.lastIndex = -1;
    }
    if (f === null)
      return null;
    const n = f[2], i = f[3] || "0", d = f[4] || "0", E = r.includePrerelease && f[5] ? `-${f[5]}` : "", g = r.includePrerelease && f[6] ? `+${f[6]}` : "";
    return t(`${n}.${i}.${d}${E}${g}`, r);
  }, Zn;
}
var Jn, Ma;
function hl() {
  if (Ma) return Jn;
  Ma = 1;
  class e {
    constructor() {
      this.max = 1e3, this.map = /* @__PURE__ */ new Map();
    }
    get(a) {
      const s = this.map.get(a);
      if (s !== void 0)
        return this.map.delete(a), this.map.set(a, s), s;
    }
    delete(a) {
      return this.map.delete(a);
    }
    set(a, s) {
      if (!this.delete(a) && s !== void 0) {
        if (this.map.size >= this.max) {
          const o = this.map.keys().next().value;
          this.delete(o);
        }
        this.map.set(a, s);
      }
      return this;
    }
  }
  return Jn = e, Jn;
}
var Yn, xa;
function Ne() {
  if (xa) return Yn;
  xa = 1;
  const e = /\s+/g;
  class t {
    constructor(V, Z) {
      if (Z = u(Z), V instanceof t)
        return V.loose === !!Z.loose && V.includePrerelease === !!Z.includePrerelease ? V : new t(V.raw, Z);
      if (V instanceof o)
        return this.raw = V.value, this.set = [[V]], this.formatted = void 0, this;
      if (this.options = Z, this.loose = !!Z.loose, this.includePrerelease = !!Z.includePrerelease, this.raw = V.trim().replace(e, " "), this.set = this.raw.split("||").map((B) => this.parseRange(B.trim())).filter((B) => B.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const B = this.set[0];
        if (this.set = this.set.filter((A) => !b(A[0])), this.set.length === 0)
          this.set = [B];
        else if (this.set.length > 1) {
          for (const A of this.set)
            if (A.length === 1 && l(A[0])) {
              this.set = [A];
              break;
            }
        }
      }
      this.formatted = void 0;
    }
    get range() {
      if (this.formatted === void 0) {
        this.formatted = "";
        for (let V = 0; V < this.set.length; V++) {
          V > 0 && (this.formatted += "||");
          const Z = this.set[V];
          for (let B = 0; B < Z.length; B++)
            B > 0 && (this.formatted += " "), this.formatted += Z[B].toString().trim();
        }
      }
      return this.formatted;
    }
    format() {
      return this.range;
    }
    toString() {
      return this.range;
    }
    parseRange(V) {
      const B = ((this.options.includePrerelease && p) | (this.options.loose && w)) + ":" + V, A = s.get(B);
      if (A)
        return A;
      const x = this.options.loose, D = x ? n[i.HYPHENRANGELOOSE] : n[i.HYPHENRANGE];
      V = V.replace(D, H(this.options.includePrerelease)), r("hyphen replace", V), V = V.replace(n[i.COMPARATORTRIM], d), r("comparator trim", V), V = V.replace(n[i.TILDETRIM], E), r("tilde trim", V), V = V.replace(n[i.CARETTRIM], g), r("caret trim", V);
      let C = V.split(" ").map((N) => c(N, this.options)).join(" ").split(/\s+/).map((N) => k(N, this.options));
      x && (C = C.filter((N) => (r("loose invalid filter", N, this.options), !!N.match(n[i.COMPARATORLOOSE])))), r("range list", C);
      const j = /* @__PURE__ */ new Map(), L = C.map((N) => new o(N, this.options));
      for (const N of L) {
        if (b(N))
          return [N];
        j.set(N.value, N);
      }
      j.size > 1 && j.has("") && j.delete("");
      const R = [...j.values()];
      return s.set(B, R), R;
    }
    intersects(V, Z) {
      if (!(V instanceof t))
        throw new TypeError("a Range is required");
      return this.set.some((B) => h(B, Z) && V.set.some((A) => h(A, Z) && B.every((x) => A.every((D) => x.intersects(D, Z)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(V) {
      if (!V)
        return !1;
      if (typeof V == "string")
        try {
          V = new f(V, this.options);
        } catch {
          return !1;
        }
      for (let Z = 0; Z < this.set.length; Z++)
        if (U(this.set[Z], V, this.options))
          return !0;
      return !1;
    }
  }
  Yn = t;
  const a = hl(), s = new a(), u = Ai(), o = br(), r = wr(), f = Ee(), {
    safeRe: n,
    t: i,
    comparatorTrimReplace: d,
    tildeTrimReplace: E,
    caretTrimReplace: g
  } = ot(), { FLAG_INCLUDE_PRERELEASE: p, FLAG_LOOSE: w } = Sr(), b = (z) => z.value === "<0.0.0-0", l = (z) => z.value === "", h = (z, V) => {
    let Z = !0;
    const B = z.slice();
    let A = B.pop();
    for (; Z && B.length; )
      Z = B.every((x) => A.intersects(x, V)), A = B.pop();
    return Z;
  }, c = (z, V) => (r("comp", z, V), z = _(z, V), r("caret", z), z = y(z, V), r("tildes", z), z = $(z, V), r("xrange", z), z = T(z, V), r("stars", z), z), m = (z) => !z || z.toLowerCase() === "x" || z === "*", y = (z, V) => z.trim().split(/\s+/).map((Z) => v(Z, V)).join(" "), v = (z, V) => {
    const Z = V.loose ? n[i.TILDELOOSE] : n[i.TILDE];
    return z.replace(Z, (B, A, x, D, C) => {
      r("tilde", z, B, A, x, D, C);
      let j;
      return m(A) ? j = "" : m(x) ? j = `>=${A}.0.0 <${+A + 1}.0.0-0` : m(D) ? j = `>=${A}.${x}.0 <${A}.${+x + 1}.0-0` : C ? (r("replaceTilde pr", C), j = `>=${A}.${x}.${D}-${C} <${A}.${+x + 1}.0-0`) : j = `>=${A}.${x}.${D} <${A}.${+x + 1}.0-0`, r("tilde return", j), j;
    });
  }, _ = (z, V) => z.trim().split(/\s+/).map((Z) => S(Z, V)).join(" "), S = (z, V) => {
    r("caret", z, V);
    const Z = V.loose ? n[i.CARETLOOSE] : n[i.CARET], B = V.includePrerelease ? "-0" : "";
    return z.replace(Z, (A, x, D, C, j) => {
      r("caret", z, A, x, D, C, j);
      let L;
      return m(x) ? L = "" : m(D) ? L = `>=${x}.0.0${B} <${+x + 1}.0.0-0` : m(C) ? x === "0" ? L = `>=${x}.${D}.0${B} <${x}.${+D + 1}.0-0` : L = `>=${x}.${D}.0${B} <${+x + 1}.0.0-0` : j ? (r("replaceCaret pr", j), x === "0" ? D === "0" ? L = `>=${x}.${D}.${C}-${j} <${x}.${D}.${+C + 1}-0` : L = `>=${x}.${D}.${C}-${j} <${x}.${+D + 1}.0-0` : L = `>=${x}.${D}.${C}-${j} <${+x + 1}.0.0-0`) : (r("no pr"), x === "0" ? D === "0" ? L = `>=${x}.${D}.${C}${B} <${x}.${D}.${+C + 1}-0` : L = `>=${x}.${D}.${C}${B} <${x}.${+D + 1}.0-0` : L = `>=${x}.${D}.${C} <${+x + 1}.0.0-0`), r("caret return", L), L;
    });
  }, $ = (z, V) => (r("replaceXRanges", z, V), z.split(/\s+/).map((Z) => O(Z, V)).join(" ")), O = (z, V) => {
    z = z.trim();
    const Z = V.loose ? n[i.XRANGELOOSE] : n[i.XRANGE];
    return z.replace(Z, (B, A, x, D, C, j) => {
      r("xRange", z, B, A, x, D, C, j);
      const L = m(x), R = L || m(D), N = R || m(C), I = N;
      return A === "=" && I && (A = ""), j = V.includePrerelease ? "-0" : "", L ? A === ">" || A === "<" ? B = "<0.0.0-0" : B = "*" : A && I ? (R && (D = 0), C = 0, A === ">" ? (A = ">=", R ? (x = +x + 1, D = 0, C = 0) : (D = +D + 1, C = 0)) : A === "<=" && (A = "<", R ? x = +x + 1 : D = +D + 1), A === "<" && (j = "-0"), B = `${A + x}.${D}.${C}${j}`) : R ? B = `>=${x}.0.0${j} <${+x + 1}.0.0-0` : N && (B = `>=${x}.${D}.0${j} <${x}.${+D + 1}.0-0`), r("xRange return", B), B;
    });
  }, T = (z, V) => (r("replaceStars", z, V), z.trim().replace(n[i.STAR], "")), k = (z, V) => (r("replaceGTE0", z, V), z.trim().replace(n[V.includePrerelease ? i.GTE0PRE : i.GTE0], "")), H = (z) => (V, Z, B, A, x, D, C, j, L, R, N, I) => (m(B) ? Z = "" : m(A) ? Z = `>=${B}.0.0${z ? "-0" : ""}` : m(x) ? Z = `>=${B}.${A}.0${z ? "-0" : ""}` : D ? Z = `>=${Z}` : Z = `>=${Z}${z ? "-0" : ""}`, m(L) ? j = "" : m(R) ? j = `<${+L + 1}.0.0-0` : m(N) ? j = `<${L}.${+R + 1}.0-0` : I ? j = `<=${L}.${R}.${N}-${I}` : z ? j = `<${L}.${R}.${+N + 1}-0` : j = `<=${j}`, `${Z} ${j}`.trim()), U = (z, V, Z) => {
    for (let B = 0; B < z.length; B++)
      if (!z[B].test(V))
        return !1;
    if (V.prerelease.length && !Z.includePrerelease) {
      for (let B = 0; B < z.length; B++)
        if (r(z[B].semver), z[B].semver !== o.ANY && z[B].semver.prerelease.length > 0) {
          const A = z[B].semver;
          if (A.major === V.major && A.minor === V.minor && A.patch === V.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return Yn;
}
var Qn, Ua;
function br() {
  if (Ua) return Qn;
  Ua = 1;
  const e = Symbol("SemVer ANY");
  class t {
    static get ANY() {
      return e;
    }
    constructor(d, E) {
      if (E = a(E), d instanceof t) {
        if (d.loose === !!E.loose)
          return d;
        d = d.value;
      }
      d = d.trim().split(/\s+/).join(" "), r("comparator", d, E), this.options = E, this.loose = !!E.loose, this.parse(d), this.semver === e ? this.value = "" : this.value = this.operator + this.semver.version, r("comp", this);
    }
    parse(d) {
      const E = this.options.loose ? s[u.COMPARATORLOOSE] : s[u.COMPARATOR], g = d.match(E);
      if (!g)
        throw new TypeError(`Invalid comparator: ${d}`);
      this.operator = g[1] !== void 0 ? g[1] : "", this.operator === "=" && (this.operator = ""), g[2] ? this.semver = new f(g[2], this.options.loose) : this.semver = e;
    }
    toString() {
      return this.value;
    }
    test(d) {
      if (r("Comparator.test", d, this.options.loose), this.semver === e || d === e)
        return !0;
      if (typeof d == "string")
        try {
          d = new f(d, this.options);
        } catch {
          return !1;
        }
      return o(d, this.operator, this.semver, this.options);
    }
    intersects(d, E) {
      if (!(d instanceof t))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new n(d.value, E).test(this.value) : d.operator === "" ? d.value === "" ? !0 : new n(this.value, E).test(d.semver) : (E = a(E), E.includePrerelease && (this.value === "<0.0.0-0" || d.value === "<0.0.0-0") || !E.includePrerelease && (this.value.startsWith("<0.0.0") || d.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && d.operator.startsWith(">") || this.operator.startsWith("<") && d.operator.startsWith("<") || this.semver.version === d.semver.version && this.operator.includes("=") && d.operator.includes("=") || o(this.semver, "<", d.semver, E) && this.operator.startsWith(">") && d.operator.startsWith("<") || o(this.semver, ">", d.semver, E) && this.operator.startsWith("<") && d.operator.startsWith(">")));
    }
  }
  Qn = t;
  const a = Ai(), { safeRe: s, t: u } = ot(), o = xc(), r = wr(), f = Ee(), n = Ne();
  return Qn;
}
var ei, za;
function Rr() {
  if (za) return ei;
  za = 1;
  const e = Ne();
  return ei = (a, s, u) => {
    try {
      s = new e(s, u);
    } catch {
      return !1;
    }
    return s.test(a);
  }, ei;
}
var ti, Va;
function ml() {
  if (Va) return ti;
  Va = 1;
  const e = Ne();
  return ti = (a, s) => new e(a, s).set.map((u) => u.map((o) => o.value).join(" ").trim().split(" ")), ti;
}
var ri, Ga;
function pl() {
  if (Ga) return ri;
  Ga = 1;
  const e = Ee(), t = Ne();
  return ri = (s, u, o) => {
    let r = null, f = null, n = null;
    try {
      n = new t(u, o);
    } catch {
      return null;
    }
    return s.forEach((i) => {
      n.test(i) && (!r || f.compare(i) === -1) && (r = i, f = new e(r, o));
    }), r;
  }, ri;
}
var ni, Ba;
function yl() {
  if (Ba) return ni;
  Ba = 1;
  const e = Ee(), t = Ne();
  return ni = (s, u, o) => {
    let r = null, f = null, n = null;
    try {
      n = new t(u, o);
    } catch {
      return null;
    }
    return s.forEach((i) => {
      n.test(i) && (!r || f.compare(i) === 1) && (r = i, f = new e(r, o));
    }), r;
  }, ni;
}
var ii, Ha;
function vl() {
  if (Ha) return ii;
  Ha = 1;
  const e = Ee(), t = Ne(), a = $r();
  return ii = (u, o) => {
    u = new t(u, o);
    let r = new e("0.0.0");
    if (u.test(r) || (r = new e("0.0.0-0"), u.test(r)))
      return r;
    r = null;
    for (let f = 0; f < u.set.length; ++f) {
      const n = u.set[f];
      let i = null;
      n.forEach((d) => {
        const E = new e(d.semver.version);
        switch (d.operator) {
          case ">":
            E.prerelease.length === 0 ? E.patch++ : E.prerelease.push(0), E.raw = E.format();
          /* fallthrough */
          case "":
          case ">=":
            (!i || a(E, i)) && (i = E);
            break;
          case "<":
          case "<=":
            break;
          /* istanbul ignore next */
          default:
            throw new Error(`Unexpected operation: ${d.operator}`);
        }
      }), i && (!r || a(r, i)) && (r = i);
    }
    return r && u.test(r) ? r : null;
  }, ii;
}
var si, Wa;
function El() {
  if (Wa) return si;
  Wa = 1;
  const e = Ne();
  return si = (a, s) => {
    try {
      return new e(a, s).range || "*";
    } catch {
      return null;
    }
  }, si;
}
var oi, Ka;
function Mi() {
  if (Ka) return oi;
  Ka = 1;
  const e = Ee(), t = br(), { ANY: a } = t, s = Ne(), u = Rr(), o = $r(), r = qi(), f = ji(), n = ki();
  return oi = (d, E, g, p) => {
    d = new e(d, p), E = new s(E, p);
    let w, b, l, h, c;
    switch (g) {
      case ">":
        w = o, b = f, l = r, h = ">", c = ">=";
        break;
      case "<":
        w = r, b = n, l = o, h = "<", c = "<=";
        break;
      default:
        throw new TypeError('Must provide a hilo val of "<" or ">"');
    }
    if (u(d, E, p))
      return !1;
    for (let m = 0; m < E.set.length; ++m) {
      const y = E.set[m];
      let v = null, _ = null;
      if (y.forEach((S) => {
        S.semver === a && (S = new t(">=0.0.0")), v = v || S, _ = _ || S, w(S.semver, v.semver, p) ? v = S : l(S.semver, _.semver, p) && (_ = S);
      }), v.operator === h || v.operator === c || (!_.operator || _.operator === h) && b(d, _.semver))
        return !1;
      if (_.operator === c && l(d, _.semver))
        return !1;
    }
    return !0;
  }, oi;
}
var ai, Xa;
function gl() {
  if (Xa) return ai;
  Xa = 1;
  const e = Mi();
  return ai = (a, s, u) => e(a, s, ">", u), ai;
}
var ci, Za;
function _l() {
  if (Za) return ci;
  Za = 1;
  const e = Mi();
  return ci = (a, s, u) => e(a, s, "<", u), ci;
}
var ui, Ja;
function Sl() {
  if (Ja) return ui;
  Ja = 1;
  const e = Ne();
  return ui = (a, s, u) => (a = new e(a, u), s = new e(s, u), a.intersects(s, u)), ui;
}
var fi, Ya;
function wl() {
  if (Ya) return fi;
  Ya = 1;
  const e = Rr(), t = Ie();
  return fi = (a, s, u) => {
    const o = [];
    let r = null, f = null;
    const n = a.sort((g, p) => t(g, p, u));
    for (const g of n)
      e(g, s, u) ? (f = g, r || (r = g)) : (f && o.push([r, f]), f = null, r = null);
    r && o.push([r, null]);
    const i = [];
    for (const [g, p] of o)
      g === p ? i.push(g) : !p && g === n[0] ? i.push("*") : p ? g === n[0] ? i.push(`<=${p}`) : i.push(`${g} - ${p}`) : i.push(`>=${g}`);
    const d = i.join(" || "), E = typeof s.raw == "string" ? s.raw : String(s);
    return d.length < E.length ? d : s;
  }, fi;
}
var li, Qa;
function $l() {
  if (Qa) return li;
  Qa = 1;
  const e = Ne(), t = br(), { ANY: a } = t, s = Rr(), u = Ie(), o = (E, g, p = {}) => {
    if (E === g)
      return !0;
    E = new e(E, p), g = new e(g, p);
    let w = !1;
    e: for (const b of E.set) {
      for (const l of g.set) {
        const h = n(b, l, p);
        if (w = w || h !== null, h)
          continue e;
      }
      if (w)
        return !1;
    }
    return !0;
  }, r = [new t(">=0.0.0-0")], f = [new t(">=0.0.0")], n = (E, g, p) => {
    if (E === g)
      return !0;
    if (E.length === 1 && E[0].semver === a) {
      if (g.length === 1 && g[0].semver === a)
        return !0;
      p.includePrerelease ? E = r : E = f;
    }
    if (g.length === 1 && g[0].semver === a) {
      if (p.includePrerelease)
        return !0;
      g = f;
    }
    const w = /* @__PURE__ */ new Set();
    let b, l;
    for (const $ of E)
      $.operator === ">" || $.operator === ">=" ? b = i(b, $, p) : $.operator === "<" || $.operator === "<=" ? l = d(l, $, p) : w.add($.semver);
    if (w.size > 1)
      return null;
    let h;
    if (b && l) {
      if (h = u(b.semver, l.semver, p), h > 0)
        return null;
      if (h === 0 && (b.operator !== ">=" || l.operator !== "<="))
        return null;
    }
    for (const $ of w) {
      if (b && !s($, String(b), p) || l && !s($, String(l), p))
        return null;
      for (const O of g)
        if (!s($, String(O), p))
          return !1;
      return !0;
    }
    let c, m, y, v, _ = l && !p.includePrerelease && l.semver.prerelease.length ? l.semver : !1, S = b && !p.includePrerelease && b.semver.prerelease.length ? b.semver : !1;
    _ && _.prerelease.length === 1 && l.operator === "<" && _.prerelease[0] === 0 && (_ = !1);
    for (const $ of g) {
      if (v = v || $.operator === ">" || $.operator === ">=", y = y || $.operator === "<" || $.operator === "<=", b) {
        if (S && $.semver.prerelease && $.semver.prerelease.length && $.semver.major === S.major && $.semver.minor === S.minor && $.semver.patch === S.patch && (S = !1), $.operator === ">" || $.operator === ">=") {
          if (c = i(b, $, p), c === $ && c !== b)
            return !1;
        } else if (b.operator === ">=" && !s(b.semver, String($), p))
          return !1;
      }
      if (l) {
        if (_ && $.semver.prerelease && $.semver.prerelease.length && $.semver.major === _.major && $.semver.minor === _.minor && $.semver.patch === _.patch && (_ = !1), $.operator === "<" || $.operator === "<=") {
          if (m = d(l, $, p), m === $ && m !== l)
            return !1;
        } else if (l.operator === "<=" && !s(l.semver, String($), p))
          return !1;
      }
      if (!$.operator && (l || b) && h !== 0)
        return !1;
    }
    return !(b && y && !l && h !== 0 || l && v && !b && h !== 0 || S || _);
  }, i = (E, g, p) => {
    if (!E)
      return g;
    const w = u(E.semver, g.semver, p);
    return w > 0 ? E : w < 0 || g.operator === ">" && E.operator === ">=" ? g : E;
  }, d = (E, g, p) => {
    if (!E)
      return g;
    const w = u(E.semver, g.semver, p);
    return w < 0 ? E : w > 0 || g.operator === "<" && E.operator === "<=" ? g : E;
  };
  return li = o, li;
}
var di, ec;
function bl() {
  if (ec) return di;
  ec = 1;
  const e = ot(), t = Sr(), a = Ee(), s = kc(), u = We(), o = el(), r = tl(), f = rl(), n = nl(), i = il(), d = sl(), E = ol(), g = al(), p = Ie(), w = cl(), b = ul(), l = Fi(), h = fl(), c = ll(), m = $r(), y = qi(), v = jc(), _ = Mc(), S = ki(), $ = ji(), O = xc(), T = dl(), k = br(), H = Ne(), U = Rr(), z = ml(), V = pl(), Z = yl(), B = vl(), A = El(), x = Mi(), D = gl(), C = _l(), j = Sl(), L = wl(), R = $l();
  return di = {
    parse: u,
    valid: o,
    clean: r,
    inc: f,
    diff: n,
    major: i,
    minor: d,
    patch: E,
    prerelease: g,
    compare: p,
    rcompare: w,
    compareLoose: b,
    compareBuild: l,
    sort: h,
    rsort: c,
    gt: m,
    lt: y,
    eq: v,
    neq: _,
    gte: S,
    lte: $,
    cmp: O,
    coerce: T,
    Comparator: k,
    Range: H,
    satisfies: U,
    toComparators: z,
    maxSatisfying: V,
    minSatisfying: Z,
    minVersion: B,
    validRange: A,
    outside: x,
    gtr: D,
    ltr: C,
    intersects: j,
    simplifyRange: L,
    subset: R,
    SemVer: a,
    re: e.re,
    src: e.src,
    tokens: e.t,
    SEMVER_SPEC_VERSION: t.SEMVER_SPEC_VERSION,
    RELEASE_TYPES: t.RELEASE_TYPES,
    compareIdentifiers: s.compareIdentifiers,
    rcompareIdentifiers: s.rcompareIdentifiers
  }, di;
}
var Qe = { exports: {} }, lr = { exports: {} }, tc;
function Rl() {
  if (tc) return lr.exports;
  tc = 1;
  const e = (t, a) => {
    for (const s of Reflect.ownKeys(a))
      Object.defineProperty(t, s, Object.getOwnPropertyDescriptor(a, s));
    return t;
  };
  return lr.exports = e, lr.exports.default = e, lr.exports;
}
var rc;
function Ol() {
  if (rc) return Qe.exports;
  rc = 1;
  const e = Rl(), t = /* @__PURE__ */ new WeakMap(), a = (s, u = {}) => {
    if (typeof s != "function")
      throw new TypeError("Expected a function");
    let o, r = 0;
    const f = s.displayName || s.name || "<anonymous>", n = function(...i) {
      if (t.set(n, ++r), r === 1)
        o = s.apply(this, i), s = null;
      else if (u.throw === !0)
        throw new Error(`Function \`${f}\` can only be called once`);
      return o;
    };
    return e(n, s), t.set(n, r), n;
  };
  return Qe.exports = a, Qe.exports.default = a, Qe.exports.callCount = (s) => {
    if (!t.has(s))
      throw new Error(`The given function \`${s.name}\` is not wrapped by the \`onetime\` package`);
    return t.get(s);
  }, Qe.exports;
}
var dr = rt.exports, nc;
function Il() {
  return nc || (nc = 1, function(e, t) {
    var a = dr && dr.__classPrivateFieldSet || function(B, A, x, D, C) {
      if (D === "m") throw new TypeError("Private method is not writable");
      if (D === "a" && !C) throw new TypeError("Private accessor was defined without a setter");
      if (typeof A == "function" ? B !== A || !C : !A.has(B)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return D === "a" ? C.call(B, x) : C ? C.value = x : A.set(B, x), x;
    }, s = dr && dr.__classPrivateFieldGet || function(B, A, x, D) {
      if (x === "a" && !D) throw new TypeError("Private accessor was defined without a getter");
      if (typeof A == "function" ? B !== A || !D : !A.has(B)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return x === "m" ? D : x === "a" ? D.call(B) : D ? D.value : A.get(B);
    }, u, o, r, f, n, i;
    Object.defineProperty(t, "__esModule", { value: !0 });
    const d = Ii, E = Be, g = ue, p = bc, w = $c, b = Jc, l = Ru(), h = Du(), c = Lu(), m = Uu(), y = qc(), v = Jf(), _ = Qf(), S = bl(), $ = Ol(), O = "aes-256-cbc", T = () => /* @__PURE__ */ Object.create(null), k = (B) => B != null;
    let H = "";
    try {
      delete require.cache[__filename], H = g.dirname((o = (u = e.parent) === null || u === void 0 ? void 0 : u.filename) !== null && o !== void 0 ? o : ".");
    } catch {
    }
    const U = (B, A) => {
      const x = /* @__PURE__ */ new Set([
        "undefined",
        "symbol",
        "function"
      ]), D = typeof A;
      if (x.has(D))
        throw new TypeError(`Setting a value of type \`${D}\` for key \`${B}\` is not allowed as it's not supported by JSON`);
    }, z = "__internal__", V = `${z}.migrations.version`;
    class Z {
      constructor(A = {}) {
        var x;
        r.set(this, void 0), f.set(this, void 0), n.set(this, void 0), i.set(this, {}), this._deserialize = (N) => JSON.parse(N), this._serialize = (N) => JSON.stringify(N, void 0, "	");
        const D = {
          configName: "config",
          fileExtension: "json",
          projectSuffix: "nodejs",
          clearInvalidConfig: !1,
          accessPropertiesByDotNotation: !0,
          configFileMode: 438,
          ...A
        }, C = $(() => {
          const N = h.sync({ cwd: H }), I = N && JSON.parse(E.readFileSync(N, "utf8"));
          return I ?? {};
        });
        if (!D.cwd) {
          if (D.projectName || (D.projectName = C().name), !D.projectName)
            throw new Error("Project name could not be inferred. Please specify the `projectName` option.");
          D.cwd = c(D.projectName, { suffix: D.projectSuffix }).config;
        }
        if (a(this, n, D, "f"), D.schema) {
          if (typeof D.schema != "object")
            throw new TypeError("The `schema` option must be an object.");
          const N = new y.default({
            allErrors: !0,
            useDefaults: !0
          });
          (0, v.default)(N);
          const I = {
            type: "object",
            properties: D.schema
          };
          a(this, r, N.compile(I), "f");
          for (const [K, W] of Object.entries(D.schema))
            W?.default && (s(this, i, "f")[K] = W.default);
        }
        D.defaults && a(this, i, {
          ...s(this, i, "f"),
          ...D.defaults
        }, "f"), D.serialize && (this._serialize = D.serialize), D.deserialize && (this._deserialize = D.deserialize), this.events = new b.EventEmitter(), a(this, f, D.encryptionKey, "f");
        const j = D.fileExtension ? `.${D.fileExtension}` : "";
        this.path = g.resolve(D.cwd, `${(x = D.configName) !== null && x !== void 0 ? x : "config"}${j}`);
        const L = this.store, R = Object.assign(T(), D.defaults, L);
        this._validate(R);
        try {
          w.deepEqual(L, R);
        } catch {
          this.store = R;
        }
        if (D.watch && this._watch(), D.migrations) {
          if (D.projectVersion || (D.projectVersion = C().version), !D.projectVersion)
            throw new Error("Project version could not be inferred. Please specify the `projectVersion` option.");
          this._migrate(D.migrations, D.projectVersion, D.beforeEachMigration);
        }
      }
      get(A, x) {
        if (s(this, n, "f").accessPropertiesByDotNotation)
          return this._get(A, x);
        const { store: D } = this;
        return A in D ? D[A] : x;
      }
      set(A, x) {
        if (typeof A != "string" && typeof A != "object")
          throw new TypeError(`Expected \`key\` to be of type \`string\` or \`object\`, got ${typeof A}`);
        if (typeof A != "object" && x === void 0)
          throw new TypeError("Use `delete()` to clear values");
        if (this._containsReservedKey(A))
          throw new TypeError(`Please don't use the ${z} key, as it's used to manage this module internal operations.`);
        const { store: D } = this, C = (j, L) => {
          U(j, L), s(this, n, "f").accessPropertiesByDotNotation ? l.set(D, j, L) : D[j] = L;
        };
        if (typeof A == "object") {
          const j = A;
          for (const [L, R] of Object.entries(j))
            C(L, R);
        } else
          C(A, x);
        this.store = D;
      }
      /**
      		    Check if an item exists.
      
      		    @param key - The key of the item to check.
      		    */
      has(A) {
        return s(this, n, "f").accessPropertiesByDotNotation ? l.has(this.store, A) : A in this.store;
      }
      /**
      		    Reset items to their default values, as defined by the `defaults` or `schema` option.
      
      		    @see `clear()` to reset all items.
      
      		    @param keys - The keys of the items to reset.
      		    */
      reset(...A) {
        for (const x of A)
          k(s(this, i, "f")[x]) && this.set(x, s(this, i, "f")[x]);
      }
      /**
      		    Delete an item.
      
      		    @param key - The key of the item to delete.
      		    */
      delete(A) {
        const { store: x } = this;
        s(this, n, "f").accessPropertiesByDotNotation ? l.delete(x, A) : delete x[A], this.store = x;
      }
      /**
      		    Delete all items.
      
      		    This resets known items to their default values, if defined by the `defaults` or `schema` option.
      		    */
      clear() {
        this.store = T();
        for (const A of Object.keys(s(this, i, "f")))
          this.reset(A);
      }
      /**
      		    Watches the given `key`, calling `callback` on any changes.
      
      		    @param key - The key wo watch.
      		    @param callback - A callback function that is called on any changes. When a `key` is first set `oldValue` will be `undefined`, and when a key is deleted `newValue` will be `undefined`.
      		    @returns A function, that when called, will unsubscribe.
      		    */
      onDidChange(A, x) {
        if (typeof A != "string")
          throw new TypeError(`Expected \`key\` to be of type \`string\`, got ${typeof A}`);
        if (typeof x != "function")
          throw new TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof x}`);
        return this._handleChange(() => this.get(A), x);
      }
      /**
      		    Watches the whole config object, calling `callback` on any changes.
      
      		    @param callback - A callback function that is called on any changes. When a `key` is first set `oldValue` will be `undefined`, and when a key is deleted `newValue` will be `undefined`.
      		    @returns A function, that when called, will unsubscribe.
      		    */
      onDidAnyChange(A) {
        if (typeof A != "function")
          throw new TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof A}`);
        return this._handleChange(() => this.store, A);
      }
      get size() {
        return Object.keys(this.store).length;
      }
      get store() {
        try {
          const A = E.readFileSync(this.path, s(this, f, "f") ? null : "utf8"), x = this._encryptData(A), D = this._deserialize(x);
          return this._validate(D), Object.assign(T(), D);
        } catch (A) {
          if (A?.code === "ENOENT")
            return this._ensureDirectory(), T();
          if (s(this, n, "f").clearInvalidConfig && A.name === "SyntaxError")
            return T();
          throw A;
        }
      }
      set store(A) {
        this._ensureDirectory(), this._validate(A), this._write(A), this.events.emit("change");
      }
      *[(r = /* @__PURE__ */ new WeakMap(), f = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap(), i = /* @__PURE__ */ new WeakMap(), Symbol.iterator)]() {
        for (const [A, x] of Object.entries(this.store))
          yield [A, x];
      }
      _encryptData(A) {
        if (!s(this, f, "f"))
          return A.toString();
        try {
          if (s(this, f, "f"))
            try {
              if (A.slice(16, 17).toString() === ":") {
                const x = A.slice(0, 16), D = p.pbkdf2Sync(s(this, f, "f"), x.toString(), 1e4, 32, "sha512"), C = p.createDecipheriv(O, D, x);
                A = Buffer.concat([C.update(Buffer.from(A.slice(17))), C.final()]).toString("utf8");
              } else {
                const x = p.createDecipher(O, s(this, f, "f"));
                A = Buffer.concat([x.update(Buffer.from(A)), x.final()]).toString("utf8");
              }
            } catch {
            }
        } catch {
        }
        return A.toString();
      }
      _handleChange(A, x) {
        let D = A();
        const C = () => {
          const j = D, L = A();
          (0, d.isDeepStrictEqual)(L, j) || (D = L, x.call(this, L, j));
        };
        return this.events.on("change", C), () => this.events.removeListener("change", C);
      }
      _validate(A) {
        if (!s(this, r, "f") || s(this, r, "f").call(this, A) || !s(this, r, "f").errors)
          return;
        const D = s(this, r, "f").errors.map(({ instancePath: C, message: j = "" }) => `\`${C.slice(1)}\` ${j}`);
        throw new Error("Config schema violation: " + D.join("; "));
      }
      _ensureDirectory() {
        E.mkdirSync(g.dirname(this.path), { recursive: !0 });
      }
      _write(A) {
        let x = this._serialize(A);
        if (s(this, f, "f")) {
          const D = p.randomBytes(16), C = p.pbkdf2Sync(s(this, f, "f"), D.toString(), 1e4, 32, "sha512"), j = p.createCipheriv(O, C, D);
          x = Buffer.concat([D, Buffer.from(":"), j.update(Buffer.from(x)), j.final()]);
        }
        if (process.env.SNAP)
          E.writeFileSync(this.path, x, { mode: s(this, n, "f").configFileMode });
        else
          try {
            m.writeFileSync(this.path, x, { mode: s(this, n, "f").configFileMode });
          } catch (D) {
            if (D?.code === "EXDEV") {
              E.writeFileSync(this.path, x, { mode: s(this, n, "f").configFileMode });
              return;
            }
            throw D;
          }
      }
      _watch() {
        this._ensureDirectory(), E.existsSync(this.path) || this._write(T()), process.platform === "win32" ? E.watch(this.path, { persistent: !1 }, _(() => {
          this.events.emit("change");
        }, { wait: 100 })) : E.watchFile(this.path, { persistent: !1 }, _(() => {
          this.events.emit("change");
        }, { wait: 5e3 }));
      }
      _migrate(A, x, D) {
        let C = this._get(V, "0.0.0");
        const j = Object.keys(A).filter((R) => this._shouldPerformMigration(R, C, x));
        let L = { ...this.store };
        for (const R of j)
          try {
            D && D(this, {
              fromVersion: C,
              toVersion: R,
              finalVersion: x,
              versions: j
            });
            const N = A[R];
            N(this), this._set(V, R), C = R, L = { ...this.store };
          } catch (N) {
            throw this.store = L, new Error(`Something went wrong during the migration! Changes applied to the store until this failed migration will be restored. ${N}`);
          }
        (this._isVersionInRangeFormat(C) || !S.eq(C, x)) && this._set(V, x);
      }
      _containsReservedKey(A) {
        return typeof A == "object" && Object.keys(A)[0] === z ? !0 : typeof A != "string" ? !1 : s(this, n, "f").accessPropertiesByDotNotation ? !!A.startsWith(`${z}.`) : !1;
      }
      _isVersionInRangeFormat(A) {
        return S.clean(A) === null;
      }
      _shouldPerformMigration(A, x, D) {
        return this._isVersionInRangeFormat(A) ? x !== "0.0.0" && S.satisfies(x, A) ? !1 : S.satisfies(D, A) : !(S.lte(A, x) || S.gt(A, D));
      }
      _get(A, x) {
        return l.get(this.store, A, x);
      }
      _set(A, x) {
        const { store: D } = this;
        l.set(D, A, x), this.store = D;
      }
    }
    t.default = Z, e.exports = Z, e.exports.default = Z;
  }(rt, rt.exports)), rt.exports;
}
var hi, ic;
function Nl() {
  if (ic) return hi;
  ic = 1;
  const e = ue, { app: t, ipcMain: a, ipcRenderer: s, shell: u } = Bc, o = Il();
  let r = !1;
  const f = () => {
    if (!a || !t)
      throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
    const i = {
      defaultCwd: t.getPath("userData"),
      appVersion: t.getVersion()
    };
    return r || (a.on("electron-store-get-data", (d) => {
      d.returnValue = i;
    }), r = !0), i;
  };
  class n extends o {
    constructor(d) {
      let E, g;
      if (s) {
        const p = s.sendSync("electron-store-get-data");
        if (!p)
          throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
        ({ defaultCwd: E, appVersion: g } = p);
      } else a && t && ({ defaultCwd: E, appVersion: g } = f());
      d = {
        name: "config",
        ...d
      }, d.projectVersion || (d.projectVersion = g), d.cwd ? d.cwd = e.isAbsolute(d.cwd) ? d.cwd : e.join(E, d.cwd) : d.cwd = E, d.configName = d.name, delete d.name, super(d);
    }
    static initRenderer() {
      f();
    }
    async openInEditor() {
      const d = await u.openPath(this.path);
      if (d)
        throw new Error(d);
    }
  }
  return hi = n, hi;
}
var Pl = /* @__PURE__ */ Nl();
const sc = /* @__PURE__ */ Oc(Pl);
var Ue = { exports: {} }, mi, oc;
function Uc() {
  return oc || (oc = 1, mi = {
    /* The local file header */
    LOCHDR: 30,
    // LOC header size
    LOCSIG: 67324752,
    // "PK\003\004"
    LOCVER: 4,
    // version needed to extract
    LOCFLG: 6,
    // general purpose bit flag
    LOCHOW: 8,
    // compression method
    LOCTIM: 10,
    // modification time (2 bytes time, 2 bytes date)
    LOCCRC: 14,
    // uncompressed file crc-32 value
    LOCSIZ: 18,
    // compressed size
    LOCLEN: 22,
    // uncompressed size
    LOCNAM: 26,
    // filename length
    LOCEXT: 28,
    // extra field length
    /* The Data descriptor */
    EXTSIG: 134695760,
    // "PK\007\008"
    EXTHDR: 16,
    // EXT header size
    EXTCRC: 4,
    // uncompressed file crc-32 value
    EXTSIZ: 8,
    // compressed size
    EXTLEN: 12,
    // uncompressed size
    /* The central directory file header */
    CENHDR: 46,
    // CEN header size
    CENSIG: 33639248,
    // "PK\001\002"
    CENVEM: 4,
    // version made by
    CENVER: 6,
    // version needed to extract
    CENFLG: 8,
    // encrypt, decrypt flags
    CENHOW: 10,
    // compression method
    CENTIM: 12,
    // modification time (2 bytes time, 2 bytes date)
    CENCRC: 16,
    // uncompressed file crc-32 value
    CENSIZ: 20,
    // compressed size
    CENLEN: 24,
    // uncompressed size
    CENNAM: 28,
    // filename length
    CENEXT: 30,
    // extra field length
    CENCOM: 32,
    // file comment length
    CENDSK: 34,
    // volume number start
    CENATT: 36,
    // internal file attributes
    CENATX: 38,
    // external file attributes (host system dependent)
    CENOFF: 42,
    // LOC header offset
    /* The entries in the end of central directory */
    ENDHDR: 22,
    // END header size
    ENDSIG: 101010256,
    // "PK\005\006"
    ENDSUB: 8,
    // number of entries on this disk
    ENDTOT: 10,
    // total number of entries
    ENDSIZ: 12,
    // central directory size in bytes
    ENDOFF: 16,
    // offset of first CEN header
    ENDCOM: 20,
    // zip file comment length
    END64HDR: 20,
    // zip64 END header size
    END64SIG: 117853008,
    // zip64 Locator signature, "PK\006\007"
    END64START: 4,
    // number of the disk with the start of the zip64
    END64OFF: 8,
    // relative offset of the zip64 end of central directory
    END64NUMDISKS: 16,
    // total number of disks
    ZIP64SIG: 101075792,
    // zip64 signature, "PK\006\006"
    ZIP64HDR: 56,
    // zip64 record minimum size
    ZIP64LEAD: 12,
    // leading bytes at the start of the record, not counted by the value stored in ZIP64SIZE
    ZIP64SIZE: 4,
    // zip64 size of the central directory record
    ZIP64VEM: 12,
    // zip64 version made by
    ZIP64VER: 14,
    // zip64 version needed to extract
    ZIP64DSK: 16,
    // zip64 number of this disk
    ZIP64DSKDIR: 20,
    // number of the disk with the start of the record directory
    ZIP64SUB: 24,
    // number of entries on this disk
    ZIP64TOT: 32,
    // total number of entries
    ZIP64SIZB: 40,
    // zip64 central directory size in bytes
    ZIP64OFF: 48,
    // offset of start of central directory with respect to the starting disk number
    ZIP64EXTRA: 56,
    // extensible data sector
    /* Compression methods */
    STORED: 0,
    // no compression
    SHRUNK: 1,
    // shrunk
    REDUCED1: 2,
    // reduced with compression factor 1
    REDUCED2: 3,
    // reduced with compression factor 2
    REDUCED3: 4,
    // reduced with compression factor 3
    REDUCED4: 5,
    // reduced with compression factor 4
    IMPLODED: 6,
    // imploded
    // 7 reserved for Tokenizing compression algorithm
    DEFLATED: 8,
    // deflated
    ENHANCED_DEFLATED: 9,
    // enhanced deflated
    PKWARE: 10,
    // PKWare DCL imploded
    // 11 reserved by PKWARE
    BZIP2: 12,
    //  compressed using BZIP2
    // 13 reserved by PKWARE
    LZMA: 14,
    // LZMA
    // 15-17 reserved by PKWARE
    IBM_TERSE: 18,
    // compressed using IBM TERSE
    IBM_LZ77: 19,
    // IBM LZ77 z
    AES_ENCRYPT: 99,
    // WinZIP AES encryption method
    /* General purpose bit flag */
    // values can obtained with expression 2**bitnr
    FLG_ENC: 1,
    // Bit 0: encrypted file
    FLG_COMP1: 2,
    // Bit 1, compression option
    FLG_COMP2: 4,
    // Bit 2, compression option
    FLG_DESC: 8,
    // Bit 3, data descriptor
    FLG_ENH: 16,
    // Bit 4, enhanced deflating
    FLG_PATCH: 32,
    // Bit 5, indicates that the file is compressed patched data.
    FLG_STR: 64,
    // Bit 6, strong encryption (patented)
    // Bits 7-10: Currently unused.
    FLG_EFS: 2048,
    // Bit 11: Language encoding flag (EFS)
    // Bit 12: Reserved by PKWARE for enhanced compression.
    // Bit 13: encrypted the Central Directory (patented).
    // Bits 14-15: Reserved by PKWARE.
    FLG_MSK: 4096,
    // mask header values
    /* Load type */
    FILE: 2,
    BUFFER: 1,
    NONE: 0,
    /* 4.5 Extensible data fields */
    EF_ID: 0,
    EF_SIZE: 2,
    /* Header IDs */
    ID_ZIP64: 1,
    ID_AVINFO: 7,
    ID_PFS: 8,
    ID_OS2: 9,
    ID_NTFS: 10,
    ID_OPENVMS: 12,
    ID_UNIX: 13,
    ID_FORK: 14,
    ID_PATCH: 15,
    ID_X509_PKCS7: 20,
    ID_X509_CERTID_F: 21,
    ID_X509_CERTID_C: 22,
    ID_STRONGENC: 23,
    ID_RECORD_MGT: 24,
    ID_X509_PKCS7_RL: 25,
    ID_IBM1: 101,
    ID_IBM2: 102,
    ID_POSZIP: 18064,
    EF_ZIP64_OR_32: 4294967295,
    EF_ZIP64_OR_16: 65535,
    EF_ZIP64_SUNCOMP: 0,
    EF_ZIP64_SCOMP: 8,
    EF_ZIP64_RHO: 16,
    EF_ZIP64_DSN: 24
  }), mi;
}
var pi = {}, ac;
function xi() {
  return ac || (ac = 1, function(e) {
    const t = {
      /* Header error messages */
      INVALID_LOC: "Invalid LOC header (bad signature)",
      INVALID_CEN: "Invalid CEN header (bad signature)",
      INVALID_END: "Invalid END header (bad signature)",
      /* Descriptor */
      DESCRIPTOR_NOT_EXIST: "No descriptor present",
      DESCRIPTOR_UNKNOWN: "Unknown descriptor format",
      DESCRIPTOR_FAULTY: "Descriptor data is malformed",
      /* ZipEntry error messages*/
      NO_DATA: "Nothing to decompress",
      BAD_CRC: "CRC32 checksum failed {0}",
      FILE_IN_THE_WAY: "There is a file in the way: {0}",
      UNKNOWN_METHOD: "Invalid/unsupported compression method",
      /* Inflater error messages */
      AVAIL_DATA: "inflate::Available inflate data did not terminate",
      INVALID_DISTANCE: "inflate::Invalid literal/length or distance code in fixed or dynamic block",
      TO_MANY_CODES: "inflate::Dynamic block code description: too many length or distance codes",
      INVALID_REPEAT_LEN: "inflate::Dynamic block code description: repeat more than specified lengths",
      INVALID_REPEAT_FIRST: "inflate::Dynamic block code description: repeat lengths with no first length",
      INCOMPLETE_CODES: "inflate::Dynamic block code description: code lengths codes incomplete",
      INVALID_DYN_DISTANCE: "inflate::Dynamic block code description: invalid distance code lengths",
      INVALID_CODES_LEN: "inflate::Dynamic block code description: invalid literal/length code lengths",
      INVALID_STORE_BLOCK: "inflate::Stored block length did not match one's complement",
      INVALID_BLOCK_TYPE: "inflate::Invalid block type (type == 3)",
      /* ADM-ZIP error messages */
      CANT_EXTRACT_FILE: "Could not extract the file",
      CANT_OVERRIDE: "Target file already exists",
      DISK_ENTRY_TOO_LARGE: "Number of disk entries is too large",
      NO_ZIP: "No zip file was loaded",
      NO_ENTRY: "Entry doesn't exist",
      DIRECTORY_CONTENT_ERROR: "A directory cannot have content",
      FILE_NOT_FOUND: 'File not found: "{0}"',
      NOT_IMPLEMENTED: "Not implemented",
      INVALID_FILENAME: "Invalid filename",
      INVALID_FORMAT: "Invalid or unsupported zip format. No END header found",
      INVALID_PASS_PARAM: "Incompatible password parameter",
      WRONG_PASSWORD: "Wrong Password",
      /* ADM-ZIP */
      COMMENT_TOO_LONG: "Comment is too long",
      // Comment can be max 65535 bytes long (NOTE: some non-US characters may take more space)
      EXTRA_FIELD_PARSE_ERROR: "Extra field parsing error"
    };
    function a(s) {
      return function(...u) {
        return u.length && (s = s.replace(/\{(\d)\}/g, (o, r) => u[r] || "")), new Error("ADM-ZIP: " + s);
      };
    }
    for (const s of Object.keys(t))
      e[s] = a(t[s]);
  }(pi)), pi;
}
var yi, cc;
function Tl() {
  if (cc) return yi;
  cc = 1;
  const e = Be, t = ue, a = Uc(), s = xi(), u = typeof process == "object" && process.platform === "win32", o = (n) => typeof n == "object" && n !== null, r = new Uint32Array(256).map((n, i) => {
    for (let d = 0; d < 8; d++)
      i & 1 ? i = 3988292384 ^ i >>> 1 : i >>>= 1;
    return i >>> 0;
  });
  function f(n) {
    this.sep = t.sep, this.fs = e, o(n) && o(n.fs) && typeof n.fs.statSync == "function" && (this.fs = n.fs);
  }
  return yi = f, f.prototype.makeDir = function(n) {
    const i = this;
    function d(E) {
      let g = E.split(i.sep)[0];
      E.split(i.sep).forEach(function(p) {
        if (!(!p || p.substr(-1, 1) === ":")) {
          g += i.sep + p;
          var w;
          try {
            w = i.fs.statSync(g);
          } catch {
            i.fs.mkdirSync(g);
          }
          if (w && w.isFile()) throw s.FILE_IN_THE_WAY(`"${g}"`);
        }
      });
    }
    d(n);
  }, f.prototype.writeFileTo = function(n, i, d, E) {
    const g = this;
    if (g.fs.existsSync(n)) {
      if (!d) return !1;
      var p = g.fs.statSync(n);
      if (p.isDirectory())
        return !1;
    }
    var w = t.dirname(n);
    g.fs.existsSync(w) || g.makeDir(w);
    var b;
    try {
      b = g.fs.openSync(n, "w", 438);
    } catch {
      g.fs.chmodSync(n, 438), b = g.fs.openSync(n, "w", 438);
    }
    if (b)
      try {
        g.fs.writeSync(b, i, 0, i.length, 0);
      } finally {
        g.fs.closeSync(b);
      }
    return g.fs.chmodSync(n, E || 438), !0;
  }, f.prototype.writeFileToAsync = function(n, i, d, E, g) {
    typeof E == "function" && (g = E, E = void 0);
    const p = this;
    p.fs.exists(n, function(w) {
      if (w && !d) return g(!1);
      p.fs.stat(n, function(b, l) {
        if (w && l.isDirectory())
          return g(!1);
        var h = t.dirname(n);
        p.fs.exists(h, function(c) {
          c || p.makeDir(h), p.fs.open(n, "w", 438, function(m, y) {
            m ? p.fs.chmod(n, 438, function() {
              p.fs.open(n, "w", 438, function(v, _) {
                p.fs.write(_, i, 0, i.length, 0, function() {
                  p.fs.close(_, function() {
                    p.fs.chmod(n, E || 438, function() {
                      g(!0);
                    });
                  });
                });
              });
            }) : y ? p.fs.write(y, i, 0, i.length, 0, function() {
              p.fs.close(y, function() {
                p.fs.chmod(n, E || 438, function() {
                  g(!0);
                });
              });
            }) : p.fs.chmod(n, E || 438, function() {
              g(!0);
            });
          });
        });
      });
    });
  }, f.prototype.findFiles = function(n) {
    const i = this;
    function d(E, g, p) {
      let w = [];
      return i.fs.readdirSync(E).forEach(function(b) {
        const l = t.join(E, b), h = i.fs.statSync(l);
        w.push(t.normalize(l) + (h.isDirectory() ? i.sep : "")), h.isDirectory() && p && (w = w.concat(d(l, g, p)));
      }), w;
    }
    return d(n, void 0, !0);
  }, f.prototype.findFilesAsync = function(n, i) {
    const d = this;
    let E = [];
    d.fs.readdir(n, function(g, p) {
      if (g) return i(g);
      let w = p.length;
      if (!w) return i(null, E);
      p.forEach(function(b) {
        b = t.join(n, b), d.fs.stat(b, function(l, h) {
          if (l) return i(l);
          h && (E.push(t.normalize(b) + (h.isDirectory() ? d.sep : "")), h.isDirectory() ? d.findFilesAsync(b, function(c, m) {
            if (c) return i(c);
            E = E.concat(m), --w || i(null, E);
          }) : --w || i(null, E));
        });
      });
    });
  }, f.prototype.getAttributes = function() {
  }, f.prototype.setAttributes = function() {
  }, f.crc32update = function(n, i) {
    return r[(n ^ i) & 255] ^ n >>> 8;
  }, f.crc32 = function(n) {
    typeof n == "string" && (n = Buffer.from(n, "utf8"));
    let i = n.length, d = -1;
    for (let E = 0; E < i; ) d = f.crc32update(d, n[E++]);
    return ~d >>> 0;
  }, f.methodToString = function(n) {
    switch (n) {
      case a.STORED:
        return "STORED (" + n + ")";
      case a.DEFLATED:
        return "DEFLATED (" + n + ")";
      default:
        return "UNSUPPORTED (" + n + ")";
    }
  }, f.canonical = function(n) {
    if (!n) return "";
    const i = t.posix.normalize("/" + n.split("\\").join("/"));
    return t.join(".", i);
  }, f.zipnamefix = function(n) {
    if (!n) return "";
    const i = t.posix.normalize("/" + n.split("\\").join("/"));
    return t.posix.join(".", i);
  }, f.findLast = function(n, i) {
    if (!Array.isArray(n)) throw new TypeError("arr is not array");
    const d = n.length >>> 0;
    for (let E = d - 1; E >= 0; E--)
      if (i(n[E], E, n))
        return n[E];
  }, f.sanitize = function(n, i) {
    n = t.resolve(t.normalize(n));
    for (var d = i.split("/"), E = 0, g = d.length; E < g; E++) {
      var p = t.normalize(t.join(n, d.slice(E, g).join(t.sep)));
      if (p.indexOf(n) === 0)
        return p;
    }
    return t.normalize(t.join(n, t.basename(i)));
  }, f.toBuffer = function(i, d) {
    return Buffer.isBuffer(i) ? i : i instanceof Uint8Array ? Buffer.from(i) : typeof i == "string" ? d(i) : Buffer.alloc(0);
  }, f.readBigUInt64LE = function(n, i) {
    var d = Buffer.from(n.slice(i, i + 8));
    return d.swap64(), parseInt(`0x${d.toString("hex")}`);
  }, f.fromDOS2Date = function(n) {
    return new Date((n >> 25 & 127) + 1980, Math.max((n >> 21 & 15) - 1, 0), Math.max(n >> 16 & 31, 1), n >> 11 & 31, n >> 5 & 63, (n & 31) << 1);
  }, f.fromDate2DOS = function(n) {
    let i = 0, d = 0;
    return n.getFullYear() > 1979 && (i = (n.getFullYear() - 1980 & 127) << 9 | n.getMonth() + 1 << 5 | n.getDate(), d = n.getHours() << 11 | n.getMinutes() << 5 | n.getSeconds() >> 1), i << 16 | d;
  }, f.isWin = u, f.crcTable = r, yi;
}
var vi, uc;
function Cl() {
  if (uc) return vi;
  uc = 1;
  const e = ue;
  return vi = function(t, { fs: a }) {
    var s = t || "", u = r(), o = null;
    function r() {
      return {
        directory: !1,
        readonly: !1,
        hidden: !1,
        executable: !1,
        mtime: 0,
        atime: 0
      };
    }
    return s && a.existsSync(s) ? (o = a.statSync(s), u.directory = o.isDirectory(), u.mtime = o.mtime, u.atime = o.atime, u.executable = (73 & o.mode) !== 0, u.readonly = (128 & o.mode) === 0, u.hidden = e.basename(s)[0] === ".") : console.warn("Invalid path: " + s), {
      get directory() {
        return u.directory;
      },
      get readOnly() {
        return u.readonly;
      },
      get hidden() {
        return u.hidden;
      },
      get mtime() {
        return u.mtime;
      },
      get atime() {
        return u.atime;
      },
      get executable() {
        return u.executable;
      },
      decodeAttributes: function() {
      },
      encodeAttributes: function() {
      },
      toJSON: function() {
        return {
          path: s,
          isDirectory: u.directory,
          isReadOnly: u.readonly,
          isHidden: u.hidden,
          isExecutable: u.executable,
          mTime: u.mtime,
          aTime: u.atime
        };
      },
      toString: function() {
        return JSON.stringify(this.toJSON(), null, "	");
      }
    };
  }, vi;
}
var Ei, fc;
function Dl() {
  return fc || (fc = 1, Ei = {
    efs: !0,
    encode: (e) => Buffer.from(e, "utf8"),
    decode: (e) => e.toString("utf8")
  }), Ei;
}
var lc;
function at() {
  return lc || (lc = 1, Ue.exports = Tl(), Ue.exports.Constants = Uc(), Ue.exports.Errors = xi(), Ue.exports.FileAttr = Cl(), Ue.exports.decoder = Dl()), Ue.exports;
}
var hr = {}, gi, dc;
function Ll() {
  if (dc) return gi;
  dc = 1;
  var e = at(), t = e.Constants;
  return gi = function() {
    var a = 20, s = 10, u = 0, o = 0, r = 0, f = 0, n = 0, i = 0, d = 0, E = 0, g = 0, p = 0, w = 0, b = 0, l = 0;
    a |= e.isWin ? 2560 : 768, u |= t.FLG_EFS;
    const h = {
      extraLen: 0
    }, c = (y) => Math.max(0, y) >>> 0, m = (y) => Math.max(0, y) & 255;
    return r = e.fromDate2DOS(/* @__PURE__ */ new Date()), {
      get made() {
        return a;
      },
      set made(y) {
        a = y;
      },
      get version() {
        return s;
      },
      set version(y) {
        s = y;
      },
      get flags() {
        return u;
      },
      set flags(y) {
        u = y;
      },
      get flags_efs() {
        return (u & t.FLG_EFS) > 0;
      },
      set flags_efs(y) {
        y ? u |= t.FLG_EFS : u &= ~t.FLG_EFS;
      },
      get flags_desc() {
        return (u & t.FLG_DESC) > 0;
      },
      set flags_desc(y) {
        y ? u |= t.FLG_DESC : u &= ~t.FLG_DESC;
      },
      get method() {
        return o;
      },
      set method(y) {
        switch (y) {
          case t.STORED:
            this.version = 10;
          case t.DEFLATED:
          default:
            this.version = 20;
        }
        o = y;
      },
      get time() {
        return e.fromDOS2Date(this.timeval);
      },
      set time(y) {
        this.timeval = e.fromDate2DOS(y);
      },
      get timeval() {
        return r;
      },
      set timeval(y) {
        r = c(y);
      },
      get timeHighByte() {
        return m(r >>> 8);
      },
      get crc() {
        return f;
      },
      set crc(y) {
        f = c(y);
      },
      get compressedSize() {
        return n;
      },
      set compressedSize(y) {
        n = c(y);
      },
      get size() {
        return i;
      },
      set size(y) {
        i = c(y);
      },
      get fileNameLength() {
        return d;
      },
      set fileNameLength(y) {
        d = y;
      },
      get extraLength() {
        return E;
      },
      set extraLength(y) {
        E = y;
      },
      get extraLocalLength() {
        return h.extraLen;
      },
      set extraLocalLength(y) {
        h.extraLen = y;
      },
      get commentLength() {
        return g;
      },
      set commentLength(y) {
        g = y;
      },
      get diskNumStart() {
        return p;
      },
      set diskNumStart(y) {
        p = c(y);
      },
      get inAttr() {
        return w;
      },
      set inAttr(y) {
        w = c(y);
      },
      get attr() {
        return b;
      },
      set attr(y) {
        b = c(y);
      },
      // get Unix file permissions
      get fileAttr() {
        return (b || 0) >> 16 & 4095;
      },
      get offset() {
        return l;
      },
      set offset(y) {
        l = c(y);
      },
      get encrypted() {
        return (u & t.FLG_ENC) === t.FLG_ENC;
      },
      get centralHeaderSize() {
        return t.CENHDR + d + E + g;
      },
      get realDataOffset() {
        return l + t.LOCHDR + h.fnameLen + h.extraLen;
      },
      get localHeader() {
        return h;
      },
      loadLocalHeaderFromBinary: function(y) {
        var v = y.slice(l, l + t.LOCHDR);
        if (v.readUInt32LE(0) !== t.LOCSIG)
          throw e.Errors.INVALID_LOC();
        h.version = v.readUInt16LE(t.LOCVER), h.flags = v.readUInt16LE(t.LOCFLG), h.method = v.readUInt16LE(t.LOCHOW), h.time = v.readUInt32LE(t.LOCTIM), h.crc = v.readUInt32LE(t.LOCCRC), h.compressedSize = v.readUInt32LE(t.LOCSIZ), h.size = v.readUInt32LE(t.LOCLEN), h.fnameLen = v.readUInt16LE(t.LOCNAM), h.extraLen = v.readUInt16LE(t.LOCEXT);
        const _ = l + t.LOCHDR + h.fnameLen, S = _ + h.extraLen;
        return y.slice(_, S);
      },
      loadFromBinary: function(y) {
        if (y.length !== t.CENHDR || y.readUInt32LE(0) !== t.CENSIG)
          throw e.Errors.INVALID_CEN();
        a = y.readUInt16LE(t.CENVEM), s = y.readUInt16LE(t.CENVER), u = y.readUInt16LE(t.CENFLG), o = y.readUInt16LE(t.CENHOW), r = y.readUInt32LE(t.CENTIM), f = y.readUInt32LE(t.CENCRC), n = y.readUInt32LE(t.CENSIZ), i = y.readUInt32LE(t.CENLEN), d = y.readUInt16LE(t.CENNAM), E = y.readUInt16LE(t.CENEXT), g = y.readUInt16LE(t.CENCOM), p = y.readUInt16LE(t.CENDSK), w = y.readUInt16LE(t.CENATT), b = y.readUInt32LE(t.CENATX), l = y.readUInt32LE(t.CENOFF);
      },
      localHeaderToBinary: function() {
        var y = Buffer.alloc(t.LOCHDR);
        return y.writeUInt32LE(t.LOCSIG, 0), y.writeUInt16LE(s, t.LOCVER), y.writeUInt16LE(u, t.LOCFLG), y.writeUInt16LE(o, t.LOCHOW), y.writeUInt32LE(r, t.LOCTIM), y.writeUInt32LE(f, t.LOCCRC), y.writeUInt32LE(n, t.LOCSIZ), y.writeUInt32LE(i, t.LOCLEN), y.writeUInt16LE(d, t.LOCNAM), y.writeUInt16LE(h.extraLen, t.LOCEXT), y;
      },
      centralHeaderToBinary: function() {
        var y = Buffer.alloc(t.CENHDR + d + E + g);
        return y.writeUInt32LE(t.CENSIG, 0), y.writeUInt16LE(a, t.CENVEM), y.writeUInt16LE(s, t.CENVER), y.writeUInt16LE(u, t.CENFLG), y.writeUInt16LE(o, t.CENHOW), y.writeUInt32LE(r, t.CENTIM), y.writeUInt32LE(f, t.CENCRC), y.writeUInt32LE(n, t.CENSIZ), y.writeUInt32LE(i, t.CENLEN), y.writeUInt16LE(d, t.CENNAM), y.writeUInt16LE(E, t.CENEXT), y.writeUInt16LE(g, t.CENCOM), y.writeUInt16LE(p, t.CENDSK), y.writeUInt16LE(w, t.CENATT), y.writeUInt32LE(b, t.CENATX), y.writeUInt32LE(l, t.CENOFF), y;
      },
      toJSON: function() {
        const y = function(v) {
          return v + " bytes";
        };
        return {
          made: a,
          version: s,
          flags: u,
          method: e.methodToString(o),
          time: this.time,
          crc: "0x" + f.toString(16).toUpperCase(),
          compressedSize: y(n),
          size: y(i),
          fileNameLength: y(d),
          extraLength: y(E),
          commentLength: y(g),
          diskNumStart: p,
          inAttr: w,
          attr: b,
          offset: l,
          centralHeaderSize: y(t.CENHDR + d + E + g)
        };
      },
      toString: function() {
        return JSON.stringify(this.toJSON(), null, "	");
      }
    };
  }, gi;
}
var _i, hc;
function Al() {
  if (hc) return _i;
  hc = 1;
  var e = at(), t = e.Constants;
  return _i = function() {
    var a = 0, s = 0, u = 0, o = 0, r = 0;
    return {
      get diskEntries() {
        return a;
      },
      set diskEntries(f) {
        a = s = f;
      },
      get totalEntries() {
        return s;
      },
      set totalEntries(f) {
        s = a = f;
      },
      get size() {
        return u;
      },
      set size(f) {
        u = f;
      },
      get offset() {
        return o;
      },
      set offset(f) {
        o = f;
      },
      get commentLength() {
        return r;
      },
      set commentLength(f) {
        r = f;
      },
      get mainHeaderSize() {
        return t.ENDHDR + r;
      },
      loadFromBinary: function(f) {
        if ((f.length !== t.ENDHDR || f.readUInt32LE(0) !== t.ENDSIG) && (f.length < t.ZIP64HDR || f.readUInt32LE(0) !== t.ZIP64SIG))
          throw e.Errors.INVALID_END();
        f.readUInt32LE(0) === t.ENDSIG ? (a = f.readUInt16LE(t.ENDSUB), s = f.readUInt16LE(t.ENDTOT), u = f.readUInt32LE(t.ENDSIZ), o = f.readUInt32LE(t.ENDOFF), r = f.readUInt16LE(t.ENDCOM)) : (a = e.readBigUInt64LE(f, t.ZIP64SUB), s = e.readBigUInt64LE(f, t.ZIP64TOT), u = e.readBigUInt64LE(f, t.ZIP64SIZE), o = e.readBigUInt64LE(f, t.ZIP64OFF), r = 0);
      },
      toBinary: function() {
        var f = Buffer.alloc(t.ENDHDR + r);
        return f.writeUInt32LE(t.ENDSIG, 0), f.writeUInt32LE(0, 4), f.writeUInt16LE(a, t.ENDSUB), f.writeUInt16LE(s, t.ENDTOT), f.writeUInt32LE(u, t.ENDSIZ), f.writeUInt32LE(o, t.ENDOFF), f.writeUInt16LE(r, t.ENDCOM), f.fill(" ", t.ENDHDR), f;
      },
      toJSON: function() {
        const f = function(n, i) {
          let d = n.toString(16).toUpperCase();
          for (; d.length < i; ) d = "0" + d;
          return "0x" + d;
        };
        return {
          diskEntries: a,
          totalEntries: s,
          size: u + " bytes",
          offset: f(o, 4),
          commentLength: r
        };
      },
      toString: function() {
        return JSON.stringify(this.toJSON(), null, "	");
      }
    };
  }, _i;
}
var mc;
function zc() {
  return mc || (mc = 1, hr.EntryHeader = Ll(), hr.MainHeader = Al()), hr;
}
var et = {}, Si, pc;
function Fl() {
  return pc || (pc = 1, Si = function(e) {
    var t = Rc, a = { chunkSize: (parseInt(e.length / 1024) + 1) * 1024 };
    return {
      deflate: function() {
        return t.deflateRawSync(e, a);
      },
      deflateAsync: function(s) {
        var u = t.createDeflateRaw(a), o = [], r = 0;
        u.on("data", function(f) {
          o.push(f), r += f.length;
        }), u.on("end", function() {
          var f = Buffer.alloc(r), n = 0;
          f.fill(0);
          for (var i = 0; i < o.length; i++) {
            var d = o[i];
            d.copy(f, n), n += d.length;
          }
          s && s(f);
        }), u.end(e);
      }
    };
  }), Si;
}
var wi, yc;
function ql() {
  if (yc) return wi;
  yc = 1;
  const e = +(process.versions ? process.versions.node : "").split(".")[0] || 0;
  return wi = function(t, a) {
    var s = Rc;
    const u = e >= 15 && a > 0 ? { maxOutputLength: a } : {};
    return {
      inflate: function() {
        return s.inflateRawSync(t, u);
      },
      inflateAsync: function(o) {
        var r = s.createInflateRaw(u), f = [], n = 0;
        r.on("data", function(i) {
          f.push(i), n += i.length;
        }), r.on("end", function() {
          var i = Buffer.alloc(n), d = 0;
          i.fill(0);
          for (var E = 0; E < f.length; E++) {
            var g = f[E];
            g.copy(i, d), d += g.length;
          }
          o && o(i);
        }), r.end(t);
      }
    };
  }, wi;
}
var $i, vc;
function kl() {
  if (vc) return $i;
  vc = 1;
  const { randomFillSync: e } = bc, t = xi(), a = new Uint32Array(256).map((p, w) => {
    for (let b = 0; b < 8; b++)
      w & 1 ? w = w >>> 1 ^ 3988292384 : w >>>= 1;
    return w >>> 0;
  }), s = (p, w) => Math.imul(p, w) >>> 0, u = (p, w) => a[(p ^ w) & 255] ^ p >>> 8, o = () => typeof e == "function" ? e(Buffer.alloc(12)) : o.node();
  o.node = () => {
    const p = Buffer.alloc(12), w = p.length;
    for (let b = 0; b < w; b++) p[b] = Math.random() * 256 & 255;
    return p;
  };
  const r = {
    genSalt: o
  };
  function f(p) {
    const w = Buffer.isBuffer(p) ? p : Buffer.from(p);
    this.keys = new Uint32Array([305419896, 591751049, 878082192]);
    for (let b = 0; b < w.length; b++)
      this.updateKeys(w[b]);
  }
  f.prototype.updateKeys = function(p) {
    const w = this.keys;
    return w[0] = u(w[0], p), w[1] += w[0] & 255, w[1] = s(w[1], 134775813) + 1, w[2] = u(w[2], w[1] >>> 24), p;
  }, f.prototype.next = function() {
    const p = (this.keys[2] | 2) >>> 0;
    return s(p, p ^ 1) >> 8 & 255;
  };
  function n(p) {
    const w = new f(p);
    return function(b) {
      const l = Buffer.alloc(b.length);
      let h = 0;
      for (let c of b)
        l[h++] = w.updateKeys(c ^ w.next());
      return l;
    };
  }
  function i(p) {
    const w = new f(p);
    return function(b, l, h = 0) {
      l || (l = Buffer.alloc(b.length));
      for (let c of b) {
        const m = w.next();
        l[h++] = c ^ m, w.updateKeys(c);
      }
      return l;
    };
  }
  function d(p, w, b) {
    if (!p || !Buffer.isBuffer(p) || p.length < 12)
      return Buffer.alloc(0);
    const l = n(b), h = l(p.slice(0, 12)), c = (w.flags & 8) === 8 ? w.timeHighByte : w.crc >>> 24;
    if (h[11] !== c)
      throw t.WRONG_PASSWORD();
    return l(p.slice(12));
  }
  function E(p) {
    Buffer.isBuffer(p) && p.length >= 12 ? r.genSalt = function() {
      return p.slice(0, 12);
    } : p === "node" ? r.genSalt = o.node : r.genSalt = o;
  }
  function g(p, w, b, l = !1) {
    p == null && (p = Buffer.alloc(0)), Buffer.isBuffer(p) || (p = Buffer.from(p.toString()));
    const h = i(b), c = r.genSalt();
    c[11] = w.crc >>> 24 & 255, l && (c[10] = w.crc >>> 16 & 255);
    const m = Buffer.alloc(p.length + 12);
    return h(c, m), h(p, m, 12);
  }
  return $i = { decrypt: d, encrypt: g, _salter: E }, $i;
}
var Ec;
function jl() {
  return Ec || (Ec = 1, et.Deflater = Fl(), et.Inflater = ql(), et.ZipCrypto = kl()), et;
}
var bi, gc;
function Vc() {
  if (gc) return bi;
  gc = 1;
  var e = at(), t = zc(), a = e.Constants, s = jl();
  return bi = function(u, o) {
    var r = new t.EntryHeader(), f = Buffer.alloc(0), n = Buffer.alloc(0), i = !1, d = null, E = Buffer.alloc(0), g = Buffer.alloc(0), p = !0;
    const w = u, b = typeof w.decoder == "object" ? w.decoder : e.decoder;
    p = b.hasOwnProperty("efs") ? b.efs : !1;
    function l() {
      return !o || !(o instanceof Uint8Array) ? Buffer.alloc(0) : (g = r.loadLocalHeaderFromBinary(o), o.slice(r.realDataOffset, r.realDataOffset + r.compressedSize));
    }
    function h(S) {
      if (r.flags_desc) {
        const $ = {}, O = r.realDataOffset + r.compressedSize;
        if (o.readUInt32LE(O) == a.LOCSIG || o.readUInt32LE(O) == a.CENSIG)
          throw e.Errors.DESCRIPTOR_NOT_EXIST();
        if (o.readUInt32LE(O) == a.EXTSIG)
          $.crc = o.readUInt32LE(O + a.EXTCRC), $.compressedSize = o.readUInt32LE(O + a.EXTSIZ), $.size = o.readUInt32LE(O + a.EXTLEN);
        else if (o.readUInt16LE(O + 12) === 19280)
          $.crc = o.readUInt32LE(O + a.EXTCRC - 4), $.compressedSize = o.readUInt32LE(O + a.EXTSIZ - 4), $.size = o.readUInt32LE(O + a.EXTLEN - 4);
        else
          throw e.Errors.DESCRIPTOR_UNKNOWN();
        if ($.compressedSize !== r.compressedSize || $.size !== r.size || $.crc !== r.crc)
          throw e.Errors.DESCRIPTOR_FAULTY();
        if (e.crc32(S) !== $.crc)
          return !1;
      } else if (e.crc32(S) !== r.localHeader.crc)
        return !1;
      return !0;
    }
    function c(S, $, O) {
      if (typeof $ > "u" && typeof S == "string" && (O = S, S = void 0), i)
        return S && $ && $(Buffer.alloc(0), e.Errors.DIRECTORY_CONTENT_ERROR()), Buffer.alloc(0);
      var T = l();
      if (T.length === 0)
        return S && $ && $(T), T;
      if (r.encrypted) {
        if (typeof O != "string" && !Buffer.isBuffer(O))
          throw e.Errors.INVALID_PASS_PARAM();
        T = s.ZipCrypto.decrypt(T, r, O);
      }
      var k = Buffer.alloc(r.size);
      switch (r.method) {
        case e.Constants.STORED:
          if (T.copy(k), h(k))
            return S && $ && $(k), k;
          throw S && $ && $(k, e.Errors.BAD_CRC()), e.Errors.BAD_CRC();
        case e.Constants.DEFLATED:
          var H = new s.Inflater(T, r.size);
          if (S)
            H.inflateAsync(function(U) {
              U.copy(U, 0), $ && (h(U) ? $(U) : $(U, e.Errors.BAD_CRC()));
            });
          else {
            if (H.inflate(k).copy(k, 0), !h(k))
              throw e.Errors.BAD_CRC(`"${b.decode(f)}"`);
            return k;
          }
          break;
        default:
          throw S && $ && $(Buffer.alloc(0), e.Errors.UNKNOWN_METHOD()), e.Errors.UNKNOWN_METHOD();
      }
    }
    function m(S, $) {
      if ((!d || !d.length) && Buffer.isBuffer(o))
        return S && $ && $(l()), l();
      if (d.length && !i) {
        var O;
        switch (r.method) {
          case e.Constants.STORED:
            return r.compressedSize = r.size, O = Buffer.alloc(d.length), d.copy(O), S && $ && $(O), O;
          default:
          case e.Constants.DEFLATED:
            var T = new s.Deflater(d);
            if (S)
              T.deflateAsync(function(H) {
                O = Buffer.alloc(H.length), r.compressedSize = H.length, H.copy(O), $ && $(O);
              });
            else {
              var k = T.deflate();
              return r.compressedSize = k.length, k;
            }
            T = null;
            break;
        }
      } else if (S && $)
        $(Buffer.alloc(0));
      else
        return Buffer.alloc(0);
    }
    function y(S, $) {
      return (S.readUInt32LE($ + 4) << 4) + S.readUInt32LE($);
    }
    function v(S) {
      try {
        for (var $ = 0, O, T, k; $ + 4 < S.length; )
          O = S.readUInt16LE($), $ += 2, T = S.readUInt16LE($), $ += 2, k = S.slice($, $ + T), $ += T, a.ID_ZIP64 === O && _(k);
      } catch {
        throw e.Errors.EXTRA_FIELD_PARSE_ERROR();
      }
    }
    function _(S) {
      var $, O, T, k;
      S.length >= a.EF_ZIP64_SCOMP && ($ = y(S, a.EF_ZIP64_SUNCOMP), r.size === a.EF_ZIP64_OR_32 && (r.size = $)), S.length >= a.EF_ZIP64_RHO && (O = y(S, a.EF_ZIP64_SCOMP), r.compressedSize === a.EF_ZIP64_OR_32 && (r.compressedSize = O)), S.length >= a.EF_ZIP64_DSN && (T = y(S, a.EF_ZIP64_RHO), r.offset === a.EF_ZIP64_OR_32 && (r.offset = T)), S.length >= a.EF_ZIP64_DSN + 4 && (k = S.readUInt32LE(a.EF_ZIP64_DSN), r.diskNumStart === a.EF_ZIP64_OR_16 && (r.diskNumStart = k));
    }
    return {
      get entryName() {
        return b.decode(f);
      },
      get rawEntryName() {
        return f;
      },
      set entryName(S) {
        f = e.toBuffer(S, b.encode);
        var $ = f[f.length - 1];
        i = $ === 47 || $ === 92, r.fileNameLength = f.length;
      },
      get efs() {
        return typeof p == "function" ? p(this.entryName) : p;
      },
      get extra() {
        return E;
      },
      set extra(S) {
        E = S, r.extraLength = S.length, v(S);
      },
      get comment() {
        return b.decode(n);
      },
      set comment(S) {
        if (n = e.toBuffer(S, b.encode), r.commentLength = n.length, n.length > 65535) throw e.Errors.COMMENT_TOO_LONG();
      },
      get name() {
        var S = b.decode(f);
        return i ? S.substr(S.length - 1).split("/").pop() : S.split("/").pop();
      },
      get isDirectory() {
        return i;
      },
      getCompressedData: function() {
        return m(!1, null);
      },
      getCompressedDataAsync: function(S) {
        m(!0, S);
      },
      setData: function(S) {
        d = e.toBuffer(S, e.decoder.encode), !i && d.length ? (r.size = d.length, r.method = e.Constants.DEFLATED, r.crc = e.crc32(S), r.changed = !0) : r.method = e.Constants.STORED;
      },
      getData: function(S) {
        return r.changed ? d : c(!1, null, S);
      },
      getDataAsync: function(S, $) {
        r.changed ? S(d) : c(!0, S, $);
      },
      set attr(S) {
        r.attr = S;
      },
      get attr() {
        return r.attr;
      },
      set header(S) {
        r.loadFromBinary(S);
      },
      get header() {
        return r;
      },
      packCentralHeader: function() {
        r.flags_efs = this.efs, r.extraLength = E.length;
        var S = r.centralHeaderToBinary(), $ = e.Constants.CENHDR;
        return f.copy(S, $), $ += f.length, E.copy(S, $), $ += r.extraLength, n.copy(S, $), S;
      },
      packLocalHeader: function() {
        let S = 0;
        r.flags_efs = this.efs, r.extraLocalLength = g.length;
        const $ = r.localHeaderToBinary(), O = Buffer.alloc($.length + f.length + r.extraLocalLength);
        return $.copy(O, S), S += $.length, f.copy(O, S), S += f.length, g.copy(O, S), S += g.length, O;
      },
      toJSON: function() {
        const S = function($) {
          return "<" + ($ && $.length + " bytes buffer" || "null") + ">";
        };
        return {
          entryName: this.entryName,
          name: this.name,
          comment: this.comment,
          isDirectory: this.isDirectory,
          header: r.toJSON(),
          compressedData: S(o),
          data: S(d)
        };
      },
      toString: function() {
        return JSON.stringify(this.toJSON(), null, "	");
      }
    };
  }, bi;
}
var Ri, _c;
function Ml() {
  if (_c) return Ri;
  _c = 1;
  const e = Vc(), t = zc(), a = at();
  return Ri = function(s, u) {
    var o = [], r = {}, f = Buffer.alloc(0), n = new t.MainHeader(), i = !1;
    const d = /* @__PURE__ */ new Set(), E = u, { noSort: g, decoder: p } = E;
    s ? l(E.readEntries) : i = !0;
    function w() {
      const c = /* @__PURE__ */ new Set();
      for (const m of Object.keys(r)) {
        const y = m.split("/");
        if (y.pop(), !!y.length)
          for (let v = 0; v < y.length; v++) {
            const _ = y.slice(0, v + 1).join("/") + "/";
            c.add(_);
          }
      }
      for (const m of c)
        if (!(m in r)) {
          const y = new e(E);
          y.entryName = m, y.attr = 16, y.temporary = !0, o.push(y), r[y.entryName] = y, d.add(y);
        }
    }
    function b() {
      if (i = !0, r = {}, n.diskEntries > (s.length - n.offset) / a.Constants.CENHDR)
        throw a.Errors.DISK_ENTRY_TOO_LARGE();
      o = new Array(n.diskEntries);
      for (var c = n.offset, m = 0; m < o.length; m++) {
        var y = c, v = new e(E, s);
        v.header = s.slice(y, y += a.Constants.CENHDR), v.entryName = s.slice(y, y += v.header.fileNameLength), v.header.extraLength && (v.extra = s.slice(y, y += v.header.extraLength)), v.header.commentLength && (v.comment = s.slice(y, y + v.header.commentLength)), c += v.header.centralHeaderSize, o[m] = v, r[v.entryName] = v;
      }
      d.clear(), w();
    }
    function l(c) {
      var m = s.length - a.Constants.ENDHDR, y = Math.max(0, m - 65535), v = y, _ = s.length, S = -1, $ = 0;
      for ((typeof E.trailingSpace == "boolean" ? E.trailingSpace : !1) && (y = 0), m; m >= v; m--)
        if (s[m] === 80) {
          if (s.readUInt32LE(m) === a.Constants.ENDSIG) {
            S = m, $ = m, _ = m + a.Constants.ENDHDR, v = m - a.Constants.END64HDR;
            continue;
          }
          if (s.readUInt32LE(m) === a.Constants.END64SIG) {
            v = y;
            continue;
          }
          if (s.readUInt32LE(m) === a.Constants.ZIP64SIG) {
            S = m, _ = m + a.readBigUInt64LE(s, m + a.Constants.ZIP64SIZE) + a.Constants.ZIP64LEAD;
            break;
          }
        }
      if (S == -1) throw a.Errors.INVALID_FORMAT();
      n.loadFromBinary(s.slice(S, _)), n.commentLength && (f = s.slice($ + a.Constants.ENDHDR)), c && b();
    }
    function h() {
      o.length > 1 && !g && o.sort((c, m) => c.entryName.toLowerCase().localeCompare(m.entryName.toLowerCase()));
    }
    return {
      /**
       * Returns an array of ZipEntry objects existent in the current opened archive
       * @return Array
       */
      get entries() {
        return i || b(), o.filter((c) => !d.has(c));
      },
      /**
       * Archive comment
       * @return {String}
       */
      get comment() {
        return p.decode(f);
      },
      set comment(c) {
        f = a.toBuffer(c, p.encode), n.commentLength = f.length;
      },
      getEntryCount: function() {
        return i ? o.length : n.diskEntries;
      },
      forEach: function(c) {
        this.entries.forEach(c);
      },
      /**
       * Returns a reference to the entry with the given name or null if entry is inexistent
       *
       * @param entryName
       * @return ZipEntry
       */
      getEntry: function(c) {
        return i || b(), r[c] || null;
      },
      /**
       * Adds the given entry to the entry list
       *
       * @param entry
       */
      setEntry: function(c) {
        i || b(), o.push(c), r[c.entryName] = c, n.totalEntries = o.length;
      },
      /**
       * Removes the file with the given name from the entry list.
       *
       * If the entry is a directory, then all nested files and directories will be removed
       * @param entryName
       * @returns {void}
       */
      deleteFile: function(c, m = !0) {
        i || b();
        const y = r[c];
        this.getEntryChildren(y, m).map((_) => _.entryName).forEach(this.deleteEntry);
      },
      /**
       * Removes the entry with the given name from the entry list.
       *
       * @param {string} entryName
       * @returns {void}
       */
      deleteEntry: function(c) {
        i || b();
        const m = r[c], y = o.indexOf(m);
        y >= 0 && (o.splice(y, 1), delete r[c], n.totalEntries = o.length);
      },
      /**
       *  Iterates and returns all nested files and directories of the given entry
       *
       * @param entry
       * @return Array
       */
      getEntryChildren: function(c, m = !0) {
        if (i || b(), typeof c == "object")
          if (c.isDirectory && m) {
            const y = [], v = c.entryName;
            for (const _ of o)
              _.entryName.startsWith(v) && y.push(_);
            return y;
          } else
            return [c];
        return [];
      },
      /**
       *  How many child elements entry has
       *
       * @param {ZipEntry} entry
       * @return {integer}
       */
      getChildCount: function(c) {
        if (c && c.isDirectory) {
          const m = this.getEntryChildren(c);
          return m.includes(c) ? m.length - 1 : m.length;
        }
        return 0;
      },
      /**
       * Returns the zip file
       *
       * @return Buffer
       */
      compressToBuffer: function() {
        i || b(), h();
        const c = [], m = [];
        let y = 0, v = 0;
        n.size = 0, n.offset = 0;
        let _ = 0;
        for (const O of this.entries) {
          const T = O.getCompressedData();
          O.header.offset = v;
          const k = O.packLocalHeader(), H = k.length + T.length;
          v += H, c.push(k), c.push(T);
          const U = O.packCentralHeader();
          m.push(U), n.size += U.length, y += H + U.length, _++;
        }
        y += n.mainHeaderSize, n.offset = v, n.totalEntries = _, v = 0;
        const S = Buffer.alloc(y);
        for (const O of c)
          O.copy(S, v), v += O.length;
        for (const O of m)
          O.copy(S, v), v += O.length;
        const $ = n.toBinary();
        return f && f.copy($, a.Constants.ENDHDR), $.copy(S, v), s = S, i = !1, S;
      },
      toAsyncBuffer: function(c, m, y, v) {
        try {
          i || b(), h();
          const _ = [], S = [];
          let $ = 0, O = 0, T = 0;
          n.size = 0, n.offset = 0;
          const k = function(H) {
            if (H.length > 0) {
              const U = H.shift(), z = U.entryName + U.extra.toString();
              y && y(z), U.getCompressedDataAsync(function(V) {
                v && v(z), U.header.offset = O;
                const Z = U.packLocalHeader(), B = Z.length + V.length;
                O += B, _.push(Z), _.push(V);
                const A = U.packCentralHeader();
                S.push(A), n.size += A.length, $ += B + A.length, T++, k(H);
              });
            } else {
              $ += n.mainHeaderSize, n.offset = O, n.totalEntries = T, O = 0;
              const U = Buffer.alloc($);
              _.forEach(function(V) {
                V.copy(U, O), O += V.length;
              }), S.forEach(function(V) {
                V.copy(U, O), O += V.length;
              });
              const z = n.toBinary();
              f && f.copy(z, a.Constants.ENDHDR), z.copy(U, O), s = U, i = !1, c(U);
            }
          };
          k(Array.from(this.entries));
        } catch (_) {
          m(_);
        }
      }
    };
  }, Ri;
}
var Oi, Sc;
function xl() {
  if (Sc) return Oi;
  Sc = 1;
  const e = at(), t = ue, a = Vc(), s = Ml(), u = (...n) => e.findLast(n, (i) => typeof i == "boolean"), o = (...n) => e.findLast(n, (i) => typeof i == "string"), r = (...n) => e.findLast(n, (i) => typeof i == "function"), f = {
    // option "noSort" : if true it disables files sorting
    noSort: !1,
    // read entries during load (initial loading may be slower)
    readEntries: !1,
    // default method is none
    method: e.Constants.NONE,
    // file system
    fs: null
  };
  return Oi = function(n, i) {
    let d = null;
    const E = Object.assign(/* @__PURE__ */ Object.create(null), f);
    n && typeof n == "object" && (n instanceof Uint8Array || (Object.assign(E, n), n = E.input ? E.input : void 0, E.input && delete E.input), Buffer.isBuffer(n) && (d = n, E.method = e.Constants.BUFFER, n = void 0)), Object.assign(E, i);
    const g = new e(E);
    if ((typeof E.decoder != "object" || typeof E.decoder.encode != "function" || typeof E.decoder.decode != "function") && (E.decoder = e.decoder), n && typeof n == "string")
      if (g.fs.existsSync(n))
        E.method = e.Constants.FILE, E.filename = n, d = g.fs.readFileSync(n);
      else
        throw e.Errors.INVALID_FILENAME();
    const p = new s(d, E), { canonical: w, sanitize: b, zipnamefix: l } = e;
    function h(v) {
      if (v && p) {
        var _;
        if (typeof v == "string" && (_ = p.getEntry(t.posix.normalize(v))), typeof v == "object" && typeof v.entryName < "u" && typeof v.header < "u" && (_ = p.getEntry(v.entryName)), _)
          return _;
      }
      return null;
    }
    function c(v) {
      const { join: _, normalize: S, sep: $ } = t.posix;
      return _(".", S($ + v.split("\\").join($) + $));
    }
    function m(v) {
      return v instanceof RegExp ? /* @__PURE__ */ function(_) {
        return function(S) {
          return _.test(S);
        };
      }(v) : typeof v != "function" ? () => !0 : v;
    }
    const y = (v, _) => {
      let S = _.slice(-1);
      return S = S === g.sep ? g.sep : "", t.relative(v, _) + S;
    };
    return {
      /**
       * Extracts the given entry from the archive and returns the content as a Buffer object
       * @param {ZipEntry|string} entry ZipEntry object or String with the full path of the entry
       * @param {Buffer|string} [pass] - password
       * @return Buffer or Null in case of error
       */
      readFile: function(v, _) {
        var S = h(v);
        return S && S.getData(_) || null;
      },
      /**
       * Returns how many child elements has on entry (directories) on files it is always 0
       * @param {ZipEntry|string} entry ZipEntry object or String with the full path of the entry
       * @returns {integer}
       */
      childCount: function(v) {
        const _ = h(v);
        if (_)
          return p.getChildCount(_);
      },
      /**
       * Asynchronous readFile
       * @param {ZipEntry|string} entry ZipEntry object or String with the full path of the entry
       * @param {callback} callback
       *
       * @return Buffer or Null in case of error
       */
      readFileAsync: function(v, _) {
        var S = h(v);
        S ? S.getDataAsync(_) : _(null, "getEntry failed for:" + v);
      },
      /**
       * Extracts the given entry from the archive and returns the content as plain text in the given encoding
       * @param {ZipEntry|string} entry - ZipEntry object or String with the full path of the entry
       * @param {string} encoding - Optional. If no encoding is specified utf8 is used
       *
       * @return String
       */
      readAsText: function(v, _) {
        var S = h(v);
        if (S) {
          var $ = S.getData();
          if ($ && $.length)
            return $.toString(_ || "utf8");
        }
        return "";
      },
      /**
       * Asynchronous readAsText
       * @param {ZipEntry|string} entry ZipEntry object or String with the full path of the entry
       * @param {callback} callback
       * @param {string} [encoding] - Optional. If no encoding is specified utf8 is used
       *
       * @return String
       */
      readAsTextAsync: function(v, _, S) {
        var $ = h(v);
        $ ? $.getDataAsync(function(O, T) {
          if (T) {
            _(O, T);
            return;
          }
          O && O.length ? _(O.toString(S || "utf8")) : _("");
        }) : _("");
      },
      /**
       * Remove the entry from the file or the entry and all it's nested directories and files if the given entry is a directory
       *
       * @param {ZipEntry|string} entry
       * @returns {void}
       */
      deleteFile: function(v, _ = !0) {
        var S = h(v);
        S && p.deleteFile(S.entryName, _);
      },
      /**
       * Remove the entry from the file or directory without affecting any nested entries
       *
       * @param {ZipEntry|string} entry
       * @returns {void}
       */
      deleteEntry: function(v) {
        var _ = h(v);
        _ && p.deleteEntry(_.entryName);
      },
      /**
       * Adds a comment to the zip. The zip must be rewritten after adding the comment.
       *
       * @param {string} comment
       */
      addZipComment: function(v) {
        p.comment = v;
      },
      /**
       * Returns the zip comment
       *
       * @return String
       */
      getZipComment: function() {
        return p.comment || "";
      },
      /**
       * Adds a comment to a specified zipEntry. The zip must be rewritten after adding the comment
       * The comment cannot exceed 65535 characters in length
       *
       * @param {ZipEntry} entry
       * @param {string} comment
       */
      addZipEntryComment: function(v, _) {
        var S = h(v);
        S && (S.comment = _);
      },
      /**
       * Returns the comment of the specified entry
       *
       * @param {ZipEntry} entry
       * @return String
       */
      getZipEntryComment: function(v) {
        var _ = h(v);
        return _ && _.comment || "";
      },
      /**
       * Updates the content of an existing entry inside the archive. The zip must be rewritten after updating the content
       *
       * @param {ZipEntry} entry
       * @param {Buffer} content
       */
      updateFile: function(v, _) {
        var S = h(v);
        S && S.setData(_);
      },
      /**
       * Adds a file from the disk to the archive
       *
       * @param {string} localPath File to add to zip
       * @param {string} [zipPath] Optional path inside the zip
       * @param {string} [zipName] Optional name for the file
       * @param {string} [comment] Optional file comment
       */
      addLocalFile: function(v, _, S, $) {
        if (g.fs.existsSync(v)) {
          _ = _ ? c(_) : "";
          const O = t.win32.basename(t.win32.normalize(v));
          _ += S || O;
          const T = g.fs.statSync(v), k = T.isFile() ? g.fs.readFileSync(v) : Buffer.alloc(0);
          T.isDirectory() && (_ += g.sep), this.addFile(_, k, $, T);
        } else
          throw e.Errors.FILE_NOT_FOUND(v);
      },
      /**
       * Callback for showing if everything was done.
       *
       * @callback doneCallback
       * @param {Error} err - Error object
       * @param {boolean} done - was request fully completed
       */
      /**
       * Adds a file from the disk to the archive
       *
       * @param {(object|string)} options - options object, if it is string it us used as localPath.
       * @param {string} options.localPath - Local path to the file.
       * @param {string} [options.comment] - Optional file comment.
       * @param {string} [options.zipPath] - Optional path inside the zip
       * @param {string} [options.zipName] - Optional name for the file
       * @param {doneCallback} callback - The callback that handles the response.
       */
      addLocalFileAsync: function(v, _) {
        v = typeof v == "object" ? v : { localPath: v };
        const S = t.resolve(v.localPath), { comment: $ } = v;
        let { zipPath: O, zipName: T } = v;
        const k = this;
        g.fs.stat(S, function(H, U) {
          if (H) return _(H, !1);
          O = O ? c(O) : "";
          const z = t.win32.basename(t.win32.normalize(S));
          if (O += T || z, U.isFile())
            g.fs.readFile(S, function(V, Z) {
              return V ? _(V, !1) : (k.addFile(O, Z, $, U), setImmediate(_, void 0, !0));
            });
          else if (U.isDirectory())
            return O += g.sep, k.addFile(O, Buffer.alloc(0), $, U), setImmediate(_, void 0, !0);
        });
      },
      /**
       * Adds a local directory and all its nested files and directories to the archive
       *
       * @param {string} localPath - local path to the folder
       * @param {string} [zipPath] - optional path inside zip
       * @param {(RegExp|function)} [filter] - optional RegExp or Function if files match will be included.
       */
      addLocalFolder: function(v, _, S) {
        if (S = m(S), _ = _ ? c(_) : "", v = t.normalize(v), g.fs.existsSync(v)) {
          const $ = g.findFiles(v), O = this;
          if ($.length)
            for (const T of $) {
              const k = t.join(_, y(v, T));
              S(k) && O.addLocalFile(T, t.dirname(k));
            }
        } else
          throw e.Errors.FILE_NOT_FOUND(v);
      },
      /**
       * Asynchronous addLocalFolder
       * @param {string} localPath
       * @param {callback} callback
       * @param {string} [zipPath] optional path inside zip
       * @param {RegExp|function} [filter] optional RegExp or Function if files match will
       *               be included.
       */
      addLocalFolderAsync: function(v, _, S, $) {
        $ = m($), S = S ? c(S) : "", v = t.normalize(v);
        var O = this;
        g.fs.open(v, "r", function(T) {
          if (T && T.code === "ENOENT")
            _(void 0, e.Errors.FILE_NOT_FOUND(v));
          else if (T)
            _(void 0, T);
          else {
            var k = g.findFiles(v), H = -1, U = function() {
              if (H += 1, H < k.length) {
                var z = k[H], V = y(v, z).split("\\").join("/");
                V = V.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\x20-\x7E]/g, ""), $(V) ? g.fs.stat(z, function(Z, B) {
                  Z && _(void 0, Z), B.isFile() ? g.fs.readFile(z, function(A, x) {
                    A ? _(void 0, A) : (O.addFile(S + V, x, "", B), U());
                  }) : (O.addFile(S + V + "/", Buffer.alloc(0), "", B), U());
                }) : process.nextTick(() => {
                  U();
                });
              } else
                _(!0, void 0);
            };
            U();
          }
        });
      },
      /**
       * Adds a local directory and all its nested files and directories to the archive
       *
       * @param {object | string} options - options object, if it is string it us used as localPath.
       * @param {string} options.localPath - Local path to the folder.
       * @param {string} [options.zipPath] - optional path inside zip.
       * @param {RegExp|function} [options.filter] - optional RegExp or Function if files match will be included.
       * @param {function|string} [options.namefix] - optional function to help fix filename
       * @param {doneCallback} callback - The callback that handles the response.
       *
       */
      addLocalFolderAsync2: function(v, _) {
        const S = this;
        v = typeof v == "object" ? v : { localPath: v }, localPath = t.resolve(c(v.localPath));
        let { zipPath: $, filter: O, namefix: T } = v;
        O instanceof RegExp ? O = /* @__PURE__ */ function(U) {
          return function(z) {
            return U.test(z);
          };
        }(O) : typeof O != "function" && (O = function() {
          return !0;
        }), $ = $ ? c($) : "", T == "latin1" && (T = (U) => U.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\x20-\x7E]/g, "")), typeof T != "function" && (T = (U) => U);
        const k = (U) => t.join($, T(y(localPath, U))), H = (U) => t.win32.basename(t.win32.normalize(T(U)));
        g.fs.open(localPath, "r", function(U) {
          U && U.code === "ENOENT" ? _(void 0, e.Errors.FILE_NOT_FOUND(localPath)) : U ? _(void 0, U) : g.findFilesAsync(localPath, function(z, V) {
            if (z) return _(z);
            V = V.filter((Z) => O(k(Z))), V.length || _(void 0, !1), setImmediate(
              V.reverse().reduce(function(Z, B) {
                return function(A, x) {
                  if (A || x === !1) return setImmediate(Z, A, !1);
                  S.addLocalFileAsync(
                    {
                      localPath: B,
                      zipPath: t.dirname(k(B)),
                      zipName: H(B)
                    },
                    Z
                  );
                };
              }, _)
            );
          });
        });
      },
      /**
       * Adds a local directory and all its nested files and directories to the archive
       *
       * @param {string} localPath - path where files will be extracted
       * @param {object} props - optional properties
       * @param {string} [props.zipPath] - optional path inside zip
       * @param {RegExp|function} [props.filter] - optional RegExp or Function if files match will be included.
       * @param {function|string} [props.namefix] - optional function to help fix filename
       */
      addLocalFolderPromise: function(v, _) {
        return new Promise((S, $) => {
          this.addLocalFolderAsync2(Object.assign({ localPath: v }, _), (O, T) => {
            O && $(O), T && S(this);
          });
        });
      },
      /**
       * Allows you to create a entry (file or directory) in the zip file.
       * If you want to create a directory the entryName must end in / and a null buffer should be provided.
       * Comment and attributes are optional
       *
       * @param {string} entryName
       * @param {Buffer | string} content - file content as buffer or utf8 coded string
       * @param {string} [comment] - file comment
       * @param {number | object} [attr] - number as unix file permissions, object as filesystem Stats object
       */
      addFile: function(v, _, S, $) {
        v = l(v);
        let O = h(v);
        const T = O != null;
        T || (O = new a(E), O.entryName = v), O.comment = S || "";
        const k = typeof $ == "object" && $ instanceof g.fs.Stats;
        k && (O.header.time = $.mtime);
        var H = O.isDirectory ? 16 : 0;
        let U = O.isDirectory ? 16384 : 32768;
        return k ? U |= 4095 & $.mode : typeof $ == "number" ? U |= 4095 & $ : U |= O.isDirectory ? 493 : 420, H = (H | U << 16) >>> 0, O.attr = H, O.setData(_), T || p.setEntry(O), O;
      },
      /**
       * Returns an array of ZipEntry objects representing the files and folders inside the archive
       *
       * @param {string} [password]
       * @returns Array
       */
      getEntries: function(v) {
        return p.password = v, p ? p.entries : [];
      },
      /**
       * Returns a ZipEntry object representing the file or folder specified by ``name``.
       *
       * @param {string} name
       * @return ZipEntry
       */
      getEntry: function(v) {
        return h(v);
      },
      getEntryCount: function() {
        return p.getEntryCount();
      },
      forEach: function(v) {
        return p.forEach(v);
      },
      /**
       * Extracts the given entry to the given targetPath
       * If the entry is a directory inside the archive, the entire directory and it's subdirectories will be extracted
       *
       * @param {string|ZipEntry} entry - ZipEntry object or String with the full path of the entry
       * @param {string} targetPath - Target folder where to write the file
       * @param {boolean} [maintainEntryPath=true] - If maintainEntryPath is true and the entry is inside a folder, the entry folder will be created in targetPath as well. Default is TRUE
       * @param {boolean} [overwrite=false] - If the file already exists at the target path, the file will be overwriten if this is true.
       * @param {boolean} [keepOriginalPermission=false] - The file will be set as the permission from the entry if this is true.
       * @param {string} [outFileName] - String If set will override the filename of the extracted file (Only works if the entry is a file)
       *
       * @return Boolean
       */
      extractEntryTo: function(v, _, S, $, O, T) {
        $ = u(!1, $), O = u(!1, O), S = u(!0, S), T = o(O, T);
        var k = h(v);
        if (!k)
          throw e.Errors.NO_ENTRY();
        var H = w(k.entryName), U = b(_, T && !k.isDirectory ? T : S ? H : t.basename(H));
        if (k.isDirectory) {
          var z = p.getEntryChildren(k);
          return z.forEach(function(B) {
            if (B.isDirectory) return;
            var A = B.getData();
            if (!A)
              throw e.Errors.CANT_EXTRACT_FILE();
            var x = w(B.entryName), D = b(_, S ? x : t.basename(x));
            const C = O ? B.header.fileAttr : void 0;
            g.writeFileTo(D, A, $, C);
          }), !0;
        }
        var V = k.getData(p.password);
        if (!V) throw e.Errors.CANT_EXTRACT_FILE();
        if (g.fs.existsSync(U) && !$)
          throw e.Errors.CANT_OVERRIDE();
        const Z = O ? v.header.fileAttr : void 0;
        return g.writeFileTo(U, V, $, Z), !0;
      },
      /**
       * Test the archive
       * @param {string} [pass]
       */
      test: function(v) {
        if (!p)
          return !1;
        for (var _ in p.entries)
          try {
            if (_.isDirectory)
              continue;
            var S = p.entries[_].getData(v);
            if (!S)
              return !1;
          } catch {
            return !1;
          }
        return !0;
      },
      /**
       * Extracts the entire archive to the given location
       *
       * @param {string} targetPath Target location
       * @param {boolean} [overwrite=false] If the file already exists at the target path, the file will be overwriten if this is true.
       *                  Default is FALSE
       * @param {boolean} [keepOriginalPermission=false] The file will be set as the permission from the entry if this is true.
       *                  Default is FALSE
       * @param {string|Buffer} [pass] password
       */
      extractAllTo: function(v, _, S, $) {
        if (S = u(!1, S), $ = o(S, $), _ = u(!1, _), !p) throw e.Errors.NO_ZIP();
        p.entries.forEach(function(O) {
          var T = b(v, w(O.entryName));
          if (O.isDirectory) {
            g.makeDir(T);
            return;
          }
          var k = O.getData($);
          if (!k)
            throw e.Errors.CANT_EXTRACT_FILE();
          const H = S ? O.header.fileAttr : void 0;
          g.writeFileTo(T, k, _, H);
          try {
            g.fs.utimesSync(T, O.header.time, O.header.time);
          } catch {
            throw e.Errors.CANT_EXTRACT_FILE();
          }
        });
      },
      /**
       * Asynchronous extractAllTo
       *
       * @param {string} targetPath Target location
       * @param {boolean} [overwrite=false] If the file already exists at the target path, the file will be overwriten if this is true.
       *                  Default is FALSE
       * @param {boolean} [keepOriginalPermission=false] The file will be set as the permission from the entry if this is true.
       *                  Default is FALSE
       * @param {function} callback The callback will be executed when all entries are extracted successfully or any error is thrown.
       */
      extractAllToAsync: function(v, _, S, $) {
        if ($ = r(_, S, $), S = u(!1, S), _ = u(!1, _), !$)
          return new Promise((U, z) => {
            this.extractAllToAsync(v, _, S, function(V) {
              V ? z(V) : U(this);
            });
          });
        if (!p) {
          $(e.Errors.NO_ZIP());
          return;
        }
        v = t.resolve(v);
        const O = (U) => b(v, t.normalize(w(U.entryName))), T = (U, z) => new Error(U + ': "' + z + '"'), k = [], H = [];
        p.entries.forEach((U) => {
          U.isDirectory ? k.push(U) : H.push(U);
        });
        for (const U of k) {
          const z = O(U), V = S ? U.header.fileAttr : void 0;
          try {
            g.makeDir(z), V && g.fs.chmodSync(z, V), g.fs.utimesSync(z, U.header.time, U.header.time);
          } catch {
            $(T("Unable to create folder", z));
          }
        }
        H.reverse().reduce(function(U, z) {
          return function(V) {
            if (V)
              U(V);
            else {
              const Z = t.normalize(w(z.entryName)), B = b(v, Z);
              z.getDataAsync(function(A, x) {
                if (x)
                  U(x);
                else if (!A)
                  U(e.Errors.CANT_EXTRACT_FILE());
                else {
                  const D = S ? z.header.fileAttr : void 0;
                  g.writeFileToAsync(B, A, _, D, function(C) {
                    C || U(T("Unable to write file", B)), g.fs.utimes(B, z.header.time, z.header.time, function(j) {
                      j ? U(T("Unable to set times", B)) : U();
                    });
                  });
                }
              });
            }
          };
        }, $)();
      },
      /**
       * Writes the newly created zip file to disk at the specified location or if a zip was opened and no ``targetFileName`` is provided, it will overwrite the opened zip
       *
       * @param {string} targetFileName
       * @param {function} callback
       */
      writeZip: function(v, _) {
        if (arguments.length === 1 && typeof v == "function" && (_ = v, v = ""), !v && E.filename && (v = E.filename), !!v) {
          var S = p.compressToBuffer();
          if (S) {
            var $ = g.writeFileTo(v, S, !0);
            typeof _ == "function" && _($ ? null : new Error("failed"), "");
          }
        }
      },
      /**
      	         *
      	         * @param {string} targetFileName
      	         * @param {object} [props]
      	         * @param {boolean} [props.overwrite=true] If the file already exists at the target path, the file will be overwriten if this is true.
      	         * @param {boolean} [props.perm] The file will be set as the permission from the entry if this is true.
      
      	         * @returns {Promise<void>}
      	         */
      writeZipPromise: function(v, _) {
        const { overwrite: S, perm: $ } = Object.assign({ overwrite: !0 }, _);
        return new Promise((O, T) => {
          !v && E.filename && (v = E.filename), v || T("ADM-ZIP: ZIP File Name Missing"), this.toBufferPromise().then((k) => {
            const H = (U) => U ? O(U) : T("ADM-ZIP: Wasn't able to write zip file");
            g.writeFileToAsync(v, k, S, $, H);
          }, T);
        });
      },
      /**
       * @returns {Promise<Buffer>} A promise to the Buffer.
       */
      toBufferPromise: function() {
        return new Promise((v, _) => {
          p.toAsyncBuffer(v, _);
        });
      },
      /**
       * Returns the content of the entire zip file as a Buffer object
       *
       * @prop {function} [onSuccess]
       * @prop {function} [onFail]
       * @prop {function} [onItemStart]
       * @prop {function} [onItemEnd]
       * @returns {Buffer}
       */
      toBuffer: function(v, _, S, $) {
        return typeof v == "function" ? (p.toAsyncBuffer(v, _, S, $), null) : p.compressToBuffer();
      }
    };
  }, Oi;
}
var Ul = xl();
const wc = /* @__PURE__ */ Oc(Ul);
class Ui {
  constructor(t, a, s) {
    this.bw = t, this.version = a, this.path_htm = s, console.log = (o) => this.bw.webContents.send("log", o), t.webContents.on("devtools-opened", () => this.#c()), ae.handle("openDevTools", () => t.webContents.openDevTools()), this.#l.getVersion = a, ae.handle("getInfo", () => this.#l), ae.handle("inited", (o, r, f) => this.#m(r, f)), ae.handle("existsSync", (o, r) => $e.existsSync(r)), ae.handle("copySync", (o, r, f) => $e.copySync(r, f)), ae.handle("removeSync", (o, r) => $e.removeSync(r)), ae.handle("ensureFileSync", (o, r) => $e.ensureFileSync(r)), ae.handle("readFileSync", (o, r) => $e.readFileSync(r, { encoding: "utf8" })), ae.handle("writeFileSync", (o, r, f, n) => $e.writeFileSync(r, f, n)), ae.handle("appendFile", (o, r, f) => $e.appendFile(r, f).catch((n) => console.log(n))), ae.handle("outputFile", (o, r, f) => $e.outputFile(r, f).catch((n) => console.log(n))), ae.handle("win_close", () => t.close()), ae.handle("win_setTitle", (o, r) => t.setTitle(r)), ae.handle("showMessageBox", (o, r) => Hc.showMessageBox(r)), ae.handle("capturePage", (o, r, f, n) => t.webContents.capturePage().then((i) => {
      $e.ensureFileSync(r);
      const d = i.resize({ width: f, height: n, quality: "best" }), E = r.endsWith(".png") ? d.toPNG() : d.toJPEG(80);
      $e.writeFileSync(r, E);
    })), ae.handle("navigate_to", (o, r) => Wc.openExternal(r));
    let u;
    ae.handle("Store", (o, r) => {
      u = new sc(r);
    }), ae.handle("flush", (o, r) => {
      u.store = r;
    }), ae.handle("Store_isEmpty", () => u.size === 0), ae.handle("Store_get", () => u.store), ae.handle("zip", (o, r, f) => {
      const n = new wc();
      n.addLocalFolder(r), n.writeZip(f);
    }), ae.handle("unzip", (o, r, f) => {
      $e.removeSync(f), $e.ensureDirSync(f), new wc(r).extractAllTo(f, !0);
    }), ae.handle("isSimpleFullScreen", () => t.simpleFullScreen), Or.isWin ? (ae.handle("setSimpleFullScreen", (o, r) => {
      this.#e = !0, t.setSimpleFullScreen(r), r || (t.setPosition(this.#o, this.#a), t.setContentSize(this.#r, this.#n)), this.#e = !1;
    }), t.on("enter-full-screen", () => {
      t.setContentSize(this.#t.width, this.#t.height);
    }), t.on("leave-full-screen", () => {
      this.#s(!1, this.#o, this.#a, this.#r, this.#n);
    })) : ae.handle("setSimpleFullScreen", (o, r) => {
      t.setSimpleFullScreen(r), !r && t.setContentSize(this.#r, this.#n);
    }), ae.handle("window", (o, r, f, n, i, d) => this.#s(r, f, n, i, d)), t.on("move", () => this.#f()), t.on("resize", () => this.#f()), this.#d(), t.loadFile(s);
  }
  static initRenderer(t, a, s) {
    let u, o = () => {
    };
    try {
      sc.initRenderer(), process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true", u = new Kc({
        //	...o,
        // 以下で上書き
        show: !1,
        // ウインドウ位置（とサイズ）決定時に表示
        minWidth: 300,
        minHeight: 300,
        acceptFirstMouse: !0,
        maximizable: !1,
        // Macで最大化ボタンでフルスクリーンにしない
        webPreferences: {
          // XSS対策としてnodeモジュールをレンダラープロセスで使えなくする
          nodeIntegration: !1,
          // レンダラープロセスに公開するAPIのファイル
          contextIsolation: !0,
          preload: `${__dirname}/preload.js`
        }
      });
      const r = new Ui(u, a, t);
      o = () => r.openDevTools();
    } catch (r) {
      throw console.error(`early err:${r}`), o(), "initRenderer error";
    }
    return u;
  }
  #l = {
    getAppPath: ct.getAppPath(),
    isPackaged: ct.isPackaged,
    downloads: ct.getPath("downloads"),
    userData: ct.getPath("userData"),
    getVersion: "",
    env: { ...process.env },
    platform: process.platform,
    arch: process.arch
  };
  #o = 0;
  #a = 0;
  #r = 0;
  #n = 0;
  #i = 0;
  openDevTools = () => {
  };
  #c = () => this.bw.webContents.closeDevTools();
  // 開こうとしたら閉じる
  #m(t, a) {
    const { c: s, x: u, y: o, w: r, h: f } = a;
    if (this.#i = r / f, Or.isWin || this.bw.setAspectRatio(this.#i), this.#s(s, u, o, r, f), this.bw.show(), t.debug.devtool) {
      this.#c = () => {
      }, this.openDevTools = () => this.bw.webContents.openDevTools({
        mode: "detach"
        // 別ウィンドウに切り離すが画面内に戻せない
        //	activate: false,	// 他のウインドウの後ろに回って見失いがち
      }), this.openDevTools();
      return;
    }
    this.#c = () => {
      this.bw.webContents.closeDevTools(), this.bw.setTitle("DevToolは禁止されています。許可する場合は【プロジェクト設定】の【devtool】をONに。"), this.bw.webContents.send("shutdown");
    };
  }
  #t;
  #d() {
    const t = zi.getCursorScreenPoint(), a = zi.getDisplayNearestPoint(t);
    this.#t = a.workAreaSize;
  }
  #u = void 0;
  #h = !1;
  #e = !1;
  #f() {
    if (this.#u || this.#e) return;
    this.#e = !0;
    const [t, a] = this.bw.getPosition(), [s, u] = this.bw.getContentSize();
    this.#u = setTimeout(() => {
      if (this.#u = void 0, this.#h) {
        this.#h = !1;
        return;
      }
      this.#e = !1;
      const [o = 0, r = 0] = this.bw.getPosition(), [f = 0, n = 0] = this.bw.getContentSize();
      if (t !== o || a !== r || s !== f || u !== n) {
        this.#f();
        return;
      }
      this.#s(!1, o, r, f, n);
    }, 1e3 / 60 * 10);
  }
  #s(t, a, s, u, o) {
    this.#e || (this.#e = !0, !this.bw.simpleFullScreen && (t && (this.#d(), a = (this.#t.width - u) * 0.5, s = (this.#t.height - o) * 0.5), this.#o = a = Math.round(a), this.#a = s = Math.round(s), this.bw.setPosition(a, s), Or.isWin && (this.#r !== u ? o = u / this.#i : u = o * this.#i), this.#r = u = Math.round(u), this.#n = o = Math.round(o), this.bw.setContentSize(u, o), this.bw.webContents.send("save_win_inf", { c: t, x: a, y: s, w: u, h: o, scrw: this.#t.width, scrh: this.#t.height }), this.#e = !1));
  }
}
module.exports = Ui;
export {
  Ui as appMain
};
//# sourceMappingURL=appMain.js.map
