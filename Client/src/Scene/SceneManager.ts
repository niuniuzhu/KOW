import { FSM } from "../FSM/FSM";
import { LoginState } from "./LoginState";
import { MatchingState } from "./MatchingState";
import { MainState } from "./MainState";
import { GlobalState } from "./GlobalState";

enum State {
	Global,
	Main,
	Login,
	Matching,
	Battle
}

export class SceneManager {
	public static readonly State = State;

	public static fsm: FSM;

	public static get login(): LoginState { return this._login; }
	public static get matching(): MatchingState { return this._matching; }

	private static _main: MainState;
	private static _login: LoginState;
	private static _matching: MatchingState;

	public static Init(): void {
		this._main = new MainState(State.Main);
		this._login = new LoginState(State.Login);
		this._matching = new MatchingState(State.Matching);

		this.fsm = new FSM();
		this.fsm.globalState = new GlobalState(State.Global);
		this.fsm.AddState(this._main);
		this.fsm.AddState(this._login);
		this.fsm.AddState(this._matching);
	}

	public static ChangeState(state: State, param: any = null, force: boolean = false): void {
		this.fsm.ChangeState(state, param, force);
	}

	public static Update(dt: number): void {
		this.fsm.Update(dt);
	}
}