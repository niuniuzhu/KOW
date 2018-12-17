define(["require", "exports", "../../Libs/decimal", "../../RC/Collections/Set", "../../RC/Utils/Hashtable", "./EntityStateBase"], function (require, exports, decimal_1, Set_1, Hashtable_1, EntityStateBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class EntityState extends EntityStateBase_1.EntityStateBase {
        constructor(type, owner) {
            super(type);
            this._time = new decimal_1.default(0);
            this._owner = owner;
        }
        get owner() { return this._owner; }
        get time() { return this._time; }
        set time(value) {
            if (this._time.equals(value))
                return;
            this._time = value;
            this.OnStateTimeChanged();
        }
        Init() {
            const def = Hashtable_1.Hashtable.GetMap(Hashtable_1.Hashtable.GetMap(this._owner.def, "states"), this.type.toString());
            super.Init(def);
            const sa = Hashtable_1.Hashtable.GetNumberArray(def, "states_available");
            if (sa != null) {
                this._statesAvailable = new Set_1.default();
                for (const type of sa) {
                    this._statesAvailable.add(type);
                }
            }
        }
        OnEnter(param) {
            this._time = new decimal_1.default(0);
        }
        OnUpdate(dt) {
            this._time = this._time.add(dt);
        }
        OnStateTimeChanged() {
        }
        IsStateAvailable(type) {
            return this._statesAvailable == null || this._statesAvailable.contains(type);
        }
    }
    exports.EntityState = EntityState;
});
//# sourceMappingURL=EntityState.js.map