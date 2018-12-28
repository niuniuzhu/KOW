define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class JsonHelper {
        static Parse(json) {
            json = json.replace("\/\*+[^\*]*\*+/\g", "");
            return JSON.parse(json);
        }
    }
    exports.JsonHelper = JsonHelper;
});
//# sourceMappingURL=JsonHelper.js.map