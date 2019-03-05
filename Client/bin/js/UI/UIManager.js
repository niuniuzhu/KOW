define(["require", "exports", "./UIBattle", "./UILoading", "./UILogin", "./UIMain", "./UIMatching"], function (require, exports, UIBattle_1, UILoading_1, UILogin_1, UIMain_1, UIMatching_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class UIManager {
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
            this._main = new UIMain_1.UIMain();
            this._login = new UILogin_1.UILogin();
            this._matching = new UIMatching_1.UIMatching();
            this._loading = new UILoading_1.UILoading();
            this._battle = new UIBattle_1.UIBattle();
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
    exports.UIManager = UIManager;
});
//# sourceMappingURL=UIManager.js.map