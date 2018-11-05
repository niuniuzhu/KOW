import { WSConnector } from "./WSConnector";
import { ProtoCreator } from "./ProtoHelper";
import { Protos } from "../Libs/protos";

enum ConnectorType {
	GS,
	BS
}

export class Connector {
	public static readonly ConnectorType = ConnectorType;

	private static readonly PING_INTERVAL: number = 10000;

	private _gsConnector: WSConnector;
	private _bsConnector: WSConnector;
	private _connectors: Map<ConnectorType, WSConnector>;

	public get gsConnector(): WSConnector { return this._gsConnector; }
	public get bsConnector(): WSConnector { return this._bsConnector; }

	public Init(): void {
		this._gsConnector = new WSConnector();
		this._bsConnector = new WSConnector();

		this._connectors = new Map<ConnectorType, WSConnector>();
		this._connectors.set(ConnectorType.GS, this._gsConnector);
		this._connectors.set(ConnectorType.BS, this._bsConnector);
	}

	public AddListener(type: ConnectorType, msgID: number, handler: (message: any) => void): void {
		this._connectors.get(type).AddListener(msgID, handler);
	}

	public RemoveListener(type: ConnectorType, msgID: number, handler: (message: any) => void): boolean {
		return this._connectors.get(type).RemoveListener(msgID, handler);
	}

	public SendToBS(msgType: any, message: any, rpcHandler: (any) => any = null): void {
		this._bsConnector.Send(msgType, message, rpcHandler);
	}

	public SendToCS(msgType: any, message: any, rpcHandler: (any) => any = null): void {
		this._gsConnector.Send(msgType, message, rpcHandler, Protos.MsgOpts.TransTarget.CS);
	}

	public Update(dt: number): void {
		this._connectors.forEach((v, k, map) => {
			v.Update(dt);
		})
		if (this.gsConnector.connected) {
			this.gsConnector.lastPingTime += dt;
			if (this.gsConnector.lastPingTime >= Connector.PING_INTERVAL) {
				this.gsConnector.Send(Protos.GC2GS_KeepAlive, ProtoCreator.Q_GC2GS_KeepAlive());
				this.gsConnector.lastPingTime = 0;
			}
		}
		if (this.bsConnector.connected) {
			this.bsConnector.lastPingTime += dt;
			if (this.bsConnector.lastPingTime >= Connector.PING_INTERVAL) {
				this.bsConnector.Send(Protos.GC2BS_KeepAlive, ProtoCreator.Q_GC2BS_KeepAlive());
				this.bsConnector.lastPingTime = 0;
			}
		}
	}
}