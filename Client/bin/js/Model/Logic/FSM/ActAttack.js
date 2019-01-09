define(["require", "exports", "../../../Libs/long", "./EntityStateAction"], function (require, exports, Long, EntityStateAction_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ActAttack extends EntityStateAction_1.EntityStateAction {
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
            for (let i = 0; i < owner.numSkills; ++i) {
                const skill = owner.GetSkillAt(i);
                if (skill.connectedState == this.state.type) {
                    this._skillID = skill.id;
                }
            }
        }
        OnTrigger() {
            super.OnTrigger();
            if (this._skillID == -1) {
                return;
            }
            const owner = this.state.owner;
            const skill = owner.GetSkill(this._skillID);
            owner.battle.CreateEmitter(skill.emitterID, this._casterID, this._skillID);
        }
        Dump() {
            let str = super.Dump();
            str += `caster id:${this._casterID}\n`;
            str += `skill id:${this._skillID}\n`;
            return str;
        }
    }
    exports.ActAttack = ActAttack;
});
//# sourceMappingURL=ActAttack.js.map