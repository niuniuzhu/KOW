import * as Long from "../Libs/long";
import { Protos } from "../Libs/protos";
import { Logger } from "../RC/Utils/Logger";
import { ByteUtils } from "./ByteUtils";
import { MsgCenter } from "./MsgCenter";
import { ProtoCreator } from "./ProtoHelper";
export class WSConnector {
    constructor() {
        this._pid = 0;
        this._time = 0;
        this.lastPingTime = 0;
        this._msgCenter = new MsgCenter();
        this._rpcHandlers = new Map();
    }
    get connected() { return this._socket != null && this._socket.readyState == WebSocket.OPEN; }
    ;
    set onclose(handler) {
        this._onclose = handler;
        if (this._socket != null)
            this._socket.onclose = this._onclose;
    }
    set onerror(handler) {
        this._onerror = handler;
        if (this._socket != null)
            this._socket.onerror = this._onerror;
    }
    set onopen(handler) {
        this._onopen = handler;
        if (this._socket != null)
            this._socket.onopen = this._onopen;
    }
    get time() { return this._time; }
    Close() {
        this._pid = 0;
        this._socket.close();
        this._socket = null;
    }
    Connect(ip, port) {
        if (this.connected)
            this.Close();
        this._socket = new WebSocket(`wss://${ip}:${port}`);
        this._socket.binaryType = "arraybuffer";
        this._socket.onmessage = this.OnReceived.bind(this);
        this._socket.onerror = this._onerror;
        this._socket.onclose = this._onclose;
        this._socket.onopen = this.OnOpen.bind(this);
    }
    Send(msgType, message, rpcHandler = null, transTarget = Protos.MsgOpts.TransTarget.Undefine, nsid = Long.ZERO) {
        if (!this.connected)
            return;
        let opts = ProtoCreator.GetMsgOpts(message);
        if (opts == null) {
            Logger.Error("invalid message options");
        }
        if (transTarget != Protos.MsgOpts.TransTarget.Undefine) {
            opts.flag |= 1 << 3;
            opts.flag |= 1 << (3 + transTarget);
        }
        if (nsid.greaterThan(0))
            opts.transid = nsid;
        if ((opts.flag & (1 << Protos.MsgOpts.Flag.RPC)) > 0) {
            if (nsid.eq(0))
                opts.pid = this._pid++;
            if (rpcHandler != null) {
                if (this._rpcHandlers.has(opts.pid))
                    Logger.Error("packet id collision!!");
                this._rpcHandlers.set(opts.pid, rpcHandler);
            }
        }
        let msgData = msgType.encode(message).finish();
        let data = new Uint8Array(msgData.length + 4);
        ByteUtils.Encode32u(data, 0, ProtoCreator.GetMsgID(message));
        data.set(msgData, 4);
        this._socket.send(data.buffer);
    }
    AddListener(msgID, handler) {
        this._msgCenter.Register(msgID, handler);
    }
    RemoveListener(msgID, handler) {
        return this._msgCenter.Unregister(msgID, handler);
    }
    OnOpen(ev) {
        this._time = 0;
        this._onopen(ev);
    }
    OnReceived(ev) {
        let data = new Uint8Array(ev.data);
        let msgID = ByteUtils.Decode32u(data, 0);
        data.copyWithin(0, 4);
        let message = ProtoCreator.DecodeMsg(msgID, data, data.length - 4);
        let opts = ProtoCreator.GetMsgOpts(message);
        if (opts == null) {
            Logger.Error("invalid msg options");
        }
        if ((opts.flag & (1 << Protos.MsgOpts.Flag.RESP)) > 0) {
            let rcpHandler = this._rpcHandlers.get(opts.rpid);
            if (rcpHandler == null) {
                Logger.Error("RPC handler not found with message:" + msgID);
            }
            this._rpcHandlers.delete(opts.rpid);
            rcpHandler(message);
        }
        else {
            let handler = this._msgCenter.GetHandler(msgID);
            if (handler != null)
                handler(message);
            else
                Logger.Warn(`invalid msg:${msgID}`);
        }
    }
    Update(dt) {
        if (!this.connected)
            return;
        this._time += dt;
    }
}
