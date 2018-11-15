import { ByteUtils } from "./ByteUtils";
import { MsgCenter } from "./MsgCenter";
import { Protos } from "../Libs/protos";
import { ProtoCreator } from "./ProtoHelper";
import { Logger } from "../RC/Utils/Logger";
import * as Long from "../Libs/long";

export class WSConnector {
	public get connected(): boolean { return this._socket != null && this._socket.readyState == WebSocket.OPEN };

	public set onclose(handler: (ev: CloseEvent) => any) {
		this._onclose = handler;
		if (this._socket != null)
			this._socket.onclose = this._onclose;
	}

	public set onerror(handler: (ev: Event) => any) {
		this._onerror = handler;
		if (this._socket != null)
			this._socket.onerror = this._onerror;
	}

	public set onopen(handler: (ev: Event) => any) {
		this._onopen = handler;
		if (this._socket != null)
			this._socket.onopen = this._onopen;
	}

	private _onclose: ((ev: CloseEvent) => any) | null;
	private _onerror: ((ev: Event) => any) | null;
	private _onopen: ((ev: Event) => any) | null;

	private _socket: WebSocket;
	private readonly _msgCenter: MsgCenter;
	private readonly _rpcHandlers: Map<number, (any) => any>;//可能是异步写入,但必定是同步读取,所以不用加锁
	private _pid: number = 0;
	private _time: number = 0;

	public get time(): number { return this._time; }
	public lastPingTime: number = 0;

	constructor() {
		this._msgCenter = new MsgCenter();
		this._rpcHandlers = new Map<number, (any) => any>();
	}

	public Close(): void {
		this._pid = 0;
		this._socket.close();
	}

	public Connect(ip: string, port: number): void {
		if (this.connected)
			this.Close();
		this._socket = new WebSocket(`ws://${ip}:${port}`);
		this._socket.binaryType = "arraybuffer";
		this._socket.onmessage = this.OnReceived.bind(this);
		this._socket.onerror = this._onerror;
		this._socket.onclose = this._onclose;
		this._socket.onopen = (e) => {
			this._time = 0;
			this._onopen(e)
		};
	}

	public Send(msgType: any, message: any, rpcHandler: (any) => any = null,
		transTarget: Protos.MsgOpts.TransTarget = Protos.MsgOpts.TransTarget.Undefine,
		nsid: Long = Long.ZERO): void {
		let opts = ProtoCreator.GetMsgOpts(message);
		if (opts == null) {
			Logger.Error("invalid message options");
		}

		if (transTarget != Protos.MsgOpts.TransTarget.Undefine) {
			opts.flag |= 1 << 3; //mark as transpose
			opts.flag |= 1 << (3 + transTarget); //mark trans target
		}
		if (nsid.greaterThan(0))
			opts.transid = nsid;
		if ((opts.flag & (1 << Protos.MsgOpts.Flag.RPC)) > 0) //如果是rpc消息,记下消息序号等待回调
		{
			//只有rpc才写入序号
			if (nsid.eq(0))
				opts.pid = this._pid++;

			if (rpcHandler != null) {
				if (this._rpcHandlers.has(opts.pid))
					Logger.Warn("packet id collision!!");
				this._rpcHandlers.set(opts.pid, rpcHandler);
			}
		}
		let msgData: Uint8Array = msgType.encode(message).finish();
		let data = new Uint8Array(msgData.length + 4);
		ByteUtils.Encode32u(data, 0, <number>ProtoCreator.GetMsgID(message));
		data.set(msgData, 4);
		this._socket.send(data);
	}

	public AddListener(msgID: number, handler: (message: any) => void): void {
		this._msgCenter.Register(msgID, handler);
	}

	public RemoveListener(msgID: number, handler: (message: any) => void): boolean {
		return this._msgCenter.Unregister(msgID, handler);
	}

	private OnReceived(ev: MessageEvent): void {
		let data: Uint8Array = new Uint8Array(ev.data);
		//剥离消息ID
		let msgID: Protos.MsgID = <Protos.MsgID>ByteUtils.Decode32u(data, 0);
		data.copyWithin(0, 4);

		//解码消息
		let message = ProtoCreator.DecodeMsg(msgID, data, data.length - 4);
		//检查第一个字段是否Protos.Packet类型
		let opts = ProtoCreator.GetMsgOpts(message);
		if (opts == null) {
			Logger.Error("invalid msg options");
		}
		//是否rpc消息
		if ((opts.flag & (1 << Protos.MsgOpts.Flag.RESP)) > 0) {
			let rcpHandler = this._rpcHandlers.get(opts.rpid);
			if (rcpHandler == null) {
				Logger.Error("RPC handler not found with message:" + msgID);
			}
			this._rpcHandlers.delete(opts.rpid);
			rcpHandler(message);//调用回调函数
		} else {
			let handler = this._msgCenter.GetHandler(msgID);
			if (handler != null)
				handler(message);
			else
				Logger.Warn(`invalid msg:${msgID}`);
		}
	}

	public Update(dt: number): void {
		if (!this.connected)
			return;
		this._time += dt;
	}
}