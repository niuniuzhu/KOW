import { Vec2 } from "../../RC/Math/Vec2";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { CDefs } from "../CDefs";
import { EntityType } from "../EntityType";
import { VChampion } from "./VChampion";
import { VEffect } from "./VEffect";
import { VEntity } from "./VEntity";

enum FxAttachType {
	None,
	Bullet,
	Target
}

enum FxDestroyType {
	Effect,
	Bullet,
	Target
}

export class VBullet extends VEntity {
	private _hitFxID: number;
	private _hitFxOffset: Vec2;
	private _hitFxDelay: number;
	private _hitFxAttachType: FxAttachType;
	private _hitFxDestroyType: FxDestroyType;
	private _hitFxFollowPos: boolean;
	private _hitFxFollowRot: boolean;
	private _hitFxAlwaysFollow: boolean;

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
		this._hitFxOffset = Hashtable.GetVec2(cdefs, "offset");
		this._hitFxAttachType = Hashtable.GetNumber(cdefs, "hit_fx_attach_type");
		this._hitFxDestroyType = Hashtable.GetNumber(cdefs, "hit_fx_destroy_type");
		this._hitFxFollowPos = Hashtable.GetBool(cdefs, "hit_fx_follow_pos");
		this._hitFxFollowRot = Hashtable.GetBool(cdefs, "hit_fx_follow_rot");
		this._hitFxAlwaysFollow = Hashtable.GetBool(cdefs, "hit_fx_always_follow");
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
				this._fx.SetTarget(EntityType.Bullet, this.rid, this._hitFxOffset,
					this._hitFxFollowPos, this._hitFxFollowRot, this._hitFxAlwaysFollow);
				break;
			case FxAttachType.Target:
				this._fx.SetTarget(EntityType.Champion, this._target.rid, this._hitFxOffset,
					this._hitFxFollowPos, this._hitFxFollowRot, this._hitFxAlwaysFollow);
				break;
		}
	}
}