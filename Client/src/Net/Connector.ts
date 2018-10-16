import { WSConnector } from "./WSConnector";
import { ProtoCreator } from "./ProtoHelper";
import { Protos } from "../libs/protos";

enum ConnectorType {
	GS,
	BS
}

export class Connector {
	public static readonly ConnectorType = ConnectorType;

	private static readonly PING_INTERVAL: number = 10000;

	private static _gsConnector: WSConnector;
	private static _bsConnector: WSConnector;
	private static _connectors: Map<ConnectorType, WSConnector>;

	public static get gsConnector(): WSConnector { return this._gsConnector; }
	public static get bsConnector(): WSConnector { return this._bsConnector; }

	public static Init(): void {
		this._gsConnector = new WSConnector();
		this._bsConnector = new WSConnector();

		this._connectors = new Map<ConnectorType, WSConnector>();
		this._connectors.set(ConnectorType.GS, this._gsConnector);
		this._connectors.set(ConnectorType.BS, this._bsConnector);
	}

	public static AddListener(type: ConnectorType, msgID: number, handler: (message: any) => void): void {
		this._connectors.get(type).AddListener(msgID, handler);
	}

	public static RemoveListener(type: ConnectorType, msgID: number, handler: (message: any) => void): boolean {
		return this._connectors.get(type).RemoveListener(msgID, handler);
	}

	public static Send(type: ConnectorType, msgType: any, message: any, rpcHandler: (any) => any = null): void {
		this._connectors.get(type).Send(msgType, message, rpcHandler);
	}

	public static Update(dt: number): void {
		this._connectors.forEach((v, k, map) => {
			v.Update(dt);
		})
		if (this.gsConnector.connected) {
			this.gsConnector.lastPingTime += dt;
			if (this.gsConnector.lastPingTime >= this.PING_INTERVAL) {
				let keepAlive = ProtoCreator.Q_GC2GS_KeepAlive();
				this.Send(ConnectorType.GS, Protos.GC2GS_KeepAlive, keepAlive);
				this.gsConnector.lastPingTime = 0;
			}
		}
	}
}