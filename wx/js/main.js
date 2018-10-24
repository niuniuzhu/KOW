define("UI/IUIModule", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
define("FSM/FSMState", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class FSMState {
        get type() { return this._type; }
        constructor(type) {
            this._type = type;
        }
        Enter(param) {
            this.OnEnter(param);
        }
        Exit() {
            this.OnExit();
        }
        Update(dt) {
            this.OnUpdate(dt);
        }
        OnEnter(param) {
        }
        OnExit() {
        }
        OnUpdate(dt) {
        }
    }
    exports.FSMState = FSMState;
});
define("FSM/FSM", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class FSM {
        get currentState() { return this._currentState; }
        get previousState() { return this._previousState; }
        constructor() {
            this._stateMap = new Map();
        }
        AddState(state) {
            if (this._stateMap.has(state.type))
                return false;
            this._stateMap.set(state.type, state);
            return true;
        }
        RemoveState(type) {
            return this._stateMap.delete(type);
        }
        HasState(type) {
            return this._stateMap.has(type);
        }
        LeaveState(type) {
            if (!this._stateMap.has(type))
                return false;
            let state = this._stateMap.get(type);
            state.Exit();
            return true;
        }
        ChangeState(type, param = null, force = false) {
            if (!this._stateMap.has(type))
                return false;
            if (this._currentState != null) {
                if (!force && this._currentState.type == type)
                    return false;
                this._currentState.Exit();
                this._previousState = this._currentState;
                this._currentState = null;
            }
            let state = this._stateMap.get(type);
            this._currentState = state;
            this._currentState.Enter(param);
        }
        Update(dt) {
            if (this.globalState != null)
                this.globalState.Update(dt);
            if (this._currentState != null)
                this._currentState.Update(dt);
        }
    }
    exports.FSM = FSM;
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
        static Q_GC2LS_AskSmartLogin() {
            let msg = new protos_1.Protos.GC2LS_AskSmartLogin();
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
        static Q_GC2CS_UpdatePlayerInfo() {
            let msg = new protos_1.Protos.GC2CS_UpdatePlayerInfo();
            msg.opts = new protos_1.Protos.MsgOpts();
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
        static Q_BS2CS_BattleInfoRet() {
            let msg = new protos_1.Protos.BS2CS_BattleInfoRet();
            msg.opts = new protos_1.Protos.MsgOpts();
            return msg;
        }
        static Q_BS2CS_BattleStart() {
            let msg = new protos_1.Protos.BS2CS_BattleStart();
            msg.opts = new protos_1.Protos.MsgOpts();
            msg.opts.flag |= 1 << protos_1.Protos.MsgOpts.Flag.RPC;
            return msg;
        }
        static Q_BS2CS_BattleEnd() {
            let msg = new protos_1.Protos.BS2CS_BattleEnd();
            msg.opts = new protos_1.Protos.MsgOpts();
            msg.opts.flag |= 1 << protos_1.Protos.MsgOpts.Flag.RPC;
            return msg;
        }
        static Q_BS2GC_LoginRet() {
            let msg = new protos_1.Protos.BS2GC_LoginRet();
            msg.opts = new protos_1.Protos.MsgOpts();
            return msg;
        }
        static Q_BS2GC_BattleStart() {
            let msg = new protos_1.Protos.BS2GC_BattleStart();
            msg.opts = new protos_1.Protos.MsgOpts();
            return msg;
        }
        static Q_BS2GC_BattleEnd() {
            let msg = new protos_1.Protos.BS2GC_BattleEnd();
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
        static Q_CS2BS_BattleInfo() {
            let msg = new protos_1.Protos.CS2BS_BattleInfo();
            msg.opts = new protos_1.Protos.MsgOpts();
            msg.opts.flag |= 1 << protos_1.Protos.MsgOpts.Flag.RPC;
            return msg;
        }
        static Q_CS2BS_BattleStartRet() {
            let msg = new protos_1.Protos.CS2BS_BattleStartRet();
            msg.opts = new protos_1.Protos.MsgOpts();
            return msg;
        }
        static Q_CS2BS_BattleEndRet() {
            let msg = new protos_1.Protos.CS2BS_BattleEndRet();
            msg.opts = new protos_1.Protos.MsgOpts();
            return msg;
        }
        static Q_CS2GC_BeginMatchRet() {
            let msg = new protos_1.Protos.CS2GC_BeginMatchRet();
            msg.opts = new protos_1.Protos.MsgOpts();
            return msg;
        }
        static Q_CS2GC_PlayerJoin() {
            let msg = new protos_1.Protos.CS2GC_PlayerJoin();
            msg.opts = new protos_1.Protos.MsgOpts();
            return msg;
        }
        static Q_CS2GC_PlayerLeave() {
            let msg = new protos_1.Protos.CS2GC_PlayerLeave();
            msg.opts = new protos_1.Protos.MsgOpts();
            return msg;
        }
        static Q_CS2GC_RoomInfo() {
            let msg = new protos_1.Protos.CS2GC_RoomInfo();
            msg.opts = new protos_1.Protos.MsgOpts();
            return msg;
        }
        static Q_CS2GC_EnterBattle() {
            let msg = new protos_1.Protos.CS2GC_EnterBattle();
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
        static R_GC2LS_AskSmartLogin(pid) {
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
        static R_CS2BS_BattleInfo(pid) {
            let msg = new protos_1.Protos.BS2CS_BattleInfoRet();
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
        static R_BS2CS_BattleStart(pid) {
            let msg = new protos_1.Protos.CS2BS_BattleStartRet();
            msg.opts = new protos_1.Protos.MsgOpts();
            msg.opts.flag |= 1 << protos_1.Protos.MsgOpts.Flag.RESP;
            msg.opts.rpid = pid;
            return msg;
        }
        static R_BS2CS_BattleEnd(pid) {
            let msg = new protos_1.Protos.CS2BS_BattleEndRet();
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
                case 1002: {
                    let msg = protos_1.Protos.GC2LS_AskSmartLogin.decode(data, size);
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
                case 1301: {
                    let msg = protos_1.Protos.GC2CS_UpdatePlayerInfo.decode(data, size);
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
                    let msg = protos_1.Protos.BS2CS_BattleInfoRet.decode(data, size);
                    return msg;
                }
                case 4002: {
                    let msg = protos_1.Protos.BS2CS_BattleStart.decode(data, size);
                    return msg;
                }
                case 4003: {
                    let msg = protos_1.Protos.BS2CS_BattleEnd.decode(data, size);
                    return msg;
                }
                case 4100: {
                    let msg = protos_1.Protos.BS2GC_LoginRet.decode(data, size);
                    return msg;
                }
                case 4102: {
                    let msg = protos_1.Protos.BS2GC_BattleStart.decode(data, size);
                    return msg;
                }
                case 4103: {
                    let msg = protos_1.Protos.BS2GC_BattleEnd.decode(data, size);
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
                    let msg = protos_1.Protos.CS2BS_BattleInfo.decode(data, size);
                    return msg;
                }
                case 5201: {
                    let msg = protos_1.Protos.CS2BS_BattleStartRet.decode(data, size);
                    return msg;
                }
                case 5202: {
                    let msg = protos_1.Protos.CS2BS_BattleEndRet.decode(data, size);
                    return msg;
                }
                case 5300: {
                    let msg = protos_1.Protos.CS2GC_BeginMatchRet.decode(data, size);
                    return msg;
                }
                case 5301: {
                    let msg = protos_1.Protos.CS2GC_PlayerJoin.decode(data, size);
                    return msg;
                }
                case 5302: {
                    let msg = protos_1.Protos.CS2GC_PlayerLeave.decode(data, size);
                    return msg;
                }
                case 5303: {
                    let msg = protos_1.Protos.CS2GC_RoomInfo.decode(data, size);
                    return msg;
                }
                case 5304: {
                    let msg = protos_1.Protos.CS2GC_EnterBattle.decode(data, size);
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
        static D_GC2LS_AskSmartLogin(data, size) {
            let msg = protos_1.Protos.GC2LS_AskSmartLogin.decode(data, size);
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
        static D_GC2CS_UpdatePlayerInfo(data, size) {
            let msg = protos_1.Protos.GC2CS_UpdatePlayerInfo.decode(data, size);
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
        static D_BS2CS_BattleInfoRet(data, size) {
            let msg = protos_1.Protos.BS2CS_BattleInfoRet.decode(data, size);
            return msg;
        }
        static D_BS2CS_BattleStart(data, size) {
            let msg = protos_1.Protos.BS2CS_BattleStart.decode(data, size);
            return msg;
        }
        static D_BS2CS_BattleEnd(data, size) {
            let msg = protos_1.Protos.BS2CS_BattleEnd.decode(data, size);
            return msg;
        }
        static D_BS2GC_LoginRet(data, size) {
            let msg = protos_1.Protos.BS2GC_LoginRet.decode(data, size);
            return msg;
        }
        static D_BS2GC_BattleStart(data, size) {
            let msg = protos_1.Protos.BS2GC_BattleStart.decode(data, size);
            return msg;
        }
        static D_BS2GC_BattleEnd(data, size) {
            let msg = protos_1.Protos.BS2GC_BattleEnd.decode(data, size);
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
        static D_CS2BS_BattleInfo(data, size) {
            let msg = protos_1.Protos.CS2BS_BattleInfo.decode(data, size);
            return msg;
        }
        static D_CS2BS_BattleStartRet(data, size) {
            let msg = protos_1.Protos.CS2BS_BattleStartRet.decode(data, size);
            return msg;
        }
        static D_CS2BS_BattleEndRet(data, size) {
            let msg = protos_1.Protos.CS2BS_BattleEndRet.decode(data, size);
            return msg;
        }
        static D_CS2GC_BeginMatchRet(data, size) {
            let msg = protos_1.Protos.CS2GC_BeginMatchRet.decode(data, size);
            return msg;
        }
        static D_CS2GC_PlayerJoin(data, size) {
            let msg = protos_1.Protos.CS2GC_PlayerJoin.decode(data, size);
            return msg;
        }
        static D_CS2GC_PlayerLeave(data, size) {
            let msg = protos_1.Protos.CS2GC_PlayerLeave.decode(data, size);
            return msg;
        }
        static D_CS2GC_RoomInfo(data, size) {
            let msg = protos_1.Protos.CS2GC_RoomInfo.decode(data, size);
            return msg;
        }
        static D_CS2GC_EnterBattle(data, size) {
            let msg = protos_1.Protos.CS2GC_EnterBattle.decode(data, size);
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
                case 1002: {
                    return new protos_1.Protos.GC2LS_AskSmartLogin();
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
                case 1301: {
                    return new protos_1.Protos.GC2CS_UpdatePlayerInfo();
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
                    return new protos_1.Protos.BS2CS_BattleInfoRet();
                }
                case 4002: {
                    return new protos_1.Protos.BS2CS_BattleStart();
                }
                case 4003: {
                    return new protos_1.Protos.BS2CS_BattleEnd();
                }
                case 4100: {
                    return new protos_1.Protos.BS2GC_LoginRet();
                }
                case 4102: {
                    return new protos_1.Protos.BS2GC_BattleStart();
                }
                case 4103: {
                    return new protos_1.Protos.BS2GC_BattleEnd();
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
                    return new protos_1.Protos.CS2BS_BattleInfo();
                }
                case 5201: {
                    return new protos_1.Protos.CS2BS_BattleStartRet();
                }
                case 5202: {
                    return new protos_1.Protos.CS2BS_BattleEndRet();
                }
                case 5300: {
                    return new protos_1.Protos.CS2GC_BeginMatchRet();
                }
                case 5301: {
                    return new protos_1.Protos.CS2GC_PlayerJoin();
                }
                case 5302: {
                    return new protos_1.Protos.CS2GC_PlayerLeave();
                }
                case 5303: {
                    return new protos_1.Protos.CS2GC_RoomInfo();
                }
                case 5304: {
                    return new protos_1.Protos.CS2GC_EnterBattle();
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
                case 1002: {
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
                case 1301: {
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
                case 4102: {
                    return message.opts;
                }
                case 4103: {
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
                case 5202: {
                    return message.opts;
                }
                case 5300: {
                    return message.opts;
                }
                case 5301: {
                    return message.opts;
                }
                case 5302: {
                    return message.opts;
                }
                case 5303: {
                    return message.opts;
                }
                case 5304: {
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
        [protos_1.Protos.GC2LS_AskSmartLogin, 1002],
        [protos_1.Protos.GC2GS_AskLogin, 1100],
        [protos_1.Protos.GC2GS_KeepAlive, 1101],
        [protos_1.Protos.GC2BS_AskLogin, 1200],
        [protos_1.Protos.GC2BS_KeepAlive, 1201],
        [protos_1.Protos.GC2CS_BeginMatch, 1300],
        [protos_1.Protos.GC2CS_UpdatePlayerInfo, 1301],
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
        [protos_1.Protos.BS2CS_BattleInfoRet, 4001],
        [protos_1.Protos.BS2CS_BattleStart, 4002],
        [protos_1.Protos.BS2CS_BattleEnd, 4003],
        [protos_1.Protos.BS2GC_LoginRet, 4100],
        [protos_1.Protos.BS2GC_BattleStart, 4102],
        [protos_1.Protos.BS2GC_BattleEnd, 4103],
        [protos_1.Protos.CS2LS_GSInfos, 5000],
        [protos_1.Protos.CS2LS_GSInfo, 5001],
        [protos_1.Protos.CS2LS_GSLost, 5002],
        [protos_1.Protos.CS2LS_GCLoginRet, 5003],
        [protos_1.Protos.CS2GS_GCLoginRet, 5100],
        [protos_1.Protos.CS2GS_KickGC, 5101],
        [protos_1.Protos.CS2BS_BattleInfo, 5200],
        [protos_1.Protos.CS2BS_BattleStartRet, 5201],
        [protos_1.Protos.CS2BS_BattleEndRet, 5202],
        [protos_1.Protos.CS2GC_BeginMatchRet, 5300],
        [protos_1.Protos.CS2GC_PlayerJoin, 5301],
        [protos_1.Protos.CS2GC_PlayerLeave, 5302],
        [protos_1.Protos.CS2GC_RoomInfo, 5303],
        [protos_1.Protos.CS2GC_EnterBattle, 5304],
        [protos_1.Protos.DB2LS_QueryAccountRet, 8000],
        [protos_1.Protos.DB2LS_QueryLoginRet, 8001],
        [protos_1.Protos.DB2LS_ExecRet, 8002],
    ]);
    ProtoCreator._ID2TYPE = new Map([
        [10, protos_1.Protos.G_AskPing],
        [11, protos_1.Protos.G_AskPingRet],
        [1000, protos_1.Protos.GC2LS_AskRegister],
        [1001, protos_1.Protos.GC2LS_AskLogin],
        [1002, protos_1.Protos.GC2LS_AskSmartLogin],
        [1100, protos_1.Protos.GC2GS_AskLogin],
        [1101, protos_1.Protos.GC2GS_KeepAlive],
        [1200, protos_1.Protos.GC2BS_AskLogin],
        [1201, protos_1.Protos.GC2BS_KeepAlive],
        [1300, protos_1.Protos.GC2CS_BeginMatch],
        [1301, protos_1.Protos.GC2CS_UpdatePlayerInfo],
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
        [4001, protos_1.Protos.BS2CS_BattleInfoRet],
        [4002, protos_1.Protos.BS2CS_BattleStart],
        [4003, protos_1.Protos.BS2CS_BattleEnd],
        [4100, protos_1.Protos.BS2GC_LoginRet],
        [4102, protos_1.Protos.BS2GC_BattleStart],
        [4103, protos_1.Protos.BS2GC_BattleEnd],
        [5000, protos_1.Protos.CS2LS_GSInfos],
        [5001, protos_1.Protos.CS2LS_GSInfo],
        [5002, protos_1.Protos.CS2LS_GSLost],
        [5003, protos_1.Protos.CS2LS_GCLoginRet],
        [5100, protos_1.Protos.CS2GS_GCLoginRet],
        [5101, protos_1.Protos.CS2GS_KickGC],
        [5200, protos_1.Protos.CS2BS_BattleInfo],
        [5201, protos_1.Protos.CS2BS_BattleStartRet],
        [5202, protos_1.Protos.CS2BS_BattleEndRet],
        [5300, protos_1.Protos.CS2GC_BeginMatchRet],
        [5301, protos_1.Protos.CS2GC_PlayerJoin],
        [5302, protos_1.Protos.CS2GC_PlayerLeave],
        [5303, protos_1.Protos.CS2GC_RoomInfo],
        [5304, protos_1.Protos.CS2GC_EnterBattle],
        [8000, protos_1.Protos.DB2LS_QueryAccountRet],
        [8001, protos_1.Protos.DB2LS_QueryLoginRet],
        [8002, protos_1.Protos.DB2LS_ExecRet],
    ]);
    exports.ProtoCreator = ProtoCreator;
});
define("Net/WSConnector", ["require", "exports", "Net/ByteUtils", "Net/MsgCenter", "../libs/protos", "Net/ProtoHelper", "libs/long"], function (require, exports, ByteUtils_1, MsgCenter_1, protos_2, ProtoHelper_1, Long) {
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
        Send(msgType, message, rpcHandler = null, transTarget = protos_2.Protos.MsgOpts.TransTarget.Undefine, nsid = Long.ZERO) {
            let opts = ProtoHelper_1.ProtoCreator.GetMsgOpts(message);
            RC.Logger.Assert(opts != null, "invalid message options");
            if (transTarget != protos_2.Protos.MsgOpts.TransTarget.Undefine) {
                opts.flag |= 1 << 3;
                opts.flag |= 1 << (3 + transTarget);
            }
            if (nsid.greaterThan(0))
                opts.transid = nsid;
            if ((opts.flag & (1 << protos_2.Protos.MsgOpts.Flag.RPC)) > 0) {
                if (nsid.eq(0))
                    opts.transid = nsid;
                if (rpcHandler != null) {
                    if (this._rpcHandlers.has(opts.pid))
                        RC.Logger.Warn("packet id collision!!");
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
            RC.Logger.Assert(opts != null, "invalid msg options");
            if ((opts.flag & (1 << protos_2.Protos.MsgOpts.Flag.RESP)) > 0) {
                let rcpHandler = this._rpcHandlers.get(opts.rpid);
                RC.Logger.Assert(rcpHandler != null, "RPC handler not found with message:" + msgID);
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
        Update(dt) {
            if (!this.connected)
                return;
            this._time += dt;
        }
    }
    exports.WSConnector = WSConnector;
});
define("Net/Connector", ["require", "exports", "Net/WSConnector", "Net/ProtoHelper", "../libs/protos"], function (require, exports, WSConnector_1, ProtoHelper_2, protos_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ConnectorType;
    (function (ConnectorType) {
        ConnectorType[ConnectorType["GS"] = 0] = "GS";
        ConnectorType[ConnectorType["BS"] = 1] = "BS";
    })(ConnectorType || (ConnectorType = {}));
    class Connector {
        static get gsConnector() { return this._gsConnector; }
        static get bsConnector() { return this._bsConnector; }
        static Init() {
            this._gsConnector = new WSConnector_1.WSConnector();
            this._bsConnector = new WSConnector_1.WSConnector();
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
            this._gsConnector.Send(msgType, message, rpcHandler, protos_3.Protos.MsgOpts.TransTarget.CS);
        }
        static Update(dt) {
            this._connectors.forEach((v, k, map) => {
                v.Update(dt);
            });
            if (this.gsConnector.connected) {
                this.gsConnector.lastPingTime += dt;
                if (this.gsConnector.lastPingTime >= this.PING_INTERVAL) {
                    this.gsConnector.Send(protos_3.Protos.GC2GS_KeepAlive, ProtoHelper_2.ProtoCreator.Q_GC2GS_KeepAlive());
                    this.gsConnector.lastPingTime = 0;
                }
            }
            if (this.bsConnector.connected) {
                this.bsConnector.lastPingTime += dt;
                if (this.bsConnector.lastPingTime >= this.PING_INTERVAL) {
                    this.bsConnector.Send(protos_3.Protos.GC2BS_KeepAlive, ProtoHelper_2.ProtoCreator.Q_GC2BS_KeepAlive());
                    this.bsConnector.lastPingTime = 0;
                }
            }
        }
    }
    Connector.ConnectorType = ConnectorType;
    Connector.PING_INTERVAL = 10000;
    exports.Connector = Connector;
});
define("Scene/SceneState", ["require", "exports", "FSM/FSMState"], function (require, exports, FSMState_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SceneState extends FSMState_1.FSMState {
        constructor(type) {
            super(type);
        }
        OnEnter(param) {
            if (this.__ui != null)
                this.__ui.Enter(param);
        }
        OnExit() {
            if (this.__ui != null)
                this.__ui.Exit();
        }
        OnUpdate(dt) {
            if (this.__ui != null)
                this.__ui.Update(dt);
        }
    }
    exports.SceneState = SceneState;
});
define("Model/Defs", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Defs {
        static get config() { return Defs._config; }
        static Init(json) {
            Defs._defs = json;
            Defs._config = RC.Utils.Hashtable.GetMap(Defs._defs, "config");
        }
        static GetPreloads() {
            let arr = RC.Utils.Hashtable.GetArray(Defs._defs, "preloads");
            return arr;
        }
    }
    exports.Defs = Defs;
});
define("Misc/Debug", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Debug {
        static Log(message) {
            console.log(message);
        }
        static Warn(message) {
            console.warn(message);
        }
        static Error(message) {
            console.error(message);
        }
        static Exception(message) {
            console.exception(message);
        }
        static Info(message) {
            console.info(message);
        }
        static Trace(message) {
            console.trace(message);
        }
        static Debug(message) {
            console.debug(message);
        }
        static Assert(value, message) {
            console.assert(value, message);
        }
    }
    exports.Debug = Debug;
});
define("Scene/LoginState", ["require", "exports", "../libs/protos", "Net/Connector", "Net/ProtoHelper", "Net/WSConnector", "UI/UIManager", "Scene/SceneState", "Scene/SceneManager", "Model/Defs", "Misc/Debug"], function (require, exports, protos_4, Connector_1, ProtoHelper_3, WSConnector_2, UIManager_1, SceneState_1, SceneManager_1, Defs_1, Debug_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class LoginState extends SceneState_1.SceneState {
        constructor(type) {
            super(type);
            this.__ui = this._ui = UIManager_1.UIManager.login;
        }
        RequestRegister(uname, platform, sdk) {
            let register = ProtoHelper_3.ProtoCreator.Q_GC2LS_AskRegister();
            register.name = uname;
            register.platform = platform;
            register.sdk = sdk;
            let connector = new WSConnector_2.WSConnector();
            connector.onerror = () => this._ui.OnConnectToLSError(() => connector.Connect(Defs_1.Defs.config["ls_ip"], Defs_1.Defs.config["ls_port"]));
            connector.onclose = () => RC.Logger.Log("connection closed.");
            connector.onopen = () => {
                connector.Send(protos_4.Protos.GC2LS_AskRegister, register, message => {
                    let resp = message;
                    this._ui.OnRegisterResult(resp);
                });
            };
            connector.Connect(Defs_1.Defs.config["ls_ip"], Defs_1.Defs.config["ls_port"]);
        }
        RequestLogin(uname, platform, sdk) {
            let login = ProtoHelper_3.ProtoCreator.Q_GC2LS_AskSmartLogin();
            login.name = uname;
            login.platform = platform;
            login.sdk = sdk;
            let connector = new WSConnector_2.WSConnector();
            connector.onerror = () => this._ui.OnConnectToLSError(() => connector.Connect(Defs_1.Defs.config["ls_ip"], Defs_1.Defs.config["ls_port"]));
            connector.onclose = () => RC.Logger.Log("connection closed.");
            connector.onopen = () => {
                connector.Send(protos_4.Protos.GC2LS_AskSmartLogin, login, message => {
                    let resp = message;
                    this._ui.OnLoginResut(resp);
                });
            };
            connector.Connect(Defs_1.Defs.config["ls_ip"], Defs_1.Defs.config["ls_port"]);
        }
        RequestLoginGS(ip, port, pwd, sessionID) {
            let connector = Connector_1.Connector.gsConnector;
            connector.onerror = () => this._ui.OnConnectToGSError();
            connector.onopen = () => {
                Debug_1.Debug.Log("GS Connected");
                let askLogin = ProtoHelper_3.ProtoCreator.Q_GC2GS_AskLogin();
                askLogin.pwd = pwd;
                askLogin.sessionID = sessionID;
                connector.Send(protos_4.Protos.GC2GS_AskLogin, askLogin, message => {
                    let resp = message;
                    this._ui.OnLoginGSResult(resp);
                    switch (resp.result) {
                        case protos_4.Protos.GS2GC_LoginRet.EResult.Success:
                            if (resp.gcState == protos_4.Protos.GS2GC_LoginRet.EGCCState.Battle) {
                                Debug_1.Debug.Log("reconnect to battle");
                            }
                            else {
                                SceneManager_1.SceneManager.ChangeState(SceneManager_1.SceneManager.State.Main);
                            }
                            break;
                    }
                });
            };
            connector.Connect(ip, port);
        }
    }
    exports.LoginState = LoginState;
});
define("UI/UIMatching", ["require", "exports", "../libs/protos", "UI/UIAlert", "Scene/SceneManager"], function (require, exports, protos_5, UIAlert_1, SceneManager_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class UIMatching {
        get root() { return this._root; }
        constructor() {
            fairygui.UIPackage.addPackage("res/ui/matching");
            this._root = fairygui.UIPackage.createObject("matching", "Main").asCom;
        }
        Dispose() {
        }
        Enter(param) {
            fairygui.GRoot.inst.addChild(this._root);
        }
        Exit() {
            fairygui.GRoot.inst.removeChild(this._root);
        }
        Update(dt) {
        }
        OnResize(e) {
        }
        OnConnectToBSError() {
            UIAlert_1.UIAlert.Show("无法连接服务器", () => SceneManager_2.SceneManager.ChangeState(SceneManager_2.SceneManager.State.Matching, null, true));
        }
        OnBeginMatchResult(result) {
            let error = "";
            switch (result) {
                case protos_5.Protos.CS2GC_BeginMatchRet.EResult.Success:
                    break;
                case protos_5.Protos.CS2GC_BeginMatchRet.EResult.IllegalID:
                    error = "无效网络ID";
                    break;
                case protos_5.Protos.CS2GC_BeginMatchRet.EResult.NoRoom:
                    error = "匹配失败";
                    break;
                case protos_5.Protos.CS2GC_BeginMatchRet.EResult.UserInBattle:
                    error = "玩家已在战场中";
                    break;
                case protos_5.Protos.CS2GC_BeginMatchRet.EResult.UserInRoom:
                    error = "玩家已在匹配中";
                    break;
                case protos_5.Protos.CS2GC_BeginMatchRet.EResult.Failed:
                    error = "匹配失败";
                    break;
            }
            if (error != "") {
                UIAlert_1.UIAlert.Show(error, () => SceneManager_2.SceneManager.ChangeState(SceneManager_2.SceneManager.State.Matching, null, true));
            }
        }
        OnEnterBattleResult(result) {
            switch (result) {
                case protos_5.Protos.CS2GC_EnterBattle.Error.Success:
                    break;
                case protos_5.Protos.CS2GC_EnterBattle.Error.BSLost:
                case protos_5.Protos.CS2GC_EnterBattle.Error.BSNotFound:
                    UIAlert_1.UIAlert.Show("登录战场失败", () => SceneManager_2.SceneManager.ChangeState(SceneManager_2.SceneManager.State.Matching, null, true));
                    break;
            }
        }
        OnLoginBSResut(result) {
            switch (result) {
                case protos_5.Protos.BS2GC_LoginRet.EResult.Success:
                    break;
                default:
                    UIAlert_1.UIAlert.Show("进入战场失败", () => SceneManager_2.SceneManager.ChangeState(SceneManager_2.SceneManager.State.Matching, null, true));
                    break;
            }
        }
        UpdateRoomInfo(roomInfo) {
        }
        UpdatePlayers(_players) {
        }
    }
    exports.UIMatching = UIMatching;
});
define("Scene/MatchingState", ["require", "exports", "UI/UIManager", "Net/Connector", "../libs/protos", "Net/ProtoHelper", "Scene/SceneState", "Misc/Debug"], function (require, exports, UIManager_2, Connector_2, protos_6, ProtoHelper_4, SceneState_2, Debug_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class MatchingState extends SceneState_2.SceneState {
        constructor(type) {
            super(type);
            this.__ui = this._ui = UIManager_2.UIManager.matching;
        }
        OnEnter(param) {
            super.OnEnter(param);
            this._roomID = 0;
            this._mapID = 0;
            this._maxPlayers = 0;
            this._players = [];
            Connector_2.Connector.AddListener(Connector_2.Connector.ConnectorType.GS, protos_6.Protos.MsgID.eCS2GC_RoomInfo, this.OnUpdateRoomInfo.bind(this));
            Connector_2.Connector.AddListener(Connector_2.Connector.ConnectorType.GS, protos_6.Protos.MsgID.eCS2GC_PlayerJoin, this.OnPlayerJoint.bind(this));
            Connector_2.Connector.AddListener(Connector_2.Connector.ConnectorType.GS, protos_6.Protos.MsgID.eCS2GC_PlayerLeave, this.OnPlayerLeave.bind(this));
            Connector_2.Connector.AddListener(Connector_2.Connector.ConnectorType.GS, protos_6.Protos.MsgID.eCS2GC_EnterBattle, this.OnEnterBattle.bind(this));
            this.BeginMatch();
        }
        OnExit() {
            Connector_2.Connector.RemoveListener(Connector_2.Connector.ConnectorType.GS, protos_6.Protos.MsgID.eCS2GC_RoomInfo, this.OnUpdateRoomInfo.bind(this));
            Connector_2.Connector.RemoveListener(Connector_2.Connector.ConnectorType.GS, protos_6.Protos.MsgID.eCS2GC_PlayerJoin, this.OnPlayerJoint.bind(this));
            Connector_2.Connector.RemoveListener(Connector_2.Connector.ConnectorType.GS, protos_6.Protos.MsgID.eCS2GC_PlayerLeave, this.OnPlayerLeave.bind(this));
            Connector_2.Connector.RemoveListener(Connector_2.Connector.ConnectorType.GS, protos_6.Protos.MsgID.eCS2GC_EnterBattle, this.OnEnterBattle.bind(this));
            super.OnExit();
        }
        OnUpdate(dt) {
        }
        OnUpdateRoomInfo(message) {
            let roomInfo = message;
            this._ui.UpdateRoomInfo(roomInfo);
        }
        OnPlayerJoint(message) {
            let playerJoin = message;
            this._players.push(playerJoin.playerInfos);
            this._ui.UpdatePlayers(this._players);
            if (this._players.length == this._maxPlayers) {
                this.StartLoad(this._mapID, this._players);
            }
        }
        OnPlayerLeave(message) {
            let playerLeave = message;
            for (let i = 0; i < this._players.length; i++) {
                const player = this._players[i];
                if (player.gcNID == playerLeave.gcNID) {
                    this._players.splice(i, 1);
                    this._ui.UpdatePlayers(this._players);
                    return;
                }
            }
        }
        OnEnterBattle(message) {
            let enterBattle = message;
            if (enterBattle.error != protos_6.Protos.CS2GC_EnterBattle.Error.Success) {
                this._ui.OnEnterBattleResult(enterBattle.error);
            }
            else {
                let connector = Connector_2.Connector.bsConnector;
                connector.onerror = () => this._ui.OnConnectToBSError();
                connector.onopen = () => {
                    Debug_2.Debug.Log("BS Connected");
                    let askLogin = ProtoHelper_4.ProtoCreator.Q_GC2BS_AskLogin();
                    askLogin.sessionID = enterBattle.gcNID;
                    connector.Send(protos_6.Protos.GC2BS_AskLogin, askLogin, message => {
                        let resp = message;
                        this._ui.OnLoginBSResut(resp.result);
                    });
                };
                connector.Connect(enterBattle.ip, enterBattle.port);
            }
        }
        BeginMatch() {
            let beginMatch = ProtoHelper_4.ProtoCreator.Q_GC2CS_BeginMatch();
            beginMatch.actorID = 0;
            Connector_2.Connector.SendToCS(protos_6.Protos.GC2CS_BeginMatch, beginMatch, message => {
                let resp = message;
                this._ui.OnBeginMatchResult(resp.result);
                switch (resp.result) {
                    case protos_6.Protos.CS2GC_BeginMatchRet.EResult.Success:
                        this._roomID = resp.id;
                        this._mapID = resp.mapID;
                        this._maxPlayers = resp.maxPlayer;
                        for (let i = 0; i < resp.playerInfos.length; i++) {
                            const playerInfo = resp.playerInfos[i];
                            this._players.push(playerInfo);
                        }
                        this._ui.UpdatePlayers(this._players);
                        Debug_2.Debug.Log("begin match");
                        break;
                }
            });
        }
        StartLoad(mapID, playInfos) {
            Debug_2.Debug.Log("start load");
            this.OnLoadComplete();
        }
        OnLoadComplete() {
            let msg = ProtoHelper_4.ProtoCreator.Q_GC2CS_UpdatePlayerInfo();
            msg.progress = 100;
            Connector_2.Connector.SendToCS(protos_6.Protos.GC2CS_UpdatePlayerInfo, msg);
        }
    }
    exports.MatchingState = MatchingState;
});
define("UI/UIMain", ["require", "exports", "Scene/SceneManager"], function (require, exports, SceneManager_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class UIMain {
        get root() { return this._root; }
        constructor() {
            fairygui.UIPackage.addPackage("res/ui/main");
            this._root = fairygui.UIPackage.createObject("main", "Main").asCom;
            this._root.getChild("n3").onClick(this, this.OnAutoMatchBtnClick);
        }
        Dispose() {
        }
        Enter(param) {
            fairygui.GRoot.inst.addChild(this._root);
            this._root.getTransition("t0").play(new laya.utils.Handler(this, () => {
                this._root.getController("c1").selectedIndex = 1;
                this._root.getTransition("t1").play();
            }), 0, 0, 0, -1);
        }
        Exit() {
            fairygui.GRoot.inst.removeChild(this._root);
        }
        Update(dt) {
        }
        OnResize(e) {
        }
        OnAutoMatchBtnClick() {
            SceneManager_3.SceneManager.ChangeState(SceneManager_3.SceneManager.State.Matching);
        }
    }
    exports.UIMain = UIMain;
});
define("Scene/MainState", ["require", "exports", "Scene/SceneState", "UI/UIManager"], function (require, exports, SceneState_3, UIManager_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class MainState extends SceneState_3.SceneState {
        constructor(type) {
            super(type);
            this.__ui = this._ui = UIManager_3.UIManager.main;
        }
    }
    exports.MainState = MainState;
});
define("Scene/GlobalState", ["require", "exports", "Scene/SceneState", "Net/Connector", "UI/UIAlert", "Misc/Debug", "../libs/protos", "Scene/SceneManager"], function (require, exports, SceneState_4, Connector_3, UIAlert_2, Debug_3, protos_7, SceneManager_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GlobalState extends SceneState_4.SceneState {
        constructor(type) {
            super(type);
            Connector_3.Connector.gsConnector.onclose = this.HandleGSDisconnect;
            Connector_3.Connector.AddListener(Connector_3.Connector.ConnectorType.GS, protos_7.Protos.MsgID.eGS2GC_Kick, this.HandleKick);
        }
        HandleGSDisconnect(e) {
            RC.Logger.Log("gs connection closed.");
            UIAlert_2.UIAlert.Show("与服务器断开连接", () => SceneManager_4.SceneManager.ChangeState(SceneManager_4.SceneManager.State.Login, null, true), true);
        }
        HandleKick(message) {
            Debug_3.Debug.Log("kick by server");
            let kick = message;
            switch (kick.reason) {
                case protos_7.Protos.CS2GS_KickGC.EReason.DuplicateLogin:
                    UIAlert_2.UIAlert.Show("另一台设备正在登陆相同的账号", () => SceneManager_4.SceneManager.ChangeState(SceneManager_4.SceneManager.State.Login, null, true), true);
                    break;
                default:
                    UIAlert_2.UIAlert.Show("已被服务器强制下线", () => SceneManager_4.SceneManager.ChangeState(SceneManager_4.SceneManager.State.Login, null, true), true);
                    break;
            }
        }
    }
    exports.GlobalState = GlobalState;
});
define("Scene/SceneManager", ["require", "exports", "FSM/FSM", "Scene/LoginState", "Scene/MatchingState", "Scene/MainState", "Scene/GlobalState"], function (require, exports, FSM_1, LoginState_1, MatchingState_1, MainState_1, GlobalState_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var State;
    (function (State) {
        State[State["Global"] = 0] = "Global";
        State[State["Main"] = 1] = "Main";
        State[State["Login"] = 2] = "Login";
        State[State["Matching"] = 3] = "Matching";
        State[State["Battle"] = 4] = "Battle";
    })(State || (State = {}));
    class SceneManager {
        static get login() { return this._login; }
        static get matching() { return this._matching; }
        static Init() {
            this._main = new MainState_1.MainState(State.Main);
            this._login = new LoginState_1.LoginState(State.Login);
            this._matching = new MatchingState_1.MatchingState(State.Matching);
            this.fsm = new FSM_1.FSM();
            this.fsm.globalState = new GlobalState_1.GlobalState(State.Global);
            this.fsm.AddState(this._main);
            this.fsm.AddState(this._login);
            this.fsm.AddState(this._matching);
        }
        static ChangeState(state, param = null, force = false) {
            this.fsm.ChangeState(state, param, force);
        }
        static Update(dt) {
            this.fsm.Update(dt);
        }
    }
    SceneManager.State = State;
    exports.SceneManager = SceneManager;
});
define("UI/UILogin", ["require", "exports", "../libs/protos", "UI/UIAlert", "Scene/SceneManager"], function (require, exports, protos_8, UIAlert_3, SceneManager_5) {
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
        Enter() {
            this.show();
            this.center();
            this.BackToLogin();
        }
        Exit() {
            this.hide();
        }
        AnimIn() {
        }
        AnimOut() {
        }
        Update(dt) {
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
                UIAlert_3.UIAlert.Show("无效的用户名");
                return;
            }
            this.showModalWait();
            SceneManager_5.SceneManager.login.RequestRegister(regName, 0, 0);
        }
        OnLoginBtnClick() {
            let uname = this.contentPane.getChild("name").asTextField.text;
            if (uname == "") {
                UIAlert_3.UIAlert.Show("无效用户名");
                return;
            }
            this.showModalWait();
            SceneManager_5.SceneManager.login.RequestLogin(uname, 0, 0);
        }
        OnEnterBtnClick() {
            let item = this._areaList.getChildAt(this._areaList.selectedIndex);
            let data = item.data["data"];
            this.showModalWait();
            SceneManager_5.SceneManager.login.RequestLoginGS(data.ip, data.port, data.password, item.data["sid"]);
        }
        OnAreaClick() {
        }
        OnRegisterResult(resp) {
            this.closeModalWait();
            switch (resp.result) {
                case protos_8.Protos.LS2GC_AskRegRet.EResult.Success:
                    this.contentPane.getChild("name").asTextField.text = this.contentPane.getChild("reg_name").asTextField.text;
                    this.contentPane.getController("c1").selectedIndex = 0;
                    UIAlert_3.UIAlert.Show("注册成功");
                    break;
                case protos_8.Protos.LS2GC_AskRegRet.EResult.Failed:
                    UIAlert_3.UIAlert.Show("注册失败", this.BackToRegister.bind(this));
                    break;
                case protos_8.Protos.LS2GC_AskRegRet.EResult.UnameExists:
                    UIAlert_3.UIAlert.Show("用户名已存在", this.BackToRegister.bind(this));
                    break;
                case protos_8.Protos.LS2GC_AskRegRet.EResult.UnameIllegal:
                    UIAlert_3.UIAlert.Show("无效的用户名", this.BackToRegister.bind(this));
                    break;
                case protos_8.Protos.LS2GC_AskRegRet.EResult.PwdIllegal:
                    UIAlert_3.UIAlert.Show("无效的密码", this.BackToRegister.bind(this));
                    break;
            }
        }
        OnLoginResut(resp) {
            this.closeModalWait();
            switch (resp.result) {
                case protos_8.Protos.LS2GC_AskLoginRet.EResult.Success:
                    this.HandleLoginLSSuccess(resp);
                    break;
                case protos_8.Protos.LS2GC_AskLoginRet.EResult.Failed:
                    UIAlert_3.UIAlert.Show("登陆失败", this.BackToLogin.bind(this));
                    break;
                case protos_8.Protos.LS2GC_AskLoginRet.EResult.InvalidUname:
                    UIAlert_3.UIAlert.Show("请输入正确的用户名", this.BackToLogin.bind(this));
                    break;
                case protos_8.Protos.LS2GC_AskLoginRet.EResult.InvalidPwd:
                    UIAlert_3.UIAlert.Show("请输入正确的密码", this.BackToLogin.bind(this));
                    break;
            }
        }
        OnConnectToLSError(confirmCallback) {
            UIAlert_3.UIAlert.Show("无法连接服务器", confirmCallback);
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
        OnConnectToGSError() {
            this.closeModalWait();
            UIAlert_3.UIAlert.Show("无法连接服务器", this.BackToLogin.bind(this));
        }
        OnLoginGSResult(resp) {
            this.closeModalWait();
            switch (resp.result) {
                case protos_8.Protos.GS2GC_LoginRet.EResult.SessionExpire:
                    UIAlert_3.UIAlert.Show("登陆失败或凭证已过期", this.BackToLogin.bind(this));
                    break;
            }
        }
    }
    exports.UILogin = UILogin;
});
define("UI/UIManager", ["require", "exports", "UI/UILogin", "UI/UIMain", "UI/UIMatching"], function (require, exports, UILogin_1, UIMain_1, UIMatching_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class UIManager {
        static get login() { return UIManager._login; }
        static get main() { return UIManager._main; }
        static get matching() { return UIManager._matching; }
        static Init() {
            Laya.stage.addChild(fairygui.GRoot.inst.displayObject);
            fairygui.UIPackage.addPackage("res/ui/global");
            fairygui.UIConfig.globalModalWaiting = fairygui.UIPackage.getItemURL("global", "modelWait");
            fairygui.UIConfig.windowModalWaiting = fairygui.UIPackage.getItemURL("global", "modelWait");
            fairygui.UIConfig.buttonSound = fairygui.UIPackage.getItemURL("global", "click");
            UIManager._main = new UIMain_1.UIMain();
            UIManager._login = new UILogin_1.UILogin();
            UIManager._matching = new UIMatching_1.UIMatching();
            UIManager._uis = [];
            UIManager._uis[0] = UIManager._main;
            UIManager._uis[1] = UIManager._login;
            UIManager._uis[2] = UIManager._matching;
        }
        static Dispose() {
            for (let i = 0; i < UIManager._uis.length; i++) {
                UIManager._uis[i].Dispose();
            }
        }
        static OnResize(e) {
            for (let i = 0; i < UIManager._uis.length; i++) {
                UIManager._uis[i].OnResize(e);
            }
        }
    }
    exports.UIManager = UIManager;
});
define("Main", ["require", "exports", "UI/UIManager", "Model/Defs", "Net/Connector", "Scene/SceneManager", "Misc/Debug"], function (require, exports, UIManager_4, Defs_2, Connector_4, SceneManager_6, Debug_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Main {
        static get instance() { return Main._instance; }
        constructor() {
            Main._instance = this;
            Laya.MiniAdpter.init();
            Laya.init(1280, 720);
            Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_HEIGHT;
            Laya.stage.alignH = Laya.Stage.ALIGN_LEFT;
            Laya.stage.alignV = Laya.Stage.ALIGN_TOP;
            Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;
            this.LoadDefs();
        }
        LoadDefs() {
            Debug_4.Debug.Log("loading defs...");
            Laya.loader.load("res/defs/b_defs.json", Laya.Handler.create(this, this.OnDefsLoadComplete), undefined, Laya.Loader.JSON);
        }
        OnDefsLoadComplete() {
            let json = Laya.loader.getRes("res/defs/b_defs.json");
            Defs_2.Defs.Init(json);
            this.LoadUIRes();
        }
        LoadUIRes() {
            Debug_4.Debug.Log("loading res...");
            let preloads = Defs_2.Defs.GetPreloads();
            let urls = [];
            for (let u of preloads) {
                let ss = u.split(",");
                let loadType;
                switch (ss[1]) {
                    case "1":
                        loadType = Laya.Loader.IMAGE;
                        break;
                    case "2":
                        loadType = Laya.Loader.SOUND;
                        break;
                    default:
                        loadType = Laya.Loader.BUFFER;
                        break;
                }
                urls.push({ url: "res/ui/" + ss[0], type: loadType });
            }
            Laya.loader.load(urls, Laya.Handler.create(this, this.OnUIResLoadComplete));
        }
        OnUIResLoadComplete() {
            this.StartGame();
        }
        StartGame() {
            Debug_4.Debug.Log("start game...");
            Connector_4.Connector.Init();
            UIManager_4.UIManager.Init();
            SceneManager_6.SceneManager.Init();
            SceneManager_6.SceneManager.ChangeState(SceneManager_6.SceneManager.State.Login);
            fairygui.GRoot.inst.on(fairygui.Events.SIZE_CHANGED, this, this.OnResize);
            Laya.timer.frameLoop(1, this, this.Update);
        }
        Update() {
            let dt = Laya.timer.delta;
            Connector_4.Connector.Update(dt);
            SceneManager_6.SceneManager.Update(dt);
        }
        OnResize(e) {
            UIManager_4.UIManager.OnResize(e);
        }
    }
    exports.Main = Main;
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
define("Scene/BattleState", ["require", "exports", "Scene/SceneState", "Net/Connector", "../libs/protos", "Misc/Debug"], function (require, exports, SceneState_5, Connector_5, protos_9, Debug_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class LoginState extends SceneState_5.SceneState {
        constructor(type) {
            super(type);
        }
        OnEnter(param) {
            super.OnEnter(param);
            Connector_5.Connector.AddListener(Connector_5.Connector.ConnectorType.BS, protos_9.Protos.MsgID.eBS2GC_BattleStart, this.OnBattleStart.bind(this));
            Connector_5.Connector.AddListener(Connector_5.Connector.ConnectorType.BS, protos_9.Protos.MsgID.eBS2GC_BattleEnd, this.OnBattleEnd.bind(this));
        }
        OnExit() {
            Connector_5.Connector.RemoveListener(Connector_5.Connector.ConnectorType.BS, protos_9.Protos.MsgID.eBS2GC_BattleStart, this.OnBattleStart.bind(this));
            Connector_5.Connector.RemoveListener(Connector_5.Connector.ConnectorType.BS, protos_9.Protos.MsgID.eBS2GC_BattleEnd, this.OnBattleEnd.bind(this));
            super.OnExit();
        }
        OnUpdate(dt) {
        }
        OnBattleStart(message) {
            let battleStart = message;
            Debug_5.Debug.Log("battle start");
        }
        OnBattleEnd(message) {
            let battleStart = message;
            Debug_5.Debug.Log("battle end");
        }
    }
    exports.LoginState = LoginState;
});
//# sourceMappingURL=main.js.map