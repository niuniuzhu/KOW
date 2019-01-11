import { FMathUtils } from "../../RC/FMath/FMathUtils";
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
    CalcDamage() {
        const caster = this._manager.battle.GetChampion(this._casterID);
        const target = this._manager.battle.GetChampion(this._targetID);
        const skill = caster.GetSkill(this._skillID);
        let commonDmg = FMathUtils.Sub(caster.atk, target.def);
        commonDmg = commonDmg < 0 ? 0 : commonDmg;
        const totalDmg = FMathUtils.Add(commonDmg, skill.damage);
        let hp = target.GetAttr(EAttr.HP);
        hp -= totalDmg;
        hp = hp < 0 ? 0 : hp;
        target.SetAttr(EAttr.HP, hp);
        target.SetAttr(EAttr.MP, FMathUtils.Add(target.mp, skill.mpAdd));
        if (!caster.battle.chase) {
            SyncEvent.Hit(target.rid, totalDmg);
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
