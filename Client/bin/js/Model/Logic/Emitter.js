define(["require", "exports", "../../Libs/decimal", "../../RC/FMath/FVec2", "../../RC/Utils/Hashtable", "../Defs"], function (require, exports, decimal_1, FVec2_1, Hashtable_1, Defs_1) {
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
            this._markToDestroy = false;
            this._battle = battle;
        }
        get rid() { return this._rid; }
        get id() { return this._id; }
        get markToDestroy() { return this._markToDestroy; }
        EncodeSnapshot(writer) {
            writer.uint64(this._rid);
            writer.int32(this._id);
            writer.bool(this._markToDestroy);
        }
        DecodeSnapshot(reader) {
            this._rid = reader.uint64();
            this._id = reader.int32();
            this._markToDestroy = reader.bool();
        }
        Init(rid, id, caster, skill) {
            this._rid = rid;
            this._id = id;
            this.OnInit();
        }
        OnInit() {
            this._def = Defs_1.Defs.GetBullet(this._id);
            this._raduis = new decimal_1.default(Hashtable_1.Hashtable.GetNumber(this._def, "radius"));
            const mOffset = Hashtable_1.Hashtable.GetVec2(this._def, "offset");
            this._offset = new FVec2_1.FVec2(new decimal_1.default(mOffset.x), new decimal_1.default(mOffset.y));
            this._angle = new decimal_1.default(Hashtable_1.Hashtable.GetNumber(this._def, "angle"));
            this._follow = Hashtable_1.Hashtable.GetBool(this._def, "follow");
            this._frequency = new decimal_1.default(Hashtable_1.Hashtable.GetNumber(this._def, "frequency"));
            this._lifeTime = new decimal_1.default(Hashtable_1.Hashtable.GetNumber(this._def, "lifeTime"));
            this._mouthType = Hashtable_1.Hashtable.GetNumber(this._def, "mouthType");
            this._time = new decimal_1.default(0);
        }
        Destroy() {
        }
        Update(dt) {
            this._time = this._time.add(dt);
            if (this._time.greaterThanOrEqualTo(this._lifeTime)) {
                this._markToDestroy = true;
            }
        }
    }
    exports.Emitter = Emitter;
});
//# sourceMappingURL=Emitter.js.map