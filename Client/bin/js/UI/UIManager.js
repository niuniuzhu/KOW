define(["require", "exports", "./UILogin", "./UIMain", "./UIMatching", "./UIBattle"], function (require, exports, UILogin_1, UIMain_1, UIMatching_1, UIBattle_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class UIManager {
        static get login() { return UIManager._login; }
        static get main() { return UIManager._main; }
        static get matching() { return UIManager._matching; }
        static get battle() { return UIManager._battle; }
        static Init() {
            fairygui.UIPackage.addPackage("res/ui/global");
            fairygui.UIConfig.globalModalWaiting = fairygui.UIPackage.getItemURL("global", "modelWait");
            fairygui.UIConfig.windowModalWaiting = fairygui.UIPackage.getItemURL("global", "modelWait");
            fairygui.UIConfig.buttonSound = fairygui.UIPackage.getItemURL("global", "click");
            UIManager._main = new UIMain_1.UIMain();
            UIManager._login = new UILogin_1.UILogin();
            UIManager._matching = new UIMatching_1.UIMatching();
            UIManager._battle = new UIBattle_1.UIBattle();
            UIManager._uis = [];
            UIManager._uis[0] = UIManager._main;
            UIManager._uis[1] = UIManager._login;
            UIManager._uis[2] = UIManager._matching;
            UIManager._uis[3] = UIManager._battle;
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
    exports.UIManager = UIManager;
});
//# sourceMappingURL=UIManager.js.map