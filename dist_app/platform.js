import { c as q, g as me } from "./app2.js";
function ue(M, A) {
  for (var C = 0; C < A.length; C++) {
    const u = A[C];
    if (typeof u != "string" && !Array.isArray(u)) {
      for (const h in u)
        if (h !== "default" && !(h in M)) {
          const w = Object.getOwnPropertyDescriptor(u, h);
          w && Object.defineProperty(M, h, w.get ? w : {
            enumerable: !0,
            get: () => u[h]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(M, Symbol.toStringTag, { value: "Module" }));
}
var W = { exports: {} };
var he = W.exports, J;
function ve() {
  return J || (J = 1, function(M, A) {
    (function() {
      var C = {
        function: !0,
        object: !0
      }, u = C[typeof window] && window || this, h = A, w = M && !M.nodeType && M, g = h && w && typeof q == "object" && q;
      g && (g.global === g || g.window === g || g.self === g) && (u = g);
      var Z = Math.pow(2, 53) - 1, R = /\bOpera/, z = Object.prototype, Q = z.hasOwnProperty, V = z.toString;
      function H(t) {
        return t = String(t), t.charAt(0).toUpperCase() + t.slice(1);
      }
      function ee(t, a, f) {
        var d = {
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
        return a && f && /^Win/i.test(t) && !/^Windows Phone /i.test(t) && (d = d[/[\d.]+$/.exec(t)]) && (t = "Windows " + d), t = String(t), a && f && (t = t.replace(RegExp(a, "i"), f)), t = k(
          t.replace(/ ce$/i, " CE").replace(/\bhpw/i, "web").replace(/\bMacintosh\b/, "Mac OS").replace(/_PowerPC\b/i, " OS").replace(/\b(OS X) [^ \d]+/i, "$1").replace(/\bMac (OS X)\b/, "$1").replace(/\/(\d)/, " $1").replace(/_/g, ".").replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, "").replace(/\bx86\.64\b/gi, "x86_64").replace(/\b(Windows Phone) OS\b/, "$1").replace(/\b(Chrome OS \w+) [\d.]+\b/, "$1").split(" on ")[0]
        ), t;
      }
      function te(t, a) {
        var f = -1, d = t ? t.length : 0;
        if (typeof d == "number" && d > -1 && d <= Z)
          for (; ++f < d; )
            a(t[f], f, t);
        else
          I(t, a);
      }
      function k(t) {
        return t = X(t), /^(?:webOS|i(?:OS|P))/.test(t) ? t : H(t);
      }
      function I(t, a) {
        for (var f in t)
          Q.call(t, f) && a(t[f], f, t);
      }
      function E(t) {
        return t == null ? H(t) : V.call(t).slice(8, -1);
      }
      function ie(t, a) {
        var f = t != null ? typeof t[a] : "number";
        return !/^(?:boolean|number|string|undefined)$/.test(f) && (f == "object" ? !!t[a] : !0);
      }
      function v(t) {
        return String(t).replace(/([ -])(?!$)/g, "$1?");
      }
      function P(t, a) {
        var f = null;
        return te(t, function(d, T) {
          f = a(f, d, T, t);
        }), f;
      }
      function X(t) {
        return String(t).replace(/^ +| +$/g, "");
      }
      function F(t) {
        var a = u, f = t && typeof t == "object" && E(t) != "String";
        f && (a = t, t = null);
        var d = a.navigator || {}, T = d.userAgent || "";
        t || (t = T);
        var re = f ? !!d.likeChrome : /\bChrome\b/.test(t) && !/internal|\n/i.test(V.toString()), j = "Object", ne = f ? j : "ScriptBridgingProxyObject", oe = f ? j : "Environment", ae = f && a.java ? "JavaPackage" : E(a.java), le = f ? j : "RuntimeObject", B = /\bJava/.test(ae) && a.java, se = B && E(a.environment) == oe, be = B ? "a" : "α", fe = B ? "b" : "β", K = a.document || {}, O = a.operamini || a.opera, G = R.test(G = f && O ? O["[[Class]]"] : E(O)) ? G : O = null, e, $ = t, l = [], N = null, y = t == T, n = y && O && typeof O.version == "function" && O.version(), _, s = pe([
          { label: "EdgeHTML", pattern: "Edge" },
          "Trident",
          { label: "WebKit", pattern: "AppleWebKit" },
          "iCab",
          "Presto",
          "NetFront",
          "Tasman",
          "KHTML",
          "Gecko"
        ]), i = de([
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
        ]), o = D([
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
        ]), c = ce({
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
        }), r = Se([
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
        function pe(S) {
          return P(S, function(p, b) {
            return p || RegExp("\\b" + (b.pattern || v(b)) + "\\b", "i").exec(t) && (b.label || b);
          });
        }
        function ce(S) {
          return P(S, function(p, b, m) {
            return p || (b[o] || b[/^[a-z]+(?: +[a-z]+\b)*/i.exec(o)] || RegExp("\\b" + v(m) + "(?:\\b|\\w*\\d)", "i").exec(t)) && m;
          });
        }
        function de(S) {
          return P(S, function(p, b) {
            return p || RegExp("\\b" + (b.pattern || v(b)) + "\\b", "i").exec(t) && (b.label || b);
          });
        }
        function Se(S) {
          return P(S, function(p, b) {
            var m = b.pattern || v(b);
            return !p && (p = RegExp("\\b" + m + "(?:/[\\d.]+|[ \\w.]*)", "i").exec(t)) && (p = ee(p, m, b.label || b)), p;
          });
        }
        function D(S) {
          return P(S, function(p, b) {
            var m = b.pattern || v(b);
            return !p && (p = RegExp("\\b" + m + " *\\d+[.\\w_]*", "i").exec(t) || RegExp("\\b" + m + " *\\w+-[\\w]*", "i").exec(t) || RegExp("\\b" + m + "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)", "i").exec(t)) && ((p = String(b.label && !RegExp(m, "i").test(b.label) ? b.label : p).split("/"))[1] && !/[\d.]+/.test(p[0]) && (p[0] += " " + p[1]), b = b.label || b, p = k(p[0].replace(RegExp(m, "i"), b).replace(RegExp("; *(?:" + b + "[_-])?", "i"), " ").replace(RegExp("(" + b + ")[-_.]?(\\w)", "i"), "$1 $2"))), p;
          });
        }
        function U(S) {
          return P(S, function(p, b) {
            return p || (RegExp(b + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)", "i").exec(t) || 0)[1] || null;
          });
        }
        function xe() {
          return this.description || "";
        }
        if (s && (s = [s]), /\bAndroid\b/.test(r) && !o && (e = /\bAndroid[^;]*;(.*?)(?:Build|\) AppleWebKit)\b/i.exec(t)) && (o = X(e[1]).replace(/^[a-z]{2}-[a-z]{2};\s*/i, "") || null), c && !o ? o = D([c]) : c && o && (o = o.replace(RegExp("^(" + v(c) + ")[-_.\\s]", "i"), c + " ").replace(RegExp("^(" + v(c) + ")[-_.]?(\\w)", "i"), c + " $2")), (e = /\bGoogle TV\b/.exec(o)) && (o = e[0]), /\bSimulator\b/i.test(t) && (o = (o ? o + " " : "") + "Simulator"), i == "Opera Mini" && /\bOPiOS\b/.test(t) && l.push("running in Turbo/Uncompressed mode"), i == "IE" && /\blike iPhone OS\b/.test(t) ? (e = F(t.replace(/like iPhone OS/, "")), c = e.manufacturer, o = e.product) : /^iP/.test(o) ? (i || (i = "Safari"), r = "iOS" + ((e = / OS ([\d_]+)/i.exec(t)) ? " " + e[1].replace(/_/g, ".") : "")) : i == "Konqueror" && /^Linux\b/i.test(r) ? r = "Kubuntu" : c && c != "Google" && (/Chrome/.test(i) && !/\bMobile Safari\b/i.test(t) || /\bVita\b/.test(o)) || /\bAndroid\b/.test(r) && /^Chrome/.test(i) && /\bVersion\//i.test(t) ? (i = "Android Browser", r = /\bAndroid\b/.test(r) ? r : "Android") : i == "Silk" ? (/\bMobi/i.test(t) || (r = "Android", l.unshift("desktop mode")), /Accelerated *= *true/i.test(t) && l.unshift("accelerated")) : i == "UC Browser" && /\bUCWEB\b/.test(t) ? l.push("speed mode") : i == "PaleMoon" && (e = /\bFirefox\/([\d.]+)\b/.exec(t)) ? l.push("identifying as Firefox " + e[1]) : i == "Firefox" && (e = /\b(Mobile|Tablet|TV)\b/i.exec(t)) ? (r || (r = "Firefox OS"), o || (o = e[1])) : !i || (e = !/\bMinefield\b/i.test(t) && /\b(?:Firefox|Safari)\b/.exec(i)) ? (i && !o && /[\/,]|^[^(]+?\)/.test(t.slice(t.indexOf(e + "/") + 8)) && (i = null), (e = o || c || r) && (o || c || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(r)) && (i = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(r) ? r : e) + " Browser")) : i == "Electron" && (e = (/\bChrome\/([\d.]+)\b/.exec(t) || 0)[1]) && l.push("Chromium " + e), n || (n = U([
          "(?:Cloud9|CriOS|CrMo|Edge|Edg|EdgA|EdgiOS|FxiOS|HeadlessChrome|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$)|UCBrowser|YaBrowser)",
          "Version",
          v(i),
          "(?:Firefox|Minefield|NetFront)"
        ])), (e = s == "iCab" && parseFloat(n) > 3 && "WebKit" || /\bOpera\b/.test(i) && (/\bOPR\b/.test(t) ? "Blink" : "Presto") || /\b(?:Midori|Nook|Safari)\b/i.test(t) && !/^(?:Trident|EdgeHTML)$/.test(s) && "WebKit" || !s && /\bMSIE\b/i.test(t) && (r == "Mac OS" ? "Tasman" : "Trident") || s == "WebKit" && /\bPlayStation\b(?! Vita\b)/i.test(i) && "NetFront") && (s = [e]), i == "IE" && (e = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(t) || 0)[1]) ? (i += " Mobile", r = "Windows Phone " + (/\+$/.test(e) ? e : e + ".x"), l.unshift("desktop mode")) : /\bWPDesktop\b/i.test(t) ? (i = "IE Mobile", r = "Windows Phone 8.x", l.unshift("desktop mode"), n || (n = (/\brv:([\d.]+)/.exec(t) || 0)[1])) : i != "IE" && s == "Trident" && (e = /\brv:([\d.]+)/.exec(t)) && (i && l.push("identifying as " + i + (n ? " " + n : "")), i = "IE", n = e[1]), y) {
          if (ie(a, "global"))
            if (B && (e = B.lang.System, $ = e.getProperty("os.arch"), r = r || e.getProperty("os.name") + " " + e.getProperty("os.version")), se) {
              try {
                n = a.require("ringo/engine").version.join("."), i = "RingoJS";
              } catch {
                (e = a.system) && e.global.system == a.system && (i = "Narwhal", r || (r = e[0].os || null));
              }
              i || (i = "Rhino");
            } else typeof a.process == "object" && !a.process.browser && (e = a.process) && (typeof e.versions == "object" && (typeof e.versions.electron == "string" ? (l.push("Node " + e.versions.node), i = "Electron", n = e.versions.electron) : typeof e.versions.nw == "string" && (l.push("Chromium " + n, "Node " + e.versions.node), i = "NW.js", n = e.versions.nw)), i || (i = "Node.js", $ = e.arch, r = e.platform, n = /[\d.]+/.exec(e.version), n = n ? n[0] : null));
          else E(e = a.runtime) == ne ? (i = "Adobe AIR", r = e.flash.system.Capabilities.os) : E(e = a.phantom) == le ? (i = "PhantomJS", n = (e = e.version || null) && e.major + "." + e.minor + "." + e.patch) : typeof K.documentMode == "number" && (e = /\bTrident\/(\d+)/i.exec(t)) ? (n = [n, K.documentMode], (e = +e[1] + 4) != n[1] && (l.push("IE " + n[1] + " mode"), s && (s[1] = ""), n[1] = e), n = i == "IE" ? String(n[1].toFixed(1)) : n[0]) : typeof K.documentMode == "number" && /^(?:Chrome|Firefox)\b/.test(i) && (l.push("masking as " + i + " " + n), i = "IE", n = "11.0", s = ["Trident"], r = "Windows");
          r = r && k(r);
        }
        if (n && (e = /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(n) || /(?:alpha|beta)(?: ?\d)?/i.exec(t + ";" + (y && d.appMinorVersion)) || /\bMinefield\b/i.test(t) && "a") && (N = /b/i.test(e) ? "beta" : "alpha", n = n.replace(RegExp(e + "\\+?$"), "") + (N == "beta" ? fe : be) + (/\d+\+?/.exec(e) || "")), i == "Fennec" || i == "Firefox" && /\b(?:Android|Firefox OS|KaiOS)\b/.test(r))
          i = "Firefox Mobile";
        else if (i == "Maxthon" && n)
          n = n.replace(/\.[\d.]+/, ".x");
        else if (/\bXbox\b/i.test(o))
          o == "Xbox 360" && (r = null), o == "Xbox 360" && /\bIEMobile\b/.test(t) && l.unshift("mobile mode");
        else if ((/^(?:Chrome|IE|Opera)$/.test(i) || i && !o && !/Browser|Mobi/.test(i)) && (r == "Windows CE" || /Mobi/i.test(t)))
          i += " Mobile";
        else if (i == "IE" && y)
          try {
            a.external === null && l.unshift("platform preview");
          } catch {
            l.unshift("embedded");
          }
        else (/\bBlackBerry\b/.test(o) || /\bBB10\b/.test(t)) && (e = (RegExp(o.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec(t) || 0)[1] || n) ? (e = [e, /BB10/.test(t)], r = (e[1] ? (o = null, c = "BlackBerry") : "Device Software") + " " + e[0], n = null) : this != I && o != "Wii" && (y && O || /Opera/.test(i) && /\b(?:MSIE|Firefox)\b/i.test(t) || i == "Firefox" && /\bOS X (?:\d+\.){2,}/.test(r) || i == "IE" && (r && !/^Win/.test(r) && n > 5.5 || /\bWindows XP\b/.test(r) && n > 8 || n == 8 && !/\bTrident\b/.test(t))) && !R.test(e = F.call(I, t.replace(R, "") + ";")) && e.name && (e = "ing as " + e.name + ((e = e.version) ? " " + e : ""), R.test(i) ? (/\bIE\b/.test(e) && r == "Mac OS" && (r = null), e = "identify" + e) : (e = "mask" + e, G ? i = k(G.replace(/([a-z])([A-Z])/g, "$1 $2")) : i = "Opera", /\bIE\b/.test(e) && (r = null), y || (n = null)), s = ["Presto"], l.push(e));
        (e = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(t) || 0)[1]) && (e = [parseFloat(e.replace(/\.(\d)$/, ".0$1")), e], i == "Safari" && e[1].slice(-1) == "+" ? (i = "WebKit Nightly", N = "alpha", n = e[1].slice(0, -1)) : (n == e[1] || n == (e[2] = (/\bSafari\/([\d.]+\+?)/i.exec(t) || 0)[1])) && (n = null), e[1] = (/\b(?:Headless)?Chrome\/([\d.]+)/i.exec(t) || 0)[1], e[0] == 537.36 && e[2] == 537.36 && parseFloat(e[1]) >= 28 && s == "WebKit" && (s = ["Blink"]), !y || !re && !e[1] ? (s && (s[1] = "like Safari"), e = (e = e[0], e < 400 ? 1 : e < 500 ? 2 : e < 526 ? 3 : e < 533 ? 4 : e < 534 ? "4+" : e < 535 ? 5 : e < 537 ? 6 : e < 538 ? 7 : e < 601 ? 8 : e < 602 ? 9 : e < 604 ? 10 : e < 606 ? 11 : e < 608 ? 12 : "12")) : (s && (s[1] = "like Chrome"), e = e[1] || (e = e[0], e < 530 ? 1 : e < 532 ? 2 : e < 532.05 ? 3 : e < 533 ? 4 : e < 534.03 ? 5 : e < 534.07 ? 6 : e < 534.1 ? 7 : e < 534.13 ? 8 : e < 534.16 ? 9 : e < 534.24 ? 10 : e < 534.3 ? 11 : e < 535.01 ? 12 : e < 535.02 ? "13+" : e < 535.07 ? 15 : e < 535.11 ? 16 : e < 535.19 ? 17 : e < 536.05 ? 18 : e < 536.1 ? 19 : e < 537.01 ? 20 : e < 537.11 ? "21+" : e < 537.13 ? 23 : e < 537.18 ? 24 : e < 537.24 ? 25 : e < 537.36 ? 26 : s != "Blink" ? "27" : "28")), s && (s[1] += " " + (e += typeof e == "number" ? ".x" : /[.+]/.test(e) ? "" : "+")), i == "Safari" && (!n || parseInt(n) > 45) ? n = e : i == "Chrome" && /\bHeadlessChrome/i.test(t) && l.unshift("headless")), i == "Opera" && (e = /\bzbov|zvav$/.exec(r)) ? (i += " ", l.unshift("desktop mode"), e == "zvav" ? (i += "Mini", n = null) : i += "Mobile", r = r.replace(RegExp(" *" + e + "$"), "")) : i == "Safari" && /\bChrome\b/.exec(s && s[1]) ? (l.unshift("desktop mode"), i = "Chrome Mobile", n = null, /\bOS X\b/.test(r) ? (c = "Apple", r = "iOS 4.3+") : r = null) : /\bSRWare Iron\b/.test(i) && !n && (n = U("Chrome")), n && n.indexOf(e = /[\d.]+$/.exec(r)) == 0 && t.indexOf("/" + e + "-") > -1 && (r = X(r.replace(e, ""))), r && r.indexOf(i) != -1 && !RegExp(i + " OS").test(r) && (r = r.replace(RegExp(" *" + v(i) + " *"), "")), s && !/\b(?:Avant|Nook)\b/.test(i) && (/Browser|Lunascape|Maxthon/.test(i) || i != "Safari" && /^iOS/.test(r) && /\bSafari\b/.test(s[1]) || /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|SRWare Iron|Vivaldi|Web)/.test(i) && s[1]) && (e = s[s.length - 1]) && l.push(e), l.length && (l = ["(" + l.join("; ") + ")"]), c && o && o.indexOf(c) < 0 && l.push("on " + c), o && l.push((/^on /.test(l[l.length - 1]) ? "" : "on ") + o), r && (e = / ([\d.+]+)$/.exec(r), _ = e && r.charAt(r.length - e[0].length - 1) == "/", r = {
          architecture: 32,
          family: e && !_ ? r.replace(e[0], "") : r,
          version: e ? e[1] : null,
          toString: function() {
            var S = this.version;
            return this.family + (S && !_ ? " " + S : "") + (this.architecture == 64 ? " 64-bit" : "");
          }
        }), (e = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec($)) && !/\bi686\b/i.test($) ? (r && (r.architecture = 64, r.family = r.family.replace(RegExp(" *" + e), "")), i && (/\bWOW64\b/i.test(t) || y && /\w(?:86|32)$/.test(d.cpuClass || d.platform) && !/\bWin64; x64\b/i.test(t)) && l.unshift("32-bit")) : r && /^OS X/.test(r.family) && i == "Chrome" && parseFloat(n) >= 39 && (r.architecture = 64), t || (t = null);
        var x = {};
        return x.description = t, x.layout = s && s[0], x.manufacturer = c, x.name = i, x.prerelease = N, x.product = o, x.ua = t, x.version = i && n, x.os = r || {
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
        }, x.parse = F, x.toString = xe, x.version && l.unshift(n), x.name && l.unshift(i), r && i && !(r == String(r).split(" ")[0] && (r == i.split(" ")[0] || o)) && l.push(o ? "(" + r + ")" : "on " + r), l.length && (x.description = l.join(" ")), x;
      }
      var L = F();
      h && w ? I(L, function(t, a) {
        h[a] = t;
      }) : u.platform = L;
    }).call(he);
  }(W, W.exports)), W.exports;
}
var Y = ve();
const ge = /* @__PURE__ */ me(Y), ye = /* @__PURE__ */ ue({
  __proto__: null,
  default: ge
}, [Y]);
export {
  ye as p
};
//# sourceMappingURL=platform.js.map
