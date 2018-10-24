import { Protos } from "../libs/protos";
import { UIAlert } from "./UIAlert";
import { SceneManager } from "../Scene/SceneManager";
export class UIMatching {
    get root() { return this._root; }
    constructor() {
        fairygui.UIPackage.addPackage("res/ui/matching");
        this._root = fairygui.UIPackage.createObject("matching", "Main").asCom;
    }
    Dispose() {
    }
    Enter(param) {
        fairygui.GRoot.inst.addChild(this._root);
    }
    Exit() {
        fairygui.GRoot.inst.removeChild(this._root);
    }
    Update(dt) {
    }
    OnResize(e) {
    }
    OnConnectToBSError() {
        UIAlert.Show("无法连接服务器", () => SceneManager.ChangeState(SceneManager.State.Matching, null, true));
    }
    OnBeginMatchResult(result) {
        let error = "";
        switch (result) {
            case Protos.CS2GC_BeginMatchRet.EResult.Success:
                break;
            case Protos.CS2GC_BeginMatchRet.EResult.IllegalID:
                error = "无效网络ID";
                break;
            case Protos.CS2GC_BeginMatchRet.EResult.NoRoom:
                error = "匹配失败";
                break;
            case Protos.CS2GC_BeginMatchRet.EResult.UserInBattle:
                error = "玩家已在战场中";
                break;
            case Protos.CS2GC_BeginMatchRet.EResult.UserInRoom:
                error = "玩家已在匹配中";
                break;
            case Protos.CS2GC_BeginMatchRet.EResult.Failed:
                error = "匹配失败";
                break;
        }
        if (error != "") {
            UIAlert.Show(error, () => SceneManager.ChangeState(SceneManager.State.Matching, null, true));
        }
    }
    OnEnterBattleResult(result) {
        switch (result) {
            case Protos.CS2GC_EnterBattle.Error.Success:
                break;
            case Protos.CS2GC_EnterBattle.Error.BSLost:
            case Protos.CS2GC_EnterBattle.Error.BSNotFound:
                UIAlert.Show("登录战场失败", () => SceneManager.ChangeState(SceneManager.State.Matching, null, true));
                break;
        }
    }
    OnLoginBSResut(result) {
        switch (result) {
            case Protos.BS2GC_LoginRet.EResult.Success:
                break;
            default:
                UIAlert.Show("进入战场失败", () => SceneManager.ChangeState(SceneManager.State.Matching, null, true));
                break;
        }
    }
    UpdateRoomInfo(roomInfo) {
    }
    UpdatePlayers(_players) {
    }
}
//# sourceMappingURL=UIMatching.js.map