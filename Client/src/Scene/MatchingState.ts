import { FSMState } from "../FSM/FSMState";
import { UIManager } from "../UI/UIManager";

export class MatchingState extends FSMState {
    constructor(type: number) {
        super(type);
    }

    protected OnEnter(param: any): void {
		UIManager.EnterMatching();
    }

    protected OnExit(): void {
		UIManager.LeaveModule();
    }

    protected OnUpdate(dt: number): void {
    }
}