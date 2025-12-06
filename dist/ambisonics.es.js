var commonjsGlobal = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, numeric1_2_6 = {};
(function(exports$1) {
  var numeric = exports$1;
  typeof commonjsGlobal < "u" && (commonjsGlobal.numeric = numeric), numeric.version = "1.2.6", numeric.bench = function(t, n) {
    var e, i, s, r;
    for (typeof n > "u" && (n = 15), s = 0.5, e = /* @__PURE__ */ new Date(); ; ) {
      for (s *= 2, r = s; r > 3; r -= 4)
        t(), t(), t(), t();
      for (; r > 0; )
        t(), r--;
      if (i = /* @__PURE__ */ new Date(), i - e > n) break;
    }
    for (r = s; r > 3; r -= 4)
      t(), t(), t(), t();
    for (; r > 0; )
      t(), r--;
    return i = /* @__PURE__ */ new Date(), 1e3 * (3 * s - 1) / (i - e);
  }, numeric._myIndexOf = function(t) {
    var n = this.length, e;
    for (e = 0; e < n; ++e) if (this[e] === t) return e;
    return -1;
  }, numeric.myIndexOf = Array.prototype.indexOf ? Array.prototype.indexOf : numeric._myIndexOf, numeric.Function = Function, numeric.precision = 4, numeric.largeArray = 50, numeric.prettyPrint = function(t) {
    function n(s) {
      if (s === 0)
        return "0";
      if (isNaN(s))
        return "NaN";
      if (s < 0)
        return "-" + n(-s);
      if (isFinite(s)) {
        var r = Math.floor(Math.log(s) / Math.log(10)), c = s / Math.pow(10, r), f = c.toPrecision(numeric.precision);
        return parseFloat(f) === 10 && (r++, c = 1, f = c.toPrecision(numeric.precision)), parseFloat(f).toString() + "e" + r.toString();
      }
      return "Infinity";
    }
    var e = [];
    function i(s) {
      var r;
      if (typeof s > "u")
        return e.push(Array(numeric.precision + 8).join(" ")), !1;
      if (typeof s == "string")
        return e.push('"' + s + '"'), !1;
      if (typeof s == "boolean")
        return e.push(s.toString()), !1;
      if (typeof s == "number") {
        var c = n(s), f = s.toPrecision(numeric.precision), h = parseFloat(s.toString()).toString(), o = [c, f, h, parseFloat(f).toString(), parseFloat(h).toString()];
        for (r = 1; r < o.length; r++)
          o[r].length < c.length && (c = o[r]);
        return e.push(Array(numeric.precision + 8 - c.length).join(" ") + c), !1;
      }
      if (s === null)
        return e.push("null"), !1;
      if (typeof s == "function") {
        e.push(s.toString());
        var v = !1;
        for (r in s)
          s.hasOwnProperty(r) && (v ? e.push(`,
`) : e.push(`
{`), v = !0, e.push(r), e.push(`: 
`), i(s[r]));
        return v && e.push(`}
`), !0;
      }
      if (s instanceof Array) {
        if (s.length > numeric.largeArray)
          return e.push("...Large Array..."), !0;
        var v = !1;
        for (e.push("["), r = 0; r < s.length; r++)
          r > 0 && (e.push(","), v && e.push(`
 `)), v = i(s[r]);
        return e.push("]"), !0;
      }
      e.push("{");
      var v = !1;
      for (r in s)
        s.hasOwnProperty(r) && (v && e.push(`,
`), v = !0, e.push(r), e.push(`: 
`), i(s[r]));
      return e.push("}"), !0;
    }
    return i(t), e.join("");
  }, numeric.parseDate = function(t) {
    function n(e) {
      if (typeof e == "string")
        return Date.parse(e.replace(/-/g, "/"));
      if (!(e instanceof Array))
        throw new Error("parseDate: parameter must be arrays of strings");
      var i = [], s;
      for (s = 0; s < e.length; s++)
        i[s] = n(e[s]);
      return i;
    }
    return n(t);
  }, numeric.parseFloat = function(t) {
    function n(e) {
      if (typeof e == "string")
        return parseFloat(e);
      if (!(e instanceof Array))
        throw new Error("parseFloat: parameter must be arrays of strings");
      var i = [], s;
      for (s = 0; s < e.length; s++)
        i[s] = n(e[s]);
      return i;
    }
    return n(t);
  }, numeric.parseCSV = function(t) {
    var n = t.split(`
`), e, i, s = [], r = /(([^'",]*)|('[^']*')|("[^"]*")),/g, c = /^\s*(([+-]?[0-9]+(\.[0-9]*)?(e[+-]?[0-9]+)?)|([+-]?[0-9]*(\.[0-9]+)?(e[+-]?[0-9]+)?))\s*$/, f = function(p) {
      return p.substr(0, p.length - 1);
    }, h = 0;
    for (i = 0; i < n.length; i++) {
      var o = (n[i] + ",").match(r), v;
      if (o.length > 0) {
        for (s[h] = [], e = 0; e < o.length; e++)
          v = f(o[e]), c.test(v) ? s[h][e] = parseFloat(v) : s[h][e] = v;
        h++;
      }
    }
    return s;
  }, numeric.toCSV = function(t) {
    var n = numeric.dim(t), e, i, s, r, c;
    for (s = n[0], n[1], c = [], e = 0; e < s; e++) {
      for (r = [], i = 0; i < s; i++)
        r[i] = t[e][i].toString();
      c[e] = r.join(", ");
    }
    return c.join(`
`) + `
`;
  }, numeric.getURL = function(t) {
    var n = new XMLHttpRequest();
    return n.open("GET", t, !1), n.send(), n;
  }, numeric.imageURL = function(t) {
    function n(D) {
      var q = D.length, F, x, N, R, I, u, b, Z, G = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", J = "";
      for (F = 0; F < q; F += 3)
        x = D[F], N = D[F + 1], R = D[F + 2], I = x >> 2, u = ((x & 3) << 4) + (N >> 4), b = ((N & 15) << 2) + (R >> 6), Z = R & 63, F + 1 >= q ? b = Z = 64 : F + 2 >= q && (Z = 64), J += G.charAt(I) + G.charAt(u) + G.charAt(b) + G.charAt(Z);
      return J;
    }
    function e(D, q, F) {
      typeof q > "u" && (q = 0), typeof F > "u" && (F = D.length);
      var x = [
        0,
        1996959894,
        3993919788,
        2567524794,
        124634137,
        1886057615,
        3915621685,
        2657392035,
        249268274,
        2044508324,
        3772115230,
        2547177864,
        162941995,
        2125561021,
        3887607047,
        2428444049,
        498536548,
        1789927666,
        4089016648,
        2227061214,
        450548861,
        1843258603,
        4107580753,
        2211677639,
        325883990,
        1684777152,
        4251122042,
        2321926636,
        335633487,
        1661365465,
        4195302755,
        2366115317,
        997073096,
        1281953886,
        3579855332,
        2724688242,
        1006888145,
        1258607687,
        3524101629,
        2768942443,
        901097722,
        1119000684,
        3686517206,
        2898065728,
        853044451,
        1172266101,
        3705015759,
        2882616665,
        651767980,
        1373503546,
        3369554304,
        3218104598,
        565507253,
        1454621731,
        3485111705,
        3099436303,
        671266974,
        1594198024,
        3322730930,
        2970347812,
        795835527,
        1483230225,
        3244367275,
        3060149565,
        1994146192,
        31158534,
        2563907772,
        4023717930,
        1907459465,
        112637215,
        2680153253,
        3904427059,
        2013776290,
        251722036,
        2517215374,
        3775830040,
        2137656763,
        141376813,
        2439277719,
        3865271297,
        1802195444,
        476864866,
        2238001368,
        4066508878,
        1812370925,
        453092731,
        2181625025,
        4111451223,
        1706088902,
        314042704,
        2344532202,
        4240017532,
        1658658271,
        366619977,
        2362670323,
        4224994405,
        1303535960,
        984961486,
        2747007092,
        3569037538,
        1256170817,
        1037604311,
        2765210733,
        3554079995,
        1131014506,
        879679996,
        2909243462,
        3663771856,
        1141124467,
        855842277,
        2852801631,
        3708648649,
        1342533948,
        654459306,
        3188396048,
        3373015174,
        1466479909,
        544179635,
        3110523913,
        3462522015,
        1591671054,
        702138776,
        2966460450,
        3352799412,
        1504918807,
        783551873,
        3082640443,
        3233442989,
        3988292384,
        2596254646,
        62317068,
        1957810842,
        3939845945,
        2647816111,
        81470997,
        1943803523,
        3814918930,
        2489596804,
        225274430,
        2053790376,
        3826175755,
        2466906013,
        167816743,
        2097651377,
        4027552580,
        2265490386,
        503444072,
        1762050814,
        4150417245,
        2154129355,
        426522225,
        1852507879,
        4275313526,
        2312317920,
        282753626,
        1742555852,
        4189708143,
        2394877945,
        397917763,
        1622183637,
        3604390888,
        2714866558,
        953729732,
        1340076626,
        3518719985,
        2797360999,
        1068828381,
        1219638859,
        3624741850,
        2936675148,
        906185462,
        1090812512,
        3747672003,
        2825379669,
        829329135,
        1181335161,
        3412177804,
        3160834842,
        628085408,
        1382605366,
        3423369109,
        3138078467,
        570562233,
        1426400815,
        3317316542,
        2998733608,
        733239954,
        1555261956,
        3268935591,
        3050360625,
        752459403,
        1541320221,
        2607071920,
        3965973030,
        1969922972,
        40735498,
        2617837225,
        3943577151,
        1913087877,
        83908371,
        2512341634,
        3803740692,
        2075208622,
        213261112,
        2463272603,
        3855990285,
        2094854071,
        198958881,
        2262029012,
        4057260610,
        1759359992,
        534414190,
        2176718541,
        4139329115,
        1873836001,
        414664567,
        2282248934,
        4279200368,
        1711684554,
        285281116,
        2405801727,
        4167216745,
        1634467795,
        376229701,
        2685067896,
        3608007406,
        1308918612,
        956543938,
        2808555105,
        3495958263,
        1231636301,
        1047427035,
        2932959818,
        3654703836,
        1088359270,
        936918e3,
        2847714899,
        3736837829,
        1202900863,
        817233897,
        3183342108,
        3401237130,
        1404277552,
        615818150,
        3134207493,
        3453421203,
        1423857449,
        601450431,
        3009837614,
        3294710456,
        1567103746,
        711928724,
        3020668471,
        3272380065,
        1510334235,
        755167117
      ], N = -1, R = 0;
      D.length;
      var I;
      for (I = q; I < F; I++)
        R = (N ^ D[I]) & 255, N = N >>> 8 ^ x[R];
      return N ^ -1;
    }
    var i = t[0].length, s = t[0][0].length, r, c, f, h, o, v, p, l, m, d, _ = [
      137,
      80,
      78,
      71,
      13,
      10,
      26,
      10,
      //  0: PNG signature
      0,
      0,
      0,
      13,
      //  8: IHDR Chunk length
      73,
      72,
      68,
      82,
      // 12: "IHDR" 
      s >> 24 & 255,
      s >> 16 & 255,
      s >> 8 & 255,
      s & 255,
      // 16: Width
      i >> 24 & 255,
      i >> 16 & 255,
      i >> 8 & 255,
      i & 255,
      // 20: Height
      8,
      // 24: bit depth
      2,
      // 25: RGB
      0,
      // 26: deflate
      0,
      // 27: no filter
      0,
      // 28: no interlace
      -1,
      -2,
      -3,
      -4,
      // 29: CRC
      -5,
      -6,
      -7,
      -8,
      // 33: IDAT Chunk length
      73,
      68,
      65,
      84,
      // 37: "IDAT"
      // RFC 1950 header starts here
      8,
      // 41: RFC1950 CMF
      29
      // 42: RFC1950 FLG
    ];
    for (d = e(_, 12, 29), _[29] = d >> 24 & 255, _[30] = d >> 16 & 255, _[31] = d >> 8 & 255, _[32] = d & 255, r = 1, c = 0, p = 0; p < i; p++) {
      for (p < i - 1 ? _.push(0) : _.push(1), o = 3 * s + 1 + (p === 0) & 255, v = 3 * s + 1 + (p === 0) >> 8 & 255, _.push(o), _.push(v), _.push(~o & 255), _.push(~v & 255), p === 0 && _.push(0), l = 0; l < s; l++)
        for (f = 0; f < 3; f++)
          o = t[f][p][l], o > 255 ? o = 255 : o < 0 ? o = 0 : o = Math.round(o), r = (r + o) % 65521, c = (c + r) % 65521, _.push(o);
      _.push(0);
    }
    return m = (c << 16) + r, _.push(m >> 24 & 255), _.push(m >> 16 & 255), _.push(m >> 8 & 255), _.push(m & 255), h = _.length - 41, _[33] = h >> 24 & 255, _[34] = h >> 16 & 255, _[35] = h >> 8 & 255, _[36] = h & 255, d = e(_, 37), _.push(d >> 24 & 255), _.push(d >> 16 & 255), _.push(d >> 8 & 255), _.push(d & 255), _.push(0), _.push(0), _.push(0), _.push(0), _.push(73), _.push(69), _.push(78), _.push(68), _.push(174), _.push(66), _.push(96), _.push(130), "data:image/png;base64," + n(_);
  }, numeric._dim = function(t) {
    for (var n = []; typeof t == "object"; )
      n.push(t.length), t = t[0];
    return n;
  }, numeric.dim = function(t) {
    var n, e;
    return typeof t == "object" ? (n = t[0], typeof n == "object" ? (e = n[0], typeof e == "object" ? numeric._dim(t) : [t.length, n.length]) : [t.length]) : [];
  }, numeric.mapreduce = function(t, n) {
    return Function(
      "x",
      "accum",
      "_s",
      "_k",
      'if(typeof accum === "undefined") accum = ' + n + `;
if(typeof x === "number") { var xi = x; ` + t + `; return accum; }
if(typeof _s === "undefined") _s = numeric.dim(x);
if(typeof _k === "undefined") _k = 0;
var _n = _s[_k];
var i,xi;
if(_k < _s.length-1) {
    for(i=_n-1;i>=0;i--) {
        accum = arguments.callee(x[i],accum,_s,_k+1);
    }    return accum;
}
for(i=_n-1;i>=1;i-=2) { 
    xi = x[i];
    ` + t + `;
    xi = x[i-1];
    ` + t + `;
}
if(i === 0) {
    xi = x[i];
    ` + t + `
}
return accum;`
    );
  }, numeric.mapreduce2 = function(t, n) {
    return Function(
      "x",
      `var n = x.length;
var i,xi;
` + n + `;
for(i=n-1;i!==-1;--i) { 
    xi = x[i];
    ` + t + `;
}
return accum;`
    );
  }, numeric.same = function S(t, n) {
    var e, i;
    if (!(t instanceof Array) || !(n instanceof Array) || (i = t.length, i !== n.length))
      return !1;
    for (e = 0; e < i; e++)
      if (t[e] !== n[e])
        if (typeof t[e] == "object") {
          if (!S(t[e], n[e])) return !1;
        } else
          return !1;
    return !0;
  }, numeric.rep = function(t, n, e) {
    typeof e > "u" && (e = 0);
    var i = t[e], s = Array(i), r;
    if (e === t.length - 1) {
      for (r = i - 2; r >= 0; r -= 2)
        s[r + 1] = n, s[r] = n;
      return r === -1 && (s[0] = n), s;
    }
    for (r = i - 1; r >= 0; r--)
      s[r] = numeric.rep(t, n, e + 1);
    return s;
  }, numeric.dotMMsmall = function(t, n) {
    var e, i, s, r, c, f, h, o, v, p, l;
    for (r = t.length, c = n.length, f = n[0].length, h = Array(r), e = r - 1; e >= 0; e--) {
      for (o = Array(f), v = t[e], s = f - 1; s >= 0; s--) {
        for (p = v[c - 1] * n[c - 1][s], i = c - 2; i >= 1; i -= 2)
          l = i - 1, p += v[i] * n[i][s] + v[l] * n[l][s];
        i === 0 && (p += v[0] * n[0][s]), o[s] = p;
      }
      h[e] = o;
    }
    return h;
  }, numeric._getCol = function(t, n, e) {
    var i = t.length, s;
    for (s = i - 1; s > 0; --s)
      e[s] = t[s][n], --s, e[s] = t[s][n];
    s === 0 && (e[0] = t[0][n]);
  }, numeric.dotMMbig = function(t, n) {
    var e = numeric._getCol, i = n.length, s = Array(i), r = t.length, c = n[0].length, f = new Array(r), h, o = numeric.dotVV, v, p;
    for (--i, --r, v = r; v !== -1; --v) f[v] = Array(c);
    for (--c, v = c; v !== -1; --v)
      for (e(n, v, s), p = r; p !== -1; --p)
        h = t[p], f[p][v] = o(h, s);
    return f;
  }, numeric.dotMV = function(t, n) {
    var e = t.length;
    n.length;
    var i, s = Array(e), r = numeric.dotVV;
    for (i = e - 1; i >= 0; i--)
      s[i] = r(t[i], n);
    return s;
  }, numeric.dotVM = function(t, n) {
    var e, i, s, r, c, f, h;
    for (s = t.length, r = n[0].length, c = Array(r), i = r - 1; i >= 0; i--) {
      for (f = t[s - 1] * n[s - 1][i], e = s - 2; e >= 1; e -= 2)
        h = e - 1, f += t[e] * n[e][i] + t[h] * n[h][i];
      e === 0 && (f += t[0] * n[0][i]), c[i] = f;
    }
    return c;
  }, numeric.dotVV = function(t, n) {
    var e, i = t.length, s, r = t[i - 1] * n[i - 1];
    for (e = i - 2; e >= 1; e -= 2)
      s = e - 1, r += t[e] * n[e] + t[s] * n[s];
    return e === 0 && (r += t[0] * n[0]), r;
  }, numeric.dot = function(t, n) {
    var e = numeric.dim;
    switch (e(t).length * 1e3 + e(n).length) {
      case 2002:
        return n.length < 10 ? numeric.dotMMsmall(t, n) : numeric.dotMMbig(t, n);
      case 2001:
        return numeric.dotMV(t, n);
      case 1002:
        return numeric.dotVM(t, n);
      case 1001:
        return numeric.dotVV(t, n);
      case 1e3:
        return numeric.mulVS(t, n);
      case 1:
        return numeric.mulSV(t, n);
      case 0:
        return t * n;
      default:
        throw new Error("numeric.dot only works on vectors and matrices");
    }
  }, numeric.diag = function(t) {
    var n, e, i, s = t.length, r = Array(s), c;
    for (n = s - 1; n >= 0; n--) {
      for (c = Array(s), e = n + 2, i = s - 1; i >= e; i -= 2)
        c[i] = 0, c[i - 1] = 0;
      for (i > n && (c[i] = 0), c[n] = t[n], i = n - 1; i >= 1; i -= 2)
        c[i] = 0, c[i - 1] = 0;
      i === 0 && (c[0] = 0), r[n] = c;
    }
    return r;
  }, numeric.getDiag = function(S) {
    var t = Math.min(S.length, S[0].length), n, e = Array(t);
    for (n = t - 1; n >= 1; --n)
      e[n] = S[n][n], --n, e[n] = S[n][n];
    return n === 0 && (e[0] = S[0][0]), e;
  }, numeric.identity = function(t) {
    return numeric.diag(numeric.rep([t], 1));
  }, numeric.pointwise = function(t, n, e) {
    typeof e > "u" && (e = "");
    var i = [], s, r = /\[i\]$/, c, f = "", h = !1;
    for (s = 0; s < t.length; s++)
      r.test(t[s]) ? (c = t[s].substring(0, t[s].length - 3), f = c) : c = t[s], c === "ret" && (h = !0), i.push(c);
    return i[t.length] = "_s", i[t.length + 1] = "_k", i[t.length + 2] = 'if(typeof _s === "undefined") _s = numeric.dim(' + f + `);
if(typeof _k === "undefined") _k = 0;
var _n = _s[_k];
var i` + (h ? "" : ", ret = Array(_n)") + `;
if(_k < _s.length-1) {
    for(i=_n-1;i>=0;i--) ret[i] = arguments.callee(` + t.join(",") + `,_s,_k+1);
    return ret;
}
` + e + `
for(i=_n-1;i!==-1;--i) {
    ` + n + `
}
return ret;`, Function.apply(null, i);
  }, numeric.pointwise2 = function(t, n, e) {
    typeof e > "u" && (e = "");
    var i = [], s, r = /\[i\]$/, c, f = "", h = !1;
    for (s = 0; s < t.length; s++)
      r.test(t[s]) ? (c = t[s].substring(0, t[s].length - 3), f = c) : c = t[s], c === "ret" && (h = !0), i.push(c);
    return i[t.length] = "var _n = " + f + `.length;
var i` + (h ? "" : ", ret = Array(_n)") + `;
` + e + `
for(i=_n-1;i!==-1;--i) {
` + n + `
}
return ret;`, Function.apply(null, i);
  }, numeric._biforeach = function S(t, n, e, i, s) {
    if (i === e.length - 1) {
      s(t, n);
      return;
    }
    var r, c = e[i];
    for (r = c - 1; r >= 0; r--)
      S(typeof t == "object" ? t[r] : t, typeof n == "object" ? n[r] : n, e, i + 1, s);
  }, numeric._biforeach2 = function S(t, n, e, i, s) {
    if (i === e.length - 1)
      return s(t, n);
    var r, c = e[i], f = Array(c);
    for (r = c - 1; r >= 0; --r)
      f[r] = S(typeof t == "object" ? t[r] : t, typeof n == "object" ? n[r] : n, e, i + 1, s);
    return f;
  }, numeric._foreach = function S(t, n, e, i) {
    if (e === n.length - 1) {
      i(t);
      return;
    }
    var s, r = n[e];
    for (s = r - 1; s >= 0; s--)
      S(t[s], n, e + 1, i);
  }, numeric._foreach2 = function S(t, n, e, i) {
    if (e === n.length - 1)
      return i(t);
    var s, r = n[e], c = Array(r);
    for (s = r - 1; s >= 0; s--)
      c[s] = S(t[s], n, e + 1, i);
    return c;
  }, numeric.ops2 = {
    add: "+",
    sub: "-",
    mul: "*",
    div: "/",
    mod: "%",
    and: "&&",
    or: "||",
    eq: "===",
    neq: "!==",
    lt: "<",
    gt: ">",
    leq: "<=",
    geq: ">=",
    band: "&",
    bor: "|",
    bxor: "^",
    lshift: "<<",
    rshift: ">>",
    rrshift: ">>>"
  }, numeric.opseq = {
    addeq: "+=",
    subeq: "-=",
    muleq: "*=",
    diveq: "/=",
    modeq: "%=",
    lshifteq: "<<=",
    rshifteq: ">>=",
    rrshifteq: ">>>=",
    bandeq: "&=",
    boreq: "|=",
    bxoreq: "^="
  }, numeric.mathfuns = [
    "abs",
    "acos",
    "asin",
    "atan",
    "ceil",
    "cos",
    "exp",
    "floor",
    "log",
    "round",
    "sin",
    "sqrt",
    "tan",
    "isNaN",
    "isFinite"
  ], numeric.mathfuns2 = ["atan2", "pow", "max", "min"], numeric.ops1 = {
    neg: "-",
    not: "!",
    bnot: "~",
    clone: ""
  }, numeric.mapreducers = {
    any: ["if(xi) return true;", "var accum = false;"],
    all: ["if(!xi) return false;", "var accum = true;"],
    sum: ["accum += xi;", "var accum = 0;"],
    prod: ["accum *= xi;", "var accum = 1;"],
    norm2Squared: ["accum += xi*xi;", "var accum = 0;"],
    norminf: ["accum = max(accum,abs(xi));", "var accum = 0, max = Math.max, abs = Math.abs;"],
    norm1: ["accum += abs(xi)", "var accum = 0, abs = Math.abs;"],
    sup: ["accum = max(accum,xi);", "var accum = -Infinity, max = Math.max;"],
    inf: ["accum = min(accum,xi);", "var accum = Infinity, min = Math.min;"]
  }, function() {
    var S, t;
    for (S = 0; S < numeric.mathfuns2.length; ++S)
      t = numeric.mathfuns2[S], numeric.ops2[t] = t;
    for (S in numeric.ops2)
      if (numeric.ops2.hasOwnProperty(S)) {
        t = numeric.ops2[S];
        var n, e, i = "";
        numeric.myIndexOf.call(numeric.mathfuns2, S) !== -1 ? (i = "var " + t + " = Math." + t + `;
`, n = function(s, r, c) {
          return s + " = " + t + "(" + r + "," + c + ")";
        }, e = function(s, r) {
          return s + " = " + t + "(" + s + "," + r + ")";
        }) : (n = function(s, r, c) {
          return s + " = " + r + " " + t + " " + c;
        }, numeric.opseq.hasOwnProperty(S + "eq") ? e = function(s, r) {
          return s + " " + t + "= " + r;
        } : e = function(s, r) {
          return s + " = " + s + " " + t + " " + r;
        }), numeric[S + "VV"] = numeric.pointwise2(["x[i]", "y[i]"], n("ret[i]", "x[i]", "y[i]"), i), numeric[S + "SV"] = numeric.pointwise2(["x", "y[i]"], n("ret[i]", "x", "y[i]"), i), numeric[S + "VS"] = numeric.pointwise2(["x[i]", "y"], n("ret[i]", "x[i]", "y"), i), numeric[S] = Function(
          `var n = arguments.length, i, x = arguments[0], y;
var VV = numeric.` + S + "VV, VS = numeric." + S + "VS, SV = numeric." + S + `SV;
var dim = numeric.dim;
for(i=1;i!==n;++i) { 
  y = arguments[i];
  if(typeof x === "object") {
      if(typeof y === "object") x = numeric._biforeach2(x,y,dim(x),0,VV);
      else x = numeric._biforeach2(x,y,dim(x),0,VS);
  } else if(typeof y === "object") x = numeric._biforeach2(x,y,dim(y),0,SV);
  else ` + e("x", "y") + `
}
return x;
`
        ), numeric[t] = numeric[S], numeric[S + "eqV"] = numeric.pointwise2(["ret[i]", "x[i]"], e("ret[i]", "x[i]"), i), numeric[S + "eqS"] = numeric.pointwise2(["ret[i]", "x"], e("ret[i]", "x"), i), numeric[S + "eq"] = Function(
          `var n = arguments.length, i, x = arguments[0], y;
var V = numeric.` + S + "eqV, S = numeric." + S + `eqS
var s = numeric.dim(x);
for(i=1;i!==n;++i) { 
  y = arguments[i];
  if(typeof y === "object") numeric._biforeach(x,y,s,0,V);
  else numeric._biforeach(x,y,s,0,S);
}
return x;
`
        );
      }
    for (S = 0; S < numeric.mathfuns2.length; ++S)
      t = numeric.mathfuns2[S], delete numeric.ops2[t];
    for (S = 0; S < numeric.mathfuns.length; ++S)
      t = numeric.mathfuns[S], numeric.ops1[t] = t;
    for (S in numeric.ops1)
      numeric.ops1.hasOwnProperty(S) && (i = "", t = numeric.ops1[S], numeric.myIndexOf.call(numeric.mathfuns, S) !== -1 && Math.hasOwnProperty(t) && (i = "var " + t + " = Math." + t + `;
`), numeric[S + "eqV"] = numeric.pointwise2(["ret[i]"], "ret[i] = " + t + "(ret[i]);", i), numeric[S + "eq"] = Function(
        "x",
        'if(typeof x !== "object") return ' + t + `x
var i;
var V = numeric.` + S + `eqV;
var s = numeric.dim(x);
numeric._foreach(x,s,0,V);
return x;
`
      ), numeric[S + "V"] = numeric.pointwise2(["x[i]"], "ret[i] = " + t + "(x[i]);", i), numeric[S] = Function(
        "x",
        'if(typeof x !== "object") return ' + t + `(x)
var i;
var V = numeric.` + S + `V;
var s = numeric.dim(x);
return numeric._foreach2(x,s,0,V);
`
      ));
    for (S = 0; S < numeric.mathfuns.length; ++S)
      t = numeric.mathfuns[S], delete numeric.ops1[t];
    for (S in numeric.mapreducers)
      numeric.mapreducers.hasOwnProperty(S) && (t = numeric.mapreducers[S], numeric[S + "V"] = numeric.mapreduce2(t[0], t[1]), numeric[S] = Function(
        "x",
        "s",
        "k",
        t[1] + `if(typeof x !== "object") {    xi = x;
` + t[0] + `;
    return accum;
}if(typeof s === "undefined") s = numeric.dim(x);
if(typeof k === "undefined") k = 0;
if(k === s.length-1) return numeric.` + S + `V(x);
var xi;
var n = x.length, i;
for(i=n-1;i!==-1;--i) {
   xi = arguments.callee(x[i]);
` + t[0] + `;
}
return accum;
`
      ));
  }(), numeric.truncVV = numeric.pointwise(["x[i]", "y[i]"], "ret[i] = round(x[i]/y[i])*y[i];", "var round = Math.round;"), numeric.truncVS = numeric.pointwise(["x[i]", "y"], "ret[i] = round(x[i]/y)*y;", "var round = Math.round;"), numeric.truncSV = numeric.pointwise(["x", "y[i]"], "ret[i] = round(x/y[i])*y[i];", "var round = Math.round;"), numeric.trunc = function(t, n) {
    return typeof t == "object" ? typeof n == "object" ? numeric.truncVV(t, n) : numeric.truncVS(t, n) : typeof n == "object" ? numeric.truncSV(t, n) : Math.round(t / n) * n;
  }, numeric.inv = function(d) {
    var n = numeric.dim(d), e = Math.abs, i = n[0], s = n[1], r = numeric.clone(d), c, f, h = numeric.identity(i), o, v, p, l, m, d;
    for (l = 0; l < s; ++l) {
      var _ = -1, D = -1;
      for (p = l; p !== i; ++p)
        m = e(r[p][l]), m > D && (_ = p, D = m);
      for (f = r[_], r[_] = r[l], r[l] = f, v = h[_], h[_] = h[l], h[l] = v, d = f[l], m = l; m !== s; ++m) f[m] /= d;
      for (m = s - 1; m !== -1; --m) v[m] /= d;
      for (p = i - 1; p !== -1; --p)
        if (p !== l) {
          for (c = r[p], o = h[p], d = c[l], m = l + 1; m !== s; ++m) c[m] -= f[m] * d;
          for (m = s - 1; m > 0; --m)
            o[m] -= v[m] * d, --m, o[m] -= v[m] * d;
          m === 0 && (o[0] -= v[0] * d);
        }
    }
    return h;
  }, numeric.det = function(t) {
    var n = numeric.dim(t);
    if (n.length !== 2 || n[0] !== n[1])
      throw new Error("numeric: det() only works on square matrices");
    var e = n[0], i = 1, s, r, c, f = numeric.clone(t), h, o, v, p, l;
    for (r = 0; r < e - 1; r++) {
      for (c = r, s = r + 1; s < e; s++)
        Math.abs(f[s][r]) > Math.abs(f[c][r]) && (c = s);
      for (c !== r && (p = f[c], f[c] = f[r], f[r] = p, i *= -1), h = f[r], s = r + 1; s < e; s++) {
        for (o = f[s], v = o[r] / h[r], c = r + 1; c < e - 1; c += 2)
          l = c + 1, o[c] -= h[c] * v, o[l] -= h[l] * v;
        c !== e && (o[c] -= h[c] * v);
      }
      if (h[r] === 0)
        return 0;
      i *= h[r];
    }
    return i * f[r][r];
  }, numeric.transpose = function(t) {
    var n, e, i = t.length, s = t[0].length, r = Array(s), c, f, h;
    for (e = 0; e < s; e++) r[e] = Array(i);
    for (n = i - 1; n >= 1; n -= 2) {
      for (f = t[n], c = t[n - 1], e = s - 1; e >= 1; --e)
        h = r[e], h[n] = f[e], h[n - 1] = c[e], --e, h = r[e], h[n] = f[e], h[n - 1] = c[e];
      e === 0 && (h = r[0], h[n] = f[0], h[n - 1] = c[0]);
    }
    if (n === 0) {
      for (c = t[0], e = s - 1; e >= 1; --e)
        r[e][0] = c[e], --e, r[e][0] = c[e];
      e === 0 && (r[0][0] = c[0]);
    }
    return r;
  }, numeric.negtranspose = function(t) {
    var n, e, i = t.length, s = t[0].length, r = Array(s), c, f, h;
    for (e = 0; e < s; e++) r[e] = Array(i);
    for (n = i - 1; n >= 1; n -= 2) {
      for (f = t[n], c = t[n - 1], e = s - 1; e >= 1; --e)
        h = r[e], h[n] = -f[e], h[n - 1] = -c[e], --e, h = r[e], h[n] = -f[e], h[n - 1] = -c[e];
      e === 0 && (h = r[0], h[n] = -f[0], h[n - 1] = -c[0]);
    }
    if (n === 0) {
      for (c = t[0], e = s - 1; e >= 1; --e)
        r[e][0] = -c[e], --e, r[e][0] = -c[e];
      e === 0 && (r[0][0] = -c[0]);
    }
    return r;
  }, numeric._random = function S(t, n) {
    var e, i = t[n], s = Array(i), r;
    if (n === t.length - 1) {
      for (r = Math.random, e = i - 1; e >= 1; e -= 2)
        s[e] = r(), s[e - 1] = r();
      return e === 0 && (s[0] = r()), s;
    }
    for (e = i - 1; e >= 0; e--) s[e] = S(t, n + 1);
    return s;
  }, numeric.random = function(t) {
    return numeric._random(t, 0);
  }, numeric.norm2 = function(t) {
    return Math.sqrt(numeric.norm2Squared(t));
  }, numeric.linspace = function(t, n, e) {
    if (typeof e > "u" && (e = Math.max(Math.round(n - t) + 1, 1)), e < 2)
      return e === 1 ? [t] : [];
    var i, s = Array(e);
    for (e--, i = e; i >= 0; i--)
      s[i] = (i * n + (e - i) * t) / e;
    return s;
  }, numeric.getBlock = function(t, n, e) {
    var i = numeric.dim(t);
    function s(r, c) {
      var f, h = n[c], o = e[c] - h, v = Array(o);
      if (c === i.length - 1) {
        for (f = o; f >= 0; f--)
          v[f] = r[f + h];
        return v;
      }
      for (f = o; f >= 0; f--)
        v[f] = s(r[f + h], c + 1);
      return v;
    }
    return s(t, 0);
  }, numeric.setBlock = function(t, n, e, i) {
    var s = numeric.dim(t);
    function r(c, f, h) {
      var o, v = n[h], p = e[h] - v;
      if (h === s.length - 1)
        for (o = p; o >= 0; o--)
          c[o + v] = f[o];
      for (o = p; o >= 0; o--)
        r(c[o + v], f[o], h + 1);
    }
    return r(t, i, 0), t;
  }, numeric.getRange = function(t, n, e) {
    var i = n.length, s = e.length, r, c, f = Array(i), h, o;
    for (r = i - 1; r !== -1; --r)
      for (f[r] = Array(s), h = f[r], o = t[n[r]], c = s - 1; c !== -1; --c) h[c] = o[e[c]];
    return f;
  }, numeric.blockMatrix = function(t) {
    var n = numeric.dim(t);
    if (n.length < 4) return numeric.blockMatrix([t]);
    var e = n[0], i = n[1], s, r, c, f, h;
    for (s = 0, r = 0, c = 0; c < e; ++c) s += t[c][0].length;
    for (f = 0; f < i; ++f) r += t[0][f][0].length;
    var o = Array(s);
    for (c = 0; c < s; ++c) o[c] = Array(r);
    var v = 0, p, l, m, d, _;
    for (c = 0; c < e; ++c) {
      for (p = r, f = i - 1; f !== -1; --f)
        for (h = t[c][f], p -= h[0].length, m = h.length - 1; m !== -1; --m)
          for (_ = h[m], l = o[v + m], d = _.length - 1; d !== -1; --d) l[p + d] = _[d];
      v += t[c][0].length;
    }
    return o;
  }, numeric.tensor = function(t, n) {
    if (typeof t == "number" || typeof n == "number") return numeric.mul(t, n);
    var e = numeric.dim(t), i = numeric.dim(n);
    if (e.length !== 1 || i.length !== 1)
      throw new Error("numeric: tensor product is only defined for vectors");
    var s = e[0], r = i[0], c = Array(s), f, h, o, v;
    for (h = s - 1; h >= 0; h--) {
      for (f = Array(r), v = t[h], o = r - 1; o >= 3; --o)
        f[o] = v * n[o], --o, f[o] = v * n[o], --o, f[o] = v * n[o], --o, f[o] = v * n[o];
      for (; o >= 0; )
        f[o] = v * n[o], --o;
      c[h] = f;
    }
    return c;
  }, numeric.T = function(t, n) {
    this.x = t, this.y = n;
  }, numeric.t = function(t, n) {
    return new numeric.T(t, n);
  }, numeric.Tbinop = function(t, n, e, i, s) {
    if (numeric.indexOf, typeof s != "string") {
      var r;
      s = "";
      for (r in numeric)
        numeric.hasOwnProperty(r) && (t.indexOf(r) >= 0 || n.indexOf(r) >= 0 || e.indexOf(r) >= 0 || i.indexOf(r) >= 0) && r.length > 1 && (s += "var " + r + " = numeric." + r + `;
`);
    }
    return Function(
      ["y"],
      `var x = this;
if(!(y instanceof numeric.T)) { y = new numeric.T(y); }
` + s + `
if(x.y) {  if(y.y) {    return new numeric.T(` + i + `);
  }
  return new numeric.T(` + e + `);
}
if(y.y) {
  return new numeric.T(` + n + `);
}
return new numeric.T(` + t + `);
`
    );
  }, numeric.T.prototype.add = numeric.Tbinop(
    "add(x.x,y.x)",
    "add(x.x,y.x),y.y",
    "add(x.x,y.x),x.y",
    "add(x.x,y.x),add(x.y,y.y)"
  ), numeric.T.prototype.sub = numeric.Tbinop(
    "sub(x.x,y.x)",
    "sub(x.x,y.x),neg(y.y)",
    "sub(x.x,y.x),x.y",
    "sub(x.x,y.x),sub(x.y,y.y)"
  ), numeric.T.prototype.mul = numeric.Tbinop(
    "mul(x.x,y.x)",
    "mul(x.x,y.x),mul(x.x,y.y)",
    "mul(x.x,y.x),mul(x.y,y.x)",
    "sub(mul(x.x,y.x),mul(x.y,y.y)),add(mul(x.x,y.y),mul(x.y,y.x))"
  ), numeric.T.prototype.reciprocal = function() {
    var t = numeric.mul, n = numeric.div;
    if (this.y) {
      var e = numeric.add(t(this.x, this.x), t(this.y, this.y));
      return new numeric.T(n(this.x, e), n(numeric.neg(this.y), e));
    }
    return new T(n(1, this.x));
  }, numeric.T.prototype.div = function(t) {
    if (t instanceof numeric.T || (t = new numeric.T(t)), t.y)
      return this.mul(t.reciprocal());
    var n = numeric.div;
    return this.y ? new numeric.T(n(this.x, t.x), n(this.y, t.x)) : new numeric.T(n(this.x, t.x));
  }, numeric.T.prototype.dot = numeric.Tbinop(
    "dot(x.x,y.x)",
    "dot(x.x,y.x),dot(x.x,y.y)",
    "dot(x.x,y.x),dot(x.y,y.x)",
    "sub(dot(x.x,y.x),dot(x.y,y.y)),add(dot(x.x,y.y),dot(x.y,y.x))"
  ), numeric.T.prototype.transpose = function() {
    var t = numeric.transpose, n = this.x, e = this.y;
    return e ? new numeric.T(t(n), t(e)) : new numeric.T(t(n));
  }, numeric.T.prototype.transjugate = function() {
    var t = numeric.transpose, n = this.x, e = this.y;
    return e ? new numeric.T(t(n), numeric.negtranspose(e)) : new numeric.T(t(n));
  }, numeric.Tunop = function(t, n, e) {
    return typeof e != "string" && (e = ""), Function(
      `var x = this;
` + e + `
if(x.y) {  ` + n + `;
}
` + t + `;
`
    );
  }, numeric.T.prototype.exp = numeric.Tunop(
    "return new numeric.T(ex)",
    "return new numeric.T(mul(cos(x.y),ex),mul(sin(x.y),ex))",
    "var ex = numeric.exp(x.x), cos = numeric.cos, sin = numeric.sin, mul = numeric.mul;"
  ), numeric.T.prototype.conj = numeric.Tunop(
    "return new numeric.T(x.x);",
    "return new numeric.T(x.x,numeric.neg(x.y));"
  ), numeric.T.prototype.neg = numeric.Tunop(
    "return new numeric.T(neg(x.x));",
    "return new numeric.T(neg(x.x),neg(x.y));",
    "var neg = numeric.neg;"
  ), numeric.T.prototype.sin = numeric.Tunop(
    "return new numeric.T(numeric.sin(x.x))",
    "return x.exp().sub(x.neg().exp()).div(new numeric.T(0,2));"
  ), numeric.T.prototype.cos = numeric.Tunop(
    "return new numeric.T(numeric.cos(x.x))",
    "return x.exp().add(x.neg().exp()).div(2);"
  ), numeric.T.prototype.abs = numeric.Tunop(
    "return new numeric.T(numeric.abs(x.x));",
    "return new numeric.T(numeric.sqrt(numeric.add(mul(x.x,x.x),mul(x.y,x.y))));",
    "var mul = numeric.mul;"
  ), numeric.T.prototype.log = numeric.Tunop(
    "return new numeric.T(numeric.log(x.x));",
    `var theta = new numeric.T(numeric.atan2(x.y,x.x)), r = x.abs();
return new numeric.T(numeric.log(r.x),theta.x);`
  ), numeric.T.prototype.norm2 = numeric.Tunop(
    "return numeric.norm2(x.x);",
    `var f = numeric.norm2Squared;
return Math.sqrt(f(x.x)+f(x.y));`
  ), numeric.T.prototype.inv = function() {
    var t = this;
    if (typeof t.y > "u")
      return new numeric.T(numeric.inv(t.x));
    var n = t.x.length, d, _, D, e = numeric.identity(n), i = numeric.rep([n, n], 0), s = numeric.clone(t.x), r = numeric.clone(t.y), c, f, h, o, v, p, l, m, d, _, D, q, F, x, N, R, I, u;
    for (d = 0; d < n; d++) {
      for (x = s[d][d], N = r[d][d], q = x * x + N * N, D = d, _ = d + 1; _ < n; _++)
        x = s[_][d], N = r[_][d], F = x * x + N * N, F > q && (D = _, q = F);
      for (D !== d && (u = s[d], s[d] = s[D], s[D] = u, u = r[d], r[d] = r[D], r[D] = u, u = e[d], e[d] = e[D], e[D] = u, u = i[d], i[d] = i[D], i[D] = u), c = s[d], f = r[d], v = e[d], p = i[d], x = c[d], N = f[d], _ = d + 1; _ < n; _++)
        R = c[_], I = f[_], c[_] = (R * x + I * N) / q, f[_] = (I * x - R * N) / q;
      for (_ = 0; _ < n; _++)
        R = v[_], I = p[_], v[_] = (R * x + I * N) / q, p[_] = (I * x - R * N) / q;
      for (_ = d + 1; _ < n; _++) {
        for (h = s[_], o = r[_], l = e[_], m = i[_], x = h[d], N = o[d], D = d + 1; D < n; D++)
          R = c[D], I = f[D], h[D] -= R * x - I * N, o[D] -= I * x + R * N;
        for (D = 0; D < n; D++)
          R = v[D], I = p[D], l[D] -= R * x - I * N, m[D] -= I * x + R * N;
      }
    }
    for (d = n - 1; d > 0; d--)
      for (v = e[d], p = i[d], _ = d - 1; _ >= 0; _--)
        for (l = e[_], m = i[_], x = s[_][d], N = r[_][d], D = n - 1; D >= 0; D--)
          R = v[D], I = p[D], l[D] -= x * R - N * I, m[D] -= x * I + N * R;
    return new numeric.T(e, i);
  }, numeric.T.prototype.get = function(t) {
    var n = this.x, e = this.y, i = 0, s, r = t.length;
    if (e) {
      for (; i < r; )
        s = t[i], n = n[s], e = e[s], i++;
      return new numeric.T(n, e);
    }
    for (; i < r; )
      s = t[i], n = n[s], i++;
    return new numeric.T(n);
  }, numeric.T.prototype.set = function(t, n) {
    var e = this.x, i = this.y, s = 0, r, c = t.length, f = n.x, h = n.y;
    if (c === 0)
      return h ? this.y = h : i && (this.y = void 0), this.x = e, this;
    if (h) {
      for (i || (i = numeric.rep(numeric.dim(e), 0), this.y = i); s < c - 1; )
        r = t[s], e = e[r], i = i[r], s++;
      return r = t[s], e[r] = f, i[r] = h, this;
    }
    if (i) {
      for (; s < c - 1; )
        r = t[s], e = e[r], i = i[r], s++;
      return r = t[s], e[r] = f, f instanceof Array ? i[r] = numeric.rep(numeric.dim(f), 0) : i[r] = 0, this;
    }
    for (; s < c - 1; )
      r = t[s], e = e[r], s++;
    return r = t[s], e[r] = f, this;
  }, numeric.T.prototype.getRows = function(t, n) {
    var e = n - t + 1, i, s = Array(e), r, c = this.x, f = this.y;
    for (i = t; i <= n; i++)
      s[i - t] = c[i];
    if (f) {
      for (r = Array(e), i = t; i <= n; i++)
        r[i - t] = f[i];
      return new numeric.T(s, r);
    }
    return new numeric.T(s);
  }, numeric.T.prototype.setRows = function(t, n, e) {
    var i, s = this.x, r = this.y, c = e.x, f = e.y;
    for (i = t; i <= n; i++)
      s[i] = c[i - t];
    if (f)
      for (r || (r = numeric.rep(numeric.dim(s), 0), this.y = r), i = t; i <= n; i++)
        r[i] = f[i - t];
    else if (r)
      for (i = t; i <= n; i++)
        r[i] = numeric.rep([c[i - t].length], 0);
    return this;
  }, numeric.T.prototype.getRow = function(t) {
    var n = this.x, e = this.y;
    return e ? new numeric.T(n[t], e[t]) : new numeric.T(n[t]);
  }, numeric.T.prototype.setRow = function(t, n) {
    var e = this.x, i = this.y, s = n.x, r = n.y;
    return e[t] = s, r ? (i || (i = numeric.rep(numeric.dim(e), 0), this.y = i), i[t] = r) : i && (i = numeric.rep([s.length], 0)), this;
  }, numeric.T.prototype.getBlock = function(t, n) {
    var e = this.x, i = this.y, s = numeric.getBlock;
    return i ? new numeric.T(s(e, t, n), s(i, t, n)) : new numeric.T(s(e, t, n));
  }, numeric.T.prototype.setBlock = function(t, n, e) {
    e instanceof numeric.T || (e = new numeric.T(e));
    var i = this.x, s = this.y, r = numeric.setBlock, c = e.x, f = e.y;
    if (f)
      return s || (this.y = numeric.rep(numeric.dim(this), 0), s = this.y), r(i, t, n, c), r(s, t, n, f), this;
    r(i, t, n, c), s && r(s, t, n, numeric.rep(numeric.dim(c), 0));
  }, numeric.T.rep = function(t, n) {
    var e = numeric.T;
    n instanceof e || (n = new e(n));
    var i = n.x, s = n.y, r = numeric.rep;
    return s ? new e(r(t, i), r(t, s)) : new e(r(t, i));
  }, numeric.T.diag = function(t) {
    t instanceof numeric.T || (t = new numeric.T(t));
    var n = t.x, e = t.y, i = numeric.diag;
    return e ? new numeric.T(i(n), i(e)) : new numeric.T(i(n));
  }, numeric.T.eig = function() {
    if (this.y)
      throw new Error("eig: not implemented for complex matrices.");
    return numeric.eig(this.x);
  }, numeric.T.identity = function(t) {
    return new numeric.T(numeric.identity(t));
  }, numeric.T.prototype.getDiag = function() {
    var t = numeric, n = this.x, e = this.y;
    return e ? new t.T(t.getDiag(n), t.getDiag(e)) : new t.T(t.getDiag(n));
  }, numeric.house = function(t) {
    var n = numeric.clone(t), e = t[0] >= 0 ? 1 : -1, i = e * numeric.norm2(t);
    n[0] += i;
    var s = numeric.norm2(n);
    if (s === 0)
      throw new Error("eig: internal error");
    return numeric.div(n, s);
  }, numeric.toUpperHessenberg = function(t) {
    var n = numeric.dim(t);
    if (n.length !== 2 || n[0] !== n[1])
      throw new Error("numeric: toUpperHessenberg() only works on square matrices");
    var e = n[0], i, s, r, c, f, h = numeric.clone(t), o, v, p, l, m = numeric.identity(e), d;
    for (s = 0; s < e - 2; s++) {
      for (c = Array(e - s - 1), i = s + 1; i < e; i++)
        c[i - s - 1] = h[i][s];
      if (numeric.norm2(c) > 0) {
        for (f = numeric.house(c), o = numeric.getBlock(h, [s + 1, s], [e - 1, e - 1]), v = numeric.tensor(f, numeric.dot(f, o)), i = s + 1; i < e; i++)
          for (p = h[i], l = v[i - s - 1], r = s; r < e; r++) p[r] -= 2 * l[r - s];
        for (o = numeric.getBlock(h, [0, s + 1], [e - 1, e - 1]), v = numeric.tensor(numeric.dot(o, f), f), i = 0; i < e; i++)
          for (p = h[i], l = v[i], r = s + 1; r < e; r++) p[r] -= 2 * l[r - s - 1];
        for (o = Array(e - s - 1), i = s + 1; i < e; i++) o[i - s - 1] = m[i];
        for (v = numeric.tensor(f, numeric.dot(f, o)), i = s + 1; i < e; i++)
          for (d = m[i], l = v[i - s - 1], r = 0; r < e; r++) d[r] -= 2 * l[r];
      }
    }
    return { H: h, Q: m };
  }, numeric.epsilon = 2220446049250313e-31, numeric.QRFrancis = function(S, t) {
    typeof t > "u" && (t = 1e4), S = numeric.clone(S), numeric.clone(S);
    var n = numeric.dim(S), e = n[0], i, s, r, c, f, h, o, v, p, l = numeric.identity(e), m, d, _, D, q, F, x, N, R;
    if (e < 3)
      return { Q: l, B: [[0, e - 1]] };
    var I = numeric.epsilon;
    for (R = 0; R < t; R++) {
      for (x = 0; x < e - 1; x++)
        if (Math.abs(S[x + 1][x]) < I * (Math.abs(S[x][x]) + Math.abs(S[x + 1][x + 1]))) {
          var u = numeric.QRFrancis(numeric.getBlock(S, [0, 0], [x, x]), t), b = numeric.QRFrancis(numeric.getBlock(S, [x + 1, x + 1], [e - 1, e - 1]), t);
          for (_ = Array(x + 1), F = 0; F <= x; F++)
            _[F] = l[F];
          for (D = numeric.dot(u.Q, _), F = 0; F <= x; F++)
            l[F] = D[F];
          for (_ = Array(e - x - 1), F = x + 1; F < e; F++)
            _[F - x - 1] = l[F];
          for (D = numeric.dot(b.Q, _), F = x + 1; F < e; F++)
            l[F] = D[F - x - 1];
          return { Q: l, B: u.B.concat(numeric.add(b.B, x + 1)) };
        }
      if (r = S[e - 2][e - 2], c = S[e - 2][e - 1], f = S[e - 1][e - 2], h = S[e - 1][e - 1], v = r + h, o = r * h - c * f, p = numeric.getBlock(S, [0, 0], [2, 2]), v * v >= 4 * o) {
        var Z, G;
        Z = 0.5 * (v + Math.sqrt(v * v - 4 * o)), G = 0.5 * (v - Math.sqrt(v * v - 4 * o)), p = numeric.add(
          numeric.sub(
            numeric.dot(p, p),
            numeric.mul(p, Z + G)
          ),
          numeric.diag(numeric.rep([3], Z * G))
        );
      } else
        p = numeric.add(
          numeric.sub(
            numeric.dot(p, p),
            numeric.mul(p, v)
          ),
          numeric.diag(numeric.rep([3], o))
        );
      for (i = [p[0][0], p[1][0], p[2][0]], s = numeric.house(i), _ = [S[0], S[1], S[2]], D = numeric.tensor(s, numeric.dot(s, _)), F = 0; F < 3; F++)
        for (d = S[F], q = D[F], N = 0; N < e; N++) d[N] -= 2 * q[N];
      for (_ = numeric.getBlock(S, [0, 0], [e - 1, 2]), D = numeric.tensor(numeric.dot(_, s), s), F = 0; F < e; F++)
        for (d = S[F], q = D[F], N = 0; N < 3; N++) d[N] -= 2 * q[N];
      for (_ = [l[0], l[1], l[2]], D = numeric.tensor(s, numeric.dot(s, _)), F = 0; F < 3; F++)
        for (m = l[F], q = D[F], N = 0; N < e; N++) m[N] -= 2 * q[N];
      var J;
      for (x = 0; x < e - 2; x++) {
        for (N = x; N <= x + 1; N++)
          if (Math.abs(S[N + 1][N]) < I * (Math.abs(S[N][N]) + Math.abs(S[N + 1][N + 1]))) {
            var u = numeric.QRFrancis(numeric.getBlock(S, [0, 0], [N, N]), t), b = numeric.QRFrancis(numeric.getBlock(S, [N + 1, N + 1], [e - 1, e - 1]), t);
            for (_ = Array(N + 1), F = 0; F <= N; F++)
              _[F] = l[F];
            for (D = numeric.dot(u.Q, _), F = 0; F <= N; F++)
              l[F] = D[F];
            for (_ = Array(e - N - 1), F = N + 1; F < e; F++)
              _[F - N - 1] = l[F];
            for (D = numeric.dot(b.Q, _), F = N + 1; F < e; F++)
              l[F] = D[F - N - 1];
            return { Q: l, B: u.B.concat(numeric.add(b.B, N + 1)) };
          }
        for (J = Math.min(e - 1, x + 3), i = Array(J - x), F = x + 1; F <= J; F++)
          i[F - x - 1] = S[F][x];
        for (s = numeric.house(i), _ = numeric.getBlock(S, [x + 1, x], [J, e - 1]), D = numeric.tensor(s, numeric.dot(s, _)), F = x + 1; F <= J; F++)
          for (d = S[F], q = D[F - x - 1], N = x; N < e; N++) d[N] -= 2 * q[N - x];
        for (_ = numeric.getBlock(S, [0, x + 1], [e - 1, J]), D = numeric.tensor(numeric.dot(_, s), s), F = 0; F < e; F++)
          for (d = S[F], q = D[F], N = x + 1; N <= J; N++) d[N] -= 2 * q[N - x - 1];
        for (_ = Array(J - x), F = x + 1; F <= J; F++) _[F - x - 1] = l[F];
        for (D = numeric.tensor(s, numeric.dot(s, _)), F = x + 1; F <= J; F++)
          for (m = l[F], q = D[F - x - 1], N = 0; N < e; N++) m[N] -= 2 * q[N];
      }
    }
    throw new Error("numeric: eigenvalue iteration does not converge -- increase maxiter?");
  }, numeric.eig = function(t, n) {
    var e = numeric.toUpperHessenberg(t), i = numeric.QRFrancis(e.H, n), s = numeric.T, r0 = t.length, r, c, f = i.B, h = numeric.dot(i.Q, numeric.dot(e.H, numeric.transpose(i.Q))), o = new s(numeric.dot(i.Q, e.Q)), v, p = f.length, l, m, d, _, D, q, F, x, N, R, I, u, b, Z, G = Math.sqrt;
    for (c = 0; c < p; c++)
      if (r = f[c][0], r !== f[c][1]) {
        if (l = r + 1, m = h[r][r], d = h[r][l], _ = h[l][r], D = h[l][l], d === 0 && _ === 0) continue;
        q = -m - D, F = m * D - d * _, x = q * q - 4 * F, x >= 0 ? (q < 0 ? N = -0.5 * (q - G(x)) : N = -0.5 * (q + G(x)), b = (m - N) * (m - N) + d * d, Z = _ * _ + (D - N) * (D - N), b > Z ? (b = G(b), I = (m - N) / b, u = d / b) : (Z = G(Z), I = _ / Z, u = (D - N) / Z), v = new s([[u, -I], [I, u]]), o.setRows(r, l, v.dot(o.getRows(r, l)))) : (N = -0.5 * q, R = 0.5 * G(-x), b = (m - N) * (m - N) + d * d, Z = _ * _ + (D - N) * (D - N), b > Z ? (b = G(b + R * R), I = (m - N) / b, u = d / b, N = 0, R /= b) : (Z = G(Z + R * R), I = _ / Z, u = (D - N) / Z, N = R / Z, R = 0), v = new s([[u, -I], [I, u]], [[N, R], [R, -N]]), o.setRows(r, l, v.dot(o.getRows(r, l))));
      }
    var J = o.dot(t).dot(o.transjugate()), r0 = t.length, s0 = numeric.T.identity(r0);
    for (l = 0; l < r0; l++)
      if (l > 0)
        for (c = l - 1; c >= 0; c--) {
          var C0 = J.get([c, c]), _0 = J.get([l, l]);
          if (numeric.neq(C0.x, _0.x) || numeric.neq(C0.y, _0.y))
            N = J.getRow(c).getBlock([c], [l - 1]), R = s0.getRow(l).getBlock([c], [l - 1]), s0.set([l, c], J.get([c, l]).neg().sub(N.dot(R)).div(C0.sub(_0)));
          else {
            s0.setRow(l, s0.getRow(c));
            continue;
          }
        }
    for (l = 0; l < r0; l++)
      N = s0.getRow(l), s0.setRow(l, N.div(N.norm2()));
    return s0 = s0.transpose(), s0 = o.transjugate().dot(s0), { lambda: J.getDiag(), E: s0 };
  }, numeric.ccsSparse = function(t) {
    var n = t.length, c, e, i, s, r = [];
    for (i = n - 1; i !== -1; --i) {
      e = t[i];
      for (s in e) {
        for (s = parseInt(s); s >= r.length; ) r[r.length] = 0;
        e[s] !== 0 && r[s]++;
      }
    }
    var c = r.length, f = Array(c + 1);
    for (f[0] = 0, i = 0; i < c; ++i) f[i + 1] = f[i] + r[i];
    var h = Array(f[c]), o = Array(f[c]);
    for (i = n - 1; i !== -1; --i) {
      e = t[i];
      for (s in e)
        e[s] !== 0 && (r[s]--, h[f[s] + r[s]] = i, o[f[s] + r[s]] = e[s]);
    }
    return [f, h, o];
  }, numeric.ccsFull = function(t) {
    var n = t[0], e = t[1], i = t[2], s = numeric.ccsDim(t), r = s[0], c = s[1], f, h, o, v, p = numeric.rep([r, c], 0);
    for (f = 0; f < c; f++)
      for (o = n[f], v = n[f + 1], h = o; h < v; ++h)
        p[e[h]][f] = i[h];
    return p;
  }, numeric.ccsTSolve = function(t, n, e, i, s) {
    var r = t[0], c = t[1], f = t[2], h = r.length - 1, o = Math.max, v = 0;
    typeof i > "u" && (e = numeric.rep([h], 0)), typeof i > "u" && (i = numeric.linspace(0, e.length - 1)), typeof s > "u" && (s = []);
    function p(x) {
      var N;
      if (e[x] === 0) {
        for (e[x] = 1, N = r[x]; N < r[x + 1]; ++N) p(c[N]);
        s[v] = x, ++v;
      }
    }
    var l, m, d, _, D, q, F;
    for (l = i.length - 1; l !== -1; --l)
      p(i[l]);
    for (s.length = v, l = s.length - 1; l !== -1; --l)
      e[s[l]] = 0;
    for (l = i.length - 1; l !== -1; --l)
      m = i[l], e[m] = n[m];
    for (l = s.length - 1; l !== -1; --l) {
      for (m = s[l], d = r[m], _ = o(r[m + 1], d), D = d; D !== _; ++D)
        if (c[D] === m) {
          e[m] /= f[D];
          break;
        }
      for (F = e[m], D = d; D !== _; ++D)
        q = c[D], q !== m && (e[q] -= F * f[D]);
    }
    return e;
  }, numeric.ccsDFS = function(t) {
    this.k = Array(t), this.k1 = Array(t), this.j = Array(t);
  }, numeric.ccsDFS.prototype.dfs = function(t, n, e, i, s, r) {
    var c = 0, f, h = s.length, o = this.k, v = this.k1, p = this.j, l, m;
    if (i[t] === 0)
      for (i[t] = 1, p[0] = t, o[0] = l = n[t], v[0] = m = n[t + 1]; ; )
        if (l >= m) {
          if (s[h] = p[c], c === 0) return;
          ++h, --c, l = o[c], m = v[c];
        } else
          f = r[e[l]], i[f] === 0 ? (i[f] = 1, o[c] = l, ++c, p[c] = f, l = n[f], v[c] = m = n[f + 1]) : ++l;
  }, numeric.ccsLPSolve = function(t, n, e, i, s, r, c) {
    var f = t[0], h = t[1], o = t[2];
    f.length - 1;
    var v = n[0], p = n[1], l = n[2], m, d, _, D, q, F, x, N, R;
    for (d = v[s], _ = v[s + 1], i.length = 0, m = d; m < _; ++m)
      c.dfs(r[p[m]], f, h, e, i, r);
    for (m = i.length - 1; m !== -1; --m)
      e[i[m]] = 0;
    for (m = d; m !== _; ++m)
      D = r[p[m]], e[D] = l[m];
    for (m = i.length - 1; m !== -1; --m) {
      for (D = i[m], q = f[D], F = f[D + 1], x = q; x < F; ++x)
        if (r[h[x]] === D) {
          e[D] /= o[x];
          break;
        }
      for (R = e[D], x = q; x < F; ++x)
        N = r[h[x]], N !== D && (e[N] -= R * o[x]);
    }
    return e;
  }, numeric.ccsLUP1 = function(t, n) {
    var e = t[0].length - 1, i = [numeric.rep([e + 1], 0), [], []], s = [numeric.rep([e + 1], 0), [], []], r = i[0], c = i[1], f = i[2], h = s[0], o = s[1], v = s[2], p = numeric.rep([e], 0), l = numeric.rep([e], 0), m, d, _, D, q, F, x, N = numeric.ccsLPSolve, R = Math.abs, I = numeric.linspace(0, e - 1), u = numeric.linspace(0, e - 1), b = new numeric.ccsDFS(e);
    for (typeof n > "u" && (n = 1), m = 0; m < e; ++m) {
      for (N(i, t, p, l, m, u, b), D = -1, q = -1, d = l.length - 1; d !== -1; --d)
        _ = l[d], !(_ <= m) && (F = R(p[_]), F > D && (q = _, D = F));
      for (R(p[m]) < n * D && (d = I[m], D = I[q], I[m] = D, u[D] = m, I[q] = d, u[d] = q, D = p[m], p[m] = p[q], p[q] = D), D = r[m], q = h[m], x = p[m], c[D] = I[m], f[D] = 1, ++D, d = l.length - 1; d !== -1; --d)
        _ = l[d], F = p[_], l[d] = 0, p[_] = 0, _ <= m ? (o[q] = _, v[q] = F, ++q) : (c[D] = I[_], f[D] = F / x, ++D);
      r[m + 1] = D, h[m + 1] = q;
    }
    for (d = c.length - 1; d !== -1; --d)
      c[d] = u[c[d]];
    return { L: i, U: s, P: I, Pinv: u };
  }, numeric.ccsDFS0 = function(t) {
    this.k = Array(t), this.k1 = Array(t), this.j = Array(t);
  }, numeric.ccsDFS0.prototype.dfs = function(t, n, e, i, s, r, c) {
    var f = 0, h, o = s.length, v = this.k, p = this.k1, l = this.j, m, d;
    if (i[t] === 0)
      for (i[t] = 1, l[0] = t, v[0] = m = n[r[t]], p[0] = d = n[r[t] + 1]; ; ) {
        if (isNaN(m)) throw new Error("Ow!");
        if (m >= d) {
          if (s[o] = r[l[f]], f === 0) return;
          ++o, --f, m = v[f], d = p[f];
        } else
          h = e[m], i[h] === 0 ? (i[h] = 1, v[f] = m, ++f, l[f] = h, h = r[h], m = n[h], p[f] = d = n[h + 1]) : ++m;
      }
  }, numeric.ccsLPSolve0 = function(t, n, e, i, s, r, c, f) {
    var h = t[0], o = t[1], v = t[2];
    h.length - 1;
    var p = n[0], l = n[1], m = n[2], d, _, D, q, F, x, N, R, I;
    for (_ = p[s], D = p[s + 1], i.length = 0, d = _; d < D; ++d)
      f.dfs(l[d], h, o, e, i, r, c);
    for (d = i.length - 1; d !== -1; --d)
      q = i[d], e[c[q]] = 0;
    for (d = _; d !== D; ++d)
      q = l[d], e[q] = m[d];
    for (d = i.length - 1; d !== -1; --d) {
      for (q = i[d], R = c[q], F = h[q], x = h[q + 1], N = F; N < x; ++N)
        if (o[N] === R) {
          e[R] /= v[N];
          break;
        }
      for (I = e[R], N = F; N < x; ++N) e[o[N]] -= I * v[N];
      e[R] = I;
    }
  }, numeric.ccsLUP0 = function(t, n) {
    var e = t[0].length - 1, i = [numeric.rep([e + 1], 0), [], []], s = [numeric.rep([e + 1], 0), [], []], r = i[0], c = i[1], f = i[2], h = s[0], o = s[1], v = s[2], p = numeric.rep([e], 0), l = numeric.rep([e], 0), m, d, _, D, q, F, x, N = numeric.ccsLPSolve0, R = Math.abs, I = numeric.linspace(0, e - 1), u = numeric.linspace(0, e - 1), b = new numeric.ccsDFS0(e);
    for (typeof n > "u" && (n = 1), m = 0; m < e; ++m) {
      for (N(i, t, p, l, m, u, I, b), D = -1, q = -1, d = l.length - 1; d !== -1; --d)
        _ = l[d], !(_ <= m) && (F = R(p[I[_]]), F > D && (q = _, D = F));
      for (R(p[I[m]]) < n * D && (d = I[m], D = I[q], I[m] = D, u[D] = m, I[q] = d, u[d] = q), D = r[m], q = h[m], x = p[I[m]], c[D] = I[m], f[D] = 1, ++D, d = l.length - 1; d !== -1; --d)
        _ = l[d], F = p[I[_]], l[d] = 0, p[I[_]] = 0, _ <= m ? (o[q] = _, v[q] = F, ++q) : (c[D] = I[_], f[D] = F / x, ++D);
      r[m + 1] = D, h[m + 1] = q;
    }
    for (d = c.length - 1; d !== -1; --d)
      c[d] = u[c[d]];
    return { L: i, U: s, P: I, Pinv: u };
  }, numeric.ccsLUP = numeric.ccsLUP0, numeric.ccsDim = function(t) {
    return [numeric.sup(t[1]) + 1, t[0].length - 1];
  }, numeric.ccsGetBlock = function(t, n, e) {
    var i = numeric.ccsDim(t), s = i[0], r = i[1];
    typeof n > "u" ? n = numeric.linspace(0, s - 1) : typeof n == "number" && (n = [n]), typeof e > "u" ? e = numeric.linspace(0, r - 1) : typeof e == "number" && (e = [e]);
    var c, f = n.length, h, o = e.length, v, p, l, m = numeric.rep([r], 0), d = [], _ = [], D = [m, d, _], q = t[0], F = t[1], x = t[2], N = numeric.rep([s], 0), R = 0, I = numeric.rep([s], 0);
    for (h = 0; h < o; ++h) {
      p = e[h];
      var u = q[p], b = q[p + 1];
      for (c = u; c < b; ++c)
        v = F[c], I[v] = 1, N[v] = x[c];
      for (c = 0; c < f; ++c)
        l = n[c], I[l] && (d[R] = c, _[R] = N[n[c]], ++R);
      for (c = u; c < b; ++c)
        v = F[c], I[v] = 0;
      m[h + 1] = R;
    }
    return D;
  }, numeric.ccsDot = function(t, n) {
    var e = t[0], i = t[1], s = t[2], r = n[0], c = n[1], f = n[2], h = numeric.ccsDim(t), o = numeric.ccsDim(n), v = h[0];
    h[1];
    var p = o[1], l = numeric.rep([v], 0), m = numeric.rep([v], 0), d = Array(v), _ = numeric.rep([p], 0), D = [], q = [], F = [_, D, q], x, N, R, I, u, b, Z, G, J, r0, s0;
    for (R = 0; R !== p; ++R) {
      for (I = r[R], u = r[R + 1], J = 0, N = I; N < u; ++N)
        for (r0 = c[N], s0 = f[N], b = e[r0], Z = e[r0 + 1], x = b; x < Z; ++x)
          G = i[x], m[G] === 0 && (d[J] = G, m[G] = 1, J = J + 1), l[G] = l[G] + s[x] * s0;
      for (I = _[R], u = I + J, _[R + 1] = u, N = J - 1; N !== -1; --N)
        s0 = I + N, x = d[N], D[s0] = x, q[s0] = l[x], m[x] = 0, l[x] = 0;
      _[R + 1] = _[R] + J;
    }
    return F;
  }, numeric.ccsLUPSolve = function(t, n) {
    var e = t.L, i = t.U;
    t.P;
    var s = n[0], r = !1;
    typeof s != "object" && (n = [[0, n.length], numeric.linspace(0, n.length - 1), n], s = n[0], r = !0);
    var c = n[1], f = n[2], h = e[0].length - 1, o = s.length - 1, v = numeric.rep([h], 0), p = Array(h), l = numeric.rep([h], 0), m = Array(h), d = numeric.rep([o + 1], 0), _ = [], D = [], q = numeric.ccsTSolve, F, x, N, R, I, u, b = 0;
    for (F = 0; F < o; ++F) {
      for (I = 0, N = s[F], R = s[F + 1], x = N; x < R; ++x)
        u = t.Pinv[c[x]], m[I] = u, l[u] = f[x], ++I;
      for (m.length = I, q(e, l, v, m, p), x = m.length - 1; x !== -1; --x) l[m[x]] = 0;
      if (q(i, v, l, p, m), r) return l;
      for (x = p.length - 1; x !== -1; --x) v[p[x]] = 0;
      for (x = m.length - 1; x !== -1; --x)
        u = m[x], _[b] = u, D[b] = l[u], l[u] = 0, ++b;
      d[F + 1] = b;
    }
    return [d, _, D];
  }, numeric.ccsbinop = function(t, n) {
    return typeof n > "u" && (n = ""), Function(
      "X",
      "Y",
      `var Xi = X[0], Xj = X[1], Xv = X[2];
var Yi = Y[0], Yj = Y[1], Yv = Y[2];
var n = Xi.length-1,m = Math.max(numeric.sup(Xj),numeric.sup(Yj))+1;
var Zi = numeric.rep([n+1],0), Zj = [], Zv = [];
var x = numeric.rep([m],0),y = numeric.rep([m],0);
var xk,yk,zk;
var i,j,j0,j1,k,p=0;
` + n + `for(i=0;i<n;++i) {
  j0 = Xi[i]; j1 = Xi[i+1];
  for(j=j0;j!==j1;++j) {
    k = Xj[j];
    x[k] = 1;
    Zj[p] = k;
    ++p;
  }
  j0 = Yi[i]; j1 = Yi[i+1];
  for(j=j0;j!==j1;++j) {
    k = Yj[j];
    y[k] = Yv[j];
    if(x[k] === 0) {
      Zj[p] = k;
      ++p;
    }
  }
  Zi[i+1] = p;
  j0 = Xi[i]; j1 = Xi[i+1];
  for(j=j0;j!==j1;++j) x[Xj[j]] = Xv[j];
  j0 = Zi[i]; j1 = Zi[i+1];
  for(j=j0;j!==j1;++j) {
    k = Zj[j];
    xk = x[k];
    yk = y[k];
` + t + `
    Zv[j] = zk;
  }
  j0 = Xi[i]; j1 = Xi[i+1];
  for(j=j0;j!==j1;++j) x[Xj[j]] = 0;
  j0 = Yi[i]; j1 = Yi[i+1];
  for(j=j0;j!==j1;++j) y[Yj[j]] = 0;
}
return [Zi,Zj,Zv];`
    );
  }, function() {
    var k, A, B, C;
    for (k in numeric.ops2)
      isFinite(eval("1" + numeric.ops2[k] + "0")) ? A = "[Y[0],Y[1],numeric." + k + "(X,Y[2])]" : A = "NaN", isFinite(eval("0" + numeric.ops2[k] + "1")) ? B = "[X[0],X[1],numeric." + k + "(X[2],Y)]" : B = "NaN", isFinite(eval("1" + numeric.ops2[k] + "0")) && isFinite(eval("0" + numeric.ops2[k] + "1")) ? C = "numeric.ccs" + k + "MM(X,Y)" : C = "NaN", numeric["ccs" + k + "MM"] = numeric.ccsbinop("zk = xk " + numeric.ops2[k] + "yk;"), numeric["ccs" + k] = Function(
        "X",
        "Y",
        'if(typeof X === "number") return ' + A + `;
if(typeof Y === "number") return ` + B + `;
return ` + C + `;
`
      );
  }(), numeric.ccsScatter = function S(t) {
    var n = t[0], e = t[1], i = t[2], s = numeric.sup(e) + 1, r = n.length, c = numeric.rep([s], 0), f = Array(r), h = Array(r), o = numeric.rep([s], 0), v;
    for (v = 0; v < r; ++v) o[e[v]]++;
    for (v = 0; v < s; ++v) c[v + 1] = c[v] + o[v];
    var p = c.slice(0), l, m;
    for (v = 0; v < r; ++v)
      m = e[v], l = p[m], f[l] = n[v], h[l] = i[v], p[m] = p[m] + 1;
    return [c, f, h];
  }, numeric.ccsGather = function S(t) {
    var n = t[0], e = t[1], i = t[2], s = n.length - 1, r = e.length, c = Array(r), f = Array(r), h = Array(r), o, v, p, l, m;
    for (m = 0, o = 0; o < s; ++o)
      for (p = n[o], l = n[o + 1], v = p; v !== l; ++v)
        f[m] = o, c[m] = e[v], h[m] = i[v], ++m;
    return [c, f, h];
  }, numeric.sdim = function S(t, n, e) {
    if (typeof n > "u" && (n = []), typeof t != "object") return n;
    typeof e > "u" && (e = 0), e in n || (n[e] = 0), t.length > n[e] && (n[e] = t.length);
    var i;
    for (i in t)
      t.hasOwnProperty(i) && S(t[i], n, e + 1);
    return n;
  }, numeric.sclone = function S(t, n, e) {
    typeof n > "u" && (n = 0), typeof e > "u" && (e = numeric.sdim(t).length);
    var i, s = Array(t.length);
    if (n === e - 1) {
      for (i in t)
        t.hasOwnProperty(i) && (s[i] = t[i]);
      return s;
    }
    for (i in t)
      t.hasOwnProperty(i) && (s[i] = S(t[i], n + 1, e));
    return s;
  }, numeric.sdiag = function S(t) {
    var n = t.length, e, i = Array(n), s;
    for (e = n - 1; e >= 1; e -= 2)
      s = e - 1, i[e] = [], i[e][e] = t[e], i[s] = [], i[s][s] = t[s];
    return e === 0 && (i[0] = [], i[0][0] = t[e]), i;
  }, numeric.sidentity = function S(t) {
    return numeric.sdiag(numeric.rep([t], 1));
  }, numeric.stranspose = function S(t) {
    var n = [];
    t.length;
    var e, i, s;
    for (e in t)
      if (t.hasOwnProperty(e)) {
        s = t[e];
        for (i in s)
          s.hasOwnProperty(i) && (typeof n[i] != "object" && (n[i] = []), n[i][e] = s[i]);
      }
    return n;
  }, numeric.sLUP = function S(t, n) {
    throw new Error("The function numeric.sLUP had a bug in it and has been removed. Please use the new numeric.ccsLUP function instead.");
  }, numeric.sdotMM = function S(t, n) {
    var e = t.length;
    n.length;
    var i = numeric.stranspose(n), s = i.length, r, c, f, h, o, v, p = Array(e), l;
    for (f = e - 1; f >= 0; f--) {
      for (l = [], r = t[f], o = s - 1; o >= 0; o--) {
        v = 0, c = i[o];
        for (h in r)
          r.hasOwnProperty(h) && h in c && (v += r[h] * c[h]);
        v && (l[o] = v);
      }
      p[f] = l;
    }
    return p;
  }, numeric.sdotMV = function S(t, n) {
    var e = t.length, i, s, r, c = Array(e), f;
    for (s = e - 1; s >= 0; s--) {
      i = t[s], f = 0;
      for (r in i)
        i.hasOwnProperty(r) && n[r] && (f += i[r] * n[r]);
      f && (c[s] = f);
    }
    return c;
  }, numeric.sdotVM = function S(t, n) {
    var e, i, s, r, c = [];
    for (e in t)
      if (t.hasOwnProperty(e)) {
        s = n[e], r = t[e];
        for (i in s)
          s.hasOwnProperty(i) && (c[i] || (c[i] = 0), c[i] += r * s[i]);
      }
    return c;
  }, numeric.sdotVV = function S(t, n) {
    var e, i = 0;
    for (e in t)
      t[e] && n[e] && (i += t[e] * n[e]);
    return i;
  }, numeric.sdot = function S(t, n) {
    var e = numeric.sdim(t).length, i = numeric.sdim(n).length, s = e * 1e3 + i;
    switch (s) {
      case 0:
        return t * n;
      case 1001:
        return numeric.sdotVV(t, n);
      case 2001:
        return numeric.sdotMV(t, n);
      case 1002:
        return numeric.sdotVM(t, n);
      case 2002:
        return numeric.sdotMM(t, n);
      default:
        throw new Error("numeric.sdot not implemented for tensors of order " + e + " and " + i);
    }
  }, numeric.sscatter = function S(t) {
    var n = t[0].length, e, i, s, r = t.length, c = [], f;
    for (i = n - 1; i >= 0; --i)
      if (t[r - 1][i]) {
        for (f = c, s = 0; s < r - 2; s++)
          e = t[s][i], f[e] || (f[e] = []), f = f[e];
        f[t[s][i]] = t[s + 1][i];
      }
    return c;
  }, numeric.sgather = function S(t, n, e) {
    typeof n > "u" && (n = []), typeof e > "u" && (e = []);
    var i, s, r;
    i = e.length;
    for (s in t)
      if (t.hasOwnProperty(s))
        if (e[i] = parseInt(s), r = t[s], typeof r == "number") {
          if (r) {
            if (n.length === 0)
              for (s = i + 1; s >= 0; --s) n[s] = [];
            for (s = i; s >= 0; --s) n[s].push(e[s]);
            n[i + 1].push(r);
          }
        } else S(r, n, e);
    return e.length > i && e.pop(), n;
  }, numeric.cLU = function S(t) {
    var n = t[0], e = t[1], i = t[2], b = n.length, s = 0, r, c, f, h, o, v;
    for (r = 0; r < b; r++) n[r] > s && (s = n[r]);
    s++;
    var p = Array(s), l = Array(s), m = numeric.rep([s], 1 / 0), d = numeric.rep([s], -1 / 0), F, x, _;
    for (f = 0; f < b; f++)
      r = n[f], c = e[f], c < m[r] && (m[r] = c), c > d[r] && (d[r] = c);
    for (r = 0; r < s - 1; r++)
      d[r] > d[r + 1] && (d[r + 1] = d[r]);
    for (r = s - 1; r >= 1; r--)
      m[r] < m[r - 1] && (m[r - 1] = m[r]);
    var D = 0, q = 0;
    for (r = 0; r < s; r++)
      l[r] = numeric.rep([d[r] - m[r] + 1], 0), p[r] = numeric.rep([r - m[r]], 0), D += r - m[r] + 1, q += d[r] - r + 1;
    for (f = 0; f < b; f++)
      r = n[f], l[r][e[f] - m[r]] = i[f];
    for (r = 0; r < s - 1; r++)
      for (h = r - m[r], F = l[r], c = r + 1; m[c] <= r && c < s; c++)
        if (o = r - m[c], v = d[r] - r, x = l[c], _ = x[o] / F[h], _) {
          for (f = 1; f <= v; f++)
            x[f + o] -= _ * F[f + h];
          p[c][r - m[c]] = _;
        }
    var F = [], x = [], N = [], R = [], I = [], u = [], b, Z, G;
    for (b = 0, Z = 0, r = 0; r < s; r++) {
      for (h = m[r], o = d[r], G = l[r], c = r; c <= o; c++)
        G[c - h] && (F[b] = r, x[b] = c, N[b] = G[c - h], b++);
      for (G = p[r], c = h; c < r; c++)
        G[c - h] && (R[Z] = r, I[Z] = c, u[Z] = G[c - h], Z++);
      R[Z] = r, I[Z] = r, u[Z] = 1, Z++;
    }
    return { U: [F, x, N], L: [R, I, u] };
  }, numeric.cLUsolve = function S(t, n) {
    var e = t.L, i = t.U, s = numeric.clone(n), r = e[0], c = e[1], f = e[2], h = i[0], o = i[1], v = i[2], p = h.length;
    r.length;
    var l = s.length, m, d;
    for (d = 0, m = 0; m < l; m++) {
      for (; c[d] < m; )
        s[m] -= f[d] * s[c[d]], d++;
      d++;
    }
    for (d = p - 1, m = l - 1; m >= 0; m--) {
      for (; o[d] > m; )
        s[m] -= v[d] * s[o[d]], d--;
      s[m] /= v[d], d--;
    }
    return s;
  }, numeric.cgrid = function S(t, n) {
    typeof t == "number" && (t = [t, t]);
    var e = numeric.rep(t, -1), i, s, r;
    if (typeof n != "function")
      switch (n) {
        case "L":
          n = function(c, f) {
            return c >= t[0] / 2 || f < t[1] / 2;
          };
          break;
        default:
          n = function(c, f) {
            return !0;
          };
          break;
      }
    for (r = 0, i = 1; i < t[0] - 1; i++) for (s = 1; s < t[1] - 1; s++)
      n(i, s) && (e[i][s] = r, r++);
    return e;
  }, numeric.cdelsq = function S(t) {
    var n = [[-1, 0], [0, -1], [0, 1], [1, 0]], e = numeric.dim(t), i = e[0], s = e[1], r, c, f, h, o, v = [], p = [], l = [];
    for (r = 1; r < i - 1; r++) for (c = 1; c < s - 1; c++)
      if (!(t[r][c] < 0)) {
        for (f = 0; f < 4; f++)
          h = r + n[f][0], o = c + n[f][1], !(t[h][o] < 0) && (v.push(t[r][c]), p.push(t[h][o]), l.push(-1));
        v.push(t[r][c]), p.push(t[r][c]), l.push(4);
      }
    return [v, p, l];
  }, numeric.cdotMV = function S(t, n) {
    var e, i = t[0], s = t[1], r = t[2], c, f = i.length, h;
    for (h = 0, c = 0; c < f; c++)
      i[c] > h && (h = i[c]);
    for (h++, e = numeric.rep([h], 0), c = 0; c < f; c++)
      e[i[c]] += r[c] * n[s[c]];
    return e;
  }, numeric.Spline = function S(t, n, e, i, s) {
    this.x = t, this.yl = n, this.yr = e, this.kl = i, this.kr = s;
  }, numeric.Spline.prototype._at = function S(f, n) {
    var e = this.x, i = this.yl, s = this.yr, r = this.kl, c = this.kr, f, h, o, v, p = numeric.add, l = numeric.sub, m = numeric.mul;
    h = l(m(r[n], e[n + 1] - e[n]), l(s[n + 1], i[n])), o = p(m(c[n + 1], e[n] - e[n + 1]), l(s[n + 1], i[n])), v = (f - e[n]) / (e[n + 1] - e[n]);
    var d = v * (1 - v);
    return p(p(p(m(1 - v, i[n]), m(v, s[n + 1])), m(h, d * (1 - v))), m(o, d * v));
  }, numeric.Spline.prototype.at = function S(t) {
    if (typeof t == "number") {
      var n = this.x, c = n.length, e, i, s, r = Math.floor;
      for (e = 0, i = c - 1; i - e > 1; )
        s = r((e + i) / 2), n[s] <= t ? e = s : i = s;
      return this._at(t, e);
    }
    var c = t.length, f, h = Array(c);
    for (f = c - 1; f !== -1; --f) h[f] = this.at(t[f]);
    return h;
  }, numeric.Spline.prototype.diff = function S() {
    var t = this.x, n = this.yl, e = this.yr, i = this.kl, s = this.kr, r = n.length, c, f, h, o = i, v = s, p = Array(r), l = Array(r), m = numeric.add, d = numeric.mul, _ = numeric.div, D = numeric.sub;
    for (c = r - 1; c !== -1; --c)
      f = t[c + 1] - t[c], h = D(e[c + 1], n[c]), p[c] = _(m(d(h, 6), d(i[c], -4 * f), d(s[c + 1], -2 * f)), f * f), l[c + 1] = _(m(d(h, -6), d(i[c], 2 * f), d(s[c + 1], 4 * f)), f * f);
    return new numeric.Spline(t, o, v, p, l);
  }, numeric.Spline.prototype.roots = function S() {
    function t(M) {
      return M * M;
    }
    var _ = [], n = this.x, e = this.yl, i = this.yr, s = this.kl, r = this.kr;
    typeof e[0] == "number" && (e = [e], i = [i], s = [s], r = [r]);
    var c = e.length, f = n.length - 1, h, o, v, p, l, m, d, _ = Array(c), D, q, F, x, N, R, I, u, b, Z, G, J, r0, s0, C0, _0, D0 = Math.sqrt;
    for (h = 0; h !== c; ++h) {
      for (p = e[h], l = i[h], m = s[h], d = r[h], D = [], o = 0; o !== f; o++) {
        for (o > 0 && l[o] * p[o] < 0 && D.push(n[o]), b = n[o + 1] - n[o], n[o], x = p[o], N = l[o + 1], q = m[o] / b, F = d[o + 1] / b, u = t(q - F + 3 * (x - N)) + 12 * F * x, R = F + 3 * x + 2 * q - 3 * N, I = 3 * (F + q + 2 * (x - N)), u <= 0 ? (G = R / I, G > n[o] && G < n[o + 1] ? Z = [n[o], G, n[o + 1]] : Z = [n[o], n[o + 1]]) : (G = (R - D0(u)) / I, J = (R + D0(u)) / I, Z = [n[o]], G > n[o] && G < n[o + 1] && Z.push(G), J > n[o] && J < n[o + 1] && Z.push(J), Z.push(n[o + 1])), s0 = Z[0], G = this._at(s0, o), v = 0; v < Z.length - 1; v++) {
          if (C0 = Z[v + 1], J = this._at(C0, o), G === 0) {
            D.push(s0), s0 = C0, G = J;
            continue;
          }
          if (J === 0 || G * J > 0) {
            s0 = C0, G = J;
            continue;
          }
          for (var j = 0; _0 = (G * C0 - J * s0) / (G - J), !(_0 <= s0 || _0 >= C0); )
            if (r0 = this._at(_0, o), r0 * J > 0)
              C0 = _0, J = r0, j === -1 && (G *= 0.5), j = -1;
            else if (r0 * G > 0)
              s0 = _0, G = r0, j === 1 && (J *= 0.5), j = 1;
            else break;
          D.push(_0), s0 = Z[v + 1], G = this._at(s0, o);
        }
        J === 0 && D.push(C0);
      }
      _[h] = D;
    }
    return typeof this.yl[0] == "number" ? _[0] : _;
  }, numeric.spline = function S(t, n, e, i) {
    var s = t.length, r = [], c = [], f = [], h, o = numeric.sub, v = numeric.mul, p = numeric.add;
    for (h = s - 2; h >= 0; h--)
      c[h] = t[h + 1] - t[h], f[h] = o(n[h + 1], n[h]);
    (typeof e == "string" || typeof i == "string") && (e = i = "periodic");
    var l = [[], [], []];
    switch (typeof e) {
      case "undefined":
        r[0] = v(3 / (c[0] * c[0]), f[0]), l[0].push(0, 0), l[1].push(0, 1), l[2].push(2 / c[0], 1 / c[0]);
        break;
      case "string":
        r[0] = p(v(3 / (c[s - 2] * c[s - 2]), f[s - 2]), v(3 / (c[0] * c[0]), f[0])), l[0].push(0, 0, 0), l[1].push(s - 2, 0, 1), l[2].push(1 / c[s - 2], 2 / c[s - 2] + 2 / c[0], 1 / c[0]);
        break;
      default:
        r[0] = e, l[0].push(0), l[1].push(0), l[2].push(1);
        break;
    }
    for (h = 1; h < s - 1; h++)
      r[h] = p(v(3 / (c[h - 1] * c[h - 1]), f[h - 1]), v(3 / (c[h] * c[h]), f[h])), l[0].push(h, h, h), l[1].push(h - 1, h, h + 1), l[2].push(1 / c[h - 1], 2 / c[h - 1] + 2 / c[h], 1 / c[h]);
    switch (typeof i) {
      case "undefined":
        r[s - 1] = v(3 / (c[s - 2] * c[s - 2]), f[s - 2]), l[0].push(s - 1, s - 1), l[1].push(s - 2, s - 1), l[2].push(1 / c[s - 2], 2 / c[s - 2]);
        break;
      case "string":
        l[1][l[1].length - 1] = 0;
        break;
      default:
        r[s - 1] = i, l[0].push(s - 1), l[1].push(s - 1), l[2].push(1);
        break;
    }
    typeof r[0] != "number" ? r = numeric.transpose(r) : r = [r];
    var m = Array(r.length);
    if (typeof e == "string")
      for (h = m.length - 1; h !== -1; --h)
        m[h] = numeric.ccsLUPSolve(numeric.ccsLUP(numeric.ccsScatter(l)), r[h]), m[h][s - 1] = m[h][0];
    else
      for (h = m.length - 1; h !== -1; --h)
        m[h] = numeric.cLUsolve(numeric.cLU(l), r[h]);
    return typeof n[0] == "number" ? m = m[0] : m = numeric.transpose(m), new numeric.Spline(t, n, n, m, m);
  }, numeric.fftpow2 = function S(t, n) {
    var e = t.length;
    if (e !== 1) {
      var i = Math.cos, s = Math.sin, r, c, f = Array(e / 2), h = Array(e / 2), o = Array(e / 2), v = Array(e / 2);
      for (c = e / 2, r = e - 1; r !== -1; --r)
        --c, o[c] = t[r], v[c] = n[r], --r, f[c] = t[r], h[c] = n[r];
      S(f, h), S(o, v), c = e / 2;
      var p, l = -6.283185307179586 / e, m, d;
      for (r = e - 1; r !== -1; --r)
        --c, c === -1 && (c = e / 2 - 1), p = l * r, m = i(p), d = s(p), t[r] = f[c] + m * o[c] - d * v[c], n[r] = h[c] + m * v[c] + d * o[c];
    }
  }, numeric._ifftpow2 = function S(t, n) {
    var e = t.length;
    if (e !== 1) {
      var i = Math.cos, s = Math.sin, r, c, f = Array(e / 2), h = Array(e / 2), o = Array(e / 2), v = Array(e / 2);
      for (c = e / 2, r = e - 1; r !== -1; --r)
        --c, o[c] = t[r], v[c] = n[r], --r, f[c] = t[r], h[c] = n[r];
      S(f, h), S(o, v), c = e / 2;
      var p, l = 6.283185307179586 / e, m, d;
      for (r = e - 1; r !== -1; --r)
        --c, c === -1 && (c = e / 2 - 1), p = l * r, m = i(p), d = s(p), t[r] = f[c] + m * o[c] - d * v[c], n[r] = h[c] + m * v[c] + d * o[c];
    }
  }, numeric.ifftpow2 = function S(t, n) {
    numeric._ifftpow2(t, n), numeric.diveq(t, t.length), numeric.diveq(n, n.length);
  }, numeric.convpow2 = function S(t, n, e, i) {
    numeric.fftpow2(t, n), numeric.fftpow2(e, i);
    var s, r = t.length, c, f, h, o;
    for (s = r - 1; s !== -1; --s)
      c = t[s], h = n[s], f = e[s], o = i[s], t[s] = c * f - h * o, n[s] = c * o + h * f;
    numeric.ifftpow2(t, n);
  }, numeric.T.prototype.fft = function S() {
    var t = this.x, n = this.y, e = t.length, i = Math.log, s = i(2), r = Math.ceil(i(2 * e - 1) / s), c = Math.pow(2, r), f = numeric.rep([c], 0), h = numeric.rep([c], 0), o = Math.cos, v = Math.sin, p, l = -3.141592653589793 / e, m, d = numeric.rep([c], 0), _ = numeric.rep([c], 0);
    for (p = 0; p < e; p++) d[p] = t[p];
    if (typeof n < "u") for (p = 0; p < e; p++) _[p] = n[p];
    for (f[0] = 1, p = 1; p <= c / 2; p++)
      m = l * p * p, f[p] = o(m), h[p] = v(m), f[c - p] = o(m), h[c - p] = v(m);
    var D = new numeric.T(d, _), q = new numeric.T(f, h);
    return D = D.mul(q), numeric.convpow2(D.x, D.y, numeric.clone(q.x), numeric.neg(q.y)), D = D.mul(q), D.x.length = e, D.y.length = e, D;
  }, numeric.T.prototype.ifft = function S() {
    var t = this.x, n = this.y, e = t.length, i = Math.log, s = i(2), r = Math.ceil(i(2 * e - 1) / s), c = Math.pow(2, r), f = numeric.rep([c], 0), h = numeric.rep([c], 0), o = Math.cos, v = Math.sin, p, l = 3.141592653589793 / e, m, d = numeric.rep([c], 0), _ = numeric.rep([c], 0);
    for (p = 0; p < e; p++) d[p] = t[p];
    if (typeof n < "u") for (p = 0; p < e; p++) _[p] = n[p];
    for (f[0] = 1, p = 1; p <= c / 2; p++)
      m = l * p * p, f[p] = o(m), h[p] = v(m), f[c - p] = o(m), h[c - p] = v(m);
    var D = new numeric.T(d, _), q = new numeric.T(f, h);
    return D = D.mul(q), numeric.convpow2(D.x, D.y, numeric.clone(q.x), numeric.neg(q.y)), D = D.mul(q), D.x.length = e, D.y.length = e, D.div(e);
  }, numeric.gradient = function S(t, n) {
    var e = n.length, i = t(n);
    if (isNaN(i)) throw new Error("gradient: f(x) is a NaN!");
    var v = Math.max, s, r = numeric.clone(n), c, f, h = Array(e);
    numeric.div, numeric.sub;
    var o, v = Math.max, p = 1e-3, l = Math.abs, m = Math.min, d, _, D, q = 0, F, x, N;
    for (s = 0; s < e; s++)
      for (var R = v(1e-6 * i, 1e-8); ; ) {
        if (++q, q > 20)
          throw new Error("Numerical gradient fails");
        if (r[s] = n[s] + R, c = t(r), r[s] = n[s] - R, f = t(r), r[s] = n[s], isNaN(c) || isNaN(f)) {
          R /= 16;
          continue;
        }
        if (h[s] = (c - f) / (2 * R), d = n[s] - R, _ = n[s], D = n[s] + R, F = (c - i) / R, x = (i - f) / R, N = v(l(h[s]), l(i), l(c), l(f), l(d), l(_), l(D), 1e-8), o = m(v(l(F - h[s]), l(x - h[s]), l(F - x)) / N, R / N), o > p)
          R /= 16;
        else break;
      }
    return h;
  }, numeric.uncmin = function S(t, n, e, i, s, r, c) {
    var f = numeric.gradient;
    typeof c > "u" && (c = {}), typeof e > "u" && (e = 1e-8), typeof i > "u" && (i = function(t0) {
      return f(t, t0);
    }), typeof s > "u" && (s = 1e3), n = numeric.clone(n);
    var h = n.length, o = t(n), v, p;
    if (isNaN(o)) throw new Error("uncmin: f(x0) is a NaN!");
    var l = Math.max, m = numeric.norm2;
    e = l(e, numeric.epsilon);
    var d, _, D, q = c.Hinv || numeric.identity(h), F = numeric.dot;
    numeric.inv;
    var x = numeric.sub, N = numeric.add, R = numeric.tensor, I = numeric.div, u = numeric.mul, b = numeric.all, Z = numeric.isFinite, G = numeric.neg, J = 0, r0, s0, C0, _0, D0, j, M, z = "";
    for (_ = i(n); J < s; ) {
      if (typeof r == "function" && r(J, n, o, _, q)) {
        z = "Callback returned true";
        break;
      }
      if (!b(Z(_))) {
        z = "Gradient has Infinity or NaN";
        break;
      }
      if (d = G(F(q, _)), !b(Z(d))) {
        z = "Search direction has Infinity or NaN";
        break;
      }
      if (M = m(d), M < e) {
        z = "Newton step smaller than tol";
        break;
      }
      for (j = 1, p = F(_, d), s0 = n; J < s && !(j * M < e); ) {
        if (r0 = u(d, j), s0 = N(n, r0), v = t(s0), v - o >= 0.1 * j * p || isNaN(v)) {
          j *= 0.5, ++J;
          continue;
        }
        break;
      }
      if (j * M < e) {
        z = "Line search step size smaller than tol";
        break;
      }
      if (J === s) {
        z = "maxit reached during line search";
        break;
      }
      D = i(s0), C0 = x(D, _), D0 = F(C0, r0), _0 = F(q, C0), q = x(
        N(
          q,
          u(
            (D0 + F(C0, _0)) / (D0 * D0),
            R(r0, r0)
          )
        ),
        I(N(R(_0, r0), R(r0, _0)), D0)
      ), n = s0, o = v, _ = D, ++J;
    }
    return { solution: n, f: o, gradient: _, invHessian: q, iterations: J, message: z };
  }, numeric.Dopri = function S(t, n, e, i, s, r, c) {
    this.x = t, this.y = n, this.f = e, this.ymid = i, this.iterations = s, this.events = c, this.message = r;
  }, numeric.Dopri.prototype._at = function S(d, n) {
    function e(u) {
      return u * u;
    }
    var i = this, s = i.x, r = i.y, c = i.f, f = i.ymid;
    s.length;
    var h, o, v, p, l, m, d, _, D = 0.5, q = numeric.add, F = numeric.mul, x = numeric.sub, N, R, I;
    return h = s[n], o = s[n + 1], p = r[n], l = r[n + 1], _ = o - h, v = h + D * _, m = f[n], N = x(c[n], F(p, 1 / (h - v) + 2 / (h - o))), R = x(c[n + 1], F(l, 1 / (o - v) + 2 / (o - h))), I = [
      e(d - o) * (d - v) / e(h - o) / (h - v),
      e(d - h) * e(d - o) / e(h - v) / e(o - v),
      e(d - h) * (d - v) / e(o - h) / (o - v),
      (d - h) * e(d - o) * (d - v) / e(h - o) / (h - v),
      (d - o) * e(d - h) * (d - v) / e(h - o) / (o - v)
    ], q(
      q(
        q(
          q(
            F(p, I[0]),
            F(m, I[1])
          ),
          F(l, I[2])
        ),
        F(N, I[3])
      ),
      F(R, I[4])
    );
  }, numeric.Dopri.prototype.at = function S(t) {
    var n, e, i, s = Math.floor;
    if (typeof t != "number") {
      var r = t.length, c = Array(r);
      for (n = r - 1; n !== -1; --n)
        c[n] = this.at(t[n]);
      return c;
    }
    var f = this.x;
    for (n = 0, e = f.length - 1; e - n > 1; )
      i = s(0.5 * (n + e)), f[i] <= t ? n = i : e = i;
    return this._at(t, n);
  }, numeric.dopri = function S(t, n, e, i, s, r, c) {
    typeof s > "u" && (s = 1e-6), typeof r > "u" && (r = 1e3);
    var f = [t], h = [e], o = [i(t, e)], v, p, l, m, d, _, D = [], q = 1 / 5, F = [3 / 40, 9 / 40], x = [44 / 45, -56 / 15, 32 / 9], N = [19372 / 6561, -25360 / 2187, 64448 / 6561, -212 / 729], R = [9017 / 3168, -355 / 33, 46732 / 5247, 49 / 176, -5103 / 18656], I = [35 / 384, 0, 500 / 1113, 125 / 192, -2187 / 6784, 11 / 84], u = [
      0.5 * 6025192743 / 30085553152,
      0,
      0.5 * 51252292925 / 65400821598,
      0.5 * -2691868925 / 45128329728,
      0.5 * 187940372067 / 1594534317056,
      0.5 * -1776094331 / 19743644256,
      0.5 * 11237099 / 235043384
    ], b = [1 / 5, 3 / 10, 4 / 5, 8 / 9, 1, 1], Z = [-71 / 57600, 0, 71 / 16695, -71 / 1920, 17253 / 339200, -22 / 525, 1 / 40], G = 0, J, r0, s0 = (n - t) / 10, C0 = 0, _0 = numeric.add, D0 = numeric.mul, j, M, z = Math.min, t0 = Math.abs, i0 = numeric.norminf, c0 = Math.pow, g0 = numeric.any, w = numeric.lt, g = numeric.and;
    numeric.sub;
    var E, Q, O, X = new numeric.Dopri(f, h, o, D, -1, "");
    for (typeof c == "function" && (E = c(t, e)); t < n && C0 < r; ) {
      if (++C0, t + s0 > n && (s0 = n - t), v = i(t + b[0] * s0, _0(e, D0(q * s0, o[G]))), p = i(t + b[1] * s0, _0(_0(e, D0(F[0] * s0, o[G])), D0(F[1] * s0, v))), l = i(t + b[2] * s0, _0(_0(_0(e, D0(x[0] * s0, o[G])), D0(x[1] * s0, v)), D0(x[2] * s0, p))), m = i(t + b[3] * s0, _0(_0(_0(_0(e, D0(N[0] * s0, o[G])), D0(N[1] * s0, v)), D0(N[2] * s0, p)), D0(N[3] * s0, l))), d = i(t + b[4] * s0, _0(_0(_0(_0(_0(e, D0(R[0] * s0, o[G])), D0(R[1] * s0, v)), D0(R[2] * s0, p)), D0(R[3] * s0, l)), D0(R[4] * s0, m))), j = _0(_0(_0(_0(_0(e, D0(o[G], s0 * I[0])), D0(p, s0 * I[2])), D0(l, s0 * I[3])), D0(m, s0 * I[4])), D0(d, s0 * I[5])), _ = i(t + s0, j), J = _0(_0(_0(_0(_0(D0(o[G], s0 * Z[0]), D0(p, s0 * Z[2])), D0(l, s0 * Z[3])), D0(m, s0 * Z[4])), D0(d, s0 * Z[5])), D0(_, s0 * Z[6])), typeof J == "number" ? M = t0(J) : M = i0(J), M > s) {
        if (s0 = 0.2 * s0 * c0(s / M, 0.25), t + s0 === t) {
          X.msg = "Step size became too small";
          break;
        }
        continue;
      }
      if (D[G] = _0(
        _0(
          _0(
            _0(
              _0(
                _0(
                  e,
                  D0(o[G], s0 * u[0])
                ),
                D0(p, s0 * u[2])
              ),
              D0(l, s0 * u[3])
            ),
            D0(m, s0 * u[4])
          ),
          D0(d, s0 * u[5])
        ),
        D0(_, s0 * u[6])
      ), ++G, f[G] = t + s0, h[G] = j, o[G] = _, typeof c == "function") {
        var $, o0 = t, d0 = t + 0.5 * s0, L;
        if (Q = c(d0, D[G - 1]), O = g(w(E, 0), w(0, Q)), g0(O) || (o0 = d0, d0 = t + s0, E = Q, Q = c(d0, j), O = g(w(E, 0), w(0, Q))), g0(O)) {
          for (var K, n0, f0 = 0, u0 = 1, a = 1; ; ) {
            if (typeof E == "number") L = (a * Q * o0 - u0 * E * d0) / (a * Q - u0 * E);
            else
              for (L = d0, r0 = E.length - 1; r0 !== -1; --r0)
                E[r0] < 0 && Q[r0] > 0 && (L = z(L, (a * Q[r0] * o0 - u0 * E[r0] * d0) / (a * Q[r0] - u0 * E[r0])));
            if (L <= o0 || L >= d0) break;
            $ = X._at(L, G - 1), n0 = c(L, $), K = g(w(E, 0), w(0, n0)), g0(K) ? (d0 = L, Q = n0, O = K, a = 1, f0 === -1 ? u0 *= 0.5 : u0 = 1, f0 = -1) : (o0 = L, E = n0, u0 = 1, f0 === 1 ? a *= 0.5 : a = 1, f0 = 1);
          }
          return j = X._at(0.5 * (t + L), G - 1), X.f[G] = i(L, $), X.x[G] = L, X.y[G] = $, X.ymid[G - 1] = j, X.events = O, X.iterations = C0, X;
        }
      }
      t += s0, e = j, E = Q, s0 = z(0.8 * s0 * c0(s / M, 0.25), 4 * s0);
    }
    return X.iterations = C0, X;
  }, numeric.LU = function(S, t) {
    t = t || !1;
    var n = Math.abs, e, i, s, r, c, f, h, o, v, p = S.length, l = p - 1, m = new Array(p);
    for (t || (S = numeric.clone(S)), s = 0; s < p; ++s) {
      for (h = s, f = S[s], v = n(f[s]), i = s + 1; i < p; ++i)
        r = n(S[i][s]), v < r && (v = r, h = i);
      for (m[s] = h, h != s && (S[s] = S[h], S[h] = f, f = S[s]), c = f[s], e = s + 1; e < p; ++e)
        S[e][s] /= c;
      for (e = s + 1; e < p; ++e) {
        for (o = S[e], i = s + 1; i < l; ++i)
          o[i] -= o[s] * f[i], ++i, o[i] -= o[s] * f[i];
        i === l && (o[i] -= o[s] * f[i]);
      }
    }
    return {
      LU: S,
      P: m
    };
  }, numeric.LUsolve = function S(t, n) {
    var e, i, s = t.LU, r = s.length, c = numeric.clone(n), f = t.P, h, o, v;
    for (e = r - 1; e !== -1; --e) c[e] = n[e];
    for (e = 0; e < r; ++e)
      for (h = f[e], f[e] !== e && (v = c[e], c[e] = c[h], c[h] = v), o = s[e], i = 0; i < e; ++i)
        c[e] -= c[i] * o[i];
    for (e = r - 1; e >= 0; --e) {
      for (o = s[e], i = e + 1; i < r; ++i)
        c[e] -= c[i] * o[i];
      c[e] /= o[e];
    }
    return c;
  }, numeric.solve = function S(t, n, e) {
    return numeric.LUsolve(numeric.LU(t, e), n);
  }, numeric.echelonize = function S(t) {
    var n = numeric.dim(t), e = n[0], i = n[1], s = numeric.identity(e), r = Array(e), c, f, h, o, v, p, l, m, d = Math.abs, _ = numeric.diveq;
    for (t = numeric.clone(t), c = 0; c < e; ++c) {
      for (h = 0, v = t[c], p = s[c], f = 1; f < i; ++f) d(v[h]) < d(v[f]) && (h = f);
      for (r[c] = h, _(p, v[h]), _(v, v[h]), f = 0; f < e; ++f) if (f !== c) {
        for (l = t[f], m = l[h], o = i - 1; o !== -1; --o) l[o] -= v[o] * m;
        for (l = s[f], o = e - 1; o !== -1; --o) l[o] -= p[o] * m;
      }
    }
    return { I: s, A: t, P: r };
  }, numeric.__solveLP = function S(t, n, e, i, s, r, c) {
    var f = numeric.sum;
    numeric.log;
    var h = numeric.mul, o = numeric.sub, v = numeric.dot, p = numeric.div, l = numeric.add, m = t.length, d = e.length, _, D = !1, q = 0, F = 1;
    numeric.transpose(n), numeric.svd;
    var x = numeric.transpose;
    numeric.leq;
    var N = Math.sqrt, R = Math.abs;
    numeric.muleq, numeric.norminf, numeric.any;
    var I = Math.min, u = numeric.all, b = numeric.gt, Z = Array(m), G = Array(d);
    numeric.rep([d], 1);
    var J, r0 = numeric.solve, s0 = o(e, v(n, r)), C0, _0 = v(t, t), D0;
    for (C0 = q; C0 < s; ++C0) {
      var j, M;
      for (j = d - 1; j !== -1; --j) G[j] = p(n[j], s0[j]);
      var z = x(G);
      for (j = m - 1; j !== -1; --j) Z[j] = /*x[i]+*/
      f(z[j]);
      F = 0.25 * R(_0 / v(t, Z));
      var t0 = 100 * N(_0 / v(Z, Z));
      for ((!isFinite(F) || F > t0) && (F = t0), D0 = l(t, h(F, Z)), J = v(z, G), j = m - 1; j !== -1; --j) J[j][j] += 1;
      M = r0(J, p(D0, F), !0);
      var i0 = p(s0, v(n, M)), c0 = 1;
      for (j = d - 1; j !== -1; --j) i0[j] < 0 && (c0 = I(c0, -0.999 * i0[j]));
      if (_ = o(r, h(M, c0)), s0 = o(e, v(n, _)), !u(b(s0, 0))) return { solution: r, message: "", iterations: C0 };
      if (r = _, F < i) return { solution: _, message: "", iterations: C0 };
      if (c) {
        var g0 = v(t, D0), w = v(n, D0);
        for (D = !0, j = d - 1; j !== -1; --j) if (g0 * w[j] < 0) {
          D = !1;
          break;
        }
      } else
        r[m - 1] >= 0 ? D = !1 : D = !0;
      if (D) return { solution: _, message: "Unbounded", iterations: C0 };
    }
    return { solution: r, message: "maximum iteration count exceeded", iterations: C0 };
  }, numeric._solveLP = function S(t, n, e, i, s) {
    var r = t.length, c = e.length, m;
    numeric.sum, numeric.log, numeric.mul;
    var f = numeric.sub, h = numeric.dot;
    numeric.div, numeric.add;
    var o = numeric.rep([r], 0).concat([1]), v = numeric.rep([c, 1], -1), p = numeric.blockMatrix([[n, v]]), l = e, m = numeric.rep([r], 0).concat(Math.max(0, numeric.sup(numeric.neg(e))) + 1), d = numeric.__solveLP(o, p, l, i, s, m, !1), _ = numeric.clone(d.solution);
    _.length = r;
    var D = numeric.inf(f(e, h(n, _)));
    if (D < 0)
      return { solution: NaN, message: "Infeasible", iterations: d.iterations };
    var q = numeric.__solveLP(t, n, e, i, s - d.iterations, _, !0);
    return q.iterations += d.iterations, q;
  }, numeric.solveLP = function S(t, n, e, i, s, r, c) {
    if (typeof c > "u" && (c = 1e3), typeof r > "u" && (r = numeric.epsilon), typeof i > "u") return numeric._solveLP(t, n, e, r, c);
    var f = i.length, h = i[0].length, o = n.length, v = numeric.echelonize(i), p = numeric.rep([h], 0), l = v.P, m = [], d;
    for (d = l.length - 1; d !== -1; --d) p[l[d]] = 1;
    for (d = h - 1; d !== -1; --d) p[d] === 0 && m.push(d);
    var _ = numeric.getRange, D = numeric.linspace(0, f - 1), q = numeric.linspace(0, o - 1), F = _(i, D, m), x = _(n, q, l), N = _(n, q, m), R = numeric.dot, I = numeric.sub, u = R(x, v.I), b = I(N, R(u, F)), Z = I(e, R(u, s)), G = Array(l.length), J = Array(m.length);
    for (d = l.length - 1; d !== -1; --d) G[d] = t[l[d]];
    for (d = m.length - 1; d !== -1; --d) J[d] = t[m[d]];
    var r0 = I(J, R(G, R(v.I, F))), s0 = numeric._solveLP(r0, b, Z, r, c), C0 = s0.solution;
    if (C0 !== C0) return s0;
    var _0 = R(v.I, I(s, R(F, C0))), D0 = Array(t.length);
    for (d = l.length - 1; d !== -1; --d) D0[l[d]] = _0[d];
    for (d = m.length - 1; d !== -1; --d) D0[m[d]] = C0[d];
    return { solution: D0, message: s0.message, iterations: s0.iterations };
  }, numeric.MPStoLP = function S(t) {
    t instanceof String && t.split(`
`);
    var n = 0, e = ["Initial state", "NAME", "ROWS", "COLUMNS", "RHS", "BOUNDS", "ENDATA"], i = t.length, s, r, c, f = 0, h = {}, o = [], v = 0, p = {}, l = 0, m, d = [], _ = [], D = [];
    function q(I) {
      throw new Error("MPStoLP: " + I + `
Line ` + s + ": " + t[s] + `
Current state: ` + e[n] + `
`);
    }
    for (s = 0; s < i; ++s) {
      c = t[s];
      var F = c.match(/\S*/g), x = [];
      for (r = 0; r < F.length; ++r) F[r] !== "" && x.push(F[r]);
      if (x.length !== 0) {
        for (r = 0; r < e.length && c.substr(0, e[r].length) !== e[r]; ++r) ;
        if (r < e.length) {
          if (n = r, r === 1 && (m = x[1]), r === 6) return { name: m, c: d, A: numeric.transpose(_), b: D, rows: h, vars: p };
          continue;
        }
        switch (n) {
          case 0:
          case 1:
            q("Unexpected line");
          case 2:
            switch (x[0]) {
              case "N":
                f === 0 ? f = x[1] : q("Two or more N rows");
                break;
              case "L":
                h[x[1]] = v, o[v] = 1, D[v] = 0, ++v;
                break;
              case "G":
                h[x[1]] = v, o[v] = -1, D[v] = 0, ++v;
                break;
              case "E":
                h[x[1]] = v, o[v] = 0, D[v] = 0, ++v;
                break;
              default:
                q("Parse error " + numeric.prettyPrint(x));
            }
            break;
          case 3:
            p.hasOwnProperty(x[0]) || (p[x[0]] = l, d[l] = 0, _[l] = numeric.rep([v], 0), ++l);
            var N = p[x[0]];
            for (r = 1; r < x.length; r += 2) {
              if (x[r] === f) {
                d[N] = parseFloat(x[r + 1]);
                continue;
              }
              var R = h[x[r]];
              _[N][R] = (o[R] < 0 ? -1 : 1) * parseFloat(x[r + 1]);
            }
            break;
          case 4:
            for (r = 1; r < x.length; r += 2) D[h[x[r]]] = (o[h[x[r]]] < 0 ? -1 : 1) * parseFloat(x[r + 1]);
            break;
          case 5:
            break;
          case 6:
            q("Internal error");
        }
      }
    }
    q("Reached end of file without ENDATA");
  }, numeric.seedrandom = { pow: Math.pow, random: Math.random }, function(S, t, n, e, i, s, r) {
    t.seedrandom = function(p, l) {
      var m = [], d;
      return p = h(f(
        l ? [p, S] : arguments.length ? p : [(/* @__PURE__ */ new Date()).getTime(), S, window],
        3
      ), m), d = new c(m), h(d.S, S), t.random = function() {
        for (var D = d.g(e), q = r, F = 0; D < i; )
          D = (D + F) * n, q *= n, F = d.g(1);
        for (; D >= s; )
          D /= 2, q /= 2, F >>>= 1;
        return (D + F) / q;
      }, p;
    };
    function c(v) {
      var p, l, m = this, d = v.length, _ = 0, D = m.i = m.j = m.m = 0;
      for (m.S = [], m.c = [], d || (v = [d++]); _ < n; )
        m.S[_] = _++;
      for (_ = 0; _ < n; _++)
        p = m.S[_], D = o(D + p + v[_ % d]), l = m.S[D], m.S[_] = l, m.S[D] = p;
      m.g = function(F) {
        var x = m.S, N = o(m.i + 1), R = x[N], I = o(m.j + R), u = x[I];
        x[N] = u, x[I] = R;
        for (var b = x[o(R + u)]; --F; )
          N = o(N + 1), R = x[N], I = o(I + R), u = x[I], x[N] = u, x[I] = R, b = b * n + x[o(R + u)];
        return m.i = N, m.j = I, b;
      }, m.g(n);
    }
    function f(v, p, l, m, d) {
      if (l = [], d = typeof v, p && d == "object") {
        for (m in v)
          if (m.indexOf("S") < 5)
            try {
              l.push(f(v[m], p - 1));
            } catch {
            }
      }
      return l.length ? l : v + (d != "string" ? "\0" : "");
    }
    function h(v, p, l, m) {
      for (v += "", l = 0, m = 0; m < v.length; m++)
        p[o(m)] = o((l ^= p[o(m)] * 19) + v.charCodeAt(m));
      v = "";
      for (m in p)
        v += String.fromCharCode(p[m]);
      return v;
    }
    function o(v) {
      return v & n - 1;
    }
    r = t.pow(n, e), i = t.pow(2, i), s = i * 2, h(t.random(), S);
  }(
    [],
    // pool: entropy pool starts empty
    numeric.seedrandom,
    // math: package containing random, pow, and seedrandom
    256,
    // width: each RC4 output is 0 <= x < 256
    6,
    // chunks: at least six RC4 outputs for each double
    52
    // significance: there are 52 significant digits in a double
  ), function(S) {
    function t(f) {
      if (typeof f != "object")
        return f;
      var h = [], o, v = f.length;
      for (o = 0; o < v; o++) h[o + 1] = t(f[o]);
      return h;
    }
    function n(f) {
      if (typeof f != "object")
        return f;
      var h = [], o, v = f.length;
      for (o = 1; o < v; o++) h[o - 1] = n(f[o]);
      return h;
    }
    function e(f, h, o) {
      var v, p, l, m, d;
      for (l = 1; l <= o; l = l + 1) {
        for (f[l][l] = 1 / f[l][l], d = -f[l][l], v = 1; v < l; v = v + 1)
          f[v][l] = d * f[v][l];
        if (m = l + 1, o < m)
          break;
        for (p = m; p <= o; p = p + 1)
          for (d = f[l][p], f[l][p] = 0, v = 1; v <= l; v = v + 1)
            f[v][p] = f[v][p] + d * f[v][l];
      }
    }
    function i(f, h, o, v) {
      var p, l, m, d;
      for (l = 1; l <= o; l = l + 1) {
        for (d = 0, p = 1; p < l; p = p + 1)
          d = d + f[p][l] * v[p];
        v[l] = (v[l] - d) / f[l][l];
      }
      for (m = 1; m <= o; m = m + 1)
        for (l = o + 1 - m, v[l] = v[l] / f[l][l], d = -v[l], p = 1; p < l; p = p + 1)
          v[p] = v[p] + d * f[p][l];
    }
    function s(f, h, o, v) {
      var p, l, m, d, _, D;
      for (l = 1; l <= o; l = l + 1) {
        if (v[1] = l, D = 0, m = l - 1, m < 1) {
          if (D = f[l][l] - D, D <= 0)
            break;
          f[l][l] = Math.sqrt(D);
        } else {
          for (d = 1; d <= m; d = d + 1) {
            for (_ = f[d][l], p = 1; p < d; p = p + 1)
              _ = _ - f[p][l] * f[p][d];
            _ = _ / f[d][d], f[d][l] = _, D = D + _ * _;
          }
          if (D = f[l][l] - D, D <= 0)
            break;
          f[l][l] = Math.sqrt(D);
        }
        v[1] = 0;
      }
    }
    function r(f, h, o, v, p, l, m, d, _, D, q, F, x, N, R, I) {
      var u, b, Z, G, J, r0, s0, C0, _0, D0, j, M, z, t0, i0, c0, g0, w, g, E, Q, O, X, $, o0, d0, L;
      z = Math.min(v, D), Z = 2 * v + z * (z + 5) / 2 + 2 * D + 1, $ = 1e-60;
      do
        $ = $ + $, o0 = 1 + 0.1 * $, d0 = 1 + 0.2 * $;
      while (o0 <= 1 || d0 <= 1);
      for (u = 1; u <= v; u = u + 1)
        R[u] = h[u];
      for (u = v + 1; u <= Z; u = u + 1)
        R[u] = 0;
      for (u = 1; u <= D; u = u + 1)
        F[u] = 0;
      if (J = [], I[1] === 0) {
        if (s(f, o, v, J), J[1] !== 0) {
          I[1] = 2;
          return;
        }
        i(f, o, v, h), e(f, o, v);
      } else {
        for (b = 1; b <= v; b = b + 1)
          for (p[b] = 0, u = 1; u <= b; u = u + 1)
            p[b] = p[b] + f[u][b] * h[u];
        for (b = 1; b <= v; b = b + 1)
          for (h[b] = 0, u = b; u <= v; u = u + 1)
            h[b] = h[b] + f[b][u] * p[u];
      }
      for (l[1] = 0, b = 1; b <= v; b = b + 1)
        for (p[b] = h[b], l[1] = l[1] + R[b] * p[b], R[b] = 0, u = b + 1; u <= v; u = u + 1)
          f[u][b] = 0;
      for (l[1] = -l[1] / 2, I[1] = 0, s0 = v, C0 = s0 + v, j = C0 + z, _0 = j + z + 1, D0 = _0 + z * (z + 1) / 2, t0 = D0 + D, u = 1; u <= D; u = u + 1) {
        for (c0 = 0, b = 1; b <= v; b = b + 1)
          c0 = c0 + m[b][u] * m[b][u];
        R[t0 + u] = Math.sqrt(c0);
      }
      x = 0, N[1] = 0, N[2] = 0;
      function K() {
        for (N[1] = N[1] + 1, Z = D0, u = 1; u <= D; u = u + 1) {
          for (Z = Z + 1, c0 = -d[u], b = 1; b <= v; b = b + 1)
            c0 = c0 + m[b][u] * p[b];
          if (Math.abs(c0) < $ && (c0 = 0), u > q)
            R[Z] = c0;
          else if (R[Z] = -Math.abs(c0), c0 > 0) {
            for (b = 1; b <= v; b = b + 1)
              m[b][u] = -m[b][u];
            d[u] = -d[u];
          }
        }
        for (u = 1; u <= x; u = u + 1)
          R[D0 + F[u]] = 0;
        for (M = 0, i0 = 0, u = 1; u <= D; u = u + 1)
          R[D0 + u] < i0 * R[t0 + u] && (M = u, i0 = R[D0 + u] / R[t0 + u]);
        return M === 0 ? 999 : 0;
      }
      function n0() {
        for (u = 1; u <= v; u = u + 1) {
          for (c0 = 0, b = 1; b <= v; b = b + 1)
            c0 = c0 + f[b][u] * m[b][M];
          R[u] = c0;
        }
        for (G = s0, u = 1; u <= v; u = u + 1)
          R[G + u] = 0;
        for (b = x + 1; b <= v; b = b + 1)
          for (u = 1; u <= v; u = u + 1)
            R[G + u] = R[G + u] + f[u][b] * R[b];
        for (O = !0, u = x; u >= 1; u = u - 1) {
          for (c0 = R[u], Z = _0 + u * (u + 3) / 2, G = Z - u, b = u + 1; b <= x; b = b + 1)
            c0 = c0 - R[Z] * R[C0 + b], Z = Z + b;
          if (c0 = c0 / R[G], R[C0 + u] = c0, F[u] < q || c0 < 0)
            break;
          O = !1, r0 = u;
        }
        if (!O)
          for (g0 = R[j + r0] / R[C0 + r0], u = 1; u <= x && !(F[u] < q || R[C0 + u] < 0); u = u + 1)
            i0 = R[j + u] / R[C0 + u], i0 < g0 && (g0 = i0, r0 = u);
        for (c0 = 0, u = s0 + 1; u <= s0 + v; u = u + 1)
          c0 = c0 + R[u] * R[u];
        if (Math.abs(c0) <= $) {
          if (O)
            return I[1] = 1, 999;
          for (u = 1; u <= x; u = u + 1)
            R[j + u] = R[j + u] - g0 * R[C0 + u];
          return R[j + x + 1] = R[j + x + 1] + g0, 700;
        } else {
          for (c0 = 0, u = 1; u <= v; u = u + 1)
            c0 = c0 + R[s0 + u] * m[u][M];
          for (w = -R[D0 + M] / c0, X = !0, O || g0 < w && (w = g0, X = !1), u = 1; u <= v; u = u + 1)
            p[u] = p[u] + w * R[s0 + u], Math.abs(p[u]) < $ && (p[u] = 0);
          for (l[1] = l[1] + w * c0 * (w / 2 + R[j + x + 1]), u = 1; u <= x; u = u + 1)
            R[j + u] = R[j + u] - w * R[C0 + u];
          if (R[j + x + 1] = R[j + x + 1] + w, X) {
            for (x = x + 1, F[x] = M, Z = _0 + (x - 1) * x / 2 + 1, u = 1; u <= x - 1; u = u + 1)
              R[Z] = R[u], Z = Z + 1;
            if (x === v)
              R[Z] = R[v];
            else {
              for (u = v; u >= x + 1 && !(R[u] === 0 || (g = Math.max(Math.abs(R[u - 1]), Math.abs(R[u])), E = Math.min(Math.abs(R[u - 1]), Math.abs(R[u])), R[u - 1] >= 0 ? i0 = Math.abs(g * Math.sqrt(1 + E * E / (g * g))) : i0 = -Math.abs(g * Math.sqrt(1 + E * E / (g * g))), g = R[u - 1] / i0, E = R[u] / i0, g === 1)); u = u - 1)
                if (g === 0)
                  for (R[u - 1] = E * i0, b = 1; b <= v; b = b + 1)
                    i0 = f[b][u - 1], f[b][u - 1] = f[b][u], f[b][u] = i0;
                else
                  for (R[u - 1] = i0, Q = E / (1 + g), b = 1; b <= v; b = b + 1)
                    i0 = g * f[b][u - 1] + E * f[b][u], f[b][u] = Q * (f[b][u - 1] + i0) - f[b][u], f[b][u - 1] = i0;
              R[Z] = R[x];
            }
          } else {
            for (c0 = -d[M], b = 1; b <= v; b = b + 1)
              c0 = c0 + p[b] * m[b][M];
            if (M > q)
              R[D0 + M] = c0;
            else if (R[D0 + M] = -Math.abs(c0), c0 > 0) {
              for (b = 1; b <= v; b = b + 1)
                m[b][M] = -m[b][M];
              d[M] = -d[M];
            }
            return 700;
          }
        }
        return 0;
      }
      function f0() {
        if (Z = _0 + r0 * (r0 + 1) / 2 + 1, G = Z + r0, R[G] === 0 || (g = Math.max(Math.abs(R[G - 1]), Math.abs(R[G])), E = Math.min(Math.abs(R[G - 1]), Math.abs(R[G])), R[G - 1] >= 0 ? i0 = Math.abs(g * Math.sqrt(1 + E * E / (g * g))) : i0 = -Math.abs(g * Math.sqrt(1 + E * E / (g * g))), g = R[G - 1] / i0, E = R[G] / i0, g === 1))
          return 798;
        if (g === 0) {
          for (u = r0 + 1; u <= x; u = u + 1)
            i0 = R[G - 1], R[G - 1] = R[G], R[G] = i0, G = G + u;
          for (u = 1; u <= v; u = u + 1)
            i0 = f[u][r0], f[u][r0] = f[u][r0 + 1], f[u][r0 + 1] = i0;
        } else {
          for (Q = E / (1 + g), u = r0 + 1; u <= x; u = u + 1)
            i0 = g * R[G - 1] + E * R[G], R[G] = Q * (R[G - 1] + i0) - R[G], R[G - 1] = i0, G = G + u;
          for (u = 1; u <= v; u = u + 1)
            i0 = g * f[u][r0] + E * f[u][r0 + 1], f[u][r0 + 1] = Q * (f[u][r0] + i0) - f[u][r0 + 1], f[u][r0] = i0;
        }
        return 0;
      }
      function u0() {
        for (G = Z - r0, u = 1; u <= r0; u = u + 1)
          R[G] = R[Z], Z = Z + 1, G = G + 1;
        return R[j + r0] = R[j + r0 + 1], F[r0] = F[r0 + 1], r0 = r0 + 1, r0 < x ? 797 : 0;
      }
      function a() {
        return R[j + x] = R[j + x + 1], R[j + x + 1] = 0, F[x] = 0, x = x - 1, N[2] = N[2] + 1, 0;
      }
      for (L = 0; ; ) {
        if (L = K(), L === 999)
          return;
        for (; L = n0(), L !== 0; ) {
          if (L === 999)
            return;
          if (L === 700)
            if (r0 === x)
              a();
            else {
              for (; f0(), L = u0(), L === 797; )
                ;
              a();
            }
        }
      }
    }
    function c(f, h, o, v, p, l) {
      f = t(f), h = t(h), o = t(o);
      var m, d, _, D, q, F = [], x = [], N = [], R = [], I = [], u;
      if (p = p || 0, l = l ? t(l) : [void 0, 0], v = v ? t(v) : [], d = f.length - 1, _ = o[1].length - 1, !v)
        for (m = 1; m <= _; m = m + 1)
          v[m] = 0;
      for (m = 1; m <= _; m = m + 1)
        x[m] = 0;
      for (D = 0, q = Math.min(d, _), m = 1; m <= d; m = m + 1)
        N[m] = 0;
      for (F[1] = 0, m = 1; m <= 2 * d + q * (q + 5) / 2 + 2 * _ + 1; m = m + 1)
        R[m] = 0;
      for (m = 1; m <= 2; m = m + 1)
        I[m] = 0;
      return r(
        f,
        h,
        d,
        d,
        N,
        F,
        o,
        v,
        d,
        _,
        p,
        x,
        D,
        I,
        R,
        l
      ), u = "", l[1] === 1 && (u = "constraints are inconsistent, no solution!"), l[1] === 2 && (u = "matrix D in quadratic function is not positive definite!"), {
        solution: n(N),
        value: n(F),
        unconstrained_solution: n(h),
        iterations: n(I),
        iact: n(x),
        message: u
      };
    }
    S.solveQP = c;
  }(numeric), numeric.svd = function S(t) {
    var n, e = numeric.epsilon, i = 1e-64 / e, s = 50, r = 0, c = 0, f = 0, h = 0, o = 0, v = numeric.clone(t), p = v.length, l = v[0].length;
    if (p < l) throw "Need more rows than columns";
    var m = new Array(l), d = new Array(l);
    for (c = 0; c < l; c++) m[c] = d[c] = 0;
    var _ = numeric.rep([l, l], 0);
    function D(J, r0) {
      return J = Math.abs(J), r0 = Math.abs(r0), J > r0 ? J * Math.sqrt(1 + r0 * r0 / J / J) : r0 == 0 ? J : r0 * Math.sqrt(1 + J * J / r0 / r0);
    }
    var q = 0, F = 0, x = 0, N = 0, R = 0, I = 0, u = 0;
    for (c = 0; c < l; c++) {
      for (m[c] = F, u = 0, o = c + 1, f = c; f < p; f++)
        u += v[f][c] * v[f][c];
      if (u <= i)
        F = 0;
      else
        for (q = v[c][c], F = Math.sqrt(u), q >= 0 && (F = -F), x = q * F - u, v[c][c] = q - F, f = o; f < l; f++) {
          for (u = 0, h = c; h < p; h++)
            u += v[h][c] * v[h][f];
          for (q = u / x, h = c; h < p; h++)
            v[h][f] += q * v[h][c];
        }
      for (d[c] = F, u = 0, f = o; f < l; f++)
        u = u + v[c][f] * v[c][f];
      if (u <= i)
        F = 0;
      else {
        for (q = v[c][c + 1], F = Math.sqrt(u), q >= 0 && (F = -F), x = q * F - u, v[c][c + 1] = q - F, f = o; f < l; f++) m[f] = v[c][f] / x;
        for (f = o; f < p; f++) {
          for (u = 0, h = o; h < l; h++)
            u += v[f][h] * v[c][h];
          for (h = o; h < l; h++)
            v[f][h] += u * m[h];
        }
      }
      R = Math.abs(d[c]) + Math.abs(m[c]), R > N && (N = R);
    }
    for (c = l - 1; c != -1; c += -1) {
      if (F != 0) {
        for (x = F * v[c][c + 1], f = o; f < l; f++)
          _[f][c] = v[c][f] / x;
        for (f = o; f < l; f++) {
          for (u = 0, h = o; h < l; h++)
            u += v[c][h] * _[h][f];
          for (h = o; h < l; h++)
            _[h][f] += u * _[h][c];
        }
      }
      for (f = o; f < l; f++)
        _[c][f] = 0, _[f][c] = 0;
      _[c][c] = 1, F = m[c], o = c;
    }
    for (c = l - 1; c != -1; c += -1) {
      for (o = c + 1, F = d[c], f = o; f < l; f++)
        v[c][f] = 0;
      if (F != 0) {
        for (x = v[c][c] * F, f = o; f < l; f++) {
          for (u = 0, h = o; h < p; h++) u += v[h][c] * v[h][f];
          for (q = u / x, h = c; h < p; h++) v[h][f] += q * v[h][c];
        }
        for (f = c; f < p; f++) v[f][c] = v[f][c] / F;
      } else
        for (f = c; f < p; f++) v[f][c] = 0;
      v[c][c] += 1;
    }
    for (e = e * N, h = l - 1; h != -1; h += -1)
      for (var b = 0; b < s; b++) {
        var Z = !1;
        for (o = h; o != -1; o += -1) {
          if (Math.abs(m[o]) <= e) {
            Z = !0;
            break;
          }
          if (Math.abs(d[o - 1]) <= e)
            break;
        }
        if (!Z) {
          r = 0, u = 1;
          var G = o - 1;
          for (c = o; c < h + 1 && (q = u * m[c], m[c] = r * m[c], !(Math.abs(q) <= e)); c++)
            for (F = d[c], x = D(q, F), d[c] = x, r = F / x, u = -q / x, f = 0; f < p; f++)
              R = v[f][G], I = v[f][c], v[f][G] = R * r + I * u, v[f][c] = -R * u + I * r;
        }
        if (I = d[h], o == h) {
          if (I < 0)
            for (d[h] = -I, f = 0; f < l; f++)
              _[f][h] = -_[f][h];
          break;
        }
        if (b >= s - 1)
          throw "Error: no convergence.";
        for (N = d[o], R = d[h - 1], F = m[h - 1], x = m[h], q = ((R - I) * (R + I) + (F - x) * (F + x)) / (2 * x * R), F = D(q, 1), q < 0 ? q = ((N - I) * (N + I) + x * (R / (q - F) - x)) / N : q = ((N - I) * (N + I) + x * (R / (q + F) - x)) / N, r = 1, u = 1, c = o + 1; c < h + 1; c++) {
          for (F = m[c], R = d[c], x = u * F, F = r * F, I = D(q, x), m[c - 1] = I, r = q / I, u = x / I, q = N * r + F * u, F = -N * u + F * r, x = R * u, R = R * r, f = 0; f < l; f++)
            N = _[f][c - 1], I = _[f][c], _[f][c - 1] = N * r + I * u, _[f][c] = -N * u + I * r;
          for (I = D(q, x), d[c - 1] = I, r = q / I, u = x / I, q = r * F + u * R, N = -u * F + r * R, f = 0; f < p; f++)
            R = v[f][c - 1], I = v[f][c], v[f][c - 1] = R * r + I * u, v[f][c] = -R * u + I * r;
        }
        m[o] = 0, m[h] = q, d[h] = N;
      }
    for (c = 0; c < d.length; c++)
      d[c] < e && (d[c] = 0);
    for (c = 0; c < l; c++)
      for (f = c - 1; f >= 0; f--)
        if (d[f] < d[c]) {
          for (r = d[f], d[f] = d[c], d[c] = r, h = 0; h < v.length; h++)
            n = v[h][c], v[h][c] = v[h][f], v[h][f] = n;
          for (h = 0; h < _.length; h++)
            n = _[h][c], _[h][c] = _[h][f], _[h][f] = n;
          c = f;
        }
    return { U: v, S: d, V: _ };
  };
})(numeric1_2_6);
var numeric$2 = numeric1_2_6, forwardSHT = function(S, t, n, e) {
  var i = t.length, s = (S + 1) * (S + 1), r, c = [,];
  s > i && console.log("The SHT degree is too high for the number of data points"), n == 0 && (t = convertCart2Sph(t));
  for (var f = 0; f < t.length; f++)
    c[f] = t[f][2];
  Y_N = computeRealSH(S, t), e == 0 ? r = numeric$2.mul(1 / i, Y_N) : r = pinv_direct(numeric$2.transpose(Y_N));
  var h = numeric$2.dotMV(r, c);
  return h;
}, convertCart2Sph = function(S, t) {
  for (var n, e, i, s = new Array(S.length), r = 0; r < S.length; r++)
    n = Math.atan2(S[r][1], S[r][0]), e = Math.atan2(S[r][2], Math.sqrt(S[r][0] * S[r][0] + S[r][1] * S[r][1])), t == 1 ? s[r] = [n, e] : (i = Math.sqrt(S[r][0] * S[r][0] + S[r][1] * S[r][1] + S[r][2] * S[r][2]), s[r] = [n, e, i]);
  return s;
}, computeRealSH = function(S, t) {
  for (var n = new Array(t.length), e = new Array(t.length), i = 0; i < t.length; i++)
    n[i] = t[i][0], e[i] = t[i][1];
  var s = new Array(2 * S + 1);
  n.length;
  for (var r = (S + 1) * (S + 1), c = 0, f = 0, h, o = numeric$2.sin(e), v = 0, p = new Array(r), l, m, d, _, i = 0; i < 2 * S + 1; i++) s[i] = factorial(i);
  for (var D = 0; D < S + 1; D++) {
    if (D == 0) {
      var q = new Array(n.length);
      q.fill(1), p[D] = q, v = 1;
    } else {
      h = recurseLegendrePoly(D, o, c, f), l = Math.sqrt(2 * D + 1);
      for (var F = 0; F < D + 1; F++)
        F == 0 ? p[v + D] = numeric$2.mul(l, h[F]) : (m = l * Math.sqrt(2 * s[D - F] / s[D + F]), d = numeric$2.cos(numeric$2.mul(F, n)), _ = numeric$2.sin(numeric$2.mul(F, n)), p[v + D - F] = numeric$2.mul(m, numeric$2.mul(h[F], _)), p[v + D + F] = numeric$2.mul(m, numeric$2.mul(h[F], d)));
      v = v + 2 * D + 1;
    }
    f = c, c = h;
  }
  return p;
}, factorial = function(S) {
  return S === 0 ? 1 : S * factorial(S - 1);
}, recurseLegendrePoly = function(S, t, n, e) {
  var i = new Array(S + 1);
  switch (S) {
    case 1:
      var o = numeric$2.mul(t, t), s = t, r = numeric$2.sqrt(numeric$2.sub(1, o));
      i[0] = s, i[1] = r;
      break;
    case 2:
      var o = numeric$2.mul(t, t), c = numeric$2.mul(3, o);
      c = numeric$2.sub(c, 1), c = numeric$2.div(c, 2);
      var f = numeric$2.sub(1, o);
      f = numeric$2.sqrt(f), f = numeric$2.mul(3, f), f = numeric$2.mul(f, t);
      var h = numeric$2.sub(1, o);
      h = numeric$2.mul(3, h), i[0] = c, i[1] = f, i[2] = h;
      break;
    default:
      var o = numeric$2.mul(t, t), v = numeric$2.sub(1, o), p = 2 * S - 1, l = 1;
      if (p % 2 == 0)
        for (var m = 1; m < p / 2 + 1; m++) l = l * 2 * m;
      else
        for (var m = 1; m < (p + 1) / 2 + 1; m++) l = l * (2 * m - 1);
      i[S] = numeric$2.mul(l, numeric$2.pow(v, S / 2)), i[S - 1] = numeric$2.mul(2 * S - 1, numeric$2.mul(t, n[S - 1]));
      for (var d = 0; d < S - 1; d++) {
        var _ = numeric$2.mul(2 * S - 1, numeric$2.mul(t, n[d])), D = numeric$2.mul(S + d - 1, e[d]);
        i[d] = numeric$2.div(numeric$2.sub(_, D), S - d);
      }
  }
  return i;
}, pinv_direct = function(S) {
  var t = numeric$2.transpose(S);
  return numeric$2.dot(numeric$2.inv(numeric$2.dot(t, S)), t);
}, getSHrotMtx = function(S, t) {
  var n = (t + 1) * (t + 1), e = numeric$2.rep([n, n], 0);
  e[0][0] = 1;
  var i = numeric$2.rep([3, 3], 0);
  i[0][0] = S[1][1], i[0][1] = S[1][2], i[0][2] = S[1][0], i[1][0] = S[2][1], i[1][1] = S[2][2], i[1][2] = S[2][0], i[2][0] = S[0][1], i[2][1] = S[0][2], i[2][2] = S[0][0], e = numeric$2.setBlock(e, [1, 1], [3, 3], i);
  for (var s = i, r = 3, c = 2; c < t + 1; c++) {
    for (var f = numeric$2.rep([2 * c + 1, 2 * c + 1], 0), h = -c; h < c + 1; h++)
      for (var o = -c; o < c + 1; o++) {
        var v, p, l, m, d;
        h == 0 ? v = 1 : v = 0, Math.abs(o) == c ? p = 2 * c * (2 * c - 1) : p = c * c - o * o, l = Math.sqrt((c * c - h * h) / p), m = Math.sqrt((1 + v) * (c + Math.abs(h) - 1) * (c + Math.abs(h)) / p) * (1 - 2 * v) * 0.5, d = Math.sqrt((c - Math.abs(h) - 1) * (c - Math.abs(h)) / p) * (1 - v) * -0.5, l != 0 && (l = l * U(c, h, o, i, s)), m != 0 && (m = m * V(c, h, o, i, s)), d != 0 && (d = d * W(c, h, o, i, s)), f[h + c][o + c] = l + m + d;
      }
    e = numeric$2.setBlock(e, [r + 1, r + 1], [r + 2 * c + 1, r + 2 * c + 1], f), s = f, r = r + 2 * c + 1;
  }
  return e;
};
function U(S, t, n, e, i) {
  return P(0, S, t, n, e, i);
}
function V(S, t, n, e, i) {
  var s, r, c, f;
  return t == 0 ? (s = P(1, S, 1, n, e, i), r = P(-1, S, -1, n, e, i), c = s + r) : t > 0 ? (t == 1 ? f = 1 : f = 0, s = P(1, S, t - 1, n, e, i), r = P(-1, S, -t + 1, n, e, i), c = s * Math.sqrt(1 + f) - r * (1 - f)) : (t == -1 ? f = 1 : f = 0, s = P(1, S, t + 1, n, e, i), r = P(-1, S, -t - 1, n, e, i), c = s * (1 - f) + r * Math.sqrt(1 + f)), c;
}
function W(S, t, n, e, i) {
  var s, r, c;
  return t == 0 ? console.error("should not be called") : t > 0 ? (s = P(1, S, t + 1, n, e, i), r = P(-1, S, -t - 1, n, e, i), c = s + r) : (s = P(1, S, t - 1, n, e, i), r = P(-1, S, -t + 1, n, e, i), c = s - r), c;
}
function P(S, t, n, e, i, s) {
  var r, c, f, h;
  return r = i[S + 1][2], c = i[S + 1][0], f = i[S + 1][1], e == -t ? h = r * s[n + t - 1][0] + c * s[n + t - 1][2 * t - 2] : e == t ? h = r * s[n + t - 1][2 * t - 2] - c * s[n + t - 1][0] : h = f * s[n + t - 1][e + t - 1], h;
}
var yawPitchRoll2Rzyx = function(S, t, n) {
  var e, i, s;
  n == 0 ? e = [[1, 0, 0], [0, 1, 0], [0, 0, 1]] : e = [[1, 0, 0], [0, Math.cos(n), Math.sin(n)], [0, -Math.sin(n), Math.cos(n)]], t == 0 ? i = [[1, 0, 0], [0, 1, 0], [0, 0, 1]] : i = [[Math.cos(t), 0, -Math.sin(t)], [0, 1, 0], [Math.sin(t), 0, Math.cos(t)]], S == 0 ? s = [[1, 0, 0], [0, 1, 0], [0, 0, 1]] : s = [[Math.cos(S), Math.sin(S), 0], [-Math.sin(S), Math.cos(S), 0], [0, 0, 1]];
  var r = numeric$2.dotMMsmall(i, s);
  return r = numeric$2.dotMMsmall(e, r), r;
}, forwardSHT_1 = forwardSHT, computeRealSH_1 = computeRealSH, factorial_1 = factorial, recurseLegendrePoly_1 = recurseLegendrePoly, getSHrotMtx_1 = getSHrotMtx, yawPitchRoll2Rzyx_1 = yawPitchRoll2Rzyx;
class monoEncoder {
  constructor(t, n) {
    this.initialized = !1, this.ctx = t, this.order = n, this.nCh = (n + 1) * (n + 1), this.azim = 0, this.elev = 0, this.gains = new Array(this.nCh), this.gainNodes = new Array(this.nCh), this.in = this.ctx.createGain(), this.in.channelCountMode = "explicit", this.in.channelCount = 1, this.out = this.ctx.createChannelMerger(this.nCh);
    for (var e = 0; e < this.nCh; e++)
      this.gainNodes[e] = this.ctx.createGain(), this.gainNodes[e].channelCountMode = "explicit", this.gainNodes[e].channelCount = 1;
    this.updateGains();
    for (var e = 0; e < this.nCh; e++)
      this.in.connect(this.gainNodes[e]), this.gainNodes[e].connect(this.out, 0, e);
    this.initialized = !0;
  }
  updateGains() {
    for (var t = this.order, n = computeRealSH_1(t, [
      [this.azim * Math.PI / 180, this.elev * Math.PI / 180]
    ]), e = 0; e < this.nCh; e++)
      this.gains[e] = n[e][0], this.gainNodes[e].gain.value = this.gains[e];
  }
}
var utils$6 = require("./utils.js");
class monoEncoder2D {
  constructor(t, n) {
    this.initialized = !1, this.ctx = t, this.order = n, this.nCh = 2 * n + 1, this.azim = 0, this.elev = 0, this.gains = new Array(this.nCh), this.gainNodes = new Array(this.nCh), this.in = this.ctx.createGain(), this.in.channelCountMode = "explicit", this.in.channelCount = 1, this.out = this.ctx.createChannelMerger(this.nCh);
    for (var e = 0; e < this.nCh; e++)
      this.gainNodes[e] = this.ctx.createGain(), this.gainNodes[e].channelCountMode = "explicit", this.gainNodes[e].channelCount = 1;
    this.updateGains();
    for (var e = 0; e < this.nCh; e++)
      this.in.connect(this.gainNodes[e]), this.gainNodes[e].connect(this.out, 0, e);
    this.initialized = !0;
  }
  updateGains() {
    for (var t = this.order, n = utils$6.getCircHarmonics(t, [this.azim]), e = 0; e < this.nCh; e++)
      this.gainNodes[e].gain.value = n[e][0];
  }
}
class orderLimiter {
  constructor(t, n, e) {
    this.ctx = t, this.orderIn = n, e < n ? this.orderOut = e : this.orderOut = n, this.nChIn = (this.orderIn + 1) * (this.orderIn + 1), this.nChOut = (this.orderOut + 1) * (this.orderOut + 1), this.in = this.ctx.createChannelSplitter(this.nChIn), this.out = this.ctx.createChannelMerger(this.nChOut);
    for (let i = 0; i < this.nChOut; i++)
      this.in.connect(this.out, i, i);
  }
  updateOrder(t) {
    if (t <= this.orderIn)
      this.orderOut = t;
    else return;
    this.nChOut = (this.orderOut + 1) * (this.orderOut + 1), this.out.disconnect(), this.out = this.ctx.createChannelMerger(this.nChOut);
    for (let n = 0; n < this.nChOut; n++)
      this.in.connect(this.out, n, n);
  }
}
class orderLimiter2D {
  constructor(t, n, e) {
    this.ctx = t, this.orderIn = n, e < n ? this.orderOut = e : this.orderOut = n, this.nChIn = 2 * this.orderIn + 1, this.nChOut = 2 * this.orderOut + 1, this.in = this.ctx.createChannelSplitter(this.nChIn), this.out = this.ctx.createChannelMerger(this.nChOut);
    for (let i = 0; i < this.nChOut; i++)
      this.in.connect(this.out, i, i);
  }
  updateOrder(t) {
    if (t <= this.orderIn)
      this.orderOut = t;
    else return;
    this.nChOut = 2 * this.orderOut + 1, this.out.disconnect(), this.out = this.ctx.createChannelMerger(this.nChOut);
    for (let n = 0; n < this.nChOut; n++)
      this.in.connect(this.out, n, n);
  }
}
class orderWeight {
  constructor(t, n) {
    this.ctx = t, this.order = n, this.nCh = (this.order + 1) * (this.order + 1), this.in = this.ctx.createChannelSplitter(this.nCh), this.out = this.ctx.createChannelMerger(this.nCh), this.gains = new Array(this.nCh), this.orderGains = new Array(this.order + 1), this.orderGains.fill(1);
    for (let e = 0; e < this.nCh; e++)
      this.gains[e] = this.ctx.createGain(), this.in.connect(this.gains[e], e, 0), this.gains[e].connect(this.out, 0, e);
  }
  updateOrderGains() {
    for (var t, n = 0; n < this.nCh; n++)
      t = Math.floor(Math.sqrt(n)), this.gains[n].gain.value = this.orderGains[t];
  }
  computeMaxRECoeffs() {
    var t = this.order;
    this.orderGains[0] = 1;
    for (var n = 0, e = 0, i = 0, s = 1; s <= t; s++)
      i = recurseLegendrePoly_1(s, [Math.cos(2.406809 / (t + 1.51))], n, e), this.orderGains[s] = i[0][0], e = n, n = i;
  }
}
class sceneRotator {
  constructor(t, n) {
    this.ctx = t, this.order = n, this.nCh = (n + 1) * (n + 1), this.yaw = 0, this.pitch = 0, this.roll = 0, this.rotMtx = numeric.identity(this.nCh), this.rotMtxNodes = new Array(this.order), this.in = this.ctx.createChannelSplitter(this.nCh), this.out = this.ctx.createChannelMerger(this.nCh);
    for (var e = 1; e <= this.order; e++) {
      for (var i = new Array(2 * e + 1), s = 0; s < 2 * e + 1; s++) {
        i[s] = new Array(2 * e + 1);
        for (var r = 0; r < 2 * e + 1; r++)
          i[s][r] = this.ctx.createGain(), s == r ? i[s][r].gain.value = 1 : i[s][r].gain.value = 0;
      }
      this.rotMtxNodes[e - 1] = i;
    }
    this.in.connect(this.out, 0, 0);
    var c = 1;
    for (e = 1; e <= this.order; e++) {
      for (s = 0; s < 2 * e + 1; s++)
        for (r = 0; r < 2 * e + 1; r++)
          this.in.connect(this.rotMtxNodes[e - 1][s][r], c + r, 0), this.rotMtxNodes[e - 1][s][r].connect(this.out, 0, c + s);
      c = c + 2 * e + 1;
    }
  }
  updateRotMtx() {
    var t = this.yaw * Math.PI / 180, n = this.pitch * Math.PI / 180, e = this.roll * Math.PI / 180;
    this.rotMtx = getSHrotMtx_1(yawPitchRoll2Rzyx_1(t, n, e), this.order);
    var i = 1;
    for (let s = 1; s < this.order + 1; s++) {
      for (let r = 0; r < 2 * s + 1; r++)
        for (let c = 0; c < 2 * s + 1; c++)
          this.rotMtxNodes[s - 1][r][c].gain.value = this.rotMtx[i + r][i + c];
      i = i + 2 * s + 1;
    }
  }
}
class sceneRotator2D {
  constructor(t, n) {
    this.ctx = t, this.order = n, this.nCh = 2 * n + 1, this.yaw = 0, this.in = this.ctx.createChannelSplitter(this.nCh), this.out = this.ctx.createChannelMerger(this.nCh), this.rotMtxNodes = new Array(2 * this.order), this.in.connect(this.out, 0, 0);
    for (var e = 0; e < 2 * this.order; e = e + 2) {
      var i = new Array(2);
      i[0] = this.ctx.createGain(), i[1] = this.ctx.createGain();
      var s = new Array(2);
      s[0] = this.ctx.createGain(), s[1] = this.ctx.createGain(), this.rotMtxNodes[e] = i, this.rotMtxNodes[e + 1] = s, this.in.connect(this.rotMtxNodes[e][0], e + 1, 0), this.rotMtxNodes[e][0].connect(this.out, 0, e + 1), this.in.connect(this.rotMtxNodes[e][1], e + 2, 0), this.rotMtxNodes[e][1].connect(this.out, 0, e + 1), this.in.connect(this.rotMtxNodes[e + 1][0], e + 1, 0), this.rotMtxNodes[e + 1][0].connect(this.out, 0, e + 2), this.in.connect(this.rotMtxNodes[e + 1][1], e + 2, 0), this.rotMtxNodes[e + 1][1].connect(this.out, 0, e + 2);
    }
    this.updateRotMtx();
  }
  updateRotMtx() {
    var t = this.yaw * Math.PI / 180, n = 1;
    for (let e = 0; e < 2 * this.order; e = e + 2)
      this.rotMtxNodes[e][0].gain.value = Math.cos(n * t), this.rotMtxNodes[e][1].gain.value = Math.sin(n * t), this.rotMtxNodes[e + 1][0].gain.value = -Math.sin(n * t), this.rotMtxNodes[e + 1][1].gain.value = Math.cos(n * t), n++;
  }
}
class sceneMirror {
  constructor(t, n) {
    this.ctx = t, this.order = n, this.nCh = (n + 1) * (n + 1), this.mirrorPlane = 0, this.in = this.ctx.createChannelSplitter(this.nCh), this.out = this.ctx.createChannelMerger(this.nCh), this.gains = new Array(this.nCh);
    for (var e = 0; e < this.nCh; e++)
      this.gains[e] = this.ctx.createGain(), this.gains[e].gain.value = 1, this.in.connect(this.gains[e], e, 0), this.gains[e].connect(this.out, 0, e);
  }
  reset() {
    for (var t = 0; t < this.nCh; t++)
      this.gains[t].gain.value = 1;
  }
  mirror(t) {
    switch (t) {
      case 0:
        this.mirrorPlane = 0, this.reset();
        break;
      case 1:
        this.reset(), this.mirrorPlane = 1;
        for (var i, n = 0; n <= this.order; n++)
          for (var e = -n; e <= n; e++)
            i = n * n + n + e, (e < 0 && e % 2 == 0 || e > 0 && e % 2 == 1) && (this.gains[i].gain.value = -1);
        break;
      case 2:
        this.reset(), this.mirrorPlane = 2;
        for (var i, n = 0; n <= this.order; n++)
          for (var e = -n; e <= n; e++)
            i = n * n + n + e, e < 0 && (this.gains[i].gain.value = -1);
        break;
      case 3:
        this.reset(), this.mirrorPlane = 3;
        for (var i, n = 0; n <= this.order; n++)
          for (var e = -n; e <= n; e++)
            i = n * n + n + e, (e + n) % 2 == 1 && (this.gains[i].gain.value = -1);
        break;
      default:
        console.log("The mirroring planes can be either 1 (yz), 2 (xz), 3 (xy), or 0 (no mirroring). Value set to 0."), this.mirrorPlane = 0, this.reset();
    }
  }
}
class sceneMirror2D {
  constructor(t, n) {
    this.ctx = t, this.order = n, this.nCh = 2 * n + 1, this.mirrorPlane = 0, this.in = this.ctx.createChannelSplitter(this.nCh), this.out = this.ctx.createChannelMerger(this.nCh), this.gains = new Array(this.nCh);
    for (var e = 0; e < this.nCh; e++)
      this.gains[e] = this.ctx.createGain(), this.gains[e].gain.value = 1, this.in.connect(this.gains[e], e, 0), this.gains[e].connect(this.out, 0, e);
  }
  reset() {
    for (var t = 0; t < this.nCh; t++)
      this.gains[t].gain.value = 1;
  }
  mirror(t) {
    switch (t) {
      case 0:
        this.mirrorPlane = 0, this.reset();
        break;
      case 1:
        this.reset(), this.mirrorPlane = 1;
        for (var n = 2; n < this.nCh; n++)
          this.gains[n].gain.value = -1, n % 2 != 0 && (n = n + 2);
        break;
      case 2:
        this.reset(), this.mirrorPlane = 2;
        for (var n = 0; n < this.nCh; n++)
          n % 2 != 0 && (this.gains[n].gain.value = -1);
        break;
      case 3:
        console.log("up-down mirroring in 2D mode not possible");
        break;
      default:
        console.log("The mirroring planes can be either 1 (yz), 2 (xz) or 0 (no mirroring). Value set to 0."), this.mirrorPlane = 0, this.reset();
    }
  }
}
class binDecoder {
  constructor(t, n) {
    this.initialized = !1, this.ctx = t, this.order = n, this.nCh = (n + 1) * (n + 1), this.decFilters = new Array(this.nCh), this.decFilterNodes = new Array(this.nCh), this.in = this.ctx.createChannelSplitter(this.nCh), this.out = this.ctx.createChannelMerger(2), this.out.channelCountMode = "explicit", this.out.channelCount = 1, this.gainMid = this.ctx.createGain(), this.gainSide = this.ctx.createGain(), this.invertSide = this.ctx.createGain(), this.gainMid.gain.value = 1, this.gainSide.gain.value = 1, this.invertSide.gain.value = -1;
    for (var e = 0; e < this.nCh; e++)
      this.decFilterNodes[e] = this.ctx.createConvolver(), this.decFilterNodes[e].normalize = !1;
    this.resetFilters();
    for (var e = 0; e < this.nCh; e++) {
      this.in.connect(this.decFilterNodes[e], e, 0);
      var i = Math.floor(Math.sqrt(e)), s = e - i * i - i;
      s >= 0 ? this.decFilterNodes[e].connect(this.gainMid) : this.decFilterNodes[e].connect(this.gainSide);
    }
    this.gainMid.connect(this.out, 0, 0), this.gainSide.connect(this.out, 0, 0), this.gainMid.connect(this.out, 0, 1), this.gainSide.connect(this.invertSide, 0, 0), this.invertSide.connect(this.out, 0, 1), this.initialized = !0;
  }
  updateFilters(t) {
    for (var n = 0; n < this.nCh; n++)
      this.decFilters[n] = this.ctx.createBuffer(1, t.length, t.sampleRate), this.decFilters[n].getChannelData(0).set(t.getChannelData(n)), this.decFilterNodes[n].buffer = this.decFilters[n];
  }
  resetFilters() {
    var t = new Array(this.nCh);
    t.fill(0), t[0] = 0.5, t[1] = 0.5 / Math.sqrt(3);
    for (var n = 0; n < this.nCh; n++) {
      this.decFilters[n] = this.ctx.createBuffer(1, 64, this.ctx.sampleRate);
      for (var e = 0; e < 64; e++)
        this.decFilters[n].getChannelData(0)[e] = 0;
      this.decFilters[n].getChannelData(0)[0] = t[n], this.decFilterNodes[n].buffer = this.decFilters[n];
    }
  }
}
class binDecoder2D {
  constructor(t, n) {
    this.initialized = !1, this.ctx = t, this.order = n, this.nCh = 2 * n + 1, this.decFilters = new Array(this.nCh), this.decFilterNodes = new Array(this.nCh), this.in = this.ctx.createChannelSplitter(this.nCh), this.out = this.ctx.createChannelMerger(2), this.out.channelCountMode = "explicit", this.out.channelCount = 1, this.gainMid = this.ctx.createGain(), this.gainSide = this.ctx.createGain(), this.invertSide = this.ctx.createGain(), this.gainMid.gain.value = 1, this.gainSide.gain.value = 1, this.invertSide.gain.value = -1;
    for (var e = 0; e < this.nCh; e++)
      this.decFilterNodes[e] = this.ctx.createConvolver(), this.decFilterNodes[e].normalize = !1;
    this.resetFilters();
    for (var e = 0; e < this.nCh; e++)
      this.in.connect(this.decFilterNodes[e], e, 0), e % 2 == 0 ? this.decFilterNodes[e].connect(this.gainMid) : this.decFilterNodes[e].connect(this.gainSide);
    this.gainMid.connect(this.out, 0, 0), this.gainSide.connect(this.out, 0, 0), this.gainMid.connect(this.out, 0, 1), this.gainSide.connect(this.invertSide, 0, 0), this.invertSide.connect(this.out, 0, 1), this.initialized = !0;
  }
  updateFilters(t) {
    for (var n = 0; n < this.nCh; n++)
      this.decFilters[n] = this.ctx.createBuffer(1, t.length, t.sampleRate), this.decFilters[n].getChannelData(0).set(t.getChannelData(n)), this.decFilterNodes[n].buffer = this.decFilters[n];
  }
  resetFilters() {
    var t = new Array(this.nCh);
    t.fill(0), t[0] = 0.5, t[1] = 0.5 / Math.sqrt(3);
    for (var n = 0; n < this.nCh; n++) {
      this.decFilters[n] = this.ctx.createBuffer(1, 64, this.ctx.sampleRate);
      for (var e = 0; e < 64; e++)
        this.decFilters[n].getChannelData(0)[e] = 0;
      this.decFilters[n].getChannelData(0)[0] = t[n], this.decFilterNodes[n].buffer = this.decFilters[n];
    }
  }
}
var utils$5 = require("./utils.js");
class decoder {
  constructor(t, n) {
    this.ctx = t, this.order = n, this.nCh = (n + 1) * (n + 1), this.nSpk = 0, this._decodingMatrix = [], this._spkSphPosArray = [], this.in = this.ctx.createChannelSplitter(this.nCh), this.out = this.ctx.createChannelMerger(1), this._spkSphPosArray = this._getDefaultSpkConfig(this.order), this._updateDecodeMtx(this._spkSphPosArray);
  }
  // spkSphPosArray in spherical coordinates: [ [azim1, elev1, dist1], ... [azimN, elevN, distN] ]
  set speakerPos(t) {
    t === void 0 && (t = this._getDefaultSpkConfig(this.order)), this._spkSphPosArray = t, this.out.disconnect(), this._updateDecodeMtx(t);
  }
  get speakerPos() {
    return this._spkSphPosArray;
  }
  // internal method to calculate Ambisonic decoding matrix and define new ambisonic gain nodes and values
  _updateDecodeMtx(t) {
    this.nSpk = t.length, this.out = this.ctx.createChannelMerger(this.nSpk), this._decodingMatrix = utils$5.getAmbisonicDecMtx(t, this.order), this.mtxGain = new Array(this.nCh);
    for (let n = 0; n < this.nCh; n++) {
      this.mtxGain[n] = new Array(this.nSpk);
      for (let e = 0; e < this.nSpk; e++) {
        let i = this.ctx.createGain();
        i.gain.value = this._decodingMatrix[e][n], this.in.connect(i, n, 0), i.connect(this.out, 0, e), this.mtxGain[n][e] = i;
      }
    }
  }
  // get default speaker configuration for orders 1, 2, 3
  _getDefaultSpkConfig(t) {
    let n = [];
    switch (t) {
      case 1:
        n = [[0, 0, 1], [90, 0, 1], [180, 0, 1], [270, 0, 1], [0, 90, 1], [0, -90, 1]];
        break;
      case 2:
        n = [
          [180, -31.7161, 0.5878],
          [180, 31.7161, 0.5878],
          [-121.7161, 0, 0.5878],
          [121.7161, 0, 0.5878],
          [-90, -58.2839, 0.5878],
          [-90, 58.2839, 0.5878],
          [90, -58.2839, 0.5878],
          [90, 58.2839, 0.5878],
          [-58.2839, 0, 0.5878],
          [58.2839, 0, 0.5878],
          [0, -31.7161, 0.5878],
          [0, 31.7161, 0.5878]
        ];
        break;
      case 3:
        n = [
          [-159.0931, 0, 0.5352],
          [159.0931, 0, 0.5352],
          [-135, -35.2644, 0.5352],
          [-135, 35.2644, 0.5352],
          [135, -35.2644, 0.5352],
          [135, 35.2644, 0.5352],
          [180, -69.0931, 0.5352],
          [180, 69.0931, 0.5352],
          [-90, -20.9069, 0.5352],
          [-90, 20.9069, 0.5352],
          [90, -20.9069, 0.5352],
          [90, 20.9069, 0.5352],
          [0, -69.0931, 0.5352],
          [0, 69.0931, 0.5352],
          [-45, -35.2644, 0.5352],
          [-45, 35.2644, 0.5352],
          [45, -35.2644, 0.5352],
          [45, 35.2644, 0.5352],
          [-20.9069, 0, 0.5352],
          [20.9069, 0, 0.5352]
        ];
        break;
      default:
        console.error("unsupported default order:", t);
    }
    return n;
  }
}
class convolver {
  constructor(t, n) {
    this.initialized = !1, this.ctx = t, this.order = n, this.nCh = (n + 1) * (n + 1), this.encFilters = new Array(this.nCh), this.encFilterNodes = new Array(this.nCh), this.in = this.ctx.createGain(), this.in.channelCountMode = "explicit", this.in.channelCount = 1, this.out = this.ctx.createChannelMerger(this.nCh);
    for (var e = 0; e < this.nCh; e++)
      this.encFilterNodes[e] = this.ctx.createConvolver(), this.encFilterNodes[e].normalize = !1;
    for (var e = 0; e < this.nCh; e++)
      this.in.connect(this.encFilterNodes[e]), this.encFilterNodes[e].connect(this.out, 0, e);
    this.initialized = !0;
  }
  updateFilters(t) {
    for (var n = 0; n < this.nCh; n++)
      this.encFilters[n] = this.ctx.createBuffer(1, t.length, t.sampleRate), this.encFilters[n].getChannelData(0).set(t.getChannelData(n)), this.encFilterNodes[n].buffer = this.encFilters[n];
  }
}
class virtualMic {
  constructor(t, n) {
    this.initialized = !1, this.ctx = t, this.order = n, this.nCh = (n + 1) * (n + 1), this.azim = 0, this.elev = 0, this.vmicGains = new Array(this.nCh), this.vmicGainNodes = new Array(this.nCh), this.vmicCoeffs = new Array(this.order + 1), this.vmicPattern = "hypercardioid", this.in = this.ctx.createChannelSplitter(this.nCh), this.out = this.ctx.createGain();
    for (var e = 0; e < this.nCh; e++)
      this.vmicGainNodes[e] = this.ctx.createGain();
    for (this.SHxyz = new Array(this.nCh), this.SHxyz.fill(0), this.updatePattern(), this.updateOrientation(), e = 0; e < this.nCh; e++)
      this.in.connect(this.vmicGainNodes[e], e, 0), this.vmicGainNodes[e].connect(this.out);
    this.initialized = !0;
  }
  updatePattern() {
    function t(s) {
      for (var r = new Array(s + 1), c = 0; c <= s; c++)
        r[c] = factorial_1(s) * factorial_1(s) / (factorial_1(s + c + 1) * factorial_1(s - c));
      return r;
    }
    function n(s) {
      for (var r = new Array(s + 1), c = (s + 1) * (s + 1), f = 0; f <= s; f++)
        r[f] = 1 / c;
      return r;
    }
    function e(s) {
      switch (s) {
        case 1:
          var r = [0.366, 0.2113];
          break;
        case 2:
          var r = [0.2362, 0.1562, 0.059];
          break;
        case 3:
          var r = [0.1768, 0.1281, 0.0633, 0.0175];
          break;
        case 4:
          var r = [0.1414, 0.1087, 0.0623, 0.0247, 54e-4];
          break;
        default:
          console.error("Orders should be in the range of 1-4 at the moment.");
          return;
      }
      return r;
    }
    function i(s) {
      var r = new Array(s + 1);
      r[0] = 1;
      for (var c = 0, f = 0, h = 0, o = 1; o < s + 1; o++)
        h = recurseLegendrePoly_1(o, [Math.cos(2.406809 / (s + 1.51))], c, f), r[o] = h[0][0], f = c, c = h;
      for (var v = 0, o = 0; o <= s; o++)
        v += r[o] * (2 * o + 1);
      for (var o = 0; o <= s; o++)
        r[o] = r[o] / v;
      return r;
    }
    switch (this.vmicPattern) {
      case "cardioid":
        this.vmicCoeffs = t(this.order);
        break;
      case "supercardioid":
        this.vmicCoeffs = e(this.order);
        break;
      case "hypercardioid":
        this.vmicCoeffs = n(this.order);
        break;
      case "max_rE":
        this.vmicCoeffs = i(this.order);
        break;
      default:
        this.vmicPattern = "hypercardioid", this.vmicCoeffs = n(this.order);
    }
    this.updateGains();
  }
  updateOrientation() {
    for (var t = this.azim * Math.PI / 180, n = this.elev * Math.PI / 180, e = computeRealSH_1(this.order, [[t, n]]), i = 0; i < this.nCh; i++)
      this.SHxyz[i] = e[i][0];
    this.updateGains();
  }
  updateGains() {
    for (var t, n = 0; n <= this.order; n++)
      for (var e = -n; e <= n; e++)
        t = n * n + n + e, this.vmicGains[t] = this.vmicCoeffs[n] * this.SHxyz[t];
    for (var i = 0; i < this.nCh; i++)
      this.vmicGainNodes[i].gain.value = this.vmicGains[i];
  }
}
if (commonjsGlobal.AnalyserNode && !commonjsGlobal.AnalyserNode.prototype.getFloatTimeDomainData) {
  var uint8 = new Uint8Array(2048);
  commonjsGlobal.AnalyserNode.prototype.getFloatTimeDomainData = function(S) {
    this.getByteTimeDomainData(uint8);
    for (var t = 0, n = S.length; t < n; t++)
      S[t] = (uint8[t] - 128) * 78125e-7;
  };
}
class rmsAnalyser {
  constructor(t, n) {
    this.ctx = t, this.order = n, this.nCh = (n + 1) * (n + 1), this.fftSize = 2048, this.in = this.ctx.createChannelSplitter(this.nCh), this.out = this.ctx.createChannelMerger(this.nCh), this.analysers = new Array(this.nCh), this.analBuffers = new Array(this.nCh);
    for (var e = 0; e < this.nCh; e++)
      this.analysers[e] = this.ctx.createAnalyser(), this.analysers[e].fftSize = this.fftSize, this.analysers[e].smoothingTimeConstant = 0, this.analBuffers[e] = new Float32Array(this.fftSize), this.in.connect(this.analysers[e], e, 0), this.analysers[e].connect(this.out, 0, e);
  }
  updateBuffers() {
    for (let t = 0; t < this.nCh; t++)
      this.analysers[t].getFloatTimeDomainData(this.analBuffers[t]);
  }
  computeRMS() {
    var t = new Array(this.nCh);
    t.fill(0);
    for (var n = 0; n < this.nCh; n++) {
      for (let e = 0; e < this.fftSize; e++)
        t[n] = t[n] + this.analBuffers[n][e] * this.analBuffers[n][e];
      t[n] = Math.sqrt(t[n] / this.fftSize);
    }
    return t;
  }
}
var utils$4 = require("./utils.js");
class powermapAnalyser {
  constructor(t, n, e) {
    this.ctx = t, this.order = n, this.nCh = (n + 1) * (n + 1), this.fftSize = 2048, this.analysers = new Array(this.nCh), this.analBuffers = new Array(this.nCh), this.in = this.ctx.createChannelSplitter(this.nCh), this.out = this.ctx.createChannelMerger(this.nCh);
    for (let s = 0; s < this.nCh; s++)
      this.analysers[s] = this.ctx.createAnalyser(), this.analysers[s].fftSize = this.fftSize, this.analysers[s].smoothingTimeConstant = 0, this.analBuffers[s] = new Float32Array(this.fftSize);
    for (let s = 0; s < this.nCh; s++)
      this.in.connect(this.out, s, s), this.in.connect(this.analysers[s], s, 0);
    var i = utils$4.getTdesign(4 * n);
    this.td_dirs_rad = utils$4.deg2rad(i), this.SHmtx = computeRealSH_1(this.order, this.td_dirs_rad), this.mode = e;
  }
  updateBuffers() {
    for (let t = 0; t < this.nCh; t++)
      this.analysers[t].getFloatTimeDomainData(this.analBuffers[t]);
  }
  computePowermap() {
    for (var t = this.td_dirs_rad.length, n = numeric1_2_6.dot(numeric1_2_6.transpose(this.SHmtx), this.analBuffers), e = new Array(t), i = 0; i < t; i++) {
      for (let c = 0; c < this.fftSize; c++) {
        var s = 0;
        s = s + n[i][c] * n[i][c];
      }
      var s = s / this.fftSize;
      e[i] = [this.td_dirs_rad[i][0], this.td_dirs_rad[i][1], s];
    }
    if (this.mode == 0) return e;
    if (this.mode == 1) {
      var r = forwardSHT_1(2 * this.order, e);
      return r;
    }
  }
}
class intensityAnalyser {
  constructor(t) {
    this.ctx = t, this.fftSize = 2048, this.in = this.ctx.createChannelSplitter(4), this.out = this.ctx.createChannelMerger(4), this.gains = new Array(3);
    for (var n = 0; n < 3; n++)
      this.gains[n] = this.ctx.createGain(), this.gains[n].gain.value = 1 / Math.sqrt(3);
    for (this.analysers = new Array(4), this.analBuffers = new Array(4), n = 0; n < 4; n++)
      this.analysers[n] = this.ctx.createAnalyser(), this.analysers[n].fftSize = this.fftSize, this.analysers[n].smoothingTimeConstant = 0, this.analBuffers[n] = new Float32Array(this.fftSize);
    for (this.in.connect(this.out, 0, 0), this.in.connect(this.analysers[0], 0, 0), this.in.connect(this.gains[1], 1, 0), this.in.connect(this.gains[2], 2, 0), this.in.connect(this.gains[0], 3, 0), n = 0; n < 3; n++)
      this.gains[n].connect(this.analysers[n + 1], 0, 0), this.gains[n].connect(this.out, 0, n + 1);
  }
  updateBuffers() {
    for (let t = 0; t < 4; t++)
      this.analysers[t].getFloatTimeDomainData(this.analBuffers[t]);
  }
  computeIntensity() {
    var t = 0, n = 0, e = 0, i = 0, s = 0, r = 0, c = 0, f, h, o, v, p, l;
    for (let d = 0; d < this.fftSize; d++)
      t = t + this.analBuffers[0][d] * this.analBuffers[1][d], n = n + this.analBuffers[0][d] * this.analBuffers[2][d], e = e + this.analBuffers[0][d] * this.analBuffers[3][d], i = i + this.analBuffers[0][d] * this.analBuffers[0][d], s = s + this.analBuffers[1][d] * this.analBuffers[1][d], r = r + this.analBuffers[2][d] * this.analBuffers[2][d], c = c + this.analBuffers[3][d] * this.analBuffers[3][d];
    f = [t, n, e], h = Math.sqrt(f[0] * f[0] + f[1] * f[1] + f[2] * f[2]), o = (i + s + r + c) / 2, v = 1 - h / (o + 1e-7), p = Math.atan2(n, t) * 180 / Math.PI, l = Math.atan2(f[2], Math.sqrt(f[0] * f[0] + f[1] * f[1])) * 180 / Math.PI;
    var m = [p, l, v, o];
    return m;
  }
}
class intensityAnalyser2D {
  constructor(t) {
    this.ctx = t, this.fftSize = 2048, this.in = this.ctx.createChannelSplitter(3), this.out = this.ctx.createChannelMerger(3), this.gains = new Array(2);
    for (var n = 0; n < 2; n++)
      this.gains[n] = this.ctx.createGain(), this.gains[n].gain.value = 1 / Math.sqrt(3);
    for (this.analysers = new Array(3), this.analBuffers = new Array(3), n = 0; n < 3; n++)
      this.analysers[n] = this.ctx.createAnalyser(), this.analysers[n].fftSize = this.fftSize, this.analysers[n].smoothingTimeConstant = 0, this.analBuffers[n] = new Float32Array(this.fftSize);
    for (this.in.connect(this.out, 0, 0), this.in.connect(this.analysers[0], 0, 0), this.in.connect(this.gains[1], 1, 0), this.in.connect(this.gains[0], 2, 0), n = 0; n < 2; n++)
      this.gains[n].connect(this.analysers[n + 1], 0, 0), this.gains[n].connect(this.out, 0, n + 1);
  }
  updateBuffers() {
    for (let t = 0; t < 3; t++)
      this.analysers[t].getFloatTimeDomainData(this.analBuffers[t]);
  }
  computeIntensity() {
    var t = 0, n = 0, e = 0, i = 0, s = 0, r, c, f, h, o, v;
    for (let l = 0; l < this.fftSize; l++)
      t = t + this.analBuffers[0][l] * this.analBuffers[1][l], n = n + this.analBuffers[0][l] * this.analBuffers[2][l], e = e + this.analBuffers[0][l] * this.analBuffers[0][l], i = i + this.analBuffers[1][l] * this.analBuffers[1][l], s = s + this.analBuffers[2][l] * this.analBuffers[2][l];
    r = [t, n], c = Math.sqrt(r[0] * r[0] + r[1] * r[1]), f = (e + i + s) / 2, h = 1 - c / (f + 1e-7), o = -Math.atan2(n, t) * 180 / Math.PI, v = 0;
    var p = [o, v, h, f];
    return p;
  }
}
class HOAloader {
  constructor(t, n, e, i) {
    this.context = t, this.order = n, this.nCh = (n + 1) * (n + 1), this.nChGroups = Math.ceil(this.nCh / 8), this.buffers = new Array(), this.loadCount = 0, this.loaded = !1, this.onLoad = i, this.urls = new Array(this.nChGroups);
    var s = e.slice(e.length - 3, e.length);
    this.fileExt = s;
    for (var r = 0; r < this.nChGroups; r++)
      r == this.nChGroups - 1 ? this.urls[r] = e.slice(0, e.length - 4) + "_" + c(r * 8 + 1) + "-" + c(this.nCh) + "ch." + s : this.urls[r] = e.slice(0, e.length - 4) + "_" + c(r * 8 + 1) + "-" + c(r * 8 + 8) + "ch." + s;
    function c(f, h) {
      return ("000000000" + f).substr(-2);
    }
  }
  loadBuffers(t, n) {
    var e = new XMLHttpRequest();
    e.open("GET", t, !0), e.responseType = "arraybuffer";
    var i = this;
    e.onload = function() {
      i.context.decodeAudioData(
        e.response,
        function(s) {
          if (!s) {
            alert("error decoding file data: " + t);
            return;
          }
          i.buffers[n] = s, i.loadCount++, i.loadCount == i.nChGroups && (i.loaded = !0, i.concatBuffers(), console.log("HOAloader: all buffers loaded and concatenated"), i.onLoad(i.concatBuffer));
        },
        function(s) {
          alert("Browser cannot decode audio data:  " + t + `

Error: ` + s + `

(If you re using Safari and get a null error, this is most likely due to Apple's shady plan going on to stop the .ogg format from easing web developer's life :)`);
        }
      );
    }, e.onerror = function() {
      alert("HOAloader: XHR error");
    }, e.send();
  }
  load() {
    for (var t = 0; t < this.nChGroups; ++t) this.loadBuffers(this.urls[t], t);
  }
  concatBuffers() {
    if (this.loaded) {
      var t = this.nCh, n = this.nChGroups, e = this.buffers[0].length;
      this.buffers.forEach((f) => {
        e = Math.max(e, f.length);
      });
      var i = this.buffers[0].sampleRate, s = [1, 2, 3, 4, 5, 6, 7, 8];
      this.fileExt.toLowerCase() == "ogg" && (console.log("Loading of 8chan OGG files [Chrome/Firefox]: remap channels to correct order!"), s = [1, 3, 2, 7, 8, 5, 6, 4]), this.concatBuffer = this.context.createBuffer(t, e, i);
      for (var r = 0; r < n; r++)
        for (var c = 0; c < this.buffers[r].numberOfChannels; c++)
          this.concatBuffer.getChannelData(r * 8 + c).set(this.buffers[r].getChannelData(s[c] - 1));
    }
  }
}
var utils$3 = require("./utils.js");
class HRIRloader_local {
  constructor(t, n, e) {
    this.context = t, this.order = n, this.nCh = (n + 1) * (n + 1), this.onLoad = e, this.vls_dirs_deg = utils$3.getTdesign(2 * this.order), this.nVLS = this.vls_dirs_deg.length, this.nearestLookupRes = [5, 5];
  }
  load(t) {
    var n = this, e = new XMLHttpRequest();
    e.open("GET", t, !0), e.responseType = "json", e.onload = function() {
      n.parseHrirFromJSON(e.response), n.nearestLookup = utils$3.createNearestLookup(n.hrir_dirs_deg, n.nearestLookupRes);
      let i = utils$3.findNearest(n.vls_dirs_deg, n.nearestLookup, n.nearestLookupRes);
      n.nearest_dirs_deg = n.getClosestDirs(i, n.hrir_dirs_deg), n.vls_hrirs = n.getClosestHrirFilters(i, n.hrirs), n.computeDecFilters();
    }, e.send();
  }
  parseHrirFromJSON(t) {
    var n = this;
    this.fs = t.leaves[6].data[0], this.nHrirs = t.leaves[4].data.length, this.nSamples = t.leaves[8].data[0][1].length, this.hrir_dirs_deg = [], t.leaves[4].data.forEach(function(e) {
      n.hrir_dirs_deg.push([e[0], e[1]]);
    }), this.hrirs = [], t.leaves[8].data.forEach(function(e) {
      let i = new Float64Array(e[0]), s = new Float64Array(e[1]);
      n.hrirs.push([i, s]);
    });
  }
  getClosestDirs(t, n) {
    var e = t.length, i = [];
    for (let s = 0; s < e; s++)
      i.push(n[t[s]]);
    return i;
  }
  getClosestHrirFilters(t, n) {
    var e = t.length, i = [];
    for (let s = 0; s < e; s++)
      i.push(n[t[s]]);
    return i;
  }
  computeDecFilters() {
    this.decodingMatrix = utils$3.getAmbisonicDecMtx(this.nearest_dirs_deg, this.order), this.hoaBuffer = this.getHoaFilterFromHrirFilter(this.nCh, this.nSamples, this.fs, this.vls_hrirs, this.decodingMatrix), this.onLoad(this.hoaBuffer);
  }
  getHoaFilterFromHrirFilter(t, n, e, i, s) {
    n > i[0][0].length && (n = i[0][0].length);
    let r = this.context.createBuffer(t, n, e);
    for (let c = 0; c < t; c++) {
      let f = new Float32Array(n);
      for (let h = 0; h < i.length; h++)
        for (let o = 0; o < n; o++)
          f[o] += s[h][c] * i[h][0][o];
      r.getChannelData(c).set(f);
    }
    return r;
  }
}
var utils$2 = require("./utils.js");
class HRIRloader2D_local {
  constructor(t, n, e) {
    this.context = t, this.order = n, this.nCh = 2 * n + 1, this.onLoad = e, this.vls_dirs_deg = utils$2.sampleCircle(2 * this.order + 2), this.nVLS = this.vls_dirs_deg.length, this.nearestLookupRes = [5, 5];
  }
  load(t) {
    var n = this, e = new XMLHttpRequest();
    e.open("GET", t, !0), e.responseType = "json", e.onload = function() {
      n.parseHrirFromJSON(e.response), n.nearestLookup = utils$2.createNearestLookup(n.hrir_dirs_deg, n.nearestLookupRes);
      let i = utils$2.findNearest(n.vls_dirs_deg, n.nearestLookup, n.nearestLookupRes);
      n.nearest_dirs_deg = n.getClosestDirs(i, n.hrir_dirs_deg), n.vls_hrirs = n.getClosestHrirFilters(i, n.hrirs), n.computeDecFilters();
    }, e.send();
  }
  parseHrirFromJSON(t) {
    var n = this;
    this.fs = t.leaves[6].data[0], this.nHrirs = t.leaves[4].data.length, this.nSamples = t.leaves[8].data[0][1].length, this.hrir_dirs_deg = [], t.leaves[4].data.forEach(function(e) {
      n.hrir_dirs_deg.push([e[0], e[1]]);
    }), this.hrirs = [], t.leaves[8].data.forEach(function(e) {
      let i = new Float64Array(e[0]), s = new Float64Array(e[1]);
      n.hrirs.push([i, s]);
    });
  }
  getClosestDirs(t, n) {
    var e = t.length, i = [];
    for (let s = 0; s < e; s++)
      i.push(n[t[s]]);
    return i;
  }
  getClosestHrirFilters(t, n) {
    var e = t.length, i = [];
    for (let s = 0; s < e; s++)
      i.push(n[t[s]]);
    return i;
  }
  computeDecFilters() {
    var t = [];
    t.push(1);
    for (var n = 1; n < this.order + 1; n++)
      t.push(Math.cos(n * Math.PI / (2 * this.order + 2))), t.push(Math.cos(n * Math.PI / (2 * this.order + 2)));
    var e = numeric.diag(t);
    this.decodingMatrix = numeric.transpose(utils$2.getCircHarmonics(this.order, utils$2.getColumn(this.vls_dirs_deg, 0))), this.decodingMatrix = numeric.dot(this.decodingMatrix, e), this.decodingMatrix = numeric.mul(2 * Math.PI / this.vls_dirs_deg.length, this.decodingMatrix), this.hoaBuffer = this.getHoaFilterFromHrirFilter(this.nCh, this.nSamples, this.fs, this.vls_hrirs, this.decodingMatrix), this.onLoad(this.hoaBuffer);
  }
  getHoaFilterFromHrirFilter(t, n, e, i, s) {
    n > i[0][0].length && (n = i[0][0].length);
    let r = this.context.createBuffer(t, n, e);
    for (let c = 0; c < t; c++) {
      let f = new Float32Array(n);
      for (let h = 0; h < i.length; h++)
        for (let o = 0; o < n; o++)
          f[o] += s[h][c] * i[h][0][o];
      r.getChannelData(c).set(f);
    }
    return r;
  }
}
function commonjsRequire(S) {
  throw new Error('Could not dynamically require "' + S + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var serveSofaHrir = { exports: {} };
(function(S, t) {
  (function(n) {
    S.exports = n();
  })(function() {
    return function n(e, i, s) {
      function r(h, o) {
        if (!i[h]) {
          if (!e[h]) {
            var v = typeof commonjsRequire == "function" && commonjsRequire;
            if (!o && v) return v(h, !0);
            if (c) return c(h, !0);
            var p = new Error("Cannot find module '" + h + "'");
            throw p.code = "MODULE_NOT_FOUND", p;
          }
          var l = i[h] = { exports: {} };
          e[h][0].call(l.exports, function(m) {
            var d = e[h][1][m];
            return r(d || m);
          }, l, l.exports, n, e, i, s);
        }
        return i[h].exports;
      }
      for (var c = typeof commonjsRequire == "function" && commonjsRequire, f = 0; f < s.length; f++) r(s[f]);
      return r;
    }({ 1: [function(n, e, i) {
      e.exports = { default: n("core-js/library/fn/object/define-property"), __esModule: !0 };
    }, { "core-js/library/fn/object/define-property": 4 }], 2: [function(n, e, i) {
      i.default = function(s, r) {
        if (!(s instanceof r))
          throw new TypeError("Cannot call a class as a function");
      }, i.__esModule = !0;
    }, {}], 3: [function(n, e, i) {
      var s = n("babel-runtime/core-js/object/define-property").default;
      i.default = /* @__PURE__ */ function() {
        function r(c, f) {
          for (var h = 0; h < f.length; h++) {
            var o = f[h];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), s(c, o.key, o);
          }
        }
        return function(c, f, h) {
          return f && r(c.prototype, f), h && r(c, h), c;
        };
      }(), i.__esModule = !0;
    }, { "babel-runtime/core-js/object/define-property": 1 }], 4: [function(n, e, i) {
      var s = n("../../modules/$");
      e.exports = function(c, f, h) {
        return s.setDesc(c, f, h);
      };
    }, { "../../modules/$": 5 }], 5: [function(n, e, i) {
      var s = Object;
      e.exports = {
        create: s.create,
        getProto: s.getPrototypeOf,
        isEnum: {}.propertyIsEnumerable,
        getDesc: s.getOwnPropertyDescriptor,
        setDesc: s.defineProperty,
        setDescs: s.defineProperties,
        getKeys: s.keys,
        getNames: s.getOwnPropertyNames,
        getSymbols: s.getOwnPropertySymbols,
        each: [].forEach
      };
    }, {}], 6: [function(n, e, i) {
      var s = n("babel-runtime/helpers/create-class").default, r = n("babel-runtime/helpers/class-call-check").default;
      Object.defineProperty(i, "__esModule", {
        value: !0
      });
      var c = function() {
        function f(h, o) {
          r(this, f), this.delayTime = 0, this.posRead = 0, this.posWrite = 0, this.fracXi1 = 0, this.fracYi1 = 0, this.intDelay = 0, this.fracDelay = 0, this.a1 = void 0, this.sampleRate = h, this.maxDelayTime = o || 1, this.bufferSize = this.maxDelayTime * this.sampleRate, this.bufferSize % 1 !== 0 && (this.bufferSize = parseInt(this.bufferSize) + 1), this.buffer = new Float32Array(this.bufferSize);
        }
        return s(f, [{
          key: "setDelay",
          value: function(o) {
            if (o < this.maxDelayTime) {
              this.delayTime = o;
              var v = o * this.sampleRate;
              this.intDelay = parseInt(v), this.fracDelay = v - this.intDelay, this.resample(), this.fracDelay !== 0 && this.updateThiranCoefficient();
            } else
              throw new Error("delayTime > maxDelayTime");
          }
          /**
           * Update delay value
           * @public
           */
        }, {
          key: "getDelay",
          value: function() {
            return this.delayTime;
          }
          /**
           * Process method, where the output is calculated.
           * @param inputBuffer Input Array
           * @public
           */
        }, {
          key: "process",
          value: function(o) {
            for (var v = new Float32Array(o.length), p = 0; p < o.length; p = p + 1)
              this.buffer[this.posWrite] = o[p], v[p] = this.buffer[this.posRead], this.updatePointers();
            return this.fracDelay === 0 || (v = new Float32Array(this.fractionalThiranProcess(v))), v;
          }
          /**
           * Update the value of posRead and posWrite pointers inside the circular buffer
           * @private
           */
        }, {
          key: "updatePointers",
          value: function() {
            this.posWrite === this.buffer.length - 1 ? this.posWrite = 0 : this.posWrite = this.posWrite + 1, this.posRead === this.buffer.length - 1 ? this.posRead = 0 : this.posRead = this.posRead + 1;
          }
          /**
           * Update Thiran coefficient (1st order Thiran)
           * @private
           */
        }, {
          key: "updateThiranCoefficient",
          value: function() {
            this.a1 = (1 - this.fracDelay) / (1 + this.fracDelay);
          }
          /**
           * Update the pointer posRead value when the delay value is changed
           * @private
           */
        }, {
          key: "resample",
          value: function() {
            if (this.posWrite - this.intDelay < 0) {
              var o = this.intDelay - this.posWrite;
              this.posRead = this.buffer.length - o;
            } else
              this.posRead = this.posWrite - this.intDelay;
          }
          /**
           * Fractional process method.
           * @private
           * @param inputBuffer Input Array
           */
        }, {
          key: "fractionalThiranProcess",
          value: function(o) {
            for (var v = new Float32Array(o.length), p, l, m = this.fracXi1, d = this.fracYi1, _ = 0; _ < o.length; _ = _ + 1)
              p = o[_], l = this.a1 * p + m - this.a1 * d, m = p, d = l, v[_] = l;
            return this.fracXi1 = m, this.fracYi1 = d, v;
          }
        }]), f;
      }();
      i.default = c, e.exports = i.default;
    }, { "babel-runtime/helpers/class-call-check": 2, "babel-runtime/helpers/create-class": 3 }], 7: [function(n, e, i) {
      e.exports = n("./dist/fractional-delay");
    }, { "./dist/fractional-delay": 6 }], 8: [function(n, e, i) {
      (function(r, c) {
        if (typeof i == "object" && typeof e == "object")
          e.exports = c();
        else {
          var f = c();
          for (var h in f) (typeof i == "object" ? i : r)[h] = f[h];
        }
      })(this, function() {
        return (
          /******/
          function(s) {
            var r = {};
            function c(f) {
              if (r[f])
                return r[f].exports;
              var h = r[f] = {
                /******/
                i: f,
                /******/
                l: !1,
                /******/
                exports: {}
                /******/
              };
              return s[f].call(h.exports, h, h.exports, c), h.l = !0, h.exports;
            }
            return c.m = s, c.c = r, c.d = function(f, h, o) {
              c.o(f, h) || Object.defineProperty(f, h, {
                /******/
                configurable: !1,
                /******/
                enumerable: !0,
                /******/
                get: o
                /******/
              });
            }, c.n = function(f) {
              var h = f && f.__esModule ? (
                /******/
                function() {
                  return f.default;
                }
              ) : (
                /******/
                function() {
                  return f;
                }
              );
              return c.d(h, "a", h), h;
            }, c.o = function(f, h) {
              return Object.prototype.hasOwnProperty.call(f, h);
            }, c.p = "", c(c.s = 4);
          }([
            /* 0 */
            /***/
            function(s, r, c) {
              Object.defineProperty(r, "__esModule", {
                value: !0
              }), r.setMatrixArrayType = h, r.toRadian = v, r.equals = p;
              var f = r.EPSILON = 1e-6;
              r.ARRAY_TYPE = typeof Float32Array < "u" ? Float32Array : Array, r.RANDOM = Math.random;
              function h(l) {
                r.ARRAY_TYPE = l;
              }
              var o = Math.PI / 180;
              function v(l) {
                return l * o;
              }
              function p(l, m) {
                return Math.abs(l - m) <= f * Math.max(1, Math.abs(l), Math.abs(m));
              }
            },
            /* 1 */
            /***/
            function(s, r, c) {
              Object.defineProperty(r, "__esModule", {
                value: !0
              }), r.sub = r.mul = void 0, r.create = v, r.fromMat4 = p, r.clone = l, r.copy = m, r.fromValues = d, r.set = _, r.identity = D, r.transpose = q, r.invert = F, r.adjoint = x, r.determinant = N, r.multiply = R, r.translate = I, r.rotate = u, r.scale = b, r.fromTranslation = Z, r.fromRotation = G, r.fromScaling = J, r.fromMat2d = r0, r.fromQuat = s0, r.normalFromMat4 = C0, r.projection = _0, r.str = D0, r.frob = j, r.add = M, r.subtract = z, r.multiplyScalar = t0, r.multiplyScalarAndAdd = i0, r.exactEquals = c0, r.equals = g0;
              var f = c(0), h = o(f);
              function o(w) {
                if (w && w.__esModule)
                  return w;
                var g = {};
                if (w != null)
                  for (var E in w)
                    Object.prototype.hasOwnProperty.call(w, E) && (g[E] = w[E]);
                return g.default = w, g;
              }
              function v() {
                var w = new h.ARRAY_TYPE(9);
                return w[0] = 1, w[1] = 0, w[2] = 0, w[3] = 0, w[4] = 1, w[5] = 0, w[6] = 0, w[7] = 0, w[8] = 1, w;
              }
              function p(w, g) {
                return w[0] = g[0], w[1] = g[1], w[2] = g[2], w[3] = g[4], w[4] = g[5], w[5] = g[6], w[6] = g[8], w[7] = g[9], w[8] = g[10], w;
              }
              function l(w) {
                var g = new h.ARRAY_TYPE(9);
                return g[0] = w[0], g[1] = w[1], g[2] = w[2], g[3] = w[3], g[4] = w[4], g[5] = w[5], g[6] = w[6], g[7] = w[7], g[8] = w[8], g;
              }
              function m(w, g) {
                return w[0] = g[0], w[1] = g[1], w[2] = g[2], w[3] = g[3], w[4] = g[4], w[5] = g[5], w[6] = g[6], w[7] = g[7], w[8] = g[8], w;
              }
              function d(w, g, E, Q, O, X, $, o0, d0) {
                var L = new h.ARRAY_TYPE(9);
                return L[0] = w, L[1] = g, L[2] = E, L[3] = Q, L[4] = O, L[5] = X, L[6] = $, L[7] = o0, L[8] = d0, L;
              }
              function _(w, g, E, Q, O, X, $, o0, d0, L) {
                return w[0] = g, w[1] = E, w[2] = Q, w[3] = O, w[4] = X, w[5] = $, w[6] = o0, w[7] = d0, w[8] = L, w;
              }
              function D(w) {
                return w[0] = 1, w[1] = 0, w[2] = 0, w[3] = 0, w[4] = 1, w[5] = 0, w[6] = 0, w[7] = 0, w[8] = 1, w;
              }
              function q(w, g) {
                if (w === g) {
                  var E = g[1], Q = g[2], O = g[5];
                  w[1] = g[3], w[2] = g[6], w[3] = E, w[5] = g[7], w[6] = Q, w[7] = O;
                } else
                  w[0] = g[0], w[1] = g[3], w[2] = g[6], w[3] = g[1], w[4] = g[4], w[5] = g[7], w[6] = g[2], w[7] = g[5], w[8] = g[8];
                return w;
              }
              function F(w, g) {
                var E = g[0], Q = g[1], O = g[2], X = g[3], $ = g[4], o0 = g[5], d0 = g[6], L = g[7], K = g[8], n0 = K * $ - o0 * L, f0 = -K * X + o0 * d0, u0 = L * X - $ * d0, a = E * n0 + Q * f0 + O * u0;
                return a ? (a = 1 / a, w[0] = n0 * a, w[1] = (-K * Q + O * L) * a, w[2] = (o0 * Q - O * $) * a, w[3] = f0 * a, w[4] = (K * E - O * d0) * a, w[5] = (-o0 * E + O * X) * a, w[6] = u0 * a, w[7] = (-L * E + Q * d0) * a, w[8] = ($ * E - Q * X) * a, w) : null;
              }
              function x(w, g) {
                var E = g[0], Q = g[1], O = g[2], X = g[3], $ = g[4], o0 = g[5], d0 = g[6], L = g[7], K = g[8];
                return w[0] = $ * K - o0 * L, w[1] = O * L - Q * K, w[2] = Q * o0 - O * $, w[3] = o0 * d0 - X * K, w[4] = E * K - O * d0, w[5] = O * X - E * o0, w[6] = X * L - $ * d0, w[7] = Q * d0 - E * L, w[8] = E * $ - Q * X, w;
              }
              function N(w) {
                var g = w[0], E = w[1], Q = w[2], O = w[3], X = w[4], $ = w[5], o0 = w[6], d0 = w[7], L = w[8];
                return g * (L * X - $ * d0) + E * (-L * O + $ * o0) + Q * (d0 * O - X * o0);
              }
              function R(w, g, E) {
                var Q = g[0], O = g[1], X = g[2], $ = g[3], o0 = g[4], d0 = g[5], L = g[6], K = g[7], n0 = g[8], f0 = E[0], u0 = E[1], a = E[2], y = E[3], Y = E[4], H = E[5], e0 = E[6], a0 = E[7], h0 = E[8];
                return w[0] = f0 * Q + u0 * $ + a * L, w[1] = f0 * O + u0 * o0 + a * K, w[2] = f0 * X + u0 * d0 + a * n0, w[3] = y * Q + Y * $ + H * L, w[4] = y * O + Y * o0 + H * K, w[5] = y * X + Y * d0 + H * n0, w[6] = e0 * Q + a0 * $ + h0 * L, w[7] = e0 * O + a0 * o0 + h0 * K, w[8] = e0 * X + a0 * d0 + h0 * n0, w;
              }
              function I(w, g, E) {
                var Q = g[0], O = g[1], X = g[2], $ = g[3], o0 = g[4], d0 = g[5], L = g[6], K = g[7], n0 = g[8], f0 = E[0], u0 = E[1];
                return w[0] = Q, w[1] = O, w[2] = X, w[3] = $, w[4] = o0, w[5] = d0, w[6] = f0 * Q + u0 * $ + L, w[7] = f0 * O + u0 * o0 + K, w[8] = f0 * X + u0 * d0 + n0, w;
              }
              function u(w, g, E) {
                var Q = g[0], O = g[1], X = g[2], $ = g[3], o0 = g[4], d0 = g[5], L = g[6], K = g[7], n0 = g[8], f0 = Math.sin(E), u0 = Math.cos(E);
                return w[0] = u0 * Q + f0 * $, w[1] = u0 * O + f0 * o0, w[2] = u0 * X + f0 * d0, w[3] = u0 * $ - f0 * Q, w[4] = u0 * o0 - f0 * O, w[5] = u0 * d0 - f0 * X, w[6] = L, w[7] = K, w[8] = n0, w;
              }
              function b(w, g, E) {
                var Q = E[0], O = E[1];
                return w[0] = Q * g[0], w[1] = Q * g[1], w[2] = Q * g[2], w[3] = O * g[3], w[4] = O * g[4], w[5] = O * g[5], w[6] = g[6], w[7] = g[7], w[8] = g[8], w;
              }
              function Z(w, g) {
                return w[0] = 1, w[1] = 0, w[2] = 0, w[3] = 0, w[4] = 1, w[5] = 0, w[6] = g[0], w[7] = g[1], w[8] = 1, w;
              }
              function G(w, g) {
                var E = Math.sin(g), Q = Math.cos(g);
                return w[0] = Q, w[1] = E, w[2] = 0, w[3] = -E, w[4] = Q, w[5] = 0, w[6] = 0, w[7] = 0, w[8] = 1, w;
              }
              function J(w, g) {
                return w[0] = g[0], w[1] = 0, w[2] = 0, w[3] = 0, w[4] = g[1], w[5] = 0, w[6] = 0, w[7] = 0, w[8] = 1, w;
              }
              function r0(w, g) {
                return w[0] = g[0], w[1] = g[1], w[2] = 0, w[3] = g[2], w[4] = g[3], w[5] = 0, w[6] = g[4], w[7] = g[5], w[8] = 1, w;
              }
              function s0(w, g) {
                var E = g[0], Q = g[1], O = g[2], X = g[3], $ = E + E, o0 = Q + Q, d0 = O + O, L = E * $, K = Q * $, n0 = Q * o0, f0 = O * $, u0 = O * o0, a = O * d0, y = X * $, Y = X * o0, H = X * d0;
                return w[0] = 1 - n0 - a, w[3] = K - H, w[6] = f0 + Y, w[1] = K + H, w[4] = 1 - L - a, w[7] = u0 - y, w[2] = f0 - Y, w[5] = u0 + y, w[8] = 1 - L - n0, w;
              }
              function C0(w, g) {
                var E = g[0], Q = g[1], O = g[2], X = g[3], $ = g[4], o0 = g[5], d0 = g[6], L = g[7], K = g[8], n0 = g[9], f0 = g[10], u0 = g[11], a = g[12], y = g[13], Y = g[14], H = g[15], e0 = E * o0 - Q * $, a0 = E * d0 - O * $, h0 = E * L - X * $, l0 = Q * d0 - O * o0, v0 = Q * L - X * o0, m0 = O * L - X * d0, p0 = K * y - n0 * a, w0 = K * Y - f0 * a, M0 = K * H - u0 * a, S0 = n0 * Y - f0 * y, A0 = n0 * H - u0 * y, x0 = f0 * H - u0 * Y, y0 = e0 * x0 - a0 * A0 + h0 * S0 + l0 * M0 - v0 * w0 + m0 * p0;
                return y0 ? (y0 = 1 / y0, w[0] = (o0 * x0 - d0 * A0 + L * S0) * y0, w[1] = (d0 * M0 - $ * x0 - L * w0) * y0, w[2] = ($ * A0 - o0 * M0 + L * p0) * y0, w[3] = (O * A0 - Q * x0 - X * S0) * y0, w[4] = (E * x0 - O * M0 + X * w0) * y0, w[5] = (Q * M0 - E * A0 - X * p0) * y0, w[6] = (y * m0 - Y * v0 + H * l0) * y0, w[7] = (Y * h0 - a * m0 - H * a0) * y0, w[8] = (a * v0 - y * h0 + H * e0) * y0, w) : null;
              }
              function _0(w, g, E) {
                return w[0] = 2 / g, w[1] = 0, w[2] = 0, w[3] = 0, w[4] = -2 / E, w[5] = 0, w[6] = -1, w[7] = 1, w[8] = 1, w;
              }
              function D0(w) {
                return "mat3(" + w[0] + ", " + w[1] + ", " + w[2] + ", " + w[3] + ", " + w[4] + ", " + w[5] + ", " + w[6] + ", " + w[7] + ", " + w[8] + ")";
              }
              function j(w) {
                return Math.sqrt(Math.pow(w[0], 2) + Math.pow(w[1], 2) + Math.pow(w[2], 2) + Math.pow(w[3], 2) + Math.pow(w[4], 2) + Math.pow(w[5], 2) + Math.pow(w[6], 2) + Math.pow(w[7], 2) + Math.pow(w[8], 2));
              }
              function M(w, g, E) {
                return w[0] = g[0] + E[0], w[1] = g[1] + E[1], w[2] = g[2] + E[2], w[3] = g[3] + E[3], w[4] = g[4] + E[4], w[5] = g[5] + E[5], w[6] = g[6] + E[6], w[7] = g[7] + E[7], w[8] = g[8] + E[8], w;
              }
              function z(w, g, E) {
                return w[0] = g[0] - E[0], w[1] = g[1] - E[1], w[2] = g[2] - E[2], w[3] = g[3] - E[3], w[4] = g[4] - E[4], w[5] = g[5] - E[5], w[6] = g[6] - E[6], w[7] = g[7] - E[7], w[8] = g[8] - E[8], w;
              }
              function t0(w, g, E) {
                return w[0] = g[0] * E, w[1] = g[1] * E, w[2] = g[2] * E, w[3] = g[3] * E, w[4] = g[4] * E, w[5] = g[5] * E, w[6] = g[6] * E, w[7] = g[7] * E, w[8] = g[8] * E, w;
              }
              function i0(w, g, E, Q) {
                return w[0] = g[0] + E[0] * Q, w[1] = g[1] + E[1] * Q, w[2] = g[2] + E[2] * Q, w[3] = g[3] + E[3] * Q, w[4] = g[4] + E[4] * Q, w[5] = g[5] + E[5] * Q, w[6] = g[6] + E[6] * Q, w[7] = g[7] + E[7] * Q, w[8] = g[8] + E[8] * Q, w;
              }
              function c0(w, g) {
                return w[0] === g[0] && w[1] === g[1] && w[2] === g[2] && w[3] === g[3] && w[4] === g[4] && w[5] === g[5] && w[6] === g[6] && w[7] === g[7] && w[8] === g[8];
              }
              function g0(w, g) {
                var E = w[0], Q = w[1], O = w[2], X = w[3], $ = w[4], o0 = w[5], d0 = w[6], L = w[7], K = w[8], n0 = g[0], f0 = g[1], u0 = g[2], a = g[3], y = g[4], Y = g[5], H = g[6], e0 = g[7], a0 = g[8];
                return Math.abs(E - n0) <= h.EPSILON * Math.max(1, Math.abs(E), Math.abs(n0)) && Math.abs(Q - f0) <= h.EPSILON * Math.max(1, Math.abs(Q), Math.abs(f0)) && Math.abs(O - u0) <= h.EPSILON * Math.max(1, Math.abs(O), Math.abs(u0)) && Math.abs(X - a) <= h.EPSILON * Math.max(1, Math.abs(X), Math.abs(a)) && Math.abs($ - y) <= h.EPSILON * Math.max(1, Math.abs($), Math.abs(y)) && Math.abs(o0 - Y) <= h.EPSILON * Math.max(1, Math.abs(o0), Math.abs(Y)) && Math.abs(d0 - H) <= h.EPSILON * Math.max(1, Math.abs(d0), Math.abs(H)) && Math.abs(L - e0) <= h.EPSILON * Math.max(1, Math.abs(L), Math.abs(e0)) && Math.abs(K - a0) <= h.EPSILON * Math.max(1, Math.abs(K), Math.abs(a0));
              }
              r.mul = R, r.sub = z;
            },
            /* 2 */
            /***/
            function(s, r, c) {
              Object.defineProperty(r, "__esModule", {
                value: !0
              }), r.forEach = r.sqrLen = r.len = r.sqrDist = r.dist = r.div = r.mul = r.sub = void 0, r.create = v, r.clone = p, r.length = l, r.fromValues = m, r.copy = d, r.set = _, r.add = D, r.subtract = q, r.multiply = F, r.divide = x, r.ceil = N, r.floor = R, r.min = I, r.max = u, r.round = b, r.scale = Z, r.scaleAndAdd = G, r.distance = J, r.squaredDistance = r0, r.squaredLength = s0, r.negate = C0, r.inverse = _0, r.normalize = D0, r.dot = j, r.cross = M, r.lerp = z, r.hermite = t0, r.bezier = i0, r.random = c0, r.transformMat4 = g0, r.transformMat3 = w, r.transformQuat = g, r.rotateX = E, r.rotateY = Q, r.rotateZ = O, r.angle = X, r.str = $, r.exactEquals = o0, r.equals = d0;
              var f = c(0), h = o(f);
              function o(L) {
                if (L && L.__esModule)
                  return L;
                var K = {};
                if (L != null)
                  for (var n0 in L)
                    Object.prototype.hasOwnProperty.call(L, n0) && (K[n0] = L[n0]);
                return K.default = L, K;
              }
              function v() {
                var L = new h.ARRAY_TYPE(3);
                return L[0] = 0, L[1] = 0, L[2] = 0, L;
              }
              function p(L) {
                var K = new h.ARRAY_TYPE(3);
                return K[0] = L[0], K[1] = L[1], K[2] = L[2], K;
              }
              function l(L) {
                var K = L[0], n0 = L[1], f0 = L[2];
                return Math.sqrt(K * K + n0 * n0 + f0 * f0);
              }
              function m(L, K, n0) {
                var f0 = new h.ARRAY_TYPE(3);
                return f0[0] = L, f0[1] = K, f0[2] = n0, f0;
              }
              function d(L, K) {
                return L[0] = K[0], L[1] = K[1], L[2] = K[2], L;
              }
              function _(L, K, n0, f0) {
                return L[0] = K, L[1] = n0, L[2] = f0, L;
              }
              function D(L, K, n0) {
                return L[0] = K[0] + n0[0], L[1] = K[1] + n0[1], L[2] = K[2] + n0[2], L;
              }
              function q(L, K, n0) {
                return L[0] = K[0] - n0[0], L[1] = K[1] - n0[1], L[2] = K[2] - n0[2], L;
              }
              function F(L, K, n0) {
                return L[0] = K[0] * n0[0], L[1] = K[1] * n0[1], L[2] = K[2] * n0[2], L;
              }
              function x(L, K, n0) {
                return L[0] = K[0] / n0[0], L[1] = K[1] / n0[1], L[2] = K[2] / n0[2], L;
              }
              function N(L, K) {
                return L[0] = Math.ceil(K[0]), L[1] = Math.ceil(K[1]), L[2] = Math.ceil(K[2]), L;
              }
              function R(L, K) {
                return L[0] = Math.floor(K[0]), L[1] = Math.floor(K[1]), L[2] = Math.floor(K[2]), L;
              }
              function I(L, K, n0) {
                return L[0] = Math.min(K[0], n0[0]), L[1] = Math.min(K[1], n0[1]), L[2] = Math.min(K[2], n0[2]), L;
              }
              function u(L, K, n0) {
                return L[0] = Math.max(K[0], n0[0]), L[1] = Math.max(K[1], n0[1]), L[2] = Math.max(K[2], n0[2]), L;
              }
              function b(L, K) {
                return L[0] = Math.round(K[0]), L[1] = Math.round(K[1]), L[2] = Math.round(K[2]), L;
              }
              function Z(L, K, n0) {
                return L[0] = K[0] * n0, L[1] = K[1] * n0, L[2] = K[2] * n0, L;
              }
              function G(L, K, n0, f0) {
                return L[0] = K[0] + n0[0] * f0, L[1] = K[1] + n0[1] * f0, L[2] = K[2] + n0[2] * f0, L;
              }
              function J(L, K) {
                var n0 = K[0] - L[0], f0 = K[1] - L[1], u0 = K[2] - L[2];
                return Math.sqrt(n0 * n0 + f0 * f0 + u0 * u0);
              }
              function r0(L, K) {
                var n0 = K[0] - L[0], f0 = K[1] - L[1], u0 = K[2] - L[2];
                return n0 * n0 + f0 * f0 + u0 * u0;
              }
              function s0(L) {
                var K = L[0], n0 = L[1], f0 = L[2];
                return K * K + n0 * n0 + f0 * f0;
              }
              function C0(L, K) {
                return L[0] = -K[0], L[1] = -K[1], L[2] = -K[2], L;
              }
              function _0(L, K) {
                return L[0] = 1 / K[0], L[1] = 1 / K[1], L[2] = 1 / K[2], L;
              }
              function D0(L, K) {
                var n0 = K[0], f0 = K[1], u0 = K[2], a = n0 * n0 + f0 * f0 + u0 * u0;
                return a > 0 && (a = 1 / Math.sqrt(a), L[0] = K[0] * a, L[1] = K[1] * a, L[2] = K[2] * a), L;
              }
              function j(L, K) {
                return L[0] * K[0] + L[1] * K[1] + L[2] * K[2];
              }
              function M(L, K, n0) {
                var f0 = K[0], u0 = K[1], a = K[2], y = n0[0], Y = n0[1], H = n0[2];
                return L[0] = u0 * H - a * Y, L[1] = a * y - f0 * H, L[2] = f0 * Y - u0 * y, L;
              }
              function z(L, K, n0, f0) {
                var u0 = K[0], a = K[1], y = K[2];
                return L[0] = u0 + f0 * (n0[0] - u0), L[1] = a + f0 * (n0[1] - a), L[2] = y + f0 * (n0[2] - y), L;
              }
              function t0(L, K, n0, f0, u0, a) {
                var y = a * a, Y = y * (2 * a - 3) + 1, H = y * (a - 2) + a, e0 = y * (a - 1), a0 = y * (3 - 2 * a);
                return L[0] = K[0] * Y + n0[0] * H + f0[0] * e0 + u0[0] * a0, L[1] = K[1] * Y + n0[1] * H + f0[1] * e0 + u0[1] * a0, L[2] = K[2] * Y + n0[2] * H + f0[2] * e0 + u0[2] * a0, L;
              }
              function i0(L, K, n0, f0, u0, a) {
                var y = 1 - a, Y = y * y, H = a * a, e0 = Y * y, a0 = 3 * a * Y, h0 = 3 * H * y, l0 = H * a;
                return L[0] = K[0] * e0 + n0[0] * a0 + f0[0] * h0 + u0[0] * l0, L[1] = K[1] * e0 + n0[1] * a0 + f0[1] * h0 + u0[1] * l0, L[2] = K[2] * e0 + n0[2] * a0 + f0[2] * h0 + u0[2] * l0, L;
              }
              function c0(L, K) {
                K = K || 1;
                var n0 = h.RANDOM() * 2 * Math.PI, f0 = h.RANDOM() * 2 - 1, u0 = Math.sqrt(1 - f0 * f0) * K;
                return L[0] = Math.cos(n0) * u0, L[1] = Math.sin(n0) * u0, L[2] = f0 * K, L;
              }
              function g0(L, K, n0) {
                var f0 = K[0], u0 = K[1], a = K[2], y = n0[3] * f0 + n0[7] * u0 + n0[11] * a + n0[15];
                return y = y || 1, L[0] = (n0[0] * f0 + n0[4] * u0 + n0[8] * a + n0[12]) / y, L[1] = (n0[1] * f0 + n0[5] * u0 + n0[9] * a + n0[13]) / y, L[2] = (n0[2] * f0 + n0[6] * u0 + n0[10] * a + n0[14]) / y, L;
              }
              function w(L, K, n0) {
                var f0 = K[0], u0 = K[1], a = K[2];
                return L[0] = f0 * n0[0] + u0 * n0[3] + a * n0[6], L[1] = f0 * n0[1] + u0 * n0[4] + a * n0[7], L[2] = f0 * n0[2] + u0 * n0[5] + a * n0[8], L;
              }
              function g(L, K, n0) {
                var f0 = K[0], u0 = K[1], a = K[2], y = n0[0], Y = n0[1], H = n0[2], e0 = n0[3], a0 = e0 * f0 + Y * a - H * u0, h0 = e0 * u0 + H * f0 - y * a, l0 = e0 * a + y * u0 - Y * f0, v0 = -y * f0 - Y * u0 - H * a;
                return L[0] = a0 * e0 + v0 * -y + h0 * -H - l0 * -Y, L[1] = h0 * e0 + v0 * -Y + l0 * -y - a0 * -H, L[2] = l0 * e0 + v0 * -H + a0 * -Y - h0 * -y, L;
              }
              function E(L, K, n0, f0) {
                var u0 = [], a = [];
                return u0[0] = K[0] - n0[0], u0[1] = K[1] - n0[1], u0[2] = K[2] - n0[2], a[0] = u0[0], a[1] = u0[1] * Math.cos(f0) - u0[2] * Math.sin(f0), a[2] = u0[1] * Math.sin(f0) + u0[2] * Math.cos(f0), L[0] = a[0] + n0[0], L[1] = a[1] + n0[1], L[2] = a[2] + n0[2], L;
              }
              function Q(L, K, n0, f0) {
                var u0 = [], a = [];
                return u0[0] = K[0] - n0[0], u0[1] = K[1] - n0[1], u0[2] = K[2] - n0[2], a[0] = u0[2] * Math.sin(f0) + u0[0] * Math.cos(f0), a[1] = u0[1], a[2] = u0[2] * Math.cos(f0) - u0[0] * Math.sin(f0), L[0] = a[0] + n0[0], L[1] = a[1] + n0[1], L[2] = a[2] + n0[2], L;
              }
              function O(L, K, n0, f0) {
                var u0 = [], a = [];
                return u0[0] = K[0] - n0[0], u0[1] = K[1] - n0[1], u0[2] = K[2] - n0[2], a[0] = u0[0] * Math.cos(f0) - u0[1] * Math.sin(f0), a[1] = u0[0] * Math.sin(f0) + u0[1] * Math.cos(f0), a[2] = u0[2], L[0] = a[0] + n0[0], L[1] = a[1] + n0[1], L[2] = a[2] + n0[2], L;
              }
              function X(L, K) {
                var n0 = m(L[0], L[1], L[2]), f0 = m(K[0], K[1], K[2]);
                D0(n0, n0), D0(f0, f0);
                var u0 = j(n0, f0);
                return u0 > 1 ? 0 : u0 < -1 ? Math.PI : Math.acos(u0);
              }
              function $(L) {
                return "vec3(" + L[0] + ", " + L[1] + ", " + L[2] + ")";
              }
              function o0(L, K) {
                return L[0] === K[0] && L[1] === K[1] && L[2] === K[2];
              }
              function d0(L, K) {
                var n0 = L[0], f0 = L[1], u0 = L[2], a = K[0], y = K[1], Y = K[2];
                return Math.abs(n0 - a) <= h.EPSILON * Math.max(1, Math.abs(n0), Math.abs(a)) && Math.abs(f0 - y) <= h.EPSILON * Math.max(1, Math.abs(f0), Math.abs(y)) && Math.abs(u0 - Y) <= h.EPSILON * Math.max(1, Math.abs(u0), Math.abs(Y));
              }
              r.sub = q, r.mul = F, r.div = x, r.dist = J, r.sqrDist = r0, r.len = l, r.sqrLen = s0, r.forEach = function() {
                var L = v();
                return function(K, n0, f0, u0, a, y) {
                  var Y = void 0, H = void 0;
                  for (n0 || (n0 = 3), f0 || (f0 = 0), u0 ? H = Math.min(u0 * n0 + f0, K.length) : H = K.length, Y = f0; Y < H; Y += n0)
                    L[0] = K[Y], L[1] = K[Y + 1], L[2] = K[Y + 2], a(L, L, y), K[Y] = L[0], K[Y + 1] = L[1], K[Y + 2] = L[2];
                  return K;
                };
              }();
            },
            /* 3 */
            /***/
            function(s, r, c) {
              Object.defineProperty(r, "__esModule", {
                value: !0
              }), r.forEach = r.sqrLen = r.len = r.sqrDist = r.dist = r.div = r.mul = r.sub = void 0, r.create = v, r.clone = p, r.fromValues = l, r.copy = m, r.set = d, r.add = _, r.subtract = D, r.multiply = q, r.divide = F, r.ceil = x, r.floor = N, r.min = R, r.max = I, r.round = u, r.scale = b, r.scaleAndAdd = Z, r.distance = G, r.squaredDistance = J, r.length = r0, r.squaredLength = s0, r.negate = C0, r.inverse = _0, r.normalize = D0, r.dot = j, r.lerp = M, r.random = z, r.transformMat4 = t0, r.transformQuat = i0, r.str = c0, r.exactEquals = g0, r.equals = w;
              var f = c(0), h = o(f);
              function o(g) {
                if (g && g.__esModule)
                  return g;
                var E = {};
                if (g != null)
                  for (var Q in g)
                    Object.prototype.hasOwnProperty.call(g, Q) && (E[Q] = g[Q]);
                return E.default = g, E;
              }
              function v() {
                var g = new h.ARRAY_TYPE(4);
                return g[0] = 0, g[1] = 0, g[2] = 0, g[3] = 0, g;
              }
              function p(g) {
                var E = new h.ARRAY_TYPE(4);
                return E[0] = g[0], E[1] = g[1], E[2] = g[2], E[3] = g[3], E;
              }
              function l(g, E, Q, O) {
                var X = new h.ARRAY_TYPE(4);
                return X[0] = g, X[1] = E, X[2] = Q, X[3] = O, X;
              }
              function m(g, E) {
                return g[0] = E[0], g[1] = E[1], g[2] = E[2], g[3] = E[3], g;
              }
              function d(g, E, Q, O, X) {
                return g[0] = E, g[1] = Q, g[2] = O, g[3] = X, g;
              }
              function _(g, E, Q) {
                return g[0] = E[0] + Q[0], g[1] = E[1] + Q[1], g[2] = E[2] + Q[2], g[3] = E[3] + Q[3], g;
              }
              function D(g, E, Q) {
                return g[0] = E[0] - Q[0], g[1] = E[1] - Q[1], g[2] = E[2] - Q[2], g[3] = E[3] - Q[3], g;
              }
              function q(g, E, Q) {
                return g[0] = E[0] * Q[0], g[1] = E[1] * Q[1], g[2] = E[2] * Q[2], g[3] = E[3] * Q[3], g;
              }
              function F(g, E, Q) {
                return g[0] = E[0] / Q[0], g[1] = E[1] / Q[1], g[2] = E[2] / Q[2], g[3] = E[3] / Q[3], g;
              }
              function x(g, E) {
                return g[0] = Math.ceil(E[0]), g[1] = Math.ceil(E[1]), g[2] = Math.ceil(E[2]), g[3] = Math.ceil(E[3]), g;
              }
              function N(g, E) {
                return g[0] = Math.floor(E[0]), g[1] = Math.floor(E[1]), g[2] = Math.floor(E[2]), g[3] = Math.floor(E[3]), g;
              }
              function R(g, E, Q) {
                return g[0] = Math.min(E[0], Q[0]), g[1] = Math.min(E[1], Q[1]), g[2] = Math.min(E[2], Q[2]), g[3] = Math.min(E[3], Q[3]), g;
              }
              function I(g, E, Q) {
                return g[0] = Math.max(E[0], Q[0]), g[1] = Math.max(E[1], Q[1]), g[2] = Math.max(E[2], Q[2]), g[3] = Math.max(E[3], Q[3]), g;
              }
              function u(g, E) {
                return g[0] = Math.round(E[0]), g[1] = Math.round(E[1]), g[2] = Math.round(E[2]), g[3] = Math.round(E[3]), g;
              }
              function b(g, E, Q) {
                return g[0] = E[0] * Q, g[1] = E[1] * Q, g[2] = E[2] * Q, g[3] = E[3] * Q, g;
              }
              function Z(g, E, Q, O) {
                return g[0] = E[0] + Q[0] * O, g[1] = E[1] + Q[1] * O, g[2] = E[2] + Q[2] * O, g[3] = E[3] + Q[3] * O, g;
              }
              function G(g, E) {
                var Q = E[0] - g[0], O = E[1] - g[1], X = E[2] - g[2], $ = E[3] - g[3];
                return Math.sqrt(Q * Q + O * O + X * X + $ * $);
              }
              function J(g, E) {
                var Q = E[0] - g[0], O = E[1] - g[1], X = E[2] - g[2], $ = E[3] - g[3];
                return Q * Q + O * O + X * X + $ * $;
              }
              function r0(g) {
                var E = g[0], Q = g[1], O = g[2], X = g[3];
                return Math.sqrt(E * E + Q * Q + O * O + X * X);
              }
              function s0(g) {
                var E = g[0], Q = g[1], O = g[2], X = g[3];
                return E * E + Q * Q + O * O + X * X;
              }
              function C0(g, E) {
                return g[0] = -E[0], g[1] = -E[1], g[2] = -E[2], g[3] = -E[3], g;
              }
              function _0(g, E) {
                return g[0] = 1 / E[0], g[1] = 1 / E[1], g[2] = 1 / E[2], g[3] = 1 / E[3], g;
              }
              function D0(g, E) {
                var Q = E[0], O = E[1], X = E[2], $ = E[3], o0 = Q * Q + O * O + X * X + $ * $;
                return o0 > 0 && (o0 = 1 / Math.sqrt(o0), g[0] = Q * o0, g[1] = O * o0, g[2] = X * o0, g[3] = $ * o0), g;
              }
              function j(g, E) {
                return g[0] * E[0] + g[1] * E[1] + g[2] * E[2] + g[3] * E[3];
              }
              function M(g, E, Q, O) {
                var X = E[0], $ = E[1], o0 = E[2], d0 = E[3];
                return g[0] = X + O * (Q[0] - X), g[1] = $ + O * (Q[1] - $), g[2] = o0 + O * (Q[2] - o0), g[3] = d0 + O * (Q[3] - d0), g;
              }
              function z(g, E) {
                return E = E || 1, g[0] = h.RANDOM(), g[1] = h.RANDOM(), g[2] = h.RANDOM(), g[3] = h.RANDOM(), D0(g, g), b(g, g, E), g;
              }
              function t0(g, E, Q) {
                var O = E[0], X = E[1], $ = E[2], o0 = E[3];
                return g[0] = Q[0] * O + Q[4] * X + Q[8] * $ + Q[12] * o0, g[1] = Q[1] * O + Q[5] * X + Q[9] * $ + Q[13] * o0, g[2] = Q[2] * O + Q[6] * X + Q[10] * $ + Q[14] * o0, g[3] = Q[3] * O + Q[7] * X + Q[11] * $ + Q[15] * o0, g;
              }
              function i0(g, E, Q) {
                var O = E[0], X = E[1], $ = E[2], o0 = Q[0], d0 = Q[1], L = Q[2], K = Q[3], n0 = K * O + d0 * $ - L * X, f0 = K * X + L * O - o0 * $, u0 = K * $ + o0 * X - d0 * O, a = -o0 * O - d0 * X - L * $;
                return g[0] = n0 * K + a * -o0 + f0 * -L - u0 * -d0, g[1] = f0 * K + a * -d0 + u0 * -o0 - n0 * -L, g[2] = u0 * K + a * -L + n0 * -d0 - f0 * -o0, g[3] = E[3], g;
              }
              function c0(g) {
                return "vec4(" + g[0] + ", " + g[1] + ", " + g[2] + ", " + g[3] + ")";
              }
              function g0(g, E) {
                return g[0] === E[0] && g[1] === E[1] && g[2] === E[2] && g[3] === E[3];
              }
              function w(g, E) {
                var Q = g[0], O = g[1], X = g[2], $ = g[3], o0 = E[0], d0 = E[1], L = E[2], K = E[3];
                return Math.abs(Q - o0) <= h.EPSILON * Math.max(1, Math.abs(Q), Math.abs(o0)) && Math.abs(O - d0) <= h.EPSILON * Math.max(1, Math.abs(O), Math.abs(d0)) && Math.abs(X - L) <= h.EPSILON * Math.max(1, Math.abs(X), Math.abs(L)) && Math.abs($ - K) <= h.EPSILON * Math.max(1, Math.abs($), Math.abs(K));
              }
              r.sub = D, r.mul = q, r.div = F, r.dist = G, r.sqrDist = J, r.len = r0, r.sqrLen = s0, r.forEach = function() {
                var g = v();
                return function(E, Q, O, X, $, o0) {
                  var d0 = void 0, L = void 0;
                  for (Q || (Q = 4), O || (O = 0), X ? L = Math.min(X * Q + O, E.length) : L = E.length, d0 = O; d0 < L; d0 += Q)
                    g[0] = E[d0], g[1] = E[d0 + 1], g[2] = E[d0 + 2], g[3] = E[d0 + 3], $(g, g, o0), E[d0] = g[0], E[d0 + 1] = g[1], E[d0 + 2] = g[2], E[d0 + 3] = g[3];
                  return E;
                };
              }();
            },
            /* 4 */
            /***/
            function(s, r, c) {
              Object.defineProperty(r, "__esModule", {
                value: !0
              }), r.vec4 = r.vec3 = r.vec2 = r.quat = r.mat4 = r.mat3 = r.mat2d = r.mat2 = r.glMatrix = void 0;
              var f = c(0), h = Z(f), o = c(5), v = Z(o), p = c(6), l = Z(p), m = c(1), d = Z(m), _ = c(7), D = Z(_), q = c(8), F = Z(q), x = c(9), N = Z(x), R = c(2), I = Z(R), u = c(3), b = Z(u);
              function Z(G) {
                if (G && G.__esModule)
                  return G;
                var J = {};
                if (G != null)
                  for (var r0 in G)
                    Object.prototype.hasOwnProperty.call(G, r0) && (J[r0] = G[r0]);
                return J.default = G, J;
              }
              r.glMatrix = h, r.mat2 = v, r.mat2d = l, r.mat3 = d, r.mat4 = D, r.quat = F, r.vec2 = N, r.vec3 = I, r.vec4 = b;
            },
            /* 5 */
            /***/
            function(s, r, c) {
              Object.defineProperty(r, "__esModule", {
                value: !0
              }), r.sub = r.mul = void 0, r.create = v, r.clone = p, r.copy = l, r.identity = m, r.fromValues = d, r.set = _, r.transpose = D, r.invert = q, r.adjoint = F, r.determinant = x, r.multiply = N, r.rotate = R, r.scale = I, r.fromRotation = u, r.fromScaling = b, r.str = Z, r.frob = G, r.LDU = J, r.add = r0, r.subtract = s0, r.exactEquals = C0, r.equals = _0, r.multiplyScalar = D0, r.multiplyScalarAndAdd = j;
              var f = c(0), h = o(f);
              function o(M) {
                if (M && M.__esModule)
                  return M;
                var z = {};
                if (M != null)
                  for (var t0 in M)
                    Object.prototype.hasOwnProperty.call(M, t0) && (z[t0] = M[t0]);
                return z.default = M, z;
              }
              function v() {
                var M = new h.ARRAY_TYPE(4);
                return M[0] = 1, M[1] = 0, M[2] = 0, M[3] = 1, M;
              }
              function p(M) {
                var z = new h.ARRAY_TYPE(4);
                return z[0] = M[0], z[1] = M[1], z[2] = M[2], z[3] = M[3], z;
              }
              function l(M, z) {
                return M[0] = z[0], M[1] = z[1], M[2] = z[2], M[3] = z[3], M;
              }
              function m(M) {
                return M[0] = 1, M[1] = 0, M[2] = 0, M[3] = 1, M;
              }
              function d(M, z, t0, i0) {
                var c0 = new h.ARRAY_TYPE(4);
                return c0[0] = M, c0[1] = z, c0[2] = t0, c0[3] = i0, c0;
              }
              function _(M, z, t0, i0, c0) {
                return M[0] = z, M[1] = t0, M[2] = i0, M[3] = c0, M;
              }
              function D(M, z) {
                if (M === z) {
                  var t0 = z[1];
                  M[1] = z[2], M[2] = t0;
                } else
                  M[0] = z[0], M[1] = z[2], M[2] = z[1], M[3] = z[3];
                return M;
              }
              function q(M, z) {
                var t0 = z[0], i0 = z[1], c0 = z[2], g0 = z[3], w = t0 * g0 - c0 * i0;
                return w ? (w = 1 / w, M[0] = g0 * w, M[1] = -i0 * w, M[2] = -c0 * w, M[3] = t0 * w, M) : null;
              }
              function F(M, z) {
                var t0 = z[0];
                return M[0] = z[3], M[1] = -z[1], M[2] = -z[2], M[3] = t0, M;
              }
              function x(M) {
                return M[0] * M[3] - M[2] * M[1];
              }
              function N(M, z, t0) {
                var i0 = z[0], c0 = z[1], g0 = z[2], w = z[3], g = t0[0], E = t0[1], Q = t0[2], O = t0[3];
                return M[0] = i0 * g + g0 * E, M[1] = c0 * g + w * E, M[2] = i0 * Q + g0 * O, M[3] = c0 * Q + w * O, M;
              }
              function R(M, z, t0) {
                var i0 = z[0], c0 = z[1], g0 = z[2], w = z[3], g = Math.sin(t0), E = Math.cos(t0);
                return M[0] = i0 * E + g0 * g, M[1] = c0 * E + w * g, M[2] = i0 * -g + g0 * E, M[3] = c0 * -g + w * E, M;
              }
              function I(M, z, t0) {
                var i0 = z[0], c0 = z[1], g0 = z[2], w = z[3], g = t0[0], E = t0[1];
                return M[0] = i0 * g, M[1] = c0 * g, M[2] = g0 * E, M[3] = w * E, M;
              }
              function u(M, z) {
                var t0 = Math.sin(z), i0 = Math.cos(z);
                return M[0] = i0, M[1] = t0, M[2] = -t0, M[3] = i0, M;
              }
              function b(M, z) {
                return M[0] = z[0], M[1] = 0, M[2] = 0, M[3] = z[1], M;
              }
              function Z(M) {
                return "mat2(" + M[0] + ", " + M[1] + ", " + M[2] + ", " + M[3] + ")";
              }
              function G(M) {
                return Math.sqrt(Math.pow(M[0], 2) + Math.pow(M[1], 2) + Math.pow(M[2], 2) + Math.pow(M[3], 2));
              }
              function J(M, z, t0, i0) {
                return M[2] = i0[2] / i0[0], t0[0] = i0[0], t0[1] = i0[1], t0[3] = i0[3] - M[2] * t0[1], [M, z, t0];
              }
              function r0(M, z, t0) {
                return M[0] = z[0] + t0[0], M[1] = z[1] + t0[1], M[2] = z[2] + t0[2], M[3] = z[3] + t0[3], M;
              }
              function s0(M, z, t0) {
                return M[0] = z[0] - t0[0], M[1] = z[1] - t0[1], M[2] = z[2] - t0[2], M[3] = z[3] - t0[3], M;
              }
              function C0(M, z) {
                return M[0] === z[0] && M[1] === z[1] && M[2] === z[2] && M[3] === z[3];
              }
              function _0(M, z) {
                var t0 = M[0], i0 = M[1], c0 = M[2], g0 = M[3], w = z[0], g = z[1], E = z[2], Q = z[3];
                return Math.abs(t0 - w) <= h.EPSILON * Math.max(1, Math.abs(t0), Math.abs(w)) && Math.abs(i0 - g) <= h.EPSILON * Math.max(1, Math.abs(i0), Math.abs(g)) && Math.abs(c0 - E) <= h.EPSILON * Math.max(1, Math.abs(c0), Math.abs(E)) && Math.abs(g0 - Q) <= h.EPSILON * Math.max(1, Math.abs(g0), Math.abs(Q));
              }
              function D0(M, z, t0) {
                return M[0] = z[0] * t0, M[1] = z[1] * t0, M[2] = z[2] * t0, M[3] = z[3] * t0, M;
              }
              function j(M, z, t0, i0) {
                return M[0] = z[0] + t0[0] * i0, M[1] = z[1] + t0[1] * i0, M[2] = z[2] + t0[2] * i0, M[3] = z[3] + t0[3] * i0, M;
              }
              r.mul = N, r.sub = s0;
            },
            /* 6 */
            /***/
            function(s, r, c) {
              Object.defineProperty(r, "__esModule", {
                value: !0
              }), r.sub = r.mul = void 0, r.create = v, r.clone = p, r.copy = l, r.identity = m, r.fromValues = d, r.set = _, r.invert = D, r.determinant = q, r.multiply = F, r.rotate = x, r.scale = N, r.translate = R, r.fromRotation = I, r.fromScaling = u, r.fromTranslation = b, r.str = Z, r.frob = G, r.add = J, r.subtract = r0, r.multiplyScalar = s0, r.multiplyScalarAndAdd = C0, r.exactEquals = _0, r.equals = D0;
              var f = c(0), h = o(f);
              function o(j) {
                if (j && j.__esModule)
                  return j;
                var M = {};
                if (j != null)
                  for (var z in j)
                    Object.prototype.hasOwnProperty.call(j, z) && (M[z] = j[z]);
                return M.default = j, M;
              }
              function v() {
                var j = new h.ARRAY_TYPE(6);
                return j[0] = 1, j[1] = 0, j[2] = 0, j[3] = 1, j[4] = 0, j[5] = 0, j;
              }
              function p(j) {
                var M = new h.ARRAY_TYPE(6);
                return M[0] = j[0], M[1] = j[1], M[2] = j[2], M[3] = j[3], M[4] = j[4], M[5] = j[5], M;
              }
              function l(j, M) {
                return j[0] = M[0], j[1] = M[1], j[2] = M[2], j[3] = M[3], j[4] = M[4], j[5] = M[5], j;
              }
              function m(j) {
                return j[0] = 1, j[1] = 0, j[2] = 0, j[3] = 1, j[4] = 0, j[5] = 0, j;
              }
              function d(j, M, z, t0, i0, c0) {
                var g0 = new h.ARRAY_TYPE(6);
                return g0[0] = j, g0[1] = M, g0[2] = z, g0[3] = t0, g0[4] = i0, g0[5] = c0, g0;
              }
              function _(j, M, z, t0, i0, c0, g0) {
                return j[0] = M, j[1] = z, j[2] = t0, j[3] = i0, j[4] = c0, j[5] = g0, j;
              }
              function D(j, M) {
                var z = M[0], t0 = M[1], i0 = M[2], c0 = M[3], g0 = M[4], w = M[5], g = z * c0 - t0 * i0;
                return g ? (g = 1 / g, j[0] = c0 * g, j[1] = -t0 * g, j[2] = -i0 * g, j[3] = z * g, j[4] = (i0 * w - c0 * g0) * g, j[5] = (t0 * g0 - z * w) * g, j) : null;
              }
              function q(j) {
                return j[0] * j[3] - j[1] * j[2];
              }
              function F(j, M, z) {
                var t0 = M[0], i0 = M[1], c0 = M[2], g0 = M[3], w = M[4], g = M[5], E = z[0], Q = z[1], O = z[2], X = z[3], $ = z[4], o0 = z[5];
                return j[0] = t0 * E + c0 * Q, j[1] = i0 * E + g0 * Q, j[2] = t0 * O + c0 * X, j[3] = i0 * O + g0 * X, j[4] = t0 * $ + c0 * o0 + w, j[5] = i0 * $ + g0 * o0 + g, j;
              }
              function x(j, M, z) {
                var t0 = M[0], i0 = M[1], c0 = M[2], g0 = M[3], w = M[4], g = M[5], E = Math.sin(z), Q = Math.cos(z);
                return j[0] = t0 * Q + c0 * E, j[1] = i0 * Q + g0 * E, j[2] = t0 * -E + c0 * Q, j[3] = i0 * -E + g0 * Q, j[4] = w, j[5] = g, j;
              }
              function N(j, M, z) {
                var t0 = M[0], i0 = M[1], c0 = M[2], g0 = M[3], w = M[4], g = M[5], E = z[0], Q = z[1];
                return j[0] = t0 * E, j[1] = i0 * E, j[2] = c0 * Q, j[3] = g0 * Q, j[4] = w, j[5] = g, j;
              }
              function R(j, M, z) {
                var t0 = M[0], i0 = M[1], c0 = M[2], g0 = M[3], w = M[4], g = M[5], E = z[0], Q = z[1];
                return j[0] = t0, j[1] = i0, j[2] = c0, j[3] = g0, j[4] = t0 * E + c0 * Q + w, j[5] = i0 * E + g0 * Q + g, j;
              }
              function I(j, M) {
                var z = Math.sin(M), t0 = Math.cos(M);
                return j[0] = t0, j[1] = z, j[2] = -z, j[3] = t0, j[4] = 0, j[5] = 0, j;
              }
              function u(j, M) {
                return j[0] = M[0], j[1] = 0, j[2] = 0, j[3] = M[1], j[4] = 0, j[5] = 0, j;
              }
              function b(j, M) {
                return j[0] = 1, j[1] = 0, j[2] = 0, j[3] = 1, j[4] = M[0], j[5] = M[1], j;
              }
              function Z(j) {
                return "mat2d(" + j[0] + ", " + j[1] + ", " + j[2] + ", " + j[3] + ", " + j[4] + ", " + j[5] + ")";
              }
              function G(j) {
                return Math.sqrt(Math.pow(j[0], 2) + Math.pow(j[1], 2) + Math.pow(j[2], 2) + Math.pow(j[3], 2) + Math.pow(j[4], 2) + Math.pow(j[5], 2) + 1);
              }
              function J(j, M, z) {
                return j[0] = M[0] + z[0], j[1] = M[1] + z[1], j[2] = M[2] + z[2], j[3] = M[3] + z[3], j[4] = M[4] + z[4], j[5] = M[5] + z[5], j;
              }
              function r0(j, M, z) {
                return j[0] = M[0] - z[0], j[1] = M[1] - z[1], j[2] = M[2] - z[2], j[3] = M[3] - z[3], j[4] = M[4] - z[4], j[5] = M[5] - z[5], j;
              }
              function s0(j, M, z) {
                return j[0] = M[0] * z, j[1] = M[1] * z, j[2] = M[2] * z, j[3] = M[3] * z, j[4] = M[4] * z, j[5] = M[5] * z, j;
              }
              function C0(j, M, z, t0) {
                return j[0] = M[0] + z[0] * t0, j[1] = M[1] + z[1] * t0, j[2] = M[2] + z[2] * t0, j[3] = M[3] + z[3] * t0, j[4] = M[4] + z[4] * t0, j[5] = M[5] + z[5] * t0, j;
              }
              function _0(j, M) {
                return j[0] === M[0] && j[1] === M[1] && j[2] === M[2] && j[3] === M[3] && j[4] === M[4] && j[5] === M[5];
              }
              function D0(j, M) {
                var z = j[0], t0 = j[1], i0 = j[2], c0 = j[3], g0 = j[4], w = j[5], g = M[0], E = M[1], Q = M[2], O = M[3], X = M[4], $ = M[5];
                return Math.abs(z - g) <= h.EPSILON * Math.max(1, Math.abs(z), Math.abs(g)) && Math.abs(t0 - E) <= h.EPSILON * Math.max(1, Math.abs(t0), Math.abs(E)) && Math.abs(i0 - Q) <= h.EPSILON * Math.max(1, Math.abs(i0), Math.abs(Q)) && Math.abs(c0 - O) <= h.EPSILON * Math.max(1, Math.abs(c0), Math.abs(O)) && Math.abs(g0 - X) <= h.EPSILON * Math.max(1, Math.abs(g0), Math.abs(X)) && Math.abs(w - $) <= h.EPSILON * Math.max(1, Math.abs(w), Math.abs($));
              }
              r.mul = F, r.sub = r0;
            },
            /* 7 */
            /***/
            function(s, r, c) {
              Object.defineProperty(r, "__esModule", {
                value: !0
              }), r.sub = r.mul = void 0, r.create = v, r.clone = p, r.copy = l, r.fromValues = m, r.set = d, r.identity = _, r.transpose = D, r.invert = q, r.adjoint = F, r.determinant = x, r.multiply = N, r.translate = R, r.scale = I, r.rotate = u, r.rotateX = b, r.rotateY = Z, r.rotateZ = G, r.fromTranslation = J, r.fromScaling = r0, r.fromRotation = s0, r.fromXRotation = C0, r.fromYRotation = _0, r.fromZRotation = D0, r.fromRotationTranslation = j, r.getTranslation = M, r.getScaling = z, r.getRotation = t0, r.fromRotationTranslationScale = i0, r.fromRotationTranslationScaleOrigin = c0, r.fromQuat = g0, r.frustum = w, r.perspective = g, r.perspectiveFromFieldOfView = E, r.ortho = Q, r.lookAt = O, r.targetTo = X, r.str = $, r.frob = o0, r.add = d0, r.subtract = L, r.multiplyScalar = K, r.multiplyScalarAndAdd = n0, r.exactEquals = f0, r.equals = u0;
              var f = c(0), h = o(f);
              function o(a) {
                if (a && a.__esModule)
                  return a;
                var y = {};
                if (a != null)
                  for (var Y in a)
                    Object.prototype.hasOwnProperty.call(a, Y) && (y[Y] = a[Y]);
                return y.default = a, y;
              }
              function v() {
                var a = new h.ARRAY_TYPE(16);
                return a[0] = 1, a[1] = 0, a[2] = 0, a[3] = 0, a[4] = 0, a[5] = 1, a[6] = 0, a[7] = 0, a[8] = 0, a[9] = 0, a[10] = 1, a[11] = 0, a[12] = 0, a[13] = 0, a[14] = 0, a[15] = 1, a;
              }
              function p(a) {
                var y = new h.ARRAY_TYPE(16);
                return y[0] = a[0], y[1] = a[1], y[2] = a[2], y[3] = a[3], y[4] = a[4], y[5] = a[5], y[6] = a[6], y[7] = a[7], y[8] = a[8], y[9] = a[9], y[10] = a[10], y[11] = a[11], y[12] = a[12], y[13] = a[13], y[14] = a[14], y[15] = a[15], y;
              }
              function l(a, y) {
                return a[0] = y[0], a[1] = y[1], a[2] = y[2], a[3] = y[3], a[4] = y[4], a[5] = y[5], a[6] = y[6], a[7] = y[7], a[8] = y[8], a[9] = y[9], a[10] = y[10], a[11] = y[11], a[12] = y[12], a[13] = y[13], a[14] = y[14], a[15] = y[15], a;
              }
              function m(a, y, Y, H, e0, a0, h0, l0, v0, m0, p0, w0, M0, S0, A0, x0) {
                var y0 = new h.ARRAY_TYPE(16);
                return y0[0] = a, y0[1] = y, y0[2] = Y, y0[3] = H, y0[4] = e0, y0[5] = a0, y0[6] = h0, y0[7] = l0, y0[8] = v0, y0[9] = m0, y0[10] = p0, y0[11] = w0, y0[12] = M0, y0[13] = S0, y0[14] = A0, y0[15] = x0, y0;
              }
              function d(a, y, Y, H, e0, a0, h0, l0, v0, m0, p0, w0, M0, S0, A0, x0, y0) {
                return a[0] = y, a[1] = Y, a[2] = H, a[3] = e0, a[4] = a0, a[5] = h0, a[6] = l0, a[7] = v0, a[8] = m0, a[9] = p0, a[10] = w0, a[11] = M0, a[12] = S0, a[13] = A0, a[14] = x0, a[15] = y0, a;
              }
              function _(a) {
                return a[0] = 1, a[1] = 0, a[2] = 0, a[3] = 0, a[4] = 0, a[5] = 1, a[6] = 0, a[7] = 0, a[8] = 0, a[9] = 0, a[10] = 1, a[11] = 0, a[12] = 0, a[13] = 0, a[14] = 0, a[15] = 1, a;
              }
              function D(a, y) {
                if (a === y) {
                  var Y = y[1], H = y[2], e0 = y[3], a0 = y[6], h0 = y[7], l0 = y[11];
                  a[1] = y[4], a[2] = y[8], a[3] = y[12], a[4] = Y, a[6] = y[9], a[7] = y[13], a[8] = H, a[9] = a0, a[11] = y[14], a[12] = e0, a[13] = h0, a[14] = l0;
                } else
                  a[0] = y[0], a[1] = y[4], a[2] = y[8], a[3] = y[12], a[4] = y[1], a[5] = y[5], a[6] = y[9], a[7] = y[13], a[8] = y[2], a[9] = y[6], a[10] = y[10], a[11] = y[14], a[12] = y[3], a[13] = y[7], a[14] = y[11], a[15] = y[15];
                return a;
              }
              function q(a, y) {
                var Y = y[0], H = y[1], e0 = y[2], a0 = y[3], h0 = y[4], l0 = y[5], v0 = y[6], m0 = y[7], p0 = y[8], w0 = y[9], M0 = y[10], S0 = y[11], A0 = y[12], x0 = y[13], y0 = y[14], b0 = y[15], B0 = Y * l0 - H * h0, F0 = Y * v0 - e0 * h0, E0 = Y * m0 - a0 * h0, P0 = H * v0 - e0 * l0, T0 = H * m0 - a0 * l0, z0 = e0 * m0 - a0 * v0, L0 = p0 * x0 - w0 * A0, q0 = p0 * y0 - M0 * A0, k0 = p0 * b0 - S0 * A0, O0 = w0 * y0 - M0 * x0, N0 = w0 * b0 - S0 * x0, j0 = M0 * b0 - S0 * y0, R0 = B0 * j0 - F0 * N0 + E0 * O0 + P0 * k0 - T0 * q0 + z0 * L0;
                return R0 ? (R0 = 1 / R0, a[0] = (l0 * j0 - v0 * N0 + m0 * O0) * R0, a[1] = (e0 * N0 - H * j0 - a0 * O0) * R0, a[2] = (x0 * z0 - y0 * T0 + b0 * P0) * R0, a[3] = (M0 * T0 - w0 * z0 - S0 * P0) * R0, a[4] = (v0 * k0 - h0 * j0 - m0 * q0) * R0, a[5] = (Y * j0 - e0 * k0 + a0 * q0) * R0, a[6] = (y0 * E0 - A0 * z0 - b0 * F0) * R0, a[7] = (p0 * z0 - M0 * E0 + S0 * F0) * R0, a[8] = (h0 * N0 - l0 * k0 + m0 * L0) * R0, a[9] = (H * k0 - Y * N0 - a0 * L0) * R0, a[10] = (A0 * T0 - x0 * E0 + b0 * B0) * R0, a[11] = (w0 * E0 - p0 * T0 - S0 * B0) * R0, a[12] = (l0 * q0 - h0 * O0 - v0 * L0) * R0, a[13] = (Y * O0 - H * q0 + e0 * L0) * R0, a[14] = (x0 * F0 - A0 * P0 - y0 * B0) * R0, a[15] = (p0 * P0 - w0 * F0 + M0 * B0) * R0, a) : null;
              }
              function F(a, y) {
                var Y = y[0], H = y[1], e0 = y[2], a0 = y[3], h0 = y[4], l0 = y[5], v0 = y[6], m0 = y[7], p0 = y[8], w0 = y[9], M0 = y[10], S0 = y[11], A0 = y[12], x0 = y[13], y0 = y[14], b0 = y[15];
                return a[0] = l0 * (M0 * b0 - S0 * y0) - w0 * (v0 * b0 - m0 * y0) + x0 * (v0 * S0 - m0 * M0), a[1] = -(H * (M0 * b0 - S0 * y0) - w0 * (e0 * b0 - a0 * y0) + x0 * (e0 * S0 - a0 * M0)), a[2] = H * (v0 * b0 - m0 * y0) - l0 * (e0 * b0 - a0 * y0) + x0 * (e0 * m0 - a0 * v0), a[3] = -(H * (v0 * S0 - m0 * M0) - l0 * (e0 * S0 - a0 * M0) + w0 * (e0 * m0 - a0 * v0)), a[4] = -(h0 * (M0 * b0 - S0 * y0) - p0 * (v0 * b0 - m0 * y0) + A0 * (v0 * S0 - m0 * M0)), a[5] = Y * (M0 * b0 - S0 * y0) - p0 * (e0 * b0 - a0 * y0) + A0 * (e0 * S0 - a0 * M0), a[6] = -(Y * (v0 * b0 - m0 * y0) - h0 * (e0 * b0 - a0 * y0) + A0 * (e0 * m0 - a0 * v0)), a[7] = Y * (v0 * S0 - m0 * M0) - h0 * (e0 * S0 - a0 * M0) + p0 * (e0 * m0 - a0 * v0), a[8] = h0 * (w0 * b0 - S0 * x0) - p0 * (l0 * b0 - m0 * x0) + A0 * (l0 * S0 - m0 * w0), a[9] = -(Y * (w0 * b0 - S0 * x0) - p0 * (H * b0 - a0 * x0) + A0 * (H * S0 - a0 * w0)), a[10] = Y * (l0 * b0 - m0 * x0) - h0 * (H * b0 - a0 * x0) + A0 * (H * m0 - a0 * l0), a[11] = -(Y * (l0 * S0 - m0 * w0) - h0 * (H * S0 - a0 * w0) + p0 * (H * m0 - a0 * l0)), a[12] = -(h0 * (w0 * y0 - M0 * x0) - p0 * (l0 * y0 - v0 * x0) + A0 * (l0 * M0 - v0 * w0)), a[13] = Y * (w0 * y0 - M0 * x0) - p0 * (H * y0 - e0 * x0) + A0 * (H * M0 - e0 * w0), a[14] = -(Y * (l0 * y0 - v0 * x0) - h0 * (H * y0 - e0 * x0) + A0 * (H * v0 - e0 * l0)), a[15] = Y * (l0 * M0 - v0 * w0) - h0 * (H * M0 - e0 * w0) + p0 * (H * v0 - e0 * l0), a;
              }
              function x(a) {
                var y = a[0], Y = a[1], H = a[2], e0 = a[3], a0 = a[4], h0 = a[5], l0 = a[6], v0 = a[7], m0 = a[8], p0 = a[9], w0 = a[10], M0 = a[11], S0 = a[12], A0 = a[13], x0 = a[14], y0 = a[15], b0 = y * h0 - Y * a0, B0 = y * l0 - H * a0, F0 = y * v0 - e0 * a0, E0 = Y * l0 - H * h0, P0 = Y * v0 - e0 * h0, T0 = H * v0 - e0 * l0, z0 = m0 * A0 - p0 * S0, L0 = m0 * x0 - w0 * S0, q0 = m0 * y0 - M0 * S0, k0 = p0 * x0 - w0 * A0, O0 = p0 * y0 - M0 * A0, N0 = w0 * y0 - M0 * x0;
                return b0 * N0 - B0 * O0 + F0 * k0 + E0 * q0 - P0 * L0 + T0 * z0;
              }
              function N(a, y, Y) {
                var H = y[0], e0 = y[1], a0 = y[2], h0 = y[3], l0 = y[4], v0 = y[5], m0 = y[6], p0 = y[7], w0 = y[8], M0 = y[9], S0 = y[10], A0 = y[11], x0 = y[12], y0 = y[13], b0 = y[14], B0 = y[15], F0 = Y[0], E0 = Y[1], P0 = Y[2], T0 = Y[3];
                return a[0] = F0 * H + E0 * l0 + P0 * w0 + T0 * x0, a[1] = F0 * e0 + E0 * v0 + P0 * M0 + T0 * y0, a[2] = F0 * a0 + E0 * m0 + P0 * S0 + T0 * b0, a[3] = F0 * h0 + E0 * p0 + P0 * A0 + T0 * B0, F0 = Y[4], E0 = Y[5], P0 = Y[6], T0 = Y[7], a[4] = F0 * H + E0 * l0 + P0 * w0 + T0 * x0, a[5] = F0 * e0 + E0 * v0 + P0 * M0 + T0 * y0, a[6] = F0 * a0 + E0 * m0 + P0 * S0 + T0 * b0, a[7] = F0 * h0 + E0 * p0 + P0 * A0 + T0 * B0, F0 = Y[8], E0 = Y[9], P0 = Y[10], T0 = Y[11], a[8] = F0 * H + E0 * l0 + P0 * w0 + T0 * x0, a[9] = F0 * e0 + E0 * v0 + P0 * M0 + T0 * y0, a[10] = F0 * a0 + E0 * m0 + P0 * S0 + T0 * b0, a[11] = F0 * h0 + E0 * p0 + P0 * A0 + T0 * B0, F0 = Y[12], E0 = Y[13], P0 = Y[14], T0 = Y[15], a[12] = F0 * H + E0 * l0 + P0 * w0 + T0 * x0, a[13] = F0 * e0 + E0 * v0 + P0 * M0 + T0 * y0, a[14] = F0 * a0 + E0 * m0 + P0 * S0 + T0 * b0, a[15] = F0 * h0 + E0 * p0 + P0 * A0 + T0 * B0, a;
              }
              function R(a, y, Y) {
                var H = Y[0], e0 = Y[1], a0 = Y[2], h0 = void 0, l0 = void 0, v0 = void 0, m0 = void 0, p0 = void 0, w0 = void 0, M0 = void 0, S0 = void 0, A0 = void 0, x0 = void 0, y0 = void 0, b0 = void 0;
                return y === a ? (a[12] = y[0] * H + y[4] * e0 + y[8] * a0 + y[12], a[13] = y[1] * H + y[5] * e0 + y[9] * a0 + y[13], a[14] = y[2] * H + y[6] * e0 + y[10] * a0 + y[14], a[15] = y[3] * H + y[7] * e0 + y[11] * a0 + y[15]) : (h0 = y[0], l0 = y[1], v0 = y[2], m0 = y[3], p0 = y[4], w0 = y[5], M0 = y[6], S0 = y[7], A0 = y[8], x0 = y[9], y0 = y[10], b0 = y[11], a[0] = h0, a[1] = l0, a[2] = v0, a[3] = m0, a[4] = p0, a[5] = w0, a[6] = M0, a[7] = S0, a[8] = A0, a[9] = x0, a[10] = y0, a[11] = b0, a[12] = h0 * H + p0 * e0 + A0 * a0 + y[12], a[13] = l0 * H + w0 * e0 + x0 * a0 + y[13], a[14] = v0 * H + M0 * e0 + y0 * a0 + y[14], a[15] = m0 * H + S0 * e0 + b0 * a0 + y[15]), a;
              }
              function I(a, y, Y) {
                var H = Y[0], e0 = Y[1], a0 = Y[2];
                return a[0] = y[0] * H, a[1] = y[1] * H, a[2] = y[2] * H, a[3] = y[3] * H, a[4] = y[4] * e0, a[5] = y[5] * e0, a[6] = y[6] * e0, a[7] = y[7] * e0, a[8] = y[8] * a0, a[9] = y[9] * a0, a[10] = y[10] * a0, a[11] = y[11] * a0, a[12] = y[12], a[13] = y[13], a[14] = y[14], a[15] = y[15], a;
              }
              function u(a, y, Y, H) {
                var e0 = H[0], a0 = H[1], h0 = H[2], l0 = Math.sqrt(e0 * e0 + a0 * a0 + h0 * h0), v0 = void 0, m0 = void 0, p0 = void 0, w0 = void 0, M0 = void 0, S0 = void 0, A0 = void 0, x0 = void 0, y0 = void 0, b0 = void 0, B0 = void 0, F0 = void 0, E0 = void 0, P0 = void 0, T0 = void 0, z0 = void 0, L0 = void 0, q0 = void 0, k0 = void 0, O0 = void 0, N0 = void 0, j0 = void 0, R0 = void 0, I0 = void 0;
                return Math.abs(l0) < h.EPSILON ? null : (l0 = 1 / l0, e0 *= l0, a0 *= l0, h0 *= l0, v0 = Math.sin(Y), m0 = Math.cos(Y), p0 = 1 - m0, w0 = y[0], M0 = y[1], S0 = y[2], A0 = y[3], x0 = y[4], y0 = y[5], b0 = y[6], B0 = y[7], F0 = y[8], E0 = y[9], P0 = y[10], T0 = y[11], z0 = e0 * e0 * p0 + m0, L0 = a0 * e0 * p0 + h0 * v0, q0 = h0 * e0 * p0 - a0 * v0, k0 = e0 * a0 * p0 - h0 * v0, O0 = a0 * a0 * p0 + m0, N0 = h0 * a0 * p0 + e0 * v0, j0 = e0 * h0 * p0 + a0 * v0, R0 = a0 * h0 * p0 - e0 * v0, I0 = h0 * h0 * p0 + m0, a[0] = w0 * z0 + x0 * L0 + F0 * q0, a[1] = M0 * z0 + y0 * L0 + E0 * q0, a[2] = S0 * z0 + b0 * L0 + P0 * q0, a[3] = A0 * z0 + B0 * L0 + T0 * q0, a[4] = w0 * k0 + x0 * O0 + F0 * N0, a[5] = M0 * k0 + y0 * O0 + E0 * N0, a[6] = S0 * k0 + b0 * O0 + P0 * N0, a[7] = A0 * k0 + B0 * O0 + T0 * N0, a[8] = w0 * j0 + x0 * R0 + F0 * I0, a[9] = M0 * j0 + y0 * R0 + E0 * I0, a[10] = S0 * j0 + b0 * R0 + P0 * I0, a[11] = A0 * j0 + B0 * R0 + T0 * I0, y !== a && (a[12] = y[12], a[13] = y[13], a[14] = y[14], a[15] = y[15]), a);
              }
              function b(a, y, Y) {
                var H = Math.sin(Y), e0 = Math.cos(Y), a0 = y[4], h0 = y[5], l0 = y[6], v0 = y[7], m0 = y[8], p0 = y[9], w0 = y[10], M0 = y[11];
                return y !== a && (a[0] = y[0], a[1] = y[1], a[2] = y[2], a[3] = y[3], a[12] = y[12], a[13] = y[13], a[14] = y[14], a[15] = y[15]), a[4] = a0 * e0 + m0 * H, a[5] = h0 * e0 + p0 * H, a[6] = l0 * e0 + w0 * H, a[7] = v0 * e0 + M0 * H, a[8] = m0 * e0 - a0 * H, a[9] = p0 * e0 - h0 * H, a[10] = w0 * e0 - l0 * H, a[11] = M0 * e0 - v0 * H, a;
              }
              function Z(a, y, Y) {
                var H = Math.sin(Y), e0 = Math.cos(Y), a0 = y[0], h0 = y[1], l0 = y[2], v0 = y[3], m0 = y[8], p0 = y[9], w0 = y[10], M0 = y[11];
                return y !== a && (a[4] = y[4], a[5] = y[5], a[6] = y[6], a[7] = y[7], a[12] = y[12], a[13] = y[13], a[14] = y[14], a[15] = y[15]), a[0] = a0 * e0 - m0 * H, a[1] = h0 * e0 - p0 * H, a[2] = l0 * e0 - w0 * H, a[3] = v0 * e0 - M0 * H, a[8] = a0 * H + m0 * e0, a[9] = h0 * H + p0 * e0, a[10] = l0 * H + w0 * e0, a[11] = v0 * H + M0 * e0, a;
              }
              function G(a, y, Y) {
                var H = Math.sin(Y), e0 = Math.cos(Y), a0 = y[0], h0 = y[1], l0 = y[2], v0 = y[3], m0 = y[4], p0 = y[5], w0 = y[6], M0 = y[7];
                return y !== a && (a[8] = y[8], a[9] = y[9], a[10] = y[10], a[11] = y[11], a[12] = y[12], a[13] = y[13], a[14] = y[14], a[15] = y[15]), a[0] = a0 * e0 + m0 * H, a[1] = h0 * e0 + p0 * H, a[2] = l0 * e0 + w0 * H, a[3] = v0 * e0 + M0 * H, a[4] = m0 * e0 - a0 * H, a[5] = p0 * e0 - h0 * H, a[6] = w0 * e0 - l0 * H, a[7] = M0 * e0 - v0 * H, a;
              }
              function J(a, y) {
                return a[0] = 1, a[1] = 0, a[2] = 0, a[3] = 0, a[4] = 0, a[5] = 1, a[6] = 0, a[7] = 0, a[8] = 0, a[9] = 0, a[10] = 1, a[11] = 0, a[12] = y[0], a[13] = y[1], a[14] = y[2], a[15] = 1, a;
              }
              function r0(a, y) {
                return a[0] = y[0], a[1] = 0, a[2] = 0, a[3] = 0, a[4] = 0, a[5] = y[1], a[6] = 0, a[7] = 0, a[8] = 0, a[9] = 0, a[10] = y[2], a[11] = 0, a[12] = 0, a[13] = 0, a[14] = 0, a[15] = 1, a;
              }
              function s0(a, y, Y) {
                var H = Y[0], e0 = Y[1], a0 = Y[2], h0 = Math.sqrt(H * H + e0 * e0 + a0 * a0), l0 = void 0, v0 = void 0, m0 = void 0;
                return Math.abs(h0) < h.EPSILON ? null : (h0 = 1 / h0, H *= h0, e0 *= h0, a0 *= h0, l0 = Math.sin(y), v0 = Math.cos(y), m0 = 1 - v0, a[0] = H * H * m0 + v0, a[1] = e0 * H * m0 + a0 * l0, a[2] = a0 * H * m0 - e0 * l0, a[3] = 0, a[4] = H * e0 * m0 - a0 * l0, a[5] = e0 * e0 * m0 + v0, a[6] = a0 * e0 * m0 + H * l0, a[7] = 0, a[8] = H * a0 * m0 + e0 * l0, a[9] = e0 * a0 * m0 - H * l0, a[10] = a0 * a0 * m0 + v0, a[11] = 0, a[12] = 0, a[13] = 0, a[14] = 0, a[15] = 1, a);
              }
              function C0(a, y) {
                var Y = Math.sin(y), H = Math.cos(y);
                return a[0] = 1, a[1] = 0, a[2] = 0, a[3] = 0, a[4] = 0, a[5] = H, a[6] = Y, a[7] = 0, a[8] = 0, a[9] = -Y, a[10] = H, a[11] = 0, a[12] = 0, a[13] = 0, a[14] = 0, a[15] = 1, a;
              }
              function _0(a, y) {
                var Y = Math.sin(y), H = Math.cos(y);
                return a[0] = H, a[1] = 0, a[2] = -Y, a[3] = 0, a[4] = 0, a[5] = 1, a[6] = 0, a[7] = 0, a[8] = Y, a[9] = 0, a[10] = H, a[11] = 0, a[12] = 0, a[13] = 0, a[14] = 0, a[15] = 1, a;
              }
              function D0(a, y) {
                var Y = Math.sin(y), H = Math.cos(y);
                return a[0] = H, a[1] = Y, a[2] = 0, a[3] = 0, a[4] = -Y, a[5] = H, a[6] = 0, a[7] = 0, a[8] = 0, a[9] = 0, a[10] = 1, a[11] = 0, a[12] = 0, a[13] = 0, a[14] = 0, a[15] = 1, a;
              }
              function j(a, y, Y) {
                var H = y[0], e0 = y[1], a0 = y[2], h0 = y[3], l0 = H + H, v0 = e0 + e0, m0 = a0 + a0, p0 = H * l0, w0 = H * v0, M0 = H * m0, S0 = e0 * v0, A0 = e0 * m0, x0 = a0 * m0, y0 = h0 * l0, b0 = h0 * v0, B0 = h0 * m0;
                return a[0] = 1 - (S0 + x0), a[1] = w0 + B0, a[2] = M0 - b0, a[3] = 0, a[4] = w0 - B0, a[5] = 1 - (p0 + x0), a[6] = A0 + y0, a[7] = 0, a[8] = M0 + b0, a[9] = A0 - y0, a[10] = 1 - (p0 + S0), a[11] = 0, a[12] = Y[0], a[13] = Y[1], a[14] = Y[2], a[15] = 1, a;
              }
              function M(a, y) {
                return a[0] = y[12], a[1] = y[13], a[2] = y[14], a;
              }
              function z(a, y) {
                var Y = y[0], H = y[1], e0 = y[2], a0 = y[4], h0 = y[5], l0 = y[6], v0 = y[8], m0 = y[9], p0 = y[10];
                return a[0] = Math.sqrt(Y * Y + H * H + e0 * e0), a[1] = Math.sqrt(a0 * a0 + h0 * h0 + l0 * l0), a[2] = Math.sqrt(v0 * v0 + m0 * m0 + p0 * p0), a;
              }
              function t0(a, y) {
                var Y = y[0] + y[5] + y[10], H = 0;
                return Y > 0 ? (H = Math.sqrt(Y + 1) * 2, a[3] = 0.25 * H, a[0] = (y[6] - y[9]) / H, a[1] = (y[8] - y[2]) / H, a[2] = (y[1] - y[4]) / H) : y[0] > y[5] & y[0] > y[10] ? (H = Math.sqrt(1 + y[0] - y[5] - y[10]) * 2, a[3] = (y[6] - y[9]) / H, a[0] = 0.25 * H, a[1] = (y[1] + y[4]) / H, a[2] = (y[8] + y[2]) / H) : y[5] > y[10] ? (H = Math.sqrt(1 + y[5] - y[0] - y[10]) * 2, a[3] = (y[8] - y[2]) / H, a[0] = (y[1] + y[4]) / H, a[1] = 0.25 * H, a[2] = (y[6] + y[9]) / H) : (H = Math.sqrt(1 + y[10] - y[0] - y[5]) * 2, a[3] = (y[1] - y[4]) / H, a[0] = (y[8] + y[2]) / H, a[1] = (y[6] + y[9]) / H, a[2] = 0.25 * H), a;
              }
              function i0(a, y, Y, H) {
                var e0 = y[0], a0 = y[1], h0 = y[2], l0 = y[3], v0 = e0 + e0, m0 = a0 + a0, p0 = h0 + h0, w0 = e0 * v0, M0 = e0 * m0, S0 = e0 * p0, A0 = a0 * m0, x0 = a0 * p0, y0 = h0 * p0, b0 = l0 * v0, B0 = l0 * m0, F0 = l0 * p0, E0 = H[0], P0 = H[1], T0 = H[2];
                return a[0] = (1 - (A0 + y0)) * E0, a[1] = (M0 + F0) * E0, a[2] = (S0 - B0) * E0, a[3] = 0, a[4] = (M0 - F0) * P0, a[5] = (1 - (w0 + y0)) * P0, a[6] = (x0 + b0) * P0, a[7] = 0, a[8] = (S0 + B0) * T0, a[9] = (x0 - b0) * T0, a[10] = (1 - (w0 + A0)) * T0, a[11] = 0, a[12] = Y[0], a[13] = Y[1], a[14] = Y[2], a[15] = 1, a;
              }
              function c0(a, y, Y, H, e0) {
                var a0 = y[0], h0 = y[1], l0 = y[2], v0 = y[3], m0 = a0 + a0, p0 = h0 + h0, w0 = l0 + l0, M0 = a0 * m0, S0 = a0 * p0, A0 = a0 * w0, x0 = h0 * p0, y0 = h0 * w0, b0 = l0 * w0, B0 = v0 * m0, F0 = v0 * p0, E0 = v0 * w0, P0 = H[0], T0 = H[1], z0 = H[2], L0 = e0[0], q0 = e0[1], k0 = e0[2];
                return a[0] = (1 - (x0 + b0)) * P0, a[1] = (S0 + E0) * P0, a[2] = (A0 - F0) * P0, a[3] = 0, a[4] = (S0 - E0) * T0, a[5] = (1 - (M0 + b0)) * T0, a[6] = (y0 + B0) * T0, a[7] = 0, a[8] = (A0 + F0) * z0, a[9] = (y0 - B0) * z0, a[10] = (1 - (M0 + x0)) * z0, a[11] = 0, a[12] = Y[0] + L0 - (a[0] * L0 + a[4] * q0 + a[8] * k0), a[13] = Y[1] + q0 - (a[1] * L0 + a[5] * q0 + a[9] * k0), a[14] = Y[2] + k0 - (a[2] * L0 + a[6] * q0 + a[10] * k0), a[15] = 1, a;
              }
              function g0(a, y) {
                var Y = y[0], H = y[1], e0 = y[2], a0 = y[3], h0 = Y + Y, l0 = H + H, v0 = e0 + e0, m0 = Y * h0, p0 = H * h0, w0 = H * l0, M0 = e0 * h0, S0 = e0 * l0, A0 = e0 * v0, x0 = a0 * h0, y0 = a0 * l0, b0 = a0 * v0;
                return a[0] = 1 - w0 - A0, a[1] = p0 + b0, a[2] = M0 - y0, a[3] = 0, a[4] = p0 - b0, a[5] = 1 - m0 - A0, a[6] = S0 + x0, a[7] = 0, a[8] = M0 + y0, a[9] = S0 - x0, a[10] = 1 - m0 - w0, a[11] = 0, a[12] = 0, a[13] = 0, a[14] = 0, a[15] = 1, a;
              }
              function w(a, y, Y, H, e0, a0, h0) {
                var l0 = 1 / (Y - y), v0 = 1 / (e0 - H), m0 = 1 / (a0 - h0);
                return a[0] = a0 * 2 * l0, a[1] = 0, a[2] = 0, a[3] = 0, a[4] = 0, a[5] = a0 * 2 * v0, a[6] = 0, a[7] = 0, a[8] = (Y + y) * l0, a[9] = (e0 + H) * v0, a[10] = (h0 + a0) * m0, a[11] = -1, a[12] = 0, a[13] = 0, a[14] = h0 * a0 * 2 * m0, a[15] = 0, a;
              }
              function g(a, y, Y, H, e0) {
                var a0 = 1 / Math.tan(y / 2), h0 = 1 / (H - e0);
                return a[0] = a0 / Y, a[1] = 0, a[2] = 0, a[3] = 0, a[4] = 0, a[5] = a0, a[6] = 0, a[7] = 0, a[8] = 0, a[9] = 0, a[10] = (e0 + H) * h0, a[11] = -1, a[12] = 0, a[13] = 0, a[14] = 2 * e0 * H * h0, a[15] = 0, a;
              }
              function E(a, y, Y, H) {
                var e0 = Math.tan(y.upDegrees * Math.PI / 180), a0 = Math.tan(y.downDegrees * Math.PI / 180), h0 = Math.tan(y.leftDegrees * Math.PI / 180), l0 = Math.tan(y.rightDegrees * Math.PI / 180), v0 = 2 / (h0 + l0), m0 = 2 / (e0 + a0);
                return a[0] = v0, a[1] = 0, a[2] = 0, a[3] = 0, a[4] = 0, a[5] = m0, a[6] = 0, a[7] = 0, a[8] = -((h0 - l0) * v0 * 0.5), a[9] = (e0 - a0) * m0 * 0.5, a[10] = H / (Y - H), a[11] = -1, a[12] = 0, a[13] = 0, a[14] = H * Y / (Y - H), a[15] = 0, a;
              }
              function Q(a, y, Y, H, e0, a0, h0) {
                var l0 = 1 / (y - Y), v0 = 1 / (H - e0), m0 = 1 / (a0 - h0);
                return a[0] = -2 * l0, a[1] = 0, a[2] = 0, a[3] = 0, a[4] = 0, a[5] = -2 * v0, a[6] = 0, a[7] = 0, a[8] = 0, a[9] = 0, a[10] = 2 * m0, a[11] = 0, a[12] = (y + Y) * l0, a[13] = (e0 + H) * v0, a[14] = (h0 + a0) * m0, a[15] = 1, a;
              }
              function O(a, y, Y, H) {
                var e0 = void 0, a0 = void 0, h0 = void 0, l0 = void 0, v0 = void 0, m0 = void 0, p0 = void 0, w0 = void 0, M0 = void 0, S0 = void 0, A0 = y[0], x0 = y[1], y0 = y[2], b0 = H[0], B0 = H[1], F0 = H[2], E0 = Y[0], P0 = Y[1], T0 = Y[2];
                return Math.abs(A0 - E0) < h.EPSILON && Math.abs(x0 - P0) < h.EPSILON && Math.abs(y0 - T0) < h.EPSILON ? mat4.identity(a) : (p0 = A0 - E0, w0 = x0 - P0, M0 = y0 - T0, S0 = 1 / Math.sqrt(p0 * p0 + w0 * w0 + M0 * M0), p0 *= S0, w0 *= S0, M0 *= S0, e0 = B0 * M0 - F0 * w0, a0 = F0 * p0 - b0 * M0, h0 = b0 * w0 - B0 * p0, S0 = Math.sqrt(e0 * e0 + a0 * a0 + h0 * h0), S0 ? (S0 = 1 / S0, e0 *= S0, a0 *= S0, h0 *= S0) : (e0 = 0, a0 = 0, h0 = 0), l0 = w0 * h0 - M0 * a0, v0 = M0 * e0 - p0 * h0, m0 = p0 * a0 - w0 * e0, S0 = Math.sqrt(l0 * l0 + v0 * v0 + m0 * m0), S0 ? (S0 = 1 / S0, l0 *= S0, v0 *= S0, m0 *= S0) : (l0 = 0, v0 = 0, m0 = 0), a[0] = e0, a[1] = l0, a[2] = p0, a[3] = 0, a[4] = a0, a[5] = v0, a[6] = w0, a[7] = 0, a[8] = h0, a[9] = m0, a[10] = M0, a[11] = 0, a[12] = -(e0 * A0 + a0 * x0 + h0 * y0), a[13] = -(l0 * A0 + v0 * x0 + m0 * y0), a[14] = -(p0 * A0 + w0 * x0 + M0 * y0), a[15] = 1, a);
              }
              function X(a, y, Y, H) {
                var e0 = y[0], a0 = y[1], h0 = y[2], l0 = H[0], v0 = H[1], m0 = H[2], p0 = e0 - Y[0], w0 = a0 - Y[1], M0 = h0 - Y[2], S0 = p0 * p0 + w0 * w0 + M0 * M0;
                S0 > 0 && (S0 = 1 / Math.sqrt(S0), p0 *= S0, w0 *= S0, M0 *= S0);
                var A0 = v0 * M0 - m0 * w0, x0 = m0 * p0 - l0 * M0, y0 = l0 * w0 - v0 * p0;
                return a[0] = A0, a[1] = x0, a[2] = y0, a[3] = 0, a[4] = w0 * y0 - M0 * x0, a[5] = M0 * A0 - p0 * y0, a[6] = p0 * x0 - w0 * A0, a[7] = 0, a[8] = p0, a[9] = w0, a[10] = M0, a[11] = 0, a[12] = e0, a[13] = a0, a[14] = h0, a[15] = 1, a;
              }
              function $(a) {
                return "mat4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ", " + a[9] + ", " + a[10] + ", " + a[11] + ", " + a[12] + ", " + a[13] + ", " + a[14] + ", " + a[15] + ")";
              }
              function o0(a) {
                return Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2) + Math.pow(a[9], 2) + Math.pow(a[10], 2) + Math.pow(a[11], 2) + Math.pow(a[12], 2) + Math.pow(a[13], 2) + Math.pow(a[14], 2) + Math.pow(a[15], 2));
              }
              function d0(a, y, Y) {
                return a[0] = y[0] + Y[0], a[1] = y[1] + Y[1], a[2] = y[2] + Y[2], a[3] = y[3] + Y[3], a[4] = y[4] + Y[4], a[5] = y[5] + Y[5], a[6] = y[6] + Y[6], a[7] = y[7] + Y[7], a[8] = y[8] + Y[8], a[9] = y[9] + Y[9], a[10] = y[10] + Y[10], a[11] = y[11] + Y[11], a[12] = y[12] + Y[12], a[13] = y[13] + Y[13], a[14] = y[14] + Y[14], a[15] = y[15] + Y[15], a;
              }
              function L(a, y, Y) {
                return a[0] = y[0] - Y[0], a[1] = y[1] - Y[1], a[2] = y[2] - Y[2], a[3] = y[3] - Y[3], a[4] = y[4] - Y[4], a[5] = y[5] - Y[5], a[6] = y[6] - Y[6], a[7] = y[7] - Y[7], a[8] = y[8] - Y[8], a[9] = y[9] - Y[9], a[10] = y[10] - Y[10], a[11] = y[11] - Y[11], a[12] = y[12] - Y[12], a[13] = y[13] - Y[13], a[14] = y[14] - Y[14], a[15] = y[15] - Y[15], a;
              }
              function K(a, y, Y) {
                return a[0] = y[0] * Y, a[1] = y[1] * Y, a[2] = y[2] * Y, a[3] = y[3] * Y, a[4] = y[4] * Y, a[5] = y[5] * Y, a[6] = y[6] * Y, a[7] = y[7] * Y, a[8] = y[8] * Y, a[9] = y[9] * Y, a[10] = y[10] * Y, a[11] = y[11] * Y, a[12] = y[12] * Y, a[13] = y[13] * Y, a[14] = y[14] * Y, a[15] = y[15] * Y, a;
              }
              function n0(a, y, Y, H) {
                return a[0] = y[0] + Y[0] * H, a[1] = y[1] + Y[1] * H, a[2] = y[2] + Y[2] * H, a[3] = y[3] + Y[3] * H, a[4] = y[4] + Y[4] * H, a[5] = y[5] + Y[5] * H, a[6] = y[6] + Y[6] * H, a[7] = y[7] + Y[7] * H, a[8] = y[8] + Y[8] * H, a[9] = y[9] + Y[9] * H, a[10] = y[10] + Y[10] * H, a[11] = y[11] + Y[11] * H, a[12] = y[12] + Y[12] * H, a[13] = y[13] + Y[13] * H, a[14] = y[14] + Y[14] * H, a[15] = y[15] + Y[15] * H, a;
              }
              function f0(a, y) {
                return a[0] === y[0] && a[1] === y[1] && a[2] === y[2] && a[3] === y[3] && a[4] === y[4] && a[5] === y[5] && a[6] === y[6] && a[7] === y[7] && a[8] === y[8] && a[9] === y[9] && a[10] === y[10] && a[11] === y[11] && a[12] === y[12] && a[13] === y[13] && a[14] === y[14] && a[15] === y[15];
              }
              function u0(a, y) {
                var Y = a[0], H = a[1], e0 = a[2], a0 = a[3], h0 = a[4], l0 = a[5], v0 = a[6], m0 = a[7], p0 = a[8], w0 = a[9], M0 = a[10], S0 = a[11], A0 = a[12], x0 = a[13], y0 = a[14], b0 = a[15], B0 = y[0], F0 = y[1], E0 = y[2], P0 = y[3], T0 = y[4], z0 = y[5], L0 = y[6], q0 = y[7], k0 = y[8], O0 = y[9], N0 = y[10], j0 = y[11], R0 = y[12], I0 = y[13], V0 = y[14], G0 = y[15];
                return Math.abs(Y - B0) <= h.EPSILON * Math.max(1, Math.abs(Y), Math.abs(B0)) && Math.abs(H - F0) <= h.EPSILON * Math.max(1, Math.abs(H), Math.abs(F0)) && Math.abs(e0 - E0) <= h.EPSILON * Math.max(1, Math.abs(e0), Math.abs(E0)) && Math.abs(a0 - P0) <= h.EPSILON * Math.max(1, Math.abs(a0), Math.abs(P0)) && Math.abs(h0 - T0) <= h.EPSILON * Math.max(1, Math.abs(h0), Math.abs(T0)) && Math.abs(l0 - z0) <= h.EPSILON * Math.max(1, Math.abs(l0), Math.abs(z0)) && Math.abs(v0 - L0) <= h.EPSILON * Math.max(1, Math.abs(v0), Math.abs(L0)) && Math.abs(m0 - q0) <= h.EPSILON * Math.max(1, Math.abs(m0), Math.abs(q0)) && Math.abs(p0 - k0) <= h.EPSILON * Math.max(1, Math.abs(p0), Math.abs(k0)) && Math.abs(w0 - O0) <= h.EPSILON * Math.max(1, Math.abs(w0), Math.abs(O0)) && Math.abs(M0 - N0) <= h.EPSILON * Math.max(1, Math.abs(M0), Math.abs(N0)) && Math.abs(S0 - j0) <= h.EPSILON * Math.max(1, Math.abs(S0), Math.abs(j0)) && Math.abs(A0 - R0) <= h.EPSILON * Math.max(1, Math.abs(A0), Math.abs(R0)) && Math.abs(x0 - I0) <= h.EPSILON * Math.max(1, Math.abs(x0), Math.abs(I0)) && Math.abs(y0 - V0) <= h.EPSILON * Math.max(1, Math.abs(y0), Math.abs(V0)) && Math.abs(b0 - G0) <= h.EPSILON * Math.max(1, Math.abs(b0), Math.abs(G0));
              }
              r.mul = N, r.sub = L;
            },
            /* 8 */
            /***/
            function(s, r, c) {
              Object.defineProperty(r, "__esModule", {
                value: !0
              }), r.setAxes = r.sqlerp = r.rotationTo = r.equals = r.exactEquals = r.normalize = r.sqrLen = r.squaredLength = r.len = r.length = r.lerp = r.dot = r.scale = r.mul = r.add = r.set = r.copy = r.fromValues = r.clone = void 0, r.create = D, r.identity = q, r.setAxisAngle = F, r.getAxisAngle = x, r.multiply = N, r.rotateX = R, r.rotateY = I, r.rotateZ = u, r.calculateW = b, r.slerp = Z, r.invert = G, r.conjugate = J, r.fromMat3 = r0, r.fromEuler = s0, r.str = C0;
              var f = c(0), h = _(f), o = c(1), v = _(o), p = c(2), l = _(p), m = c(3), d = _(m);
              function _(M) {
                if (M && M.__esModule)
                  return M;
                var z = {};
                if (M != null)
                  for (var t0 in M)
                    Object.prototype.hasOwnProperty.call(M, t0) && (z[t0] = M[t0]);
                return z.default = M, z;
              }
              function D() {
                var M = new h.ARRAY_TYPE(4);
                return M[0] = 0, M[1] = 0, M[2] = 0, M[3] = 1, M;
              }
              function q(M) {
                return M[0] = 0, M[1] = 0, M[2] = 0, M[3] = 1, M;
              }
              function F(M, z, t0) {
                t0 = t0 * 0.5;
                var i0 = Math.sin(t0);
                return M[0] = i0 * z[0], M[1] = i0 * z[1], M[2] = i0 * z[2], M[3] = Math.cos(t0), M;
              }
              function x(M, z) {
                var t0 = Math.acos(z[3]) * 2, i0 = Math.sin(t0 / 2);
                return i0 != 0 ? (M[0] = z[0] / i0, M[1] = z[1] / i0, M[2] = z[2] / i0) : (M[0] = 1, M[1] = 0, M[2] = 0), t0;
              }
              function N(M, z, t0) {
                var i0 = z[0], c0 = z[1], g0 = z[2], w = z[3], g = t0[0], E = t0[1], Q = t0[2], O = t0[3];
                return M[0] = i0 * O + w * g + c0 * Q - g0 * E, M[1] = c0 * O + w * E + g0 * g - i0 * Q, M[2] = g0 * O + w * Q + i0 * E - c0 * g, M[3] = w * O - i0 * g - c0 * E - g0 * Q, M;
              }
              function R(M, z, t0) {
                t0 *= 0.5;
                var i0 = z[0], c0 = z[1], g0 = z[2], w = z[3], g = Math.sin(t0), E = Math.cos(t0);
                return M[0] = i0 * E + w * g, M[1] = c0 * E + g0 * g, M[2] = g0 * E - c0 * g, M[3] = w * E - i0 * g, M;
              }
              function I(M, z, t0) {
                t0 *= 0.5;
                var i0 = z[0], c0 = z[1], g0 = z[2], w = z[3], g = Math.sin(t0), E = Math.cos(t0);
                return M[0] = i0 * E - g0 * g, M[1] = c0 * E + w * g, M[2] = g0 * E + i0 * g, M[3] = w * E - c0 * g, M;
              }
              function u(M, z, t0) {
                t0 *= 0.5;
                var i0 = z[0], c0 = z[1], g0 = z[2], w = z[3], g = Math.sin(t0), E = Math.cos(t0);
                return M[0] = i0 * E + c0 * g, M[1] = c0 * E - i0 * g, M[2] = g0 * E + w * g, M[3] = w * E - g0 * g, M;
              }
              function b(M, z) {
                var t0 = z[0], i0 = z[1], c0 = z[2];
                return M[0] = t0, M[1] = i0, M[2] = c0, M[3] = Math.sqrt(Math.abs(1 - t0 * t0 - i0 * i0 - c0 * c0)), M;
              }
              function Z(M, z, t0, i0) {
                var c0 = z[0], g0 = z[1], w = z[2], g = z[3], E = t0[0], Q = t0[1], O = t0[2], X = t0[3], $ = void 0, o0 = void 0, d0 = void 0, L = void 0, K = void 0;
                return o0 = c0 * E + g0 * Q + w * O + g * X, o0 < 0 && (o0 = -o0, E = -E, Q = -Q, O = -O, X = -X), 1 - o0 > 1e-6 ? ($ = Math.acos(o0), d0 = Math.sin($), L = Math.sin((1 - i0) * $) / d0, K = Math.sin(i0 * $) / d0) : (L = 1 - i0, K = i0), M[0] = L * c0 + K * E, M[1] = L * g0 + K * Q, M[2] = L * w + K * O, M[3] = L * g + K * X, M;
              }
              function G(M, z) {
                var t0 = z[0], i0 = z[1], c0 = z[2], g0 = z[3], w = t0 * t0 + i0 * i0 + c0 * c0 + g0 * g0, g = w ? 1 / w : 0;
                return M[0] = -t0 * g, M[1] = -i0 * g, M[2] = -c0 * g, M[3] = g0 * g, M;
              }
              function J(M, z) {
                return M[0] = -z[0], M[1] = -z[1], M[2] = -z[2], M[3] = z[3], M;
              }
              function r0(M, z) {
                var t0 = z[0] + z[4] + z[8], i0 = void 0;
                if (t0 > 0)
                  i0 = Math.sqrt(t0 + 1), M[3] = 0.5 * i0, i0 = 0.5 / i0, M[0] = (z[5] - z[7]) * i0, M[1] = (z[6] - z[2]) * i0, M[2] = (z[1] - z[3]) * i0;
                else {
                  var c0 = 0;
                  z[4] > z[0] && (c0 = 1), z[8] > z[c0 * 3 + c0] && (c0 = 2);
                  var g0 = (c0 + 1) % 3, w = (c0 + 2) % 3;
                  i0 = Math.sqrt(z[c0 * 3 + c0] - z[g0 * 3 + g0] - z[w * 3 + w] + 1), M[c0] = 0.5 * i0, i0 = 0.5 / i0, M[3] = (z[g0 * 3 + w] - z[w * 3 + g0]) * i0, M[g0] = (z[g0 * 3 + c0] + z[c0 * 3 + g0]) * i0, M[w] = (z[w * 3 + c0] + z[c0 * 3 + w]) * i0;
                }
                return M;
              }
              function s0(M, z, t0, i0) {
                var c0 = 0.5 * Math.PI / 180;
                z *= c0, t0 *= c0, i0 *= c0;
                var g0 = Math.sin(z), w = Math.cos(z), g = Math.sin(t0), E = Math.cos(t0), Q = Math.sin(i0), O = Math.cos(i0);
                return M[0] = g0 * E * O - w * g * Q, M[1] = w * g * O + g0 * E * Q, M[2] = w * E * Q - g0 * g * O, M[3] = w * E * O + g0 * g * Q, M;
              }
              function C0(M) {
                return "quat(" + M[0] + ", " + M[1] + ", " + M[2] + ", " + M[3] + ")";
              }
              r.clone = d.clone, r.fromValues = d.fromValues, r.copy = d.copy, r.set = d.set, r.add = d.add, r.mul = N, r.scale = d.scale, r.dot = d.dot, r.lerp = d.lerp;
              var _0 = r.length = d.length;
              r.len = _0;
              var D0 = r.squaredLength = d.squaredLength;
              r.sqrLen = D0;
              var j = r.normalize = d.normalize;
              r.exactEquals = d.exactEquals, r.equals = d.equals, r.rotationTo = function() {
                var M = l.create(), z = l.fromValues(1, 0, 0), t0 = l.fromValues(0, 1, 0);
                return function(i0, c0, g0) {
                  var w = l.dot(c0, g0);
                  return w < -0.999999 ? (l.cross(M, z, c0), l.len(M) < 1e-6 && l.cross(M, t0, c0), l.normalize(M, M), F(i0, M, Math.PI), i0) : w > 0.999999 ? (i0[0] = 0, i0[1] = 0, i0[2] = 0, i0[3] = 1, i0) : (l.cross(M, c0, g0), i0[0] = M[0], i0[1] = M[1], i0[2] = M[2], i0[3] = 1 + w, j(i0, i0));
                };
              }(), r.sqlerp = function() {
                var M = D(), z = D();
                return function(t0, i0, c0, g0, w, g) {
                  return Z(M, i0, w, g), Z(z, c0, g0, g), Z(t0, M, z, 2 * g * (1 - g)), t0;
                };
              }(), r.setAxes = function() {
                var M = v.create();
                return function(z, t0, i0, c0) {
                  return M[0] = i0[0], M[3] = i0[1], M[6] = i0[2], M[1] = c0[0], M[4] = c0[1], M[7] = c0[2], M[2] = -t0[0], M[5] = -t0[1], M[8] = -t0[2], j(z, r0(z, M));
                };
              }();
            },
            /* 9 */
            /***/
            function(s, r, c) {
              Object.defineProperty(r, "__esModule", {
                value: !0
              }), r.forEach = r.sqrLen = r.sqrDist = r.dist = r.div = r.mul = r.sub = r.len = void 0, r.create = v, r.clone = p, r.fromValues = l, r.copy = m, r.set = d, r.add = _, r.subtract = D, r.multiply = q, r.divide = F, r.ceil = x, r.floor = N, r.min = R, r.max = I, r.round = u, r.scale = b, r.scaleAndAdd = Z, r.distance = G, r.squaredDistance = J, r.length = r0, r.squaredLength = s0, r.negate = C0, r.inverse = _0, r.normalize = D0, r.dot = j, r.cross = M, r.lerp = z, r.random = t0, r.transformMat2 = i0, r.transformMat2d = c0, r.transformMat3 = g0, r.transformMat4 = w, r.str = g, r.exactEquals = E, r.equals = Q;
              var f = c(0), h = o(f);
              function o(O) {
                if (O && O.__esModule)
                  return O;
                var X = {};
                if (O != null)
                  for (var $ in O)
                    Object.prototype.hasOwnProperty.call(O, $) && (X[$] = O[$]);
                return X.default = O, X;
              }
              function v() {
                var O = new h.ARRAY_TYPE(2);
                return O[0] = 0, O[1] = 0, O;
              }
              function p(O) {
                var X = new h.ARRAY_TYPE(2);
                return X[0] = O[0], X[1] = O[1], X;
              }
              function l(O, X) {
                var $ = new h.ARRAY_TYPE(2);
                return $[0] = O, $[1] = X, $;
              }
              function m(O, X) {
                return O[0] = X[0], O[1] = X[1], O;
              }
              function d(O, X, $) {
                return O[0] = X, O[1] = $, O;
              }
              function _(O, X, $) {
                return O[0] = X[0] + $[0], O[1] = X[1] + $[1], O;
              }
              function D(O, X, $) {
                return O[0] = X[0] - $[0], O[1] = X[1] - $[1], O;
              }
              function q(O, X, $) {
                return O[0] = X[0] * $[0], O[1] = X[1] * $[1], O;
              }
              function F(O, X, $) {
                return O[0] = X[0] / $[0], O[1] = X[1] / $[1], O;
              }
              function x(O, X) {
                return O[0] = Math.ceil(X[0]), O[1] = Math.ceil(X[1]), O;
              }
              function N(O, X) {
                return O[0] = Math.floor(X[0]), O[1] = Math.floor(X[1]), O;
              }
              function R(O, X, $) {
                return O[0] = Math.min(X[0], $[0]), O[1] = Math.min(X[1], $[1]), O;
              }
              function I(O, X, $) {
                return O[0] = Math.max(X[0], $[0]), O[1] = Math.max(X[1], $[1]), O;
              }
              function u(O, X) {
                return O[0] = Math.round(X[0]), O[1] = Math.round(X[1]), O;
              }
              function b(O, X, $) {
                return O[0] = X[0] * $, O[1] = X[1] * $, O;
              }
              function Z(O, X, $, o0) {
                return O[0] = X[0] + $[0] * o0, O[1] = X[1] + $[1] * o0, O;
              }
              function G(O, X) {
                var $ = X[0] - O[0], o0 = X[1] - O[1];
                return Math.sqrt($ * $ + o0 * o0);
              }
              function J(O, X) {
                var $ = X[0] - O[0], o0 = X[1] - O[1];
                return $ * $ + o0 * o0;
              }
              function r0(O) {
                var X = O[0], $ = O[1];
                return Math.sqrt(X * X + $ * $);
              }
              function s0(O) {
                var X = O[0], $ = O[1];
                return X * X + $ * $;
              }
              function C0(O, X) {
                return O[0] = -X[0], O[1] = -X[1], O;
              }
              function _0(O, X) {
                return O[0] = 1 / X[0], O[1] = 1 / X[1], O;
              }
              function D0(O, X) {
                var $ = X[0], o0 = X[1], d0 = $ * $ + o0 * o0;
                return d0 > 0 && (d0 = 1 / Math.sqrt(d0), O[0] = X[0] * d0, O[1] = X[1] * d0), O;
              }
              function j(O, X) {
                return O[0] * X[0] + O[1] * X[1];
              }
              function M(O, X, $) {
                var o0 = X[0] * $[1] - X[1] * $[0];
                return O[0] = O[1] = 0, O[2] = o0, O;
              }
              function z(O, X, $, o0) {
                var d0 = X[0], L = X[1];
                return O[0] = d0 + o0 * ($[0] - d0), O[1] = L + o0 * ($[1] - L), O;
              }
              function t0(O, X) {
                X = X || 1;
                var $ = h.RANDOM() * 2 * Math.PI;
                return O[0] = Math.cos($) * X, O[1] = Math.sin($) * X, O;
              }
              function i0(O, X, $) {
                var o0 = X[0], d0 = X[1];
                return O[0] = $[0] * o0 + $[2] * d0, O[1] = $[1] * o0 + $[3] * d0, O;
              }
              function c0(O, X, $) {
                var o0 = X[0], d0 = X[1];
                return O[0] = $[0] * o0 + $[2] * d0 + $[4], O[1] = $[1] * o0 + $[3] * d0 + $[5], O;
              }
              function g0(O, X, $) {
                var o0 = X[0], d0 = X[1];
                return O[0] = $[0] * o0 + $[3] * d0 + $[6], O[1] = $[1] * o0 + $[4] * d0 + $[7], O;
              }
              function w(O, X, $) {
                var o0 = X[0], d0 = X[1];
                return O[0] = $[0] * o0 + $[4] * d0 + $[12], O[1] = $[1] * o0 + $[5] * d0 + $[13], O;
              }
              function g(O) {
                return "vec2(" + O[0] + ", " + O[1] + ")";
              }
              function E(O, X) {
                return O[0] === X[0] && O[1] === X[1];
              }
              function Q(O, X) {
                var $ = O[0], o0 = O[1], d0 = X[0], L = X[1];
                return Math.abs($ - d0) <= h.EPSILON * Math.max(1, Math.abs($), Math.abs(d0)) && Math.abs(o0 - L) <= h.EPSILON * Math.max(1, Math.abs(o0), Math.abs(L));
              }
              r.len = r0, r.sub = D, r.mul = q, r.div = F, r.dist = G, r.sqrDist = J, r.sqrLen = s0, r.forEach = function() {
                var O = v();
                return function(X, $, o0, d0, L, K) {
                  var n0 = void 0, f0 = void 0;
                  for ($ || ($ = 2), o0 || (o0 = 0), d0 ? f0 = Math.min(d0 * $ + o0, X.length) : f0 = X.length, n0 = o0; n0 < f0; n0 += $)
                    O[0] = X[n0], O[1] = X[n0 + 1], L(O, O, K), X[n0] = O[0], X[n0 + 1] = O[1];
                  return X;
                };
              }();
            }
            /******/
          ])
        );
      });
    }, {}], 9: [function(n, e, i) {
      /**
       * AUTHOR OF INITIAL JS LIBRARY
       * k-d Tree JavaScript - V 1.0
       *
       * https://github.com/ubilabs/kd-tree-javascript
       *
       * @author Mircea Pricop <pricop@ubilabs.net>, 2012
       * @author Martin Kleppe <kleppe@ubilabs.net>, 2012
       * @author Ubilabs http://ubilabs.net, 2012
       * @license MIT License <http://www.opensource.org/licenses/mit-license.php>
       */
      function s(f, h, o) {
        this.obj = f, this.left = null, this.right = null, this.parent = o, this.dimension = h;
      }
      function r(f, h, o) {
        var v = this;
        function p(l, m, d) {
          var _ = m % o.length, D, q;
          return l.length === 0 ? null : l.length === 1 ? new s(l[0], _, d) : (l.sort(function(F, x) {
            return F[o[_]] - x[o[_]];
          }), D = Math.floor(l.length / 2), q = new s(l[D], _, d), q.left = p(l.slice(0, D), m + 1, q), q.right = p(l.slice(D + 1), m + 1, q), q);
        }
        this.root = p(f, 0, null), this.insert = function(l) {
          function m(q, F) {
            if (q === null)
              return F;
            var x = o[q.dimension];
            return l[x] < q.obj[x] ? m(q.left, q) : m(q.right, q);
          }
          var d = m(this.root, null), _, D;
          if (d === null) {
            this.root = new s(l, 0, null);
            return;
          }
          _ = new s(l, (d.dimension + 1) % o.length, d), D = o[d.dimension], l[D] < d.obj[D] ? d.left = _ : d.right = _;
        }, this.remove = function(l) {
          var m;
          function d(D) {
            if (D === null)
              return null;
            if (D.obj === l)
              return D;
            var q = o[D.dimension];
            return l[q] < D.obj[q] ? d(D.left) : d(D.right);
          }
          function _(D) {
            var q, F, x;
            function N(I, u) {
              var b, Z, G, J, r0;
              return I === null ? null : (b = o[u], I.dimension === u ? I.right !== null ? N(I.right, u) : I : (Z = I.obj[b], G = N(I.left, u), J = N(I.right, u), r0 = I, G !== null && G.obj[b] > Z && (r0 = G), J !== null && J.obj[b] > r0.obj[b] && (r0 = J), r0));
            }
            function R(I, u) {
              var b, Z, G, J, r0;
              return I === null ? null : (b = o[u], I.dimension === u ? I.left !== null ? R(I.left, u) : I : (Z = I.obj[b], G = R(I.left, u), J = R(I.right, u), r0 = I, G !== null && G.obj[b] < Z && (r0 = G), J !== null && J.obj[b] < r0.obj[b] && (r0 = J), r0));
            }
            if (D.left === null && D.right === null) {
              if (D.parent === null) {
                v.root = null;
                return;
              }
              x = o[D.parent.dimension], D.obj[x] < D.parent.obj[x] ? D.parent.left = null : D.parent.right = null;
              return;
            }
            D.left !== null ? q = N(D.left, D.dimension) : q = R(D.right, D.dimension), F = q.obj, _(q), D.obj = F;
          }
          m = d(v.root), m !== null && _(m);
        }, this.nearest = function(l, m, d) {
          var _, D, q;
          q = new c(
            function(x) {
              return -x[1];
            }
          );
          function F(x) {
            if (!v.root)
              return [];
            var N, R = o[x.dimension], I = h(l, x.obj), u = {}, b, Z, G;
            function J(r0, s0) {
              q.push([r0, s0]), q.size() > m && q.pop();
            }
            for (G = 0; G < o.length; G += 1)
              G === x.dimension ? u[o[G]] = l[o[G]] : u[o[G]] = x.obj[o[G]];
            if (b = h(u, x.obj), x.right === null && x.left === null) {
              (q.size() < m || I < q.peek()[1]) && J(x, I);
              return;
            }
            x.right === null ? N = x.left : x.left === null ? N = x.right : l[R] < x.obj[R] ? N = x.left : N = x.right, F(N), (q.size() < m || I < q.peek()[1]) && J(x, I), (q.size() < m || Math.abs(b) < q.peek()[1]) && (N === x.left ? Z = x.right : Z = x.left, Z !== null && F(Z));
          }
          if (d)
            for (_ = 0; _ < m; _ += 1)
              q.push([null, d]);
          for (F(v.root), D = [], _ = 0; _ < m && _ < q.content.length; _ += 1)
            q.content[_][0] && D.push([q.content[_][0].obj, q.content[_][1]]);
          return D;
        }, this.balanceFactor = function() {
          function l(d) {
            return d === null ? 0 : Math.max(l(d.left), l(d.right)) + 1;
          }
          function m(d) {
            return d === null ? 0 : m(d.left) + m(d.right) + 1;
          }
          return l(v.root) / (Math.log(m(v.root)) / Math.log(2));
        };
      }
      function c(f) {
        this.content = [], this.scoreFunction = f;
      }
      c.prototype = {
        push: function(f) {
          this.content.push(f), this.bubbleUp(this.content.length - 1);
        },
        pop: function() {
          var f = this.content[0], h = this.content.pop();
          return this.content.length > 0 && (this.content[0] = h, this.sinkDown(0)), f;
        },
        peek: function() {
          return this.content[0];
        },
        remove: function(f) {
          for (var h = this.content.length, o = 0; o < h; o++)
            if (this.content[o] == f) {
              var v = this.content.pop();
              o != h - 1 && (this.content[o] = v, this.scoreFunction(v) < this.scoreFunction(f) ? this.bubbleUp(o) : this.sinkDown(o));
              return;
            }
          throw new Error("Node not found.");
        },
        size: function() {
          return this.content.length;
        },
        bubbleUp: function(f) {
          for (var h = this.content[f]; f > 0; ) {
            var o = Math.floor((f + 1) / 2) - 1, v = this.content[o];
            if (this.scoreFunction(h) < this.scoreFunction(v))
              this.content[o] = h, this.content[f] = v, f = o;
            else
              break;
          }
        },
        sinkDown: function(f) {
          for (var h = this.content.length, o = this.content[f], v = this.scoreFunction(o); ; ) {
            var p = (f + 1) * 2, l = p - 1, m = null;
            if (l < h) {
              var d = this.content[l], _ = this.scoreFunction(d);
              _ < v && (m = l);
            }
            if (p < h) {
              var D = this.content[p], q = this.scoreFunction(D);
              q < (m == null ? v : _) && (m = p);
            }
            if (m != null)
              this.content[f] = this.content[m], this.content[m] = o, f = m;
            else
              break;
          }
        }
      }, e.exports = {
        createKdTree: function(f, h, o) {
          return new r(f, h, o);
        }
      };
    }, {}], 10: [function(n, e, i) {
      e.exports = {
        name: "serve-sofa-hrir",
        exports: "serveSofaHrir",
        version: "0.4.2",
        description: "Utility to fetch and shape sofa formated HRIR from server",
        main: "./dist/",
        standalone: "serveSofaHrir",
        scripts: {
          lint: "eslint ./src/ ./test/ && jscs --verbose ./src/ ./test/",
          "lint-examples": "eslint -c examples/.eslintrc ./examples/*.html",
          compile: "rm -rf ./dist && babel ./src/ --out-dir ./dist/",
          browserify: "browserify ./src/index.js -t [ babelify ] --standalone serveSofaHrir > serveSofaHrir.js",
          bundle: "npm run lint && npm run test && npm run doc && npm run compile && npm run browserify",
          doc: "esdoc -c esdoc.json",
          test: "browserify test/*/*.js -t [ babelify ] --exclude 'test/*/*_listen.js*' --exclude 'test/*/*_issues.js' | tape-run",
          "test-browser": "browserify test/*/*.js -t [ babelify ] --exclude 'test/*/*_listen.js*' --exclude 'test/*/*_issues.js' | testling -u",
          "test-listen": "browserify test/*/*_listen.js -t [ babelify ] | tape-run",
          "test-issues": "browserify test/*/*_issues.js -t [ babelify ] | tape-run",
          watch: "watch 'npm run browserify && echo $( date ): browserified' ./src/"
        },
        authors: [
          "Jean-Philippe.Lambert@ircam.fr",
          "Arnau Julià <arnau.julia@gmail.com>",
          "Samuel.Goldszmidt@ircam.fr",
          "David.Poirier-Quinot@ircam.fr"
        ],
        license: "BSD-3-Clause",
        dependencies: {
          "fractional-delay": "git://github.com/Ircam-RnD/fractional-delay#gh-pages",
          "gl-matrix": "^2.4.0",
          "kd.tree": "akshaylive/node-kdt#39bc780704a324393bca68a17cf7bc71be8544c6"
        },
        repository: {
          type: "git",
          url: "https://github.com/Ircam-RnD/serveSofaHrir"
        },
        engines: {
          node: "0.12 || 4",
          npm: ">=1.0.0 <3.0.0"
        },
        devDependencies: {
          "babel-cli": "^6.5.1",
          "babel-eslint": "^4.1.8",
          "babel-preset-es2015": "^6.5.0",
          babelify: "^7.2.0",
          "blue-tape": "^0.1.11",
          browserify: "^12.0.2",
          esdoc: "^0.4.6",
          eslint: "^1.10.3",
          "eslint-config-airbnb": "^1.0.2",
          "eslint-plugin-html": "^1.4.0",
          jscs: "2.11.0",
          "jscs-jsdoc": "^1.3.1",
          tape: "^4.4.0",
          "tape-run": "^2.1.2",
          testling: "^1.7.1",
          watch: "^0.17.1"
        }
      };
    }, {}], 11: [function(n, e, i) {
      Object.defineProperty(i, "__esModule", {
        value: !0
      }), i.resampleFloat32Array = f;
      var s = n("fractional-delay"), r = c(s);
      function c(h) {
        return h && h.__esModule ? h : { default: h };
      }
      function f() {
        var h = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, o = new Promise(function(v, p) {
          var l = h.inputSamples, m = h.inputSampleRate, d = typeof h.inputDelay < "u" ? h.inputDelay : 0, _ = typeof h.outputSampleRate < "u" ? h.outputSampleRate : m;
          if (m === _ && d === 0)
            v(new Float32Array(l));
          else
            try {
              var D = Math.ceil(l.length * _ / m), q = new window.OfflineAudioContext(1, D, _), F = q.createBuffer(1, l.length, m), x = 1, N = new r.default(m, x);
              N.setDelay(d / m), F.getChannelData(0).set(N.process(l));
              var R = q.createBufferSource();
              R.buffer = F, R.connect(q.destination), R.start(), q.oncomplete = function(I) {
                var u = I.renderedBuffer.getChannelData(0);
                v(u);
              }, q.startRendering();
            } catch (I) {
              p(new Error("Unable to re-sample Float32Array. " + I.message));
            }
        });
        return o;
      }
      /**
       * @fileOverview Audio utilities
       * @author Jean-Philippe.Lambert@ircam.fr
       * @copyright 2016 IRCAM, Paris, France
       * @license BSD-3-Clause
       */
      i.default = {
        resampleFloat32Array: f
      };
    }, { "fractional-delay": 7 }], 12: [function(n, e, i) {
      Object.defineProperty(i, "__esModule", {
        value: !0
      }), i.tree = void 0, i.distanceSquared = f, i.distance = h;
      var s = n("kd.tree"), r = c(s);
      function c(o) {
        return o && o.__esModule ? o : { default: o };
      }
      i.tree = r.default;
      /**
       * @fileOverview Helpers for k-d tree.
       * @author Jean-Philippe.Lambert@ircam.fr
       * @copyright 2015-2016 IRCAM, Paris, France
       * @license BSD-3-Clause
       */
      function f(o, v) {
        var p = v.x - o.x, l = v.y - o.y, m = v.z - o.z;
        return p * p + l * l + m * m;
      }
      function h(o, v) {
        return Math.sqrt(this.distanceSquared(o, v));
      }
      i.default = {
        distance: h,
        distanceSquared: f,
        tree: r.default
      };
    }, { "kd.tree": 9 }], 13: [function(n, e, i) {
      Object.defineProperty(i, "__esModule", {
        value: !0
      }), i.sofaCartesianToGl = f, i.glToSofaCartesian = h, i.sofaCartesianToSofaSpherical = o, i.sofaSphericalToSofaCartesian = v, i.sofaSphericalToGl = p, i.glToSofaSpherical = l, i.sofaToSofaCartesian = m, i.spat4CartesianToGl = d, i.glToSpat4Cartesian = _, i.spat4CartesianToSpat4Spherical = D, i.spat4SphericalToSpat4Cartesian = q, i.spat4SphericalToGl = F, i.glToSpat4Spherical = x, i.systemType = N, i.systemToGl = R, i.glToSystem = I;
      var s = n("./degree"), r = c(s);
      function c(u) {
        return u && u.__esModule ? u : { default: u };
      }
      function f(u, b) {
        var Z = b[0], G = b[1], J = b[2];
        return u[0] = 0 - G, u[1] = J, u[2] = 0 - Z, u;
      }
      /**
       * @fileOverview Coordinate systems conversions. openGL, SOFA, and Spat4 (Ircam).
       *
       * @author Jean-Philippe.Lambert@ircam.fr
       * @copyright 2015-2016 IRCAM, Paris, France
       * @license BSD-3-Clause
       */
      function h(u, b) {
        var Z = b[0], G = b[1], J = b[2];
        return u[0] = 0 - J, u[1] = 0 - Z, u[2] = G, u;
      }
      function o(u, b) {
        var Z = b[0], G = b[1], J = b[2], r0 = Z * Z + G * G;
        return u[0] = (r.default.atan2(G, Z) + 360) % 360, u[1] = r.default.atan2(J, Math.sqrt(r0)), u[2] = Math.sqrt(r0 + J * J), u;
      }
      function v(u, b) {
        var Z = b[0], G = b[1], J = b[2], r0 = r.default.cos(G);
        return u[0] = J * r0 * r.default.cos(Z), u[1] = J * r0 * r.default.sin(Z), u[2] = J * r.default.sin(G), u;
      }
      function p(u, b) {
        var Z = b[0], G = b[1], J = b[2], r0 = r.default.cos(G);
        return u[0] = 0 - J * r0 * r.default.sin(Z), u[1] = J * r.default.sin(G), u[2] = 0 - J * r0 * r.default.cos(Z), u;
      }
      function l(u, b) {
        var Z = 0 - b[2], G = 0 - b[0], J = b[1], r0 = Z * Z + G * G;
        return u[0] = (r.default.atan2(G, Z) + 360) % 360, u[1] = r.default.atan2(J, Math.sqrt(r0)), u[2] = Math.sqrt(r0 + J * J), u;
      }
      function m(u, b, Z) {
        switch (Z) {
          case "sofaCartesian":
            u[0] = b[0], u[1] = b[1], u[2] = b[2];
            break;
          case "sofaSpherical":
            v(u, b);
            break;
          default:
            throw new Error("Bad coordinate system");
        }
        return u;
      }
      function d(u, b) {
        var Z = b[0], G = b[1], J = b[2];
        return u[0] = Z, u[1] = J, u[2] = 0 - G, u;
      }
      function _(u, b) {
        var Z = b[0], G = b[1], J = b[2];
        return u[0] = Z, u[1] = 0 - J, u[2] = G, u;
      }
      function D(u, b) {
        var Z = b[0], G = b[1], J = b[2], r0 = Z * Z + G * G;
        return u[0] = r.default.atan2(Z, G), u[1] = r.default.atan2(J, Math.sqrt(r0)), u[2] = Math.sqrt(r0 + J * J), u;
      }
      function q(u, b) {
        var Z = b[0], G = b[1], J = b[2], r0 = r.default.cos(G);
        return u[0] = J * r0 * r.default.sin(Z), u[1] = J * r0 * r.default.cos(Z), u[2] = J * r.default.sin(G), u;
      }
      function F(u, b) {
        var Z = b[0], G = b[1], J = b[2], r0 = r.default.cos(G);
        return u[0] = J * r0 * r.default.sin(Z), u[1] = J * r.default.sin(G), u[2] = 0 - J * r0 * r.default.cos(Z), u;
      }
      function x(u, b) {
        var Z = b[0], G = 0 - b[2], J = b[1], r0 = Z * Z + G * G;
        return u[0] = r.default.atan2(Z, G), u[1] = r.default.atan2(J, Math.sqrt(r0)), u[2] = Math.sqrt(r0 + J * J), u;
      }
      function N(u) {
        var b = void 0;
        if (u === "sofaCartesian" || u === "spat4Cartesian" || u === "gl")
          b = "cartesian";
        else if (u === "sofaSpherical" || u === "spat4Spherical")
          b = "spherical";
        else
          throw new Error("Unknown coordinate system type " + u);
        return b;
      }
      function R(u, b, Z) {
        switch (Z) {
          case "gl":
            u[0] = b[0], u[1] = b[1], u[2] = b[2];
            break;
          case "sofaCartesian":
            f(u, b);
            break;
          case "sofaSpherical":
            p(u, b);
            break;
          case "spat4Cartesian":
            d(u, b);
            break;
          case "spat4Spherical":
            F(u, b);
            break;
          default:
            throw new Error("Bad coordinate system");
        }
        return u;
      }
      function I(u, b, Z) {
        switch (Z) {
          case "gl":
            u[0] = b[0], u[1] = b[1], u[2] = b[2];
            break;
          case "sofaCartesian":
            h(u, b);
            break;
          case "sofaSpherical":
            l(u, b);
            break;
          case "spat4Cartesian":
            _(u, b);
            break;
          case "spat4Spherical":
            x(u, b);
            break;
          default:
            throw new Error("Bad coordinate system");
        }
        return u;
      }
      i.default = {
        glToSofaCartesian: h,
        glToSofaSpherical: l,
        glToSpat4Cartesian: _,
        glToSpat4Spherical: x,
        glToSystem: I,
        sofaCartesianToGl: f,
        sofaCartesianToSofaSpherical: o,
        sofaSphericalToGl: p,
        sofaSphericalToSofaCartesian: v,
        sofaToSofaCartesian: m,
        spat4CartesianToGl: d,
        spat4CartesianToSpat4Spherical: D,
        spat4SphericalToGl: F,
        spat4SphericalToSpat4Cartesian: q,
        systemToGl: R,
        systemType: N
      };
    }, { "./degree": 14 }], 14: [function(n, e, i) {
      Object.defineProperty(i, "__esModule", {
        value: !0
      }), i.toRadian = c, i.fromRadian = f, i.cos = h, i.sin = o, i.atan2 = v;
      /**
       * @fileOverview Convert to and from degree
       * @author Jean-Philippe.Lambert@ircam.fr
       * @copyright 2015-2016 IRCAM, Paris, France
       * @license BSD-3-Clause
       */
      var s = i.toRadianFactor = Math.PI / 180, r = i.fromRadianFactor = 1 / s;
      function c(p) {
        return p * s;
      }
      function f(p) {
        return p * r;
      }
      function h(p) {
        return Math.cos(p * s);
      }
      function o(p) {
        return Math.sin(p * s);
      }
      function v(p, l) {
        return Math.atan2(p, l) * r;
      }
      i.default = {
        atan2: v,
        cos: h,
        fromRadian: f,
        fromRadianFactor: r,
        sin: o,
        toRadian: c,
        toRadianFactor: s
      };
    }, {}], 15: [function(n, e, i) {
      Object.defineProperty(i, "__esModule", {
        value: !0
      }), i.ServerDataBase = i.HrtfSet = void 0;
      var s = n("./sofa/HrtfSet"), r = h(s), c = n("./sofa/ServerDataBase"), f = h(c);
      function h(o) {
        return o && o.__esModule ? o : { default: o };
      }
      i.HrtfSet = r.default, i.ServerDataBase = f.default, i.default = {
        HrtfSet: r.default,
        ServerDataBase: f.default
      };
    }, { "./sofa/HrtfSet": 17, "./sofa/ServerDataBase": 18 }], 16: [function(n, e, i) {
      Object.defineProperty(i, "__esModule", {
        value: !0
      }), i.version = i.name = i.license = i.description = void 0;
      var s = n("../package.json"), r = c(s);
      function c(p) {
        return p && p.__esModule ? p : { default: p };
      }
      var f = r.default.description;
      /**
       * @fileOverview Information on the library, from the `package.json` file.
       *
       * @author Jean-Philippe.Lambert@ircam.fr
       * @copyright 2016 IRCAM, Paris, France
       * @license BSD-3-Clause
       */
      i.description = f;
      var h = r.default.license;
      i.license = h;
      var o = r.default.name;
      i.name = o;
      var v = r.default.version;
      i.version = v, i.default = {
        description: f,
        license: h,
        name: o,
        version: v
      };
    }, { "../package.json": 10 }], 17: [function(n, e, i) {
      Object.defineProperty(i, "__esModule", {
        value: !0
      }), i.HrtfSet = void 0;
      var s = /* @__PURE__ */ function() {
        function R(I, u) {
          for (var b = 0; b < u.length; b++) {
            var Z = u[b];
            Z.enumerable = Z.enumerable || !1, Z.configurable = !0, "value" in Z && (Z.writable = !0), Object.defineProperty(I, Z.key, Z);
          }
        }
        return function(I, u, b) {
          return u && R(I.prototype, u), b && R(I, b), I;
        };
      }();
      /**
       * @fileOverview Container for HRTF set: load a set from an URL and get
       * filters from corresponding positions.
       *
       * @author Jean-Philippe.Lambert@ircam.fr
       * @copyright 2015-2016 IRCAM, Paris, France
       * @license BSD-3-Clause
       */
      var r = n("gl-matrix"), c = q(r), f = n("../info"), h = D(f), o = n("./parseDataSet"), v = n("./parseSofa"), p = n("../geometry/coordinates"), l = D(p), m = n("../geometry/KdTree"), d = D(m), _ = n("../audio/utilities");
      function D(R) {
        return R && R.__esModule ? R : { default: R };
      }
      function q(R) {
        if (R && R.__esModule)
          return R;
        var I = {};
        if (R != null)
          for (var u in R)
            Object.prototype.hasOwnProperty.call(R, u) && (I[u] = R[u]);
        return I.default = R, I;
      }
      function F(R) {
        if (Array.isArray(R)) {
          for (var I = 0, u = Array(R.length); I < R.length; I++)
            u[I] = R[I];
          return u;
        } else
          return Array.from(R);
      }
      function x(R, I) {
        if (!(R instanceof I))
          throw new TypeError("Cannot call a class as a function");
      }
      var N = i.HrtfSet = function() {
        function R() {
          var I = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
          x(this, R), this._audioContext = I.audioContext, this._ready = !1, this.coordinateSystem = I.coordinateSystem, this.filterCoordinateSystem = I.filterCoordinateSystem, this.filterPositions = I.filterPositions, this.filterAfterLoad = I.filterAfterLoad;
        }
        return s(R, [{
          key: "applyFilterPositions",
          // ------------- public methods
          /**
           * Apply filter positions to an existing set of HRTF. (After a successful
           * load.)
           *
           * This is destructive.
           *
           * @see {@link HrtfSet#load}
           */
          value: function() {
            var u = this, b = this._filterPositions.map(function(Z) {
              return u._kdt.nearest({ x: Z[0], y: Z[1], z: Z[2] }, 1).pop()[0];
            });
            b = [].concat(F(new Set(b))), this._kdt = d.default.tree.createKdTree(b, d.default.distanceSquared, ["x", "y", "z"]);
          }
          /**
           * Load an URL and generate the corresponding set of IR buffers.
           *
           * @param {String} sourceUrl
           * @returns {Promise.<this|Error>} resolve when the URL sucessfully
           * loaded.
           */
        }, {
          key: "load",
          value: function(u) {
            var b = this, Z = u.split(".").pop(), G = Z === "sofa" ? u + ".json" : u, J = void 0, r0 = typeof this._filterPositions < "u" && !this.filterAfterLoad && Z === "sofa";
            return r0 ? J = Promise.all([this._loadMetaAndPositions(u), this._loadDataSet(u)]).then(function(s0) {
              var C0 = s0[0], _0 = s0[1];
              return b._loadSofaPartial(u, C0, _0).then(function() {
                return b._ready = !0, b;
              });
            }).catch(function() {
              return b._loadSofaFull(G).then(function() {
                return b.applyFilterPositions(), b._ready = !0, b;
              });
            }) : J = this._loadSofaFull(G).then(function() {
              return typeof b._filterPositions < "u" && b.filterAfterLoad && b.applyFilterPositions(), b._ready = !0, b;
            }), J;
          }
          /**
           * Export the current HRTF set as a JSON string.
           *
           * When set, `this.filterPositions` reduce the actual number of filter, and
           * thus the exported set. The coordinate system of the export is
           * `this.filterCoordinateSystem`.
           *
           * @see {@link HrtfSet#filterCoordinateSystem}
           * @see {@link HrtfSet#filterPositions}
           *
           * @returns {String} as a SOFA JSON file.
           * @throws {Error} when this.filterCoordinateSystem is unknown.
           */
        }, {
          key: "export",
          value: function() {
            var u = this, b = void 0, Z = l.default.systemType(this.filterCoordinateSystem);
            switch (Z) {
              case "cartesian":
                b = this._sofaSourcePosition.map(function(J) {
                  return l.default.glToSofaCartesian([], J);
                });
                break;
              case "spherical":
                b = this._sofaSourcePosition.map(function(J) {
                  return l.default.glToSofaSpherical([], J);
                });
                break;
              default:
                throw new Error("Bad source position type " + Z + " for export.");
            }
            var G = this._sofaSourcePosition.map(function(J) {
              for (var r0 = u._kdt.nearest({ x: J[0], y: J[1], z: J[2] }, 1).pop()[0].fir, s0 = [], C0 = 0; C0 < r0.numberOfChannels; ++C0)
                s0.push([].concat(F(r0.getChannelData(C0))));
              return s0;
            });
            return (0, v.stringifySofa)({
              name: this._sofaName,
              metaData: this._sofaMetaData,
              ListenerPosition: [0, 0, 0],
              ListenerPositionType: "cartesian",
              ListenerUp: [0, 0, 1],
              ListenerUpType: "cartesian",
              ListenerView: [1, 0, 0],
              ListenerViewType: "cartesian",
              SourcePositionType: Z,
              SourcePosition: b,
              DataSamplingRate: this._audioContext.sampleRate,
              DataDelay: this._sofaDelay,
              DataIR: G,
              RoomVolume: this._sofaRoomVolume
            });
          }
          /**
           * @typedef {Object} HrtfSet.nearestType
           * @property {Number} distance from the request
           * @property {AudioBuffer} fir 2-channels impulse response
           * @property {Number} index original index in the SOFA set
           * @property {Coordinates} position using coordinateSystem coordinates
           * system.
           */
          /**
           * Get the nearest point in the HRTF set, after a successful load.
           *
           * @see {@link HrtfSet#load}
           *
           * @param {Coordinates} positionRequest
           * @returns {HrtfSet.nearestType}
           */
        }, {
          key: "nearest",
          value: function(u) {
            var b = l.default.systemToGl([], u, this.coordinateSystem), Z = this._kdt.nearest({
              x: b[0],
              y: b[1],
              z: b[2]
            }, 1).pop(), G = Z[0];
            return l.default.glToSystem(b, [G.x, G.y, G.z], this.coordinateSystem), {
              distance: Z[1],
              fir: G.fir,
              index: G.index,
              position: b
            };
          }
          /**
           * Get the FIR AudioBuffer that corresponds to the closest position in
           * the set.
           * @param {Coordinates} positionRequest
           * @returns {AudioBuffer}
           */
        }, {
          key: "nearestFir",
          value: function(u) {
            return this.nearest(u).fir;
          }
          // ----------- private methods
          /**
           * Creates a kd-tree out of the specified indices, positions, and FIR.
           *
           * @private
           *
           * @param {Array} indicesPositionsFirs
           * @returns {this}
           */
        }, {
          key: "_createKdTree",
          value: function(u) {
            var b = this, Z = u.map(function(G) {
              var J = G[2], r0 = b._audioContext.createBuffer(J.length, J[0].length, b._audioContext.sampleRate);
              return J.forEach(function(s0, C0) {
                r0.getChannelData(C0).set(s0);
              }), {
                index: G[0],
                x: G[1][0],
                y: G[1][1],
                z: G[1][2],
                fir: r0
              };
            });
            return this._sofaSourcePosition = Z.map(function(G) {
              return [G.x, G.y, G.z];
            }), this._kdt = d.default.tree.createKdTree(Z, d.default.distanceSquared, ["x", "y", "z"]), this;
          }
          /**
           * Asynchronously create Float32Arrays, with possible re-sampling.
           *
           * @private
           *
           * @param {Array.<Number>} indices
           * @param {Array.<Coordinates>} positions
           * @param {Array.<Float32Array>} firs
           * @returns {Promise.<Array|Error>}
           * @throws {Error} assertion that the channel count is 2
           */
        }, {
          key: "_generateIndicesPositionsFirs",
          value: function(u, b, Z, G) {
            var J = this, r0 = Z.map(function(s0, C0) {
              var _0 = s0.length;
              if (_0 !== 2)
                throw new Error("Bad number of channels" + (" for IR index " + u[C0]) + (" (" + _0 + " instead of 2)"));
              if (G[0].length !== 2)
                throw new Error("Bad delay format" + (" for IR index " + u[C0]) + (" (first element in Data.Delay is " + G[0]) + " instead of [[delayL, delayR]] )");
              var D0 = typeof G[C0] < "u" ? G[C0] : G[0], j = s0.map(function(M, z) {
                if (D0[z] < 0)
                  throw new Error("Negative delay detected (not handled at the moment):" + (" delay index " + u[C0]) + (" channel " + z));
                return (0, _.resampleFloat32Array)({
                  inputSamples: M,
                  inputDelay: D0[z],
                  inputSampleRate: J._sofaSampleRate,
                  outputSampleRate: J._audioContext.sampleRate
                });
              });
              return Promise.all(j).then(function(M) {
                return [u[C0], b[C0], M];
              }).catch(function(M) {
                throw new Error("Unable to re-sample impulse response " + C0 + ". " + M.message);
              });
            });
            return Promise.all(r0);
          }
          /**
           * Try to load a data set from a SOFA URL.
           *
           * @private
           *
           * @param {String} sourceUrl
           * @returns {Promise.<Object|Error>}
           */
        }, {
          key: "_loadDataSet",
          value: function(u) {
            var b = new Promise(function(Z, G) {
              var J = u + ".dds", r0 = new window.XMLHttpRequest();
              r0.open("GET", J), r0.onerror = function() {
                G(new Error("Unable to GET " + J + ", status " + r0.status + " " + ("" + r0.responseText)));
              }, r0.onload = function() {
                if (r0.status < 200 || r0.status >= 300) {
                  r0.onerror();
                  return;
                }
                try {
                  var s0 = (0, o.parseDataSet)(r0.response);
                  Z(s0);
                } catch (C0) {
                  G(new Error("Unable to parse " + J + ". " + C0.message));
                }
              }, r0.send();
            });
            return b;
          }
          /**
           * Try to load meta-data and positions from a SOFA URL, to get the
           * indices closest to the filter positions.
           *
           * @private
           *
           * @param {String} sourceUrl
           * @returns {Promise.<Array.<Number>|Error>}
           */
        }, {
          key: "_loadMetaAndPositions",
          value: function(u) {
            var b = this, Z = new Promise(function(G, J) {
              var r0 = u + ".json?ListenerPosition,ListenerUp,ListenerView,SourcePosition,Data.Delay,Data.SamplingRate,EmitterPosition,ReceiverPosition,RoomVolume", s0 = new window.XMLHttpRequest();
              s0.open("GET", r0), s0.onerror = function() {
                J(new Error("Unable to GET " + r0 + ", status " + s0.status + " " + ("" + s0.responseText)));
              }, s0.onload = function() {
                if (s0.status < 200 || s0.status >= 300) {
                  s0.onerror();
                  return;
                }
                try {
                  var C0 = (0, v.parseSofa)(s0.response);
                  b._setMetaData(C0, u);
                  var _0 = b._sourcePositionsToGl(C0), D0 = _0.map(function(z, t0) {
                    return {
                      x: z[0],
                      y: z[1],
                      z: z[2],
                      index: t0
                    };
                  }), j = d.default.tree.createKdTree(D0, d.default.distanceSquared, ["x", "y", "z"]), M = b._filterPositions.map(function(z) {
                    return j.nearest({ x: z[0], y: z[1], z: z[2] }, 1).pop()[0].index;
                  });
                  M = [].concat(F(new Set(M))), b._sofaUrl = u, G(M);
                } catch (z) {
                  J(new Error("Unable to parse " + r0 + ". " + z.message));
                }
              }, s0.send();
            });
            return Z;
          }
          /**
           * Try to load full SOFA URL.
           *
           * @private
           *
           * @param {String} url
           * @returns {Promise.<this|Error>}
           */
        }, {
          key: "_loadSofaFull",
          value: function(u) {
            var b = this, Z = new Promise(function(G, J) {
              var r0 = new window.XMLHttpRequest();
              r0.open("GET", u), r0.onerror = function() {
                J(new Error("Unable to GET " + u + ", status " + r0.status + " " + ("" + r0.responseText)));
              }, r0.onload = function() {
                if (r0.status < 200 || r0.status >= 300) {
                  r0.onerror();
                  return;
                }
                try {
                  var s0 = (0, v.parseSofa)(r0.response);
                  b._setMetaData(s0, u);
                  var C0 = b._sourcePositionsToGl(s0);
                  b._generateIndicesPositionsFirs(
                    C0.map(function(_0, D0) {
                      return D0;
                    }),
                    // full
                    C0,
                    s0["Data.IR"].data,
                    s0["Data.Delay"].data
                  ).then(function(_0) {
                    b._createKdTree(_0), b._sofaUrl = u, G(b);
                  });
                } catch (_0) {
                  J(new Error("Unable to parse " + u + ". " + _0.message));
                }
              }, r0.send();
            });
            return Z;
          }
          /**
           * Try to load partial data from a SOFA URL.
           *
           * @private
           *
           * @param {Array.<String>} sourceUrl
           * @param {Array.<Number>} indices
           * @param {Object} dataSet
           * @returns {Promise.<this|Error>}
           */
        }, {
          key: "_loadSofaPartial",
          value: function(u, b, Z) {
            var G = this, J = b.map(function(r0) {
              var s0 = new Promise(function(C0, _0) {
                var D0 = u + ".json?" + ("SourcePosition[" + r0 + "][0:1:" + (Z.SourcePosition.C - 1) + "],") + ("Data.IR[" + r0 + "][0:1:" + (Z["Data.IR"].R - 1) + "]") + ("[0:1:" + (Z["Data.IR"].N - 1) + "]"), j = new window.XMLHttpRequest();
                j.open("GET", D0), j.onerror = function() {
                  _0(new Error("Unable to GET " + D0 + ", status " + j.status + " " + ("" + j.responseText)));
                }, j.onload = function() {
                  (j.status < 200 || j.status >= 300) && j.onerror();
                  try {
                    var M = (0, v.parseSofa)(j.response), z = G._sourcePositionsToGl(M);
                    G._generateIndicesPositionsFirs([r0], z, M["Data.IR"].data, M["Data.Delay"].data).then(function(t0) {
                      C0(t0[0]);
                    });
                  } catch (t0) {
                    _0(new Error("Unable to parse " + D0 + ". " + t0.message));
                  }
                }, j.send();
              });
              return s0;
            });
            return Promise.all(J).then(function(r0) {
              return G._createKdTree(r0), G;
            });
          }
          /**
           * Set meta-data, and assert for supported HRTF type.
           *
           * @private
           *
           * @param {Object} data
           * @param {String} sourceUrl
           * @throws {Error} assertion for FIR data.
           */
        }, {
          key: "_setMetaData",
          value: function(u, b) {
            if (typeof u.metaData.DataType < "u" && u.metaData.DataType !== "FIR")
              throw new Error("According to meta-data, SOFA data type is not FIR");
            var Z = (/* @__PURE__ */ new Date()).toISOString();
            this._sofaName = typeof u.name < "u" ? "" + u.name : "HRTF.sofa", this._sofaMetaData = typeof u.metaData < "u" ? u.metaData : {}, typeof b < "u" && (this._sofaMetaData.OriginalUrl = b), this._sofaMetaData.Converter = "Ircam " + h.default.name + " " + h.default.version + " javascript API ", this._sofaMetaData.DateConverted = Z, this._sofaSampleRate = typeof u["Data.SamplingRate"] < "u" ? u["Data.SamplingRate"].data[0] : 48e3, this._sofaSampleRate !== this._audioContext.sampleRate && (this._sofaMetaData.OriginalSampleRate = this._sofaSampleRate), this._sofaDelay = typeof u["Data.Delay"] < "u" ? u["Data.Delay"].data : [0, 0], this._sofaRoomVolume = typeof u.RoomVolume < "u" ? u.RoomVolume.data[0] : void 0;
            var G = l.default.sofaToSofaCartesian([], u.ListenerPosition.data[0], (0, v.conformSofaCoordinateSystem)(u.ListenerPosition.Type || "cartesian")), J = l.default.sofaToSofaCartesian([], u.ListenerView.data[0], (0, v.conformSofaCoordinateSystem)(u.ListenerView.Type || "cartesian")), r0 = l.default.sofaToSofaCartesian([], u.ListenerUp.data[0], (0, v.conformSofaCoordinateSystem)(u.ListenerUp.Type || "cartesian"));
            this._sofaToGl = c.mat4.lookAt([], G, J, r0);
          }
          /**
           * Convert to GL coordinates, in-place.
           *
           * @private
           *
           * @param {Object} data
           * @returns {Array.<Coordinates>}
           * @throws {Error}
           */
        }, {
          key: "_sourcePositionsToGl",
          value: function(u) {
            var b = this, Z = u.SourcePosition.data, G = typeof u.SourcePosition.Type < "u" ? u.SourcePosition.Type : "spherical";
            switch (G) {
              case "cartesian":
                Z.forEach(function(J) {
                  c.vec3.transformMat4(J, J, b._sofaToGl);
                });
                break;
              case "spherical":
                Z.forEach(function(J) {
                  l.default.sofaSphericalToSofaCartesian(J, J), c.vec3.transformMat4(J, J, b._sofaToGl);
                });
                break;
              default:
                throw new Error("Bad source position type");
            }
            return Z;
          }
        }, {
          key: "coordinateSystem",
          set: function(u) {
            this._coordinateSystem = typeof u < "u" ? u : "gl";
          },
          get: function() {
            return this._coordinateSystem;
          }
          /**
           * Set coordinate system for filter positions.
           *
           * @param {CoordinateSystem} [system] undefined to use coordinateSystem
           */
        }, {
          key: "filterCoordinateSystem",
          set: function(u) {
            this._filterCoordinateSystem = typeof u < "u" ? u : this.coordinateSystem;
          },
          get: function() {
            return this._filterCoordinateSystem;
          }
          /**
           * Set filter positions.
           *
           * @param {Array.<Coordinates>} [positions] undefined for no filtering.
           */
        }, {
          key: "filterPositions",
          set: function(u) {
            if (typeof u > "u")
              this._filterPositions = void 0;
            else
              switch (this.filterCoordinateSystem) {
                case "gl":
                  this._filterPositions = u.map(function(b) {
                    return b.slice(0);
                  });
                  break;
                case "sofaCartesian":
                  this._filterPositions = u.map(function(b) {
                    return l.default.sofaCartesianToGl([], b);
                  });
                  break;
                case "sofaSpherical":
                  this._filterPositions = u.map(function(b) {
                    return l.default.sofaSphericalToGl([], b);
                  });
                  break;
                default:
                  throw new Error("Bad filter coordinate system");
              }
          },
          get: function() {
            var u = void 0;
            if (typeof this._filterPositions < "u")
              switch (this.filterCoordinateSystem) {
                case "gl":
                  u = this._filterPositions.map(function(b) {
                    return b.slice(0);
                  });
                  break;
                case "sofaCartesian":
                  u = this._filterPositions.map(function(b) {
                    return l.default.glToSofaCartesian([], b);
                  });
                  break;
                case "sofaSpherical":
                  u = this._filterPositions.map(function(b) {
                    return l.default.glToSofaSpherical([], b);
                  });
                  break;
                default:
                  throw new Error("Bad filter coordinate system");
              }
            return u;
          }
          /**
           * Set post-filtering flag. When false, try to load a partial set of
           * HRTF.
           *
           * @param {Boolean} [post=false]
           */
        }, {
          key: "filterAfterLoad",
          set: function(u) {
            this._filterAfterLoad = typeof u < "u" ? u : !1;
          },
          get: function() {
            return this._filterAfterLoad;
          }
          /**
           * Test whether an HRTF set is actually loaded.
           *
           * @see {@link HrtfSet#load}
           *
           * @returns {Boolean} false before any successful load, true after.
           *
           */
        }, {
          key: "isReady",
          get: function() {
            return this._ready;
          }
          /**
           * Get the original name of the HRTF set.
           *
           * @returns {String} that is undefined before a successfully load.
           */
        }, {
          key: "sofaName",
          get: function() {
            return this._sofaName;
          }
          /**
           * Get the URL used to actually load the HRTF set.
           *
           * @returns {String} that is undefined before a successfully load.
           */
        }, {
          key: "sofaUrl",
          get: function() {
            return this._sofaUrl;
          }
          /**
           * Get the original sample-rate from the SOFA URL already loaded.
           *
           * @returns {Number} that is undefined before a successfully load.
           */
        }, {
          key: "sofaSampleRate",
          get: function() {
            return this._sofaSampleRate;
          }
          /**
           * Get the meta-data from the SOFA URL already loaded.
           *
           * @returns {Object} that is undefined before a successfully load.
           */
        }, {
          key: "sofaMetaData",
          get: function() {
            return this._sofaMetaData;
          }
        }]), R;
      }();
      i.default = N;
    }, { "../audio/utilities": 11, "../geometry/KdTree": 12, "../geometry/coordinates": 13, "../info": 16, "./parseDataSet": 19, "./parseSofa": 20, "gl-matrix": 8 }], 18: [function(n, e, i) {
      Object.defineProperty(i, "__esModule", {
        value: !0
      }), i.ServerDataBase = void 0;
      var s = /* @__PURE__ */ function() {
        function p(l, m) {
          for (var d = 0; d < m.length; d++) {
            var _ = m[d];
            _.enumerable = _.enumerable || !1, _.configurable = !0, "value" in _ && (_.writable = !0), Object.defineProperty(l, _.key, _);
          }
        }
        return function(l, m, d) {
          return m && p(l.prototype, m), d && p(l, d), l;
        };
      }();
      /**
       * @fileOverview Access a remote catalogue from a SOFA server, and get URLs
       * with filtering.
       *
       * @author Jean-Philippe.Lambert@ircam.fr
       * @copyright 2015-2016 IRCAM, Paris, France
       * @license BSD-3-Clause
       */
      var r = n("./parseXml"), c = h(r), f = n("./parseDataSet");
      function h(p) {
        return p && p.__esModule ? p : { default: p };
      }
      function o(p, l) {
        if (!(p instanceof l))
          throw new TypeError("Cannot call a class as a function");
      }
      var v = i.ServerDataBase = function() {
        function p() {
          var l = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
          if (o(this, p), this._server = l.serverUrl, typeof this._server > "u") {
            var m = window.location.protocol === "https:" ? "https:" : "http:";
            this._server = m + "//bili2.ircam.fr";
          }
          this._catalogue = {}, this._urls = [];
        }
        return s(p, [{
          key: "loadCatalogue",
          value: function() {
            var m = this, d = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this._server + "/catalog.xml", _ = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this._catalogue, D = new Promise(function(q, F) {
              var x = new window.XMLHttpRequest();
              x.open("GET", d), x.onerror = function() {
                F(new Error("Unable to GET " + d + ", status " + x.status + " " + ("" + x.responseText)));
              }, x.onload = function() {
                if (x.status < 200 || x.status >= 300) {
                  x.onerror();
                  return;
                }
                var N = (0, c.default)(x.response), R = N.querySelector("dataset"), I = N.querySelectorAll("dataset > catalogRef");
                if (I.length === 0) {
                  _.urls = [];
                  for (var u = N.querySelectorAll("dataset > dataset"), b = 0; b < u.length; ++b) {
                    var Z = m._server + R.getAttribute("name") + "/" + u[b].getAttribute("name");
                    m._urls.push(Z), _.urls.push(Z);
                  }
                  q(d);
                } else {
                  for (var G = [], J = 0; J < I.length; ++J) {
                    var r0 = I[J].getAttribute("name"), s0 = m._server + R.getAttribute("name") + "/" + I[J].getAttribute("xlink:href");
                    _[r0] = {}, G.push(m.loadCatalogue(s0, _[r0]));
                  }
                  Promise.all(G).then(function() {
                    m._urls.sort(), q(d);
                  }).catch(function(C0) {
                    F(C0);
                  });
                }
              }, x.send();
            });
            return D;
          }
          /**
           * Get URLs, possibly filtered.
           *
           * Any filter can be partial, and is case-insensitive. The result must
           * match every supplied filter. Undefined filters are not applied. For
           * any filter, `|` is the or operator.
           *
           * @param {Object} [options] optional filters
           * @param {String} [options.convention] 'HRIR' or 'SOS'
           * @param {String} [options.dataBase] 'LISTEN', 'BILI', etc.
           * @param {String} [options.equalisation] 'RAW','COMPENSATED'
           * @param {String} [options.sampleRate] in Hertz
           * @param {String} [options.sosOrder] '12order' or '24order'
           * @param {String} [options.freePattern] any pattern matched
           * globally. Use separators (spaces, tabs, etc.) to combine multiple
           * patterns: '44100 listen' will restrict on URLs matching '44100' and
           * 'listen'; '44100|48000 bili|listen' matches ('44100' or '48000') and
           * ('bili' or 'listen').
           * @returns {Array.<String>} URLs that match every filter.
           */
        }, {
          key: "getUrls",
          value: function() {
            var m = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, d = [m.convention, m.dataBase, m.equalisation, m.sampleRate, m.sosOrder], _ = typeof m.freePattern == "number" ? m.freePattern.toString() : m.freePattern, D = d.reduce(function(N, R) {
              return N + "/" + (typeof R < "u" ? "[^/]*(?:" + R + ")[^/]*" : "[^/]*");
            }, ""), q = new RegExp(D, "i"), F = this._urls.filter(function(N) {
              return q.test(N);
            });
            if (typeof _ < "u") {
              var x = _.split(/\s+/);
              x.forEach(function(N) {
                q = new RegExp(N, "i"), F = F.filter(function(R) {
                  return q.test(R);
                });
              });
            }
            return F;
          }
          /**
           * Get the data-set definitions of a given URL.
           *
           * @param {String} sourceUrl is the complete SOFA URL, with the
           * server, like
           * 'http://bili2.ircam.fr/SimpleFreeFieldHRIR/BILI/COMPENSATED/44100/IRC_1100_C_HRIR.sofa'
           *
           * @returns {Promise.<Object|String>} The promise will resolve after
           * successfully loading, with definitions as * `{definition: {key: values}}`
           * objects; the promise will reject is the transfer fails, with an error.
           */
        }, {
          key: "getDataSetDefinitions",
          value: function(m) {
            var d = new Promise(function(_, D) {
              var q = m + ".dds", F = new window.XMLHttpRequest();
              F.open("GET", q), F.onerror = function() {
                D(new Error("Unable to GET " + q + ", status " + F.status + " " + ("" + F.responseText)));
              }, F.onload = function() {
                if (F.status < 200 || F.status >= 300) {
                  F.onerror();
                  return;
                }
                _((0, f.parseDataSet)(F.response));
              }, F.send();
            });
            return d;
          }
          /**
           * Get all source positions of a given URL.
           *
           * @param {String} sourceUrl is the complete SOFA URL, with the
           * server, like
           * 'http://bili2.ircam.fr/SimpleFreeFieldHRIR/BILI/COMPENSATED/44100/IRC_1100_C_HRIR.sofa'
           *
           * @returns {Promise.<Array<Array.<Number>>|Error>} The promise will resolve
           * after successfully loading, with an array of positions (which are
           * arrays of 3 numbers); the promise will reject is the transfer fails,
           * with an error.
           */
        }, {
          key: "getSourcePositions",
          value: function(m) {
            var d = new Promise(function(_, D) {
              var q = m + ".json?SourcePosition", F = new window.XMLHttpRequest();
              F.open("GET", q), F.onerror = function() {
                D(new Error("Unable to GET " + q + ", status " + F.status + " " + ("" + F.responseText)));
              }, F.onload = function() {
                if (F.status < 200 || F.status >= 300) {
                  F.onerror();
                  return;
                }
                try {
                  var x = JSON.parse(F.response);
                  if (x.leaves[0].name !== "SourcePosition")
                    throw new Error("SourcePosition not found");
                  _(x.leaves[0].data);
                } catch (N) {
                  D(new Error("Unable to parse response from " + q + ". " + N.message));
                }
              }, F.send();
            });
            return d;
          }
        }]), p;
      }();
      i.default = v;
    }, { "./parseDataSet": 19, "./parseXml": 21 }], 19: [function(n, e, i) {
      Object.defineProperty(i, "__esModule", {
        value: !0
      }), i._parseDimension = l, i._parseDefinition = m, i.parseDataSet = d;
      /**
       * @fileOverview Parser for DDS files
       * @author Jean-Philippe.Lambert@ircam.fr
       * @copyright 2015-2016 IRCAM, Paris, France
       * @license BSD-3-Clause
       */
      var s = "\\[\\s*(\\w+)\\s*=\\s*(\\d+)\\s*\\]", r = new RegExp(s, "g"), c = new RegExp(s), f = "\\s*(\\w+)\\s*([\\w.]+)\\s*((?:\\[[^\\]]+\\]\\s*)+);\\s*", h = new RegExp(f, "g"), o = new RegExp(f), v = "\\s*Dataset\\s*\\{\\s*((?:[^;]+;\\s*)*)\\s*\\}\\s*[\\w.]+\\s*;\\s*", p = new RegExp(v);
      function l(_) {
        var D = [], q = _.match(r);
        return q !== null && q.forEach(function(F) {
          var x = c.exec(F);
          x !== null && x.length > 2 && D.push([x[1], Number(x[2])]);
        }), D;
      }
      function m(_) {
        var D = [], q = _.match(h);
        return q !== null && q.forEach(function(F) {
          var x = o.exec(F);
          if (x !== null && x.length > 3) {
            var N = [];
            N[0] = x[2], N[1] = {}, N[1].type = x[1], l(x[3]).forEach(function(R) {
              N[1][R[0]] = R[1];
            }), D.push(N);
          }
        }), D;
      }
      function d(_) {
        var D = {}, q = p.exec(_);
        return q !== null && q.length > 1 && m(q[1]).forEach(function(F) {
          D[F[0]] = F[1];
        }), D;
      }
      i.default = d;
    }, {}], 20: [function(n, e, i) {
      Object.defineProperty(i, "__esModule", {
        value: !0
      }), i.parseSofa = s, i.stringifySofa = r, i.conformSofaCoordinateSystem = c;
      /**
       * @fileOverview Parser functions for SOFA files
       * @author Jean-Philippe.Lambert@ircam.fr
       * @copyright 2015 IRCAM, Paris, France
       * @license BSD-3-Clause
       */
      function s(f) {
        try {
          var h = JSON.parse(f), o = {};
          if (o.name = h.name, typeof h.attributes < "u") {
            o.metaData = {};
            var v = h.attributes.find(function(l) {
              return l.name === "NC_GLOBAL";
            });
            typeof v < "u" && v.attributes.forEach(function(l) {
              o.metaData[l.name] = l.value[0];
            });
          }
          if (typeof h.leaves < "u") {
            var p = h.leaves;
            p.forEach(function(l) {
              o[l.name] = {}, l.attributes.forEach(function(m) {
                o[l.name][m.name] = m.value[0];
              }), o[l.name].shape = l.shape, o[l.name].data = l.data;
            });
          }
          return o;
        } catch (l) {
          throw new Error("Unable to parse SOFA string. " + l.message);
        }
      }
      function r(f) {
        var h = {};
        if (typeof f.name < "u" && (h.name = f.name), typeof f.metaData < "u") {
          h.attributes = [];
          var o = {
            name: "NC_GLOBAL",
            attributes: []
          };
          for (var v in f.metaData)
            f.metaData.hasOwnProperty(v) && o.attributes.push({
              name: v,
              value: [f.metaData[v]]
            });
          h.attributes.push(o);
        }
        var p = "Float64", l = void 0;
        if (h.leaves = [], [["ListenerPosition", "ListenerPositionType"], ["ListenerUp", "ListenerUpType"], ["ListenerView", "ListenerViewType"]].forEach(function(m) {
          var d = m[0], _ = f[d], D = f[m[1]];
          if (typeof _ < "u") {
            switch (D) {
              case "cartesian":
                l = [{ name: "Type", value: ["cartesian"] }, { name: "Units", value: ["metre, metre, metre"] }];
                break;
              case "spherical":
                l = [{ name: "Type", value: ["spherical"] }, { name: "Units", value: ["degree, degree, metre"] }];
                break;
              default:
                throw new Error("Unknown coordinate system type " + (D + " for " + _));
            }
            h.leaves.push({
              name: d,
              type: p,
              attributes: l,
              shape: [1, 3],
              data: [_]
            });
          }
        }), typeof f.SourcePosition < "u") {
          switch (f.SourcePositionType) {
            case "cartesian":
              l = [{ name: "Type", value: ["cartesian"] }, { name: "Units", value: ["metre, metre, metre"] }];
              break;
            case "spherical":
              l = [{ name: "Type", value: ["spherical"] }, { name: "Units", value: ["degree, degree, metre"] }];
              break;
            default:
              throw new Error("Unknown coordinate system type " + ("" + f.SourcePositionType));
          }
          h.leaves.push({
            name: "SourcePosition",
            type: p,
            attributes: l,
            shape: [f.SourcePosition.length, f.SourcePosition[0].length],
            data: f.SourcePosition
          });
        }
        if (typeof f.DataSamplingRate < "u")
          h.leaves.push({
            name: "Data.SamplingRate",
            type: p,
            attributes: [{ name: "Unit", value: "hertz" }],
            shape: [1],
            data: [f.DataSamplingRate]
          });
        else
          throw new Error("No data sampling-rate");
        if (typeof f.DataDelay < "u" && h.leaves.push({
          name: "Data.Delay",
          type: p,
          attributes: [],
          shape: [1, f.DataDelay.length],
          data: f.DataDelay
        }), typeof f.DataIR < "u")
          h.leaves.push({
            name: "Data.IR",
            type: p,
            attributes: [],
            shape: [f.DataIR.length, f.DataIR[0].length, f.DataIR[0][0].length],
            data: f.DataIR
          });
        else
          throw new Error("No data IR");
        return typeof f.RoomVolume < "u" && h.leaves.push({
          name: "RoomVolume",
          type: p,
          attributes: [{ name: "Units", value: ["cubic metre"] }],
          shape: [1],
          data: [f.RoomVolume]
        }), h.nodes = [], JSON.stringify(h);
      }
      function c(f) {
        var h = void 0;
        switch (f) {
          case "cartesian":
            h = "sofaCartesian";
            break;
          case "spherical":
            h = "sofaSpherical";
            break;
          default:
            throw new Error("Bad SOFA type " + f);
        }
        return h;
      }
      i.default = {
        parseSofa: s,
        conformSofaCoordinateSystem: c
      };
    }, {}], 21: [function(n, e, i) {
      Object.defineProperty(i, "__esModule", {
        value: !0
      });
      /**
       * @fileOverview Simple XML parser, as a DOM parser.
       * @author Jean-Philippe.Lambert@ircam.fr
       * @copyright 2015-2016 IRCAM, Paris, France
       * @license BSD-3-Clause
       */
      var s = i.parseXml = void 0;
      if (typeof window.DOMParser < "u")
        i.parseXml = s = function(c) {
          return new window.DOMParser().parseFromString(c, "text/xml");
        };
      else if (typeof window.ActiveXObject < "u" && new window.ActiveXObject("Microsoft.XMLDOM"))
        i.parseXml = s = function(c) {
          var f = new window.ActiveXObject("Microsoft.XMLDOM");
          return f.async = "false", f.loadXML(c), f;
        };
      else
        throw new Error("No XML parser found");
      i.default = s;
    }, {}] }, {}, [15])(15);
  });
})(serveSofaHrir);
var serveSofaHrirExports = serveSofaHrir.exports, utils$1 = require("./utils.js");
class HRIRloader_ircam {
  constructor(t, n, e) {
    this.context = t, this.order = n, this.nCh = (n + 1) * (n + 1), this.onLoad = e, this.hrtfSet = new serveSofaHrirExports.HrtfSet({ audioContext: this.context, coordinateSystem: "sofaSpherical" }), this.wishedSpeakerPos = utils$1.getTdesign(2 * this.order);
  }
  load(t) {
    this.hrtfSet.load(t).then(() => {
      let n = [];
      this.hrirBuffer = [];
      for (let i = 0; i < this.wishedSpeakerPos.length; i++)
        n.push(this.hrtfSet.nearest(this.wishedSpeakerPos[i]).position), this.hrirBuffer.push(this.hrtfSet.nearest(this.wishedSpeakerPos[i]).fir);
      let e = 0;
      for (let i = 0; i < this.wishedSpeakerPos.length; i++)
        this.wishedSpeakerPos[i][0] < 0 && (this.wishedSpeakerPos[i][0] += 360), e += Math.sqrt(
          Math.pow(this.wishedSpeakerPos[i][0] - n[i][0], 2) + Math.pow(this.wishedSpeakerPos[i][1] - n[i][1], 2)
        );
      console.log(
        "summed / average angular dist between asked and present pos:",
        Math.round(e * 100) / 100,
        "deg /",
        Math.round(e / this.wishedSpeakerPos.length * 100) / 100,
        "deg"
      ), this.decodingMatrix = utils$1.getAmbisonicDecMtx(n, this.order), this.hoaBuffer = this.getHoaFilterFromHrirFilter(), this.onLoad(this.hoaBuffer);
    });
  }
  getHoaFilterFromHrirFilter() {
    let t = this.hrirBuffer[0].length, n = this.hrirBuffer[0].sampleRate, e = this.context.createBuffer(this.nCh, t, n);
    for (let i = 0; i < this.nCh; i++) {
      let s = new Float32Array(t);
      for (let r = 0; r < this.hrirBuffer.length; r++)
        for (let c = 0; c < t; c++)
          s[c] += this.decodingMatrix[r][i] * this.hrirBuffer[r].getChannelData(0)[c];
      e.getChannelData(i).set(s);
    }
    return e;
  }
}
class wxyz2acn {
  constructor(t) {
    this.ctx = t, this.in = this.ctx.createChannelSplitter(4), this.out = this.ctx.createChannelMerger(4), this.gains = new Array(4);
    for (var n = 0; n < 4; n++)
      this.gains[n] = this.ctx.createGain(), n == 0 ? this.gains[n].gain.value = Math.SQRT2 : this.gains[n].gain.value = Math.sqrt(3), this.gains[n].connect(this.out, 0, n);
    this.in.connect(this.gains[0], 0, 0), this.in.connect(this.gains[3], 1, 0), this.in.connect(this.gains[1], 2, 0), this.in.connect(this.gains[2], 3, 0);
  }
}
class acn2wxyz {
  constructor(t) {
    this.ctx = t, this.in = this.ctx.createChannelSplitter(4), this.out = this.ctx.createChannelMerger(4), this.gains = new Array(4);
    for (var n = 0; n < 4; n++)
      this.gains[n] = this.ctx.createGain(), n == 0 ? this.gains[n].gain.value = Math.SQRT1_2 : this.gains[n].gain.value = 1 / Math.sqrt(3), this.gains[n].connect(this.out, 0, n);
    this.in.connect(this.gains[0], 0, 0), this.in.connect(this.gains[2], 1, 0), this.in.connect(this.gains[3], 2, 0), this.in.connect(this.gains[1], 3, 0);
  }
}
class sn3d2n3d {
  constructor(t, n) {
    this.ctx = t, this.order = n, this.nCh = (n + 1) * (n + 1), this.in = this.ctx.createChannelSplitter(this.nCh), this.out = this.ctx.createChannelMerger(this.nCh), this.gains = new Array(this.nCh);
    for (var e = 0; e < this.nCh; e++) {
      var i = Math.floor(Math.sqrt(e));
      this.gains[e] = this.ctx.createGain(), this.gains[e].gain.value = Math.sqrt(2 * i + 1), this.in.connect(this.gains[e], e, 0), this.gains[e].connect(this.out, 0, e);
    }
  }
}
class n3d2sn3d {
  constructor(t, n) {
    this.ctx = t, this.order = n, this.nCh = (n + 1) * (n + 1), this.in = this.ctx.createChannelSplitter(this.nCh), this.out = this.ctx.createChannelMerger(this.nCh), this.gains = new Array(this.nCh);
    for (var e = 0; e < this.nCh; e++) {
      var i = Math.floor(Math.sqrt(e));
      this.gains[e] = this.ctx.createGain(), this.gains[e].gain.value = 1 / Math.sqrt(2 * i + 1), this.in.connect(this.gains[e], e, 0), this.gains[e].connect(this.out, 0, e);
    }
  }
}
class fuma2acn {
  constructor(t, n) {
    n > 3 && (console.log("FuMa specifiction is supported up to 3rd order"), n = 3);
    var e = [
      Math.sqrt(2),
      // W
      Math.sqrt(3),
      // Y
      Math.sqrt(3),
      // Z
      Math.sqrt(3),
      // X
      Math.sqrt(15) / 2,
      // V
      Math.sqrt(15) / 2,
      // T
      Math.sqrt(5),
      // R
      Math.sqrt(15) / 2,
      // S
      Math.sqrt(15) / 2,
      // U
      Math.sqrt(35 / 8),
      // Q
      Math.sqrt(35) / 3,
      // O
      Math.sqrt(224 / 45),
      // M
      Math.sqrt(7),
      // K
      Math.sqrt(224 / 45),
      // L
      Math.sqrt(35) / 3,
      // N
      Math.sqrt(35 / 8)
    ];
    if (this.ctx = t, this.order = n, this.nCh = (n + 1) * (n + 1), this.in = this.ctx.createChannelSplitter(this.nCh), this.out = this.ctx.createChannelMerger(this.nCh), this.gains = [], this.remapArray = [], this.remapArray.push(0, 2, 3, 1), n > 1) {
      for (var i = 0, s, r = 0; r < this.nCh; r++)
        if (s = [], r >= (i + 1) * (i + 1)) {
          i += 1;
          for (var c = (i + 1) * (i + 1); c < (i + 2) * (i + 2); c++)
            (c + i % 2) % 2 == 0 ? s.push(c) : s.unshift(c);
          this.remapArray = this.remapArray.concat(s);
        }
    }
    for (var r = 0; r < this.nCh; r++)
      this.gains[r] = this.ctx.createGain(), this.gains[r].gain.value = e[r], this.in.connect(this.gains[r], this.remapArray[r], 0), this.gains[r].connect(this.out, 0, r);
  }
}
const _converters = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  acn2wxyz,
  fuma2acn,
  n3d2sn3d,
  sn3d2n3d,
  wxyz2acn
}, Symbol.toStringTag, { value: "Module" }));
var numeric$1 = require("numeric"), jshlib = require("spherical-harmonic-transform"), convexhull = require("convex-hull");
function deg2rad(S) {
  var t = [], n = Math.PI / 180;
  for (let e = 0; e < S.length; e++)
    S[0].length == 3 ? t.push([
      S[e][0] * n,
      S[e][1] * n,
      S[e][2]
    ]) : S[0].length == 2 && t.push([
      S[e][0] * n,
      S[e][1] * n
    ]);
  return t;
}
function rad2deg(S) {
  var t = [], n = 180 / Math.PI;
  for (let e = 0; e < S.length; e++)
    S[0].length == 3 ? t.push([
      S[e][0] * n,
      S[e][1] * n,
      S[e][2]
    ]) : S[0].length == 2 && t.push([
      S[e][0] * n,
      S[e][1] * n
    ]);
  return t;
}
function getColumn(S, t) {
  return S.map(function(n) {
    return n[t];
  });
}
function sampleCircle(S) {
  for (var t = [], n = 360 / S, e = 0, i = 0; i < S; i++)
    t.push([e, 0, 1]), e += n;
  return t;
}
function getCircHarmonics(S, t) {
  var n = S, e = 2 * n + 1, i = t.length, s = new Array(e), r = new Array(i);
  t = numeric$1.mul(t, Math.PI / 180), r.fill(1 / Math.sqrt(2 * Math.PI)), s[0] = r;
  for (var c = 0; c < n; c++)
    s[2 * c + 1] = numeric$1.div(numeric$1.sin(numeric$1.mul(-(c + 1), t)), Math.sqrt(Math.PI)), s[2 * c + 2] = numeric$1.div(numeric$1.cos(numeric$1.mul(c + 1, t)), Math.sqrt(Math.PI));
  return s;
}
function getAmbisonicDecMtx(S, t) {
  var n = deg2rad(S), e = jshlib.convertSph2Cart(n), i = convexhull(e), s = i.length, r = n.length, c = new Array(s);
  for (let m = 0; m < s; m++) {
    let d = new Array(3);
    for (let q = 0; q < 3; q++)
      d[q] = e[i[m][q]];
    let _ = numeric$1.inv(d), D = [];
    for (let q = 0; q < 3; q++)
      for (let F = 0; F < 3; F++)
        D.push(_[F][q]);
    c[m] = D;
  }
  var f = getTdesign(2 * t), h = deg2rad(f), o = vbap3(h, i, c, r);
  o = numeric$1.transpose(o);
  var v = jshlib.computeRealSH(t, h);
  v = numeric$1.transpose(v);
  var p = h.length, l = numeric$1.dotMMsmall(o, v);
  return l = numeric$1.mul(1 / p, l), l;
}
var vbap3 = function(S, t, n, e) {
  var i = S.length, s = e, r = t.length;
  function c(o) {
    return Math.min.apply(null, o);
  }
  var f = new Array(i), h = jshlib.convertSph2Cart(S);
  for (let o = 0; o < i; o++) {
    let v = h[o], p = new Array(s);
    p.fill(0);
    for (let d = 0; d < r; d++) {
      let _ = [], D = [n[d][0], n[d][1], n[d][2]];
      if (_[0] = numeric$1.dotVV(D, v), D = [n[d][3], n[d][4], n[d][5]], _[1] = numeric$1.dotVV(D, v), D = [n[d][6], n[d][7], n[d][8]], _[2] = numeric$1.dotVV(D, v), c(_) > -1e-3) {
        let q = Math.sqrt(numeric$1.sum(numeric$1.pow(_, 2))), F = numeric$1.div(_, q);
        for (let x = 0; x < 3; x++)
          p[t[d][x]] = F[x];
        break;
      }
    }
    let l = Math.sqrt(numeric$1.sum(numeric$1.pow(p, 2))), m = numeric$1.div(p, l);
    f[o] = m;
  }
  return f;
};
function createNearestLookup(S, t) {
  var n = S.length, e = jshlib.convertSph2Cart(deg2rad(S)), i = Math.round(360 / t[0]) + 1, s = Math.round(180 / t[1]) + 1, r = new Array(i);
  r[0] = -180;
  for (let h = 1; h < i; h++)
    r[h] = r[h - 1] + t[0];
  var c = i * s, f = new Array(c);
  for (let h = 0; h < c; h++) {
    let o = [[h % i * t[0] - 180, Math.floor(h / i) * t[1] - 90]], v = jshlib.convertSph2Cart(deg2rad(o)), p = 1e3;
    for (let l = 0; l < n; l++) {
      let m = numeric$1.sum(numeric$1.pow(numeric$1.sub(v[0], e[l]), 2));
      m < p && (f[h] = l, p = m);
    }
  }
  return f;
}
function findNearest(S, t, n) {
  var e = S.length, i = [], s = [];
  for (let v = 0; v < e; v++)
    i.push(S[v][0] + 180), s.push(S[v][1] + 90);
  var r = Math.round(360 / n[0]) + 1, c = numeric$1.round(numeric$1.div(numeric$1.mod(i, 360), n[0])), f = numeric$1.round(numeric$1.div(s, n[1])), h = numeric$1.add(numeric$1.mul(f, r), c, 1), o = [];
  for (let v = 0; v < e; v++)
    o.push(t[h[v]]);
  return o;
}
function getTdesign(S) {
  if (S > 21)
    throw new Error("Designs of order greater than 21 are not implemented");
  if (S < 1)
    throw new Error("Order should be at least 1");
  var t = [
    [
      [0, 0, 1],
      [180, 0, 1]
    ],
    [
      [45, 35.26, 1],
      [-45, -35.26, 1],
      [135, -35.26, 1],
      [-135, 35.26, 1]
    ],
    [
      [0, 0, 1],
      [180, 0, 1],
      [90, 0, 1],
      [-90, 0, 1],
      [0, 90, 1],
      [0, -90, 1]
    ],
    [
      [0, -31.72, 1],
      [-58.28, 0, 1],
      [-90, 58.28, 1],
      [0, 31.72, 1],
      [-121.72, 0, 1],
      [90, -58.28, 1],
      [180, -31.72, 1],
      [121.72, 0, 1],
      [90, 58.28, 1],
      [180, 31.72, 1],
      [58.28, 0, 1],
      [-90, -58.28, 1]
    ],
    [
      [0, -31.72, 1],
      [-58.28, 0, 1],
      [-90, 58.28, 1],
      [0, 31.72, 1],
      [-121.72, 0, 1],
      [90, -58.28, 1],
      [180, -31.72, 1],
      [121.72, 0, 1],
      [90, 58.28, 1],
      [180, 31.72, 1],
      [58.28, 0, 1],
      [-90, -58.28, 1]
    ],
    [
      [26, 15.46, 1],
      [-26, -15.46, 1],
      [17.11, -24.99, 1],
      [-17.11, 24.99, 1],
      [154, -15.46, 1],
      [-154, 15.46, 1],
      [162.89, 24.99, 1],
      [-162.89, -24.99, 1],
      [72.89, 24.99, 1],
      [107.11, -24.99, 1],
      [116, 15.46, 1],
      [64, -15.46, 1],
      [-107.11, 24.99, 1],
      [-72.89, -24.99, 1],
      [-64, 15.46, 1],
      [-116, -15.46, 1],
      [32.25, 60.03, 1],
      [-147.75, 60.03, 1],
      [-57.75, 60.03, 1],
      [122.25, 60.03, 1],
      [-32.25, -60.03, 1],
      [147.75, -60.03, 1],
      [57.75, -60.03, 1],
      [-122.25, -60.03, 1]
    ],
    [
      [26, 15.46, 1],
      [-26, -15.46, 1],
      [17.11, -24.99, 1],
      [-17.11, 24.99, 1],
      [154, -15.46, 1],
      [-154, 15.46, 1],
      [162.89, 24.99, 1],
      [-162.89, -24.99, 1],
      [72.89, 24.99, 1],
      [107.11, -24.99, 1],
      [116, 15.46, 1],
      [64, -15.46, 1],
      [-107.11, 24.99, 1],
      [-72.89, -24.99, 1],
      [-64, 15.46, 1],
      [-116, -15.46, 1],
      [32.25, 60.03, 1],
      [-147.75, 60.03, 1],
      [-57.75, 60.03, 1],
      [122.25, 60.03, 1],
      [-32.25, -60.03, 1],
      [147.75, -60.03, 1],
      [57.75, -60.03, 1],
      [-122.25, -60.03, 1]
    ],
    [
      [-31.11, 53.65, 1],
      [110.82, 30.5, 1],
      [148.89, 53.65, 1],
      [32.21, -17.83, 1],
      [69.18, -30.5, 1],
      [-32.21, 17.83, 1],
      [-69.18, 30.5, 1],
      [-147.79, -17.83, 1],
      [-110.82, -30.5, 1],
      [147.79, 17.83, 1],
      [31.11, -53.65, 1],
      [-148.89, -53.65, 1],
      [-21.25, -47.78, 1],
      [-108.2, 38.78, 1],
      [158.75, -47.78, 1],
      [139.77, -14.09, 1],
      [-71.8, -38.78, 1],
      [-139.77, 14.09, 1],
      [71.8, 38.78, 1],
      [-40.23, -14.09, 1],
      [108.2, -38.78, 1],
      [40.23, 14.09, 1],
      [21.25, 47.78, 1],
      [-158.75, 47.78, 1],
      [106.65, -2.55, 1],
      [-2.66, -16.63, 1],
      [-73.35, -2.55, 1],
      [-98.84, 73.16, 1],
      [-177.34, 16.63, 1],
      [98.84, -73.16, 1],
      [177.34, -16.63, 1],
      [81.16, 73.16, 1],
      [2.66, 16.63, 1],
      [-81.16, -73.16, 1],
      [-106.65, 2.55, 1],
      [73.35, 2.55, 1]
    ],
    [
      [20.75, -3.55, 1],
      [-20.75, 3.55, 1],
      [-3.8, -20.7, 1],
      [3.8, 20.7, 1],
      [159.25, 3.55, 1],
      [-159.25, -3.55, 1],
      [-176.2, 20.7, 1],
      [176.2, -20.7, 1],
      [93.8, 20.7, 1],
      [86.2, -20.7, 1],
      [110.75, -3.55, 1],
      [69.25, 3.55, 1],
      [-86.2, 20.7, 1],
      [-93.8, -20.7, 1],
      [-69.25, -3.55, 1],
      [-110.75, 3.55, 1],
      [-9.94, 68.97, 1],
      [170.06, 68.97, 1],
      [-99.94, 68.97, 1],
      [80.06, 68.97, 1],
      [9.94, -68.97, 1],
      [-170.06, -68.97, 1],
      [99.94, -68.97, 1],
      [-80.06, -68.97, 1],
      [42.15, 17.57, 1],
      [-42.15, -17.57, 1],
      [23.12, -39.77, 1],
      [-23.12, 39.77, 1],
      [137.85, -17.57, 1],
      [-137.85, 17.57, 1],
      [156.88, 39.77, 1],
      [-156.88, -39.77, 1],
      [66.88, 39.77, 1],
      [113.12, -39.77, 1],
      [132.15, 17.57, 1],
      [47.85, -17.57, 1],
      [-113.12, 39.77, 1],
      [-66.88, -39.77, 1],
      [-47.85, 17.57, 1],
      [-132.15, -17.57, 1],
      [25.26, 44.98, 1],
      [-154.74, 44.98, 1],
      [-64.74, 44.98, 1],
      [115.26, 44.98, 1],
      [-25.26, -44.98, 1],
      [154.74, -44.98, 1],
      [64.74, -44.98, 1],
      [-115.26, -44.98, 1]
    ],
    [
      [144.09, -21.45, 1],
      [-33.81, -48.92, 1],
      [-35.91, -21.45, 1],
      [-115.87, 33.09, 1],
      [-146.19, 48.92, 1],
      [115.87, -33.09, 1],
      [146.19, -48.92, 1],
      [64.13, 33.09, 1],
      [33.81, 48.92, 1],
      [-64.13, -33.09, 1],
      [-144.09, 21.45, 1],
      [35.91, 21.45, 1],
      [-45.53, 1.95, 1],
      [177.26, 44.44, 1],
      [134.47, 1.95, 1],
      [87.21, -45.49, 1],
      [2.74, -44.44, 1],
      [-87.21, 45.49, 1],
      [-2.74, 44.44, 1],
      [-92.79, -45.49, 1],
      [-177.26, -44.44, 1],
      [92.79, 45.49, 1],
      [45.53, -1.95, 1],
      [-134.47, -1.95, 1],
      [15.59, -73.34, 1],
      [-85.4, 16.04, 1],
      [-164.41, -73.34, 1],
      [163.92, 4.42, 1],
      [-94.6, -16.04, 1],
      [-163.92, -4.42, 1],
      [94.6, 16.04, 1],
      [-16.08, 4.42, 1],
      [85.4, -16.04, 1],
      [16.08, -4.42, 1],
      [-15.59, 73.34, 1],
      [164.41, 73.34, 1],
      [-60.02, 25.27, 1],
      [151.41, 26.86, 1],
      [119.98, 25.27, 1],
      [46.63, -51.57, 1],
      [28.59, -26.86, 1],
      [-46.63, 51.57, 1],
      [-28.59, 26.86, 1],
      [-133.37, -51.57, 1],
      [-151.41, -26.86, 1],
      [133.37, 51.57, 1],
      [60.02, -25.27, 1],
      [-119.98, -25.27, 1],
      [-109.94, 6.91, 1],
      [172.65, -19.79, 1],
      [70.06, 6.91, 1],
      [-70.44, -68.94, 1],
      [7.35, 19.79, 1],
      [70.44, 68.94, 1],
      [-7.35, -19.79, 1],
      [109.56, -68.94, 1],
      [-172.65, 19.79, 1],
      [-109.56, 68.94, 1],
      [109.94, -6.91, 1],
      [-70.06, -6.91, 1]
    ],
    [
      [132.93, 7.69, 1],
      [-83.93, -23.73, 1],
      [8.47, 23.51, 1],
      [-113.34, 70.42, 1],
      [-103.27, -9.9, 1],
      [-33.24, -70.75, 1],
      [21.86, -26.46, 1],
      [-156.54, 47.78, 1],
      [-64.26, -7.72, 1],
      [165.78, 44.53, 1],
      [-25.2, 26.39, 1],
      [-97, -44.66, 1],
      [27.85, 9.77, 1],
      [153.21, -47.71, 1],
      [-155.06, 7.45, 1],
      [-11.84, -23.59, 1],
      [80.54, 23.72, 1],
      [-42.06, 70.44, 1],
      [-31.22, -9.84, 1],
      [38.84, -70.5, 1],
      [93.76, -26.29, 1],
      [-84.76, 47.61, 1],
      [7.76, -7.52, 1],
      [-122.28, 44.29, 1],
      [46.8, 26.64, 1],
      [-24.77, -44.57, 1],
      [99.89, 9.91, 1],
      [-134.78, -47.96, 1],
      [-83.09, 7.3, 1],
      [60.13, -23.34, 1],
      [152.64, 23.64, 1],
      [29.76, 70.68, 1],
      [40.78, -9.58, 1],
      [110.18, -70.39, 1],
      [165.65, -26.43, 1],
      [-12.99, 47.75, 1],
      [79.74, -7.31, 1],
      [-50.52, 44.26, 1],
      [118.92, 26.71, 1],
      [47.22, -44.31, 1],
      [171.93, 9.76, 1],
      [-62.51, -48.04, 1],
      [-11.12, 7.44, 1],
      [132.02, -23.33, 1],
      [-135.36, 23.39, 1],
      [102.37, 70.82, 1],
      [112.74, -9.49, 1],
      [-178.3, -70.58, 1],
      [-122.32, -26.67, 1],
      [59.08, 48, 1],
      [151.7, -7.38, 1],
      [21.38, 44.5, 1],
      [-169.01, 26.5, 1],
      [118.98, -44.25, 1],
      [-116.09, 9.52, 1],
      [9.65, -47.83, 1],
      [60.89, 7.68, 1],
      [-156.02, -23.57, 1],
      [-63.46, 23.31, 1],
      [174.93, 70.66, 1],
      [-175.29, -9.68, 1],
      [-105.95, -70.8, 1],
      [-50.19, -26.7, 1],
      [131.36, 48.01, 1],
      [-136.3, -7.64, 1],
      [93.56, 44.67, 1],
      [-97.08, 26.3, 1],
      [-169.16, -44.46, 1],
      [-44.13, 9.52, 1],
      [81.48, -47.62, 1]
    ],
    [
      [-154.47, 7.9, 1],
      [162.15, -63.36, 1],
      [25.53, 7.9, 1],
      [-81.26, -25.27, 1],
      [17.85, 63.36, 1],
      [81.26, 25.27, 1],
      [-17.85, -63.36, 1],
      [98.74, -25.27, 1],
      [-162.15, 63.36, 1],
      [-98.74, 25.27, 1],
      [154.47, -7.9, 1],
      [-25.53, -7.9, 1],
      [1.3, -10.47, 1],
      [-83.01, 79.45, 1],
      [-178.7, -10.47, 1],
      [100.48, 1.28, 1],
      [-96.99, -79.45, 1],
      [-100.48, -1.28, 1],
      [96.99, 79.45, 1],
      [-79.52, 1.28, 1],
      [83.01, -79.45, 1],
      [79.52, -1.28, 1],
      [-1.3, 10.47, 1],
      [178.7, 10.47, 1],
      [157.24, 13.15, 1],
      [31.14, -63.89, 1],
      [-22.76, 13.15, 1],
      [-75.78, 22.13, 1],
      [148.86, 63.89, 1],
      [75.78, -22.13, 1],
      [-148.86, -63.89, 1],
      [104.22, 22.13, 1],
      [-31.14, 63.89, 1],
      [-104.22, -22.13, 1],
      [-157.24, -13.15, 1],
      [22.76, -13.15, 1],
      [110.44, -60.62, 1],
      [-62.18, -9.87, 1],
      [-69.56, -60.62, 1],
      [-168.88, 27.37, 1],
      [-117.82, 9.87, 1],
      [168.88, -27.37, 1],
      [117.82, -9.87, 1],
      [11.12, 27.37, 1],
      [62.18, 9.87, 1],
      [-11.12, -27.37, 1],
      [-110.44, 60.62, 1],
      [69.56, 60.62, 1],
      [-125.93, -47.4, 1],
      [-126.67, -23.4, 1],
      [54.07, -47.4, 1],
      [-151.65, -33.24, 1],
      [-53.33, 23.4, 1],
      [151.65, 33.24, 1],
      [53.33, -23.4, 1],
      [28.35, -33.24, 1],
      [126.67, 23.4, 1],
      [-28.35, 33.24, 1],
      [125.93, 47.4, 1],
      [-54.07, 47.4, 1],
      [61.41, 37.54, 1],
      [41.19, 22.3, 1],
      [-118.59, 37.54, 1],
      [31.92, 44.13, 1],
      [138.81, -22.3, 1],
      [-31.92, -44.13, 1],
      [-138.81, 22.3, 1],
      [-148.08, 44.13, 1],
      [-41.19, -22.3, 1],
      [148.08, -44.13, 1],
      [-61.41, -37.54, 1],
      [118.59, -37.54, 1],
      [132.92, 4.73, 1],
      [6.45, -42.74, 1],
      [-47.08, 4.73, 1],
      [-83.07, 46.87, 1],
      [173.55, 42.74, 1],
      [83.07, -46.87, 1],
      [-173.55, -42.74, 1],
      [96.93, 46.87, 1],
      [-6.45, 42.74, 1],
      [-96.93, -46.87, 1],
      [-132.92, -4.73, 1],
      [47.08, -4.73, 1]
    ],
    [
      [-40.36, 68.7, 1],
      [61.12, 65.68, 1],
      [141.73, 70.75, 1],
      [-131.25, 72.32, 1],
      [-154.88, -12.62, 1],
      [-66.2, -9.78, 1],
      [26.36, -11.97, 1],
      [114.95, -12.58, 1],
      [37.02, 51.13, 1],
      [129.77, 51.95, 1],
      [-140.63, 50.15, 1],
      [-56.5, 47.88, 1],
      [-65.05, 12.58, 1],
      [25.12, 12.62, 1],
      [113.8, 9.78, 1],
      [-153.64, 11.97, 1],
      [-134.51, -9.73, 1],
      [-46.23, -8.37, 1],
      [47.91, -9.73, 1],
      [141.51, -8.73, 1],
      [-17.84, -44.1, 1],
      [69.37, -43.27, 1],
      [151.22, -42.67, 1],
      [-106.78, -40.18, 1],
      [-50.23, -51.95, 1],
      [39.37, -50.15, 1],
      [123.5, -47.88, 1],
      [-142.98, -51.13, 1],
      [-179.19, -60.75, 1],
      [-84.57, -54.07, 1],
      [5.39, -58.05, 1],
      [89.5, -60.75, 1],
      [-145.98, 31.02, 1],
      [-54.39, 26.43, 1],
      [28.92, 32.51, 1],
      [125.34, 30.94, 1],
      [168.71, -7.06, 1],
      [-112.49, -10.38, 1],
      [-21.96, -9.6, 1],
      [73.11, -8.31, 1],
      [95.68, 0.04, 1],
      [-170.71, 2.32, 1],
      [-84.32, -0.04, 1],
      [9.29, -2.32, 1],
      [9.19, -34.33, 1],
      [98.21, -37.31, 1],
      [-179.2, -40.48, 1],
      [-77.81, -31.6, 1],
      [-177.08, -21.74, 1],
      [-93.77, -18.83, 1],
      [-2.72, -19.8, 1],
      [90.51, -20.91, 1],
      [-106.89, 8.31, 1],
      [-11.29, 7.06, 1],
      [67.51, 10.38, 1],
      [158.04, 9.6, 1],
      [-118.88, -65.68, 1],
      [-38.27, -70.75, 1],
      [48.75, -72.32, 1],
      [139.64, -68.7, 1],
      [-54.66, -30.94, 1],
      [34.02, -31.02, 1],
      [125.61, -26.43, 1],
      [-151.08, -32.51, 1],
      [-170.81, 34.33, 1],
      [-81.79, 37.31, 1],
      [0.8, 40.48, 1],
      [102.19, 31.6, 1],
      [-28.78, 42.67, 1],
      [73.22, 40.18, 1],
      [162.16, 44.1, 1],
      [-110.63, 43.27, 1],
      [-89.49, 20.91, 1],
      [2.92, 21.74, 1],
      [86.23, 18.83, 1],
      [177.28, 19.8, 1],
      [133.77, 8.37, 1],
      [-132.09, 9.73, 1],
      [-38.49, 8.73, 1],
      [45.49, 9.73, 1],
      [-25.6, 24.04, 1],
      [55.12, 30.23, 1],
      [149.3, 28.05, 1],
      [-118.71, 26.06, 1],
      [0.81, 60.75, 1],
      [95.43, 54.07, 1],
      [-174.61, 58.05, 1],
      [-90.5, 60.75, 1],
      [-124.88, -30.23, 1],
      [-30.7, -28.05, 1],
      [61.29, -26.06, 1],
      [154.4, -24.04, 1],
      [-132.92, -85.6, 1],
      [47.08, 85.6, 1]
    ],
    [
      [-129.19, 8.11, 1],
      [169.58, -38.73, 1],
      [50.81, 8.12, 1],
      [-77.27, -50.11, 1],
      [10.42, 38.73, 1],
      [77.3, 50.12, 1],
      [-10.41, -38.72, 1],
      [102.71, -50.11, 1],
      [-169.57, 38.72, 1],
      [-102.71, 50.11, 1],
      [129.19, -8.11, 1],
      [-50.8, -8.11, 1],
      [-4.59, -56.01, 1],
      [-93.1, 33.85, 1],
      [175.39, -56.03, 1],
      [146.11, -2.57, 1],
      [-86.89, -33.86, 1],
      [-146.1, 2.56, 1],
      [86.91, 33.86, 1],
      [-33.89, -2.57, 1],
      [93.1, -33.85, 1],
      [33.9, 2.58, 1],
      [4.6, 56.03, 1],
      [-175.38, 56.01, 1],
      [106.57, 26.1, 1],
      [27.07, -14.82, 1],
      [-73.44, 26.09, 1],
      [-30.2, 59.41, 1],
      [152.94, 14.83, 1],
      [30.2, -59.4, 1],
      [-152.93, -14.84, 1],
      [149.82, 59.41, 1],
      [-27.06, 14.83, 1],
      [-149.8, -59.42, 1],
      [-106.55, -26.1, 1],
      [73.44, -26.09, 1],
      [-171.42, 77.45, 1],
      [91.9, -12.4, 1],
      [8.54, 77.46, 1],
      [-12.4, -1.85, 1],
      [88.11, 12.41, 1],
      [12.41, 1.86, 1],
      [-88.1, -12.41, 1],
      [167.6, -1.86, 1],
      [-91.89, 12.4, 1],
      [-167.59, 1.84, 1],
      [171.43, -77.46, 1],
      [-8.52, -77.45, 1],
      [-122.73, -10.44, 1],
      [-167.65, -32.13, 1],
      [57.27, -10.43, 1],
      [-108.8, -55.83, 1],
      [-12.35, 32.13, 1],
      [108.83, 55.83, 1],
      [12.36, -32.12, 1],
      [71.19, -55.82, 1],
      [167.66, 32.12, 1],
      [-71.19, 55.82, 1],
      [122.74, 10.44, 1],
      [-57.27, 10.44, 1],
      [-135.84, -23.05, 1],
      [-148.58, -41.32, 1],
      [44.16, -23.04, 1],
      [-120.66, -39.88, 1],
      [-31.41, 41.31, 1],
      [120.68, 39.87, 1],
      [31.42, -41.3, 1],
      [59.33, -39.86, 1],
      [148.6, 41.31, 1],
      [-59.33, 39.87, 1],
      [135.85, 23.05, 1],
      [-44.16, 23.05, 1],
      [-161.55, 20.62, 1],
      [130.04, -62.6, 1],
      [18.45, 20.64, 1],
      [-68.35, -17.23, 1],
      [49.96, 62.61, 1],
      [68.36, 17.23, 1],
      [-49.93, -62.6, 1],
      [111.65, -17.22, 1],
      [-130.05, 62.59, 1],
      [-111.64, 17.22, 1],
      [161.56, -20.63, 1],
      [-18.44, -20.62, 1],
      [-105.23, -3.38, 1],
      [-176.5, -15.21, 1],
      [74.77, -3.37, 1],
      [-102.64, -74.41, 1],
      [-3.5, 15.21, 1],
      [102.69, 74.41, 1],
      [3.51, -15.2, 1],
      [77.33, -74.4, 1],
      [176.51, 15.2, 1],
      [-77.36, 74.4, 1],
      [105.24, 3.38, 1],
      [-74.76, 3.37, 1],
      [-142.39, 25.42, 1],
      [142.08, -45.69, 1],
      [37.61, 25.43, 1],
      [-59.02, -33.44, 1],
      [37.92, 45.69, 1],
      [59.04, 33.45, 1],
      [-37.91, -45.68, 1],
      [120.97, -33.44, 1],
      [-142.07, 45.68, 1],
      [-120.96, 33.44, 1],
      [142.4, -25.43, 1],
      [-37.6, -25.42, 1]
    ],
    [
      [-30.6, 6.94, 1],
      [166.56, 58.69, 1],
      [149.4, 6.96, 1],
      [81.95, -30.36, 1],
      [13.48, -58.69, 1],
      [-81.93, 30.36, 1],
      [-13.46, 58.68, 1],
      [-98.06, -30.37, 1],
      [-166.54, -58.68, 1],
      [98.07, 30.37, 1],
      [30.62, -6.95, 1],
      [-149.38, -6.95, 1],
      [106.69, -22.68, 1],
      [-23.57, -15.36, 1],
      [-73.31, -22.69, 1],
      [-145.5, 62.1, 1],
      [-156.41, 15.36, 1],
      [145.53, -62.1, 1],
      [156.43, -15.35, 1],
      [34.47, 62.11, 1],
      [23.58, 15.36, 1],
      [-34.46, -62.11, 1],
      [-106.67, 22.68, 1],
      [73.33, 22.69, 1],
      [166.82, 1.39, 1],
      [6.09, -76.74, 1],
      [-13.19, 1.38, 1],
      [-88.57, 13.18, 1],
      [173.99, 76.74, 1],
      [88.59, -13.18, 1],
      [-173.97, -76.73, 1],
      [91.43, 13.2, 1],
      [-6.07, 76.73, 1],
      [-91.42, -13.2, 1],
      [-166.8, -1.38, 1],
      [13.2, -1.39, 1],
      [-74.67, 48.11, 1],
      [130.86, 10.16, 1],
      [105.32, 48.13, 1],
      [13.34, -40.08, 1],
      [49.16, -10.15, 1],
      [-13.32, 40.07, 1],
      [-49.14, 10.15, 1],
      [-166.67, -40.08, 1],
      [-130.84, -10.16, 1],
      [166.69, 40.08, 1],
      [74.7, -48.11, 1],
      [-105.31, -48.13, 1],
      [-126.99, 26.55, 1],
      [147.96, -32.57, 1],
      [53, 26.56, 1],
      [-50.28, -45.59, 1],
      [32.05, 32.58, 1],
      [50.3, 45.59, 1],
      [-32.03, -32.58, 1],
      [129.71, -45.58, 1],
      [-147.94, 32.57, 1],
      [-129.69, 45.58, 1],
      [127.02, -26.55, 1],
      [-52.98, -26.56, 1],
      [-171.93, 30.37, 1],
      [103.47, -58.68, 1],
      [8.07, 30.36, 1],
      [-59.38, -6.96, 1],
      [76.54, 58.69, 1],
      [59.4, 6.95, 1],
      [-76.53, -58.69, 1],
      [120.62, -6.94, 1],
      [-103.44, 58.68, 1],
      [-120.6, 6.95, 1],
      [171.94, -30.36, 1],
      [-8.05, -30.37, 1],
      [40.86, 10.16, 1],
      [15.32, 48.12, 1],
      [-139.14, 10.16, 1],
      [76.68, 40.09, 1],
      [164.69, -48.12, 1],
      [-76.67, -40.09, 1],
      [-164.67, 48.12, 1],
      [-103.31, 40.07, 1],
      [-15.3, -48.13, 1],
      [103.34, -40.07, 1],
      [-40.84, -10.16, 1],
      [139.16, -10.15, 1],
      [103.2, -1.38, 1],
      [-1.41, -13.19, 1],
      [-76.8, -1.39, 1],
      [-96.02, 76.73, 1],
      [-178.57, 13.19, 1],
      [96.07, -76.73, 1],
      [178.58, -13.19, 1],
      [83.94, 76.74, 1],
      [1.43, 13.19, 1],
      [-83.95, -76.74, 1],
      [-103.18, 1.38, 1],
      [76.81, 1.39, 1],
      [37.02, -26.56, 1],
      [-39.7, 45.58, 1],
      [-142.99, -26.56, 1],
      [122.05, 32.58, 1],
      [-140.29, -45.59, 1],
      [-122.04, -32.58, 1],
      [140.31, 45.59, 1],
      [-57.95, 32.57, 1],
      [39.72, -45.58, 1],
      [57.97, -32.57, 1],
      [-37, 26.55, 1],
      [143, 26.56, 1],
      [163.33, 22.69, 1],
      [55.55, -62.1, 1],
      [-16.67, 22.68, 1],
      [-66.41, 15.35, 1],
      [124.49, 62.11, 1],
      [66.43, -15.35, 1],
      [-124.48, -62.11, 1],
      [113.58, 15.36, 1],
      [-55.52, 62.1, 1],
      [-113.57, -15.36, 1],
      [-163.31, -22.68, 1],
      [16.69, -22.69, 1]
    ],
    [
      [-10.57, -17.35, 1],
      [-120.42, 69.76, 1],
      [169.43, -17.35, 1],
      [107.63, -10.08, 1],
      [-59.57, -69.78, 1],
      [-107.63, 10.08, 1],
      [59.57, 69.78, 1],
      [-72.37, -10.09, 1],
      [120.42, -69.76, 1],
      [72.37, 10.09, 1],
      [10.57, 17.35, 1],
      [-169.43, 17.35, 1],
      [-30.77, 68.25, 1],
      [101.53, 18.57, 1],
      [149.25, 68.26, 1],
      [18.92, -10.92, 1],
      [78.47, -18.56, 1],
      [-18.92, 10.92, 1],
      [-78.47, 18.56, 1],
      [-161.09, -10.92, 1],
      [-101.53, -18.56, 1],
      [161.09, 10.92, 1],
      [30.78, -68.26, 1],
      [-149.26, -68.26, 1],
      [56.46, 41.26, 1],
      [46.46, 24.54, 1],
      [-123.53, 41.26, 1],
      [32.19, 38.8, 1],
      [133.53, -24.53, 1],
      [-32.19, -38.8, 1],
      [-133.53, 24.53, 1],
      [-147.8, 38.8, 1],
      [-46.46, -24.54, 1],
      [147.8, -38.8, 1],
      [-56.46, -41.27, 1],
      [123.53, -41.26, 1],
      [84.74, 27.31, 1],
      [27.41, 4.68, 1],
      [-95.26, 27.3, 1],
      [10.06, 62.23, 1],
      [152.59, -4.67, 1],
      [-10.06, -62.23, 1],
      [-152.59, 4.67, 1],
      [-169.92, 62.23, 1],
      [-27.4, -4.68, 1],
      [169.92, -62.22, 1],
      [-84.74, -27.31, 1],
      [95.26, -27.3, 1],
      [136.27, -0.73, 1],
      [-1.05, -46.27, 1],
      [-43.73, -0.74, 1],
      [-91.01, 43.72, 1],
      [-178.94, 46.27, 1],
      [91.01, -43.72, 1],
      [178.94, -46.27, 1],
      [88.99, 43.73, 1],
      [1.05, 46.27, 1],
      [-88.99, -43.73, 1],
      [-136.27, 0.73, 1],
      [43.73, 0.73, 1],
      [55.23, 10.82, 1],
      [13.09, 34.07, 1],
      [-124.77, 10.81, 1],
      [71.48, 53.8, 1],
      [166.91, -34.06, 1],
      [-71.48, -53.8, 1],
      [-166.9, 34.06, 1],
      [-108.52, 53.79, 1],
      [-13.09, -34.06, 1],
      [108.52, -53.79, 1],
      [-55.23, -10.82, 1],
      [124.77, -10.81, 1],
      [-105.49, -68.13, 1],
      [-111.15, -5.71, 1],
      [74.52, -68.12, 1],
      [-173.89, -21.04, 1],
      [-68.85, 5.7, 1],
      [173.89, 21.04, 1],
      [68.85, -5.7, 1],
      [6.12, -21.04, 1],
      [111.15, 5.71, 1],
      [-6.12, 21.04, 1],
      [105.49, 68.13, 1],
      [-74.52, 68.12, 1],
      [35.28, -15.18, 1],
      [-25.17, 51.98, 1],
      [-144.72, -15.19, 1],
      [108.39, 33.88, 1],
      [-154.84, -51.99, 1],
      [-108.39, -33.88, 1],
      [154.84, 51.99, 1],
      [-71.61, 33.87, 1],
      [25.17, -51.98, 1],
      [71.61, -33.87, 1],
      [-35.28, 15.18, 1],
      [144.72, 15.19, 1],
      [-125.28, -28.56, 1],
      [-146.32, -30.49, 1],
      [54.72, -28.55, 1],
      [-133.29, -45.82, 1],
      [-33.69, 30.48, 1],
      [133.3, 45.82, 1],
      [33.68, -30.48, 1],
      [46.71, -45.81, 1],
      [146.32, 30.49, 1],
      [-46.71, 45.81, 1],
      [125.28, 28.56, 1],
      [-54.72, 28.54, 1],
      [-144.4, 54.71, 1],
      [112.38, -28.01, 1],
      [35.58, 54.72, 1],
      [-29.92, -19.65, 1],
      [67.62, 28.02, 1],
      [29.92, 19.65, 1],
      [-67.62, -28.02, 1],
      [150.08, -19.64, 1],
      [-112.38, 28.01, 1],
      [-150.08, 19.64, 1],
      [144.4, -54.71, 1],
      [-35.58, -54.72, 1],
      [68.53, -52.85, 1],
      [-54.82, 12.76, 1],
      [-111.46, -52.87, 1],
      [164.51, 34.19, 1],
      [-125.18, -12.77, 1],
      [-164.51, -34.19, 1],
      [125.18, 12.77, 1],
      [-15.5, 34.19, 1],
      [54.82, -12.76, 1],
      [15.49, -34.19, 1],
      [-68.53, 52.85, 1],
      [111.47, 52.86, 1],
      [91.48, -7.37, 1],
      [-7.38, -1.47, 1],
      [-88.52, -7.38, 1],
      [-168.69, 82.47, 1],
      [-172.62, 1.47, 1],
      [168.69, -82.47, 1],
      [172.62, -1.46, 1],
      [11.22, 82.48, 1],
      [7.38, 1.47, 1],
      [-11.21, -82.48, 1],
      [-91.48, 7.37, 1],
      [88.52, 7.38, 1]
    ],
    [
      [-110.97, -81.34, 1],
      [-98.09, -3.09, 1],
      [69.03, -81.34, 1],
      [-176.88, -8.08, 1],
      [-81.91, 3.09, 1],
      [176.88, 8.08, 1],
      [81.91, -3.09, 1],
      [3.12, -8.08, 1],
      [98.09, 3.09, 1],
      [-3.12, 8.08, 1],
      [110.97, 81.34, 1],
      [-69.03, 81.34, 1],
      [145.76, 30.52, 1],
      [46.33, -45.41, 1],
      [-34.24, 30.52, 1],
      [-54.51, 28.99, 1],
      [133.67, 45.41, 1],
      [54.51, -28.99, 1],
      [-133.67, -45.41, 1],
      [125.49, 28.99, 1],
      [-46.33, 45.41, 1],
      [-125.49, -28.99, 1],
      [-145.76, -30.52, 1],
      [34.24, -30.52, 1],
      [159.58, 41.4, 1],
      [68.4, -44.67, 1],
      [-20.42, 41.4, 1],
      [-46.75, 15.18, 1],
      [111.6, 44.67, 1],
      [46.75, -15.18, 1],
      [-111.6, -44.67, 1],
      [133.25, 15.18, 1],
      [-68.4, 44.67, 1],
      [-133.25, -15.18, 1],
      [-159.58, -41.4, 1],
      [20.42, -41.4, 1],
      [85.43, -37.93, 1],
      [-38.02, 3.6, 1],
      [-94.57, -37.93, 1],
      [174.17, 51.83, 1],
      [-141.98, -3.6, 1],
      [-174.17, -51.83, 1],
      [141.98, 3.6, 1],
      [-5.83, 51.83, 1],
      [38.02, -3.6, 1],
      [5.83, -51.83, 1],
      [-85.43, 37.93, 1],
      [94.57, 37.93, 1],
      [21.18, 27.17, 1],
      [54.86, 56.05, 1],
      [-158.82, 27.17, 1],
      [61.17, 18.75, 1],
      [125.14, -56.05, 1],
      [-61.17, -18.75, 1],
      [-125.14, 56.05, 1],
      [-118.83, 18.75, 1],
      [-54.86, -56.05, 1],
      [118.83, -18.75, 1],
      [-21.18, -27.17, 1],
      [158.82, -27.17, 1],
      [104.66, -9.56, 1],
      [-9.88, -14.45, 1],
      [-75.34, -9.56, 1],
      [-123.65, 72.56, 1],
      [-170.12, 14.45, 1],
      [123.65, -72.56, 1],
      [170.12, -14.45, 1],
      [56.35, 72.56, 1],
      [9.88, 14.45, 1],
      [-56.35, -72.56, 1],
      [-104.66, 9.56, 1],
      [75.34, 9.56, 1],
      [25.94, -16.83, 1],
      [-34.66, 59.4, 1],
      [-154.06, -16.83, 1],
      [108.59, 24.75, 1],
      [-145.34, -59.41, 1],
      [-108.59, -24.75, 1],
      [145.34, 59.41, 1],
      [-71.41, 24.75, 1],
      [34.66, -59.41, 1],
      [71.41, -24.75, 1],
      [-25.94, 16.83, 1],
      [154.06, 16.83, 1],
      [-100.89, 26.49, 1],
      [153.1, -9.74, 1],
      [79.11, 26.49, 1],
      [-20.77, -61.51, 1],
      [26.9, 9.74, 1],
      [20.77, 61.51, 1],
      [-26.9, -9.74, 1],
      [159.23, -61.51, 1],
      [-153.1, 9.74, 1],
      [-159.23, 61.51, 1],
      [100.89, -26.49, 1],
      [-79.11, -26.49, 1],
      [44.31, 12.28, 1],
      [17.3, 44.36, 1],
      [-135.69, 12.28, 1],
      [73.08, 43.05, 1],
      [162.7, -44.36, 1],
      [-73.08, -43.05, 1],
      [-162.7, 44.36, 1],
      [-106.92, 43.05, 1],
      [-17.3, -44.36, 1],
      [106.92, -43.05, 1],
      [-44.31, -12.28, 1],
      [135.69, -12.28, 1],
      [-169.08, -24.53, 1],
      [-112.54, -63.29, 1],
      [10.92, -24.53, 1],
      [-114.93, -9.92, 1],
      [-67.46, 63.28, 1],
      [114.93, 9.92, 1],
      [67.46, -63.29, 1],
      [65.07, -9.92, 1],
      [112.54, 63.29, 1],
      [-65.07, 9.92, 1],
      [169.08, 24.53, 1],
      [-10.92, 24.53, 1],
      [93.2, -57.39, 1],
      [-57.43, -1.73, 1],
      [-86.8, -57.39, 1],
      [-177.95, 32.55, 1],
      [-122.57, 1.73, 1],
      [177.95, -32.55, 1],
      [122.57, -1.73, 1],
      [2.05, 32.55, 1],
      [57.43, 1.73, 1],
      [-2.05, -32.55, 1],
      [-93.2, 57.39, 1],
      [86.8, 57.39, 1],
      [-17.59, 3.04, 1],
      [170.04, 72.16, 1],
      [162.41, 3.04, 1],
      [86.81, -17.56, 1],
      [9.96, -72.16, 1],
      [-86.81, 17.56, 1],
      [-9.96, 72.16, 1],
      [-93.19, -17.56, 1],
      [-170.04, -72.16, 1],
      [93.19, 17.56, 1],
      [17.59, -3.04, 1],
      [-162.41, -3.04, 1],
      [39.38, 44.26, 1],
      [56.93, 33.61, 1],
      [-140.62, 44.26, 1],
      [38.42, 27.03, 1],
      [123.07, -33.61, 1],
      [-38.42, -27.03, 1],
      [-123.07, 33.61, 1],
      [-141.58, 27.03, 1],
      [-56.93, -33.61, 1],
      [141.58, -27.03, 1],
      [-39.38, -44.26, 1],
      [140.62, -44.26, 1]
    ],
    [
      [165.52, 26.52, 1],
      [63.39, -60.04, 1],
      [-14.48, 26.52, 1],
      [-62.74, 12.93, 1],
      [116.61, 60.04, 1],
      [62.74, -12.93, 1],
      [-116.61, -60.04, 1],
      [117.26, 12.93, 1],
      [-63.39, 60.04, 1],
      [-117.26, -12.93, 1],
      [-165.52, -26.52, 1],
      [14.48, -26.52, 1],
      [-150.22, -21.62, 1],
      [-141.41, -53.79, 1],
      [29.78, -21.62, 1],
      [-114.55, -27.5, 1],
      [-38.59, 53.79, 1],
      [114.55, 27.5, 1],
      [38.59, -53.79, 1],
      [65.45, -27.5, 1],
      [141.41, 53.79, 1],
      [-65.45, 27.5, 1],
      [150.22, 21.62, 1],
      [-29.78, 21.62, 1],
      [-163.47, 81.91, 1],
      [92.31, -7.75, 1],
      [16.53, 81.91, 1],
      [-7.76, -2.29, 1],
      [87.69, 7.75, 1],
      [7.76, 2.29, 1],
      [-87.69, -7.75, 1],
      [172.24, -2.29, 1],
      [-92.31, 7.75, 1],
      [-172.24, 2.29, 1],
      [163.47, -81.91, 1],
      [-16.53, -81.91, 1],
      [-79.91, -73.49, 1],
      [-106.27, 2.85, 1],
      [100.09, -73.49, 1],
      [177.03, -16.24, 1],
      [-73.73, -2.85, 1],
      [-177.03, 16.24, 1],
      [73.73, 2.85, 1],
      [-2.97, -16.24, 1],
      [106.27, -2.85, 1],
      [2.97, 16.24, 1],
      [79.91, 73.49, 1],
      [-100.09, 73.49, 1],
      [-43.19, 73.63, 1],
      [101.37, 11.86, 1],
      [136.81, 73.63, 1],
      [12.09, -11.12, 1],
      [78.63, -11.86, 1],
      [-12.09, 11.12, 1],
      [-78.63, 11.86, 1],
      [-167.91, -11.12, 1],
      [-101.37, -11.86, 1],
      [167.91, 11.12, 1],
      [43.19, -73.63, 1],
      [-136.81, -73.63, 1],
      [109.86, -34.83, 1],
      [-36.5, -16.19, 1],
      [-70.14, -34.83, 1],
      [-153.97, 50.53, 1],
      [-143.5, 16.19, 1],
      [153.97, -50.53, 1],
      [143.5, -16.19, 1],
      [26.03, 50.53, 1],
      [36.5, 16.19, 1],
      [-26.03, -50.53, 1],
      [-109.86, 34.83, 1],
      [70.14, 34.83, 1],
      [-23.31, -6.54, 1],
      [-163.84, 65.83, 1],
      [156.69, -6.54, 1],
      [97.12, -23.15, 1],
      [-16.16, -65.83, 1],
      [-97.12, 23.15, 1],
      [16.16, 65.83, 1],
      [-82.88, -23.15, 1],
      [163.84, -65.83, 1],
      [82.88, 23.15, 1],
      [23.31, 6.54, 1],
      [-156.69, 6.54, 1],
      [-0.87, -31.92, 1],
      [-91.4, 58.07, 1],
      [179.13, -31.92, 1],
      [121.93, -0.74, 1],
      [-88.6, -58.07, 1],
      [-121.93, 0.74, 1],
      [88.6, 58.07, 1],
      [-58.07, -0.74, 1],
      [91.4, -58.07, 1],
      [58.07, 0.74, 1],
      [0.87, 31.92, 1],
      [-179.13, 31.92, 1],
      [163.12, 43.35, 1],
      [72.9, -44.1, 1],
      [-16.88, 43.35, 1],
      [-45.39, 12.19, 1],
      [107.1, 44.1, 1],
      [45.39, -12.19, 1],
      [-107.1, -44.1, 1],
      [134.61, 12.19, 1],
      [-72.9, 44.1, 1],
      [-134.61, -12.19, 1],
      [-163.12, -43.35, 1],
      [16.88, -43.35, 1],
      [-114.23, 50.37, 1],
      [127.06, -15.17, 1],
      [65.77, 50.37, 1],
      [-18.77, -35.57, 1],
      [52.94, 15.17, 1],
      [18.77, 35.57, 1],
      [-52.94, -15.17, 1],
      [161.23, -35.57, 1],
      [-127.06, 15.17, 1],
      [-161.23, 35.57, 1],
      [114.23, -50.37, 1],
      [-65.77, -50.37, 1],
      [54.17, 30.16, 1],
      [35.63, 30.41, 1],
      [-125.83, 30.16, 1],
      [45.21, 44.51, 1],
      [144.37, -30.41, 1],
      [-45.21, -44.51, 1],
      [-144.37, 30.41, 1],
      [-134.79, 44.51, 1],
      [-35.63, -30.41, 1],
      [134.79, -44.51, 1],
      [-54.17, -30.16, 1],
      [125.83, -30.16, 1],
      [126.2, 41.73, 1],
      [47.86, -26.15, 1],
      [-53.8, 41.73, 1],
      [-33.51, 37.03, 1],
      [132.14, 26.15, 1],
      [33.51, -37.03, 1],
      [-132.14, -26.15, 1],
      [146.49, 37.03, 1],
      [-47.86, 26.15, 1],
      [-146.49, -37.03, 1],
      [-126.2, -41.73, 1],
      [53.8, -41.73, 1],
      [-161.75, 20.38, 1],
      [130.12, -62.91, 1],
      [18.25, 20.38, 1],
      [-68.63, -17.07, 1],
      [49.88, 62.91, 1],
      [68.63, 17.07, 1],
      [-49.88, -62.91, 1],
      [111.37, -17.07, 1],
      [-130.12, 62.91, 1],
      [-111.37, 17.07, 1],
      [161.75, -20.38, 1],
      [-18.25, -20.38, 1],
      [2.71, 48.49, 1],
      [87.6, 41.45, 1],
      [-177.29, 48.49, 1],
      [41.48, 1.8, 1],
      [92.4, -41.45, 1],
      [-41.48, -1.8, 1],
      [-92.4, 41.45, 1],
      [-138.52, 1.8, 1],
      [-87.6, -41.45, 1],
      [138.52, -1.8, 1],
      [-2.71, -48.49, 1],
      [177.29, -48.49, 1],
      [-98.15, -27.54, 1],
      [-152.22, -7.22, 1],
      [81.85, -27.54, 1],
      [-164.79, -61.37, 1],
      [-27.78, 7.22, 1],
      [164.79, 61.37, 1],
      [27.78, -7.22, 1],
      [15.21, -61.37, 1],
      [152.22, 7.22, 1],
      [-15.21, 61.37, 1],
      [98.15, 27.54, 1],
      [-81.85, 27.54, 1]
    ],
    [
      [-40.48, 43.36, 1],
      [124.51, 33.58, 1],
      [139.52, 43.36, 1],
      [38.85, -28.17, 1],
      [55.49, -33.58, 1],
      [-38.85, 28.17, 1],
      [-55.49, 33.58, 1],
      [-141.15, -28.17, 1],
      [-124.51, -33.58, 1],
      [141.15, 28.17, 1],
      [40.48, -43.36, 1],
      [-139.52, -43.36, 1],
      [56.01, 17.18, 1],
      [20.46, 32.29, 1],
      [-123.99, 17.18, 1],
      [61.05, 52.38, 1],
      [159.54, -32.29, 1],
      [-61.05, -52.38, 1],
      [-159.54, 32.29, 1],
      [-118.95, 52.38, 1],
      [-20.46, -32.29, 1],
      [118.95, -52.38, 1],
      [-56.01, -17.18, 1],
      [123.99, -17.18, 1],
      [-179.51, -8.95, 1],
      [-93.08, -81.04, 1],
      [0.49, -8.95, 1],
      [-98.95, -0.48, 1],
      [-86.92, 81.04, 1],
      [98.95, 0.48, 1],
      [86.92, -81.04, 1],
      [81.05, -0.48, 1],
      [93.08, 81.04, 1],
      [-81.05, 0.48, 1],
      [179.51, 8.95, 1],
      [-0.49, 8.95, 1],
      [12.04, -13.56, 1],
      [-49.15, 71.95, 1],
      [-167.96, -13.56, 1],
      [103.85, 11.7, 1],
      [-130.85, -71.95, 1],
      [-103.85, -11.7, 1],
      [130.85, 71.95, 1],
      [-76.15, 11.7, 1],
      [49.15, -71.95, 1],
      [76.15, -11.7, 1],
      [-12.04, 13.56, 1],
      [167.96, 13.56, 1],
      [-13.62, -58.2, 1],
      [-98.3, 30.8, 1],
      [166.38, -58.2, 1],
      [148.93, -7.13, 1],
      [-81.7, -30.8, 1],
      [-148.93, 7.13, 1],
      [81.7, 30.8, 1],
      [-31.07, -7.13, 1],
      [98.3, -30.8, 1],
      [31.07, 7.13, 1],
      [13.62, 58.2, 1],
      [-166.38, 58.2, 1],
      [65.26, -20.55, 1],
      [-22.43, 23.07, 1],
      [-114.74, -20.55, 1],
      [131.85, 58.26, 1],
      [-157.57, -23.07, 1],
      [-131.85, -58.26, 1],
      [157.57, 23.07, 1],
      [-48.15, 58.26, 1],
      [22.43, -23.07, 1],
      [48.15, -58.26, 1],
      [-65.26, 20.55, 1],
      [114.74, 20.55, 1],
      [-135.39, 26.5, 1],
      [144.63, -39.58, 1],
      [44.61, 26.5, 1],
      [-55, -38.94, 1],
      [35.37, 39.58, 1],
      [55, 38.94, 1],
      [-35.37, -39.58, 1],
      [125, -38.94, 1],
      [-144.63, 39.58, 1],
      [-125, 38.94, 1],
      [135.39, -26.5, 1],
      [-44.61, -26.5, 1],
      [114.95, -4.75, 1],
      [-5.23, -24.86, 1],
      [-65.05, -4.75, 1],
      [-101.14, 64.63, 1],
      [-174.77, 24.86, 1],
      [101.14, -64.63, 1],
      [174.77, -24.86, 1],
      [78.86, 64.63, 1],
      [5.23, 24.86, 1],
      [-78.86, -64.63, 1],
      [-114.95, 4.75, 1],
      [65.05, 4.75, 1],
      [35.85, 52.64, 1],
      [65.91, 29.46, 1],
      [-144.15, 52.64, 1],
      [31.75, 20.82, 1],
      [114.09, -29.46, 1],
      [-31.75, -20.82, 1],
      [-114.09, 29.46, 1],
      [-148.25, 20.82, 1],
      [-65.91, -29.46, 1],
      [148.25, -20.82, 1],
      [-35.85, -52.64, 1],
      [144.15, -52.64, 1],
      [86.45, 11.52, 1],
      [11.54, 3.48, 1],
      [-93.55, 11.52, 1],
      [16.9, 77.95, 1],
      [168.46, -3.48, 1],
      [-16.9, -77.95, 1],
      [-168.46, 3.48, 1],
      [-163.1, 77.95, 1],
      [-11.54, -3.48, 1],
      [163.1, -77.95, 1],
      [-86.45, -11.52, 1],
      [93.55, -11.52, 1],
      [135.24, 4.02, 1],
      [5.69, -45.1, 1],
      [-44.76, 4.02, 1],
      [-84.35, 44.62, 1],
      [174.31, 45.1, 1],
      [84.35, -44.62, 1],
      [-174.31, -45.1, 1],
      [95.65, 44.62, 1],
      [-5.69, 45.1, 1],
      [-95.65, -44.62, 1],
      [-135.24, -4.02, 1],
      [44.76, -4.02, 1],
      [-129.84, -18.16, 1],
      [-156.86, -37.5, 1],
      [50.16, -18.16, 1],
      [-117.12, -46.85, 1],
      [-23.14, 37.5, 1],
      [117.12, 46.85, 1],
      [23.14, -37.5, 1],
      [62.88, -46.85, 1],
      [156.86, 37.5, 1],
      [-62.88, 46.85, 1],
      [129.84, 18.16, 1],
      [-50.16, 18.16, 1],
      [-74.1, 32.87, 1],
      [146.1, 13.3, 1],
      [105.9, 32.87, 1],
      [22.97, -53.88, 1],
      [33.9, -13.3, 1],
      [-22.97, 53.88, 1],
      [-33.9, 13.3, 1],
      [-157.03, -53.88, 1],
      [-146.1, -13.3, 1],
      [157.03, 53.88, 1],
      [74.1, -32.87, 1],
      [-105.9, -32.87, 1],
      [-119.92, -5.64, 1],
      [-173.5, -29.76, 1],
      [60.08, -5.64, 1],
      [-101.2, -59.6, 1],
      [-6.5, 29.76, 1],
      [101.2, 59.6, 1],
      [6.5, -29.76, 1],
      [78.8, -59.6, 1],
      [173.5, 29.76, 1],
      [-78.8, 59.6, 1],
      [119.92, 5.64, 1],
      [-60.08, 5.64, 1],
      [73.14, 16.13, 1],
      [16.82, 16.18, 1],
      [-106.86, 16.13, 1],
      [45.09, 66.83, 1],
      [163.18, -16.18, 1],
      [-45.09, -66.83, 1],
      [-163.18, 16.18, 1],
      [-134.91, 66.83, 1],
      [-16.82, -16.18, 1],
      [134.91, -66.83, 1],
      [-73.14, -16.13, 1],
      [106.86, -16.13, 1],
      [-11.7, -43.38, 1],
      [-102.11, 45.38, 1],
      [168.3, -43.38, 1],
      [133.98, -8.47, 1],
      [-77.89, -45.38, 1],
      [-133.98, 8.47, 1],
      [77.89, 45.38, 1],
      [-46.02, -8.47, 1],
      [102.11, -45.38, 1],
      [46.02, 8.47, 1],
      [11.7, 43.38, 1],
      [-168.3, 43.38, 1],
      [-24.11, 3.73, 1],
      [170.94, 65.63, 1],
      [155.89, 3.73, 1],
      [85.92, -24.05, 1],
      [9.06, -65.63, 1],
      [-85.92, 24.05, 1],
      [-9.06, 65.63, 1],
      [-94.08, -24.05, 1],
      [-170.94, -65.63, 1],
      [94.08, 24.05, 1],
      [24.11, -3.73, 1],
      [-155.89, -3.73, 1]
    ],
    [
      [104.6, -3.68, 1],
      [-3.81, -14.57, 1],
      [-75.4, -3.68, 1],
      [-104.32, 74.95, 1],
      [-176.19, 14.57, 1],
      [104.32, -74.95, 1],
      [176.19, -14.57, 1],
      [75.68, 74.95, 1],
      [3.81, 14.57, 1],
      [-75.68, -74.95, 1],
      [-104.6, 3.68, 1],
      [75.4, 3.68, 1],
      [153.77, -30.33, 1],
      [-52.93, -50.74, 1],
      [-26.23, -30.33, 1],
      [-123.11, 22.43, 1],
      [-127.07, 50.74, 1],
      [123.11, -22.43, 1],
      [127.07, -50.74, 1],
      [56.89, 22.43, 1],
      [52.93, 50.74, 1],
      [-56.89, -22.43, 1],
      [-153.77, 30.33, 1],
      [26.23, 30.33, 1],
      [35.99, -39.77, 1],
      [-54.77, 38.45, 1],
      [-144.01, -39.77, 1],
      [135.81, 26.85, 1],
      [-125.23, -38.45, 1],
      [-135.81, -26.85, 1],
      [125.23, 38.45, 1],
      [-44.19, 26.85, 1],
      [54.77, -38.45, 1],
      [44.19, -26.85, 1],
      [-35.99, 39.77, 1],
      [144.01, 39.77, 1],
      [71.82, -25.43, 1],
      [-26.58, 16.37, 1],
      [-108.18, -25.43, 1],
      [146.72, 59.1, 1],
      [-153.42, -16.37, 1],
      [-146.72, -59.1, 1],
      [153.42, 16.37, 1],
      [-33.28, 59.1, 1],
      [26.58, -16.37, 1],
      [33.28, -59.1, 1],
      [-71.82, 25.43, 1],
      [108.18, 25.43, 1],
      [-136.55, 26.52, 1],
      [144.03, -40.51, 1],
      [43.45, 26.52, 1],
      [-55.5, -37.97, 1],
      [35.97, 40.51, 1],
      [55.5, 37.97, 1],
      [-35.97, -40.51, 1],
      [124.5, -37.97, 1],
      [-144.03, 40.51, 1],
      [-124.5, 37.97, 1],
      [136.55, -26.52, 1],
      [-43.45, -26.52, 1],
      [-6.52, -1.08, 1],
      [-170.58, 83.4, 1],
      [173.48, -1.08, 1],
      [91.09, -6.52, 1],
      [-9.42, -83.4, 1],
      [-91.09, 6.52, 1],
      [9.42, 83.4, 1],
      [-88.91, -6.52, 1],
      [170.58, -83.4, 1],
      [88.91, 6.52, 1],
      [6.52, 1.08, 1],
      [-173.48, 1.08, 1],
      [-71.13, 40.38, 1],
      [138.05, 14.26, 1],
      [108.87, 40.38, 1],
      [20.82, -46.12, 1],
      [41.95, -14.26, 1],
      [-20.82, 46.12, 1],
      [-41.95, 14.26, 1],
      [-159.18, -46.12, 1],
      [-138.05, -14.26, 1],
      [159.18, 46.12, 1],
      [71.13, -40.38, 1],
      [-108.87, -40.38, 1],
      [-153.97, -27.97, 1],
      [-129.57, -52.52, 1],
      [26.03, -27.97, 1],
      [-120.59, -22.81, 1],
      [-50.43, 52.52, 1],
      [120.59, 22.81, 1],
      [50.43, -52.52, 1],
      [59.41, -22.81, 1],
      [129.57, 52.52, 1],
      [-59.41, 22.81, 1],
      [153.97, 27.97, 1],
      [-26.03, 27.97, 1],
      [-80.23, 13.48, 1],
      [166.33, 9.49, 1],
      [99.77, 13.48, 1],
      [35.29, -73.41, 1],
      [13.67, -9.49, 1],
      [-35.29, 73.41, 1],
      [-13.67, 9.49, 1],
      [-144.71, -73.41, 1],
      [-166.33, -9.49, 1],
      [144.71, 73.41, 1],
      [80.23, -13.48, 1],
      [-99.77, -13.48, 1],
      [55.43, -9, 1],
      [-10.89, 34.09, 1],
      [-124.57, -9, 1],
      [105.6, 54.41, 1],
      [-169.11, -34.09, 1],
      [-105.6, -54.41, 1],
      [169.11, 34.09, 1],
      [-74.4, 54.41, 1],
      [10.89, -34.09, 1],
      [74.4, -54.41, 1],
      [-55.43, 9, 1],
      [124.57, 9, 1],
      [68.32, -7.14, 1],
      [-7.68, 21.51, 1],
      [-111.68, -7.14, 1],
      [108.74, 67.22, 1],
      [-172.32, -21.51, 1],
      [-108.74, -67.22, 1],
      [172.32, 21.51, 1],
      [-71.26, 67.22, 1],
      [7.68, -21.51, 1],
      [71.26, -67.22, 1],
      [-68.32, 7.14, 1],
      [111.68, 7.14, 1],
      [-174.97, 36.12, 1],
      [96.85, -53.58, 1],
      [5.03, 36.12, 1],
      [-53.77, -4.06, 1],
      [83.15, 53.58, 1],
      [53.77, 4.06, 1],
      [-83.15, -53.58, 1],
      [126.23, -4.06, 1],
      [-96.85, 53.58, 1],
      [-126.23, 4.06, 1],
      [174.97, -36.12, 1],
      [-5.03, -36.12, 1],
      [-149.91, 16.26, 1],
      [149.81, -56.16, 1],
      [30.09, 16.26, 1],
      [-71.37, -28.77, 1],
      [30.19, 56.16, 1],
      [71.37, 28.77, 1],
      [-30.19, -56.16, 1],
      [108.63, -28.77, 1],
      [-149.81, 56.16, 1],
      [-108.63, 28.77, 1],
      [149.91, -16.26, 1],
      [-30.09, -16.26, 1],
      [2.52, -51.45, 1],
      [-87.99, 38.5, 1],
      [-177.48, -51.45, 1],
      [141.48, 1.57, 1],
      [-92.01, -38.5, 1],
      [-141.48, -1.57, 1],
      [92.01, 38.5, 1],
      [-38.52, 1.57, 1],
      [87.99, -38.5, 1],
      [38.52, -1.57, 1],
      [-2.52, 51.45, 1],
      [177.48, 51.45, 1],
      [161.12, -9.98, 1],
      [-28.54, -68.73, 1],
      [-18.88, -9.98, 1],
      [-100.54, 18.59, 1],
      [-151.46, 68.73, 1],
      [100.54, -18.59, 1],
      [151.46, -68.73, 1],
      [79.46, 18.59, 1],
      [28.54, 68.73, 1],
      [-79.46, -18.59, 1],
      [-161.12, 9.98, 1],
      [18.88, 9.98, 1],
      [12.84, 24.97, 1],
      [64.49, 62.11, 1],
      [-167.16, 24.97, 1],
      [64.47, 11.62, 1],
      [115.51, -62.11, 1],
      [-64.47, -11.62, 1],
      [-115.51, 62.11, 1],
      [-115.53, 11.62, 1],
      [-64.49, -62.11, 1],
      [115.53, -11.62, 1],
      [-12.84, -24.97, 1],
      [167.16, -24.97, 1],
      [74.13, 41.65, 1],
      [42.76, 11.79, 1],
      [-105.87, 41.65, 1],
      [17.09, 45.95, 1],
      [137.24, -11.79, 1],
      [-17.09, -45.95, 1],
      [-137.24, 11.79, 1],
      [-162.91, 45.95, 1],
      [-42.76, -11.79, 1],
      [162.91, -45.95, 1],
      [-74.13, -41.65, 1],
      [105.87, -41.65, 1],
      [154.04, 1.27, 1],
      [2.9, -64.01, 1],
      [-25.96, 1.27, 1],
      [-88.59, 25.96, 1],
      [177.1, 64.01, 1],
      [88.59, -25.96, 1],
      [-177.1, -64.01, 1],
      [91.41, 25.96, 1],
      [-2.9, 64.01, 1],
      [-91.41, -25.96, 1],
      [-154.04, -1.27, 1],
      [25.96, -1.27, 1]
    ],
    [
      [24.8, -10.46, 1],
      [-23.76, 63.21, 1],
      [-155.2, -10.46, 1],
      [101.5, 24.36, 1],
      [-156.24, -63.21, 1],
      [-101.5, -24.36, 1],
      [156.24, 63.21, 1],
      [-78.5, 24.36, 1],
      [23.76, -63.21, 1],
      [78.5, -24.36, 1],
      [-24.8, 10.46, 1],
      [155.2, 10.46, 1],
      [-134.64, 65.44, 1],
      [108.01, -16.98, 1],
      [45.36, 65.44, 1],
      [-17.8, -17.2, 1],
      [71.99, 16.98, 1],
      [17.8, 17.2, 1],
      [-71.99, -16.98, 1],
      [162.2, -17.2, 1],
      [-108.01, 16.98, 1],
      [-162.2, 17.2, 1],
      [134.64, -65.44, 1],
      [-45.36, -65.44, 1],
      [177.6, 54.85, 1],
      [88.31, -35.12, 1],
      [-2.4, 54.85, 1],
      [-35.13, 1.38, 1],
      [91.69, 35.12, 1],
      [35.13, -1.38, 1],
      [-91.69, -35.12, 1],
      [144.87, 1.38, 1],
      [-88.31, 35.12, 1],
      [-144.87, -1.38, 1],
      [-177.6, -54.85, 1],
      [2.4, -54.85, 1],
      [157.93, 82.01, 1],
      [86.98, -7.4, 1],
      [-22.07, 82.01, 1],
      [-7.41, 2.99, 1],
      [93.02, 7.4, 1],
      [7.41, -2.99, 1],
      [-93.02, -7.4, 1],
      [172.59, 2.99, 1],
      [-86.98, 7.4, 1],
      [-172.59, -2.99, 1],
      [-157.93, -82.01, 1],
      [22.07, -82.01, 1],
      [42.48, -13.21, 1],
      [-19.17, 45.89, 1],
      [-137.52, -13.21, 1],
      [107.66, 41.11, 1],
      [-160.83, -45.89, 1],
      [-107.66, -41.11, 1],
      [160.83, 45.89, 1],
      [-72.34, 41.11, 1],
      [19.17, -45.89, 1],
      [72.34, -41.11, 1],
      [-42.48, 13.21, 1],
      [137.52, 13.21, 1],
      [28.48, 10.9, 1],
      [21.99, 59.68, 1],
      [-151.52, 10.9, 1],
      [77.65, 27.92, 1],
      [158.01, -59.68, 1],
      [-77.65, -27.92, 1],
      [-158.01, 59.68, 1],
      [-102.35, 27.92, 1],
      [-21.99, -59.68, 1],
      [102.35, -27.92, 1],
      [-28.48, -10.9, 1],
      [151.52, -10.9, 1],
      [-33.79, 21.61, 1],
      [144.53, 50.59, 1],
      [146.21, 21.61, 1],
      [64.51, -31.14, 1],
      [35.47, -50.59, 1],
      [-64.51, 31.14, 1],
      [-35.47, 50.59, 1],
      [-115.49, -31.14, 1],
      [-144.53, -50.59, 1],
      [115.49, 31.14, 1],
      [33.79, -21.61, 1],
      [-146.21, -21.61, 1],
      [-175.53, -31.74, 1],
      [-97.19, -57.98, 1],
      [4.47, -31.74, 1],
      [-121.82, -3.8, 1],
      [-82.81, 57.98, 1],
      [121.82, 3.8, 1],
      [82.81, -57.98, 1],
      [58.18, -3.8, 1],
      [97.19, 57.98, 1],
      [-58.18, 3.8, 1],
      [175.53, 31.74, 1],
      [-4.47, 31.74, 1],
      [89.4, 19.43, 1],
      [19.43, 0.56, 1],
      [-90.6, 19.43, 1],
      [1.69, 70.56, 1],
      [160.57, -0.56, 1],
      [-1.69, -70.56, 1],
      [-160.57, 0.56, 1],
      [-178.31, 70.56, 1],
      [-19.43, -0.56, 1],
      [178.31, -70.56, 1],
      [-89.4, -19.43, 1],
      [90.6, -19.43, 1],
      [-27.28, -27.88, 1],
      [-130.91, 51.78, 1],
      [152.72, -27.88, 1],
      [120.76, -23.9, 1],
      [-49.09, -51.78, 1],
      [-120.76, 23.9, 1],
      [49.09, 51.78, 1],
      [-59.24, -23.9, 1],
      [130.91, -51.78, 1],
      [59.24, 23.9, 1],
      [27.28, 27.88, 1],
      [-152.72, 27.88, 1],
      [139.9, -15.44, 1],
      [-23.21, -47.5, 1],
      [-40.1, -15.44, 1],
      [-109.85, 38.38, 1],
      [-156.79, 47.5, 1],
      [109.85, -38.38, 1],
      [156.79, -47.5, 1],
      [70.15, 38.38, 1],
      [23.21, 47.5, 1],
      [-70.15, -38.38, 1],
      [-139.9, 15.44, 1],
      [40.1, 15.44, 1],
      [-2.17, -43.33, 1],
      [-92.29, 46.62, 1],
      [177.83, -43.33, 1],
      [133.35, -1.58, 1],
      [-87.71, -46.62, 1],
      [-133.35, 1.58, 1],
      [87.71, 46.62, 1],
      [-46.65, -1.58, 1],
      [92.29, -46.62, 1],
      [46.65, 1.58, 1],
      [2.17, 43.33, 1],
      [-177.83, 43.33, 1],
      [41.12, 27.96, 1],
      [38.91, 41.71, 1],
      [-138.88, 27.96, 1],
      [54.83, 35.51, 1],
      [141.09, -41.71, 1],
      [-54.83, -35.51, 1],
      [-141.09, 41.71, 1],
      [-125.17, 35.51, 1],
      [-38.91, -41.71, 1],
      [125.17, -35.51, 1],
      [-41.12, -27.96, 1],
      [138.88, -27.96, 1],
      [-126.67, 13.75, 1],
      [163.04, -35.46, 1],
      [53.33, 13.75, 1],
      [-67.73, -51.18, 1],
      [16.96, 35.46, 1],
      [67.73, 51.18, 1],
      [-16.96, -35.46, 1],
      [112.27, -51.18, 1],
      [-163.04, 35.46, 1],
      [-112.27, 51.18, 1],
      [126.67, -13.75, 1],
      [-53.33, -13.75, 1],
      [6.02, -15.42, 1],
      [-69.18, 73.47, 1],
      [-173.98, -15.42, 1],
      [105.51, 5.8, 1],
      [-110.82, -73.47, 1],
      [-105.51, -5.8, 1],
      [110.82, 73.47, 1],
      [-74.49, 5.8, 1],
      [69.18, -73.47, 1],
      [74.49, -5.8, 1],
      [-6.02, 15.42, 1],
      [173.98, 15.42, 1],
      [160.08, 33.45, 1],
      [62.71, -51.67, 1],
      [-19.92, 33.45, 1],
      [-54.9, 16.52, 1],
      [117.29, 51.67, 1],
      [54.9, -16.52, 1],
      [-117.29, -51.67, 1],
      [125.1, 16.52, 1],
      [-62.71, 51.67, 1],
      [-125.1, -16.52, 1],
      [-160.08, -33.45, 1],
      [19.92, -33.45, 1],
      [80.34, 6.51, 1],
      [6.61, 9.59, 1],
      [-99.66, 6.51, 1],
      [55.76, 78.37, 1],
      [173.39, -9.59, 1],
      [-55.76, -78.37, 1],
      [-173.39, 9.59, 1],
      [-124.24, 78.37, 1],
      [-6.61, -9.59, 1],
      [124.24, -78.37, 1],
      [-80.34, -6.51, 1],
      [99.66, -6.51, 1],
      [6.25, 24.64, 1],
      [76.64, 64.63, 1],
      [-173.75, 24.64, 1],
      [65.23, 5.68, 1],
      [103.36, -64.63, 1],
      [-65.23, -5.68, 1],
      [-103.36, 64.63, 1],
      [-114.77, 5.68, 1],
      [-76.64, -64.63, 1],
      [114.77, -5.68, 1],
      [-6.25, -24.64, 1],
      [173.75, -24.64, 1],
      [51.41, -63.45, 1],
      [-68.67, 16.19, 1],
      [-128.59, -63.45, 1],
      [162.69, 20.45, 1],
      [-111.33, -16.19, 1],
      [-162.69, -20.45, 1],
      [111.33, 16.19, 1],
      [-17.31, 20.45, 1],
      [68.67, -16.19, 1],
      [17.31, -20.45, 1],
      [-51.41, 63.45, 1],
      [128.59, 63.45, 1],
      [-50.6, 28.85, 1],
      [144.51, 33.77, 1],
      [129.4, 28.85, 1],
      [49.04, -42.6, 1],
      [35.49, -33.77, 1],
      [-49.04, 42.6, 1],
      [-35.49, 33.77, 1],
      [-130.96, -42.6, 1],
      [-144.51, -33.77, 1],
      [130.96, 42.6, 1],
      [50.6, -28.85, 1],
      [-129.4, -28.85, 1]
    ]
  ], n = t[S - 1];
  return n;
}
module.exports.getAmbisonicDecMtx = getAmbisonicDecMtx;
module.exports.getTdesign = getTdesign;
module.exports.deg2rad = deg2rad;
module.exports.rad2deg = rad2deg;
module.exports.createNearestLookup = createNearestLookup;
module.exports.findNearest = findNearest;
const _utils = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createNearestLookup,
  deg2rad,
  findNearest,
  getAmbisonicDecMtx,
  getCircHarmonics,
  getColumn,
  getTdesign,
  rad2deg,
  sampleCircle
}, Symbol.toStringTag, { value: "Module" })), converters = _converters, utils = _utils;
export {
  HOAloader,
  HRIRloader2D_local,
  HRIRloader_ircam,
  HRIRloader_local,
  binDecoder,
  binDecoder2D,
  converters,
  convolver,
  decoder,
  intensityAnalyser,
  intensityAnalyser2D,
  monoEncoder,
  monoEncoder2D,
  orderLimiter,
  orderLimiter2D,
  orderWeight,
  powermapAnalyser,
  rmsAnalyser,
  sceneMirror,
  sceneMirror2D,
  sceneRotator,
  sceneRotator2D,
  utils,
  virtualMic
};
//# sourceMappingURL=ambisonics.es.js.map
