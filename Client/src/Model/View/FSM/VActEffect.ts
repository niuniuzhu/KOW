import { Vec2 } from "../../../RC/Math/Vec2";
import { Hashtable } from "../../../RC/Utils/Hashtable";
import { Logger } from "../../../RC/Utils/Logger";
import { EntityType } from "../../EntityType";
import { VEffect } from "../VEffect";
import { VEntityAction } from "./VEntityAction";

enum FxAttachType {
	None,
	Caster
}

enum FxDestroyType {
	Effect,
	State
}

export class VActEffect extends VEntityAction {
	private _effectID: number;
	private _offset: Vec2;
	private _attachType: FxAttachType;
	private _followPos: boolean;
	private _followRot: boolean;
	private _alwaysFollow: boolean;
	private _destroyType: FxDestroyType;

	private _fx: VEffect;

	protected OnInit(def: Hashtable): void {
		super.OnInit(def);
		this._effectID = Hashtable.GetNumber(def, "effect");
		this._offset = Hashtable.GetVec2(def, "offset");
		this._attachType = Hashtable.GetNumber(def, "attach_type");
		this._followPos = Hashtable.GetBool(def, "follow_pos");
		this._followRot = Hashtable.GetBool(def, "follow_rot");
		this._alwaysFollow = Hashtable.GetBool(def, "always_follow");
		this._destroyType = Hashtable.GetNumber(def, "destroy_type");
	}

	protected OnExit(): void {
		super.OnExit();
		if (this._fx != null) {
			if (this._destroyType == FxDestroyType.State) {
				this._fx.markToDestroy = true;
			}
			this._fx = null;
		}
	}

	protected OnTrigger(): void {
		super.OnTrigger();
		switch (this._attachType) {
			case FxAttachType.Caster:
				this._fx = this.owner.battle.SpawnEffect(this._effectID);
				this._fx.SetTarget(EntityType.Champion, this.owner.rid, this._offset,
					this._followPos, this._followRot, this._alwaysFollow);
				break;
			default:
				Logger.Error(`attach type:${this._attachType} not supported`);
				break;
		}
		if (this._fx != null &&
			this._destroyType != FxDestroyType.Effect &&
			this._fx.lifeTime >= 0) {
			throw new Error(`fx:${this._fx.id}'s lifetime greater then zero, can only set destroy type to FxDestroyType.Effect`);
		}
	}
}