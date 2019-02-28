import { FMathUtils } from "../../RC/FMath/FMathUtils";
import { ExpressionEvaluator } from "../../RC/Utils/ExpressionEvaluator";
import { StringUtils } from "../../RC/Utils/TextUtils";
import { SyncEvent } from "../BattleEvent/SyncEvent";
import { EAttr } from "./Attribute";
export class HitUnit {
    constructor(manager) {
        this._manager = manager;
    }
    Init(casterID, targetID, skillID) {
        this._casterID = casterID;
        this._targetID = targetID;
        this._skillID = skillID;
    }
    Calculate() {
        const caster = this._manager.battle.GetChampion(this._casterID);
        const target = this._manager.battle.GetChampion(this._targetID);
        const skill = caster.GetSkill(this._skillID);
        let totalDmg;
        if (skill.formula != null) {
            const formula = StringUtils.Format(skill.formula, "" + skill.shakeTime);
            totalDmg = HitUnit.EE.evaluate(formula);
        }
        else {
            let commonDmg = FMathUtils.Sub(caster.atk, target.def);
            commonDmg = commonDmg < 0 ? 0 : commonDmg;
            totalDmg = FMathUtils.Add(commonDmg, skill.damage);
        }
        if (skill.float > 0) {
            totalDmg += target.battle.random.NextCeil(1, skill.float);
        }
        let hp = target.GetAttr(EAttr.HP);
        hp -= FMathUtils.Floor(totalDmg);
        target.SetAttr(EAttr.HP, hp);
        target.SetAttr(EAttr.MP, FMathUtils.Add(target.mp, skill.mpAdd));
        if (!caster.battle.chase) {
            SyncEvent.Hit(caster.rid, target.rid, -totalDmg);
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
HitUnit.EE = new ExpressionEvaluator();
