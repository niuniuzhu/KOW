define(["require", "exports", "../Global", "../Libs/protos", "../Net/ProtoHelper", "./UIAlert"], function (require, exports, Global_1, protos_1, ProtoHelper_1, UIAlert_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class UIMatching {
        constructor() {
            this._tLists = [];
            fairygui.UIPackage.addPackage("res/ui/matching");
            this._root = fairygui.UIPackage.createObject("matching", "Main").asCom;
            this._root.setSize(Global_1.Global.graphic.uiRoot.width, Global_1.Global.graphic.uiRoot.height);
            this._root.addRelation(Global_1.Global.graphic.uiRoot, fairygui.RelationType.Size);
            this._tLists.push(this._root.getChild("t0").asList);
            this._tLists.push(this._root.getChild("t1").asList);
            this._tLists.push(this._root.getChild("t2").asList);
            this._tLists.push(this._root.getChild("t3").asList);
            this._cancelBtn = this._root.getChild("cancel_btn").asButton;
            this._cancelBtn.onClick(this, this.OnCancelBtnClick);
        }
        get root() { return this._root; }
        Dispose() {
        }
        Enter(param) {
            this.SetCancelBtnEnable(true);
            Global_1.Global.graphic.uiRoot.addChild(this._root);
        }
        Exit() {
            this.ClearPlayerInfos();
            Global_1.Global.graphic.uiRoot.removeChild(this._root);
        }
        Update(dt) {
        }
        OnResize(e) {
        }
        SetCancelBtnEnable(value) {
            this._cancelBtn.enabled = value;
        }
        ClearPlayerInfos() {
            for (const list of this._tLists) {
                list.removeChildrenToPool();
            }
        }
        OnCancelBtnClick() {
            this.SetCancelBtnEnable(false);
            const request = ProtoHelper_1.ProtoCreator.Q_GC2CS_CancelMatch();
            Global_1.Global.connector.SendToCS(protos_1.Protos.GC2CS_CancelMatch, request);
        }
        OnEnterBattleResult(result, onConfirm) {
            switch (result) {
                case protos_1.Protos.CS2GC_EnterBattle.Result.Success:
                    break;
                case protos_1.Protos.CS2GC_EnterBattle.Result.BSLost:
                case protos_1.Protos.CS2GC_EnterBattle.Result.BSNotFound:
                case protos_1.Protos.CS2GC_EnterBattle.Result.BattleCreateFailed:
                    UIAlert_1.UIAlert.Show("登录战场失败", onConfirm);
                    break;
            }
        }
        OnFail(message, callback = null) {
            UIAlert_1.UIAlert.Show(message, callback);
        }
        UpdatePlayerInfos(playerInfos) {
            this.ClearPlayerInfos();
            const count = playerInfos.length;
            for (let i = 0; i < count; ++i) {
                const playerInfo = playerInfos[i];
                if (!playerInfo.vaild)
                    continue;
                const list = this._tLists[playerInfo.team];
                const item = list.addItem().asCom;
                item.getChild("image").asCom.getChild("loader").asCom.getChild("icon").asLoader.url = playerInfo.avatar;
                item.getChild("nickname").asTextField.text = playerInfo.nickname;
            }
        }
    }
    exports.UIMatching = UIMatching;
});
//# sourceMappingURL=UIMatching.js.map