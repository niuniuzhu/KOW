import { InputType } from "../../Logic/InputAagent";
import { EntityStateAction } from "./EntityStateAction";
export class ActMove extends EntityStateAction {
    OnEnter(param) {
        super.OnEnter(param);
        const inputAgent = this.state.owner.inputAgent;
        this.state.owner.moveDirection.CopyFrom(inputAgent.GetInputValue(InputType.Move));
    }
    OnExit() {
        super.OnExit();
        this.state.owner.moveDirection.Set(0, 0);
    }
    HandlInput(type, press) {
        if (type != InputType.Move)
            return;
        const inputAgent = this.state.owner.inputAgent;
        if (inputAgent.GetInputState(InputType.Move))
            this.state.owner.moveDirection.CopyFrom(inputAgent.GetInputValue(InputType.Move));
    }
}
