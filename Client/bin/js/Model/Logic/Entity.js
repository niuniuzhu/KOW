define(["require", "exports", "../../RC/FMath/FVec2", "./Attribute"], function (require, exports, FVec2_1, Attribute_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Entity {
        constructor(battle, rid, id) {
            this.attribute = new Attribute_1.Attribute();
            this.position = FVec2_1.FVec2.zero;
            this.direction = FVec2_1.FVec2.zero;
            this._battle = battle;
            this._rid = rid;
            this._id = id;
            this.LoadDef();
        }
        get battle() { return this._battle; }
        get id() { return this._id; }
        get rid() { return this._rid; }
        get def() { return this._def; }
        get fsm() { return this._fsm; }
        Dispose() {
        }
        LoadDef() {
        }
        EncodeSnapshot(writer) {
            writer.int32(this._id);
        }
        DecodeSnapshot(reader) {
            this._id = reader.int32();
        }
        EncodeSync(writer) {
        }
        Update(dt) {
        }
    }
    exports.Entity = Entity;
});
//# sourceMappingURL=Entity.js.map