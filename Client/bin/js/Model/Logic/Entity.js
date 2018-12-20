define(["require", "exports", "../../Libs/decimal", "../../RC/FMath/FVec2", "./Attribute"], function (require, exports, decimal_1, FVec2_1, Attribute_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class EntityInitParams {
    }
    exports.EntityInitParams = EntityInitParams;
    class Entity {
        constructor(battle) {
            this.attribute = new Attribute_1.Attribute();
            this.position = FVec2_1.FVec2.zero;
            this.direction = FVec2_1.FVec2.zero;
            this._battle = battle;
        }
        get battle() { return this._battle; }
        get id() { return this._id; }
        get rid() { return this._rid; }
        get def() { return this._def; }
        get fsm() { return this._fsm; }
        get markToDestroy() { return this._markToDestroy; }
        Init(params) {
            this.InternalInit(params);
            this.OnInit();
        }
        InternalInit(params) {
            this._rid = params.rid;
            this._id = params.id;
            this._markToDestroy = false;
        }
        Destroy() {
        }
        EncodeSnapshot(writer) {
            writer.uint64(this._rid);
            writer.int32(this._id);
            writer.bool(this._markToDestroy);
            writer.float(this.position.x.toNumber()).float(this.position.y.toNumber());
            writer.float(this.direction.x.toNumber()).float(this.direction.y.toNumber());
        }
        DecodeSnapshot(reader) {
            this._rid = reader.uint64();
            this._id = reader.int32();
            this._markToDestroy = reader.bool();
            this.position.Set(new decimal_1.default(reader.float()), new decimal_1.default(reader.float()));
            this.direction.Set(new decimal_1.default(reader.float()), new decimal_1.default(reader.float()));
        }
        EncodeSync(writer) {
            writer.uint64(this._rid);
            writer.int32(this._id);
            writer.bool(this._markToDestroy);
            writer.float(this.position.x.toNumber()).float(this.position.y.toNumber());
            writer.float(this.direction.x.toNumber()).float(this.direction.y.toNumber());
        }
        Update(dt) {
        }
    }
    exports.Entity = Entity;
});
//# sourceMappingURL=Entity.js.map