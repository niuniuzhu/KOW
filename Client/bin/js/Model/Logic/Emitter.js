define(["require", "exports", "../../Libs/decimal", "../../RC/FMath/FMathUtils", "../../RC/FMath/FVec2", "../../RC/Utils/Hashtable", "../Defs", "../../Libs/long"], function (require, exports, decimal_1, FMathUtils_1, FVec2_1, Hashtable_1, Defs_1, Long) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EmitterMouthType;
    (function (EmitterMouthType) {
        EmitterMouthType[EmitterMouthType["Center"] = 0] = "Center";
        EmitterMouthType[EmitterMouthType["Edage"] = 1] = "Edage";
        EmitterMouthType[EmitterMouthType["Inside"] = 2] = "Inside";
    })(EmitterMouthType = exports.EmitterMouthType || (exports.EmitterMouthType = {}));
    class Emitter {
        constructor(battle) {
            this._casterID = Long.ZERO;
            this._skillID = 0;
            this._markToDestroy = false;
            this._position = FVec2_1.FVec2.zero;
            this._direction = FVec2_1.FVec2.zero;
            this._battle = battle;
        }
        get rid() { return this._rid; }
        get id() { return this._id; }
        get markToDestroy() { return this._markToDestroy; }
        EncodeSnapshot(writer) {
            writer.uint64(this._rid);
            writer.int32(this._id);
            writer.bool(this._markToDestroy);
            writer.uint64(this._casterID);
            writer.int32(this._skillID);
            writer.float(this._time.toNumber());
            writer.float(this._position.x.toNumber()).float(this._position.y.toNumber());
            writer.float(this._direction.x.toNumber()).float(this._direction.y.toNumber());
        }
        DecodeSnapshot(reader) {
            this._rid = reader.uint64();
            this._id = reader.int32();
            this._markToDestroy = reader.bool();
            this._casterID = reader.uint64();
            this._skillID = reader.int32();
            this._time = new decimal_1.default(reader.float());
            this._position.Set(new decimal_1.default(reader.float()), new decimal_1.default(reader.float()));
            this._direction.Set(new decimal_1.default(reader.float()), new decimal_1.default(reader.float()));
        }
        Init(rid, id, casterID, skillID) {
            this._rid = rid;
            this._id = id;
            this._casterID = casterID;
            this._skillID = skillID;
            this.OnInit();
        }
        OnInit() {
            this._def = Defs_1.Defs.GetEmitter(this._id);
            this._raduis = new decimal_1.default(Hashtable_1.Hashtable.GetNumber(this._def, "radius"));
            const mOffset = Hashtable_1.Hashtable.GetVec2(this._def, "offset");
            this._offset = new FVec2_1.FVec2(new decimal_1.default(mOffset.x), new decimal_1.default(mOffset.y));
            this._angle = new decimal_1.default(Hashtable_1.Hashtable.GetNumber(this._def, "angle"));
            this._follow = Hashtable_1.Hashtable.GetBool(this._def, "follow");
            this._frequency = new decimal_1.default(Hashtable_1.Hashtable.GetNumber(this._def, "frequency"));
            this._lifeTime = new decimal_1.default(Hashtable_1.Hashtable.GetNumber(this._def, "lifeTime"));
            this._mouthType = Hashtable_1.Hashtable.GetNumber(this._def, "mouthType");
            this._destroyWhenDie = Hashtable_1.Hashtable.GetBool(this._def, "destroyWhenDie");
            this._time = new decimal_1.default(0);
            const caster = this._battle.GetEntity(this._casterID);
            if (this._follow) {
                this.UpdatePosition(caster);
            }
            this._direction.CopyFrom(caster.direction);
            if (!this._angle.equals(FMathUtils_1.FMathUtils.D_ZERO)) {
                this._direction.Rotate(this._angle);
            }
        }
        Destroy() {
        }
        Update(dt) {
            this._time = this._time.add(dt);
            if (this._time.greaterThanOrEqualTo(this._lifeTime)) {
                this._markToDestroy = true;
            }
            if (this._follow) {
                this.UpdatePosition();
            }
        }
        UpdatePosition(caster) {
            if (caster == null) {
                caster = this._battle.GetEntity(this._casterID);
            }
            this._position.CopyFrom(caster.position);
            this._position.Add(this._offset);
        }
    }
    exports.Emitter = Emitter;
});
//# sourceMappingURL=Emitter.js.map