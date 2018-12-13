import { MathUtils } from "../Math/MathUtils";

enum Endian {
	Little,
	Big
}

export class ByteBuffer {
	public static readonly Endian = Endian;

	private readonly _innerBuffer: Uint8Array;
	private readonly _dv: DataView;
	private readonly _endian: Endian;

	private _position: number = 0;

	public get endian(): Endian { return this._endian; }

	public get position(): number { return this._position; }
	public set position(value: number) {
		value = MathUtils.Clamp(value, 0, this.length);
		if (value == this._position)
			return;
		this._position = value;
	}

	public get length(): number { return this._innerBuffer.byteLength; }

	public get bytesAvailable(): number { return this.length - this._position; }

	constructor(innerBuffer: Uint8Array, endian: Endian = Endian.Little) {
		this._innerBuffer = innerBuffer;
		this._dv = new DataView(this._innerBuffer.buffer, this._innerBuffer.byteOffset, this._innerBuffer.byteLength);
		this._endian = endian;
	}

	public WriteByte(value: number): void {
		this._dv.setUint8(this._position, value);
		++this.position;
	}

	public WriteBool(value: boolean): void {
		this._dv.setUint8(this._position, value ? 1 : 0);
		++this.position;
	}

	public WriteShort(value: number): void {
		this._dv.setInt16(this._position, value, this._endian == Endian.Little);
		this.position += 2;
	}

	public WriteUShort(value: number): void {
		this._dv.setUint16(this._position, value, this._endian == Endian.Little);
		this.position += 2;
	}

	public WriteInt(value: number): void {
		this._dv.setInt32(this._position, value, this._endian == Endian.Little);
		this.position += 4;
	}

	public WriteUint(value: number): void {
		this._dv.setUint32(this._position, value, this._endian == Endian.Little);
		this.position += 4;
	}

	public WriteFloat(value: number): void {
		this._dv.setFloat32(this._position, value, this._endian == Endian.Little);
		this.position += 4;
	}

	public WriteDouble(value: number): void {
		this._dv.setFloat64(this._position, value, this._endian == Endian.Little);
		this.position += 8;
	}

	public ReadByte(): number {
		const value = this._dv.getUint8(this._position);
		++this.position;
		return value;
	}

	public ReadBool(): boolean {
		const value = this._dv.getUint8(this._position);
		++this.position;
		return value == 1 ? true : false;
	}

	public ReadShort(): number {
		const value = this._dv.getInt16(this._position, this._endian == Endian.Little);
		this.position += 2;
		return value;
	}

	public ReadUShort(): number {
		const value = this._dv.getUint16(this._position, this._endian == Endian.Little);
		this.position += 2;
		return value;
	}

	public ReadInt(): number {
		const value = this._dv.getInt32(this._position, this._endian == Endian.Little);
		this.position += 4;
		return value;
	}

	public ReadUint(): number {
		const value = this._dv.getUint32(this._position, this._endian == Endian.Little);
		this.position += 4;
		return value;
	}

	public ReadFloat(): number {
		const value = this._dv.getFloat32(this._position, this._endian == Endian.Little);
		this.position += 4;
		return value;
	}

	public ReadDouble(): number {
		const value = this._dv.getFloat64(this._position, this._endian == Endian.Little);
		this.position += 8;
		return value;
	}

	public ReadBytes(offset: number, size: number): Uint8Array {
		return this._innerBuffer.subarray(this._innerBuffer.byteOffset + offset, this._innerBuffer.byteOffset + offset + size);
	}
}