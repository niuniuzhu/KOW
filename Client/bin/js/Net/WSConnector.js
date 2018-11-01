define(["require", "exports", "./ByteUtils", "./MsgCenter", "../Libs/protos", "./ProtoHelper", "../RC/Utils/Logger", "../Libs/long"], function (require, exports, ByteUtils_1, MsgCenter_1, protos_1, ProtoHelper_1, Logger_1, Long) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class WSConnector {
        constructor() {
            this._pid = 0;
            this._time = 0;
            this.lastPingTime = 0;
            this._msgCenter = new MsgCenter_1.MsgCenter();
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
        }
        Connect(ip, port) {
            if (this.connected)
                this.Close();
            this._socket = new WebSocket(`ws://${ip}:${port}`);
            this._socket.binaryType = "arraybuffer";
            this._socket.onmessage = this.OnReceived.bind(this);
            this._socket.onerror = this._onerror;
            this._socket.onclose = this._onclose;
            this._socket.onopen = (e) => {
                this._time = 0;
                this._onopen(e);
            };
        }
        Send(msgType, message, rpcHandler = null, transTarget = protos_1.Protos.MsgOpts.TransTarget.Undefine, nsid = Long.ZERO) {
            let opts = ProtoHelper_1.ProtoCreator.GetMsgOpts(message);
            if (opts == null) {
                Logger_1.Logger.Error("invalid message options");
            }
            if (transTarget != protos_1.Protos.MsgOpts.TransTarget.Undefine) {
                opts.flag |= 1 << 3;
                opts.flag |= 1 << (3 + transTarget);
            }
            if (nsid.greaterThan(0))
                opts.transid = nsid;
            if ((opts.flag & (1 << protos_1.Protos.MsgOpts.Flag.RPC)) > 0) {
                if (nsid.eq(0))
                    opts.transid = nsid;
                if (rpcHandler != null) {
                    if (this._rpcHandlers.has(opts.pid))
                        Logger_1.Logger.Warn("packet id collision!!");
                    this._rpcHandlers.set(opts.pid, rpcHandler);
                }
            }
            let msgData = msgType.encode(message).finish();
            let data = new Uint8Array(msgData.length + 4);
            ByteUtils_1.ByteUtils.Encode32u(data, 0, ProtoHelper_1.ProtoCreator.GetMsgID(message));
            data.set(msgData, 4);
            this._socket.send(data);
        }
        AddListener(msgID, handler) {
            this._msgCenter.Register(msgID, handler);
        }
        RemoveListener(msgID, handler) {
            return this._msgCenter.Unregister(msgID, handler);
        }
        OnReceived(ev) {
            let data = new Uint8Array(ev.data);
            let msgID = ByteUtils_1.ByteUtils.Decode32u(data, 0);
            data.copyWithin(0, 4);
            let message = ProtoHelper_1.ProtoCreator.DecodeMsg(msgID, data, data.length - 4);
            let opts = ProtoHelper_1.ProtoCreator.GetMsgOpts(message);
            if (opts == null) {
                Logger_1.Logger.Error("invalid msg options");
            }
            if ((opts.flag & (1 << protos_1.Protos.MsgOpts.Flag.RESP)) > 0) {
                let rcpHandler = this._rpcHandlers.get(opts.rpid);
                if (rcpHandler == null) {
                    Logger_1.Logger.Error("RPC handler not found with message:" + msgID);
                }
                this._rpcHandlers.delete(opts.rpid);
                rcpHandler(message);
            }
            else {
                let handler = this._msgCenter.GetHandler(msgID);
                if (handler != null)
                    handler(message);
                else
                    Logger_1.Logger.Warn(`invalid msg:${msgID}`);
            }
        }
        Update(dt) {
            if (!this.connected)
                return;
            this._time += dt;
        }
    }
    exports.WSConnector = WSConnector;
});
//# sourceMappingURL=WSConnector.js.map