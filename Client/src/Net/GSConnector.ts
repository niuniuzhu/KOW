import { WSConnector } from "./WSConnector";
import { ProtoCreator } from "./ProtoHelper";
import { Protos } from "../libs/protos";

export class GSConnector {
	private static readonly PING_INTERVAL: number = 10000;
	private static _connector: WSConnector;
	private static _connected;
	private static _time: number;

	public static get connector(): WSConnector { return GSConnector._connector; }

	public static disconnectHandler: (ev: Event) => any;

	public static Init(): void {
		GSConnector._connector = new WSConnector();
		GSConnector._connector.onclose = GSConnector.HandleDisconnect;
	}

	public static OnConnected(): void {
		GSConnector._connected = true;
		GSConnector._time = 0;
	}

	public static AddListener(msgID: number, handler: (message: any) => void): void {
		GSConnector._connector.AddListener(msgID, handler);
	}

	public static RemoveListener(msgID: number, handler: (message: any) => void): boolean {
		return GSConnector._connector.RemoveListener(msgID, handler);
	}

	public static Send(type: any, message: any, rpcHandler: (any) => any = null): void {
		GSConnector._connector.Send(type, message, rpcHandler);
	}

	public static Update(dt: number): void {
		if (!GSConnector._connected)
			return;
		GSConnector._time += dt;
		if (GSConnector._time >= GSConnector.PING_INTERVAL) {
			let keepAlive = ProtoCreator.Q_GC2GS_KeepAlive();
			GSConnector.Send(Protos.GC2GS_KeepAlive, keepAlive);
			GSConnector._time = 0;
		}
	}

	private static HandleDisconnect(e: Event): void {
		RC.Logger.Log("connection closed.");
		GSConnector._connected = false;
		GSConnector._time = 0;
		GSConnector.disconnectHandler(e);
	}
}