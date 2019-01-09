define(["require", "exports", "../../../RC/FSM/FSMState", "../../../RC/Utils/Hashtable", "./StateEnums"], function (require, exports, FSMState_1, Hashtable_1, StateEnums_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class VEntityState extends FSMState_1.FSMState {
        get owner() { return this._owner; }
        get time() { return this._time; }
        set time(value) {
            if (this._time == value)
                return;
            this._time = value;
            this.OnStateTimeChanged();
        }
        constructor(type, owner) {
            super(type);
            this._owner = owner;
        }
        Init(statesDef) {
            const def = Hashtable_1.Hashtable.GetMap(statesDef, this.type.toString());
            const actionsDef = Hashtable_1.Hashtable.GetMapArray(def, "actions");
            if (actionsDef != null) {
                for (const actionDef of actionsDef) {
                    const type = Hashtable_1.Hashtable.GetNumber(actionDef, "id");
                    const ctr = StateEnums_1.V_ID_TO_STATE_ACTION.get(type);
                    const action = new ctr(this, type, actionDef);
                    this.AddAction(action);
                }
            }
        }
        OnEnter(param) {
            if (this.owner.animationProxy.available) {
                const vDef = Hashtable_1.Hashtable.GetMap(Hashtable_1.Hashtable.GetMap(this.owner.cdefs, "states"), this.type.toString());
                const id = Hashtable_1.Hashtable.GetNumber(vDef, "animation", -1);
                if (id >= 0) {
                    const scaleTime = Hashtable_1.Hashtable.GetBool(vDef, "auto_scale_time");
                    const duration = Hashtable_1.Hashtable.GetNumber(vDef, "duration");
                    let timeScale = 1;
                    if (scaleTime) {
                        const animationSetting = this.owner.animationProxy.GetAnimationSetting(id);
                        timeScale = duration / (animationSetting.length * animationSetting.interval);
                    }
                    this.owner.animationProxy.Play(id, 0, timeScale);
                }
            }
            this._time = 0;
        }
        OnUpdate(dt) {
            this._time += dt;
        }
        OnStateTimeChanged() {
        }
    }
    exports.VEntityState = VEntityState;
});
//# sourceMappingURL=VEntityState.js.map