define(["require", "exports", "./BulletAction", "../../../RC/Utils/Hashtable"], function (require, exports, BulletAction_1, Hashtable_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ActBulletIntrptState extends BulletAction_1.BulletAction {
        OnInit(def) {
            super.OnInit(def);
            this._phase = BulletAction_1.BulletActionPhase.Collision;
            this._destStates = Hashtable_1.Hashtable.GetNumber(def, "dest_state");
        }
        OnBulletCollision(target) {
            target.fsm.ChangeState(this._destStates, null, true);
        }
    }
    exports.ActBulletIntrptState = ActBulletIntrptState;
});
//# sourceMappingURL=ActBulletIntrptState.js.map