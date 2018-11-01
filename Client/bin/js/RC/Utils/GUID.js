define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var GuidFormat;
    (function (GuidFormat) {
        GuidFormat[GuidFormat["BRACES"] = 1] = "BRACES";
        GuidFormat[GuidFormat["DASHES"] = 2] = "DASHES";
    })(GuidFormat = exports.GuidFormat || (exports.GuidFormat = {}));
    class GUID {
        constructor(val, val2, val3, val4) {
            this.data1 = new Uint8Array(4);
            this.data2 = new Uint8Array(2);
            this.data3 = new Uint8Array(2);
            this.data4 = new Uint8Array(8);
            if (val != null) {
                if (typeof val === 'string') {
                    this.ParseImpl(val);
                    return;
                }
                let ctor = val.constructor;
                if (ctor.name === 'GUID') {
                    this.CopyCtor(val);
                    return;
                }
                if (ctor.name === 'Uint8Array') {
                    let dummy = val;
                    this.data1 = dummy;
                }
                else {
                    throw Error('Argument exception : val1 is of invalid type');
                }
                if (val2 != null) {
                    this.data2 = val2;
                }
                else {
                    throw Error('Argument exception : val2 is null');
                }
                if (val3 != null) {
                    this.data3 = val3;
                }
                else {
                    throw Error('Argument exception : val3 is null');
                }
                if (val4 != null) {
                    this.data4 = val4;
                }
                else {
                    throw Error('Argument exception : val4 is null');
                }
            }
        }
        CopyCtor(val) {
            if (val == null)
                throw Error('val is null');
            for (let i = 0; i < val.Data1.length; ++i)
                this.data1[i] = val.Data1[i];
            for (let i = 0; i < val.Data2.length; ++i)
                this.data2[i] = val.Data2[i];
            for (let i = 0; i < val.Data3.length; ++i)
                this.data3[i] = val.Data3[i];
            for (let i = 0; i < val.Data4.length; ++i)
                this.data4[i] = val.Data4[i];
        }
        ParseImpl(val) {
            if (val == null)
                throw Error('val is null');
            let ret = GUID.Parse(val);
            this.CopyCtor(ret);
        }
        ToString(format) {
            if (format == null) {
                format = GuidFormat.BRACES | GuidFormat.DASHES;
            }
            let data = [
                GUID.ToStringHexUint8(this.data1),
                GUID.ToStringHexUint8(this.data2),
                GUID.ToStringHexUint8(this.data3),
                GUID.ToStringHexUint8(this.data4, 0, 2),
                GUID.ToStringHexUint8(this.data4, 2)
            ];
            let str = data.join(format & GuidFormat.DASHES ? '-' : '');
            if (format & GuidFormat.BRACES) {
                str = '{' + str + '}';
            }
            return str;
        }
        static Parse(value) {
            if (value == null) {
                throw Error('value is null');
            }
            if (value == undefined) {
                throw Error('value is undefined');
            }
            if (typeof value != 'string') {
                throw Error('value must be a string');
            }
            if (value.length == 0) {
                throw Error('value is empty');
            }
            value = value.trim().toUpperCase();
            if (value.length != 32 &&
                value.length != 34 &&
                value.length != 36 &&
                value.length != 38) {
                throw Error('invalid format length');
            }
            let validCharacters = ['A', 'B', 'C', 'D', 'E', 'F', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '{', '}', '-'];
            for (let i = 0; i < value.length; ++i) {
                if (validCharacters.indexOf(value[i]) == -1) {
                    throw Error('invalid format character');
                }
            }
            let posPadding = 0;
            let end = value.length;
            let start = value.indexOf('{');
            if (start != -1) {
                end = value.indexOf('}');
                if (start != 0 || end == -1 || end != value.length - 1) {
                    throw Error('Invalid format braces');
                }
                start = 1;
            }
            else {
                start = 0;
            }
            let hasDashes = value.indexOf('-') != -1;
            if (hasDashes &&
                (value[start + 8] != '-' ||
                    value[start + 13] != '-' ||
                    value[start + 18] != '-' ||
                    value[start + 23] != '-')) {
                throw Error('invalid format dashes');
            }
            if (hasDashes) {
                ++posPadding;
            }
            let data1 = value.substring(start, start = (start + 8));
            let data2 = value.substring(start + posPadding, start = (start + 4 + posPadding));
            let data3 = value.substring(start + posPadding, start = (start + 4 + posPadding));
            let data4H = value.substring(start + posPadding, start = (start + 4 + posPadding));
            let data4L = value.substring(start + posPadding, end);
            return new GUID(GUID.StringToUint8(data1), GUID.StringToUint8(data2), GUID.StringToUint8(data3), GUID.StringToUint8(data4H + data4L));
        }
        static Generate(seed) {
            if (seed == null) {
                seed = new Date().getTime();
            }
            let guid = new GUID();
            crypto.getRandomValues(guid.data1);
            crypto.getRandomValues(guid.data2);
            crypto.getRandomValues(guid.data3);
            crypto.getRandomValues(guid.data4);
            return guid;
        }
        static ToStringHexUint8(values, start, end) {
            start = start == null ? 0 : start;
            end = end == null ? values.length : end;
            let str = '';
            for (let i = start; i < end; ++i) {
                let val = values[i].toString(16);
                str += val.length == 1 ? '0' + val : val;
            }
            return str.toUpperCase();
        }
        static StringToUint8(val) {
            if (val == null)
                throw Error('val is null');
            if (val == undefined)
                throw Error('val is undefined');
            if (typeof val != 'string')
                throw Error('val should be a string');
            let arr = new Uint8Array(val.length / 2);
            let j = 0;
            for (let i = 0; i < val.length; ++i, ++j) {
                let tmp = val[j] + val[++j];
                arr[i] = parseInt(tmp, 16);
            }
            return arr;
        }
        static Convolution(f, g) {
            if (f == null)
                throw Error('f is null');
            if (g == null)
                throw Error('g is null');
            if (f == undefined)
                throw Error('f is undefined');
            if (g == undefined)
                throw Error('g is undefined');
            if (f.length == 0)
                throw Error('f needs to be >= 1');
            if (g.length == 0)
                throw Error('g needs to be >= 1');
            const SIZE = f.length + g.length - 1;
            let ret = new Uint8Array(SIZE);
            for (let n = 0; n < SIZE; ++n) {
                let tmp = 0;
                let kmin = (n >= g.length - 1) ? n - (g.length - 1) : 0;
                let kmaX = (n < f.length - 1) ? n : f.length - 1;
                for (let k = kmin; k <= kmaX; ++k) {
                    let signal = f[k];
                    let kernel = g[n - k];
                    tmp += (signal * kernel);
                }
                ret[n] = tmp;
            }
            return ret;
        }
    }
    GUID.empty = new GUID();
    exports.GUID = GUID;
});
//# sourceMappingURL=GUID.js.map