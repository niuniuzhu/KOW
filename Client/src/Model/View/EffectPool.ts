import { VEffect } from "./VEffect";
import Stack from "../../RC/Collections/Stack";
import { VBattle } from "./VBattle";

export class EffectPool {
	private readonly POOL: Map<number, Stack<VEffect>> = new Map<number, Stack<VEffect>>();
	private readonly _battle: VBattle;

	constructor(battle: VBattle) {
		this._battle = battle;
	}

	public Dispose() {
		this.POOL.forEach((v, k, m) => {
			v.forEach(e => e.Destroy());
		})
		this.POOL.clear();
	}

	public Get(id: number): VEffect {
		let fx: VEffect;
		if (this.POOL.has(id)) {
			const stack = this.POOL.get(id);
			if (stack.size() > 0) {
				fx = stack.pop();
			}
			else {
				fx = new VEffect(this._battle, id);
			}
		} else {
			fx = new VEffect(this._battle, id);
		}
		fx.OnSpawn();
		return fx;
	}

	public Release(fx: VEffect): void {
		const id = fx.id;
		fx.OnDespawn();
		let stack: Stack<VEffect>;
		if (this.POOL.has(id)) {
			stack = this.POOL.get(id);
		}
		else {
			stack = new Stack<VEffect>();
			this.POOL.set(id, stack);
		}
		stack.push(fx);
	}
}