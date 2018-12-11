define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class TextUtils {
        static DecodeUTF8(arr) {
            let str = "";
            for (let i = 0; i < arr.length; i++) {
                str += String.fromCharCode(arr[i]);
            }
            decodeURIComponent(escape(str));
            return str;
        }
    }
    exports.TextUtils = TextUtils;
});
//# sourceMappingURL=TextUtils.js.map