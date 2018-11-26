import * as Long from "../Libs/long";

enum InputFlag {
	None = 0,
	Move = 1 << 0,
	Skill1 = 1 << 1,
	Skill2 = 1 << 2
}

export class FrameAction {
	public static readonly InputFlag = InputFlag;

	public _gcNID: Long;
	public _inputFlag: InputFlag;
	public _dx: number;
	public _dy: number;

	public get gcNID(): Long { return this._gcNID; }
	public get inputFlag(): InputFlag { return this._inputFlag; }
	public get dx(): number { return this._dx; }
	public get dy(): number { return this._dy; }

	public DeSerialize(buffer: ByteBuffer): void {
		this._gcNID = buffer.readUint64();
		this._inputFlag = buffer.readByte();
		if ((this.inputFlag & InputFlag.Move) > 0) {
			this._dx = buffer.readFloat();
			this._dy = buffer.readFloat();
		}
	}
}