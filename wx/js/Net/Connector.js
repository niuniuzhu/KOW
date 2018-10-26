import { WSConnector } from "./WSConnector";
import { ProtoCreator } from "./ProtoHelper";
import { Protos } from "../Libs/protos";
var ConnectorType;
(function (ConnectorType) {
    ConnectorType[ConnectorType["GS"] = 0] = "GS";
    ConnectorType[ConnectorType["BS"] = 1] = "BS";
})(ConnectorType || (ConnectorType = {}));
export class Connector {
    static get gsConnector() { return this._gsConnector; }
    static get bsConnector() { return this._bsConnector; }
    static Init() {
        this._gsConnector = new WSConnector();
        this._bsConnector = new WSConnector();
        this._connectors = new Map();
        this._connectors.set(ConnectorType.GS, this._gsConnector);
        this._connectors.set(ConnectorType.BS, this._bsConnector);
    }
    static AddListener(type, msgID, handler) {
        this._connectors.get(type).AddListener(msgID, handler);
    }
    static RemoveListener(type, msgID, handler) {
        return this._connectors.get(type).RemoveListener(msgID, handler);
    }
    static SendToBS(msgType, message, rpcHandler = null) {
        this._bsConnector.Send(msgType, message, rpcHandler);
    }
    static SendToCS(msgType, message, rpcHandler = null) {
        this._gsConnector.Send(msgType, message, rpcHandler, Protos.MsgOpts.TransTarget.CS);
    }
    static Update(dt) {
        this._connectors.forEach((v, k, map) => {
            v.Update(dt);
        });
        if (this.gsConnector.connected) {
            this.gsConnector.lastPingTime += dt;
            if (this.gsConnector.lastPingTime >= this.PING_INTERVAL) {
                this.gsConnector.Send(Protos.GC2GS_KeepAlive, ProtoCreator.Q_GC2GS_KeepAlive());
                this.gsConnector.lastPingTime = 0;
            }
        }
        if (this.bsConnector.connected) {
            this.bsConnector.lastPingTime += dt;
            if (this.bsConnector.lastPingTime >= this.PING_INTERVAL) {
                this.bsConnector.Send(Protos.GC2BS_KeepAlive, ProtoCreator.Q_GC2BS_KeepAlive());
                this.bsConnector.lastPingTime = 0;
            }
        }
    }
}
Connector.ConnectorType = ConnectorType;
Connector.PING_INTERVAL = 10000;