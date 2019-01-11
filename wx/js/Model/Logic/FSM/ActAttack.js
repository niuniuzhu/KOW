import * as Long from "../../../Libs/long";
import { FMathUtils } from "../../../RC/FMath/FMathUtils";
import { Logger } from "../../../RC/Utils/Logger";
import { StateType } from "../../StateEnums";
import { EAttr } from "../Attribute";
import { EntityStateAction } from "./EntityStateAction";
export class ActAttack extends EntityStateAction {
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
        const owner = this.state.owner;
        this._casterID = owner.rid;
        this._skillID = owner.fsm.context.skillID;
        const skill = owner.GetSkill(this._skillID);
        if (skill == null) {
            Logger.Warn(`can not find skill:${this._skillID}`);
            owner.fsm.ChangeState(StateType.Idle);
        }
    }
    OnTrigger() {
        super.OnTrigger();
        const owner = this.state.owner;
        const skill = owner.GetSkill(this._skillID);
        owner.SetAttr(EAttr.MP, FMathUtils.Sub(owner.mp, skill.mpCost));
        owner.battle.CreateEmitter(skill.emitterID, this._casterID, this._skillID);
    }
    Dump() {
        let str = super.Dump();
        str += `caster id:${this._casterID}\n`;
        str += `skill id:${this._skillID}\n`;
        return str;
    }
}
