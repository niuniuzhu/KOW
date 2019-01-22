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

export class VActEffect extends VEntityAction {
	private _effectID: number;
	private _offset: Vec2;
	private _attachType: FxAttachType;
	private _followPos: boolean;
	private _followRot: boolean;
	private _alwaysFollow: boolean;

	private _fx: VEffect;

	protected OnInit(def: Hashtable): void {
		super.OnInit(def);
		this._effectID = Hashtable.GetNumber(def, "effect");
		this._offset = Hashtable.GetVec2(def, "offset");
		this._attachType = Hashtable.GetNumber(def, "attach_type");
		this._followPos = Hashtable.GetBool(def, "follow_pos");
		this._followRot = Hashtable.GetBool(def, "follow_rot");
		this._alwaysFollow = Hashtable.GetBool(def, "always_follow");
	}

	protected OnExit(): void {
		super.OnExit();
		this._fx = null;
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
	}
}