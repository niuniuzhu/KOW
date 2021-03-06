import { ISnapshotable } from "../ISnapshotable";
import { InputType } from "../InputAagent";
import { EntityAction } from "./EntityAction";

/**
 * 移动行为
 */
export class ActMove extends EntityAction implements ISnapshotable {
	protected OnEnter(param: any): void {
		super.OnEnter(param);
		const inputAgent = this.owner.inputAgent;
		this.owner.moveDirection.CopyFrom(inputAgent.GetInputValue(InputType.Move));
	}

	protected OnExit(): void {
		super.OnExit();
		this.owner.moveDirection.Set(0, 0);
	}

	protected OnInput(type: InputType, press: boolean): void {
		if (type != InputType.Move)
			return;
		const inputAgent = this.owner.inputAgent;
		this.owner.moveDirection.CopyFrom(inputAgent.GetInputValue(InputType.Move));
	}
}