define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ByteUtils {
        static Encode8u(p, offset, c) {
            p[0 + offset] = c;
            return 1;
        }
        static Encode16u(p, offset, w) {
            p[0 + offset] = w >> 0;
            p[1 + offset] = w >> 8;
            return 2;
        }
        static Encode32u(p, offset, value) {
            p[0 + offset] = value >> 0;
            p[1 + offset] = value >> 8;
            p[2 + offset] = value >> 16;
            p[3 + offset] = value >> 24;
            return 4;
        }
        static Encode64u(p, offset, value) {
            let l0 = value & 0xffffffff;
            let l1 = value >> 32;
            let offset2 = ByteUtils.Encode32u(p, offset, l0);
            ByteUtils.Encode32u(p, offset + offset2, l1);
            return 8;
        }
        static Decode8u(p, offset) {
            return p[0 + offset];
        }
        static Decode16u(p, offset) {
            let result = 0;
            result |= p[0 + offset];
            result |= p[1 + offset] << 8;
            return result;
        }
        static Decode32u(p, offset) {
            let result = 0;
            result |= p[0 + offset];
            result |= p[1 + offset] << 8;
            result |= p[2 + offset] << 16;
            result |= p[3 + offset] << 24;
            return result;
        }
        static Decode64u(p, offset) {
            let l0 = ByteUtils.Decode32u(p, offset);
            offset += 4;
            let l1 = ByteUtils.Decode32u(p, offset + offset);
            return l0 | (l1 << 32);
        }
    }
    exports.ByteUtils = ByteUtils;
});
//# sourceMappingURL=ByteUtils.js.map