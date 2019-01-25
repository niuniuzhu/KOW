import { VEffect } from "../VEffect";

export abstract class FxAbsScript {
	public get owner(): VEffect { return this._owner; }

	private _owner: VEffect;

	constructor(owner: VEffect) {
		this._owner = owner;
	}

	public abstract OnCreate(): void;

	public abstract OnSet(): void;

	public abstract OnSpawn(): void;

	public abstract OnDespawn(): void;

	public abstract OnUpdate(dt: number): void
}