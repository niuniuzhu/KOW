"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EntityStateContext {
    EncodeSnapshot(writer) {
        writer.int32(this.shakeTime);
        writer.int32(this.skillID);
    }
    DecodeSnapshot(reader) {
        this.shakeTime = reader.int32();
        this.skillID = reader.int32();
    }
}
exports.EntityStateContext = EntityStateContext;
