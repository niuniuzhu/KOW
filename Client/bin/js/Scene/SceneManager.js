define(["require", "exports", "../RC/Framework/FSM/FSM", "./MainState", "./LoginState", "./GlobalState", "./MatchingState", "./BattleState", "./LoadingState"], function (require, exports, FSM_1, MainState_1, LoginState_1, GlobalState_1, MatchingState_1, BattleState_1, LoadingState_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var State;
    (function (State) {
        State[State["Global"] = 0] = "Global";
        State[State["Main"] = 1] = "Main";
        State[State["Login"] = 2] = "Login";
        State[State["Matching"] = 3] = "Matching";
        State[State["Loading"] = 4] = "Loading";
        State[State["Battle"] = 5] = "Battle";
    })(State || (State = {}));
    class SceneManager {
        get main() { return this._main; }
        get login() { return this._login; }
        get matching() { return this._matching; }
        get loading() { return this._loading; }
        get battle() { return this._battle; }
        Init() {
            this._login = new LoginState_1.LoginState(State.Login);
            this._main = new MainState_1.MainState(State.Main);
            this._matching = new MatchingState_1.MatchingState(State.Matching);
            this._loading = new LoadingState_1.LoadingState(State.Loading);
            this._battle = new BattleState_1.BattleState(State.Battle);
            this.fsm = new FSM_1.FSM();
            this.fsm.globalState = new GlobalState_1.GlobalState(State.Global);
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
    exports.SceneManager = SceneManager;
});
//# sourceMappingURL=SceneManager.js.map