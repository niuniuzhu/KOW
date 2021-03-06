import { FSM } from "../RC/Framework/FSM/FSM";
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
    get main() { return this._main; }
    get login() { return this._login; }
    get matching() { return this._matching; }
    get loading() { return this._loading; }
    get battle() { return this._battle; }
    Init() {
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
    ChangeState(state, param = null, force = false) {
        this.fsm.ChangeState(state, param, force);
    }
    Update(dt) {
        this.fsm.Update(dt);
    }
}
SceneManager.State = State;
