import * as $protobuf from "../../../Libs/protobufjs";
import { ISnapshotable } from "../../ISnapshotable";

export class EntityStateContext implements ISnapshotable {
	public shakeTime: number;
	public skillID: number;

	public EncodeSnapshot(writer: $protobuf.Writer | $protobuf.BufferWriter): void {
		writer.int32(this.shakeTime);
		writer.int32(this.skillID);
	}

	public DecodeSnapshot(reader: $protobuf.Reader | $protobuf.BufferReader): void {
		this.shakeTime = reader.int32();
		this.skillID = reader.int32();
	}
}