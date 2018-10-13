define("UI/IUIModule", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("Net/ByteUtils", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ByteUtils {
        static Encode8u(p, offset, c) {
            p[0 + offset] = c;
            return 1;
        }
        static Encode16u(p, offset, w) {
            p[0 + offset] = w >> 0;
            p[1 + offset] = w >> 8;
            return 2;
        }
        static Encode32u(p, offset, value) {
            p[0 + offset] = value >> 0;
            p[1 + offset] = value >> 8;
            p[2 + offset] = value >> 16;
            p[3 + offset] = value >> 24;
            return 4;
        }
        static Encode64u(p, offset, value) {
            let l0 = value & 0xffffffff;
            let l1 = value >> 32;
            let offset2 = ByteUtils.Encode32u(p, offset, l0);
            ByteUtils.Encode32u(p, offset + offset2, l1);
            return 8;
        }
        static Decode8u(p, offset) {
            return p[0 + offset];
        }
        static Decode16u(p, offset) {
            let result = 0;
            result |= p[0 + offset];
            result |= p[1 + offset] << 8;
            return result;
        }
        static Decode32u(p, offset) {
            let result = 0;
            result |= p[0 + offset];
            result |= p[1 + offset] << 8;
            result |= p[2 + offset] << 16;
            result |= p[3 + offset] << 24;
            return result;
        }
        static Decode64u(p, offset) {
            let l0 = ByteUtils.Decode32u(p, offset);
            offset += 4;
            let l1 = ByteUtils.Decode32u(p, offset + offset);
            return l0 | (l1 << 32);
        }
    }
    exports.ByteUtils = ByteUtils;
});
define("Net/MsgCenter", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class MsgCenter {
        constructor() {
            this._generalHandlers = new Map();
        }
        Register(msgID, handler) {
            if (this._generalHandlers.has(msgID))
                return;
            this._generalHandlers.set(msgID, handler);
        }
        Unregister(msgID, handler) {
            return this._generalHandlers.delete(msgID);
        }
        GetHandler(msgID) {
            return this._generalHandlers.get(msgID);
        }
    }
    exports.MsgCenter = MsgCenter;
});
define("Net/ProtoHelper", ["require", "exports", "../libs/protos"], function (require, exports, protos_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ProtoCreator {
        static MakeTransMessage(msg, transTarget, transID) {
            msg.opts.flag |= 1 << 3;
            msg.opts.flag |= 1 << (3 + transTarget);
            msg.opts.transid = transID;
        }
        static Q_G_AskPing() {
            let msg = new protos_1.Protos.G_AskPing();
            msg.opts = new protos_1.Protos.MsgOpts();
            msg.opts.flag |= 1 << protos_1.Protos.MsgOpts.Flag.RPC;
            return msg;
        }
        static Q_G_AskPingRet() {
            let msg = new protos_1.Protos.G_AskPingRet();
            msg.opts = new protos_1.Protos.MsgOpts();
            return msg;
        }
        static Q_GC2LS_AskRegister() {
            let msg = new protos_1.Protos.GC2LS_AskRegister();
            msg.opts = new protos_1.Protos.MsgOpts();
            msg.opts.flag |= 1 << protos_1.Protos.MsgOpts.Flag.RPC;
            return msg;
        }
        static Q_GC2LS_AskLogin() {
            let msg = new protos_1.Protos.GC2LS_AskLogin();
            msg.opts = new protos_1.Protos.MsgOpts();
            msg.opts.flag |= 1 << protos_1.Protos.MsgOpts.Flag.RPC;
            return msg;
        }
        static Q_GC2GS_AskLogin() {
            let msg = new protos_1.Protos.GC2GS_AskLogin();
            msg.opts = new protos_1.Protos.MsgOpts();
            msg.opts.flag |= 1 << protos_1.Protos.MsgOpts.Flag.RPC;
            return msg;
        }
        static Q_GC2GS_KeepAlive() {
            let msg = new protos_1.Protos.GC2GS_KeepAlive();
            msg.opts = new protos_1.Protos.MsgOpts();
            return msg;
        }
        static Q_GC2BS_AskLogin() {
            let msg = new protos_1.Protos.GC2BS_AskLogin();
            msg.opts = new protos_1.Protos.MsgOpts();
            msg.opts.flag |= 1 << protos_1.Protos.MsgOpts.Flag.RPC;
            return msg;
        }
        static Q_GC2BS_KeepAlive() {
            let msg = new protos_1.Protos.GC2BS_KeepAlive();
            msg.opts = new protos_1.Protos.MsgOpts();
            return msg;
        }
        static Q_GC2CS_BeginMatch() {
            let msg = new protos_1.Protos.GC2CS_BeginMatch();
            msg.opts = new protos_1.Protos.MsgOpts();
            msg.opts.flag |= 1 << protos_1.Protos.MsgOpts.Flag.RPC;
            return msg;
        }
        static Q_LS2GC_GSInfo() {
            let msg = new protos_1.Protos.LS2GC_GSInfo();
            msg.opts = new protos_1.Protos.MsgOpts();
            return msg;
        }
        static Q_LS2GC_AskRegRet() {
            let msg = new protos_1.Protos.LS2GC_AskRegRet();
            msg.opts = new protos_1.Protos.MsgOpts();
            return msg;
        }
        static Q_LS2GC_AskLoginRet() {
            let msg = new protos_1.Protos.LS2GC_AskLoginRet();
            msg.opts = new protos_1.Protos.MsgOpts();
            return msg;
        }
        static Q_LS2CS_GCLogin() {
            let msg = new protos_1.Protos.LS2CS_GCLogin();
            msg.opts = new protos_1.Protos.MsgOpts();
            msg.opts.flag |= 1 << protos_1.Protos.MsgOpts.Flag.RPC;
            return msg;
        }
        static Q_LS2DB_QueryAccount() {
            let msg = new protos_1.Protos.LS2DB_QueryAccount();
            msg.opts = new protos_1.Protos.MsgOpts();
            msg.opts.flag |= 1 << protos_1.Protos.MsgOpts.Flag.RPC;
            return msg;
        }
        static Q_LS2DB_QueryLogin() {
            let msg = new protos_1.Protos.LS2DB_QueryLogin();
            msg.opts = new protos_1.Protos.MsgOpts();
            msg.opts.flag |= 1 << protos_1.Protos.MsgOpts.Flag.RPC;
            return msg;
        }
        static Q_LS2DB_Exec() {
            let msg = new protos_1.Protos.LS2DB_Exec();
            msg.opts = new protos_1.Protos.MsgOpts();
            msg.opts.flag |= 1 << protos_1.Protos.MsgOpts.Flag.RPC;
            return msg;
        }
        static Q_GS2CS_ReportState() {
            let msg = new protos_1.Protos.GS2CS_ReportState();
            msg.opts = new protos_1.Protos.MsgOpts();
            return msg;
        }
        static Q_GS2CS_GCAskLogin() {
            let msg = new protos_1.Protos.GS2CS_GCAskLogin();
            msg.opts = new protos_1.Protos.MsgOpts();
            msg.opts.flag |= 1 << protos_1.Protos.MsgOpts.Flag.RPC;
            return msg;
        }
        static Q_GS2CS_GCLost() {
            let msg = new protos_1.Protos.GS2CS_GCLost();
            msg.opts = new protos_1.Protos.MsgOpts();
            return msg;
        }
        static Q_GS2CS_KickGCRet() {
            let msg = new protos_1.Protos.GS2CS_KickGCRet();
            msg.opts = new protos_1.Protos.MsgOpts();
            return msg;
        }
        static Q_GS2GC_LoginRet() {
            let msg = new protos_1.Protos.GS2GC_LoginRet();
            msg.opts = new protos_1.Protos.MsgOpts();
            return msg;
        }
        static Q_GS2GC_Kick() {
            let msg = new protos_1.Protos.GS2GC_Kick();
            msg.opts = new protos_1.Protos.MsgOpts();
            return msg;
        }
        static Q_BS2CS_ReportState() {
            let msg = new protos_1.Protos.BS2CS_ReportState();
            msg.opts = new protos_1.Protos.MsgOpts();
            return msg;
        }
        static Q_BS2CS_GCAskLogin() {
            let msg = new protos_1.Protos.BS2CS_GCAskLogin();
            msg.opts = new protos_1.Protos.MsgOpts();
            msg.opts.flag |= 1 << protos_1.Protos.MsgOpts.Flag.RPC;
            return msg;
        }
        static Q_BS2CS_GCLost() {
            let msg = new protos_1.Protos.BS2CS_GCLost();
            msg.opts = new protos_1.Protos.MsgOpts();
            return msg;
        }
        static Q_BS2CS_RommInfoRet() {
            let msg = new protos_1.Protos.BS2CS_RommInfoRet();
            msg.opts = new protos_1.Protos.MsgOpts();
            return msg;
        }
        static Q_BS2GC_LoginRet() {
            let msg = new protos_1.Protos.BS2GC_LoginRet();
            msg.opts = new protos_1.Protos.MsgOpts();
            return msg;
        }
        static Q_CS2LS_GSInfos() {
            let msg = new protos_1.Protos.CS2LS_GSInfos();
            msg.opts = new protos_1.Protos.MsgOpts();
            return msg;
        }
        static Q_CS2LS_GSInfo() {
            let msg = new protos_1.Protos.CS2LS_GSInfo();
            msg.opts = new protos_1.Protos.MsgOpts();
            return msg;
        }
        static Q_CS2LS_GSLost() {
            let msg = new protos_1.Protos.CS2LS_GSLost();
            msg.opts = new protos_1.Protos.MsgOpts();
            return msg;
        }
        static Q_CS2LS_GCLoginRet() {
            let msg = new protos_1.Protos.CS2LS_GCLoginRet();
            msg.opts = new protos_1.Protos.MsgOpts();
            return msg;
        }
        static Q_CS2GS_GCLoginRet() {
            let msg = new protos_1.Protos.CS2GS_GCLoginRet();
            msg.opts = new protos_1.Protos.MsgOpts();
            return msg;
        }
        static Q_CS2GS_KickGC() {
            let msg = new protos_1.Protos.CS2GS_KickGC();
            msg.opts = new protos_1.Protos.MsgOpts();
            msg.opts.flag |= 1 << protos_1.Protos.MsgOpts.Flag.RPC;
            return msg;
        }
        static Q_CS2BS_GCLoginRet() {
            let msg = new protos_1.Protos.CS2BS_GCLoginRet();
            msg.opts = new protos_1.Protos.MsgOpts();
            return msg;
        }
        static Q_CS2BS_RoomInfo() {
            let msg = new protos_1.Protos.CS2BS_RoomInfo();
            msg.opts = new protos_1.Protos.MsgOpts();
            msg.opts.flag |= 1 << protos_1.Protos.MsgOpts.Flag.RPC;
            return msg;
        }
        static Q_CS2GC_BeginMatchRet() {
            let msg = new protos_1.Protos.CS2GC_BeginMatchRet();
            msg.opts = new protos_1.Protos.MsgOpts();
            return msg;
        }
        static Q_CS2GC_BeginBattle() {
            let msg = new protos_1.Protos.CS2GC_BeginBattle();
            msg.opts = new protos_1.Protos.MsgOpts();
            return msg;
        }
        static Q_DB2LS_QueryAccountRet() {
            let msg = new protos_1.Protos.DB2LS_QueryAccountRet();
            msg.opts = new protos_1.Protos.MsgOpts();
            return msg;
        }
        static Q_DB2LS_QueryLoginRet() {
            let msg = new protos_1.Protos.DB2LS_QueryLoginRet();
            msg.opts = new protos_1.Protos.MsgOpts();
            return msg;
        }
        static Q_DB2LS_ExecRet() {
            let msg = new protos_1.Protos.DB2LS_ExecRet();
            msg.opts = new protos_1.Protos.MsgOpts();
            return msg;
        }
        static R_G_AskPing(pid) {
            let msg = new protos_1.Protos.G_AskPingRet();
            msg.opts = new protos_1.Protos.MsgOpts();
            msg.opts.flag |= 1 << protos_1.Protos.MsgOpts.Flag.RESP;
            msg.opts.rpid = pid;
            return msg;
        }
        static R_LS2CS_GCLogin(pid) {
            let msg = new protos_1.Protos.CS2LS_GCLoginRet();
            msg.opts = new protos_1.Protos.MsgOpts();
            msg.opts.flag |= 1 << protos_1.Protos.MsgOpts.Flag.RESP;
            msg.opts.rpid = pid;
            return msg;
        }
        static R_GC2LS_AskRegister(pid) {
            let msg = new protos_1.Protos.LS2GC_AskRegRet();
            msg.opts = new protos_1.Protos.MsgOpts();
            msg.opts.flag |= 1 << protos_1.Protos.MsgOpts.Flag.RESP;
            msg.opts.rpid = pid;
            return msg;
        }
        static R_GC2LS_AskLogin(pid) {
            let msg = new protos_1.Protos.LS2GC_AskLoginRet();
            msg.opts = new protos_1.Protos.MsgOpts();
            msg.opts.flag |= 1 << protos_1.Protos.MsgOpts.Flag.RESP;
            msg.opts.rpid = pid;
            return msg;
        }
        static R_GC2GS_AskLogin(pid) {
            let msg = new protos_1.Protos.GS2GC_LoginRet();
            msg.opts = new protos_1.Protos.MsgOpts();
            msg.opts.flag |= 1 << protos_1.Protos.MsgOpts.Flag.RESP;
            msg.opts.rpid = pid;
            return msg;
        }
        static R_GS2CS_GCAskLogin(pid) {
            let msg = new protos_1.Protos.CS2GS_GCLoginRet();
            msg.opts = new protos_1.Protos.MsgOpts();
            msg.opts.flag |= 1 << protos_1.Protos.MsgOpts.Flag.RESP;
            msg.opts.rpid = pid;
            return msg;
        }
        static R_BS2CS_GCAskLogin(pid) {
            let msg = new protos_1.Protos.CS2BS_GCLoginRet();
            msg.opts = new protos_1.Protos.MsgOpts();
            msg.opts.flag |= 1 << protos_1.Protos.MsgOpts.Flag.RESP;
            msg.opts.rpid = pid;
            return msg;
        }
        static R_GC2BS_AskLogin(pid) {
            let msg = new protos_1.Protos.BS2GC_LoginRet();
            msg.opts = new protos_1.Protos.MsgOpts();
            msg.opts.flag |= 1 << protos_1.Protos.MsgOpts.Flag.RESP;
            msg.opts.rpid = pid;
            return msg;
        }
        static R_LS2DB_QueryAccount(pid) {
            let msg = new protos_1.Protos.DB2LS_QueryAccountRet();
            msg.opts = new protos_1.Protos.MsgOpts();
            msg.opts.flag |= 1 << protos_1.Protos.MsgOpts.Flag.RESP;
            msg.opts.rpid = pid;
            return msg;
        }
        static R_LS2DB_QueryLogin(pid) {
            let msg = new protos_1.Protos.DB2LS_QueryLoginRet();
            msg.opts = new protos_1.Protos.MsgOpts();
            msg.opts.flag |= 1 << protos_1.Protos.MsgOpts.Flag.RESP;
            msg.opts.rpid = pid;
            return msg;
        }
        static R_LS2DB_Exec(pid) {
            let msg = new protos_1.Protos.DB2LS_ExecRet();
            msg.opts = new protos_1.Protos.MsgOpts();
            msg.opts.flag |= 1 << protos_1.Protos.MsgOpts.Flag.RESP;
            msg.opts.rpid = pid;
            return msg;
        }
        static R_GC2CS_BeginMatch(pid) {
            let msg = new protos_1.Protos.CS2GC_BeginMatchRet();
            msg.opts = new protos_1.Protos.MsgOpts();
            msg.opts.flag |= 1 << protos_1.Protos.MsgOpts.Flag.RESP;
            msg.opts.rpid = pid;
            return msg;
        }
        static R_CS2BS_RoomInfo(pid) {
            let msg = new protos_1.Protos.BS2CS_RommInfoRet();
            msg.opts = new protos_1.Protos.MsgOpts();
            msg.opts.flag |= 1 << protos_1.Protos.MsgOpts.Flag.RESP;
            msg.opts.rpid = pid;
            return msg;
        }
        static R_CS2GS_KickGC(pid) {
            let msg = new protos_1.Protos.GS2CS_KickGCRet();
            msg.opts = new protos_1.Protos.MsgOpts();
            msg.opts.flag |= 1 << protos_1.Protos.MsgOpts.Flag.RESP;
            msg.opts.rpid = pid;
            return msg;
        }
        static DecodeMsg(msgID, data, size) {
            switch (msgID) {
                case 10: {
                    let msg = protos_1.Protos.G_AskPing.decode(data, size);
                    return msg;
                }
                case 11: {
                    let msg = protos_1.Protos.G_AskPingRet.decode(data, size);
                    return msg;
                }
                case 1000: {
                    let msg = protos_1.Protos.GC2LS_AskRegister.decode(data, size);
                    return msg;
                }
                case 1001: {
                    let msg = protos_1.Protos.GC2LS_AskLogin.decode(data, size);
                    return msg;
                }
                case 1100: {
                    let msg = protos_1.Protos.GC2GS_AskLogin.decode(data, size);
                    return msg;
                }
                case 1101: {
                    let msg = protos_1.Protos.GC2GS_KeepAlive.decode(data, size);
                    return msg;
                }
                case 1200: {
                    let msg = protos_1.Protos.GC2BS_AskLogin.decode(data, size);
                    return msg;
                }
                case 1201: {
                    let msg = protos_1.Protos.GC2BS_KeepAlive.decode(data, size);
                    return msg;
                }
                case 1300: {
                    let msg = protos_1.Protos.GC2CS_BeginMatch.decode(data, size);
                    return msg;
                }
                case 2000: {
                    let msg = protos_1.Protos.LS2GC_GSInfo.decode(data, size);
                    return msg;
                }
                case 2001: {
                    let msg = protos_1.Protos.LS2GC_AskRegRet.decode(data, size);
                    return msg;
                }
                case 2002: {
                    let msg = protos_1.Protos.LS2GC_AskLoginRet.decode(data, size);
                    return msg;
                }
                case 2100: {
                    let msg = protos_1.Protos.LS2CS_GCLogin.decode(data, size);
                    return msg;
                }
                case 2200: {
                    let msg = protos_1.Protos.LS2DB_QueryAccount.decode(data, size);
                    return msg;
                }
                case 2201: {
                    let msg = protos_1.Protos.LS2DB_QueryLogin.decode(data, size);
                    return msg;
                }
                case 2202: {
                    let msg = protos_1.Protos.LS2DB_Exec.decode(data, size);
                    return msg;
                }
                case 3000: {
                    let msg = protos_1.Protos.GS2CS_ReportState.decode(data, size);
                    return msg;
                }
                case 3001: {
                    let msg = protos_1.Protos.GS2CS_GCAskLogin.decode(data, size);
                    return msg;
                }
                case 3002: {
                    let msg = protos_1.Protos.GS2CS_GCLost.decode(data, size);
                    return msg;
                }
                case 3003: {
                    let msg = protos_1.Protos.GS2CS_KickGCRet.decode(data, size);
                    return msg;
                }
                case 3100: {
                    let msg = protos_1.Protos.GS2GC_LoginRet.decode(data, size);
                    return msg;
                }
                case 3101: {
                    let msg = protos_1.Protos.GS2GC_Kick.decode(data, size);
                    return msg;
                }
                case 4000: {
                    let msg = protos_1.Protos.BS2CS_ReportState.decode(data, size);
                    return msg;
                }
                case 4001: {
                    let msg = protos_1.Protos.BS2CS_GCAskLogin.decode(data, size);
                    return msg;
                }
                case 4002: {
                    let msg = protos_1.Protos.BS2CS_GCLost.decode(data, size);
                    return msg;
                }
                case 4003: {
                    let msg = protos_1.Protos.BS2CS_RommInfoRet.decode(data, size);
                    return msg;
                }
                case 4100: {
                    let msg = protos_1.Protos.BS2GC_LoginRet.decode(data, size);
                    return msg;
                }
                case 5000: {
                    let msg = protos_1.Protos.CS2LS_GSInfos.decode(data, size);
                    return msg;
                }
                case 5001: {
                    let msg = protos_1.Protos.CS2LS_GSInfo.decode(data, size);
                    return msg;
                }
                case 5002: {
                    let msg = protos_1.Protos.CS2LS_GSLost.decode(data, size);
                    return msg;
                }
                case 5003: {
                    let msg = protos_1.Protos.CS2LS_GCLoginRet.decode(data, size);
                    return msg;
                }
                case 5100: {
                    let msg = protos_1.Protos.CS2GS_GCLoginRet.decode(data, size);
                    return msg;
                }
                case 5101: {
                    let msg = protos_1.Protos.CS2GS_KickGC.decode(data, size);
                    return msg;
                }
                case 5200: {
                    let msg = protos_1.Protos.CS2BS_GCLoginRet.decode(data, size);
                    return msg;
                }
                case 5201: {
                    let msg = protos_1.Protos.CS2BS_RoomInfo.decode(data, size);
                    return msg;
                }
                case 5300: {
                    let msg = protos_1.Protos.CS2GC_BeginMatchRet.decode(data, size);
                    return msg;
                }
                case 5301: {
                    let msg = protos_1.Protos.CS2GC_BeginBattle.decode(data, size);
                    return msg;
                }
                case 8000: {
                    let msg = protos_1.Protos.DB2LS_QueryAccountRet.decode(data, size);
                    return msg;
                }
                case 8001: {
                    let msg = protos_1.Protos.DB2LS_QueryLoginRet.decode(data, size);
                    return msg;
                }
                case 8002: {
                    let msg = protos_1.Protos.DB2LS_ExecRet.decode(data, size);
                    return msg;
                }
            }
            return null;
        }
        static D_G_AskPing(data, size) {
            let msg = protos_1.Protos.G_AskPing.decode(data, size);
            return msg;
        }
        static D_G_AskPingRet(data, size) {
            let msg = protos_1.Protos.G_AskPingRet.decode(data, size);
            return msg;
        }
        static D_GC2LS_AskRegister(data, size) {
            let msg = protos_1.Protos.GC2LS_AskRegister.decode(data, size);
            return msg;
        }
        static D_GC2LS_AskLogin(data, size) {
            let msg = protos_1.Protos.GC2LS_AskLogin.decode(data, size);
            return msg;
        }
        static D_GC2GS_AskLogin(data, size) {
            let msg = protos_1.Protos.GC2GS_AskLogin.decode(data, size);
            return msg;
        }
        static D_GC2GS_KeepAlive(data, size) {
            let msg = protos_1.Protos.GC2GS_KeepAlive.decode(data, size);
            return msg;
        }
        static D_GC2BS_AskLogin(data, size) {
            let msg = protos_1.Protos.GC2BS_AskLogin.decode(data, size);
            return msg;
        }
        static D_GC2BS_KeepAlive(data, size) {
            let msg = protos_1.Protos.GC2BS_KeepAlive.decode(data, size);
            return msg;
        }
        static D_GC2CS_BeginMatch(data, size) {
            let msg = protos_1.Protos.GC2CS_BeginMatch.decode(data, size);
            return msg;
        }
        static D_LS2GC_GSInfo(data, size) {
            let msg = protos_1.Protos.LS2GC_GSInfo.decode(data, size);
            return msg;
        }
        static D_LS2GC_AskRegRet(data, size) {
            let msg = protos_1.Protos.LS2GC_AskRegRet.decode(data, size);
            return msg;
        }
        static D_LS2GC_AskLoginRet(data, size) {
            let msg = protos_1.Protos.LS2GC_AskLoginRet.decode(data, size);
            return msg;
        }
        static D_LS2CS_GCLogin(data, size) {
            let msg = protos_1.Protos.LS2CS_GCLogin.decode(data, size);
            return msg;
        }
        static D_LS2DB_QueryAccount(data, size) {
            let msg = protos_1.Protos.LS2DB_QueryAccount.decode(data, size);
            return msg;
        }
        static D_LS2DB_QueryLogin(data, size) {
            let msg = protos_1.Protos.LS2DB_QueryLogin.decode(data, size);
            return msg;
        }
        static D_LS2DB_Exec(data, size) {
            let msg = protos_1.Protos.LS2DB_Exec.decode(data, size);
            return msg;
        }
        static D_GS2CS_ReportState(data, size) {
            let msg = protos_1.Protos.GS2CS_ReportState.decode(data, size);
            return msg;
        }
        static D_GS2CS_GCAskLogin(data, size) {
            let msg = protos_1.Protos.GS2CS_GCAskLogin.decode(data, size);
            return msg;
        }
        static D_GS2CS_GCLost(data, size) {
            let msg = protos_1.Protos.GS2CS_GCLost.decode(data, size);
            return msg;
        }
        static D_GS2CS_KickGCRet(data, size) {
            let msg = protos_1.Protos.GS2CS_KickGCRet.decode(data, size);
            return msg;
        }
        static D_GS2GC_LoginRet(data, size) {
            let msg = protos_1.Protos.GS2GC_LoginRet.decode(data, size);
            return msg;
        }
        static D_GS2GC_Kick(data, size) {
            let msg = protos_1.Protos.GS2GC_Kick.decode(data, size);
            return msg;
        }
        static D_BS2CS_ReportState(data, size) {
            let msg = protos_1.Protos.BS2CS_ReportState.decode(data, size);
            return msg;
        }
        static D_BS2CS_GCAskLogin(data, size) {
            let msg = protos_1.Protos.BS2CS_GCAskLogin.decode(data, size);
            return msg;
        }
        static D_BS2CS_GCLost(data, size) {
            let msg = protos_1.Protos.BS2CS_GCLost.decode(data, size);
            return msg;
        }
        static D_BS2CS_RommInfoRet(data, size) {
            let msg = protos_1.Protos.BS2CS_RommInfoRet.decode(data, size);
            return msg;
        }
        static D_BS2GC_LoginRet(data, size) {
            let msg = protos_1.Protos.BS2GC_LoginRet.decode(data, size);
            return msg;
        }
        static D_CS2LS_GSInfos(data, size) {
            let msg = protos_1.Protos.CS2LS_GSInfos.decode(data, size);
            return msg;
        }
        static D_CS2LS_GSInfo(data, size) {
            let msg = protos_1.Protos.CS2LS_GSInfo.decode(data, size);
            return msg;
        }
        static D_CS2LS_GSLost(data, size) {
            let msg = protos_1.Protos.CS2LS_GSLost.decode(data, size);
            return msg;
        }
        static D_CS2LS_GCLoginRet(data, size) {
            let msg = protos_1.Protos.CS2LS_GCLoginRet.decode(data, size);
            return msg;
        }
        static D_CS2GS_GCLoginRet(data, size) {
            let msg = protos_1.Protos.CS2GS_GCLoginRet.decode(data, size);
            return msg;
        }
        static D_CS2GS_KickGC(data, size) {
            let msg = protos_1.Protos.CS2GS_KickGC.decode(data, size);
            return msg;
        }
        static D_CS2BS_GCLoginRet(data, size) {
            let msg = protos_1.Protos.CS2BS_GCLoginRet.decode(data, size);
            return msg;
        }
        static D_CS2BS_RoomInfo(data, size) {
            let msg = protos_1.Protos.CS2BS_RoomInfo.decode(data, size);
            return msg;
        }
        static D_CS2GC_BeginMatchRet(data, size) {
            let msg = protos_1.Protos.CS2GC_BeginMatchRet.decode(data, size);
            return msg;
        }
        static D_CS2GC_BeginBattle(data, size) {
            let msg = protos_1.Protos.CS2GC_BeginBattle.decode(data, size);
            return msg;
        }
        static D_DB2LS_QueryAccountRet(data, size) {
            let msg = protos_1.Protos.DB2LS_QueryAccountRet.decode(data, size);
            return msg;
        }
        static D_DB2LS_QueryLoginRet(data, size) {
            let msg = protos_1.Protos.DB2LS_QueryLoginRet.decode(data, size);
            return msg;
        }
        static D_DB2LS_ExecRet(data, size) {
            let msg = protos_1.Protos.DB2LS_ExecRet.decode(data, size);
            return msg;
        }
        static CreateMsgByID(msgID) {
            switch (msgID) {
                case 10: {
                    return new protos_1.Protos.G_AskPing();
                }
                case 11: {
                    return new protos_1.Protos.G_AskPingRet();
                }
                case 1000: {
                    return new protos_1.Protos.GC2LS_AskRegister();
                }
                case 1001: {
                    return new protos_1.Protos.GC2LS_AskLogin();
                }
                case 1100: {
                    return new protos_1.Protos.GC2GS_AskLogin();
                }
                case 1101: {
                    return new protos_1.Protos.GC2GS_KeepAlive();
                }
                case 1200: {
                    return new protos_1.Protos.GC2BS_AskLogin();
                }
                case 1201: {
                    return new protos_1.Protos.GC2BS_KeepAlive();
                }
                case 1300: {
                    return new protos_1.Protos.GC2CS_BeginMatch();
                }
                case 2000: {
                    return new protos_1.Protos.LS2GC_GSInfo();
                }
                case 2001: {
                    return new protos_1.Protos.LS2GC_AskRegRet();
                }
                case 2002: {
                    return new protos_1.Protos.LS2GC_AskLoginRet();
                }
                case 2100: {
                    return new protos_1.Protos.LS2CS_GCLogin();
                }
                case 2200: {
                    return new protos_1.Protos.LS2DB_QueryAccount();
                }
                case 2201: {
                    return new protos_1.Protos.LS2DB_QueryLogin();
                }
                case 2202: {
                    return new protos_1.Protos.LS2DB_Exec();
                }
                case 3000: {
                    return new protos_1.Protos.GS2CS_ReportState();
                }
                case 3001: {
                    return new protos_1.Protos.GS2CS_GCAskLogin();
                }
                case 3002: {
                    return new protos_1.Protos.GS2CS_GCLost();
                }
                case 3003: {
                    return new protos_1.Protos.GS2CS_KickGCRet();
                }
                case 3100: {
                    return new protos_1.Protos.GS2GC_LoginRet();
                }
                case 3101: {
                    return new protos_1.Protos.GS2GC_Kick();
                }
                case 4000: {
                    return new protos_1.Protos.BS2CS_ReportState();
                }
                case 4001: {
                    return new protos_1.Protos.BS2CS_GCAskLogin();
                }
                case 4002: {
                    return new protos_1.Protos.BS2CS_GCLost();
                }
                case 4003: {
                    return new protos_1.Protos.BS2CS_RommInfoRet();
                }
                case 4100: {
                    return new protos_1.Protos.BS2GC_LoginRet();
                }
                case 5000: {
                    return new protos_1.Protos.CS2LS_GSInfos();
                }
                case 5001: {
                    return new protos_1.Protos.CS2LS_GSInfo();
                }
                case 5002: {
                    return new protos_1.Protos.CS2LS_GSLost();
                }
                case 5003: {
                    return new protos_1.Protos.CS2LS_GCLoginRet();
                }
                case 5100: {
                    return new protos_1.Protos.CS2GS_GCLoginRet();
                }
                case 5101: {
                    return new protos_1.Protos.CS2GS_KickGC();
                }
                case 5200: {
                    return new protos_1.Protos.CS2BS_GCLoginRet();
                }
                case 5201: {
                    return new protos_1.Protos.CS2BS_RoomInfo();
                }
                case 5300: {
                    return new protos_1.Protos.CS2GC_BeginMatchRet();
                }
                case 5301: {
                    return new protos_1.Protos.CS2GC_BeginBattle();
                }
                case 8000: {
                    return new protos_1.Protos.DB2LS_QueryAccountRet();
                }
                case 8001: {
                    return new protos_1.Protos.DB2LS_QueryLoginRet();
                }
                case 8002: {
                    return new protos_1.Protos.DB2LS_ExecRet();
                }
            }
            return null;
        }
        static GetMsgOpts(message) {
            let msgID = ProtoCreator.GetMsgID(message);
            switch (msgID) {
                case 10: {
                    return message.opts;
                }
                case 11: {
                    return message.opts;
                }
                case 1000: {
                    return message.opts;
                }
                case 1001: {
                    return message.opts;
                }
                case 1100: {
                    return message.opts;
                }
                case 1101: {
                    return message.opts;
                }
                case 1200: {
                    return message.opts;
                }
                case 1201: {
                    return message.opts;
                }
                case 1300: {
                    return message.opts;
                }
                case 2000: {
                    return message.opts;
                }
                case 2001: {
                    return message.opts;
                }
                case 2002: {
                    return message.opts;
                }
                case 2100: {
                    return message.opts;
                }
                case 2200: {
                    return message.opts;
                }
                case 2201: {
                    return message.opts;
                }
                case 2202: {
                    return message.opts;
                }
                case 3000: {
                    return message.opts;
                }
                case 3001: {
                    return message.opts;
                }
                case 3002: {
                    return message.opts;
                }
                case 3003: {
                    return message.opts;
                }
                case 3100: {
                    return message.opts;
                }
                case 3101: {
                    return message.opts;
                }
                case 4000: {
                    return message.opts;
                }
                case 4001: {
                    return message.opts;
                }
                case 4002: {
                    return message.opts;
                }
                case 4003: {
                    return message.opts;
                }
                case 4100: {
                    return message.opts;
                }
                case 5000: {
                    return message.opts;
                }
                case 5001: {
                    return message.opts;
                }
                case 5002: {
                    return message.opts;
                }
                case 5003: {
                    return message.opts;
                }
                case 5100: {
                    return message.opts;
                }
                case 5101: {
                    return message.opts;
                }
                case 5200: {
                    return message.opts;
                }
                case 5201: {
                    return message.opts;
                }
                case 5300: {
                    return message.opts;
                }
                case 5301: {
                    return message.opts;
                }
                case 8000: {
                    return message.opts;
                }
                case 8001: {
                    return message.opts;
                }
                case 8002: {
                    return message.opts;
                }
            }
            return null;
        }
        static GetMsgIDByType(type) { return ProtoCreator._TYPE2ID.get(type); }
        static GetMsgID(message) { return ProtoCreator._TYPE2ID.get(message.constructor); }
    }
    ProtoCreator._TYPE2ID = new Map([
        [protos_1.Protos.G_AskPing, 10],
        [protos_1.Protos.G_AskPingRet, 11],
        [protos_1.Protos.GC2LS_AskRegister, 1000],
        [protos_1.Protos.GC2LS_AskLogin, 1001],
        [protos_1.Protos.GC2GS_AskLogin, 1100],
        [protos_1.Protos.GC2GS_KeepAlive, 1101],
        [protos_1.Protos.GC2BS_AskLogin, 1200],
        [protos_1.Protos.GC2BS_KeepAlive, 1201],
        [protos_1.Protos.GC2CS_BeginMatch, 1300],
        [protos_1.Protos.LS2GC_GSInfo, 2000],
        [protos_1.Protos.LS2GC_AskRegRet, 2001],
        [protos_1.Protos.LS2GC_AskLoginRet, 2002],
        [protos_1.Protos.LS2CS_GCLogin, 2100],
        [protos_1.Protos.LS2DB_QueryAccount, 2200],
        [protos_1.Protos.LS2DB_QueryLogin, 2201],
        [protos_1.Protos.LS2DB_Exec, 2202],
        [protos_1.Protos.GS2CS_ReportState, 3000],
        [protos_1.Protos.GS2CS_GCAskLogin, 3001],
        [protos_1.Protos.GS2CS_GCLost, 3002],
        [protos_1.Protos.GS2CS_KickGCRet, 3003],
        [protos_1.Protos.GS2GC_LoginRet, 3100],
        [protos_1.Protos.GS2GC_Kick, 3101],
        [protos_1.Protos.BS2CS_ReportState, 4000],
        [protos_1.Protos.BS2CS_GCAskLogin, 4001],
        [protos_1.Protos.BS2CS_GCLost, 4002],
        [protos_1.Protos.BS2CS_RommInfoRet, 4003],
        [protos_1.Protos.BS2GC_LoginRet, 4100],
        [protos_1.Protos.CS2LS_GSInfos, 5000],
        [protos_1.Protos.CS2LS_GSInfo, 5001],
        [protos_1.Protos.CS2LS_GSLost, 5002],
        [protos_1.Protos.CS2LS_GCLoginRet, 5003],
        [protos_1.Protos.CS2GS_GCLoginRet, 5100],
        [protos_1.Protos.CS2GS_KickGC, 5101],
        [protos_1.Protos.CS2BS_GCLoginRet, 5200],
        [protos_1.Protos.CS2BS_RoomInfo, 5201],
        [protos_1.Protos.CS2GC_BeginMatchRet, 5300],
        [protos_1.Protos.CS2GC_BeginBattle, 5301],
        [protos_1.Protos.DB2LS_QueryAccountRet, 8000],
        [protos_1.Protos.DB2LS_QueryLoginRet, 8001],
        [protos_1.Protos.DB2LS_ExecRet, 8002],
    ]);
    ProtoCreator._ID2TYPE = new Map([
        [10, protos_1.Protos.G_AskPing],
        [11, protos_1.Protos.G_AskPingRet],
        [1000, protos_1.Protos.GC2LS_AskRegister],
        [1001, protos_1.Protos.GC2LS_AskLogin],
        [1100, protos_1.Protos.GC2GS_AskLogin],
        [1101, protos_1.Protos.GC2GS_KeepAlive],
        [1200, protos_1.Protos.GC2BS_AskLogin],
        [1201, protos_1.Protos.GC2BS_KeepAlive],
        [1300, protos_1.Protos.GC2CS_BeginMatch],
        [2000, protos_1.Protos.LS2GC_GSInfo],
        [2001, protos_1.Protos.LS2GC_AskRegRet],
        [2002, protos_1.Protos.LS2GC_AskLoginRet],
        [2100, protos_1.Protos.LS2CS_GCLogin],
        [2200, protos_1.Protos.LS2DB_QueryAccount],
        [2201, protos_1.Protos.LS2DB_QueryLogin],
        [2202, protos_1.Protos.LS2DB_Exec],
        [3000, protos_1.Protos.GS2CS_ReportState],
        [3001, protos_1.Protos.GS2CS_GCAskLogin],
        [3002, protos_1.Protos.GS2CS_GCLost],
        [3003, protos_1.Protos.GS2CS_KickGCRet],
        [3100, protos_1.Protos.GS2GC_LoginRet],
        [3101, protos_1.Protos.GS2GC_Kick],
        [4000, protos_1.Protos.BS2CS_ReportState],
        [4001, protos_1.Protos.BS2CS_GCAskLogin],
        [4002, protos_1.Protos.BS2CS_GCLost],
        [4003, protos_1.Protos.BS2CS_RommInfoRet],
        [4100, protos_1.Protos.BS2GC_LoginRet],
        [5000, protos_1.Protos.CS2LS_GSInfos],
        [5001, protos_1.Protos.CS2LS_GSInfo],
        [5002, protos_1.Protos.CS2LS_GSLost],
        [5003, protos_1.Protos.CS2LS_GCLoginRet],
        [5100, protos_1.Protos.CS2GS_GCLoginRet],
        [5101, protos_1.Protos.CS2GS_KickGC],
        [5200, protos_1.Protos.CS2BS_GCLoginRet],
        [5201, protos_1.Protos.CS2BS_RoomInfo],
        [5300, protos_1.Protos.CS2GC_BeginMatchRet],
        [5301, protos_1.Protos.CS2GC_BeginBattle],
        [8000, protos_1.Protos.DB2LS_QueryAccountRet],
        [8001, protos_1.Protos.DB2LS_QueryLoginRet],
        [8002, protos_1.Protos.DB2LS_ExecRet],
    ]);
    exports.ProtoCreator = ProtoCreator;
});
define("Net/WSConnector", ["require", "exports", "Net/ByteUtils", "Net/MsgCenter", "../libs/protos", "Net/ProtoHelper"], function (require, exports, ByteUtils_1, MsgCenter_1, protos_2, ProtoHelper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class WSConnector {
        constructor() {
            this._pid = 0;
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
            this._socket.onopen = this._onopen;
        }
        Send(type, message, rpcHandler = null) {
            let opts = ProtoHelper_1.ProtoCreator.GetMsgOpts(message);
            RC.Logger.Assert(opts != null, "invalid message options");
            opts.pid = this._pid++;
            if ((opts.flag & (1 << protos_2.Protos.MsgOpts.Flag.RPC)) > 0 && rpcHandler != null) {
                if (this._rpcHandlers.has(opts.pid))
                    RC.Logger.Warn("packet id collision!!");
                this._rpcHandlers.set(opts.pid, rpcHandler);
            }
            let msgData = type.encode(message).finish();
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
            RC.Logger.Assert(opts != null, "invalid msg options");
            if ((opts.flag & (1 << protos_2.Protos.MsgOpts.Flag.RESP)) > 0) {
                let rcpHandler = this._rpcHandlers.get(opts.rpid);
                RC.Logger.Assert(rcpHandler != null, "RPC handler not found");
                this._rpcHandlers.delete(opts.rpid);
                rcpHandler(message);
            }
            else {
                let handler = this._msgCenter.GetHandler(msgID);
                if (handler != null)
                    handler(message);
                else
                    RC.Logger.Warn(`invalid msg:${msgID}`);
            }
        }
    }
    exports.WSConnector = WSConnector;
});
define("Net/GSConnector", ["require", "exports", "Net/WSConnector", "Net/ProtoHelper", "../libs/protos"], function (require, exports, WSConnector_1, ProtoHelper_2, protos_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GSConnector {
        static get connector() { return GSConnector._connector; }
        static Init() {
            GSConnector._connector = new WSConnector_1.WSConnector();
            GSConnector._connector.onclose = GSConnector.HandleDisconnect;
        }
        static OnConnected() {
            GSConnector._connected = true;
            GSConnector._time = 0;
        }
        static AddListener(msgID, handler) {
            GSConnector._connector.AddListener(msgID, handler);
        }
        static RemoveListener(msgID, handler) {
            return GSConnector._connector.RemoveListener(msgID, handler);
        }
        static Send(type, message, rpcHandler = null) {
            GSConnector._connector.Send(type, message, rpcHandler);
        }
        static Update(dt) {
            if (!GSConnector._connected)
                return;
            GSConnector._time += dt;
            if (GSConnector._time >= GSConnector.PING_INTERVAL) {
                let keepAlive = ProtoHelper_2.ProtoCreator.Q_GC2GS_KeepAlive();
                GSConnector.Send(protos_3.Protos.GC2GS_KeepAlive, keepAlive);
                GSConnector._time = 0;
            }
        }
        static HandleDisconnect(e) {
            RC.Logger.Log("connection closed.");
            GSConnector._connected = false;
            GSConnector._time = 0;
            GSConnector.disconnectHandler(e);
        }
    }
    GSConnector.PING_INTERVAL = 10000;
    exports.GSConnector = GSConnector;
});
define("UI/UIAlert", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class UIAlert {
        static get isShowing() { return UIAlert._isShowing; }
        static Show(content, removeHandler = null, isModal = false, scour = true) {
            if (UIAlert._isShowing && (UIAlert._isModal || !scour)) {
                return;
            }
            if (null == UIAlert._com) {
                UIAlert._com = fairygui.UIPackage.createObject("global", "alert").asCom;
            }
            UIAlert._hideHandler = removeHandler;
            if (UIAlert._hideHandler != null)
                UIAlert._com.on(laya.events.Event.REMOVED, null, UIAlert.OnHide);
            fairygui.GRoot.inst.showPopup(UIAlert._com);
            UIAlert._com.center();
            UIAlert._com.getChild("text").asTextField.text = content;
            UIAlert._isShowing = true;
            UIAlert._isModal = isModal;
        }
        static OnHide() {
            UIAlert._com.off(laya.events.Event.REMOVED, null, UIAlert.OnHide);
            UIAlert._isShowing = false;
            UIAlert._isModal = false;
            UIAlert._hideHandler();
        }
    }
    exports.UIAlert = UIAlert;
});
define("UI/UILogin", ["require", "exports", "../libs/protos", "Net/WSConnector", "Net/GSConnector", "Net/ProtoHelper", "UI/UIAlert", "Game"], function (require, exports, protos_4, WSConnector_2, GSConnector_1, ProtoHelper_3, UIAlert_1, Game_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class UILogin extends fairygui.Window {
        constructor() {
            super();
            fairygui.UIPackage.addPackage("res/ui/login");
        }
        onInit() {
            this.contentPane = fairygui.UIPackage.createObject("login", "Main").asCom;
            this.contentPane.getChild("login_btn").onClick(this, this.OnLoginBtnClick);
            this.contentPane.getChild("reg_btn").onClick(this, this.OnRegBtnClick);
            this.contentPane.getChild("enter_btn").onClick(this, this.OnEnterBtnClick);
            this._areaList = this.contentPane.getChild("alist").asList;
            this._areaList.on(fairygui.Events.CLICK_ITEM, this, this.OnAreaClick);
        }
        Dispose() {
            this.contentPane.dispose();
            this.contentPane = null;
            this.dispose();
        }
        Enter(param) {
            this.show();
            this.center();
            this.BackToLogin();
        }
        Leave() {
            this.hide();
        }
        Update(deltaTime) {
        }
        OnResize(e) {
        }
        BackToRegister() {
            this.contentPane.getController("c1").selectedIndex = 1;
        }
        BackToLogin() {
            this.contentPane.getController("c1").selectedIndex = 0;
        }
        OnRegBtnClick() {
            let regName = this.contentPane.getChild("reg_name").asTextField.text;
            if (regName == "") {
                UIAlert_1.UIAlert.Show("无效的用户名");
                return;
            }
            let regPwd = this.contentPane.getChild("reg_password").asTextField.text;
            if (regPwd == "") {
                UIAlert_1.UIAlert.Show("无效的密码");
                return;
            }
            let register = ProtoHelper_3.ProtoCreator.Q_GC2LS_AskRegister();
            register.name = regName;
            register.passwd = regPwd;
            register.platform = 0;
            register.sdk = 0;
            let connector = new WSConnector_2.WSConnector();
            connector.onerror = () => UIAlert_1.UIAlert.Show("无法连接服务器", () => connector.Connect("localhost", 49996));
            connector.onclose = () => RC.Logger.Log("connection closed.");
            connector.onopen = () => {
                connector.Send(protos_4.Protos.GC2LS_AskRegister, register, message => {
                    this.closeModalWait();
                    let resp = message;
                    switch (resp.result) {
                        case protos_4.Protos.LS2GC_AskRegRet.EResult.Success:
                            UIAlert_1.UIAlert.Show("注册成功");
                            this.contentPane.getChild("name").asTextField.text = regName;
                            this.contentPane.getChild("password").asTextField.text = regPwd;
                            this.contentPane.getController("c1").selectedIndex = 0;
                            break;
                        case protos_4.Protos.LS2GC_AskRegRet.EResult.Failed:
                            UIAlert_1.UIAlert.Show("注册失败", this.BackToRegister.bind(this));
                            break;
                        case protos_4.Protos.LS2GC_AskRegRet.EResult.UnameExists:
                            UIAlert_1.UIAlert.Show("用户名已存在", this.BackToRegister.bind(this));
                            break;
                        case protos_4.Protos.LS2GC_AskRegRet.EResult.UnameIllegal:
                            UIAlert_1.UIAlert.Show("无效的用户名", this.BackToRegister.bind(this));
                            break;
                        case protos_4.Protos.LS2GC_AskRegRet.EResult.PwdIllegal:
                            UIAlert_1.UIAlert.Show("无效的密码", this.BackToRegister.bind(this));
                            break;
                    }
                    connector.Close();
                });
            };
            this.showModalWait();
            connector.Connect("localhost", 49996);
        }
        OnLoginBtnClick() {
            let uname = this.contentPane.getChild("name").asTextField.text;
            if (uname == "") {
                UIAlert_1.UIAlert.Show("无效用户名");
                return;
            }
            let password = this.contentPane.getChild("password").asTextField.text;
            if (password == "") {
                UIAlert_1.UIAlert.Show("无效密码");
                return;
            }
            let login = ProtoHelper_3.ProtoCreator.Q_GC2LS_AskLogin();
            login.name = uname;
            login.passwd = password;
            let connector = new WSConnector_2.WSConnector();
            connector.onerror = () => UIAlert_1.UIAlert.Show("无法连接服务器", () => connector.Connect("localhost", 49996));
            connector.onclose = () => RC.Logger.Log("connection closed.");
            connector.onopen = () => {
                connector.Send(protos_4.Protos.GC2LS_AskLogin, login, message => {
                    this.closeModalWait();
                    let resp = message;
                    switch (resp.result) {
                        case protos_4.Protos.LS2GC_AskLoginRet.EResult.Success:
                            this.HandleLoginLSSuccess(resp);
                            break;
                        case protos_4.Protos.LS2GC_AskLoginRet.EResult.Failed:
                            UIAlert_1.UIAlert.Show("登陆失败", this.BackToLogin.bind(this));
                            break;
                        case protos_4.Protos.LS2GC_AskLoginRet.EResult.InvalidUname:
                            UIAlert_1.UIAlert.Show("请输入正确的用户名", this.BackToLogin.bind(this));
                            break;
                        case protos_4.Protos.LS2GC_AskLoginRet.EResult.InvalidPwd:
                            UIAlert_1.UIAlert.Show("请输入正确的密码", this.BackToLogin.bind(this));
                            break;
                    }
                });
            };
            this.showModalWait();
            connector.Connect("localhost", 49996);
        }
        HandleLoginLSSuccess(loginResult) {
            this._areaList.removeChildrenToPool();
            let count = loginResult.gsInfos.length;
            for (let i = 0; i < count; ++i) {
                let gsInfo = loginResult.gsInfos[i];
                let item = this._areaList.addItemFromPool().asButton;
                item.title = gsInfo.name;
                item.data = { "data": gsInfo, "sid": loginResult.sessionID };
            }
            if (count > 0)
                this._areaList.selectedIndex = 0;
            this.contentPane.getController("c1").selectedIndex = 2;
        }
        OnAreaClick() {
        }
        OnEnterBtnClick() {
            let item = this._areaList.getChildAt(this._areaList.selectedIndex);
            let data = item.data["data"];
            this.ConnectToGS(data.ip, data.port, data.password, item.data["sid"]);
        }
        ConnectToGS(ip, port, pwd, sessionID) {
            let connector = GSConnector_1.GSConnector.connector;
            connector.onerror = () => UIAlert_1.UIAlert.Show("无法连接服务器", this.BackToLogin.bind(this));
            connector.onopen = () => {
                let askLogin = ProtoHelper_3.ProtoCreator.Q_GC2GS_AskLogin();
                askLogin.pwd = pwd;
                askLogin.sessionID = sessionID;
                connector.Send(protos_4.Protos.GC2GS_AskLogin, askLogin, message => {
                    this.closeModalWait();
                    let resp = message;
                    switch (resp.result) {
                        case protos_4.Protos.GS2GC_LoginRet.EResult.Success:
                            Game_1.Game.instance.OnGSConnected();
                            break;
                        case protos_4.Protos.GS2GC_LoginRet.EResult.SessionExpire:
                            UIAlert_1.UIAlert.Show("登陆失败或凭证已过期", this.BackToLogin.bind(this));
                            break;
                    }
                });
            };
            this.showModalWait();
            connector.Connect(ip, port);
        }
    }
    exports.UILogin = UILogin;
});
define("UI/UIMain", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class UIMain {
        get root() { return this._root; }
        constructor() {
        }
        Dispose() {
        }
        Enter(param) {
        }
        Leave() {
        }
        Update(deltaTime) {
        }
        OnResize(e) {
        }
    }
    exports.UIMain = UIMain;
});
define("UI/UICutscene", ["require", "exports", "Net/GSConnector", "../libs/protos", "Net/ProtoHelper"], function (require, exports, GSConnector_2, protos_5, ProtoHelper_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class UICutscene {
        get root() { return this._root; }
        constructor() {
        }
        Dispose() {
        }
        Enter(param) {
            GSConnector_2.GSConnector.AddListener(protos_5.Protos.MsgID.eCS2GC_BeginBattle, this.OnBeginBattle.bind(this));
            let beginMatch = ProtoHelper_4.ProtoCreator.Q_GC2CS_BeginMatch();
            ProtoHelper_4.ProtoCreator.MakeTransMessage(beginMatch, protos_5.Protos.MsgOpts.TransTarget.CS, 0);
            GSConnector_2.GSConnector.Send(protos_5.Protos.GC2CS_BeginMatch, beginMatch, message => {
                let resp = message;
                console.log(resp);
            });
        }
        Leave() {
            GSConnector_2.GSConnector.RemoveListener(protos_5.Protos.MsgID.eCS2GC_BeginBattle, this.OnBeginBattle.bind(this));
        }
        Update(deltaTime) {
        }
        OnResize(e) {
        }
        OnBeginBattle(message) {
            let beginBattle = message;
            console.log(beginBattle);
        }
    }
    exports.UICutscene = UICutscene;
});
define("UI/UIManager", ["require", "exports", "UI/UILogin", "UI/UIMain", "UI/UICutscene", "Net/GSConnector", "../libs/protos", "UI/UIAlert"], function (require, exports, UILogin_1, UIMain_1, UICutscene_1, GSConnector_3, protos_6, UIAlert_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class UIManager {
        static get login() { return this._login; }
        static get main() { return this._main; }
        static get cutscene() { return this._cutscene; }
        static Init() {
            Laya.stage.addChild(fairygui.GRoot.inst.displayObject);
            fairygui.UIPackage.addPackage("res/ui/global");
            fairygui.UIConfig.globalModalWaiting = fairygui.UIPackage.getItemURL("global", "modelWait");
            fairygui.UIConfig.windowModalWaiting = fairygui.UIPackage.getItemURL("global", "modelWait");
            fairygui.UIConfig.buttonSound = fairygui.UIPackage.getItemURL("global", "click");
            this._login = new UILogin_1.UILogin();
            this._main = new UIMain_1.UIMain();
            this._cutscene = new UICutscene_1.UICutscene();
            GSConnector_3.GSConnector.disconnectHandler = UIManager.HandleGSDisconnect;
            GSConnector_3.GSConnector.AddListener(protos_6.Protos.MsgID.eGS2GC_Kick, UIManager.HandleKick);
        }
        static Dispose() {
            if (this._currModule != null) {
                this._currModule.Leave();
                this._currModule = null;
            }
        }
        static Update(deltaTime) {
            if (this._currModule != null)
                this._currModule.Update(deltaTime);
        }
        static OnResize(e) {
            if (this._currModule != null)
                this._currModule.OnResize(e);
        }
        static EnterModule(module, param) {
            if (this._currModule != null)
                this._currModule.Leave();
            module.Enter(param);
            this._currModule = module;
        }
        static LeaveModule() {
            if (this._currModule != null)
                this._currModule.Leave();
            this._currModule = null;
        }
        static EnterLogin() {
            this.EnterModule(this._login);
        }
        static EnterCutscene() {
            this.EnterModule(this._cutscene);
        }
        static HandleGSDisconnect(e) {
            UIAlert_2.UIAlert.Show("与服务器断开连接", () => UIManager.EnterLogin());
        }
        static HandleKick(message) {
            let kick = message;
            switch (kick.reason) {
                case protos_6.Protos.CS2GS_KickGC.EReason.DuplicateLogin:
                    UIAlert_2.UIAlert.Show("另一台设备正在登陆相同的账号", () => UIManager.EnterLogin());
                    break;
                default:
                    UIAlert_2.UIAlert.Show("已被服务器强制下线", () => UIManager.EnterLogin(), true);
                    break;
            }
        }
    }
    exports.UIManager = UIManager;
});
define("Model/Defs", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Defs {
        static Init(json) {
            Defs._defs = json;
        }
        static GetUser() {
            let ht = RC.Utils.Hashtable.GetMap(Defs._defs, "user");
            return ht;
        }
        static GetPreloads() {
            let arr = RC.Utils.Hashtable.GetArray(Defs._defs, "preloads");
            return arr;
        }
        static GetMap(id) {
            let ht = RC.Utils.Hashtable.GetMap(Defs._defs, "maps");
            let defaultHt = RC.Utils.Hashtable.GetMap(ht, "default");
            let result = RC.Utils.Hashtable.GetMap(ht, id);
            if (result == null)
                result = {};
            RC.Utils.Hashtable.Concat(result, defaultHt);
            return result;
        }
        static GetEntity(id) {
            let ht = RC.Utils.Hashtable.GetMap(Defs._defs, "entities");
            let defaultHt = RC.Utils.Hashtable.GetMap(ht, "default");
            let result = RC.Utils.Hashtable.GetMap(ht, id);
            if (result == null)
                result = {};
            RC.Utils.Hashtable.Concat(result, defaultHt);
            return result;
        }
        static GetTask() {
            let arr = RC.Utils.Hashtable.GetArray(Defs._defs, "task");
            return arr;
        }
        static GetMessage() {
            let arr = RC.Utils.Hashtable.GetArray(Defs._defs, "message");
            return arr;
        }
    }
    exports.Defs = Defs;
});
define("Game", ["require", "exports", "UI/UIManager", "Model/Defs", "Net/GSConnector"], function (require, exports, UIManager_1, Defs_1, GSConnector_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Game {
        static get instance() { return Game._instance; }
        constructor() {
            Game._instance = this;
            Laya.init(720, 1280);
            Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_WIDTH;
            Laya.stage.alignH = Laya.Stage.ALIGN_LEFT;
            Laya.stage.alignV = Laya.Stage.ALIGN_TOP;
            Laya.stage.screenMode = Laya.Stage.SCREEN_VERTICAL;
            this.LoadDefs();
        }
        LoadDefs() {
            console.log("loading defs...");
            Laya.loader.load("res/defs/b_defs.json", Laya.Handler.create(this, this.OnDefsLoadComplete), undefined, Laya.Loader.JSON);
        }
        OnDefsLoadComplete() {
            let json = Laya.loader.getRes("res/defs/b_defs.json");
            Defs_1.Defs.Init(json);
            this.LoadUIRes();
        }
        LoadUIRes() {
            console.log("loading res...");
            let preloads = Defs_1.Defs.GetPreloads();
            let urls = [];
            for (let u of preloads) {
                let ss = u.split(",");
                urls.push({ url: "res/ui/" + ss[0], type: ss[1] == "0" ? Laya.Loader.BUFFER : Laya.Loader.IMAGE });
            }
            Laya.loader.load(urls, Laya.Handler.create(this, this.OnUIResLoadComplete));
        }
        OnUIResLoadComplete() {
            this.StartGame();
        }
        StartGame() {
            console.log("start game...");
            fairygui.GRoot.inst.on(fairygui.Events.SIZE_CHANGED, this, this.OnResize);
            Laya.timer.frameLoop(1, this, this.Update);
            GSConnector_4.GSConnector.Init();
            UIManager_1.UIManager.Init();
            UIManager_1.UIManager.EnterLogin();
        }
        Update() {
            let dt = Laya.timer.delta;
            UIManager_1.UIManager.Update(dt);
            GSConnector_4.GSConnector.Update(dt);
        }
        OnResize(e) {
            UIManager_1.UIManager.OnResize(e);
        }
        OnGSConnected() {
            GSConnector_4.GSConnector.OnConnected();
            UIManager_1.UIManager.EnterCutscene();
        }
    }
    exports.Game = Game;
});
define("Events/EventManager", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class EventManager {
        static AddListener(type, handler) {
            let list = EventManager.HANDLERS[type];
            if (list == undefined)
                EventManager.HANDLERS[type] = list = [];
            list.push(handler);
        }
        static RemoveListener(type, handler) {
            let list = EventManager.HANDLERS[type];
            if (list == undefined)
                return;
            let result = list.splice(list.indexOf(handler), 1);
            if (!result)
                return;
            if (list.length == 0)
                EventManager.HANDLERS[type] = undefined;
        }
        static BeginInvoke(e) {
            EventManager.PENDING_LIST.enqueue(e);
        }
        static Invoke(e) {
            let handlers = EventManager.HANDLERS[e.type];
            if (handlers != undefined) {
                handlers.forEach((callback) => {
                    callback(e);
                });
            }
            e.Release();
        }
        static Sync() {
            while (!EventManager.PENDING_LIST.isEmpty()) {
                let e = EventManager.PENDING_LIST.dequeue();
                EventManager.Invoke(e);
            }
        }
    }
    EventManager.HANDLERS = {};
    EventManager.PENDING_LIST = new RC.Collections.Queue();
    exports.EventManager = EventManager;
});
define("Events/BaseEvent", ["require", "exports", "Events/EventManager"], function (require, exports, EventManager_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BaseEvent {
        get type() {
            return this.__type;
        }
        set _type(value) {
            this.__type = value;
        }
        BeginInvoke() {
            EventManager_1.EventManager.BeginInvoke(this);
        }
        Invoke() {
            EventManager_1.EventManager.Invoke(this);
        }
    }
    exports.BaseEvent = BaseEvent;
});
define("Events/UIEvent", ["require", "exports", "Events/BaseEvent"], function (require, exports, BaseEvent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class UIEvent extends BaseEvent_1.BaseEvent {
        static Get() {
            if (UIEvent.POOL.size() > 0)
                return UIEvent.POOL.pop();
            return new UIEvent();
        }
        static Release(element) {
            UIEvent.POOL.push(element);
        }
        Release() {
            UIEvent.Release(this);
        }
        static NetworkDisconnect() {
            let e = this.Get();
            e._type = UIEvent.NETWORK_DISCONNECT;
            e.Invoke();
        }
    }
    UIEvent.NETWORK_DISCONNECT = 10500;
    UIEvent.POOL = new RC.Collections.Stack();
    exports.UIEvent = UIEvent;
});
//# sourceMappingURL=game.js.map