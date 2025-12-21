function getAmbisonicChannelCount(order) {
  return (order + 1) * (order + 1);
}
function getAmbisonicChannelCount2D(order) {
  return 2 * order + 1;
}
function degreesToRadians(degrees) {
  return degrees * Math.PI / 180;
}
function radiansToDegrees(radians) {
  return radians * 180 / Math.PI;
}
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var numeric1_2_6 = {};
(function(exports$1) {
  var numeric = exports$1;
  if (typeof commonjsGlobal !== "undefined") {
    commonjsGlobal.numeric = numeric;
  }
  numeric.version = "1.2.6";
  numeric.bench = function bench(f, interval) {
    var t1, t2, n, i;
    if (typeof interval === "undefined") {
      interval = 15;
    }
    n = 0.5;
    t1 = /* @__PURE__ */ new Date();
    while (1) {
      n *= 2;
      for (i = n; i > 3; i -= 4) {
        f();
        f();
        f();
        f();
      }
      while (i > 0) {
        f();
        i--;
      }
      t2 = /* @__PURE__ */ new Date();
      if (t2 - t1 > interval) break;
    }
    for (i = n; i > 3; i -= 4) {
      f();
      f();
      f();
      f();
    }
    while (i > 0) {
      f();
      i--;
    }
    t2 = /* @__PURE__ */ new Date();
    return 1e3 * (3 * n - 1) / (t2 - t1);
  };
  numeric._myIndexOf = function _myIndexOf(w) {
    var n = this.length, k2;
    for (k2 = 0; k2 < n; ++k2) if (this[k2] === w) return k2;
    return -1;
  };
  numeric.myIndexOf = Array.prototype.indexOf ? Array.prototype.indexOf : numeric._myIndexOf;
  numeric.Function = Function;
  numeric.precision = 4;
  numeric.largeArray = 50;
  numeric.prettyPrint = function prettyPrint(x) {
    function fmtnum(x2) {
      if (x2 === 0) {
        return "0";
      }
      if (isNaN(x2)) {
        return "NaN";
      }
      if (x2 < 0) {
        return "-" + fmtnum(-x2);
      }
      if (isFinite(x2)) {
        var scale = Math.floor(Math.log(x2) / Math.log(10));
        var normalized = x2 / Math.pow(10, scale);
        var basic = normalized.toPrecision(numeric.precision);
        if (parseFloat(basic) === 10) {
          scale++;
          normalized = 1;
          basic = normalized.toPrecision(numeric.precision);
        }
        return parseFloat(basic).toString() + "e" + scale.toString();
      }
      return "Infinity";
    }
    var ret = [];
    function foo(x2) {
      var k2;
      if (typeof x2 === "undefined") {
        ret.push(Array(numeric.precision + 8).join(" "));
        return false;
      }
      if (typeof x2 === "string") {
        ret.push('"' + x2 + '"');
        return false;
      }
      if (typeof x2 === "boolean") {
        ret.push(x2.toString());
        return false;
      }
      if (typeof x2 === "number") {
        var a = fmtnum(x2);
        var b = x2.toPrecision(numeric.precision);
        var c = parseFloat(x2.toString()).toString();
        var d = [a, b, c, parseFloat(b).toString(), parseFloat(c).toString()];
        for (k2 = 1; k2 < d.length; k2++) {
          if (d[k2].length < a.length) a = d[k2];
        }
        ret.push(Array(numeric.precision + 8 - a.length).join(" ") + a);
        return false;
      }
      if (x2 === null) {
        ret.push("null");
        return false;
      }
      if (typeof x2 === "function") {
        ret.push(x2.toString());
        var flag = false;
        for (k2 in x2) {
          if (x2.hasOwnProperty(k2)) {
            if (flag) ret.push(",\n");
            else ret.push("\n{");
            flag = true;
            ret.push(k2);
            ret.push(": \n");
            foo(x2[k2]);
          }
        }
        if (flag) ret.push("}\n");
        return true;
      }
      if (x2 instanceof Array) {
        if (x2.length > numeric.largeArray) {
          ret.push("...Large Array...");
          return true;
        }
        var flag = false;
        ret.push("[");
        for (k2 = 0; k2 < x2.length; k2++) {
          if (k2 > 0) {
            ret.push(",");
            if (flag) ret.push("\n ");
          }
          flag = foo(x2[k2]);
        }
        ret.push("]");
        return true;
      }
      ret.push("{");
      var flag = false;
      for (k2 in x2) {
        if (x2.hasOwnProperty(k2)) {
          if (flag) ret.push(",\n");
          flag = true;
          ret.push(k2);
          ret.push(": \n");
          foo(x2[k2]);
        }
      }
      ret.push("}");
      return true;
    }
    foo(x);
    return ret.join("");
  };
  numeric.parseDate = function parseDate(d) {
    function foo(d2) {
      if (typeof d2 === "string") {
        return Date.parse(d2.replace(/-/g, "/"));
      }
      if (!(d2 instanceof Array)) {
        throw new Error("parseDate: parameter must be arrays of strings");
      }
      var ret = [], k2;
      for (k2 = 0; k2 < d2.length; k2++) {
        ret[k2] = foo(d2[k2]);
      }
      return ret;
    }
    return foo(d);
  };
  numeric.parseFloat = function parseFloat_(d) {
    function foo(d2) {
      if (typeof d2 === "string") {
        return parseFloat(d2);
      }
      if (!(d2 instanceof Array)) {
        throw new Error("parseFloat: parameter must be arrays of strings");
      }
      var ret = [], k2;
      for (k2 = 0; k2 < d2.length; k2++) {
        ret[k2] = foo(d2[k2]);
      }
      return ret;
    }
    return foo(d);
  };
  numeric.parseCSV = function parseCSV(t) {
    var foo = t.split("\n");
    var j, k2;
    var ret = [];
    var pat = /(([^'",]*)|('[^']*')|("[^"]*")),/g;
    var patnum = /^\s*(([+-]?[0-9]+(\.[0-9]*)?(e[+-]?[0-9]+)?)|([+-]?[0-9]*(\.[0-9]+)?(e[+-]?[0-9]+)?))\s*$/;
    var stripper = function(n) {
      return n.substr(0, n.length - 1);
    };
    var count = 0;
    for (k2 = 0; k2 < foo.length; k2++) {
      var bar = (foo[k2] + ",").match(pat), baz;
      if (bar.length > 0) {
        ret[count] = [];
        for (j = 0; j < bar.length; j++) {
          baz = stripper(bar[j]);
          if (patnum.test(baz)) {
            ret[count][j] = parseFloat(baz);
          } else ret[count][j] = baz;
        }
        count++;
      }
    }
    return ret;
  };
  numeric.toCSV = function toCSV(A2) {
    var s = numeric.dim(A2);
    var i, j, m, row, ret;
    m = s[0];
    s[1];
    ret = [];
    for (i = 0; i < m; i++) {
      row = [];
      for (j = 0; j < m; j++) {
        row[j] = A2[i][j].toString();
      }
      ret[i] = row.join(", ");
    }
    return ret.join("\n") + "\n";
  };
  numeric.getURL = function getURL(url) {
    var client = new XMLHttpRequest();
    client.open("GET", url, false);
    client.send();
    return client;
  };
  numeric.imageURL = function imageURL(img) {
    function base64(A2) {
      var n = A2.length, i2, x, y, z, p, q, r, s;
      var key = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      var ret = "";
      for (i2 = 0; i2 < n; i2 += 3) {
        x = A2[i2];
        y = A2[i2 + 1];
        z = A2[i2 + 2];
        p = x >> 2;
        q = ((x & 3) << 4) + (y >> 4);
        r = ((y & 15) << 2) + (z >> 6);
        s = z & 63;
        if (i2 + 1 >= n) {
          r = s = 64;
        } else if (i2 + 2 >= n) {
          s = 64;
        }
        ret += key.charAt(p) + key.charAt(q) + key.charAt(r) + key.charAt(s);
      }
      return ret;
    }
    function crc32Array(a2, from, to) {
      if (typeof from === "undefined") {
        from = 0;
      }
      if (typeof to === "undefined") {
        to = a2.length;
      }
      var table = [
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
      ];
      var crc = -1, y = 0;
      a2.length;
      var i2;
      for (i2 = from; i2 < to; i2++) {
        y = (crc ^ a2[i2]) & 255;
        crc = crc >>> 8 ^ table[y];
      }
      return crc ^ -1;
    }
    var h = img[0].length, w = img[0][0].length, s1, s2, k2, length, a, b, i, j, adler32, crc32;
    var stream = [
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
      w >> 24 & 255,
      w >> 16 & 255,
      w >> 8 & 255,
      w & 255,
      // 16: Width
      h >> 24 & 255,
      h >> 16 & 255,
      h >> 8 & 255,
      h & 255,
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
    crc32 = crc32Array(stream, 12, 29);
    stream[29] = crc32 >> 24 & 255;
    stream[30] = crc32 >> 16 & 255;
    stream[31] = crc32 >> 8 & 255;
    stream[32] = crc32 & 255;
    s1 = 1;
    s2 = 0;
    for (i = 0; i < h; i++) {
      if (i < h - 1) {
        stream.push(0);
      } else {
        stream.push(1);
      }
      a = 3 * w + 1 + (i === 0) & 255;
      b = 3 * w + 1 + (i === 0) >> 8 & 255;
      stream.push(a);
      stream.push(b);
      stream.push(~a & 255);
      stream.push(~b & 255);
      if (i === 0) stream.push(0);
      for (j = 0; j < w; j++) {
        for (k2 = 0; k2 < 3; k2++) {
          a = img[k2][i][j];
          if (a > 255) a = 255;
          else if (a < 0) a = 0;
          else a = Math.round(a);
          s1 = (s1 + a) % 65521;
          s2 = (s2 + s1) % 65521;
          stream.push(a);
        }
      }
      stream.push(0);
    }
    adler32 = (s2 << 16) + s1;
    stream.push(adler32 >> 24 & 255);
    stream.push(adler32 >> 16 & 255);
    stream.push(adler32 >> 8 & 255);
    stream.push(adler32 & 255);
    length = stream.length - 41;
    stream[33] = length >> 24 & 255;
    stream[34] = length >> 16 & 255;
    stream[35] = length >> 8 & 255;
    stream[36] = length & 255;
    crc32 = crc32Array(stream, 37);
    stream.push(crc32 >> 24 & 255);
    stream.push(crc32 >> 16 & 255);
    stream.push(crc32 >> 8 & 255);
    stream.push(crc32 & 255);
    stream.push(0);
    stream.push(0);
    stream.push(0);
    stream.push(0);
    stream.push(73);
    stream.push(69);
    stream.push(78);
    stream.push(68);
    stream.push(174);
    stream.push(66);
    stream.push(96);
    stream.push(130);
    return "data:image/png;base64," + base64(stream);
  };
  numeric._dim = function _dim(x) {
    var ret = [];
    while (typeof x === "object") {
      ret.push(x.length);
      x = x[0];
    }
    return ret;
  };
  numeric.dim = function dim(x) {
    var y, z;
    if (typeof x === "object") {
      y = x[0];
      if (typeof y === "object") {
        z = y[0];
        if (typeof z === "object") {
          return numeric._dim(x);
        }
        return [x.length, y.length];
      }
      return [x.length];
    }
    return [];
  };
  numeric.mapreduce = function mapreduce(body, init) {
    return Function(
      "x",
      "accum",
      "_s",
      "_k",
      'if(typeof accum === "undefined") accum = ' + init + ';\nif(typeof x === "number") { var xi = x; ' + body + '; return accum; }\nif(typeof _s === "undefined") _s = numeric.dim(x);\nif(typeof _k === "undefined") _k = 0;\nvar _n = _s[_k];\nvar i,xi;\nif(_k < _s.length-1) {\n    for(i=_n-1;i>=0;i--) {\n        accum = arguments.callee(x[i],accum,_s,_k+1);\n    }    return accum;\n}\nfor(i=_n-1;i>=1;i-=2) { \n    xi = x[i];\n    ' + body + ";\n    xi = x[i-1];\n    " + body + ";\n}\nif(i === 0) {\n    xi = x[i];\n    " + body + "\n}\nreturn accum;"
    );
  };
  numeric.mapreduce2 = function mapreduce2(body, setup) {
    return Function(
      "x",
      "var n = x.length;\nvar i,xi;\n" + setup + ";\nfor(i=n-1;i!==-1;--i) { \n    xi = x[i];\n    " + body + ";\n}\nreturn accum;"
    );
  };
  numeric.same = function same(x, y) {
    var i, n;
    if (!(x instanceof Array) || !(y instanceof Array)) {
      return false;
    }
    n = x.length;
    if (n !== y.length) {
      return false;
    }
    for (i = 0; i < n; i++) {
      if (x[i] === y[i]) {
        continue;
      }
      if (typeof x[i] === "object") {
        if (!same(x[i], y[i])) return false;
      } else {
        return false;
      }
    }
    return true;
  };
  numeric.rep = function rep(s, v, k2) {
    if (typeof k2 === "undefined") {
      k2 = 0;
    }
    var n = s[k2], ret = Array(n), i;
    if (k2 === s.length - 1) {
      for (i = n - 2; i >= 0; i -= 2) {
        ret[i + 1] = v;
        ret[i] = v;
      }
      if (i === -1) {
        ret[0] = v;
      }
      return ret;
    }
    for (i = n - 1; i >= 0; i--) {
      ret[i] = numeric.rep(s, v, k2 + 1);
    }
    return ret;
  };
  numeric.dotMMsmall = function dotMMsmall(x, y) {
    var i, j, k2, p, q, r, ret, foo, bar, woo, i0;
    p = x.length;
    q = y.length;
    r = y[0].length;
    ret = Array(p);
    for (i = p - 1; i >= 0; i--) {
      foo = Array(r);
      bar = x[i];
      for (k2 = r - 1; k2 >= 0; k2--) {
        woo = bar[q - 1] * y[q - 1][k2];
        for (j = q - 2; j >= 1; j -= 2) {
          i0 = j - 1;
          woo += bar[j] * y[j][k2] + bar[i0] * y[i0][k2];
        }
        if (j === 0) {
          woo += bar[0] * y[0][k2];
        }
        foo[k2] = woo;
      }
      ret[i] = foo;
    }
    return ret;
  };
  numeric._getCol = function _getCol(A2, j, x) {
    var n = A2.length, i;
    for (i = n - 1; i > 0; --i) {
      x[i] = A2[i][j];
      --i;
      x[i] = A2[i][j];
    }
    if (i === 0) x[0] = A2[0][j];
  };
  numeric.dotMMbig = function dotMMbig(x, y) {
    var gc = numeric._getCol, p = y.length, v = Array(p);
    var m = x.length, n = y[0].length, A2 = new Array(m), xj;
    var VV = numeric.dotVV;
    var i, j;
    --p;
    --m;
    for (i = m; i !== -1; --i) A2[i] = Array(n);
    --n;
    for (i = n; i !== -1; --i) {
      gc(y, i, v);
      for (j = m; j !== -1; --j) {
        xj = x[j];
        A2[j][i] = VV(xj, v);
      }
    }
    return A2;
  };
  numeric.dotMV = function dotMV(x, y) {
    var p = x.length;
    y.length;
    var i;
    var ret = Array(p), dotVV = numeric.dotVV;
    for (i = p - 1; i >= 0; i--) {
      ret[i] = dotVV(x[i], y);
    }
    return ret;
  };
  numeric.dotVM = function dotVM(x, y) {
    var j, k2, p, q, ret, woo, i0;
    p = x.length;
    q = y[0].length;
    ret = Array(q);
    for (k2 = q - 1; k2 >= 0; k2--) {
      woo = x[p - 1] * y[p - 1][k2];
      for (j = p - 2; j >= 1; j -= 2) {
        i0 = j - 1;
        woo += x[j] * y[j][k2] + x[i0] * y[i0][k2];
      }
      if (j === 0) {
        woo += x[0] * y[0][k2];
      }
      ret[k2] = woo;
    }
    return ret;
  };
  numeric.dotVV = function dotVV(x, y) {
    var i, n = x.length, i1, ret = x[n - 1] * y[n - 1];
    for (i = n - 2; i >= 1; i -= 2) {
      i1 = i - 1;
      ret += x[i] * y[i] + x[i1] * y[i1];
    }
    if (i === 0) {
      ret += x[0] * y[0];
    }
    return ret;
  };
  numeric.dot = function dot(x, y) {
    var d = numeric.dim;
    switch (d(x).length * 1e3 + d(y).length) {
      case 2002:
        if (y.length < 10) return numeric.dotMMsmall(x, y);
        else return numeric.dotMMbig(x, y);
      case 2001:
        return numeric.dotMV(x, y);
      case 1002:
        return numeric.dotVM(x, y);
      case 1001:
        return numeric.dotVV(x, y);
      case 1e3:
        return numeric.mulVS(x, y);
      case 1:
        return numeric.mulSV(x, y);
      case 0:
        return x * y;
      default:
        throw new Error("numeric.dot only works on vectors and matrices");
    }
  };
  numeric.diag = function diag(d) {
    var i, i1, j, n = d.length, A2 = Array(n), Ai;
    for (i = n - 1; i >= 0; i--) {
      Ai = Array(n);
      i1 = i + 2;
      for (j = n - 1; j >= i1; j -= 2) {
        Ai[j] = 0;
        Ai[j - 1] = 0;
      }
      if (j > i) {
        Ai[j] = 0;
      }
      Ai[i] = d[i];
      for (j = i - 1; j >= 1; j -= 2) {
        Ai[j] = 0;
        Ai[j - 1] = 0;
      }
      if (j === 0) {
        Ai[0] = 0;
      }
      A2[i] = Ai;
    }
    return A2;
  };
  numeric.getDiag = function(A2) {
    var n = Math.min(A2.length, A2[0].length), i, ret = Array(n);
    for (i = n - 1; i >= 1; --i) {
      ret[i] = A2[i][i];
      --i;
      ret[i] = A2[i][i];
    }
    if (i === 0) {
      ret[0] = A2[0][0];
    }
    return ret;
  };
  numeric.identity = function identity(n) {
    return numeric.diag(numeric.rep([n], 1));
  };
  numeric.pointwise = function pointwise(params, body, setup) {
    if (typeof setup === "undefined") {
      setup = "";
    }
    var fun = [];
    var k2;
    var avec = /\[i\]$/, p, thevec = "";
    var haveret = false;
    for (k2 = 0; k2 < params.length; k2++) {
      if (avec.test(params[k2])) {
        p = params[k2].substring(0, params[k2].length - 3);
        thevec = p;
      } else {
        p = params[k2];
      }
      if (p === "ret") haveret = true;
      fun.push(p);
    }
    fun[params.length] = "_s";
    fun[params.length + 1] = "_k";
    fun[params.length + 2] = 'if(typeof _s === "undefined") _s = numeric.dim(' + thevec + ');\nif(typeof _k === "undefined") _k = 0;\nvar _n = _s[_k];\nvar i' + (haveret ? "" : ", ret = Array(_n)") + ";\nif(_k < _s.length-1) {\n    for(i=_n-1;i>=0;i--) ret[i] = arguments.callee(" + params.join(",") + ",_s,_k+1);\n    return ret;\n}\n" + setup + "\nfor(i=_n-1;i!==-1;--i) {\n    " + body + "\n}\nreturn ret;";
    return Function.apply(null, fun);
  };
  numeric.pointwise2 = function pointwise2(params, body, setup) {
    if (typeof setup === "undefined") {
      setup = "";
    }
    var fun = [];
    var k2;
    var avec = /\[i\]$/, p, thevec = "";
    var haveret = false;
    for (k2 = 0; k2 < params.length; k2++) {
      if (avec.test(params[k2])) {
        p = params[k2].substring(0, params[k2].length - 3);
        thevec = p;
      } else {
        p = params[k2];
      }
      if (p === "ret") haveret = true;
      fun.push(p);
    }
    fun[params.length] = "var _n = " + thevec + ".length;\nvar i" + (haveret ? "" : ", ret = Array(_n)") + ";\n" + setup + "\nfor(i=_n-1;i!==-1;--i) {\n" + body + "\n}\nreturn ret;";
    return Function.apply(null, fun);
  };
  numeric._biforeach = function _biforeach(x, y, s, k2, f) {
    if (k2 === s.length - 1) {
      f(x, y);
      return;
    }
    var i, n = s[k2];
    for (i = n - 1; i >= 0; i--) {
      _biforeach(typeof x === "object" ? x[i] : x, typeof y === "object" ? y[i] : y, s, k2 + 1, f);
    }
  };
  numeric._biforeach2 = function _biforeach2(x, y, s, k2, f) {
    if (k2 === s.length - 1) {
      return f(x, y);
    }
    var i, n = s[k2], ret = Array(n);
    for (i = n - 1; i >= 0; --i) {
      ret[i] = _biforeach2(typeof x === "object" ? x[i] : x, typeof y === "object" ? y[i] : y, s, k2 + 1, f);
    }
    return ret;
  };
  numeric._foreach = function _foreach(x, s, k2, f) {
    if (k2 === s.length - 1) {
      f(x);
      return;
    }
    var i, n = s[k2];
    for (i = n - 1; i >= 0; i--) {
      _foreach(x[i], s, k2 + 1, f);
    }
  };
  numeric._foreach2 = function _foreach2(x, s, k2, f) {
    if (k2 === s.length - 1) {
      return f(x);
    }
    var i, n = s[k2], ret = Array(n);
    for (i = n - 1; i >= 0; i--) {
      ret[i] = _foreach2(x[i], s, k2 + 1, f);
    }
    return ret;
  };
  numeric.ops2 = {
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
  };
  numeric.opseq = {
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
  };
  numeric.mathfuns = [
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
  ];
  numeric.mathfuns2 = ["atan2", "pow", "max", "min"];
  numeric.ops1 = {
    neg: "-",
    not: "!",
    bnot: "~",
    clone: ""
  };
  numeric.mapreducers = {
    any: ["if(xi) return true;", "var accum = false;"],
    all: ["if(!xi) return false;", "var accum = true;"],
    sum: ["accum += xi;", "var accum = 0;"],
    prod: ["accum *= xi;", "var accum = 1;"],
    norm2Squared: ["accum += xi*xi;", "var accum = 0;"],
    norminf: ["accum = max(accum,abs(xi));", "var accum = 0, max = Math.max, abs = Math.abs;"],
    norm1: ["accum += abs(xi)", "var accum = 0, abs = Math.abs;"],
    sup: ["accum = max(accum,xi);", "var accum = -Infinity, max = Math.max;"],
    inf: ["accum = min(accum,xi);", "var accum = Infinity, min = Math.min;"]
  };
  (function() {
    var i, o;
    for (i = 0; i < numeric.mathfuns2.length; ++i) {
      o = numeric.mathfuns2[i];
      numeric.ops2[o] = o;
    }
    for (i in numeric.ops2) {
      if (numeric.ops2.hasOwnProperty(i)) {
        o = numeric.ops2[i];
        var code, codeeq, setup = "";
        if (numeric.myIndexOf.call(numeric.mathfuns2, i) !== -1) {
          setup = "var " + o + " = Math." + o + ";\n";
          code = function(r, x, y) {
            return r + " = " + o + "(" + x + "," + y + ")";
          };
          codeeq = function(x, y) {
            return x + " = " + o + "(" + x + "," + y + ")";
          };
        } else {
          code = function(r, x, y) {
            return r + " = " + x + " " + o + " " + y;
          };
          if (numeric.opseq.hasOwnProperty(i + "eq")) {
            codeeq = function(x, y) {
              return x + " " + o + "= " + y;
            };
          } else {
            codeeq = function(x, y) {
              return x + " = " + x + " " + o + " " + y;
            };
          }
        }
        numeric[i + "VV"] = numeric.pointwise2(["x[i]", "y[i]"], code("ret[i]", "x[i]", "y[i]"), setup);
        numeric[i + "SV"] = numeric.pointwise2(["x", "y[i]"], code("ret[i]", "x", "y[i]"), setup);
        numeric[i + "VS"] = numeric.pointwise2(["x[i]", "y"], code("ret[i]", "x[i]", "y"), setup);
        numeric[i] = Function(
          "var n = arguments.length, i, x = arguments[0], y;\nvar VV = numeric." + i + "VV, VS = numeric." + i + "VS, SV = numeric." + i + 'SV;\nvar dim = numeric.dim;\nfor(i=1;i!==n;++i) { \n  y = arguments[i];\n  if(typeof x === "object") {\n      if(typeof y === "object") x = numeric._biforeach2(x,y,dim(x),0,VV);\n      else x = numeric._biforeach2(x,y,dim(x),0,VS);\n  } else if(typeof y === "object") x = numeric._biforeach2(x,y,dim(y),0,SV);\n  else ' + codeeq("x", "y") + "\n}\nreturn x;\n"
        );
        numeric[o] = numeric[i];
        numeric[i + "eqV"] = numeric.pointwise2(["ret[i]", "x[i]"], codeeq("ret[i]", "x[i]"), setup);
        numeric[i + "eqS"] = numeric.pointwise2(["ret[i]", "x"], codeeq("ret[i]", "x"), setup);
        numeric[i + "eq"] = Function(
          "var n = arguments.length, i, x = arguments[0], y;\nvar V = numeric." + i + "eqV, S = numeric." + i + 'eqS\nvar s = numeric.dim(x);\nfor(i=1;i!==n;++i) { \n  y = arguments[i];\n  if(typeof y === "object") numeric._biforeach(x,y,s,0,V);\n  else numeric._biforeach(x,y,s,0,S);\n}\nreturn x;\n'
        );
      }
    }
    for (i = 0; i < numeric.mathfuns2.length; ++i) {
      o = numeric.mathfuns2[i];
      delete numeric.ops2[o];
    }
    for (i = 0; i < numeric.mathfuns.length; ++i) {
      o = numeric.mathfuns[i];
      numeric.ops1[o] = o;
    }
    for (i in numeric.ops1) {
      if (numeric.ops1.hasOwnProperty(i)) {
        setup = "";
        o = numeric.ops1[i];
        if (numeric.myIndexOf.call(numeric.mathfuns, i) !== -1) {
          if (Math.hasOwnProperty(o)) setup = "var " + o + " = Math." + o + ";\n";
        }
        numeric[i + "eqV"] = numeric.pointwise2(["ret[i]"], "ret[i] = " + o + "(ret[i]);", setup);
        numeric[i + "eq"] = Function(
          "x",
          'if(typeof x !== "object") return ' + o + "x\nvar i;\nvar V = numeric." + i + "eqV;\nvar s = numeric.dim(x);\nnumeric._foreach(x,s,0,V);\nreturn x;\n"
        );
        numeric[i + "V"] = numeric.pointwise2(["x[i]"], "ret[i] = " + o + "(x[i]);", setup);
        numeric[i] = Function(
          "x",
          'if(typeof x !== "object") return ' + o + "(x)\nvar i;\nvar V = numeric." + i + "V;\nvar s = numeric.dim(x);\nreturn numeric._foreach2(x,s,0,V);\n"
        );
      }
    }
    for (i = 0; i < numeric.mathfuns.length; ++i) {
      o = numeric.mathfuns[i];
      delete numeric.ops1[o];
    }
    for (i in numeric.mapreducers) {
      if (numeric.mapreducers.hasOwnProperty(i)) {
        o = numeric.mapreducers[i];
        numeric[i + "V"] = numeric.mapreduce2(o[0], o[1]);
        numeric[i] = Function(
          "x",
          "s",
          "k",
          o[1] + 'if(typeof x !== "object") {    xi = x;\n' + o[0] + ';\n    return accum;\n}if(typeof s === "undefined") s = numeric.dim(x);\nif(typeof k === "undefined") k = 0;\nif(k === s.length-1) return numeric.' + i + "V(x);\nvar xi;\nvar n = x.length, i;\nfor(i=n-1;i!==-1;--i) {\n   xi = arguments.callee(x[i]);\n" + o[0] + ";\n}\nreturn accum;\n"
        );
      }
    }
  })();
  numeric.truncVV = numeric.pointwise(["x[i]", "y[i]"], "ret[i] = round(x[i]/y[i])*y[i];", "var round = Math.round;");
  numeric.truncVS = numeric.pointwise(["x[i]", "y"], "ret[i] = round(x[i]/y)*y;", "var round = Math.round;");
  numeric.truncSV = numeric.pointwise(["x", "y[i]"], "ret[i] = round(x/y[i])*y[i];", "var round = Math.round;");
  numeric.trunc = function trunc(x, y) {
    if (typeof x === "object") {
      if (typeof y === "object") return numeric.truncVV(x, y);
      return numeric.truncVS(x, y);
    }
    if (typeof y === "object") return numeric.truncSV(x, y);
    return Math.round(x / y) * y;
  };
  numeric.inv = function inv(x) {
    var s = numeric.dim(x), abs = Math.abs, m = s[0], n = s[1];
    var A2 = numeric.clone(x), Ai, Aj;
    var I = numeric.identity(m), Ii, Ij;
    var i, j, k2, x;
    for (j = 0; j < n; ++j) {
      var i0 = -1;
      var v0 = -1;
      for (i = j; i !== m; ++i) {
        k2 = abs(A2[i][j]);
        if (k2 > v0) {
          i0 = i;
          v0 = k2;
        }
      }
      Aj = A2[i0];
      A2[i0] = A2[j];
      A2[j] = Aj;
      Ij = I[i0];
      I[i0] = I[j];
      I[j] = Ij;
      x = Aj[j];
      for (k2 = j; k2 !== n; ++k2) Aj[k2] /= x;
      for (k2 = n - 1; k2 !== -1; --k2) Ij[k2] /= x;
      for (i = m - 1; i !== -1; --i) {
        if (i !== j) {
          Ai = A2[i];
          Ii = I[i];
          x = Ai[j];
          for (k2 = j + 1; k2 !== n; ++k2) Ai[k2] -= Aj[k2] * x;
          for (k2 = n - 1; k2 > 0; --k2) {
            Ii[k2] -= Ij[k2] * x;
            --k2;
            Ii[k2] -= Ij[k2] * x;
          }
          if (k2 === 0) Ii[0] -= Ij[0] * x;
        }
      }
    }
    return I;
  };
  numeric.det = function det(x) {
    var s = numeric.dim(x);
    if (s.length !== 2 || s[0] !== s[1]) {
      throw new Error("numeric: det() only works on square matrices");
    }
    var n = s[0], ret = 1, i, j, k2, A2 = numeric.clone(x), Aj, Ai, alpha, temp, k1;
    for (j = 0; j < n - 1; j++) {
      k2 = j;
      for (i = j + 1; i < n; i++) {
        if (Math.abs(A2[i][j]) > Math.abs(A2[k2][j])) {
          k2 = i;
        }
      }
      if (k2 !== j) {
        temp = A2[k2];
        A2[k2] = A2[j];
        A2[j] = temp;
        ret *= -1;
      }
      Aj = A2[j];
      for (i = j + 1; i < n; i++) {
        Ai = A2[i];
        alpha = Ai[j] / Aj[j];
        for (k2 = j + 1; k2 < n - 1; k2 += 2) {
          k1 = k2 + 1;
          Ai[k2] -= Aj[k2] * alpha;
          Ai[k1] -= Aj[k1] * alpha;
        }
        if (k2 !== n) {
          Ai[k2] -= Aj[k2] * alpha;
        }
      }
      if (Aj[j] === 0) {
        return 0;
      }
      ret *= Aj[j];
    }
    return ret * A2[j][j];
  };
  numeric.transpose = function transpose(x) {
    var i, j, m = x.length, n = x[0].length, ret = Array(n), A0, A1, Bj;
    for (j = 0; j < n; j++) ret[j] = Array(m);
    for (i = m - 1; i >= 1; i -= 2) {
      A1 = x[i];
      A0 = x[i - 1];
      for (j = n - 1; j >= 1; --j) {
        Bj = ret[j];
        Bj[i] = A1[j];
        Bj[i - 1] = A0[j];
        --j;
        Bj = ret[j];
        Bj[i] = A1[j];
        Bj[i - 1] = A0[j];
      }
      if (j === 0) {
        Bj = ret[0];
        Bj[i] = A1[0];
        Bj[i - 1] = A0[0];
      }
    }
    if (i === 0) {
      A0 = x[0];
      for (j = n - 1; j >= 1; --j) {
        ret[j][0] = A0[j];
        --j;
        ret[j][0] = A0[j];
      }
      if (j === 0) {
        ret[0][0] = A0[0];
      }
    }
    return ret;
  };
  numeric.negtranspose = function negtranspose(x) {
    var i, j, m = x.length, n = x[0].length, ret = Array(n), A0, A1, Bj;
    for (j = 0; j < n; j++) ret[j] = Array(m);
    for (i = m - 1; i >= 1; i -= 2) {
      A1 = x[i];
      A0 = x[i - 1];
      for (j = n - 1; j >= 1; --j) {
        Bj = ret[j];
        Bj[i] = -A1[j];
        Bj[i - 1] = -A0[j];
        --j;
        Bj = ret[j];
        Bj[i] = -A1[j];
        Bj[i - 1] = -A0[j];
      }
      if (j === 0) {
        Bj = ret[0];
        Bj[i] = -A1[0];
        Bj[i - 1] = -A0[0];
      }
    }
    if (i === 0) {
      A0 = x[0];
      for (j = n - 1; j >= 1; --j) {
        ret[j][0] = -A0[j];
        --j;
        ret[j][0] = -A0[j];
      }
      if (j === 0) {
        ret[0][0] = -A0[0];
      }
    }
    return ret;
  };
  numeric._random = function _random(s, k2) {
    var i, n = s[k2], ret = Array(n), rnd;
    if (k2 === s.length - 1) {
      rnd = Math.random;
      for (i = n - 1; i >= 1; i -= 2) {
        ret[i] = rnd();
        ret[i - 1] = rnd();
      }
      if (i === 0) {
        ret[0] = rnd();
      }
      return ret;
    }
    for (i = n - 1; i >= 0; i--) ret[i] = _random(s, k2 + 1);
    return ret;
  };
  numeric.random = function random(s) {
    return numeric._random(s, 0);
  };
  numeric.norm2 = function norm2(x) {
    return Math.sqrt(numeric.norm2Squared(x));
  };
  numeric.linspace = function linspace(a, b, n) {
    if (typeof n === "undefined") n = Math.max(Math.round(b - a) + 1, 1);
    if (n < 2) {
      return n === 1 ? [a] : [];
    }
    var i, ret = Array(n);
    n--;
    for (i = n; i >= 0; i--) {
      ret[i] = (i * b + (n - i) * a) / n;
    }
    return ret;
  };
  numeric.getBlock = function getBlock(x, from, to) {
    var s = numeric.dim(x);
    function foo(x2, k2) {
      var i, a = from[k2], n = to[k2] - a, ret = Array(n);
      if (k2 === s.length - 1) {
        for (i = n; i >= 0; i--) {
          ret[i] = x2[i + a];
        }
        return ret;
      }
      for (i = n; i >= 0; i--) {
        ret[i] = foo(x2[i + a], k2 + 1);
      }
      return ret;
    }
    return foo(x, 0);
  };
  numeric.setBlock = function setBlock(x, from, to, B2) {
    var s = numeric.dim(x);
    function foo(x2, y, k2) {
      var i, a = from[k2], n = to[k2] - a;
      if (k2 === s.length - 1) {
        for (i = n; i >= 0; i--) {
          x2[i + a] = y[i];
        }
      }
      for (i = n; i >= 0; i--) {
        foo(x2[i + a], y[i], k2 + 1);
      }
    }
    foo(x, B2, 0);
    return x;
  };
  numeric.getRange = function getRange(A2, I, J) {
    var m = I.length, n = J.length;
    var i, j;
    var B2 = Array(m), Bi, AI;
    for (i = m - 1; i !== -1; --i) {
      B2[i] = Array(n);
      Bi = B2[i];
      AI = A2[I[i]];
      for (j = n - 1; j !== -1; --j) Bi[j] = AI[J[j]];
    }
    return B2;
  };
  numeric.blockMatrix = function blockMatrix(X) {
    var s = numeric.dim(X);
    if (s.length < 4) return numeric.blockMatrix([X]);
    var m = s[0], n = s[1], M, N, i, j, Xij;
    M = 0;
    N = 0;
    for (i = 0; i < m; ++i) M += X[i][0].length;
    for (j = 0; j < n; ++j) N += X[0][j][0].length;
    var Z = Array(M);
    for (i = 0; i < M; ++i) Z[i] = Array(N);
    var I = 0, J, ZI, k2, l, Xijk;
    for (i = 0; i < m; ++i) {
      J = N;
      for (j = n - 1; j !== -1; --j) {
        Xij = X[i][j];
        J -= Xij[0].length;
        for (k2 = Xij.length - 1; k2 !== -1; --k2) {
          Xijk = Xij[k2];
          ZI = Z[I + k2];
          for (l = Xijk.length - 1; l !== -1; --l) ZI[J + l] = Xijk[l];
        }
      }
      I += X[i][0].length;
    }
    return Z;
  };
  numeric.tensor = function tensor(x, y) {
    if (typeof x === "number" || typeof y === "number") return numeric.mul(x, y);
    var s1 = numeric.dim(x), s2 = numeric.dim(y);
    if (s1.length !== 1 || s2.length !== 1) {
      throw new Error("numeric: tensor product is only defined for vectors");
    }
    var m = s1[0], n = s2[0], A2 = Array(m), Ai, i, j, xi;
    for (i = m - 1; i >= 0; i--) {
      Ai = Array(n);
      xi = x[i];
      for (j = n - 1; j >= 3; --j) {
        Ai[j] = xi * y[j];
        --j;
        Ai[j] = xi * y[j];
        --j;
        Ai[j] = xi * y[j];
        --j;
        Ai[j] = xi * y[j];
      }
      while (j >= 0) {
        Ai[j] = xi * y[j];
        --j;
      }
      A2[i] = Ai;
    }
    return A2;
  };
  numeric.T = function T2(x, y) {
    this.x = x;
    this.y = y;
  };
  numeric.t = function t(x, y) {
    return new numeric.T(x, y);
  };
  numeric.Tbinop = function Tbinop(rr, rc, cr, cc, setup) {
    numeric.indexOf;
    if (typeof setup !== "string") {
      var k2;
      setup = "";
      for (k2 in numeric) {
        if (numeric.hasOwnProperty(k2) && (rr.indexOf(k2) >= 0 || rc.indexOf(k2) >= 0 || cr.indexOf(k2) >= 0 || cc.indexOf(k2) >= 0) && k2.length > 1) {
          setup += "var " + k2 + " = numeric." + k2 + ";\n";
        }
      }
    }
    return Function(
      ["y"],
      "var x = this;\nif(!(y instanceof numeric.T)) { y = new numeric.T(y); }\n" + setup + "\nif(x.y) {  if(y.y) {    return new numeric.T(" + cc + ");\n  }\n  return new numeric.T(" + cr + ");\n}\nif(y.y) {\n  return new numeric.T(" + rc + ");\n}\nreturn new numeric.T(" + rr + ");\n"
    );
  };
  numeric.T.prototype.add = numeric.Tbinop(
    "add(x.x,y.x)",
    "add(x.x,y.x),y.y",
    "add(x.x,y.x),x.y",
    "add(x.x,y.x),add(x.y,y.y)"
  );
  numeric.T.prototype.sub = numeric.Tbinop(
    "sub(x.x,y.x)",
    "sub(x.x,y.x),neg(y.y)",
    "sub(x.x,y.x),x.y",
    "sub(x.x,y.x),sub(x.y,y.y)"
  );
  numeric.T.prototype.mul = numeric.Tbinop(
    "mul(x.x,y.x)",
    "mul(x.x,y.x),mul(x.x,y.y)",
    "mul(x.x,y.x),mul(x.y,y.x)",
    "sub(mul(x.x,y.x),mul(x.y,y.y)),add(mul(x.x,y.y),mul(x.y,y.x))"
  );
  numeric.T.prototype.reciprocal = function reciprocal() {
    var mul = numeric.mul, div = numeric.div;
    if (this.y) {
      var d = numeric.add(mul(this.x, this.x), mul(this.y, this.y));
      return new numeric.T(div(this.x, d), div(numeric.neg(this.y), d));
    }
    return new T(div(1, this.x));
  };
  numeric.T.prototype.div = function div(y) {
    if (!(y instanceof numeric.T)) y = new numeric.T(y);
    if (y.y) {
      return this.mul(y.reciprocal());
    }
    var div2 = numeric.div;
    if (this.y) {
      return new numeric.T(div2(this.x, y.x), div2(this.y, y.x));
    }
    return new numeric.T(div2(this.x, y.x));
  };
  numeric.T.prototype.dot = numeric.Tbinop(
    "dot(x.x,y.x)",
    "dot(x.x,y.x),dot(x.x,y.y)",
    "dot(x.x,y.x),dot(x.y,y.x)",
    "sub(dot(x.x,y.x),dot(x.y,y.y)),add(dot(x.x,y.y),dot(x.y,y.x))"
  );
  numeric.T.prototype.transpose = function transpose() {
    var t = numeric.transpose, x = this.x, y = this.y;
    if (y) {
      return new numeric.T(t(x), t(y));
    }
    return new numeric.T(t(x));
  };
  numeric.T.prototype.transjugate = function transjugate() {
    var t = numeric.transpose, x = this.x, y = this.y;
    if (y) {
      return new numeric.T(t(x), numeric.negtranspose(y));
    }
    return new numeric.T(t(x));
  };
  numeric.Tunop = function Tunop(r, c, s) {
    if (typeof s !== "string") {
      s = "";
    }
    return Function(
      "var x = this;\n" + s + "\nif(x.y) {  " + c + ";\n}\n" + r + ";\n"
    );
  };
  numeric.T.prototype.exp = numeric.Tunop(
    "return new numeric.T(ex)",
    "return new numeric.T(mul(cos(x.y),ex),mul(sin(x.y),ex))",
    "var ex = numeric.exp(x.x), cos = numeric.cos, sin = numeric.sin, mul = numeric.mul;"
  );
  numeric.T.prototype.conj = numeric.Tunop(
    "return new numeric.T(x.x);",
    "return new numeric.T(x.x,numeric.neg(x.y));"
  );
  numeric.T.prototype.neg = numeric.Tunop(
    "return new numeric.T(neg(x.x));",
    "return new numeric.T(neg(x.x),neg(x.y));",
    "var neg = numeric.neg;"
  );
  numeric.T.prototype.sin = numeric.Tunop(
    "return new numeric.T(numeric.sin(x.x))",
    "return x.exp().sub(x.neg().exp()).div(new numeric.T(0,2));"
  );
  numeric.T.prototype.cos = numeric.Tunop(
    "return new numeric.T(numeric.cos(x.x))",
    "return x.exp().add(x.neg().exp()).div(2);"
  );
  numeric.T.prototype.abs = numeric.Tunop(
    "return new numeric.T(numeric.abs(x.x));",
    "return new numeric.T(numeric.sqrt(numeric.add(mul(x.x,x.x),mul(x.y,x.y))));",
    "var mul = numeric.mul;"
  );
  numeric.T.prototype.log = numeric.Tunop(
    "return new numeric.T(numeric.log(x.x));",
    "var theta = new numeric.T(numeric.atan2(x.y,x.x)), r = x.abs();\nreturn new numeric.T(numeric.log(r.x),theta.x);"
  );
  numeric.T.prototype.norm2 = numeric.Tunop(
    "return numeric.norm2(x.x);",
    "var f = numeric.norm2Squared;\nreturn Math.sqrt(f(x.x)+f(x.y));"
  );
  numeric.T.prototype.inv = function inv() {
    var A2 = this;
    if (typeof A2.y === "undefined") {
      return new numeric.T(numeric.inv(A2.x));
    }
    var n = A2.x.length, i, j, k2;
    var Rx = numeric.identity(n), Ry = numeric.rep([n, n], 0);
    var Ax = numeric.clone(A2.x), Ay = numeric.clone(A2.y);
    var Aix, Aiy, Ajx, Ajy, Rix, Riy, Rjx, Rjy;
    var i, j, k2, d, d1, ax, ay, bx, by, temp;
    for (i = 0; i < n; i++) {
      ax = Ax[i][i];
      ay = Ay[i][i];
      d = ax * ax + ay * ay;
      k2 = i;
      for (j = i + 1; j < n; j++) {
        ax = Ax[j][i];
        ay = Ay[j][i];
        d1 = ax * ax + ay * ay;
        if (d1 > d) {
          k2 = j;
          d = d1;
        }
      }
      if (k2 !== i) {
        temp = Ax[i];
        Ax[i] = Ax[k2];
        Ax[k2] = temp;
        temp = Ay[i];
        Ay[i] = Ay[k2];
        Ay[k2] = temp;
        temp = Rx[i];
        Rx[i] = Rx[k2];
        Rx[k2] = temp;
        temp = Ry[i];
        Ry[i] = Ry[k2];
        Ry[k2] = temp;
      }
      Aix = Ax[i];
      Aiy = Ay[i];
      Rix = Rx[i];
      Riy = Ry[i];
      ax = Aix[i];
      ay = Aiy[i];
      for (j = i + 1; j < n; j++) {
        bx = Aix[j];
        by = Aiy[j];
        Aix[j] = (bx * ax + by * ay) / d;
        Aiy[j] = (by * ax - bx * ay) / d;
      }
      for (j = 0; j < n; j++) {
        bx = Rix[j];
        by = Riy[j];
        Rix[j] = (bx * ax + by * ay) / d;
        Riy[j] = (by * ax - bx * ay) / d;
      }
      for (j = i + 1; j < n; j++) {
        Ajx = Ax[j];
        Ajy = Ay[j];
        Rjx = Rx[j];
        Rjy = Ry[j];
        ax = Ajx[i];
        ay = Ajy[i];
        for (k2 = i + 1; k2 < n; k2++) {
          bx = Aix[k2];
          by = Aiy[k2];
          Ajx[k2] -= bx * ax - by * ay;
          Ajy[k2] -= by * ax + bx * ay;
        }
        for (k2 = 0; k2 < n; k2++) {
          bx = Rix[k2];
          by = Riy[k2];
          Rjx[k2] -= bx * ax - by * ay;
          Rjy[k2] -= by * ax + bx * ay;
        }
      }
    }
    for (i = n - 1; i > 0; i--) {
      Rix = Rx[i];
      Riy = Ry[i];
      for (j = i - 1; j >= 0; j--) {
        Rjx = Rx[j];
        Rjy = Ry[j];
        ax = Ax[j][i];
        ay = Ay[j][i];
        for (k2 = n - 1; k2 >= 0; k2--) {
          bx = Rix[k2];
          by = Riy[k2];
          Rjx[k2] -= ax * bx - ay * by;
          Rjy[k2] -= ax * by + ay * bx;
        }
      }
    }
    return new numeric.T(Rx, Ry);
  };
  numeric.T.prototype.get = function get(i) {
    var x = this.x, y = this.y, k2 = 0, ik, n = i.length;
    if (y) {
      while (k2 < n) {
        ik = i[k2];
        x = x[ik];
        y = y[ik];
        k2++;
      }
      return new numeric.T(x, y);
    }
    while (k2 < n) {
      ik = i[k2];
      x = x[ik];
      k2++;
    }
    return new numeric.T(x);
  };
  numeric.T.prototype.set = function set(i, v) {
    var x = this.x, y = this.y, k2 = 0, ik, n = i.length, vx = v.x, vy = v.y;
    if (n === 0) {
      if (vy) {
        this.y = vy;
      } else if (y) {
        this.y = void 0;
      }
      this.x = x;
      return this;
    }
    if (vy) {
      if (y) ;
      else {
        y = numeric.rep(numeric.dim(x), 0);
        this.y = y;
      }
      while (k2 < n - 1) {
        ik = i[k2];
        x = x[ik];
        y = y[ik];
        k2++;
      }
      ik = i[k2];
      x[ik] = vx;
      y[ik] = vy;
      return this;
    }
    if (y) {
      while (k2 < n - 1) {
        ik = i[k2];
        x = x[ik];
        y = y[ik];
        k2++;
      }
      ik = i[k2];
      x[ik] = vx;
      if (vx instanceof Array) y[ik] = numeric.rep(numeric.dim(vx), 0);
      else y[ik] = 0;
      return this;
    }
    while (k2 < n - 1) {
      ik = i[k2];
      x = x[ik];
      k2++;
    }
    ik = i[k2];
    x[ik] = vx;
    return this;
  };
  numeric.T.prototype.getRows = function getRows(i0, i1) {
    var n = i1 - i0 + 1, j;
    var rx = Array(n), ry, x = this.x, y = this.y;
    for (j = i0; j <= i1; j++) {
      rx[j - i0] = x[j];
    }
    if (y) {
      ry = Array(n);
      for (j = i0; j <= i1; j++) {
        ry[j - i0] = y[j];
      }
      return new numeric.T(rx, ry);
    }
    return new numeric.T(rx);
  };
  numeric.T.prototype.setRows = function setRows(i0, i1, A2) {
    var j;
    var rx = this.x, ry = this.y, x = A2.x, y = A2.y;
    for (j = i0; j <= i1; j++) {
      rx[j] = x[j - i0];
    }
    if (y) {
      if (!ry) {
        ry = numeric.rep(numeric.dim(rx), 0);
        this.y = ry;
      }
      for (j = i0; j <= i1; j++) {
        ry[j] = y[j - i0];
      }
    } else if (ry) {
      for (j = i0; j <= i1; j++) {
        ry[j] = numeric.rep([x[j - i0].length], 0);
      }
    }
    return this;
  };
  numeric.T.prototype.getRow = function getRow(k2) {
    var x = this.x, y = this.y;
    if (y) {
      return new numeric.T(x[k2], y[k2]);
    }
    return new numeric.T(x[k2]);
  };
  numeric.T.prototype.setRow = function setRow(i, v) {
    var rx = this.x, ry = this.y, x = v.x, y = v.y;
    rx[i] = x;
    if (y) {
      if (!ry) {
        ry = numeric.rep(numeric.dim(rx), 0);
        this.y = ry;
      }
      ry[i] = y;
    } else if (ry) {
      ry = numeric.rep([x.length], 0);
    }
    return this;
  };
  numeric.T.prototype.getBlock = function getBlock(from, to) {
    var x = this.x, y = this.y, b = numeric.getBlock;
    if (y) {
      return new numeric.T(b(x, from, to), b(y, from, to));
    }
    return new numeric.T(b(x, from, to));
  };
  numeric.T.prototype.setBlock = function setBlock(from, to, A2) {
    if (!(A2 instanceof numeric.T)) A2 = new numeric.T(A2);
    var x = this.x, y = this.y, b = numeric.setBlock, Ax = A2.x, Ay = A2.y;
    if (Ay) {
      if (!y) {
        this.y = numeric.rep(numeric.dim(this), 0);
        y = this.y;
      }
      b(x, from, to, Ax);
      b(y, from, to, Ay);
      return this;
    }
    b(x, from, to, Ax);
    if (y) b(y, from, to, numeric.rep(numeric.dim(Ax), 0));
  };
  numeric.T.rep = function rep(s, v) {
    var T2 = numeric.T;
    if (!(v instanceof T2)) v = new T2(v);
    var x = v.x, y = v.y, r = numeric.rep;
    if (y) return new T2(r(s, x), r(s, y));
    return new T2(r(s, x));
  };
  numeric.T.diag = function diag(d) {
    if (!(d instanceof numeric.T)) d = new numeric.T(d);
    var x = d.x, y = d.y, diag2 = numeric.diag;
    if (y) return new numeric.T(diag2(x), diag2(y));
    return new numeric.T(diag2(x));
  };
  numeric.T.eig = function eig() {
    if (this.y) {
      throw new Error("eig: not implemented for complex matrices.");
    }
    return numeric.eig(this.x);
  };
  numeric.T.identity = function identity(n) {
    return new numeric.T(numeric.identity(n));
  };
  numeric.T.prototype.getDiag = function getDiag() {
    var n = numeric;
    var x = this.x, y = this.y;
    if (y) {
      return new n.T(n.getDiag(x), n.getDiag(y));
    }
    return new n.T(n.getDiag(x));
  };
  numeric.house = function house(x) {
    var v = numeric.clone(x);
    var s = x[0] >= 0 ? 1 : -1;
    var alpha = s * numeric.norm2(x);
    v[0] += alpha;
    var foo = numeric.norm2(v);
    if (foo === 0) {
      throw new Error("eig: internal error");
    }
    return numeric.div(v, foo);
  };
  numeric.toUpperHessenberg = function toUpperHessenberg(me) {
    var s = numeric.dim(me);
    if (s.length !== 2 || s[0] !== s[1]) {
      throw new Error("numeric: toUpperHessenberg() only works on square matrices");
    }
    var m = s[0], i, j, k2, x, v, A2 = numeric.clone(me), B2, C2, Ai, Ci, Q = numeric.identity(m), Qi;
    for (j = 0; j < m - 2; j++) {
      x = Array(m - j - 1);
      for (i = j + 1; i < m; i++) {
        x[i - j - 1] = A2[i][j];
      }
      if (numeric.norm2(x) > 0) {
        v = numeric.house(x);
        B2 = numeric.getBlock(A2, [j + 1, j], [m - 1, m - 1]);
        C2 = numeric.tensor(v, numeric.dot(v, B2));
        for (i = j + 1; i < m; i++) {
          Ai = A2[i];
          Ci = C2[i - j - 1];
          for (k2 = j; k2 < m; k2++) Ai[k2] -= 2 * Ci[k2 - j];
        }
        B2 = numeric.getBlock(A2, [0, j + 1], [m - 1, m - 1]);
        C2 = numeric.tensor(numeric.dot(B2, v), v);
        for (i = 0; i < m; i++) {
          Ai = A2[i];
          Ci = C2[i];
          for (k2 = j + 1; k2 < m; k2++) Ai[k2] -= 2 * Ci[k2 - j - 1];
        }
        B2 = Array(m - j - 1);
        for (i = j + 1; i < m; i++) B2[i - j - 1] = Q[i];
        C2 = numeric.tensor(v, numeric.dot(v, B2));
        for (i = j + 1; i < m; i++) {
          Qi = Q[i];
          Ci = C2[i - j - 1];
          for (k2 = 0; k2 < m; k2++) Qi[k2] -= 2 * Ci[k2];
        }
      }
    }
    return { H: A2, Q };
  };
  numeric.epsilon = 2220446049250313e-31;
  numeric.QRFrancis = function(H, maxiter) {
    if (typeof maxiter === "undefined") {
      maxiter = 1e4;
    }
    H = numeric.clone(H);
    numeric.clone(H);
    var s = numeric.dim(H), m = s[0], x, v, a, b, c, d, det, tr, Hloc, Q = numeric.identity(m), Qi, Hi, B2, C2, Ci, i, j, k2, iter;
    if (m < 3) {
      return { Q, B: [[0, m - 1]] };
    }
    var epsilon = numeric.epsilon;
    for (iter = 0; iter < maxiter; iter++) {
      for (j = 0; j < m - 1; j++) {
        if (Math.abs(H[j + 1][j]) < epsilon * (Math.abs(H[j][j]) + Math.abs(H[j + 1][j + 1]))) {
          var QH1 = numeric.QRFrancis(numeric.getBlock(H, [0, 0], [j, j]), maxiter);
          var QH2 = numeric.QRFrancis(numeric.getBlock(H, [j + 1, j + 1], [m - 1, m - 1]), maxiter);
          B2 = Array(j + 1);
          for (i = 0; i <= j; i++) {
            B2[i] = Q[i];
          }
          C2 = numeric.dot(QH1.Q, B2);
          for (i = 0; i <= j; i++) {
            Q[i] = C2[i];
          }
          B2 = Array(m - j - 1);
          for (i = j + 1; i < m; i++) {
            B2[i - j - 1] = Q[i];
          }
          C2 = numeric.dot(QH2.Q, B2);
          for (i = j + 1; i < m; i++) {
            Q[i] = C2[i - j - 1];
          }
          return { Q, B: QH1.B.concat(numeric.add(QH2.B, j + 1)) };
        }
      }
      a = H[m - 2][m - 2];
      b = H[m - 2][m - 1];
      c = H[m - 1][m - 2];
      d = H[m - 1][m - 1];
      tr = a + d;
      det = a * d - b * c;
      Hloc = numeric.getBlock(H, [0, 0], [2, 2]);
      if (tr * tr >= 4 * det) {
        var s1, s2;
        s1 = 0.5 * (tr + Math.sqrt(tr * tr - 4 * det));
        s2 = 0.5 * (tr - Math.sqrt(tr * tr - 4 * det));
        Hloc = numeric.add(
          numeric.sub(
            numeric.dot(Hloc, Hloc),
            numeric.mul(Hloc, s1 + s2)
          ),
          numeric.diag(numeric.rep([3], s1 * s2))
        );
      } else {
        Hloc = numeric.add(
          numeric.sub(
            numeric.dot(Hloc, Hloc),
            numeric.mul(Hloc, tr)
          ),
          numeric.diag(numeric.rep([3], det))
        );
      }
      x = [Hloc[0][0], Hloc[1][0], Hloc[2][0]];
      v = numeric.house(x);
      B2 = [H[0], H[1], H[2]];
      C2 = numeric.tensor(v, numeric.dot(v, B2));
      for (i = 0; i < 3; i++) {
        Hi = H[i];
        Ci = C2[i];
        for (k2 = 0; k2 < m; k2++) Hi[k2] -= 2 * Ci[k2];
      }
      B2 = numeric.getBlock(H, [0, 0], [m - 1, 2]);
      C2 = numeric.tensor(numeric.dot(B2, v), v);
      for (i = 0; i < m; i++) {
        Hi = H[i];
        Ci = C2[i];
        for (k2 = 0; k2 < 3; k2++) Hi[k2] -= 2 * Ci[k2];
      }
      B2 = [Q[0], Q[1], Q[2]];
      C2 = numeric.tensor(v, numeric.dot(v, B2));
      for (i = 0; i < 3; i++) {
        Qi = Q[i];
        Ci = C2[i];
        for (k2 = 0; k2 < m; k2++) Qi[k2] -= 2 * Ci[k2];
      }
      var J;
      for (j = 0; j < m - 2; j++) {
        for (k2 = j; k2 <= j + 1; k2++) {
          if (Math.abs(H[k2 + 1][k2]) < epsilon * (Math.abs(H[k2][k2]) + Math.abs(H[k2 + 1][k2 + 1]))) {
            var QH1 = numeric.QRFrancis(numeric.getBlock(H, [0, 0], [k2, k2]), maxiter);
            var QH2 = numeric.QRFrancis(numeric.getBlock(H, [k2 + 1, k2 + 1], [m - 1, m - 1]), maxiter);
            B2 = Array(k2 + 1);
            for (i = 0; i <= k2; i++) {
              B2[i] = Q[i];
            }
            C2 = numeric.dot(QH1.Q, B2);
            for (i = 0; i <= k2; i++) {
              Q[i] = C2[i];
            }
            B2 = Array(m - k2 - 1);
            for (i = k2 + 1; i < m; i++) {
              B2[i - k2 - 1] = Q[i];
            }
            C2 = numeric.dot(QH2.Q, B2);
            for (i = k2 + 1; i < m; i++) {
              Q[i] = C2[i - k2 - 1];
            }
            return { Q, B: QH1.B.concat(numeric.add(QH2.B, k2 + 1)) };
          }
        }
        J = Math.min(m - 1, j + 3);
        x = Array(J - j);
        for (i = j + 1; i <= J; i++) {
          x[i - j - 1] = H[i][j];
        }
        v = numeric.house(x);
        B2 = numeric.getBlock(H, [j + 1, j], [J, m - 1]);
        C2 = numeric.tensor(v, numeric.dot(v, B2));
        for (i = j + 1; i <= J; i++) {
          Hi = H[i];
          Ci = C2[i - j - 1];
          for (k2 = j; k2 < m; k2++) Hi[k2] -= 2 * Ci[k2 - j];
        }
        B2 = numeric.getBlock(H, [0, j + 1], [m - 1, J]);
        C2 = numeric.tensor(numeric.dot(B2, v), v);
        for (i = 0; i < m; i++) {
          Hi = H[i];
          Ci = C2[i];
          for (k2 = j + 1; k2 <= J; k2++) Hi[k2] -= 2 * Ci[k2 - j - 1];
        }
        B2 = Array(J - j);
        for (i = j + 1; i <= J; i++) B2[i - j - 1] = Q[i];
        C2 = numeric.tensor(v, numeric.dot(v, B2));
        for (i = j + 1; i <= J; i++) {
          Qi = Q[i];
          Ci = C2[i - j - 1];
          for (k2 = 0; k2 < m; k2++) Qi[k2] -= 2 * Ci[k2];
        }
      }
    }
    throw new Error("numeric: eigenvalue iteration does not converge -- increase maxiter?");
  };
  numeric.eig = function eig(A2, maxiter) {
    var QH = numeric.toUpperHessenberg(A2);
    var QB = numeric.QRFrancis(QH.H, maxiter);
    var T2 = numeric.T;
    var n = A2.length, i, k2, B2 = QB.B, H = numeric.dot(QB.Q, numeric.dot(QH.H, numeric.transpose(QB.Q)));
    var Q = new T2(numeric.dot(QB.Q, QH.Q)), Q0;
    var m = B2.length, j;
    var a, b, c, d, p1, p2, disc, x, y, p, q, n1, n2;
    var sqrt = Math.sqrt;
    for (k2 = 0; k2 < m; k2++) {
      i = B2[k2][0];
      if (i === B2[k2][1]) ;
      else {
        j = i + 1;
        a = H[i][i];
        b = H[i][j];
        c = H[j][i];
        d = H[j][j];
        if (b === 0 && c === 0) continue;
        p1 = -a - d;
        p2 = a * d - b * c;
        disc = p1 * p1 - 4 * p2;
        if (disc >= 0) {
          if (p1 < 0) x = -0.5 * (p1 - sqrt(disc));
          else x = -0.5 * (p1 + sqrt(disc));
          n1 = (a - x) * (a - x) + b * b;
          n2 = c * c + (d - x) * (d - x);
          if (n1 > n2) {
            n1 = sqrt(n1);
            p = (a - x) / n1;
            q = b / n1;
          } else {
            n2 = sqrt(n2);
            p = c / n2;
            q = (d - x) / n2;
          }
          Q0 = new T2([[q, -p], [p, q]]);
          Q.setRows(i, j, Q0.dot(Q.getRows(i, j)));
        } else {
          x = -0.5 * p1;
          y = 0.5 * sqrt(-disc);
          n1 = (a - x) * (a - x) + b * b;
          n2 = c * c + (d - x) * (d - x);
          if (n1 > n2) {
            n1 = sqrt(n1 + y * y);
            p = (a - x) / n1;
            q = b / n1;
            x = 0;
            y /= n1;
          } else {
            n2 = sqrt(n2 + y * y);
            p = c / n2;
            q = (d - x) / n2;
            x = y / n2;
            y = 0;
          }
          Q0 = new T2([[q, -p], [p, q]], [[x, y], [y, -x]]);
          Q.setRows(i, j, Q0.dot(Q.getRows(i, j)));
        }
      }
    }
    var R = Q.dot(A2).dot(Q.transjugate()), n = A2.length, E = numeric.T.identity(n);
    for (j = 0; j < n; j++) {
      if (j > 0) {
        for (k2 = j - 1; k2 >= 0; k2--) {
          var Rk = R.get([k2, k2]), Rj = R.get([j, j]);
          if (numeric.neq(Rk.x, Rj.x) || numeric.neq(Rk.y, Rj.y)) {
            x = R.getRow(k2).getBlock([k2], [j - 1]);
            y = E.getRow(j).getBlock([k2], [j - 1]);
            E.set([j, k2], R.get([k2, j]).neg().sub(x.dot(y)).div(Rk.sub(Rj)));
          } else {
            E.setRow(j, E.getRow(k2));
            continue;
          }
        }
      }
    }
    for (j = 0; j < n; j++) {
      x = E.getRow(j);
      E.setRow(j, x.div(x.norm2()));
    }
    E = E.transpose();
    E = Q.transjugate().dot(E);
    return { lambda: R.getDiag(), E };
  };
  numeric.ccsSparse = function ccsSparse(A2) {
    var m = A2.length, n, foo, i, j, counts = [];
    for (i = m - 1; i !== -1; --i) {
      foo = A2[i];
      for (j in foo) {
        j = parseInt(j);
        while (j >= counts.length) counts[counts.length] = 0;
        if (foo[j] !== 0) counts[j]++;
      }
    }
    var n = counts.length;
    var Ai = Array(n + 1);
    Ai[0] = 0;
    for (i = 0; i < n; ++i) Ai[i + 1] = Ai[i] + counts[i];
    var Aj = Array(Ai[n]), Av = Array(Ai[n]);
    for (i = m - 1; i !== -1; --i) {
      foo = A2[i];
      for (j in foo) {
        if (foo[j] !== 0) {
          counts[j]--;
          Aj[Ai[j] + counts[j]] = i;
          Av[Ai[j] + counts[j]] = foo[j];
        }
      }
    }
    return [Ai, Aj, Av];
  };
  numeric.ccsFull = function ccsFull(A2) {
    var Ai = A2[0], Aj = A2[1], Av = A2[2], s = numeric.ccsDim(A2), m = s[0], n = s[1], i, j, j0, j1;
    var B2 = numeric.rep([m, n], 0);
    for (i = 0; i < n; i++) {
      j0 = Ai[i];
      j1 = Ai[i + 1];
      for (j = j0; j < j1; ++j) {
        B2[Aj[j]][i] = Av[j];
      }
    }
    return B2;
  };
  numeric.ccsTSolve = function ccsTSolve(A2, b, x, bj, xj) {
    var Ai = A2[0], Aj = A2[1], Av = A2[2], m = Ai.length - 1, max = Math.max, n = 0;
    if (typeof bj === "undefined") x = numeric.rep([m], 0);
    if (typeof bj === "undefined") bj = numeric.linspace(0, x.length - 1);
    if (typeof xj === "undefined") xj = [];
    function dfs(j2) {
      var k3;
      if (x[j2] !== 0) return;
      x[j2] = 1;
      for (k3 = Ai[j2]; k3 < Ai[j2 + 1]; ++k3) dfs(Aj[k3]);
      xj[n] = j2;
      ++n;
    }
    var i, j, j0, j1, k2, l, a;
    for (i = bj.length - 1; i !== -1; --i) {
      dfs(bj[i]);
    }
    xj.length = n;
    for (i = xj.length - 1; i !== -1; --i) {
      x[xj[i]] = 0;
    }
    for (i = bj.length - 1; i !== -1; --i) {
      j = bj[i];
      x[j] = b[j];
    }
    for (i = xj.length - 1; i !== -1; --i) {
      j = xj[i];
      j0 = Ai[j];
      j1 = max(Ai[j + 1], j0);
      for (k2 = j0; k2 !== j1; ++k2) {
        if (Aj[k2] === j) {
          x[j] /= Av[k2];
          break;
        }
      }
      a = x[j];
      for (k2 = j0; k2 !== j1; ++k2) {
        l = Aj[k2];
        if (l !== j) x[l] -= a * Av[k2];
      }
    }
    return x;
  };
  numeric.ccsDFS = function ccsDFS(n) {
    this.k = Array(n);
    this.k1 = Array(n);
    this.j = Array(n);
  };
  numeric.ccsDFS.prototype.dfs = function dfs(J, Ai, Aj, x, xj, Pinv) {
    var m = 0, foo, n = xj.length;
    var k2 = this.k, k1 = this.k1, j = this.j, km, k11;
    if (x[J] !== 0) return;
    x[J] = 1;
    j[0] = J;
    k2[0] = km = Ai[J];
    k1[0] = k11 = Ai[J + 1];
    while (1) {
      if (km >= k11) {
        xj[n] = j[m];
        if (m === 0) return;
        ++n;
        --m;
        km = k2[m];
        k11 = k1[m];
      } else {
        foo = Pinv[Aj[km]];
        if (x[foo] === 0) {
          x[foo] = 1;
          k2[m] = km;
          ++m;
          j[m] = foo;
          km = Ai[foo];
          k1[m] = k11 = Ai[foo + 1];
        } else ++km;
      }
    }
  };
  numeric.ccsLPSolve = function ccsLPSolve(A2, B2, x, xj, I, Pinv, dfs) {
    var Ai = A2[0], Aj = A2[1], Av = A2[2];
    Ai.length - 1;
    var Bi = B2[0], Bj = B2[1], Bv = B2[2];
    var i, i0, i1, j, j0, j1, k2, l, a;
    i0 = Bi[I];
    i1 = Bi[I + 1];
    xj.length = 0;
    for (i = i0; i < i1; ++i) {
      dfs.dfs(Pinv[Bj[i]], Ai, Aj, x, xj, Pinv);
    }
    for (i = xj.length - 1; i !== -1; --i) {
      x[xj[i]] = 0;
    }
    for (i = i0; i !== i1; ++i) {
      j = Pinv[Bj[i]];
      x[j] = Bv[i];
    }
    for (i = xj.length - 1; i !== -1; --i) {
      j = xj[i];
      j0 = Ai[j];
      j1 = Ai[j + 1];
      for (k2 = j0; k2 < j1; ++k2) {
        if (Pinv[Aj[k2]] === j) {
          x[j] /= Av[k2];
          break;
        }
      }
      a = x[j];
      for (k2 = j0; k2 < j1; ++k2) {
        l = Pinv[Aj[k2]];
        if (l !== j) x[l] -= a * Av[k2];
      }
    }
    return x;
  };
  numeric.ccsLUP1 = function ccsLUP1(A2, threshold) {
    var m = A2[0].length - 1;
    var L = [numeric.rep([m + 1], 0), [], []], U2 = [numeric.rep([m + 1], 0), [], []];
    var Li = L[0], Lj = L[1], Lv = L[2], Ui = U2[0], Uj = U2[1], Uv = U2[2];
    var x = numeric.rep([m], 0), xj = numeric.rep([m], 0);
    var i, j, k2, a, e, c, d;
    var sol = numeric.ccsLPSolve, abs = Math.abs;
    var P2 = numeric.linspace(0, m - 1), Pinv = numeric.linspace(0, m - 1);
    var dfs = new numeric.ccsDFS(m);
    if (typeof threshold === "undefined") {
      threshold = 1;
    }
    for (i = 0; i < m; ++i) {
      sol(L, A2, x, xj, i, Pinv, dfs);
      a = -1;
      e = -1;
      for (j = xj.length - 1; j !== -1; --j) {
        k2 = xj[j];
        if (k2 <= i) continue;
        c = abs(x[k2]);
        if (c > a) {
          e = k2;
          a = c;
        }
      }
      if (abs(x[i]) < threshold * a) {
        j = P2[i];
        a = P2[e];
        P2[i] = a;
        Pinv[a] = i;
        P2[e] = j;
        Pinv[j] = e;
        a = x[i];
        x[i] = x[e];
        x[e] = a;
      }
      a = Li[i];
      e = Ui[i];
      d = x[i];
      Lj[a] = P2[i];
      Lv[a] = 1;
      ++a;
      for (j = xj.length - 1; j !== -1; --j) {
        k2 = xj[j];
        c = x[k2];
        xj[j] = 0;
        x[k2] = 0;
        if (k2 <= i) {
          Uj[e] = k2;
          Uv[e] = c;
          ++e;
        } else {
          Lj[a] = P2[k2];
          Lv[a] = c / d;
          ++a;
        }
      }
      Li[i + 1] = a;
      Ui[i + 1] = e;
    }
    for (j = Lj.length - 1; j !== -1; --j) {
      Lj[j] = Pinv[Lj[j]];
    }
    return { L, U: U2, P: P2, Pinv };
  };
  numeric.ccsDFS0 = function ccsDFS0(n) {
    this.k = Array(n);
    this.k1 = Array(n);
    this.j = Array(n);
  };
  numeric.ccsDFS0.prototype.dfs = function dfs(J, Ai, Aj, x, xj, Pinv, P2) {
    var m = 0, foo, n = xj.length;
    var k2 = this.k, k1 = this.k1, j = this.j, km, k11;
    if (x[J] !== 0) return;
    x[J] = 1;
    j[0] = J;
    k2[0] = km = Ai[Pinv[J]];
    k1[0] = k11 = Ai[Pinv[J] + 1];
    while (1) {
      if (isNaN(km)) throw new Error("Ow!");
      if (km >= k11) {
        xj[n] = Pinv[j[m]];
        if (m === 0) return;
        ++n;
        --m;
        km = k2[m];
        k11 = k1[m];
      } else {
        foo = Aj[km];
        if (x[foo] === 0) {
          x[foo] = 1;
          k2[m] = km;
          ++m;
          j[m] = foo;
          foo = Pinv[foo];
          km = Ai[foo];
          k1[m] = k11 = Ai[foo + 1];
        } else ++km;
      }
    }
  };
  numeric.ccsLPSolve0 = function ccsLPSolve0(A2, B2, y, xj, I, Pinv, P2, dfs) {
    var Ai = A2[0], Aj = A2[1], Av = A2[2];
    Ai.length - 1;
    var Bi = B2[0], Bj = B2[1], Bv = B2[2];
    var i, i0, i1, j, j0, j1, k2, l, a;
    i0 = Bi[I];
    i1 = Bi[I + 1];
    xj.length = 0;
    for (i = i0; i < i1; ++i) {
      dfs.dfs(Bj[i], Ai, Aj, y, xj, Pinv, P2);
    }
    for (i = xj.length - 1; i !== -1; --i) {
      j = xj[i];
      y[P2[j]] = 0;
    }
    for (i = i0; i !== i1; ++i) {
      j = Bj[i];
      y[j] = Bv[i];
    }
    for (i = xj.length - 1; i !== -1; --i) {
      j = xj[i];
      l = P2[j];
      j0 = Ai[j];
      j1 = Ai[j + 1];
      for (k2 = j0; k2 < j1; ++k2) {
        if (Aj[k2] === l) {
          y[l] /= Av[k2];
          break;
        }
      }
      a = y[l];
      for (k2 = j0; k2 < j1; ++k2) y[Aj[k2]] -= a * Av[k2];
      y[l] = a;
    }
  };
  numeric.ccsLUP0 = function ccsLUP0(A2, threshold) {
    var m = A2[0].length - 1;
    var L = [numeric.rep([m + 1], 0), [], []], U2 = [numeric.rep([m + 1], 0), [], []];
    var Li = L[0], Lj = L[1], Lv = L[2], Ui = U2[0], Uj = U2[1], Uv = U2[2];
    var y = numeric.rep([m], 0), xj = numeric.rep([m], 0);
    var i, j, k2, a, e, c, d;
    var sol = numeric.ccsLPSolve0, abs = Math.abs;
    var P2 = numeric.linspace(0, m - 1), Pinv = numeric.linspace(0, m - 1);
    var dfs = new numeric.ccsDFS0(m);
    if (typeof threshold === "undefined") {
      threshold = 1;
    }
    for (i = 0; i < m; ++i) {
      sol(L, A2, y, xj, i, Pinv, P2, dfs);
      a = -1;
      e = -1;
      for (j = xj.length - 1; j !== -1; --j) {
        k2 = xj[j];
        if (k2 <= i) continue;
        c = abs(y[P2[k2]]);
        if (c > a) {
          e = k2;
          a = c;
        }
      }
      if (abs(y[P2[i]]) < threshold * a) {
        j = P2[i];
        a = P2[e];
        P2[i] = a;
        Pinv[a] = i;
        P2[e] = j;
        Pinv[j] = e;
      }
      a = Li[i];
      e = Ui[i];
      d = y[P2[i]];
      Lj[a] = P2[i];
      Lv[a] = 1;
      ++a;
      for (j = xj.length - 1; j !== -1; --j) {
        k2 = xj[j];
        c = y[P2[k2]];
        xj[j] = 0;
        y[P2[k2]] = 0;
        if (k2 <= i) {
          Uj[e] = k2;
          Uv[e] = c;
          ++e;
        } else {
          Lj[a] = P2[k2];
          Lv[a] = c / d;
          ++a;
        }
      }
      Li[i + 1] = a;
      Ui[i + 1] = e;
    }
    for (j = Lj.length - 1; j !== -1; --j) {
      Lj[j] = Pinv[Lj[j]];
    }
    return { L, U: U2, P: P2, Pinv };
  };
  numeric.ccsLUP = numeric.ccsLUP0;
  numeric.ccsDim = function ccsDim(A2) {
    return [numeric.sup(A2[1]) + 1, A2[0].length - 1];
  };
  numeric.ccsGetBlock = function ccsGetBlock(A2, i, j) {
    var s = numeric.ccsDim(A2), m = s[0], n = s[1];
    if (typeof i === "undefined") {
      i = numeric.linspace(0, m - 1);
    } else if (typeof i === "number") {
      i = [i];
    }
    if (typeof j === "undefined") {
      j = numeric.linspace(0, n - 1);
    } else if (typeof j === "number") {
      j = [j];
    }
    var p, P2 = i.length, q, Q = j.length, r, jq, ip;
    var Bi = numeric.rep([n], 0), Bj = [], Bv = [], B2 = [Bi, Bj, Bv];
    var Ai = A2[0], Aj = A2[1], Av = A2[2];
    var x = numeric.rep([m], 0), count = 0, flags = numeric.rep([m], 0);
    for (q = 0; q < Q; ++q) {
      jq = j[q];
      var q0 = Ai[jq];
      var q1 = Ai[jq + 1];
      for (p = q0; p < q1; ++p) {
        r = Aj[p];
        flags[r] = 1;
        x[r] = Av[p];
      }
      for (p = 0; p < P2; ++p) {
        ip = i[p];
        if (flags[ip]) {
          Bj[count] = p;
          Bv[count] = x[i[p]];
          ++count;
        }
      }
      for (p = q0; p < q1; ++p) {
        r = Aj[p];
        flags[r] = 0;
      }
      Bi[q + 1] = count;
    }
    return B2;
  };
  numeric.ccsDot = function ccsDot(A2, B2) {
    var Ai = A2[0], Aj = A2[1], Av = A2[2];
    var Bi = B2[0], Bj = B2[1], Bv = B2[2];
    var sA = numeric.ccsDim(A2), sB = numeric.ccsDim(B2);
    var m = sA[0];
    sA[1];
    var o = sB[1];
    var x = numeric.rep([m], 0), flags = numeric.rep([m], 0), xj = Array(m);
    var Ci = numeric.rep([o], 0), Cj = [], Cv = [], C2 = [Ci, Cj, Cv];
    var i, j, k2, j0, j1, i0, i1, l, p, a, b;
    for (k2 = 0; k2 !== o; ++k2) {
      j0 = Bi[k2];
      j1 = Bi[k2 + 1];
      p = 0;
      for (j = j0; j < j1; ++j) {
        a = Bj[j];
        b = Bv[j];
        i0 = Ai[a];
        i1 = Ai[a + 1];
        for (i = i0; i < i1; ++i) {
          l = Aj[i];
          if (flags[l] === 0) {
            xj[p] = l;
            flags[l] = 1;
            p = p + 1;
          }
          x[l] = x[l] + Av[i] * b;
        }
      }
      j0 = Ci[k2];
      j1 = j0 + p;
      Ci[k2 + 1] = j1;
      for (j = p - 1; j !== -1; --j) {
        b = j0 + j;
        i = xj[j];
        Cj[b] = i;
        Cv[b] = x[i];
        flags[i] = 0;
        x[i] = 0;
      }
      Ci[k2 + 1] = Ci[k2] + p;
    }
    return C2;
  };
  numeric.ccsLUPSolve = function ccsLUPSolve(LUP, B2) {
    var L = LUP.L, U2 = LUP.U;
    LUP.P;
    var Bi = B2[0];
    var flag = false;
    if (typeof Bi !== "object") {
      B2 = [[0, B2.length], numeric.linspace(0, B2.length - 1), B2];
      Bi = B2[0];
      flag = true;
    }
    var Bj = B2[1], Bv = B2[2];
    var n = L[0].length - 1, m = Bi.length - 1;
    var x = numeric.rep([n], 0), xj = Array(n);
    var b = numeric.rep([n], 0), bj = Array(n);
    var Xi = numeric.rep([m + 1], 0), Xj = [], Xv = [];
    var sol = numeric.ccsTSolve;
    var i, j, j0, j1, k2, J, N = 0;
    for (i = 0; i < m; ++i) {
      k2 = 0;
      j0 = Bi[i];
      j1 = Bi[i + 1];
      for (j = j0; j < j1; ++j) {
        J = LUP.Pinv[Bj[j]];
        bj[k2] = J;
        b[J] = Bv[j];
        ++k2;
      }
      bj.length = k2;
      sol(L, b, x, bj, xj);
      for (j = bj.length - 1; j !== -1; --j) b[bj[j]] = 0;
      sol(U2, x, b, xj, bj);
      if (flag) return b;
      for (j = xj.length - 1; j !== -1; --j) x[xj[j]] = 0;
      for (j = bj.length - 1; j !== -1; --j) {
        J = bj[j];
        Xj[N] = J;
        Xv[N] = b[J];
        b[J] = 0;
        ++N;
      }
      Xi[i + 1] = N;
    }
    return [Xi, Xj, Xv];
  };
  numeric.ccsbinop = function ccsbinop(body, setup) {
    if (typeof setup === "undefined") setup = "";
    return Function(
      "X",
      "Y",
      "var Xi = X[0], Xj = X[1], Xv = X[2];\nvar Yi = Y[0], Yj = Y[1], Yv = Y[2];\nvar n = Xi.length-1,m = Math.max(numeric.sup(Xj),numeric.sup(Yj))+1;\nvar Zi = numeric.rep([n+1],0), Zj = [], Zv = [];\nvar x = numeric.rep([m],0),y = numeric.rep([m],0);\nvar xk,yk,zk;\nvar i,j,j0,j1,k,p=0;\n" + setup + "for(i=0;i<n;++i) {\n  j0 = Xi[i]; j1 = Xi[i+1];\n  for(j=j0;j!==j1;++j) {\n    k = Xj[j];\n    x[k] = 1;\n    Zj[p] = k;\n    ++p;\n  }\n  j0 = Yi[i]; j1 = Yi[i+1];\n  for(j=j0;j!==j1;++j) {\n    k = Yj[j];\n    y[k] = Yv[j];\n    if(x[k] === 0) {\n      Zj[p] = k;\n      ++p;\n    }\n  }\n  Zi[i+1] = p;\n  j0 = Xi[i]; j1 = Xi[i+1];\n  for(j=j0;j!==j1;++j) x[Xj[j]] = Xv[j];\n  j0 = Zi[i]; j1 = Zi[i+1];\n  for(j=j0;j!==j1;++j) {\n    k = Zj[j];\n    xk = x[k];\n    yk = y[k];\n" + body + "\n    Zv[j] = zk;\n  }\n  j0 = Xi[i]; j1 = Xi[i+1];\n  for(j=j0;j!==j1;++j) x[Xj[j]] = 0;\n  j0 = Yi[i]; j1 = Yi[i+1];\n  for(j=j0;j!==j1;++j) y[Yj[j]] = 0;\n}\nreturn [Zi,Zj,Zv];"
    );
  };
  (function() {
    var k, A, B, C;
    for (k in numeric.ops2) {
      if (isFinite(eval("1" + numeric.ops2[k] + "0"))) A = "[Y[0],Y[1],numeric." + k + "(X,Y[2])]";
      else A = "NaN";
      if (isFinite(eval("0" + numeric.ops2[k] + "1"))) B = "[X[0],X[1],numeric." + k + "(X[2],Y)]";
      else B = "NaN";
      if (isFinite(eval("1" + numeric.ops2[k] + "0")) && isFinite(eval("0" + numeric.ops2[k] + "1"))) C = "numeric.ccs" + k + "MM(X,Y)";
      else C = "NaN";
      numeric["ccs" + k + "MM"] = numeric.ccsbinop("zk = xk " + numeric.ops2[k] + "yk;");
      numeric["ccs" + k] = Function(
        "X",
        "Y",
        'if(typeof X === "number") return ' + A + ';\nif(typeof Y === "number") return ' + B + ";\nreturn " + C + ";\n"
      );
    }
  })();
  numeric.ccsScatter = function ccsScatter(A2) {
    var Ai = A2[0], Aj = A2[1], Av = A2[2];
    var n = numeric.sup(Aj) + 1, m = Ai.length;
    var Ri = numeric.rep([n], 0), Rj = Array(m), Rv = Array(m);
    var counts = numeric.rep([n], 0), i;
    for (i = 0; i < m; ++i) counts[Aj[i]]++;
    for (i = 0; i < n; ++i) Ri[i + 1] = Ri[i] + counts[i];
    var ptr = Ri.slice(0), k2, Aii;
    for (i = 0; i < m; ++i) {
      Aii = Aj[i];
      k2 = ptr[Aii];
      Rj[k2] = Ai[i];
      Rv[k2] = Av[i];
      ptr[Aii] = ptr[Aii] + 1;
    }
    return [Ri, Rj, Rv];
  };
  numeric.ccsGather = function ccsGather(A2) {
    var Ai = A2[0], Aj = A2[1], Av = A2[2];
    var n = Ai.length - 1, m = Aj.length;
    var Ri = Array(m), Rj = Array(m), Rv = Array(m);
    var i, j, j0, j1, p;
    p = 0;
    for (i = 0; i < n; ++i) {
      j0 = Ai[i];
      j1 = Ai[i + 1];
      for (j = j0; j !== j1; ++j) {
        Rj[p] = i;
        Ri[p] = Aj[j];
        Rv[p] = Av[j];
        ++p;
      }
    }
    return [Ri, Rj, Rv];
  };
  numeric.sdim = function dim(A2, ret, k2) {
    if (typeof ret === "undefined") {
      ret = [];
    }
    if (typeof A2 !== "object") return ret;
    if (typeof k2 === "undefined") {
      k2 = 0;
    }
    if (!(k2 in ret)) {
      ret[k2] = 0;
    }
    if (A2.length > ret[k2]) ret[k2] = A2.length;
    var i;
    for (i in A2) {
      if (A2.hasOwnProperty(i)) dim(A2[i], ret, k2 + 1);
    }
    return ret;
  };
  numeric.sclone = function clone(A2, k2, n) {
    if (typeof k2 === "undefined") {
      k2 = 0;
    }
    if (typeof n === "undefined") {
      n = numeric.sdim(A2).length;
    }
    var i, ret = Array(A2.length);
    if (k2 === n - 1) {
      for (i in A2) {
        if (A2.hasOwnProperty(i)) ret[i] = A2[i];
      }
      return ret;
    }
    for (i in A2) {
      if (A2.hasOwnProperty(i)) ret[i] = clone(A2[i], k2 + 1, n);
    }
    return ret;
  };
  numeric.sdiag = function diag(d) {
    var n = d.length, i, ret = Array(n), i1;
    for (i = n - 1; i >= 1; i -= 2) {
      i1 = i - 1;
      ret[i] = [];
      ret[i][i] = d[i];
      ret[i1] = [];
      ret[i1][i1] = d[i1];
    }
    if (i === 0) {
      ret[0] = [];
      ret[0][0] = d[i];
    }
    return ret;
  };
  numeric.sidentity = function identity(n) {
    return numeric.sdiag(numeric.rep([n], 1));
  };
  numeric.stranspose = function transpose(A2) {
    var ret = [];
    A2.length;
    var i, j, Ai;
    for (i in A2) {
      if (!A2.hasOwnProperty(i)) continue;
      Ai = A2[i];
      for (j in Ai) {
        if (!Ai.hasOwnProperty(j)) continue;
        if (typeof ret[j] !== "object") {
          ret[j] = [];
        }
        ret[j][i] = Ai[j];
      }
    }
    return ret;
  };
  numeric.sLUP = function LUP(A2, tol) {
    throw new Error("The function numeric.sLUP had a bug in it and has been removed. Please use the new numeric.ccsLUP function instead.");
  };
  numeric.sdotMM = function dotMM(A2, B2) {
    var p = A2.length;
    B2.length;
    var BT = numeric.stranspose(B2), r = BT.length, Ai, BTk;
    var i, j, k2, accum;
    var ret = Array(p), reti;
    for (i = p - 1; i >= 0; i--) {
      reti = [];
      Ai = A2[i];
      for (k2 = r - 1; k2 >= 0; k2--) {
        accum = 0;
        BTk = BT[k2];
        for (j in Ai) {
          if (!Ai.hasOwnProperty(j)) continue;
          if (j in BTk) {
            accum += Ai[j] * BTk[j];
          }
        }
        if (accum) reti[k2] = accum;
      }
      ret[i] = reti;
    }
    return ret;
  };
  numeric.sdotMV = function dotMV(A2, x) {
    var p = A2.length, Ai, i, j;
    var ret = Array(p), accum;
    for (i = p - 1; i >= 0; i--) {
      Ai = A2[i];
      accum = 0;
      for (j in Ai) {
        if (!Ai.hasOwnProperty(j)) continue;
        if (x[j]) accum += Ai[j] * x[j];
      }
      if (accum) ret[i] = accum;
    }
    return ret;
  };
  numeric.sdotVM = function dotMV(x, A2) {
    var i, j, Ai, alpha;
    var ret = [];
    for (i in x) {
      if (!x.hasOwnProperty(i)) continue;
      Ai = A2[i];
      alpha = x[i];
      for (j in Ai) {
        if (!Ai.hasOwnProperty(j)) continue;
        if (!ret[j]) {
          ret[j] = 0;
        }
        ret[j] += alpha * Ai[j];
      }
    }
    return ret;
  };
  numeric.sdotVV = function dotVV(x, y) {
    var i, ret = 0;
    for (i in x) {
      if (x[i] && y[i]) ret += x[i] * y[i];
    }
    return ret;
  };
  numeric.sdot = function dot(A2, B2) {
    var m = numeric.sdim(A2).length, n = numeric.sdim(B2).length;
    var k2 = m * 1e3 + n;
    switch (k2) {
      case 0:
        return A2 * B2;
      case 1001:
        return numeric.sdotVV(A2, B2);
      case 2001:
        return numeric.sdotMV(A2, B2);
      case 1002:
        return numeric.sdotVM(A2, B2);
      case 2002:
        return numeric.sdotMM(A2, B2);
      default:
        throw new Error("numeric.sdot not implemented for tensors of order " + m + " and " + n);
    }
  };
  numeric.sscatter = function scatter(V2) {
    var n = V2[0].length, Vij, i, j, m = V2.length, A2 = [], Aj;
    for (i = n - 1; i >= 0; --i) {
      if (!V2[m - 1][i]) continue;
      Aj = A2;
      for (j = 0; j < m - 2; j++) {
        Vij = V2[j][i];
        if (!Aj[Vij]) Aj[Vij] = [];
        Aj = Aj[Vij];
      }
      Aj[V2[j][i]] = V2[j + 1][i];
    }
    return A2;
  };
  numeric.sgather = function gather(A2, ret, k2) {
    if (typeof ret === "undefined") ret = [];
    if (typeof k2 === "undefined") k2 = [];
    var n, i, Ai;
    n = k2.length;
    for (i in A2) {
      if (A2.hasOwnProperty(i)) {
        k2[n] = parseInt(i);
        Ai = A2[i];
        if (typeof Ai === "number") {
          if (Ai) {
            if (ret.length === 0) {
              for (i = n + 1; i >= 0; --i) ret[i] = [];
            }
            for (i = n; i >= 0; --i) ret[i].push(k2[i]);
            ret[n + 1].push(Ai);
          }
        } else gather(Ai, ret, k2);
      }
    }
    if (k2.length > n) k2.pop();
    return ret;
  };
  numeric.cLU = function LU(A2) {
    var I = A2[0], J = A2[1], V2 = A2[2];
    var p = I.length, m = 0, i, j, k2, a, b, c;
    for (i = 0; i < p; i++) if (I[i] > m) m = I[i];
    m++;
    var L = Array(m), U2 = Array(m), left = numeric.rep([m], Infinity), right = numeric.rep([m], -Infinity);
    var Ui, Uj, alpha;
    for (k2 = 0; k2 < p; k2++) {
      i = I[k2];
      j = J[k2];
      if (j < left[i]) left[i] = j;
      if (j > right[i]) right[i] = j;
    }
    for (i = 0; i < m - 1; i++) {
      if (right[i] > right[i + 1]) right[i + 1] = right[i];
    }
    for (i = m - 1; i >= 1; i--) {
      if (left[i] < left[i - 1]) left[i - 1] = left[i];
    }
    var countL = 0, countU = 0;
    for (i = 0; i < m; i++) {
      U2[i] = numeric.rep([right[i] - left[i] + 1], 0);
      L[i] = numeric.rep([i - left[i]], 0);
      countL += i - left[i] + 1;
      countU += right[i] - i + 1;
    }
    for (k2 = 0; k2 < p; k2++) {
      i = I[k2];
      U2[i][J[k2] - left[i]] = V2[k2];
    }
    for (i = 0; i < m - 1; i++) {
      a = i - left[i];
      Ui = U2[i];
      for (j = i + 1; left[j] <= i && j < m; j++) {
        b = i - left[j];
        c = right[i] - i;
        Uj = U2[j];
        alpha = Uj[b] / Ui[a];
        if (alpha) {
          for (k2 = 1; k2 <= c; k2++) {
            Uj[k2 + b] -= alpha * Ui[k2 + a];
          }
          L[j][i - left[j]] = alpha;
        }
      }
    }
    var Ui = [], Uj = [], Uv = [], Li = [], Lj = [], Lv = [];
    var p, q, foo;
    p = 0;
    q = 0;
    for (i = 0; i < m; i++) {
      a = left[i];
      b = right[i];
      foo = U2[i];
      for (j = i; j <= b; j++) {
        if (foo[j - a]) {
          Ui[p] = i;
          Uj[p] = j;
          Uv[p] = foo[j - a];
          p++;
        }
      }
      foo = L[i];
      for (j = a; j < i; j++) {
        if (foo[j - a]) {
          Li[q] = i;
          Lj[q] = j;
          Lv[q] = foo[j - a];
          q++;
        }
      }
      Li[q] = i;
      Lj[q] = i;
      Lv[q] = 1;
      q++;
    }
    return { U: [Ui, Uj, Uv], L: [Li, Lj, Lv] };
  };
  numeric.cLUsolve = function LUsolve(lu, b) {
    var L = lu.L, U2 = lu.U, ret = numeric.clone(b);
    var Li = L[0], Lj = L[1], Lv = L[2];
    var Ui = U2[0], Uj = U2[1], Uv = U2[2];
    var p = Ui.length;
    Li.length;
    var m = ret.length, i, k2;
    k2 = 0;
    for (i = 0; i < m; i++) {
      while (Lj[k2] < i) {
        ret[i] -= Lv[k2] * ret[Lj[k2]];
        k2++;
      }
      k2++;
    }
    k2 = p - 1;
    for (i = m - 1; i >= 0; i--) {
      while (Uj[k2] > i) {
        ret[i] -= Uv[k2] * ret[Uj[k2]];
        k2--;
      }
      ret[i] /= Uv[k2];
      k2--;
    }
    return ret;
  };
  numeric.cgrid = function grid(n, shape) {
    if (typeof n === "number") n = [n, n];
    var ret = numeric.rep(n, -1);
    var i, j, count;
    if (typeof shape !== "function") {
      switch (shape) {
        case "L":
          shape = function(i2, j2) {
            return i2 >= n[0] / 2 || j2 < n[1] / 2;
          };
          break;
        default:
          shape = function(i2, j2) {
            return true;
          };
          break;
      }
    }
    count = 0;
    for (i = 1; i < n[0] - 1; i++) for (j = 1; j < n[1] - 1; j++)
      if (shape(i, j)) {
        ret[i][j] = count;
        count++;
      }
    return ret;
  };
  numeric.cdelsq = function delsq(g) {
    var dir = [[-1, 0], [0, -1], [0, 1], [1, 0]];
    var s = numeric.dim(g), m = s[0], n = s[1], i, j, k2, p, q;
    var Li = [], Lj = [], Lv = [];
    for (i = 1; i < m - 1; i++) for (j = 1; j < n - 1; j++) {
      if (g[i][j] < 0) continue;
      for (k2 = 0; k2 < 4; k2++) {
        p = i + dir[k2][0];
        q = j + dir[k2][1];
        if (g[p][q] < 0) continue;
        Li.push(g[i][j]);
        Lj.push(g[p][q]);
        Lv.push(-1);
      }
      Li.push(g[i][j]);
      Lj.push(g[i][j]);
      Lv.push(4);
    }
    return [Li, Lj, Lv];
  };
  numeric.cdotMV = function dotMV(A2, x) {
    var ret, Ai = A2[0], Aj = A2[1], Av = A2[2], k2, p = Ai.length, N;
    N = 0;
    for (k2 = 0; k2 < p; k2++) {
      if (Ai[k2] > N) N = Ai[k2];
    }
    N++;
    ret = numeric.rep([N], 0);
    for (k2 = 0; k2 < p; k2++) {
      ret[Ai[k2]] += Av[k2] * x[Aj[k2]];
    }
    return ret;
  };
  numeric.Spline = function Spline(x, yl, yr, kl, kr) {
    this.x = x;
    this.yl = yl;
    this.yr = yr;
    this.kl = kl;
    this.kr = kr;
  };
  numeric.Spline.prototype._at = function _at(x1, p) {
    var x = this.x;
    var yl = this.yl;
    var yr = this.yr;
    var kl = this.kl;
    var kr = this.kr;
    var x1, a, b, t;
    var add = numeric.add, sub = numeric.sub, mul = numeric.mul;
    a = sub(mul(kl[p], x[p + 1] - x[p]), sub(yr[p + 1], yl[p]));
    b = add(mul(kr[p + 1], x[p] - x[p + 1]), sub(yr[p + 1], yl[p]));
    t = (x1 - x[p]) / (x[p + 1] - x[p]);
    var s = t * (1 - t);
    return add(add(add(mul(1 - t, yl[p]), mul(t, yr[p + 1])), mul(a, s * (1 - t))), mul(b, s * t));
  };
  numeric.Spline.prototype.at = function at(x0) {
    if (typeof x0 === "number") {
      var x = this.x;
      var n = x.length;
      var p, q, mid, floor = Math.floor;
      p = 0;
      q = n - 1;
      while (q - p > 1) {
        mid = floor((p + q) / 2);
        if (x[mid] <= x0) p = mid;
        else q = mid;
      }
      return this._at(x0, p);
    }
    var n = x0.length, i, ret = Array(n);
    for (i = n - 1; i !== -1; --i) ret[i] = this.at(x0[i]);
    return ret;
  };
  numeric.Spline.prototype.diff = function diff() {
    var x = this.x;
    var yl = this.yl;
    var yr = this.yr;
    var kl = this.kl;
    var kr = this.kr;
    var n = yl.length;
    var i, dx, dy;
    var zl = kl, zr = kr, pl = Array(n), pr = Array(n);
    var add = numeric.add, mul = numeric.mul, div = numeric.div, sub = numeric.sub;
    for (i = n - 1; i !== -1; --i) {
      dx = x[i + 1] - x[i];
      dy = sub(yr[i + 1], yl[i]);
      pl[i] = div(add(mul(dy, 6), mul(kl[i], -4 * dx), mul(kr[i + 1], -2 * dx)), dx * dx);
      pr[i + 1] = div(add(mul(dy, -6), mul(kl[i], 2 * dx), mul(kr[i + 1], 4 * dx)), dx * dx);
    }
    return new numeric.Spline(x, zl, zr, pl, pr);
  };
  numeric.Spline.prototype.roots = function roots() {
    function sqr(x2) {
      return x2 * x2;
    }
    var ret = [];
    var x = this.x, yl = this.yl, yr = this.yr, kl = this.kl, kr = this.kr;
    if (typeof yl[0] === "number") {
      yl = [yl];
      yr = [yr];
      kl = [kl];
      kr = [kr];
    }
    var m = yl.length, n = x.length - 1, i, j, k2;
    var ai, bi, ci, di, ret = Array(m), ri, k0, k1, y0, y1, A2, B2, D, dx, stops, z0, z1, zm, t0, t1, tm;
    var sqrt = Math.sqrt;
    for (i = 0; i !== m; ++i) {
      ai = yl[i];
      bi = yr[i];
      ci = kl[i];
      di = kr[i];
      ri = [];
      for (j = 0; j !== n; j++) {
        if (j > 0 && bi[j] * ai[j] < 0) ri.push(x[j]);
        dx = x[j + 1] - x[j];
        x[j];
        y0 = ai[j];
        y1 = bi[j + 1];
        k0 = ci[j] / dx;
        k1 = di[j + 1] / dx;
        D = sqr(k0 - k1 + 3 * (y0 - y1)) + 12 * k1 * y0;
        A2 = k1 + 3 * y0 + 2 * k0 - 3 * y1;
        B2 = 3 * (k1 + k0 + 2 * (y0 - y1));
        if (D <= 0) {
          z0 = A2 / B2;
          if (z0 > x[j] && z0 < x[j + 1]) stops = [x[j], z0, x[j + 1]];
          else stops = [x[j], x[j + 1]];
        } else {
          z0 = (A2 - sqrt(D)) / B2;
          z1 = (A2 + sqrt(D)) / B2;
          stops = [x[j]];
          if (z0 > x[j] && z0 < x[j + 1]) stops.push(z0);
          if (z1 > x[j] && z1 < x[j + 1]) stops.push(z1);
          stops.push(x[j + 1]);
        }
        t0 = stops[0];
        z0 = this._at(t0, j);
        for (k2 = 0; k2 < stops.length - 1; k2++) {
          t1 = stops[k2 + 1];
          z1 = this._at(t1, j);
          if (z0 === 0) {
            ri.push(t0);
            t0 = t1;
            z0 = z1;
            continue;
          }
          if (z1 === 0 || z0 * z1 > 0) {
            t0 = t1;
            z0 = z1;
            continue;
          }
          var side = 0;
          while (1) {
            tm = (z0 * t1 - z1 * t0) / (z0 - z1);
            if (tm <= t0 || tm >= t1) {
              break;
            }
            zm = this._at(tm, j);
            if (zm * z1 > 0) {
              t1 = tm;
              z1 = zm;
              if (side === -1) z0 *= 0.5;
              side = -1;
            } else if (zm * z0 > 0) {
              t0 = tm;
              z0 = zm;
              if (side === 1) z1 *= 0.5;
              side = 1;
            } else break;
          }
          ri.push(tm);
          t0 = stops[k2 + 1];
          z0 = this._at(t0, j);
        }
        if (z1 === 0) ri.push(t1);
      }
      ret[i] = ri;
    }
    if (typeof this.yl[0] === "number") return ret[0];
    return ret;
  };
  numeric.spline = function spline(x, y, k1, kn) {
    var n = x.length, b = [], dx = [], dy = [];
    var i;
    var sub = numeric.sub, mul = numeric.mul, add = numeric.add;
    for (i = n - 2; i >= 0; i--) {
      dx[i] = x[i + 1] - x[i];
      dy[i] = sub(y[i + 1], y[i]);
    }
    if (typeof k1 === "string" || typeof kn === "string") {
      k1 = kn = "periodic";
    }
    var T2 = [[], [], []];
    switch (typeof k1) {
      case "undefined":
        b[0] = mul(3 / (dx[0] * dx[0]), dy[0]);
        T2[0].push(0, 0);
        T2[1].push(0, 1);
        T2[2].push(2 / dx[0], 1 / dx[0]);
        break;
      case "string":
        b[0] = add(mul(3 / (dx[n - 2] * dx[n - 2]), dy[n - 2]), mul(3 / (dx[0] * dx[0]), dy[0]));
        T2[0].push(0, 0, 0);
        T2[1].push(n - 2, 0, 1);
        T2[2].push(1 / dx[n - 2], 2 / dx[n - 2] + 2 / dx[0], 1 / dx[0]);
        break;
      default:
        b[0] = k1;
        T2[0].push(0);
        T2[1].push(0);
        T2[2].push(1);
        break;
    }
    for (i = 1; i < n - 1; i++) {
      b[i] = add(mul(3 / (dx[i - 1] * dx[i - 1]), dy[i - 1]), mul(3 / (dx[i] * dx[i]), dy[i]));
      T2[0].push(i, i, i);
      T2[1].push(i - 1, i, i + 1);
      T2[2].push(1 / dx[i - 1], 2 / dx[i - 1] + 2 / dx[i], 1 / dx[i]);
    }
    switch (typeof kn) {
      case "undefined":
        b[n - 1] = mul(3 / (dx[n - 2] * dx[n - 2]), dy[n - 2]);
        T2[0].push(n - 1, n - 1);
        T2[1].push(n - 2, n - 1);
        T2[2].push(1 / dx[n - 2], 2 / dx[n - 2]);
        break;
      case "string":
        T2[1][T2[1].length - 1] = 0;
        break;
      default:
        b[n - 1] = kn;
        T2[0].push(n - 1);
        T2[1].push(n - 1);
        T2[2].push(1);
        break;
    }
    if (typeof b[0] !== "number") b = numeric.transpose(b);
    else b = [b];
    var k2 = Array(b.length);
    if (typeof k1 === "string") {
      for (i = k2.length - 1; i !== -1; --i) {
        k2[i] = numeric.ccsLUPSolve(numeric.ccsLUP(numeric.ccsScatter(T2)), b[i]);
        k2[i][n - 1] = k2[i][0];
      }
    } else {
      for (i = k2.length - 1; i !== -1; --i) {
        k2[i] = numeric.cLUsolve(numeric.cLU(T2), b[i]);
      }
    }
    if (typeof y[0] === "number") k2 = k2[0];
    else k2 = numeric.transpose(k2);
    return new numeric.Spline(x, y, y, k2, k2);
  };
  numeric.fftpow2 = function fftpow2(x, y) {
    var n = x.length;
    if (n === 1) return;
    var cos = Math.cos, sin = Math.sin, i, j;
    var xe = Array(n / 2), ye = Array(n / 2), xo = Array(n / 2), yo = Array(n / 2);
    j = n / 2;
    for (i = n - 1; i !== -1; --i) {
      --j;
      xo[j] = x[i];
      yo[j] = y[i];
      --i;
      xe[j] = x[i];
      ye[j] = y[i];
    }
    fftpow2(xe, ye);
    fftpow2(xo, yo);
    j = n / 2;
    var t, k2 = -6.283185307179586 / n, ci, si;
    for (i = n - 1; i !== -1; --i) {
      --j;
      if (j === -1) j = n / 2 - 1;
      t = k2 * i;
      ci = cos(t);
      si = sin(t);
      x[i] = xe[j] + ci * xo[j] - si * yo[j];
      y[i] = ye[j] + ci * yo[j] + si * xo[j];
    }
  };
  numeric._ifftpow2 = function _ifftpow2(x, y) {
    var n = x.length;
    if (n === 1) return;
    var cos = Math.cos, sin = Math.sin, i, j;
    var xe = Array(n / 2), ye = Array(n / 2), xo = Array(n / 2), yo = Array(n / 2);
    j = n / 2;
    for (i = n - 1; i !== -1; --i) {
      --j;
      xo[j] = x[i];
      yo[j] = y[i];
      --i;
      xe[j] = x[i];
      ye[j] = y[i];
    }
    _ifftpow2(xe, ye);
    _ifftpow2(xo, yo);
    j = n / 2;
    var t, k2 = 6.283185307179586 / n, ci, si;
    for (i = n - 1; i !== -1; --i) {
      --j;
      if (j === -1) j = n / 2 - 1;
      t = k2 * i;
      ci = cos(t);
      si = sin(t);
      x[i] = xe[j] + ci * xo[j] - si * yo[j];
      y[i] = ye[j] + ci * yo[j] + si * xo[j];
    }
  };
  numeric.ifftpow2 = function ifftpow2(x, y) {
    numeric._ifftpow2(x, y);
    numeric.diveq(x, x.length);
    numeric.diveq(y, y.length);
  };
  numeric.convpow2 = function convpow2(ax, ay, bx, by) {
    numeric.fftpow2(ax, ay);
    numeric.fftpow2(bx, by);
    var i, n = ax.length, axi, bxi, ayi, byi;
    for (i = n - 1; i !== -1; --i) {
      axi = ax[i];
      ayi = ay[i];
      bxi = bx[i];
      byi = by[i];
      ax[i] = axi * bxi - ayi * byi;
      ay[i] = axi * byi + ayi * bxi;
    }
    numeric.ifftpow2(ax, ay);
  };
  numeric.T.prototype.fft = function fft() {
    var x = this.x, y = this.y;
    var n = x.length, log = Math.log, log2 = log(2), p = Math.ceil(log(2 * n - 1) / log2), m = Math.pow(2, p);
    var cx = numeric.rep([m], 0), cy = numeric.rep([m], 0), cos = Math.cos, sin = Math.sin;
    var k2, c = -3.141592653589793 / n, t;
    var a = numeric.rep([m], 0), b = numeric.rep([m], 0);
    for (k2 = 0; k2 < n; k2++) a[k2] = x[k2];
    if (typeof y !== "undefined") for (k2 = 0; k2 < n; k2++) b[k2] = y[k2];
    cx[0] = 1;
    for (k2 = 1; k2 <= m / 2; k2++) {
      t = c * k2 * k2;
      cx[k2] = cos(t);
      cy[k2] = sin(t);
      cx[m - k2] = cos(t);
      cy[m - k2] = sin(t);
    }
    var X = new numeric.T(a, b), Y = new numeric.T(cx, cy);
    X = X.mul(Y);
    numeric.convpow2(X.x, X.y, numeric.clone(Y.x), numeric.neg(Y.y));
    X = X.mul(Y);
    X.x.length = n;
    X.y.length = n;
    return X;
  };
  numeric.T.prototype.ifft = function ifft() {
    var x = this.x, y = this.y;
    var n = x.length, log = Math.log, log2 = log(2), p = Math.ceil(log(2 * n - 1) / log2), m = Math.pow(2, p);
    var cx = numeric.rep([m], 0), cy = numeric.rep([m], 0), cos = Math.cos, sin = Math.sin;
    var k2, c = 3.141592653589793 / n, t;
    var a = numeric.rep([m], 0), b = numeric.rep([m], 0);
    for (k2 = 0; k2 < n; k2++) a[k2] = x[k2];
    if (typeof y !== "undefined") for (k2 = 0; k2 < n; k2++) b[k2] = y[k2];
    cx[0] = 1;
    for (k2 = 1; k2 <= m / 2; k2++) {
      t = c * k2 * k2;
      cx[k2] = cos(t);
      cy[k2] = sin(t);
      cx[m - k2] = cos(t);
      cy[m - k2] = sin(t);
    }
    var X = new numeric.T(a, b), Y = new numeric.T(cx, cy);
    X = X.mul(Y);
    numeric.convpow2(X.x, X.y, numeric.clone(Y.x), numeric.neg(Y.y));
    X = X.mul(Y);
    X.x.length = n;
    X.y.length = n;
    return X.div(n);
  };
  numeric.gradient = function gradient(f, x) {
    var n = x.length;
    var f0 = f(x);
    if (isNaN(f0)) throw new Error("gradient: f(x) is a NaN!");
    var max = Math.max;
    var i, x0 = numeric.clone(x), f1, f2, J = Array(n);
    numeric.div;
    numeric.sub;
    var errest, max = Math.max, eps = 1e-3, abs = Math.abs, min = Math.min;
    var t0, t1, t2, it = 0, d1, d2, N;
    for (i = 0; i < n; i++) {
      var h = max(1e-6 * f0, 1e-8);
      while (1) {
        ++it;
        if (it > 20) {
          throw new Error("Numerical gradient fails");
        }
        x0[i] = x[i] + h;
        f1 = f(x0);
        x0[i] = x[i] - h;
        f2 = f(x0);
        x0[i] = x[i];
        if (isNaN(f1) || isNaN(f2)) {
          h /= 16;
          continue;
        }
        J[i] = (f1 - f2) / (2 * h);
        t0 = x[i] - h;
        t1 = x[i];
        t2 = x[i] + h;
        d1 = (f1 - f0) / h;
        d2 = (f0 - f2) / h;
        N = max(abs(J[i]), abs(f0), abs(f1), abs(f2), abs(t0), abs(t1), abs(t2), 1e-8);
        errest = min(max(abs(d1 - J[i]), abs(d2 - J[i]), abs(d1 - d2)) / N, h / N);
        if (errest > eps) {
          h /= 16;
        } else break;
      }
    }
    return J;
  };
  numeric.uncmin = function uncmin(f, x0, tol, gradient, maxit, callback, options) {
    var grad = numeric.gradient;
    if (typeof options === "undefined") {
      options = {};
    }
    if (typeof tol === "undefined") {
      tol = 1e-8;
    }
    if (typeof gradient === "undefined") {
      gradient = function(x) {
        return grad(f, x);
      };
    }
    if (typeof maxit === "undefined") maxit = 1e3;
    x0 = numeric.clone(x0);
    var n = x0.length;
    var f0 = f(x0), f1, df0;
    if (isNaN(f0)) throw new Error("uncmin: f(x0) is a NaN!");
    var max = Math.max, norm2 = numeric.norm2;
    tol = max(tol, numeric.epsilon);
    var step, g0, g1, H1 = options.Hinv || numeric.identity(n);
    var dot = numeric.dot;
    numeric.inv;
    var sub = numeric.sub, add = numeric.add, ten = numeric.tensor, div = numeric.div, mul = numeric.mul;
    var all = numeric.all, isfinite = numeric.isFinite, neg = numeric.neg;
    var it = 0, s, x1, y, Hy, ys, t, nstep;
    var msg = "";
    g0 = gradient(x0);
    while (it < maxit) {
      if (typeof callback === "function") {
        if (callback(it, x0, f0, g0, H1)) {
          msg = "Callback returned true";
          break;
        }
      }
      if (!all(isfinite(g0))) {
        msg = "Gradient has Infinity or NaN";
        break;
      }
      step = neg(dot(H1, g0));
      if (!all(isfinite(step))) {
        msg = "Search direction has Infinity or NaN";
        break;
      }
      nstep = norm2(step);
      if (nstep < tol) {
        msg = "Newton step smaller than tol";
        break;
      }
      t = 1;
      df0 = dot(g0, step);
      x1 = x0;
      while (it < maxit) {
        if (t * nstep < tol) {
          break;
        }
        s = mul(step, t);
        x1 = add(x0, s);
        f1 = f(x1);
        if (f1 - f0 >= 0.1 * t * df0 || isNaN(f1)) {
          t *= 0.5;
          ++it;
          continue;
        }
        break;
      }
      if (t * nstep < tol) {
        msg = "Line search step size smaller than tol";
        break;
      }
      if (it === maxit) {
        msg = "maxit reached during line search";
        break;
      }
      g1 = gradient(x1);
      y = sub(g1, g0);
      ys = dot(y, s);
      Hy = dot(H1, y);
      H1 = sub(
        add(
          H1,
          mul(
            (ys + dot(y, Hy)) / (ys * ys),
            ten(s, s)
          )
        ),
        div(add(ten(Hy, s), ten(s, Hy)), ys)
      );
      x0 = x1;
      f0 = f1;
      g0 = g1;
      ++it;
    }
    return { solution: x0, f: f0, gradient: g0, invHessian: H1, iterations: it, message: msg };
  };
  numeric.Dopri = function Dopri(x, y, f, ymid, iterations, msg, events) {
    this.x = x;
    this.y = y;
    this.f = f;
    this.ymid = ymid;
    this.iterations = iterations;
    this.events = events;
    this.message = msg;
  };
  numeric.Dopri.prototype._at = function _at(xi, j) {
    function sqr(x) {
      return x * x;
    }
    var sol = this;
    var xs = sol.x;
    var ys = sol.y;
    var k1 = sol.f;
    var ymid = sol.ymid;
    xs.length;
    var x0, x1, xh, y0, y1, yh, xi;
    var h;
    var c = 0.5;
    var add = numeric.add, mul = numeric.mul, sub = numeric.sub, p, q, w;
    x0 = xs[j];
    x1 = xs[j + 1];
    y0 = ys[j];
    y1 = ys[j + 1];
    h = x1 - x0;
    xh = x0 + c * h;
    yh = ymid[j];
    p = sub(k1[j], mul(y0, 1 / (x0 - xh) + 2 / (x0 - x1)));
    q = sub(k1[j + 1], mul(y1, 1 / (x1 - xh) + 2 / (x1 - x0)));
    w = [
      sqr(xi - x1) * (xi - xh) / sqr(x0 - x1) / (x0 - xh),
      sqr(xi - x0) * sqr(xi - x1) / sqr(x0 - xh) / sqr(x1 - xh),
      sqr(xi - x0) * (xi - xh) / sqr(x1 - x0) / (x1 - xh),
      (xi - x0) * sqr(xi - x1) * (xi - xh) / sqr(x0 - x1) / (x0 - xh),
      (xi - x1) * sqr(xi - x0) * (xi - xh) / sqr(x0 - x1) / (x1 - xh)
    ];
    return add(
      add(
        add(
          add(
            mul(y0, w[0]),
            mul(yh, w[1])
          ),
          mul(y1, w[2])
        ),
        mul(p, w[3])
      ),
      mul(q, w[4])
    );
  };
  numeric.Dopri.prototype.at = function at(x) {
    var i, j, k2, floor = Math.floor;
    if (typeof x !== "number") {
      var n = x.length, ret = Array(n);
      for (i = n - 1; i !== -1; --i) {
        ret[i] = this.at(x[i]);
      }
      return ret;
    }
    var x0 = this.x;
    i = 0;
    j = x0.length - 1;
    while (j - i > 1) {
      k2 = floor(0.5 * (i + j));
      if (x0[k2] <= x) i = k2;
      else j = k2;
    }
    return this._at(x, i);
  };
  numeric.dopri = function dopri(x0, x1, y0, f, tol, maxit, event) {
    if (typeof tol === "undefined") {
      tol = 1e-6;
    }
    if (typeof maxit === "undefined") {
      maxit = 1e3;
    }
    var xs = [x0], ys = [y0], k1 = [f(x0, y0)], k2, k3, k4, k5, k6, k7, ymid = [];
    var A2 = 1 / 5;
    var A3 = [3 / 40, 9 / 40];
    var A4 = [44 / 45, -56 / 15, 32 / 9];
    var A5 = [19372 / 6561, -25360 / 2187, 64448 / 6561, -212 / 729];
    var A6 = [9017 / 3168, -355 / 33, 46732 / 5247, 49 / 176, -5103 / 18656];
    var b = [35 / 384, 0, 500 / 1113, 125 / 192, -2187 / 6784, 11 / 84];
    var bm = [
      0.5 * 6025192743 / 30085553152,
      0,
      0.5 * 51252292925 / 65400821598,
      0.5 * -2691868925 / 45128329728,
      0.5 * 187940372067 / 1594534317056,
      0.5 * -1776094331 / 19743644256,
      0.5 * 11237099 / 235043384
    ];
    var c = [1 / 5, 3 / 10, 4 / 5, 8 / 9, 1, 1];
    var e = [-71 / 57600, 0, 71 / 16695, -71 / 1920, 17253 / 339200, -22 / 525, 1 / 40];
    var i = 0, er, j;
    var h = (x1 - x0) / 10;
    var it = 0;
    var add = numeric.add, mul = numeric.mul, y1, erinf;
    var min = Math.min, abs = Math.abs, norminf = numeric.norminf, pow = Math.pow;
    var any = numeric.any, lt = numeric.lt, and = numeric.and;
    numeric.sub;
    var e0, e1, ev;
    var ret = new numeric.Dopri(xs, ys, k1, ymid, -1, "");
    if (typeof event === "function") e0 = event(x0, y0);
    while (x0 < x1 && it < maxit) {
      ++it;
      if (x0 + h > x1) h = x1 - x0;
      k2 = f(x0 + c[0] * h, add(y0, mul(A2 * h, k1[i])));
      k3 = f(x0 + c[1] * h, add(add(y0, mul(A3[0] * h, k1[i])), mul(A3[1] * h, k2)));
      k4 = f(x0 + c[2] * h, add(add(add(y0, mul(A4[0] * h, k1[i])), mul(A4[1] * h, k2)), mul(A4[2] * h, k3)));
      k5 = f(x0 + c[3] * h, add(add(add(add(y0, mul(A5[0] * h, k1[i])), mul(A5[1] * h, k2)), mul(A5[2] * h, k3)), mul(A5[3] * h, k4)));
      k6 = f(x0 + c[4] * h, add(add(add(add(add(y0, mul(A6[0] * h, k1[i])), mul(A6[1] * h, k2)), mul(A6[2] * h, k3)), mul(A6[3] * h, k4)), mul(A6[4] * h, k5)));
      y1 = add(add(add(add(add(y0, mul(k1[i], h * b[0])), mul(k3, h * b[2])), mul(k4, h * b[3])), mul(k5, h * b[4])), mul(k6, h * b[5]));
      k7 = f(x0 + h, y1);
      er = add(add(add(add(add(mul(k1[i], h * e[0]), mul(k3, h * e[2])), mul(k4, h * e[3])), mul(k5, h * e[4])), mul(k6, h * e[5])), mul(k7, h * e[6]));
      if (typeof er === "number") erinf = abs(er);
      else erinf = norminf(er);
      if (erinf > tol) {
        h = 0.2 * h * pow(tol / erinf, 0.25);
        if (x0 + h === x0) {
          ret.msg = "Step size became too small";
          break;
        }
        continue;
      }
      ymid[i] = add(
        add(
          add(
            add(
              add(
                add(
                  y0,
                  mul(k1[i], h * bm[0])
                ),
                mul(k3, h * bm[2])
              ),
              mul(k4, h * bm[3])
            ),
            mul(k5, h * bm[4])
          ),
          mul(k6, h * bm[5])
        ),
        mul(k7, h * bm[6])
      );
      ++i;
      xs[i] = x0 + h;
      ys[i] = y1;
      k1[i] = k7;
      if (typeof event === "function") {
        var yi, xl = x0, xr = x0 + 0.5 * h, xi;
        e1 = event(xr, ymid[i - 1]);
        ev = and(lt(e0, 0), lt(0, e1));
        if (!any(ev)) {
          xl = xr;
          xr = x0 + h;
          e0 = e1;
          e1 = event(xr, y1);
          ev = and(lt(e0, 0), lt(0, e1));
        }
        if (any(ev)) {
          var en, ei;
          var side = 0, sl = 1, sr = 1;
          while (1) {
            if (typeof e0 === "number") xi = (sr * e1 * xl - sl * e0 * xr) / (sr * e1 - sl * e0);
            else {
              xi = xr;
              for (j = e0.length - 1; j !== -1; --j) {
                if (e0[j] < 0 && e1[j] > 0) xi = min(xi, (sr * e1[j] * xl - sl * e0[j] * xr) / (sr * e1[j] - sl * e0[j]));
              }
            }
            if (xi <= xl || xi >= xr) break;
            yi = ret._at(xi, i - 1);
            ei = event(xi, yi);
            en = and(lt(e0, 0), lt(0, ei));
            if (any(en)) {
              xr = xi;
              e1 = ei;
              ev = en;
              sr = 1;
              if (side === -1) sl *= 0.5;
              else sl = 1;
              side = -1;
            } else {
              xl = xi;
              e0 = ei;
              sl = 1;
              if (side === 1) sr *= 0.5;
              else sr = 1;
              side = 1;
            }
          }
          y1 = ret._at(0.5 * (x0 + xi), i - 1);
          ret.f[i] = f(xi, yi);
          ret.x[i] = xi;
          ret.y[i] = yi;
          ret.ymid[i - 1] = y1;
          ret.events = ev;
          ret.iterations = it;
          return ret;
        }
      }
      x0 += h;
      y0 = y1;
      e0 = e1;
      h = min(0.8 * h * pow(tol / erinf, 0.25), 4 * h);
    }
    ret.iterations = it;
    return ret;
  };
  numeric.LU = function(A2, fast) {
    fast = fast || false;
    var abs = Math.abs;
    var i, j, k2, absAjk, Akk, Ak, Pk, Ai;
    var max;
    var n = A2.length, n1 = n - 1;
    var P2 = new Array(n);
    if (!fast) A2 = numeric.clone(A2);
    for (k2 = 0; k2 < n; ++k2) {
      Pk = k2;
      Ak = A2[k2];
      max = abs(Ak[k2]);
      for (j = k2 + 1; j < n; ++j) {
        absAjk = abs(A2[j][k2]);
        if (max < absAjk) {
          max = absAjk;
          Pk = j;
        }
      }
      P2[k2] = Pk;
      if (Pk != k2) {
        A2[k2] = A2[Pk];
        A2[Pk] = Ak;
        Ak = A2[k2];
      }
      Akk = Ak[k2];
      for (i = k2 + 1; i < n; ++i) {
        A2[i][k2] /= Akk;
      }
      for (i = k2 + 1; i < n; ++i) {
        Ai = A2[i];
        for (j = k2 + 1; j < n1; ++j) {
          Ai[j] -= Ai[k2] * Ak[j];
          ++j;
          Ai[j] -= Ai[k2] * Ak[j];
        }
        if (j === n1) Ai[j] -= Ai[k2] * Ak[j];
      }
    }
    return {
      LU: A2,
      P: P2
    };
  };
  numeric.LUsolve = function LUsolve(LUP, b) {
    var i, j;
    var LU = LUP.LU;
    var n = LU.length;
    var x = numeric.clone(b);
    var P2 = LUP.P;
    var Pi, LUi, tmp;
    for (i = n - 1; i !== -1; --i) x[i] = b[i];
    for (i = 0; i < n; ++i) {
      Pi = P2[i];
      if (P2[i] !== i) {
        tmp = x[i];
        x[i] = x[Pi];
        x[Pi] = tmp;
      }
      LUi = LU[i];
      for (j = 0; j < i; ++j) {
        x[i] -= x[j] * LUi[j];
      }
    }
    for (i = n - 1; i >= 0; --i) {
      LUi = LU[i];
      for (j = i + 1; j < n; ++j) {
        x[i] -= x[j] * LUi[j];
      }
      x[i] /= LUi[i];
    }
    return x;
  };
  numeric.solve = function solve(A2, b, fast) {
    return numeric.LUsolve(numeric.LU(A2, fast), b);
  };
  numeric.echelonize = function echelonize(A2) {
    var s = numeric.dim(A2), m = s[0], n = s[1];
    var I = numeric.identity(m);
    var P2 = Array(m);
    var i, j, k2, l, Ai, Ii, Z, a;
    var abs = Math.abs;
    var diveq = numeric.diveq;
    A2 = numeric.clone(A2);
    for (i = 0; i < m; ++i) {
      k2 = 0;
      Ai = A2[i];
      Ii = I[i];
      for (j = 1; j < n; ++j) if (abs(Ai[k2]) < abs(Ai[j])) k2 = j;
      P2[i] = k2;
      diveq(Ii, Ai[k2]);
      diveq(Ai, Ai[k2]);
      for (j = 0; j < m; ++j) if (j !== i) {
        Z = A2[j];
        a = Z[k2];
        for (l = n - 1; l !== -1; --l) Z[l] -= Ai[l] * a;
        Z = I[j];
        for (l = m - 1; l !== -1; --l) Z[l] -= Ii[l] * a;
      }
    }
    return { I, A: A2, P: P2 };
  };
  numeric.__solveLP = function __solveLP(c, A2, b, tol, maxit, x, flag) {
    var sum = numeric.sum;
    numeric.log;
    var mul = numeric.mul, sub = numeric.sub, dot = numeric.dot, div = numeric.div, add = numeric.add;
    var m = c.length, n = b.length, y;
    var unbounded = false, i0 = 0;
    var alpha = 1;
    numeric.transpose(A2);
    numeric.svd;
    var transpose = numeric.transpose;
    numeric.leq;
    var sqrt = Math.sqrt, abs = Math.abs;
    numeric.muleq;
    numeric.norminf;
    numeric.any;
    var min = Math.min;
    var all = numeric.all, gt = numeric.gt;
    var p = Array(m), A0 = Array(n);
    numeric.rep([n], 1);
    var H;
    var solve = numeric.solve, z = sub(b, dot(A2, x)), count;
    var dotcc = dot(c, c);
    var g;
    for (count = i0; count < maxit; ++count) {
      var i, d;
      for (i = n - 1; i !== -1; --i) A0[i] = div(A2[i], z[i]);
      var A1 = transpose(A0);
      for (i = m - 1; i !== -1; --i) p[i] = /*x[i]+*/
      sum(A1[i]);
      alpha = 0.25 * abs(dotcc / dot(c, p));
      var a1 = 100 * sqrt(dotcc / dot(p, p));
      if (!isFinite(alpha) || alpha > a1) alpha = a1;
      g = add(c, mul(alpha, p));
      H = dot(A1, A0);
      for (i = m - 1; i !== -1; --i) H[i][i] += 1;
      d = solve(H, div(g, alpha), true);
      var t0 = div(z, dot(A2, d));
      var t = 1;
      for (i = n - 1; i !== -1; --i) if (t0[i] < 0) t = min(t, -0.999 * t0[i]);
      y = sub(x, mul(d, t));
      z = sub(b, dot(A2, y));
      if (!all(gt(z, 0))) return { solution: x, message: "", iterations: count };
      x = y;
      if (alpha < tol) return { solution: y, message: "", iterations: count };
      if (flag) {
        var s = dot(c, g), Ag = dot(A2, g);
        unbounded = true;
        for (i = n - 1; i !== -1; --i) if (s * Ag[i] < 0) {
          unbounded = false;
          break;
        }
      } else {
        if (x[m - 1] >= 0) unbounded = false;
        else unbounded = true;
      }
      if (unbounded) return { solution: y, message: "Unbounded", iterations: count };
    }
    return { solution: x, message: "maximum iteration count exceeded", iterations: count };
  };
  numeric._solveLP = function _solveLP(c, A2, b, tol, maxit) {
    var m = c.length, n = b.length, y;
    numeric.sum;
    numeric.log;
    numeric.mul;
    var sub = numeric.sub, dot = numeric.dot;
    numeric.div;
    numeric.add;
    var c0 = numeric.rep([m], 0).concat([1]);
    var J = numeric.rep([n, 1], -1);
    var A0 = numeric.blockMatrix([[A2, J]]);
    var b0 = b;
    var y = numeric.rep([m], 0).concat(Math.max(0, numeric.sup(numeric.neg(b))) + 1);
    var x0 = numeric.__solveLP(c0, A0, b0, tol, maxit, y, false);
    var x = numeric.clone(x0.solution);
    x.length = m;
    var foo = numeric.inf(sub(b, dot(A2, x)));
    if (foo < 0) {
      return { solution: NaN, message: "Infeasible", iterations: x0.iterations };
    }
    var ret = numeric.__solveLP(c, A2, b, tol, maxit - x0.iterations, x, true);
    ret.iterations += x0.iterations;
    return ret;
  };
  numeric.solveLP = function solveLP(c, A2, b, Aeq, beq, tol, maxit) {
    if (typeof maxit === "undefined") maxit = 1e3;
    if (typeof tol === "undefined") tol = numeric.epsilon;
    if (typeof Aeq === "undefined") return numeric._solveLP(c, A2, b, tol, maxit);
    var m = Aeq.length, n = Aeq[0].length, o = A2.length;
    var B2 = numeric.echelonize(Aeq);
    var flags = numeric.rep([n], 0);
    var P2 = B2.P;
    var Q = [];
    var i;
    for (i = P2.length - 1; i !== -1; --i) flags[P2[i]] = 1;
    for (i = n - 1; i !== -1; --i) if (flags[i] === 0) Q.push(i);
    var g = numeric.getRange;
    var I = numeric.linspace(0, m - 1), J = numeric.linspace(0, o - 1);
    var Aeq2 = g(Aeq, I, Q), A1 = g(A2, J, P2), A22 = g(A2, J, Q), dot = numeric.dot, sub = numeric.sub;
    var A3 = dot(A1, B2.I);
    var A4 = sub(A22, dot(A3, Aeq2)), b4 = sub(b, dot(A3, beq));
    var c1 = Array(P2.length), c2 = Array(Q.length);
    for (i = P2.length - 1; i !== -1; --i) c1[i] = c[P2[i]];
    for (i = Q.length - 1; i !== -1; --i) c2[i] = c[Q[i]];
    var c4 = sub(c2, dot(c1, dot(B2.I, Aeq2)));
    var S = numeric._solveLP(c4, A4, b4, tol, maxit);
    var x2 = S.solution;
    if (x2 !== x2) return S;
    var x1 = dot(B2.I, sub(beq, dot(Aeq2, x2)));
    var x = Array(c.length);
    for (i = P2.length - 1; i !== -1; --i) x[P2[i]] = x1[i];
    for (i = Q.length - 1; i !== -1; --i) x[Q[i]] = x2[i];
    return { solution: x, message: S.message, iterations: S.iterations };
  };
  numeric.MPStoLP = function MPStoLP(MPS) {
    if (MPS instanceof String) {
      MPS.split("\n");
    }
    var state = 0;
    var states = ["Initial state", "NAME", "ROWS", "COLUMNS", "RHS", "BOUNDS", "ENDATA"];
    var n = MPS.length;
    var i, j, z, N = 0, rows = {}, sign = [], rl = 0, vars = {}, nv = 0;
    var name;
    var c = [], A2 = [], b = [];
    function err(e) {
      throw new Error("MPStoLP: " + e + "\nLine " + i + ": " + MPS[i] + "\nCurrent state: " + states[state] + "\n");
    }
    for (i = 0; i < n; ++i) {
      z = MPS[i];
      var w0 = z.match(/\S*/g);
      var w = [];
      for (j = 0; j < w0.length; ++j) if (w0[j] !== "") w.push(w0[j]);
      if (w.length === 0) continue;
      for (j = 0; j < states.length; ++j) if (z.substr(0, states[j].length) === states[j]) break;
      if (j < states.length) {
        state = j;
        if (j === 1) {
          name = w[1];
        }
        if (j === 6) return { name, c, A: numeric.transpose(A2), b, rows, vars };
        continue;
      }
      switch (state) {
        case 0:
        case 1:
          err("Unexpected line");
        case 2:
          switch (w[0]) {
            case "N":
              if (N === 0) N = w[1];
              else err("Two or more N rows");
              break;
            case "L":
              rows[w[1]] = rl;
              sign[rl] = 1;
              b[rl] = 0;
              ++rl;
              break;
            case "G":
              rows[w[1]] = rl;
              sign[rl] = -1;
              b[rl] = 0;
              ++rl;
              break;
            case "E":
              rows[w[1]] = rl;
              sign[rl] = 0;
              b[rl] = 0;
              ++rl;
              break;
            default:
              err("Parse error " + numeric.prettyPrint(w));
          }
          break;
        case 3:
          if (!vars.hasOwnProperty(w[0])) {
            vars[w[0]] = nv;
            c[nv] = 0;
            A2[nv] = numeric.rep([rl], 0);
            ++nv;
          }
          var p = vars[w[0]];
          for (j = 1; j < w.length; j += 2) {
            if (w[j] === N) {
              c[p] = parseFloat(w[j + 1]);
              continue;
            }
            var q = rows[w[j]];
            A2[p][q] = (sign[q] < 0 ? -1 : 1) * parseFloat(w[j + 1]);
          }
          break;
        case 4:
          for (j = 1; j < w.length; j += 2) b[rows[w[j]]] = (sign[rows[w[j]]] < 0 ? -1 : 1) * parseFloat(w[j + 1]);
          break;
        case 5:
          break;
        case 6:
          err("Internal error");
      }
    }
    err("Reached end of file without ENDATA");
  };
  numeric.seedrandom = { pow: Math.pow, random: Math.random };
  (function(pool, math, width, chunks, significance, overflow, startdenom) {
    math["seedrandom"] = function seedrandom(seed, use_entropy) {
      var key = [];
      var arc4;
      seed = mixkey(flatten(
        use_entropy ? [seed, pool] : arguments.length ? seed : [(/* @__PURE__ */ new Date()).getTime(), pool, window],
        3
      ), key);
      arc4 = new ARC4(key);
      mixkey(arc4.S, pool);
      math["random"] = function random() {
        var n = arc4.g(chunks);
        var d = startdenom;
        var x = 0;
        while (n < significance) {
          n = (n + x) * width;
          d *= width;
          x = arc4.g(1);
        }
        while (n >= overflow) {
          n /= 2;
          d /= 2;
          x >>>= 1;
        }
        return (n + x) / d;
      };
      return seed;
    };
    function ARC4(key) {
      var t, u, me = this, keylen = key.length;
      var i = 0, j = me.i = me.j = me.m = 0;
      me.S = [];
      me.c = [];
      if (!keylen) {
        key = [keylen++];
      }
      while (i < width) {
        me.S[i] = i++;
      }
      for (i = 0; i < width; i++) {
        t = me.S[i];
        j = lowbits(j + t + key[i % keylen]);
        u = me.S[j];
        me.S[i] = u;
        me.S[j] = t;
      }
      me.g = function getnext(count) {
        var s = me.S;
        var i2 = lowbits(me.i + 1);
        var t2 = s[i2];
        var j2 = lowbits(me.j + t2);
        var u2 = s[j2];
        s[i2] = u2;
        s[j2] = t2;
        var r = s[lowbits(t2 + u2)];
        while (--count) {
          i2 = lowbits(i2 + 1);
          t2 = s[i2];
          j2 = lowbits(j2 + t2);
          u2 = s[j2];
          s[i2] = u2;
          s[j2] = t2;
          r = r * width + s[lowbits(t2 + u2)];
        }
        me.i = i2;
        me.j = j2;
        return r;
      };
      me.g(width);
    }
    function flatten(obj, depth, result, prop, typ) {
      result = [];
      typ = typeof obj;
      if (depth && typ == "object") {
        for (prop in obj) {
          if (prop.indexOf("S") < 5) {
            try {
              result.push(flatten(obj[prop], depth - 1));
            } catch (e) {
            }
          }
        }
      }
      return result.length ? result : obj + (typ != "string" ? "\0" : "");
    }
    function mixkey(seed, key, smear, j) {
      seed += "";
      smear = 0;
      for (j = 0; j < seed.length; j++) {
        key[lowbits(j)] = lowbits((smear ^= key[lowbits(j)] * 19) + seed.charCodeAt(j));
      }
      seed = "";
      for (j in key) {
        seed += String.fromCharCode(key[j]);
      }
      return seed;
    }
    function lowbits(n) {
      return n & width - 1;
    }
    startdenom = math.pow(width, chunks);
    significance = math.pow(2, significance);
    overflow = significance * 2;
    mixkey(math.random(), pool);
  })(
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
  );
  (function(exports$12) {
    function base0to1(A2) {
      if (typeof A2 !== "object") {
        return A2;
      }
      var ret = [], i, n = A2.length;
      for (i = 0; i < n; i++) ret[i + 1] = base0to1(A2[i]);
      return ret;
    }
    function base1to0(A2) {
      if (typeof A2 !== "object") {
        return A2;
      }
      var ret = [], i, n = A2.length;
      for (i = 1; i < n; i++) ret[i - 1] = base1to0(A2[i]);
      return ret;
    }
    function dpori(a, lda, n) {
      var i, j, k2, kp1, t;
      for (k2 = 1; k2 <= n; k2 = k2 + 1) {
        a[k2][k2] = 1 / a[k2][k2];
        t = -a[k2][k2];
        for (i = 1; i < k2; i = i + 1) {
          a[i][k2] = t * a[i][k2];
        }
        kp1 = k2 + 1;
        if (n < kp1) {
          break;
        }
        for (j = kp1; j <= n; j = j + 1) {
          t = a[k2][j];
          a[k2][j] = 0;
          for (i = 1; i <= k2; i = i + 1) {
            a[i][j] = a[i][j] + t * a[i][k2];
          }
        }
      }
    }
    function dposl(a, lda, n, b) {
      var i, k2, kb, t;
      for (k2 = 1; k2 <= n; k2 = k2 + 1) {
        t = 0;
        for (i = 1; i < k2; i = i + 1) {
          t = t + a[i][k2] * b[i];
        }
        b[k2] = (b[k2] - t) / a[k2][k2];
      }
      for (kb = 1; kb <= n; kb = kb + 1) {
        k2 = n + 1 - kb;
        b[k2] = b[k2] / a[k2][k2];
        t = -b[k2];
        for (i = 1; i < k2; i = i + 1) {
          b[i] = b[i] + t * a[i][k2];
        }
      }
    }
    function dpofa(a, lda, n, info) {
      var i, j, jm1, k2, t, s;
      for (j = 1; j <= n; j = j + 1) {
        info[1] = j;
        s = 0;
        jm1 = j - 1;
        if (jm1 < 1) {
          s = a[j][j] - s;
          if (s <= 0) {
            break;
          }
          a[j][j] = Math.sqrt(s);
        } else {
          for (k2 = 1; k2 <= jm1; k2 = k2 + 1) {
            t = a[k2][j];
            for (i = 1; i < k2; i = i + 1) {
              t = t - a[i][j] * a[i][k2];
            }
            t = t / a[k2][k2];
            a[k2][j] = t;
            s = s + t * t;
          }
          s = a[j][j] - s;
          if (s <= 0) {
            break;
          }
          a[j][j] = Math.sqrt(s);
        }
        info[1] = 0;
      }
    }
    function qpgen2(dmat, dvec, fddmat, n, sol, crval, amat, bvec, fdamat, q, meq, iact, nact, iter, work, ierr) {
      var i, j, l, l1, info, it1, iwzv, iwrv, iwrm, iwsv, iwuv, nvl, r, iwnbv, temp, sum, t1, tt, gc, gs, nu, t1inf, t2min, vsmall, tmpa, tmpb, go;
      r = Math.min(n, q);
      l = 2 * n + r * (r + 5) / 2 + 2 * q + 1;
      vsmall = 1e-60;
      do {
        vsmall = vsmall + vsmall;
        tmpa = 1 + 0.1 * vsmall;
        tmpb = 1 + 0.2 * vsmall;
      } while (tmpa <= 1 || tmpb <= 1);
      for (i = 1; i <= n; i = i + 1) {
        work[i] = dvec[i];
      }
      for (i = n + 1; i <= l; i = i + 1) {
        work[i] = 0;
      }
      for (i = 1; i <= q; i = i + 1) {
        iact[i] = 0;
      }
      info = [];
      if (ierr[1] === 0) {
        dpofa(dmat, fddmat, n, info);
        if (info[1] !== 0) {
          ierr[1] = 2;
          return;
        }
        dposl(dmat, fddmat, n, dvec);
        dpori(dmat, fddmat, n);
      } else {
        for (j = 1; j <= n; j = j + 1) {
          sol[j] = 0;
          for (i = 1; i <= j; i = i + 1) {
            sol[j] = sol[j] + dmat[i][j] * dvec[i];
          }
        }
        for (j = 1; j <= n; j = j + 1) {
          dvec[j] = 0;
          for (i = j; i <= n; i = i + 1) {
            dvec[j] = dvec[j] + dmat[j][i] * sol[i];
          }
        }
      }
      crval[1] = 0;
      for (j = 1; j <= n; j = j + 1) {
        sol[j] = dvec[j];
        crval[1] = crval[1] + work[j] * sol[j];
        work[j] = 0;
        for (i = j + 1; i <= n; i = i + 1) {
          dmat[i][j] = 0;
        }
      }
      crval[1] = -crval[1] / 2;
      ierr[1] = 0;
      iwzv = n;
      iwrv = iwzv + n;
      iwuv = iwrv + r;
      iwrm = iwuv + r + 1;
      iwsv = iwrm + r * (r + 1) / 2;
      iwnbv = iwsv + q;
      for (i = 1; i <= q; i = i + 1) {
        sum = 0;
        for (j = 1; j <= n; j = j + 1) {
          sum = sum + amat[j][i] * amat[j][i];
        }
        work[iwnbv + i] = Math.sqrt(sum);
      }
      nact = 0;
      iter[1] = 0;
      iter[2] = 0;
      function fn_goto_50() {
        iter[1] = iter[1] + 1;
        l = iwsv;
        for (i = 1; i <= q; i = i + 1) {
          l = l + 1;
          sum = -bvec[i];
          for (j = 1; j <= n; j = j + 1) {
            sum = sum + amat[j][i] * sol[j];
          }
          if (Math.abs(sum) < vsmall) {
            sum = 0;
          }
          if (i > meq) {
            work[l] = sum;
          } else {
            work[l] = -Math.abs(sum);
            if (sum > 0) {
              for (j = 1; j <= n; j = j + 1) {
                amat[j][i] = -amat[j][i];
              }
              bvec[i] = -bvec[i];
            }
          }
        }
        for (i = 1; i <= nact; i = i + 1) {
          work[iwsv + iact[i]] = 0;
        }
        nvl = 0;
        temp = 0;
        for (i = 1; i <= q; i = i + 1) {
          if (work[iwsv + i] < temp * work[iwnbv + i]) {
            nvl = i;
            temp = work[iwsv + i] / work[iwnbv + i];
          }
        }
        if (nvl === 0) {
          return 999;
        }
        return 0;
      }
      function fn_goto_55() {
        for (i = 1; i <= n; i = i + 1) {
          sum = 0;
          for (j = 1; j <= n; j = j + 1) {
            sum = sum + dmat[j][i] * amat[j][nvl];
          }
          work[i] = sum;
        }
        l1 = iwzv;
        for (i = 1; i <= n; i = i + 1) {
          work[l1 + i] = 0;
        }
        for (j = nact + 1; j <= n; j = j + 1) {
          for (i = 1; i <= n; i = i + 1) {
            work[l1 + i] = work[l1 + i] + dmat[i][j] * work[j];
          }
        }
        t1inf = true;
        for (i = nact; i >= 1; i = i - 1) {
          sum = work[i];
          l = iwrm + i * (i + 3) / 2;
          l1 = l - i;
          for (j = i + 1; j <= nact; j = j + 1) {
            sum = sum - work[l] * work[iwrv + j];
            l = l + j;
          }
          sum = sum / work[l1];
          work[iwrv + i] = sum;
          if (iact[i] < meq) {
            break;
          }
          if (sum < 0) {
            break;
          }
          t1inf = false;
          it1 = i;
        }
        if (!t1inf) {
          t1 = work[iwuv + it1] / work[iwrv + it1];
          for (i = 1; i <= nact; i = i + 1) {
            if (iact[i] < meq) {
              break;
            }
            if (work[iwrv + i] < 0) {
              break;
            }
            temp = work[iwuv + i] / work[iwrv + i];
            if (temp < t1) {
              t1 = temp;
              it1 = i;
            }
          }
        }
        sum = 0;
        for (i = iwzv + 1; i <= iwzv + n; i = i + 1) {
          sum = sum + work[i] * work[i];
        }
        if (Math.abs(sum) <= vsmall) {
          if (t1inf) {
            ierr[1] = 1;
            return 999;
          } else {
            for (i = 1; i <= nact; i = i + 1) {
              work[iwuv + i] = work[iwuv + i] - t1 * work[iwrv + i];
            }
            work[iwuv + nact + 1] = work[iwuv + nact + 1] + t1;
            return 700;
          }
        } else {
          sum = 0;
          for (i = 1; i <= n; i = i + 1) {
            sum = sum + work[iwzv + i] * amat[i][nvl];
          }
          tt = -work[iwsv + nvl] / sum;
          t2min = true;
          if (!t1inf) {
            if (t1 < tt) {
              tt = t1;
              t2min = false;
            }
          }
          for (i = 1; i <= n; i = i + 1) {
            sol[i] = sol[i] + tt * work[iwzv + i];
            if (Math.abs(sol[i]) < vsmall) {
              sol[i] = 0;
            }
          }
          crval[1] = crval[1] + tt * sum * (tt / 2 + work[iwuv + nact + 1]);
          for (i = 1; i <= nact; i = i + 1) {
            work[iwuv + i] = work[iwuv + i] - tt * work[iwrv + i];
          }
          work[iwuv + nact + 1] = work[iwuv + nact + 1] + tt;
          if (t2min) {
            nact = nact + 1;
            iact[nact] = nvl;
            l = iwrm + (nact - 1) * nact / 2 + 1;
            for (i = 1; i <= nact - 1; i = i + 1) {
              work[l] = work[i];
              l = l + 1;
            }
            if (nact === n) {
              work[l] = work[n];
            } else {
              for (i = n; i >= nact + 1; i = i - 1) {
                if (work[i] === 0) {
                  break;
                }
                gc = Math.max(Math.abs(work[i - 1]), Math.abs(work[i]));
                gs = Math.min(Math.abs(work[i - 1]), Math.abs(work[i]));
                if (work[i - 1] >= 0) {
                  temp = Math.abs(gc * Math.sqrt(1 + gs * gs / (gc * gc)));
                } else {
                  temp = -Math.abs(gc * Math.sqrt(1 + gs * gs / (gc * gc)));
                }
                gc = work[i - 1] / temp;
                gs = work[i] / temp;
                if (gc === 1) {
                  break;
                }
                if (gc === 0) {
                  work[i - 1] = gs * temp;
                  for (j = 1; j <= n; j = j + 1) {
                    temp = dmat[j][i - 1];
                    dmat[j][i - 1] = dmat[j][i];
                    dmat[j][i] = temp;
                  }
                } else {
                  work[i - 1] = temp;
                  nu = gs / (1 + gc);
                  for (j = 1; j <= n; j = j + 1) {
                    temp = gc * dmat[j][i - 1] + gs * dmat[j][i];
                    dmat[j][i] = nu * (dmat[j][i - 1] + temp) - dmat[j][i];
                    dmat[j][i - 1] = temp;
                  }
                }
              }
              work[l] = work[nact];
            }
          } else {
            sum = -bvec[nvl];
            for (j = 1; j <= n; j = j + 1) {
              sum = sum + sol[j] * amat[j][nvl];
            }
            if (nvl > meq) {
              work[iwsv + nvl] = sum;
            } else {
              work[iwsv + nvl] = -Math.abs(sum);
              if (sum > 0) {
                for (j = 1; j <= n; j = j + 1) {
                  amat[j][nvl] = -amat[j][nvl];
                }
                bvec[nvl] = -bvec[nvl];
              }
            }
            return 700;
          }
        }
        return 0;
      }
      function fn_goto_797() {
        l = iwrm + it1 * (it1 + 1) / 2 + 1;
        l1 = l + it1;
        if (work[l1] === 0) {
          return 798;
        }
        gc = Math.max(Math.abs(work[l1 - 1]), Math.abs(work[l1]));
        gs = Math.min(Math.abs(work[l1 - 1]), Math.abs(work[l1]));
        if (work[l1 - 1] >= 0) {
          temp = Math.abs(gc * Math.sqrt(1 + gs * gs / (gc * gc)));
        } else {
          temp = -Math.abs(gc * Math.sqrt(1 + gs * gs / (gc * gc)));
        }
        gc = work[l1 - 1] / temp;
        gs = work[l1] / temp;
        if (gc === 1) {
          return 798;
        }
        if (gc === 0) {
          for (i = it1 + 1; i <= nact; i = i + 1) {
            temp = work[l1 - 1];
            work[l1 - 1] = work[l1];
            work[l1] = temp;
            l1 = l1 + i;
          }
          for (i = 1; i <= n; i = i + 1) {
            temp = dmat[i][it1];
            dmat[i][it1] = dmat[i][it1 + 1];
            dmat[i][it1 + 1] = temp;
          }
        } else {
          nu = gs / (1 + gc);
          for (i = it1 + 1; i <= nact; i = i + 1) {
            temp = gc * work[l1 - 1] + gs * work[l1];
            work[l1] = nu * (work[l1 - 1] + temp) - work[l1];
            work[l1 - 1] = temp;
            l1 = l1 + i;
          }
          for (i = 1; i <= n; i = i + 1) {
            temp = gc * dmat[i][it1] + gs * dmat[i][it1 + 1];
            dmat[i][it1 + 1] = nu * (dmat[i][it1] + temp) - dmat[i][it1 + 1];
            dmat[i][it1] = temp;
          }
        }
        return 0;
      }
      function fn_goto_798() {
        l1 = l - it1;
        for (i = 1; i <= it1; i = i + 1) {
          work[l1] = work[l];
          l = l + 1;
          l1 = l1 + 1;
        }
        work[iwuv + it1] = work[iwuv + it1 + 1];
        iact[it1] = iact[it1 + 1];
        it1 = it1 + 1;
        if (it1 < nact) {
          return 797;
        }
        return 0;
      }
      function fn_goto_799() {
        work[iwuv + nact] = work[iwuv + nact + 1];
        work[iwuv + nact + 1] = 0;
        iact[nact] = 0;
        nact = nact - 1;
        iter[2] = iter[2] + 1;
        return 0;
      }
      go = 0;
      while (true) {
        go = fn_goto_50();
        if (go === 999) {
          return;
        }
        while (true) {
          go = fn_goto_55();
          if (go === 0) {
            break;
          }
          if (go === 999) {
            return;
          }
          if (go === 700) {
            if (it1 === nact) {
              fn_goto_799();
            } else {
              while (true) {
                fn_goto_797();
                go = fn_goto_798();
                if (go !== 797) {
                  break;
                }
              }
              fn_goto_799();
            }
          }
        }
      }
    }
    function solveQP(Dmat, dvec, Amat, bvec, meq, factorized) {
      Dmat = base0to1(Dmat);
      dvec = base0to1(dvec);
      Amat = base0to1(Amat);
      var i, n, q, nact, r, crval = [], iact = [], sol = [], work = [], iter = [], message;
      meq = meq || 0;
      factorized = factorized ? base0to1(factorized) : [void 0, 0];
      bvec = bvec ? base0to1(bvec) : [];
      n = Dmat.length - 1;
      q = Amat[1].length - 1;
      if (!bvec) {
        for (i = 1; i <= q; i = i + 1) {
          bvec[i] = 0;
        }
      }
      for (i = 1; i <= q; i = i + 1) {
        iact[i] = 0;
      }
      nact = 0;
      r = Math.min(n, q);
      for (i = 1; i <= n; i = i + 1) {
        sol[i] = 0;
      }
      crval[1] = 0;
      for (i = 1; i <= 2 * n + r * (r + 5) / 2 + 2 * q + 1; i = i + 1) {
        work[i] = 0;
      }
      for (i = 1; i <= 2; i = i + 1) {
        iter[i] = 0;
      }
      qpgen2(
        Dmat,
        dvec,
        n,
        n,
        sol,
        crval,
        Amat,
        bvec,
        n,
        q,
        meq,
        iact,
        nact,
        iter,
        work,
        factorized
      );
      message = "";
      if (factorized[1] === 1) {
        message = "constraints are inconsistent, no solution!";
      }
      if (factorized[1] === 2) {
        message = "matrix D in quadratic function is not positive definite!";
      }
      return {
        solution: base1to0(sol),
        value: base1to0(crval),
        unconstrained_solution: base1to0(dvec),
        iterations: base1to0(iter),
        iact: base1to0(iact),
        message
      };
    }
    exports$12.solveQP = solveQP;
  })(numeric);
  numeric.svd = function svd(A2) {
    var temp;
    var prec = numeric.epsilon;
    var tolerance = 1e-64 / prec;
    var itmax = 50;
    var c = 0;
    var i = 0;
    var j = 0;
    var k2 = 0;
    var l = 0;
    var u = numeric.clone(A2);
    var m = u.length;
    var n = u[0].length;
    if (m < n) throw "Need more rows than columns";
    var e = new Array(n);
    var q = new Array(n);
    for (i = 0; i < n; i++) e[i] = q[i] = 0;
    var v = numeric.rep([n, n], 0);
    function pythag(a, b) {
      a = Math.abs(a);
      b = Math.abs(b);
      if (a > b)
        return a * Math.sqrt(1 + b * b / a / a);
      else if (b == 0)
        return a;
      return b * Math.sqrt(1 + a * a / b / b);
    }
    var f = 0;
    var g = 0;
    var h = 0;
    var x = 0;
    var y = 0;
    var z = 0;
    var s = 0;
    for (i = 0; i < n; i++) {
      e[i] = g;
      s = 0;
      l = i + 1;
      for (j = i; j < m; j++)
        s += u[j][i] * u[j][i];
      if (s <= tolerance)
        g = 0;
      else {
        f = u[i][i];
        g = Math.sqrt(s);
        if (f >= 0) g = -g;
        h = f * g - s;
        u[i][i] = f - g;
        for (j = l; j < n; j++) {
          s = 0;
          for (k2 = i; k2 < m; k2++)
            s += u[k2][i] * u[k2][j];
          f = s / h;
          for (k2 = i; k2 < m; k2++)
            u[k2][j] += f * u[k2][i];
        }
      }
      q[i] = g;
      s = 0;
      for (j = l; j < n; j++)
        s = s + u[i][j] * u[i][j];
      if (s <= tolerance)
        g = 0;
      else {
        f = u[i][i + 1];
        g = Math.sqrt(s);
        if (f >= 0) g = -g;
        h = f * g - s;
        u[i][i + 1] = f - g;
        for (j = l; j < n; j++) e[j] = u[i][j] / h;
        for (j = l; j < m; j++) {
          s = 0;
          for (k2 = l; k2 < n; k2++)
            s += u[j][k2] * u[i][k2];
          for (k2 = l; k2 < n; k2++)
            u[j][k2] += s * e[k2];
        }
      }
      y = Math.abs(q[i]) + Math.abs(e[i]);
      if (y > x)
        x = y;
    }
    for (i = n - 1; i != -1; i += -1) {
      if (g != 0) {
        h = g * u[i][i + 1];
        for (j = l; j < n; j++)
          v[j][i] = u[i][j] / h;
        for (j = l; j < n; j++) {
          s = 0;
          for (k2 = l; k2 < n; k2++)
            s += u[i][k2] * v[k2][j];
          for (k2 = l; k2 < n; k2++)
            v[k2][j] += s * v[k2][i];
        }
      }
      for (j = l; j < n; j++) {
        v[i][j] = 0;
        v[j][i] = 0;
      }
      v[i][i] = 1;
      g = e[i];
      l = i;
    }
    for (i = n - 1; i != -1; i += -1) {
      l = i + 1;
      g = q[i];
      for (j = l; j < n; j++)
        u[i][j] = 0;
      if (g != 0) {
        h = u[i][i] * g;
        for (j = l; j < n; j++) {
          s = 0;
          for (k2 = l; k2 < m; k2++) s += u[k2][i] * u[k2][j];
          f = s / h;
          for (k2 = i; k2 < m; k2++) u[k2][j] += f * u[k2][i];
        }
        for (j = i; j < m; j++) u[j][i] = u[j][i] / g;
      } else
        for (j = i; j < m; j++) u[j][i] = 0;
      u[i][i] += 1;
    }
    prec = prec * x;
    for (k2 = n - 1; k2 != -1; k2 += -1) {
      for (var iteration = 0; iteration < itmax; iteration++) {
        var test_convergence = false;
        for (l = k2; l != -1; l += -1) {
          if (Math.abs(e[l]) <= prec) {
            test_convergence = true;
            break;
          }
          if (Math.abs(q[l - 1]) <= prec)
            break;
        }
        if (!test_convergence) {
          c = 0;
          s = 1;
          var l1 = l - 1;
          for (i = l; i < k2 + 1; i++) {
            f = s * e[i];
            e[i] = c * e[i];
            if (Math.abs(f) <= prec)
              break;
            g = q[i];
            h = pythag(f, g);
            q[i] = h;
            c = g / h;
            s = -f / h;
            for (j = 0; j < m; j++) {
              y = u[j][l1];
              z = u[j][i];
              u[j][l1] = y * c + z * s;
              u[j][i] = -y * s + z * c;
            }
          }
        }
        z = q[k2];
        if (l == k2) {
          if (z < 0) {
            q[k2] = -z;
            for (j = 0; j < n; j++)
              v[j][k2] = -v[j][k2];
          }
          break;
        }
        if (iteration >= itmax - 1)
          throw "Error: no convergence.";
        x = q[l];
        y = q[k2 - 1];
        g = e[k2 - 1];
        h = e[k2];
        f = ((y - z) * (y + z) + (g - h) * (g + h)) / (2 * h * y);
        g = pythag(f, 1);
        if (f < 0)
          f = ((x - z) * (x + z) + h * (y / (f - g) - h)) / x;
        else
          f = ((x - z) * (x + z) + h * (y / (f + g) - h)) / x;
        c = 1;
        s = 1;
        for (i = l + 1; i < k2 + 1; i++) {
          g = e[i];
          y = q[i];
          h = s * g;
          g = c * g;
          z = pythag(f, h);
          e[i - 1] = z;
          c = f / z;
          s = h / z;
          f = x * c + g * s;
          g = -x * s + g * c;
          h = y * s;
          y = y * c;
          for (j = 0; j < n; j++) {
            x = v[j][i - 1];
            z = v[j][i];
            v[j][i - 1] = x * c + z * s;
            v[j][i] = -x * s + z * c;
          }
          z = pythag(f, h);
          q[i - 1] = z;
          c = f / z;
          s = h / z;
          f = c * g + s * y;
          x = -s * g + c * y;
          for (j = 0; j < m; j++) {
            y = u[j][i - 1];
            z = u[j][i];
            u[j][i - 1] = y * c + z * s;
            u[j][i] = -y * s + z * c;
          }
        }
        e[l] = 0;
        e[k2] = f;
        q[k2] = x;
      }
    }
    for (i = 0; i < q.length; i++)
      if (q[i] < prec) q[i] = 0;
    for (i = 0; i < n; i++) {
      for (j = i - 1; j >= 0; j--) {
        if (q[j] < q[i]) {
          c = q[j];
          q[j] = q[i];
          q[i] = c;
          for (k2 = 0; k2 < u.length; k2++) {
            temp = u[k2][i];
            u[k2][i] = u[k2][j];
            u[k2][j] = temp;
          }
          for (k2 = 0; k2 < v.length; k2++) {
            temp = v[k2][i];
            v[k2][i] = v[k2][j];
            v[k2][j] = temp;
          }
          i = j;
        }
      }
    }
    return { U: u, S: q, V: v };
  };
})(numeric1_2_6);
const numeric$2 = /* @__PURE__ */ getDefaultExportFromCjs(numeric1_2_6);
var numeric$1 = numeric1_2_6;
var forwardSHT = function(N, data, CART_OR_SPH, DIRECT_OR_PINV) {
  var Ndirs = data.length, Nsh = (N + 1) * (N + 1);
  var invY_N;
  var mag = [,];
  if (Nsh > Ndirs) {
    console.log("The SHT degree is too high for the number of data points");
  }
  if (CART_OR_SPH == 0) data = convertCart2Sph(data);
  for (var i = 0; i < data.length; i++) {
    mag[i] = data[i][2];
  }
  Y_N = computeRealSH(N, data);
  if (DIRECT_OR_PINV == 0) {
    invY_N = numeric$1.mul(1 / Ndirs, Y_N);
  } else {
    invY_N = pinv_direct(numeric$1.transpose(Y_N));
  }
  var coeffs = numeric$1.dotMV(invY_N, mag);
  return coeffs;
};
var convertCart2Sph = function(xyz, OMIT_MAG) {
  var azi, elev, r;
  var aziElevR = new Array(xyz.length);
  for (var i = 0; i < xyz.length; i++) {
    azi = Math.atan2(xyz[i][1], xyz[i][0]);
    elev = Math.atan2(xyz[i][2], Math.sqrt(xyz[i][0] * xyz[i][0] + xyz[i][1] * xyz[i][1]));
    if (OMIT_MAG == 1) {
      aziElevR[i] = [azi, elev];
    } else {
      r = Math.sqrt(xyz[i][0] * xyz[i][0] + xyz[i][1] * xyz[i][1] + xyz[i][2] * xyz[i][2]);
      aziElevR[i] = [azi, elev, r];
    }
  }
  return aziElevR;
};
var computeRealSH = function(N, data) {
  var azi = new Array(data.length);
  var elev = new Array(data.length);
  for (var i = 0; i < data.length; i++) {
    azi[i] = data[i][0];
    elev[i] = data[i][1];
  }
  var factorials = new Array(2 * N + 1);
  azi.length;
  var Nsh = (N + 1) * (N + 1);
  var leg_n_minus1 = 0;
  var leg_n_minus2 = 0;
  var leg_n;
  var sinel = numeric$1.sin(elev);
  var index_n = 0;
  var Y_N2 = new Array(Nsh);
  var Nn0, Nnm;
  var cosmazi, sinmazi;
  for (var i = 0; i < 2 * N + 1; i++) factorials[i] = factorial(i);
  for (var n = 0; n < N + 1; n++) {
    if (n == 0) {
      var temp0 = new Array(azi.length);
      temp0.fill(1);
      Y_N2[n] = temp0;
      index_n = 1;
    } else {
      leg_n = recurseLegendrePoly(n, sinel, leg_n_minus1, leg_n_minus2);
      Nn0 = Math.sqrt(2 * n + 1);
      for (var m = 0; m < n + 1; m++) {
        if (m == 0) Y_N2[index_n + n] = numeric$1.mul(Nn0, leg_n[m]);
        else {
          Nnm = Nn0 * Math.sqrt(2 * factorials[n - m] / factorials[n + m]);
          cosmazi = numeric$1.cos(numeric$1.mul(m, azi));
          sinmazi = numeric$1.sin(numeric$1.mul(m, azi));
          Y_N2[index_n + n - m] = numeric$1.mul(Nnm, numeric$1.mul(leg_n[m], sinmazi));
          Y_N2[index_n + n + m] = numeric$1.mul(Nnm, numeric$1.mul(leg_n[m], cosmazi));
        }
      }
      index_n = index_n + 2 * n + 1;
    }
    leg_n_minus2 = leg_n_minus1;
    leg_n_minus1 = leg_n;
  }
  return Y_N2;
};
var factorial = function(n) {
  if (n === 0) return 1;
  return n * factorial(n - 1);
};
var recurseLegendrePoly = function(n, x, Pnm_minus1, Pnm_minus2) {
  var Pnm = new Array(n + 1);
  switch (n) {
    case 1:
      var x2 = numeric$1.mul(x, x);
      var P10 = x;
      var P11 = numeric$1.sqrt(numeric$1.sub(1, x2));
      Pnm[0] = P10;
      Pnm[1] = P11;
      break;
    case 2:
      var x2 = numeric$1.mul(x, x);
      var P20 = numeric$1.mul(3, x2);
      P20 = numeric$1.sub(P20, 1);
      P20 = numeric$1.div(P20, 2);
      var P21 = numeric$1.sub(1, x2);
      P21 = numeric$1.sqrt(P21);
      P21 = numeric$1.mul(3, P21);
      P21 = numeric$1.mul(P21, x);
      var P22 = numeric$1.sub(1, x2);
      P22 = numeric$1.mul(3, P22);
      Pnm[0] = P20;
      Pnm[1] = P21;
      Pnm[2] = P22;
      break;
    default:
      var x2 = numeric$1.mul(x, x);
      var one_min_x2 = numeric$1.sub(1, x2);
      var k2 = 2 * n - 1;
      var dfact_k = 1;
      if (k2 % 2 == 0) {
        for (var kk = 1; kk < k2 / 2 + 1; kk++) dfact_k = dfact_k * 2 * kk;
      } else {
        for (var kk = 1; kk < (k2 + 1) / 2 + 1; kk++) dfact_k = dfact_k * (2 * kk - 1);
      }
      Pnm[n] = numeric$1.mul(dfact_k, numeric$1.pow(one_min_x2, n / 2));
      Pnm[n - 1] = numeric$1.mul(2 * n - 1, numeric$1.mul(x, Pnm_minus1[n - 1]));
      for (var m = 0; m < n - 1; m++) {
        var temp1 = numeric$1.mul(2 * n - 1, numeric$1.mul(x, Pnm_minus1[m]));
        var temp2 = numeric$1.mul(n + m - 1, Pnm_minus2[m]);
        Pnm[m] = numeric$1.div(numeric$1.sub(temp1, temp2), n - m);
      }
  }
  return Pnm;
};
var pinv_direct = function(A2) {
  var AT = numeric$1.transpose(A2);
  return numeric$1.dot(numeric$1.inv(numeric$1.dot(AT, A2)), AT);
};
var getSHrotMtx = function(Rxyz, L) {
  var Nsh = (L + 1) * (L + 1);
  var R = numeric$1.rep([Nsh, Nsh], 0);
  R[0][0] = 1;
  var R_1 = numeric$1.rep([3, 3], 0);
  R_1[0][0] = Rxyz[1][1];
  R_1[0][1] = Rxyz[1][2];
  R_1[0][2] = Rxyz[1][0];
  R_1[1][0] = Rxyz[2][1];
  R_1[1][1] = Rxyz[2][2];
  R_1[1][2] = Rxyz[2][0];
  R_1[2][0] = Rxyz[0][1];
  R_1[2][1] = Rxyz[0][2];
  R_1[2][2] = Rxyz[0][0];
  R = numeric$1.setBlock(R, [1, 1], [3, 3], R_1);
  var R_lm1 = R_1;
  var band_idx = 3;
  for (var l = 2; l < L + 1; l++) {
    var R_l = numeric$1.rep([2 * l + 1, 2 * l + 1], 0);
    for (var m = -l; m < l + 1; m++) {
      for (var n = -l; n < l + 1; n++) {
        var d, denom, u, v, w;
        if (m == 0) d = 1;
        else d = 0;
        if (Math.abs(n) == l) denom = 2 * l * (2 * l - 1);
        else denom = l * l - n * n;
        u = Math.sqrt((l * l - m * m) / denom);
        v = Math.sqrt((1 + d) * (l + Math.abs(m) - 1) * (l + Math.abs(m)) / denom) * (1 - 2 * d) * 0.5;
        w = Math.sqrt((l - Math.abs(m) - 1) * (l - Math.abs(m)) / denom) * (1 - d) * -0.5;
        if (u != 0) u = u * U(l, m, n, R_1, R_lm1);
        if (v != 0) v = v * V(l, m, n, R_1, R_lm1);
        if (w != 0) w = w * W(l, m, n, R_1, R_lm1);
        R_l[m + l][n + l] = u + v + w;
      }
    }
    R = numeric$1.setBlock(R, [band_idx + 1, band_idx + 1], [band_idx + 2 * l + 1, band_idx + 2 * l + 1], R_l);
    R_lm1 = R_l;
    band_idx = band_idx + 2 * l + 1;
  }
  return R;
};
function U(l, m, n, R_1, R_lm1) {
  return P(0, l, m, n, R_1, R_lm1);
}
function V(l, m, n, R_1, R_lm1) {
  var p0, p1, ret, d;
  if (m == 0) {
    p0 = P(1, l, 1, n, R_1, R_lm1);
    p1 = P(-1, l, -1, n, R_1, R_lm1);
    ret = p0 + p1;
  } else if (m > 0) {
    if (m == 1) d = 1;
    else d = 0;
    p0 = P(1, l, m - 1, n, R_1, R_lm1);
    p1 = P(-1, l, -m + 1, n, R_1, R_lm1);
    ret = p0 * Math.sqrt(1 + d) - p1 * (1 - d);
  } else {
    if (m == -1) d = 1;
    else d = 0;
    p0 = P(1, l, m + 1, n, R_1, R_lm1);
    p1 = P(-1, l, -m - 1, n, R_1, R_lm1);
    ret = p0 * (1 - d) + p1 * Math.sqrt(1 + d);
  }
  return ret;
}
function W(l, m, n, R_1, R_lm1) {
  var p0, p1, ret;
  if (m == 0) {
    console.error("should not be called");
  } else {
    if (m > 0) {
      p0 = P(1, l, m + 1, n, R_1, R_lm1);
      p1 = P(-1, l, -m - 1, n, R_1, R_lm1);
      ret = p0 + p1;
    } else {
      p0 = P(1, l, m - 1, n, R_1, R_lm1);
      p1 = P(-1, l, -m + 1, n, R_1, R_lm1);
      ret = p0 - p1;
    }
  }
  return ret;
}
function P(i, l, a, b, R_1, R_lm1) {
  var ri1, rim1, ri0, ret;
  ri1 = R_1[i + 1][1 + 1];
  rim1 = R_1[i + 1][-1 + 1];
  ri0 = R_1[i + 1][0 + 1];
  if (b == -l) {
    ret = ri1 * R_lm1[a + l - 1][0] + rim1 * R_lm1[a + l - 1][2 * l - 2];
  } else {
    if (b == l) ret = ri1 * R_lm1[a + l - 1][2 * l - 2] - rim1 * R_lm1[a + l - 1][0];
    else ret = ri0 * R_lm1[a + l - 1][b + l - 1];
  }
  return ret;
}
var yawPitchRoll2Rzyx = function(yaw, pitch, roll) {
  var Rx, Ry, Rz;
  if (roll == 0) Rx = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
  else Rx = [[1, 0, 0], [0, Math.cos(roll), Math.sin(roll)], [0, -Math.sin(roll), Math.cos(roll)]];
  if (pitch == 0) Ry = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
  else Ry = [[Math.cos(pitch), 0, -Math.sin(pitch)], [0, 1, 0], [Math.sin(pitch), 0, Math.cos(pitch)]];
  if (yaw == 0) Rz = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
  else Rz = [[Math.cos(yaw), Math.sin(yaw), 0], [-Math.sin(yaw), Math.cos(yaw), 0], [0, 0, 1]];
  var R = numeric$1.dotMMsmall(Ry, Rz);
  R = numeric$1.dotMMsmall(Rx, R);
  return R;
};
var forwardSHT_1 = forwardSHT;
var convertCart2Sph_1 = convertCart2Sph;
var computeRealSH_1 = computeRealSH;
var factorial_1 = factorial;
var recurseLegendrePoly_1 = recurseLegendrePoly;
var getSHrotMtx_1 = getSHrotMtx;
var yawPitchRoll2Rzyx_1 = yawPitchRoll2Rzyx;
var numeric = require("numeric");
var jshlib = require("spherical-harmonic-transform");
var convexhull = require("convex-hull");
function deg2rad(aedArrayIn) {
  var aedArrayOut = [];
  var PI_180 = Math.PI / 180;
  for (let i = 0; i < aedArrayIn.length; i++) {
    if (aedArrayIn[0].length == 3)
      aedArrayOut.push([
        aedArrayIn[i][0] * PI_180,
        aedArrayIn[i][1] * PI_180,
        aedArrayIn[i][2]
      ]);
    else if (aedArrayIn[0].length == 2)
      aedArrayOut.push([
        aedArrayIn[i][0] * PI_180,
        aedArrayIn[i][1] * PI_180
      ]);
  }
  return aedArrayOut;
}
function rad2deg(aedArrayIn) {
  var aedArrayOut = [];
  var PI_180 = 180 / Math.PI;
  for (let i = 0; i < aedArrayIn.length; i++) {
    if (aedArrayIn[0].length == 3)
      aedArrayOut.push([
        aedArrayIn[i][0] * PI_180,
        aedArrayIn[i][1] * PI_180,
        aedArrayIn[i][2]
      ]);
    else if (aedArrayIn[0].length == 2)
      aedArrayOut.push([
        aedArrayIn[i][0] * PI_180,
        aedArrayIn[i][1] * PI_180
      ]);
  }
  return aedArrayOut;
}
function getColumn(anArray, columnNumber) {
  return anArray.map(function(row) {
    return row[columnNumber];
  });
}
function sampleCircle(numPoints) {
  var speakerAngles = [];
  var deltaAngle = 360 / numPoints;
  var currentAngle = 0;
  for (var i = 0; i < numPoints; i++) {
    speakerAngles.push([currentAngle, 0, 1]);
    currentAngle += deltaAngle;
  }
  return speakerAngles;
}
function getCircHarmonics(order, phis) {
  var N = order;
  var numCircHarm = 2 * N + 1;
  var Ndirs = phis.length;
  var Y_N2 = new Array(numCircHarm);
  var arr1 = new Array(Ndirs);
  phis = numeric.mul(phis, Math.PI / 180);
  arr1.fill(1 / Math.sqrt(2 * Math.PI));
  Y_N2[0] = arr1;
  for (var i = 0; i < N; i++) {
    Y_N2[2 * i + 1] = numeric.div(numeric.sin(numeric.mul(-(i + 1), phis)), Math.sqrt(Math.PI));
    Y_N2[2 * i + 2] = numeric.div(numeric.cos(numeric.mul(i + 1, phis)), Math.sqrt(Math.PI));
  }
  return Y_N2;
}
function getAmbisonicDecMtx(hrtf_dirs_deg, order) {
  var hrtf_dirs_rad = deg2rad(hrtf_dirs_deg);
  var vertices = jshlib.convertSph2Cart(hrtf_dirs_rad);
  var triplets = convexhull(vertices);
  var nTri = triplets.length;
  var nHRTFs = hrtf_dirs_rad.length;
  var layoutInvMtx = new Array(nTri);
  for (let n = 0; n < nTri; n++) {
    let tempGroup = new Array(3);
    for (let i = 0; i < 3; i++) {
      tempGroup[i] = vertices[triplets[n][i]];
    }
    let tempInvMtx = numeric.inv(tempGroup);
    let tempInvVec = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        tempInvVec.push(tempInvMtx[j][i]);
      }
    }
    layoutInvMtx[n] = tempInvVec;
  }
  var td_dirs_deg = getTdesign(2 * order);
  var td_dirs_rad = deg2rad(td_dirs_deg);
  var G_td = vbap3(td_dirs_rad, triplets, layoutInvMtx, nHRTFs);
  G_td = numeric.transpose(G_td);
  var Y_td = jshlib.computeRealSH(order, td_dirs_rad);
  Y_td = numeric.transpose(Y_td);
  var nTD = td_dirs_rad.length;
  var M_dec = numeric.dotMMsmall(G_td, Y_td);
  M_dec = numeric.mul(1 / nTD, M_dec);
  return M_dec;
}
var vbap3 = function(dirs_rad, triplets, ls_invMtx, ls_num) {
  var nDirs = dirs_rad.length;
  var nLS = ls_num;
  var nTri = triplets.length;
  function getMinOfArray(numArray) {
    return Math.min.apply(null, numArray);
  }
  var gainMtx = new Array(nDirs);
  var U2 = jshlib.convertSph2Cart(dirs_rad);
  for (let ns = 0; ns < nDirs; ns++) {
    let u = U2[ns];
    let gains = new Array(nLS);
    gains.fill(0);
    for (let i = 0; i < nTri; i++) {
      let g_tmp = [];
      let v_tmp = [ls_invMtx[i][0], ls_invMtx[i][1], ls_invMtx[i][2]];
      g_tmp[0] = numeric.dotVV(v_tmp, u);
      v_tmp = [ls_invMtx[i][3], ls_invMtx[i][4], ls_invMtx[i][5]];
      g_tmp[1] = numeric.dotVV(v_tmp, u);
      v_tmp = [ls_invMtx[i][6], ls_invMtx[i][7], ls_invMtx[i][8]];
      g_tmp[2] = numeric.dotVV(v_tmp, u);
      if (getMinOfArray(g_tmp) > -1e-3) {
        let norm_g_tmp = Math.sqrt(numeric.sum(numeric.pow(g_tmp, 2)));
        let g_tmp_normed = numeric.div(g_tmp, norm_g_tmp);
        for (let j = 0; j < 3; j++) {
          gains[triplets[i][j]] = g_tmp_normed[j];
        }
        break;
      }
    }
    let norm_gains = Math.sqrt(numeric.sum(numeric.pow(gains, 2)));
    let gains_normed = numeric.div(gains, norm_gains);
    gainMtx[ns] = gains_normed;
  }
  return gainMtx;
};
function createNearestLookup(dirs_deg, ang_res) {
  var nDirs = dirs_deg.length;
  var dirs_xyz = jshlib.convertSph2Cart(deg2rad(dirs_deg));
  var nAzi = Math.round(360 / ang_res[0]) + 1;
  var nEle = Math.round(180 / ang_res[1]) + 1;
  var azi = new Array(nAzi);
  azi[0] = -180;
  for (let i = 1; i < nAzi; i++) {
    azi[i] = azi[i - 1] + ang_res[0];
  }
  var nGrid = nAzi * nEle;
  var nearestLookup = new Array(nGrid);
  for (let i = 0; i < nGrid; i++) {
    let grid_deg = [[i % nAzi * ang_res[0] - 180, Math.floor(i / nAzi) * ang_res[1] - 90]];
    let grid_xyz = jshlib.convertSph2Cart(deg2rad(grid_deg));
    let minVal = 1e3;
    for (let j = 0; j < nDirs; j++) {
      let newMinVal = numeric.sum(numeric.pow(numeric.sub(grid_xyz[0], dirs_xyz[j]), 2));
      if (newMinVal < minVal) {
        nearestLookup[i] = j;
        minVal = newMinVal;
      }
    }
  }
  return nearestLookup;
}
function findNearest(dirs_deg, nearestLookup, ang_res) {
  var nDirs = dirs_deg.length;
  var azim = [];
  var elev = [];
  for (let i = 0; i < nDirs; i++) {
    azim.push(dirs_deg[i][0] + 180);
    elev.push(dirs_deg[i][1] + 90);
  }
  var nAzi = Math.round(360 / ang_res[0]) + 1;
  var aziIndex = numeric.round(numeric.div(numeric.mod(azim, 360), ang_res[0]));
  var elevIndex = numeric.round(numeric.div(elev, ang_res[1]));
  var gridIndex = numeric.add(numeric.mul(elevIndex, nAzi), aziIndex, 1);
  var nearestIndex = [];
  for (let i = 0; i < nDirs; i++) {
    nearestIndex.push(nearestLookup[gridIndex[i]]);
  }
  return nearestIndex;
}
function getTdesign(degree) {
  if (degree > 21) {
    throw new Error("Designs of order greater than 21 are not implemented");
  } else if (degree < 1) {
    throw new Error("Order should be at least 1");
  }
  var speakerPos = [
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
  ];
  var dirs = speakerPos[degree - 1];
  return dirs;
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
}, Symbol.toStringTag, { value: "Module" }));
function computeEncodingCoefficients(azim, elev, order) {
  const nCh = getAmbisonicChannelCount(order);
  const azimRad = degreesToRadians(azim);
  const elevRad = degreesToRadians(elev);
  const shMatrix = computeRealSH_1(order, [[azimRad, elevRad]]);
  const coeffs = new Float32Array(nCh);
  for (let i = 0; i < nCh; i++) {
    coeffs[i] = shMatrix[i][0];
  }
  return coeffs;
}
function computeEncodingCoefficients2D(azim, order) {
  const nCh = getAmbisonicChannelCount2D(order);
  const chMatrix = getCircHarmonics(order, [azim]);
  const coeffs = new Float32Array(nCh);
  for (let i = 0; i < nCh; i++) {
    coeffs[i] = chMatrix[i][0];
  }
  return coeffs;
}
function encodeBuffer(monoSamples, azim, elev, order) {
  const nCh = getAmbisonicChannelCount(order);
  const numSamples = monoSamples.length;
  const coeffs = computeEncodingCoefficients(azim, elev, order);
  const output = new Array(nCh);
  for (let ch = 0; ch < nCh; ch++) {
    output[ch] = new Float32Array(numSamples);
    const coeff = coeffs[ch];
    for (let i = 0; i < numSamples; i++) {
      output[ch][i] = monoSamples[i] * coeff;
    }
  }
  return output;
}
function encodeBuffer2D(monoSamples, azim, order) {
  const nCh = getAmbisonicChannelCount2D(order);
  const numSamples = monoSamples.length;
  const coeffs = computeEncodingCoefficients2D(azim, order);
  const output = new Array(nCh);
  for (let ch = 0; ch < nCh; ch++) {
    output[ch] = new Float32Array(numSamples);
    const coeff = coeffs[ch];
    for (let i = 0; i < numSamples; i++) {
      output[ch][i] = monoSamples[i] * coeff;
    }
  }
  return output;
}
function encodeBufferFromDirection(monoSamples, x, y, z, order, coords = "ambisonics") {
  let ax = x, ay = y, az = z;
  if (coords === "threejs") {
    ax = z;
    ay = -x;
    az = y;
  }
  const [[azimRad, elevRad]] = convertCart2Sph_1([[ax, ay, az]], 1);
  const azim = azimRad * 180 / Math.PI;
  const elev = elevRad * 180 / Math.PI;
  return encodeBuffer(monoSamples, azim, elev, order);
}
function encodeBuffer2DFromDirection(monoSamples, x, y, z, order, coords = "ambisonics") {
  let ax = x, ay = y;
  if (coords === "threejs") {
    ax = z;
    ay = -x;
  }
  const azim = Math.atan2(ay, ax) * 180 / Math.PI;
  return encodeBuffer2D(monoSamples, azim, order);
}
function encodeAndSumBuffers(sources, order) {
  if (sources.length === 0) {
    const nCh2 = getAmbisonicChannelCount(order);
    return Array.from({ length: nCh2 }, () => new Float32Array(0));
  }
  const maxLength = Math.max(...sources.map((s) => s.samples.length));
  const nCh = getAmbisonicChannelCount(order);
  const output = Array.from(
    { length: nCh },
    () => new Float32Array(maxLength)
  );
  for (const source of sources) {
    const encoded = encodeBuffer(source.samples, source.azim, source.elev, order);
    for (let ch = 0; ch < nCh; ch++) {
      for (let i = 0; i < source.samples.length; i++) {
        output[ch][i] += encoded[ch][i];
      }
    }
  }
  return output;
}
class monoEncoder {
  constructor(audioCtx, order) {
    this.initialized = false;
    this.ctx = audioCtx;
    this.order = order;
    this.nCh = getAmbisonicChannelCount(order);
    this.azim = 0;
    this.elev = 0;
    this.gains = new Array(this.nCh);
    this.gainNodes = new Array(this.nCh);
    this.in = this.ctx.createGain();
    this.in.channelCountMode = "explicit";
    this.in.channelCount = 1;
    this.out = this.ctx.createChannelMerger(this.nCh);
    for (let i = 0; i < this.nCh; i++) {
      this.gainNodes[i] = this.ctx.createGain();
      this.gainNodes[i].channelCountMode = "explicit";
      this.gainNodes[i].channelCount = 1;
    }
    this.updateGains();
    for (let i = 0; i < this.nCh; i++) {
      this.in.connect(this.gainNodes[i]);
      this.gainNodes[i].connect(this.out, 0, i);
    }
    this.initialized = true;
  }
  updateGains() {
    const g_enc = computeRealSH_1(this.order, [
      [degreesToRadians(this.azim), degreesToRadians(this.elev)]
    ]);
    for (let i = 0; i < this.nCh; i++) {
      this.gains[i] = g_enc[i][0];
      this.gainNodes[i].gain.value = this.gains[i];
    }
  }
  /**
   * Set the encoding direction from a Cartesian direction vector.
   * The vector does not need to be normalized.
   *
   * Note: A zero-length vector (0, 0, 0) results in undefined behavior
   * from the underlying spherical harmonic library.
   *
   * @param x - X component of direction vector
   * @param y - Y component of direction vector
   * @param z - Z component of direction vector
   * @param coords - Coordinate system convention (default: 'ambisonics')
   *   - 'ambisonics': +X forward, +Y left, +Z up
   *   - 'threejs': +Z forward, +Y up, +X right
   */
  setDirection(x, y, z, coords = "ambisonics") {
    let ax = x, ay = y, az = z;
    if (coords === "threejs") {
      ax = z;
      ay = -x;
      az = y;
    }
    const [[azimRad, elevRad]] = convertCart2Sph_1([[ax, ay, az]], 1);
    this.azim = radiansToDegrees(azimRad);
    this.elev = radiansToDegrees(elevRad);
    this.updateGains();
  }
  /**
   * Get the current encoding direction as a Cartesian unit vector.
   *
   * @param coords - Coordinate system convention (default: 'ambisonics')
   * @returns Direction as [x, y, z] unit vector
   */
  getDirection(coords = "ambisonics") {
    const azimRad = degreesToRadians(this.azim);
    const elevRad = degreesToRadians(this.elev);
    const cosElev = Math.cos(elevRad);
    const ax = cosElev * Math.cos(azimRad);
    const ay = cosElev * Math.sin(azimRad);
    const az = Math.sin(elevRad);
    if (coords === "threejs") {
      return [-ay, az, ax];
    }
    return [ax, ay, az];
  }
}
class monoEncoder2D {
  constructor(audioCtx, order) {
    this.initialized = false;
    this.ctx = audioCtx;
    this.order = order;
    this.nCh = getAmbisonicChannelCount2D(order);
    this.azim = 0;
    this.elev = 0;
    this.gainNodes = new Array(this.nCh);
    this.in = this.ctx.createGain();
    this.in.channelCountMode = "explicit";
    this.in.channelCount = 1;
    this.out = this.ctx.createChannelMerger(this.nCh);
    for (let i = 0; i < this.nCh; i++) {
      this.gainNodes[i] = this.ctx.createGain();
      this.gainNodes[i].channelCountMode = "explicit";
      this.gainNodes[i].channelCount = 1;
    }
    this.updateGains();
    for (let i = 0; i < this.nCh; i++) {
      this.in.connect(this.gainNodes[i]);
      this.gainNodes[i].connect(this.out, 0, i);
    }
    this.initialized = true;
  }
  updateGains() {
    const g_enc = getCircHarmonics(this.order, [this.azim]);
    for (let i = 0; i < this.nCh; i++) {
      this.gainNodes[i].gain.value = g_enc[i][0];
    }
  }
  /**
   * Set the encoding direction from a Cartesian direction vector.
   * Only the horizontal plane (x, y) components are used; z is ignored.
   * The vector does not need to be normalized.
   *
   * Note: A zero-length vector (0, 0, 0) or a purely vertical vector (0, 0, z)
   * results in azimuth 0° (front direction).
   *
   * @param x - X component of direction vector
   * @param y - Y component of direction vector
   * @param z - Z component (ignored for 2D encoding)
   * @param coords - Coordinate system convention (default: 'ambisonics')
   *   - 'ambisonics': +X forward, +Y left, +Z up
   *   - 'threejs': +Z forward, +Y up, +X right
   */
  setDirection(x, y, z, coords = "ambisonics") {
    let ax = x, ay = y;
    if (coords === "threejs") {
      ax = z;
      ay = -x;
    }
    this.azim = radiansToDegrees(Math.atan2(ay, ax));
    this.elev = 0;
    this.updateGains();
  }
  /**
   * Get the current encoding direction as a Cartesian unit vector.
   * The z component will always be 0 for 2D encoding.
   *
   * @param coords - Coordinate system convention (default: 'ambisonics')
   * @returns Direction as [x, y, z] unit vector (z always 0)
   */
  getDirection(coords = "ambisonics") {
    const azimRad = degreesToRadians(this.azim);
    const ax = Math.cos(azimRad);
    const ay = Math.sin(azimRad);
    if (coords === "threejs") {
      return [-ay, 0, ax];
    }
    return [ax, ay, 0];
  }
}
class orderLimiter {
  // Implement AmbisonicProcessor interface
  get order() {
    return this.orderOut;
  }
  get nCh() {
    return this.nChOut;
  }
  constructor(audioCtx, orderIn, orderOut) {
    this.ctx = audioCtx;
    this.orderIn = orderIn;
    this.orderOut = orderOut < orderIn ? orderOut : orderIn;
    this.nChIn = getAmbisonicChannelCount(this.orderIn);
    this.nChOut = getAmbisonicChannelCount(this.orderOut);
    this.in = this.ctx.createChannelSplitter(this.nChIn);
    this.out = this.ctx.createChannelMerger(this.nChOut);
    for (let i = 0; i < this.nChOut; i++) {
      this.in.connect(this.out, i, i);
    }
  }
  updateOrder(orderOut) {
    if (orderOut > this.orderIn) {
      return;
    }
    this.orderOut = orderOut;
    this.nChOut = getAmbisonicChannelCount(this.orderOut);
    this.out.disconnect();
    this.out = this.ctx.createChannelMerger(this.nChOut);
    for (let i = 0; i < this.nChOut; i++) {
      this.in.connect(this.out, i, i);
    }
  }
}
class orderLimiter2D {
  // Implement AmbisonicProcessor interface
  get order() {
    return this.orderOut;
  }
  get nCh() {
    return this.nChOut;
  }
  constructor(audioCtx, orderIn, orderOut) {
    this.ctx = audioCtx;
    this.orderIn = orderIn;
    this.orderOut = orderOut < orderIn ? orderOut : orderIn;
    this.nChIn = getAmbisonicChannelCount2D(this.orderIn);
    this.nChOut = getAmbisonicChannelCount2D(this.orderOut);
    this.in = this.ctx.createChannelSplitter(this.nChIn);
    this.out = this.ctx.createChannelMerger(this.nChOut);
    for (let i = 0; i < this.nChOut; i++) {
      this.in.connect(this.out, i, i);
    }
  }
  updateOrder(orderOut) {
    if (orderOut > this.orderIn) {
      return;
    }
    this.orderOut = orderOut;
    this.nChOut = getAmbisonicChannelCount2D(this.orderOut);
    this.out.disconnect();
    this.out = this.ctx.createChannelMerger(this.nChOut);
    for (let i = 0; i < this.nChOut; i++) {
      this.in.connect(this.out, i, i);
    }
  }
}
class orderWeight {
  constructor(audioCtx, order) {
    this.ctx = audioCtx;
    this.order = order;
    this.nCh = getAmbisonicChannelCount(this.order);
    this.in = this.ctx.createChannelSplitter(this.nCh);
    this.out = this.ctx.createChannelMerger(this.nCh);
    this.gains = new Array(this.nCh);
    this.orderGains = new Array(this.order + 1);
    this.orderGains.fill(1);
    for (let i = 0; i < this.nCh; i++) {
      this.gains[i] = this.ctx.createGain();
      this.in.connect(this.gains[i], i, 0);
      this.gains[i].connect(this.out, 0, i);
    }
  }
  updateOrderGains() {
    for (let i = 0; i < this.nCh; i++) {
      const n = Math.floor(Math.sqrt(i));
      this.gains[i].gain.value = this.orderGains[n];
    }
  }
  computeMaxRECoeffs() {
    const N = this.order;
    this.orderGains[0] = 1;
    let leg_n_minus1 = 0;
    let leg_n_minus2 = 0;
    for (let n = 1; n <= N; n++) {
      const leg_n = recurseLegendrePoly_1(
        n,
        [Math.cos(2.406809 / (N + 1.51))],
        leg_n_minus1,
        leg_n_minus2
      );
      this.orderGains[n] = leg_n[0][0];
      leg_n_minus2 = leg_n_minus1;
      leg_n_minus1 = leg_n;
    }
  }
}
class sceneRotator {
  constructor(audioCtx, order) {
    this.ctx = audioCtx;
    this.order = order;
    this.nCh = getAmbisonicChannelCount(order);
    this.yaw = 0;
    this.pitch = 0;
    this.roll = 0;
    this.rotMtx = numeric$2.identity(this.nCh);
    this.rotMtxNodes = new Array(this.order);
    this.in = this.ctx.createChannelSplitter(this.nCh);
    this.out = this.ctx.createChannelMerger(this.nCh);
    for (let n = 1; n <= this.order; n++) {
      const gains_n = new Array(2 * n + 1);
      for (let i = 0; i < 2 * n + 1; i++) {
        gains_n[i] = new Array(2 * n + 1);
        for (let j = 0; j < 2 * n + 1; j++) {
          gains_n[i][j] = this.ctx.createGain();
          gains_n[i][j].gain.value = i === j ? 1 : 0;
        }
      }
      this.rotMtxNodes[n - 1] = gains_n;
    }
    this.in.connect(this.out, 0, 0);
    let band_idx = 1;
    for (let n = 1; n <= this.order; n++) {
      for (let i = 0; i < 2 * n + 1; i++) {
        for (let j = 0; j < 2 * n + 1; j++) {
          this.in.connect(this.rotMtxNodes[n - 1][i][j], band_idx + j, 0);
          this.rotMtxNodes[n - 1][i][j].connect(this.out, 0, band_idx + i);
        }
      }
      band_idx = band_idx + 2 * n + 1;
    }
  }
  updateRotMtx() {
    const yaw = degreesToRadians(this.yaw);
    const pitch = degreesToRadians(this.pitch);
    const roll = degreesToRadians(this.roll);
    this.rotMtx = getSHrotMtx_1(
      yawPitchRoll2Rzyx_1(yaw, pitch, roll),
      this.order
    );
    let band_idx = 1;
    for (let n = 1; n < this.order + 1; n++) {
      for (let i = 0; i < 2 * n + 1; i++) {
        for (let j = 0; j < 2 * n + 1; j++) {
          this.rotMtxNodes[n - 1][i][j].gain.value = this.rotMtx[band_idx + i][band_idx + j];
        }
      }
      band_idx = band_idx + 2 * n + 1;
    }
  }
}
class sceneRotator2D {
  constructor(audioCtx, order) {
    this.ctx = audioCtx;
    this.order = order;
    this.nCh = getAmbisonicChannelCount2D(order);
    this.yaw = 0;
    this.in = this.ctx.createChannelSplitter(this.nCh);
    this.out = this.ctx.createChannelMerger(this.nCh);
    this.rotMtxNodes = new Array(2 * this.order);
    this.in.connect(this.out, 0, 0);
    for (let i = 0; i < 2 * this.order; i = i + 2) {
      const tempGainArr = [
        this.ctx.createGain(),
        this.ctx.createGain()
      ];
      const tempGainArr2 = [
        this.ctx.createGain(),
        this.ctx.createGain()
      ];
      this.rotMtxNodes[i] = tempGainArr;
      this.rotMtxNodes[i + 1] = tempGainArr2;
      this.in.connect(this.rotMtxNodes[i][0], i + 1, 0);
      this.rotMtxNodes[i][0].connect(this.out, 0, i + 1);
      this.in.connect(this.rotMtxNodes[i][1], i + 2, 0);
      this.rotMtxNodes[i][1].connect(this.out, 0, i + 1);
      this.in.connect(this.rotMtxNodes[i + 1][0], i + 1, 0);
      this.rotMtxNodes[i + 1][0].connect(this.out, 0, i + 2);
      this.in.connect(this.rotMtxNodes[i + 1][1], i + 2, 0);
      this.rotMtxNodes[i + 1][1].connect(this.out, 0, i + 2);
    }
    this.updateRotMtx();
  }
  updateRotMtx() {
    const azim = degreesToRadians(this.yaw);
    let j = 1;
    for (let i = 0; i < 2 * this.order; i = i + 2) {
      this.rotMtxNodes[i][0].gain.value = Math.cos(j * azim);
      this.rotMtxNodes[i][1].gain.value = Math.sin(j * azim);
      this.rotMtxNodes[i + 1][0].gain.value = -Math.sin(j * azim);
      this.rotMtxNodes[i + 1][1].gain.value = Math.cos(j * azim);
      j++;
    }
  }
}
class sceneMirror {
  constructor(audioCtx, order) {
    this.ctx = audioCtx;
    this.order = order;
    this.nCh = getAmbisonicChannelCount(order);
    this.mirrorPlane = 0;
    this.in = this.ctx.createChannelSplitter(this.nCh);
    this.out = this.ctx.createChannelMerger(this.nCh);
    this.gains = new Array(this.nCh);
    for (let q = 0; q < this.nCh; q++) {
      this.gains[q] = this.ctx.createGain();
      this.gains[q].gain.value = 1;
      this.in.connect(this.gains[q], q, 0);
      this.gains[q].connect(this.out, 0, q);
    }
  }
  reset() {
    for (let q = 0; q < this.nCh; q++) {
      this.gains[q].gain.value = 1;
    }
  }
  mirror(planeNo) {
    switch (planeNo) {
      case 0:
        this.mirrorPlane = 0;
        this.reset();
        break;
      case 1:
        this.reset();
        this.mirrorPlane = 1;
        for (let n = 0; n <= this.order; n++) {
          for (let m = -n; m <= n; m++) {
            const q = n * n + n + m;
            if (m < 0 && m % 2 === 0 || m > 0 && m % 2 === 1) {
              this.gains[q].gain.value = -1;
            }
          }
        }
        break;
      case 2:
        this.reset();
        this.mirrorPlane = 2;
        for (let n = 0; n <= this.order; n++) {
          for (let m = -n; m <= n; m++) {
            const q = n * n + n + m;
            if (m < 0) {
              this.gains[q].gain.value = -1;
            }
          }
        }
        break;
      case 3:
        this.reset();
        this.mirrorPlane = 3;
        for (let n = 0; n <= this.order; n++) {
          for (let m = -n; m <= n; m++) {
            const q = n * n + n + m;
            if ((m + n) % 2 === 1) {
              this.gains[q].gain.value = -1;
            }
          }
        }
        break;
      default:
        console.log(
          "The mirroring planes can be either 1 (yz), 2 (xz), 3 (xy), or 0 (no mirroring). Value set to 0."
        );
        this.mirrorPlane = 0;
        this.reset();
    }
  }
}
class sceneMirror2D {
  constructor(audioCtx, order) {
    this.ctx = audioCtx;
    this.order = order;
    this.nCh = getAmbisonicChannelCount2D(order);
    this.mirrorPlane = 0;
    this.in = this.ctx.createChannelSplitter(this.nCh);
    this.out = this.ctx.createChannelMerger(this.nCh);
    this.gains = new Array(this.nCh);
    for (let q = 0; q < this.nCh; q++) {
      this.gains[q] = this.ctx.createGain();
      this.gains[q].gain.value = 1;
      this.in.connect(this.gains[q], q, 0);
      this.gains[q].connect(this.out, 0, q);
    }
  }
  reset() {
    for (let q = 0; q < this.nCh; q++) {
      this.gains[q].gain.value = 1;
    }
  }
  mirror(planeNo) {
    switch (planeNo) {
      case 0:
        this.mirrorPlane = 0;
        this.reset();
        break;
      case 1:
        this.reset();
        this.mirrorPlane = 1;
        for (let i = 2; i < this.nCh; i++) {
          this.gains[i].gain.value = -1;
          if (i % 2 !== 0) i = i + 2;
        }
        break;
      case 2:
        this.reset();
        this.mirrorPlane = 2;
        for (let i = 0; i < this.nCh; i++) {
          if (i % 2 !== 0) this.gains[i].gain.value = -1;
        }
        break;
      case 3:
        console.log("up-down mirroring in 2D mode not possible");
        break;
      default:
        console.log(
          "The mirroring planes can be either 1 (yz), 2 (xz) or 0 (no mirroring). Value set to 0."
        );
        this.mirrorPlane = 0;
        this.reset();
    }
  }
}
class binDecoder {
  constructor(audioCtx, order) {
    this.initialized = false;
    this.ctx = audioCtx;
    this.order = order;
    this.nCh = getAmbisonicChannelCount(order);
    this.decFilters = new Array(this.nCh);
    this.decFilterNodes = new Array(this.nCh);
    this.in = this.ctx.createChannelSplitter(this.nCh);
    this.out = this.ctx.createChannelMerger(2);
    this.out.channelCountMode = "explicit";
    this.out.channelCount = 1;
    this.gainMid = this.ctx.createGain();
    this.gainSide = this.ctx.createGain();
    this.invertSide = this.ctx.createGain();
    this.gainMid.gain.value = 1;
    this.gainSide.gain.value = 1;
    this.invertSide.gain.value = -1;
    for (let i = 0; i < this.nCh; i++) {
      this.decFilterNodes[i] = this.ctx.createConvolver();
      this.decFilterNodes[i].normalize = false;
    }
    this.resetFilters();
    for (let i = 0; i < this.nCh; i++) {
      this.in.connect(this.decFilterNodes[i], i, 0);
      const n = Math.floor(Math.sqrt(i));
      const m = i - n * n - n;
      if (m >= 0) {
        this.decFilterNodes[i].connect(this.gainMid);
      } else {
        this.decFilterNodes[i].connect(this.gainSide);
      }
    }
    this.gainMid.connect(this.out, 0, 0);
    this.gainSide.connect(this.out, 0, 0);
    this.gainMid.connect(this.out, 0, 1);
    this.gainSide.connect(this.invertSide, 0, 0);
    this.invertSide.connect(this.out, 0, 1);
    this.initialized = true;
  }
  updateFilters(audioBuffer) {
    for (let i = 0; i < this.nCh; i++) {
      this.decFilters[i] = this.ctx.createBuffer(
        1,
        audioBuffer.length,
        audioBuffer.sampleRate
      );
      this.decFilters[i].getChannelData(0).set(audioBuffer.getChannelData(i));
      this.decFilterNodes[i].buffer = this.decFilters[i];
    }
  }
  resetFilters() {
    const cardGains = new Array(this.nCh);
    cardGains.fill(0);
    cardGains[0] = 0.5;
    cardGains[1] = 0.5 / Math.sqrt(3);
    for (let i = 0; i < this.nCh; i++) {
      this.decFilters[i] = this.ctx.createBuffer(1, 64, this.ctx.sampleRate);
      for (let j = 0; j < 64; j++) {
        this.decFilters[i].getChannelData(0)[j] = 0;
      }
      this.decFilters[i].getChannelData(0)[0] = cardGains[i];
      this.decFilterNodes[i].buffer = this.decFilters[i];
    }
  }
}
class binDecoder2D {
  constructor(audioCtx, order) {
    this.initialized = false;
    this.ctx = audioCtx;
    this.order = order;
    this.nCh = getAmbisonicChannelCount2D(order);
    this.decFilters = new Array(this.nCh);
    this.decFilterNodes = new Array(this.nCh);
    this.in = this.ctx.createChannelSplitter(this.nCh);
    this.out = this.ctx.createChannelMerger(2);
    this.out.channelCountMode = "explicit";
    this.out.channelCount = 1;
    this.gainMid = this.ctx.createGain();
    this.gainSide = this.ctx.createGain();
    this.invertSide = this.ctx.createGain();
    this.gainMid.gain.value = 1;
    this.gainSide.gain.value = 1;
    this.invertSide.gain.value = -1;
    for (let i = 0; i < this.nCh; i++) {
      this.decFilterNodes[i] = this.ctx.createConvolver();
      this.decFilterNodes[i].normalize = false;
    }
    this.resetFilters();
    for (let i = 0; i < this.nCh; i++) {
      this.in.connect(this.decFilterNodes[i], i, 0);
      if (i % 2 === 0) {
        this.decFilterNodes[i].connect(this.gainMid);
      } else {
        this.decFilterNodes[i].connect(this.gainSide);
      }
    }
    this.gainMid.connect(this.out, 0, 0);
    this.gainSide.connect(this.out, 0, 0);
    this.gainMid.connect(this.out, 0, 1);
    this.gainSide.connect(this.invertSide, 0, 0);
    this.invertSide.connect(this.out, 0, 1);
    this.initialized = true;
  }
  updateFilters(audioBuffer) {
    for (let i = 0; i < this.nCh; i++) {
      this.decFilters[i] = this.ctx.createBuffer(
        1,
        audioBuffer.length,
        audioBuffer.sampleRate
      );
      this.decFilters[i].getChannelData(0).set(audioBuffer.getChannelData(i));
      this.decFilterNodes[i].buffer = this.decFilters[i];
    }
  }
  resetFilters() {
    const cardGains = new Array(this.nCh);
    cardGains.fill(0);
    cardGains[0] = 0.5;
    cardGains[1] = 0.5 / Math.sqrt(3);
    for (let i = 0; i < this.nCh; i++) {
      this.decFilters[i] = this.ctx.createBuffer(1, 64, this.ctx.sampleRate);
      for (let j = 0; j < 64; j++) {
        this.decFilters[i].getChannelData(0)[j] = 0;
      }
      this.decFilters[i].getChannelData(0)[0] = cardGains[i];
      this.decFilterNodes[i].buffer = this.decFilters[i];
    }
  }
}
class decoder {
  constructor(audioCtx, order) {
    this.ctx = audioCtx;
    this.order = order;
    this.nCh = getAmbisonicChannelCount(order);
    this.nSpk = 0;
    this._decodingMatrix = [];
    this._spkSphPosArray = [];
    this.in = this.ctx.createChannelSplitter(this.nCh);
    this.out = this.ctx.createChannelMerger(1);
    this._spkSphPosArray = this._getDefaultSpkConfig(this.order);
    this._updateDecodeMtx(this._spkSphPosArray);
  }
  // spkSphPosArray in spherical coordinates: [ [azim1, elev1, dist1], ... [azimN, elevN, distN] ]
  set speakerPos(spkSphPosArray) {
    if (spkSphPosArray === void 0) {
      spkSphPosArray = this._getDefaultSpkConfig(this.order);
    }
    this._spkSphPosArray = spkSphPosArray;
    this.out.disconnect();
    this._updateDecodeMtx(spkSphPosArray);
  }
  get speakerPos() {
    return this._spkSphPosArray;
  }
  // internal method to calculate Ambisonic decoding matrix and define new ambisonic gain nodes and values
  _updateDecodeMtx(spkSphPosArray) {
    this.nSpk = spkSphPosArray.length;
    this.out = this.ctx.createChannelMerger(this.nSpk);
    this._decodingMatrix = getAmbisonicDecMtx(spkSphPosArray, this.order);
    this.mtxGain = new Array(this.nCh);
    for (let i = 0; i < this.nCh; i++) {
      this.mtxGain[i] = new Array(this.nSpk);
      for (let j = 0; j < this.nSpk; j++) {
        const g = this.ctx.createGain();
        g.gain.value = this._decodingMatrix[j][i];
        this.in.connect(g, i, 0);
        g.connect(this.out, 0, j);
        this.mtxGain[i][j] = g;
      }
    }
  }
  // get default speaker configuration for orders 1, 2, 3
  _getDefaultSpkConfig(order) {
    let spkSphPosArray = [];
    switch (order) {
      case 1:
        spkSphPosArray = [
          [0, 0, 1],
          [90, 0, 1],
          [180, 0, 1],
          [270, 0, 1],
          [0, 90, 1],
          [0, -90, 1]
        ];
        break;
      case 2:
        spkSphPosArray = [
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
        spkSphPosArray = [
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
        console.error("unsupported default order:", order);
    }
    return spkSphPosArray;
  }
}
class convolver {
  constructor(audioCtx, order) {
    this.initialized = false;
    this.ctx = audioCtx;
    this.order = order;
    this.nCh = getAmbisonicChannelCount(order);
    this.encFilters = new Array(this.nCh);
    this.encFilterNodes = new Array(this.nCh);
    this.in = this.ctx.createGain();
    this.in.channelCountMode = "explicit";
    this.in.channelCount = 1;
    this.out = this.ctx.createChannelMerger(this.nCh);
    for (let i = 0; i < this.nCh; i++) {
      this.encFilterNodes[i] = this.ctx.createConvolver();
      this.encFilterNodes[i].normalize = false;
    }
    for (let i = 0; i < this.nCh; i++) {
      this.in.connect(this.encFilterNodes[i]);
      this.encFilterNodes[i].connect(this.out, 0, i);
    }
    this.initialized = true;
  }
  updateFilters(audioBuffer) {
    for (let i = 0; i < this.nCh; i++) {
      this.encFilters[i] = this.ctx.createBuffer(
        1,
        audioBuffer.length,
        audioBuffer.sampleRate
      );
      this.encFilters[i].getChannelData(0).set(audioBuffer.getChannelData(i));
      this.encFilterNodes[i].buffer = this.encFilters[i];
    }
  }
}
class virtualMic {
  constructor(audioCtx, order) {
    this.initialized = false;
    this.ctx = audioCtx;
    this.order = order;
    this.nCh = getAmbisonicChannelCount(order);
    this.azim = 0;
    this.elev = 0;
    this.vmicGains = new Array(this.nCh);
    this.vmicGainNodes = new Array(this.nCh);
    this.vmicCoeffs = new Array(this.order + 1);
    this.vmicPattern = "hypercardioid";
    this.in = this.ctx.createChannelSplitter(this.nCh);
    this.out = this.ctx.createGain();
    for (let i = 0; i < this.nCh; i++) {
      this.vmicGainNodes[i] = this.ctx.createGain();
    }
    this.SHxyz = new Array(this.nCh);
    this.SHxyz.fill(0);
    this.updatePattern();
    this.updateOrientation();
    for (let i = 0; i < this.nCh; i++) {
      this.in.connect(this.vmicGainNodes[i], i, 0);
      this.vmicGainNodes[i].connect(this.out);
    }
    this.initialized = true;
  }
  updatePattern() {
    switch (this.vmicPattern) {
      case "cardioid":
        this.vmicCoeffs = this.computeCardioidCoeffs(this.order);
        break;
      case "supercardioid":
        this.vmicCoeffs = this.computeSupercardCoeffs(this.order);
        break;
      case "hypercardioid":
        this.vmicCoeffs = this.computeHypercardCoeffs(this.order);
        break;
      case "max_rE":
        this.vmicCoeffs = this.computeMaxRECoeffs(this.order);
        break;
      default:
        this.vmicPattern = "hypercardioid";
        this.vmicCoeffs = this.computeHypercardCoeffs(this.order);
    }
    this.updateGains();
  }
  updateOrientation() {
    const azim = degreesToRadians(this.azim);
    const elev = degreesToRadians(this.elev);
    const tempSH = computeRealSH_1(this.order, [[azim, elev]]);
    for (let i = 0; i < this.nCh; i++) {
      this.SHxyz[i] = tempSH[i][0];
    }
    this.updateGains();
  }
  updateGains() {
    for (let n = 0; n <= this.order; n++) {
      for (let m = -n; m <= n; m++) {
        const q = n * n + n + m;
        this.vmicGains[q] = this.vmicCoeffs[n] * this.SHxyz[q];
      }
    }
    for (let i = 0; i < this.nCh; i++) {
      this.vmicGainNodes[i].gain.value = this.vmicGains[i];
    }
  }
  computeCardioidCoeffs(N) {
    const coeffs = new Array(N + 1);
    for (let n = 0; n <= N; n++) {
      coeffs[n] = factorial_1(N) * factorial_1(N) / (factorial_1(N + n + 1) * factorial_1(N - n));
    }
    return coeffs;
  }
  computeHypercardCoeffs(N) {
    const coeffs = new Array(N + 1);
    const nSH = (N + 1) * (N + 1);
    for (let n = 0; n <= N; n++) {
      coeffs[n] = 1 / nSH;
    }
    return coeffs;
  }
  computeSupercardCoeffs(N) {
    switch (N) {
      case 1:
        return [0.366, 0.2113];
      case 2:
        return [0.2362, 0.1562, 0.059];
      case 3:
        return [0.1768, 0.1281, 0.0633, 0.0175];
      case 4:
        return [0.1414, 0.1087, 0.0623, 0.0247, 54e-4];
      default:
        console.error("Orders should be in the range of 1-4 at the moment.");
        return [];
    }
  }
  computeMaxRECoeffs(N) {
    const coeffs = new Array(N + 1);
    coeffs[0] = 1;
    let leg_n_minus1 = 0;
    let leg_n_minus2 = 0;
    for (let n = 1; n < N + 1; n++) {
      const leg_n = recurseLegendrePoly_1(
        n,
        [Math.cos(2.406809 / (N + 1.51))],
        leg_n_minus1,
        leg_n_minus2
      );
      coeffs[n] = leg_n[0][0];
      leg_n_minus2 = leg_n_minus1;
      leg_n_minus1 = leg_n;
    }
    let norm = 0;
    for (let n = 0; n <= N; n++) {
      norm += coeffs[n] * (2 * n + 1);
    }
    for (let n = 0; n <= N; n++) {
      coeffs[n] = coeffs[n] / norm;
    }
    return coeffs;
  }
}
if (commonjsGlobal.AnalyserNode && !commonjsGlobal.AnalyserNode.prototype.getFloatTimeDomainData) {
  var uint8 = new Uint8Array(2048);
  commonjsGlobal.AnalyserNode.prototype.getFloatTimeDomainData = function(array) {
    this.getByteTimeDomainData(uint8);
    for (var i = 0, imax = array.length; i < imax; i++) {
      array[i] = (uint8[i] - 128) * 78125e-7;
    }
  };
}
class rmsAnalyser {
  constructor(audioCtx, order) {
    this.ctx = audioCtx;
    this.order = order;
    this.nCh = getAmbisonicChannelCount(order);
    this.fftSize = 2048;
    this.in = this.ctx.createChannelSplitter(this.nCh);
    this.out = this.ctx.createChannelMerger(this.nCh);
    this.analysers = new Array(this.nCh);
    this.analBuffers = new Array(this.nCh);
    for (let i = 0; i < this.nCh; i++) {
      this.analysers[i] = this.ctx.createAnalyser();
      this.analysers[i].fftSize = this.fftSize;
      this.analysers[i].smoothingTimeConstant = 0;
      this.analBuffers[i] = new Float32Array(this.fftSize);
      this.in.connect(this.analysers[i], i, 0);
      this.analysers[i].connect(this.out, 0, i);
    }
  }
  updateBuffers() {
    for (let i = 0; i < this.nCh; i++) {
      this.analysers[i].getFloatTimeDomainData(this.analBuffers[i]);
    }
  }
  computeRMS() {
    const rms_values = new Array(this.nCh);
    rms_values.fill(0);
    for (let i = 0; i < this.nCh; i++) {
      for (let n = 0; n < this.fftSize; n++) {
        rms_values[i] = rms_values[i] + this.analBuffers[i][n] * this.analBuffers[i][n];
      }
      rms_values[i] = Math.sqrt(rms_values[i] / this.fftSize);
    }
    return rms_values;
  }
}
class powermapAnalyser {
  constructor(audioCtx, order, mode) {
    this.ctx = audioCtx;
    this.order = order;
    this.nCh = getAmbisonicChannelCount(order);
    this.fftSize = 2048;
    this.analysers = new Array(this.nCh);
    this.analBuffers = new Array(this.nCh);
    this.in = this.ctx.createChannelSplitter(this.nCh);
    this.out = this.ctx.createChannelMerger(this.nCh);
    for (let i = 0; i < this.nCh; i++) {
      this.analysers[i] = this.ctx.createAnalyser();
      this.analysers[i].fftSize = this.fftSize;
      this.analysers[i].smoothingTimeConstant = 0;
      this.analBuffers[i] = new Float32Array(this.fftSize);
    }
    for (let i = 0; i < this.nCh; i++) {
      this.in.connect(this.out, i, i);
      this.in.connect(this.analysers[i], i, 0);
    }
    const td_dirs_deg = getTdesign(4 * order);
    this.td_dirs_rad = deg2rad(td_dirs_deg);
    this.SHmtx = computeRealSH_1(this.order, this.td_dirs_rad);
    this.mode = mode;
  }
  updateBuffers() {
    for (let i = 0; i < this.nCh; i++) {
      this.analysers[i].getFloatTimeDomainData(this.analBuffers[i]);
    }
  }
  computePowermap() {
    const nDirs = this.td_dirs_rad.length;
    const data = numeric$2.dot(
      numeric$2.transpose(this.SHmtx),
      this.analBuffers
    );
    const powerValues = new Array(nDirs);
    for (let i = 0; i < nDirs; i++) {
      let tmp_pwr = 0;
      for (let n = 0; n < this.fftSize; n++) {
        tmp_pwr = tmp_pwr + data[i][n] * data[i][n];
      }
      tmp_pwr = tmp_pwr / this.fftSize;
      powerValues[i] = [
        this.td_dirs_rad[i][0],
        this.td_dirs_rad[i][1],
        tmp_pwr
      ];
    }
    if (this.mode === 0) {
      return powerValues;
    } else {
      const powerCoeffs = forwardSHT_1(
        2 * this.order,
        powerValues,
        1,
        0
      );
      return powerCoeffs;
    }
  }
}
class intensityAnalyser {
  constructor(audioCtx) {
    this.ctx = audioCtx;
    this.fftSize = 2048;
    this.in = this.ctx.createChannelSplitter(4);
    this.out = this.ctx.createChannelMerger(4);
    this.gains = new Array(3);
    for (let i = 0; i < 3; i++) {
      this.gains[i] = this.ctx.createGain();
      this.gains[i].gain.value = 1 / Math.sqrt(3);
    }
    this.analysers = new Array(4);
    this.analBuffers = new Array(4);
    for (let i = 0; i < 4; i++) {
      this.analysers[i] = this.ctx.createAnalyser();
      this.analysers[i].fftSize = this.fftSize;
      this.analysers[i].smoothingTimeConstant = 0;
      this.analBuffers[i] = new Float32Array(this.fftSize);
    }
    this.in.connect(this.out, 0, 0);
    this.in.connect(this.analysers[0], 0, 0);
    this.in.connect(this.gains[1], 1, 0);
    this.in.connect(this.gains[2], 2, 0);
    this.in.connect(this.gains[0], 3, 0);
    for (let i = 0; i < 3; i++) {
      this.gains[i].connect(this.analysers[i + 1], 0, 0);
      this.gains[i].connect(this.out, 0, i + 1);
    }
  }
  updateBuffers() {
    for (let i = 0; i < 4; i++) {
      this.analysers[i].getFloatTimeDomainData(this.analBuffers[i]);
    }
  }
  computeIntensity() {
    let iX = 0;
    let iY = 0;
    let iZ = 0;
    let WW = 0;
    let XX = 0;
    let YY = 0;
    let ZZ = 0;
    for (let i = 0; i < this.fftSize; i++) {
      iX = iX + this.analBuffers[0][i] * this.analBuffers[1][i];
      iY = iY + this.analBuffers[0][i] * this.analBuffers[2][i];
      iZ = iZ + this.analBuffers[0][i] * this.analBuffers[3][i];
      WW = WW + this.analBuffers[0][i] * this.analBuffers[0][i];
      XX = XX + this.analBuffers[1][i] * this.analBuffers[1][i];
      YY = YY + this.analBuffers[2][i] * this.analBuffers[2][i];
      ZZ = ZZ + this.analBuffers[3][i] * this.analBuffers[3][i];
    }
    const I = [iX, iY, iZ];
    const I_norm = Math.sqrt(I[0] * I[0] + I[1] * I[1] + I[2] * I[2]);
    const E = (WW + XX + YY + ZZ) / 2;
    const Psi = 1 - I_norm / (E + 1e-7);
    const azim = radiansToDegrees(Math.atan2(iY, iX));
    const elev = radiansToDegrees(
      Math.atan2(I[2], Math.sqrt(I[0] * I[0] + I[1] * I[1]))
    );
    return [azim, elev, Psi, E];
  }
}
class intensityAnalyser2D {
  constructor(audioCtx) {
    this.ctx = audioCtx;
    this.fftSize = 2048;
    this.in = this.ctx.createChannelSplitter(3);
    this.out = this.ctx.createChannelMerger(3);
    this.gains = new Array(2);
    for (let i = 0; i < 2; i++) {
      this.gains[i] = this.ctx.createGain();
      this.gains[i].gain.value = 1 / Math.sqrt(3);
    }
    this.analysers = new Array(3);
    this.analBuffers = new Array(3);
    for (let i = 0; i < 3; i++) {
      this.analysers[i] = this.ctx.createAnalyser();
      this.analysers[i].fftSize = this.fftSize;
      this.analysers[i].smoothingTimeConstant = 0;
      this.analBuffers[i] = new Float32Array(this.fftSize);
    }
    this.in.connect(this.out, 0, 0);
    this.in.connect(this.analysers[0], 0, 0);
    this.in.connect(this.gains[1], 1, 0);
    this.in.connect(this.gains[0], 2, 0);
    for (let i = 0; i < 2; i++) {
      this.gains[i].connect(this.analysers[i + 1], 0, 0);
      this.gains[i].connect(this.out, 0, i + 1);
    }
  }
  updateBuffers() {
    for (let i = 0; i < 3; i++) {
      this.analysers[i].getFloatTimeDomainData(this.analBuffers[i]);
    }
  }
  computeIntensity() {
    let iX = 0;
    let iY = 0;
    let WW = 0;
    let XX = 0;
    let YY = 0;
    for (let i = 0; i < this.fftSize; i++) {
      iX = iX + this.analBuffers[0][i] * this.analBuffers[1][i];
      iY = iY + this.analBuffers[0][i] * this.analBuffers[2][i];
      WW = WW + this.analBuffers[0][i] * this.analBuffers[0][i];
      XX = XX + this.analBuffers[1][i] * this.analBuffers[1][i];
      YY = YY + this.analBuffers[2][i] * this.analBuffers[2][i];
    }
    const I = [iX, iY];
    const I_norm = Math.sqrt(I[0] * I[0] + I[1] * I[1]);
    const E = (WW + XX + YY) / 2;
    const Psi = 1 - I_norm / (E + 1e-7);
    const azim = -radiansToDegrees(Math.atan2(iY, iX));
    const elev = 0;
    return [azim, elev, Psi, E];
  }
}
function pad(num, size) {
  return ("000000000" + num).substr(-2);
}
class HOAloader {
  constructor(context, order, url, callback) {
    this.context = context;
    this.order = order;
    this.nCh = getAmbisonicChannelCount(order);
    this.nChGroups = Math.ceil(this.nCh / 8);
    this.buffers = new Array();
    this.loadCount = 0;
    this.loaded = false;
    this.onLoad = callback;
    this.urls = new Array(this.nChGroups);
    this.concatBuffer = null;
    const fileExt = url.slice(url.length - 3, url.length);
    this.fileExt = fileExt;
    for (let i = 0; i < this.nChGroups; i++) {
      if (i === this.nChGroups - 1) {
        this.urls[i] = url.slice(0, url.length - 4) + "_" + pad(i * 8 + 1) + "-" + pad(this.nCh) + "ch." + fileExt;
      } else {
        this.urls[i] = url.slice(0, url.length - 4) + "_" + pad(i * 8 + 1) + "-" + pad(i * 8 + 8) + "ch." + fileExt;
      }
    }
  }
  loadBuffers(url, index) {
    const request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";
    const scope = this;
    request.onload = function() {
      scope.context.decodeAudioData(
        request.response,
        function(buffer) {
          if (!buffer) {
            alert("error decoding file data: " + url);
            return;
          }
          scope.buffers[index] = buffer;
          scope.loadCount++;
          if (scope.loadCount === scope.nChGroups) {
            scope.loaded = true;
            scope.concatBuffers();
            console.log("HOAloader: all buffers loaded and concatenated");
            scope.onLoad(scope.concatBuffer);
          }
        },
        function(error) {
          alert(
            "Browser cannot decode audio data:  " + url + "\n\nError: " + error + "\n\n(If you re using Safari and get a null error, this is most likely due to Apple's shady plan going on to stop the .ogg format from easing web developer's life :)"
          );
        }
      );
    };
    request.onerror = function() {
      alert("HOAloader: XHR error");
    };
    request.send();
  }
  load() {
    for (let i = 0; i < this.nChGroups; ++i) this.loadBuffers(this.urls[i], i);
  }
  concatBuffers() {
    if (!this.loaded) return;
    const nCh = this.nCh;
    const nChGroups = this.nChGroups;
    let length = this.buffers[0].length;
    this.buffers.forEach((b) => {
      length = Math.max(length, b.length);
    });
    const srate = this.buffers[0].sampleRate;
    let remap8ChanFile = [1, 2, 3, 4, 5, 6, 7, 8];
    if (this.fileExt.toLowerCase() === "ogg") {
      console.log(
        "Loading of 8chan OGG files [Chrome/Firefox]: remap channels to correct order!"
      );
      remap8ChanFile = [1, 3, 2, 7, 8, 5, 6, 4];
    }
    this.concatBuffer = this.context.createBuffer(nCh, length, srate);
    for (let i = 0; i < nChGroups; i++) {
      for (let j = 0; j < this.buffers[i].numberOfChannels; j++) {
        this.concatBuffer.getChannelData(i * 8 + j).set(this.buffers[i].getChannelData(remap8ChanFile[j] - 1));
      }
    }
  }
}
class HRIRloader_local {
  constructor(context, order, callback) {
    this.context = context;
    this.order = order;
    this.nCh = getAmbisonicChannelCount(order);
    this.onLoad = callback;
    this.vls_dirs_deg = getTdesign(2 * this.order);
    this.nVLS = this.vls_dirs_deg.length;
    this.nearestLookupRes = [5, 5];
    this.fs = 0;
    this.nSamples = 0;
    this.hrir_dirs_deg = [];
    this.hrirs = [];
    this.nearestLookup = [];
    this.nearest_dirs_deg = [];
    this.vls_hrirs = [];
    this.decodingMatrix = [];
    this.hoaBuffer = null;
  }
  load(setUrl) {
    const self2 = this;
    const requestHrir = new XMLHttpRequest();
    requestHrir.open("GET", setUrl, true);
    requestHrir.responseType = "json";
    requestHrir.onload = function() {
      self2.parseHrirFromJSON(requestHrir.response);
      self2.nearestLookup = createNearestLookup(
        self2.hrir_dirs_deg,
        self2.nearestLookupRes
      );
      const nearestIdx = findNearest(
        self2.vls_dirs_deg,
        self2.nearestLookup,
        self2.nearestLookupRes
      );
      self2.nearest_dirs_deg = self2.getClosestDirs(nearestIdx, self2.hrir_dirs_deg);
      self2.vls_hrirs = self2.getClosestHrirFilters(nearestIdx, self2.hrirs);
      self2.computeDecFilters();
    };
    requestHrir.send();
  }
  parseHrirFromJSON(hrirSet) {
    const self2 = this;
    this.fs = hrirSet.leaves[6].data[0];
    this.nSamples = hrirSet.leaves[8].data[0][1].length;
    this.hrir_dirs_deg = [];
    hrirSet.leaves[4].data.forEach(function(element) {
      self2.hrir_dirs_deg.push([element[0], element[1]]);
    });
    this.hrirs = [];
    hrirSet.leaves[8].data.forEach(function(element) {
      const left = new Float64Array(element[0]);
      const right = new Float64Array(element[1]);
      self2.hrirs.push([left, right]);
    });
  }
  getClosestDirs(nearestIdx, hrir_dirs_deg) {
    const nDirs = nearestIdx.length;
    const nearest_dirs_deg = [];
    for (let i = 0; i < nDirs; i++) {
      nearest_dirs_deg.push(hrir_dirs_deg[nearestIdx[i]]);
    }
    return nearest_dirs_deg;
  }
  getClosestHrirFilters(nearestIdx, hrirs) {
    const nDirs = nearestIdx.length;
    const nearest_hrirs = [];
    for (let i = 0; i < nDirs; i++) {
      nearest_hrirs.push(hrirs[nearestIdx[i]]);
    }
    return nearest_hrirs;
  }
  computeDecFilters() {
    this.decodingMatrix = getAmbisonicDecMtx(
      this.nearest_dirs_deg,
      this.order
    );
    this.hoaBuffer = this.getHoaFilterFromHrirFilter(
      this.nCh,
      this.nSamples,
      this.fs,
      this.vls_hrirs,
      this.decodingMatrix
    );
    this.onLoad(this.hoaBuffer);
  }
  getHoaFilterFromHrirFilter(nCh, nSamples, sampleRate, hrirs, decodingMatrix) {
    if (nSamples > hrirs[0][0].length) nSamples = hrirs[0][0].length;
    const hoaBuffer = this.context.createBuffer(nCh, nSamples, sampleRate);
    for (let i = 0; i < nCh; i++) {
      const concatBufferArrayLeft = new Float32Array(nSamples);
      for (let j = 0; j < hrirs.length; j++) {
        for (let k2 = 0; k2 < nSamples; k2++) {
          concatBufferArrayLeft[k2] += decodingMatrix[j][i] * hrirs[j][0][k2];
        }
      }
      hoaBuffer.getChannelData(i).set(concatBufferArrayLeft);
    }
    return hoaBuffer;
  }
}
class HRIRloader2D_local {
  constructor(context, order, callback) {
    this.context = context;
    this.order = order;
    this.nCh = getAmbisonicChannelCount2D(order);
    this.onLoad = callback;
    this.vls_dirs_deg = sampleCircle(2 * this.order + 2);
    this.nVLS = this.vls_dirs_deg.length;
    this.nearestLookupRes = [5, 5];
    this.fs = 0;
    this.nSamples = 0;
    this.hrir_dirs_deg = [];
    this.hrirs = [];
    this.nearestLookup = [];
    this.vls_hrirs = [];
    this.decodingMatrix = [];
    this.hoaBuffer = null;
  }
  load(setUrl) {
    const self2 = this;
    const requestHrir = new XMLHttpRequest();
    requestHrir.open("GET", setUrl, true);
    requestHrir.responseType = "json";
    requestHrir.onload = function() {
      self2.parseHrirFromJSON(requestHrir.response);
      self2.nearestLookup = createNearestLookup(
        self2.hrir_dirs_deg,
        self2.nearestLookupRes
      );
      const nearestIdx = findNearest(
        self2.vls_dirs_deg,
        self2.nearestLookup,
        self2.nearestLookupRes
      );
      self2.getClosestDirs(nearestIdx, self2.hrir_dirs_deg);
      self2.vls_hrirs = self2.getClosestHrirFilters(nearestIdx, self2.hrirs);
      self2.computeDecFilters();
    };
    requestHrir.send();
  }
  parseHrirFromJSON(hrirSet) {
    const self2 = this;
    this.fs = hrirSet.leaves[6].data[0];
    this.nSamples = hrirSet.leaves[8].data[0][1].length;
    this.hrir_dirs_deg = [];
    hrirSet.leaves[4].data.forEach(function(element) {
      self2.hrir_dirs_deg.push([element[0], element[1]]);
    });
    this.hrirs = [];
    hrirSet.leaves[8].data.forEach(function(element) {
      const left = new Float64Array(element[0]);
      const right = new Float64Array(element[1]);
      self2.hrirs.push([left, right]);
    });
  }
  getClosestDirs(nearestIdx, hrir_dirs_deg) {
    const nDirs = nearestIdx.length;
    const nearest_dirs_deg = [];
    for (let i = 0; i < nDirs; i++) {
      nearest_dirs_deg.push(hrir_dirs_deg[nearestIdx[i]]);
    }
    return nearest_dirs_deg;
  }
  getClosestHrirFilters(nearestIdx, hrirs) {
    const nDirs = nearestIdx.length;
    const nearest_hrirs = [];
    for (let i = 0; i < nDirs; i++) {
      nearest_hrirs.push(hrirs[nearestIdx[i]]);
    }
    return nearest_hrirs;
  }
  computeDecFilters() {
    const a_n = [];
    a_n.push(1);
    for (let i = 1; i < this.order + 1; i++) {
      a_n.push(Math.cos(i * Math.PI / (2 * this.order + 2)));
      a_n.push(Math.cos(i * Math.PI / (2 * this.order + 2)));
    }
    const diagA = numeric$2.diag(a_n);
    this.decodingMatrix = numeric$2.transpose(
      getCircHarmonics(
        this.order,
        getColumn(this.vls_dirs_deg, 0)
      )
    );
    this.decodingMatrix = numeric$2.dot(
      this.decodingMatrix,
      diagA
    );
    this.decodingMatrix = numeric$2.mul(
      2 * Math.PI / this.vls_dirs_deg.length,
      this.decodingMatrix
    );
    this.hoaBuffer = this.getHoaFilterFromHrirFilter(
      this.nCh,
      this.nSamples,
      this.fs,
      this.vls_hrirs,
      this.decodingMatrix
    );
    this.onLoad(this.hoaBuffer);
  }
  getHoaFilterFromHrirFilter(nCh, nSamples, sampleRate, hrirs, decodingMatrix) {
    if (nSamples > hrirs[0][0].length) nSamples = hrirs[0][0].length;
    const hoaBuffer = this.context.createBuffer(nCh, nSamples, sampleRate);
    for (let i = 0; i < nCh; i++) {
      const concatBufferArrayLeft = new Float32Array(nSamples);
      for (let j = 0; j < hrirs.length; j++) {
        for (let k2 = 0; k2 < nSamples; k2++) {
          concatBufferArrayLeft[k2] += decodingMatrix[j][i] * hrirs[j][0][k2];
        }
      }
      hoaBuffer.getChannelData(i).set(concatBufferArrayLeft);
    }
    return hoaBuffer;
  }
}
function commonjsRequire(path) {
  throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var serveSofaHrir = { exports: {} };
(function(module2, exports$12) {
  (function(f) {
    {
      module2.exports = f();
    }
  })(function() {
    return function e(t, n, r) {
      function s(o2, u) {
        if (!n[o2]) {
          if (!t[o2]) {
            var a = typeof commonjsRequire == "function" && commonjsRequire;
            if (!u && a) return a(o2, true);
            if (i) return i(o2, true);
            var f = new Error("Cannot find module '" + o2 + "'");
            throw f.code = "MODULE_NOT_FOUND", f;
          }
          var l = n[o2] = { exports: {} };
          t[o2][0].call(l.exports, function(e2) {
            var n2 = t[o2][1][e2];
            return s(n2 ? n2 : e2);
          }, l, l.exports, e, t, n, r);
        }
        return n[o2].exports;
      }
      var i = typeof commonjsRequire == "function" && commonjsRequire;
      for (var o = 0; o < r.length; o++) s(r[o]);
      return s;
    }({ 1: [function(require2, module3, exports$13) {
      module3.exports = { "default": require2("core-js/library/fn/object/define-property"), __esModule: true };
    }, { "core-js/library/fn/object/define-property": 4 }], 2: [function(require2, module3, exports$13) {
      exports$13["default"] = function(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      };
      exports$13.__esModule = true;
    }, {}], 3: [function(require2, module3, exports$13) {
      var _Object$defineProperty = require2("babel-runtime/core-js/object/define-property")["default"];
      exports$13["default"] = /* @__PURE__ */ function() {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            _Object$defineProperty(target, descriptor.key, descriptor);
          }
        }
        return function(Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();
      exports$13.__esModule = true;
    }, { "babel-runtime/core-js/object/define-property": 1 }], 4: [function(require2, module3, exports$13) {
      var $ = require2("../../modules/$");
      module3.exports = function defineProperty(it, key, desc) {
        return $.setDesc(it, key, desc);
      };
    }, { "../../modules/$": 5 }], 5: [function(require2, module3, exports$13) {
      var $Object = Object;
      module3.exports = {
        create: $Object.create,
        getProto: $Object.getPrototypeOf,
        isEnum: {}.propertyIsEnumerable,
        getDesc: $Object.getOwnPropertyDescriptor,
        setDesc: $Object.defineProperty,
        setDescs: $Object.defineProperties,
        getKeys: $Object.keys,
        getNames: $Object.getOwnPropertyNames,
        getSymbols: $Object.getOwnPropertySymbols,
        each: [].forEach
      };
    }, {}], 6: [function(require2, module3, exports$13) {
      var _createClass = require2("babel-runtime/helpers/create-class")["default"];
      var _classCallCheck = require2("babel-runtime/helpers/class-call-check")["default"];
      Object.defineProperty(exports$13, "__esModule", {
        value: true
      });
      var FractionalDelay = function() {
        function FractionalDelay2(sampleRate, optMaxDelayTime) {
          _classCallCheck(this, FractionalDelay2);
          this.delayTime = 0;
          this.posRead = 0;
          this.posWrite = 0;
          this.fracXi1 = 0;
          this.fracYi1 = 0;
          this.intDelay = 0;
          this.fracDelay = 0;
          this.a1 = void 0;
          this.sampleRate = sampleRate;
          this.maxDelayTime = optMaxDelayTime || 1;
          this.bufferSize = this.maxDelayTime * this.sampleRate;
          if (this.bufferSize % 1 !== 0) {
            this.bufferSize = parseInt(this.bufferSize) + 1;
          }
          this.buffer = new Float32Array(this.bufferSize);
        }
        _createClass(FractionalDelay2, [{
          key: "setDelay",
          value: function setDelay(delayTime) {
            if (delayTime < this.maxDelayTime) {
              this.delayTime = delayTime;
              var samplesDelay = delayTime * this.sampleRate;
              this.intDelay = parseInt(samplesDelay);
              this.fracDelay = samplesDelay - this.intDelay;
              this.resample();
              if (this.fracDelay !== 0) {
                this.updateThiranCoefficient();
              }
            } else {
              throw new Error("delayTime > maxDelayTime");
            }
          }
          /**
           * Update delay value
           * @public
           */
        }, {
          key: "getDelay",
          value: function getDelay() {
            return this.delayTime;
          }
          /**
           * Process method, where the output is calculated.
           * @param inputBuffer Input Array
           * @public
           */
        }, {
          key: "process",
          value: function process(inputBuffer) {
            var outputBuffer = new Float32Array(inputBuffer.length);
            for (var i = 0; i < inputBuffer.length; i = i + 1) {
              this.buffer[this.posWrite] = inputBuffer[i];
              outputBuffer[i] = this.buffer[this.posRead];
              this.updatePointers();
            }
            if (this.fracDelay === 0) {
              return outputBuffer;
            } else {
              outputBuffer = new Float32Array(this.fractionalThiranProcess(outputBuffer));
              return outputBuffer;
            }
          }
          /**
           * Update the value of posRead and posWrite pointers inside the circular buffer
           * @private
           */
        }, {
          key: "updatePointers",
          value: function updatePointers() {
            if (this.posWrite === this.buffer.length - 1) {
              this.posWrite = 0;
            } else {
              this.posWrite = this.posWrite + 1;
            }
            if (this.posRead === this.buffer.length - 1) {
              this.posRead = 0;
            } else {
              this.posRead = this.posRead + 1;
            }
          }
          /**
           * Update Thiran coefficient (1st order Thiran)
           * @private
           */
        }, {
          key: "updateThiranCoefficient",
          value: function updateThiranCoefficient() {
            this.a1 = (1 - this.fracDelay) / (1 + this.fracDelay);
          }
          /**
           * Update the pointer posRead value when the delay value is changed
           * @private
           */
        }, {
          key: "resample",
          value: function resample() {
            if (this.posWrite - this.intDelay < 0) {
              var pos = this.intDelay - this.posWrite;
              this.posRead = this.buffer.length - pos;
            } else {
              this.posRead = this.posWrite - this.intDelay;
            }
          }
          /**
           * Fractional process method.
           * @private
           * @param inputBuffer Input Array
           */
        }, {
          key: "fractionalThiranProcess",
          value: function fractionalThiranProcess(inputBuffer) {
            var outputBuffer = new Float32Array(inputBuffer.length);
            var x, y;
            var xi1 = this.fracXi1;
            var yi1 = this.fracYi1;
            for (var i = 0; i < inputBuffer.length; i = i + 1) {
              x = inputBuffer[i];
              y = this.a1 * x + xi1 - this.a1 * yi1;
              xi1 = x;
              yi1 = y;
              outputBuffer[i] = y;
            }
            this.fracXi1 = xi1;
            this.fracYi1 = yi1;
            return outputBuffer;
          }
        }]);
        return FractionalDelay2;
      }();
      exports$13["default"] = FractionalDelay;
      module3.exports = exports$13["default"];
    }, { "babel-runtime/helpers/class-call-check": 2, "babel-runtime/helpers/create-class": 3 }], 7: [function(require2, module3, exports$13) {
      module3.exports = require2("./dist/fractional-delay");
    }, { "./dist/fractional-delay": 6 }], 8: [function(require2, module3, exports$13) {
      (function webpackUniversalModuleDefinition(root, factory) {
        if (typeof exports$13 === "object" && typeof module3 === "object")
          module3.exports = factory();
        else {
          var a = factory();
          for (var i in a) (typeof exports$13 === "object" ? exports$13 : root)[i] = a[i];
        }
      })(this, function() {
        return (
          /******/
          function(modules) {
            var installedModules = {};
            function __webpack_require__(moduleId) {
              if (installedModules[moduleId]) {
                return installedModules[moduleId].exports;
              }
              var module4 = installedModules[moduleId] = {
                /******/
                i: moduleId,
                /******/
                l: false,
                /******/
                exports: {}
                /******/
              };
              modules[moduleId].call(module4.exports, module4, module4.exports, __webpack_require__);
              module4.l = true;
              return module4.exports;
            }
            __webpack_require__.m = modules;
            __webpack_require__.c = installedModules;
            __webpack_require__.d = function(exports$14, name, getter) {
              if (!__webpack_require__.o(exports$14, name)) {
                Object.defineProperty(exports$14, name, {
                  /******/
                  configurable: false,
                  /******/
                  enumerable: true,
                  /******/
                  get: getter
                  /******/
                });
              }
            };
            __webpack_require__.n = function(module4) {
              var getter = module4 && module4.__esModule ? (
                /******/
                function getDefault() {
                  return module4["default"];
                }
              ) : (
                /******/
                function getModuleExports() {
                  return module4;
                }
              );
              __webpack_require__.d(getter, "a", getter);
              return getter;
            };
            __webpack_require__.o = function(object, property) {
              return Object.prototype.hasOwnProperty.call(object, property);
            };
            __webpack_require__.p = "";
            return __webpack_require__(__webpack_require__.s = 4);
          }([
            /* 0 */
            /***/
            function(module4, exports$14, __webpack_require__) {
              Object.defineProperty(exports$14, "__esModule", {
                value: true
              });
              exports$14.setMatrixArrayType = setMatrixArrayType;
              exports$14.toRadian = toRadian;
              exports$14.equals = equals;
              var EPSILON = exports$14.EPSILON = 1e-6;
              exports$14.ARRAY_TYPE = typeof Float32Array !== "undefined" ? Float32Array : Array;
              exports$14.RANDOM = Math.random;
              function setMatrixArrayType(type) {
                exports$14.ARRAY_TYPE = type;
              }
              var degree = Math.PI / 180;
              function toRadian(a) {
                return a * degree;
              }
              function equals(a, b) {
                return Math.abs(a - b) <= EPSILON * Math.max(1, Math.abs(a), Math.abs(b));
              }
            },
            /* 1 */
            /***/
            function(module4, exports$14, __webpack_require__) {
              Object.defineProperty(exports$14, "__esModule", {
                value: true
              });
              exports$14.sub = exports$14.mul = void 0;
              exports$14.create = create;
              exports$14.fromMat4 = fromMat4;
              exports$14.clone = clone;
              exports$14.copy = copy;
              exports$14.fromValues = fromValues;
              exports$14.set = set;
              exports$14.identity = identity;
              exports$14.transpose = transpose;
              exports$14.invert = invert;
              exports$14.adjoint = adjoint;
              exports$14.determinant = determinant;
              exports$14.multiply = multiply;
              exports$14.translate = translate;
              exports$14.rotate = rotate;
              exports$14.scale = scale;
              exports$14.fromTranslation = fromTranslation;
              exports$14.fromRotation = fromRotation;
              exports$14.fromScaling = fromScaling;
              exports$14.fromMat2d = fromMat2d;
              exports$14.fromQuat = fromQuat;
              exports$14.normalFromMat4 = normalFromMat4;
              exports$14.projection = projection;
              exports$14.str = str;
              exports$14.frob = frob;
              exports$14.add = add;
              exports$14.subtract = subtract;
              exports$14.multiplyScalar = multiplyScalar;
              exports$14.multiplyScalarAndAdd = multiplyScalarAndAdd;
              exports$14.exactEquals = exactEquals;
              exports$14.equals = equals;
              var _common = __webpack_require__(0);
              var glMatrix = _interopRequireWildcard(_common);
              function _interopRequireWildcard(obj) {
                if (obj && obj.__esModule) {
                  return obj;
                } else {
                  var newObj = {};
                  if (obj != null) {
                    for (var key in obj) {
                      if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                    }
                  }
                  newObj.default = obj;
                  return newObj;
                }
              }
              function create() {
                var out = new glMatrix.ARRAY_TYPE(9);
                out[0] = 1;
                out[1] = 0;
                out[2] = 0;
                out[3] = 0;
                out[4] = 1;
                out[5] = 0;
                out[6] = 0;
                out[7] = 0;
                out[8] = 1;
                return out;
              }
              function fromMat4(out, a) {
                out[0] = a[0];
                out[1] = a[1];
                out[2] = a[2];
                out[3] = a[4];
                out[4] = a[5];
                out[5] = a[6];
                out[6] = a[8];
                out[7] = a[9];
                out[8] = a[10];
                return out;
              }
              function clone(a) {
                var out = new glMatrix.ARRAY_TYPE(9);
                out[0] = a[0];
                out[1] = a[1];
                out[2] = a[2];
                out[3] = a[3];
                out[4] = a[4];
                out[5] = a[5];
                out[6] = a[6];
                out[7] = a[7];
                out[8] = a[8];
                return out;
              }
              function copy(out, a) {
                out[0] = a[0];
                out[1] = a[1];
                out[2] = a[2];
                out[3] = a[3];
                out[4] = a[4];
                out[5] = a[5];
                out[6] = a[6];
                out[7] = a[7];
                out[8] = a[8];
                return out;
              }
              function fromValues(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
                var out = new glMatrix.ARRAY_TYPE(9);
                out[0] = m00;
                out[1] = m01;
                out[2] = m02;
                out[3] = m10;
                out[4] = m11;
                out[5] = m12;
                out[6] = m20;
                out[7] = m21;
                out[8] = m22;
                return out;
              }
              function set(out, m00, m01, m02, m10, m11, m12, m20, m21, m22) {
                out[0] = m00;
                out[1] = m01;
                out[2] = m02;
                out[3] = m10;
                out[4] = m11;
                out[5] = m12;
                out[6] = m20;
                out[7] = m21;
                out[8] = m22;
                return out;
              }
              function identity(out) {
                out[0] = 1;
                out[1] = 0;
                out[2] = 0;
                out[3] = 0;
                out[4] = 1;
                out[5] = 0;
                out[6] = 0;
                out[7] = 0;
                out[8] = 1;
                return out;
              }
              function transpose(out, a) {
                if (out === a) {
                  var a01 = a[1], a02 = a[2], a12 = a[5];
                  out[1] = a[3];
                  out[2] = a[6];
                  out[3] = a01;
                  out[5] = a[7];
                  out[6] = a02;
                  out[7] = a12;
                } else {
                  out[0] = a[0];
                  out[1] = a[3];
                  out[2] = a[6];
                  out[3] = a[1];
                  out[4] = a[4];
                  out[5] = a[7];
                  out[6] = a[2];
                  out[7] = a[5];
                  out[8] = a[8];
                }
                return out;
              }
              function invert(out, a) {
                var a00 = a[0], a01 = a[1], a02 = a[2];
                var a10 = a[3], a11 = a[4], a12 = a[5];
                var a20 = a[6], a21 = a[7], a22 = a[8];
                var b01 = a22 * a11 - a12 * a21;
                var b11 = -a22 * a10 + a12 * a20;
                var b21 = a21 * a10 - a11 * a20;
                var det = a00 * b01 + a01 * b11 + a02 * b21;
                if (!det) {
                  return null;
                }
                det = 1 / det;
                out[0] = b01 * det;
                out[1] = (-a22 * a01 + a02 * a21) * det;
                out[2] = (a12 * a01 - a02 * a11) * det;
                out[3] = b11 * det;
                out[4] = (a22 * a00 - a02 * a20) * det;
                out[5] = (-a12 * a00 + a02 * a10) * det;
                out[6] = b21 * det;
                out[7] = (-a21 * a00 + a01 * a20) * det;
                out[8] = (a11 * a00 - a01 * a10) * det;
                return out;
              }
              function adjoint(out, a) {
                var a00 = a[0], a01 = a[1], a02 = a[2];
                var a10 = a[3], a11 = a[4], a12 = a[5];
                var a20 = a[6], a21 = a[7], a22 = a[8];
                out[0] = a11 * a22 - a12 * a21;
                out[1] = a02 * a21 - a01 * a22;
                out[2] = a01 * a12 - a02 * a11;
                out[3] = a12 * a20 - a10 * a22;
                out[4] = a00 * a22 - a02 * a20;
                out[5] = a02 * a10 - a00 * a12;
                out[6] = a10 * a21 - a11 * a20;
                out[7] = a01 * a20 - a00 * a21;
                out[8] = a00 * a11 - a01 * a10;
                return out;
              }
              function determinant(a) {
                var a00 = a[0], a01 = a[1], a02 = a[2];
                var a10 = a[3], a11 = a[4], a12 = a[5];
                var a20 = a[6], a21 = a[7], a22 = a[8];
                return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
              }
              function multiply(out, a, b) {
                var a00 = a[0], a01 = a[1], a02 = a[2];
                var a10 = a[3], a11 = a[4], a12 = a[5];
                var a20 = a[6], a21 = a[7], a22 = a[8];
                var b00 = b[0], b01 = b[1], b02 = b[2];
                var b10 = b[3], b11 = b[4], b12 = b[5];
                var b20 = b[6], b21 = b[7], b22 = b[8];
                out[0] = b00 * a00 + b01 * a10 + b02 * a20;
                out[1] = b00 * a01 + b01 * a11 + b02 * a21;
                out[2] = b00 * a02 + b01 * a12 + b02 * a22;
                out[3] = b10 * a00 + b11 * a10 + b12 * a20;
                out[4] = b10 * a01 + b11 * a11 + b12 * a21;
                out[5] = b10 * a02 + b11 * a12 + b12 * a22;
                out[6] = b20 * a00 + b21 * a10 + b22 * a20;
                out[7] = b20 * a01 + b21 * a11 + b22 * a21;
                out[8] = b20 * a02 + b21 * a12 + b22 * a22;
                return out;
              }
              function translate(out, a, v) {
                var a00 = a[0], a01 = a[1], a02 = a[2], a10 = a[3], a11 = a[4], a12 = a[5], a20 = a[6], a21 = a[7], a22 = a[8], x = v[0], y = v[1];
                out[0] = a00;
                out[1] = a01;
                out[2] = a02;
                out[3] = a10;
                out[4] = a11;
                out[5] = a12;
                out[6] = x * a00 + y * a10 + a20;
                out[7] = x * a01 + y * a11 + a21;
                out[8] = x * a02 + y * a12 + a22;
                return out;
              }
              function rotate(out, a, rad) {
                var a00 = a[0], a01 = a[1], a02 = a[2], a10 = a[3], a11 = a[4], a12 = a[5], a20 = a[6], a21 = a[7], a22 = a[8], s = Math.sin(rad), c = Math.cos(rad);
                out[0] = c * a00 + s * a10;
                out[1] = c * a01 + s * a11;
                out[2] = c * a02 + s * a12;
                out[3] = c * a10 - s * a00;
                out[4] = c * a11 - s * a01;
                out[5] = c * a12 - s * a02;
                out[6] = a20;
                out[7] = a21;
                out[8] = a22;
                return out;
              }
              function scale(out, a, v) {
                var x = v[0], y = v[1];
                out[0] = x * a[0];
                out[1] = x * a[1];
                out[2] = x * a[2];
                out[3] = y * a[3];
                out[4] = y * a[4];
                out[5] = y * a[5];
                out[6] = a[6];
                out[7] = a[7];
                out[8] = a[8];
                return out;
              }
              function fromTranslation(out, v) {
                out[0] = 1;
                out[1] = 0;
                out[2] = 0;
                out[3] = 0;
                out[4] = 1;
                out[5] = 0;
                out[6] = v[0];
                out[7] = v[1];
                out[8] = 1;
                return out;
              }
              function fromRotation(out, rad) {
                var s = Math.sin(rad), c = Math.cos(rad);
                out[0] = c;
                out[1] = s;
                out[2] = 0;
                out[3] = -s;
                out[4] = c;
                out[5] = 0;
                out[6] = 0;
                out[7] = 0;
                out[8] = 1;
                return out;
              }
              function fromScaling(out, v) {
                out[0] = v[0];
                out[1] = 0;
                out[2] = 0;
                out[3] = 0;
                out[4] = v[1];
                out[5] = 0;
                out[6] = 0;
                out[7] = 0;
                out[8] = 1;
                return out;
              }
              function fromMat2d(out, a) {
                out[0] = a[0];
                out[1] = a[1];
                out[2] = 0;
                out[3] = a[2];
                out[4] = a[3];
                out[5] = 0;
                out[6] = a[4];
                out[7] = a[5];
                out[8] = 1;
                return out;
              }
              function fromQuat(out, q) {
                var x = q[0], y = q[1], z = q[2], w = q[3];
                var x2 = x + x;
                var y2 = y + y;
                var z2 = z + z;
                var xx = x * x2;
                var yx = y * x2;
                var yy = y * y2;
                var zx = z * x2;
                var zy = z * y2;
                var zz = z * z2;
                var wx = w * x2;
                var wy = w * y2;
                var wz = w * z2;
                out[0] = 1 - yy - zz;
                out[3] = yx - wz;
                out[6] = zx + wy;
                out[1] = yx + wz;
                out[4] = 1 - xx - zz;
                out[7] = zy - wx;
                out[2] = zx - wy;
                out[5] = zy + wx;
                out[8] = 1 - xx - yy;
                return out;
              }
              function normalFromMat4(out, a) {
                var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
                var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
                var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
                var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
                var b00 = a00 * a11 - a01 * a10;
                var b01 = a00 * a12 - a02 * a10;
                var b02 = a00 * a13 - a03 * a10;
                var b03 = a01 * a12 - a02 * a11;
                var b04 = a01 * a13 - a03 * a11;
                var b05 = a02 * a13 - a03 * a12;
                var b06 = a20 * a31 - a21 * a30;
                var b07 = a20 * a32 - a22 * a30;
                var b08 = a20 * a33 - a23 * a30;
                var b09 = a21 * a32 - a22 * a31;
                var b10 = a21 * a33 - a23 * a31;
                var b11 = a22 * a33 - a23 * a32;
                var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
                if (!det) {
                  return null;
                }
                det = 1 / det;
                out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
                out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
                out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
                out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
                out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
                out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
                out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
                out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
                out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
                return out;
              }
              function projection(out, width, height) {
                out[0] = 2 / width;
                out[1] = 0;
                out[2] = 0;
                out[3] = 0;
                out[4] = -2 / height;
                out[5] = 0;
                out[6] = -1;
                out[7] = 1;
                out[8] = 1;
                return out;
              }
              function str(a) {
                return "mat3(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ")";
              }
              function frob(a) {
                return Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2));
              }
              function add(out, a, b) {
                out[0] = a[0] + b[0];
                out[1] = a[1] + b[1];
                out[2] = a[2] + b[2];
                out[3] = a[3] + b[3];
                out[4] = a[4] + b[4];
                out[5] = a[5] + b[5];
                out[6] = a[6] + b[6];
                out[7] = a[7] + b[7];
                out[8] = a[8] + b[8];
                return out;
              }
              function subtract(out, a, b) {
                out[0] = a[0] - b[0];
                out[1] = a[1] - b[1];
                out[2] = a[2] - b[2];
                out[3] = a[3] - b[3];
                out[4] = a[4] - b[4];
                out[5] = a[5] - b[5];
                out[6] = a[6] - b[6];
                out[7] = a[7] - b[7];
                out[8] = a[8] - b[8];
                return out;
              }
              function multiplyScalar(out, a, b) {
                out[0] = a[0] * b;
                out[1] = a[1] * b;
                out[2] = a[2] * b;
                out[3] = a[3] * b;
                out[4] = a[4] * b;
                out[5] = a[5] * b;
                out[6] = a[6] * b;
                out[7] = a[7] * b;
                out[8] = a[8] * b;
                return out;
              }
              function multiplyScalarAndAdd(out, a, b, scale2) {
                out[0] = a[0] + b[0] * scale2;
                out[1] = a[1] + b[1] * scale2;
                out[2] = a[2] + b[2] * scale2;
                out[3] = a[3] + b[3] * scale2;
                out[4] = a[4] + b[4] * scale2;
                out[5] = a[5] + b[5] * scale2;
                out[6] = a[6] + b[6] * scale2;
                out[7] = a[7] + b[7] * scale2;
                out[8] = a[8] + b[8] * scale2;
                return out;
              }
              function exactEquals(a, b) {
                return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8];
              }
              function equals(a, b) {
                var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5], a6 = a[6], a7 = a[7], a8 = a[8];
                var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7], b8 = b[8];
                return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix.EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= glMatrix.EPSILON * Math.max(1, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= glMatrix.EPSILON * Math.max(1, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= glMatrix.EPSILON * Math.max(1, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= glMatrix.EPSILON * Math.max(1, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= glMatrix.EPSILON * Math.max(1, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= glMatrix.EPSILON * Math.max(1, Math.abs(a8), Math.abs(b8));
              }
              exports$14.mul = multiply;
              exports$14.sub = subtract;
            },
            /* 2 */
            /***/
            function(module4, exports$14, __webpack_require__) {
              Object.defineProperty(exports$14, "__esModule", {
                value: true
              });
              exports$14.forEach = exports$14.sqrLen = exports$14.len = exports$14.sqrDist = exports$14.dist = exports$14.div = exports$14.mul = exports$14.sub = void 0;
              exports$14.create = create;
              exports$14.clone = clone;
              exports$14.length = length;
              exports$14.fromValues = fromValues;
              exports$14.copy = copy;
              exports$14.set = set;
              exports$14.add = add;
              exports$14.subtract = subtract;
              exports$14.multiply = multiply;
              exports$14.divide = divide;
              exports$14.ceil = ceil;
              exports$14.floor = floor;
              exports$14.min = min;
              exports$14.max = max;
              exports$14.round = round;
              exports$14.scale = scale;
              exports$14.scaleAndAdd = scaleAndAdd;
              exports$14.distance = distance;
              exports$14.squaredDistance = squaredDistance;
              exports$14.squaredLength = squaredLength;
              exports$14.negate = negate;
              exports$14.inverse = inverse;
              exports$14.normalize = normalize;
              exports$14.dot = dot;
              exports$14.cross = cross;
              exports$14.lerp = lerp;
              exports$14.hermite = hermite;
              exports$14.bezier = bezier;
              exports$14.random = random;
              exports$14.transformMat4 = transformMat4;
              exports$14.transformMat3 = transformMat3;
              exports$14.transformQuat = transformQuat;
              exports$14.rotateX = rotateX;
              exports$14.rotateY = rotateY;
              exports$14.rotateZ = rotateZ;
              exports$14.angle = angle;
              exports$14.str = str;
              exports$14.exactEquals = exactEquals;
              exports$14.equals = equals;
              var _common = __webpack_require__(0);
              var glMatrix = _interopRequireWildcard(_common);
              function _interopRequireWildcard(obj) {
                if (obj && obj.__esModule) {
                  return obj;
                } else {
                  var newObj = {};
                  if (obj != null) {
                    for (var key in obj) {
                      if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                    }
                  }
                  newObj.default = obj;
                  return newObj;
                }
              }
              function create() {
                var out = new glMatrix.ARRAY_TYPE(3);
                out[0] = 0;
                out[1] = 0;
                out[2] = 0;
                return out;
              }
              function clone(a) {
                var out = new glMatrix.ARRAY_TYPE(3);
                out[0] = a[0];
                out[1] = a[1];
                out[2] = a[2];
                return out;
              }
              function length(a) {
                var x = a[0];
                var y = a[1];
                var z = a[2];
                return Math.sqrt(x * x + y * y + z * z);
              }
              function fromValues(x, y, z) {
                var out = new glMatrix.ARRAY_TYPE(3);
                out[0] = x;
                out[1] = y;
                out[2] = z;
                return out;
              }
              function copy(out, a) {
                out[0] = a[0];
                out[1] = a[1];
                out[2] = a[2];
                return out;
              }
              function set(out, x, y, z) {
                out[0] = x;
                out[1] = y;
                out[2] = z;
                return out;
              }
              function add(out, a, b) {
                out[0] = a[0] + b[0];
                out[1] = a[1] + b[1];
                out[2] = a[2] + b[2];
                return out;
              }
              function subtract(out, a, b) {
                out[0] = a[0] - b[0];
                out[1] = a[1] - b[1];
                out[2] = a[2] - b[2];
                return out;
              }
              function multiply(out, a, b) {
                out[0] = a[0] * b[0];
                out[1] = a[1] * b[1];
                out[2] = a[2] * b[2];
                return out;
              }
              function divide(out, a, b) {
                out[0] = a[0] / b[0];
                out[1] = a[1] / b[1];
                out[2] = a[2] / b[2];
                return out;
              }
              function ceil(out, a) {
                out[0] = Math.ceil(a[0]);
                out[1] = Math.ceil(a[1]);
                out[2] = Math.ceil(a[2]);
                return out;
              }
              function floor(out, a) {
                out[0] = Math.floor(a[0]);
                out[1] = Math.floor(a[1]);
                out[2] = Math.floor(a[2]);
                return out;
              }
              function min(out, a, b) {
                out[0] = Math.min(a[0], b[0]);
                out[1] = Math.min(a[1], b[1]);
                out[2] = Math.min(a[2], b[2]);
                return out;
              }
              function max(out, a, b) {
                out[0] = Math.max(a[0], b[0]);
                out[1] = Math.max(a[1], b[1]);
                out[2] = Math.max(a[2], b[2]);
                return out;
              }
              function round(out, a) {
                out[0] = Math.round(a[0]);
                out[1] = Math.round(a[1]);
                out[2] = Math.round(a[2]);
                return out;
              }
              function scale(out, a, b) {
                out[0] = a[0] * b;
                out[1] = a[1] * b;
                out[2] = a[2] * b;
                return out;
              }
              function scaleAndAdd(out, a, b, scale2) {
                out[0] = a[0] + b[0] * scale2;
                out[1] = a[1] + b[1] * scale2;
                out[2] = a[2] + b[2] * scale2;
                return out;
              }
              function distance(a, b) {
                var x = b[0] - a[0];
                var y = b[1] - a[1];
                var z = b[2] - a[2];
                return Math.sqrt(x * x + y * y + z * z);
              }
              function squaredDistance(a, b) {
                var x = b[0] - a[0];
                var y = b[1] - a[1];
                var z = b[2] - a[2];
                return x * x + y * y + z * z;
              }
              function squaredLength(a) {
                var x = a[0];
                var y = a[1];
                var z = a[2];
                return x * x + y * y + z * z;
              }
              function negate(out, a) {
                out[0] = -a[0];
                out[1] = -a[1];
                out[2] = -a[2];
                return out;
              }
              function inverse(out, a) {
                out[0] = 1 / a[0];
                out[1] = 1 / a[1];
                out[2] = 1 / a[2];
                return out;
              }
              function normalize(out, a) {
                var x = a[0];
                var y = a[1];
                var z = a[2];
                var len = x * x + y * y + z * z;
                if (len > 0) {
                  len = 1 / Math.sqrt(len);
                  out[0] = a[0] * len;
                  out[1] = a[1] * len;
                  out[2] = a[2] * len;
                }
                return out;
              }
              function dot(a, b) {
                return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
              }
              function cross(out, a, b) {
                var ax = a[0], ay = a[1], az = a[2];
                var bx = b[0], by = b[1], bz = b[2];
                out[0] = ay * bz - az * by;
                out[1] = az * bx - ax * bz;
                out[2] = ax * by - ay * bx;
                return out;
              }
              function lerp(out, a, b, t) {
                var ax = a[0];
                var ay = a[1];
                var az = a[2];
                out[0] = ax + t * (b[0] - ax);
                out[1] = ay + t * (b[1] - ay);
                out[2] = az + t * (b[2] - az);
                return out;
              }
              function hermite(out, a, b, c, d, t) {
                var factorTimes2 = t * t;
                var factor1 = factorTimes2 * (2 * t - 3) + 1;
                var factor2 = factorTimes2 * (t - 2) + t;
                var factor3 = factorTimes2 * (t - 1);
                var factor4 = factorTimes2 * (3 - 2 * t);
                out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
                out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
                out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
                return out;
              }
              function bezier(out, a, b, c, d, t) {
                var inverseFactor = 1 - t;
                var inverseFactorTimesTwo = inverseFactor * inverseFactor;
                var factorTimes2 = t * t;
                var factor1 = inverseFactorTimesTwo * inverseFactor;
                var factor2 = 3 * t * inverseFactorTimesTwo;
                var factor3 = 3 * factorTimes2 * inverseFactor;
                var factor4 = factorTimes2 * t;
                out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
                out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
                out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
                return out;
              }
              function random(out, scale2) {
                scale2 = scale2 || 1;
                var r = glMatrix.RANDOM() * 2 * Math.PI;
                var z = glMatrix.RANDOM() * 2 - 1;
                var zScale = Math.sqrt(1 - z * z) * scale2;
                out[0] = Math.cos(r) * zScale;
                out[1] = Math.sin(r) * zScale;
                out[2] = z * scale2;
                return out;
              }
              function transformMat4(out, a, m) {
                var x = a[0], y = a[1], z = a[2];
                var w = m[3] * x + m[7] * y + m[11] * z + m[15];
                w = w || 1;
                out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
                out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
                out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
                return out;
              }
              function transformMat3(out, a, m) {
                var x = a[0], y = a[1], z = a[2];
                out[0] = x * m[0] + y * m[3] + z * m[6];
                out[1] = x * m[1] + y * m[4] + z * m[7];
                out[2] = x * m[2] + y * m[5] + z * m[8];
                return out;
              }
              function transformQuat(out, a, q) {
                var x = a[0], y = a[1], z = a[2];
                var qx = q[0], qy = q[1], qz = q[2], qw = q[3];
                var ix = qw * x + qy * z - qz * y;
                var iy = qw * y + qz * x - qx * z;
                var iz = qw * z + qx * y - qy * x;
                var iw = -qx * x - qy * y - qz * z;
                out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
                out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
                out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
                return out;
              }
              function rotateX(out, a, b, c) {
                var p = [], r = [];
                p[0] = a[0] - b[0];
                p[1] = a[1] - b[1];
                p[2] = a[2] - b[2];
                r[0] = p[0];
                r[1] = p[1] * Math.cos(c) - p[2] * Math.sin(c);
                r[2] = p[1] * Math.sin(c) + p[2] * Math.cos(c);
                out[0] = r[0] + b[0];
                out[1] = r[1] + b[1];
                out[2] = r[2] + b[2];
                return out;
              }
              function rotateY(out, a, b, c) {
                var p = [], r = [];
                p[0] = a[0] - b[0];
                p[1] = a[1] - b[1];
                p[2] = a[2] - b[2];
                r[0] = p[2] * Math.sin(c) + p[0] * Math.cos(c);
                r[1] = p[1];
                r[2] = p[2] * Math.cos(c) - p[0] * Math.sin(c);
                out[0] = r[0] + b[0];
                out[1] = r[1] + b[1];
                out[2] = r[2] + b[2];
                return out;
              }
              function rotateZ(out, a, b, c) {
                var p = [], r = [];
                p[0] = a[0] - b[0];
                p[1] = a[1] - b[1];
                p[2] = a[2] - b[2];
                r[0] = p[0] * Math.cos(c) - p[1] * Math.sin(c);
                r[1] = p[0] * Math.sin(c) + p[1] * Math.cos(c);
                r[2] = p[2];
                out[0] = r[0] + b[0];
                out[1] = r[1] + b[1];
                out[2] = r[2] + b[2];
                return out;
              }
              function angle(a, b) {
                var tempA = fromValues(a[0], a[1], a[2]);
                var tempB = fromValues(b[0], b[1], b[2]);
                normalize(tempA, tempA);
                normalize(tempB, tempB);
                var cosine = dot(tempA, tempB);
                if (cosine > 1) {
                  return 0;
                } else if (cosine < -1) {
                  return Math.PI;
                } else {
                  return Math.acos(cosine);
                }
              }
              function str(a) {
                return "vec3(" + a[0] + ", " + a[1] + ", " + a[2] + ")";
              }
              function exactEquals(a, b) {
                return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
              }
              function equals(a, b) {
                var a0 = a[0], a1 = a[1], a2 = a[2];
                var b0 = b[0], b1 = b[1], b2 = b[2];
                return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix.EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2));
              }
              exports$14.sub = subtract;
              exports$14.mul = multiply;
              exports$14.div = divide;
              exports$14.dist = distance;
              exports$14.sqrDist = squaredDistance;
              exports$14.len = length;
              exports$14.sqrLen = squaredLength;
              exports$14.forEach = function() {
                var vec = create();
                return function(a, stride, offset, count, fn, arg) {
                  var i = void 0, l = void 0;
                  if (!stride) {
                    stride = 3;
                  }
                  if (!offset) {
                    offset = 0;
                  }
                  if (count) {
                    l = Math.min(count * stride + offset, a.length);
                  } else {
                    l = a.length;
                  }
                  for (i = offset; i < l; i += stride) {
                    vec[0] = a[i];
                    vec[1] = a[i + 1];
                    vec[2] = a[i + 2];
                    fn(vec, vec, arg);
                    a[i] = vec[0];
                    a[i + 1] = vec[1];
                    a[i + 2] = vec[2];
                  }
                  return a;
                };
              }();
            },
            /* 3 */
            /***/
            function(module4, exports$14, __webpack_require__) {
              Object.defineProperty(exports$14, "__esModule", {
                value: true
              });
              exports$14.forEach = exports$14.sqrLen = exports$14.len = exports$14.sqrDist = exports$14.dist = exports$14.div = exports$14.mul = exports$14.sub = void 0;
              exports$14.create = create;
              exports$14.clone = clone;
              exports$14.fromValues = fromValues;
              exports$14.copy = copy;
              exports$14.set = set;
              exports$14.add = add;
              exports$14.subtract = subtract;
              exports$14.multiply = multiply;
              exports$14.divide = divide;
              exports$14.ceil = ceil;
              exports$14.floor = floor;
              exports$14.min = min;
              exports$14.max = max;
              exports$14.round = round;
              exports$14.scale = scale;
              exports$14.scaleAndAdd = scaleAndAdd;
              exports$14.distance = distance;
              exports$14.squaredDistance = squaredDistance;
              exports$14.length = length;
              exports$14.squaredLength = squaredLength;
              exports$14.negate = negate;
              exports$14.inverse = inverse;
              exports$14.normalize = normalize;
              exports$14.dot = dot;
              exports$14.lerp = lerp;
              exports$14.random = random;
              exports$14.transformMat4 = transformMat4;
              exports$14.transformQuat = transformQuat;
              exports$14.str = str;
              exports$14.exactEquals = exactEquals;
              exports$14.equals = equals;
              var _common = __webpack_require__(0);
              var glMatrix = _interopRequireWildcard(_common);
              function _interopRequireWildcard(obj) {
                if (obj && obj.__esModule) {
                  return obj;
                } else {
                  var newObj = {};
                  if (obj != null) {
                    for (var key in obj) {
                      if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                    }
                  }
                  newObj.default = obj;
                  return newObj;
                }
              }
              function create() {
                var out = new glMatrix.ARRAY_TYPE(4);
                out[0] = 0;
                out[1] = 0;
                out[2] = 0;
                out[3] = 0;
                return out;
              }
              function clone(a) {
                var out = new glMatrix.ARRAY_TYPE(4);
                out[0] = a[0];
                out[1] = a[1];
                out[2] = a[2];
                out[3] = a[3];
                return out;
              }
              function fromValues(x, y, z, w) {
                var out = new glMatrix.ARRAY_TYPE(4);
                out[0] = x;
                out[1] = y;
                out[2] = z;
                out[3] = w;
                return out;
              }
              function copy(out, a) {
                out[0] = a[0];
                out[1] = a[1];
                out[2] = a[2];
                out[3] = a[3];
                return out;
              }
              function set(out, x, y, z, w) {
                out[0] = x;
                out[1] = y;
                out[2] = z;
                out[3] = w;
                return out;
              }
              function add(out, a, b) {
                out[0] = a[0] + b[0];
                out[1] = a[1] + b[1];
                out[2] = a[2] + b[2];
                out[3] = a[3] + b[3];
                return out;
              }
              function subtract(out, a, b) {
                out[0] = a[0] - b[0];
                out[1] = a[1] - b[1];
                out[2] = a[2] - b[2];
                out[3] = a[3] - b[3];
                return out;
              }
              function multiply(out, a, b) {
                out[0] = a[0] * b[0];
                out[1] = a[1] * b[1];
                out[2] = a[2] * b[2];
                out[3] = a[3] * b[3];
                return out;
              }
              function divide(out, a, b) {
                out[0] = a[0] / b[0];
                out[1] = a[1] / b[1];
                out[2] = a[2] / b[2];
                out[3] = a[3] / b[3];
                return out;
              }
              function ceil(out, a) {
                out[0] = Math.ceil(a[0]);
                out[1] = Math.ceil(a[1]);
                out[2] = Math.ceil(a[2]);
                out[3] = Math.ceil(a[3]);
                return out;
              }
              function floor(out, a) {
                out[0] = Math.floor(a[0]);
                out[1] = Math.floor(a[1]);
                out[2] = Math.floor(a[2]);
                out[3] = Math.floor(a[3]);
                return out;
              }
              function min(out, a, b) {
                out[0] = Math.min(a[0], b[0]);
                out[1] = Math.min(a[1], b[1]);
                out[2] = Math.min(a[2], b[2]);
                out[3] = Math.min(a[3], b[3]);
                return out;
              }
              function max(out, a, b) {
                out[0] = Math.max(a[0], b[0]);
                out[1] = Math.max(a[1], b[1]);
                out[2] = Math.max(a[2], b[2]);
                out[3] = Math.max(a[3], b[3]);
                return out;
              }
              function round(out, a) {
                out[0] = Math.round(a[0]);
                out[1] = Math.round(a[1]);
                out[2] = Math.round(a[2]);
                out[3] = Math.round(a[3]);
                return out;
              }
              function scale(out, a, b) {
                out[0] = a[0] * b;
                out[1] = a[1] * b;
                out[2] = a[2] * b;
                out[3] = a[3] * b;
                return out;
              }
              function scaleAndAdd(out, a, b, scale2) {
                out[0] = a[0] + b[0] * scale2;
                out[1] = a[1] + b[1] * scale2;
                out[2] = a[2] + b[2] * scale2;
                out[3] = a[3] + b[3] * scale2;
                return out;
              }
              function distance(a, b) {
                var x = b[0] - a[0];
                var y = b[1] - a[1];
                var z = b[2] - a[2];
                var w = b[3] - a[3];
                return Math.sqrt(x * x + y * y + z * z + w * w);
              }
              function squaredDistance(a, b) {
                var x = b[0] - a[0];
                var y = b[1] - a[1];
                var z = b[2] - a[2];
                var w = b[3] - a[3];
                return x * x + y * y + z * z + w * w;
              }
              function length(a) {
                var x = a[0];
                var y = a[1];
                var z = a[2];
                var w = a[3];
                return Math.sqrt(x * x + y * y + z * z + w * w);
              }
              function squaredLength(a) {
                var x = a[0];
                var y = a[1];
                var z = a[2];
                var w = a[3];
                return x * x + y * y + z * z + w * w;
              }
              function negate(out, a) {
                out[0] = -a[0];
                out[1] = -a[1];
                out[2] = -a[2];
                out[3] = -a[3];
                return out;
              }
              function inverse(out, a) {
                out[0] = 1 / a[0];
                out[1] = 1 / a[1];
                out[2] = 1 / a[2];
                out[3] = 1 / a[3];
                return out;
              }
              function normalize(out, a) {
                var x = a[0];
                var y = a[1];
                var z = a[2];
                var w = a[3];
                var len = x * x + y * y + z * z + w * w;
                if (len > 0) {
                  len = 1 / Math.sqrt(len);
                  out[0] = x * len;
                  out[1] = y * len;
                  out[2] = z * len;
                  out[3] = w * len;
                }
                return out;
              }
              function dot(a, b) {
                return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
              }
              function lerp(out, a, b, t) {
                var ax = a[0];
                var ay = a[1];
                var az = a[2];
                var aw = a[3];
                out[0] = ax + t * (b[0] - ax);
                out[1] = ay + t * (b[1] - ay);
                out[2] = az + t * (b[2] - az);
                out[3] = aw + t * (b[3] - aw);
                return out;
              }
              function random(out, vectorScale) {
                vectorScale = vectorScale || 1;
                out[0] = glMatrix.RANDOM();
                out[1] = glMatrix.RANDOM();
                out[2] = glMatrix.RANDOM();
                out[3] = glMatrix.RANDOM();
                normalize(out, out);
                scale(out, out, vectorScale);
                return out;
              }
              function transformMat4(out, a, m) {
                var x = a[0], y = a[1], z = a[2], w = a[3];
                out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
                out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
                out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
                out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
                return out;
              }
              function transformQuat(out, a, q) {
                var x = a[0], y = a[1], z = a[2];
                var qx = q[0], qy = q[1], qz = q[2], qw = q[3];
                var ix = qw * x + qy * z - qz * y;
                var iy = qw * y + qz * x - qx * z;
                var iz = qw * z + qx * y - qy * x;
                var iw = -qx * x - qy * y - qz * z;
                out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
                out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
                out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
                out[3] = a[3];
                return out;
              }
              function str(a) {
                return "vec4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
              }
              function exactEquals(a, b) {
                return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
              }
              function equals(a, b) {
                var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
                var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
                return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix.EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= glMatrix.EPSILON * Math.max(1, Math.abs(a3), Math.abs(b3));
              }
              exports$14.sub = subtract;
              exports$14.mul = multiply;
              exports$14.div = divide;
              exports$14.dist = distance;
              exports$14.sqrDist = squaredDistance;
              exports$14.len = length;
              exports$14.sqrLen = squaredLength;
              exports$14.forEach = function() {
                var vec = create();
                return function(a, stride, offset, count, fn, arg) {
                  var i = void 0, l = void 0;
                  if (!stride) {
                    stride = 4;
                  }
                  if (!offset) {
                    offset = 0;
                  }
                  if (count) {
                    l = Math.min(count * stride + offset, a.length);
                  } else {
                    l = a.length;
                  }
                  for (i = offset; i < l; i += stride) {
                    vec[0] = a[i];
                    vec[1] = a[i + 1];
                    vec[2] = a[i + 2];
                    vec[3] = a[i + 3];
                    fn(vec, vec, arg);
                    a[i] = vec[0];
                    a[i + 1] = vec[1];
                    a[i + 2] = vec[2];
                    a[i + 3] = vec[3];
                  }
                  return a;
                };
              }();
            },
            /* 4 */
            /***/
            function(module4, exports$14, __webpack_require__) {
              Object.defineProperty(exports$14, "__esModule", {
                value: true
              });
              exports$14.vec4 = exports$14.vec3 = exports$14.vec2 = exports$14.quat = exports$14.mat4 = exports$14.mat3 = exports$14.mat2d = exports$14.mat2 = exports$14.glMatrix = void 0;
              var _common = __webpack_require__(0);
              var glMatrix = _interopRequireWildcard(_common);
              var _mat = __webpack_require__(5);
              var mat2 = _interopRequireWildcard(_mat);
              var _mat2d = __webpack_require__(6);
              var mat2d = _interopRequireWildcard(_mat2d);
              var _mat2 = __webpack_require__(1);
              var mat3 = _interopRequireWildcard(_mat2);
              var _mat3 = __webpack_require__(7);
              var mat42 = _interopRequireWildcard(_mat3);
              var _quat = __webpack_require__(8);
              var quat = _interopRequireWildcard(_quat);
              var _vec = __webpack_require__(9);
              var vec2 = _interopRequireWildcard(_vec);
              var _vec2 = __webpack_require__(2);
              var vec3 = _interopRequireWildcard(_vec2);
              var _vec3 = __webpack_require__(3);
              var vec4 = _interopRequireWildcard(_vec3);
              function _interopRequireWildcard(obj) {
                if (obj && obj.__esModule) {
                  return obj;
                } else {
                  var newObj = {};
                  if (obj != null) {
                    for (var key in obj) {
                      if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                    }
                  }
                  newObj.default = obj;
                  return newObj;
                }
              }
              exports$14.glMatrix = glMatrix;
              exports$14.mat2 = mat2;
              exports$14.mat2d = mat2d;
              exports$14.mat3 = mat3;
              exports$14.mat4 = mat42;
              exports$14.quat = quat;
              exports$14.vec2 = vec2;
              exports$14.vec3 = vec3;
              exports$14.vec4 = vec4;
            },
            /* 5 */
            /***/
            function(module4, exports$14, __webpack_require__) {
              Object.defineProperty(exports$14, "__esModule", {
                value: true
              });
              exports$14.sub = exports$14.mul = void 0;
              exports$14.create = create;
              exports$14.clone = clone;
              exports$14.copy = copy;
              exports$14.identity = identity;
              exports$14.fromValues = fromValues;
              exports$14.set = set;
              exports$14.transpose = transpose;
              exports$14.invert = invert;
              exports$14.adjoint = adjoint;
              exports$14.determinant = determinant;
              exports$14.multiply = multiply;
              exports$14.rotate = rotate;
              exports$14.scale = scale;
              exports$14.fromRotation = fromRotation;
              exports$14.fromScaling = fromScaling;
              exports$14.str = str;
              exports$14.frob = frob;
              exports$14.LDU = LDU;
              exports$14.add = add;
              exports$14.subtract = subtract;
              exports$14.exactEquals = exactEquals;
              exports$14.equals = equals;
              exports$14.multiplyScalar = multiplyScalar;
              exports$14.multiplyScalarAndAdd = multiplyScalarAndAdd;
              var _common = __webpack_require__(0);
              var glMatrix = _interopRequireWildcard(_common);
              function _interopRequireWildcard(obj) {
                if (obj && obj.__esModule) {
                  return obj;
                } else {
                  var newObj = {};
                  if (obj != null) {
                    for (var key in obj) {
                      if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                    }
                  }
                  newObj.default = obj;
                  return newObj;
                }
              }
              function create() {
                var out = new glMatrix.ARRAY_TYPE(4);
                out[0] = 1;
                out[1] = 0;
                out[2] = 0;
                out[3] = 1;
                return out;
              }
              function clone(a) {
                var out = new glMatrix.ARRAY_TYPE(4);
                out[0] = a[0];
                out[1] = a[1];
                out[2] = a[2];
                out[3] = a[3];
                return out;
              }
              function copy(out, a) {
                out[0] = a[0];
                out[1] = a[1];
                out[2] = a[2];
                out[3] = a[3];
                return out;
              }
              function identity(out) {
                out[0] = 1;
                out[1] = 0;
                out[2] = 0;
                out[3] = 1;
                return out;
              }
              function fromValues(m00, m01, m10, m11) {
                var out = new glMatrix.ARRAY_TYPE(4);
                out[0] = m00;
                out[1] = m01;
                out[2] = m10;
                out[3] = m11;
                return out;
              }
              function set(out, m00, m01, m10, m11) {
                out[0] = m00;
                out[1] = m01;
                out[2] = m10;
                out[3] = m11;
                return out;
              }
              function transpose(out, a) {
                if (out === a) {
                  var a1 = a[1];
                  out[1] = a[2];
                  out[2] = a1;
                } else {
                  out[0] = a[0];
                  out[1] = a[2];
                  out[2] = a[1];
                  out[3] = a[3];
                }
                return out;
              }
              function invert(out, a) {
                var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
                var det = a0 * a3 - a2 * a1;
                if (!det) {
                  return null;
                }
                det = 1 / det;
                out[0] = a3 * det;
                out[1] = -a1 * det;
                out[2] = -a2 * det;
                out[3] = a0 * det;
                return out;
              }
              function adjoint(out, a) {
                var a0 = a[0];
                out[0] = a[3];
                out[1] = -a[1];
                out[2] = -a[2];
                out[3] = a0;
                return out;
              }
              function determinant(a) {
                return a[0] * a[3] - a[2] * a[1];
              }
              function multiply(out, a, b) {
                var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
                var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
                out[0] = a0 * b0 + a2 * b1;
                out[1] = a1 * b0 + a3 * b1;
                out[2] = a0 * b2 + a2 * b3;
                out[3] = a1 * b2 + a3 * b3;
                return out;
              }
              function rotate(out, a, rad) {
                var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
                var s = Math.sin(rad);
                var c = Math.cos(rad);
                out[0] = a0 * c + a2 * s;
                out[1] = a1 * c + a3 * s;
                out[2] = a0 * -s + a2 * c;
                out[3] = a1 * -s + a3 * c;
                return out;
              }
              function scale(out, a, v) {
                var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
                var v0 = v[0], v1 = v[1];
                out[0] = a0 * v0;
                out[1] = a1 * v0;
                out[2] = a2 * v1;
                out[3] = a3 * v1;
                return out;
              }
              function fromRotation(out, rad) {
                var s = Math.sin(rad);
                var c = Math.cos(rad);
                out[0] = c;
                out[1] = s;
                out[2] = -s;
                out[3] = c;
                return out;
              }
              function fromScaling(out, v) {
                out[0] = v[0];
                out[1] = 0;
                out[2] = 0;
                out[3] = v[1];
                return out;
              }
              function str(a) {
                return "mat2(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
              }
              function frob(a) {
                return Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2));
              }
              function LDU(L, D, U2, a) {
                L[2] = a[2] / a[0];
                U2[0] = a[0];
                U2[1] = a[1];
                U2[3] = a[3] - L[2] * U2[1];
                return [L, D, U2];
              }
              function add(out, a, b) {
                out[0] = a[0] + b[0];
                out[1] = a[1] + b[1];
                out[2] = a[2] + b[2];
                out[3] = a[3] + b[3];
                return out;
              }
              function subtract(out, a, b) {
                out[0] = a[0] - b[0];
                out[1] = a[1] - b[1];
                out[2] = a[2] - b[2];
                out[3] = a[3] - b[3];
                return out;
              }
              function exactEquals(a, b) {
                return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
              }
              function equals(a, b) {
                var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
                var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
                return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix.EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= glMatrix.EPSILON * Math.max(1, Math.abs(a3), Math.abs(b3));
              }
              function multiplyScalar(out, a, b) {
                out[0] = a[0] * b;
                out[1] = a[1] * b;
                out[2] = a[2] * b;
                out[3] = a[3] * b;
                return out;
              }
              function multiplyScalarAndAdd(out, a, b, scale2) {
                out[0] = a[0] + b[0] * scale2;
                out[1] = a[1] + b[1] * scale2;
                out[2] = a[2] + b[2] * scale2;
                out[3] = a[3] + b[3] * scale2;
                return out;
              }
              exports$14.mul = multiply;
              exports$14.sub = subtract;
            },
            /* 6 */
            /***/
            function(module4, exports$14, __webpack_require__) {
              Object.defineProperty(exports$14, "__esModule", {
                value: true
              });
              exports$14.sub = exports$14.mul = void 0;
              exports$14.create = create;
              exports$14.clone = clone;
              exports$14.copy = copy;
              exports$14.identity = identity;
              exports$14.fromValues = fromValues;
              exports$14.set = set;
              exports$14.invert = invert;
              exports$14.determinant = determinant;
              exports$14.multiply = multiply;
              exports$14.rotate = rotate;
              exports$14.scale = scale;
              exports$14.translate = translate;
              exports$14.fromRotation = fromRotation;
              exports$14.fromScaling = fromScaling;
              exports$14.fromTranslation = fromTranslation;
              exports$14.str = str;
              exports$14.frob = frob;
              exports$14.add = add;
              exports$14.subtract = subtract;
              exports$14.multiplyScalar = multiplyScalar;
              exports$14.multiplyScalarAndAdd = multiplyScalarAndAdd;
              exports$14.exactEquals = exactEquals;
              exports$14.equals = equals;
              var _common = __webpack_require__(0);
              var glMatrix = _interopRequireWildcard(_common);
              function _interopRequireWildcard(obj) {
                if (obj && obj.__esModule) {
                  return obj;
                } else {
                  var newObj = {};
                  if (obj != null) {
                    for (var key in obj) {
                      if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                    }
                  }
                  newObj.default = obj;
                  return newObj;
                }
              }
              function create() {
                var out = new glMatrix.ARRAY_TYPE(6);
                out[0] = 1;
                out[1] = 0;
                out[2] = 0;
                out[3] = 1;
                out[4] = 0;
                out[5] = 0;
                return out;
              }
              function clone(a) {
                var out = new glMatrix.ARRAY_TYPE(6);
                out[0] = a[0];
                out[1] = a[1];
                out[2] = a[2];
                out[3] = a[3];
                out[4] = a[4];
                out[5] = a[5];
                return out;
              }
              function copy(out, a) {
                out[0] = a[0];
                out[1] = a[1];
                out[2] = a[2];
                out[3] = a[3];
                out[4] = a[4];
                out[5] = a[5];
                return out;
              }
              function identity(out) {
                out[0] = 1;
                out[1] = 0;
                out[2] = 0;
                out[3] = 1;
                out[4] = 0;
                out[5] = 0;
                return out;
              }
              function fromValues(a, b, c, d, tx, ty) {
                var out = new glMatrix.ARRAY_TYPE(6);
                out[0] = a;
                out[1] = b;
                out[2] = c;
                out[3] = d;
                out[4] = tx;
                out[5] = ty;
                return out;
              }
              function set(out, a, b, c, d, tx, ty) {
                out[0] = a;
                out[1] = b;
                out[2] = c;
                out[3] = d;
                out[4] = tx;
                out[5] = ty;
                return out;
              }
              function invert(out, a) {
                var aa = a[0], ab = a[1], ac = a[2], ad = a[3];
                var atx = a[4], aty = a[5];
                var det = aa * ad - ab * ac;
                if (!det) {
                  return null;
                }
                det = 1 / det;
                out[0] = ad * det;
                out[1] = -ab * det;
                out[2] = -ac * det;
                out[3] = aa * det;
                out[4] = (ac * aty - ad * atx) * det;
                out[5] = (ab * atx - aa * aty) * det;
                return out;
              }
              function determinant(a) {
                return a[0] * a[3] - a[1] * a[2];
              }
              function multiply(out, a, b) {
                var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5];
                var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5];
                out[0] = a0 * b0 + a2 * b1;
                out[1] = a1 * b0 + a3 * b1;
                out[2] = a0 * b2 + a2 * b3;
                out[3] = a1 * b2 + a3 * b3;
                out[4] = a0 * b4 + a2 * b5 + a4;
                out[5] = a1 * b4 + a3 * b5 + a5;
                return out;
              }
              function rotate(out, a, rad) {
                var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5];
                var s = Math.sin(rad);
                var c = Math.cos(rad);
                out[0] = a0 * c + a2 * s;
                out[1] = a1 * c + a3 * s;
                out[2] = a0 * -s + a2 * c;
                out[3] = a1 * -s + a3 * c;
                out[4] = a4;
                out[5] = a5;
                return out;
              }
              function scale(out, a, v) {
                var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5];
                var v0 = v[0], v1 = v[1];
                out[0] = a0 * v0;
                out[1] = a1 * v0;
                out[2] = a2 * v1;
                out[3] = a3 * v1;
                out[4] = a4;
                out[5] = a5;
                return out;
              }
              function translate(out, a, v) {
                var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5];
                var v0 = v[0], v1 = v[1];
                out[0] = a0;
                out[1] = a1;
                out[2] = a2;
                out[3] = a3;
                out[4] = a0 * v0 + a2 * v1 + a4;
                out[5] = a1 * v0 + a3 * v1 + a5;
                return out;
              }
              function fromRotation(out, rad) {
                var s = Math.sin(rad), c = Math.cos(rad);
                out[0] = c;
                out[1] = s;
                out[2] = -s;
                out[3] = c;
                out[4] = 0;
                out[5] = 0;
                return out;
              }
              function fromScaling(out, v) {
                out[0] = v[0];
                out[1] = 0;
                out[2] = 0;
                out[3] = v[1];
                out[4] = 0;
                out[5] = 0;
                return out;
              }
              function fromTranslation(out, v) {
                out[0] = 1;
                out[1] = 0;
                out[2] = 0;
                out[3] = 1;
                out[4] = v[0];
                out[5] = v[1];
                return out;
              }
              function str(a) {
                return "mat2d(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ")";
              }
              function frob(a) {
                return Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + 1);
              }
              function add(out, a, b) {
                out[0] = a[0] + b[0];
                out[1] = a[1] + b[1];
                out[2] = a[2] + b[2];
                out[3] = a[3] + b[3];
                out[4] = a[4] + b[4];
                out[5] = a[5] + b[5];
                return out;
              }
              function subtract(out, a, b) {
                out[0] = a[0] - b[0];
                out[1] = a[1] - b[1];
                out[2] = a[2] - b[2];
                out[3] = a[3] - b[3];
                out[4] = a[4] - b[4];
                out[5] = a[5] - b[5];
                return out;
              }
              function multiplyScalar(out, a, b) {
                out[0] = a[0] * b;
                out[1] = a[1] * b;
                out[2] = a[2] * b;
                out[3] = a[3] * b;
                out[4] = a[4] * b;
                out[5] = a[5] * b;
                return out;
              }
              function multiplyScalarAndAdd(out, a, b, scale2) {
                out[0] = a[0] + b[0] * scale2;
                out[1] = a[1] + b[1] * scale2;
                out[2] = a[2] + b[2] * scale2;
                out[3] = a[3] + b[3] * scale2;
                out[4] = a[4] + b[4] * scale2;
                out[5] = a[5] + b[5] * scale2;
                return out;
              }
              function exactEquals(a, b) {
                return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5];
              }
              function equals(a, b) {
                var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5];
                var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5];
                return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix.EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= glMatrix.EPSILON * Math.max(1, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= glMatrix.EPSILON * Math.max(1, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= glMatrix.EPSILON * Math.max(1, Math.abs(a5), Math.abs(b5));
              }
              exports$14.mul = multiply;
              exports$14.sub = subtract;
            },
            /* 7 */
            /***/
            function(module4, exports$14, __webpack_require__) {
              Object.defineProperty(exports$14, "__esModule", {
                value: true
              });
              exports$14.sub = exports$14.mul = void 0;
              exports$14.create = create;
              exports$14.clone = clone;
              exports$14.copy = copy;
              exports$14.fromValues = fromValues;
              exports$14.set = set;
              exports$14.identity = identity;
              exports$14.transpose = transpose;
              exports$14.invert = invert;
              exports$14.adjoint = adjoint;
              exports$14.determinant = determinant;
              exports$14.multiply = multiply;
              exports$14.translate = translate;
              exports$14.scale = scale;
              exports$14.rotate = rotate;
              exports$14.rotateX = rotateX;
              exports$14.rotateY = rotateY;
              exports$14.rotateZ = rotateZ;
              exports$14.fromTranslation = fromTranslation;
              exports$14.fromScaling = fromScaling;
              exports$14.fromRotation = fromRotation;
              exports$14.fromXRotation = fromXRotation;
              exports$14.fromYRotation = fromYRotation;
              exports$14.fromZRotation = fromZRotation;
              exports$14.fromRotationTranslation = fromRotationTranslation;
              exports$14.getTranslation = getTranslation;
              exports$14.getScaling = getScaling;
              exports$14.getRotation = getRotation;
              exports$14.fromRotationTranslationScale = fromRotationTranslationScale;
              exports$14.fromRotationTranslationScaleOrigin = fromRotationTranslationScaleOrigin;
              exports$14.fromQuat = fromQuat;
              exports$14.frustum = frustum;
              exports$14.perspective = perspective;
              exports$14.perspectiveFromFieldOfView = perspectiveFromFieldOfView;
              exports$14.ortho = ortho;
              exports$14.lookAt = lookAt;
              exports$14.targetTo = targetTo;
              exports$14.str = str;
              exports$14.frob = frob;
              exports$14.add = add;
              exports$14.subtract = subtract;
              exports$14.multiplyScalar = multiplyScalar;
              exports$14.multiplyScalarAndAdd = multiplyScalarAndAdd;
              exports$14.exactEquals = exactEquals;
              exports$14.equals = equals;
              var _common = __webpack_require__(0);
              var glMatrix = _interopRequireWildcard(_common);
              function _interopRequireWildcard(obj) {
                if (obj && obj.__esModule) {
                  return obj;
                } else {
                  var newObj = {};
                  if (obj != null) {
                    for (var key in obj) {
                      if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                    }
                  }
                  newObj.default = obj;
                  return newObj;
                }
              }
              function create() {
                var out = new glMatrix.ARRAY_TYPE(16);
                out[0] = 1;
                out[1] = 0;
                out[2] = 0;
                out[3] = 0;
                out[4] = 0;
                out[5] = 1;
                out[6] = 0;
                out[7] = 0;
                out[8] = 0;
                out[9] = 0;
                out[10] = 1;
                out[11] = 0;
                out[12] = 0;
                out[13] = 0;
                out[14] = 0;
                out[15] = 1;
                return out;
              }
              function clone(a) {
                var out = new glMatrix.ARRAY_TYPE(16);
                out[0] = a[0];
                out[1] = a[1];
                out[2] = a[2];
                out[3] = a[3];
                out[4] = a[4];
                out[5] = a[5];
                out[6] = a[6];
                out[7] = a[7];
                out[8] = a[8];
                out[9] = a[9];
                out[10] = a[10];
                out[11] = a[11];
                out[12] = a[12];
                out[13] = a[13];
                out[14] = a[14];
                out[15] = a[15];
                return out;
              }
              function copy(out, a) {
                out[0] = a[0];
                out[1] = a[1];
                out[2] = a[2];
                out[3] = a[3];
                out[4] = a[4];
                out[5] = a[5];
                out[6] = a[6];
                out[7] = a[7];
                out[8] = a[8];
                out[9] = a[9];
                out[10] = a[10];
                out[11] = a[11];
                out[12] = a[12];
                out[13] = a[13];
                out[14] = a[14];
                out[15] = a[15];
                return out;
              }
              function fromValues(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
                var out = new glMatrix.ARRAY_TYPE(16);
                out[0] = m00;
                out[1] = m01;
                out[2] = m02;
                out[3] = m03;
                out[4] = m10;
                out[5] = m11;
                out[6] = m12;
                out[7] = m13;
                out[8] = m20;
                out[9] = m21;
                out[10] = m22;
                out[11] = m23;
                out[12] = m30;
                out[13] = m31;
                out[14] = m32;
                out[15] = m33;
                return out;
              }
              function set(out, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
                out[0] = m00;
                out[1] = m01;
                out[2] = m02;
                out[3] = m03;
                out[4] = m10;
                out[5] = m11;
                out[6] = m12;
                out[7] = m13;
                out[8] = m20;
                out[9] = m21;
                out[10] = m22;
                out[11] = m23;
                out[12] = m30;
                out[13] = m31;
                out[14] = m32;
                out[15] = m33;
                return out;
              }
              function identity(out) {
                out[0] = 1;
                out[1] = 0;
                out[2] = 0;
                out[3] = 0;
                out[4] = 0;
                out[5] = 1;
                out[6] = 0;
                out[7] = 0;
                out[8] = 0;
                out[9] = 0;
                out[10] = 1;
                out[11] = 0;
                out[12] = 0;
                out[13] = 0;
                out[14] = 0;
                out[15] = 1;
                return out;
              }
              function transpose(out, a) {
                if (out === a) {
                  var a01 = a[1], a02 = a[2], a03 = a[3];
                  var a12 = a[6], a13 = a[7];
                  var a23 = a[11];
                  out[1] = a[4];
                  out[2] = a[8];
                  out[3] = a[12];
                  out[4] = a01;
                  out[6] = a[9];
                  out[7] = a[13];
                  out[8] = a02;
                  out[9] = a12;
                  out[11] = a[14];
                  out[12] = a03;
                  out[13] = a13;
                  out[14] = a23;
                } else {
                  out[0] = a[0];
                  out[1] = a[4];
                  out[2] = a[8];
                  out[3] = a[12];
                  out[4] = a[1];
                  out[5] = a[5];
                  out[6] = a[9];
                  out[7] = a[13];
                  out[8] = a[2];
                  out[9] = a[6];
                  out[10] = a[10];
                  out[11] = a[14];
                  out[12] = a[3];
                  out[13] = a[7];
                  out[14] = a[11];
                  out[15] = a[15];
                }
                return out;
              }
              function invert(out, a) {
                var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
                var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
                var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
                var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
                var b00 = a00 * a11 - a01 * a10;
                var b01 = a00 * a12 - a02 * a10;
                var b02 = a00 * a13 - a03 * a10;
                var b03 = a01 * a12 - a02 * a11;
                var b04 = a01 * a13 - a03 * a11;
                var b05 = a02 * a13 - a03 * a12;
                var b06 = a20 * a31 - a21 * a30;
                var b07 = a20 * a32 - a22 * a30;
                var b08 = a20 * a33 - a23 * a30;
                var b09 = a21 * a32 - a22 * a31;
                var b10 = a21 * a33 - a23 * a31;
                var b11 = a22 * a33 - a23 * a32;
                var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
                if (!det) {
                  return null;
                }
                det = 1 / det;
                out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
                out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
                out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
                out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
                out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
                out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
                out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
                out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
                out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
                out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
                out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
                out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
                out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
                out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
                out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
                out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
                return out;
              }
              function adjoint(out, a) {
                var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
                var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
                var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
                var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
                out[0] = a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22);
                out[1] = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
                out[2] = a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12);
                out[3] = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
                out[4] = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
                out[5] = a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22);
                out[6] = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
                out[7] = a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12);
                out[8] = a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21);
                out[9] = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
                out[10] = a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11);
                out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
                out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
                out[13] = a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21);
                out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
                out[15] = a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11);
                return out;
              }
              function determinant(a) {
                var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
                var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
                var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
                var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
                var b00 = a00 * a11 - a01 * a10;
                var b01 = a00 * a12 - a02 * a10;
                var b02 = a00 * a13 - a03 * a10;
                var b03 = a01 * a12 - a02 * a11;
                var b04 = a01 * a13 - a03 * a11;
                var b05 = a02 * a13 - a03 * a12;
                var b06 = a20 * a31 - a21 * a30;
                var b07 = a20 * a32 - a22 * a30;
                var b08 = a20 * a33 - a23 * a30;
                var b09 = a21 * a32 - a22 * a31;
                var b10 = a21 * a33 - a23 * a31;
                var b11 = a22 * a33 - a23 * a32;
                return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
              }
              function multiply(out, a, b) {
                var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
                var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
                var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
                var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
                var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
                out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
                out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
                out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
                out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
                b0 = b[4];
                b1 = b[5];
                b2 = b[6];
                b3 = b[7];
                out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
                out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
                out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
                out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
                b0 = b[8];
                b1 = b[9];
                b2 = b[10];
                b3 = b[11];
                out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
                out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
                out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
                out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
                b0 = b[12];
                b1 = b[13];
                b2 = b[14];
                b3 = b[15];
                out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
                out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
                out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
                out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
                return out;
              }
              function translate(out, a, v) {
                var x = v[0], y = v[1], z = v[2];
                var a00 = void 0, a01 = void 0, a02 = void 0, a03 = void 0;
                var a10 = void 0, a11 = void 0, a12 = void 0, a13 = void 0;
                var a20 = void 0, a21 = void 0, a22 = void 0, a23 = void 0;
                if (a === out) {
                  out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
                  out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
                  out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
                  out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
                } else {
                  a00 = a[0];
                  a01 = a[1];
                  a02 = a[2];
                  a03 = a[3];
                  a10 = a[4];
                  a11 = a[5];
                  a12 = a[6];
                  a13 = a[7];
                  a20 = a[8];
                  a21 = a[9];
                  a22 = a[10];
                  a23 = a[11];
                  out[0] = a00;
                  out[1] = a01;
                  out[2] = a02;
                  out[3] = a03;
                  out[4] = a10;
                  out[5] = a11;
                  out[6] = a12;
                  out[7] = a13;
                  out[8] = a20;
                  out[9] = a21;
                  out[10] = a22;
                  out[11] = a23;
                  out[12] = a00 * x + a10 * y + a20 * z + a[12];
                  out[13] = a01 * x + a11 * y + a21 * z + a[13];
                  out[14] = a02 * x + a12 * y + a22 * z + a[14];
                  out[15] = a03 * x + a13 * y + a23 * z + a[15];
                }
                return out;
              }
              function scale(out, a, v) {
                var x = v[0], y = v[1], z = v[2];
                out[0] = a[0] * x;
                out[1] = a[1] * x;
                out[2] = a[2] * x;
                out[3] = a[3] * x;
                out[4] = a[4] * y;
                out[5] = a[5] * y;
                out[6] = a[6] * y;
                out[7] = a[7] * y;
                out[8] = a[8] * z;
                out[9] = a[9] * z;
                out[10] = a[10] * z;
                out[11] = a[11] * z;
                out[12] = a[12];
                out[13] = a[13];
                out[14] = a[14];
                out[15] = a[15];
                return out;
              }
              function rotate(out, a, rad, axis) {
                var x = axis[0], y = axis[1], z = axis[2];
                var len = Math.sqrt(x * x + y * y + z * z);
                var s = void 0, c = void 0, t = void 0;
                var a00 = void 0, a01 = void 0, a02 = void 0, a03 = void 0;
                var a10 = void 0, a11 = void 0, a12 = void 0, a13 = void 0;
                var a20 = void 0, a21 = void 0, a22 = void 0, a23 = void 0;
                var b00 = void 0, b01 = void 0, b02 = void 0;
                var b10 = void 0, b11 = void 0, b12 = void 0;
                var b20 = void 0, b21 = void 0, b22 = void 0;
                if (Math.abs(len) < glMatrix.EPSILON) {
                  return null;
                }
                len = 1 / len;
                x *= len;
                y *= len;
                z *= len;
                s = Math.sin(rad);
                c = Math.cos(rad);
                t = 1 - c;
                a00 = a[0];
                a01 = a[1];
                a02 = a[2];
                a03 = a[3];
                a10 = a[4];
                a11 = a[5];
                a12 = a[6];
                a13 = a[7];
                a20 = a[8];
                a21 = a[9];
                a22 = a[10];
                a23 = a[11];
                b00 = x * x * t + c;
                b01 = y * x * t + z * s;
                b02 = z * x * t - y * s;
                b10 = x * y * t - z * s;
                b11 = y * y * t + c;
                b12 = z * y * t + x * s;
                b20 = x * z * t + y * s;
                b21 = y * z * t - x * s;
                b22 = z * z * t + c;
                out[0] = a00 * b00 + a10 * b01 + a20 * b02;
                out[1] = a01 * b00 + a11 * b01 + a21 * b02;
                out[2] = a02 * b00 + a12 * b01 + a22 * b02;
                out[3] = a03 * b00 + a13 * b01 + a23 * b02;
                out[4] = a00 * b10 + a10 * b11 + a20 * b12;
                out[5] = a01 * b10 + a11 * b11 + a21 * b12;
                out[6] = a02 * b10 + a12 * b11 + a22 * b12;
                out[7] = a03 * b10 + a13 * b11 + a23 * b12;
                out[8] = a00 * b20 + a10 * b21 + a20 * b22;
                out[9] = a01 * b20 + a11 * b21 + a21 * b22;
                out[10] = a02 * b20 + a12 * b21 + a22 * b22;
                out[11] = a03 * b20 + a13 * b21 + a23 * b22;
                if (a !== out) {
                  out[12] = a[12];
                  out[13] = a[13];
                  out[14] = a[14];
                  out[15] = a[15];
                }
                return out;
              }
              function rotateX(out, a, rad) {
                var s = Math.sin(rad);
                var c = Math.cos(rad);
                var a10 = a[4];
                var a11 = a[5];
                var a12 = a[6];
                var a13 = a[7];
                var a20 = a[8];
                var a21 = a[9];
                var a22 = a[10];
                var a23 = a[11];
                if (a !== out) {
                  out[0] = a[0];
                  out[1] = a[1];
                  out[2] = a[2];
                  out[3] = a[3];
                  out[12] = a[12];
                  out[13] = a[13];
                  out[14] = a[14];
                  out[15] = a[15];
                }
                out[4] = a10 * c + a20 * s;
                out[5] = a11 * c + a21 * s;
                out[6] = a12 * c + a22 * s;
                out[7] = a13 * c + a23 * s;
                out[8] = a20 * c - a10 * s;
                out[9] = a21 * c - a11 * s;
                out[10] = a22 * c - a12 * s;
                out[11] = a23 * c - a13 * s;
                return out;
              }
              function rotateY(out, a, rad) {
                var s = Math.sin(rad);
                var c = Math.cos(rad);
                var a00 = a[0];
                var a01 = a[1];
                var a02 = a[2];
                var a03 = a[3];
                var a20 = a[8];
                var a21 = a[9];
                var a22 = a[10];
                var a23 = a[11];
                if (a !== out) {
                  out[4] = a[4];
                  out[5] = a[5];
                  out[6] = a[6];
                  out[7] = a[7];
                  out[12] = a[12];
                  out[13] = a[13];
                  out[14] = a[14];
                  out[15] = a[15];
                }
                out[0] = a00 * c - a20 * s;
                out[1] = a01 * c - a21 * s;
                out[2] = a02 * c - a22 * s;
                out[3] = a03 * c - a23 * s;
                out[8] = a00 * s + a20 * c;
                out[9] = a01 * s + a21 * c;
                out[10] = a02 * s + a22 * c;
                out[11] = a03 * s + a23 * c;
                return out;
              }
              function rotateZ(out, a, rad) {
                var s = Math.sin(rad);
                var c = Math.cos(rad);
                var a00 = a[0];
                var a01 = a[1];
                var a02 = a[2];
                var a03 = a[3];
                var a10 = a[4];
                var a11 = a[5];
                var a12 = a[6];
                var a13 = a[7];
                if (a !== out) {
                  out[8] = a[8];
                  out[9] = a[9];
                  out[10] = a[10];
                  out[11] = a[11];
                  out[12] = a[12];
                  out[13] = a[13];
                  out[14] = a[14];
                  out[15] = a[15];
                }
                out[0] = a00 * c + a10 * s;
                out[1] = a01 * c + a11 * s;
                out[2] = a02 * c + a12 * s;
                out[3] = a03 * c + a13 * s;
                out[4] = a10 * c - a00 * s;
                out[5] = a11 * c - a01 * s;
                out[6] = a12 * c - a02 * s;
                out[7] = a13 * c - a03 * s;
                return out;
              }
              function fromTranslation(out, v) {
                out[0] = 1;
                out[1] = 0;
                out[2] = 0;
                out[3] = 0;
                out[4] = 0;
                out[5] = 1;
                out[6] = 0;
                out[7] = 0;
                out[8] = 0;
                out[9] = 0;
                out[10] = 1;
                out[11] = 0;
                out[12] = v[0];
                out[13] = v[1];
                out[14] = v[2];
                out[15] = 1;
                return out;
              }
              function fromScaling(out, v) {
                out[0] = v[0];
                out[1] = 0;
                out[2] = 0;
                out[3] = 0;
                out[4] = 0;
                out[5] = v[1];
                out[6] = 0;
                out[7] = 0;
                out[8] = 0;
                out[9] = 0;
                out[10] = v[2];
                out[11] = 0;
                out[12] = 0;
                out[13] = 0;
                out[14] = 0;
                out[15] = 1;
                return out;
              }
              function fromRotation(out, rad, axis) {
                var x = axis[0], y = axis[1], z = axis[2];
                var len = Math.sqrt(x * x + y * y + z * z);
                var s = void 0, c = void 0, t = void 0;
                if (Math.abs(len) < glMatrix.EPSILON) {
                  return null;
                }
                len = 1 / len;
                x *= len;
                y *= len;
                z *= len;
                s = Math.sin(rad);
                c = Math.cos(rad);
                t = 1 - c;
                out[0] = x * x * t + c;
                out[1] = y * x * t + z * s;
                out[2] = z * x * t - y * s;
                out[3] = 0;
                out[4] = x * y * t - z * s;
                out[5] = y * y * t + c;
                out[6] = z * y * t + x * s;
                out[7] = 0;
                out[8] = x * z * t + y * s;
                out[9] = y * z * t - x * s;
                out[10] = z * z * t + c;
                out[11] = 0;
                out[12] = 0;
                out[13] = 0;
                out[14] = 0;
                out[15] = 1;
                return out;
              }
              function fromXRotation(out, rad) {
                var s = Math.sin(rad);
                var c = Math.cos(rad);
                out[0] = 1;
                out[1] = 0;
                out[2] = 0;
                out[3] = 0;
                out[4] = 0;
                out[5] = c;
                out[6] = s;
                out[7] = 0;
                out[8] = 0;
                out[9] = -s;
                out[10] = c;
                out[11] = 0;
                out[12] = 0;
                out[13] = 0;
                out[14] = 0;
                out[15] = 1;
                return out;
              }
              function fromYRotation(out, rad) {
                var s = Math.sin(rad);
                var c = Math.cos(rad);
                out[0] = c;
                out[1] = 0;
                out[2] = -s;
                out[3] = 0;
                out[4] = 0;
                out[5] = 1;
                out[6] = 0;
                out[7] = 0;
                out[8] = s;
                out[9] = 0;
                out[10] = c;
                out[11] = 0;
                out[12] = 0;
                out[13] = 0;
                out[14] = 0;
                out[15] = 1;
                return out;
              }
              function fromZRotation(out, rad) {
                var s = Math.sin(rad);
                var c = Math.cos(rad);
                out[0] = c;
                out[1] = s;
                out[2] = 0;
                out[3] = 0;
                out[4] = -s;
                out[5] = c;
                out[6] = 0;
                out[7] = 0;
                out[8] = 0;
                out[9] = 0;
                out[10] = 1;
                out[11] = 0;
                out[12] = 0;
                out[13] = 0;
                out[14] = 0;
                out[15] = 1;
                return out;
              }
              function fromRotationTranslation(out, q, v) {
                var x = q[0], y = q[1], z = q[2], w = q[3];
                var x2 = x + x;
                var y2 = y + y;
                var z2 = z + z;
                var xx = x * x2;
                var xy = x * y2;
                var xz = x * z2;
                var yy = y * y2;
                var yz = y * z2;
                var zz = z * z2;
                var wx = w * x2;
                var wy = w * y2;
                var wz = w * z2;
                out[0] = 1 - (yy + zz);
                out[1] = xy + wz;
                out[2] = xz - wy;
                out[3] = 0;
                out[4] = xy - wz;
                out[5] = 1 - (xx + zz);
                out[6] = yz + wx;
                out[7] = 0;
                out[8] = xz + wy;
                out[9] = yz - wx;
                out[10] = 1 - (xx + yy);
                out[11] = 0;
                out[12] = v[0];
                out[13] = v[1];
                out[14] = v[2];
                out[15] = 1;
                return out;
              }
              function getTranslation(out, mat) {
                out[0] = mat[12];
                out[1] = mat[13];
                out[2] = mat[14];
                return out;
              }
              function getScaling(out, mat) {
                var m11 = mat[0];
                var m12 = mat[1];
                var m13 = mat[2];
                var m21 = mat[4];
                var m22 = mat[5];
                var m23 = mat[6];
                var m31 = mat[8];
                var m32 = mat[9];
                var m33 = mat[10];
                out[0] = Math.sqrt(m11 * m11 + m12 * m12 + m13 * m13);
                out[1] = Math.sqrt(m21 * m21 + m22 * m22 + m23 * m23);
                out[2] = Math.sqrt(m31 * m31 + m32 * m32 + m33 * m33);
                return out;
              }
              function getRotation(out, mat) {
                var trace = mat[0] + mat[5] + mat[10];
                var S = 0;
                if (trace > 0) {
                  S = Math.sqrt(trace + 1) * 2;
                  out[3] = 0.25 * S;
                  out[0] = (mat[6] - mat[9]) / S;
                  out[1] = (mat[8] - mat[2]) / S;
                  out[2] = (mat[1] - mat[4]) / S;
                } else if (mat[0] > mat[5] & mat[0] > mat[10]) {
                  S = Math.sqrt(1 + mat[0] - mat[5] - mat[10]) * 2;
                  out[3] = (mat[6] - mat[9]) / S;
                  out[0] = 0.25 * S;
                  out[1] = (mat[1] + mat[4]) / S;
                  out[2] = (mat[8] + mat[2]) / S;
                } else if (mat[5] > mat[10]) {
                  S = Math.sqrt(1 + mat[5] - mat[0] - mat[10]) * 2;
                  out[3] = (mat[8] - mat[2]) / S;
                  out[0] = (mat[1] + mat[4]) / S;
                  out[1] = 0.25 * S;
                  out[2] = (mat[6] + mat[9]) / S;
                } else {
                  S = Math.sqrt(1 + mat[10] - mat[0] - mat[5]) * 2;
                  out[3] = (mat[1] - mat[4]) / S;
                  out[0] = (mat[8] + mat[2]) / S;
                  out[1] = (mat[6] + mat[9]) / S;
                  out[2] = 0.25 * S;
                }
                return out;
              }
              function fromRotationTranslationScale(out, q, v, s) {
                var x = q[0], y = q[1], z = q[2], w = q[3];
                var x2 = x + x;
                var y2 = y + y;
                var z2 = z + z;
                var xx = x * x2;
                var xy = x * y2;
                var xz = x * z2;
                var yy = y * y2;
                var yz = y * z2;
                var zz = z * z2;
                var wx = w * x2;
                var wy = w * y2;
                var wz = w * z2;
                var sx = s[0];
                var sy = s[1];
                var sz = s[2];
                out[0] = (1 - (yy + zz)) * sx;
                out[1] = (xy + wz) * sx;
                out[2] = (xz - wy) * sx;
                out[3] = 0;
                out[4] = (xy - wz) * sy;
                out[5] = (1 - (xx + zz)) * sy;
                out[6] = (yz + wx) * sy;
                out[7] = 0;
                out[8] = (xz + wy) * sz;
                out[9] = (yz - wx) * sz;
                out[10] = (1 - (xx + yy)) * sz;
                out[11] = 0;
                out[12] = v[0];
                out[13] = v[1];
                out[14] = v[2];
                out[15] = 1;
                return out;
              }
              function fromRotationTranslationScaleOrigin(out, q, v, s, o) {
                var x = q[0], y = q[1], z = q[2], w = q[3];
                var x2 = x + x;
                var y2 = y + y;
                var z2 = z + z;
                var xx = x * x2;
                var xy = x * y2;
                var xz = x * z2;
                var yy = y * y2;
                var yz = y * z2;
                var zz = z * z2;
                var wx = w * x2;
                var wy = w * y2;
                var wz = w * z2;
                var sx = s[0];
                var sy = s[1];
                var sz = s[2];
                var ox = o[0];
                var oy = o[1];
                var oz = o[2];
                out[0] = (1 - (yy + zz)) * sx;
                out[1] = (xy + wz) * sx;
                out[2] = (xz - wy) * sx;
                out[3] = 0;
                out[4] = (xy - wz) * sy;
                out[5] = (1 - (xx + zz)) * sy;
                out[6] = (yz + wx) * sy;
                out[7] = 0;
                out[8] = (xz + wy) * sz;
                out[9] = (yz - wx) * sz;
                out[10] = (1 - (xx + yy)) * sz;
                out[11] = 0;
                out[12] = v[0] + ox - (out[0] * ox + out[4] * oy + out[8] * oz);
                out[13] = v[1] + oy - (out[1] * ox + out[5] * oy + out[9] * oz);
                out[14] = v[2] + oz - (out[2] * ox + out[6] * oy + out[10] * oz);
                out[15] = 1;
                return out;
              }
              function fromQuat(out, q) {
                var x = q[0], y = q[1], z = q[2], w = q[3];
                var x2 = x + x;
                var y2 = y + y;
                var z2 = z + z;
                var xx = x * x2;
                var yx = y * x2;
                var yy = y * y2;
                var zx = z * x2;
                var zy = z * y2;
                var zz = z * z2;
                var wx = w * x2;
                var wy = w * y2;
                var wz = w * z2;
                out[0] = 1 - yy - zz;
                out[1] = yx + wz;
                out[2] = zx - wy;
                out[3] = 0;
                out[4] = yx - wz;
                out[5] = 1 - xx - zz;
                out[6] = zy + wx;
                out[7] = 0;
                out[8] = zx + wy;
                out[9] = zy - wx;
                out[10] = 1 - xx - yy;
                out[11] = 0;
                out[12] = 0;
                out[13] = 0;
                out[14] = 0;
                out[15] = 1;
                return out;
              }
              function frustum(out, left, right, bottom, top, near, far) {
                var rl = 1 / (right - left);
                var tb = 1 / (top - bottom);
                var nf = 1 / (near - far);
                out[0] = near * 2 * rl;
                out[1] = 0;
                out[2] = 0;
                out[3] = 0;
                out[4] = 0;
                out[5] = near * 2 * tb;
                out[6] = 0;
                out[7] = 0;
                out[8] = (right + left) * rl;
                out[9] = (top + bottom) * tb;
                out[10] = (far + near) * nf;
                out[11] = -1;
                out[12] = 0;
                out[13] = 0;
                out[14] = far * near * 2 * nf;
                out[15] = 0;
                return out;
              }
              function perspective(out, fovy, aspect, near, far) {
                var f = 1 / Math.tan(fovy / 2);
                var nf = 1 / (near - far);
                out[0] = f / aspect;
                out[1] = 0;
                out[2] = 0;
                out[3] = 0;
                out[4] = 0;
                out[5] = f;
                out[6] = 0;
                out[7] = 0;
                out[8] = 0;
                out[9] = 0;
                out[10] = (far + near) * nf;
                out[11] = -1;
                out[12] = 0;
                out[13] = 0;
                out[14] = 2 * far * near * nf;
                out[15] = 0;
                return out;
              }
              function perspectiveFromFieldOfView(out, fov, near, far) {
                var upTan = Math.tan(fov.upDegrees * Math.PI / 180);
                var downTan = Math.tan(fov.downDegrees * Math.PI / 180);
                var leftTan = Math.tan(fov.leftDegrees * Math.PI / 180);
                var rightTan = Math.tan(fov.rightDegrees * Math.PI / 180);
                var xScale = 2 / (leftTan + rightTan);
                var yScale = 2 / (upTan + downTan);
                out[0] = xScale;
                out[1] = 0;
                out[2] = 0;
                out[3] = 0;
                out[4] = 0;
                out[5] = yScale;
                out[6] = 0;
                out[7] = 0;
                out[8] = -((leftTan - rightTan) * xScale * 0.5);
                out[9] = (upTan - downTan) * yScale * 0.5;
                out[10] = far / (near - far);
                out[11] = -1;
                out[12] = 0;
                out[13] = 0;
                out[14] = far * near / (near - far);
                out[15] = 0;
                return out;
              }
              function ortho(out, left, right, bottom, top, near, far) {
                var lr = 1 / (left - right);
                var bt = 1 / (bottom - top);
                var nf = 1 / (near - far);
                out[0] = -2 * lr;
                out[1] = 0;
                out[2] = 0;
                out[3] = 0;
                out[4] = 0;
                out[5] = -2 * bt;
                out[6] = 0;
                out[7] = 0;
                out[8] = 0;
                out[9] = 0;
                out[10] = 2 * nf;
                out[11] = 0;
                out[12] = (left + right) * lr;
                out[13] = (top + bottom) * bt;
                out[14] = (far + near) * nf;
                out[15] = 1;
                return out;
              }
              function lookAt(out, eye, center, up) {
                var x0 = void 0, x1 = void 0, x2 = void 0, y0 = void 0, y1 = void 0, y2 = void 0, z0 = void 0, z1 = void 0, z2 = void 0, len = void 0;
                var eyex = eye[0];
                var eyey = eye[1];
                var eyez = eye[2];
                var upx = up[0];
                var upy = up[1];
                var upz = up[2];
                var centerx = center[0];
                var centery = center[1];
                var centerz = center[2];
                if (Math.abs(eyex - centerx) < glMatrix.EPSILON && Math.abs(eyey - centery) < glMatrix.EPSILON && Math.abs(eyez - centerz) < glMatrix.EPSILON) {
                  return mat4.identity(out);
                }
                z0 = eyex - centerx;
                z1 = eyey - centery;
                z2 = eyez - centerz;
                len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
                z0 *= len;
                z1 *= len;
                z2 *= len;
                x0 = upy * z2 - upz * z1;
                x1 = upz * z0 - upx * z2;
                x2 = upx * z1 - upy * z0;
                len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
                if (!len) {
                  x0 = 0;
                  x1 = 0;
                  x2 = 0;
                } else {
                  len = 1 / len;
                  x0 *= len;
                  x1 *= len;
                  x2 *= len;
                }
                y0 = z1 * x2 - z2 * x1;
                y1 = z2 * x0 - z0 * x2;
                y2 = z0 * x1 - z1 * x0;
                len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
                if (!len) {
                  y0 = 0;
                  y1 = 0;
                  y2 = 0;
                } else {
                  len = 1 / len;
                  y0 *= len;
                  y1 *= len;
                  y2 *= len;
                }
                out[0] = x0;
                out[1] = y0;
                out[2] = z0;
                out[3] = 0;
                out[4] = x1;
                out[5] = y1;
                out[6] = z1;
                out[7] = 0;
                out[8] = x2;
                out[9] = y2;
                out[10] = z2;
                out[11] = 0;
                out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
                out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
                out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
                out[15] = 1;
                return out;
              }
              function targetTo(out, eye, target, up) {
                var eyex = eye[0], eyey = eye[1], eyez = eye[2], upx = up[0], upy = up[1], upz = up[2];
                var z0 = eyex - target[0], z1 = eyey - target[1], z2 = eyez - target[2];
                var len = z0 * z0 + z1 * z1 + z2 * z2;
                if (len > 0) {
                  len = 1 / Math.sqrt(len);
                  z0 *= len;
                  z1 *= len;
                  z2 *= len;
                }
                var x0 = upy * z2 - upz * z1, x1 = upz * z0 - upx * z2, x2 = upx * z1 - upy * z0;
                out[0] = x0;
                out[1] = x1;
                out[2] = x2;
                out[3] = 0;
                out[4] = z1 * x2 - z2 * x1;
                out[5] = z2 * x0 - z0 * x2;
                out[6] = z0 * x1 - z1 * x0;
                out[7] = 0;
                out[8] = z0;
                out[9] = z1;
                out[10] = z2;
                out[11] = 0;
                out[12] = eyex;
                out[13] = eyey;
                out[14] = eyez;
                out[15] = 1;
                return out;
              }
              function str(a) {
                return "mat4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ", " + a[9] + ", " + a[10] + ", " + a[11] + ", " + a[12] + ", " + a[13] + ", " + a[14] + ", " + a[15] + ")";
              }
              function frob(a) {
                return Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2) + Math.pow(a[9], 2) + Math.pow(a[10], 2) + Math.pow(a[11], 2) + Math.pow(a[12], 2) + Math.pow(a[13], 2) + Math.pow(a[14], 2) + Math.pow(a[15], 2));
              }
              function add(out, a, b) {
                out[0] = a[0] + b[0];
                out[1] = a[1] + b[1];
                out[2] = a[2] + b[2];
                out[3] = a[3] + b[3];
                out[4] = a[4] + b[4];
                out[5] = a[5] + b[5];
                out[6] = a[6] + b[6];
                out[7] = a[7] + b[7];
                out[8] = a[8] + b[8];
                out[9] = a[9] + b[9];
                out[10] = a[10] + b[10];
                out[11] = a[11] + b[11];
                out[12] = a[12] + b[12];
                out[13] = a[13] + b[13];
                out[14] = a[14] + b[14];
                out[15] = a[15] + b[15];
                return out;
              }
              function subtract(out, a, b) {
                out[0] = a[0] - b[0];
                out[1] = a[1] - b[1];
                out[2] = a[2] - b[2];
                out[3] = a[3] - b[3];
                out[4] = a[4] - b[4];
                out[5] = a[5] - b[5];
                out[6] = a[6] - b[6];
                out[7] = a[7] - b[7];
                out[8] = a[8] - b[8];
                out[9] = a[9] - b[9];
                out[10] = a[10] - b[10];
                out[11] = a[11] - b[11];
                out[12] = a[12] - b[12];
                out[13] = a[13] - b[13];
                out[14] = a[14] - b[14];
                out[15] = a[15] - b[15];
                return out;
              }
              function multiplyScalar(out, a, b) {
                out[0] = a[0] * b;
                out[1] = a[1] * b;
                out[2] = a[2] * b;
                out[3] = a[3] * b;
                out[4] = a[4] * b;
                out[5] = a[5] * b;
                out[6] = a[6] * b;
                out[7] = a[7] * b;
                out[8] = a[8] * b;
                out[9] = a[9] * b;
                out[10] = a[10] * b;
                out[11] = a[11] * b;
                out[12] = a[12] * b;
                out[13] = a[13] * b;
                out[14] = a[14] * b;
                out[15] = a[15] * b;
                return out;
              }
              function multiplyScalarAndAdd(out, a, b, scale2) {
                out[0] = a[0] + b[0] * scale2;
                out[1] = a[1] + b[1] * scale2;
                out[2] = a[2] + b[2] * scale2;
                out[3] = a[3] + b[3] * scale2;
                out[4] = a[4] + b[4] * scale2;
                out[5] = a[5] + b[5] * scale2;
                out[6] = a[6] + b[6] * scale2;
                out[7] = a[7] + b[7] * scale2;
                out[8] = a[8] + b[8] * scale2;
                out[9] = a[9] + b[9] * scale2;
                out[10] = a[10] + b[10] * scale2;
                out[11] = a[11] + b[11] * scale2;
                out[12] = a[12] + b[12] * scale2;
                out[13] = a[13] + b[13] * scale2;
                out[14] = a[14] + b[14] * scale2;
                out[15] = a[15] + b[15] * scale2;
                return out;
              }
              function exactEquals(a, b) {
                return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8] && a[9] === b[9] && a[10] === b[10] && a[11] === b[11] && a[12] === b[12] && a[13] === b[13] && a[14] === b[14] && a[15] === b[15];
              }
              function equals(a, b) {
                var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
                var a4 = a[4], a5 = a[5], a6 = a[6], a7 = a[7];
                var a8 = a[8], a9 = a[9], a10 = a[10], a11 = a[11];
                var a12 = a[12], a13 = a[13], a14 = a[14], a15 = a[15];
                var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
                var b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7];
                var b8 = b[8], b9 = b[9], b10 = b[10], b11 = b[11];
                var b12 = b[12], b13 = b[13], b14 = b[14], b15 = b[15];
                return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix.EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= glMatrix.EPSILON * Math.max(1, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= glMatrix.EPSILON * Math.max(1, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= glMatrix.EPSILON * Math.max(1, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= glMatrix.EPSILON * Math.max(1, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= glMatrix.EPSILON * Math.max(1, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= glMatrix.EPSILON * Math.max(1, Math.abs(a8), Math.abs(b8)) && Math.abs(a9 - b9) <= glMatrix.EPSILON * Math.max(1, Math.abs(a9), Math.abs(b9)) && Math.abs(a10 - b10) <= glMatrix.EPSILON * Math.max(1, Math.abs(a10), Math.abs(b10)) && Math.abs(a11 - b11) <= glMatrix.EPSILON * Math.max(1, Math.abs(a11), Math.abs(b11)) && Math.abs(a12 - b12) <= glMatrix.EPSILON * Math.max(1, Math.abs(a12), Math.abs(b12)) && Math.abs(a13 - b13) <= glMatrix.EPSILON * Math.max(1, Math.abs(a13), Math.abs(b13)) && Math.abs(a14 - b14) <= glMatrix.EPSILON * Math.max(1, Math.abs(a14), Math.abs(b14)) && Math.abs(a15 - b15) <= glMatrix.EPSILON * Math.max(1, Math.abs(a15), Math.abs(b15));
              }
              exports$14.mul = multiply;
              exports$14.sub = subtract;
            },
            /* 8 */
            /***/
            function(module4, exports$14, __webpack_require__) {
              Object.defineProperty(exports$14, "__esModule", {
                value: true
              });
              exports$14.setAxes = exports$14.sqlerp = exports$14.rotationTo = exports$14.equals = exports$14.exactEquals = exports$14.normalize = exports$14.sqrLen = exports$14.squaredLength = exports$14.len = exports$14.length = exports$14.lerp = exports$14.dot = exports$14.scale = exports$14.mul = exports$14.add = exports$14.set = exports$14.copy = exports$14.fromValues = exports$14.clone = void 0;
              exports$14.create = create;
              exports$14.identity = identity;
              exports$14.setAxisAngle = setAxisAngle;
              exports$14.getAxisAngle = getAxisAngle;
              exports$14.multiply = multiply;
              exports$14.rotateX = rotateX;
              exports$14.rotateY = rotateY;
              exports$14.rotateZ = rotateZ;
              exports$14.calculateW = calculateW;
              exports$14.slerp = slerp;
              exports$14.invert = invert;
              exports$14.conjugate = conjugate;
              exports$14.fromMat3 = fromMat3;
              exports$14.fromEuler = fromEuler;
              exports$14.str = str;
              var _common = __webpack_require__(0);
              var glMatrix = _interopRequireWildcard(_common);
              var _mat = __webpack_require__(1);
              var mat3 = _interopRequireWildcard(_mat);
              var _vec = __webpack_require__(2);
              var vec3 = _interopRequireWildcard(_vec);
              var _vec2 = __webpack_require__(3);
              var vec4 = _interopRequireWildcard(_vec2);
              function _interopRequireWildcard(obj) {
                if (obj && obj.__esModule) {
                  return obj;
                } else {
                  var newObj = {};
                  if (obj != null) {
                    for (var key in obj) {
                      if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                    }
                  }
                  newObj.default = obj;
                  return newObj;
                }
              }
              function create() {
                var out = new glMatrix.ARRAY_TYPE(4);
                out[0] = 0;
                out[1] = 0;
                out[2] = 0;
                out[3] = 1;
                return out;
              }
              function identity(out) {
                out[0] = 0;
                out[1] = 0;
                out[2] = 0;
                out[3] = 1;
                return out;
              }
              function setAxisAngle(out, axis, rad) {
                rad = rad * 0.5;
                var s = Math.sin(rad);
                out[0] = s * axis[0];
                out[1] = s * axis[1];
                out[2] = s * axis[2];
                out[3] = Math.cos(rad);
                return out;
              }
              function getAxisAngle(out_axis, q) {
                var rad = Math.acos(q[3]) * 2;
                var s = Math.sin(rad / 2);
                if (s != 0) {
                  out_axis[0] = q[0] / s;
                  out_axis[1] = q[1] / s;
                  out_axis[2] = q[2] / s;
                } else {
                  out_axis[0] = 1;
                  out_axis[1] = 0;
                  out_axis[2] = 0;
                }
                return rad;
              }
              function multiply(out, a, b) {
                var ax = a[0], ay = a[1], az = a[2], aw = a[3];
                var bx = b[0], by = b[1], bz = b[2], bw = b[3];
                out[0] = ax * bw + aw * bx + ay * bz - az * by;
                out[1] = ay * bw + aw * by + az * bx - ax * bz;
                out[2] = az * bw + aw * bz + ax * by - ay * bx;
                out[3] = aw * bw - ax * bx - ay * by - az * bz;
                return out;
              }
              function rotateX(out, a, rad) {
                rad *= 0.5;
                var ax = a[0], ay = a[1], az = a[2], aw = a[3];
                var bx = Math.sin(rad), bw = Math.cos(rad);
                out[0] = ax * bw + aw * bx;
                out[1] = ay * bw + az * bx;
                out[2] = az * bw - ay * bx;
                out[3] = aw * bw - ax * bx;
                return out;
              }
              function rotateY(out, a, rad) {
                rad *= 0.5;
                var ax = a[0], ay = a[1], az = a[2], aw = a[3];
                var by = Math.sin(rad), bw = Math.cos(rad);
                out[0] = ax * bw - az * by;
                out[1] = ay * bw + aw * by;
                out[2] = az * bw + ax * by;
                out[3] = aw * bw - ay * by;
                return out;
              }
              function rotateZ(out, a, rad) {
                rad *= 0.5;
                var ax = a[0], ay = a[1], az = a[2], aw = a[3];
                var bz = Math.sin(rad), bw = Math.cos(rad);
                out[0] = ax * bw + ay * bz;
                out[1] = ay * bw - ax * bz;
                out[2] = az * bw + aw * bz;
                out[3] = aw * bw - az * bz;
                return out;
              }
              function calculateW(out, a) {
                var x = a[0], y = a[1], z = a[2];
                out[0] = x;
                out[1] = y;
                out[2] = z;
                out[3] = Math.sqrt(Math.abs(1 - x * x - y * y - z * z));
                return out;
              }
              function slerp(out, a, b, t) {
                var ax = a[0], ay = a[1], az = a[2], aw = a[3];
                var bx = b[0], by = b[1], bz = b[2], bw = b[3];
                var omega = void 0, cosom = void 0, sinom = void 0, scale0 = void 0, scale1 = void 0;
                cosom = ax * bx + ay * by + az * bz + aw * bw;
                if (cosom < 0) {
                  cosom = -cosom;
                  bx = -bx;
                  by = -by;
                  bz = -bz;
                  bw = -bw;
                }
                if (1 - cosom > 1e-6) {
                  omega = Math.acos(cosom);
                  sinom = Math.sin(omega);
                  scale0 = Math.sin((1 - t) * omega) / sinom;
                  scale1 = Math.sin(t * omega) / sinom;
                } else {
                  scale0 = 1 - t;
                  scale1 = t;
                }
                out[0] = scale0 * ax + scale1 * bx;
                out[1] = scale0 * ay + scale1 * by;
                out[2] = scale0 * az + scale1 * bz;
                out[3] = scale0 * aw + scale1 * bw;
                return out;
              }
              function invert(out, a) {
                var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
                var dot = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3;
                var invDot = dot ? 1 / dot : 0;
                out[0] = -a0 * invDot;
                out[1] = -a1 * invDot;
                out[2] = -a2 * invDot;
                out[3] = a3 * invDot;
                return out;
              }
              function conjugate(out, a) {
                out[0] = -a[0];
                out[1] = -a[1];
                out[2] = -a[2];
                out[3] = a[3];
                return out;
              }
              function fromMat3(out, m) {
                var fTrace = m[0] + m[4] + m[8];
                var fRoot = void 0;
                if (fTrace > 0) {
                  fRoot = Math.sqrt(fTrace + 1);
                  out[3] = 0.5 * fRoot;
                  fRoot = 0.5 / fRoot;
                  out[0] = (m[5] - m[7]) * fRoot;
                  out[1] = (m[6] - m[2]) * fRoot;
                  out[2] = (m[1] - m[3]) * fRoot;
                } else {
                  var i = 0;
                  if (m[4] > m[0]) i = 1;
                  if (m[8] > m[i * 3 + i]) i = 2;
                  var j = (i + 1) % 3;
                  var k2 = (i + 2) % 3;
                  fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k2 * 3 + k2] + 1);
                  out[i] = 0.5 * fRoot;
                  fRoot = 0.5 / fRoot;
                  out[3] = (m[j * 3 + k2] - m[k2 * 3 + j]) * fRoot;
                  out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
                  out[k2] = (m[k2 * 3 + i] + m[i * 3 + k2]) * fRoot;
                }
                return out;
              }
              function fromEuler(out, x, y, z) {
                var halfToRad = 0.5 * Math.PI / 180;
                x *= halfToRad;
                y *= halfToRad;
                z *= halfToRad;
                var sx = Math.sin(x);
                var cx = Math.cos(x);
                var sy = Math.sin(y);
                var cy = Math.cos(y);
                var sz = Math.sin(z);
                var cz = Math.cos(z);
                out[0] = sx * cy * cz - cx * sy * sz;
                out[1] = cx * sy * cz + sx * cy * sz;
                out[2] = cx * cy * sz - sx * sy * cz;
                out[3] = cx * cy * cz + sx * sy * sz;
                return out;
              }
              function str(a) {
                return "quat(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
              }
              exports$14.clone = vec4.clone;
              exports$14.fromValues = vec4.fromValues;
              exports$14.copy = vec4.copy;
              exports$14.set = vec4.set;
              exports$14.add = vec4.add;
              exports$14.mul = multiply;
              exports$14.scale = vec4.scale;
              exports$14.dot = vec4.dot;
              exports$14.lerp = vec4.lerp;
              var length = exports$14.length = vec4.length;
              exports$14.len = length;
              var squaredLength = exports$14.squaredLength = vec4.squaredLength;
              exports$14.sqrLen = squaredLength;
              var normalize = exports$14.normalize = vec4.normalize;
              exports$14.exactEquals = vec4.exactEquals;
              exports$14.equals = vec4.equals;
              exports$14.rotationTo = function() {
                var tmpvec3 = vec3.create();
                var xUnitVec3 = vec3.fromValues(1, 0, 0);
                var yUnitVec3 = vec3.fromValues(0, 1, 0);
                return function(out, a, b) {
                  var dot = vec3.dot(a, b);
                  if (dot < -0.999999) {
                    vec3.cross(tmpvec3, xUnitVec3, a);
                    if (vec3.len(tmpvec3) < 1e-6) vec3.cross(tmpvec3, yUnitVec3, a);
                    vec3.normalize(tmpvec3, tmpvec3);
                    setAxisAngle(out, tmpvec3, Math.PI);
                    return out;
                  } else if (dot > 0.999999) {
                    out[0] = 0;
                    out[1] = 0;
                    out[2] = 0;
                    out[3] = 1;
                    return out;
                  } else {
                    vec3.cross(tmpvec3, a, b);
                    out[0] = tmpvec3[0];
                    out[1] = tmpvec3[1];
                    out[2] = tmpvec3[2];
                    out[3] = 1 + dot;
                    return normalize(out, out);
                  }
                };
              }();
              exports$14.sqlerp = function() {
                var temp1 = create();
                var temp2 = create();
                return function(out, a, b, c, d, t) {
                  slerp(temp1, a, d, t);
                  slerp(temp2, b, c, t);
                  slerp(out, temp1, temp2, 2 * t * (1 - t));
                  return out;
                };
              }();
              exports$14.setAxes = function() {
                var matr = mat3.create();
                return function(out, view, right, up) {
                  matr[0] = right[0];
                  matr[3] = right[1];
                  matr[6] = right[2];
                  matr[1] = up[0];
                  matr[4] = up[1];
                  matr[7] = up[2];
                  matr[2] = -view[0];
                  matr[5] = -view[1];
                  matr[8] = -view[2];
                  return normalize(out, fromMat3(out, matr));
                };
              }();
            },
            /* 9 */
            /***/
            function(module4, exports$14, __webpack_require__) {
              Object.defineProperty(exports$14, "__esModule", {
                value: true
              });
              exports$14.forEach = exports$14.sqrLen = exports$14.sqrDist = exports$14.dist = exports$14.div = exports$14.mul = exports$14.sub = exports$14.len = void 0;
              exports$14.create = create;
              exports$14.clone = clone;
              exports$14.fromValues = fromValues;
              exports$14.copy = copy;
              exports$14.set = set;
              exports$14.add = add;
              exports$14.subtract = subtract;
              exports$14.multiply = multiply;
              exports$14.divide = divide;
              exports$14.ceil = ceil;
              exports$14.floor = floor;
              exports$14.min = min;
              exports$14.max = max;
              exports$14.round = round;
              exports$14.scale = scale;
              exports$14.scaleAndAdd = scaleAndAdd;
              exports$14.distance = distance;
              exports$14.squaredDistance = squaredDistance;
              exports$14.length = length;
              exports$14.squaredLength = squaredLength;
              exports$14.negate = negate;
              exports$14.inverse = inverse;
              exports$14.normalize = normalize;
              exports$14.dot = dot;
              exports$14.cross = cross;
              exports$14.lerp = lerp;
              exports$14.random = random;
              exports$14.transformMat2 = transformMat2;
              exports$14.transformMat2d = transformMat2d;
              exports$14.transformMat3 = transformMat3;
              exports$14.transformMat4 = transformMat4;
              exports$14.str = str;
              exports$14.exactEquals = exactEquals;
              exports$14.equals = equals;
              var _common = __webpack_require__(0);
              var glMatrix = _interopRequireWildcard(_common);
              function _interopRequireWildcard(obj) {
                if (obj && obj.__esModule) {
                  return obj;
                } else {
                  var newObj = {};
                  if (obj != null) {
                    for (var key in obj) {
                      if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                    }
                  }
                  newObj.default = obj;
                  return newObj;
                }
              }
              function create() {
                var out = new glMatrix.ARRAY_TYPE(2);
                out[0] = 0;
                out[1] = 0;
                return out;
              }
              function clone(a) {
                var out = new glMatrix.ARRAY_TYPE(2);
                out[0] = a[0];
                out[1] = a[1];
                return out;
              }
              function fromValues(x, y) {
                var out = new glMatrix.ARRAY_TYPE(2);
                out[0] = x;
                out[1] = y;
                return out;
              }
              function copy(out, a) {
                out[0] = a[0];
                out[1] = a[1];
                return out;
              }
              function set(out, x, y) {
                out[0] = x;
                out[1] = y;
                return out;
              }
              function add(out, a, b) {
                out[0] = a[0] + b[0];
                out[1] = a[1] + b[1];
                return out;
              }
              function subtract(out, a, b) {
                out[0] = a[0] - b[0];
                out[1] = a[1] - b[1];
                return out;
              }
              function multiply(out, a, b) {
                out[0] = a[0] * b[0];
                out[1] = a[1] * b[1];
                return out;
              }
              function divide(out, a, b) {
                out[0] = a[0] / b[0];
                out[1] = a[1] / b[1];
                return out;
              }
              function ceil(out, a) {
                out[0] = Math.ceil(a[0]);
                out[1] = Math.ceil(a[1]);
                return out;
              }
              function floor(out, a) {
                out[0] = Math.floor(a[0]);
                out[1] = Math.floor(a[1]);
                return out;
              }
              function min(out, a, b) {
                out[0] = Math.min(a[0], b[0]);
                out[1] = Math.min(a[1], b[1]);
                return out;
              }
              function max(out, a, b) {
                out[0] = Math.max(a[0], b[0]);
                out[1] = Math.max(a[1], b[1]);
                return out;
              }
              function round(out, a) {
                out[0] = Math.round(a[0]);
                out[1] = Math.round(a[1]);
                return out;
              }
              function scale(out, a, b) {
                out[0] = a[0] * b;
                out[1] = a[1] * b;
                return out;
              }
              function scaleAndAdd(out, a, b, scale2) {
                out[0] = a[0] + b[0] * scale2;
                out[1] = a[1] + b[1] * scale2;
                return out;
              }
              function distance(a, b) {
                var x = b[0] - a[0], y = b[1] - a[1];
                return Math.sqrt(x * x + y * y);
              }
              function squaredDistance(a, b) {
                var x = b[0] - a[0], y = b[1] - a[1];
                return x * x + y * y;
              }
              function length(a) {
                var x = a[0], y = a[1];
                return Math.sqrt(x * x + y * y);
              }
              function squaredLength(a) {
                var x = a[0], y = a[1];
                return x * x + y * y;
              }
              function negate(out, a) {
                out[0] = -a[0];
                out[1] = -a[1];
                return out;
              }
              function inverse(out, a) {
                out[0] = 1 / a[0];
                out[1] = 1 / a[1];
                return out;
              }
              function normalize(out, a) {
                var x = a[0], y = a[1];
                var len = x * x + y * y;
                if (len > 0) {
                  len = 1 / Math.sqrt(len);
                  out[0] = a[0] * len;
                  out[1] = a[1] * len;
                }
                return out;
              }
              function dot(a, b) {
                return a[0] * b[0] + a[1] * b[1];
              }
              function cross(out, a, b) {
                var z = a[0] * b[1] - a[1] * b[0];
                out[0] = out[1] = 0;
                out[2] = z;
                return out;
              }
              function lerp(out, a, b, t) {
                var ax = a[0], ay = a[1];
                out[0] = ax + t * (b[0] - ax);
                out[1] = ay + t * (b[1] - ay);
                return out;
              }
              function random(out, scale2) {
                scale2 = scale2 || 1;
                var r = glMatrix.RANDOM() * 2 * Math.PI;
                out[0] = Math.cos(r) * scale2;
                out[1] = Math.sin(r) * scale2;
                return out;
              }
              function transformMat2(out, a, m) {
                var x = a[0], y = a[1];
                out[0] = m[0] * x + m[2] * y;
                out[1] = m[1] * x + m[3] * y;
                return out;
              }
              function transformMat2d(out, a, m) {
                var x = a[0], y = a[1];
                out[0] = m[0] * x + m[2] * y + m[4];
                out[1] = m[1] * x + m[3] * y + m[5];
                return out;
              }
              function transformMat3(out, a, m) {
                var x = a[0], y = a[1];
                out[0] = m[0] * x + m[3] * y + m[6];
                out[1] = m[1] * x + m[4] * y + m[7];
                return out;
              }
              function transformMat4(out, a, m) {
                var x = a[0];
                var y = a[1];
                out[0] = m[0] * x + m[4] * y + m[12];
                out[1] = m[1] * x + m[5] * y + m[13];
                return out;
              }
              function str(a) {
                return "vec2(" + a[0] + ", " + a[1] + ")";
              }
              function exactEquals(a, b) {
                return a[0] === b[0] && a[1] === b[1];
              }
              function equals(a, b) {
                var a0 = a[0], a1 = a[1];
                var b0 = b[0], b1 = b[1];
                return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1));
              }
              exports$14.len = length;
              exports$14.sub = subtract;
              exports$14.mul = multiply;
              exports$14.div = divide;
              exports$14.dist = distance;
              exports$14.sqrDist = squaredDistance;
              exports$14.sqrLen = squaredLength;
              exports$14.forEach = function() {
                var vec = create();
                return function(a, stride, offset, count, fn, arg) {
                  var i = void 0, l = void 0;
                  if (!stride) {
                    stride = 2;
                  }
                  if (!offset) {
                    offset = 0;
                  }
                  if (count) {
                    l = Math.min(count * stride + offset, a.length);
                  } else {
                    l = a.length;
                  }
                  for (i = offset; i < l; i += stride) {
                    vec[0] = a[i];
                    vec[1] = a[i + 1];
                    fn(vec, vec, arg);
                    a[i] = vec[0];
                    a[i + 1] = vec[1];
                  }
                  return a;
                };
              }();
            }
            /******/
          ])
        );
      });
    }, {}], 9: [function(require2, module3, exports$13) {
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
      function Node(obj, dimension, parent) {
        this.obj = obj;
        this.left = null;
        this.right = null;
        this.parent = parent;
        this.dimension = dimension;
      }
      function KdTree(points, metric, dimensions) {
        var self2 = this;
        function buildTree(points2, depth, parent) {
          var dim = depth % dimensions.length, median, node;
          if (points2.length === 0) {
            return null;
          }
          if (points2.length === 1) {
            return new Node(points2[0], dim, parent);
          }
          points2.sort(function(a, b) {
            return a[dimensions[dim]] - b[dimensions[dim]];
          });
          median = Math.floor(points2.length / 2);
          node = new Node(points2[median], dim, parent);
          node.left = buildTree(points2.slice(0, median), depth + 1, node);
          node.right = buildTree(points2.slice(median + 1), depth + 1, node);
          return node;
        }
        this.root = buildTree(points, 0, null);
        this.insert = function(point) {
          function innerSearch(node, parent) {
            if (node === null) {
              return parent;
            }
            var dimension2 = dimensions[node.dimension];
            if (point[dimension2] < node.obj[dimension2]) {
              return innerSearch(node.left, node);
            } else {
              return innerSearch(node.right, node);
            }
          }
          var insertPosition = innerSearch(this.root, null), newNode, dimension;
          if (insertPosition === null) {
            this.root = new Node(point, 0, null);
            return;
          }
          newNode = new Node(point, (insertPosition.dimension + 1) % dimensions.length, insertPosition);
          dimension = dimensions[insertPosition.dimension];
          if (point[dimension] < insertPosition.obj[dimension]) {
            insertPosition.left = newNode;
          } else {
            insertPosition.right = newNode;
          }
        };
        this.remove = function(point) {
          var node;
          function nodeSearch(node2) {
            if (node2 === null) {
              return null;
            }
            if (node2.obj === point) {
              return node2;
            }
            var dimension = dimensions[node2.dimension];
            if (point[dimension] < node2.obj[dimension]) {
              return nodeSearch(node2.left);
            } else {
              return nodeSearch(node2.right);
            }
          }
          function removeNode(node2) {
            var nextNode, nextObj, pDimension;
            function findMax(node3, dim) {
              var dimension, own, left, right, max;
              if (node3 === null) {
                return null;
              }
              dimension = dimensions[dim];
              if (node3.dimension === dim) {
                if (node3.right !== null) {
                  return findMax(node3.right, dim);
                }
                return node3;
              }
              own = node3.obj[dimension];
              left = findMax(node3.left, dim);
              right = findMax(node3.right, dim);
              max = node3;
              if (left !== null && left.obj[dimension] > own) {
                max = left;
              }
              if (right !== null && right.obj[dimension] > max.obj[dimension]) {
                max = right;
              }
              return max;
            }
            function findMin(node3, dim) {
              var dimension, own, left, right, min;
              if (node3 === null) {
                return null;
              }
              dimension = dimensions[dim];
              if (node3.dimension === dim) {
                if (node3.left !== null) {
                  return findMin(node3.left, dim);
                }
                return node3;
              }
              own = node3.obj[dimension];
              left = findMin(node3.left, dim);
              right = findMin(node3.right, dim);
              min = node3;
              if (left !== null && left.obj[dimension] < own) {
                min = left;
              }
              if (right !== null && right.obj[dimension] < min.obj[dimension]) {
                min = right;
              }
              return min;
            }
            if (node2.left === null && node2.right === null) {
              if (node2.parent === null) {
                self2.root = null;
                return;
              }
              pDimension = dimensions[node2.parent.dimension];
              if (node2.obj[pDimension] < node2.parent.obj[pDimension]) {
                node2.parent.left = null;
              } else {
                node2.parent.right = null;
              }
              return;
            }
            if (node2.left !== null) {
              nextNode = findMax(node2.left, node2.dimension);
            } else {
              nextNode = findMin(node2.right, node2.dimension);
            }
            nextObj = nextNode.obj;
            removeNode(nextNode);
            node2.obj = nextObj;
          }
          node = nodeSearch(self2.root);
          if (node === null) {
            return;
          }
          removeNode(node);
        };
        this.nearest = function(point, maxNodes, maxDistance) {
          var i, result, bestNodes;
          bestNodes = new BinaryHeap(
            function(e) {
              return -e[1];
            }
          );
          function nearestSearch(node) {
            if (!self2.root) {
              return [];
            }
            var bestChild, dimension = dimensions[node.dimension], ownDistance = metric(point, node.obj), linearPoint = {}, linearDistance, otherChild, i2;
            function saveNode(node2, distance) {
              bestNodes.push([node2, distance]);
              if (bestNodes.size() > maxNodes) {
                bestNodes.pop();
              }
            }
            for (i2 = 0; i2 < dimensions.length; i2 += 1) {
              if (i2 === node.dimension) {
                linearPoint[dimensions[i2]] = point[dimensions[i2]];
              } else {
                linearPoint[dimensions[i2]] = node.obj[dimensions[i2]];
              }
            }
            linearDistance = metric(linearPoint, node.obj);
            if (node.right === null && node.left === null) {
              if (bestNodes.size() < maxNodes || ownDistance < bestNodes.peek()[1]) {
                saveNode(node, ownDistance);
              }
              return;
            }
            if (node.right === null) {
              bestChild = node.left;
            } else if (node.left === null) {
              bestChild = node.right;
            } else {
              if (point[dimension] < node.obj[dimension]) {
                bestChild = node.left;
              } else {
                bestChild = node.right;
              }
            }
            nearestSearch(bestChild);
            if (bestNodes.size() < maxNodes || ownDistance < bestNodes.peek()[1]) {
              saveNode(node, ownDistance);
            }
            if (bestNodes.size() < maxNodes || Math.abs(linearDistance) < bestNodes.peek()[1]) {
              if (bestChild === node.left) {
                otherChild = node.right;
              } else {
                otherChild = node.left;
              }
              if (otherChild !== null) {
                nearestSearch(otherChild);
              }
            }
          }
          if (maxDistance) {
            for (i = 0; i < maxNodes; i += 1) {
              bestNodes.push([null, maxDistance]);
            }
          }
          nearestSearch(self2.root);
          result = [];
          for (i = 0; i < maxNodes && i < bestNodes.content.length; i += 1) {
            if (bestNodes.content[i][0]) {
              result.push([bestNodes.content[i][0].obj, bestNodes.content[i][1]]);
            }
          }
          return result;
        };
        this.balanceFactor = function() {
          function height(node) {
            if (node === null) {
              return 0;
            }
            return Math.max(height(node.left), height(node.right)) + 1;
          }
          function count(node) {
            if (node === null) {
              return 0;
            }
            return count(node.left) + count(node.right) + 1;
          }
          return height(self2.root) / (Math.log(count(self2.root)) / Math.log(2));
        };
      }
      function BinaryHeap(scoreFunction) {
        this.content = [];
        this.scoreFunction = scoreFunction;
      }
      BinaryHeap.prototype = {
        push: function(element) {
          this.content.push(element);
          this.bubbleUp(this.content.length - 1);
        },
        pop: function() {
          var result = this.content[0];
          var end = this.content.pop();
          if (this.content.length > 0) {
            this.content[0] = end;
            this.sinkDown(0);
          }
          return result;
        },
        peek: function() {
          return this.content[0];
        },
        remove: function(node) {
          var len = this.content.length;
          for (var i = 0; i < len; i++) {
            if (this.content[i] == node) {
              var end = this.content.pop();
              if (i != len - 1) {
                this.content[i] = end;
                if (this.scoreFunction(end) < this.scoreFunction(node))
                  this.bubbleUp(i);
                else
                  this.sinkDown(i);
              }
              return;
            }
          }
          throw new Error("Node not found.");
        },
        size: function() {
          return this.content.length;
        },
        bubbleUp: function(n) {
          var element = this.content[n];
          while (n > 0) {
            var parentN = Math.floor((n + 1) / 2) - 1, parent = this.content[parentN];
            if (this.scoreFunction(element) < this.scoreFunction(parent)) {
              this.content[parentN] = element;
              this.content[n] = parent;
              n = parentN;
            } else {
              break;
            }
          }
        },
        sinkDown: function(n) {
          var length = this.content.length, element = this.content[n], elemScore = this.scoreFunction(element);
          while (true) {
            var child2N = (n + 1) * 2, child1N = child2N - 1;
            var swap = null;
            if (child1N < length) {
              var child1 = this.content[child1N], child1Score = this.scoreFunction(child1);
              if (child1Score < elemScore)
                swap = child1N;
            }
            if (child2N < length) {
              var child2 = this.content[child2N], child2Score = this.scoreFunction(child2);
              if (child2Score < (swap == null ? elemScore : child1Score)) {
                swap = child2N;
              }
            }
            if (swap != null) {
              this.content[n] = this.content[swap];
              this.content[swap] = element;
              n = swap;
            } else {
              break;
            }
          }
        }
      };
      module3.exports = {
        createKdTree: function(points, metric, dimensions) {
          return new KdTree(points, metric, dimensions);
        }
      };
    }, {}], 10: [function(require2, module3, exports$13) {
      module3.exports = {
        "name": "serve-sofa-hrir",
        "exports": "serveSofaHrir",
        "version": "0.4.2",
        "description": "Utility to fetch and shape sofa formated HRIR from server",
        "main": "./dist/",
        "standalone": "serveSofaHrir",
        "scripts": {
          "lint": "eslint ./src/ ./test/ && jscs --verbose ./src/ ./test/",
          "lint-examples": "eslint -c examples/.eslintrc ./examples/*.html",
          "compile": "rm -rf ./dist && babel ./src/ --out-dir ./dist/",
          "browserify": "browserify ./src/index.js -t [ babelify ] --standalone serveSofaHrir > serveSofaHrir.js",
          "bundle": "npm run lint && npm run test && npm run doc && npm run compile && npm run browserify",
          "doc": "esdoc -c esdoc.json",
          "test": "browserify test/*/*.js -t [ babelify ] --exclude 'test/*/*_listen.js*' --exclude 'test/*/*_issues.js' | tape-run",
          "test-browser": "browserify test/*/*.js -t [ babelify ] --exclude 'test/*/*_listen.js*' --exclude 'test/*/*_issues.js' | testling -u",
          "test-listen": "browserify test/*/*_listen.js -t [ babelify ] | tape-run",
          "test-issues": "browserify test/*/*_issues.js -t [ babelify ] | tape-run",
          "watch": "watch 'npm run browserify && echo $( date ): browserified' ./src/"
        },
        "authors": [
          "Jean-Philippe.Lambert@ircam.fr",
          "Arnau Julià <arnau.julia@gmail.com>",
          "Samuel.Goldszmidt@ircam.fr",
          "David.Poirier-Quinot@ircam.fr"
        ],
        "license": "BSD-3-Clause",
        "dependencies": {
          "fractional-delay": "git://github.com/Ircam-RnD/fractional-delay#gh-pages",
          "gl-matrix": "^2.4.0",
          "kd.tree": "akshaylive/node-kdt#39bc780704a324393bca68a17cf7bc71be8544c6"
        },
        "repository": {
          "type": "git",
          "url": "https://github.com/Ircam-RnD/serveSofaHrir"
        },
        "engines": {
          "node": "0.12 || 4",
          "npm": ">=1.0.0 <3.0.0"
        },
        "devDependencies": {
          "babel-cli": "^6.5.1",
          "babel-eslint": "^4.1.8",
          "babel-preset-es2015": "^6.5.0",
          "babelify": "^7.2.0",
          "blue-tape": "^0.1.11",
          "browserify": "^12.0.2",
          "esdoc": "^0.4.6",
          "eslint": "^1.10.3",
          "eslint-config-airbnb": "^1.0.2",
          "eslint-plugin-html": "^1.4.0",
          "jscs": "2.11.0",
          "jscs-jsdoc": "^1.3.1",
          "tape": "^4.4.0",
          "tape-run": "^2.1.2",
          "testling": "^1.7.1",
          "watch": "^0.17.1"
        }
      };
    }, {}], 11: [function(require2, module3, exports$13) {
      Object.defineProperty(exports$13, "__esModule", {
        value: true
      });
      exports$13.resampleFloat32Array = resampleFloat32Array;
      var _fractionalDelay = require2("fractional-delay");
      var _fractionalDelay2 = _interopRequireDefault(_fractionalDelay);
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      function resampleFloat32Array() {
        var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        var promise = new Promise(function(resolve, reject) {
          var inputSamples = options.inputSamples;
          var inputSampleRate = options.inputSampleRate;
          var inputDelay = typeof options.inputDelay !== "undefined" ? options.inputDelay : 0;
          var outputSampleRate = typeof options.outputSampleRate !== "undefined" ? options.outputSampleRate : inputSampleRate;
          if (inputSampleRate === outputSampleRate && inputDelay === 0) {
            resolve(new Float32Array(inputSamples));
          } else {
            try {
              var outputSamplesNb = Math.ceil(inputSamples.length * outputSampleRate / inputSampleRate);
              var context = new window.OfflineAudioContext(1, outputSamplesNb, outputSampleRate);
              var inputBuffer = context.createBuffer(1, inputSamples.length, inputSampleRate);
              var maxDelay = 1;
              var fractionalDelay = new _fractionalDelay2.default(inputSampleRate, maxDelay);
              fractionalDelay.setDelay(inputDelay / inputSampleRate);
              inputBuffer.getChannelData(0).set(fractionalDelay.process(inputSamples));
              var source = context.createBufferSource();
              source.buffer = inputBuffer;
              source.connect(context.destination);
              source.start();
              context.oncomplete = function(event) {
                var outputSamples = event.renderedBuffer.getChannelData(0);
                resolve(outputSamples);
              };
              context.startRendering();
            } catch (error) {
              reject(new Error("Unable to re-sample Float32Array. " + error.message));
            }
          }
        });
        return promise;
      }
      /**
       * @fileOverview Audio utilities
       * @author Jean-Philippe.Lambert@ircam.fr
       * @copyright 2016 IRCAM, Paris, France
       * @license BSD-3-Clause
       */
      exports$13.default = {
        resampleFloat32Array
      };
    }, { "fractional-delay": 7 }], 12: [function(require2, module3, exports$13) {
      Object.defineProperty(exports$13, "__esModule", {
        value: true
      });
      exports$13.tree = void 0;
      exports$13.distanceSquared = distanceSquared;
      exports$13.distance = distance;
      var _kd = require2("kd.tree");
      var _kd2 = _interopRequireDefault(_kd);
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      exports$13.tree = _kd2.default;
      /**
       * @fileOverview Helpers for k-d tree.
       * @author Jean-Philippe.Lambert@ircam.fr
       * @copyright 2015-2016 IRCAM, Paris, France
       * @license BSD-3-Clause
       */
      function distanceSquared(a, b) {
        var x = b.x - a.x;
        var y = b.y - a.y;
        var z = b.z - a.z;
        return x * x + y * y + z * z;
      }
      function distance(a, b) {
        return Math.sqrt(this.distanceSquared(a, b));
      }
      exports$13.default = {
        distance,
        distanceSquared,
        tree: _kd2.default
      };
    }, { "kd.tree": 9 }], 13: [function(require2, module3, exports$13) {
      Object.defineProperty(exports$13, "__esModule", {
        value: true
      });
      exports$13.sofaCartesianToGl = sofaCartesianToGl;
      exports$13.glToSofaCartesian = glToSofaCartesian;
      exports$13.sofaCartesianToSofaSpherical = sofaCartesianToSofaSpherical;
      exports$13.sofaSphericalToSofaCartesian = sofaSphericalToSofaCartesian;
      exports$13.sofaSphericalToGl = sofaSphericalToGl;
      exports$13.glToSofaSpherical = glToSofaSpherical;
      exports$13.sofaToSofaCartesian = sofaToSofaCartesian;
      exports$13.spat4CartesianToGl = spat4CartesianToGl;
      exports$13.glToSpat4Cartesian = glToSpat4Cartesian;
      exports$13.spat4CartesianToSpat4Spherical = spat4CartesianToSpat4Spherical;
      exports$13.spat4SphericalToSpat4Cartesian = spat4SphericalToSpat4Cartesian;
      exports$13.spat4SphericalToGl = spat4SphericalToGl;
      exports$13.glToSpat4Spherical = glToSpat4Spherical;
      exports$13.systemType = systemType;
      exports$13.systemToGl = systemToGl;
      exports$13.glToSystem = glToSystem;
      var _degree = require2("./degree");
      var _degree2 = _interopRequireDefault(_degree);
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      function sofaCartesianToGl(out, a) {
        var x = a[0];
        var y = a[1];
        var z = a[2];
        out[0] = 0 - y;
        out[1] = z;
        out[2] = 0 - x;
        return out;
      }
      /**
       * @fileOverview Coordinate systems conversions. openGL, SOFA, and Spat4 (Ircam).
       *
       * @author Jean-Philippe.Lambert@ircam.fr
       * @copyright 2015-2016 IRCAM, Paris, France
       * @license BSD-3-Clause
       */
      function glToSofaCartesian(out, a) {
        var x = a[0];
        var y = a[1];
        var z = a[2];
        out[0] = 0 - z;
        out[1] = 0 - x;
        out[2] = y;
        return out;
      }
      function sofaCartesianToSofaSpherical(out, a) {
        var x = a[0];
        var y = a[1];
        var z = a[2];
        var x2y2 = x * x + y * y;
        out[0] = (_degree2.default.atan2(y, x) + 360) % 360;
        out[1] = _degree2.default.atan2(z, Math.sqrt(x2y2));
        out[2] = Math.sqrt(x2y2 + z * z);
        return out;
      }
      function sofaSphericalToSofaCartesian(out, a) {
        var azimuth = a[0];
        var elevation = a[1];
        var distance = a[2];
        var cosE = _degree2.default.cos(elevation);
        out[0] = distance * cosE * _degree2.default.cos(azimuth);
        out[1] = distance * cosE * _degree2.default.sin(azimuth);
        out[2] = distance * _degree2.default.sin(elevation);
        return out;
      }
      function sofaSphericalToGl(out, a) {
        var azimuth = a[0];
        var elevation = a[1];
        var distance = a[2];
        var cosE = _degree2.default.cos(elevation);
        out[0] = 0 - distance * cosE * _degree2.default.sin(azimuth);
        out[1] = distance * _degree2.default.sin(elevation);
        out[2] = 0 - distance * cosE * _degree2.default.cos(azimuth);
        return out;
      }
      function glToSofaSpherical(out, a) {
        var x = 0 - a[2];
        var y = 0 - a[0];
        var z = a[1];
        var x2y2 = x * x + y * y;
        out[0] = (_degree2.default.atan2(y, x) + 360) % 360;
        out[1] = _degree2.default.atan2(z, Math.sqrt(x2y2));
        out[2] = Math.sqrt(x2y2 + z * z);
        return out;
      }
      function sofaToSofaCartesian(out, a, system) {
        switch (system) {
          case "sofaCartesian":
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            break;
          case "sofaSpherical":
            sofaSphericalToSofaCartesian(out, a);
            break;
          default:
            throw new Error("Bad coordinate system");
        }
        return out;
      }
      function spat4CartesianToGl(out, a) {
        var x = a[0];
        var y = a[1];
        var z = a[2];
        out[0] = x;
        out[1] = z;
        out[2] = 0 - y;
        return out;
      }
      function glToSpat4Cartesian(out, a) {
        var x = a[0];
        var y = a[1];
        var z = a[2];
        out[0] = x;
        out[1] = 0 - z;
        out[2] = y;
        return out;
      }
      function spat4CartesianToSpat4Spherical(out, a) {
        var x = a[0];
        var y = a[1];
        var z = a[2];
        var x2y2 = x * x + y * y;
        out[0] = _degree2.default.atan2(x, y);
        out[1] = _degree2.default.atan2(z, Math.sqrt(x2y2));
        out[2] = Math.sqrt(x2y2 + z * z);
        return out;
      }
      function spat4SphericalToSpat4Cartesian(out, a) {
        var azimuth = a[0];
        var elevation = a[1];
        var distance = a[2];
        var cosE = _degree2.default.cos(elevation);
        out[0] = distance * cosE * _degree2.default.sin(azimuth);
        out[1] = distance * cosE * _degree2.default.cos(azimuth);
        out[2] = distance * _degree2.default.sin(elevation);
        return out;
      }
      function spat4SphericalToGl(out, a) {
        var azimuth = a[0];
        var elevation = a[1];
        var distance = a[2];
        var cosE = _degree2.default.cos(elevation);
        out[0] = distance * cosE * _degree2.default.sin(azimuth);
        out[1] = distance * _degree2.default.sin(elevation);
        out[2] = 0 - distance * cosE * _degree2.default.cos(azimuth);
        return out;
      }
      function glToSpat4Spherical(out, a) {
        var x = a[0];
        var y = 0 - a[2];
        var z = a[1];
        var x2y2 = x * x + y * y;
        out[0] = _degree2.default.atan2(x, y);
        out[1] = _degree2.default.atan2(z, Math.sqrt(x2y2));
        out[2] = Math.sqrt(x2y2 + z * z);
        return out;
      }
      function systemType(system) {
        var type = void 0;
        if (system === "sofaCartesian" || system === "spat4Cartesian" || system === "gl") {
          type = "cartesian";
        } else if (system === "sofaSpherical" || system === "spat4Spherical") {
          type = "spherical";
        } else {
          throw new Error("Unknown coordinate system type " + system);
        }
        return type;
      }
      function systemToGl(out, a, system) {
        switch (system) {
          case "gl":
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            break;
          case "sofaCartesian":
            sofaCartesianToGl(out, a);
            break;
          case "sofaSpherical":
            sofaSphericalToGl(out, a);
            break;
          case "spat4Cartesian":
            spat4CartesianToGl(out, a);
            break;
          case "spat4Spherical":
            spat4SphericalToGl(out, a);
            break;
          default:
            throw new Error("Bad coordinate system");
        }
        return out;
      }
      function glToSystem(out, a, system) {
        switch (system) {
          case "gl":
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            break;
          case "sofaCartesian":
            glToSofaCartesian(out, a);
            break;
          case "sofaSpherical":
            glToSofaSpherical(out, a);
            break;
          case "spat4Cartesian":
            glToSpat4Cartesian(out, a);
            break;
          case "spat4Spherical":
            glToSpat4Spherical(out, a);
            break;
          default:
            throw new Error("Bad coordinate system");
        }
        return out;
      }
      exports$13.default = {
        glToSofaCartesian,
        glToSofaSpherical,
        glToSpat4Cartesian,
        glToSpat4Spherical,
        glToSystem,
        sofaCartesianToGl,
        sofaCartesianToSofaSpherical,
        sofaSphericalToGl,
        sofaSphericalToSofaCartesian,
        sofaToSofaCartesian,
        spat4CartesianToGl,
        spat4CartesianToSpat4Spherical,
        spat4SphericalToGl,
        spat4SphericalToSpat4Cartesian,
        systemToGl,
        systemType
      };
    }, { "./degree": 14 }], 14: [function(require2, module3, exports$13) {
      Object.defineProperty(exports$13, "__esModule", {
        value: true
      });
      exports$13.toRadian = toRadian;
      exports$13.fromRadian = fromRadian;
      exports$13.cos = cos;
      exports$13.sin = sin;
      exports$13.atan2 = atan2;
      /**
       * @fileOverview Convert to and from degree
       * @author Jean-Philippe.Lambert@ircam.fr
       * @copyright 2015-2016 IRCAM, Paris, France
       * @license BSD-3-Clause
       */
      var toRadianFactor = exports$13.toRadianFactor = Math.PI / 180;
      var fromRadianFactor = exports$13.fromRadianFactor = 1 / toRadianFactor;
      function toRadian(angle) {
        return angle * toRadianFactor;
      }
      function fromRadian(angle) {
        return angle * fromRadianFactor;
      }
      function cos(angle) {
        return Math.cos(angle * toRadianFactor);
      }
      function sin(angle) {
        return Math.sin(angle * toRadianFactor);
      }
      function atan2(y, x) {
        return Math.atan2(y, x) * fromRadianFactor;
      }
      exports$13.default = {
        atan2,
        cos,
        fromRadian,
        fromRadianFactor,
        sin,
        toRadian,
        toRadianFactor
      };
    }, {}], 15: [function(require2, module3, exports$13) {
      Object.defineProperty(exports$13, "__esModule", {
        value: true
      });
      exports$13.ServerDataBase = exports$13.HrtfSet = void 0;
      var _HrtfSet = require2("./sofa/HrtfSet");
      var _HrtfSet2 = _interopRequireDefault(_HrtfSet);
      var _ServerDataBase = require2("./sofa/ServerDataBase");
      var _ServerDataBase2 = _interopRequireDefault(_ServerDataBase);
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      exports$13.HrtfSet = _HrtfSet2.default;
      exports$13.ServerDataBase = _ServerDataBase2.default;
      exports$13.default = {
        HrtfSet: _HrtfSet2.default,
        ServerDataBase: _ServerDataBase2.default
      };
    }, { "./sofa/HrtfSet": 17, "./sofa/ServerDataBase": 18 }], 16: [function(require2, module3, exports$13) {
      Object.defineProperty(exports$13, "__esModule", {
        value: true
      });
      exports$13.version = exports$13.name = exports$13.license = exports$13.description = void 0;
      var _package = require2("../package.json");
      var _package2 = _interopRequireDefault(_package);
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      var description = _package2.default.description;
      /**
       * @fileOverview Information on the library, from the `package.json` file.
       *
       * @author Jean-Philippe.Lambert@ircam.fr
       * @copyright 2016 IRCAM, Paris, France
       * @license BSD-3-Clause
       */
      exports$13.description = description;
      var license = _package2.default.license;
      exports$13.license = license;
      var name = _package2.default.name;
      exports$13.name = name;
      var version = _package2.default.version;
      exports$13.version = version;
      exports$13.default = {
        description,
        license,
        name,
        version
      };
    }, { "../package.json": 10 }], 17: [function(require2, module3, exports$13) {
      Object.defineProperty(exports$13, "__esModule", {
        value: true
      });
      exports$13.HrtfSet = void 0;
      var _createClass = /* @__PURE__ */ function() {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        return function(Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
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
      var _glMatrix = require2("gl-matrix");
      var glMatrix = _interopRequireWildcard(_glMatrix);
      var _info = require2("../info");
      var _info2 = _interopRequireDefault(_info);
      var _parseDataSet = require2("./parseDataSet");
      var _parseSofa = require2("./parseSofa");
      var _coordinates = require2("../geometry/coordinates");
      var _coordinates2 = _interopRequireDefault(_coordinates);
      var _KdTree = require2("../geometry/KdTree");
      var _KdTree2 = _interopRequireDefault(_KdTree);
      var _utilities = require2("../audio/utilities");
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      function _interopRequireWildcard(obj) {
        if (obj && obj.__esModule) {
          return obj;
        } else {
          var newObj = {};
          if (obj != null) {
            for (var key in obj) {
              if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
            }
          }
          newObj.default = obj;
          return newObj;
        }
      }
      function _toConsumableArray(arr) {
        if (Array.isArray(arr)) {
          for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
            arr2[i] = arr[i];
          }
          return arr2;
        } else {
          return Array.from(arr);
        }
      }
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      var HrtfSet = exports$13.HrtfSet = function() {
        function HrtfSet2() {
          var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
          _classCallCheck(this, HrtfSet2);
          this._audioContext = options.audioContext;
          this._ready = false;
          this.coordinateSystem = options.coordinateSystem;
          this.filterCoordinateSystem = options.filterCoordinateSystem;
          this.filterPositions = options.filterPositions;
          this.filterAfterLoad = options.filterAfterLoad;
        }
        _createClass(HrtfSet2, [{
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
          value: function applyFilterPositions() {
            var _this = this;
            var filteredPositions = this._filterPositions.map(function(current) {
              return _this._kdt.nearest({ x: current[0], y: current[1], z: current[2] }, 1).pop()[0];
            });
            filteredPositions = [].concat(_toConsumableArray(new Set(filteredPositions)));
            this._kdt = _KdTree2.default.tree.createKdTree(filteredPositions, _KdTree2.default.distanceSquared, ["x", "y", "z"]);
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
          value: function load(sourceUrl) {
            var _this2 = this;
            var extension = sourceUrl.split(".").pop();
            var url = extension === "sofa" ? sourceUrl + ".json" : sourceUrl;
            var promise = void 0;
            var preFilter = typeof this._filterPositions !== "undefined" && !this.filterAfterLoad && extension === "sofa";
            if (preFilter) {
              promise = Promise.all([this._loadMetaAndPositions(sourceUrl), this._loadDataSet(sourceUrl)]).then(function(indicesAndDataSet) {
                var indices = indicesAndDataSet[0];
                var dataSet = indicesAndDataSet[1];
                return _this2._loadSofaPartial(sourceUrl, indices, dataSet).then(function() {
                  _this2._ready = true;
                  return _this2;
                });
              }).catch(function() {
                return _this2._loadSofaFull(url).then(function() {
                  _this2.applyFilterPositions();
                  _this2._ready = true;
                  return _this2;
                });
              });
            } else {
              promise = this._loadSofaFull(url).then(function() {
                if (typeof _this2._filterPositions !== "undefined" && _this2.filterAfterLoad) {
                  _this2.applyFilterPositions();
                }
                _this2._ready = true;
                return _this2;
              });
            }
            return promise;
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
          value: function _export() {
            var _this3 = this;
            var SourcePosition = void 0;
            var SourcePositionType = _coordinates2.default.systemType(this.filterCoordinateSystem);
            switch (SourcePositionType) {
              case "cartesian":
                SourcePosition = this._sofaSourcePosition.map(function(position) {
                  return _coordinates2.default.glToSofaCartesian([], position);
                });
                break;
              case "spherical":
                SourcePosition = this._sofaSourcePosition.map(function(position) {
                  return _coordinates2.default.glToSofaSpherical([], position);
                });
                break;
              default:
                throw new Error("Bad source position type " + SourcePositionType + " for export.");
            }
            var DataIR = this._sofaSourcePosition.map(function(position) {
              var fir = _this3._kdt.nearest({ x: position[0], y: position[1], z: position[2] }, 1).pop()[0].fir;
              var ir = [];
              for (var channel = 0; channel < fir.numberOfChannels; ++channel) {
                ir.push([].concat(_toConsumableArray(fir.getChannelData(channel))));
              }
              return ir;
            });
            return (0, _parseSofa.stringifySofa)({
              name: this._sofaName,
              metaData: this._sofaMetaData,
              ListenerPosition: [0, 0, 0],
              ListenerPositionType: "cartesian",
              ListenerUp: [0, 0, 1],
              ListenerUpType: "cartesian",
              ListenerView: [1, 0, 0],
              ListenerViewType: "cartesian",
              SourcePositionType,
              SourcePosition,
              DataSamplingRate: this._audioContext.sampleRate,
              DataDelay: this._sofaDelay,
              DataIR,
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
          value: function nearest(positionRequest) {
            var position = _coordinates2.default.systemToGl([], positionRequest, this.coordinateSystem);
            var nearest2 = this._kdt.nearest({
              x: position[0],
              y: position[1],
              z: position[2]
            }, 1).pop();
            var data = nearest2[0];
            _coordinates2.default.glToSystem(position, [data.x, data.y, data.z], this.coordinateSystem);
            return {
              distance: nearest2[1],
              fir: data.fir,
              index: data.index,
              position
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
          value: function nearestFir(positionRequest) {
            return this.nearest(positionRequest).fir;
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
          value: function _createKdTree(indicesPositionsFirs) {
            var _this4 = this;
            var positions = indicesPositionsFirs.map(function(value) {
              var impulseResponses = value[2];
              var fir = _this4._audioContext.createBuffer(impulseResponses.length, impulseResponses[0].length, _this4._audioContext.sampleRate);
              impulseResponses.forEach(function(samples, channel) {
                fir.getChannelData(channel).set(samples);
              });
              return {
                index: value[0],
                x: value[1][0],
                y: value[1][1],
                z: value[1][2],
                fir
              };
            });
            this._sofaSourcePosition = positions.map(function(position) {
              return [position.x, position.y, position.z];
            });
            this._kdt = _KdTree2.default.tree.createKdTree(positions, _KdTree2.default.distanceSquared, ["x", "y", "z"]);
            return this;
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
          value: function _generateIndicesPositionsFirs(indices, positions, firs, delays) {
            var _this5 = this;
            var sofaFirsPromises = firs.map(function(sofaFirChannels, index) {
              var channelCount = sofaFirChannels.length;
              if (channelCount !== 2) {
                throw new Error("Bad number of channels" + (" for IR index " + indices[index]) + (" (" + channelCount + " instead of 2)"));
              }
              if (delays[0].length !== 2) {
                throw new Error("Bad delay format" + (" for IR index " + indices[index]) + (" (first element in Data.Delay is " + delays[0]) + " instead of [[delayL, delayR]] )");
              }
              var inputDelays = typeof delays[index] !== "undefined" ? delays[index] : delays[0];
              var sofaFirsChannelsPromises = sofaFirChannels.map(function(fir, index2) {
                if (inputDelays[index2] < 0) {
                  throw new Error("Negative delay detected (not handled at the moment):" + (" delay index " + indices[index]) + (" channel " + index2));
                }
                return (0, _utilities.resampleFloat32Array)({
                  inputSamples: fir,
                  inputDelay: inputDelays[index2],
                  inputSampleRate: _this5._sofaSampleRate,
                  outputSampleRate: _this5._audioContext.sampleRate
                });
              });
              return Promise.all(sofaFirsChannelsPromises).then(function(firChannels) {
                return [indices[index], positions[index], firChannels];
              }).catch(function(error) {
                throw new Error("Unable to re-sample impulse response " + index + ". " + error.message);
              });
            });
            return Promise.all(sofaFirsPromises);
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
          value: function _loadDataSet(sourceUrl) {
            var promise = new Promise(function(resolve, reject) {
              var ddsUrl = sourceUrl + ".dds";
              var request = new window.XMLHttpRequest();
              request.open("GET", ddsUrl);
              request.onerror = function() {
                reject(new Error("Unable to GET " + ddsUrl + ", status " + request.status + " " + ("" + request.responseText)));
              };
              request.onload = function() {
                if (request.status < 200 || request.status >= 300) {
                  request.onerror();
                  return;
                }
                try {
                  var dds = (0, _parseDataSet.parseDataSet)(request.response);
                  resolve(dds);
                } catch (error) {
                  reject(new Error("Unable to parse " + ddsUrl + ". " + error.message));
                }
              };
              request.send();
            });
            return promise;
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
          value: function _loadMetaAndPositions(sourceUrl) {
            var _this6 = this;
            var promise = new Promise(function(resolve, reject) {
              var positionsUrl = sourceUrl + ".json?ListenerPosition,ListenerUp,ListenerView,SourcePosition,Data.Delay,Data.SamplingRate,EmitterPosition,ReceiverPosition,RoomVolume";
              var request = new window.XMLHttpRequest();
              request.open("GET", positionsUrl);
              request.onerror = function() {
                reject(new Error("Unable to GET " + positionsUrl + ", status " + request.status + " " + ("" + request.responseText)));
              };
              request.onload = function() {
                if (request.status < 200 || request.status >= 300) {
                  request.onerror();
                  return;
                }
                try {
                  var data = (0, _parseSofa.parseSofa)(request.response);
                  _this6._setMetaData(data, sourceUrl);
                  var sourcePositions = _this6._sourcePositionsToGl(data);
                  var hrtfPositions = sourcePositions.map(function(position, index) {
                    return {
                      x: position[0],
                      y: position[1],
                      z: position[2],
                      index
                    };
                  });
                  var kdt = _KdTree2.default.tree.createKdTree(hrtfPositions, _KdTree2.default.distanceSquared, ["x", "y", "z"]);
                  var nearestIndices = _this6._filterPositions.map(function(current) {
                    return kdt.nearest({ x: current[0], y: current[1], z: current[2] }, 1).pop()[0].index;
                  });
                  nearestIndices = [].concat(_toConsumableArray(new Set(nearestIndices)));
                  _this6._sofaUrl = sourceUrl;
                  resolve(nearestIndices);
                } catch (error) {
                  reject(new Error("Unable to parse " + positionsUrl + ". " + error.message));
                }
              };
              request.send();
            });
            return promise;
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
          value: function _loadSofaFull(url) {
            var _this7 = this;
            var promise = new Promise(function(resolve, reject) {
              var request = new window.XMLHttpRequest();
              request.open("GET", url);
              request.onerror = function() {
                reject(new Error("Unable to GET " + url + ", status " + request.status + " " + ("" + request.responseText)));
              };
              request.onload = function() {
                if (request.status < 200 || request.status >= 300) {
                  request.onerror();
                  return;
                }
                try {
                  var data = (0, _parseSofa.parseSofa)(request.response);
                  _this7._setMetaData(data, url);
                  var sourcePositions = _this7._sourcePositionsToGl(data);
                  _this7._generateIndicesPositionsFirs(
                    sourcePositions.map(function(position, index) {
                      return index;
                    }),
                    // full
                    sourcePositions,
                    data["Data.IR"].data,
                    data["Data.Delay"].data
                  ).then(function(indicesPositionsFirs) {
                    _this7._createKdTree(indicesPositionsFirs);
                    _this7._sofaUrl = url;
                    resolve(_this7);
                  });
                } catch (error) {
                  reject(new Error("Unable to parse " + url + ". " + error.message));
                }
              };
              request.send();
            });
            return promise;
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
          value: function _loadSofaPartial(sourceUrl, indices, dataSet) {
            var _this8 = this;
            var urlPromises = indices.map(function(index) {
              var urlPromise = new Promise(function(resolve, reject) {
                var positionUrl = sourceUrl + ".json?" + ("SourcePosition[" + index + "][0:1:" + (dataSet.SourcePosition.C - 1) + "],") + ("Data.IR[" + index + "][0:1:" + (dataSet["Data.IR"].R - 1) + "]") + ("[0:1:" + (dataSet["Data.IR"].N - 1) + "]");
                var request = new window.XMLHttpRequest();
                request.open("GET", positionUrl);
                request.onerror = function() {
                  reject(new Error("Unable to GET " + positionUrl + ", status " + request.status + " " + ("" + request.responseText)));
                };
                request.onload = function() {
                  if (request.status < 200 || request.status >= 300) {
                    request.onerror();
                  }
                  try {
                    var data = (0, _parseSofa.parseSofa)(request.response);
                    var sourcePositions = _this8._sourcePositionsToGl(data);
                    _this8._generateIndicesPositionsFirs([index], sourcePositions, data["Data.IR"].data, data["Data.Delay"].data).then(function(indicesPositionsFirs) {
                      resolve(indicesPositionsFirs[0]);
                    });
                  } catch (error) {
                    reject(new Error("Unable to parse " + positionUrl + ". " + error.message));
                  }
                };
                request.send();
              });
              return urlPromise;
            });
            return Promise.all(urlPromises).then(function(indicesPositionsFirs) {
              _this8._createKdTree(indicesPositionsFirs);
              return _this8;
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
          value: function _setMetaData(data, sourceUrl) {
            if (typeof data.metaData.DataType !== "undefined" && data.metaData.DataType !== "FIR") {
              throw new Error("According to meta-data, SOFA data type is not FIR");
            }
            var dateString = (/* @__PURE__ */ new Date()).toISOString();
            this._sofaName = typeof data.name !== "undefined" ? "" + data.name : "HRTF.sofa";
            this._sofaMetaData = typeof data.metaData !== "undefined" ? data.metaData : {};
            if (typeof sourceUrl !== "undefined") {
              this._sofaMetaData.OriginalUrl = sourceUrl;
            }
            this._sofaMetaData.Converter = "Ircam " + _info2.default.name + " " + _info2.default.version + " javascript API ";
            this._sofaMetaData.DateConverted = dateString;
            this._sofaSampleRate = typeof data["Data.SamplingRate"] !== "undefined" ? data["Data.SamplingRate"].data[0] : 48e3;
            if (this._sofaSampleRate !== this._audioContext.sampleRate) {
              this._sofaMetaData.OriginalSampleRate = this._sofaSampleRate;
            }
            this._sofaDelay = typeof data["Data.Delay"] !== "undefined" ? data["Data.Delay"].data : [0, 0];
            this._sofaRoomVolume = typeof data.RoomVolume !== "undefined" ? data.RoomVolume.data[0] : void 0;
            var listenerPosition = _coordinates2.default.sofaToSofaCartesian([], data.ListenerPosition.data[0], (0, _parseSofa.conformSofaCoordinateSystem)(data.ListenerPosition.Type || "cartesian"));
            var listenerView = _coordinates2.default.sofaToSofaCartesian([], data.ListenerView.data[0], (0, _parseSofa.conformSofaCoordinateSystem)(data.ListenerView.Type || "cartesian"));
            var listenerUp = _coordinates2.default.sofaToSofaCartesian([], data.ListenerUp.data[0], (0, _parseSofa.conformSofaCoordinateSystem)(data.ListenerUp.Type || "cartesian"));
            this._sofaToGl = glMatrix.mat4.lookAt([], listenerPosition, listenerView, listenerUp);
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
          value: function _sourcePositionsToGl(data) {
            var _this9 = this;
            var sourcePositions = data.SourcePosition.data;
            var sourceCoordinateSystem = typeof data.SourcePosition.Type !== "undefined" ? data.SourcePosition.Type : "spherical";
            switch (sourceCoordinateSystem) {
              case "cartesian":
                sourcePositions.forEach(function(position) {
                  glMatrix.vec3.transformMat4(position, position, _this9._sofaToGl);
                });
                break;
              case "spherical":
                sourcePositions.forEach(function(position) {
                  _coordinates2.default.sofaSphericalToSofaCartesian(position, position);
                  glMatrix.vec3.transformMat4(position, position, _this9._sofaToGl);
                });
                break;
              default:
                throw new Error("Bad source position type");
            }
            return sourcePositions;
          }
        }, {
          key: "coordinateSystem",
          set: function set(system) {
            this._coordinateSystem = typeof system !== "undefined" ? system : "gl";
          },
          get: function get() {
            return this._coordinateSystem;
          }
          /**
           * Set coordinate system for filter positions.
           *
           * @param {CoordinateSystem} [system] undefined to use coordinateSystem
           */
        }, {
          key: "filterCoordinateSystem",
          set: function set(system) {
            this._filterCoordinateSystem = typeof system !== "undefined" ? system : this.coordinateSystem;
          },
          get: function get() {
            return this._filterCoordinateSystem;
          }
          /**
           * Set filter positions.
           *
           * @param {Array.<Coordinates>} [positions] undefined for no filtering.
           */
        }, {
          key: "filterPositions",
          set: function set(positions) {
            if (typeof positions === "undefined") {
              this._filterPositions = void 0;
            } else {
              switch (this.filterCoordinateSystem) {
                case "gl":
                  this._filterPositions = positions.map(function(current) {
                    return current.slice(0);
                  });
                  break;
                case "sofaCartesian":
                  this._filterPositions = positions.map(function(current) {
                    return _coordinates2.default.sofaCartesianToGl([], current);
                  });
                  break;
                case "sofaSpherical":
                  this._filterPositions = positions.map(function(current) {
                    return _coordinates2.default.sofaSphericalToGl([], current);
                  });
                  break;
                default:
                  throw new Error("Bad filter coordinate system");
              }
            }
          },
          get: function get() {
            var positions = void 0;
            if (typeof this._filterPositions !== "undefined") {
              switch (this.filterCoordinateSystem) {
                case "gl":
                  positions = this._filterPositions.map(function(current) {
                    return current.slice(0);
                  });
                  break;
                case "sofaCartesian":
                  positions = this._filterPositions.map(function(current) {
                    return _coordinates2.default.glToSofaCartesian([], current);
                  });
                  break;
                case "sofaSpherical":
                  positions = this._filterPositions.map(function(current) {
                    return _coordinates2.default.glToSofaSpherical([], current);
                  });
                  break;
                default:
                  throw new Error("Bad filter coordinate system");
              }
            }
            return positions;
          }
          /**
           * Set post-filtering flag. When false, try to load a partial set of
           * HRTF.
           *
           * @param {Boolean} [post=false]
           */
        }, {
          key: "filterAfterLoad",
          set: function set(post) {
            this._filterAfterLoad = typeof post !== "undefined" ? post : false;
          },
          get: function get() {
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
          get: function get() {
            return this._ready;
          }
          /**
           * Get the original name of the HRTF set.
           *
           * @returns {String} that is undefined before a successfully load.
           */
        }, {
          key: "sofaName",
          get: function get() {
            return this._sofaName;
          }
          /**
           * Get the URL used to actually load the HRTF set.
           *
           * @returns {String} that is undefined before a successfully load.
           */
        }, {
          key: "sofaUrl",
          get: function get() {
            return this._sofaUrl;
          }
          /**
           * Get the original sample-rate from the SOFA URL already loaded.
           *
           * @returns {Number} that is undefined before a successfully load.
           */
        }, {
          key: "sofaSampleRate",
          get: function get() {
            return this._sofaSampleRate;
          }
          /**
           * Get the meta-data from the SOFA URL already loaded.
           *
           * @returns {Object} that is undefined before a successfully load.
           */
        }, {
          key: "sofaMetaData",
          get: function get() {
            return this._sofaMetaData;
          }
        }]);
        return HrtfSet2;
      }();
      exports$13.default = HrtfSet;
    }, { "../audio/utilities": 11, "../geometry/KdTree": 12, "../geometry/coordinates": 13, "../info": 16, "./parseDataSet": 19, "./parseSofa": 20, "gl-matrix": 8 }], 18: [function(require2, module3, exports$13) {
      Object.defineProperty(exports$13, "__esModule", {
        value: true
      });
      exports$13.ServerDataBase = void 0;
      var _createClass = /* @__PURE__ */ function() {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        return function(Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
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
      var _parseXml = require2("./parseXml");
      var _parseXml2 = _interopRequireDefault(_parseXml);
      var _parseDataSet = require2("./parseDataSet");
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      var ServerDataBase = exports$13.ServerDataBase = function() {
        function ServerDataBase2() {
          var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
          _classCallCheck(this, ServerDataBase2);
          this._server = options.serverUrl;
          if (typeof this._server === "undefined") {
            var protocol = window.location.protocol === "https:" ? "https:" : "http:";
            this._server = protocol + "//bili2.ircam.fr";
          }
          this._catalogue = {};
          this._urls = [];
        }
        _createClass(ServerDataBase2, [{
          key: "loadCatalogue",
          value: function loadCatalogue() {
            var _this = this;
            var sourceUrl = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this._server + "/catalog.xml";
            var destination = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this._catalogue;
            var promise = new Promise(function(resolve, reject) {
              var request = new window.XMLHttpRequest();
              request.open("GET", sourceUrl);
              request.onerror = function() {
                reject(new Error("Unable to GET " + sourceUrl + ", status " + request.status + " " + ("" + request.responseText)));
              };
              request.onload = function() {
                if (request.status < 200 || request.status >= 300) {
                  request.onerror();
                  return;
                }
                var xml = (0, _parseXml2.default)(request.response);
                var dataSet = xml.querySelector("dataset");
                var catalogueReferences = xml.querySelectorAll("dataset > catalogRef");
                if (catalogueReferences.length === 0) {
                  destination.urls = [];
                  var urls = xml.querySelectorAll("dataset > dataset");
                  for (var ref = 0; ref < urls.length; ++ref) {
                    var url = _this._server + dataSet.getAttribute("name") + "/" + urls[ref].getAttribute("name");
                    _this._urls.push(url);
                    destination.urls.push(url);
                  }
                  resolve(sourceUrl);
                } else {
                  var promises = [];
                  for (var _ref = 0; _ref < catalogueReferences.length; ++_ref) {
                    var name = catalogueReferences[_ref].getAttribute("name");
                    var recursiveUrl = _this._server + dataSet.getAttribute("name") + "/" + catalogueReferences[_ref].getAttribute("xlink:href");
                    destination[name] = {};
                    promises.push(_this.loadCatalogue(recursiveUrl, destination[name]));
                  }
                  Promise.all(promises).then(function() {
                    _this._urls.sort();
                    resolve(sourceUrl);
                  }).catch(function(error) {
                    reject(error);
                  });
                }
              };
              request.send();
            });
            return promise;
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
          value: function getUrls() {
            var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
            var filters = [options.convention, options.dataBase, options.equalisation, options.sampleRate, options.sosOrder];
            var freePattern = typeof options.freePattern === "number" ? options.freePattern.toString() : options.freePattern;
            var pattern = filters.reduce(function(global2, local) {
              return global2 + "/" + (typeof local !== "undefined" ? "[^/]*(?:" + local + ")[^/]*" : "[^/]*");
            }, "");
            var regExp = new RegExp(pattern, "i");
            var urls = this._urls.filter(function(url) {
              return regExp.test(url);
            });
            if (typeof freePattern !== "undefined") {
              var patterns = freePattern.split(/\s+/);
              patterns.forEach(function(current) {
                regExp = new RegExp(current, "i");
                urls = urls.filter(function(url) {
                  return regExp.test(url);
                });
              });
            }
            return urls;
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
          value: function getDataSetDefinitions(sourceUrl) {
            var promise = new Promise(function(resolve, reject) {
              var url = sourceUrl + ".dds";
              var request = new window.XMLHttpRequest();
              request.open("GET", url);
              request.onerror = function() {
                reject(new Error("Unable to GET " + url + ", status " + request.status + " " + ("" + request.responseText)));
              };
              request.onload = function() {
                if (request.status < 200 || request.status >= 300) {
                  request.onerror();
                  return;
                }
                resolve((0, _parseDataSet.parseDataSet)(request.response));
              };
              request.send();
            });
            return promise;
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
          value: function getSourcePositions(sourceUrl) {
            var promise = new Promise(function(resolve, reject) {
              var url = sourceUrl + ".json?SourcePosition";
              var request = new window.XMLHttpRequest();
              request.open("GET", url);
              request.onerror = function() {
                reject(new Error("Unable to GET " + url + ", status " + request.status + " " + ("" + request.responseText)));
              };
              request.onload = function() {
                if (request.status < 200 || request.status >= 300) {
                  request.onerror();
                  return;
                }
                try {
                  var response = JSON.parse(request.response);
                  if (response.leaves[0].name !== "SourcePosition") {
                    throw new Error("SourcePosition not found");
                  }
                  resolve(response.leaves[0].data);
                } catch (error) {
                  reject(new Error("Unable to parse response from " + url + ". " + error.message));
                }
              };
              request.send();
            });
            return promise;
          }
        }]);
        return ServerDataBase2;
      }();
      exports$13.default = ServerDataBase;
    }, { "./parseDataSet": 19, "./parseXml": 21 }], 19: [function(require2, module3, exports$13) {
      Object.defineProperty(exports$13, "__esModule", {
        value: true
      });
      exports$13._parseDimension = _parseDimension;
      exports$13._parseDefinition = _parseDefinition;
      exports$13.parseDataSet = parseDataSet;
      /**
       * @fileOverview Parser for DDS files
       * @author Jean-Philippe.Lambert@ircam.fr
       * @copyright 2015-2016 IRCAM, Paris, France
       * @license BSD-3-Clause
       */
      var _dimensionPattern = "\\[\\s*(\\w+)\\s*=\\s*(\\d+)\\s*\\]";
      var _dimensionMatch = new RegExp(_dimensionPattern, "g");
      var _dimensionSplit = new RegExp(_dimensionPattern);
      var _definitionPattern = "\\s*(\\w+)\\s*([\\w.]+)\\s*((?:\\[[^\\]]+\\]\\s*)+);\\s*";
      var _definitionMatch = new RegExp(_definitionPattern, "g");
      var _definitionSplit = new RegExp(_definitionPattern);
      var _dataSetPattern = "\\s*Dataset\\s*\\{\\s*((?:[^;]+;\\s*)*)\\s*\\}\\s*[\\w.]+\\s*;\\s*";
      var _dataSetSplit = new RegExp(_dataSetPattern);
      function _parseDimension(input) {
        var parse = [];
        var inputs = input.match(_dimensionMatch);
        if (inputs !== null) {
          inputs.forEach(function(inputSingle) {
            var parts = _dimensionSplit.exec(inputSingle);
            if (parts !== null && parts.length > 2) {
              parse.push([parts[1], Number(parts[2])]);
            }
          });
        }
        return parse;
      }
      function _parseDefinition(input) {
        var parse = [];
        var inputs = input.match(_definitionMatch);
        if (inputs !== null) {
          inputs.forEach(function(inputSingle) {
            var parts = _definitionSplit.exec(inputSingle);
            if (parts !== null && parts.length > 3) {
              var current = [];
              current[0] = parts[2];
              current[1] = {};
              current[1].type = parts[1];
              _parseDimension(parts[3]).forEach(function(dimension) {
                current[1][dimension[0]] = dimension[1];
              });
              parse.push(current);
            }
          });
        }
        return parse;
      }
      function parseDataSet(input) {
        var parse = {};
        var definitions = _dataSetSplit.exec(input);
        if (definitions !== null && definitions.length > 1) {
          _parseDefinition(definitions[1]).forEach(function(definition) {
            parse[definition[0]] = definition[1];
          });
        }
        return parse;
      }
      exports$13.default = parseDataSet;
    }, {}], 20: [function(require2, module3, exports$13) {
      Object.defineProperty(exports$13, "__esModule", {
        value: true
      });
      exports$13.parseSofa = parseSofa;
      exports$13.stringifySofa = stringifySofa;
      exports$13.conformSofaCoordinateSystem = conformSofaCoordinateSystem;
      /**
       * @fileOverview Parser functions for SOFA files
       * @author Jean-Philippe.Lambert@ircam.fr
       * @copyright 2015 IRCAM, Paris, France
       * @license BSD-3-Clause
       */
      function parseSofa(sofaString) {
        try {
          var sofa = JSON.parse(sofaString);
          var sofaSet = {};
          sofaSet.name = sofa.name;
          if (typeof sofa.attributes !== "undefined") {
            sofaSet.metaData = {};
            var metaData = sofa.attributes.find(function(e) {
              return e.name === "NC_GLOBAL";
            });
            if (typeof metaData !== "undefined") {
              metaData.attributes.forEach(function(e) {
                sofaSet.metaData[e.name] = e.value[0];
              });
            }
          }
          if (typeof sofa.leaves !== "undefined") {
            var data = sofa.leaves;
            data.forEach(function(d) {
              sofaSet[d.name] = {};
              d.attributes.forEach(function(a) {
                sofaSet[d.name][a.name] = a.value[0];
              });
              sofaSet[d.name].shape = d.shape;
              sofaSet[d.name].data = d.data;
            });
          }
          return sofaSet;
        } catch (error) {
          throw new Error("Unable to parse SOFA string. " + error.message);
        }
      }
      function stringifySofa(sofaSet) {
        var sofa = {};
        if (typeof sofaSet.name !== "undefined") {
          sofa.name = sofaSet.name;
        }
        if (typeof sofaSet.metaData !== "undefined") {
          sofa.attributes = [];
          var ncGlobal = {
            name: "NC_GLOBAL",
            attributes: []
          };
          for (var attribute in sofaSet.metaData) {
            if (sofaSet.metaData.hasOwnProperty(attribute)) {
              ncGlobal.attributes.push({
                name: attribute,
                value: [sofaSet.metaData[attribute]]
              });
            }
          }
          sofa.attributes.push(ncGlobal);
        }
        var type = "Float64";
        var attributes = void 0;
        sofa.leaves = [];
        [["ListenerPosition", "ListenerPositionType"], ["ListenerUp", "ListenerUpType"], ["ListenerView", "ListenerViewType"]].forEach(function(listenerAttributeAndType) {
          var listenerAttributeName = listenerAttributeAndType[0];
          var listenerAttribute = sofaSet[listenerAttributeName];
          var listenerType = sofaSet[listenerAttributeAndType[1]];
          if (typeof listenerAttribute !== "undefined") {
            switch (listenerType) {
              case "cartesian":
                attributes = [{ name: "Type", value: ["cartesian"] }, { name: "Units", value: ["metre, metre, metre"] }];
                break;
              case "spherical":
                attributes = [{ name: "Type", value: ["spherical"] }, { name: "Units", value: ["degree, degree, metre"] }];
                break;
              default:
                throw new Error("Unknown coordinate system type " + (listenerType + " for " + listenerAttribute));
            }
            sofa.leaves.push({
              name: listenerAttributeName,
              type,
              attributes,
              shape: [1, 3],
              data: [listenerAttribute]
            });
          }
        });
        if (typeof sofaSet.SourcePosition !== "undefined") {
          switch (sofaSet.SourcePositionType) {
            case "cartesian":
              attributes = [{ name: "Type", value: ["cartesian"] }, { name: "Units", value: ["metre, metre, metre"] }];
              break;
            case "spherical":
              attributes = [{ name: "Type", value: ["spherical"] }, { name: "Units", value: ["degree, degree, metre"] }];
              break;
            default:
              throw new Error("Unknown coordinate system type " + ("" + sofaSet.SourcePositionType));
          }
          sofa.leaves.push({
            name: "SourcePosition",
            type,
            attributes,
            shape: [sofaSet.SourcePosition.length, sofaSet.SourcePosition[0].length],
            data: sofaSet.SourcePosition
          });
        }
        if (typeof sofaSet.DataSamplingRate !== "undefined") {
          sofa.leaves.push({
            name: "Data.SamplingRate",
            type,
            attributes: [{ name: "Unit", value: "hertz" }],
            shape: [1],
            data: [sofaSet.DataSamplingRate]
          });
        } else {
          throw new Error("No data sampling-rate");
        }
        if (typeof sofaSet.DataDelay !== "undefined") {
          sofa.leaves.push({
            name: "Data.Delay",
            type,
            attributes: [],
            shape: [1, sofaSet.DataDelay.length],
            data: sofaSet.DataDelay
          });
        }
        if (typeof sofaSet.DataIR !== "undefined") {
          sofa.leaves.push({
            name: "Data.IR",
            type,
            attributes: [],
            shape: [sofaSet.DataIR.length, sofaSet.DataIR[0].length, sofaSet.DataIR[0][0].length],
            data: sofaSet.DataIR
          });
        } else {
          throw new Error("No data IR");
        }
        if (typeof sofaSet.RoomVolume !== "undefined") {
          sofa.leaves.push({
            name: "RoomVolume",
            type,
            attributes: [{ name: "Units", value: ["cubic metre"] }],
            shape: [1],
            data: [sofaSet.RoomVolume]
          });
        }
        sofa.nodes = [];
        return JSON.stringify(sofa);
      }
      function conformSofaCoordinateSystem(system) {
        var type = void 0;
        switch (system) {
          case "cartesian":
            type = "sofaCartesian";
            break;
          case "spherical":
            type = "sofaSpherical";
            break;
          default:
            throw new Error("Bad SOFA type " + system);
        }
        return type;
      }
      exports$13.default = {
        parseSofa,
        conformSofaCoordinateSystem
      };
    }, {}], 21: [function(require2, module3, exports$13) {
      Object.defineProperty(exports$13, "__esModule", {
        value: true
      });
      /**
       * @fileOverview Simple XML parser, as a DOM parser.
       * @author Jean-Philippe.Lambert@ircam.fr
       * @copyright 2015-2016 IRCAM, Paris, France
       * @license BSD-3-Clause
       */
      var parseXml = exports$13.parseXml = void 0;
      if (typeof window.DOMParser !== "undefined") {
        exports$13.parseXml = parseXml = function parseXmlDOM(xmlStr) {
          return new window.DOMParser().parseFromString(xmlStr, "text/xml");
        };
      } else if (typeof window.ActiveXObject !== "undefined" && new window.ActiveXObject("Microsoft.XMLDOM")) {
        exports$13.parseXml = parseXml = function parseXmlActiveX(xmlStr) {
          var xmlDoc = new window.ActiveXObject("Microsoft.XMLDOM");
          xmlDoc.async = "false";
          xmlDoc.loadXML(xmlStr);
          return xmlDoc;
        };
      } else {
        throw new Error("No XML parser found");
      }
      exports$13.default = parseXml;
    }, {}] }, {}, [15])(15);
  });
})(serveSofaHrir);
var serveSofaHrirExports = serveSofaHrir.exports;
class HRIRloader_ircam {
  constructor(context, order, callback) {
    this.context = context;
    this.order = order;
    this.nCh = getAmbisonicChannelCount(order);
    this.onLoad = callback;
    this.hrtfSet = new serveSofaHrirExports.HrtfSet({
      audioContext: this.context,
      coordinateSystem: "sofaSpherical"
    });
    this.wishedSpeakerPos = getTdesign(2 * this.order);
    this.hrirBuffer = [];
    this.decodingMatrix = [];
    this.hoaBuffer = null;
  }
  load(setUrl) {
    this.hrtfSet.load(setUrl).then(() => {
      const grantedFilterPos = [];
      this.hrirBuffer = [];
      for (let i = 0; i < this.wishedSpeakerPos.length; i++) {
        grantedFilterPos.push(this.hrtfSet.nearest(this.wishedSpeakerPos[i]).position);
        this.hrirBuffer.push(this.hrtfSet.nearest(this.wishedSpeakerPos[i]).fir);
      }
      let angularDistDeg = 0;
      for (let i = 0; i < this.wishedSpeakerPos.length; i++) {
        if (this.wishedSpeakerPos[i][0] < 0) this.wishedSpeakerPos[i][0] += 360;
        angularDistDeg += Math.sqrt(
          Math.pow(this.wishedSpeakerPos[i][0] - grantedFilterPos[i][0], 2) + Math.pow(this.wishedSpeakerPos[i][1] - grantedFilterPos[i][1], 2)
        );
      }
      console.log(
        "summed / average angular dist between asked and present pos:",
        Math.round(angularDistDeg * 100) / 100,
        "deg /",
        Math.round(angularDistDeg / this.wishedSpeakerPos.length * 100) / 100,
        "deg"
      );
      this.decodingMatrix = getAmbisonicDecMtx(grantedFilterPos, this.order);
      this.hoaBuffer = this.getHoaFilterFromHrirFilter();
      this.onLoad(this.hoaBuffer);
    });
  }
  getHoaFilterFromHrirFilter() {
    const hrirBufferLength = this.hrirBuffer[0].length;
    const hrirBufferSampleRate = this.hrirBuffer[0].sampleRate;
    const hoaBuffer = this.context.createBuffer(
      this.nCh,
      hrirBufferLength,
      hrirBufferSampleRate
    );
    for (let i = 0; i < this.nCh; i++) {
      const concatBufferArrayLeft = new Float32Array(hrirBufferLength);
      for (let j = 0; j < this.hrirBuffer.length; j++) {
        for (let k2 = 0; k2 < hrirBufferLength; k2++) {
          concatBufferArrayLeft[k2] += this.decodingMatrix[j][i] * this.hrirBuffer[j].getChannelData(0)[k2];
        }
      }
      hoaBuffer.getChannelData(i).set(concatBufferArrayLeft);
    }
    return hoaBuffer;
  }
}
class wxyz2acn {
  constructor(audioCtx) {
    this.ctx = audioCtx;
    this.in = this.ctx.createChannelSplitter(4);
    this.out = this.ctx.createChannelMerger(4);
    this.gains = new Array(4);
    for (let i = 0; i < 4; i++) {
      this.gains[i] = this.ctx.createGain();
      if (i === 0) this.gains[i].gain.value = Math.SQRT2;
      else this.gains[i].gain.value = Math.sqrt(3);
      this.gains[i].connect(this.out, 0, i);
    }
    this.in.connect(this.gains[0], 0, 0);
    this.in.connect(this.gains[3], 1, 0);
    this.in.connect(this.gains[1], 2, 0);
    this.in.connect(this.gains[2], 3, 0);
  }
}
class acn2wxyz {
  constructor(audioCtx) {
    this.ctx = audioCtx;
    this.in = this.ctx.createChannelSplitter(4);
    this.out = this.ctx.createChannelMerger(4);
    this.gains = new Array(4);
    for (let i = 0; i < 4; i++) {
      this.gains[i] = this.ctx.createGain();
      if (i === 0) this.gains[i].gain.value = Math.SQRT1_2;
      else this.gains[i].gain.value = 1 / Math.sqrt(3);
      this.gains[i].connect(this.out, 0, i);
    }
    this.in.connect(this.gains[0], 0, 0);
    this.in.connect(this.gains[2], 1, 0);
    this.in.connect(this.gains[3], 2, 0);
    this.in.connect(this.gains[1], 3, 0);
  }
}
class sn3d2n3d {
  constructor(audioCtx, order) {
    this.ctx = audioCtx;
    this.order = order;
    this.nCh = getAmbisonicChannelCount(order);
    this.in = this.ctx.createChannelSplitter(this.nCh);
    this.out = this.ctx.createChannelMerger(this.nCh);
    this.gains = new Array(this.nCh);
    for (let i = 0; i < this.nCh; i++) {
      const n = Math.floor(Math.sqrt(i));
      this.gains[i] = this.ctx.createGain();
      this.gains[i].gain.value = Math.sqrt(2 * n + 1);
      this.in.connect(this.gains[i], i, 0);
      this.gains[i].connect(this.out, 0, i);
    }
  }
}
class n3d2sn3d {
  constructor(audioCtx, order) {
    this.ctx = audioCtx;
    this.order = order;
    this.nCh = getAmbisonicChannelCount(order);
    this.in = this.ctx.createChannelSplitter(this.nCh);
    this.out = this.ctx.createChannelMerger(this.nCh);
    this.gains = new Array(this.nCh);
    for (let i = 0; i < this.nCh; i++) {
      const n = Math.floor(Math.sqrt(i));
      this.gains[i] = this.ctx.createGain();
      this.gains[i].gain.value = 1 / Math.sqrt(2 * n + 1);
      this.in.connect(this.gains[i], i, 0);
      this.gains[i].connect(this.out, 0, i);
    }
  }
}
class fuma2acn {
  constructor(audioCtx, order) {
    let actualOrder = order;
    if (actualOrder > 3) {
      console.log("FuMa specifiction is supported up to 3rd order");
      actualOrder = 3;
    }
    const gains_fuma2n3d = [
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
      // P
    ];
    this.ctx = audioCtx;
    this.order = actualOrder;
    this.nCh = getAmbisonicChannelCount(actualOrder);
    this.in = this.ctx.createChannelSplitter(this.nCh);
    this.out = this.ctx.createChannelMerger(this.nCh);
    this.gains = [];
    this.remapArray = [];
    this.remapArray.push(0, 2, 3, 1);
    if (actualOrder > 1) {
      let o = 0;
      let m;
      for (let i = 0; i < this.nCh; i++) {
        m = [];
        if (i >= (o + 1) * (o + 1)) {
          o += 1;
          for (let j = (o + 1) * (o + 1); j < (o + 2) * (o + 2); j++) {
            if ((j + o % 2) % 2 === 0) {
              m.push(j);
            } else {
              m.unshift(j);
            }
          }
          this.remapArray = this.remapArray.concat(m);
        }
      }
    }
    for (let i = 0; i < this.nCh; i++) {
      this.gains[i] = this.ctx.createGain();
      this.gains[i].gain.value = gains_fuma2n3d[i];
      this.in.connect(this.gains[i], this.remapArray[i], 0);
      this.gains[i].connect(this.out, 0, i);
    }
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
const converters = _converters;
const utils = _utils;
export {
  HOAloader,
  HRIRloader2D_local,
  HRIRloader_ircam,
  HRIRloader_local,
  binDecoder,
  binDecoder2D,
  computeEncodingCoefficients,
  computeEncodingCoefficients2D,
  converters,
  convolver,
  decoder,
  degreesToRadians,
  encodeAndSumBuffers,
  encodeBuffer,
  encodeBuffer2D,
  encodeBuffer2DFromDirection,
  encodeBufferFromDirection,
  getAmbisonicChannelCount,
  getAmbisonicChannelCount2D,
  intensityAnalyser,
  intensityAnalyser2D,
  monoEncoder,
  monoEncoder2D,
  orderLimiter,
  orderLimiter2D,
  orderWeight,
  powermapAnalyser,
  radiansToDegrees,
  rmsAnalyser,
  sceneMirror,
  sceneMirror2D,
  sceneRotator,
  sceneRotator2D,
  utils,
  virtualMic
};
//# sourceMappingURL=ambisonics.es.js.map
