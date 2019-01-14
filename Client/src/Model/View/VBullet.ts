import { Hashtable } from "../../RC/Utils/Hashtable";
import { CDefs } from "../CDefs";
import { VChampion } from "./VChampion";
import { VEffect } from "./VEffect";
import { VEntity } from "./VEntity";

enum FxAttachType {
	None,
	Bullet,
	Target
}

enum PosRotType {
	None = 0,
	Position = 1 << 0,
	Rotation = 1 << 1
}

enum FxDestroyType {
	Effect,
	Bullet,
	Target
}

export class VBullet extends VEntity {
	private _hitFxID: number;
	private _hitFxDelay: number;
	private _hitFxAttachType: FxAttachType;
	private _posRotType: PosRotType;
	private _hitFxDestroyType: FxDestroyType;
	private _followPos: boolean;
	private _followRot: boolean;

	private _time: number;
	private _caster: VChampion;
	private _target: VChampion;
	private _triggered: boolean;
	private _fx: VEffect;

	protected BeforeLoadDefs(): Hashtable {
		return CDefs.GetBullet(this._id);
	}

	protected AfterLoadDefs(cdefs: Hashtable): void {
		this._hitFxID = Hashtable.GetNumber(cdefs, "hit_effect");
		this._hitFxDelay = Hashtable.GetNumber(cdefs, "hit_fx_delay");
		this._hitFxAttachType = Hashtable.GetNumber(cdefs, "hit_fx_attach_type");
		this._posRotType = Hashtable.GetNumber(cdefs, "hit_fx_posrot_type");
		this._hitFxDestroyType = Hashtable.GetNumber(cdefs, "hit_fx_destroy_type");
		this._followPos = Hashtable.GetBool(cdefs, "hit_fx_follow_pos");
		this._followRot = Hashtable.GetBool(cdefs, "hit_fx_follow_rot");
		this.DisplayRoot();
	}

	public Destroy(): void {
		if (this._fx != null) {
			if (this._hitFxDestroyType == FxDestroyType.Bullet) {
				this._fx.markToDestroy = true;
			}
			this._fx = null;
		}
		this._caster = null;
		this._target = null;
		super.Destroy();
	}

	public OnCollision(caster: VChampion, target: VChampion): void {
		this._time = 0;
		this._triggered = false;
		this._caster = caster;
		this._target = target;
		if (this._hitFxDelay == 0) {
			this.Trigger();
		}
	}

	public Update(dt: number): void {
		super.Update(dt);
		if (!this._triggered) {
			if (this._time >= this._hitFxDelay) {
				this.Trigger();
			}
			this._time += dt;
		}
		else {
			if (this._followPos) {
				switch (this._hitFxAttachType) {
					case FxAttachType.Bullet:
						this._fx.position = this.position;
						break;
					case FxAttachType.Target:
						this._fx.position = this._target.position;
						break;
				}
			}
			if (this._followRot) {
				switch (this._hitFxAttachType) {
					case FxAttachType.Bullet:
						this._fx.rotation = this.rotation;
						break;
					case FxAttachType.Target:
						this._fx.rotation = this._target.rotation;
						break;
				}
			}
		}
	}

	private Trigger(): void {
		this._triggered = true;
		this._fx = this._battle.SpawnEffect(this._hitFxID);
		if (this._hitFxDestroyType != FxDestroyType.Effect &&
			this._fx.lifeTime >= 0) {
			throw new Error(`fx:${this._fx.id}'s lifetime greater then zero, can only set destroy type to FxDestroyType.Effect`);
		}
		switch (this._hitFxAttachType) {
			case FxAttachType.Bullet:
				if ((this._posRotType & PosRotType.Position) > 0) {
					this._fx.position = this.position;
				}
				if ((this._posRotType & PosRotType.Rotation) > 0) {
					this._fx.rotation = this.rotation;
				}
				break;
			case FxAttachType.Target:
				if ((this._posRotType & PosRotType.Position) > 0) {
					this._fx.position = this._target.position;
				}
				if ((this._posRotType & PosRotType.Rotation) > 0) {
					this._fx.rotation = this._target.rotation;
				}
				break;
		}
	}
}