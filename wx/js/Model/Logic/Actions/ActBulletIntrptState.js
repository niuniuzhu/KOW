import { BulletAction, BulletActionPhase } from "./BulletAction";
import { Hashtable } from "../../../RC/Utils/Hashtable";
export class ActBulletIntrptState extends BulletAction {
    OnInit(def) {
        super.OnInit(def);
        this._phase = BulletActionPhase.Collision;
        this._destStates = Hashtable.GetNumber(def, "dest_state");
    }
    OnBulletCollision(target) {
        target.fsm.ChangeState(this._destStates, null, true);
    }
}
