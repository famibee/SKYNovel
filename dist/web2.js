var commonjsGlobal = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function getDefaultExportFromCjs(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
function getAugmentedNamespace(n) {
  if (Object.prototype.hasOwnProperty.call(n, "__esModule")) return n;
  var t = n.default;
  if (typeof t == "function") {
    var e = function r() {
      var a = !1;
      try {
        a = this instanceof r;
      } catch {
      }
      return a ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
    };
    e.prototype = t.prototype;
  } else e = {};
  return Object.defineProperty(e, "__esModule", { value: !0 }), Object.keys(n).forEach(function(r) {
    var a = Object.getOwnPropertyDescriptor(n, r);
    Object.defineProperty(e, r, a.get ? a : {
      enumerable: !0,
      get: function() {
        return n[r];
      }
    });
  }), e;
}
var platform$2 = { exports: {} };
/*!
 * Platform.js v1.3.6
 * Copyright 2014-2020 Benjamin Tan
 * Copyright 2011-2013 John-David Dalton
 * Available under MIT license
 */
var platform$1 = platform$2.exports, hasRequiredPlatform;
function requirePlatform() {
  return hasRequiredPlatform || (hasRequiredPlatform = 1, function(n, t) {
    (function() {
      var e = {
        function: !0,
        object: !0
      }, r = e[typeof window] && window || this, a = t, s = n && !n.nodeType && n, o = a && s && typeof commonjsGlobal == "object" && commonjsGlobal;
      o && (o.global === o || o.window === o || o.self === o) && (r = o);
      var u = Math.pow(2, 53) - 1, h = /\bOpera/, l = Object.prototype, c = l.hasOwnProperty, v = l.toString;
      function d(A) {
        return A = String(A), A.charAt(0).toUpperCase() + A.slice(1);
      }
      function m(A, L, B) {
        var Y = {
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
        return L && B && /^Win/i.test(A) && !/^Windows Phone /i.test(A) && (Y = Y[/[\d.]+$/.exec(A)]) && (A = "Windows " + Y), A = String(A), L && B && (A = A.replace(RegExp(L, "i"), B)), A = y(
          A.replace(/ ce$/i, " CE").replace(/\bhpw/i, "web").replace(/\bMacintosh\b/, "Mac OS").replace(/_PowerPC\b/i, " OS").replace(/\b(OS X) [^ \d]+/i, "$1").replace(/\bMac (OS X)\b/, "$1").replace(/\/(\d)/, " $1").replace(/_/g, ".").replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, "").replace(/\bx86\.64\b/gi, "x86_64").replace(/\b(Windows Phone) OS\b/, "$1").replace(/\b(Chrome OS \w+) [\d.]+\b/, "$1").split(" on ")[0]
        ), A;
      }
      function g(A, L) {
        var B = -1, Y = A ? A.length : 0;
        if (typeof Y == "number" && Y > -1 && Y <= u)
          for (; ++B < Y; )
            L(A[B], B, A);
        else
          _(A, L);
      }
      function y(A) {
        return A = E(A), /^(?:webOS|i(?:OS|P))/.test(A) ? A : d(A);
      }
      function _(A, L) {
        for (var B in A)
          c.call(A, B) && L(A[B], B, A);
      }
      function b(A) {
        return A == null ? d(A) : v.call(A).slice(8, -1);
      }
      function S(A, L) {
        var B = A != null ? typeof A[L] : "number";
        return !/^(?:boolean|number|string|undefined)$/.test(B) && (B == "object" ? !!A[L] : !0);
      }
      function P(A) {
        return String(A).replace(/([ -])(?!$)/g, "$1?");
      }
      function N(A, L) {
        var B = null;
        return g(A, function(Y, H) {
          B = L(B, Y, H, A);
        }), B;
      }
      function E(A) {
        return String(A).replace(/^ +| +$/g, "");
      }
      function M(A) {
        var L = r, B = A && typeof A == "object" && b(A) != "String";
        B && (L = A, A = null);
        var Y = L.navigator || {}, H = Y.userAgent || "";
        A || (A = H);
        var rt = B ? !!Y.likeChrome : /\bChrome\b/.test(A) && !/internal|\n/i.test(v.toString()), at = "Object", Z = B ? at : "ScriptBridgingProxyObject", w = B ? at : "Environment", O = B && L.java ? "JavaPackage" : b(L.java), R = B ? at : "RuntimeObject", F = /\bJava/.test(O) && L.java, D = F && b(L.environment) == w, C = F ? "a" : "α", U = F ? "b" : "β", k = L.document || {}, $ = L.operamini || L.opera, K = h.test(K = B && $ ? $["[[Class]]"] : b($)) ? K : $ = null, I, tt = A, q = [], nt = null, Q = A == H, V = Q && $ && typeof $.version == "function" && $.version(), st, it = vt([
          { label: "EdgeHTML", pattern: "Edge" },
          "Trident",
          { label: "WebKit", pattern: "AppleWebKit" },
          "iCab",
          "Presto",
          "NetFront",
          "Tasman",
          "KHTML",
          "Gecko"
        ]), z = bt([
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
        ]), J = Tt([
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
        ]), et = yt({
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
        }), W = Rt([
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
        function vt(dt) {
          return N(dt, function(lt, ut) {
            return lt || RegExp("\\b" + (ut.pattern || P(ut)) + "\\b", "i").exec(A) && (ut.label || ut);
          });
        }
        function yt(dt) {
          return N(dt, function(lt, ut, _t) {
            return lt || (ut[J] || ut[/^[a-z]+(?: +[a-z]+\b)*/i.exec(J)] || RegExp("\\b" + P(_t) + "(?:\\b|\\w*\\d)", "i").exec(A)) && _t;
          });
        }
        function bt(dt) {
          return N(dt, function(lt, ut) {
            return lt || RegExp("\\b" + (ut.pattern || P(ut)) + "\\b", "i").exec(A) && (ut.label || ut);
          });
        }
        function Rt(dt) {
          return N(dt, function(lt, ut) {
            var _t = ut.pattern || P(ut);
            return !lt && (lt = RegExp("\\b" + _t + "(?:/[\\d.]+|[ \\w.]*)", "i").exec(A)) && (lt = m(lt, _t, ut.label || ut)), lt;
          });
        }
        function Tt(dt) {
          return N(dt, function(lt, ut) {
            var _t = ut.pattern || P(ut);
            return !lt && (lt = RegExp("\\b" + _t + " *\\d+[.\\w_]*", "i").exec(A) || RegExp("\\b" + _t + " *\\w+-[\\w]*", "i").exec(A) || RegExp("\\b" + _t + "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)", "i").exec(A)) && ((lt = String(ut.label && !RegExp(_t, "i").test(ut.label) ? ut.label : lt).split("/"))[1] && !/[\d.]+/.test(lt[0]) && (lt[0] += " " + lt[1]), ut = ut.label || ut, lt = y(lt[0].replace(RegExp(_t, "i"), ut).replace(RegExp("; *(?:" + ut + "[_-])?", "i"), " ").replace(RegExp("(" + ut + ")[-_.]?(\\w)", "i"), "$1 $2"))), lt;
          });
        }
        function St(dt) {
          return N(dt, function(lt, ut) {
            return lt || (RegExp(ut + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)", "i").exec(A) || 0)[1] || null;
          });
        }
        function Pt() {
          return this.description || "";
        }
        if (it && (it = [it]), /\bAndroid\b/.test(W) && !J && (I = /\bAndroid[^;]*;(.*?)(?:Build|\) AppleWebKit)\b/i.exec(A)) && (J = E(I[1]).replace(/^[a-z]{2}-[a-z]{2};\s*/i, "") || null), et && !J ? J = Tt([et]) : et && J && (J = J.replace(RegExp("^(" + P(et) + ")[-_.\\s]", "i"), et + " ").replace(RegExp("^(" + P(et) + ")[-_.]?(\\w)", "i"), et + " $2")), (I = /\bGoogle TV\b/.exec(J)) && (J = I[0]), /\bSimulator\b/i.test(A) && (J = (J ? J + " " : "") + "Simulator"), z == "Opera Mini" && /\bOPiOS\b/.test(A) && q.push("running in Turbo/Uncompressed mode"), z == "IE" && /\blike iPhone OS\b/.test(A) ? (I = M(A.replace(/like iPhone OS/, "")), et = I.manufacturer, J = I.product) : /^iP/.test(J) ? (z || (z = "Safari"), W = "iOS" + ((I = / OS ([\d_]+)/i.exec(A)) ? " " + I[1].replace(/_/g, ".") : "")) : z == "Konqueror" && /^Linux\b/i.test(W) ? W = "Kubuntu" : et && et != "Google" && (/Chrome/.test(z) && !/\bMobile Safari\b/i.test(A) || /\bVita\b/.test(J)) || /\bAndroid\b/.test(W) && /^Chrome/.test(z) && /\bVersion\//i.test(A) ? (z = "Android Browser", W = /\bAndroid\b/.test(W) ? W : "Android") : z == "Silk" ? (/\bMobi/i.test(A) || (W = "Android", q.unshift("desktop mode")), /Accelerated *= *true/i.test(A) && q.unshift("accelerated")) : z == "UC Browser" && /\bUCWEB\b/.test(A) ? q.push("speed mode") : z == "PaleMoon" && (I = /\bFirefox\/([\d.]+)\b/.exec(A)) ? q.push("identifying as Firefox " + I[1]) : z == "Firefox" && (I = /\b(Mobile|Tablet|TV)\b/i.exec(A)) ? (W || (W = "Firefox OS"), J || (J = I[1])) : !z || (I = !/\bMinefield\b/i.test(A) && /\b(?:Firefox|Safari)\b/.exec(z)) ? (z && !J && /[\/,]|^[^(]+?\)/.test(A.slice(A.indexOf(I + "/") + 8)) && (z = null), (I = J || et || W) && (J || et || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(W)) && (z = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(W) ? W : I) + " Browser")) : z == "Electron" && (I = (/\bChrome\/([\d.]+)\b/.exec(A) || 0)[1]) && q.push("Chromium " + I), V || (V = St([
          "(?:Cloud9|CriOS|CrMo|Edge|Edg|EdgA|EdgiOS|FxiOS|HeadlessChrome|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$)|UCBrowser|YaBrowser)",
          "Version",
          P(z),
          "(?:Firefox|Minefield|NetFront)"
        ])), (I = it == "iCab" && parseFloat(V) > 3 && "WebKit" || /\bOpera\b/.test(z) && (/\bOPR\b/.test(A) ? "Blink" : "Presto") || /\b(?:Midori|Nook|Safari)\b/i.test(A) && !/^(?:Trident|EdgeHTML)$/.test(it) && "WebKit" || !it && /\bMSIE\b/i.test(A) && (W == "Mac OS" ? "Tasman" : "Trident") || it == "WebKit" && /\bPlayStation\b(?! Vita\b)/i.test(z) && "NetFront") && (it = [I]), z == "IE" && (I = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(A) || 0)[1]) ? (z += " Mobile", W = "Windows Phone " + (/\+$/.test(I) ? I : I + ".x"), q.unshift("desktop mode")) : /\bWPDesktop\b/i.test(A) ? (z = "IE Mobile", W = "Windows Phone 8.x", q.unshift("desktop mode"), V || (V = (/\brv:([\d.]+)/.exec(A) || 0)[1])) : z != "IE" && it == "Trident" && (I = /\brv:([\d.]+)/.exec(A)) && (z && q.push("identifying as " + z + (V ? " " + V : "")), z = "IE", V = I[1]), Q) {
          if (S(L, "global"))
            if (F && (I = F.lang.System, tt = I.getProperty("os.arch"), W = W || I.getProperty("os.name") + " " + I.getProperty("os.version")), D) {
              try {
                V = L.require("ringo/engine").version.join("."), z = "RingoJS";
              } catch {
                (I = L.system) && I.global.system == L.system && (z = "Narwhal", W || (W = I[0].os || null));
              }
              z || (z = "Rhino");
            } else typeof L.process == "object" && !L.process.browser && (I = L.process) && (typeof I.versions == "object" && (typeof I.versions.electron == "string" ? (q.push("Node " + I.versions.node), z = "Electron", V = I.versions.electron) : typeof I.versions.nw == "string" && (q.push("Chromium " + V, "Node " + I.versions.node), z = "NW.js", V = I.versions.nw)), z || (z = "Node.js", tt = I.arch, W = I.platform, V = /[\d.]+/.exec(I.version), V = V ? V[0] : null));
          else b(I = L.runtime) == Z ? (z = "Adobe AIR", W = I.flash.system.Capabilities.os) : b(I = L.phantom) == R ? (z = "PhantomJS", V = (I = I.version || null) && I.major + "." + I.minor + "." + I.patch) : typeof k.documentMode == "number" && (I = /\bTrident\/(\d+)/i.exec(A)) ? (V = [V, k.documentMode], (I = +I[1] + 4) != V[1] && (q.push("IE " + V[1] + " mode"), it && (it[1] = ""), V[1] = I), V = z == "IE" ? String(V[1].toFixed(1)) : V[0]) : typeof k.documentMode == "number" && /^(?:Chrome|Firefox)\b/.test(z) && (q.push("masking as " + z + " " + V), z = "IE", V = "11.0", it = ["Trident"], W = "Windows");
          W = W && y(W);
        }
        if (V && (I = /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(V) || /(?:alpha|beta)(?: ?\d)?/i.exec(A + ";" + (Q && Y.appMinorVersion)) || /\bMinefield\b/i.test(A) && "a") && (nt = /b/i.test(I) ? "beta" : "alpha", V = V.replace(RegExp(I + "\\+?$"), "") + (nt == "beta" ? U : C) + (/\d+\+?/.exec(I) || "")), z == "Fennec" || z == "Firefox" && /\b(?:Android|Firefox OS|KaiOS)\b/.test(W))
          z = "Firefox Mobile";
        else if (z == "Maxthon" && V)
          V = V.replace(/\.[\d.]+/, ".x");
        else if (/\bXbox\b/i.test(J))
          J == "Xbox 360" && (W = null), J == "Xbox 360" && /\bIEMobile\b/.test(A) && q.unshift("mobile mode");
        else if ((/^(?:Chrome|IE|Opera)$/.test(z) || z && !J && !/Browser|Mobi/.test(z)) && (W == "Windows CE" || /Mobi/i.test(A)))
          z += " Mobile";
        else if (z == "IE" && Q)
          try {
            L.external === null && q.unshift("platform preview");
          } catch {
            q.unshift("embedded");
          }
        else (/\bBlackBerry\b/.test(J) || /\bBB10\b/.test(A)) && (I = (RegExp(J.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec(A) || 0)[1] || V) ? (I = [I, /BB10/.test(A)], W = (I[1] ? (J = null, et = "BlackBerry") : "Device Software") + " " + I[0], V = null) : this != _ && J != "Wii" && (Q && $ || /Opera/.test(z) && /\b(?:MSIE|Firefox)\b/i.test(A) || z == "Firefox" && /\bOS X (?:\d+\.){2,}/.test(W) || z == "IE" && (W && !/^Win/.test(W) && V > 5.5 || /\bWindows XP\b/.test(W) && V > 8 || V == 8 && !/\bTrident\b/.test(A))) && !h.test(I = M.call(_, A.replace(h, "") + ";")) && I.name && (I = "ing as " + I.name + ((I = I.version) ? " " + I : ""), h.test(z) ? (/\bIE\b/.test(I) && W == "Mac OS" && (W = null), I = "identify" + I) : (I = "mask" + I, K ? z = y(K.replace(/([a-z])([A-Z])/g, "$1 $2")) : z = "Opera", /\bIE\b/.test(I) && (W = null), Q || (V = null)), it = ["Presto"], q.push(I));
        (I = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(A) || 0)[1]) && (I = [parseFloat(I.replace(/\.(\d)$/, ".0$1")), I], z == "Safari" && I[1].slice(-1) == "+" ? (z = "WebKit Nightly", nt = "alpha", V = I[1].slice(0, -1)) : (V == I[1] || V == (I[2] = (/\bSafari\/([\d.]+\+?)/i.exec(A) || 0)[1])) && (V = null), I[1] = (/\b(?:Headless)?Chrome\/([\d.]+)/i.exec(A) || 0)[1], I[0] == 537.36 && I[2] == 537.36 && parseFloat(I[1]) >= 28 && it == "WebKit" && (it = ["Blink"]), !Q || !rt && !I[1] ? (it && (it[1] = "like Safari"), I = (I = I[0], I < 400 ? 1 : I < 500 ? 2 : I < 526 ? 3 : I < 533 ? 4 : I < 534 ? "4+" : I < 535 ? 5 : I < 537 ? 6 : I < 538 ? 7 : I < 601 ? 8 : I < 602 ? 9 : I < 604 ? 10 : I < 606 ? 11 : I < 608 ? 12 : "12")) : (it && (it[1] = "like Chrome"), I = I[1] || (I = I[0], I < 530 ? 1 : I < 532 ? 2 : I < 532.05 ? 3 : I < 533 ? 4 : I < 534.03 ? 5 : I < 534.07 ? 6 : I < 534.1 ? 7 : I < 534.13 ? 8 : I < 534.16 ? 9 : I < 534.24 ? 10 : I < 534.3 ? 11 : I < 535.01 ? 12 : I < 535.02 ? "13+" : I < 535.07 ? 15 : I < 535.11 ? 16 : I < 535.19 ? 17 : I < 536.05 ? 18 : I < 536.1 ? 19 : I < 537.01 ? 20 : I < 537.11 ? "21+" : I < 537.13 ? 23 : I < 537.18 ? 24 : I < 537.24 ? 25 : I < 537.36 ? 26 : it != "Blink" ? "27" : "28")), it && (it[1] += " " + (I += typeof I == "number" ? ".x" : /[.+]/.test(I) ? "" : "+")), z == "Safari" && (!V || parseInt(V) > 45) ? V = I : z == "Chrome" && /\bHeadlessChrome/i.test(A) && q.unshift("headless")), z == "Opera" && (I = /\bzbov|zvav$/.exec(W)) ? (z += " ", q.unshift("desktop mode"), I == "zvav" ? (z += "Mini", V = null) : z += "Mobile", W = W.replace(RegExp(" *" + I + "$"), "")) : z == "Safari" && /\bChrome\b/.exec(it && it[1]) ? (q.unshift("desktop mode"), z = "Chrome Mobile", V = null, /\bOS X\b/.test(W) ? (et = "Apple", W = "iOS 4.3+") : W = null) : /\bSRWare Iron\b/.test(z) && !V && (V = St("Chrome")), V && V.indexOf(I = /[\d.]+$/.exec(W)) == 0 && A.indexOf("/" + I + "-") > -1 && (W = E(W.replace(I, ""))), W && W.indexOf(z) != -1 && !RegExp(z + " OS").test(W) && (W = W.replace(RegExp(" *" + P(z) + " *"), "")), it && !/\b(?:Avant|Nook)\b/.test(z) && (/Browser|Lunascape|Maxthon/.test(z) || z != "Safari" && /^iOS/.test(W) && /\bSafari\b/.test(it[1]) || /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|SRWare Iron|Vivaldi|Web)/.test(z) && it[1]) && (I = it[it.length - 1]) && q.push(I), q.length && (q = ["(" + q.join("; ") + ")"]), et && J && J.indexOf(et) < 0 && q.push("on " + et), J && q.push((/^on /.test(q[q.length - 1]) ? "" : "on ") + J), W && (I = / ([\d.+]+)$/.exec(W), st = I && W.charAt(W.length - I[0].length - 1) == "/", W = {
          architecture: 32,
          family: I && !st ? W.replace(I[0], "") : W,
          version: I ? I[1] : null,
          toString: function() {
            var dt = this.version;
            return this.family + (dt && !st ? " " + dt : "") + (this.architecture == 64 ? " 64-bit" : "");
          }
        }), (I = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(tt)) && !/\bi686\b/i.test(tt) ? (W && (W.architecture = 64, W.family = W.family.replace(RegExp(" *" + I), "")), z && (/\bWOW64\b/i.test(A) || Q && /\w(?:86|32)$/.test(Y.cpuClass || Y.platform) && !/\bWin64; x64\b/i.test(A)) && q.unshift("32-bit")) : W && /^OS X/.test(W.family) && z == "Chrome" && parseFloat(V) >= 39 && (W.architecture = 64), A || (A = null);
        var pt = {};
        return pt.description = A, pt.layout = it && it[0], pt.manufacturer = et, pt.name = z, pt.prerelease = nt, pt.product = J, pt.ua = A, pt.version = z && V, pt.os = W || {
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
        }, pt.parse = M, pt.toString = Pt, pt.version && q.unshift(V), pt.name && q.unshift(z), W && z && !(W == String(W).split(" ")[0] && (W == z.split(" ")[0] || J)) && q.push(J ? "(" + W + ")" : "on " + W), q.length && (pt.description = q.join(" ")), pt;
      }
      var T = M();
      a && s ? _(T, function(A, L) {
        a[L] = A;
      }) : r.platform = T;
    }).call(platform$1);
  }(platform$2, platform$2.exports)), platform$2.exports;
}
var platformExports = requirePlatform();
const platform = /* @__PURE__ */ getDefaultExportFromCjs(platformExports);
function int(n) {
  return parseInt(String(n), 10);
}
function uint(n) {
  const t = parseInt(String(n), 10);
  return t < 0 ? -t : t;
}
"toInt" in String.prototype || (String.prototype.toInt = function() {
  return int(this);
});
"toUint" in String.prototype || (String.prototype.toUint = function() {
  const n = int(this);
  return n < 0 ? -n : n;
});
function getDateStr(n = "/", t = " ", e = ":", r = "") {
  const a = /* @__PURE__ */ new Date();
  return a.getFullYear() + n + String(100 + a.getMonth() + 1).slice(1, 3) + n + String(100 + a.getDate()).slice(1, 3) + t + String(100 + a.getHours()).slice(1, 3) + e + String(100 + a.getMinutes()).slice(1, 3) + (r === "" ? "" : r + String(a.getMilliseconds()));
}
const css_key4del = "/* SKYNovel */";
function initStyle() {
  const n = document.getElementsByTagName("head")[0], t = n.children.length;
  for (let e = t - 1; e >= 0; --e) {
    const r = n.children[e];
    r instanceof HTMLStyleElement && r.innerText.startsWith(css_key4del) && n.removeChild(r);
  }
}
function addStyle(n) {
  const t = document.createElement("style");
  t.innerHTML = css_key4del + n, document.getElementsByTagName("head")[0].appendChild(t);
}
const EVNM_BUTTON = "pointerdown", EVNM_CLICK = "pointerdown", EVNM_KEY = "keydown";
function argChk_Num(n, t, e) {
  const r = n[t];
  if (!(t in n)) {
    if (isNaN(e)) throw `[${n[":タグ名"]}]属性 ${t} は必須です`;
    return n[t] = e, e;
  }
  const a = String(r).startsWith("0x") ? parseInt(r) : parseFloat(r);
  if (isNaN(a)) throw `[${n[":タグ名"]}]属性 ${t} の値【${r}】が数値ではありません`;
  return n[t] = a;
}
function argChk_Boolean(n, t, e) {
  if (!(t in n)) return n[t] = e;
  const r = n[t];
  if (r === null) return !1;
  const a = String(r);
  return n[t] = a === "false" ? !1 : !!a;
}
function parseColor(n) {
  if (n.startsWith("#")) return parseInt(n.slice(1), 16);
  const t = Number(n);
  if (!isNaN(t)) return t;
  if (n === "black") return 0;
  CmnLib.cc4ColorName.fillStyle = n;
  const e = CmnLib.cc4ColorName.fillStyle;
  if (e === "#000000") throw `色名前 ${n} が異常です`;
  return parseInt(e.slice(1), 16);
}
function argChk_Color(n, t, e) {
  const r = n[t];
  return r ? n[t] = parseColor(String(r)) : n[t] = e;
}
const REG_ERRMES_JSON = /JSON at position (\d+)$/;
function mesErrJSON(n, t = "", e = "") {
  const r = (e.match(REG_ERRMES_JSON) ?? ["", ""])[1];
  return `[${n[":タグ名"]}] ${t} 属性の解析エラー : ${e}
${n[t]}${r ? `
${"^".padStart(Number(r))}` : ""}`;
}
const REG_FN = /^[^\/\.]+$|[^\/]+(?=\.)/;
function getFn(n) {
  return (n.match(REG_FN) ?? [""])[0];
}
class CmnLib {
  static stageW = 0;
  static stageH = 0;
  static debugLog = !1;
  static isSafari = platformExports.name === "Safari";
  static isFirefox = platformExports.name === "Firefox";
  static isMac = /OS X/.test(platformExports.os?.family ?? "");
  static isMobile = !/(Windows|OS X)/.test(platformExports.os?.family ?? "");
  static hDip = {};
  static isDbg = !1;
  static isPackaged = !1;
  static isDarkMode = !1;
  static cc4ColorName;
}
function finallyConstructor(n) {
  var t = this.constructor;
  return this.then(
    function(e) {
      return t.resolve(n()).then(function() {
        return e;
      });
    },
    function(e) {
      return t.resolve(n()).then(function() {
        return t.reject(e);
      });
    }
  );
}
function allSettled(n) {
  var t = this;
  return new t(function(e, r) {
    if (!(n && typeof n.length < "u"))
      return r(
        new TypeError(
          typeof n + " " + n + " is not iterable(cannot read property Symbol(Symbol.iterator))"
        )
      );
    var a = Array.prototype.slice.call(n);
    if (a.length === 0) return e([]);
    var s = a.length;
    function o(h, l) {
      if (l && (typeof l == "object" || typeof l == "function")) {
        var c = l.then;
        if (typeof c == "function") {
          c.call(
            l,
            function(v) {
              o(h, v);
            },
            function(v) {
              a[h] = { status: "rejected", reason: v }, --s === 0 && e(a);
            }
          );
          return;
        }
      }
      a[h] = { status: "fulfilled", value: l }, --s === 0 && e(a);
    }
    for (var u = 0; u < a.length; u++)
      o(u, a[u]);
  });
}
function AggregateError$1(n, t) {
  this.name = "AggregateError", this.errors = n, this.message = t || "";
}
AggregateError$1.prototype = Error.prototype;
function any(n) {
  var t = this;
  return new t(function(e, r) {
    if (!(n && typeof n.length < "u"))
      return r(new TypeError("Promise.any accepts an array"));
    var a = Array.prototype.slice.call(n);
    if (a.length === 0) return r();
    for (var s = [], o = 0; o < a.length; o++)
      try {
        t.resolve(a[o]).then(e).catch(function(u) {
          s.push(u), s.length === a.length && r(
            new AggregateError$1(
              s,
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
function bind(n, t) {
  return function() {
    n.apply(t, arguments);
  };
}
function Promise$1(n) {
  if (!(this instanceof Promise$1))
    throw new TypeError("Promises must be constructed via new");
  if (typeof n != "function") throw new TypeError("not a function");
  this._state = 0, this._handled = !1, this._value = void 0, this._deferreds = [], doResolve(n, this);
}
function handle(n, t) {
  for (; n._state === 3; )
    n = n._value;
  if (n._state === 0) {
    n._deferreds.push(t);
    return;
  }
  n._handled = !0, Promise$1._immediateFn(function() {
    var e = n._state === 1 ? t.onFulfilled : t.onRejected;
    if (e === null) {
      (n._state === 1 ? resolve : reject)(t.promise, n._value);
      return;
    }
    var r;
    try {
      r = e(n._value);
    } catch (a) {
      reject(t.promise, a);
      return;
    }
    resolve(t.promise, r);
  });
}
function resolve(n, t) {
  try {
    if (t === n)
      throw new TypeError("A promise cannot be resolved with itself.");
    if (t && (typeof t == "object" || typeof t == "function")) {
      var e = t.then;
      if (t instanceof Promise$1) {
        n._state = 3, n._value = t, finale(n);
        return;
      } else if (typeof e == "function") {
        doResolve(bind(e, t), n);
        return;
      }
    }
    n._state = 1, n._value = t, finale(n);
  } catch (r) {
    reject(n, r);
  }
}
function reject(n, t) {
  n._state = 2, n._value = t, finale(n);
}
function finale(n) {
  n._state === 2 && n._deferreds.length === 0 && Promise$1._immediateFn(function() {
    n._handled || Promise$1._unhandledRejectionFn(n._value);
  });
  for (var t = 0, e = n._deferreds.length; t < e; t++)
    handle(n, n._deferreds[t]);
  n._deferreds = null;
}
function Handler(n, t, e) {
  this.onFulfilled = typeof n == "function" ? n : null, this.onRejected = typeof t == "function" ? t : null, this.promise = e;
}
function doResolve(n, t) {
  var e = !1;
  try {
    n(
      function(r) {
        e || (e = !0, resolve(t, r));
      },
      function(r) {
        e || (e = !0, reject(t, r));
      }
    );
  } catch (r) {
    if (e) return;
    e = !0, reject(t, r);
  }
}
Promise$1.prototype.catch = function(n) {
  return this.then(null, n);
};
Promise$1.prototype.then = function(n, t) {
  var e = new this.constructor(noop);
  return handle(this, new Handler(n, t, e)), e;
};
Promise$1.prototype.finally = finallyConstructor;
Promise$1.all = function(n) {
  return new Promise$1(function(t, e) {
    if (!isArray(n))
      return e(new TypeError("Promise.all accepts an array"));
    var r = Array.prototype.slice.call(n);
    if (r.length === 0) return t([]);
    var a = r.length;
    function s(u, h) {
      try {
        if (h && (typeof h == "object" || typeof h == "function")) {
          var l = h.then;
          if (typeof l == "function") {
            l.call(
              h,
              function(c) {
                s(u, c);
              },
              e
            );
            return;
          }
        }
        r[u] = h, --a === 0 && t(r);
      } catch (c) {
        e(c);
      }
    }
    for (var o = 0; o < r.length; o++)
      s(o, r[o]);
  });
};
Promise$1.any = any;
Promise$1.allSettled = allSettled;
Promise$1.resolve = function(n) {
  return n && typeof n == "object" && n.constructor === Promise$1 ? n : new Promise$1(function(t) {
    t(n);
  });
};
Promise$1.reject = function(n) {
  return new Promise$1(function(t, e) {
    e(n);
  });
};
Promise$1.race = function(n) {
  return new Promise$1(function(t, e) {
    if (!isArray(n))
      return e(new TypeError("Promise.race accepts an array"));
    for (var r = 0, a = n.length; r < a; r++)
      Promise$1.resolve(n[r]).then(t, e);
  });
};
Promise$1._immediateFn = // @ts-ignore
typeof setImmediate == "function" && function(n) {
  setImmediate(n);
} || function(n) {
  setTimeoutFunc(n, 0);
};
Promise$1._unhandledRejectionFn = function(t) {
  typeof console < "u" && console && console.warn("Possible Unhandled Promise Rejection:", t);
};
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var objectAssign$1, hasRequiredObjectAssign;
function requireObjectAssign() {
  if (hasRequiredObjectAssign) return objectAssign$1;
  hasRequiredObjectAssign = 1;
  var n = Object.getOwnPropertySymbols, t = Object.prototype.hasOwnProperty, e = Object.prototype.propertyIsEnumerable;
  function r(s) {
    if (s == null)
      throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(s);
  }
  function a() {
    try {
      if (!Object.assign)
        return !1;
      var s = new String("abc");
      if (s[5] = "de", Object.getOwnPropertyNames(s)[0] === "5")
        return !1;
      for (var o = {}, u = 0; u < 10; u++)
        o["_" + String.fromCharCode(u)] = u;
      var h = Object.getOwnPropertyNames(o).map(function(c) {
        return o[c];
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
  return objectAssign$1 = a() ? Object.assign : function(s, o) {
    for (var u, h = r(s), l, c = 1; c < arguments.length; c++) {
      u = Object(arguments[c]);
      for (var v in u)
        t.call(u, v) && (h[v] = u[v]);
      if (n) {
        l = n(u);
        for (var d = 0; d < l.length; d++)
          e.call(u, l[d]) && (h[l[d]] = u[l[d]]);
      }
    }
    return h;
  }, objectAssign$1;
}
var objectAssignExports = requireObjectAssign();
const objectAssign = /* @__PURE__ */ getDefaultExportFromCjs(objectAssignExports);
/*!
 * @pixi/polyfill - v6.5.10
 * Compiled Thu, 06 Jul 2023 15:25:11 UTC
 *
 * @pixi/polyfill is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
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
  var t = Date.now(), e = ONE_FRAME_TIME + lastTime - t;
  return e < 0 && (e = 0), lastTime = t, globalThis.self.setTimeout(function() {
    lastTime = Date.now(), n(performance.now());
  }, e);
});
globalThis.cancelAnimationFrame || (globalThis.cancelAnimationFrame = function(n) {
  return clearTimeout(n);
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
/*!
 * @pixi/settings - v6.5.10
 * Compiled Thu, 06 Jul 2023 15:25:11 UTC
 *
 * @pixi/settings is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
var BrowserAdapter = {
  /**
   * Creates a canvas element of the given size.
   * This canvas is created using the browser's native canvas element.
   * @param width - width of the canvas
   * @param height - height of the canvas
   */
  createCanvas: function(n, t) {
    var e = document.createElement("canvas");
    return e.width = n, e.height = t, e;
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
  fetch: function(n, t) {
    return fetch(n, t);
  }
}, appleIphone = /iPhone/i, appleIpod = /iPod/i, appleTablet = /iPad/i, appleUniversal = /\biOS-universal(?:.+)Mac\b/i, androidPhone = /\bAndroid(?:.+)Mobile\b/i, androidTablet = /Android/i, amazonPhone = /(?:SD4930UR|\bSilk(?:.+)Mobile\b)/i, amazonTablet = /Silk/i, windowsPhone = /Windows Phone/i, windowsTablet = /\bWindows(?:.+)ARM\b/i, otherBlackBerry = /BlackBerry/i, otherBlackBerry10 = /BB10/i, otherOpera = /Opera Mini/i, otherChrome = /\b(CriOS|Chrome)(?:.+)Mobile/i, otherFirefox = /Mobile(?:.+)Firefox\b/i, isAppleTabletOnIos13 = function(n) {
  return typeof n < "u" && n.platform === "MacIntel" && typeof n.maxTouchPoints == "number" && n.maxTouchPoints > 1 && typeof MSStream > "u";
};
function createMatch(n) {
  return function(t) {
    return t.test(n);
  };
}
function isMobile$1(n) {
  var t = {
    userAgent: "",
    platform: "",
    maxTouchPoints: 0
  };
  !n && typeof navigator < "u" ? t = {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    maxTouchPoints: navigator.maxTouchPoints || 0
  } : typeof n == "string" ? t.userAgent = n : n && n.userAgent && (t = {
    userAgent: n.userAgent,
    platform: n.platform,
    maxTouchPoints: n.maxTouchPoints || 0
  });
  var e = t.userAgent, r = e.split("[FBAN");
  typeof r[1] < "u" && (e = r[0]), r = e.split("Twitter"), typeof r[1] < "u" && (e = r[0]);
  var a = createMatch(e), s = {
    apple: {
      phone: a(appleIphone) && !a(windowsPhone),
      ipod: a(appleIpod),
      tablet: !a(appleIphone) && (a(appleTablet) || isAppleTabletOnIos13(t)) && !a(windowsPhone),
      universal: a(appleUniversal),
      device: (a(appleIphone) || a(appleIpod) || a(appleTablet) || a(appleUniversal) || isAppleTabletOnIos13(t)) && !a(windowsPhone)
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
  return s.any = s.apple.device || s.android.device || s.windows.device || s.other.device, s.phone = s.apple.phone || s.android.phone || s.windows.phone, s.tablet = s.apple.tablet || s.android.tablet || s.windows.tablet, s;
}
var isMobile = isMobile$1(globalThis.navigator);
function canUploadSameBuffer() {
  return !isMobile.apple.device;
}
function maxRecommendedTextures(n) {
  var t = !0;
  if (isMobile.tablet || isMobile.phone) {
    if (isMobile.apple.device) {
      var e = navigator.userAgent.match(/OS (\d+)_(\d+)?/);
      if (e) {
        var r = parseInt(e[1], 10);
        r < 11 && (t = !1);
      }
    }
    if (isMobile.android.device) {
      var e = navigator.userAgent.match(/Android\s([0-9.]*)/);
      if (e) {
        var r = parseInt(e[1], 10);
        r < 7 && (t = !1);
      }
    }
  }
  return t ? n : 4;
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
    var t = Object.prototype.hasOwnProperty, e = "~";
    function r() {
    }
    Object.create && (r.prototype = /* @__PURE__ */ Object.create(null), new r().__proto__ || (e = !1));
    function a(h, l, c) {
      this.fn = h, this.context = l, this.once = c || !1;
    }
    function s(h, l, c, v, d) {
      if (typeof c != "function")
        throw new TypeError("The listener must be a function");
      var m = new a(c, v || h, d), g = e ? e + l : l;
      return h._events[g] ? h._events[g].fn ? h._events[g] = [h._events[g], m] : h._events[g].push(m) : (h._events[g] = m, h._eventsCount++), h;
    }
    function o(h, l) {
      --h._eventsCount === 0 ? h._events = new r() : delete h._events[l];
    }
    function u() {
      this._events = new r(), this._eventsCount = 0;
    }
    u.prototype.eventNames = function() {
      var l = [], c, v;
      if (this._eventsCount === 0) return l;
      for (v in c = this._events)
        t.call(c, v) && l.push(e ? v.slice(1) : v);
      return Object.getOwnPropertySymbols ? l.concat(Object.getOwnPropertySymbols(c)) : l;
    }, u.prototype.listeners = function(l) {
      var c = e ? e + l : l, v = this._events[c];
      if (!v) return [];
      if (v.fn) return [v.fn];
      for (var d = 0, m = v.length, g = new Array(m); d < m; d++)
        g[d] = v[d].fn;
      return g;
    }, u.prototype.listenerCount = function(l) {
      var c = e ? e + l : l, v = this._events[c];
      return v ? v.fn ? 1 : v.length : 0;
    }, u.prototype.emit = function(l, c, v, d, m, g) {
      var y = e ? e + l : l;
      if (!this._events[y]) return !1;
      var _ = this._events[y], b = arguments.length, S, P;
      if (_.fn) {
        switch (_.once && this.removeListener(l, _.fn, void 0, !0), b) {
          case 1:
            return _.fn.call(_.context), !0;
          case 2:
            return _.fn.call(_.context, c), !0;
          case 3:
            return _.fn.call(_.context, c, v), !0;
          case 4:
            return _.fn.call(_.context, c, v, d), !0;
          case 5:
            return _.fn.call(_.context, c, v, d, m), !0;
          case 6:
            return _.fn.call(_.context, c, v, d, m, g), !0;
        }
        for (P = 1, S = new Array(b - 1); P < b; P++)
          S[P - 1] = arguments[P];
        _.fn.apply(_.context, S);
      } else {
        var N = _.length, E;
        for (P = 0; P < N; P++)
          switch (_[P].once && this.removeListener(l, _[P].fn, void 0, !0), b) {
            case 1:
              _[P].fn.call(_[P].context);
              break;
            case 2:
              _[P].fn.call(_[P].context, c);
              break;
            case 3:
              _[P].fn.call(_[P].context, c, v);
              break;
            case 4:
              _[P].fn.call(_[P].context, c, v, d);
              break;
            default:
              if (!S) for (E = 1, S = new Array(b - 1); E < b; E++)
                S[E - 1] = arguments[E];
              _[P].fn.apply(_[P].context, S);
          }
      }
      return !0;
    }, u.prototype.on = function(l, c, v) {
      return s(this, l, c, v, !1);
    }, u.prototype.once = function(l, c, v) {
      return s(this, l, c, v, !0);
    }, u.prototype.removeListener = function(l, c, v, d) {
      var m = e ? e + l : l;
      if (!this._events[m]) return this;
      if (!c)
        return o(this, m), this;
      var g = this._events[m];
      if (g.fn)
        g.fn === c && (!d || g.once) && (!v || g.context === v) && o(this, m);
      else {
        for (var y = 0, _ = [], b = g.length; y < b; y++)
          (g[y].fn !== c || d && !g[y].once || v && g[y].context !== v) && _.push(g[y]);
        _.length ? this._events[m] = _.length === 1 ? _[0] : _ : o(this, m);
      }
      return this;
    }, u.prototype.removeAllListeners = function(l) {
      var c;
      return l ? (c = e ? e + l : l, this._events[c] && o(this, c)) : (this._events = new r(), this._eventsCount = 0), this;
    }, u.prototype.off = u.prototype.removeListener, u.prototype.addListener = u.prototype.on, u.prefixed = e, u.EventEmitter = u, n.exports = u;
  }(eventemitter3)), eventemitter3.exports;
}
var eventemitter3Exports = requireEventemitter3();
const i = /* @__PURE__ */ getDefaultExportFromCjs(eventemitter3Exports);
var earcut$1 = { exports: {} }, hasRequiredEarcut;
function requireEarcut() {
  if (hasRequiredEarcut) return earcut$1.exports;
  hasRequiredEarcut = 1, earcut$1.exports = n, earcut$1.exports.default = n;
  function n(w, O, R) {
    R = R || 2;
    var F = O && O.length, D = F ? O[0] * R : w.length, C = t(w, 0, D, R, !0), U = [];
    if (!C || C.next === C.prev) return U;
    var k, $, K, I, tt, q, nt;
    if (F && (C = h(w, O, C, R)), w.length > 80 * R) {
      k = K = w[0], $ = I = w[1];
      for (var Q = R; Q < D; Q += R)
        tt = w[Q], q = w[Q + 1], tt < k && (k = tt), q < $ && ($ = q), tt > K && (K = tt), q > I && (I = q);
      nt = Math.max(K - k, I - $), nt = nt !== 0 ? 32767 / nt : 0;
    }
    return r(C, U, R, k, $, nt, 0), U;
  }
  function t(w, O, R, F, D) {
    var C, U;
    if (D === Z(w, O, R, F) > 0)
      for (C = O; C < R; C += F) U = H(C, w[C], w[C + 1], U);
    else
      for (C = R - F; C >= O; C -= F) U = H(C, w[C], w[C + 1], U);
    return U && N(U, U.next) && (rt(U), U = U.next), U;
  }
  function e(w, O) {
    if (!w) return w;
    O || (O = w);
    var R = w, F;
    do
      if (F = !1, !R.steiner && (N(R, R.next) || P(R.prev, R, R.next) === 0)) {
        if (rt(R), R = O = R.prev, R === R.next) break;
        F = !0;
      } else
        R = R.next;
    while (F || R !== O);
    return O;
  }
  function r(w, O, R, F, D, C, U) {
    if (w) {
      !U && C && m(w, F, D, C);
      for (var k = w, $, K; w.prev !== w.next; ) {
        if ($ = w.prev, K = w.next, C ? s(w, F, D, C) : a(w)) {
          O.push($.i / R | 0), O.push(w.i / R | 0), O.push(K.i / R | 0), rt(w), w = K.next, k = K.next;
          continue;
        }
        if (w = K, w === k) {
          U ? U === 1 ? (w = o(e(w), O, R), r(w, O, R, F, D, C, 2)) : U === 2 && u(w, O, R, F, D, C) : r(e(w), O, R, F, D, C, 1);
          break;
        }
      }
    }
  }
  function a(w) {
    var O = w.prev, R = w, F = w.next;
    if (P(O, R, F) >= 0) return !1;
    for (var D = O.x, C = R.x, U = F.x, k = O.y, $ = R.y, K = F.y, I = D < C ? D < U ? D : U : C < U ? C : U, tt = k < $ ? k < K ? k : K : $ < K ? $ : K, q = D > C ? D > U ? D : U : C > U ? C : U, nt = k > $ ? k > K ? k : K : $ > K ? $ : K, Q = F.next; Q !== O; ) {
      if (Q.x >= I && Q.x <= q && Q.y >= tt && Q.y <= nt && b(D, k, C, $, U, K, Q.x, Q.y) && P(Q.prev, Q, Q.next) >= 0) return !1;
      Q = Q.next;
    }
    return !0;
  }
  function s(w, O, R, F) {
    var D = w.prev, C = w, U = w.next;
    if (P(D, C, U) >= 0) return !1;
    for (var k = D.x, $ = C.x, K = U.x, I = D.y, tt = C.y, q = U.y, nt = k < $ ? k < K ? k : K : $ < K ? $ : K, Q = I < tt ? I < q ? I : q : tt < q ? tt : q, V = k > $ ? k > K ? k : K : $ > K ? $ : K, st = I > tt ? I > q ? I : q : tt > q ? tt : q, it = y(nt, Q, O, R, F), z = y(V, st, O, R, F), J = w.prevZ, et = w.nextZ; J && J.z >= it && et && et.z <= z; ) {
      if (J.x >= nt && J.x <= V && J.y >= Q && J.y <= st && J !== D && J !== U && b(k, I, $, tt, K, q, J.x, J.y) && P(J.prev, J, J.next) >= 0 || (J = J.prevZ, et.x >= nt && et.x <= V && et.y >= Q && et.y <= st && et !== D && et !== U && b(k, I, $, tt, K, q, et.x, et.y) && P(et.prev, et, et.next) >= 0)) return !1;
      et = et.nextZ;
    }
    for (; J && J.z >= it; ) {
      if (J.x >= nt && J.x <= V && J.y >= Q && J.y <= st && J !== D && J !== U && b(k, I, $, tt, K, q, J.x, J.y) && P(J.prev, J, J.next) >= 0) return !1;
      J = J.prevZ;
    }
    for (; et && et.z <= z; ) {
      if (et.x >= nt && et.x <= V && et.y >= Q && et.y <= st && et !== D && et !== U && b(k, I, $, tt, K, q, et.x, et.y) && P(et.prev, et, et.next) >= 0) return !1;
      et = et.nextZ;
    }
    return !0;
  }
  function o(w, O, R) {
    var F = w;
    do {
      var D = F.prev, C = F.next.next;
      !N(D, C) && E(D, F, F.next, C) && L(D, C) && L(C, D) && (O.push(D.i / R | 0), O.push(F.i / R | 0), O.push(C.i / R | 0), rt(F), rt(F.next), F = w = C), F = F.next;
    } while (F !== w);
    return e(F);
  }
  function u(w, O, R, F, D, C) {
    var U = w;
    do {
      for (var k = U.next.next; k !== U.prev; ) {
        if (U.i !== k.i && S(U, k)) {
          var $ = Y(U, k);
          U = e(U, U.next), $ = e($, $.next), r(U, O, R, F, D, C, 0), r($, O, R, F, D, C, 0);
          return;
        }
        k = k.next;
      }
      U = U.next;
    } while (U !== w);
  }
  function h(w, O, R, F) {
    var D = [], C, U, k, $, K;
    for (C = 0, U = O.length; C < U; C++)
      k = O[C] * F, $ = C < U - 1 ? O[C + 1] * F : w.length, K = t(w, k, $, F, !1), K === K.next && (K.steiner = !0), D.push(_(K));
    for (D.sort(l), C = 0; C < D.length; C++)
      R = c(D[C], R);
    return R;
  }
  function l(w, O) {
    return w.x - O.x;
  }
  function c(w, O) {
    var R = v(w, O);
    if (!R)
      return O;
    var F = Y(R, w);
    return e(F, F.next), e(R, R.next);
  }
  function v(w, O) {
    var R = O, F = w.x, D = w.y, C = -1 / 0, U;
    do {
      if (D <= R.y && D >= R.next.y && R.next.y !== R.y) {
        var k = R.x + (D - R.y) * (R.next.x - R.x) / (R.next.y - R.y);
        if (k <= F && k > C && (C = k, U = R.x < R.next.x ? R : R.next, k === F))
          return U;
      }
      R = R.next;
    } while (R !== O);
    if (!U) return null;
    var $ = U, K = U.x, I = U.y, tt = 1 / 0, q;
    R = U;
    do
      F >= R.x && R.x >= K && F !== R.x && b(D < I ? F : C, D, K, I, D < I ? C : F, D, R.x, R.y) && (q = Math.abs(D - R.y) / (F - R.x), L(R, w) && (q < tt || q === tt && (R.x > U.x || R.x === U.x && d(U, R))) && (U = R, tt = q)), R = R.next;
    while (R !== $);
    return U;
  }
  function d(w, O) {
    return P(w.prev, w, O.prev) < 0 && P(O.next, w, w.next) < 0;
  }
  function m(w, O, R, F) {
    var D = w;
    do
      D.z === 0 && (D.z = y(D.x, D.y, O, R, F)), D.prevZ = D.prev, D.nextZ = D.next, D = D.next;
    while (D !== w);
    D.prevZ.nextZ = null, D.prevZ = null, g(D);
  }
  function g(w) {
    var O, R, F, D, C, U, k, $, K = 1;
    do {
      for (R = w, w = null, C = null, U = 0; R; ) {
        for (U++, F = R, k = 0, O = 0; O < K && (k++, F = F.nextZ, !!F); O++)
          ;
        for ($ = K; k > 0 || $ > 0 && F; )
          k !== 0 && ($ === 0 || !F || R.z <= F.z) ? (D = R, R = R.nextZ, k--) : (D = F, F = F.nextZ, $--), C ? C.nextZ = D : w = D, D.prevZ = C, C = D;
        R = F;
      }
      C.nextZ = null, K *= 2;
    } while (U > 1);
    return w;
  }
  function y(w, O, R, F, D) {
    return w = (w - R) * D | 0, O = (O - F) * D | 0, w = (w | w << 8) & 16711935, w = (w | w << 4) & 252645135, w = (w | w << 2) & 858993459, w = (w | w << 1) & 1431655765, O = (O | O << 8) & 16711935, O = (O | O << 4) & 252645135, O = (O | O << 2) & 858993459, O = (O | O << 1) & 1431655765, w | O << 1;
  }
  function _(w) {
    var O = w, R = w;
    do
      (O.x < R.x || O.x === R.x && O.y < R.y) && (R = O), O = O.next;
    while (O !== w);
    return R;
  }
  function b(w, O, R, F, D, C, U, k) {
    return (D - U) * (O - k) >= (w - U) * (C - k) && (w - U) * (F - k) >= (R - U) * (O - k) && (R - U) * (C - k) >= (D - U) * (F - k);
  }
  function S(w, O) {
    return w.next.i !== O.i && w.prev.i !== O.i && !A(w, O) && // dones't intersect other edges
    (L(w, O) && L(O, w) && B(w, O) && // locally visible
    (P(w.prev, w, O.prev) || P(w, O.prev, O)) || // does not create opposite-facing sectors
    N(w, O) && P(w.prev, w, w.next) > 0 && P(O.prev, O, O.next) > 0);
  }
  function P(w, O, R) {
    return (O.y - w.y) * (R.x - O.x) - (O.x - w.x) * (R.y - O.y);
  }
  function N(w, O) {
    return w.x === O.x && w.y === O.y;
  }
  function E(w, O, R, F) {
    var D = T(P(w, O, R)), C = T(P(w, O, F)), U = T(P(R, F, w)), k = T(P(R, F, O));
    return !!(D !== C && U !== k || D === 0 && M(w, R, O) || C === 0 && M(w, F, O) || U === 0 && M(R, w, F) || k === 0 && M(R, O, F));
  }
  function M(w, O, R) {
    return O.x <= Math.max(w.x, R.x) && O.x >= Math.min(w.x, R.x) && O.y <= Math.max(w.y, R.y) && O.y >= Math.min(w.y, R.y);
  }
  function T(w) {
    return w > 0 ? 1 : w < 0 ? -1 : 0;
  }
  function A(w, O) {
    var R = w;
    do {
      if (R.i !== w.i && R.next.i !== w.i && R.i !== O.i && R.next.i !== O.i && E(R, R.next, w, O)) return !0;
      R = R.next;
    } while (R !== w);
    return !1;
  }
  function L(w, O) {
    return P(w.prev, w, w.next) < 0 ? P(w, O, w.next) >= 0 && P(w, w.prev, O) >= 0 : P(w, O, w.prev) < 0 || P(w, w.next, O) < 0;
  }
  function B(w, O) {
    var R = w, F = !1, D = (w.x + O.x) / 2, C = (w.y + O.y) / 2;
    do
      R.y > C != R.next.y > C && R.next.y !== R.y && D < (R.next.x - R.x) * (C - R.y) / (R.next.y - R.y) + R.x && (F = !F), R = R.next;
    while (R !== w);
    return F;
  }
  function Y(w, O) {
    var R = new at(w.i, w.x, w.y), F = new at(O.i, O.x, O.y), D = w.next, C = O.prev;
    return w.next = O, O.prev = w, R.next = D, D.prev = R, F.next = R, R.prev = F, C.next = F, F.prev = C, F;
  }
  function H(w, O, R, F) {
    var D = new at(w, O, R);
    return F ? (D.next = F.next, D.prev = F, F.next.prev = D, F.next = D) : (D.prev = D, D.next = D), D;
  }
  function rt(w) {
    w.next.prev = w.prev, w.prev.next = w.next, w.prevZ && (w.prevZ.nextZ = w.nextZ), w.nextZ && (w.nextZ.prevZ = w.prevZ);
  }
  function at(w, O, R) {
    this.i = w, this.x = O, this.y = R, this.prev = null, this.next = null, this.z = 0, this.prevZ = null, this.nextZ = null, this.steiner = !1;
  }
  n.deviation = function(w, O, R, F) {
    var D = O && O.length, C = D ? O[0] * R : w.length, U = Math.abs(Z(w, 0, C, R));
    if (D)
      for (var k = 0, $ = O.length; k < $; k++) {
        var K = O[k] * R, I = k < $ - 1 ? O[k + 1] * R : w.length;
        U -= Math.abs(Z(w, K, I, R));
      }
    var tt = 0;
    for (k = 0; k < F.length; k += 3) {
      var q = F[k] * R, nt = F[k + 1] * R, Q = F[k + 2] * R;
      tt += Math.abs(
        (w[q] - w[Q]) * (w[nt + 1] - w[q + 1]) - (w[q] - w[nt]) * (w[Q + 1] - w[q + 1])
      );
    }
    return U === 0 && tt === 0 ? 0 : Math.abs((tt - U) / U);
  };
  function Z(w, O, R, F) {
    for (var D = 0, C = O, U = R - F; C < R; C += F)
      D += (w[U] - w[C]) * (w[C + 1] + w[U + 1]), U = C;
    return D;
  }
  return n.flatten = function(w) {
    for (var O = w[0][0].length, R = { vertices: [], holes: [], dimensions: O }, F = 0, D = 0; D < w.length; D++) {
      for (var C = 0; C < w[D].length; C++)
        for (var U = 0; U < O; U++) R.vertices.push(w[D][C][U]);
      D > 0 && (F += w[D - 1].length, R.holes.push(F));
    }
    return R;
  }, earcut$1.exports;
}
var earcutExports = requireEarcut();
const earcut = /* @__PURE__ */ getDefaultExportFromCjs(earcutExports);
var url$2 = {}, punycode$1 = { exports: {} };
/*! https://mths.be/punycode v1.4.1 by @mathias */
var punycode = punycode$1.exports, hasRequiredPunycode;
function requirePunycode() {
  return hasRequiredPunycode || (hasRequiredPunycode = 1, function(n, t) {
    (function(e) {
      var r = t && !t.nodeType && t, a = n && !n.nodeType && n, s = typeof commonjsGlobal == "object" && commonjsGlobal;
      (s.global === s || s.window === s || s.self === s) && (e = s);
      var o, u = 2147483647, h = 36, l = 1, c = 26, v = 38, d = 700, m = 72, g = 128, y = "-", _ = /^xn--/, b = /[^\x20-\x7E]/, S = /[\x2E\u3002\uFF0E\uFF61]/g, P = {
        overflow: "Overflow: input needs wider integers to process",
        "not-basic": "Illegal input >= 0x80 (not a basic code point)",
        "invalid-input": "Invalid input"
      }, N = h - l, E = Math.floor, M = String.fromCharCode, T;
      function A(D) {
        throw new RangeError(P[D]);
      }
      function L(D, C) {
        for (var U = D.length, k = []; U--; )
          k[U] = C(D[U]);
        return k;
      }
      function B(D, C) {
        var U = D.split("@"), k = "";
        U.length > 1 && (k = U[0] + "@", D = U[1]), D = D.replace(S, ".");
        var $ = D.split("."), K = L($, C).join(".");
        return k + K;
      }
      function Y(D) {
        for (var C = [], U = 0, k = D.length, $, K; U < k; )
          $ = D.charCodeAt(U++), $ >= 55296 && $ <= 56319 && U < k ? (K = D.charCodeAt(U++), (K & 64512) == 56320 ? C.push((($ & 1023) << 10) + (K & 1023) + 65536) : (C.push($), U--)) : C.push($);
        return C;
      }
      function H(D) {
        return L(D, function(C) {
          var U = "";
          return C > 65535 && (C -= 65536, U += M(C >>> 10 & 1023 | 55296), C = 56320 | C & 1023), U += M(C), U;
        }).join("");
      }
      function rt(D) {
        return D - 48 < 10 ? D - 22 : D - 65 < 26 ? D - 65 : D - 97 < 26 ? D - 97 : h;
      }
      function at(D, C) {
        return D + 22 + 75 * (D < 26) - ((C != 0) << 5);
      }
      function Z(D, C, U) {
        var k = 0;
        for (D = U ? E(D / d) : D >> 1, D += E(D / C); D > N * c >> 1; k += h)
          D = E(D / N);
        return E(k + (N + 1) * D / (D + v));
      }
      function w(D) {
        var C = [], U = D.length, k, $ = 0, K = g, I = m, tt, q, nt, Q, V, st, it, z, J;
        for (tt = D.lastIndexOf(y), tt < 0 && (tt = 0), q = 0; q < tt; ++q)
          D.charCodeAt(q) >= 128 && A("not-basic"), C.push(D.charCodeAt(q));
        for (nt = tt > 0 ? tt + 1 : 0; nt < U; ) {
          for (Q = $, V = 1, st = h; nt >= U && A("invalid-input"), it = rt(D.charCodeAt(nt++)), (it >= h || it > E((u - $) / V)) && A("overflow"), $ += it * V, z = st <= I ? l : st >= I + c ? c : st - I, !(it < z); st += h)
            J = h - z, V > E(u / J) && A("overflow"), V *= J;
          k = C.length + 1, I = Z($ - Q, k, Q == 0), E($ / k) > u - K && A("overflow"), K += E($ / k), $ %= k, C.splice($++, 0, K);
        }
        return H(C);
      }
      function O(D) {
        var C, U, k, $, K, I, tt, q, nt, Q, V, st = [], it, z, J, et;
        for (D = Y(D), it = D.length, C = g, U = 0, K = m, I = 0; I < it; ++I)
          V = D[I], V < 128 && st.push(M(V));
        for (k = $ = st.length, $ && st.push(y); k < it; ) {
          for (tt = u, I = 0; I < it; ++I)
            V = D[I], V >= C && V < tt && (tt = V);
          for (z = k + 1, tt - C > E((u - U) / z) && A("overflow"), U += (tt - C) * z, C = tt, I = 0; I < it; ++I)
            if (V = D[I], V < C && ++U > u && A("overflow"), V == C) {
              for (q = U, nt = h; Q = nt <= K ? l : nt >= K + c ? c : nt - K, !(q < Q); nt += h)
                et = q - Q, J = h - Q, st.push(
                  M(at(Q + et % J, 0))
                ), q = E(et / J);
              st.push(M(at(q, 0))), K = Z(U, z, k == $), U = 0, ++k;
            }
          ++U, ++C;
        }
        return st.join("");
      }
      function R(D) {
        return B(D, function(C) {
          return _.test(C) ? w(C.slice(4).toLowerCase()) : C;
        });
      }
      function F(D) {
        return B(D, function(C) {
          return b.test(C) ? "xn--" + O(C) : C;
        });
      }
      if (o = {
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
          decode: Y,
          encode: H
        },
        decode: w,
        encode: O,
        toASCII: F,
        toUnicode: R
      }, r && a)
        if (n.exports == r)
          a.exports = o;
        else
          for (T in o)
            o.hasOwnProperty(T) && (r[T] = o[T]);
      else
        e.punycode = o;
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
var shams, hasRequiredShams;
function requireShams() {
  return hasRequiredShams || (hasRequiredShams = 1, shams = function() {
    if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function")
      return !1;
    if (typeof Symbol.iterator == "symbol")
      return !0;
    var t = {}, e = Symbol("test"), r = Object(e);
    if (typeof e == "string" || Object.prototype.toString.call(e) !== "[object Symbol]" || Object.prototype.toString.call(r) !== "[object Symbol]")
      return !1;
    var a = 42;
    t[e] = a;
    for (e in t)
      return !1;
    if (typeof Object.keys == "function" && Object.keys(t).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(t).length !== 0)
      return !1;
    var s = Object.getOwnPropertySymbols(t);
    if (s.length !== 1 || s[0] !== e || !Object.prototype.propertyIsEnumerable.call(t, e))
      return !1;
    if (typeof Object.getOwnPropertyDescriptor == "function") {
      var o = Object.getOwnPropertyDescriptor(t, e);
      if (o.value !== a || o.enumerable !== !0)
        return !1;
    }
    return !0;
  }), shams;
}
var hasSymbols, hasRequiredHasSymbols;
function requireHasSymbols() {
  if (hasRequiredHasSymbols) return hasSymbols;
  hasRequiredHasSymbols = 1;
  var n = typeof Symbol < "u" && Symbol, t = requireShams();
  return hasSymbols = function() {
    return typeof n != "function" || typeof Symbol != "function" || typeof n("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 : t();
  }, hasSymbols;
}
var hasProto, hasRequiredHasProto;
function requireHasProto() {
  if (hasRequiredHasProto) return hasProto;
  hasRequiredHasProto = 1;
  var n = {
    __proto__: null,
    foo: {}
  }, t = Object;
  return hasProto = function() {
    return { __proto__: n }.foo === n.foo && !(n instanceof t);
  }, hasProto;
}
var implementation, hasRequiredImplementation;
function requireImplementation() {
  if (hasRequiredImplementation) return implementation;
  hasRequiredImplementation = 1;
  var n = "Function.prototype.bind called on incompatible ", t = Object.prototype.toString, e = Math.max, r = "[object Function]", a = function(h, l) {
    for (var c = [], v = 0; v < h.length; v += 1)
      c[v] = h[v];
    for (var d = 0; d < l.length; d += 1)
      c[d + h.length] = l[d];
    return c;
  }, s = function(h, l) {
    for (var c = [], v = l, d = 0; v < h.length; v += 1, d += 1)
      c[d] = h[v];
    return c;
  }, o = function(u, h) {
    for (var l = "", c = 0; c < u.length; c += 1)
      l += u[c], c + 1 < u.length && (l += h);
    return l;
  };
  return implementation = function(h) {
    var l = this;
    if (typeof l != "function" || t.apply(l) !== r)
      throw new TypeError(n + l);
    for (var c = s(arguments, 1), v, d = function() {
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
    }, m = e(0, l.length - c.length), g = [], y = 0; y < m; y++)
      g[y] = "$" + y;
    if (v = Function("binder", "return function (" + o(g, ",") + "){ return binder.apply(this,arguments); }")(d), l.prototype) {
      var _ = function() {
      };
      _.prototype = l.prototype, v.prototype = new _(), _.prototype = null;
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
  var n = Function.prototype.call, t = Object.prototype.hasOwnProperty, e = requireFunctionBind();
  return hasown = e.call(n, t), hasown;
}
var getIntrinsic, hasRequiredGetIntrinsic;
function requireGetIntrinsic() {
  if (hasRequiredGetIntrinsic) return getIntrinsic;
  hasRequiredGetIntrinsic = 1;
  var n, t = /* @__PURE__ */ requireEsErrors(), e = /* @__PURE__ */ require_eval(), r = /* @__PURE__ */ requireRange(), a = /* @__PURE__ */ requireRef(), s = /* @__PURE__ */ requireSyntax(), o = /* @__PURE__ */ requireType(), u = /* @__PURE__ */ requireUri(), h = Function, l = function(O) {
    try {
      return h('"use strict"; return (' + O + ").constructor;")();
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
    throw new o();
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
  }() : v, m = requireHasSymbols()(), g = /* @__PURE__ */ requireHasProto()(), y = Object.getPrototypeOf || (g ? function(O) {
    return O.__proto__;
  } : null), _ = {}, b = typeof Uint8Array > "u" || !y ? n : y(Uint8Array), S = {
    __proto__: null,
    "%AggregateError%": typeof AggregateError > "u" ? n : AggregateError,
    "%Array%": Array,
    "%ArrayBuffer%": typeof ArrayBuffer > "u" ? n : ArrayBuffer,
    "%ArrayIteratorPrototype%": m && y ? y([][Symbol.iterator]()) : n,
    "%AsyncFromSyncIteratorPrototype%": n,
    "%AsyncFunction%": _,
    "%AsyncGenerator%": _,
    "%AsyncGeneratorFunction%": _,
    "%AsyncIteratorPrototype%": _,
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
    "%Error%": t,
    "%eval%": eval,
    // eslint-disable-line no-eval
    "%EvalError%": e,
    "%Float32Array%": typeof Float32Array > "u" ? n : Float32Array,
    "%Float64Array%": typeof Float64Array > "u" ? n : Float64Array,
    "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? n : FinalizationRegistry,
    "%Function%": h,
    "%GeneratorFunction%": _,
    "%Int8Array%": typeof Int8Array > "u" ? n : Int8Array,
    "%Int16Array%": typeof Int16Array > "u" ? n : Int16Array,
    "%Int32Array%": typeof Int32Array > "u" ? n : Int32Array,
    "%isFinite%": isFinite,
    "%isNaN%": isNaN,
    "%IteratorPrototype%": m && y ? y(y([][Symbol.iterator]())) : n,
    "%JSON%": typeof JSON == "object" ? JSON : n,
    "%Map%": typeof Map > "u" ? n : Map,
    "%MapIteratorPrototype%": typeof Map > "u" || !m || !y ? n : y((/* @__PURE__ */ new Map())[Symbol.iterator]()),
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
    "%SetIteratorPrototype%": typeof Set > "u" || !m || !y ? n : y((/* @__PURE__ */ new Set())[Symbol.iterator]()),
    "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? n : SharedArrayBuffer,
    "%String%": String,
    "%StringIteratorPrototype%": m && y ? y(""[Symbol.iterator]()) : n,
    "%Symbol%": m ? Symbol : n,
    "%SyntaxError%": s,
    "%ThrowTypeError%": d,
    "%TypedArray%": b,
    "%TypeError%": o,
    "%Uint8Array%": typeof Uint8Array > "u" ? n : Uint8Array,
    "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? n : Uint8ClampedArray,
    "%Uint16Array%": typeof Uint16Array > "u" ? n : Uint16Array,
    "%Uint32Array%": typeof Uint32Array > "u" ? n : Uint32Array,
    "%URIError%": u,
    "%WeakMap%": typeof WeakMap > "u" ? n : WeakMap,
    "%WeakRef%": typeof WeakRef > "u" ? n : WeakRef,
    "%WeakSet%": typeof WeakSet > "u" ? n : WeakSet
  };
  if (y)
    try {
      null.error;
    } catch (O) {
      var P = y(y(O));
      S["%Error.prototype%"] = P;
    }
  var N = function O(R) {
    var F;
    if (R === "%AsyncFunction%")
      F = l("async function () {}");
    else if (R === "%GeneratorFunction%")
      F = l("function* () {}");
    else if (R === "%AsyncGeneratorFunction%")
      F = l("async function* () {}");
    else if (R === "%AsyncGenerator%") {
      var D = O("%AsyncGeneratorFunction%");
      D && (F = D.prototype);
    } else if (R === "%AsyncIteratorPrototype%") {
      var C = O("%AsyncGenerator%");
      C && y && (F = y(C.prototype));
    }
    return S[R] = F, F;
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
  }, M = requireFunctionBind(), T = /* @__PURE__ */ requireHasown(), A = M.call(Function.call, Array.prototype.concat), L = M.call(Function.apply, Array.prototype.splice), B = M.call(Function.call, String.prototype.replace), Y = M.call(Function.call, String.prototype.slice), H = M.call(Function.call, RegExp.prototype.exec), rt = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, at = /\\(\\)?/g, Z = function(R) {
    var F = Y(R, 0, 1), D = Y(R, -1);
    if (F === "%" && D !== "%")
      throw new s("invalid intrinsic syntax, expected closing `%`");
    if (D === "%" && F !== "%")
      throw new s("invalid intrinsic syntax, expected opening `%`");
    var C = [];
    return B(R, rt, function(U, k, $, K) {
      C[C.length] = $ ? B(K, at, "$1") : k || U;
    }), C;
  }, w = function(R, F) {
    var D = R, C;
    if (T(E, D) && (C = E[D], D = "%" + C[0] + "%"), T(S, D)) {
      var U = S[D];
      if (U === _ && (U = N(D)), typeof U > "u" && !F)
        throw new o("intrinsic " + R + " exists, but is not available. Please file an issue!");
      return {
        alias: C,
        name: D,
        value: U
      };
    }
    throw new s("intrinsic " + R + " does not exist!");
  };
  return getIntrinsic = function(R, F) {
    if (typeof R != "string" || R.length === 0)
      throw new o("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof F != "boolean")
      throw new o('"allowMissing" argument must be a boolean');
    if (H(/^%?[^%]*%?$/, R) === null)
      throw new s("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var D = Z(R), C = D.length > 0 ? D[0] : "", U = w("%" + C + "%", F), k = U.name, $ = U.value, K = !1, I = U.alias;
    I && (C = I[0], L(D, A([0, 1], I)));
    for (var tt = 1, q = !0; tt < D.length; tt += 1) {
      var nt = D[tt], Q = Y(nt, 0, 1), V = Y(nt, -1);
      if ((Q === '"' || Q === "'" || Q === "`" || V === '"' || V === "'" || V === "`") && Q !== V)
        throw new s("property names with quotes must have matching quotes");
      if ((nt === "constructor" || !q) && (K = !0), C += "." + nt, k = "%" + C + "%", T(S, k))
        $ = S[k];
      else if ($ != null) {
        if (!(nt in $)) {
          if (!F)
            throw new o("base intrinsic for " + R + " exists, but the property is not available.");
          return;
        }
        if (c && tt + 1 >= D.length) {
          var st = c($, nt);
          q = !!st, q && "get" in st && !("originalValue" in st.get) ? $ = st.get : $ = $[nt];
        } else
          q = T($, nt), $ = $[nt];
        q && !K && (S[k] = $);
      }
    }
    return $;
  }, getIntrinsic;
}
var callBind = { exports: {} }, esDefineProperty, hasRequiredEsDefineProperty;
function requireEsDefineProperty() {
  if (hasRequiredEsDefineProperty) return esDefineProperty;
  hasRequiredEsDefineProperty = 1;
  var n = /* @__PURE__ */ requireGetIntrinsic(), t = n("%Object.defineProperty%", !0) || !1;
  if (t)
    try {
      t({}, "a", { value: 1 });
    } catch {
      t = !1;
    }
  return esDefineProperty = t, esDefineProperty;
}
var gopd, hasRequiredGopd;
function requireGopd() {
  if (hasRequiredGopd) return gopd;
  hasRequiredGopd = 1;
  var n = /* @__PURE__ */ requireGetIntrinsic(), t = n("%Object.getOwnPropertyDescriptor%", !0);
  if (t)
    try {
      t([], "length");
    } catch {
      t = null;
    }
  return gopd = t, gopd;
}
var defineDataProperty, hasRequiredDefineDataProperty;
function requireDefineDataProperty() {
  if (hasRequiredDefineDataProperty) return defineDataProperty;
  hasRequiredDefineDataProperty = 1;
  var n = /* @__PURE__ */ requireEsDefineProperty(), t = /* @__PURE__ */ requireSyntax(), e = /* @__PURE__ */ requireType(), r = /* @__PURE__ */ requireGopd();
  return defineDataProperty = function(s, o, u) {
    if (!s || typeof s != "object" && typeof s != "function")
      throw new e("`obj` must be an object or a function`");
    if (typeof o != "string" && typeof o != "symbol")
      throw new e("`property` must be a string or a symbol`");
    if (arguments.length > 3 && typeof arguments[3] != "boolean" && arguments[3] !== null)
      throw new e("`nonEnumerable`, if provided, must be a boolean or null");
    if (arguments.length > 4 && typeof arguments[4] != "boolean" && arguments[4] !== null)
      throw new e("`nonWritable`, if provided, must be a boolean or null");
    if (arguments.length > 5 && typeof arguments[5] != "boolean" && arguments[5] !== null)
      throw new e("`nonConfigurable`, if provided, must be a boolean or null");
    if (arguments.length > 6 && typeof arguments[6] != "boolean")
      throw new e("`loose`, if provided, must be a boolean");
    var h = arguments.length > 3 ? arguments[3] : null, l = arguments.length > 4 ? arguments[4] : null, c = arguments.length > 5 ? arguments[5] : null, v = arguments.length > 6 ? arguments[6] : !1, d = !!r && r(s, o);
    if (n)
      n(s, o, {
        configurable: c === null && d ? d.configurable : !c,
        enumerable: h === null && d ? d.enumerable : !h,
        value: u,
        writable: l === null && d ? d.writable : !l
      });
    else if (v || !h && !l && !c)
      s[o] = u;
    else
      throw new t("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
  }, defineDataProperty;
}
var hasPropertyDescriptors_1, hasRequiredHasPropertyDescriptors;
function requireHasPropertyDescriptors() {
  if (hasRequiredHasPropertyDescriptors) return hasPropertyDescriptors_1;
  hasRequiredHasPropertyDescriptors = 1;
  var n = /* @__PURE__ */ requireEsDefineProperty(), t = function() {
    return !!n;
  };
  return t.hasArrayLengthDefineBug = function() {
    if (!n)
      return null;
    try {
      return n([], "length", { value: 1 }).length !== 1;
    } catch {
      return !0;
    }
  }, hasPropertyDescriptors_1 = t, hasPropertyDescriptors_1;
}
var setFunctionLength, hasRequiredSetFunctionLength;
function requireSetFunctionLength() {
  if (hasRequiredSetFunctionLength) return setFunctionLength;
  hasRequiredSetFunctionLength = 1;
  var n = /* @__PURE__ */ requireGetIntrinsic(), t = /* @__PURE__ */ requireDefineDataProperty(), e = /* @__PURE__ */ requireHasPropertyDescriptors()(), r = /* @__PURE__ */ requireGopd(), a = /* @__PURE__ */ requireType(), s = n("%Math.floor%");
  return setFunctionLength = function(u, h) {
    if (typeof u != "function")
      throw new a("`fn` is not a function");
    if (typeof h != "number" || h < 0 || h > 4294967295 || s(h) !== h)
      throw new a("`length` must be a positive 32-bit integer");
    var l = arguments.length > 2 && !!arguments[2], c = !0, v = !0;
    if ("length" in u && r) {
      var d = r(u, "length");
      d && !d.configurable && (c = !1), d && !d.writable && (v = !1);
    }
    return (c || v || !l) && (e ? t(
      /** @type {Parameters<define>[0]} */
      u,
      "length",
      h,
      !0,
      !0
    ) : t(
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
    var t = requireFunctionBind(), e = /* @__PURE__ */ requireGetIntrinsic(), r = /* @__PURE__ */ requireSetFunctionLength(), a = /* @__PURE__ */ requireType(), s = e("%Function.prototype.apply%"), o = e("%Function.prototype.call%"), u = e("%Reflect.apply%", !0) || t.call(o, s), h = /* @__PURE__ */ requireEsDefineProperty(), l = e("%Math.max%");
    n.exports = function(d) {
      if (typeof d != "function")
        throw new a("a function is required");
      var m = u(t, o, arguments);
      return r(
        m,
        1 + l(0, d.length - (arguments.length - 1)),
        !0
      );
    };
    var c = function() {
      return u(t, s, arguments);
    };
    h ? h(n.exports, "apply", { value: c }) : n.exports.apply = c;
  }(callBind)), callBind.exports;
}
var callBound, hasRequiredCallBound;
function requireCallBound() {
  if (hasRequiredCallBound) return callBound;
  hasRequiredCallBound = 1;
  var n = /* @__PURE__ */ requireGetIntrinsic(), t = requireCallBind(), e = t(n("String.prototype.indexOf"));
  return callBound = function(a, s) {
    var o = n(a, !!s);
    return typeof o == "function" && e(a, ".prototype.") > -1 ? t(o) : o;
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
  var n = typeof Map == "function" && Map.prototype, t = Object.getOwnPropertyDescriptor && n ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null, e = n && t && typeof t.get == "function" ? t.get : null, r = n && Map.prototype.forEach, a = typeof Set == "function" && Set.prototype, s = Object.getOwnPropertyDescriptor && a ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null, o = a && s && typeof s.get == "function" ? s.get : null, u = a && Set.prototype.forEach, h = typeof WeakMap == "function" && WeakMap.prototype, l = h ? WeakMap.prototype.has : null, c = typeof WeakSet == "function" && WeakSet.prototype, v = c ? WeakSet.prototype.has : null, d = typeof WeakRef == "function" && WeakRef.prototype, m = d ? WeakRef.prototype.deref : null, g = Boolean.prototype.valueOf, y = Object.prototype.toString, _ = Function.prototype.toString, b = String.prototype.match, S = String.prototype.slice, P = String.prototype.replace, N = String.prototype.toUpperCase, E = String.prototype.toLowerCase, M = RegExp.prototype.test, T = Array.prototype.concat, A = Array.prototype.join, L = Array.prototype.slice, B = Math.floor, Y = typeof BigInt == "function" ? BigInt.prototype.valueOf : null, H = Object.getOwnPropertySymbols, rt = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Symbol.prototype.toString : null, at = typeof Symbol == "function" && typeof Symbol.iterator == "object", Z = typeof Symbol == "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === at || !0) ? Symbol.toStringTag : null, w = Object.prototype.propertyIsEnumerable, O = (typeof Reflect == "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(G) {
    return G.__proto__;
  } : null);
  function R(G, X) {
    if (G === 1 / 0 || G === -1 / 0 || G !== G || G && G > -1e3 && G < 1e3 || M.call(/e/, X))
      return X;
    var ht = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
    if (typeof G == "number") {
      var ft = G < 0 ? -B(-G) : B(G);
      if (ft !== G) {
        var ct = String(ft), ot = S.call(X, ct.length + 1);
        return P.call(ct, ht, "$&_") + "." + P.call(P.call(ot, /([0-9]{3})/g, "$&_"), /_$/, "");
      }
    }
    return P.call(X, ht, "$&_");
  }
  var F = require$$0, D = F.custom, C = it(D) ? D : null, U = {
    __proto__: null,
    double: '"',
    single: "'"
  }, k = {
    __proto__: null,
    double: /(["\\])/g,
    single: /(['\\])/g
  };
  objectInspect = function G(X, ht, ft, ct) {
    var ot = ht || {};
    if (et(ot, "quoteStyle") && !et(U, ot.quoteStyle))
      throw new TypeError('option "quoteStyle" must be "single" or "double"');
    if (et(ot, "maxStringLength") && (typeof ot.maxStringLength == "number" ? ot.maxStringLength < 0 && ot.maxStringLength !== 1 / 0 : ot.maxStringLength !== null))
      throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
    var xt = et(ot, "customInspect") ? ot.customInspect : !0;
    if (typeof xt != "boolean" && xt !== "symbol")
      throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
    if (et(ot, "indent") && ot.indent !== null && ot.indent !== "	" && !(parseInt(ot.indent, 10) === ot.indent && ot.indent > 0))
      throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
    if (et(ot, "numericSeparator") && typeof ot.numericSeparator != "boolean")
      throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
    var wt = ot.numericSeparator;
    if (typeof X > "u")
      return "undefined";
    if (X === null)
      return "null";
    if (typeof X == "boolean")
      return X ? "true" : "false";
    if (typeof X == "string")
      return dt(X, ot);
    if (typeof X == "number") {
      if (X === 0)
        return 1 / 0 / X > 0 ? "0" : "-0";
      var mt = String(X);
      return wt ? R(X, mt) : mt;
    }
    if (typeof X == "bigint") {
      var Et = String(X) + "n";
      return wt ? R(X, Et) : Et;
    }
    var Lt = typeof ot.depth > "u" ? 5 : ot.depth;
    if (typeof ft > "u" && (ft = 0), ft >= Lt && Lt > 0 && typeof X == "object")
      return I(X) ? "[Array]" : "[Object]";
    var At = Jt(ot, ft);
    if (typeof ct > "u")
      ct = [];
    else if (yt(ct, X) >= 0)
      return "[Circular]";
    function gt(Mt, Dt, te) {
      if (Dt && (ct = L.call(ct), ct.push(Dt)), te) {
        var Zt = {
          depth: ot.depth
        };
        return et(ot, "quoteStyle") && (Zt.quoteStyle = ot.quoteStyle), G(Mt, Zt, ft + 1, ct);
      }
      return G(Mt, ot, ft + 1, ct);
    }
    if (typeof X == "function" && !q(X)) {
      var Xt = vt(X), zt = It(X, gt);
      return "[Function" + (Xt ? ": " + Xt : " (anonymous)") + "]" + (zt.length > 0 ? " { " + A.call(zt, ", ") + " }" : "");
    }
    if (it(X)) {
      var $t = at ? P.call(String(X), /^(Symbol\(.*\))_[^)]*$/, "$1") : rt.call(X);
      return typeof X == "object" && !at ? ut($t) : $t;
    }
    if (pt(X)) {
      for (var Ot = "<" + E.call(String(X.nodeName)), Ft = X.attributes || [], Ct = 0; Ct < Ft.length; Ct++)
        Ot += " " + Ft[Ct].name + "=" + $(K(Ft[Ct].value), "double", ot);
      return Ot += ">", X.childNodes && X.childNodes.length && (Ot += "..."), Ot += "</" + E.call(String(X.nodeName)) + ">", Ot;
    }
    if (I(X)) {
      if (X.length === 0)
        return "[]";
      var Bt = It(X, gt);
      return At && !Kt(Bt) ? "[" + Nt(Bt, At) + "]" : "[ " + A.call(Bt, ", ") + " ]";
    }
    if (nt(X)) {
      var kt = It(X, gt);
      return !("cause" in Error.prototype) && "cause" in X && !w.call(X, "cause") ? "{ [" + String(X) + "] " + A.call(T.call("[cause]: " + gt(X.cause), kt), ", ") + " }" : kt.length === 0 ? "[" + String(X) + "]" : "{ [" + String(X) + "] " + A.call(kt, ", ") + " }";
    }
    if (typeof X == "object" && xt) {
      if (C && typeof X[C] == "function" && F)
        return F(X, { depth: Lt - ft });
      if (xt !== "symbol" && typeof X.inspect == "function")
        return X.inspect();
    }
    if (bt(X)) {
      var Yt = [];
      return r && r.call(X, function(Mt, Dt) {
        Yt.push(gt(Dt, X, !0) + " => " + gt(Mt, X));
      }), Ht("Map", e.call(X), Yt, At);
    }
    if (St(X)) {
      var Wt = [];
      return u && u.call(X, function(Mt) {
        Wt.push(gt(Mt, X));
      }), Ht("Set", o.call(X), Wt, At);
    }
    if (Rt(X))
      return _t("WeakMap");
    if (Pt(X))
      return _t("WeakSet");
    if (Tt(X))
      return _t("WeakRef");
    if (V(X))
      return ut(gt(Number(X)));
    if (z(X))
      return ut(gt(Y.call(X)));
    if (st(X))
      return ut(g.call(X));
    if (Q(X))
      return ut(gt(String(X)));
    if (typeof window < "u" && X === window)
      return "{ [object Window] }";
    if (typeof globalThis < "u" && X === globalThis || typeof commonjsGlobal < "u" && X === commonjsGlobal)
      return "{ [object globalThis] }";
    if (!tt(X) && !q(X)) {
      var Ut = It(X, gt), Vt = O ? O(X) === Object.prototype : X instanceof Object || X.constructor === Object, Gt = X instanceof Object ? "" : "null prototype", qt = !Vt && Z && Object(X) === X && Z in X ? S.call(W(X), 8, -1) : Gt ? "Object" : "", Qt = Vt || typeof X.constructor != "function" ? "" : X.constructor.name ? X.constructor.name + " " : "", jt = Qt + (qt || Gt ? "[" + A.call(T.call([], qt || [], Gt || []), ": ") + "] " : "");
      return Ut.length === 0 ? jt + "{}" : At ? jt + "{" + Nt(Ut, At) + "}" : jt + "{ " + A.call(Ut, ", ") + " }";
    }
    return String(X);
  };
  function $(G, X, ht) {
    var ft = ht.quoteStyle || X, ct = U[ft];
    return ct + G + ct;
  }
  function K(G) {
    return P.call(String(G), /"/g, "&quot;");
  }
  function I(G) {
    return W(G) === "[object Array]" && (!Z || !(typeof G == "object" && Z in G));
  }
  function tt(G) {
    return W(G) === "[object Date]" && (!Z || !(typeof G == "object" && Z in G));
  }
  function q(G) {
    return W(G) === "[object RegExp]" && (!Z || !(typeof G == "object" && Z in G));
  }
  function nt(G) {
    return W(G) === "[object Error]" && (!Z || !(typeof G == "object" && Z in G));
  }
  function Q(G) {
    return W(G) === "[object String]" && (!Z || !(typeof G == "object" && Z in G));
  }
  function V(G) {
    return W(G) === "[object Number]" && (!Z || !(typeof G == "object" && Z in G));
  }
  function st(G) {
    return W(G) === "[object Boolean]" && (!Z || !(typeof G == "object" && Z in G));
  }
  function it(G) {
    if (at)
      return G && typeof G == "object" && G instanceof Symbol;
    if (typeof G == "symbol")
      return !0;
    if (!G || typeof G != "object" || !rt)
      return !1;
    try {
      return rt.call(G), !0;
    } catch {
    }
    return !1;
  }
  function z(G) {
    if (!G || typeof G != "object" || !Y)
      return !1;
    try {
      return Y.call(G), !0;
    } catch {
    }
    return !1;
  }
  var J = Object.prototype.hasOwnProperty || function(G) {
    return G in this;
  };
  function et(G, X) {
    return J.call(G, X);
  }
  function W(G) {
    return y.call(G);
  }
  function vt(G) {
    if (G.name)
      return G.name;
    var X = b.call(_.call(G), /^function\s*([\w$]+)/);
    return X ? X[1] : null;
  }
  function yt(G, X) {
    if (G.indexOf)
      return G.indexOf(X);
    for (var ht = 0, ft = G.length; ht < ft; ht++)
      if (G[ht] === X)
        return ht;
    return -1;
  }
  function bt(G) {
    if (!e || !G || typeof G != "object")
      return !1;
    try {
      e.call(G);
      try {
        o.call(G);
      } catch {
        return !0;
      }
      return G instanceof Map;
    } catch {
    }
    return !1;
  }
  function Rt(G) {
    if (!l || !G || typeof G != "object")
      return !1;
    try {
      l.call(G, l);
      try {
        v.call(G, v);
      } catch {
        return !0;
      }
      return G instanceof WeakMap;
    } catch {
    }
    return !1;
  }
  function Tt(G) {
    if (!m || !G || typeof G != "object")
      return !1;
    try {
      return m.call(G), !0;
    } catch {
    }
    return !1;
  }
  function St(G) {
    if (!o || !G || typeof G != "object")
      return !1;
    try {
      o.call(G);
      try {
        e.call(G);
      } catch {
        return !0;
      }
      return G instanceof Set;
    } catch {
    }
    return !1;
  }
  function Pt(G) {
    if (!v || !G || typeof G != "object")
      return !1;
    try {
      v.call(G, v);
      try {
        l.call(G, l);
      } catch {
        return !0;
      }
      return G instanceof WeakSet;
    } catch {
    }
    return !1;
  }
  function pt(G) {
    return !G || typeof G != "object" ? !1 : typeof HTMLElement < "u" && G instanceof HTMLElement ? !0 : typeof G.nodeName == "string" && typeof G.getAttribute == "function";
  }
  function dt(G, X) {
    if (G.length > X.maxStringLength) {
      var ht = G.length - X.maxStringLength, ft = "... " + ht + " more character" + (ht > 1 ? "s" : "");
      return dt(S.call(G, 0, X.maxStringLength), X) + ft;
    }
    var ct = k[X.quoteStyle || "single"];
    ct.lastIndex = 0;
    var ot = P.call(P.call(G, ct, "\\$1"), /[\x00-\x1f]/g, lt);
    return $(ot, "single", X);
  }
  function lt(G) {
    var X = G.charCodeAt(0), ht = {
      8: "b",
      9: "t",
      10: "n",
      12: "f",
      13: "r"
    }[X];
    return ht ? "\\" + ht : "\\x" + (X < 16 ? "0" : "") + N.call(X.toString(16));
  }
  function ut(G) {
    return "Object(" + G + ")";
  }
  function _t(G) {
    return G + " { ? }";
  }
  function Ht(G, X, ht, ft) {
    var ct = ft ? Nt(ht, ft) : A.call(ht, ", ");
    return G + " (" + X + ") {" + ct + "}";
  }
  function Kt(G) {
    for (var X = 0; X < G.length; X++)
      if (yt(G[X], `
`) >= 0)
        return !1;
    return !0;
  }
  function Jt(G, X) {
    var ht;
    if (G.indent === "	")
      ht = "	";
    else if (typeof G.indent == "number" && G.indent > 0)
      ht = A.call(Array(G.indent + 1), " ");
    else
      return null;
    return {
      base: ht,
      prev: A.call(Array(X + 1), ht)
    };
  }
  function Nt(G, X) {
    if (G.length === 0)
      return "";
    var ht = `
` + X.prev + X.base;
    return ht + A.call(G, "," + ht) + `
` + X.prev;
  }
  function It(G, X) {
    var ht = I(G), ft = [];
    if (ht) {
      ft.length = G.length;
      for (var ct = 0; ct < G.length; ct++)
        ft[ct] = et(G, ct) ? X(G[ct], G) : "";
    }
    var ot = typeof H == "function" ? H(G) : [], xt;
    if (at) {
      xt = {};
      for (var wt = 0; wt < ot.length; wt++)
        xt["$" + ot[wt]] = ot[wt];
    }
    for (var mt in G)
      et(G, mt) && (ht && String(Number(mt)) === mt && mt < G.length || at && xt["$" + mt] instanceof Symbol || (M.call(/[^\w$]/, mt) ? ft.push(X(mt, G) + ": " + X(G[mt], G)) : ft.push(mt + ": " + X(G[mt], G))));
    if (typeof H == "function")
      for (var Et = 0; Et < ot.length; Et++)
        w.call(G, ot[Et]) && ft.push("[" + X(ot[Et]) + "]: " + X(G[ot[Et]], G));
    return ft;
  }
  return objectInspect;
}
var sideChannel, hasRequiredSideChannel;
function requireSideChannel() {
  if (hasRequiredSideChannel) return sideChannel;
  hasRequiredSideChannel = 1;
  var n = /* @__PURE__ */ requireGetIntrinsic(), t = requireCallBound(), e = /* @__PURE__ */ requireObjectInspect(), r = /* @__PURE__ */ requireType(), a = n("%WeakMap%", !0), s = n("%Map%", !0), o = t("WeakMap.prototype.get", !0), u = t("WeakMap.prototype.set", !0), h = t("WeakMap.prototype.has", !0), l = t("Map.prototype.get", !0), c = t("Map.prototype.set", !0), v = t("Map.prototype.has", !0), d = function(_, b) {
    for (var S = _, P; (P = S.next) !== null; S = P)
      if (P.key === b)
        return S.next = P.next, P.next = /** @type {NonNullable<typeof list.next>} */
        _.next, _.next = P, P;
  }, m = function(_, b) {
    var S = d(_, b);
    return S && S.value;
  }, g = function(_, b, S) {
    var P = d(_, b);
    P ? P.value = S : _.next = /** @type {import('.').ListNode<typeof value>} */
    {
      // eslint-disable-line no-param-reassign, no-extra-parens
      key: b,
      next: _.next,
      value: S
    };
  }, y = function(_, b) {
    return !!d(_, b);
  };
  return sideChannel = function() {
    var b, S, P, N = {
      assert: function(E) {
        if (!N.has(E))
          throw new r("Side channel does not contain " + e(E));
      },
      get: function(E) {
        if (a && E && (typeof E == "object" || typeof E == "function")) {
          if (b)
            return o(b, E);
        } else if (s) {
          if (S)
            return l(S, E);
        } else if (P)
          return m(P, E);
      },
      has: function(E) {
        if (a && E && (typeof E == "object" || typeof E == "function")) {
          if (b)
            return h(b, E);
        } else if (s) {
          if (S)
            return v(S, E);
        } else if (P)
          return y(P, E);
        return !1;
      },
      set: function(E, M) {
        a && E && (typeof E == "object" || typeof E == "function") ? (b || (b = new a()), u(b, E, M)) : s ? (S || (S = new s()), c(S, E, M)) : (P || (P = { key: {}, next: null }), g(P, E, M));
      }
    };
    return N;
  }, sideChannel;
}
var formats$1, hasRequiredFormats;
function requireFormats() {
  if (hasRequiredFormats) return formats$1;
  hasRequiredFormats = 1;
  var n = String.prototype.replace, t = /%20/g, e = {
    RFC1738: "RFC1738",
    RFC3986: "RFC3986"
  };
  return formats$1 = {
    default: e.RFC3986,
    formatters: {
      RFC1738: function(r) {
        return n.call(r, t, "+");
      },
      RFC3986: function(r) {
        return String(r);
      }
    },
    RFC1738: e.RFC1738,
    RFC3986: e.RFC3986
  }, formats$1;
}
var utils, hasRequiredUtils;
function requireUtils() {
  if (hasRequiredUtils) return utils;
  hasRequiredUtils = 1;
  var n = /* @__PURE__ */ requireFormats(), t = Object.prototype.hasOwnProperty, e = Array.isArray, r = function() {
    for (var _ = [], b = 0; b < 256; ++b)
      _.push("%" + ((b < 16 ? "0" : "") + b.toString(16)).toUpperCase());
    return _;
  }(), a = function(b) {
    for (; b.length > 1; ) {
      var S = b.pop(), P = S.obj[S.prop];
      if (e(P)) {
        for (var N = [], E = 0; E < P.length; ++E)
          typeof P[E] < "u" && N.push(P[E]);
        S.obj[S.prop] = N;
      }
    }
  }, s = function(b, S) {
    for (var P = S && S.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, N = 0; N < b.length; ++N)
      typeof b[N] < "u" && (P[N] = b[N]);
    return P;
  }, o = function _(b, S, P) {
    if (!S)
      return b;
    if (typeof S != "object") {
      if (e(b))
        b.push(S);
      else if (b && typeof b == "object")
        (P && (P.plainObjects || P.allowPrototypes) || !t.call(Object.prototype, S)) && (b[S] = !0);
      else
        return [b, S];
      return b;
    }
    if (!b || typeof b != "object")
      return [b].concat(S);
    var N = b;
    return e(b) && !e(S) && (N = s(b, P)), e(b) && e(S) ? (S.forEach(function(E, M) {
      if (t.call(b, M)) {
        var T = b[M];
        T && typeof T == "object" && E && typeof E == "object" ? b[M] = _(T, E, P) : b.push(E);
      } else
        b[M] = E;
    }), b) : Object.keys(S).reduce(function(E, M) {
      var T = S[M];
      return t.call(E, M) ? E[M] = _(E[M], T, P) : E[M] = T, E;
    }, N);
  }, u = function(b, S) {
    return Object.keys(S).reduce(function(P, N) {
      return P[N] = S[N], P;
    }, b);
  }, h = function(_, b, S) {
    var P = _.replace(/\+/g, " ");
    if (S === "iso-8859-1")
      return P.replace(/%[0-9a-f]{2}/gi, unescape);
    try {
      return decodeURIComponent(P);
    } catch {
      return P;
    }
  }, l = 1024, c = function(b, S, P, N, E) {
    if (b.length === 0)
      return b;
    var M = b;
    if (typeof b == "symbol" ? M = Symbol.prototype.toString.call(b) : typeof b != "string" && (M = String(b)), P === "iso-8859-1")
      return escape(M).replace(/%u[0-9a-f]{4}/gi, function(rt) {
        return "%26%23" + parseInt(rt.slice(2), 16) + "%3B";
      });
    for (var T = "", A = 0; A < M.length; A += l) {
      for (var L = M.length >= l ? M.slice(A, A + l) : M, B = [], Y = 0; Y < L.length; ++Y) {
        var H = L.charCodeAt(Y);
        if (H === 45 || H === 46 || H === 95 || H === 126 || H >= 48 && H <= 57 || H >= 65 && H <= 90 || H >= 97 && H <= 122 || E === n.RFC1738 && (H === 40 || H === 41)) {
          B[B.length] = L.charAt(Y);
          continue;
        }
        if (H < 128) {
          B[B.length] = r[H];
          continue;
        }
        if (H < 2048) {
          B[B.length] = r[192 | H >> 6] + r[128 | H & 63];
          continue;
        }
        if (H < 55296 || H >= 57344) {
          B[B.length] = r[224 | H >> 12] + r[128 | H >> 6 & 63] + r[128 | H & 63];
          continue;
        }
        Y += 1, H = 65536 + ((H & 1023) << 10 | L.charCodeAt(Y) & 1023), B[B.length] = r[240 | H >> 18] + r[128 | H >> 12 & 63] + r[128 | H >> 6 & 63] + r[128 | H & 63];
      }
      T += B.join("");
    }
    return T;
  }, v = function(b) {
    for (var S = [{ obj: { o: b }, prop: "o" }], P = [], N = 0; N < S.length; ++N)
      for (var E = S[N], M = E.obj[E.prop], T = Object.keys(M), A = 0; A < T.length; ++A) {
        var L = T[A], B = M[L];
        typeof B == "object" && B !== null && P.indexOf(B) === -1 && (S.push({ obj: M, prop: L }), P.push(B));
      }
    return a(S), b;
  }, d = function(b) {
    return Object.prototype.toString.call(b) === "[object RegExp]";
  }, m = function(b) {
    return !b || typeof b != "object" ? !1 : !!(b.constructor && b.constructor.isBuffer && b.constructor.isBuffer(b));
  }, g = function(b, S) {
    return [].concat(b, S);
  }, y = function(b, S) {
    if (e(b)) {
      for (var P = [], N = 0; N < b.length; N += 1)
        P.push(S(b[N]));
      return P;
    }
    return S(b);
  };
  return utils = {
    arrayToObject: s,
    assign: u,
    combine: g,
    compact: v,
    decode: h,
    encode: c,
    isBuffer: m,
    isRegExp: d,
    maybeMap: y,
    merge: o
  }, utils;
}
var stringify_1, hasRequiredStringify;
function requireStringify() {
  if (hasRequiredStringify) return stringify_1;
  hasRequiredStringify = 1;
  var n = requireSideChannel(), t = /* @__PURE__ */ requireUtils(), e = /* @__PURE__ */ requireFormats(), r = Object.prototype.hasOwnProperty, a = {
    brackets: function(_) {
      return _ + "[]";
    },
    comma: "comma",
    indices: function(_, b) {
      return _ + "[" + b + "]";
    },
    repeat: function(_) {
      return _;
    }
  }, s = Array.isArray, o = Array.prototype.push, u = function(y, _) {
    o.apply(y, s(_) ? _ : [_]);
  }, h = Date.prototype.toISOString, l = e.default, c = {
    addQueryPrefix: !1,
    allowDots: !1,
    allowEmptyArrays: !1,
    arrayFormat: "indices",
    charset: "utf-8",
    charsetSentinel: !1,
    delimiter: "&",
    encode: !0,
    encodeDotInKeys: !1,
    encoder: t.encode,
    encodeValuesOnly: !1,
    format: l,
    formatter: e.formatters[l],
    // deprecated
    indices: !1,
    serializeDate: function(_) {
      return h.call(_);
    },
    skipNulls: !1,
    strictNullHandling: !1
  }, v = function(_) {
    return typeof _ == "string" || typeof _ == "number" || typeof _ == "boolean" || typeof _ == "symbol" || typeof _ == "bigint";
  }, d = {}, m = function y(_, b, S, P, N, E, M, T, A, L, B, Y, H, rt, at, Z, w, O) {
    for (var R = _, F = O, D = 0, C = !1; (F = F.get(d)) !== void 0 && !C; ) {
      var U = F.get(_);
      if (D += 1, typeof U < "u") {
        if (U === D)
          throw new RangeError("Cyclic object value");
        C = !0;
      }
      typeof F.get(d) > "u" && (D = 0);
    }
    if (typeof L == "function" ? R = L(b, R) : R instanceof Date ? R = H(R) : S === "comma" && s(R) && (R = t.maybeMap(R, function(J) {
      return J instanceof Date ? H(J) : J;
    })), R === null) {
      if (E)
        return A && !Z ? A(b, c.encoder, w, "key", rt) : b;
      R = "";
    }
    if (v(R) || t.isBuffer(R)) {
      if (A) {
        var k = Z ? b : A(b, c.encoder, w, "key", rt);
        return [at(k) + "=" + at(A(R, c.encoder, w, "value", rt))];
      }
      return [at(b) + "=" + at(String(R))];
    }
    var $ = [];
    if (typeof R > "u")
      return $;
    var K;
    if (S === "comma" && s(R))
      Z && A && (R = t.maybeMap(R, A)), K = [{ value: R.length > 0 ? R.join(",") || null : void 0 }];
    else if (s(L))
      K = L;
    else {
      var I = Object.keys(R);
      K = B ? I.sort(B) : I;
    }
    var tt = T ? b.replace(/\./g, "%2E") : b, q = P && s(R) && R.length === 1 ? tt + "[]" : tt;
    if (N && s(R) && R.length === 0)
      return q + "[]";
    for (var nt = 0; nt < K.length; ++nt) {
      var Q = K[nt], V = typeof Q == "object" && typeof Q.value < "u" ? Q.value : R[Q];
      if (!(M && V === null)) {
        var st = Y && T ? Q.replace(/\./g, "%2E") : Q, it = s(R) ? typeof S == "function" ? S(q, st) : q : q + (Y ? "." + st : "[" + st + "]");
        O.set(_, D);
        var z = n();
        z.set(d, O), u($, y(
          V,
          it,
          S,
          P,
          N,
          E,
          M,
          T,
          S === "comma" && Z && s(R) ? null : A,
          L,
          B,
          Y,
          H,
          rt,
          at,
          Z,
          w,
          z
        ));
      }
    }
    return $;
  }, g = function(_) {
    if (!_)
      return c;
    if (typeof _.allowEmptyArrays < "u" && typeof _.allowEmptyArrays != "boolean")
      throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
    if (typeof _.encodeDotInKeys < "u" && typeof _.encodeDotInKeys != "boolean")
      throw new TypeError("`encodeDotInKeys` option can only be `true` or `false`, when provided");
    if (_.encoder !== null && typeof _.encoder < "u" && typeof _.encoder != "function")
      throw new TypeError("Encoder has to be a function.");
    var b = _.charset || c.charset;
    if (typeof _.charset < "u" && _.charset !== "utf-8" && _.charset !== "iso-8859-1")
      throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
    var S = e.default;
    if (typeof _.format < "u") {
      if (!r.call(e.formatters, _.format))
        throw new TypeError("Unknown format option provided.");
      S = _.format;
    }
    var P = e.formatters[S], N = c.filter;
    (typeof _.filter == "function" || s(_.filter)) && (N = _.filter);
    var E;
    if (_.arrayFormat in a ? E = _.arrayFormat : "indices" in _ ? E = _.indices ? "indices" : "repeat" : E = c.arrayFormat, "commaRoundTrip" in _ && typeof _.commaRoundTrip != "boolean")
      throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
    var M = typeof _.allowDots > "u" ? _.encodeDotInKeys === !0 ? !0 : c.allowDots : !!_.allowDots;
    return {
      addQueryPrefix: typeof _.addQueryPrefix == "boolean" ? _.addQueryPrefix : c.addQueryPrefix,
      allowDots: M,
      allowEmptyArrays: typeof _.allowEmptyArrays == "boolean" ? !!_.allowEmptyArrays : c.allowEmptyArrays,
      arrayFormat: E,
      charset: b,
      charsetSentinel: typeof _.charsetSentinel == "boolean" ? _.charsetSentinel : c.charsetSentinel,
      commaRoundTrip: _.commaRoundTrip,
      delimiter: typeof _.delimiter > "u" ? c.delimiter : _.delimiter,
      encode: typeof _.encode == "boolean" ? _.encode : c.encode,
      encodeDotInKeys: typeof _.encodeDotInKeys == "boolean" ? _.encodeDotInKeys : c.encodeDotInKeys,
      encoder: typeof _.encoder == "function" ? _.encoder : c.encoder,
      encodeValuesOnly: typeof _.encodeValuesOnly == "boolean" ? _.encodeValuesOnly : c.encodeValuesOnly,
      filter: N,
      format: S,
      formatter: P,
      serializeDate: typeof _.serializeDate == "function" ? _.serializeDate : c.serializeDate,
      skipNulls: typeof _.skipNulls == "boolean" ? _.skipNulls : c.skipNulls,
      sort: typeof _.sort == "function" ? _.sort : null,
      strictNullHandling: typeof _.strictNullHandling == "boolean" ? _.strictNullHandling : c.strictNullHandling
    };
  };
  return stringify_1 = function(y, _) {
    var b = y, S = g(_), P, N;
    typeof S.filter == "function" ? (N = S.filter, b = N("", b)) : s(S.filter) && (N = S.filter, P = N);
    var E = [];
    if (typeof b != "object" || b === null)
      return "";
    var M = a[S.arrayFormat], T = M === "comma" && S.commaRoundTrip;
    P || (P = Object.keys(b)), S.sort && P.sort(S.sort);
    for (var A = n(), L = 0; L < P.length; ++L) {
      var B = P[L];
      S.skipNulls && b[B] === null || u(E, m(
        b[B],
        B,
        M,
        T,
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
        A
      ));
    }
    var Y = E.join(S.delimiter), H = S.addQueryPrefix === !0 ? "?" : "";
    return S.charsetSentinel && (S.charset === "iso-8859-1" ? H += "utf8=%26%2310003%3B&" : H += "utf8=%E2%9C%93&"), Y.length > 0 ? H + Y : "";
  }, stringify_1;
}
var parse$1, hasRequiredParse;
function requireParse() {
  if (hasRequiredParse) return parse$1;
  hasRequiredParse = 1;
  var n = /* @__PURE__ */ requireUtils(), t = Object.prototype.hasOwnProperty, e = Array.isArray, r = {
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
    return d.replace(/&#(\d+);/g, function(m, g) {
      return String.fromCharCode(parseInt(g, 10));
    });
  }, s = function(d, m) {
    return d && typeof d == "string" && m.comma && d.indexOf(",") > -1 ? d.split(",") : d;
  }, o = "utf8=%26%2310003%3B", u = "utf8=%E2%9C%93", h = function(m, g) {
    var y = { __proto__: null }, _ = g.ignoreQueryPrefix ? m.replace(/^\?/, "") : m;
    _ = _.replace(/%5B/gi, "[").replace(/%5D/gi, "]");
    var b = g.parameterLimit === 1 / 0 ? void 0 : g.parameterLimit, S = _.split(g.delimiter, b), P = -1, N, E = g.charset;
    if (g.charsetSentinel)
      for (N = 0; N < S.length; ++N)
        S[N].indexOf("utf8=") === 0 && (S[N] === u ? E = "utf-8" : S[N] === o && (E = "iso-8859-1"), P = N, N = S.length);
    for (N = 0; N < S.length; ++N)
      if (N !== P) {
        var M = S[N], T = M.indexOf("]="), A = T === -1 ? M.indexOf("=") : T + 1, L, B;
        A === -1 ? (L = g.decoder(M, r.decoder, E, "key"), B = g.strictNullHandling ? null : "") : (L = g.decoder(M.slice(0, A), r.decoder, E, "key"), B = n.maybeMap(
          s(M.slice(A + 1), g),
          function(H) {
            return g.decoder(H, r.decoder, E, "value");
          }
        )), B && g.interpretNumericEntities && E === "iso-8859-1" && (B = a(B)), M.indexOf("[]=") > -1 && (B = e(B) ? [B] : B);
        var Y = t.call(y, L);
        Y && g.duplicates === "combine" ? y[L] = n.combine(y[L], B) : (!Y || g.duplicates === "last") && (y[L] = B);
      }
    return y;
  }, l = function(d, m, g, y) {
    for (var _ = y ? m : s(m, g), b = d.length - 1; b >= 0; --b) {
      var S, P = d[b];
      if (P === "[]" && g.parseArrays)
        S = g.allowEmptyArrays && (_ === "" || g.strictNullHandling && _ === null) ? [] : [].concat(_);
      else {
        S = g.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
        var N = P.charAt(0) === "[" && P.charAt(P.length - 1) === "]" ? P.slice(1, -1) : P, E = g.decodeDotInKeys ? N.replace(/%2E/g, ".") : N, M = parseInt(E, 10);
        !g.parseArrays && E === "" ? S = { 0: _ } : !isNaN(M) && P !== E && String(M) === E && M >= 0 && g.parseArrays && M <= g.arrayLimit ? (S = [], S[M] = _) : E !== "__proto__" && (S[E] = _);
      }
      _ = S;
    }
    return _;
  }, c = function(m, g, y, _) {
    if (m) {
      var b = y.allowDots ? m.replace(/\.([^.[]+)/g, "[$1]") : m, S = /(\[[^[\]]*])/, P = /(\[[^[\]]*])/g, N = y.depth > 0 && S.exec(b), E = N ? b.slice(0, N.index) : b, M = [];
      if (E) {
        if (!y.plainObjects && t.call(Object.prototype, E) && !y.allowPrototypes)
          return;
        M.push(E);
      }
      for (var T = 0; y.depth > 0 && (N = P.exec(b)) !== null && T < y.depth; ) {
        if (T += 1, !y.plainObjects && t.call(Object.prototype, N[1].slice(1, -1)) && !y.allowPrototypes)
          return;
        M.push(N[1]);
      }
      if (N) {
        if (y.strictDepth === !0)
          throw new RangeError("Input depth exceeded depth option of " + y.depth + " and strictDepth is true");
        M.push("[" + b.slice(N.index) + "]");
      }
      return l(M, g, y, _);
    }
  }, v = function(m) {
    if (!m)
      return r;
    if (typeof m.allowEmptyArrays < "u" && typeof m.allowEmptyArrays != "boolean")
      throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
    if (typeof m.decodeDotInKeys < "u" && typeof m.decodeDotInKeys != "boolean")
      throw new TypeError("`decodeDotInKeys` option can only be `true` or `false`, when provided");
    if (m.decoder !== null && typeof m.decoder < "u" && typeof m.decoder != "function")
      throw new TypeError("Decoder has to be a function.");
    if (typeof m.charset < "u" && m.charset !== "utf-8" && m.charset !== "iso-8859-1")
      throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
    var g = typeof m.charset > "u" ? r.charset : m.charset, y = typeof m.duplicates > "u" ? r.duplicates : m.duplicates;
    if (y !== "combine" && y !== "first" && y !== "last")
      throw new TypeError("The duplicates option must be either combine, first, or last");
    var _ = typeof m.allowDots > "u" ? m.decodeDotInKeys === !0 ? !0 : r.allowDots : !!m.allowDots;
    return {
      allowDots: _,
      allowEmptyArrays: typeof m.allowEmptyArrays == "boolean" ? !!m.allowEmptyArrays : r.allowEmptyArrays,
      allowPrototypes: typeof m.allowPrototypes == "boolean" ? m.allowPrototypes : r.allowPrototypes,
      allowSparse: typeof m.allowSparse == "boolean" ? m.allowSparse : r.allowSparse,
      arrayLimit: typeof m.arrayLimit == "number" ? m.arrayLimit : r.arrayLimit,
      charset: g,
      charsetSentinel: typeof m.charsetSentinel == "boolean" ? m.charsetSentinel : r.charsetSentinel,
      comma: typeof m.comma == "boolean" ? m.comma : r.comma,
      decodeDotInKeys: typeof m.decodeDotInKeys == "boolean" ? m.decodeDotInKeys : r.decodeDotInKeys,
      decoder: typeof m.decoder == "function" ? m.decoder : r.decoder,
      delimiter: typeof m.delimiter == "string" || n.isRegExp(m.delimiter) ? m.delimiter : r.delimiter,
      // eslint-disable-next-line no-implicit-coercion, no-extra-parens
      depth: typeof m.depth == "number" || m.depth === !1 ? +m.depth : r.depth,
      duplicates: y,
      ignoreQueryPrefix: m.ignoreQueryPrefix === !0,
      interpretNumericEntities: typeof m.interpretNumericEntities == "boolean" ? m.interpretNumericEntities : r.interpretNumericEntities,
      parameterLimit: typeof m.parameterLimit == "number" ? m.parameterLimit : r.parameterLimit,
      parseArrays: m.parseArrays !== !1,
      plainObjects: typeof m.plainObjects == "boolean" ? m.plainObjects : r.plainObjects,
      strictDepth: typeof m.strictDepth == "boolean" ? !!m.strictDepth : r.strictDepth,
      strictNullHandling: typeof m.strictNullHandling == "boolean" ? m.strictNullHandling : r.strictNullHandling
    };
  };
  return parse$1 = function(d, m) {
    var g = v(m);
    if (d === "" || d === null || typeof d > "u")
      return g.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
    for (var y = typeof d == "string" ? h(d, g) : d, _ = g.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, b = Object.keys(y), S = 0; S < b.length; ++S) {
      var P = b[S], N = c(P, y[P], g, typeof d == "string");
      _ = n.merge(_, N, g);
    }
    return g.allowSparse === !0 ? _ : n.compact(_);
  }, parse$1;
}
var lib, hasRequiredLib;
function requireLib() {
  if (hasRequiredLib) return lib;
  hasRequiredLib = 1;
  var n = /* @__PURE__ */ requireStringify(), t = /* @__PURE__ */ requireParse(), e = /* @__PURE__ */ requireFormats();
  return lib = {
    formats: e,
    parse: t,
    stringify: n
  }, lib;
}
var hasRequiredUrl;
function requireUrl() {
  if (hasRequiredUrl) return url$2;
  hasRequiredUrl = 1;
  var n = requirePunycode();
  function t() {
    this.protocol = null, this.slashes = null, this.auth = null, this.host = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.query = null, this.pathname = null, this.path = null, this.href = null;
  }
  var e = /^([a-z0-9.+-]+:)/i, r = /:[0-9]*$/, a = /^(\/\/?(?!\/)[^?\s]*)(\?[^\s]*)?$/, s = [
    "<",
    ">",
    '"',
    "`",
    " ",
    "\r",
    `
`,
    "	"
  ], o = [
    "{",
    "}",
    "|",
    "\\",
    "^",
    "`"
  ].concat(s), u = ["'"].concat(o), h = [
    "%",
    "/",
    "?",
    ";",
    "#"
  ].concat(u), l = [
    "/",
    "?",
    "#"
  ], c = 255, v = /^[+a-z0-9A-Z_-]{0,63}$/, d = /^([+a-z0-9A-Z_-]{0,63})(.*)$/, m = {
    javascript: !0,
    "javascript:": !0
  }, g = {
    javascript: !0,
    "javascript:": !0
  }, y = {
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
  }, _ = /* @__PURE__ */ requireLib();
  function b(E, M, T) {
    if (E && typeof E == "object" && E instanceof t)
      return E;
    var A = new t();
    return A.parse(E, M, T), A;
  }
  t.prototype.parse = function(E, M, T) {
    if (typeof E != "string")
      throw new TypeError("Parameter 'url' must be a string, not " + typeof E);
    var A = E.indexOf("?"), L = A !== -1 && A < E.indexOf("#") ? "?" : "#", B = E.split(L), Y = /\\/g;
    B[0] = B[0].replace(Y, "/"), E = B.join(L);
    var H = E;
    if (H = H.trim(), !T && E.split("#").length === 1) {
      var rt = a.exec(H);
      if (rt)
        return this.path = H, this.href = H, this.pathname = rt[1], rt[2] ? (this.search = rt[2], M ? this.query = _.parse(this.search.substr(1)) : this.query = this.search.substr(1)) : M && (this.search = "", this.query = {}), this;
    }
    var at = e.exec(H);
    if (at) {
      at = at[0];
      var Z = at.toLowerCase();
      this.protocol = Z, H = H.substr(at.length);
    }
    if (T || at || H.match(/^\/\/[^@/]+@[^@/]+/)) {
      var w = H.substr(0, 2) === "//";
      w && !(at && g[at]) && (H = H.substr(2), this.slashes = !0);
    }
    if (!g[at] && (w || at && !y[at])) {
      for (var O = -1, R = 0; R < l.length; R++) {
        var F = H.indexOf(l[R]);
        F !== -1 && (O === -1 || F < O) && (O = F);
      }
      var D, C;
      O === -1 ? C = H.lastIndexOf("@") : C = H.lastIndexOf("@", O), C !== -1 && (D = H.slice(0, C), H = H.slice(C + 1), this.auth = decodeURIComponent(D)), O = -1;
      for (var R = 0; R < h.length; R++) {
        var F = H.indexOf(h[R]);
        F !== -1 && (O === -1 || F < O) && (O = F);
      }
      O === -1 && (O = H.length), this.host = H.slice(0, O), H = H.slice(O), this.parseHost(), this.hostname = this.hostname || "";
      var U = this.hostname[0] === "[" && this.hostname[this.hostname.length - 1] === "]";
      if (!U)
        for (var k = this.hostname.split(/\./), R = 0, $ = k.length; R < $; R++) {
          var K = k[R];
          if (K && !K.match(v)) {
            for (var I = "", tt = 0, q = K.length; tt < q; tt++)
              K.charCodeAt(tt) > 127 ? I += "x" : I += K[tt];
            if (!I.match(v)) {
              var nt = k.slice(0, R), Q = k.slice(R + 1), V = K.match(d);
              V && (nt.push(V[1]), Q.unshift(V[2])), Q.length && (H = "/" + Q.join(".") + H), this.hostname = nt.join(".");
              break;
            }
          }
        }
      this.hostname.length > c ? this.hostname = "" : this.hostname = this.hostname.toLowerCase(), U || (this.hostname = n.toASCII(this.hostname));
      var st = this.port ? ":" + this.port : "", it = this.hostname || "";
      this.host = it + st, this.href += this.host, U && (this.hostname = this.hostname.substr(1, this.hostname.length - 2), H[0] !== "/" && (H = "/" + H));
    }
    if (!m[Z])
      for (var R = 0, $ = u.length; R < $; R++) {
        var z = u[R];
        if (H.indexOf(z) !== -1) {
          var J = encodeURIComponent(z);
          J === z && (J = escape(z)), H = H.split(z).join(J);
        }
      }
    var et = H.indexOf("#");
    et !== -1 && (this.hash = H.substr(et), H = H.slice(0, et));
    var W = H.indexOf("?");
    if (W !== -1 ? (this.search = H.substr(W), this.query = H.substr(W + 1), M && (this.query = _.parse(this.query)), H = H.slice(0, W)) : M && (this.search = "", this.query = {}), H && (this.pathname = H), y[Z] && this.hostname && !this.pathname && (this.pathname = "/"), this.pathname || this.search) {
      var st = this.pathname || "", vt = this.search || "";
      this.path = st + vt;
    }
    return this.href = this.format(), this;
  };
  function S(E) {
    return typeof E == "string" && (E = b(E)), E instanceof t ? E.format() : t.prototype.format.call(E);
  }
  t.prototype.format = function() {
    var E = this.auth || "";
    E && (E = encodeURIComponent(E), E = E.replace(/%3A/i, ":"), E += "@");
    var M = this.protocol || "", T = this.pathname || "", A = this.hash || "", L = !1, B = "";
    this.host ? L = E + this.host : this.hostname && (L = E + (this.hostname.indexOf(":") === -1 ? this.hostname : "[" + this.hostname + "]"), this.port && (L += ":" + this.port)), this.query && typeof this.query == "object" && Object.keys(this.query).length && (B = _.stringify(this.query, {
      arrayFormat: "repeat",
      addQueryPrefix: !1
    }));
    var Y = this.search || B && "?" + B || "";
    return M && M.substr(-1) !== ":" && (M += ":"), this.slashes || (!M || y[M]) && L !== !1 ? (L = "//" + (L || ""), T && T.charAt(0) !== "/" && (T = "/" + T)) : L || (L = ""), A && A.charAt(0) !== "#" && (A = "#" + A), Y && Y.charAt(0) !== "?" && (Y = "?" + Y), T = T.replace(/[?#]/g, function(H) {
      return encodeURIComponent(H);
    }), Y = Y.replace("#", "%23"), M + L + T + Y + A;
  };
  function P(E, M) {
    return b(E, !1, !0).resolve(M);
  }
  t.prototype.resolve = function(E) {
    return this.resolveObject(b(E, !1, !0)).format();
  };
  function N(E, M) {
    return E ? b(E, !1, !0).resolveObject(M) : M;
  }
  return t.prototype.resolveObject = function(E) {
    if (typeof E == "string") {
      var M = new t();
      M.parse(E, !1, !0), E = M;
    }
    for (var T = new t(), A = Object.keys(this), L = 0; L < A.length; L++) {
      var B = A[L];
      T[B] = this[B];
    }
    if (T.hash = E.hash, E.href === "")
      return T.href = T.format(), T;
    if (E.slashes && !E.protocol) {
      for (var Y = Object.keys(E), H = 0; H < Y.length; H++) {
        var rt = Y[H];
        rt !== "protocol" && (T[rt] = E[rt]);
      }
      return y[T.protocol] && T.hostname && !T.pathname && (T.pathname = "/", T.path = T.pathname), T.href = T.format(), T;
    }
    if (E.protocol && E.protocol !== T.protocol) {
      if (!y[E.protocol]) {
        for (var at = Object.keys(E), Z = 0; Z < at.length; Z++) {
          var w = at[Z];
          T[w] = E[w];
        }
        return T.href = T.format(), T;
      }
      if (T.protocol = E.protocol, !E.host && !g[E.protocol]) {
        for (var $ = (E.pathname || "").split("/"); $.length && !(E.host = $.shift()); )
          ;
        E.host || (E.host = ""), E.hostname || (E.hostname = ""), $[0] !== "" && $.unshift(""), $.length < 2 && $.unshift(""), T.pathname = $.join("/");
      } else
        T.pathname = E.pathname;
      if (T.search = E.search, T.query = E.query, T.host = E.host || "", T.auth = E.auth, T.hostname = E.hostname || E.host, T.port = E.port, T.pathname || T.search) {
        var O = T.pathname || "", R = T.search || "";
        T.path = O + R;
      }
      return T.slashes = T.slashes || E.slashes, T.href = T.format(), T;
    }
    var F = T.pathname && T.pathname.charAt(0) === "/", D = E.host || E.pathname && E.pathname.charAt(0) === "/", C = D || F || T.host && E.pathname, U = C, k = T.pathname && T.pathname.split("/") || [], $ = E.pathname && E.pathname.split("/") || [], K = T.protocol && !y[T.protocol];
    if (K && (T.hostname = "", T.port = null, T.host && (k[0] === "" ? k[0] = T.host : k.unshift(T.host)), T.host = "", E.protocol && (E.hostname = null, E.port = null, E.host && ($[0] === "" ? $[0] = E.host : $.unshift(E.host)), E.host = null), C = C && ($[0] === "" || k[0] === "")), D)
      T.host = E.host || E.host === "" ? E.host : T.host, T.hostname = E.hostname || E.hostname === "" ? E.hostname : T.hostname, T.search = E.search, T.query = E.query, k = $;
    else if ($.length)
      k || (k = []), k.pop(), k = k.concat($), T.search = E.search, T.query = E.query;
    else if (E.search != null) {
      if (K) {
        T.host = k.shift(), T.hostname = T.host;
        var I = T.host && T.host.indexOf("@") > 0 ? T.host.split("@") : !1;
        I && (T.auth = I.shift(), T.hostname = I.shift(), T.host = T.hostname);
      }
      return T.search = E.search, T.query = E.query, (T.pathname !== null || T.search !== null) && (T.path = (T.pathname ? T.pathname : "") + (T.search ? T.search : "")), T.href = T.format(), T;
    }
    if (!k.length)
      return T.pathname = null, T.search ? T.path = "/" + T.search : T.path = null, T.href = T.format(), T;
    for (var tt = k.slice(-1)[0], q = (T.host || E.host || k.length > 1) && (tt === "." || tt === "..") || tt === "", nt = 0, Q = k.length; Q >= 0; Q--)
      tt = k[Q], tt === "." ? k.splice(Q, 1) : tt === ".." ? (k.splice(Q, 1), nt++) : nt && (k.splice(Q, 1), nt--);
    if (!C && !U)
      for (; nt--; nt)
        k.unshift("..");
    C && k[0] !== "" && (!k[0] || k[0].charAt(0) !== "/") && k.unshift(""), q && k.join("/").substr(-1) !== "/" && k.push("");
    var V = k[0] === "" || k[0] && k[0].charAt(0) === "/";
    if (K) {
      T.hostname = V ? "" : k.length ? k.shift() : "", T.host = T.hostname;
      var I = T.host && T.host.indexOf("@") > 0 ? T.host.split("@") : !1;
      I && (T.auth = I.shift(), T.hostname = I.shift(), T.host = T.hostname);
    }
    return C = C || T.host && k.length, C && !V && k.unshift(""), k.length > 0 ? T.pathname = k.join("/") : (T.pathname = null, T.path = null), (T.pathname !== null || T.search !== null) && (T.path = (T.pathname ? T.pathname : "") + (T.search ? T.search : "")), T.auth = E.auth || T.auth, T.slashes = T.slashes || E.slashes, T.href = T.format(), T;
  }, t.prototype.parseHost = function() {
    var E = this.host, M = r.exec(E);
    M && (M = M[0], M !== ":" && (this.port = M.substr(1)), E = E.substr(0, E.length - M.length)), E && (this.hostname = E);
  }, url$2.parse = b, url$2.resolve = P, url$2.resolveObject = N, url$2.format = S, url$2.Url = t, url$2;
}
var urlExports = requireUrl();
/*!
 * @pixi/utils - v6.5.10
 * Compiled Thu, 06 Jul 2023 15:25:11 UTC
 *
 * @pixi/utils is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
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
  var t;
  if (!saidHello) {
    if (settings.ADAPTER.getNavigator().userAgent.toLowerCase().indexOf("chrome") > -1) {
      var e = [
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
      (t = globalThis.console).log.apply(t, e);
    } else globalThis.console && globalThis.console.log("PixiJS " + VERSION + " - " + n + " - http://www.pixijs.com/");
    saidHello = !0;
  }
}
var supported;
function isWebGLSupported() {
  return typeof supported > "u" && (supported = function() {
    var t = {
      stencil: !0,
      failIfMajorPerformanceCaveat: settings.FAIL_IF_MAJOR_PERFORMANCE_CAVEAT
    };
    try {
      if (!settings.ADAPTER.getWebGLRenderingContext())
        return !1;
      var e = settings.ADAPTER.createCanvas(), r = e.getContext("webgl", t) || e.getContext("experimental-webgl", t), a = !!(r && r.getContextAttributes().stencil);
      if (r) {
        var s = r.getExtension("WEBGL_lose_context");
        s && s.loseContext();
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
function hex2rgb(n, t) {
  return t === void 0 && (t = []), t[0] = (n >> 16 & 255) / 255, t[1] = (n >> 8 & 255) / 255, t[2] = (n & 255) / 255, t;
}
function hex2string(n) {
  var t = n.toString(16);
  return t = "000000".substring(0, 6 - t.length) + t, "#" + t;
}
function string2hex(n) {
  return typeof n == "string" && (n = cssColorNames[n.toLowerCase()] || n, n[0] === "#" && (n = n.slice(1))), parseInt(n, 16);
}
function mapPremultipliedBlendModes() {
  for (var n = [], t = [], e = 0; e < 32; e++)
    n[e] = e, t[e] = e;
  n[BLEND_MODES.NORMAL_NPM] = BLEND_MODES.NORMAL, n[BLEND_MODES.ADD_NPM] = BLEND_MODES.ADD, n[BLEND_MODES.SCREEN_NPM] = BLEND_MODES.SCREEN, t[BLEND_MODES.NORMAL] = BLEND_MODES.NORMAL_NPM, t[BLEND_MODES.ADD] = BLEND_MODES.ADD_NPM, t[BLEND_MODES.SCREEN] = BLEND_MODES.SCREEN_NPM;
  var r = [];
  return r.push(t), r.push(n), r;
}
var premultiplyBlendMode = mapPremultipliedBlendModes();
function correctBlendMode(n, t) {
  return premultiplyBlendMode[t ? 1 : 0][n];
}
function premultiplyRgba(n, t, e, r) {
  return e = e || new Float32Array(4), r || r === void 0 ? (e[0] = n[0] * t, e[1] = n[1] * t, e[2] = n[2] * t) : (e[0] = n[0], e[1] = n[1], e[2] = n[2]), e[3] = t, e;
}
function premultiplyTint(n, t) {
  if (t === 1)
    return (t * 255 << 24) + n;
  if (t === 0)
    return 0;
  var e = n >> 16 & 255, r = n >> 8 & 255, a = n & 255;
  return e = e * t + 0.5 | 0, r = r * t + 0.5 | 0, a = a * t + 0.5 | 0, (t * 255 << 24) + (e << 16) + (r << 8) + a;
}
function premultiplyTintToRgba(n, t, e, r) {
  return e = e || new Float32Array(4), e[0] = (n >> 16 & 255) / 255, e[1] = (n >> 8 & 255) / 255, e[2] = (n & 255) / 255, (r || r === void 0) && (e[0] *= t, e[1] *= t, e[2] *= t), e[3] = t, e;
}
function createIndicesForQuads(n, t) {
  t === void 0 && (t = null);
  var e = n * 6;
  if (t = t || new Uint16Array(e), t.length !== e)
    throw new Error("Out buffer length is incorrect, got " + t.length + " and expected " + e);
  for (var r = 0, a = 0; r < e; r += 6, a += 4)
    t[r + 0] = a + 0, t[r + 1] = a + 1, t[r + 2] = a + 2, t[r + 3] = a + 0, t[r + 4] = a + 2, t[r + 5] = a + 3;
  return t;
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
  var t = (n > 65535 ? 1 : 0) << 4;
  n >>>= t;
  var e = (n > 255 ? 1 : 0) << 3;
  return n >>>= e, t |= e, e = (n > 15 ? 1 : 0) << 2, n >>>= e, t |= e, e = (n > 3 ? 1 : 0) << 1, n >>>= e, t |= e, t | n >> 1;
}
function removeItems(n, t, e) {
  var r = n.length, a;
  if (!(t >= r || e === 0)) {
    e = t + e > r ? r - t : e;
    var s = r - e;
    for (a = t; a < s; ++a)
      n[a] = n[a + e];
    n.length = s;
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
function deprecation(n, t, e) {
  if (e === void 0 && (e = 3), !warnings[t]) {
    var r = new Error().stack;
    typeof r > "u" ? console.warn("PixiJS Deprecation Warning: ", t + `
Deprecated since v` + n) : (r = r.split(`
`).splice(e).join(`
`), console.groupCollapsed ? (console.groupCollapsed("%cPixiJS Deprecation Warning: %c%s", "color:#614108;background:#fffbe6", "font-weight:normal;color:#614108;background:#fffbe6", t + `
Deprecated since v` + n), console.warn(r), console.groupEnd()) : (console.warn("PixiJS Deprecation Warning: ", t + `
Deprecated since v` + n), console.warn(r))), warnings[t] = !0;
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
    function n(t, e, r) {
      this.canvas = settings.ADAPTER.createCanvas(), this.context = this.canvas.getContext("2d"), this.resolution = r || settings.RESOLUTION, this.resize(t, e);
    }
    return n.prototype.clear = function() {
      this.context.setTransform(1, 0, 0, 1, 0, 0), this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }, n.prototype.resize = function(t, e) {
      this.canvas.width = Math.round(t * this.resolution), this.canvas.height = Math.round(e * this.resolution);
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
      set: function(t) {
        this.canvas.width = Math.round(t);
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
      set: function(t) {
        this.canvas.height = Math.round(t);
      },
      enumerable: !1,
      configurable: !0
    }), n;
  }()
);
function trimCanvas(n) {
  var t = n.width, e = n.height, r = n.getContext("2d", {
    willReadFrequently: !0
  }), a = r.getImageData(0, 0, t, e), s = a.data, o = s.length, u = {
    top: null,
    left: null,
    right: null,
    bottom: null
  }, h = null, l, c, v;
  for (l = 0; l < o; l += 4)
    s[l + 3] !== 0 && (c = l / 4 % t, v = ~~(l / 4 / t), u.top === null && (u.top = v), (u.left === null || c < u.left) && (u.left = c), (u.right === null || u.right < c) && (u.right = c + 1), (u.bottom === null || u.bottom < v) && (u.bottom = v));
  return u.top !== null && (t = u.right - u.left, e = u.bottom - u.top + 1, h = r.getImageData(u.left, u.top, t, e)), {
    height: e,
    width: t,
    data: h
  };
}
var tempAnchor$1;
function determineCrossOrigin(n, t) {
  if (t === void 0 && (t = globalThis.location), n.indexOf("data:") === 0)
    return "";
  t = t || globalThis.location, tempAnchor$1 || (tempAnchor$1 = document.createElement("a")), tempAnchor$1.href = n;
  var e = url$1.parse(tempAnchor$1.href), r = !e.port && t.port === "" || e.port === t.port;
  return e.hostname !== t.hostname || !r || e.protocol !== t.protocol ? "anonymous" : "";
}
function getResolutionOfUrl(n, t) {
  var e = settings.RETINA_PREFIX.exec(n);
  return e ? parseFloat(e[1]) : t !== void 0 ? t : 1;
}
/*!
 * @pixi/math - v6.5.10
 * Compiled Thu, 06 Jul 2023 15:25:11 UTC
 *
 * @pixi/math is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
var PI_2 = Math.PI * 2, RAD_TO_DEG = 180 / Math.PI, DEG_TO_RAD = Math.PI / 180, SHAPES;
(function(n) {
  n[n.POLY = 0] = "POLY", n[n.RECT = 1] = "RECT", n[n.CIRC = 2] = "CIRC", n[n.ELIP = 3] = "ELIP", n[n.RREC = 4] = "RREC";
})(SHAPES || (SHAPES = {}));
var Point = (
  /** @class */
  function() {
    function n(t, e) {
      t === void 0 && (t = 0), e === void 0 && (e = 0), this.x = 0, this.y = 0, this.x = t, this.y = e;
    }
    return n.prototype.clone = function() {
      return new n(this.x, this.y);
    }, n.prototype.copyFrom = function(t) {
      return this.set(t.x, t.y), this;
    }, n.prototype.copyTo = function(t) {
      return t.set(this.x, this.y), t;
    }, n.prototype.equals = function(t) {
      return t.x === this.x && t.y === this.y;
    }, n.prototype.set = function(t, e) {
      return t === void 0 && (t = 0), e === void 0 && (e = t), this.x = t, this.y = e, this;
    }, n.prototype.toString = function() {
      return "[@pixi/math:Point x=" + this.x + " y=" + this.y + "]";
    }, n;
  }()
), tempPoints$1 = [new Point(), new Point(), new Point(), new Point()], Rectangle = (
  /** @class */
  function() {
    function n(t, e, r, a) {
      t === void 0 && (t = 0), e === void 0 && (e = 0), r === void 0 && (r = 0), a === void 0 && (a = 0), this.x = Number(t), this.y = Number(e), this.width = Number(r), this.height = Number(a), this.type = SHAPES.RECT;
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
    }, n.prototype.copyFrom = function(t) {
      return this.x = t.x, this.y = t.y, this.width = t.width, this.height = t.height, this;
    }, n.prototype.copyTo = function(t) {
      return t.x = this.x, t.y = this.y, t.width = this.width, t.height = this.height, t;
    }, n.prototype.contains = function(t, e) {
      return this.width <= 0 || this.height <= 0 ? !1 : t >= this.x && t < this.x + this.width && e >= this.y && e < this.y + this.height;
    }, n.prototype.intersects = function(t, e) {
      if (!e) {
        var r = this.x < t.x ? t.x : this.x, a = this.right > t.right ? t.right : this.right;
        if (a <= r)
          return !1;
        var s = this.y < t.y ? t.y : this.y, o = this.bottom > t.bottom ? t.bottom : this.bottom;
        return o > s;
      }
      var u = this.left, h = this.right, l = this.top, c = this.bottom;
      if (h <= u || c <= l)
        return !1;
      var v = tempPoints$1[0].set(t.left, t.top), d = tempPoints$1[1].set(t.left, t.bottom), m = tempPoints$1[2].set(t.right, t.top), g = tempPoints$1[3].set(t.right, t.bottom);
      if (m.x <= v.x || d.y <= v.y)
        return !1;
      var y = Math.sign(e.a * e.d - e.b * e.c);
      if (y === 0 || (e.apply(v, v), e.apply(d, d), e.apply(m, m), e.apply(g, g), Math.max(v.x, d.x, m.x, g.x) <= u || Math.min(v.x, d.x, m.x, g.x) >= h || Math.max(v.y, d.y, m.y, g.y) <= l || Math.min(v.y, d.y, m.y, g.y) >= c))
        return !1;
      var _ = y * (d.y - v.y), b = y * (v.x - d.x), S = _ * u + b * l, P = _ * h + b * l, N = _ * u + b * c, E = _ * h + b * c;
      if (Math.max(S, P, N, E) <= _ * v.x + b * v.y || Math.min(S, P, N, E) >= _ * g.x + b * g.y)
        return !1;
      var M = y * (v.y - m.y), T = y * (m.x - v.x), A = M * u + T * l, L = M * h + T * l, B = M * u + T * c, Y = M * h + T * c;
      return !(Math.max(A, L, B, Y) <= M * v.x + T * v.y || Math.min(A, L, B, Y) >= M * g.x + T * g.y);
    }, n.prototype.pad = function(t, e) {
      return t === void 0 && (t = 0), e === void 0 && (e = t), this.x -= t, this.y -= e, this.width += t * 2, this.height += e * 2, this;
    }, n.prototype.fit = function(t) {
      var e = Math.max(this.x, t.x), r = Math.min(this.x + this.width, t.x + t.width), a = Math.max(this.y, t.y), s = Math.min(this.y + this.height, t.y + t.height);
      return this.x = e, this.width = Math.max(r - e, 0), this.y = a, this.height = Math.max(s - a, 0), this;
    }, n.prototype.ceil = function(t, e) {
      t === void 0 && (t = 1), e === void 0 && (e = 1e-3);
      var r = Math.ceil((this.x + this.width - e) * t) / t, a = Math.ceil((this.y + this.height - e) * t) / t;
      return this.x = Math.floor((this.x + e) * t) / t, this.y = Math.floor((this.y + e) * t) / t, this.width = r - this.x, this.height = a - this.y, this;
    }, n.prototype.enlarge = function(t) {
      var e = Math.min(this.x, t.x), r = Math.max(this.x + this.width, t.x + t.width), a = Math.min(this.y, t.y), s = Math.max(this.y + this.height, t.y + t.height);
      return this.x = e, this.width = r - e, this.y = a, this.height = s - a, this;
    }, n.prototype.toString = function() {
      return "[@pixi/math:Rectangle x=" + this.x + " y=" + this.y + " width=" + this.width + " height=" + this.height + "]";
    }, n;
  }()
), Circle = (
  /** @class */
  function() {
    function n(t, e, r) {
      t === void 0 && (t = 0), e === void 0 && (e = 0), r === void 0 && (r = 0), this.x = t, this.y = e, this.radius = r, this.type = SHAPES.CIRC;
    }
    return n.prototype.clone = function() {
      return new n(this.x, this.y, this.radius);
    }, n.prototype.contains = function(t, e) {
      if (this.radius <= 0)
        return !1;
      var r = this.radius * this.radius, a = this.x - t, s = this.y - e;
      return a *= a, s *= s, a + s <= r;
    }, n.prototype.getBounds = function() {
      return new Rectangle(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
    }, n.prototype.toString = function() {
      return "[@pixi/math:Circle x=" + this.x + " y=" + this.y + " radius=" + this.radius + "]";
    }, n;
  }()
), Ellipse = (
  /** @class */
  function() {
    function n(t, e, r, a) {
      t === void 0 && (t = 0), e === void 0 && (e = 0), r === void 0 && (r = 0), a === void 0 && (a = 0), this.x = t, this.y = e, this.width = r, this.height = a, this.type = SHAPES.ELIP;
    }
    return n.prototype.clone = function() {
      return new n(this.x, this.y, this.width, this.height);
    }, n.prototype.contains = function(t, e) {
      if (this.width <= 0 || this.height <= 0)
        return !1;
      var r = (t - this.x) / this.width, a = (e - this.y) / this.height;
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
      for (var t = arguments, e = [], r = 0; r < arguments.length; r++)
        e[r] = t[r];
      var a = Array.isArray(e[0]) ? e[0] : e;
      if (typeof a[0] != "number") {
        for (var s = [], o = 0, u = a.length; o < u; o++)
          s.push(a[o].x, a[o].y);
        a = s;
      }
      this.points = a, this.type = SHAPES.POLY, this.closeStroke = !0;
    }
    return n.prototype.clone = function() {
      var t = this.points.slice(), e = new n(t);
      return e.closeStroke = this.closeStroke, e;
    }, n.prototype.contains = function(t, e) {
      for (var r = !1, a = this.points.length / 2, s = 0, o = a - 1; s < a; o = s++) {
        var u = this.points[s * 2], h = this.points[s * 2 + 1], l = this.points[o * 2], c = this.points[o * 2 + 1], v = h > e != c > e && t < (l - u) * ((e - h) / (c - h)) + u;
        v && (r = !r);
      }
      return r;
    }, n.prototype.toString = function() {
      return "[@pixi/math:Polygon" + ("closeStroke=" + this.closeStroke) + ("points=" + this.points.reduce(function(t, e) {
        return t + ", " + e;
      }, "") + "]");
    }, n;
  }()
), RoundedRectangle = (
  /** @class */
  function() {
    function n(t, e, r, a, s) {
      t === void 0 && (t = 0), e === void 0 && (e = 0), r === void 0 && (r = 0), a === void 0 && (a = 0), s === void 0 && (s = 20), this.x = t, this.y = e, this.width = r, this.height = a, this.radius = s, this.type = SHAPES.RREC;
    }
    return n.prototype.clone = function() {
      return new n(this.x, this.y, this.width, this.height, this.radius);
    }, n.prototype.contains = function(t, e) {
      if (this.width <= 0 || this.height <= 0)
        return !1;
      if (t >= this.x && t <= this.x + this.width && e >= this.y && e <= this.y + this.height) {
        var r = Math.max(0, Math.min(this.radius, Math.min(this.width, this.height) / 2));
        if (e >= this.y + r && e <= this.y + this.height - r || t >= this.x + r && t <= this.x + this.width - r)
          return !0;
        var a = t - (this.x + r), s = e - (this.y + r), o = r * r;
        if (a * a + s * s <= o || (a = t - (this.x + this.width - r), a * a + s * s <= o) || (s = e - (this.y + this.height - r), a * a + s * s <= o) || (a = t - (this.x + r), a * a + s * s <= o))
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
    function n(t, e, r, a) {
      r === void 0 && (r = 0), a === void 0 && (a = 0), this._x = r, this._y = a, this.cb = t, this.scope = e;
    }
    return n.prototype.clone = function(t, e) {
      return t === void 0 && (t = this.cb), e === void 0 && (e = this.scope), new n(t, e, this._x, this._y);
    }, n.prototype.set = function(t, e) {
      return t === void 0 && (t = 0), e === void 0 && (e = t), (this._x !== t || this._y !== e) && (this._x = t, this._y = e, this.cb.call(this.scope)), this;
    }, n.prototype.copyFrom = function(t) {
      return (this._x !== t.x || this._y !== t.y) && (this._x = t.x, this._y = t.y, this.cb.call(this.scope)), this;
    }, n.prototype.copyTo = function(t) {
      return t.set(this._x, this._y), t;
    }, n.prototype.equals = function(t) {
      return t.x === this._x && t.y === this._y;
    }, n.prototype.toString = function() {
      return "[@pixi/math:ObservablePoint x=0 y=0 scope=" + this.scope + "]";
    }, Object.defineProperty(n.prototype, "x", {
      /** Position of the observable point on the x axis. */
      get: function() {
        return this._x;
      },
      set: function(t) {
        this._x !== t && (this._x = t, this.cb.call(this.scope));
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n.prototype, "y", {
      /** Position of the observable point on the y axis. */
      get: function() {
        return this._y;
      },
      set: function(t) {
        this._y !== t && (this._y = t, this.cb.call(this.scope));
      },
      enumerable: !1,
      configurable: !0
    }), n;
  }()
), Matrix = (
  /** @class */
  function() {
    function n(t, e, r, a, s, o) {
      t === void 0 && (t = 1), e === void 0 && (e = 0), r === void 0 && (r = 0), a === void 0 && (a = 1), s === void 0 && (s = 0), o === void 0 && (o = 0), this.array = null, this.a = t, this.b = e, this.c = r, this.d = a, this.tx = s, this.ty = o;
    }
    return n.prototype.fromArray = function(t) {
      this.a = t[0], this.b = t[1], this.c = t[3], this.d = t[4], this.tx = t[2], this.ty = t[5];
    }, n.prototype.set = function(t, e, r, a, s, o) {
      return this.a = t, this.b = e, this.c = r, this.d = a, this.tx = s, this.ty = o, this;
    }, n.prototype.toArray = function(t, e) {
      this.array || (this.array = new Float32Array(9));
      var r = e || this.array;
      return t ? (r[0] = this.a, r[1] = this.b, r[2] = 0, r[3] = this.c, r[4] = this.d, r[5] = 0, r[6] = this.tx, r[7] = this.ty, r[8] = 1) : (r[0] = this.a, r[1] = this.c, r[2] = this.tx, r[3] = this.b, r[4] = this.d, r[5] = this.ty, r[6] = 0, r[7] = 0, r[8] = 1), r;
    }, n.prototype.apply = function(t, e) {
      e = e || new Point();
      var r = t.x, a = t.y;
      return e.x = this.a * r + this.c * a + this.tx, e.y = this.b * r + this.d * a + this.ty, e;
    }, n.prototype.applyInverse = function(t, e) {
      e = e || new Point();
      var r = 1 / (this.a * this.d + this.c * -this.b), a = t.x, s = t.y;
      return e.x = this.d * r * a + -this.c * r * s + (this.ty * this.c - this.tx * this.d) * r, e.y = this.a * r * s + -this.b * r * a + (-this.ty * this.a + this.tx * this.b) * r, e;
    }, n.prototype.translate = function(t, e) {
      return this.tx += t, this.ty += e, this;
    }, n.prototype.scale = function(t, e) {
      return this.a *= t, this.d *= e, this.c *= t, this.b *= e, this.tx *= t, this.ty *= e, this;
    }, n.prototype.rotate = function(t) {
      var e = Math.cos(t), r = Math.sin(t), a = this.a, s = this.c, o = this.tx;
      return this.a = a * e - this.b * r, this.b = a * r + this.b * e, this.c = s * e - this.d * r, this.d = s * r + this.d * e, this.tx = o * e - this.ty * r, this.ty = o * r + this.ty * e, this;
    }, n.prototype.append = function(t) {
      var e = this.a, r = this.b, a = this.c, s = this.d;
      return this.a = t.a * e + t.b * a, this.b = t.a * r + t.b * s, this.c = t.c * e + t.d * a, this.d = t.c * r + t.d * s, this.tx = t.tx * e + t.ty * a + this.tx, this.ty = t.tx * r + t.ty * s + this.ty, this;
    }, n.prototype.setTransform = function(t, e, r, a, s, o, u, h, l) {
      return this.a = Math.cos(u + l) * s, this.b = Math.sin(u + l) * s, this.c = -Math.sin(u - h) * o, this.d = Math.cos(u - h) * o, this.tx = t - (r * this.a + a * this.c), this.ty = e - (r * this.b + a * this.d), this;
    }, n.prototype.prepend = function(t) {
      var e = this.tx;
      if (t.a !== 1 || t.b !== 0 || t.c !== 0 || t.d !== 1) {
        var r = this.a, a = this.c;
        this.a = r * t.a + this.b * t.c, this.b = r * t.b + this.b * t.d, this.c = a * t.a + this.d * t.c, this.d = a * t.b + this.d * t.d;
      }
      return this.tx = e * t.a + this.ty * t.c + t.tx, this.ty = e * t.b + this.ty * t.d + t.ty, this;
    }, n.prototype.decompose = function(t) {
      var e = this.a, r = this.b, a = this.c, s = this.d, o = t.pivot, u = -Math.atan2(-a, s), h = Math.atan2(r, e), l = Math.abs(u + h);
      return l < 1e-5 || Math.abs(PI_2 - l) < 1e-5 ? (t.rotation = h, t.skew.x = t.skew.y = 0) : (t.rotation = 0, t.skew.x = u, t.skew.y = h), t.scale.x = Math.sqrt(e * e + r * r), t.scale.y = Math.sqrt(a * a + s * s), t.position.x = this.tx + (o.x * e + o.y * a), t.position.y = this.ty + (o.x * r + o.y * s), t;
    }, n.prototype.invert = function() {
      var t = this.a, e = this.b, r = this.c, a = this.d, s = this.tx, o = t * a - e * r;
      return this.a = a / o, this.b = -e / o, this.c = -r / o, this.d = t / o, this.tx = (r * this.ty - a * s) / o, this.ty = -(t * this.ty - e * s) / o, this;
    }, n.prototype.identity = function() {
      return this.a = 1, this.b = 0, this.c = 0, this.d = 1, this.tx = 0, this.ty = 0, this;
    }, n.prototype.clone = function() {
      var t = new n();
      return t.a = this.a, t.b = this.b, t.c = this.c, t.d = this.d, t.tx = this.tx, t.ty = this.ty, t;
    }, n.prototype.copyTo = function(t) {
      return t.a = this.a, t.b = this.b, t.c = this.c, t.d = this.d, t.tx = this.tx, t.ty = this.ty, t;
    }, n.prototype.copyFrom = function(t) {
      return this.a = t.a, this.b = t.b, this.c = t.c, this.d = t.d, this.tx = t.tx, this.ty = t.ty, this;
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
    var t = [];
    rotationCayley.push(t);
    for (var e = 0; e < 16; e++)
      for (var r = signum(ux[n] * ux[e] + vx[n] * uy[e]), a = signum(uy[n] * ux[e] + vy[n] * uy[e]), s = signum(ux[n] * vx[e] + vx[n] * vy[e]), o = signum(uy[n] * vx[e] + vy[n] * vy[e]), u = 0; u < 16; u++)
        if (ux[u] === r && uy[u] === a && vx[u] === s && vy[u] === o) {
          t.push(u);
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
  add: function(n, t) {
    return rotationCayley[n][t];
  },
  /**
   * Reverse of `add`.
   * @memberof PIXI.groupD8
   * @param {PIXI.GD8Symmetry} rotationSecond - Second operation
   * @param {PIXI.GD8Symmetry} rotationFirst - First operation
   * @returns {PIXI.GD8Symmetry} Result
   */
  sub: function(n, t) {
    return rotationCayley[n][groupD8.inv(t)];
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
  byDirection: function(n, t) {
    return Math.abs(n) * 2 <= Math.abs(t) ? t >= 0 ? groupD8.S : groupD8.N : Math.abs(t) * 2 <= Math.abs(n) ? n > 0 ? groupD8.E : groupD8.W : t > 0 ? n > 0 ? groupD8.SE : groupD8.SW : n > 0 ? groupD8.NE : groupD8.NW;
  },
  /**
   * Helps sprite to compensate texture packer rotation.
   * @memberof PIXI.groupD8
   * @param {PIXI.Matrix} matrix - sprite world matrix
   * @param {PIXI.GD8Symmetry} rotation - The rotation factor to use.
   * @param {number} tx - sprite anchoring
   * @param {number} ty - sprite anchoring
   */
  matrixAppendRotationInv: function(n, t, e, r) {
    e === void 0 && (e = 0), r === void 0 && (r = 0);
    var a = rotationMatrices[groupD8.inv(t)];
    a.tx = e, a.ty = r, n.append(a);
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
      var t = this.localTransform;
      this._localID !== this._currentLocalID && (t.a = this._cx * this.scale.x, t.b = this._sx * this.scale.x, t.c = this._cy * this.scale.y, t.d = this._sy * this.scale.y, t.tx = this.position.x - (this.pivot.x * t.a + this.pivot.y * t.c), t.ty = this.position.y - (this.pivot.x * t.b + this.pivot.y * t.d), this._currentLocalID = this._localID, this._parentID = -1);
    }, n.prototype.updateTransform = function(t) {
      var e = this.localTransform;
      if (this._localID !== this._currentLocalID && (e.a = this._cx * this.scale.x, e.b = this._sx * this.scale.x, e.c = this._cy * this.scale.y, e.d = this._sy * this.scale.y, e.tx = this.position.x - (this.pivot.x * e.a + this.pivot.y * e.c), e.ty = this.position.y - (this.pivot.x * e.b + this.pivot.y * e.d), this._currentLocalID = this._localID, this._parentID = -1), this._parentID !== t._worldID) {
        var r = t.worldTransform, a = this.worldTransform;
        a.a = e.a * r.a + e.b * r.c, a.b = e.a * r.b + e.b * r.d, a.c = e.c * r.a + e.d * r.c, a.d = e.c * r.b + e.d * r.d, a.tx = e.tx * r.a + e.ty * r.c + r.tx, a.ty = e.tx * r.b + e.ty * r.d + r.ty, this._parentID = t._worldID, this._worldID++;
      }
    }, n.prototype.setFromMatrix = function(t) {
      t.decompose(this), this._localID++;
    }, Object.defineProperty(n.prototype, "rotation", {
      /** The rotation of the object in radians. */
      get: function() {
        return this._rotation;
      },
      set: function(t) {
        this._rotation !== t && (this._rotation = t, this.updateSkew());
      },
      enumerable: !1,
      configurable: !0
    }), n.IDENTITY = new n(), n;
  }()
);
/*!
 * @pixi/display - v6.5.10
 * Compiled Thu, 06 Jul 2023 15:25:11 UTC
 *
 * @pixi/display is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
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
    }, n.prototype.getRectangle = function(t) {
      return this.minX > this.maxX || this.minY > this.maxY ? Rectangle.EMPTY : (t = t || new Rectangle(0, 0, 1, 1), t.x = this.minX, t.y = this.minY, t.width = this.maxX - this.minX, t.height = this.maxY - this.minY, t);
    }, n.prototype.addPoint = function(t) {
      this.minX = Math.min(this.minX, t.x), this.maxX = Math.max(this.maxX, t.x), this.minY = Math.min(this.minY, t.y), this.maxY = Math.max(this.maxY, t.y);
    }, n.prototype.addPointMatrix = function(t, e) {
      var r = t.a, a = t.b, s = t.c, o = t.d, u = t.tx, h = t.ty, l = r * e.x + s * e.y + u, c = a * e.x + o * e.y + h;
      this.minX = Math.min(this.minX, l), this.maxX = Math.max(this.maxX, l), this.minY = Math.min(this.minY, c), this.maxY = Math.max(this.maxY, c);
    }, n.prototype.addQuad = function(t) {
      var e = this.minX, r = this.minY, a = this.maxX, s = this.maxY, o = t[0], u = t[1];
      e = o < e ? o : e, r = u < r ? u : r, a = o > a ? o : a, s = u > s ? u : s, o = t[2], u = t[3], e = o < e ? o : e, r = u < r ? u : r, a = o > a ? o : a, s = u > s ? u : s, o = t[4], u = t[5], e = o < e ? o : e, r = u < r ? u : r, a = o > a ? o : a, s = u > s ? u : s, o = t[6], u = t[7], e = o < e ? o : e, r = u < r ? u : r, a = o > a ? o : a, s = u > s ? u : s, this.minX = e, this.minY = r, this.maxX = a, this.maxY = s;
    }, n.prototype.addFrame = function(t, e, r, a, s) {
      this.addFrameMatrix(t.worldTransform, e, r, a, s);
    }, n.prototype.addFrameMatrix = function(t, e, r, a, s) {
      var o = t.a, u = t.b, h = t.c, l = t.d, c = t.tx, v = t.ty, d = this.minX, m = this.minY, g = this.maxX, y = this.maxY, _ = o * e + h * r + c, b = u * e + l * r + v;
      d = _ < d ? _ : d, m = b < m ? b : m, g = _ > g ? _ : g, y = b > y ? b : y, _ = o * a + h * r + c, b = u * a + l * r + v, d = _ < d ? _ : d, m = b < m ? b : m, g = _ > g ? _ : g, y = b > y ? b : y, _ = o * e + h * s + c, b = u * e + l * s + v, d = _ < d ? _ : d, m = b < m ? b : m, g = _ > g ? _ : g, y = b > y ? b : y, _ = o * a + h * s + c, b = u * a + l * s + v, d = _ < d ? _ : d, m = b < m ? b : m, g = _ > g ? _ : g, y = b > y ? b : y, this.minX = d, this.minY = m, this.maxX = g, this.maxY = y;
    }, n.prototype.addVertexData = function(t, e, r) {
      for (var a = this.minX, s = this.minY, o = this.maxX, u = this.maxY, h = e; h < r; h += 2) {
        var l = t[h], c = t[h + 1];
        a = l < a ? l : a, s = c < s ? c : s, o = l > o ? l : o, u = c > u ? c : u;
      }
      this.minX = a, this.minY = s, this.maxX = o, this.maxY = u;
    }, n.prototype.addVertices = function(t, e, r, a) {
      this.addVerticesMatrix(t.worldTransform, e, r, a);
    }, n.prototype.addVerticesMatrix = function(t, e, r, a, s, o) {
      s === void 0 && (s = 0), o === void 0 && (o = s);
      for (var u = t.a, h = t.b, l = t.c, c = t.d, v = t.tx, d = t.ty, m = this.minX, g = this.minY, y = this.maxX, _ = this.maxY, b = r; b < a; b += 2) {
        var S = e[b], P = e[b + 1], N = u * S + l * P + v, E = c * P + h * S + d;
        m = Math.min(m, N - s), y = Math.max(y, N + s), g = Math.min(g, E - o), _ = Math.max(_, E + o);
      }
      this.minX = m, this.minY = g, this.maxX = y, this.maxY = _;
    }, n.prototype.addBounds = function(t) {
      var e = this.minX, r = this.minY, a = this.maxX, s = this.maxY;
      this.minX = t.minX < e ? t.minX : e, this.minY = t.minY < r ? t.minY : r, this.maxX = t.maxX > a ? t.maxX : a, this.maxY = t.maxY > s ? t.maxY : s;
    }, n.prototype.addBoundsMask = function(t, e) {
      var r = t.minX > e.minX ? t.minX : e.minX, a = t.minY > e.minY ? t.minY : e.minY, s = t.maxX < e.maxX ? t.maxX : e.maxX, o = t.maxY < e.maxY ? t.maxY : e.maxY;
      if (r <= s && a <= o) {
        var u = this.minX, h = this.minY, l = this.maxX, c = this.maxY;
        this.minX = r < u ? r : u, this.minY = a < h ? a : h, this.maxX = s > l ? s : l, this.maxY = o > c ? o : c;
      }
    }, n.prototype.addBoundsMatrix = function(t, e) {
      this.addFrameMatrix(e, t.minX, t.minY, t.maxX, t.maxY);
    }, n.prototype.addBoundsArea = function(t, e) {
      var r = t.minX > e.x ? t.minX : e.x, a = t.minY > e.y ? t.minY : e.y, s = t.maxX < e.x + e.width ? t.maxX : e.x + e.width, o = t.maxY < e.y + e.height ? t.maxY : e.y + e.height;
      if (r <= s && a <= o) {
        var u = this.minX, h = this.minY, l = this.maxX, c = this.maxY;
        this.minX = r < u ? r : u, this.minY = a < h ? a : h, this.maxX = s > l ? s : l, this.maxY = o > c ? o : c;
      }
    }, n.prototype.pad = function(t, e) {
      t === void 0 && (t = 0), e === void 0 && (e = t), this.isEmpty() || (this.minX -= t, this.maxX += t, this.minY -= e, this.maxY += e);
    }, n.prototype.addFramePad = function(t, e, r, a, s, o) {
      t -= s, e -= o, r += s, a += o, this.minX = this.minX < t ? this.minX : t, this.maxX = this.maxX > r ? this.maxX : r, this.minY = this.minY < e ? this.minY : e, this.maxY = this.maxY > a ? this.maxY : a;
    }, n;
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
var extendStatics$j = function(n, t) {
  return extendStatics$j = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, r) {
    e.__proto__ = r;
  } || function(e, r) {
    for (var a in r)
      r.hasOwnProperty(a) && (e[a] = r[a]);
  }, extendStatics$j(n, t);
};
function __extends$j(n, t) {
  extendStatics$j(n, t);
  function e() {
    this.constructor = n;
  }
  n.prototype = t === null ? Object.create(t) : (e.prototype = t.prototype, new e());
}
var DisplayObject = (
  /** @class */
  function(n) {
    __extends$j(t, n);
    function t() {
      var e = n.call(this) || this;
      return e.tempDisplayObjectParent = null, e.transform = new Transform(), e.alpha = 1, e.visible = !0, e.renderable = !0, e.cullable = !1, e.cullArea = null, e.parent = null, e.worldAlpha = 1, e._lastSortedIndex = 0, e._zIndex = 0, e.filterArea = null, e.filters = null, e._enabledFilters = null, e._bounds = new Bounds(), e._localBounds = null, e._boundsID = 0, e._boundsRect = null, e._localBoundsRect = null, e._mask = null, e._maskRefCount = 0, e._destroyed = !1, e.isSprite = !1, e.isMask = !1, e;
    }
    return t.mixin = function(e) {
      for (var r = Object.keys(e), a = 0; a < r.length; ++a) {
        var s = r[a];
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
      return e || (this.parent ? (this._recursivePostUpdateTransform(), this.updateTransform()) : (this.parent = this._tempDisplayObjectParent, this.updateTransform(), this.parent = null)), this._bounds.updateID !== this._boundsID && (this.calculateBounds(), this._bounds.updateID = this._boundsID), r || (this._boundsRect || (this._boundsRect = new Rectangle()), r = this._boundsRect), this._bounds.getRectangle(r);
    }, t.prototype.getLocalBounds = function(e) {
      e || (this._localBoundsRect || (this._localBoundsRect = new Rectangle()), e = this._localBoundsRect), this._localBounds || (this._localBounds = new Bounds());
      var r = this.transform, a = this.parent;
      this.parent = null, this.transform = this._tempDisplayObjectParent.transform;
      var s = this._bounds, o = this._boundsID;
      this._bounds = this._localBounds;
      var u = this.getBounds(!1, e);
      return this.parent = a, this.transform = r, this._bounds = s, this._bounds.updateID += this._boundsID - o, u;
    }, t.prototype.toGlobal = function(e, r, a) {
      return a === void 0 && (a = !1), a || (this._recursivePostUpdateTransform(), this.parent ? this.displayObjectUpdateTransform() : (this.parent = this._tempDisplayObjectParent, this.displayObjectUpdateTransform(), this.parent = null)), this.worldTransform.apply(e, r);
    }, t.prototype.toLocal = function(e, r, a, s) {
      return r && (e = r.toGlobal(e, a, s)), s || (this._recursivePostUpdateTransform(), this.parent ? this.displayObjectUpdateTransform() : (this.parent = this._tempDisplayObjectParent, this.displayObjectUpdateTransform(), this.parent = null)), this.worldTransform.applyInverse(e, a);
    }, t.prototype.setParent = function(e) {
      if (!e || !e.addChild)
        throw new Error("setParent: Argument must be a Container");
      return e.addChild(this), e;
    }, t.prototype.setTransform = function(e, r, a, s, o, u, h, l, c) {
      return e === void 0 && (e = 0), r === void 0 && (r = 0), a === void 0 && (a = 1), s === void 0 && (s = 1), o === void 0 && (o = 0), u === void 0 && (u = 0), h === void 0 && (h = 0), l === void 0 && (l = 0), c === void 0 && (c = 0), this.position.x = e, this.position.y = r, this.scale.x = a || 1, this.scale.y = s || 1, this.rotation = o, this.skew.x = u, this.skew.y = h, this.pivot.x = l, this.pivot.y = c, this;
    }, t.prototype.destroy = function(e) {
      this.parent && this.parent.removeChild(this), this._destroyed = !0, this.transform = null, this.parent = null, this._bounds = null, this.mask = null, this.cullArea = null, this.filters = null, this.filterArea = null, this.hitArea = null, this.interactive = !1, this.interactiveChildren = !1, this.emit("destroyed"), this.removeAllListeners();
    }, Object.defineProperty(t.prototype, "_tempDisplayObjectParent", {
      /**
       * @protected
       * @member {PIXI.Container}
       */
      get: function() {
        return this.tempDisplayObjectParent === null && (this.tempDisplayObjectParent = new TemporaryDisplayObject()), this.tempDisplayObjectParent;
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
        return this.transform.rotation * RAD_TO_DEG;
      },
      set: function(e) {
        this.transform.rotation = e * DEG_TO_RAD;
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
  }(i)
), TemporaryDisplayObject = (
  /** @class */
  function(n) {
    __extends$j(t, n);
    function t() {
      var e = n !== null && n.apply(this, arguments) || this;
      return e.sortDirty = null, e;
    }
    return t;
  }(DisplayObject)
);
DisplayObject.prototype.displayObjectUpdateTransform = DisplayObject.prototype.updateTransform;
function sortChildren(n, t) {
  return n.zIndex === t.zIndex ? n._lastSortedIndex - t._lastSortedIndex : n.zIndex - t.zIndex;
}
var Container = (
  /** @class */
  function(n) {
    __extends$j(t, n);
    function t() {
      var e = n.call(this) || this;
      return e.children = [], e.sortableChildren = settings.SORTABLE_CHILDREN, e.sortDirty = !1, e;
    }
    return t.prototype.onChildrenChange = function(e) {
    }, t.prototype.addChild = function() {
      for (var e = arguments, r = [], a = 0; a < arguments.length; a++)
        r[a] = e[a];
      if (r.length > 1)
        for (var s = 0; s < r.length; s++)
          this.addChild(r[s]);
      else {
        var o = r[0];
        o.parent && o.parent.removeChild(o), o.parent = this, this.sortDirty = !0, o.transform._parentID = -1, this.children.push(o), this._boundsID++, this.onChildrenChange(this.children.length - 1), this.emit("childAdded", o, this, this.children.length - 1), o.emit("added", this);
      }
      return r[0];
    }, t.prototype.addChildAt = function(e, r) {
      if (r < 0 || r > this.children.length)
        throw new Error(e + "addChildAt: The index " + r + " supplied is out of bounds " + this.children.length);
      return e.parent && e.parent.removeChild(e), e.parent = this, this.sortDirty = !0, e.transform._parentID = -1, this.children.splice(r, 0, e), this._boundsID++, this.onChildrenChange(r), e.emit("added", this), this.emit("childAdded", e, this, r), e;
    }, t.prototype.swapChildren = function(e, r) {
      if (e !== r) {
        var a = this.getChildIndex(e), s = this.getChildIndex(r);
        this.children[a] = r, this.children[s] = e, this.onChildrenChange(a < s ? a : s);
      }
    }, t.prototype.getChildIndex = function(e) {
      var r = this.children.indexOf(e);
      if (r === -1)
        throw new Error("The supplied DisplayObject must be a child of the caller");
      return r;
    }, t.prototype.setChildIndex = function(e, r) {
      if (r < 0 || r >= this.children.length)
        throw new Error("The index " + r + " supplied is out of bounds " + this.children.length);
      var a = this.getChildIndex(e);
      removeItems(this.children, a, 1), this.children.splice(r, 0, e), this.onChildrenChange(r);
    }, t.prototype.getChildAt = function(e) {
      if (e < 0 || e >= this.children.length)
        throw new Error("getChildAt: Index (" + e + ") does not exist.");
      return this.children[e];
    }, t.prototype.removeChild = function() {
      for (var e = arguments, r = [], a = 0; a < arguments.length; a++)
        r[a] = e[a];
      if (r.length > 1)
        for (var s = 0; s < r.length; s++)
          this.removeChild(r[s]);
      else {
        var o = r[0], u = this.children.indexOf(o);
        if (u === -1)
          return null;
        o.parent = null, o.transform._parentID = -1, removeItems(this.children, u, 1), this._boundsID++, this.onChildrenChange(u), o.emit("removed", this), this.emit("childRemoved", o, this, u);
      }
      return r[0];
    }, t.prototype.removeChildAt = function(e) {
      var r = this.getChildAt(e);
      return r.parent = null, r.transform._parentID = -1, removeItems(this.children, e, 1), this._boundsID++, this.onChildrenChange(e), r.emit("removed", this), this.emit("childRemoved", r, this, e), r;
    }, t.prototype.removeChildren = function(e, r) {
      e === void 0 && (e = 0), r === void 0 && (r = this.children.length);
      var a = e, s = r, o = s - a, u;
      if (o > 0 && o <= s) {
        u = this.children.splice(a, o);
        for (var h = 0; h < u.length; ++h)
          u[h].parent = null, u[h].transform && (u[h].transform._parentID = -1);
        this._boundsID++, this.onChildrenChange(e);
        for (var h = 0; h < u.length; ++h)
          u[h].emit("removed", this), this.emit("childRemoved", u[h], this, h);
        return u;
      } else if (o === 0 && this.children.length === 0)
        return [];
      throw new RangeError("removeChildren: numeric values are outside the acceptable range.");
    }, t.prototype.sortChildren = function() {
      for (var e = !1, r = 0, a = this.children.length; r < a; ++r) {
        var s = this.children[r];
        s._lastSortedIndex = r, !e && s.zIndex !== 0 && (e = !0);
      }
      e && this.children.length > 1 && this.children.sort(sortChildren), this.sortDirty = !1;
    }, t.prototype.updateTransform = function() {
      this.sortableChildren && this.sortDirty && this.sortChildren(), this._boundsID++, this.transform.updateTransform(this.parent.transform), this.worldAlpha = this.alpha * this.parent.worldAlpha;
      for (var e = 0, r = this.children.length; e < r; ++e) {
        var a = this.children[e];
        a.visible && a.updateTransform();
      }
    }, t.prototype.calculateBounds = function() {
      this._bounds.clear(), this._calculateBounds();
      for (var e = 0; e < this.children.length; e++) {
        var r = this.children[e];
        if (!(!r.visible || !r.renderable))
          if (r.calculateBounds(), r._mask) {
            var a = r._mask.isMaskData ? r._mask.maskObject : r._mask;
            a ? (a.calculateBounds(), this._bounds.addBoundsMask(r._bounds, a._bounds)) : this._bounds.addBounds(r._bounds);
          } else r.filterArea ? this._bounds.addBoundsArea(r._bounds, r.filterArea) : this._bounds.addBounds(r._bounds);
      }
      this._bounds.updateID = this._boundsID;
    }, t.prototype.getLocalBounds = function(e, r) {
      r === void 0 && (r = !1);
      var a = n.prototype.getLocalBounds.call(this, e);
      if (!r)
        for (var s = 0, o = this.children.length; s < o; ++s) {
          var u = this.children[s];
          u.visible && u.updateTransform();
        }
      return a;
    }, t.prototype._calculateBounds = function() {
    }, t.prototype._renderWithCulling = function(e) {
      var r = e.renderTexture.sourceFrame;
      if (r.width > 0 && r.height > 0) {
        var a, s;
        if (this.cullArea ? (a = this.cullArea, s = this.worldTransform) : this._render !== t.prototype._render && (a = this.getBounds(!0)), a && r.intersects(a, s))
          this._render(e);
        else if (this.cullArea)
          return;
        for (var o = 0, u = this.children.length; o < u; ++o) {
          var h = this.children[o], l = h.cullable;
          h.cullable = l || !this.cullArea, h.render(e), h.cullable = l;
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
          for (var r = 0, a = this.children.length; r < a; ++r)
            this.children[r].render(e);
        }
    }, t.prototype.renderAdvanced = function(e) {
      var r = this.filters, a = this._mask;
      if (r) {
        this._enabledFilters || (this._enabledFilters = []), this._enabledFilters.length = 0;
        for (var s = 0; s < r.length; s++)
          r[s].enabled && this._enabledFilters.push(r[s]);
      }
      var o = r && this._enabledFilters && this._enabledFilters.length || a && (!a.isMaskData || a.enabled && (a.autoDetect || a.type !== MASK_TYPES.NONE));
      if (o && e.batch.flush(), r && this._enabledFilters && this._enabledFilters.length && e.filter.push(this, this._enabledFilters), a && e.mask.push(this, this._mask), this.cullable)
        this._renderWithCulling(e);
      else {
        this._render(e);
        for (var s = 0, u = this.children.length; s < u; ++s)
          this.children[s].render(e);
      }
      o && e.batch.flush(), a && e.mask.pop(this), r && this._enabledFilters && this._enabledFilters.length && e.filter.pop();
    }, t.prototype._render = function(e) {
    }, t.prototype.destroy = function(e) {
      n.prototype.destroy.call(this), this.sortDirty = !1;
      var r = typeof e == "boolean" ? e : e && e.children, a = this.removeChildren(0, this.children.length);
      if (r)
        for (var s = 0; s < a.length; ++s)
          a[s].destroy(e);
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
  }(DisplayObject)
);
Container.prototype.containerUpdateTransform = Container.prototype.updateTransform;
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
var __assign$1 = function() {
  return __assign$1 = Object.assign || function(t) {
    for (var e = arguments, r, a = 1, s = arguments.length; a < s; a++) {
      r = e[a];
      for (var o in r)
        Object.prototype.hasOwnProperty.call(r, o) && (t[o] = r[o]);
    }
    return t;
  }, __assign$1.apply(this, arguments);
}, ExtensionType;
(function(n) {
  n.Application = "application", n.RendererPlugin = "renderer-webgl-plugin", n.CanvasRendererPlugin = "renderer-canvas-plugin", n.Loader = "loader", n.LoadParser = "load-parser", n.ResolveParser = "resolve-parser", n.CacheParser = "cache-parser", n.DetectionParser = "detection-parser";
})(ExtensionType || (ExtensionType = {}));
var normalizeExtension = function(n) {
  if (typeof n == "function" || typeof n == "object" && n.extension) {
    if (!n.extension)
      throw new Error("Extension class must have an extension object");
    var t = typeof n.extension != "object" ? { type: n.extension } : n.extension;
    n = __assign$1(__assign$1({}, t), { ref: n });
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
    for (var n = arguments, t = this, e = [], r = 0; r < arguments.length; r++)
      e[r] = n[r];
    return e.map(normalizeExtension).forEach(function(a) {
      a.type.forEach(function(s) {
        var o, u;
        return (u = (o = t._removeHandlers)[s]) === null || u === void 0 ? void 0 : u.call(o, a);
      });
    }), this;
  },
  /**
   * Register new extensions with PixiJS.
   * @param extensions - The spread of extensions to add to PixiJS.
   * @returns {PIXI.extensions} For chaining.
   */
  add: function() {
    for (var n = arguments, t = this, e = [], r = 0; r < arguments.length; r++)
      e[r] = n[r];
    return e.map(normalizeExtension).forEach(function(a) {
      a.type.forEach(function(s) {
        var o = t._addHandlers, u = t._queue;
        o[s] ? o[s](a) : (u[s] = u[s] || [], u[s].push(a));
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
  handle: function(n, t, e) {
    var r = this._addHandlers = this._addHandlers || {}, a = this._removeHandlers = this._removeHandlers || {};
    if (r[n] || a[n])
      throw new Error("Extension type " + n + " already has a handler");
    r[n] = t, a[n] = e;
    var s = this._queue;
    return s[n] && (s[n].forEach(function(o) {
      return t(o);
    }), delete s[n]), this;
  },
  /**
   * Handle a type, but using a map by `name` property.
   * @param type - Type of extension to handle.
   * @param map - The object map of named extensions.
   * @returns {PIXI.extensions} For chaining.
   */
  handleByMap: function(n, t) {
    return this.handle(n, function(e) {
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
  handleByList: function(n, t) {
    return this.handle(n, function(e) {
      var r, a;
      t.includes(e.ref) || (t.push(e.ref), n === ExtensionType.Loader && ((a = (r = e.ref).add) === null || a === void 0 || a.call(r)));
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
var Runner = (
  /** @class */
  function() {
    function n(t) {
      this.items = [], this._name = t, this._aliasCount = 0;
    }
    return n.prototype.emit = function(t, e, r, a, s, o, u, h) {
      if (arguments.length > 8)
        throw new Error("max arguments reached");
      var l = this, c = l.name, v = l.items;
      this._aliasCount++;
      for (var d = 0, m = v.length; d < m; d++)
        v[d][c](t, e, r, a, s, o, u, h);
      return v === this.items && this._aliasCount--, this;
    }, n.prototype.ensureNonAliasedItems = function() {
      this._aliasCount > 0 && this.items.length > 1 && (this._aliasCount = 0, this.items = this.items.slice(0));
    }, n.prototype.add = function(t) {
      return t[this._name] && (this.ensureNonAliasedItems(), this.remove(t), this.items.push(t)), this;
    }, n.prototype.remove = function(t) {
      var e = this.items.indexOf(t);
      return e !== -1 && (this.ensureNonAliasedItems(), this.items.splice(e, 1)), this;
    }, n.prototype.contains = function(t) {
      return this.items.indexOf(t) !== -1;
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
/*!
 * @pixi/ticker - v6.5.10
 * Compiled Thu, 06 Jul 2023 15:25:11 UTC
 *
 * @pixi/ticker is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
settings.TARGET_FPMS = 0.06;
var UPDATE_PRIORITY;
(function(n) {
  n[n.INTERACTION = 50] = "INTERACTION", n[n.HIGH = 25] = "HIGH", n[n.NORMAL = 0] = "NORMAL", n[n.LOW = -25] = "LOW", n[n.UTILITY = -50] = "UTILITY";
})(UPDATE_PRIORITY || (UPDATE_PRIORITY = {}));
var TickerListener = (
  /** @class */
  function() {
    function n(t, e, r, a) {
      e === void 0 && (e = null), r === void 0 && (r = 0), a === void 0 && (a = !1), this.next = null, this.previous = null, this._destroyed = !1, this.fn = t, this.context = e, this.priority = r, this.once = a;
    }
    return n.prototype.match = function(t, e) {
      return e === void 0 && (e = null), this.fn === t && this.context === e;
    }, n.prototype.emit = function(t) {
      this.fn && (this.context ? this.fn.call(this.context, t) : this.fn(t));
      var e = this.next;
      return this.once && this.destroy(!0), this._destroyed && (this.next = null), e;
    }, n.prototype.connect = function(t) {
      this.previous = t, t.next && (t.next.previous = this), this.next = t.next, t.next = this;
    }, n.prototype.destroy = function(t) {
      t === void 0 && (t = !1), this._destroyed = !0, this.fn = null, this.context = null, this.previous && (this.previous.next = this.next), this.next && (this.next.previous = this.previous);
      var e = this.next;
      return this.next = t ? null : e, this.previous = null, e;
    }, n;
  }()
), Ticker = (
  /** @class */
  function() {
    function n() {
      var t = this;
      this.autoStart = !1, this.deltaTime = 1, this.lastTime = -1, this.speed = 1, this.started = !1, this._requestId = null, this._maxElapsedMS = 100, this._minElapsedMS = 0, this._protected = !1, this._lastFrame = -1, this._head = new TickerListener(null, null, 1 / 0), this.deltaMS = 1 / settings.TARGET_FPMS, this.elapsedMS = 1 / settings.TARGET_FPMS, this._tick = function(e) {
        t._requestId = null, t.started && (t.update(e), t.started && t._requestId === null && t._head.next && (t._requestId = requestAnimationFrame(t._tick)));
      };
    }
    return n.prototype._requestIfNeeded = function() {
      this._requestId === null && this._head.next && (this.lastTime = performance.now(), this._lastFrame = this.lastTime, this._requestId = requestAnimationFrame(this._tick));
    }, n.prototype._cancelIfNeeded = function() {
      this._requestId !== null && (cancelAnimationFrame(this._requestId), this._requestId = null);
    }, n.prototype._startIfPossible = function() {
      this.started ? this._requestIfNeeded() : this.autoStart && this.start();
    }, n.prototype.add = function(t, e, r) {
      return r === void 0 && (r = UPDATE_PRIORITY.NORMAL), this._addListener(new TickerListener(t, e, r));
    }, n.prototype.addOnce = function(t, e, r) {
      return r === void 0 && (r = UPDATE_PRIORITY.NORMAL), this._addListener(new TickerListener(t, e, r, !0));
    }, n.prototype._addListener = function(t) {
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
    }, n.prototype.remove = function(t, e) {
      for (var r = this._head.next; r; )
        r.match(t, e) ? r = r.destroy() : r = r.next;
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
        for (var t = 0, e = this._head; e = e.next; )
          t++;
        return t;
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
        for (var t = this._head.next; t; )
          t = t.destroy(!0);
        this._head.destroy(), this._head = null;
      }
    }, n.prototype.update = function(t) {
      t === void 0 && (t = performance.now());
      var e;
      if (t > this.lastTime) {
        if (e = this.elapsedMS = t - this.lastTime, e > this._maxElapsedMS && (e = this._maxElapsedMS), e *= this.speed, this._minElapsedMS) {
          var r = t - this._lastFrame | 0;
          if (r < this._minElapsedMS)
            return;
          this._lastFrame = t - r % this._minElapsedMS;
        }
        this.deltaMS = e, this.deltaTime = this.deltaMS * settings.TARGET_FPMS;
        for (var a = this._head, s = a.next; s; )
          s = s.emit(this.deltaTime);
        a.next || this._cancelIfNeeded();
      } else
        this.deltaTime = this.deltaMS = this.elapsedMS = 0;
      this.lastTime = t;
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
      set: function(t) {
        var e = Math.min(this.maxFPS, t), r = Math.min(Math.max(0, e) / 1e3, settings.TARGET_FPMS);
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
          var t = n._shared = new n();
          t.autoStart = !0, t._protected = !0;
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
          var t = n._system = new n();
          t.autoStart = !0, t._protected = !0;
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
    return n.init = function(t) {
      var e = this;
      t = Object.assign({
        autoStart: !0,
        sharedTicker: !1
      }, t), Object.defineProperty(this, "ticker", {
        set: function(r) {
          this._ticker && this._ticker.remove(this.render, this), this._ticker = r, r && r.add(this.render, this, UPDATE_PRIORITY.LOW);
        },
        get: function() {
          return this._ticker;
        }
      }), this.stop = function() {
        e._ticker.stop();
      }, this.start = function() {
        e._ticker.start();
      }, this._ticker = null, this.ticker = t.sharedTicker ? Ticker.shared : new Ticker(), t.autoStart && this.start();
    }, n.destroy = function() {
      if (this._ticker) {
        var t = this._ticker;
        this.ticker = null, t.destroy();
      }
    }, n.extension = ExtensionType.Application, n;
  }()
);
/*!
 * @pixi/core - v6.5.10
 * Compiled Thu, 06 Jul 2023 15:25:11 UTC
 *
 * @pixi/core is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
settings.PREFER_ENV = isMobile.any ? ENV.WEBGL : ENV.WEBGL2;
settings.STRICT_TEXTURE_CACHE = !1;
var INSTALLED = [];
function autoDetectResource(n, t) {
  if (!n)
    return null;
  var e = "";
  if (typeof n == "string") {
    var r = /\.(\w{3,4})(?:$|\?|#)/i.exec(n);
    r && (e = r[1].toLowerCase());
  }
  for (var a = INSTALLED.length - 1; a >= 0; --a) {
    var s = INSTALLED[a];
    if (s.test && s.test(n, e))
      return new s(n, t);
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
var extendStatics$i = function(n, t) {
  return extendStatics$i = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, r) {
    e.__proto__ = r;
  } || function(e, r) {
    for (var a in r)
      r.hasOwnProperty(a) && (e[a] = r[a]);
  }, extendStatics$i(n, t);
};
function __extends$i(n, t) {
  extendStatics$i(n, t);
  function e() {
    this.constructor = n;
  }
  n.prototype = t === null ? Object.create(t) : (e.prototype = t.prototype, new e());
}
var __assign = function() {
  return __assign = Object.assign || function(t) {
    for (var e = arguments, r, a = 1, s = arguments.length; a < s; a++) {
      r = e[a];
      for (var o in r)
        Object.prototype.hasOwnProperty.call(r, o) && (t[o] = r[o]);
    }
    return t;
  }, __assign.apply(this, arguments);
};
function __rest(n, t) {
  var e = {};
  for (var r in n)
    Object.prototype.hasOwnProperty.call(n, r) && t.indexOf(r) < 0 && (e[r] = n[r]);
  if (n != null && typeof Object.getOwnPropertySymbols == "function")
    for (var a = 0, r = Object.getOwnPropertySymbols(n); a < r.length; a++)
      t.indexOf(r[a]) < 0 && Object.prototype.propertyIsEnumerable.call(n, r[a]) && (e[r[a]] = n[r[a]]);
  return e;
}
var Resource = (
  /** @class */
  function() {
    function n(t, e) {
      t === void 0 && (t = 0), e === void 0 && (e = 0), this._width = t, this._height = e, this.destroyed = !1, this.internal = !1, this.onResize = new Runner("setRealSize"), this.onUpdate = new Runner("update"), this.onError = new Runner("onError");
    }
    return n.prototype.bind = function(t) {
      this.onResize.add(t), this.onUpdate.add(t), this.onError.add(t), (this._width || this._height) && this.onResize.emit(this._width, this._height);
    }, n.prototype.unbind = function(t) {
      this.onResize.remove(t), this.onUpdate.remove(t), this.onError.remove(t);
    }, n.prototype.resize = function(t, e) {
      (t !== this._width || e !== this._height) && (this._width = t, this._height = e, this.onResize.emit(t, e));
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
    }), n.prototype.style = function(t, e, r) {
      return !1;
    }, n.prototype.dispose = function() {
    }, n.prototype.destroy = function() {
      this.destroyed || (this.destroyed = !0, this.dispose(), this.onError.removeAll(), this.onError = null, this.onResize.removeAll(), this.onResize = null, this.onUpdate.removeAll(), this.onUpdate = null);
    }, n.test = function(t, e) {
      return !1;
    }, n;
  }()
), BufferResource = (
  /** @class */
  function(n) {
    __extends$i(t, n);
    function t(e, r) {
      var a = this, s = r || {}, o = s.width, u = s.height;
      if (!o || !u)
        throw new Error("BufferResource width or height invalid");
      return a = n.call(this, o, u) || this, a.data = e, a;
    }
    return t.prototype.upload = function(e, r, a) {
      var s = e.gl;
      s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL, r.alphaMode === ALPHA_MODES.UNPACK);
      var o = r.realWidth, u = r.realHeight;
      return a.width === o && a.height === u ? s.texSubImage2D(r.target, 0, 0, 0, o, u, r.format, a.type, this.data) : (a.width = o, a.height = u, s.texImage2D(r.target, 0, a.internalFormat, o, u, 0, r.format, a.type, this.data)), !0;
    }, t.prototype.dispose = function() {
      this.data = null;
    }, t.test = function(e) {
      return e instanceof Float32Array || e instanceof Uint8Array || e instanceof Uint32Array;
    }, t;
  }(Resource)
), defaultBufferOptions = {
  scaleMode: SCALE_MODES.NEAREST,
  format: FORMATS.RGBA,
  alphaMode: ALPHA_MODES.NPM
}, BaseTexture = (
  /** @class */
  function(n) {
    __extends$i(t, n);
    function t(e, r) {
      e === void 0 && (e = null), r === void 0 && (r = null);
      var a = n.call(this) || this;
      r = r || {};
      var s = r.alphaMode, o = r.mipmap, u = r.anisotropicLevel, h = r.scaleMode, l = r.width, c = r.height, v = r.wrapMode, d = r.format, m = r.type, g = r.target, y = r.resolution, _ = r.resourceOptions;
      return e && !(e instanceof Resource) && (e = autoDetectResource(e, _), e.internal = !0), a.resolution = y || settings.RESOLUTION, a.width = Math.round((l || 0) * a.resolution) / a.resolution, a.height = Math.round((c || 0) * a.resolution) / a.resolution, a._mipmap = o !== void 0 ? o : settings.MIPMAP_TEXTURES, a.anisotropicLevel = u !== void 0 ? u : settings.ANISOTROPIC_LEVEL, a._wrapMode = v || settings.WRAP_MODE, a._scaleMode = h !== void 0 ? h : settings.SCALE_MODE, a.format = d || FORMATS.RGBA, a.type = m || TYPES.UNSIGNED_BYTE, a.target = g || TARGETS.TEXTURE_2D, a.alphaMode = s !== void 0 ? s : ALPHA_MODES.UNPACK, a.uid = uid(), a.touched = 0, a.isPowerOfTwo = !1, a._refreshPOT(), a._glTextures = {}, a.dirtyId = 0, a.dirtyStyleId = 0, a.cacheId = null, a.valid = l > 0 && c > 0, a.textureCacheIds = [], a.destroyed = !1, a.resource = null, a._batchEnabled = 0, a._batchLocation = 0, a.parentTextureArray = null, a.setResource(e), a;
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
      var a;
      return e !== void 0 && e !== this.scaleMode && (this.scaleMode = e, a = !0), r !== void 0 && r !== this.mipmap && (this.mipmap = r, a = !0), a && this.dirtyStyleId++, this;
    }, t.prototype.setSize = function(e, r, a) {
      return a = a || this.resolution, this.setRealSize(e * a, r * a, a);
    }, t.prototype.setRealSize = function(e, r, a) {
      return this.resolution = a || this.resolution, this.width = Math.round(e) / this.resolution, this.height = Math.round(r) / this.resolution, this._refreshPOT(), this.update(), this;
    }, t.prototype._refreshPOT = function() {
      this.isPowerOfTwo = isPow2(this.realWidth) && isPow2(this.realHeight);
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
      this.resource && (this.resource.unbind(this), this.resource.internal && this.resource.destroy(), this.resource = null), this.cacheId && (delete BaseTextureCache[this.cacheId], delete TextureCache[this.cacheId], this.cacheId = null), this.dispose(), t.removeFromCache(this), this.textureCacheIds = null, this.destroyed = !0;
    }, t.prototype.dispose = function() {
      this.emit("dispose", this);
    }, t.prototype.castToBaseTexture = function() {
      return this;
    }, t.from = function(e, r, a) {
      a === void 0 && (a = settings.STRICT_TEXTURE_CACHE);
      var s = typeof e == "string", o = null;
      if (s)
        o = e;
      else {
        if (!e._pixiId) {
          var u = r && r.pixiIdPrefix || "pixiid";
          e._pixiId = u + "_" + uid();
        }
        o = e._pixiId;
      }
      var h = BaseTextureCache[o];
      if (s && a && !h)
        throw new Error('The cacheId "' + o + '" does not exist in BaseTextureCache.');
      return h || (h = new t(e, r), h.cacheId = o, t.addToCache(h, o)), h;
    }, t.fromBuffer = function(e, r, a, s) {
      e = e || new Float32Array(r * a * 4);
      var o = new BufferResource(e, { width: r, height: a }), u = e instanceof Float32Array ? TYPES.FLOAT : TYPES.UNSIGNED_BYTE;
      return new t(o, Object.assign({}, defaultBufferOptions, s || { width: r, height: a, type: u }));
    }, t.addToCache = function(e, r) {
      r && (e.textureCacheIds.indexOf(r) === -1 && e.textureCacheIds.push(r), BaseTextureCache[r] && console.warn("BaseTexture added to the cache with an id [" + r + "] that already had an entry"), BaseTextureCache[r] = e);
    }, t.removeFromCache = function(e) {
      if (typeof e == "string") {
        var r = BaseTextureCache[e];
        if (r) {
          var a = r.textureCacheIds.indexOf(e);
          return a > -1 && r.textureCacheIds.splice(a, 1), delete BaseTextureCache[e], r;
        }
      } else if (e && e.textureCacheIds) {
        for (var s = 0; s < e.textureCacheIds.length; ++s)
          delete BaseTextureCache[e.textureCacheIds[s]];
        return e.textureCacheIds.length = 0, e;
      }
      return null;
    }, t._globalBatch = 0, t;
  }(i)
), AbstractMultiResource = (
  /** @class */
  function(n) {
    __extends$i(t, n);
    function t(e, r) {
      var a = this, s = r || {}, o = s.width, u = s.height;
      a = n.call(this, o, u) || this, a.items = [], a.itemDirtyIds = [];
      for (var h = 0; h < e; h++) {
        var l = new BaseTexture();
        a.items.push(l), a.itemDirtyIds.push(-2);
      }
      return a.length = e, a._load = null, a.baseTexture = null, a;
    }
    return t.prototype.initFromArray = function(e, r) {
      for (var a = 0; a < this.length; a++)
        e[a] && (e[a].castToBaseTexture ? this.addBaseTextureAt(e[a].castToBaseTexture(), a) : e[a] instanceof Resource ? this.addResourceAt(e[a], a) : this.addResourceAt(autoDetectResource(e[a], r), a));
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
      n.prototype.bind.call(this, e);
      for (var r = 0; r < this.length; r++)
        this.items[r].parentTextureArray = e, this.items[r].on("update", e.update, e);
    }, t.prototype.unbind = function(e) {
      n.prototype.unbind.call(this, e);
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
      }), a = r.map(function(s) {
        return s.load();
      });
      return this._load = Promise.all(a).then(function() {
        var s = e.items[0], o = s.realWidth, u = s.realHeight;
        return e.resize(o, u), Promise.resolve(e);
      }), this._load;
    }, t;
  }(Resource)
), ArrayResource = (
  /** @class */
  function(n) {
    __extends$i(t, n);
    function t(e, r) {
      var a = this, s = r || {}, o = s.width, u = s.height, h, l;
      return Array.isArray(e) ? (h = e, l = e.length) : l = e, a = n.call(this, l, { width: o, height: u }) || this, h && a.initFromArray(h, r), a;
    }
    return t.prototype.addBaseTextureAt = function(e, r) {
      if (e.resource)
        this.addResourceAt(e.resource, r);
      else
        throw new Error("ArrayResource does not support RenderTexture");
      return this;
    }, t.prototype.bind = function(e) {
      n.prototype.bind.call(this, e), e.target = TARGETS.TEXTURE_2D_ARRAY;
    }, t.prototype.upload = function(e, r, a) {
      var s = this, o = s.length, u = s.itemDirtyIds, h = s.items, l = e.gl;
      a.dirtyId < 0 && l.texImage3D(l.TEXTURE_2D_ARRAY, 0, a.internalFormat, this._width, this._height, o, 0, r.format, a.type, null);
      for (var c = 0; c < o; c++) {
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
    }, t;
  }(AbstractMultiResource)
), BaseImageResource = (
  /** @class */
  function(n) {
    __extends$i(t, n);
    function t(e) {
      var r = this, a = e, s = a.naturalWidth || a.videoWidth || a.width, o = a.naturalHeight || a.videoHeight || a.height;
      return r = n.call(this, s, o) || this, r.source = e, r.noSubImage = !1, r;
    }
    return t.crossOrigin = function(e, r, a) {
      a === void 0 && r.indexOf("data:") !== 0 ? e.crossOrigin = determineCrossOrigin(r) : a !== !1 && (e.crossOrigin = typeof a == "string" ? a : "anonymous");
    }, t.prototype.upload = function(e, r, a, s) {
      var o = e.gl, u = r.realWidth, h = r.realHeight;
      if (s = s || this.source, s instanceof HTMLImageElement) {
        if (!s.complete || s.naturalWidth === 0)
          return !1;
      } else if (s instanceof HTMLVideoElement && s.readyState <= 1)
        return !1;
      return o.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL, r.alphaMode === ALPHA_MODES.UNPACK), !this.noSubImage && r.target === o.TEXTURE_2D && a.width === u && a.height === h ? o.texSubImage2D(o.TEXTURE_2D, 0, 0, 0, r.format, a.type, s) : (a.width = u, a.height = h, o.texImage2D(r.target, 0, a.internalFormat, r.format, a.type, s)), !0;
    }, t.prototype.update = function() {
      if (!this.destroyed) {
        var e = this.source, r = e.naturalWidth || e.videoWidth || e.width, a = e.naturalHeight || e.videoHeight || e.height;
        this.resize(r, a), n.prototype.update.call(this);
      }
    }, t.prototype.dispose = function() {
      this.source = null;
    }, t;
  }(Resource)
), CanvasResource = (
  /** @class */
  function(n) {
    __extends$i(t, n);
    function t(e) {
      return n.call(this, e) || this;
    }
    return t.test = function(e) {
      var r = globalThis.OffscreenCanvas;
      return r && e instanceof r ? !0 : globalThis.HTMLCanvasElement && e instanceof HTMLCanvasElement;
    }, t;
  }(BaseImageResource)
), CubeResource = (
  /** @class */
  function(n) {
    __extends$i(t, n);
    function t(e, r) {
      var a = this, s = r || {}, o = s.width, u = s.height, h = s.autoLoad, l = s.linkBaseTexture;
      if (e && e.length !== t.SIDES)
        throw new Error("Invalid length. Got " + e.length + ", expected 6");
      a = n.call(this, 6, { width: o, height: u }) || this;
      for (var c = 0; c < t.SIDES; c++)
        a.items[c].target = TARGETS.TEXTURE_CUBE_MAP_POSITIVE_X + c;
      return a.linkBaseTexture = l !== !1, e && a.initFromArray(e, r), h !== !1 && a.load(), a;
    }
    return t.prototype.bind = function(e) {
      n.prototype.bind.call(this, e), e.target = TARGETS.TEXTURE_CUBE_MAP;
    }, t.prototype.addBaseTextureAt = function(e, r, a) {
      if (!this.items[r])
        throw new Error("Index " + r + " is out of bounds");
      if (!this.linkBaseTexture || e.parentTextureArray || Object.keys(e._glTextures).length > 0)
        if (e.resource)
          this.addResourceAt(e.resource, r);
        else
          throw new Error("CubeResource does not support copying of renderTexture.");
      else
        e.target = TARGETS.TEXTURE_CUBE_MAP_POSITIVE_X + r, e.parentTextureArray = this.baseTexture, this.items[r] = e;
      return e.valid && !this.valid && this.resize(e.realWidth, e.realHeight), this.items[r] = e, this;
    }, t.prototype.upload = function(e, r, a) {
      for (var s = this.itemDirtyIds, o = 0; o < t.SIDES; o++) {
        var u = this.items[o];
        (s[o] < u.dirtyId || a.dirtyId < r.dirtyId) && (u.valid && u.resource ? (u.resource.upload(e, u, a), s[o] = u.dirtyId) : s[o] < -1 && (e.gl.texImage2D(u.target, 0, a.internalFormat, r.realWidth, r.realHeight, 0, r.format, a.type, null), s[o] = -1));
      }
      return !0;
    }, t.test = function(e) {
      return Array.isArray(e) && e.length === t.SIDES;
    }, t.SIDES = 6, t;
  }(AbstractMultiResource)
), ImageResource = (
  /** @class */
  function(n) {
    __extends$i(t, n);
    function t(e, r) {
      var a = this;
      if (r = r || {}, !(e instanceof HTMLImageElement)) {
        var s = new Image();
        BaseImageResource.crossOrigin(s, e, r.crossorigin), s.src = e, e = s;
      }
      return a = n.call(this, e) || this, !e.complete && a._width && a._height && (a._width = 0, a._height = 0), a.url = e.src, a._process = null, a.preserveBitmap = !1, a.createBitmap = (r.createBitmap !== void 0 ? r.createBitmap : settings.CREATE_IMAGE_BITMAP) && !!globalThis.createImageBitmap, a.alphaMode = typeof r.alphaMode == "number" ? r.alphaMode : null, a.bitmap = null, a._load = null, r.autoLoad !== !1 && a.load(), a;
    }
    return t.prototype.load = function(e) {
      var r = this;
      return this._load ? this._load : (e !== void 0 && (this.createBitmap = e), this._load = new Promise(function(a, s) {
        var o = r.source;
        r.url = o.src;
        var u = function() {
          r.destroyed || (o.onload = null, o.onerror = null, r.resize(o.width, o.height), r._load = null, r.createBitmap ? a(r.process()) : a(r));
        };
        o.complete && o.src ? u() : (o.onload = u, o.onerror = function(h) {
          s(h), r.onError.emit(h);
        });
      }), this._load);
    }, t.prototype.process = function() {
      var e = this, r = this.source;
      if (this._process !== null)
        return this._process;
      if (this.bitmap !== null || !globalThis.createImageBitmap)
        return Promise.resolve(this);
      var a = globalThis.createImageBitmap, s = !r.crossOrigin || r.crossOrigin === "anonymous";
      return this._process = fetch(r.src, {
        mode: s ? "cors" : "no-cors"
      }).then(function(o) {
        return o.blob();
      }).then(function(o) {
        return a(o, 0, 0, r.width, r.height, {
          premultiplyAlpha: e.alphaMode === null || e.alphaMode === ALPHA_MODES.UNPACK ? "premultiply" : "none"
        });
      }).then(function(o) {
        return e.destroyed ? Promise.reject() : (e.bitmap = o, e.update(), e._process = null, Promise.resolve(e));
      }), this._process;
    }, t.prototype.upload = function(e, r, a) {
      if (typeof this.alphaMode == "number" && (r.alphaMode = this.alphaMode), !this.createBitmap)
        return n.prototype.upload.call(this, e, r, a);
      if (!this.bitmap && (this.process(), !this.bitmap))
        return !1;
      if (n.prototype.upload.call(this, e, r, a, this.bitmap), !this.preserveBitmap) {
        var s = !0, o = r._glTextures;
        for (var u in o) {
          var h = o[u];
          if (h !== a && h.dirtyId !== r.dirtyId) {
            s = !1;
            break;
          }
        }
        s && (this.bitmap.close && this.bitmap.close(), this.bitmap = null);
      }
      return !0;
    }, t.prototype.dispose = function() {
      this.source.onload = null, this.source.onerror = null, n.prototype.dispose.call(this), this.bitmap && (this.bitmap.close(), this.bitmap = null), this._process = null, this._load = null;
    }, t.test = function(e) {
      return typeof e == "string" || e instanceof HTMLImageElement;
    }, t;
  }(BaseImageResource)
), SVGResource = (
  /** @class */
  function(n) {
    __extends$i(t, n);
    function t(e, r) {
      var a = this;
      return r = r || {}, a = n.call(this, settings.ADAPTER.createCanvas()) || this, a._width = 0, a._height = 0, a.svg = e, a.scale = r.scale || 1, a._overrideWidth = r.width, a._overrideHeight = r.height, a._resolve = null, a._crossorigin = r.crossorigin, a._load = null, r.autoLoad !== !1 && a.load(), a;
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
      BaseImageResource.crossOrigin(r, this.svg, this._crossorigin), r.src = this.svg, r.onerror = function(a) {
        e._resolve && (r.onerror = null, e.onError.emit(a));
      }, r.onload = function() {
        if (e._resolve) {
          var a = r.width, s = r.height;
          if (!a || !s)
            throw new Error("The SVG image must have width and height defined (in pixels), canvas API needs them.");
          var o = a * e.scale, u = s * e.scale;
          (e._overrideWidth || e._overrideHeight) && (o = e._overrideWidth || e._overrideHeight / s * a, u = e._overrideHeight || e._overrideWidth / a * s), o = Math.round(o), u = Math.round(u);
          var h = e.source;
          h.width = o, h.height = u, h._pixiId = "canvas_" + uid(), h.getContext("2d").drawImage(r, 0, 0, a, s, 0, 0, o, u), e._resolve(), e._resolve = null;
        }
      };
    }, t.getSize = function(e) {
      var r = t.SVG_SIZE.exec(e), a = {};
      return r && (a[r[1]] = Math.round(parseFloat(r[3])), a[r[5]] = Math.round(parseFloat(r[7]))), a;
    }, t.prototype.dispose = function() {
      n.prototype.dispose.call(this), this._resolve = null, this._crossorigin = null;
    }, t.test = function(e, r) {
      return r === "svg" || typeof e == "string" && e.startsWith("data:image/svg+xml") || typeof e == "string" && t.SVG_XML.test(e);
    }, t.SVG_XML = /^(<\?xml[^?]+\?>)?\s*(<!--[^(-->)]*-->)?\s*\<svg/m, t.SVG_SIZE = /<svg[^>]*(?:\s(width|height)=('|")(\d*(?:\.\d+)?)(?:px)?('|"))[^>]*(?:\s(width|height)=('|")(\d*(?:\.\d+)?)(?:px)?('|"))[^>]*>/i, t;
  }(BaseImageResource)
), VideoResource = (
  /** @class */
  function(n) {
    __extends$i(t, n);
    function t(e, r) {
      var a = this;
      if (r = r || {}, !(e instanceof HTMLVideoElement)) {
        var s = document.createElement("video");
        s.setAttribute("preload", "auto"), s.setAttribute("webkit-playsinline", ""), s.setAttribute("playsinline", ""), typeof e == "string" && (e = [e]);
        var o = e[0].src || e[0];
        BaseImageResource.crossOrigin(s, o, r.crossorigin);
        for (var u = 0; u < e.length; ++u) {
          var h = document.createElement("source"), l = e[u], c = l.src, v = l.mime;
          c = c || e[u];
          var d = c.split("?").shift().toLowerCase(), m = d.slice(d.lastIndexOf(".") + 1);
          v = v || t.MIME_TYPES[m] || "video/" + m, h.src = c, h.type = v, s.appendChild(h);
        }
        e = s;
      }
      return a = n.call(this, e) || this, a.noSubImage = !0, a._autoUpdate = !0, a._isConnectedToTicker = !1, a._updateFPS = r.updateFPS || 0, a._msToNextUpdate = 0, a.autoPlay = r.autoPlay !== !1, a._load = null, a._resolve = null, a._onCanPlay = a._onCanPlay.bind(a), a._onError = a._onError.bind(a), r.autoLoad !== !1 && a.load(), a;
    }
    return t.prototype.update = function(e) {
      if (!this.destroyed) {
        var r = Ticker.shared.elapsedMS * this.source.playbackRate;
        this._msToNextUpdate = Math.floor(this._msToNextUpdate - r), (!this._updateFPS || this._msToNextUpdate <= 0) && (n.prototype.update.call(this), this._msToNextUpdate = this._updateFPS ? Math.floor(1e3 / this._updateFPS) : 0);
      }
    }, t.prototype.load = function() {
      var e = this;
      if (this._load)
        return this._load;
      var r = this.source;
      return (r.readyState === r.HAVE_ENOUGH_DATA || r.readyState === r.HAVE_FUTURE_DATA) && r.width && r.height && (r.complete = !0), r.addEventListener("play", this._onPlayStart.bind(this)), r.addEventListener("pause", this._onPlayStop.bind(this)), this._isSourceReady() ? this._onCanPlay() : (r.addEventListener("canplay", this._onCanPlay), r.addEventListener("canplaythrough", this._onCanPlay), r.addEventListener("error", this._onError, !0)), this._load = new Promise(function(a) {
        e.valid ? a(e) : (e._resolve = a, r.load());
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
      this.valid || this._onCanPlay(), this.autoUpdate && !this._isConnectedToTicker && (Ticker.shared.add(this.update, this), this._isConnectedToTicker = !0);
    }, t.prototype._onPlayStop = function() {
      this._isConnectedToTicker && (Ticker.shared.remove(this.update, this), this._isConnectedToTicker = !1);
    }, t.prototype._onCanPlay = function() {
      var e = this.source;
      e.removeEventListener("canplay", this._onCanPlay), e.removeEventListener("canplaythrough", this._onCanPlay);
      var r = this.valid;
      this.resize(e.videoWidth, e.videoHeight), !r && this._resolve && (this._resolve(this), this._resolve = null), this._isSourcePlaying() ? this._onPlayStart() : this.autoPlay && e.play();
    }, t.prototype.dispose = function() {
      this._isConnectedToTicker && (Ticker.shared.remove(this.update, this), this._isConnectedToTicker = !1);
      var e = this.source;
      e && (e.removeEventListener("error", this._onError, !0), e.pause(), e.src = "", e.load()), n.prototype.dispose.call(this);
    }, Object.defineProperty(t.prototype, "autoUpdate", {
      /** Should the base texture automatically update itself, set to true by default. */
      get: function() {
        return this._autoUpdate;
      },
      set: function(e) {
        e !== this._autoUpdate && (this._autoUpdate = e, !this._autoUpdate && this._isConnectedToTicker ? (Ticker.shared.remove(this.update, this), this._isConnectedToTicker = !1) : this._autoUpdate && !this._isConnectedToTicker && this._isSourcePlaying() && (Ticker.shared.add(this.update, this), this._isConnectedToTicker = !0));
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
  }(BaseImageResource)
), ImageBitmapResource = (
  /** @class */
  function(n) {
    __extends$i(t, n);
    function t(e) {
      return n.call(this, e) || this;
    }
    return t.test = function(e) {
      return !!globalThis.createImageBitmap && typeof ImageBitmap < "u" && e instanceof ImageBitmap;
    }, t;
  }(BaseImageResource)
);
INSTALLED.push(ImageResource, ImageBitmapResource, CanvasResource, VideoResource, SVGResource, BufferResource, CubeResource, ArrayResource);
var DepthResource = (
  /** @class */
  function(n) {
    __extends$i(t, n);
    function t() {
      return n !== null && n.apply(this, arguments) || this;
    }
    return t.prototype.upload = function(e, r, a) {
      var s = e.gl;
      s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL, r.alphaMode === ALPHA_MODES.UNPACK);
      var o = r.realWidth, u = r.realHeight;
      return a.width === o && a.height === u ? s.texSubImage2D(r.target, 0, 0, 0, o, u, r.format, a.type, this.data) : (a.width = o, a.height = u, s.texImage2D(r.target, 0, a.internalFormat, o, u, 0, r.format, a.type, this.data)), !0;
    }, t;
  }(BufferResource)
), Framebuffer = (
  /** @class */
  function() {
    function n(t, e) {
      this.width = Math.round(t || 100), this.height = Math.round(e || 100), this.stencil = !1, this.depth = !1, this.dirtyId = 0, this.dirtyFormat = 0, this.dirtySize = 0, this.depthTexture = null, this.colorTextures = [], this.glFramebuffers = {}, this.disposeRunner = new Runner("disposeFramebuffer"), this.multisample = MSAA_QUALITY.NONE;
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
    }), n.prototype.addColorTexture = function(t, e) {
      return t === void 0 && (t = 0), this.colorTextures[t] = e || new BaseTexture(null, {
        scaleMode: SCALE_MODES.NEAREST,
        resolution: 1,
        mipmap: MIPMAP_MODES.OFF,
        width: this.width,
        height: this.height
      }), this.dirtyId++, this.dirtyFormat++, this;
    }, n.prototype.addDepthTexture = function(t) {
      return this.depthTexture = t || new BaseTexture(new DepthResource(null, { width: this.width, height: this.height }), {
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
    }, n.prototype.resize = function(t, e) {
      if (t = Math.round(t), e = Math.round(e), !(t === this.width && e === this.height)) {
        this.width = t, this.height = e, this.dirtyId++, this.dirtySize++;
        for (var r = 0; r < this.colorTextures.length; r++) {
          var a = this.colorTextures[r], s = a.resolution;
          a.setSize(t / s, e / s);
        }
        if (this.depthTexture) {
          var s = this.depthTexture.resolution;
          this.depthTexture.setSize(t / s, e / s);
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
    __extends$i(t, n);
    function t(e) {
      e === void 0 && (e = {});
      var r = this;
      if (typeof e == "number") {
        var a = arguments[0], s = arguments[1], o = arguments[2], u = arguments[3];
        e = { width: a, height: s, scaleMode: o, resolution: u };
      }
      return e.width = e.width || 100, e.height = e.height || 100, e.multisample = e.multisample !== void 0 ? e.multisample : MSAA_QUALITY.NONE, r = n.call(this, null, e) || this, r.mipmap = MIPMAP_MODES.OFF, r.valid = !0, r.clearColor = [0, 0, 0, 0], r.framebuffer = new Framebuffer(r.realWidth, r.realHeight).addColorTexture(0, r), r.framebuffer.multisample = e.multisample, r.maskStack = [], r.filterStack = [{}], r;
    }
    return t.prototype.resize = function(e, r) {
      this.framebuffer.resize(e * this.resolution, r * this.resolution), this.setRealSize(this.framebuffer.width, this.framebuffer.height);
    }, t.prototype.dispose = function() {
      this.framebuffer.dispose(), n.prototype.dispose.call(this);
    }, t.prototype.destroy = function() {
      n.prototype.destroy.call(this), this.framebuffer.destroyDepthTexture(), this.framebuffer = null;
    }, t;
  }(BaseTexture)
), TextureUvs = (
  /** @class */
  function() {
    function n() {
      this.x0 = 0, this.y0 = 0, this.x1 = 1, this.y1 = 0, this.x2 = 1, this.y2 = 1, this.x3 = 0, this.y3 = 1, this.uvsFloat32 = new Float32Array(8);
    }
    return n.prototype.set = function(t, e, r) {
      var a = e.width, s = e.height;
      if (r) {
        var o = t.width / 2 / a, u = t.height / 2 / s, h = t.x / a + o, l = t.y / s + u;
        r = groupD8.add(r, groupD8.NW), this.x0 = h + o * groupD8.uX(r), this.y0 = l + u * groupD8.uY(r), r = groupD8.add(r, 2), this.x1 = h + o * groupD8.uX(r), this.y1 = l + u * groupD8.uY(r), r = groupD8.add(r, 2), this.x2 = h + o * groupD8.uX(r), this.y2 = l + u * groupD8.uY(r), r = groupD8.add(r, 2), this.x3 = h + o * groupD8.uX(r), this.y3 = l + u * groupD8.uY(r);
      } else
        this.x0 = t.x / a, this.y0 = t.y / s, this.x1 = (t.x + t.width) / a, this.y1 = t.y / s, this.x2 = (t.x + t.width) / a, this.y2 = (t.y + t.height) / s, this.x3 = t.x / a, this.y3 = (t.y + t.height) / s;
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
    __extends$i(t, n);
    function t(e, r, a, s, o, u) {
      var h = n.call(this) || this;
      if (h.noFrame = !1, r || (h.noFrame = !0, r = new Rectangle(0, 0, 1, 1)), e instanceof t && (e = e.baseTexture), h.baseTexture = e, h._frame = r, h.trim = s, h.valid = !1, h._uvs = DEFAULT_UVS, h.uvMatrix = null, h.orig = a || r, h._rotate = Number(o || 0), o === !0)
        h._rotate = 2;
      else if (h._rotate % 2 !== 0)
        throw new Error("attempt to use diamond-shaped UVs. If you are sure, set rotation manually");
      return h.defaultAnchor = u ? new Point(u.x, u.y) : new Point(0, 0), h._updateID = 0, h.textureCacheIds = [], e.valid ? h.noFrame ? e.valid && h.onBaseTextureUpdated(e) : h.frame = r : e.once("loaded", h.onBaseTextureUpdated, h), h.noFrame && e.on("update", h.onBaseTextureUpdated, h), h;
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
          r && r.url && TextureCache[r.url] && t.removeFromCache(r.url), this.baseTexture.destroy();
        }
        this.baseTexture.off("loaded", this.onBaseTextureUpdated, this), this.baseTexture.off("update", this.onBaseTextureUpdated, this), this.baseTexture = null;
      }
      this._frame = null, this._uvs = null, this.trim = null, this.orig = null, this.valid = !1, t.removeFromCache(this), this.textureCacheIds = null;
    }, t.prototype.clone = function() {
      var e = this._frame.clone(), r = this._frame === this.orig ? e : this.orig.clone(), a = new t(this.baseTexture, !this.noFrame && e, r, this.trim && this.trim.clone(), this.rotate, this.defaultAnchor);
      return this.noFrame && (a._frame = e), a;
    }, t.prototype.updateUvs = function() {
      this._uvs === DEFAULT_UVS && (this._uvs = new TextureUvs()), this._uvs.set(this._frame, this.baseTexture, this.rotate), this._updateID++;
    }, t.from = function(e, r, a) {
      r === void 0 && (r = {}), a === void 0 && (a = settings.STRICT_TEXTURE_CACHE);
      var s = typeof e == "string", o = null;
      if (s)
        o = e;
      else if (e instanceof BaseTexture) {
        if (!e.cacheId) {
          var u = r && r.pixiIdPrefix || "pixiid";
          e.cacheId = u + "-" + uid(), BaseTexture.addToCache(e, e.cacheId);
        }
        o = e.cacheId;
      } else {
        if (!e._pixiId) {
          var u = r && r.pixiIdPrefix || "pixiid";
          e._pixiId = u + "_" + uid();
        }
        o = e._pixiId;
      }
      var h = TextureCache[o];
      if (s && a && !h)
        throw new Error('The cacheId "' + o + '" does not exist in TextureCache.');
      return !h && !(e instanceof BaseTexture) ? (r.resolution || (r.resolution = getResolutionOfUrl(e)), h = new t(new BaseTexture(e, r)), h.baseTexture.cacheId = o, BaseTexture.addToCache(h.baseTexture, o), t.addToCache(h, o)) : !h && e instanceof BaseTexture && (h = new t(e), t.addToCache(h, o)), h;
    }, t.fromURL = function(e, r) {
      var a = Object.assign({ autoLoad: !1 }, r?.resourceOptions), s = t.from(e, Object.assign({ resourceOptions: a }, r), !1), o = s.baseTexture.resource;
      return s.baseTexture.valid ? Promise.resolve(s) : o.load().then(function() {
        return Promise.resolve(s);
      });
    }, t.fromBuffer = function(e, r, a, s) {
      return new t(BaseTexture.fromBuffer(e, r, a, s));
    }, t.fromLoader = function(e, r, a, s) {
      var o = new BaseTexture(e, Object.assign({
        scaleMode: settings.SCALE_MODE,
        resolution: getResolutionOfUrl(r)
      }, s)), u = o.resource;
      u instanceof ImageResource && (u.url = r);
      var h = new t(o);
      return a || (a = r), BaseTexture.addToCache(h.baseTexture, a), t.addToCache(h, a), a !== r && (BaseTexture.addToCache(h.baseTexture, r), t.addToCache(h, r)), h.baseTexture.valid ? Promise.resolve(h) : new Promise(function(l) {
        h.baseTexture.once("loaded", function() {
          return l(h);
        });
      });
    }, t.addToCache = function(e, r) {
      r && (e.textureCacheIds.indexOf(r) === -1 && e.textureCacheIds.push(r), TextureCache[r] && console.warn("Texture added to the cache with an id [" + r + "] that already had an entry"), TextureCache[r] = e);
    }, t.removeFromCache = function(e) {
      if (typeof e == "string") {
        var r = TextureCache[e];
        if (r) {
          var a = r.textureCacheIds.indexOf(e);
          return a > -1 && r.textureCacheIds.splice(a, 1), delete TextureCache[e], r;
        }
      } else if (e && e.textureCacheIds) {
        for (var s = 0; s < e.textureCacheIds.length; ++s)
          TextureCache[e.textureCacheIds[s]] === e && delete TextureCache[e.textureCacheIds[s]];
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
        var r = e.x, a = e.y, s = e.width, o = e.height, u = r + s > this.baseTexture.width, h = a + o > this.baseTexture.height;
        if (u || h) {
          var l = u && h ? "and" : "or", c = "X: " + r + " + " + s + " = " + (r + s) + " > " + this.baseTexture.width, v = "Y: " + a + " + " + o + " = " + (a + o) + " > " + this.baseTexture.height;
          throw new Error("Texture Error: frame does not fit inside the base Texture dimensions: " + (c + " " + l + " " + v));
        }
        this.valid = s && o && this.baseTexture.valid, !this.trim && !this.rotate && (this.orig = e), this.valid && this.updateUvs();
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
        return t._EMPTY || (t._EMPTY = new t(new BaseTexture()), removeAllHandlers(t._EMPTY), removeAllHandlers(t._EMPTY.baseTexture)), t._EMPTY;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t, "WHITE", {
      /** A white texture of 16x16 size, used for graphics and other things Can not be destroyed. */
      get: function() {
        if (!t._WHITE) {
          var e = settings.ADAPTER.createCanvas(16, 16), r = e.getContext("2d");
          e.width = 16, e.height = 16, r.fillStyle = "white", r.fillRect(0, 0, 16, 16), t._WHITE = new t(BaseTexture.from(e)), removeAllHandlers(t._WHITE), removeAllHandlers(t._WHITE.baseTexture);
        }
        return t._WHITE;
      },
      enumerable: !1,
      configurable: !0
    }), t;
  }(i)
), RenderTexture = (
  /** @class */
  function(n) {
    __extends$i(t, n);
    function t(e, r) {
      var a = n.call(this, e, r) || this;
      return a.valid = !0, a.filterFrame = null, a.filterPoolKey = null, a.updateUvs(), a;
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
    }), t.prototype.resize = function(e, r, a) {
      a === void 0 && (a = !0);
      var s = this.baseTexture.resolution, o = Math.round(e * s) / s, u = Math.round(r * s) / s;
      this.valid = o > 0 && u > 0, this._frame.width = this.orig.width = o, this._frame.height = this.orig.height = u, a && this.baseTexture.resize(o, u), this.updateUvs();
    }, t.prototype.setResolution = function(e) {
      var r = this.baseTexture;
      r.resolution !== e && (r.setResolution(e), this.resize(r.width, r.height, !1));
    }, t.create = function(e) {
      for (var r = arguments, a = [], s = 1; s < arguments.length; s++)
        a[s - 1] = r[s];
      return typeof e == "number" && (deprecation("6.0.0", "Arguments (width, height, scaleMode, resolution) have been deprecated."), e = {
        width: e,
        height: a[0],
        scaleMode: a[1],
        resolution: a[2]
      }), new t(new BaseRenderTexture(e));
    }, t;
  }(Texture)
), RenderTexturePool = (
  /** @class */
  function() {
    function n(t) {
      this.texturePool = {}, this.textureOptions = t || {}, this.enableFullScreen = !1, this._pixelsWidth = 0, this._pixelsHeight = 0;
    }
    return n.prototype.createTexture = function(t, e, r) {
      r === void 0 && (r = MSAA_QUALITY.NONE);
      var a = new BaseRenderTexture(Object.assign({
        width: t,
        height: e,
        resolution: 1,
        multisample: r
      }, this.textureOptions));
      return new RenderTexture(a);
    }, n.prototype.getOptimalTexture = function(t, e, r, a) {
      r === void 0 && (r = 1), a === void 0 && (a = MSAA_QUALITY.NONE);
      var s;
      t = Math.ceil(t * r - 1e-6), e = Math.ceil(e * r - 1e-6), !this.enableFullScreen || t !== this._pixelsWidth || e !== this._pixelsHeight ? (t = nextPow2(t), e = nextPow2(e), s = ((t & 65535) << 16 | e & 65535) >>> 0, a > 1 && (s += a * 4294967296)) : s = a > 1 ? -a : -1, this.texturePool[s] || (this.texturePool[s] = []);
      var o = this.texturePool[s].pop();
      return o || (o = this.createTexture(t, e, a)), o.filterPoolKey = s, o.setResolution(r), o;
    }, n.prototype.getFilterTexture = function(t, e, r) {
      var a = this.getOptimalTexture(t.width, t.height, e || t.resolution, r || MSAA_QUALITY.NONE);
      return a.filterFrame = t.filterFrame, a;
    }, n.prototype.returnTexture = function(t) {
      var e = t.filterPoolKey;
      t.filterFrame = null, this.texturePool[e].push(t);
    }, n.prototype.returnFilterTexture = function(t) {
      this.returnTexture(t);
    }, n.prototype.clear = function(t) {
      if (t = t !== !1, t)
        for (var e in this.texturePool) {
          var r = this.texturePool[e];
          if (r)
            for (var a = 0; a < r.length; a++)
              r[a].destroy(!0);
        }
      this.texturePool = {};
    }, n.prototype.setScreenSize = function(t) {
      if (!(t.width === this._pixelsWidth && t.height === this._pixelsHeight)) {
        this.enableFullScreen = t.width > 0 && t.height > 0;
        for (var e in this.texturePool)
          if (Number(e) < 0) {
            var r = this.texturePool[e];
            if (r)
              for (var a = 0; a < r.length; a++)
                r[a].destroy(!0);
            this.texturePool[e] = [];
          }
        this._pixelsWidth = t.width, this._pixelsHeight = t.height;
      }
    }, n.SCREEN_KEY = -1, n;
  }()
), Attribute = (
  /** @class */
  function() {
    function n(t, e, r, a, s, o, u) {
      e === void 0 && (e = 0), r === void 0 && (r = !1), a === void 0 && (a = TYPES.FLOAT), this.buffer = t, this.size = e, this.normalized = r, this.type = a, this.stride = s, this.start = o, this.instance = u;
    }
    return n.prototype.destroy = function() {
      this.buffer = null;
    }, n.from = function(t, e, r, a, s) {
      return new n(t, e, r, a, s);
    }, n;
  }()
), UID$4 = 0, Buffer = (
  /** @class */
  function() {
    function n(t, e, r) {
      e === void 0 && (e = !0), r === void 0 && (r = !1), this.data = t || new Float32Array(1), this._glBuffers = {}, this._updateID = 0, this.index = r, this.static = e, this.id = UID$4++, this.disposeRunner = new Runner("disposeBuffer");
    }
    return n.prototype.update = function(t) {
      t instanceof Array && (t = new Float32Array(t)), this.data = t || this.data, this._updateID++;
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
      set: function(t) {
        this.type = t ? BUFFER_TYPE.ELEMENT_ARRAY_BUFFER : BUFFER_TYPE.ARRAY_BUFFER;
      },
      enumerable: !1,
      configurable: !0
    }), n.from = function(t) {
      return t instanceof Array && (t = new Float32Array(t)), new n(t);
    }, n;
  }()
), map$1 = {
  Float32Array,
  Uint32Array,
  Int32Array,
  Uint8Array
};
function interleaveTypedArrays(n, t) {
  for (var e = 0, r = 0, a = {}, s = 0; s < n.length; s++)
    r += t[s], e += n[s].length;
  for (var o = new ArrayBuffer(e * 4), u = null, h = 0, s = 0; s < n.length; s++) {
    var l = t[s], c = n[s], v = getBufferType(c);
    a[v] || (a[v] = new map$1[v](o)), u = a[v];
    for (var d = 0; d < c.length; d++) {
      var m = (d / l | 0) * r + h, g = d % l;
      u[m + g] = c[d];
    }
    h += l;
  }
  return new Float32Array(o);
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
    function n(t, e) {
      t === void 0 && (t = []), e === void 0 && (e = {}), this.buffers = t, this.indexBuffer = null, this.attributes = e, this.glVertexArrayObjects = {}, this.id = UID$3++, this.instanced = !1, this.instanceCount = 1, this.disposeRunner = new Runner("disposeGeometry"), this.refCount = 0;
    }
    return n.prototype.addAttribute = function(t, e, r, a, s, o, u, h) {
      if (r === void 0 && (r = 0), a === void 0 && (a = !1), h === void 0 && (h = !1), !e)
        throw new Error("You must pass a buffer when creating an attribute");
      e instanceof Buffer || (e instanceof Array && (e = new Float32Array(e)), e = new Buffer(e));
      var l = t.split("|");
      if (l.length > 1) {
        for (var c = 0; c < l.length; c++)
          this.addAttribute(l[c], e, r, a, s);
        return this;
      }
      var v = this.buffers.indexOf(e);
      return v === -1 && (this.buffers.push(e), v = this.buffers.length - 1), this.attributes[t] = new Attribute(v, r, a, s, o, u, h), this.instanced = this.instanced || h, this;
    }, n.prototype.getAttribute = function(t) {
      return this.attributes[t];
    }, n.prototype.getBuffer = function(t) {
      return this.buffers[this.getAttribute(t).buffer];
    }, n.prototype.addIndex = function(t) {
      return t instanceof Buffer || (t instanceof Array && (t = new Uint16Array(t)), t = new Buffer(t)), t.type = BUFFER_TYPE.ELEMENT_ARRAY_BUFFER, this.indexBuffer = t, this.buffers.indexOf(t) === -1 && this.buffers.push(t), this;
    }, n.prototype.getIndex = function() {
      return this.indexBuffer;
    }, n.prototype.interleave = function() {
      if (this.buffers.length === 1 || this.buffers.length === 2 && this.indexBuffer)
        return this;
      var t = [], e = [], r = new Buffer(), a;
      for (a in this.attributes) {
        var s = this.attributes[a], o = this.buffers[s.buffer];
        t.push(o.data), e.push(s.size * byteSizeMap$1[s.type] / 4), s.buffer = 0;
      }
      for (r.data = interleaveTypedArrays(t, e), a = 0; a < this.buffers.length; a++)
        this.buffers[a] !== this.indexBuffer && this.buffers[a].destroy();
      return this.buffers = [r], this.indexBuffer && this.buffers.push(this.indexBuffer), this;
    }, n.prototype.getSize = function() {
      for (var t in this.attributes) {
        var e = this.attributes[t], r = this.buffers[e.buffer];
        return r.data.length / (e.stride / 4 || e.size);
      }
      return 0;
    }, n.prototype.dispose = function() {
      this.disposeRunner.emit(this, !1);
    }, n.prototype.destroy = function() {
      this.dispose(), this.buffers = null, this.indexBuffer = null, this.attributes = null;
    }, n.prototype.clone = function() {
      for (var t = new n(), e = 0; e < this.buffers.length; e++)
        t.buffers[e] = new Buffer(this.buffers[e].data.slice(0));
      for (var e in this.attributes) {
        var r = this.attributes[e];
        t.attributes[e] = new Attribute(r.buffer, r.size, r.normalized, r.type, r.stride, r.start, r.instance);
      }
      return this.indexBuffer && (t.indexBuffer = t.buffers[this.buffers.indexOf(this.indexBuffer)], t.indexBuffer.type = BUFFER_TYPE.ELEMENT_ARRAY_BUFFER), t;
    }, n.merge = function(t) {
      for (var e = new n(), r = [], a = [], s = [], o, u = 0; u < t.length; u++) {
        o = t[u];
        for (var h = 0; h < o.buffers.length; h++)
          a[h] = a[h] || 0, a[h] += o.buffers[h].data.length, s[h] = 0;
      }
      for (var u = 0; u < o.buffers.length; u++)
        r[u] = new map[getBufferType(o.buffers[u].data)](a[u]), e.buffers[u] = new Buffer(r[u]);
      for (var u = 0; u < t.length; u++) {
        o = t[u];
        for (var h = 0; h < o.buffers.length; h++)
          r[h].set(o.buffers[h].data, s[h]), s[h] += o.buffers[h].data.length;
      }
      if (e.attributes = o.attributes, o.indexBuffer) {
        e.indexBuffer = e.buffers[o.buffers.indexOf(o.indexBuffer)], e.indexBuffer.type = BUFFER_TYPE.ELEMENT_ARRAY_BUFFER;
        for (var l = 0, c = 0, v = 0, d = 0, u = 0; u < o.buffers.length; u++)
          if (o.buffers[u] !== o.indexBuffer) {
            d = u;
            break;
          }
        for (var u in o.attributes) {
          var m = o.attributes[u];
          (m.buffer | 0) === d && (c += m.size * byteSizeMap$1[m.type] / 4);
        }
        for (var u = 0; u < t.length; u++) {
          for (var g = t[u].indexBuffer.data, h = 0; h < g.length; h++)
            e.indexBuffer.data[h + v] += l;
          l += t[u].buffers[d].data.length / c, v += g.length;
        }
      }
      return e;
    }, n;
  }()
), Quad = (
  /** @class */
  function(n) {
    __extends$i(t, n);
    function t() {
      var e = n.call(this) || this;
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
  }(Geometry)
), QuadUv = (
  /** @class */
  function(n) {
    __extends$i(t, n);
    function t() {
      var e = n.call(this) || this;
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
      ]), e.vertexBuffer = new Buffer(e.vertices), e.uvBuffer = new Buffer(e.uvs), e.addAttribute("aVertexPosition", e.vertexBuffer).addAttribute("aTextureCoord", e.uvBuffer).addIndex([0, 1, 2, 0, 2, 3]), e;
    }
    return t.prototype.map = function(e, r) {
      var a = 0, s = 0;
      return this.uvs[0] = a, this.uvs[1] = s, this.uvs[2] = a + r.width / e.width, this.uvs[3] = s, this.uvs[4] = a + r.width / e.width, this.uvs[5] = s + r.height / e.height, this.uvs[6] = a, this.uvs[7] = s + r.height / e.height, a = r.x, s = r.y, this.vertices[0] = a, this.vertices[1] = s, this.vertices[2] = a + r.width, this.vertices[3] = s, this.vertices[4] = a + r.width, this.vertices[5] = s + r.height, this.vertices[6] = a, this.vertices[7] = s + r.height, this.invalidate(), this;
    }, t.prototype.invalidate = function() {
      return this.vertexBuffer._updateID++, this.uvBuffer._updateID++, this;
    }, t;
  }(Geometry)
), UID$2 = 0, UniformGroup = (
  /** @class */
  function() {
    function n(t, e, r) {
      this.group = !0, this.syncUniforms = {}, this.dirtyId = 0, this.id = UID$2++, this.static = !!e, this.ubo = !!r, t instanceof Buffer ? (this.buffer = t, this.buffer.type = BUFFER_TYPE.UNIFORM_BUFFER, this.autoManage = !1, this.ubo = !0) : (this.uniforms = t, this.ubo && (this.buffer = new Buffer(new Float32Array(1)), this.buffer.type = BUFFER_TYPE.UNIFORM_BUFFER, this.autoManage = !0));
    }
    return n.prototype.update = function() {
      this.dirtyId++, !this.autoManage && this.buffer && this.buffer.update();
    }, n.prototype.add = function(t, e, r) {
      if (!this.ubo)
        this.uniforms[t] = new n(e, r);
      else
        throw new Error("[UniformGroup] uniform groups in ubo mode cannot be modified, or have uniform groups nested in them");
    }, n.from = function(t, e, r) {
      return new n(t, e, r);
    }, n.uboFrom = function(t, e) {
      return new n(t, e ?? !0, !0);
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
    function n(t) {
      this.renderer = t, this.defaultFilterStack = [{}], this.texturePool = new RenderTexturePool(), this.texturePool.setScreenSize(t.view), this.statePool = [], this.quad = new Quad(), this.quadUv = new QuadUv(), this.tempRect = new Rectangle(), this.activeState = {}, this.globalUniforms = new UniformGroup({
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
    return n.prototype.push = function(t, e) {
      for (var r, a, s = this.renderer, o = this.defaultFilterStack, u = this.statePool.pop() || new FilterState(), h = this.renderer.renderTexture, l = e[0].resolution, c = e[0].multisample, v = e[0].padding, d = e[0].autoFit, m = (r = e[0].legacy) !== null && r !== void 0 ? r : !0, g = 1; g < e.length; g++) {
        var y = e[g];
        l = Math.min(l, y.resolution), c = Math.min(c, y.multisample), v = this.useMaxPadding ? Math.max(v, y.padding) : v + y.padding, d = d && y.autoFit, m = m || ((a = y.legacy) !== null && a !== void 0 ? a : !0);
      }
      o.length === 1 && (this.defaultFilterStack[0].renderTexture = h.current), o.push(u), u.resolution = l, u.multisample = c, u.legacy = m, u.target = t, u.sourceFrame.copyFrom(t.filterArea || t.getBounds(!0)), u.sourceFrame.pad(v);
      var _ = this.tempRect.copyFrom(h.sourceFrame);
      s.projection.transform && this.transformAABB(tempMatrix$2.copyFrom(s.projection.transform).invert(), _), d ? (u.sourceFrame.fit(_), (u.sourceFrame.width <= 0 || u.sourceFrame.height <= 0) && (u.sourceFrame.width = 0, u.sourceFrame.height = 0)) : u.sourceFrame.intersects(_) || (u.sourceFrame.width = 0, u.sourceFrame.height = 0), this.roundFrame(u.sourceFrame, h.current ? h.current.resolution : s.resolution, h.sourceFrame, h.destinationFrame, s.projection.transform), u.renderTexture = this.getOptimalFilterTexture(u.sourceFrame.width, u.sourceFrame.height, l, c), u.filters = e, u.destinationFrame.width = u.renderTexture.width, u.destinationFrame.height = u.renderTexture.height;
      var b = this.tempRect;
      b.x = 0, b.y = 0, b.width = u.sourceFrame.width, b.height = u.sourceFrame.height, u.renderTexture.filterFrame = u.sourceFrame, u.bindingSourceFrame.copyFrom(h.sourceFrame), u.bindingDestinationFrame.copyFrom(h.destinationFrame), u.transform = s.projection.transform, s.projection.transform = null, h.bind(u.renderTexture, u.sourceFrame, b), s.framebuffer.clear(0, 0, 0, 0);
    }, n.prototype.pop = function() {
      var t = this.defaultFilterStack, e = t.pop(), r = e.filters;
      this.activeState = e;
      var a = this.globalUniforms.uniforms;
      a.outputFrame = e.sourceFrame, a.resolution = e.resolution;
      var s = a.inputSize, o = a.inputPixel, u = a.inputClamp;
      if (s[0] = e.destinationFrame.width, s[1] = e.destinationFrame.height, s[2] = 1 / s[0], s[3] = 1 / s[1], o[0] = Math.round(s[0] * e.resolution), o[1] = Math.round(s[1] * e.resolution), o[2] = 1 / o[0], o[3] = 1 / o[1], u[0] = 0.5 * o[2], u[1] = 0.5 * o[3], u[2] = e.sourceFrame.width * s[2] - 0.5 * o[2], u[3] = e.sourceFrame.height * s[3] - 0.5 * o[3], e.legacy) {
        var h = a.filterArea;
        h[0] = e.destinationFrame.width, h[1] = e.destinationFrame.height, h[2] = e.sourceFrame.x, h[3] = e.sourceFrame.y, a.filterClamp = a.inputClamp;
      }
      this.globalUniforms.update();
      var l = t[t.length - 1];
      if (this.renderer.framebuffer.blit(), r.length === 1)
        r[0].apply(this, e.renderTexture, l.renderTexture, CLEAR_MODES.BLEND, e), this.returnFilterTexture(e.renderTexture);
      else {
        var c = e.renderTexture, v = this.getOptimalFilterTexture(c.width, c.height, e.resolution);
        v.filterFrame = c.filterFrame;
        var d = 0;
        for (d = 0; d < r.length - 1; ++d) {
          d === 1 && e.multisample > 1 && (v = this.getOptimalFilterTexture(c.width, c.height, e.resolution), v.filterFrame = c.filterFrame), r[d].apply(this, c, v, CLEAR_MODES.CLEAR, e);
          var m = c;
          c = v, v = m;
        }
        r[d].apply(this, c, l.renderTexture, CLEAR_MODES.BLEND, e), d > 1 && e.multisample > 1 && this.returnFilterTexture(e.renderTexture), this.returnFilterTexture(c), this.returnFilterTexture(v);
      }
      e.clear(), this.statePool.push(e);
    }, n.prototype.bindAndClear = function(t, e) {
      e === void 0 && (e = CLEAR_MODES.CLEAR);
      var r = this.renderer, a = r.renderTexture, s = r.state;
      if (t === this.defaultFilterStack[this.defaultFilterStack.length - 1].renderTexture ? this.renderer.projection.transform = this.activeState.transform : this.renderer.projection.transform = null, t && t.filterFrame) {
        var o = this.tempRect;
        o.x = 0, o.y = 0, o.width = t.filterFrame.width, o.height = t.filterFrame.height, a.bind(t, t.filterFrame, o);
      } else t !== this.defaultFilterStack[this.defaultFilterStack.length - 1].renderTexture ? a.bind(t) : this.renderer.renderTexture.bind(t, this.activeState.bindingSourceFrame, this.activeState.bindingDestinationFrame);
      var u = s.stateId & 1 || this.forceClear;
      (e === CLEAR_MODES.CLEAR || e === CLEAR_MODES.BLIT && u) && this.renderer.framebuffer.clear(0, 0, 0, 0);
    }, n.prototype.applyFilter = function(t, e, r, a) {
      var s = this.renderer;
      s.state.set(t.state), this.bindAndClear(r, a), t.uniforms.uSampler = e, t.uniforms.filterGlobals = this.globalUniforms, s.shader.bind(t), t.legacy = !!t.program.attributeData.aTextureCoord, t.legacy ? (this.quadUv.map(e._frame, e.filterFrame), s.geometry.bind(this.quadUv), s.geometry.draw(DRAW_MODES.TRIANGLES)) : (s.geometry.bind(this.quad), s.geometry.draw(DRAW_MODES.TRIANGLE_STRIP));
    }, n.prototype.calculateSpriteMatrix = function(t, e) {
      var r = this.activeState, a = r.sourceFrame, s = r.destinationFrame, o = e._texture.orig, u = t.set(s.width, 0, 0, s.height, a.x, a.y), h = e.worldTransform.copyTo(Matrix.TEMP_MATRIX);
      return h.invert(), u.prepend(h), u.scale(1 / o.width, 1 / o.height), u.translate(e.anchor.x, e.anchor.y), u;
    }, n.prototype.destroy = function() {
      this.renderer = null, this.texturePool.clear(!1);
    }, n.prototype.getOptimalFilterTexture = function(t, e, r, a) {
      return r === void 0 && (r = 1), a === void 0 && (a = MSAA_QUALITY.NONE), this.texturePool.getOptimalTexture(t, e, r, a);
    }, n.prototype.getFilterTexture = function(t, e, r) {
      if (typeof t == "number") {
        var a = t;
        t = e, e = a;
      }
      t = t || this.activeState.renderTexture;
      var s = this.texturePool.getOptimalTexture(t.width, t.height, e || t.resolution, r || MSAA_QUALITY.NONE);
      return s.filterFrame = t.filterFrame, s;
    }, n.prototype.returnFilterTexture = function(t) {
      this.texturePool.returnTexture(t);
    }, n.prototype.emptyPool = function() {
      this.texturePool.clear(!0);
    }, n.prototype.resize = function() {
      this.texturePool.setScreenSize(this.renderer.view);
    }, n.prototype.transformAABB = function(t, e) {
      var r = tempPoints[0], a = tempPoints[1], s = tempPoints[2], o = tempPoints[3];
      r.set(e.left, e.top), a.set(e.left, e.bottom), s.set(e.right, e.top), o.set(e.right, e.bottom), t.apply(r, r), t.apply(a, a), t.apply(s, s), t.apply(o, o);
      var u = Math.min(r.x, a.x, s.x, o.x), h = Math.min(r.y, a.y, s.y, o.y), l = Math.max(r.x, a.x, s.x, o.x), c = Math.max(r.y, a.y, s.y, o.y);
      e.x = u, e.y = h, e.width = l - u, e.height = c - h;
    }, n.prototype.roundFrame = function(t, e, r, a, s) {
      if (!(t.width <= 0 || t.height <= 0 || r.width <= 0 || r.height <= 0)) {
        if (s) {
          var o = s.a, u = s.b, h = s.c, l = s.d;
          if ((Math.abs(u) > 1e-4 || Math.abs(h) > 1e-4) && (Math.abs(o) > 1e-4 || Math.abs(l) > 1e-4))
            return;
        }
        s = s ? tempMatrix$2.copyFrom(s) : tempMatrix$2.identity(), s.translate(-r.x, -r.y).scale(a.width / r.width, a.height / r.height).translate(a.x, a.y), this.transformAABB(s, t), t.ceil(e), this.transformAABB(s.invert(), t);
      }
    }, n;
  }()
), ObjectRenderer = (
  /** @class */
  function() {
    function n(t) {
      this.renderer = t;
    }
    return n.prototype.flush = function() {
    }, n.prototype.destroy = function() {
      this.renderer = null;
    }, n.prototype.start = function() {
    }, n.prototype.stop = function() {
      this.flush();
    }, n.prototype.render = function(t) {
    }, n;
  }()
), BatchSystem = (
  /** @class */
  function() {
    function n(t) {
      this.renderer = t, this.emptyRenderer = new ObjectRenderer(t), this.currentRenderer = this.emptyRenderer;
    }
    return n.prototype.setObjectRenderer = function(t) {
      this.currentRenderer !== t && (this.currentRenderer.stop(), this.currentRenderer = t, this.currentRenderer.start());
    }, n.prototype.flush = function() {
      this.setObjectRenderer(this.emptyRenderer);
    }, n.prototype.reset = function() {
      this.setObjectRenderer(this.emptyRenderer);
    }, n.prototype.copyBoundTextures = function(t, e) {
      for (var r = this.renderer.texture.boundTextures, a = e - 1; a >= 0; --a)
        t[a] = r[a] || null, t[a] && (t[a]._batchLocation = a);
    }, n.prototype.boundArray = function(t, e, r, a) {
      for (var s = t.elements, o = t.ids, u = t.count, h = 0, l = 0; l < u; l++) {
        var c = s[l], v = c._batchLocation;
        if (v >= 0 && v < a && e[v] === c) {
          o[l] = v;
          continue;
        }
        for (; h < a; ) {
          var d = e[h];
          if (d && d._batchEnabled === r && d._batchLocation === h) {
            h++;
            continue;
          }
          o[l] = h, c._batchLocation = h, e[h] = c;
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
    function n(t) {
      this.renderer = t, this.webGLVersion = 1, this.extensions = {}, this.supports = {
        uint32Indices: !1
      }, this.handleContextLost = this.handleContextLost.bind(this), this.handleContextRestored = this.handleContextRestored.bind(this), t.view.addEventListener("webglcontextlost", this.handleContextLost, !1), t.view.addEventListener("webglcontextrestored", this.handleContextRestored, !1);
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
    }), n.prototype.contextChange = function(t) {
      this.gl = t, this.renderer.gl = t, this.renderer.CONTEXT_UID = CONTEXT_UID_COUNTER++;
    }, n.prototype.initFromContext = function(t) {
      this.gl = t, this.validateContext(t), this.renderer.gl = t, this.renderer.CONTEXT_UID = CONTEXT_UID_COUNTER++, this.renderer.runners.contextChange.emit(t);
    }, n.prototype.initFromOptions = function(t) {
      var e = this.createContext(this.renderer.view, t);
      this.initFromContext(e);
    }, n.prototype.createContext = function(t, e) {
      var r;
      if (settings.PREFER_ENV >= ENV.WEBGL2 && (r = t.getContext("webgl2", e)), r)
        this.webGLVersion = 2;
      else if (this.webGLVersion = 1, r = t.getContext("webgl", e) || t.getContext("experimental-webgl", e), !r)
        throw new Error("This browser does not support WebGL. Try using the canvas renderer");
      return this.gl = r, this.getExtensions(), this.gl;
    }, n.prototype.getExtensions = function() {
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
    }, n.prototype.handleContextLost = function(t) {
      var e = this;
      t.preventDefault(), setTimeout(function() {
        e.gl.isContextLost() && e.extensions.loseContext && e.extensions.loseContext.restoreContext();
      }, 0);
    }, n.prototype.handleContextRestored = function() {
      this.renderer.runners.contextChange.emit(this.gl);
    }, n.prototype.destroy = function() {
      var t = this.renderer.view;
      this.renderer = null, t.removeEventListener("webglcontextlost", this.handleContextLost), t.removeEventListener("webglcontextrestored", this.handleContextRestored), this.gl.useProgram(null), this.extensions.loseContext && this.extensions.loseContext.loseContext();
    }, n.prototype.postrender = function() {
      this.renderer.renderingToScreen && this.gl.flush();
    }, n.prototype.validateContext = function(t) {
      var e = t.getContextAttributes(), r = "WebGL2RenderingContext" in globalThis && t instanceof globalThis.WebGL2RenderingContext;
      r && (this.webGLVersion = 2), e && !e.stencil && console.warn("Provided WebGL context does not have a stencil buffer, masks may not render correctly");
      var a = r || !!t.getExtension("OES_element_index_uint");
      this.supports.uint32Indices = a, a || console.warn("Provided WebGL context does not support 32 index buffer, complex graphics may not render correctly");
    }, n;
  }()
), GLFramebuffer = (
  /** @class */
  /* @__PURE__ */ function() {
    function n(t) {
      this.framebuffer = t, this.stencil = null, this.dirtyId = -1, this.dirtyFormat = -1, this.dirtySize = -1, this.multisample = MSAA_QUALITY.NONE, this.msaaBuffer = null, this.blitFramebuffer = null, this.mipLevel = 0;
    }
    return n;
  }()
), tempRectangle = new Rectangle(), FramebufferSystem = (
  /** @class */
  function() {
    function n(t) {
      this.renderer = t, this.managedFramebuffers = [], this.unknownFramebuffer = new Framebuffer(10, 10), this.msaaSamples = null;
    }
    return n.prototype.contextChange = function() {
      this.disposeAll(!0);
      var t = this.gl = this.renderer.gl;
      if (this.CONTEXT_UID = this.renderer.CONTEXT_UID, this.current = this.unknownFramebuffer, this.viewport = new Rectangle(), this.hasMRT = !0, this.writeDepthTexture = !0, this.renderer.context.webGLVersion === 1) {
        var e = this.renderer.context.extensions.drawBuffers, r = this.renderer.context.extensions.depthTexture;
        settings.PREFER_ENV === ENV.WEBGL_LEGACY && (e = null, r = null), e ? t.drawBuffers = function(a) {
          return e.drawBuffersWEBGL(a);
        } : (this.hasMRT = !1, t.drawBuffers = function() {
        }), r || (this.writeDepthTexture = !1);
      } else
        this.msaaSamples = t.getInternalformatParameter(t.RENDERBUFFER, t.RGBA8, t.SAMPLES);
    }, n.prototype.bind = function(t, e, r) {
      r === void 0 && (r = 0);
      var a = this.gl;
      if (t) {
        var s = t.glFramebuffers[this.CONTEXT_UID] || this.initFramebuffer(t);
        this.current !== t && (this.current = t, a.bindFramebuffer(a.FRAMEBUFFER, s.framebuffer)), s.mipLevel !== r && (t.dirtyId++, t.dirtyFormat++, s.mipLevel = r), s.dirtyId !== t.dirtyId && (s.dirtyId = t.dirtyId, s.dirtyFormat !== t.dirtyFormat ? (s.dirtyFormat = t.dirtyFormat, s.dirtySize = t.dirtySize, this.updateFramebuffer(t, r)) : s.dirtySize !== t.dirtySize && (s.dirtySize = t.dirtySize, this.resizeFramebuffer(t)));
        for (var o = 0; o < t.colorTextures.length; o++) {
          var u = t.colorTextures[o];
          this.renderer.texture.unbind(u.parentTextureArray || u);
        }
        if (t.depthTexture && this.renderer.texture.unbind(t.depthTexture), e) {
          var h = e.width >> r, l = e.height >> r, c = h / e.width;
          this.setViewport(e.x * c, e.y * c, h, l);
        } else {
          var h = t.width >> r, l = t.height >> r;
          this.setViewport(0, 0, h, l);
        }
      } else
        this.current && (this.current = null, a.bindFramebuffer(a.FRAMEBUFFER, null)), e ? this.setViewport(e.x, e.y, e.width, e.height) : this.setViewport(0, 0, this.renderer.width, this.renderer.height);
    }, n.prototype.setViewport = function(t, e, r, a) {
      var s = this.viewport;
      t = Math.round(t), e = Math.round(e), r = Math.round(r), a = Math.round(a), (s.width !== r || s.height !== a || s.x !== t || s.y !== e) && (s.x = t, s.y = e, s.width = r, s.height = a, this.gl.viewport(t, e, r, a));
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
    }), n.prototype.clear = function(t, e, r, a, s) {
      s === void 0 && (s = BUFFER_BITS.COLOR | BUFFER_BITS.DEPTH);
      var o = this.gl;
      o.clearColor(t, e, r, a), o.clear(s);
    }, n.prototype.initFramebuffer = function(t) {
      var e = this.gl, r = new GLFramebuffer(e.createFramebuffer());
      return r.multisample = this.detectSamples(t.multisample), t.glFramebuffers[this.CONTEXT_UID] = r, this.managedFramebuffers.push(t), t.disposeRunner.add(this), r;
    }, n.prototype.resizeFramebuffer = function(t) {
      var e = this.gl, r = t.glFramebuffers[this.CONTEXT_UID];
      r.msaaBuffer && (e.bindRenderbuffer(e.RENDERBUFFER, r.msaaBuffer), e.renderbufferStorageMultisample(e.RENDERBUFFER, r.multisample, e.RGBA8, t.width, t.height)), r.stencil && (e.bindRenderbuffer(e.RENDERBUFFER, r.stencil), r.msaaBuffer ? e.renderbufferStorageMultisample(e.RENDERBUFFER, r.multisample, e.DEPTH24_STENCIL8, t.width, t.height) : e.renderbufferStorage(e.RENDERBUFFER, e.DEPTH_STENCIL, t.width, t.height));
      var a = t.colorTextures, s = a.length;
      e.drawBuffers || (s = Math.min(s, 1));
      for (var o = 0; o < s; o++) {
        var u = a[o], h = u.parentTextureArray || u;
        this.renderer.texture.bind(h, 0);
      }
      t.depthTexture && this.writeDepthTexture && this.renderer.texture.bind(t.depthTexture, 0);
    }, n.prototype.updateFramebuffer = function(t, e) {
      var r = this.gl, a = t.glFramebuffers[this.CONTEXT_UID], s = t.colorTextures, o = s.length;
      r.drawBuffers || (o = Math.min(o, 1)), a.multisample > 1 && this.canMultisampleFramebuffer(t) ? (a.msaaBuffer = a.msaaBuffer || r.createRenderbuffer(), r.bindRenderbuffer(r.RENDERBUFFER, a.msaaBuffer), r.renderbufferStorageMultisample(r.RENDERBUFFER, a.multisample, r.RGBA8, t.width, t.height), r.framebufferRenderbuffer(r.FRAMEBUFFER, r.COLOR_ATTACHMENT0, r.RENDERBUFFER, a.msaaBuffer)) : a.msaaBuffer && (r.deleteRenderbuffer(a.msaaBuffer), a.msaaBuffer = null, a.blitFramebuffer && (a.blitFramebuffer.dispose(), a.blitFramebuffer = null));
      for (var u = [], h = 0; h < o; h++) {
        var l = s[h], c = l.parentTextureArray || l;
        this.renderer.texture.bind(c, 0), !(h === 0 && a.msaaBuffer) && (r.framebufferTexture2D(r.FRAMEBUFFER, r.COLOR_ATTACHMENT0 + h, l.target, c._glTextures[this.CONTEXT_UID].texture, e), u.push(r.COLOR_ATTACHMENT0 + h));
      }
      if (u.length > 1 && r.drawBuffers(u), t.depthTexture) {
        var v = this.writeDepthTexture;
        if (v) {
          var d = t.depthTexture;
          this.renderer.texture.bind(d, 0), r.framebufferTexture2D(r.FRAMEBUFFER, r.DEPTH_ATTACHMENT, r.TEXTURE_2D, d._glTextures[this.CONTEXT_UID].texture, e);
        }
      }
      (t.stencil || t.depth) && !(t.depthTexture && this.writeDepthTexture) ? (a.stencil = a.stencil || r.createRenderbuffer(), r.bindRenderbuffer(r.RENDERBUFFER, a.stencil), a.msaaBuffer ? r.renderbufferStorageMultisample(r.RENDERBUFFER, a.multisample, r.DEPTH24_STENCIL8, t.width, t.height) : r.renderbufferStorage(r.RENDERBUFFER, r.DEPTH_STENCIL, t.width, t.height), r.framebufferRenderbuffer(r.FRAMEBUFFER, r.DEPTH_STENCIL_ATTACHMENT, r.RENDERBUFFER, a.stencil)) : a.stencil && (r.deleteRenderbuffer(a.stencil), a.stencil = null);
    }, n.prototype.canMultisampleFramebuffer = function(t) {
      return this.renderer.context.webGLVersion !== 1 && t.colorTextures.length <= 1 && !t.depthTexture;
    }, n.prototype.detectSamples = function(t) {
      var e = this.msaaSamples, r = MSAA_QUALITY.NONE;
      if (t <= 1 || e === null)
        return r;
      for (var a = 0; a < e.length; a++)
        if (e[a] <= t) {
          r = e[a];
          break;
        }
      return r === 1 && (r = MSAA_QUALITY.NONE), r;
    }, n.prototype.blit = function(t, e, r) {
      var a = this, s = a.current, o = a.renderer, u = a.gl, h = a.CONTEXT_UID;
      if (o.context.webGLVersion === 2 && s) {
        var l = s.glFramebuffers[h];
        if (l) {
          if (!t) {
            if (!l.msaaBuffer)
              return;
            var c = s.colorTextures[0];
            if (!c)
              return;
            l.blitFramebuffer || (l.blitFramebuffer = new Framebuffer(s.width, s.height), l.blitFramebuffer.addColorTexture(0, c)), t = l.blitFramebuffer, t.colorTextures[0] !== c && (t.colorTextures[0] = c, t.dirtyId++, t.dirtyFormat++), (t.width !== s.width || t.height !== s.height) && (t.width = s.width, t.height = s.height, t.dirtyId++, t.dirtySize++);
          }
          e || (e = tempRectangle, e.width = s.width, e.height = s.height), r || (r = e);
          var v = e.width === r.width && e.height === r.height;
          this.bind(t), u.bindFramebuffer(u.READ_FRAMEBUFFER, l.framebuffer), u.blitFramebuffer(e.left, e.top, e.right, e.bottom, r.left, r.top, r.right, r.bottom, u.COLOR_BUFFER_BIT, v ? u.NEAREST : u.LINEAR);
        }
      }
    }, n.prototype.disposeFramebuffer = function(t, e) {
      var r = t.glFramebuffers[this.CONTEXT_UID], a = this.gl;
      if (r) {
        delete t.glFramebuffers[this.CONTEXT_UID];
        var s = this.managedFramebuffers.indexOf(t);
        s >= 0 && this.managedFramebuffers.splice(s, 1), t.disposeRunner.remove(this), e || (a.deleteFramebuffer(r.framebuffer), r.msaaBuffer && a.deleteRenderbuffer(r.msaaBuffer), r.stencil && a.deleteRenderbuffer(r.stencil)), r.blitFramebuffer && r.blitFramebuffer.dispose();
      }
    }, n.prototype.disposeAll = function(t) {
      var e = this.managedFramebuffers;
      this.managedFramebuffers = [];
      for (var r = 0; r < e.length; r++)
        this.disposeFramebuffer(e[r], t);
    }, n.prototype.forceStencil = function() {
      var t = this.current;
      if (t) {
        var e = t.glFramebuffers[this.CONTEXT_UID];
        if (!(!e || e.stencil)) {
          t.stencil = !0;
          var r = t.width, a = t.height, s = this.gl, o = s.createRenderbuffer();
          s.bindRenderbuffer(s.RENDERBUFFER, o), e.msaaBuffer ? s.renderbufferStorageMultisample(s.RENDERBUFFER, e.multisample, s.DEPTH24_STENCIL8, r, a) : s.renderbufferStorage(s.RENDERBUFFER, s.DEPTH_STENCIL, r, a), e.stencil = o, s.framebufferRenderbuffer(s.FRAMEBUFFER, s.DEPTH_STENCIL_ATTACHMENT, s.RENDERBUFFER, o);
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
    function n(t) {
      this.renderer = t, this._activeGeometry = null, this._activeVao = null, this.hasVao = !0, this.hasInstance = !0, this.canUseUInt32ElementIndex = !1, this.managedGeometries = {};
    }
    return n.prototype.contextChange = function() {
      this.disposeAll(!0);
      var t = this.gl = this.renderer.gl, e = this.renderer.context;
      if (this.CONTEXT_UID = this.renderer.CONTEXT_UID, e.webGLVersion !== 2) {
        var r = this.renderer.context.extensions.vertexArrayObject;
        settings.PREFER_ENV === ENV.WEBGL_LEGACY && (r = null), r ? (t.createVertexArray = function() {
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
        var a = t.getExtension("ANGLE_instanced_arrays");
        a ? (t.vertexAttribDivisor = function(s, o) {
          return a.vertexAttribDivisorANGLE(s, o);
        }, t.drawElementsInstanced = function(s, o, u, h, l) {
          return a.drawElementsInstancedANGLE(s, o, u, h, l);
        }, t.drawArraysInstanced = function(s, o, u, h) {
          return a.drawArraysInstancedANGLE(s, o, u, h);
        }) : this.hasInstance = !1;
      }
      this.canUseUInt32ElementIndex = e.webGLVersion === 2 || !!e.extensions.uint32ElementIndex;
    }, n.prototype.bind = function(t, e) {
      e = e || this.renderer.shader.shader;
      var r = this.gl, a = t.glVertexArrayObjects[this.CONTEXT_UID], s = !1;
      a || (this.managedGeometries[t.id] = t, t.disposeRunner.add(this), t.glVertexArrayObjects[this.CONTEXT_UID] = a = {}, s = !0);
      var o = a[e.program.id] || this.initGeometryVao(t, e, s);
      this._activeGeometry = t, this._activeVao !== o && (this._activeVao = o, this.hasVao ? r.bindVertexArray(o) : this.activateVao(t, e.program)), this.updateBuffers();
    }, n.prototype.reset = function() {
      this.unbind();
    }, n.prototype.updateBuffers = function() {
      for (var t = this._activeGeometry, e = this.renderer.buffer, r = 0; r < t.buffers.length; r++) {
        var a = t.buffers[r];
        e.update(a);
      }
    }, n.prototype.checkCompatibility = function(t, e) {
      var r = t.attributes, a = e.attributeData;
      for (var s in a)
        if (!r[s])
          throw new Error('shader and geometry incompatible, geometry missing the "' + s + '" attribute');
    }, n.prototype.getSignature = function(t, e) {
      var r = t.attributes, a = e.attributeData, s = ["g", t.id];
      for (var o in r)
        a[o] && s.push(o, a[o].location);
      return s.join("-");
    }, n.prototype.initGeometryVao = function(t, e, r) {
      r === void 0 && (r = !0);
      var a = this.gl, s = this.CONTEXT_UID, o = this.renderer.buffer, u = e.program;
      u.glPrograms[s] || this.renderer.shader.generateProgram(e), this.checkCompatibility(t, u);
      var h = this.getSignature(t, u), l = t.glVertexArrayObjects[this.CONTEXT_UID], c = l[h];
      if (c)
        return l[u.id] = c, c;
      var v = t.buffers, d = t.attributes, m = {}, g = {};
      for (var y in v)
        m[y] = 0, g[y] = 0;
      for (var y in d)
        !d[y].size && u.attributeData[y] ? d[y].size = u.attributeData[y].size : d[y].size || console.warn("PIXI Geometry attribute '" + y + "' size cannot be determined (likely the bound shader does not have the attribute)"), m[d[y].buffer] += d[y].size * byteSizeMap[d[y].type];
      for (var y in d) {
        var _ = d[y], b = _.size;
        _.stride === void 0 && (m[_.buffer] === b * byteSizeMap[_.type] ? _.stride = 0 : _.stride = m[_.buffer]), _.start === void 0 && (_.start = g[_.buffer], g[_.buffer] += b * byteSizeMap[_.type]);
      }
      c = a.createVertexArray(), a.bindVertexArray(c);
      for (var S = 0; S < v.length; S++) {
        var P = v[S];
        o.bind(P), r && P._glBuffers[s].refCount++;
      }
      return this.activateVao(t, u), this._activeVao = c, l[u.id] = c, l[h] = c, c;
    }, n.prototype.disposeGeometry = function(t, e) {
      var r;
      if (this.managedGeometries[t.id]) {
        delete this.managedGeometries[t.id];
        var a = t.glVertexArrayObjects[this.CONTEXT_UID], s = this.gl, o = t.buffers, u = (r = this.renderer) === null || r === void 0 ? void 0 : r.buffer;
        if (t.disposeRunner.remove(this), !!a) {
          if (u)
            for (var h = 0; h < o.length; h++) {
              var l = o[h]._glBuffers[this.CONTEXT_UID];
              l && (l.refCount--, l.refCount === 0 && !e && u.dispose(o[h], e));
            }
          if (!e) {
            for (var c in a)
              if (c[0] === "g") {
                var v = a[c];
                this._activeVao === v && this.unbind(), s.deleteVertexArray(v);
              }
          }
          delete t.glVertexArrayObjects[this.CONTEXT_UID];
        }
      }
    }, n.prototype.disposeAll = function(t) {
      for (var e = Object.keys(this.managedGeometries), r = 0; r < e.length; r++)
        this.disposeGeometry(this.managedGeometries[e[r]], t);
    }, n.prototype.activateVao = function(t, e) {
      var r = this.gl, a = this.CONTEXT_UID, s = this.renderer.buffer, o = t.buffers, u = t.attributes;
      t.indexBuffer && s.bind(t.indexBuffer);
      var h = null;
      for (var l in u) {
        var c = u[l], v = o[c.buffer], d = v._glBuffers[a];
        if (e.attributeData[l]) {
          h !== d && (s.bind(v), h = d);
          var m = e.attributeData[l].location;
          if (r.enableVertexAttribArray(m), r.vertexAttribPointer(m, c.size, c.type || r.FLOAT, c.normalized, c.stride, c.start), c.instance)
            if (this.hasInstance)
              r.vertexAttribDivisor(m, 1);
            else
              throw new Error("geometry error, GPU Instancing is not supported on this device");
        }
      }
    }, n.prototype.draw = function(t, e, r, a) {
      var s = this.gl, o = this._activeGeometry;
      if (o.indexBuffer) {
        var u = o.indexBuffer.data.BYTES_PER_ELEMENT, h = u === 2 ? s.UNSIGNED_SHORT : s.UNSIGNED_INT;
        u === 2 || u === 4 && this.canUseUInt32ElementIndex ? o.instanced ? s.drawElementsInstanced(t, e || o.indexBuffer.data.length, h, (r || 0) * u, a || 1) : s.drawElements(t, e || o.indexBuffer.data.length, h, (r || 0) * u) : console.warn("unsupported index buffer type: uint32");
      } else o.instanced ? s.drawArraysInstanced(t, r, e || o.getSize(), a || 1) : s.drawArrays(t, r, e || o.getSize());
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
    function n(t) {
      t === void 0 && (t = null), this.type = MASK_TYPES.NONE, this.autoDetect = !0, this.maskObject = t || null, this.pooled = !1, this.isMaskData = !0, this.resolution = null, this.multisample = settings.FILTER_MULTISAMPLE, this.enabled = !0, this.colorMask = 15, this._filters = null, this._stencilCounter = 0, this._scissorCounter = 0, this._scissorRect = null, this._scissorRectLocal = null, this._colorMask = 15, this._target = null;
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
      set: function(t) {
        t ? this._filters ? this._filters[0] = t : this._filters = [t] : this._filters = null;
      },
      enumerable: !1,
      configurable: !0
    }), n.prototype.reset = function() {
      this.pooled && (this.maskObject = null, this.type = MASK_TYPES.NONE, this.autoDetect = !0), this._target = null, this._scissorRectLocal = null;
    }, n.prototype.copyCountersOrReset = function(t) {
      t ? (this._stencilCounter = t._stencilCounter, this._scissorCounter = t._scissorCounter, this._scissorRect = t._scissorRect) : (this._stencilCounter = 0, this._scissorCounter = 0, this._scissorRect = null);
    }, n;
  }()
);
function compileShader(n, t, e) {
  var r = n.createShader(t);
  return n.shaderSource(r, e), n.compileShader(r), r;
}
function logPrettyShaderError(n, t) {
  var e = n.getShaderSource(t).split(`
`).map(function(l, c) {
    return c + ": " + l;
  }), r = n.getShaderInfoLog(t), a = r.split(`
`), s = {}, o = a.map(function(l) {
    return parseFloat(l.replace(/^ERROR\: 0\:([\d]+)\:.*$/, "$1"));
  }).filter(function(l) {
    return l && !s[l] ? (s[l] = !0, !0) : !1;
  }), u = [""];
  o.forEach(function(l) {
    e[l - 1] = "%c" + e[l - 1] + "%c", u.push("background: #FF0000; color:#FFFFFF; font-size: 10px", "font-size: 10px");
  });
  var h = e.join(`
`);
  u[0] = h, console.error(r), console.groupCollapsed("click to view full shader code"), console.warn.apply(console, u), console.groupEnd();
}
function logProgramError(n, t, e, r) {
  n.getProgramParameter(t, n.LINK_STATUS) || (n.getShaderParameter(e, n.COMPILE_STATUS) || logPrettyShaderError(n, e), n.getShaderParameter(r, n.COMPILE_STATUS) || logPrettyShaderError(n, r), console.error("PixiJS Error: Could not initialize shader."), n.getProgramInfoLog(t) !== "" && console.warn("PixiJS Warning: gl.getProgramInfoLog()", n.getProgramInfoLog(t)));
}
function booleanArray(n) {
  for (var t = new Array(n), e = 0; e < t.length; e++)
    t[e] = !1;
  return t;
}
function defaultValue(n, t) {
  switch (n) {
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
      return booleanArray(2 * t);
    case "bvec3":
      return booleanArray(3 * t);
    case "bvec4":
      return booleanArray(4 * t);
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
    var n = settings.ADAPTER.createCanvas(), t = void 0;
    settings.PREFER_ENV >= ENV.WEBGL2 && (t = n.getContext("webgl2", {})), t || (t = n.getContext("webgl", {}) || n.getContext("experimental-webgl", {}), t ? t.getExtension("WEBGL_draw_buffers") : t = null), context = t;
  }
  return context;
}
var maxFragmentPrecision;
function getMaxFragmentPrecision() {
  if (!maxFragmentPrecision) {
    maxFragmentPrecision = PRECISION.MEDIUM;
    var n = getTestContext();
    if (n && n.getShaderPrecisionFormat) {
      var t = n.getShaderPrecisionFormat(n.FRAGMENT_SHADER, n.HIGH_FLOAT);
      maxFragmentPrecision = t.precision ? PRECISION.HIGH : PRECISION.MEDIUM;
    }
  }
  return maxFragmentPrecision;
}
function setPrecision(n, t, e) {
  if (n.substring(0, 9) !== "precision") {
    var r = t;
    return t === PRECISION.HIGH && e !== PRECISION.HIGH && (r = PRECISION.MEDIUM), "precision " + r + ` float;
` + n;
  } else if (e !== PRECISION.HIGH && n.substring(0, 15) === "precision highp")
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
function mapType(n, t) {
  if (!GL_TABLE) {
    var e = Object.keys(GL_TO_GLSL_TYPES);
    GL_TABLE = {};
    for (var r = 0; r < e.length; ++r) {
      var a = e[r];
      GL_TABLE[n[a]] = GL_TO_GLSL_TYPES[a];
    }
  }
  return GL_TABLE[t];
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
    test: function(n, t) {
      return (n.type === "sampler2D" || n.type === "samplerCube" || n.type === "sampler2DArray") && n.size === 1 && !n.isArray && (t == null || t.castToBaseTexture !== void 0);
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
    test: function(n, t) {
      return n.type === "mat3" && n.size === 1 && !n.isArray && t.a !== void 0;
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
    test: function(n, t) {
      return n.type === "vec2" && n.size === 1 && !n.isArray && t.x !== void 0;
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
    test: function(n, t) {
      return n.type === "vec4" && n.size === 1 && !n.isArray && t.width !== void 0;
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
function generateUniformsSync(n, t) {
  var e, r = [`
        var v = null;
        var cv = null;
        var cu = null;
        var t = 0;
        var gl = renderer.gl;
    `];
  for (var a in n.uniforms) {
    var s = t[a];
    if (!s) {
      !((e = n.uniforms[a]) === null || e === void 0) && e.group && (n.uniforms[a].ubo ? r.push(`
                        renderer.shader.syncUniformBufferGroup(uv.` + a + ", '" + a + `');
                    `) : r.push(`
                        renderer.shader.syncUniformGroup(uv.` + a + `, syncData);
                    `));
      continue;
    }
    for (var o = n.uniforms[a], u = !1, h = 0; h < uniformParsers.length; h++)
      if (uniformParsers[h].test(s, o)) {
        r.push(uniformParsers[h].code(a, o)), u = !0;
        break;
      }
    if (!u) {
      var l = s.size === 1 && !s.isArray ? GLSL_TO_SINGLE_SETTERS_CACHED : GLSL_TO_ARRAY_SETTERS, c = l[s.type].replace("location", 'ud["' + a + '"].location');
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
  for (var t = "", e = 0; e < n; ++e)
    e > 0 && (t += `
else `), e < n - 1 && (t += "if(test == " + e + ".0){}");
  return t;
}
function checkMaxIfStatementsInShader(n, t) {
  if (n === 0)
    throw new Error("Invalid value of `0` passed to `checkMaxIfStatementsInShader`");
  for (var e = t.createShader(t.FRAGMENT_SHADER); ; ) {
    var r = fragTemplate$1.replace(/%forloop%/gi, generateIfTestSrc(n));
    if (t.shaderSource(e, r), t.compileShader(e), !t.getShaderParameter(e, t.COMPILE_STATUS))
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
    function n(t, e, r) {
      r === void 0 && (r = "pixi-shader"), this.id = UID$1++, this.vertexSrc = t || n.defaultVertexSrc, this.fragmentSrc = e || n.defaultFragmentSrc, this.vertexSrc = this.vertexSrc.trim(), this.fragmentSrc = this.fragmentSrc.trim(), this.vertexSrc.substring(0, 8) !== "#version" && (r = r.replace(/\s+/g, "-"), nameCache[r] ? (nameCache[r]++, r += "-" + nameCache[r]) : nameCache[r] = 1, this.vertexSrc = "#define SHADER_NAME " + r + `
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
    }), n.from = function(t, e, r) {
      var a = t + e, s = ProgramCache[a];
      return s || (ProgramCache[a] = s = new n(t, e, r)), s;
    }, n;
  }()
), Shader = (
  /** @class */
  function() {
    function n(t, e) {
      this.uniformBindCount = 0, this.program = t, e ? e instanceof UniformGroup ? this.uniformGroup = e : this.uniformGroup = new UniformGroup(e) : this.uniformGroup = new UniformGroup({}), this.disposeRunner = new Runner("disposeShader");
    }
    return n.prototype.checkUniformExists = function(t, e) {
      if (e.uniforms[t])
        return !0;
      for (var r in e.uniforms) {
        var a = e.uniforms[r];
        if (a.group && this.checkUniformExists(t, a))
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
    }), n.from = function(t, e, r) {
      var a = Program.from(t, e);
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
      set: function(t) {
        !!(this.data & 1 << BLEND$1) !== t && (this.data ^= 1 << BLEND$1);
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
      set: function(t) {
        !!(this.data & 1 << OFFSET$1) !== t && (this.data ^= 1 << OFFSET$1);
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
      set: function(t) {
        !!(this.data & 1 << CULLING$1) !== t && (this.data ^= 1 << CULLING$1);
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
      set: function(t) {
        !!(this.data & 1 << DEPTH_TEST$1) !== t && (this.data ^= 1 << DEPTH_TEST$1);
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
      set: function(t) {
        !!(this.data & 1 << DEPTH_MASK$1) !== t && (this.data ^= 1 << DEPTH_MASK$1);
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
      set: function(t) {
        !!(this.data & 1 << WINDING$1) !== t && (this.data ^= 1 << WINDING$1);
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
      set: function(t) {
        this.blend = t !== BLEND_MODES.NONE, this._blendMode = t;
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
      set: function(t) {
        this.offsets = !!t, this._polygonOffset = t;
      },
      enumerable: !1,
      configurable: !0
    }), n.prototype.toString = function() {
      return "[@pixi/core:State " + ("blendMode=" + this.blendMode + " ") + ("clockwiseFrontFace=" + this.clockwiseFrontFace + " ") + ("culling=" + this.culling + " ") + ("depthMask=" + this.depthMask + " ") + ("polygonOffset=" + this.polygonOffset) + "]";
    }, n.for2d = function() {
      var t = new n();
      return t.depthTest = !1, t.blend = !0, t;
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
    __extends$i(t, n);
    function t(e, r, a) {
      var s = this, o = Program.from(e || t.defaultVertexSrc, r || t.defaultFragmentSrc);
      return s = n.call(this, o, a) || this, s.padding = 0, s.resolution = settings.FILTER_RESOLUTION, s.multisample = settings.FILTER_MULTISAMPLE, s.enabled = !0, s.autoFit = !0, s.state = new State(), s;
    }
    return t.prototype.apply = function(e, r, a, s, o) {
      e.applyFilter(this, r, a, s);
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
        return defaultVertex$2;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t, "defaultFragmentSrc", {
      /**
       * The default fragment shader source
       * @constant
       */
      get: function() {
        return defaultFragment$1;
      },
      enumerable: !1,
      configurable: !0
    }), t;
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
    function n(t, e) {
      this._texture = t, this.mapCoord = new Matrix(), this.uClampFrame = new Float32Array(4), this.uClampOffset = new Float32Array(2), this._textureID = -1, this._updateID = 0, this.clampOffset = 0, this.clampMargin = typeof e > "u" ? 0.5 : e, this.isSimple = !1;
    }
    return Object.defineProperty(n.prototype, "texture", {
      /** Texture property. */
      get: function() {
        return this._texture;
      },
      set: function(t) {
        this._texture = t, this._textureID = -1;
      },
      enumerable: !1,
      configurable: !0
    }), n.prototype.multiplyUvs = function(t, e) {
      e === void 0 && (e = t);
      for (var r = this.mapCoord, a = 0; a < t.length; a += 2) {
        var s = t[a], o = t[a + 1];
        e[a] = s * r.a + o * r.c + r.tx, e[a + 1] = s * r.b + o * r.d + r.ty;
      }
      return e;
    }, n.prototype.update = function(t) {
      var e = this._texture;
      if (!e || !e.valid || !t && this._textureID === e._updateID)
        return !1;
      this._textureID = e._updateID, this._updateID++;
      var r = e._uvs;
      this.mapCoord.set(r.x1 - r.x0, r.y1 - r.y0, r.x3 - r.x0, r.y3 - r.y0, r.x0, r.y0);
      var a = e.orig, s = e.trim;
      s && (tempMat$1.set(a.width / s.width, 0, 0, a.height / s.height, -s.x / s.width, -s.y / s.height), this.mapCoord.append(tempMat$1));
      var o = e.baseTexture, u = this.uClampFrame, h = this.clampMargin / o.resolution, l = this.clampOffset;
      return u[0] = (e._frame.x + h + l) / o.width, u[1] = (e._frame.y + h + l) / o.height, u[2] = (e._frame.x + e._frame.width - h + l) / o.width, u[3] = (e._frame.y + e._frame.height - h + l) / o.height, this.uClampOffset[0] = l / o.realWidth, this.uClampOffset[1] = l / o.realHeight, this.isSimple = e._frame.width === o.width && e._frame.height === o.height && e.rotate === 0, !0;
    }, n;
  }()
), SpriteMaskFilter = (
  /** @class */
  function(n) {
    __extends$i(t, n);
    function t(e, r, a) {
      var s = this, o = null;
      return typeof e != "string" && r === void 0 && a === void 0 && (o = e, e = void 0, r = void 0, a = void 0), s = n.call(this, e || vertex$4, r || fragment$7, a) || this, s.maskSprite = o, s.maskMatrix = new Matrix(), s;
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
    }), t.prototype.apply = function(e, r, a, s) {
      var o = this._maskSprite, u = o._texture;
      u.valid && (u.uvMatrix || (u.uvMatrix = new TextureMatrix(u, 0)), u.uvMatrix.update(), this.uniforms.npmAlpha = u.baseTexture.alphaMode ? 0 : 1, this.uniforms.mask = u, this.uniforms.otherMatrix = e.calculateSpriteMatrix(this.maskMatrix, o).prepend(u.uvMatrix.mapCoord), this.uniforms.alpha = o.worldAlpha, this.uniforms.maskClamp = u.uvMatrix.uClampFrame, e.applyFilter(this, r, a, s));
    }, t;
  }(Filter)
), MaskSystem = (
  /** @class */
  function() {
    function n(t) {
      this.renderer = t, this.enableScissor = !0, this.alphaMaskPool = [], this.maskDataPool = [], this.maskStack = [], this.alphaMaskIndex = 0;
    }
    return n.prototype.setMaskStack = function(t) {
      this.maskStack = t, this.renderer.scissor.setMaskStack(t), this.renderer.stencil.setMaskStack(t);
    }, n.prototype.push = function(t, e) {
      var r = e;
      if (!r.isMaskData) {
        var a = this.maskDataPool.pop() || new MaskData();
        a.pooled = !0, a.maskObject = e, r = a;
      }
      var s = this.maskStack.length !== 0 ? this.maskStack[this.maskStack.length - 1] : null;
      if (r.copyCountersOrReset(s), r._colorMask = s ? s._colorMask : 15, r.autoDetect && this.detect(r), r._target = t, r.type !== MASK_TYPES.SPRITE && this.maskStack.push(r), r.enabled)
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
    }, n.prototype.pop = function(t) {
      var e = this.maskStack.pop();
      if (!(!e || e._target !== t)) {
        if (e.enabled)
          switch (e.type) {
            case MASK_TYPES.SCISSOR:
              this.renderer.scissor.pop(e);
              break;
            case MASK_TYPES.STENCIL:
              this.renderer.stencil.pop(e.maskObject);
              break;
            case MASK_TYPES.SPRITE:
              this.popSpriteMask(e);
              break;
            case MASK_TYPES.COLOR:
              this.popColorMask(e);
              break;
          }
        if (e.reset(), e.pooled && this.maskDataPool.push(e), this.maskStack.length !== 0) {
          var r = this.maskStack[this.maskStack.length - 1];
          r.type === MASK_TYPES.SPRITE && r._filters && (r._filters[0].maskSprite = r.maskObject);
        }
      }
    }, n.prototype.detect = function(t) {
      var e = t.maskObject;
      e ? e.isSprite ? t.type = MASK_TYPES.SPRITE : this.enableScissor && this.renderer.scissor.testScissor(t) ? t.type = MASK_TYPES.SCISSOR : t.type = MASK_TYPES.STENCIL : t.type = MASK_TYPES.COLOR;
    }, n.prototype.pushSpriteMask = function(t) {
      var e, r, a = t.maskObject, s = t._target, o = t._filters;
      o || (o = this.alphaMaskPool[this.alphaMaskIndex], o || (o = this.alphaMaskPool[this.alphaMaskIndex] = [new SpriteMaskFilter()]));
      var u = this.renderer, h = u.renderTexture, l, c;
      if (h.current) {
        var v = h.current;
        l = t.resolution || v.resolution, c = (e = t.multisample) !== null && e !== void 0 ? e : v.multisample;
      } else
        l = t.resolution || u.resolution, c = (r = t.multisample) !== null && r !== void 0 ? r : u.multisample;
      o[0].resolution = l, o[0].multisample = c, o[0].maskSprite = a;
      var d = s.filterArea;
      s.filterArea = a.getBounds(!0), u.filter.push(s, o), s.filterArea = d, t._filters || this.alphaMaskIndex++;
    }, n.prototype.popSpriteMask = function(t) {
      this.renderer.filter.pop(), t._filters ? t._filters[0].maskSprite = null : (this.alphaMaskIndex--, this.alphaMaskPool[this.alphaMaskIndex][0].maskSprite = null);
    }, n.prototype.pushColorMask = function(t) {
      var e = t._colorMask, r = t._colorMask = e & t.colorMask;
      r !== e && this.renderer.gl.colorMask((r & 1) !== 0, (r & 2) !== 0, (r & 4) !== 0, (r & 8) !== 0);
    }, n.prototype.popColorMask = function(t) {
      var e = t._colorMask, r = this.maskStack.length > 0 ? this.maskStack[this.maskStack.length - 1]._colorMask : 15;
      r !== e && this.renderer.gl.colorMask((r & 1) !== 0, (r & 2) !== 0, (r & 4) !== 0, (r & 8) !== 0);
    }, n.prototype.destroy = function() {
      this.renderer = null;
    }, n;
  }()
), AbstractMaskSystem = (
  /** @class */
  function() {
    function n(t) {
      this.renderer = t, this.maskStack = [], this.glConst = 0;
    }
    return n.prototype.getStackLength = function() {
      return this.maskStack.length;
    }, n.prototype.setMaskStack = function(t) {
      var e = this.renderer.gl, r = this.getStackLength();
      this.maskStack = t;
      var a = this.getStackLength();
      a !== r && (a === 0 ? e.disable(this.glConst) : (e.enable(this.glConst), this._useCurrent()));
    }, n.prototype._useCurrent = function() {
    }, n.prototype.destroy = function() {
      this.renderer = null, this.maskStack = null;
    }, n;
  }()
), tempMatrix$1 = new Matrix(), rectPool = [], ScissorSystem = (
  /** @class */
  function(n) {
    __extends$i(t, n);
    function t(e) {
      var r = n.call(this, e) || this;
      return r.glConst = settings.ADAPTER.getWebGLRenderingContext().SCISSOR_TEST, r;
    }
    return t.prototype.getStackLength = function() {
      var e = this.maskStack[this.maskStack.length - 1];
      return e ? e._scissorCounter : 0;
    }, t.prototype.calcScissorRect = function(e) {
      var r;
      if (!e._scissorRectLocal) {
        var a = e._scissorRect, s = e.maskObject, o = this.renderer, u = o.renderTexture, h = s.getBounds(!0, (r = rectPool.pop()) !== null && r !== void 0 ? r : new Rectangle());
        this.roundFrameToPixels(h, u.current ? u.current.resolution : o.resolution, u.sourceFrame, u.destinationFrame, o.projection.transform), a && h.fit(a), e._scissorRectLocal = h;
      }
    }, t.isMatrixRotated = function(e) {
      if (!e)
        return !1;
      var r = e.a, a = e.b, s = e.c, o = e.d;
      return (Math.abs(a) > 1e-4 || Math.abs(s) > 1e-4) && (Math.abs(r) > 1e-4 || Math.abs(o) > 1e-4);
    }, t.prototype.testScissor = function(e) {
      var r = e.maskObject;
      if (!r.isFastRect || !r.isFastRect() || t.isMatrixRotated(r.worldTransform) || t.isMatrixRotated(this.renderer.projection.transform))
        return !1;
      this.calcScissorRect(e);
      var a = e._scissorRectLocal;
      return a.width > 0 && a.height > 0;
    }, t.prototype.roundFrameToPixels = function(e, r, a, s, o) {
      t.isMatrixRotated(o) || (o = o ? tempMatrix$1.copyFrom(o) : tempMatrix$1.identity(), o.translate(-a.x, -a.y).scale(s.width / a.width, s.height / a.height).translate(s.x, s.y), this.renderer.filter.transformAABB(o, e), e.fit(s), e.x = Math.round(e.x * r), e.y = Math.round(e.y * r), e.width = Math.round(e.width * r), e.height = Math.round(e.height * r));
    }, t.prototype.push = function(e) {
      e._scissorRectLocal || this.calcScissorRect(e);
      var r = this.renderer.gl;
      e._scissorRect || r.enable(r.SCISSOR_TEST), e._scissorCounter++, e._scissorRect = e._scissorRectLocal, this._useCurrent();
    }, t.prototype.pop = function(e) {
      var r = this.renderer.gl;
      e && rectPool.push(e._scissorRectLocal), this.getStackLength() > 0 ? this._useCurrent() : r.disable(r.SCISSOR_TEST);
    }, t.prototype._useCurrent = function() {
      var e = this.maskStack[this.maskStack.length - 1]._scissorRect, r;
      this.renderer.renderTexture.current ? r = e.y : r = this.renderer.height - e.height - e.y, this.renderer.gl.scissor(e.x, r, e.width, e.height);
    }, t;
  }(AbstractMaskSystem)
), StencilSystem = (
  /** @class */
  function(n) {
    __extends$i(t, n);
    function t(e) {
      var r = n.call(this, e) || this;
      return r.glConst = settings.ADAPTER.getWebGLRenderingContext().STENCIL_TEST, r;
    }
    return t.prototype.getStackLength = function() {
      var e = this.maskStack[this.maskStack.length - 1];
      return e ? e._stencilCounter : 0;
    }, t.prototype.push = function(e) {
      var r = e.maskObject, a = this.renderer.gl, s = e._stencilCounter;
      s === 0 && (this.renderer.framebuffer.forceStencil(), a.clearStencil(0), a.clear(a.STENCIL_BUFFER_BIT), a.enable(a.STENCIL_TEST)), e._stencilCounter++;
      var o = e._colorMask;
      o !== 0 && (e._colorMask = 0, a.colorMask(!1, !1, !1, !1)), a.stencilFunc(a.EQUAL, s, 4294967295), a.stencilOp(a.KEEP, a.KEEP, a.INCR), r.renderable = !0, r.render(this.renderer), this.renderer.batch.flush(), r.renderable = !1, o !== 0 && (e._colorMask = o, a.colorMask((o & 1) !== 0, (o & 2) !== 0, (o & 4) !== 0, (o & 8) !== 0)), this._useCurrent();
    }, t.prototype.pop = function(e) {
      var r = this.renderer.gl;
      if (this.getStackLength() === 0)
        r.disable(r.STENCIL_TEST);
      else {
        var a = this.maskStack.length !== 0 ? this.maskStack[this.maskStack.length - 1] : null, s = a ? a._colorMask : 15;
        s !== 0 && (a._colorMask = 0, r.colorMask(!1, !1, !1, !1)), r.stencilOp(r.KEEP, r.KEEP, r.DECR), e.renderable = !0, e.render(this.renderer), this.renderer.batch.flush(), e.renderable = !1, s !== 0 && (a._colorMask = s, r.colorMask((s & 1) !== 0, (s & 2) !== 0, (s & 4) !== 0, (s & 8) !== 0)), this._useCurrent();
      }
    }, t.prototype._useCurrent = function() {
      var e = this.renderer.gl;
      e.stencilFunc(e.EQUAL, this.getStackLength(), 4294967295), e.stencilOp(e.KEEP, e.KEEP, e.KEEP);
    }, t;
  }(AbstractMaskSystem)
), ProjectionSystem = (
  /** @class */
  function() {
    function n(t) {
      this.renderer = t, this.destinationFrame = null, this.sourceFrame = null, this.defaultFrame = null, this.projectionMatrix = new Matrix(), this.transform = null;
    }
    return n.prototype.update = function(t, e, r, a) {
      this.destinationFrame = t || this.destinationFrame || this.defaultFrame, this.sourceFrame = e || this.sourceFrame || t, this.calculateProjection(this.destinationFrame, this.sourceFrame, r, a), this.transform && this.projectionMatrix.append(this.transform);
      var s = this.renderer;
      s.globalUniforms.uniforms.projectionMatrix = this.projectionMatrix, s.globalUniforms.update(), s.shader.shader && s.shader.syncUniformGroup(s.shader.shader.uniforms.globals);
    }, n.prototype.calculateProjection = function(t, e, r, a) {
      var s = this.projectionMatrix, o = a ? -1 : 1;
      s.identity(), s.a = 1 / e.width * 2, s.d = o * (1 / e.height * 2), s.tx = -1 - e.x * s.a, s.ty = -o - e.y * s.d;
    }, n.prototype.setTransform = function(t) {
    }, n.prototype.destroy = function() {
      this.renderer = null;
    }, n;
  }()
), tempRect = new Rectangle(), tempRect2 = new Rectangle(), RenderTextureSystem = (
  /** @class */
  function() {
    function n(t) {
      this.renderer = t, this.clearColor = t._backgroundColorRgba, this.defaultMaskStack = [], this.current = null, this.sourceFrame = new Rectangle(), this.destinationFrame = new Rectangle(), this.viewportFrame = new Rectangle();
    }
    return n.prototype.bind = function(t, e, r) {
      t === void 0 && (t = null);
      var a = this.renderer;
      this.current = t;
      var s, o, u;
      t ? (s = t.baseTexture, u = s.resolution, e || (tempRect.width = t.frame.width, tempRect.height = t.frame.height, e = tempRect), r || (tempRect2.x = t.frame.x, tempRect2.y = t.frame.y, tempRect2.width = e.width, tempRect2.height = e.height, r = tempRect2), o = s.framebuffer) : (u = a.resolution, e || (tempRect.width = a.screen.width, tempRect.height = a.screen.height, e = tempRect), r || (r = tempRect, r.width = e.width, r.height = e.height));
      var h = this.viewportFrame;
      h.x = r.x * u, h.y = r.y * u, h.width = r.width * u, h.height = r.height * u, t || (h.y = a.view.height - (h.y + h.height)), h.ceil(), this.renderer.framebuffer.bind(o, h), this.renderer.projection.update(r, e, u, !o), t ? this.renderer.mask.setMaskStack(s.maskStack) : this.renderer.mask.setMaskStack(this.defaultMaskStack), this.sourceFrame.copyFrom(e), this.destinationFrame.copyFrom(r);
    }, n.prototype.clear = function(t, e) {
      this.current ? t = t || this.current.baseTexture.clearColor : t = t || this.clearColor;
      var r = this.destinationFrame, a = this.current ? this.current.baseTexture : this.renderer.screen, s = r.width !== a.width || r.height !== a.height;
      if (s) {
        var o = this.viewportFrame, u = o.x, h = o.y, l = o.width, c = o.height;
        u = Math.round(u), h = Math.round(h), l = Math.round(l), c = Math.round(c), this.renderer.gl.enable(this.renderer.gl.SCISSOR_TEST), this.renderer.gl.scissor(u, h, l, c);
      }
      this.renderer.framebuffer.clear(t[0], t[1], t[2], t[3], e), s && this.renderer.scissor.pop();
    }, n.prototype.resize = function() {
      this.bind(null);
    }, n.prototype.reset = function() {
      this.bind(null);
    }, n.prototype.destroy = function() {
      this.renderer = null;
    }, n;
  }()
);
function uboUpdate(n, t, e, r, a) {
  e.buffer.update(a);
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
  for (var t = n.map(function(h) {
    return {
      data: h,
      offset: 0,
      dataLen: 0,
      dirty: 0
    };
  }), e = 0, r = 0, a = 0, s = 0; s < t.length; s++) {
    var o = t[s];
    if (e = GLSL_TO_STD40_SIZE[o.data.type], o.data.size > 1 && (e = Math.max(e, 16) * o.data.size), o.dataLen = e, r % e !== 0 && r < 16) {
      var u = r % e % 16;
      r += u, a += u;
    }
    r + e > 16 ? (a = Math.ceil(a / 16) * 16, o.offset = a, a += e, r = e) : (o.offset = a, r += e, a += e);
  }
  return a = Math.ceil(a / 16) * 16, { uboElements: t, size: a };
}
function getUBOData(n, t) {
  var e = [];
  for (var r in n)
    t[r] && e.push(t[r]);
  return e.sort(function(a, s) {
    return a.index - s.index;
  }), e;
}
function generateUniformBufferSync(n, t) {
  if (!n.autoManage)
    return { size: 0, syncFunc: uboUpdate };
  for (var e = getUBOData(n.uniforms, t), r = createUBOElements(e), a = r.uboElements, s = r.size, o = [`
    var v = null;
    var v2 = null;
    var cv = null;
    var t = 0;
    var gl = renderer.gl
    var index = 0;
    var data = buffer.data;
    `], u = 0; u < a.length; u++) {
    for (var h = a[u], l = n.uniforms[h.data.name], c = h.data.name, v = !1, d = 0; d < uniformParsers.length; d++) {
      var m = uniformParsers[d];
      if (m.codeUbo && m.test(h.data, l)) {
        o.push("offset = " + h.offset / 4 + ";", uniformParsers[d].codeUbo(h.data.name, l)), v = !0;
        break;
      }
    }
    if (!v)
      if (h.data.size > 1) {
        var g = mapSize(h.data.type), y = Math.max(GLSL_TO_STD40_SIZE[h.data.type] / 16, 1), _ = g / y, b = (4 - _ % 4) % 4;
        o.push(`
                cv = ud.` + c + `.value;
                v = uv.` + c + `;
                offset = ` + h.offset / 4 + `;

                t = 0;

                for(var i=0; i < ` + h.data.size * y + `; i++)
                {
                    for(var j = 0; j < ` + _ + `; j++)
                    {
                        data[offset++] = v[t++];
                    }
                    offset += ` + b + `;
                }

                `);
      } else {
        var S = UBO_TO_SINGLE_SETTERS[h.data.type];
        o.push(`
                cv = ud.` + c + `.value;
                v = uv.` + c + `;
                offset = ` + h.offset / 4 + `;
                ` + S + `;
                `);
      }
  }
  return o.push(`
       renderer.buffer.update(buffer);
    `), {
    size: s,
    // eslint-disable-next-line no-new-func
    syncFunc: new Function("ud", "uv", "renderer", "syncData", "buffer", o.join(`
`))
  };
}
var GLProgram = (
  /** @class */
  function() {
    function n(t, e) {
      this.program = t, this.uniformData = e, this.uniformGroups = {}, this.uniformDirtyGroups = {}, this.uniformBufferBindings = {};
    }
    return n.prototype.destroy = function() {
      this.uniformData = null, this.uniformGroups = null, this.uniformDirtyGroups = null, this.uniformBufferBindings = null, this.program = null;
    }, n;
  }()
);
function getAttributeData(n, t) {
  for (var e = {}, r = t.getProgramParameter(n, t.ACTIVE_ATTRIBUTES), a = 0; a < r; a++) {
    var s = t.getActiveAttrib(n, a);
    if (s.name.indexOf("gl_") !== 0) {
      var o = mapType(t, s.type), u = {
        type: o,
        name: s.name,
        size: mapSize(o),
        location: t.getAttribLocation(n, s.name)
      };
      e[s.name] = u;
    }
  }
  return e;
}
function getUniformData(n, t) {
  for (var e = {}, r = t.getProgramParameter(n, t.ACTIVE_UNIFORMS), a = 0; a < r; a++) {
    var s = t.getActiveUniform(n, a), o = s.name.replace(/\[.*?\]$/, ""), u = !!s.name.match(/\[.*?\]$/), h = mapType(t, s.type);
    e[o] = {
      name: o,
      index: a,
      type: h,
      size: s.size,
      isArray: u,
      value: defaultValue(h, s.size)
    };
  }
  return e;
}
function generateProgram(n, t) {
  var e = compileShader(n, n.VERTEX_SHADER, t.vertexSrc), r = compileShader(n, n.FRAGMENT_SHADER, t.fragmentSrc), a = n.createProgram();
  if (n.attachShader(a, e), n.attachShader(a, r), n.linkProgram(a), n.getProgramParameter(a, n.LINK_STATUS) || logProgramError(n, a, e, r), t.attributeData = getAttributeData(a, n), t.uniformData = getUniformData(a, n), !/^[ \t]*#[ \t]*version[ \t]+300[ \t]+es[ \t]*$/m.test(t.vertexSrc)) {
    var s = Object.keys(t.attributeData);
    s.sort(function(c, v) {
      return c > v ? 1 : -1;
    });
    for (var o = 0; o < s.length; o++)
      t.attributeData[s[o]].location = o, n.bindAttribLocation(a, o, s[o]);
    n.linkProgram(a);
  }
  n.deleteShader(e), n.deleteShader(r);
  var u = {};
  for (var o in t.uniformData) {
    var h = t.uniformData[o];
    u[o] = {
      location: n.getUniformLocation(a, o),
      value: defaultValue(h.type, h.size)
    };
  }
  var l = new GLProgram(a, u);
  return l;
}
var UID = 0, defaultSyncData = { textureCount: 0, uboCount: 0 }, ShaderSystem = (
  /** @class */
  function() {
    function n(t) {
      this.destroyed = !1, this.renderer = t, this.systemCheck(), this.gl = null, this.shader = null, this.program = null, this.cache = {}, this._uboCache = {}, this.id = UID++;
    }
    return n.prototype.systemCheck = function() {
      if (!unsafeEvalSupported())
        throw new Error("Current environment does not allow unsafe-eval, please use @pixi/unsafe-eval module to enable support.");
    }, n.prototype.contextChange = function(t) {
      this.gl = t, this.reset();
    }, n.prototype.bind = function(t, e) {
      t.disposeRunner.add(this), t.uniforms.globals = this.renderer.globalUniforms;
      var r = t.program, a = r.glPrograms[this.renderer.CONTEXT_UID] || this.generateProgram(t);
      return this.shader = t, this.program !== r && (this.program = r, this.gl.useProgram(a.program)), e || (defaultSyncData.textureCount = 0, defaultSyncData.uboCount = 0, this.syncUniformGroup(t.uniformGroup, defaultSyncData)), a;
    }, n.prototype.setUniforms = function(t) {
      var e = this.shader.program, r = e.glPrograms[this.renderer.CONTEXT_UID];
      e.syncUniforms(r.uniformData, t, this.renderer);
    }, n.prototype.syncUniformGroup = function(t, e) {
      var r = this.getGlProgram();
      (!t.static || t.dirtyId !== r.uniformDirtyGroups[t.id]) && (r.uniformDirtyGroups[t.id] = t.dirtyId, this.syncUniforms(t, r, e));
    }, n.prototype.syncUniforms = function(t, e, r) {
      var a = t.syncUniforms[this.shader.program.id] || this.createSyncGroups(t);
      a(e.uniformData, t.uniforms, this.renderer, r);
    }, n.prototype.createSyncGroups = function(t) {
      var e = this.getSignature(t, this.shader.program.uniformData, "u");
      return this.cache[e] || (this.cache[e] = generateUniformsSync(t, this.shader.program.uniformData)), t.syncUniforms[this.shader.program.id] = this.cache[e], t.syncUniforms[this.shader.program.id];
    }, n.prototype.syncUniformBufferGroup = function(t, e) {
      var r = this.getGlProgram();
      if (!t.static || t.dirtyId !== 0 || !r.uniformGroups[t.id]) {
        t.dirtyId = 0;
        var a = r.uniformGroups[t.id] || this.createSyncBufferGroup(t, r, e);
        t.buffer.update(), a(r.uniformData, t.uniforms, this.renderer, defaultSyncData, t.buffer);
      }
      this.renderer.buffer.bindBufferBase(t.buffer, r.uniformBufferBindings[e]);
    }, n.prototype.createSyncBufferGroup = function(t, e, r) {
      var a = this.renderer.gl;
      this.renderer.buffer.bind(t.buffer);
      var s = this.gl.getUniformBlockIndex(e.program, r);
      e.uniformBufferBindings[r] = this.shader.uniformBindCount, a.uniformBlockBinding(e.program, s, this.shader.uniformBindCount), this.shader.uniformBindCount++;
      var o = this.getSignature(t, this.shader.program.uniformData, "ubo"), u = this._uboCache[o];
      if (u || (u = this._uboCache[o] = generateUniformBufferSync(t, this.shader.program.uniformData)), t.autoManage) {
        var h = new Float32Array(u.size / 4);
        t.buffer.update(h);
      }
      return e.uniformGroups[t.id] = u.syncFunc, e.uniformGroups[t.id];
    }, n.prototype.getSignature = function(t, e, r) {
      var a = t.uniforms, s = [r + "-"];
      for (var o in a)
        s.push(o), e[o] && s.push(e[o].type);
      return s.join("-");
    }, n.prototype.getGlProgram = function() {
      return this.shader ? this.shader.program.glPrograms[this.renderer.CONTEXT_UID] : null;
    }, n.prototype.generateProgram = function(t) {
      var e = this.gl, r = t.program, a = generateProgram(e, r);
      return r.glPrograms[this.renderer.CONTEXT_UID] = a, a;
    }, n.prototype.reset = function() {
      this.program = null, this.shader = null;
    }, n.prototype.disposeShader = function(t) {
      this.shader === t && (this.shader = null);
    }, n.prototype.destroy = function() {
      this.renderer = null, this.destroyed = !0;
    }, n;
  }()
);
function mapWebGLBlendModesToPixi(n, t) {
  return t === void 0 && (t = []), t[BLEND_MODES.NORMAL] = [n.ONE, n.ONE_MINUS_SRC_ALPHA], t[BLEND_MODES.ADD] = [n.ONE, n.ONE], t[BLEND_MODES.MULTIPLY] = [n.DST_COLOR, n.ONE_MINUS_SRC_ALPHA, n.ONE, n.ONE_MINUS_SRC_ALPHA], t[BLEND_MODES.SCREEN] = [n.ONE, n.ONE_MINUS_SRC_COLOR, n.ONE, n.ONE_MINUS_SRC_ALPHA], t[BLEND_MODES.OVERLAY] = [n.ONE, n.ONE_MINUS_SRC_ALPHA], t[BLEND_MODES.DARKEN] = [n.ONE, n.ONE_MINUS_SRC_ALPHA], t[BLEND_MODES.LIGHTEN] = [n.ONE, n.ONE_MINUS_SRC_ALPHA], t[BLEND_MODES.COLOR_DODGE] = [n.ONE, n.ONE_MINUS_SRC_ALPHA], t[BLEND_MODES.COLOR_BURN] = [n.ONE, n.ONE_MINUS_SRC_ALPHA], t[BLEND_MODES.HARD_LIGHT] = [n.ONE, n.ONE_MINUS_SRC_ALPHA], t[BLEND_MODES.SOFT_LIGHT] = [n.ONE, n.ONE_MINUS_SRC_ALPHA], t[BLEND_MODES.DIFFERENCE] = [n.ONE, n.ONE_MINUS_SRC_ALPHA], t[BLEND_MODES.EXCLUSION] = [n.ONE, n.ONE_MINUS_SRC_ALPHA], t[BLEND_MODES.HUE] = [n.ONE, n.ONE_MINUS_SRC_ALPHA], t[BLEND_MODES.SATURATION] = [n.ONE, n.ONE_MINUS_SRC_ALPHA], t[BLEND_MODES.COLOR] = [n.ONE, n.ONE_MINUS_SRC_ALPHA], t[BLEND_MODES.LUMINOSITY] = [n.ONE, n.ONE_MINUS_SRC_ALPHA], t[BLEND_MODES.NONE] = [0, 0], t[BLEND_MODES.NORMAL_NPM] = [n.SRC_ALPHA, n.ONE_MINUS_SRC_ALPHA, n.ONE, n.ONE_MINUS_SRC_ALPHA], t[BLEND_MODES.ADD_NPM] = [n.SRC_ALPHA, n.ONE, n.ONE, n.ONE], t[BLEND_MODES.SCREEN_NPM] = [n.SRC_ALPHA, n.ONE_MINUS_SRC_COLOR, n.ONE, n.ONE_MINUS_SRC_ALPHA], t[BLEND_MODES.SRC_IN] = [n.DST_ALPHA, n.ZERO], t[BLEND_MODES.SRC_OUT] = [n.ONE_MINUS_DST_ALPHA, n.ZERO], t[BLEND_MODES.SRC_ATOP] = [n.DST_ALPHA, n.ONE_MINUS_SRC_ALPHA], t[BLEND_MODES.DST_OVER] = [n.ONE_MINUS_DST_ALPHA, n.ONE], t[BLEND_MODES.DST_IN] = [n.ZERO, n.SRC_ALPHA], t[BLEND_MODES.DST_OUT] = [n.ZERO, n.ONE_MINUS_SRC_ALPHA], t[BLEND_MODES.DST_ATOP] = [n.ONE_MINUS_DST_ALPHA, n.SRC_ALPHA], t[BLEND_MODES.XOR] = [n.ONE_MINUS_DST_ALPHA, n.ONE_MINUS_SRC_ALPHA], t[BLEND_MODES.SUBTRACT] = [n.ONE, n.ONE, n.ONE, n.ONE, n.FUNC_REVERSE_SUBTRACT, n.FUNC_ADD], t;
}
var BLEND = 0, OFFSET = 1, CULLING = 2, DEPTH_TEST = 3, WINDING = 4, DEPTH_MASK = 5, StateSystem = (
  /** @class */
  function() {
    function n() {
      this.gl = null, this.stateId = 0, this.polygonOffset = 0, this.blendMode = BLEND_MODES.NONE, this._blendEq = !1, this.map = [], this.map[BLEND] = this.setBlend, this.map[OFFSET] = this.setOffset, this.map[CULLING] = this.setCullFace, this.map[DEPTH_TEST] = this.setDepthTest, this.map[WINDING] = this.setFrontFace, this.map[DEPTH_MASK] = this.setDepthMask, this.checks = [], this.defaultState = new State(), this.defaultState.blend = !0;
    }
    return n.prototype.contextChange = function(t) {
      this.gl = t, this.blendModes = mapWebGLBlendModesToPixi(t), this.set(this.defaultState), this.reset();
    }, n.prototype.set = function(t) {
      if (t = t || this.defaultState, this.stateId !== t.data) {
        for (var e = this.stateId ^ t.data, r = 0; e; )
          e & 1 && this.map[r].call(this, !!(t.data & 1 << r)), e = e >> 1, r++;
        this.stateId = t.data;
      }
      for (var r = 0; r < this.checks.length; r++)
        this.checks[r](this, t);
    }, n.prototype.forceState = function(t) {
      t = t || this.defaultState;
      for (var e = 0; e < this.map.length; e++)
        this.map[e].call(this, !!(t.data & 1 << e));
      for (var e = 0; e < this.checks.length; e++)
        this.checks[e](this, t);
      this.stateId = t.data;
    }, n.prototype.setBlend = function(t) {
      this.updateCheck(n.checkBlendMode, t), this.gl[t ? "enable" : "disable"](this.gl.BLEND);
    }, n.prototype.setOffset = function(t) {
      this.updateCheck(n.checkPolygonOffset, t), this.gl[t ? "enable" : "disable"](this.gl.POLYGON_OFFSET_FILL);
    }, n.prototype.setDepthTest = function(t) {
      this.gl[t ? "enable" : "disable"](this.gl.DEPTH_TEST);
    }, n.prototype.setDepthMask = function(t) {
      this.gl.depthMask(t);
    }, n.prototype.setCullFace = function(t) {
      this.gl[t ? "enable" : "disable"](this.gl.CULL_FACE);
    }, n.prototype.setFrontFace = function(t) {
      this.gl.frontFace(this.gl[t ? "CW" : "CCW"]);
    }, n.prototype.setBlendMode = function(t) {
      if (t !== this.blendMode) {
        this.blendMode = t;
        var e = this.blendModes[t], r = this.gl;
        e.length === 2 ? r.blendFunc(e[0], e[1]) : r.blendFuncSeparate(e[0], e[1], e[2], e[3]), e.length === 6 ? (this._blendEq = !0, r.blendEquationSeparate(e[4], e[5])) : this._blendEq && (this._blendEq = !1, r.blendEquationSeparate(r.FUNC_ADD, r.FUNC_ADD));
      }
    }, n.prototype.setPolygonOffset = function(t, e) {
      this.gl.polygonOffset(t, e);
    }, n.prototype.reset = function() {
      this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, !1), this.forceState(this.defaultState), this._blendEq = !0, this.blendMode = -1, this.setBlendMode(0);
    }, n.prototype.updateCheck = function(t, e) {
      var r = this.checks.indexOf(t);
      e && r === -1 ? this.checks.push(t) : !e && r !== -1 && this.checks.splice(r, 1);
    }, n.checkBlendMode = function(t, e) {
      t.setBlendMode(e.blendMode);
    }, n.checkPolygonOffset = function(t, e) {
      t.setPolygonOffset(1, e.polygonOffset);
    }, n.prototype.destroy = function() {
      this.gl = null;
    }, n;
  }()
), TextureGCSystem = (
  /** @class */
  function() {
    function n(t) {
      this.renderer = t, this.count = 0, this.checkCount = 0, this.maxIdle = settings.GC_MAX_IDLE, this.checkCountMax = settings.GC_MAX_CHECK_COUNT, this.mode = settings.GC_MODE;
    }
    return n.prototype.postrender = function() {
      this.renderer.renderingToScreen && (this.count++, this.mode !== GC_MODES.MANUAL && (this.checkCount++, this.checkCount > this.checkCountMax && (this.checkCount = 0, this.run())));
    }, n.prototype.run = function() {
      for (var t = this.renderer.texture, e = t.managedTextures, r = !1, a = 0; a < e.length; a++) {
        var s = e[a];
        !s.framebuffer && this.count - s.touched > this.maxIdle && (t.destroyTexture(s, !0), e[a] = null, r = !0);
      }
      if (r) {
        for (var o = 0, a = 0; a < e.length; a++)
          e[a] !== null && (e[o++] = e[a]);
        e.length = o;
      }
    }, n.prototype.unload = function(t) {
      var e = this.renderer.texture, r = t._texture;
      r && !r.framebuffer && e.destroyTexture(r);
      for (var a = t.children.length - 1; a >= 0; a--)
        this.unload(t.children[a]);
    }, n.prototype.destroy = function() {
      this.renderer = null;
    }, n;
  }()
);
function mapTypeAndFormatToInternalFormat(n) {
  var t, e, r, a, s, o, u, h, l, c, v, d, m, g, y, _, b, S, P, N, E, M, T;
  return "WebGL2RenderingContext" in globalThis && n instanceof globalThis.WebGL2RenderingContext ? T = (t = {}, t[TYPES.UNSIGNED_BYTE] = (e = {}, e[FORMATS.RGBA] = n.RGBA8, e[FORMATS.RGB] = n.RGB8, e[FORMATS.RG] = n.RG8, e[FORMATS.RED] = n.R8, e[FORMATS.RGBA_INTEGER] = n.RGBA8UI, e[FORMATS.RGB_INTEGER] = n.RGB8UI, e[FORMATS.RG_INTEGER] = n.RG8UI, e[FORMATS.RED_INTEGER] = n.R8UI, e[FORMATS.ALPHA] = n.ALPHA, e[FORMATS.LUMINANCE] = n.LUMINANCE, e[FORMATS.LUMINANCE_ALPHA] = n.LUMINANCE_ALPHA, e), t[TYPES.BYTE] = (r = {}, r[FORMATS.RGBA] = n.RGBA8_SNORM, r[FORMATS.RGB] = n.RGB8_SNORM, r[FORMATS.RG] = n.RG8_SNORM, r[FORMATS.RED] = n.R8_SNORM, r[FORMATS.RGBA_INTEGER] = n.RGBA8I, r[FORMATS.RGB_INTEGER] = n.RGB8I, r[FORMATS.RG_INTEGER] = n.RG8I, r[FORMATS.RED_INTEGER] = n.R8I, r), t[TYPES.UNSIGNED_SHORT] = (a = {}, a[FORMATS.RGBA_INTEGER] = n.RGBA16UI, a[FORMATS.RGB_INTEGER] = n.RGB16UI, a[FORMATS.RG_INTEGER] = n.RG16UI, a[FORMATS.RED_INTEGER] = n.R16UI, a[FORMATS.DEPTH_COMPONENT] = n.DEPTH_COMPONENT16, a), t[TYPES.SHORT] = (s = {}, s[FORMATS.RGBA_INTEGER] = n.RGBA16I, s[FORMATS.RGB_INTEGER] = n.RGB16I, s[FORMATS.RG_INTEGER] = n.RG16I, s[FORMATS.RED_INTEGER] = n.R16I, s), t[TYPES.UNSIGNED_INT] = (o = {}, o[FORMATS.RGBA_INTEGER] = n.RGBA32UI, o[FORMATS.RGB_INTEGER] = n.RGB32UI, o[FORMATS.RG_INTEGER] = n.RG32UI, o[FORMATS.RED_INTEGER] = n.R32UI, o[FORMATS.DEPTH_COMPONENT] = n.DEPTH_COMPONENT24, o), t[TYPES.INT] = (u = {}, u[FORMATS.RGBA_INTEGER] = n.RGBA32I, u[FORMATS.RGB_INTEGER] = n.RGB32I, u[FORMATS.RG_INTEGER] = n.RG32I, u[FORMATS.RED_INTEGER] = n.R32I, u), t[TYPES.FLOAT] = (h = {}, h[FORMATS.RGBA] = n.RGBA32F, h[FORMATS.RGB] = n.RGB32F, h[FORMATS.RG] = n.RG32F, h[FORMATS.RED] = n.R32F, h[FORMATS.DEPTH_COMPONENT] = n.DEPTH_COMPONENT32F, h), t[TYPES.HALF_FLOAT] = (l = {}, l[FORMATS.RGBA] = n.RGBA16F, l[FORMATS.RGB] = n.RGB16F, l[FORMATS.RG] = n.RG16F, l[FORMATS.RED] = n.R16F, l), t[TYPES.UNSIGNED_SHORT_5_6_5] = (c = {}, c[FORMATS.RGB] = n.RGB565, c), t[TYPES.UNSIGNED_SHORT_4_4_4_4] = (v = {}, v[FORMATS.RGBA] = n.RGBA4, v), t[TYPES.UNSIGNED_SHORT_5_5_5_1] = (d = {}, d[FORMATS.RGBA] = n.RGB5_A1, d), t[TYPES.UNSIGNED_INT_2_10_10_10_REV] = (m = {}, m[FORMATS.RGBA] = n.RGB10_A2, m[FORMATS.RGBA_INTEGER] = n.RGB10_A2UI, m), t[TYPES.UNSIGNED_INT_10F_11F_11F_REV] = (g = {}, g[FORMATS.RGB] = n.R11F_G11F_B10F, g), t[TYPES.UNSIGNED_INT_5_9_9_9_REV] = (y = {}, y[FORMATS.RGB] = n.RGB9_E5, y), t[TYPES.UNSIGNED_INT_24_8] = (_ = {}, _[FORMATS.DEPTH_STENCIL] = n.DEPTH24_STENCIL8, _), t[TYPES.FLOAT_32_UNSIGNED_INT_24_8_REV] = (b = {}, b[FORMATS.DEPTH_STENCIL] = n.DEPTH32F_STENCIL8, b), t) : T = (S = {}, S[TYPES.UNSIGNED_BYTE] = (P = {}, P[FORMATS.RGBA] = n.RGBA, P[FORMATS.RGB] = n.RGB, P[FORMATS.ALPHA] = n.ALPHA, P[FORMATS.LUMINANCE] = n.LUMINANCE, P[FORMATS.LUMINANCE_ALPHA] = n.LUMINANCE_ALPHA, P), S[TYPES.UNSIGNED_SHORT_5_6_5] = (N = {}, N[FORMATS.RGB] = n.RGB, N), S[TYPES.UNSIGNED_SHORT_4_4_4_4] = (E = {}, E[FORMATS.RGBA] = n.RGBA, E), S[TYPES.UNSIGNED_SHORT_5_5_5_1] = (M = {}, M[FORMATS.RGBA] = n.RGBA, M), S), T;
}
var GLTexture = (
  /** @class */
  /* @__PURE__ */ function() {
    function n(t) {
      this.texture = t, this.width = -1, this.height = -1, this.dirtyId = -1, this.dirtyStyleId = -1, this.mipmap = !1, this.wrapMode = 33071, this.type = TYPES.UNSIGNED_BYTE, this.internalFormat = FORMATS.RGBA, this.samplerType = 0;
    }
    return n;
  }()
), TextureSystem = (
  /** @class */
  function() {
    function n(t) {
      this.renderer = t, this.boundTextures = [], this.currentLocation = -1, this.managedTextures = [], this._unknownBoundTextures = !1, this.unknownTexture = new BaseTexture(), this.hasIntegerTextures = !1;
    }
    return n.prototype.contextChange = function() {
      var t = this.gl = this.renderer.gl;
      this.CONTEXT_UID = this.renderer.CONTEXT_UID, this.webGLVersion = this.renderer.context.webGLVersion, this.internalFormats = mapTypeAndFormatToInternalFormat(t);
      var e = t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS);
      this.boundTextures.length = e;
      for (var r = 0; r < e; r++)
        this.boundTextures[r] = null;
      this.emptyTextures = {};
      var a = new GLTexture(t.createTexture());
      t.bindTexture(t.TEXTURE_2D, a.texture), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, 1, 1, 0, t.RGBA, t.UNSIGNED_BYTE, new Uint8Array(4)), this.emptyTextures[t.TEXTURE_2D] = a, this.emptyTextures[t.TEXTURE_CUBE_MAP] = new GLTexture(t.createTexture()), t.bindTexture(t.TEXTURE_CUBE_MAP, this.emptyTextures[t.TEXTURE_CUBE_MAP].texture);
      for (var r = 0; r < 6; r++)
        t.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X + r, 0, t.RGBA, 1, 1, 0, t.RGBA, t.UNSIGNED_BYTE, null);
      t.texParameteri(t.TEXTURE_CUBE_MAP, t.TEXTURE_MAG_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_CUBE_MAP, t.TEXTURE_MIN_FILTER, t.LINEAR);
      for (var r = 0; r < this.boundTextures.length; r++)
        this.bind(null, r);
    }, n.prototype.bind = function(t, e) {
      e === void 0 && (e = 0);
      var r = this.gl;
      if (t = t?.castToBaseTexture(), t && t.valid && !t.parentTextureArray) {
        t.touched = this.renderer.textureGC.count;
        var a = t._glTextures[this.CONTEXT_UID] || this.initTexture(t);
        this.boundTextures[e] !== t && (this.currentLocation !== e && (this.currentLocation = e, r.activeTexture(r.TEXTURE0 + e)), r.bindTexture(t.target, a.texture)), a.dirtyId !== t.dirtyId ? (this.currentLocation !== e && (this.currentLocation = e, r.activeTexture(r.TEXTURE0 + e)), this.updateTexture(t)) : a.dirtyStyleId !== t.dirtyStyleId && this.updateTextureStyle(t), this.boundTextures[e] = t;
      } else
        this.currentLocation !== e && (this.currentLocation = e, r.activeTexture(r.TEXTURE0 + e)), r.bindTexture(r.TEXTURE_2D, this.emptyTextures[r.TEXTURE_2D].texture), this.boundTextures[e] = null;
    }, n.prototype.reset = function() {
      this._unknownBoundTextures = !0, this.hasIntegerTextures = !1, this.currentLocation = -1;
      for (var t = 0; t < this.boundTextures.length; t++)
        this.boundTextures[t] = this.unknownTexture;
    }, n.prototype.unbind = function(t) {
      var e = this, r = e.gl, a = e.boundTextures;
      if (this._unknownBoundTextures) {
        this._unknownBoundTextures = !1;
        for (var s = 0; s < a.length; s++)
          a[s] === this.unknownTexture && this.bind(null, s);
      }
      for (var s = 0; s < a.length; s++)
        a[s] === t && (this.currentLocation !== s && (r.activeTexture(r.TEXTURE0 + s), this.currentLocation = s), r.bindTexture(t.target, this.emptyTextures[t.target].texture), a[s] = null);
    }, n.prototype.ensureSamplerType = function(t) {
      var e = this, r = e.boundTextures, a = e.hasIntegerTextures, s = e.CONTEXT_UID;
      if (a)
        for (var o = t - 1; o >= 0; --o) {
          var u = r[o];
          if (u) {
            var h = u._glTextures[s];
            h.samplerType !== SAMPLER_TYPES.FLOAT && this.renderer.texture.unbind(u);
          }
        }
    }, n.prototype.initTexture = function(t) {
      var e = new GLTexture(this.gl.createTexture());
      return e.dirtyId = -1, t._glTextures[this.CONTEXT_UID] = e, this.managedTextures.push(t), t.on("dispose", this.destroyTexture, this), e;
    }, n.prototype.initTextureType = function(t, e) {
      var r, a;
      e.internalFormat = (a = (r = this.internalFormats[t.type]) === null || r === void 0 ? void 0 : r[t.format]) !== null && a !== void 0 ? a : t.format, this.webGLVersion === 2 && t.type === TYPES.HALF_FLOAT ? e.type = this.gl.HALF_FLOAT : e.type = t.type;
    }, n.prototype.updateTexture = function(t) {
      var e = t._glTextures[this.CONTEXT_UID];
      if (e) {
        var r = this.renderer;
        if (this.initTextureType(t, e), t.resource && t.resource.upload(r, t, e))
          e.samplerType !== SAMPLER_TYPES.FLOAT && (this.hasIntegerTextures = !0);
        else {
          var a = t.realWidth, s = t.realHeight, o = r.gl;
          (e.width !== a || e.height !== s || e.dirtyId < 0) && (e.width = a, e.height = s, o.texImage2D(t.target, 0, e.internalFormat, a, s, 0, t.format, e.type, null));
        }
        t.dirtyStyleId !== e.dirtyStyleId && this.updateTextureStyle(t), e.dirtyId = t.dirtyId;
      }
    }, n.prototype.destroyTexture = function(t, e) {
      var r = this.gl;
      if (t = t.castToBaseTexture(), t._glTextures[this.CONTEXT_UID] && (this.unbind(t), r.deleteTexture(t._glTextures[this.CONTEXT_UID].texture), t.off("dispose", this.destroyTexture, this), delete t._glTextures[this.CONTEXT_UID], !e)) {
        var a = this.managedTextures.indexOf(t);
        a !== -1 && removeItems(this.managedTextures, a, 1);
      }
    }, n.prototype.updateTextureStyle = function(t) {
      var e = t._glTextures[this.CONTEXT_UID];
      e && ((t.mipmap === MIPMAP_MODES.POW2 || this.webGLVersion !== 2) && !t.isPowerOfTwo ? e.mipmap = !1 : e.mipmap = t.mipmap >= 1, this.webGLVersion !== 2 && !t.isPowerOfTwo ? e.wrapMode = WRAP_MODES.CLAMP : e.wrapMode = t.wrapMode, t.resource && t.resource.style(this.renderer, t, e) || this.setStyle(t, e), e.dirtyStyleId = t.dirtyStyleId);
    }, n.prototype.setStyle = function(t, e) {
      var r = this.gl;
      if (e.mipmap && t.mipmap !== MIPMAP_MODES.ON_MANUAL && r.generateMipmap(t.target), r.texParameteri(t.target, r.TEXTURE_WRAP_S, e.wrapMode), r.texParameteri(t.target, r.TEXTURE_WRAP_T, e.wrapMode), e.mipmap) {
        r.texParameteri(t.target, r.TEXTURE_MIN_FILTER, t.scaleMode === SCALE_MODES.LINEAR ? r.LINEAR_MIPMAP_LINEAR : r.NEAREST_MIPMAP_NEAREST);
        var a = this.renderer.context.extensions.anisotropicFiltering;
        if (a && t.anisotropicLevel > 0 && t.scaleMode === SCALE_MODES.LINEAR) {
          var s = Math.min(t.anisotropicLevel, r.getParameter(a.MAX_TEXTURE_MAX_ANISOTROPY_EXT));
          r.texParameterf(t.target, a.TEXTURE_MAX_ANISOTROPY_EXT, s);
        }
      } else
        r.texParameteri(t.target, r.TEXTURE_MIN_FILTER, t.scaleMode === SCALE_MODES.LINEAR ? r.LINEAR : r.NEAREST);
      r.texParameteri(t.target, r.TEXTURE_MAG_FILTER, t.scaleMode === SCALE_MODES.LINEAR ? r.LINEAR : r.NEAREST);
    }, n.prototype.destroy = function() {
      this.renderer = null;
    }, n;
  }()
), tempMatrix = new Matrix(), AbstractRenderer = (
  /** @class */
  function(n) {
    __extends$i(t, n);
    function t(e, r) {
      e === void 0 && (e = RENDERER_TYPE.UNKNOWN);
      var a = n.call(this) || this;
      return r = Object.assign({}, settings.RENDER_OPTIONS, r), a.options = r, a.type = e, a.screen = new Rectangle(0, 0, r.width, r.height), a.view = r.view || settings.ADAPTER.createCanvas(), a.resolution = r.resolution || settings.RESOLUTION, a.useContextAlpha = r.useContextAlpha, a.autoDensity = !!r.autoDensity, a.preserveDrawingBuffer = r.preserveDrawingBuffer, a.clearBeforeRender = r.clearBeforeRender, a._backgroundColor = 0, a._backgroundColorRgba = [0, 0, 0, 1], a._backgroundColorString = "#000000", a.backgroundColor = r.backgroundColor || a._backgroundColor, a.backgroundAlpha = r.backgroundAlpha, r.transparent !== void 0 && (deprecation("6.0.0", "Option transparent is deprecated, please use backgroundAlpha instead."), a.useContextAlpha = r.transparent, a.backgroundAlpha = r.transparent ? 0 : 1), a._lastObjectRendered = null, a.plugins = {}, a;
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
      var a = this.view.width / this.resolution, s = this.view.height / this.resolution;
      this.screen.width = a, this.screen.height = s, this.autoDensity && (this.view.style.width = a + "px", this.view.style.height = s + "px"), this.emit("resize", a, s);
    }, t.prototype.generateTexture = function(e, r, a, s) {
      r === void 0 && (r = {}), typeof r == "number" && (deprecation("6.1.0", "generateTexture options (scaleMode, resolution, region) are now object options."), r = { scaleMode: r, resolution: a, region: s });
      var o = r.region, u = __rest(r, ["region"]);
      s = o || e.getLocalBounds(null, !0), s.width === 0 && (s.width = 1), s.height === 0 && (s.height = 1);
      var h = RenderTexture.create(__assign({ width: s.width, height: s.height }, u));
      return tempMatrix.tx = -s.x, tempMatrix.ty = -s.y, this.render(e, {
        renderTexture: h,
        clear: !1,
        transform: tempMatrix,
        skipUpdateTransform: !!e.parent
      }), h;
    }, t.prototype.destroy = function(e) {
      for (var r in this.plugins)
        this.plugins[r].destroy(), this.plugins[r] = null;
      e && this.view.parentNode && this.view.parentNode.removeChild(this.view);
      var a = this;
      a.plugins = null, a.type = RENDERER_TYPE.UNKNOWN, a.view = null, a.screen = null, a._tempDisplayObjectParent = null, a.options = null, this._backgroundColorRgba = null, this._backgroundColorString = null, this._lastObjectRendered = null;
    }, Object.defineProperty(t.prototype, "backgroundColor", {
      /**
       * The background color to fill if not transparent
       * @member {number}
       */
      get: function() {
        return this._backgroundColor;
      },
      set: function(e) {
        this._backgroundColor = e, this._backgroundColorString = hex2string(e), hex2rgb(e, this._backgroundColorRgba);
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
  }(i)
), GLBuffer = (
  /** @class */
  /* @__PURE__ */ function() {
    function n(t) {
      this.buffer = t || null, this.updateID = -1, this.byteLength = -1, this.refCount = 0;
    }
    return n;
  }()
), BufferSystem = (
  /** @class */
  function() {
    function n(t) {
      this.renderer = t, this.managedBuffers = {}, this.boundBufferBases = {};
    }
    return n.prototype.destroy = function() {
      this.renderer = null;
    }, n.prototype.contextChange = function() {
      this.disposeAll(!0), this.gl = this.renderer.gl, this.CONTEXT_UID = this.renderer.CONTEXT_UID;
    }, n.prototype.bind = function(t) {
      var e = this, r = e.gl, a = e.CONTEXT_UID, s = t._glBuffers[a] || this.createGLBuffer(t);
      r.bindBuffer(t.type, s.buffer);
    }, n.prototype.bindBufferBase = function(t, e) {
      var r = this, a = r.gl, s = r.CONTEXT_UID;
      if (this.boundBufferBases[e] !== t) {
        var o = t._glBuffers[s] || this.createGLBuffer(t);
        this.boundBufferBases[e] = t, a.bindBufferBase(a.UNIFORM_BUFFER, e, o.buffer);
      }
    }, n.prototype.bindBufferRange = function(t, e, r) {
      var a = this, s = a.gl, o = a.CONTEXT_UID;
      r = r || 0;
      var u = t._glBuffers[o] || this.createGLBuffer(t);
      s.bindBufferRange(s.UNIFORM_BUFFER, e || 0, u.buffer, r * 256, 256);
    }, n.prototype.update = function(t) {
      var e = this, r = e.gl, a = e.CONTEXT_UID, s = t._glBuffers[a];
      if (t._updateID !== s.updateID)
        if (s.updateID = t._updateID, r.bindBuffer(t.type, s.buffer), s.byteLength >= t.data.byteLength)
          r.bufferSubData(t.type, 0, t.data);
        else {
          var o = t.static ? r.STATIC_DRAW : r.DYNAMIC_DRAW;
          s.byteLength = t.data.byteLength, r.bufferData(t.type, t.data, o);
        }
    }, n.prototype.dispose = function(t, e) {
      if (this.managedBuffers[t.id]) {
        delete this.managedBuffers[t.id];
        var r = t._glBuffers[this.CONTEXT_UID], a = this.gl;
        t.disposeRunner.remove(this), r && (e || a.deleteBuffer(r.buffer), delete t._glBuffers[this.CONTEXT_UID]);
      }
    }, n.prototype.disposeAll = function(t) {
      for (var e = Object.keys(this.managedBuffers), r = 0; r < e.length; r++)
        this.dispose(this.managedBuffers[e[r]], t);
    }, n.prototype.createGLBuffer = function(t) {
      var e = this, r = e.CONTEXT_UID, a = e.gl;
      return t._glBuffers[r] = new GLBuffer(a.createBuffer()), this.managedBuffers[t.id] = t, t.disposeRunner.add(this), t._glBuffers[r];
    }, n;
  }()
), Renderer = (
  /** @class */
  function(n) {
    __extends$i(t, n);
    function t(e) {
      var r = n.call(this, RENDERER_TYPE.WEBGL, e) || this;
      return e = r.options, r.gl = null, r.CONTEXT_UID = 0, r.runners = {
        destroy: new Runner("destroy"),
        contextChange: new Runner("contextChange"),
        reset: new Runner("reset"),
        update: new Runner("update"),
        postrender: new Runner("postrender"),
        prerender: new Runner("prerender"),
        resize: new Runner("resize")
      }, r.runners.contextChange.add(r), r.globalUniforms = new UniformGroup({
        projectionMatrix: new Matrix()
      }, !0), r.addSystem(MaskSystem, "mask").addSystem(ContextSystem, "context").addSystem(StateSystem, "state").addSystem(ShaderSystem, "shader").addSystem(TextureSystem, "texture").addSystem(BufferSystem, "buffer").addSystem(GeometrySystem, "geometry").addSystem(FramebufferSystem, "framebuffer").addSystem(ScissorSystem, "scissor").addSystem(StencilSystem, "stencil").addSystem(ProjectionSystem, "projection").addSystem(TextureGCSystem, "textureGC").addSystem(FilterSystem, "filter").addSystem(RenderTextureSystem, "renderTexture").addSystem(BatchSystem, "batch"), r.initPlugins(t.__plugins), r.multisample = void 0, e.context ? r.context.initFromContext(e.context) : r.context.initFromOptions({
        alpha: !!r.useContextAlpha,
        antialias: e.antialias,
        premultipliedAlpha: r.useContextAlpha && r.useContextAlpha !== "notMultiplied",
        stencil: !0,
        preserveDrawingBuffer: e.preserveDrawingBuffer,
        powerPreference: r.options.powerPreference
      }), r.renderingToScreen = !0, sayHello(r.context.webGLVersion === 2 ? "WebGL 2" : "WebGL 1"), r.resize(r.options.width, r.options.height), r;
    }
    return t.create = function(e) {
      if (isWebGLSupported())
        return new t(e);
      throw new Error('WebGL unsupported in this browser, use "pixi.js-legacy" for fallback canvas2d support.');
    }, t.prototype.contextChange = function() {
      var e = this.gl, r;
      if (this.context.webGLVersion === 1) {
        var a = e.getParameter(e.FRAMEBUFFER_BINDING);
        e.bindFramebuffer(e.FRAMEBUFFER, null), r = e.getParameter(e.SAMPLES), e.bindFramebuffer(e.FRAMEBUFFER, a);
      } else {
        var a = e.getParameter(e.DRAW_FRAMEBUFFER_BINDING);
        e.bindFramebuffer(e.DRAW_FRAMEBUFFER, null), r = e.getParameter(e.SAMPLES), e.bindFramebuffer(e.DRAW_FRAMEBUFFER, a);
      }
      r >= MSAA_QUALITY.HIGH ? this.multisample = MSAA_QUALITY.HIGH : r >= MSAA_QUALITY.MEDIUM ? this.multisample = MSAA_QUALITY.MEDIUM : r >= MSAA_QUALITY.LOW ? this.multisample = MSAA_QUALITY.LOW : this.multisample = MSAA_QUALITY.NONE;
    }, t.prototype.addSystem = function(e, r) {
      var a = new e(this);
      if (this[r])
        throw new Error('Whoops! The name "' + r + '" is already in use');
      this[r] = a;
      for (var s in this.runners)
        this.runners[s].add(a);
      return this;
    }, t.prototype.render = function(e, r) {
      var a, s, o, u;
      if (r && (r instanceof RenderTexture ? (deprecation("6.0.0", "Renderer#render arguments changed, use options instead."), a = r, s = arguments[2], o = arguments[3], u = arguments[4]) : (a = r.renderTexture, s = r.clear, o = r.transform, u = r.skipUpdateTransform)), this.renderingToScreen = !a, this.runners.prerender.emit(), this.emit("prerender"), this.projection.transform = o, !this.context.isLost) {
        if (a || (this._lastObjectRendered = e), !u) {
          var h = e.enableTempParent();
          e.updateTransform(), e.disableTempParent(h);
        }
        this.renderTexture.bind(a), this.batch.currentRenderer.start(), (s !== void 0 ? s : this.clearBeforeRender) && this.renderTexture.clear(), e.render(this), this.batch.currentRenderer.flush(), a && a.baseTexture.update(), this.runners.postrender.emit(), this.projection.transform = null, this.emit("postrender");
      }
    }, t.prototype.generateTexture = function(e, r, a, s) {
      r === void 0 && (r = {});
      var o = n.prototype.generateTexture.call(this, e, r, a, s);
      return this.framebuffer.blit(), o;
    }, t.prototype.resize = function(e, r) {
      n.prototype.resize.call(this, e, r), this.runners.resize.emit(this.screen.height, this.screen.width);
    }, t.prototype.reset = function() {
      return this.runners.reset.emit(), this;
    }, t.prototype.clear = function() {
      this.renderTexture.bind(), this.renderTexture.clear();
    }, t.prototype.destroy = function(e) {
      this.runners.destroy.emit();
      for (var r in this.runners)
        this.runners[r].destroy();
      n.prototype.destroy.call(this, e), this.gl = null;
    }, Object.defineProperty(t.prototype, "extract", {
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
    }), t.registerPlugin = function(e, r) {
      deprecation("6.5.0", "Renderer.registerPlugin() has been deprecated, please use extensions.add() instead."), extensions.add({
        name: e,
        type: ExtensionType.RendererPlugin,
        ref: r
      });
    }, t.__plugins = {}, t;
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
      for (var t = 0; t < this.count; t++)
        this.elements[t] = null;
      this.count = 0;
    }, n;
  }()
), ViewableBuffer = (
  /** @class */
  function() {
    function n(t) {
      typeof t == "number" ? this.rawBinaryData = new ArrayBuffer(t) : t instanceof Uint8Array ? this.rawBinaryData = t.buffer : this.rawBinaryData = t, this.uint32View = new Uint32Array(this.rawBinaryData), this.float32View = new Float32Array(this.rawBinaryData);
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
    }), n.prototype.view = function(t) {
      return this[t + "View"];
    }, n.prototype.destroy = function() {
      this.rawBinaryData = null, this._int8View = null, this._uint8View = null, this._int16View = null, this._uint16View = null, this._int32View = null, this.uint32View = null, this.float32View = null;
    }, n.sizeOf = function(t) {
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
    }, n;
  }()
), AbstractBatchRenderer = (
  /** @class */
  function(n) {
    __extends$i(t, n);
    function t(e) {
      var r = n.call(this, e) || this;
      return r.shaderGenerator = null, r.geometryClass = null, r.vertexSize = null, r.state = State.for2d(), r.size = settings.SPRITE_BATCH_SIZE * 4, r._vertexCount = 0, r._indexCount = 0, r._bufferedElements = [], r._bufferedTextures = [], r._bufferSize = 0, r._shader = null, r._packedGeometries = [], r._packedGeometryPoolSize = 2, r._flushId = 0, r._aBuffers = {}, r._iBuffers = {}, r.MAX_TEXTURES = 1, r.renderer.on("prerender", r.onPrerender, r), e.runners.contextChange.add(r), r._dcIndex = 0, r._aIndex = 0, r._iIndex = 0, r._attributeBuffer = null, r._indexBuffer = null, r._tempBoundTextures = [], r;
    }
    return t.prototype.contextChange = function() {
      var e = this.renderer.gl;
      settings.PREFER_ENV === ENV.WEBGL_LEGACY ? this.MAX_TEXTURES = 1 : (this.MAX_TEXTURES = Math.min(e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS), settings.SPRITE_MAX_TEXTURES), this.MAX_TEXTURES = checkMaxIfStatementsInShader(this.MAX_TEXTURES, e)), this._shader = this.shaderGenerator.generateShader(this.MAX_TEXTURES);
      for (var r = 0; r < this._packedGeometryPoolSize; r++)
        this._packedGeometries[r] = new this.geometryClass();
      this.initFlushBuffers();
    }, t.prototype.initFlushBuffers = function() {
      for (var e = t._drawCallPool, r = t._textureArrayPool, a = this.size / 4, s = Math.floor(a / this.MAX_TEXTURES) + 1; e.length < a; )
        e.push(new BatchDrawCall());
      for (; r.length < s; )
        r.push(new BatchTextureArray());
      for (var o = 0; o < this.MAX_TEXTURES; o++)
        this._tempBoundTextures[o] = null;
    }, t.prototype.onPrerender = function() {
      this._flushId = 0;
    }, t.prototype.render = function(e) {
      e._texture.valid && (this._vertexCount + e.vertexData.length / 2 > this.size && this.flush(), this._vertexCount += e.vertexData.length / 2, this._indexCount += e.indices.length, this._bufferedTextures[this._bufferSize] = e._texture.baseTexture, this._bufferedElements[this._bufferSize++] = e);
    }, t.prototype.buildTexturesAndDrawCalls = function() {
      var e = this, r = e._bufferedTextures, a = e.MAX_TEXTURES, s = t._textureArrayPool, o = this.renderer.batch, u = this._tempBoundTextures, h = this.renderer.textureGC.count, l = ++BaseTexture._globalBatch, c = 0, v = s[0], d = 0;
      o.copyBoundTextures(u, a);
      for (var m = 0; m < this._bufferSize; ++m) {
        var g = r[m];
        r[m] = null, g._batchEnabled !== l && (v.count >= a && (o.boundArray(v, u, l, a), this.buildDrawCalls(v, d, m), d = m, v = s[++c], ++l), g._batchEnabled = l, g.touched = h, v.elements[v.count++] = g);
      }
      v.count > 0 && (o.boundArray(v, u, l, a), this.buildDrawCalls(v, d, this._bufferSize), ++c, ++l);
      for (var m = 0; m < u.length; m++)
        u[m] = null;
      BaseTexture._globalBatch = l;
    }, t.prototype.buildDrawCalls = function(e, r, a) {
      var s = this, o = s._bufferedElements, u = s._attributeBuffer, h = s._indexBuffer, l = s.vertexSize, c = t._drawCallPool, v = this._dcIndex, d = this._aIndex, m = this._iIndex, g = c[v];
      g.start = this._iIndex, g.texArray = e;
      for (var y = r; y < a; ++y) {
        var _ = o[y], b = _._texture.baseTexture, S = premultiplyBlendMode[b.alphaMode ? 1 : 0][_.blendMode];
        o[y] = null, r < y && g.blend !== S && (g.size = m - g.start, r = y, g = c[++v], g.texArray = e, g.start = m), this.packInterleavedGeometry(_, u, h, d, m), d += _.vertexData.length / 2 * l, m += _.indices.length, g.blend = S;
      }
      r < a && (g.size = m - g.start, ++v), this._dcIndex = v, this._aIndex = d, this._iIndex = m;
    }, t.prototype.bindAndClearTexArray = function(e) {
      for (var r = this.renderer.texture, a = 0; a < e.count; a++)
        r.bind(e.elements[a], e.ids[a]), e.elements[a] = null;
      e.count = 0;
    }, t.prototype.updateGeometry = function() {
      var e = this, r = e._packedGeometries, a = e._attributeBuffer, s = e._indexBuffer;
      settings.CAN_UPLOAD_SAME_BUFFER ? (r[this._flushId]._buffer.update(a.rawBinaryData), r[this._flushId]._indexBuffer.update(s), this.renderer.geometry.updateBuffers()) : (this._packedGeometryPoolSize <= this._flushId && (this._packedGeometryPoolSize++, r[this._flushId] = new this.geometryClass()), r[this._flushId]._buffer.update(a.rawBinaryData), r[this._flushId]._indexBuffer.update(s), this.renderer.geometry.bind(r[this._flushId]), this.renderer.geometry.updateBuffers(), this._flushId++);
    }, t.prototype.drawBatches = function() {
      for (var e = this._dcIndex, r = this.renderer, a = r.gl, s = r.state, o = t._drawCallPool, u = null, h = 0; h < e; h++) {
        var l = o[h], c = l.texArray, v = l.type, d = l.size, m = l.start, g = l.blend;
        u !== c && (u = c, this.bindAndClearTexArray(c)), this.state.blendMode = g, s.set(this.state), a.drawElements(v, d, a.UNSIGNED_SHORT, m * 2);
      }
    }, t.prototype.flush = function() {
      this._vertexCount !== 0 && (this._attributeBuffer = this.getAttributeBuffer(this._vertexCount), this._indexBuffer = this.getIndexBuffer(this._indexCount), this._aIndex = 0, this._iIndex = 0, this._dcIndex = 0, this.buildTexturesAndDrawCalls(), this.updateGeometry(), this.drawBatches(), this._bufferSize = 0, this._vertexCount = 0, this._indexCount = 0);
    }, t.prototype.start = function() {
      this.renderer.state.set(this.state), this.renderer.texture.ensureSamplerType(this.MAX_TEXTURES), this.renderer.shader.bind(this._shader), settings.CAN_UPLOAD_SAME_BUFFER && this.renderer.geometry.bind(this._packedGeometries[this._flushId]);
    }, t.prototype.stop = function() {
      this.flush();
    }, t.prototype.destroy = function() {
      for (var e = 0; e < this._packedGeometryPoolSize; e++)
        this._packedGeometries[e] && this._packedGeometries[e].destroy();
      this.renderer.off("prerender", this.onPrerender, this), this._aBuffers = null, this._iBuffers = null, this._packedGeometries = null, this._attributeBuffer = null, this._indexBuffer = null, this._shader && (this._shader.destroy(), this._shader = null), n.prototype.destroy.call(this);
    }, t.prototype.getAttributeBuffer = function(e) {
      var r = nextPow2(Math.ceil(e / 8)), a = log2(r), s = r * 8;
      this._aBuffers.length <= a && (this._iBuffers.length = a + 1);
      var o = this._aBuffers[s];
      return o || (this._aBuffers[s] = o = new ViewableBuffer(s * this.vertexSize * 4)), o;
    }, t.prototype.getIndexBuffer = function(e) {
      var r = nextPow2(Math.ceil(e / 12)), a = log2(r), s = r * 12;
      this._iBuffers.length <= a && (this._iBuffers.length = a + 1);
      var o = this._iBuffers[a];
      return o || (this._iBuffers[a] = o = new Uint16Array(s)), o;
    }, t.prototype.packInterleavedGeometry = function(e, r, a, s, o) {
      for (var u = r.uint32View, h = r.float32View, l = s / this.vertexSize, c = e.uvs, v = e.indices, d = e.vertexData, m = e._texture.baseTexture._batchLocation, g = Math.min(e.worldAlpha, 1), y = g < 1 && e._texture.baseTexture.alphaMode ? premultiplyTint(e._tintRGB, g) : e._tintRGB + (g * 255 << 24), _ = 0; _ < d.length; _ += 2)
        h[s++] = d[_], h[s++] = d[_ + 1], h[s++] = c[_], h[s++] = c[_ + 1], u[s++] = y, h[s++] = m;
      for (var _ = 0; _ < v.length; _++)
        a[o++] = l + v[_];
    }, t._drawCallPool = [], t._textureArrayPool = [], t;
  }(ObjectRenderer)
), BatchShaderGenerator = (
  /** @class */
  function() {
    function n(t, e) {
      if (this.vertexSrc = t, this.fragTemplate = e, this.programCache = {}, this.defaultGroupCache = {}, e.indexOf("%count%") < 0)
        throw new Error('Fragment template must contain "%count%".');
      if (e.indexOf("%forloop%") < 0)
        throw new Error('Fragment template must contain "%forloop%".');
    }
    return n.prototype.generateShader = function(t) {
      if (!this.programCache[t]) {
        for (var e = new Int32Array(t), r = 0; r < t; r++)
          e[r] = r;
        this.defaultGroupCache[t] = UniformGroup.from({ uSamplers: e }, !0);
        var a = this.fragTemplate;
        a = a.replace(/%count%/gi, "" + t), a = a.replace(/%forloop%/gi, this.generateSampleSrc(t)), this.programCache[t] = new Program(this.vertexSrc, a);
      }
      var s = {
        tint: new Float32Array([1, 1, 1, 1]),
        translationMatrix: new Matrix(),
        default: this.defaultGroupCache[t]
      };
      return new Shader(this.programCache[t], s);
    }, n.prototype.generateSampleSrc = function(t) {
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
    }, n;
  }()
), BatchGeometry = (
  /** @class */
  function(n) {
    __extends$i(t, n);
    function t(e) {
      e === void 0 && (e = !1);
      var r = n.call(this) || this;
      return r._buffer = new Buffer(null, e, !1), r._indexBuffer = new Buffer(null, e, !0), r.addAttribute("aVertexPosition", r._buffer, 2, !1, TYPES.FLOAT).addAttribute("aTextureCoord", r._buffer, 2, !1, TYPES.FLOAT).addAttribute("aColor", r._buffer, 4, !0, TYPES.UNSIGNED_BYTE).addAttribute("aTextureId", r._buffer, 1, !0, TYPES.FLOAT).addIndex(r._indexBuffer), r;
    }
    return t;
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
    return n.create = function(t) {
      var e = Object.assign({
        vertex: defaultVertex,
        fragment: defaultFragment,
        geometryClass: BatchGeometry,
        vertexSize: 6
      }, t), r = e.vertex, a = e.fragment, s = e.vertexSize, o = e.geometryClass;
      return (
        /** @class */
        function(u) {
          __extends$i(h, u);
          function h(l) {
            var c = u.call(this, l) || this;
            return c.shaderGenerator = new BatchShaderGenerator(r, a), c.geometryClass = o, c.vertexSize = s, c;
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
/*!
 * @pixi/accessibility - v6.5.10
 * Compiled Thu, 06 Jul 2023 15:25:11 UTC
 *
 * @pixi/accessibility is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
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
    function n(t) {
      this.debug = !1, this._isActive = !1, this._isMobileAccessibility = !1, this.pool = [], this.renderId = 0, this.children = [], this.androidUpdateCount = 0, this.androidUpdateFrequency = 500, this._hookDiv = null, (isMobile.tablet || isMobile.phone) && this.createTouchHook();
      var e = document.createElement("div");
      e.style.width = DIV_TOUCH_SIZE + "px", e.style.height = DIV_TOUCH_SIZE + "px", e.style.position = "absolute", e.style.top = DIV_TOUCH_POS_X + "px", e.style.left = DIV_TOUCH_POS_Y + "px", e.style.zIndex = DIV_TOUCH_ZINDEX.toString(), this.div = e, this.renderer = t, this._onKeyDown = this._onKeyDown.bind(this), this._onMouseMove = this._onMouseMove.bind(this), globalThis.addEventListener("keydown", this._onKeyDown, !1);
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
      var t = this, e = document.createElement("button");
      e.style.width = DIV_HOOK_SIZE + "px", e.style.height = DIV_HOOK_SIZE + "px", e.style.position = "absolute", e.style.top = DIV_HOOK_POS_X + "px", e.style.left = DIV_HOOK_POS_Y + "px", e.style.zIndex = DIV_HOOK_ZINDEX.toString(), e.style.backgroundColor = "#FF0000", e.title = "select to enable accessibility for this content", e.addEventListener("focus", function() {
        t._isMobileAccessibility = !0, t.activate(), t.destroyTouchHook();
      }), document.body.appendChild(e), this._hookDiv = e;
    }, n.prototype.destroyTouchHook = function() {
      this._hookDiv && (document.body.removeChild(this._hookDiv), this._hookDiv = null);
    }, n.prototype.activate = function() {
      var t;
      this._isActive || (this._isActive = !0, globalThis.document.addEventListener("mousemove", this._onMouseMove, !0), globalThis.removeEventListener("keydown", this._onKeyDown, !1), this.renderer.on("postrender", this.update, this), (t = this.renderer.view.parentNode) === null || t === void 0 || t.appendChild(this.div));
    }, n.prototype.deactivate = function() {
      var t;
      !this._isActive || this._isMobileAccessibility || (this._isActive = !1, globalThis.document.removeEventListener("mousemove", this._onMouseMove, !0), globalThis.addEventListener("keydown", this._onKeyDown, !1), this.renderer.off("postrender", this.update), (t = this.div.parentNode) === null || t === void 0 || t.removeChild(this.div));
    }, n.prototype.updateAccessibleObjects = function(t) {
      if (!(!t.visible || !t.accessibleChildren)) {
        t.accessible && t.interactive && (t._accessibleActive || this.addChild(t), t.renderId = this.renderId);
        var e = t.children;
        if (e)
          for (var r = 0; r < e.length; r++)
            this.updateAccessibleObjects(e[r]);
      }
    }, n.prototype.update = function() {
      var t = performance.now();
      if (!(isMobile.android.device && t < this.androidUpdateCount) && (this.androidUpdateCount = t + this.androidUpdateFrequency, !!this.renderer.renderingToScreen)) {
        this.renderer._lastObjectRendered && this.updateAccessibleObjects(this.renderer._lastObjectRendered);
        var e = this.renderer.view.getBoundingClientRect(), r = e.left, a = e.top, s = e.width, o = e.height, u = this.renderer, h = u.width, l = u.height, c = u.resolution, v = s / h * c, d = o / l * c, m = this.div;
        m.style.left = r + "px", m.style.top = a + "px", m.style.width = h + "px", m.style.height = l + "px";
        for (var g = 0; g < this.children.length; g++) {
          var y = this.children[g];
          if (y.renderId !== this.renderId)
            y._accessibleActive = !1, removeItems(this.children, g, 1), this.div.removeChild(y._accessibleDiv), this.pool.push(y._accessibleDiv), y._accessibleDiv = null, g--;
          else {
            m = y._accessibleDiv;
            var _ = y.hitArea, b = y.worldTransform;
            y.hitArea ? (m.style.left = (b.tx + _.x * b.a) * v + "px", m.style.top = (b.ty + _.y * b.d) * d + "px", m.style.width = _.width * b.a * v + "px", m.style.height = _.height * b.d * d + "px") : (_ = y.getBounds(), this.capHitArea(_), m.style.left = _.x * v + "px", m.style.top = _.y * d + "px", m.style.width = _.width * v + "px", m.style.height = _.height * d + "px", m.title !== y.accessibleTitle && y.accessibleTitle !== null && (m.title = y.accessibleTitle), m.getAttribute("aria-label") !== y.accessibleHint && y.accessibleHint !== null && m.setAttribute("aria-label", y.accessibleHint)), (y.accessibleTitle !== m.title || y.tabIndex !== m.tabIndex) && (m.title = y.accessibleTitle, m.tabIndex = y.tabIndex, this.debug && this.updateDebugHTML(m));
          }
        }
        this.renderId++;
      }
    }, n.prototype.updateDebugHTML = function(t) {
      t.innerHTML = "type: " + t.type + "</br> title : " + t.title + "</br> tabIndex: " + t.tabIndex;
    }, n.prototype.capHitArea = function(t) {
      t.x < 0 && (t.width += t.x, t.x = 0), t.y < 0 && (t.height += t.y, t.y = 0);
      var e = this.renderer, r = e.width, a = e.height;
      t.x + t.width > r && (t.width = r - t.x), t.y + t.height > a && (t.height = a - t.y);
    }, n.prototype.addChild = function(t) {
      var e = this.pool.pop();
      e || (e = document.createElement("button"), e.style.width = DIV_TOUCH_SIZE + "px", e.style.height = DIV_TOUCH_SIZE + "px", e.style.backgroundColor = this.debug ? "rgba(255,255,255,0.5)" : "transparent", e.style.position = "absolute", e.style.zIndex = DIV_TOUCH_ZINDEX.toString(), e.style.borderStyle = "none", navigator.userAgent.toLowerCase().indexOf("chrome") > -1 ? e.setAttribute("aria-live", "off") : e.setAttribute("aria-live", "polite"), navigator.userAgent.match(/rv:.*Gecko\//) ? e.setAttribute("aria-relevant", "additions") : e.setAttribute("aria-relevant", "text"), e.addEventListener("click", this._onClick.bind(this)), e.addEventListener("focus", this._onFocus.bind(this)), e.addEventListener("focusout", this._onFocusOut.bind(this))), e.style.pointerEvents = t.accessiblePointerEvents, e.type = t.accessibleType, t.accessibleTitle && t.accessibleTitle !== null ? e.title = t.accessibleTitle : (!t.accessibleHint || t.accessibleHint === null) && (e.title = "displayObject " + t.tabIndex), t.accessibleHint && t.accessibleHint !== null && e.setAttribute("aria-label", t.accessibleHint), this.debug && this.updateDebugHTML(e), t._accessibleActive = !0, t._accessibleDiv = e, e.displayObject = t, this.children.push(t), this.div.appendChild(t._accessibleDiv), t._accessibleDiv.tabIndex = t.tabIndex;
    }, n.prototype._onClick = function(t) {
      var e = this.renderer.plugins.interaction, r = t.target.displayObject, a = e.eventData;
      e.dispatchEvent(r, "click", a), e.dispatchEvent(r, "pointertap", a), e.dispatchEvent(r, "tap", a);
    }, n.prototype._onFocus = function(t) {
      t.target.getAttribute("aria-live") || t.target.setAttribute("aria-live", "assertive");
      var e = this.renderer.plugins.interaction, r = t.target.displayObject, a = e.eventData;
      e.dispatchEvent(r, "mouseover", a);
    }, n.prototype._onFocusOut = function(t) {
      t.target.getAttribute("aria-live") || t.target.setAttribute("aria-live", "polite");
      var e = this.renderer.plugins.interaction, r = t.target.displayObject, a = e.eventData;
      e.dispatchEvent(r, "mouseout", a);
    }, n.prototype._onKeyDown = function(t) {
      t.keyCode === KEY_CODE_TAB && this.activate();
    }, n.prototype._onMouseMove = function(t) {
      t.movementX === 0 && t.movementY === 0 || this.deactivate();
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
/*!
 * @pixi/interaction - v6.5.10
 * Compiled Thu, 06 Jul 2023 15:25:11 UTC
 *
 * @pixi/interaction is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
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
    }), n.prototype.getLocalPosition = function(t, e, r) {
      return t.worldTransform.applyInverse(r || this.global, e);
    }, n.prototype.copyEvent = function(t) {
      "isPrimary" in t && t.isPrimary && (this.isPrimary = !0), this.button = "button" in t && t.button;
      var e = "buttons" in t && t.buttons;
      this.buttons = Number.isInteger(e) ? e : "which" in t && t.which, this.width = "width" in t && t.width, this.height = "height" in t && t.height, this.tiltX = "tiltX" in t && t.tiltX, this.tiltY = "tiltY" in t && t.tiltY, this.pointerType = "pointerType" in t && t.pointerType, this.pressure = "pressure" in t && t.pressure, this.rotationAngle = "rotationAngle" in t && t.rotationAngle, this.twist = "twist" in t && t.twist || 0, this.tangentialPressure = "tangentialPressure" in t && t.tangentialPressure || 0;
    }, n.prototype.reset = function() {
      this.isPrimary = !1;
    }, n;
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
var extendStatics$h = function(n, t) {
  return extendStatics$h = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, r) {
    e.__proto__ = r;
  } || function(e, r) {
    for (var a in r)
      r.hasOwnProperty(a) && (e[a] = r[a]);
  }, extendStatics$h(n, t);
};
function __extends$h(n, t) {
  extendStatics$h(n, t);
  function e() {
    this.constructor = n;
  }
  n.prototype = t === null ? Object.create(t) : (e.prototype = t.prototype, new e());
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
    function n(t) {
      this._pointerId = t, this._flags = n.FLAGS.NONE;
    }
    return n.prototype._doSet = function(t, e) {
      e ? this._flags = this._flags | t : this._flags = this._flags & ~t;
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
      set: function(t) {
        this._flags = t;
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
      set: function(t) {
        this._doSet(n.FLAGS.OVER, t);
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
      set: function(t) {
        this._doSet(n.FLAGS.RIGHT_DOWN, t);
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
      set: function(t) {
        this._doSet(n.FLAGS.LEFT_DOWN, t);
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
    return n.prototype.recursiveFindHit = function(t, e, r, a, s) {
      var o;
      if (!e || !e.visible)
        return !1;
      var u = t.data.global;
      s = e.interactive || s;
      var h = !1, l = s, c = !0;
      if (e.hitArea)
        a && (e.worldTransform.applyInverse(u, this._tempPoint), e.hitArea.contains(this._tempPoint.x, this._tempPoint.y) ? h = !0 : (a = !1, c = !1)), l = !1;
      else if (e._mask && a) {
        var v = e._mask.isMaskData ? e._mask.maskObject : e._mask;
        v && !(!((o = v.containsPoint) === null || o === void 0) && o.call(v, u)) && (a = !1);
      }
      if (c && e.interactiveChildren && e.children)
        for (var d = e.children, m = d.length - 1; m >= 0; m--) {
          var g = d[m], y = this.recursiveFindHit(t, g, r, a, l);
          if (y) {
            if (!g.parent)
              continue;
            l = !1, y && (t.target && (a = !1), h = !0);
          }
        }
      return s && (a && !t.target && !e.hitArea && e.containsPoint && e.containsPoint(u) && (h = !0), e.interactive && (h && !t.target && (t.target = e), r && r(t, e, !!h))), h;
    }, n.prototype.findHit = function(t, e, r, a) {
      this.recursiveFindHit(t, e, r, a, !1);
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
    __extends$h(t, n);
    function t(e, r) {
      var a = n.call(this) || this;
      return r = r || {}, a.renderer = e, a.autoPreventDefault = r.autoPreventDefault !== void 0 ? r.autoPreventDefault : !0, a.interactionFrequency = r.interactionFrequency || 10, a.mouse = new InteractionData(), a.mouse.identifier = MOUSE_POINTER_ID, a.mouse.global.set(-999999), a.activeInteractionData = {}, a.activeInteractionData[MOUSE_POINTER_ID] = a.mouse, a.interactionDataPool = [], a.eventData = new InteractionEvent(), a.interactionDOMElement = null, a.moveWhenInside = !1, a.eventsAdded = !1, a.tickerAdded = !1, a.mouseOverRenderer = !("PointerEvent" in globalThis), a.supportsTouchEvents = "ontouchstart" in globalThis, a.supportsPointerEvents = !!globalThis.PointerEvent, a.onPointerUp = a.onPointerUp.bind(a), a.processPointerUp = a.processPointerUp.bind(a), a.onPointerCancel = a.onPointerCancel.bind(a), a.processPointerCancel = a.processPointerCancel.bind(a), a.onPointerDown = a.onPointerDown.bind(a), a.processPointerDown = a.processPointerDown.bind(a), a.onPointerMove = a.onPointerMove.bind(a), a.processPointerMove = a.processPointerMove.bind(a), a.onPointerOut = a.onPointerOut.bind(a), a.processPointerOverOut = a.processPointerOverOut.bind(a), a.onPointerOver = a.onPointerOver.bind(a), a.cursorStyles = {
        default: "inherit",
        pointer: "pointer"
      }, a.currentCursorMode = null, a.cursor = null, a.resolution = 1, a.delayedEvents = [], a.search = new TreeSearch(), a._tempDisplayObject = new TemporaryDisplayObject(), a._eventListenerOptions = { capture: !0, passive: !1 }, a._useSystemTicker = r.useSystemTicker !== void 0 ? r.useSystemTicker : !0, a.setTargetElement(a.renderer.view, a.renderer.resolution), a;
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
      return hitTestEvent.target = null, hitTestEvent.data.global = e, r || (r = this.lastObjectRendered), this.processInteractive(hitTestEvent, r, null, !0), hitTestEvent.target;
    }, t.prototype.setTargetElement = function(e, r) {
      r === void 0 && (r = 1), this.removeTickerListener(), this.removeEvents(), this.interactionDOMElement = e, this.resolution = r, this.addEvents(), this.addTickerListener();
    }, t.prototype.addTickerListener = function() {
      this.tickerAdded || !this.interactionDOMElement || !this._useSystemTicker || (Ticker.system.add(this.tickerUpdate, this, UPDATE_PRIORITY.INTERACTION), this.tickerAdded = !0);
    }, t.prototype.removeTickerListener = function() {
      this.tickerAdded && (Ticker.system.remove(this.tickerUpdate, this), this.tickerAdded = !1);
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
              var a = this.configureInteractionEventForDOMEvent(this.eventData, r.originalEvent, r);
              this.processInteractive(a, this.lastObjectRendered, this.processPointerOverOut, !0);
            }
          }
        this.setCursorMode(this.cursor);
      }
    }, t.prototype.setCursorMode = function(e) {
      e = e || "default";
      var r = !0;
      if (globalThis.OffscreenCanvas && this.interactionDOMElement instanceof OffscreenCanvas && (r = !1), this.currentCursorMode !== e) {
        this.currentCursorMode = e;
        var a = this.cursorStyles[e];
        if (a)
          switch (typeof a) {
            case "string":
              r && (this.interactionDOMElement.style.cursor = a);
              break;
            case "function":
              a(e);
              break;
            case "object":
              r && Object.assign(this.interactionDOMElement.style, a);
              break;
          }
        else r && typeof e == "string" && !Object.prototype.hasOwnProperty.call(this.cursorStyles, e) && (this.interactionDOMElement.style.cursor = e);
      }
    }, t.prototype.dispatchEvent = function(e, r, a) {
      (!a.stopPropagationHint || e === a.stopsPropagatingAt) && (a.currentTarget = e, a.type = r, e.emit(r, a), e[r] && e[r](a));
    }, t.prototype.delayDispatchEvent = function(e, r, a) {
      this.delayedEvents.push({ displayObject: e, eventString: r, eventData: a });
    }, t.prototype.mapPositionToPoint = function(e, r, a) {
      var s;
      this.interactionDOMElement.parentElement ? s = this.interactionDOMElement.getBoundingClientRect() : s = {
        x: 0,
        y: 0,
        width: this.interactionDOMElement.width,
        height: this.interactionDOMElement.height,
        left: 0,
        top: 0
      };
      var o = 1 / this.resolution;
      e.x = (r - s.left) * (this.interactionDOMElement.width / s.width) * o, e.y = (a - s.top) * (this.interactionDOMElement.height / s.height) * o;
    }, t.prototype.processInteractive = function(e, r, a, s) {
      var o = this.search.findHit(e, r, a, s), u = this.delayedEvents;
      if (!u.length)
        return o;
      e.stopPropagationHint = !1;
      var h = u.length;
      this.delayedEvents = [];
      for (var l = 0; l < h; l++) {
        var c = u[l], v = c.displayObject, d = c.eventString, m = c.eventData;
        m.stopsPropagatingAt === v && (m.stopPropagationHint = !0), this.dispatchEvent(v, d, m);
      }
      return o;
    }, t.prototype.onPointerDown = function(e) {
      if (!(this.supportsTouchEvents && e.pointerType === "touch")) {
        var r = this.normalizeToPointerData(e);
        if (this.autoPreventDefault && r[0].isNormalized) {
          var a = e.cancelable || !("cancelable" in e);
          a && e.preventDefault();
        }
        for (var s = r.length, o = 0; o < s; o++) {
          var u = r[o], h = this.getInteractionDataForPointerId(u), l = this.configureInteractionEventForDOMEvent(this.eventData, u, h);
          if (l.data.originalEvent = e, this.processInteractive(l, this.lastObjectRendered, this.processPointerDown, !0), this.emit("pointerdown", l), u.pointerType === "touch")
            this.emit("touchstart", l);
          else if (u.pointerType === "mouse" || u.pointerType === "pen") {
            var c = u.button === 2;
            this.emit(c ? "rightdown" : "mousedown", this.eventData);
          }
        }
      }
    }, t.prototype.processPointerDown = function(e, r, a) {
      var s = e.data, o = e.data.identifier;
      if (a) {
        if (r.trackedPointers[o] || (r.trackedPointers[o] = new InteractionTrackingData(o)), this.dispatchEvent(r, "pointerdown", e), s.pointerType === "touch")
          this.dispatchEvent(r, "touchstart", e);
        else if (s.pointerType === "mouse" || s.pointerType === "pen") {
          var u = s.button === 2;
          u ? r.trackedPointers[o].rightDown = !0 : r.trackedPointers[o].leftDown = !0, this.dispatchEvent(r, u ? "rightdown" : "mousedown", e);
        }
      }
    }, t.prototype.onPointerComplete = function(e, r, a) {
      var s = this.normalizeToPointerData(e), o = s.length, u = e.target;
      e.composedPath && e.composedPath().length > 0 && (u = e.composedPath()[0]);
      for (var h = u !== this.interactionDOMElement ? "outside" : "", l = 0; l < o; l++) {
        var c = s[l], v = this.getInteractionDataForPointerId(c), d = this.configureInteractionEventForDOMEvent(this.eventData, c, v);
        if (d.data.originalEvent = e, this.processInteractive(d, this.lastObjectRendered, a, r || !h), this.emit(r ? "pointercancel" : "pointerup" + h, d), c.pointerType === "mouse" || c.pointerType === "pen") {
          var m = c.button === 2;
          this.emit(m ? "rightup" + h : "mouseup" + h, d);
        } else c.pointerType === "touch" && (this.emit(r ? "touchcancel" : "touchend" + h, d), this.releaseInteractionDataForPointerId(c.pointerId));
      }
    }, t.prototype.onPointerCancel = function(e) {
      this.supportsTouchEvents && e.pointerType === "touch" || this.onPointerComplete(e, !0, this.processPointerCancel);
    }, t.prototype.processPointerCancel = function(e, r) {
      var a = e.data, s = e.data.identifier;
      r.trackedPointers[s] !== void 0 && (delete r.trackedPointers[s], this.dispatchEvent(r, "pointercancel", e), a.pointerType === "touch" && this.dispatchEvent(r, "touchcancel", e));
    }, t.prototype.onPointerUp = function(e) {
      this.supportsTouchEvents && e.pointerType === "touch" || this.onPointerComplete(e, !1, this.processPointerUp);
    }, t.prototype.processPointerUp = function(e, r, a) {
      var s = e.data, o = e.data.identifier, u = r.trackedPointers[o], h = s.pointerType === "touch", l = s.pointerType === "mouse" || s.pointerType === "pen", c = !1;
      if (l) {
        var v = s.button === 2, d = InteractionTrackingData.FLAGS, m = v ? d.RIGHT_DOWN : d.LEFT_DOWN, g = u !== void 0 && u.flags & m;
        a ? (this.dispatchEvent(r, v ? "rightup" : "mouseup", e), g && (this.dispatchEvent(r, v ? "rightclick" : "click", e), c = !0)) : g && this.dispatchEvent(r, v ? "rightupoutside" : "mouseupoutside", e), u && (v ? u.rightDown = !1 : u.leftDown = !1);
      }
      a ? (this.dispatchEvent(r, "pointerup", e), h && this.dispatchEvent(r, "touchend", e), u && ((!l || c) && this.dispatchEvent(r, "pointertap", e), h && (this.dispatchEvent(r, "tap", e), u.over = !1))) : u && (this.dispatchEvent(r, "pointerupoutside", e), h && this.dispatchEvent(r, "touchendoutside", e)), u && u.none && delete r.trackedPointers[o];
    }, t.prototype.onPointerMove = function(e) {
      if (!(this.supportsTouchEvents && e.pointerType === "touch")) {
        var r = this.normalizeToPointerData(e);
        (r[0].pointerType === "mouse" || r[0].pointerType === "pen") && (this._didMove = !0, this.cursor = null);
        for (var a = r.length, s = 0; s < a; s++) {
          var o = r[s], u = this.getInteractionDataForPointerId(o), h = this.configureInteractionEventForDOMEvent(this.eventData, o, u);
          h.data.originalEvent = e, this.processInteractive(h, this.lastObjectRendered, this.processPointerMove, !0), this.emit("pointermove", h), o.pointerType === "touch" && this.emit("touchmove", h), (o.pointerType === "mouse" || o.pointerType === "pen") && this.emit("mousemove", h);
        }
        r[0].pointerType === "mouse" && this.setCursorMode(this.cursor);
      }
    }, t.prototype.processPointerMove = function(e, r, a) {
      var s = e.data, o = s.pointerType === "touch", u = s.pointerType === "mouse" || s.pointerType === "pen";
      u && this.processPointerOverOut(e, r, a), (!this.moveWhenInside || a) && (this.dispatchEvent(r, "pointermove", e), o && this.dispatchEvent(r, "touchmove", e), u && this.dispatchEvent(r, "mousemove", e));
    }, t.prototype.onPointerOut = function(e) {
      if (!(this.supportsTouchEvents && e.pointerType === "touch")) {
        var r = this.normalizeToPointerData(e), a = r[0];
        a.pointerType === "mouse" && (this.mouseOverRenderer = !1, this.setCursorMode(null));
        var s = this.getInteractionDataForPointerId(a), o = this.configureInteractionEventForDOMEvent(this.eventData, a, s);
        o.data.originalEvent = a, this.processInteractive(o, this.lastObjectRendered, this.processPointerOverOut, !1), this.emit("pointerout", o), a.pointerType === "mouse" || a.pointerType === "pen" ? this.emit("mouseout", o) : this.releaseInteractionDataForPointerId(s.identifier);
      }
    }, t.prototype.processPointerOverOut = function(e, r, a) {
      var s = e.data, o = e.data.identifier, u = s.pointerType === "mouse" || s.pointerType === "pen", h = r.trackedPointers[o];
      a && !h && (h = r.trackedPointers[o] = new InteractionTrackingData(o)), h !== void 0 && (a && this.mouseOverRenderer ? (h.over || (h.over = !0, this.delayDispatchEvent(r, "pointerover", e), u && this.delayDispatchEvent(r, "mouseover", e)), u && this.cursor === null && (this.cursor = r.cursor)) : h.over && (h.over = !1, this.dispatchEvent(r, "pointerout", this.eventData), u && this.dispatchEvent(r, "mouseout", e), h.none && delete r.trackedPointers[o]));
    }, t.prototype.onPointerOver = function(e) {
      if (!(this.supportsTouchEvents && e.pointerType === "touch")) {
        var r = this.normalizeToPointerData(e), a = r[0], s = this.getInteractionDataForPointerId(a), o = this.configureInteractionEventForDOMEvent(this.eventData, a, s);
        o.data.originalEvent = a, a.pointerType === "mouse" && (this.mouseOverRenderer = !0), this.emit("pointerover", o), (a.pointerType === "mouse" || a.pointerType === "pen") && this.emit("mouseover", o);
      }
    }, t.prototype.getInteractionDataForPointerId = function(e) {
      var r = e.pointerId, a;
      return r === MOUSE_POINTER_ID || e.pointerType === "mouse" ? a = this.mouse : this.activeInteractionData[r] ? a = this.activeInteractionData[r] : (a = this.interactionDataPool.pop() || new InteractionData(), a.identifier = r, this.activeInteractionData[r] = a), a.copyEvent(e), a;
    }, t.prototype.releaseInteractionDataForPointerId = function(e) {
      var r = this.activeInteractionData[e];
      r && (delete this.activeInteractionData[e], r.reset(), this.interactionDataPool.push(r));
    }, t.prototype.configureInteractionEventForDOMEvent = function(e, r, a) {
      return e.data = a, this.mapPositionToPoint(a.global, r.clientX, r.clientY), r.pointerType === "touch" && (r.globalX = a.global.x, r.globalY = a.global.y), a.originalEvent = r, e.reset(), e;
    }, t.prototype.normalizeToPointerData = function(e) {
      var r = [];
      if (this.supportsTouchEvents && e instanceof TouchEvent)
        for (var a = 0, s = e.changedTouches.length; a < s; a++) {
          var o = e.changedTouches[a];
          typeof o.button > "u" && (o.button = e.touches.length ? 1 : 0), typeof o.buttons > "u" && (o.buttons = e.touches.length ? 1 : 0), typeof o.isPrimary > "u" && (o.isPrimary = e.touches.length === 1 && e.type === "touchstart"), typeof o.width > "u" && (o.width = o.radiusX || 1), typeof o.height > "u" && (o.height = o.radiusY || 1), typeof o.tiltX > "u" && (o.tiltX = 0), typeof o.tiltY > "u" && (o.tiltY = 0), typeof o.pointerType > "u" && (o.pointerType = "touch"), typeof o.pointerId > "u" && (o.pointerId = o.identifier || 0), typeof o.pressure > "u" && (o.pressure = o.force || 0.5), typeof o.twist > "u" && (o.twist = 0), typeof o.tangentialPressure > "u" && (o.tangentialPressure = 0), typeof o.layerX > "u" && (o.layerX = o.offsetX = o.clientX), typeof o.layerY > "u" && (o.layerY = o.offsetY = o.clientY), o.isNormalized = !0, r.push(o);
        }
      else if (!globalThis.MouseEvent || e instanceof MouseEvent && (!this.supportsPointerEvents || !(e instanceof globalThis.PointerEvent))) {
        var u = e;
        typeof u.isPrimary > "u" && (u.isPrimary = !0), typeof u.width > "u" && (u.width = 1), typeof u.height > "u" && (u.height = 1), typeof u.tiltX > "u" && (u.tiltX = 0), typeof u.tiltY > "u" && (u.tiltY = 0), typeof u.pointerType > "u" && (u.pointerType = "mouse"), typeof u.pointerId > "u" && (u.pointerId = MOUSE_POINTER_ID), typeof u.pressure > "u" && (u.pressure = 0.5), typeof u.twist > "u" && (u.twist = 0), typeof u.tangentialPressure > "u" && (u.tangentialPressure = 0), u.isNormalized = !0, r.push(u);
      } else
        r.push(e);
      return r;
    }, t.prototype.destroy = function() {
      this.removeEvents(), this.removeTickerListener(), this.removeAllListeners(), this.renderer = null, this.mouse = null, this.eventData = null, this.interactionDOMElement = null, this.onPointerDown = null, this.processPointerDown = null, this.onPointerUp = null, this.processPointerUp = null, this.onPointerCancel = null, this.processPointerCancel = null, this.onPointerMove = null, this.processPointerMove = null, this.onPointerOut = null, this.processPointerOverOut = null, this.onPointerOver = null, this.search = null;
    }, t.extension = {
      name: "interaction",
      type: [
        ExtensionType.RendererPlugin,
        ExtensionType.CanvasRendererPlugin
      ]
    }, t;
  }(i)
);
/*!
 * @pixi/extract - v6.5.10
 * Compiled Thu, 06 Jul 2023 15:25:11 UTC
 *
 * @pixi/extract is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
var TEMP_RECT = new Rectangle(), BYTES_PER_PIXEL = 4, Extract = (
  /** @class */
  function() {
    function n(t) {
      this.renderer = t;
    }
    return n.prototype.image = function(t, e, r) {
      var a = new Image();
      return a.src = this.base64(t, e, r), a;
    }, n.prototype.base64 = function(t, e, r) {
      return this.canvas(t).toDataURL(e, r);
    }, n.prototype.canvas = function(t, e) {
      var r = this._rawPixels(t, e), a = r.pixels, s = r.width, o = r.height, u = r.flipY, h = new CanvasRenderTarget(s, o, 1), l = h.context.getImageData(0, 0, s, o);
      if (n.arrayPostDivide(a, l.data), h.context.putImageData(l, 0, 0), u) {
        var c = new CanvasRenderTarget(h.width, h.height, 1);
        c.context.scale(1, -1), c.context.drawImage(h.canvas, 0, -o), h.destroy(), h = c;
      }
      return h.canvas;
    }, n.prototype.pixels = function(t, e) {
      var r = this._rawPixels(t, e).pixels;
      return n.arrayPostDivide(r, r), r;
    }, n.prototype._rawPixels = function(t, e) {
      var r = this.renderer, a, s = !1, o, u = !1;
      if (t)
        if (t instanceof RenderTexture)
          o = t;
        else {
          var h = r.context.webGLVersion >= 2 ? r.multisample : MSAA_QUALITY.NONE;
          if (o = this.renderer.generateTexture(t, { multisample: h }), h !== MSAA_QUALITY.NONE) {
            var l = RenderTexture.create({
              width: o.width,
              height: o.height
            });
            r.framebuffer.bind(o.framebuffer), r.framebuffer.blit(l.framebuffer), r.framebuffer.bind(null), o.destroy(!0), o = l;
          }
          u = !0;
        }
      o ? (a = o.baseTexture.resolution, e = e ?? o.frame, s = !1, r.renderTexture.bind(o)) : (a = r.resolution, e || (e = TEMP_RECT, e.width = r.width, e.height = r.height), s = !0, r.renderTexture.bind(null));
      var c = Math.round(e.width * a), v = Math.round(e.height * a), d = new Uint8Array(BYTES_PER_PIXEL * c * v), m = r.gl;
      return m.readPixels(Math.round(e.x * a), Math.round(e.y * a), c, v, m.RGBA, m.UNSIGNED_BYTE, d), u && o.destroy(!0), { pixels: d, width: c, height: v, flipY: s };
    }, n.prototype.destroy = function() {
      this.renderer = null;
    }, n.arrayPostDivide = function(t, e) {
      for (var r = 0; r < t.length; r += 4) {
        var a = e[r + 3] = t[r + 3];
        a !== 0 ? (e[r] = Math.round(Math.min(t[r] * 255 / a, 255)), e[r + 1] = Math.round(Math.min(t[r + 1] * 255 / a, 255)), e[r + 2] = Math.round(Math.min(t[r + 2] * 255 / a, 255))) : (e[r] = t[r], e[r + 1] = t[r + 1], e[r + 2] = t[r + 2]);
      }
    }, n.extension = {
      name: "extract",
      type: ExtensionType.RendererPlugin
    }, n;
  }()
);
/*!
 * @pixi/loaders - v6.5.10
 * Compiled Thu, 06 Jul 2023 15:25:11 UTC
 *
 * @pixi/loaders is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
var SignalBinding = (
  /** @class */
  function() {
    function n(t, e, r) {
      e === void 0 && (e = !1), this._fn = t, this._once = e, this._thisArg = r, this._next = this._prev = this._owner = null;
    }
    return n.prototype.detach = function() {
      return this._owner === null ? !1 : (this._owner.detach(this), !0);
    }, n;
  }()
);
function _addSignalBinding(n, t) {
  return n._head ? (n._tail._next = t, t._prev = n._tail, n._tail = t) : (n._head = t, n._tail = t), t._owner = n, t;
}
var Signal = (
  /** @class */
  function() {
    function n() {
      this._head = this._tail = void 0;
    }
    return n.prototype.handlers = function(t) {
      t === void 0 && (t = !1);
      var e = this._head;
      if (t)
        return !!e;
      for (var r = []; e; )
        r.push(e), e = e._next;
      return r;
    }, n.prototype.has = function(t) {
      if (!(t instanceof SignalBinding))
        throw new Error("MiniSignal#has(): First arg must be a SignalBinding object.");
      return t._owner === this;
    }, n.prototype.dispatch = function() {
      for (var t = arguments, e = [], r = 0; r < arguments.length; r++)
        e[r] = t[r];
      var a = this._head;
      if (!a)
        return !1;
      for (; a; )
        a._once && this.detach(a), a._fn.apply(a._thisArg, e), a = a._next;
      return !0;
    }, n.prototype.add = function(t, e) {
      if (e === void 0 && (e = null), typeof t != "function")
        throw new Error("MiniSignal#add(): First arg must be a Function.");
      return _addSignalBinding(this, new SignalBinding(t, !1, e));
    }, n.prototype.once = function(t, e) {
      if (e === void 0 && (e = null), typeof t != "function")
        throw new Error("MiniSignal#once(): First arg must be a Function.");
      return _addSignalBinding(this, new SignalBinding(t, !0, e));
    }, n.prototype.detach = function(t) {
      if (!(t instanceof SignalBinding))
        throw new Error("MiniSignal#detach(): First arg must be a SignalBinding object.");
      return t._owner !== this ? this : (t._prev && (t._prev._next = t._next), t._next && (t._next._prev = t._prev), t === this._head ? (this._head = t._next, t._next === null && (this._tail = null)) : t === this._tail && (this._tail = t._prev, this._tail._next = null), t._owner = null, this);
    }, n.prototype.detachAll = function() {
      var t = this._head;
      if (!t)
        return this;
      for (this._head = this._tail = null; t; )
        t._owner = null, t = t._next;
      return this;
    }, n;
  }()
);
function parseUri(n, t) {
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
  }, r = e.parser[t.strictMode ? "strict" : "loose"].exec(n), a = {}, s = 14; s--; )
    a[e.key[s]] = r[s] || "";
  return a[e.q.name] = {}, a[e.key[12]].replace(e.q.parser, function(o, u, h) {
    u && (a[e.q.name][u] = h);
  }), a;
}
var useXdr, tempAnchor = null, STATUS_NONE = 0, STATUS_OK = 200, STATUS_EMPTY = 204, STATUS_IE_BUG_EMPTY = 1223, STATUS_TYPE_OK = 2;
function _noop$1() {
}
function setExtMap(n, t, e) {
  t && t.indexOf(".") === 0 && (t = t.substring(1)), t && (n[t] = e);
}
function reqType(n) {
  return n.toString().replace("object ", "");
}
var LoaderResource = (
  /** @class */
  function() {
    function n(t, e, r) {
      if (this._dequeue = _noop$1, this._onLoadBinding = null, this._elementTimer = 0, this._boundComplete = null, this._boundOnError = null, this._boundOnProgress = null, this._boundOnTimeout = null, this._boundXhrOnError = null, this._boundXhrOnTimeout = null, this._boundXhrOnAbort = null, this._boundXhrOnLoad = null, typeof t != "string" || typeof e != "string")
        throw new Error("Both name and url are required for constructing a resource.");
      r = r || {}, this._flags = 0, this._setFlag(n.STATUS_FLAGS.DATA_URL, e.indexOf("data:") === 0), this.name = t, this.url = e, this.extension = this._getExtension(), this.data = null, this.crossOrigin = r.crossOrigin === !0 ? "anonymous" : r.crossOrigin, this.timeout = r.timeout || 0, this.loadType = r.loadType || this._determineLoadType(), this.xhrType = r.xhrType, this.metadata = r.metadata || {}, this.error = null, this.xhr = null, this.children = [], this.type = n.TYPE.UNKNOWN, this.progressChunk = 0, this._dequeue = _noop$1, this._onLoadBinding = null, this._elementTimer = 0, this._boundComplete = this.complete.bind(this), this._boundOnError = this._onError.bind(this), this._boundOnProgress = this._onProgress.bind(this), this._boundOnTimeout = this._onTimeout.bind(this), this._boundXhrOnError = this._xhrOnError.bind(this), this._boundXhrOnTimeout = this._xhrOnTimeout.bind(this), this._boundXhrOnAbort = this._xhrOnAbort.bind(this), this._boundXhrOnLoad = this._xhrOnLoad.bind(this), this.onStart = new Signal(), this.onProgress = new Signal(), this.onComplete = new Signal(), this.onAfterMiddleware = new Signal();
    }
    return n.setExtensionLoadType = function(t, e) {
      setExtMap(n._loadTypeMap, t, e);
    }, n.setExtensionXhrType = function(t, e) {
      setExtMap(n._xhrTypeMap, t, e);
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
    }, n.prototype.abort = function(t) {
      if (!this.error) {
        if (this.error = new Error(t), this._clearEvents(), this.xhr)
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
    }, n.prototype.load = function(t) {
      var e = this;
      if (!this.isLoading) {
        if (this.isComplete) {
          t && setTimeout(function() {
            return t(e);
          }, 1);
          return;
        } else t && this.onComplete.once(t);
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
    }, n.prototype._hasFlag = function(t) {
      return (this._flags & t) !== 0;
    }, n.prototype._setFlag = function(t, e) {
      this._flags = e ? this._flags | t : this._flags & ~t;
    }, n.prototype._clearEvents = function() {
      clearTimeout(this._elementTimer), this.data && this.data.removeEventListener && (this.data.removeEventListener("error", this._boundOnError, !1), this.data.removeEventListener("load", this._boundComplete, !1), this.data.removeEventListener("progress", this._boundOnProgress, !1), this.data.removeEventListener("canplaythrough", this._boundComplete, !1)), this.xhr && (this.xhr.removeEventListener ? (this.xhr.removeEventListener("error", this._boundXhrOnError, !1), this.xhr.removeEventListener("timeout", this._boundXhrOnTimeout, !1), this.xhr.removeEventListener("abort", this._boundXhrOnAbort, !1), this.xhr.removeEventListener("progress", this._boundOnProgress, !1), this.xhr.removeEventListener("load", this._boundXhrOnLoad, !1)) : (this.xhr.onerror = null, this.xhr.ontimeout = null, this.xhr.onprogress = null, this.xhr.onload = null));
    }, n.prototype._finish = function() {
      if (this.isComplete)
        throw new Error("Complete called again for an already completed resource.");
      this._setFlag(n.STATUS_FLAGS.COMPLETE, !0), this._setFlag(n.STATUS_FLAGS.LOADING, !1), this.onComplete.dispatch(this);
    }, n.prototype._loadElement = function(t) {
      this.metadata.loadElement ? this.data = this.metadata.loadElement : t === "image" && typeof globalThis.Image < "u" ? this.data = new Image() : this.data = document.createElement(t), this.crossOrigin && (this.data.crossOrigin = this.crossOrigin), this.metadata.skipSource || (this.data.src = this.url), this.data.addEventListener("error", this._boundOnError, !1), this.data.addEventListener("load", this._boundComplete, !1), this.data.addEventListener("progress", this._boundOnProgress, !1), this.timeout && (this._elementTimer = setTimeout(this._boundOnTimeout, this.timeout));
    }, n.prototype._loadSourceElement = function(t) {
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
    }, n.prototype._loadXhr = function() {
      typeof this.xhrType != "string" && (this.xhrType = this._determineXhrType());
      var t = this.xhr = new XMLHttpRequest();
      this.crossOrigin === "use-credentials" && (t.withCredentials = !0), t.open("GET", this.url, !0), t.timeout = this.timeout, this.xhrType === n.XHR_RESPONSE_TYPE.JSON || this.xhrType === n.XHR_RESPONSE_TYPE.DOCUMENT ? t.responseType = n.XHR_RESPONSE_TYPE.TEXT : t.responseType = this.xhrType, t.addEventListener("error", this._boundXhrOnError, !1), t.addEventListener("timeout", this._boundXhrOnTimeout, !1), t.addEventListener("abort", this._boundXhrOnAbort, !1), t.addEventListener("progress", this._boundOnProgress, !1), t.addEventListener("load", this._boundXhrOnLoad, !1), t.send();
    }, n.prototype._loadXdr = function() {
      typeof this.xhrType != "string" && (this.xhrType = this._determineXhrType());
      var t = this.xhr = new globalThis.XDomainRequest();
      t.timeout = this.timeout || 5e3, t.onerror = this._boundXhrOnError, t.ontimeout = this._boundXhrOnTimeout, t.onprogress = this._boundOnProgress, t.onload = this._boundXhrOnLoad, t.open("GET", this.url, !0), setTimeout(function() {
        return t.send();
      }, 1);
    }, n.prototype._createSource = function(t, e, r) {
      r || (r = t + "/" + this._getExtension(e));
      var a = document.createElement("source");
      return a.src = e, a.type = r, a;
    }, n.prototype._onError = function(t) {
      this.abort("Failed to load element using: " + t.target.nodeName);
    }, n.prototype._onProgress = function(t) {
      t && t.lengthComputable && this.onProgress.dispatch(this, t.loaded / t.total);
    }, n.prototype._onTimeout = function() {
      this.abort("Load timed out.");
    }, n.prototype._xhrOnError = function() {
      var t = this.xhr;
      this.abort(reqType(t) + " Request failed. Status: " + t.status + ', text: "' + t.statusText + '"');
    }, n.prototype._xhrOnTimeout = function() {
      var t = this.xhr;
      this.abort(reqType(t) + " Request timed out.");
    }, n.prototype._xhrOnAbort = function() {
      var t = this.xhr;
      this.abort(reqType(t) + " Request was aborted by the user.");
    }, n.prototype._xhrOnLoad = function() {
      var t = this.xhr, e = "", r = typeof t.status > "u" ? STATUS_OK : t.status;
      (t.responseType === "" || t.responseType === "text" || typeof t.responseType > "u") && (e = t.responseText), r === STATUS_NONE && (e.length > 0 || t.responseType === n.XHR_RESPONSE_TYPE.BUFFER) ? r = STATUS_OK : r === STATUS_IE_BUG_EMPTY && (r = STATUS_EMPTY);
      var a = r / 100 | 0;
      if (a === STATUS_TYPE_OK)
        if (this.xhrType === n.XHR_RESPONSE_TYPE.TEXT)
          this.data = e, this.type = n.TYPE.TEXT;
        else if (this.xhrType === n.XHR_RESPONSE_TYPE.JSON)
          try {
            this.data = JSON.parse(e), this.type = n.TYPE.JSON;
          } catch (u) {
            this.abort("Error trying to parse loaded json: " + u);
            return;
          }
        else if (this.xhrType === n.XHR_RESPONSE_TYPE.DOCUMENT)
          try {
            if (globalThis.DOMParser) {
              var s = new DOMParser();
              this.data = s.parseFromString(e, "text/xml");
            } else {
              var o = document.createElement("div");
              o.innerHTML = e, this.data = o;
            }
            this.type = n.TYPE.XML;
          } catch (u) {
            this.abort("Error trying to parse loaded xml: " + u);
            return;
          }
        else
          this.data = t.response || e;
      else {
        this.abort("[" + t.status + "] " + t.statusText + ": " + t.responseURL);
        return;
      }
      this.complete();
    }, n.prototype._determineCrossOrigin = function(t, e) {
      if (t.indexOf("data:") === 0)
        return "";
      if (globalThis.origin !== globalThis.location.origin)
        return "anonymous";
      e = e || globalThis.location, tempAnchor || (tempAnchor = document.createElement("a")), tempAnchor.href = t;
      var r = parseUri(tempAnchor.href, { strictMode: !0 }), a = !r.port && e.port === "" || r.port === e.port, s = r.protocol ? r.protocol + ":" : "";
      return r.host !== e.hostname || !a || s !== e.protocol ? "anonymous" : "";
    }, n.prototype._determineXhrType = function() {
      return n._xhrTypeMap[this.extension] || n.XHR_RESPONSE_TYPE.TEXT;
    }, n.prototype._determineLoadType = function() {
      return n._loadTypeMap[this.extension] || n.LOAD_TYPE.XHR;
    }, n.prototype._getExtension = function(t) {
      t === void 0 && (t = this.url);
      var e = "";
      if (this.isDataUrl) {
        var r = t.indexOf("/");
        e = t.substring(r + 1, t.indexOf(";", r));
      } else {
        var a = t.indexOf("?"), s = t.indexOf("#"), o = Math.min(a > -1 ? a : t.length, s > -1 ? s : t.length);
        t = t.substring(0, o), e = t.substring(t.lastIndexOf(".") + 1);
      }
      return e.toLowerCase();
    }, n.prototype._getMimeFromXhrType = function(t) {
      switch (t) {
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
  (function(t) {
    t[t.NONE = 0] = "NONE", t[t.DATA_URL = 1] = "DATA_URL", t[t.COMPLETE = 2] = "COMPLETE", t[t.LOADING = 4] = "LOADING";
  })(n.STATUS_FLAGS || (n.STATUS_FLAGS = {})), function(t) {
    t[t.UNKNOWN = 0] = "UNKNOWN", t[t.JSON = 1] = "JSON", t[t.XML = 2] = "XML", t[t.IMAGE = 3] = "IMAGE", t[t.AUDIO = 4] = "AUDIO", t[t.VIDEO = 5] = "VIDEO", t[t.TEXT = 6] = "TEXT";
  }(n.TYPE || (n.TYPE = {})), function(t) {
    t[t.XHR = 1] = "XHR", t[t.IMAGE = 2] = "IMAGE", t[t.AUDIO = 3] = "AUDIO", t[t.VIDEO = 4] = "VIDEO";
  }(n.LOAD_TYPE || (n.LOAD_TYPE = {})), function(t) {
    t.DEFAULT = "text", t.BUFFER = "arraybuffer", t.BLOB = "blob", t.DOCUMENT = "document", t.JSON = "json", t.TEXT = "text";
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
    for (var e = arguments, r = [], a = 0; a < arguments.length; a++)
      r[a] = e[a];
    if (n === null)
      throw new Error("Callback was already called.");
    var s = n;
    n = null, s.apply(this, r);
  };
}
var AsyncQueueItem = (
  /** @class */
  /* @__PURE__ */ function() {
    function n(t, e) {
      this.data = t, this.callback = e;
    }
    return n;
  }()
), AsyncQueue = (
  /** @class */
  function() {
    function n(t, e) {
      var r = this;
      if (e === void 0 && (e = 1), this.workers = 0, this.saturated = _noop, this.unsaturated = _noop, this.empty = _noop, this.drain = _noop, this.error = _noop, this.started = !1, this.paused = !1, this._tasks = [], this._insert = function(a, s, o) {
        if (o && typeof o != "function")
          throw new Error("task callback must be a function");
        if (r.started = !0, a == null && r.idle()) {
          setTimeout(function() {
            return r.drain();
          }, 1);
          return;
        }
        var u = new AsyncQueueItem(a, typeof o == "function" ? o : _noop);
        s ? r._tasks.unshift(u) : r._tasks.push(u), setTimeout(r.process, 1);
      }, this.process = function() {
        for (; !r.paused && r.workers < r.concurrency && r._tasks.length; ) {
          var a = r._tasks.shift();
          r._tasks.length === 0 && r.empty(), r.workers += 1, r.workers === r.concurrency && r.saturated(), r._worker(a.data, onlyOnce(r._next(a)));
        }
      }, this._worker = t, e === 0)
        throw new Error("Concurrency must not be zero");
      this.concurrency = e, this.buffer = e / 4;
    }
    return n.prototype._next = function(t) {
      var e = this;
      return function() {
        for (var r = arguments, a = [], s = 0; s < arguments.length; s++)
          a[s] = r[s];
        e.workers -= 1, t.callback.apply(t, a), a[0] != null && e.error(a[0], t.data), e.workers <= e.concurrency - e.buffer && e.unsaturated(), e.idle() && e.drain(), e.process();
      };
    }, n.prototype.push = function(t, e) {
      this._insert(t, !1, e);
    }, n.prototype.kill = function() {
      this.workers = 0, this.drain = _noop, this.started = !1, this._tasks = [];
    }, n.prototype.unshift = function(t, e) {
      this._insert(t, !0, e);
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
        for (var t = 1; t <= this.concurrency; t++)
          this.process();
      }
    }, n.eachSeries = function(t, e, r, a) {
      var s = 0, o = t.length;
      function u(h) {
        if (h || s === o) {
          r && r(h);
          return;
        }
        a ? setTimeout(function() {
          e(t[s++], u);
        }, 1) : e(t[s++], u);
      }
      u();
    }, n.queue = function(t, e) {
      return new n(t, e);
    }, n;
  }()
), MAX_PROGRESS = 100, rgxExtractUrlHash = /(#[\w-]+)?$/, Loader = (
  /** @class */
  function() {
    function n(t, e) {
      var r = this;
      t === void 0 && (t = ""), e === void 0 && (e = 10), this.progress = 0, this.loading = !1, this.defaultQueryString = "", this._beforeMiddleware = [], this._afterMiddleware = [], this._resourcesParsing = [], this._boundLoadResource = function(h, l) {
        return r._loadResource(h, l);
      }, this.resources = {}, this.baseUrl = t, this._beforeMiddleware = [], this._afterMiddleware = [], this._resourcesParsing = [], this._boundLoadResource = function(h, l) {
        return r._loadResource(h, l);
      }, this._queue = AsyncQueue.queue(this._boundLoadResource, e), this._queue.pause(), this.resources = {}, this.onProgress = new Signal(), this.onError = new Signal(), this.onLoad = new Signal(), this.onStart = new Signal(), this.onComplete = new Signal();
      for (var a = 0; a < n._plugins.length; ++a) {
        var s = n._plugins[a], o = s.pre, u = s.use;
        o && this.pre(o), u && this.use(u);
      }
      this._protected = !1;
    }
    return n.prototype._add = function(t, e, r, a) {
      if (this.loading && (!r || !r.parentResource))
        throw new Error("Cannot add resources while the loader is running.");
      if (this.resources[t])
        throw new Error('Resource named "' + t + '" already exists.');
      if (e = this._prepareUrl(e), this.resources[t] = new LoaderResource(t, e, r), typeof a == "function" && this.resources[t].onAfterMiddleware.once(a), this.loading) {
        for (var s = r.parentResource, o = [], u = 0; u < s.children.length; ++u)
          s.children[u].isComplete || o.push(s.children[u]);
        var h = s.progressChunk * (o.length + 1), l = h / (o.length + 2);
        s.children.push(this.resources[t]), s.progressChunk = l;
        for (var u = 0; u < o.length; ++u)
          o[u].progressChunk = l;
        this.resources[t].progressChunk = l;
      }
      return this._queue.push(this.resources[t]), this;
    }, n.prototype.pre = function(t) {
      return this._beforeMiddleware.push(t), this;
    }, n.prototype.use = function(t) {
      return this._afterMiddleware.push(t), this;
    }, n.prototype.reset = function() {
      this.progress = 0, this.loading = !1, this._queue.kill(), this._queue.pause();
      for (var t in this.resources) {
        var e = this.resources[t];
        e._onLoadBinding && e._onLoadBinding.detach(), e.isLoading && e.abort("loader reset");
      }
      return this.resources = {}, this;
    }, n.prototype.load = function(t) {
      if (deprecation("6.5.0", "@pixi/loaders is being replaced with @pixi/assets in the next major release."), typeof t == "function" && this.onComplete.once(t), this.loading)
        return this;
      if (this._queue.idle())
        this._onStart(), this._onComplete();
      else {
        for (var e = this._queue._tasks.length, r = MAX_PROGRESS / e, a = 0; a < this._queue._tasks.length; ++a)
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
      set: function(t) {
        this._queue.concurrency = t;
      },
      enumerable: !1,
      configurable: !0
    }), n.prototype._prepareUrl = function(t) {
      var e = parseUri(t, { strictMode: !0 }), r;
      if (e.protocol || !e.path || t.indexOf("//") === 0 ? r = t : this.baseUrl.length && this.baseUrl.lastIndexOf("/") !== this.baseUrl.length - 1 && t.charAt(0) !== "/" ? r = this.baseUrl + "/" + t : r = this.baseUrl + t, this.defaultQueryString) {
        var a = rgxExtractUrlHash.exec(r)[0];
        r = r.slice(0, r.length - a.length), r.indexOf("?") !== -1 ? r += "&" + this.defaultQueryString : r += "?" + this.defaultQueryString, r += a;
      }
      return r;
    }, n.prototype._loadResource = function(t, e) {
      var r = this;
      t._dequeue = e, AsyncQueue.eachSeries(this._beforeMiddleware, function(a, s) {
        a.call(r, t, function() {
          s(t.isComplete ? {} : null);
        });
      }, function() {
        t.isComplete ? r._onLoad(t) : (t._onLoadBinding = t.onComplete.once(r._onLoad, r), t.load());
      }, !0);
    }, n.prototype._onStart = function() {
      this.progress = 0, this.loading = !0, this.onStart.dispatch(this);
    }, n.prototype._onComplete = function() {
      this.progress = MAX_PROGRESS, this.loading = !1, this.onComplete.dispatch(this, this.resources);
    }, n.prototype._onLoad = function(t) {
      var e = this;
      t._onLoadBinding = null, this._resourcesParsing.push(t), t._dequeue(), AsyncQueue.eachSeries(this._afterMiddleware, function(r, a) {
        r.call(e, t, a);
      }, function() {
        t.onAfterMiddleware.dispatch(t), e.progress = Math.min(MAX_PROGRESS, e.progress + t.progressChunk), e.onProgress.dispatch(e, t), t.error ? e.onError.dispatch(t.error, e, t) : e.onLoad.dispatch(e, t), e._resourcesParsing.splice(e._resourcesParsing.indexOf(t), 1), e._queue.idle() && e._resourcesParsing.length === 0 && e._onComplete();
      }, !0);
    }, n.prototype.destroy = function() {
      this._protected || this.reset();
    }, Object.defineProperty(n, "shared", {
      /** A premade instance of the loader that can be used to load resources. */
      get: function() {
        var t = n._shared;
        return t || (t = new n(), t._protected = !0, n._shared = t), t;
      },
      enumerable: !1,
      configurable: !0
    }), n.registerPlugin = function(t) {
      return deprecation("6.5.0", "Loader.registerPlugin() is deprecated, use extensions.add() instead."), extensions.add({
        type: ExtensionType.Loader,
        ref: t
      }), n;
    }, n._plugins = [], n;
  }()
);
extensions.handleByList(ExtensionType.Loader, Loader._plugins);
Loader.prototype.add = function(t, e, r, a) {
  if (Array.isArray(t)) {
    for (var s = 0; s < t.length; ++s)
      this.add(t[s]);
    return this;
  }
  if (typeof t == "object" && (r = t, a = e || r.callback || r.onComplete, e = r.url, t = r.name || r.key || r.url), typeof e != "string" && (a = r, r = e, e = t), typeof e != "string")
    throw new Error("No url passed to add resource to loader.");
  return typeof r == "function" && (a = r, r = null), this._add(t, e, r, a);
};
var AppLoaderPlugin = (
  /** @class */
  function() {
    function n() {
    }
    return n.init = function(t) {
      t = Object.assign({
        sharedLoader: !1
      }, t), this.loader = t.sharedLoader ? Loader.shared : new Loader();
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
    }, n.use = function(t, e) {
      if (t.data && (t.type === LoaderResource.TYPE.IMAGE || t.extension === "svg")) {
        var r = t.data, a = t.url, s = t.name, o = t.metadata;
        Texture.fromLoader(r, a, s, o).then(function(u) {
          t.texture = u, e();
        }).catch(e);
      } else
        e();
    }, n.extension = ExtensionType.Loader, n;
  }()
), _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
function encodeBinary(n) {
  for (var t = "", e = 0; e < n.length; ) {
    for (var r = [0, 0, 0], a = [0, 0, 0, 0], s = 0; s < r.length; ++s)
      e < n.length ? r[s] = n.charCodeAt(e++) & 255 : r[s] = 0;
    a[0] = r[0] >> 2, a[1] = (r[0] & 3) << 4 | r[1] >> 4, a[2] = (r[1] & 15) << 2 | r[2] >> 6, a[3] = r[2] & 63;
    var o = e - (n.length - 1);
    switch (o) {
      case 2:
        a[3] = 64, a[2] = 64;
        break;
      case 1:
        a[3] = 64;
        break;
    }
    for (var s = 0; s < a.length; ++s)
      t += _keyStr.charAt(a[s]);
  }
  return t;
}
function parsing(n, t) {
  if (!n.data) {
    t();
    return;
  }
  if (n.xhr && n.xhrType === LoaderResource.XHR_RESPONSE_TYPE.BLOB) {
    if (!self.Blob || typeof n.data == "string") {
      var e = n.xhr.getResponseHeader("content-type");
      if (e && e.indexOf("image") === 0) {
        n.data = new Image(), n.data.src = "data:" + e + ";base64," + encodeBinary(n.xhr.responseText), n.type = LoaderResource.TYPE.IMAGE, n.data.onload = function() {
          n.data.onload = null, t();
        };
        return;
      }
    } else if (n.data.type.indexOf("image") === 0) {
      var r = globalThis.URL || globalThis.webkitURL, a = r.createObjectURL(n.data);
      n.blob = n.data, n.data = new Image(), n.data.src = a, n.type = LoaderResource.TYPE.IMAGE, n.data.onload = function() {
        r.revokeObjectURL(a), n.data.onload = null, t();
      };
      return;
    }
  }
  t();
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
/*!
 * @pixi/compressed-textures - v6.5.10
 * Compiled Thu, 06 Jul 2023 15:25:11 UTC
 *
 * @pixi/compressed-textures is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
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
var extendStatics$g = function(n, t) {
  return extendStatics$g = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, r) {
    e.__proto__ = r;
  } || function(e, r) {
    for (var a in r)
      r.hasOwnProperty(a) && (e[a] = r[a]);
  }, extendStatics$g(n, t);
};
function __extends$g(n, t) {
  extendStatics$g(n, t);
  function e() {
    this.constructor = n;
  }
  n.prototype = t === null ? Object.create(t) : (e.prototype = t.prototype, new e());
}
function __awaiter(n, t, e, r) {
  function a(s) {
    return s instanceof e ? s : new e(function(o) {
      o(s);
    });
  }
  return new (e || (e = Promise))(function(s, o) {
    function u(c) {
      try {
        l(r.next(c));
      } catch (v) {
        o(v);
      }
    }
    function h(c) {
      try {
        l(r.throw(c));
      } catch (v) {
        o(v);
      }
    }
    function l(c) {
      c.done ? s(c.value) : a(c.value).then(u, h);
    }
    l((r = r.apply(n, [])).next());
  });
}
function __generator(n, t) {
  var e = { label: 0, sent: function() {
    if (s[0] & 1)
      throw s[1];
    return s[1];
  }, trys: [], ops: [] }, r, a, s, o;
  return o = { next: u(0), throw: u(1), return: u(2) }, typeof Symbol == "function" && (o[Symbol.iterator] = function() {
    return this;
  }), o;
  function u(l) {
    return function(c) {
      return h([l, c]);
    };
  }
  function h(l) {
    if (r)
      throw new TypeError("Generator is already executing.");
    for (; e; )
      try {
        if (r = 1, a && (s = l[0] & 2 ? a.return : l[0] ? a.throw || ((s = a.return) && s.call(a), 0) : a.next) && !(s = s.call(a, l[1])).done)
          return s;
        switch (a = 0, s && (l = [l[0] & 2, s.value]), l[0]) {
          case 0:
          case 1:
            s = l;
            break;
          case 4:
            return e.label++, { value: l[1], done: !1 };
          case 5:
            e.label++, a = l[1], l = [0];
            continue;
          case 7:
            l = e.ops.pop(), e.trys.pop();
            continue;
          default:
            if (s = e.trys, !(s = s.length > 0 && s[s.length - 1]) && (l[0] === 6 || l[0] === 2)) {
              e = 0;
              continue;
            }
            if (l[0] === 3 && (!s || l[1] > s[0] && l[1] < s[3])) {
              e.label = l[1];
              break;
            }
            if (l[0] === 6 && e.label < s[1]) {
              e.label = s[1], s = l;
              break;
            }
            if (s && e.label < s[2]) {
              e.label = s[2], e.ops.push(l);
              break;
            }
            s[2] && e.ops.pop(), e.trys.pop();
            continue;
        }
        l = t.call(n, e);
      } catch (c) {
        l = [6, c], a = 0;
      } finally {
        r = s = 0;
      }
    if (l[0] & 5)
      throw l[1];
    return { value: l[0] ? l[1] : void 0, done: !0 };
  }
}
var BlobResource = (
  /** @class */
  function(n) {
    __extends$g(t, n);
    function t(e, r) {
      r === void 0 && (r = { width: 1, height: 1, autoLoad: !0 });
      var a = this, s, o;
      return typeof e == "string" ? (s = e, o = new Uint8Array()) : (s = null, o = e), a = n.call(this, o, r) || this, a.origin = s, a.buffer = o ? new ViewableBuffer(o) : null, a.origin && r.autoLoad !== !1 && a.load(), o && o.length && (a.loaded = !0, a.onBlobLoaded(a.buffer.rawBinaryData)), a;
    }
    return t.prototype.onBlobLoaded = function(e) {
    }, t.prototype.load = function() {
      return __awaiter(this, void 0, Promise, function() {
        var e, r, a;
        return __generator(this, function(s) {
          switch (s.label) {
            case 0:
              return [4, fetch(this.origin)];
            case 1:
              return e = s.sent(), [4, e.blob()];
            case 2:
              return r = s.sent(), [4, r.arrayBuffer()];
            case 3:
              return a = s.sent(), this.data = new Uint32Array(a), this.buffer = new ViewableBuffer(a), this.loaded = !0, this.onBlobLoaded(a), this.update(), [2, this];
          }
        });
      });
    }, t;
  }(BufferResource)
), CompressedTextureResource = (
  /** @class */
  function(n) {
    __extends$g(t, n);
    function t(e, r) {
      var a = n.call(this, e, r) || this;
      return a.format = r.format, a.levels = r.levels || 1, a._width = r.width, a._height = r.height, a._extension = t._formatToExtension(a.format), (r.levelBuffers || a.buffer) && (a._levelBuffers = r.levelBuffers || t._createLevelBuffers(
        e instanceof Uint8Array ? e : a.buffer.uint8View,
        a.format,
        a.levels,
        4,
        4,
        // PVRTC has 8x4 blocks in 2bpp mode
        a.width,
        a.height
      )), a;
    }
    return t.prototype.upload = function(e, r, a) {
      var s = e.gl, o = e.context.extensions[this._extension];
      if (!o)
        throw new Error(this._extension + " textures are not supported on the current machine");
      if (!this._levelBuffers)
        return !1;
      for (var u = 0, h = this.levels; u < h; u++) {
        var l = this._levelBuffers[u], c = l.levelID, v = l.levelWidth, d = l.levelHeight, m = l.levelBuffer;
        s.compressedTexImage2D(s.TEXTURE_2D, c, this.format, v, d, 0, m);
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
    }, t._createLevelBuffers = function(e, r, a, s, o, u, h) {
      for (var l = new Array(a), c = e.byteOffset, v = u, d = h, m = v + s - 1 & ~(s - 1), g = d + o - 1 & ~(o - 1), y = m * g * INTERNAL_FORMAT_TO_BYTES_PER_PIXEL[r], _ = 0; _ < a; _++)
        l[_] = {
          levelID: _,
          levelWidth: a > 1 ? v : m,
          levelHeight: a > 1 ? d : g,
          levelBuffer: new Uint8Array(e.buffer, c, y)
        }, c += y, v = v >> 1 || 1, d = d >> 1 || 1, m = v + s - 1 & ~(s - 1), g = d + o - 1 & ~(o - 1), y = m * g * INTERNAL_FORMAT_TO_BYTES_PER_PIXEL[r];
      return l;
    }, t;
  }(BlobResource)
), CompressedTextureLoader = (
  /** @class */
  function() {
    function n() {
    }
    return n.use = function(t, e) {
      var r = t.data, a = this;
      if (t.type === LoaderResource.TYPE.JSON && r && r.cacheID && r.textures) {
        for (var s = r.textures, o = void 0, u = void 0, h = 0, l = s.length; h < l; h++) {
          var c = s[h], v = c.src, d = c.format;
          if (d || (u = v), n.textureFormats[d]) {
            o = v;
            break;
          }
        }
        if (o = o || u, !o) {
          e(new Error("Cannot load compressed-textures in " + t.url + ", make sure you provide a fallback"));
          return;
        }
        if (o === t.url) {
          e(new Error("URL of compressed texture cannot be the same as the manifest's URL"));
          return;
        }
        var m = {
          crossOrigin: t.crossOrigin,
          metadata: t.metadata.imageMetadata,
          parentResource: t
        }, g = url$1.resolve(t.url.replace(a.baseUrl, ""), o), y = r.cacheID;
        a.add(y, g, m, function(_) {
          if (_.error) {
            e(_.error);
            return;
          }
          var b = _.texture, S = b === void 0 ? null : b, P = _.textures, N = P === void 0 ? {} : P;
          Object.assign(t, { texture: S, textures: N }), e();
        });
      } else
        e();
    }, Object.defineProperty(n, "textureExtensions", {
      /**  Map of available texture extensions. */
      get: function() {
        if (!n._textureExtensions) {
          var t = settings.ADAPTER.createCanvas(), e = t.getContext("webgl");
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
          var t = n.textureExtensions;
          n._textureFormats = {};
          for (var e in t) {
            var r = t[e];
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
function registerCompressedTextures(n, t, e) {
  var r = {
    textures: {},
    texture: null
  };
  if (!t)
    return r;
  var a = t.map(function(s) {
    return new Texture(new BaseTexture(s, Object.assign({
      mipmap: MIPMAP_MODES.OFF,
      alphaMode: ALPHA_MODES.NO_PREMULTIPLIED_ALPHA
    }, e)));
  });
  return a.forEach(function(s, o) {
    var u = s.baseTexture, h = n + "-" + (o + 1);
    BaseTexture.addToCache(u, h), Texture.addToCache(s, h), o === 0 && (BaseTexture.addToCache(u, n), Texture.addToCache(s, n), r.texture = s), r.textures[h] = s;
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
  var t = new Uint32Array(n), e = t[0];
  if (e !== DDS_MAGIC)
    throw new Error("Invalid DDS file magic word");
  var r = new Uint32Array(n, 0, DDS_HEADER_SIZE / Uint32Array.BYTES_PER_ELEMENT), a = r[DDS_FIELDS.HEIGHT], s = r[DDS_FIELDS.WIDTH], o = r[DDS_FIELDS.MIPMAP_COUNT], u = new Uint32Array(n, DDS_FIELDS.PIXEL_FORMAT * Uint32Array.BYTES_PER_ELEMENT, DDS_HEADER_PF_SIZE / Uint32Array.BYTES_PER_ELEMENT), h = u[PF_FLAGS];
  if (h & DDPF_FOURCC) {
    var l = u[DDS_PF_FIELDS.FOURCC];
    if (l !== FOURCC_DX10) {
      var c = FOURCC_TO_FORMAT[l], v = DDS_MAGIC_SIZE + DDS_HEADER_SIZE, d = new Uint8Array(n, v), m = new CompressedTextureResource(d, {
        format: c,
        width: s,
        height: a,
        levels: o
        // CompressedTextureResource will separate the levelBuffers for us!
      });
      return [m];
    }
    var g = DDS_MAGIC_SIZE + DDS_HEADER_SIZE, y = new Uint32Array(t.buffer, g, DDS_HEADER_DX10_SIZE / Uint32Array.BYTES_PER_ELEMENT), _ = y[DDS_DX10_FIELDS.DXGI_FORMAT], b = y[DDS_DX10_FIELDS.RESOURCE_DIMENSION], S = y[DDS_DX10_FIELDS.MISC_FLAG], P = y[DDS_DX10_FIELDS.ARRAY_SIZE], N = DXGI_TO_FORMAT[_];
    if (N === void 0)
      throw new Error("DDSParser cannot parse texture data with DXGI format " + _);
    if (S === DDS_RESOURCE_MISC_TEXTURECUBE)
      throw new Error("DDSParser does not support cubemap textures");
    if (b === D3D10_RESOURCE_DIMENSION.DDS_DIMENSION_TEXTURE3D)
      throw new Error("DDSParser does not supported 3D texture data");
    var E = new Array(), M = DDS_MAGIC_SIZE + DDS_HEADER_SIZE + DDS_HEADER_DX10_SIZE;
    if (P === 1)
      E.push(new Uint8Array(n, M));
    else {
      for (var T = INTERNAL_FORMAT_TO_BYTES_PER_PIXEL[N], A = 0, L = s, B = a, Y = 0; Y < o; Y++) {
        var H = Math.max(1, L + 3 & -4), rt = Math.max(1, B + 3 & -4), at = H * rt * T;
        A += at, L = L >>> 1, B = B >>> 1;
      }
      for (var Z = M, Y = 0; Y < P; Y++)
        E.push(new Uint8Array(n, Z, A)), Z += A;
    }
    return E.map(function(w) {
      return new CompressedTextureResource(w, {
        format: N,
        width: s,
        height: a,
        levels: o
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
function parseKTX(n, t, e) {
  e === void 0 && (e = !1);
  var r = new DataView(t);
  if (!validate(n, r))
    return null;
  var a = r.getUint32(KTX_FIELDS.ENDIANNESS, !0) === ENDIANNESS, s = r.getUint32(KTX_FIELDS.GL_TYPE, a), o = r.getUint32(KTX_FIELDS.GL_FORMAT, a), u = r.getUint32(KTX_FIELDS.GL_INTERNAL_FORMAT, a), h = r.getUint32(KTX_FIELDS.PIXEL_WIDTH, a), l = r.getUint32(KTX_FIELDS.PIXEL_HEIGHT, a) || 1, c = r.getUint32(KTX_FIELDS.PIXEL_DEPTH, a) || 1, v = r.getUint32(KTX_FIELDS.NUMBER_OF_ARRAY_ELEMENTS, a) || 1, d = r.getUint32(KTX_FIELDS.NUMBER_OF_FACES, a), m = r.getUint32(KTX_FIELDS.NUMBER_OF_MIPMAP_LEVELS, a), g = r.getUint32(KTX_FIELDS.BYTES_OF_KEY_VALUE_DATA, a);
  if (l === 0 || c !== 1)
    throw new Error("Only 2D textures are supported");
  if (d !== 1)
    throw new Error("CubeTextures are not supported by KTXLoader yet!");
  if (v !== 1)
    throw new Error("WebGL does not support array textures");
  var y = 4, _ = 4, b = h + 3 & -4, S = l + 3 & -4, P = new Array(v), N = h * l;
  s === 0 && (N = b * S);
  var E;
  if (s !== 0 ? TYPES_TO_BYTES_PER_COMPONENT[s] ? E = TYPES_TO_BYTES_PER_COMPONENT[s] * FORMATS_TO_COMPONENTS[o] : E = TYPES_TO_BYTES_PER_PIXEL[s] : E = INTERNAL_FORMAT_TO_BYTES_PER_PIXEL[u], E === void 0)
    throw new Error("Unable to resolve the pixel format stored in the *.ktx file!");
  for (var M = e ? parseKvData(r, g, a) : null, T = N * E, A = T, L = h, B = l, Y = b, H = S, rt = FILE_HEADER_SIZE + g, at = 0; at < m; at++) {
    for (var Z = r.getUint32(rt, a), w = rt + 4, O = 0; O < v; O++) {
      var R = P[O];
      R || (R = P[O] = new Array(m)), R[at] = {
        levelID: at,
        // don't align mipWidth when texture not compressed! (glType not zero)
        levelWidth: m > 1 || s !== 0 ? L : Y,
        levelHeight: m > 1 || s !== 0 ? B : H,
        levelBuffer: new Uint8Array(t, w, A)
      }, w += A;
    }
    rt += Z + 4, rt = rt % 4 !== 0 ? rt + 4 - rt % 4 : rt, L = L >> 1 || 1, B = B >> 1 || 1, Y = L + y - 1 & -4, H = B + _ - 1 & -4, A = Y * H * E;
  }
  return s !== 0 ? {
    uncompressed: P.map(function(F) {
      var D = F[0].levelBuffer, C = !1;
      return s === TYPES.FLOAT ? D = new Float32Array(F[0].levelBuffer.buffer, F[0].levelBuffer.byteOffset, F[0].levelBuffer.byteLength / 4) : s === TYPES.UNSIGNED_INT ? (C = !0, D = new Uint32Array(F[0].levelBuffer.buffer, F[0].levelBuffer.byteOffset, F[0].levelBuffer.byteLength / 4)) : s === TYPES.INT && (C = !0, D = new Int32Array(F[0].levelBuffer.buffer, F[0].levelBuffer.byteOffset, F[0].levelBuffer.byteLength / 4)), {
        resource: new BufferResource(D, {
          width: F[0].levelWidth,
          height: F[0].levelHeight
        }),
        type: s,
        format: C ? convertFormatToInteger(o) : o
      };
    }),
    kvData: M
  } : {
    compressed: P.map(function(F) {
      return new CompressedTextureResource(null, {
        format: u,
        width: h,
        height: l,
        levels: m,
        levelBuffers: F
      });
    }),
    kvData: M
  };
}
function validate(n, t) {
  for (var e = 0; e < FILE_IDENTIFIER.length; e++)
    if (t.getUint8(e) !== FILE_IDENTIFIER[e])
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
function parseKvData(n, t, e) {
  for (var r = /* @__PURE__ */ new Map(), a = 0; a < t; ) {
    var s = n.getUint32(FILE_HEADER_SIZE + a, e), o = FILE_HEADER_SIZE + a + 4, u = 3 - (s + 3) % 4;
    if (s === 0 || s > t - a) {
      console.error("KTXLoader: keyAndValueByteSize out of bounds");
      break;
    }
    for (var h = 0; h < s && n.getUint8(o + h) !== 0; h++)
      ;
    if (h === -1) {
      console.error("KTXLoader: Failed to find null byte terminating kvData key");
      break;
    }
    var l = new TextDecoder().decode(new Uint8Array(n.buffer, o, h)), c = new DataView(n.buffer, o + h + 1, s - h - 1);
    r.set(l, c), a += 4 + s + u;
  }
  return r;
}
LoaderResource.setExtensionXhrType("dds", LoaderResource.XHR_RESPONSE_TYPE.BUFFER);
var DDSLoader = (
  /** @class */
  function() {
    function n() {
    }
    return n.use = function(t, e) {
      if (t.extension === "dds" && t.data)
        try {
          Object.assign(t, registerCompressedTextures(t.name || t.url, parseDDS(t.data), t.metadata));
        } catch (r) {
          e(r);
          return;
        }
      e();
    }, n.extension = ExtensionType.Loader, n;
  }()
);
LoaderResource.setExtensionXhrType("ktx", LoaderResource.XHR_RESPONSE_TYPE.BUFFER);
var KTXLoader = (
  /** @class */
  function() {
    function n() {
    }
    return n.use = function(t, e) {
      if (t.extension === "ktx" && t.data)
        try {
          var r = t.name || t.url, a = parseKTX(r, t.data, this.loadKeyValueData), s = a.compressed, o = a.uncompressed, u = a.kvData;
          if (s) {
            var h = registerCompressedTextures(r, s, t.metadata);
            if (u && h.textures)
              for (var l in h.textures)
                h.textures[l].baseTexture.ktxKeyValueData = u;
            Object.assign(t, h);
          } else if (o) {
            var c = {};
            o.forEach(function(v, d) {
              var m = new Texture(new BaseTexture(v.resource, {
                mipmap: MIPMAP_MODES.OFF,
                alphaMode: ALPHA_MODES.NO_PREMULTIPLIED_ALPHA,
                type: v.type,
                format: v.format
              })), g = r + "-" + (d + 1);
              u && (m.baseTexture.ktxKeyValueData = u), BaseTexture.addToCache(m.baseTexture, g), Texture.addToCache(m, g), d === 0 && (c[r] = m, BaseTexture.addToCache(m.baseTexture, r), Texture.addToCache(m, r)), c[g] = m;
            }), Object.assign(t, { textures: c });
          }
        } catch (v) {
          e(v);
          return;
        }
      e();
    }, n.extension = ExtensionType.Loader, n.loadKeyValueData = !1, n;
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
var extendStatics$f = function(n, t) {
  return extendStatics$f = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, r) {
    e.__proto__ = r;
  } || function(e, r) {
    for (var a in r)
      r.hasOwnProperty(a) && (e[a] = r[a]);
  }, extendStatics$f(n, t);
};
function __extends$f(n, t) {
  extendStatics$f(n, t);
  function e() {
    this.constructor = n;
  }
  n.prototype = t === null ? Object.create(t) : (e.prototype = t.prototype, new e());
}
(function(n) {
  __extends$f(t, n);
  function t(e, r, a, s) {
    e === void 0 && (e = 1500), a === void 0 && (a = 16384), s === void 0 && (s = !1);
    var o = n.call(this) || this, u = 16384;
    return a > u && (a = u), o._properties = [!1, !0, !1, !1, !1], o._maxSize = e, o._batchSize = a, o._buffers = null, o._bufferUpdateIDs = [], o._updateID = 0, o.interactiveChildren = !1, o.blendMode = BLEND_MODES.NORMAL, o.autoResize = s, o.roundPixels = !0, o.baseTexture = null, o.setProperties(r), o._tint = 0, o.tintRgb = new Float32Array(4), o.tint = 16777215, o;
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
      this._tint = e, hex2rgb(e, this.tintRgb);
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
    n.prototype.destroy.call(this, e), this.dispose(), this._properties = null, this._buffers = null, this._bufferUpdateIDs = null;
  }, t;
})(Container);
var ParticleBuffer = (
  /** @class */
  function() {
    function n(t, e, r) {
      this.geometry = new Geometry(), this.indexBuffer = null, this.size = r, this.dynamicProperties = [], this.staticProperties = [];
      for (var a = 0; a < t.length; ++a) {
        var s = t[a];
        s = {
          attributeName: s.attributeName,
          size: s.size,
          uploadFunction: s.uploadFunction,
          type: s.type || TYPES.FLOAT,
          offset: s.offset
        }, e[a] ? this.dynamicProperties.push(s) : this.staticProperties.push(s);
      }
      this.staticStride = 0, this.staticBuffer = null, this.staticData = null, this.staticDataUint32 = null, this.dynamicStride = 0, this.dynamicBuffer = null, this.dynamicData = null, this.dynamicDataUint32 = null, this._updateID = 0, this.initBuffers();
    }
    return n.prototype.initBuffers = function() {
      var t = this.geometry, e = 0;
      this.indexBuffer = new Buffer(createIndicesForQuads(this.size), !0, !0), t.addIndex(this.indexBuffer), this.dynamicStride = 0;
      for (var r = 0; r < this.dynamicProperties.length; ++r) {
        var a = this.dynamicProperties[r];
        a.offset = e, e += a.size, this.dynamicStride += a.size;
      }
      var s = new ArrayBuffer(this.size * this.dynamicStride * 4 * 4);
      this.dynamicData = new Float32Array(s), this.dynamicDataUint32 = new Uint32Array(s), this.dynamicBuffer = new Buffer(this.dynamicData, !1, !1);
      var o = 0;
      this.staticStride = 0;
      for (var r = 0; r < this.staticProperties.length; ++r) {
        var a = this.staticProperties[r];
        a.offset = o, o += a.size, this.staticStride += a.size;
      }
      var u = new ArrayBuffer(this.size * this.staticStride * 4 * 4);
      this.staticData = new Float32Array(u), this.staticDataUint32 = new Uint32Array(u), this.staticBuffer = new Buffer(this.staticData, !0, !1);
      for (var r = 0; r < this.dynamicProperties.length; ++r) {
        var a = this.dynamicProperties[r];
        t.addAttribute(a.attributeName, this.dynamicBuffer, 0, a.type === TYPES.UNSIGNED_BYTE, a.type, this.dynamicStride * 4, a.offset * 4);
      }
      for (var r = 0; r < this.staticProperties.length; ++r) {
        var a = this.staticProperties[r];
        t.addAttribute(a.attributeName, this.staticBuffer, 0, a.type === TYPES.UNSIGNED_BYTE, a.type, this.staticStride * 4, a.offset * 4);
      }
    }, n.prototype.uploadDynamic = function(t, e, r) {
      for (var a = 0; a < this.dynamicProperties.length; a++) {
        var s = this.dynamicProperties[a];
        s.uploadFunction(t, e, r, s.type === TYPES.UNSIGNED_BYTE ? this.dynamicDataUint32 : this.dynamicData, this.dynamicStride, s.offset);
      }
      this.dynamicBuffer._updateID++;
    }, n.prototype.uploadStatic = function(t, e, r) {
      for (var a = 0; a < this.staticProperties.length; a++) {
        var s = this.staticProperties[a];
        s.uploadFunction(t, e, r, s.type === TYPES.UNSIGNED_BYTE ? this.staticDataUint32 : this.staticData, this.staticStride, s.offset);
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
    __extends$f(t, n);
    function t(e) {
      var r = n.call(this, e) || this;
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
    return t.prototype.render = function(e) {
      var r = e.children, a = e._maxSize, s = e._batchSize, o = this.renderer, u = r.length;
      if (u !== 0) {
        u > a && !e.autoResize && (u = a);
        var h = e._buffers;
        h || (h = e._buffers = this.generateBuffers(e));
        var l = r[0]._texture.baseTexture, c = l.alphaMode > 0;
        this.state.blendMode = correctBlendMode(e.blendMode, c), o.state.set(this.state);
        var v = o.gl, d = e.worldTransform.copyTo(this.tempMatrix);
        d.prepend(o.globalUniforms.uniforms.projectionMatrix), this.shader.uniforms.translationMatrix = d.toArray(!0), this.shader.uniforms.uColor = premultiplyRgba(e.tintRgb, e.worldAlpha, this.shader.uniforms.uColor, c), this.shader.uniforms.uSampler = l, this.renderer.shader.bind(this.shader);
        for (var m = !1, g = 0, y = 0; g < u; g += s, y += 1) {
          var _ = u - g;
          _ > s && (_ = s), y >= h.length && h.push(this._generateOneMoreBuffer(e));
          var b = h[y];
          b.uploadDynamic(r, g, _);
          var S = e._bufferUpdateIDs[y] || 0;
          m = m || b._updateID < S, m && (b._updateID = e._updateID, b.uploadStatic(r, g, _)), o.geometry.bind(b.geometry), v.drawElements(v.TRIANGLES, _ * 6, v.UNSIGNED_SHORT, 0);
        }
      }
    }, t.prototype.generateBuffers = function(e) {
      for (var r = [], a = e._maxSize, s = e._batchSize, o = e._properties, u = 0; u < a; u += s)
        r.push(new ParticleBuffer(this.properties, o, s));
      return r;
    }, t.prototype._generateOneMoreBuffer = function(e) {
      var r = e._batchSize, a = e._properties;
      return new ParticleBuffer(this.properties, a, r);
    }, t.prototype.uploadVertices = function(e, r, a, s, o, u) {
      for (var h = 0, l = 0, c = 0, v = 0, d = 0; d < a; ++d) {
        var m = e[r + d], g = m._texture, y = m.scale.x, _ = m.scale.y, b = g.trim, S = g.orig;
        b ? (l = b.x - m.anchor.x * S.width, h = l + b.width, v = b.y - m.anchor.y * S.height, c = v + b.height) : (h = S.width * (1 - m.anchor.x), l = S.width * -m.anchor.x, c = S.height * (1 - m.anchor.y), v = S.height * -m.anchor.y), s[u] = l * y, s[u + 1] = v * _, s[u + o] = h * y, s[u + o + 1] = v * _, s[u + o * 2] = h * y, s[u + o * 2 + 1] = c * _, s[u + o * 3] = l * y, s[u + o * 3 + 1] = c * _, u += o * 4;
      }
    }, t.prototype.uploadPosition = function(e, r, a, s, o, u) {
      for (var h = 0; h < a; h++) {
        var l = e[r + h].position;
        s[u] = l.x, s[u + 1] = l.y, s[u + o] = l.x, s[u + o + 1] = l.y, s[u + o * 2] = l.x, s[u + o * 2 + 1] = l.y, s[u + o * 3] = l.x, s[u + o * 3 + 1] = l.y, u += o * 4;
      }
    }, t.prototype.uploadRotation = function(e, r, a, s, o, u) {
      for (var h = 0; h < a; h++) {
        var l = e[r + h].rotation;
        s[u] = l, s[u + o] = l, s[u + o * 2] = l, s[u + o * 3] = l, u += o * 4;
      }
    }, t.prototype.uploadUvs = function(e, r, a, s, o, u) {
      for (var h = 0; h < a; ++h) {
        var l = e[r + h]._texture._uvs;
        l ? (s[u] = l.x0, s[u + 1] = l.y0, s[u + o] = l.x1, s[u + o + 1] = l.y1, s[u + o * 2] = l.x2, s[u + o * 2 + 1] = l.y2, s[u + o * 3] = l.x3, s[u + o * 3 + 1] = l.y3, u += o * 4) : (s[u] = 0, s[u + 1] = 0, s[u + o] = 0, s[u + o + 1] = 0, s[u + o * 2] = 0, s[u + o * 2 + 1] = 0, s[u + o * 3] = 0, s[u + o * 3 + 1] = 0, u += o * 4);
      }
    }, t.prototype.uploadTint = function(e, r, a, s, o, u) {
      for (var h = 0; h < a; ++h) {
        var l = e[r + h], c = l._texture.baseTexture.alphaMode > 0, v = l.alpha, d = v < 1 && c ? premultiplyTint(l._tintRGB, v) : l._tintRGB + (v * 255 << 24);
        s[u] = d, s[u + o] = d, s[u + o * 2] = d, s[u + o * 3] = d, u += o * 4;
      }
    }, t.prototype.destroy = function() {
      n.prototype.destroy.call(this), this.shader && (this.shader.destroy(), this.shader = null), this.tempMatrix = null;
    }, t.extension = {
      name: "particle",
      type: ExtensionType.RendererPlugin
    }, t;
  }(ObjectRenderer)
);
/*!
 * @pixi/graphics - v6.5.10
 * Compiled Thu, 06 Jul 2023 15:25:11 UTC
 *
 * @pixi/graphics is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
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
  _segmentsCount: function(n, t) {
    if (t === void 0 && (t = 20), !this.adaptive || !n || isNaN(n))
      return t;
    var e = Math.ceil(n / this.maxLength);
    return e < this.minSegments ? e = this.minSegments : e > this.maxSegments && (e = this.maxSegments), e;
  }
}, FillStyle = (
  /** @class */
  function() {
    function n() {
      this.color = 16777215, this.alpha = 1, this.texture = Texture.WHITE, this.matrix = null, this.visible = !1, this.reset();
    }
    return n.prototype.clone = function() {
      var t = new n();
      return t.color = this.color, t.alpha = this.alpha, t.texture = this.texture, t.matrix = this.matrix, t.visible = this.visible, t;
    }, n.prototype.reset = function() {
      this.color = 16777215, this.alpha = 1, this.texture = Texture.WHITE, this.matrix = null, this.visible = !1;
    }, n.prototype.destroy = function() {
      this.texture = null, this.matrix = null;
    }, n;
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
var extendStatics$e = function(n, t) {
  return extendStatics$e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, r) {
    e.__proto__ = r;
  } || function(e, r) {
    for (var a in r)
      r.hasOwnProperty(a) && (e[a] = r[a]);
  }, extendStatics$e(n, t);
};
function __extends$e(n, t) {
  extendStatics$e(n, t);
  function e() {
    this.constructor = n;
  }
  n.prototype = t === null ? Object.create(t) : (e.prototype = t.prototype, new e());
}
function fixOrientation(n, t) {
  var e, r;
  t === void 0 && (t = !1);
  var a = n.length;
  if (!(a < 6)) {
    for (var s = 0, o = 0, u = n[a - 2], h = n[a - 1]; o < a; o += 2) {
      var l = n[o], c = n[o + 1];
      s += (l - u) * (c + h), u = l, h = c;
    }
    if (!t && s > 0 || t && s <= 0)
      for (var v = a / 2, o = v + v % 2; o < a; o += 2) {
        var d = a - o - 2, m = a - o - 1, g = o, y = o + 1;
        e = [n[g], n[d]], n[d] = e[0], n[g] = e[1], r = [n[y], n[m]], n[m] = r[0], n[y] = r[1];
      }
  }
}
var buildPoly = {
  build: function(n) {
    n.points = n.shape.points.slice();
  },
  triangulate: function(n, t) {
    var e = n.points, r = n.holes, a = t.points, s = t.indices;
    if (e.length >= 6) {
      fixOrientation(e, !1);
      for (var o = [], u = 0; u < r.length; u++) {
        var h = r[u];
        fixOrientation(h.points, !0), o.push(e.length / 2), e = e.concat(h.points);
      }
      var l = earcut(e, o, 2);
      if (!l)
        return;
      for (var c = a.length / 2, u = 0; u < l.length; u += 3)
        s.push(l[u] + c), s.push(l[u + 1] + c), s.push(l[u + 2] + c);
      for (var u = 0; u < e.length; u++)
        a.push(e[u]);
    }
  }
}, buildCircle = {
  build: function(n) {
    var t = n.points, e, r, a, s, o, u;
    if (n.type === SHAPES.CIRC) {
      var h = n.shape;
      e = h.x, r = h.y, o = u = h.radius, a = s = 0;
    } else if (n.type === SHAPES.ELIP) {
      var l = n.shape;
      e = l.x, r = l.y, o = l.width, u = l.height, a = s = 0;
    } else {
      var c = n.shape, v = c.width / 2, d = c.height / 2;
      e = c.x + v, r = c.y + d, o = u = Math.max(0, Math.min(c.radius, Math.min(v, d))), a = v - o, s = d - u;
    }
    if (!(o >= 0 && u >= 0 && a >= 0 && s >= 0)) {
      t.length = 0;
      return;
    }
    var m = Math.ceil(2.3 * Math.sqrt(o + u)), g = m * 8 + (a ? 4 : 0) + (s ? 4 : 0);
    if (t.length = g, g !== 0) {
      if (m === 0) {
        t.length = 8, t[0] = t[6] = e + a, t[1] = t[3] = r + s, t[2] = t[4] = e - a, t[5] = t[7] = r - s;
        return;
      }
      var y = 0, _ = m * 4 + (a ? 2 : 0) + 2, b = _, S = g;
      {
        var P = a + o, N = s, E = e + P, M = e - P, T = r + N;
        if (t[y++] = E, t[y++] = T, t[--_] = T, t[--_] = M, s) {
          var A = r - N;
          t[b++] = M, t[b++] = A, t[--S] = A, t[--S] = E;
        }
      }
      for (var L = 1; L < m; L++) {
        var B = Math.PI / 2 * (L / m), P = a + Math.cos(B) * o, N = s + Math.sin(B) * u, E = e + P, M = e - P, T = r + N, A = r - N;
        t[y++] = E, t[y++] = T, t[--_] = T, t[--_] = M, t[b++] = M, t[b++] = A, t[--S] = A, t[--S] = E;
      }
      {
        var P = a, N = s + u, E = e + P, M = e - P, T = r + N, A = r - N;
        t[y++] = E, t[y++] = T, t[--S] = A, t[--S] = E, a && (t[y++] = M, t[y++] = T, t[--S] = A, t[--S] = M);
      }
    }
  },
  triangulate: function(n, t) {
    var e = n.points, r = t.points, a = t.indices;
    if (e.length !== 0) {
      var s = r.length / 2, o = s, u, h;
      if (n.type !== SHAPES.RREC) {
        var l = n.shape;
        u = l.x, h = l.y;
      } else {
        var c = n.shape;
        u = c.x + c.width / 2, h = c.y + c.height / 2;
      }
      var v = n.matrix;
      r.push(n.matrix ? v.a * u + v.c * h + v.tx : u, n.matrix ? v.b * u + v.d * h + v.ty : h), s++, r.push(e[0], e[1]);
      for (var d = 2; d < e.length; d += 2)
        r.push(e[d], e[d + 1]), a.push(s++, o, s);
      a.push(o + 1, o, s);
    }
  }
}, buildRectangle = {
  build: function(n) {
    var t = n.shape, e = t.x, r = t.y, a = t.width, s = t.height, o = n.points;
    o.length = 0, o.push(e, r, e + a, r, e + a, r + s, e, r + s);
  },
  triangulate: function(n, t) {
    var e = n.points, r = t.points, a = r.length / 2;
    r.push(e[0], e[1], e[2], e[3], e[6], e[7], e[4], e[5]), t.indices.push(a, a + 1, a + 2, a + 1, a + 2, a + 3);
  }
};
function getPt(n, t, e) {
  var r = t - n;
  return n + r * e;
}
function quadraticBezierCurve(n, t, e, r, a, s, o) {
  o === void 0 && (o = []);
  for (var u = 20, h = o, l = 0, c = 0, v = 0, d = 0, m = 0, g = 0, y = 0, _ = 0; y <= u; ++y)
    _ = y / u, l = getPt(n, e, _), c = getPt(t, r, _), v = getPt(e, a, _), d = getPt(r, s, _), m = getPt(l, v, _), g = getPt(c, d, _), !(y === 0 && h[h.length - 2] === m && h[h.length - 1] === g) && h.push(m, g);
  return h;
}
var buildRoundedRectangle = {
  build: function(n) {
    if (Graphics.nextRoundedRectBehavior) {
      buildCircle.build(n);
      return;
    }
    var t = n.shape, e = n.points, r = t.x, a = t.y, s = t.width, o = t.height, u = Math.max(0, Math.min(t.radius, Math.min(s, o) / 2));
    e.length = 0, u ? (quadraticBezierCurve(r, a + u, r, a, r + u, a, e), quadraticBezierCurve(r + s - u, a, r + s, a, r + s, a + u, e), quadraticBezierCurve(r + s, a + o - u, r + s, a + o, r + s - u, a + o, e), quadraticBezierCurve(r + u, a + o, r, a + o, r, a + o - u, e)) : e.push(r, a, r + s, a, r + s, a + o, r, a + o);
  },
  triangulate: function(n, t) {
    if (Graphics.nextRoundedRectBehavior) {
      buildCircle.triangulate(n, t);
      return;
    }
    for (var e = n.points, r = t.points, a = t.indices, s = r.length / 2, o = earcut(e, null, 2), u = 0, h = o.length; u < h; u += 3)
      a.push(o[u] + s), a.push(o[u + 1] + s), a.push(o[u + 2] + s);
    for (var u = 0, h = e.length; u < h; u++)
      r.push(e[u], e[++u]);
  }
};
function square(n, t, e, r, a, s, o, u) {
  var h = n - e * a, l = t - r * a, c = n + e * s, v = t + r * s, d, m;
  o ? (d = r, m = -e) : (d = -r, m = e);
  var g = h + d, y = l + m, _ = c + d, b = v + m;
  return u.push(g, y), u.push(_, b), 2;
}
function round(n, t, e, r, a, s, o, u) {
  var h = e - n, l = r - t, c = Math.atan2(h, l), v = Math.atan2(a - n, s - t);
  u && c < v ? c += Math.PI * 2 : !u && c > v && (v += Math.PI * 2);
  var d = c, m = v - c, g = Math.abs(m), y = Math.sqrt(h * h + l * l), _ = (15 * g * Math.sqrt(y) / Math.PI >> 0) + 1, b = m / _;
  if (d += b, u) {
    o.push(n, t), o.push(e, r);
    for (var S = 1, P = d; S < _; S++, P += b)
      o.push(n, t), o.push(n + Math.sin(P) * y, t + Math.cos(P) * y);
    o.push(n, t), o.push(a, s);
  } else {
    o.push(e, r), o.push(n, t);
    for (var S = 1, P = d; S < _; S++, P += b)
      o.push(n + Math.sin(P) * y, t + Math.cos(P) * y), o.push(n, t);
    o.push(a, s), o.push(n, t);
  }
  return _ * 2;
}
function buildNonNativeLine(n, t) {
  var e = n.shape, r = n.points || e.points.slice(), a = t.closePointEps;
  if (r.length !== 0) {
    var s = n.lineStyle, o = new Point(r[0], r[1]), u = new Point(r[r.length - 2], r[r.length - 1]), h = e.type !== SHAPES.POLY || e.closeStroke, l = Math.abs(o.x - u.x) < a && Math.abs(o.y - u.y) < a;
    if (h) {
      r = r.slice(), l && (r.pop(), r.pop(), u.set(r[r.length - 2], r[r.length - 1]));
      var c = (o.x + u.x) * 0.5, v = (u.y + o.y) * 0.5;
      r.unshift(c, v), r.push(c, v);
    }
    var d = t.points, m = r.length / 2, g = r.length, y = d.length / 2, _ = s.width / 2, b = _ * _, S = s.miterLimit * s.miterLimit, P = r[0], N = r[1], E = r[2], M = r[3], T = 0, A = 0, L = -(N - M), B = P - E, Y = 0, H = 0, rt = Math.sqrt(L * L + B * B);
    L /= rt, B /= rt, L *= _, B *= _;
    var at = s.alignment, Z = (1 - at) * 2, w = at * 2;
    h || (s.cap === LINE_CAP.ROUND ? g += round(P - L * (Z - w) * 0.5, N - B * (Z - w) * 0.5, P - L * Z, N - B * Z, P + L * w, N + B * w, d, !0) + 2 : s.cap === LINE_CAP.SQUARE && (g += square(P, N, L, B, Z, w, !0, d))), d.push(P - L * Z, N - B * Z), d.push(P + L * w, N + B * w);
    for (var O = 1; O < m - 1; ++O) {
      P = r[(O - 1) * 2], N = r[(O - 1) * 2 + 1], E = r[O * 2], M = r[O * 2 + 1], T = r[(O + 1) * 2], A = r[(O + 1) * 2 + 1], L = -(N - M), B = P - E, rt = Math.sqrt(L * L + B * B), L /= rt, B /= rt, L *= _, B *= _, Y = -(M - A), H = E - T, rt = Math.sqrt(Y * Y + H * H), Y /= rt, H /= rt, Y *= _, H *= _;
      var R = E - P, F = N - M, D = E - T, C = A - M, U = R * D + F * C, k = F * D - C * R, $ = k < 0;
      if (Math.abs(k) < 1e-3 * Math.abs(U)) {
        d.push(E - L * Z, M - B * Z), d.push(E + L * w, M + B * w), U >= 0 && (s.join === LINE_JOIN.ROUND ? g += round(E, M, E - L * Z, M - B * Z, E - Y * Z, M - H * Z, d, !1) + 4 : g += 2, d.push(E - Y * w, M - H * w), d.push(E + Y * Z, M + H * Z));
        continue;
      }
      var K = (-L + P) * (-B + M) - (-L + E) * (-B + N), I = (-Y + T) * (-H + M) - (-Y + E) * (-H + A), tt = (R * I - D * K) / k, q = (C * K - F * I) / k, nt = (tt - E) * (tt - E) + (q - M) * (q - M), Q = E + (tt - E) * Z, V = M + (q - M) * Z, st = E - (tt - E) * w, it = M - (q - M) * w, z = Math.min(R * R + F * F, D * D + C * C), J = $ ? Z : w, et = z + J * J * b, W = nt <= et;
      W ? s.join === LINE_JOIN.BEVEL || nt / b > S ? ($ ? (d.push(Q, V), d.push(E + L * w, M + B * w), d.push(Q, V), d.push(E + Y * w, M + H * w)) : (d.push(E - L * Z, M - B * Z), d.push(st, it), d.push(E - Y * Z, M - H * Z), d.push(st, it)), g += 2) : s.join === LINE_JOIN.ROUND ? $ ? (d.push(Q, V), d.push(E + L * w, M + B * w), g += round(E, M, E + L * w, M + B * w, E + Y * w, M + H * w, d, !0) + 4, d.push(Q, V), d.push(E + Y * w, M + H * w)) : (d.push(E - L * Z, M - B * Z), d.push(st, it), g += round(E, M, E - L * Z, M - B * Z, E - Y * Z, M - H * Z, d, !1) + 4, d.push(E - Y * Z, M - H * Z), d.push(st, it)) : (d.push(Q, V), d.push(st, it)) : (d.push(E - L * Z, M - B * Z), d.push(E + L * w, M + B * w), s.join === LINE_JOIN.ROUND ? $ ? g += round(E, M, E + L * w, M + B * w, E + Y * w, M + H * w, d, !0) + 2 : g += round(E, M, E - L * Z, M - B * Z, E - Y * Z, M - H * Z, d, !1) + 2 : s.join === LINE_JOIN.MITER && nt / b <= S && ($ ? (d.push(st, it), d.push(st, it)) : (d.push(Q, V), d.push(Q, V)), g += 2), d.push(E - Y * Z, M - H * Z), d.push(E + Y * w, M + H * w), g += 2);
    }
    P = r[(m - 2) * 2], N = r[(m - 2) * 2 + 1], E = r[(m - 1) * 2], M = r[(m - 1) * 2 + 1], L = -(N - M), B = P - E, rt = Math.sqrt(L * L + B * B), L /= rt, B /= rt, L *= _, B *= _, d.push(E - L * Z, M - B * Z), d.push(E + L * w, M + B * w), h || (s.cap === LINE_CAP.ROUND ? g += round(E - L * (Z - w) * 0.5, M - B * (Z - w) * 0.5, E - L * Z, M - B * Z, E + L * w, M + B * w, d, !1) + 2 : s.cap === LINE_CAP.SQUARE && (g += square(E, M, L, B, Z, w, !1, d)));
    for (var vt = t.indices, yt = GRAPHICS_CURVES.epsilon * GRAPHICS_CURVES.epsilon, O = y; O < g + y - 2; ++O)
      P = d[O * 2], N = d[O * 2 + 1], E = d[(O + 1) * 2], M = d[(O + 1) * 2 + 1], T = d[(O + 2) * 2], A = d[(O + 2) * 2 + 1], !(Math.abs(P * (M - A) + E * (A - N) + T * (N - M)) < yt) && vt.push(O, O + 1, O + 2);
  }
}
function buildNativeLine(n, t) {
  var e = 0, r = n.shape, a = n.points || r.points, s = r.type !== SHAPES.POLY || r.closeStroke;
  if (a.length !== 0) {
    var o = t.points, u = t.indices, h = a.length / 2, l = o.length / 2, c = l;
    for (o.push(a[0], a[1]), e = 1; e < h; e++)
      o.push(a[e * 2], a[e * 2 + 1]), u.push(c, c + 1), c++;
    s && u.push(c, l);
  }
}
function buildLine(n, t) {
  n.lineStyle.native ? buildNativeLine(n, t) : buildNonNativeLine(n, t);
}
var ArcUtils = (
  /** @class */
  function() {
    function n() {
    }
    return n.curveTo = function(t, e, r, a, s, o) {
      var u = o[o.length - 2], h = o[o.length - 1], l = h - e, c = u - t, v = a - e, d = r - t, m = Math.abs(l * d - c * v);
      if (m < 1e-8 || s === 0)
        return (o[o.length - 2] !== t || o[o.length - 1] !== e) && o.push(t, e), null;
      var g = l * l + c * c, y = v * v + d * d, _ = l * v + c * d, b = s * Math.sqrt(g) / m, S = s * Math.sqrt(y) / m, P = b * _ / g, N = S * _ / y, E = b * d + S * c, M = b * v + S * l, T = c * (S + P), A = l * (S + P), L = d * (b + N), B = v * (b + N), Y = Math.atan2(A - M, T - E), H = Math.atan2(B - M, L - E);
      return {
        cx: E + t,
        cy: M + e,
        radius: s,
        startAngle: Y,
        endAngle: H,
        anticlockwise: c * v > d * l
      };
    }, n.arc = function(t, e, r, a, s, o, u, h, l) {
      for (var c = u - o, v = GRAPHICS_CURVES._segmentsCount(Math.abs(c) * s, Math.ceil(Math.abs(c) / PI_2) * 40), d = c / (v * 2), m = d * 2, g = Math.cos(d), y = Math.sin(d), _ = v - 1, b = _ % 1 / _, S = 0; S <= _; ++S) {
        var P = S + b * S, N = d + o + m * P, E = Math.cos(N), M = -Math.sin(N);
        l.push((g * E + y * M) * s + r, (g * -M + y * E) * s + a);
      }
    }, n;
  }()
), BezierUtils = (
  /** @class */
  function() {
    function n() {
    }
    return n.curveLength = function(t, e, r, a, s, o, u, h) {
      for (var l = 10, c = 0, v = 0, d = 0, m = 0, g = 0, y = 0, _ = 0, b = 0, S = 0, P = 0, N = 0, E = t, M = e, T = 1; T <= l; ++T)
        v = T / l, d = v * v, m = d * v, g = 1 - v, y = g * g, _ = y * g, b = _ * t + 3 * y * v * r + 3 * g * d * s + m * u, S = _ * e + 3 * y * v * a + 3 * g * d * o + m * h, P = E - b, N = M - S, E = b, M = S, c += Math.sqrt(P * P + N * N);
      return c;
    }, n.curveTo = function(t, e, r, a, s, o, u) {
      var h = u[u.length - 2], l = u[u.length - 1];
      u.length -= 2;
      var c = GRAPHICS_CURVES._segmentsCount(n.curveLength(h, l, t, e, r, a, s, o)), v = 0, d = 0, m = 0, g = 0, y = 0;
      u.push(h, l);
      for (var _ = 1, b = 0; _ <= c; ++_)
        b = _ / c, v = 1 - b, d = v * v, m = d * v, g = b * b, y = g * b, u.push(m * h + 3 * d * b * t + 3 * v * g * r + y * s, m * l + 3 * d * b * e + 3 * v * g * a + y * o);
    }, n;
  }()
), QuadraticUtils = (
  /** @class */
  function() {
    function n() {
    }
    return n.curveLength = function(t, e, r, a, s, o) {
      var u = t - 2 * r + s, h = e - 2 * a + o, l = 2 * r - 2 * t, c = 2 * a - 2 * e, v = 4 * (u * u + h * h), d = 4 * (u * l + h * c), m = l * l + c * c, g = 2 * Math.sqrt(v + d + m), y = Math.sqrt(v), _ = 2 * v * y, b = 2 * Math.sqrt(m), S = d / y;
      return (_ * g + y * d * (g - b) + (4 * m * v - d * d) * Math.log((2 * y + S + g) / (S + b))) / (4 * _);
    }, n.curveTo = function(t, e, r, a, s) {
      for (var o = s[s.length - 2], u = s[s.length - 1], h = GRAPHICS_CURVES._segmentsCount(n.curveLength(o, u, t, e, r, a)), l = 0, c = 0, v = 1; v <= h; ++v) {
        var d = v / h;
        l = o + (t - o) * d, c = u + (e - u) * d, s.push(l + (t + (r - t) * d - l) * d, c + (e + (a - e) * d - c) * d);
      }
    }, n;
  }()
), BatchPart = (
  /** @class */
  function() {
    function n() {
      this.reset();
    }
    return n.prototype.begin = function(t, e, r) {
      this.reset(), this.style = t, this.start = e, this.attribStart = r;
    }, n.prototype.end = function(t, e) {
      this.attribSize = e - this.attribStart, this.size = t - this.start;
    }, n.prototype.reset = function() {
      this.style = null, this.size = 0, this.start = 0, this.attribStart = 0, this.attribSize = 0;
    }, n;
  }()
), _a, FILL_COMMANDS = (_a = {}, _a[SHAPES.POLY] = buildPoly, _a[SHAPES.CIRC] = buildCircle, _a[SHAPES.ELIP] = buildCircle, _a[SHAPES.RECT] = buildRectangle, _a[SHAPES.RREC] = buildRoundedRectangle, _a), BATCH_POOL = [], DRAW_CALL_POOL = [], GraphicsData = (
  /** @class */
  function() {
    function n(t, e, r, a) {
      e === void 0 && (e = null), r === void 0 && (r = null), a === void 0 && (a = null), this.points = [], this.holes = [], this.shape = t, this.lineStyle = r, this.fillStyle = e, this.matrix = a, this.type = t.type;
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
    __extends$e(t, n);
    function t() {
      var e = n.call(this) || this;
      return e.closePointEps = 1e-4, e.boundsPadding = 0, e.uvsFloat32 = null, e.indicesUint16 = null, e.batchable = !1, e.points = [], e.colors = [], e.uvs = [], e.indices = [], e.textureIds = [], e.graphicsData = [], e.drawCalls = [], e.batchDirty = -1, e.batches = [], e.dirty = 0, e.cacheDirty = -1, e.clearDirty = 0, e.shapeIndex = 0, e._bounds = new Bounds(), e.boundsDirty = -1, e;
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
        this.drawCalls[e].texArray.clear(), DRAW_CALL_POOL.push(this.drawCalls[e]);
      this.drawCalls.length = 0;
      for (var e = 0; e < this.batches.length; e++) {
        var r = this.batches[e];
        r.reset(), BATCH_POOL.push(r);
      }
      this.batches.length = 0;
    }, t.prototype.clear = function() {
      return this.graphicsData.length > 0 && (this.invalidate(), this.clearDirty++, this.graphicsData.length = 0), this;
    }, t.prototype.drawShape = function(e, r, a, s) {
      r === void 0 && (r = null), a === void 0 && (a = null), s === void 0 && (s = null);
      var o = new GraphicsData(e, r, a, s);
      return this.graphicsData.push(o), this.dirty++, this;
    }, t.prototype.drawHole = function(e, r) {
      if (r === void 0 && (r = null), !this.graphicsData.length)
        return null;
      var a = new GraphicsData(e, null, null, r), s = this.graphicsData[this.graphicsData.length - 1];
      return a.lineStyle = s.lineStyle, s.holes.push(a), this.dirty++, this;
    }, t.prototype.destroy = function() {
      n.prototype.destroy.call(this);
      for (var e = 0; e < this.graphicsData.length; ++e)
        this.graphicsData[e].destroy();
      this.points.length = 0, this.points = null, this.colors.length = 0, this.colors = null, this.uvs.length = 0, this.uvs = null, this.indices.length = 0, this.indices = null, this.indexBuffer.destroy(), this.indexBuffer = null, this.graphicsData.length = 0, this.graphicsData = null, this.drawCalls.length = 0, this.drawCalls = null, this.batches.length = 0, this.batches = null, this._bounds = null;
    }, t.prototype.containsPoint = function(e) {
      for (var r = this.graphicsData, a = 0; a < r.length; ++a) {
        var s = r[a];
        if (s.fillStyle.visible && s.shape && (s.matrix ? s.matrix.applyInverse(e, tmpPoint) : tmpPoint.copyFrom(e), s.shape.contains(tmpPoint.x, tmpPoint.y))) {
          var o = !1;
          if (s.holes)
            for (var u = 0; u < s.holes.length; u++) {
              var h = s.holes[u];
              if (h.shape.contains(tmpPoint.x, tmpPoint.y)) {
                o = !0;
                break;
              }
            }
          if (!o)
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
        var e = this.uvs, r = this.graphicsData, a = null, s = null;
        this.batches.length > 0 && (a = this.batches[this.batches.length - 1], s = a.style);
        for (var o = this.shapeIndex; o < r.length; o++) {
          this.shapeIndex++;
          var u = r[o], h = u.fillStyle, l = u.lineStyle, c = FILL_COMMANDS[u.type];
          c.build(u), u.matrix && this.transformPoints(u.points, u.matrix), (h.visible || l.visible) && this.processHoles(u.holes);
          for (var v = 0; v < 2; v++) {
            var d = v === 0 ? h : l;
            if (d.visible) {
              var m = d.texture.baseTexture, g = this.indices.length, y = this.points.length / 2;
              m.wrapMode = WRAP_MODES.REPEAT, v === 0 ? this.processFill(u) : this.processLine(u);
              var _ = this.points.length / 2 - y;
              _ !== 0 && (a && !this._compareStyles(s, d) && (a.end(g, y), a = null), a || (a = BATCH_POOL.pop() || new BatchPart(), a.begin(d, g, y), this.batches.push(a), s = d), this.addUvs(this.points, e, d.texture, y, _, d.matrix));
            }
          }
        }
        var b = this.indices.length, S = this.points.length / 2;
        if (a && a.end(b, S), this.batches.length === 0) {
          this.batchable = !0;
          return;
        }
        var P = S > 65535;
        this.indicesUint16 && this.indices.length === this.indicesUint16.length && P === this.indicesUint16.BYTES_PER_ELEMENT > 2 ? this.indicesUint16.set(this.indices) : this.indicesUint16 = P ? new Uint32Array(this.indices) : new Uint16Array(this.indices), this.batchable = this.isBatchable(), this.batchable ? this.packBatches() : this.buildDrawCalls();
      }
    }, t.prototype._compareStyles = function(e, r) {
      return !(!e || !r || e.texture.baseTexture !== r.texture.baseTexture || e.color + e.alpha !== r.color + r.alpha || !!e.native != !!r.native);
    }, t.prototype.validateBatching = function() {
      if (this.dirty === this.cacheDirty || !this.graphicsData.length)
        return !1;
      for (var e = 0, r = this.graphicsData.length; e < r; e++) {
        var a = this.graphicsData[e], s = a.fillStyle, o = a.lineStyle;
        if (s && !s.texture.baseTexture.valid || o && !o.texture.baseTexture.valid)
          return !1;
      }
      return !0;
    }, t.prototype.packBatches = function() {
      this.batchDirty++, this.uvsFloat32 = new Float32Array(this.uvs);
      for (var e = this.batches, r = 0, a = e.length; r < a; r++)
        for (var s = e[r], o = 0; o < s.size; o++) {
          var u = s.start + o;
          this.indicesUint16[u] = this.indicesUint16[u] - s.attribStart;
        }
    }, t.prototype.isBatchable = function() {
      if (this.points.length > 65535 * 2)
        return !1;
      for (var e = this.batches, r = 0; r < e.length; r++)
        if (e[r].style.native)
          return !1;
      return this.points.length < t.BATCHABLE_SIZE * 2;
    }, t.prototype.buildDrawCalls = function() {
      for (var e = ++BaseTexture._globalBatch, r = 0; r < this.drawCalls.length; r++)
        this.drawCalls[r].texArray.clear(), DRAW_CALL_POOL.push(this.drawCalls[r]);
      this.drawCalls.length = 0;
      var a = this.colors, s = this.textureIds, o = DRAW_CALL_POOL.pop();
      o || (o = new BatchDrawCall(), o.texArray = new BatchTextureArray()), o.texArray.count = 0, o.start = 0, o.size = 0, o.type = DRAW_MODES.TRIANGLES;
      var u = 0, h = null, l = 0, c = !1, v = DRAW_MODES.TRIANGLES, d = 0;
      this.drawCalls.push(o);
      for (var r = 0; r < this.batches.length; r++) {
        var m = this.batches[r], g = 8, y = m.style, _ = y.texture.baseTexture;
        c !== !!y.native && (c = !!y.native, v = c ? DRAW_MODES.LINES : DRAW_MODES.TRIANGLES, h = null, u = g, e++), h !== _ && (h = _, _._batchEnabled !== e && (u === g && (e++, u = 0, o.size > 0 && (o = DRAW_CALL_POOL.pop(), o || (o = new BatchDrawCall(), o.texArray = new BatchTextureArray()), this.drawCalls.push(o)), o.start = d, o.size = 0, o.texArray.count = 0, o.type = v), _.touched = 1, _._batchEnabled = e, _._batchLocation = u, _.wrapMode = WRAP_MODES.REPEAT, o.texArray.elements[o.texArray.count++] = _, u++)), o.size += m.size, d += m.size, l = _._batchLocation, this.addColors(a, y.color, y.alpha, m.attribSize, m.attribStart), this.addTextureIds(s, l, m.attribSize, m.attribStart);
      }
      BaseTexture._globalBatch = e, this.packAttributes();
    }, t.prototype.packAttributes = function() {
      for (var e = this.points, r = this.uvs, a = this.colors, s = this.textureIds, o = new ArrayBuffer(e.length * 3 * 4), u = new Float32Array(o), h = new Uint32Array(o), l = 0, c = 0; c < e.length / 2; c++)
        u[l++] = e[c * 2], u[l++] = e[c * 2 + 1], u[l++] = r[c * 2], u[l++] = r[c * 2 + 1], h[l++] = a[c], u[l++] = s[c];
      this._buffer.update(o), this._indexBuffer.update(this.indicesUint16);
    }, t.prototype.processFill = function(e) {
      if (e.holes.length)
        buildPoly.triangulate(e, this);
      else {
        var r = FILL_COMMANDS[e.type];
        r.triangulate(e, this);
      }
    }, t.prototype.processLine = function(e) {
      buildLine(e, this);
      for (var r = 0; r < e.holes.length; r++)
        buildLine(e.holes[r], this);
    }, t.prototype.processHoles = function(e) {
      for (var r = 0; r < e.length; r++) {
        var a = e[r], s = FILL_COMMANDS[a.type];
        s.build(a), a.matrix && this.transformPoints(a.points, a.matrix);
      }
    }, t.prototype.calculateBounds = function() {
      var e = this._bounds;
      e.clear(), e.addVertexData(this.points, 0, this.points.length), e.pad(this.boundsPadding, this.boundsPadding);
    }, t.prototype.transformPoints = function(e, r) {
      for (var a = 0; a < e.length / 2; a++) {
        var s = e[a * 2], o = e[a * 2 + 1];
        e[a * 2] = r.a * s + r.c * o + r.tx, e[a * 2 + 1] = r.b * s + r.d * o + r.ty;
      }
    }, t.prototype.addColors = function(e, r, a, s, o) {
      o === void 0 && (o = 0);
      var u = (r >> 16) + (r & 65280) + ((r & 255) << 16), h = premultiplyTint(u, a);
      e.length = Math.max(e.length, o + s);
      for (var l = 0; l < s; l++)
        e[o + l] = h;
    }, t.prototype.addTextureIds = function(e, r, a, s) {
      s === void 0 && (s = 0), e.length = Math.max(e.length, s + a);
      for (var o = 0; o < a; o++)
        e[s + o] = r;
    }, t.prototype.addUvs = function(e, r, a, s, o, u) {
      u === void 0 && (u = null);
      for (var h = 0, l = r.length, c = a.frame; h < o; ) {
        var v = e[(s + h) * 2], d = e[(s + h) * 2 + 1];
        if (u) {
          var m = u.a * v + u.c * d + u.tx;
          d = u.b * v + u.d * d + u.ty, v = m;
        }
        h++, r.push(v / c.width, d / c.height);
      }
      var g = a.baseTexture;
      (c.width < g.width || c.height < g.height) && this.adjustUvs(r, a, l, o);
    }, t.prototype.adjustUvs = function(e, r, a, s) {
      for (var o = r.baseTexture, u = 1e-6, h = a + s * 2, l = r.frame, c = l.width / o.width, v = l.height / o.height, d = l.x / l.width, m = l.y / l.height, g = Math.floor(e[a] + u), y = Math.floor(e[a + 1] + u), _ = a + 2; _ < h; _ += 2)
        g = Math.min(g, Math.floor(e[_] + u)), y = Math.min(y, Math.floor(e[_ + 1] + u));
      d -= g, m -= y;
      for (var _ = a; _ < h; _ += 2)
        e[_] = (e[_] + d) * c, e[_ + 1] = (e[_ + 1] + m) * v;
    }, t.BATCHABLE_SIZE = 100, t;
  }(BatchGeometry)
), LineStyle = (
  /** @class */
  function(n) {
    __extends$e(t, n);
    function t() {
      var e = n !== null && n.apply(this, arguments) || this;
      return e.width = 0, e.alignment = 0.5, e.native = !1, e.cap = LINE_CAP.BUTT, e.join = LINE_JOIN.MITER, e.miterLimit = 10, e;
    }
    return t.prototype.clone = function() {
      var e = new t();
      return e.color = this.color, e.alpha = this.alpha, e.texture = this.texture, e.matrix = this.matrix, e.visible = this.visible, e.width = this.width, e.alignment = this.alignment, e.native = this.native, e.cap = this.cap, e.join = this.join, e.miterLimit = this.miterLimit, e;
    }, t.prototype.reset = function() {
      n.prototype.reset.call(this), this.color = 0, this.alignment = 0.5, this.width = 0, this.native = !1;
    }, t;
  }(FillStyle)
), temp = new Float32Array(3), DEFAULT_SHADERS = {}, Graphics = (
  /** @class */
  function(n) {
    __extends$e(t, n);
    function t(e) {
      e === void 0 && (e = null);
      var r = n.call(this) || this;
      return r.shader = null, r.pluginName = "batch", r.currentPath = null, r.batches = [], r.batchTint = -1, r.batchDirty = -1, r.vertexData = null, r._fillStyle = new FillStyle(), r._lineStyle = new LineStyle(), r._matrix = null, r._holeMode = !1, r.state = State.for2d(), r._geometry = e || new GraphicsGeometry(), r._geometry.refCount++, r._transformID = -1, r.tint = 16777215, r.blendMode = BLEND_MODES.NORMAL, r;
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
    }), t.prototype.lineStyle = function(e, r, a, s, o) {
      return e === void 0 && (e = null), r === void 0 && (r = 0), a === void 0 && (a = 1), s === void 0 && (s = 0.5), o === void 0 && (o = !1), typeof e == "number" && (e = { width: e, color: r, alpha: a, alignment: s, native: o }), this.lineTextureStyle(e);
    }, t.prototype.lineTextureStyle = function(e) {
      e = Object.assign({
        width: 0,
        texture: Texture.WHITE,
        color: e && e.texture ? 16777215 : 0,
        alpha: 1,
        matrix: null,
        alignment: 0.5,
        native: !1,
        cap: LINE_CAP.BUTT,
        join: LINE_JOIN.MITER,
        miterLimit: 10
      }, e), this.currentPath && this.startPoly();
      var r = e.width > 0 && e.alpha > 0;
      return r ? (e.matrix && (e.matrix = e.matrix.clone(), e.matrix.invert()), Object.assign(this._lineStyle, { visible: r }, e)) : this._lineStyle.reset(), this;
    }, t.prototype.startPoly = function() {
      if (this.currentPath) {
        var e = this.currentPath.points, r = this.currentPath.points.length;
        r > 2 && (this.drawShape(this.currentPath), this.currentPath = new Polygon(), this.currentPath.closeStroke = !1, this.currentPath.points.push(e[r - 2], e[r - 1]));
      } else
        this.currentPath = new Polygon(), this.currentPath.closeStroke = !1;
    }, t.prototype.finishPoly = function() {
      this.currentPath && (this.currentPath.points.length > 2 ? (this.drawShape(this.currentPath), this.currentPath = null) : this.currentPath.points.length = 0);
    }, t.prototype.moveTo = function(e, r) {
      return this.startPoly(), this.currentPath.points[0] = e, this.currentPath.points[1] = r, this;
    }, t.prototype.lineTo = function(e, r) {
      this.currentPath || this.moveTo(0, 0);
      var a = this.currentPath.points, s = a[a.length - 2], o = a[a.length - 1];
      return (s !== e || o !== r) && a.push(e, r), this;
    }, t.prototype._initCurve = function(e, r) {
      e === void 0 && (e = 0), r === void 0 && (r = 0), this.currentPath ? this.currentPath.points.length === 0 && (this.currentPath.points = [e, r]) : this.moveTo(e, r);
    }, t.prototype.quadraticCurveTo = function(e, r, a, s) {
      this._initCurve();
      var o = this.currentPath.points;
      return o.length === 0 && this.moveTo(0, 0), QuadraticUtils.curveTo(e, r, a, s, o), this;
    }, t.prototype.bezierCurveTo = function(e, r, a, s, o, u) {
      return this._initCurve(), BezierUtils.curveTo(e, r, a, s, o, u, this.currentPath.points), this;
    }, t.prototype.arcTo = function(e, r, a, s, o) {
      this._initCurve(e, r);
      var u = this.currentPath.points, h = ArcUtils.curveTo(e, r, a, s, o, u);
      if (h) {
        var l = h.cx, c = h.cy, v = h.radius, d = h.startAngle, m = h.endAngle, g = h.anticlockwise;
        this.arc(l, c, v, d, m, g);
      }
      return this;
    }, t.prototype.arc = function(e, r, a, s, o, u) {
      if (u === void 0 && (u = !1), s === o)
        return this;
      !u && o <= s ? o += PI_2 : u && s <= o && (s += PI_2);
      var h = o - s;
      if (h === 0)
        return this;
      var l = e + Math.cos(s) * a, c = r + Math.sin(s) * a, v = this._geometry.closePointEps, d = this.currentPath ? this.currentPath.points : null;
      if (d) {
        var m = Math.abs(d[d.length - 2] - l), g = Math.abs(d[d.length - 1] - c);
        m < v && g < v || d.push(l, c);
      } else
        this.moveTo(l, c), d = this.currentPath.points;
      return ArcUtils.arc(l, c, e, r, a, s, o, u, d), this;
    }, t.prototype.beginFill = function(e, r) {
      return e === void 0 && (e = 0), r === void 0 && (r = 1), this.beginTextureFill({ texture: Texture.WHITE, color: e, alpha: r });
    }, t.prototype.beginTextureFill = function(e) {
      e = Object.assign({
        texture: Texture.WHITE,
        color: 16777215,
        alpha: 1,
        matrix: null
      }, e), this.currentPath && this.startPoly();
      var r = e.alpha > 0;
      return r ? (e.matrix && (e.matrix = e.matrix.clone(), e.matrix.invert()), Object.assign(this._fillStyle, { visible: r }, e)) : this._fillStyle.reset(), this;
    }, t.prototype.endFill = function() {
      return this.finishPoly(), this._fillStyle.reset(), this;
    }, t.prototype.drawRect = function(e, r, a, s) {
      return this.drawShape(new Rectangle(e, r, a, s));
    }, t.prototype.drawRoundedRect = function(e, r, a, s, o) {
      return this.drawShape(new RoundedRectangle(e, r, a, s, o));
    }, t.prototype.drawCircle = function(e, r, a) {
      return this.drawShape(new Circle(e, r, a));
    }, t.prototype.drawEllipse = function(e, r, a, s) {
      return this.drawShape(new Ellipse(e, r, a, s));
    }, t.prototype.drawPolygon = function() {
      for (var e = arguments, r = [], a = 0; a < arguments.length; a++)
        r[a] = e[a];
      var s, o = !0, u = r[0];
      u.points ? (o = u.closeStroke, s = u.points) : Array.isArray(r[0]) ? s = r[0] : s = r;
      var h = new Polygon(s);
      return h.closeStroke = o, this.drawShape(h), this;
    }, t.prototype.drawShape = function(e) {
      return this._holeMode ? this._geometry.drawHole(e, this._matrix) : this._geometry.drawShape(e, this._fillStyle.clone(), this._lineStyle.clone(), this._matrix), this;
    }, t.prototype.clear = function() {
      return this._geometry.clear(), this._lineStyle.reset(), this._fillStyle.reset(), this._boundsID++, this._matrix = null, this._holeMode = !1, this.currentPath = null, this;
    }, t.prototype.isFastRect = function() {
      var e = this._geometry.graphicsData;
      return e.length === 1 && e[0].shape.type === SHAPES.RECT && !e[0].matrix && !e[0].holes.length && !(e[0].lineStyle.visible && e[0].lineStyle.width);
    }, t.prototype._render = function(e) {
      this.finishPoly();
      var r = this._geometry;
      r.updateBatches(), r.batchable ? (this.batchDirty !== r.batchDirty && this._populateBatches(), this._renderBatched(e)) : (e.batch.flush(), this._renderDirect(e));
    }, t.prototype._populateBatches = function() {
      var e = this._geometry, r = this.blendMode, a = e.batches.length;
      this.batchTint = -1, this._transformID = -1, this.batchDirty = e.batchDirty, this.batches.length = a, this.vertexData = new Float32Array(e.points);
      for (var s = 0; s < a; s++) {
        var o = e.batches[s], u = o.style.color, h = new Float32Array(this.vertexData.buffer, o.attribStart * 4 * 2, o.attribSize * 2), l = new Float32Array(e.uvsFloat32.buffer, o.attribStart * 4 * 2, o.attribSize * 2), c = new Uint16Array(e.indicesUint16.buffer, o.start * 2, o.size), v = {
          vertexData: h,
          blendMode: r,
          indices: c,
          uvs: l,
          _batchRGB: hex2rgb(u),
          _tintRGB: u,
          _texture: o.style.texture,
          alpha: o.style.alpha,
          worldAlpha: 1
        };
        this.batches[s] = v;
      }
    }, t.prototype._renderBatched = function(e) {
      if (this.batches.length) {
        e.batch.setObjectRenderer(e.plugins[this.pluginName]), this.calculateVertices(), this.calculateTints();
        for (var r = 0, a = this.batches.length; r < a; r++) {
          var s = this.batches[r];
          s.worldAlpha = this.worldAlpha * s.alpha, e.plugins[this.pluginName].render(s);
        }
      }
    }, t.prototype._renderDirect = function(e) {
      var r = this._resolveDirectShader(e), a = this._geometry, s = this.tint, o = this.worldAlpha, u = r.uniforms, h = a.drawCalls;
      u.translationMatrix = this.transform.worldTransform, u.tint[0] = (s >> 16 & 255) / 255 * o, u.tint[1] = (s >> 8 & 255) / 255 * o, u.tint[2] = (s & 255) / 255 * o, u.tint[3] = o, e.shader.bind(r), e.geometry.bind(a, r), e.state.set(this.state);
      for (var l = 0, c = h.length; l < c; l++)
        this._renderDrawCallDirect(e, a.drawCalls[l]);
    }, t.prototype._renderDrawCallDirect = function(e, r) {
      for (var a = r.texArray, s = r.type, o = r.size, u = r.start, h = a.count, l = 0; l < h; l++)
        e.texture.bind(a.elements[l], l);
      e.geometry.draw(s, o, u);
    }, t.prototype._resolveDirectShader = function(e) {
      var r = this.shader, a = this.pluginName;
      if (!r) {
        if (!DEFAULT_SHADERS[a]) {
          for (var s = e.plugins[a].MAX_TEXTURES, o = new Int32Array(s), u = 0; u < s; u++)
            o[u] = u;
          var h = {
            tint: new Float32Array([1, 1, 1, 1]),
            translationMatrix: new Matrix(),
            default: UniformGroup.from({ uSamplers: o }, !0)
          }, l = e.plugins[a]._shader.program;
          DEFAULT_SHADERS[a] = new Shader(l, h);
        }
        r = DEFAULT_SHADERS[a];
      }
      return r;
    }, t.prototype._calculateBounds = function() {
      this.finishPoly();
      var e = this._geometry;
      if (e.graphicsData.length) {
        var r = e.bounds, a = r.minX, s = r.minY, o = r.maxX, u = r.maxY;
        this._bounds.addFrame(this.transform, a, s, o, u);
      }
    }, t.prototype.containsPoint = function(e) {
      return this.worldTransform.applyInverse(e, t._TEMP_POINT), this._geometry.containsPoint(t._TEMP_POINT);
    }, t.prototype.calculateTints = function() {
      if (this.batchTint !== this.tint) {
        this.batchTint = this.tint;
        for (var e = hex2rgb(this.tint, temp), r = 0; r < this.batches.length; r++) {
          var a = this.batches[r], s = a._batchRGB, o = e[0] * s[0] * 255, u = e[1] * s[1] * 255, h = e[2] * s[2] * 255, l = (o << 16) + (u << 8) + (h | 0);
          a._tintRGB = (l >> 16) + (l & 65280) + ((l & 255) << 16);
        }
      }
    }, t.prototype.calculateVertices = function() {
      var e = this.transform._worldID;
      if (this._transformID !== e) {
        this._transformID = e;
        for (var r = this.transform.worldTransform, a = r.a, s = r.b, o = r.c, u = r.d, h = r.tx, l = r.ty, c = this._geometry.points, v = this.vertexData, d = 0, m = 0; m < c.length; m += 2) {
          var g = c[m], y = c[m + 1];
          v[d++] = a * g + o * y + h, v[d++] = u * y + s * g + l;
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
      this._geometry.refCount--, this._geometry.refCount === 0 && this._geometry.dispose(), this._matrix = null, this.currentPath = null, this._lineStyle.destroy(), this._lineStyle = null, this._fillStyle.destroy(), this._fillStyle = null, this._geometry = null, this.shader = null, this.vertexData = null, this.batches.length = 0, this.batches = null, n.prototype.destroy.call(this, e);
    }, t.nextRoundedRectBehavior = !1, t._TEMP_POINT = new Point(), t;
  }(Container)
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
var extendStatics$d = function(n, t) {
  return extendStatics$d = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, r) {
    e.__proto__ = r;
  } || function(e, r) {
    for (var a in r)
      r.hasOwnProperty(a) && (e[a] = r[a]);
  }, extendStatics$d(n, t);
};
function __extends$d(n, t) {
  extendStatics$d(n, t);
  function e() {
    this.constructor = n;
  }
  n.prototype = t === null ? Object.create(t) : (e.prototype = t.prototype, new e());
}
var tempPoint$2 = new Point(), indices = new Uint16Array([0, 1, 2, 0, 2, 3]), Sprite = (
  /** @class */
  function(n) {
    __extends$d(t, n);
    function t(e) {
      var r = n.call(this) || this;
      return r._anchor = new ObservablePoint(r._onAnchorUpdate, r, e ? e.defaultAnchor.x : 0, e ? e.defaultAnchor.y : 0), r._texture = null, r._width = 0, r._height = 0, r._tint = null, r._tintRGB = null, r.tint = 16777215, r.blendMode = BLEND_MODES.NORMAL, r._cachedTint = 16777215, r.uvs = null, r.texture = e || Texture.EMPTY, r.vertexData = new Float32Array(8), r.vertexTrimmedData = null, r._transformID = -1, r._textureID = -1, r._transformTrimmedID = -1, r._textureTrimmedID = -1, r.indices = indices, r.pluginName = "batch", r.isSprite = !0, r._roundPixels = settings.ROUND_PIXELS, r;
    }
    return t.prototype._onTextureUpdate = function() {
      this._textureID = -1, this._textureTrimmedID = -1, this._cachedTint = 16777215, this._width && (this.scale.x = sign(this.scale.x) * this._width / this._texture.orig.width), this._height && (this.scale.y = sign(this.scale.y) * this._height / this._texture.orig.height);
    }, t.prototype._onAnchorUpdate = function() {
      this._transformID = -1, this._transformTrimmedID = -1;
    }, t.prototype.calculateVertices = function() {
      var e = this._texture;
      if (!(this._transformID === this.transform._worldID && this._textureID === e._updateID)) {
        this._textureID !== e._updateID && (this.uvs = this._texture._uvs.uvsFloat32), this._transformID = this.transform._worldID, this._textureID = e._updateID;
        var r = this.transform.worldTransform, a = r.a, s = r.b, o = r.c, u = r.d, h = r.tx, l = r.ty, c = this.vertexData, v = e.trim, d = e.orig, m = this._anchor, g = 0, y = 0, _ = 0, b = 0;
        if (v ? (y = v.x - m._x * d.width, g = y + v.width, b = v.y - m._y * d.height, _ = b + v.height) : (y = -m._x * d.width, g = y + d.width, b = -m._y * d.height, _ = b + d.height), c[0] = a * y + o * b + h, c[1] = u * b + s * y + l, c[2] = a * g + o * b + h, c[3] = u * b + s * g + l, c[4] = a * g + o * _ + h, c[5] = u * _ + s * g + l, c[6] = a * y + o * _ + h, c[7] = u * _ + s * y + l, this._roundPixels)
          for (var S = settings.RESOLUTION, P = 0; P < c.length; ++P)
            c[P] = Math.round((c[P] * S | 0) / S);
      }
    }, t.prototype.calculateTrimmedVertices = function() {
      if (!this.vertexTrimmedData)
        this.vertexTrimmedData = new Float32Array(8);
      else if (this._transformTrimmedID === this.transform._worldID && this._textureTrimmedID === this._texture._updateID)
        return;
      this._transformTrimmedID = this.transform._worldID, this._textureTrimmedID = this._texture._updateID;
      var e = this._texture, r = this.vertexTrimmedData, a = e.orig, s = this._anchor, o = this.transform.worldTransform, u = o.a, h = o.b, l = o.c, c = o.d, v = o.tx, d = o.ty, m = -s._x * a.width, g = m + a.width, y = -s._y * a.height, _ = y + a.height;
      r[0] = u * m + l * y + v, r[1] = c * y + h * m + d, r[2] = u * g + l * y + v, r[3] = c * y + h * g + d, r[4] = u * g + l * _ + v, r[5] = c * _ + h * g + d, r[6] = u * m + l * _ + v, r[7] = c * _ + h * m + d;
    }, t.prototype._render = function(e) {
      this.calculateVertices(), e.batch.setObjectRenderer(e.plugins[this.pluginName]), e.plugins[this.pluginName].render(this);
    }, t.prototype._calculateBounds = function() {
      var e = this._texture.trim, r = this._texture.orig;
      !e || e.width === r.width && e.height === r.height ? (this.calculateVertices(), this._bounds.addQuad(this.vertexData)) : (this.calculateTrimmedVertices(), this._bounds.addQuad(this.vertexTrimmedData));
    }, t.prototype.getLocalBounds = function(e) {
      return this.children.length === 0 ? (this._localBounds || (this._localBounds = new Bounds()), this._localBounds.minX = this._texture.orig.width * -this._anchor._x, this._localBounds.minY = this._texture.orig.height * -this._anchor._y, this._localBounds.maxX = this._texture.orig.width * (1 - this._anchor._x), this._localBounds.maxY = this._texture.orig.height * (1 - this._anchor._y), e || (this._localBoundsRect || (this._localBoundsRect = new Rectangle()), e = this._localBoundsRect), this._localBounds.getRectangle(e)) : n.prototype.getLocalBounds.call(this, e);
    }, t.prototype.containsPoint = function(e) {
      this.worldTransform.applyInverse(e, tempPoint$2);
      var r = this._texture.orig.width, a = this._texture.orig.height, s = -r * this.anchor.x, o = 0;
      return tempPoint$2.x >= s && tempPoint$2.x < s + r && (o = -a * this.anchor.y, tempPoint$2.y >= o && tempPoint$2.y < o + a);
    }, t.prototype.destroy = function(e) {
      n.prototype.destroy.call(this, e), this._texture.off("update", this._onTextureUpdate, this), this._anchor = null;
      var r = typeof e == "boolean" ? e : e && e.texture;
      if (r) {
        var a = typeof e == "boolean" ? e : e && e.baseTexture;
        this._texture.destroy(!!a);
      }
      this._texture = null;
    }, t.from = function(e, r) {
      var a = e instanceof Texture ? e : Texture.from(e, r);
      return new t(a);
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
        var r = sign(this.scale.x) || 1;
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
        var r = sign(this.scale.y) || 1;
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
        this._texture !== e && (this._texture && this._texture.off("update", this._onTextureUpdate, this), this._texture = e || Texture.EMPTY, this._cachedTint = 16777215, this._textureID = -1, this._textureTrimmedID = -1, e && (e.baseTexture.valid ? this._onTextureUpdate() : e.once("update", this._onTextureUpdate, this)));
      },
      enumerable: !1,
      configurable: !0
    }), t;
  }(Container)
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
var extendStatics$c = function(n, t) {
  return extendStatics$c = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, r) {
    e.__proto__ = r;
  } || function(e, r) {
    for (var a in r)
      r.hasOwnProperty(a) && (e[a] = r[a]);
  }, extendStatics$c(n, t);
};
function __extends$c(n, t) {
  extendStatics$c(n, t);
  function e() {
    this.constructor = n;
  }
  n.prototype = t === null ? Object.create(t) : (e.prototype = t.prototype, new e());
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
    function n(t) {
      this.styleID = 0, this.reset(), deepCopyProperties(this, t, t);
    }
    return n.prototype.clone = function() {
      var t = {};
      return deepCopyProperties(t, this, defaultStyle), new n(t);
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
      set: function(t) {
        this._align !== t && (this._align = t, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n.prototype, "breakWords", {
      /** Indicates if lines can be wrapped within words, it needs wordWrap to be set to true. */
      get: function() {
        return this._breakWords;
      },
      set: function(t) {
        this._breakWords !== t && (this._breakWords = t, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n.prototype, "dropShadow", {
      /** Set a drop shadow for the text. */
      get: function() {
        return this._dropShadow;
      },
      set: function(t) {
        this._dropShadow !== t && (this._dropShadow = t, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n.prototype, "dropShadowAlpha", {
      /** Set alpha for the drop shadow. */
      get: function() {
        return this._dropShadowAlpha;
      },
      set: function(t) {
        this._dropShadowAlpha !== t && (this._dropShadowAlpha = t, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n.prototype, "dropShadowAngle", {
      /** Set a angle of the drop shadow. */
      get: function() {
        return this._dropShadowAngle;
      },
      set: function(t) {
        this._dropShadowAngle !== t && (this._dropShadowAngle = t, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n.prototype, "dropShadowBlur", {
      /** Set a shadow blur radius. */
      get: function() {
        return this._dropShadowBlur;
      },
      set: function(t) {
        this._dropShadowBlur !== t && (this._dropShadowBlur = t, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n.prototype, "dropShadowColor", {
      /** A fill style to be used on the dropshadow e.g 'red', '#00FF00'. */
      get: function() {
        return this._dropShadowColor;
      },
      set: function(t) {
        var e = getColor(t);
        this._dropShadowColor !== e && (this._dropShadowColor = e, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n.prototype, "dropShadowDistance", {
      /** Set a distance of the drop shadow. */
      get: function() {
        return this._dropShadowDistance;
      },
      set: function(t) {
        this._dropShadowDistance !== t && (this._dropShadowDistance = t, this.styleID++);
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
      set: function(t) {
        var e = getColor(t);
        this._fill !== e && (this._fill = e, this.styleID++);
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
      set: function(t) {
        this._fillGradientType !== t && (this._fillGradientType = t, this.styleID++);
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
      set: function(t) {
        areArraysEqual(this._fillGradientStops, t) || (this._fillGradientStops = t, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n.prototype, "fontFamily", {
      /** The font family. */
      get: function() {
        return this._fontFamily;
      },
      set: function(t) {
        this.fontFamily !== t && (this._fontFamily = t, this.styleID++);
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
      set: function(t) {
        this._fontSize !== t && (this._fontSize = t, this.styleID++);
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
      set: function(t) {
        this._fontStyle !== t && (this._fontStyle = t, this.styleID++);
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
      set: function(t) {
        this._fontVariant !== t && (this._fontVariant = t, this.styleID++);
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
      set: function(t) {
        this._fontWeight !== t && (this._fontWeight = t, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n.prototype, "letterSpacing", {
      /** The amount of spacing between letters, default is 0. */
      get: function() {
        return this._letterSpacing;
      },
      set: function(t) {
        this._letterSpacing !== t && (this._letterSpacing = t, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n.prototype, "lineHeight", {
      /** The line height, a number that represents the vertical space that a letter uses. */
      get: function() {
        return this._lineHeight;
      },
      set: function(t) {
        this._lineHeight !== t && (this._lineHeight = t, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n.prototype, "leading", {
      /** The space between lines. */
      get: function() {
        return this._leading;
      },
      set: function(t) {
        this._leading !== t && (this._leading = t, this.styleID++);
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
      set: function(t) {
        this._lineJoin !== t && (this._lineJoin = t, this.styleID++);
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
      set: function(t) {
        this._miterLimit !== t && (this._miterLimit = t, this.styleID++);
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
      set: function(t) {
        this._padding !== t && (this._padding = t, this.styleID++);
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
      set: function(t) {
        var e = getColor(t);
        this._stroke !== e && (this._stroke = e, this.styleID++);
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
      set: function(t) {
        this._strokeThickness !== t && (this._strokeThickness = t, this.styleID++);
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
      set: function(t) {
        this._textBaseline !== t && (this._textBaseline = t, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n.prototype, "trim", {
      /** Trim transparent borders. */
      get: function() {
        return this._trim;
      },
      set: function(t) {
        this._trim !== t && (this._trim = t, this.styleID++);
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
      set: function(t) {
        this._whiteSpace !== t && (this._whiteSpace = t, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n.prototype, "wordWrap", {
      /** Indicates if word wrap should be used. */
      get: function() {
        return this._wordWrap;
      },
      set: function(t) {
        this._wordWrap !== t && (this._wordWrap = t, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n.prototype, "wordWrapWidth", {
      /** The width at which text will wrap, it needs wordWrap to be set to true. */
      get: function() {
        return this._wordWrapWidth;
      },
      set: function(t) {
        this._wordWrapWidth !== t && (this._wordWrapWidth = t, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), n.prototype.toFontString = function() {
      var t = typeof this.fontSize == "number" ? this.fontSize + "px" : this.fontSize, e = this.fontFamily;
      Array.isArray(this.fontFamily) || (e = this.fontFamily.split(","));
      for (var r = e.length - 1; r >= 0; r--) {
        var a = e[r].trim();
        !/([\"\'])[^\'\"]+\1/.test(a) && genericFontFamilies.indexOf(a) < 0 && (a = '"' + a + '"'), e[r] = a;
      }
      return this.fontStyle + " " + this.fontVariant + " " + this.fontWeight + " " + t + " " + e.join(",");
    }, n;
  }()
);
function getSingleColor(n) {
  return typeof n == "number" ? hex2string(n) : (typeof n == "string" && n.indexOf("0x") === 0 && (n = n.replace("0x", "#")), n);
}
function getColor(n) {
  if (Array.isArray(n)) {
    for (var t = 0; t < n.length; ++t)
      n[t] = getSingleColor(n[t]);
    return n;
  } else
    return getSingleColor(n);
}
function areArraysEqual(n, t) {
  if (!Array.isArray(n) || !Array.isArray(t) || n.length !== t.length)
    return !1;
  for (var e = 0; e < n.length; ++e)
    if (n[e] !== t[e])
      return !1;
  return !0;
}
function deepCopyProperties(n, t, e) {
  for (var r in e)
    Array.isArray(t[r]) ? n[r] = t[r].slice() : n[r] = t[r];
}
var contextSettings = {
  // TextMetrics requires getImageData readback for measuring fonts.
  willReadFrequently: !0
}, TextMetrics = (
  /** @class */
  function() {
    function n(t, e, r, a, s, o, u, h, l) {
      this.text = t, this.style = e, this.width = r, this.height = a, this.lines = s, this.lineWidths = o, this.lineHeight = u, this.maxLineWidth = h, this.fontProperties = l;
    }
    return n.measureText = function(t, e, r, a) {
      a === void 0 && (a = n._canvas), r = r ?? e.wordWrap;
      var s = e.toFontString(), o = n.measureFont(s);
      o.fontSize === 0 && (o.fontSize = e.fontSize, o.ascent = e.fontSize);
      var u = a.getContext("2d", contextSettings);
      u.font = s;
      for (var h = r ? n.wordWrap(t, e, a) : t, l = h.split(/(?:\r\n|\r|\n)/), c = new Array(l.length), v = 0, d = 0; d < l.length; d++) {
        var m = u.measureText(l[d]).width + (l[d].length - 1) * e.letterSpacing;
        c[d] = m, v = Math.max(v, m);
      }
      var g = v + e.strokeThickness;
      e.dropShadow && (g += e.dropShadowDistance);
      var y = e.lineHeight || o.fontSize + e.strokeThickness, _ = Math.max(y, o.fontSize + e.strokeThickness) + (l.length - 1) * (y + e.leading);
      return e.dropShadow && (_ += e.dropShadowDistance), new n(t, e, g, _, l, c, y + e.leading, v, o);
    }, n.wordWrap = function(t, e, r) {
      r === void 0 && (r = n._canvas);
      for (var a = r.getContext("2d", contextSettings), s = 0, o = "", u = "", h = /* @__PURE__ */ Object.create(null), l = e.letterSpacing, c = e.whiteSpace, v = n.collapseSpaces(c), d = n.collapseNewlines(c), m = !v, g = e.wordWrapWidth + l, y = n.tokenize(t), _ = 0; _ < y.length; _++) {
        var b = y[_];
        if (n.isNewline(b)) {
          if (!d) {
            u += n.addLine(o), m = !v, o = "", s = 0;
            continue;
          }
          b = " ";
        }
        if (v) {
          var S = n.isBreakingSpace(b), P = n.isBreakingSpace(o[o.length - 1]);
          if (S && P)
            continue;
        }
        var N = n.getFromCache(b, l, h, a);
        if (N > g)
          if (o !== "" && (u += n.addLine(o), o = "", s = 0), n.canBreakWords(b, e.breakWords))
            for (var E = n.wordWrapSplit(b), M = 0; M < E.length; M++) {
              for (var T = E[M], A = 1; E[M + A]; ) {
                var L = E[M + A], B = T[T.length - 1];
                if (!n.canBreakChars(B, L, b, M, e.breakWords))
                  T += L;
                else
                  break;
                A++;
              }
              M += T.length - 1;
              var Y = n.getFromCache(T, l, h, a);
              Y + s > g && (u += n.addLine(o), m = !1, o = "", s = 0), o += T, s += Y;
            }
          else {
            o.length > 0 && (u += n.addLine(o), o = "", s = 0);
            var H = _ === y.length - 1;
            u += n.addLine(b, !H), m = !1, o = "", s = 0;
          }
        else
          N + s > g && (m = !1, u += n.addLine(o), o = "", s = 0), (o.length > 0 || !n.isBreakingSpace(b) || m) && (o += b, s += N);
      }
      return u += n.addLine(o, !1), u;
    }, n.addLine = function(t, e) {
      return e === void 0 && (e = !0), t = n.trimRight(t), t = e ? t + `
` : t, t;
    }, n.getFromCache = function(t, e, r, a) {
      var s = r[t];
      if (typeof s != "number") {
        var o = t.length * e;
        s = a.measureText(t).width + o, r[t] = s;
      }
      return s;
    }, n.collapseSpaces = function(t) {
      return t === "normal" || t === "pre-line";
    }, n.collapseNewlines = function(t) {
      return t === "normal";
    }, n.trimRight = function(t) {
      if (typeof t != "string")
        return "";
      for (var e = t.length - 1; e >= 0; e--) {
        var r = t[e];
        if (!n.isBreakingSpace(r))
          break;
        t = t.slice(0, -1);
      }
      return t;
    }, n.isNewline = function(t) {
      return typeof t != "string" ? !1 : n._newlines.indexOf(t.charCodeAt(0)) >= 0;
    }, n.isBreakingSpace = function(t, e) {
      return typeof t != "string" ? !1 : n._breakingSpaces.indexOf(t.charCodeAt(0)) >= 0;
    }, n.tokenize = function(t) {
      var e = [], r = "";
      if (typeof t != "string")
        return e;
      for (var a = 0; a < t.length; a++) {
        var s = t[a], o = t[a + 1];
        if (n.isBreakingSpace(s, o) || n.isNewline(s)) {
          r !== "" && (e.push(r), r = ""), e.push(s);
          continue;
        }
        r += s;
      }
      return r !== "" && e.push(r), e;
    }, n.canBreakWords = function(t, e) {
      return e;
    }, n.canBreakChars = function(t, e, r, a, s) {
      return !0;
    }, n.wordWrapSplit = function(t) {
      return t.split("");
    }, n.measureFont = function(t) {
      if (n._fonts[t])
        return n._fonts[t];
      var e = {
        ascent: 0,
        descent: 0,
        fontSize: 0
      }, r = n._canvas, a = n._context;
      a.font = t;
      var s = n.METRICS_STRING + n.BASELINE_SYMBOL, o = Math.ceil(a.measureText(s).width), u = Math.ceil(a.measureText(n.BASELINE_SYMBOL).width), h = Math.ceil(n.HEIGHT_MULTIPLIER * u);
      u = u * n.BASELINE_MULTIPLIER | 0, r.width = o, r.height = h, a.fillStyle = "#f00", a.fillRect(0, 0, o, h), a.font = t, a.textBaseline = "alphabetic", a.fillStyle = "#000", a.fillText(s, 0, u);
      var l = a.getImageData(0, 0, o, h).data, c = l.length, v = o * 4, d = 0, m = 0, g = !1;
      for (d = 0; d < u; ++d) {
        for (var y = 0; y < v; y += 4)
          if (l[m + y] !== 255) {
            g = !0;
            break;
          }
        if (!g)
          m += v;
        else
          break;
      }
      for (e.ascent = u - d, m = c - v, g = !1, d = h; d > u; --d) {
        for (var y = 0; y < v; y += 4)
          if (l[m + y] !== 255) {
            g = !0;
            break;
          }
        if (!g)
          m -= v;
        else
          break;
      }
      return e.descent = d - u, e.fontSize = e.ascent + e.descent, n._fonts[t] = e, e;
    }, n.clearMetrics = function(t) {
      t === void 0 && (t = ""), t ? delete n._fonts[t] : n._fonts = {};
    }, Object.defineProperty(n, "_canvas", {
      /**
       * Cached canvas element for measuring text
       * TODO: this should be private, but isn't because of backward compat, will fix later.
       * @ignore
       */
      get: function() {
        if (!n.__canvas) {
          var t = void 0;
          try {
            var e = new OffscreenCanvas(0, 0), r = e.getContext("2d", contextSettings);
            if (r && r.measureText)
              return n.__canvas = e, e;
            t = settings.ADAPTER.createCanvas();
          } catch {
            t = settings.ADAPTER.createCanvas();
          }
          t.width = t.height = 10, n.__canvas = t;
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
    __extends$c(t, n);
    function t(e, r, a) {
      var s = this, o = !1;
      a || (a = settings.ADAPTER.createCanvas(), o = !0), a.width = 3, a.height = 3;
      var u = Texture.from(a);
      return u.orig = new Rectangle(), u.trim = new Rectangle(), s = n.call(this, u) || this, s._ownCanvas = o, s.canvas = a, s.context = a.getContext("2d", {
        // required for trimming to work without warnings
        willReadFrequently: !0
      }), s._resolution = settings.RESOLUTION, s._autoResolution = !0, s._text = null, s._style = null, s._styleListener = null, s._font = "", s.text = e, s.style = r, s.localStyleID = -1, s;
    }
    return t.prototype.updateText = function(e) {
      var r = this._style;
      if (this.localStyleID !== r.styleID && (this.dirty = !0, this.localStyleID = r.styleID), !(!this.dirty && e)) {
        this._font = this._style.toFontString();
        var a = this.context, s = TextMetrics.measureText(this._text || " ", this._style, this._style.wordWrap, this.canvas), o = s.width, u = s.height, h = s.lines, l = s.lineHeight, c = s.lineWidths, v = s.maxLineWidth, d = s.fontProperties;
        this.canvas.width = Math.ceil(Math.ceil(Math.max(1, o) + r.padding * 2) * this._resolution), this.canvas.height = Math.ceil(Math.ceil(Math.max(1, u) + r.padding * 2) * this._resolution), a.scale(this._resolution, this._resolution), a.clearRect(0, 0, this.canvas.width, this.canvas.height), a.font = this._font, a.lineWidth = r.strokeThickness, a.textBaseline = r.textBaseline, a.lineJoin = r.lineJoin, a.miterLimit = r.miterLimit;
        for (var m, g, y = r.dropShadow ? 2 : 1, _ = 0; _ < y; ++_) {
          var b = r.dropShadow && _ === 0, S = b ? Math.ceil(Math.max(1, u) + r.padding * 2) : 0, P = S * this._resolution;
          if (b) {
            a.fillStyle = "black", a.strokeStyle = "black";
            var N = r.dropShadowColor, E = hex2rgb(typeof N == "number" ? N : string2hex(N)), M = r.dropShadowBlur * this._resolution, T = r.dropShadowDistance * this._resolution;
            a.shadowColor = "rgba(" + E[0] * 255 + "," + E[1] * 255 + "," + E[2] * 255 + "," + r.dropShadowAlpha + ")", a.shadowBlur = M, a.shadowOffsetX = Math.cos(r.dropShadowAngle) * T, a.shadowOffsetY = Math.sin(r.dropShadowAngle) * T + P;
          } else
            a.fillStyle = this._generateFillStyle(r, h, s), a.strokeStyle = r.stroke, a.shadowColor = "black", a.shadowBlur = 0, a.shadowOffsetX = 0, a.shadowOffsetY = 0;
          var A = (l - d.fontSize) / 2;
          (!t.nextLineHeightBehavior || l - d.fontSize < 0) && (A = 0);
          for (var L = 0; L < h.length; L++)
            m = r.strokeThickness / 2, g = r.strokeThickness / 2 + L * l + d.ascent + A, r.align === "right" ? m += v - c[L] : r.align === "center" && (m += (v - c[L]) / 2), r.stroke && r.strokeThickness && this.drawLetterSpacing(h[L], m + r.padding, g + r.padding - S, !0), r.fill && this.drawLetterSpacing(h[L], m + r.padding, g + r.padding - S);
        }
        this.updateTexture();
      }
    }, t.prototype.drawLetterSpacing = function(e, r, a, s) {
      s === void 0 && (s = !1);
      var o = this._style, u = o.letterSpacing, h = t.experimentalLetterSpacing && ("letterSpacing" in CanvasRenderingContext2D.prototype || "textLetterSpacing" in CanvasRenderingContext2D.prototype);
      if (u === 0 || h) {
        h && (this.context.letterSpacing = u, this.context.textLetterSpacing = u), s ? this.context.strokeText(e, r, a) : this.context.fillText(e, r, a);
        return;
      }
      for (var l = r, c = Array.from ? Array.from(e) : e.split(""), v = this.context.measureText(e).width, d = 0, m = 0; m < c.length; ++m) {
        var g = c[m];
        s ? this.context.strokeText(g, l, a) : this.context.fillText(g, l, a);
        for (var y = "", _ = m + 1; _ < c.length; ++_)
          y += c[_];
        d = this.context.measureText(y).width, l += v - d + u, v = d;
      }
    }, t.prototype.updateTexture = function() {
      var e = this.canvas;
      if (this._style.trim) {
        var r = trimCanvas(e);
        r.data && (e.width = r.width, e.height = r.height, this.context.putImageData(r.data, 0, 0));
      }
      var a = this._texture, s = this._style, o = s.trim ? 0 : s.padding, u = a.baseTexture;
      a.trim.width = a._frame.width = e.width / this._resolution, a.trim.height = a._frame.height = e.height / this._resolution, a.trim.x = -o, a.trim.y = -o, a.orig.width = a._frame.width - o * 2, a.orig.height = a._frame.height - o * 2, this._onTextureUpdate(), u.setRealSize(e.width, e.height, this._resolution), a.updateUvs(), this.dirty = !1;
    }, t.prototype._render = function(e) {
      this._autoResolution && this._resolution !== e.resolution && (this._resolution = e.resolution, this.dirty = !0), this.updateText(!0), n.prototype._render.call(this, e);
    }, t.prototype.updateTransform = function() {
      this.updateText(!0), n.prototype.updateTransform.call(this);
    }, t.prototype.getBounds = function(e, r) {
      return this.updateText(!0), this._textureID === -1 && (e = !1), n.prototype.getBounds.call(this, e, r);
    }, t.prototype.getLocalBounds = function(e) {
      return this.updateText(!0), n.prototype.getLocalBounds.call(this, e);
    }, t.prototype._calculateBounds = function() {
      this.calculateVertices(), this._bounds.addQuad(this.vertexData);
    }, t.prototype._generateFillStyle = function(e, r, a) {
      var s = e.fill;
      if (Array.isArray(s)) {
        if (s.length === 1)
          return s[0];
      } else return s;
      var o, u = e.dropShadow ? e.dropShadowDistance : 0, h = e.padding || 0, l = this.canvas.width / this._resolution - u - h * 2, c = this.canvas.height / this._resolution - u - h * 2, v = s.slice(), d = e.fillGradientStops.slice();
      if (!d.length)
        for (var m = v.length + 1, g = 1; g < m; ++g)
          d.push(g / m);
      if (v.unshift(s[0]), d.unshift(0), v.push(s[s.length - 1]), d.push(1), e.fillGradientType === TEXT_GRADIENT.LINEAR_VERTICAL) {
        o = this.context.createLinearGradient(l / 2, h, l / 2, c + h);
        for (var y = a.fontProperties.fontSize + e.strokeThickness, g = 0; g < r.length; g++) {
          var _ = a.lineHeight * (g - 1) + y, b = a.lineHeight * g, S = b;
          g > 0 && _ > b && (S = (b + _) / 2);
          var P = b + y, N = a.lineHeight * (g + 1), E = P;
          g + 1 < r.length && N < P && (E = (P + N) / 2);
          for (var M = (E - S) / c, T = 0; T < v.length; T++) {
            var A = 0;
            typeof d[T] == "number" ? A = d[T] : A = T / v.length;
            var L = Math.min(1, Math.max(0, S / c + A * M));
            L = Number(L.toFixed(5)), o.addColorStop(L, v[T]);
          }
        }
      } else {
        o = this.context.createLinearGradient(h, c / 2, l + h, c / 2);
        for (var B = v.length + 1, Y = 1, g = 0; g < v.length; g++) {
          var H = void 0;
          typeof d[g] == "number" ? H = d[g] : H = Y / B, o.addColorStop(H, v[g]), Y++;
        }
      }
      return o;
    }, t.prototype.destroy = function(e) {
      typeof e == "boolean" && (e = { children: e }), e = Object.assign({}, defaultDestroyOptions, e), n.prototype.destroy.call(this, e), this._ownCanvas && (this.canvas.height = this.canvas.width = 0), this.context = null, this.canvas = null, this._style = null;
    }, Object.defineProperty(t.prototype, "width", {
      /** The width of the Text, setting this will actually modify the scale to achieve the value set. */
      get: function() {
        return this.updateText(!0), Math.abs(this.scale.x) * this._texture.orig.width;
      },
      set: function(e) {
        this.updateText(!0);
        var r = sign(this.scale.x) || 1;
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
        var r = sign(this.scale.y) || 1;
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
        e = e || {}, e instanceof TextStyle ? this._style = e : this._style = new TextStyle(e), this.localStyleID = -1, this.dirty = !0;
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
  }(Sprite)
);
/*!
 * @pixi/prepare - v6.5.10
 * Compiled Thu, 06 Jul 2023 15:25:11 UTC
 *
 * @pixi/prepare is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
settings.UPLOADS_PER_FRAME = 4;
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
var extendStatics$b = function(n, t) {
  return extendStatics$b = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, r) {
    e.__proto__ = r;
  } || function(e, r) {
    for (var a in r)
      r.hasOwnProperty(a) && (e[a] = r[a]);
  }, extendStatics$b(n, t);
};
function __extends$b(n, t) {
  extendStatics$b(n, t);
  function e() {
    this.constructor = n;
  }
  n.prototype = t === null ? Object.create(t) : (e.prototype = t.prototype, new e());
}
var CountLimiter = (
  /** @class */
  function() {
    function n(t) {
      this.maxItemsPerFrame = t, this.itemsLeft = 0;
    }
    return n.prototype.beginFrame = function() {
      this.itemsLeft = this.maxItemsPerFrame;
    }, n.prototype.allowedToUpload = function() {
      return this.itemsLeft-- > 0;
    }, n;
  }()
);
function findMultipleBaseTextures(n, t) {
  var e = !1;
  if (n && n._textures && n._textures.length) {
    for (var r = 0; r < n._textures.length; r++)
      if (n._textures[r] instanceof Texture) {
        var a = n._textures[r].baseTexture;
        t.indexOf(a) === -1 && (t.push(a), e = !0);
      }
  }
  return e;
}
function findBaseTexture(n, t) {
  if (n.baseTexture instanceof BaseTexture) {
    var e = n.baseTexture;
    return t.indexOf(e) === -1 && t.push(e), !0;
  }
  return !1;
}
function findTexture(n, t) {
  if (n._texture && n._texture instanceof Texture) {
    var e = n._texture.baseTexture;
    return t.indexOf(e) === -1 && t.push(e), !0;
  }
  return !1;
}
function drawText(n, t) {
  return t instanceof Text ? (t.updateText(!0), !0) : !1;
}
function calculateTextStyle(n, t) {
  if (t instanceof TextStyle) {
    var e = t.toFontString();
    return TextMetrics.measureFont(e), !0;
  }
  return !1;
}
function findText(n, t) {
  if (n instanceof Text) {
    t.indexOf(n.style) === -1 && t.push(n.style), t.indexOf(n) === -1 && t.push(n);
    var e = n._texture.baseTexture;
    return t.indexOf(e) === -1 && t.push(e), !0;
  }
  return !1;
}
function findTextStyle(n, t) {
  return n instanceof TextStyle ? (t.indexOf(n) === -1 && t.push(n), !0) : !1;
}
var BasePrepare = (
  /** @class */
  function() {
    function n(t) {
      var e = this;
      this.limiter = new CountLimiter(settings.UPLOADS_PER_FRAME), this.renderer = t, this.uploadHookHelper = null, this.queue = [], this.addHooks = [], this.uploadHooks = [], this.completes = [], this.ticking = !1, this.delayedTick = function() {
        e.queue && e.prepareItems();
      }, this.registerFindHook(findText), this.registerFindHook(findTextStyle), this.registerFindHook(findMultipleBaseTextures), this.registerFindHook(findBaseTexture), this.registerFindHook(findTexture), this.registerUploadHook(drawText), this.registerUploadHook(calculateTextStyle);
    }
    return n.prototype.upload = function(t, e) {
      var r = this;
      return typeof t == "function" && (e = t, t = null), e && deprecation("6.5.0", "BasePrepare.upload callback is deprecated, use the return Promise instead."), new Promise(function(a) {
        t && r.add(t);
        var s = function() {
          e?.(), a();
        };
        r.queue.length ? (r.completes.push(s), r.ticking || (r.ticking = !0, Ticker.system.addOnce(r.tick, r, UPDATE_PRIORITY.UTILITY))) : s();
      });
    }, n.prototype.tick = function() {
      setTimeout(this.delayedTick, 0);
    }, n.prototype.prepareItems = function() {
      for (this.limiter.beginFrame(); this.queue.length && this.limiter.allowedToUpload(); ) {
        var t = this.queue[0], e = !1;
        if (t && !t._destroyed) {
          for (var r = 0, a = this.uploadHooks.length; r < a; r++)
            if (this.uploadHooks[r](this.uploadHookHelper, t)) {
              this.queue.shift(), e = !0;
              break;
            }
        }
        e || this.queue.shift();
      }
      if (this.queue.length)
        Ticker.system.addOnce(this.tick, this, UPDATE_PRIORITY.UTILITY);
      else {
        this.ticking = !1;
        var s = this.completes.slice(0);
        this.completes.length = 0;
        for (var r = 0, a = s.length; r < a; r++)
          s[r]();
      }
    }, n.prototype.registerFindHook = function(t) {
      return t && this.addHooks.push(t), this;
    }, n.prototype.registerUploadHook = function(t) {
      return t && this.uploadHooks.push(t), this;
    }, n.prototype.add = function(t) {
      for (var e = 0, r = this.addHooks.length; e < r && !this.addHooks[e](t, this.queue); e++)
        ;
      if (t instanceof Container)
        for (var e = t.children.length - 1; e >= 0; e--)
          this.add(t.children[e]);
      return this;
    }, n.prototype.destroy = function() {
      this.ticking && Ticker.system.remove(this.tick, this), this.ticking = !1, this.addHooks = null, this.uploadHooks = null, this.renderer = null, this.completes = null, this.queue = null, this.limiter = null, this.uploadHookHelper = null;
    }, n;
  }()
);
function uploadBaseTextures(n, t) {
  return t instanceof BaseTexture ? (t._glTextures[n.CONTEXT_UID] || n.texture.bind(t), !0) : !1;
}
function uploadGraphics(n, t) {
  if (!(t instanceof Graphics))
    return !1;
  var e = t.geometry;
  t.finishPoly(), e.updateBatches();
  for (var r = e.batches, a = 0; a < r.length; a++) {
    var s = r[a].style.texture;
    s && uploadBaseTextures(n, s.baseTexture);
  }
  return e.batchable || n.geometry.bind(e, t._resolveDirectShader(n)), !0;
}
function findGraphics(n, t) {
  return n instanceof Graphics ? (t.push(n), !0) : !1;
}
var Prepare = (
  /** @class */
  function(n) {
    __extends$b(t, n);
    function t(e) {
      var r = n.call(this, e) || this;
      return r.uploadHookHelper = r.renderer, r.registerFindHook(findGraphics), r.registerUploadHook(uploadBaseTextures), r.registerUploadHook(uploadGraphics), r;
    }
    return t.extension = {
      name: "prepare",
      type: ExtensionType.RendererPlugin
    }, t;
  }(BasePrepare)
);
/*!
 * @pixi/spritesheet - v6.5.10
 * Compiled Thu, 06 Jul 2023 15:25:11 UTC
 *
 * @pixi/spritesheet is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
var Spritesheet = (
  /** @class */
  function() {
    function n(t, e, r) {
      r === void 0 && (r = null), this.linkedSheets = [], this._texture = t instanceof Texture ? t : null, this.baseTexture = t instanceof BaseTexture ? t : this._texture.baseTexture, this.textures = {}, this.animations = {}, this.data = e;
      var a = this.baseTexture.resource;
      this.resolution = this._updateResolution(r || (a ? a.url : null)), this._frames = this.data.frames, this._frameKeys = Object.keys(this._frames), this._batchIndex = 0, this._callback = null;
    }
    return n.prototype._updateResolution = function(t) {
      t === void 0 && (t = null);
      var e = this.data.meta.scale, r = getResolutionOfUrl(t, null);
      return r === null && (r = e !== void 0 ? parseFloat(e) : 1), r !== 1 && this.baseTexture.setResolution(r), r;
    }, n.prototype.parse = function(t) {
      var e = this;
      return t && deprecation("6.5.0", "Spritesheet.parse callback is deprecated, use the return Promise instead."), new Promise(function(r) {
        e._callback = function(a) {
          t?.(a), r(a);
        }, e._batchIndex = 0, e._frameKeys.length <= n.BATCH_SIZE ? (e._processFrames(0), e._processAnimations(), e._parseComplete()) : e._nextBatch();
      });
    }, n.prototype._processFrames = function(t) {
      for (var e = t, r = n.BATCH_SIZE; e - t < r && e < this._frameKeys.length; ) {
        var a = this._frameKeys[e], s = this._frames[a], o = s.frame;
        if (o) {
          var u = null, h = null, l = s.trimmed !== !1 && s.sourceSize ? s.sourceSize : s.frame, c = new Rectangle(0, 0, Math.floor(l.w) / this.resolution, Math.floor(l.h) / this.resolution);
          s.rotated ? u = new Rectangle(Math.floor(o.x) / this.resolution, Math.floor(o.y) / this.resolution, Math.floor(o.h) / this.resolution, Math.floor(o.w) / this.resolution) : u = new Rectangle(Math.floor(o.x) / this.resolution, Math.floor(o.y) / this.resolution, Math.floor(o.w) / this.resolution, Math.floor(o.h) / this.resolution), s.trimmed !== !1 && s.spriteSourceSize && (h = new Rectangle(Math.floor(s.spriteSourceSize.x) / this.resolution, Math.floor(s.spriteSourceSize.y) / this.resolution, Math.floor(o.w) / this.resolution, Math.floor(o.h) / this.resolution)), this.textures[a] = new Texture(this.baseTexture, u, c, h, s.rotated ? 2 : 0, s.anchor), Texture.addToCache(this.textures[a], a);
        }
        e++;
      }
    }, n.prototype._processAnimations = function() {
      var t = this.data.animations || {};
      for (var e in t) {
        this.animations[e] = [];
        for (var r = 0; r < t[e].length; r++) {
          var a = t[e][r];
          this.animations[e].push(this.textures[a]);
        }
      }
    }, n.prototype._parseComplete = function() {
      var t = this._callback;
      this._callback = null, this._batchIndex = 0, t.call(this, this.textures);
    }, n.prototype._nextBatch = function() {
      var t = this;
      this._processFrames(this._batchIndex * n.BATCH_SIZE), this._batchIndex++, setTimeout(function() {
        t._batchIndex * n.BATCH_SIZE < t._frameKeys.length ? t._nextBatch() : (t._processAnimations(), t._parseComplete());
      }, 0);
    }, n.prototype.destroy = function(t) {
      var e;
      t === void 0 && (t = !1);
      for (var r in this.textures)
        this.textures[r].destroy();
      this._frames = null, this._frameKeys = null, this.data = null, this.textures = null, t && ((e = this._texture) === null || e === void 0 || e.destroy(), this.baseTexture.destroy()), this._texture = null, this.baseTexture = null, this.linkedSheets = [];
    }, n.BATCH_SIZE = 1e3, n;
  }()
), SpritesheetLoader = (
  /** @class */
  function() {
    function n() {
    }
    return n.use = function(t, e) {
      var r, a, s = this, o = t.name + "_image";
      if (!t.data || t.type !== LoaderResource.TYPE.JSON || !t.data.frames || s.resources[o]) {
        e();
        return;
      }
      var u = (a = (r = t.data) === null || r === void 0 ? void 0 : r.meta) === null || a === void 0 ? void 0 : a.related_multi_packs;
      if (Array.isArray(u))
        for (var h = function(g) {
          if (typeof g != "string")
            return "continue";
          var y = g.replace(".json", ""), _ = url$1.resolve(t.url.replace(s.baseUrl, ""), g);
          if (s.resources[y] || Object.values(s.resources).some(function(S) {
            return url$1.format(url$1.parse(S.url)) === _;
          }))
            return "continue";
          var b = {
            crossOrigin: t.crossOrigin,
            loadType: LoaderResource.LOAD_TYPE.XHR,
            xhrType: LoaderResource.XHR_RESPONSE_TYPE.JSON,
            parentResource: t,
            metadata: t.metadata
          };
          s.add(y, _, b);
        }, l = 0, c = u; l < c.length; l++) {
          var v = c[l];
          h(v);
        }
      var d = {
        crossOrigin: t.crossOrigin,
        metadata: t.metadata.imageMetadata,
        parentResource: t
      }, m = n.getResourcePath(t, s.baseUrl);
      s.add(o, m, d, function(y) {
        if (y.error) {
          e(y.error);
          return;
        }
        var _ = new Spritesheet(y.texture, t.data, t.url);
        _.parse().then(function() {
          t.spritesheet = _, t.textures = _.textures, e();
        });
      });
    }, n.getResourcePath = function(t, e) {
      return t.isDataUrl ? t.data.meta.image : url$1.resolve(t.url.replace(e, ""), t.data.meta.image);
    }, n.extension = ExtensionType.Loader, n;
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
var extendStatics$a = function(n, t) {
  return extendStatics$a = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, r) {
    e.__proto__ = r;
  } || function(e, r) {
    for (var a in r)
      r.hasOwnProperty(a) && (e[a] = r[a]);
  }, extendStatics$a(n, t);
};
function __extends$a(n, t) {
  extendStatics$a(n, t);
  function e() {
    this.constructor = n;
  }
  n.prototype = t === null ? Object.create(t) : (e.prototype = t.prototype, new e());
}
var tempPoint$1 = new Point();
(function(n) {
  __extends$a(t, n);
  function t(e, r, a) {
    r === void 0 && (r = 100), a === void 0 && (a = 100);
    var s = n.call(this, e) || this;
    return s.tileTransform = new Transform(), s._width = r, s._height = a, s.uvMatrix = s.texture.uvMatrix || new TextureMatrix(e), s.pluginName = "tilingSprite", s.uvRespectAnchor = !1, s;
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
    var e = this._width * -this._anchor._x, r = this._height * -this._anchor._y, a = this._width * (1 - this._anchor._x), s = this._height * (1 - this._anchor._y);
    this._bounds.addFrame(this.transform, e, r, a, s);
  }, t.prototype.getLocalBounds = function(e) {
    return this.children.length === 0 ? (this._bounds.minX = this._width * -this._anchor._x, this._bounds.minY = this._height * -this._anchor._y, this._bounds.maxX = this._width * (1 - this._anchor._x), this._bounds.maxY = this._height * (1 - this._anchor._y), e || (this._localBoundsRect || (this._localBoundsRect = new Rectangle()), e = this._localBoundsRect), this._bounds.getRectangle(e)) : n.prototype.getLocalBounds.call(this, e);
  }, t.prototype.containsPoint = function(e) {
    this.worldTransform.applyInverse(e, tempPoint$1);
    var r = this._width, a = this._height, s = -r * this.anchor._x;
    if (tempPoint$1.x >= s && tempPoint$1.x < s + r) {
      var o = -a * this.anchor._y;
      if (tempPoint$1.y >= o && tempPoint$1.y < o + a)
        return !0;
    }
    return !1;
  }, t.prototype.destroy = function(e) {
    n.prototype.destroy.call(this, e), this.tileTransform = null, this.uvMatrix = null;
  }, t.from = function(e, r) {
    var a = e instanceof Texture ? e : Texture.from(e, r);
    return new t(a, r.width, r.height);
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
    __extends$a(t, n);
    function t(e) {
      var r = n.call(this, e) || this;
      return e.runners.contextChange.add(r), r.quad = new QuadUv(), r.state = State.for2d(), r;
    }
    return t.prototype.contextChange = function() {
      var e = this.renderer, r = { globals: e.globalUniforms };
      this.simpleShader = Shader.from(gl1VertexSrc, fragmentSimpleSrc, r), this.shader = e.context.webGLVersion > 1 ? Shader.from(gl2VertexSrc, gl2FragmentSrc, r) : Shader.from(gl1VertexSrc, gl1FragmentSrc, r);
    }, t.prototype.render = function(e) {
      var r = this.renderer, a = this.quad, s = a.vertices;
      s[0] = s[6] = e._width * -e.anchor.x, s[1] = s[3] = e._height * -e.anchor.y, s[2] = s[4] = e._width * (1 - e.anchor.x), s[5] = s[7] = e._height * (1 - e.anchor.y);
      var o = e.uvRespectAnchor ? e.anchor.x : 0, u = e.uvRespectAnchor ? e.anchor.y : 0;
      s = a.uvs, s[0] = s[6] = -o, s[1] = s[3] = -u, s[2] = s[4] = 1 - o, s[5] = s[7] = 1 - u, a.invalidate();
      var h = e._texture, l = h.baseTexture, c = l.alphaMode > 0, v = e.tileTransform.localTransform, d = e.uvMatrix, m = l.isPowerOfTwo && h.frame.width === l.width && h.frame.height === l.height;
      m && (l._glTextures[r.CONTEXT_UID] ? m = l.wrapMode !== WRAP_MODES.CLAMP : l.wrapMode === WRAP_MODES.CLAMP && (l.wrapMode = WRAP_MODES.REPEAT));
      var g = m ? this.simpleShader : this.shader, y = h.width, _ = h.height, b = e._width, S = e._height;
      tempMat.set(v.a * y / b, v.b * y / S, v.c * _ / b, v.d * _ / S, v.tx / b, v.ty / S), tempMat.invert(), m ? tempMat.prepend(d.mapCoord) : (g.uniforms.uMapCoord = d.mapCoord.toArray(!0), g.uniforms.uClampFrame = d.uClampFrame, g.uniforms.uClampOffset = d.uClampOffset), g.uniforms.uTransform = tempMat.toArray(!0), g.uniforms.uColor = premultiplyTintToRgba(e.tint, e.worldAlpha, g.uniforms.uColor, c), g.uniforms.translationMatrix = e.transform.worldTransform.toArray(!0), g.uniforms.uSampler = h, r.shader.bind(g), r.geometry.bind(a), this.state.blendMode = correctBlendMode(e.blendMode, c), r.state.set(this.state), r.geometry.draw(this.renderer.gl.TRIANGLES, 6, 0);
    }, t.extension = {
      name: "tilingSprite",
      type: ExtensionType.RendererPlugin
    }, t;
  }(ObjectRenderer)
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
var extendStatics$9 = function(n, t) {
  return extendStatics$9 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, r) {
    e.__proto__ = r;
  } || function(e, r) {
    for (var a in r)
      r.hasOwnProperty(a) && (e[a] = r[a]);
  }, extendStatics$9(n, t);
};
function __extends$9(n, t) {
  extendStatics$9(n, t);
  function e() {
    this.constructor = n;
  }
  n.prototype = t === null ? Object.create(t) : (e.prototype = t.prototype, new e());
}
var MeshBatchUvs = (
  /** @class */
  function() {
    function n(t, e) {
      this.uvBuffer = t, this.uvMatrix = e, this.data = null, this._bufferUpdateId = -1, this._textureUpdateId = -1, this._updateID = 0;
    }
    return n.prototype.update = function(t) {
      if (!(!t && this._bufferUpdateId === this.uvBuffer._updateID && this._textureUpdateId === this.uvMatrix._updateID)) {
        this._bufferUpdateId = this.uvBuffer._updateID, this._textureUpdateId = this.uvMatrix._updateID;
        var e = this.uvBuffer.data;
        (!this.data || this.data.length !== e.length) && (this.data = new Float32Array(e.length)), this.uvMatrix.multiplyUvs(e, this.data), this._updateID++;
      }
    }, n;
  }()
), tempPoint = new Point(), tempPolygon = new Polygon(), Mesh = (
  /** @class */
  function(n) {
    __extends$9(t, n);
    function t(e, r, a, s) {
      s === void 0 && (s = DRAW_MODES.TRIANGLES);
      var o = n.call(this) || this;
      return o.geometry = e, o.shader = r, o.state = a || State.for2d(), o.drawMode = s, o.start = 0, o.size = 0, o.uvs = null, o.indices = null, o.vertexData = new Float32Array(1), o.vertexDirty = -1, o._transformID = -1, o._roundPixels = settings.ROUND_PIXELS, o.batchUvs = null, o;
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
      var r = this.geometry.buffers[0].data, a = this.shader;
      a.batchable && this.drawMode === DRAW_MODES.TRIANGLES && r.length < t.BATCHABLE_SIZE * 2 ? this._renderToBatch(e) : this._renderDefault(e);
    }, t.prototype._renderDefault = function(e) {
      var r = this.shader;
      r.alpha = this.worldAlpha, r.update && r.update(), e.batch.flush(), r.uniforms.translationMatrix = this.transform.worldTransform.toArray(!0), e.shader.bind(r), e.state.set(this.state), e.geometry.bind(this.geometry, r), e.geometry.draw(this.drawMode, this.size, this.start, this.geometry.instanceCount);
    }, t.prototype._renderToBatch = function(e) {
      var r = this.geometry, a = this.shader;
      a.uvMatrix && (a.uvMatrix.update(), this.calculateUvs()), this.calculateVertices(), this.indices = r.indexBuffer.data, this._tintRGB = a._tintRGB, this._texture = a.texture;
      var s = this.material.pluginName;
      e.batch.setObjectRenderer(e.plugins[s]), e.plugins[s].render(this);
    }, t.prototype.calculateVertices = function() {
      var e = this.geometry, r = e.buffers[0], a = r.data, s = r._updateID;
      if (!(s === this.vertexDirty && this._transformID === this.transform._worldID)) {
        this._transformID = this.transform._worldID, this.vertexData.length !== a.length && (this.vertexData = new Float32Array(a.length));
        for (var o = this.transform.worldTransform, u = o.a, h = o.b, l = o.c, c = o.d, v = o.tx, d = o.ty, m = this.vertexData, g = 0; g < m.length / 2; g++) {
          var y = a[g * 2], _ = a[g * 2 + 1];
          m[g * 2] = u * y + l * _ + v, m[g * 2 + 1] = h * y + c * _ + d;
        }
        if (this._roundPixels)
          for (var b = settings.RESOLUTION, g = 0; g < m.length; ++g)
            m[g] = Math.round((m[g] * b | 0) / b);
        this.vertexDirty = s;
      }
    }, t.prototype.calculateUvs = function() {
      var e = this.geometry.buffers[1], r = this.shader;
      r.uvMatrix.isSimple ? this.uvs = e.data : (this.batchUvs || (this.batchUvs = new MeshBatchUvs(e, r.uvMatrix)), this.batchUvs.update(), this.uvs = this.batchUvs.data);
    }, t.prototype._calculateBounds = function() {
      this.calculateVertices(), this._bounds.addVertexData(this.vertexData, 0, this.vertexData.length);
    }, t.prototype.containsPoint = function(e) {
      if (!this.getBounds().contains(e.x, e.y))
        return !1;
      this.worldTransform.applyInverse(e, tempPoint);
      for (var r = this.geometry.getBuffer("aVertexPosition").data, a = tempPolygon.points, s = this.geometry.getIndex().data, o = s.length, u = this.drawMode === 4 ? 3 : 1, h = 0; h + 2 < o; h += u) {
        var l = s[h] * 2, c = s[h + 1] * 2, v = s[h + 2] * 2;
        if (a[0] = r[l], a[1] = r[l + 1], a[2] = r[c], a[3] = r[c + 1], a[4] = r[v], a[5] = r[v + 1], tempPolygon.contains(tempPoint.x, tempPoint.y))
          return !0;
      }
      return !1;
    }, t.prototype.destroy = function(e) {
      n.prototype.destroy.call(this, e), this._cachedTexture && (this._cachedTexture.destroy(), this._cachedTexture = null), this.geometry = null, this.shader = null, this.state = null, this.uvs = null, this.indices = null, this.vertexData = null;
    }, t.BATCHABLE_SIZE = 100, t;
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
    __extends$9(t, n);
    function t(e, r) {
      var a = this, s = {
        uSampler: e,
        alpha: 1,
        uTextureMatrix: Matrix.IDENTITY,
        uColor: new Float32Array([1, 1, 1, 1])
      };
      return r = Object.assign({
        tint: 16777215,
        alpha: 1,
        pluginName: "batch"
      }, r), r.uniforms && Object.assign(s, r.uniforms), a = n.call(this, r.program || Program.from(vertex$2, fragment$5), s) || this, a._colorDirty = !1, a.uvMatrix = new TextureMatrix(e), a.batchable = r.program === void 0, a.pluginName = r.pluginName, a.tint = r.tint, a.alpha = r.alpha, a;
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
        premultiplyTintToRgba(this._tint, this._alpha, this.uniforms.uColor, e.alphaMode);
      }
      this.uvMatrix.update() && (this.uniforms.uTextureMatrix = this.uvMatrix.mapCoord);
    }, t;
  }(Shader)
), MeshGeometry = (
  /** @class */
  function(n) {
    __extends$9(t, n);
    function t(e, r, a) {
      var s = n.call(this) || this, o = new Buffer(e), u = new Buffer(r, !0), h = new Buffer(a, !0, !0);
      return s.addAttribute("aVertexPosition", o, 2, !1, TYPES.FLOAT).addAttribute("aTextureCoord", u, 2, !1, TYPES.FLOAT).addIndex(h), s._updateId = -1, s;
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
  }(Geometry)
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
var extendStatics$8 = function(n, t) {
  return extendStatics$8 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, r) {
    e.__proto__ = r;
  } || function(e, r) {
    for (var a in r)
      r.hasOwnProperty(a) && (e[a] = r[a]);
  }, extendStatics$8(n, t);
};
function __extends$8(n, t) {
  extendStatics$8(n, t);
  function e() {
    this.constructor = n;
  }
  n.prototype = t === null ? Object.create(t) : (e.prototype = t.prototype, new e());
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
    return n.test = function(t) {
      return typeof t == "string" && t.indexOf("info face=") === 0;
    }, n.parse = function(t) {
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
      for (var a in e) {
        var s = e[a].match(/^[a-z]+/gm)[0], o = e[a].match(/[a-zA-Z]+=([^\s"']+|"([^"]*)")/gm), u = {};
        for (var h in o) {
          var l = o[h].split("="), c = l[0], v = l[1].replace(/"/gm, ""), d = parseFloat(v), m = isNaN(d) ? v : d;
          u[c] = m;
        }
        r[s].push(u);
      }
      var g = new BitmapFontData();
      return r.info.forEach(function(y) {
        return g.info.push({
          face: y.face,
          size: parseInt(y.size, 10)
        });
      }), r.common.forEach(function(y) {
        return g.common.push({
          lineHeight: parseInt(y.lineHeight, 10)
        });
      }), r.page.forEach(function(y) {
        return g.page.push({
          id: parseInt(y.id, 10),
          file: y.file
        });
      }), r.char.forEach(function(y) {
        return g.char.push({
          id: parseInt(y.id, 10),
          page: parseInt(y.page, 10),
          x: parseInt(y.x, 10),
          y: parseInt(y.y, 10),
          width: parseInt(y.width, 10),
          height: parseInt(y.height, 10),
          xoffset: parseInt(y.xoffset, 10),
          yoffset: parseInt(y.yoffset, 10),
          xadvance: parseInt(y.xadvance, 10)
        });
      }), r.kerning.forEach(function(y) {
        return g.kerning.push({
          first: parseInt(y.first, 10),
          second: parseInt(y.second, 10),
          amount: parseInt(y.amount, 10)
        });
      }), r.distanceField.forEach(function(y) {
        return g.distanceField.push({
          distanceRange: parseInt(y.distanceRange, 10),
          fieldType: y.fieldType
        });
      }), g;
    }, n;
  }()
), XMLFormat = (
  /** @class */
  function() {
    function n() {
    }
    return n.test = function(t) {
      return t instanceof XMLDocument && t.getElementsByTagName("page").length && t.getElementsByTagName("info")[0].getAttribute("face") !== null;
    }, n.parse = function(t) {
      for (var e = new BitmapFontData(), r = t.getElementsByTagName("info"), a = t.getElementsByTagName("common"), s = t.getElementsByTagName("page"), o = t.getElementsByTagName("char"), u = t.getElementsByTagName("kerning"), h = t.getElementsByTagName("distanceField"), l = 0; l < r.length; l++)
        e.info.push({
          face: r[l].getAttribute("face"),
          size: parseInt(r[l].getAttribute("size"), 10)
        });
      for (var l = 0; l < a.length; l++)
        e.common.push({
          lineHeight: parseInt(a[l].getAttribute("lineHeight"), 10)
        });
      for (var l = 0; l < s.length; l++)
        e.page.push({
          id: parseInt(s[l].getAttribute("id"), 10) || 0,
          file: s[l].getAttribute("file")
        });
      for (var l = 0; l < o.length; l++) {
        var c = o[l];
        e.char.push({
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
        e.kerning.push({
          first: parseInt(u[l].getAttribute("first"), 10),
          second: parseInt(u[l].getAttribute("second"), 10),
          amount: parseInt(u[l].getAttribute("amount"), 10)
        });
      for (var l = 0; l < h.length; l++)
        e.distanceField.push({
          fieldType: h[l].getAttribute("fieldType"),
          distanceRange: parseInt(h[l].getAttribute("distanceRange"), 10)
        });
      return e;
    }, n;
  }()
), XMLStringFormat = (
  /** @class */
  function() {
    function n() {
    }
    return n.test = function(t) {
      if (typeof t == "string" && t.indexOf("<font>") > -1) {
        var e = new globalThis.DOMParser().parseFromString(t, "text/xml");
        return XMLFormat.test(e);
      }
      return !1;
    }, n.parse = function(t) {
      var e = new globalThis.DOMParser().parseFromString(t, "text/xml");
      return XMLFormat.parse(e);
    }, n;
  }()
), formats = [
  TextFormat,
  XMLFormat,
  XMLStringFormat
];
function autoDetectFormat(n) {
  for (var t = 0; t < formats.length; t++)
    if (formats[t].test(n))
      return formats[t];
  return null;
}
function generateFillStyle(n, t, e, r, a, s) {
  var o = e.fill;
  if (Array.isArray(o)) {
    if (o.length === 1)
      return o[0];
  } else return o;
  var u, h = e.dropShadow ? e.dropShadowDistance : 0, l = e.padding || 0, c = n.width / r - h - l * 2, v = n.height / r - h - l * 2, d = o.slice(), m = e.fillGradientStops.slice();
  if (!m.length)
    for (var g = d.length + 1, y = 1; y < g; ++y)
      m.push(y / g);
  if (d.unshift(o[0]), m.unshift(0), d.push(o[o.length - 1]), m.push(1), e.fillGradientType === TEXT_GRADIENT.LINEAR_VERTICAL) {
    u = t.createLinearGradient(c / 2, l, c / 2, v + l);
    for (var _ = 0, b = s.fontProperties.fontSize + e.strokeThickness, S = b / v, y = 0; y < a.length; y++)
      for (var P = s.lineHeight * y, N = 0; N < d.length; N++) {
        var E = 0;
        typeof m[N] == "number" ? E = m[N] : E = N / d.length;
        var M = P / v + E * S, T = Math.max(_, M);
        T = Math.min(T, 1), u.addColorStop(T, d[N]), _ = T;
      }
  } else {
    u = t.createLinearGradient(l, v / 2, c + l, v / 2);
    for (var A = d.length + 1, L = 1, y = 0; y < d.length; y++) {
      var B = void 0;
      typeof m[y] == "number" ? B = m[y] : B = L / A, u.addColorStop(B, d[y]), L++;
    }
  }
  return u;
}
function drawGlyph(n, t, e, r, a, s, o) {
  var u = e.text, h = e.fontProperties;
  t.translate(r, a), t.scale(s, s);
  var l = o.strokeThickness / 2, c = -(o.strokeThickness / 2);
  if (t.font = o.toFontString(), t.lineWidth = o.strokeThickness, t.textBaseline = o.textBaseline, t.lineJoin = o.lineJoin, t.miterLimit = o.miterLimit, t.fillStyle = generateFillStyle(n, t, o, s, [u], e), t.strokeStyle = o.stroke, o.dropShadow) {
    var v = o.dropShadowColor, d = hex2rgb(typeof v == "number" ? v : string2hex(v)), m = o.dropShadowBlur * s, g = o.dropShadowDistance * s;
    t.shadowColor = "rgba(" + d[0] * 255 + "," + d[1] * 255 + "," + d[2] * 255 + "," + o.dropShadowAlpha + ")", t.shadowBlur = m, t.shadowOffsetX = Math.cos(o.dropShadowAngle) * g, t.shadowOffsetY = Math.sin(o.dropShadowAngle) * g;
  } else
    t.shadowColor = "black", t.shadowBlur = 0, t.shadowOffsetX = 0, t.shadowOffsetY = 0;
  o.stroke && o.strokeThickness && t.strokeText(u, l, c + e.lineHeight - h.descent), o.fill && t.fillText(u, l, c + e.lineHeight - h.descent), t.setTransform(1, 0, 0, 1, 0, 0), t.fillStyle = "rgba(0, 0, 0, 0)";
}
function splitTextToCharacters(n) {
  return Array.from ? Array.from(n) : n.split("");
}
function resolveCharacters(n) {
  typeof n == "string" && (n = [n]);
  for (var t = [], e = 0, r = n.length; e < r; e++) {
    var a = n[e];
    if (Array.isArray(a)) {
      if (a.length !== 2)
        throw new Error("[BitmapFont]: Invalid character range length, expecting 2 got " + a.length + ".");
      var s = a[0].charCodeAt(0), o = a[1].charCodeAt(0);
      if (o < s)
        throw new Error("[BitmapFont]: Invalid character range.");
      for (var u = s, h = o; u <= h; u++)
        t.push(String.fromCharCode(u));
    } else
      t.push.apply(t, splitTextToCharacters(a));
  }
  if (t.length === 0)
    throw new Error("[BitmapFont]: Empty set when resolving characters.");
  return t;
}
function extractCharCode(n) {
  return n.codePointAt ? n.codePointAt(0) : n.charCodeAt(0);
}
var BitmapFont = (
  /** @class */
  function() {
    function n(t, e, r) {
      var a, s, o = t.info[0], u = t.common[0], h = t.page[0], l = t.distanceField[0], c = getResolutionOfUrl(h.file), v = {};
      this._ownsTextures = r, this.font = o.face, this.size = o.size, this.lineHeight = u.lineHeight / c, this.chars = {}, this.pageTextures = v;
      for (var d = 0; d < t.page.length; d++) {
        var m = t.page[d], g = m.id, y = m.file;
        v[g] = e instanceof Array ? e[d] : e[y], l?.fieldType && l.fieldType !== "none" && (v[g].baseTexture.alphaMode = ALPHA_MODES.NO_PREMULTIPLIED_ALPHA, v[g].baseTexture.mipmap = MIPMAP_MODES.OFF);
      }
      for (var d = 0; d < t.char.length; d++) {
        var _ = t.char[d], g = _.id, b = _.page, S = t.char[d], P = S.x, N = S.y, E = S.width, M = S.height, T = S.xoffset, A = S.yoffset, L = S.xadvance;
        P /= c, N /= c, E /= c, M /= c, T /= c, A /= c, L /= c;
        var B = new Rectangle(P + v[b].frame.x / c, N + v[b].frame.y / c, E, M);
        this.chars[g] = {
          xOffset: T,
          yOffset: A,
          xAdvance: L,
          kerning: {},
          texture: new Texture(v[b].baseTexture, B),
          page: b
        };
      }
      for (var d = 0; d < t.kerning.length; d++) {
        var Y = t.kerning[d], H = Y.first, rt = Y.second, at = Y.amount;
        H /= c, rt /= c, at /= c, this.chars[rt] && (this.chars[rt].kerning[H] = at);
      }
      this.distanceFieldRange = l?.distanceRange, this.distanceFieldType = (s = (a = l?.fieldType) === null || a === void 0 ? void 0 : a.toLowerCase()) !== null && s !== void 0 ? s : "none";
    }
    return n.prototype.destroy = function() {
      for (var t in this.chars)
        this.chars[t].texture.destroy(), this.chars[t].texture = null;
      for (var t in this.pageTextures)
        this._ownsTextures && this.pageTextures[t].destroy(!0), this.pageTextures[t] = null;
      this.chars = null, this.pageTextures = null;
    }, n.install = function(t, e, r) {
      var a;
      if (t instanceof BitmapFontData)
        a = t;
      else {
        var s = autoDetectFormat(t);
        if (!s)
          throw new Error("Unrecognized data format for font.");
        a = s.parse(t);
      }
      e instanceof Texture && (e = [e]);
      var o = new n(a, e, r);
      return n.available[o.font] = o, o;
    }, n.uninstall = function(t) {
      var e = n.available[t];
      if (!e)
        throw new Error("No font found named '" + t + "'");
      e.destroy(), delete n.available[t];
    }, n.from = function(t, e, r) {
      if (!t)
        throw new Error("[BitmapFont] Property `name` is required.");
      var a = Object.assign({}, n.defaultOptions, r), s = a.chars, o = a.padding, u = a.resolution, h = a.textureWidth, l = a.textureHeight, c = resolveCharacters(s), v = e instanceof TextStyle ? e : new TextStyle(e), d = h, m = new BitmapFontData();
      m.info[0] = {
        face: v.fontFamily,
        size: v.fontSize
      }, m.common[0] = {
        lineHeight: v.fontSize
      };
      for (var g = 0, y = 0, _, b, S, P = 0, N = [], E = 0; E < c.length; E++) {
        _ || (_ = settings.ADAPTER.createCanvas(), _.width = h, _.height = l, b = _.getContext("2d"), S = new BaseTexture(_, { resolution: u }), N.push(new Texture(S)), m.page.push({
          id: N.length - 1,
          file: ""
        }));
        var M = c[E], T = TextMetrics.measureText(M, v, !1, _), A = T.width, L = Math.ceil(T.height), B = Math.ceil((v.fontStyle === "italic" ? 2 : 1) * A);
        if (y >= l - L * u) {
          if (y === 0)
            throw new Error("[BitmapFont] textureHeight " + l + "px is too small " + ("(fontFamily: '" + v.fontFamily + "', fontSize: " + v.fontSize + "px, char: '" + M + "')"));
          --E, _ = null, b = null, S = null, y = 0, g = 0, P = 0;
          continue;
        }
        if (P = Math.max(L + T.fontProperties.descent, P), B * u + g >= d) {
          if (g === 0)
            throw new Error("[BitmapFont] textureWidth " + h + "px is too small " + ("(fontFamily: '" + v.fontFamily + "', fontSize: " + v.fontSize + "px, char: '" + M + "')"));
          --E, y += P * u, y = Math.ceil(y), g = 0, P = 0;
          continue;
        }
        drawGlyph(_, b, T, g, y, u, v);
        var Y = extractCharCode(T.text);
        m.char.push({
          id: Y,
          page: N.length - 1,
          x: g / u,
          y: y / u,
          width: B,
          height: L,
          xoffset: 0,
          yoffset: 0,
          xadvance: Math.ceil(A - (v.dropShadow ? v.dropShadowDistance : 0) - (v.stroke ? v.strokeThickness : 0))
        }), g += (B + 2 * o) * u, g = Math.ceil(g);
      }
      if (!r?.skipKerning)
        for (var E = 0, H = c.length; E < H; E++)
          for (var rt = c[E], at = 0; at < H; at++) {
            var Z = c[at], w = b.measureText(rt).width, O = b.measureText(Z).width, R = b.measureText(rt + Z).width, F = R - (w + O);
            F && m.kerning.push({
              first: extractCharCode(rt),
              second: extractCharCode(Z),
              amount: F
            });
          }
      var D = new n(m, N, !0);
      return n.available[t] !== void 0 && n.uninstall(t), n.available[t] = D, D;
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
  __extends$8(t, n);
  function t(e, r) {
    r === void 0 && (r = {});
    var a = n.call(this) || this;
    a._tint = 16777215;
    var s = Object.assign({}, t.styleDefaults, r), o = s.align, u = s.tint, h = s.maxWidth, l = s.letterSpacing, c = s.fontName, v = s.fontSize;
    if (!BitmapFont.available[c])
      throw new Error('Missing BitmapFont "' + c + '"');
    return a._activePagesMeshData = [], a._textWidth = 0, a._textHeight = 0, a._align = o, a._tint = u, a._font = void 0, a._fontName = c, a._fontSize = v, a.text = e, a._maxWidth = h, a._maxLineHeight = 0, a._letterSpacing = l, a._anchor = new ObservablePoint(function() {
      a.dirty = !0;
    }, a, 0, 0), a._roundPixels = settings.ROUND_PIXELS, a.dirty = !0, a._resolution = settings.RESOLUTION, a._autoResolution = !0, a._textureCache = {}, a;
  }
  return t.prototype.updateText = function() {
    for (var e, r = BitmapFont.available[this._fontName], a = this.fontSize, s = a / r.size, o = new Point(), u = [], h = [], l = [], c = this._text.replace(/(?:\r\n|\r)/g, `
`) || " ", v = splitTextToCharacters(c), d = this._maxWidth * r.size / a, m = r.distanceFieldType === "none" ? pageMeshDataDefaultPageMeshData : pageMeshDataMSDFPageMeshData, g = null, y = 0, _ = 0, b = 0, S = -1, P = 0, N = 0, E = 0, M = 0, T = 0; T < v.length; T++) {
      var A = v[T], L = extractCharCode(A);
      if (/(?:\s)/.test(A) && (S = T, P = y, M++), A === "\r" || A === `
`) {
        h.push(y), l.push(-1), _ = Math.max(_, y), ++b, ++N, o.x = 0, o.y += r.lineHeight, g = null, M = 0;
        continue;
      }
      var B = r.chars[L];
      if (B) {
        g && B.kerning[g] && (o.x += B.kerning[g]);
        var Y = charRenderDataPool.pop() || {
          texture: Texture.EMPTY,
          line: 0,
          charCode: 0,
          prevSpaces: 0,
          position: new Point()
        };
        Y.texture = B.texture, Y.line = b, Y.charCode = L, Y.position.x = o.x + B.xOffset + this._letterSpacing / 2, Y.position.y = o.y + B.yOffset, Y.prevSpaces = M, u.push(Y), y = Y.position.x + Math.max(B.xAdvance - B.xOffset, B.texture.orig.width), o.x += B.xAdvance + this._letterSpacing, E = Math.max(E, B.yOffset + B.texture.height), g = L, S !== -1 && d > 0 && o.x > d && (++N, removeItems(u, 1 + S - N, 1 + T - S), T = S, S = -1, h.push(P), l.push(u.length > 0 ? u[u.length - 1].prevSpaces : 0), _ = Math.max(_, P), b++, o.x = 0, o.y += r.lineHeight, g = null, M = 0);
      }
    }
    var H = v[v.length - 1];
    H !== "\r" && H !== `
` && (/(?:\s)/.test(H) && (y = P), h.push(y), _ = Math.max(_, y), l.push(-1));
    for (var rt = [], T = 0; T <= b; T++) {
      var at = 0;
      this._align === "right" ? at = _ - h[T] : this._align === "center" ? at = (_ - h[T]) / 2 : this._align === "justify" && (at = l[T] < 0 ? 0 : (_ - h[T]) / l[T]), rt.push(at);
    }
    var Z = u.length, w = {}, O = [], R = this._activePagesMeshData;
    m.push.apply(m, R);
    for (var T = 0; T < Z; T++) {
      var F = u[T].texture, D = F.baseTexture.uid;
      if (!w[D]) {
        var C = m.pop();
        if (!C) {
          var U = new MeshGeometry(), k = void 0, $ = void 0;
          r.distanceFieldType === "none" ? (k = new MeshMaterial(Texture.EMPTY), $ = BLEND_MODES.NORMAL) : (k = new MeshMaterial(Texture.EMPTY, { program: Program.from(msdfVert, msdfFrag), uniforms: { uFWidth: 0 } }), $ = BLEND_MODES.NORMAL_NPM);
          var K = new Mesh(U, k);
          K.blendMode = $, C = {
            index: 0,
            indexCount: 0,
            vertexCount: 0,
            uvsCount: 0,
            total: 0,
            mesh: K,
            vertices: null,
            uvs: null,
            indices: null
          };
        }
        C.index = 0, C.indexCount = 0, C.vertexCount = 0, C.uvsCount = 0, C.total = 0;
        var I = this._textureCache;
        I[D] = I[D] || new Texture(F.baseTexture), C.mesh.texture = I[D], C.mesh.tint = this._tint, O.push(C), w[D] = C;
      }
      w[D].total++;
    }
    for (var T = 0; T < R.length; T++)
      O.indexOf(R[T]) === -1 && this.removeChild(R[T].mesh);
    for (var T = 0; T < O.length; T++)
      O[T].mesh.parent !== this && this.addChild(O[T].mesh);
    this._activePagesMeshData = O;
    for (var T in w) {
      var C = w[T], tt = C.total;
      if (!(((e = C.indices) === null || e === void 0 ? void 0 : e.length) > 6 * tt) || C.vertices.length < Mesh.BATCHABLE_SIZE * 2)
        C.vertices = new Float32Array(4 * 2 * tt), C.uvs = new Float32Array(4 * 2 * tt), C.indices = new Uint16Array(6 * tt);
      else
        for (var q = C.total, nt = C.vertices, Q = q * 4 * 2; Q < nt.length; Q++)
          nt[Q] = 0;
      C.mesh.size = 6 * tt;
    }
    for (var T = 0; T < Z; T++) {
      var A = u[T], V = A.position.x + rt[A.line] * (this._align === "justify" ? A.prevSpaces : 1);
      this._roundPixels && (V = Math.round(V));
      var st = V * s, it = A.position.y * s, F = A.texture, z = w[F.baseTexture.uid], J = F.frame, et = F._uvs, W = z.index++;
      z.indices[W * 6 + 0] = 0 + W * 4, z.indices[W * 6 + 1] = 1 + W * 4, z.indices[W * 6 + 2] = 2 + W * 4, z.indices[W * 6 + 3] = 0 + W * 4, z.indices[W * 6 + 4] = 2 + W * 4, z.indices[W * 6 + 5] = 3 + W * 4, z.vertices[W * 8 + 0] = st, z.vertices[W * 8 + 1] = it, z.vertices[W * 8 + 2] = st + J.width * s, z.vertices[W * 8 + 3] = it, z.vertices[W * 8 + 4] = st + J.width * s, z.vertices[W * 8 + 5] = it + J.height * s, z.vertices[W * 8 + 6] = st, z.vertices[W * 8 + 7] = it + J.height * s, z.uvs[W * 8 + 0] = et.x0, z.uvs[W * 8 + 1] = et.y0, z.uvs[W * 8 + 2] = et.x1, z.uvs[W * 8 + 3] = et.y1, z.uvs[W * 8 + 4] = et.x2, z.uvs[W * 8 + 5] = et.y2, z.uvs[W * 8 + 6] = et.x3, z.uvs[W * 8 + 7] = et.y3;
    }
    this._textWidth = _ * s, this._textHeight = (o.y + r.lineHeight) * s;
    for (var T in w) {
      var C = w[T];
      if (this.anchor.x !== 0 || this.anchor.y !== 0)
        for (var vt = 0, yt = this._textWidth * this.anchor.x, bt = this._textHeight * this.anchor.y, Rt = 0; Rt < C.total; Rt++)
          C.vertices[vt++] -= yt, C.vertices[vt++] -= bt, C.vertices[vt++] -= yt, C.vertices[vt++] -= bt, C.vertices[vt++] -= yt, C.vertices[vt++] -= bt, C.vertices[vt++] -= yt, C.vertices[vt++] -= bt;
      this._maxLineHeight = E * s;
      var Tt = C.mesh.geometry.getBuffer("aVertexPosition"), St = C.mesh.geometry.getBuffer("aTextureCoord"), Pt = C.mesh.geometry.getIndex();
      Tt.data = C.vertices, St.data = C.uvs, Pt.data = C.indices, Tt.update(), St.update(), Pt.update();
    }
    for (var T = 0; T < u.length; T++)
      charRenderDataPool.push(u[T]);
    this._font = r, this.dirty = !1;
  }, t.prototype.updateTransform = function() {
    this.validate(), this.containerUpdateTransform();
  }, t.prototype._render = function(e) {
    this._autoResolution && this._resolution !== e.resolution && (this._resolution = e.resolution, this.dirty = !0);
    var r = BitmapFont.available[this._fontName], a = r.distanceFieldRange, s = r.distanceFieldType, o = r.size;
    if (s !== "none")
      for (var u = this.worldTransform, h = u.a, l = u.b, c = u.c, v = u.d, d = Math.sqrt(h * h + l * l), m = Math.sqrt(c * c + v * v), g = (Math.abs(d) + Math.abs(m)) / 2, y = this.fontSize / o, _ = 0, b = this._activePagesMeshData; _ < b.length; _++) {
        var S = b[_];
        S.mesh.shader.uniforms.uFWidth = g * a * y * this._resolution;
      }
    n.prototype._render.call(this, e);
  }, t.prototype.getLocalBounds = function() {
    return this.validate(), n.prototype.getLocalBounds.call(this);
  }, t.prototype.validate = function() {
    var e = BitmapFont.available[this._fontName];
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
      if (!BitmapFont.available[e])
        throw new Error('Missing BitmapFont "' + e + '"');
      this._fontName !== e && (this._fontName = e, this.dirty = !0);
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t.prototype, "fontSize", {
    /** The size of the font to display. */
    get: function() {
      var e;
      return (e = this._fontSize) !== null && e !== void 0 ? e : BitmapFont.available[this._fontName].size;
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
    var r = this._textureCache, a = BitmapFont.available[this._fontName], s = a.distanceFieldType === "none" ? pageMeshDataDefaultPageMeshData : pageMeshDataMSDFPageMeshData;
    s.push.apply(s, this._activePagesMeshData);
    for (var o = 0, u = this._activePagesMeshData; o < u.length; o++) {
      var h = u[o];
      this.removeChild(h.mesh);
    }
    this._activePagesMeshData = [], s.filter(function(v) {
      return r[v.mesh.texture.baseTexture.uid];
    }).forEach(function(v) {
      v.mesh.texture = Texture.EMPTY;
    });
    for (var l in r) {
      var c = r[l];
      c.destroy(), delete r[l];
    }
    this._font = null, this._textureCache = null, n.prototype.destroy.call(this, e);
  }, t.styleDefaults = {
    align: "left",
    tint: 16777215,
    maxWidth: 0,
    letterSpacing: 0
  }, t;
})(Container);
var BitmapFontLoader = (
  /** @class */
  function() {
    function n() {
    }
    return n.add = function() {
      LoaderResource.setExtensionXhrType("fnt", LoaderResource.XHR_RESPONSE_TYPE.TEXT);
    }, n.use = function(t, e) {
      var r = autoDetectFormat(t.data);
      if (!r) {
        e();
        return;
      }
      for (var a = n.getBaseUrl(this, t), s = r.parse(t.data), o = {}, u = function(y) {
        o[y.metadata.pageFile] = y.texture, Object.keys(o).length === s.page.length && (t.bitmapFont = BitmapFont.install(s, o, !0), e());
      }, h = 0; h < s.page.length; ++h) {
        var l = s.page[h].file, c = a + l, v = !1;
        for (var d in this.resources) {
          var m = this.resources[d];
          if (m.url === c) {
            m.metadata.pageFile = l, m.texture ? u(m) : m.onAfterMiddleware.add(u), v = !0;
            break;
          }
        }
        if (!v) {
          var g = {
            crossOrigin: t.crossOrigin,
            loadType: LoaderResource.LOAD_TYPE.IMAGE,
            metadata: Object.assign({ pageFile: l }, t.metadata.imageMetadata),
            parentResource: t
          };
          this.add(c, g, u);
        }
      }
    }, n.getBaseUrl = function(t, e) {
      var r = e.isDataUrl ? "" : n.dirname(e.url);
      return e.isDataUrl && (r === "." && (r = ""), t.baseUrl && r && t.baseUrl.charAt(t.baseUrl.length - 1) === "/" && (r += "/")), r = r.replace(t.baseUrl, ""), r && r.charAt(r.length - 1) !== "/" && (r += "/"), r;
    }, n.dirname = function(t) {
      var e = t.replace(/\\/g, "/").replace(/\/$/, "").replace(/\/[^\/]*$/, "");
      return e === t ? "." : e === "" ? "/" : e;
    }, n.extension = ExtensionType.Loader, n;
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
var extendStatics$7 = function(n, t) {
  return extendStatics$7 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, r) {
    e.__proto__ = r;
  } || function(e, r) {
    for (var a in r)
      r.hasOwnProperty(a) && (e[a] = r[a]);
  }, extendStatics$7(n, t);
};
function __extends$7(n, t) {
  extendStatics$7(n, t);
  function e() {
    this.constructor = n;
  }
  n.prototype = t === null ? Object.create(t) : (e.prototype = t.prototype, new e());
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
  __extends$7(t, n);
  function t(e) {
    e === void 0 && (e = 1);
    var r = n.call(this, defaultVertex$1, fragment$4, { uAlpha: 1 }) || this;
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
})(Filter);
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
var extendStatics$6 = function(n, t) {
  return extendStatics$6 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, r) {
    e.__proto__ = r;
  } || function(e, r) {
    for (var a in r)
      r.hasOwnProperty(a) && (e[a] = r[a]);
  }, extendStatics$6(n, t);
};
function __extends$6(n, t) {
  extendStatics$6(n, t);
  function e() {
    this.constructor = n;
  }
  n.prototype = t === null ? Object.create(t) : (e.prototype = t.prototype, new e());
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
function generateBlurVertSource(n, t) {
  var e = Math.ceil(n / 2), r = vertTemplate, a = "", s;
  t ? s = "vBlurTexCoords[%index%] =  textureCoord + vec2(%sampleIndex% * strength, 0.0);" : s = "vBlurTexCoords[%index%] =  textureCoord + vec2(0.0, %sampleIndex% * strength);";
  for (var o = 0; o < n; o++) {
    var u = s.replace("%index%", o.toString());
    u = u.replace("%sampleIndex%", o - (e - 1) + ".0"), a += u, a += `
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
  for (var t = GAUSSIAN_VALUES[n], e = t.length, r = fragTemplate, a = "", s = "gl_FragColor += texture2D(uSampler, vBlurTexCoords[%index%]) * %value%;", o, u = 0; u < n; u++) {
    var h = s.replace("%index%", u.toString());
    o = u, u >= e && (o = n - u - 1), h = h.replace("%value%", t[o].toString()), a += h, a += `
`;
  }
  return r = r.replace("%blur%", a), r = r.replace("%size%", n.toString()), r;
}
var BlurFilterPass = (
  /** @class */
  function(n) {
    __extends$6(t, n);
    function t(e, r, a, s, o) {
      r === void 0 && (r = 8), a === void 0 && (a = 4), s === void 0 && (s = settings.FILTER_RESOLUTION), o === void 0 && (o = 5);
      var u = this, h = generateBlurVertSource(o, e), l = generateBlurFragSource(o);
      return u = n.call(
        this,
        // vertex shader
        h,
        // fragment shader
        l
      ) || this, u.horizontal = e, u.resolution = s, u._quality = 0, u.quality = a, u.blur = r, u;
    }
    return t.prototype.apply = function(e, r, a, s) {
      if (a ? this.horizontal ? this.uniforms.strength = 1 / a.width * (a.width / r.width) : this.uniforms.strength = 1 / a.height * (a.height / r.height) : this.horizontal ? this.uniforms.strength = 1 / e.renderer.width * (e.renderer.width / r.width) : this.uniforms.strength = 1 / e.renderer.height * (e.renderer.height / r.height), this.uniforms.strength *= this.strength, this.uniforms.strength /= this.passes, this.passes === 1)
        e.applyFilter(this, r, a, s);
      else {
        var o = e.getFilterTexture(), u = e.renderer, h = r, l = o;
        this.state.blend = !1, e.applyFilter(this, h, l, CLEAR_MODES.CLEAR);
        for (var c = 1; c < this.passes - 1; c++) {
          e.bindAndClear(h, CLEAR_MODES.BLIT), this.uniforms.uSampler = l;
          var v = l;
          l = h, h = v, u.shader.bind(this), u.geometry.draw(5);
        }
        this.state.blend = !0, e.applyFilter(this, l, a, s), e.returnFilterTexture(o);
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
  }(Filter)
), BlurFilter$1 = (
  /** @class */
  function(n) {
    __extends$6(t, n);
    function t(e, r, a, s) {
      e === void 0 && (e = 8), r === void 0 && (r = 4), a === void 0 && (a = settings.FILTER_RESOLUTION), s === void 0 && (s = 5);
      var o = n.call(this) || this;
      return o.blurXFilter = new BlurFilterPass(!0, e, r, a, s), o.blurYFilter = new BlurFilterPass(!1, e, r, a, s), o.resolution = a, o.quality = r, o.blur = e, o.repeatEdgePixels = !1, o;
    }
    return t.prototype.apply = function(e, r, a, s) {
      var o = Math.abs(this.blurXFilter.strength), u = Math.abs(this.blurYFilter.strength);
      if (o && u) {
        var h = e.getFilterTexture();
        this.blurXFilter.apply(e, r, h, CLEAR_MODES.CLEAR), this.blurYFilter.apply(e, h, a, s), e.returnFilterTexture(h);
      } else u ? this.blurYFilter.apply(e, r, a, s) : this.blurXFilter.apply(e, r, a, s);
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
  }(Filter)
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
var extendStatics$5 = function(n, t) {
  return extendStatics$5 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, r) {
    e.__proto__ = r;
  } || function(e, r) {
    for (var a in r)
      r.hasOwnProperty(a) && (e[a] = r[a]);
  }, extendStatics$5(n, t);
};
function __extends$5(n, t) {
  extendStatics$5(n, t);
  function e() {
    this.constructor = n;
  }
  n.prototype = t === null ? Object.create(t) : (e.prototype = t.prototype, new e());
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
    __extends$5(t, n);
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
      return e = n.call(this, defaultFilterVertex, fragment$3, r) || this, e.alpha = 1, e;
    }
    return t.prototype._loadMatrix = function(e, r) {
      r === void 0 && (r = !1);
      var a = e;
      r && (this._multiply(a, this.uniforms.m, e), a = this._colorMatrix(a)), this.uniforms.m = a;
    }, t.prototype._multiply = function(e, r, a) {
      return e[0] = r[0] * a[0] + r[1] * a[5] + r[2] * a[10] + r[3] * a[15], e[1] = r[0] * a[1] + r[1] * a[6] + r[2] * a[11] + r[3] * a[16], e[2] = r[0] * a[2] + r[1] * a[7] + r[2] * a[12] + r[3] * a[17], e[3] = r[0] * a[3] + r[1] * a[8] + r[2] * a[13] + r[3] * a[18], e[4] = r[0] * a[4] + r[1] * a[9] + r[2] * a[14] + r[3] * a[19] + r[4], e[5] = r[5] * a[0] + r[6] * a[5] + r[7] * a[10] + r[8] * a[15], e[6] = r[5] * a[1] + r[6] * a[6] + r[7] * a[11] + r[8] * a[16], e[7] = r[5] * a[2] + r[6] * a[7] + r[7] * a[12] + r[8] * a[17], e[8] = r[5] * a[3] + r[6] * a[8] + r[7] * a[13] + r[8] * a[18], e[9] = r[5] * a[4] + r[6] * a[9] + r[7] * a[14] + r[8] * a[19] + r[9], e[10] = r[10] * a[0] + r[11] * a[5] + r[12] * a[10] + r[13] * a[15], e[11] = r[10] * a[1] + r[11] * a[6] + r[12] * a[11] + r[13] * a[16], e[12] = r[10] * a[2] + r[11] * a[7] + r[12] * a[12] + r[13] * a[17], e[13] = r[10] * a[3] + r[11] * a[8] + r[12] * a[13] + r[13] * a[18], e[14] = r[10] * a[4] + r[11] * a[9] + r[12] * a[14] + r[13] * a[19] + r[14], e[15] = r[15] * a[0] + r[16] * a[5] + r[17] * a[10] + r[18] * a[15], e[16] = r[15] * a[1] + r[16] * a[6] + r[17] * a[11] + r[18] * a[16], e[17] = r[15] * a[2] + r[16] * a[7] + r[17] * a[12] + r[18] * a[17], e[18] = r[15] * a[3] + r[16] * a[8] + r[17] * a[13] + r[18] * a[18], e[19] = r[15] * a[4] + r[16] * a[9] + r[17] * a[14] + r[18] * a[19] + r[19], e;
    }, t.prototype._colorMatrix = function(e) {
      var r = new Float32Array(e);
      return r[4] /= 255, r[9] /= 255, r[14] /= 255, r[19] /= 255, r;
    }, t.prototype.brightness = function(e, r) {
      var a = [
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
      this._loadMatrix(a, r);
    }, t.prototype.tint = function(e, r) {
      var a = e >> 16 & 255, s = e >> 8 & 255, o = e & 255, u = [
        a / 255,
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
        o / 255,
        0,
        0,
        0,
        0,
        0,
        1,
        0
      ];
      this._loadMatrix(u, r);
    }, t.prototype.greyscale = function(e, r) {
      var a = [
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
      this._loadMatrix(a, r);
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
      var a = Math.cos(e), s = Math.sin(e), o = Math.sqrt, u = 1 / 3, h = o(u), l = a + (1 - a) * u, c = u * (1 - a) - h * s, v = u * (1 - a) + h * s, d = u * (1 - a) + h * s, m = a + u * (1 - a), g = u * (1 - a) - h * s, y = u * (1 - a) - h * s, _ = u * (1 - a) + h * s, b = a + u * (1 - a), S = [
        l,
        c,
        v,
        0,
        0,
        d,
        m,
        g,
        0,
        0,
        y,
        _,
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
    }, t.prototype.contrast = function(e, r) {
      var a = (e || 0) + 1, s = -0.5 * (a - 1), o = [
        a,
        0,
        0,
        0,
        s,
        0,
        a,
        0,
        0,
        s,
        0,
        0,
        a,
        0,
        s,
        0,
        0,
        0,
        1,
        0
      ];
      this._loadMatrix(o, r);
    }, t.prototype.saturate = function(e, r) {
      e === void 0 && (e = 0);
      var a = e * 2 / 3 + 1, s = (a - 1) * -0.5, o = [
        a,
        s,
        s,
        0,
        0,
        s,
        a,
        s,
        0,
        0,
        s,
        s,
        a,
        0,
        0,
        0,
        0,
        0,
        1,
        0
      ];
      this._loadMatrix(o, r);
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
    }, t.prototype.colorTone = function(e, r, a, s, o) {
      e = e || 0.2, r = r || 0.15, a = a || 16770432, s = s || 3375104;
      var u = (a >> 16 & 255) / 255, h = (a >> 8 & 255) / 255, l = (a & 255) / 255, c = (s >> 16 & 255) / 255, v = (s >> 8 & 255) / 255, d = (s & 255) / 255, m = [
        0.3,
        0.59,
        0.11,
        0,
        0,
        u,
        h,
        l,
        e,
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
      this._loadMatrix(m, o);
    }, t.prototype.night = function(e, r) {
      e = e || 0.1;
      var a = [
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
      this._loadMatrix(a, r);
    }, t.prototype.predator = function(e, r) {
      var a = [
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
      this._loadMatrix(a, r);
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
  }(Filter)
);
ColorMatrixFilter$1.prototype.grayscale = ColorMatrixFilter$1.prototype.greyscale;
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
var extendStatics$4 = function(n, t) {
  return extendStatics$4 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, r) {
    e.__proto__ = r;
  } || function(e, r) {
    for (var a in r)
      r.hasOwnProperty(a) && (e[a] = r[a]);
  }, extendStatics$4(n, t);
};
function __extends$4(n, t) {
  extendStatics$4(n, t);
  function e() {
    this.constructor = n;
  }
  n.prototype = t === null ? Object.create(t) : (e.prototype = t.prototype, new e());
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
  __extends$4(t, n);
  function t(e, r) {
    var a = this, s = new Matrix();
    return e.renderable = !1, a = n.call(this, vertex$1, fragment$2, {
      mapSampler: e._texture,
      filterMatrix: s,
      scale: { x: 1, y: 1 },
      rotation: new Float32Array([1, 0, 0, 1])
    }) || this, a.maskSprite = e, a.maskMatrix = s, r == null && (r = 20), a.scale = new Point(r, r), a;
  }
  return t.prototype.apply = function(e, r, a, s) {
    this.uniforms.filterMatrix = e.calculateSpriteMatrix(this.maskMatrix, this.maskSprite), this.uniforms.scale.x = this.scale.x, this.uniforms.scale.y = this.scale.y;
    var o = this.maskSprite.worldTransform, u = Math.sqrt(o.a * o.a + o.b * o.b), h = Math.sqrt(o.c * o.c + o.d * o.d);
    u !== 0 && h !== 0 && (this.uniforms.rotation[0] = o.a / u, this.uniforms.rotation[1] = o.b / u, this.uniforms.rotation[2] = o.c / h, this.uniforms.rotation[3] = o.d / h), e.applyFilter(this, r, a, s);
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
})(Filter);
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
var extendStatics$3 = function(n, t) {
  return extendStatics$3 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, r) {
    e.__proto__ = r;
  } || function(e, r) {
    for (var a in r)
      r.hasOwnProperty(a) && (e[a] = r[a]);
  }, extendStatics$3(n, t);
};
function __extends$3(n, t) {
  extendStatics$3(n, t);
  function e() {
    this.constructor = n;
  }
  n.prototype = t === null ? Object.create(t) : (e.prototype = t.prototype, new e());
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
  __extends$3(t, n);
  function t() {
    return n.call(this, vertex, fragment$1) || this;
  }
  return t;
})(Filter);
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
var extendStatics$2 = function(n, t) {
  return extendStatics$2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, r) {
    e.__proto__ = r;
  } || function(e, r) {
    for (var a in r)
      r.hasOwnProperty(a) && (e[a] = r[a]);
  }, extendStatics$2(n, t);
};
function __extends$2(n, t) {
  extendStatics$2(n, t);
  function e() {
    this.constructor = n;
  }
  n.prototype = t === null ? Object.create(t) : (e.prototype = t.prototype, new e());
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
    __extends$2(t, n);
    function t(e, r) {
      e === void 0 && (e = 0.5), r === void 0 && (r = Math.random());
      var a = n.call(this, defaultFilterVertex, fragment, {
        uNoise: 0,
        uSeed: 0
      }) || this;
      return a.noise = e, a.seed = r, a;
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
  }(Filter)
);
/*!
 * @pixi/mixin-cache-as-bitmap - v6.5.10
 * Compiled Thu, 06 Jul 2023 15:25:11 UTC
 *
 * @pixi/mixin-cache-as-bitmap is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
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
        var t;
        n ? (this._cacheData || (this._cacheData = new CacheData()), t = this._cacheData, t.originalRender = this.render, t.originalRenderCanvas = this.renderCanvas, t.originalUpdateTransform = this.updateTransform, t.originalCalculateBounds = this.calculateBounds, t.originalGetLocalBounds = this.getLocalBounds, t.originalDestroy = this.destroy, t.originalContainsPoint = this.containsPoint, t.originalMask = this._mask, t.originalFilterArea = this.filterArea, this.render = this._renderCached, this.renderCanvas = this._renderCachedCanvas, this.destroy = this._cacheAsBitmapDestroy) : (t = this._cacheData, t.sprite && this._destroyCachedDisplayObject(), this.render = t.originalRender, this.renderCanvas = t.originalRenderCanvas, this.calculateBounds = t.originalCalculateBounds, this.getLocalBounds = t.originalGetLocalBounds, this.destroy = t.originalDestroy, this.updateTransform = t.originalUpdateTransform, this.containsPoint = t.originalContainsPoint, this._mask = t.originalMask, this.filterArea = t.originalFilterArea);
      }
    }
  }
});
DisplayObject.prototype._renderCached = function(t) {
  !this.visible || this.worldAlpha <= 0 || !this.renderable || (this._initCachedDisplayObject(t), this._cacheData.sprite.transform._worldID = this.transform._worldID, this._cacheData.sprite.worldAlpha = this.worldAlpha, this._cacheData.sprite._render(t));
};
DisplayObject.prototype._initCachedDisplayObject = function(t) {
  var e;
  if (!(this._cacheData && this._cacheData.sprite)) {
    var r = this.alpha;
    this.alpha = 1, t.batch.flush();
    var a = this.getLocalBounds(null, !0).clone();
    if (this.filters && this.filters.length) {
      var s = this.filters[0].padding;
      a.pad(s);
    }
    a.ceil(settings.RESOLUTION);
    var o = t.renderTexture.current, u = t.renderTexture.sourceFrame.clone(), h = t.renderTexture.destinationFrame.clone(), l = t.projection.transform, c = RenderTexture.create({
      width: a.width,
      height: a.height,
      resolution: this.cacheAsBitmapResolution || t.resolution,
      multisample: (e = this.cacheAsBitmapMultisample) !== null && e !== void 0 ? e : t.multisample
    }), v = "cacheAsBitmap_" + uid();
    this._cacheData.textureCacheId = v, BaseTexture.addToCache(c.baseTexture, v), Texture.addToCache(c, v);
    var d = this.transform.localTransform.copyTo(_tempMatrix).invert().translate(-a.x, -a.y);
    this.render = this._cacheData.originalRender, t.render(this, { renderTexture: c, clear: !0, transform: d, skipUpdateTransform: !1 }), t.framebuffer.blit(), t.projection.transform = l, t.renderTexture.bind(o, u, h), this.render = this._renderCached, this.updateTransform = this.displayObjectUpdateTransform, this.calculateBounds = this._calculateCachedBounds, this.getLocalBounds = this._getCachedLocalBounds, this._mask = null, this.filterArea = null, this.alpha = r;
    var m = new Sprite(c);
    m.transform.worldTransform = this.transform.worldTransform, m.anchor.x = -(a.x / a.width), m.anchor.y = -(a.y / a.height), m.alpha = r, m._bounds = this._bounds, this._cacheData.sprite = m, this.transform._parentID = -1, this.parent ? this.updateTransform() : (this.enableTempParent(), this.updateTransform(), this.disableTempParent(null)), this.containsPoint = m.containsPoint.bind(m);
  }
};
DisplayObject.prototype._renderCachedCanvas = function(t) {
  !this.visible || this.worldAlpha <= 0 || !this.renderable || (this._initCachedDisplayObjectCanvas(t), this._cacheData.sprite.worldAlpha = this.worldAlpha, this._cacheData.sprite._renderCanvas(t));
};
DisplayObject.prototype._initCachedDisplayObjectCanvas = function(t) {
  if (!(this._cacheData && this._cacheData.sprite)) {
    var e = this.getLocalBounds(null, !0), r = this.alpha;
    this.alpha = 1;
    var a = t.context, s = t._projTransform;
    e.ceil(settings.RESOLUTION);
    var o = RenderTexture.create({ width: e.width, height: e.height }), u = "cacheAsBitmap_" + uid();
    this._cacheData.textureCacheId = u, BaseTexture.addToCache(o.baseTexture, u), Texture.addToCache(o, u);
    var h = _tempMatrix;
    this.transform.localTransform.copyTo(h), h.invert(), h.tx -= e.x, h.ty -= e.y, this.renderCanvas = this._cacheData.originalRenderCanvas, t.render(this, { renderTexture: o, clear: !0, transform: h, skipUpdateTransform: !1 }), t.context = a, t._projTransform = s, this.renderCanvas = this._renderCachedCanvas, this.updateTransform = this.displayObjectUpdateTransform, this.calculateBounds = this._calculateCachedBounds, this.getLocalBounds = this._getCachedLocalBounds, this._mask = null, this.filterArea = null, this.alpha = r;
    var l = new Sprite(o);
    l.transform.worldTransform = this.transform.worldTransform, l.anchor.x = -(e.x / e.width), l.anchor.y = -(e.y / e.height), l.alpha = r, l._bounds = this._bounds, this._cacheData.sprite = l, this.transform._parentID = -1, this.parent ? this.updateTransform() : (this.parent = t._tempDisplayObjectParent, this.updateTransform(), this.parent = null), this.containsPoint = l.containsPoint.bind(l);
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
DisplayObject.prototype._cacheAsBitmapDestroy = function(t) {
  this.cacheAsBitmap = !1, this.destroy(t);
};
/*!
 * @pixi/mixin-get-child-by-name - v6.5.10
 * Compiled Thu, 06 Jul 2023 15:25:11 UTC
 *
 * @pixi/mixin-get-child-by-name is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
DisplayObject.prototype.name = null;
Container.prototype.getChildByName = function(t, e) {
  for (var r = 0, a = this.children.length; r < a; r++)
    if (this.children[r].name === t)
      return this.children[r];
  if (e)
    for (var r = 0, a = this.children.length; r < a; r++) {
      var s = this.children[r];
      if (s.getChildByName) {
        var o = s.getChildByName(t, !0);
        if (o)
          return o;
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
DisplayObject.prototype.getGlobalPosition = function(t, e) {
  return t === void 0 && (t = new Point()), e === void 0 && (e = !1), this.parent ? this.parent.toGlobal(this.position, t, e) : (t.x = this.position.x, t.y = this.position.y), t;
};
/*!
 * @pixi/app - v6.5.10
 * Compiled Thu, 06 Jul 2023 15:25:11 UTC
 *
 * @pixi/app is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
var ResizePlugin = (
  /** @class */
  function() {
    function n() {
    }
    return n.init = function(t) {
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
          var r, a;
          if (e._resizeTo === globalThis.window)
            r = globalThis.innerWidth, a = globalThis.innerHeight;
          else {
            var s = e._resizeTo, o = s.clientWidth, u = s.clientHeight;
            r = o, a = u;
          }
          e.renderer.resize(r, a);
        }
      }, this._resizeId = null, this._resizeTo = null, this.resizeTo = t.resizeTo || null;
    }, n.destroy = function() {
      globalThis.removeEventListener("resize", this.queueResize), this.cancelResize(), this.cancelResize = null, this.queueResize = null, this.resizeTo = null, this.resize = null;
    }, n.extension = ExtensionType.Application, n;
  }()
), Application = (
  /** @class */
  function() {
    function n(t) {
      var e = this;
      this.stage = new Container(), t = Object.assign({
        forceCanvas: !1
      }, t), this.renderer = autoDetectRenderer(t), n._plugins.forEach(function(r) {
        r.init.call(e, t);
      });
    }
    return n.registerPlugin = function(t) {
      deprecation("6.5.0", "Application.registerPlugin() is deprecated, use extensions.add()"), extensions.add({
        type: ExtensionType.Application,
        ref: t
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
    }), n.prototype.destroy = function(t, e) {
      var r = this, a = n._plugins.slice(0);
      a.reverse(), a.forEach(function(s) {
        s.destroy.call(r);
      }), this.stage.destroy(e), this.stage = null, this.renderer.destroy(t), this.renderer = null;
    }, n._plugins = [], n;
  }()
);
extensions.handleByList(ExtensionType.Application, Application._plugins);
extensions.add(ResizePlugin);
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
var extendStatics$1 = function(n, t) {
  return extendStatics$1 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, r) {
    e.__proto__ = r;
  } || function(e, r) {
    for (var a in r)
      r.hasOwnProperty(a) && (e[a] = r[a]);
  }, extendStatics$1(n, t);
};
function __extends$1(n, t) {
  extendStatics$1(n, t);
  function e() {
    this.constructor = n;
  }
  n.prototype = t === null ? Object.create(t) : (e.prototype = t.prototype, new e());
}
var PlaneGeometry = (
  /** @class */
  function(n) {
    __extends$1(t, n);
    function t(e, r, a, s) {
      e === void 0 && (e = 100), r === void 0 && (r = 100), a === void 0 && (a = 10), s === void 0 && (s = 10);
      var o = n.call(this) || this;
      return o.segWidth = a, o.segHeight = s, o.width = e, o.height = r, o.build(), o;
    }
    return t.prototype.build = function() {
      for (var e = this.segWidth * this.segHeight, r = [], a = [], s = [], o = this.segWidth - 1, u = this.segHeight - 1, h = this.width / o, l = this.height / u, c = 0; c < e; c++) {
        var v = c % this.segWidth, d = c / this.segWidth | 0;
        r.push(v * h, d * l), a.push(v / o, d / u);
      }
      for (var m = o * u, c = 0; c < m; c++) {
        var g = c % o, y = c / o | 0, _ = y * this.segWidth + g, b = y * this.segWidth + g + 1, S = (y + 1) * this.segWidth + g, P = (y + 1) * this.segWidth + g + 1;
        s.push(_, b, S, b, P, S);
      }
      this.buffers[0].data = new Float32Array(r), this.buffers[1].data = new Float32Array(a), this.indexBuffer.data = new Uint16Array(s), this.buffers[0].update(), this.buffers[1].update(), this.indexBuffer.update();
    }, t;
  }(MeshGeometry)
), RopeGeometry = (
  /** @class */
  function(n) {
    __extends$1(t, n);
    function t(e, r, a) {
      e === void 0 && (e = 200), a === void 0 && (a = 0);
      var s = n.call(this, new Float32Array(r.length * 4), new Float32Array(r.length * 4), new Uint16Array((r.length - 1) * 6)) || this;
      return s.points = r, s._width = e, s.textureScale = a, s.build(), s;
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
        var r = this.getBuffer("aVertexPosition"), a = this.getBuffer("aTextureCoord"), s = this.getIndex();
        if (!(e.length < 1)) {
          r.data.length / 4 !== e.length && (r.data = new Float32Array(e.length * 4), a.data = new Float32Array(e.length * 4), s.data = new Uint16Array((e.length - 1) * 6));
          var o = a.data, u = s.data;
          o[0] = 0, o[1] = 0, o[2] = 0, o[3] = 1;
          for (var h = 0, l = e[0], c = this._width * this.textureScale, v = e.length, d = 0; d < v; d++) {
            var m = d * 4;
            if (this.textureScale > 0) {
              var g = l.x - e[d].x, y = l.y - e[d].y, _ = Math.sqrt(g * g + y * y);
              l = e[d], h += _ / c;
            } else
              h = d / (v - 1);
            o[m] = h, o[m + 1] = 0, o[m + 2] = h, o[m + 3] = 1;
          }
          for (var b = 0, d = 0; d < v - 1; d++) {
            var m = d * 2;
            u[b++] = m, u[b++] = m + 1, u[b++] = m + 2, u[b++] = m + 2, u[b++] = m + 1, u[b++] = m + 3;
          }
          a.update(), s.update(), this.updateVertices();
        }
      }
    }, t.prototype.updateVertices = function() {
      var e = this.points;
      if (!(e.length < 1)) {
        for (var r = e[0], a, s = 0, o = 0, u = this.buffers[0].data, h = e.length, l = 0; l < h; l++) {
          var c = e[l], v = l * 4;
          l < e.length - 1 ? a = e[l + 1] : a = c, o = -(a.x - r.x), s = a.y - r.y;
          var d = Math.sqrt(s * s + o * o), m = this.textureScale > 0 ? this.textureScale * this._width / 2 : this._width / 2;
          s /= d, o /= d, s *= m, o *= m, u[v] = c.x + s, u[v + 1] = c.y + o, u[v + 2] = c.x - s, u[v + 3] = c.y - o, r = c;
        }
        this.buffers[0].update();
      }
    }, t.prototype.update = function() {
      this.textureScale > 0 ? this.build() : this.updateVertices();
    }, t;
  }(MeshGeometry)
);
(function(n) {
  __extends$1(t, n);
  function t(e, r, a) {
    a === void 0 && (a = 0);
    var s = this, o = new RopeGeometry(e.height, r, a), u = new MeshMaterial(e);
    return a > 0 && (e.baseTexture.wrapMode = WRAP_MODES.REPEAT), s = n.call(this, o, u) || this, s.autoUpdate = !0, s;
  }
  return t.prototype._render = function(e) {
    var r = this.geometry;
    (this.autoUpdate || r._width !== this.shader.texture.height) && (r._width = this.shader.texture.height, r.update()), n.prototype._render.call(this, e);
  }, t;
})(Mesh);
var SimplePlane = (
  /** @class */
  function(n) {
    __extends$1(t, n);
    function t(e, r, a) {
      var s = this, o = new PlaneGeometry(e.width, e.height, r, a), u = new MeshMaterial(Texture.WHITE);
      return s = n.call(this, o, u) || this, s.texture = e, s.autoResize = !0, s;
    }
    return t.prototype.textureUpdated = function() {
      this._textureID = this.shader.texture._updateID;
      var e = this.geometry, r = this.shader.texture, a = r.width, s = r.height;
      this.autoResize && (e.width !== a || e.height !== s) && (e.width = this.shader.texture.width, e.height = this.shader.texture.height, e.build());
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
      this._textureID !== this.shader.texture._updateID && this.textureUpdated(), n.prototype._render.call(this, e);
    }, t.prototype.destroy = function(e) {
      this.shader.texture.off("update", this.textureUpdated, this), n.prototype.destroy.call(this, e);
    }, t;
  }(Mesh)
);
(function(n) {
  __extends$1(t, n);
  function t(e, r, a, s, o) {
    e === void 0 && (e = Texture.EMPTY);
    var u = this, h = new MeshGeometry(r, a, s);
    h.getBuffer("aVertexPosition").static = !1;
    var l = new MeshMaterial(e);
    return u = n.call(this, h, l, null, o) || this, u.autoUpdate = !0, u;
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
    this.autoUpdate && this.geometry.getBuffer("aVertexPosition").update(), n.prototype._render.call(this, e);
  }, t;
})(Mesh);
var DEFAULT_BORDER_SIZE = 10;
(function(n) {
  __extends$1(t, n);
  function t(e, r, a, s, o) {
    r === void 0 && (r = DEFAULT_BORDER_SIZE), a === void 0 && (a = DEFAULT_BORDER_SIZE), s === void 0 && (s = DEFAULT_BORDER_SIZE), o === void 0 && (o = DEFAULT_BORDER_SIZE);
    var u = n.call(this, Texture.WHITE, 4, 4) || this;
    return u._origWidth = e.orig.width, u._origHeight = e.orig.height, u._width = u._origWidth, u._height = u._origHeight, u._leftWidth = r, u._rightWidth = s, u._topHeight = a, u._bottomHeight = o, u.texture = e, u;
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
    var e = this._leftWidth + this._rightWidth, r = this._width > e ? 1 : this._width / e, a = this._topHeight + this._bottomHeight, s = this._height > a ? 1 : this._height / a, o = Math.min(r, s);
    return o;
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
    var a = 1 / this._origWidth, s = 1 / this._origHeight;
    r[0] = r[8] = r[16] = r[24] = 0, r[1] = r[3] = r[5] = r[7] = 0, r[6] = r[14] = r[22] = r[30] = 1, r[25] = r[27] = r[29] = r[31] = 1, r[2] = r[10] = r[18] = r[26] = a * this._leftWidth, r[4] = r[12] = r[20] = r[28] = 1 - a * this._rightWidth, r[9] = r[11] = r[13] = r[15] = s * this._topHeight, r[17] = r[19] = r[21] = r[23] = 1 - s * this._bottomHeight, this.updateHorizontalVertices(), this.updateVerticalVertices(), this.geometry.buffers[0].update(), this.geometry.buffers[1].update();
  }, t;
})(SimplePlane);
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
var extendStatics = function(n, t) {
  return extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, r) {
    e.__proto__ = r;
  } || function(e, r) {
    for (var a in r)
      r.hasOwnProperty(a) && (e[a] = r[a]);
  }, extendStatics(n, t);
};
function __extends(n, t) {
  extendStatics(n, t);
  function e() {
    this.constructor = n;
  }
  n.prototype = t === null ? Object.create(t) : (e.prototype = t.prototype, new e());
}
var AnimatedSprite = (
  /** @class */
  function(n) {
    __extends(t, n);
    function t(e, r) {
      r === void 0 && (r = !0);
      var a = n.call(this, e[0] instanceof Texture ? e[0] : e[0].texture) || this;
      return a._textures = null, a._durations = null, a._autoUpdate = r, a._isConnectedToTicker = !1, a.animationSpeed = 1, a.loop = !0, a.updateAnchor = !1, a.onComplete = null, a.onFrameChange = null, a.onLoop = null, a._currentTime = 0, a._playing = !1, a._previousFrame = null, a.textures = e, a;
    }
    return t.prototype.stop = function() {
      this._playing && (this._playing = !1, this._autoUpdate && this._isConnectedToTicker && (Ticker.shared.remove(this.update, this), this._isConnectedToTicker = !1));
    }, t.prototype.play = function() {
      this._playing || (this._playing = !0, this._autoUpdate && !this._isConnectedToTicker && (Ticker.shared.add(this.update, this, UPDATE_PRIORITY.HIGH), this._isConnectedToTicker = !0));
    }, t.prototype.gotoAndStop = function(e) {
      this.stop();
      var r = this.currentFrame;
      this._currentTime = e, r !== this.currentFrame && this.updateTexture();
    }, t.prototype.gotoAndPlay = function(e) {
      var r = this.currentFrame;
      this._currentTime = e, r !== this.currentFrame && this.updateTexture(), this.play();
    }, t.prototype.update = function(e) {
      if (this._playing) {
        var r = this.animationSpeed * e, a = this.currentFrame;
        if (this._durations !== null) {
          var s = this._currentTime % 1 * this._durations[this.currentFrame];
          for (s += r / 60 * 1e3; s < 0; )
            this._currentTime--, s += this._durations[this.currentFrame];
          var o = Math.sign(this.animationSpeed * e);
          for (this._currentTime = Math.floor(this._currentTime); s >= this._durations[this.currentFrame]; )
            s -= this._durations[this.currentFrame] * o, this._currentTime += o;
          this._currentTime += s / this._durations[this.currentFrame];
        } else
          this._currentTime += r;
        this._currentTime < 0 && !this.loop ? (this.gotoAndStop(0), this.onComplete && this.onComplete()) : this._currentTime >= this._textures.length && !this.loop ? (this.gotoAndStop(this._textures.length - 1), this.onComplete && this.onComplete()) : a !== this.currentFrame && (this.loop && this.onLoop && (this.animationSpeed > 0 && this.currentFrame < a ? this.onLoop() : this.animationSpeed < 0 && this.currentFrame > a && this.onLoop()), this.updateTexture());
      }
    }, t.prototype.updateTexture = function() {
      var e = this.currentFrame;
      this._previousFrame !== e && (this._previousFrame = e, this._texture = this._textures[e], this._textureID = -1, this._textureTrimmedID = -1, this._cachedTint = 16777215, this.uvs = this._texture._uvs.uvsFloat32, this.updateAnchor && this._anchor.copyFrom(this._texture.defaultAnchor), this.onFrameChange && this.onFrameChange(this.currentFrame));
    }, t.prototype.destroy = function(e) {
      this.stop(), n.prototype.destroy.call(this, e), this.onComplete = null, this.onFrameChange = null, this.onLoop = null;
    }, t.fromFrames = function(e) {
      for (var r = [], a = 0; a < e.length; ++a)
        r.push(Texture.from(e[a]));
      return new t(r);
    }, t.fromImages = function(e) {
      for (var r = [], a = 0; a < e.length; ++a)
        r.push(Texture.from(e[a]));
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
        if (e[0] instanceof Texture)
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
        e !== this._autoUpdate && (this._autoUpdate = e, !this._autoUpdate && this._isConnectedToTicker ? (Ticker.shared.remove(this.update, this), this._isConnectedToTicker = !1) : this._autoUpdate && !this._isConnectedToTicker && this._playing && (Ticker.shared.add(this.update, this), this._isConnectedToTicker = !0));
      },
      enumerable: !1,
      configurable: !0
    }), t;
  }(Sprite)
);
/*!
 * pixi.js - v6.5.10
 * Compiled Thu, 06 Jul 2023 15:25:11 UTC
 *
 * pixi.js is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
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
  addC(t, e, r, a = {}) {
    t.on(e, r, a), this.#t.push(() => t.off(e, r, a));
  }
  add(t, e, r, a = {}) {
    if (t instanceof i) {
      t.on(e, r, a), this.#t.push(() => t.off(e, r, a));
      return;
    }
    t.addEventListener(e, r, a), this.#t.push(() => t.removeEventListener(e, r, { capture: a.capture ?? !1 }));
  }
  clear() {
    for (const t of this.#t) t();
    this.#t = [];
  }
  get isEmpty() {
    return this.#t.length === 0;
  }
}
var SEARCH_PATH_ARG_EXT = /* @__PURE__ */ ((n) => (n.DEFAULT = "", n.SP_GSM = "png|jpg|jpeg|json|svg|webp|mp4|webm", n.SCRIPT = "sn|ssn", n.FONT = "woff2|woff|otf|ttf", n.SOUND = "mp3|m4a|ogg|aac|flac|wav", n.HTML = "htm|html", n.CSS = "css", n.SN = "sn", n.TST_PNGPNG_ = "png|png_", n.TST_HH = "hh", n.TST_EEE = "eee", n.TST_GGG = "ggg", n.TST_PNGXML = "png|xml", n))(SEARCH_PATH_ARG_EXT || {});
const DEF_CFG = {
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
class ConfigBase {
  constructor(t) {
    this.sys = t;
  }
  oCfg = DEF_CFG;
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
        for (const [a, s] of Object.entries(r)) {
          if (!a.startsWith(":") || !a.endsWith(":id")) continue;
          const o = s.slice(s.lastIndexOf("/") + 1), u = r[a.slice(0, -10)] ?? "", l = await (await this.sys.fetch(u)).text(), c = this.sys.hash(l);
          if (o !== c) throw `ファイル改竄エラーです fn:${u}`;
        }
    else
      for (const [e, r] of Object.entries(this.hPathFn2Exts))
        for (const a of Object.keys(r))
          a.startsWith(":");
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
    let a = r ? r[1] : t;
    const s = r ? r[2] : "";
    if (this.userFnTail) {
      const h = a + "@@" + this.userFnTail;
      if (h in this.hPathFn2Exts) {
        if (e === "") a = h;
        else for (const l of Object.keys(this.hPathFn2Exts[h] ?? {}))
          if (`|${e}|`.includes(`|${l}|`)) {
            a = h;
            break;
          }
      }
    }
    const o = this.hPathFn2Exts[a];
    if (!o) throw `サーチパスに存在しないファイル【${t}】です`;
    if (!s) {
      const h = int(o[":cnt"]);
      if (e === "") {
        if (h > 1) throw `指定ファイル【${t}】が複数マッチします。サーチ対象拡張子群【${e}】で絞り込むか、ファイル名を個別にして下さい。`;
        return t;
      }
      const l = `|${e}|`;
      if (h > 1) {
        let c = 0;
        for (const v of Object.keys(o))
          if (l.includes(`|${v}|`) && ++c > 1)
            throw `指定ファイル【${t}】が複数マッチします。サーチ対象拡張子群【${e}】で絞り込むか、ファイル名を個別にして下さい。`;
      }
      for (const c of Object.keys(o))
        if (l.includes(`|${c}|`)) return o[c];
      throw `サーチ対象拡張子群【${e}】にマッチするファイルがサーチパスに存在しません。探索ファイル名=【${t}】`;
    }
    if (e !== "" && !`|${e}|`.includes(`|${s}|`))
      throw `指定ファイルの拡張子【${s}】は、サーチ対象拡張子群【${e}】にマッチしません。探索ファイル名=【${t}】`;
    const u = o[s];
    if (!u) throw `サーチパスに存在しない拡張子【${s}】です。探索ファイル名=【${t}】、サーチ対象拡張子群【${e}】`;
    return u;
  }
  matchPath(t, e = "") {
    const r = [], a = new RegExp(t), s = new RegExp(e);
    for (const [o, u] of Object.entries(this.hPathFn2Exts)) {
      if (o.search(a) === -1) continue;
      if (e === "") {
        r.push(u);
        continue;
      }
      const h = {};
      let l = !1;
      for (const c of Object.keys(u))
        c.search(s) !== -1 && (h[c] = o, l = !0);
      l && r.push(h);
    }
    return r;
  }
  addPath(t, e) {
    const r = {};
    for (const [a, s] of Object.entries(e))
      r[a] = (a.startsWith(":") ? "" : this.sys.arg.cur) + s;
    this.hPathFn2Exts[t] = r;
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
const ERROR_PACKET = { type: "error", data: "parser error" }, withNativeBlob$1 = typeof Blob == "function" || typeof Blob < "u" && Object.prototype.toString.call(Blob) === "[object BlobConstructor]", withNativeArrayBuffer$2 = typeof ArrayBuffer == "function", isView$1 = (n) => typeof ArrayBuffer.isView == "function" ? ArrayBuffer.isView(n) : n && n.buffer instanceof ArrayBuffer, encodePacket = ({ type: n, data: t }, e, r) => withNativeBlob$1 && t instanceof Blob ? e ? r(t) : encodeBlobAsBase64(t, r) : withNativeArrayBuffer$2 && (t instanceof ArrayBuffer || isView$1(t)) ? e ? r(t) : encodeBlobAsBase64(new Blob([t]), r) : r(PACKET_TYPES[n] + (t || "")), encodeBlobAsBase64 = (n, t) => {
  const e = new FileReader();
  return e.onload = function() {
    const r = e.result.split(",")[1];
    t("b" + (r || ""));
  }, e.readAsDataURL(n);
};
function toArray(n) {
  return n instanceof Uint8Array ? n : n instanceof ArrayBuffer ? new Uint8Array(n) : new Uint8Array(n.buffer, n.byteOffset, n.byteLength);
}
let TEXT_ENCODER;
function encodePacketToBinary(n, t) {
  if (withNativeBlob$1 && n.data instanceof Blob)
    return n.data.arrayBuffer().then(toArray).then(t);
  if (withNativeArrayBuffer$2 && (n.data instanceof ArrayBuffer || isView$1(n.data)))
    return t(toArray(n.data));
  encodePacket(n, !1, (e) => {
    TEXT_ENCODER || (TEXT_ENCODER = new TextEncoder()), t(TEXT_ENCODER.encode(e));
  });
}
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", lookup$1 = typeof Uint8Array > "u" ? [] : new Uint8Array(256);
for (let n = 0; n < chars.length; n++)
  lookup$1[chars.charCodeAt(n)] = n;
const decode$1 = (n) => {
  let t = n.length * 0.75, e = n.length, r, a = 0, s, o, u, h;
  n[n.length - 1] === "=" && (t--, n[n.length - 2] === "=" && t--);
  const l = new ArrayBuffer(t), c = new Uint8Array(l);
  for (r = 0; r < e; r += 4)
    s = lookup$1[n.charCodeAt(r)], o = lookup$1[n.charCodeAt(r + 1)], u = lookup$1[n.charCodeAt(r + 2)], h = lookup$1[n.charCodeAt(r + 3)], c[a++] = s << 2 | o >> 4, c[a++] = (o & 15) << 4 | u >> 2, c[a++] = (u & 3) << 6 | h & 63;
  return l;
}, withNativeArrayBuffer$1 = typeof ArrayBuffer == "function", decodePacket = (n, t) => {
  if (typeof n != "string")
    return {
      type: "message",
      data: mapBinary(n, t)
    };
  const e = n.charAt(0);
  return e === "b" ? {
    type: "message",
    data: decodeBase64Packet(n.substring(1), t)
  } : PACKET_TYPES_REVERSE[e] ? n.length > 1 ? {
    type: PACKET_TYPES_REVERSE[e],
    data: n.substring(1)
  } : {
    type: PACKET_TYPES_REVERSE[e]
  } : ERROR_PACKET;
}, decodeBase64Packet = (n, t) => {
  if (withNativeArrayBuffer$1) {
    const e = decode$1(n);
    return mapBinary(e, t);
  } else
    return { base64: !0, data: n };
}, mapBinary = (n, t) => {
  switch (t) {
    case "blob":
      return n instanceof Blob ? n : new Blob([n]);
    case "arraybuffer":
    default:
      return n instanceof ArrayBuffer ? n : n.buffer;
  }
}, SEPARATOR = "", encodePayload = (n, t) => {
  const e = n.length, r = new Array(e);
  let a = 0;
  n.forEach((s, o) => {
    encodePacket(s, !1, (u) => {
      r[o] = u, ++a === e && t(r.join(SEPARATOR));
    });
  });
}, decodePayload = (n, t) => {
  const e = n.split(SEPARATOR), r = [];
  for (let a = 0; a < e.length; a++) {
    const s = decodePacket(e[a], t);
    if (r.push(s), s.type === "error")
      break;
  }
  return r;
};
function createPacketEncoderStream() {
  return new TransformStream({
    transform(n, t) {
      encodePacketToBinary(n, (e) => {
        const r = e.length;
        let a;
        if (r < 126)
          a = new Uint8Array(1), new DataView(a.buffer).setUint8(0, r);
        else if (r < 65536) {
          a = new Uint8Array(3);
          const s = new DataView(a.buffer);
          s.setUint8(0, 126), s.setUint16(1, r);
        } else {
          a = new Uint8Array(9);
          const s = new DataView(a.buffer);
          s.setUint8(0, 127), s.setBigUint64(1, BigInt(r));
        }
        n.data && typeof n.data != "string" && (a[0] |= 128), t.enqueue(a), t.enqueue(e);
      });
    }
  });
}
let TEXT_DECODER;
function totalLength(n) {
  return n.reduce((t, e) => t + e.length, 0);
}
function concatChunks(n, t) {
  if (n[0].length === t)
    return n.shift();
  const e = new Uint8Array(t);
  let r = 0;
  for (let a = 0; a < t; a++)
    e[a] = n[0][r++], r === n[0].length && (n.shift(), r = 0);
  return n.length && r < n[0].length && (n[0] = n[0].slice(r)), e;
}
function createPacketDecoderStream(n, t) {
  TEXT_DECODER || (TEXT_DECODER = new TextDecoder());
  const e = [];
  let r = 0, a = -1, s = !1;
  return new TransformStream({
    transform(o, u) {
      for (e.push(o); ; ) {
        if (r === 0) {
          if (totalLength(e) < 1)
            break;
          const h = concatChunks(e, 1);
          s = (h[0] & 128) === 128, a = h[0] & 127, a < 126 ? r = 3 : a === 126 ? r = 1 : r = 2;
        } else if (r === 1) {
          if (totalLength(e) < 2)
            break;
          const h = concatChunks(e, 2);
          a = new DataView(h.buffer, h.byteOffset, h.length).getUint16(0), r = 3;
        } else if (r === 2) {
          if (totalLength(e) < 8)
            break;
          const h = concatChunks(e, 8), l = new DataView(h.buffer, h.byteOffset, h.length), c = l.getUint32(0);
          if (c > Math.pow(2, 21) - 1) {
            u.enqueue(ERROR_PACKET);
            break;
          }
          a = c * Math.pow(2, 32) + l.getUint32(4), r = 3;
        } else {
          if (totalLength(e) < a)
            break;
          const h = concatChunks(e, a);
          u.enqueue(decodePacket(s ? h : TEXT_DECODER.decode(h), t)), r = 0;
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
  for (var t in Emitter.prototype)
    n[t] = Emitter.prototype[t];
  return n;
}
Emitter.prototype.on = Emitter.prototype.addEventListener = function(n, t) {
  return this._callbacks = this._callbacks || {}, (this._callbacks["$" + n] = this._callbacks["$" + n] || []).push(t), this;
};
Emitter.prototype.once = function(n, t) {
  function e() {
    this.off(n, e), t.apply(this, arguments);
  }
  return e.fn = t, this.on(n, e), this;
};
Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function(n, t) {
  if (this._callbacks = this._callbacks || {}, arguments.length == 0)
    return this._callbacks = {}, this;
  var e = this._callbacks["$" + n];
  if (!e) return this;
  if (arguments.length == 1)
    return delete this._callbacks["$" + n], this;
  for (var r, a = 0; a < e.length; a++)
    if (r = e[a], r === t || r.fn === t) {
      e.splice(a, 1);
      break;
    }
  return e.length === 0 && delete this._callbacks["$" + n], this;
};
Emitter.prototype.emit = function(n) {
  this._callbacks = this._callbacks || {};
  for (var t = new Array(arguments.length - 1), e = this._callbacks["$" + n], r = 1; r < arguments.length; r++)
    t[r - 1] = arguments[r];
  if (e) {
    e = e.slice(0);
    for (var r = 0, a = e.length; r < a; ++r)
      e[r].apply(this, t);
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
const nextTick = typeof Promise == "function" && typeof Promise.resolve == "function" ? (t) => Promise.resolve().then(t) : (t, e) => e(t, 0), globalThisShim = typeof self < "u" ? self : typeof window < "u" ? window : Function("return this")(), defaultBinaryType = "arraybuffer";
function createCookieJar() {
}
function pick(n, ...t) {
  return t.reduce((e, r) => (n.hasOwnProperty(r) && (e[r] = n[r]), e), {});
}
const NATIVE_SET_TIMEOUT = globalThisShim.setTimeout, NATIVE_CLEAR_TIMEOUT = globalThisShim.clearTimeout;
function installTimerFunctions(n, t) {
  t.useNativeTimers ? (n.setTimeoutFn = NATIVE_SET_TIMEOUT.bind(globalThisShim), n.clearTimeoutFn = NATIVE_CLEAR_TIMEOUT.bind(globalThisShim)) : (n.setTimeoutFn = globalThisShim.setTimeout.bind(globalThisShim), n.clearTimeoutFn = globalThisShim.clearTimeout.bind(globalThisShim));
}
const BASE64_OVERHEAD = 1.33;
function byteLength(n) {
  return typeof n == "string" ? utf8Length(n) : Math.ceil((n.byteLength || n.size) * BASE64_OVERHEAD);
}
function utf8Length(n) {
  let t = 0, e = 0;
  for (let r = 0, a = n.length; r < a; r++)
    t = n.charCodeAt(r), t < 128 ? e += 1 : t < 2048 ? e += 2 : t < 55296 || t >= 57344 ? e += 3 : (r++, e += 4);
  return e;
}
function randomString() {
  return Date.now().toString(36).substring(3) + Math.random().toString(36).substring(2, 5);
}
function encode(n) {
  let t = "";
  for (let e in n)
    n.hasOwnProperty(e) && (t.length && (t += "&"), t += encodeURIComponent(e) + "=" + encodeURIComponent(n[e]));
  return t;
}
function decode(n) {
  let t = {}, e = n.split("&");
  for (let r = 0, a = e.length; r < a; r++) {
    let s = e[r].split("=");
    t[decodeURIComponent(s[0])] = decodeURIComponent(s[1]);
  }
  return t;
}
class TransportError extends Error {
  constructor(t, e, r) {
    super(t), this.description = e, this.context = r, this.type = "TransportError";
  }
}
class Transport extends Emitter {
  /**
   * Transport abstract constructor.
   *
   * @param {Object} opts - options
   * @protected
   */
  constructor(t) {
    super(), this.writable = !1, installTimerFunctions(this, t), this.opts = t, this.query = t.query, this.socket = t.socket, this.supportsBinary = !t.forceBase64;
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
    return super.emitReserved("error", new TransportError(t, e, r)), this;
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
    const e = decodePacket(t, this.socket.binaryType);
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
    const e = encode(t);
    return e.length ? "?" + e : "";
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
    decodePayload(t, this.socket.binaryType).forEach(e), this.readyState !== "closed" && (this._polling = !1, this.emitReserved("pollComplete"), this.readyState === "open" && this._poll());
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
    this.writable = !1, encodePayload(t, (e) => {
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
    return this.opts.timestampRequests !== !1 && (e[this.opts.timestampParam] = randomString()), !this.supportsBinary && !e.sid && (e.b64 = 1), this.createUri(t, e);
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
    r.on("success", e), r.on("error", (a, s) => {
      this.onError("xhr post error", a, s);
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
class Request extends Emitter {
  /**
   * Request constructor
   *
   * @param {Object} options
   * @package
   */
  constructor(t, e, r) {
    super(), this.createRequest = t, installTimerFunctions(this, r), this._opts = r, this._method = r.method || "GET", this._uri = e, this._data = r.data !== void 0 ? r.data : null, this._create();
  }
  /**
   * Creates the XHR object and sends the request.
   *
   * @private
   */
  _create() {
    var t;
    const e = pick(this._opts, "agent", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
    e.xdomain = !!this._opts.xd;
    const r = this._xhr = this.createRequest(e);
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
      (t = this._opts.cookieJar) === null || t === void 0 || t.addCookies(r), "withCredentials" in r && (r.withCredentials = this._opts.withCredentials), this._opts.requestTimeout && (r.timeout = this._opts.requestTimeout), r.onreadystatechange = () => {
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
      if (this._xhr.onreadystatechange = empty, t)
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
  constructor(t) {
    super(t);
    const e = t && t.forceBase64;
    this.supportsBinary = hasXHR2 && !e;
  }
  request(t = {}) {
    return Object.assign(t, { xd: this.xd }, this.opts), new Request(newRequest, this.uri(), t);
  }
}
function newRequest(n) {
  const t = n.xdomain;
  try {
    if (typeof XMLHttpRequest < "u" && (!t || hasCORS))
      return new XMLHttpRequest();
  } catch {
  }
  if (!t)
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
    const t = this.uri(), e = this.opts.protocols, r = isReactNative ? {} : pick(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");
    this.opts.extraHeaders && (r.headers = this.opts.extraHeaders);
    try {
      this.ws = this.createSocket(t, e, r);
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
    }, this.ws.onclose = (t) => this.onClose({
      description: "websocket connection closed",
      context: t
    }), this.ws.onmessage = (t) => this.onData(t.data), this.ws.onerror = (t) => this.onError("websocket error", t);
  }
  write(t) {
    this.writable = !1;
    for (let e = 0; e < t.length; e++) {
      const r = t[e], a = e === t.length - 1;
      encodePacket(r, this.supportsBinary, (s) => {
        try {
          this.doWrite(r, s);
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
    const t = this.opts.secure ? "wss" : "ws", e = this.query || {};
    return this.opts.timestampRequests && (e[this.opts.timestampParam] = randomString()), this.supportsBinary || (e.b64 = 1), this.createUri(t, e);
  }
}
const WebSocketCtor = globalThisShim.WebSocket || globalThisShim.MozWebSocket;
class WS extends BaseWS {
  createSocket(t, e, r) {
    return isReactNative ? new WebSocketCtor(t, e, r) : e ? new WebSocketCtor(t, e) : new WebSocketCtor(t);
  }
  doWrite(t, e) {
    this.ws.send(e);
  }
}
class WT extends Transport {
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
        const e = createPacketDecoderStream(Number.MAX_SAFE_INTEGER, this.socket.binaryType), r = t.readable.pipeThrough(e).getReader(), a = createPacketEncoderStream();
        a.readable.pipeTo(t.writable), this._writer = a.writable.getWriter();
        const s = () => {
          r.read().then(({ done: u, value: h }) => {
            u || (this.onPacket(h), s());
          }).catch((u) => {
          });
        };
        s();
        const o = { type: "open" };
        this.query.sid && (o.data = `{"sid":"${this.query.sid}"}`), this._writer.write(o).then(() => this.onOpen());
      });
    });
  }
  write(t) {
    this.writable = !1;
    for (let e = 0; e < t.length; e++) {
      const r = t[e], a = e === t.length - 1;
      this._writer.write(r).then(() => {
        a && nextTick(() => {
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
  const t = n, e = n.indexOf("["), r = n.indexOf("]");
  e != -1 && r != -1 && (n = n.substring(0, e) + n.substring(e, r).replace(/:/g, ";") + n.substring(r, n.length));
  let a = re.exec(n || ""), s = {}, o = 14;
  for (; o--; )
    s[parts[o]] = a[o] || "";
  return e != -1 && r != -1 && (s.source = t, s.host = s.host.substring(1, s.host.length - 1).replace(/;/g, ":"), s.authority = s.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), s.ipv6uri = !0), s.pathNames = pathNames(s, s.path), s.queryKey = queryKey(s, s.query), s;
}
function pathNames(n, t) {
  const e = /\/{2,9}/g, r = t.replace(e, "/").split("/");
  return (t.slice(0, 1) == "/" || t.length === 0) && r.splice(0, 1), t.slice(-1) == "/" && r.splice(r.length - 1, 1), r;
}
function queryKey(n, t) {
  const e = {};
  return t.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function(r, a, s) {
    a && (e[a] = s);
  }), e;
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
  constructor(t, e) {
    if (super(), this.binaryType = defaultBinaryType, this.writeBuffer = [], this._prevBufferLen = 0, this._pingInterval = -1, this._pingTimeout = -1, this._maxPayload = -1, this._pingTimeoutTime = 1 / 0, t && typeof t == "object" && (e = t, t = null), t) {
      const r = parse(t);
      e.hostname = r.host, e.secure = r.protocol === "https" || r.protocol === "wss", e.port = r.port, r.query && (e.query = r.query);
    } else e.host && (e.hostname = parse(e.host).host);
    installTimerFunctions(this, e), this.secure = e.secure != null ? e.secure : typeof location < "u" && location.protocol === "https:", e.hostname && !e.port && (e.port = this.secure ? "443" : "80"), this.hostname = e.hostname || (typeof location < "u" ? location.hostname : "localhost"), this.port = e.port || (typeof location < "u" && location.port ? location.port : this.secure ? "443" : "80"), this.transports = [], this._transportsByName = {}, e.transports.forEach((r) => {
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
    }, e), this.opts.path = this.opts.path.replace(/\/$/, "") + (this.opts.addTrailingSlash ? "/" : ""), typeof this.opts.query == "string" && (this.opts.query = decode(this.opts.query)), withEventListeners && (this.opts.closeOnBeforeunload && (this._beforeunloadEventListener = () => {
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
  createTransport(t) {
    const e = Object.assign({}, this.opts.query);
    e.EIO = protocol$1, e.transport = t, this.id && (e.sid = this.id);
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
    const t = this.opts.rememberUpgrade && SocketWithoutUpgrade.priorWebsocketSuccess && this.transports.indexOf("websocket") !== -1 ? "websocket" : this.transports[0];
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
    this.readyState = "open", SocketWithoutUpgrade.priorWebsocketSuccess = this.transport.name === "websocket", this.emitReserved("open"), this.flush();
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
      const a = this.writeBuffer[r].data;
      if (a && (e += byteLength(a)), r > 0 && e > this._maxPayload)
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
    return t && (this._pingTimeoutTime = 0, nextTick(() => {
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
  _sendPacket(t, e, r, a) {
    if (typeof e == "function" && (a = e, e = void 0), typeof r == "function" && (a = r, r = null), this.readyState === "closing" || this.readyState === "closed")
      return;
    r = r || {}, r.compress = r.compress !== !1;
    const s = {
      type: t,
      data: e,
      options: r
    };
    this.emitReserved("packetCreate", s), this.writeBuffer.push(s), a && this.once("flush", a), this.flush();
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
    if (SocketWithoutUpgrade.priorWebsocketSuccess = !1, this.opts.tryAllTransports && this.transports.length > 1 && this.readyState === "opening")
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
      if (this.clearTimeoutFn(this._pingTimeoutTimer), this.transport.removeAllListeners("close"), this.transport.close(), this.transport.removeAllListeners(), withEventListeners && (this._beforeunloadEventListener && removeEventListener("beforeunload", this._beforeunloadEventListener, !1), this._offlineEventListener)) {
        const r = OFFLINE_EVENT_LISTENERS.indexOf(this._offlineEventListener);
        r !== -1 && OFFLINE_EVENT_LISTENERS.splice(r, 1);
      }
      this.readyState = "closed", this.id = null, this.emitReserved("close", t, e), this.writeBuffer = [], this._prevBufferLen = 0;
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
    SocketWithoutUpgrade.priorWebsocketSuccess = !1;
    const a = () => {
      r || (e.send([{ type: "ping", data: "probe" }]), e.once("packet", (v) => {
        if (!r)
          if (v.type === "pong" && v.data === "probe") {
            if (this.upgrading = !0, this.emitReserved("upgrading", e), !e)
              return;
            SocketWithoutUpgrade.priorWebsocketSuccess = e.name === "websocket", this.transport.pause(() => {
              r || this.readyState !== "closed" && (c(), this.setTransport(e), e.send([{ type: "upgrade" }]), this.emitReserved("upgrade", e), e = null, this.upgrading = !1, this.flush());
            });
          } else {
            const d = new Error("probe error");
            d.transport = e.name, this.emitReserved("upgradeError", d);
          }
      }));
    };
    function s() {
      r || (r = !0, c(), e.close(), e = null);
    }
    const o = (v) => {
      const d = new Error("probe error: " + v);
      d.transport = e.name, s(), this.emitReserved("upgradeError", d);
    };
    function u() {
      o("transport closed");
    }
    function h() {
      o("socket closed");
    }
    function l(v) {
      e && v.name !== e.name && s();
    }
    const c = () => {
      e.removeListener("open", a), e.removeListener("error", o), e.removeListener("close", u), this.off("close", h), this.off("upgrading", l);
    };
    e.once("open", a), e.once("error", o), e.once("close", u), this.once("close", h), this.once("upgrading", l), this._upgrades.indexOf("webtransport") !== -1 && t !== "webtransport" ? this.setTimeoutFn(() => {
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
let Socket$1 = class extends SocketWithUpgrade {
  constructor(t, e = {}) {
    const r = typeof t == "object" ? t : e;
    (!r.transports || r.transports && typeof r.transports[0] == "string") && (r.transports = (r.transports || ["polling", "websocket", "webtransport"]).map((a) => transports[a]).filter((a) => !!a)), super(t, r);
  }
};
function url(n, t = "", e) {
  let r = n;
  e = e || typeof location < "u" && location, n == null && (n = e.protocol + "//" + e.host), typeof n == "string" && (n.charAt(0) === "/" && (n.charAt(1) === "/" ? n = e.protocol + n : n = e.host + n), /^(https?|wss?):\/\//.test(n) || (typeof e < "u" ? n = e.protocol + "//" + n : n = "https://" + n), r = parse(n)), r.port || (/^(http|ws)$/.test(r.protocol) ? r.port = "80" : /^(http|ws)s$/.test(r.protocol) && (r.port = "443")), r.path = r.path || "/";
  const s = r.host.indexOf(":") !== -1 ? "[" + r.host + "]" : r.host;
  return r.id = r.protocol + "://" + s + ":" + r.port + t, r.href = r.protocol + "://" + s + (e && e.port === r.port ? "" : ":" + r.port), r;
}
const withNativeArrayBuffer = typeof ArrayBuffer == "function", isView = (n) => typeof ArrayBuffer.isView == "function" ? ArrayBuffer.isView(n) : n.buffer instanceof ArrayBuffer, toString = Object.prototype.toString, withNativeBlob = typeof Blob == "function" || typeof Blob < "u" && toString.call(Blob) === "[object BlobConstructor]", withNativeFile = typeof File == "function" || typeof File < "u" && toString.call(File) === "[object FileConstructor]";
function isBinary(n) {
  return withNativeArrayBuffer && (n instanceof ArrayBuffer || isView(n)) || withNativeBlob && n instanceof Blob || withNativeFile && n instanceof File;
}
function hasBinary(n, t) {
  if (!n || typeof n != "object")
    return !1;
  if (Array.isArray(n)) {
    for (let e = 0, r = n.length; e < r; e++)
      if (hasBinary(n[e]))
        return !0;
    return !1;
  }
  if (isBinary(n))
    return !0;
  if (n.toJSON && typeof n.toJSON == "function" && arguments.length === 1)
    return hasBinary(n.toJSON(), !0);
  for (const e in n)
    if (Object.prototype.hasOwnProperty.call(n, e) && hasBinary(n[e]))
      return !0;
  return !1;
}
function deconstructPacket(n) {
  const t = [], e = n.data, r = n;
  return r.data = _deconstructPacket(e, t), r.attachments = t.length, { packet: r, buffers: t };
}
function _deconstructPacket(n, t) {
  if (!n)
    return n;
  if (isBinary(n)) {
    const e = { _placeholder: !0, num: t.length };
    return t.push(n), e;
  } else if (Array.isArray(n)) {
    const e = new Array(n.length);
    for (let r = 0; r < n.length; r++)
      e[r] = _deconstructPacket(n[r], t);
    return e;
  } else if (typeof n == "object" && !(n instanceof Date)) {
    const e = {};
    for (const r in n)
      Object.prototype.hasOwnProperty.call(n, r) && (e[r] = _deconstructPacket(n[r], t));
    return e;
  }
  return n;
}
function reconstructPacket(n, t) {
  return n.data = _reconstructPacket(n.data, t), delete n.attachments, n;
}
function _reconstructPacket(n, t) {
  if (!n)
    return n;
  if (n && n._placeholder === !0) {
    if (typeof n.num == "number" && n.num >= 0 && n.num < t.length)
      return t[n.num];
    throw new Error("illegal attachments");
  } else if (Array.isArray(n))
    for (let e = 0; e < n.length; e++)
      n[e] = _reconstructPacket(n[e], t);
  else if (typeof n == "object")
    for (const e in n)
      Object.prototype.hasOwnProperty.call(n, e) && (n[e] = _reconstructPacket(n[e], t));
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
    return (t.type === PacketType.EVENT || t.type === PacketType.ACK) && hasBinary(t) ? this.encodeAsBinary({
      type: t.type === PacketType.EVENT ? PacketType.BINARY_EVENT : PacketType.BINARY_ACK,
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
    return (t.type === PacketType.BINARY_EVENT || t.type === PacketType.BINARY_ACK) && (e += t.attachments + "-"), t.nsp && t.nsp !== "/" && (e += t.nsp + ","), t.id != null && (e += t.id), t.data != null && (e += JSON.stringify(t.data, this.replacer)), e;
  }
  /**
   * Encode packet as 'buffer sequence' by removing blobs, and
   * deconstructing packet into object with placeholders and
   * a list of buffers.
   */
  encodeAsBinary(t) {
    const e = deconstructPacket(t), r = this.encodeAsString(e.packet), a = e.buffers;
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
      const r = e.type === PacketType.BINARY_EVENT;
      r || e.type === PacketType.BINARY_ACK ? (e.type = r ? PacketType.EVENT : PacketType.ACK, this.reconstructor = new BinaryReconstructor(e), e.attachments === 0 && super.emitReserved("decoded", e)) : super.emitReserved("decoded", e);
    } else if (isBinary(t) || t.base64)
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
    if (PacketType[r.type] === void 0)
      throw new Error("unknown packet type " + r.type);
    if (r.type === PacketType.BINARY_EVENT || r.type === PacketType.BINARY_ACK) {
      const s = e + 1;
      for (; t.charAt(++e) !== "-" && e != t.length; )
        ;
      const o = t.substring(s, e);
      if (o != Number(o) || t.charAt(e) !== "-")
        throw new Error("Illegal attachments");
      r.attachments = Number(o);
    }
    if (t.charAt(e + 1) === "/") {
      const s = e + 1;
      for (; ++e && !(t.charAt(e) === "," || e === t.length); )
        ;
      r.nsp = t.substring(s, e);
    } else
      r.nsp = "/";
    const a = t.charAt(e + 1);
    if (a !== "" && Number(a) == a) {
      const s = e + 1;
      for (; ++e; ) {
        const o = t.charAt(e);
        if (o == null || Number(o) != o) {
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
      if (Decoder.isPayloadValid(r.type, s))
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
      case PacketType.CONNECT:
        return isObject(e);
      case PacketType.DISCONNECT:
        return e === void 0;
      case PacketType.CONNECT_ERROR:
        return typeof e == "string" || isObject(e);
      case PacketType.EVENT:
      case PacketType.BINARY_EVENT:
        return Array.isArray(e) && (typeof e[0] == "number" || typeof e[0] == "string" && RESERVED_EVENTS$1.indexOf(e[0]) === -1);
      case PacketType.ACK:
      case PacketType.BINARY_ACK:
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
class BinaryReconstructor {
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
      const e = reconstructPacket(this.reconPack, this.buffers);
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
const parser = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Decoder,
  Encoder,
  get PacketType() {
    return PacketType;
  },
  protocol
}, Symbol.toStringTag, { value: "Module" }));
function on(n, t, e) {
  return n.on(t, e), function() {
    n.off(t, e);
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
      on(t, "open", this.onopen.bind(this)),
      on(t, "packet", this.onpacket.bind(this)),
      on(t, "error", this.onerror.bind(this)),
      on(t, "close", this.onclose.bind(this))
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
    var r, a, s;
    if (RESERVED_EVENTS.hasOwnProperty(t))
      throw new Error('"' + t.toString() + '" is a reserved event name');
    if (e.unshift(t), this._opts.retries && !this.flags.fromQueue && !this.flags.volatile)
      return this._addToQueue(e), this;
    const o = {
      type: PacketType.EVENT,
      data: e
    };
    if (o.options = {}, o.options.compress = this.flags.compress !== !1, typeof e[e.length - 1] == "function") {
      const c = this.ids++, v = e.pop();
      this._registerAckCallback(c, v), o.id = c;
    }
    const u = (a = (r = this.io.engine) === null || r === void 0 ? void 0 : r.transport) === null || a === void 0 ? void 0 : a.writable, h = this.connected && !(!((s = this.io.engine) === null || s === void 0) && s._hasPingExpired());
    return this.flags.volatile && !u || (h ? (this.notifyOutgoingListeners(o), this.packet(o)) : this.sendBuffer.push(o)), this.flags = {}, this;
  }
  /**
   * @private
   */
  _registerAckCallback(t, e) {
    var r;
    const a = (r = this.flags.timeout) !== null && r !== void 0 ? r : this._opts.ackTimeout;
    if (a === void 0) {
      this.acks[t] = e;
      return;
    }
    const s = this.io.setTimeoutFn(() => {
      delete this.acks[t];
      for (let u = 0; u < this.sendBuffer.length; u++)
        this.sendBuffer[u].id === t && this.sendBuffer.splice(u, 1);
      e.call(this, new Error("operation has timed out"));
    }, a), o = (...u) => {
      this.io.clearTimeoutFn(s), e.apply(this, u);
    };
    o.withError = !0, this.acks[t] = o;
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
    return new Promise((r, a) => {
      const s = (o, u) => o ? a(o) : r(u);
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
    t.push((a, ...s) => r !== this._queue[0] ? void 0 : (a !== null ? r.tryCount > this._opts.retries && (this._queue.shift(), e && e(a)) : (this._queue.shift(), e && e(null, ...s)), r.pending = !1, this._drainQueue())), this._queue.push(r), this._drainQueue();
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
      type: PacketType.CONNECT,
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
        case PacketType.CONNECT:
          t.data && t.data.sid ? this.onconnect(t.data.sid, t.data.pid) : this.emitReserved("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
          break;
        case PacketType.EVENT:
        case PacketType.BINARY_EVENT:
          this.onevent(t);
          break;
        case PacketType.ACK:
        case PacketType.BINARY_ACK:
          this.onack(t);
          break;
        case PacketType.DISCONNECT:
          this.ondisconnect();
          break;
        case PacketType.CONNECT_ERROR:
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
    return function(...a) {
      r || (r = !0, e.packet({
        type: PacketType.ACK,
        id: t,
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
function Backoff(n) {
  n = n || {}, this.ms = n.min || 100, this.max = n.max || 1e4, this.factor = n.factor || 2, this.jitter = n.jitter > 0 && n.jitter <= 1 ? n.jitter : 0, this.attempts = 0;
}
Backoff.prototype.duration = function() {
  var n = this.ms * Math.pow(this.factor, this.attempts++);
  if (this.jitter) {
    var t = Math.random(), e = Math.floor(t * this.jitter * n);
    n = (Math.floor(t * 10) & 1) == 0 ? n - e : n + e;
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
  constructor(t, e) {
    var r;
    super(), this.nsps = {}, this.subs = [], t && typeof t == "object" && (e = t, t = void 0), e = e || {}, e.path = e.path || "/socket.io", this.opts = e, installTimerFunctions(this, e), this.reconnection(e.reconnection !== !1), this.reconnectionAttempts(e.reconnectionAttempts || 1 / 0), this.reconnectionDelay(e.reconnectionDelay || 1e3), this.reconnectionDelayMax(e.reconnectionDelayMax || 5e3), this.randomizationFactor((r = e.randomizationFactor) !== null && r !== void 0 ? r : 0.5), this.backoff = new Backoff({
      min: this.reconnectionDelay(),
      max: this.reconnectionDelayMax(),
      jitter: this.randomizationFactor()
    }), this.timeout(e.timeout == null ? 2e4 : e.timeout), this._readyState = "closed", this.uri = t;
    const a = e.parser || parser;
    this.encoder = new a.Encoder(), this.decoder = new a.Decoder(), this._autoConnect = e.autoConnect !== !1, this._autoConnect && this.open();
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
    this.engine = new Socket$1(this.uri, this.opts);
    const e = this.engine, r = this;
    this._readyState = "opening", this.skipReconnect = !1;
    const a = on(e, "open", function() {
      r.onopen(), t && t();
    }), s = (u) => {
      this.cleanup(), this._readyState = "closed", this.emitReserved("error", u), t ? t(u) : this.maybeReconnectOnOpen();
    }, o = on(e, "error", s);
    if (this._timeout !== !1) {
      const u = this._timeout, h = this.setTimeoutFn(() => {
        a(), s(new Error("timeout")), e.close();
      }, u);
      this.opts.autoUnref && h.unref(), this.subs.push(() => {
        this.clearTimeoutFn(h);
      });
    }
    return this.subs.push(a), this.subs.push(o), this;
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
      on(t, "ping", this.onping.bind(this)),
      on(t, "data", this.ondata.bind(this)),
      on(t, "error", this.onerror.bind(this)),
      on(t, "close", this.onclose.bind(this)),
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
    nextTick(() => {
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
    return r ? this._autoConnect && !r.active && r.connect() : (r = new Socket(this, t, e), this.nsps[t] = r), r;
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
        t.skipReconnect || (this.emitReserved("reconnect_attempt", t.backoff.attempts), !t.skipReconnect && t.open((a) => {
          a ? (t._reconnecting = !1, t.reconnect(), this.emitReserved("reconnect_error", a)) : t.onreconnect();
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
const cache = {};
function lookup(n, t) {
  typeof n == "object" && (t = n, n = void 0), t = t || {};
  const e = url(n, t.path || "/socket.io"), r = e.source, a = e.id, s = e.path, o = cache[a] && s in cache[a].nsps, u = t.forceNew || t["force new connection"] || t.multiplex === !1 || o;
  let h;
  return u ? h = new Manager(r, t) : (cache[a] || (cache[a] = new Manager(r, t)), h = cache[a]), e.query && !t.query && (t.query = e.queryKey), h.socket(e.path, t);
}
Object.assign(lookup, {
  Manager,
  Socket,
  io: lookup,
  connect: lookup
});
class SysBase {
  constructor(t = {}, e) {
    this.hPlg = t, this.arg = e;
  }
  hFactoryCls = {};
  elc = new EventListenerCtn();
  async loaded(...[t]) {
    const e = t.snsys_pre;
    return delete t.snsys_pre, await e?.init({
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
  init(t, e, r, a) {
    this.val = r, this.main = a;
    let s = "";
    try {
      r.setSys(this), s = "sys", s += Number(r.getVal("sys:TextLayer.Back.Alpha", 1)), s = "kidoku", r.saveKidoku();
    } catch (o) {
      console.error(`セーブデータ（${s}）が壊れています。一度クリアする必要があります(b) %o`, o);
    }
    return t.close = (o) => this.close(o), t.export = (o) => this._export(o), t.import = (o) => this._import(o), t.navigate_to = (o) => this.navigate_to(o), t.title = (o) => this.title(o), t.toggle_full_screen = (o) => this.#g(o), t.update_check = (o) => this.update_check(o), t.window = (o) => this.window(o), r.setVal_Nochk("tmp", "const.sn.isApp", () => this.isApp), r.setVal_Nochk("tmp", "const.sn.isDbg", () => CmnLib.isDbg), r.setVal_Nochk("tmp", "const.sn.isPackaged", () => CmnLib.isPackaged), r.defTmp("const.sn.displayState", () => this.isFullScr), r.setVal_Nochk("sys", SysBase.VALNM_CFG_NS, this.cfg.oCfg.save_ns), r.flush(), CmnLib.isDbg && this.attach_debug(a), this.hFactoryCls = {}, Object.values(this.hPlg).map((o) => o.init({
      getInfo: this.#i,
      addTag: (u, h) => {
        if (t[u]) throw `すでに定義済みのタグ[${u}]です`;
        t[u] = h;
      },
      addLayCls: (u, h) => {
        if (this.hFactoryCls[u]) throw `すでに定義済みのレイヤcls【${u}】です`;
        this.hFactoryCls[u] = h;
      },
      searchPath: (u, h = SEARCH_PATH_ARG_EXT.DEFAULT) => this.cfg.searchPath(u, h),
      getVal: r.getVal,
      resume: () => a.resume(),
      render: (u, h, l = !1) => e.renderer.render(u, { renderTexture: h, clear: l }),
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
      width: CmnLib.stageW,
      height: CmnLib.stageH
    }
  });
  #r = 0;
  #n = 0;
  #s = 1;
  #o = 0;
  #u = 0;
  #h = 0;
  #a = 0;
  get cvsWidth() {
    return this.#r;
  }
  get cvsHeight() {
    return this.#n;
  }
  get cvsScale() {
    return this.#s;
  }
  get ofsLeft4elm() {
    return this.#o;
  }
  get ofsTop4elm() {
    return this.#u;
  }
  get ofsPadLeft_Dom2PIXI() {
    return this.#h;
  }
  get ofsPadTop_Dom2PIXI() {
    return this.#a;
  }
  isFullScr = !1;
  cvsResize() {
    let t = globalThis.innerWidth, e = globalThis.innerHeight;
    const r = this.main.cvs, a = r.parentElement !== document.body;
    if (a) {
      const h = globalThis.getComputedStyle(r);
      t = parseFloat(h.width), e = parseFloat(h.height);
    }
    if (CmnLib.isMobile) {
      const l = (screen.orientation?.angle ?? 0) % 180 === 0;
      (l && t > e || !l && t < e) && ([t, e] = [e, t]);
    }
    const s = r.getBoundingClientRect();
    if (argChk_Boolean(CmnLib.hDip, "expanding", !0) || a || CmnLib.stageW > t || CmnLib.stageH > e)
      if (CmnLib.stageW / CmnLib.stageH <= t / e ? (this.#n = e, this.#r = CmnLib.stageW / CmnLib.stageH * e) : (this.#r = t, this.#n = CmnLib.stageH / CmnLib.stageW * t), this.#s = this.#r / CmnLib.stageW, a)
        this.#h = 0, this.#a = 0;
      else {
        const h = 1 - this.#s;
        CmnLib.isMobile ? (this.#h = (t - this.#r) / 2 * h, this.#a = (e - this.#n) / 2 * h) : (this.#h = s.left * h, this.#a = s.top * h);
      }
    else
      this.#r = CmnLib.stageW, this.#n = CmnLib.stageH, this.#s = 1, this.#h = 0, this.#a = 0;
    const o = r.parentElement.style;
    a || (o.position = "relative", o.width = `${this.#r}px`, o.height = `${this.#n}px`);
    const u = r.style;
    u.width = o.width, u.height = o.height, a ? (this.#o = s.left, this.#u = s.top) : (this.#o = 0, this.#u = 0), this.isFullScr && (this.#o += (t - this.#r) / 2, this.#u += (e - this.#n) / 2);
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
}`, document.getElementsByTagName("head")[0].appendChild(e), this.addHook((r, a) => this.#f[r]?.(a)), this.#l = lookup(`http://localhost:${this.extPort}`), this.#l.on("data", (r, a) => {
      this.callHook(r, a);
    }).on("disconnect", () => t.setLoop(!0)), this.callHook = (r, a) => {
      for (const s of this.#_) s(r, a);
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
    for (const o of [
      ...Array.from(e.getElementsByClassName("sn_BounceIn")),
      ...Array.from(e.getElementsByClassName("sn_HopIn"))
    ]) o.remove();
    const r = document.createElement("img"), a = SysBase.#y[t];
    if (!a) throw new Error(`toast 名ミス=${t}`);
    r.src = `data:image/svg+xml;base64,${a.dat}`;
    const s = Math.min(CmnLib.stageW, CmnLib.stageH) / 4 * this.#s;
    r.width = r.height = s, r.style.cssText = `position: absolute;
left: ${(CmnLib.stageW - s) / 2 * this.#s + s * (a.dx ?? 0)}px;
top: ${(CmnLib.stageH - s) / 2 * this.#s + s * (a.dy ?? 0)}px;`, r.classList.add("sn_toast", a.ease ?? "sn_BounceInOut"), a.ease || r.addEventListener("animationend", () => e.removeChild(r), { once: !0, passive: !0 }), e.insertBefore(r, this.main.cvs);
  }
  static #y = {
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
  #g = (t) => {
    if (!t.key)
      return this.tglFlscr_sub(), !1;
    const e = t.key.toLowerCase();
    return this.elc.add(document, EVNM_KEY, (r) => {
      SysBase.modKey(r) + r.key.toLowerCase() === e && (r.stopPropagation(), this.tglFlscr_sub());
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
    const { ext_num: e, ab: r } = await this.#m(t), a = this.#b[e];
    return a?.fnc ? await a.fnc(r) : r;
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
  #c = (t, e) => new Promise((r, a) => {
    const s = new Blob([t], { type: e }), o = new Image();
    o.onload = () => r(o), o.onerror = (u) => a(u), o.src = URL.createObjectURL(s);
  });
  #v = (t, e) => new Promise((r, a) => {
    const s = new Blob([t], { type: e }), o = document.createElement("video");
    this.elc.add(o, "error", () => a(o?.error?.message ?? "")), this.elc.add(o, "canplay", () => r(o)), o.src = URL.createObjectURL(s);
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
  capturePage(t, e, r, a) {
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
class DebugMng {
  constructor(t, e, r) {
    this.sys = t, DebugMng.#t = r, DebugMng.#e = e, DebugMng.#i = e.title, DebugMng.myTrace = DebugMng.#u, e.log = (a) => this.#s(a), e.trace = (a) => this.#o(a), DebugMng.#r = document.createElement("span"), DebugMng.#r.hidden = !0, DebugMng.#r.textContent = "", DebugMng.#r.style.cssText = `	z-index: ${Number.MAX_SAFE_INTEGER};
			position: absolute; left: 0; top: 0;
			color: black;
			background-color: rgba(255, 255, 255, 0.7);`, document.body.appendChild(DebugMng.#r);
  }
  static #t;
  static #e;
  static #i;
  static #r;
  destroy() {
    DebugMng.#i = () => !1, document.body.removeChild(DebugMng.#r), DebugMng.myTrace = DebugMng.trace_beforeNew;
  }
  // ログ出力
  #n = !0;
  #s(t) {
    let e = "";
    return this.#n && (this.#n = !1, e = `== ${platform.description} ==
`), this.sys.appendFile(
      this.sys.path_downloads + "log.txt",
      `${e}--- ${getDateStr("-", "_", "")} [fn:${DebugMng.#t.scriptFn} line:${DebugMng.#t.lineNum}] prj:${this.sys.arg.cur}
${t.text || `(text is ${t.text})`}
`
    ), !1;
  }
  #o(t) {
    return DebugMng.myTrace(t.text || `(text is ${t.text})`, "I"), !1;
  }
  // private禁止、galleryでエラーになる
  static trace_beforeNew = (t, e = "E") => {
    let r = `{${e}} ` + t, a = "";
    switch (e) {
      case "D":
        a = `color:#${CmnLib.isDarkMode ? "49F" : "05A"};`;
        break;
      case "W":
        a = "color:#FF8800;";
        break;
      case "F":
        a = "color:#BB0000;";
        break;
      case "ET":
        throw r;
      case "E":
        console.error("%c" + r, "color:#FF3300;");
        return;
      default:
        a = "color:black;", r = " " + r;
    }
    console.info("%c" + r, a);
  };
  static myTrace = DebugMng.trace_beforeNew;
  static strPos = () => DebugMng.#t.lineNum > 0 ? `(fn:${DebugMng.#t.scriptFn} line:${DebugMng.#t.lineNum}) ` : "";
  static #u = (t, e = "E") => {
    let r = `{${e}} ` + DebugMng.strPos() + t;
    DebugMng.#h(r, e);
    let a = "";
    switch (e) {
      case "D":
        a = `color:#${CmnLib.isDarkMode ? "49F" : "05A"};`;
        break;
      case "W":
        a = "color:#F80;";
        break;
      case "F":
        a = "color:#B00;";
        break;
      case "ET":
      case "E":
        if (DebugMng.#i({ text: t }), this.#e.dump_lay({}), this.#e.dump_val({}), DebugMng.#t.dumpErrForeLine(), this.#e.dump_stack({}), e === "ET") throw r;
        console.error("%c" + r, "color:#F30;");
        return;
      default:
        a = "", r = " " + r;
    }
    console.info("%c" + r, a);
  };
  static #h = (t, e) => {
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
    DebugMng.#r.innerHTML += `<span style='${r}'>${t}</span><br/>`, DebugMng.#r.hidden = !1;
  };
}
const PROTOCOL_USERDATA = "userdata:/", PROTOCOL_DL = "downloads:/";
class Config extends ConfigBase {
  constructor(t) {
    super(t), this.sys = t;
  }
  static async generate(t) {
    const e = new Config(t), r = t.arg.cur + "prj.json", a = await t.fetch(r);
    if (!a.ok) throw Error(a.statusText);
    const s = await t.dec(r, await a.text());
    return await e.load(JSON.parse(s)), e;
  }
  async load(t) {
    await super.load(t), CmnLib.stageW = t.window.width, CmnLib.stageH = t.window.height, CmnLib.debugLog = t.debug.debugLog;
  }
  searchPath(t, e = SEARCH_PATH_ARG_EXT.DEFAULT) {
    return t.startsWith(PROTOCOL_DL) ? this.sys.path_downloads + t.slice(11) : t.startsWith(PROTOCOL_USERDATA) ? this.sys.path_userdata + "storage/" + t.slice(10) : super.searchPath(t, e);
  }
}
class AnalyzeTagArg {
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
      const { key: r, val: a, val2: s, def: o, def2: u, literal: h } = e;
      r ? this.#i[r] = {
        val: a ?? s ?? "",
        def: o ?? u
      } : h && (h === "*" ? this.#r = !0 : this.#i[h] = { val: "1" });
    }
  }
  // 属性と値の位置をまとめて返す
  parseinDetail(t, e, r, a) {
    const s = {}, o = t.slice(1 + e, -1);
    for (const { groups: u, index: h, 0: l } of o.matchAll(this.#t)) {
      if (h === void 0) continue;
      const { key: c, val: v, val2: d = "", literal: m } = u;
      if (m) {
        if (m.endsWith("=")) {
          const S = m.length - 1, { ch: P } = this.#e(e, r, a, o, h + S);
          s[m.slice(0, -1)] = {
            k_ln: r,
            k_ch: P - S,
            v_ln: r,
            v_ch: P + 1,
            //	v_ch: ch +1+lenNm +literal.length +1,
            v_len: 0
          };
        }
        continue;
      }
      if (!c) continue;
      const { ln: g, ch: y } = this.#e(e, r, a, o, h), { ln: _, ch: b } = this.#e(e, r, a, o, h + l.lastIndexOf(v ?? d ?? "") - (v ? 0 : 1));
      s[c] = { k_ln: g, k_ch: y, v_ln: _, v_ch: b, v_len: v ? v.length : d.length + 2 };
    }
    return s;
  }
  #e(t, e, r, a, s) {
    const u = a.slice(0, s).split(`
`), h = u.length;
    return {
      ln: e + h - 1,
      ch: h < 2 ? r + 1 + t + s : u.at(-1).length
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
const REG_TAG = /(?<name>[^\s;\]]+)/;
function tagToken2Name_Args(n) {
  const e = REG_TAG.exec(n.slice(1, -1))?.groups;
  if (!e) throw `タグ記述【${n}】異常です(タグ解析)`;
  const r = e.name;
  return [r, n.slice(1 + r.length, -1)];
}
function tagToken2Name(n) {
  const e = REG_TAG.exec(n.slice(1))?.groups;
  if (!e) throw `タグ記述【${n}】異常です(タグ解析)`;
  return e.name;
}
function splitAmpersand(n) {
  const t = n.replaceAll("==", "＝").replaceAll("!=", "≠").split("="), e = t.length;
  if (e < 2 || e > 3) throw "「&計算」書式では「=」指定が一つか二つ必要です";
  const [r, a, s] = t;
  if (a.startsWith("&")) throw "「&計算」書式では「&」指定が不要です";
  return {
    name: r.replaceAll("＝", "==").replaceAll("≠", "!="),
    text: a.replaceAll("＝", "==").replaceAll("≠", "!="),
    cast: e === 3 ? s.trim() : void 0
  };
}
class Grammar {
  constructor(t) {
    this.cfg = t, this.setEscape("");
  }
  #t;
  setEscape(t) {
    if (this.#a && t in this.#a) throw "[エスケープ文字] char【" + t + "】が登録済みの括弧マクロまたは一文字マクロです";
    this.#t = new RegExp(
      (t ? `\\${t}\\S|` : "") + // エスケープシーケンス
      `\\n+|\\t+|\\[let_ml\\s+[^\\]]+\\].+?(?=\\[endlet_ml[\\]\\s])|\\[(?:[^"'#;\\]]+|(["'#]).*?\\1|;[^\\n]*)*?]|;[^\\n]*|&[^&\\n]+&|&&?(?:[^"'#;\\n&]+|(["'#]).*?\\2)+|^\\*[^\\s\\[&;\\\\]+|[^\\n\\t\\[;${t ? `\\${t}` : ""}]+`,
      // 本文
      "gs"
    ), this.#e = new RegExp(`[\\w\\s;[\\]*=&｜《》${t ? `\\${t}` : ""}]`), this.#l = new RegExp(`[\\n\\t;\\[*&${t ? `\\${t}` : ""}]`);
  }
  // 括弧マクロの定義
  bracket2macro(t, e, r, a) {
    const { name: s, text: o } = t;
    if (!s) throw "[bracket2macro] nameは必須です";
    if (!o) throw "[bracket2macro] textは必須です";
    const u = o.at(0);
    if (!u) throw "[bracket2macro] textは必須です";
    if (o.length !== 2) throw "[bracket2macro] textは括弧の前後を示す二文字を指定してください";
    if (!(s in e)) throw `[bracket2macro] 未定義のタグ又はマクロ[${s}]です`;
    this.#a ??= {};
    const h = o.charAt(1);
    if (u in this.#a) throw "[bracket2macro] text【" + u + "】が登録済みの括弧マクロまたは一文字マクロです";
    if (h in this.#a) throw "[bracket2macro] text【" + h + "】が登録済みの括弧マクロまたは一文字マクロです";
    if (this.#e.test(u)) throw "[bracket2macro] text【" + u + "】は括弧マクロに使用できない文字です";
    if (this.#e.test(h)) throw "[bracket2macro] text【" + h + "】は括弧マクロに使用できない文字です";
    this.#a[h] = "0", this.#a[u] = `[${s} text=`, this.addC2M(`\\${u}[^\\${h}]*\\${h}`, `\\${u}\\${h}`), this.#f(r, a);
  }
  // 一文字マクロの定義
  char2macro(t, e, r, a) {
    const { char: s, name: o } = t;
    if (!s) throw "[char2macro] charは必須です";
    if (this.#a ??= {}, s in this.#a) throw "[char2macro] char【" + s + "】が登録済みの括弧マクロまたは一文字マクロです";
    if (this.#e.test(s)) throw "[char2macro] char【" + s + "】は一文字マクロに使用できない文字です";
    if (!o) throw "[char2macro] nameは必須です";
    if (!(o in e)) throw `[char2macro] 未定義のタグ又はマクロ[${o}]です`;
    this.#a[s] = `[${o}]`, this.addC2M(`\\${s}`, `\\${s}`), this.#f(r, a);
  }
  #e;
  #i = new RegExp("");
  #r = "";
  #n = "";
  addC2M(t, e) {
    this.#r += `${t}|`, this.#n += `${e}`, this.#i = new RegExp(
      `(${this.#r}[^${this.#n}]+)`,
      "g"
    );
  }
  resolveScript(t) {
    const e = t.replaceAll(/\r\n?/g, `
`).match(this.#t)?.flatMap((a) => {
      if (!this.testTagLetml(a)) return a;
      const s = /^([^\]]+?])(.*)$/s.exec(a);
      if (!s) return a;
      const [, o, u] = s;
      return [o, u];
    }) ?? [], r = { aToken: e, len: e.length, aLNum: [] };
    return this.#f(r), this.#u(r), r;
  }
  #s = /^\[(call|loadplugin)\s/;
  #o = /\bfn\s*=\s*[^\s\]]+/;
  #u(t) {
    for (let e = t.len - 1; e >= 0; --e) {
      const r = t.aToken[e];
      if (!this.#s.test(r)) continue;
      const [a, s] = tagToken2Name_Args(r);
      this.#h.parse(s);
      const o = this.#h.hPrm.fn;
      if (!o) continue;
      const { val: u } = o;
      if (!u || !u.endsWith("*")) continue;
      t.aToken.splice(e, 1, "	", "; " + r), t.aLNum.splice(e, 1, NaN, NaN);
      const h = a === "loadplugin" ? SEARCH_PATH_ARG_EXT.CSS : SEARCH_PATH_ARG_EXT.SN, l = this.cfg.matchPath("^" + u.slice(0, -1) + ".*", h);
      for (const c of l) {
        const v = r.replace(
          this.#o,
          "fn=" + decodeURIComponent(getFn(c[h]))
        );
        t.aToken.splice(e, 0, v), t.aLNum.splice(e, 0, NaN);
      }
    }
    t.len = t.aToken.length;
  }
  #h = new AnalyzeTagArg();
  testTagLetml(t) {
    return /^\[let_ml\s/.test(t);
  }
  testTagEndLetml(t) {
    return /^\[endlet_ml\s*]/.test(t);
  }
  analyzToken(t) {
    return this.#t.lastIndex = 0, this.#t.exec(t);
  }
  #a;
  #l;
  #f(t, e = 0) {
    if (this.#a) {
      for (let r = t.len - 1; r >= e; --r) {
        const a = t.aToken[r];
        if (this.testNoTxt(a.at(0) ?? `
`)) continue;
        const s = t.aLNum[r], o = a.match(this.#i);
        if (!o) continue;
        let u = 1;
        for (let h = o.length - 1; h >= 0; --h) {
          let l = o[h];
          const c = this.#a[l.at(0) ?? " "];
          c && (l = c + (c.endsWith("]") ? "" : `'${l.slice(1, -1)}']`)), t.aToken.splice(r, u, l), t.aLNum.splice(r, u, s), u = 0;
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
const SN_ID = "skynovel";
class Main {
  constructor(t) {
    this.sys = t, skipHello(), Config.generate(t).then((e) => this.#s(e)).catch((e) => console.error("load err fn:prj.json e:%o", e));
  }
  cvs;
  #t = /* @__PURE__ */ Object.create(null);
  // タグ処理辞書
  #e;
  #i;
  #r;
  #n = [];
  async #s(t) {
    const e = {
      width: t.oCfg.window.width,
      height: t.oCfg.window.height,
      backgroundColor: parseColor(String(t.oCfg.init.bg_color)),
      // このString()は後方互換性のため必須
      //	resolution		: sys.resolution,
      resolution: globalThis.devicePixelRatio ?? 1
      // 理想
    }, r = document.getElementById(SN_ID);
    if (r) {
      const o = r.cloneNode(!0);
      o.id = SN_ID, e.view = r;
      const u = r.parentNode;
      this.#n.unshift(() => u.appendChild(o));
    } else {
      const o = document.createElement("canvas");
      o.id = SN_ID, e.view = o, document.body.appendChild(o), this.#n.unshift(() => document.body.removeChild(o));
    }
    const a = new Application(e);
    this.#n.unshift(() => {
      clearTextureCache(), this.sys.destroy(), a.destroy(!1);
    }), this.cvs = a.view, this.cvs.id = SN_ID + "_act", r || document.body.appendChild(this.cvs);
    const s = document.createElement("canvas")?.getContext("2d");
    if (!s) throw "#init cc err";
    CmnLib.cc4ColorName = s, await Promise.all([
      import("./Variable.js"),
      import("./PropParser.js"),
      import("./SoundMng.js"),
      import("./ScriptIterator.js").then((o) => o.S),
      import("./LayerMng.js").then((o) => o.L),
      import("./EventMng.js")
    ]).then(async ([
      { Variable: o },
      { PropParser: u },
      { SoundMng: h },
      { ScriptIterator: l },
      { LayerMng: c },
      { EventMng: v }
    ]) => {
      const d = new o(t, this.#t), m = new u(d, t.oCfg.init.escape ?? "\\");
      this.#o = (_, b, S, P) => d.setVal_Nochk(_, b, S, P), this.#a = (_) => m.getValAmpersand(_), this.#l = (_) => m.parse(_), await Promise.allSettled(this.sys.init(this.#t, a, d, this)), this.#t.title({ text: t.oCfg.book.title || "SKYNovel" });
      const g = new h(t, this.#t, d, this, this.sys);
      this.#n.unshift(() => g.destroy()), this.#e = new l(t, this.#t, this, d, m, g, this.sys), this.#n.unshift(() => this.#e.destroy());
      const y = new DebugMng(this.sys, this.#t, this.#e);
      this.#n.unshift(() => y.destroy()), this.errScript = (_, b = !0) => {
        if (this.stop(), DebugMng.myTrace(_), CmnLib.debugLog && console.log("🍜 SKYNovel err!"), b) throw _;
      }, this.#i = new c(t, this.#t, a, d, this, this.#e, this.sys, g, m), this.#n.unshift(() => this.#i.destroy()), this.#r = new v(t, this.#t, a, this, this.#i, d, g, this.#e, this.sys), this.#n.unshift(() => this.#r.destroy()), this.#n.unshift(() => {
        this.stop(), this.#u = !1;
        const _ = () => !0;
        for (const b in this.#t) this.#t[b] = _;
      });
    });
  }
  destroy() {
    this.resume = this.destroy = () => {
    }, this.cvs.parentElement?.removeChild(this.cvs);
    for (const t of this.#n) t();
    this.#n = [];
  }
  errScript = (t, e = !0) => {
  };
  resumeByJumpOrCall(t) {
    if (t.url) {
      this.#t.navigate_to(t), this.#e.jumpJustBefore();
      return;
    }
    if (this.#o("tmp", "sn.eventArg", t.arg ?? ""), this.#o("tmp", "sn.eventLabel", t.label ?? ""), argChk_Boolean(t, "call", !1)) {
      if (this.#e.subIdxToken(), this.#t.call(t)) return;
    } else if (this.#t.clear_event({}), this.#t.jump(t)) return;
    this.resume();
  }
  #o = (t, e, r, a = !1) => {
  };
  resume() {
    this.#i.clearBreak(), this.#e.noticeBreak(!1), this.#r.hideHint(), queueMicrotask(() => this.#h());
  }
  stop = () => {
    this.#e.noticeBreak(!0);
  };
  setLoop(t, e = "") {
    (this.#u = t) ? this.resume() : this.stop(), this.sys.setTitleInfo(e ? ` -- ${e}中` : "");
  }
  #u = !0;
  //MARK: メイン処理（シナリオ解析）
  async #h() {
    let t = "";
    try {
      for (; this.#u; ) {
        let e = this.#e.nextToken();
        if (!e) return;
        const r = e.charCodeAt(0);
        if (r === 9) continue;
        if (r === 10) {
          this.#e.addLineNum(e.length);
          continue;
        }
        if (r === 91) {
          if (t = "タグ開始", this.#e.isBreak(e)) return;
          const [s, o] = tagToken2Name_Args(e);
          t = `[${s}]例外`;
          const u = (e.match(/\n/g) ?? []).length;
          if (u > 0 && this.#e.addLineNum(u), await this.#e.タグ解析(s, o)) {
            this.stop();
            return;
          }
          continue;
        }
        if (r === 38) {
          if (!e.endsWith("&")) {
            if (t = "変数計算", this.#e.isBreak(e)) return;
            const s = splitAmpersand(e.slice(1));
            s.name = this.#a(s.name), s.text = String(this.#l(s.text)), this.#t.let(s);
            continue;
          }
          if (t = "変数操作", e.charAt(1) === "&") throw new Error("「&表示&」書式では「&」指定が不要です");
          e = String(this.#l(e.slice(1, -1)));
        } else {
          if (r === 59) continue;
          if (r === 42 && e.length > 1) continue;
        }
        t = "文字表示", this.#i.setNormalChWait(), this.#i.currentTxtlayForeNeedErr.tagCh(e);
      }
    } catch (e) {
      this.errScript(`${t} ${e instanceof Error ? `mes=${e.message}(${e.name})` : e}`, !1);
    }
  }
  #a = (t) => "";
  #l = (t) => {
  };
}
var util, hasRequiredUtil;
function requireUtil() {
  if (hasRequiredUtil) return util;
  hasRequiredUtil = 1;
  var n = a(), t = s(), e = o(), r = typeof window < "u" ? window : commonjsGlobal;
  util = {
    assign: n,
    create: t,
    trim: e,
    bind: u,
    slice: h,
    each: l,
    map: c,
    pluck: v,
    isList: d,
    isFunction: m,
    isObject: g,
    Global: r
  };
  function a() {
    return Object.assign ? Object.assign : function(_, b, S, P) {
      for (var N = 1; N < arguments.length; N++)
        l(Object(arguments[N]), function(E, M) {
          _[M] = E;
        });
      return _;
    };
  }
  function s() {
    if (Object.create)
      return function(_, b, S, P) {
        var N = h(arguments, 1);
        return n.apply(this, [Object.create(_)].concat(N));
      };
    {
      let y = function() {
      };
      return function(b, S, P, N) {
        var E = h(arguments, 1);
        return y.prototype = b, n.apply(this, [new y()].concat(E));
      };
    }
  }
  function o() {
    return String.prototype.trim ? function(_) {
      return String.prototype.trim.call(_);
    } : function(_) {
      return _.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
    };
  }
  function u(y, _) {
    return function() {
      return _.apply(y, Array.prototype.slice.call(arguments, 0));
    };
  }
  function h(y, _) {
    return Array.prototype.slice.call(y, _ || 0);
  }
  function l(y, _) {
    v(y, function(b, S) {
      return _(b, S), !1;
    });
  }
  function c(y, _) {
    var b = d(y) ? [] : {};
    return v(y, function(S, P) {
      return b[P] = _(S, P), !1;
    }), b;
  }
  function v(y, _) {
    if (d(y)) {
      for (var b = 0; b < y.length; b++)
        if (_(y[b], b))
          return y[b];
    } else
      for (var S in y)
        if (y.hasOwnProperty(S) && _(y[S], S))
          return y[S];
  }
  function d(y) {
    return y != null && typeof y != "function" && typeof y.length == "number";
  }
  function m(y) {
    return y && {}.toString.call(y) === "[object Function]";
  }
  function g(y) {
    return y && {}.toString.call(y) === "[object Object]";
  }
  return util;
}
var storeEngine, hasRequiredStoreEngine;
function requireStoreEngine() {
  if (hasRequiredStoreEngine) return storeEngine;
  hasRequiredStoreEngine = 1;
  var n = requireUtil(), t = n.slice, e = n.pluck, r = n.each, a = n.bind, s = n.create, o = n.isList, u = n.isFunction, h = n.isObject;
  storeEngine = {
    createStore: v
  };
  var l = {
    version: "2.0.12",
    enabled: !1,
    // get returns the value of the given key. If that value
    // is undefined, it returns optionalDefaultValue instead.
    get: function(d, m) {
      var g = this.storage.read(this._namespacePrefix + d);
      return this._deserialize(g, m);
    },
    // set will store the given value at key and returns value.
    // Calling set with value === undefined is equivalent to calling remove.
    set: function(d, m) {
      return m === void 0 ? this.remove(d) : (this.storage.write(this._namespacePrefix + d, this._serialize(m)), m);
    },
    // remove deletes the key and value stored at the given key.
    remove: function(d) {
      this.storage.remove(this._namespacePrefix + d);
    },
    // each will call the given callback once for each key-value pair
    // in this store.
    each: function(d) {
      var m = this;
      this.storage.each(function(g, y) {
        d.call(m, m._deserialize(g), (y || "").replace(m._namespaceRegexp, ""));
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
      var m = d.warn ? d.warn : d.log;
      m.apply(d, arguments);
    }
  }
  function v(d, m, g) {
    g || (g = ""), d && !o(d) && (d = [d]), m && !o(m) && (m = [m]);
    var y = g ? "__storejs_" + g + "_" : "", _ = g ? new RegExp("^" + y) : null, b = /^[a-zA-Z0-9_\-]*$/;
    if (!b.test(g))
      throw new Error("store.js namespaces can only have alphanumerics + underscores and dashes");
    var S = {
      _namespacePrefix: y,
      _namespaceRegexp: _,
      _testStorage: function(N) {
        try {
          var E = "__storejs__test__";
          N.write(E, E);
          var M = N.read(E) === E;
          return N.remove(E), M;
        } catch {
          return !1;
        }
      },
      _assignPluginFnProp: function(N, E) {
        var M = this[E];
        this[E] = function() {
          var A = t(arguments, 0), L = this;
          function B() {
            if (M)
              return r(arguments, function(H, rt) {
                A[rt] = H;
              }), M.apply(L, A);
          }
          var Y = [B].concat(A);
          return N.apply(L, Y);
        };
      },
      _serialize: function(N) {
        return JSON.stringify(N);
      },
      _deserialize: function(N, E) {
        if (!N)
          return E;
        var M = "";
        try {
          M = JSON.parse(N);
        } catch {
          M = N;
        }
        return M !== void 0 ? M : E;
      },
      _addStorage: function(N) {
        this.enabled || this._testStorage(N) && (this.storage = N, this.enabled = !0);
      },
      _addPlugin: function(N) {
        var E = this;
        if (o(N)) {
          r(N, function(A) {
            E._addPlugin(A);
          });
          return;
        }
        var M = e(this.plugins, function(A) {
          return N === A;
        });
        if (!M) {
          if (this.plugins.push(N), !u(N))
            throw new Error("Plugins must be function values that return objects");
          var T = N.call(this);
          if (!h(T))
            throw new Error("Plugins must return an object of function properties");
          r(T, function(A, L) {
            if (!u(A))
              throw new Error("Bad plugin property: " + L + " from plugin " + N.name + ". Plugins should only return functions.");
            E._assignPluginFnProp(A, L);
          });
        }
      },
      // Put deprecated properties in the private API, so as to not expose it to accidential
      // discovery through inspection of the store object.
      // Deprecated: addStorage
      addStorage: function(N) {
        c("store.addStorage(storage) is deprecated. Use createStore([storages])"), this._addStorage(N);
      }
    }, P = s(S, l, {
      plugins: []
    });
    return P.raw = {}, r(P, function(N, E) {
      u(N) && (P.raw[E] = a(P, N));
    }), r(d, function(N) {
      P._addStorage(N);
    }), r(m, function(N) {
      P._addPlugin(N);
    }), P;
  }
  return storeEngine;
}
var localStorage_1, hasRequiredLocalStorage;
function requireLocalStorage() {
  if (hasRequiredLocalStorage) return localStorage_1;
  hasRequiredLocalStorage = 1;
  var n = requireUtil(), t = n.Global;
  localStorage_1 = {
    name: "localStorage",
    read: r,
    write: a,
    each: s,
    remove: o,
    clearAll: u
  };
  function e() {
    return t.localStorage;
  }
  function r(h) {
    return e().getItem(h);
  }
  function a(h, l) {
    return e().setItem(h, l);
  }
  function s(h) {
    for (var l = e().length - 1; l >= 0; l--) {
      var c = e().key(l);
      h(r(c), c);
    }
  }
  function o(h) {
    return e().removeItem(h);
  }
  function u() {
    return e().clear();
  }
  return localStorage_1;
}
var oldFFGlobalStorage, hasRequiredOldFFGlobalStorage;
function requireOldFFGlobalStorage() {
  if (hasRequiredOldFFGlobalStorage) return oldFFGlobalStorage;
  hasRequiredOldFFGlobalStorage = 1;
  var n = requireUtil(), t = n.Global;
  oldFFGlobalStorage = {
    name: "oldFF-globalStorage",
    read: r,
    write: a,
    each: s,
    remove: o,
    clearAll: u
  };
  var e = t.globalStorage;
  function r(h) {
    return e[h];
  }
  function a(h, l) {
    e[h] = l;
  }
  function s(h) {
    for (var l = e.length - 1; l >= 0; l--) {
      var c = e.key(l);
      h(e[c], c);
    }
  }
  function o(h) {
    return e.removeItem(h);
  }
  function u() {
    s(function(h, l) {
      delete e[h];
    });
  }
  return oldFFGlobalStorage;
}
var oldIEUserDataStorage, hasRequiredOldIEUserDataStorage;
function requireOldIEUserDataStorage() {
  if (hasRequiredOldIEUserDataStorage) return oldIEUserDataStorage;
  hasRequiredOldIEUserDataStorage = 1;
  var n = requireUtil(), t = n.Global;
  oldIEUserDataStorage = {
    name: "oldIE-userDataStorage",
    write: o,
    read: u,
    each: h,
    remove: l,
    clearAll: c
  };
  var e = "storejs", r = t.document, a = m(), s = (t.navigator ? t.navigator.userAgent : "").match(/ (MSIE 8|MSIE 9|MSIE 10)\./);
  function o(g, y) {
    if (!s) {
      var _ = d(g);
      a(function(b) {
        b.setAttribute(_, y), b.save(e);
      });
    }
  }
  function u(g) {
    if (!s) {
      var y = d(g), _ = null;
      return a(function(b) {
        _ = b.getAttribute(y);
      }), _;
    }
  }
  function h(g) {
    a(function(y) {
      for (var _ = y.XMLDocument.documentElement.attributes, b = _.length - 1; b >= 0; b--) {
        var S = _[b];
        g(y.getAttribute(S.name), S.name);
      }
    });
  }
  function l(g) {
    var y = d(g);
    a(function(_) {
      _.removeAttribute(y), _.save(e);
    });
  }
  function c() {
    a(function(g) {
      var y = g.XMLDocument.documentElement.attributes;
      g.load(e);
      for (var _ = y.length - 1; _ >= 0; _--)
        g.removeAttribute(y[_].name);
      g.save(e);
    });
  }
  var v = new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g");
  function d(g) {
    return g.replace(/^\d/, "___$&").replace(v, "___");
  }
  function m() {
    if (!r || !r.documentElement || !r.documentElement.addBehavior)
      return null;
    var g = "script", y, _, b;
    try {
      _ = new ActiveXObject("htmlfile"), _.open(), _.write("<" + g + ">document.w=window</" + g + '><iframe src="/favicon.ico"></iframe>'), _.close(), y = _.w.frames[0].document, b = y.createElement("div");
    } catch {
      b = r.createElement("div"), y = r.body;
    }
    return function(S) {
      var P = [].slice.call(arguments, 0);
      P.unshift(b), y.appendChild(b), b.addBehavior("#default#userData"), b.load(e), S.apply(this, P), y.removeChild(b);
    };
  }
  return oldIEUserDataStorage;
}
var cookieStorage, hasRequiredCookieStorage;
function requireCookieStorage() {
  if (hasRequiredCookieStorage) return cookieStorage;
  hasRequiredCookieStorage = 1;
  var n = requireUtil(), t = n.Global, e = n.trim;
  cookieStorage = {
    name: "cookieStorage",
    read: a,
    write: o,
    each: s,
    remove: u,
    clearAll: h
  };
  var r = t.document;
  function a(c) {
    if (!c || !l(c))
      return null;
    var v = "(?:^|.*;\\s*)" + escape(c).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*";
    return unescape(r.cookie.replace(new RegExp(v), "$1"));
  }
  function s(c) {
    for (var v = r.cookie.split(/; ?/g), d = v.length - 1; d >= 0; d--)
      if (e(v[d])) {
        var m = v[d].split("="), g = unescape(m[0]), y = unescape(m[1]);
        c(y, g);
      }
  }
  function o(c, v) {
    c && (r.cookie = escape(c) + "=" + escape(v) + "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/");
  }
  function u(c) {
    !c || !l(c) || (r.cookie = escape(c) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/");
  }
  function h() {
    s(function(c, v) {
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
  var n = requireUtil(), t = n.Global;
  sessionStorage_1 = {
    name: "sessionStorage",
    read: r,
    write: a,
    each: s,
    remove: o,
    clearAll: u
  };
  function e() {
    return t.sessionStorage;
  }
  function r(h) {
    return e().getItem(h);
  }
  function a(h, l) {
    return e().setItem(h, l);
  }
  function s(h) {
    for (var l = e().length - 1; l >= 0; l--) {
      var c = e().key(l);
      h(r(c), c);
    }
  }
  function o(h) {
    return e().removeItem(h);
  }
  function u() {
    return e().clear();
  }
  return sessionStorage_1;
}
var memoryStorage_1, hasRequiredMemoryStorage;
function requireMemoryStorage() {
  if (hasRequiredMemoryStorage) return memoryStorage_1;
  hasRequiredMemoryStorage = 1, memoryStorage_1 = {
    name: "memoryStorage",
    read: t,
    write: e,
    each: r,
    remove: a,
    clearAll: s
  };
  var n = {};
  function t(o) {
    return n[o];
  }
  function e(o, u) {
    n[o] = u;
  }
  function r(o) {
    for (var u in n)
      n.hasOwnProperty(u) && o(n[u], u);
  }
  function a(o) {
    delete n[o];
  }
  function s(o) {
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
      return rx_escapable.lastIndex = 0, rx_escapable.test(n) ? '"' + n.replace(rx_escapable, function(t) {
        var e = meta[t];
        return typeof e == "string" ? e : "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4);
      }) + '"' : '"' + n + '"';
    }
    function str(n, t) {
      var e, r, a, s, o = gap, u, h = t[n];
      switch (h && typeof h == "object" && typeof h.toJSON == "function" && (h = h.toJSON(n)), typeof rep == "function" && (h = rep.call(t, n, h)), typeof h) {
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
            for (s = h.length, e = 0; e < s; e += 1)
              u[e] = str(e, h) || "null";
            return a = u.length === 0 ? "[]" : gap ? `[
` + gap + u.join(`,
` + gap) + `
` + o + "]" : "[" + u.join(",") + "]", gap = o, a;
          }
          if (rep && typeof rep == "object")
            for (s = rep.length, e = 0; e < s; e += 1)
              typeof rep[e] == "string" && (r = rep[e], a = str(r, h), a && u.push(quote(r) + (gap ? ": " : ":") + a));
          else
            for (r in h)
              Object.prototype.hasOwnProperty.call(h, r) && (a = str(r, h), a && u.push(quote(r) + (gap ? ": " : ":") + a));
          return a = u.length === 0 ? "{}" : gap ? `{
` + gap + u.join(`,
` + gap) + `
` + o + "}" : "{" + u.join(",") + "}", gap = o, a;
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
    }, JSON.stringify = function(n, t, e) {
      var r;
      if (gap = "", indent = "", typeof e == "number")
        for (r = 0; r < e; r += 1)
          indent += " ";
      else typeof e == "string" && (indent = e);
      if (rep = t, t && typeof t != "function" && (typeof t != "object" || typeof t.length != "number"))
        throw new Error("JSON.stringify");
      return str("", { "": n });
    }), typeof JSON.parse != "function" && (JSON.parse = function(text, reviver) {
      var j;
      function walk(n, t) {
        var e, r, a = n[t];
        if (a && typeof a == "object")
          for (e in a)
            Object.prototype.hasOwnProperty.call(a, e) && (r = walk(a, e), r !== void 0 ? a[e] = r : delete a[e]);
        return reviver.call(n, t, a);
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
  var n = requireStoreEngine(), t = requireAll(), e = [requireJson2()];
  return store_legacy = n.createStore(t, e), store_legacy;
}
var store_legacyExports = requireStore_legacy();
const store = /* @__PURE__ */ getDefaultExportFromCjs(store_legacyExports);
/*!
devtools-detect
https://github.com/sindresorhus/devtools-detect
By Sindre Sorhus
MIT License
*/
const devtools = {
  isOpen: !1,
  orientation: void 0
}, threshold = 170, emitEvent = (n, t) => {
  globalThis.dispatchEvent(new globalThis.CustomEvent("devtoolschange", {
    detail: {
      isOpen: n,
      orientation: t
    }
  }));
}, main = ({ emitEvents: n = !0 } = {}) => {
  const t = globalThis.outerWidth - globalThis.innerWidth > threshold, e = globalThis.outerHeight - globalThis.innerHeight > threshold, r = t ? "vertical" : "horizontal";
  !(e && t) && (globalThis.Firebug && globalThis.Firebug.chrome && globalThis.Firebug.chrome.isInitialized || t || e) ? ((!devtools.isOpen || devtools.orientation !== r) && n && emitEvent(!0, r), devtools.isOpen = !0, devtools.orientation = r) : (devtools.isOpen && n && emitEvent(!1, void 0), devtools.isOpen = !1, devtools.orientation = void 0);
};
main({ emitEvents: !1 });
setInterval(main, 500);
class SysWeb extends SysBase {
  #t;
  constructor(...[t = {}, e = { cur: "prj/", crypto: !1, dip: "" }]) {
    super(t, e);
    const r = e.cur.split("/");
    this.#t = r.length > 2 ? r.slice(0, -2).join("/") + "/" : "", queueMicrotask(async () => this.loaded(t, e));
  }
  async loaded(...[t, e]) {
    await super.loaded(t, e), document.querySelectorAll("[data-prj]").forEach((o) => {
      const u = o.attributes.getNamedItem("data-prj");
      u && o.addEventListener("click", async () => this.runSN(u.value), { passive: !0 });
    }), document.querySelectorAll("[data-reload]").forEach(
      (o) => o.addEventListener("click", async () => this.run(), { passive: !0 })
      //this.elc.add(v, 'click', ()=> this.run(), {passive: true})
      // ギャラリーであっても、ここには一度しか来ないので
    ), e.dip && (CmnLib.hDip = JSON.parse(e.dip));
    const r = new URLSearchParams(location.search), a = r.get("dip");
    if (a && (CmnLib.hDip = { ...CmnLib.hDip, ...JSON.parse(a.replaceAll("%2C", ",")) }), !argChk_Boolean(CmnLib.hDip, "oninit_run", !0)) return;
    argChk_Boolean(CmnLib.hDip, "dbg", !1) && (CmnLib.isDbg = !0, this.fetch = (o, u) => fetch(o, { ...u, mode: "cors" })), this.extPort = argChk_Num(CmnLib.hDip, "port", this.extPort);
    const s = r.get("cur");
    s && (e.cur = this.#t + s + "/"), await this.run();
  }
  #e = ":";
  async runSN(t) {
    this.arg.cur = this.#t + t + "/", this.#e !== this.arg.cur && (this.#e = this.arg.cur, await this.run());
  }
  run = async () => {
    this.#i && this.#i.destroy(), this.#i = new Main(this);
  };
  stop() {
    this.#i && (this.#i.destroy(), this.#i = void 0);
  }
  #i = void 0;
  async loadPath(t, e) {
    await super.loadPath(t, e);
    const r = this.arg.cur + "path.json", a = await this.fetch(r);
    if (!a.ok) throw Error(a.statusText);
    const s = await a.text(), o = JSON.parse(await this.dec(r, s));
    for (const [u, h] of Object.entries(o)) {
      const l = t[u] = h;
      for (const [c, v] of Object.entries(l))
        c !== ":cnt" && (l[c] = this.arg.cur + v);
    }
  }
  async initVal(t, e, r) {
    const a = encodeURIComponent(document.location.hostname);
    e["const.sn.isDebugger"] = a === "localhost" || a === "127.0.0.1";
    const s = this.cfg.getNs();
    this.flushSub = this.arg.crypto ? async () => {
      store.set(s + "sys_", await this.enc(JSON.stringify(this.data.sys))), store.set(s + "mark_", await this.enc(JSON.stringify(this.data.mark))), store.set(s + "kidoku_", await this.enc(JSON.stringify(this.data.kidoku)));
    } : () => {
      store.set(s + "sys", this.data.sys), store.set(s + "mark", this.data.mark), store.set(s + "kidoku", this.data.kidoku);
    };
    const o = s + (this.arg.crypto ? "sys_" : "sys");
    if (e["const.sn.isFirstBoot"] = store.get(o) === void 0) {
      this.data.sys = t.sys, this.data.mark = t.mark, this.data.kidoku = t.kidoku, this.flush(), r(this.data);
      return;
    }
    if (!this.arg.crypto) {
      this.data.sys = store.get(s + "sys"), this.data.mark = store.get(s + "mark"), this.data.kidoku = store.get(s + "kidoku"), r(this.data);
      return;
    }
    let u = "";
    try {
      u = "sys", this.data.sys = JSON.parse(await this.dec("json", store.get(s + "sys_"))), u += Number(this.val.getVal("sys:TextLayer.Back.Alpha", 1)), u = "mark", this.data.mark = JSON.parse(await this.dec("json", store.get(s + "mark_"))), u = "kidoku", this.data.kidoku = JSON.parse(await this.dec("json", store.get(s + "kidoku_")));
    } catch (h) {
      console.error(`セーブデータ（${u}）が壊れています。一度クリアする必要があります(a) %o`, h);
    }
    r(this.data);
  }
  init(t, e, r, a) {
    super.init(t, e, r, a);
    const s = e.view.parentElement;
    if ("requestFullscreen" in document.body)
      this.tglFlscr_sub = () => this.isFullScr ? document.exitFullscreen() : s.requestFullscreen(), this.elc.add(document, "fullscreenchange", () => this.isFullScr = !!document.fullscreenElement);
    else {
      const o = document;
      this.tglFlscr_sub = () => this.isFullScr ? o.webkitCancelFullScreen() : s.webkitRequestFullscreen(), this.elc.add(document, "fullscreenchange", () => this.isFullScr = !!o.webkitFullscreenElement);
    }
    return this.cfg.oCfg.debug.devtool || this.elc.add(globalThis, "devtoolschange", (o) => {
      o.detail.isOpen && (console.error("DevToolは禁止されています。許可する場合は【プロジェクト設定】の【devtool】をONに。"), a.destroy());
    }, { once: !0, passive: !0 }), [];
  }
  cvsResize() {
    if (super.cvsResize(), this.isFullScr) {
      const t = this.main.cvs.style;
      t.width = t.height = "";
    }
  }
  pathBaseCnvSnPath4Dbg = "${pathbase}/";
  // プレイデータをエクスポート
  _export = () => ((async () => {
    const t = JSON.stringify({
      sys: this.data.sys,
      mark: this.data.mark,
      kidoku: this.data.kidoku
    }), e = this.arg.crypto ? await this.enc(t) : t, r = new Blob([e], { type: "text/json" }), a = document.createElement("a");
    a.href = URL.createObjectURL(r), a.download = (this.arg.crypto ? "" : "no_crypto_") + this.cfg.getNs() + getDateStr("-", "_", "") + ".swpd", a.click(), CmnLib.debugLog && console.log("プレイデータをエクスポートしました"), setTimeout(() => this.fire("sn:exported", new MouseEvent("click")), 10);
  })(), !1);
  // プレイデータをインポート
  _import = () => (new Promise((t, e) => {
    const r = document.createElement("input");
    r.type = "file", r.accept = ".swpd, text/plain", r.onchange = () => {
      const a = r.files?.[0];
      a ? t(a) : e();
    }, r.click();
  }).then(async (t) => {
    const e = await t.text(), r = JSON.parse(this.arg.crypto ? await this.dec("json", e) : e);
    if (!r.sys || !r.mark || !r.kidoku) throw new Error("異常なプレイデータです");
    if (r.sys[SysBase.VALNM_CFG_NS] !== this.cfg.oCfg.save_ns) {
      console.error(`別のゲーム【プロジェクト名=${r.sys[SysBase.VALNM_CFG_NS]}】のプレイデータです`);
      return;
    }
    this.data.sys = r.sys, this.data.mark = r.mark, this.data.kidoku = r.kidoku, this.flush(), this.val.updateData(r), CmnLib.debugLog && console.log("プレイデータをインポートしました"), this.fire("sn:imported", new MouseEvent("click"));
  }).catch((t) => console.error(`異常なプレイデータです ${t.message}`)), !1);
  // ＵＲＬを開く
  navigate_to = (t) => {
    const { url: e } = t;
    if (!e) throw "[navigate_to] urlは必須です";
    return globalThis.open(e, "_blank"), !1;
  };
  // タイトル指定
  titleSub(t) {
    document.title = t, document.querySelectorAll("[data-title]").forEach((e) => e.textContent = t);
  }
  async savePic(t, e) {
    const r = document.createElement("a");
    r.href = e, r.download = t, r.click(), CmnLib.debugLog && console.log("画像ファイルをダウンロードします");
  }
  #r = {};
  async appendFile(t, e) {
    const r = (this.#r[t] ?? "") + e;
    this.#r[t] = r, await this.outputFile(t, r);
  }
  async outputFile(t, e) {
    const r = new Blob([e], { type: "text/json" }), a = document.createElement("a");
    a.href = URL.createObjectURL(r), a.download = t, a.click();
  }
}
const { BlurFilter, ColorMatrixFilter, NoiseFilter } = filters;
class Layer {
  layname = "";
  name_ = "";
  set name(t) {
    this.name_ = t;
  }
  get name() {
    return this.name_;
  }
  ctn = new Sprite(Texture.EMPTY);
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
    return "alpha" in t && (e.alpha = argChk_Num(t, "alpha", 1)), Layer.setBlendmode(e, t), ("pivot_x" in t || "pivot_y" in t) && e.pivot.set(
      argChk_Num(t, "pivot_x", e.pivot.x),
      argChk_Num(t, "pivot_y", e.pivot.y)
    ), "rotation" in t && (e.angle = argChk_Num(t, "rotation", 0)), ("scale_x" in t || "scale_y" in t) && e.scale.set(
      argChk_Num(t, "scale_x", e.scale.x),
      argChk_Num(t, "scale_y", e.scale.y)
    ), "visible" in t && (e.visible = argChk_Boolean(t, "visible", !0)), "filter" in t && (e.filters = [Layer.bldFilters(t)], this.aFltHArg = [t]), !1;
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
    const { filter: e = "" } = t, r = Layer.hBldFilter[e];
    if (!r) throw "filter が異常です";
    const a = r(t);
    a.enabled = argChk_Boolean(t, "enable_filter", !0);
    const { blendmode: s } = t;
    return s && (a.blendMode = Layer.getBlendmodeNum(s)), a;
  }
  // https://github.com/pixijs/filters
  static hBldFilter = {
    // https://pixijs.download/v6.5.10/docs/PIXI.filters.BlurFilter.html
    blur: (t) => {
      const e = new BlurFilter(
        argChk_Num(t, "strength", 8),
        // 強さ
        argChk_Num(t, "quality", 4),
        // 品質
        "resolution" in t ? argChk_Num(t, "resolution", 0) : void 0,
        // 解像度
        argChk_Num(t, "kernel_size", 5)
        // カーネルサイズ。値は 5、7、9、11、13、15。
      );
      return e.blurX = uint(argChk_Num(t, "blur_x", 2)), e.blurY = uint(argChk_Num(t, "blur_y", 2)), e.repeatEdgePixels = argChk_Boolean(t, "repeat_edge_pixels", !1), e;
    },
    // https://pixijs.download/v6.5.10/docs/PIXI.filters.NoiseFilter.html
    noise: (t) => new NoiseFilter(
      // ノイズエフェクト
      argChk_Num(t, "noise", 0.5),
      // 適用するノイズの量。この値は (0, 1] の範囲内
      "seed" in t ? argChk_Num(t, "seed", 0) : void 0
      // ランダム ノイズの生成に適用するシード値。 Math.random() を使用するのが適切な値です。
    ),
    // https://pixijs.download/v6.5.10/docs/PIXI.filters.ColorMatrixFilter.html
    color_matrix: (t) => {
      const e = new ColorMatrixFilter();
      e.alpha = uint(argChk_Num(t, "alpha", 1));
      const { matrix: r = "" } = t;
      if (r) {
        const a = r.split(","), s = a.length;
        if (s !== 20) throw `matrix の個数（${s}）が 20 ではありません`;
        for (let o = 0; o < s; ++o) e.matrix[o] = uint(a[o]);
      } else
        e.matrix[0] = uint(argChk_Num(t, "rtor", 1)), e.matrix[1] = uint(argChk_Num(t, "gtor", 0)), e.matrix[2] = uint(argChk_Num(t, "btor", 0)), e.matrix[3] = uint(argChk_Num(t, "ator", 0)), e.matrix[4] = uint(argChk_Num(t, "pr", 0)), e.matrix[5] = uint(argChk_Num(t, "rtog", 0)), e.matrix[6] = uint(argChk_Num(t, "gtog", 1)), e.matrix[7] = uint(argChk_Num(t, "btog", 0)), e.matrix[8] = uint(argChk_Num(t, "atog", 0)), e.matrix[9] = uint(argChk_Num(t, "pg", 0)), e.matrix[10] = uint(argChk_Num(t, "rtob", 0)), e.matrix[11] = uint(argChk_Num(t, "gtob", 0)), e.matrix[12] = uint(argChk_Num(t, "btob", 1)), e.matrix[13] = uint(argChk_Num(t, "atob", 0)), e.matrix[14] = uint(argChk_Num(t, "pb", 0)), e.matrix[15] = uint(argChk_Num(t, "rtoa", 0)), e.matrix[16] = uint(argChk_Num(t, "gtoa", 0)), e.matrix[17] = uint(argChk_Num(t, "btoa", 0)), e.matrix[18] = uint(argChk_Num(t, "atoa", 1)), e.matrix[19] = uint(argChk_Num(t, "pa", 0));
      return e;
    },
    black_and_white: (t) => {
      const e = new ColorMatrixFilter();
      return e.blackAndWhite(
        argChk_Boolean(t, "multiply", !1)
        // true の場合、現在の行列と行列を乗算
      ), e;
    },
    brightness: (t) => {
      const e = new ColorMatrixFilter();
      return e.brightness(
        argChk_Num(t, "b", 0.5),
        // 明るさの値 (0 ～ 1、0 は黒)
        argChk_Boolean(t, "multiply", !1)
        // true の場合、現在の行列と行列を乗算
      ), e;
    },
    browni: (t) => {
      const e = new ColorMatrixFilter();
      return e.browni(
        argChk_Boolean(t, "multiply", !0)
        // true の場合、現在の行列と行列を乗算
      ), e;
    },
    color_tone: (t) => {
      const e = new ColorMatrixFilter();
      return e.colorTone(
        argChk_Num(t, "desaturation", 0.5),
        argChk_Num(t, "toned", 0.5),
        argChk_Num(t, "light_color", 16770432),
        argChk_Num(t, "dark_color", 16770432),
        argChk_Boolean(t, "multiply", !1)
        // true の場合、現在の行列と行列を乗算
      ), e;
    },
    contrast: (t) => {
      const e = new ColorMatrixFilter();
      return e.contrast(
        argChk_Num(t, "amount", 0.5),
        // コントラストの値 (0-1)
        argChk_Boolean(t, "multiply", !1)
        // true の場合、現在の行列と行列を乗算
      ), e;
    },
    grayscale: (t) => {
      const e = new ColorMatrixFilter();
      return e.grayscale(
        argChk_Num(t, "scale", 0.5),
        // グレーの値 (0 ～ 1、0 は黒)
        argChk_Boolean(t, "multiply", !1)
        // true の場合、現在の行列と行列を乗算
      ), e;
    },
    hue: (t) => {
      const e = new ColorMatrixFilter();
      return e.hue(
        argChk_Num(t, "f_rotation", 90),
        // 0だと変化なしで分かりづらいので
        // 度単位
        argChk_Boolean(t, "multiply", !1)
        // true の場合、現在の行列と行列を乗算
      ), e;
    },
    kodachrome: (t) => {
      const e = new ColorMatrixFilter();
      return e.kodachrome(
        argChk_Boolean(t, "multiply", !0)
        // true の場合、現在の行列と行列を乗算
      ), e;
    },
    lsd: (t) => {
      const e = new ColorMatrixFilter();
      return e.lsd(
        argChk_Boolean(t, "multiply", !1)
        // true の場合、現在の行列と行列を乗算
      ), e;
    },
    negative: (t) => {
      const e = new ColorMatrixFilter();
      return e.negative(
        argChk_Boolean(t, "multiply", !1)
        // true の場合、現在の行列と行列を乗算
      ), e;
    },
    night: (t) => {
      const e = new ColorMatrixFilter();
      return e.night(
        argChk_Num(t, "intensity", 0.5),
        // 夜の効果の強さ
        argChk_Boolean(t, "multiply", !1)
        // true の場合、現在の行列と行列を乗算
      ), e;
    },
    polaroid: (t) => {
      const e = new ColorMatrixFilter();
      return e.polaroid(
        argChk_Boolean(t, "multiply", !1)
        // true の場合、現在の行列と行列を乗算
      ), e;
    },
    predator: (t) => {
      const e = new ColorMatrixFilter();
      return e.predator(
        argChk_Num(t, "amount", 0.5),
        // 捕食者は自分の将来の犠牲者をどれほど感じているか
        argChk_Boolean(t, "multiply", !1)
        // true の場合、現在の行列と行列を乗算
      ), e;
    },
    saturate: (t) => {
      const e = new ColorMatrixFilter();
      return e.saturate(
        argChk_Num(t, "amount", 0.5),
        // 飽和量(0～1)
        argChk_Boolean(t, "multiply", !1)
        // true の場合、現在の行列と行列を乗算
      ), e;
    },
    sepia: (t) => {
      const e = new ColorMatrixFilter();
      return e.sepia(
        argChk_Boolean(t, "multiply", !1)
        // true の場合、現在の行列と行列を乗算
      ), e;
    },
    technicolor: (t) => {
      const e = new ColorMatrixFilter();
      return e.technicolor(
        argChk_Boolean(t, "multiply", !0)
        // true の場合、現在の行列と行列を乗算
      ), e;
    },
    tint: (t) => {
      const e = new ColorMatrixFilter();
      return e.tint(
        argChk_Num(t, "f_color", 8947848),
        // 色合いの色。 これは 16 進数値です。
        argChk_Boolean(t, "multiply", !1)
        // true の場合、現在の行列と行列を乗算
      ), e;
    },
    to_bgr: (t) => {
      const e = new ColorMatrixFilter();
      return e.toBGR(
        argChk_Boolean(t, "multiply", !1)
        // true の場合、現在の行列と行列を乗算
      ), e;
    },
    vintage: (t) => {
      const e = new ColorMatrixFilter();
      return e.vintage(
        argChk_Boolean(t, "multiply", !0)
        // true の場合、現在の行列と行列を乗算
      ), e;
    }
  };
  static setBlendmode(t, e) {
    const { blendmode: r } = e;
    if (!r) return;
    const a = Layer.getBlendmodeNum(r);
    t instanceof Sprite && (t.blendMode = a);
    for (const s of t.children)
      s instanceof Sprite && (s.blendMode = a);
  }
  static getBlendmodeNum(t) {
    if (!t) return BLEND_MODES.NORMAL;
    const e = Layer.#t[t];
    if (e !== void 0) return e;
    throw `${t} はサポートされない blendmode です`;
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
  static getNum2Blendmode(t) {
    return Layer.#e[t] ?? "normal";
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
    this.ctn.alpha = 1, this.ctn.blendMode = BLEND_MODES.NORMAL, this.ctn.pivot.set(0, 0), this.ctn.angle = 0, this.ctn.scale.set(1, 1), argChk_Boolean(t, "clear_filter", !1) && (this.ctn.filters = null, this.aFltHArg = []);
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
    this.name = t.name, this.clearLay({ clear_filter: !0 }), this.ctn.alpha = t.alpha, this.ctn.blendMode = t.blendMode, this.ctn.angle = t.rotation, this.ctn.scale.set(t.scale_x, t.scale_y), this.ctn.pivot.set(t.pivot_x, t.pivot_y), this.ctn.position.set(t.x, t.y), this.ctn.visible = t.visible, this.aFltHArg = t.aFltHArg ?? [], this.ctn.filters = this.aFltHArg.length === 0 ? null : this.aFltHArg.map((r) => Layer.bldFilters(r));
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
  static setXY(t, e, r, a = !1, s = !1) {
    if (e.pos) {
      Layer.setXYByPos(t, e.pos, r);
      return;
    }
    const o = t.getBounds(), u = r.scale.x < 0 ? -r.scale.x : r.scale.x, h = u === 1 ? o.width : o.width * u, l = r.scale.y < 0 ? -r.scale.y : r.scale.y, c = l === 1 ? o.height : o.height * l;
    let v = r.x;
    "left" in e ? (v = argChk_Num(e, "left", 0), v > -1 && v < 1 && (v *= CmnLib.stageW)) : "center" in e ? (v = argChk_Num(e, "center", 0), v > -1 && v < 1 && (v *= CmnLib.stageW), v = v - (s ? h / 3 : h) / 2) : "right" in e ? (v = argChk_Num(e, "right", 0), v > -1 && v < 1 && (v *= CmnLib.stageW), v = v - (s ? h / 3 : h)) : "s_right" in e && (v = argChk_Num(e, "s_right", 0), v > -1 && v < 1 && (v *= CmnLib.stageW), v = CmnLib.stageW - v - (s ? h / 3 : h)), r.x = int(r.scale.x < 0 ? v + (s ? h / 3 : h) : v);
    let d = r.y;
    "top" in e ? (d = argChk_Num(e, "top", 0), d > -1 && d < 1 && (d *= CmnLib.stageH)) : "middle" in e ? (d = argChk_Num(e, "middle", 0), d > -1 && d < 1 && (d *= CmnLib.stageH), d = d - c / 2) : "bottom" in e ? (d = argChk_Num(e, "bottom", 0), d > -1 && d < 1 && (d *= CmnLib.stageH), d = d - c) : "s_bottom" in e && (d = argChk_Num(e, "s_bottom", 0), d > -1 && d < 1 && (d *= CmnLib.stageH), d = CmnLib.stageH - d - c), r.y = int(r.scale.y < 0 ? d + c : d), a && !("left" in e) && !("center" in e) && !("right" in e) && !("s_right" in e) && !("top" in e) && !("middle" in e) && !("bottom" in e) && !("s_bottom" in e) && Layer.setXYByPos(t, "c", r);
  }
  static setXYByPos(t, e, r) {
    if (e === "stay") return;
    if (t === void 0) throw "setXYByPos base === undefined";
    if (r === void 0) throw "setXYByPos result === undefined";
    const a = t.getBounds(), s = r.scale.x < 0 ? -r.scale.x : r.scale.x, o = s === 1 ? a.width : a.width * s, u = r.scale.y < 0 ? -r.scale.y : r.scale.y, h = u === 1 ? a.height : a.height * u;
    let l = 0;
    !e || e === "c" ? l = CmnLib.stageW * 0.5 : e === "r" ? l = CmnLib.stageW - o * 0.5 : e === "l" ? l = o * 0.5 : l = int(e), r.x = int(l - o * 0.5), r.y = CmnLib.stageH - h, r.scale.x < 0 && (r.x += o), r.scale.y < 0 && (r.y += h);
  }
  static setXYCenter(t) {
    const e = t.getBounds();
    t.x = (CmnLib.stageW - e.width) * 0.5, t.y = (CmnLib.stageH - e.height) * 0.5;
  }
}
export {
  AnimatedSprite as A,
  BLEND_MODES as B,
  Container as C,
  DebugMng as D,
  EventListenerCtn as E,
  autoDetectRenderer as F,
  Graphics as G,
  Filter as H,
  Grammar as I,
  AnalyzeTagArg as J,
  tagToken2Name as K,
  Loader as L,
  tagToken2Name_Args as M,
  i as N,
  Ticker as O,
  PROTOCOL_USERDATA as P,
  extensions as Q,
  Rectangle as R,
  SysBase as S,
  TextureCache as T,
  SysWeb as U,
  argChk_Boolean as a,
  argChk_Num as b,
  EVNM_KEY as c,
  CmnLib as d,
  addStyle as e,
  clearTextureCache as f,
  getDateStr as g,
  EVNM_CLICK as h,
  int as i,
  EVNM_BUTTON as j,
  SEARCH_PATH_ARG_EXT as k,
  LoaderResource as l,
  mesErrJSON as m,
  Texture as n,
  getFn as o,
  platform as p,
  Sprite as q,
  Layer as r,
  RenderTexture as s,
  TextStyle as t,
  uint as u,
  Text as v,
  initStyle as w,
  argChk_Color as x,
  parseColor as y,
  PROTOCOL_DL as z
};
//# sourceMappingURL=web2.js.map
