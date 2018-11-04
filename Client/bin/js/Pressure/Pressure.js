define(["require", "exports", "../Net/WSConnector", "../Net/ProtoHelper", "../RC/Utils/Logger", "../Libs/protos", "../Net/Connector", "../RC/Utils/GUID"], function (require, exports, WSConnector_1, ProtoHelper_1, Logger_1, protos_1, Connector_1, GUID_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Pressure {
        constructor() {
            ProtoHelper_1.ProtoCreator.Init();
            Connector_1.Connector.Init();
            Connector_1.Connector.AddListener(Connector_1.Connector.ConnectorType.GS, protos_1.Protos.MsgID.eCS2GC_EnterBattle, this.OnEnterBattle.bind(this));
            const name = GUID_1.GUID.Generate().ToString(GUID_1.GuidFormat.DASHES);
            this.Login(name, 0, 0);
            setInterval(() => { this.Update(); }, Pressure.UPDATE_INTERVAL);
        }
        Update() {
            Connector_1.Connector.Update(Pressure.UPDATE_INTERVAL);
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
            const connector = Connector_1.Connector.gsConnector;
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
            Connector_1.Connector.SendToCS(protos_1.Protos.GC2CS_BeginMatch, beginMatch, message => {
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
            if (enterBattle.error != protos_1.Protos.CS2GC_EnterBattle.Error.Success) {
                Logger_1.Logger.Error(enterBattle.error);
            }
            else {
                this.ConnectToBS(enterBattle.gcNID, enterBattle.ip, enterBattle.port);
            }
        }
        ConnectToBS(gcNID, ip, port) {
            const connector = Connector_1.Connector.bsConnector;
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
    Pressure.UPDATE_INTERVAL = 20;
    exports.Pressure = Pressure;
});
//# sourceMappingURL=Pressure.js.map