export class EntityStateContext {
    EncodeSnapshot(writer) {
        writer.int32(this.shakeTime);
        writer.int32(this.skillID);
    }
    DecodeSnapshot(reader) {
        this.shakeTime = reader.int32();
        this.skillID = reader.int32();
    }
}
