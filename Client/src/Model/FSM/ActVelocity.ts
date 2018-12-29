import * as $protobuf from "../../Libs/protobufjs";
import { ISnapshotable } from "../ISnapshotable";
import { EntityStateAction } from "./EntityStateAction";
import { FVec2 } from "../../RC/FMath/FVec2";
import { MathUtils } from "../../RC/Math/MathUtils";
import { EntityState } from "./EntityState";
import { Hashtable } from "../../RC/Utils/Hashtable";

/**
 * 设置位移速度行为
 */
export class ActVelocity extends EntityStateAction implements ISnapshotable {
	private _speed: FVec2;

	protected OnInit(def: Hashtable): void {
		super.OnInit(def);
		this._speed = Hashtable.GetVec2(this._def, "speed");
	}

	protected OnExit(): void {
		super.OnExit();
		const owner = (<EntityState>this.state).owner;
		owner.phyxSpeed.Set(0, 0);
	}

	protected OnUpdate(dt: number): void {
		const owner = (<EntityState>this.state).owner;
		let rot = MathUtils.Acos(owner.direction.Dot(FVec2.up));
		if (owner.direction.x > 0) {
			rot = - rot;
		}
		const s = FVec2.Rotate(this._speed, rot);
		owner.phyxSpeed.CopyFrom(s);
	}

	public EncodeSnapshot(writer: $protobuf.Writer | $protobuf.BufferWriter): void {
	}

	public DecodeSnapshot(reader: $protobuf.Reader | $protobuf.BufferReader): void {
	}
}