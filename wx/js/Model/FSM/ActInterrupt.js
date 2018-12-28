import { EntityStateAction } from "./EntityStateAction";
export class ActInterrupt extends EntityStateAction {
    EncodeSnapshot(writer) {
        super.EncodeSnapshot(writer);
    }
    DecodeSnapshot(reader) {
        super.DecodeSnapshot(reader);
    }
    constructor(state, type, def) {
        super(state, type, def);
    }
    OnUpdate(dt) {
        super.OnUpdate(dt);
    }
    HandlInput(type, press) {
    }
    Dump() {
        let str = super.Dump();
        return str;
    }
}
