import { Hashtable } from "../../../RC/Utils/Hashtable";
import { Logger } from "../../../RC/Utils/Logger";
import { StateType } from "../../StateEnums";
import { EntityAction } from "./EntityAction";
var FilterType;
(function (FilterType) {
    FilterType[FilterType["AttrToAttr"] = 0] = "AttrToAttr";
    FilterType[FilterType["AttrToValue"] = 1] = "AttrToValue";
    FilterType[FilterType["State"] = 2] = "State";
})(FilterType || (FilterType = {}));
var Op;
(function (Op) {
    Op[Op["Equal"] = 0] = "Equal";
    Op[Op["NotEqual"] = 1] = "NotEqual";
    Op[Op["Greater"] = 2] = "Greater";
    Op[Op["GreaterEqual"] = 3] = "GreaterEqual";
    Op[Op["Less"] = 4] = "Less";
    Op[Op["LessEqual"] = 5] = "LessEqual";
})(Op || (Op = {}));
class IntrptFilter {
}
var FilterRel;
(function (FilterRel) {
    FilterRel[FilterRel["And"] = 0] = "And";
    FilterRel[FilterRel["Or"] = 1] = "Or";
})(FilterRel || (FilterRel = {}));
var IntrptType;
(function (IntrptType) {
    IntrptType[IntrptType["Attr"] = 0] = "Attr";
    IntrptType[IntrptType["Skill"] = 1] = "Skill";
    IntrptType[IntrptType["State"] = 2] = "State";
})(IntrptType || (IntrptType = {}));
export class ActIntrptBase extends EntityAction {
    constructor() {
        super(...arguments);
        this._connectState = StateType.Idle;
    }
    OnInit(def) {
        super.OnInit(def);
        this._intrptType = Hashtable.GetNumber(def, "intrpt_type");
        this._connectState = Hashtable.GetNumber(def, "connect_state");
        this._skillID = Hashtable.GetNumber(def, "intrpt_skill", null);
        this._skillIDs = Hashtable.GetNumberArray(def, "intrpt_skills");
        const filterDefs = Hashtable.GetMapArray(def, "intrpt_filters");
        if (filterDefs != null && filterDefs.length > 0) {
            this._intrptFilters = [];
            for (const filterDef of filterDefs) {
                const intrptFilter = new IntrptFilter();
                intrptFilter.filterType = Hashtable.GetNumber(filterDef, "type");
                intrptFilter.attr0 = Hashtable.GetNumber(filterDef, "attr0");
                intrptFilter.attr1 = Hashtable.GetNumber(filterDef, "attr1");
                intrptFilter.value = Hashtable.GetNumber(filterDef, "value");
                intrptFilter.op = Hashtable.GetNumber(filterDef, "op");
                intrptFilter.skillID = Hashtable.GetNumber(filterDef, "skill");
                this._intrptFilters.push(intrptFilter);
            }
        }
        this._rel = Hashtable.GetNumber(def, "rel");
    }
    CheckFilter() {
        if (this._intrptFilters == null || this._intrptFilters.length == 0) {
            return true;
        }
        let result = this._rel == FilterRel.And ? true : false;
        for (const intrptFilter of this._intrptFilters) {
            let v0;
            let v1;
            let meet;
            switch (intrptFilter.filterType) {
                case FilterType.AttrToAttr:
                    v0 = this.owner.GetAttr(intrptFilter.attr0);
                    v1 = this.owner.GetAttr(intrptFilter.attr1);
                    break;
                case FilterType.AttrToValue:
                    v0 = this.owner.GetAttr(intrptFilter.attr0);
                    v1 = intrptFilter.value;
                    break;
                case FilterType.State:
                    v0 = this.owner.fsm.currentEntityState.type;
                    v1 = intrptFilter.value;
                    break;
            }
            switch (intrptFilter.op) {
                case Op.Equal:
                    meet = v0 == v1;
                    break;
                case Op.NotEqual:
                    meet = v0 != v1;
                    break;
                case Op.Greater:
                    meet = v0 > v1;
                    break;
                case Op.GreaterEqual:
                    meet = v0 >= v1;
                    break;
                case Op.Less:
                    meet = v0 < v1;
                    break;
                case Op.LessEqual:
                    meet = v0 <= v1;
                    break;
            }
            result = this._rel == FilterRel.And ? result && meet : result || meet;
        }
        return result;
    }
    ChangeState(igroneIntrptList = true, force = true) {
        switch (this._intrptType) {
            case IntrptType.Attr:
                this.owner.fsm.ChangeState(this._connectState, null, igroneIntrptList, force);
                break;
            case IntrptType.Skill:
                let skill;
                if (this._skillID == null) {
                    if (this._skillIDs == null || this._skillIDs.length == 0) {
                        Logger.Warn("invalid skill id");
                        return;
                    }
                    const index = this.owner.battle.random.NextFloor(0, this._skillIDs.length);
                    skill = this.owner.GetSkill(this._skillIDs[index]);
                }
                else {
                    skill = this.owner.GetSkill(this._skillID);
                }
                if (skill == null) {
                    Logger.Warn("invalid skill");
                    return;
                }
                const meet = this.owner.mp >= skill.mpCost;
                if (meet) {
                    this.owner.fsm.context.skillID = skill.id;
                    this.owner.fsm.ChangeState(skill.connectState, null, igroneIntrptList, force);
                }
                break;
        }
    }
}
