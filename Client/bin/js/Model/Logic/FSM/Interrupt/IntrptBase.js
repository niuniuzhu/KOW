define(["require", "exports", "../../../../RC/Utils/Hashtable", "../../../StateEnums", "../../../../RC/Utils/Logger"], function (require, exports, Hashtable_1, StateEnums_1, Logger_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FilterType;
    (function (FilterType) {
        FilterType[FilterType["AttrToAttr"] = 0] = "AttrToAttr";
        FilterType[FilterType["AttrToValue"] = 1] = "AttrToValue";
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
        IntrptType[IntrptType["State"] = 0] = "State";
        IntrptType[IntrptType["Skill"] = 1] = "Skill";
    })(IntrptType || (IntrptType = {}));
    class IntrptBase {
        constructor(state, def) {
            this._connectState = StateEnums_1.StateType.Idle;
            this._delay = 0;
            this._isTriggered = false;
            this._intrptFilters = [];
            this._state = state;
            this.OnInit(def);
        }
        get id() { return this._id; }
        get time() { return this._state.time; }
        get intrptTime() { return this._state.time - this._delay; }
        EncodeSnapshot(writer) {
            writer.bool(this._isTriggered);
        }
        DecodeSnapshot(reader) {
            this._isTriggered = reader.bool();
        }
        OnInit(def) {
            this._id = Hashtable_1.Hashtable.GetNumber(def, "id");
            this._intrptType = Hashtable_1.Hashtable.GetNumber(def, "type");
            this._connectState = Hashtable_1.Hashtable.GetNumber(def, "connect_state");
            this._skillID = Hashtable_1.Hashtable.GetNumber(def, "skill", null);
            this._skillIDs = Hashtable_1.Hashtable.GetNumberArray(def, "skills");
            this._delay = Hashtable_1.Hashtable.GetNumber(def, "delay");
            const filterDefs = Hashtable_1.Hashtable.GetMapArray(def, "filters");
            if (filterDefs != null) {
                for (const filterDef of filterDefs) {
                    const intrptFilter = new IntrptFilter();
                    intrptFilter.filterType = Hashtable_1.Hashtable.GetNumber(filterDef, "filter_type");
                    intrptFilter.attr0 = Hashtable_1.Hashtable.GetNumber(filterDef, "attr0");
                    intrptFilter.attr1 = Hashtable_1.Hashtable.GetNumber(filterDef, "attr1");
                    intrptFilter.value = Hashtable_1.Hashtable.GetNumber(filterDef, "value");
                    intrptFilter.op = Hashtable_1.Hashtable.GetNumber(filterDef, "op");
                    intrptFilter.skillID = Hashtable_1.Hashtable.GetNumber(filterDef, "skill");
                    this._intrptFilters.push(intrptFilter);
                }
            }
            this._rel = Hashtable_1.Hashtable.GetNumber(def, "rel");
        }
        Enter() {
            this._isTriggered = false;
            if (this._delay <= 0) {
                this.Trigger();
            }
            this.OnEnter();
        }
        Exit() {
            this.OnExit();
        }
        Update(dt) {
            const time = this._state.time;
            if (!this._isTriggered) {
                if (time >= this._delay) {
                    this.Trigger();
                }
            }
            else {
                this.OnUpdate(dt);
            }
        }
        UpdatePhysic(dt) {
            if (!this._isTriggered) {
                return;
            }
            this.OnUpdatePhysic(dt);
        }
        HandleInput(type, press) {
            this.OnInput(type, press);
        }
        Trigger() {
            this._isTriggered = true;
            this.OnTrigger();
        }
        OnTrigger() {
        }
        OnEnter() {
        }
        OnExit() {
        }
        OnUpdate(dt) {
        }
        OnUpdatePhysic(dt) {
        }
        OnInput(type, press) {
        }
        CheckFilter() {
            if (this._intrptFilters.length == 0) {
                return true;
            }
            const owner = this._state.owner;
            let result = this._rel == FilterRel.And ? true : false;
            for (const intrptFilter of this._intrptFilters) {
                let v0;
                let v1;
                let meet;
                switch (intrptFilter.filterType) {
                    case FilterType.AttrToAttr:
                        v0 = owner.GetAttr(intrptFilter.attr0);
                        v1 = owner.GetAttr(intrptFilter.attr1);
                        break;
                    case FilterType.AttrToValue:
                        v0 = owner.GetAttr(intrptFilter.attr0);
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
            const owner = this._state.owner;
            switch (this._intrptType) {
                case IntrptType.State:
                    owner.fsm.ChangeState(this._connectState, null, igroneIntrptList, force);
                    break;
                case IntrptType.Skill:
                    let skill;
                    if (this._skillID == null) {
                        if (this._skillIDs == null || this._skillIDs.length == 0) {
                            Logger_1.Logger.Warn("invalid skill id");
                            return;
                        }
                        const index = owner.battle.random.NextFloor(0, this._skillIDs.length);
                        skill = owner.GetSkill(this._skillIDs[index]);
                    }
                    else {
                        skill = owner.GetSkill(this._skillID);
                    }
                    if (skill == null) {
                        Logger_1.Logger.Warn("invalid skill");
                        return;
                    }
                    const meet = owner.mp >= skill.mpCost;
                    if (meet) {
                        owner.fsm.context.skillID = skill.id;
                        owner.fsm.ChangeState(skill.connectState, null, igroneIntrptList, force);
                    }
                    break;
            }
        }
        Dump() {
            let str = "";
            str += `istriggered:${this._isTriggered}\n`;
            return str;
        }
    }
    exports.IntrptBase = IntrptBase;
});
//# sourceMappingURL=IntrptBase.js.map