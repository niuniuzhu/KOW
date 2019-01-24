import { InputType } from "../InputAagent";
import { EntityAction } from "./EntityAction";
export class ActMove extends EntityAction {
    OnEnter(param) {
        super.OnEnter(param);
        const inputAgent = this.owner.inputAgent;
        this.owner.moveDirection.CopyFrom(inputAgent.GetInputValue(InputType.Move));
    }
    OnExit() {
        super.OnExit();
        this.owner.moveDirection.Set(0, 0);
    }
    OnInput(type, press) {
        if (type != InputType.Move)
            return;
        const inputAgent = this.owner.inputAgent;
        this.owner.moveDirection.CopyFrom(inputAgent.GetInputValue(InputType.Move));
    }
}
