define(["require", "exports", "../../../RC/Utils/Hashtable"], function (require, exports, Hashtable_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
    var BulletActionPhase;
    (function (BulletActionPhase) {
        BulletActionPhase[BulletActionPhase["Create"] = 1] = "Create";
        BulletActionPhase[BulletActionPhase["Collision"] = 2] = "Collision";
        BulletActionPhase[BulletActionPhase["Destroy"] = 4] = "Destroy";
    })(BulletActionPhase = exports.BulletActionPhase || (exports.BulletActionPhase = {}));
    class BulletAction {
        get type() { return this._type; }
        get owner() { return this._owner; }
        constructor(owner, type) {
            this._owner = owner;
            this._type = type;
        }
        Init(def) {
            this.OnInit(def);
        }
        OnInit(def) {
            this._phase = Hashtable_1.Hashtable.GetNumber(def, "phase");
            const filterDefs = Hashtable_1.Hashtable.GetMapArray(def, "intrpt_filters");
            if (filterDefs != null && filterDefs.length > 0) {
                this._intrptFilters = [];
                for (const filterDef of filterDefs) {
                    const intrptFilter = new IntrptFilter();
                    intrptFilter.filterType = Hashtable_1.Hashtable.GetNumber(filterDef, "type");
                    intrptFilter.attr0 = Hashtable_1.Hashtable.GetNumber(filterDef, "attr0");
                    intrptFilter.attr1 = Hashtable_1.Hashtable.GetNumber(filterDef, "attr1");
                    intrptFilter.value = Hashtable_1.Hashtable.GetNumber(filterDef, "value");
                    intrptFilter.op = Hashtable_1.Hashtable.GetNumber(filterDef, "op");
                    this._intrptFilters.push(intrptFilter);
                }
            }
            this._rel = Hashtable_1.Hashtable.GetNumber(def, "rel");
        }
        BulletCreated() {
            if ((this._phase & BulletActionPhase.Create) == 0) {
                return;
            }
            this.OnBulletCreated();
        }
        BulletCollision(target) {
            if ((this._phase & BulletActionPhase.Collision) == 0) {
                return;
            }
            if (!this.CheckFilter(target)) {
                return;
            }
            this.OnBulletCollision(target);
        }
        BulletDestroy() {
            if ((this._phase & BulletActionPhase.Destroy) == 0) {
                return;
            }
            this.OnBulletDestroy();
        }
        OnBulletCreated() {
        }
        OnBulletCollision(target) {
        }
        OnBulletDestroy() {
        }
        CheckFilter(target) {
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
                        v0 = target.GetAttr(intrptFilter.attr0);
                        v1 = target.GetAttr(intrptFilter.attr1);
                        break;
                    case FilterType.AttrToValue:
                        v0 = target.GetAttr(intrptFilter.attr0);
                        v1 = intrptFilter.value;
                        break;
                    case FilterType.State:
                        v0 = target.fsm.currentEntityState.type;
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
    }
    exports.BulletAction = BulletAction;
});
//# sourceMappingURL=BulletAction.js.map