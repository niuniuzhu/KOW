define(["require", "exports", "./AnimationProxy"], function (require, exports, AnimationProxy_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GraphicManager {
        constructor() {
            this._pool = new Map();
        }
        Create(id) {
            const animationProxy = new AnimationProxy_1.AnimationProxy(id);
            this._pool.set(id, animationProxy);
            return animationProxy;
        }
        Get(id) {
            if (this._pool.has(id))
                return this._pool.get(id);
            return this.Create(id);
        }
        Dispose() {
            this._pool.forEach((v, k, m) => {
                v.dispose();
            });
            this._pool.clear();
        }
    }
    exports.GraphicManager = GraphicManager;
});
//# sourceMappingURL=GraphicManager.js.map