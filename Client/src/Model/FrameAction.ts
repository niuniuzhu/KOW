import * as $protobuf from "../Libs/protobufjs";
import * as Long from "../Libs/long";

enum InputFlag {
	None = 0,
	Move = 1 << 0,
	Skill1 = 1 << 1,
	Skill2 = 1 << 2
}

export class FrameAction {
	public static readonly InputFlag = InputFlag;

	public _frame: number;
	public _gcNID: Long;
	public _inputFlag: InputFlag;
	public _dx: number;
	public _dy: number;

	public get frame(): number { return this._frame; }
	public get gcNID(): Long { return this._gcNID; }
	public get inputFlag(): InputFlag { return this._inputFlag; }
	public get dx(): number { return this._dx; }
	public get dy(): number { return this._dy; }

	constructor(frame: number) {
		this._frame = frame;
	}

	public DeSerialize(reader: $protobuf.Reader | $protobuf.BufferReader): void {
		this._gcNID = <Long>reader.uint64();
		this._inputFlag = <InputFlag>reader.int32();
		if ((this.inputFlag & InputFlag.Move) > 0) {
			this._dx = reader.float();
			this._dy = reader.float();
		}
	}
}