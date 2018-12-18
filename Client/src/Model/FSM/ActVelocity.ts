import * as $protobuf from "../../Libs/protobufjs";
import { ISnapshotable } from "../ISnapshotable";
import { EntityStateAction } from "./EntityStateAction";

/**
 * 设置位移速度行为
 */
export class ActVelocity extends EntityStateAction implements ISnapshotable {

	public EncodeSnapshot(writer: $protobuf.Writer | $protobuf.BufferWriter): void {
	}

	public DecodeSnapshot(reader: $protobuf.Reader | $protobuf.BufferReader): void {
	}
}