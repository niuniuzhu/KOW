import { FVec2 } from "../../../RC/FMath/FVec2";
import { MathUtils } from "../../../RC/Math/MathUtils";
import { Hashtable } from "../../../RC/Utils/Hashtable";
import { ISnapshotable } from "../ISnapshotable";
import { EntityAction } from "./EntityAction";

/**
 * 设置位移速度行为
 */
export class ActVelocity extends EntityAction implements ISnapshotable {
	private _speed: FVec2;

	protected OnInit(def: Hashtable): void {
		super.OnInit(def);
		this._speed = Hashtable.GetVec2(def, "speed");
	}

	protected OnExit(): void {
		super.OnExit();
		this.owner.phyxSpeed.Set(0, 0);
	}

	protected OnUpdate(dt: number): void {
		let rot = MathUtils.Acos(this.owner.direction.Dot(FVec2.up));
		if (this.owner.direction.x > 0) {
			rot = - rot;
		}
		const s = FVec2.Rotate(this._speed, rot);
		this.owner.phyxSpeed.CopyFrom(s);
	}
}