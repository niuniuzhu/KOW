import { InputType } from "../../Logic/InputAagent";
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
    HandlInput(type, press) {
        if (type != InputType.Move)
            return;
        const inputAgent = this.owner.inputAgent;
        if (inputAgent.GetInputState(InputType.Move))
            this.owner.moveDirection.CopyFrom(inputAgent.GetInputValue(InputType.Move));
    }
}
