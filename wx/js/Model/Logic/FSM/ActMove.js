"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InputAagent_1 = require("../../Logic/InputAagent");
const EntityStateAction_1 = require("./EntityStateAction");
class ActMove extends EntityStateAction_1.EntityStateAction {
    OnEnter(param) {
        super.OnEnter(param);
        const inputAgent = this.state.owner.inputAgent;
        this.state.owner.moveDirection.CopyFrom(inputAgent.GetInputValue(InputAagent_1.InputType.Move));
    }
    OnExit() {
        super.OnExit();
        this.state.owner.moveDirection.Set(0, 0);
    }
    HandlInput(type, press) {
        if (type != InputAagent_1.InputType.Move)
            return;
        const inputAgent = this.state.owner.inputAgent;
        if (inputAgent.GetInputState(InputAagent_1.InputType.Move))
            this.state.owner.moveDirection.CopyFrom(inputAgent.GetInputValue(InputAagent_1.InputType.Move));
    }
}
exports.ActMove = ActMove;
