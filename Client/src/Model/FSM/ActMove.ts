import { ISnapshotable } from "../ISnapshotable";
import { InputType } from "../Logic/InputAagent";
import { EntityState } from "./EntityState";
import { EntityStateAction } from "./EntityStateAction";

/**
 * 移动行为
 */
export class ActMove extends EntityStateAction implements ISnapshotable {
	protected OnEnter(param: any): void {
		super.OnEnter(param);
		const inputAgent = (<EntityState>this.state).owner.inputAgent;
		(<EntityState>this.state).owner.moveDirection.CopyFrom(inputAgent.GetInputValue(InputType.Move));
	}

	protected OnExit(): void {
		super.OnExit();
		(<EntityState>this.state).owner.moveDirection.Set(0, 0);
	}

	public HandlInput(type: InputType, press: boolean): void {
		if (type != InputType.Move)
			return;
		const inputAgent = (<EntityState>this.state).owner.inputAgent;
		if (inputAgent.GetInputState(InputType.Move))
			(<EntityState>this.state).owner.moveDirection.CopyFrom(inputAgent.GetInputValue(InputType.Move));
	}
}