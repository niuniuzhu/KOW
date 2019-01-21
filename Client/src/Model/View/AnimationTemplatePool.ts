import { AnimationSetting } from "./AnimationProxy";

export class AnimationTemplatePool {
	private static readonly _POOL = new Map<string, AnimationSetting>();

	public static Add(name: string, setting: AnimationSetting): void {
		this._POOL.set(name, setting);
	}

	public static Get(name: string): AnimationSetting {
		return this._POOL.get(name);
	}

	public static Has(name: string): boolean {
		return this._POOL.has(name);
	}
}