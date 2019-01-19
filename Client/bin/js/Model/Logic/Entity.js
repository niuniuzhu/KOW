define(["require", "exports", "../../RC/FMath/FVec2"], function (require, exports, FVec2_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EntityType;
    (function (EntityType) {
        EntityType[EntityType["Champion"] = 0] = "Champion";
        EntityType[EntityType["Bullet"] = 1] = "Bullet";
        EntityType[EntityType["SceneItem"] = 2] = "SceneItem";
    })(EntityType = exports.EntityType || (exports.EntityType = {}));
    class EntityInitParams {
    }
    exports.EntityInitParams = EntityInitParams;
    class Entity {
        constructor(battle) {
            this.position = FVec2_1.FVec2.zero;
            this.direction = FVec2_1.FVec2.zero;
            this._battle = battle;
        }
        get battle() { return this._battle; }
        get id() { return this._id; }
        get rid() { return this._rid; }
        get markToDestroy() { return this._markToDestroy; }
        Init(params) {
            this._rid = params.rid;
            this._id = params.id;
            this._markToDestroy = false;
            this.position.CopyFrom(params.position);
            this.direction.CopyFrom(params.direction);
            this.LoadDefs();
        }
        Destroy() {
        }
        EncodeSnapshot(writer) {
            writer.uint64(this._rid);
            writer.int32(this._id);
            writer.bool(this._markToDestroy);
            writer.double(this.position.x).double(this.position.y);
            writer.double(this.direction.x).double(this.direction.y);
        }
        DecodeSnapshot(reader) {
            this._rid = reader.uint64();
            this._id = reader.int32();
            this.LoadDefs();
            this._markToDestroy = reader.bool();
            this.position.Set(reader.double(), reader.double());
            this.direction.Set(reader.double(), reader.double());
        }
        EncodeSync(writer) {
            writer.uint64(this._rid);
            writer.int32(this._id);
            writer.bool(this._markToDestroy);
            writer.double(this.position.x).double(this.position.y);
            writer.double(this.direction.x).double(this.direction.y);
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
            return str;
        }
    }
    exports.Entity = Entity;
});
//# sourceMappingURL=Entity.js.map