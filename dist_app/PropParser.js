import { i as dt } from "./app2.js";
var lt = { exports: {} }, Ht = lt.exports, Ot;
function Xt() {
  return Ot || (Ot = 1, function(At, e) {
    (function(c, l) {
      At.exports = l();
    })(typeof self < "u" ? self : Ht, function() {
      return function(c) {
        var l = {};
        function v(o) {
          if (l[o]) return l[o].exports;
          var f = l[o] = { i: o, l: !1, exports: {} };
          return c[o].call(f.exports, f, f.exports, v), f.l = !0, f.exports;
        }
        return v.m = c, v.c = l, v.d = function(o, f, I) {
          v.o(o, f) || Object.defineProperty(o, f, { configurable: !1, enumerable: !0, get: I });
        }, v.r = function(o) {
          Object.defineProperty(o, "__esModule", { value: !0 });
        }, v.n = function(o) {
          var f = o && o.__esModule ? function() {
            return o.default;
          } : function() {
            return o;
          };
          return v.d(f, "a", f), f;
        }, v.o = function(o, f) {
          return Object.prototype.hasOwnProperty.call(o, f);
        }, v.p = "", v(v.s = 0);
      }([function(c, l, v) {
        function o(t) {
          if (!(this instanceof o)) return new o(t);
          this._ = t;
        }
        var f = o.prototype;
        function I(t, r) {
          for (var n = 0; n < t; n++) r(n);
        }
        function x(t, r, n) {
          return function(i, u) {
            I(u.length, function(s) {
              i(u[s], s, u);
            });
          }(function(i, u, s) {
            r = t(r, i, u, s);
          }, n), r;
        }
        function O(t, r) {
          return x(function(n, i, u, s) {
            return n.concat([t(i, u, s)]);
          }, [], r);
        }
        function ht(t, r) {
          var n = { v: 0, buf: r };
          return I(t, function() {
            var i;
            n = { v: n.v << 1 | (i = n.buf, i[0] >> 7), buf: function(u) {
              var s = x(function(a, h, b, S) {
                return a.concat(b === S.length - 1 ? Buffer.from([h, 0]).readUInt16BE(0) : S.readUInt16BE(b));
              }, [], u);
              return Buffer.from(O(function(a) {
                return (a << 1 & 65535) >> 8;
              }, s));
            }(n.buf) };
          }), n;
        }
        function tt() {
          return typeof Buffer < "u";
        }
        function D() {
          if (!tt()) throw new Error("Buffer global does not exist; please use webpack if you need to parse Buffers in the browser.");
        }
        function rt(t) {
          D();
          var r = x(function(s, a) {
            return s + a;
          }, 0, t);
          if (r % 8 != 0) throw new Error("The bits [" + t.join(", ") + "] add up to " + r + " which is not an even number of bytes; the total should be divisible by 8");
          var n, i = r / 8, u = (n = function(s) {
            return s > 48;
          }, x(function(s, a) {
            return s || (n(a) ? a : s);
          }, null, t));
          if (u) throw new Error(u + " bit range requested exceeds 48 bit (6 byte) Number max.");
          return new o(function(s, a) {
            var h = i + a;
            return h > s.length ? B(a, i.toString() + " bytes") : d(h, x(function(b, S) {
              var N = ht(S, b.buf);
              return { coll: b.coll.concat(N.v), buf: N.buf };
            }, { coll: [], buf: s.slice(a, h) }, t).coll);
          });
        }
        function P(t, r) {
          return new o(function(n, i) {
            return D(), i + r > n.length ? B(i, r + " bytes for " + t) : d(i + r, n.slice(i, i + r));
          });
        }
        function W(t, r) {
          if (typeof (n = r) != "number" || Math.floor(n) !== n || r < 0 || r > 6) throw new Error(t + " requires integer length in range [0, 6].");
          var n;
        }
        function Z(t) {
          return W("uintBE", t), P("uintBE(" + t + ")", t).map(function(r) {
            return r.readUIntBE(0, t);
          });
        }
        function $(t) {
          return W("uintLE", t), P("uintLE(" + t + ")", t).map(function(r) {
            return r.readUIntLE(0, t);
          });
        }
        function p(t) {
          return W("intBE", t), P("intBE(" + t + ")", t).map(function(r) {
            return r.readIntBE(0, t);
          });
        }
        function y(t) {
          return W("intLE", t), P("intLE(" + t + ")", t).map(function(r) {
            return r.readIntLE(0, t);
          });
        }
        function g(t) {
          return t instanceof o;
        }
        function E(t) {
          return {}.toString.call(t) === "[object Array]";
        }
        function L(t) {
          return tt() && Buffer.isBuffer(t);
        }
        function d(t, r) {
          return { status: !0, index: t, value: r, furthest: -1, expected: [] };
        }
        function B(t, r) {
          return E(r) || (r = [r]), { status: !1, index: -1, value: null, furthest: t, expected: r };
        }
        function j(t, r) {
          if (!r || t.furthest > r.furthest) return t;
          var n = t.furthest === r.furthest ? function(i, u) {
            if (function() {
              if (o._supportsSet !== void 0) return o._supportsSet;
              var q = typeof Set < "u";
              return o._supportsSet = q, q;
            }() && Array.from) {
              for (var s = new Set(i), a = 0; a < u.length; a++) s.add(u[a]);
              var h = Array.from(s);
              return h.sort(), h;
            }
            for (var b = {}, S = 0; S < i.length; S++) b[i[S]] = !0;
            for (var N = 0; N < u.length; N++) b[u[N]] = !0;
            var k = [];
            for (var _ in b) ({}).hasOwnProperty.call(b, _) && k.push(_);
            return k.sort(), k;
          }(t.expected, r.expected) : r.expected;
          return { status: t.status, index: t.index, value: t.value, furthest: r.furthest, expected: n };
        }
        var nt = {};
        function bt(t, r) {
          if (L(t)) return { offset: r, line: -1, column: -1 };
          t in nt || (nt[t] = {});
          for (var n = nt[t], i = 0, u = 0, s = 0, a = r; a >= 0; ) {
            if (a in n) {
              i = n[a].line, s === 0 && (s = n[a].lineStart);
              break;
            }
            (t.charAt(a) === `
` || t.charAt(a) === "\r" && t.charAt(a + 1) !== `
`) && (u++, s === 0 && (s = a + 1)), a--;
          }
          var h = i + u, b = r - s;
          return n[r] = { line: h, lineStart: s }, { offset: r, line: h + 1, column: b + 1 };
        }
        function G(t) {
          if (!g(t)) throw new Error("not a parser: " + t);
        }
        function et(t, r) {
          return typeof t == "string" ? t.charAt(r) : t[r];
        }
        function U(t) {
          if (typeof t != "number") throw new Error("not a number: " + t);
        }
        function M(t) {
          if (typeof t != "function") throw new Error("not a function: " + t);
        }
        function J(t) {
          if (typeof t != "string") throw new Error("not a string: " + t);
        }
        var kt = 2, qt = 3, R = 8, It = 5 * R, Rt = 4 * R, yt = "  ";
        function it(t, r) {
          return new Array(r + 1).join(t);
        }
        function ot(t, r, n) {
          var i = r - t.length;
          return i <= 0 ? t : it(n, i) + t;
        }
        function vt(t, r, n, i) {
          return { from: t - r > 0 ? t - r : 0, to: t + n > i ? i : t + n };
        }
        function Mt(t, r) {
          var n, i, u, s, a, h = r.index, b = h.offset, S = 1;
          if (b === t.length) return "Got the end of the input";
          if (L(t)) {
            var N = b - b % R, k = b - N, _ = vt(N, It, Rt + R, t.length), q = O(function(w) {
              return O(function(C) {
                return ot(C.toString(16), 2, "0");
              }, w);
            }, function(w, C) {
              var H = w.length, V = [], X = 0;
              if (H <= C) return [w.slice()];
              for (var Y = 0; Y < H; Y++) V[X] || V.push([]), V[X].push(w[Y]), (Y + 1) % C == 0 && X++;
              return V;
            }(t.slice(_.from, _.to).toJSON().data, R));
            s = function(w) {
              return w.from === 0 && w.to === 1 ? { from: w.from, to: w.to } : { from: w.from / R, to: Math.floor(w.to / R) };
            }(_), i = N / R, n = 3 * k, k >= 4 && (n += 1), S = 2, u = O(function(w) {
              return w.length <= 4 ? w.join(" ") : w.slice(0, 4).join(" ") + "  " + w.slice(4).join(" ");
            }, q), (a = (8 * (s.to > 0 ? s.to - 1 : s.to)).toString(16).length) < 2 && (a = 2);
          } else {
            var T = t.split(/\r\n|[\n\r\u2028\u2029]/);
            n = h.column - 1, i = h.line - 1, s = vt(i, kt, qt, T.length), u = T.slice(s.from, s.to), a = s.to.toString().length;
          }
          var Ct = i - s.from;
          return L(t) && (a = (8 * (s.to > 0 ? s.to - 1 : s.to)).toString(16).length) < 2 && (a = 2), x(function(w, C, H) {
            var V, X = H === Ct, Y = X ? "> " : yt;
            return V = L(t) ? ot((8 * (s.from + H)).toString(16), a, "0") : ot((s.from + H + 1).toString(), a, " "), [].concat(w, [Y + V + " | " + C], X ? [yt + it(" ", a) + " | " + ot("", n, " ") + it("^", S)] : []);
          }, [], u).join(`
`);
        }
        function Et(t, r) {
          return [`
`, "-- PARSING FAILED " + it("-", 50), `

`, Mt(t, r), `

`, (n = r.expected, n.length === 1 ? `Expected:

` + n[0] : `Expected one of the following: 

` + n.join(", ")), `
`].join("");
          var n;
        }
        function wt(t) {
          return t.flags !== void 0 ? t.flags : [t.global ? "g" : "", t.ignoreCase ? "i" : "", t.multiline ? "m" : "", t.unicode ? "u" : "", t.sticky ? "y" : ""].join("");
        }
        function ut() {
          for (var t = [].slice.call(arguments), r = t.length, n = 0; n < r; n += 1) G(t[n]);
          return o(function(i, u) {
            for (var s, a = new Array(r), h = 0; h < r; h += 1) {
              if (!(s = j(t[h]._(i, u), s)).status) return s;
              a[h] = s.value, u = s.index;
            }
            return j(d(u, a), s);
          });
        }
        function F() {
          var t = [].slice.call(arguments);
          if (t.length === 0) throw new Error("seqMap needs at least one argument");
          var r = t.pop();
          return M(r), ut.apply(null, t).map(function(n) {
            return r.apply(null, n);
          });
        }
        function st() {
          var t = [].slice.call(arguments), r = t.length;
          if (r === 0) return at("zero alternates");
          for (var n = 0; n < r; n += 1) G(t[n]);
          return o(function(i, u) {
            for (var s, a = 0; a < t.length; a += 1) if ((s = j(t[a]._(i, u), s)).status) return s;
            return s;
          });
        }
        function xt(t, r) {
          return pt(t, r).or(z([]));
        }
        function pt(t, r) {
          return G(t), G(r), F(t, r.then(t).many(), function(n, i) {
            return [n].concat(i);
          });
        }
        function K(t) {
          J(t);
          var r = "'" + t + "'";
          return o(function(n, i) {
            var u = i + t.length, s = n.slice(i, u);
            return s === t ? d(u, s) : B(i, r);
          });
        }
        function A(t, r) {
          (function(u) {
            if (!(u instanceof RegExp)) throw new Error("not a regexp: " + u);
            for (var s = wt(u), a = 0; a < s.length; a++) {
              var h = s.charAt(a);
              if (h !== "i" && h !== "m" && h !== "u" && h !== "s") throw new Error('unsupported regexp flag "' + h + '": ' + u);
            }
          })(t), arguments.length >= 2 ? U(r) : r = 0;
          var n = function(u) {
            return RegExp("^(?:" + u.source + ")", wt(u));
          }(t), i = "" + t;
          return o(function(u, s) {
            var a = n.exec(u.slice(s));
            if (a) {
              if (0 <= r && r <= a.length) {
                var h = a[0], b = a[r];
                return d(s + h.length, b);
              }
              return B(s, "valid match group (0 to " + a.length + ") in " + i);
            }
            return B(s, i);
          });
        }
        function z(t) {
          return o(function(r, n) {
            return d(n, t);
          });
        }
        function at(t) {
          return o(function(r, n) {
            return B(n, t);
          });
        }
        function ft(t) {
          if (g(t)) return o(function(r, n) {
            var i = t._(r, n);
            return i.index = n, i.value = "", i;
          });
          if (typeof t == "string") return ft(K(t));
          if (t instanceof RegExp) return ft(A(t));
          throw new Error("not a string, regexp, or parser: " + t);
        }
        function Nt(t) {
          return G(t), o(function(r, n) {
            var i = t._(r, n), u = r.slice(n, i.index);
            return i.status ? B(n, 'not "' + u + '"') : d(n, null);
          });
        }
        function ct(t) {
          return M(t), o(function(r, n) {
            var i = et(r, n);
            return n < r.length && t(i) ? d(n + 1, i) : B(n, "a character/byte matching " + t);
          });
        }
        function St(t, r) {
          arguments.length < 2 && (r = t, t = void 0);
          var n = o(function(i, u) {
            return n._ = r()._, n._(i, u);
          });
          return t ? n.desc(t) : n;
        }
        function mt() {
          return at("fantasy-land/empty");
        }
        f.parse = function(t) {
          if (typeof t != "string" && !L(t)) throw new Error(".parse must be called with a string or Buffer as its argument");
          var r, n = this.skip(gt)._(t, 0);
          return r = n.status ? { status: !0, value: n.value } : { status: !1, index: bt(t, n.furthest), expected: n.expected }, delete nt[t], r;
        }, f.tryParse = function(t) {
          var r = this.parse(t);
          if (r.status) return r.value;
          var n = Et(t, r), i = new Error(n);
          throw i.type = "ParsimmonError", i.result = r, i;
        }, f.assert = function(t, r) {
          return this.chain(function(n) {
            return t(n) ? z(n) : at(r);
          });
        }, f.or = function(t) {
          return st(this, t);
        }, f.trim = function(t) {
          return this.wrap(t, t);
        }, f.wrap = function(t, r) {
          return F(t, this, r, function(n, i) {
            return i;
          });
        }, f.thru = function(t) {
          return t(this);
        }, f.then = function(t) {
          return G(t), ut(this, t).map(function(r) {
            return r[1];
          });
        }, f.many = function() {
          var t = this;
          return o(function(r, n) {
            for (var i = [], u = void 0; ; ) {
              if (!(u = j(t._(r, n), u)).status) return j(d(n, i), u);
              if (n === u.index) throw new Error("infinite loop detected in .many() parser --- calling .many() on a parser which can accept zero characters is usually the cause");
              n = u.index, i.push(u.value);
            }
          });
        }, f.tieWith = function(t) {
          return J(t), this.map(function(r) {
            if (function(u) {
              if (!E(u)) throw new Error("not an array: " + u);
            }(r), r.length) {
              J(r[0]);
              for (var n = r[0], i = 1; i < r.length; i++) J(r[i]), n += t + r[i];
              return n;
            }
            return "";
          });
        }, f.tie = function() {
          return this.tieWith("");
        }, f.times = function(t, r) {
          var n = this;
          return arguments.length < 2 && (r = t), U(t), U(r), o(function(i, u) {
            for (var s = [], a = void 0, h = void 0, b = 0; b < t; b += 1) {
              if (h = j(a = n._(i, u), h), !a.status) return h;
              u = a.index, s.push(a.value);
            }
            for (; b < r && (h = j(a = n._(i, u), h), a.status); b += 1) u = a.index, s.push(a.value);
            return j(d(u, s), h);
          });
        }, f.result = function(t) {
          return this.map(function() {
            return t;
          });
        }, f.atMost = function(t) {
          return this.times(0, t);
        }, f.atLeast = function(t) {
          return F(this.times(t), this.many(), function(r, n) {
            return r.concat(n);
          });
        }, f.map = function(t) {
          M(t);
          var r = this;
          return o(function(n, i) {
            var u = r._(n, i);
            return u.status ? j(d(u.index, t(u.value)), u) : u;
          });
        }, f.contramap = function(t) {
          M(t);
          var r = this;
          return o(function(n, i) {
            var u = r.parse(t(n.slice(i)));
            return u.status ? d(i + n.length, u.value) : u;
          });
        }, f.promap = function(t, r) {
          return M(t), M(r), this.contramap(t).map(r);
        }, f.skip = function(t) {
          return ut(this, t).map(function(r) {
            return r[0];
          });
        }, f.mark = function() {
          return F(Q, this, Q, function(t, r, n) {
            return { start: t, value: r, end: n };
          });
        }, f.node = function(t) {
          return F(Q, this, Q, function(r, n, i) {
            return { name: t, value: n, start: r, end: i };
          });
        }, f.sepBy = function(t) {
          return xt(this, t);
        }, f.sepBy1 = function(t) {
          return pt(this, t);
        }, f.lookahead = function(t) {
          return this.skip(ft(t));
        }, f.notFollowedBy = function(t) {
          return this.skip(Nt(t));
        }, f.desc = function(t) {
          E(t) || (t = [t]);
          var r = this;
          return o(function(n, i) {
            var u = r._(n, i);
            return u.status || (u.expected = t), u;
          });
        }, f.fallback = function(t) {
          return this.or(z(t));
        }, f.ap = function(t) {
          return F(t, this, function(r, n) {
            return r(n);
          });
        }, f.chain = function(t) {
          var r = this;
          return o(function(n, i) {
            var u = r._(n, i);
            return u.status ? j(t(u.value)._(n, u.index), u) : u;
          });
        }, f.concat = f.or, f.empty = mt, f.of = z, f["fantasy-land/ap"] = f.ap, f["fantasy-land/chain"] = f.chain, f["fantasy-land/concat"] = f.concat, f["fantasy-land/empty"] = f.empty, f["fantasy-land/of"] = f.of, f["fantasy-land/map"] = f.map;
        var Q = o(function(t, r) {
          return d(r, bt(t, r));
        }), Ft = o(function(t, r) {
          return r >= t.length ? B(r, "any character/byte") : d(r + 1, et(t, r));
        }), zt = o(function(t, r) {
          return d(t.length, t.slice(r));
        }), gt = o(function(t, r) {
          return r < t.length ? B(r, "EOF") : d(r, null);
        }), Vt = A(/[0-9]/).desc("a digit"), Dt = A(/[0-9]*/).desc("optional digits"), Wt = A(/[a-z]/i).desc("a letter"), $t = A(/[a-z]*/i).desc("optional letters"), Gt = A(/\s*/).desc("optional whitespace"), Ut = A(/\s+/).desc("whitespace"), Bt = K("\r"), _t = K(`
`), Pt = K(`\r
`), jt = st(Pt, _t, Bt).desc("newline"), Tt = st(jt, gt);
        o.all = zt, o.alt = st, o.any = Ft, o.cr = Bt, o.createLanguage = function(t) {
          var r = {};
          for (var n in t) ({}).hasOwnProperty.call(t, n) && function(i) {
            r[i] = St(function() {
              return t[i](r);
            });
          }(n);
          return r;
        }, o.crlf = Pt, o.custom = function(t) {
          return o(t(d, B));
        }, o.digit = Vt, o.digits = Dt, o.empty = mt, o.end = Tt, o.eof = gt, o.fail = at, o.formatError = Et, o.index = Q, o.isParser = g, o.lazy = St, o.letter = Wt, o.letters = $t, o.lf = _t, o.lookahead = ft, o.makeFailure = B, o.makeSuccess = d, o.newline = jt, o.noneOf = function(t) {
          return ct(function(r) {
            return t.indexOf(r) < 0;
          }).desc("none of '" + t + "'");
        }, o.notFollowedBy = Nt, o.of = z, o.oneOf = function(t) {
          for (var r = t.split(""), n = 0; n < r.length; n++) r[n] = "'" + r[n] + "'";
          return ct(function(i) {
            return t.indexOf(i) >= 0;
          }).desc(r);
        }, o.optWhitespace = Gt, o.Parser = o, o.range = function(t, r) {
          return ct(function(n) {
            return t <= n && n <= r;
          }).desc(t + "-" + r);
        }, o.regex = A, o.regexp = A, o.sepBy = xt, o.sepBy1 = pt, o.seq = ut, o.seqMap = F, o.seqObj = function() {
          for (var t, r = {}, n = 0, i = (t = arguments, Array.prototype.slice.call(t)), u = i.length, s = 0; s < u; s += 1) {
            var a = i[s];
            if (!g(a)) {
              if (E(a) && a.length === 2 && typeof a[0] == "string" && g(a[1])) {
                var h = a[0];
                if (Object.prototype.hasOwnProperty.call(r, h)) throw new Error("seqObj: duplicate key " + h);
                r[h] = !0, n++;
                continue;
              }
              throw new Error("seqObj arguments must be parsers or [string, parser] array pairs.");
            }
          }
          if (n === 0) throw new Error("seqObj expects at least one named parser, found zero");
          return o(function(b, S) {
            for (var N, k = {}, _ = 0; _ < u; _ += 1) {
              var q, T;
              if (E(i[_]) ? (q = i[_][0], T = i[_][1]) : (q = null, T = i[_]), !(N = j(T._(b, S), N)).status) return N;
              q && (k[q] = N.value), S = N.index;
            }
            return j(d(S, k), N);
          });
        }, o.string = K, o.succeed = z, o.takeWhile = function(t) {
          return M(t), o(function(r, n) {
            for (var i = n; i < r.length && t(et(r, i)); ) i++;
            return d(i, r.slice(n, i));
          });
        }, o.test = ct, o.whitespace = Ut, o["fantasy-land/empty"] = mt, o["fantasy-land/of"] = z, o.Binary = { bitSeq: rt, bitSeqObj: function(t) {
          D();
          var r = {}, n = 0, i = O(function(s) {
            if (E(s)) {
              var a = s;
              if (a.length !== 2) throw new Error("[" + a.join(", ") + "] should be length 2, got length " + a.length);
              if (J(a[0]), U(a[1]), Object.prototype.hasOwnProperty.call(r, a[0])) throw new Error("duplicate key in bitSeqObj: " + a[0]);
              return r[a[0]] = !0, n++, a;
            }
            return U(s), [null, s];
          }, t);
          if (n < 1) throw new Error("bitSeqObj expects at least one named pair, got [" + t.join(", ") + "]");
          var u = O(function(s) {
            return s[0];
          }, i);
          return rt(O(function(s) {
            return s[1];
          }, i)).map(function(s) {
            return x(function(a, h) {
              return h[0] !== null && (a[h[0]] = h[1]), a;
            }, {}, O(function(a, h) {
              return [a, s[h]];
            }, u));
          });
        }, byte: function(t) {
          if (D(), U(t), t > 255) throw new Error("Value specified to byte constructor (" + t + "=0x" + t.toString(16) + ") is larger in value than a single byte.");
          var r = (t > 15 ? "0x" : "0x0") + t.toString(16);
          return o(function(n, i) {
            var u = et(n, i);
            return u === t ? d(i + 1, u) : B(i, r);
          });
        }, buffer: function(t) {
          return P("buffer", t).map(function(r) {
            return Buffer.from(r);
          });
        }, encodedString: function(t, r) {
          return P("string", r).map(function(n) {
            return n.toString(t);
          });
        }, uintBE: Z, uint8BE: Z(1), uint16BE: Z(2), uint32BE: Z(4), uintLE: $, uint8LE: $(1), uint16LE: $(2), uint32LE: $(4), intBE: p, int8BE: p(1), int16BE: p(2), int32BE: p(4), intLE: y, int8LE: y(1), int16LE: y(2), int32LE: y(4), floatBE: P("floatBE", 4).map(function(t) {
          return t.readFloatBE(0);
        }), floatLE: P("floatLE", 4).map(function(t) {
          return t.readFloatLE(0);
        }), doubleBE: P("doubleBE", 8).map(function(t) {
          return t.readDoubleBE(0);
        }), doubleLE: P("doubleLE", 8).map(function(t) {
          return t.readDoubleLE(0);
        }) }, c.exports = o;
      }]);
    });
  }(lt)), lt.exports;
}
var m = Xt();
class Lt {
  constructor(e, c = "\\") {
    this.val = e;
    function l(p) {
      const y = [];
      for (const g of p) y.push(
        (typeof g == "string" ? m.string(g) : m.regex(g)).trim(m.optWhitespace)
      );
      return m.alt.apply(null, y);
    }
    function v(p) {
      let g = Object.keys(p).sort().map(
        (E) => (typeof p[E] == "string" ? m.string(p[E]) : m.regex(p[E])).trim(m.optWhitespace).result(E)
      );
      return m.alt.apply(null, g);
    }
    function o(p, y) {
      const g = m.lazy(() => m.seq(p, g).or(y));
      return g;
    }
    function f(p, y) {
      return m.seqMap(y, p.many(), (g, E) => E.reduce((L, d) => [d, L], g));
    }
    function I(p, y) {
      let g = m.lazy(
        () => y.chain(
          (E) => m.seq(
            p,
            m.of(E),
            g
          ).or(m.of(E))
        )
      );
      return g;
    }
    function x(p, y) {
      return m.seqMap(
        y,
        m.seq(p, y).many(),
        (g, E) => E.reduce((L, d) => [d[0], L, d[1]], g)
      );
    }
    const O = m.alt(
      m.alt(
        m.regex(/-?(0|[1-9][0-9]*)\.[0-9]+/),
        m.regex(/0x[0-9a-fA-F]+/)
      ).map(Number),
      m.alt(
        m.regex(/-?(0|[1-9][0-9]*)/)
      ).map((p) => dt(p))
    ).map((p) => ["!num!", p]).desc("number"), ht = m.string("null").map(() => ["!str!", null]), tt = m.regex(/(true|false)/).map((p) => ["!bool!", p === "true"]).desc("boolean"), D = m.regex(new RegExp(`(?:"(?:\\${c}["'#\\n]|[^"])*"|'(?:\\${c}["'#\\n]|[^'])*'|\\#(?:\\${c}["'#\\n]|[^#])*\\#)`)).map((p) => ["!str!", p.slice(1, -1).replaceAll(c, "")]).desc("string"), rt = /\[[^\]]+\]/g, P = m.regex(/-?(?:(?:tmp|sys|save|mp):)?[^\s!-\/:-@[-^`{-~]+(?:\.[^\s!-\/:-@[-^`{-~]+|\[[^\]]+\])*(?:@str)?/).map((p) => {
      const y = String(p).replaceAll(
        rt,
        (E) => "." + this.parse(E.slice(1, -1))
      ), g = this.val.getVal(y);
      return g == null ? ["!str!", g] : typeof g == "boolean" ? ["!bool!", g] : Object.prototype.toString.call(g) === "[object String]" ? ["!str!", String(g)] : ["!num!", Number(g)];
    }).desc("string"), W = m.lazy(
      () => m.string("(").then(this.#e).skip(m.string(")")).or(O).or(ht).or(tt).or(D).or(P)
    ), $ = [
      // 演算子の優先順位 - JavaScript | MDN https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Operator_precedence
      // 優先順位：18（メンバーへのアクセス、計算値によるメンバーへのアクセス）
      // a.b  a[b]
      { type: o, ops: l([/[A-Za-z_][A-Za-z0-9_]*(?=\()/]) },
      // 優先順位：16
      { type: f, ops: v({ PostfixInc: "++" }) },
      { type: f, ops: v({ PostfixDec: "--" }) },
      // 【未サポート】後置インクリメント・デクリメント
      // 優先順位：15
      { type: o, ops: l([/!(?!=)|~/]) },
      // 論理 NOT (!)、ビット単位 NOT (~)
      { type: o, ops: v({ PrefixInc: "++" }) },
      { type: o, ops: v({ PrefixDec: "--" }) },
      // 【未サポート】前置インクリメント・デクリメント
      //	{type: PREFIX, ops: opeH({Unaryplus: /\+(?!\+)/})},	// 単項プラス
      { type: o, ops: v({ UnaryNegate: /-(?!-)/ }) },
      // 単項マイナス
      // 優先順位：14以下（並びに注意）
      { type: I, ops: l(["**"]) },
      { type: x, ops: l(["*", "/", "¥", "%"]) },
      { type: x, ops: l(["+", "-"]) },
      { type: x, ops: l([/>>>|<<|>>/]) },
      { type: x, ops: l([/<=|<|>=|>/]) },
      { type: x, ops: l([/===|!==|==|!=/]) },
      { type: x, ops: l([/&(?!&)/]) },
      { type: x, ops: l(["^"]) },
      { type: x, ops: l([/\|(?!\|)/]) },
      { type: x, ops: l(["&&"]) },
      { type: x, ops: l(["||"]) },
      { type: I, ops: l([":"]) },
      { type: I, ops: l(["?"]) }
    ].reduce(
      (p, y) => y.type(y.ops, p),
      W
    );
    this.#e = $.trim(m.optWhitespace);
  }
  #e = null;
  parse(e) {
    const c = this.#e.parse(e);
    if (!c.status) throw Error("(PropParser)文法エラー【" + e + "】");
    const l = c.value;
    return l[0] === "!str!" ? this.#i(l[1]) : this.#t(l);
  }
  #t(e) {
    const c = e.shift();
    if (c instanceof Array) return this.#t(c);
    const l = this.#r[c];
    return l ? l(e) : Object(null);
  }
  #r = {
    "!num!": (e) => e.shift(),
    "!str!": (e) => this.#i(e.shift()),
    "!bool!": (e) => e.shift(),
    PostfixInc: (e) => {
      throw Error("(PropParser)後置インクリメントは未サポートです");
    },
    PostfixDec: (e) => {
      throw Error("(PropParser)後置デクリメントは未サポートです");
    },
    PrefixInc: (e) => {
      throw Error("(PropParser)前置インクリメントは未サポートです");
    },
    PrefixDec: (e) => {
      throw Error("(PropParser)前置デクリメントは未サポートです");
    },
    // 論理 NOT
    "!": (e) => !this.#r.Boolean(e),
    // チルダ演算子（ビット反転）
    "~": (e) => ~Number(this.#t(e.shift())),
    //		UnaryNegate:	a=> - Number(this.#calc(a.shift())),
    UnaryNegate: (e) => -this.#r.Number(e),
    //	Unaryplus:		a=> this.#hFnc['Number'](a),
    // 乗算、除算、剰余
    "**": (e) => Number(this.#t(e.shift())) ** Number(this.#t(e.shift())),
    "*": (e) => Number(this.#t(e.shift())) * Number(this.#t(e.shift())),
    "/": (e) => Number(this.#t(e.shift())) / Number(this.#t(e.shift())),
    "¥": (e) => Math.floor(this.#r["/"](e)),
    "%": (e) => Number(this.#t(e.shift())) % Number(this.#t(e.shift())),
    // 加算、減算、文字列の連結
    "+": (e) => {
      const c = this.#t(e.shift()), l = this.#t(e.shift());
      return Object.prototype.toString.call(c) === "[object String]" || Object.prototype.toString.call(l) === "[object String]" ? String(c) + String(l) : Number(c) + Number(l);
    },
    "-": (e) => Number(this.#t(e.shift())) - Number(this.#t(e.shift())),
    // 関数
    int: (e) => dt(this.#n(e.shift())),
    parseInt: (e) => dt(this.#r.Number(e)),
    Number: (e) => {
      const c = this.#t(e.shift());
      return Object.prototype.toString.call(c) === "[object String]" ? this.#n(this.#e.parse(String(c)).value) : Number(c);
    },
    Boolean: (e) => {
      const c = e.shift();
      return c[0] === "!bool!" ? !!c[1] : !!this.#t(c);
    },
    ceil: (e) => Math.ceil(this.#n(e.shift())),
    floor: (e) => Math.floor(this.#n(e.shift())),
    round: (e) => Math.round(this.#n(e.shift())),
    isNaN: (e) => Number.isNaN(this.#n(e.shift())),
    // ビットシフト
    "<<": (e) => Number(this.#t(e.shift())) << Number(this.#t(e.shift())),
    ">>": (e) => Number(this.#t(e.shift())) >> Number(this.#t(e.shift())),
    ">>>": (e) => Number(this.#t(e.shift())) >>> Number(this.#t(e.shift())),
    // 等値、非等値、厳密等価、厳密非等価
    "<": (e) => Number(this.#t(e.shift())) < Number(this.#t(e.shift())),
    "<=": (e) => Number(this.#t(e.shift())) <= Number(this.#t(e.shift())),
    ">": (e) => Number(this.#t(e.shift())) > Number(this.#t(e.shift())),
    ">=": (e) => Number(this.#t(e.shift())) >= Number(this.#t(e.shift())),
    // 小なり、以下、大なり、以上
    "==": (e) => {
      const c = this.#t(e.shift()), l = this.#t(e.shift());
      return c == null && l == null && (!c || !l) ? c == l : String(c) === String(l);
    },
    "!=": (e) => !this.#r["=="](e),
    "===": (e) => {
      const c = this.#t(e.shift()), l = this.#t(e.shift());
      return Object.prototype.toString.call(c) != Object.prototype.toString.call(l) ? !1 : String(c) === String(l);
    },
    "!==": (e) => !this.#r["==="](e),
    // ビット演算子
    "&": (e) => Number(this.#t(e.shift())) & Number(this.#t(e.shift())),
    "^": (e) => Number(this.#t(e.shift())) ^ Number(this.#t(e.shift())),
    "|": (e) => Number(this.#t(e.shift())) | Number(this.#t(e.shift())),
    // 論理 AND,OR
    "&&": (e) => String(this.#t(e.shift())) === "true" && String(this.#t(e.shift())) === "true",
    "||": (e) => String(this.#t(e.shift())) === "true" || String(this.#t(e.shift())) === "true",
    // 条件
    "?": (e) => {
      const c = this.#r.Boolean(e), l = e.shift();
      if (l[0] !== ":") throw Error("(PropParser)三項演算子の文法エラーです。: が見つかりません");
      return this.#t(l[c ? 1 : 2]);
    },
    ":": () => {
      throw Error("(PropParser)三項演算子の文法エラーです。? が見つかりません");
    }
  };
  #n(e) {
    const c = this.#t(e);
    if (Object.prototype.toString.call(c) !== "[object Number]") throw Error("(PropParser)引数【" + c + "】が数値ではありません");
    return Number(c);
  }
  #o = /(\$((tmp|sys|save|mp):)?[^\s!--\/:-@[-^`{-~]+|\#\{[^\}]+})/g;
  #i(e) {
    return e == null ? e : String(e).replaceAll(
      this.#o,
      (c) => c.startsWith("$") ? this.val.getVal(c.slice(1)) : this.parse(c.slice(2, -1))
    );
  }
  getValAmpersand = (e) => e.startsWith("&") ? String(this.parse(e.slice(1))) : e;
  static #u = /^((?<scope>\w+?):)?(?<name>[^\s :@]+)(?<at>\@str)?$/;
  // 522 match 18413 step(~10ms) https://regex101.com/r/tmCKuE/1
  // →これは改良しようがない。いい意味で改善の余地なし
  static getValName(e) {
    const l = this.#u.exec(e.trim())?.groups;
    if (!l) return null;
    const { scope: v = "tmp", name: o, at: f = "" } = l;
    return {
      scope: v,
      name: Lt.#s(o),
      at: f
    };
  }
  static #s(e) {
    let c = 0, l = 0;
    for (; ; ) {
      if (c = e.indexOf('["'), c < 0) {
        if (c = e.indexOf("['"), c < 0) break;
        l = e.indexOf("']", c + 2);
      } else
        l = e.indexOf('"]', c + 2);
      if (l < 0) break;
      e = e.slice(0, c) + "." + e.slice(c + 2, l) + e.slice(l + 2), c = l - 2;
    }
    return e;
  }
}
export {
  Lt as PropParser
};
//# sourceMappingURL=PropParser.js.map
