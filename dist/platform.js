import { t as __commonJSMin } from "./chunk.js";
var require_platform = /* @__PURE__ */ __commonJSMin(((e, t) => {
	(function() {
		var n = {
			function: !0,
			object: !0
		}, r = n[typeof window] && window || this, i = n[typeof e] && e, a = n[typeof t] && t && !t.nodeType && t, o = i && a && typeof global == "object" && global;
		o && (o.global === o || o.window === o || o.self === o) && (r = o);
		var s = 2 ** 53 - 1, c = /\bOpera/, l = Object.prototype, u = l.hasOwnProperty, d = l.toString;
		function f(e) {
			return e = String(e), e.charAt(0).toUpperCase() + e.slice(1);
		}
		function p(e, t, n) {
			var r = {
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
			return t && n && /^Win/i.test(e) && !/^Windows Phone /i.test(e) && (r = r[/[\d.]+$/.exec(e)]) && (e = "Windows " + r), e = String(e), t && n && (e = e.replace(RegExp(t, "i"), n)), e = h(e.replace(/ ce$/i, " CE").replace(/\bhpw/i, "web").replace(/\bMacintosh\b/, "Mac OS").replace(/_PowerPC\b/i, " OS").replace(/\b(OS X) [^ \d]+/i, "$1").replace(/\bMac (OS X)\b/, "$1").replace(/\/(\d)/, " $1").replace(/_/g, ".").replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, "").replace(/\bx86\.64\b/gi, "x86_64").replace(/\b(Windows Phone) OS\b/, "$1").replace(/\b(Chrome OS \w+) [\d.]+\b/, "$1").split(" on ")[0]), e;
		}
		function m(e, t) {
			var n = -1, r = e ? e.length : 0;
			if (typeof r == "number" && r > -1 && r <= s) for (; ++n < r;) t(e[n], n, e);
			else g(e, t);
		}
		function h(e) {
			return e = x(e), /^(?:webOS|i(?:OS|P))/.test(e) ? e : f(e);
		}
		function g(e, t) {
			for (var n in e) u.call(e, n) && t(e[n], n, e);
		}
		function _(e) {
			return e == null ? f(e) : d.call(e).slice(8, -1);
		}
		function v(e, t) {
			var n = e == null ? "number" : typeof e[t];
			return !/^(?:boolean|number|string|undefined)$/.test(n) && (n == "object" ? !!e[t] : !0);
		}
		function y(e) {
			return String(e).replace(/([ -])(?!$)/g, "$1?");
		}
		function b(e, t) {
			var n = null;
			return m(e, function(r, i) {
				n = t(n, r, i, e);
			}), n;
		}
		function x(e) {
			return String(e).replace(/^ +| +$/g, "");
		}
		function S(e) {
			var t = r, n = e && typeof e == "object" && _(e) != "String";
			n && (t = e, e = null);
			var i = t.navigator || {}, a = i.userAgent || "";
			e ||= a;
			var o = n ? !!i.likeChrome : /\bChrome\b/.test(e) && !/internal|\n/i.test(d.toString()), s = "Object", l = n ? s : "ScriptBridgingProxyObject", u = n ? s : "Environment", f = n && t.java ? "JavaPackage" : _(t.java), m = n ? s : "RuntimeObject", C = /\bJava/.test(f) && t.java, w = C && _(t.environment) == u, T = C ? "a" : "α", E = C ? "b" : "β", D = t.document || {}, O = t.operamini || t.opera, k = c.test(k = n && O ? O["[[Class]]"] : _(O)) ? k : O = null, A, j = e, M = [], N = null, P = e == a, F = P && O && typeof O.version == "function" && O.version(), I, L = H([
				{
					label: "EdgeHTML",
					pattern: "Edge"
				},
				"Trident",
				{
					label: "WebKit",
					pattern: "AppleWebKit"
				},
				"iCab",
				"Presto",
				"NetFront",
				"Tasman",
				"KHTML",
				"Gecko"
			]), R = W([
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
				{
					label: "Microsoft Edge",
					pattern: "(?:Edge|Edg|EdgA|EdgiOS)"
				},
				"Midori",
				"Nook Browser",
				"PaleMoon",
				"PhantomJS",
				"Raven",
				"Rekonq",
				"RockMelt",
				{
					label: "Samsung Internet",
					pattern: "SamsungBrowser"
				},
				"SeaMonkey",
				{
					label: "Silk",
					pattern: "(?:Cloud9|Silk-Accelerated)"
				},
				"Sleipnir",
				"SlimBrowser",
				{
					label: "SRWare Iron",
					pattern: "Iron"
				},
				"Sunrise",
				"Swiftfox",
				"Vivaldi",
				"Waterfox",
				"WebPositive",
				{
					label: "Yandex Browser",
					pattern: "YaBrowser"
				},
				{
					label: "UC Browser",
					pattern: "UCBrowser"
				},
				"Opera Mini",
				{
					label: "Opera Mini",
					pattern: "OPiOS"
				},
				"Opera",
				{
					label: "Opera",
					pattern: "OPR"
				},
				"Chromium",
				"Chrome",
				{
					label: "Chrome",
					pattern: "(?:HeadlessChrome)"
				},
				{
					label: "Chrome Mobile",
					pattern: "(?:CriOS|CrMo)"
				},
				{
					label: "Firefox",
					pattern: "(?:Firefox|Minefield)"
				},
				{
					label: "Firefox for iOS",
					pattern: "FxiOS"
				},
				{
					label: "IE",
					pattern: "IEMobile"
				},
				{
					label: "IE",
					pattern: "MSIE"
				},
				"Safari"
			]), z = K([
				{
					label: "BlackBerry",
					pattern: "BB10"
				},
				"BlackBerry",
				{
					label: "Galaxy S",
					pattern: "GT-I9000"
				},
				{
					label: "Galaxy S2",
					pattern: "GT-I9100"
				},
				{
					label: "Galaxy S3",
					pattern: "GT-I9300"
				},
				{
					label: "Galaxy S4",
					pattern: "GT-I9500"
				},
				{
					label: "Galaxy S5",
					pattern: "SM-G900"
				},
				{
					label: "Galaxy S6",
					pattern: "SM-G920"
				},
				{
					label: "Galaxy S6 Edge",
					pattern: "SM-G925"
				},
				{
					label: "Galaxy S7",
					pattern: "SM-G930"
				},
				{
					label: "Galaxy S7 Edge",
					pattern: "SM-G935"
				},
				"Google TV",
				"Lumia",
				"iPad",
				"iPod",
				"iPhone",
				"Kindle",
				{
					label: "Kindle Fire",
					pattern: "(?:Cloud9|Silk-Accelerated)"
				},
				"Nexus",
				"Nook",
				"PlayBook",
				"PlayStation Vita",
				"PlayStation",
				"TouchPad",
				"Transformer",
				{
					label: "Wii U",
					pattern: "WiiU"
				},
				"Wii",
				"Xbox One",
				{
					label: "Xbox 360",
					pattern: "Xbox"
				},
				"Xoom"
			]), B = U({
				Apple: {
					iPad: 1,
					iPhone: 1,
					iPod: 1
				},
				Alcatel: {},
				Archos: {},
				Amazon: {
					Kindle: 1,
					"Kindle Fire": 1
				},
				Asus: { Transformer: 1 },
				"Barnes & Noble": { Nook: 1 },
				BlackBerry: { PlayBook: 1 },
				Google: {
					"Google TV": 1,
					Nexus: 1
				},
				HP: { TouchPad: 1 },
				HTC: {},
				Huawei: {},
				Lenovo: {},
				LG: {},
				Microsoft: {
					Xbox: 1,
					"Xbox One": 1
				},
				Motorola: { Xoom: 1 },
				Nintendo: {
					"Wii U": 1,
					Wii: 1
				},
				Nokia: { Lumia: 1 },
				Oppo: {},
				Samsung: {
					"Galaxy S": 1,
					"Galaxy S2": 1,
					"Galaxy S3": 1,
					"Galaxy S4": 1
				},
				Sony: {
					PlayStation: 1,
					"PlayStation Vita": 1
				},
				Xiaomi: {
					Mi: 1,
					Redmi: 1
				}
			}), V = G([
				"Windows Phone",
				"KaiOS",
				"Android",
				"CentOS",
				{
					label: "Chrome OS",
					pattern: "CrOS"
				},
				"Debian",
				{
					label: "DragonFly BSD",
					pattern: "DragonFly"
				},
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
			function H(t) {
				return b(t, function(t, n) {
					return t || RegExp("\\b" + (n.pattern || y(n)) + "\\b", "i").exec(e) && (n.label || n);
				});
			}
			function U(t) {
				return b(t, function(t, n, r) {
					return t || (n[z] || n[/^[a-z]+(?: +[a-z]+\b)*/i.exec(z)] || RegExp("\\b" + y(r) + "(?:\\b|\\w*\\d)", "i").exec(e)) && r;
				});
			}
			function W(t) {
				return b(t, function(t, n) {
					return t || RegExp("\\b" + (n.pattern || y(n)) + "\\b", "i").exec(e) && (n.label || n);
				});
			}
			function G(t) {
				return b(t, function(t, n) {
					var r = n.pattern || y(n);
					return !t && (t = RegExp("\\b" + r + "(?:/[\\d.]+|[ \\w.]*)", "i").exec(e)) && (t = p(t, r, n.label || n)), t;
				});
			}
			function K(t) {
				return b(t, function(t, n) {
					var r = n.pattern || y(n);
					return !t && (t = RegExp("\\b" + r + " *\\d+[.\\w_]*", "i").exec(e) || RegExp("\\b" + r + " *\\w+-[\\w]*", "i").exec(e) || RegExp("\\b" + r + "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)", "i").exec(e)) && ((t = String(n.label && !RegExp(r, "i").test(n.label) ? n.label : t).split("/"))[1] && !/[\d.]+/.test(t[0]) && (t[0] += " " + t[1]), n = n.label || n, t = h(t[0].replace(RegExp(r, "i"), n).replace(RegExp("; *(?:" + n + "[_-])?", "i"), " ").replace(RegExp("(" + n + ")[-_.]?(\\w)", "i"), "$1 $2"))), t;
				});
			}
			function q(t) {
				return b(t, function(t, n) {
					return t || (RegExp(n + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)", "i").exec(e) || 0)[1] || null;
				});
			}
			function J() {
				return this.description || "";
			}
			if (L &&= [L], /\bAndroid\b/.test(V) && !z && (A = /\bAndroid[^;]*;(.*?)(?:Build|\) AppleWebKit)\b/i.exec(e)) && (z = x(A[1]).replace(/^[a-z]{2}-[a-z]{2};\s*/i, "") || null), B && !z ? z = K([B]) : B && z && (z = z.replace(RegExp("^(" + y(B) + ")[-_.\\s]", "i"), B + " ").replace(RegExp("^(" + y(B) + ")[-_.]?(\\w)", "i"), B + " $2")), (A = /\bGoogle TV\b/.exec(z)) && (z = A[0]), /\bSimulator\b/i.test(e) && (z = (z ? z + " " : "") + "Simulator"), R == "Opera Mini" && /\bOPiOS\b/.test(e) && M.push("running in Turbo/Uncompressed mode"), R == "IE" && /\blike iPhone OS\b/.test(e) ? (A = S(e.replace(/like iPhone OS/, "")), B = A.manufacturer, z = A.product) : /^iP/.test(z) ? (R ||= "Safari", V = "iOS" + ((A = / OS ([\d_]+)/i.exec(e)) ? " " + A[1].replace(/_/g, ".") : "")) : R == "Konqueror" && /^Linux\b/i.test(V) ? V = "Kubuntu" : B && B != "Google" && (/Chrome/.test(R) && !/\bMobile Safari\b/i.test(e) || /\bVita\b/.test(z)) || /\bAndroid\b/.test(V) && /^Chrome/.test(R) && /\bVersion\//i.test(e) ? (R = "Android Browser", V = /\bAndroid\b/.test(V) ? V : "Android") : R == "Silk" ? (/\bMobi/i.test(e) || (V = "Android", M.unshift("desktop mode")), /Accelerated *= *true/i.test(e) && M.unshift("accelerated")) : R == "UC Browser" && /\bUCWEB\b/.test(e) ? M.push("speed mode") : R == "PaleMoon" && (A = /\bFirefox\/([\d.]+)\b/.exec(e)) ? M.push("identifying as Firefox " + A[1]) : R == "Firefox" && (A = /\b(Mobile|Tablet|TV)\b/i.exec(e)) ? (V ||= "Firefox OS", z ||= A[1]) : !R || (A = !/\bMinefield\b/i.test(e) && /\b(?:Firefox|Safari)\b/.exec(R)) ? (R && !z && /[\/,]|^[^(]+?\)/.test(e.slice(e.indexOf(A + "/") + 8)) && (R = null), (A = z || B || V) && (z || B || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(V)) && (R = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(V) ? V : A) + " Browser")) : R == "Electron" && (A = (/\bChrome\/([\d.]+)\b/.exec(e) || 0)[1]) && M.push("Chromium " + A), F ||= q([
				"(?:Cloud9|CriOS|CrMo|Edge|Edg|EdgA|EdgiOS|FxiOS|HeadlessChrome|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$)|UCBrowser|YaBrowser)",
				"Version",
				y(R),
				"(?:Firefox|Minefield|NetFront)"
			]), (A = L == "iCab" && parseFloat(F) > 3 && "WebKit" || /\bOpera\b/.test(R) && (/\bOPR\b/.test(e) ? "Blink" : "Presto") || /\b(?:Midori|Nook|Safari)\b/i.test(e) && !/^(?:Trident|EdgeHTML)$/.test(L) && "WebKit" || !L && /\bMSIE\b/i.test(e) && (V == "Mac OS" ? "Tasman" : "Trident") || L == "WebKit" && /\bPlayStation\b(?! Vita\b)/i.test(R) && "NetFront") && (L = [A]), R == "IE" && (A = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(e) || 0)[1]) ? (R += " Mobile", V = "Windows Phone " + (/\+$/.test(A) ? A : A + ".x"), M.unshift("desktop mode")) : /\bWPDesktop\b/i.test(e) ? (R = "IE Mobile", V = "Windows Phone 8.x", M.unshift("desktop mode"), F ||= (/\brv:([\d.]+)/.exec(e) || 0)[1]) : R != "IE" && L == "Trident" && (A = /\brv:([\d.]+)/.exec(e)) && (R && M.push("identifying as " + R + (F ? " " + F : "")), R = "IE", F = A[1]), P) {
				if (v(t, "global")) if (C && (A = C.lang.System, j = A.getProperty("os.arch"), V ||= A.getProperty("os.name") + " " + A.getProperty("os.version")), w) {
					try {
						F = t.require("ringo/engine").version.join("."), R = "RingoJS";
					} catch {
						(A = t.system) && A.global.system == t.system && (R = "Narwhal", V ||= A[0].os || null);
					}
					R ||= "Rhino";
				} else typeof t.process == "object" && !t.process.browser && (A = t.process) && (typeof A.versions == "object" && (typeof A.versions.electron == "string" ? (M.push("Node " + A.versions.node), R = "Electron", F = A.versions.electron) : typeof A.versions.nw == "string" && (M.push("Chromium " + F, "Node " + A.versions.node), R = "NW.js", F = A.versions.nw)), R || (R = "Node.js", j = A.arch, V = A.platform, F = /[\d.]+/.exec(A.version), F = F ? F[0] : null));
				else _(A = t.runtime) == l ? (R = "Adobe AIR", V = A.flash.system.Capabilities.os) : _(A = t.phantom) == m ? (R = "PhantomJS", F = (A = A.version || null) && A.major + "." + A.minor + "." + A.patch) : typeof D.documentMode == "number" && (A = /\bTrident\/(\d+)/i.exec(e)) ? (F = [F, D.documentMode], (A = +A[1] + 4) != F[1] && (M.push("IE " + F[1] + " mode"), L && (L[1] = ""), F[1] = A), F = R == "IE" ? String(F[1].toFixed(1)) : F[0]) : typeof D.documentMode == "number" && /^(?:Chrome|Firefox)\b/.test(R) && (M.push("masking as " + R + " " + F), R = "IE", F = "11.0", L = ["Trident"], V = "Windows");
				V &&= h(V);
			}
			if (F && (A = /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(F) || /(?:alpha|beta)(?: ?\d)?/i.exec(e + ";" + (P && i.appMinorVersion)) || /\bMinefield\b/i.test(e) && "a") && (N = /b/i.test(A) ? "beta" : "alpha", F = F.replace(RegExp(A + "\\+?$"), "") + (N == "beta" ? E : T) + (/\d+\+?/.exec(A) || "")), R == "Fennec" || R == "Firefox" && /\b(?:Android|Firefox OS|KaiOS)\b/.test(V)) R = "Firefox Mobile";
			else if (R == "Maxthon" && F) F = F.replace(/\.[\d.]+/, ".x");
			else if (/\bXbox\b/i.test(z)) z == "Xbox 360" && (V = null), z == "Xbox 360" && /\bIEMobile\b/.test(e) && M.unshift("mobile mode");
			else if ((/^(?:Chrome|IE|Opera)$/.test(R) || R && !z && !/Browser|Mobi/.test(R)) && (V == "Windows CE" || /Mobi/i.test(e))) R += " Mobile";
			else if (R == "IE" && P) try {
				t.external === null && M.unshift("platform preview");
			} catch {
				M.unshift("embedded");
			}
			else (/\bBlackBerry\b/.test(z) || /\bBB10\b/.test(e)) && (A = (RegExp(z.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec(e) || 0)[1] || F) ? (A = [A, /BB10/.test(e)], V = (A[1] ? (z = null, B = "BlackBerry") : "Device Software") + " " + A[0], F = null) : this != g && z != "Wii" && (P && O || /Opera/.test(R) && /\b(?:MSIE|Firefox)\b/i.test(e) || R == "Firefox" && /\bOS X (?:\d+\.){2,}/.test(V) || R == "IE" && (V && !/^Win/.test(V) && F > 5.5 || /\bWindows XP\b/.test(V) && F > 8 || F == 8 && !/\bTrident\b/.test(e))) && !c.test(A = S.call(g, e.replace(c, "") + ";")) && A.name && (A = "ing as " + A.name + ((A = A.version) ? " " + A : ""), c.test(R) ? (/\bIE\b/.test(A) && V == "Mac OS" && (V = null), A = "identify" + A) : (A = "mask" + A, R = k ? h(k.replace(/([a-z])([A-Z])/g, "$1 $2")) : "Opera", /\bIE\b/.test(A) && (V = null), P || (F = null)), L = ["Presto"], M.push(A));
			(A = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(e) || 0)[1]) && (A = [parseFloat(A.replace(/\.(\d)$/, ".0$1")), A], R == "Safari" && A[1].slice(-1) == "+" ? (R = "WebKit Nightly", N = "alpha", F = A[1].slice(0, -1)) : (F == A[1] || F == (A[2] = (/\bSafari\/([\d.]+\+?)/i.exec(e) || 0)[1])) && (F = null), A[1] = (/\b(?:Headless)?Chrome\/([\d.]+)/i.exec(e) || 0)[1], A[0] == 537.36 && A[2] == 537.36 && parseFloat(A[1]) >= 28 && L == "WebKit" && (L = ["Blink"]), !P || !o && !A[1] ? (L && (L[1] = "like Safari"), A = (A = A[0], A < 400 ? 1 : A < 500 ? 2 : A < 526 ? 3 : A < 533 ? 4 : A < 534 ? "4+" : A < 535 ? 5 : A < 537 ? 6 : A < 538 ? 7 : A < 601 ? 8 : A < 602 ? 9 : A < 604 ? 10 : A < 606 ? 11 : A < 608 ? 12 : "12")) : (L && (L[1] = "like Chrome"), A = A[1] || (A = A[0], A < 530 ? 1 : A < 532 ? 2 : A < 532.05 ? 3 : A < 533 ? 4 : A < 534.03 ? 5 : A < 534.07 ? 6 : A < 534.1 ? 7 : A < 534.13 ? 8 : A < 534.16 ? 9 : A < 534.24 ? 10 : A < 534.3 ? 11 : A < 535.01 ? 12 : A < 535.02 ? "13+" : A < 535.07 ? 15 : A < 535.11 ? 16 : A < 535.19 ? 17 : A < 536.05 ? 18 : A < 536.1 ? 19 : A < 537.01 ? 20 : A < 537.11 ? "21+" : A < 537.13 ? 23 : A < 537.18 ? 24 : A < 537.24 ? 25 : A < 537.36 ? 26 : L == "Blink" ? "28" : "27")), L && (L[1] += " " + (A += typeof A == "number" ? ".x" : /[.+]/.test(A) ? "" : "+")), R == "Safari" && (!F || parseInt(F) > 45) ? F = A : R == "Chrome" && /\bHeadlessChrome/i.test(e) && M.unshift("headless")), R == "Opera" && (A = /\bzbov|zvav$/.exec(V)) ? (R += " ", M.unshift("desktop mode"), A == "zvav" ? (R += "Mini", F = null) : R += "Mobile", V = V.replace(RegExp(" *" + A + "$"), "")) : R == "Safari" && /\bChrome\b/.exec(L && L[1]) ? (M.unshift("desktop mode"), R = "Chrome Mobile", F = null, /\bOS X\b/.test(V) ? (B = "Apple", V = "iOS 4.3+") : V = null) : /\bSRWare Iron\b/.test(R) && !F && (F = q("Chrome")), F && F.indexOf(A = /[\d.]+$/.exec(V)) == 0 && e.indexOf("/" + A + "-") > -1 && (V = x(V.replace(A, ""))), V && V.indexOf(R) != -1 && !RegExp(R + " OS").test(V) && (V = V.replace(RegExp(" *" + y(R) + " *"), "")), L && !/\b(?:Avant|Nook)\b/.test(R) && (/Browser|Lunascape|Maxthon/.test(R) || R != "Safari" && /^iOS/.test(V) && /\bSafari\b/.test(L[1]) || /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|SRWare Iron|Vivaldi|Web)/.test(R) && L[1]) && (A = L[L.length - 1]) && M.push(A), M.length && (M = ["(" + M.join("; ") + ")"]), B && z && z.indexOf(B) < 0 && M.push("on " + B), z && M.push((/^on /.test(M[M.length - 1]) ? "" : "on ") + z), V &&= (A = / ([\d.+]+)$/.exec(V), I = A && V.charAt(V.length - A[0].length - 1) == "/", {
				architecture: 32,
				family: A && !I ? V.replace(A[0], "") : V,
				version: A ? A[1] : null,
				toString: function() {
					var e = this.version;
					return this.family + (e && !I ? " " + e : "") + (this.architecture == 64 ? " 64-bit" : "");
				}
			}), (A = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(j)) && !/\bi686\b/i.test(j) ? (V && (V.architecture = 64, V.family = V.family.replace(RegExp(" *" + A), "")), R && (/\bWOW64\b/i.test(e) || P && /\w(?:86|32)$/.test(i.cpuClass || i.platform) && !/\bWin64; x64\b/i.test(e)) && M.unshift("32-bit")) : V && /^OS X/.test(V.family) && R == "Chrome" && parseFloat(F) >= 39 && (V.architecture = 64), e ||= null;
			var Y = {};
			return Y.description = e, Y.layout = L && L[0], Y.manufacturer = B, Y.name = R, Y.prerelease = N, Y.product = z, Y.ua = e, Y.version = R && F, Y.os = V || {
				architecture: null,
				family: null,
				version: null,
				toString: function() {
					return "null";
				}
			}, Y.parse = S, Y.toString = J, Y.version && M.unshift(F), Y.name && M.unshift(R), V && R && !(V == String(V).split(" ")[0] && (V == R.split(" ")[0] || z)) && M.push(z ? "(" + V + ")" : "on " + V), M.length && (Y.description = M.join(" ")), Y;
		}
		var C = S();
		typeof define == "function" && typeof define.amd == "object" && define.amd ? (r.platform = C, define(function() {
			return C;
		})) : i && a ? g(C, function(e, t) {
			i[t] = e;
		}) : r.platform = C;
	}).call(e);
}));
export default require_platform();

//# sourceMappingURL=platform.js.map