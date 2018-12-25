import { EntityStateAction } from "./EntityStateAction";
import * as Long from "../../Libs/long";
export class ActAttack extends EntityStateAction {
    constructor() {
        super(...arguments);
        this._casterID = Long.ZERO;
        this._skillID = 0;
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
        this._casterID = param[0];
        this._skillID = param[1];
    }
    OnTrigger() {
        super.OnTrigger();
        const owner = this.state.owner;
        const caster = owner.battle.GetChampion(this._casterID);
        const skill = caster.GetSkill(this._skillID);
        owner.battle.CreateEmitter(skill.emitterID, this._casterID, this._skillID);
    }
    Dump() {
        let str = super.Dump();
        str += `caster id:${this._casterID}\n`;
        str += `skill id:${this._skillID}\n`;
        return str;
    }
}
