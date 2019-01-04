import * as $protobuf from "../../Libs/protobufjs";
import { ISnapshotable } from "../ISnapshotable";
import { EntityStateAction } from "./EntityStateAction";

/**
 * 设置位移 加速度 行为
 */
export class ActVelocityAcceleration extends EntityStateAction implements ISnapshotable {

	public EncodeSnapshot(writer: $protobuf.Writer | $protobuf.BufferWriter): void {
		super.EncodeSnapshot(writer);
	}

	public DecodeSnapshot(reader: $protobuf.Reader | $protobuf.BufferReader): void {
		super.DecodeSnapshot(reader);
	}
}