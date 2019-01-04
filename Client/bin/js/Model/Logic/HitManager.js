define(["require", "exports", "./HitUnit"], function (require, exports, HitUnit_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class HitManager {
        constructor(battle) {
            this._hitUnits = [];
            this._battle = battle;
        }
        get battle() { return this._battle; }
        Destroy() {
            this._hitUnits.splice(0);
        }
        AddHitUnit(casterID, targetID, skillID) {
            const hitUnit = new HitUnit_1.HitUnit(this);
            hitUnit.Init(casterID, targetID, skillID);
            this._hitUnits.push(hitUnit);
        }
        Update() {
            for (const hitUnit of this._hitUnits) {
                hitUnit.CalcDamage();
            }
            this._hitUnits.splice(0);
        }
        EncodeSnapshot(writer) {
            const count = this._hitUnits.length;
            writer.int32(count);
            for (let i = 0; i < count; ++i) {
                this._hitUnits[i].EncodeSnapshot(writer);
            }
        }
        DecodeSnapshot(reader) {
            const count = reader.int32();
            for (let i = 0; i < count; ++i) {
                const hitUnit = new HitUnit_1.HitUnit(this);
                hitUnit.DecodeSnapshot(reader);
                this._hitUnits.push(hitUnit);
            }
        }
    }
    exports.HitManager = HitManager;
});
//# sourceMappingURL=HitManager.js.map