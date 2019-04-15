import { FSM } from "../RC/Framework/FSM/FSM";
import { MainState } from "./MainState";
import { LoginState } from "./LoginState";
import { GlobalState } from "./GlobalState";
import { MatchingState } from "./MatchingState";
import { BattleState } from "./BattleState";
import { LoadingState } from "./LoadingState";

enum State {
	Global,
	Main,
	Login,
	Matching,
	Loading,
	Battle
}

export class SceneManager {
	public static readonly State = State;

	public fsm: FSM;

	public get main(): MainState { return this._main; }
	public get login(): LoginState { return this._login; }
	public get matching(): MatchingState { return this._matching; }
	public get loading(): LoadingState { return this._loading; }
	public get battle(): BattleState { return this._battle; }

	private _main: MainState;
	private _login: LoginState;
	private _matching: MatchingState;
	private _loading: LoadingState;
	private _battle: BattleState;

	public Init(): void {
		this._login = new LoginState(State.Login);
		this._main = new MainState(State.Main);
		this._matching = new MatchingState(State.Matching);
		this._loading = new LoadingState(State.Loading);
		this._battle = new BattleState(State.Battle);

		this.fsm = new FSM();
		this.fsm.globalState = new GlobalState(State.Global);
		this.fsm.AddState(this._main);
		this.fsm.AddState(this._login);
		this.fsm.AddState(this._matching);
		this.fsm.AddState(this._loading);
		this.fsm.AddState(this._battle);
	}

	public ChangeState(state: State, param: any = null, force: boolean = false): void {
		this.fsm.ChangeState(state, param, force);
	}

	public Update(dt: number): void {
		this.fsm.Update(dt);
	}
}