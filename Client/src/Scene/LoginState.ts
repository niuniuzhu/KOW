import { FSMState } from "../FSM/FSMState";
import { UIManager } from "../UI/UIManager";

export class LoginState extends FSMState {
    constructor(type: number) {
        super(type);
    }

    protected OnEnter(param: any): void {
		UIManager.EnterLogin();
    }

    protected OnExit(): void {
		UIManager.LeaveModule();
    }

    protected OnUpdate(dt: number): void {
    }
}