import * as $protobuf from "protobufjs";
export namespace Protos {

    interface IBSInfo {
        id?: (number|null);
        ip?: (string|null);
        port?: (number|null);
        state?: (Protos.BSInfo.State|null);
    }

    class BSInfo implements IBSInfo {
        constructor(properties?: Protos.IBSInfo);
        public id: number;
        public ip: string;
        public port: number;
        public state: Protos.BSInfo.State;
        public static create(properties?: Protos.IBSInfo): Protos.BSInfo;
        public static encode(message: Protos.IBSInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.IBSInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.BSInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.BSInfo;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.BSInfo;
        public static toObject(message: Protos.BSInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    namespace BSInfo {

        enum State {
            Free = 0,
            Busy = 1,
            Full = 2,
            Close = 3
        }
    }

    interface IBS2CS_ReportState {
        opts?: (Protos.IMsgOpts|null);
        bsInfo?: (Protos.IBSInfo|null);
    }

    class BS2CS_ReportState implements IBS2CS_ReportState {
        constructor(properties?: Protos.IBS2CS_ReportState);
        public opts?: (Protos.IMsgOpts|null);
        public bsInfo?: (Protos.IBSInfo|null);
        public static create(properties?: Protos.IBS2CS_ReportState): Protos.BS2CS_ReportState;
        public static encode(message: Protos.IBS2CS_ReportState, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.IBS2CS_ReportState, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.BS2CS_ReportState;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.BS2CS_ReportState;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.BS2CS_ReportState;
        public static toObject(message: Protos.BS2CS_ReportState, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IBS2CS_GCAskLogin {
        opts?: (Protos.IMsgOpts|null);
        sessionID?: (Long|null);
    }

    class BS2CS_GCAskLogin implements IBS2CS_GCAskLogin {
        constructor(properties?: Protos.IBS2CS_GCAskLogin);
        public opts?: (Protos.IMsgOpts|null);
        public sessionID: Long;
        public static create(properties?: Protos.IBS2CS_GCAskLogin): Protos.BS2CS_GCAskLogin;
        public static encode(message: Protos.IBS2CS_GCAskLogin, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.IBS2CS_GCAskLogin, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.BS2CS_GCAskLogin;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.BS2CS_GCAskLogin;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.BS2CS_GCAskLogin;
        public static toObject(message: Protos.BS2CS_GCAskLogin, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IBS2CS_GCLost {
        opts?: (Protos.IMsgOpts|null);
        sessionID?: (Long|null);
    }

    class BS2CS_GCLost implements IBS2CS_GCLost {
        constructor(properties?: Protos.IBS2CS_GCLost);
        public opts?: (Protos.IMsgOpts|null);
        public sessionID: Long;
        public static create(properties?: Protos.IBS2CS_GCLost): Protos.BS2CS_GCLost;
        public static encode(message: Protos.IBS2CS_GCLost, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.IBS2CS_GCLost, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.BS2CS_GCLost;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.BS2CS_GCLost;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.BS2CS_GCLost;
        public static toObject(message: Protos.BS2CS_GCLost, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IBS2CS_RommInfoRet {
        opts?: (Protos.IMsgOpts|null);
    }

    class BS2CS_RommInfoRet implements IBS2CS_RommInfoRet {
        constructor(properties?: Protos.IBS2CS_RommInfoRet);
        public opts?: (Protos.IMsgOpts|null);
        public static create(properties?: Protos.IBS2CS_RommInfoRet): Protos.BS2CS_RommInfoRet;
        public static encode(message: Protos.IBS2CS_RommInfoRet, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.IBS2CS_RommInfoRet, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.BS2CS_RommInfoRet;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.BS2CS_RommInfoRet;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.BS2CS_RommInfoRet;
        public static toObject(message: Protos.BS2CS_RommInfoRet, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    enum MsgID {
        Undefine = 0,
        eG_AskPing = 10,
        eG_AskPingRet = 11,
        eGC2LS_AskRegister = 1000,
        eGC2LS_AskLogin = 1001,
        eGC2GS_AskLogin = 1100,
        eGC2GS_KeepAlive = 1101,
        eGC2BS_AskLogin = 1200,
        eGC2BS_KeepAlive = 1201,
        eGC2CS_BeginMatch = 1300,
        eLS2GC_GSInfo = 2000,
        eLS2GC_AskRegRet = 2001,
        eLS2GC_AskLoginRet = 2002,
        eLS2CS_GCLogin = 2100,
        eLS2DB_QueryAccount = 2200,
        eLS2DB_QueryLogin = 2201,
        eLS2DB_Exec = 2202,
        eGS2CS_ReportState = 3000,
        eGS2CS_GCAskLogin = 3001,
        eGS2CS_GCLost = 3002,
        eGS2GC_LoginRet = 3100,
        eBS2CS_ReportState = 4000,
        eBS2CS_GCAskLogin = 4001,
        eBS2CS_GCLost = 4002,
        eBS2CS_RommInfoRet = 4003,
        eBS2GC_LoginRet = 4100,
        eCS2LS_GSInfos = 5000,
        eCS2LS_GSInfo = 5001,
        eCS2LS_GSLost = 5002,
        eCS2LS_GCLoginRet = 5003,
        eCS2GS_GCLoginRet = 5100,
        eCS2BS_GCLoginRet = 5200,
        eCS2BS_RoomInfo = 5201,
        eCS2GC_BeginMatchRet = 5300,
        eDB2LS_QueryAccountRet = 8000,
        eDB2LS_QueryLoginRet = 8001,
        eDB2LS_ExecRet = 8002
    }

    interface IMsgOpts {
        flag?: (number|null);
        pid?: (number|null);
        rpid?: (number|null);
        transid?: (Long|null);
    }

    class MsgOpts implements IMsgOpts {
        constructor(properties?: Protos.IMsgOpts);
        public flag: number;
        public pid: number;
        public rpid: number;
        public transid: Long;
        public static create(properties?: Protos.IMsgOpts): Protos.MsgOpts;
        public static encode(message: Protos.IMsgOpts, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.IMsgOpts, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.MsgOpts;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.MsgOpts;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.MsgOpts;
        public static toObject(message: Protos.MsgOpts, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    namespace MsgOpts {

        enum Flag {
            Norm = 0,
            RPC = 1,
            RESP = 2,
            TRANS = 3
        }

        enum TransTarget {
            GC = 0,
            CS = 1,
            BS = 2,
            LS = 3,
            DB = 4,
            GS = 5
        }
    }

    interface IG_AskPing {
        opts?: (Protos.IMsgOpts|null);
        time?: (Long|null);
    }

    class G_AskPing implements IG_AskPing {
        constructor(properties?: Protos.IG_AskPing);
        public opts?: (Protos.IMsgOpts|null);
        public time: Long;
        public static create(properties?: Protos.IG_AskPing): Protos.G_AskPing;
        public static encode(message: Protos.IG_AskPing, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.IG_AskPing, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.G_AskPing;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.G_AskPing;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.G_AskPing;
        public static toObject(message: Protos.G_AskPing, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IG_AskPingRet {
        opts?: (Protos.IMsgOpts|null);
        stime?: (Long|null);
        time?: (Long|null);
    }

    class G_AskPingRet implements IG_AskPingRet {
        constructor(properties?: Protos.IG_AskPingRet);
        public opts?: (Protos.IMsgOpts|null);
        public stime: Long;
        public time: Long;
        public static create(properties?: Protos.IG_AskPingRet): Protos.G_AskPingRet;
        public static encode(message: Protos.IG_AskPingRet, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.IG_AskPingRet, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.G_AskPingRet;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.G_AskPingRet;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.G_AskPingRet;
        public static toObject(message: Protos.G_AskPingRet, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IBS2GC_LoginRet {
        opts?: (Protos.IMsgOpts|null);
        result?: (Protos.BS2GC_LoginRet.EResult|null);
    }

    class BS2GC_LoginRet implements IBS2GC_LoginRet {
        constructor(properties?: Protos.IBS2GC_LoginRet);
        public opts?: (Protos.IMsgOpts|null);
        public result: Protos.BS2GC_LoginRet.EResult;
        public static create(properties?: Protos.IBS2GC_LoginRet): Protos.BS2GC_LoginRet;
        public static encode(message: Protos.IBS2GC_LoginRet, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.IBS2GC_LoginRet, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.BS2GC_LoginRet;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.BS2GC_LoginRet;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.BS2GC_LoginRet;
        public static toObject(message: Protos.BS2GC_LoginRet, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    namespace BS2GC_LoginRet {

        enum EResult {
            Success = 0,
            Failed = 1
        }
    }

    interface ICS2BS_GCLoginRet {
        opts?: (Protos.IMsgOpts|null);
        result?: (Protos.CS2BS_GCLoginRet.EResult|null);
    }

    class CS2BS_GCLoginRet implements ICS2BS_GCLoginRet {
        constructor(properties?: Protos.ICS2BS_GCLoginRet);
        public opts?: (Protos.IMsgOpts|null);
        public result: Protos.CS2BS_GCLoginRet.EResult;
        public static create(properties?: Protos.ICS2BS_GCLoginRet): Protos.CS2BS_GCLoginRet;
        public static encode(message: Protos.ICS2BS_GCLoginRet, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.ICS2BS_GCLoginRet, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.CS2BS_GCLoginRet;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.CS2BS_GCLoginRet;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.CS2BS_GCLoginRet;
        public static toObject(message: Protos.CS2BS_GCLoginRet, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    namespace CS2BS_GCLoginRet {

        enum EResult {
            Success = 0,
            Failed = 1
        }
    }

    interface IBS_PlayerInfo {
        gsid?: (number|null);
    }

    class BS_PlayerInfo implements IBS_PlayerInfo {
        constructor(properties?: Protos.IBS_PlayerInfo);
        public gsid: number;
        public static create(properties?: Protos.IBS_PlayerInfo): Protos.BS_PlayerInfo;
        public static encode(message: Protos.IBS_PlayerInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.IBS_PlayerInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.BS_PlayerInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.BS_PlayerInfo;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.BS_PlayerInfo;
        public static toObject(message: Protos.BS_PlayerInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ICS2BS_RoomInfo {
        opts?: (Protos.IMsgOpts|null);
        playerInfo?: (Protos.IBS_PlayerInfo[]|null);
    }

    class CS2BS_RoomInfo implements ICS2BS_RoomInfo {
        constructor(properties?: Protos.ICS2BS_RoomInfo);
        public opts?: (Protos.IMsgOpts|null);
        public playerInfo: Protos.IBS_PlayerInfo[];
        public static create(properties?: Protos.ICS2BS_RoomInfo): Protos.CS2BS_RoomInfo;
        public static encode(message: Protos.ICS2BS_RoomInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.ICS2BS_RoomInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.CS2BS_RoomInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.CS2BS_RoomInfo;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.CS2BS_RoomInfo;
        public static toObject(message: Protos.CS2BS_RoomInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ICS2GC_BeginMatchRet {
        opts?: (Protos.IMsgOpts|null);
    }

    class CS2GC_BeginMatchRet implements ICS2GC_BeginMatchRet {
        constructor(properties?: Protos.ICS2GC_BeginMatchRet);
        public opts?: (Protos.IMsgOpts|null);
        public static create(properties?: Protos.ICS2GC_BeginMatchRet): Protos.CS2GC_BeginMatchRet;
        public static encode(message: Protos.ICS2GC_BeginMatchRet, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.ICS2GC_BeginMatchRet, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.CS2GC_BeginMatchRet;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.CS2GC_BeginMatchRet;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.CS2GC_BeginMatchRet;
        public static toObject(message: Protos.CS2GC_BeginMatchRet, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ICS2GS_GCLoginRet {
        opts?: (Protos.IMsgOpts|null);
        result?: (Protos.CS2GS_GCLoginRet.EResult|null);
    }

    class CS2GS_GCLoginRet implements ICS2GS_GCLoginRet {
        constructor(properties?: Protos.ICS2GS_GCLoginRet);
        public opts?: (Protos.IMsgOpts|null);
        public result: Protos.CS2GS_GCLoginRet.EResult;
        public static create(properties?: Protos.ICS2GS_GCLoginRet): Protos.CS2GS_GCLoginRet;
        public static encode(message: Protos.ICS2GS_GCLoginRet, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.ICS2GS_GCLoginRet, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.CS2GS_GCLoginRet;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.CS2GS_GCLoginRet;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.CS2GS_GCLoginRet;
        public static toObject(message: Protos.CS2GS_GCLoginRet, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    namespace CS2GS_GCLoginRet {

        enum EResult {
            Success = 0,
            Failed = 1
        }
    }

    interface ICS2LS_GSInfos {
        opts?: (Protos.IMsgOpts|null);
        gsInfo?: (Protos.IGSInfo[]|null);
    }

    class CS2LS_GSInfos implements ICS2LS_GSInfos {
        constructor(properties?: Protos.ICS2LS_GSInfos);
        public opts?: (Protos.IMsgOpts|null);
        public gsInfo: Protos.IGSInfo[];
        public static create(properties?: Protos.ICS2LS_GSInfos): Protos.CS2LS_GSInfos;
        public static encode(message: Protos.ICS2LS_GSInfos, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.ICS2LS_GSInfos, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.CS2LS_GSInfos;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.CS2LS_GSInfos;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.CS2LS_GSInfos;
        public static toObject(message: Protos.CS2LS_GSInfos, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ICS2LS_GSInfo {
        opts?: (Protos.IMsgOpts|null);
        gsInfo?: (Protos.IGSInfo|null);
    }

    class CS2LS_GSInfo implements ICS2LS_GSInfo {
        constructor(properties?: Protos.ICS2LS_GSInfo);
        public opts?: (Protos.IMsgOpts|null);
        public gsInfo?: (Protos.IGSInfo|null);
        public static create(properties?: Protos.ICS2LS_GSInfo): Protos.CS2LS_GSInfo;
        public static encode(message: Protos.ICS2LS_GSInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.ICS2LS_GSInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.CS2LS_GSInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.CS2LS_GSInfo;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.CS2LS_GSInfo;
        public static toObject(message: Protos.CS2LS_GSInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ICS2LS_GSLost {
        opts?: (Protos.IMsgOpts|null);
        gsid?: (number|null);
    }

    class CS2LS_GSLost implements ICS2LS_GSLost {
        constructor(properties?: Protos.ICS2LS_GSLost);
        public opts?: (Protos.IMsgOpts|null);
        public gsid: number;
        public static create(properties?: Protos.ICS2LS_GSLost): Protos.CS2LS_GSLost;
        public static encode(message: Protos.ICS2LS_GSLost, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.ICS2LS_GSLost, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.CS2LS_GSLost;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.CS2LS_GSLost;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.CS2LS_GSLost;
        public static toObject(message: Protos.CS2LS_GSLost, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ICS2LS_GCLoginRet {
        opts?: (Protos.IMsgOpts|null);
        result?: (Protos.CS2LS_GCLoginRet.EResult|null);
    }

    class CS2LS_GCLoginRet implements ICS2LS_GCLoginRet {
        constructor(properties?: Protos.ICS2LS_GCLoginRet);
        public opts?: (Protos.IMsgOpts|null);
        public result: Protos.CS2LS_GCLoginRet.EResult;
        public static create(properties?: Protos.ICS2LS_GCLoginRet): Protos.CS2LS_GCLoginRet;
        public static encode(message: Protos.ICS2LS_GCLoginRet, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.ICS2LS_GCLoginRet, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.CS2LS_GCLoginRet;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.CS2LS_GCLoginRet;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.CS2LS_GCLoginRet;
        public static toObject(message: Protos.CS2LS_GCLoginRet, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    namespace CS2LS_GCLoginRet {

        enum EResult {
            Success = 0,
            Failed = 1
        }
    }

    interface IGSInfo {
        id?: (number|null);
        name?: (string|null);
        ip?: (string|null);
        port?: (number|null);
        password?: (string|null);
        state?: (Protos.GSInfo.State|null);
    }

    class GSInfo implements IGSInfo {
        constructor(properties?: Protos.IGSInfo);
        public id: number;
        public name: string;
        public ip: string;
        public port: number;
        public password: string;
        public state: Protos.GSInfo.State;
        public static create(properties?: Protos.IGSInfo): Protos.GSInfo;
        public static encode(message: Protos.IGSInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.IGSInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.GSInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.GSInfo;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.GSInfo;
        public static toObject(message: Protos.GSInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    namespace GSInfo {

        enum State {
            Free = 0,
            Busy = 1,
            Full = 2,
            Close = 3
        }
    }

    interface IGS2CS_ReportState {
        opts?: (Protos.IMsgOpts|null);
        gsInfo?: (Protos.IGSInfo|null);
    }

    class GS2CS_ReportState implements IGS2CS_ReportState {
        constructor(properties?: Protos.IGS2CS_ReportState);
        public opts?: (Protos.IMsgOpts|null);
        public gsInfo?: (Protos.IGSInfo|null);
        public static create(properties?: Protos.IGS2CS_ReportState): Protos.GS2CS_ReportState;
        public static encode(message: Protos.IGS2CS_ReportState, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.IGS2CS_ReportState, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.GS2CS_ReportState;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.GS2CS_ReportState;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.GS2CS_ReportState;
        public static toObject(message: Protos.GS2CS_ReportState, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGS2CS_GCAskLogin {
        opts?: (Protos.IMsgOpts|null);
        sessionID?: (Long|null);
    }

    class GS2CS_GCAskLogin implements IGS2CS_GCAskLogin {
        constructor(properties?: Protos.IGS2CS_GCAskLogin);
        public opts?: (Protos.IMsgOpts|null);
        public sessionID: Long;
        public static create(properties?: Protos.IGS2CS_GCAskLogin): Protos.GS2CS_GCAskLogin;
        public static encode(message: Protos.IGS2CS_GCAskLogin, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.IGS2CS_GCAskLogin, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.GS2CS_GCAskLogin;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.GS2CS_GCAskLogin;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.GS2CS_GCAskLogin;
        public static toObject(message: Protos.GS2CS_GCAskLogin, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGS2CS_GCLost {
        opts?: (Protos.IMsgOpts|null);
        sessionID?: (Long|null);
    }

    class GS2CS_GCLost implements IGS2CS_GCLost {
        constructor(properties?: Protos.IGS2CS_GCLost);
        public opts?: (Protos.IMsgOpts|null);
        public sessionID: Long;
        public static create(properties?: Protos.IGS2CS_GCLost): Protos.GS2CS_GCLost;
        public static encode(message: Protos.IGS2CS_GCLost, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.IGS2CS_GCLost, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.GS2CS_GCLost;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.GS2CS_GCLost;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.GS2CS_GCLost;
        public static toObject(message: Protos.GS2CS_GCLost, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    enum DB2LS_QueryResult {
        Success = 0,
        Failed = 1,
        UsernameExist = 2,
        InvalidUname = 3,
        InvalidPwd = 4
    }

    interface IDB2LS_QueryAccountRet {
        opts?: (Protos.IMsgOpts|null);
        result?: (Protos.DB2LS_QueryResult|null);
    }

    class DB2LS_QueryAccountRet implements IDB2LS_QueryAccountRet {
        constructor(properties?: Protos.IDB2LS_QueryAccountRet);
        public opts?: (Protos.IMsgOpts|null);
        public result: Protos.DB2LS_QueryResult;
        public static create(properties?: Protos.IDB2LS_QueryAccountRet): Protos.DB2LS_QueryAccountRet;
        public static encode(message: Protos.IDB2LS_QueryAccountRet, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.IDB2LS_QueryAccountRet, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.DB2LS_QueryAccountRet;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.DB2LS_QueryAccountRet;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.DB2LS_QueryAccountRet;
        public static toObject(message: Protos.DB2LS_QueryAccountRet, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IDB2LS_QueryLoginRet {
        opts?: (Protos.IMsgOpts|null);
        result?: (Protos.DB2LS_QueryResult|null);
        ukey?: (number|null);
    }

    class DB2LS_QueryLoginRet implements IDB2LS_QueryLoginRet {
        constructor(properties?: Protos.IDB2LS_QueryLoginRet);
        public opts?: (Protos.IMsgOpts|null);
        public result: Protos.DB2LS_QueryResult;
        public ukey: number;
        public static create(properties?: Protos.IDB2LS_QueryLoginRet): Protos.DB2LS_QueryLoginRet;
        public static encode(message: Protos.IDB2LS_QueryLoginRet, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.IDB2LS_QueryLoginRet, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.DB2LS_QueryLoginRet;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.DB2LS_QueryLoginRet;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.DB2LS_QueryLoginRet;
        public static toObject(message: Protos.DB2LS_QueryLoginRet, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IDB2LS_ExecRet {
        opts?: (Protos.IMsgOpts|null);
        result?: (Protos.DB2LS_QueryResult|null);
        row?: (number|null);
        id?: (Long|null);
    }

    class DB2LS_ExecRet implements IDB2LS_ExecRet {
        constructor(properties?: Protos.IDB2LS_ExecRet);
        public opts?: (Protos.IMsgOpts|null);
        public result: Protos.DB2LS_QueryResult;
        public row: number;
        public id: Long;
        public static create(properties?: Protos.IDB2LS_ExecRet): Protos.DB2LS_ExecRet;
        public static encode(message: Protos.IDB2LS_ExecRet, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.IDB2LS_ExecRet, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.DB2LS_ExecRet;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.DB2LS_ExecRet;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.DB2LS_ExecRet;
        public static toObject(message: Protos.DB2LS_ExecRet, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGC2BS_AskLogin {
        opts?: (Protos.IMsgOpts|null);
        pwd?: (string|null);
        sessionID?: (Long|null);
    }

    class GC2BS_AskLogin implements IGC2BS_AskLogin {
        constructor(properties?: Protos.IGC2BS_AskLogin);
        public opts?: (Protos.IMsgOpts|null);
        public pwd: string;
        public sessionID: Long;
        public static create(properties?: Protos.IGC2BS_AskLogin): Protos.GC2BS_AskLogin;
        public static encode(message: Protos.IGC2BS_AskLogin, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.IGC2BS_AskLogin, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.GC2BS_AskLogin;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.GC2BS_AskLogin;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.GC2BS_AskLogin;
        public static toObject(message: Protos.GC2BS_AskLogin, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGC2BS_KeepAlive {
        opts?: (Protos.IMsgOpts|null);
    }

    class GC2BS_KeepAlive implements IGC2BS_KeepAlive {
        constructor(properties?: Protos.IGC2BS_KeepAlive);
        public opts?: (Protos.IMsgOpts|null);
        public static create(properties?: Protos.IGC2BS_KeepAlive): Protos.GC2BS_KeepAlive;
        public static encode(message: Protos.IGC2BS_KeepAlive, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.IGC2BS_KeepAlive, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.GC2BS_KeepAlive;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.GC2BS_KeepAlive;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.GC2BS_KeepAlive;
        public static toObject(message: Protos.GC2BS_KeepAlive, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGC2CS_BeginMatch {
        opts?: (Protos.IMsgOpts|null);
    }

    class GC2CS_BeginMatch implements IGC2CS_BeginMatch {
        constructor(properties?: Protos.IGC2CS_BeginMatch);
        public opts?: (Protos.IMsgOpts|null);
        public static create(properties?: Protos.IGC2CS_BeginMatch): Protos.GC2CS_BeginMatch;
        public static encode(message: Protos.IGC2CS_BeginMatch, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.IGC2CS_BeginMatch, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.GC2CS_BeginMatch;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.GC2CS_BeginMatch;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.GC2CS_BeginMatch;
        public static toObject(message: Protos.GC2CS_BeginMatch, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGC2GS_AskLogin {
        opts?: (Protos.IMsgOpts|null);
        pwd?: (string|null);
        sessionID?: (Long|null);
    }

    class GC2GS_AskLogin implements IGC2GS_AskLogin {
        constructor(properties?: Protos.IGC2GS_AskLogin);
        public opts?: (Protos.IMsgOpts|null);
        public pwd: string;
        public sessionID: Long;
        public static create(properties?: Protos.IGC2GS_AskLogin): Protos.GC2GS_AskLogin;
        public static encode(message: Protos.IGC2GS_AskLogin, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.IGC2GS_AskLogin, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.GC2GS_AskLogin;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.GC2GS_AskLogin;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.GC2GS_AskLogin;
        public static toObject(message: Protos.GC2GS_AskLogin, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGC2GS_KeepAlive {
        opts?: (Protos.IMsgOpts|null);
    }

    class GC2GS_KeepAlive implements IGC2GS_KeepAlive {
        constructor(properties?: Protos.IGC2GS_KeepAlive);
        public opts?: (Protos.IMsgOpts|null);
        public static create(properties?: Protos.IGC2GS_KeepAlive): Protos.GC2GS_KeepAlive;
        public static encode(message: Protos.IGC2GS_KeepAlive, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.IGC2GS_KeepAlive, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.GC2GS_KeepAlive;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.GC2GS_KeepAlive;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.GC2GS_KeepAlive;
        public static toObject(message: Protos.GC2GS_KeepAlive, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGC2LS_AskRegister {
        opts?: (Protos.IMsgOpts|null);
        sdk?: (number|null);
        name?: (string|null);
        passwd?: (string|null);
        platform?: (number|null);
    }

    class GC2LS_AskRegister implements IGC2LS_AskRegister {
        constructor(properties?: Protos.IGC2LS_AskRegister);
        public opts?: (Protos.IMsgOpts|null);
        public sdk: number;
        public name: string;
        public passwd: string;
        public platform: number;
        public static create(properties?: Protos.IGC2LS_AskRegister): Protos.GC2LS_AskRegister;
        public static encode(message: Protos.IGC2LS_AskRegister, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.IGC2LS_AskRegister, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.GC2LS_AskRegister;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.GC2LS_AskRegister;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.GC2LS_AskRegister;
        public static toObject(message: Protos.GC2LS_AskRegister, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGC2LS_AskLogin {
        opts?: (Protos.IMsgOpts|null);
        name?: (string|null);
        passwd?: (string|null);
    }

    class GC2LS_AskLogin implements IGC2LS_AskLogin {
        constructor(properties?: Protos.IGC2LS_AskLogin);
        public opts?: (Protos.IMsgOpts|null);
        public name: string;
        public passwd: string;
        public static create(properties?: Protos.IGC2LS_AskLogin): Protos.GC2LS_AskLogin;
        public static encode(message: Protos.IGC2LS_AskLogin, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.IGC2LS_AskLogin, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.GC2LS_AskLogin;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.GC2LS_AskLogin;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.GC2LS_AskLogin;
        public static toObject(message: Protos.GC2LS_AskLogin, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGS2GC_LoginRet {
        opts?: (Protos.IMsgOpts|null);
        result?: (Protos.GS2GC_LoginRet.EResult|null);
    }

    class GS2GC_LoginRet implements IGS2GC_LoginRet {
        constructor(properties?: Protos.IGS2GC_LoginRet);
        public opts?: (Protos.IMsgOpts|null);
        public result: Protos.GS2GC_LoginRet.EResult;
        public static create(properties?: Protos.IGS2GC_LoginRet): Protos.GS2GC_LoginRet;
        public static encode(message: Protos.IGS2GC_LoginRet, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.IGS2GC_LoginRet, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.GS2GC_LoginRet;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.GS2GC_LoginRet;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.GS2GC_LoginRet;
        public static toObject(message: Protos.GS2GC_LoginRet, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    namespace GS2GC_LoginRet {

        enum EResult {
            Success = 0,
            Failed = 1
        }
    }

    interface ILS2CS_GCLogin {
        opts?: (Protos.IMsgOpts|null);
        sessionID?: (Long|null);
        ukey?: (number|null);
    }

    class LS2CS_GCLogin implements ILS2CS_GCLogin {
        constructor(properties?: Protos.ILS2CS_GCLogin);
        public opts?: (Protos.IMsgOpts|null);
        public sessionID: Long;
        public ukey: number;
        public static create(properties?: Protos.ILS2CS_GCLogin): Protos.LS2CS_GCLogin;
        public static encode(message: Protos.ILS2CS_GCLogin, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.ILS2CS_GCLogin, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.LS2CS_GCLogin;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.LS2CS_GCLogin;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.LS2CS_GCLogin;
        public static toObject(message: Protos.LS2CS_GCLogin, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ILS2DB_QueryAccount {
        opts?: (Protos.IMsgOpts|null);
        name?: (string|null);
    }

    class LS2DB_QueryAccount implements ILS2DB_QueryAccount {
        constructor(properties?: Protos.ILS2DB_QueryAccount);
        public opts?: (Protos.IMsgOpts|null);
        public name: string;
        public static create(properties?: Protos.ILS2DB_QueryAccount): Protos.LS2DB_QueryAccount;
        public static encode(message: Protos.ILS2DB_QueryAccount, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.ILS2DB_QueryAccount, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.LS2DB_QueryAccount;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.LS2DB_QueryAccount;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.LS2DB_QueryAccount;
        public static toObject(message: Protos.LS2DB_QueryAccount, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ILS2DB_QueryLogin {
        opts?: (Protos.IMsgOpts|null);
        name?: (string|null);
        pwd?: (string|null);
    }

    class LS2DB_QueryLogin implements ILS2DB_QueryLogin {
        constructor(properties?: Protos.ILS2DB_QueryLogin);
        public opts?: (Protos.IMsgOpts|null);
        public name: string;
        public pwd: string;
        public static create(properties?: Protos.ILS2DB_QueryLogin): Protos.LS2DB_QueryLogin;
        public static encode(message: Protos.ILS2DB_QueryLogin, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.ILS2DB_QueryLogin, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.LS2DB_QueryLogin;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.LS2DB_QueryLogin;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.LS2DB_QueryLogin;
        public static toObject(message: Protos.LS2DB_QueryLogin, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ILS2DB_Exec {
        opts?: (Protos.IMsgOpts|null);
        cmd?: (string|null);
    }

    class LS2DB_Exec implements ILS2DB_Exec {
        constructor(properties?: Protos.ILS2DB_Exec);
        public opts?: (Protos.IMsgOpts|null);
        public cmd: string;
        public static create(properties?: Protos.ILS2DB_Exec): Protos.LS2DB_Exec;
        public static encode(message: Protos.ILS2DB_Exec, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.ILS2DB_Exec, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.LS2DB_Exec;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.LS2DB_Exec;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.LS2DB_Exec;
        public static toObject(message: Protos.LS2DB_Exec, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ILS2GC_GSInfo {
        opts?: (Protos.IMsgOpts|null);
        gsInfos?: (Protos.IGSInfo[]|null);
    }

    class LS2GC_GSInfo implements ILS2GC_GSInfo {
        constructor(properties?: Protos.ILS2GC_GSInfo);
        public opts?: (Protos.IMsgOpts|null);
        public gsInfos: Protos.IGSInfo[];
        public static create(properties?: Protos.ILS2GC_GSInfo): Protos.LS2GC_GSInfo;
        public static encode(message: Protos.ILS2GC_GSInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.ILS2GC_GSInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.LS2GC_GSInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.LS2GC_GSInfo;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.LS2GC_GSInfo;
        public static toObject(message: Protos.LS2GC_GSInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ILS2GC_AskRegRet {
        opts?: (Protos.IMsgOpts|null);
        result?: (Protos.LS2GC_AskRegRet.EResult|null);
    }

    class LS2GC_AskRegRet implements ILS2GC_AskRegRet {
        constructor(properties?: Protos.ILS2GC_AskRegRet);
        public opts?: (Protos.IMsgOpts|null);
        public result: Protos.LS2GC_AskRegRet.EResult;
        public static create(properties?: Protos.ILS2GC_AskRegRet): Protos.LS2GC_AskRegRet;
        public static encode(message: Protos.ILS2GC_AskRegRet, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.ILS2GC_AskRegRet, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.LS2GC_AskRegRet;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.LS2GC_AskRegRet;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.LS2GC_AskRegRet;
        public static toObject(message: Protos.LS2GC_AskRegRet, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    namespace LS2GC_AskRegRet {

        enum EResult {
            Success = 0,
            Failed = 1,
            UnameExists = 2,
            UnameIllegal = 3,
            PwdIllegal = 4
        }
    }

    interface ILS2GC_AskLoginRet {
        opts?: (Protos.IMsgOpts|null);
        result?: (Protos.LS2GC_AskLoginRet.EResult|null);
        sessionID?: (Long|null);
        gsInfos?: (Protos.IGSInfo[]|null);
    }

    class LS2GC_AskLoginRet implements ILS2GC_AskLoginRet {
        constructor(properties?: Protos.ILS2GC_AskLoginRet);
        public opts?: (Protos.IMsgOpts|null);
        public result: Protos.LS2GC_AskLoginRet.EResult;
        public sessionID: Long;
        public gsInfos: Protos.IGSInfo[];
        public static create(properties?: Protos.ILS2GC_AskLoginRet): Protos.LS2GC_AskLoginRet;
        public static encode(message: Protos.ILS2GC_AskLoginRet, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.ILS2GC_AskLoginRet, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.LS2GC_AskLoginRet;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.LS2GC_AskLoginRet;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.LS2GC_AskLoginRet;
        public static toObject(message: Protos.LS2GC_AskLoginRet, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    namespace LS2GC_AskLoginRet {

        enum EResult {
            Success = 0,
            Failed = 1,
            InvalidUname = 3,
            InvalidPwd = 4
        }
    }
}
