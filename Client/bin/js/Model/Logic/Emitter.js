define(["require", "exports", "../../Libs/long", "../../RC/FMath/FVec2", "../../RC/Math/MathUtils", "../../RC/Utils/Hashtable", "../Defs"], function (require, exports, Long, FVec2_1, MathUtils_1, Hashtable_1, Defs_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EmitType;
    (function (EmitType) {
        EmitType[EmitType["Center"] = 0] = "Center";
        EmitType[EmitType["Edage"] = 1] = "Edage";
        EmitType[EmitType["Inside"] = 2] = "Inside";
    })(EmitType || (EmitType = {}));
    var DestroyType;
    (function (DestroyType) {
        DestroyType[DestroyType["Life"] = 0] = "Life";
        DestroyType[DestroyType["Bullet"] = 1] = "Bullet";
        DestroyType[DestroyType["Caster"] = 2] = "Caster";
    })(DestroyType || (DestroyType = {}));
    class Emitter {
        constructor(battle) {
            this._casterID = Long.ZERO;
            this._skillID = 0;
            this._position = FVec2_1.FVec2.zero;
            this._direction = FVec2_1.FVec2.zero;
            this._battle = battle;
        }
        get rid() { return this._rid; }
        get id() { return this._id; }
        get markToDestroy() { return this._markToDestroy; }
        Init(rid, id, casterID, skillID) {
            this._rid = rid;
            this._id = id;
            this.OnInit();
            this._casterID = casterID;
            this._skillID = skillID;
            this._markToDestroy = false;
            this._time = 0;
            this._nextEmitTime = 0;
            this._bulletCount = 0;
            const caster = this._battle.GetChampion(this._casterID);
            this.UpdatePosition(caster);
            this._direction.CopyFrom(caster.direction);
            if (this._angle != 0) {
                this._direction.Rotate(this._angle);
            }
        }
        OnInit() {
            this._def = Defs_1.Defs.GetEmitter(this._id);
            this._raduis = Hashtable_1.Hashtable.GetNumber(this._def, "radius");
            const mOffset = Hashtable_1.Hashtable.GetVec2(this._def, "offset");
            this._offset = new FVec2_1.FVec2(mOffset.x, mOffset.y);
            this._angle = Hashtable_1.Hashtable.GetNumber(this._def, "angle");
            this._follow = Hashtable_1.Hashtable.GetBool(this._def, "follow");
            this._frequency = Hashtable_1.Hashtable.GetNumber(this._def, "frequency");
            this._maxBulletCount = Hashtable_1.Hashtable.GetNumber(this._def, "max_bullet_count", 1);
            this._lifeTime = Hashtable_1.Hashtable.GetNumber(this._def, "life_time", -1);
            this._emitType = Hashtable_1.Hashtable.GetNumber(this._def, "emit_type");
            this._destroyType = Hashtable_1.Hashtable.GetNumber(this._def, "destroy_type");
        }
        Destroy() {
        }
        EncodeSnapshot(writer) {
            writer.uint64(this._rid);
            writer.int32(this._id);
            writer.uint64(this._casterID);
            writer.int32(this._skillID);
            writer.bool(this._markToDestroy);
            writer.int32(this._time);
            writer.int32(this._nextEmitTime);
            writer.int32(this._bulletCount);
            writer.double(this._position.x).double(this._position.y);
            writer.double(this._direction.x).double(this._direction.y);
        }
        DecodeSnapshot(reader) {
            this._rid = reader.uint64();
            this._id = reader.int32();
            this.OnInit();
            this._casterID = reader.uint64();
            this._skillID = reader.int32();
            this._markToDestroy = reader.bool();
            this._time = reader.int32();
            this._nextEmitTime = reader.int32();
            this._bulletCount = reader.int32();
            this._position.Set(reader.double(), reader.double());
            this._direction.Set(reader.double(), reader.double());
        }
        Update(dt) {
            switch (this._destroyType) {
                case DestroyType.Life:
                    if (this._time >= this._lifeTime) {
                        this._markToDestroy = true;
                        return;
                    }
                    break;
                case DestroyType.Caster:
                    break;
                case DestroyType.Bullet:
                    break;
            }
            if (this._follow) {
                this.UpdatePosition();
            }
            if (this._time >= this._nextEmitTime) {
                this._nextEmitTime = this._time + this._frequency - (this._time - this._nextEmitTime);
                if (this._bulletCount < this._maxBulletCount) {
                    this.Emit();
                    ++this._bulletCount;
                }
            }
            this._time += dt;
        }
        UpdatePosition(caster) {
            if (caster == null) {
                caster = this._battle.GetChampion(this._casterID);
            }
            let rot = MathUtils_1.MathUtils.Acos(caster.direction.Dot(FVec2_1.FVec2.up));
            if (caster.direction.x > 0) {
                rot = -rot;
            }
            this._offset.Rotate(rot);
            this._position.CopyFrom(caster.position);
            this._position.Add(this._offset);
        }
        Emit() {
            const caster = this._battle.GetChampion(this._casterID);
            const skill = caster.GetSkill(this._skillID);
            switch (this._emitType) {
                case EmitType.Center:
                    this._battle.CreateBullet(skill.bulletID, this._casterID, this._skillID, new FVec2_1.FVec2(this._position.x, this._position.y), new FVec2_1.FVec2(this._direction.x, this._direction.y));
                    break;
                case EmitType.Edage:
                    break;
                case EmitType.Inside:
                    break;
            }
        }
        Dump() {
            let str = "";
            str += `rid:${this._rid.toNumber()}\n`;
            str += `id:${this._id}\n`;
            str += `caster id:${this._casterID}\n`;
            str += `skill id:${this._skillID}\n`;
            str += `markToDestroy:${this._markToDestroy}\n`;
            str += `time:${this._time}\n`;
            str += `next emmit time:${this._nextEmitTime}\n`;
            str += `positionX:${this._position.x}, positionY:${this._position.y}\n`;
            str += `directionX:${this._direction.x}, directionY:${this._direction.y}\n`;
            return str;
        }
    }
    exports.Emitter = Emitter;
});
//# sourceMappingURL=Emitter.js.map