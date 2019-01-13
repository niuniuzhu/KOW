define(["require", "exports", "../../RC/FMath/FMathUtils", "../../RC/Utils/ExpressionEvaluator", "../../RC/Utils/TextUtils", "../BattleEvent/SyncEvent", "./Attribute"], function (require, exports, FMathUtils_1, ExpressionEvaluator_1, TextUtils_1, SyncEvent_1, Attribute_1) {
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
            let totalDmg;
            if (skill.formula != null) {
                const formula = TextUtils_1.StringUtils.Format(skill.formula, "" + skill.shakeTime);
                totalDmg = HitUnit.EE.evaluate(formula);
            }
            else {
                let commonDmg = FMathUtils_1.FMathUtils.Sub(caster.atk, target.def);
                commonDmg = commonDmg < 0 ? 0 : commonDmg;
                totalDmg = FMathUtils_1.FMathUtils.Add(commonDmg, skill.damage);
            }
            let hp = target.GetAttr(Attribute_1.EAttr.HP);
            hp -= totalDmg;
            hp = hp < 0 ? 0 : hp;
            target.SetAttr(Attribute_1.EAttr.HP, hp);
            target.SetAttr(Attribute_1.EAttr.MP, FMathUtils_1.FMathUtils.Add(target.mp, skill.mpAdd));
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
    HitUnit.EE = new ExpressionEvaluator_1.ExpressionEvaluator();
    exports.HitUnit = HitUnit;
});
//# sourceMappingURL=HitUnit.js.map