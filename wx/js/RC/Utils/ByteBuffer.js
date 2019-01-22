import { MathUtils } from "../Math/MathUtils";
var Endian;
(function (Endian) {
    Endian[Endian["Little"] = 0] = "Little";
    Endian[Endian["Big"] = 1] = "Big";
})(Endian || (Endian = {}));
export class ByteBuffer {
    constructor(innerBuffer, endian = Endian.Little) {
        this._position = 0;
        this._innerBuffer = innerBuffer;
        this._dv = new DataView(this._innerBuffer.buffer, this._innerBuffer.byteOffset, this._innerBuffer.byteLength);
        this._endian = endian;
    }
    get endian() { return this._endian; }
    get position() { return this._position; }
    set position(value) {
        value = MathUtils.Clamp(value, 0, this.length);
        if (value == this._position)
            return;
        this._position = value;
    }
    get length() { return this._innerBuffer.byteLength; }
    get bytesAvailable() { return this.length - this._position; }
    WriteByte(value) {
        this._dv.setUint8(this._position, value);
        ++this.position;
    }
    WriteBool(value) {
        this._dv.setUint8(this._position, value ? 1 : 0);
        ++this.position;
    }
    WriteShort(value) {
        this._dv.setInt16(this._position, value, this._endian == Endian.Little);
        this.position += 2;
    }
    WriteUShort(value) {
        this._dv.setUint16(this._position, value, this._endian == Endian.Little);
        this.position += 2;
    }
    WriteInt(value) {
        this._dv.setInt32(this._position, value, this._endian == Endian.Little);
        this.position += 4;
    }
    WriteUint(value) {
        this._dv.setUint32(this._position, value, this._endian == Endian.Little);
        this.position += 4;
    }
    WriteFloat(value) {
        this._dv.setFloat32(this._position, value, this._endian == Endian.Little);
        this.position += 4;
    }
    WriteDouble(value) {
        this._dv.setFloat64(this._position, value, this._endian == Endian.Little);
        this.position += 8;
    }
    ReadByte() {
        const value = this._dv.getUint8(this._position);
        ++this.position;
        return value;
    }
    ReadBool() {
        const value = this._dv.getUint8(this._position);
        ++this.position;
        return value == 1 ? true : false;
    }
    ReadShort() {
        const value = this._dv.getInt16(this._position, this._endian == Endian.Little);
        this.position += 2;
        return value;
    }
    ReadUShort() {
        const value = this._dv.getUint16(this._position, this._endian == Endian.Little);
        this.position += 2;
        return value;
    }
    ReadInt() {
        const value = this._dv.getInt32(this._position, this._endian == Endian.Little);
        this.position += 4;
        return value;
    }
    ReadUint() {
        const value = this._dv.getUint32(this._position, this._endian == Endian.Little);
        this.position += 4;
        return value;
    }
    ReadFloat() {
        const value = this._dv.getFloat32(this._position, this._endian == Endian.Little);
        this.position += 4;
        return value;
    }
    ReadDouble() {
        const value = this._dv.getFloat64(this._position, this._endian == Endian.Little);
        this.position += 8;
        return value;
    }
    ReadBytes(offset, size) {
        return this._innerBuffer.subarray(this._innerBuffer.byteOffset + offset, this._innerBuffer.byteOffset + offset + size);
    }
}
ByteBuffer.Endian = Endian;
