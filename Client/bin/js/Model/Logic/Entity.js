define(["require", "exports", "../../RC/FMath/FVec2", "./Attribute"], function (require, exports, FVec2_1, Attribute_1) {
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
        get markToDestroy() { return this._markToDestroy; }
        Init(params) {
            this._rid = params.rid;
            this._id = params.id;
            this._markToDestroy = false;
            this.OnInit();
        }
        OnInit() {
        }
        Destroy() {
        }
        EncodeSnapshot(writer) {
            writer.uint64(this._rid);
            writer.int32(this._id);
            writer.bool(this._markToDestroy);
            writer.double(this.position.x).double(this.position.y);
            writer.double(this.direction.x).double(this.direction.y);
            const count = this.attribute.count;
            writer.int32(count);
            this.attribute.Foreach((v, k) => {
                writer.int32(k).double(v);
            });
        }
        DecodeSnapshot(reader) {
            this._rid = reader.uint64();
            this._id = reader.int32();
            this.OnInit();
            this._markToDestroy = reader.bool();
            this.position.Set(reader.double(), reader.double());
            this.direction.Set(reader.double(), reader.double());
            const count = reader.int32();
            for (let i = 0; i < count; i++) {
                this.attribute.Set(reader.int32(), reader.double());
            }
        }
        EncodeSync(writer) {
            writer.uint64(this._rid);
            writer.int32(this._id);
            writer.bool(this._markToDestroy);
            writer.double(this.position.x).double(this.position.y);
            writer.double(this.direction.x).double(this.direction.y);
            const count = this.attribute.count;
            writer.int32(count);
            this.attribute.Foreach((v, k, map) => {
                writer.int32(k).double(v);
            });
        }
        Update(dt) {
        }
        Dump() {
            let str = "";
            str += `rid:${this._rid.toString()}\n`;
            str += `id:${this._id}\n`;
            str += `markToDestroy:${this._markToDestroy}\n`;
            str += `positionX:${this.position.x}, positionY:${this.position.y}\n`;
            str += `directionX:${this.direction.x}, directionY:${this.direction.y}\n`;
            str += `attribute count:${this.attribute.count}\n`;
            this.attribute.Foreach((v, k) => {
                str += `  attr:${k}, v:${v}\n`;
            });
            return str;
        }
    }
    exports.Entity = Entity;
});
//# sourceMappingURL=Entity.js.map