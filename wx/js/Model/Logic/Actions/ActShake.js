import { EntityAction } from "./EntityAction";
export class ActShake extends EntityAction {
    OnExit() {
        this.owner.fsm.context.shakeTime = this.time;
        super.OnExit();
    }
}
