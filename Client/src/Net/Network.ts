import { WSConnector } from "./WSConnector";
import { UIEvent } from "../Events/UIEvent";
import { ProtoCreator } from "./ProtoHelper";
import { Protos } from "../libs/protos";

export class Network {
	private static readonly PING_INTERVAL: number = 10000;
	private static _init;
	private static _connector: WSConnector;
	private static _time: number;

	public static Init(connector: WSConnector): void {
		Network._init = true;
		Network._time = 0;
		Network._connector = connector;
		Network._connector.onerror = Network.HandleDisconnect;
		Network._connector.onclose = Network.HandleDisconnect;
	}

	private static HandleDisconnect(): void {
		this._init = false;
		Network._time = 0;
		UIEvent.NetworkDisconnect();
	}

	public static Send(type: any, message: any, rpcHandler: (any) => any = null): void {
		Network._connector.Send(type, message, rpcHandler);
	}

	public static Update(dt: number): void {
		if (!Network._init)
			return;
		Network._time += dt;
		if (Network._time >= Network.PING_INTERVAL) {
			let keepAlive = ProtoCreator.Q_GC2GS_KeepAlive();
			Network.Send(Protos.GC2GS_KeepAlive, keepAlive);
		}
	}
}