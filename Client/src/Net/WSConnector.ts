import { ByteUtils } from "./ByteUtils";
import { MsgCenter } from "./MsgCenter";
import { Protos } from "../libs/protos";
import { ProtoCreator } from "./ProtoHelper";

export class WSConnector {

	public get connected(): boolean { return this._socket != null && this._socket.readyState == WebSocket.OPEN };

	public set onclose(handler: (ev: CloseEvent) => any) {
		this._onclose = handler;
		if (this._socket != null)
			this._socket.onclose = this._onclose;
	}
	
	public set onerror(handler: (ev: CloseEvent) => any) {
		this._onerror = handler;
		if (this._socket != null)
			this._socket.onerror = this._onerror;
	}

	public set onopen(handler: (ev: CloseEvent) => any) {
		this._onopen = handler;
		if (this._socket != null)
			this._socket.onopen = this._onopen;
	}

	private _onclose: ((ev: Event) => any) | null;
	private _onerror: ((ev: Event) => any) | null;
	private _onopen: ((ev: Event) => any) | null;

	private _socket: WebSocket;
	private readonly _msgCenter: MsgCenter;
	private readonly _rpcHandlers: Map<number, (any) => any>;//可能是异步写入,但必定是同步读取,所以不用加锁
	private _pid: number = 0;

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
		this._socket.onopen = this._onopen;
	}

	public Send(type: any, message: any, rpcHandler: (any) => any = null): void {
		let opts = ProtoCreator.GetMsgOpts(message);
		RC.Logger.Assert(opts != null, "invalid message options");
		//为消息写入序号
		opts.pid = this._pid++;
		if ((opts.flag & (1 << Protos.MsgOpts.Flag.RPC)) > 0 && rpcHandler != null) //如果是rpc消息,记下消息序号等待回调
		{
			if (this._rpcHandlers.has(opts.pid))
				RC.Logger.Warn("packet id collision!!");
			this._rpcHandlers.set(opts.pid, rpcHandler);
		}
		let msgData: Uint8Array = type.encode(message).finish();
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
		RC.Logger.Assert(opts != null, "invalid msg options");
		//是否rpc消息
		if ((opts.flag & (1 << Protos.MsgOpts.Flag.RESP)) > 0) {
			let rcpHandler = this._rpcHandlers.get(opts.rpid);
			RC.Logger.Assert(rcpHandler != null, "RPC handler not found");
			this._rpcHandlers.delete(opts.rpid);
			rcpHandler(message);//调用回调函数
		} else {
			let handler = this._msgCenter.GetHandler(msgID);
			if (handler != null)
				handler(message);
			else
				RC.Logger.Warn(`invalid msg:${msgID}`);
		}
	}
}