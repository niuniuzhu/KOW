import { FSM } from "../FSM/FSM";
import { LoginState } from "./LoginState";

enum State {
    Login,
    Matching,
    Battle
}

export class SceneManager {
    public static readonly State = State;

    public static fsm: FSM;

    public static Init(): void {
        this.fsm = new FSM();
        this.fsm.AddState(new LoginState(State.Login));
    }

    public static ChangeState(state: State, param: any = null, force: boolean = false): void {
        this.fsm.ChangeState(state, param, force);
    }

    public static Update(dt: number): void {
        this.fsm.Update(dt);
    }
}