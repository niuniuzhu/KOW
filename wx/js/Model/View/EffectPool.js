import { VEffect } from "./VEffect";
import Stack from "../../RC/Collections/Stack";
export class EffectPool {
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
                fx = new VEffect(this._battle, id);
            }
        }
        else {
            fx = new VEffect(this._battle, id);
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
            stack = new Stack();
            this.POOL.set(id, stack);
        }
        stack.push(fx);
    }
}
