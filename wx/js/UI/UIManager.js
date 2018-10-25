import { UILogin } from "./UILogin";
import { UIMain } from "./UIMain";
import { UIMatching } from "./UIMatching";
export class UIManager {
    static get login() { return UIManager._login; }
    static get main() { return UIManager._main; }
    static get matching() { return UIManager._matching; }
    static Init() {
        Laya.stage.addChild(fairygui.GRoot.inst.displayObject);
        fairygui.UIPackage.addPackage("res/ui/global");
        fairygui.UIConfig.globalModalWaiting = fairygui.UIPackage.getItemURL("global", "modelWait");
        fairygui.UIConfig.windowModalWaiting = fairygui.UIPackage.getItemURL("global", "modelWait");
        fairygui.UIConfig.buttonSound = fairygui.UIPackage.getItemURL("global", "click");
        UIManager._main = new UIMain();
        UIManager._login = new UILogin();
        UIManager._matching = new UIMatching();
        UIManager._uis = [];
        UIManager._uis[0] = UIManager._main;
        UIManager._uis[1] = UIManager._login;
        UIManager._uis[2] = UIManager._matching;
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
