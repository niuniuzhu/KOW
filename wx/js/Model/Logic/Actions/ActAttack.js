import * as Long from "../../../Libs/long";
import { FMathUtils } from "../../../RC/FMath/FMathUtils";
import { Logger } from "../../../RC/Utils/Logger";
import { StateType } from "../../Defines";
import { EAttr } from "../Attribute";
import { EntityAction } from "./EntityAction";
export class ActAttack extends EntityAction {
    constructor() {
        super(...arguments);
        this._casterID = Long.ZERO;
        this._skillID = -1;
    }
    EncodeSnapshot(writer) {
        super.EncodeSnapshot(writer);
        writer.uint64(this._casterID);
        writer.int32(this._skillID);
    }
    DecodeSnapshot(reader) {
        super.DecodeSnapshot(reader);
        this._casterID = reader.uint64();
        this._skillID = reader.int32();
    }
    OnEnter(param) {
        super.OnEnter(param);
        this._casterID = this.owner.rid;
        this._skillID = this.owner.fsm.context.skillID;
        const skill = this.owner.GetSkill(this._skillID);
        skill.shakeTime = this.owner.fsm.context.shakeTime;
        if (skill == null) {
            Logger.Warn(`can not find skill:${this._skillID}`);
            this.owner.fsm.ChangeState(StateType.Idle);
        }
    }
    OnTrigger() {
        super.OnTrigger();
        const skill = this.owner.GetSkill(this._skillID);
        this.owner.SetAttr(EAttr.MP, FMathUtils.Sub(this.owner.mp, skill.mpCost));
        this.owner.battle.CreateEmitter(skill.emitterID, this._casterID, this._skillID);
    }
    Dump() {
        let str = super.Dump();
        str += `caster id:${this._casterID}\n`;
        str += `skill id:${this._skillID}\n`;
        return str;
    }
}
