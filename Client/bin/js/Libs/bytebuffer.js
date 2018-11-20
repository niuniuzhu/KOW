/*
 bytebuffer.js (c) 2015 Daniel Wirtz <dcode@dcode.io>
 Backing buffer: ArrayBuffer, Accessor: Uint8Array
 Released under the Apache License, Version 2.0
 see: https://github.com/dcodeIO/bytebuffer.js for details
*/
(function (h, l) { if ("function" === typeof define && define.amd) define(["./long"], l); else if ("function" === typeof require && "object" === typeof module && module && module.exports) { h = module; try { var t = require("long") } catch (v) { } l = l(t); h.exports = l } else (h.dcodeIO = h.dcodeIO || {}).ByteBuffer = l(h.dcodeIO.Long) })(this, function (h) {
	function l(a) { var b = 0; return function () { return b < a.length ? a.charCodeAt(b++) : null } } function t() {
		var a = [], b = []; return function () {
			if (0 === arguments.length) return b.join("") + x.apply(String, a); 1024 < a.length +
				arguments.length && (b.push(x.apply(String, a)), a.length = 0); Array.prototype.push.apply(a, arguments)
		}
	} function v(a, b, c, e, k) { var f = 8 * k - e - 1; var d = (1 << f) - 1, g = d >> 1, n = -7; k = c ? k - 1 : 0; var h = c ? -1 : 1, q = a[b + k]; k += h; c = q & (1 << -n) - 1; q >>= -n; for (n += f; 0 < n; c = 256 * c + a[b + k], k += h, n -= 8); f = c & (1 << -n) - 1; c >>= -n; for (n += e; 0 < n; f = 256 * f + a[b + k], k += h, n -= 8); if (0 === c) c = 1 - g; else { if (c === d) return f ? NaN : Infinity * (q ? -1 : 1); f += Math.pow(2, e); c -= g } return (q ? -1 : 1) * f * Math.pow(2, c - e) } function y(a, b, c, e, k, f) {
		var d, g = 8 * f - k - 1, n = (1 << g) - 1, h = n >> 1, q = 23 === k ? Math.pow(2,
			-24) - Math.pow(2, -77) : 0; f = e ? 0 : f - 1; var l = e ? 1 : -1, m = 0 > b || 0 === b && 0 > 1 / b ? 1 : 0; b = Math.abs(b); isNaN(b) || Infinity === b ? (b = isNaN(b) ? 1 : 0, e = n) : (e = Math.floor(Math.log(b) / Math.LN2), 1 > b * (d = Math.pow(2, -e)) && (e-- , d *= 2), b = 1 <= e + h ? b + q / d : b + q * Math.pow(2, 1 - h), 2 <= b * d && (e++ , d /= 2), e + h >= n ? (b = 0, e = n) : 1 <= e + h ? (b = (b * d - 1) * Math.pow(2, k), e += h) : (b = b * Math.pow(2, h - 1) * Math.pow(2, k), e = 0)); for (; 8 <= k; a[c + f] = b & 255, f += l, b /= 256, k -= 8); e = e << k | b; for (g += k; 0 < g; a[c + f] = e & 255, f += l, e /= 256, g -= 8); a[c + f - l] |= 128 * m
	} var g = function (a, b, c) {
	"undefined" === typeof a &&
		(a = g.DEFAULT_CAPACITY); "undefined" === typeof b && (b = g.DEFAULT_ENDIAN); "undefined" === typeof c && (c = g.DEFAULT_NOASSERT); if (!c) { a |= 0; if (0 > a) throw RangeError("Illegal capacity"); b = !!b; c = !!c } this.buffer = 0 === a ? w : new ArrayBuffer(a); this.view = 0 === a ? null : new Uint8Array(this.buffer); this.offset = 0; this.markedOffset = -1; this.limit = a; this.littleEndian = b; this.noAssert = c
	}; g.VERSION = "5.0.1"; g.LITTLE_ENDIAN = !0; g.BIG_ENDIAN = !1; g.DEFAULT_CAPACITY = 16; g.DEFAULT_ENDIAN = g.BIG_ENDIAN; g.DEFAULT_NOASSERT = !1; g.Long = h || null; var d =
		g.prototype; Object.defineProperty(d, "__isByteBuffer__", { value: !0, enumerable: !1, configurable: !1 }); var w = new ArrayBuffer(0), x = String.fromCharCode; g.accessor = function () { return Uint8Array }; g.allocate = function (a, b, c) { return new g(a, b, c) }; g.concat = function (a, b, c, e) {
			if ("boolean" === typeof b || "string" !== typeof b) e = c, c = b, b = void 0; for (var k = 0, f = 0, d = a.length, u; f < d; ++f)g.isByteBuffer(a[f]) || (a[f] = g.wrap(a[f], b)), u = a[f].limit - a[f].offset, 0 < u && (k += u); if (0 === k) return new g(0, c, e); b = new g(k, c, e); for (f = 0; f < d;)c = a[f++],
				u = c.limit - c.offset, 0 >= u || (b.view.set(c.view.subarray(c.offset, c.limit), b.offset), b.offset += u); b.limit = b.offset; b.offset = 0; return b
		}; g.isByteBuffer = function (a) { return !0 === (a && a.__isByteBuffer__) }; g.type = function () { return ArrayBuffer }; g.wrap = function (a, b, c, e) {
		"string" !== typeof b && (e = c, c = b, b = void 0); if ("string" === typeof a) switch ("undefined" === typeof b && (b = "utf8"), b) {
			case "base64": return g.fromBase64(a, c); case "hex": return g.fromHex(a, c); case "binary": return g.fromBinary(a, c); case "utf8": return g.fromUTF8(a,
				c); case "debug": return g.fromDebug(a, c); default: throw Error("Unsupported encoding: " + b);
		}if (null === a || "object" !== typeof a) throw TypeError("Illegal buffer"); if (g.isByteBuffer(a)) return b = d.clone.call(a), b.markedOffset = -1, b; if (a instanceof Uint8Array) b = new g(0, c, e), 0 < a.length && (b.buffer = a.buffer, b.offset = a.byteOffset, b.limit = a.byteOffset + a.byteLength, b.view = new Uint8Array(a.buffer)); else if (a instanceof ArrayBuffer) b = new g(0, c, e), 0 < a.byteLength && (b.buffer = a, b.offset = 0, b.limit = a.byteLength, b.view = 0 <
			a.byteLength ? new Uint8Array(a) : null); else if ("[object Array]" === Object.prototype.toString.call(a)) for (b = new g(a.length, c, e), b.limit = a.length, c = 0; c < a.length; ++c)b.view[c] = a[c]; else throw TypeError("Illegal buffer"); return b
		}; d.writeBitSet = function (a, b) {
			var c = "undefined" === typeof b; c && (b = this.offset); if (!this.noAssert) {
				if (!(a instanceof Array)) throw TypeError("Illegal BitSet: Not an array"); if ("number" !== typeof b || 0 !== b % 1) throw TypeError("Illegal offset: " + b + " (not an integer)"); b >>>= 0; if (0 > b || b + 0 >
					this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + b + " (+0) <= " + this.buffer.byteLength);
			} var e = b, k = a.length, f = k >> 3, d = 0; for (b += this.writeVarint32(k, b); f--;) { var g = !!a[d++] & 1 | (!!a[d++] & 1) << 1 | (!!a[d++] & 1) << 2 | (!!a[d++] & 1) << 3 | (!!a[d++] & 1) << 4 | (!!a[d++] & 1) << 5 | (!!a[d++] & 1) << 6 | (!!a[d++] & 1) << 7; this.writeByte(g, b++) } if (d < k) { for (g = f = 0; d < k;)g |= (!!a[d++] & 1) << f++; this.writeByte(g, b++) } return c ? (this.offset = b, this) : b - e
		}; d.readBitSet = function (a) {
			var b = "undefined" === typeof a; b && (a = this.offset); var c =
				this.readVarint32(a), e = c.value, k = e >> 3, f = 0, d = []; for (a += c.length; k--;)c = this.readByte(a++), d[f++] = !!(c & 1), d[f++] = !!(c & 2), d[f++] = !!(c & 4), d[f++] = !!(c & 8), d[f++] = !!(c & 16), d[f++] = !!(c & 32), d[f++] = !!(c & 64), d[f++] = !!(c & 128); if (f < e) for (k = 0, c = this.readByte(a++); f < e;)d[f++] = !!(c >> k++ & 1); b && (this.offset = a); return d
		}; d.readBytes = function (a, b) {
			var c = "undefined" === typeof b; c && (b = this.offset); if (!this.noAssert) {
				if ("number" !== typeof b || 0 !== b % 1) throw TypeError("Illegal offset: " + b + " (not an integer)"); b >>>= 0; if (0 > b ||
					b + a > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + b + " (+" + a + ") <= " + this.buffer.byteLength);
			} b = this.slice(b, b + a); c && (this.offset += a); return b
		}; d.writeInt8 = function (a, b) {
			var c = "undefined" === typeof b; c && (b = this.offset); if (!this.noAssert) {
				if ("number" !== typeof a || 0 !== a % 1) throw TypeError("Illegal value: " + a + " (not an integer)"); a |= 0; if ("number" !== typeof b || 0 !== b % 1) throw TypeError("Illegal offset: " + b + " (not an integer)"); b >>>= 0; if (0 > b || b + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " +
					b + " (+0) <= " + this.buffer.byteLength);
			} b += 1; var e = this.buffer.byteLength; b > e && this.resize((e *= 2) > b ? e : b); this.view[b - 1] = a; c && (this.offset += 1); return this
		}; d.writeByte = d.writeInt8; d.readInt8 = function (a) {
			var b = "undefined" === typeof a; b && (a = this.offset); if (!this.noAssert) { if ("number" !== typeof a || 0 !== a % 1) throw TypeError("Illegal offset: " + a + " (not an integer)"); a >>>= 0; if (0 > a || a + 1 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + a + " (+1) <= " + this.buffer.byteLength); } a = this.view[a]; 128 ===
				(a & 128) && (a = -(255 - a + 1)); b && (this.offset += 1); return a
		}; d.readByte = d.readInt8; d.writeUint8 = function (a, b) {
			var c = "undefined" === typeof b; c && (b = this.offset); if (!this.noAssert) { if ("number" !== typeof a || 0 !== a % 1) throw TypeError("Illegal value: " + a + " (not an integer)"); a >>>= 0; if ("number" !== typeof b || 0 !== b % 1) throw TypeError("Illegal offset: " + b + " (not an integer)"); b >>>= 0; if (0 > b || b + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + b + " (+0) <= " + this.buffer.byteLength); } b += 1; var e = this.buffer.byteLength;
			b > e && this.resize((e *= 2) > b ? e : b); this.view[b - 1] = a; c && (this.offset += 1); return this
		}; d.writeUInt8 = d.writeUint8; d.readUint8 = function (a) { var b = "undefined" === typeof a; b && (a = this.offset); if (!this.noAssert) { if ("number" !== typeof a || 0 !== a % 1) throw TypeError("Illegal offset: " + a + " (not an integer)"); a >>>= 0; if (0 > a || a + 1 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + a + " (+1) <= " + this.buffer.byteLength); } a = this.view[a]; b && (this.offset += 1); return a }; d.readUInt8 = d.readUint8; d.writeInt16 = function (a,
			b) {
				var c = "undefined" === typeof b; c && (b = this.offset); if (!this.noAssert) { if ("number" !== typeof a || 0 !== a % 1) throw TypeError("Illegal value: " + a + " (not an integer)"); a |= 0; if ("number" !== typeof b || 0 !== b % 1) throw TypeError("Illegal offset: " + b + " (not an integer)"); b >>>= 0; if (0 > b || b + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + b + " (+0) <= " + this.buffer.byteLength); } b += 2; var e = this.buffer.byteLength; b > e && this.resize((e *= 2) > b ? e : b); b -= 2; this.littleEndian ? (this.view[b + 1] = (a & 65280) >>> 8, this.view[b] =
					a & 255) : (this.view[b] = (a & 65280) >>> 8, this.view[b + 1] = a & 255); c && (this.offset += 2); return this
		}; d.writeShort = d.writeInt16; d.readInt16 = function (a) {
			var b = "undefined" === typeof a; b && (a = this.offset); if (!this.noAssert) { if ("number" !== typeof a || 0 !== a % 1) throw TypeError("Illegal offset: " + a + " (not an integer)"); a >>>= 0; if (0 > a || a + 2 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + a + " (+2) <= " + this.buffer.byteLength); } if (this.littleEndian) { var c = this.view[a]; c |= this.view[a + 1] << 8 } else c = this.view[a] <<
				8, c |= this.view[a + 1]; 32768 === (c & 32768) && (c = -(65535 - c + 1)); b && (this.offset += 2); return c
		}; d.readShort = d.readInt16; d.writeUint16 = function (a, b) {
			var c = "undefined" === typeof b; c && (b = this.offset); if (!this.noAssert) {
				if ("number" !== typeof a || 0 !== a % 1) throw TypeError("Illegal value: " + a + " (not an integer)"); a >>>= 0; if ("number" !== typeof b || 0 !== b % 1) throw TypeError("Illegal offset: " + b + " (not an integer)"); b >>>= 0; if (0 > b || b + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + b + " (+0) <= " + this.buffer.byteLength);
			} b += 2; var e = this.buffer.byteLength; b > e && this.resize((e *= 2) > b ? e : b); b -= 2; this.littleEndian ? (this.view[b + 1] = (a & 65280) >>> 8, this.view[b] = a & 255) : (this.view[b] = (a & 65280) >>> 8, this.view[b + 1] = a & 255); c && (this.offset += 2); return this
		}; d.writeUInt16 = d.writeUint16; d.readUint16 = function (a) {
			var b = "undefined" === typeof a; b && (a = this.offset); if (!this.noAssert) {
				if ("number" !== typeof a || 0 !== a % 1) throw TypeError("Illegal offset: " + a + " (not an integer)"); a >>>= 0; if (0 > a || a + 2 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " +
					a + " (+2) <= " + this.buffer.byteLength);
			} if (this.littleEndian) { var c = this.view[a]; c |= this.view[a + 1] << 8 } else c = this.view[a] << 8, c |= this.view[a + 1]; b && (this.offset += 2); return c
		}; d.readUInt16 = d.readUint16; d.writeInt32 = function (a, b) {
			var c = "undefined" === typeof b; c && (b = this.offset); if (!this.noAssert) {
				if ("number" !== typeof a || 0 !== a % 1) throw TypeError("Illegal value: " + a + " (not an integer)"); a |= 0; if ("number" !== typeof b || 0 !== b % 1) throw TypeError("Illegal offset: " + b + " (not an integer)"); b >>>= 0; if (0 > b || b + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " +
					b + " (+0) <= " + this.buffer.byteLength);
			} b += 4; var e = this.buffer.byteLength; b > e && this.resize((e *= 2) > b ? e : b); b -= 4; this.littleEndian ? (this.view[b + 3] = a >>> 24 & 255, this.view[b + 2] = a >>> 16 & 255, this.view[b + 1] = a >>> 8 & 255, this.view[b] = a & 255) : (this.view[b] = a >>> 24 & 255, this.view[b + 1] = a >>> 16 & 255, this.view[b + 2] = a >>> 8 & 255, this.view[b + 3] = a & 255); c && (this.offset += 4); return this
		}; d.writeInt = d.writeInt32; d.readInt32 = function (a) {
			var b = "undefined" === typeof a; b && (a = this.offset); if (!this.noAssert) {
				if ("number" !== typeof a || 0 !== a %
					1) throw TypeError("Illegal offset: " + a + " (not an integer)"); a >>>= 0; if (0 > a || a + 4 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + a + " (+4) <= " + this.buffer.byteLength);
			} if (this.littleEndian) { var c = this.view[a + 2] << 16; c |= this.view[a + 1] << 8; c |= this.view[a]; c += this.view[a + 3] << 24 >>> 0 } else c = this.view[a + 1] << 16, c |= this.view[a + 2] << 8, c |= this.view[a + 3], c += this.view[a] << 24 >>> 0; b && (this.offset += 4); return c | 0
		}; d.readInt = d.readInt32; d.writeUint32 = function (a, b) {
			var c = "undefined" === typeof b; c && (b = this.offset);
			if (!this.noAssert) { if ("number" !== typeof a || 0 !== a % 1) throw TypeError("Illegal value: " + a + " (not an integer)"); a >>>= 0; if ("number" !== typeof b || 0 !== b % 1) throw TypeError("Illegal offset: " + b + " (not an integer)"); b >>>= 0; if (0 > b || b + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + b + " (+0) <= " + this.buffer.byteLength); } b += 4; var e = this.buffer.byteLength; b > e && this.resize((e *= 2) > b ? e : b); b -= 4; this.littleEndian ? (this.view[b + 3] = a >>> 24 & 255, this.view[b + 2] = a >>> 16 & 255, this.view[b + 1] = a >>> 8 & 255, this.view[b] =
				a & 255) : (this.view[b] = a >>> 24 & 255, this.view[b + 1] = a >>> 16 & 255, this.view[b + 2] = a >>> 8 & 255, this.view[b + 3] = a & 255); c && (this.offset += 4); return this
		}; d.writeUInt32 = d.writeUint32; d.readUint32 = function (a) {
			var b = "undefined" === typeof a; b && (a = this.offset); if (!this.noAssert) { if ("number" !== typeof a || 0 !== a % 1) throw TypeError("Illegal offset: " + a + " (not an integer)"); a >>>= 0; if (0 > a || a + 4 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + a + " (+4) <= " + this.buffer.byteLength); } if (this.littleEndian) {
				var c = this.view[a +
					2] << 16; c |= this.view[a + 1] << 8; c |= this.view[a]; c += this.view[a + 3] << 24 >>> 0
			} else c = this.view[a + 1] << 16, c |= this.view[a + 2] << 8, c |= this.view[a + 3], c += this.view[a] << 24 >>> 0; b && (this.offset += 4); return c
		}; d.readUInt32 = d.readUint32; h && (d.writeInt64 = function (a, b) {
			var c = "undefined" === typeof b; c && (b = this.offset); if (!this.noAssert) {
				if ("number" === typeof a) a = h.fromNumber(a); else if ("string" === typeof a) a = h.fromString(a); else if (!(a && a instanceof h)) throw TypeError("Illegal value: " + a + " (not an integer or Long)"); if ("number" !==
					typeof b || 0 !== b % 1) throw TypeError("Illegal offset: " + b + " (not an integer)"); b >>>= 0; if (0 > b || b + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + b + " (+0) <= " + this.buffer.byteLength);
			} "number" === typeof a ? a = h.fromNumber(a) : "string" === typeof a && (a = h.fromString(a)); b += 8; var e = this.buffer.byteLength; b > e && this.resize((e *= 2) > b ? e : b); b -= 8; e = a.low; a = a.high; this.littleEndian ? (this.view[b + 3] = e >>> 24 & 255, this.view[b + 2] = e >>> 16 & 255, this.view[b + 1] = e >>> 8 & 255, this.view[b] = e & 255, b += 4, this.view[b + 3] = a >>>
				24 & 255, this.view[b + 2] = a >>> 16 & 255, this.view[b + 1] = a >>> 8 & 255, this.view[b] = a & 255) : (this.view[b] = a >>> 24 & 255, this.view[b + 1] = a >>> 16 & 255, this.view[b + 2] = a >>> 8 & 255, this.view[b + 3] = a & 255, b += 4, this.view[b] = e >>> 24 & 255, this.view[b + 1] = e >>> 16 & 255, this.view[b + 2] = e >>> 8 & 255, this.view[b + 3] = e & 255); c && (this.offset += 8); return this
		}, d.writeLong = d.writeInt64, d.readInt64 = function (a) {
			var b = "undefined" === typeof a; b && (a = this.offset); if (!this.noAssert) {
				if ("number" !== typeof a || 0 !== a % 1) throw TypeError("Illegal offset: " + a + " (not an integer)");
				a >>>= 0; if (0 > a || a + 8 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + a + " (+8) <= " + this.buffer.byteLength);
			} if (this.littleEndian) { var c = this.view[a + 2] << 16; c |= this.view[a + 1] << 8; c |= this.view[a]; c += this.view[a + 3] << 24 >>> 0; a += 4; var e = this.view[a + 2] << 16; e |= this.view[a + 1] << 8; e |= this.view[a]; e += this.view[a + 3] << 24 >>> 0 } else e = this.view[a + 1] << 16, e |= this.view[a + 2] << 8, e |= this.view[a + 3], e += this.view[a] << 24 >>> 0, a += 4, c = this.view[a + 1] << 16, c |= this.view[a + 2] << 8, c |= this.view[a + 3], c += this.view[a] << 24 >>>
				0; a = new h(c, e, !1); b && (this.offset += 8); return a
		}, d.readLong = d.readInt64, d.writeUint64 = function (a, b) {
			var c = "undefined" === typeof b; c && (b = this.offset); if (!this.noAssert) {
				if ("number" === typeof a) a = h.fromNumber(a); else if ("string" === typeof a) a = h.fromString(a); else if (!(a && a instanceof h)) throw TypeError("Illegal value: " + a + " (not an integer or Long)"); if ("number" !== typeof b || 0 !== b % 1) throw TypeError("Illegal offset: " + b + " (not an integer)"); b >>>= 0; if (0 > b || b + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " +
					b + " (+0) <= " + this.buffer.byteLength);
			} "number" === typeof a ? a = h.fromNumber(a) : "string" === typeof a && (a = h.fromString(a)); b += 8; var e = this.buffer.byteLength; b > e && this.resize((e *= 2) > b ? e : b); b -= 8; e = a.low; a = a.high; this.littleEndian ? (this.view[b + 3] = e >>> 24 & 255, this.view[b + 2] = e >>> 16 & 255, this.view[b + 1] = e >>> 8 & 255, this.view[b] = e & 255, b += 4, this.view[b + 3] = a >>> 24 & 255, this.view[b + 2] = a >>> 16 & 255, this.view[b + 1] = a >>> 8 & 255, this.view[b] = a & 255) : (this.view[b] = a >>> 24 & 255, this.view[b + 1] = a >>> 16 & 255, this.view[b + 2] = a >>> 8 & 255, this.view[b +
				3] = a & 255, b += 4, this.view[b] = e >>> 24 & 255, this.view[b + 1] = e >>> 16 & 255, this.view[b + 2] = e >>> 8 & 255, this.view[b + 3] = e & 255); c && (this.offset += 8); return this
		}, d.writeUInt64 = d.writeUint64, d.readUint64 = function (a) {
			var b = "undefined" === typeof a; b && (a = this.offset); if (!this.noAssert) { if ("number" !== typeof a || 0 !== a % 1) throw TypeError("Illegal offset: " + a + " (not an integer)"); a >>>= 0; if (0 > a || a + 8 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + a + " (+8) <= " + this.buffer.byteLength); } if (this.littleEndian) {
				var c =
					this.view[a + 2] << 16; c |= this.view[a + 1] << 8; c |= this.view[a]; c += this.view[a + 3] << 24 >>> 0; a += 4; var e = this.view[a + 2] << 16; e |= this.view[a + 1] << 8; e |= this.view[a]; e += this.view[a + 3] << 24 >>> 0
			} else e = this.view[a + 1] << 16, e |= this.view[a + 2] << 8, e |= this.view[a + 3], e += this.view[a] << 24 >>> 0, a += 4, c = this.view[a + 1] << 16, c |= this.view[a + 2] << 8, c |= this.view[a + 3], c += this.view[a] << 24 >>> 0; a = new h(c, e, !0); b && (this.offset += 8); return a
		}, d.readUInt64 = d.readUint64); d.writeFloat32 = function (a, b) {
			var c = "undefined" === typeof b; c && (b = this.offset);
			if (!this.noAssert) { if ("number" !== typeof a) throw TypeError("Illegal value: " + a + " (not a number)"); if ("number" !== typeof b || 0 !== b % 1) throw TypeError("Illegal offset: " + b + " (not an integer)"); b >>>= 0; if (0 > b || b + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + b + " (+0) <= " + this.buffer.byteLength); } b += 4; var e = this.buffer.byteLength; b > e && this.resize((e *= 2) > b ? e : b); y(this.view, a, b - 4, this.littleEndian, 23, 4); c && (this.offset += 4); return this
		}; d.writeFloat = d.writeFloat32; d.readFloat32 = function (a) {
			var b =
				"undefined" === typeof a; b && (a = this.offset); if (!this.noAssert) { if ("number" !== typeof a || 0 !== a % 1) throw TypeError("Illegal offset: " + a + " (not an integer)"); a >>>= 0; if (0 > a || a + 4 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + a + " (+4) <= " + this.buffer.byteLength); } a = v(this.view, a, this.littleEndian, 23, 4); b && (this.offset += 4); return a
		}; d.readFloat = d.readFloat32; d.writeFloat64 = function (a, b) {
			var c = "undefined" === typeof b; c && (b = this.offset); if (!this.noAssert) {
				if ("number" !== typeof a) throw TypeError("Illegal value: " +
					a + " (not a number)"); if ("number" !== typeof b || 0 !== b % 1) throw TypeError("Illegal offset: " + b + " (not an integer)"); b >>>= 0; if (0 > b || b + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + b + " (+0) <= " + this.buffer.byteLength);
			} b += 8; var e = this.buffer.byteLength; b > e && this.resize((e *= 2) > b ? e : b); y(this.view, a, b - 8, this.littleEndian, 52, 8); c && (this.offset += 8); return this
		}; d.writeDouble = d.writeFloat64; d.readFloat64 = function (a) {
			var b = "undefined" === typeof a; b && (a = this.offset); if (!this.noAssert) {
				if ("number" !==
					typeof a || 0 !== a % 1) throw TypeError("Illegal offset: " + a + " (not an integer)"); a >>>= 0; if (0 > a || a + 8 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + a + " (+8) <= " + this.buffer.byteLength);
			} a = v(this.view, a, this.littleEndian, 52, 8); b && (this.offset += 8); return a
		}; d.readDouble = d.readFloat64; g.MAX_VARINT32_BYTES = 5; g.calculateVarint32 = function (a) { a >>>= 0; return 128 > a ? 1 : 16384 > a ? 2 : 2097152 > a ? 3 : 268435456 > a ? 4 : 5 }; g.zigZagEncode32 = function (a) { return ((a |= 0) << 1 ^ a >> 31) >>> 0 }; g.zigZagDecode32 = function (a) {
			return a >>>
				1 ^ -(a & 1) | 0
		}; d.writeVarint32 = function (a, b) {
			var c = "undefined" === typeof b; c && (b = this.offset); if (!this.noAssert) { if ("number" !== typeof a || 0 !== a % 1) throw TypeError("Illegal value: " + a + " (not an integer)"); a |= 0; if ("number" !== typeof b || 0 !== b % 1) throw TypeError("Illegal offset: " + b + " (not an integer)"); b >>>= 0; if (0 > b || b + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + b + " (+0) <= " + this.buffer.byteLength); } var e = g.calculateVarint32(a); b += e; var k = this.buffer.byteLength; b > k && this.resize((k *= 2) >
				b ? k : b); b -= e; for (a >>>= 0; 128 <= a;)k = a & 127 | 128, this.view[b++] = k, a >>>= 7; this.view[b++] = a; return c ? (this.offset = b, this) : e
		}; d.writeVarint32ZigZag = function (a, b) { return this.writeVarint32(g.zigZagEncode32(a), b) }; d.readVarint32 = function (a) {
			var b = "undefined" === typeof a; b && (a = this.offset); if (!this.noAssert) {
				if ("number" !== typeof a || 0 !== a % 1) throw TypeError("Illegal offset: " + a + " (not an integer)"); a >>>= 0; if (0 > a || a + 1 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + a + " (+1) <= " + this.buffer.byteLength);
			} var c = 0, e = 0; do { if (!this.noAssert && a > this.limit) throw a = Error("Truncated"), a.truncated = !0, a; var k = this.view[a++]; 5 > c && (e |= (k & 127) << 7 * c); ++c } while (0 !== (k & 128)); e |= 0; return b ? (this.offset = a, e) : { value: e, length: c }
		}; d.readVarint32ZigZag = function (a) { a = this.readVarint32(a); "object" === typeof a ? a.value = g.zigZagDecode32(a.value) : a = g.zigZagDecode32(a); return a }; h && (g.MAX_VARINT64_BYTES = 10, g.calculateVarint64 = function (a) {
			"number" === typeof a ? a = h.fromNumber(a) : "string" === typeof a && (a = h.fromString(a)); var b = a.toInt() >>>
				0, c = a.shiftRightUnsigned(28).toInt() >>> 0; a = a.shiftRightUnsigned(56).toInt() >>> 0; return 0 == a ? 0 == c ? 16384 > b ? 128 > b ? 1 : 2 : 2097152 > b ? 3 : 4 : 16384 > c ? 128 > c ? 5 : 6 : 2097152 > c ? 7 : 8 : 128 > a ? 9 : 10
		}, g.zigZagEncode64 = function (a) { "number" === typeof a ? a = h.fromNumber(a, !1) : "string" === typeof a ? a = h.fromString(a, !1) : !1 !== a.unsigned && (a = a.toSigned()); return a.shiftLeft(1).xor(a.shiftRight(63)).toUnsigned() }, g.zigZagDecode64 = function (a) {
			"number" === typeof a ? a = h.fromNumber(a, !1) : "string" === typeof a ? a = h.fromString(a, !1) : !1 !== a.unsigned &&
				(a = a.toSigned()); return a.shiftRightUnsigned(1).xor(a.and(h.ONE).toSigned().negate()).toSigned()
		}, d.writeVarint64 = function (a, b) {
			var c = "undefined" === typeof b; c && (b = this.offset); if (!this.noAssert) {
				if ("number" === typeof a) a = h.fromNumber(a); else if ("string" === typeof a) a = h.fromString(a); else if (!(a && a instanceof h)) throw TypeError("Illegal value: " + a + " (not an integer or Long)"); if ("number" !== typeof b || 0 !== b % 1) throw TypeError("Illegal offset: " + b + " (not an integer)"); b >>>= 0; if (0 > b || b + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " +
					b + " (+0) <= " + this.buffer.byteLength);
			} "number" === typeof a ? a = h.fromNumber(a, !1) : "string" === typeof a ? a = h.fromString(a, !1) : !1 !== a.unsigned && (a = a.toSigned()); var e = g.calculateVarint64(a), k = a.toInt() >>> 0, f = a.shiftRightUnsigned(28).toInt() >>> 0; a = a.shiftRightUnsigned(56).toInt() >>> 0; b += e; var d = this.buffer.byteLength; b > d && this.resize((d *= 2) > b ? d : b); b -= e; switch (e) {
				case 10: this.view[b + 9] = a >>> 7 & 1; case 9: this.view[b + 8] = 9 !== e ? a | 128 : a & 127; case 8: this.view[b + 7] = 8 !== e ? f >>> 21 | 128 : f >>> 21 & 127; case 7: this.view[b + 6] =
					7 !== e ? f >>> 14 | 128 : f >>> 14 & 127; case 6: this.view[b + 5] = 6 !== e ? f >>> 7 | 128 : f >>> 7 & 127; case 5: this.view[b + 4] = 5 !== e ? f | 128 : f & 127; case 4: this.view[b + 3] = 4 !== e ? k >>> 21 | 128 : k >>> 21 & 127; case 3: this.view[b + 2] = 3 !== e ? k >>> 14 | 128 : k >>> 14 & 127; case 2: this.view[b + 1] = 2 !== e ? k >>> 7 | 128 : k >>> 7 & 127; case 1: this.view[b] = 1 !== e ? k | 128 : k & 127
			}return c ? (this.offset += e, this) : e
		}, d.writeVarint64ZigZag = function (a, b) { return this.writeVarint64(g.zigZagEncode64(a), b) }, d.readVarint64 = function (a) {
			var b = "undefined" === typeof a; b && (a = this.offset); if (!this.noAssert) {
				if ("number" !==
					typeof a || 0 !== a % 1) throw TypeError("Illegal offset: " + a + " (not an integer)"); a >>>= 0; if (0 > a || a + 1 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + a + " (+1) <= " + this.buffer.byteLength);
			} var c = a, e = 0, k = 0; var d = this.view[a++]; var g = d & 127; if (d & 128 && (d = this.view[a++], g |= (d & 127) << 7, d & 128 || this.noAssert && "undefined" === typeof d) && (d = this.view[a++], g |= (d & 127) << 14, d & 128 || this.noAssert && "undefined" === typeof d) && (d = this.view[a++], g |= (d & 127) << 21, d & 128 || this.noAssert && "undefined" === typeof d) && (d = this.view[a++],
				e = d & 127, d & 128 || this.noAssert && "undefined" === typeof d) && (d = this.view[a++], e |= (d & 127) << 7, d & 128 || this.noAssert && "undefined" === typeof d) && (d = this.view[a++], e |= (d & 127) << 14, d & 128 || this.noAssert && "undefined" === typeof d) && (d = this.view[a++], e |= (d & 127) << 21, d & 128 || this.noAssert && "undefined" === typeof d) && (d = this.view[a++], k = d & 127, d & 128 || this.noAssert && "undefined" === typeof d) && (d = this.view[a++], k |= (d & 127) << 7, d & 128 || this.noAssert && "undefined" === typeof d)) throw Error("Buffer overrun"); g = h.fromBits(g | e << 28, e >>> 4 |
					k << 24, !1); return b ? (this.offset = a, g) : { value: g, length: a - c }
		}, d.readVarint64ZigZag = function (a) { (a = this.readVarint64(a)) && a.value instanceof h ? a.value = g.zigZagDecode64(a.value) : a = g.zigZagDecode64(a); return a }); d.writeCString = function (a, b) {
			var c = "undefined" === typeof b; c && (b = this.offset); var e, d = a.length; if (!this.noAssert) {
				if ("string" !== typeof a) throw TypeError("Illegal str: Not a string"); for (e = 0; e < d; ++e)if (0 === a.charCodeAt(e)) throw RangeError("Illegal str: Contains NULL-characters"); if ("number" !== typeof b ||
					0 !== b % 1) throw TypeError("Illegal offset: " + b + " (not an integer)"); b >>>= 0; if (0 > b || b + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + b + " (+0) <= " + this.buffer.byteLength);
			} d = m.calculateUTF16asUTF8(l(a))[1]; b += d + 1; e = this.buffer.byteLength; b > e && this.resize((e *= 2) > b ? e : b); b -= d + 1; m.encodeUTF16toUTF8(l(a), function (a) { this.view[b++] = a }.bind(this)); this.view[b++] = 0; return c ? (this.offset = b, this) : d
		}; d.readCString = function (a) {
			var b = "undefined" === typeof a; b && (a = this.offset); if (!this.noAssert) {
				if ("number" !==
					typeof a || 0 !== a % 1) throw TypeError("Illegal offset: " + a + " (not an integer)"); a >>>= 0; if (0 > a || a + 1 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + a + " (+1) <= " + this.buffer.byteLength);
			} var c = a, e, d = -1; m.decodeUTF8toUTF16(function () { if (0 === d) return null; if (a >= this.limit) throw RangeError("Illegal range: Truncated data, " + a + " < " + this.limit); d = this.view[a++]; return 0 === d ? null : d }.bind(this), e = t(), !0); return b ? (this.offset = a, e()) : { string: e(), length: a - c }
		}; d.writeIString = function (a, b) {
			var c =
				"undefined" === typeof b; c && (b = this.offset); if (!this.noAssert) { if ("string" !== typeof a) throw TypeError("Illegal str: Not a string"); if ("number" !== typeof b || 0 !== b % 1) throw TypeError("Illegal offset: " + b + " (not an integer)"); b >>>= 0; if (0 > b || b + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + b + " (+0) <= " + this.buffer.byteLength); } var e = b; var d = m.calculateUTF16asUTF8(l(a), this.noAssert)[1]; b += 4 + d; var f = this.buffer.byteLength; b > f && this.resize((f *= 2) > b ? f : b); b -= 4 + d; this.littleEndian ? (this.view[b +
					3] = d >>> 24 & 255, this.view[b + 2] = d >>> 16 & 255, this.view[b + 1] = d >>> 8 & 255, this.view[b] = d & 255) : (this.view[b] = d >>> 24 & 255, this.view[b + 1] = d >>> 16 & 255, this.view[b + 2] = d >>> 8 & 255, this.view[b + 3] = d & 255); b += 4; m.encodeUTF16toUTF8(l(a), function (a) { this.view[b++] = a }.bind(this)); if (b !== e + 4 + d) throw RangeError("Illegal range: Truncated data, " + b + " == " + (b + 4 + d)); return c ? (this.offset = b, this) : b - e
		}; d.readIString = function (a) {
			var b = "undefined" === typeof a; b && (a = this.offset); if (!this.noAssert) {
				if ("number" !== typeof a || 0 !== a % 1) throw TypeError("Illegal offset: " +
					a + " (not an integer)"); a >>>= 0; if (0 > a || a + 4 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + a + " (+4) <= " + this.buffer.byteLength);
			} var c = a, e = this.readUint32(a); e = this.readUTF8String(e, g.METRICS_BYTES, a += 4); a += e.length; return b ? (this.offset = a, e.string) : { string: e.string, length: a - c }
		}; g.METRICS_CHARS = "c"; g.METRICS_BYTES = "b"; d.writeUTF8String = function (a, b) {
			var c = "undefined" === typeof b; c && (b = this.offset); if (!this.noAssert) {
				if ("number" !== typeof b || 0 !== b % 1) throw TypeError("Illegal offset: " +
					b + " (not an integer)"); b >>>= 0; if (0 > b || b + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + b + " (+0) <= " + this.buffer.byteLength);
			} var e = b; var d = m.calculateUTF16asUTF8(l(a))[1]; b += d; var f = this.buffer.byteLength; b > f && this.resize((f *= 2) > b ? f : b); b -= d; m.encodeUTF16toUTF8(l(a), function (a) { this.view[b++] = a }.bind(this)); return c ? (this.offset = b, this) : b - e
		}; d.writeString = d.writeUTF8String; g.calculateUTF8Chars = function (a) { return m.calculateUTF16asUTF8(l(a))[0] }; g.calculateUTF8Bytes = function (a) { return m.calculateUTF16asUTF8(l(a))[1] };
	g.calculateString = g.calculateUTF8Bytes; d.readUTF8String = function (a, b, c) {
	"number" === typeof b && (c = b, b = void 0); var e = "undefined" === typeof c; e && (c = this.offset); "undefined" === typeof b && (b = g.METRICS_CHARS); if (!this.noAssert) {
		if ("number" !== typeof a || 0 !== a % 1) throw TypeError("Illegal length: " + a + " (not an integer)"); a |= 0; if ("number" !== typeof c || 0 !== c % 1) throw TypeError("Illegal offset: " + c + " (not an integer)"); c >>>= 0; if (0 > c || c + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + c + " (+0) <= " +
			this.buffer.byteLength);
	} var d = 0, f = c; if (b === g.METRICS_CHARS) { var p = t(); m.decodeUTF8(function () { return d < a && c < this.limit ? this.view[c++] : null }.bind(this), function (a) { ++d; m.UTF8toUTF16(a, p) }); if (d !== a) throw RangeError("Illegal range: Truncated data, " + d + " == " + a); return e ? (this.offset = c, p()) : { string: p(), length: c - f } } if (b === g.METRICS_BYTES) {
		if (!this.noAssert) {
			if ("number" !== typeof c || 0 !== c % 1) throw TypeError("Illegal offset: " + c + " (not an integer)"); c >>>= 0; if (0 > c || c + a > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " +
				c + " (+" + a + ") <= " + this.buffer.byteLength);
		} var h = c + a; m.decodeUTF8toUTF16(function () { return c < h ? this.view[c++] : null }.bind(this), p = t(), this.noAssert); if (c !== h) throw RangeError("Illegal range: Truncated data, " + c + " == " + h); return e ? (this.offset = c, p()) : { string: p(), length: c - f }
	} throw TypeError("Unsupported metrics: " + b);
	}; d.readString = d.readUTF8String; d.writeVString = function (a, b) {
		var c = "undefined" === typeof b; c && (b = this.offset); if (!this.noAssert) {
			if ("string" !== typeof a) throw TypeError("Illegal str: Not a string");
			if ("number" !== typeof b || 0 !== b % 1) throw TypeError("Illegal offset: " + b + " (not an integer)"); b >>>= 0; if (0 > b || b + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + b + " (+0) <= " + this.buffer.byteLength);
		} var e = b; var d = m.calculateUTF16asUTF8(l(a), this.noAssert)[1]; var f = g.calculateVarint32(d); b += f + d; var p = this.buffer.byteLength; b > p && this.resize((p *= 2) > b ? p : b); b -= f + d; b += this.writeVarint32(d, b); m.encodeUTF16toUTF8(l(a), function (a) { this.view[b++] = a }.bind(this)); if (b !== e + d + f) throw RangeError("Illegal range: Truncated data, " +
			b + " == " + (b + d + f)); return c ? (this.offset = b, this) : b - e
	}; d.readVString = function (a) {
		var b = "undefined" === typeof a; b && (a = this.offset); if (!this.noAssert) { if ("number" !== typeof a || 0 !== a % 1) throw TypeError("Illegal offset: " + a + " (not an integer)"); a >>>= 0; if (0 > a || a + 1 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + a + " (+1) <= " + this.buffer.byteLength); } var c = a, e = this.readVarint32(a); e = this.readUTF8String(e.value, g.METRICS_BYTES, a += e.length); a += e.length; return b ? (this.offset = a, e.string) : {
			string: e.string,
			length: a - c
		}
	}; d.append = function (a, b, c) {
		if ("number" === typeof b || "string" !== typeof b) c = b, b = void 0; var e = "undefined" === typeof c; e && (c = this.offset); if (!this.noAssert) { if ("number" !== typeof c || 0 !== c % 1) throw TypeError("Illegal offset: " + c + " (not an integer)"); c >>>= 0; if (0 > c || c + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + c + " (+0) <= " + this.buffer.byteLength); } a instanceof g || (a = g.wrap(a, b)); b = a.limit - a.offset; if (0 >= b) return this; c += b; var d = this.buffer.byteLength; c > d && this.resize((d *= 2) >
			c ? d : c); c -= b; this.view.set(a.view.subarray(a.offset, a.limit), c); a.offset += b; e && (this.offset += b); return this
	}; d.appendTo = function (a, b) { a.append(this, b); return this }; d.writeBytes = d.append; d.assert = function (a) { this.noAssert = !a; return this }; d.capacity = function () { return this.buffer.byteLength }; d.clear = function () { this.offset = 0; this.limit = this.buffer.byteLength; this.markedOffset = -1; return this }; d.clone = function (a) {
		var b = new g(0, this.littleEndian, this.noAssert); a ? (b.buffer = new ArrayBuffer(this.buffer.byteLength),
			b.view = new Uint8Array(b.buffer)) : (b.buffer = this.buffer, b.view = this.view); b.offset = this.offset; b.markedOffset = this.markedOffset; b.limit = this.limit; return b
	}; d.compact = function (a, b) {
	"undefined" === typeof a && (a = this.offset); "undefined" === typeof b && (b = this.limit); if (!this.noAssert) {
		if ("number" !== typeof a || 0 !== a % 1) throw TypeError("Illegal begin: Not an integer"); a >>>= 0; if ("number" !== typeof b || 0 !== b % 1) throw TypeError("Illegal end: Not an integer"); b >>>= 0; if (0 > a || a > b || b > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " +
			a + " <= " + b + " <= " + this.buffer.byteLength);
	} if (0 === a && b === this.buffer.byteLength) return this; var c = b - a; if (0 === c) return this.buffer = w, this.view = null, 0 <= this.markedOffset && (this.markedOffset -= a), this.limit = this.offset = 0, this; var e = new ArrayBuffer(c), d = new Uint8Array(e); d.set(this.view.subarray(a, b)); this.buffer = e; this.view = d; 0 <= this.markedOffset && (this.markedOffset -= a); this.offset = 0; this.limit = c; return this
	}; d.copy = function (a, b) {
	"undefined" === typeof a && (a = this.offset); "undefined" === typeof b && (b = this.limit);
		if (!this.noAssert) { if ("number" !== typeof a || 0 !== a % 1) throw TypeError("Illegal begin: Not an integer"); a >>>= 0; if ("number" !== typeof b || 0 !== b % 1) throw TypeError("Illegal end: Not an integer"); b >>>= 0; if (0 > a || a > b || b > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + a + " <= " + b + " <= " + this.buffer.byteLength); } if (a === b) return new g(0, this.littleEndian, this.noAssert); var c = b - a, e = new g(c, this.littleEndian, this.noAssert); e.offset = 0; e.limit = c; 0 <= e.markedOffset && (e.markedOffset -= a); this.copyTo(e, 0, a,
			b); return e
	}; d.copyTo = function (a, b, c, e) {
		var d, f; if (!this.noAssert && !g.isByteBuffer(a)) throw TypeError("Illegal target: Not a ByteBuffer"); b = (f = "undefined" === typeof b) ? a.offset : b | 0; c = (d = "undefined" === typeof c) ? this.offset : c | 0; e = "undefined" === typeof e ? this.limit : e | 0; if (0 > b || b > a.buffer.byteLength) throw RangeError("Illegal target range: 0 <= " + b + " <= " + a.buffer.byteLength); if (0 > c || e > this.buffer.byteLength) throw RangeError("Illegal source range: 0 <= " + c + " <= " + this.buffer.byteLength); var p = e - c; if (0 ===
			p) return a; a.ensureCapacity(b + p); a.view.set(this.view.subarray(c, e), b); d && (this.offset += p); f && (a.offset += p); return this
	}; d.ensureCapacity = function (a) { var b = this.buffer.byteLength; return b < a ? this.resize((b *= 2) > a ? b : a) : this }; d.fill = function (a, b, c) {
		var e = "undefined" === typeof b; e && (b = this.offset); "string" === typeof a && 0 < a.length && (a = a.charCodeAt(0)); "undefined" === typeof b && (b = this.offset); "undefined" === typeof c && (c = this.limit); if (!this.noAssert) {
			if ("number" !== typeof a || 0 !== a % 1) throw TypeError("Illegal value: " +
				a + " (not an integer)"); a |= 0; if ("number" !== typeof b || 0 !== b % 1) throw TypeError("Illegal begin: Not an integer"); b >>>= 0; if ("number" !== typeof c || 0 !== c % 1) throw TypeError("Illegal end: Not an integer"); c >>>= 0; if (0 > b || b > c || c > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + b + " <= " + c + " <= " + this.buffer.byteLength);
		} if (b >= c) return this; for (; b < c;)this.view[b++] = a; e && (this.offset = b); return this
	}; d.flip = function () { this.limit = this.offset; this.offset = 0; return this }; d.mark = function (a) {
		a = "undefined" ===
			typeof a ? this.offset : a; if (!this.noAssert) { if ("number" !== typeof a || 0 !== a % 1) throw TypeError("Illegal offset: " + a + " (not an integer)"); a >>>= 0; if (0 > a || a + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + a + " (+0) <= " + this.buffer.byteLength); } this.markedOffset = a; return this
	}; d.order = function (a) { if (!this.noAssert && "boolean" !== typeof a) throw TypeError("Illegal littleEndian: Not a boolean"); this.littleEndian = !!a; return this }; d.LE = function (a) {
	this.littleEndian = "undefined" !== typeof a ? !!a : !0;
		return this
	}; d.BE = function (a) { this.littleEndian = "undefined" !== typeof a ? !a : !1; return this }; d.prepend = function (a, b, c) {
		if ("number" === typeof b || "string" !== typeof b) c = b, b = void 0; var e = "undefined" === typeof c; e && (c = this.offset); if (!this.noAssert) { if ("number" !== typeof c || 0 !== c % 1) throw TypeError("Illegal offset: " + c + " (not an integer)"); c >>>= 0; if (0 > c || c + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + c + " (+0) <= " + this.buffer.byteLength); } a instanceof g || (a = g.wrap(a, b)); b = a.limit - a.offset;
		if (0 >= b) return this; var d = b - c; if (0 < d) { var f = new ArrayBuffer(this.buffer.byteLength + d), p = new Uint8Array(f); p.set(this.view.subarray(c, this.buffer.byteLength), b); this.buffer = f; this.view = p; this.offset += d; 0 <= this.markedOffset && (this.markedOffset += d); this.limit += d; c += d } else new Uint8Array(this.buffer); this.view.set(a.view.subarray(a.offset, a.limit), c - b); a.offset = a.limit; e && (this.offset -= b); return this
	}; d.prependTo = function (a, b) { a.prepend(this, b); return this }; d.printDebug = function (a) {
	"function" !== typeof a &&
		(a = console.log.bind(console)); a(this.toString() + "\n-------------------------------------------------------------------\n" + this.toDebug(!0))
	}; d.remaining = function () { return this.limit - this.offset }; d.reset = function () { 0 <= this.markedOffset ? (this.offset = this.markedOffset, this.markedOffset = -1) : this.offset = 0; return this }; d.resize = function (a) {
		if (!this.noAssert) {
			if ("number" !== typeof a || 0 !== a % 1) throw TypeError("Illegal capacity: " + a + " (not an integer)"); a |= 0; if (0 > a) throw RangeError("Illegal capacity: 0 <= " +
				a);
		} if (this.buffer.byteLength < a) { a = new ArrayBuffer(a); var b = new Uint8Array(a); b.set(this.view); this.buffer = a; this.view = b } return this
	}; d.reverse = function (a, b) {
	"undefined" === typeof a && (a = this.offset); "undefined" === typeof b && (b = this.limit); if (!this.noAssert) {
		if ("number" !== typeof a || 0 !== a % 1) throw TypeError("Illegal begin: Not an integer"); a >>>= 0; if ("number" !== typeof b || 0 !== b % 1) throw TypeError("Illegal end: Not an integer"); b >>>= 0; if (0 > a || a > b || b > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " +
			a + " <= " + b + " <= " + this.buffer.byteLength);
	} if (a === b) return this; Array.prototype.reverse.call(this.view.subarray(a, b)); return this
	}; d.skip = function (a) { if (!this.noAssert) { if ("number" !== typeof a || 0 !== a % 1) throw TypeError("Illegal length: " + a + " (not an integer)"); a |= 0 } var b = this.offset + a; if (!this.noAssert && (0 > b || b > this.buffer.byteLength)) throw RangeError("Illegal length: 0 <= " + this.offset + " + " + a + " <= " + this.buffer.byteLength); this.offset = b; return this }; d.slice = function (a, b) {
	"undefined" === typeof a && (a =
		this.offset); "undefined" === typeof b && (b = this.limit); if (!this.noAssert) { if ("number" !== typeof a || 0 !== a % 1) throw TypeError("Illegal begin: Not an integer"); a >>>= 0; if ("number" !== typeof b || 0 !== b % 1) throw TypeError("Illegal end: Not an integer"); b >>>= 0; if (0 > a || a > b || b > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + a + " <= " + b + " <= " + this.buffer.byteLength); } var c = this.clone(); c.offset = a; c.limit = b; return c
	}; d.toBuffer = function (a) {
		var b = this.offset, c = this.limit; if (!this.noAssert) {
			if ("number" !==
				typeof b || 0 !== b % 1) throw TypeError("Illegal offset: Not an integer"); b >>>= 0; if ("number" !== typeof c || 0 !== c % 1) throw TypeError("Illegal limit: Not an integer"); c >>>= 0; if (0 > b || b > c || c > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + b + " <= " + c + " <= " + this.buffer.byteLength);
		} if (!a && 0 === b && c === this.buffer.byteLength) return this.buffer; if (b === c) return w; a = new ArrayBuffer(c - b); (new Uint8Array(a)).set((new Uint8Array(this.buffer)).subarray(b, c), 0); return a
	}; d.toArrayBuffer = d.toBuffer; d.toString =
		function (a, b, c) { if ("undefined" === typeof a) return "ByteBufferAB(offset=" + this.offset + ",markedOffset=" + this.markedOffset + ",limit=" + this.limit + ",capacity=" + this.capacity() + ")"; "number" === typeof a && (c = b = a = "utf8"); switch (a) { case "utf8": return this.toUTF8(b, c); case "base64": return this.toBase64(b, c); case "hex": return this.toHex(b, c); case "binary": return this.toBinary(b, c); case "debug": return this.toDebug(); case "columns": return this.toColumns(); default: throw Error("Unsupported encoding: " + a); } }; var z = function () {
			for (var a =
				{}, b = [65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 43, 47], c = [], e = 0, d = b.length; e < d; ++e)c[b[e]] = e; a.encode = function (a, c) { for (var e, d; null !== (e = a());)c(b[e >> 2 & 63]), d = (e & 3) << 4, null !== (e = a()) ? (d |= e >> 4 & 15, c(b[(d | e >> 4 & 15) & 63]), d = (e & 15) << 2, null !== (e = a()) ? (c(b[(d | e >> 6 & 3) & 63]), c(b[e & 63])) : (c(b[d & 63]), c(61))) : (c(b[d & 63]), c(61), c(61)) }; a.decode = function (a,
					b) { function e(a) { throw Error("Illegal character code: " + a); } for (var d, k, f; null !== (d = a());)if (k = c[d], "undefined" === typeof k && e(d), null !== (d = a()) && (f = c[d], "undefined" === typeof f && e(d), b(k << 2 >>> 0 | (f & 48) >> 4), null !== (d = a()))) { k = c[d]; if ("undefined" === typeof k) if (61 === d) break; else e(d); b((f & 15) << 4 >>> 0 | (k & 60) >> 2); if (null !== (d = a())) { f = c[d]; if ("undefined" === typeof f) if (61 === d) break; else e(d); b((k & 3) << 6 >>> 0 | f) } } }; a.test = function (a) { return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(a) };
			return a
		}(); d.toBase64 = function (a, b) { "undefined" === typeof a && (a = this.offset); "undefined" === typeof b && (b = this.limit); a |= 0; b |= 0; if (0 > a || b > this.capacity || a > b) throw RangeError("begin, end"); var c; z.encode(function () { return a < b ? this.view[a++] : null }.bind(this), c = t()); return c() }; g.fromBase64 = function (a, b) { if ("string" !== typeof a) throw TypeError("str"); var c = new g(a.length / 4 * 3, b), e = 0; z.decode(l(a), function (a) { c.view[e++] = a }); c.limit = e; return c }; g.btoa = function (a) { return g.fromBinary(a).toBase64() }; g.atob =
			function (a) { return g.fromBase64(a).toBinary() }; d.toBinary = function (a, b) { "undefined" === typeof a && (a = this.offset); "undefined" === typeof b && (b = this.limit); a |= 0; b |= 0; if (0 > a || b > this.capacity() || a > b) throw RangeError("begin, end"); if (a === b) return ""; for (var c = [], e = []; a < b;)c.push(this.view[a++]), 1024 <= c.length && (e.push(String.fromCharCode.apply(String, c)), c = []); return e.join("") + String.fromCharCode.apply(String, c) }; g.fromBinary = function (a, b) {
				if ("string" !== typeof a) throw TypeError("str"); for (var c = 0, e = a.length,
					d = new g(e, b); c < e;) { b = a.charCodeAt(c); if (255 < b) throw RangeError("illegal char code: " + b); d.view[c++] = b } d.limit = e; return d
			}; d.toDebug = function (a) {
				for (var b = -1, c = this.buffer.byteLength, e, d = "", f = "", g = ""; b < c;) {
				-1 !== b && (e = this.view[b], d = 16 > e ? d + ("0" + e.toString(16).toUpperCase()) : d + e.toString(16).toUpperCase(), a && (f += 32 < e && 127 > e ? String.fromCharCode(e) : ".")); ++b; if (a && 0 < b && 0 === b % 16 && b !== c) { for (; 51 > d.length;)d += " "; g += d + f + "\n"; d = f = "" } d = b === this.offset && b === this.limit ? d + (b === this.markedOffset ? "!" : "|") : b === this.offset ?
					d + (b === this.markedOffset ? "[" : "<") : b === this.limit ? d + (b === this.markedOffset ? "]" : ">") : d + (b === this.markedOffset ? "'" : a || 0 !== b && b !== c ? " " : "")
				} if (a && " " !== d) { for (; 51 > d.length;)d += " "; g += d + f + "\n" } return a ? g : d
			}; g.fromDebug = function (a, b, c) {
				var e = a.length; b = new g((e + 1) / 3 | 0, b, c); for (var d = 0, f = 0, h, l = !1, n = !1, m = !1, q = !1, r = !1; d < e;) {
					switch (h = a.charAt(d++)) {
						case "!": if (!c) { if (n || m || q) { r = !0; break } n = m = q = !0 } b.offset = b.markedOffset = b.limit = f; l = !1; break; case "|": if (!c) { if (n || q) { r = !0; break } n = q = !0 } b.offset = b.limit = f; l = !1;
							break; case "[": if (!c) { if (n || m) { r = !0; break } n = m = !0 } b.offset = b.markedOffset = f; l = !1; break; case "<": if (!c) { if (n) { r = !0; break } n = !0 } b.offset = f; l = !1; break; case "]": if (!c) { if (q || m) { r = !0; break } q = m = !0 } b.limit = b.markedOffset = f; l = !1; break; case ">": if (!c) { if (q) { r = !0; break } q = !0 } b.limit = f; l = !1; break; case "'": if (!c) { if (m) { r = !0; break } m = !0 } b.markedOffset = f; l = !1; break; case " ": l = !1; break; default: if (!c && l) r = !0; else {
								h = parseInt(h + a.charAt(d++), 16); if (!c && (isNaN(h) || 0 > h || 255 < h)) throw TypeError("Illegal str: Not a debug encoded string");
								b.view[f++] = h; l = !0
							}
					}if (r) throw TypeError("Illegal str: Invalid symbol at " + d);
				} if (!c) { if (!n || !q) throw TypeError("Illegal str: Missing offset or limit"); if (f < b.buffer.byteLength) throw TypeError("Illegal str: Not a debug encoded string (is it hex?) " + f + " < " + e); } return b
			}; d.toHex = function (a, b) {
				a = "undefined" === typeof a ? this.offset : a; b = "undefined" === typeof b ? this.limit : b; if (!this.noAssert) {
					if ("number" !== typeof a || 0 !== a % 1) throw TypeError("Illegal begin: Not an integer"); a >>>= 0; if ("number" !== typeof b ||
						0 !== b % 1) throw TypeError("Illegal end: Not an integer"); b >>>= 0; if (0 > a || a > b || b > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + a + " <= " + b + " <= " + this.buffer.byteLength);
				} for (var c = Array(b - a), e; a < b;)e = this.view[a++], 16 > e ? c.push("0", e.toString(16)) : c.push(e.toString(16)); return c.join("")
			}; g.fromHex = function (a, b, c) {
				if (!c) { if ("string" !== typeof a) throw TypeError("Illegal str: Not a string"); if (0 !== a.length % 2) throw TypeError("Illegal str: Length not a multiple of 2"); } var e = a.length; b = new g(e /
					2 | 0, b); for (var d, f = 0, h = 0; f < e; f += 2) { d = parseInt(a.substring(f, f + 2), 16); if (!c && (!isFinite(d) || 0 > d || 255 < d)) throw TypeError("Illegal str: Contains non-hex characters"); b.view[h++] = d } b.limit = h; return b
			}; var m = function () {
				var a = {
					MAX_CODEPOINT: 1114111, encodeUTF8: function (a, c) {
						var b = null; "number" === typeof a && (b = a, a = function () { return null }); for (; null !== b || null !== (b = a());)128 > b ? c(b & 127) : (2048 > b ? c(b >> 6 & 31 | 192) : 65536 > b ? (c(b >> 12 & 15 | 224), c(b >> 6 & 63 | 128)) : (c(b >> 18 & 7 | 240), c(b >> 12 & 63 | 128), c(b >> 6 & 63 | 128)), c(b & 63 | 128)),
							b = null
					}, decodeUTF8: function (a, c) {
						for (var b, d, f, g, h = function (a) { a = a.slice(0, a.indexOf(null)); var b = Error(a.toString()); b.name = "TruncatedError"; b.bytes = a; throw b; }; null !== (b = a());)if (0 === (b & 128)) c(b); else if (192 === (b & 224)) null === (d = a()) && h([b, d]), c((b & 31) << 6 | d & 63); else if (224 === (b & 240)) null !== (d = a()) && null !== (f = a()) || h([b, d, f]), c((b & 15) << 12 | (d & 63) << 6 | f & 63); else if (240 === (b & 248)) null !== (d = a()) && null !== (f = a()) && null !== (g = a()) || h([b, d, f, g]), c((b & 7) << 18 | (d & 63) << 12 | (f & 63) << 6 | g & 63); else throw RangeError("Illegal starting byte: " +
							b);
					}, UTF16toUTF8: function (a, c) { for (var b, d = null; null !== (b = null !== d ? d : a());)55296 <= b && 57343 >= b && null !== (d = a()) && 56320 <= d && 57343 >= d ? (c(1024 * (b - 55296) + d - 56320 + 65536), d = null) : c(b); null !== d && c(d) }, UTF8toUTF16: function (a, c) { var b = null; "number" === typeof a && (b = a, a = function () { return null }); for (; null !== b || null !== (b = a());)65535 >= b ? c(b) : (b -= 65536, c((b >> 10) + 55296), c(b % 1024 + 56320)), b = null }, encodeUTF16toUTF8: function (b, c) { a.UTF16toUTF8(b, function (b) { a.encodeUTF8(b, c) }) }, decodeUTF8toUTF16: function (b, c) {
						a.decodeUTF8(b,
							function (b) { a.UTF8toUTF16(b, c) })
					}, calculateCodePoint: function (a) { return 128 > a ? 1 : 2048 > a ? 2 : 65536 > a ? 3 : 4 }, calculateUTF8: function (a) { for (var b, d = 0; null !== (b = a());)d += 128 > b ? 1 : 2048 > b ? 2 : 65536 > b ? 3 : 4; return d }, calculateUTF16asUTF8: function (b) { var c = 0, d = 0; a.UTF16toUTF8(b, function (a) { ++c; d += 128 > a ? 1 : 2048 > a ? 2 : 65536 > a ? 3 : 4 }); return [c, d] }
				}; return a
			}(); d.toUTF8 = function (a, b) {
			"undefined" === typeof a && (a = this.offset); "undefined" === typeof b && (b = this.limit); if (!this.noAssert) {
				if ("number" !== typeof a || 0 !== a % 1) throw TypeError("Illegal begin: Not an integer");
				a >>>= 0; if ("number" !== typeof b || 0 !== b % 1) throw TypeError("Illegal end: Not an integer"); b >>>= 0; if (0 > a || a > b || b > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + a + " <= " + b + " <= " + this.buffer.byteLength);
			} var c; try { m.decodeUTF8toUTF16(function () { return a < b ? this.view[a++] : null }.bind(this), c = t()) } catch (e) { if (a !== b) throw RangeError("Illegal range: Truncated data, " + a + " != " + b); } return c()
			}; g.fromUTF8 = function (a, b, c) {
				if (!c && "string" !== typeof a) throw TypeError("Illegal str: Not a string"); var d =
					new g(m.calculateUTF16asUTF8(l(a), !0)[1], b, c), h = 0; m.encodeUTF16toUTF8(l(a), function (a) { d.view[h++] = a }); d.limit = h; return d
			}; return g
});