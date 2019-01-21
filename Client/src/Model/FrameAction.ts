import * as Long from "../Libs/long";
import { ByteBuffer } from "../RC/Utils/ByteBuffer";

export enum InputFlag {
	None = 0,
	Move = 1 << 0,
	S1 = 1 << 1,
	S2 = 1 << 2
}

export class FrameInfo {
	private _frame: number;
	private _inputFlag: InputFlag;
	private _v0: number;
	private _v1: number;

	public get frame(): number { return this._frame; }
	public get inputFlag(): InputFlag { return this._inputFlag; }
	public get v0(): number { return this._v0; }
	public get v1(): number { return this._v1; }

	public Deserialize(buffer: ByteBuffer): void {
		this._frame = buffer.ReadInt();
		this._inputFlag = buffer.ReadByte();
		if ((this.inputFlag & InputFlag.Move) > 0) {
			this._v0 = buffer.ReadInt() * 0.001;
			this._v1 = buffer.ReadInt() * 0.001;
		}
		if ((this.inputFlag & InputFlag.S1) > 0 || (this.inputFlag & InputFlag.S2) > 0) {
			this._v0 = buffer.ReadInt() * 0.001;
		}
	}
}

export class FrameAction {
	private _gcNID: Long;
	private readonly _infos: FrameInfo[] = []

	public get gcNID(): Long { return this._gcNID; }
	public get infos(): FrameInfo[] { return this._infos; }

	public Deserialize(buffer: ByteBuffer): void {
		const low = buffer.ReadInt();
		const high = buffer.ReadInt();
		this._gcNID = Long.fromBits(low, high, true);
		const count = buffer.ReadByte();
		for (let i = 0; i < count; ++i) {
			const info = new FrameInfo();
			info.Deserialize(buffer);
			this._infos.push(info);
		}
	}
}