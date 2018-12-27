import * as Long from "../Libs/long";
import { ByteBuffer } from "../RC/Utils/ByteBuffer";

export enum InputFlag {
	None = 0,
	Move = 1 << 0,
	S1 = 1 << 1,
	S2 = 1 << 2
}

export class FrameAction {
	private _gcNID: Long;
	private _inputFlag: InputFlag;
	private _dx: number;
	private _dy: number;
	private _press: boolean;

	public get gcNID(): Long { return this._gcNID; }
	public get inputFlag(): InputFlag { return this._inputFlag; }
	public get dx(): number { return this._dx; }
	public get dy(): number { return this._dy; }
	public get press(): boolean { return this._press; }

	public Deserialize(buffer: ByteBuffer): void {
		const low = buffer.ReadInt();
		const high = buffer.ReadInt();
		this._gcNID = Long.fromBits(low, high, true);
		this._inputFlag = buffer.ReadByte();
		if ((this.inputFlag & InputFlag.Move) > 0) {
			this._dx = buffer.ReadFloat();
			this._dy = buffer.ReadFloat();
			this._press = buffer.ReadBool();
		}
		if ((this.inputFlag & InputFlag.S1) > 0 || (this.inputFlag & InputFlag.S2) > 0) {
			this._press = buffer.ReadBool();
		}
	}
}