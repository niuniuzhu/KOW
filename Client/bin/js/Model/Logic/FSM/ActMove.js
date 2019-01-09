define(["require", "exports", "../../Logic/InputAagent", "./EntityStateAction"], function (require, exports, InputAagent_1, EntityStateAction_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
});
//# sourceMappingURL=ActMove.js.map