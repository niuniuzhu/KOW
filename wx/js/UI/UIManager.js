import { UILogin } from "./UILogin";
import { UIMain } from "./UIMain";
import { UIMatching } from "./UIMatching";
import { UILoading } from "./UILoading";
import { UIBattle } from "./UIBattle";
export class UIManager {
    get login() { return this._login; }
    get main() { return this._main; }
    get matching() { return this._matching; }
    get loading() { return this._loading; }
    get battle() { return this._battle; }
    Init() {
        fairygui.UIPackage.addPackage("res/ui/global");
        fairygui.UIConfig.globalModalWaiting = fairygui.UIPackage.getItemURL("global", "modelWait");
        fairygui.UIConfig.windowModalWaiting = fairygui.UIPackage.getItemURL("global", "modelWait");
        fairygui.UIConfig.defaultFont = "Microsoft YaHei, SimHei";
        this._main = new UIMain();
        this._login = new UILogin();
        this._matching = new UIMatching();
        this._loading = new UILoading();
        this._battle = new UIBattle();
        this._uis = [];
        this._uis[0] = this._main;
        this._uis[1] = this._login;
        this._uis[2] = this._matching;
        this._uis[3] = this._loading;
        this._uis[4] = this._battle;
    }
    Dispose() {
        for (let i = 0; i < this._uis.length; i++) {
            this._uis[i].Dispose();
        }
    }
    OnResize(e) {
        for (let i = 0; i < this._uis.length; i++) {
            this._uis[i].OnResize(e);
        }
    }
}
