define(["require", "exports", "../../../Libs/long", "../../../RC/FMath/FMathUtils", "../../../RC/Utils/Logger", "../../Defines", "../Attribute", "./EntityAction"], function (require, exports, Long, FMathUtils_1, Logger_1, Defines_1, Attribute_1, EntityAction_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ActAttack extends EntityAction_1.EntityAction {
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
                Logger_1.Logger.Warn(`can not find skill:${this._skillID}`);
                this.owner.fsm.ChangeState(Defines_1.StateType.Idle);
            }
        }
        OnTrigger() {
            super.OnTrigger();
            const skill = this.owner.GetSkill(this._skillID);
            this.owner.SetAttr(Attribute_1.EAttr.MP, FMathUtils_1.FMathUtils.Sub(this.owner.mp, skill.mpCost));
            this.owner.battle.CreateEmitter(skill.emitterID, this._casterID, this._skillID);
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