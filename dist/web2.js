var commonjsGlobal = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function getDefaultExportFromCjs(a) {
  return a && a.__esModule && Object.prototype.hasOwnProperty.call(a, "default") ? a.default : a;
}
function getAugmentedNamespace(a) {
  if (a.__esModule) return a;
  var e = a.default;
  if (typeof e == "function") {
    var t = function r() {
      return this instanceof r ? Reflect.construct(e, arguments, this.constructor) : e.apply(this, arguments);
    };
    t.prototype = e.prototype;
  } else t = {};
  return Object.defineProperty(t, "__esModule", { value: !0 }), Object.keys(a).forEach(function(r) {
    var s = Object.getOwnPropertyDescriptor(a, r);
    Object.defineProperty(t, r, s.get ? s : {
      enumerable: !0,
      get: function() {
        return a[r];
      }
    });
  }), t;
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
  return hasRequiredPlatform || (hasRequiredPlatform = 1, function(a, e) {
    (function() {
      var t = {
        function: !0,
        object: !0
      }, r = t[typeof window] && window || this, s = e, o = a && !a.nodeType && a, u = s && o && typeof commonjsGlobal == "object" && commonjsGlobal;
      u && (u.global === u || u.window === u || u.self === u) && (r = u);
      var h = Math.pow(2, 53) - 1, l = /\bOpera/, c = Object.prototype, d = c.hasOwnProperty, _ = c.toString;
      function v(M) {
        return M = String(M), M.charAt(0).toUpperCase() + M.slice(1);
      }
      function y(M, F, k) {
        var V = {
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
        return F && k && /^Win/i.test(M) && !/^Windows Phone /i.test(M) && (V = V[/[\d.]+$/.exec(M)]) && (M = "Windows " + V), M = String(M), F && k && (M = M.replace(RegExp(F, "i"), k)), M = g(
          M.replace(/ ce$/i, " CE").replace(/\bhpw/i, "web").replace(/\bMacintosh\b/, "Mac OS").replace(/_PowerPC\b/i, " OS").replace(/\b(OS X) [^ \d]+/i, "$1").replace(/\bMac (OS X)\b/, "$1").replace(/\/(\d)/, " $1").replace(/_/g, ".").replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, "").replace(/\bx86\.64\b/gi, "x86_64").replace(/\b(Windows Phone) OS\b/, "$1").replace(/\b(Chrome OS \w+) [\d.]+\b/, "$1").split(" on ")[0]
        ), M;
      }
      function b(M, F) {
        var k = -1, V = M ? M.length : 0;
        if (typeof V == "number" && V > -1 && V <= h)
          for (; ++k < V; )
            F(M[k], k, M);
        else
          m(M, F);
      }
      function g(M) {
        return M = T(M), /^(?:webOS|i(?:OS|P))/.test(M) ? M : v(M);
      }
      function m(M, F) {
        for (var k in M)
          d.call(M, k) && F(M[k], k, M);
      }
      function E(M) {
        return M == null ? v(M) : _.call(M).slice(8, -1);
      }
      function S(M, F) {
        var k = M != null ? typeof M[F] : "number";
        return !/^(?:boolean|number|string|undefined)$/.test(k) && (k == "object" ? !!M[F] : !0);
      }
      function P(M) {
        return String(M).replace(/([ -])(?!$)/g, "$1?");
      }
      function L(M, F) {
        var k = null;
        return b(M, function(V, X) {
          k = F(k, V, X, M);
        }), k;
      }
      function T(M) {
        return String(M).replace(/^ +| +$/g, "");
      }
      function I(M) {
        var F = r, k = M && typeof M == "object" && E(M) != "String";
        k && (F = M, M = null);
        var V = F.navigator || {}, X = V.userAgent || "";
        M || (M = X);
        var ne = k ? !!V.likeChrome : /\bChrome\b/.test(M) && !/internal|\n/i.test(_.toString()), oe = "Object", K = k ? oe : "ScriptBridgingProxyObject", R = k ? oe : "Environment", O = k && F.java ? "JavaPackage" : E(F.java), A = k ? oe : "RuntimeObject", B = /\bJava/.test(O) && F.java, N = B && E(F.environment) == R, D = B ? "a" : "α", G = B ? "b" : "β", U = F.document || {}, Y = F.operamini || F.opera, J = l.test(J = k && Y ? Y["[[Class]]"] : E(Y)) ? J : Y = null, C, te = M, Z = [], se = null, ee = M == X, q = ee && Y && typeof Y.version == "function" && Y.version(), ue, ae = me([
          { label: "EdgeHTML", pattern: "Edge" },
          "Trident",
          { label: "WebKit", pattern: "AppleWebKit" },
          "iCab",
          "Presto",
          "NetFront",
          "Tasman",
          "KHTML",
          "Gecko"
        ]), z = Ee([
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
        ]), Q = we([
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
        ]), ie = be({
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
        }), W = Pe([
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
        function me(ve) {
          return L(ve, function(fe, le) {
            return fe || RegExp("\\b" + (le.pattern || P(le)) + "\\b", "i").exec(M) && (le.label || le);
          });
        }
        function be(ve) {
          return L(ve, function(fe, le, ye) {
            return fe || (le[Q] || le[/^[a-z]+(?: +[a-z]+\b)*/i.exec(Q)] || RegExp("\\b" + P(ye) + "(?:\\b|\\w*\\d)", "i").exec(M)) && ye;
          });
        }
        function Ee(ve) {
          return L(ve, function(fe, le) {
            return fe || RegExp("\\b" + (le.pattern || P(le)) + "\\b", "i").exec(M) && (le.label || le);
          });
        }
        function Pe(ve) {
          return L(ve, function(fe, le) {
            var ye = le.pattern || P(le);
            return !fe && (fe = RegExp("\\b" + ye + "(?:/[\\d.]+|[ \\w.]*)", "i").exec(M)) && (fe = y(fe, ye, le.label || le)), fe;
          });
        }
        function we(ve) {
          return L(ve, function(fe, le) {
            var ye = le.pattern || P(le);
            return !fe && (fe = RegExp("\\b" + ye + " *\\d+[.\\w_]*", "i").exec(M) || RegExp("\\b" + ye + " *\\w+-[\\w]*", "i").exec(M) || RegExp("\\b" + ye + "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)", "i").exec(M)) && ((fe = String(le.label && !RegExp(ye, "i").test(le.label) ? le.label : fe).split("/"))[1] && !/[\d.]+/.test(fe[0]) && (fe[0] += " " + fe[1]), le = le.label || le, fe = g(fe[0].replace(RegExp(ye, "i"), le).replace(RegExp("; *(?:" + le + "[_-])?", "i"), " ").replace(RegExp("(" + le + ")[-_.]?(\\w)", "i"), "$1 $2"))), fe;
          });
        }
        function Re(ve) {
          return L(ve, function(fe, le) {
            return fe || (RegExp(le + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)", "i").exec(M) || 0)[1] || null;
          });
        }
        function Me() {
          return this.description || "";
        }
        if (ae && (ae = [ae]), /\bAndroid\b/.test(W) && !Q && (C = /\bAndroid[^;]*;(.*?)(?:Build|\) AppleWebKit)\b/i.exec(M)) && (Q = T(C[1]).replace(/^[a-z]{2}-[a-z]{2};\s*/i, "") || null), ie && !Q ? Q = we([ie]) : ie && Q && (Q = Q.replace(RegExp("^(" + P(ie) + ")[-_.\\s]", "i"), ie + " ").replace(RegExp("^(" + P(ie) + ")[-_.]?(\\w)", "i"), ie + " $2")), (C = /\bGoogle TV\b/.exec(Q)) && (Q = C[0]), /\bSimulator\b/i.test(M) && (Q = (Q ? Q + " " : "") + "Simulator"), z == "Opera Mini" && /\bOPiOS\b/.test(M) && Z.push("running in Turbo/Uncompressed mode"), z == "IE" && /\blike iPhone OS\b/.test(M) ? (C = I(M.replace(/like iPhone OS/, "")), ie = C.manufacturer, Q = C.product) : /^iP/.test(Q) ? (z || (z = "Safari"), W = "iOS" + ((C = / OS ([\d_]+)/i.exec(M)) ? " " + C[1].replace(/_/g, ".") : "")) : z == "Konqueror" && /^Linux\b/i.test(W) ? W = "Kubuntu" : ie && ie != "Google" && (/Chrome/.test(z) && !/\bMobile Safari\b/i.test(M) || /\bVita\b/.test(Q)) || /\bAndroid\b/.test(W) && /^Chrome/.test(z) && /\bVersion\//i.test(M) ? (z = "Android Browser", W = /\bAndroid\b/.test(W) ? W : "Android") : z == "Silk" ? (/\bMobi/i.test(M) || (W = "Android", Z.unshift("desktop mode")), /Accelerated *= *true/i.test(M) && Z.unshift("accelerated")) : z == "UC Browser" && /\bUCWEB\b/.test(M) ? Z.push("speed mode") : z == "PaleMoon" && (C = /\bFirefox\/([\d.]+)\b/.exec(M)) ? Z.push("identifying as Firefox " + C[1]) : z == "Firefox" && (C = /\b(Mobile|Tablet|TV)\b/i.exec(M)) ? (W || (W = "Firefox OS"), Q || (Q = C[1])) : !z || (C = !/\bMinefield\b/i.test(M) && /\b(?:Firefox|Safari)\b/.exec(z)) ? (z && !Q && /[\/,]|^[^(]+?\)/.test(M.slice(M.indexOf(C + "/") + 8)) && (z = null), (C = Q || ie || W) && (Q || ie || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(W)) && (z = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(W) ? W : C) + " Browser")) : z == "Electron" && (C = (/\bChrome\/([\d.]+)\b/.exec(M) || 0)[1]) && Z.push("Chromium " + C), q || (q = Re([
          "(?:Cloud9|CriOS|CrMo|Edge|Edg|EdgA|EdgiOS|FxiOS|HeadlessChrome|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$)|UCBrowser|YaBrowser)",
          "Version",
          P(z),
          "(?:Firefox|Minefield|NetFront)"
        ])), (C = ae == "iCab" && parseFloat(q) > 3 && "WebKit" || /\bOpera\b/.test(z) && (/\bOPR\b/.test(M) ? "Blink" : "Presto") || /\b(?:Midori|Nook|Safari)\b/i.test(M) && !/^(?:Trident|EdgeHTML)$/.test(ae) && "WebKit" || !ae && /\bMSIE\b/i.test(M) && (W == "Mac OS" ? "Tasman" : "Trident") || ae == "WebKit" && /\bPlayStation\b(?! Vita\b)/i.test(z) && "NetFront") && (ae = [C]), z == "IE" && (C = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(M) || 0)[1]) ? (z += " Mobile", W = "Windows Phone " + (/\+$/.test(C) ? C : C + ".x"), Z.unshift("desktop mode")) : /\bWPDesktop\b/i.test(M) ? (z = "IE Mobile", W = "Windows Phone 8.x", Z.unshift("desktop mode"), q || (q = (/\brv:([\d.]+)/.exec(M) || 0)[1])) : z != "IE" && ae == "Trident" && (C = /\brv:([\d.]+)/.exec(M)) && (z && Z.push("identifying as " + z + (q ? " " + q : "")), z = "IE", q = C[1]), ee) {
          if (S(F, "global"))
            if (B && (C = B.lang.System, te = C.getProperty("os.arch"), W = W || C.getProperty("os.name") + " " + C.getProperty("os.version")), N) {
              try {
                q = F.require("ringo/engine").version.join("."), z = "RingoJS";
              } catch {
                (C = F.system) && C.global.system == F.system && (z = "Narwhal", W || (W = C[0].os || null));
              }
              z || (z = "Rhino");
            } else typeof F.process == "object" && !F.process.browser && (C = F.process) && (typeof C.versions == "object" && (typeof C.versions.electron == "string" ? (Z.push("Node " + C.versions.node), z = "Electron", q = C.versions.electron) : typeof C.versions.nw == "string" && (Z.push("Chromium " + q, "Node " + C.versions.node), z = "NW.js", q = C.versions.nw)), z || (z = "Node.js", te = C.arch, W = C.platform, q = /[\d.]+/.exec(C.version), q = q ? q[0] : null));
          else E(C = F.runtime) == K ? (z = "Adobe AIR", W = C.flash.system.Capabilities.os) : E(C = F.phantom) == A ? (z = "PhantomJS", q = (C = C.version || null) && C.major + "." + C.minor + "." + C.patch) : typeof U.documentMode == "number" && (C = /\bTrident\/(\d+)/i.exec(M)) ? (q = [q, U.documentMode], (C = +C[1] + 4) != q[1] && (Z.push("IE " + q[1] + " mode"), ae && (ae[1] = ""), q[1] = C), q = z == "IE" ? String(q[1].toFixed(1)) : q[0]) : typeof U.documentMode == "number" && /^(?:Chrome|Firefox)\b/.test(z) && (Z.push("masking as " + z + " " + q), z = "IE", q = "11.0", ae = ["Trident"], W = "Windows");
          W = W && g(W);
        }
        if (q && (C = /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(q) || /(?:alpha|beta)(?: ?\d)?/i.exec(M + ";" + (ee && V.appMinorVersion)) || /\bMinefield\b/i.test(M) && "a") && (se = /b/i.test(C) ? "beta" : "alpha", q = q.replace(RegExp(C + "\\+?$"), "") + (se == "beta" ? G : D) + (/\d+\+?/.exec(C) || "")), z == "Fennec" || z == "Firefox" && /\b(?:Android|Firefox OS|KaiOS)\b/.test(W))
          z = "Firefox Mobile";
        else if (z == "Maxthon" && q)
          q = q.replace(/\.[\d.]+/, ".x");
        else if (/\bXbox\b/i.test(Q))
          Q == "Xbox 360" && (W = null), Q == "Xbox 360" && /\bIEMobile\b/.test(M) && Z.unshift("mobile mode");
        else if ((/^(?:Chrome|IE|Opera)$/.test(z) || z && !Q && !/Browser|Mobi/.test(z)) && (W == "Windows CE" || /Mobi/i.test(M)))
          z += " Mobile";
        else if (z == "IE" && ee)
          try {
            F.external === null && Z.unshift("platform preview");
          } catch {
            Z.unshift("embedded");
          }
        else (/\bBlackBerry\b/.test(Q) || /\bBB10\b/.test(M)) && (C = (RegExp(Q.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec(M) || 0)[1] || q) ? (C = [C, /BB10/.test(M)], W = (C[1] ? (Q = null, ie = "BlackBerry") : "Device Software") + " " + C[0], q = null) : this != m && Q != "Wii" && (ee && Y || /Opera/.test(z) && /\b(?:MSIE|Firefox)\b/i.test(M) || z == "Firefox" && /\bOS X (?:\d+\.){2,}/.test(W) || z == "IE" && (W && !/^Win/.test(W) && q > 5.5 || /\bWindows XP\b/.test(W) && q > 8 || q == 8 && !/\bTrident\b/.test(M))) && !l.test(C = I.call(m, M.replace(l, "") + ";")) && C.name && (C = "ing as " + C.name + ((C = C.version) ? " " + C : ""), l.test(z) ? (/\bIE\b/.test(C) && W == "Mac OS" && (W = null), C = "identify" + C) : (C = "mask" + C, J ? z = g(J.replace(/([a-z])([A-Z])/g, "$1 $2")) : z = "Opera", /\bIE\b/.test(C) && (W = null), ee || (q = null)), ae = ["Presto"], Z.push(C));
        (C = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(M) || 0)[1]) && (C = [parseFloat(C.replace(/\.(\d)$/, ".0$1")), C], z == "Safari" && C[1].slice(-1) == "+" ? (z = "WebKit Nightly", se = "alpha", q = C[1].slice(0, -1)) : (q == C[1] || q == (C[2] = (/\bSafari\/([\d.]+\+?)/i.exec(M) || 0)[1])) && (q = null), C[1] = (/\b(?:Headless)?Chrome\/([\d.]+)/i.exec(M) || 0)[1], C[0] == 537.36 && C[2] == 537.36 && parseFloat(C[1]) >= 28 && ae == "WebKit" && (ae = ["Blink"]), !ee || !ne && !C[1] ? (ae && (ae[1] = "like Safari"), C = (C = C[0], C < 400 ? 1 : C < 500 ? 2 : C < 526 ? 3 : C < 533 ? 4 : C < 534 ? "4+" : C < 535 ? 5 : C < 537 ? 6 : C < 538 ? 7 : C < 601 ? 8 : C < 602 ? 9 : C < 604 ? 10 : C < 606 ? 11 : C < 608 ? 12 : "12")) : (ae && (ae[1] = "like Chrome"), C = C[1] || (C = C[0], C < 530 ? 1 : C < 532 ? 2 : C < 532.05 ? 3 : C < 533 ? 4 : C < 534.03 ? 5 : C < 534.07 ? 6 : C < 534.1 ? 7 : C < 534.13 ? 8 : C < 534.16 ? 9 : C < 534.24 ? 10 : C < 534.3 ? 11 : C < 535.01 ? 12 : C < 535.02 ? "13+" : C < 535.07 ? 15 : C < 535.11 ? 16 : C < 535.19 ? 17 : C < 536.05 ? 18 : C < 536.1 ? 19 : C < 537.01 ? 20 : C < 537.11 ? "21+" : C < 537.13 ? 23 : C < 537.18 ? 24 : C < 537.24 ? 25 : C < 537.36 ? 26 : ae != "Blink" ? "27" : "28")), ae && (ae[1] += " " + (C += typeof C == "number" ? ".x" : /[.+]/.test(C) ? "" : "+")), z == "Safari" && (!q || parseInt(q) > 45) ? q = C : z == "Chrome" && /\bHeadlessChrome/i.test(M) && Z.unshift("headless")), z == "Opera" && (C = /\bzbov|zvav$/.exec(W)) ? (z += " ", Z.unshift("desktop mode"), C == "zvav" ? (z += "Mini", q = null) : z += "Mobile", W = W.replace(RegExp(" *" + C + "$"), "")) : z == "Safari" && /\bChrome\b/.exec(ae && ae[1]) ? (Z.unshift("desktop mode"), z = "Chrome Mobile", q = null, /\bOS X\b/.test(W) ? (ie = "Apple", W = "iOS 4.3+") : W = null) : /\bSRWare Iron\b/.test(z) && !q && (q = Re("Chrome")), q && q.indexOf(C = /[\d.]+$/.exec(W)) == 0 && M.indexOf("/" + C + "-") > -1 && (W = T(W.replace(C, ""))), W && W.indexOf(z) != -1 && !RegExp(z + " OS").test(W) && (W = W.replace(RegExp(" *" + P(z) + " *"), "")), ae && !/\b(?:Avant|Nook)\b/.test(z) && (/Browser|Lunascape|Maxthon/.test(z) || z != "Safari" && /^iOS/.test(W) && /\bSafari\b/.test(ae[1]) || /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|SRWare Iron|Vivaldi|Web)/.test(z) && ae[1]) && (C = ae[ae.length - 1]) && Z.push(C), Z.length && (Z = ["(" + Z.join("; ") + ")"]), ie && Q && Q.indexOf(ie) < 0 && Z.push("on " + ie), Q && Z.push((/^on /.test(Z[Z.length - 1]) ? "" : "on ") + Q), W && (C = / ([\d.+]+)$/.exec(W), ue = C && W.charAt(W.length - C[0].length - 1) == "/", W = {
          architecture: 32,
          family: C && !ue ? W.replace(C[0], "") : W,
          version: C ? C[1] : null,
          toString: function() {
            var ve = this.version;
            return this.family + (ve && !ue ? " " + ve : "") + (this.architecture == 64 ? " 64-bit" : "");
          }
        }), (C = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(te)) && !/\bi686\b/i.test(te) ? (W && (W.architecture = 64, W.family = W.family.replace(RegExp(" *" + C), "")), z && (/\bWOW64\b/i.test(M) || ee && /\w(?:86|32)$/.test(V.cpuClass || V.platform) && !/\bWin64; x64\b/i.test(M)) && Z.unshift("32-bit")) : W && /^OS X/.test(W.family) && z == "Chrome" && parseFloat(q) >= 39 && (W.architecture = 64), M || (M = null);
        var _e = {};
        return _e.description = M, _e.layout = ae && ae[0], _e.manufacturer = ie, _e.name = z, _e.prerelease = se, _e.product = Q, _e.ua = M, _e.version = z && q, _e.os = W || {
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
        }, _e.parse = I, _e.toString = Me, _e.version && Z.unshift(q), _e.name && Z.unshift(z), W && z && !(W == String(W).split(" ")[0] && (W == z.split(" ")[0] || Q)) && Z.push(Q ? "(" + W + ")" : "on " + W), Z.length && (_e.description = Z.join(" ")), _e;
      }
      var w = I();
      s && o ? m(w, function(M, F) {
        s[F] = M;
      }) : r.platform = w;
    }).call(platform$1);
  }(platform$2, platform$2.exports)), platform$2.exports;
}
var platformExports = requirePlatform();
const platform = /* @__PURE__ */ getDefaultExportFromCjs(platformExports);
function int(a) {
  return parseInt(String(a), 10);
}
function uint(a) {
  const e = parseInt(String(a), 10);
  return e < 0 ? -e : e;
}
"toInt" in String.prototype || (String.prototype.toInt = function() {
  return int(this);
});
"toUint" in String.prototype || (String.prototype.toUint = function() {
  const a = int(this);
  return a < 0 ? -a : a;
});
function getDateStr(a = "/", e = " ", t = ":", r = "") {
  const s = /* @__PURE__ */ new Date();
  return s.getFullYear() + a + String(100 + s.getMonth() + 1).slice(1, 3) + a + String(100 + s.getDate()).slice(1, 3) + e + String(100 + s.getHours()).slice(1, 3) + t + String(100 + s.getMinutes()).slice(1, 3) + (r === "" ? "" : r + String(s.getMilliseconds()));
}
const css_key4del = "/* SKYNovel */";
function initStyle() {
  const a = document.getElementsByTagName("head")[0], e = a.children.length;
  for (let t = e - 1; t >= 0; --t) {
    const r = a.children[t];
    r instanceof HTMLStyleElement && r.innerText.startsWith(css_key4del) && a.removeChild(r);
  }
}
function addStyle(a) {
  const e = document.createElement("style");
  e.innerHTML = css_key4del + a, document.getElementsByTagName("head")[0].appendChild(e);
}
function argChk_Num(a, e, t) {
  const r = a[e];
  if (!(e in a)) {
    if (isNaN(t)) throw `[${a[":タグ名"]}]属性 ${e} は必須です`;
    return a[e] = t, t;
  }
  const s = String(r).startsWith("0x") ? parseInt(r) : parseFloat(r);
  if (isNaN(s)) throw `[${a[":タグ名"]}]属性 ${e} の値【${r}】が数値ではありません`;
  return a[e] = s;
}
function argChk_Boolean(a, e, t) {
  if (!(e in a)) return a[e] = t;
  const r = a[e];
  if (r === null) return !1;
  const s = String(r);
  return a[e] = s === "false" ? !1 : !!s;
}
function parseColor(a) {
  if (a.startsWith("#")) return parseInt(a.slice(1), 16);
  const e = Number(a);
  if (!isNaN(e)) return e;
  if (a === "black") return 0;
  CmnLib.cc4ColorName.fillStyle = a;
  const t = CmnLib.cc4ColorName.fillStyle;
  if (t === "#000000") throw `色名前 ${a} が異常です`;
  return parseInt(t.slice(1), 16);
}
function argChk_Color(a, e, t) {
  const r = a[e];
  return r ? a[e] = parseColor(String(r)) : a[e] = t;
}
const REG_ERRMES_JSON = /JSON at position (\d+)$/;
function mesErrJSON(a, e = "", t = "") {
  const r = (t.match(REG_ERRMES_JSON) ?? ["", ""])[1];
  return `[${a[":タグ名"]}] ${e} 属性の解析エラー : ${t}
${a[e]}${r ? `
${"^".padStart(Number(r))}` : ""}`;
}
const REG_FN = /^[^\/\.]+$|[^\/]+(?=\.)/;
function getFn(a) {
  return (a.match(REG_FN) ?? [""])[0];
}
const REG_EXT = /\.([^\.]+)$/;
function getExt(a) {
  return (a.match(REG_EXT) ?? ["", ""])[1];
}
class CmnLib {
  static stageW = 0;
  static stageH = 0;
  static debugLog = !1;
  static isSafari = platformExports.name === "Safari";
  static isFirefox = platformExports.name === "Firefox";
  static isMac = /OS X/.test(platformExports.os?.family ?? "");
  static isWin = /Windows/.test(platformExports.os?.family ?? "");
  static isMobile = !/(Windows|OS X)/.test(platformExports.os?.family ?? "");
  static hDip = {};
  static isDbg = !1;
  static isPackaged = !1;
  static isDarkMode = !1;
  static cc4ColorName;
}
function finallyConstructor(a) {
  var e = this.constructor;
  return this.then(
    function(t) {
      return e.resolve(a()).then(function() {
        return t;
      });
    },
    function(t) {
      return e.resolve(a()).then(function() {
        return e.reject(t);
      });
    }
  );
}
function allSettled(a) {
  var e = this;
  return new e(function(t, r) {
    if (!(a && typeof a.length < "u"))
      return r(
        new TypeError(
          typeof a + " " + a + " is not iterable(cannot read property Symbol(Symbol.iterator))"
        )
      );
    var s = Array.prototype.slice.call(a);
    if (s.length === 0) return t([]);
    var o = s.length;
    function u(l, c) {
      if (c && (typeof c == "object" || typeof c == "function")) {
        var d = c.then;
        if (typeof d == "function") {
          d.call(
            c,
            function(_) {
              u(l, _);
            },
            function(_) {
              s[l] = { status: "rejected", reason: _ }, --o === 0 && t(s);
            }
          );
          return;
        }
      }
      s[l] = { status: "fulfilled", value: c }, --o === 0 && t(s);
    }
    for (var h = 0; h < s.length; h++)
      u(h, s[h]);
  });
}
function AggregateError$1(a, e) {
  this.name = "AggregateError", this.errors = a, this.message = e || "";
}
AggregateError$1.prototype = Error.prototype;
function any(a) {
  var e = this;
  return new e(function(t, r) {
    if (!(a && typeof a.length < "u"))
      return r(new TypeError("Promise.any accepts an array"));
    var s = Array.prototype.slice.call(a);
    if (s.length === 0) return r();
    for (var o = [], u = 0; u < s.length; u++)
      try {
        e.resolve(s[u]).then(t).catch(function(h) {
          o.push(h), o.length === s.length && r(
            new AggregateError$1(
              o,
              "All promises were rejected"
            )
          );
        });
      } catch (h) {
        r(h);
      }
  });
}
var setTimeoutFunc = setTimeout;
function isArray(a) {
  return !!(a && typeof a.length < "u");
}
function noop() {
}
function bind(a, e) {
  return function() {
    a.apply(e, arguments);
  };
}
function Promise$1(a) {
  if (!(this instanceof Promise$1))
    throw new TypeError("Promises must be constructed via new");
  if (typeof a != "function") throw new TypeError("not a function");
  this._state = 0, this._handled = !1, this._value = void 0, this._deferreds = [], doResolve(a, this);
}
function handle(a, e) {
  for (; a._state === 3; )
    a = a._value;
  if (a._state === 0) {
    a._deferreds.push(e);
    return;
  }
  a._handled = !0, Promise$1._immediateFn(function() {
    var t = a._state === 1 ? e.onFulfilled : e.onRejected;
    if (t === null) {
      (a._state === 1 ? resolve : reject)(e.promise, a._value);
      return;
    }
    var r;
    try {
      r = t(a._value);
    } catch (s) {
      reject(e.promise, s);
      return;
    }
    resolve(e.promise, r);
  });
}
function resolve(a, e) {
  try {
    if (e === a)
      throw new TypeError("A promise cannot be resolved with itself.");
    if (e && (typeof e == "object" || typeof e == "function")) {
      var t = e.then;
      if (e instanceof Promise$1) {
        a._state = 3, a._value = e, finale(a);
        return;
      } else if (typeof t == "function") {
        doResolve(bind(t, e), a);
        return;
      }
    }
    a._state = 1, a._value = e, finale(a);
  } catch (r) {
    reject(a, r);
  }
}
function reject(a, e) {
  a._state = 2, a._value = e, finale(a);
}
function finale(a) {
  a._state === 2 && a._deferreds.length === 0 && Promise$1._immediateFn(function() {
    a._handled || Promise$1._unhandledRejectionFn(a._value);
  });
  for (var e = 0, t = a._deferreds.length; e < t; e++)
    handle(a, a._deferreds[e]);
  a._deferreds = null;
}
function Handler(a, e, t) {
  this.onFulfilled = typeof a == "function" ? a : null, this.onRejected = typeof e == "function" ? e : null, this.promise = t;
}
function doResolve(a, e) {
  var t = !1;
  try {
    a(
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
Promise$1.prototype.catch = function(a) {
  return this.then(null, a);
};
Promise$1.prototype.then = function(a, e) {
  var t = new this.constructor(noop);
  return handle(this, new Handler(a, e, t)), t;
};
Promise$1.prototype.finally = finallyConstructor;
Promise$1.all = function(a) {
  return new Promise$1(function(e, t) {
    if (!isArray(a))
      return t(new TypeError("Promise.all accepts an array"));
    var r = Array.prototype.slice.call(a);
    if (r.length === 0) return e([]);
    var s = r.length;
    function o(h, l) {
      try {
        if (l && (typeof l == "object" || typeof l == "function")) {
          var c = l.then;
          if (typeof c == "function") {
            c.call(
              l,
              function(d) {
                o(h, d);
              },
              t
            );
            return;
          }
        }
        r[h] = l, --s === 0 && e(r);
      } catch (d) {
        t(d);
      }
    }
    for (var u = 0; u < r.length; u++)
      o(u, r[u]);
  });
};
Promise$1.any = any;
Promise$1.allSettled = allSettled;
Promise$1.resolve = function(a) {
  return a && typeof a == "object" && a.constructor === Promise$1 ? a : new Promise$1(function(e) {
    e(a);
  });
};
Promise$1.reject = function(a) {
  return new Promise$1(function(e, t) {
    t(a);
  });
};
Promise$1.race = function(a) {
  return new Promise$1(function(e, t) {
    if (!isArray(a))
      return t(new TypeError("Promise.race accepts an array"));
    for (var r = 0, s = a.length; r < s; r++)
      Promise$1.resolve(a[r]).then(e, t);
  });
};
Promise$1._immediateFn = // @ts-ignore
typeof setImmediate == "function" && function(a) {
  setImmediate(a);
} || function(a) {
  setTimeoutFunc(a, 0);
};
Promise$1._unhandledRejectionFn = function(e) {
  typeof console < "u" && console && console.warn("Possible Unhandled Promise Rejection:", e);
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
  var a = Object.getOwnPropertySymbols, e = Object.prototype.hasOwnProperty, t = Object.prototype.propertyIsEnumerable;
  function r(o) {
    if (o == null)
      throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(o);
  }
  function s() {
    try {
      if (!Object.assign)
        return !1;
      var o = new String("abc");
      if (o[5] = "de", Object.getOwnPropertyNames(o)[0] === "5")
        return !1;
      for (var u = {}, h = 0; h < 10; h++)
        u["_" + String.fromCharCode(h)] = h;
      var l = Object.getOwnPropertyNames(u).map(function(d) {
        return u[d];
      });
      if (l.join("") !== "0123456789")
        return !1;
      var c = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(d) {
        c[d] = d;
      }), Object.keys(Object.assign({}, c)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return objectAssign$1 = s() ? Object.assign : function(o, u) {
    for (var h, l = r(o), c, d = 1; d < arguments.length; d++) {
      h = Object(arguments[d]);
      for (var _ in h)
        e.call(h, _) && (l[_] = h[_]);
      if (a) {
        c = a(h);
        for (var v = 0; v < c.length; v++)
          t.call(h, c[v]) && (l[c[v]] = h[c[v]]);
      }
    }
    return l;
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
globalThis.requestAnimationFrame || (globalThis.requestAnimationFrame = function(a) {
  if (typeof a != "function")
    throw new TypeError(a + "is not a function");
  var e = Date.now(), t = ONE_FRAME_TIME + lastTime - e;
  return t < 0 && (t = 0), lastTime = e, globalThis.self.setTimeout(function() {
    lastTime = Date.now(), a(performance.now());
  }, t);
});
globalThis.cancelAnimationFrame || (globalThis.cancelAnimationFrame = function(a) {
  return clearTimeout(a);
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
/*!
 * @pixi/constants - v6.5.10
 * Compiled Thu, 06 Jul 2023 15:25:11 UTC
 *
 * @pixi/constants is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
var ENV;
(function(a) {
  a[a.WEBGL_LEGACY = 0] = "WEBGL_LEGACY", a[a.WEBGL = 1] = "WEBGL", a[a.WEBGL2 = 2] = "WEBGL2";
})(ENV || (ENV = {}));
var RENDERER_TYPE;
(function(a) {
  a[a.UNKNOWN = 0] = "UNKNOWN", a[a.WEBGL = 1] = "WEBGL", a[a.CANVAS = 2] = "CANVAS";
})(RENDERER_TYPE || (RENDERER_TYPE = {}));
var BUFFER_BITS;
(function(a) {
  a[a.COLOR = 16384] = "COLOR", a[a.DEPTH = 256] = "DEPTH", a[a.STENCIL = 1024] = "STENCIL";
})(BUFFER_BITS || (BUFFER_BITS = {}));
var BLEND_MODES;
(function(a) {
  a[a.NORMAL = 0] = "NORMAL", a[a.ADD = 1] = "ADD", a[a.MULTIPLY = 2] = "MULTIPLY", a[a.SCREEN = 3] = "SCREEN", a[a.OVERLAY = 4] = "OVERLAY", a[a.DARKEN = 5] = "DARKEN", a[a.LIGHTEN = 6] = "LIGHTEN", a[a.COLOR_DODGE = 7] = "COLOR_DODGE", a[a.COLOR_BURN = 8] = "COLOR_BURN", a[a.HARD_LIGHT = 9] = "HARD_LIGHT", a[a.SOFT_LIGHT = 10] = "SOFT_LIGHT", a[a.DIFFERENCE = 11] = "DIFFERENCE", a[a.EXCLUSION = 12] = "EXCLUSION", a[a.HUE = 13] = "HUE", a[a.SATURATION = 14] = "SATURATION", a[a.COLOR = 15] = "COLOR", a[a.LUMINOSITY = 16] = "LUMINOSITY", a[a.NORMAL_NPM = 17] = "NORMAL_NPM", a[a.ADD_NPM = 18] = "ADD_NPM", a[a.SCREEN_NPM = 19] = "SCREEN_NPM", a[a.NONE = 20] = "NONE", a[a.SRC_OVER = 0] = "SRC_OVER", a[a.SRC_IN = 21] = "SRC_IN", a[a.SRC_OUT = 22] = "SRC_OUT", a[a.SRC_ATOP = 23] = "SRC_ATOP", a[a.DST_OVER = 24] = "DST_OVER", a[a.DST_IN = 25] = "DST_IN", a[a.DST_OUT = 26] = "DST_OUT", a[a.DST_ATOP = 27] = "DST_ATOP", a[a.ERASE = 26] = "ERASE", a[a.SUBTRACT = 28] = "SUBTRACT", a[a.XOR = 29] = "XOR";
})(BLEND_MODES || (BLEND_MODES = {}));
var DRAW_MODES;
(function(a) {
  a[a.POINTS = 0] = "POINTS", a[a.LINES = 1] = "LINES", a[a.LINE_LOOP = 2] = "LINE_LOOP", a[a.LINE_STRIP = 3] = "LINE_STRIP", a[a.TRIANGLES = 4] = "TRIANGLES", a[a.TRIANGLE_STRIP = 5] = "TRIANGLE_STRIP", a[a.TRIANGLE_FAN = 6] = "TRIANGLE_FAN";
})(DRAW_MODES || (DRAW_MODES = {}));
var FORMATS;
(function(a) {
  a[a.RGBA = 6408] = "RGBA", a[a.RGB = 6407] = "RGB", a[a.RG = 33319] = "RG", a[a.RED = 6403] = "RED", a[a.RGBA_INTEGER = 36249] = "RGBA_INTEGER", a[a.RGB_INTEGER = 36248] = "RGB_INTEGER", a[a.RG_INTEGER = 33320] = "RG_INTEGER", a[a.RED_INTEGER = 36244] = "RED_INTEGER", a[a.ALPHA = 6406] = "ALPHA", a[a.LUMINANCE = 6409] = "LUMINANCE", a[a.LUMINANCE_ALPHA = 6410] = "LUMINANCE_ALPHA", a[a.DEPTH_COMPONENT = 6402] = "DEPTH_COMPONENT", a[a.DEPTH_STENCIL = 34041] = "DEPTH_STENCIL";
})(FORMATS || (FORMATS = {}));
var TARGETS;
(function(a) {
  a[a.TEXTURE_2D = 3553] = "TEXTURE_2D", a[a.TEXTURE_CUBE_MAP = 34067] = "TEXTURE_CUBE_MAP", a[a.TEXTURE_2D_ARRAY = 35866] = "TEXTURE_2D_ARRAY", a[a.TEXTURE_CUBE_MAP_POSITIVE_X = 34069] = "TEXTURE_CUBE_MAP_POSITIVE_X", a[a.TEXTURE_CUBE_MAP_NEGATIVE_X = 34070] = "TEXTURE_CUBE_MAP_NEGATIVE_X", a[a.TEXTURE_CUBE_MAP_POSITIVE_Y = 34071] = "TEXTURE_CUBE_MAP_POSITIVE_Y", a[a.TEXTURE_CUBE_MAP_NEGATIVE_Y = 34072] = "TEXTURE_CUBE_MAP_NEGATIVE_Y", a[a.TEXTURE_CUBE_MAP_POSITIVE_Z = 34073] = "TEXTURE_CUBE_MAP_POSITIVE_Z", a[a.TEXTURE_CUBE_MAP_NEGATIVE_Z = 34074] = "TEXTURE_CUBE_MAP_NEGATIVE_Z";
})(TARGETS || (TARGETS = {}));
var TYPES;
(function(a) {
  a[a.UNSIGNED_BYTE = 5121] = "UNSIGNED_BYTE", a[a.UNSIGNED_SHORT = 5123] = "UNSIGNED_SHORT", a[a.UNSIGNED_SHORT_5_6_5 = 33635] = "UNSIGNED_SHORT_5_6_5", a[a.UNSIGNED_SHORT_4_4_4_4 = 32819] = "UNSIGNED_SHORT_4_4_4_4", a[a.UNSIGNED_SHORT_5_5_5_1 = 32820] = "UNSIGNED_SHORT_5_5_5_1", a[a.UNSIGNED_INT = 5125] = "UNSIGNED_INT", a[a.UNSIGNED_INT_10F_11F_11F_REV = 35899] = "UNSIGNED_INT_10F_11F_11F_REV", a[a.UNSIGNED_INT_2_10_10_10_REV = 33640] = "UNSIGNED_INT_2_10_10_10_REV", a[a.UNSIGNED_INT_24_8 = 34042] = "UNSIGNED_INT_24_8", a[a.UNSIGNED_INT_5_9_9_9_REV = 35902] = "UNSIGNED_INT_5_9_9_9_REV", a[a.BYTE = 5120] = "BYTE", a[a.SHORT = 5122] = "SHORT", a[a.INT = 5124] = "INT", a[a.FLOAT = 5126] = "FLOAT", a[a.FLOAT_32_UNSIGNED_INT_24_8_REV = 36269] = "FLOAT_32_UNSIGNED_INT_24_8_REV", a[a.HALF_FLOAT = 36193] = "HALF_FLOAT";
})(TYPES || (TYPES = {}));
var SAMPLER_TYPES;
(function(a) {
  a[a.FLOAT = 0] = "FLOAT", a[a.INT = 1] = "INT", a[a.UINT = 2] = "UINT";
})(SAMPLER_TYPES || (SAMPLER_TYPES = {}));
var SCALE_MODES;
(function(a) {
  a[a.NEAREST = 0] = "NEAREST", a[a.LINEAR = 1] = "LINEAR";
})(SCALE_MODES || (SCALE_MODES = {}));
var WRAP_MODES;
(function(a) {
  a[a.CLAMP = 33071] = "CLAMP", a[a.REPEAT = 10497] = "REPEAT", a[a.MIRRORED_REPEAT = 33648] = "MIRRORED_REPEAT";
})(WRAP_MODES || (WRAP_MODES = {}));
var MIPMAP_MODES;
(function(a) {
  a[a.OFF = 0] = "OFF", a[a.POW2 = 1] = "POW2", a[a.ON = 2] = "ON", a[a.ON_MANUAL = 3] = "ON_MANUAL";
})(MIPMAP_MODES || (MIPMAP_MODES = {}));
var ALPHA_MODES;
(function(a) {
  a[a.NPM = 0] = "NPM", a[a.UNPACK = 1] = "UNPACK", a[a.PMA = 2] = "PMA", a[a.NO_PREMULTIPLIED_ALPHA = 0] = "NO_PREMULTIPLIED_ALPHA", a[a.PREMULTIPLY_ON_UPLOAD = 1] = "PREMULTIPLY_ON_UPLOAD", a[a.PREMULTIPLY_ALPHA = 2] = "PREMULTIPLY_ALPHA", a[a.PREMULTIPLIED_ALPHA = 2] = "PREMULTIPLIED_ALPHA";
})(ALPHA_MODES || (ALPHA_MODES = {}));
var CLEAR_MODES;
(function(a) {
  a[a.NO = 0] = "NO", a[a.YES = 1] = "YES", a[a.AUTO = 2] = "AUTO", a[a.BLEND = 0] = "BLEND", a[a.CLEAR = 1] = "CLEAR", a[a.BLIT = 2] = "BLIT";
})(CLEAR_MODES || (CLEAR_MODES = {}));
var GC_MODES;
(function(a) {
  a[a.AUTO = 0] = "AUTO", a[a.MANUAL = 1] = "MANUAL";
})(GC_MODES || (GC_MODES = {}));
var PRECISION;
(function(a) {
  a.LOW = "lowp", a.MEDIUM = "mediump", a.HIGH = "highp";
})(PRECISION || (PRECISION = {}));
var MASK_TYPES;
(function(a) {
  a[a.NONE = 0] = "NONE", a[a.SCISSOR = 1] = "SCISSOR", a[a.STENCIL = 2] = "STENCIL", a[a.SPRITE = 3] = "SPRITE", a[a.COLOR = 4] = "COLOR";
})(MASK_TYPES || (MASK_TYPES = {}));
var COLOR_MASK_BITS;
(function(a) {
  a[a.RED = 1] = "RED", a[a.GREEN = 2] = "GREEN", a[a.BLUE = 4] = "BLUE", a[a.ALPHA = 8] = "ALPHA";
})(COLOR_MASK_BITS || (COLOR_MASK_BITS = {}));
var MSAA_QUALITY;
(function(a) {
  a[a.NONE = 0] = "NONE", a[a.LOW = 2] = "LOW", a[a.MEDIUM = 4] = "MEDIUM", a[a.HIGH = 8] = "HIGH";
})(MSAA_QUALITY || (MSAA_QUALITY = {}));
var BUFFER_TYPE;
(function(a) {
  a[a.ELEMENT_ARRAY_BUFFER = 34963] = "ELEMENT_ARRAY_BUFFER", a[a.ARRAY_BUFFER = 34962] = "ARRAY_BUFFER", a[a.UNIFORM_BUFFER = 35345] = "UNIFORM_BUFFER";
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
  createCanvas: function(a, e) {
    var t = document.createElement("canvas");
    return t.width = a, t.height = e, t;
  },
  getWebGLRenderingContext: function() {
    return WebGLRenderingContext;
  },
  getNavigator: function() {
    return navigator;
  },
  getBaseUrl: function() {
    var a;
    return (a = document.baseURI) !== null && a !== void 0 ? a : window.location.href;
  },
  fetch: function(a, e) {
    return fetch(a, e);
  }
}, appleIphone = /iPhone/i, appleIpod = /iPod/i, appleTablet = /iPad/i, appleUniversal = /\biOS-universal(?:.+)Mac\b/i, androidPhone = /\bAndroid(?:.+)Mobile\b/i, androidTablet = /Android/i, amazonPhone = /(?:SD4930UR|\bSilk(?:.+)Mobile\b)/i, amazonTablet = /Silk/i, windowsPhone = /Windows Phone/i, windowsTablet = /\bWindows(?:.+)ARM\b/i, otherBlackBerry = /BlackBerry/i, otherBlackBerry10 = /BB10/i, otherOpera = /Opera Mini/i, otherChrome = /\b(CriOS|Chrome)(?:.+)Mobile/i, otherFirefox = /Mobile(?:.+)Firefox\b/i, isAppleTabletOnIos13 = function(a) {
  return typeof a < "u" && a.platform === "MacIntel" && typeof a.maxTouchPoints == "number" && a.maxTouchPoints > 1 && typeof MSStream > "u";
};
function createMatch(a) {
  return function(e) {
    return e.test(a);
  };
}
function isMobile$1(a) {
  var e = {
    userAgent: "",
    platform: "",
    maxTouchPoints: 0
  };
  !a && typeof navigator < "u" ? e = {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    maxTouchPoints: navigator.maxTouchPoints || 0
  } : typeof a == "string" ? e.userAgent = a : a && a.userAgent && (e = {
    userAgent: a.userAgent,
    platform: a.platform,
    maxTouchPoints: a.maxTouchPoints || 0
  });
  var t = e.userAgent, r = t.split("[FBAN");
  typeof r[1] < "u" && (t = r[0]), r = t.split("Twitter"), typeof r[1] < "u" && (t = r[0]);
  var s = createMatch(t), o = {
    apple: {
      phone: s(appleIphone) && !s(windowsPhone),
      ipod: s(appleIpod),
      tablet: !s(appleIphone) && (s(appleTablet) || isAppleTabletOnIos13(e)) && !s(windowsPhone),
      universal: s(appleUniversal),
      device: (s(appleIphone) || s(appleIpod) || s(appleTablet) || s(appleUniversal) || isAppleTabletOnIos13(e)) && !s(windowsPhone)
    },
    amazon: {
      phone: s(amazonPhone),
      tablet: !s(amazonPhone) && s(amazonTablet),
      device: s(amazonPhone) || s(amazonTablet)
    },
    android: {
      phone: !s(windowsPhone) && s(amazonPhone) || !s(windowsPhone) && s(androidPhone),
      tablet: !s(windowsPhone) && !s(amazonPhone) && !s(androidPhone) && (s(amazonTablet) || s(androidTablet)),
      device: !s(windowsPhone) && (s(amazonPhone) || s(amazonTablet) || s(androidPhone) || s(androidTablet)) || s(/\bokhttp\b/i)
    },
    windows: {
      phone: s(windowsPhone),
      tablet: s(windowsTablet),
      device: s(windowsPhone) || s(windowsTablet)
    },
    other: {
      blackberry: s(otherBlackBerry),
      blackberry10: s(otherBlackBerry10),
      opera: s(otherOpera),
      firefox: s(otherFirefox),
      chrome: s(otherChrome),
      device: s(otherBlackBerry) || s(otherBlackBerry10) || s(otherOpera) || s(otherFirefox) || s(otherChrome)
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
function maxRecommendedTextures(a) {
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
  return e ? a : 4;
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
  return hasRequiredEventemitter3 || (hasRequiredEventemitter3 = 1, function(a) {
    var e = Object.prototype.hasOwnProperty, t = "~";
    function r() {
    }
    Object.create && (r.prototype = /* @__PURE__ */ Object.create(null), new r().__proto__ || (t = !1));
    function s(l, c, d) {
      this.fn = l, this.context = c, this.once = d || !1;
    }
    function o(l, c, d, _, v) {
      if (typeof d != "function")
        throw new TypeError("The listener must be a function");
      var y = new s(d, _ || l, v), b = t ? t + c : c;
      return l._events[b] ? l._events[b].fn ? l._events[b] = [l._events[b], y] : l._events[b].push(y) : (l._events[b] = y, l._eventsCount++), l;
    }
    function u(l, c) {
      --l._eventsCount === 0 ? l._events = new r() : delete l._events[c];
    }
    function h() {
      this._events = new r(), this._eventsCount = 0;
    }
    h.prototype.eventNames = function() {
      var c = [], d, _;
      if (this._eventsCount === 0) return c;
      for (_ in d = this._events)
        e.call(d, _) && c.push(t ? _.slice(1) : _);
      return Object.getOwnPropertySymbols ? c.concat(Object.getOwnPropertySymbols(d)) : c;
    }, h.prototype.listeners = function(c) {
      var d = t ? t + c : c, _ = this._events[d];
      if (!_) return [];
      if (_.fn) return [_.fn];
      for (var v = 0, y = _.length, b = new Array(y); v < y; v++)
        b[v] = _[v].fn;
      return b;
    }, h.prototype.listenerCount = function(c) {
      var d = t ? t + c : c, _ = this._events[d];
      return _ ? _.fn ? 1 : _.length : 0;
    }, h.prototype.emit = function(c, d, _, v, y, b) {
      var g = t ? t + c : c;
      if (!this._events[g]) return !1;
      var m = this._events[g], E = arguments.length, S, P;
      if (m.fn) {
        switch (m.once && this.removeListener(c, m.fn, void 0, !0), E) {
          case 1:
            return m.fn.call(m.context), !0;
          case 2:
            return m.fn.call(m.context, d), !0;
          case 3:
            return m.fn.call(m.context, d, _), !0;
          case 4:
            return m.fn.call(m.context, d, _, v), !0;
          case 5:
            return m.fn.call(m.context, d, _, v, y), !0;
          case 6:
            return m.fn.call(m.context, d, _, v, y, b), !0;
        }
        for (P = 1, S = new Array(E - 1); P < E; P++)
          S[P - 1] = arguments[P];
        m.fn.apply(m.context, S);
      } else {
        var L = m.length, T;
        for (P = 0; P < L; P++)
          switch (m[P].once && this.removeListener(c, m[P].fn, void 0, !0), E) {
            case 1:
              m[P].fn.call(m[P].context);
              break;
            case 2:
              m[P].fn.call(m[P].context, d);
              break;
            case 3:
              m[P].fn.call(m[P].context, d, _);
              break;
            case 4:
              m[P].fn.call(m[P].context, d, _, v);
              break;
            default:
              if (!S) for (T = 1, S = new Array(E - 1); T < E; T++)
                S[T - 1] = arguments[T];
              m[P].fn.apply(m[P].context, S);
          }
      }
      return !0;
    }, h.prototype.on = function(c, d, _) {
      return o(this, c, d, _, !1);
    }, h.prototype.once = function(c, d, _) {
      return o(this, c, d, _, !0);
    }, h.prototype.removeListener = function(c, d, _, v) {
      var y = t ? t + c : c;
      if (!this._events[y]) return this;
      if (!d)
        return u(this, y), this;
      var b = this._events[y];
      if (b.fn)
        b.fn === d && (!v || b.once) && (!_ || b.context === _) && u(this, y);
      else {
        for (var g = 0, m = [], E = b.length; g < E; g++)
          (b[g].fn !== d || v && !b[g].once || _ && b[g].context !== _) && m.push(b[g]);
        m.length ? this._events[y] = m.length === 1 ? m[0] : m : u(this, y);
      }
      return this;
    }, h.prototype.removeAllListeners = function(c) {
      var d;
      return c ? (d = t ? t + c : c, this._events[d] && u(this, d)) : (this._events = new r(), this._eventsCount = 0), this;
    }, h.prototype.off = h.prototype.removeListener, h.prototype.addListener = h.prototype.on, h.prefixed = t, h.EventEmitter = h, a.exports = h;
  }(eventemitter3)), eventemitter3.exports;
}
var eventemitter3Exports = requireEventemitter3();
const i = /* @__PURE__ */ getDefaultExportFromCjs(eventemitter3Exports);
var earcut$1 = { exports: {} }, hasRequiredEarcut;
function requireEarcut() {
  if (hasRequiredEarcut) return earcut$1.exports;
  hasRequiredEarcut = 1, earcut$1.exports = a, earcut$1.exports.default = a;
  function a(R, O, A) {
    A = A || 2;
    var B = O && O.length, N = B ? O[0] * A : R.length, D = e(R, 0, N, A, !0), G = [];
    if (!D || D.next === D.prev) return G;
    var U, Y, J, C, te, Z, se;
    if (B && (D = l(R, O, D, A)), R.length > 80 * A) {
      U = J = R[0], Y = C = R[1];
      for (var ee = A; ee < N; ee += A)
        te = R[ee], Z = R[ee + 1], te < U && (U = te), Z < Y && (Y = Z), te > J && (J = te), Z > C && (C = Z);
      se = Math.max(J - U, C - Y), se = se !== 0 ? 32767 / se : 0;
    }
    return r(D, G, A, U, Y, se, 0), G;
  }
  function e(R, O, A, B, N) {
    var D, G;
    if (N === K(R, O, A, B) > 0)
      for (D = O; D < A; D += B) G = X(D, R[D], R[D + 1], G);
    else
      for (D = A - B; D >= O; D -= B) G = X(D, R[D], R[D + 1], G);
    return G && L(G, G.next) && (ne(G), G = G.next), G;
  }
  function t(R, O) {
    if (!R) return R;
    O || (O = R);
    var A = R, B;
    do
      if (B = !1, !A.steiner && (L(A, A.next) || P(A.prev, A, A.next) === 0)) {
        if (ne(A), A = O = A.prev, A === A.next) break;
        B = !0;
      } else
        A = A.next;
    while (B || A !== O);
    return O;
  }
  function r(R, O, A, B, N, D, G) {
    if (R) {
      !G && D && y(R, B, N, D);
      for (var U = R, Y, J; R.prev !== R.next; ) {
        if (Y = R.prev, J = R.next, D ? o(R, B, N, D) : s(R)) {
          O.push(Y.i / A | 0), O.push(R.i / A | 0), O.push(J.i / A | 0), ne(R), R = J.next, U = J.next;
          continue;
        }
        if (R = J, R === U) {
          G ? G === 1 ? (R = u(t(R), O, A), r(R, O, A, B, N, D, 2)) : G === 2 && h(R, O, A, B, N, D) : r(t(R), O, A, B, N, D, 1);
          break;
        }
      }
    }
  }
  function s(R) {
    var O = R.prev, A = R, B = R.next;
    if (P(O, A, B) >= 0) return !1;
    for (var N = O.x, D = A.x, G = B.x, U = O.y, Y = A.y, J = B.y, C = N < D ? N < G ? N : G : D < G ? D : G, te = U < Y ? U < J ? U : J : Y < J ? Y : J, Z = N > D ? N > G ? N : G : D > G ? D : G, se = U > Y ? U > J ? U : J : Y > J ? Y : J, ee = B.next; ee !== O; ) {
      if (ee.x >= C && ee.x <= Z && ee.y >= te && ee.y <= se && E(N, U, D, Y, G, J, ee.x, ee.y) && P(ee.prev, ee, ee.next) >= 0) return !1;
      ee = ee.next;
    }
    return !0;
  }
  function o(R, O, A, B) {
    var N = R.prev, D = R, G = R.next;
    if (P(N, D, G) >= 0) return !1;
    for (var U = N.x, Y = D.x, J = G.x, C = N.y, te = D.y, Z = G.y, se = U < Y ? U < J ? U : J : Y < J ? Y : J, ee = C < te ? C < Z ? C : Z : te < Z ? te : Z, q = U > Y ? U > J ? U : J : Y > J ? Y : J, ue = C > te ? C > Z ? C : Z : te > Z ? te : Z, ae = g(se, ee, O, A, B), z = g(q, ue, O, A, B), Q = R.prevZ, ie = R.nextZ; Q && Q.z >= ae && ie && ie.z <= z; ) {
      if (Q.x >= se && Q.x <= q && Q.y >= ee && Q.y <= ue && Q !== N && Q !== G && E(U, C, Y, te, J, Z, Q.x, Q.y) && P(Q.prev, Q, Q.next) >= 0 || (Q = Q.prevZ, ie.x >= se && ie.x <= q && ie.y >= ee && ie.y <= ue && ie !== N && ie !== G && E(U, C, Y, te, J, Z, ie.x, ie.y) && P(ie.prev, ie, ie.next) >= 0)) return !1;
      ie = ie.nextZ;
    }
    for (; Q && Q.z >= ae; ) {
      if (Q.x >= se && Q.x <= q && Q.y >= ee && Q.y <= ue && Q !== N && Q !== G && E(U, C, Y, te, J, Z, Q.x, Q.y) && P(Q.prev, Q, Q.next) >= 0) return !1;
      Q = Q.prevZ;
    }
    for (; ie && ie.z <= z; ) {
      if (ie.x >= se && ie.x <= q && ie.y >= ee && ie.y <= ue && ie !== N && ie !== G && E(U, C, Y, te, J, Z, ie.x, ie.y) && P(ie.prev, ie, ie.next) >= 0) return !1;
      ie = ie.nextZ;
    }
    return !0;
  }
  function u(R, O, A) {
    var B = R;
    do {
      var N = B.prev, D = B.next.next;
      !L(N, D) && T(N, B, B.next, D) && F(N, D) && F(D, N) && (O.push(N.i / A | 0), O.push(B.i / A | 0), O.push(D.i / A | 0), ne(B), ne(B.next), B = R = D), B = B.next;
    } while (B !== R);
    return t(B);
  }
  function h(R, O, A, B, N, D) {
    var G = R;
    do {
      for (var U = G.next.next; U !== G.prev; ) {
        if (G.i !== U.i && S(G, U)) {
          var Y = V(G, U);
          G = t(G, G.next), Y = t(Y, Y.next), r(G, O, A, B, N, D, 0), r(Y, O, A, B, N, D, 0);
          return;
        }
        U = U.next;
      }
      G = G.next;
    } while (G !== R);
  }
  function l(R, O, A, B) {
    var N = [], D, G, U, Y, J;
    for (D = 0, G = O.length; D < G; D++)
      U = O[D] * B, Y = D < G - 1 ? O[D + 1] * B : R.length, J = e(R, U, Y, B, !1), J === J.next && (J.steiner = !0), N.push(m(J));
    for (N.sort(c), D = 0; D < N.length; D++)
      A = d(N[D], A);
    return A;
  }
  function c(R, O) {
    return R.x - O.x;
  }
  function d(R, O) {
    var A = _(R, O);
    if (!A)
      return O;
    var B = V(A, R);
    return t(B, B.next), t(A, A.next);
  }
  function _(R, O) {
    var A = O, B = R.x, N = R.y, D = -1 / 0, G;
    do {
      if (N <= A.y && N >= A.next.y && A.next.y !== A.y) {
        var U = A.x + (N - A.y) * (A.next.x - A.x) / (A.next.y - A.y);
        if (U <= B && U > D && (D = U, G = A.x < A.next.x ? A : A.next, U === B))
          return G;
      }
      A = A.next;
    } while (A !== O);
    if (!G) return null;
    var Y = G, J = G.x, C = G.y, te = 1 / 0, Z;
    A = G;
    do
      B >= A.x && A.x >= J && B !== A.x && E(N < C ? B : D, N, J, C, N < C ? D : B, N, A.x, A.y) && (Z = Math.abs(N - A.y) / (B - A.x), F(A, R) && (Z < te || Z === te && (A.x > G.x || A.x === G.x && v(G, A))) && (G = A, te = Z)), A = A.next;
    while (A !== Y);
    return G;
  }
  function v(R, O) {
    return P(R.prev, R, O.prev) < 0 && P(O.next, R, R.next) < 0;
  }
  function y(R, O, A, B) {
    var N = R;
    do
      N.z === 0 && (N.z = g(N.x, N.y, O, A, B)), N.prevZ = N.prev, N.nextZ = N.next, N = N.next;
    while (N !== R);
    N.prevZ.nextZ = null, N.prevZ = null, b(N);
  }
  function b(R) {
    var O, A, B, N, D, G, U, Y, J = 1;
    do {
      for (A = R, R = null, D = null, G = 0; A; ) {
        for (G++, B = A, U = 0, O = 0; O < J && (U++, B = B.nextZ, !!B); O++)
          ;
        for (Y = J; U > 0 || Y > 0 && B; )
          U !== 0 && (Y === 0 || !B || A.z <= B.z) ? (N = A, A = A.nextZ, U--) : (N = B, B = B.nextZ, Y--), D ? D.nextZ = N : R = N, N.prevZ = D, D = N;
        A = B;
      }
      D.nextZ = null, J *= 2;
    } while (G > 1);
    return R;
  }
  function g(R, O, A, B, N) {
    return R = (R - A) * N | 0, O = (O - B) * N | 0, R = (R | R << 8) & 16711935, R = (R | R << 4) & 252645135, R = (R | R << 2) & 858993459, R = (R | R << 1) & 1431655765, O = (O | O << 8) & 16711935, O = (O | O << 4) & 252645135, O = (O | O << 2) & 858993459, O = (O | O << 1) & 1431655765, R | O << 1;
  }
  function m(R) {
    var O = R, A = R;
    do
      (O.x < A.x || O.x === A.x && O.y < A.y) && (A = O), O = O.next;
    while (O !== R);
    return A;
  }
  function E(R, O, A, B, N, D, G, U) {
    return (N - G) * (O - U) >= (R - G) * (D - U) && (R - G) * (B - U) >= (A - G) * (O - U) && (A - G) * (D - U) >= (N - G) * (B - U);
  }
  function S(R, O) {
    return R.next.i !== O.i && R.prev.i !== O.i && !M(R, O) && // dones't intersect other edges
    (F(R, O) && F(O, R) && k(R, O) && // locally visible
    (P(R.prev, R, O.prev) || P(R, O.prev, O)) || // does not create opposite-facing sectors
    L(R, O) && P(R.prev, R, R.next) > 0 && P(O.prev, O, O.next) > 0);
  }
  function P(R, O, A) {
    return (O.y - R.y) * (A.x - O.x) - (O.x - R.x) * (A.y - O.y);
  }
  function L(R, O) {
    return R.x === O.x && R.y === O.y;
  }
  function T(R, O, A, B) {
    var N = w(P(R, O, A)), D = w(P(R, O, B)), G = w(P(A, B, R)), U = w(P(A, B, O));
    return !!(N !== D && G !== U || N === 0 && I(R, A, O) || D === 0 && I(R, B, O) || G === 0 && I(A, R, B) || U === 0 && I(A, O, B));
  }
  function I(R, O, A) {
    return O.x <= Math.max(R.x, A.x) && O.x >= Math.min(R.x, A.x) && O.y <= Math.max(R.y, A.y) && O.y >= Math.min(R.y, A.y);
  }
  function w(R) {
    return R > 0 ? 1 : R < 0 ? -1 : 0;
  }
  function M(R, O) {
    var A = R;
    do {
      if (A.i !== R.i && A.next.i !== R.i && A.i !== O.i && A.next.i !== O.i && T(A, A.next, R, O)) return !0;
      A = A.next;
    } while (A !== R);
    return !1;
  }
  function F(R, O) {
    return P(R.prev, R, R.next) < 0 ? P(R, O, R.next) >= 0 && P(R, R.prev, O) >= 0 : P(R, O, R.prev) < 0 || P(R, R.next, O) < 0;
  }
  function k(R, O) {
    var A = R, B = !1, N = (R.x + O.x) / 2, D = (R.y + O.y) / 2;
    do
      A.y > D != A.next.y > D && A.next.y !== A.y && N < (A.next.x - A.x) * (D - A.y) / (A.next.y - A.y) + A.x && (B = !B), A = A.next;
    while (A !== R);
    return B;
  }
  function V(R, O) {
    var A = new oe(R.i, R.x, R.y), B = new oe(O.i, O.x, O.y), N = R.next, D = O.prev;
    return R.next = O, O.prev = R, A.next = N, N.prev = A, B.next = A, A.prev = B, D.next = B, B.prev = D, B;
  }
  function X(R, O, A, B) {
    var N = new oe(R, O, A);
    return B ? (N.next = B.next, N.prev = B, B.next.prev = N, B.next = N) : (N.prev = N, N.next = N), N;
  }
  function ne(R) {
    R.next.prev = R.prev, R.prev.next = R.next, R.prevZ && (R.prevZ.nextZ = R.nextZ), R.nextZ && (R.nextZ.prevZ = R.prevZ);
  }
  function oe(R, O, A) {
    this.i = R, this.x = O, this.y = A, this.prev = null, this.next = null, this.z = 0, this.prevZ = null, this.nextZ = null, this.steiner = !1;
  }
  a.deviation = function(R, O, A, B) {
    var N = O && O.length, D = N ? O[0] * A : R.length, G = Math.abs(K(R, 0, D, A));
    if (N)
      for (var U = 0, Y = O.length; U < Y; U++) {
        var J = O[U] * A, C = U < Y - 1 ? O[U + 1] * A : R.length;
        G -= Math.abs(K(R, J, C, A));
      }
    var te = 0;
    for (U = 0; U < B.length; U += 3) {
      var Z = B[U] * A, se = B[U + 1] * A, ee = B[U + 2] * A;
      te += Math.abs(
        (R[Z] - R[ee]) * (R[se + 1] - R[Z + 1]) - (R[Z] - R[se]) * (R[ee + 1] - R[Z + 1])
      );
    }
    return G === 0 && te === 0 ? 0 : Math.abs((te - G) / G);
  };
  function K(R, O, A, B) {
    for (var N = 0, D = O, G = A - B; D < A; D += B)
      N += (R[G] - R[D]) * (R[D + 1] + R[G + 1]), G = D;
    return N;
  }
  return a.flatten = function(R) {
    for (var O = R[0][0].length, A = { vertices: [], holes: [], dimensions: O }, B = 0, N = 0; N < R.length; N++) {
      for (var D = 0; D < R[N].length; D++)
        for (var G = 0; G < O; G++) A.vertices.push(R[N][D][G]);
      N > 0 && (B += R[N - 1].length, A.holes.push(B));
    }
    return A;
  }, earcut$1.exports;
}
var earcutExports = requireEarcut();
const earcut = /* @__PURE__ */ getDefaultExportFromCjs(earcutExports);
var url$2 = {}, punycode$1 = { exports: {} };
/*! https://mths.be/punycode v1.4.1 by @mathias */
var punycode = punycode$1.exports, hasRequiredPunycode;
function requirePunycode() {
  return hasRequiredPunycode || (hasRequiredPunycode = 1, function(a, e) {
    (function(t) {
      var r = e && !e.nodeType && e, s = a && !a.nodeType && a, o = typeof commonjsGlobal == "object" && commonjsGlobal;
      (o.global === o || o.window === o || o.self === o) && (t = o);
      var u, h = 2147483647, l = 36, c = 1, d = 26, _ = 38, v = 700, y = 72, b = 128, g = "-", m = /^xn--/, E = /[^\x20-\x7E]/, S = /[\x2E\u3002\uFF0E\uFF61]/g, P = {
        overflow: "Overflow: input needs wider integers to process",
        "not-basic": "Illegal input >= 0x80 (not a basic code point)",
        "invalid-input": "Invalid input"
      }, L = l - c, T = Math.floor, I = String.fromCharCode, w;
      function M(N) {
        throw new RangeError(P[N]);
      }
      function F(N, D) {
        for (var G = N.length, U = []; G--; )
          U[G] = D(N[G]);
        return U;
      }
      function k(N, D) {
        var G = N.split("@"), U = "";
        G.length > 1 && (U = G[0] + "@", N = G[1]), N = N.replace(S, ".");
        var Y = N.split("."), J = F(Y, D).join(".");
        return U + J;
      }
      function V(N) {
        for (var D = [], G = 0, U = N.length, Y, J; G < U; )
          Y = N.charCodeAt(G++), Y >= 55296 && Y <= 56319 && G < U ? (J = N.charCodeAt(G++), (J & 64512) == 56320 ? D.push(((Y & 1023) << 10) + (J & 1023) + 65536) : (D.push(Y), G--)) : D.push(Y);
        return D;
      }
      function X(N) {
        return F(N, function(D) {
          var G = "";
          return D > 65535 && (D -= 65536, G += I(D >>> 10 & 1023 | 55296), D = 56320 | D & 1023), G += I(D), G;
        }).join("");
      }
      function ne(N) {
        return N - 48 < 10 ? N - 22 : N - 65 < 26 ? N - 65 : N - 97 < 26 ? N - 97 : l;
      }
      function oe(N, D) {
        return N + 22 + 75 * (N < 26) - ((D != 0) << 5);
      }
      function K(N, D, G) {
        var U = 0;
        for (N = G ? T(N / v) : N >> 1, N += T(N / D); N > L * d >> 1; U += l)
          N = T(N / L);
        return T(U + (L + 1) * N / (N + _));
      }
      function R(N) {
        var D = [], G = N.length, U, Y = 0, J = b, C = y, te, Z, se, ee, q, ue, ae, z, Q;
        for (te = N.lastIndexOf(g), te < 0 && (te = 0), Z = 0; Z < te; ++Z)
          N.charCodeAt(Z) >= 128 && M("not-basic"), D.push(N.charCodeAt(Z));
        for (se = te > 0 ? te + 1 : 0; se < G; ) {
          for (ee = Y, q = 1, ue = l; se >= G && M("invalid-input"), ae = ne(N.charCodeAt(se++)), (ae >= l || ae > T((h - Y) / q)) && M("overflow"), Y += ae * q, z = ue <= C ? c : ue >= C + d ? d : ue - C, !(ae < z); ue += l)
            Q = l - z, q > T(h / Q) && M("overflow"), q *= Q;
          U = D.length + 1, C = K(Y - ee, U, ee == 0), T(Y / U) > h - J && M("overflow"), J += T(Y / U), Y %= U, D.splice(Y++, 0, J);
        }
        return X(D);
      }
      function O(N) {
        var D, G, U, Y, J, C, te, Z, se, ee, q, ue = [], ae, z, Q, ie;
        for (N = V(N), ae = N.length, D = b, G = 0, J = y, C = 0; C < ae; ++C)
          q = N[C], q < 128 && ue.push(I(q));
        for (U = Y = ue.length, Y && ue.push(g); U < ae; ) {
          for (te = h, C = 0; C < ae; ++C)
            q = N[C], q >= D && q < te && (te = q);
          for (z = U + 1, te - D > T((h - G) / z) && M("overflow"), G += (te - D) * z, D = te, C = 0; C < ae; ++C)
            if (q = N[C], q < D && ++G > h && M("overflow"), q == D) {
              for (Z = G, se = l; ee = se <= J ? c : se >= J + d ? d : se - J, !(Z < ee); se += l)
                ie = Z - ee, Q = l - ee, ue.push(
                  I(oe(ee + ie % Q, 0))
                ), Z = T(ie / Q);
              ue.push(I(oe(Z, 0))), J = K(G, z, U == Y), G = 0, ++U;
            }
          ++G, ++D;
        }
        return ue.join("");
      }
      function A(N) {
        return k(N, function(D) {
          return m.test(D) ? R(D.slice(4).toLowerCase()) : D;
        });
      }
      function B(N) {
        return k(N, function(D) {
          return E.test(D) ? "xn--" + O(D) : D;
        });
      }
      if (u = {
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
          decode: V,
          encode: X
        },
        decode: R,
        encode: O,
        toASCII: B,
        toUnicode: A
      }, r && s)
        if (a.exports == r)
          s.exports = u;
        else
          for (w in u)
            u.hasOwnProperty(w) && (r[w] = u[w]);
      else
        t.punycode = u;
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
    var e = {}, t = Symbol("test"), r = Object(t);
    if (typeof t == "string" || Object.prototype.toString.call(t) !== "[object Symbol]" || Object.prototype.toString.call(r) !== "[object Symbol]")
      return !1;
    var s = 42;
    e[t] = s;
    for (t in e)
      return !1;
    if (typeof Object.keys == "function" && Object.keys(e).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(e).length !== 0)
      return !1;
    var o = Object.getOwnPropertySymbols(e);
    if (o.length !== 1 || o[0] !== t || !Object.prototype.propertyIsEnumerable.call(e, t))
      return !1;
    if (typeof Object.getOwnPropertyDescriptor == "function") {
      var u = Object.getOwnPropertyDescriptor(e, t);
      if (u.value !== s || u.enumerable !== !0)
        return !1;
    }
    return !0;
  }), shams;
}
var hasSymbols, hasRequiredHasSymbols;
function requireHasSymbols() {
  if (hasRequiredHasSymbols) return hasSymbols;
  hasRequiredHasSymbols = 1;
  var a = typeof Symbol < "u" && Symbol, e = requireShams();
  return hasSymbols = function() {
    return typeof a != "function" || typeof Symbol != "function" || typeof a("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 : e();
  }, hasSymbols;
}
var hasProto, hasRequiredHasProto;
function requireHasProto() {
  if (hasRequiredHasProto) return hasProto;
  hasRequiredHasProto = 1;
  var a = {
    __proto__: null,
    foo: {}
  }, e = Object;
  return hasProto = function() {
    return { __proto__: a }.foo === a.foo && !(a instanceof e);
  }, hasProto;
}
var implementation, hasRequiredImplementation;
function requireImplementation() {
  if (hasRequiredImplementation) return implementation;
  hasRequiredImplementation = 1;
  var a = "Function.prototype.bind called on incompatible ", e = Object.prototype.toString, t = Math.max, r = "[object Function]", s = function(l, c) {
    for (var d = [], _ = 0; _ < l.length; _ += 1)
      d[_] = l[_];
    for (var v = 0; v < c.length; v += 1)
      d[v + l.length] = c[v];
    return d;
  }, o = function(l, c) {
    for (var d = [], _ = c, v = 0; _ < l.length; _ += 1, v += 1)
      d[v] = l[_];
    return d;
  }, u = function(h, l) {
    for (var c = "", d = 0; d < h.length; d += 1)
      c += h[d], d + 1 < h.length && (c += l);
    return c;
  };
  return implementation = function(l) {
    var c = this;
    if (typeof c != "function" || e.apply(c) !== r)
      throw new TypeError(a + c);
    for (var d = o(arguments, 1), _, v = function() {
      if (this instanceof _) {
        var E = c.apply(
          this,
          s(d, arguments)
        );
        return Object(E) === E ? E : this;
      }
      return c.apply(
        l,
        s(d, arguments)
      );
    }, y = t(0, c.length - d.length), b = [], g = 0; g < y; g++)
      b[g] = "$" + g;
    if (_ = Function("binder", "return function (" + u(b, ",") + "){ return binder.apply(this,arguments); }")(v), c.prototype) {
      var m = function() {
      };
      m.prototype = c.prototype, _.prototype = new m(), m.prototype = null;
    }
    return _;
  }, implementation;
}
var functionBind, hasRequiredFunctionBind;
function requireFunctionBind() {
  if (hasRequiredFunctionBind) return functionBind;
  hasRequiredFunctionBind = 1;
  var a = requireImplementation();
  return functionBind = Function.prototype.bind || a, functionBind;
}
var hasown, hasRequiredHasown;
function requireHasown() {
  if (hasRequiredHasown) return hasown;
  hasRequiredHasown = 1;
  var a = Function.prototype.call, e = Object.prototype.hasOwnProperty, t = requireFunctionBind();
  return hasown = t.call(a, e), hasown;
}
var getIntrinsic, hasRequiredGetIntrinsic;
function requireGetIntrinsic() {
  if (hasRequiredGetIntrinsic) return getIntrinsic;
  hasRequiredGetIntrinsic = 1;
  var a, e = /* @__PURE__ */ requireEsErrors(), t = /* @__PURE__ */ require_eval(), r = /* @__PURE__ */ requireRange(), s = /* @__PURE__ */ requireRef(), o = /* @__PURE__ */ requireSyntax(), u = /* @__PURE__ */ requireType(), h = /* @__PURE__ */ requireUri(), l = Function, c = function(O) {
    try {
      return l('"use strict"; return (' + O + ").constructor;")();
    } catch {
    }
  }, d = Object.getOwnPropertyDescriptor;
  if (d)
    try {
      d({}, "");
    } catch {
      d = null;
    }
  var _ = function() {
    throw new u();
  }, v = d ? function() {
    try {
      return arguments.callee, _;
    } catch {
      try {
        return d(arguments, "callee").get;
      } catch {
        return _;
      }
    }
  }() : _, y = requireHasSymbols()(), b = /* @__PURE__ */ requireHasProto()(), g = Object.getPrototypeOf || (b ? function(O) {
    return O.__proto__;
  } : null), m = {}, E = typeof Uint8Array > "u" || !g ? a : g(Uint8Array), S = {
    __proto__: null,
    "%AggregateError%": typeof AggregateError > "u" ? a : AggregateError,
    "%Array%": Array,
    "%ArrayBuffer%": typeof ArrayBuffer > "u" ? a : ArrayBuffer,
    "%ArrayIteratorPrototype%": y && g ? g([][Symbol.iterator]()) : a,
    "%AsyncFromSyncIteratorPrototype%": a,
    "%AsyncFunction%": m,
    "%AsyncGenerator%": m,
    "%AsyncGeneratorFunction%": m,
    "%AsyncIteratorPrototype%": m,
    "%Atomics%": typeof Atomics > "u" ? a : Atomics,
    "%BigInt%": typeof BigInt > "u" ? a : BigInt,
    "%BigInt64Array%": typeof BigInt64Array > "u" ? a : BigInt64Array,
    "%BigUint64Array%": typeof BigUint64Array > "u" ? a : BigUint64Array,
    "%Boolean%": Boolean,
    "%DataView%": typeof DataView > "u" ? a : DataView,
    "%Date%": Date,
    "%decodeURI%": decodeURI,
    "%decodeURIComponent%": decodeURIComponent,
    "%encodeURI%": encodeURI,
    "%encodeURIComponent%": encodeURIComponent,
    "%Error%": e,
    "%eval%": eval,
    // eslint-disable-line no-eval
    "%EvalError%": t,
    "%Float32Array%": typeof Float32Array > "u" ? a : Float32Array,
    "%Float64Array%": typeof Float64Array > "u" ? a : Float64Array,
    "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? a : FinalizationRegistry,
    "%Function%": l,
    "%GeneratorFunction%": m,
    "%Int8Array%": typeof Int8Array > "u" ? a : Int8Array,
    "%Int16Array%": typeof Int16Array > "u" ? a : Int16Array,
    "%Int32Array%": typeof Int32Array > "u" ? a : Int32Array,
    "%isFinite%": isFinite,
    "%isNaN%": isNaN,
    "%IteratorPrototype%": y && g ? g(g([][Symbol.iterator]())) : a,
    "%JSON%": typeof JSON == "object" ? JSON : a,
    "%Map%": typeof Map > "u" ? a : Map,
    "%MapIteratorPrototype%": typeof Map > "u" || !y || !g ? a : g((/* @__PURE__ */ new Map())[Symbol.iterator]()),
    "%Math%": Math,
    "%Number%": Number,
    "%Object%": Object,
    "%parseFloat%": parseFloat,
    "%parseInt%": parseInt,
    "%Promise%": typeof Promise > "u" ? a : Promise,
    "%Proxy%": typeof Proxy > "u" ? a : Proxy,
    "%RangeError%": r,
    "%ReferenceError%": s,
    "%Reflect%": typeof Reflect > "u" ? a : Reflect,
    "%RegExp%": RegExp,
    "%Set%": typeof Set > "u" ? a : Set,
    "%SetIteratorPrototype%": typeof Set > "u" || !y || !g ? a : g((/* @__PURE__ */ new Set())[Symbol.iterator]()),
    "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? a : SharedArrayBuffer,
    "%String%": String,
    "%StringIteratorPrototype%": y && g ? g(""[Symbol.iterator]()) : a,
    "%Symbol%": y ? Symbol : a,
    "%SyntaxError%": o,
    "%ThrowTypeError%": v,
    "%TypedArray%": E,
    "%TypeError%": u,
    "%Uint8Array%": typeof Uint8Array > "u" ? a : Uint8Array,
    "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? a : Uint8ClampedArray,
    "%Uint16Array%": typeof Uint16Array > "u" ? a : Uint16Array,
    "%Uint32Array%": typeof Uint32Array > "u" ? a : Uint32Array,
    "%URIError%": h,
    "%WeakMap%": typeof WeakMap > "u" ? a : WeakMap,
    "%WeakRef%": typeof WeakRef > "u" ? a : WeakRef,
    "%WeakSet%": typeof WeakSet > "u" ? a : WeakSet
  };
  if (g)
    try {
      null.error;
    } catch (O) {
      var P = g(g(O));
      S["%Error.prototype%"] = P;
    }
  var L = function O(A) {
    var B;
    if (A === "%AsyncFunction%")
      B = c("async function () {}");
    else if (A === "%GeneratorFunction%")
      B = c("function* () {}");
    else if (A === "%AsyncGeneratorFunction%")
      B = c("async function* () {}");
    else if (A === "%AsyncGenerator%") {
      var N = O("%AsyncGeneratorFunction%");
      N && (B = N.prototype);
    } else if (A === "%AsyncIteratorPrototype%") {
      var D = O("%AsyncGenerator%");
      D && g && (B = g(D.prototype));
    }
    return S[A] = B, B;
  }, T = {
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
  }, I = requireFunctionBind(), w = /* @__PURE__ */ requireHasown(), M = I.call(Function.call, Array.prototype.concat), F = I.call(Function.apply, Array.prototype.splice), k = I.call(Function.call, String.prototype.replace), V = I.call(Function.call, String.prototype.slice), X = I.call(Function.call, RegExp.prototype.exec), ne = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, oe = /\\(\\)?/g, K = function(A) {
    var B = V(A, 0, 1), N = V(A, -1);
    if (B === "%" && N !== "%")
      throw new o("invalid intrinsic syntax, expected closing `%`");
    if (N === "%" && B !== "%")
      throw new o("invalid intrinsic syntax, expected opening `%`");
    var D = [];
    return k(A, ne, function(G, U, Y, J) {
      D[D.length] = Y ? k(J, oe, "$1") : U || G;
    }), D;
  }, R = function(A, B) {
    var N = A, D;
    if (w(T, N) && (D = T[N], N = "%" + D[0] + "%"), w(S, N)) {
      var G = S[N];
      if (G === m && (G = L(N)), typeof G > "u" && !B)
        throw new u("intrinsic " + A + " exists, but is not available. Please file an issue!");
      return {
        alias: D,
        name: N,
        value: G
      };
    }
    throw new o("intrinsic " + A + " does not exist!");
  };
  return getIntrinsic = function(A, B) {
    if (typeof A != "string" || A.length === 0)
      throw new u("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof B != "boolean")
      throw new u('"allowMissing" argument must be a boolean');
    if (X(/^%?[^%]*%?$/, A) === null)
      throw new o("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var N = K(A), D = N.length > 0 ? N[0] : "", G = R("%" + D + "%", B), U = G.name, Y = G.value, J = !1, C = G.alias;
    C && (D = C[0], F(N, M([0, 1], C)));
    for (var te = 1, Z = !0; te < N.length; te += 1) {
      var se = N[te], ee = V(se, 0, 1), q = V(se, -1);
      if ((ee === '"' || ee === "'" || ee === "`" || q === '"' || q === "'" || q === "`") && ee !== q)
        throw new o("property names with quotes must have matching quotes");
      if ((se === "constructor" || !Z) && (J = !0), D += "." + se, U = "%" + D + "%", w(S, U))
        Y = S[U];
      else if (Y != null) {
        if (!(se in Y)) {
          if (!B)
            throw new u("base intrinsic for " + A + " exists, but the property is not available.");
          return;
        }
        if (d && te + 1 >= N.length) {
          var ue = d(Y, se);
          Z = !!ue, Z && "get" in ue && !("originalValue" in ue.get) ? Y = ue.get : Y = Y[se];
        } else
          Z = w(Y, se), Y = Y[se];
        Z && !J && (S[U] = Y);
      }
    }
    return Y;
  }, getIntrinsic;
}
var callBind = { exports: {} }, esDefineProperty, hasRequiredEsDefineProperty;
function requireEsDefineProperty() {
  if (hasRequiredEsDefineProperty) return esDefineProperty;
  hasRequiredEsDefineProperty = 1;
  var a = /* @__PURE__ */ requireGetIntrinsic(), e = a("%Object.defineProperty%", !0) || !1;
  if (e)
    try {
      e({}, "a", { value: 1 });
    } catch {
      e = !1;
    }
  return esDefineProperty = e, esDefineProperty;
}
var gopd, hasRequiredGopd;
function requireGopd() {
  if (hasRequiredGopd) return gopd;
  hasRequiredGopd = 1;
  var a = /* @__PURE__ */ requireGetIntrinsic(), e = a("%Object.getOwnPropertyDescriptor%", !0);
  if (e)
    try {
      e([], "length");
    } catch {
      e = null;
    }
  return gopd = e, gopd;
}
var defineDataProperty, hasRequiredDefineDataProperty;
function requireDefineDataProperty() {
  if (hasRequiredDefineDataProperty) return defineDataProperty;
  hasRequiredDefineDataProperty = 1;
  var a = /* @__PURE__ */ requireEsDefineProperty(), e = /* @__PURE__ */ requireSyntax(), t = /* @__PURE__ */ requireType(), r = /* @__PURE__ */ requireGopd();
  return defineDataProperty = function(o, u, h) {
    if (!o || typeof o != "object" && typeof o != "function")
      throw new t("`obj` must be an object or a function`");
    if (typeof u != "string" && typeof u != "symbol")
      throw new t("`property` must be a string or a symbol`");
    if (arguments.length > 3 && typeof arguments[3] != "boolean" && arguments[3] !== null)
      throw new t("`nonEnumerable`, if provided, must be a boolean or null");
    if (arguments.length > 4 && typeof arguments[4] != "boolean" && arguments[4] !== null)
      throw new t("`nonWritable`, if provided, must be a boolean or null");
    if (arguments.length > 5 && typeof arguments[5] != "boolean" && arguments[5] !== null)
      throw new t("`nonConfigurable`, if provided, must be a boolean or null");
    if (arguments.length > 6 && typeof arguments[6] != "boolean")
      throw new t("`loose`, if provided, must be a boolean");
    var l = arguments.length > 3 ? arguments[3] : null, c = arguments.length > 4 ? arguments[4] : null, d = arguments.length > 5 ? arguments[5] : null, _ = arguments.length > 6 ? arguments[6] : !1, v = !!r && r(o, u);
    if (a)
      a(o, u, {
        configurable: d === null && v ? v.configurable : !d,
        enumerable: l === null && v ? v.enumerable : !l,
        value: h,
        writable: c === null && v ? v.writable : !c
      });
    else if (_ || !l && !c && !d)
      o[u] = h;
    else
      throw new e("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
  }, defineDataProperty;
}
var hasPropertyDescriptors_1, hasRequiredHasPropertyDescriptors;
function requireHasPropertyDescriptors() {
  if (hasRequiredHasPropertyDescriptors) return hasPropertyDescriptors_1;
  hasRequiredHasPropertyDescriptors = 1;
  var a = /* @__PURE__ */ requireEsDefineProperty(), e = function() {
    return !!a;
  };
  return e.hasArrayLengthDefineBug = function() {
    if (!a)
      return null;
    try {
      return a([], "length", { value: 1 }).length !== 1;
    } catch {
      return !0;
    }
  }, hasPropertyDescriptors_1 = e, hasPropertyDescriptors_1;
}
var setFunctionLength, hasRequiredSetFunctionLength;
function requireSetFunctionLength() {
  if (hasRequiredSetFunctionLength) return setFunctionLength;
  hasRequiredSetFunctionLength = 1;
  var a = /* @__PURE__ */ requireGetIntrinsic(), e = /* @__PURE__ */ requireDefineDataProperty(), t = /* @__PURE__ */ requireHasPropertyDescriptors()(), r = /* @__PURE__ */ requireGopd(), s = /* @__PURE__ */ requireType(), o = a("%Math.floor%");
  return setFunctionLength = function(h, l) {
    if (typeof h != "function")
      throw new s("`fn` is not a function");
    if (typeof l != "number" || l < 0 || l > 4294967295 || o(l) !== l)
      throw new s("`length` must be a positive 32-bit integer");
    var c = arguments.length > 2 && !!arguments[2], d = !0, _ = !0;
    if ("length" in h && r) {
      var v = r(h, "length");
      v && !v.configurable && (d = !1), v && !v.writable && (_ = !1);
    }
    return (d || _ || !c) && (t ? e(
      /** @type {Parameters<define>[0]} */
      h,
      "length",
      l,
      !0,
      !0
    ) : e(
      /** @type {Parameters<define>[0]} */
      h,
      "length",
      l
    )), h;
  }, setFunctionLength;
}
var hasRequiredCallBind;
function requireCallBind() {
  return hasRequiredCallBind || (hasRequiredCallBind = 1, function(a) {
    var e = requireFunctionBind(), t = /* @__PURE__ */ requireGetIntrinsic(), r = /* @__PURE__ */ requireSetFunctionLength(), s = /* @__PURE__ */ requireType(), o = t("%Function.prototype.apply%"), u = t("%Function.prototype.call%"), h = t("%Reflect.apply%", !0) || e.call(u, o), l = /* @__PURE__ */ requireEsDefineProperty(), c = t("%Math.max%");
    a.exports = function(v) {
      if (typeof v != "function")
        throw new s("a function is required");
      var y = h(e, u, arguments);
      return r(
        y,
        1 + c(0, v.length - (arguments.length - 1)),
        !0
      );
    };
    var d = function() {
      return h(e, o, arguments);
    };
    l ? l(a.exports, "apply", { value: d }) : a.exports.apply = d;
  }(callBind)), callBind.exports;
}
var callBound, hasRequiredCallBound;
function requireCallBound() {
  if (hasRequiredCallBound) return callBound;
  hasRequiredCallBound = 1;
  var a = /* @__PURE__ */ requireGetIntrinsic(), e = requireCallBind(), t = e(a("String.prototype.indexOf"));
  return callBound = function(s, o) {
    var u = a(s, !!o);
    return typeof u == "function" && t(s, ".prototype.") > -1 ? e(u) : u;
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
  var a = typeof Map == "function" && Map.prototype, e = Object.getOwnPropertyDescriptor && a ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null, t = a && e && typeof e.get == "function" ? e.get : null, r = a && Map.prototype.forEach, s = typeof Set == "function" && Set.prototype, o = Object.getOwnPropertyDescriptor && s ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null, u = s && o && typeof o.get == "function" ? o.get : null, h = s && Set.prototype.forEach, l = typeof WeakMap == "function" && WeakMap.prototype, c = l ? WeakMap.prototype.has : null, d = typeof WeakSet == "function" && WeakSet.prototype, _ = d ? WeakSet.prototype.has : null, v = typeof WeakRef == "function" && WeakRef.prototype, y = v ? WeakRef.prototype.deref : null, b = Boolean.prototype.valueOf, g = Object.prototype.toString, m = Function.prototype.toString, E = String.prototype.match, S = String.prototype.slice, P = String.prototype.replace, L = String.prototype.toUpperCase, T = String.prototype.toLowerCase, I = RegExp.prototype.test, w = Array.prototype.concat, M = Array.prototype.join, F = Array.prototype.slice, k = Math.floor, V = typeof BigInt == "function" ? BigInt.prototype.valueOf : null, X = Object.getOwnPropertySymbols, ne = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Symbol.prototype.toString : null, oe = typeof Symbol == "function" && typeof Symbol.iterator == "object", K = typeof Symbol == "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === oe || !0) ? Symbol.toStringTag : null, R = Object.prototype.propertyIsEnumerable, O = (typeof Reflect == "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(H) {
    return H.__proto__;
  } : null);
  function A(H, $) {
    if (H === 1 / 0 || H === -1 / 0 || H !== H || H && H > -1e3 && H < 1e3 || I.call(/e/, $))
      return $;
    var ce = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
    if (typeof H == "number") {
      var de = H < 0 ? -k(-H) : k(H);
      if (de !== H) {
        var pe = String(de), he = S.call($, pe.length + 1);
        return P.call(pe, ce, "$&_") + "." + P.call(P.call(he, /([0-9]{3})/g, "$&_"), /_$/, "");
      }
    }
    return P.call($, ce, "$&_");
  }
  var B = require$$0, N = B.custom, D = ae(N) ? N : null, G = {
    __proto__: null,
    double: '"',
    single: "'"
  }, U = {
    __proto__: null,
    double: /(["\\])/g,
    single: /(['\\])/g
  };
  objectInspect = function H($, ce, de, pe) {
    var he = ce || {};
    if (ie(he, "quoteStyle") && !ie(G, he.quoteStyle))
      throw new TypeError('option "quoteStyle" must be "single" or "double"');
    if (ie(he, "maxStringLength") && (typeof he.maxStringLength == "number" ? he.maxStringLength < 0 && he.maxStringLength !== 1 / 0 : he.maxStringLength !== null))
      throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
    var Te = ie(he, "customInspect") ? he.customInspect : !0;
    if (typeof Te != "boolean" && Te !== "symbol")
      throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
    if (ie(he, "indent") && he.indent !== null && he.indent !== "	" && !(parseInt(he.indent, 10) === he.indent && he.indent > 0))
      throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
    if (ie(he, "numericSeparator") && typeof he.numericSeparator != "boolean")
      throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
    var Ae = he.numericSeparator;
    if (typeof $ > "u")
      return "undefined";
    if ($ === null)
      return "null";
    if (typeof $ == "boolean")
      return $ ? "true" : "false";
    if (typeof $ == "string")
      return ve($, he);
    if (typeof $ == "number") {
      if ($ === 0)
        return 1 / 0 / $ > 0 ? "0" : "-0";
      var ge = String($);
      return Ae ? A($, ge) : ge;
    }
    if (typeof $ == "bigint") {
      var Se = String($) + "n";
      return Ae ? A($, Se) : Se;
    }
    var Be = typeof he.depth > "u" ? 5 : he.depth;
    if (typeof de > "u" && (de = 0), de >= Be && Be > 0 && typeof $ == "object")
      return C($) ? "[Array]" : "[Object]";
    var Ie = et(he, de);
    if (typeof pe > "u")
      pe = [];
    else if (be(pe, $) >= 0)
      return "[Circular]";
    function xe(Oe, Le, rt) {
      if (Le && (pe = F.call(pe), pe.push(Le)), rt) {
        var Je = {
          depth: he.depth
        };
        return ie(he, "quoteStyle") && (Je.quoteStyle = he.quoteStyle), H(Oe, Je, de + 1, pe);
      }
      return H(Oe, he, de + 1, pe);
    }
    if (typeof $ == "function" && !Z($)) {
      var ze = me($), Ye = De($, xe);
      return "[Function" + (ze ? ": " + ze : " (anonymous)") + "]" + (Ye.length > 0 ? " { " + M.call(Ye, ", ") + " }" : "");
    }
    if (ae($)) {
      var Ve = oe ? P.call(String($), /^(Symbol\(.*\))_[^)]*$/, "$1") : ne.call($);
      return typeof $ == "object" && !oe ? le(Ve) : Ve;
    }
    if (_e($)) {
      for (var Ce = "<" + T.call(String($.nodeName)), ke = $.attributes || [], Ne = 0; Ne < ke.length; Ne++)
        Ce += " " + ke[Ne].name + "=" + Y(J(ke[Ne].value), "double", he);
      return Ce += ">", $.childNodes && $.childNodes.length && (Ce += "..."), Ce += "</" + T.call(String($.nodeName)) + ">", Ce;
    }
    if (C($)) {
      if ($.length === 0)
        return "[]";
      var Ue = De($, xe);
      return Ie && !Qe(Ue) ? "[" + Fe(Ue, Ie) + "]" : "[ " + M.call(Ue, ", ") + " ]";
    }
    if (se($)) {
      var Ge = De($, xe);
      return !("cause" in Error.prototype) && "cause" in $ && !R.call($, "cause") ? "{ [" + String($) + "] " + M.call(w.call("[cause]: " + xe($.cause), Ge), ", ") + " }" : Ge.length === 0 ? "[" + String($) + "]" : "{ [" + String($) + "] " + M.call(Ge, ", ") + " }";
    }
    if (typeof $ == "object" && Te) {
      if (D && typeof $[D] == "function" && B)
        return B($, { depth: Be - de });
      if (Te !== "symbol" && typeof $.inspect == "function")
        return $.inspect();
    }
    if (Ee($)) {
      var We = [];
      return r && r.call($, function(Oe, Le) {
        We.push(xe(Le, $, !0) + " => " + xe(Oe, $));
      }), $e("Map", t.call($), We, Ie);
    }
    if (Re($)) {
      var qe = [];
      return h && h.call($, function(Oe) {
        qe.push(xe(Oe, $));
      }), $e("Set", u.call($), qe, Ie);
    }
    if (Pe($))
      return ye("WeakMap");
    if (Me($))
      return ye("WeakSet");
    if (we($))
      return ye("WeakRef");
    if (q($))
      return le(xe(Number($)));
    if (z($))
      return le(xe(V.call($)));
    if (ue($))
      return le(b.call($));
    if (ee($))
      return le(xe(String($)));
    if (typeof window < "u" && $ === window)
      return "{ [object Window] }";
    if (typeof globalThis < "u" && $ === globalThis || typeof commonjsGlobal < "u" && $ === commonjsGlobal)
      return "{ [object globalThis] }";
    if (!te($) && !Z($)) {
      var je = De($, xe), Ze = O ? O($) === Object.prototype : $ instanceof Object || $.constructor === Object, He = $ instanceof Object ? "" : "null prototype", Ke = !Ze && K && Object($) === $ && K in $ ? S.call(W($), 8, -1) : He ? "Object" : "", tt = Ze || typeof $.constructor != "function" ? "" : $.constructor.name ? $.constructor.name + " " : "", Xe = tt + (Ke || He ? "[" + M.call(w.call([], Ke || [], He || []), ": ") + "] " : "");
      return je.length === 0 ? Xe + "{}" : Ie ? Xe + "{" + Fe(je, Ie) + "}" : Xe + "{ " + M.call(je, ", ") + " }";
    }
    return String($);
  };
  function Y(H, $, ce) {
    var de = ce.quoteStyle || $, pe = G[de];
    return pe + H + pe;
  }
  function J(H) {
    return P.call(String(H), /"/g, "&quot;");
  }
  function C(H) {
    return W(H) === "[object Array]" && (!K || !(typeof H == "object" && K in H));
  }
  function te(H) {
    return W(H) === "[object Date]" && (!K || !(typeof H == "object" && K in H));
  }
  function Z(H) {
    return W(H) === "[object RegExp]" && (!K || !(typeof H == "object" && K in H));
  }
  function se(H) {
    return W(H) === "[object Error]" && (!K || !(typeof H == "object" && K in H));
  }
  function ee(H) {
    return W(H) === "[object String]" && (!K || !(typeof H == "object" && K in H));
  }
  function q(H) {
    return W(H) === "[object Number]" && (!K || !(typeof H == "object" && K in H));
  }
  function ue(H) {
    return W(H) === "[object Boolean]" && (!K || !(typeof H == "object" && K in H));
  }
  function ae(H) {
    if (oe)
      return H && typeof H == "object" && H instanceof Symbol;
    if (typeof H == "symbol")
      return !0;
    if (!H || typeof H != "object" || !ne)
      return !1;
    try {
      return ne.call(H), !0;
    } catch {
    }
    return !1;
  }
  function z(H) {
    if (!H || typeof H != "object" || !V)
      return !1;
    try {
      return V.call(H), !0;
    } catch {
    }
    return !1;
  }
  var Q = Object.prototype.hasOwnProperty || function(H) {
    return H in this;
  };
  function ie(H, $) {
    return Q.call(H, $);
  }
  function W(H) {
    return g.call(H);
  }
  function me(H) {
    if (H.name)
      return H.name;
    var $ = E.call(m.call(H), /^function\s*([\w$]+)/);
    return $ ? $[1] : null;
  }
  function be(H, $) {
    if (H.indexOf)
      return H.indexOf($);
    for (var ce = 0, de = H.length; ce < de; ce++)
      if (H[ce] === $)
        return ce;
    return -1;
  }
  function Ee(H) {
    if (!t || !H || typeof H != "object")
      return !1;
    try {
      t.call(H);
      try {
        u.call(H);
      } catch {
        return !0;
      }
      return H instanceof Map;
    } catch {
    }
    return !1;
  }
  function Pe(H) {
    if (!c || !H || typeof H != "object")
      return !1;
    try {
      c.call(H, c);
      try {
        _.call(H, _);
      } catch {
        return !0;
      }
      return H instanceof WeakMap;
    } catch {
    }
    return !1;
  }
  function we(H) {
    if (!y || !H || typeof H != "object")
      return !1;
    try {
      return y.call(H), !0;
    } catch {
    }
    return !1;
  }
  function Re(H) {
    if (!u || !H || typeof H != "object")
      return !1;
    try {
      u.call(H);
      try {
        t.call(H);
      } catch {
        return !0;
      }
      return H instanceof Set;
    } catch {
    }
    return !1;
  }
  function Me(H) {
    if (!_ || !H || typeof H != "object")
      return !1;
    try {
      _.call(H, _);
      try {
        c.call(H, c);
      } catch {
        return !0;
      }
      return H instanceof WeakSet;
    } catch {
    }
    return !1;
  }
  function _e(H) {
    return !H || typeof H != "object" ? !1 : typeof HTMLElement < "u" && H instanceof HTMLElement ? !0 : typeof H.nodeName == "string" && typeof H.getAttribute == "function";
  }
  function ve(H, $) {
    if (H.length > $.maxStringLength) {
      var ce = H.length - $.maxStringLength, de = "... " + ce + " more character" + (ce > 1 ? "s" : "");
      return ve(S.call(H, 0, $.maxStringLength), $) + de;
    }
    var pe = U[$.quoteStyle || "single"];
    pe.lastIndex = 0;
    var he = P.call(P.call(H, pe, "\\$1"), /[\x00-\x1f]/g, fe);
    return Y(he, "single", $);
  }
  function fe(H) {
    var $ = H.charCodeAt(0), ce = {
      8: "b",
      9: "t",
      10: "n",
      12: "f",
      13: "r"
    }[$];
    return ce ? "\\" + ce : "\\x" + ($ < 16 ? "0" : "") + L.call($.toString(16));
  }
  function le(H) {
    return "Object(" + H + ")";
  }
  function ye(H) {
    return H + " { ? }";
  }
  function $e(H, $, ce, de) {
    var pe = de ? Fe(ce, de) : M.call(ce, ", ");
    return H + " (" + $ + ") {" + pe + "}";
  }
  function Qe(H) {
    for (var $ = 0; $ < H.length; $++)
      if (be(H[$], `
`) >= 0)
        return !1;
    return !0;
  }
  function et(H, $) {
    var ce;
    if (H.indent === "	")
      ce = "	";
    else if (typeof H.indent == "number" && H.indent > 0)
      ce = M.call(Array(H.indent + 1), " ");
    else
      return null;
    return {
      base: ce,
      prev: M.call(Array($ + 1), ce)
    };
  }
  function Fe(H, $) {
    if (H.length === 0)
      return "";
    var ce = `
` + $.prev + $.base;
    return ce + M.call(H, "," + ce) + `
` + $.prev;
  }
  function De(H, $) {
    var ce = C(H), de = [];
    if (ce) {
      de.length = H.length;
      for (var pe = 0; pe < H.length; pe++)
        de[pe] = ie(H, pe) ? $(H[pe], H) : "";
    }
    var he = typeof X == "function" ? X(H) : [], Te;
    if (oe) {
      Te = {};
      for (var Ae = 0; Ae < he.length; Ae++)
        Te["$" + he[Ae]] = he[Ae];
    }
    for (var ge in H)
      ie(H, ge) && (ce && String(Number(ge)) === ge && ge < H.length || oe && Te["$" + ge] instanceof Symbol || (I.call(/[^\w$]/, ge) ? de.push($(ge, H) + ": " + $(H[ge], H)) : de.push(ge + ": " + $(H[ge], H))));
    if (typeof X == "function")
      for (var Se = 0; Se < he.length; Se++)
        R.call(H, he[Se]) && de.push("[" + $(he[Se]) + "]: " + $(H[he[Se]], H));
    return de;
  }
  return objectInspect;
}
var sideChannel, hasRequiredSideChannel;
function requireSideChannel() {
  if (hasRequiredSideChannel) return sideChannel;
  hasRequiredSideChannel = 1;
  var a = /* @__PURE__ */ requireGetIntrinsic(), e = requireCallBound(), t = /* @__PURE__ */ requireObjectInspect(), r = /* @__PURE__ */ requireType(), s = a("%WeakMap%", !0), o = a("%Map%", !0), u = e("WeakMap.prototype.get", !0), h = e("WeakMap.prototype.set", !0), l = e("WeakMap.prototype.has", !0), c = e("Map.prototype.get", !0), d = e("Map.prototype.set", !0), _ = e("Map.prototype.has", !0), v = function(m, E) {
    for (var S = m, P; (P = S.next) !== null; S = P)
      if (P.key === E)
        return S.next = P.next, P.next = /** @type {NonNullable<typeof list.next>} */
        m.next, m.next = P, P;
  }, y = function(m, E) {
    var S = v(m, E);
    return S && S.value;
  }, b = function(m, E, S) {
    var P = v(m, E);
    P ? P.value = S : m.next = /** @type {import('.').ListNode<typeof value>} */
    {
      // eslint-disable-line no-param-reassign, no-extra-parens
      key: E,
      next: m.next,
      value: S
    };
  }, g = function(m, E) {
    return !!v(m, E);
  };
  return sideChannel = function() {
    var E, S, P, L = {
      assert: function(T) {
        if (!L.has(T))
          throw new r("Side channel does not contain " + t(T));
      },
      get: function(T) {
        if (s && T && (typeof T == "object" || typeof T == "function")) {
          if (E)
            return u(E, T);
        } else if (o) {
          if (S)
            return c(S, T);
        } else if (P)
          return y(P, T);
      },
      has: function(T) {
        if (s && T && (typeof T == "object" || typeof T == "function")) {
          if (E)
            return l(E, T);
        } else if (o) {
          if (S)
            return _(S, T);
        } else if (P)
          return g(P, T);
        return !1;
      },
      set: function(T, I) {
        s && T && (typeof T == "object" || typeof T == "function") ? (E || (E = new s()), h(E, T, I)) : o ? (S || (S = new o()), d(S, T, I)) : (P || (P = { key: {}, next: null }), b(P, T, I));
      }
    };
    return L;
  }, sideChannel;
}
var formats$1, hasRequiredFormats;
function requireFormats() {
  if (hasRequiredFormats) return formats$1;
  hasRequiredFormats = 1;
  var a = String.prototype.replace, e = /%20/g, t = {
    RFC1738: "RFC1738",
    RFC3986: "RFC3986"
  };
  return formats$1 = {
    default: t.RFC3986,
    formatters: {
      RFC1738: function(r) {
        return a.call(r, e, "+");
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
  var a = /* @__PURE__ */ requireFormats(), e = Object.prototype.hasOwnProperty, t = Array.isArray, r = function() {
    for (var m = [], E = 0; E < 256; ++E)
      m.push("%" + ((E < 16 ? "0" : "") + E.toString(16)).toUpperCase());
    return m;
  }(), s = function(E) {
    for (; E.length > 1; ) {
      var S = E.pop(), P = S.obj[S.prop];
      if (t(P)) {
        for (var L = [], T = 0; T < P.length; ++T)
          typeof P[T] < "u" && L.push(P[T]);
        S.obj[S.prop] = L;
      }
    }
  }, o = function(E, S) {
    for (var P = S && S.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, L = 0; L < E.length; ++L)
      typeof E[L] < "u" && (P[L] = E[L]);
    return P;
  }, u = function m(E, S, P) {
    if (!S)
      return E;
    if (typeof S != "object") {
      if (t(E))
        E.push(S);
      else if (E && typeof E == "object")
        (P && (P.plainObjects || P.allowPrototypes) || !e.call(Object.prototype, S)) && (E[S] = !0);
      else
        return [E, S];
      return E;
    }
    if (!E || typeof E != "object")
      return [E].concat(S);
    var L = E;
    return t(E) && !t(S) && (L = o(E, P)), t(E) && t(S) ? (S.forEach(function(T, I) {
      if (e.call(E, I)) {
        var w = E[I];
        w && typeof w == "object" && T && typeof T == "object" ? E[I] = m(w, T, P) : E.push(T);
      } else
        E[I] = T;
    }), E) : Object.keys(S).reduce(function(T, I) {
      var w = S[I];
      return e.call(T, I) ? T[I] = m(T[I], w, P) : T[I] = w, T;
    }, L);
  }, h = function(E, S) {
    return Object.keys(S).reduce(function(P, L) {
      return P[L] = S[L], P;
    }, E);
  }, l = function(m, E, S) {
    var P = m.replace(/\+/g, " ");
    if (S === "iso-8859-1")
      return P.replace(/%[0-9a-f]{2}/gi, unescape);
    try {
      return decodeURIComponent(P);
    } catch {
      return P;
    }
  }, c = 1024, d = function(E, S, P, L, T) {
    if (E.length === 0)
      return E;
    var I = E;
    if (typeof E == "symbol" ? I = Symbol.prototype.toString.call(E) : typeof E != "string" && (I = String(E)), P === "iso-8859-1")
      return escape(I).replace(/%u[0-9a-f]{4}/gi, function(ne) {
        return "%26%23" + parseInt(ne.slice(2), 16) + "%3B";
      });
    for (var w = "", M = 0; M < I.length; M += c) {
      for (var F = I.length >= c ? I.slice(M, M + c) : I, k = [], V = 0; V < F.length; ++V) {
        var X = F.charCodeAt(V);
        if (X === 45 || X === 46 || X === 95 || X === 126 || X >= 48 && X <= 57 || X >= 65 && X <= 90 || X >= 97 && X <= 122 || T === a.RFC1738 && (X === 40 || X === 41)) {
          k[k.length] = F.charAt(V);
          continue;
        }
        if (X < 128) {
          k[k.length] = r[X];
          continue;
        }
        if (X < 2048) {
          k[k.length] = r[192 | X >> 6] + r[128 | X & 63];
          continue;
        }
        if (X < 55296 || X >= 57344) {
          k[k.length] = r[224 | X >> 12] + r[128 | X >> 6 & 63] + r[128 | X & 63];
          continue;
        }
        V += 1, X = 65536 + ((X & 1023) << 10 | F.charCodeAt(V) & 1023), k[k.length] = r[240 | X >> 18] + r[128 | X >> 12 & 63] + r[128 | X >> 6 & 63] + r[128 | X & 63];
      }
      w += k.join("");
    }
    return w;
  }, _ = function(E) {
    for (var S = [{ obj: { o: E }, prop: "o" }], P = [], L = 0; L < S.length; ++L)
      for (var T = S[L], I = T.obj[T.prop], w = Object.keys(I), M = 0; M < w.length; ++M) {
        var F = w[M], k = I[F];
        typeof k == "object" && k !== null && P.indexOf(k) === -1 && (S.push({ obj: I, prop: F }), P.push(k));
      }
    return s(S), E;
  }, v = function(E) {
    return Object.prototype.toString.call(E) === "[object RegExp]";
  }, y = function(E) {
    return !E || typeof E != "object" ? !1 : !!(E.constructor && E.constructor.isBuffer && E.constructor.isBuffer(E));
  }, b = function(E, S) {
    return [].concat(E, S);
  }, g = function(E, S) {
    if (t(E)) {
      for (var P = [], L = 0; L < E.length; L += 1)
        P.push(S(E[L]));
      return P;
    }
    return S(E);
  };
  return utils = {
    arrayToObject: o,
    assign: h,
    combine: b,
    compact: _,
    decode: l,
    encode: d,
    isBuffer: y,
    isRegExp: v,
    maybeMap: g,
    merge: u
  }, utils;
}
var stringify_1, hasRequiredStringify;
function requireStringify() {
  if (hasRequiredStringify) return stringify_1;
  hasRequiredStringify = 1;
  var a = requireSideChannel(), e = /* @__PURE__ */ requireUtils(), t = /* @__PURE__ */ requireFormats(), r = Object.prototype.hasOwnProperty, s = {
    brackets: function(m) {
      return m + "[]";
    },
    comma: "comma",
    indices: function(m, E) {
      return m + "[" + E + "]";
    },
    repeat: function(m) {
      return m;
    }
  }, o = Array.isArray, u = Array.prototype.push, h = function(g, m) {
    u.apply(g, o(m) ? m : [m]);
  }, l = Date.prototype.toISOString, c = t.default, d = {
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
    format: c,
    formatter: t.formatters[c],
    // deprecated
    indices: !1,
    serializeDate: function(m) {
      return l.call(m);
    },
    skipNulls: !1,
    strictNullHandling: !1
  }, _ = function(m) {
    return typeof m == "string" || typeof m == "number" || typeof m == "boolean" || typeof m == "symbol" || typeof m == "bigint";
  }, v = {}, y = function g(m, E, S, P, L, T, I, w, M, F, k, V, X, ne, oe, K, R, O) {
    for (var A = m, B = O, N = 0, D = !1; (B = B.get(v)) !== void 0 && !D; ) {
      var G = B.get(m);
      if (N += 1, typeof G < "u") {
        if (G === N)
          throw new RangeError("Cyclic object value");
        D = !0;
      }
      typeof B.get(v) > "u" && (N = 0);
    }
    if (typeof F == "function" ? A = F(E, A) : A instanceof Date ? A = X(A) : S === "comma" && o(A) && (A = e.maybeMap(A, function(Q) {
      return Q instanceof Date ? X(Q) : Q;
    })), A === null) {
      if (T)
        return M && !K ? M(E, d.encoder, R, "key", ne) : E;
      A = "";
    }
    if (_(A) || e.isBuffer(A)) {
      if (M) {
        var U = K ? E : M(E, d.encoder, R, "key", ne);
        return [oe(U) + "=" + oe(M(A, d.encoder, R, "value", ne))];
      }
      return [oe(E) + "=" + oe(String(A))];
    }
    var Y = [];
    if (typeof A > "u")
      return Y;
    var J;
    if (S === "comma" && o(A))
      K && M && (A = e.maybeMap(A, M)), J = [{ value: A.length > 0 ? A.join(",") || null : void 0 }];
    else if (o(F))
      J = F;
    else {
      var C = Object.keys(A);
      J = k ? C.sort(k) : C;
    }
    var te = w ? E.replace(/\./g, "%2E") : E, Z = P && o(A) && A.length === 1 ? te + "[]" : te;
    if (L && o(A) && A.length === 0)
      return Z + "[]";
    for (var se = 0; se < J.length; ++se) {
      var ee = J[se], q = typeof ee == "object" && typeof ee.value < "u" ? ee.value : A[ee];
      if (!(I && q === null)) {
        var ue = V && w ? ee.replace(/\./g, "%2E") : ee, ae = o(A) ? typeof S == "function" ? S(Z, ue) : Z : Z + (V ? "." + ue : "[" + ue + "]");
        O.set(m, N);
        var z = a();
        z.set(v, O), h(Y, g(
          q,
          ae,
          S,
          P,
          L,
          T,
          I,
          w,
          S === "comma" && K && o(A) ? null : M,
          F,
          k,
          V,
          X,
          ne,
          oe,
          K,
          R,
          z
        ));
      }
    }
    return Y;
  }, b = function(m) {
    if (!m)
      return d;
    if (typeof m.allowEmptyArrays < "u" && typeof m.allowEmptyArrays != "boolean")
      throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
    if (typeof m.encodeDotInKeys < "u" && typeof m.encodeDotInKeys != "boolean")
      throw new TypeError("`encodeDotInKeys` option can only be `true` or `false`, when provided");
    if (m.encoder !== null && typeof m.encoder < "u" && typeof m.encoder != "function")
      throw new TypeError("Encoder has to be a function.");
    var E = m.charset || d.charset;
    if (typeof m.charset < "u" && m.charset !== "utf-8" && m.charset !== "iso-8859-1")
      throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
    var S = t.default;
    if (typeof m.format < "u") {
      if (!r.call(t.formatters, m.format))
        throw new TypeError("Unknown format option provided.");
      S = m.format;
    }
    var P = t.formatters[S], L = d.filter;
    (typeof m.filter == "function" || o(m.filter)) && (L = m.filter);
    var T;
    if (m.arrayFormat in s ? T = m.arrayFormat : "indices" in m ? T = m.indices ? "indices" : "repeat" : T = d.arrayFormat, "commaRoundTrip" in m && typeof m.commaRoundTrip != "boolean")
      throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
    var I = typeof m.allowDots > "u" ? m.encodeDotInKeys === !0 ? !0 : d.allowDots : !!m.allowDots;
    return {
      addQueryPrefix: typeof m.addQueryPrefix == "boolean" ? m.addQueryPrefix : d.addQueryPrefix,
      allowDots: I,
      allowEmptyArrays: typeof m.allowEmptyArrays == "boolean" ? !!m.allowEmptyArrays : d.allowEmptyArrays,
      arrayFormat: T,
      charset: E,
      charsetSentinel: typeof m.charsetSentinel == "boolean" ? m.charsetSentinel : d.charsetSentinel,
      commaRoundTrip: m.commaRoundTrip,
      delimiter: typeof m.delimiter > "u" ? d.delimiter : m.delimiter,
      encode: typeof m.encode == "boolean" ? m.encode : d.encode,
      encodeDotInKeys: typeof m.encodeDotInKeys == "boolean" ? m.encodeDotInKeys : d.encodeDotInKeys,
      encoder: typeof m.encoder == "function" ? m.encoder : d.encoder,
      encodeValuesOnly: typeof m.encodeValuesOnly == "boolean" ? m.encodeValuesOnly : d.encodeValuesOnly,
      filter: L,
      format: S,
      formatter: P,
      serializeDate: typeof m.serializeDate == "function" ? m.serializeDate : d.serializeDate,
      skipNulls: typeof m.skipNulls == "boolean" ? m.skipNulls : d.skipNulls,
      sort: typeof m.sort == "function" ? m.sort : null,
      strictNullHandling: typeof m.strictNullHandling == "boolean" ? m.strictNullHandling : d.strictNullHandling
    };
  };
  return stringify_1 = function(g, m) {
    var E = g, S = b(m), P, L;
    typeof S.filter == "function" ? (L = S.filter, E = L("", E)) : o(S.filter) && (L = S.filter, P = L);
    var T = [];
    if (typeof E != "object" || E === null)
      return "";
    var I = s[S.arrayFormat], w = I === "comma" && S.commaRoundTrip;
    P || (P = Object.keys(E)), S.sort && P.sort(S.sort);
    for (var M = a(), F = 0; F < P.length; ++F) {
      var k = P[F];
      S.skipNulls && E[k] === null || h(T, y(
        E[k],
        k,
        I,
        w,
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
        M
      ));
    }
    var V = T.join(S.delimiter), X = S.addQueryPrefix === !0 ? "?" : "";
    return S.charsetSentinel && (S.charset === "iso-8859-1" ? X += "utf8=%26%2310003%3B&" : X += "utf8=%E2%9C%93&"), V.length > 0 ? X + V : "";
  }, stringify_1;
}
var parse$1, hasRequiredParse;
function requireParse() {
  if (hasRequiredParse) return parse$1;
  hasRequiredParse = 1;
  var a = /* @__PURE__ */ requireUtils(), e = Object.prototype.hasOwnProperty, t = Array.isArray, r = {
    allowDots: !1,
    allowEmptyArrays: !1,
    allowPrototypes: !1,
    allowSparse: !1,
    arrayLimit: 20,
    charset: "utf-8",
    charsetSentinel: !1,
    comma: !1,
    decodeDotInKeys: !1,
    decoder: a.decode,
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
  }, s = function(v) {
    return v.replace(/&#(\d+);/g, function(y, b) {
      return String.fromCharCode(parseInt(b, 10));
    });
  }, o = function(v, y) {
    return v && typeof v == "string" && y.comma && v.indexOf(",") > -1 ? v.split(",") : v;
  }, u = "utf8=%26%2310003%3B", h = "utf8=%E2%9C%93", l = function(y, b) {
    var g = { __proto__: null }, m = b.ignoreQueryPrefix ? y.replace(/^\?/, "") : y;
    m = m.replace(/%5B/gi, "[").replace(/%5D/gi, "]");
    var E = b.parameterLimit === 1 / 0 ? void 0 : b.parameterLimit, S = m.split(b.delimiter, E), P = -1, L, T = b.charset;
    if (b.charsetSentinel)
      for (L = 0; L < S.length; ++L)
        S[L].indexOf("utf8=") === 0 && (S[L] === h ? T = "utf-8" : S[L] === u && (T = "iso-8859-1"), P = L, L = S.length);
    for (L = 0; L < S.length; ++L)
      if (L !== P) {
        var I = S[L], w = I.indexOf("]="), M = w === -1 ? I.indexOf("=") : w + 1, F, k;
        M === -1 ? (F = b.decoder(I, r.decoder, T, "key"), k = b.strictNullHandling ? null : "") : (F = b.decoder(I.slice(0, M), r.decoder, T, "key"), k = a.maybeMap(
          o(I.slice(M + 1), b),
          function(X) {
            return b.decoder(X, r.decoder, T, "value");
          }
        )), k && b.interpretNumericEntities && T === "iso-8859-1" && (k = s(k)), I.indexOf("[]=") > -1 && (k = t(k) ? [k] : k);
        var V = e.call(g, F);
        V && b.duplicates === "combine" ? g[F] = a.combine(g[F], k) : (!V || b.duplicates === "last") && (g[F] = k);
      }
    return g;
  }, c = function(v, y, b, g) {
    for (var m = g ? y : o(y, b), E = v.length - 1; E >= 0; --E) {
      var S, P = v[E];
      if (P === "[]" && b.parseArrays)
        S = b.allowEmptyArrays && (m === "" || b.strictNullHandling && m === null) ? [] : [].concat(m);
      else {
        S = b.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
        var L = P.charAt(0) === "[" && P.charAt(P.length - 1) === "]" ? P.slice(1, -1) : P, T = b.decodeDotInKeys ? L.replace(/%2E/g, ".") : L, I = parseInt(T, 10);
        !b.parseArrays && T === "" ? S = { 0: m } : !isNaN(I) && P !== T && String(I) === T && I >= 0 && b.parseArrays && I <= b.arrayLimit ? (S = [], S[I] = m) : T !== "__proto__" && (S[T] = m);
      }
      m = S;
    }
    return m;
  }, d = function(y, b, g, m) {
    if (y) {
      var E = g.allowDots ? y.replace(/\.([^.[]+)/g, "[$1]") : y, S = /(\[[^[\]]*])/, P = /(\[[^[\]]*])/g, L = g.depth > 0 && S.exec(E), T = L ? E.slice(0, L.index) : E, I = [];
      if (T) {
        if (!g.plainObjects && e.call(Object.prototype, T) && !g.allowPrototypes)
          return;
        I.push(T);
      }
      for (var w = 0; g.depth > 0 && (L = P.exec(E)) !== null && w < g.depth; ) {
        if (w += 1, !g.plainObjects && e.call(Object.prototype, L[1].slice(1, -1)) && !g.allowPrototypes)
          return;
        I.push(L[1]);
      }
      if (L) {
        if (g.strictDepth === !0)
          throw new RangeError("Input depth exceeded depth option of " + g.depth + " and strictDepth is true");
        I.push("[" + E.slice(L.index) + "]");
      }
      return c(I, b, g, m);
    }
  }, _ = function(y) {
    if (!y)
      return r;
    if (typeof y.allowEmptyArrays < "u" && typeof y.allowEmptyArrays != "boolean")
      throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
    if (typeof y.decodeDotInKeys < "u" && typeof y.decodeDotInKeys != "boolean")
      throw new TypeError("`decodeDotInKeys` option can only be `true` or `false`, when provided");
    if (y.decoder !== null && typeof y.decoder < "u" && typeof y.decoder != "function")
      throw new TypeError("Decoder has to be a function.");
    if (typeof y.charset < "u" && y.charset !== "utf-8" && y.charset !== "iso-8859-1")
      throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
    var b = typeof y.charset > "u" ? r.charset : y.charset, g = typeof y.duplicates > "u" ? r.duplicates : y.duplicates;
    if (g !== "combine" && g !== "first" && g !== "last")
      throw new TypeError("The duplicates option must be either combine, first, or last");
    var m = typeof y.allowDots > "u" ? y.decodeDotInKeys === !0 ? !0 : r.allowDots : !!y.allowDots;
    return {
      allowDots: m,
      allowEmptyArrays: typeof y.allowEmptyArrays == "boolean" ? !!y.allowEmptyArrays : r.allowEmptyArrays,
      allowPrototypes: typeof y.allowPrototypes == "boolean" ? y.allowPrototypes : r.allowPrototypes,
      allowSparse: typeof y.allowSparse == "boolean" ? y.allowSparse : r.allowSparse,
      arrayLimit: typeof y.arrayLimit == "number" ? y.arrayLimit : r.arrayLimit,
      charset: b,
      charsetSentinel: typeof y.charsetSentinel == "boolean" ? y.charsetSentinel : r.charsetSentinel,
      comma: typeof y.comma == "boolean" ? y.comma : r.comma,
      decodeDotInKeys: typeof y.decodeDotInKeys == "boolean" ? y.decodeDotInKeys : r.decodeDotInKeys,
      decoder: typeof y.decoder == "function" ? y.decoder : r.decoder,
      delimiter: typeof y.delimiter == "string" || a.isRegExp(y.delimiter) ? y.delimiter : r.delimiter,
      // eslint-disable-next-line no-implicit-coercion, no-extra-parens
      depth: typeof y.depth == "number" || y.depth === !1 ? +y.depth : r.depth,
      duplicates: g,
      ignoreQueryPrefix: y.ignoreQueryPrefix === !0,
      interpretNumericEntities: typeof y.interpretNumericEntities == "boolean" ? y.interpretNumericEntities : r.interpretNumericEntities,
      parameterLimit: typeof y.parameterLimit == "number" ? y.parameterLimit : r.parameterLimit,
      parseArrays: y.parseArrays !== !1,
      plainObjects: typeof y.plainObjects == "boolean" ? y.plainObjects : r.plainObjects,
      strictDepth: typeof y.strictDepth == "boolean" ? !!y.strictDepth : r.strictDepth,
      strictNullHandling: typeof y.strictNullHandling == "boolean" ? y.strictNullHandling : r.strictNullHandling
    };
  };
  return parse$1 = function(v, y) {
    var b = _(y);
    if (v === "" || v === null || typeof v > "u")
      return b.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
    for (var g = typeof v == "string" ? l(v, b) : v, m = b.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, E = Object.keys(g), S = 0; S < E.length; ++S) {
      var P = E[S], L = d(P, g[P], b, typeof v == "string");
      m = a.merge(m, L, b);
    }
    return b.allowSparse === !0 ? m : a.compact(m);
  }, parse$1;
}
var lib, hasRequiredLib;
function requireLib() {
  if (hasRequiredLib) return lib;
  hasRequiredLib = 1;
  var a = /* @__PURE__ */ requireStringify(), e = /* @__PURE__ */ requireParse(), t = /* @__PURE__ */ requireFormats();
  return lib = {
    formats: t,
    parse: e,
    stringify: a
  }, lib;
}
var hasRequiredUrl;
function requireUrl() {
  if (hasRequiredUrl) return url$2;
  hasRequiredUrl = 1;
  var a = requirePunycode();
  function e() {
    this.protocol = null, this.slashes = null, this.auth = null, this.host = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.query = null, this.pathname = null, this.path = null, this.href = null;
  }
  var t = /^([a-z0-9.+-]+:)/i, r = /:[0-9]*$/, s = /^(\/\/?(?!\/)[^?\s]*)(\?[^\s]*)?$/, o = [
    "<",
    ">",
    '"',
    "`",
    " ",
    "\r",
    `
`,
    "	"
  ], u = [
    "{",
    "}",
    "|",
    "\\",
    "^",
    "`"
  ].concat(o), h = ["'"].concat(u), l = [
    "%",
    "/",
    "?",
    ";",
    "#"
  ].concat(h), c = [
    "/",
    "?",
    "#"
  ], d = 255, _ = /^[+a-z0-9A-Z_-]{0,63}$/, v = /^([+a-z0-9A-Z_-]{0,63})(.*)$/, y = {
    javascript: !0,
    "javascript:": !0
  }, b = {
    javascript: !0,
    "javascript:": !0
  }, g = {
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
  }, m = /* @__PURE__ */ requireLib();
  function E(T, I, w) {
    if (T && typeof T == "object" && T instanceof e)
      return T;
    var M = new e();
    return M.parse(T, I, w), M;
  }
  e.prototype.parse = function(T, I, w) {
    if (typeof T != "string")
      throw new TypeError("Parameter 'url' must be a string, not " + typeof T);
    var M = T.indexOf("?"), F = M !== -1 && M < T.indexOf("#") ? "?" : "#", k = T.split(F), V = /\\/g;
    k[0] = k[0].replace(V, "/"), T = k.join(F);
    var X = T;
    if (X = X.trim(), !w && T.split("#").length === 1) {
      var ne = s.exec(X);
      if (ne)
        return this.path = X, this.href = X, this.pathname = ne[1], ne[2] ? (this.search = ne[2], I ? this.query = m.parse(this.search.substr(1)) : this.query = this.search.substr(1)) : I && (this.search = "", this.query = {}), this;
    }
    var oe = t.exec(X);
    if (oe) {
      oe = oe[0];
      var K = oe.toLowerCase();
      this.protocol = K, X = X.substr(oe.length);
    }
    if (w || oe || X.match(/^\/\/[^@/]+@[^@/]+/)) {
      var R = X.substr(0, 2) === "//";
      R && !(oe && b[oe]) && (X = X.substr(2), this.slashes = !0);
    }
    if (!b[oe] && (R || oe && !g[oe])) {
      for (var O = -1, A = 0; A < c.length; A++) {
        var B = X.indexOf(c[A]);
        B !== -1 && (O === -1 || B < O) && (O = B);
      }
      var N, D;
      O === -1 ? D = X.lastIndexOf("@") : D = X.lastIndexOf("@", O), D !== -1 && (N = X.slice(0, D), X = X.slice(D + 1), this.auth = decodeURIComponent(N)), O = -1;
      for (var A = 0; A < l.length; A++) {
        var B = X.indexOf(l[A]);
        B !== -1 && (O === -1 || B < O) && (O = B);
      }
      O === -1 && (O = X.length), this.host = X.slice(0, O), X = X.slice(O), this.parseHost(), this.hostname = this.hostname || "";
      var G = this.hostname[0] === "[" && this.hostname[this.hostname.length - 1] === "]";
      if (!G)
        for (var U = this.hostname.split(/\./), A = 0, Y = U.length; A < Y; A++) {
          var J = U[A];
          if (J && !J.match(_)) {
            for (var C = "", te = 0, Z = J.length; te < Z; te++)
              J.charCodeAt(te) > 127 ? C += "x" : C += J[te];
            if (!C.match(_)) {
              var se = U.slice(0, A), ee = U.slice(A + 1), q = J.match(v);
              q && (se.push(q[1]), ee.unshift(q[2])), ee.length && (X = "/" + ee.join(".") + X), this.hostname = se.join(".");
              break;
            }
          }
        }
      this.hostname.length > d ? this.hostname = "" : this.hostname = this.hostname.toLowerCase(), G || (this.hostname = a.toASCII(this.hostname));
      var ue = this.port ? ":" + this.port : "", ae = this.hostname || "";
      this.host = ae + ue, this.href += this.host, G && (this.hostname = this.hostname.substr(1, this.hostname.length - 2), X[0] !== "/" && (X = "/" + X));
    }
    if (!y[K])
      for (var A = 0, Y = h.length; A < Y; A++) {
        var z = h[A];
        if (X.indexOf(z) !== -1) {
          var Q = encodeURIComponent(z);
          Q === z && (Q = escape(z)), X = X.split(z).join(Q);
        }
      }
    var ie = X.indexOf("#");
    ie !== -1 && (this.hash = X.substr(ie), X = X.slice(0, ie));
    var W = X.indexOf("?");
    if (W !== -1 ? (this.search = X.substr(W), this.query = X.substr(W + 1), I && (this.query = m.parse(this.query)), X = X.slice(0, W)) : I && (this.search = "", this.query = {}), X && (this.pathname = X), g[K] && this.hostname && !this.pathname && (this.pathname = "/"), this.pathname || this.search) {
      var ue = this.pathname || "", me = this.search || "";
      this.path = ue + me;
    }
    return this.href = this.format(), this;
  };
  function S(T) {
    return typeof T == "string" && (T = E(T)), T instanceof e ? T.format() : e.prototype.format.call(T);
  }
  e.prototype.format = function() {
    var T = this.auth || "";
    T && (T = encodeURIComponent(T), T = T.replace(/%3A/i, ":"), T += "@");
    var I = this.protocol || "", w = this.pathname || "", M = this.hash || "", F = !1, k = "";
    this.host ? F = T + this.host : this.hostname && (F = T + (this.hostname.indexOf(":") === -1 ? this.hostname : "[" + this.hostname + "]"), this.port && (F += ":" + this.port)), this.query && typeof this.query == "object" && Object.keys(this.query).length && (k = m.stringify(this.query, {
      arrayFormat: "repeat",
      addQueryPrefix: !1
    }));
    var V = this.search || k && "?" + k || "";
    return I && I.substr(-1) !== ":" && (I += ":"), this.slashes || (!I || g[I]) && F !== !1 ? (F = "//" + (F || ""), w && w.charAt(0) !== "/" && (w = "/" + w)) : F || (F = ""), M && M.charAt(0) !== "#" && (M = "#" + M), V && V.charAt(0) !== "?" && (V = "?" + V), w = w.replace(/[?#]/g, function(X) {
      return encodeURIComponent(X);
    }), V = V.replace("#", "%23"), I + F + w + V + M;
  };
  function P(T, I) {
    return E(T, !1, !0).resolve(I);
  }
  e.prototype.resolve = function(T) {
    return this.resolveObject(E(T, !1, !0)).format();
  };
  function L(T, I) {
    return T ? E(T, !1, !0).resolveObject(I) : I;
  }
  return e.prototype.resolveObject = function(T) {
    if (typeof T == "string") {
      var I = new e();
      I.parse(T, !1, !0), T = I;
    }
    for (var w = new e(), M = Object.keys(this), F = 0; F < M.length; F++) {
      var k = M[F];
      w[k] = this[k];
    }
    if (w.hash = T.hash, T.href === "")
      return w.href = w.format(), w;
    if (T.slashes && !T.protocol) {
      for (var V = Object.keys(T), X = 0; X < V.length; X++) {
        var ne = V[X];
        ne !== "protocol" && (w[ne] = T[ne]);
      }
      return g[w.protocol] && w.hostname && !w.pathname && (w.pathname = "/", w.path = w.pathname), w.href = w.format(), w;
    }
    if (T.protocol && T.protocol !== w.protocol) {
      if (!g[T.protocol]) {
        for (var oe = Object.keys(T), K = 0; K < oe.length; K++) {
          var R = oe[K];
          w[R] = T[R];
        }
        return w.href = w.format(), w;
      }
      if (w.protocol = T.protocol, !T.host && !b[T.protocol]) {
        for (var Y = (T.pathname || "").split("/"); Y.length && !(T.host = Y.shift()); )
          ;
        T.host || (T.host = ""), T.hostname || (T.hostname = ""), Y[0] !== "" && Y.unshift(""), Y.length < 2 && Y.unshift(""), w.pathname = Y.join("/");
      } else
        w.pathname = T.pathname;
      if (w.search = T.search, w.query = T.query, w.host = T.host || "", w.auth = T.auth, w.hostname = T.hostname || T.host, w.port = T.port, w.pathname || w.search) {
        var O = w.pathname || "", A = w.search || "";
        w.path = O + A;
      }
      return w.slashes = w.slashes || T.slashes, w.href = w.format(), w;
    }
    var B = w.pathname && w.pathname.charAt(0) === "/", N = T.host || T.pathname && T.pathname.charAt(0) === "/", D = N || B || w.host && T.pathname, G = D, U = w.pathname && w.pathname.split("/") || [], Y = T.pathname && T.pathname.split("/") || [], J = w.protocol && !g[w.protocol];
    if (J && (w.hostname = "", w.port = null, w.host && (U[0] === "" ? U[0] = w.host : U.unshift(w.host)), w.host = "", T.protocol && (T.hostname = null, T.port = null, T.host && (Y[0] === "" ? Y[0] = T.host : Y.unshift(T.host)), T.host = null), D = D && (Y[0] === "" || U[0] === "")), N)
      w.host = T.host || T.host === "" ? T.host : w.host, w.hostname = T.hostname || T.hostname === "" ? T.hostname : w.hostname, w.search = T.search, w.query = T.query, U = Y;
    else if (Y.length)
      U || (U = []), U.pop(), U = U.concat(Y), w.search = T.search, w.query = T.query;
    else if (T.search != null) {
      if (J) {
        w.host = U.shift(), w.hostname = w.host;
        var C = w.host && w.host.indexOf("@") > 0 ? w.host.split("@") : !1;
        C && (w.auth = C.shift(), w.hostname = C.shift(), w.host = w.hostname);
      }
      return w.search = T.search, w.query = T.query, (w.pathname !== null || w.search !== null) && (w.path = (w.pathname ? w.pathname : "") + (w.search ? w.search : "")), w.href = w.format(), w;
    }
    if (!U.length)
      return w.pathname = null, w.search ? w.path = "/" + w.search : w.path = null, w.href = w.format(), w;
    for (var te = U.slice(-1)[0], Z = (w.host || T.host || U.length > 1) && (te === "." || te === "..") || te === "", se = 0, ee = U.length; ee >= 0; ee--)
      te = U[ee], te === "." ? U.splice(ee, 1) : te === ".." ? (U.splice(ee, 1), se++) : se && (U.splice(ee, 1), se--);
    if (!D && !G)
      for (; se--; se)
        U.unshift("..");
    D && U[0] !== "" && (!U[0] || U[0].charAt(0) !== "/") && U.unshift(""), Z && U.join("/").substr(-1) !== "/" && U.push("");
    var q = U[0] === "" || U[0] && U[0].charAt(0) === "/";
    if (J) {
      w.hostname = q ? "" : U.length ? U.shift() : "", w.host = w.hostname;
      var C = w.host && w.host.indexOf("@") > 0 ? w.host.split("@") : !1;
      C && (w.auth = C.shift(), w.hostname = C.shift(), w.host = w.hostname);
    }
    return D = D || w.host && U.length, D && !q && U.unshift(""), U.length > 0 ? w.pathname = U.join("/") : (w.pathname = null, w.path = null), (w.pathname !== null || w.search !== null) && (w.path = (w.pathname ? w.pathname : "") + (w.search ? w.search : "")), w.auth = T.auth || w.auth, w.slashes = w.slashes || T.slashes, w.href = w.format(), w;
  }, e.prototype.parseHost = function() {
    var T = this.host, I = r.exec(T);
    I && (I = I[0], I !== ":" && (this.port = I.substr(1)), T = T.substr(0, T.length - I.length)), T && (this.hostname = T);
  }, url$2.parse = E, url$2.resolve = P, url$2.resolveObject = L, url$2.format = S, url$2.Url = e, url$2;
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
var saidHello = !1, VERSION$1 = "6.5.10";
function skipHello() {
  saidHello = !0;
}
function sayHello(a) {
  var e;
  if (!saidHello) {
    if (settings.ADAPTER.getNavigator().userAgent.toLowerCase().indexOf("chrome") > -1) {
      var t = [
        `
 %c %c %c PixiJS ` + VERSION$1 + " - ✰ " + a + ` ✰  %c  %c  http://www.pixijs.com/  %c %c ♥%c♥%c♥ 

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
    } else globalThis.console && globalThis.console.log("PixiJS " + VERSION$1 + " - " + a + " - http://www.pixijs.com/");
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
      var t = settings.ADAPTER.createCanvas(), r = t.getContext("webgl", e) || t.getContext("experimental-webgl", e), s = !!(r && r.getContextAttributes().stencil);
      if (r) {
        var o = r.getExtension("WEBGL_lose_context");
        o && o.loseContext();
      }
      return r = null, s;
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
function hex2rgb(a, e) {
  return e === void 0 && (e = []), e[0] = (a >> 16 & 255) / 255, e[1] = (a >> 8 & 255) / 255, e[2] = (a & 255) / 255, e;
}
function hex2string(a) {
  var e = a.toString(16);
  return e = "000000".substring(0, 6 - e.length) + e, "#" + e;
}
function string2hex(a) {
  return typeof a == "string" && (a = cssColorNames[a.toLowerCase()] || a, a[0] === "#" && (a = a.slice(1))), parseInt(a, 16);
}
function mapPremultipliedBlendModes() {
  for (var a = [], e = [], t = 0; t < 32; t++)
    a[t] = t, e[t] = t;
  a[BLEND_MODES.NORMAL_NPM] = BLEND_MODES.NORMAL, a[BLEND_MODES.ADD_NPM] = BLEND_MODES.ADD, a[BLEND_MODES.SCREEN_NPM] = BLEND_MODES.SCREEN, e[BLEND_MODES.NORMAL] = BLEND_MODES.NORMAL_NPM, e[BLEND_MODES.ADD] = BLEND_MODES.ADD_NPM, e[BLEND_MODES.SCREEN] = BLEND_MODES.SCREEN_NPM;
  var r = [];
  return r.push(e), r.push(a), r;
}
var premultiplyBlendMode = mapPremultipliedBlendModes();
function correctBlendMode(a, e) {
  return premultiplyBlendMode[e ? 1 : 0][a];
}
function premultiplyRgba(a, e, t, r) {
  return t = t || new Float32Array(4), r || r === void 0 ? (t[0] = a[0] * e, t[1] = a[1] * e, t[2] = a[2] * e) : (t[0] = a[0], t[1] = a[1], t[2] = a[2]), t[3] = e, t;
}
function premultiplyTint(a, e) {
  if (e === 1)
    return (e * 255 << 24) + a;
  if (e === 0)
    return 0;
  var t = a >> 16 & 255, r = a >> 8 & 255, s = a & 255;
  return t = t * e + 0.5 | 0, r = r * e + 0.5 | 0, s = s * e + 0.5 | 0, (e * 255 << 24) + (t << 16) + (r << 8) + s;
}
function premultiplyTintToRgba(a, e, t, r) {
  return t = t || new Float32Array(4), t[0] = (a >> 16 & 255) / 255, t[1] = (a >> 8 & 255) / 255, t[2] = (a & 255) / 255, (r || r === void 0) && (t[0] *= e, t[1] *= e, t[2] *= e), t[3] = e, t;
}
function createIndicesForQuads(a, e) {
  e === void 0 && (e = null);
  var t = a * 6;
  if (e = e || new Uint16Array(t), e.length !== t)
    throw new Error("Out buffer length is incorrect, got " + e.length + " and expected " + t);
  for (var r = 0, s = 0; r < t; r += 6, s += 4)
    e[r + 0] = s + 0, e[r + 1] = s + 1, e[r + 2] = s + 2, e[r + 3] = s + 0, e[r + 4] = s + 2, e[r + 5] = s + 3;
  return e;
}
function getBufferType(a) {
  if (a.BYTES_PER_ELEMENT === 4)
    return a instanceof Float32Array ? "Float32Array" : a instanceof Uint32Array ? "Uint32Array" : "Int32Array";
  if (a.BYTES_PER_ELEMENT === 2) {
    if (a instanceof Uint16Array)
      return "Uint16Array";
  } else if (a.BYTES_PER_ELEMENT === 1 && a instanceof Uint8Array)
    return "Uint8Array";
  return null;
}
function nextPow2(a) {
  return a += a === 0 ? 1 : 0, --a, a |= a >>> 1, a |= a >>> 2, a |= a >>> 4, a |= a >>> 8, a |= a >>> 16, a + 1;
}
function isPow2(a) {
  return !(a & a - 1) && !!a;
}
function log2(a) {
  var e = (a > 65535 ? 1 : 0) << 4;
  a >>>= e;
  var t = (a > 255 ? 1 : 0) << 3;
  return a >>>= t, e |= t, t = (a > 15 ? 1 : 0) << 2, a >>>= t, e |= t, t = (a > 3 ? 1 : 0) << 1, a >>>= t, e |= t, e | a >> 1;
}
function removeItems(a, e, t) {
  var r = a.length, s;
  if (!(e >= r || t === 0)) {
    t = e + t > r ? r - e : t;
    var o = r - t;
    for (s = e; s < o; ++s)
      a[s] = a[s + t];
    a.length = o;
  }
}
function sign(a) {
  return a === 0 ? 0 : a < 0 ? -1 : 1;
}
var nextUid = 0;
function uid() {
  return ++nextUid;
}
var warnings = {};
function deprecation(a, e, t) {
  if (t === void 0 && (t = 3), !warnings[e]) {
    var r = new Error().stack;
    typeof r > "u" ? console.warn("PixiJS Deprecation Warning: ", e + `
Deprecated since v` + a) : (r = r.split(`
`).splice(t).join(`
`), console.groupCollapsed ? (console.groupCollapsed("%cPixiJS Deprecation Warning: %c%s", "color:#614108;background:#fffbe6", "font-weight:normal;color:#614108;background:#fffbe6", e + `
Deprecated since v` + a), console.warn(r), console.groupEnd()) : (console.warn("PixiJS Deprecation Warning: ", e + `
Deprecated since v` + a), console.warn(r))), warnings[e] = !0;
  }
}
var ProgramCache = {}, TextureCache = /* @__PURE__ */ Object.create(null), BaseTextureCache = /* @__PURE__ */ Object.create(null);
function clearTextureCache() {
  var a;
  for (a in TextureCache)
    delete TextureCache[a];
  for (a in BaseTextureCache)
    delete BaseTextureCache[a];
}
var CanvasRenderTarget = (
  /** @class */
  function() {
    function a(e, t, r) {
      this.canvas = settings.ADAPTER.createCanvas(), this.context = this.canvas.getContext("2d"), this.resolution = r || settings.RESOLUTION, this.resize(e, t);
    }
    return a.prototype.clear = function() {
      this.context.setTransform(1, 0, 0, 1, 0, 0), this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }, a.prototype.resize = function(e, t) {
      this.canvas.width = Math.round(e * this.resolution), this.canvas.height = Math.round(t * this.resolution);
    }, a.prototype.destroy = function() {
      this.context = null, this.canvas = null;
    }, Object.defineProperty(a.prototype, "width", {
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
    }), Object.defineProperty(a.prototype, "height", {
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
    }), a;
  }()
);
function trimCanvas(a) {
  var e = a.width, t = a.height, r = a.getContext("2d", {
    willReadFrequently: !0
  }), s = r.getImageData(0, 0, e, t), o = s.data, u = o.length, h = {
    top: null,
    left: null,
    right: null,
    bottom: null
  }, l = null, c, d, _;
  for (c = 0; c < u; c += 4)
    o[c + 3] !== 0 && (d = c / 4 % e, _ = ~~(c / 4 / e), h.top === null && (h.top = _), (h.left === null || d < h.left) && (h.left = d), (h.right === null || h.right < d) && (h.right = d + 1), (h.bottom === null || h.bottom < _) && (h.bottom = _));
  return h.top !== null && (e = h.right - h.left, t = h.bottom - h.top + 1, l = r.getImageData(h.left, h.top, e, t)), {
    height: t,
    width: e,
    data: l
  };
}
var tempAnchor$1;
function determineCrossOrigin(a, e) {
  if (e === void 0 && (e = globalThis.location), a.indexOf("data:") === 0)
    return "";
  e = e || globalThis.location, tempAnchor$1 || (tempAnchor$1 = document.createElement("a")), tempAnchor$1.href = a;
  var t = url$1.parse(tempAnchor$1.href), r = !t.port && e.port === "" || t.port === e.port;
  return t.hostname !== e.hostname || !r || t.protocol !== e.protocol ? "anonymous" : "";
}
function getResolutionOfUrl(a, e) {
  var t = settings.RETINA_PREFIX.exec(a);
  return t ? parseFloat(t[1]) : e !== void 0 ? e : 1;
}
/*!
 * @pixi/math - v6.5.10
 * Compiled Thu, 06 Jul 2023 15:25:11 UTC
 *
 * @pixi/math is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
var PI_2 = Math.PI * 2, RAD_TO_DEG = 180 / Math.PI, DEG_TO_RAD = Math.PI / 180, SHAPES;
(function(a) {
  a[a.POLY = 0] = "POLY", a[a.RECT = 1] = "RECT", a[a.CIRC = 2] = "CIRC", a[a.ELIP = 3] = "ELIP", a[a.RREC = 4] = "RREC";
})(SHAPES || (SHAPES = {}));
var Point = (
  /** @class */
  function() {
    function a(e, t) {
      e === void 0 && (e = 0), t === void 0 && (t = 0), this.x = 0, this.y = 0, this.x = e, this.y = t;
    }
    return a.prototype.clone = function() {
      return new a(this.x, this.y);
    }, a.prototype.copyFrom = function(e) {
      return this.set(e.x, e.y), this;
    }, a.prototype.copyTo = function(e) {
      return e.set(this.x, this.y), e;
    }, a.prototype.equals = function(e) {
      return e.x === this.x && e.y === this.y;
    }, a.prototype.set = function(e, t) {
      return e === void 0 && (e = 0), t === void 0 && (t = e), this.x = e, this.y = t, this;
    }, a.prototype.toString = function() {
      return "[@pixi/math:Point x=" + this.x + " y=" + this.y + "]";
    }, a;
  }()
), tempPoints$1 = [new Point(), new Point(), new Point(), new Point()], Rectangle = (
  /** @class */
  function() {
    function a(e, t, r, s) {
      e === void 0 && (e = 0), t === void 0 && (t = 0), r === void 0 && (r = 0), s === void 0 && (s = 0), this.x = Number(e), this.y = Number(t), this.width = Number(r), this.height = Number(s), this.type = SHAPES.RECT;
    }
    return Object.defineProperty(a.prototype, "left", {
      /** Returns the left edge of the rectangle. */
      get: function() {
        return this.x;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(a.prototype, "right", {
      /** Returns the right edge of the rectangle. */
      get: function() {
        return this.x + this.width;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(a.prototype, "top", {
      /** Returns the top edge of the rectangle. */
      get: function() {
        return this.y;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(a.prototype, "bottom", {
      /** Returns the bottom edge of the rectangle. */
      get: function() {
        return this.y + this.height;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(a, "EMPTY", {
      /** A constant empty rectangle. */
      get: function() {
        return new a(0, 0, 0, 0);
      },
      enumerable: !1,
      configurable: !0
    }), a.prototype.clone = function() {
      return new a(this.x, this.y, this.width, this.height);
    }, a.prototype.copyFrom = function(e) {
      return this.x = e.x, this.y = e.y, this.width = e.width, this.height = e.height, this;
    }, a.prototype.copyTo = function(e) {
      return e.x = this.x, e.y = this.y, e.width = this.width, e.height = this.height, e;
    }, a.prototype.contains = function(e, t) {
      return this.width <= 0 || this.height <= 0 ? !1 : e >= this.x && e < this.x + this.width && t >= this.y && t < this.y + this.height;
    }, a.prototype.intersects = function(e, t) {
      if (!t) {
        var r = this.x < e.x ? e.x : this.x, s = this.right > e.right ? e.right : this.right;
        if (s <= r)
          return !1;
        var o = this.y < e.y ? e.y : this.y, u = this.bottom > e.bottom ? e.bottom : this.bottom;
        return u > o;
      }
      var h = this.left, l = this.right, c = this.top, d = this.bottom;
      if (l <= h || d <= c)
        return !1;
      var _ = tempPoints$1[0].set(e.left, e.top), v = tempPoints$1[1].set(e.left, e.bottom), y = tempPoints$1[2].set(e.right, e.top), b = tempPoints$1[3].set(e.right, e.bottom);
      if (y.x <= _.x || v.y <= _.y)
        return !1;
      var g = Math.sign(t.a * t.d - t.b * t.c);
      if (g === 0 || (t.apply(_, _), t.apply(v, v), t.apply(y, y), t.apply(b, b), Math.max(_.x, v.x, y.x, b.x) <= h || Math.min(_.x, v.x, y.x, b.x) >= l || Math.max(_.y, v.y, y.y, b.y) <= c || Math.min(_.y, v.y, y.y, b.y) >= d))
        return !1;
      var m = g * (v.y - _.y), E = g * (_.x - v.x), S = m * h + E * c, P = m * l + E * c, L = m * h + E * d, T = m * l + E * d;
      if (Math.max(S, P, L, T) <= m * _.x + E * _.y || Math.min(S, P, L, T) >= m * b.x + E * b.y)
        return !1;
      var I = g * (_.y - y.y), w = g * (y.x - _.x), M = I * h + w * c, F = I * l + w * c, k = I * h + w * d, V = I * l + w * d;
      return !(Math.max(M, F, k, V) <= I * _.x + w * _.y || Math.min(M, F, k, V) >= I * b.x + w * b.y);
    }, a.prototype.pad = function(e, t) {
      return e === void 0 && (e = 0), t === void 0 && (t = e), this.x -= e, this.y -= t, this.width += e * 2, this.height += t * 2, this;
    }, a.prototype.fit = function(e) {
      var t = Math.max(this.x, e.x), r = Math.min(this.x + this.width, e.x + e.width), s = Math.max(this.y, e.y), o = Math.min(this.y + this.height, e.y + e.height);
      return this.x = t, this.width = Math.max(r - t, 0), this.y = s, this.height = Math.max(o - s, 0), this;
    }, a.prototype.ceil = function(e, t) {
      e === void 0 && (e = 1), t === void 0 && (t = 1e-3);
      var r = Math.ceil((this.x + this.width - t) * e) / e, s = Math.ceil((this.y + this.height - t) * e) / e;
      return this.x = Math.floor((this.x + t) * e) / e, this.y = Math.floor((this.y + t) * e) / e, this.width = r - this.x, this.height = s - this.y, this;
    }, a.prototype.enlarge = function(e) {
      var t = Math.min(this.x, e.x), r = Math.max(this.x + this.width, e.x + e.width), s = Math.min(this.y, e.y), o = Math.max(this.y + this.height, e.y + e.height);
      return this.x = t, this.width = r - t, this.y = s, this.height = o - s, this;
    }, a.prototype.toString = function() {
      return "[@pixi/math:Rectangle x=" + this.x + " y=" + this.y + " width=" + this.width + " height=" + this.height + "]";
    }, a;
  }()
), Circle = (
  /** @class */
  function() {
    function a(e, t, r) {
      e === void 0 && (e = 0), t === void 0 && (t = 0), r === void 0 && (r = 0), this.x = e, this.y = t, this.radius = r, this.type = SHAPES.CIRC;
    }
    return a.prototype.clone = function() {
      return new a(this.x, this.y, this.radius);
    }, a.prototype.contains = function(e, t) {
      if (this.radius <= 0)
        return !1;
      var r = this.radius * this.radius, s = this.x - e, o = this.y - t;
      return s *= s, o *= o, s + o <= r;
    }, a.prototype.getBounds = function() {
      return new Rectangle(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
    }, a.prototype.toString = function() {
      return "[@pixi/math:Circle x=" + this.x + " y=" + this.y + " radius=" + this.radius + "]";
    }, a;
  }()
), Ellipse = (
  /** @class */
  function() {
    function a(e, t, r, s) {
      e === void 0 && (e = 0), t === void 0 && (t = 0), r === void 0 && (r = 0), s === void 0 && (s = 0), this.x = e, this.y = t, this.width = r, this.height = s, this.type = SHAPES.ELIP;
    }
    return a.prototype.clone = function() {
      return new a(this.x, this.y, this.width, this.height);
    }, a.prototype.contains = function(e, t) {
      if (this.width <= 0 || this.height <= 0)
        return !1;
      var r = (e - this.x) / this.width, s = (t - this.y) / this.height;
      return r *= r, s *= s, r + s <= 1;
    }, a.prototype.getBounds = function() {
      return new Rectangle(this.x - this.width, this.y - this.height, this.width, this.height);
    }, a.prototype.toString = function() {
      return "[@pixi/math:Ellipse x=" + this.x + " y=" + this.y + " width=" + this.width + " height=" + this.height + "]";
    }, a;
  }()
), Polygon = (
  /** @class */
  function() {
    function a() {
      for (var e = arguments, t = [], r = 0; r < arguments.length; r++)
        t[r] = e[r];
      var s = Array.isArray(t[0]) ? t[0] : t;
      if (typeof s[0] != "number") {
        for (var o = [], u = 0, h = s.length; u < h; u++)
          o.push(s[u].x, s[u].y);
        s = o;
      }
      this.points = s, this.type = SHAPES.POLY, this.closeStroke = !0;
    }
    return a.prototype.clone = function() {
      var e = this.points.slice(), t = new a(e);
      return t.closeStroke = this.closeStroke, t;
    }, a.prototype.contains = function(e, t) {
      for (var r = !1, s = this.points.length / 2, o = 0, u = s - 1; o < s; u = o++) {
        var h = this.points[o * 2], l = this.points[o * 2 + 1], c = this.points[u * 2], d = this.points[u * 2 + 1], _ = l > t != d > t && e < (c - h) * ((t - l) / (d - l)) + h;
        _ && (r = !r);
      }
      return r;
    }, a.prototype.toString = function() {
      return "[@pixi/math:Polygon" + ("closeStroke=" + this.closeStroke) + ("points=" + this.points.reduce(function(e, t) {
        return e + ", " + t;
      }, "") + "]");
    }, a;
  }()
), RoundedRectangle = (
  /** @class */
  function() {
    function a(e, t, r, s, o) {
      e === void 0 && (e = 0), t === void 0 && (t = 0), r === void 0 && (r = 0), s === void 0 && (s = 0), o === void 0 && (o = 20), this.x = e, this.y = t, this.width = r, this.height = s, this.radius = o, this.type = SHAPES.RREC;
    }
    return a.prototype.clone = function() {
      return new a(this.x, this.y, this.width, this.height, this.radius);
    }, a.prototype.contains = function(e, t) {
      if (this.width <= 0 || this.height <= 0)
        return !1;
      if (e >= this.x && e <= this.x + this.width && t >= this.y && t <= this.y + this.height) {
        var r = Math.max(0, Math.min(this.radius, Math.min(this.width, this.height) / 2));
        if (t >= this.y + r && t <= this.y + this.height - r || e >= this.x + r && e <= this.x + this.width - r)
          return !0;
        var s = e - (this.x + r), o = t - (this.y + r), u = r * r;
        if (s * s + o * o <= u || (s = e - (this.x + this.width - r), s * s + o * o <= u) || (o = t - (this.y + this.height - r), s * s + o * o <= u) || (s = e - (this.x + r), s * s + o * o <= u))
          return !0;
      }
      return !1;
    }, a.prototype.toString = function() {
      return "[@pixi/math:RoundedRectangle x=" + this.x + " y=" + this.y + ("width=" + this.width + " height=" + this.height + " radius=" + this.radius + "]");
    }, a;
  }()
), ObservablePoint = (
  /** @class */
  function() {
    function a(e, t, r, s) {
      r === void 0 && (r = 0), s === void 0 && (s = 0), this._x = r, this._y = s, this.cb = e, this.scope = t;
    }
    return a.prototype.clone = function(e, t) {
      return e === void 0 && (e = this.cb), t === void 0 && (t = this.scope), new a(e, t, this._x, this._y);
    }, a.prototype.set = function(e, t) {
      return e === void 0 && (e = 0), t === void 0 && (t = e), (this._x !== e || this._y !== t) && (this._x = e, this._y = t, this.cb.call(this.scope)), this;
    }, a.prototype.copyFrom = function(e) {
      return (this._x !== e.x || this._y !== e.y) && (this._x = e.x, this._y = e.y, this.cb.call(this.scope)), this;
    }, a.prototype.copyTo = function(e) {
      return e.set(this._x, this._y), e;
    }, a.prototype.equals = function(e) {
      return e.x === this._x && e.y === this._y;
    }, a.prototype.toString = function() {
      return "[@pixi/math:ObservablePoint x=0 y=0 scope=" + this.scope + "]";
    }, Object.defineProperty(a.prototype, "x", {
      /** Position of the observable point on the x axis. */
      get: function() {
        return this._x;
      },
      set: function(e) {
        this._x !== e && (this._x = e, this.cb.call(this.scope));
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(a.prototype, "y", {
      /** Position of the observable point on the y axis. */
      get: function() {
        return this._y;
      },
      set: function(e) {
        this._y !== e && (this._y = e, this.cb.call(this.scope));
      },
      enumerable: !1,
      configurable: !0
    }), a;
  }()
), Matrix = (
  /** @class */
  function() {
    function a(e, t, r, s, o, u) {
      e === void 0 && (e = 1), t === void 0 && (t = 0), r === void 0 && (r = 0), s === void 0 && (s = 1), o === void 0 && (o = 0), u === void 0 && (u = 0), this.array = null, this.a = e, this.b = t, this.c = r, this.d = s, this.tx = o, this.ty = u;
    }
    return a.prototype.fromArray = function(e) {
      this.a = e[0], this.b = e[1], this.c = e[3], this.d = e[4], this.tx = e[2], this.ty = e[5];
    }, a.prototype.set = function(e, t, r, s, o, u) {
      return this.a = e, this.b = t, this.c = r, this.d = s, this.tx = o, this.ty = u, this;
    }, a.prototype.toArray = function(e, t) {
      this.array || (this.array = new Float32Array(9));
      var r = t || this.array;
      return e ? (r[0] = this.a, r[1] = this.b, r[2] = 0, r[3] = this.c, r[4] = this.d, r[5] = 0, r[6] = this.tx, r[7] = this.ty, r[8] = 1) : (r[0] = this.a, r[1] = this.c, r[2] = this.tx, r[3] = this.b, r[4] = this.d, r[5] = this.ty, r[6] = 0, r[7] = 0, r[8] = 1), r;
    }, a.prototype.apply = function(e, t) {
      t = t || new Point();
      var r = e.x, s = e.y;
      return t.x = this.a * r + this.c * s + this.tx, t.y = this.b * r + this.d * s + this.ty, t;
    }, a.prototype.applyInverse = function(e, t) {
      t = t || new Point();
      var r = 1 / (this.a * this.d + this.c * -this.b), s = e.x, o = e.y;
      return t.x = this.d * r * s + -this.c * r * o + (this.ty * this.c - this.tx * this.d) * r, t.y = this.a * r * o + -this.b * r * s + (-this.ty * this.a + this.tx * this.b) * r, t;
    }, a.prototype.translate = function(e, t) {
      return this.tx += e, this.ty += t, this;
    }, a.prototype.scale = function(e, t) {
      return this.a *= e, this.d *= t, this.c *= e, this.b *= t, this.tx *= e, this.ty *= t, this;
    }, a.prototype.rotate = function(e) {
      var t = Math.cos(e), r = Math.sin(e), s = this.a, o = this.c, u = this.tx;
      return this.a = s * t - this.b * r, this.b = s * r + this.b * t, this.c = o * t - this.d * r, this.d = o * r + this.d * t, this.tx = u * t - this.ty * r, this.ty = u * r + this.ty * t, this;
    }, a.prototype.append = function(e) {
      var t = this.a, r = this.b, s = this.c, o = this.d;
      return this.a = e.a * t + e.b * s, this.b = e.a * r + e.b * o, this.c = e.c * t + e.d * s, this.d = e.c * r + e.d * o, this.tx = e.tx * t + e.ty * s + this.tx, this.ty = e.tx * r + e.ty * o + this.ty, this;
    }, a.prototype.setTransform = function(e, t, r, s, o, u, h, l, c) {
      return this.a = Math.cos(h + c) * o, this.b = Math.sin(h + c) * o, this.c = -Math.sin(h - l) * u, this.d = Math.cos(h - l) * u, this.tx = e - (r * this.a + s * this.c), this.ty = t - (r * this.b + s * this.d), this;
    }, a.prototype.prepend = function(e) {
      var t = this.tx;
      if (e.a !== 1 || e.b !== 0 || e.c !== 0 || e.d !== 1) {
        var r = this.a, s = this.c;
        this.a = r * e.a + this.b * e.c, this.b = r * e.b + this.b * e.d, this.c = s * e.a + this.d * e.c, this.d = s * e.b + this.d * e.d;
      }
      return this.tx = t * e.a + this.ty * e.c + e.tx, this.ty = t * e.b + this.ty * e.d + e.ty, this;
    }, a.prototype.decompose = function(e) {
      var t = this.a, r = this.b, s = this.c, o = this.d, u = e.pivot, h = -Math.atan2(-s, o), l = Math.atan2(r, t), c = Math.abs(h + l);
      return c < 1e-5 || Math.abs(PI_2 - c) < 1e-5 ? (e.rotation = l, e.skew.x = e.skew.y = 0) : (e.rotation = 0, e.skew.x = h, e.skew.y = l), e.scale.x = Math.sqrt(t * t + r * r), e.scale.y = Math.sqrt(s * s + o * o), e.position.x = this.tx + (u.x * t + u.y * s), e.position.y = this.ty + (u.x * r + u.y * o), e;
    }, a.prototype.invert = function() {
      var e = this.a, t = this.b, r = this.c, s = this.d, o = this.tx, u = e * s - t * r;
      return this.a = s / u, this.b = -t / u, this.c = -r / u, this.d = e / u, this.tx = (r * this.ty - s * o) / u, this.ty = -(e * this.ty - t * o) / u, this;
    }, a.prototype.identity = function() {
      return this.a = 1, this.b = 0, this.c = 0, this.d = 1, this.tx = 0, this.ty = 0, this;
    }, a.prototype.clone = function() {
      var e = new a();
      return e.a = this.a, e.b = this.b, e.c = this.c, e.d = this.d, e.tx = this.tx, e.ty = this.ty, e;
    }, a.prototype.copyTo = function(e) {
      return e.a = this.a, e.b = this.b, e.c = this.c, e.d = this.d, e.tx = this.tx, e.ty = this.ty, e;
    }, a.prototype.copyFrom = function(e) {
      return this.a = e.a, this.b = e.b, this.c = e.c, this.d = e.d, this.tx = e.tx, this.ty = e.ty, this;
    }, a.prototype.toString = function() {
      return "[@pixi/math:Matrix a=" + this.a + " b=" + this.b + " c=" + this.c + " d=" + this.d + " tx=" + this.tx + " ty=" + this.ty + "]";
    }, Object.defineProperty(a, "IDENTITY", {
      /**
       * A default (identity) matrix
       * @readonly
       */
      get: function() {
        return new a();
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(a, "TEMP_MATRIX", {
      /**
       * A temp matrix
       * @readonly
       */
      get: function() {
        return new a();
      },
      enumerable: !1,
      configurable: !0
    }), a;
  }()
), ux = [1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1, 0, 1], uy = [0, 1, 1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1], vx = [0, -1, -1, -1, 0, 1, 1, 1, 0, 1, 1, 1, 0, -1, -1, -1], vy = [1, 1, 0, -1, -1, -1, 0, 1, -1, -1, 0, 1, 1, 1, 0, -1], rotationCayley = [], rotationMatrices = [], signum = Math.sign;
function init() {
  for (var a = 0; a < 16; a++) {
    var e = [];
    rotationCayley.push(e);
    for (var t = 0; t < 16; t++)
      for (var r = signum(ux[a] * ux[t] + vx[a] * uy[t]), s = signum(uy[a] * ux[t] + vy[a] * uy[t]), o = signum(ux[a] * vx[t] + vx[a] * vy[t]), u = signum(uy[a] * vx[t] + vy[a] * vy[t]), h = 0; h < 16; h++)
        if (ux[h] === r && uy[h] === s && vx[h] === o && vy[h] === u) {
          e.push(h);
          break;
        }
  }
  for (var a = 0; a < 16; a++) {
    var l = new Matrix();
    l.set(ux[a], uy[a], vx[a], vy[a], 0, 0), rotationMatrices.push(l);
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
  uX: function(a) {
    return ux[a];
  },
  /**
   * @memberof PIXI.groupD8
   * @param {PIXI.GD8Symmetry} ind - sprite rotation angle.
   * @returns {PIXI.GD8Symmetry} The Y-component of the U-axis
   *    after rotating the axes.
   */
  uY: function(a) {
    return uy[a];
  },
  /**
   * @memberof PIXI.groupD8
   * @param {PIXI.GD8Symmetry} ind - sprite rotation angle.
   * @returns {PIXI.GD8Symmetry} The X-component of the V-axis
   *    after rotating the axes.
   */
  vX: function(a) {
    return vx[a];
  },
  /**
   * @memberof PIXI.groupD8
   * @param {PIXI.GD8Symmetry} ind - sprite rotation angle.
   * @returns {PIXI.GD8Symmetry} The Y-component of the V-axis
   *    after rotating the axes.
   */
  vY: function(a) {
    return vy[a];
  },
  /**
   * @memberof PIXI.groupD8
   * @param {PIXI.GD8Symmetry} rotation - symmetry whose opposite
   *   is needed. Only rotations have opposite symmetries while
   *   reflections don't.
   * @returns {PIXI.GD8Symmetry} The opposite symmetry of `rotation`
   */
  inv: function(a) {
    return a & 8 ? a & 15 : -a & 7;
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
  add: function(a, e) {
    return rotationCayley[a][e];
  },
  /**
   * Reverse of `add`.
   * @memberof PIXI.groupD8
   * @param {PIXI.GD8Symmetry} rotationSecond - Second operation
   * @param {PIXI.GD8Symmetry} rotationFirst - First operation
   * @returns {PIXI.GD8Symmetry} Result
   */
  sub: function(a, e) {
    return rotationCayley[a][groupD8.inv(e)];
  },
  /**
   * Adds 180 degrees to rotation, which is a commutative
   * operation.
   * @memberof PIXI.groupD8
   * @param {number} rotation - The number to rotate.
   * @returns {number} Rotated number
   */
  rotate180: function(a) {
    return a ^ 4;
  },
  /**
   * Checks if the rotation angle is vertical, i.e. south
   * or north. It doesn't work for reflections.
   * @memberof PIXI.groupD8
   * @param {PIXI.GD8Symmetry} rotation - The number to check.
   * @returns {boolean} Whether or not the direction is vertical
   */
  isVertical: function(a) {
    return (a & 3) === 2;
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
  byDirection: function(a, e) {
    return Math.abs(a) * 2 <= Math.abs(e) ? e >= 0 ? groupD8.S : groupD8.N : Math.abs(e) * 2 <= Math.abs(a) ? a > 0 ? groupD8.E : groupD8.W : e > 0 ? a > 0 ? groupD8.SE : groupD8.SW : a > 0 ? groupD8.NE : groupD8.NW;
  },
  /**
   * Helps sprite to compensate texture packer rotation.
   * @memberof PIXI.groupD8
   * @param {PIXI.Matrix} matrix - sprite world matrix
   * @param {PIXI.GD8Symmetry} rotation - The rotation factor to use.
   * @param {number} tx - sprite anchoring
   * @param {number} ty - sprite anchoring
   */
  matrixAppendRotationInv: function(a, e, t, r) {
    t === void 0 && (t = 0), r === void 0 && (r = 0);
    var s = rotationMatrices[groupD8.inv(e)];
    s.tx = t, s.ty = r, a.append(s);
  }
}, Transform = (
  /** @class */
  function() {
    function a() {
      this.worldTransform = new Matrix(), this.localTransform = new Matrix(), this.position = new ObservablePoint(this.onChange, this, 0, 0), this.scale = new ObservablePoint(this.onChange, this, 1, 1), this.pivot = new ObservablePoint(this.onChange, this, 0, 0), this.skew = new ObservablePoint(this.updateSkew, this, 0, 0), this._rotation = 0, this._cx = 1, this._sx = 0, this._cy = 0, this._sy = 1, this._localID = 0, this._currentLocalID = 0, this._worldID = 0, this._parentID = 0;
    }
    return a.prototype.onChange = function() {
      this._localID++;
    }, a.prototype.updateSkew = function() {
      this._cx = Math.cos(this._rotation + this.skew.y), this._sx = Math.sin(this._rotation + this.skew.y), this._cy = -Math.sin(this._rotation - this.skew.x), this._sy = Math.cos(this._rotation - this.skew.x), this._localID++;
    }, a.prototype.toString = function() {
      return "[@pixi/math:Transform " + ("position=(" + this.position.x + ", " + this.position.y + ") ") + ("rotation=" + this.rotation + " ") + ("scale=(" + this.scale.x + ", " + this.scale.y + ") ") + ("skew=(" + this.skew.x + ", " + this.skew.y + ") ") + "]";
    }, a.prototype.updateLocalTransform = function() {
      var e = this.localTransform;
      this._localID !== this._currentLocalID && (e.a = this._cx * this.scale.x, e.b = this._sx * this.scale.x, e.c = this._cy * this.scale.y, e.d = this._sy * this.scale.y, e.tx = this.position.x - (this.pivot.x * e.a + this.pivot.y * e.c), e.ty = this.position.y - (this.pivot.x * e.b + this.pivot.y * e.d), this._currentLocalID = this._localID, this._parentID = -1);
    }, a.prototype.updateTransform = function(e) {
      var t = this.localTransform;
      if (this._localID !== this._currentLocalID && (t.a = this._cx * this.scale.x, t.b = this._sx * this.scale.x, t.c = this._cy * this.scale.y, t.d = this._sy * this.scale.y, t.tx = this.position.x - (this.pivot.x * t.a + this.pivot.y * t.c), t.ty = this.position.y - (this.pivot.x * t.b + this.pivot.y * t.d), this._currentLocalID = this._localID, this._parentID = -1), this._parentID !== e._worldID) {
        var r = e.worldTransform, s = this.worldTransform;
        s.a = t.a * r.a + t.b * r.c, s.b = t.a * r.b + t.b * r.d, s.c = t.c * r.a + t.d * r.c, s.d = t.c * r.b + t.d * r.d, s.tx = t.tx * r.a + t.ty * r.c + r.tx, s.ty = t.tx * r.b + t.ty * r.d + r.ty, this._parentID = e._worldID, this._worldID++;
      }
    }, a.prototype.setFromMatrix = function(e) {
      e.decompose(this), this._localID++;
    }, Object.defineProperty(a.prototype, "rotation", {
      /** The rotation of the object in radians. */
      get: function() {
        return this._rotation;
      },
      set: function(e) {
        this._rotation !== e && (this._rotation = e, this.updateSkew());
      },
      enumerable: !1,
      configurable: !0
    }), a.IDENTITY = new a(), a;
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
    function a() {
      this.minX = 1 / 0, this.minY = 1 / 0, this.maxX = -1 / 0, this.maxY = -1 / 0, this.rect = null, this.updateID = -1;
    }
    return a.prototype.isEmpty = function() {
      return this.minX > this.maxX || this.minY > this.maxY;
    }, a.prototype.clear = function() {
      this.minX = 1 / 0, this.minY = 1 / 0, this.maxX = -1 / 0, this.maxY = -1 / 0;
    }, a.prototype.getRectangle = function(e) {
      return this.minX > this.maxX || this.minY > this.maxY ? Rectangle.EMPTY : (e = e || new Rectangle(0, 0, 1, 1), e.x = this.minX, e.y = this.minY, e.width = this.maxX - this.minX, e.height = this.maxY - this.minY, e);
    }, a.prototype.addPoint = function(e) {
      this.minX = Math.min(this.minX, e.x), this.maxX = Math.max(this.maxX, e.x), this.minY = Math.min(this.minY, e.y), this.maxY = Math.max(this.maxY, e.y);
    }, a.prototype.addPointMatrix = function(e, t) {
      var r = e.a, s = e.b, o = e.c, u = e.d, h = e.tx, l = e.ty, c = r * t.x + o * t.y + h, d = s * t.x + u * t.y + l;
      this.minX = Math.min(this.minX, c), this.maxX = Math.max(this.maxX, c), this.minY = Math.min(this.minY, d), this.maxY = Math.max(this.maxY, d);
    }, a.prototype.addQuad = function(e) {
      var t = this.minX, r = this.minY, s = this.maxX, o = this.maxY, u = e[0], h = e[1];
      t = u < t ? u : t, r = h < r ? h : r, s = u > s ? u : s, o = h > o ? h : o, u = e[2], h = e[3], t = u < t ? u : t, r = h < r ? h : r, s = u > s ? u : s, o = h > o ? h : o, u = e[4], h = e[5], t = u < t ? u : t, r = h < r ? h : r, s = u > s ? u : s, o = h > o ? h : o, u = e[6], h = e[7], t = u < t ? u : t, r = h < r ? h : r, s = u > s ? u : s, o = h > o ? h : o, this.minX = t, this.minY = r, this.maxX = s, this.maxY = o;
    }, a.prototype.addFrame = function(e, t, r, s, o) {
      this.addFrameMatrix(e.worldTransform, t, r, s, o);
    }, a.prototype.addFrameMatrix = function(e, t, r, s, o) {
      var u = e.a, h = e.b, l = e.c, c = e.d, d = e.tx, _ = e.ty, v = this.minX, y = this.minY, b = this.maxX, g = this.maxY, m = u * t + l * r + d, E = h * t + c * r + _;
      v = m < v ? m : v, y = E < y ? E : y, b = m > b ? m : b, g = E > g ? E : g, m = u * s + l * r + d, E = h * s + c * r + _, v = m < v ? m : v, y = E < y ? E : y, b = m > b ? m : b, g = E > g ? E : g, m = u * t + l * o + d, E = h * t + c * o + _, v = m < v ? m : v, y = E < y ? E : y, b = m > b ? m : b, g = E > g ? E : g, m = u * s + l * o + d, E = h * s + c * o + _, v = m < v ? m : v, y = E < y ? E : y, b = m > b ? m : b, g = E > g ? E : g, this.minX = v, this.minY = y, this.maxX = b, this.maxY = g;
    }, a.prototype.addVertexData = function(e, t, r) {
      for (var s = this.minX, o = this.minY, u = this.maxX, h = this.maxY, l = t; l < r; l += 2) {
        var c = e[l], d = e[l + 1];
        s = c < s ? c : s, o = d < o ? d : o, u = c > u ? c : u, h = d > h ? d : h;
      }
      this.minX = s, this.minY = o, this.maxX = u, this.maxY = h;
    }, a.prototype.addVertices = function(e, t, r, s) {
      this.addVerticesMatrix(e.worldTransform, t, r, s);
    }, a.prototype.addVerticesMatrix = function(e, t, r, s, o, u) {
      o === void 0 && (o = 0), u === void 0 && (u = o);
      for (var h = e.a, l = e.b, c = e.c, d = e.d, _ = e.tx, v = e.ty, y = this.minX, b = this.minY, g = this.maxX, m = this.maxY, E = r; E < s; E += 2) {
        var S = t[E], P = t[E + 1], L = h * S + c * P + _, T = d * P + l * S + v;
        y = Math.min(y, L - o), g = Math.max(g, L + o), b = Math.min(b, T - u), m = Math.max(m, T + u);
      }
      this.minX = y, this.minY = b, this.maxX = g, this.maxY = m;
    }, a.prototype.addBounds = function(e) {
      var t = this.minX, r = this.minY, s = this.maxX, o = this.maxY;
      this.minX = e.minX < t ? e.minX : t, this.minY = e.minY < r ? e.minY : r, this.maxX = e.maxX > s ? e.maxX : s, this.maxY = e.maxY > o ? e.maxY : o;
    }, a.prototype.addBoundsMask = function(e, t) {
      var r = e.minX > t.minX ? e.minX : t.minX, s = e.minY > t.minY ? e.minY : t.minY, o = e.maxX < t.maxX ? e.maxX : t.maxX, u = e.maxY < t.maxY ? e.maxY : t.maxY;
      if (r <= o && s <= u) {
        var h = this.minX, l = this.minY, c = this.maxX, d = this.maxY;
        this.minX = r < h ? r : h, this.minY = s < l ? s : l, this.maxX = o > c ? o : c, this.maxY = u > d ? u : d;
      }
    }, a.prototype.addBoundsMatrix = function(e, t) {
      this.addFrameMatrix(t, e.minX, e.minY, e.maxX, e.maxY);
    }, a.prototype.addBoundsArea = function(e, t) {
      var r = e.minX > t.x ? e.minX : t.x, s = e.minY > t.y ? e.minY : t.y, o = e.maxX < t.x + t.width ? e.maxX : t.x + t.width, u = e.maxY < t.y + t.height ? e.maxY : t.y + t.height;
      if (r <= o && s <= u) {
        var h = this.minX, l = this.minY, c = this.maxX, d = this.maxY;
        this.minX = r < h ? r : h, this.minY = s < l ? s : l, this.maxX = o > c ? o : c, this.maxY = u > d ? u : d;
      }
    }, a.prototype.pad = function(e, t) {
      e === void 0 && (e = 0), t === void 0 && (t = e), this.isEmpty() || (this.minX -= e, this.maxX += e, this.minY -= t, this.maxY += t);
    }, a.prototype.addFramePad = function(e, t, r, s, o, u) {
      e -= o, t -= u, r += o, s += u, this.minX = this.minX < e ? this.minX : e, this.maxX = this.maxX > r ? this.maxX : r, this.minY = this.minY < t ? this.minY : t, this.maxY = this.maxY > s ? this.maxY : s;
    }, a;
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
var extendStatics$j = function(a, e) {
  return extendStatics$j = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, r) {
    t.__proto__ = r;
  } || function(t, r) {
    for (var s in r)
      r.hasOwnProperty(s) && (t[s] = r[s]);
  }, extendStatics$j(a, e);
};
function __extends$j(a, e) {
  extendStatics$j(a, e);
  function t() {
    this.constructor = a;
  }
  a.prototype = e === null ? Object.create(e) : (t.prototype = e.prototype, new t());
}
var DisplayObject = (
  /** @class */
  function(a) {
    __extends$j(e, a);
    function e() {
      var t = a.call(this) || this;
      return t.tempDisplayObjectParent = null, t.transform = new Transform(), t.alpha = 1, t.visible = !0, t.renderable = !0, t.cullable = !1, t.cullArea = null, t.parent = null, t.worldAlpha = 1, t._lastSortedIndex = 0, t._zIndex = 0, t.filterArea = null, t.filters = null, t._enabledFilters = null, t._bounds = new Bounds(), t._localBounds = null, t._boundsID = 0, t._boundsRect = null, t._localBoundsRect = null, t._mask = null, t._maskRefCount = 0, t._destroyed = !1, t.isSprite = !1, t.isMask = !1, t;
    }
    return e.mixin = function(t) {
      for (var r = Object.keys(t), s = 0; s < r.length; ++s) {
        var o = r[s];
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
      var r = this.transform, s = this.parent;
      this.parent = null, this.transform = this._tempDisplayObjectParent.transform;
      var o = this._bounds, u = this._boundsID;
      this._bounds = this._localBounds;
      var h = this.getBounds(!1, t);
      return this.parent = s, this.transform = r, this._bounds = o, this._bounds.updateID += this._boundsID - u, h;
    }, e.prototype.toGlobal = function(t, r, s) {
      return s === void 0 && (s = !1), s || (this._recursivePostUpdateTransform(), this.parent ? this.displayObjectUpdateTransform() : (this.parent = this._tempDisplayObjectParent, this.displayObjectUpdateTransform(), this.parent = null)), this.worldTransform.apply(t, r);
    }, e.prototype.toLocal = function(t, r, s, o) {
      return r && (t = r.toGlobal(t, s, o)), o || (this._recursivePostUpdateTransform(), this.parent ? this.displayObjectUpdateTransform() : (this.parent = this._tempDisplayObjectParent, this.displayObjectUpdateTransform(), this.parent = null)), this.worldTransform.applyInverse(t, s);
    }, e.prototype.setParent = function(t) {
      if (!t || !t.addChild)
        throw new Error("setParent: Argument must be a Container");
      return t.addChild(this), t;
    }, e.prototype.setTransform = function(t, r, s, o, u, h, l, c, d) {
      return t === void 0 && (t = 0), r === void 0 && (r = 0), s === void 0 && (s = 1), o === void 0 && (o = 1), u === void 0 && (u = 0), h === void 0 && (h = 0), l === void 0 && (l = 0), c === void 0 && (c = 0), d === void 0 && (d = 0), this.position.x = t, this.position.y = r, this.scale.x = s || 1, this.scale.y = o || 1, this.rotation = u, this.skew.x = h, this.skew.y = l, this.pivot.x = c, this.pivot.y = d, this;
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
  function(a) {
    __extends$j(e, a);
    function e() {
      var t = a !== null && a.apply(this, arguments) || this;
      return t.sortDirty = null, t;
    }
    return e;
  }(DisplayObject)
);
DisplayObject.prototype.displayObjectUpdateTransform = DisplayObject.prototype.updateTransform;
function sortChildren(a, e) {
  return a.zIndex === e.zIndex ? a._lastSortedIndex - e._lastSortedIndex : a.zIndex - e.zIndex;
}
var Container = (
  /** @class */
  function(a) {
    __extends$j(e, a);
    function e() {
      var t = a.call(this) || this;
      return t.children = [], t.sortableChildren = settings.SORTABLE_CHILDREN, t.sortDirty = !1, t;
    }
    return e.prototype.onChildrenChange = function(t) {
    }, e.prototype.addChild = function() {
      for (var t = arguments, r = [], s = 0; s < arguments.length; s++)
        r[s] = t[s];
      if (r.length > 1)
        for (var o = 0; o < r.length; o++)
          this.addChild(r[o]);
      else {
        var u = r[0];
        u.parent && u.parent.removeChild(u), u.parent = this, this.sortDirty = !0, u.transform._parentID = -1, this.children.push(u), this._boundsID++, this.onChildrenChange(this.children.length - 1), this.emit("childAdded", u, this, this.children.length - 1), u.emit("added", this);
      }
      return r[0];
    }, e.prototype.addChildAt = function(t, r) {
      if (r < 0 || r > this.children.length)
        throw new Error(t + "addChildAt: The index " + r + " supplied is out of bounds " + this.children.length);
      return t.parent && t.parent.removeChild(t), t.parent = this, this.sortDirty = !0, t.transform._parentID = -1, this.children.splice(r, 0, t), this._boundsID++, this.onChildrenChange(r), t.emit("added", this), this.emit("childAdded", t, this, r), t;
    }, e.prototype.swapChildren = function(t, r) {
      if (t !== r) {
        var s = this.getChildIndex(t), o = this.getChildIndex(r);
        this.children[s] = r, this.children[o] = t, this.onChildrenChange(s < o ? s : o);
      }
    }, e.prototype.getChildIndex = function(t) {
      var r = this.children.indexOf(t);
      if (r === -1)
        throw new Error("The supplied DisplayObject must be a child of the caller");
      return r;
    }, e.prototype.setChildIndex = function(t, r) {
      if (r < 0 || r >= this.children.length)
        throw new Error("The index " + r + " supplied is out of bounds " + this.children.length);
      var s = this.getChildIndex(t);
      removeItems(this.children, s, 1), this.children.splice(r, 0, t), this.onChildrenChange(r);
    }, e.prototype.getChildAt = function(t) {
      if (t < 0 || t >= this.children.length)
        throw new Error("getChildAt: Index (" + t + ") does not exist.");
      return this.children[t];
    }, e.prototype.removeChild = function() {
      for (var t = arguments, r = [], s = 0; s < arguments.length; s++)
        r[s] = t[s];
      if (r.length > 1)
        for (var o = 0; o < r.length; o++)
          this.removeChild(r[o]);
      else {
        var u = r[0], h = this.children.indexOf(u);
        if (h === -1)
          return null;
        u.parent = null, u.transform._parentID = -1, removeItems(this.children, h, 1), this._boundsID++, this.onChildrenChange(h), u.emit("removed", this), this.emit("childRemoved", u, this, h);
      }
      return r[0];
    }, e.prototype.removeChildAt = function(t) {
      var r = this.getChildAt(t);
      return r.parent = null, r.transform._parentID = -1, removeItems(this.children, t, 1), this._boundsID++, this.onChildrenChange(t), r.emit("removed", this), this.emit("childRemoved", r, this, t), r;
    }, e.prototype.removeChildren = function(t, r) {
      t === void 0 && (t = 0), r === void 0 && (r = this.children.length);
      var s = t, o = r, u = o - s, h;
      if (u > 0 && u <= o) {
        h = this.children.splice(s, u);
        for (var l = 0; l < h.length; ++l)
          h[l].parent = null, h[l].transform && (h[l].transform._parentID = -1);
        this._boundsID++, this.onChildrenChange(t);
        for (var l = 0; l < h.length; ++l)
          h[l].emit("removed", this), this.emit("childRemoved", h[l], this, l);
        return h;
      } else if (u === 0 && this.children.length === 0)
        return [];
      throw new RangeError("removeChildren: numeric values are outside the acceptable range.");
    }, e.prototype.sortChildren = function() {
      for (var t = !1, r = 0, s = this.children.length; r < s; ++r) {
        var o = this.children[r];
        o._lastSortedIndex = r, !t && o.zIndex !== 0 && (t = !0);
      }
      t && this.children.length > 1 && this.children.sort(sortChildren), this.sortDirty = !1;
    }, e.prototype.updateTransform = function() {
      this.sortableChildren && this.sortDirty && this.sortChildren(), this._boundsID++, this.transform.updateTransform(this.parent.transform), this.worldAlpha = this.alpha * this.parent.worldAlpha;
      for (var t = 0, r = this.children.length; t < r; ++t) {
        var s = this.children[t];
        s.visible && s.updateTransform();
      }
    }, e.prototype.calculateBounds = function() {
      this._bounds.clear(), this._calculateBounds();
      for (var t = 0; t < this.children.length; t++) {
        var r = this.children[t];
        if (!(!r.visible || !r.renderable))
          if (r.calculateBounds(), r._mask) {
            var s = r._mask.isMaskData ? r._mask.maskObject : r._mask;
            s ? (s.calculateBounds(), this._bounds.addBoundsMask(r._bounds, s._bounds)) : this._bounds.addBounds(r._bounds);
          } else r.filterArea ? this._bounds.addBoundsArea(r._bounds, r.filterArea) : this._bounds.addBounds(r._bounds);
      }
      this._bounds.updateID = this._boundsID;
    }, e.prototype.getLocalBounds = function(t, r) {
      r === void 0 && (r = !1);
      var s = a.prototype.getLocalBounds.call(this, t);
      if (!r)
        for (var o = 0, u = this.children.length; o < u; ++o) {
          var h = this.children[o];
          h.visible && h.updateTransform();
        }
      return s;
    }, e.prototype._calculateBounds = function() {
    }, e.prototype._renderWithCulling = function(t) {
      var r = t.renderTexture.sourceFrame;
      if (r.width > 0 && r.height > 0) {
        var s, o;
        if (this.cullArea ? (s = this.cullArea, o = this.worldTransform) : this._render !== e.prototype._render && (s = this.getBounds(!0)), s && r.intersects(s, o))
          this._render(t);
        else if (this.cullArea)
          return;
        for (var u = 0, h = this.children.length; u < h; ++u) {
          var l = this.children[u], c = l.cullable;
          l.cullable = c || !this.cullArea, l.render(t), l.cullable = c;
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
          for (var r = 0, s = this.children.length; r < s; ++r)
            this.children[r].render(t);
        }
    }, e.prototype.renderAdvanced = function(t) {
      var r = this.filters, s = this._mask;
      if (r) {
        this._enabledFilters || (this._enabledFilters = []), this._enabledFilters.length = 0;
        for (var o = 0; o < r.length; o++)
          r[o].enabled && this._enabledFilters.push(r[o]);
      }
      var u = r && this._enabledFilters && this._enabledFilters.length || s && (!s.isMaskData || s.enabled && (s.autoDetect || s.type !== MASK_TYPES.NONE));
      if (u && t.batch.flush(), r && this._enabledFilters && this._enabledFilters.length && t.filter.push(this, this._enabledFilters), s && t.mask.push(this, this._mask), this.cullable)
        this._renderWithCulling(t);
      else {
        this._render(t);
        for (var o = 0, h = this.children.length; o < h; ++o)
          this.children[o].render(t);
      }
      u && t.batch.flush(), s && t.mask.pop(this), r && this._enabledFilters && this._enabledFilters.length && t.filter.pop();
    }, e.prototype._render = function(t) {
    }, e.prototype.destroy = function(t) {
      a.prototype.destroy.call(this), this.sortDirty = !1;
      var r = typeof t == "boolean" ? t : t && t.children, s = this.removeChildren(0, this.children.length);
      if (r)
        for (var o = 0; o < s.length; ++o)
          s[o].destroy(t);
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
  return __assign$1 = Object.assign || function(e) {
    for (var t = arguments, r, s = 1, o = arguments.length; s < o; s++) {
      r = t[s];
      for (var u in r)
        Object.prototype.hasOwnProperty.call(r, u) && (e[u] = r[u]);
    }
    return e;
  }, __assign$1.apply(this, arguments);
}, ExtensionType;
(function(a) {
  a.Application = "application", a.RendererPlugin = "renderer-webgl-plugin", a.CanvasRendererPlugin = "renderer-canvas-plugin", a.Loader = "loader", a.LoadParser = "load-parser", a.ResolveParser = "resolve-parser", a.CacheParser = "cache-parser", a.DetectionParser = "detection-parser";
})(ExtensionType || (ExtensionType = {}));
var normalizeExtension = function(a) {
  if (typeof a == "function" || typeof a == "object" && a.extension) {
    if (!a.extension)
      throw new Error("Extension class must have an extension object");
    var e = typeof a.extension != "object" ? { type: a.extension } : a.extension;
    a = __assign$1(__assign$1({}, e), { ref: a });
  }
  if (typeof a == "object")
    a = __assign$1({}, a);
  else
    throw new Error("Invalid extension type");
  return typeof a.type == "string" && (a.type = [a.type]), a;
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
    for (var a = arguments, e = this, t = [], r = 0; r < arguments.length; r++)
      t[r] = a[r];
    return t.map(normalizeExtension).forEach(function(s) {
      s.type.forEach(function(o) {
        var u, h;
        return (h = (u = e._removeHandlers)[o]) === null || h === void 0 ? void 0 : h.call(u, s);
      });
    }), this;
  },
  /**
   * Register new extensions with PixiJS.
   * @param extensions - The spread of extensions to add to PixiJS.
   * @returns {PIXI.extensions} For chaining.
   */
  add: function() {
    for (var a = arguments, e = this, t = [], r = 0; r < arguments.length; r++)
      t[r] = a[r];
    return t.map(normalizeExtension).forEach(function(s) {
      s.type.forEach(function(o) {
        var u = e._addHandlers, h = e._queue;
        u[o] ? u[o](s) : (h[o] = h[o] || [], h[o].push(s));
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
  handle: function(a, e, t) {
    var r = this._addHandlers = this._addHandlers || {}, s = this._removeHandlers = this._removeHandlers || {};
    if (r[a] || s[a])
      throw new Error("Extension type " + a + " already has a handler");
    r[a] = e, s[a] = t;
    var o = this._queue;
    return o[a] && (o[a].forEach(function(u) {
      return e(u);
    }), delete o[a]), this;
  },
  /**
   * Handle a type, but using a map by `name` property.
   * @param type - Type of extension to handle.
   * @param map - The object map of named extensions.
   * @returns {PIXI.extensions} For chaining.
   */
  handleByMap: function(a, e) {
    return this.handle(a, function(t) {
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
  handleByList: function(a, e) {
    return this.handle(a, function(t) {
      var r, s;
      e.includes(t.ref) || (e.push(t.ref), a === ExtensionType.Loader && ((s = (r = t.ref).add) === null || s === void 0 || s.call(r)));
    }, function(t) {
      var r = e.indexOf(t.ref);
      r !== -1 && e.splice(r, 1);
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
    function a(e) {
      this.items = [], this._name = e, this._aliasCount = 0;
    }
    return a.prototype.emit = function(e, t, r, s, o, u, h, l) {
      if (arguments.length > 8)
        throw new Error("max arguments reached");
      var c = this, d = c.name, _ = c.items;
      this._aliasCount++;
      for (var v = 0, y = _.length; v < y; v++)
        _[v][d](e, t, r, s, o, u, h, l);
      return _ === this.items && this._aliasCount--, this;
    }, a.prototype.ensureNonAliasedItems = function() {
      this._aliasCount > 0 && this.items.length > 1 && (this._aliasCount = 0, this.items = this.items.slice(0));
    }, a.prototype.add = function(e) {
      return e[this._name] && (this.ensureNonAliasedItems(), this.remove(e), this.items.push(e)), this;
    }, a.prototype.remove = function(e) {
      var t = this.items.indexOf(e);
      return t !== -1 && (this.ensureNonAliasedItems(), this.items.splice(t, 1)), this;
    }, a.prototype.contains = function(e) {
      return this.items.indexOf(e) !== -1;
    }, a.prototype.removeAll = function() {
      return this.ensureNonAliasedItems(), this.items.length = 0, this;
    }, a.prototype.destroy = function() {
      this.removeAll(), this.items = null, this._name = null;
    }, Object.defineProperty(a.prototype, "empty", {
      /**
       * `true` if there are no this Runner contains no listeners
       * @readonly
       */
      get: function() {
        return this.items.length === 0;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(a.prototype, "name", {
      /**
       * The name of the runner.
       * @readonly
       */
      get: function() {
        return this._name;
      },
      enumerable: !1,
      configurable: !0
    }), a;
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
(function(a) {
  a[a.INTERACTION = 50] = "INTERACTION", a[a.HIGH = 25] = "HIGH", a[a.NORMAL = 0] = "NORMAL", a[a.LOW = -25] = "LOW", a[a.UTILITY = -50] = "UTILITY";
})(UPDATE_PRIORITY || (UPDATE_PRIORITY = {}));
var TickerListener = (
  /** @class */
  function() {
    function a(e, t, r, s) {
      t === void 0 && (t = null), r === void 0 && (r = 0), s === void 0 && (s = !1), this.next = null, this.previous = null, this._destroyed = !1, this.fn = e, this.context = t, this.priority = r, this.once = s;
    }
    return a.prototype.match = function(e, t) {
      return t === void 0 && (t = null), this.fn === e && this.context === t;
    }, a.prototype.emit = function(e) {
      this.fn && (this.context ? this.fn.call(this.context, e) : this.fn(e));
      var t = this.next;
      return this.once && this.destroy(!0), this._destroyed && (this.next = null), t;
    }, a.prototype.connect = function(e) {
      this.previous = e, e.next && (e.next.previous = this), this.next = e.next, e.next = this;
    }, a.prototype.destroy = function(e) {
      e === void 0 && (e = !1), this._destroyed = !0, this.fn = null, this.context = null, this.previous && (this.previous.next = this.next), this.next && (this.next.previous = this.previous);
      var t = this.next;
      return this.next = e ? null : t, this.previous = null, t;
    }, a;
  }()
), Ticker = (
  /** @class */
  function() {
    function a() {
      var e = this;
      this.autoStart = !1, this.deltaTime = 1, this.lastTime = -1, this.speed = 1, this.started = !1, this._requestId = null, this._maxElapsedMS = 100, this._minElapsedMS = 0, this._protected = !1, this._lastFrame = -1, this._head = new TickerListener(null, null, 1 / 0), this.deltaMS = 1 / settings.TARGET_FPMS, this.elapsedMS = 1 / settings.TARGET_FPMS, this._tick = function(t) {
        e._requestId = null, e.started && (e.update(t), e.started && e._requestId === null && e._head.next && (e._requestId = requestAnimationFrame(e._tick)));
      };
    }
    return a.prototype._requestIfNeeded = function() {
      this._requestId === null && this._head.next && (this.lastTime = performance.now(), this._lastFrame = this.lastTime, this._requestId = requestAnimationFrame(this._tick));
    }, a.prototype._cancelIfNeeded = function() {
      this._requestId !== null && (cancelAnimationFrame(this._requestId), this._requestId = null);
    }, a.prototype._startIfPossible = function() {
      this.started ? this._requestIfNeeded() : this.autoStart && this.start();
    }, a.prototype.add = function(e, t, r) {
      return r === void 0 && (r = UPDATE_PRIORITY.NORMAL), this._addListener(new TickerListener(e, t, r));
    }, a.prototype.addOnce = function(e, t, r) {
      return r === void 0 && (r = UPDATE_PRIORITY.NORMAL), this._addListener(new TickerListener(e, t, r, !0));
    }, a.prototype._addListener = function(e) {
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
    }, a.prototype.remove = function(e, t) {
      for (var r = this._head.next; r; )
        r.match(e, t) ? r = r.destroy() : r = r.next;
      return this._head.next || this._cancelIfNeeded(), this;
    }, Object.defineProperty(a.prototype, "count", {
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
    }), a.prototype.start = function() {
      this.started || (this.started = !0, this._requestIfNeeded());
    }, a.prototype.stop = function() {
      this.started && (this.started = !1, this._cancelIfNeeded());
    }, a.prototype.destroy = function() {
      if (!this._protected) {
        this.stop();
        for (var e = this._head.next; e; )
          e = e.destroy(!0);
        this._head.destroy(), this._head = null;
      }
    }, a.prototype.update = function(e) {
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
        for (var s = this._head, o = s.next; o; )
          o = o.emit(this.deltaTime);
        s.next || this._cancelIfNeeded();
      } else
        this.deltaTime = this.deltaMS = this.elapsedMS = 0;
      this.lastTime = e;
    }, Object.defineProperty(a.prototype, "FPS", {
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
    }), Object.defineProperty(a.prototype, "minFPS", {
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
    }), Object.defineProperty(a.prototype, "maxFPS", {
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
    }), Object.defineProperty(a, "shared", {
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
        if (!a._shared) {
          var e = a._shared = new a();
          e.autoStart = !0, e._protected = !0;
        }
        return a._shared;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(a, "system", {
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
        if (!a._system) {
          var e = a._system = new a();
          e.autoStart = !0, e._protected = !0;
        }
        return a._system;
      },
      enumerable: !1,
      configurable: !0
    }), a;
  }()
), TickerPlugin = (
  /** @class */
  function() {
    function a() {
    }
    return a.init = function(e) {
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
    }, a.destroy = function() {
      if (this._ticker) {
        var e = this._ticker;
        this.ticker = null, e.destroy();
      }
    }, a.extension = ExtensionType.Application, a;
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
function autoDetectResource(a, e) {
  if (!a)
    return null;
  var t = "";
  if (typeof a == "string") {
    var r = /\.(\w{3,4})(?:$|\?|#)/i.exec(a);
    r && (t = r[1].toLowerCase());
  }
  for (var s = INSTALLED.length - 1; s >= 0; --s) {
    var o = INSTALLED[s];
    if (o.test && o.test(a, t))
      return new o(a, e);
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
var extendStatics$i = function(a, e) {
  return extendStatics$i = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, r) {
    t.__proto__ = r;
  } || function(t, r) {
    for (var s in r)
      r.hasOwnProperty(s) && (t[s] = r[s]);
  }, extendStatics$i(a, e);
};
function __extends$i(a, e) {
  extendStatics$i(a, e);
  function t() {
    this.constructor = a;
  }
  a.prototype = e === null ? Object.create(e) : (t.prototype = e.prototype, new t());
}
var __assign = function() {
  return __assign = Object.assign || function(e) {
    for (var t = arguments, r, s = 1, o = arguments.length; s < o; s++) {
      r = t[s];
      for (var u in r)
        Object.prototype.hasOwnProperty.call(r, u) && (e[u] = r[u]);
    }
    return e;
  }, __assign.apply(this, arguments);
};
function __rest(a, e) {
  var t = {};
  for (var r in a)
    Object.prototype.hasOwnProperty.call(a, r) && e.indexOf(r) < 0 && (t[r] = a[r]);
  if (a != null && typeof Object.getOwnPropertySymbols == "function")
    for (var s = 0, r = Object.getOwnPropertySymbols(a); s < r.length; s++)
      e.indexOf(r[s]) < 0 && Object.prototype.propertyIsEnumerable.call(a, r[s]) && (t[r[s]] = a[r[s]]);
  return t;
}
var Resource = (
  /** @class */
  function() {
    function a(e, t) {
      e === void 0 && (e = 0), t === void 0 && (t = 0), this._width = e, this._height = t, this.destroyed = !1, this.internal = !1, this.onResize = new Runner("setRealSize"), this.onUpdate = new Runner("update"), this.onError = new Runner("onError");
    }
    return a.prototype.bind = function(e) {
      this.onResize.add(e), this.onUpdate.add(e), this.onError.add(e), (this._width || this._height) && this.onResize.emit(this._width, this._height);
    }, a.prototype.unbind = function(e) {
      this.onResize.remove(e), this.onUpdate.remove(e), this.onError.remove(e);
    }, a.prototype.resize = function(e, t) {
      (e !== this._width || t !== this._height) && (this._width = e, this._height = t, this.onResize.emit(e, t));
    }, Object.defineProperty(a.prototype, "valid", {
      /**
       * Has been validated
       * @readonly
       */
      get: function() {
        return !!this._width && !!this._height;
      },
      enumerable: !1,
      configurable: !0
    }), a.prototype.update = function() {
      this.destroyed || this.onUpdate.emit();
    }, a.prototype.load = function() {
      return Promise.resolve(this);
    }, Object.defineProperty(a.prototype, "width", {
      /**
       * The width of the resource.
       * @readonly
       */
      get: function() {
        return this._width;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(a.prototype, "height", {
      /**
       * The height of the resource.
       * @readonly
       */
      get: function() {
        return this._height;
      },
      enumerable: !1,
      configurable: !0
    }), a.prototype.style = function(e, t, r) {
      return !1;
    }, a.prototype.dispose = function() {
    }, a.prototype.destroy = function() {
      this.destroyed || (this.destroyed = !0, this.dispose(), this.onError.removeAll(), this.onError = null, this.onResize.removeAll(), this.onResize = null, this.onUpdate.removeAll(), this.onUpdate = null);
    }, a.test = function(e, t) {
      return !1;
    }, a;
  }()
), BufferResource = (
  /** @class */
  function(a) {
    __extends$i(e, a);
    function e(t, r) {
      var s = this, o = r || {}, u = o.width, h = o.height;
      if (!u || !h)
        throw new Error("BufferResource width or height invalid");
      return s = a.call(this, u, h) || this, s.data = t, s;
    }
    return e.prototype.upload = function(t, r, s) {
      var o = t.gl;
      o.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL, r.alphaMode === ALPHA_MODES.UNPACK);
      var u = r.realWidth, h = r.realHeight;
      return s.width === u && s.height === h ? o.texSubImage2D(r.target, 0, 0, 0, u, h, r.format, s.type, this.data) : (s.width = u, s.height = h, o.texImage2D(r.target, 0, s.internalFormat, u, h, 0, r.format, s.type, this.data)), !0;
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
  function(a) {
    __extends$i(e, a);
    function e(t, r) {
      t === void 0 && (t = null), r === void 0 && (r = null);
      var s = a.call(this) || this;
      r = r || {};
      var o = r.alphaMode, u = r.mipmap, h = r.anisotropicLevel, l = r.scaleMode, c = r.width, d = r.height, _ = r.wrapMode, v = r.format, y = r.type, b = r.target, g = r.resolution, m = r.resourceOptions;
      return t && !(t instanceof Resource) && (t = autoDetectResource(t, m), t.internal = !0), s.resolution = g || settings.RESOLUTION, s.width = Math.round((c || 0) * s.resolution) / s.resolution, s.height = Math.round((d || 0) * s.resolution) / s.resolution, s._mipmap = u !== void 0 ? u : settings.MIPMAP_TEXTURES, s.anisotropicLevel = h !== void 0 ? h : settings.ANISOTROPIC_LEVEL, s._wrapMode = _ || settings.WRAP_MODE, s._scaleMode = l !== void 0 ? l : settings.SCALE_MODE, s.format = v || FORMATS.RGBA, s.type = y || TYPES.UNSIGNED_BYTE, s.target = b || TARGETS.TEXTURE_2D, s.alphaMode = o !== void 0 ? o : ALPHA_MODES.UNPACK, s.uid = uid(), s.touched = 0, s.isPowerOfTwo = !1, s._refreshPOT(), s._glTextures = {}, s.dirtyId = 0, s.dirtyStyleId = 0, s.cacheId = null, s.valid = c > 0 && d > 0, s.textureCacheIds = [], s.destroyed = !1, s.resource = null, s._batchEnabled = 0, s._batchLocation = 0, s.parentTextureArray = null, s.setResource(t), s;
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
      var s;
      return t !== void 0 && t !== this.scaleMode && (this.scaleMode = t, s = !0), r !== void 0 && r !== this.mipmap && (this.mipmap = r, s = !0), s && this.dirtyStyleId++, this;
    }, e.prototype.setSize = function(t, r, s) {
      return s = s || this.resolution, this.setRealSize(t * s, r * s, s);
    }, e.prototype.setRealSize = function(t, r, s) {
      return this.resolution = s || this.resolution, this.width = Math.round(t) / this.resolution, this.height = Math.round(r) / this.resolution, this._refreshPOT(), this.update(), this;
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
    }, e.from = function(t, r, s) {
      s === void 0 && (s = settings.STRICT_TEXTURE_CACHE);
      var o = typeof t == "string", u = null;
      if (o)
        u = t;
      else {
        if (!t._pixiId) {
          var h = r && r.pixiIdPrefix || "pixiid";
          t._pixiId = h + "_" + uid();
        }
        u = t._pixiId;
      }
      var l = BaseTextureCache[u];
      if (o && s && !l)
        throw new Error('The cacheId "' + u + '" does not exist in BaseTextureCache.');
      return l || (l = new e(t, r), l.cacheId = u, e.addToCache(l, u)), l;
    }, e.fromBuffer = function(t, r, s, o) {
      t = t || new Float32Array(r * s * 4);
      var u = new BufferResource(t, { width: r, height: s }), h = t instanceof Float32Array ? TYPES.FLOAT : TYPES.UNSIGNED_BYTE;
      return new e(u, Object.assign({}, defaultBufferOptions, o || { width: r, height: s, type: h }));
    }, e.addToCache = function(t, r) {
      r && (t.textureCacheIds.indexOf(r) === -1 && t.textureCacheIds.push(r), BaseTextureCache[r] && console.warn("BaseTexture added to the cache with an id [" + r + "] that already had an entry"), BaseTextureCache[r] = t);
    }, e.removeFromCache = function(t) {
      if (typeof t == "string") {
        var r = BaseTextureCache[t];
        if (r) {
          var s = r.textureCacheIds.indexOf(t);
          return s > -1 && r.textureCacheIds.splice(s, 1), delete BaseTextureCache[t], r;
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
  function(a) {
    __extends$i(e, a);
    function e(t, r) {
      var s = this, o = r || {}, u = o.width, h = o.height;
      s = a.call(this, u, h) || this, s.items = [], s.itemDirtyIds = [];
      for (var l = 0; l < t; l++) {
        var c = new BaseTexture();
        s.items.push(c), s.itemDirtyIds.push(-2);
      }
      return s.length = t, s._load = null, s.baseTexture = null, s;
    }
    return e.prototype.initFromArray = function(t, r) {
      for (var s = 0; s < this.length; s++)
        t[s] && (t[s].castToBaseTexture ? this.addBaseTextureAt(t[s].castToBaseTexture(), s) : t[s] instanceof Resource ? this.addResourceAt(t[s], s) : this.addResourceAt(autoDetectResource(t[s], r), s));
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
      a.prototype.bind.call(this, t);
      for (var r = 0; r < this.length; r++)
        this.items[r].parentTextureArray = t, this.items[r].on("update", t.update, t);
    }, e.prototype.unbind = function(t) {
      a.prototype.unbind.call(this, t);
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
      }), s = r.map(function(o) {
        return o.load();
      });
      return this._load = Promise.all(s).then(function() {
        var o = t.items[0], u = o.realWidth, h = o.realHeight;
        return t.resize(u, h), Promise.resolve(t);
      }), this._load;
    }, e;
  }(Resource)
), ArrayResource = (
  /** @class */
  function(a) {
    __extends$i(e, a);
    function e(t, r) {
      var s = this, o = r || {}, u = o.width, h = o.height, l, c;
      return Array.isArray(t) ? (l = t, c = t.length) : c = t, s = a.call(this, c, { width: u, height: h }) || this, l && s.initFromArray(l, r), s;
    }
    return e.prototype.addBaseTextureAt = function(t, r) {
      if (t.resource)
        this.addResourceAt(t.resource, r);
      else
        throw new Error("ArrayResource does not support RenderTexture");
      return this;
    }, e.prototype.bind = function(t) {
      a.prototype.bind.call(this, t), t.target = TARGETS.TEXTURE_2D_ARRAY;
    }, e.prototype.upload = function(t, r, s) {
      var o = this, u = o.length, h = o.itemDirtyIds, l = o.items, c = t.gl;
      s.dirtyId < 0 && c.texImage3D(c.TEXTURE_2D_ARRAY, 0, s.internalFormat, this._width, this._height, u, 0, r.format, s.type, null);
      for (var d = 0; d < u; d++) {
        var _ = l[d];
        h[d] < _.dirtyId && (h[d] = _.dirtyId, _.valid && c.texSubImage3D(
          c.TEXTURE_2D_ARRAY,
          0,
          0,
          // xoffset
          0,
          // yoffset
          d,
          // zoffset
          _.resource.width,
          _.resource.height,
          1,
          r.format,
          s.type,
          _.resource.source
        ));
      }
      return !0;
    }, e;
  }(AbstractMultiResource)
), BaseImageResource = (
  /** @class */
  function(a) {
    __extends$i(e, a);
    function e(t) {
      var r = this, s = t, o = s.naturalWidth || s.videoWidth || s.width, u = s.naturalHeight || s.videoHeight || s.height;
      return r = a.call(this, o, u) || this, r.source = t, r.noSubImage = !1, r;
    }
    return e.crossOrigin = function(t, r, s) {
      s === void 0 && r.indexOf("data:") !== 0 ? t.crossOrigin = determineCrossOrigin(r) : s !== !1 && (t.crossOrigin = typeof s == "string" ? s : "anonymous");
    }, e.prototype.upload = function(t, r, s, o) {
      var u = t.gl, h = r.realWidth, l = r.realHeight;
      if (o = o || this.source, o instanceof HTMLImageElement) {
        if (!o.complete || o.naturalWidth === 0)
          return !1;
      } else if (o instanceof HTMLVideoElement && o.readyState <= 1)
        return !1;
      return u.pixelStorei(u.UNPACK_PREMULTIPLY_ALPHA_WEBGL, r.alphaMode === ALPHA_MODES.UNPACK), !this.noSubImage && r.target === u.TEXTURE_2D && s.width === h && s.height === l ? u.texSubImage2D(u.TEXTURE_2D, 0, 0, 0, r.format, s.type, o) : (s.width = h, s.height = l, u.texImage2D(r.target, 0, s.internalFormat, r.format, s.type, o)), !0;
    }, e.prototype.update = function() {
      if (!this.destroyed) {
        var t = this.source, r = t.naturalWidth || t.videoWidth || t.width, s = t.naturalHeight || t.videoHeight || t.height;
        this.resize(r, s), a.prototype.update.call(this);
      }
    }, e.prototype.dispose = function() {
      this.source = null;
    }, e;
  }(Resource)
), CanvasResource = (
  /** @class */
  function(a) {
    __extends$i(e, a);
    function e(t) {
      return a.call(this, t) || this;
    }
    return e.test = function(t) {
      var r = globalThis.OffscreenCanvas;
      return r && t instanceof r ? !0 : globalThis.HTMLCanvasElement && t instanceof HTMLCanvasElement;
    }, e;
  }(BaseImageResource)
), CubeResource = (
  /** @class */
  function(a) {
    __extends$i(e, a);
    function e(t, r) {
      var s = this, o = r || {}, u = o.width, h = o.height, l = o.autoLoad, c = o.linkBaseTexture;
      if (t && t.length !== e.SIDES)
        throw new Error("Invalid length. Got " + t.length + ", expected 6");
      s = a.call(this, 6, { width: u, height: h }) || this;
      for (var d = 0; d < e.SIDES; d++)
        s.items[d].target = TARGETS.TEXTURE_CUBE_MAP_POSITIVE_X + d;
      return s.linkBaseTexture = c !== !1, t && s.initFromArray(t, r), l !== !1 && s.load(), s;
    }
    return e.prototype.bind = function(t) {
      a.prototype.bind.call(this, t), t.target = TARGETS.TEXTURE_CUBE_MAP;
    }, e.prototype.addBaseTextureAt = function(t, r, s) {
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
    }, e.prototype.upload = function(t, r, s) {
      for (var o = this.itemDirtyIds, u = 0; u < e.SIDES; u++) {
        var h = this.items[u];
        (o[u] < h.dirtyId || s.dirtyId < r.dirtyId) && (h.valid && h.resource ? (h.resource.upload(t, h, s), o[u] = h.dirtyId) : o[u] < -1 && (t.gl.texImage2D(h.target, 0, s.internalFormat, r.realWidth, r.realHeight, 0, r.format, s.type, null), o[u] = -1));
      }
      return !0;
    }, e.test = function(t) {
      return Array.isArray(t) && t.length === e.SIDES;
    }, e.SIDES = 6, e;
  }(AbstractMultiResource)
), ImageResource = (
  /** @class */
  function(a) {
    __extends$i(e, a);
    function e(t, r) {
      var s = this;
      if (r = r || {}, !(t instanceof HTMLImageElement)) {
        var o = new Image();
        BaseImageResource.crossOrigin(o, t, r.crossorigin), o.src = t, t = o;
      }
      return s = a.call(this, t) || this, !t.complete && s._width && s._height && (s._width = 0, s._height = 0), s.url = t.src, s._process = null, s.preserveBitmap = !1, s.createBitmap = (r.createBitmap !== void 0 ? r.createBitmap : settings.CREATE_IMAGE_BITMAP) && !!globalThis.createImageBitmap, s.alphaMode = typeof r.alphaMode == "number" ? r.alphaMode : null, s.bitmap = null, s._load = null, r.autoLoad !== !1 && s.load(), s;
    }
    return e.prototype.load = function(t) {
      var r = this;
      return this._load ? this._load : (t !== void 0 && (this.createBitmap = t), this._load = new Promise(function(s, o) {
        var u = r.source;
        r.url = u.src;
        var h = function() {
          r.destroyed || (u.onload = null, u.onerror = null, r.resize(u.width, u.height), r._load = null, r.createBitmap ? s(r.process()) : s(r));
        };
        u.complete && u.src ? h() : (u.onload = h, u.onerror = function(l) {
          o(l), r.onError.emit(l);
        });
      }), this._load);
    }, e.prototype.process = function() {
      var t = this, r = this.source;
      if (this._process !== null)
        return this._process;
      if (this.bitmap !== null || !globalThis.createImageBitmap)
        return Promise.resolve(this);
      var s = globalThis.createImageBitmap, o = !r.crossOrigin || r.crossOrigin === "anonymous";
      return this._process = fetch(r.src, {
        mode: o ? "cors" : "no-cors"
      }).then(function(u) {
        return u.blob();
      }).then(function(u) {
        return s(u, 0, 0, r.width, r.height, {
          premultiplyAlpha: t.alphaMode === null || t.alphaMode === ALPHA_MODES.UNPACK ? "premultiply" : "none"
        });
      }).then(function(u) {
        return t.destroyed ? Promise.reject() : (t.bitmap = u, t.update(), t._process = null, Promise.resolve(t));
      }), this._process;
    }, e.prototype.upload = function(t, r, s) {
      if (typeof this.alphaMode == "number" && (r.alphaMode = this.alphaMode), !this.createBitmap)
        return a.prototype.upload.call(this, t, r, s);
      if (!this.bitmap && (this.process(), !this.bitmap))
        return !1;
      if (a.prototype.upload.call(this, t, r, s, this.bitmap), !this.preserveBitmap) {
        var o = !0, u = r._glTextures;
        for (var h in u) {
          var l = u[h];
          if (l !== s && l.dirtyId !== r.dirtyId) {
            o = !1;
            break;
          }
        }
        o && (this.bitmap.close && this.bitmap.close(), this.bitmap = null);
      }
      return !0;
    }, e.prototype.dispose = function() {
      this.source.onload = null, this.source.onerror = null, a.prototype.dispose.call(this), this.bitmap && (this.bitmap.close(), this.bitmap = null), this._process = null, this._load = null;
    }, e.test = function(t) {
      return typeof t == "string" || t instanceof HTMLImageElement;
    }, e;
  }(BaseImageResource)
), SVGResource = (
  /** @class */
  function(a) {
    __extends$i(e, a);
    function e(t, r) {
      var s = this;
      return r = r || {}, s = a.call(this, settings.ADAPTER.createCanvas()) || this, s._width = 0, s._height = 0, s.svg = t, s.scale = r.scale || 1, s._overrideWidth = r.width, s._overrideHeight = r.height, s._resolve = null, s._crossorigin = r.crossorigin, s._load = null, r.autoLoad !== !1 && s.load(), s;
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
      BaseImageResource.crossOrigin(r, this.svg, this._crossorigin), r.src = this.svg, r.onerror = function(s) {
        t._resolve && (r.onerror = null, t.onError.emit(s));
      }, r.onload = function() {
        if (t._resolve) {
          var s = r.width, o = r.height;
          if (!s || !o)
            throw new Error("The SVG image must have width and height defined (in pixels), canvas API needs them.");
          var u = s * t.scale, h = o * t.scale;
          (t._overrideWidth || t._overrideHeight) && (u = t._overrideWidth || t._overrideHeight / o * s, h = t._overrideHeight || t._overrideWidth / s * o), u = Math.round(u), h = Math.round(h);
          var l = t.source;
          l.width = u, l.height = h, l._pixiId = "canvas_" + uid(), l.getContext("2d").drawImage(r, 0, 0, s, o, 0, 0, u, h), t._resolve(), t._resolve = null;
        }
      };
    }, e.getSize = function(t) {
      var r = e.SVG_SIZE.exec(t), s = {};
      return r && (s[r[1]] = Math.round(parseFloat(r[3])), s[r[5]] = Math.round(parseFloat(r[7]))), s;
    }, e.prototype.dispose = function() {
      a.prototype.dispose.call(this), this._resolve = null, this._crossorigin = null;
    }, e.test = function(t, r) {
      return r === "svg" || typeof t == "string" && t.startsWith("data:image/svg+xml") || typeof t == "string" && e.SVG_XML.test(t);
    }, e.SVG_XML = /^(<\?xml[^?]+\?>)?\s*(<!--[^(-->)]*-->)?\s*\<svg/m, e.SVG_SIZE = /<svg[^>]*(?:\s(width|height)=('|")(\d*(?:\.\d+)?)(?:px)?('|"))[^>]*(?:\s(width|height)=('|")(\d*(?:\.\d+)?)(?:px)?('|"))[^>]*>/i, e;
  }(BaseImageResource)
), VideoResource = (
  /** @class */
  function(a) {
    __extends$i(e, a);
    function e(t, r) {
      var s = this;
      if (r = r || {}, !(t instanceof HTMLVideoElement)) {
        var o = document.createElement("video");
        o.setAttribute("preload", "auto"), o.setAttribute("webkit-playsinline", ""), o.setAttribute("playsinline", ""), typeof t == "string" && (t = [t]);
        var u = t[0].src || t[0];
        BaseImageResource.crossOrigin(o, u, r.crossorigin);
        for (var h = 0; h < t.length; ++h) {
          var l = document.createElement("source"), c = t[h], d = c.src, _ = c.mime;
          d = d || t[h];
          var v = d.split("?").shift().toLowerCase(), y = v.slice(v.lastIndexOf(".") + 1);
          _ = _ || e.MIME_TYPES[y] || "video/" + y, l.src = d, l.type = _, o.appendChild(l);
        }
        t = o;
      }
      return s = a.call(this, t) || this, s.noSubImage = !0, s._autoUpdate = !0, s._isConnectedToTicker = !1, s._updateFPS = r.updateFPS || 0, s._msToNextUpdate = 0, s.autoPlay = r.autoPlay !== !1, s._load = null, s._resolve = null, s._onCanPlay = s._onCanPlay.bind(s), s._onError = s._onError.bind(s), r.autoLoad !== !1 && s.load(), s;
    }
    return e.prototype.update = function(t) {
      if (!this.destroyed) {
        var r = Ticker.shared.elapsedMS * this.source.playbackRate;
        this._msToNextUpdate = Math.floor(this._msToNextUpdate - r), (!this._updateFPS || this._msToNextUpdate <= 0) && (a.prototype.update.call(this), this._msToNextUpdate = this._updateFPS ? Math.floor(1e3 / this._updateFPS) : 0);
      }
    }, e.prototype.load = function() {
      var t = this;
      if (this._load)
        return this._load;
      var r = this.source;
      return (r.readyState === r.HAVE_ENOUGH_DATA || r.readyState === r.HAVE_FUTURE_DATA) && r.width && r.height && (r.complete = !0), r.addEventListener("play", this._onPlayStart.bind(this)), r.addEventListener("pause", this._onPlayStop.bind(this)), this._isSourceReady() ? this._onCanPlay() : (r.addEventListener("canplay", this._onCanPlay), r.addEventListener("canplaythrough", this._onCanPlay), r.addEventListener("error", this._onError, !0)), this._load = new Promise(function(s) {
        t.valid ? s(t) : (t._resolve = s, r.load());
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
      t && (t.removeEventListener("error", this._onError, !0), t.pause(), t.src = "", t.load()), a.prototype.dispose.call(this);
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
  function(a) {
    __extends$i(e, a);
    function e(t) {
      return a.call(this, t) || this;
    }
    return e.test = function(t) {
      return !!globalThis.createImageBitmap && typeof ImageBitmap < "u" && t instanceof ImageBitmap;
    }, e;
  }(BaseImageResource)
);
INSTALLED.push(ImageResource, ImageBitmapResource, CanvasResource, VideoResource, SVGResource, BufferResource, CubeResource, ArrayResource);
var _resources = {
  __proto__: null,
  Resource,
  BaseImageResource,
  INSTALLED,
  autoDetectResource,
  AbstractMultiResource,
  ArrayResource,
  BufferResource,
  CanvasResource,
  CubeResource,
  ImageResource,
  SVGResource,
  VideoResource,
  ImageBitmapResource
}, DepthResource = (
  /** @class */
  function(a) {
    __extends$i(e, a);
    function e() {
      return a !== null && a.apply(this, arguments) || this;
    }
    return e.prototype.upload = function(t, r, s) {
      var o = t.gl;
      o.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL, r.alphaMode === ALPHA_MODES.UNPACK);
      var u = r.realWidth, h = r.realHeight;
      return s.width === u && s.height === h ? o.texSubImage2D(r.target, 0, 0, 0, u, h, r.format, s.type, this.data) : (s.width = u, s.height = h, o.texImage2D(r.target, 0, s.internalFormat, u, h, 0, r.format, s.type, this.data)), !0;
    }, e;
  }(BufferResource)
), Framebuffer = (
  /** @class */
  function() {
    function a(e, t) {
      this.width = Math.round(e || 100), this.height = Math.round(t || 100), this.stencil = !1, this.depth = !1, this.dirtyId = 0, this.dirtyFormat = 0, this.dirtySize = 0, this.depthTexture = null, this.colorTextures = [], this.glFramebuffers = {}, this.disposeRunner = new Runner("disposeFramebuffer"), this.multisample = MSAA_QUALITY.NONE;
    }
    return Object.defineProperty(a.prototype, "colorTexture", {
      /**
       * Reference to the colorTexture.
       * @readonly
       */
      get: function() {
        return this.colorTextures[0];
      },
      enumerable: !1,
      configurable: !0
    }), a.prototype.addColorTexture = function(e, t) {
      return e === void 0 && (e = 0), this.colorTextures[e] = t || new BaseTexture(null, {
        scaleMode: SCALE_MODES.NEAREST,
        resolution: 1,
        mipmap: MIPMAP_MODES.OFF,
        width: this.width,
        height: this.height
      }), this.dirtyId++, this.dirtyFormat++, this;
    }, a.prototype.addDepthTexture = function(e) {
      return this.depthTexture = e || new BaseTexture(new DepthResource(null, { width: this.width, height: this.height }), {
        scaleMode: SCALE_MODES.NEAREST,
        resolution: 1,
        width: this.width,
        height: this.height,
        mipmap: MIPMAP_MODES.OFF,
        format: FORMATS.DEPTH_COMPONENT,
        type: TYPES.UNSIGNED_SHORT
      }), this.dirtyId++, this.dirtyFormat++, this;
    }, a.prototype.enableDepth = function() {
      return this.depth = !0, this.dirtyId++, this.dirtyFormat++, this;
    }, a.prototype.enableStencil = function() {
      return this.stencil = !0, this.dirtyId++, this.dirtyFormat++, this;
    }, a.prototype.resize = function(e, t) {
      if (e = Math.round(e), t = Math.round(t), !(e === this.width && t === this.height)) {
        this.width = e, this.height = t, this.dirtyId++, this.dirtySize++;
        for (var r = 0; r < this.colorTextures.length; r++) {
          var s = this.colorTextures[r], o = s.resolution;
          s.setSize(e / o, t / o);
        }
        if (this.depthTexture) {
          var o = this.depthTexture.resolution;
          this.depthTexture.setSize(e / o, t / o);
        }
      }
    }, a.prototype.dispose = function() {
      this.disposeRunner.emit(this, !1);
    }, a.prototype.destroyDepthTexture = function() {
      this.depthTexture && (this.depthTexture.destroy(), this.depthTexture = null, ++this.dirtyId, ++this.dirtyFormat);
    }, a;
  }()
), BaseRenderTexture = (
  /** @class */
  function(a) {
    __extends$i(e, a);
    function e(t) {
      t === void 0 && (t = {});
      var r = this;
      if (typeof t == "number") {
        var s = arguments[0], o = arguments[1], u = arguments[2], h = arguments[3];
        t = { width: s, height: o, scaleMode: u, resolution: h };
      }
      return t.width = t.width || 100, t.height = t.height || 100, t.multisample = t.multisample !== void 0 ? t.multisample : MSAA_QUALITY.NONE, r = a.call(this, null, t) || this, r.mipmap = MIPMAP_MODES.OFF, r.valid = !0, r.clearColor = [0, 0, 0, 0], r.framebuffer = new Framebuffer(r.realWidth, r.realHeight).addColorTexture(0, r), r.framebuffer.multisample = t.multisample, r.maskStack = [], r.filterStack = [{}], r;
    }
    return e.prototype.resize = function(t, r) {
      this.framebuffer.resize(t * this.resolution, r * this.resolution), this.setRealSize(this.framebuffer.width, this.framebuffer.height);
    }, e.prototype.dispose = function() {
      this.framebuffer.dispose(), a.prototype.dispose.call(this);
    }, e.prototype.destroy = function() {
      a.prototype.destroy.call(this), this.framebuffer.destroyDepthTexture(), this.framebuffer = null;
    }, e;
  }(BaseTexture)
), TextureUvs = (
  /** @class */
  function() {
    function a() {
      this.x0 = 0, this.y0 = 0, this.x1 = 1, this.y1 = 0, this.x2 = 1, this.y2 = 1, this.x3 = 0, this.y3 = 1, this.uvsFloat32 = new Float32Array(8);
    }
    return a.prototype.set = function(e, t, r) {
      var s = t.width, o = t.height;
      if (r) {
        var u = e.width / 2 / s, h = e.height / 2 / o, l = e.x / s + u, c = e.y / o + h;
        r = groupD8.add(r, groupD8.NW), this.x0 = l + u * groupD8.uX(r), this.y0 = c + h * groupD8.uY(r), r = groupD8.add(r, 2), this.x1 = l + u * groupD8.uX(r), this.y1 = c + h * groupD8.uY(r), r = groupD8.add(r, 2), this.x2 = l + u * groupD8.uX(r), this.y2 = c + h * groupD8.uY(r), r = groupD8.add(r, 2), this.x3 = l + u * groupD8.uX(r), this.y3 = c + h * groupD8.uY(r);
      } else
        this.x0 = e.x / s, this.y0 = e.y / o, this.x1 = (e.x + e.width) / s, this.y1 = e.y / o, this.x2 = (e.x + e.width) / s, this.y2 = (e.y + e.height) / o, this.x3 = e.x / s, this.y3 = (e.y + e.height) / o;
      this.uvsFloat32[0] = this.x0, this.uvsFloat32[1] = this.y0, this.uvsFloat32[2] = this.x1, this.uvsFloat32[3] = this.y1, this.uvsFloat32[4] = this.x2, this.uvsFloat32[5] = this.y2, this.uvsFloat32[6] = this.x3, this.uvsFloat32[7] = this.y3;
    }, a.prototype.toString = function() {
      return "[@pixi/core:TextureUvs " + ("x0=" + this.x0 + " y0=" + this.y0 + " ") + ("x1=" + this.x1 + " y1=" + this.y1 + " x2=" + this.x2 + " ") + ("y2=" + this.y2 + " x3=" + this.x3 + " y3=" + this.y3) + "]";
    }, a;
  }()
), DEFAULT_UVS = new TextureUvs();
function removeAllHandlers(a) {
  a.destroy = function() {
  }, a.on = function() {
  }, a.once = function() {
  }, a.emit = function() {
  };
}
var Texture = (
  /** @class */
  function(a) {
    __extends$i(e, a);
    function e(t, r, s, o, u, h) {
      var l = a.call(this) || this;
      if (l.noFrame = !1, r || (l.noFrame = !0, r = new Rectangle(0, 0, 1, 1)), t instanceof e && (t = t.baseTexture), l.baseTexture = t, l._frame = r, l.trim = o, l.valid = !1, l._uvs = DEFAULT_UVS, l.uvMatrix = null, l.orig = s || r, l._rotate = Number(u || 0), u === !0)
        l._rotate = 2;
      else if (l._rotate % 2 !== 0)
        throw new Error("attempt to use diamond-shaped UVs. If you are sure, set rotation manually");
      return l.defaultAnchor = h ? new Point(h.x, h.y) : new Point(0, 0), l._updateID = 0, l.textureCacheIds = [], t.valid ? l.noFrame ? t.valid && l.onBaseTextureUpdated(t) : l.frame = r : t.once("loaded", l.onBaseTextureUpdated, l), l.noFrame && t.on("update", l.onBaseTextureUpdated, l), l;
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
      var t = this._frame.clone(), r = this._frame === this.orig ? t : this.orig.clone(), s = new e(this.baseTexture, !this.noFrame && t, r, this.trim && this.trim.clone(), this.rotate, this.defaultAnchor);
      return this.noFrame && (s._frame = t), s;
    }, e.prototype.updateUvs = function() {
      this._uvs === DEFAULT_UVS && (this._uvs = new TextureUvs()), this._uvs.set(this._frame, this.baseTexture, this.rotate), this._updateID++;
    }, e.from = function(t, r, s) {
      r === void 0 && (r = {}), s === void 0 && (s = settings.STRICT_TEXTURE_CACHE);
      var o = typeof t == "string", u = null;
      if (o)
        u = t;
      else if (t instanceof BaseTexture) {
        if (!t.cacheId) {
          var h = r && r.pixiIdPrefix || "pixiid";
          t.cacheId = h + "-" + uid(), BaseTexture.addToCache(t, t.cacheId);
        }
        u = t.cacheId;
      } else {
        if (!t._pixiId) {
          var h = r && r.pixiIdPrefix || "pixiid";
          t._pixiId = h + "_" + uid();
        }
        u = t._pixiId;
      }
      var l = TextureCache[u];
      if (o && s && !l)
        throw new Error('The cacheId "' + u + '" does not exist in TextureCache.');
      return !l && !(t instanceof BaseTexture) ? (r.resolution || (r.resolution = getResolutionOfUrl(t)), l = new e(new BaseTexture(t, r)), l.baseTexture.cacheId = u, BaseTexture.addToCache(l.baseTexture, u), e.addToCache(l, u)) : !l && t instanceof BaseTexture && (l = new e(t), e.addToCache(l, u)), l;
    }, e.fromURL = function(t, r) {
      var s = Object.assign({ autoLoad: !1 }, r?.resourceOptions), o = e.from(t, Object.assign({ resourceOptions: s }, r), !1), u = o.baseTexture.resource;
      return o.baseTexture.valid ? Promise.resolve(o) : u.load().then(function() {
        return Promise.resolve(o);
      });
    }, e.fromBuffer = function(t, r, s, o) {
      return new e(BaseTexture.fromBuffer(t, r, s, o));
    }, e.fromLoader = function(t, r, s, o) {
      var u = new BaseTexture(t, Object.assign({
        scaleMode: settings.SCALE_MODE,
        resolution: getResolutionOfUrl(r)
      }, o)), h = u.resource;
      h instanceof ImageResource && (h.url = r);
      var l = new e(u);
      return s || (s = r), BaseTexture.addToCache(l.baseTexture, s), e.addToCache(l, s), s !== r && (BaseTexture.addToCache(l.baseTexture, r), e.addToCache(l, r)), l.baseTexture.valid ? Promise.resolve(l) : new Promise(function(c) {
        l.baseTexture.once("loaded", function() {
          return c(l);
        });
      });
    }, e.addToCache = function(t, r) {
      r && (t.textureCacheIds.indexOf(r) === -1 && t.textureCacheIds.push(r), TextureCache[r] && console.warn("Texture added to the cache with an id [" + r + "] that already had an entry"), TextureCache[r] = t);
    }, e.removeFromCache = function(t) {
      if (typeof t == "string") {
        var r = TextureCache[t];
        if (r) {
          var s = r.textureCacheIds.indexOf(t);
          return s > -1 && r.textureCacheIds.splice(s, 1), delete TextureCache[t], r;
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
        var r = t.x, s = t.y, o = t.width, u = t.height, h = r + o > this.baseTexture.width, l = s + u > this.baseTexture.height;
        if (h || l) {
          var c = h && l ? "and" : "or", d = "X: " + r + " + " + o + " = " + (r + o) + " > " + this.baseTexture.width, _ = "Y: " + s + " + " + u + " = " + (s + u) + " > " + this.baseTexture.height;
          throw new Error("Texture Error: frame does not fit inside the base Texture dimensions: " + (d + " " + c + " " + _));
        }
        this.valid = o && u && this.baseTexture.valid, !this.trim && !this.rotate && (this.orig = t), this.valid && this.updateUvs();
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
  function(a) {
    __extends$i(e, a);
    function e(t, r) {
      var s = a.call(this, t, r) || this;
      return s.valid = !0, s.filterFrame = null, s.filterPoolKey = null, s.updateUvs(), s;
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
    }), e.prototype.resize = function(t, r, s) {
      s === void 0 && (s = !0);
      var o = this.baseTexture.resolution, u = Math.round(t * o) / o, h = Math.round(r * o) / o;
      this.valid = u > 0 && h > 0, this._frame.width = this.orig.width = u, this._frame.height = this.orig.height = h, s && this.baseTexture.resize(u, h), this.updateUvs();
    }, e.prototype.setResolution = function(t) {
      var r = this.baseTexture;
      r.resolution !== t && (r.setResolution(t), this.resize(r.width, r.height, !1));
    }, e.create = function(t) {
      for (var r = arguments, s = [], o = 1; o < arguments.length; o++)
        s[o - 1] = r[o];
      return typeof t == "number" && (deprecation("6.0.0", "Arguments (width, height, scaleMode, resolution) have been deprecated."), t = {
        width: t,
        height: s[0],
        scaleMode: s[1],
        resolution: s[2]
      }), new e(new BaseRenderTexture(t));
    }, e;
  }(Texture)
), RenderTexturePool = (
  /** @class */
  function() {
    function a(e) {
      this.texturePool = {}, this.textureOptions = e || {}, this.enableFullScreen = !1, this._pixelsWidth = 0, this._pixelsHeight = 0;
    }
    return a.prototype.createTexture = function(e, t, r) {
      r === void 0 && (r = MSAA_QUALITY.NONE);
      var s = new BaseRenderTexture(Object.assign({
        width: e,
        height: t,
        resolution: 1,
        multisample: r
      }, this.textureOptions));
      return new RenderTexture(s);
    }, a.prototype.getOptimalTexture = function(e, t, r, s) {
      r === void 0 && (r = 1), s === void 0 && (s = MSAA_QUALITY.NONE);
      var o;
      e = Math.ceil(e * r - 1e-6), t = Math.ceil(t * r - 1e-6), !this.enableFullScreen || e !== this._pixelsWidth || t !== this._pixelsHeight ? (e = nextPow2(e), t = nextPow2(t), o = ((e & 65535) << 16 | t & 65535) >>> 0, s > 1 && (o += s * 4294967296)) : o = s > 1 ? -s : -1, this.texturePool[o] || (this.texturePool[o] = []);
      var u = this.texturePool[o].pop();
      return u || (u = this.createTexture(e, t, s)), u.filterPoolKey = o, u.setResolution(r), u;
    }, a.prototype.getFilterTexture = function(e, t, r) {
      var s = this.getOptimalTexture(e.width, e.height, t || e.resolution, r || MSAA_QUALITY.NONE);
      return s.filterFrame = e.filterFrame, s;
    }, a.prototype.returnTexture = function(e) {
      var t = e.filterPoolKey;
      e.filterFrame = null, this.texturePool[t].push(e);
    }, a.prototype.returnFilterTexture = function(e) {
      this.returnTexture(e);
    }, a.prototype.clear = function(e) {
      if (e = e !== !1, e)
        for (var t in this.texturePool) {
          var r = this.texturePool[t];
          if (r)
            for (var s = 0; s < r.length; s++)
              r[s].destroy(!0);
        }
      this.texturePool = {};
    }, a.prototype.setScreenSize = function(e) {
      if (!(e.width === this._pixelsWidth && e.height === this._pixelsHeight)) {
        this.enableFullScreen = e.width > 0 && e.height > 0;
        for (var t in this.texturePool)
          if (Number(t) < 0) {
            var r = this.texturePool[t];
            if (r)
              for (var s = 0; s < r.length; s++)
                r[s].destroy(!0);
            this.texturePool[t] = [];
          }
        this._pixelsWidth = e.width, this._pixelsHeight = e.height;
      }
    }, a.SCREEN_KEY = -1, a;
  }()
), Attribute = (
  /** @class */
  function() {
    function a(e, t, r, s, o, u, h) {
      t === void 0 && (t = 0), r === void 0 && (r = !1), s === void 0 && (s = TYPES.FLOAT), this.buffer = e, this.size = t, this.normalized = r, this.type = s, this.stride = o, this.start = u, this.instance = h;
    }
    return a.prototype.destroy = function() {
      this.buffer = null;
    }, a.from = function(e, t, r, s, o) {
      return new a(e, t, r, s, o);
    }, a;
  }()
), UID$4 = 0, Buffer = (
  /** @class */
  function() {
    function a(e, t, r) {
      t === void 0 && (t = !0), r === void 0 && (r = !1), this.data = e || new Float32Array(1), this._glBuffers = {}, this._updateID = 0, this.index = r, this.static = t, this.id = UID$4++, this.disposeRunner = new Runner("disposeBuffer");
    }
    return a.prototype.update = function(e) {
      e instanceof Array && (e = new Float32Array(e)), this.data = e || this.data, this._updateID++;
    }, a.prototype.dispose = function() {
      this.disposeRunner.emit(this, !1);
    }, a.prototype.destroy = function() {
      this.dispose(), this.data = null;
    }, Object.defineProperty(a.prototype, "index", {
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
    }), a.from = function(e) {
      return e instanceof Array && (e = new Float32Array(e)), new a(e);
    }, a;
  }()
), map$1 = {
  Float32Array,
  Uint32Array,
  Int32Array,
  Uint8Array
};
function interleaveTypedArrays(a, e) {
  for (var t = 0, r = 0, s = {}, o = 0; o < a.length; o++)
    r += e[o], t += a[o].length;
  for (var u = new ArrayBuffer(t * 4), h = null, l = 0, o = 0; o < a.length; o++) {
    var c = e[o], d = a[o], _ = getBufferType(d);
    s[_] || (s[_] = new map$1[_](u)), h = s[_];
    for (var v = 0; v < d.length; v++) {
      var y = (v / c | 0) * r + l, b = v % c;
      h[y + b] = d[v];
    }
    l += c;
  }
  return new Float32Array(u);
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
    function a(e, t) {
      e === void 0 && (e = []), t === void 0 && (t = {}), this.buffers = e, this.indexBuffer = null, this.attributes = t, this.glVertexArrayObjects = {}, this.id = UID$3++, this.instanced = !1, this.instanceCount = 1, this.disposeRunner = new Runner("disposeGeometry"), this.refCount = 0;
    }
    return a.prototype.addAttribute = function(e, t, r, s, o, u, h, l) {
      if (r === void 0 && (r = 0), s === void 0 && (s = !1), l === void 0 && (l = !1), !t)
        throw new Error("You must pass a buffer when creating an attribute");
      t instanceof Buffer || (t instanceof Array && (t = new Float32Array(t)), t = new Buffer(t));
      var c = e.split("|");
      if (c.length > 1) {
        for (var d = 0; d < c.length; d++)
          this.addAttribute(c[d], t, r, s, o);
        return this;
      }
      var _ = this.buffers.indexOf(t);
      return _ === -1 && (this.buffers.push(t), _ = this.buffers.length - 1), this.attributes[e] = new Attribute(_, r, s, o, u, h, l), this.instanced = this.instanced || l, this;
    }, a.prototype.getAttribute = function(e) {
      return this.attributes[e];
    }, a.prototype.getBuffer = function(e) {
      return this.buffers[this.getAttribute(e).buffer];
    }, a.prototype.addIndex = function(e) {
      return e instanceof Buffer || (e instanceof Array && (e = new Uint16Array(e)), e = new Buffer(e)), e.type = BUFFER_TYPE.ELEMENT_ARRAY_BUFFER, this.indexBuffer = e, this.buffers.indexOf(e) === -1 && this.buffers.push(e), this;
    }, a.prototype.getIndex = function() {
      return this.indexBuffer;
    }, a.prototype.interleave = function() {
      if (this.buffers.length === 1 || this.buffers.length === 2 && this.indexBuffer)
        return this;
      var e = [], t = [], r = new Buffer(), s;
      for (s in this.attributes) {
        var o = this.attributes[s], u = this.buffers[o.buffer];
        e.push(u.data), t.push(o.size * byteSizeMap$1[o.type] / 4), o.buffer = 0;
      }
      for (r.data = interleaveTypedArrays(e, t), s = 0; s < this.buffers.length; s++)
        this.buffers[s] !== this.indexBuffer && this.buffers[s].destroy();
      return this.buffers = [r], this.indexBuffer && this.buffers.push(this.indexBuffer), this;
    }, a.prototype.getSize = function() {
      for (var e in this.attributes) {
        var t = this.attributes[e], r = this.buffers[t.buffer];
        return r.data.length / (t.stride / 4 || t.size);
      }
      return 0;
    }, a.prototype.dispose = function() {
      this.disposeRunner.emit(this, !1);
    }, a.prototype.destroy = function() {
      this.dispose(), this.buffers = null, this.indexBuffer = null, this.attributes = null;
    }, a.prototype.clone = function() {
      for (var e = new a(), t = 0; t < this.buffers.length; t++)
        e.buffers[t] = new Buffer(this.buffers[t].data.slice(0));
      for (var t in this.attributes) {
        var r = this.attributes[t];
        e.attributes[t] = new Attribute(r.buffer, r.size, r.normalized, r.type, r.stride, r.start, r.instance);
      }
      return this.indexBuffer && (e.indexBuffer = e.buffers[this.buffers.indexOf(this.indexBuffer)], e.indexBuffer.type = BUFFER_TYPE.ELEMENT_ARRAY_BUFFER), e;
    }, a.merge = function(e) {
      for (var t = new a(), r = [], s = [], o = [], u, h = 0; h < e.length; h++) {
        u = e[h];
        for (var l = 0; l < u.buffers.length; l++)
          s[l] = s[l] || 0, s[l] += u.buffers[l].data.length, o[l] = 0;
      }
      for (var h = 0; h < u.buffers.length; h++)
        r[h] = new map[getBufferType(u.buffers[h].data)](s[h]), t.buffers[h] = new Buffer(r[h]);
      for (var h = 0; h < e.length; h++) {
        u = e[h];
        for (var l = 0; l < u.buffers.length; l++)
          r[l].set(u.buffers[l].data, o[l]), o[l] += u.buffers[l].data.length;
      }
      if (t.attributes = u.attributes, u.indexBuffer) {
        t.indexBuffer = t.buffers[u.buffers.indexOf(u.indexBuffer)], t.indexBuffer.type = BUFFER_TYPE.ELEMENT_ARRAY_BUFFER;
        for (var c = 0, d = 0, _ = 0, v = 0, h = 0; h < u.buffers.length; h++)
          if (u.buffers[h] !== u.indexBuffer) {
            v = h;
            break;
          }
        for (var h in u.attributes) {
          var y = u.attributes[h];
          (y.buffer | 0) === v && (d += y.size * byteSizeMap$1[y.type] / 4);
        }
        for (var h = 0; h < e.length; h++) {
          for (var b = e[h].indexBuffer.data, l = 0; l < b.length; l++)
            t.indexBuffer.data[l + _] += c;
          c += e[h].buffers[v].data.length / d, _ += b.length;
        }
      }
      return t;
    }, a;
  }()
), Quad = (
  /** @class */
  function(a) {
    __extends$i(e, a);
    function e() {
      var t = a.call(this) || this;
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
  function(a) {
    __extends$i(e, a);
    function e() {
      var t = a.call(this) || this;
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
      var s = 0, o = 0;
      return this.uvs[0] = s, this.uvs[1] = o, this.uvs[2] = s + r.width / t.width, this.uvs[3] = o, this.uvs[4] = s + r.width / t.width, this.uvs[5] = o + r.height / t.height, this.uvs[6] = s, this.uvs[7] = o + r.height / t.height, s = r.x, o = r.y, this.vertices[0] = s, this.vertices[1] = o, this.vertices[2] = s + r.width, this.vertices[3] = o, this.vertices[4] = s + r.width, this.vertices[5] = o + r.height, this.vertices[6] = s, this.vertices[7] = o + r.height, this.invalidate(), this;
    }, e.prototype.invalidate = function() {
      return this.vertexBuffer._updateID++, this.uvBuffer._updateID++, this;
    }, e;
  }(Geometry)
), UID$2 = 0, UniformGroup = (
  /** @class */
  function() {
    function a(e, t, r) {
      this.group = !0, this.syncUniforms = {}, this.dirtyId = 0, this.id = UID$2++, this.static = !!t, this.ubo = !!r, e instanceof Buffer ? (this.buffer = e, this.buffer.type = BUFFER_TYPE.UNIFORM_BUFFER, this.autoManage = !1, this.ubo = !0) : (this.uniforms = e, this.ubo && (this.buffer = new Buffer(new Float32Array(1)), this.buffer.type = BUFFER_TYPE.UNIFORM_BUFFER, this.autoManage = !0));
    }
    return a.prototype.update = function() {
      this.dirtyId++, !this.autoManage && this.buffer && this.buffer.update();
    }, a.prototype.add = function(e, t, r) {
      if (!this.ubo)
        this.uniforms[e] = new a(t, r);
      else
        throw new Error("[UniformGroup] uniform groups in ubo mode cannot be modified, or have uniform groups nested in them");
    }, a.from = function(e, t, r) {
      return new a(e, t, r);
    }, a.uboFrom = function(e, t) {
      return new a(e, t ?? !0, !0);
    }, a;
  }()
), FilterState = (
  /** @class */
  function() {
    function a() {
      this.renderTexture = null, this.target = null, this.legacy = !1, this.resolution = 1, this.multisample = MSAA_QUALITY.NONE, this.sourceFrame = new Rectangle(), this.destinationFrame = new Rectangle(), this.bindingSourceFrame = new Rectangle(), this.bindingDestinationFrame = new Rectangle(), this.filters = [], this.transform = null;
    }
    return a.prototype.clear = function() {
      this.target = null, this.filters = null, this.renderTexture = null;
    }, a;
  }()
), tempPoints = [new Point(), new Point(), new Point(), new Point()], tempMatrix$2 = new Matrix(), FilterSystem = (
  /** @class */
  function() {
    function a(e) {
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
    return a.prototype.push = function(e, t) {
      for (var r, s, o = this.renderer, u = this.defaultFilterStack, h = this.statePool.pop() || new FilterState(), l = this.renderer.renderTexture, c = t[0].resolution, d = t[0].multisample, _ = t[0].padding, v = t[0].autoFit, y = (r = t[0].legacy) !== null && r !== void 0 ? r : !0, b = 1; b < t.length; b++) {
        var g = t[b];
        c = Math.min(c, g.resolution), d = Math.min(d, g.multisample), _ = this.useMaxPadding ? Math.max(_, g.padding) : _ + g.padding, v = v && g.autoFit, y = y || ((s = g.legacy) !== null && s !== void 0 ? s : !0);
      }
      u.length === 1 && (this.defaultFilterStack[0].renderTexture = l.current), u.push(h), h.resolution = c, h.multisample = d, h.legacy = y, h.target = e, h.sourceFrame.copyFrom(e.filterArea || e.getBounds(!0)), h.sourceFrame.pad(_);
      var m = this.tempRect.copyFrom(l.sourceFrame);
      o.projection.transform && this.transformAABB(tempMatrix$2.copyFrom(o.projection.transform).invert(), m), v ? (h.sourceFrame.fit(m), (h.sourceFrame.width <= 0 || h.sourceFrame.height <= 0) && (h.sourceFrame.width = 0, h.sourceFrame.height = 0)) : h.sourceFrame.intersects(m) || (h.sourceFrame.width = 0, h.sourceFrame.height = 0), this.roundFrame(h.sourceFrame, l.current ? l.current.resolution : o.resolution, l.sourceFrame, l.destinationFrame, o.projection.transform), h.renderTexture = this.getOptimalFilterTexture(h.sourceFrame.width, h.sourceFrame.height, c, d), h.filters = t, h.destinationFrame.width = h.renderTexture.width, h.destinationFrame.height = h.renderTexture.height;
      var E = this.tempRect;
      E.x = 0, E.y = 0, E.width = h.sourceFrame.width, E.height = h.sourceFrame.height, h.renderTexture.filterFrame = h.sourceFrame, h.bindingSourceFrame.copyFrom(l.sourceFrame), h.bindingDestinationFrame.copyFrom(l.destinationFrame), h.transform = o.projection.transform, o.projection.transform = null, l.bind(h.renderTexture, h.sourceFrame, E), o.framebuffer.clear(0, 0, 0, 0);
    }, a.prototype.pop = function() {
      var e = this.defaultFilterStack, t = e.pop(), r = t.filters;
      this.activeState = t;
      var s = this.globalUniforms.uniforms;
      s.outputFrame = t.sourceFrame, s.resolution = t.resolution;
      var o = s.inputSize, u = s.inputPixel, h = s.inputClamp;
      if (o[0] = t.destinationFrame.width, o[1] = t.destinationFrame.height, o[2] = 1 / o[0], o[3] = 1 / o[1], u[0] = Math.round(o[0] * t.resolution), u[1] = Math.round(o[1] * t.resolution), u[2] = 1 / u[0], u[3] = 1 / u[1], h[0] = 0.5 * u[2], h[1] = 0.5 * u[3], h[2] = t.sourceFrame.width * o[2] - 0.5 * u[2], h[3] = t.sourceFrame.height * o[3] - 0.5 * u[3], t.legacy) {
        var l = s.filterArea;
        l[0] = t.destinationFrame.width, l[1] = t.destinationFrame.height, l[2] = t.sourceFrame.x, l[3] = t.sourceFrame.y, s.filterClamp = s.inputClamp;
      }
      this.globalUniforms.update();
      var c = e[e.length - 1];
      if (this.renderer.framebuffer.blit(), r.length === 1)
        r[0].apply(this, t.renderTexture, c.renderTexture, CLEAR_MODES.BLEND, t), this.returnFilterTexture(t.renderTexture);
      else {
        var d = t.renderTexture, _ = this.getOptimalFilterTexture(d.width, d.height, t.resolution);
        _.filterFrame = d.filterFrame;
        var v = 0;
        for (v = 0; v < r.length - 1; ++v) {
          v === 1 && t.multisample > 1 && (_ = this.getOptimalFilterTexture(d.width, d.height, t.resolution), _.filterFrame = d.filterFrame), r[v].apply(this, d, _, CLEAR_MODES.CLEAR, t);
          var y = d;
          d = _, _ = y;
        }
        r[v].apply(this, d, c.renderTexture, CLEAR_MODES.BLEND, t), v > 1 && t.multisample > 1 && this.returnFilterTexture(t.renderTexture), this.returnFilterTexture(d), this.returnFilterTexture(_);
      }
      t.clear(), this.statePool.push(t);
    }, a.prototype.bindAndClear = function(e, t) {
      t === void 0 && (t = CLEAR_MODES.CLEAR);
      var r = this.renderer, s = r.renderTexture, o = r.state;
      if (e === this.defaultFilterStack[this.defaultFilterStack.length - 1].renderTexture ? this.renderer.projection.transform = this.activeState.transform : this.renderer.projection.transform = null, e && e.filterFrame) {
        var u = this.tempRect;
        u.x = 0, u.y = 0, u.width = e.filterFrame.width, u.height = e.filterFrame.height, s.bind(e, e.filterFrame, u);
      } else e !== this.defaultFilterStack[this.defaultFilterStack.length - 1].renderTexture ? s.bind(e) : this.renderer.renderTexture.bind(e, this.activeState.bindingSourceFrame, this.activeState.bindingDestinationFrame);
      var h = o.stateId & 1 || this.forceClear;
      (t === CLEAR_MODES.CLEAR || t === CLEAR_MODES.BLIT && h) && this.renderer.framebuffer.clear(0, 0, 0, 0);
    }, a.prototype.applyFilter = function(e, t, r, s) {
      var o = this.renderer;
      o.state.set(e.state), this.bindAndClear(r, s), e.uniforms.uSampler = t, e.uniforms.filterGlobals = this.globalUniforms, o.shader.bind(e), e.legacy = !!e.program.attributeData.aTextureCoord, e.legacy ? (this.quadUv.map(t._frame, t.filterFrame), o.geometry.bind(this.quadUv), o.geometry.draw(DRAW_MODES.TRIANGLES)) : (o.geometry.bind(this.quad), o.geometry.draw(DRAW_MODES.TRIANGLE_STRIP));
    }, a.prototype.calculateSpriteMatrix = function(e, t) {
      var r = this.activeState, s = r.sourceFrame, o = r.destinationFrame, u = t._texture.orig, h = e.set(o.width, 0, 0, o.height, s.x, s.y), l = t.worldTransform.copyTo(Matrix.TEMP_MATRIX);
      return l.invert(), h.prepend(l), h.scale(1 / u.width, 1 / u.height), h.translate(t.anchor.x, t.anchor.y), h;
    }, a.prototype.destroy = function() {
      this.renderer = null, this.texturePool.clear(!1);
    }, a.prototype.getOptimalFilterTexture = function(e, t, r, s) {
      return r === void 0 && (r = 1), s === void 0 && (s = MSAA_QUALITY.NONE), this.texturePool.getOptimalTexture(e, t, r, s);
    }, a.prototype.getFilterTexture = function(e, t, r) {
      if (typeof e == "number") {
        var s = e;
        e = t, t = s;
      }
      e = e || this.activeState.renderTexture;
      var o = this.texturePool.getOptimalTexture(e.width, e.height, t || e.resolution, r || MSAA_QUALITY.NONE);
      return o.filterFrame = e.filterFrame, o;
    }, a.prototype.returnFilterTexture = function(e) {
      this.texturePool.returnTexture(e);
    }, a.prototype.emptyPool = function() {
      this.texturePool.clear(!0);
    }, a.prototype.resize = function() {
      this.texturePool.setScreenSize(this.renderer.view);
    }, a.prototype.transformAABB = function(e, t) {
      var r = tempPoints[0], s = tempPoints[1], o = tempPoints[2], u = tempPoints[3];
      r.set(t.left, t.top), s.set(t.left, t.bottom), o.set(t.right, t.top), u.set(t.right, t.bottom), e.apply(r, r), e.apply(s, s), e.apply(o, o), e.apply(u, u);
      var h = Math.min(r.x, s.x, o.x, u.x), l = Math.min(r.y, s.y, o.y, u.y), c = Math.max(r.x, s.x, o.x, u.x), d = Math.max(r.y, s.y, o.y, u.y);
      t.x = h, t.y = l, t.width = c - h, t.height = d - l;
    }, a.prototype.roundFrame = function(e, t, r, s, o) {
      if (!(e.width <= 0 || e.height <= 0 || r.width <= 0 || r.height <= 0)) {
        if (o) {
          var u = o.a, h = o.b, l = o.c, c = o.d;
          if ((Math.abs(h) > 1e-4 || Math.abs(l) > 1e-4) && (Math.abs(u) > 1e-4 || Math.abs(c) > 1e-4))
            return;
        }
        o = o ? tempMatrix$2.copyFrom(o) : tempMatrix$2.identity(), o.translate(-r.x, -r.y).scale(s.width / r.width, s.height / r.height).translate(s.x, s.y), this.transformAABB(o, e), e.ceil(t), this.transformAABB(o.invert(), e);
      }
    }, a;
  }()
), ObjectRenderer = (
  /** @class */
  function() {
    function a(e) {
      this.renderer = e;
    }
    return a.prototype.flush = function() {
    }, a.prototype.destroy = function() {
      this.renderer = null;
    }, a.prototype.start = function() {
    }, a.prototype.stop = function() {
      this.flush();
    }, a.prototype.render = function(e) {
    }, a;
  }()
), BatchSystem = (
  /** @class */
  function() {
    function a(e) {
      this.renderer = e, this.emptyRenderer = new ObjectRenderer(e), this.currentRenderer = this.emptyRenderer;
    }
    return a.prototype.setObjectRenderer = function(e) {
      this.currentRenderer !== e && (this.currentRenderer.stop(), this.currentRenderer = e, this.currentRenderer.start());
    }, a.prototype.flush = function() {
      this.setObjectRenderer(this.emptyRenderer);
    }, a.prototype.reset = function() {
      this.setObjectRenderer(this.emptyRenderer);
    }, a.prototype.copyBoundTextures = function(e, t) {
      for (var r = this.renderer.texture.boundTextures, s = t - 1; s >= 0; --s)
        e[s] = r[s] || null, e[s] && (e[s]._batchLocation = s);
    }, a.prototype.boundArray = function(e, t, r, s) {
      for (var o = e.elements, u = e.ids, h = e.count, l = 0, c = 0; c < h; c++) {
        var d = o[c], _ = d._batchLocation;
        if (_ >= 0 && _ < s && t[_] === d) {
          u[c] = _;
          continue;
        }
        for (; l < s; ) {
          var v = t[l];
          if (v && v._batchEnabled === r && v._batchLocation === l) {
            l++;
            continue;
          }
          u[c] = l, d._batchLocation = l, t[l] = d;
          break;
        }
      }
    }, a.prototype.destroy = function() {
      this.renderer = null;
    }, a;
  }()
), CONTEXT_UID_COUNTER = 0, ContextSystem = (
  /** @class */
  function() {
    function a(e) {
      this.renderer = e, this.webGLVersion = 1, this.extensions = {}, this.supports = {
        uint32Indices: !1
      }, this.handleContextLost = this.handleContextLost.bind(this), this.handleContextRestored = this.handleContextRestored.bind(this), e.view.addEventListener("webglcontextlost", this.handleContextLost, !1), e.view.addEventListener("webglcontextrestored", this.handleContextRestored, !1);
    }
    return Object.defineProperty(a.prototype, "isLost", {
      /**
       * `true` if the context is lost
       * @readonly
       */
      get: function() {
        return !this.gl || this.gl.isContextLost();
      },
      enumerable: !1,
      configurable: !0
    }), a.prototype.contextChange = function(e) {
      this.gl = e, this.renderer.gl = e, this.renderer.CONTEXT_UID = CONTEXT_UID_COUNTER++;
    }, a.prototype.initFromContext = function(e) {
      this.gl = e, this.validateContext(e), this.renderer.gl = e, this.renderer.CONTEXT_UID = CONTEXT_UID_COUNTER++, this.renderer.runners.contextChange.emit(e);
    }, a.prototype.initFromOptions = function(e) {
      var t = this.createContext(this.renderer.view, e);
      this.initFromContext(t);
    }, a.prototype.createContext = function(e, t) {
      var r;
      if (settings.PREFER_ENV >= ENV.WEBGL2 && (r = e.getContext("webgl2", t)), r)
        this.webGLVersion = 2;
      else if (this.webGLVersion = 1, r = e.getContext("webgl", t) || e.getContext("experimental-webgl", t), !r)
        throw new Error("This browser does not support WebGL. Try using the canvas renderer");
      return this.gl = r, this.getExtensions(), this.gl;
    }, a.prototype.getExtensions = function() {
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
    }, a.prototype.handleContextLost = function(e) {
      var t = this;
      e.preventDefault(), setTimeout(function() {
        t.gl.isContextLost() && t.extensions.loseContext && t.extensions.loseContext.restoreContext();
      }, 0);
    }, a.prototype.handleContextRestored = function() {
      this.renderer.runners.contextChange.emit(this.gl);
    }, a.prototype.destroy = function() {
      var e = this.renderer.view;
      this.renderer = null, e.removeEventListener("webglcontextlost", this.handleContextLost), e.removeEventListener("webglcontextrestored", this.handleContextRestored), this.gl.useProgram(null), this.extensions.loseContext && this.extensions.loseContext.loseContext();
    }, a.prototype.postrender = function() {
      this.renderer.renderingToScreen && this.gl.flush();
    }, a.prototype.validateContext = function(e) {
      var t = e.getContextAttributes(), r = "WebGL2RenderingContext" in globalThis && e instanceof globalThis.WebGL2RenderingContext;
      r && (this.webGLVersion = 2), t && !t.stencil && console.warn("Provided WebGL context does not have a stencil buffer, masks may not render correctly");
      var s = r || !!e.getExtension("OES_element_index_uint");
      this.supports.uint32Indices = s, s || console.warn("Provided WebGL context does not support 32 index buffer, complex graphics may not render correctly");
    }, a;
  }()
), GLFramebuffer = (
  /** @class */
  /* @__PURE__ */ function() {
    function a(e) {
      this.framebuffer = e, this.stencil = null, this.dirtyId = -1, this.dirtyFormat = -1, this.dirtySize = -1, this.multisample = MSAA_QUALITY.NONE, this.msaaBuffer = null, this.blitFramebuffer = null, this.mipLevel = 0;
    }
    return a;
  }()
), tempRectangle = new Rectangle(), FramebufferSystem = (
  /** @class */
  function() {
    function a(e) {
      this.renderer = e, this.managedFramebuffers = [], this.unknownFramebuffer = new Framebuffer(10, 10), this.msaaSamples = null;
    }
    return a.prototype.contextChange = function() {
      this.disposeAll(!0);
      var e = this.gl = this.renderer.gl;
      if (this.CONTEXT_UID = this.renderer.CONTEXT_UID, this.current = this.unknownFramebuffer, this.viewport = new Rectangle(), this.hasMRT = !0, this.writeDepthTexture = !0, this.renderer.context.webGLVersion === 1) {
        var t = this.renderer.context.extensions.drawBuffers, r = this.renderer.context.extensions.depthTexture;
        settings.PREFER_ENV === ENV.WEBGL_LEGACY && (t = null, r = null), t ? e.drawBuffers = function(s) {
          return t.drawBuffersWEBGL(s);
        } : (this.hasMRT = !1, e.drawBuffers = function() {
        }), r || (this.writeDepthTexture = !1);
      } else
        this.msaaSamples = e.getInternalformatParameter(e.RENDERBUFFER, e.RGBA8, e.SAMPLES);
    }, a.prototype.bind = function(e, t, r) {
      r === void 0 && (r = 0);
      var s = this.gl;
      if (e) {
        var o = e.glFramebuffers[this.CONTEXT_UID] || this.initFramebuffer(e);
        this.current !== e && (this.current = e, s.bindFramebuffer(s.FRAMEBUFFER, o.framebuffer)), o.mipLevel !== r && (e.dirtyId++, e.dirtyFormat++, o.mipLevel = r), o.dirtyId !== e.dirtyId && (o.dirtyId = e.dirtyId, o.dirtyFormat !== e.dirtyFormat ? (o.dirtyFormat = e.dirtyFormat, o.dirtySize = e.dirtySize, this.updateFramebuffer(e, r)) : o.dirtySize !== e.dirtySize && (o.dirtySize = e.dirtySize, this.resizeFramebuffer(e)));
        for (var u = 0; u < e.colorTextures.length; u++) {
          var h = e.colorTextures[u];
          this.renderer.texture.unbind(h.parentTextureArray || h);
        }
        if (e.depthTexture && this.renderer.texture.unbind(e.depthTexture), t) {
          var l = t.width >> r, c = t.height >> r, d = l / t.width;
          this.setViewport(t.x * d, t.y * d, l, c);
        } else {
          var l = e.width >> r, c = e.height >> r;
          this.setViewport(0, 0, l, c);
        }
      } else
        this.current && (this.current = null, s.bindFramebuffer(s.FRAMEBUFFER, null)), t ? this.setViewport(t.x, t.y, t.width, t.height) : this.setViewport(0, 0, this.renderer.width, this.renderer.height);
    }, a.prototype.setViewport = function(e, t, r, s) {
      var o = this.viewport;
      e = Math.round(e), t = Math.round(t), r = Math.round(r), s = Math.round(s), (o.width !== r || o.height !== s || o.x !== e || o.y !== t) && (o.x = e, o.y = t, o.width = r, o.height = s, this.gl.viewport(e, t, r, s));
    }, Object.defineProperty(a.prototype, "size", {
      /**
       * Get the size of the current width and height. Returns object with `width` and `height` values.
       * @readonly
       */
      get: function() {
        return this.current ? { x: 0, y: 0, width: this.current.width, height: this.current.height } : { x: 0, y: 0, width: this.renderer.width, height: this.renderer.height };
      },
      enumerable: !1,
      configurable: !0
    }), a.prototype.clear = function(e, t, r, s, o) {
      o === void 0 && (o = BUFFER_BITS.COLOR | BUFFER_BITS.DEPTH);
      var u = this.gl;
      u.clearColor(e, t, r, s), u.clear(o);
    }, a.prototype.initFramebuffer = function(e) {
      var t = this.gl, r = new GLFramebuffer(t.createFramebuffer());
      return r.multisample = this.detectSamples(e.multisample), e.glFramebuffers[this.CONTEXT_UID] = r, this.managedFramebuffers.push(e), e.disposeRunner.add(this), r;
    }, a.prototype.resizeFramebuffer = function(e) {
      var t = this.gl, r = e.glFramebuffers[this.CONTEXT_UID];
      r.msaaBuffer && (t.bindRenderbuffer(t.RENDERBUFFER, r.msaaBuffer), t.renderbufferStorageMultisample(t.RENDERBUFFER, r.multisample, t.RGBA8, e.width, e.height)), r.stencil && (t.bindRenderbuffer(t.RENDERBUFFER, r.stencil), r.msaaBuffer ? t.renderbufferStorageMultisample(t.RENDERBUFFER, r.multisample, t.DEPTH24_STENCIL8, e.width, e.height) : t.renderbufferStorage(t.RENDERBUFFER, t.DEPTH_STENCIL, e.width, e.height));
      var s = e.colorTextures, o = s.length;
      t.drawBuffers || (o = Math.min(o, 1));
      for (var u = 0; u < o; u++) {
        var h = s[u], l = h.parentTextureArray || h;
        this.renderer.texture.bind(l, 0);
      }
      e.depthTexture && this.writeDepthTexture && this.renderer.texture.bind(e.depthTexture, 0);
    }, a.prototype.updateFramebuffer = function(e, t) {
      var r = this.gl, s = e.glFramebuffers[this.CONTEXT_UID], o = e.colorTextures, u = o.length;
      r.drawBuffers || (u = Math.min(u, 1)), s.multisample > 1 && this.canMultisampleFramebuffer(e) ? (s.msaaBuffer = s.msaaBuffer || r.createRenderbuffer(), r.bindRenderbuffer(r.RENDERBUFFER, s.msaaBuffer), r.renderbufferStorageMultisample(r.RENDERBUFFER, s.multisample, r.RGBA8, e.width, e.height), r.framebufferRenderbuffer(r.FRAMEBUFFER, r.COLOR_ATTACHMENT0, r.RENDERBUFFER, s.msaaBuffer)) : s.msaaBuffer && (r.deleteRenderbuffer(s.msaaBuffer), s.msaaBuffer = null, s.blitFramebuffer && (s.blitFramebuffer.dispose(), s.blitFramebuffer = null));
      for (var h = [], l = 0; l < u; l++) {
        var c = o[l], d = c.parentTextureArray || c;
        this.renderer.texture.bind(d, 0), !(l === 0 && s.msaaBuffer) && (r.framebufferTexture2D(r.FRAMEBUFFER, r.COLOR_ATTACHMENT0 + l, c.target, d._glTextures[this.CONTEXT_UID].texture, t), h.push(r.COLOR_ATTACHMENT0 + l));
      }
      if (h.length > 1 && r.drawBuffers(h), e.depthTexture) {
        var _ = this.writeDepthTexture;
        if (_) {
          var v = e.depthTexture;
          this.renderer.texture.bind(v, 0), r.framebufferTexture2D(r.FRAMEBUFFER, r.DEPTH_ATTACHMENT, r.TEXTURE_2D, v._glTextures[this.CONTEXT_UID].texture, t);
        }
      }
      (e.stencil || e.depth) && !(e.depthTexture && this.writeDepthTexture) ? (s.stencil = s.stencil || r.createRenderbuffer(), r.bindRenderbuffer(r.RENDERBUFFER, s.stencil), s.msaaBuffer ? r.renderbufferStorageMultisample(r.RENDERBUFFER, s.multisample, r.DEPTH24_STENCIL8, e.width, e.height) : r.renderbufferStorage(r.RENDERBUFFER, r.DEPTH_STENCIL, e.width, e.height), r.framebufferRenderbuffer(r.FRAMEBUFFER, r.DEPTH_STENCIL_ATTACHMENT, r.RENDERBUFFER, s.stencil)) : s.stencil && (r.deleteRenderbuffer(s.stencil), s.stencil = null);
    }, a.prototype.canMultisampleFramebuffer = function(e) {
      return this.renderer.context.webGLVersion !== 1 && e.colorTextures.length <= 1 && !e.depthTexture;
    }, a.prototype.detectSamples = function(e) {
      var t = this.msaaSamples, r = MSAA_QUALITY.NONE;
      if (e <= 1 || t === null)
        return r;
      for (var s = 0; s < t.length; s++)
        if (t[s] <= e) {
          r = t[s];
          break;
        }
      return r === 1 && (r = MSAA_QUALITY.NONE), r;
    }, a.prototype.blit = function(e, t, r) {
      var s = this, o = s.current, u = s.renderer, h = s.gl, l = s.CONTEXT_UID;
      if (u.context.webGLVersion === 2 && o) {
        var c = o.glFramebuffers[l];
        if (c) {
          if (!e) {
            if (!c.msaaBuffer)
              return;
            var d = o.colorTextures[0];
            if (!d)
              return;
            c.blitFramebuffer || (c.blitFramebuffer = new Framebuffer(o.width, o.height), c.blitFramebuffer.addColorTexture(0, d)), e = c.blitFramebuffer, e.colorTextures[0] !== d && (e.colorTextures[0] = d, e.dirtyId++, e.dirtyFormat++), (e.width !== o.width || e.height !== o.height) && (e.width = o.width, e.height = o.height, e.dirtyId++, e.dirtySize++);
          }
          t || (t = tempRectangle, t.width = o.width, t.height = o.height), r || (r = t);
          var _ = t.width === r.width && t.height === r.height;
          this.bind(e), h.bindFramebuffer(h.READ_FRAMEBUFFER, c.framebuffer), h.blitFramebuffer(t.left, t.top, t.right, t.bottom, r.left, r.top, r.right, r.bottom, h.COLOR_BUFFER_BIT, _ ? h.NEAREST : h.LINEAR);
        }
      }
    }, a.prototype.disposeFramebuffer = function(e, t) {
      var r = e.glFramebuffers[this.CONTEXT_UID], s = this.gl;
      if (r) {
        delete e.glFramebuffers[this.CONTEXT_UID];
        var o = this.managedFramebuffers.indexOf(e);
        o >= 0 && this.managedFramebuffers.splice(o, 1), e.disposeRunner.remove(this), t || (s.deleteFramebuffer(r.framebuffer), r.msaaBuffer && s.deleteRenderbuffer(r.msaaBuffer), r.stencil && s.deleteRenderbuffer(r.stencil)), r.blitFramebuffer && r.blitFramebuffer.dispose();
      }
    }, a.prototype.disposeAll = function(e) {
      var t = this.managedFramebuffers;
      this.managedFramebuffers = [];
      for (var r = 0; r < t.length; r++)
        this.disposeFramebuffer(t[r], e);
    }, a.prototype.forceStencil = function() {
      var e = this.current;
      if (e) {
        var t = e.glFramebuffers[this.CONTEXT_UID];
        if (!(!t || t.stencil)) {
          e.stencil = !0;
          var r = e.width, s = e.height, o = this.gl, u = o.createRenderbuffer();
          o.bindRenderbuffer(o.RENDERBUFFER, u), t.msaaBuffer ? o.renderbufferStorageMultisample(o.RENDERBUFFER, t.multisample, o.DEPTH24_STENCIL8, r, s) : o.renderbufferStorage(o.RENDERBUFFER, o.DEPTH_STENCIL, r, s), t.stencil = u, o.framebufferRenderbuffer(o.FRAMEBUFFER, o.DEPTH_STENCIL_ATTACHMENT, o.RENDERBUFFER, u);
        }
      }
    }, a.prototype.reset = function() {
      this.current = this.unknownFramebuffer, this.viewport = new Rectangle();
    }, a.prototype.destroy = function() {
      this.renderer = null;
    }, a;
  }()
), byteSizeMap = { 5126: 4, 5123: 2, 5121: 1 }, GeometrySystem = (
  /** @class */
  function() {
    function a(e) {
      this.renderer = e, this._activeGeometry = null, this._activeVao = null, this.hasVao = !0, this.hasInstance = !0, this.canUseUInt32ElementIndex = !1, this.managedGeometries = {};
    }
    return a.prototype.contextChange = function() {
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
        var s = e.getExtension("ANGLE_instanced_arrays");
        s ? (e.vertexAttribDivisor = function(o, u) {
          return s.vertexAttribDivisorANGLE(o, u);
        }, e.drawElementsInstanced = function(o, u, h, l, c) {
          return s.drawElementsInstancedANGLE(o, u, h, l, c);
        }, e.drawArraysInstanced = function(o, u, h, l) {
          return s.drawArraysInstancedANGLE(o, u, h, l);
        }) : this.hasInstance = !1;
      }
      this.canUseUInt32ElementIndex = t.webGLVersion === 2 || !!t.extensions.uint32ElementIndex;
    }, a.prototype.bind = function(e, t) {
      t = t || this.renderer.shader.shader;
      var r = this.gl, s = e.glVertexArrayObjects[this.CONTEXT_UID], o = !1;
      s || (this.managedGeometries[e.id] = e, e.disposeRunner.add(this), e.glVertexArrayObjects[this.CONTEXT_UID] = s = {}, o = !0);
      var u = s[t.program.id] || this.initGeometryVao(e, t, o);
      this._activeGeometry = e, this._activeVao !== u && (this._activeVao = u, this.hasVao ? r.bindVertexArray(u) : this.activateVao(e, t.program)), this.updateBuffers();
    }, a.prototype.reset = function() {
      this.unbind();
    }, a.prototype.updateBuffers = function() {
      for (var e = this._activeGeometry, t = this.renderer.buffer, r = 0; r < e.buffers.length; r++) {
        var s = e.buffers[r];
        t.update(s);
      }
    }, a.prototype.checkCompatibility = function(e, t) {
      var r = e.attributes, s = t.attributeData;
      for (var o in s)
        if (!r[o])
          throw new Error('shader and geometry incompatible, geometry missing the "' + o + '" attribute');
    }, a.prototype.getSignature = function(e, t) {
      var r = e.attributes, s = t.attributeData, o = ["g", e.id];
      for (var u in r)
        s[u] && o.push(u, s[u].location);
      return o.join("-");
    }, a.prototype.initGeometryVao = function(e, t, r) {
      r === void 0 && (r = !0);
      var s = this.gl, o = this.CONTEXT_UID, u = this.renderer.buffer, h = t.program;
      h.glPrograms[o] || this.renderer.shader.generateProgram(t), this.checkCompatibility(e, h);
      var l = this.getSignature(e, h), c = e.glVertexArrayObjects[this.CONTEXT_UID], d = c[l];
      if (d)
        return c[h.id] = d, d;
      var _ = e.buffers, v = e.attributes, y = {}, b = {};
      for (var g in _)
        y[g] = 0, b[g] = 0;
      for (var g in v)
        !v[g].size && h.attributeData[g] ? v[g].size = h.attributeData[g].size : v[g].size || console.warn("PIXI Geometry attribute '" + g + "' size cannot be determined (likely the bound shader does not have the attribute)"), y[v[g].buffer] += v[g].size * byteSizeMap[v[g].type];
      for (var g in v) {
        var m = v[g], E = m.size;
        m.stride === void 0 && (y[m.buffer] === E * byteSizeMap[m.type] ? m.stride = 0 : m.stride = y[m.buffer]), m.start === void 0 && (m.start = b[m.buffer], b[m.buffer] += E * byteSizeMap[m.type]);
      }
      d = s.createVertexArray(), s.bindVertexArray(d);
      for (var S = 0; S < _.length; S++) {
        var P = _[S];
        u.bind(P), r && P._glBuffers[o].refCount++;
      }
      return this.activateVao(e, h), this._activeVao = d, c[h.id] = d, c[l] = d, d;
    }, a.prototype.disposeGeometry = function(e, t) {
      var r;
      if (this.managedGeometries[e.id]) {
        delete this.managedGeometries[e.id];
        var s = e.glVertexArrayObjects[this.CONTEXT_UID], o = this.gl, u = e.buffers, h = (r = this.renderer) === null || r === void 0 ? void 0 : r.buffer;
        if (e.disposeRunner.remove(this), !!s) {
          if (h)
            for (var l = 0; l < u.length; l++) {
              var c = u[l]._glBuffers[this.CONTEXT_UID];
              c && (c.refCount--, c.refCount === 0 && !t && h.dispose(u[l], t));
            }
          if (!t) {
            for (var d in s)
              if (d[0] === "g") {
                var _ = s[d];
                this._activeVao === _ && this.unbind(), o.deleteVertexArray(_);
              }
          }
          delete e.glVertexArrayObjects[this.CONTEXT_UID];
        }
      }
    }, a.prototype.disposeAll = function(e) {
      for (var t = Object.keys(this.managedGeometries), r = 0; r < t.length; r++)
        this.disposeGeometry(this.managedGeometries[t[r]], e);
    }, a.prototype.activateVao = function(e, t) {
      var r = this.gl, s = this.CONTEXT_UID, o = this.renderer.buffer, u = e.buffers, h = e.attributes;
      e.indexBuffer && o.bind(e.indexBuffer);
      var l = null;
      for (var c in h) {
        var d = h[c], _ = u[d.buffer], v = _._glBuffers[s];
        if (t.attributeData[c]) {
          l !== v && (o.bind(_), l = v);
          var y = t.attributeData[c].location;
          if (r.enableVertexAttribArray(y), r.vertexAttribPointer(y, d.size, d.type || r.FLOAT, d.normalized, d.stride, d.start), d.instance)
            if (this.hasInstance)
              r.vertexAttribDivisor(y, 1);
            else
              throw new Error("geometry error, GPU Instancing is not supported on this device");
        }
      }
    }, a.prototype.draw = function(e, t, r, s) {
      var o = this.gl, u = this._activeGeometry;
      if (u.indexBuffer) {
        var h = u.indexBuffer.data.BYTES_PER_ELEMENT, l = h === 2 ? o.UNSIGNED_SHORT : o.UNSIGNED_INT;
        h === 2 || h === 4 && this.canUseUInt32ElementIndex ? u.instanced ? o.drawElementsInstanced(e, t || u.indexBuffer.data.length, l, (r || 0) * h, s || 1) : o.drawElements(e, t || u.indexBuffer.data.length, l, (r || 0) * h) : console.warn("unsupported index buffer type: uint32");
      } else u.instanced ? o.drawArraysInstanced(e, r, t || u.getSize(), s || 1) : o.drawArrays(e, r, t || u.getSize());
      return this;
    }, a.prototype.unbind = function() {
      this.gl.bindVertexArray(null), this._activeVao = null, this._activeGeometry = null;
    }, a.prototype.destroy = function() {
      this.renderer = null;
    }, a;
  }()
), MaskData = (
  /** @class */
  function() {
    function a(e) {
      e === void 0 && (e = null), this.type = MASK_TYPES.NONE, this.autoDetect = !0, this.maskObject = e || null, this.pooled = !1, this.isMaskData = !0, this.resolution = null, this.multisample = settings.FILTER_MULTISAMPLE, this.enabled = !0, this.colorMask = 15, this._filters = null, this._stencilCounter = 0, this._scissorCounter = 0, this._scissorRect = null, this._scissorRectLocal = null, this._colorMask = 15, this._target = null;
    }
    return Object.defineProperty(a.prototype, "filter", {
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
    }), a.prototype.reset = function() {
      this.pooled && (this.maskObject = null, this.type = MASK_TYPES.NONE, this.autoDetect = !0), this._target = null, this._scissorRectLocal = null;
    }, a.prototype.copyCountersOrReset = function(e) {
      e ? (this._stencilCounter = e._stencilCounter, this._scissorCounter = e._scissorCounter, this._scissorRect = e._scissorRect) : (this._stencilCounter = 0, this._scissorCounter = 0, this._scissorRect = null);
    }, a;
  }()
);
function compileShader(a, e, t) {
  var r = a.createShader(e);
  return a.shaderSource(r, t), a.compileShader(r), r;
}
function logPrettyShaderError(a, e) {
  var t = a.getShaderSource(e).split(`
`).map(function(c, d) {
    return d + ": " + c;
  }), r = a.getShaderInfoLog(e), s = r.split(`
`), o = {}, u = s.map(function(c) {
    return parseFloat(c.replace(/^ERROR\: 0\:([\d]+)\:.*$/, "$1"));
  }).filter(function(c) {
    return c && !o[c] ? (o[c] = !0, !0) : !1;
  }), h = [""];
  u.forEach(function(c) {
    t[c - 1] = "%c" + t[c - 1] + "%c", h.push("background: #FF0000; color:#FFFFFF; font-size: 10px", "font-size: 10px");
  });
  var l = t.join(`
`);
  h[0] = l, console.error(r), console.groupCollapsed("click to view full shader code"), console.warn.apply(console, h), console.groupEnd();
}
function logProgramError(a, e, t, r) {
  a.getProgramParameter(e, a.LINK_STATUS) || (a.getShaderParameter(t, a.COMPILE_STATUS) || logPrettyShaderError(a, t), a.getShaderParameter(r, a.COMPILE_STATUS) || logPrettyShaderError(a, r), console.error("PixiJS Error: Could not initialize shader."), a.getProgramInfoLog(e) !== "" && console.warn("PixiJS Warning: gl.getProgramInfoLog()", a.getProgramInfoLog(e)));
}
function booleanArray(a) {
  for (var e = new Array(a), t = 0; t < e.length; t++)
    e[t] = !1;
  return e;
}
function defaultValue(a, e) {
  switch (a) {
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
    var a = settings.ADAPTER.createCanvas(), e = void 0;
    settings.PREFER_ENV >= ENV.WEBGL2 && (e = a.getContext("webgl2", {})), e || (e = a.getContext("webgl", {}) || a.getContext("experimental-webgl", {}), e ? e.getExtension("WEBGL_draw_buffers") : e = null), context = e;
  }
  return context;
}
var maxFragmentPrecision;
function getMaxFragmentPrecision() {
  if (!maxFragmentPrecision) {
    maxFragmentPrecision = PRECISION.MEDIUM;
    var a = getTestContext();
    if (a && a.getShaderPrecisionFormat) {
      var e = a.getShaderPrecisionFormat(a.FRAGMENT_SHADER, a.HIGH_FLOAT);
      maxFragmentPrecision = e.precision ? PRECISION.HIGH : PRECISION.MEDIUM;
    }
  }
  return maxFragmentPrecision;
}
function setPrecision(a, e, t) {
  if (a.substring(0, 9) !== "precision") {
    var r = e;
    return e === PRECISION.HIGH && t !== PRECISION.HIGH && (r = PRECISION.MEDIUM), "precision " + r + ` float;
` + a;
  } else if (t !== PRECISION.HIGH && a.substring(0, 15) === "precision highp")
    return a.replace("precision highp", "precision mediump");
  return a;
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
function mapSize(a) {
  return GLSL_TO_SIZE[a];
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
function mapType(a, e) {
  if (!GL_TABLE) {
    var t = Object.keys(GL_TO_GLSL_TYPES);
    GL_TABLE = {};
    for (var r = 0; r < t.length; ++r) {
      var s = t[r];
      GL_TABLE[a[s]] = GL_TO_GLSL_TYPES[s];
    }
  }
  return GL_TABLE[e];
}
var uniformParsers = [
  // a float cache layer
  {
    test: function(a) {
      return a.type === "float" && a.size === 1 && !a.isArray;
    },
    code: function(a) {
      return `
            if(uv["` + a + '"] !== ud["' + a + `"].value)
            {
                ud["` + a + '"].value = uv["' + a + `"]
                gl.uniform1f(ud["` + a + '"].location, uv["' + a + `"])
            }
            `;
    }
  },
  // handling samplers
  {
    test: function(a, e) {
      return (a.type === "sampler2D" || a.type === "samplerCube" || a.type === "sampler2DArray") && a.size === 1 && !a.isArray && (e == null || e.castToBaseTexture !== void 0);
    },
    code: function(a) {
      return `t = syncData.textureCount++;

            renderer.texture.bind(uv["` + a + `"], t);

            if(ud["` + a + `"].value !== t)
            {
                ud["` + a + `"].value = t;
                gl.uniform1i(ud["` + a + `"].location, t);
; // eslint-disable-line max-len
            }`;
    }
  },
  // uploading pixi matrix object to mat3
  {
    test: function(a, e) {
      return a.type === "mat3" && a.size === 1 && !a.isArray && e.a !== void 0;
    },
    code: function(a) {
      return `
            gl.uniformMatrix3fv(ud["` + a + '"].location, false, uv["' + a + `"].toArray(true));
            `;
    },
    codeUbo: function(a) {
      return `
                var ` + a + "_matrix = uv." + a + `.toArray(true);

                data[offset] = ` + a + `_matrix[0];
                data[offset+1] = ` + a + `_matrix[1];
                data[offset+2] = ` + a + `_matrix[2];
        
                data[offset + 4] = ` + a + `_matrix[3];
                data[offset + 5] = ` + a + `_matrix[4];
                data[offset + 6] = ` + a + `_matrix[5];
        
                data[offset + 8] = ` + a + `_matrix[6];
                data[offset + 9] = ` + a + `_matrix[7];
                data[offset + 10] = ` + a + `_matrix[8];
            `;
    }
  },
  // uploading a pixi point as a vec2 with caching layer
  {
    test: function(a, e) {
      return a.type === "vec2" && a.size === 1 && !a.isArray && e.x !== void 0;
    },
    code: function(a) {
      return `
                cv = ud["` + a + `"].value;
                v = uv["` + a + `"];

                if(cv[0] !== v.x || cv[1] !== v.y)
                {
                    cv[0] = v.x;
                    cv[1] = v.y;
                    gl.uniform2f(ud["` + a + `"].location, v.x, v.y);
                }`;
    },
    codeUbo: function(a) {
      return `
                v = uv.` + a + `;

                data[offset] = v.x;
                data[offset+1] = v.y;
            `;
    }
  },
  // caching layer for a vec2
  {
    test: function(a) {
      return a.type === "vec2" && a.size === 1 && !a.isArray;
    },
    code: function(a) {
      return `
                cv = ud["` + a + `"].value;
                v = uv["` + a + `"];

                if(cv[0] !== v[0] || cv[1] !== v[1])
                {
                    cv[0] = v[0];
                    cv[1] = v[1];
                    gl.uniform2f(ud["` + a + `"].location, v[0], v[1]);
                }
            `;
    }
  },
  // upload a pixi rectangle as a vec4 with caching layer
  {
    test: function(a, e) {
      return a.type === "vec4" && a.size === 1 && !a.isArray && e.width !== void 0;
    },
    code: function(a) {
      return `
                cv = ud["` + a + `"].value;
                v = uv["` + a + `"];

                if(cv[0] !== v.x || cv[1] !== v.y || cv[2] !== v.width || cv[3] !== v.height)
                {
                    cv[0] = v.x;
                    cv[1] = v.y;
                    cv[2] = v.width;
                    cv[3] = v.height;
                    gl.uniform4f(ud["` + a + `"].location, v.x, v.y, v.width, v.height)
                }`;
    },
    codeUbo: function(a) {
      return `
                    v = uv.` + a + `;

                    data[offset] = v.x;
                    data[offset+1] = v.y;
                    data[offset+2] = v.width;
                    data[offset+3] = v.height;
                `;
    }
  },
  // a caching layer for vec4 uploading
  {
    test: function(a) {
      return a.type === "vec4" && a.size === 1 && !a.isArray;
    },
    code: function(a) {
      return `
                cv = ud["` + a + `"].value;
                v = uv["` + a + `"];

                if(cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])
                {
                    cv[0] = v[0];
                    cv[1] = v[1];
                    cv[2] = v[2];
                    cv[3] = v[3];

                    gl.uniform4f(ud["` + a + `"].location, v[0], v[1], v[2], v[3])
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
function generateUniformsSync(a, e) {
  var t, r = [`
        var v = null;
        var cv = null;
        var cu = null;
        var t = 0;
        var gl = renderer.gl;
    `];
  for (var s in a.uniforms) {
    var o = e[s];
    if (!o) {
      !((t = a.uniforms[s]) === null || t === void 0) && t.group && (a.uniforms[s].ubo ? r.push(`
                        renderer.shader.syncUniformBufferGroup(uv.` + s + ", '" + s + `');
                    `) : r.push(`
                        renderer.shader.syncUniformGroup(uv.` + s + `, syncData);
                    `));
      continue;
    }
    for (var u = a.uniforms[s], h = !1, l = 0; l < uniformParsers.length; l++)
      if (uniformParsers[l].test(o, u)) {
        r.push(uniformParsers[l].code(s, u)), h = !0;
        break;
      }
    if (!h) {
      var c = o.size === 1 && !o.isArray ? GLSL_TO_SINGLE_SETTERS_CACHED : GLSL_TO_ARRAY_SETTERS, d = c[o.type].replace("location", 'ud["' + s + '"].location');
      r.push(`
            cu = ud["` + s + `"];
            cv = cu.value;
            v = uv["` + s + `"];
            ` + d + ";");
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
function generateIfTestSrc(a) {
  for (var e = "", t = 0; t < a; ++t)
    t > 0 && (e += `
else `), t < a - 1 && (e += "if(test == " + t + ".0){}");
  return e;
}
function checkMaxIfStatementsInShader(a, e) {
  if (a === 0)
    throw new Error("Invalid value of `0` passed to `checkMaxIfStatementsInShader`");
  for (var t = e.createShader(e.FRAGMENT_SHADER); ; ) {
    var r = fragTemplate$1.replace(/%forloop%/gi, generateIfTestSrc(a));
    if (e.shaderSource(t, r), e.compileShader(t), !e.getShaderParameter(t, e.COMPILE_STATUS))
      a = a / 2 | 0;
    else
      break;
  }
  return a;
}
var unsafeEval;
function unsafeEvalSupported() {
  if (typeof unsafeEval == "boolean")
    return unsafeEval;
  try {
    var a = new Function("param1", "param2", "param3", "return param1[param2] === param3;");
    unsafeEval = a({ a: "b" }, "a", "b") === !0;
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
    function a(e, t, r) {
      r === void 0 && (r = "pixi-shader"), this.id = UID$1++, this.vertexSrc = e || a.defaultVertexSrc, this.fragmentSrc = t || a.defaultFragmentSrc, this.vertexSrc = this.vertexSrc.trim(), this.fragmentSrc = this.fragmentSrc.trim(), this.vertexSrc.substring(0, 8) !== "#version" && (r = r.replace(/\s+/g, "-"), nameCache[r] ? (nameCache[r]++, r += "-" + nameCache[r]) : nameCache[r] = 1, this.vertexSrc = "#define SHADER_NAME " + r + `
` + this.vertexSrc, this.fragmentSrc = "#define SHADER_NAME " + r + `
` + this.fragmentSrc, this.vertexSrc = setPrecision(this.vertexSrc, settings.PRECISION_VERTEX, PRECISION.HIGH), this.fragmentSrc = setPrecision(this.fragmentSrc, settings.PRECISION_FRAGMENT, getMaxFragmentPrecision())), this.glPrograms = {}, this.syncUniforms = null;
    }
    return Object.defineProperty(a, "defaultVertexSrc", {
      /**
       * The default vertex shader source.
       * @constant
       */
      get: function() {
        return defaultVertex$3;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(a, "defaultFragmentSrc", {
      /**
       * The default fragment shader source.
       * @constant
       */
      get: function() {
        return defaultFragment$2;
      },
      enumerable: !1,
      configurable: !0
    }), a.from = function(e, t, r) {
      var s = e + t, o = ProgramCache[s];
      return o || (ProgramCache[s] = o = new a(e, t, r)), o;
    }, a;
  }()
), Shader = (
  /** @class */
  function() {
    function a(e, t) {
      this.uniformBindCount = 0, this.program = e, t ? t instanceof UniformGroup ? this.uniformGroup = t : this.uniformGroup = new UniformGroup(t) : this.uniformGroup = new UniformGroup({}), this.disposeRunner = new Runner("disposeShader");
    }
    return a.prototype.checkUniformExists = function(e, t) {
      if (t.uniforms[e])
        return !0;
      for (var r in t.uniforms) {
        var s = t.uniforms[r];
        if (s.group && this.checkUniformExists(e, s))
          return !0;
      }
      return !1;
    }, a.prototype.destroy = function() {
      this.uniformGroup = null, this.disposeRunner.emit(this), this.disposeRunner.destroy();
    }, Object.defineProperty(a.prototype, "uniforms", {
      /**
       * Shader uniform values, shortcut for `uniformGroup.uniforms`.
       * @readonly
       */
      get: function() {
        return this.uniformGroup.uniforms;
      },
      enumerable: !1,
      configurable: !0
    }), a.from = function(e, t, r) {
      var s = Program.from(e, t);
      return new a(s, r);
    }, a;
  }()
), BLEND$1 = 0, OFFSET$1 = 1, CULLING$1 = 2, DEPTH_TEST$1 = 3, WINDING$1 = 4, DEPTH_MASK$1 = 5, State = (
  /** @class */
  function() {
    function a() {
      this.data = 0, this.blendMode = BLEND_MODES.NORMAL, this.polygonOffset = 0, this.blend = !0, this.depthMask = !0;
    }
    return Object.defineProperty(a.prototype, "blend", {
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
    }), Object.defineProperty(a.prototype, "offsets", {
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
    }), Object.defineProperty(a.prototype, "culling", {
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
    }), Object.defineProperty(a.prototype, "depthTest", {
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
    }), Object.defineProperty(a.prototype, "depthMask", {
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
    }), Object.defineProperty(a.prototype, "clockwiseFrontFace", {
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
    }), Object.defineProperty(a.prototype, "blendMode", {
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
    }), Object.defineProperty(a.prototype, "polygonOffset", {
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
    }), a.prototype.toString = function() {
      return "[@pixi/core:State " + ("blendMode=" + this.blendMode + " ") + ("clockwiseFrontFace=" + this.clockwiseFrontFace + " ") + ("culling=" + this.culling + " ") + ("depthMask=" + this.depthMask + " ") + ("polygonOffset=" + this.polygonOffset) + "]";
    }, a.for2d = function() {
      var e = new a();
      return e.depthTest = !1, e.blend = !0, e;
    }, a;
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
  function(a) {
    __extends$i(e, a);
    function e(t, r, s) {
      var o = this, u = Program.from(t || e.defaultVertexSrc, r || e.defaultFragmentSrc);
      return o = a.call(this, u, s) || this, o.padding = 0, o.resolution = settings.FILTER_RESOLUTION, o.multisample = settings.FILTER_MULTISAMPLE, o.enabled = !0, o.autoFit = !0, o.state = new State(), o;
    }
    return e.prototype.apply = function(t, r, s, o, u) {
      t.applyFilter(this, r, s, o);
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
    function a(e, t) {
      this._texture = e, this.mapCoord = new Matrix(), this.uClampFrame = new Float32Array(4), this.uClampOffset = new Float32Array(2), this._textureID = -1, this._updateID = 0, this.clampOffset = 0, this.clampMargin = typeof t > "u" ? 0.5 : t, this.isSimple = !1;
    }
    return Object.defineProperty(a.prototype, "texture", {
      /** Texture property. */
      get: function() {
        return this._texture;
      },
      set: function(e) {
        this._texture = e, this._textureID = -1;
      },
      enumerable: !1,
      configurable: !0
    }), a.prototype.multiplyUvs = function(e, t) {
      t === void 0 && (t = e);
      for (var r = this.mapCoord, s = 0; s < e.length; s += 2) {
        var o = e[s], u = e[s + 1];
        t[s] = o * r.a + u * r.c + r.tx, t[s + 1] = o * r.b + u * r.d + r.ty;
      }
      return t;
    }, a.prototype.update = function(e) {
      var t = this._texture;
      if (!t || !t.valid || !e && this._textureID === t._updateID)
        return !1;
      this._textureID = t._updateID, this._updateID++;
      var r = t._uvs;
      this.mapCoord.set(r.x1 - r.x0, r.y1 - r.y0, r.x3 - r.x0, r.y3 - r.y0, r.x0, r.y0);
      var s = t.orig, o = t.trim;
      o && (tempMat$1.set(s.width / o.width, 0, 0, s.height / o.height, -o.x / o.width, -o.y / o.height), this.mapCoord.append(tempMat$1));
      var u = t.baseTexture, h = this.uClampFrame, l = this.clampMargin / u.resolution, c = this.clampOffset;
      return h[0] = (t._frame.x + l + c) / u.width, h[1] = (t._frame.y + l + c) / u.height, h[2] = (t._frame.x + t._frame.width - l + c) / u.width, h[3] = (t._frame.y + t._frame.height - l + c) / u.height, this.uClampOffset[0] = c / u.realWidth, this.uClampOffset[1] = c / u.realHeight, this.isSimple = t._frame.width === u.width && t._frame.height === u.height && t.rotate === 0, !0;
    }, a;
  }()
), SpriteMaskFilter = (
  /** @class */
  function(a) {
    __extends$i(e, a);
    function e(t, r, s) {
      var o = this, u = null;
      return typeof t != "string" && r === void 0 && s === void 0 && (u = t, t = void 0, r = void 0, s = void 0), o = a.call(this, t || vertex$4, r || fragment$7, s) || this, o.maskSprite = u, o.maskMatrix = new Matrix(), o;
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
    }), e.prototype.apply = function(t, r, s, o) {
      var u = this._maskSprite, h = u._texture;
      h.valid && (h.uvMatrix || (h.uvMatrix = new TextureMatrix(h, 0)), h.uvMatrix.update(), this.uniforms.npmAlpha = h.baseTexture.alphaMode ? 0 : 1, this.uniforms.mask = h, this.uniforms.otherMatrix = t.calculateSpriteMatrix(this.maskMatrix, u).prepend(h.uvMatrix.mapCoord), this.uniforms.alpha = u.worldAlpha, this.uniforms.maskClamp = h.uvMatrix.uClampFrame, t.applyFilter(this, r, s, o));
    }, e;
  }(Filter)
), MaskSystem = (
  /** @class */
  function() {
    function a(e) {
      this.renderer = e, this.enableScissor = !0, this.alphaMaskPool = [], this.maskDataPool = [], this.maskStack = [], this.alphaMaskIndex = 0;
    }
    return a.prototype.setMaskStack = function(e) {
      this.maskStack = e, this.renderer.scissor.setMaskStack(e), this.renderer.stencil.setMaskStack(e);
    }, a.prototype.push = function(e, t) {
      var r = t;
      if (!r.isMaskData) {
        var s = this.maskDataPool.pop() || new MaskData();
        s.pooled = !0, s.maskObject = t, r = s;
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
    }, a.prototype.pop = function(e) {
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
    }, a.prototype.detect = function(e) {
      var t = e.maskObject;
      t ? t.isSprite ? e.type = MASK_TYPES.SPRITE : this.enableScissor && this.renderer.scissor.testScissor(e) ? e.type = MASK_TYPES.SCISSOR : e.type = MASK_TYPES.STENCIL : e.type = MASK_TYPES.COLOR;
    }, a.prototype.pushSpriteMask = function(e) {
      var t, r, s = e.maskObject, o = e._target, u = e._filters;
      u || (u = this.alphaMaskPool[this.alphaMaskIndex], u || (u = this.alphaMaskPool[this.alphaMaskIndex] = [new SpriteMaskFilter()]));
      var h = this.renderer, l = h.renderTexture, c, d;
      if (l.current) {
        var _ = l.current;
        c = e.resolution || _.resolution, d = (t = e.multisample) !== null && t !== void 0 ? t : _.multisample;
      } else
        c = e.resolution || h.resolution, d = (r = e.multisample) !== null && r !== void 0 ? r : h.multisample;
      u[0].resolution = c, u[0].multisample = d, u[0].maskSprite = s;
      var v = o.filterArea;
      o.filterArea = s.getBounds(!0), h.filter.push(o, u), o.filterArea = v, e._filters || this.alphaMaskIndex++;
    }, a.prototype.popSpriteMask = function(e) {
      this.renderer.filter.pop(), e._filters ? e._filters[0].maskSprite = null : (this.alphaMaskIndex--, this.alphaMaskPool[this.alphaMaskIndex][0].maskSprite = null);
    }, a.prototype.pushColorMask = function(e) {
      var t = e._colorMask, r = e._colorMask = t & e.colorMask;
      r !== t && this.renderer.gl.colorMask((r & 1) !== 0, (r & 2) !== 0, (r & 4) !== 0, (r & 8) !== 0);
    }, a.prototype.popColorMask = function(e) {
      var t = e._colorMask, r = this.maskStack.length > 0 ? this.maskStack[this.maskStack.length - 1]._colorMask : 15;
      r !== t && this.renderer.gl.colorMask((r & 1) !== 0, (r & 2) !== 0, (r & 4) !== 0, (r & 8) !== 0);
    }, a.prototype.destroy = function() {
      this.renderer = null;
    }, a;
  }()
), AbstractMaskSystem = (
  /** @class */
  function() {
    function a(e) {
      this.renderer = e, this.maskStack = [], this.glConst = 0;
    }
    return a.prototype.getStackLength = function() {
      return this.maskStack.length;
    }, a.prototype.setMaskStack = function(e) {
      var t = this.renderer.gl, r = this.getStackLength();
      this.maskStack = e;
      var s = this.getStackLength();
      s !== r && (s === 0 ? t.disable(this.glConst) : (t.enable(this.glConst), this._useCurrent()));
    }, a.prototype._useCurrent = function() {
    }, a.prototype.destroy = function() {
      this.renderer = null, this.maskStack = null;
    }, a;
  }()
), tempMatrix$1 = new Matrix(), rectPool = [], ScissorSystem = (
  /** @class */
  function(a) {
    __extends$i(e, a);
    function e(t) {
      var r = a.call(this, t) || this;
      return r.glConst = settings.ADAPTER.getWebGLRenderingContext().SCISSOR_TEST, r;
    }
    return e.prototype.getStackLength = function() {
      var t = this.maskStack[this.maskStack.length - 1];
      return t ? t._scissorCounter : 0;
    }, e.prototype.calcScissorRect = function(t) {
      var r;
      if (!t._scissorRectLocal) {
        var s = t._scissorRect, o = t.maskObject, u = this.renderer, h = u.renderTexture, l = o.getBounds(!0, (r = rectPool.pop()) !== null && r !== void 0 ? r : new Rectangle());
        this.roundFrameToPixels(l, h.current ? h.current.resolution : u.resolution, h.sourceFrame, h.destinationFrame, u.projection.transform), s && l.fit(s), t._scissorRectLocal = l;
      }
    }, e.isMatrixRotated = function(t) {
      if (!t)
        return !1;
      var r = t.a, s = t.b, o = t.c, u = t.d;
      return (Math.abs(s) > 1e-4 || Math.abs(o) > 1e-4) && (Math.abs(r) > 1e-4 || Math.abs(u) > 1e-4);
    }, e.prototype.testScissor = function(t) {
      var r = t.maskObject;
      if (!r.isFastRect || !r.isFastRect() || e.isMatrixRotated(r.worldTransform) || e.isMatrixRotated(this.renderer.projection.transform))
        return !1;
      this.calcScissorRect(t);
      var s = t._scissorRectLocal;
      return s.width > 0 && s.height > 0;
    }, e.prototype.roundFrameToPixels = function(t, r, s, o, u) {
      e.isMatrixRotated(u) || (u = u ? tempMatrix$1.copyFrom(u) : tempMatrix$1.identity(), u.translate(-s.x, -s.y).scale(o.width / s.width, o.height / s.height).translate(o.x, o.y), this.renderer.filter.transformAABB(u, t), t.fit(o), t.x = Math.round(t.x * r), t.y = Math.round(t.y * r), t.width = Math.round(t.width * r), t.height = Math.round(t.height * r));
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
  function(a) {
    __extends$i(e, a);
    function e(t) {
      var r = a.call(this, t) || this;
      return r.glConst = settings.ADAPTER.getWebGLRenderingContext().STENCIL_TEST, r;
    }
    return e.prototype.getStackLength = function() {
      var t = this.maskStack[this.maskStack.length - 1];
      return t ? t._stencilCounter : 0;
    }, e.prototype.push = function(t) {
      var r = t.maskObject, s = this.renderer.gl, o = t._stencilCounter;
      o === 0 && (this.renderer.framebuffer.forceStencil(), s.clearStencil(0), s.clear(s.STENCIL_BUFFER_BIT), s.enable(s.STENCIL_TEST)), t._stencilCounter++;
      var u = t._colorMask;
      u !== 0 && (t._colorMask = 0, s.colorMask(!1, !1, !1, !1)), s.stencilFunc(s.EQUAL, o, 4294967295), s.stencilOp(s.KEEP, s.KEEP, s.INCR), r.renderable = !0, r.render(this.renderer), this.renderer.batch.flush(), r.renderable = !1, u !== 0 && (t._colorMask = u, s.colorMask((u & 1) !== 0, (u & 2) !== 0, (u & 4) !== 0, (u & 8) !== 0)), this._useCurrent();
    }, e.prototype.pop = function(t) {
      var r = this.renderer.gl;
      if (this.getStackLength() === 0)
        r.disable(r.STENCIL_TEST);
      else {
        var s = this.maskStack.length !== 0 ? this.maskStack[this.maskStack.length - 1] : null, o = s ? s._colorMask : 15;
        o !== 0 && (s._colorMask = 0, r.colorMask(!1, !1, !1, !1)), r.stencilOp(r.KEEP, r.KEEP, r.DECR), t.renderable = !0, t.render(this.renderer), this.renderer.batch.flush(), t.renderable = !1, o !== 0 && (s._colorMask = o, r.colorMask((o & 1) !== 0, (o & 2) !== 0, (o & 4) !== 0, (o & 8) !== 0)), this._useCurrent();
      }
    }, e.prototype._useCurrent = function() {
      var t = this.renderer.gl;
      t.stencilFunc(t.EQUAL, this.getStackLength(), 4294967295), t.stencilOp(t.KEEP, t.KEEP, t.KEEP);
    }, e;
  }(AbstractMaskSystem)
), ProjectionSystem = (
  /** @class */
  function() {
    function a(e) {
      this.renderer = e, this.destinationFrame = null, this.sourceFrame = null, this.defaultFrame = null, this.projectionMatrix = new Matrix(), this.transform = null;
    }
    return a.prototype.update = function(e, t, r, s) {
      this.destinationFrame = e || this.destinationFrame || this.defaultFrame, this.sourceFrame = t || this.sourceFrame || e, this.calculateProjection(this.destinationFrame, this.sourceFrame, r, s), this.transform && this.projectionMatrix.append(this.transform);
      var o = this.renderer;
      o.globalUniforms.uniforms.projectionMatrix = this.projectionMatrix, o.globalUniforms.update(), o.shader.shader && o.shader.syncUniformGroup(o.shader.shader.uniforms.globals);
    }, a.prototype.calculateProjection = function(e, t, r, s) {
      var o = this.projectionMatrix, u = s ? -1 : 1;
      o.identity(), o.a = 1 / t.width * 2, o.d = u * (1 / t.height * 2), o.tx = -1 - t.x * o.a, o.ty = -u - t.y * o.d;
    }, a.prototype.setTransform = function(e) {
    }, a.prototype.destroy = function() {
      this.renderer = null;
    }, a;
  }()
), tempRect = new Rectangle(), tempRect2 = new Rectangle(), RenderTextureSystem = (
  /** @class */
  function() {
    function a(e) {
      this.renderer = e, this.clearColor = e._backgroundColorRgba, this.defaultMaskStack = [], this.current = null, this.sourceFrame = new Rectangle(), this.destinationFrame = new Rectangle(), this.viewportFrame = new Rectangle();
    }
    return a.prototype.bind = function(e, t, r) {
      e === void 0 && (e = null);
      var s = this.renderer;
      this.current = e;
      var o, u, h;
      e ? (o = e.baseTexture, h = o.resolution, t || (tempRect.width = e.frame.width, tempRect.height = e.frame.height, t = tempRect), r || (tempRect2.x = e.frame.x, tempRect2.y = e.frame.y, tempRect2.width = t.width, tempRect2.height = t.height, r = tempRect2), u = o.framebuffer) : (h = s.resolution, t || (tempRect.width = s.screen.width, tempRect.height = s.screen.height, t = tempRect), r || (r = tempRect, r.width = t.width, r.height = t.height));
      var l = this.viewportFrame;
      l.x = r.x * h, l.y = r.y * h, l.width = r.width * h, l.height = r.height * h, e || (l.y = s.view.height - (l.y + l.height)), l.ceil(), this.renderer.framebuffer.bind(u, l), this.renderer.projection.update(r, t, h, !u), e ? this.renderer.mask.setMaskStack(o.maskStack) : this.renderer.mask.setMaskStack(this.defaultMaskStack), this.sourceFrame.copyFrom(t), this.destinationFrame.copyFrom(r);
    }, a.prototype.clear = function(e, t) {
      this.current ? e = e || this.current.baseTexture.clearColor : e = e || this.clearColor;
      var r = this.destinationFrame, s = this.current ? this.current.baseTexture : this.renderer.screen, o = r.width !== s.width || r.height !== s.height;
      if (o) {
        var u = this.viewportFrame, h = u.x, l = u.y, c = u.width, d = u.height;
        h = Math.round(h), l = Math.round(l), c = Math.round(c), d = Math.round(d), this.renderer.gl.enable(this.renderer.gl.SCISSOR_TEST), this.renderer.gl.scissor(h, l, c, d);
      }
      this.renderer.framebuffer.clear(e[0], e[1], e[2], e[3], t), o && this.renderer.scissor.pop();
    }, a.prototype.resize = function() {
      this.bind(null);
    }, a.prototype.reset = function() {
      this.bind(null);
    }, a.prototype.destroy = function() {
      this.renderer = null;
    }, a;
  }()
);
function uboUpdate(a, e, t, r, s) {
  t.buffer.update(s);
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
function createUBOElements(a) {
  for (var e = a.map(function(l) {
    return {
      data: l,
      offset: 0,
      dataLen: 0,
      dirty: 0
    };
  }), t = 0, r = 0, s = 0, o = 0; o < e.length; o++) {
    var u = e[o];
    if (t = GLSL_TO_STD40_SIZE[u.data.type], u.data.size > 1 && (t = Math.max(t, 16) * u.data.size), u.dataLen = t, r % t !== 0 && r < 16) {
      var h = r % t % 16;
      r += h, s += h;
    }
    r + t > 16 ? (s = Math.ceil(s / 16) * 16, u.offset = s, s += t, r = t) : (u.offset = s, r += t, s += t);
  }
  return s = Math.ceil(s / 16) * 16, { uboElements: e, size: s };
}
function getUBOData(a, e) {
  var t = [];
  for (var r in a)
    e[r] && t.push(e[r]);
  return t.sort(function(s, o) {
    return s.index - o.index;
  }), t;
}
function generateUniformBufferSync(a, e) {
  if (!a.autoManage)
    return { size: 0, syncFunc: uboUpdate };
  for (var t = getUBOData(a.uniforms, e), r = createUBOElements(t), s = r.uboElements, o = r.size, u = [`
    var v = null;
    var v2 = null;
    var cv = null;
    var t = 0;
    var gl = renderer.gl
    var index = 0;
    var data = buffer.data;
    `], h = 0; h < s.length; h++) {
    for (var l = s[h], c = a.uniforms[l.data.name], d = l.data.name, _ = !1, v = 0; v < uniformParsers.length; v++) {
      var y = uniformParsers[v];
      if (y.codeUbo && y.test(l.data, c)) {
        u.push("offset = " + l.offset / 4 + ";", uniformParsers[v].codeUbo(l.data.name, c)), _ = !0;
        break;
      }
    }
    if (!_)
      if (l.data.size > 1) {
        var b = mapSize(l.data.type), g = Math.max(GLSL_TO_STD40_SIZE[l.data.type] / 16, 1), m = b / g, E = (4 - m % 4) % 4;
        u.push(`
                cv = ud.` + d + `.value;
                v = uv.` + d + `;
                offset = ` + l.offset / 4 + `;

                t = 0;

                for(var i=0; i < ` + l.data.size * g + `; i++)
                {
                    for(var j = 0; j < ` + m + `; j++)
                    {
                        data[offset++] = v[t++];
                    }
                    offset += ` + E + `;
                }

                `);
      } else {
        var S = UBO_TO_SINGLE_SETTERS[l.data.type];
        u.push(`
                cv = ud.` + d + `.value;
                v = uv.` + d + `;
                offset = ` + l.offset / 4 + `;
                ` + S + `;
                `);
      }
  }
  return u.push(`
       renderer.buffer.update(buffer);
    `), {
    size: o,
    // eslint-disable-next-line no-new-func
    syncFunc: new Function("ud", "uv", "renderer", "syncData", "buffer", u.join(`
`))
  };
}
var IGLUniformData = (
  /** @class */
  /* @__PURE__ */ function() {
    function a() {
    }
    return a;
  }()
), GLProgram = (
  /** @class */
  function() {
    function a(e, t) {
      this.program = e, this.uniformData = t, this.uniformGroups = {}, this.uniformDirtyGroups = {}, this.uniformBufferBindings = {};
    }
    return a.prototype.destroy = function() {
      this.uniformData = null, this.uniformGroups = null, this.uniformDirtyGroups = null, this.uniformBufferBindings = null, this.program = null;
    }, a;
  }()
);
function getAttributeData(a, e) {
  for (var t = {}, r = e.getProgramParameter(a, e.ACTIVE_ATTRIBUTES), s = 0; s < r; s++) {
    var o = e.getActiveAttrib(a, s);
    if (o.name.indexOf("gl_") !== 0) {
      var u = mapType(e, o.type), h = {
        type: u,
        name: o.name,
        size: mapSize(u),
        location: e.getAttribLocation(a, o.name)
      };
      t[o.name] = h;
    }
  }
  return t;
}
function getUniformData(a, e) {
  for (var t = {}, r = e.getProgramParameter(a, e.ACTIVE_UNIFORMS), s = 0; s < r; s++) {
    var o = e.getActiveUniform(a, s), u = o.name.replace(/\[.*?\]$/, ""), h = !!o.name.match(/\[.*?\]$/), l = mapType(e, o.type);
    t[u] = {
      name: u,
      index: s,
      type: l,
      size: o.size,
      isArray: h,
      value: defaultValue(l, o.size)
    };
  }
  return t;
}
function generateProgram(a, e) {
  var t = compileShader(a, a.VERTEX_SHADER, e.vertexSrc), r = compileShader(a, a.FRAGMENT_SHADER, e.fragmentSrc), s = a.createProgram();
  if (a.attachShader(s, t), a.attachShader(s, r), a.linkProgram(s), a.getProgramParameter(s, a.LINK_STATUS) || logProgramError(a, s, t, r), e.attributeData = getAttributeData(s, a), e.uniformData = getUniformData(s, a), !/^[ \t]*#[ \t]*version[ \t]+300[ \t]+es[ \t]*$/m.test(e.vertexSrc)) {
    var o = Object.keys(e.attributeData);
    o.sort(function(d, _) {
      return d > _ ? 1 : -1;
    });
    for (var u = 0; u < o.length; u++)
      e.attributeData[o[u]].location = u, a.bindAttribLocation(s, u, o[u]);
    a.linkProgram(s);
  }
  a.deleteShader(t), a.deleteShader(r);
  var h = {};
  for (var u in e.uniformData) {
    var l = e.uniformData[u];
    h[u] = {
      location: a.getUniformLocation(s, u),
      value: defaultValue(l.type, l.size)
    };
  }
  var c = new GLProgram(s, h);
  return c;
}
var UID = 0, defaultSyncData = { textureCount: 0, uboCount: 0 }, ShaderSystem = (
  /** @class */
  function() {
    function a(e) {
      this.destroyed = !1, this.renderer = e, this.systemCheck(), this.gl = null, this.shader = null, this.program = null, this.cache = {}, this._uboCache = {}, this.id = UID++;
    }
    return a.prototype.systemCheck = function() {
      if (!unsafeEvalSupported())
        throw new Error("Current environment does not allow unsafe-eval, please use @pixi/unsafe-eval module to enable support.");
    }, a.prototype.contextChange = function(e) {
      this.gl = e, this.reset();
    }, a.prototype.bind = function(e, t) {
      e.disposeRunner.add(this), e.uniforms.globals = this.renderer.globalUniforms;
      var r = e.program, s = r.glPrograms[this.renderer.CONTEXT_UID] || this.generateProgram(e);
      return this.shader = e, this.program !== r && (this.program = r, this.gl.useProgram(s.program)), t || (defaultSyncData.textureCount = 0, defaultSyncData.uboCount = 0, this.syncUniformGroup(e.uniformGroup, defaultSyncData)), s;
    }, a.prototype.setUniforms = function(e) {
      var t = this.shader.program, r = t.glPrograms[this.renderer.CONTEXT_UID];
      t.syncUniforms(r.uniformData, e, this.renderer);
    }, a.prototype.syncUniformGroup = function(e, t) {
      var r = this.getGlProgram();
      (!e.static || e.dirtyId !== r.uniformDirtyGroups[e.id]) && (r.uniformDirtyGroups[e.id] = e.dirtyId, this.syncUniforms(e, r, t));
    }, a.prototype.syncUniforms = function(e, t, r) {
      var s = e.syncUniforms[this.shader.program.id] || this.createSyncGroups(e);
      s(t.uniformData, e.uniforms, this.renderer, r);
    }, a.prototype.createSyncGroups = function(e) {
      var t = this.getSignature(e, this.shader.program.uniformData, "u");
      return this.cache[t] || (this.cache[t] = generateUniformsSync(e, this.shader.program.uniformData)), e.syncUniforms[this.shader.program.id] = this.cache[t], e.syncUniforms[this.shader.program.id];
    }, a.prototype.syncUniformBufferGroup = function(e, t) {
      var r = this.getGlProgram();
      if (!e.static || e.dirtyId !== 0 || !r.uniformGroups[e.id]) {
        e.dirtyId = 0;
        var s = r.uniformGroups[e.id] || this.createSyncBufferGroup(e, r, t);
        e.buffer.update(), s(r.uniformData, e.uniforms, this.renderer, defaultSyncData, e.buffer);
      }
      this.renderer.buffer.bindBufferBase(e.buffer, r.uniformBufferBindings[t]);
    }, a.prototype.createSyncBufferGroup = function(e, t, r) {
      var s = this.renderer.gl;
      this.renderer.buffer.bind(e.buffer);
      var o = this.gl.getUniformBlockIndex(t.program, r);
      t.uniformBufferBindings[r] = this.shader.uniformBindCount, s.uniformBlockBinding(t.program, o, this.shader.uniformBindCount), this.shader.uniformBindCount++;
      var u = this.getSignature(e, this.shader.program.uniformData, "ubo"), h = this._uboCache[u];
      if (h || (h = this._uboCache[u] = generateUniformBufferSync(e, this.shader.program.uniformData)), e.autoManage) {
        var l = new Float32Array(h.size / 4);
        e.buffer.update(l);
      }
      return t.uniformGroups[e.id] = h.syncFunc, t.uniformGroups[e.id];
    }, a.prototype.getSignature = function(e, t, r) {
      var s = e.uniforms, o = [r + "-"];
      for (var u in s)
        o.push(u), t[u] && o.push(t[u].type);
      return o.join("-");
    }, a.prototype.getGlProgram = function() {
      return this.shader ? this.shader.program.glPrograms[this.renderer.CONTEXT_UID] : null;
    }, a.prototype.generateProgram = function(e) {
      var t = this.gl, r = e.program, s = generateProgram(t, r);
      return r.glPrograms[this.renderer.CONTEXT_UID] = s, s;
    }, a.prototype.reset = function() {
      this.program = null, this.shader = null;
    }, a.prototype.disposeShader = function(e) {
      this.shader === e && (this.shader = null);
    }, a.prototype.destroy = function() {
      this.renderer = null, this.destroyed = !0;
    }, a;
  }()
);
function mapWebGLBlendModesToPixi(a, e) {
  return e === void 0 && (e = []), e[BLEND_MODES.NORMAL] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], e[BLEND_MODES.ADD] = [a.ONE, a.ONE], e[BLEND_MODES.MULTIPLY] = [a.DST_COLOR, a.ONE_MINUS_SRC_ALPHA, a.ONE, a.ONE_MINUS_SRC_ALPHA], e[BLEND_MODES.SCREEN] = [a.ONE, a.ONE_MINUS_SRC_COLOR, a.ONE, a.ONE_MINUS_SRC_ALPHA], e[BLEND_MODES.OVERLAY] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], e[BLEND_MODES.DARKEN] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], e[BLEND_MODES.LIGHTEN] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], e[BLEND_MODES.COLOR_DODGE] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], e[BLEND_MODES.COLOR_BURN] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], e[BLEND_MODES.HARD_LIGHT] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], e[BLEND_MODES.SOFT_LIGHT] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], e[BLEND_MODES.DIFFERENCE] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], e[BLEND_MODES.EXCLUSION] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], e[BLEND_MODES.HUE] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], e[BLEND_MODES.SATURATION] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], e[BLEND_MODES.COLOR] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], e[BLEND_MODES.LUMINOSITY] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], e[BLEND_MODES.NONE] = [0, 0], e[BLEND_MODES.NORMAL_NPM] = [a.SRC_ALPHA, a.ONE_MINUS_SRC_ALPHA, a.ONE, a.ONE_MINUS_SRC_ALPHA], e[BLEND_MODES.ADD_NPM] = [a.SRC_ALPHA, a.ONE, a.ONE, a.ONE], e[BLEND_MODES.SCREEN_NPM] = [a.SRC_ALPHA, a.ONE_MINUS_SRC_COLOR, a.ONE, a.ONE_MINUS_SRC_ALPHA], e[BLEND_MODES.SRC_IN] = [a.DST_ALPHA, a.ZERO], e[BLEND_MODES.SRC_OUT] = [a.ONE_MINUS_DST_ALPHA, a.ZERO], e[BLEND_MODES.SRC_ATOP] = [a.DST_ALPHA, a.ONE_MINUS_SRC_ALPHA], e[BLEND_MODES.DST_OVER] = [a.ONE_MINUS_DST_ALPHA, a.ONE], e[BLEND_MODES.DST_IN] = [a.ZERO, a.SRC_ALPHA], e[BLEND_MODES.DST_OUT] = [a.ZERO, a.ONE_MINUS_SRC_ALPHA], e[BLEND_MODES.DST_ATOP] = [a.ONE_MINUS_DST_ALPHA, a.SRC_ALPHA], e[BLEND_MODES.XOR] = [a.ONE_MINUS_DST_ALPHA, a.ONE_MINUS_SRC_ALPHA], e[BLEND_MODES.SUBTRACT] = [a.ONE, a.ONE, a.ONE, a.ONE, a.FUNC_REVERSE_SUBTRACT, a.FUNC_ADD], e;
}
var BLEND = 0, OFFSET = 1, CULLING = 2, DEPTH_TEST = 3, WINDING = 4, DEPTH_MASK = 5, StateSystem = (
  /** @class */
  function() {
    function a() {
      this.gl = null, this.stateId = 0, this.polygonOffset = 0, this.blendMode = BLEND_MODES.NONE, this._blendEq = !1, this.map = [], this.map[BLEND] = this.setBlend, this.map[OFFSET] = this.setOffset, this.map[CULLING] = this.setCullFace, this.map[DEPTH_TEST] = this.setDepthTest, this.map[WINDING] = this.setFrontFace, this.map[DEPTH_MASK] = this.setDepthMask, this.checks = [], this.defaultState = new State(), this.defaultState.blend = !0;
    }
    return a.prototype.contextChange = function(e) {
      this.gl = e, this.blendModes = mapWebGLBlendModesToPixi(e), this.set(this.defaultState), this.reset();
    }, a.prototype.set = function(e) {
      if (e = e || this.defaultState, this.stateId !== e.data) {
        for (var t = this.stateId ^ e.data, r = 0; t; )
          t & 1 && this.map[r].call(this, !!(e.data & 1 << r)), t = t >> 1, r++;
        this.stateId = e.data;
      }
      for (var r = 0; r < this.checks.length; r++)
        this.checks[r](this, e);
    }, a.prototype.forceState = function(e) {
      e = e || this.defaultState;
      for (var t = 0; t < this.map.length; t++)
        this.map[t].call(this, !!(e.data & 1 << t));
      for (var t = 0; t < this.checks.length; t++)
        this.checks[t](this, e);
      this.stateId = e.data;
    }, a.prototype.setBlend = function(e) {
      this.updateCheck(a.checkBlendMode, e), this.gl[e ? "enable" : "disable"](this.gl.BLEND);
    }, a.prototype.setOffset = function(e) {
      this.updateCheck(a.checkPolygonOffset, e), this.gl[e ? "enable" : "disable"](this.gl.POLYGON_OFFSET_FILL);
    }, a.prototype.setDepthTest = function(e) {
      this.gl[e ? "enable" : "disable"](this.gl.DEPTH_TEST);
    }, a.prototype.setDepthMask = function(e) {
      this.gl.depthMask(e);
    }, a.prototype.setCullFace = function(e) {
      this.gl[e ? "enable" : "disable"](this.gl.CULL_FACE);
    }, a.prototype.setFrontFace = function(e) {
      this.gl.frontFace(this.gl[e ? "CW" : "CCW"]);
    }, a.prototype.setBlendMode = function(e) {
      if (e !== this.blendMode) {
        this.blendMode = e;
        var t = this.blendModes[e], r = this.gl;
        t.length === 2 ? r.blendFunc(t[0], t[1]) : r.blendFuncSeparate(t[0], t[1], t[2], t[3]), t.length === 6 ? (this._blendEq = !0, r.blendEquationSeparate(t[4], t[5])) : this._blendEq && (this._blendEq = !1, r.blendEquationSeparate(r.FUNC_ADD, r.FUNC_ADD));
      }
    }, a.prototype.setPolygonOffset = function(e, t) {
      this.gl.polygonOffset(e, t);
    }, a.prototype.reset = function() {
      this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, !1), this.forceState(this.defaultState), this._blendEq = !0, this.blendMode = -1, this.setBlendMode(0);
    }, a.prototype.updateCheck = function(e, t) {
      var r = this.checks.indexOf(e);
      t && r === -1 ? this.checks.push(e) : !t && r !== -1 && this.checks.splice(r, 1);
    }, a.checkBlendMode = function(e, t) {
      e.setBlendMode(t.blendMode);
    }, a.checkPolygonOffset = function(e, t) {
      e.setPolygonOffset(1, t.polygonOffset);
    }, a.prototype.destroy = function() {
      this.gl = null;
    }, a;
  }()
), TextureGCSystem = (
  /** @class */
  function() {
    function a(e) {
      this.renderer = e, this.count = 0, this.checkCount = 0, this.maxIdle = settings.GC_MAX_IDLE, this.checkCountMax = settings.GC_MAX_CHECK_COUNT, this.mode = settings.GC_MODE;
    }
    return a.prototype.postrender = function() {
      this.renderer.renderingToScreen && (this.count++, this.mode !== GC_MODES.MANUAL && (this.checkCount++, this.checkCount > this.checkCountMax && (this.checkCount = 0, this.run())));
    }, a.prototype.run = function() {
      for (var e = this.renderer.texture, t = e.managedTextures, r = !1, s = 0; s < t.length; s++) {
        var o = t[s];
        !o.framebuffer && this.count - o.touched > this.maxIdle && (e.destroyTexture(o, !0), t[s] = null, r = !0);
      }
      if (r) {
        for (var u = 0, s = 0; s < t.length; s++)
          t[s] !== null && (t[u++] = t[s]);
        t.length = u;
      }
    }, a.prototype.unload = function(e) {
      var t = this.renderer.texture, r = e._texture;
      r && !r.framebuffer && t.destroyTexture(r);
      for (var s = e.children.length - 1; s >= 0; s--)
        this.unload(e.children[s]);
    }, a.prototype.destroy = function() {
      this.renderer = null;
    }, a;
  }()
);
function mapTypeAndFormatToInternalFormat(a) {
  var e, t, r, s, o, u, h, l, c, d, _, v, y, b, g, m, E, S, P, L, T, I, w;
  return "WebGL2RenderingContext" in globalThis && a instanceof globalThis.WebGL2RenderingContext ? w = (e = {}, e[TYPES.UNSIGNED_BYTE] = (t = {}, t[FORMATS.RGBA] = a.RGBA8, t[FORMATS.RGB] = a.RGB8, t[FORMATS.RG] = a.RG8, t[FORMATS.RED] = a.R8, t[FORMATS.RGBA_INTEGER] = a.RGBA8UI, t[FORMATS.RGB_INTEGER] = a.RGB8UI, t[FORMATS.RG_INTEGER] = a.RG8UI, t[FORMATS.RED_INTEGER] = a.R8UI, t[FORMATS.ALPHA] = a.ALPHA, t[FORMATS.LUMINANCE] = a.LUMINANCE, t[FORMATS.LUMINANCE_ALPHA] = a.LUMINANCE_ALPHA, t), e[TYPES.BYTE] = (r = {}, r[FORMATS.RGBA] = a.RGBA8_SNORM, r[FORMATS.RGB] = a.RGB8_SNORM, r[FORMATS.RG] = a.RG8_SNORM, r[FORMATS.RED] = a.R8_SNORM, r[FORMATS.RGBA_INTEGER] = a.RGBA8I, r[FORMATS.RGB_INTEGER] = a.RGB8I, r[FORMATS.RG_INTEGER] = a.RG8I, r[FORMATS.RED_INTEGER] = a.R8I, r), e[TYPES.UNSIGNED_SHORT] = (s = {}, s[FORMATS.RGBA_INTEGER] = a.RGBA16UI, s[FORMATS.RGB_INTEGER] = a.RGB16UI, s[FORMATS.RG_INTEGER] = a.RG16UI, s[FORMATS.RED_INTEGER] = a.R16UI, s[FORMATS.DEPTH_COMPONENT] = a.DEPTH_COMPONENT16, s), e[TYPES.SHORT] = (o = {}, o[FORMATS.RGBA_INTEGER] = a.RGBA16I, o[FORMATS.RGB_INTEGER] = a.RGB16I, o[FORMATS.RG_INTEGER] = a.RG16I, o[FORMATS.RED_INTEGER] = a.R16I, o), e[TYPES.UNSIGNED_INT] = (u = {}, u[FORMATS.RGBA_INTEGER] = a.RGBA32UI, u[FORMATS.RGB_INTEGER] = a.RGB32UI, u[FORMATS.RG_INTEGER] = a.RG32UI, u[FORMATS.RED_INTEGER] = a.R32UI, u[FORMATS.DEPTH_COMPONENT] = a.DEPTH_COMPONENT24, u), e[TYPES.INT] = (h = {}, h[FORMATS.RGBA_INTEGER] = a.RGBA32I, h[FORMATS.RGB_INTEGER] = a.RGB32I, h[FORMATS.RG_INTEGER] = a.RG32I, h[FORMATS.RED_INTEGER] = a.R32I, h), e[TYPES.FLOAT] = (l = {}, l[FORMATS.RGBA] = a.RGBA32F, l[FORMATS.RGB] = a.RGB32F, l[FORMATS.RG] = a.RG32F, l[FORMATS.RED] = a.R32F, l[FORMATS.DEPTH_COMPONENT] = a.DEPTH_COMPONENT32F, l), e[TYPES.HALF_FLOAT] = (c = {}, c[FORMATS.RGBA] = a.RGBA16F, c[FORMATS.RGB] = a.RGB16F, c[FORMATS.RG] = a.RG16F, c[FORMATS.RED] = a.R16F, c), e[TYPES.UNSIGNED_SHORT_5_6_5] = (d = {}, d[FORMATS.RGB] = a.RGB565, d), e[TYPES.UNSIGNED_SHORT_4_4_4_4] = (_ = {}, _[FORMATS.RGBA] = a.RGBA4, _), e[TYPES.UNSIGNED_SHORT_5_5_5_1] = (v = {}, v[FORMATS.RGBA] = a.RGB5_A1, v), e[TYPES.UNSIGNED_INT_2_10_10_10_REV] = (y = {}, y[FORMATS.RGBA] = a.RGB10_A2, y[FORMATS.RGBA_INTEGER] = a.RGB10_A2UI, y), e[TYPES.UNSIGNED_INT_10F_11F_11F_REV] = (b = {}, b[FORMATS.RGB] = a.R11F_G11F_B10F, b), e[TYPES.UNSIGNED_INT_5_9_9_9_REV] = (g = {}, g[FORMATS.RGB] = a.RGB9_E5, g), e[TYPES.UNSIGNED_INT_24_8] = (m = {}, m[FORMATS.DEPTH_STENCIL] = a.DEPTH24_STENCIL8, m), e[TYPES.FLOAT_32_UNSIGNED_INT_24_8_REV] = (E = {}, E[FORMATS.DEPTH_STENCIL] = a.DEPTH32F_STENCIL8, E), e) : w = (S = {}, S[TYPES.UNSIGNED_BYTE] = (P = {}, P[FORMATS.RGBA] = a.RGBA, P[FORMATS.RGB] = a.RGB, P[FORMATS.ALPHA] = a.ALPHA, P[FORMATS.LUMINANCE] = a.LUMINANCE, P[FORMATS.LUMINANCE_ALPHA] = a.LUMINANCE_ALPHA, P), S[TYPES.UNSIGNED_SHORT_5_6_5] = (L = {}, L[FORMATS.RGB] = a.RGB, L), S[TYPES.UNSIGNED_SHORT_4_4_4_4] = (T = {}, T[FORMATS.RGBA] = a.RGBA, T), S[TYPES.UNSIGNED_SHORT_5_5_5_1] = (I = {}, I[FORMATS.RGBA] = a.RGBA, I), S), w;
}
var GLTexture = (
  /** @class */
  /* @__PURE__ */ function() {
    function a(e) {
      this.texture = e, this.width = -1, this.height = -1, this.dirtyId = -1, this.dirtyStyleId = -1, this.mipmap = !1, this.wrapMode = 33071, this.type = TYPES.UNSIGNED_BYTE, this.internalFormat = FORMATS.RGBA, this.samplerType = 0;
    }
    return a;
  }()
), TextureSystem = (
  /** @class */
  function() {
    function a(e) {
      this.renderer = e, this.boundTextures = [], this.currentLocation = -1, this.managedTextures = [], this._unknownBoundTextures = !1, this.unknownTexture = new BaseTexture(), this.hasIntegerTextures = !1;
    }
    return a.prototype.contextChange = function() {
      var e = this.gl = this.renderer.gl;
      this.CONTEXT_UID = this.renderer.CONTEXT_UID, this.webGLVersion = this.renderer.context.webGLVersion, this.internalFormats = mapTypeAndFormatToInternalFormat(e);
      var t = e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS);
      this.boundTextures.length = t;
      for (var r = 0; r < t; r++)
        this.boundTextures[r] = null;
      this.emptyTextures = {};
      var s = new GLTexture(e.createTexture());
      e.bindTexture(e.TEXTURE_2D, s.texture), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, 1, 1, 0, e.RGBA, e.UNSIGNED_BYTE, new Uint8Array(4)), this.emptyTextures[e.TEXTURE_2D] = s, this.emptyTextures[e.TEXTURE_CUBE_MAP] = new GLTexture(e.createTexture()), e.bindTexture(e.TEXTURE_CUBE_MAP, this.emptyTextures[e.TEXTURE_CUBE_MAP].texture);
      for (var r = 0; r < 6; r++)
        e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + r, 0, e.RGBA, 1, 1, 0, e.RGBA, e.UNSIGNED_BYTE, null);
      e.texParameteri(e.TEXTURE_CUBE_MAP, e.TEXTURE_MAG_FILTER, e.LINEAR), e.texParameteri(e.TEXTURE_CUBE_MAP, e.TEXTURE_MIN_FILTER, e.LINEAR);
      for (var r = 0; r < this.boundTextures.length; r++)
        this.bind(null, r);
    }, a.prototype.bind = function(e, t) {
      t === void 0 && (t = 0);
      var r = this.gl;
      if (e = e?.castToBaseTexture(), e && e.valid && !e.parentTextureArray) {
        e.touched = this.renderer.textureGC.count;
        var s = e._glTextures[this.CONTEXT_UID] || this.initTexture(e);
        this.boundTextures[t] !== e && (this.currentLocation !== t && (this.currentLocation = t, r.activeTexture(r.TEXTURE0 + t)), r.bindTexture(e.target, s.texture)), s.dirtyId !== e.dirtyId ? (this.currentLocation !== t && (this.currentLocation = t, r.activeTexture(r.TEXTURE0 + t)), this.updateTexture(e)) : s.dirtyStyleId !== e.dirtyStyleId && this.updateTextureStyle(e), this.boundTextures[t] = e;
      } else
        this.currentLocation !== t && (this.currentLocation = t, r.activeTexture(r.TEXTURE0 + t)), r.bindTexture(r.TEXTURE_2D, this.emptyTextures[r.TEXTURE_2D].texture), this.boundTextures[t] = null;
    }, a.prototype.reset = function() {
      this._unknownBoundTextures = !0, this.hasIntegerTextures = !1, this.currentLocation = -1;
      for (var e = 0; e < this.boundTextures.length; e++)
        this.boundTextures[e] = this.unknownTexture;
    }, a.prototype.unbind = function(e) {
      var t = this, r = t.gl, s = t.boundTextures;
      if (this._unknownBoundTextures) {
        this._unknownBoundTextures = !1;
        for (var o = 0; o < s.length; o++)
          s[o] === this.unknownTexture && this.bind(null, o);
      }
      for (var o = 0; o < s.length; o++)
        s[o] === e && (this.currentLocation !== o && (r.activeTexture(r.TEXTURE0 + o), this.currentLocation = o), r.bindTexture(e.target, this.emptyTextures[e.target].texture), s[o] = null);
    }, a.prototype.ensureSamplerType = function(e) {
      var t = this, r = t.boundTextures, s = t.hasIntegerTextures, o = t.CONTEXT_UID;
      if (s)
        for (var u = e - 1; u >= 0; --u) {
          var h = r[u];
          if (h) {
            var l = h._glTextures[o];
            l.samplerType !== SAMPLER_TYPES.FLOAT && this.renderer.texture.unbind(h);
          }
        }
    }, a.prototype.initTexture = function(e) {
      var t = new GLTexture(this.gl.createTexture());
      return t.dirtyId = -1, e._glTextures[this.CONTEXT_UID] = t, this.managedTextures.push(e), e.on("dispose", this.destroyTexture, this), t;
    }, a.prototype.initTextureType = function(e, t) {
      var r, s;
      t.internalFormat = (s = (r = this.internalFormats[e.type]) === null || r === void 0 ? void 0 : r[e.format]) !== null && s !== void 0 ? s : e.format, this.webGLVersion === 2 && e.type === TYPES.HALF_FLOAT ? t.type = this.gl.HALF_FLOAT : t.type = e.type;
    }, a.prototype.updateTexture = function(e) {
      var t = e._glTextures[this.CONTEXT_UID];
      if (t) {
        var r = this.renderer;
        if (this.initTextureType(e, t), e.resource && e.resource.upload(r, e, t))
          t.samplerType !== SAMPLER_TYPES.FLOAT && (this.hasIntegerTextures = !0);
        else {
          var s = e.realWidth, o = e.realHeight, u = r.gl;
          (t.width !== s || t.height !== o || t.dirtyId < 0) && (t.width = s, t.height = o, u.texImage2D(e.target, 0, t.internalFormat, s, o, 0, e.format, t.type, null));
        }
        e.dirtyStyleId !== t.dirtyStyleId && this.updateTextureStyle(e), t.dirtyId = e.dirtyId;
      }
    }, a.prototype.destroyTexture = function(e, t) {
      var r = this.gl;
      if (e = e.castToBaseTexture(), e._glTextures[this.CONTEXT_UID] && (this.unbind(e), r.deleteTexture(e._glTextures[this.CONTEXT_UID].texture), e.off("dispose", this.destroyTexture, this), delete e._glTextures[this.CONTEXT_UID], !t)) {
        var s = this.managedTextures.indexOf(e);
        s !== -1 && removeItems(this.managedTextures, s, 1);
      }
    }, a.prototype.updateTextureStyle = function(e) {
      var t = e._glTextures[this.CONTEXT_UID];
      t && ((e.mipmap === MIPMAP_MODES.POW2 || this.webGLVersion !== 2) && !e.isPowerOfTwo ? t.mipmap = !1 : t.mipmap = e.mipmap >= 1, this.webGLVersion !== 2 && !e.isPowerOfTwo ? t.wrapMode = WRAP_MODES.CLAMP : t.wrapMode = e.wrapMode, e.resource && e.resource.style(this.renderer, e, t) || this.setStyle(e, t), t.dirtyStyleId = e.dirtyStyleId);
    }, a.prototype.setStyle = function(e, t) {
      var r = this.gl;
      if (t.mipmap && e.mipmap !== MIPMAP_MODES.ON_MANUAL && r.generateMipmap(e.target), r.texParameteri(e.target, r.TEXTURE_WRAP_S, t.wrapMode), r.texParameteri(e.target, r.TEXTURE_WRAP_T, t.wrapMode), t.mipmap) {
        r.texParameteri(e.target, r.TEXTURE_MIN_FILTER, e.scaleMode === SCALE_MODES.LINEAR ? r.LINEAR_MIPMAP_LINEAR : r.NEAREST_MIPMAP_NEAREST);
        var s = this.renderer.context.extensions.anisotropicFiltering;
        if (s && e.anisotropicLevel > 0 && e.scaleMode === SCALE_MODES.LINEAR) {
          var o = Math.min(e.anisotropicLevel, r.getParameter(s.MAX_TEXTURE_MAX_ANISOTROPY_EXT));
          r.texParameterf(e.target, s.TEXTURE_MAX_ANISOTROPY_EXT, o);
        }
      } else
        r.texParameteri(e.target, r.TEXTURE_MIN_FILTER, e.scaleMode === SCALE_MODES.LINEAR ? r.LINEAR : r.NEAREST);
      r.texParameteri(e.target, r.TEXTURE_MAG_FILTER, e.scaleMode === SCALE_MODES.LINEAR ? r.LINEAR : r.NEAREST);
    }, a.prototype.destroy = function() {
      this.renderer = null;
    }, a;
  }()
), _systems = {
  __proto__: null,
  FilterSystem,
  BatchSystem,
  ContextSystem,
  FramebufferSystem,
  GeometrySystem,
  MaskSystem,
  ScissorSystem,
  StencilSystem,
  ProjectionSystem,
  RenderTextureSystem,
  ShaderSystem,
  StateSystem,
  TextureGCSystem,
  TextureSystem
}, tempMatrix = new Matrix(), AbstractRenderer = (
  /** @class */
  function(a) {
    __extends$i(e, a);
    function e(t, r) {
      t === void 0 && (t = RENDERER_TYPE.UNKNOWN);
      var s = a.call(this) || this;
      return r = Object.assign({}, settings.RENDER_OPTIONS, r), s.options = r, s.type = t, s.screen = new Rectangle(0, 0, r.width, r.height), s.view = r.view || settings.ADAPTER.createCanvas(), s.resolution = r.resolution || settings.RESOLUTION, s.useContextAlpha = r.useContextAlpha, s.autoDensity = !!r.autoDensity, s.preserveDrawingBuffer = r.preserveDrawingBuffer, s.clearBeforeRender = r.clearBeforeRender, s._backgroundColor = 0, s._backgroundColorRgba = [0, 0, 0, 1], s._backgroundColorString = "#000000", s.backgroundColor = r.backgroundColor || s._backgroundColor, s.backgroundAlpha = r.backgroundAlpha, r.transparent !== void 0 && (deprecation("6.0.0", "Option transparent is deprecated, please use backgroundAlpha instead."), s.useContextAlpha = r.transparent, s.backgroundAlpha = r.transparent ? 0 : 1), s._lastObjectRendered = null, s.plugins = {}, s;
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
      var s = this.view.width / this.resolution, o = this.view.height / this.resolution;
      this.screen.width = s, this.screen.height = o, this.autoDensity && (this.view.style.width = s + "px", this.view.style.height = o + "px"), this.emit("resize", s, o);
    }, e.prototype.generateTexture = function(t, r, s, o) {
      r === void 0 && (r = {}), typeof r == "number" && (deprecation("6.1.0", "generateTexture options (scaleMode, resolution, region) are now object options."), r = { scaleMode: r, resolution: s, region: o });
      var u = r.region, h = __rest(r, ["region"]);
      o = u || t.getLocalBounds(null, !0), o.width === 0 && (o.width = 1), o.height === 0 && (o.height = 1);
      var l = RenderTexture.create(__assign({ width: o.width, height: o.height }, h));
      return tempMatrix.tx = -o.x, tempMatrix.ty = -o.y, this.render(t, {
        renderTexture: l,
        clear: !1,
        transform: tempMatrix,
        skipUpdateTransform: !!t.parent
      }), l;
    }, e.prototype.destroy = function(t) {
      for (var r in this.plugins)
        this.plugins[r].destroy(), this.plugins[r] = null;
      t && this.view.parentNode && this.view.parentNode.removeChild(this.view);
      var s = this;
      s.plugins = null, s.type = RENDERER_TYPE.UNKNOWN, s.view = null, s.screen = null, s._tempDisplayObjectParent = null, s.options = null, this._backgroundColorRgba = null, this._backgroundColorString = null, this._lastObjectRendered = null;
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
    function a(e) {
      this.buffer = e || null, this.updateID = -1, this.byteLength = -1, this.refCount = 0;
    }
    return a;
  }()
), BufferSystem = (
  /** @class */
  function() {
    function a(e) {
      this.renderer = e, this.managedBuffers = {}, this.boundBufferBases = {};
    }
    return a.prototype.destroy = function() {
      this.renderer = null;
    }, a.prototype.contextChange = function() {
      this.disposeAll(!0), this.gl = this.renderer.gl, this.CONTEXT_UID = this.renderer.CONTEXT_UID;
    }, a.prototype.bind = function(e) {
      var t = this, r = t.gl, s = t.CONTEXT_UID, o = e._glBuffers[s] || this.createGLBuffer(e);
      r.bindBuffer(e.type, o.buffer);
    }, a.prototype.bindBufferBase = function(e, t) {
      var r = this, s = r.gl, o = r.CONTEXT_UID;
      if (this.boundBufferBases[t] !== e) {
        var u = e._glBuffers[o] || this.createGLBuffer(e);
        this.boundBufferBases[t] = e, s.bindBufferBase(s.UNIFORM_BUFFER, t, u.buffer);
      }
    }, a.prototype.bindBufferRange = function(e, t, r) {
      var s = this, o = s.gl, u = s.CONTEXT_UID;
      r = r || 0;
      var h = e._glBuffers[u] || this.createGLBuffer(e);
      o.bindBufferRange(o.UNIFORM_BUFFER, t || 0, h.buffer, r * 256, 256);
    }, a.prototype.update = function(e) {
      var t = this, r = t.gl, s = t.CONTEXT_UID, o = e._glBuffers[s];
      if (e._updateID !== o.updateID)
        if (o.updateID = e._updateID, r.bindBuffer(e.type, o.buffer), o.byteLength >= e.data.byteLength)
          r.bufferSubData(e.type, 0, e.data);
        else {
          var u = e.static ? r.STATIC_DRAW : r.DYNAMIC_DRAW;
          o.byteLength = e.data.byteLength, r.bufferData(e.type, e.data, u);
        }
    }, a.prototype.dispose = function(e, t) {
      if (this.managedBuffers[e.id]) {
        delete this.managedBuffers[e.id];
        var r = e._glBuffers[this.CONTEXT_UID], s = this.gl;
        e.disposeRunner.remove(this), r && (t || s.deleteBuffer(r.buffer), delete e._glBuffers[this.CONTEXT_UID]);
      }
    }, a.prototype.disposeAll = function(e) {
      for (var t = Object.keys(this.managedBuffers), r = 0; r < t.length; r++)
        this.dispose(this.managedBuffers[t[r]], e);
    }, a.prototype.createGLBuffer = function(e) {
      var t = this, r = t.CONTEXT_UID, s = t.gl;
      return e._glBuffers[r] = new GLBuffer(s.createBuffer()), this.managedBuffers[e.id] = e, e.disposeRunner.add(this), e._glBuffers[r];
    }, a;
  }()
), Renderer = (
  /** @class */
  function(a) {
    __extends$i(e, a);
    function e(t) {
      var r = a.call(this, RENDERER_TYPE.WEBGL, t) || this;
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
        var s = t.getParameter(t.FRAMEBUFFER_BINDING);
        t.bindFramebuffer(t.FRAMEBUFFER, null), r = t.getParameter(t.SAMPLES), t.bindFramebuffer(t.FRAMEBUFFER, s);
      } else {
        var s = t.getParameter(t.DRAW_FRAMEBUFFER_BINDING);
        t.bindFramebuffer(t.DRAW_FRAMEBUFFER, null), r = t.getParameter(t.SAMPLES), t.bindFramebuffer(t.DRAW_FRAMEBUFFER, s);
      }
      r >= MSAA_QUALITY.HIGH ? this.multisample = MSAA_QUALITY.HIGH : r >= MSAA_QUALITY.MEDIUM ? this.multisample = MSAA_QUALITY.MEDIUM : r >= MSAA_QUALITY.LOW ? this.multisample = MSAA_QUALITY.LOW : this.multisample = MSAA_QUALITY.NONE;
    }, e.prototype.addSystem = function(t, r) {
      var s = new t(this);
      if (this[r])
        throw new Error('Whoops! The name "' + r + '" is already in use');
      this[r] = s;
      for (var o in this.runners)
        this.runners[o].add(s);
      return this;
    }, e.prototype.render = function(t, r) {
      var s, o, u, h;
      if (r && (r instanceof RenderTexture ? (deprecation("6.0.0", "Renderer#render arguments changed, use options instead."), s = r, o = arguments[2], u = arguments[3], h = arguments[4]) : (s = r.renderTexture, o = r.clear, u = r.transform, h = r.skipUpdateTransform)), this.renderingToScreen = !s, this.runners.prerender.emit(), this.emit("prerender"), this.projection.transform = u, !this.context.isLost) {
        if (s || (this._lastObjectRendered = t), !h) {
          var l = t.enableTempParent();
          t.updateTransform(), t.disableTempParent(l);
        }
        this.renderTexture.bind(s), this.batch.currentRenderer.start(), (o !== void 0 ? o : this.clearBeforeRender) && this.renderTexture.clear(), t.render(this), this.batch.currentRenderer.flush(), s && s.baseTexture.update(), this.runners.postrender.emit(), this.projection.transform = null, this.emit("postrender");
      }
    }, e.prototype.generateTexture = function(t, r, s, o) {
      r === void 0 && (r = {});
      var u = a.prototype.generateTexture.call(this, t, r, s, o);
      return this.framebuffer.blit(), u;
    }, e.prototype.resize = function(t, r) {
      a.prototype.resize.call(this, t, r), this.runners.resize.emit(this.screen.height, this.screen.width);
    }, e.prototype.reset = function() {
      return this.runners.reset.emit(), this;
    }, e.prototype.clear = function() {
      this.renderTexture.bind(), this.renderTexture.clear();
    }, e.prototype.destroy = function(t) {
      this.runners.destroy.emit();
      for (var r in this.runners)
        this.runners[r].destroy();
      a.prototype.destroy.call(this, t), this.gl = null;
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
function autoDetectRenderer(a) {
  return Renderer.create(a);
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
`, defaultVertex$1 = $defaultVertex, defaultFilterVertex = $defaultFilterVertex, System = (
  /** @class */
  function() {
    function a(e) {
      deprecation("6.1.0", "System class is deprecated, implemement ISystem interface instead."), this.renderer = e;
    }
    return a.prototype.destroy = function() {
      this.renderer = null;
    }, a;
  }()
), BatchDrawCall = (
  /** @class */
  /* @__PURE__ */ function() {
    function a() {
      this.texArray = null, this.blend = 0, this.type = DRAW_MODES.TRIANGLES, this.start = 0, this.size = 0, this.data = null;
    }
    return a;
  }()
), BatchTextureArray = (
  /** @class */
  function() {
    function a() {
      this.elements = [], this.ids = [], this.count = 0;
    }
    return a.prototype.clear = function() {
      for (var e = 0; e < this.count; e++)
        this.elements[e] = null;
      this.count = 0;
    }, a;
  }()
), ViewableBuffer = (
  /** @class */
  function() {
    function a(e) {
      typeof e == "number" ? this.rawBinaryData = new ArrayBuffer(e) : e instanceof Uint8Array ? this.rawBinaryData = e.buffer : this.rawBinaryData = e, this.uint32View = new Uint32Array(this.rawBinaryData), this.float32View = new Float32Array(this.rawBinaryData);
    }
    return Object.defineProperty(a.prototype, "int8View", {
      /** View on the raw binary data as a `Int8Array`. */
      get: function() {
        return this._int8View || (this._int8View = new Int8Array(this.rawBinaryData)), this._int8View;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(a.prototype, "uint8View", {
      /** View on the raw binary data as a `Uint8Array`. */
      get: function() {
        return this._uint8View || (this._uint8View = new Uint8Array(this.rawBinaryData)), this._uint8View;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(a.prototype, "int16View", {
      /**  View on the raw binary data as a `Int16Array`. */
      get: function() {
        return this._int16View || (this._int16View = new Int16Array(this.rawBinaryData)), this._int16View;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(a.prototype, "uint16View", {
      /** View on the raw binary data as a `Uint16Array`. */
      get: function() {
        return this._uint16View || (this._uint16View = new Uint16Array(this.rawBinaryData)), this._uint16View;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(a.prototype, "int32View", {
      /** View on the raw binary data as a `Int32Array`. */
      get: function() {
        return this._int32View || (this._int32View = new Int32Array(this.rawBinaryData)), this._int32View;
      },
      enumerable: !1,
      configurable: !0
    }), a.prototype.view = function(e) {
      return this[e + "View"];
    }, a.prototype.destroy = function() {
      this.rawBinaryData = null, this._int8View = null, this._uint8View = null, this._int16View = null, this._uint16View = null, this._int32View = null, this.uint32View = null, this.float32View = null;
    }, a.sizeOf = function(e) {
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
    }, a;
  }()
), AbstractBatchRenderer = (
  /** @class */
  function(a) {
    __extends$i(e, a);
    function e(t) {
      var r = a.call(this, t) || this;
      return r.shaderGenerator = null, r.geometryClass = null, r.vertexSize = null, r.state = State.for2d(), r.size = settings.SPRITE_BATCH_SIZE * 4, r._vertexCount = 0, r._indexCount = 0, r._bufferedElements = [], r._bufferedTextures = [], r._bufferSize = 0, r._shader = null, r._packedGeometries = [], r._packedGeometryPoolSize = 2, r._flushId = 0, r._aBuffers = {}, r._iBuffers = {}, r.MAX_TEXTURES = 1, r.renderer.on("prerender", r.onPrerender, r), t.runners.contextChange.add(r), r._dcIndex = 0, r._aIndex = 0, r._iIndex = 0, r._attributeBuffer = null, r._indexBuffer = null, r._tempBoundTextures = [], r;
    }
    return e.prototype.contextChange = function() {
      var t = this.renderer.gl;
      settings.PREFER_ENV === ENV.WEBGL_LEGACY ? this.MAX_TEXTURES = 1 : (this.MAX_TEXTURES = Math.min(t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS), settings.SPRITE_MAX_TEXTURES), this.MAX_TEXTURES = checkMaxIfStatementsInShader(this.MAX_TEXTURES, t)), this._shader = this.shaderGenerator.generateShader(this.MAX_TEXTURES);
      for (var r = 0; r < this._packedGeometryPoolSize; r++)
        this._packedGeometries[r] = new this.geometryClass();
      this.initFlushBuffers();
    }, e.prototype.initFlushBuffers = function() {
      for (var t = e._drawCallPool, r = e._textureArrayPool, s = this.size / 4, o = Math.floor(s / this.MAX_TEXTURES) + 1; t.length < s; )
        t.push(new BatchDrawCall());
      for (; r.length < o; )
        r.push(new BatchTextureArray());
      for (var u = 0; u < this.MAX_TEXTURES; u++)
        this._tempBoundTextures[u] = null;
    }, e.prototype.onPrerender = function() {
      this._flushId = 0;
    }, e.prototype.render = function(t) {
      t._texture.valid && (this._vertexCount + t.vertexData.length / 2 > this.size && this.flush(), this._vertexCount += t.vertexData.length / 2, this._indexCount += t.indices.length, this._bufferedTextures[this._bufferSize] = t._texture.baseTexture, this._bufferedElements[this._bufferSize++] = t);
    }, e.prototype.buildTexturesAndDrawCalls = function() {
      var t = this, r = t._bufferedTextures, s = t.MAX_TEXTURES, o = e._textureArrayPool, u = this.renderer.batch, h = this._tempBoundTextures, l = this.renderer.textureGC.count, c = ++BaseTexture._globalBatch, d = 0, _ = o[0], v = 0;
      u.copyBoundTextures(h, s);
      for (var y = 0; y < this._bufferSize; ++y) {
        var b = r[y];
        r[y] = null, b._batchEnabled !== c && (_.count >= s && (u.boundArray(_, h, c, s), this.buildDrawCalls(_, v, y), v = y, _ = o[++d], ++c), b._batchEnabled = c, b.touched = l, _.elements[_.count++] = b);
      }
      _.count > 0 && (u.boundArray(_, h, c, s), this.buildDrawCalls(_, v, this._bufferSize), ++d, ++c);
      for (var y = 0; y < h.length; y++)
        h[y] = null;
      BaseTexture._globalBatch = c;
    }, e.prototype.buildDrawCalls = function(t, r, s) {
      var o = this, u = o._bufferedElements, h = o._attributeBuffer, l = o._indexBuffer, c = o.vertexSize, d = e._drawCallPool, _ = this._dcIndex, v = this._aIndex, y = this._iIndex, b = d[_];
      b.start = this._iIndex, b.texArray = t;
      for (var g = r; g < s; ++g) {
        var m = u[g], E = m._texture.baseTexture, S = premultiplyBlendMode[E.alphaMode ? 1 : 0][m.blendMode];
        u[g] = null, r < g && b.blend !== S && (b.size = y - b.start, r = g, b = d[++_], b.texArray = t, b.start = y), this.packInterleavedGeometry(m, h, l, v, y), v += m.vertexData.length / 2 * c, y += m.indices.length, b.blend = S;
      }
      r < s && (b.size = y - b.start, ++_), this._dcIndex = _, this._aIndex = v, this._iIndex = y;
    }, e.prototype.bindAndClearTexArray = function(t) {
      for (var r = this.renderer.texture, s = 0; s < t.count; s++)
        r.bind(t.elements[s], t.ids[s]), t.elements[s] = null;
      t.count = 0;
    }, e.prototype.updateGeometry = function() {
      var t = this, r = t._packedGeometries, s = t._attributeBuffer, o = t._indexBuffer;
      settings.CAN_UPLOAD_SAME_BUFFER ? (r[this._flushId]._buffer.update(s.rawBinaryData), r[this._flushId]._indexBuffer.update(o), this.renderer.geometry.updateBuffers()) : (this._packedGeometryPoolSize <= this._flushId && (this._packedGeometryPoolSize++, r[this._flushId] = new this.geometryClass()), r[this._flushId]._buffer.update(s.rawBinaryData), r[this._flushId]._indexBuffer.update(o), this.renderer.geometry.bind(r[this._flushId]), this.renderer.geometry.updateBuffers(), this._flushId++);
    }, e.prototype.drawBatches = function() {
      for (var t = this._dcIndex, r = this.renderer, s = r.gl, o = r.state, u = e._drawCallPool, h = null, l = 0; l < t; l++) {
        var c = u[l], d = c.texArray, _ = c.type, v = c.size, y = c.start, b = c.blend;
        h !== d && (h = d, this.bindAndClearTexArray(d)), this.state.blendMode = b, o.set(this.state), s.drawElements(_, v, s.UNSIGNED_SHORT, y * 2);
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
      this.renderer.off("prerender", this.onPrerender, this), this._aBuffers = null, this._iBuffers = null, this._packedGeometries = null, this._attributeBuffer = null, this._indexBuffer = null, this._shader && (this._shader.destroy(), this._shader = null), a.prototype.destroy.call(this);
    }, e.prototype.getAttributeBuffer = function(t) {
      var r = nextPow2(Math.ceil(t / 8)), s = log2(r), o = r * 8;
      this._aBuffers.length <= s && (this._iBuffers.length = s + 1);
      var u = this._aBuffers[o];
      return u || (this._aBuffers[o] = u = new ViewableBuffer(o * this.vertexSize * 4)), u;
    }, e.prototype.getIndexBuffer = function(t) {
      var r = nextPow2(Math.ceil(t / 12)), s = log2(r), o = r * 12;
      this._iBuffers.length <= s && (this._iBuffers.length = s + 1);
      var u = this._iBuffers[s];
      return u || (this._iBuffers[s] = u = new Uint16Array(o)), u;
    }, e.prototype.packInterleavedGeometry = function(t, r, s, o, u) {
      for (var h = r.uint32View, l = r.float32View, c = o / this.vertexSize, d = t.uvs, _ = t.indices, v = t.vertexData, y = t._texture.baseTexture._batchLocation, b = Math.min(t.worldAlpha, 1), g = b < 1 && t._texture.baseTexture.alphaMode ? premultiplyTint(t._tintRGB, b) : t._tintRGB + (b * 255 << 24), m = 0; m < v.length; m += 2)
        l[o++] = v[m], l[o++] = v[m + 1], l[o++] = d[m], l[o++] = d[m + 1], h[o++] = g, l[o++] = y;
      for (var m = 0; m < _.length; m++)
        s[u++] = c + _[m];
    }, e._drawCallPool = [], e._textureArrayPool = [], e;
  }(ObjectRenderer)
), BatchShaderGenerator = (
  /** @class */
  function() {
    function a(e, t) {
      if (this.vertexSrc = e, this.fragTemplate = t, this.programCache = {}, this.defaultGroupCache = {}, t.indexOf("%count%") < 0)
        throw new Error('Fragment template must contain "%count%".');
      if (t.indexOf("%forloop%") < 0)
        throw new Error('Fragment template must contain "%forloop%".');
    }
    return a.prototype.generateShader = function(e) {
      if (!this.programCache[e]) {
        for (var t = new Int32Array(e), r = 0; r < e; r++)
          t[r] = r;
        this.defaultGroupCache[e] = UniformGroup.from({ uSamplers: t }, !0);
        var s = this.fragTemplate;
        s = s.replace(/%count%/gi, "" + e), s = s.replace(/%forloop%/gi, this.generateSampleSrc(e)), this.programCache[e] = new Program(this.vertexSrc, s);
      }
      var o = {
        tint: new Float32Array([1, 1, 1, 1]),
        translationMatrix: new Matrix(),
        default: this.defaultGroupCache[e]
      };
      return new Shader(this.programCache[e], o);
    }, a.prototype.generateSampleSrc = function(e) {
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
    }, a;
  }()
), BatchGeometry = (
  /** @class */
  function(a) {
    __extends$i(e, a);
    function e(t) {
      t === void 0 && (t = !1);
      var r = a.call(this) || this;
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
    function a() {
    }
    return a.create = function(e) {
      var t = Object.assign({
        vertex: defaultVertex,
        fragment: defaultFragment,
        geometryClass: BatchGeometry,
        vertexSize: 6
      }, e), r = t.vertex, s = t.fragment, o = t.vertexSize, u = t.geometryClass;
      return (
        /** @class */
        function(h) {
          __extends$i(l, h);
          function l(c) {
            var d = h.call(this, c) || this;
            return d.shaderGenerator = new BatchShaderGenerator(r, s), d.geometryClass = u, d.vertexSize = o, d;
          }
          return l;
        }(AbstractBatchRenderer)
      );
    }, Object.defineProperty(a, "defaultVertexSrc", {
      /**
       * The default vertex shader source
       * @readonly
       */
      get: function() {
        return defaultVertex;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(a, "defaultFragmentTemplate", {
      /**
       * The default fragment shader source
       * @readonly
       */
      get: function() {
        return defaultFragment;
      },
      enumerable: !1,
      configurable: !0
    }), a;
  }()
), BatchRenderer = BatchPluginFactory.create();
Object.assign(BatchRenderer, {
  extension: {
    name: "batch",
    type: ExtensionType.RendererPlugin
  }
});
var resources = {}, _loop_1 = function(a) {
  Object.defineProperty(resources, a, {
    get: function() {
      return deprecation("6.0.0", "PIXI.systems." + a + " has moved to PIXI." + a), _resources[a];
    }
  });
};
for (var name in _resources)
  _loop_1(name);
var systems = {}, _loop_2 = function(a) {
  Object.defineProperty(systems, a, {
    get: function() {
      return deprecation("6.0.0", "PIXI.resources." + a + " has moved to PIXI." + a), _systems[a];
    }
  });
};
for (var name in _systems)
  _loop_2(name);
var VERSION = "6.5.10";
const n = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AbstractBatchRenderer,
  AbstractMultiResource,
  AbstractRenderer,
  ArrayResource,
  Attribute,
  BaseImageResource,
  BaseRenderTexture,
  BaseTexture,
  BatchDrawCall,
  BatchGeometry,
  BatchPluginFactory,
  BatchRenderer,
  BatchShaderGenerator,
  BatchSystem,
  BatchTextureArray,
  Buffer,
  BufferResource,
  CanvasResource,
  ContextSystem,
  CubeResource,
  get ExtensionType() {
    return ExtensionType;
  },
  Filter,
  FilterState,
  FilterSystem,
  Framebuffer,
  FramebufferSystem,
  GLFramebuffer,
  GLProgram,
  GLTexture,
  Geometry,
  GeometrySystem,
  IGLUniformData,
  INSTALLED,
  ImageBitmapResource,
  ImageResource,
  MaskData,
  MaskSystem,
  ObjectRenderer,
  Program,
  ProjectionSystem,
  Quad,
  QuadUv,
  RenderTexture,
  RenderTexturePool,
  RenderTextureSystem,
  Renderer,
  Resource,
  SVGResource,
  ScissorSystem,
  Shader,
  ShaderSystem,
  SpriteMaskFilter,
  State,
  StateSystem,
  StencilSystem,
  System,
  Texture,
  TextureGCSystem,
  TextureMatrix,
  TextureSystem,
  TextureUvs,
  UniformGroup,
  VERSION,
  VideoResource,
  ViewableBuffer,
  autoDetectRenderer,
  autoDetectResource,
  checkMaxIfStatementsInShader,
  createUBOElements,
  defaultFilterVertex,
  defaultVertex: defaultVertex$1,
  extensions,
  generateProgram,
  generateUniformBufferSync,
  getTestContext,
  getUBOData,
  resources,
  systems,
  uniformParsers
}, Symbol.toStringTag, { value: "Module" }));
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
    function a(e) {
      this.debug = !1, this._isActive = !1, this._isMobileAccessibility = !1, this.pool = [], this.renderId = 0, this.children = [], this.androidUpdateCount = 0, this.androidUpdateFrequency = 500, this._hookDiv = null, (isMobile.tablet || isMobile.phone) && this.createTouchHook();
      var t = document.createElement("div");
      t.style.width = DIV_TOUCH_SIZE + "px", t.style.height = DIV_TOUCH_SIZE + "px", t.style.position = "absolute", t.style.top = DIV_TOUCH_POS_X + "px", t.style.left = DIV_TOUCH_POS_Y + "px", t.style.zIndex = DIV_TOUCH_ZINDEX.toString(), this.div = t, this.renderer = e, this._onKeyDown = this._onKeyDown.bind(this), this._onMouseMove = this._onMouseMove.bind(this), globalThis.addEventListener("keydown", this._onKeyDown, !1);
    }
    return Object.defineProperty(a.prototype, "isActive", {
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
    }), Object.defineProperty(a.prototype, "isMobileAccessibility", {
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
    }), a.prototype.createTouchHook = function() {
      var e = this, t = document.createElement("button");
      t.style.width = DIV_HOOK_SIZE + "px", t.style.height = DIV_HOOK_SIZE + "px", t.style.position = "absolute", t.style.top = DIV_HOOK_POS_X + "px", t.style.left = DIV_HOOK_POS_Y + "px", t.style.zIndex = DIV_HOOK_ZINDEX.toString(), t.style.backgroundColor = "#FF0000", t.title = "select to enable accessibility for this content", t.addEventListener("focus", function() {
        e._isMobileAccessibility = !0, e.activate(), e.destroyTouchHook();
      }), document.body.appendChild(t), this._hookDiv = t;
    }, a.prototype.destroyTouchHook = function() {
      this._hookDiv && (document.body.removeChild(this._hookDiv), this._hookDiv = null);
    }, a.prototype.activate = function() {
      var e;
      this._isActive || (this._isActive = !0, globalThis.document.addEventListener("mousemove", this._onMouseMove, !0), globalThis.removeEventListener("keydown", this._onKeyDown, !1), this.renderer.on("postrender", this.update, this), (e = this.renderer.view.parentNode) === null || e === void 0 || e.appendChild(this.div));
    }, a.prototype.deactivate = function() {
      var e;
      !this._isActive || this._isMobileAccessibility || (this._isActive = !1, globalThis.document.removeEventListener("mousemove", this._onMouseMove, !0), globalThis.addEventListener("keydown", this._onKeyDown, !1), this.renderer.off("postrender", this.update), (e = this.div.parentNode) === null || e === void 0 || e.removeChild(this.div));
    }, a.prototype.updateAccessibleObjects = function(e) {
      if (!(!e.visible || !e.accessibleChildren)) {
        e.accessible && e.interactive && (e._accessibleActive || this.addChild(e), e.renderId = this.renderId);
        var t = e.children;
        if (t)
          for (var r = 0; r < t.length; r++)
            this.updateAccessibleObjects(t[r]);
      }
    }, a.prototype.update = function() {
      var e = performance.now();
      if (!(isMobile.android.device && e < this.androidUpdateCount) && (this.androidUpdateCount = e + this.androidUpdateFrequency, !!this.renderer.renderingToScreen)) {
        this.renderer._lastObjectRendered && this.updateAccessibleObjects(this.renderer._lastObjectRendered);
        var t = this.renderer.view.getBoundingClientRect(), r = t.left, s = t.top, o = t.width, u = t.height, h = this.renderer, l = h.width, c = h.height, d = h.resolution, _ = o / l * d, v = u / c * d, y = this.div;
        y.style.left = r + "px", y.style.top = s + "px", y.style.width = l + "px", y.style.height = c + "px";
        for (var b = 0; b < this.children.length; b++) {
          var g = this.children[b];
          if (g.renderId !== this.renderId)
            g._accessibleActive = !1, removeItems(this.children, b, 1), this.div.removeChild(g._accessibleDiv), this.pool.push(g._accessibleDiv), g._accessibleDiv = null, b--;
          else {
            y = g._accessibleDiv;
            var m = g.hitArea, E = g.worldTransform;
            g.hitArea ? (y.style.left = (E.tx + m.x * E.a) * _ + "px", y.style.top = (E.ty + m.y * E.d) * v + "px", y.style.width = m.width * E.a * _ + "px", y.style.height = m.height * E.d * v + "px") : (m = g.getBounds(), this.capHitArea(m), y.style.left = m.x * _ + "px", y.style.top = m.y * v + "px", y.style.width = m.width * _ + "px", y.style.height = m.height * v + "px", y.title !== g.accessibleTitle && g.accessibleTitle !== null && (y.title = g.accessibleTitle), y.getAttribute("aria-label") !== g.accessibleHint && g.accessibleHint !== null && y.setAttribute("aria-label", g.accessibleHint)), (g.accessibleTitle !== y.title || g.tabIndex !== y.tabIndex) && (y.title = g.accessibleTitle, y.tabIndex = g.tabIndex, this.debug && this.updateDebugHTML(y));
          }
        }
        this.renderId++;
      }
    }, a.prototype.updateDebugHTML = function(e) {
      e.innerHTML = "type: " + e.type + "</br> title : " + e.title + "</br> tabIndex: " + e.tabIndex;
    }, a.prototype.capHitArea = function(e) {
      e.x < 0 && (e.width += e.x, e.x = 0), e.y < 0 && (e.height += e.y, e.y = 0);
      var t = this.renderer, r = t.width, s = t.height;
      e.x + e.width > r && (e.width = r - e.x), e.y + e.height > s && (e.height = s - e.y);
    }, a.prototype.addChild = function(e) {
      var t = this.pool.pop();
      t || (t = document.createElement("button"), t.style.width = DIV_TOUCH_SIZE + "px", t.style.height = DIV_TOUCH_SIZE + "px", t.style.backgroundColor = this.debug ? "rgba(255,255,255,0.5)" : "transparent", t.style.position = "absolute", t.style.zIndex = DIV_TOUCH_ZINDEX.toString(), t.style.borderStyle = "none", navigator.userAgent.toLowerCase().indexOf("chrome") > -1 ? t.setAttribute("aria-live", "off") : t.setAttribute("aria-live", "polite"), navigator.userAgent.match(/rv:.*Gecko\//) ? t.setAttribute("aria-relevant", "additions") : t.setAttribute("aria-relevant", "text"), t.addEventListener("click", this._onClick.bind(this)), t.addEventListener("focus", this._onFocus.bind(this)), t.addEventListener("focusout", this._onFocusOut.bind(this))), t.style.pointerEvents = e.accessiblePointerEvents, t.type = e.accessibleType, e.accessibleTitle && e.accessibleTitle !== null ? t.title = e.accessibleTitle : (!e.accessibleHint || e.accessibleHint === null) && (t.title = "displayObject " + e.tabIndex), e.accessibleHint && e.accessibleHint !== null && t.setAttribute("aria-label", e.accessibleHint), this.debug && this.updateDebugHTML(t), e._accessibleActive = !0, e._accessibleDiv = t, t.displayObject = e, this.children.push(e), this.div.appendChild(e._accessibleDiv), e._accessibleDiv.tabIndex = e.tabIndex;
    }, a.prototype._onClick = function(e) {
      var t = this.renderer.plugins.interaction, r = e.target.displayObject, s = t.eventData;
      t.dispatchEvent(r, "click", s), t.dispatchEvent(r, "pointertap", s), t.dispatchEvent(r, "tap", s);
    }, a.prototype._onFocus = function(e) {
      e.target.getAttribute("aria-live") || e.target.setAttribute("aria-live", "assertive");
      var t = this.renderer.plugins.interaction, r = e.target.displayObject, s = t.eventData;
      t.dispatchEvent(r, "mouseover", s);
    }, a.prototype._onFocusOut = function(e) {
      e.target.getAttribute("aria-live") || e.target.setAttribute("aria-live", "polite");
      var t = this.renderer.plugins.interaction, r = e.target.displayObject, s = t.eventData;
      t.dispatchEvent(r, "mouseout", s);
    }, a.prototype._onKeyDown = function(e) {
      e.keyCode === KEY_CODE_TAB && this.activate();
    }, a.prototype._onMouseMove = function(e) {
      e.movementX === 0 && e.movementY === 0 || this.deactivate();
    }, a.prototype.destroy = function() {
      this.destroyTouchHook(), this.div = null, globalThis.document.removeEventListener("mousemove", this._onMouseMove, !0), globalThis.removeEventListener("keydown", this._onKeyDown), this.pool = null, this.children = null, this.renderer = null;
    }, a.extension = {
      name: "accessibility",
      type: [
        ExtensionType.RendererPlugin,
        ExtensionType.CanvasRendererPlugin
      ]
    }, a;
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
    function a() {
      this.pressure = 0, this.rotationAngle = 0, this.twist = 0, this.tangentialPressure = 0, this.global = new Point(), this.target = null, this.originalEvent = null, this.identifier = null, this.isPrimary = !1, this.button = 0, this.buttons = 0, this.width = 0, this.height = 0, this.tiltX = 0, this.tiltY = 0, this.pointerType = null, this.pressure = 0, this.rotationAngle = 0, this.twist = 0, this.tangentialPressure = 0;
    }
    return Object.defineProperty(a.prototype, "pointerId", {
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
    }), a.prototype.getLocalPosition = function(e, t, r) {
      return e.worldTransform.applyInverse(r || this.global, t);
    }, a.prototype.copyEvent = function(e) {
      "isPrimary" in e && e.isPrimary && (this.isPrimary = !0), this.button = "button" in e && e.button;
      var t = "buttons" in e && e.buttons;
      this.buttons = Number.isInteger(t) ? t : "which" in e && e.which, this.width = "width" in e && e.width, this.height = "height" in e && e.height, this.tiltX = "tiltX" in e && e.tiltX, this.tiltY = "tiltY" in e && e.tiltY, this.pointerType = "pointerType" in e && e.pointerType, this.pressure = "pressure" in e && e.pressure, this.rotationAngle = "rotationAngle" in e && e.rotationAngle, this.twist = "twist" in e && e.twist || 0, this.tangentialPressure = "tangentialPressure" in e && e.tangentialPressure || 0;
    }, a.prototype.reset = function() {
      this.isPrimary = !1;
    }, a;
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
var extendStatics$h = function(a, e) {
  return extendStatics$h = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, r) {
    t.__proto__ = r;
  } || function(t, r) {
    for (var s in r)
      r.hasOwnProperty(s) && (t[s] = r[s]);
  }, extendStatics$h(a, e);
};
function __extends$h(a, e) {
  extendStatics$h(a, e);
  function t() {
    this.constructor = a;
  }
  a.prototype = e === null ? Object.create(e) : (t.prototype = e.prototype, new t());
}
var InteractionEvent = (
  /** @class */
  function() {
    function a() {
      this.stopped = !1, this.stopsPropagatingAt = null, this.stopPropagationHint = !1, this.target = null, this.currentTarget = null, this.type = null, this.data = null;
    }
    return a.prototype.stopPropagation = function() {
      this.stopped = !0, this.stopPropagationHint = !0, this.stopsPropagatingAt = this.currentTarget;
    }, a.prototype.reset = function() {
      this.stopped = !1, this.stopsPropagatingAt = null, this.stopPropagationHint = !1, this.currentTarget = null, this.target = null;
    }, a;
  }()
), InteractionTrackingData = (
  /** @class */
  function() {
    function a(e) {
      this._pointerId = e, this._flags = a.FLAGS.NONE;
    }
    return a.prototype._doSet = function(e, t) {
      t ? this._flags = this._flags | e : this._flags = this._flags & ~e;
    }, Object.defineProperty(a.prototype, "pointerId", {
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
    }), Object.defineProperty(a.prototype, "flags", {
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
    }), Object.defineProperty(a.prototype, "none", {
      /**
       * Is the tracked event inactive (not over or down)?
       * @private
       * @member {number}
       */
      get: function() {
        return this._flags === a.FLAGS.NONE;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(a.prototype, "over", {
      /**
       * Is the tracked event over the DisplayObject?
       * @private
       * @member {boolean}
       */
      get: function() {
        return (this._flags & a.FLAGS.OVER) !== 0;
      },
      set: function(e) {
        this._doSet(a.FLAGS.OVER, e);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(a.prototype, "rightDown", {
      /**
       * Did the right mouse button come down in the DisplayObject?
       * @private
       * @member {boolean}
       */
      get: function() {
        return (this._flags & a.FLAGS.RIGHT_DOWN) !== 0;
      },
      set: function(e) {
        this._doSet(a.FLAGS.RIGHT_DOWN, e);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(a.prototype, "leftDown", {
      /**
       * Did the left mouse button come down in the DisplayObject?
       * @private
       * @member {boolean}
       */
      get: function() {
        return (this._flags & a.FLAGS.LEFT_DOWN) !== 0;
      },
      set: function(e) {
        this._doSet(a.FLAGS.LEFT_DOWN, e);
      },
      enumerable: !1,
      configurable: !0
    }), a.FLAGS = Object.freeze({
      NONE: 0,
      OVER: 1,
      LEFT_DOWN: 2,
      RIGHT_DOWN: 4
    }), a;
  }()
), TreeSearch = (
  /** @class */
  function() {
    function a() {
      this._tempPoint = new Point();
    }
    return a.prototype.recursiveFindHit = function(e, t, r, s, o) {
      var u;
      if (!t || !t.visible)
        return !1;
      var h = e.data.global;
      o = t.interactive || o;
      var l = !1, c = o, d = !0;
      if (t.hitArea)
        s && (t.worldTransform.applyInverse(h, this._tempPoint), t.hitArea.contains(this._tempPoint.x, this._tempPoint.y) ? l = !0 : (s = !1, d = !1)), c = !1;
      else if (t._mask && s) {
        var _ = t._mask.isMaskData ? t._mask.maskObject : t._mask;
        _ && !(!((u = _.containsPoint) === null || u === void 0) && u.call(_, h)) && (s = !1);
      }
      if (d && t.interactiveChildren && t.children)
        for (var v = t.children, y = v.length - 1; y >= 0; y--) {
          var b = v[y], g = this.recursiveFindHit(e, b, r, s, c);
          if (g) {
            if (!b.parent)
              continue;
            c = !1, g && (e.target && (s = !1), l = !0);
          }
        }
      return o && (s && !e.target && !t.hitArea && t.containsPoint && t.containsPoint(h) && (l = !0), t.interactive && (l && !e.target && (e.target = t), r && r(e, t, !!l))), l;
    }, a.prototype.findHit = function(e, t, r, s) {
      this.recursiveFindHit(e, t, r, s, !1);
    }, a;
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
  set buttonMode(a) {
    a ? this.cursor = "pointer" : this.cursor === "pointer" && (this.cursor = null);
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
  function(a) {
    __extends$h(e, a);
    function e(t, r) {
      var s = a.call(this) || this;
      return r = r || {}, s.renderer = t, s.autoPreventDefault = r.autoPreventDefault !== void 0 ? r.autoPreventDefault : !0, s.interactionFrequency = r.interactionFrequency || 10, s.mouse = new InteractionData(), s.mouse.identifier = MOUSE_POINTER_ID, s.mouse.global.set(-999999), s.activeInteractionData = {}, s.activeInteractionData[MOUSE_POINTER_ID] = s.mouse, s.interactionDataPool = [], s.eventData = new InteractionEvent(), s.interactionDOMElement = null, s.moveWhenInside = !1, s.eventsAdded = !1, s.tickerAdded = !1, s.mouseOverRenderer = !("PointerEvent" in globalThis), s.supportsTouchEvents = "ontouchstart" in globalThis, s.supportsPointerEvents = !!globalThis.PointerEvent, s.onPointerUp = s.onPointerUp.bind(s), s.processPointerUp = s.processPointerUp.bind(s), s.onPointerCancel = s.onPointerCancel.bind(s), s.processPointerCancel = s.processPointerCancel.bind(s), s.onPointerDown = s.onPointerDown.bind(s), s.processPointerDown = s.processPointerDown.bind(s), s.onPointerMove = s.onPointerMove.bind(s), s.processPointerMove = s.processPointerMove.bind(s), s.onPointerOut = s.onPointerOut.bind(s), s.processPointerOverOut = s.processPointerOverOut.bind(s), s.onPointerOver = s.onPointerOver.bind(s), s.cursorStyles = {
        default: "inherit",
        pointer: "pointer"
      }, s.currentCursorMode = null, s.cursor = null, s.resolution = 1, s.delayedEvents = [], s.search = new TreeSearch(), s._tempDisplayObject = new TemporaryDisplayObject(), s._eventListenerOptions = { capture: !0, passive: !1 }, s._useSystemTicker = r.useSystemTicker !== void 0 ? r.useSystemTicker : !0, s.setTargetElement(s.renderer.view, s.renderer.resolution), s;
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
              var s = this.configureInteractionEventForDOMEvent(this.eventData, r.originalEvent, r);
              this.processInteractive(s, this.lastObjectRendered, this.processPointerOverOut, !0);
            }
          }
        this.setCursorMode(this.cursor);
      }
    }, e.prototype.setCursorMode = function(t) {
      t = t || "default";
      var r = !0;
      if (globalThis.OffscreenCanvas && this.interactionDOMElement instanceof OffscreenCanvas && (r = !1), this.currentCursorMode !== t) {
        this.currentCursorMode = t;
        var s = this.cursorStyles[t];
        if (s)
          switch (typeof s) {
            case "string":
              r && (this.interactionDOMElement.style.cursor = s);
              break;
            case "function":
              s(t);
              break;
            case "object":
              r && Object.assign(this.interactionDOMElement.style, s);
              break;
          }
        else r && typeof t == "string" && !Object.prototype.hasOwnProperty.call(this.cursorStyles, t) && (this.interactionDOMElement.style.cursor = t);
      }
    }, e.prototype.dispatchEvent = function(t, r, s) {
      (!s.stopPropagationHint || t === s.stopsPropagatingAt) && (s.currentTarget = t, s.type = r, t.emit(r, s), t[r] && t[r](s));
    }, e.prototype.delayDispatchEvent = function(t, r, s) {
      this.delayedEvents.push({ displayObject: t, eventString: r, eventData: s });
    }, e.prototype.mapPositionToPoint = function(t, r, s) {
      var o;
      this.interactionDOMElement.parentElement ? o = this.interactionDOMElement.getBoundingClientRect() : o = {
        x: 0,
        y: 0,
        width: this.interactionDOMElement.width,
        height: this.interactionDOMElement.height,
        left: 0,
        top: 0
      };
      var u = 1 / this.resolution;
      t.x = (r - o.left) * (this.interactionDOMElement.width / o.width) * u, t.y = (s - o.top) * (this.interactionDOMElement.height / o.height) * u;
    }, e.prototype.processInteractive = function(t, r, s, o) {
      var u = this.search.findHit(t, r, s, o), h = this.delayedEvents;
      if (!h.length)
        return u;
      t.stopPropagationHint = !1;
      var l = h.length;
      this.delayedEvents = [];
      for (var c = 0; c < l; c++) {
        var d = h[c], _ = d.displayObject, v = d.eventString, y = d.eventData;
        y.stopsPropagatingAt === _ && (y.stopPropagationHint = !0), this.dispatchEvent(_, v, y);
      }
      return u;
    }, e.prototype.onPointerDown = function(t) {
      if (!(this.supportsTouchEvents && t.pointerType === "touch")) {
        var r = this.normalizeToPointerData(t);
        if (this.autoPreventDefault && r[0].isNormalized) {
          var s = t.cancelable || !("cancelable" in t);
          s && t.preventDefault();
        }
        for (var o = r.length, u = 0; u < o; u++) {
          var h = r[u], l = this.getInteractionDataForPointerId(h), c = this.configureInteractionEventForDOMEvent(this.eventData, h, l);
          if (c.data.originalEvent = t, this.processInteractive(c, this.lastObjectRendered, this.processPointerDown, !0), this.emit("pointerdown", c), h.pointerType === "touch")
            this.emit("touchstart", c);
          else if (h.pointerType === "mouse" || h.pointerType === "pen") {
            var d = h.button === 2;
            this.emit(d ? "rightdown" : "mousedown", this.eventData);
          }
        }
      }
    }, e.prototype.processPointerDown = function(t, r, s) {
      var o = t.data, u = t.data.identifier;
      if (s) {
        if (r.trackedPointers[u] || (r.trackedPointers[u] = new InteractionTrackingData(u)), this.dispatchEvent(r, "pointerdown", t), o.pointerType === "touch")
          this.dispatchEvent(r, "touchstart", t);
        else if (o.pointerType === "mouse" || o.pointerType === "pen") {
          var h = o.button === 2;
          h ? r.trackedPointers[u].rightDown = !0 : r.trackedPointers[u].leftDown = !0, this.dispatchEvent(r, h ? "rightdown" : "mousedown", t);
        }
      }
    }, e.prototype.onPointerComplete = function(t, r, s) {
      var o = this.normalizeToPointerData(t), u = o.length, h = t.target;
      t.composedPath && t.composedPath().length > 0 && (h = t.composedPath()[0]);
      for (var l = h !== this.interactionDOMElement ? "outside" : "", c = 0; c < u; c++) {
        var d = o[c], _ = this.getInteractionDataForPointerId(d), v = this.configureInteractionEventForDOMEvent(this.eventData, d, _);
        if (v.data.originalEvent = t, this.processInteractive(v, this.lastObjectRendered, s, r || !l), this.emit(r ? "pointercancel" : "pointerup" + l, v), d.pointerType === "mouse" || d.pointerType === "pen") {
          var y = d.button === 2;
          this.emit(y ? "rightup" + l : "mouseup" + l, v);
        } else d.pointerType === "touch" && (this.emit(r ? "touchcancel" : "touchend" + l, v), this.releaseInteractionDataForPointerId(d.pointerId));
      }
    }, e.prototype.onPointerCancel = function(t) {
      this.supportsTouchEvents && t.pointerType === "touch" || this.onPointerComplete(t, !0, this.processPointerCancel);
    }, e.prototype.processPointerCancel = function(t, r) {
      var s = t.data, o = t.data.identifier;
      r.trackedPointers[o] !== void 0 && (delete r.trackedPointers[o], this.dispatchEvent(r, "pointercancel", t), s.pointerType === "touch" && this.dispatchEvent(r, "touchcancel", t));
    }, e.prototype.onPointerUp = function(t) {
      this.supportsTouchEvents && t.pointerType === "touch" || this.onPointerComplete(t, !1, this.processPointerUp);
    }, e.prototype.processPointerUp = function(t, r, s) {
      var o = t.data, u = t.data.identifier, h = r.trackedPointers[u], l = o.pointerType === "touch", c = o.pointerType === "mouse" || o.pointerType === "pen", d = !1;
      if (c) {
        var _ = o.button === 2, v = InteractionTrackingData.FLAGS, y = _ ? v.RIGHT_DOWN : v.LEFT_DOWN, b = h !== void 0 && h.flags & y;
        s ? (this.dispatchEvent(r, _ ? "rightup" : "mouseup", t), b && (this.dispatchEvent(r, _ ? "rightclick" : "click", t), d = !0)) : b && this.dispatchEvent(r, _ ? "rightupoutside" : "mouseupoutside", t), h && (_ ? h.rightDown = !1 : h.leftDown = !1);
      }
      s ? (this.dispatchEvent(r, "pointerup", t), l && this.dispatchEvent(r, "touchend", t), h && ((!c || d) && this.dispatchEvent(r, "pointertap", t), l && (this.dispatchEvent(r, "tap", t), h.over = !1))) : h && (this.dispatchEvent(r, "pointerupoutside", t), l && this.dispatchEvent(r, "touchendoutside", t)), h && h.none && delete r.trackedPointers[u];
    }, e.prototype.onPointerMove = function(t) {
      if (!(this.supportsTouchEvents && t.pointerType === "touch")) {
        var r = this.normalizeToPointerData(t);
        (r[0].pointerType === "mouse" || r[0].pointerType === "pen") && (this._didMove = !0, this.cursor = null);
        for (var s = r.length, o = 0; o < s; o++) {
          var u = r[o], h = this.getInteractionDataForPointerId(u), l = this.configureInteractionEventForDOMEvent(this.eventData, u, h);
          l.data.originalEvent = t, this.processInteractive(l, this.lastObjectRendered, this.processPointerMove, !0), this.emit("pointermove", l), u.pointerType === "touch" && this.emit("touchmove", l), (u.pointerType === "mouse" || u.pointerType === "pen") && this.emit("mousemove", l);
        }
        r[0].pointerType === "mouse" && this.setCursorMode(this.cursor);
      }
    }, e.prototype.processPointerMove = function(t, r, s) {
      var o = t.data, u = o.pointerType === "touch", h = o.pointerType === "mouse" || o.pointerType === "pen";
      h && this.processPointerOverOut(t, r, s), (!this.moveWhenInside || s) && (this.dispatchEvent(r, "pointermove", t), u && this.dispatchEvent(r, "touchmove", t), h && this.dispatchEvent(r, "mousemove", t));
    }, e.prototype.onPointerOut = function(t) {
      if (!(this.supportsTouchEvents && t.pointerType === "touch")) {
        var r = this.normalizeToPointerData(t), s = r[0];
        s.pointerType === "mouse" && (this.mouseOverRenderer = !1, this.setCursorMode(null));
        var o = this.getInteractionDataForPointerId(s), u = this.configureInteractionEventForDOMEvent(this.eventData, s, o);
        u.data.originalEvent = s, this.processInteractive(u, this.lastObjectRendered, this.processPointerOverOut, !1), this.emit("pointerout", u), s.pointerType === "mouse" || s.pointerType === "pen" ? this.emit("mouseout", u) : this.releaseInteractionDataForPointerId(o.identifier);
      }
    }, e.prototype.processPointerOverOut = function(t, r, s) {
      var o = t.data, u = t.data.identifier, h = o.pointerType === "mouse" || o.pointerType === "pen", l = r.trackedPointers[u];
      s && !l && (l = r.trackedPointers[u] = new InteractionTrackingData(u)), l !== void 0 && (s && this.mouseOverRenderer ? (l.over || (l.over = !0, this.delayDispatchEvent(r, "pointerover", t), h && this.delayDispatchEvent(r, "mouseover", t)), h && this.cursor === null && (this.cursor = r.cursor)) : l.over && (l.over = !1, this.dispatchEvent(r, "pointerout", this.eventData), h && this.dispatchEvent(r, "mouseout", t), l.none && delete r.trackedPointers[u]));
    }, e.prototype.onPointerOver = function(t) {
      if (!(this.supportsTouchEvents && t.pointerType === "touch")) {
        var r = this.normalizeToPointerData(t), s = r[0], o = this.getInteractionDataForPointerId(s), u = this.configureInteractionEventForDOMEvent(this.eventData, s, o);
        u.data.originalEvent = s, s.pointerType === "mouse" && (this.mouseOverRenderer = !0), this.emit("pointerover", u), (s.pointerType === "mouse" || s.pointerType === "pen") && this.emit("mouseover", u);
      }
    }, e.prototype.getInteractionDataForPointerId = function(t) {
      var r = t.pointerId, s;
      return r === MOUSE_POINTER_ID || t.pointerType === "mouse" ? s = this.mouse : this.activeInteractionData[r] ? s = this.activeInteractionData[r] : (s = this.interactionDataPool.pop() || new InteractionData(), s.identifier = r, this.activeInteractionData[r] = s), s.copyEvent(t), s;
    }, e.prototype.releaseInteractionDataForPointerId = function(t) {
      var r = this.activeInteractionData[t];
      r && (delete this.activeInteractionData[t], r.reset(), this.interactionDataPool.push(r));
    }, e.prototype.configureInteractionEventForDOMEvent = function(t, r, s) {
      return t.data = s, this.mapPositionToPoint(s.global, r.clientX, r.clientY), r.pointerType === "touch" && (r.globalX = s.global.x, r.globalY = s.global.y), s.originalEvent = r, t.reset(), t;
    }, e.prototype.normalizeToPointerData = function(t) {
      var r = [];
      if (this.supportsTouchEvents && t instanceof TouchEvent)
        for (var s = 0, o = t.changedTouches.length; s < o; s++) {
          var u = t.changedTouches[s];
          typeof u.button > "u" && (u.button = t.touches.length ? 1 : 0), typeof u.buttons > "u" && (u.buttons = t.touches.length ? 1 : 0), typeof u.isPrimary > "u" && (u.isPrimary = t.touches.length === 1 && t.type === "touchstart"), typeof u.width > "u" && (u.width = u.radiusX || 1), typeof u.height > "u" && (u.height = u.radiusY || 1), typeof u.tiltX > "u" && (u.tiltX = 0), typeof u.tiltY > "u" && (u.tiltY = 0), typeof u.pointerType > "u" && (u.pointerType = "touch"), typeof u.pointerId > "u" && (u.pointerId = u.identifier || 0), typeof u.pressure > "u" && (u.pressure = u.force || 0.5), typeof u.twist > "u" && (u.twist = 0), typeof u.tangentialPressure > "u" && (u.tangentialPressure = 0), typeof u.layerX > "u" && (u.layerX = u.offsetX = u.clientX), typeof u.layerY > "u" && (u.layerY = u.offsetY = u.clientY), u.isNormalized = !0, r.push(u);
        }
      else if (!globalThis.MouseEvent || t instanceof MouseEvent && (!this.supportsPointerEvents || !(t instanceof globalThis.PointerEvent))) {
        var h = t;
        typeof h.isPrimary > "u" && (h.isPrimary = !0), typeof h.width > "u" && (h.width = 1), typeof h.height > "u" && (h.height = 1), typeof h.tiltX > "u" && (h.tiltX = 0), typeof h.tiltY > "u" && (h.tiltY = 0), typeof h.pointerType > "u" && (h.pointerType = "mouse"), typeof h.pointerId > "u" && (h.pointerId = MOUSE_POINTER_ID), typeof h.pressure > "u" && (h.pressure = 0.5), typeof h.twist > "u" && (h.twist = 0), typeof h.tangentialPressure > "u" && (h.tangentialPressure = 0), h.isNormalized = !0, r.push(h);
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
    function a(e) {
      this.renderer = e;
    }
    return a.prototype.image = function(e, t, r) {
      var s = new Image();
      return s.src = this.base64(e, t, r), s;
    }, a.prototype.base64 = function(e, t, r) {
      return this.canvas(e).toDataURL(t, r);
    }, a.prototype.canvas = function(e, t) {
      var r = this._rawPixels(e, t), s = r.pixels, o = r.width, u = r.height, h = r.flipY, l = new CanvasRenderTarget(o, u, 1), c = l.context.getImageData(0, 0, o, u);
      if (a.arrayPostDivide(s, c.data), l.context.putImageData(c, 0, 0), h) {
        var d = new CanvasRenderTarget(l.width, l.height, 1);
        d.context.scale(1, -1), d.context.drawImage(l.canvas, 0, -u), l.destroy(), l = d;
      }
      return l.canvas;
    }, a.prototype.pixels = function(e, t) {
      var r = this._rawPixels(e, t).pixels;
      return a.arrayPostDivide(r, r), r;
    }, a.prototype._rawPixels = function(e, t) {
      var r = this.renderer, s, o = !1, u, h = !1;
      if (e)
        if (e instanceof RenderTexture)
          u = e;
        else {
          var l = r.context.webGLVersion >= 2 ? r.multisample : MSAA_QUALITY.NONE;
          if (u = this.renderer.generateTexture(e, { multisample: l }), l !== MSAA_QUALITY.NONE) {
            var c = RenderTexture.create({
              width: u.width,
              height: u.height
            });
            r.framebuffer.bind(u.framebuffer), r.framebuffer.blit(c.framebuffer), r.framebuffer.bind(null), u.destroy(!0), u = c;
          }
          h = !0;
        }
      u ? (s = u.baseTexture.resolution, t = t ?? u.frame, o = !1, r.renderTexture.bind(u)) : (s = r.resolution, t || (t = TEMP_RECT, t.width = r.width, t.height = r.height), o = !0, r.renderTexture.bind(null));
      var d = Math.round(t.width * s), _ = Math.round(t.height * s), v = new Uint8Array(BYTES_PER_PIXEL * d * _), y = r.gl;
      return y.readPixels(Math.round(t.x * s), Math.round(t.y * s), d, _, y.RGBA, y.UNSIGNED_BYTE, v), h && u.destroy(!0), { pixels: v, width: d, height: _, flipY: o };
    }, a.prototype.destroy = function() {
      this.renderer = null;
    }, a.arrayPostDivide = function(e, t) {
      for (var r = 0; r < e.length; r += 4) {
        var s = t[r + 3] = e[r + 3];
        s !== 0 ? (t[r] = Math.round(Math.min(e[r] * 255 / s, 255)), t[r + 1] = Math.round(Math.min(e[r + 1] * 255 / s, 255)), t[r + 2] = Math.round(Math.min(e[r + 2] * 255 / s, 255))) : (t[r] = e[r], t[r + 1] = e[r + 1], t[r + 2] = e[r + 2]);
      }
    }, a.extension = {
      name: "extract",
      type: ExtensionType.RendererPlugin
    }, a;
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
    function a(e, t, r) {
      t === void 0 && (t = !1), this._fn = e, this._once = t, this._thisArg = r, this._next = this._prev = this._owner = null;
    }
    return a.prototype.detach = function() {
      return this._owner === null ? !1 : (this._owner.detach(this), !0);
    }, a;
  }()
);
function _addSignalBinding(a, e) {
  return a._head ? (a._tail._next = e, e._prev = a._tail, a._tail = e) : (a._head = e, a._tail = e), e._owner = a, e;
}
var Signal = (
  /** @class */
  function() {
    function a() {
      this._head = this._tail = void 0;
    }
    return a.prototype.handlers = function(e) {
      e === void 0 && (e = !1);
      var t = this._head;
      if (e)
        return !!t;
      for (var r = []; t; )
        r.push(t), t = t._next;
      return r;
    }, a.prototype.has = function(e) {
      if (!(e instanceof SignalBinding))
        throw new Error("MiniSignal#has(): First arg must be a SignalBinding object.");
      return e._owner === this;
    }, a.prototype.dispatch = function() {
      for (var e = arguments, t = [], r = 0; r < arguments.length; r++)
        t[r] = e[r];
      var s = this._head;
      if (!s)
        return !1;
      for (; s; )
        s._once && this.detach(s), s._fn.apply(s._thisArg, t), s = s._next;
      return !0;
    }, a.prototype.add = function(e, t) {
      if (t === void 0 && (t = null), typeof e != "function")
        throw new Error("MiniSignal#add(): First arg must be a Function.");
      return _addSignalBinding(this, new SignalBinding(e, !1, t));
    }, a.prototype.once = function(e, t) {
      if (t === void 0 && (t = null), typeof e != "function")
        throw new Error("MiniSignal#once(): First arg must be a Function.");
      return _addSignalBinding(this, new SignalBinding(e, !0, t));
    }, a.prototype.detach = function(e) {
      if (!(e instanceof SignalBinding))
        throw new Error("MiniSignal#detach(): First arg must be a SignalBinding object.");
      return e._owner !== this ? this : (e._prev && (e._prev._next = e._next), e._next && (e._next._prev = e._prev), e === this._head ? (this._head = e._next, e._next === null && (this._tail = null)) : e === this._tail && (this._tail = e._prev, this._tail._next = null), e._owner = null, this);
    }, a.prototype.detachAll = function() {
      var e = this._head;
      if (!e)
        return this;
      for (this._head = this._tail = null; e; )
        e._owner = null, e = e._next;
      return this;
    }, a;
  }()
);
function parseUri(a, e) {
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
  }, r = t.parser[e.strictMode ? "strict" : "loose"].exec(a), s = {}, o = 14; o--; )
    s[t.key[o]] = r[o] || "";
  return s[t.q.name] = {}, s[t.key[12]].replace(t.q.parser, function(u, h, l) {
    h && (s[t.q.name][h] = l);
  }), s;
}
var useXdr, tempAnchor = null, STATUS_NONE = 0, STATUS_OK = 200, STATUS_EMPTY = 204, STATUS_IE_BUG_EMPTY = 1223, STATUS_TYPE_OK = 2;
function _noop$1() {
}
function setExtMap(a, e, t) {
  e && e.indexOf(".") === 0 && (e = e.substring(1)), e && (a[e] = t);
}
function reqType(a) {
  return a.toString().replace("object ", "");
}
var LoaderResource = (
  /** @class */
  function() {
    function a(e, t, r) {
      if (this._dequeue = _noop$1, this._onLoadBinding = null, this._elementTimer = 0, this._boundComplete = null, this._boundOnError = null, this._boundOnProgress = null, this._boundOnTimeout = null, this._boundXhrOnError = null, this._boundXhrOnTimeout = null, this._boundXhrOnAbort = null, this._boundXhrOnLoad = null, typeof e != "string" || typeof t != "string")
        throw new Error("Both name and url are required for constructing a resource.");
      r = r || {}, this._flags = 0, this._setFlag(a.STATUS_FLAGS.DATA_URL, t.indexOf("data:") === 0), this.name = e, this.url = t, this.extension = this._getExtension(), this.data = null, this.crossOrigin = r.crossOrigin === !0 ? "anonymous" : r.crossOrigin, this.timeout = r.timeout || 0, this.loadType = r.loadType || this._determineLoadType(), this.xhrType = r.xhrType, this.metadata = r.metadata || {}, this.error = null, this.xhr = null, this.children = [], this.type = a.TYPE.UNKNOWN, this.progressChunk = 0, this._dequeue = _noop$1, this._onLoadBinding = null, this._elementTimer = 0, this._boundComplete = this.complete.bind(this), this._boundOnError = this._onError.bind(this), this._boundOnProgress = this._onProgress.bind(this), this._boundOnTimeout = this._onTimeout.bind(this), this._boundXhrOnError = this._xhrOnError.bind(this), this._boundXhrOnTimeout = this._xhrOnTimeout.bind(this), this._boundXhrOnAbort = this._xhrOnAbort.bind(this), this._boundXhrOnLoad = this._xhrOnLoad.bind(this), this.onStart = new Signal(), this.onProgress = new Signal(), this.onComplete = new Signal(), this.onAfterMiddleware = new Signal();
    }
    return a.setExtensionLoadType = function(e, t) {
      setExtMap(a._loadTypeMap, e, t);
    }, a.setExtensionXhrType = function(e, t) {
      setExtMap(a._xhrTypeMap, e, t);
    }, Object.defineProperty(a.prototype, "isDataUrl", {
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
        return this._hasFlag(a.STATUS_FLAGS.DATA_URL);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(a.prototype, "isComplete", {
      /**
       * Describes if this resource has finished loading. Is true when the resource has completely
       * loaded.
       * @readonly
       * @member {boolean}
       */
      get: function() {
        return this._hasFlag(a.STATUS_FLAGS.COMPLETE);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(a.prototype, "isLoading", {
      /**
       * Describes if this resource is currently loading. Is true when the resource starts loading,
       * and is false again when complete.
       * @readonly
       * @member {boolean}
       */
      get: function() {
        return this._hasFlag(a.STATUS_FLAGS.LOADING);
      },
      enumerable: !1,
      configurable: !0
    }), a.prototype.complete = function() {
      this._clearEvents(), this._finish();
    }, a.prototype.abort = function(e) {
      if (!this.error) {
        if (this.error = new Error(e), this._clearEvents(), this.xhr)
          this.xhr.abort();
        else if (this.xdr)
          this.xdr.abort();
        else if (this.data)
          if (this.data.src)
            this.data.src = a.EMPTY_GIF;
          else
            for (; this.data.firstChild; )
              this.data.removeChild(this.data.firstChild);
        this._finish();
      }
    }, a.prototype.load = function(e) {
      var t = this;
      if (!this.isLoading) {
        if (this.isComplete) {
          e && setTimeout(function() {
            return e(t);
          }, 1);
          return;
        } else e && this.onComplete.once(e);
        switch (this._setFlag(a.STATUS_FLAGS.LOADING, !0), this.onStart.dispatch(this), (this.crossOrigin === !1 || typeof this.crossOrigin != "string") && (this.crossOrigin = this._determineCrossOrigin(this.url)), this.loadType) {
          case a.LOAD_TYPE.IMAGE:
            this.type = a.TYPE.IMAGE, this._loadElement("image");
            break;
          case a.LOAD_TYPE.AUDIO:
            this.type = a.TYPE.AUDIO, this._loadSourceElement("audio");
            break;
          case a.LOAD_TYPE.VIDEO:
            this.type = a.TYPE.VIDEO, this._loadSourceElement("video");
            break;
          case a.LOAD_TYPE.XHR:
          /* falls through */
          default:
            typeof useXdr > "u" && (useXdr = !!(globalThis.XDomainRequest && !("withCredentials" in new XMLHttpRequest()))), useXdr && this.crossOrigin ? this._loadXdr() : this._loadXhr();
            break;
        }
      }
    }, a.prototype._hasFlag = function(e) {
      return (this._flags & e) !== 0;
    }, a.prototype._setFlag = function(e, t) {
      this._flags = t ? this._flags | e : this._flags & ~e;
    }, a.prototype._clearEvents = function() {
      clearTimeout(this._elementTimer), this.data && this.data.removeEventListener && (this.data.removeEventListener("error", this._boundOnError, !1), this.data.removeEventListener("load", this._boundComplete, !1), this.data.removeEventListener("progress", this._boundOnProgress, !1), this.data.removeEventListener("canplaythrough", this._boundComplete, !1)), this.xhr && (this.xhr.removeEventListener ? (this.xhr.removeEventListener("error", this._boundXhrOnError, !1), this.xhr.removeEventListener("timeout", this._boundXhrOnTimeout, !1), this.xhr.removeEventListener("abort", this._boundXhrOnAbort, !1), this.xhr.removeEventListener("progress", this._boundOnProgress, !1), this.xhr.removeEventListener("load", this._boundXhrOnLoad, !1)) : (this.xhr.onerror = null, this.xhr.ontimeout = null, this.xhr.onprogress = null, this.xhr.onload = null));
    }, a.prototype._finish = function() {
      if (this.isComplete)
        throw new Error("Complete called again for an already completed resource.");
      this._setFlag(a.STATUS_FLAGS.COMPLETE, !0), this._setFlag(a.STATUS_FLAGS.LOADING, !1), this.onComplete.dispatch(this);
    }, a.prototype._loadElement = function(e) {
      this.metadata.loadElement ? this.data = this.metadata.loadElement : e === "image" && typeof globalThis.Image < "u" ? this.data = new Image() : this.data = document.createElement(e), this.crossOrigin && (this.data.crossOrigin = this.crossOrigin), this.metadata.skipSource || (this.data.src = this.url), this.data.addEventListener("error", this._boundOnError, !1), this.data.addEventListener("load", this._boundComplete, !1), this.data.addEventListener("progress", this._boundOnProgress, !1), this.timeout && (this._elementTimer = setTimeout(this._boundOnTimeout, this.timeout));
    }, a.prototype._loadSourceElement = function(e) {
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
    }, a.prototype._loadXhr = function() {
      typeof this.xhrType != "string" && (this.xhrType = this._determineXhrType());
      var e = this.xhr = new XMLHttpRequest();
      this.crossOrigin === "use-credentials" && (e.withCredentials = !0), e.open("GET", this.url, !0), e.timeout = this.timeout, this.xhrType === a.XHR_RESPONSE_TYPE.JSON || this.xhrType === a.XHR_RESPONSE_TYPE.DOCUMENT ? e.responseType = a.XHR_RESPONSE_TYPE.TEXT : e.responseType = this.xhrType, e.addEventListener("error", this._boundXhrOnError, !1), e.addEventListener("timeout", this._boundXhrOnTimeout, !1), e.addEventListener("abort", this._boundXhrOnAbort, !1), e.addEventListener("progress", this._boundOnProgress, !1), e.addEventListener("load", this._boundXhrOnLoad, !1), e.send();
    }, a.prototype._loadXdr = function() {
      typeof this.xhrType != "string" && (this.xhrType = this._determineXhrType());
      var e = this.xhr = new globalThis.XDomainRequest();
      e.timeout = this.timeout || 5e3, e.onerror = this._boundXhrOnError, e.ontimeout = this._boundXhrOnTimeout, e.onprogress = this._boundOnProgress, e.onload = this._boundXhrOnLoad, e.open("GET", this.url, !0), setTimeout(function() {
        return e.send();
      }, 1);
    }, a.prototype._createSource = function(e, t, r) {
      r || (r = e + "/" + this._getExtension(t));
      var s = document.createElement("source");
      return s.src = t, s.type = r, s;
    }, a.prototype._onError = function(e) {
      this.abort("Failed to load element using: " + e.target.nodeName);
    }, a.prototype._onProgress = function(e) {
      e && e.lengthComputable && this.onProgress.dispatch(this, e.loaded / e.total);
    }, a.prototype._onTimeout = function() {
      this.abort("Load timed out.");
    }, a.prototype._xhrOnError = function() {
      var e = this.xhr;
      this.abort(reqType(e) + " Request failed. Status: " + e.status + ', text: "' + e.statusText + '"');
    }, a.prototype._xhrOnTimeout = function() {
      var e = this.xhr;
      this.abort(reqType(e) + " Request timed out.");
    }, a.prototype._xhrOnAbort = function() {
      var e = this.xhr;
      this.abort(reqType(e) + " Request was aborted by the user.");
    }, a.prototype._xhrOnLoad = function() {
      var e = this.xhr, t = "", r = typeof e.status > "u" ? STATUS_OK : e.status;
      (e.responseType === "" || e.responseType === "text" || typeof e.responseType > "u") && (t = e.responseText), r === STATUS_NONE && (t.length > 0 || e.responseType === a.XHR_RESPONSE_TYPE.BUFFER) ? r = STATUS_OK : r === STATUS_IE_BUG_EMPTY && (r = STATUS_EMPTY);
      var s = r / 100 | 0;
      if (s === STATUS_TYPE_OK)
        if (this.xhrType === a.XHR_RESPONSE_TYPE.TEXT)
          this.data = t, this.type = a.TYPE.TEXT;
        else if (this.xhrType === a.XHR_RESPONSE_TYPE.JSON)
          try {
            this.data = JSON.parse(t), this.type = a.TYPE.JSON;
          } catch (h) {
            this.abort("Error trying to parse loaded json: " + h);
            return;
          }
        else if (this.xhrType === a.XHR_RESPONSE_TYPE.DOCUMENT)
          try {
            if (globalThis.DOMParser) {
              var o = new DOMParser();
              this.data = o.parseFromString(t, "text/xml");
            } else {
              var u = document.createElement("div");
              u.innerHTML = t, this.data = u;
            }
            this.type = a.TYPE.XML;
          } catch (h) {
            this.abort("Error trying to parse loaded xml: " + h);
            return;
          }
        else
          this.data = e.response || t;
      else {
        this.abort("[" + e.status + "] " + e.statusText + ": " + e.responseURL);
        return;
      }
      this.complete();
    }, a.prototype._determineCrossOrigin = function(e, t) {
      if (e.indexOf("data:") === 0)
        return "";
      if (globalThis.origin !== globalThis.location.origin)
        return "anonymous";
      t = t || globalThis.location, tempAnchor || (tempAnchor = document.createElement("a")), tempAnchor.href = e;
      var r = parseUri(tempAnchor.href, { strictMode: !0 }), s = !r.port && t.port === "" || r.port === t.port, o = r.protocol ? r.protocol + ":" : "";
      return r.host !== t.hostname || !s || o !== t.protocol ? "anonymous" : "";
    }, a.prototype._determineXhrType = function() {
      return a._xhrTypeMap[this.extension] || a.XHR_RESPONSE_TYPE.TEXT;
    }, a.prototype._determineLoadType = function() {
      return a._loadTypeMap[this.extension] || a.LOAD_TYPE.XHR;
    }, a.prototype._getExtension = function(e) {
      e === void 0 && (e = this.url);
      var t = "";
      if (this.isDataUrl) {
        var r = e.indexOf("/");
        t = e.substring(r + 1, e.indexOf(";", r));
      } else {
        var s = e.indexOf("?"), o = e.indexOf("#"), u = Math.min(s > -1 ? s : e.length, o > -1 ? o : e.length);
        e = e.substring(0, u), t = e.substring(e.lastIndexOf(".") + 1);
      }
      return t.toLowerCase();
    }, a.prototype._getMimeFromXhrType = function(e) {
      switch (e) {
        case a.XHR_RESPONSE_TYPE.BUFFER:
          return "application/octet-binary";
        case a.XHR_RESPONSE_TYPE.BLOB:
          return "application/blob";
        case a.XHR_RESPONSE_TYPE.DOCUMENT:
          return "application/xml";
        case a.XHR_RESPONSE_TYPE.JSON:
          return "application/json";
        case a.XHR_RESPONSE_TYPE.DEFAULT:
        case a.XHR_RESPONSE_TYPE.TEXT:
        /* falls through */
        default:
          return "text/plain";
      }
    }, a;
  }()
);
(function(a) {
  (function(e) {
    e[e.NONE = 0] = "NONE", e[e.DATA_URL = 1] = "DATA_URL", e[e.COMPLETE = 2] = "COMPLETE", e[e.LOADING = 4] = "LOADING";
  })(a.STATUS_FLAGS || (a.STATUS_FLAGS = {})), function(e) {
    e[e.UNKNOWN = 0] = "UNKNOWN", e[e.JSON = 1] = "JSON", e[e.XML = 2] = "XML", e[e.IMAGE = 3] = "IMAGE", e[e.AUDIO = 4] = "AUDIO", e[e.VIDEO = 5] = "VIDEO", e[e.TEXT = 6] = "TEXT";
  }(a.TYPE || (a.TYPE = {})), function(e) {
    e[e.XHR = 1] = "XHR", e[e.IMAGE = 2] = "IMAGE", e[e.AUDIO = 3] = "AUDIO", e[e.VIDEO = 4] = "VIDEO";
  }(a.LOAD_TYPE || (a.LOAD_TYPE = {})), function(e) {
    e.DEFAULT = "text", e.BUFFER = "arraybuffer", e.BLOB = "blob", e.DOCUMENT = "document", e.JSON = "json", e.TEXT = "text";
  }(a.XHR_RESPONSE_TYPE || (a.XHR_RESPONSE_TYPE = {})), a._loadTypeMap = {
    // images
    gif: a.LOAD_TYPE.IMAGE,
    png: a.LOAD_TYPE.IMAGE,
    bmp: a.LOAD_TYPE.IMAGE,
    jpg: a.LOAD_TYPE.IMAGE,
    jpeg: a.LOAD_TYPE.IMAGE,
    tif: a.LOAD_TYPE.IMAGE,
    tiff: a.LOAD_TYPE.IMAGE,
    webp: a.LOAD_TYPE.IMAGE,
    tga: a.LOAD_TYPE.IMAGE,
    avif: a.LOAD_TYPE.IMAGE,
    svg: a.LOAD_TYPE.IMAGE,
    "svg+xml": a.LOAD_TYPE.IMAGE,
    // audio
    mp3: a.LOAD_TYPE.AUDIO,
    ogg: a.LOAD_TYPE.AUDIO,
    wav: a.LOAD_TYPE.AUDIO,
    // videos
    mp4: a.LOAD_TYPE.VIDEO,
    webm: a.LOAD_TYPE.VIDEO
  }, a._xhrTypeMap = {
    // xml
    xhtml: a.XHR_RESPONSE_TYPE.DOCUMENT,
    html: a.XHR_RESPONSE_TYPE.DOCUMENT,
    htm: a.XHR_RESPONSE_TYPE.DOCUMENT,
    xml: a.XHR_RESPONSE_TYPE.DOCUMENT,
    tmx: a.XHR_RESPONSE_TYPE.DOCUMENT,
    svg: a.XHR_RESPONSE_TYPE.DOCUMENT,
    // This was added to handle Tiled Tileset XML, but .tsx is also a TypeScript React Component.
    // Since it is way less likely for people to be loading TypeScript files instead of Tiled files,
    // this should probably be fine.
    tsx: a.XHR_RESPONSE_TYPE.DOCUMENT,
    // images
    gif: a.XHR_RESPONSE_TYPE.BLOB,
    png: a.XHR_RESPONSE_TYPE.BLOB,
    bmp: a.XHR_RESPONSE_TYPE.BLOB,
    jpg: a.XHR_RESPONSE_TYPE.BLOB,
    jpeg: a.XHR_RESPONSE_TYPE.BLOB,
    tif: a.XHR_RESPONSE_TYPE.BLOB,
    tiff: a.XHR_RESPONSE_TYPE.BLOB,
    webp: a.XHR_RESPONSE_TYPE.BLOB,
    tga: a.XHR_RESPONSE_TYPE.BLOB,
    avif: a.XHR_RESPONSE_TYPE.BLOB,
    // json
    json: a.XHR_RESPONSE_TYPE.JSON,
    // text
    text: a.XHR_RESPONSE_TYPE.TEXT,
    txt: a.XHR_RESPONSE_TYPE.TEXT,
    // fonts
    ttf: a.XHR_RESPONSE_TYPE.BUFFER,
    otf: a.XHR_RESPONSE_TYPE.BUFFER
  }, a.EMPTY_GIF = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";
})(LoaderResource || (LoaderResource = {}));
function _noop() {
}
function onlyOnce(a) {
  return function() {
    for (var t = arguments, r = [], s = 0; s < arguments.length; s++)
      r[s] = t[s];
    if (a === null)
      throw new Error("Callback was already called.");
    var o = a;
    a = null, o.apply(this, r);
  };
}
var AsyncQueueItem = (
  /** @class */
  /* @__PURE__ */ function() {
    function a(e, t) {
      this.data = e, this.callback = t;
    }
    return a;
  }()
), AsyncQueue = (
  /** @class */
  function() {
    function a(e, t) {
      var r = this;
      if (t === void 0 && (t = 1), this.workers = 0, this.saturated = _noop, this.unsaturated = _noop, this.empty = _noop, this.drain = _noop, this.error = _noop, this.started = !1, this.paused = !1, this._tasks = [], this._insert = function(s, o, u) {
        if (u && typeof u != "function")
          throw new Error("task callback must be a function");
        if (r.started = !0, s == null && r.idle()) {
          setTimeout(function() {
            return r.drain();
          }, 1);
          return;
        }
        var h = new AsyncQueueItem(s, typeof u == "function" ? u : _noop);
        o ? r._tasks.unshift(h) : r._tasks.push(h), setTimeout(r.process, 1);
      }, this.process = function() {
        for (; !r.paused && r.workers < r.concurrency && r._tasks.length; ) {
          var s = r._tasks.shift();
          r._tasks.length === 0 && r.empty(), r.workers += 1, r.workers === r.concurrency && r.saturated(), r._worker(s.data, onlyOnce(r._next(s)));
        }
      }, this._worker = e, t === 0)
        throw new Error("Concurrency must not be zero");
      this.concurrency = t, this.buffer = t / 4;
    }
    return a.prototype._next = function(e) {
      var t = this;
      return function() {
        for (var r = arguments, s = [], o = 0; o < arguments.length; o++)
          s[o] = r[o];
        t.workers -= 1, e.callback.apply(e, s), s[0] != null && t.error(s[0], e.data), t.workers <= t.concurrency - t.buffer && t.unsaturated(), t.idle() && t.drain(), t.process();
      };
    }, a.prototype.push = function(e, t) {
      this._insert(e, !1, t);
    }, a.prototype.kill = function() {
      this.workers = 0, this.drain = _noop, this.started = !1, this._tasks = [];
    }, a.prototype.unshift = function(e, t) {
      this._insert(e, !0, t);
    }, a.prototype.length = function() {
      return this._tasks.length;
    }, a.prototype.running = function() {
      return this.workers;
    }, a.prototype.idle = function() {
      return this._tasks.length + this.workers === 0;
    }, a.prototype.pause = function() {
      this.paused !== !0 && (this.paused = !0);
    }, a.prototype.resume = function() {
      if (this.paused !== !1) {
        this.paused = !1;
        for (var e = 1; e <= this.concurrency; e++)
          this.process();
      }
    }, a.eachSeries = function(e, t, r, s) {
      var o = 0, u = e.length;
      function h(l) {
        if (l || o === u) {
          r && r(l);
          return;
        }
        s ? setTimeout(function() {
          t(e[o++], h);
        }, 1) : t(e[o++], h);
      }
      h();
    }, a.queue = function(e, t) {
      return new a(e, t);
    }, a;
  }()
), MAX_PROGRESS = 100, rgxExtractUrlHash = /(#[\w-]+)?$/, Loader = (
  /** @class */
  function() {
    function a(e, t) {
      var r = this;
      e === void 0 && (e = ""), t === void 0 && (t = 10), this.progress = 0, this.loading = !1, this.defaultQueryString = "", this._beforeMiddleware = [], this._afterMiddleware = [], this._resourcesParsing = [], this._boundLoadResource = function(l, c) {
        return r._loadResource(l, c);
      }, this.resources = {}, this.baseUrl = e, this._beforeMiddleware = [], this._afterMiddleware = [], this._resourcesParsing = [], this._boundLoadResource = function(l, c) {
        return r._loadResource(l, c);
      }, this._queue = AsyncQueue.queue(this._boundLoadResource, t), this._queue.pause(), this.resources = {}, this.onProgress = new Signal(), this.onError = new Signal(), this.onLoad = new Signal(), this.onStart = new Signal(), this.onComplete = new Signal();
      for (var s = 0; s < a._plugins.length; ++s) {
        var o = a._plugins[s], u = o.pre, h = o.use;
        u && this.pre(u), h && this.use(h);
      }
      this._protected = !1;
    }
    return a.prototype._add = function(e, t, r, s) {
      if (this.loading && (!r || !r.parentResource))
        throw new Error("Cannot add resources while the loader is running.");
      if (this.resources[e])
        throw new Error('Resource named "' + e + '" already exists.');
      if (t = this._prepareUrl(t), this.resources[e] = new LoaderResource(e, t, r), typeof s == "function" && this.resources[e].onAfterMiddleware.once(s), this.loading) {
        for (var o = r.parentResource, u = [], h = 0; h < o.children.length; ++h)
          o.children[h].isComplete || u.push(o.children[h]);
        var l = o.progressChunk * (u.length + 1), c = l / (u.length + 2);
        o.children.push(this.resources[e]), o.progressChunk = c;
        for (var h = 0; h < u.length; ++h)
          u[h].progressChunk = c;
        this.resources[e].progressChunk = c;
      }
      return this._queue.push(this.resources[e]), this;
    }, a.prototype.pre = function(e) {
      return this._beforeMiddleware.push(e), this;
    }, a.prototype.use = function(e) {
      return this._afterMiddleware.push(e), this;
    }, a.prototype.reset = function() {
      this.progress = 0, this.loading = !1, this._queue.kill(), this._queue.pause();
      for (var e in this.resources) {
        var t = this.resources[e];
        t._onLoadBinding && t._onLoadBinding.detach(), t.isLoading && t.abort("loader reset");
      }
      return this.resources = {}, this;
    }, a.prototype.load = function(e) {
      if (deprecation("6.5.0", "@pixi/loaders is being replaced with @pixi/assets in the next major release."), typeof e == "function" && this.onComplete.once(e), this.loading)
        return this;
      if (this._queue.idle())
        this._onStart(), this._onComplete();
      else {
        for (var t = this._queue._tasks.length, r = MAX_PROGRESS / t, s = 0; s < this._queue._tasks.length; ++s)
          this._queue._tasks[s].data.progressChunk = r;
        this._onStart(), this._queue.resume();
      }
      return this;
    }, Object.defineProperty(a.prototype, "concurrency", {
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
    }), a.prototype._prepareUrl = function(e) {
      var t = parseUri(e, { strictMode: !0 }), r;
      if (t.protocol || !t.path || e.indexOf("//") === 0 ? r = e : this.baseUrl.length && this.baseUrl.lastIndexOf("/") !== this.baseUrl.length - 1 && e.charAt(0) !== "/" ? r = this.baseUrl + "/" + e : r = this.baseUrl + e, this.defaultQueryString) {
        var s = rgxExtractUrlHash.exec(r)[0];
        r = r.slice(0, r.length - s.length), r.indexOf("?") !== -1 ? r += "&" + this.defaultQueryString : r += "?" + this.defaultQueryString, r += s;
      }
      return r;
    }, a.prototype._loadResource = function(e, t) {
      var r = this;
      e._dequeue = t, AsyncQueue.eachSeries(this._beforeMiddleware, function(s, o) {
        s.call(r, e, function() {
          o(e.isComplete ? {} : null);
        });
      }, function() {
        e.isComplete ? r._onLoad(e) : (e._onLoadBinding = e.onComplete.once(r._onLoad, r), e.load());
      }, !0);
    }, a.prototype._onStart = function() {
      this.progress = 0, this.loading = !0, this.onStart.dispatch(this);
    }, a.prototype._onComplete = function() {
      this.progress = MAX_PROGRESS, this.loading = !1, this.onComplete.dispatch(this, this.resources);
    }, a.prototype._onLoad = function(e) {
      var t = this;
      e._onLoadBinding = null, this._resourcesParsing.push(e), e._dequeue(), AsyncQueue.eachSeries(this._afterMiddleware, function(r, s) {
        r.call(t, e, s);
      }, function() {
        e.onAfterMiddleware.dispatch(e), t.progress = Math.min(MAX_PROGRESS, t.progress + e.progressChunk), t.onProgress.dispatch(t, e), e.error ? t.onError.dispatch(e.error, t, e) : t.onLoad.dispatch(t, e), t._resourcesParsing.splice(t._resourcesParsing.indexOf(e), 1), t._queue.idle() && t._resourcesParsing.length === 0 && t._onComplete();
      }, !0);
    }, a.prototype.destroy = function() {
      this._protected || this.reset();
    }, Object.defineProperty(a, "shared", {
      /** A premade instance of the loader that can be used to load resources. */
      get: function() {
        var e = a._shared;
        return e || (e = new a(), e._protected = !0, a._shared = e), e;
      },
      enumerable: !1,
      configurable: !0
    }), a.registerPlugin = function(e) {
      return deprecation("6.5.0", "Loader.registerPlugin() is deprecated, use extensions.add() instead."), extensions.add({
        type: ExtensionType.Loader,
        ref: e
      }), a;
    }, a._plugins = [], a;
  }()
);
extensions.handleByList(ExtensionType.Loader, Loader._plugins);
Loader.prototype.add = function(e, t, r, s) {
  if (Array.isArray(e)) {
    for (var o = 0; o < e.length; ++o)
      this.add(e[o]);
    return this;
  }
  if (typeof e == "object" && (r = e, s = t || r.callback || r.onComplete, t = r.url, e = r.name || r.key || r.url), typeof t != "string" && (s = r, r = t, t = e), typeof t != "string")
    throw new Error("No url passed to add resource to loader.");
  return typeof r == "function" && (s = r, r = null), this._add(e, t, r, s);
};
var AppLoaderPlugin = (
  /** @class */
  function() {
    function a() {
    }
    return a.init = function(e) {
      e = Object.assign({
        sharedLoader: !1
      }, e), this.loader = e.sharedLoader ? Loader.shared : new Loader();
    }, a.destroy = function() {
      this.loader && (this.loader.destroy(), this.loader = null);
    }, a.extension = ExtensionType.Application, a;
  }()
), TextureLoader = (
  /** @class */
  function() {
    function a() {
    }
    return a.add = function() {
      LoaderResource.setExtensionLoadType("svg", LoaderResource.LOAD_TYPE.XHR), LoaderResource.setExtensionXhrType("svg", LoaderResource.XHR_RESPONSE_TYPE.TEXT);
    }, a.use = function(e, t) {
      if (e.data && (e.type === LoaderResource.TYPE.IMAGE || e.extension === "svg")) {
        var r = e.data, s = e.url, o = e.name, u = e.metadata;
        Texture.fromLoader(r, s, o, u).then(function(h) {
          e.texture = h, t();
        }).catch(t);
      } else
        t();
    }, a.extension = ExtensionType.Loader, a;
  }()
), _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
function encodeBinary(a) {
  for (var e = "", t = 0; t < a.length; ) {
    for (var r = [0, 0, 0], s = [0, 0, 0, 0], o = 0; o < r.length; ++o)
      t < a.length ? r[o] = a.charCodeAt(t++) & 255 : r[o] = 0;
    s[0] = r[0] >> 2, s[1] = (r[0] & 3) << 4 | r[1] >> 4, s[2] = (r[1] & 15) << 2 | r[2] >> 6, s[3] = r[2] & 63;
    var u = t - (a.length - 1);
    switch (u) {
      case 2:
        s[3] = 64, s[2] = 64;
        break;
      case 1:
        s[3] = 64;
        break;
    }
    for (var o = 0; o < s.length; ++o)
      e += _keyStr.charAt(s[o]);
  }
  return e;
}
function parsing(a, e) {
  if (!a.data) {
    e();
    return;
  }
  if (a.xhr && a.xhrType === LoaderResource.XHR_RESPONSE_TYPE.BLOB) {
    if (!self.Blob || typeof a.data == "string") {
      var t = a.xhr.getResponseHeader("content-type");
      if (t && t.indexOf("image") === 0) {
        a.data = new Image(), a.data.src = "data:" + t + ";base64," + encodeBinary(a.xhr.responseText), a.type = LoaderResource.TYPE.IMAGE, a.data.onload = function() {
          a.data.onload = null, e();
        };
        return;
      }
    } else if (a.data.type.indexOf("image") === 0) {
      var r = globalThis.URL || globalThis.webkitURL, s = r.createObjectURL(a.data);
      a.blob = a.data, a.data = new Image(), a.data.src = s, a.type = LoaderResource.TYPE.IMAGE, a.data.onload = function() {
        r.revokeObjectURL(s), a.data.onload = null, e();
      };
      return;
    }
  }
  e();
}
var ParsingLoader = (
  /** @class */
  function() {
    function a() {
    }
    return a.extension = ExtensionType.Loader, a.use = parsing, a;
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
(function(a) {
  a[a.COMPRESSED_RGB_S3TC_DXT1_EXT = 33776] = "COMPRESSED_RGB_S3TC_DXT1_EXT", a[a.COMPRESSED_RGBA_S3TC_DXT1_EXT = 33777] = "COMPRESSED_RGBA_S3TC_DXT1_EXT", a[a.COMPRESSED_RGBA_S3TC_DXT3_EXT = 33778] = "COMPRESSED_RGBA_S3TC_DXT3_EXT", a[a.COMPRESSED_RGBA_S3TC_DXT5_EXT = 33779] = "COMPRESSED_RGBA_S3TC_DXT5_EXT", a[a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT = 35917] = "COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT", a[a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT = 35918] = "COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT", a[a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT = 35919] = "COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT", a[a.COMPRESSED_SRGB_S3TC_DXT1_EXT = 35916] = "COMPRESSED_SRGB_S3TC_DXT1_EXT", a[a.COMPRESSED_R11_EAC = 37488] = "COMPRESSED_R11_EAC", a[a.COMPRESSED_SIGNED_R11_EAC = 37489] = "COMPRESSED_SIGNED_R11_EAC", a[a.COMPRESSED_RG11_EAC = 37490] = "COMPRESSED_RG11_EAC", a[a.COMPRESSED_SIGNED_RG11_EAC = 37491] = "COMPRESSED_SIGNED_RG11_EAC", a[a.COMPRESSED_RGB8_ETC2 = 37492] = "COMPRESSED_RGB8_ETC2", a[a.COMPRESSED_RGBA8_ETC2_EAC = 37496] = "COMPRESSED_RGBA8_ETC2_EAC", a[a.COMPRESSED_SRGB8_ETC2 = 37493] = "COMPRESSED_SRGB8_ETC2", a[a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC = 37497] = "COMPRESSED_SRGB8_ALPHA8_ETC2_EAC", a[a.COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2 = 37494] = "COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2", a[a.COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2 = 37495] = "COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2", a[a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG = 35840] = "COMPRESSED_RGB_PVRTC_4BPPV1_IMG", a[a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG = 35842] = "COMPRESSED_RGBA_PVRTC_4BPPV1_IMG", a[a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG = 35841] = "COMPRESSED_RGB_PVRTC_2BPPV1_IMG", a[a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG = 35843] = "COMPRESSED_RGBA_PVRTC_2BPPV1_IMG", a[a.COMPRESSED_RGB_ETC1_WEBGL = 36196] = "COMPRESSED_RGB_ETC1_WEBGL", a[a.COMPRESSED_RGB_ATC_WEBGL = 35986] = "COMPRESSED_RGB_ATC_WEBGL", a[a.COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL = 35986] = "COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL", a[a.COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL = 34798] = "COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL", a[a.COMPRESSED_RGBA_ASTC_4x4_KHR = 37808] = "COMPRESSED_RGBA_ASTC_4x4_KHR";
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
var extendStatics$g = function(a, e) {
  return extendStatics$g = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, r) {
    t.__proto__ = r;
  } || function(t, r) {
    for (var s in r)
      r.hasOwnProperty(s) && (t[s] = r[s]);
  }, extendStatics$g(a, e);
};
function __extends$g(a, e) {
  extendStatics$g(a, e);
  function t() {
    this.constructor = a;
  }
  a.prototype = e === null ? Object.create(e) : (t.prototype = e.prototype, new t());
}
function __awaiter(a, e, t, r) {
  function s(o) {
    return o instanceof t ? o : new t(function(u) {
      u(o);
    });
  }
  return new (t || (t = Promise))(function(o, u) {
    function h(d) {
      try {
        c(r.next(d));
      } catch (_) {
        u(_);
      }
    }
    function l(d) {
      try {
        c(r.throw(d));
      } catch (_) {
        u(_);
      }
    }
    function c(d) {
      d.done ? o(d.value) : s(d.value).then(h, l);
    }
    c((r = r.apply(a, [])).next());
  });
}
function __generator(a, e) {
  var t = { label: 0, sent: function() {
    if (o[0] & 1)
      throw o[1];
    return o[1];
  }, trys: [], ops: [] }, r, s, o, u;
  return u = { next: h(0), throw: h(1), return: h(2) }, typeof Symbol == "function" && (u[Symbol.iterator] = function() {
    return this;
  }), u;
  function h(c) {
    return function(d) {
      return l([c, d]);
    };
  }
  function l(c) {
    if (r)
      throw new TypeError("Generator is already executing.");
    for (; t; )
      try {
        if (r = 1, s && (o = c[0] & 2 ? s.return : c[0] ? s.throw || ((o = s.return) && o.call(s), 0) : s.next) && !(o = o.call(s, c[1])).done)
          return o;
        switch (s = 0, o && (c = [c[0] & 2, o.value]), c[0]) {
          case 0:
          case 1:
            o = c;
            break;
          case 4:
            return t.label++, { value: c[1], done: !1 };
          case 5:
            t.label++, s = c[1], c = [0];
            continue;
          case 7:
            c = t.ops.pop(), t.trys.pop();
            continue;
          default:
            if (o = t.trys, !(o = o.length > 0 && o[o.length - 1]) && (c[0] === 6 || c[0] === 2)) {
              t = 0;
              continue;
            }
            if (c[0] === 3 && (!o || c[1] > o[0] && c[1] < o[3])) {
              t.label = c[1];
              break;
            }
            if (c[0] === 6 && t.label < o[1]) {
              t.label = o[1], o = c;
              break;
            }
            if (o && t.label < o[2]) {
              t.label = o[2], t.ops.push(c);
              break;
            }
            o[2] && t.ops.pop(), t.trys.pop();
            continue;
        }
        c = e.call(a, t);
      } catch (d) {
        c = [6, d], s = 0;
      } finally {
        r = o = 0;
      }
    if (c[0] & 5)
      throw c[1];
    return { value: c[0] ? c[1] : void 0, done: !0 };
  }
}
var BlobResource = (
  /** @class */
  function(a) {
    __extends$g(e, a);
    function e(t, r) {
      r === void 0 && (r = { width: 1, height: 1, autoLoad: !0 });
      var s = this, o, u;
      return typeof t == "string" ? (o = t, u = new Uint8Array()) : (o = null, u = t), s = a.call(this, u, r) || this, s.origin = o, s.buffer = u ? new ViewableBuffer(u) : null, s.origin && r.autoLoad !== !1 && s.load(), u && u.length && (s.loaded = !0, s.onBlobLoaded(s.buffer.rawBinaryData)), s;
    }
    return e.prototype.onBlobLoaded = function(t) {
    }, e.prototype.load = function() {
      return __awaiter(this, void 0, Promise, function() {
        var t, r, s;
        return __generator(this, function(o) {
          switch (o.label) {
            case 0:
              return [4, fetch(this.origin)];
            case 1:
              return t = o.sent(), [4, t.blob()];
            case 2:
              return r = o.sent(), [4, r.arrayBuffer()];
            case 3:
              return s = o.sent(), this.data = new Uint32Array(s), this.buffer = new ViewableBuffer(s), this.loaded = !0, this.onBlobLoaded(s), this.update(), [2, this];
          }
        });
      });
    }, e;
  }(BufferResource)
), CompressedTextureResource = (
  /** @class */
  function(a) {
    __extends$g(e, a);
    function e(t, r) {
      var s = a.call(this, t, r) || this;
      return s.format = r.format, s.levels = r.levels || 1, s._width = r.width, s._height = r.height, s._extension = e._formatToExtension(s.format), (r.levelBuffers || s.buffer) && (s._levelBuffers = r.levelBuffers || e._createLevelBuffers(
        t instanceof Uint8Array ? t : s.buffer.uint8View,
        s.format,
        s.levels,
        4,
        4,
        // PVRTC has 8x4 blocks in 2bpp mode
        s.width,
        s.height
      )), s;
    }
    return e.prototype.upload = function(t, r, s) {
      var o = t.gl, u = t.context.extensions[this._extension];
      if (!u)
        throw new Error(this._extension + " textures are not supported on the current machine");
      if (!this._levelBuffers)
        return !1;
      for (var h = 0, l = this.levels; h < l; h++) {
        var c = this._levelBuffers[h], d = c.levelID, _ = c.levelWidth, v = c.levelHeight, y = c.levelBuffer;
        o.compressedTexImage2D(o.TEXTURE_2D, d, this.format, _, v, 0, y);
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
    }, e._createLevelBuffers = function(t, r, s, o, u, h, l) {
      for (var c = new Array(s), d = t.byteOffset, _ = h, v = l, y = _ + o - 1 & ~(o - 1), b = v + u - 1 & ~(u - 1), g = y * b * INTERNAL_FORMAT_TO_BYTES_PER_PIXEL[r], m = 0; m < s; m++)
        c[m] = {
          levelID: m,
          levelWidth: s > 1 ? _ : y,
          levelHeight: s > 1 ? v : b,
          levelBuffer: new Uint8Array(t.buffer, d, g)
        }, d += g, _ = _ >> 1 || 1, v = v >> 1 || 1, y = _ + o - 1 & ~(o - 1), b = v + u - 1 & ~(u - 1), g = y * b * INTERNAL_FORMAT_TO_BYTES_PER_PIXEL[r];
      return c;
    }, e;
  }(BlobResource)
), CompressedTextureLoader = (
  /** @class */
  function() {
    function a() {
    }
    return a.use = function(e, t) {
      var r = e.data, s = this;
      if (e.type === LoaderResource.TYPE.JSON && r && r.cacheID && r.textures) {
        for (var o = r.textures, u = void 0, h = void 0, l = 0, c = o.length; l < c; l++) {
          var d = o[l], _ = d.src, v = d.format;
          if (v || (h = _), a.textureFormats[v]) {
            u = _;
            break;
          }
        }
        if (u = u || h, !u) {
          t(new Error("Cannot load compressed-textures in " + e.url + ", make sure you provide a fallback"));
          return;
        }
        if (u === e.url) {
          t(new Error("URL of compressed texture cannot be the same as the manifest's URL"));
          return;
        }
        var y = {
          crossOrigin: e.crossOrigin,
          metadata: e.metadata.imageMetadata,
          parentResource: e
        }, b = url$1.resolve(e.url.replace(s.baseUrl, ""), u), g = r.cacheID;
        s.add(g, b, y, function(m) {
          if (m.error) {
            t(m.error);
            return;
          }
          var E = m.texture, S = E === void 0 ? null : E, P = m.textures, L = P === void 0 ? {} : P;
          Object.assign(e, { texture: S, textures: L }), t();
        });
      } else
        t();
    }, Object.defineProperty(a, "textureExtensions", {
      /**  Map of available texture extensions. */
      get: function() {
        if (!a._textureExtensions) {
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
          a._textureExtensions = r;
        }
        return a._textureExtensions;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(a, "textureFormats", {
      /** Map of available texture formats. */
      get: function() {
        if (!a._textureFormats) {
          var e = a.textureExtensions;
          a._textureFormats = {};
          for (var t in e) {
            var r = e[t];
            r && Object.assign(a._textureFormats, Object.getPrototypeOf(r));
          }
        }
        return a._textureFormats;
      },
      enumerable: !1,
      configurable: !0
    }), a.extension = ExtensionType.Loader, a;
  }()
);
function registerCompressedTextures(a, e, t) {
  var r = {
    textures: {},
    texture: null
  };
  if (!e)
    return r;
  var s = e.map(function(o) {
    return new Texture(new BaseTexture(o, Object.assign({
      mipmap: MIPMAP_MODES.OFF,
      alphaMode: ALPHA_MODES.NO_PREMULTIPLIED_ALPHA
    }, t)));
  });
  return s.forEach(function(o, u) {
    var h = o.baseTexture, l = a + "-" + (u + 1);
    BaseTexture.addToCache(h, l), Texture.addToCache(o, l), u === 0 && (BaseTexture.addToCache(h, a), Texture.addToCache(o, a), r.texture = o), r.textures[l] = o;
  }), r;
}
var _a$1, _b$1, DDS_MAGIC_SIZE = 4, DDS_HEADER_SIZE = 124, DDS_HEADER_PF_SIZE = 32, DDS_HEADER_DX10_SIZE = 20, DDS_MAGIC = 542327876, DDS_FIELDS = {
  SIZE: 1,
  FLAGS: 2,
  HEIGHT: 3,
  WIDTH: 4,
  MIPMAP_COUNT: 7,
  PIXEL_FORMAT: 19
}, DDS_PF_FIELDS = {
  SIZE: 0,
  FLAGS: 1,
  FOURCC: 2,
  RGB_BITCOUNT: 3,
  R_BIT_MASK: 4,
  G_BIT_MASK: 5,
  B_BIT_MASK: 6,
  A_BIT_MASK: 7
}, DDS_DX10_FIELDS = {
  DXGI_FORMAT: 0,
  RESOURCE_DIMENSION: 1,
  MISC_FLAG: 2,
  ARRAY_SIZE: 3,
  MISC_FLAGS2: 4
}, DXGI_FORMAT;
(function(a) {
  a[a.DXGI_FORMAT_UNKNOWN = 0] = "DXGI_FORMAT_UNKNOWN", a[a.DXGI_FORMAT_R32G32B32A32_TYPELESS = 1] = "DXGI_FORMAT_R32G32B32A32_TYPELESS", a[a.DXGI_FORMAT_R32G32B32A32_FLOAT = 2] = "DXGI_FORMAT_R32G32B32A32_FLOAT", a[a.DXGI_FORMAT_R32G32B32A32_UINT = 3] = "DXGI_FORMAT_R32G32B32A32_UINT", a[a.DXGI_FORMAT_R32G32B32A32_SINT = 4] = "DXGI_FORMAT_R32G32B32A32_SINT", a[a.DXGI_FORMAT_R32G32B32_TYPELESS = 5] = "DXGI_FORMAT_R32G32B32_TYPELESS", a[a.DXGI_FORMAT_R32G32B32_FLOAT = 6] = "DXGI_FORMAT_R32G32B32_FLOAT", a[a.DXGI_FORMAT_R32G32B32_UINT = 7] = "DXGI_FORMAT_R32G32B32_UINT", a[a.DXGI_FORMAT_R32G32B32_SINT = 8] = "DXGI_FORMAT_R32G32B32_SINT", a[a.DXGI_FORMAT_R16G16B16A16_TYPELESS = 9] = "DXGI_FORMAT_R16G16B16A16_TYPELESS", a[a.DXGI_FORMAT_R16G16B16A16_FLOAT = 10] = "DXGI_FORMAT_R16G16B16A16_FLOAT", a[a.DXGI_FORMAT_R16G16B16A16_UNORM = 11] = "DXGI_FORMAT_R16G16B16A16_UNORM", a[a.DXGI_FORMAT_R16G16B16A16_UINT = 12] = "DXGI_FORMAT_R16G16B16A16_UINT", a[a.DXGI_FORMAT_R16G16B16A16_SNORM = 13] = "DXGI_FORMAT_R16G16B16A16_SNORM", a[a.DXGI_FORMAT_R16G16B16A16_SINT = 14] = "DXGI_FORMAT_R16G16B16A16_SINT", a[a.DXGI_FORMAT_R32G32_TYPELESS = 15] = "DXGI_FORMAT_R32G32_TYPELESS", a[a.DXGI_FORMAT_R32G32_FLOAT = 16] = "DXGI_FORMAT_R32G32_FLOAT", a[a.DXGI_FORMAT_R32G32_UINT = 17] = "DXGI_FORMAT_R32G32_UINT", a[a.DXGI_FORMAT_R32G32_SINT = 18] = "DXGI_FORMAT_R32G32_SINT", a[a.DXGI_FORMAT_R32G8X24_TYPELESS = 19] = "DXGI_FORMAT_R32G8X24_TYPELESS", a[a.DXGI_FORMAT_D32_FLOAT_S8X24_UINT = 20] = "DXGI_FORMAT_D32_FLOAT_S8X24_UINT", a[a.DXGI_FORMAT_R32_FLOAT_X8X24_TYPELESS = 21] = "DXGI_FORMAT_R32_FLOAT_X8X24_TYPELESS", a[a.DXGI_FORMAT_X32_TYPELESS_G8X24_UINT = 22] = "DXGI_FORMAT_X32_TYPELESS_G8X24_UINT", a[a.DXGI_FORMAT_R10G10B10A2_TYPELESS = 23] = "DXGI_FORMAT_R10G10B10A2_TYPELESS", a[a.DXGI_FORMAT_R10G10B10A2_UNORM = 24] = "DXGI_FORMAT_R10G10B10A2_UNORM", a[a.DXGI_FORMAT_R10G10B10A2_UINT = 25] = "DXGI_FORMAT_R10G10B10A2_UINT", a[a.DXGI_FORMAT_R11G11B10_FLOAT = 26] = "DXGI_FORMAT_R11G11B10_FLOAT", a[a.DXGI_FORMAT_R8G8B8A8_TYPELESS = 27] = "DXGI_FORMAT_R8G8B8A8_TYPELESS", a[a.DXGI_FORMAT_R8G8B8A8_UNORM = 28] = "DXGI_FORMAT_R8G8B8A8_UNORM", a[a.DXGI_FORMAT_R8G8B8A8_UNORM_SRGB = 29] = "DXGI_FORMAT_R8G8B8A8_UNORM_SRGB", a[a.DXGI_FORMAT_R8G8B8A8_UINT = 30] = "DXGI_FORMAT_R8G8B8A8_UINT", a[a.DXGI_FORMAT_R8G8B8A8_SNORM = 31] = "DXGI_FORMAT_R8G8B8A8_SNORM", a[a.DXGI_FORMAT_R8G8B8A8_SINT = 32] = "DXGI_FORMAT_R8G8B8A8_SINT", a[a.DXGI_FORMAT_R16G16_TYPELESS = 33] = "DXGI_FORMAT_R16G16_TYPELESS", a[a.DXGI_FORMAT_R16G16_FLOAT = 34] = "DXGI_FORMAT_R16G16_FLOAT", a[a.DXGI_FORMAT_R16G16_UNORM = 35] = "DXGI_FORMAT_R16G16_UNORM", a[a.DXGI_FORMAT_R16G16_UINT = 36] = "DXGI_FORMAT_R16G16_UINT", a[a.DXGI_FORMAT_R16G16_SNORM = 37] = "DXGI_FORMAT_R16G16_SNORM", a[a.DXGI_FORMAT_R16G16_SINT = 38] = "DXGI_FORMAT_R16G16_SINT", a[a.DXGI_FORMAT_R32_TYPELESS = 39] = "DXGI_FORMAT_R32_TYPELESS", a[a.DXGI_FORMAT_D32_FLOAT = 40] = "DXGI_FORMAT_D32_FLOAT", a[a.DXGI_FORMAT_R32_FLOAT = 41] = "DXGI_FORMAT_R32_FLOAT", a[a.DXGI_FORMAT_R32_UINT = 42] = "DXGI_FORMAT_R32_UINT", a[a.DXGI_FORMAT_R32_SINT = 43] = "DXGI_FORMAT_R32_SINT", a[a.DXGI_FORMAT_R24G8_TYPELESS = 44] = "DXGI_FORMAT_R24G8_TYPELESS", a[a.DXGI_FORMAT_D24_UNORM_S8_UINT = 45] = "DXGI_FORMAT_D24_UNORM_S8_UINT", a[a.DXGI_FORMAT_R24_UNORM_X8_TYPELESS = 46] = "DXGI_FORMAT_R24_UNORM_X8_TYPELESS", a[a.DXGI_FORMAT_X24_TYPELESS_G8_UINT = 47] = "DXGI_FORMAT_X24_TYPELESS_G8_UINT", a[a.DXGI_FORMAT_R8G8_TYPELESS = 48] = "DXGI_FORMAT_R8G8_TYPELESS", a[a.DXGI_FORMAT_R8G8_UNORM = 49] = "DXGI_FORMAT_R8G8_UNORM", a[a.DXGI_FORMAT_R8G8_UINT = 50] = "DXGI_FORMAT_R8G8_UINT", a[a.DXGI_FORMAT_R8G8_SNORM = 51] = "DXGI_FORMAT_R8G8_SNORM", a[a.DXGI_FORMAT_R8G8_SINT = 52] = "DXGI_FORMAT_R8G8_SINT", a[a.DXGI_FORMAT_R16_TYPELESS = 53] = "DXGI_FORMAT_R16_TYPELESS", a[a.DXGI_FORMAT_R16_FLOAT = 54] = "DXGI_FORMAT_R16_FLOAT", a[a.DXGI_FORMAT_D16_UNORM = 55] = "DXGI_FORMAT_D16_UNORM", a[a.DXGI_FORMAT_R16_UNORM = 56] = "DXGI_FORMAT_R16_UNORM", a[a.DXGI_FORMAT_R16_UINT = 57] = "DXGI_FORMAT_R16_UINT", a[a.DXGI_FORMAT_R16_SNORM = 58] = "DXGI_FORMAT_R16_SNORM", a[a.DXGI_FORMAT_R16_SINT = 59] = "DXGI_FORMAT_R16_SINT", a[a.DXGI_FORMAT_R8_TYPELESS = 60] = "DXGI_FORMAT_R8_TYPELESS", a[a.DXGI_FORMAT_R8_UNORM = 61] = "DXGI_FORMAT_R8_UNORM", a[a.DXGI_FORMAT_R8_UINT = 62] = "DXGI_FORMAT_R8_UINT", a[a.DXGI_FORMAT_R8_SNORM = 63] = "DXGI_FORMAT_R8_SNORM", a[a.DXGI_FORMAT_R8_SINT = 64] = "DXGI_FORMAT_R8_SINT", a[a.DXGI_FORMAT_A8_UNORM = 65] = "DXGI_FORMAT_A8_UNORM", a[a.DXGI_FORMAT_R1_UNORM = 66] = "DXGI_FORMAT_R1_UNORM", a[a.DXGI_FORMAT_R9G9B9E5_SHAREDEXP = 67] = "DXGI_FORMAT_R9G9B9E5_SHAREDEXP", a[a.DXGI_FORMAT_R8G8_B8G8_UNORM = 68] = "DXGI_FORMAT_R8G8_B8G8_UNORM", a[a.DXGI_FORMAT_G8R8_G8B8_UNORM = 69] = "DXGI_FORMAT_G8R8_G8B8_UNORM", a[a.DXGI_FORMAT_BC1_TYPELESS = 70] = "DXGI_FORMAT_BC1_TYPELESS", a[a.DXGI_FORMAT_BC1_UNORM = 71] = "DXGI_FORMAT_BC1_UNORM", a[a.DXGI_FORMAT_BC1_UNORM_SRGB = 72] = "DXGI_FORMAT_BC1_UNORM_SRGB", a[a.DXGI_FORMAT_BC2_TYPELESS = 73] = "DXGI_FORMAT_BC2_TYPELESS", a[a.DXGI_FORMAT_BC2_UNORM = 74] = "DXGI_FORMAT_BC2_UNORM", a[a.DXGI_FORMAT_BC2_UNORM_SRGB = 75] = "DXGI_FORMAT_BC2_UNORM_SRGB", a[a.DXGI_FORMAT_BC3_TYPELESS = 76] = "DXGI_FORMAT_BC3_TYPELESS", a[a.DXGI_FORMAT_BC3_UNORM = 77] = "DXGI_FORMAT_BC3_UNORM", a[a.DXGI_FORMAT_BC3_UNORM_SRGB = 78] = "DXGI_FORMAT_BC3_UNORM_SRGB", a[a.DXGI_FORMAT_BC4_TYPELESS = 79] = "DXGI_FORMAT_BC4_TYPELESS", a[a.DXGI_FORMAT_BC4_UNORM = 80] = "DXGI_FORMAT_BC4_UNORM", a[a.DXGI_FORMAT_BC4_SNORM = 81] = "DXGI_FORMAT_BC4_SNORM", a[a.DXGI_FORMAT_BC5_TYPELESS = 82] = "DXGI_FORMAT_BC5_TYPELESS", a[a.DXGI_FORMAT_BC5_UNORM = 83] = "DXGI_FORMAT_BC5_UNORM", a[a.DXGI_FORMAT_BC5_SNORM = 84] = "DXGI_FORMAT_BC5_SNORM", a[a.DXGI_FORMAT_B5G6R5_UNORM = 85] = "DXGI_FORMAT_B5G6R5_UNORM", a[a.DXGI_FORMAT_B5G5R5A1_UNORM = 86] = "DXGI_FORMAT_B5G5R5A1_UNORM", a[a.DXGI_FORMAT_B8G8R8A8_UNORM = 87] = "DXGI_FORMAT_B8G8R8A8_UNORM", a[a.DXGI_FORMAT_B8G8R8X8_UNORM = 88] = "DXGI_FORMAT_B8G8R8X8_UNORM", a[a.DXGI_FORMAT_R10G10B10_XR_BIAS_A2_UNORM = 89] = "DXGI_FORMAT_R10G10B10_XR_BIAS_A2_UNORM", a[a.DXGI_FORMAT_B8G8R8A8_TYPELESS = 90] = "DXGI_FORMAT_B8G8R8A8_TYPELESS", a[a.DXGI_FORMAT_B8G8R8A8_UNORM_SRGB = 91] = "DXGI_FORMAT_B8G8R8A8_UNORM_SRGB", a[a.DXGI_FORMAT_B8G8R8X8_TYPELESS = 92] = "DXGI_FORMAT_B8G8R8X8_TYPELESS", a[a.DXGI_FORMAT_B8G8R8X8_UNORM_SRGB = 93] = "DXGI_FORMAT_B8G8R8X8_UNORM_SRGB", a[a.DXGI_FORMAT_BC6H_TYPELESS = 94] = "DXGI_FORMAT_BC6H_TYPELESS", a[a.DXGI_FORMAT_BC6H_UF16 = 95] = "DXGI_FORMAT_BC6H_UF16", a[a.DXGI_FORMAT_BC6H_SF16 = 96] = "DXGI_FORMAT_BC6H_SF16", a[a.DXGI_FORMAT_BC7_TYPELESS = 97] = "DXGI_FORMAT_BC7_TYPELESS", a[a.DXGI_FORMAT_BC7_UNORM = 98] = "DXGI_FORMAT_BC7_UNORM", a[a.DXGI_FORMAT_BC7_UNORM_SRGB = 99] = "DXGI_FORMAT_BC7_UNORM_SRGB", a[a.DXGI_FORMAT_AYUV = 100] = "DXGI_FORMAT_AYUV", a[a.DXGI_FORMAT_Y410 = 101] = "DXGI_FORMAT_Y410", a[a.DXGI_FORMAT_Y416 = 102] = "DXGI_FORMAT_Y416", a[a.DXGI_FORMAT_NV12 = 103] = "DXGI_FORMAT_NV12", a[a.DXGI_FORMAT_P010 = 104] = "DXGI_FORMAT_P010", a[a.DXGI_FORMAT_P016 = 105] = "DXGI_FORMAT_P016", a[a.DXGI_FORMAT_420_OPAQUE = 106] = "DXGI_FORMAT_420_OPAQUE", a[a.DXGI_FORMAT_YUY2 = 107] = "DXGI_FORMAT_YUY2", a[a.DXGI_FORMAT_Y210 = 108] = "DXGI_FORMAT_Y210", a[a.DXGI_FORMAT_Y216 = 109] = "DXGI_FORMAT_Y216", a[a.DXGI_FORMAT_NV11 = 110] = "DXGI_FORMAT_NV11", a[a.DXGI_FORMAT_AI44 = 111] = "DXGI_FORMAT_AI44", a[a.DXGI_FORMAT_IA44 = 112] = "DXGI_FORMAT_IA44", a[a.DXGI_FORMAT_P8 = 113] = "DXGI_FORMAT_P8", a[a.DXGI_FORMAT_A8P8 = 114] = "DXGI_FORMAT_A8P8", a[a.DXGI_FORMAT_B4G4R4A4_UNORM = 115] = "DXGI_FORMAT_B4G4R4A4_UNORM", a[a.DXGI_FORMAT_P208 = 116] = "DXGI_FORMAT_P208", a[a.DXGI_FORMAT_V208 = 117] = "DXGI_FORMAT_V208", a[a.DXGI_FORMAT_V408 = 118] = "DXGI_FORMAT_V408", a[a.DXGI_FORMAT_SAMPLER_FEEDBACK_MIN_MIP_OPAQUE = 119] = "DXGI_FORMAT_SAMPLER_FEEDBACK_MIN_MIP_OPAQUE", a[a.DXGI_FORMAT_SAMPLER_FEEDBACK_MIP_REGION_USED_OPAQUE = 120] = "DXGI_FORMAT_SAMPLER_FEEDBACK_MIP_REGION_USED_OPAQUE", a[a.DXGI_FORMAT_FORCE_UINT = 121] = "DXGI_FORMAT_FORCE_UINT";
})(DXGI_FORMAT || (DXGI_FORMAT = {}));
var D3D10_RESOURCE_DIMENSION;
(function(a) {
  a[a.DDS_DIMENSION_TEXTURE1D = 2] = "DDS_DIMENSION_TEXTURE1D", a[a.DDS_DIMENSION_TEXTURE2D = 3] = "DDS_DIMENSION_TEXTURE2D", a[a.DDS_DIMENSION_TEXTURE3D = 6] = "DDS_DIMENSION_TEXTURE3D";
})(D3D10_RESOURCE_DIMENSION || (D3D10_RESOURCE_DIMENSION = {}));
var PF_FLAGS = 1, DDPF_ALPHA = 2, DDPF_FOURCC = 4, DDPF_RGB = 64, DDPF_YUV = 512, DDPF_LUMINANCE = 131072, FOURCC_DXT1 = 827611204, FOURCC_DXT3 = 861165636, FOURCC_DXT5 = 894720068, FOURCC_DX10 = 808540228, DDS_RESOURCE_MISC_TEXTURECUBE = 4, FOURCC_TO_FORMAT = (_a$1 = {}, _a$1[FOURCC_DXT1] = INTERNAL_FORMATS.COMPRESSED_RGBA_S3TC_DXT1_EXT, _a$1[FOURCC_DXT3] = INTERNAL_FORMATS.COMPRESSED_RGBA_S3TC_DXT3_EXT, _a$1[FOURCC_DXT5] = INTERNAL_FORMATS.COMPRESSED_RGBA_S3TC_DXT5_EXT, _a$1), DXGI_TO_FORMAT = (_b$1 = {}, // WEBGL_compressed_texture_s3tc
_b$1[DXGI_FORMAT.DXGI_FORMAT_BC1_TYPELESS] = INTERNAL_FORMATS.COMPRESSED_RGBA_S3TC_DXT1_EXT, _b$1[DXGI_FORMAT.DXGI_FORMAT_BC1_UNORM] = INTERNAL_FORMATS.COMPRESSED_RGBA_S3TC_DXT1_EXT, _b$1[DXGI_FORMAT.DXGI_FORMAT_BC2_TYPELESS] = INTERNAL_FORMATS.COMPRESSED_RGBA_S3TC_DXT3_EXT, _b$1[DXGI_FORMAT.DXGI_FORMAT_BC2_UNORM] = INTERNAL_FORMATS.COMPRESSED_RGBA_S3TC_DXT3_EXT, _b$1[DXGI_FORMAT.DXGI_FORMAT_BC3_TYPELESS] = INTERNAL_FORMATS.COMPRESSED_RGBA_S3TC_DXT5_EXT, _b$1[DXGI_FORMAT.DXGI_FORMAT_BC3_UNORM] = INTERNAL_FORMATS.COMPRESSED_RGBA_S3TC_DXT5_EXT, // WEBGL_compressed_texture_s3tc_srgb
_b$1[DXGI_FORMAT.DXGI_FORMAT_BC1_UNORM_SRGB] = INTERNAL_FORMATS.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT, _b$1[DXGI_FORMAT.DXGI_FORMAT_BC2_UNORM_SRGB] = INTERNAL_FORMATS.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT, _b$1[DXGI_FORMAT.DXGI_FORMAT_BC3_UNORM_SRGB] = INTERNAL_FORMATS.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT, _b$1);
function parseDDS(a) {
  var e = new Uint32Array(a), t = e[0];
  if (t !== DDS_MAGIC)
    throw new Error("Invalid DDS file magic word");
  var r = new Uint32Array(a, 0, DDS_HEADER_SIZE / Uint32Array.BYTES_PER_ELEMENT), s = r[DDS_FIELDS.HEIGHT], o = r[DDS_FIELDS.WIDTH], u = r[DDS_FIELDS.MIPMAP_COUNT], h = new Uint32Array(a, DDS_FIELDS.PIXEL_FORMAT * Uint32Array.BYTES_PER_ELEMENT, DDS_HEADER_PF_SIZE / Uint32Array.BYTES_PER_ELEMENT), l = h[PF_FLAGS];
  if (l & DDPF_FOURCC) {
    var c = h[DDS_PF_FIELDS.FOURCC];
    if (c !== FOURCC_DX10) {
      var d = FOURCC_TO_FORMAT[c], _ = DDS_MAGIC_SIZE + DDS_HEADER_SIZE, v = new Uint8Array(a, _), y = new CompressedTextureResource(v, {
        format: d,
        width: o,
        height: s,
        levels: u
        // CompressedTextureResource will separate the levelBuffers for us!
      });
      return [y];
    }
    var b = DDS_MAGIC_SIZE + DDS_HEADER_SIZE, g = new Uint32Array(e.buffer, b, DDS_HEADER_DX10_SIZE / Uint32Array.BYTES_PER_ELEMENT), m = g[DDS_DX10_FIELDS.DXGI_FORMAT], E = g[DDS_DX10_FIELDS.RESOURCE_DIMENSION], S = g[DDS_DX10_FIELDS.MISC_FLAG], P = g[DDS_DX10_FIELDS.ARRAY_SIZE], L = DXGI_TO_FORMAT[m];
    if (L === void 0)
      throw new Error("DDSParser cannot parse texture data with DXGI format " + m);
    if (S === DDS_RESOURCE_MISC_TEXTURECUBE)
      throw new Error("DDSParser does not support cubemap textures");
    if (E === D3D10_RESOURCE_DIMENSION.DDS_DIMENSION_TEXTURE3D)
      throw new Error("DDSParser does not supported 3D texture data");
    var T = new Array(), I = DDS_MAGIC_SIZE + DDS_HEADER_SIZE + DDS_HEADER_DX10_SIZE;
    if (P === 1)
      T.push(new Uint8Array(a, I));
    else {
      for (var w = INTERNAL_FORMAT_TO_BYTES_PER_PIXEL[L], M = 0, F = o, k = s, V = 0; V < u; V++) {
        var X = Math.max(1, F + 3 & -4), ne = Math.max(1, k + 3 & -4), oe = X * ne * w;
        M += oe, F = F >>> 1, k = k >>> 1;
      }
      for (var K = I, V = 0; V < P; V++)
        T.push(new Uint8Array(a, K, M)), K += M;
    }
    return T.map(function(R) {
      return new CompressedTextureResource(R, {
        format: L,
        width: o,
        height: s,
        levels: u
      });
    });
  }
  throw l & DDPF_RGB ? new Error("DDSParser does not support uncompressed texture data.") : l & DDPF_YUV ? new Error("DDSParser does not supported YUV uncompressed texture data.") : l & DDPF_LUMINANCE ? new Error("DDSParser does not support single-channel (lumninance) texture data!") : l & DDPF_ALPHA ? new Error("DDSParser does not support single-channel (alpha) texture data!") : new Error("DDSParser failed to load a texture file due to an unknown reason!");
}
var _a$3, _b, _c, FILE_IDENTIFIER = [171, 75, 84, 88, 32, 49, 49, 187, 13, 10, 26, 10], ENDIANNESS = 67305985, KTX_FIELDS = {
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
}, FILE_HEADER_SIZE = 64, TYPES_TO_BYTES_PER_COMPONENT = (_a$3 = {}, _a$3[TYPES.UNSIGNED_BYTE] = 1, _a$3[TYPES.UNSIGNED_SHORT] = 2, _a$3[TYPES.INT] = 4, _a$3[TYPES.UNSIGNED_INT] = 4, _a$3[TYPES.FLOAT] = 4, _a$3[TYPES.HALF_FLOAT] = 8, _a$3), FORMATS_TO_COMPONENTS = (_b = {}, _b[FORMATS.RGBA] = 4, _b[FORMATS.RGB] = 3, _b[FORMATS.RG] = 2, _b[FORMATS.RED] = 1, _b[FORMATS.LUMINANCE] = 1, _b[FORMATS.LUMINANCE_ALPHA] = 2, _b[FORMATS.ALPHA] = 1, _b), TYPES_TO_BYTES_PER_PIXEL = (_c = {}, _c[TYPES.UNSIGNED_SHORT_4_4_4_4] = 2, _c[TYPES.UNSIGNED_SHORT_5_5_5_1] = 2, _c[TYPES.UNSIGNED_SHORT_5_6_5] = 2, _c);
function parseKTX(a, e, t) {
  t === void 0 && (t = !1);
  var r = new DataView(e);
  if (!validate(a, r))
    return null;
  var s = r.getUint32(KTX_FIELDS.ENDIANNESS, !0) === ENDIANNESS, o = r.getUint32(KTX_FIELDS.GL_TYPE, s), u = r.getUint32(KTX_FIELDS.GL_FORMAT, s), h = r.getUint32(KTX_FIELDS.GL_INTERNAL_FORMAT, s), l = r.getUint32(KTX_FIELDS.PIXEL_WIDTH, s), c = r.getUint32(KTX_FIELDS.PIXEL_HEIGHT, s) || 1, d = r.getUint32(KTX_FIELDS.PIXEL_DEPTH, s) || 1, _ = r.getUint32(KTX_FIELDS.NUMBER_OF_ARRAY_ELEMENTS, s) || 1, v = r.getUint32(KTX_FIELDS.NUMBER_OF_FACES, s), y = r.getUint32(KTX_FIELDS.NUMBER_OF_MIPMAP_LEVELS, s), b = r.getUint32(KTX_FIELDS.BYTES_OF_KEY_VALUE_DATA, s);
  if (c === 0 || d !== 1)
    throw new Error("Only 2D textures are supported");
  if (v !== 1)
    throw new Error("CubeTextures are not supported by KTXLoader yet!");
  if (_ !== 1)
    throw new Error("WebGL does not support array textures");
  var g = 4, m = 4, E = l + 3 & -4, S = c + 3 & -4, P = new Array(_), L = l * c;
  o === 0 && (L = E * S);
  var T;
  if (o !== 0 ? TYPES_TO_BYTES_PER_COMPONENT[o] ? T = TYPES_TO_BYTES_PER_COMPONENT[o] * FORMATS_TO_COMPONENTS[u] : T = TYPES_TO_BYTES_PER_PIXEL[o] : T = INTERNAL_FORMAT_TO_BYTES_PER_PIXEL[h], T === void 0)
    throw new Error("Unable to resolve the pixel format stored in the *.ktx file!");
  for (var I = t ? parseKvData(r, b, s) : null, w = L * T, M = w, F = l, k = c, V = E, X = S, ne = FILE_HEADER_SIZE + b, oe = 0; oe < y; oe++) {
    for (var K = r.getUint32(ne, s), R = ne + 4, O = 0; O < _; O++) {
      var A = P[O];
      A || (A = P[O] = new Array(y)), A[oe] = {
        levelID: oe,
        // don't align mipWidth when texture not compressed! (glType not zero)
        levelWidth: y > 1 || o !== 0 ? F : V,
        levelHeight: y > 1 || o !== 0 ? k : X,
        levelBuffer: new Uint8Array(e, R, M)
      }, R += M;
    }
    ne += K + 4, ne = ne % 4 !== 0 ? ne + 4 - ne % 4 : ne, F = F >> 1 || 1, k = k >> 1 || 1, V = F + g - 1 & ~(g - 1), X = k + m - 1 & ~(m - 1), M = V * X * T;
  }
  return o !== 0 ? {
    uncompressed: P.map(function(B) {
      var N = B[0].levelBuffer, D = !1;
      return o === TYPES.FLOAT ? N = new Float32Array(B[0].levelBuffer.buffer, B[0].levelBuffer.byteOffset, B[0].levelBuffer.byteLength / 4) : o === TYPES.UNSIGNED_INT ? (D = !0, N = new Uint32Array(B[0].levelBuffer.buffer, B[0].levelBuffer.byteOffset, B[0].levelBuffer.byteLength / 4)) : o === TYPES.INT && (D = !0, N = new Int32Array(B[0].levelBuffer.buffer, B[0].levelBuffer.byteOffset, B[0].levelBuffer.byteLength / 4)), {
        resource: new BufferResource(N, {
          width: B[0].levelWidth,
          height: B[0].levelHeight
        }),
        type: o,
        format: D ? convertFormatToInteger(u) : u
      };
    }),
    kvData: I
  } : {
    compressed: P.map(function(B) {
      return new CompressedTextureResource(null, {
        format: h,
        width: l,
        height: c,
        levels: y,
        levelBuffers: B
      });
    }),
    kvData: I
  };
}
function validate(a, e) {
  for (var t = 0; t < FILE_IDENTIFIER.length; t++)
    if (e.getUint8(t) !== FILE_IDENTIFIER[t])
      return console.error(a + " is not a valid *.ktx file!"), !1;
  return !0;
}
function convertFormatToInteger(a) {
  switch (a) {
    case FORMATS.RGBA:
      return FORMATS.RGBA_INTEGER;
    case FORMATS.RGB:
      return FORMATS.RGB_INTEGER;
    case FORMATS.RG:
      return FORMATS.RG_INTEGER;
    case FORMATS.RED:
      return FORMATS.RED_INTEGER;
    default:
      return a;
  }
}
function parseKvData(a, e, t) {
  for (var r = /* @__PURE__ */ new Map(), s = 0; s < e; ) {
    var o = a.getUint32(FILE_HEADER_SIZE + s, t), u = FILE_HEADER_SIZE + s + 4, h = 3 - (o + 3) % 4;
    if (o === 0 || o > e - s) {
      console.error("KTXLoader: keyAndValueByteSize out of bounds");
      break;
    }
    for (var l = 0; l < o && a.getUint8(u + l) !== 0; l++)
      ;
    if (l === -1) {
      console.error("KTXLoader: Failed to find null byte terminating kvData key");
      break;
    }
    var c = new TextDecoder().decode(new Uint8Array(a.buffer, u, l)), d = new DataView(a.buffer, u + l + 1, o - l - 1);
    r.set(c, d), s += 4 + o + h;
  }
  return r;
}
LoaderResource.setExtensionXhrType("dds", LoaderResource.XHR_RESPONSE_TYPE.BUFFER);
var DDSLoader = (
  /** @class */
  function() {
    function a() {
    }
    return a.use = function(e, t) {
      if (e.extension === "dds" && e.data)
        try {
          Object.assign(e, registerCompressedTextures(e.name || e.url, parseDDS(e.data), e.metadata));
        } catch (r) {
          t(r);
          return;
        }
      t();
    }, a.extension = ExtensionType.Loader, a;
  }()
);
LoaderResource.setExtensionXhrType("ktx", LoaderResource.XHR_RESPONSE_TYPE.BUFFER);
var KTXLoader = (
  /** @class */
  function() {
    function a() {
    }
    return a.use = function(e, t) {
      if (e.extension === "ktx" && e.data)
        try {
          var r = e.name || e.url, s = parseKTX(r, e.data, this.loadKeyValueData), o = s.compressed, u = s.uncompressed, h = s.kvData;
          if (o) {
            var l = registerCompressedTextures(r, o, e.metadata);
            if (h && l.textures)
              for (var c in l.textures)
                l.textures[c].baseTexture.ktxKeyValueData = h;
            Object.assign(e, l);
          } else if (u) {
            var d = {};
            u.forEach(function(_, v) {
              var y = new Texture(new BaseTexture(_.resource, {
                mipmap: MIPMAP_MODES.OFF,
                alphaMode: ALPHA_MODES.NO_PREMULTIPLIED_ALPHA,
                type: _.type,
                format: _.format
              })), b = r + "-" + (v + 1);
              h && (y.baseTexture.ktxKeyValueData = h), BaseTexture.addToCache(y.baseTexture, b), Texture.addToCache(y, b), v === 0 && (d[r] = y, BaseTexture.addToCache(y.baseTexture, r), Texture.addToCache(y, r)), d[b] = y;
            }), Object.assign(e, { textures: d });
          }
        } catch (_) {
          t(_);
          return;
        }
      t();
    }, a.extension = ExtensionType.Loader, a.loadKeyValueData = !1, a;
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
var extendStatics$f = function(a, e) {
  return extendStatics$f = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, r) {
    t.__proto__ = r;
  } || function(t, r) {
    for (var s in r)
      r.hasOwnProperty(s) && (t[s] = r[s]);
  }, extendStatics$f(a, e);
};
function __extends$f(a, e) {
  extendStatics$f(a, e);
  function t() {
    this.constructor = a;
  }
  a.prototype = e === null ? Object.create(e) : (t.prototype = e.prototype, new t());
}
(function(a) {
  __extends$f(e, a);
  function e(t, r, s, o) {
    t === void 0 && (t = 1500), s === void 0 && (s = 16384), o === void 0 && (o = !1);
    var u = a.call(this) || this, h = 16384;
    return s > h && (s = h), u._properties = [!1, !0, !1, !1, !1], u._maxSize = t, u._batchSize = s, u._buffers = null, u._bufferUpdateIDs = [], u._updateID = 0, u.interactiveChildren = !1, u.blendMode = BLEND_MODES.NORMAL, u.autoResize = o, u.roundPixels = !0, u.baseTexture = null, u.setProperties(r), u._tint = 0, u.tintRgb = new Float32Array(4), u.tint = 16777215, u;
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
    a.prototype.destroy.call(this, t), this.dispose(), this._properties = null, this._buffers = null, this._bufferUpdateIDs = null;
  }, e;
})(Container);
var ParticleBuffer = (
  /** @class */
  function() {
    function a(e, t, r) {
      this.geometry = new Geometry(), this.indexBuffer = null, this.size = r, this.dynamicProperties = [], this.staticProperties = [];
      for (var s = 0; s < e.length; ++s) {
        var o = e[s];
        o = {
          attributeName: o.attributeName,
          size: o.size,
          uploadFunction: o.uploadFunction,
          type: o.type || TYPES.FLOAT,
          offset: o.offset
        }, t[s] ? this.dynamicProperties.push(o) : this.staticProperties.push(o);
      }
      this.staticStride = 0, this.staticBuffer = null, this.staticData = null, this.staticDataUint32 = null, this.dynamicStride = 0, this.dynamicBuffer = null, this.dynamicData = null, this.dynamicDataUint32 = null, this._updateID = 0, this.initBuffers();
    }
    return a.prototype.initBuffers = function() {
      var e = this.geometry, t = 0;
      this.indexBuffer = new Buffer(createIndicesForQuads(this.size), !0, !0), e.addIndex(this.indexBuffer), this.dynamicStride = 0;
      for (var r = 0; r < this.dynamicProperties.length; ++r) {
        var s = this.dynamicProperties[r];
        s.offset = t, t += s.size, this.dynamicStride += s.size;
      }
      var o = new ArrayBuffer(this.size * this.dynamicStride * 4 * 4);
      this.dynamicData = new Float32Array(o), this.dynamicDataUint32 = new Uint32Array(o), this.dynamicBuffer = new Buffer(this.dynamicData, !1, !1);
      var u = 0;
      this.staticStride = 0;
      for (var r = 0; r < this.staticProperties.length; ++r) {
        var s = this.staticProperties[r];
        s.offset = u, u += s.size, this.staticStride += s.size;
      }
      var h = new ArrayBuffer(this.size * this.staticStride * 4 * 4);
      this.staticData = new Float32Array(h), this.staticDataUint32 = new Uint32Array(h), this.staticBuffer = new Buffer(this.staticData, !0, !1);
      for (var r = 0; r < this.dynamicProperties.length; ++r) {
        var s = this.dynamicProperties[r];
        e.addAttribute(s.attributeName, this.dynamicBuffer, 0, s.type === TYPES.UNSIGNED_BYTE, s.type, this.dynamicStride * 4, s.offset * 4);
      }
      for (var r = 0; r < this.staticProperties.length; ++r) {
        var s = this.staticProperties[r];
        e.addAttribute(s.attributeName, this.staticBuffer, 0, s.type === TYPES.UNSIGNED_BYTE, s.type, this.staticStride * 4, s.offset * 4);
      }
    }, a.prototype.uploadDynamic = function(e, t, r) {
      for (var s = 0; s < this.dynamicProperties.length; s++) {
        var o = this.dynamicProperties[s];
        o.uploadFunction(e, t, r, o.type === TYPES.UNSIGNED_BYTE ? this.dynamicDataUint32 : this.dynamicData, this.dynamicStride, o.offset);
      }
      this.dynamicBuffer._updateID++;
    }, a.prototype.uploadStatic = function(e, t, r) {
      for (var s = 0; s < this.staticProperties.length; s++) {
        var o = this.staticProperties[s];
        o.uploadFunction(e, t, r, o.type === TYPES.UNSIGNED_BYTE ? this.staticDataUint32 : this.staticData, this.staticStride, o.offset);
      }
      this.staticBuffer._updateID++;
    }, a.prototype.destroy = function() {
      this.indexBuffer = null, this.dynamicProperties = null, this.dynamicBuffer = null, this.dynamicData = null, this.dynamicDataUint32 = null, this.staticProperties = null, this.staticBuffer = null, this.staticData = null, this.staticDataUint32 = null, this.geometry.destroy();
    }, a;
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
  function(a) {
    __extends$f(e, a);
    function e(t) {
      var r = a.call(this, t) || this;
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
      var r = t.children, s = t._maxSize, o = t._batchSize, u = this.renderer, h = r.length;
      if (h !== 0) {
        h > s && !t.autoResize && (h = s);
        var l = t._buffers;
        l || (l = t._buffers = this.generateBuffers(t));
        var c = r[0]._texture.baseTexture, d = c.alphaMode > 0;
        this.state.blendMode = correctBlendMode(t.blendMode, d), u.state.set(this.state);
        var _ = u.gl, v = t.worldTransform.copyTo(this.tempMatrix);
        v.prepend(u.globalUniforms.uniforms.projectionMatrix), this.shader.uniforms.translationMatrix = v.toArray(!0), this.shader.uniforms.uColor = premultiplyRgba(t.tintRgb, t.worldAlpha, this.shader.uniforms.uColor, d), this.shader.uniforms.uSampler = c, this.renderer.shader.bind(this.shader);
        for (var y = !1, b = 0, g = 0; b < h; b += o, g += 1) {
          var m = h - b;
          m > o && (m = o), g >= l.length && l.push(this._generateOneMoreBuffer(t));
          var E = l[g];
          E.uploadDynamic(r, b, m);
          var S = t._bufferUpdateIDs[g] || 0;
          y = y || E._updateID < S, y && (E._updateID = t._updateID, E.uploadStatic(r, b, m)), u.geometry.bind(E.geometry), _.drawElements(_.TRIANGLES, m * 6, _.UNSIGNED_SHORT, 0);
        }
      }
    }, e.prototype.generateBuffers = function(t) {
      for (var r = [], s = t._maxSize, o = t._batchSize, u = t._properties, h = 0; h < s; h += o)
        r.push(new ParticleBuffer(this.properties, u, o));
      return r;
    }, e.prototype._generateOneMoreBuffer = function(t) {
      var r = t._batchSize, s = t._properties;
      return new ParticleBuffer(this.properties, s, r);
    }, e.prototype.uploadVertices = function(t, r, s, o, u, h) {
      for (var l = 0, c = 0, d = 0, _ = 0, v = 0; v < s; ++v) {
        var y = t[r + v], b = y._texture, g = y.scale.x, m = y.scale.y, E = b.trim, S = b.orig;
        E ? (c = E.x - y.anchor.x * S.width, l = c + E.width, _ = E.y - y.anchor.y * S.height, d = _ + E.height) : (l = S.width * (1 - y.anchor.x), c = S.width * -y.anchor.x, d = S.height * (1 - y.anchor.y), _ = S.height * -y.anchor.y), o[h] = c * g, o[h + 1] = _ * m, o[h + u] = l * g, o[h + u + 1] = _ * m, o[h + u * 2] = l * g, o[h + u * 2 + 1] = d * m, o[h + u * 3] = c * g, o[h + u * 3 + 1] = d * m, h += u * 4;
      }
    }, e.prototype.uploadPosition = function(t, r, s, o, u, h) {
      for (var l = 0; l < s; l++) {
        var c = t[r + l].position;
        o[h] = c.x, o[h + 1] = c.y, o[h + u] = c.x, o[h + u + 1] = c.y, o[h + u * 2] = c.x, o[h + u * 2 + 1] = c.y, o[h + u * 3] = c.x, o[h + u * 3 + 1] = c.y, h += u * 4;
      }
    }, e.prototype.uploadRotation = function(t, r, s, o, u, h) {
      for (var l = 0; l < s; l++) {
        var c = t[r + l].rotation;
        o[h] = c, o[h + u] = c, o[h + u * 2] = c, o[h + u * 3] = c, h += u * 4;
      }
    }, e.prototype.uploadUvs = function(t, r, s, o, u, h) {
      for (var l = 0; l < s; ++l) {
        var c = t[r + l]._texture._uvs;
        c ? (o[h] = c.x0, o[h + 1] = c.y0, o[h + u] = c.x1, o[h + u + 1] = c.y1, o[h + u * 2] = c.x2, o[h + u * 2 + 1] = c.y2, o[h + u * 3] = c.x3, o[h + u * 3 + 1] = c.y3, h += u * 4) : (o[h] = 0, o[h + 1] = 0, o[h + u] = 0, o[h + u + 1] = 0, o[h + u * 2] = 0, o[h + u * 2 + 1] = 0, o[h + u * 3] = 0, o[h + u * 3 + 1] = 0, h += u * 4);
      }
    }, e.prototype.uploadTint = function(t, r, s, o, u, h) {
      for (var l = 0; l < s; ++l) {
        var c = t[r + l], d = c._texture.baseTexture.alphaMode > 0, _ = c.alpha, v = _ < 1 && d ? premultiplyTint(c._tintRGB, _) : c._tintRGB + (_ * 255 << 24);
        o[h] = v, o[h + u] = v, o[h + u * 2] = v, o[h + u * 3] = v, h += u * 4;
      }
    }, e.prototype.destroy = function() {
      a.prototype.destroy.call(this), this.shader && (this.shader.destroy(), this.shader = null), this.tempMatrix = null;
    }, e.extension = {
      name: "particle",
      type: ExtensionType.RendererPlugin
    }, e;
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
(function(a) {
  a.MITER = "miter", a.BEVEL = "bevel", a.ROUND = "round";
})(LINE_JOIN || (LINE_JOIN = {}));
var LINE_CAP;
(function(a) {
  a.BUTT = "butt", a.ROUND = "round", a.SQUARE = "square";
})(LINE_CAP || (LINE_CAP = {}));
var GRAPHICS_CURVES = {
  adaptive: !0,
  maxLength: 10,
  minSegments: 8,
  maxSegments: 2048,
  epsilon: 1e-4,
  _segmentsCount: function(a, e) {
    if (e === void 0 && (e = 20), !this.adaptive || !a || isNaN(a))
      return e;
    var t = Math.ceil(a / this.maxLength);
    return t < this.minSegments ? t = this.minSegments : t > this.maxSegments && (t = this.maxSegments), t;
  }
}, FillStyle = (
  /** @class */
  function() {
    function a() {
      this.color = 16777215, this.alpha = 1, this.texture = Texture.WHITE, this.matrix = null, this.visible = !1, this.reset();
    }
    return a.prototype.clone = function() {
      var e = new a();
      return e.color = this.color, e.alpha = this.alpha, e.texture = this.texture, e.matrix = this.matrix, e.visible = this.visible, e;
    }, a.prototype.reset = function() {
      this.color = 16777215, this.alpha = 1, this.texture = Texture.WHITE, this.matrix = null, this.visible = !1;
    }, a.prototype.destroy = function() {
      this.texture = null, this.matrix = null;
    }, a;
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
var extendStatics$e = function(a, e) {
  return extendStatics$e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, r) {
    t.__proto__ = r;
  } || function(t, r) {
    for (var s in r)
      r.hasOwnProperty(s) && (t[s] = r[s]);
  }, extendStatics$e(a, e);
};
function __extends$e(a, e) {
  extendStatics$e(a, e);
  function t() {
    this.constructor = a;
  }
  a.prototype = e === null ? Object.create(e) : (t.prototype = e.prototype, new t());
}
function fixOrientation(a, e) {
  var t, r;
  e === void 0 && (e = !1);
  var s = a.length;
  if (!(s < 6)) {
    for (var o = 0, u = 0, h = a[s - 2], l = a[s - 1]; u < s; u += 2) {
      var c = a[u], d = a[u + 1];
      o += (c - h) * (d + l), h = c, l = d;
    }
    if (!e && o > 0 || e && o <= 0)
      for (var _ = s / 2, u = _ + _ % 2; u < s; u += 2) {
        var v = s - u - 2, y = s - u - 1, b = u, g = u + 1;
        t = [a[b], a[v]], a[v] = t[0], a[b] = t[1], r = [a[g], a[y]], a[y] = r[0], a[g] = r[1];
      }
  }
}
var buildPoly = {
  build: function(a) {
    a.points = a.shape.points.slice();
  },
  triangulate: function(a, e) {
    var t = a.points, r = a.holes, s = e.points, o = e.indices;
    if (t.length >= 6) {
      fixOrientation(t, !1);
      for (var u = [], h = 0; h < r.length; h++) {
        var l = r[h];
        fixOrientation(l.points, !0), u.push(t.length / 2), t = t.concat(l.points);
      }
      var c = earcut(t, u, 2);
      if (!c)
        return;
      for (var d = s.length / 2, h = 0; h < c.length; h += 3)
        o.push(c[h] + d), o.push(c[h + 1] + d), o.push(c[h + 2] + d);
      for (var h = 0; h < t.length; h++)
        s.push(t[h]);
    }
  }
}, buildCircle = {
  build: function(a) {
    var e = a.points, t, r, s, o, u, h;
    if (a.type === SHAPES.CIRC) {
      var l = a.shape;
      t = l.x, r = l.y, u = h = l.radius, s = o = 0;
    } else if (a.type === SHAPES.ELIP) {
      var c = a.shape;
      t = c.x, r = c.y, u = c.width, h = c.height, s = o = 0;
    } else {
      var d = a.shape, _ = d.width / 2, v = d.height / 2;
      t = d.x + _, r = d.y + v, u = h = Math.max(0, Math.min(d.radius, Math.min(_, v))), s = _ - u, o = v - h;
    }
    if (!(u >= 0 && h >= 0 && s >= 0 && o >= 0)) {
      e.length = 0;
      return;
    }
    var y = Math.ceil(2.3 * Math.sqrt(u + h)), b = y * 8 + (s ? 4 : 0) + (o ? 4 : 0);
    if (e.length = b, b !== 0) {
      if (y === 0) {
        e.length = 8, e[0] = e[6] = t + s, e[1] = e[3] = r + o, e[2] = e[4] = t - s, e[5] = e[7] = r - o;
        return;
      }
      var g = 0, m = y * 4 + (s ? 2 : 0) + 2, E = m, S = b;
      {
        var P = s + u, L = o, T = t + P, I = t - P, w = r + L;
        if (e[g++] = T, e[g++] = w, e[--m] = w, e[--m] = I, o) {
          var M = r - L;
          e[E++] = I, e[E++] = M, e[--S] = M, e[--S] = T;
        }
      }
      for (var F = 1; F < y; F++) {
        var k = Math.PI / 2 * (F / y), P = s + Math.cos(k) * u, L = o + Math.sin(k) * h, T = t + P, I = t - P, w = r + L, M = r - L;
        e[g++] = T, e[g++] = w, e[--m] = w, e[--m] = I, e[E++] = I, e[E++] = M, e[--S] = M, e[--S] = T;
      }
      {
        var P = s, L = o + h, T = t + P, I = t - P, w = r + L, M = r - L;
        e[g++] = T, e[g++] = w, e[--S] = M, e[--S] = T, s && (e[g++] = I, e[g++] = w, e[--S] = M, e[--S] = I);
      }
    }
  },
  triangulate: function(a, e) {
    var t = a.points, r = e.points, s = e.indices;
    if (t.length !== 0) {
      var o = r.length / 2, u = o, h, l;
      if (a.type !== SHAPES.RREC) {
        var c = a.shape;
        h = c.x, l = c.y;
      } else {
        var d = a.shape;
        h = d.x + d.width / 2, l = d.y + d.height / 2;
      }
      var _ = a.matrix;
      r.push(a.matrix ? _.a * h + _.c * l + _.tx : h, a.matrix ? _.b * h + _.d * l + _.ty : l), o++, r.push(t[0], t[1]);
      for (var v = 2; v < t.length; v += 2)
        r.push(t[v], t[v + 1]), s.push(o++, u, o);
      s.push(u + 1, u, o);
    }
  }
}, buildRectangle = {
  build: function(a) {
    var e = a.shape, t = e.x, r = e.y, s = e.width, o = e.height, u = a.points;
    u.length = 0, u.push(t, r, t + s, r, t + s, r + o, t, r + o);
  },
  triangulate: function(a, e) {
    var t = a.points, r = e.points, s = r.length / 2;
    r.push(t[0], t[1], t[2], t[3], t[6], t[7], t[4], t[5]), e.indices.push(s, s + 1, s + 2, s + 1, s + 2, s + 3);
  }
};
function getPt(a, e, t) {
  var r = e - a;
  return a + r * t;
}
function quadraticBezierCurve(a, e, t, r, s, o, u) {
  u === void 0 && (u = []);
  for (var h = 20, l = u, c = 0, d = 0, _ = 0, v = 0, y = 0, b = 0, g = 0, m = 0; g <= h; ++g)
    m = g / h, c = getPt(a, t, m), d = getPt(e, r, m), _ = getPt(t, s, m), v = getPt(r, o, m), y = getPt(c, _, m), b = getPt(d, v, m), !(g === 0 && l[l.length - 2] === y && l[l.length - 1] === b) && l.push(y, b);
  return l;
}
var buildRoundedRectangle = {
  build: function(a) {
    if (Graphics.nextRoundedRectBehavior) {
      buildCircle.build(a);
      return;
    }
    var e = a.shape, t = a.points, r = e.x, s = e.y, o = e.width, u = e.height, h = Math.max(0, Math.min(e.radius, Math.min(o, u) / 2));
    t.length = 0, h ? (quadraticBezierCurve(r, s + h, r, s, r + h, s, t), quadraticBezierCurve(r + o - h, s, r + o, s, r + o, s + h, t), quadraticBezierCurve(r + o, s + u - h, r + o, s + u, r + o - h, s + u, t), quadraticBezierCurve(r + h, s + u, r, s + u, r, s + u - h, t)) : t.push(r, s, r + o, s, r + o, s + u, r, s + u);
  },
  triangulate: function(a, e) {
    if (Graphics.nextRoundedRectBehavior) {
      buildCircle.triangulate(a, e);
      return;
    }
    for (var t = a.points, r = e.points, s = e.indices, o = r.length / 2, u = earcut(t, null, 2), h = 0, l = u.length; h < l; h += 3)
      s.push(u[h] + o), s.push(u[h + 1] + o), s.push(u[h + 2] + o);
    for (var h = 0, l = t.length; h < l; h++)
      r.push(t[h], t[++h]);
  }
};
function square(a, e, t, r, s, o, u, h) {
  var l = a - t * s, c = e - r * s, d = a + t * o, _ = e + r * o, v, y;
  u ? (v = r, y = -t) : (v = -r, y = t);
  var b = l + v, g = c + y, m = d + v, E = _ + y;
  return h.push(b, g), h.push(m, E), 2;
}
function round(a, e, t, r, s, o, u, h) {
  var l = t - a, c = r - e, d = Math.atan2(l, c), _ = Math.atan2(s - a, o - e);
  h && d < _ ? d += Math.PI * 2 : !h && d > _ && (_ += Math.PI * 2);
  var v = d, y = _ - d, b = Math.abs(y), g = Math.sqrt(l * l + c * c), m = (15 * b * Math.sqrt(g) / Math.PI >> 0) + 1, E = y / m;
  if (v += E, h) {
    u.push(a, e), u.push(t, r);
    for (var S = 1, P = v; S < m; S++, P += E)
      u.push(a, e), u.push(a + Math.sin(P) * g, e + Math.cos(P) * g);
    u.push(a, e), u.push(s, o);
  } else {
    u.push(t, r), u.push(a, e);
    for (var S = 1, P = v; S < m; S++, P += E)
      u.push(a + Math.sin(P) * g, e + Math.cos(P) * g), u.push(a, e);
    u.push(s, o), u.push(a, e);
  }
  return m * 2;
}
function buildNonNativeLine(a, e) {
  var t = a.shape, r = a.points || t.points.slice(), s = e.closePointEps;
  if (r.length !== 0) {
    var o = a.lineStyle, u = new Point(r[0], r[1]), h = new Point(r[r.length - 2], r[r.length - 1]), l = t.type !== SHAPES.POLY || t.closeStroke, c = Math.abs(u.x - h.x) < s && Math.abs(u.y - h.y) < s;
    if (l) {
      r = r.slice(), c && (r.pop(), r.pop(), h.set(r[r.length - 2], r[r.length - 1]));
      var d = (u.x + h.x) * 0.5, _ = (h.y + u.y) * 0.5;
      r.unshift(d, _), r.push(d, _);
    }
    var v = e.points, y = r.length / 2, b = r.length, g = v.length / 2, m = o.width / 2, E = m * m, S = o.miterLimit * o.miterLimit, P = r[0], L = r[1], T = r[2], I = r[3], w = 0, M = 0, F = -(L - I), k = P - T, V = 0, X = 0, ne = Math.sqrt(F * F + k * k);
    F /= ne, k /= ne, F *= m, k *= m;
    var oe = o.alignment, K = (1 - oe) * 2, R = oe * 2;
    l || (o.cap === LINE_CAP.ROUND ? b += round(P - F * (K - R) * 0.5, L - k * (K - R) * 0.5, P - F * K, L - k * K, P + F * R, L + k * R, v, !0) + 2 : o.cap === LINE_CAP.SQUARE && (b += square(P, L, F, k, K, R, !0, v))), v.push(P - F * K, L - k * K), v.push(P + F * R, L + k * R);
    for (var O = 1; O < y - 1; ++O) {
      P = r[(O - 1) * 2], L = r[(O - 1) * 2 + 1], T = r[O * 2], I = r[O * 2 + 1], w = r[(O + 1) * 2], M = r[(O + 1) * 2 + 1], F = -(L - I), k = P - T, ne = Math.sqrt(F * F + k * k), F /= ne, k /= ne, F *= m, k *= m, V = -(I - M), X = T - w, ne = Math.sqrt(V * V + X * X), V /= ne, X /= ne, V *= m, X *= m;
      var A = T - P, B = L - I, N = T - w, D = M - I, G = A * N + B * D, U = B * N - D * A, Y = U < 0;
      if (Math.abs(U) < 1e-3 * Math.abs(G)) {
        v.push(T - F * K, I - k * K), v.push(T + F * R, I + k * R), G >= 0 && (o.join === LINE_JOIN.ROUND ? b += round(T, I, T - F * K, I - k * K, T - V * K, I - X * K, v, !1) + 4 : b += 2, v.push(T - V * R, I - X * R), v.push(T + V * K, I + X * K));
        continue;
      }
      var J = (-F + P) * (-k + I) - (-F + T) * (-k + L), C = (-V + w) * (-X + I) - (-V + T) * (-X + M), te = (A * C - N * J) / U, Z = (D * J - B * C) / U, se = (te - T) * (te - T) + (Z - I) * (Z - I), ee = T + (te - T) * K, q = I + (Z - I) * K, ue = T - (te - T) * R, ae = I - (Z - I) * R, z = Math.min(A * A + B * B, N * N + D * D), Q = Y ? K : R, ie = z + Q * Q * E, W = se <= ie;
      W ? o.join === LINE_JOIN.BEVEL || se / E > S ? (Y ? (v.push(ee, q), v.push(T + F * R, I + k * R), v.push(ee, q), v.push(T + V * R, I + X * R)) : (v.push(T - F * K, I - k * K), v.push(ue, ae), v.push(T - V * K, I - X * K), v.push(ue, ae)), b += 2) : o.join === LINE_JOIN.ROUND ? Y ? (v.push(ee, q), v.push(T + F * R, I + k * R), b += round(T, I, T + F * R, I + k * R, T + V * R, I + X * R, v, !0) + 4, v.push(ee, q), v.push(T + V * R, I + X * R)) : (v.push(T - F * K, I - k * K), v.push(ue, ae), b += round(T, I, T - F * K, I - k * K, T - V * K, I - X * K, v, !1) + 4, v.push(T - V * K, I - X * K), v.push(ue, ae)) : (v.push(ee, q), v.push(ue, ae)) : (v.push(T - F * K, I - k * K), v.push(T + F * R, I + k * R), o.join === LINE_JOIN.ROUND ? Y ? b += round(T, I, T + F * R, I + k * R, T + V * R, I + X * R, v, !0) + 2 : b += round(T, I, T - F * K, I - k * K, T - V * K, I - X * K, v, !1) + 2 : o.join === LINE_JOIN.MITER && se / E <= S && (Y ? (v.push(ue, ae), v.push(ue, ae)) : (v.push(ee, q), v.push(ee, q)), b += 2), v.push(T - V * K, I - X * K), v.push(T + V * R, I + X * R), b += 2);
    }
    P = r[(y - 2) * 2], L = r[(y - 2) * 2 + 1], T = r[(y - 1) * 2], I = r[(y - 1) * 2 + 1], F = -(L - I), k = P - T, ne = Math.sqrt(F * F + k * k), F /= ne, k /= ne, F *= m, k *= m, v.push(T - F * K, I - k * K), v.push(T + F * R, I + k * R), l || (o.cap === LINE_CAP.ROUND ? b += round(T - F * (K - R) * 0.5, I - k * (K - R) * 0.5, T - F * K, I - k * K, T + F * R, I + k * R, v, !1) + 2 : o.cap === LINE_CAP.SQUARE && (b += square(T, I, F, k, K, R, !1, v)));
    for (var me = e.indices, be = GRAPHICS_CURVES.epsilon * GRAPHICS_CURVES.epsilon, O = g; O < b + g - 2; ++O)
      P = v[O * 2], L = v[O * 2 + 1], T = v[(O + 1) * 2], I = v[(O + 1) * 2 + 1], w = v[(O + 2) * 2], M = v[(O + 2) * 2 + 1], !(Math.abs(P * (I - M) + T * (M - L) + w * (L - I)) < be) && me.push(O, O + 1, O + 2);
  }
}
function buildNativeLine(a, e) {
  var t = 0, r = a.shape, s = a.points || r.points, o = r.type !== SHAPES.POLY || r.closeStroke;
  if (s.length !== 0) {
    var u = e.points, h = e.indices, l = s.length / 2, c = u.length / 2, d = c;
    for (u.push(s[0], s[1]), t = 1; t < l; t++)
      u.push(s[t * 2], s[t * 2 + 1]), h.push(d, d + 1), d++;
    o && h.push(d, c);
  }
}
function buildLine(a, e) {
  a.lineStyle.native ? buildNativeLine(a, e) : buildNonNativeLine(a, e);
}
var ArcUtils = (
  /** @class */
  function() {
    function a() {
    }
    return a.curveTo = function(e, t, r, s, o, u) {
      var h = u[u.length - 2], l = u[u.length - 1], c = l - t, d = h - e, _ = s - t, v = r - e, y = Math.abs(c * v - d * _);
      if (y < 1e-8 || o === 0)
        return (u[u.length - 2] !== e || u[u.length - 1] !== t) && u.push(e, t), null;
      var b = c * c + d * d, g = _ * _ + v * v, m = c * _ + d * v, E = o * Math.sqrt(b) / y, S = o * Math.sqrt(g) / y, P = E * m / b, L = S * m / g, T = E * v + S * d, I = E * _ + S * c, w = d * (S + P), M = c * (S + P), F = v * (E + L), k = _ * (E + L), V = Math.atan2(M - I, w - T), X = Math.atan2(k - I, F - T);
      return {
        cx: T + e,
        cy: I + t,
        radius: o,
        startAngle: V,
        endAngle: X,
        anticlockwise: d * _ > v * c
      };
    }, a.arc = function(e, t, r, s, o, u, h, l, c) {
      for (var d = h - u, _ = GRAPHICS_CURVES._segmentsCount(Math.abs(d) * o, Math.ceil(Math.abs(d) / PI_2) * 40), v = d / (_ * 2), y = v * 2, b = Math.cos(v), g = Math.sin(v), m = _ - 1, E = m % 1 / m, S = 0; S <= m; ++S) {
        var P = S + E * S, L = v + u + y * P, T = Math.cos(L), I = -Math.sin(L);
        c.push((b * T + g * I) * o + r, (b * -I + g * T) * o + s);
      }
    }, a;
  }()
), BezierUtils = (
  /** @class */
  function() {
    function a() {
    }
    return a.curveLength = function(e, t, r, s, o, u, h, l) {
      for (var c = 10, d = 0, _ = 0, v = 0, y = 0, b = 0, g = 0, m = 0, E = 0, S = 0, P = 0, L = 0, T = e, I = t, w = 1; w <= c; ++w)
        _ = w / c, v = _ * _, y = v * _, b = 1 - _, g = b * b, m = g * b, E = m * e + 3 * g * _ * r + 3 * b * v * o + y * h, S = m * t + 3 * g * _ * s + 3 * b * v * u + y * l, P = T - E, L = I - S, T = E, I = S, d += Math.sqrt(P * P + L * L);
      return d;
    }, a.curveTo = function(e, t, r, s, o, u, h) {
      var l = h[h.length - 2], c = h[h.length - 1];
      h.length -= 2;
      var d = GRAPHICS_CURVES._segmentsCount(a.curveLength(l, c, e, t, r, s, o, u)), _ = 0, v = 0, y = 0, b = 0, g = 0;
      h.push(l, c);
      for (var m = 1, E = 0; m <= d; ++m)
        E = m / d, _ = 1 - E, v = _ * _, y = v * _, b = E * E, g = b * E, h.push(y * l + 3 * v * E * e + 3 * _ * b * r + g * o, y * c + 3 * v * E * t + 3 * _ * b * s + g * u);
    }, a;
  }()
), QuadraticUtils = (
  /** @class */
  function() {
    function a() {
    }
    return a.curveLength = function(e, t, r, s, o, u) {
      var h = e - 2 * r + o, l = t - 2 * s + u, c = 2 * r - 2 * e, d = 2 * s - 2 * t, _ = 4 * (h * h + l * l), v = 4 * (h * c + l * d), y = c * c + d * d, b = 2 * Math.sqrt(_ + v + y), g = Math.sqrt(_), m = 2 * _ * g, E = 2 * Math.sqrt(y), S = v / g;
      return (m * b + g * v * (b - E) + (4 * y * _ - v * v) * Math.log((2 * g + S + b) / (S + E))) / (4 * m);
    }, a.curveTo = function(e, t, r, s, o) {
      for (var u = o[o.length - 2], h = o[o.length - 1], l = GRAPHICS_CURVES._segmentsCount(a.curveLength(u, h, e, t, r, s)), c = 0, d = 0, _ = 1; _ <= l; ++_) {
        var v = _ / l;
        c = u + (e - u) * v, d = h + (t - h) * v, o.push(c + (e + (r - e) * v - c) * v, d + (t + (s - t) * v - d) * v);
      }
    }, a;
  }()
), BatchPart = (
  /** @class */
  function() {
    function a() {
      this.reset();
    }
    return a.prototype.begin = function(e, t, r) {
      this.reset(), this.style = e, this.start = t, this.attribStart = r;
    }, a.prototype.end = function(e, t) {
      this.attribSize = t - this.attribStart, this.size = e - this.start;
    }, a.prototype.reset = function() {
      this.style = null, this.size = 0, this.start = 0, this.attribStart = 0, this.attribSize = 0;
    }, a;
  }()
), _a, FILL_COMMANDS = (_a = {}, _a[SHAPES.POLY] = buildPoly, _a[SHAPES.CIRC] = buildCircle, _a[SHAPES.ELIP] = buildCircle, _a[SHAPES.RECT] = buildRectangle, _a[SHAPES.RREC] = buildRoundedRectangle, _a), BATCH_POOL = [], DRAW_CALL_POOL = [], GraphicsData = (
  /** @class */
  function() {
    function a(e, t, r, s) {
      t === void 0 && (t = null), r === void 0 && (r = null), s === void 0 && (s = null), this.points = [], this.holes = [], this.shape = e, this.lineStyle = r, this.fillStyle = t, this.matrix = s, this.type = e.type;
    }
    return a.prototype.clone = function() {
      return new a(this.shape, this.fillStyle, this.lineStyle, this.matrix);
    }, a.prototype.destroy = function() {
      this.shape = null, this.holes.length = 0, this.holes = null, this.points.length = 0, this.points = null, this.lineStyle = null, this.fillStyle = null;
    }, a;
  }()
), tmpPoint = new Point(), GraphicsGeometry = (
  /** @class */
  function(a) {
    __extends$e(e, a);
    function e() {
      var t = a.call(this) || this;
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
    }, e.prototype.drawShape = function(t, r, s, o) {
      r === void 0 && (r = null), s === void 0 && (s = null), o === void 0 && (o = null);
      var u = new GraphicsData(t, r, s, o);
      return this.graphicsData.push(u), this.dirty++, this;
    }, e.prototype.drawHole = function(t, r) {
      if (r === void 0 && (r = null), !this.graphicsData.length)
        return null;
      var s = new GraphicsData(t, null, null, r), o = this.graphicsData[this.graphicsData.length - 1];
      return s.lineStyle = o.lineStyle, o.holes.push(s), this.dirty++, this;
    }, e.prototype.destroy = function() {
      a.prototype.destroy.call(this);
      for (var t = 0; t < this.graphicsData.length; ++t)
        this.graphicsData[t].destroy();
      this.points.length = 0, this.points = null, this.colors.length = 0, this.colors = null, this.uvs.length = 0, this.uvs = null, this.indices.length = 0, this.indices = null, this.indexBuffer.destroy(), this.indexBuffer = null, this.graphicsData.length = 0, this.graphicsData = null, this.drawCalls.length = 0, this.drawCalls = null, this.batches.length = 0, this.batches = null, this._bounds = null;
    }, e.prototype.containsPoint = function(t) {
      for (var r = this.graphicsData, s = 0; s < r.length; ++s) {
        var o = r[s];
        if (o.fillStyle.visible && o.shape && (o.matrix ? o.matrix.applyInverse(t, tmpPoint) : tmpPoint.copyFrom(t), o.shape.contains(tmpPoint.x, tmpPoint.y))) {
          var u = !1;
          if (o.holes)
            for (var h = 0; h < o.holes.length; h++) {
              var l = o.holes[h];
              if (l.shape.contains(tmpPoint.x, tmpPoint.y)) {
                u = !0;
                break;
              }
            }
          if (!u)
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
        var t = this.uvs, r = this.graphicsData, s = null, o = null;
        this.batches.length > 0 && (s = this.batches[this.batches.length - 1], o = s.style);
        for (var u = this.shapeIndex; u < r.length; u++) {
          this.shapeIndex++;
          var h = r[u], l = h.fillStyle, c = h.lineStyle, d = FILL_COMMANDS[h.type];
          d.build(h), h.matrix && this.transformPoints(h.points, h.matrix), (l.visible || c.visible) && this.processHoles(h.holes);
          for (var _ = 0; _ < 2; _++) {
            var v = _ === 0 ? l : c;
            if (v.visible) {
              var y = v.texture.baseTexture, b = this.indices.length, g = this.points.length / 2;
              y.wrapMode = WRAP_MODES.REPEAT, _ === 0 ? this.processFill(h) : this.processLine(h);
              var m = this.points.length / 2 - g;
              m !== 0 && (s && !this._compareStyles(o, v) && (s.end(b, g), s = null), s || (s = BATCH_POOL.pop() || new BatchPart(), s.begin(v, b, g), this.batches.push(s), o = v), this.addUvs(this.points, t, v.texture, g, m, v.matrix));
            }
          }
        }
        var E = this.indices.length, S = this.points.length / 2;
        if (s && s.end(E, S), this.batches.length === 0) {
          this.batchable = !0;
          return;
        }
        var P = S > 65535;
        this.indicesUint16 && this.indices.length === this.indicesUint16.length && P === this.indicesUint16.BYTES_PER_ELEMENT > 2 ? this.indicesUint16.set(this.indices) : this.indicesUint16 = P ? new Uint32Array(this.indices) : new Uint16Array(this.indices), this.batchable = this.isBatchable(), this.batchable ? this.packBatches() : this.buildDrawCalls();
      }
    }, e.prototype._compareStyles = function(t, r) {
      return !(!t || !r || t.texture.baseTexture !== r.texture.baseTexture || t.color + t.alpha !== r.color + r.alpha || !!t.native != !!r.native);
    }, e.prototype.validateBatching = function() {
      if (this.dirty === this.cacheDirty || !this.graphicsData.length)
        return !1;
      for (var t = 0, r = this.graphicsData.length; t < r; t++) {
        var s = this.graphicsData[t], o = s.fillStyle, u = s.lineStyle;
        if (o && !o.texture.baseTexture.valid || u && !u.texture.baseTexture.valid)
          return !1;
      }
      return !0;
    }, e.prototype.packBatches = function() {
      this.batchDirty++, this.uvsFloat32 = new Float32Array(this.uvs);
      for (var t = this.batches, r = 0, s = t.length; r < s; r++)
        for (var o = t[r], u = 0; u < o.size; u++) {
          var h = o.start + u;
          this.indicesUint16[h] = this.indicesUint16[h] - o.attribStart;
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
      var s = this.colors, o = this.textureIds, u = DRAW_CALL_POOL.pop();
      u || (u = new BatchDrawCall(), u.texArray = new BatchTextureArray()), u.texArray.count = 0, u.start = 0, u.size = 0, u.type = DRAW_MODES.TRIANGLES;
      var h = 0, l = null, c = 0, d = !1, _ = DRAW_MODES.TRIANGLES, v = 0;
      this.drawCalls.push(u);
      for (var r = 0; r < this.batches.length; r++) {
        var y = this.batches[r], b = 8, g = y.style, m = g.texture.baseTexture;
        d !== !!g.native && (d = !!g.native, _ = d ? DRAW_MODES.LINES : DRAW_MODES.TRIANGLES, l = null, h = b, t++), l !== m && (l = m, m._batchEnabled !== t && (h === b && (t++, h = 0, u.size > 0 && (u = DRAW_CALL_POOL.pop(), u || (u = new BatchDrawCall(), u.texArray = new BatchTextureArray()), this.drawCalls.push(u)), u.start = v, u.size = 0, u.texArray.count = 0, u.type = _), m.touched = 1, m._batchEnabled = t, m._batchLocation = h, m.wrapMode = WRAP_MODES.REPEAT, u.texArray.elements[u.texArray.count++] = m, h++)), u.size += y.size, v += y.size, c = m._batchLocation, this.addColors(s, g.color, g.alpha, y.attribSize, y.attribStart), this.addTextureIds(o, c, y.attribSize, y.attribStart);
      }
      BaseTexture._globalBatch = t, this.packAttributes();
    }, e.prototype.packAttributes = function() {
      for (var t = this.points, r = this.uvs, s = this.colors, o = this.textureIds, u = new ArrayBuffer(t.length * 3 * 4), h = new Float32Array(u), l = new Uint32Array(u), c = 0, d = 0; d < t.length / 2; d++)
        h[c++] = t[d * 2], h[c++] = t[d * 2 + 1], h[c++] = r[d * 2], h[c++] = r[d * 2 + 1], l[c++] = s[d], h[c++] = o[d];
      this._buffer.update(u), this._indexBuffer.update(this.indicesUint16);
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
        var s = t[r], o = FILL_COMMANDS[s.type];
        o.build(s), s.matrix && this.transformPoints(s.points, s.matrix);
      }
    }, e.prototype.calculateBounds = function() {
      var t = this._bounds;
      t.clear(), t.addVertexData(this.points, 0, this.points.length), t.pad(this.boundsPadding, this.boundsPadding);
    }, e.prototype.transformPoints = function(t, r) {
      for (var s = 0; s < t.length / 2; s++) {
        var o = t[s * 2], u = t[s * 2 + 1];
        t[s * 2] = r.a * o + r.c * u + r.tx, t[s * 2 + 1] = r.b * o + r.d * u + r.ty;
      }
    }, e.prototype.addColors = function(t, r, s, o, u) {
      u === void 0 && (u = 0);
      var h = (r >> 16) + (r & 65280) + ((r & 255) << 16), l = premultiplyTint(h, s);
      t.length = Math.max(t.length, u + o);
      for (var c = 0; c < o; c++)
        t[u + c] = l;
    }, e.prototype.addTextureIds = function(t, r, s, o) {
      o === void 0 && (o = 0), t.length = Math.max(t.length, o + s);
      for (var u = 0; u < s; u++)
        t[o + u] = r;
    }, e.prototype.addUvs = function(t, r, s, o, u, h) {
      h === void 0 && (h = null);
      for (var l = 0, c = r.length, d = s.frame; l < u; ) {
        var _ = t[(o + l) * 2], v = t[(o + l) * 2 + 1];
        if (h) {
          var y = h.a * _ + h.c * v + h.tx;
          v = h.b * _ + h.d * v + h.ty, _ = y;
        }
        l++, r.push(_ / d.width, v / d.height);
      }
      var b = s.baseTexture;
      (d.width < b.width || d.height < b.height) && this.adjustUvs(r, s, c, u);
    }, e.prototype.adjustUvs = function(t, r, s, o) {
      for (var u = r.baseTexture, h = 1e-6, l = s + o * 2, c = r.frame, d = c.width / u.width, _ = c.height / u.height, v = c.x / c.width, y = c.y / c.height, b = Math.floor(t[s] + h), g = Math.floor(t[s + 1] + h), m = s + 2; m < l; m += 2)
        b = Math.min(b, Math.floor(t[m] + h)), g = Math.min(g, Math.floor(t[m + 1] + h));
      v -= b, y -= g;
      for (var m = s; m < l; m += 2)
        t[m] = (t[m] + v) * d, t[m + 1] = (t[m + 1] + y) * _;
    }, e.BATCHABLE_SIZE = 100, e;
  }(BatchGeometry)
), LineStyle = (
  /** @class */
  function(a) {
    __extends$e(e, a);
    function e() {
      var t = a !== null && a.apply(this, arguments) || this;
      return t.width = 0, t.alignment = 0.5, t.native = !1, t.cap = LINE_CAP.BUTT, t.join = LINE_JOIN.MITER, t.miterLimit = 10, t;
    }
    return e.prototype.clone = function() {
      var t = new e();
      return t.color = this.color, t.alpha = this.alpha, t.texture = this.texture, t.matrix = this.matrix, t.visible = this.visible, t.width = this.width, t.alignment = this.alignment, t.native = this.native, t.cap = this.cap, t.join = this.join, t.miterLimit = this.miterLimit, t;
    }, e.prototype.reset = function() {
      a.prototype.reset.call(this), this.color = 0, this.alignment = 0.5, this.width = 0, this.native = !1;
    }, e;
  }(FillStyle)
), temp = new Float32Array(3), DEFAULT_SHADERS = {}, Graphics = (
  /** @class */
  function(a) {
    __extends$e(e, a);
    function e(t) {
      t === void 0 && (t = null);
      var r = a.call(this) || this;
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
    }), e.prototype.lineStyle = function(t, r, s, o, u) {
      return t === void 0 && (t = null), r === void 0 && (r = 0), s === void 0 && (s = 1), o === void 0 && (o = 0.5), u === void 0 && (u = !1), typeof t == "number" && (t = { width: t, color: r, alpha: s, alignment: o, native: u }), this.lineTextureStyle(t);
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
      var s = this.currentPath.points, o = s[s.length - 2], u = s[s.length - 1];
      return (o !== t || u !== r) && s.push(t, r), this;
    }, e.prototype._initCurve = function(t, r) {
      t === void 0 && (t = 0), r === void 0 && (r = 0), this.currentPath ? this.currentPath.points.length === 0 && (this.currentPath.points = [t, r]) : this.moveTo(t, r);
    }, e.prototype.quadraticCurveTo = function(t, r, s, o) {
      this._initCurve();
      var u = this.currentPath.points;
      return u.length === 0 && this.moveTo(0, 0), QuadraticUtils.curveTo(t, r, s, o, u), this;
    }, e.prototype.bezierCurveTo = function(t, r, s, o, u, h) {
      return this._initCurve(), BezierUtils.curveTo(t, r, s, o, u, h, this.currentPath.points), this;
    }, e.prototype.arcTo = function(t, r, s, o, u) {
      this._initCurve(t, r);
      var h = this.currentPath.points, l = ArcUtils.curveTo(t, r, s, o, u, h);
      if (l) {
        var c = l.cx, d = l.cy, _ = l.radius, v = l.startAngle, y = l.endAngle, b = l.anticlockwise;
        this.arc(c, d, _, v, y, b);
      }
      return this;
    }, e.prototype.arc = function(t, r, s, o, u, h) {
      if (h === void 0 && (h = !1), o === u)
        return this;
      !h && u <= o ? u += PI_2 : h && o <= u && (o += PI_2);
      var l = u - o;
      if (l === 0)
        return this;
      var c = t + Math.cos(o) * s, d = r + Math.sin(o) * s, _ = this._geometry.closePointEps, v = this.currentPath ? this.currentPath.points : null;
      if (v) {
        var y = Math.abs(v[v.length - 2] - c), b = Math.abs(v[v.length - 1] - d);
        y < _ && b < _ || v.push(c, d);
      } else
        this.moveTo(c, d), v = this.currentPath.points;
      return ArcUtils.arc(c, d, t, r, s, o, u, h, v), this;
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
    }, e.prototype.drawRect = function(t, r, s, o) {
      return this.drawShape(new Rectangle(t, r, s, o));
    }, e.prototype.drawRoundedRect = function(t, r, s, o, u) {
      return this.drawShape(new RoundedRectangle(t, r, s, o, u));
    }, e.prototype.drawCircle = function(t, r, s) {
      return this.drawShape(new Circle(t, r, s));
    }, e.prototype.drawEllipse = function(t, r, s, o) {
      return this.drawShape(new Ellipse(t, r, s, o));
    }, e.prototype.drawPolygon = function() {
      for (var t = arguments, r = [], s = 0; s < arguments.length; s++)
        r[s] = t[s];
      var o, u = !0, h = r[0];
      h.points ? (u = h.closeStroke, o = h.points) : Array.isArray(r[0]) ? o = r[0] : o = r;
      var l = new Polygon(o);
      return l.closeStroke = u, this.drawShape(l), this;
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
      var t = this._geometry, r = this.blendMode, s = t.batches.length;
      this.batchTint = -1, this._transformID = -1, this.batchDirty = t.batchDirty, this.batches.length = s, this.vertexData = new Float32Array(t.points);
      for (var o = 0; o < s; o++) {
        var u = t.batches[o], h = u.style.color, l = new Float32Array(this.vertexData.buffer, u.attribStart * 4 * 2, u.attribSize * 2), c = new Float32Array(t.uvsFloat32.buffer, u.attribStart * 4 * 2, u.attribSize * 2), d = new Uint16Array(t.indicesUint16.buffer, u.start * 2, u.size), _ = {
          vertexData: l,
          blendMode: r,
          indices: d,
          uvs: c,
          _batchRGB: hex2rgb(h),
          _tintRGB: h,
          _texture: u.style.texture,
          alpha: u.style.alpha,
          worldAlpha: 1
        };
        this.batches[o] = _;
      }
    }, e.prototype._renderBatched = function(t) {
      if (this.batches.length) {
        t.batch.setObjectRenderer(t.plugins[this.pluginName]), this.calculateVertices(), this.calculateTints();
        for (var r = 0, s = this.batches.length; r < s; r++) {
          var o = this.batches[r];
          o.worldAlpha = this.worldAlpha * o.alpha, t.plugins[this.pluginName].render(o);
        }
      }
    }, e.prototype._renderDirect = function(t) {
      var r = this._resolveDirectShader(t), s = this._geometry, o = this.tint, u = this.worldAlpha, h = r.uniforms, l = s.drawCalls;
      h.translationMatrix = this.transform.worldTransform, h.tint[0] = (o >> 16 & 255) / 255 * u, h.tint[1] = (o >> 8 & 255) / 255 * u, h.tint[2] = (o & 255) / 255 * u, h.tint[3] = u, t.shader.bind(r), t.geometry.bind(s, r), t.state.set(this.state);
      for (var c = 0, d = l.length; c < d; c++)
        this._renderDrawCallDirect(t, s.drawCalls[c]);
    }, e.prototype._renderDrawCallDirect = function(t, r) {
      for (var s = r.texArray, o = r.type, u = r.size, h = r.start, l = s.count, c = 0; c < l; c++)
        t.texture.bind(s.elements[c], c);
      t.geometry.draw(o, u, h);
    }, e.prototype._resolveDirectShader = function(t) {
      var r = this.shader, s = this.pluginName;
      if (!r) {
        if (!DEFAULT_SHADERS[s]) {
          for (var o = t.plugins[s].MAX_TEXTURES, u = new Int32Array(o), h = 0; h < o; h++)
            u[h] = h;
          var l = {
            tint: new Float32Array([1, 1, 1, 1]),
            translationMatrix: new Matrix(),
            default: UniformGroup.from({ uSamplers: u }, !0)
          }, c = t.plugins[s]._shader.program;
          DEFAULT_SHADERS[s] = new Shader(c, l);
        }
        r = DEFAULT_SHADERS[s];
      }
      return r;
    }, e.prototype._calculateBounds = function() {
      this.finishPoly();
      var t = this._geometry;
      if (t.graphicsData.length) {
        var r = t.bounds, s = r.minX, o = r.minY, u = r.maxX, h = r.maxY;
        this._bounds.addFrame(this.transform, s, o, u, h);
      }
    }, e.prototype.containsPoint = function(t) {
      return this.worldTransform.applyInverse(t, e._TEMP_POINT), this._geometry.containsPoint(e._TEMP_POINT);
    }, e.prototype.calculateTints = function() {
      if (this.batchTint !== this.tint) {
        this.batchTint = this.tint;
        for (var t = hex2rgb(this.tint, temp), r = 0; r < this.batches.length; r++) {
          var s = this.batches[r], o = s._batchRGB, u = t[0] * o[0] * 255, h = t[1] * o[1] * 255, l = t[2] * o[2] * 255, c = (u << 16) + (h << 8) + (l | 0);
          s._tintRGB = (c >> 16) + (c & 65280) + ((c & 255) << 16);
        }
      }
    }, e.prototype.calculateVertices = function() {
      var t = this.transform._worldID;
      if (this._transformID !== t) {
        this._transformID = t;
        for (var r = this.transform.worldTransform, s = r.a, o = r.b, u = r.c, h = r.d, l = r.tx, c = r.ty, d = this._geometry.points, _ = this.vertexData, v = 0, y = 0; y < d.length; y += 2) {
          var b = d[y], g = d[y + 1];
          _[v++] = s * b + u * g + l, _[v++] = h * g + o * b + c;
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
      this._geometry.refCount--, this._geometry.refCount === 0 && this._geometry.dispose(), this._matrix = null, this.currentPath = null, this._lineStyle.destroy(), this._lineStyle = null, this._fillStyle.destroy(), this._fillStyle = null, this._geometry = null, this.shader = null, this.vertexData = null, this.batches.length = 0, this.batches = null, a.prototype.destroy.call(this, t);
    }, e.nextRoundedRectBehavior = !1, e._TEMP_POINT = new Point(), e;
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
var extendStatics$d = function(a, e) {
  return extendStatics$d = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, r) {
    t.__proto__ = r;
  } || function(t, r) {
    for (var s in r)
      r.hasOwnProperty(s) && (t[s] = r[s]);
  }, extendStatics$d(a, e);
};
function __extends$d(a, e) {
  extendStatics$d(a, e);
  function t() {
    this.constructor = a;
  }
  a.prototype = e === null ? Object.create(e) : (t.prototype = e.prototype, new t());
}
var tempPoint$2 = new Point(), indices = new Uint16Array([0, 1, 2, 0, 2, 3]), Sprite = (
  /** @class */
  function(a) {
    __extends$d(e, a);
    function e(t) {
      var r = a.call(this) || this;
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
        var r = this.transform.worldTransform, s = r.a, o = r.b, u = r.c, h = r.d, l = r.tx, c = r.ty, d = this.vertexData, _ = t.trim, v = t.orig, y = this._anchor, b = 0, g = 0, m = 0, E = 0;
        if (_ ? (g = _.x - y._x * v.width, b = g + _.width, E = _.y - y._y * v.height, m = E + _.height) : (g = -y._x * v.width, b = g + v.width, E = -y._y * v.height, m = E + v.height), d[0] = s * g + u * E + l, d[1] = h * E + o * g + c, d[2] = s * b + u * E + l, d[3] = h * E + o * b + c, d[4] = s * b + u * m + l, d[5] = h * m + o * b + c, d[6] = s * g + u * m + l, d[7] = h * m + o * g + c, this._roundPixels)
          for (var S = settings.RESOLUTION, P = 0; P < d.length; ++P)
            d[P] = Math.round((d[P] * S | 0) / S);
      }
    }, e.prototype.calculateTrimmedVertices = function() {
      if (!this.vertexTrimmedData)
        this.vertexTrimmedData = new Float32Array(8);
      else if (this._transformTrimmedID === this.transform._worldID && this._textureTrimmedID === this._texture._updateID)
        return;
      this._transformTrimmedID = this.transform._worldID, this._textureTrimmedID = this._texture._updateID;
      var t = this._texture, r = this.vertexTrimmedData, s = t.orig, o = this._anchor, u = this.transform.worldTransform, h = u.a, l = u.b, c = u.c, d = u.d, _ = u.tx, v = u.ty, y = -o._x * s.width, b = y + s.width, g = -o._y * s.height, m = g + s.height;
      r[0] = h * y + c * g + _, r[1] = d * g + l * y + v, r[2] = h * b + c * g + _, r[3] = d * g + l * b + v, r[4] = h * b + c * m + _, r[5] = d * m + l * b + v, r[6] = h * y + c * m + _, r[7] = d * m + l * y + v;
    }, e.prototype._render = function(t) {
      this.calculateVertices(), t.batch.setObjectRenderer(t.plugins[this.pluginName]), t.plugins[this.pluginName].render(this);
    }, e.prototype._calculateBounds = function() {
      var t = this._texture.trim, r = this._texture.orig;
      !t || t.width === r.width && t.height === r.height ? (this.calculateVertices(), this._bounds.addQuad(this.vertexData)) : (this.calculateTrimmedVertices(), this._bounds.addQuad(this.vertexTrimmedData));
    }, e.prototype.getLocalBounds = function(t) {
      return this.children.length === 0 ? (this._localBounds || (this._localBounds = new Bounds()), this._localBounds.minX = this._texture.orig.width * -this._anchor._x, this._localBounds.minY = this._texture.orig.height * -this._anchor._y, this._localBounds.maxX = this._texture.orig.width * (1 - this._anchor._x), this._localBounds.maxY = this._texture.orig.height * (1 - this._anchor._y), t || (this._localBoundsRect || (this._localBoundsRect = new Rectangle()), t = this._localBoundsRect), this._localBounds.getRectangle(t)) : a.prototype.getLocalBounds.call(this, t);
    }, e.prototype.containsPoint = function(t) {
      this.worldTransform.applyInverse(t, tempPoint$2);
      var r = this._texture.orig.width, s = this._texture.orig.height, o = -r * this.anchor.x, u = 0;
      return tempPoint$2.x >= o && tempPoint$2.x < o + r && (u = -s * this.anchor.y, tempPoint$2.y >= u && tempPoint$2.y < u + s);
    }, e.prototype.destroy = function(t) {
      a.prototype.destroy.call(this, t), this._texture.off("update", this._onTextureUpdate, this), this._anchor = null;
      var r = typeof t == "boolean" ? t : t && t.texture;
      if (r) {
        var s = typeof t == "boolean" ? t : t && t.baseTexture;
        this._texture.destroy(!!s);
      }
      this._texture = null;
    }, e.from = function(t, r) {
      var s = t instanceof Texture ? t : Texture.from(t, r);
      return new e(s);
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
var extendStatics$c = function(a, e) {
  return extendStatics$c = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, r) {
    t.__proto__ = r;
  } || function(t, r) {
    for (var s in r)
      r.hasOwnProperty(s) && (t[s] = r[s]);
  }, extendStatics$c(a, e);
};
function __extends$c(a, e) {
  extendStatics$c(a, e);
  function t() {
    this.constructor = a;
  }
  a.prototype = e === null ? Object.create(e) : (t.prototype = e.prototype, new t());
}
var TEXT_GRADIENT;
(function(a) {
  a[a.LINEAR_VERTICAL = 0] = "LINEAR_VERTICAL", a[a.LINEAR_HORIZONTAL = 1] = "LINEAR_HORIZONTAL";
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
    function a(e) {
      this.styleID = 0, this.reset(), deepCopyProperties(this, e, e);
    }
    return a.prototype.clone = function() {
      var e = {};
      return deepCopyProperties(e, this, defaultStyle), new a(e);
    }, a.prototype.reset = function() {
      deepCopyProperties(this, defaultStyle, defaultStyle);
    }, Object.defineProperty(a.prototype, "align", {
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
    }), Object.defineProperty(a.prototype, "breakWords", {
      /** Indicates if lines can be wrapped within words, it needs wordWrap to be set to true. */
      get: function() {
        return this._breakWords;
      },
      set: function(e) {
        this._breakWords !== e && (this._breakWords = e, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(a.prototype, "dropShadow", {
      /** Set a drop shadow for the text. */
      get: function() {
        return this._dropShadow;
      },
      set: function(e) {
        this._dropShadow !== e && (this._dropShadow = e, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(a.prototype, "dropShadowAlpha", {
      /** Set alpha for the drop shadow. */
      get: function() {
        return this._dropShadowAlpha;
      },
      set: function(e) {
        this._dropShadowAlpha !== e && (this._dropShadowAlpha = e, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(a.prototype, "dropShadowAngle", {
      /** Set a angle of the drop shadow. */
      get: function() {
        return this._dropShadowAngle;
      },
      set: function(e) {
        this._dropShadowAngle !== e && (this._dropShadowAngle = e, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(a.prototype, "dropShadowBlur", {
      /** Set a shadow blur radius. */
      get: function() {
        return this._dropShadowBlur;
      },
      set: function(e) {
        this._dropShadowBlur !== e && (this._dropShadowBlur = e, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(a.prototype, "dropShadowColor", {
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
    }), Object.defineProperty(a.prototype, "dropShadowDistance", {
      /** Set a distance of the drop shadow. */
      get: function() {
        return this._dropShadowDistance;
      },
      set: function(e) {
        this._dropShadowDistance !== e && (this._dropShadowDistance = e, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(a.prototype, "fill", {
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
    }), Object.defineProperty(a.prototype, "fillGradientType", {
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
    }), Object.defineProperty(a.prototype, "fillGradientStops", {
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
    }), Object.defineProperty(a.prototype, "fontFamily", {
      /** The font family. */
      get: function() {
        return this._fontFamily;
      },
      set: function(e) {
        this.fontFamily !== e && (this._fontFamily = e, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(a.prototype, "fontSize", {
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
    }), Object.defineProperty(a.prototype, "fontStyle", {
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
    }), Object.defineProperty(a.prototype, "fontVariant", {
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
    }), Object.defineProperty(a.prototype, "fontWeight", {
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
    }), Object.defineProperty(a.prototype, "letterSpacing", {
      /** The amount of spacing between letters, default is 0. */
      get: function() {
        return this._letterSpacing;
      },
      set: function(e) {
        this._letterSpacing !== e && (this._letterSpacing = e, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(a.prototype, "lineHeight", {
      /** The line height, a number that represents the vertical space that a letter uses. */
      get: function() {
        return this._lineHeight;
      },
      set: function(e) {
        this._lineHeight !== e && (this._lineHeight = e, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(a.prototype, "leading", {
      /** The space between lines. */
      get: function() {
        return this._leading;
      },
      set: function(e) {
        this._leading !== e && (this._leading = e, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(a.prototype, "lineJoin", {
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
    }), Object.defineProperty(a.prototype, "miterLimit", {
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
    }), Object.defineProperty(a.prototype, "padding", {
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
    }), Object.defineProperty(a.prototype, "stroke", {
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
    }), Object.defineProperty(a.prototype, "strokeThickness", {
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
    }), Object.defineProperty(a.prototype, "textBaseline", {
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
    }), Object.defineProperty(a.prototype, "trim", {
      /** Trim transparent borders. */
      get: function() {
        return this._trim;
      },
      set: function(e) {
        this._trim !== e && (this._trim = e, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(a.prototype, "whiteSpace", {
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
    }), Object.defineProperty(a.prototype, "wordWrap", {
      /** Indicates if word wrap should be used. */
      get: function() {
        return this._wordWrap;
      },
      set: function(e) {
        this._wordWrap !== e && (this._wordWrap = e, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(a.prototype, "wordWrapWidth", {
      /** The width at which text will wrap, it needs wordWrap to be set to true. */
      get: function() {
        return this._wordWrapWidth;
      },
      set: function(e) {
        this._wordWrapWidth !== e && (this._wordWrapWidth = e, this.styleID++);
      },
      enumerable: !1,
      configurable: !0
    }), a.prototype.toFontString = function() {
      var e = typeof this.fontSize == "number" ? this.fontSize + "px" : this.fontSize, t = this.fontFamily;
      Array.isArray(this.fontFamily) || (t = this.fontFamily.split(","));
      for (var r = t.length - 1; r >= 0; r--) {
        var s = t[r].trim();
        !/([\"\'])[^\'\"]+\1/.test(s) && genericFontFamilies.indexOf(s) < 0 && (s = '"' + s + '"'), t[r] = s;
      }
      return this.fontStyle + " " + this.fontVariant + " " + this.fontWeight + " " + e + " " + t.join(",");
    }, a;
  }()
);
function getSingleColor(a) {
  return typeof a == "number" ? hex2string(a) : (typeof a == "string" && a.indexOf("0x") === 0 && (a = a.replace("0x", "#")), a);
}
function getColor(a) {
  if (Array.isArray(a)) {
    for (var e = 0; e < a.length; ++e)
      a[e] = getSingleColor(a[e]);
    return a;
  } else
    return getSingleColor(a);
}
function areArraysEqual(a, e) {
  if (!Array.isArray(a) || !Array.isArray(e) || a.length !== e.length)
    return !1;
  for (var t = 0; t < a.length; ++t)
    if (a[t] !== e[t])
      return !1;
  return !0;
}
function deepCopyProperties(a, e, t) {
  for (var r in t)
    Array.isArray(e[r]) ? a[r] = e[r].slice() : a[r] = e[r];
}
var contextSettings = {
  // TextMetrics requires getImageData readback for measuring fonts.
  willReadFrequently: !0
}, TextMetrics = (
  /** @class */
  function() {
    function a(e, t, r, s, o, u, h, l, c) {
      this.text = e, this.style = t, this.width = r, this.height = s, this.lines = o, this.lineWidths = u, this.lineHeight = h, this.maxLineWidth = l, this.fontProperties = c;
    }
    return a.measureText = function(e, t, r, s) {
      s === void 0 && (s = a._canvas), r = r ?? t.wordWrap;
      var o = t.toFontString(), u = a.measureFont(o);
      u.fontSize === 0 && (u.fontSize = t.fontSize, u.ascent = t.fontSize);
      var h = s.getContext("2d", contextSettings);
      h.font = o;
      for (var l = r ? a.wordWrap(e, t, s) : e, c = l.split(/(?:\r\n|\r|\n)/), d = new Array(c.length), _ = 0, v = 0; v < c.length; v++) {
        var y = h.measureText(c[v]).width + (c[v].length - 1) * t.letterSpacing;
        d[v] = y, _ = Math.max(_, y);
      }
      var b = _ + t.strokeThickness;
      t.dropShadow && (b += t.dropShadowDistance);
      var g = t.lineHeight || u.fontSize + t.strokeThickness, m = Math.max(g, u.fontSize + t.strokeThickness) + (c.length - 1) * (g + t.leading);
      return t.dropShadow && (m += t.dropShadowDistance), new a(e, t, b, m, c, d, g + t.leading, _, u);
    }, a.wordWrap = function(e, t, r) {
      r === void 0 && (r = a._canvas);
      for (var s = r.getContext("2d", contextSettings), o = 0, u = "", h = "", l = /* @__PURE__ */ Object.create(null), c = t.letterSpacing, d = t.whiteSpace, _ = a.collapseSpaces(d), v = a.collapseNewlines(d), y = !_, b = t.wordWrapWidth + c, g = a.tokenize(e), m = 0; m < g.length; m++) {
        var E = g[m];
        if (a.isNewline(E)) {
          if (!v) {
            h += a.addLine(u), y = !_, u = "", o = 0;
            continue;
          }
          E = " ";
        }
        if (_) {
          var S = a.isBreakingSpace(E), P = a.isBreakingSpace(u[u.length - 1]);
          if (S && P)
            continue;
        }
        var L = a.getFromCache(E, c, l, s);
        if (L > b)
          if (u !== "" && (h += a.addLine(u), u = "", o = 0), a.canBreakWords(E, t.breakWords))
            for (var T = a.wordWrapSplit(E), I = 0; I < T.length; I++) {
              for (var w = T[I], M = 1; T[I + M]; ) {
                var F = T[I + M], k = w[w.length - 1];
                if (!a.canBreakChars(k, F, E, I, t.breakWords))
                  w += F;
                else
                  break;
                M++;
              }
              I += w.length - 1;
              var V = a.getFromCache(w, c, l, s);
              V + o > b && (h += a.addLine(u), y = !1, u = "", o = 0), u += w, o += V;
            }
          else {
            u.length > 0 && (h += a.addLine(u), u = "", o = 0);
            var X = m === g.length - 1;
            h += a.addLine(E, !X), y = !1, u = "", o = 0;
          }
        else
          L + o > b && (y = !1, h += a.addLine(u), u = "", o = 0), (u.length > 0 || !a.isBreakingSpace(E) || y) && (u += E, o += L);
      }
      return h += a.addLine(u, !1), h;
    }, a.addLine = function(e, t) {
      return t === void 0 && (t = !0), e = a.trimRight(e), e = t ? e + `
` : e, e;
    }, a.getFromCache = function(e, t, r, s) {
      var o = r[e];
      if (typeof o != "number") {
        var u = e.length * t;
        o = s.measureText(e).width + u, r[e] = o;
      }
      return o;
    }, a.collapseSpaces = function(e) {
      return e === "normal" || e === "pre-line";
    }, a.collapseNewlines = function(e) {
      return e === "normal";
    }, a.trimRight = function(e) {
      if (typeof e != "string")
        return "";
      for (var t = e.length - 1; t >= 0; t--) {
        var r = e[t];
        if (!a.isBreakingSpace(r))
          break;
        e = e.slice(0, -1);
      }
      return e;
    }, a.isNewline = function(e) {
      return typeof e != "string" ? !1 : a._newlines.indexOf(e.charCodeAt(0)) >= 0;
    }, a.isBreakingSpace = function(e, t) {
      return typeof e != "string" ? !1 : a._breakingSpaces.indexOf(e.charCodeAt(0)) >= 0;
    }, a.tokenize = function(e) {
      var t = [], r = "";
      if (typeof e != "string")
        return t;
      for (var s = 0; s < e.length; s++) {
        var o = e[s], u = e[s + 1];
        if (a.isBreakingSpace(o, u) || a.isNewline(o)) {
          r !== "" && (t.push(r), r = ""), t.push(o);
          continue;
        }
        r += o;
      }
      return r !== "" && t.push(r), t;
    }, a.canBreakWords = function(e, t) {
      return t;
    }, a.canBreakChars = function(e, t, r, s, o) {
      return !0;
    }, a.wordWrapSplit = function(e) {
      return e.split("");
    }, a.measureFont = function(e) {
      if (a._fonts[e])
        return a._fonts[e];
      var t = {
        ascent: 0,
        descent: 0,
        fontSize: 0
      }, r = a._canvas, s = a._context;
      s.font = e;
      var o = a.METRICS_STRING + a.BASELINE_SYMBOL, u = Math.ceil(s.measureText(o).width), h = Math.ceil(s.measureText(a.BASELINE_SYMBOL).width), l = Math.ceil(a.HEIGHT_MULTIPLIER * h);
      h = h * a.BASELINE_MULTIPLIER | 0, r.width = u, r.height = l, s.fillStyle = "#f00", s.fillRect(0, 0, u, l), s.font = e, s.textBaseline = "alphabetic", s.fillStyle = "#000", s.fillText(o, 0, h);
      var c = s.getImageData(0, 0, u, l).data, d = c.length, _ = u * 4, v = 0, y = 0, b = !1;
      for (v = 0; v < h; ++v) {
        for (var g = 0; g < _; g += 4)
          if (c[y + g] !== 255) {
            b = !0;
            break;
          }
        if (!b)
          y += _;
        else
          break;
      }
      for (t.ascent = h - v, y = d - _, b = !1, v = l; v > h; --v) {
        for (var g = 0; g < _; g += 4)
          if (c[y + g] !== 255) {
            b = !0;
            break;
          }
        if (!b)
          y -= _;
        else
          break;
      }
      return t.descent = v - h, t.fontSize = t.ascent + t.descent, a._fonts[e] = t, t;
    }, a.clearMetrics = function(e) {
      e === void 0 && (e = ""), e ? delete a._fonts[e] : a._fonts = {};
    }, Object.defineProperty(a, "_canvas", {
      /**
       * Cached canvas element for measuring text
       * TODO: this should be private, but isn't because of backward compat, will fix later.
       * @ignore
       */
      get: function() {
        if (!a.__canvas) {
          var e = void 0;
          try {
            var t = new OffscreenCanvas(0, 0), r = t.getContext("2d", contextSettings);
            if (r && r.measureText)
              return a.__canvas = t, t;
            e = settings.ADAPTER.createCanvas();
          } catch {
            e = settings.ADAPTER.createCanvas();
          }
          e.width = e.height = 10, a.__canvas = e;
        }
        return a.__canvas;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(a, "_context", {
      /**
       * TODO: this should be private, but isn't because of backward compat, will fix later.
       * @ignore
       */
      get: function() {
        return a.__context || (a.__context = a._canvas.getContext("2d", contextSettings)), a.__context;
      },
      enumerable: !1,
      configurable: !0
    }), a;
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
  function(a) {
    __extends$c(e, a);
    function e(t, r, s) {
      var o = this, u = !1;
      s || (s = settings.ADAPTER.createCanvas(), u = !0), s.width = 3, s.height = 3;
      var h = Texture.from(s);
      return h.orig = new Rectangle(), h.trim = new Rectangle(), o = a.call(this, h) || this, o._ownCanvas = u, o.canvas = s, o.context = s.getContext("2d", {
        // required for trimming to work without warnings
        willReadFrequently: !0
      }), o._resolution = settings.RESOLUTION, o._autoResolution = !0, o._text = null, o._style = null, o._styleListener = null, o._font = "", o.text = t, o.style = r, o.localStyleID = -1, o;
    }
    return e.prototype.updateText = function(t) {
      var r = this._style;
      if (this.localStyleID !== r.styleID && (this.dirty = !0, this.localStyleID = r.styleID), !(!this.dirty && t)) {
        this._font = this._style.toFontString();
        var s = this.context, o = TextMetrics.measureText(this._text || " ", this._style, this._style.wordWrap, this.canvas), u = o.width, h = o.height, l = o.lines, c = o.lineHeight, d = o.lineWidths, _ = o.maxLineWidth, v = o.fontProperties;
        this.canvas.width = Math.ceil(Math.ceil(Math.max(1, u) + r.padding * 2) * this._resolution), this.canvas.height = Math.ceil(Math.ceil(Math.max(1, h) + r.padding * 2) * this._resolution), s.scale(this._resolution, this._resolution), s.clearRect(0, 0, this.canvas.width, this.canvas.height), s.font = this._font, s.lineWidth = r.strokeThickness, s.textBaseline = r.textBaseline, s.lineJoin = r.lineJoin, s.miterLimit = r.miterLimit;
        for (var y, b, g = r.dropShadow ? 2 : 1, m = 0; m < g; ++m) {
          var E = r.dropShadow && m === 0, S = E ? Math.ceil(Math.max(1, h) + r.padding * 2) : 0, P = S * this._resolution;
          if (E) {
            s.fillStyle = "black", s.strokeStyle = "black";
            var L = r.dropShadowColor, T = hex2rgb(typeof L == "number" ? L : string2hex(L)), I = r.dropShadowBlur * this._resolution, w = r.dropShadowDistance * this._resolution;
            s.shadowColor = "rgba(" + T[0] * 255 + "," + T[1] * 255 + "," + T[2] * 255 + "," + r.dropShadowAlpha + ")", s.shadowBlur = I, s.shadowOffsetX = Math.cos(r.dropShadowAngle) * w, s.shadowOffsetY = Math.sin(r.dropShadowAngle) * w + P;
          } else
            s.fillStyle = this._generateFillStyle(r, l, o), s.strokeStyle = r.stroke, s.shadowColor = "black", s.shadowBlur = 0, s.shadowOffsetX = 0, s.shadowOffsetY = 0;
          var M = (c - v.fontSize) / 2;
          (!e.nextLineHeightBehavior || c - v.fontSize < 0) && (M = 0);
          for (var F = 0; F < l.length; F++)
            y = r.strokeThickness / 2, b = r.strokeThickness / 2 + F * c + v.ascent + M, r.align === "right" ? y += _ - d[F] : r.align === "center" && (y += (_ - d[F]) / 2), r.stroke && r.strokeThickness && this.drawLetterSpacing(l[F], y + r.padding, b + r.padding - S, !0), r.fill && this.drawLetterSpacing(l[F], y + r.padding, b + r.padding - S);
        }
        this.updateTexture();
      }
    }, e.prototype.drawLetterSpacing = function(t, r, s, o) {
      o === void 0 && (o = !1);
      var u = this._style, h = u.letterSpacing, l = e.experimentalLetterSpacing && ("letterSpacing" in CanvasRenderingContext2D.prototype || "textLetterSpacing" in CanvasRenderingContext2D.prototype);
      if (h === 0 || l) {
        l && (this.context.letterSpacing = h, this.context.textLetterSpacing = h), o ? this.context.strokeText(t, r, s) : this.context.fillText(t, r, s);
        return;
      }
      for (var c = r, d = Array.from ? Array.from(t) : t.split(""), _ = this.context.measureText(t).width, v = 0, y = 0; y < d.length; ++y) {
        var b = d[y];
        o ? this.context.strokeText(b, c, s) : this.context.fillText(b, c, s);
        for (var g = "", m = y + 1; m < d.length; ++m)
          g += d[m];
        v = this.context.measureText(g).width, c += _ - v + h, _ = v;
      }
    }, e.prototype.updateTexture = function() {
      var t = this.canvas;
      if (this._style.trim) {
        var r = trimCanvas(t);
        r.data && (t.width = r.width, t.height = r.height, this.context.putImageData(r.data, 0, 0));
      }
      var s = this._texture, o = this._style, u = o.trim ? 0 : o.padding, h = s.baseTexture;
      s.trim.width = s._frame.width = t.width / this._resolution, s.trim.height = s._frame.height = t.height / this._resolution, s.trim.x = -u, s.trim.y = -u, s.orig.width = s._frame.width - u * 2, s.orig.height = s._frame.height - u * 2, this._onTextureUpdate(), h.setRealSize(t.width, t.height, this._resolution), s.updateUvs(), this.dirty = !1;
    }, e.prototype._render = function(t) {
      this._autoResolution && this._resolution !== t.resolution && (this._resolution = t.resolution, this.dirty = !0), this.updateText(!0), a.prototype._render.call(this, t);
    }, e.prototype.updateTransform = function() {
      this.updateText(!0), a.prototype.updateTransform.call(this);
    }, e.prototype.getBounds = function(t, r) {
      return this.updateText(!0), this._textureID === -1 && (t = !1), a.prototype.getBounds.call(this, t, r);
    }, e.prototype.getLocalBounds = function(t) {
      return this.updateText(!0), a.prototype.getLocalBounds.call(this, t);
    }, e.prototype._calculateBounds = function() {
      this.calculateVertices(), this._bounds.addQuad(this.vertexData);
    }, e.prototype._generateFillStyle = function(t, r, s) {
      var o = t.fill;
      if (Array.isArray(o)) {
        if (o.length === 1)
          return o[0];
      } else return o;
      var u, h = t.dropShadow ? t.dropShadowDistance : 0, l = t.padding || 0, c = this.canvas.width / this._resolution - h - l * 2, d = this.canvas.height / this._resolution - h - l * 2, _ = o.slice(), v = t.fillGradientStops.slice();
      if (!v.length)
        for (var y = _.length + 1, b = 1; b < y; ++b)
          v.push(b / y);
      if (_.unshift(o[0]), v.unshift(0), _.push(o[o.length - 1]), v.push(1), t.fillGradientType === TEXT_GRADIENT.LINEAR_VERTICAL) {
        u = this.context.createLinearGradient(c / 2, l, c / 2, d + l);
        for (var g = s.fontProperties.fontSize + t.strokeThickness, b = 0; b < r.length; b++) {
          var m = s.lineHeight * (b - 1) + g, E = s.lineHeight * b, S = E;
          b > 0 && m > E && (S = (E + m) / 2);
          var P = E + g, L = s.lineHeight * (b + 1), T = P;
          b + 1 < r.length && L < P && (T = (P + L) / 2);
          for (var I = (T - S) / d, w = 0; w < _.length; w++) {
            var M = 0;
            typeof v[w] == "number" ? M = v[w] : M = w / _.length;
            var F = Math.min(1, Math.max(0, S / d + M * I));
            F = Number(F.toFixed(5)), u.addColorStop(F, _[w]);
          }
        }
      } else {
        u = this.context.createLinearGradient(l, d / 2, c + l, d / 2);
        for (var k = _.length + 1, V = 1, b = 0; b < _.length; b++) {
          var X = void 0;
          typeof v[b] == "number" ? X = v[b] : X = V / k, u.addColorStop(X, _[b]), V++;
        }
      }
      return u;
    }, e.prototype.destroy = function(t) {
      typeof t == "boolean" && (t = { children: t }), t = Object.assign({}, defaultDestroyOptions, t), a.prototype.destroy.call(this, t), this._ownCanvas && (this.canvas.height = this.canvas.width = 0), this.context = null, this.canvas = null, this._style = null;
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
var extendStatics$b = function(a, e) {
  return extendStatics$b = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, r) {
    t.__proto__ = r;
  } || function(t, r) {
    for (var s in r)
      r.hasOwnProperty(s) && (t[s] = r[s]);
  }, extendStatics$b(a, e);
};
function __extends$b(a, e) {
  extendStatics$b(a, e);
  function t() {
    this.constructor = a;
  }
  a.prototype = e === null ? Object.create(e) : (t.prototype = e.prototype, new t());
}
var CountLimiter = (
  /** @class */
  function() {
    function a(e) {
      this.maxItemsPerFrame = e, this.itemsLeft = 0;
    }
    return a.prototype.beginFrame = function() {
      this.itemsLeft = this.maxItemsPerFrame;
    }, a.prototype.allowedToUpload = function() {
      return this.itemsLeft-- > 0;
    }, a;
  }()
);
function findMultipleBaseTextures(a, e) {
  var t = !1;
  if (a && a._textures && a._textures.length) {
    for (var r = 0; r < a._textures.length; r++)
      if (a._textures[r] instanceof Texture) {
        var s = a._textures[r].baseTexture;
        e.indexOf(s) === -1 && (e.push(s), t = !0);
      }
  }
  return t;
}
function findBaseTexture(a, e) {
  if (a.baseTexture instanceof BaseTexture) {
    var t = a.baseTexture;
    return e.indexOf(t) === -1 && e.push(t), !0;
  }
  return !1;
}
function findTexture(a, e) {
  if (a._texture && a._texture instanceof Texture) {
    var t = a._texture.baseTexture;
    return e.indexOf(t) === -1 && e.push(t), !0;
  }
  return !1;
}
function drawText(a, e) {
  return e instanceof Text ? (e.updateText(!0), !0) : !1;
}
function calculateTextStyle(a, e) {
  if (e instanceof TextStyle) {
    var t = e.toFontString();
    return TextMetrics.measureFont(t), !0;
  }
  return !1;
}
function findText(a, e) {
  if (a instanceof Text) {
    e.indexOf(a.style) === -1 && e.push(a.style), e.indexOf(a) === -1 && e.push(a);
    var t = a._texture.baseTexture;
    return e.indexOf(t) === -1 && e.push(t), !0;
  }
  return !1;
}
function findTextStyle(a, e) {
  return a instanceof TextStyle ? (e.indexOf(a) === -1 && e.push(a), !0) : !1;
}
var BasePrepare = (
  /** @class */
  function() {
    function a(e) {
      var t = this;
      this.limiter = new CountLimiter(settings.UPLOADS_PER_FRAME), this.renderer = e, this.uploadHookHelper = null, this.queue = [], this.addHooks = [], this.uploadHooks = [], this.completes = [], this.ticking = !1, this.delayedTick = function() {
        t.queue && t.prepareItems();
      }, this.registerFindHook(findText), this.registerFindHook(findTextStyle), this.registerFindHook(findMultipleBaseTextures), this.registerFindHook(findBaseTexture), this.registerFindHook(findTexture), this.registerUploadHook(drawText), this.registerUploadHook(calculateTextStyle);
    }
    return a.prototype.upload = function(e, t) {
      var r = this;
      return typeof e == "function" && (t = e, e = null), t && deprecation("6.5.0", "BasePrepare.upload callback is deprecated, use the return Promise instead."), new Promise(function(s) {
        e && r.add(e);
        var o = function() {
          t?.(), s();
        };
        r.queue.length ? (r.completes.push(o), r.ticking || (r.ticking = !0, Ticker.system.addOnce(r.tick, r, UPDATE_PRIORITY.UTILITY))) : o();
      });
    }, a.prototype.tick = function() {
      setTimeout(this.delayedTick, 0);
    }, a.prototype.prepareItems = function() {
      for (this.limiter.beginFrame(); this.queue.length && this.limiter.allowedToUpload(); ) {
        var e = this.queue[0], t = !1;
        if (e && !e._destroyed) {
          for (var r = 0, s = this.uploadHooks.length; r < s; r++)
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
        for (var r = 0, s = o.length; r < s; r++)
          o[r]();
      }
    }, a.prototype.registerFindHook = function(e) {
      return e && this.addHooks.push(e), this;
    }, a.prototype.registerUploadHook = function(e) {
      return e && this.uploadHooks.push(e), this;
    }, a.prototype.add = function(e) {
      for (var t = 0, r = this.addHooks.length; t < r && !this.addHooks[t](e, this.queue); t++)
        ;
      if (e instanceof Container)
        for (var t = e.children.length - 1; t >= 0; t--)
          this.add(e.children[t]);
      return this;
    }, a.prototype.destroy = function() {
      this.ticking && Ticker.system.remove(this.tick, this), this.ticking = !1, this.addHooks = null, this.uploadHooks = null, this.renderer = null, this.completes = null, this.queue = null, this.limiter = null, this.uploadHookHelper = null;
    }, a;
  }()
);
function uploadBaseTextures(a, e) {
  return e instanceof BaseTexture ? (e._glTextures[a.CONTEXT_UID] || a.texture.bind(e), !0) : !1;
}
function uploadGraphics(a, e) {
  if (!(e instanceof Graphics))
    return !1;
  var t = e.geometry;
  e.finishPoly(), t.updateBatches();
  for (var r = t.batches, s = 0; s < r.length; s++) {
    var o = r[s].style.texture;
    o && uploadBaseTextures(a, o.baseTexture);
  }
  return t.batchable || a.geometry.bind(t, e._resolveDirectShader(a)), !0;
}
function findGraphics(a, e) {
  return a instanceof Graphics ? (e.push(a), !0) : !1;
}
var Prepare = (
  /** @class */
  function(a) {
    __extends$b(e, a);
    function e(t) {
      var r = a.call(this, t) || this;
      return r.uploadHookHelper = r.renderer, r.registerFindHook(findGraphics), r.registerUploadHook(uploadBaseTextures), r.registerUploadHook(uploadGraphics), r;
    }
    return e.extension = {
      name: "prepare",
      type: ExtensionType.RendererPlugin
    }, e;
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
    function a(e, t, r) {
      r === void 0 && (r = null), this.linkedSheets = [], this._texture = e instanceof Texture ? e : null, this.baseTexture = e instanceof BaseTexture ? e : this._texture.baseTexture, this.textures = {}, this.animations = {}, this.data = t;
      var s = this.baseTexture.resource;
      this.resolution = this._updateResolution(r || (s ? s.url : null)), this._frames = this.data.frames, this._frameKeys = Object.keys(this._frames), this._batchIndex = 0, this._callback = null;
    }
    return a.prototype._updateResolution = function(e) {
      e === void 0 && (e = null);
      var t = this.data.meta.scale, r = getResolutionOfUrl(e, null);
      return r === null && (r = t !== void 0 ? parseFloat(t) : 1), r !== 1 && this.baseTexture.setResolution(r), r;
    }, a.prototype.parse = function(e) {
      var t = this;
      return e && deprecation("6.5.0", "Spritesheet.parse callback is deprecated, use the return Promise instead."), new Promise(function(r) {
        t._callback = function(s) {
          e?.(s), r(s);
        }, t._batchIndex = 0, t._frameKeys.length <= a.BATCH_SIZE ? (t._processFrames(0), t._processAnimations(), t._parseComplete()) : t._nextBatch();
      });
    }, a.prototype._processFrames = function(e) {
      for (var t = e, r = a.BATCH_SIZE; t - e < r && t < this._frameKeys.length; ) {
        var s = this._frameKeys[t], o = this._frames[s], u = o.frame;
        if (u) {
          var h = null, l = null, c = o.trimmed !== !1 && o.sourceSize ? o.sourceSize : o.frame, d = new Rectangle(0, 0, Math.floor(c.w) / this.resolution, Math.floor(c.h) / this.resolution);
          o.rotated ? h = new Rectangle(Math.floor(u.x) / this.resolution, Math.floor(u.y) / this.resolution, Math.floor(u.h) / this.resolution, Math.floor(u.w) / this.resolution) : h = new Rectangle(Math.floor(u.x) / this.resolution, Math.floor(u.y) / this.resolution, Math.floor(u.w) / this.resolution, Math.floor(u.h) / this.resolution), o.trimmed !== !1 && o.spriteSourceSize && (l = new Rectangle(Math.floor(o.spriteSourceSize.x) / this.resolution, Math.floor(o.spriteSourceSize.y) / this.resolution, Math.floor(u.w) / this.resolution, Math.floor(u.h) / this.resolution)), this.textures[s] = new Texture(this.baseTexture, h, d, l, o.rotated ? 2 : 0, o.anchor), Texture.addToCache(this.textures[s], s);
        }
        t++;
      }
    }, a.prototype._processAnimations = function() {
      var e = this.data.animations || {};
      for (var t in e) {
        this.animations[t] = [];
        for (var r = 0; r < e[t].length; r++) {
          var s = e[t][r];
          this.animations[t].push(this.textures[s]);
        }
      }
    }, a.prototype._parseComplete = function() {
      var e = this._callback;
      this._callback = null, this._batchIndex = 0, e.call(this, this.textures);
    }, a.prototype._nextBatch = function() {
      var e = this;
      this._processFrames(this._batchIndex * a.BATCH_SIZE), this._batchIndex++, setTimeout(function() {
        e._batchIndex * a.BATCH_SIZE < e._frameKeys.length ? e._nextBatch() : (e._processAnimations(), e._parseComplete());
      }, 0);
    }, a.prototype.destroy = function(e) {
      var t;
      e === void 0 && (e = !1);
      for (var r in this.textures)
        this.textures[r].destroy();
      this._frames = null, this._frameKeys = null, this.data = null, this.textures = null, e && ((t = this._texture) === null || t === void 0 || t.destroy(), this.baseTexture.destroy()), this._texture = null, this.baseTexture = null, this.linkedSheets = [];
    }, a.BATCH_SIZE = 1e3, a;
  }()
), SpritesheetLoader = (
  /** @class */
  function() {
    function a() {
    }
    return a.use = function(e, t) {
      var r, s, o = this, u = e.name + "_image";
      if (!e.data || e.type !== LoaderResource.TYPE.JSON || !e.data.frames || o.resources[u]) {
        t();
        return;
      }
      var h = (s = (r = e.data) === null || r === void 0 ? void 0 : r.meta) === null || s === void 0 ? void 0 : s.related_multi_packs;
      if (Array.isArray(h))
        for (var l = function(b) {
          if (typeof b != "string")
            return "continue";
          var g = b.replace(".json", ""), m = url$1.resolve(e.url.replace(o.baseUrl, ""), b);
          if (o.resources[g] || Object.values(o.resources).some(function(S) {
            return url$1.format(url$1.parse(S.url)) === m;
          }))
            return "continue";
          var E = {
            crossOrigin: e.crossOrigin,
            loadType: LoaderResource.LOAD_TYPE.XHR,
            xhrType: LoaderResource.XHR_RESPONSE_TYPE.JSON,
            parentResource: e,
            metadata: e.metadata
          };
          o.add(g, m, E);
        }, c = 0, d = h; c < d.length; c++) {
          var _ = d[c];
          l(_);
        }
      var v = {
        crossOrigin: e.crossOrigin,
        metadata: e.metadata.imageMetadata,
        parentResource: e
      }, y = a.getResourcePath(e, o.baseUrl);
      o.add(u, y, v, function(g) {
        if (g.error) {
          t(g.error);
          return;
        }
        var m = new Spritesheet(g.texture, e.data, e.url);
        m.parse().then(function() {
          e.spritesheet = m, e.textures = m.textures, t();
        });
      });
    }, a.getResourcePath = function(e, t) {
      return e.isDataUrl ? e.data.meta.image : url$1.resolve(e.url.replace(t, ""), e.data.meta.image);
    }, a.extension = ExtensionType.Loader, a;
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
var extendStatics$a = function(a, e) {
  return extendStatics$a = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, r) {
    t.__proto__ = r;
  } || function(t, r) {
    for (var s in r)
      r.hasOwnProperty(s) && (t[s] = r[s]);
  }, extendStatics$a(a, e);
};
function __extends$a(a, e) {
  extendStatics$a(a, e);
  function t() {
    this.constructor = a;
  }
  a.prototype = e === null ? Object.create(e) : (t.prototype = e.prototype, new t());
}
var tempPoint$1 = new Point();
(function(a) {
  __extends$a(e, a);
  function e(t, r, s) {
    r === void 0 && (r = 100), s === void 0 && (s = 100);
    var o = a.call(this, t) || this;
    return o.tileTransform = new Transform(), o._width = r, o._height = s, o.uvMatrix = o.texture.uvMatrix || new TextureMatrix(t), o.pluginName = "tilingSprite", o.uvRespectAnchor = !1, o;
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
    var t = this._width * -this._anchor._x, r = this._height * -this._anchor._y, s = this._width * (1 - this._anchor._x), o = this._height * (1 - this._anchor._y);
    this._bounds.addFrame(this.transform, t, r, s, o);
  }, e.prototype.getLocalBounds = function(t) {
    return this.children.length === 0 ? (this._bounds.minX = this._width * -this._anchor._x, this._bounds.minY = this._height * -this._anchor._y, this._bounds.maxX = this._width * (1 - this._anchor._x), this._bounds.maxY = this._height * (1 - this._anchor._y), t || (this._localBoundsRect || (this._localBoundsRect = new Rectangle()), t = this._localBoundsRect), this._bounds.getRectangle(t)) : a.prototype.getLocalBounds.call(this, t);
  }, e.prototype.containsPoint = function(t) {
    this.worldTransform.applyInverse(t, tempPoint$1);
    var r = this._width, s = this._height, o = -r * this.anchor._x;
    if (tempPoint$1.x >= o && tempPoint$1.x < o + r) {
      var u = -s * this.anchor._y;
      if (tempPoint$1.y >= u && tempPoint$1.y < u + s)
        return !0;
    }
    return !1;
  }, e.prototype.destroy = function(t) {
    a.prototype.destroy.call(this, t), this.tileTransform = null, this.uvMatrix = null;
  }, e.from = function(t, r) {
    var s = t instanceof Texture ? t : Texture.from(t, r);
    return new e(s, r.width, r.height);
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
  function(a) {
    __extends$a(e, a);
    function e(t) {
      var r = a.call(this, t) || this;
      return t.runners.contextChange.add(r), r.quad = new QuadUv(), r.state = State.for2d(), r;
    }
    return e.prototype.contextChange = function() {
      var t = this.renderer, r = { globals: t.globalUniforms };
      this.simpleShader = Shader.from(gl1VertexSrc, fragmentSimpleSrc, r), this.shader = t.context.webGLVersion > 1 ? Shader.from(gl2VertexSrc, gl2FragmentSrc, r) : Shader.from(gl1VertexSrc, gl1FragmentSrc, r);
    }, e.prototype.render = function(t) {
      var r = this.renderer, s = this.quad, o = s.vertices;
      o[0] = o[6] = t._width * -t.anchor.x, o[1] = o[3] = t._height * -t.anchor.y, o[2] = o[4] = t._width * (1 - t.anchor.x), o[5] = o[7] = t._height * (1 - t.anchor.y);
      var u = t.uvRespectAnchor ? t.anchor.x : 0, h = t.uvRespectAnchor ? t.anchor.y : 0;
      o = s.uvs, o[0] = o[6] = -u, o[1] = o[3] = -h, o[2] = o[4] = 1 - u, o[5] = o[7] = 1 - h, s.invalidate();
      var l = t._texture, c = l.baseTexture, d = c.alphaMode > 0, _ = t.tileTransform.localTransform, v = t.uvMatrix, y = c.isPowerOfTwo && l.frame.width === c.width && l.frame.height === c.height;
      y && (c._glTextures[r.CONTEXT_UID] ? y = c.wrapMode !== WRAP_MODES.CLAMP : c.wrapMode === WRAP_MODES.CLAMP && (c.wrapMode = WRAP_MODES.REPEAT));
      var b = y ? this.simpleShader : this.shader, g = l.width, m = l.height, E = t._width, S = t._height;
      tempMat.set(_.a * g / E, _.b * g / S, _.c * m / E, _.d * m / S, _.tx / E, _.ty / S), tempMat.invert(), y ? tempMat.prepend(v.mapCoord) : (b.uniforms.uMapCoord = v.mapCoord.toArray(!0), b.uniforms.uClampFrame = v.uClampFrame, b.uniforms.uClampOffset = v.uClampOffset), b.uniforms.uTransform = tempMat.toArray(!0), b.uniforms.uColor = premultiplyTintToRgba(t.tint, t.worldAlpha, b.uniforms.uColor, d), b.uniforms.translationMatrix = t.transform.worldTransform.toArray(!0), b.uniforms.uSampler = l, r.shader.bind(b), r.geometry.bind(s), this.state.blendMode = correctBlendMode(t.blendMode, d), r.state.set(this.state), r.geometry.draw(this.renderer.gl.TRIANGLES, 6, 0);
    }, e.extension = {
      name: "tilingSprite",
      type: ExtensionType.RendererPlugin
    }, e;
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
var extendStatics$9 = function(a, e) {
  return extendStatics$9 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, r) {
    t.__proto__ = r;
  } || function(t, r) {
    for (var s in r)
      r.hasOwnProperty(s) && (t[s] = r[s]);
  }, extendStatics$9(a, e);
};
function __extends$9(a, e) {
  extendStatics$9(a, e);
  function t() {
    this.constructor = a;
  }
  a.prototype = e === null ? Object.create(e) : (t.prototype = e.prototype, new t());
}
var MeshBatchUvs = (
  /** @class */
  function() {
    function a(e, t) {
      this.uvBuffer = e, this.uvMatrix = t, this.data = null, this._bufferUpdateId = -1, this._textureUpdateId = -1, this._updateID = 0;
    }
    return a.prototype.update = function(e) {
      if (!(!e && this._bufferUpdateId === this.uvBuffer._updateID && this._textureUpdateId === this.uvMatrix._updateID)) {
        this._bufferUpdateId = this.uvBuffer._updateID, this._textureUpdateId = this.uvMatrix._updateID;
        var t = this.uvBuffer.data;
        (!this.data || this.data.length !== t.length) && (this.data = new Float32Array(t.length)), this.uvMatrix.multiplyUvs(t, this.data), this._updateID++;
      }
    }, a;
  }()
), tempPoint = new Point(), tempPolygon = new Polygon(), Mesh = (
  /** @class */
  function(a) {
    __extends$9(e, a);
    function e(t, r, s, o) {
      o === void 0 && (o = DRAW_MODES.TRIANGLES);
      var u = a.call(this) || this;
      return u.geometry = t, u.shader = r, u.state = s || State.for2d(), u.drawMode = o, u.start = 0, u.size = 0, u.uvs = null, u.indices = null, u.vertexData = new Float32Array(1), u.vertexDirty = -1, u._transformID = -1, u._roundPixels = settings.ROUND_PIXELS, u.batchUvs = null, u;
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
      var r = this.geometry.buffers[0].data, s = this.shader;
      s.batchable && this.drawMode === DRAW_MODES.TRIANGLES && r.length < e.BATCHABLE_SIZE * 2 ? this._renderToBatch(t) : this._renderDefault(t);
    }, e.prototype._renderDefault = function(t) {
      var r = this.shader;
      r.alpha = this.worldAlpha, r.update && r.update(), t.batch.flush(), r.uniforms.translationMatrix = this.transform.worldTransform.toArray(!0), t.shader.bind(r), t.state.set(this.state), t.geometry.bind(this.geometry, r), t.geometry.draw(this.drawMode, this.size, this.start, this.geometry.instanceCount);
    }, e.prototype._renderToBatch = function(t) {
      var r = this.geometry, s = this.shader;
      s.uvMatrix && (s.uvMatrix.update(), this.calculateUvs()), this.calculateVertices(), this.indices = r.indexBuffer.data, this._tintRGB = s._tintRGB, this._texture = s.texture;
      var o = this.material.pluginName;
      t.batch.setObjectRenderer(t.plugins[o]), t.plugins[o].render(this);
    }, e.prototype.calculateVertices = function() {
      var t = this.geometry, r = t.buffers[0], s = r.data, o = r._updateID;
      if (!(o === this.vertexDirty && this._transformID === this.transform._worldID)) {
        this._transformID = this.transform._worldID, this.vertexData.length !== s.length && (this.vertexData = new Float32Array(s.length));
        for (var u = this.transform.worldTransform, h = u.a, l = u.b, c = u.c, d = u.d, _ = u.tx, v = u.ty, y = this.vertexData, b = 0; b < y.length / 2; b++) {
          var g = s[b * 2], m = s[b * 2 + 1];
          y[b * 2] = h * g + c * m + _, y[b * 2 + 1] = l * g + d * m + v;
        }
        if (this._roundPixels)
          for (var E = settings.RESOLUTION, b = 0; b < y.length; ++b)
            y[b] = Math.round((y[b] * E | 0) / E);
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
      for (var r = this.geometry.getBuffer("aVertexPosition").data, s = tempPolygon.points, o = this.geometry.getIndex().data, u = o.length, h = this.drawMode === 4 ? 3 : 1, l = 0; l + 2 < u; l += h) {
        var c = o[l] * 2, d = o[l + 1] * 2, _ = o[l + 2] * 2;
        if (s[0] = r[c], s[1] = r[c + 1], s[2] = r[d], s[3] = r[d + 1], s[4] = r[_], s[5] = r[_ + 1], tempPolygon.contains(tempPoint.x, tempPoint.y))
          return !0;
      }
      return !1;
    }, e.prototype.destroy = function(t) {
      a.prototype.destroy.call(this, t), this._cachedTexture && (this._cachedTexture.destroy(), this._cachedTexture = null), this.geometry = null, this.shader = null, this.state = null, this.uvs = null, this.indices = null, this.vertexData = null;
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
  function(a) {
    __extends$9(e, a);
    function e(t, r) {
      var s = this, o = {
        uSampler: t,
        alpha: 1,
        uTextureMatrix: Matrix.IDENTITY,
        uColor: new Float32Array([1, 1, 1, 1])
      };
      return r = Object.assign({
        tint: 16777215,
        alpha: 1,
        pluginName: "batch"
      }, r), r.uniforms && Object.assign(o, r.uniforms), s = a.call(this, r.program || Program.from(vertex$2, fragment$5), o) || this, s._colorDirty = !1, s.uvMatrix = new TextureMatrix(t), s.batchable = r.program === void 0, s.pluginName = r.pluginName, s.tint = r.tint, s.alpha = r.alpha, s;
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
  function(a) {
    __extends$9(e, a);
    function e(t, r, s) {
      var o = a.call(this) || this, u = new Buffer(t), h = new Buffer(r, !0), l = new Buffer(s, !0, !0);
      return o.addAttribute("aVertexPosition", u, 2, !1, TYPES.FLOAT).addAttribute("aTextureCoord", h, 2, !1, TYPES.FLOAT).addIndex(l), o._updateId = -1, o;
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
var extendStatics$8 = function(a, e) {
  return extendStatics$8 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, r) {
    t.__proto__ = r;
  } || function(t, r) {
    for (var s in r)
      r.hasOwnProperty(s) && (t[s] = r[s]);
  }, extendStatics$8(a, e);
};
function __extends$8(a, e) {
  extendStatics$8(a, e);
  function t() {
    this.constructor = a;
  }
  a.prototype = e === null ? Object.create(e) : (t.prototype = e.prototype, new t());
}
var BitmapFontData = (
  /** @class */
  /* @__PURE__ */ function() {
    function a() {
      this.info = [], this.common = [], this.page = [], this.char = [], this.kerning = [], this.distanceField = [];
    }
    return a;
  }()
), TextFormat = (
  /** @class */
  function() {
    function a() {
    }
    return a.test = function(e) {
      return typeof e == "string" && e.indexOf("info face=") === 0;
    }, a.parse = function(e) {
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
      for (var s in t) {
        var o = t[s].match(/^[a-z]+/gm)[0], u = t[s].match(/[a-zA-Z]+=([^\s"']+|"([^"]*)")/gm), h = {};
        for (var l in u) {
          var c = u[l].split("="), d = c[0], _ = c[1].replace(/"/gm, ""), v = parseFloat(_), y = isNaN(v) ? _ : v;
          h[d] = y;
        }
        r[o].push(h);
      }
      var b = new BitmapFontData();
      return r.info.forEach(function(g) {
        return b.info.push({
          face: g.face,
          size: parseInt(g.size, 10)
        });
      }), r.common.forEach(function(g) {
        return b.common.push({
          lineHeight: parseInt(g.lineHeight, 10)
        });
      }), r.page.forEach(function(g) {
        return b.page.push({
          id: parseInt(g.id, 10),
          file: g.file
        });
      }), r.char.forEach(function(g) {
        return b.char.push({
          id: parseInt(g.id, 10),
          page: parseInt(g.page, 10),
          x: parseInt(g.x, 10),
          y: parseInt(g.y, 10),
          width: parseInt(g.width, 10),
          height: parseInt(g.height, 10),
          xoffset: parseInt(g.xoffset, 10),
          yoffset: parseInt(g.yoffset, 10),
          xadvance: parseInt(g.xadvance, 10)
        });
      }), r.kerning.forEach(function(g) {
        return b.kerning.push({
          first: parseInt(g.first, 10),
          second: parseInt(g.second, 10),
          amount: parseInt(g.amount, 10)
        });
      }), r.distanceField.forEach(function(g) {
        return b.distanceField.push({
          distanceRange: parseInt(g.distanceRange, 10),
          fieldType: g.fieldType
        });
      }), b;
    }, a;
  }()
), XMLFormat = (
  /** @class */
  function() {
    function a() {
    }
    return a.test = function(e) {
      return e instanceof XMLDocument && e.getElementsByTagName("page").length && e.getElementsByTagName("info")[0].getAttribute("face") !== null;
    }, a.parse = function(e) {
      for (var t = new BitmapFontData(), r = e.getElementsByTagName("info"), s = e.getElementsByTagName("common"), o = e.getElementsByTagName("page"), u = e.getElementsByTagName("char"), h = e.getElementsByTagName("kerning"), l = e.getElementsByTagName("distanceField"), c = 0; c < r.length; c++)
        t.info.push({
          face: r[c].getAttribute("face"),
          size: parseInt(r[c].getAttribute("size"), 10)
        });
      for (var c = 0; c < s.length; c++)
        t.common.push({
          lineHeight: parseInt(s[c].getAttribute("lineHeight"), 10)
        });
      for (var c = 0; c < o.length; c++)
        t.page.push({
          id: parseInt(o[c].getAttribute("id"), 10) || 0,
          file: o[c].getAttribute("file")
        });
      for (var c = 0; c < u.length; c++) {
        var d = u[c];
        t.char.push({
          id: parseInt(d.getAttribute("id"), 10),
          page: parseInt(d.getAttribute("page"), 10) || 0,
          x: parseInt(d.getAttribute("x"), 10),
          y: parseInt(d.getAttribute("y"), 10),
          width: parseInt(d.getAttribute("width"), 10),
          height: parseInt(d.getAttribute("height"), 10),
          xoffset: parseInt(d.getAttribute("xoffset"), 10),
          yoffset: parseInt(d.getAttribute("yoffset"), 10),
          xadvance: parseInt(d.getAttribute("xadvance"), 10)
        });
      }
      for (var c = 0; c < h.length; c++)
        t.kerning.push({
          first: parseInt(h[c].getAttribute("first"), 10),
          second: parseInt(h[c].getAttribute("second"), 10),
          amount: parseInt(h[c].getAttribute("amount"), 10)
        });
      for (var c = 0; c < l.length; c++)
        t.distanceField.push({
          fieldType: l[c].getAttribute("fieldType"),
          distanceRange: parseInt(l[c].getAttribute("distanceRange"), 10)
        });
      return t;
    }, a;
  }()
), XMLStringFormat = (
  /** @class */
  function() {
    function a() {
    }
    return a.test = function(e) {
      if (typeof e == "string" && e.indexOf("<font>") > -1) {
        var t = new globalThis.DOMParser().parseFromString(e, "text/xml");
        return XMLFormat.test(t);
      }
      return !1;
    }, a.parse = function(e) {
      var t = new globalThis.DOMParser().parseFromString(e, "text/xml");
      return XMLFormat.parse(t);
    }, a;
  }()
), formats = [
  TextFormat,
  XMLFormat,
  XMLStringFormat
];
function autoDetectFormat(a) {
  for (var e = 0; e < formats.length; e++)
    if (formats[e].test(a))
      return formats[e];
  return null;
}
function generateFillStyle(a, e, t, r, s, o) {
  var u = t.fill;
  if (Array.isArray(u)) {
    if (u.length === 1)
      return u[0];
  } else return u;
  var h, l = t.dropShadow ? t.dropShadowDistance : 0, c = t.padding || 0, d = a.width / r - l - c * 2, _ = a.height / r - l - c * 2, v = u.slice(), y = t.fillGradientStops.slice();
  if (!y.length)
    for (var b = v.length + 1, g = 1; g < b; ++g)
      y.push(g / b);
  if (v.unshift(u[0]), y.unshift(0), v.push(u[u.length - 1]), y.push(1), t.fillGradientType === TEXT_GRADIENT.LINEAR_VERTICAL) {
    h = e.createLinearGradient(d / 2, c, d / 2, _ + c);
    for (var m = 0, E = o.fontProperties.fontSize + t.strokeThickness, S = E / _, g = 0; g < s.length; g++)
      for (var P = o.lineHeight * g, L = 0; L < v.length; L++) {
        var T = 0;
        typeof y[L] == "number" ? T = y[L] : T = L / v.length;
        var I = P / _ + T * S, w = Math.max(m, I);
        w = Math.min(w, 1), h.addColorStop(w, v[L]), m = w;
      }
  } else {
    h = e.createLinearGradient(c, _ / 2, d + c, _ / 2);
    for (var M = v.length + 1, F = 1, g = 0; g < v.length; g++) {
      var k = void 0;
      typeof y[g] == "number" ? k = y[g] : k = F / M, h.addColorStop(k, v[g]), F++;
    }
  }
  return h;
}
function drawGlyph(a, e, t, r, s, o, u) {
  var h = t.text, l = t.fontProperties;
  e.translate(r, s), e.scale(o, o);
  var c = u.strokeThickness / 2, d = -(u.strokeThickness / 2);
  if (e.font = u.toFontString(), e.lineWidth = u.strokeThickness, e.textBaseline = u.textBaseline, e.lineJoin = u.lineJoin, e.miterLimit = u.miterLimit, e.fillStyle = generateFillStyle(a, e, u, o, [h], t), e.strokeStyle = u.stroke, u.dropShadow) {
    var _ = u.dropShadowColor, v = hex2rgb(typeof _ == "number" ? _ : string2hex(_)), y = u.dropShadowBlur * o, b = u.dropShadowDistance * o;
    e.shadowColor = "rgba(" + v[0] * 255 + "," + v[1] * 255 + "," + v[2] * 255 + "," + u.dropShadowAlpha + ")", e.shadowBlur = y, e.shadowOffsetX = Math.cos(u.dropShadowAngle) * b, e.shadowOffsetY = Math.sin(u.dropShadowAngle) * b;
  } else
    e.shadowColor = "black", e.shadowBlur = 0, e.shadowOffsetX = 0, e.shadowOffsetY = 0;
  u.stroke && u.strokeThickness && e.strokeText(h, c, d + t.lineHeight - l.descent), u.fill && e.fillText(h, c, d + t.lineHeight - l.descent), e.setTransform(1, 0, 0, 1, 0, 0), e.fillStyle = "rgba(0, 0, 0, 0)";
}
function splitTextToCharacters(a) {
  return Array.from ? Array.from(a) : a.split("");
}
function resolveCharacters(a) {
  typeof a == "string" && (a = [a]);
  for (var e = [], t = 0, r = a.length; t < r; t++) {
    var s = a[t];
    if (Array.isArray(s)) {
      if (s.length !== 2)
        throw new Error("[BitmapFont]: Invalid character range length, expecting 2 got " + s.length + ".");
      var o = s[0].charCodeAt(0), u = s[1].charCodeAt(0);
      if (u < o)
        throw new Error("[BitmapFont]: Invalid character range.");
      for (var h = o, l = u; h <= l; h++)
        e.push(String.fromCharCode(h));
    } else
      e.push.apply(e, splitTextToCharacters(s));
  }
  if (e.length === 0)
    throw new Error("[BitmapFont]: Empty set when resolving characters.");
  return e;
}
function extractCharCode(a) {
  return a.codePointAt ? a.codePointAt(0) : a.charCodeAt(0);
}
var BitmapFont = (
  /** @class */
  function() {
    function a(e, t, r) {
      var s, o, u = e.info[0], h = e.common[0], l = e.page[0], c = e.distanceField[0], d = getResolutionOfUrl(l.file), _ = {};
      this._ownsTextures = r, this.font = u.face, this.size = u.size, this.lineHeight = h.lineHeight / d, this.chars = {}, this.pageTextures = _;
      for (var v = 0; v < e.page.length; v++) {
        var y = e.page[v], b = y.id, g = y.file;
        _[b] = t instanceof Array ? t[v] : t[g], c?.fieldType && c.fieldType !== "none" && (_[b].baseTexture.alphaMode = ALPHA_MODES.NO_PREMULTIPLIED_ALPHA, _[b].baseTexture.mipmap = MIPMAP_MODES.OFF);
      }
      for (var v = 0; v < e.char.length; v++) {
        var m = e.char[v], b = m.id, E = m.page, S = e.char[v], P = S.x, L = S.y, T = S.width, I = S.height, w = S.xoffset, M = S.yoffset, F = S.xadvance;
        P /= d, L /= d, T /= d, I /= d, w /= d, M /= d, F /= d;
        var k = new Rectangle(P + _[E].frame.x / d, L + _[E].frame.y / d, T, I);
        this.chars[b] = {
          xOffset: w,
          yOffset: M,
          xAdvance: F,
          kerning: {},
          texture: new Texture(_[E].baseTexture, k),
          page: E
        };
      }
      for (var v = 0; v < e.kerning.length; v++) {
        var V = e.kerning[v], X = V.first, ne = V.second, oe = V.amount;
        X /= d, ne /= d, oe /= d, this.chars[ne] && (this.chars[ne].kerning[X] = oe);
      }
      this.distanceFieldRange = c?.distanceRange, this.distanceFieldType = (o = (s = c?.fieldType) === null || s === void 0 ? void 0 : s.toLowerCase()) !== null && o !== void 0 ? o : "none";
    }
    return a.prototype.destroy = function() {
      for (var e in this.chars)
        this.chars[e].texture.destroy(), this.chars[e].texture = null;
      for (var e in this.pageTextures)
        this._ownsTextures && this.pageTextures[e].destroy(!0), this.pageTextures[e] = null;
      this.chars = null, this.pageTextures = null;
    }, a.install = function(e, t, r) {
      var s;
      if (e instanceof BitmapFontData)
        s = e;
      else {
        var o = autoDetectFormat(e);
        if (!o)
          throw new Error("Unrecognized data format for font.");
        s = o.parse(e);
      }
      t instanceof Texture && (t = [t]);
      var u = new a(s, t, r);
      return a.available[u.font] = u, u;
    }, a.uninstall = function(e) {
      var t = a.available[e];
      if (!t)
        throw new Error("No font found named '" + e + "'");
      t.destroy(), delete a.available[e];
    }, a.from = function(e, t, r) {
      if (!e)
        throw new Error("[BitmapFont] Property `name` is required.");
      var s = Object.assign({}, a.defaultOptions, r), o = s.chars, u = s.padding, h = s.resolution, l = s.textureWidth, c = s.textureHeight, d = resolveCharacters(o), _ = t instanceof TextStyle ? t : new TextStyle(t), v = l, y = new BitmapFontData();
      y.info[0] = {
        face: _.fontFamily,
        size: _.fontSize
      }, y.common[0] = {
        lineHeight: _.fontSize
      };
      for (var b = 0, g = 0, m, E, S, P = 0, L = [], T = 0; T < d.length; T++) {
        m || (m = settings.ADAPTER.createCanvas(), m.width = l, m.height = c, E = m.getContext("2d"), S = new BaseTexture(m, { resolution: h }), L.push(new Texture(S)), y.page.push({
          id: L.length - 1,
          file: ""
        }));
        var I = d[T], w = TextMetrics.measureText(I, _, !1, m), M = w.width, F = Math.ceil(w.height), k = Math.ceil((_.fontStyle === "italic" ? 2 : 1) * M);
        if (g >= c - F * h) {
          if (g === 0)
            throw new Error("[BitmapFont] textureHeight " + c + "px is too small " + ("(fontFamily: '" + _.fontFamily + "', fontSize: " + _.fontSize + "px, char: '" + I + "')"));
          --T, m = null, E = null, S = null, g = 0, b = 0, P = 0;
          continue;
        }
        if (P = Math.max(F + w.fontProperties.descent, P), k * h + b >= v) {
          if (b === 0)
            throw new Error("[BitmapFont] textureWidth " + l + "px is too small " + ("(fontFamily: '" + _.fontFamily + "', fontSize: " + _.fontSize + "px, char: '" + I + "')"));
          --T, g += P * h, g = Math.ceil(g), b = 0, P = 0;
          continue;
        }
        drawGlyph(m, E, w, b, g, h, _);
        var V = extractCharCode(w.text);
        y.char.push({
          id: V,
          page: L.length - 1,
          x: b / h,
          y: g / h,
          width: k,
          height: F,
          xoffset: 0,
          yoffset: 0,
          xadvance: Math.ceil(M - (_.dropShadow ? _.dropShadowDistance : 0) - (_.stroke ? _.strokeThickness : 0))
        }), b += (k + 2 * u) * h, b = Math.ceil(b);
      }
      if (!r?.skipKerning)
        for (var T = 0, X = d.length; T < X; T++)
          for (var ne = d[T], oe = 0; oe < X; oe++) {
            var K = d[oe], R = E.measureText(ne).width, O = E.measureText(K).width, A = E.measureText(ne + K).width, B = A - (R + O);
            B && y.kerning.push({
              first: extractCharCode(ne),
              second: extractCharCode(K),
              amount: B
            });
          }
      var N = new a(y, L, !0);
      return a.available[e] !== void 0 && a.uninstall(e), a.available[e] = N, N;
    }, a.ALPHA = [["a", "z"], ["A", "Z"], " "], a.NUMERIC = [["0", "9"]], a.ALPHANUMERIC = [["a", "z"], ["A", "Z"], ["0", "9"], " "], a.ASCII = [[" ", "~"]], a.defaultOptions = {
      resolution: 1,
      textureWidth: 512,
      textureHeight: 512,
      padding: 4,
      chars: a.ALPHANUMERIC
    }, a.available = {}, a;
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
(function(a) {
  __extends$8(e, a);
  function e(t, r) {
    r === void 0 && (r = {});
    var s = a.call(this) || this;
    s._tint = 16777215;
    var o = Object.assign({}, e.styleDefaults, r), u = o.align, h = o.tint, l = o.maxWidth, c = o.letterSpacing, d = o.fontName, _ = o.fontSize;
    if (!BitmapFont.available[d])
      throw new Error('Missing BitmapFont "' + d + '"');
    return s._activePagesMeshData = [], s._textWidth = 0, s._textHeight = 0, s._align = u, s._tint = h, s._font = void 0, s._fontName = d, s._fontSize = _, s.text = t, s._maxWidth = l, s._maxLineHeight = 0, s._letterSpacing = c, s._anchor = new ObservablePoint(function() {
      s.dirty = !0;
    }, s, 0, 0), s._roundPixels = settings.ROUND_PIXELS, s.dirty = !0, s._resolution = settings.RESOLUTION, s._autoResolution = !0, s._textureCache = {}, s;
  }
  return e.prototype.updateText = function() {
    for (var t, r = BitmapFont.available[this._fontName], s = this.fontSize, o = s / r.size, u = new Point(), h = [], l = [], c = [], d = this._text.replace(/(?:\r\n|\r)/g, `
`) || " ", _ = splitTextToCharacters(d), v = this._maxWidth * r.size / s, y = r.distanceFieldType === "none" ? pageMeshDataDefaultPageMeshData : pageMeshDataMSDFPageMeshData, b = null, g = 0, m = 0, E = 0, S = -1, P = 0, L = 0, T = 0, I = 0, w = 0; w < _.length; w++) {
      var M = _[w], F = extractCharCode(M);
      if (/(?:\s)/.test(M) && (S = w, P = g, I++), M === "\r" || M === `
`) {
        l.push(g), c.push(-1), m = Math.max(m, g), ++E, ++L, u.x = 0, u.y += r.lineHeight, b = null, I = 0;
        continue;
      }
      var k = r.chars[F];
      if (k) {
        b && k.kerning[b] && (u.x += k.kerning[b]);
        var V = charRenderDataPool.pop() || {
          texture: Texture.EMPTY,
          line: 0,
          charCode: 0,
          prevSpaces: 0,
          position: new Point()
        };
        V.texture = k.texture, V.line = E, V.charCode = F, V.position.x = u.x + k.xOffset + this._letterSpacing / 2, V.position.y = u.y + k.yOffset, V.prevSpaces = I, h.push(V), g = V.position.x + Math.max(k.xAdvance - k.xOffset, k.texture.orig.width), u.x += k.xAdvance + this._letterSpacing, T = Math.max(T, k.yOffset + k.texture.height), b = F, S !== -1 && v > 0 && u.x > v && (++L, removeItems(h, 1 + S - L, 1 + w - S), w = S, S = -1, l.push(P), c.push(h.length > 0 ? h[h.length - 1].prevSpaces : 0), m = Math.max(m, P), E++, u.x = 0, u.y += r.lineHeight, b = null, I = 0);
      }
    }
    var X = _[_.length - 1];
    X !== "\r" && X !== `
` && (/(?:\s)/.test(X) && (g = P), l.push(g), m = Math.max(m, g), c.push(-1));
    for (var ne = [], w = 0; w <= E; w++) {
      var oe = 0;
      this._align === "right" ? oe = m - l[w] : this._align === "center" ? oe = (m - l[w]) / 2 : this._align === "justify" && (oe = c[w] < 0 ? 0 : (m - l[w]) / c[w]), ne.push(oe);
    }
    var K = h.length, R = {}, O = [], A = this._activePagesMeshData;
    y.push.apply(y, A);
    for (var w = 0; w < K; w++) {
      var B = h[w].texture, N = B.baseTexture.uid;
      if (!R[N]) {
        var D = y.pop();
        if (!D) {
          var G = new MeshGeometry(), U = void 0, Y = void 0;
          r.distanceFieldType === "none" ? (U = new MeshMaterial(Texture.EMPTY), Y = BLEND_MODES.NORMAL) : (U = new MeshMaterial(Texture.EMPTY, { program: Program.from(msdfVert, msdfFrag), uniforms: { uFWidth: 0 } }), Y = BLEND_MODES.NORMAL_NPM);
          var J = new Mesh(G, U);
          J.blendMode = Y, D = {
            index: 0,
            indexCount: 0,
            vertexCount: 0,
            uvsCount: 0,
            total: 0,
            mesh: J,
            vertices: null,
            uvs: null,
            indices: null
          };
        }
        D.index = 0, D.indexCount = 0, D.vertexCount = 0, D.uvsCount = 0, D.total = 0;
        var C = this._textureCache;
        C[N] = C[N] || new Texture(B.baseTexture), D.mesh.texture = C[N], D.mesh.tint = this._tint, O.push(D), R[N] = D;
      }
      R[N].total++;
    }
    for (var w = 0; w < A.length; w++)
      O.indexOf(A[w]) === -1 && this.removeChild(A[w].mesh);
    for (var w = 0; w < O.length; w++)
      O[w].mesh.parent !== this && this.addChild(O[w].mesh);
    this._activePagesMeshData = O;
    for (var w in R) {
      var D = R[w], te = D.total;
      if (!(((t = D.indices) === null || t === void 0 ? void 0 : t.length) > 6 * te) || D.vertices.length < Mesh.BATCHABLE_SIZE * 2)
        D.vertices = new Float32Array(4 * 2 * te), D.uvs = new Float32Array(4 * 2 * te), D.indices = new Uint16Array(6 * te);
      else
        for (var Z = D.total, se = D.vertices, ee = Z * 4 * 2; ee < se.length; ee++)
          se[ee] = 0;
      D.mesh.size = 6 * te;
    }
    for (var w = 0; w < K; w++) {
      var M = h[w], q = M.position.x + ne[M.line] * (this._align === "justify" ? M.prevSpaces : 1);
      this._roundPixels && (q = Math.round(q));
      var ue = q * o, ae = M.position.y * o, B = M.texture, z = R[B.baseTexture.uid], Q = B.frame, ie = B._uvs, W = z.index++;
      z.indices[W * 6 + 0] = 0 + W * 4, z.indices[W * 6 + 1] = 1 + W * 4, z.indices[W * 6 + 2] = 2 + W * 4, z.indices[W * 6 + 3] = 0 + W * 4, z.indices[W * 6 + 4] = 2 + W * 4, z.indices[W * 6 + 5] = 3 + W * 4, z.vertices[W * 8 + 0] = ue, z.vertices[W * 8 + 1] = ae, z.vertices[W * 8 + 2] = ue + Q.width * o, z.vertices[W * 8 + 3] = ae, z.vertices[W * 8 + 4] = ue + Q.width * o, z.vertices[W * 8 + 5] = ae + Q.height * o, z.vertices[W * 8 + 6] = ue, z.vertices[W * 8 + 7] = ae + Q.height * o, z.uvs[W * 8 + 0] = ie.x0, z.uvs[W * 8 + 1] = ie.y0, z.uvs[W * 8 + 2] = ie.x1, z.uvs[W * 8 + 3] = ie.y1, z.uvs[W * 8 + 4] = ie.x2, z.uvs[W * 8 + 5] = ie.y2, z.uvs[W * 8 + 6] = ie.x3, z.uvs[W * 8 + 7] = ie.y3;
    }
    this._textWidth = m * o, this._textHeight = (u.y + r.lineHeight) * o;
    for (var w in R) {
      var D = R[w];
      if (this.anchor.x !== 0 || this.anchor.y !== 0)
        for (var me = 0, be = this._textWidth * this.anchor.x, Ee = this._textHeight * this.anchor.y, Pe = 0; Pe < D.total; Pe++)
          D.vertices[me++] -= be, D.vertices[me++] -= Ee, D.vertices[me++] -= be, D.vertices[me++] -= Ee, D.vertices[me++] -= be, D.vertices[me++] -= Ee, D.vertices[me++] -= be, D.vertices[me++] -= Ee;
      this._maxLineHeight = T * o;
      var we = D.mesh.geometry.getBuffer("aVertexPosition"), Re = D.mesh.geometry.getBuffer("aTextureCoord"), Me = D.mesh.geometry.getIndex();
      we.data = D.vertices, Re.data = D.uvs, Me.data = D.indices, we.update(), Re.update(), Me.update();
    }
    for (var w = 0; w < h.length; w++)
      charRenderDataPool.push(h[w]);
    this._font = r, this.dirty = !1;
  }, e.prototype.updateTransform = function() {
    this.validate(), this.containerUpdateTransform();
  }, e.prototype._render = function(t) {
    this._autoResolution && this._resolution !== t.resolution && (this._resolution = t.resolution, this.dirty = !0);
    var r = BitmapFont.available[this._fontName], s = r.distanceFieldRange, o = r.distanceFieldType, u = r.size;
    if (o !== "none")
      for (var h = this.worldTransform, l = h.a, c = h.b, d = h.c, _ = h.d, v = Math.sqrt(l * l + c * c), y = Math.sqrt(d * d + _ * _), b = (Math.abs(v) + Math.abs(y)) / 2, g = this.fontSize / u, m = 0, E = this._activePagesMeshData; m < E.length; m++) {
        var S = E[m];
        S.mesh.shader.uniforms.uFWidth = b * s * g * this._resolution;
      }
    a.prototype._render.call(this, t);
  }, e.prototype.getLocalBounds = function() {
    return this.validate(), a.prototype.getLocalBounds.call(this);
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
    var r = this._textureCache, s = BitmapFont.available[this._fontName], o = s.distanceFieldType === "none" ? pageMeshDataDefaultPageMeshData : pageMeshDataMSDFPageMeshData;
    o.push.apply(o, this._activePagesMeshData);
    for (var u = 0, h = this._activePagesMeshData; u < h.length; u++) {
      var l = h[u];
      this.removeChild(l.mesh);
    }
    this._activePagesMeshData = [], o.filter(function(_) {
      return r[_.mesh.texture.baseTexture.uid];
    }).forEach(function(_) {
      _.mesh.texture = Texture.EMPTY;
    });
    for (var c in r) {
      var d = r[c];
      d.destroy(), delete r[c];
    }
    this._font = null, this._textureCache = null, a.prototype.destroy.call(this, t);
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
    function a() {
    }
    return a.add = function() {
      LoaderResource.setExtensionXhrType("fnt", LoaderResource.XHR_RESPONSE_TYPE.TEXT);
    }, a.use = function(e, t) {
      var r = autoDetectFormat(e.data);
      if (!r) {
        t();
        return;
      }
      for (var s = a.getBaseUrl(this, e), o = r.parse(e.data), u = {}, h = function(g) {
        u[g.metadata.pageFile] = g.texture, Object.keys(u).length === o.page.length && (e.bitmapFont = BitmapFont.install(o, u, !0), t());
      }, l = 0; l < o.page.length; ++l) {
        var c = o.page[l].file, d = s + c, _ = !1;
        for (var v in this.resources) {
          var y = this.resources[v];
          if (y.url === d) {
            y.metadata.pageFile = c, y.texture ? h(y) : y.onAfterMiddleware.add(h), _ = !0;
            break;
          }
        }
        if (!_) {
          var b = {
            crossOrigin: e.crossOrigin,
            loadType: LoaderResource.LOAD_TYPE.IMAGE,
            metadata: Object.assign({ pageFile: c }, e.metadata.imageMetadata),
            parentResource: e
          };
          this.add(d, b, h);
        }
      }
    }, a.getBaseUrl = function(e, t) {
      var r = t.isDataUrl ? "" : a.dirname(t.url);
      return t.isDataUrl && (r === "." && (r = ""), e.baseUrl && r && e.baseUrl.charAt(e.baseUrl.length - 1) === "/" && (r += "/")), r = r.replace(e.baseUrl, ""), r && r.charAt(r.length - 1) !== "/" && (r += "/"), r;
    }, a.dirname = function(e) {
      var t = e.replace(/\\/g, "/").replace(/\/$/, "").replace(/\/[^\/]*$/, "");
      return t === e ? "." : t === "" ? "/" : t;
    }, a.extension = ExtensionType.Loader, a;
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
var extendStatics$7 = function(a, e) {
  return extendStatics$7 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, r) {
    t.__proto__ = r;
  } || function(t, r) {
    for (var s in r)
      r.hasOwnProperty(s) && (t[s] = r[s]);
  }, extendStatics$7(a, e);
};
function __extends$7(a, e) {
  extendStatics$7(a, e);
  function t() {
    this.constructor = a;
  }
  a.prototype = e === null ? Object.create(e) : (t.prototype = e.prototype, new t());
}
var fragment$4 = `varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform float uAlpha;

void main(void)
{
   gl_FragColor = texture2D(uSampler, vTextureCoord) * uAlpha;
}
`, AlphaFilter = (
  /** @class */
  function(a) {
    __extends$7(e, a);
    function e(t) {
      t === void 0 && (t = 1);
      var r = a.call(this, defaultVertex$1, fragment$4, { uAlpha: 1 }) || this;
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
  }(Filter)
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
var extendStatics$6 = function(a, e) {
  return extendStatics$6 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, r) {
    t.__proto__ = r;
  } || function(t, r) {
    for (var s in r)
      r.hasOwnProperty(s) && (t[s] = r[s]);
  }, extendStatics$6(a, e);
};
function __extends$6(a, e) {
  extendStatics$6(a, e);
  function t() {
    this.constructor = a;
  }
  a.prototype = e === null ? Object.create(e) : (t.prototype = e.prototype, new t());
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
function generateBlurVertSource(a, e) {
  var t = Math.ceil(a / 2), r = vertTemplate, s = "", o;
  e ? o = "vBlurTexCoords[%index%] =  textureCoord + vec2(%sampleIndex% * strength, 0.0);" : o = "vBlurTexCoords[%index%] =  textureCoord + vec2(0.0, %sampleIndex% * strength);";
  for (var u = 0; u < a; u++) {
    var h = o.replace("%index%", u.toString());
    h = h.replace("%sampleIndex%", u - (t - 1) + ".0"), s += h, s += `
`;
  }
  return r = r.replace("%blur%", s), r = r.replace("%size%", a.toString()), r;
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
function generateBlurFragSource(a) {
  for (var e = GAUSSIAN_VALUES[a], t = e.length, r = fragTemplate, s = "", o = "gl_FragColor += texture2D(uSampler, vBlurTexCoords[%index%]) * %value%;", u, h = 0; h < a; h++) {
    var l = o.replace("%index%", h.toString());
    u = h, h >= t && (u = a - h - 1), l = l.replace("%value%", e[u].toString()), s += l, s += `
`;
  }
  return r = r.replace("%blur%", s), r = r.replace("%size%", a.toString()), r;
}
var BlurFilterPass = (
  /** @class */
  function(a) {
    __extends$6(e, a);
    function e(t, r, s, o, u) {
      r === void 0 && (r = 8), s === void 0 && (s = 4), o === void 0 && (o = settings.FILTER_RESOLUTION), u === void 0 && (u = 5);
      var h = this, l = generateBlurVertSource(u, t), c = generateBlurFragSource(u);
      return h = a.call(
        this,
        // vertex shader
        l,
        // fragment shader
        c
      ) || this, h.horizontal = t, h.resolution = o, h._quality = 0, h.quality = s, h.blur = r, h;
    }
    return e.prototype.apply = function(t, r, s, o) {
      if (s ? this.horizontal ? this.uniforms.strength = 1 / s.width * (s.width / r.width) : this.uniforms.strength = 1 / s.height * (s.height / r.height) : this.horizontal ? this.uniforms.strength = 1 / t.renderer.width * (t.renderer.width / r.width) : this.uniforms.strength = 1 / t.renderer.height * (t.renderer.height / r.height), this.uniforms.strength *= this.strength, this.uniforms.strength /= this.passes, this.passes === 1)
        t.applyFilter(this, r, s, o);
      else {
        var u = t.getFilterTexture(), h = t.renderer, l = r, c = u;
        this.state.blend = !1, t.applyFilter(this, l, c, CLEAR_MODES.CLEAR);
        for (var d = 1; d < this.passes - 1; d++) {
          t.bindAndClear(l, CLEAR_MODES.BLIT), this.uniforms.uSampler = c;
          var _ = c;
          c = l, l = _, h.shader.bind(this), h.geometry.draw(5);
        }
        this.state.blend = !0, t.applyFilter(this, c, s, o), t.returnFilterTexture(u);
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
  function(a) {
    __extends$6(e, a);
    function e(t, r, s, o) {
      t === void 0 && (t = 8), r === void 0 && (r = 4), s === void 0 && (s = settings.FILTER_RESOLUTION), o === void 0 && (o = 5);
      var u = a.call(this) || this;
      return u.blurXFilter = new BlurFilterPass(!0, t, r, s, o), u.blurYFilter = new BlurFilterPass(!1, t, r, s, o), u.resolution = s, u.quality = r, u.blur = t, u.repeatEdgePixels = !1, u;
    }
    return e.prototype.apply = function(t, r, s, o) {
      var u = Math.abs(this.blurXFilter.strength), h = Math.abs(this.blurYFilter.strength);
      if (u && h) {
        var l = t.getFilterTexture();
        this.blurXFilter.apply(t, r, l, CLEAR_MODES.CLEAR), this.blurYFilter.apply(t, l, s, o), t.returnFilterTexture(l);
      } else h ? this.blurYFilter.apply(t, r, s, o) : this.blurXFilter.apply(t, r, s, o);
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
var extendStatics$5 = function(a, e) {
  return extendStatics$5 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, r) {
    t.__proto__ = r;
  } || function(t, r) {
    for (var s in r)
      r.hasOwnProperty(s) && (t[s] = r[s]);
  }, extendStatics$5(a, e);
};
function __extends$5(a, e) {
  extendStatics$5(a, e);
  function t() {
    this.constructor = a;
  }
  a.prototype = e === null ? Object.create(e) : (t.prototype = e.prototype, new t());
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
  function(a) {
    __extends$5(e, a);
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
      return t = a.call(this, defaultFilterVertex, fragment$3, r) || this, t.alpha = 1, t;
    }
    return e.prototype._loadMatrix = function(t, r) {
      r === void 0 && (r = !1);
      var s = t;
      r && (this._multiply(s, this.uniforms.m, t), s = this._colorMatrix(s)), this.uniforms.m = s;
    }, e.prototype._multiply = function(t, r, s) {
      return t[0] = r[0] * s[0] + r[1] * s[5] + r[2] * s[10] + r[3] * s[15], t[1] = r[0] * s[1] + r[1] * s[6] + r[2] * s[11] + r[3] * s[16], t[2] = r[0] * s[2] + r[1] * s[7] + r[2] * s[12] + r[3] * s[17], t[3] = r[0] * s[3] + r[1] * s[8] + r[2] * s[13] + r[3] * s[18], t[4] = r[0] * s[4] + r[1] * s[9] + r[2] * s[14] + r[3] * s[19] + r[4], t[5] = r[5] * s[0] + r[6] * s[5] + r[7] * s[10] + r[8] * s[15], t[6] = r[5] * s[1] + r[6] * s[6] + r[7] * s[11] + r[8] * s[16], t[7] = r[5] * s[2] + r[6] * s[7] + r[7] * s[12] + r[8] * s[17], t[8] = r[5] * s[3] + r[6] * s[8] + r[7] * s[13] + r[8] * s[18], t[9] = r[5] * s[4] + r[6] * s[9] + r[7] * s[14] + r[8] * s[19] + r[9], t[10] = r[10] * s[0] + r[11] * s[5] + r[12] * s[10] + r[13] * s[15], t[11] = r[10] * s[1] + r[11] * s[6] + r[12] * s[11] + r[13] * s[16], t[12] = r[10] * s[2] + r[11] * s[7] + r[12] * s[12] + r[13] * s[17], t[13] = r[10] * s[3] + r[11] * s[8] + r[12] * s[13] + r[13] * s[18], t[14] = r[10] * s[4] + r[11] * s[9] + r[12] * s[14] + r[13] * s[19] + r[14], t[15] = r[15] * s[0] + r[16] * s[5] + r[17] * s[10] + r[18] * s[15], t[16] = r[15] * s[1] + r[16] * s[6] + r[17] * s[11] + r[18] * s[16], t[17] = r[15] * s[2] + r[16] * s[7] + r[17] * s[12] + r[18] * s[17], t[18] = r[15] * s[3] + r[16] * s[8] + r[17] * s[13] + r[18] * s[18], t[19] = r[15] * s[4] + r[16] * s[9] + r[17] * s[14] + r[18] * s[19] + r[19], t;
    }, e.prototype._colorMatrix = function(t) {
      var r = new Float32Array(t);
      return r[4] /= 255, r[9] /= 255, r[14] /= 255, r[19] /= 255, r;
    }, e.prototype.brightness = function(t, r) {
      var s = [
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
      this._loadMatrix(s, r);
    }, e.prototype.tint = function(t, r) {
      var s = t >> 16 & 255, o = t >> 8 & 255, u = t & 255, h = [
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
        u / 255,
        0,
        0,
        0,
        0,
        0,
        1,
        0
      ];
      this._loadMatrix(h, r);
    }, e.prototype.greyscale = function(t, r) {
      var s = [
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
      this._loadMatrix(s, r);
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
      var s = Math.cos(t), o = Math.sin(t), u = Math.sqrt, h = 1 / 3, l = u(h), c = s + (1 - s) * h, d = h * (1 - s) - l * o, _ = h * (1 - s) + l * o, v = h * (1 - s) + l * o, y = s + h * (1 - s), b = h * (1 - s) - l * o, g = h * (1 - s) - l * o, m = h * (1 - s) + l * o, E = s + h * (1 - s), S = [
        c,
        d,
        _,
        0,
        0,
        v,
        y,
        b,
        0,
        0,
        g,
        m,
        E,
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
      var s = (t || 0) + 1, o = -0.5 * (s - 1), u = [
        s,
        0,
        0,
        0,
        o,
        0,
        s,
        0,
        0,
        o,
        0,
        0,
        s,
        0,
        o,
        0,
        0,
        0,
        1,
        0
      ];
      this._loadMatrix(u, r);
    }, e.prototype.saturate = function(t, r) {
      t === void 0 && (t = 0);
      var s = t * 2 / 3 + 1, o = (s - 1) * -0.5, u = [
        s,
        o,
        o,
        0,
        0,
        o,
        s,
        o,
        0,
        0,
        o,
        o,
        s,
        0,
        0,
        0,
        0,
        0,
        1,
        0
      ];
      this._loadMatrix(u, r);
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
    }, e.prototype.colorTone = function(t, r, s, o, u) {
      t = t || 0.2, r = r || 0.15, s = s || 16770432, o = o || 3375104;
      var h = (s >> 16 & 255) / 255, l = (s >> 8 & 255) / 255, c = (s & 255) / 255, d = (o >> 16 & 255) / 255, _ = (o >> 8 & 255) / 255, v = (o & 255) / 255, y = [
        0.3,
        0.59,
        0.11,
        0,
        0,
        h,
        l,
        c,
        t,
        0,
        d,
        _,
        v,
        r,
        0,
        h - d,
        l - _,
        c - v,
        0,
        0
      ];
      this._loadMatrix(y, u);
    }, e.prototype.night = function(t, r) {
      t = t || 0.1;
      var s = [
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
      this._loadMatrix(s, r);
    }, e.prototype.predator = function(t, r) {
      var s = [
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
      this._loadMatrix(s, r);
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
var extendStatics$4 = function(a, e) {
  return extendStatics$4 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, r) {
    t.__proto__ = r;
  } || function(t, r) {
    for (var s in r)
      r.hasOwnProperty(s) && (t[s] = r[s]);
  }, extendStatics$4(a, e);
};
function __extends$4(a, e) {
  extendStatics$4(a, e);
  function t() {
    this.constructor = a;
  }
  a.prototype = e === null ? Object.create(e) : (t.prototype = e.prototype, new t());
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
`, DisplacementFilter = (
  /** @class */
  function(a) {
    __extends$4(e, a);
    function e(t, r) {
      var s = this, o = new Matrix();
      return t.renderable = !1, s = a.call(this, vertex$1, fragment$2, {
        mapSampler: t._texture,
        filterMatrix: o,
        scale: { x: 1, y: 1 },
        rotation: new Float32Array([1, 0, 0, 1])
      }) || this, s.maskSprite = t, s.maskMatrix = o, r == null && (r = 20), s.scale = new Point(r, r), s;
    }
    return e.prototype.apply = function(t, r, s, o) {
      this.uniforms.filterMatrix = t.calculateSpriteMatrix(this.maskMatrix, this.maskSprite), this.uniforms.scale.x = this.scale.x, this.uniforms.scale.y = this.scale.y;
      var u = this.maskSprite.worldTransform, h = Math.sqrt(u.a * u.a + u.b * u.b), l = Math.sqrt(u.c * u.c + u.d * u.d);
      h !== 0 && l !== 0 && (this.uniforms.rotation[0] = u.a / h, this.uniforms.rotation[1] = u.b / h, this.uniforms.rotation[2] = u.c / l, this.uniforms.rotation[3] = u.d / l), t.applyFilter(this, r, s, o);
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
  }(Filter)
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
var extendStatics$3 = function(a, e) {
  return extendStatics$3 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, r) {
    t.__proto__ = r;
  } || function(t, r) {
    for (var s in r)
      r.hasOwnProperty(s) && (t[s] = r[s]);
  }, extendStatics$3(a, e);
};
function __extends$3(a, e) {
  extendStatics$3(a, e);
  function t() {
    this.constructor = a;
  }
  a.prototype = e === null ? Object.create(e) : (t.prototype = e.prototype, new t());
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
`, FXAAFilter = (
  /** @class */
  function(a) {
    __extends$3(e, a);
    function e() {
      return a.call(this, vertex, fragment$1) || this;
    }
    return e;
  }(Filter)
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
var extendStatics$2 = function(a, e) {
  return extendStatics$2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, r) {
    t.__proto__ = r;
  } || function(t, r) {
    for (var s in r)
      r.hasOwnProperty(s) && (t[s] = r[s]);
  }, extendStatics$2(a, e);
};
function __extends$2(a, e) {
  extendStatics$2(a, e);
  function t() {
    this.constructor = a;
  }
  a.prototype = e === null ? Object.create(e) : (t.prototype = e.prototype, new t());
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
  function(a) {
    __extends$2(e, a);
    function e(t, r) {
      t === void 0 && (t = 0.5), r === void 0 && (r = Math.random());
      var s = a.call(this, defaultFilterVertex, fragment, {
        uNoise: 0,
        uSeed: 0
      }) || this;
      return s.noise = t, s.seed = r, s;
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
    function a() {
      this.textureCacheId = null, this.originalRender = null, this.originalRenderCanvas = null, this.originalCalculateBounds = null, this.originalGetLocalBounds = null, this.originalUpdateTransform = null, this.originalDestroy = null, this.originalMask = null, this.originalFilterArea = null, this.originalContainsPoint = null, this.sprite = null;
    }
    return a;
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
    set: function(a) {
      a !== this._cacheAsBitmapResolution && (this._cacheAsBitmapResolution = a, this.cacheAsBitmap && (this.cacheAsBitmap = !1, this.cacheAsBitmap = !0));
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
    set: function(a) {
      a !== this._cacheAsBitmapMultisample && (this._cacheAsBitmapMultisample = a, this.cacheAsBitmap && (this.cacheAsBitmap = !1, this.cacheAsBitmap = !0));
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
    set: function(a) {
      if (this._cacheAsBitmap !== a) {
        this._cacheAsBitmap = a;
        var e;
        a ? (this._cacheData || (this._cacheData = new CacheData()), e = this._cacheData, e.originalRender = this.render, e.originalRenderCanvas = this.renderCanvas, e.originalUpdateTransform = this.updateTransform, e.originalCalculateBounds = this.calculateBounds, e.originalGetLocalBounds = this.getLocalBounds, e.originalDestroy = this.destroy, e.originalContainsPoint = this.containsPoint, e.originalMask = this._mask, e.originalFilterArea = this.filterArea, this.render = this._renderCached, this.renderCanvas = this._renderCachedCanvas, this.destroy = this._cacheAsBitmapDestroy) : (e = this._cacheData, e.sprite && this._destroyCachedDisplayObject(), this.render = e.originalRender, this.renderCanvas = e.originalRenderCanvas, this.calculateBounds = e.originalCalculateBounds, this.getLocalBounds = e.originalGetLocalBounds, this.destroy = e.originalDestroy, this.updateTransform = e.originalUpdateTransform, this.containsPoint = e.originalContainsPoint, this._mask = e.originalMask, this.filterArea = e.originalFilterArea);
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
    var s = this.getLocalBounds(null, !0).clone();
    if (this.filters && this.filters.length) {
      var o = this.filters[0].padding;
      s.pad(o);
    }
    s.ceil(settings.RESOLUTION);
    var u = e.renderTexture.current, h = e.renderTexture.sourceFrame.clone(), l = e.renderTexture.destinationFrame.clone(), c = e.projection.transform, d = RenderTexture.create({
      width: s.width,
      height: s.height,
      resolution: this.cacheAsBitmapResolution || e.resolution,
      multisample: (t = this.cacheAsBitmapMultisample) !== null && t !== void 0 ? t : e.multisample
    }), _ = "cacheAsBitmap_" + uid();
    this._cacheData.textureCacheId = _, BaseTexture.addToCache(d.baseTexture, _), Texture.addToCache(d, _);
    var v = this.transform.localTransform.copyTo(_tempMatrix).invert().translate(-s.x, -s.y);
    this.render = this._cacheData.originalRender, e.render(this, { renderTexture: d, clear: !0, transform: v, skipUpdateTransform: !1 }), e.framebuffer.blit(), e.projection.transform = c, e.renderTexture.bind(u, h, l), this.render = this._renderCached, this.updateTransform = this.displayObjectUpdateTransform, this.calculateBounds = this._calculateCachedBounds, this.getLocalBounds = this._getCachedLocalBounds, this._mask = null, this.filterArea = null, this.alpha = r;
    var y = new Sprite(d);
    y.transform.worldTransform = this.transform.worldTransform, y.anchor.x = -(s.x / s.width), y.anchor.y = -(s.y / s.height), y.alpha = r, y._bounds = this._bounds, this._cacheData.sprite = y, this.transform._parentID = -1, this.parent ? this.updateTransform() : (this.enableTempParent(), this.updateTransform(), this.disableTempParent(null)), this.containsPoint = y.containsPoint.bind(y);
  }
};
DisplayObject.prototype._renderCachedCanvas = function(e) {
  !this.visible || this.worldAlpha <= 0 || !this.renderable || (this._initCachedDisplayObjectCanvas(e), this._cacheData.sprite.worldAlpha = this.worldAlpha, this._cacheData.sprite._renderCanvas(e));
};
DisplayObject.prototype._initCachedDisplayObjectCanvas = function(e) {
  if (!(this._cacheData && this._cacheData.sprite)) {
    var t = this.getLocalBounds(null, !0), r = this.alpha;
    this.alpha = 1;
    var s = e.context, o = e._projTransform;
    t.ceil(settings.RESOLUTION);
    var u = RenderTexture.create({ width: t.width, height: t.height }), h = "cacheAsBitmap_" + uid();
    this._cacheData.textureCacheId = h, BaseTexture.addToCache(u.baseTexture, h), Texture.addToCache(u, h);
    var l = _tempMatrix;
    this.transform.localTransform.copyTo(l), l.invert(), l.tx -= t.x, l.ty -= t.y, this.renderCanvas = this._cacheData.originalRenderCanvas, e.render(this, { renderTexture: u, clear: !0, transform: l, skipUpdateTransform: !1 }), e.context = s, e._projTransform = o, this.renderCanvas = this._renderCachedCanvas, this.updateTransform = this.displayObjectUpdateTransform, this.calculateBounds = this._calculateCachedBounds, this.getLocalBounds = this._getCachedLocalBounds, this._mask = null, this.filterArea = null, this.alpha = r;
    var c = new Sprite(u);
    c.transform.worldTransform = this.transform.worldTransform, c.anchor.x = -(t.x / t.width), c.anchor.y = -(t.y / t.height), c.alpha = r, c._bounds = this._bounds, this._cacheData.sprite = c, this.transform._parentID = -1, this.parent ? this.updateTransform() : (this.parent = e._tempDisplayObjectParent, this.updateTransform(), this.parent = null), this.containsPoint = c.containsPoint.bind(c);
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
/*!
 * @pixi/mixin-get-child-by-name - v6.5.10
 * Compiled Thu, 06 Jul 2023 15:25:11 UTC
 *
 * @pixi/mixin-get-child-by-name is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
DisplayObject.prototype.name = null;
Container.prototype.getChildByName = function(e, t) {
  for (var r = 0, s = this.children.length; r < s; r++)
    if (this.children[r].name === e)
      return this.children[r];
  if (t)
    for (var r = 0, s = this.children.length; r < s; r++) {
      var o = this.children[r];
      if (o.getChildByName) {
        var u = o.getChildByName(e, !0);
        if (u)
          return u;
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
DisplayObject.prototype.getGlobalPosition = function(e, t) {
  return e === void 0 && (e = new Point()), t === void 0 && (t = !1), this.parent ? this.parent.toGlobal(this.position, e, t) : (e.x = this.position.x, e.y = this.position.y), e;
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
    function a() {
    }
    return a.init = function(e) {
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
          var r, s;
          if (t._resizeTo === globalThis.window)
            r = globalThis.innerWidth, s = globalThis.innerHeight;
          else {
            var o = t._resizeTo, u = o.clientWidth, h = o.clientHeight;
            r = u, s = h;
          }
          t.renderer.resize(r, s);
        }
      }, this._resizeId = null, this._resizeTo = null, this.resizeTo = e.resizeTo || null;
    }, a.destroy = function() {
      globalThis.removeEventListener("resize", this.queueResize), this.cancelResize(), this.cancelResize = null, this.queueResize = null, this.resizeTo = null, this.resize = null;
    }, a.extension = ExtensionType.Application, a;
  }()
), Application = (
  /** @class */
  function() {
    function a(e) {
      var t = this;
      this.stage = new Container(), e = Object.assign({
        forceCanvas: !1
      }, e), this.renderer = autoDetectRenderer(e), a._plugins.forEach(function(r) {
        r.init.call(t, e);
      });
    }
    return a.registerPlugin = function(e) {
      deprecation("6.5.0", "Application.registerPlugin() is deprecated, use extensions.add()"), extensions.add({
        type: ExtensionType.Application,
        ref: e
      });
    }, a.prototype.render = function() {
      this.renderer.render(this.stage);
    }, Object.defineProperty(a.prototype, "view", {
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
    }), Object.defineProperty(a.prototype, "screen", {
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
    }), a.prototype.destroy = function(e, t) {
      var r = this, s = a._plugins.slice(0);
      s.reverse(), s.forEach(function(o) {
        o.destroy.call(r);
      }), this.stage.destroy(t), this.stage = null, this.renderer.destroy(e), this.renderer = null;
    }, a._plugins = [], a;
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
var extendStatics$1 = function(a, e) {
  return extendStatics$1 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, r) {
    t.__proto__ = r;
  } || function(t, r) {
    for (var s in r)
      r.hasOwnProperty(s) && (t[s] = r[s]);
  }, extendStatics$1(a, e);
};
function __extends$1(a, e) {
  extendStatics$1(a, e);
  function t() {
    this.constructor = a;
  }
  a.prototype = e === null ? Object.create(e) : (t.prototype = e.prototype, new t());
}
var PlaneGeometry = (
  /** @class */
  function(a) {
    __extends$1(e, a);
    function e(t, r, s, o) {
      t === void 0 && (t = 100), r === void 0 && (r = 100), s === void 0 && (s = 10), o === void 0 && (o = 10);
      var u = a.call(this) || this;
      return u.segWidth = s, u.segHeight = o, u.width = t, u.height = r, u.build(), u;
    }
    return e.prototype.build = function() {
      for (var t = this.segWidth * this.segHeight, r = [], s = [], o = [], u = this.segWidth - 1, h = this.segHeight - 1, l = this.width / u, c = this.height / h, d = 0; d < t; d++) {
        var _ = d % this.segWidth, v = d / this.segWidth | 0;
        r.push(_ * l, v * c), s.push(_ / u, v / h);
      }
      for (var y = u * h, d = 0; d < y; d++) {
        var b = d % u, g = d / u | 0, m = g * this.segWidth + b, E = g * this.segWidth + b + 1, S = (g + 1) * this.segWidth + b, P = (g + 1) * this.segWidth + b + 1;
        o.push(m, E, S, E, P, S);
      }
      this.buffers[0].data = new Float32Array(r), this.buffers[1].data = new Float32Array(s), this.indexBuffer.data = new Uint16Array(o), this.buffers[0].update(), this.buffers[1].update(), this.indexBuffer.update();
    }, e;
  }(MeshGeometry)
), RopeGeometry = (
  /** @class */
  function(a) {
    __extends$1(e, a);
    function e(t, r, s) {
      t === void 0 && (t = 200), s === void 0 && (s = 0);
      var o = a.call(this, new Float32Array(r.length * 4), new Float32Array(r.length * 4), new Uint16Array((r.length - 1) * 6)) || this;
      return o.points = r, o._width = t, o.textureScale = s, o.build(), o;
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
        var r = this.getBuffer("aVertexPosition"), s = this.getBuffer("aTextureCoord"), o = this.getIndex();
        if (!(t.length < 1)) {
          r.data.length / 4 !== t.length && (r.data = new Float32Array(t.length * 4), s.data = new Float32Array(t.length * 4), o.data = new Uint16Array((t.length - 1) * 6));
          var u = s.data, h = o.data;
          u[0] = 0, u[1] = 0, u[2] = 0, u[3] = 1;
          for (var l = 0, c = t[0], d = this._width * this.textureScale, _ = t.length, v = 0; v < _; v++) {
            var y = v * 4;
            if (this.textureScale > 0) {
              var b = c.x - t[v].x, g = c.y - t[v].y, m = Math.sqrt(b * b + g * g);
              c = t[v], l += m / d;
            } else
              l = v / (_ - 1);
            u[y] = l, u[y + 1] = 0, u[y + 2] = l, u[y + 3] = 1;
          }
          for (var E = 0, v = 0; v < _ - 1; v++) {
            var y = v * 2;
            h[E++] = y, h[E++] = y + 1, h[E++] = y + 2, h[E++] = y + 2, h[E++] = y + 1, h[E++] = y + 3;
          }
          s.update(), o.update(), this.updateVertices();
        }
      }
    }, e.prototype.updateVertices = function() {
      var t = this.points;
      if (!(t.length < 1)) {
        for (var r = t[0], s, o = 0, u = 0, h = this.buffers[0].data, l = t.length, c = 0; c < l; c++) {
          var d = t[c], _ = c * 4;
          c < t.length - 1 ? s = t[c + 1] : s = d, u = -(s.x - r.x), o = s.y - r.y;
          var v = Math.sqrt(o * o + u * u), y = this.textureScale > 0 ? this.textureScale * this._width / 2 : this._width / 2;
          o /= v, u /= v, o *= y, u *= y, h[_] = d.x + o, h[_ + 1] = d.y + u, h[_ + 2] = d.x - o, h[_ + 3] = d.y - u, r = d;
        }
        this.buffers[0].update();
      }
    }, e.prototype.update = function() {
      this.textureScale > 0 ? this.build() : this.updateVertices();
    }, e;
  }(MeshGeometry)
);
(function(a) {
  __extends$1(e, a);
  function e(t, r, s) {
    s === void 0 && (s = 0);
    var o = this, u = new RopeGeometry(t.height, r, s), h = new MeshMaterial(t);
    return s > 0 && (t.baseTexture.wrapMode = WRAP_MODES.REPEAT), o = a.call(this, u, h) || this, o.autoUpdate = !0, o;
  }
  return e.prototype._render = function(t) {
    var r = this.geometry;
    (this.autoUpdate || r._width !== this.shader.texture.height) && (r._width = this.shader.texture.height, r.update()), a.prototype._render.call(this, t);
  }, e;
})(Mesh);
var SimplePlane = (
  /** @class */
  function(a) {
    __extends$1(e, a);
    function e(t, r, s) {
      var o = this, u = new PlaneGeometry(t.width, t.height, r, s), h = new MeshMaterial(Texture.WHITE);
      return o = a.call(this, u, h) || this, o.texture = t, o.autoResize = !0, o;
    }
    return e.prototype.textureUpdated = function() {
      this._textureID = this.shader.texture._updateID;
      var t = this.geometry, r = this.shader.texture, s = r.width, o = r.height;
      this.autoResize && (t.width !== s || t.height !== o) && (t.width = this.shader.texture.width, t.height = this.shader.texture.height, t.build());
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
      this._textureID !== this.shader.texture._updateID && this.textureUpdated(), a.prototype._render.call(this, t);
    }, e.prototype.destroy = function(t) {
      this.shader.texture.off("update", this.textureUpdated, this), a.prototype.destroy.call(this, t);
    }, e;
  }(Mesh)
);
(function(a) {
  __extends$1(e, a);
  function e(t, r, s, o, u) {
    t === void 0 && (t = Texture.EMPTY);
    var h = this, l = new MeshGeometry(r, s, o);
    l.getBuffer("aVertexPosition").static = !1;
    var c = new MeshMaterial(t);
    return h = a.call(this, l, c, null, u) || this, h.autoUpdate = !0, h;
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
    this.autoUpdate && this.geometry.getBuffer("aVertexPosition").update(), a.prototype._render.call(this, t);
  }, e;
})(Mesh);
var DEFAULT_BORDER_SIZE = 10;
(function(a) {
  __extends$1(e, a);
  function e(t, r, s, o, u) {
    r === void 0 && (r = DEFAULT_BORDER_SIZE), s === void 0 && (s = DEFAULT_BORDER_SIZE), o === void 0 && (o = DEFAULT_BORDER_SIZE), u === void 0 && (u = DEFAULT_BORDER_SIZE);
    var h = a.call(this, Texture.WHITE, 4, 4) || this;
    return h._origWidth = t.orig.width, h._origHeight = t.orig.height, h._width = h._origWidth, h._height = h._origHeight, h._leftWidth = r, h._rightWidth = o, h._topHeight = s, h._bottomHeight = u, h.texture = t, h;
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
    var t = this._leftWidth + this._rightWidth, r = this._width > t ? 1 : this._width / t, s = this._topHeight + this._bottomHeight, o = this._height > s ? 1 : this._height / s, u = Math.min(r, o);
    return u;
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
    var s = 1 / this._origWidth, o = 1 / this._origHeight;
    r[0] = r[8] = r[16] = r[24] = 0, r[1] = r[3] = r[5] = r[7] = 0, r[6] = r[14] = r[22] = r[30] = 1, r[25] = r[27] = r[29] = r[31] = 1, r[2] = r[10] = r[18] = r[26] = s * this._leftWidth, r[4] = r[12] = r[20] = r[28] = 1 - s * this._rightWidth, r[9] = r[11] = r[13] = r[15] = o * this._topHeight, r[17] = r[19] = r[21] = r[23] = 1 - o * this._bottomHeight, this.updateHorizontalVertices(), this.updateVerticalVertices(), this.geometry.buffers[0].update(), this.geometry.buffers[1].update();
  }, e;
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
var extendStatics = function(a, e) {
  return extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, r) {
    t.__proto__ = r;
  } || function(t, r) {
    for (var s in r)
      r.hasOwnProperty(s) && (t[s] = r[s]);
  }, extendStatics(a, e);
};
function __extends(a, e) {
  extendStatics(a, e);
  function t() {
    this.constructor = a;
  }
  a.prototype = e === null ? Object.create(e) : (t.prototype = e.prototype, new t());
}
var AnimatedSprite = (
  /** @class */
  function(a) {
    __extends(e, a);
    function e(t, r) {
      r === void 0 && (r = !0);
      var s = a.call(this, t[0] instanceof Texture ? t[0] : t[0].texture) || this;
      return s._textures = null, s._durations = null, s._autoUpdate = r, s._isConnectedToTicker = !1, s.animationSpeed = 1, s.loop = !0, s.updateAnchor = !1, s.onComplete = null, s.onFrameChange = null, s.onLoop = null, s._currentTime = 0, s._playing = !1, s._previousFrame = null, s.textures = t, s;
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
        var r = this.animationSpeed * t, s = this.currentFrame;
        if (this._durations !== null) {
          var o = this._currentTime % 1 * this._durations[this.currentFrame];
          for (o += r / 60 * 1e3; o < 0; )
            this._currentTime--, o += this._durations[this.currentFrame];
          var u = Math.sign(this.animationSpeed * t);
          for (this._currentTime = Math.floor(this._currentTime); o >= this._durations[this.currentFrame]; )
            o -= this._durations[this.currentFrame] * u, this._currentTime += u;
          this._currentTime += o / this._durations[this.currentFrame];
        } else
          this._currentTime += r;
        this._currentTime < 0 && !this.loop ? (this.gotoAndStop(0), this.onComplete && this.onComplete()) : this._currentTime >= this._textures.length && !this.loop ? (this.gotoAndStop(this._textures.length - 1), this.onComplete && this.onComplete()) : s !== this.currentFrame && (this.loop && this.onLoop && (this.animationSpeed > 0 && this.currentFrame < s ? this.onLoop() : this.animationSpeed < 0 && this.currentFrame > s && this.onLoop()), this.updateTexture());
      }
    }, e.prototype.updateTexture = function() {
      var t = this.currentFrame;
      this._previousFrame !== t && (this._previousFrame = t, this._texture = this._textures[t], this._textureID = -1, this._textureTrimmedID = -1, this._cachedTint = 16777215, this.uvs = this._texture._uvs.uvsFloat32, this.updateAnchor && this._anchor.copyFrom(this._texture.defaultAnchor), this.onFrameChange && this.onFrameChange(this.currentFrame));
    }, e.prototype.destroy = function(t) {
      this.stop(), a.prototype.destroy.call(this, t), this.onComplete = null, this.onFrameChange = null, this.onLoop = null;
    }, e.fromFrames = function(t) {
      for (var r = [], s = 0; s < t.length; ++s)
        r.push(Texture.from(t[s]));
      return new e(r);
    }, e.fromImages = function(t) {
      for (var r = [], s = 0; s < t.length; ++s)
        r.push(Texture.from(t[s]));
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
  AlphaFilter,
  BlurFilter: BlurFilter$1,
  BlurFilterPass,
  ColorMatrixFilter: ColorMatrixFilter$1,
  DisplacementFilter,
  FXAAFilter,
  NoiseFilter: NoiseFilter$1
};
class EventListenerCtn {
  // リソースリーク対策
  #e = [];
  add(e, t, r, s = {}) {
    if (e instanceof BaseTexture) {
      switch (t) {
        case "loaded":
        case "update":
        case "error":
        case "dispose":
          e.on(t, r, s), this.#e.push(() => e.off(t, r, s));
          break;
      }
      return;
    }
    if (e instanceof i) {
      e.on(t, r, s), this.#e.push(() => e.off(t, r, s));
      return;
    }
    e.addEventListener(t, r, s), this.#e.push(() => e.removeEventListener(t, r, { capture: s.capture ?? !1 }));
  }
  clear() {
    for (const e of this.#e) e();
    this.#e = [];
  }
  get isEmpty() {
    return this.#e.length === 0;
  }
}
var SEARCH_PATH_ARG_EXT = /* @__PURE__ */ ((a) => (a.DEFAULT = "", a.SP_GSM = "png|jpg|jpeg|json|svg|webp|mp4|webm", a.SCRIPT = "sn|ssn", a.FONT = "woff2|woff|otf|ttf", a.SOUND = "mp3|m4a|ogg|aac|flac|wav", a.HTML = "htm|html", a.CSS = "css", a.SN = "sn", a.TST_PNGPNG_ = "png|png_", a.TST_HH = "hh", a.TST_EEE = "eee", a.TST_GGG = "ggg", a.TST_PNGXML = "png|xml", a))(SEARCH_PATH_ARG_EXT || {});
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
  constructor(e) {
    this.sys = e;
  }
  oCfg = DEF_CFG;
  userFnTail = "";
  // 4tst public
  hPathFn2Exts = {};
  async load(e) {
    if (this.oCfg.save_ns = e?.save_ns ?? this.oCfg.save_ns, this.oCfg.window.width = Number(e?.window?.width ?? this.oCfg.window.width), this.oCfg.window.height = Number(e?.window?.height ?? this.oCfg.window.height), this.oCfg.book = { ...this.oCfg.book, ...e.book }, this.oCfg.log.max_len = e.log?.max_len ?? this.oCfg.log.max_len, this.oCfg.init = { ...this.oCfg.init, ...e.init }, this.oCfg.debug = { ...this.oCfg.debug, ...e.debug }, this.oCfg.debuger_token = e.debuger_token, await this.sys.loadPath(this.hPathFn2Exts, this), this.#e = this.matchPath(
      "^breakline$",
      "png|jpg|jpeg|json|svg|webp|mp4|webm"
      /* SP_GSM */
    ).length > 0, this.#t = this.matchPath(
      "^breakpage$",
      "png|jpg|jpeg|json|svg|webp|mp4|webm"
      /* SP_GSM */
    ).length > 0, this.sys.arg.crypto)
      for (const [t, r] of Object.entries(this.hPathFn2Exts))
        for (const [s, o] of Object.entries(r)) {
          if (!s.startsWith(":") || !s.endsWith(":id")) continue;
          const u = o.slice(o.lastIndexOf("/") + 1), h = r[s.slice(0, -10)] ?? "", c = await (await this.sys.fetch(h)).text(), d = this.sys.hash(c);
          if (u !== d) throw `ファイル改竄エラーです fn:${h}`;
        }
    else
      for (const [t, r] of Object.entries(this.hPathFn2Exts))
        for (const s of Object.keys(r))
          s.startsWith(":");
  }
  #e = !1;
  get existsBreakline() {
    return this.#e;
  }
  #t = !1;
  get existsBreakpage() {
    return this.#t;
  }
  getNs() {
    return `skynovel.${this.oCfg.save_ns} - `;
  }
  #i = /([^\/\s]+)\.([^\d]\w+)/;
  // 4 match 498 step(~1ms)  https://regex101.com/r/tpVgmI/1
  searchPath(e, t = "") {
    if (!e) throw "[searchPath] fnが空です";
    if (e.startsWith("http://")) return e;
    const r = e.match(this.#i);
    let s = r ? r[1] : e;
    const o = r ? r[2] : "";
    if (this.userFnTail) {
      const l = s + "@@" + this.userFnTail;
      if (l in this.hPathFn2Exts) {
        if (t === "") s = l;
        else for (const c of Object.keys(this.hPathFn2Exts[l] ?? {}))
          if (`|${t}|`.includes(`|${c}|`)) {
            s = l;
            break;
          }
      }
    }
    const u = this.hPathFn2Exts[s];
    if (!u) throw `サーチパスに存在しないファイル【${e}】です`;
    if (!o) {
      const l = int(u[":cnt"]);
      if (t === "") {
        if (l > 1) throw `指定ファイル【${e}】が複数マッチします。サーチ対象拡張子群【${t}】で絞り込むか、ファイル名を個別にして下さい。`;
        return e;
      }
      const c = `|${t}|`;
      if (l > 1) {
        let d = 0;
        for (const _ of Object.keys(u))
          if (c.includes(`|${_}|`) && ++d > 1)
            throw `指定ファイル【${e}】が複数マッチします。サーチ対象拡張子群【${t}】で絞り込むか、ファイル名を個別にして下さい。`;
      }
      for (const d of Object.keys(u))
        if (c.includes(`|${d}|`)) return u[d];
      throw `サーチ対象拡張子群【${t}】にマッチするファイルがサーチパスに存在しません。探索ファイル名=【${e}】`;
    }
    if (t !== "" && !`|${t}|`.includes(`|${o}|`))
      throw `指定ファイルの拡張子【${o}】は、サーチ対象拡張子群【${t}】にマッチしません。探索ファイル名=【${e}】`;
    const h = u[o];
    if (!h) throw `サーチパスに存在しない拡張子【${o}】です。探索ファイル名=【${e}】、サーチ対象拡張子群【${t}】`;
    return h;
  }
  matchPath(e, t = "") {
    const r = [], s = new RegExp(e), o = new RegExp(t);
    for (const [u, h] of Object.entries(this.hPathFn2Exts)) {
      if (u.search(s) === -1) continue;
      if (t === "") {
        r.push(h);
        continue;
      }
      const l = {};
      let c = !1;
      for (const d of Object.keys(h))
        d.search(o) !== -1 && (l[d] = u, c = !0);
      c && r.push(l);
    }
    return r;
  }
  addPath(e, t) {
    const r = {};
    for (const [s, o] of Object.entries(t))
      r[s] = (s.startsWith(":") ? "" : this.sys.arg.cur) + o;
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
Object.keys(PACKET_TYPES).forEach((a) => {
  PACKET_TYPES_REVERSE[PACKET_TYPES[a]] = a;
});
const ERROR_PACKET = { type: "error", data: "parser error" }, withNativeBlob$1 = typeof Blob == "function" || typeof Blob < "u" && Object.prototype.toString.call(Blob) === "[object BlobConstructor]", withNativeArrayBuffer$2 = typeof ArrayBuffer == "function", isView$1 = (a) => typeof ArrayBuffer.isView == "function" ? ArrayBuffer.isView(a) : a && a.buffer instanceof ArrayBuffer, encodePacket = ({ type: a, data: e }, t, r) => withNativeBlob$1 && e instanceof Blob ? t ? r(e) : encodeBlobAsBase64(e, r) : withNativeArrayBuffer$2 && (e instanceof ArrayBuffer || isView$1(e)) ? t ? r(e) : encodeBlobAsBase64(new Blob([e]), r) : r(PACKET_TYPES[a] + (e || "")), encodeBlobAsBase64 = (a, e) => {
  const t = new FileReader();
  return t.onload = function() {
    const r = t.result.split(",")[1];
    e("b" + (r || ""));
  }, t.readAsDataURL(a);
};
function toArray(a) {
  return a instanceof Uint8Array ? a : a instanceof ArrayBuffer ? new Uint8Array(a) : new Uint8Array(a.buffer, a.byteOffset, a.byteLength);
}
let TEXT_ENCODER;
function encodePacketToBinary(a, e) {
  if (withNativeBlob$1 && a.data instanceof Blob)
    return a.data.arrayBuffer().then(toArray).then(e);
  if (withNativeArrayBuffer$2 && (a.data instanceof ArrayBuffer || isView$1(a.data)))
    return e(toArray(a.data));
  encodePacket(a, !1, (t) => {
    TEXT_ENCODER || (TEXT_ENCODER = new TextEncoder()), e(TEXT_ENCODER.encode(t));
  });
}
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", lookup$1 = typeof Uint8Array > "u" ? [] : new Uint8Array(256);
for (let a = 0; a < chars.length; a++)
  lookup$1[chars.charCodeAt(a)] = a;
const decode$1 = (a) => {
  let e = a.length * 0.75, t = a.length, r, s = 0, o, u, h, l;
  a[a.length - 1] === "=" && (e--, a[a.length - 2] === "=" && e--);
  const c = new ArrayBuffer(e), d = new Uint8Array(c);
  for (r = 0; r < t; r += 4)
    o = lookup$1[a.charCodeAt(r)], u = lookup$1[a.charCodeAt(r + 1)], h = lookup$1[a.charCodeAt(r + 2)], l = lookup$1[a.charCodeAt(r + 3)], d[s++] = o << 2 | u >> 4, d[s++] = (u & 15) << 4 | h >> 2, d[s++] = (h & 3) << 6 | l & 63;
  return c;
}, withNativeArrayBuffer$1 = typeof ArrayBuffer == "function", decodePacket = (a, e) => {
  if (typeof a != "string")
    return {
      type: "message",
      data: mapBinary(a, e)
    };
  const t = a.charAt(0);
  return t === "b" ? {
    type: "message",
    data: decodeBase64Packet(a.substring(1), e)
  } : PACKET_TYPES_REVERSE[t] ? a.length > 1 ? {
    type: PACKET_TYPES_REVERSE[t],
    data: a.substring(1)
  } : {
    type: PACKET_TYPES_REVERSE[t]
  } : ERROR_PACKET;
}, decodeBase64Packet = (a, e) => {
  if (withNativeArrayBuffer$1) {
    const t = decode$1(a);
    return mapBinary(t, e);
  } else
    return { base64: !0, data: a };
}, mapBinary = (a, e) => {
  switch (e) {
    case "blob":
      return a instanceof Blob ? a : new Blob([a]);
    case "arraybuffer":
    default:
      return a instanceof ArrayBuffer ? a : a.buffer;
  }
}, SEPARATOR = "", encodePayload = (a, e) => {
  const t = a.length, r = new Array(t);
  let s = 0;
  a.forEach((o, u) => {
    encodePacket(o, !1, (h) => {
      r[u] = h, ++s === t && e(r.join(SEPARATOR));
    });
  });
}, decodePayload = (a, e) => {
  const t = a.split(SEPARATOR), r = [];
  for (let s = 0; s < t.length; s++) {
    const o = decodePacket(t[s], e);
    if (r.push(o), o.type === "error")
      break;
  }
  return r;
};
function createPacketEncoderStream() {
  return new TransformStream({
    transform(a, e) {
      encodePacketToBinary(a, (t) => {
        const r = t.length;
        let s;
        if (r < 126)
          s = new Uint8Array(1), new DataView(s.buffer).setUint8(0, r);
        else if (r < 65536) {
          s = new Uint8Array(3);
          const o = new DataView(s.buffer);
          o.setUint8(0, 126), o.setUint16(1, r);
        } else {
          s = new Uint8Array(9);
          const o = new DataView(s.buffer);
          o.setUint8(0, 127), o.setBigUint64(1, BigInt(r));
        }
        a.data && typeof a.data != "string" && (s[0] |= 128), e.enqueue(s), e.enqueue(t);
      });
    }
  });
}
let TEXT_DECODER;
function totalLength(a) {
  return a.reduce((e, t) => e + t.length, 0);
}
function concatChunks(a, e) {
  if (a[0].length === e)
    return a.shift();
  const t = new Uint8Array(e);
  let r = 0;
  for (let s = 0; s < e; s++)
    t[s] = a[0][r++], r === a[0].length && (a.shift(), r = 0);
  return a.length && r < a[0].length && (a[0] = a[0].slice(r)), t;
}
function createPacketDecoderStream(a, e) {
  TEXT_DECODER || (TEXT_DECODER = new TextDecoder());
  const t = [];
  let r = 0, s = -1, o = !1;
  return new TransformStream({
    transform(u, h) {
      for (t.push(u); ; ) {
        if (r === 0) {
          if (totalLength(t) < 1)
            break;
          const l = concatChunks(t, 1);
          o = (l[0] & 128) === 128, s = l[0] & 127, s < 126 ? r = 3 : s === 126 ? r = 1 : r = 2;
        } else if (r === 1) {
          if (totalLength(t) < 2)
            break;
          const l = concatChunks(t, 2);
          s = new DataView(l.buffer, l.byteOffset, l.length).getUint16(0), r = 3;
        } else if (r === 2) {
          if (totalLength(t) < 8)
            break;
          const l = concatChunks(t, 8), c = new DataView(l.buffer, l.byteOffset, l.length), d = c.getUint32(0);
          if (d > Math.pow(2, 21) - 1) {
            h.enqueue(ERROR_PACKET);
            break;
          }
          s = d * Math.pow(2, 32) + c.getUint32(4), r = 3;
        } else {
          if (totalLength(t) < s)
            break;
          const l = concatChunks(t, s);
          h.enqueue(decodePacket(o ? l : TEXT_DECODER.decode(l), e)), r = 0;
        }
        if (s === 0 || s > a) {
          h.enqueue(ERROR_PACKET);
          break;
        }
      }
    }
  });
}
const protocol$1 = 4;
function Emitter(a) {
  if (a) return mixin(a);
}
function mixin(a) {
  for (var e in Emitter.prototype)
    a[e] = Emitter.prototype[e];
  return a;
}
Emitter.prototype.on = Emitter.prototype.addEventListener = function(a, e) {
  return this._callbacks = this._callbacks || {}, (this._callbacks["$" + a] = this._callbacks["$" + a] || []).push(e), this;
};
Emitter.prototype.once = function(a, e) {
  function t() {
    this.off(a, t), e.apply(this, arguments);
  }
  return t.fn = e, this.on(a, t), this;
};
Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function(a, e) {
  if (this._callbacks = this._callbacks || {}, arguments.length == 0)
    return this._callbacks = {}, this;
  var t = this._callbacks["$" + a];
  if (!t) return this;
  if (arguments.length == 1)
    return delete this._callbacks["$" + a], this;
  for (var r, s = 0; s < t.length; s++)
    if (r = t[s], r === e || r.fn === e) {
      t.splice(s, 1);
      break;
    }
  return t.length === 0 && delete this._callbacks["$" + a], this;
};
Emitter.prototype.emit = function(a) {
  this._callbacks = this._callbacks || {};
  for (var e = new Array(arguments.length - 1), t = this._callbacks["$" + a], r = 1; r < arguments.length; r++)
    e[r - 1] = arguments[r];
  if (t) {
    t = t.slice(0);
    for (var r = 0, s = t.length; r < s; ++r)
      t[r].apply(this, e);
  }
  return this;
};
Emitter.prototype.emitReserved = Emitter.prototype.emit;
Emitter.prototype.listeners = function(a) {
  return this._callbacks = this._callbacks || {}, this._callbacks["$" + a] || [];
};
Emitter.prototype.hasListeners = function(a) {
  return !!this.listeners(a).length;
};
const nextTick = typeof Promise == "function" && typeof Promise.resolve == "function" ? (e) => Promise.resolve().then(e) : (e, t) => t(e, 0), globalThisShim = typeof self < "u" ? self : typeof window < "u" ? window : Function("return this")(), defaultBinaryType = "arraybuffer";
function createCookieJar() {
}
function pick(a, ...e) {
  return e.reduce((t, r) => (a.hasOwnProperty(r) && (t[r] = a[r]), t), {});
}
const NATIVE_SET_TIMEOUT = globalThisShim.setTimeout, NATIVE_CLEAR_TIMEOUT = globalThisShim.clearTimeout;
function installTimerFunctions(a, e) {
  e.useNativeTimers ? (a.setTimeoutFn = NATIVE_SET_TIMEOUT.bind(globalThisShim), a.clearTimeoutFn = NATIVE_CLEAR_TIMEOUT.bind(globalThisShim)) : (a.setTimeoutFn = globalThisShim.setTimeout.bind(globalThisShim), a.clearTimeoutFn = globalThisShim.clearTimeout.bind(globalThisShim));
}
const BASE64_OVERHEAD = 1.33;
function byteLength(a) {
  return typeof a == "string" ? utf8Length(a) : Math.ceil((a.byteLength || a.size) * BASE64_OVERHEAD);
}
function utf8Length(a) {
  let e = 0, t = 0;
  for (let r = 0, s = a.length; r < s; r++)
    e = a.charCodeAt(r), e < 128 ? t += 1 : e < 2048 ? t += 2 : e < 55296 || e >= 57344 ? t += 3 : (r++, t += 4);
  return t;
}
function randomString() {
  return Date.now().toString(36).substring(3) + Math.random().toString(36).substring(2, 5);
}
function encode(a) {
  let e = "";
  for (let t in a)
    a.hasOwnProperty(t) && (e.length && (e += "&"), e += encodeURIComponent(t) + "=" + encodeURIComponent(a[t]));
  return e;
}
function decode(a) {
  let e = {}, t = a.split("&");
  for (let r = 0, s = t.length; r < s; r++) {
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
    r.on("success", t), r.on("error", (s, o) => {
      this.onError("xhr post error", s, o);
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
          for (let s in this._opts.extraHeaders)
            this._opts.extraHeaders.hasOwnProperty(s) && r.setRequestHeader(s, this._opts.extraHeaders[s]);
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
        var s;
        r.readyState === 3 && ((s = this._opts.cookieJar) === null || s === void 0 || s.parseCookies(
          // @ts-ignore
          r.getResponseHeader("set-cookie")
        )), r.readyState === 4 && (r.status === 200 || r.status === 1223 ? this._onLoad() : this.setTimeoutFn(() => {
          this._onError(typeof r.status == "number" ? r.status : 0);
        }, 0));
      }, r.send(this._data);
    } catch (s) {
      this.setTimeoutFn(() => {
        this._onError(s);
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
    const a = "onpagehide" in globalThisShim ? "pagehide" : "unload";
    addEventListener(a, unloadHandler, !1);
  }
}
function unloadHandler() {
  for (let a in Request.requests)
    Request.requests.hasOwnProperty(a) && Request.requests[a].abort();
}
const hasXHR2 = function() {
  const a = newRequest({
    xdomain: !1
  });
  return a && a.responseType !== null;
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
function newRequest(a) {
  const e = a.xdomain;
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
    } catch (s) {
      return this.emitReserved("error", s);
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
      const r = e[t], s = t === e.length - 1;
      encodePacket(r, this.supportsBinary, (o) => {
        try {
          this.doWrite(r, o);
        } catch {
        }
        s && nextTick(() => {
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
        const t = createPacketDecoderStream(Number.MAX_SAFE_INTEGER, this.socket.binaryType), r = e.readable.pipeThrough(t).getReader(), s = createPacketEncoderStream();
        s.readable.pipeTo(e.writable), this._writer = s.writable.getWriter();
        const o = () => {
          r.read().then(({ done: h, value: l }) => {
            h || (this.onPacket(l), o());
          }).catch((h) => {
          });
        };
        o();
        const u = { type: "open" };
        this.query.sid && (u.data = `{"sid":"${this.query.sid}"}`), this._writer.write(u).then(() => this.onOpen());
      });
    });
  }
  write(e) {
    this.writable = !1;
    for (let t = 0; t < e.length; t++) {
      const r = e[t], s = t === e.length - 1;
      this._writer.write(r).then(() => {
        s && nextTick(() => {
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
function parse(a) {
  if (a.length > 8e3)
    throw "URI too long";
  const e = a, t = a.indexOf("["), r = a.indexOf("]");
  t != -1 && r != -1 && (a = a.substring(0, t) + a.substring(t, r).replace(/:/g, ";") + a.substring(r, a.length));
  let s = re.exec(a || ""), o = {}, u = 14;
  for (; u--; )
    o[parts[u]] = s[u] || "";
  return t != -1 && r != -1 && (o.source = e, o.host = o.host.substring(1, o.host.length - 1).replace(/;/g, ":"), o.authority = o.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), o.ipv6uri = !0), o.pathNames = pathNames(o, o.path), o.queryKey = queryKey(o, o.query), o;
}
function pathNames(a, e) {
  const t = /\/{2,9}/g, r = e.replace(t, "/").split("/");
  return (e.slice(0, 1) == "/" || e.length === 0) && r.splice(0, 1), e.slice(-1) == "/" && r.splice(r.length - 1, 1), r;
}
function queryKey(a, e) {
  const t = {};
  return e.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function(r, s, o) {
    s && (t[s] = o);
  }), t;
}
const withEventListeners = typeof addEventListener == "function" && typeof removeEventListener == "function", OFFLINE_EVENT_LISTENERS = [];
withEventListeners && addEventListener("offline", () => {
  OFFLINE_EVENT_LISTENERS.forEach((a) => a());
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
      const s = r.prototype.name;
      this.transports.push(s), this._transportsByName[s] = r;
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
      const s = this.writeBuffer[r].data;
      if (s && (t += byteLength(s)), r > 0 && t > this._maxPayload)
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
  _sendPacket(e, t, r, s) {
    if (typeof t == "function" && (s = t, t = void 0), typeof r == "function" && (s = r, r = null), this.readyState === "closing" || this.readyState === "closed")
      return;
    r = r || {}, r.compress = r.compress !== !1;
    const o = {
      type: e,
      data: t,
      options: r
    };
    this.emitReserved("packetCreate", o), this.writeBuffer.push(o), s && this.once("flush", s), this.flush();
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
    const s = () => {
      r || (t.send([{ type: "ping", data: "probe" }]), t.once("packet", (_) => {
        if (!r)
          if (_.type === "pong" && _.data === "probe") {
            if (this.upgrading = !0, this.emitReserved("upgrading", t), !t)
              return;
            SocketWithoutUpgrade.priorWebsocketSuccess = t.name === "websocket", this.transport.pause(() => {
              r || this.readyState !== "closed" && (d(), this.setTransport(t), t.send([{ type: "upgrade" }]), this.emitReserved("upgrade", t), t = null, this.upgrading = !1, this.flush());
            });
          } else {
            const v = new Error("probe error");
            v.transport = t.name, this.emitReserved("upgradeError", v);
          }
      }));
    };
    function o() {
      r || (r = !0, d(), t.close(), t = null);
    }
    const u = (_) => {
      const v = new Error("probe error: " + _);
      v.transport = t.name, o(), this.emitReserved("upgradeError", v);
    };
    function h() {
      u("transport closed");
    }
    function l() {
      u("socket closed");
    }
    function c(_) {
      t && _.name !== t.name && o();
    }
    const d = () => {
      t.removeListener("open", s), t.removeListener("error", u), t.removeListener("close", h), this.off("close", l), this.off("upgrading", c);
    };
    t.once("open", s), t.once("error", u), t.once("close", h), this.once("close", l), this.once("upgrading", c), this._upgrades.indexOf("webtransport") !== -1 && e !== "webtransport" ? this.setTimeoutFn(() => {
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
    (!r.transports || r.transports && typeof r.transports[0] == "string") && (r.transports = (r.transports || ["polling", "websocket", "webtransport"]).map((s) => transports[s]).filter((s) => !!s)), super(e, r);
  }
};
function url(a, e = "", t) {
  let r = a;
  t = t || typeof location < "u" && location, a == null && (a = t.protocol + "//" + t.host), typeof a == "string" && (a.charAt(0) === "/" && (a.charAt(1) === "/" ? a = t.protocol + a : a = t.host + a), /^(https?|wss?):\/\//.test(a) || (typeof t < "u" ? a = t.protocol + "//" + a : a = "https://" + a), r = parse(a)), r.port || (/^(http|ws)$/.test(r.protocol) ? r.port = "80" : /^(http|ws)s$/.test(r.protocol) && (r.port = "443")), r.path = r.path || "/";
  const o = r.host.indexOf(":") !== -1 ? "[" + r.host + "]" : r.host;
  return r.id = r.protocol + "://" + o + ":" + r.port + e, r.href = r.protocol + "://" + o + (t && t.port === r.port ? "" : ":" + r.port), r;
}
const withNativeArrayBuffer = typeof ArrayBuffer == "function", isView = (a) => typeof ArrayBuffer.isView == "function" ? ArrayBuffer.isView(a) : a.buffer instanceof ArrayBuffer, toString = Object.prototype.toString, withNativeBlob = typeof Blob == "function" || typeof Blob < "u" && toString.call(Blob) === "[object BlobConstructor]", withNativeFile = typeof File == "function" || typeof File < "u" && toString.call(File) === "[object FileConstructor]";
function isBinary(a) {
  return withNativeArrayBuffer && (a instanceof ArrayBuffer || isView(a)) || withNativeBlob && a instanceof Blob || withNativeFile && a instanceof File;
}
function hasBinary(a, e) {
  if (!a || typeof a != "object")
    return !1;
  if (Array.isArray(a)) {
    for (let t = 0, r = a.length; t < r; t++)
      if (hasBinary(a[t]))
        return !0;
    return !1;
  }
  if (isBinary(a))
    return !0;
  if (a.toJSON && typeof a.toJSON == "function" && arguments.length === 1)
    return hasBinary(a.toJSON(), !0);
  for (const t in a)
    if (Object.prototype.hasOwnProperty.call(a, t) && hasBinary(a[t]))
      return !0;
  return !1;
}
function deconstructPacket(a) {
  const e = [], t = a.data, r = a;
  return r.data = _deconstructPacket(t, e), r.attachments = e.length, { packet: r, buffers: e };
}
function _deconstructPacket(a, e) {
  if (!a)
    return a;
  if (isBinary(a)) {
    const t = { _placeholder: !0, num: e.length };
    return e.push(a), t;
  } else if (Array.isArray(a)) {
    const t = new Array(a.length);
    for (let r = 0; r < a.length; r++)
      t[r] = _deconstructPacket(a[r], e);
    return t;
  } else if (typeof a == "object" && !(a instanceof Date)) {
    const t = {};
    for (const r in a)
      Object.prototype.hasOwnProperty.call(a, r) && (t[r] = _deconstructPacket(a[r], e));
    return t;
  }
  return a;
}
function reconstructPacket(a, e) {
  return a.data = _reconstructPacket(a.data, e), delete a.attachments, a;
}
function _reconstructPacket(a, e) {
  if (!a)
    return a;
  if (a && a._placeholder === !0) {
    if (typeof a.num == "number" && a.num >= 0 && a.num < e.length)
      return e[a.num];
    throw new Error("illegal attachments");
  } else if (Array.isArray(a))
    for (let t = 0; t < a.length; t++)
      a[t] = _reconstructPacket(a[t], e);
  else if (typeof a == "object")
    for (const t in a)
      Object.prototype.hasOwnProperty.call(a, t) && (a[t] = _reconstructPacket(a[t], e));
  return a;
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
(function(a) {
  a[a.CONNECT = 0] = "CONNECT", a[a.DISCONNECT = 1] = "DISCONNECT", a[a.EVENT = 2] = "EVENT", a[a.ACK = 3] = "ACK", a[a.CONNECT_ERROR = 4] = "CONNECT_ERROR", a[a.BINARY_EVENT = 5] = "BINARY_EVENT", a[a.BINARY_ACK = 6] = "BINARY_ACK";
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
    const t = deconstructPacket(e), r = this.encodeAsString(t.packet), s = t.buffers;
    return s.unshift(r), s;
  }
}
function isObject(a) {
  return Object.prototype.toString.call(a) === "[object Object]";
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
      const u = e.substring(o, t);
      if (u != Number(u) || e.charAt(t) !== "-")
        throw new Error("Illegal attachments");
      r.attachments = Number(u);
    }
    if (e.charAt(t + 1) === "/") {
      const o = t + 1;
      for (; ++t && !(e.charAt(t) === "," || t === e.length); )
        ;
      r.nsp = e.substring(o, t);
    } else
      r.nsp = "/";
    const s = e.charAt(t + 1);
    if (s !== "" && Number(s) == s) {
      const o = t + 1;
      for (; ++t; ) {
        const u = e.charAt(t);
        if (u == null || Number(u) != u) {
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
function on(a, e, t) {
  return a.on(e, t), function() {
    a.off(e, t);
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
    var r, s, o;
    if (RESERVED_EVENTS.hasOwnProperty(e))
      throw new Error('"' + e.toString() + '" is a reserved event name');
    if (t.unshift(e), this._opts.retries && !this.flags.fromQueue && !this.flags.volatile)
      return this._addToQueue(t), this;
    const u = {
      type: PacketType.EVENT,
      data: t
    };
    if (u.options = {}, u.options.compress = this.flags.compress !== !1, typeof t[t.length - 1] == "function") {
      const d = this.ids++, _ = t.pop();
      this._registerAckCallback(d, _), u.id = d;
    }
    const h = (s = (r = this.io.engine) === null || r === void 0 ? void 0 : r.transport) === null || s === void 0 ? void 0 : s.writable, l = this.connected && !(!((o = this.io.engine) === null || o === void 0) && o._hasPingExpired());
    return this.flags.volatile && !h || (l ? (this.notifyOutgoingListeners(u), this.packet(u)) : this.sendBuffer.push(u)), this.flags = {}, this;
  }
  /**
   * @private
   */
  _registerAckCallback(e, t) {
    var r;
    const s = (r = this.flags.timeout) !== null && r !== void 0 ? r : this._opts.ackTimeout;
    if (s === void 0) {
      this.acks[e] = t;
      return;
    }
    const o = this.io.setTimeoutFn(() => {
      delete this.acks[e];
      for (let h = 0; h < this.sendBuffer.length; h++)
        this.sendBuffer[h].id === e && this.sendBuffer.splice(h, 1);
      t.call(this, new Error("operation has timed out"));
    }, s), u = (...h) => {
      this.io.clearTimeoutFn(o), t.apply(this, h);
    };
    u.withError = !0, this.acks[e] = u;
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
    return new Promise((r, s) => {
      const o = (u, h) => u ? s(u) : r(h);
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
    e.push((s, ...o) => r !== this._queue[0] ? void 0 : (s !== null ? r.tryCount > this._opts.retries && (this._queue.shift(), t && t(s)) : (this._queue.shift(), t && t(null, ...o)), r.pending = !1, this._drainQueue())), this._queue.push(r), this._drainQueue();
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
    return function(...s) {
      r || (r = !0, t.packet({
        type: PacketType.ACK,
        id: e,
        data: s
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
function Backoff(a) {
  a = a || {}, this.ms = a.min || 100, this.max = a.max || 1e4, this.factor = a.factor || 2, this.jitter = a.jitter > 0 && a.jitter <= 1 ? a.jitter : 0, this.attempts = 0;
}
Backoff.prototype.duration = function() {
  var a = this.ms * Math.pow(this.factor, this.attempts++);
  if (this.jitter) {
    var e = Math.random(), t = Math.floor(e * this.jitter * a);
    a = Math.floor(e * 10) & 1 ? a + t : a - t;
  }
  return Math.min(a, this.max) | 0;
};
Backoff.prototype.reset = function() {
  this.attempts = 0;
};
Backoff.prototype.setMin = function(a) {
  this.ms = a;
};
Backoff.prototype.setMax = function(a) {
  this.max = a;
};
Backoff.prototype.setJitter = function(a) {
  this.jitter = a;
};
class Manager extends Emitter {
  constructor(e, t) {
    var r;
    super(), this.nsps = {}, this.subs = [], e && typeof e == "object" && (t = e, e = void 0), t = t || {}, t.path = t.path || "/socket.io", this.opts = t, installTimerFunctions(this, t), this.reconnection(t.reconnection !== !1), this.reconnectionAttempts(t.reconnectionAttempts || 1 / 0), this.reconnectionDelay(t.reconnectionDelay || 1e3), this.reconnectionDelayMax(t.reconnectionDelayMax || 5e3), this.randomizationFactor((r = t.randomizationFactor) !== null && r !== void 0 ? r : 0.5), this.backoff = new Backoff({
      min: this.reconnectionDelay(),
      max: this.reconnectionDelayMax(),
      jitter: this.randomizationFactor()
    }), this.timeout(t.timeout == null ? 2e4 : t.timeout), this._readyState = "closed", this.uri = e;
    const s = t.parser || parser;
    this.encoder = new s.Encoder(), this.decoder = new s.Decoder(), this._autoConnect = t.autoConnect !== !1, this._autoConnect && this.open();
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
    const s = on(t, "open", function() {
      r.onopen(), e && e();
    }), o = (h) => {
      this.cleanup(), this._readyState = "closed", this.emitReserved("error", h), e ? e(h) : this.maybeReconnectOnOpen();
    }, u = on(t, "error", o);
    if (this._timeout !== !1) {
      const h = this._timeout, l = this.setTimeoutFn(() => {
        s(), o(new Error("timeout")), t.close();
      }, h);
      this.opts.autoUnref && l.unref(), this.subs.push(() => {
        this.clearTimeoutFn(l);
      });
    }
    return this.subs.push(s), this.subs.push(u), this;
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
        e.skipReconnect || (this.emitReserved("reconnect_attempt", e.backoff.attempts), !e.skipReconnect && e.open((s) => {
          s ? (e._reconnecting = !1, e.reconnect(), this.emitReserved("reconnect_error", s)) : e.onreconnect();
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
function lookup(a, e) {
  typeof a == "object" && (e = a, a = void 0), e = e || {};
  const t = url(a, e.path || "/socket.io"), r = t.source, s = t.id, o = t.path, u = cache[s] && o in cache[s].nsps, h = e.forceNew || e["force new connection"] || e.multiplex === !1 || u;
  let l;
  return h ? l = new Manager(r, e) : (cache[s] || (cache[s] = new Manager(r, e)), l = cache[s]), t.query && !e.query && (e.query = t.queryKey), l.socket(t.path, e);
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
  hFactoryCls = {};
  elc = new EventListenerCtn();
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
      setDec: (r) => this.dec = r,
      setDecAB: (r) => this.#m = r,
      setEnc: (r) => this.enc = r,
      getStK: (r) => this.stk = r,
      getHash: (r) => this.hash = r
    });
  }
  fetch = (e, t) => fetch(e, t);
  destroy() {
    this.elc.clear();
  }
  resolution = 1;
  cfg;
  async loadPath(e, t) {
    this.cfg = t;
  }
  data = { sys: {}, mark: {}, kidoku: {} };
  async initVal(e, t, r) {
  }
  flush() {
    if (this.#e) {
      this.#t = !0;
      return;
    }
    this.flushSub(), this.#e = setTimeout(() => {
      this.#e = void 0, this.#t && (this.#t = !1, this.flush());
    }, 500);
  }
  #e = void 0;
  #t = !1;
  flushSub() {
  }
  async run() {
  }
  val;
  main;
  init(e, t, r, s) {
    this.val = r, this.main = s;
    let o = "";
    try {
      r.setSys(this), o = "sys", o += Number(r.getVal("sys:TextLayer.Back.Alpha", 1)), o = "kidoku", r.saveKidoku();
    } catch (u) {
      console.error(`セーブデータ（${o}）が壊れています。一度クリアする必要があります(b) %o`, u);
    }
    return e.close = (u) => this.close(u), e.export = (u) => this._export(u), e.import = (u) => this._import(u), e.navigate_to = (u) => this.navigate_to(u), e.title = (u) => this.title(u), e.toggle_full_screen = (u) => this.#g(u), e.update_check = (u) => this.update_check(u), e.window = (u) => this.window(u), r.setVal_Nochk("tmp", "const.sn.isApp", () => this.isApp), r.setVal_Nochk("tmp", "const.sn.isDbg", () => CmnLib.isDbg), r.setVal_Nochk("tmp", "const.sn.isPackaged", () => CmnLib.isPackaged), r.defTmp("const.sn.displayState", () => this.isFullScr), r.setVal_Nochk("sys", SysBase.VALNM_CFG_NS, this.cfg.oCfg.save_ns), r.flush(), CmnLib.isDbg && this.attach_debug(s), this.hFactoryCls = {}, Object.values(this.hPlg).map((u) => u.init({
      getInfo: this.#i,
      addTag: (h, l) => {
        if (e[h]) throw `すでに定義済みのタグ[${h}]です`;
        e[h] = l;
      },
      addLayCls: (h, l) => {
        if (this.hFactoryCls[h]) throw `すでに定義済みのレイヤcls【${h}】です`;
        this.hFactoryCls[h] = l;
      },
      searchPath: (h, l = SEARCH_PATH_ARG_EXT.DEFAULT) => this.cfg.searchPath(h, l),
      getVal: r.getVal,
      resume: () => s.resume(),
      render: (h, l, c = !1) => t.renderer.render(h, { renderTexture: l, clear: c }),
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
  #s = 0;
  #a = 1;
  #o = 0;
  #u = 0;
  #h = 0;
  #n = 0;
  get cvsWidth() {
    return this.#r;
  }
  get cvsHeight() {
    return this.#s;
  }
  get cvsScale() {
    return this.#a;
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
    return this.#n;
  }
  isFullScr = !1;
  cvsResize() {
    let e = globalThis.innerWidth, t = globalThis.innerHeight;
    const r = this.main.cvs, s = r.parentElement !== document.body;
    if (s) {
      const l = globalThis.getComputedStyle(r);
      e = parseFloat(l.width), t = parseFloat(l.height);
    }
    if (CmnLib.isMobile) {
      const c = (screen.orientation?.angle ?? 0) % 180 === 0;
      (c && e > t || !c && e < t) && ([e, t] = [t, e]);
    }
    const o = r.getBoundingClientRect();
    if (argChk_Boolean(CmnLib.hDip, "expanding", !0) || s || CmnLib.stageW > e || CmnLib.stageH > t)
      if (CmnLib.stageW / CmnLib.stageH <= e / t ? (this.#s = t, this.#r = CmnLib.stageW / CmnLib.stageH * t) : (this.#r = e, this.#s = CmnLib.stageH / CmnLib.stageW * e), this.#a = this.#r / CmnLib.stageW, s)
        this.#h = 0, this.#n = 0;
      else {
        const l = 1 - this.#a;
        CmnLib.isMobile ? (this.#h = (e - this.#r) / 2 * l, this.#n = (t - this.#s) / 2 * l) : (this.#h = o.left * l, this.#n = o.top * l);
      }
    else
      this.#r = CmnLib.stageW, this.#s = CmnLib.stageH, this.#a = 1, this.#h = 0, this.#n = 0;
    const u = r.parentElement.style;
    s || (u.position = "relative", u.width = `${this.#r}px`, u.height = `${this.#s}px`);
    const h = r.style;
    h.width = u.width, h.height = u.height, s ? (this.#o = o.left, this.#u = o.top) : (this.#o = 0, this.#u = 0), this.isFullScr && (this.#o += (e - this.#r) / 2, this.#u += (t - this.#s) / 2);
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
}`, document.getElementsByTagName("head")[0].appendChild(t), this.addHook((r, s) => this.#c[r]?.(s)), this.#l = lookup(`http://localhost:${this.extPort}`), this.#l.on("data", (r, s) => {
      this.callHook(r, s);
    }).on("disconnect", () => e.setLoop(!0)), this.callHook = (r, s) => {
      for (const o of this.#_) o(r, s);
    };
  }
  extPort = 3776;
  end() {
    this.#l?.disconnect(), this.#l = void 0;
  }
  #l = void 0;
  #c = {
    auth: (e) => {
      if (e.t !== this.cfg.oCfg.debuger_token) {
        this.end();
        return;
      }
      this.toast("接続");
    },
    continue: () => this.toast("再生"),
    disconnect: () => this.toast("切断"),
    restart: async (e) => {
      this.send2Dbg(e?.ri ?? "", {}), this.end(), await this.run();
    },
    pause: () => this.toast("一時停止"),
    stopOnEntry: () => this.toast("一時停止"),
    stopOnDataBreakpoint: () => this.toast("注意"),
    stopOnBreakpoint: () => this.toast("注意"),
    stopOnStep: () => this.toast("一歩進む"),
    stopOnStepIn: () => this.toast("ステップイン"),
    stopOnStepOut: () => this.toast("ステップアウト"),
    stopOnBackstep: () => this.toast("一歩戻る"),
    _addPath: (e) => this.cfg.addPath(e.fn, e.o)
  };
  toast(e) {
    const t = document.body;
    for (const u of [
      ...Array.from(t.getElementsByClassName("sn_BounceIn")),
      ...Array.from(t.getElementsByClassName("sn_HopIn"))
    ]) u.remove();
    const r = document.createElement("img"), s = SysBase.#y[e];
    if (!s) throw new Error(`toast 名ミス=${e}`);
    r.src = `data:image/svg+xml;base64,${s.dat}`;
    const o = Math.min(CmnLib.stageW, CmnLib.stageH) / 4 * this.#a;
    r.width = r.height = o, r.style.cssText = `position: absolute;
left: ${(CmnLib.stageW - o) / 2 * this.#a + o * (s.dx ?? 0)}px;
top: ${(CmnLib.stageH - o) / 2 * this.#a + o * (s.dy ?? 0)}px;`, r.classList.add("sn_toast", s.ease ?? "sn_BounceInOut"), s.ease || r.addEventListener("animationend", () => t.removeChild(r), { once: !0, passive: !0 }), t.insertBefore(r, this.main.cvs);
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
  setFire(e) {
    this.fire = e;
  }
  #_ = [];
  addHook(e) {
    this.#_.push(e);
  }
  callHook = (e, t) => {
  };
  send2Dbg = (e, t) => {
    this.#l?.emit("data", e, t);
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
    return this.#d = t, this.titleSub(this.#d + this.#p), !1;
  };
  #d = "";
  titleSub(e) {
  }
  #g = (e) => {
    if (!e.key)
      return this.tglFlscr_sub(), !1;
    const t = e.key.toLowerCase();
    return this.elc.add(document, "keydown", (r) => {
      SysBase.modKey(r) + r.key.toLowerCase() === t && (r.stopPropagation(), this.tglFlscr_sub());
    }, { passive: !0 }), !1;
  };
  static modKey(e) {
    return (e.altKey ? e.key === "Alt" ? "" : "alt+" : "") + (e.ctrlKey ? e.key === "Control" ? "" : "ctrl+" : "") + (e.metaKey ? e.key === "Meta" ? "" : "meta+" : "") + (e.shiftKey ? e.key === "Shift" ? "" : "shift+" : "");
  }
  tglFlscr_sub() {
  }
  update_check = () => !1;
  window = () => !1;
  #p = "";
  setTitleInfo(e) {
    this.#p = e, this.titleSub(this.#d + this.#p);
  }
  #m = () => Promise.resolve({ ext_num: 0, ab: new ArrayBuffer(0) });
  dec = (e, t) => Promise.resolve(t);
  async decAB(e) {
    const { ext_num: t, ab: r } = await this.#m(e), s = this.#b[t];
    return s?.fnc ? await s.fnc(r) : r;
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
    20: { ext: "mp4", fnc: (e) => this.#v(e, "video/mp4") },
    21: { ext: "webm", fnc: (e) => this.#v(e, "video/webm") },
    22: { ext: "ogv", fnc: (e) => this.#v(e, "video/ogv") }
  };
  #f = (e, t) => new Promise((r, s) => {
    const o = new Blob([e], { type: t }), u = new Image();
    u.onload = () => r(u), u.onerror = (h) => s(h), u.src = URL.createObjectURL(o);
  });
  #v = (e, t) => new Promise((r, s) => {
    const o = new Blob([e], { type: t }), u = document.createElement("video");
    this.elc.add(u, "error", () => s(u?.error?.message ?? "")), this.elc.add(u, "canplay", () => r(u)), u.src = URL.createObjectURL(o);
  });
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
  capturePage(e, t, r, s) {
  }
  async savePic(e, t) {
  }
  async ensureFileSync(e) {
  }
  async appendFile(e, t) {
  }
  async outputFile(e, t) {
  }
}
class DebugMng {
  constructor(e, t, r) {
    this.sys = e, DebugMng.#e = r, DebugMng.#t = t, DebugMng.#i = t.title, DebugMng.myTrace = DebugMng.#u, t.log = (s) => this.#a(s), t.trace = (s) => this.#o(s), DebugMng.#r = document.createElement("span"), DebugMng.#r.hidden = !0, DebugMng.#r.textContent = "", DebugMng.#r.style.cssText = `	z-index: ${Number.MAX_SAFE_INTEGER};
			position: absolute; left: 0; top: 0;
			color: black;
			background-color: rgba(255, 255, 255, 0.7);`, document.body.appendChild(DebugMng.#r);
  }
  static #e;
  static #t;
  static #i;
  static #r;
  destroy() {
    DebugMng.#i = () => !1, document.body.removeChild(DebugMng.#r), DebugMng.myTrace = DebugMng.trace_beforeNew;
  }
  // ログ出力
  #s = !0;
  #a(e) {
    let t = "";
    return this.#s && (this.#s = !1, t = `== ${platform.description} ==
`), this.sys.appendFile(
      this.sys.path_downloads + "log.txt",
      `${t}--- ${getDateStr("-", "_", "")} [fn:${DebugMng.#e.scriptFn} line:${DebugMng.#e.lineNum}] prj:${this.sys.arg.cur}
${e.text || `(text is ${e.text})`}
`
    ), !1;
  }
  #o(e) {
    return DebugMng.myTrace(e.text || `(text is ${e.text})`, "I"), !1;
  }
  // private禁止、galleryでエラーになる
  static trace_beforeNew = (e, t = "E") => {
    let r = `{${t}} ` + e, s = "";
    switch (t) {
      case "D":
        s = `color:#${CmnLib.isDarkMode ? "49F" : "05A"};`;
        break;
      case "W":
        s = "color:#FF8800;";
        break;
      case "F":
        s = "color:#BB0000;";
        break;
      case "ET":
        throw r;
      case "E":
        console.error("%c" + r, "color:#FF3300;");
        return;
      default:
        s = "color:black;", r = " " + r;
    }
    console.info("%c" + r, s);
  };
  static myTrace = DebugMng.trace_beforeNew;
  static strPos = () => DebugMng.#e.lineNum > 0 ? `(fn:${DebugMng.#e.scriptFn} line:${DebugMng.#e.lineNum}) ` : "";
  static #u = (e, t = "E") => {
    let r = `{${t}} ` + DebugMng.strPos() + e;
    DebugMng.#h(r, t);
    let s = "";
    switch (t) {
      case "D":
        s = `color:#${CmnLib.isDarkMode ? "49F" : "05A"};`;
        break;
      case "W":
        s = "color:#F80;";
        break;
      case "F":
        s = "color:#B00;";
        break;
      case "ET":
      case "E":
        if (DebugMng.#i({ text: e }), this.#t.dump_lay({}), this.#t.dump_val({}), DebugMng.#e.dumpErrForeLine(), this.#t.dump_stack({}), t === "ET") throw r;
        console.error("%c" + r, "color:#F30;");
        return;
      default:
        s = "", r = " " + r;
    }
    console.info("%c" + r, s);
  };
  static #h = (e, t) => {
    let r = "";
    switch (t) {
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
    DebugMng.#r.innerHTML += `<span style='${r}'>${e}</span><br/>`, DebugMng.#r.hidden = !1;
  };
}
class Config extends ConfigBase {
  constructor(e) {
    super(e), this.sys = e;
  }
  static async generate(e) {
    const t = new Config(e), r = e.arg.cur + "prj.json", s = await e.fetch(r);
    if (!s.ok) throw Error(s.statusText);
    const o = await e.dec(r, await s.text());
    return await t.load(JSON.parse(o)), t;
  }
  async load(e) {
    await super.load(e), CmnLib.stageW = e.window.width, CmnLib.stageH = e.window.height, CmnLib.debugLog = e.debug.debugLog;
  }
  searchPath(e, t = SEARCH_PATH_ARG_EXT.DEFAULT) {
    return e.startsWith("downloads:/") ? this.sys.path_downloads + e.slice(11) : e.startsWith("userdata:/") ? this.sys.path_userdata + "storage/" + e.slice(10) : super.searchPath(e, t);
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
  #e = /;[^\n]*|(?<key>[^\s="'#|;]+)(?:\s|;[^\n]*\n)*=(?:\s|;[^\n]*\n)*(?:(?<val>[^\s"'#|;]+)|(["'#])(?<val2>.*?)\3)(?:\|(?:(?<def>[^\s"'#;]+)|(["'#])(?<def2>.*?)\6))?|(?<literal>[^\s;]+)/g;
  // 【属性 = 値 | 省略値】の分析
  parse(e) {
    this.#i = {}, this.#r = !1;
    for (const { groups: t } of e.matchAll(this.#e)) {
      const { key: r, val: s, val2: o, def: u, def2: h, literal: l } = t;
      r ? this.#i[r] = {
        val: s ?? o ?? "",
        def: u ?? h
      } : l && (l === "*" ? this.#r = !0 : this.#i[l] = { val: "1" });
    }
  }
  // 属性と値の位置をまとめて返す
  parseinDetail(e, t, r, s) {
    const o = {}, u = e.slice(1 + t, -1);
    for (const { groups: h, index: l, 0: c } of u.matchAll(this.#e)) {
      if (l === void 0) continue;
      const { key: d, val: _, val2: v = "", literal: y } = h;
      if (y) {
        if (y.endsWith("=")) {
          const S = y.length - 1, { ch: P } = this.#t(t, r, s, u, l + S);
          o[y.slice(0, -1)] = {
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
      if (!d) continue;
      const { ln: b, ch: g } = this.#t(t, r, s, u, l), { ln: m, ch: E } = this.#t(t, r, s, u, l + c.lastIndexOf(_ ?? v ?? "") - (_ ? 0 : 1));
      o[d] = { k_ln: b, k_ch: g, v_ln: m, v_ch: E, v_len: _ ? _.length : v.length + 2 };
    }
    return o;
  }
  #t(e, t, r, s, o) {
    const h = s.slice(0, o).split(`
`), l = h.length;
    return {
      ln: t + l - 1,
      ch: l < 2 ? r + 1 + e + o : h.at(-1).length
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
function tagToken2Name_Args(a) {
  const t = REG_TAG.exec(a.slice(1, -1))?.groups;
  if (!t) throw `タグ記述【${a}】異常です(タグ解析)`;
  const r = t.name;
  return [r, a.slice(1 + r.length, -1)];
}
function tagToken2Name(a) {
  const t = REG_TAG.exec(a.slice(1))?.groups;
  if (!t) throw `タグ記述【${a}】異常です(タグ解析)`;
  return t.name;
}
function splitAmpersand(a) {
  const e = a.replaceAll("==", "＝").replaceAll("!=", "≠").split("="), t = e.length;
  if (t < 2 || t > 3) throw "「&計算」書式では「=」指定が一つか二つ必要です";
  const [r, s, o] = e;
  if (s.startsWith("&")) throw "「&計算」書式では「&」指定が不要です";
  return {
    name: r.replaceAll("＝", "==").replaceAll("≠", "!="),
    text: s.replaceAll("＝", "==").replaceAll("≠", "!="),
    cast: t === 3 ? o.trim() : void 0
  };
}
class Grammar {
  constructor(e) {
    this.cfg = e, this.setEscape("");
  }
  #e;
  setEscape(e) {
    if (this.#n && e in this.#n) throw "[エスケープ文字] char【" + e + "】が登録済みの括弧マクロまたは一文字マクロです";
    this.#e = new RegExp(
      (e ? `\\${e}\\S|` : "") + // エスケープシーケンス
      `\\n+|\\t+|\\[let_ml\\s+[^\\]]+\\].+?(?=\\[endlet_ml[\\]\\s])|\\[(?:[^"'#;\\]]+|(["'#]).*?\\1|;[^\\n]*)*?]|;[^\\n]*|&[^&\\n]+&|&&?(?:[^"'#;\\n&]+|(["'#]).*?\\2)+|^\\*[^\\s\\[&;\\\\]+|[^\\n\\t\\[;${e ? `\\${e}` : ""}]+`,
      // 本文
      "gs"
    ), this.#t = new RegExp(`[\\w\\s;[\\]*=&｜《》${e ? `\\${e}` : ""}]`), this.#l = new RegExp(`[\\n\\t;\\[*&${e ? `\\${e}` : ""}]`);
  }
  // 括弧マクロの定義
  bracket2macro(e, t, r, s) {
    const { name: o, text: u } = e;
    if (!o) throw "[bracket2macro] nameは必須です";
    if (!u) throw "[bracket2macro] textは必須です";
    const h = u.at(0);
    if (!h) throw "[bracket2macro] textは必須です";
    if (u.length !== 2) throw "[bracket2macro] textは括弧の前後を示す二文字を指定してください";
    if (!(o in t)) throw `[bracket2macro] 未定義のタグ又はマクロ[${o}]です`;
    this.#n ??= {};
    const l = u.charAt(1);
    if (h in this.#n) throw "[bracket2macro] text【" + h + "】が登録済みの括弧マクロまたは一文字マクロです";
    if (l in this.#n) throw "[bracket2macro] text【" + l + "】が登録済みの括弧マクロまたは一文字マクロです";
    if (this.#t.test(h)) throw "[bracket2macro] text【" + h + "】は括弧マクロに使用できない文字です";
    if (this.#t.test(l)) throw "[bracket2macro] text【" + l + "】は括弧マクロに使用できない文字です";
    this.#n[l] = "0", this.#n[h] = `[${o} text=`, this.addC2M(`\\${h}[^\\${l}]*\\${l}`, `\\${h}\\${l}`), this.#c(r, s);
  }
  // 一文字マクロの定義
  char2macro(e, t, r, s) {
    const { char: o, name: u } = e;
    if (!o) throw "[char2macro] charは必須です";
    if (this.#n ??= {}, o in this.#n) throw "[char2macro] char【" + o + "】が登録済みの括弧マクロまたは一文字マクロです";
    if (this.#t.test(o)) throw "[char2macro] char【" + o + "】は一文字マクロに使用できない文字です";
    if (!u) throw "[char2macro] nameは必須です";
    if (!(u in t)) throw `[char2macro] 未定義のタグ又はマクロ[${u}]です`;
    this.#n[o] = `[${u}]`, this.addC2M(`\\${o}`, `\\${o}`), this.#c(r, s);
  }
  #t;
  #i = new RegExp("");
  #r = "";
  #s = "";
  addC2M(e, t) {
    this.#r += `${e}|`, this.#s += `${t}`, this.#i = new RegExp(
      `(${this.#r}[^${this.#s}]+)`,
      "g"
    );
  }
  resolveScript(e) {
    const t = e.replaceAll(/\r\n?/g, `
`).match(this.#e)?.flatMap((s) => {
      if (!this.testTagLetml(s)) return s;
      const o = /^([^\]]+?])(.*)$/s.exec(s);
      if (!o) return s;
      const [, u, h] = o;
      return [u, h];
    }) ?? [], r = { aToken: t, len: t.length, aLNum: [] };
    return this.#c(r), this.#u(r), r;
  }
  #a = /^\[(call|loadplugin)\s/;
  #o = /\bfn\s*=\s*[^\s\]]+/;
  #u(e) {
    for (let t = e.len - 1; t >= 0; --t) {
      const r = e.aToken[t];
      if (!this.#a.test(r)) continue;
      const [s, o] = tagToken2Name_Args(r);
      this.#h.parse(o);
      const u = this.#h.hPrm.fn;
      if (!u) continue;
      const { val: h } = u;
      if (!h || !h.endsWith("*")) continue;
      e.aToken.splice(t, 1, "	", "; " + r), e.aLNum.splice(t, 1, NaN, NaN);
      const l = s === "loadplugin" ? SEARCH_PATH_ARG_EXT.CSS : SEARCH_PATH_ARG_EXT.SN, c = this.cfg.matchPath("^" + h.slice(0, -1) + ".*", l);
      for (const d of c) {
        const _ = r.replace(
          this.#o,
          "fn=" + decodeURIComponent(getFn(d[l]))
        );
        e.aToken.splice(t, 0, _), e.aLNum.splice(t, 0, NaN);
      }
    }
    e.len = e.aToken.length;
  }
  #h = new AnalyzeTagArg();
  testTagLetml(e) {
    return /^\[let_ml\s/.test(e);
  }
  testTagEndLetml(e) {
    return /^\[endlet_ml\s*]/.test(e);
  }
  analyzToken(e) {
    return this.#e.lastIndex = 0, this.#e.exec(e);
  }
  #n;
  #l;
  #c(e, t = 0) {
    if (this.#n) {
      for (let r = e.len - 1; r >= t; --r) {
        const s = e.aToken[r];
        if (this.testNoTxt(s.at(0) ?? `
`)) continue;
        const o = e.aLNum[r], u = s.match(this.#i);
        if (!u) continue;
        let h = 1;
        for (let l = u.length - 1; l >= 0; --l) {
          let c = u[l];
          const d = this.#n[c.at(0) ?? " "];
          d && (c = d + (d.endsWith("]") ? "" : `'${c.slice(1, -1)}']`)), e.aToken.splice(r, h, c), e.aLNum.splice(r, h, o), h = 0;
        }
      }
      e.len = e.aToken.length;
    }
  }
  testNoTxt(e) {
    return this.#l.test(e);
  }
  //4tst
}
const SN_ID = "skynovel";
class Main {
  constructor(e) {
    this.sys = e, skipHello(), Config.generate(e).then((t) => this.#s(t)).catch((t) => console.error("load err fn:prj.json e:%o", t));
  }
  cvs;
  #e = /* @__PURE__ */ Object.create(null);
  // タグ処理辞書
  #t;
  #i;
  #r = [];
  async #s(e) {
    const t = {
      width: e.oCfg.window.width,
      height: e.oCfg.window.height,
      backgroundColor: parseColor(String(e.oCfg.init.bg_color)),
      // このString()は後方互換性のため必須
      //	resolution		: sys.resolution,
      resolution: globalThis.devicePixelRatio ?? 1
      // 理想
    }, r = document.getElementById(SN_ID);
    if (r) {
      const u = r.cloneNode(!0);
      u.id = SN_ID, t.view = r;
      const h = r.parentNode;
      this.#r.unshift(() => h.appendChild(u));
    } else {
      const u = document.createElement("canvas");
      u.id = SN_ID, t.view = u, document.body.appendChild(u), this.#r.unshift(() => document.body.removeChild(u));
    }
    const s = new Application(t);
    this.#r.unshift(() => {
      clearTextureCache(), this.sys.destroy(), s.destroy(!1);
    }), this.cvs = s.view, this.cvs.id = SN_ID + "_act", r || document.body.appendChild(this.cvs);
    const o = document.createElement("canvas")?.getContext("2d");
    if (!o) throw "#init cc err";
    CmnLib.cc4ColorName = o, await Promise.all([
      import("./Variable.js"),
      import("./PropParser.js"),
      import("./SoundMng.js"),
      import("./ScriptIterator.js"),
      import("./LayerMng.js").then((u) => u.L),
      import("./EventMng.js")
    ]).then(async ([
      { Variable: u },
      { PropParser: h },
      { SoundMng: l },
      { ScriptIterator: c },
      { LayerMng: d },
      { EventMng: _ }
    ]) => {
      const v = new u(e, this.#e), y = new h(v, e.oCfg.init.escape ?? "\\");
      this.#o = (E, S, P, L) => v.setVal_Nochk(E, S, P, L), this.#n = (E) => y.getValAmpersand(E), this.#l = (E) => y.parse(E), await Promise.allSettled(this.sys.init(this.#e, s, v, this)), this.#e.title({ text: e.oCfg.book.title || "SKYNovel" });
      const b = new l(e, this.#e, v, this, this.sys);
      this.#r.unshift(() => b.destroy()), this.#t = new c(e, this.#e, this, v, y, b, this.sys), this.#r.unshift(() => this.#t.destroy());
      const g = new DebugMng(this.sys, this.#e, this.#t);
      this.#r.unshift(() => g.destroy()), this.errScript = (E, S = !0) => {
        if (this.stop(), DebugMng.myTrace(E), CmnLib.debugLog && console.log("🍜 SKYNovel err!"), S) throw E;
      }, this.#i = new d(e, this.#e, s, v, this, this.#t, this.sys, b, y), this.#r.unshift(() => this.#i.destroy());
      const m = new _(e, this.#e, s, this, this.#i, v, b, this.#t, this.sys);
      this.#r.unshift(() => m.destroy()), this.#r.unshift(() => {
        this.stop(), this.#u = !1, this.#e = {};
      }), this.#e.jump({ fn: "main" }), this.stop();
    });
  }
  destroy() {
    if (!this.#a) {
      this.#a = !0, this.cvs.parentElement?.removeChild(this.cvs);
      for (const e of this.#r) e();
      this.#r = [];
    }
  }
  #a = !1;
  isDestroyed = () => this.#a;
  errScript = (e, t = !0) => {
  };
  resumeByJumpOrCall(e) {
    if (e.url) {
      this.#e.navigate_to(e), this.#t.jumpJustBefore();
      return;
    }
    this.#o("tmp", "sn.eventArg", e.arg ?? ""), this.#o("tmp", "sn.eventLabel", e.label ?? ""), argChk_Boolean(e, "call", !1) ? (this.#t.subIdxToken(), this.#e.call(e)) : (this.#e.clear_event({}), this.#e.jump(e)), this.resume();
  }
  #o = (e, t, r, s = !1) => {
  };
  resume() {
    this.#a || (this.#i.clearBreak(), this.#t.noticeBreak(!1), queueMicrotask(() => this.#h()));
  }
  stop = () => {
    this.#t.noticeBreak(!0);
  };
  setLoop(e, t = "") {
    (this.#u = e) ? this.resume() : this.stop(), this.sys.setTitleInfo(t ? ` -- ${t}中` : "");
  }
  #u = !0;
  //MARK: メイン処理（シナリオ解析）
  #h() {
    for (; this.#u; ) {
      let e = this.#t.nextToken();
      if (!e) return;
      const t = e.charCodeAt(0);
      if (t !== 9) {
        if (t === 10) {
          this.#t.addLineNum(e.length);
          continue;
        }
        if (t === 91) {
          if (this.#t.isBreak(e)) return;
          try {
            const r = (e.match(/\n/g) ?? []).length;
            if (r > 0 && this.#t.addLineNum(r), this.#t.タグ解析(e)) {
              this.stop();
              return;
            }
            continue;
          } catch (r) {
            r instanceof Error ? this.errScript(`[${tagToken2Name(e)}]タグ解析中例外 mes=${r.message}(${r.name})`, !1) : this.errScript(String(r), !1);
            return;
          }
        }
        if (t === 38)
          try {
            if (!e.endsWith("&")) {
              if (this.#t.isBreak(e)) return;
              const r = splitAmpersand(e.slice(1));
              r.name = this.#n(r.name), r.text = String(this.#l(r.text)), this.#e.let(r);
              continue;
            }
            if (e.charAt(1) === "&") throw new Error("「&表示&」書式では「&」指定が不要です");
            e = String(this.#l(e.slice(1, -1)));
          } catch (r) {
            this.errScript(
              r instanceof Error ? `& 変数操作・表示 mes=${r.message}(${r.name})` : String(r),
              !1
            );
            return;
          }
        else {
          if (t === 59) continue;
          if (t === 42 && e.length > 1) continue;
        }
        try {
          this.#i.setNormalChWait(), this.#i.currentTxtlayForeNeedErr.tagCh(e);
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
  #n = (e) => "";
  #l = (e) => {
  };
}
var util, hasRequiredUtil;
function requireUtil() {
  if (hasRequiredUtil) return util;
  hasRequiredUtil = 1;
  var a = s(), e = o(), t = u(), r = typeof window < "u" ? window : commonjsGlobal;
  util = {
    assign: a,
    create: e,
    trim: t,
    bind: h,
    slice: l,
    each: c,
    map: d,
    pluck: _,
    isList: v,
    isFunction: y,
    isObject: b,
    Global: r
  };
  function s() {
    return Object.assign ? Object.assign : function(m, E, S, P) {
      for (var L = 1; L < arguments.length; L++)
        c(Object(arguments[L]), function(T, I) {
          m[I] = T;
        });
      return m;
    };
  }
  function o() {
    if (Object.create)
      return function(m, E, S, P) {
        var L = l(arguments, 1);
        return a.apply(this, [Object.create(m)].concat(L));
      };
    {
      let g = function() {
      };
      return function(E, S, P, L) {
        var T = l(arguments, 1);
        return g.prototype = E, a.apply(this, [new g()].concat(T));
      };
    }
  }
  function u() {
    return String.prototype.trim ? function(m) {
      return String.prototype.trim.call(m);
    } : function(m) {
      return m.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
    };
  }
  function h(g, m) {
    return function() {
      return m.apply(g, Array.prototype.slice.call(arguments, 0));
    };
  }
  function l(g, m) {
    return Array.prototype.slice.call(g, m || 0);
  }
  function c(g, m) {
    _(g, function(E, S) {
      return m(E, S), !1;
    });
  }
  function d(g, m) {
    var E = v(g) ? [] : {};
    return _(g, function(S, P) {
      return E[P] = m(S, P), !1;
    }), E;
  }
  function _(g, m) {
    if (v(g)) {
      for (var E = 0; E < g.length; E++)
        if (m(g[E], E))
          return g[E];
    } else
      for (var S in g)
        if (g.hasOwnProperty(S) && m(g[S], S))
          return g[S];
  }
  function v(g) {
    return g != null && typeof g != "function" && typeof g.length == "number";
  }
  function y(g) {
    return g && {}.toString.call(g) === "[object Function]";
  }
  function b(g) {
    return g && {}.toString.call(g) === "[object Object]";
  }
  return util;
}
var storeEngine, hasRequiredStoreEngine;
function requireStoreEngine() {
  if (hasRequiredStoreEngine) return storeEngine;
  hasRequiredStoreEngine = 1;
  var a = requireUtil(), e = a.slice, t = a.pluck, r = a.each, s = a.bind, o = a.create, u = a.isList, h = a.isFunction, l = a.isObject;
  storeEngine = {
    createStore: _
  };
  var c = {
    version: "2.0.12",
    enabled: !1,
    // get returns the value of the given key. If that value
    // is undefined, it returns optionalDefaultValue instead.
    get: function(v, y) {
      var b = this.storage.read(this._namespacePrefix + v);
      return this._deserialize(b, y);
    },
    // set will store the given value at key and returns value.
    // Calling set with value === undefined is equivalent to calling remove.
    set: function(v, y) {
      return y === void 0 ? this.remove(v) : (this.storage.write(this._namespacePrefix + v, this._serialize(y)), y);
    },
    // remove deletes the key and value stored at the given key.
    remove: function(v) {
      this.storage.remove(this._namespacePrefix + v);
    },
    // each will call the given callback once for each key-value pair
    // in this store.
    each: function(v) {
      var y = this;
      this.storage.each(function(b, g) {
        v.call(y, y._deserialize(b), (g || "").replace(y._namespaceRegexp, ""));
      });
    },
    // clearAll will remove all the stored key-value pairs in this store.
    clearAll: function() {
      this.storage.clearAll();
    },
    // additional functionality that can't live in plugins
    // ---------------------------------------------------
    // hasNamespace returns true if this store instance has the given namespace.
    hasNamespace: function(v) {
      return this._namespacePrefix == "__storejs_" + v + "_";
    },
    // createStore creates a store.js instance with the first
    // functioning storage in the list of storage candidates,
    // and applies the the given mixins to the instance.
    createStore: function() {
      return _.apply(this, arguments);
    },
    addPlugin: function(v) {
      this._addPlugin(v);
    },
    namespace: function(v) {
      return _(this.storage, this.plugins, v);
    }
  };
  function d() {
    var v = typeof console > "u" ? null : console;
    if (v) {
      var y = v.warn ? v.warn : v.log;
      y.apply(v, arguments);
    }
  }
  function _(v, y, b) {
    b || (b = ""), v && !u(v) && (v = [v]), y && !u(y) && (y = [y]);
    var g = b ? "__storejs_" + b + "_" : "", m = b ? new RegExp("^" + g) : null, E = /^[a-zA-Z0-9_\-]*$/;
    if (!E.test(b))
      throw new Error("store.js namespaces can only have alphanumerics + underscores and dashes");
    var S = {
      _namespacePrefix: g,
      _namespaceRegexp: m,
      _testStorage: function(L) {
        try {
          var T = "__storejs__test__";
          L.write(T, T);
          var I = L.read(T) === T;
          return L.remove(T), I;
        } catch {
          return !1;
        }
      },
      _assignPluginFnProp: function(L, T) {
        var I = this[T];
        this[T] = function() {
          var M = e(arguments, 0), F = this;
          function k() {
            if (I)
              return r(arguments, function(X, ne) {
                M[ne] = X;
              }), I.apply(F, M);
          }
          var V = [k].concat(M);
          return L.apply(F, V);
        };
      },
      _serialize: function(L) {
        return JSON.stringify(L);
      },
      _deserialize: function(L, T) {
        if (!L)
          return T;
        var I = "";
        try {
          I = JSON.parse(L);
        } catch {
          I = L;
        }
        return I !== void 0 ? I : T;
      },
      _addStorage: function(L) {
        this.enabled || this._testStorage(L) && (this.storage = L, this.enabled = !0);
      },
      _addPlugin: function(L) {
        var T = this;
        if (u(L)) {
          r(L, function(M) {
            T._addPlugin(M);
          });
          return;
        }
        var I = t(this.plugins, function(M) {
          return L === M;
        });
        if (!I) {
          if (this.plugins.push(L), !h(L))
            throw new Error("Plugins must be function values that return objects");
          var w = L.call(this);
          if (!l(w))
            throw new Error("Plugins must return an object of function properties");
          r(w, function(M, F) {
            if (!h(M))
              throw new Error("Bad plugin property: " + F + " from plugin " + L.name + ". Plugins should only return functions.");
            T._assignPluginFnProp(M, F);
          });
        }
      },
      // Put deprecated properties in the private API, so as to not expose it to accidential
      // discovery through inspection of the store object.
      // Deprecated: addStorage
      addStorage: function(L) {
        d("store.addStorage(storage) is deprecated. Use createStore([storages])"), this._addStorage(L);
      }
    }, P = o(S, c, {
      plugins: []
    });
    return P.raw = {}, r(P, function(L, T) {
      h(L) && (P.raw[T] = s(P, L));
    }), r(v, function(L) {
      P._addStorage(L);
    }), r(y, function(L) {
      P._addPlugin(L);
    }), P;
  }
  return storeEngine;
}
var localStorage_1, hasRequiredLocalStorage;
function requireLocalStorage() {
  if (hasRequiredLocalStorage) return localStorage_1;
  hasRequiredLocalStorage = 1;
  var a = requireUtil(), e = a.Global;
  localStorage_1 = {
    name: "localStorage",
    read: r,
    write: s,
    each: o,
    remove: u,
    clearAll: h
  };
  function t() {
    return e.localStorage;
  }
  function r(l) {
    return t().getItem(l);
  }
  function s(l, c) {
    return t().setItem(l, c);
  }
  function o(l) {
    for (var c = t().length - 1; c >= 0; c--) {
      var d = t().key(c);
      l(r(d), d);
    }
  }
  function u(l) {
    return t().removeItem(l);
  }
  function h() {
    return t().clear();
  }
  return localStorage_1;
}
var oldFFGlobalStorage, hasRequiredOldFFGlobalStorage;
function requireOldFFGlobalStorage() {
  if (hasRequiredOldFFGlobalStorage) return oldFFGlobalStorage;
  hasRequiredOldFFGlobalStorage = 1;
  var a = requireUtil(), e = a.Global;
  oldFFGlobalStorage = {
    name: "oldFF-globalStorage",
    read: r,
    write: s,
    each: o,
    remove: u,
    clearAll: h
  };
  var t = e.globalStorage;
  function r(l) {
    return t[l];
  }
  function s(l, c) {
    t[l] = c;
  }
  function o(l) {
    for (var c = t.length - 1; c >= 0; c--) {
      var d = t.key(c);
      l(t[d], d);
    }
  }
  function u(l) {
    return t.removeItem(l);
  }
  function h() {
    o(function(l, c) {
      delete t[l];
    });
  }
  return oldFFGlobalStorage;
}
var oldIEUserDataStorage, hasRequiredOldIEUserDataStorage;
function requireOldIEUserDataStorage() {
  if (hasRequiredOldIEUserDataStorage) return oldIEUserDataStorage;
  hasRequiredOldIEUserDataStorage = 1;
  var a = requireUtil(), e = a.Global;
  oldIEUserDataStorage = {
    name: "oldIE-userDataStorage",
    write: u,
    read: h,
    each: l,
    remove: c,
    clearAll: d
  };
  var t = "storejs", r = e.document, s = y(), o = (e.navigator ? e.navigator.userAgent : "").match(/ (MSIE 8|MSIE 9|MSIE 10)\./);
  function u(b, g) {
    if (!o) {
      var m = v(b);
      s(function(E) {
        E.setAttribute(m, g), E.save(t);
      });
    }
  }
  function h(b) {
    if (!o) {
      var g = v(b), m = null;
      return s(function(E) {
        m = E.getAttribute(g);
      }), m;
    }
  }
  function l(b) {
    s(function(g) {
      for (var m = g.XMLDocument.documentElement.attributes, E = m.length - 1; E >= 0; E--) {
        var S = m[E];
        b(g.getAttribute(S.name), S.name);
      }
    });
  }
  function c(b) {
    var g = v(b);
    s(function(m) {
      m.removeAttribute(g), m.save(t);
    });
  }
  function d() {
    s(function(b) {
      var g = b.XMLDocument.documentElement.attributes;
      b.load(t);
      for (var m = g.length - 1; m >= 0; m--)
        b.removeAttribute(g[m].name);
      b.save(t);
    });
  }
  var _ = new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g");
  function v(b) {
    return b.replace(/^\d/, "___$&").replace(_, "___");
  }
  function y() {
    if (!r || !r.documentElement || !r.documentElement.addBehavior)
      return null;
    var b = "script", g, m, E;
    try {
      m = new ActiveXObject("htmlfile"), m.open(), m.write("<" + b + ">document.w=window</" + b + '><iframe src="/favicon.ico"></iframe>'), m.close(), g = m.w.frames[0].document, E = g.createElement("div");
    } catch {
      E = r.createElement("div"), g = r.body;
    }
    return function(S) {
      var P = [].slice.call(arguments, 0);
      P.unshift(E), g.appendChild(E), E.addBehavior("#default#userData"), E.load(t), S.apply(this, P), g.removeChild(E);
    };
  }
  return oldIEUserDataStorage;
}
var cookieStorage, hasRequiredCookieStorage;
function requireCookieStorage() {
  if (hasRequiredCookieStorage) return cookieStorage;
  hasRequiredCookieStorage = 1;
  var a = requireUtil(), e = a.Global, t = a.trim;
  cookieStorage = {
    name: "cookieStorage",
    read: s,
    write: u,
    each: o,
    remove: h,
    clearAll: l
  };
  var r = e.document;
  function s(d) {
    if (!d || !c(d))
      return null;
    var _ = "(?:^|.*;\\s*)" + escape(d).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*";
    return unescape(r.cookie.replace(new RegExp(_), "$1"));
  }
  function o(d) {
    for (var _ = r.cookie.split(/; ?/g), v = _.length - 1; v >= 0; v--)
      if (t(_[v])) {
        var y = _[v].split("="), b = unescape(y[0]), g = unescape(y[1]);
        d(g, b);
      }
  }
  function u(d, _) {
    d && (r.cookie = escape(d) + "=" + escape(_) + "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/");
  }
  function h(d) {
    !d || !c(d) || (r.cookie = escape(d) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/");
  }
  function l() {
    o(function(d, _) {
      h(_);
    });
  }
  function c(d) {
    return new RegExp("(?:^|;\\s*)" + escape(d).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=").test(r.cookie);
  }
  return cookieStorage;
}
var sessionStorage_1, hasRequiredSessionStorage;
function requireSessionStorage() {
  if (hasRequiredSessionStorage) return sessionStorage_1;
  hasRequiredSessionStorage = 1;
  var a = requireUtil(), e = a.Global;
  sessionStorage_1 = {
    name: "sessionStorage",
    read: r,
    write: s,
    each: o,
    remove: u,
    clearAll: h
  };
  function t() {
    return e.sessionStorage;
  }
  function r(l) {
    return t().getItem(l);
  }
  function s(l, c) {
    return t().setItem(l, c);
  }
  function o(l) {
    for (var c = t().length - 1; c >= 0; c--) {
      var d = t().key(c);
      l(r(d), d);
    }
  }
  function u(l) {
    return t().removeItem(l);
  }
  function h() {
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
    remove: s,
    clearAll: o
  };
  var a = {};
  function e(u) {
    return a[u];
  }
  function t(u, h) {
    a[u] = h;
  }
  function r(u) {
    for (var h in a)
      a.hasOwnProperty(h) && u(a[h], h);
  }
  function s(u) {
    delete a[u];
  }
  function o(u) {
    a = {};
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
    function f(a) {
      return a < 10 ? "0" + a : a;
    }
    function this_value() {
      return this.valueOf();
    }
    typeof Date.prototype.toJSON != "function" && (Date.prototype.toJSON = function() {
      return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null;
    }, Boolean.prototype.toJSON = this_value, Number.prototype.toJSON = this_value, String.prototype.toJSON = this_value);
    var gap, indent, meta, rep;
    function quote(a) {
      return rx_escapable.lastIndex = 0, rx_escapable.test(a) ? '"' + a.replace(rx_escapable, function(e) {
        var t = meta[e];
        return typeof t == "string" ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4);
      }) + '"' : '"' + a + '"';
    }
    function str(a, e) {
      var t, r, s, o, u = gap, h, l = e[a];
      switch (l && typeof l == "object" && typeof l.toJSON == "function" && (l = l.toJSON(a)), typeof rep == "function" && (l = rep.call(e, a, l)), typeof l) {
        case "string":
          return quote(l);
        case "number":
          return isFinite(l) ? String(l) : "null";
        case "boolean":
        case "null":
          return String(l);
        // If the type is "object", we might be dealing with an object or an array or
        // null.
        case "object":
          if (!l)
            return "null";
          if (gap += indent, h = [], Object.prototype.toString.apply(l) === "[object Array]") {
            for (o = l.length, t = 0; t < o; t += 1)
              h[t] = str(t, l) || "null";
            return s = h.length === 0 ? "[]" : gap ? `[
` + gap + h.join(`,
` + gap) + `
` + u + "]" : "[" + h.join(",") + "]", gap = u, s;
          }
          if (rep && typeof rep == "object")
            for (o = rep.length, t = 0; t < o; t += 1)
              typeof rep[t] == "string" && (r = rep[t], s = str(r, l), s && h.push(quote(r) + (gap ? ": " : ":") + s));
          else
            for (r in l)
              Object.prototype.hasOwnProperty.call(l, r) && (s = str(r, l), s && h.push(quote(r) + (gap ? ": " : ":") + s));
          return s = h.length === 0 ? "{}" : gap ? `{
` + gap + h.join(`,
` + gap) + `
` + u + "}" : "{" + h.join(",") + "}", gap = u, s;
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
    }, JSON.stringify = function(a, e, t) {
      var r;
      if (gap = "", indent = "", typeof t == "number")
        for (r = 0; r < t; r += 1)
          indent += " ";
      else typeof t == "string" && (indent = t);
      if (rep = e, e && typeof e != "function" && (typeof e != "object" || typeof e.length != "number"))
        throw new Error("JSON.stringify");
      return str("", { "": a });
    }), typeof JSON.parse != "function" && (JSON.parse = function(text, reviver) {
      var j;
      function walk(a, e) {
        var t, r, s = a[e];
        if (s && typeof s == "object")
          for (t in s)
            Object.prototype.hasOwnProperty.call(s, t) && (r = walk(s, t), r !== void 0 ? s[t] = r : delete s[t]);
        return reviver.call(a, e, s);
      }
      if (text = String(text), rx_dangerous.lastIndex = 0, rx_dangerous.test(text) && (text = text.replace(rx_dangerous, function(a) {
        return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
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
  hasRequiredJson2 = 1, json2 = a;
  function a() {
    return requireJson2$1(), {};
  }
  return json2;
}
var store_legacy, hasRequiredStore_legacy;
function requireStore_legacy() {
  if (hasRequiredStore_legacy) return store_legacy;
  hasRequiredStore_legacy = 1;
  var a = requireStoreEngine(), e = requireAll(), t = [requireJson2()];
  return store_legacy = a.createStore(e, t), store_legacy;
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
}, threshold = 170, emitEvent = (a, e) => {
  globalThis.dispatchEvent(new globalThis.CustomEvent("devtoolschange", {
    detail: {
      isOpen: a,
      orientation: e
    }
  }));
}, main = ({ emitEvents: a = !0 } = {}) => {
  const e = globalThis.outerWidth - globalThis.innerWidth > threshold, t = globalThis.outerHeight - globalThis.innerHeight > threshold, r = e ? "vertical" : "horizontal";
  !(t && e) && (globalThis.Firebug && globalThis.Firebug.chrome && globalThis.Firebug.chrome.isInitialized || e || t) ? ((!devtools.isOpen || devtools.orientation !== r) && a && emitEvent(!0, r), devtools.isOpen = !0, devtools.orientation = r) : (devtools.isOpen && a && emitEvent(!1, void 0), devtools.isOpen = !1, devtools.orientation = void 0);
};
main({ emitEvents: !1 });
setInterval(main, 500);
class SysWeb extends SysBase {
  #e;
  constructor(...[e = {}, t = { cur: "prj/", crypto: !1, dip: "" }]) {
    super(e, t);
    const r = t.cur.split("/");
    this.#e = r.length > 2 ? r.slice(0, -2).join("/") + "/" : "", queueMicrotask(async () => this.loaded(e, t));
  }
  async loaded(...[e, t]) {
    await super.loaded(e, t), document.querySelectorAll("[data-prj]").forEach((u) => {
      const h = u.attributes.getNamedItem("data-prj");
      h && u.addEventListener("click", async () => this.runSN(h.value), { passive: !0 });
    }), document.querySelectorAll("[data-reload]").forEach(
      (u) => u.addEventListener("click", async () => this.run(), { passive: !0 })
      //this.elc.add(v, 'click', ()=> this.run(), {passive: true})
      // ギャラリーであっても、ここには一度しか来ないので
    ), t.dip && (CmnLib.hDip = JSON.parse(t.dip));
    const r = new URLSearchParams(location.search), s = r.get("dip");
    if (s && (CmnLib.hDip = { ...CmnLib.hDip, ...JSON.parse(s.replaceAll("%2C", ",")) }), !argChk_Boolean(CmnLib.hDip, "oninit_run", !0)) return;
    argChk_Boolean(CmnLib.hDip, "dbg", !1) && (CmnLib.isDbg = !0, this.fetch = (u, h) => fetch(u, { ...h, mode: "cors" })), this.extPort = argChk_Num(CmnLib.hDip, "port", this.extPort);
    const o = r.get("cur");
    o && (t.cur = this.#e + o + "/"), await this.run();
  }
  #t = ":";
  async runSN(e) {
    this.arg.cur = this.#e + e + "/", this.#t !== this.arg.cur && (this.#t = this.arg.cur, await this.run());
  }
  run = async () => {
    this.#i && this.#i.destroy(), this.#i = new Main(this);
  };
  stop() {
    this.#i && (this.#i.destroy(), this.#i = void 0);
  }
  #i = void 0;
  async loadPath(e, t) {
    await super.loadPath(e, t);
    const r = this.arg.cur + "path.json", s = await this.fetch(r);
    if (!s.ok) throw Error(s.statusText);
    const o = await s.text(), u = JSON.parse(await this.dec(r, o));
    for (const [h, l] of Object.entries(u)) {
      const c = e[h] = l;
      for (const [d, _] of Object.entries(c))
        d !== ":cnt" && (c[d] = this.arg.cur + _);
    }
  }
  async initVal(e, t, r) {
    const s = encodeURIComponent(document.location.hostname);
    t["const.sn.isDebugger"] = s === "localhost" || s === "127.0.0.1";
    const o = this.cfg.getNs();
    this.flushSub = this.arg.crypto ? async () => {
      store.set(o + "sys_", await this.enc(JSON.stringify(this.data.sys))), store.set(o + "mark_", await this.enc(JSON.stringify(this.data.mark))), store.set(o + "kidoku_", await this.enc(JSON.stringify(this.data.kidoku)));
    } : () => {
      store.set(o + "sys", this.data.sys), store.set(o + "mark", this.data.mark), store.set(o + "kidoku", this.data.kidoku);
    };
    const u = o + (this.arg.crypto ? "sys_" : "sys");
    if (t["const.sn.isFirstBoot"] = store.get(u) === void 0) {
      this.data.sys = e.sys, this.data.mark = e.mark, this.data.kidoku = e.kidoku, this.flush(), r(this.data);
      return;
    }
    if (!this.arg.crypto) {
      this.data.sys = store.get(o + "sys"), this.data.mark = store.get(o + "mark"), this.data.kidoku = store.get(o + "kidoku"), r(this.data);
      return;
    }
    let h = "";
    try {
      h = "sys", this.data.sys = JSON.parse(await this.dec("json", store.get(o + "sys_"))), h += Number(this.val.getVal("sys:TextLayer.Back.Alpha", 1)), h = "mark", this.data.mark = JSON.parse(await this.dec("json", store.get(o + "mark_"))), h = "kidoku", this.data.kidoku = JSON.parse(await this.dec("json", store.get(o + "kidoku_")));
    } catch (l) {
      console.error(`セーブデータ（${h}）が壊れています。一度クリアする必要があります(a) %o`, l);
    }
    r(this.data);
  }
  init(e, t, r, s) {
    super.init(e, t, r, s);
    const o = t.view.parentElement;
    if ("requestFullscreen" in document.body)
      this.tglFlscr_sub = () => this.isFullScr ? document.exitFullscreen() : o.requestFullscreen(), this.elc.add(document, "fullscreenchange", () => this.isFullScr = !!document.fullscreenElement);
    else {
      const u = document;
      this.tglFlscr_sub = () => this.isFullScr ? u.webkitCancelFullScreen() : o.webkitRequestFullscreen(), this.elc.add(document, "fullscreenchange", () => this.isFullScr = !!u.webkitFullscreenElement);
    }
    return this.cfg.oCfg.debug.devtool || this.elc.add(window, "devtoolschange", (u) => {
      u.detail.isOpen && (console.error("DevToolは禁止されています。許可する場合は【プロジェクト設定】の【devtool】をONに。"), s.destroy());
    }, { once: !0, passive: !0 }), [];
  }
  cvsResize() {
    if (super.cvsResize(), this.isFullScr) {
      const e = this.main.cvs.style;
      e.width = e.height = "";
    }
  }
  pathBaseCnvSnPath4Dbg = "${pathbase}/";
  // プレイデータをエクスポート
  _export = () => ((async () => {
    const e = JSON.stringify({
      sys: this.data.sys,
      mark: this.data.mark,
      kidoku: this.data.kidoku
    }), t = this.arg.crypto ? await this.enc(e) : e, r = new Blob([t], { type: "text/json" }), s = document.createElement("a");
    s.href = URL.createObjectURL(r), s.download = (this.arg.crypto ? "" : "no_crypto_") + this.cfg.getNs() + getDateStr("-", "_", "") + ".swpd", s.click(), CmnLib.debugLog && console.log("プレイデータをエクスポートしました"), setTimeout(() => this.fire("sn:exported", new Event("click")), 10);
  })(), !1);
  // プレイデータをインポート
  _import = () => (new Promise((e, t) => {
    const r = document.createElement("input");
    r.type = "file", r.accept = ".swpd, text/plain", r.onchange = () => {
      const s = r.files?.[0];
      s ? e(s) : t();
    }, r.click();
  }).then(async (e) => {
    const t = await e.text(), r = JSON.parse(this.arg.crypto ? await this.dec("json", t) : t);
    if (!r.sys || !r.mark || !r.kidoku) throw new Error("異常なプレイデータです");
    if (r.sys[SysBase.VALNM_CFG_NS] !== this.cfg.oCfg.save_ns) {
      console.error(`別のゲーム【プロジェクト名=${r.sys[SysBase.VALNM_CFG_NS]}】のプレイデータです`);
      return;
    }
    this.data.sys = r.sys, this.data.mark = r.mark, this.data.kidoku = r.kidoku, this.flush(), this.val.updateData(r), CmnLib.debugLog && console.log("プレイデータをインポートしました"), this.fire("sn:imported", new Event("click"));
  }).catch((e) => console.error(`異常なプレイデータです ${e.message}`)), !1);
  // ＵＲＬを開く
  navigate_to = (e) => {
    const { url: t } = e;
    if (!t) throw "[navigate_to] urlは必須です";
    return globalThis.open(t, "_blank"), !1;
  };
  // タイトル指定
  titleSub(e) {
    document.title = e, document.querySelectorAll("[data-title]").forEach((t) => t.textContent = e);
  }
  async savePic(e, t) {
    const r = document.createElement("a");
    r.href = t, r.download = e, r.click(), CmnLib.debugLog && console.log("画像ファイルをダウンロードします");
  }
  #r = {};
  async appendFile(e, t) {
    const r = (this.#r[e] ?? "") + t;
    this.#r[e] = r, await this.outputFile(e, r);
  }
  async outputFile(e, t) {
    const r = new Blob([t], { type: "text/json" }), s = document.createElement("a");
    s.href = URL.createObjectURL(r), s.download = e, s.click();
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
    const s = r(e);
    s.enabled = argChk_Boolean(e, "enable_filter", !0);
    const { blendmode: o } = e;
    return o && (s.blendMode = Layer.getBlendmodeNum(o)), s;
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
        const s = r.split(","), o = s.length;
        if (o !== 20) throw `matrix の個数（${o}）が 20 ではありません`;
        for (let u = 0; u < o; ++u) t.matrix[u] = uint(s[u]);
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
    const s = Layer.getBlendmodeNum(r);
    e instanceof Sprite && (e.blendMode = s);
    for (const o of e.children)
      o instanceof Sprite && (o.blendMode = s);
  }
  static getBlendmodeNum(e) {
    if (!e) return BLEND_MODES.NORMAL;
    const t = Layer.#e[e];
    if (t !== void 0) return t;
    throw `${e} はサポートされない blendmode です`;
  }
  static #e = {
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
    return Layer.#t[e] ?? "normal";
  }
  static #t = {
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
    return ` "idx":${this.ctn.parent.getChildIndex(this.ctn)}, "visible":"${this.ctn.visible}", "left":${this.ctn.x}, "top":${this.ctn.y}, "alpha":${this.ctn.alpha}, "rotation":${this.ctn.angle}, "name":"${this.name_}", "scale_x":${this.ctn.scale.x}, "scale_y":${this.ctn.scale.y}, "filters": [${this.aFltHArg.map((e) => `"${e.filter}"`).join(",")}]`;
  }
  static setXY(e, t, r, s = !1, o = !1) {
    if (t.pos) {
      Layer.setXYByPos(e, t.pos, r);
      return;
    }
    const u = e.getBounds(), h = r.scale.x < 0 ? -r.scale.x : r.scale.x, l = h === 1 ? u.width : u.width * h, c = r.scale.y < 0 ? -r.scale.y : r.scale.y, d = c === 1 ? u.height : u.height * c;
    let _ = r.x;
    "left" in t ? (_ = argChk_Num(t, "left", 0), _ > -1 && _ < 1 && (_ *= CmnLib.stageW)) : "center" in t ? (_ = argChk_Num(t, "center", 0), _ > -1 && _ < 1 && (_ *= CmnLib.stageW), _ = _ - (o ? l / 3 : l) / 2) : "right" in t ? (_ = argChk_Num(t, "right", 0), _ > -1 && _ < 1 && (_ *= CmnLib.stageW), _ = _ - (o ? l / 3 : l)) : "s_right" in t && (_ = argChk_Num(t, "s_right", 0), _ > -1 && _ < 1 && (_ *= CmnLib.stageW), _ = CmnLib.stageW - _ - (o ? l / 3 : l)), r.x = int(r.scale.x < 0 ? _ + (o ? l / 3 : l) : _);
    let v = r.y;
    "top" in t ? (v = argChk_Num(t, "top", 0), v > -1 && v < 1 && (v *= CmnLib.stageH)) : "middle" in t ? (v = argChk_Num(t, "middle", 0), v > -1 && v < 1 && (v *= CmnLib.stageH), v = v - d / 2) : "bottom" in t ? (v = argChk_Num(t, "bottom", 0), v > -1 && v < 1 && (v *= CmnLib.stageH), v = v - d) : "s_bottom" in t && (v = argChk_Num(t, "s_bottom", 0), v > -1 && v < 1 && (v *= CmnLib.stageH), v = CmnLib.stageH - v - d), r.y = int(r.scale.y < 0 ? v + d : v), s && !("left" in t) && !("center" in t) && !("right" in t) && !("s_right" in t) && !("top" in t) && !("middle" in t) && !("bottom" in t) && !("s_bottom" in t) && Layer.setXYByPos(e, "c", r);
  }
  static setXYByPos(e, t, r) {
    if (t === "stay") return;
    if (e === void 0) throw "setXYByPos base === undefined";
    if (r === void 0) throw "setXYByPos result === undefined";
    const s = e.getBounds(), o = r.scale.x < 0 ? -r.scale.x : r.scale.x, u = o === 1 ? s.width : s.width * o, h = r.scale.y < 0 ? -r.scale.y : r.scale.y, l = h === 1 ? s.height : s.height * h;
    let c = 0;
    !t || t === "c" ? c = CmnLib.stageW * 0.5 : t === "r" ? c = CmnLib.stageW - u * 0.5 : t === "l" ? c = u * 0.5 : c = int(t), r.x = int(c - u * 0.5), r.y = CmnLib.stageH - l, r.scale.x < 0 && (r.x += u), r.scale.y < 0 && (r.y += l);
  }
  static setXYCenter(e) {
    const t = e.getBounds();
    e.x = (CmnLib.stageW - t.width) * 0.5, e.y = (CmnLib.stageH - t.height) * 0.5;
  }
}
export {
  AnalyzeTagArg as A,
  BaseTexture as B,
  CmnLib as C,
  DebugMng as D,
  EventListenerCtn as E,
  TextStyle as F,
  Grammar as G,
  Text as H,
  initStyle as I,
  argChk_Color as J,
  getExt as K,
  Loader as L,
  parseColor as M,
  autoDetectRenderer as N,
  Filter as O,
  SysWeb as P,
  Rectangle as R,
  SEARCH_PATH_ARG_EXT as S,
  Ticker as T,
  argChk_Boolean as a,
  argChk_Num as b,
  LoaderResource as c,
  i as d,
  extensions as e,
  getFn as f,
  getDateStr as g,
  tagToken2Name_Args as h,
  int as i,
  Container as j,
  addStyle as k,
  clearTextureCache as l,
  SysBase as m,
  n,
  mesErrJSON as o,
  platform as p,
  TextureCache as q,
  BLEND_MODES as r,
  Texture as s,
  tagToken2Name as t,
  uint as u,
  AnimatedSprite as v,
  Sprite as w,
  Layer as x,
  RenderTexture as y,
  Graphics as z
};
//# sourceMappingURL=web2.js.map
