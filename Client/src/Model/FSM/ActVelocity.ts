import * as $protobuf from "../../Libs/protobufjs";
import { ISnapshotable } from "../ISnapshotable";
import { EntityStateAction } from "./EntityStateAction";
import { FVec2 } from "../../RC/FMath/FVec2";

/**
 * 设置位移速度行为
 */
export class ActVelocity extends EntityStateAction implements ISnapshotable {
	private _speed: FVec2 = FVec2.zero;
	
	protected OnTrigger(): void {
		super.OnTrigger();
	}

	public EncodeSnapshot(writer: $protobuf.Writer | $protobuf.BufferWriter): void {
	}

	public DecodeSnapshot(reader: $protobuf.Reader | $protobuf.BufferReader): void {
	}
}