import { ISnapshotable } from "../ISnapshotable";
import { EntityAction } from "./EntityAction";

export class ActShake extends EntityAction implements ISnapshotable {
	protected OnExit(): void {
		this.owner.fsm.context.shakeTime = this.time;
		super.OnExit();
	}
}