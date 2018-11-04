import { UILogin } from "./UILogin";
import { UIMain } from "./UIMain";
import { UIMatching } from "./UIMatching";
import { UILoading } from "./UILoading";
import { UIBattle } from "./UIBattle";
export class UIManager {
    static get login() { return UIManager._login; }
    static get main() { return UIManager._main; }
    static get matching() { return UIManager._matching; }
    static get loading() { return UIManager._loading; }
    static get battle() { return UIManager._battle; }
    static Init() {
        fairygui.UIPackage.addPackage("res/ui/global");
        fairygui.UIConfig.globalModalWaiting = fairygui.UIPackage.getItemURL("global", "modelWait");
        fairygui.UIConfig.windowModalWaiting = fairygui.UIPackage.getItemURL("global", "modelWait");
        fairygui.UIConfig.buttonSound = fairygui.UIPackage.getItemURL("global", "click");
        UIManager._main = new UIMain();
        UIManager._login = new UILogin();
        UIManager._matching = new UIMatching();
        UIManager._loading = new UILoading();
        UIManager._battle = new UIBattle();
        UIManager._uis = [];
        UIManager._uis[0] = UIManager._main;
        UIManager._uis[1] = UIManager._login;
        UIManager._uis[2] = UIManager._matching;
        UIManager._uis[3] = UIManager._loading;
        UIManager._uis[4] = UIManager._battle;
    }
    static Dispose() {
        for (let i = 0; i < UIManager._uis.length; i++) {
            UIManager._uis[i].Dispose();
        }
    }
    static OnResize(e) {
        for (let i = 0; i < UIManager._uis.length; i++) {
            UIManager._uis[i].OnResize(e);
        }
    }
}
