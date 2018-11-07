define(["require", "exports", "../Net/WSConnector", "../Net/ProtoHelper", "../RC/Utils/Logger", "../Libs/protos", "../RC/Utils/GUID", "../Net/Connector", "../RC/Math/MathUtils"], function (require, exports, WSConnector_1, ProtoHelper_1, Logger_1, protos_1, GUID_1, Connector_1, MathUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ConnectionTest {
        constructor() {
            this._connector = new Connector_1.Connector();
            this._closeTime = 0;
            this._time = 0;
            ProtoHelper_1.ProtoCreator.Init();
            this._connector.Init();
            this._connector.AddListener(Connector_1.Connector.ConnectorType.GS, protos_1.Protos.MsgID.eCS2GC_EnterBattle, this.OnEnterBattle.bind(this));
            this._closeTime = MathUtils_1.MathUtils.Random(1000, 3000);
            const name = GUID_1.GUID.create().toString();
            this.Login(name, 0, 0);
        }
        Update(dt) {
            this._time += dt;
            this._connector.Update(dt);
        }
        ConnectToLS(connector) {
            connector.Connect("localhost", 49996);
        }
        Login(uname, platform, sdk) {
            const login = ProtoHelper_1.ProtoCreator.Q_GC2LS_AskSmartLogin();
            login.name = uname;
            login.platform = platform;
            login.sdk = sdk;
            const connector = new WSConnector_1.WSConnector();
            connector.onerror = (e) => Logger_1.Logger.Error(e);
            connector.onclose = () => Logger_1.Logger.Log("connection closed.");
            connector.onopen = () => {
                connector.Send(protos_1.Protos.GC2LS_AskSmartLogin, login, message => {
                    const resp = message;
                    switch (resp.result) {
                        case protos_1.Protos.LS2GC_AskLoginRet.EResult.Success:
                            this.HandleLoginLSSuccess(resp);
                            break;
                        default:
                            Logger_1.Logger.Warn("failed:" + resp.result);
                            break;
                    }
                });
            };
            this.ConnectToLS(connector);
        }
        HandleLoginLSSuccess(loginResult) {
            Logger_1.Logger.Log("gcNID:" + loginResult.sessionID + "login success");
            let gsInfo = loginResult.gsInfos[0];
            this.LoginGS(gsInfo.ip, gsInfo.port, gsInfo.password, loginResult.sessionID);
        }
        LoginGS(ip, port, pwd, gcNID) {
            const connector = this._connector.gsConnector;
            connector.onerror = (e) => Logger_1.Logger.Error(e);
            connector.onopen = () => {
                Logger_1.Logger.Log("GS Connected");
                const askLogin = ProtoHelper_1.ProtoCreator.Q_GC2GS_AskLogin();
                askLogin.pwd = pwd;
                askLogin.sessionID = gcNID;
                connector.Send(protos_1.Protos.GC2GS_AskLogin, askLogin, message => {
                    const resp = message;
                    switch (resp.result) {
                        case protos_1.Protos.GS2GC_LoginRet.EResult.Success:
                            if (resp.gcState == protos_1.Protos.GS2GC_LoginRet.EGCCState.Battle) {
                                this.ConnectToBS(resp.gcNID, resp.bsIP, resp.bsPort);
                            }
                            else {
                                this.BeginMatch();
                            }
                            break;
                        default:
                            Logger_1.Logger.Warn("failed:" + resp.result);
                            break;
                    }
                });
            };
            connector.Connect("localhost", port);
        }
        BeginMatch() {
            const beginMatch = ProtoHelper_1.ProtoCreator.Q_GC2CS_BeginMatch();
            beginMatch.actorID = 0;
            this._connector.SendToCS(protos_1.Protos.GC2CS_BeginMatch, beginMatch, message => {
                const resp = message;
                switch (resp.result) {
                    case protos_1.Protos.CS2GC_BeginMatchRet.EResult.Success:
                        Logger_1.Logger.Log("begin match");
                        break;
                    default:
                        Logger_1.Logger.Warn("failed:" + resp.result);
                        break;
                }
            });
        }
        OnEnterBattle(message) {
            const enterBattle = message;
            if (enterBattle.result != protos_1.Protos.CS2GC_EnterBattle.Result.Success) {
                Logger_1.Logger.Error(enterBattle.result);
            }
            else {
                this.ConnectToBS(enterBattle.gcNID, enterBattle.ip, enterBattle.port);
            }
        }
        ConnectToBS(gcNID, ip, port) {
            const connector = this._connector.bsConnector;
            connector.onerror = (e) => Logger_1.Logger.Error(e);
            connector.onopen = () => {
                Logger_1.Logger.Log("BS Connected");
                const askLogin = ProtoHelper_1.ProtoCreator.Q_GC2BS_AskLogin();
                askLogin.sessionID = gcNID;
                connector.Send(protos_1.Protos.GC2BS_AskLogin, askLogin, message => {
                    const resp = message;
                    switch (resp.result) {
                        case protos_1.Protos.Global.ECommon.Success:
                            break;
                        default:
                            Logger_1.Logger.Warn("failed:" + resp.result);
                            break;
                    }
                });
            };
            connector.Connect("localhost", port);
        }
    }
    exports.ConnectionTest = ConnectionTest;
});
//# sourceMappingURL=ConnectionTest.js.map