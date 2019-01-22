define(["require", "exports", "../../Logic/InputAagent", "./EntityAction"], function (require, exports, InputAagent_1, EntityAction_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ActMove extends EntityAction_1.EntityAction {
        OnEnter(param) {
            super.OnEnter(param);
            const inputAgent = this.owner.inputAgent;
            this.owner.moveDirection.CopyFrom(inputAgent.GetInputValue(InputAagent_1.InputType.Move));
        }
        OnExit() {
            super.OnExit();
            this.owner.moveDirection.Set(0, 0);
        }
        HandlInput(type, press) {
            if (type != InputAagent_1.InputType.Move)
                return;
            const inputAgent = this.owner.inputAgent;
            if (inputAgent.GetInputState(InputAagent_1.InputType.Move))
                this.owner.moveDirection.CopyFrom(inputAgent.GetInputValue(InputAagent_1.InputType.Move));
        }
    }
    exports.ActMove = ActMove;
});
//# sourceMappingURL=ActMove.js.map