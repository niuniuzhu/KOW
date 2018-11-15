import { Protos } from "../Libs/protos";
import { UIAlert } from "./UIAlert";
import { Global } from "../Global";
export class UILoading {
    get root() { return this._root; }
    constructor() {
        fairygui.UIPackage.addPackage("res/ui/loading");
        this._root = fairygui.UIPackage.createObject("loading", "Main").asCom;
        this._root.setSize(Global.graphic.uiRoot.width, Global.graphic.uiRoot.height);
        this._root.addRelation(Global.graphic.uiRoot, fairygui.RelationType.Size);
        this._progressBar = this._root.getChild("n0").asProgress;
        this._progressBar.max = 100;
        this._progressBar.value = 10;
    }
    Dispose() {
        this._root.dispose();
    }
    Enter(param) {
        Global.graphic.uiRoot.addChild(this._root);
    }
    Exit() {
        Global.graphic.uiRoot.removeChild(this._root);
    }
    Update(dt) {
    }
    OnResize(e) {
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
    OnConnectToBSError(e, onConfirm) {
        UIAlert.Show("无法连接服务器[" + e.toString() + "]", onConfirm);
    }
    OnLoginBSResut(result, onConfirm) {
        switch (result) {
            case Protos.Global.ECommon.Success:
                break;
            default:
                UIAlert.Show("无法进入战场", onConfirm);
                break;
        }
    }
    OnLoadProgress(p) {
        this._progressBar.value = 10 + p * 90;
    }
}
