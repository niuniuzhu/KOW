import * as $protobuf from "../../Libs/protobufjs";
import { UIEvent } from "../../Model/BattleEvent/UIEvent";

export class VTeam {
	public get id(): number { return this._id; }
	/**
	 * 停留在禁区的时间
	 */
	public get gladiatorTime(): number { return this._gladiatorTime; }
	public set gladiatorTime(value: number) {
		if (value == this._gladiatorTime)
			return;
		this._gladiatorTime = value;
		this.OnGladiatorTimeChanged(value);
	}

	private _id: number;
	private _gladiatorTime: number;

	public DecodeSync(id: number, reader: $protobuf.Reader | $protobuf.BufferReader): void {
		this._id = id;
		this.gladiatorTime = reader.int32();
	}

	private OnGladiatorTimeChanged(value: number) {
		UIEvent.GladiatorTimeChange(this.id, value);
	}
}