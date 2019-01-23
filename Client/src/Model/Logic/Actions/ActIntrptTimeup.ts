import * as $protobuf from "../../../Libs/protobufjs";
import { Hashtable } from "../../../RC/Utils/Hashtable";
import { ISnapshotable } from "../ISnapshotable";
import { ActIntrptBase } from "./ActIntrptBase";

/**
 * 指定时间到达时中断
 */
export class ActIntrptTimeup extends ActIntrptBase implements ISnapshotable {
	/**
	 * 状态持续时长
	 */
	public duration: number;

	protected OnInit(def: Hashtable) {
		super.OnInit(def);
		this.duration = Hashtable.GetNumber(def, "duration", -1);
	}

	protected OnUpdate(dt: number): void {
		super.OnUpdate(dt);
		if (this.duration >= 0 &&
			this.time >= this.duration &&
			this.CheckFilter()) {
			this.ChangeState();
		}
	}

	public EncodeSnapshot(writer: $protobuf.Writer | $protobuf.BufferWriter): void {
		writer.int32(this.duration);
	}

	public DecodeSnapshot(reader: $protobuf.Reader | $protobuf.BufferReader): void {
		this.duration = reader.int32();
	}
}