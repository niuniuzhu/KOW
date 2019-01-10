define(["require", "exports", "../BattleEvent/SyncEvent"], function (require, exports, SyncEvent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class HitUnit {
        constructor(manager) {
            this._manager = manager;
        }
        Init(casterID, targetID, skillID) {
            this._casterID = casterID;
            this._targetID = targetID;
            this._skillID = skillID;
        }
        CalcDamage() {
            const caster = this._manager.battle.GetChampion(this._casterID);
            const target = this._manager.battle.GetChampion(this._targetID);
            const skill = caster.GetSkill(this._skillID);
            let commonDmg = caster.atk - target.def;
            commonDmg = commonDmg < 0 ? 0 : commonDmg;
            const totalDmg = commonDmg + skill.damage;
            target.hp -= totalDmg;
            target.hp = target.hp < 0 ? 0 : target.hp;
            if (!caster.battle.chase) {
                SyncEvent_1.SyncEvent.Hit(target.rid, totalDmg);
            }
        }
        EncodeSnapshot(writer) {
            writer.uint64(this._casterID);
            writer.uint64(this._targetID);
            writer.int32(this._skillID);
        }
        DecodeSnapshot(reader) {
            this._casterID = reader.uint64();
            this._targetID = reader.uint64();
            this._skillID = reader.int32();
        }
    }
    exports.HitUnit = HitUnit;
});
//# sourceMappingURL=HitUnit.js.map