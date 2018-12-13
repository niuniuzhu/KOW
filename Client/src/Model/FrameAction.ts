import * as Long from "../Libs/long";
import { ByteBuffer } from "../RC/Utils/ByteBuffer";

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

	public Deserialize(buffer: ByteBuffer): void {
		const low = buffer.ReadInt();
		const high = buffer.ReadInt();
		this._gcNID = Long.fromBits(low, high, true);
		this._inputFlag = buffer.ReadByte();
		if ((this.inputFlag & InputFlag.Move) > 0) {
			this._dx = buffer.ReadFloat();
			this._dy = buffer.ReadFloat();
		}
	}
}