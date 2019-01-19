import { Hashtable } from "../../../RC/Utils/Hashtable";
import { VEffect } from "../VEffect";
import { VEntityState } from "./VEntityState";
import { VEntityStateAction } from "./VEntityStateAction";
import { FVec2 } from "../../../RC/FMath/FVec2";
import { MathUtils } from "../../../RC/Math/MathUtils";

enum FxAttachType {
	None,
	Caster
}

enum PosRotType {
	None = 0,
	Position = 1 << 0,
	Rotation = 1 << 1
}

export class VActEffect extends VEntityStateAction {
	private _effectID: number;
	private _offset: FVec2;
	private _attachType: FxAttachType;
	private _posRotType: PosRotType;
	private _followPos: boolean;
	private _followRot: boolean;

	private _fx: VEffect;

	protected OnInit(def: Hashtable): void {
		super.OnInit(def);
		this._effectID = Hashtable.GetNumber(def, "effect");
		this._offset = Hashtable.GetFVec2(def, "offset");
		this._attachType = Hashtable.GetNumber(def, "attach_type");
		this._posRotType = Hashtable.GetNumber(def, "posrot_type");
		this._followPos = Hashtable.GetBool(def, "follow_pos");
		this._followRot = Hashtable.GetBool(def, "follow_rot");
	}

	protected OnExit(): void {
		super.OnExit();
		this._fx = null;
	}

	protected OnTrigger(): void {
		super.OnTrigger();
		const owner = (<VEntityState>this.state).owner;
		this._fx = owner.battle.SpawnEffect(this._effectID);

		switch (this._attachType) {
			case FxAttachType.Caster:
				if ((this._posRotType & PosRotType.Position) > 0) {
					const offset = FVec2.Rotate(this._offset, owner.rotation);
					this._fx.position = FVec2.Add(owner.position, offset);
				}
				if ((this._posRotType & PosRotType.Rotation) > 0) {
					this._fx.rotation = owner.rotation;
				}
				break;
		}
	}

	protected OnUpdate(dt: number): void {
		const owner = (<VEntityState>this.state).owner;
		if (this._followPos) {
			switch (this._attachType) {
				case FxAttachType.Caster:
					const offset = FVec2.Rotate(this._offset, owner.rotation);
					this._fx.position = FVec2.Add(owner.position, offset);
					break;
			}
		}
		if (this._followRot) {
			switch (this._attachType) {
				case FxAttachType.Caster:
					this._fx.rotation = owner.rotation;
					break;
			}
		}
	}
}