define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class AnimationTemplatePool {
        static Add(name, setting) {
            this._POOL.set(name, setting);
        }
        static Get(name) {
            return this._POOL.get(name);
        }
        static Has(name) {
            return this._POOL.has(name);
        }
    }
    AnimationTemplatePool._POOL = new Map();
    exports.AnimationTemplatePool = AnimationTemplatePool;
});
//# sourceMappingURL=AnimationTemplatePool.js.map