define(["require", "exports", "./VEffect", "../../RC/Collections/Stack"], function (require, exports, VEffect_1, Stack_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class EffectPool {
        constructor(battle) {
            this.POOL = new Map();
            this._battle = battle;
        }
        Dispose() {
            this.POOL.forEach((v, k, m) => {
                v.forEach(e => e.Destroy());
            });
            this.POOL.clear();
        }
        Get(id) {
            let fx;
            if (this.POOL.has(id)) {
                const stack = this.POOL.get(id);
                if (stack.size() > 0) {
                    fx = stack.pop();
                }
                else {
                    fx = new VEffect_1.VEffect(this._battle, id);
                }
            }
            else {
                fx = new VEffect_1.VEffect(this._battle, id);
            }
            fx.OnSpawn();
            return fx;
        }
        Release(fx) {
            const id = fx.id;
            fx.OnDespawn();
            let stack;
            if (this.POOL.has(id)) {
                stack = this.POOL.get(id);
            }
            else {
                stack = new Stack_1.default();
                this.POOL.set(id, stack);
            }
            stack.push(fx);
        }
    }
    exports.EffectPool = EffectPool;
});
//# sourceMappingURL=EffectPool.js.map