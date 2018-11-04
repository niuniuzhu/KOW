import { FSM } from "../RC/FSM/FSM";
import { MainState } from "./MainState";
import { LoginState } from "./LoginState";
import { GlobalState } from "./GlobalState";
import { MatchingState } from "./MatchingState";
import { BattleState } from "./BattleState";
import { LoadingState } from "./LoadingState";
var State;
(function (State) {
    State[State["Global"] = 0] = "Global";
    State[State["Main"] = 1] = "Main";
    State[State["Login"] = 2] = "Login";
    State[State["Matching"] = 3] = "Matching";
    State[State["Loading"] = 4] = "Loading";
    State[State["Battle"] = 5] = "Battle";
})(State || (State = {}));
export class SceneManager {
    static get main() { return this._main; }
    static get login() { return this._login; }
    static get matching() { return this._matching; }
    static get loading() { return this._loading; }
    static get battle() { return this._battle; }
    static Init() {
        this._main = new MainState(State.Main);
        this._login = new LoginState(State.Login);
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
    static ChangeState(state, param = null, force = false) {
        this.fsm.ChangeState(state, param, force);
    }
    static Update(dt) {
        this.fsm.Update(dt);
    }
}
SceneManager.State = State;
