import { AnimationProxy } from "./AnimationProxy";

export class GraphicManager {
	private readonly _pool = new Map<number, AnimationProxy>();

	private Create(id: number): AnimationProxy {
		const animationProxy = new AnimationProxy(id);
		this._pool.set(id, animationProxy);
		return animationProxy;
	}

	public Get(id: number): AnimationProxy {
		if (this._pool.has(id))
			return this._pool.get(id);
		return this.Create(id);
	}

	public Dispose(): void {
		this._pool.forEach((v, k, m) => {
			v.dispose();
		})
		this._pool.clear();
	}
}