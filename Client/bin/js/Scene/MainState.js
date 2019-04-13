define(["require", "exports", "../Global", "../Libs/protos", "../Net/ProtoHelper", "../RC/Crypto/MD5", "../RC/Utils/Base64 ", "../RC/Utils/Hashtable", "../RC/Utils/JsonHelper", "../RC/Utils/Logger", "./SceneManager", "./SceneState"], function (require, exports, Global_1, protos_1, ProtoHelper_1, MD5_1, Base64_1, Hashtable_1, JsonHelper_1, Logger_1, SceneManager_1, SceneState_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class MainState extends SceneState_1.SceneState {
        constructor(type) {
            super(type);
            this.__ui = this._ui = Global_1.Global.uiManager.main;
        }
        OnEnter(param) {
            this._userInfo = param;
            super.OnEnter(param);
            if (Global_1.Global.queryString != null) {
                const args = JsonHelper_1.JsonHelper.Parse(Global_1.Global.queryString);
                const action = Hashtable_1.Hashtable.GetString(args, "action");
                switch (action) {
                    case "invite":
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
            const request = ProtoHelper_1.ProtoCreator.Q_GC2CS_CreateRoom();
            request.numTeam = 2;
            request.numPlayerPerTeam = 1;
            Global_1.Global.connector.SendToCS(protos_1.Protos.GC2CS_CreateRoom, request, message => {
                this._ui.CloseModalWait();
                const resp = message;
                switch (resp.result) {
                    case protos_1.Protos.Global.ECommon.Success:
                        this._ui.ShowInvating();
                        break;
                    case protos_1.Protos.Global.ECommon.Failed:
                        this._ui.OnFail("无法邀请好友", () => { });
                        break;
                }
            });
        }
        TestJoinRoom(roomID) {
            const request = ProtoHelper_1.ProtoCreator.Q_GC2CS_JoinRoom();
            request.roomID = roomID;
            this._ui.ShowModalWait();
            Global_1.Global.connector.SendToCS(protos_1.Protos.GC2CS_JoinRoom, request, message => {
                this._ui.CloseModalWait();
                const resp = message;
                switch (resp.result) {
                    case protos_1.Protos.Global.ECommon.Success:
                        this._ui.Showjoining();
                        break;
                    case protos_1.Protos.Global.ECommon.Failed:
                        this._ui.OnFail("进入房间失败", () => { });
                        break;
                }
            });
        }
        InviteFriend() {
            const request = ProtoHelper_1.ProtoCreator.Q_GC2CS_CreateRoom();
            request.numTeam = 2;
            request.numPlayerPerTeam = 1;
            Global_1.Global.connector.SendToCS(protos_1.Protos.GC2CS_CreateRoom, request, message => {
                this._ui.CloseModalWait();
                const resp = message;
                switch (resp.result) {
                    case protos_1.Protos.Global.ECommon.Success:
                        const base64 = new Base64_1.Base64();
                        const eQuery = `{"roomID"=${resp.roomID},"openID"=${this._userInfo.openID},action=invite}`;
                        const crypto = MD5_1.Md5.hashStr(eQuery);
                        wx.shareAppMessage({
                            title: `你的好友${this._userInfo.nickname}邀请你参与小游戏<角斗之王>的对战`,
                            imageUrl: "https://www.kow2019.com/g/res/basicprofile.png",
                            query: `q=${base64.encode(eQuery)}&s=${crypto}`,
                            imageUrlId: null
                        });
                        this._ui.ShowInvating();
                        break;
                    case protos_1.Protos.Global.ECommon.Failed:
                        this._ui.OnFail("无法邀请好友", () => { });
                        break;
                }
            });
        }
        BeginMatch(mode) {
            const request = ProtoHelper_1.ProtoCreator.Q_GC2CS_BeginMatch();
            request.mode = mode;
            request.actorID = 0;
            Global_1.Global.connector.SendToCS(protos_1.Protos.GC2CS_BeginMatch, request, message => {
                this._ui.SetMatchBtnEnable(true);
                const resp = message;
                switch (resp.result) {
                    case protos_1.Protos.CS2GC_BeginMatchRet.EResult.Success:
                        Global_1.Global.sceneManager.ChangeState(SceneManager_1.SceneManager.State.Matching);
                        Logger_1.Logger.Log("begin match");
                        break;
                    case protos_1.Protos.CS2GC_BeginMatchRet.EResult.Failed:
                        this._ui.OnFail("匹配失败", () => { });
                        break;
                    case protos_1.Protos.CS2GC_BeginMatchRet.EResult.UserInBattle:
                        this._ui.OnFail("玩家已在战场中", () => { });
                        break;
                }
            });
        }
        ProcessInvite(args) {
            const roomID = Hashtable_1.Hashtable.GetNumber(args, "roomID");
            const request = ProtoHelper_1.ProtoCreator.Q_GC2CS_JoinRoom();
            request.roomID = roomID;
            this._ui.ShowModalWait();
            Global_1.Global.connector.SendToCS(protos_1.Protos.GC2CS_JoinRoom, request, message => {
                this._ui.CloseModalWait();
                const resp = message;
                switch (resp.result) {
                    case protos_1.Protos.Global.ECommon.Success:
                        this._ui.Showjoining();
                        break;
                    case protos_1.Protos.Global.ECommon.Failed:
                        this._ui.OnFail("进入房间失败", () => { });
                        break;
                }
            });
        }
    }
    exports.MainState = MainState;
});
//# sourceMappingURL=MainState.js.map