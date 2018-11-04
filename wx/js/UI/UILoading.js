import { Protos } from "../Libs/protos";
import { UIAlert } from "./UIAlert";
import { Graphic } from "../Graphic";
export class UILoading {
    get root() { return this._root; }
    constructor() {
        fairygui.UIPackage.addPackage("res/ui/loading");
        this._root = fairygui.UIPackage.createObject("loading", "Main").asCom;
        this._root.setSize(Graphic.uiRoot.width, Graphic.uiRoot.height);
        this._root.addRelation(Graphic.uiRoot, fairygui.RelationType.Size);
        this._progressBar = this._root.getChild("n0").asProgress;
        this._progressBar.max = 100;
        this._progressBar.value = 10;
    }
    Dispose() {
        this._root.dispose();
    }
    Enter(param) {
        Graphic.uiRoot.addChild(this._root);
    }
    Exit() {
        Graphic.uiRoot.removeChild(this._root);
    }
    Update(dt) {
    }
    OnResize(e) {
    }
    OnEnterBattleResult(result, onConfirm) {
        switch (result) {
            case Protos.CS2GC_EnterBattle.Error.Success:
                break;
            case Protos.CS2GC_EnterBattle.Error.BSLost:
            case Protos.CS2GC_EnterBattle.Error.BSNotFound:
            case Protos.CS2GC_EnterBattle.Error.BattleCreateFailed:
                UIAlert.Show("登录战场失败", onConfirm);
                break;
        }
    }
    OnConnectToBSError(e, onConfirm) {
        UIAlert.Show("无法连接服务器[" + e.toString() + "]", onConfirm);
    }
    OnLoginBSResut(result, onConfirm) {
        switch (result) {
            case Protos.Global.ECommon.Success:
                break;
            default:
                UIAlert.Show("进入战场失败", onConfirm);
                break;
        }
    }
    OnLoadProgress(p) {
        this._progressBar.value = 10 + p * 90;
    }
}
