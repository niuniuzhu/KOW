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
            this._rid = params.rid;
            this._id = params.id;
            this._markToDestroy = false;
            this.OnInit();
        }
        Destroy() {
        }
        EncodeSnapshot(writer) {
            writer.uint64(this._rid);
            writer.int32(this._id);
            writer.bool(this._markToDestroy);
            writer.float(this.position.x.toNumber()).float(this.position.y.toNumber());
            writer.float(this.direction.x.toNumber()).float(this.direction.y.toNumber());
            const count = this.attribute.count;
            writer.int32(count);
            this.attribute.Foreach((v, k) => {
                writer.int32(k).float(v.toNumber());
            });
            this._fsm.EncodeSnapshot(writer);
        }
        DecodeSnapshot(reader) {
            this._rid = reader.uint64();
            this._id = reader.int32();
            this.OnInit();
            this._markToDestroy = reader.bool();
            this.position.Set(new decimal_1.default(reader.float()), new decimal_1.default(reader.float()));
            this.direction.Set(new decimal_1.default(reader.float()), new decimal_1.default(reader.float()));
            const count = reader.int32();
            for (let i = 0; i < count; i++) {
                this.attribute.Set(reader.int32(), new decimal_1.default(reader.float()));
            }
            this._fsm.DecodeSnapshot(reader);
        }
        EncodeSync(writer) {
            writer.uint64(this._rid);
            writer.int32(this._id);
            writer.bool(this._markToDestroy);
            writer.float(this.position.x.toNumber()).float(this.position.y.toNumber());
            writer.float(this.direction.x.toNumber()).float(this.direction.y.toNumber());
            const count = this.attribute.count;
            writer.int32(count);
            this.attribute.Foreach((v, k, map) => {
                writer.int32(k).float(v.toNumber());
            });
            writer.int32(this._fsm.currentState.type);
            writer.float(this._fsm.currentState.time.toNumber());
        }
        Update(dt) {
        }
    }
    exports.Entity = Entity;
});
//# sourceMappingURL=Entity.js.map