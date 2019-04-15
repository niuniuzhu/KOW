import { Global } from "../Global";
import { Protos } from "../Libs/protos";
import { ProtoCreator } from "../Net/ProtoHelper";
import { Md5 } from "../RC/Crypto/MD5";
import { Base64 } from "../RC/Utils/Base64 ";
import { Hashtable } from "../RC/Utils/Hashtable";
import { JsonHelper } from "../RC/Utils/JsonHelper";
import { Logger } from "../RC/Utils/Logger";
import { SceneManager } from "./SceneManager";
import { SceneState } from "./SceneState";
export class MainState extends SceneState {
    constructor(type) {
        super(type);
        this.__ui = this._ui = Global.uiManager.main;
    }
    OnEnter(param) {
        this._userInfo = param;
        super.OnEnter(param);
        if (Global.queryString != null) {
            const args = JsonHelper.Parse(Global.queryString);
            const action = Hashtable.GetString(args, "action");
            switch (action) {
                case "invite":
                    Global.queryString = null;
                    this.ProcessInvite(args);
                    break;
            }
        }
    }
    OnExit() {
        this._userInfo = null;
        super.OnExit();
    }
    UpdateRank(delta) {
        this._ui.UpdateRank(delta);
    }
    TestCreateRoom() {
        const request = ProtoCreator.Q_GC2CS_CreateRoom();
        request.numTeam = 2;
        request.numPlayerPerTeam = 1;
        Global.connector.SendToCS(Protos.GC2CS_CreateRoom, request, message => {
            this._ui.CloseModalWait();
            const resp = message;
            switch (resp.result) {
                case Protos.Global.ECommon.Success:
                    this._ui.ShowInvating();
                    break;
                case Protos.Global.ECommon.Failed:
                    this._ui.OnFail("无法邀请好友", () => { });
                    break;
            }
        });
    }
    TestJoinRoom(roomID) {
        const request = ProtoCreator.Q_GC2CS_JoinRoom();
        request.roomID = roomID;
        this._ui.ShowModalWait();
        Global.connector.SendToCS(Protos.GC2CS_JoinRoom, request, message => {
            this._ui.CloseModalWait();
            const resp = message;
            switch (resp.result) {
                case Protos.Global.ECommon.Success:
                    this._ui.Showjoining();
                    break;
                case Protos.Global.ECommon.Failed:
                    this._ui.OnFail("进入房间失败", () => { });
                    break;
            }
        });
    }
    InviteFriend() {
        const request = ProtoCreator.Q_GC2CS_CreateRoom();
        request.numTeam = 2;
        request.numPlayerPerTeam = 1;
        Global.connector.SendToCS(Protos.GC2CS_CreateRoom, request, message => {
            this._ui.CloseModalWait();
            const resp = message;
            switch (resp.result) {
                case Protos.Global.ECommon.Success:
                    const base64 = new Base64();
                    const eQuery = `{"roomID":${resp.roomID},"openID":"${this._userInfo.openID}","action":"invite"}`;
                    const crypto = Md5.hashStr(eQuery);
                    wx.shareAppMessage({
                        title: `你的好友${this._userInfo.nickname}邀请你参与小游戏<角斗之王>的对战`,
                        imageUrl: "https://www.kow2019.com/g/res/basicprofile.png",
                        query: `q=${base64.encode(eQuery)}&s=${crypto}`,
                        imageUrlId: null
                    });
                    this._ui.ShowInvating();
                    break;
                case Protos.Global.ECommon.Failed:
                    this._ui.OnFail("无法邀请好友", () => { });
                    break;
            }
        });
    }
    BeginMatch(mode) {
        const request = ProtoCreator.Q_GC2CS_BeginMatch();
        request.mode = mode;
        request.actorID = 0;
        Global.connector.SendToCS(Protos.GC2CS_BeginMatch, request, message => {
            this._ui.SetMatchBtnEnable(true);
            const resp = message;
            switch (resp.result) {
                case Protos.CS2GC_BeginMatchRet.EResult.Success:
                    Global.sceneManager.ChangeState(SceneManager.State.Matching);
                    Logger.Log("begin match");
                    break;
                case Protos.CS2GC_BeginMatchRet.EResult.Failed:
                    this._ui.OnFail("匹配失败", () => { });
                    break;
                case Protos.CS2GC_BeginMatchRet.EResult.UserInBattle:
                    this._ui.OnFail("玩家已在战场中", () => { });
                    break;
            }
        });
    }
    ProcessInvite(args) {
        const roomID = Hashtable.GetNumber(args, "roomID");
        const request = ProtoCreator.Q_GC2CS_JoinRoom();
        request.roomID = roomID;
        this._ui.ShowModalWait();
        Global.connector.SendToCS(Protos.GC2CS_JoinRoom, request, message => {
            this._ui.CloseModalWait();
            const resp = message;
            switch (resp.result) {
                case Protos.Global.ECommon.Success:
                    this._ui.Showjoining();
                    break;
                case Protos.Global.ECommon.Failed:
                    this._ui.OnFail("进入房间失败", () => { });
                    break;
            }
        });
    }
}
