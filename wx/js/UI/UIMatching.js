import { Global } from "../Global";
import { Protos } from "../Libs/protos";
import { ProtoCreator } from "../Net/ProtoHelper";
import { UIAlert } from "./UIAlert";
export class UIMatching {
    constructor() {
        this._tLists = [];
        fairygui.UIPackage.addPackage("res/ui/matching");
        this._root = fairygui.UIPackage.createObject("matching", "Main").asCom;
        this._root.setSize(Global.graphic.uiRoot.width, Global.graphic.uiRoot.height);
        this._root.addRelation(Global.graphic.uiRoot, fairygui.RelationType.Size);
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
        Global.graphic.uiRoot.addChild(this._root);
    }
    Exit() {
        this.ClearPlayerInfos();
        Global.graphic.uiRoot.removeChild(this._root);
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
        const request = ProtoCreator.Q_GC2CS_CancelMatch();
        Global.connector.SendToCS(Protos.GC2CS_CancelMatch, request);
    }
    OnEnterBattleResult(result, onConfirm) {
        switch (result) {
            case Protos.CS2GC_EnterBattle.Result.Success:
                break;
            case Protos.CS2GC_EnterBattle.Result.BSLost:
            case Protos.CS2GC_EnterBattle.Result.BSNotFound:
            case Protos.CS2GC_EnterBattle.Result.BattleCreateFailed:
                UIAlert.Show("登录战场失败", onConfirm);
                break;
        }
    }
    OnFail(message, callback = null) {
        UIAlert.Show(message, callback);
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
