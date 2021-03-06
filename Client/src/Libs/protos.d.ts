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

    interface IBS2CS_BattleInfoRet {
        opts?: (Protos.IMsgOpts|null);
        result?: (Protos.Global.ECommon|null);
        bid?: (number|null);
    }

    class BS2CS_BattleInfoRet implements IBS2CS_BattleInfoRet {
        constructor(properties?: Protos.IBS2CS_BattleInfoRet);
        public opts?: (Protos.IMsgOpts|null);
        public result: Protos.Global.ECommon;
        public bid: number;
        public static create(properties?: Protos.IBS2CS_BattleInfoRet): Protos.BS2CS_BattleInfoRet;
        public static encode(message: Protos.IBS2CS_BattleInfoRet, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.IBS2CS_BattleInfoRet, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.BS2CS_BattleInfoRet;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.BS2CS_BattleInfoRet;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.BS2CS_BattleInfoRet;
        public static toObject(message: Protos.BS2CS_BattleInfoRet, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IBS2CS_BattleEndInfo {
        result?: (Protos.BS2CS_BattleEndInfo.Result|null);
        damage?: (number|null);
        hurt?: (number|null);
        heal?: (number|null);
        occupyTime?: (number|null);
        skill0Used?: (number|null);
        skill1Used?: (number|null);
        skill0Damage?: (number|null);
        skill1Damage?: (number|null);
        team?: (number|null);
    }

    class BS2CS_BattleEndInfo implements IBS2CS_BattleEndInfo {
        constructor(properties?: Protos.IBS2CS_BattleEndInfo);
        public result: Protos.BS2CS_BattleEndInfo.Result;
        public damage: number;
        public hurt: number;
        public heal: number;
        public occupyTime: number;
        public skill0Used: number;
        public skill1Used: number;
        public skill0Damage: number;
        public skill1Damage: number;
        public team: number;
        public static create(properties?: Protos.IBS2CS_BattleEndInfo): Protos.BS2CS_BattleEndInfo;
        public static encode(message: Protos.IBS2CS_BattleEndInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.IBS2CS_BattleEndInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.BS2CS_BattleEndInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.BS2CS_BattleEndInfo;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.BS2CS_BattleEndInfo;
        public static toObject(message: Protos.BS2CS_BattleEndInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    namespace BS2CS_BattleEndInfo {

        enum Result {
            Win = 0,
            Draw = 1,
            Lose = 2
        }
    }

    interface IBS2CS_BattleEnd {
        opts?: (Protos.IMsgOpts|null);
        bid?: (number|null);
        infos?: ({ [k: string]: Protos.IBS2CS_BattleEndInfo }|null);
    }

    class BS2CS_BattleEnd implements IBS2CS_BattleEnd {
        constructor(properties?: Protos.IBS2CS_BattleEnd);
        public opts?: (Protos.IMsgOpts|null);
        public bid: number;
        public infos: { [k: string]: Protos.IBS2CS_BattleEndInfo };
        public static create(properties?: Protos.IBS2CS_BattleEnd): Protos.BS2CS_BattleEnd;
        public static encode(message: Protos.IBS2CS_BattleEnd, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.IBS2CS_BattleEnd, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.BS2CS_BattleEnd;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.BS2CS_BattleEnd;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.BS2CS_BattleEnd;
        public static toObject(message: Protos.BS2CS_BattleEnd, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IBS2CS_KickUser {
        opts?: (Protos.IMsgOpts|null);
        gcNID?: (Long|null);
        reason?: (Protos.BS2CS_KickUser.Reason|null);
    }

    class BS2CS_KickUser implements IBS2CS_KickUser {
        constructor(properties?: Protos.IBS2CS_KickUser);
        public opts?: (Protos.IMsgOpts|null);
        public gcNID: Long;
        public reason: Protos.BS2CS_KickUser.Reason;
        public static create(properties?: Protos.IBS2CS_KickUser): Protos.BS2CS_KickUser;
        public static encode(message: Protos.IBS2CS_KickUser, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.IBS2CS_KickUser, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.BS2CS_KickUser;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.BS2CS_KickUser;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.BS2CS_KickUser;
        public static toObject(message: Protos.BS2CS_KickUser, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    namespace BS2CS_KickUser {

        enum Reason {
            OutOfSync = 0,
            GCLost = 1
        }
    }

    enum MsgID {
        Undefine = 0,
        eG_AskPing = 10,
        eG_AskPingRet = 11,
        eGC2LS_AskRegister = 1000,
        eGC2LS_AskLogin = 1001,
        eGC2LS_AskSmartLogin = 1002,
        eGC2LS_AskWXLogin = 1003,
        eGC2LC_UpdateProfile = 1004,
        eGC2GS_AskLogin = 1100,
        eGC2GS_KeepAlive = 1101,
        eGC2BS_AskLogin = 1200,
        eGC2BS_KeepAlive = 1201,
        eGC2BS_RequestSnapshot = 1202,
        eGC2BS_FrameAction = 1203,
        eGC2BS_RequestFrameActions = 1204,
        eGC2BS_CommitSnapshot = 1205,
        eGC2BS_EndBattle = 1206,
        eGC2CS_BeginMatch = 1300,
        eGC2CS_CancelMatch = 1301,
        eGC2CS_QueryRanking = 1302,
        eGC2CS_QueryChampions = 1303,
        eGC2CS_BuyChampion = 1304,
        eGC2CS_CreateRoom = 1305,
        eGC2CS_LeaveRoom = 1306,
        eGC2CS_JoinRoom = 1307,
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
        eGS2GC_Kick = 3101,
        eGS2GC_CSLost = 3102,
        eBS2CS_ReportState = 4000,
        eBS2CS_BattleInfoRet = 4001,
        eBS2CS_BattleEnd = 4002,
        eBS2CS_KickUser = 4003,
        eBS2GC_LoginRet = 4100,
        eBS2GC_RequestSnapshotRet = 4101,
        eBS2GC_FrameAction = 4102,
        eBS2GC_RequestFrameActionsRet = 4103,
        eBS2GC_OutOfSync = 4104,
        eCS2LS_GSInfos = 5000,
        eCS2LS_GSInfo = 5001,
        eCS2LS_GSLost = 5002,
        eCS2LS_GCLoginRet = 5003,
        eCS2GS_GCLoginRet = 5100,
        eCS2GS_KickGC = 5101,
        eCS2BS_BattleInfo = 5200,
        eCS2BS_BattleEndRet = 5201,
        eCS2GC_BeginMatchRet = 5300,
        eCS2GC_MatchState = 5303,
        eCS2GC_AddToMatch = 5304,
        eCS2GC_RemoveFromMatch = 5305,
        eCS2GC_EnterBattle = 5306,
        eCS2GC_BattleEnd = 5307,
        eCS2GC_BSLose = 5308,
        eCS2GC_QueryRankingRet = 5309,
        eCS2GC_QueryChampionsRet = 5310,
        eCS2GC_BuyChampionRet = 5111,
        eCS2GC_CreateRoomRet = 5112,
        eCS2GC_JoinRoomRet = 5113,
        eCS2DB_UpdateRank = 5400,
        eCS2DB_QueryRanking = 5401,
        eCS2DB_BuyChampion = 5402,
        eDB2LS_QueryAccountRet = 8000,
        eDB2LS_QueryLoginRet = 8001,
        eDB2LS_ExecRet = 8002,
        eDB2CS_QueryRankingRet = 9000,
        eDB2CS_BuyChampionRet = 9001
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
            Undefine = 0,
            GC = 1,
            CS = 2,
            BS = 3,
            LS = 4,
            DB = 5,
            GS = 6
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

    interface IGlobal {
    }

    class Global implements IGlobal {
        constructor(properties?: Protos.IGlobal);
        public static create(properties?: Protos.IGlobal): Protos.Global;
        public static encode(message: Protos.IGlobal, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.IGlobal, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.Global;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.Global;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.Global;
        public static toObject(message: Protos.Global, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    namespace Global {

        enum ECommon {
            Success = 0,
            Failed = 1
        }

        enum Channel {
            Web = 0,
            WXMini = 1
        }

        enum Platform {
            PC = 0,
            Android = 1,
            IOS = 2,
            WP = 3
        }

        enum Browser {
            Chrome = 0,
            Firefox = 1,
            Safair = 2,
            Edge = 3,
            IE = 4
        }
    }

    interface IG_UserInfo {
        ukey?: (number|null);
        gcNID?: (Long|null);
        openID?: (string|null);
        nickname?: (string|null);
        avatar?: (string|null);
        gender?: (number|null);
        rank?: (number|null);
        money?: (number|null);
        diamoned?: (number|null);
        exp?: (number|null);
        champions?: (number[]|null);
    }

    class G_UserInfo implements IG_UserInfo {
        constructor(properties?: Protos.IG_UserInfo);
        public ukey: number;
        public gcNID: Long;
        public openID: string;
        public nickname: string;
        public avatar: string;
        public gender: number;
        public rank: number;
        public money: number;
        public diamoned: number;
        public exp: number;
        public champions: number[];
        public static create(properties?: Protos.IG_UserInfo): Protos.G_UserInfo;
        public static encode(message: Protos.IG_UserInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.IG_UserInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.G_UserInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.G_UserInfo;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.G_UserInfo;
        public static toObject(message: Protos.G_UserInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IBS2GC_LoginRet {
        opts?: (Protos.IMsgOpts|null);
        result?: (Protos.Global.ECommon|null);
        playerID?: (Long|null);
        rndSeed?: (number|null);
        frameRate?: (number|null);
        keyframeStep?: (number|null);
        snapshotStep?: (number|null);
        battleTime?: (number|null);
        mapID?: (number|null);
        curFrame?: (number|null);
        teamInfos?: (Protos.ICS2BS_TeamInfo[]|null);
    }

    class BS2GC_LoginRet implements IBS2GC_LoginRet {
        constructor(properties?: Protos.IBS2GC_LoginRet);
        public opts?: (Protos.IMsgOpts|null);
        public result: Protos.Global.ECommon;
        public playerID: Long;
        public rndSeed: number;
        public frameRate: number;
        public keyframeStep: number;
        public snapshotStep: number;
        public battleTime: number;
        public mapID: number;
        public curFrame: number;
        public teamInfos: Protos.ICS2BS_TeamInfo[];
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

    interface IBS2GC_RequestSnapshotRet {
        opts?: (Protos.IMsgOpts|null);
        result?: (Protos.BS2GC_RequestSnapshotRet.EResult|null);
        reqFrame?: (number|null);
        curFrame?: (number|null);
        snapshot?: (Uint8Array|null);
    }

    class BS2GC_RequestSnapshotRet implements IBS2GC_RequestSnapshotRet {
        constructor(properties?: Protos.IBS2GC_RequestSnapshotRet);
        public opts?: (Protos.IMsgOpts|null);
        public result: Protos.BS2GC_RequestSnapshotRet.EResult;
        public reqFrame: number;
        public curFrame: number;
        public snapshot: Uint8Array;
        public static create(properties?: Protos.IBS2GC_RequestSnapshotRet): Protos.BS2GC_RequestSnapshotRet;
        public static encode(message: Protos.IBS2GC_RequestSnapshotRet, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.IBS2GC_RequestSnapshotRet, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.BS2GC_RequestSnapshotRet;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.BS2GC_RequestSnapshotRet;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.BS2GC_RequestSnapshotRet;
        public static toObject(message: Protos.BS2GC_RequestSnapshotRet, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    namespace BS2GC_RequestSnapshotRet {

        enum EResult {
            Success = 0,
            InvalidUser = 1,
            InvalidBattle = 2
        }
    }

    interface IBS2GC_FrameAction {
        opts?: (Protos.IMsgOpts|null);
        frame?: (number|null);
        action?: (Uint8Array|null);
    }

    class BS2GC_FrameAction implements IBS2GC_FrameAction {
        constructor(properties?: Protos.IBS2GC_FrameAction);
        public opts?: (Protos.IMsgOpts|null);
        public frame: number;
        public action: Uint8Array;
        public static create(properties?: Protos.IBS2GC_FrameAction): Protos.BS2GC_FrameAction;
        public static encode(message: Protos.IBS2GC_FrameAction, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.IBS2GC_FrameAction, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.BS2GC_FrameAction;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.BS2GC_FrameAction;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.BS2GC_FrameAction;
        public static toObject(message: Protos.BS2GC_FrameAction, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IBS2GC_RequestFrameActionsRet {
        opts?: (Protos.IMsgOpts|null);
        frames?: (number[]|null);
        actions?: (Uint8Array[]|null);
    }

    class BS2GC_RequestFrameActionsRet implements IBS2GC_RequestFrameActionsRet {
        constructor(properties?: Protos.IBS2GC_RequestFrameActionsRet);
        public opts?: (Protos.IMsgOpts|null);
        public frames: number[];
        public actions: Uint8Array[];
        public static create(properties?: Protos.IBS2GC_RequestFrameActionsRet): Protos.BS2GC_RequestFrameActionsRet;
        public static encode(message: Protos.IBS2GC_RequestFrameActionsRet, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.IBS2GC_RequestFrameActionsRet, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.BS2GC_RequestFrameActionsRet;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.BS2GC_RequestFrameActionsRet;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.BS2GC_RequestFrameActionsRet;
        public static toObject(message: Protos.BS2GC_RequestFrameActionsRet, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IBS2GC_OutOfSync {
        opts?: (Protos.IMsgOpts|null);
        frame?: (number|null);
        data1?: (Uint8Array|null);
        data2?: (Uint8Array|null);
    }

    class BS2GC_OutOfSync implements IBS2GC_OutOfSync {
        constructor(properties?: Protos.IBS2GC_OutOfSync);
        public opts?: (Protos.IMsgOpts|null);
        public frame: number;
        public data1: Uint8Array;
        public data2: Uint8Array;
        public static create(properties?: Protos.IBS2GC_OutOfSync): Protos.BS2GC_OutOfSync;
        public static encode(message: Protos.IBS2GC_OutOfSync, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.IBS2GC_OutOfSync, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.BS2GC_OutOfSync;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.BS2GC_OutOfSync;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.BS2GC_OutOfSync;
        public static toObject(message: Protos.BS2GC_OutOfSync, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ICS2BS_PlayerInfo {
        gcNID?: (Long|null);
        actorID?: (number|null);
        nickname?: (string|null);
        avatar?: (string|null);
        gender?: (number|null);
        money?: (number|null);
        diamoned?: (number|null);
        rank?: (number|null);
        exp?: (number|null);
    }

    class CS2BS_PlayerInfo implements ICS2BS_PlayerInfo {
        constructor(properties?: Protos.ICS2BS_PlayerInfo);
        public gcNID: Long;
        public actorID: number;
        public nickname: string;
        public avatar: string;
        public gender: number;
        public money: number;
        public diamoned: number;
        public rank: number;
        public exp: number;
        public static create(properties?: Protos.ICS2BS_PlayerInfo): Protos.CS2BS_PlayerInfo;
        public static encode(message: Protos.ICS2BS_PlayerInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.ICS2BS_PlayerInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.CS2BS_PlayerInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.CS2BS_PlayerInfo;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.CS2BS_PlayerInfo;
        public static toObject(message: Protos.CS2BS_PlayerInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ICS2BS_TeamInfo {
        playerInfos?: (Protos.ICS2BS_PlayerInfo[]|null);
    }

    class CS2BS_TeamInfo implements ICS2BS_TeamInfo {
        constructor(properties?: Protos.ICS2BS_TeamInfo);
        public playerInfos: Protos.ICS2BS_PlayerInfo[];
        public static create(properties?: Protos.ICS2BS_TeamInfo): Protos.CS2BS_TeamInfo;
        public static encode(message: Protos.ICS2BS_TeamInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.ICS2BS_TeamInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.CS2BS_TeamInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.CS2BS_TeamInfo;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.CS2BS_TeamInfo;
        public static toObject(message: Protos.CS2BS_TeamInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ICS2BS_BattleInfo {
        opts?: (Protos.IMsgOpts|null);
        mapID?: (number|null);
        connTimeout?: (number|null);
        teamInfos?: (Protos.ICS2BS_TeamInfo[]|null);
    }

    class CS2BS_BattleInfo implements ICS2BS_BattleInfo {
        constructor(properties?: Protos.ICS2BS_BattleInfo);
        public opts?: (Protos.IMsgOpts|null);
        public mapID: number;
        public connTimeout: number;
        public teamInfos: Protos.ICS2BS_TeamInfo[];
        public static create(properties?: Protos.ICS2BS_BattleInfo): Protos.CS2BS_BattleInfo;
        public static encode(message: Protos.ICS2BS_BattleInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.ICS2BS_BattleInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.CS2BS_BattleInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.CS2BS_BattleInfo;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.CS2BS_BattleInfo;
        public static toObject(message: Protos.CS2BS_BattleInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ICS2BS_BattleEndRet {
        opts?: (Protos.IMsgOpts|null);
    }

    class CS2BS_BattleEndRet implements ICS2BS_BattleEndRet {
        constructor(properties?: Protos.ICS2BS_BattleEndRet);
        public opts?: (Protos.IMsgOpts|null);
        public static create(properties?: Protos.ICS2BS_BattleEndRet): Protos.CS2BS_BattleEndRet;
        public static encode(message: Protos.ICS2BS_BattleEndRet, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.ICS2BS_BattleEndRet, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.CS2BS_BattleEndRet;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.CS2BS_BattleEndRet;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.CS2BS_BattleEndRet;
        public static toObject(message: Protos.CS2BS_BattleEndRet, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ICS2DB_Gain {
        ukey?: (number|null);
        money?: (number|null);
        diamoned?: (number|null);
        rank?: (number|null);
        exp?: (number|null);
    }

    class CS2DB_Gain implements ICS2DB_Gain {
        constructor(properties?: Protos.ICS2DB_Gain);
        public ukey: number;
        public money: number;
        public diamoned: number;
        public rank: number;
        public exp: number;
        public static create(properties?: Protos.ICS2DB_Gain): Protos.CS2DB_Gain;
        public static encode(message: Protos.ICS2DB_Gain, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.ICS2DB_Gain, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.CS2DB_Gain;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.CS2DB_Gain;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.CS2DB_Gain;
        public static toObject(message: Protos.CS2DB_Gain, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ICS2DB_UpdateRank {
        opts?: (Protos.IMsgOpts|null);
        gains?: (Protos.ICS2DB_Gain[]|null);
    }

    class CS2DB_UpdateRank implements ICS2DB_UpdateRank {
        constructor(properties?: Protos.ICS2DB_UpdateRank);
        public opts?: (Protos.IMsgOpts|null);
        public gains: Protos.ICS2DB_Gain[];
        public static create(properties?: Protos.ICS2DB_UpdateRank): Protos.CS2DB_UpdateRank;
        public static encode(message: Protos.ICS2DB_UpdateRank, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.ICS2DB_UpdateRank, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.CS2DB_UpdateRank;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.CS2DB_UpdateRank;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.CS2DB_UpdateRank;
        public static toObject(message: Protos.CS2DB_UpdateRank, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ICS2DB_QueryRanking {
        opts?: (Protos.IMsgOpts|null);
        sortType?: (Protos.CS2DB_QueryRanking.SortType|null);
        from?: (number|null);
        count?: (number|null);
    }

    class CS2DB_QueryRanking implements ICS2DB_QueryRanking {
        constructor(properties?: Protos.ICS2DB_QueryRanking);
        public opts?: (Protos.IMsgOpts|null);
        public sortType: Protos.CS2DB_QueryRanking.SortType;
        public from: number;
        public count: number;
        public static create(properties?: Protos.ICS2DB_QueryRanking): Protos.CS2DB_QueryRanking;
        public static encode(message: Protos.ICS2DB_QueryRanking, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.ICS2DB_QueryRanking, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.CS2DB_QueryRanking;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.CS2DB_QueryRanking;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.CS2DB_QueryRanking;
        public static toObject(message: Protos.CS2DB_QueryRanking, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    namespace CS2DB_QueryRanking {

        enum SortType {
            Rank = 0
        }
    }

    interface ICS2DB_BuyChampion {
        opts?: (Protos.IMsgOpts|null);
        result?: (Protos.Global.ECommon|null);
        ukey?: (number|null);
        money?: (number|null);
        diamoned?: (number|null);
        cids?: (number[]|null);
    }

    class CS2DB_BuyChampion implements ICS2DB_BuyChampion {
        constructor(properties?: Protos.ICS2DB_BuyChampion);
        public opts?: (Protos.IMsgOpts|null);
        public result: Protos.Global.ECommon;
        public ukey: number;
        public money: number;
        public diamoned: number;
        public cids: number[];
        public static create(properties?: Protos.ICS2DB_BuyChampion): Protos.CS2DB_BuyChampion;
        public static encode(message: Protos.ICS2DB_BuyChampion, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.ICS2DB_BuyChampion, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.CS2DB_BuyChampion;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.CS2DB_BuyChampion;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.CS2DB_BuyChampion;
        public static toObject(message: Protos.CS2DB_BuyChampion, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ICS2GC_BeginMatchRet {
        opts?: (Protos.IMsgOpts|null);
        result?: (Protos.CS2GC_BeginMatchRet.EResult|null);
    }

    class CS2GC_BeginMatchRet implements ICS2GC_BeginMatchRet {
        constructor(properties?: Protos.ICS2GC_BeginMatchRet);
        public opts?: (Protos.IMsgOpts|null);
        public result: Protos.CS2GC_BeginMatchRet.EResult;
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

    namespace CS2GC_BeginMatchRet {

        enum EResult {
            Success = 0,
            Failed = 1,
            UserInBattle = 2
        }
    }

    interface ICS2GC_CreateRoomRet {
        opts?: (Protos.IMsgOpts|null);
        result?: (Protos.Global.ECommon|null);
        roomID?: (number|null);
    }

    class CS2GC_CreateRoomRet implements ICS2GC_CreateRoomRet {
        constructor(properties?: Protos.ICS2GC_CreateRoomRet);
        public opts?: (Protos.IMsgOpts|null);
        public result: Protos.Global.ECommon;
        public roomID: number;
        public static create(properties?: Protos.ICS2GC_CreateRoomRet): Protos.CS2GC_CreateRoomRet;
        public static encode(message: Protos.ICS2GC_CreateRoomRet, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.ICS2GC_CreateRoomRet, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.CS2GC_CreateRoomRet;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.CS2GC_CreateRoomRet;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.CS2GC_CreateRoomRet;
        public static toObject(message: Protos.CS2GC_CreateRoomRet, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ICS2GC_JoinRoomRet {
        opts?: (Protos.IMsgOpts|null);
        result?: (Protos.Global.ECommon|null);
    }

    class CS2GC_JoinRoomRet implements ICS2GC_JoinRoomRet {
        constructor(properties?: Protos.ICS2GC_JoinRoomRet);
        public opts?: (Protos.IMsgOpts|null);
        public result: Protos.Global.ECommon;
        public static create(properties?: Protos.ICS2GC_JoinRoomRet): Protos.CS2GC_JoinRoomRet;
        public static encode(message: Protos.ICS2GC_JoinRoomRet, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.ICS2GC_JoinRoomRet, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.CS2GC_JoinRoomRet;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.CS2GC_JoinRoomRet;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.CS2GC_JoinRoomRet;
        public static toObject(message: Protos.CS2GC_JoinRoomRet, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ICS2GC_PlayerInfo {
        vaild?: (boolean|null);
        gcNID?: (Long|null);
        actorID?: (number|null);
        team?: (number|null);
        nickname?: (string|null);
        avatar?: (string|null);
        gender?: (number|null);
        money?: (number|null);
        diamoned?: (number|null);
        rank?: (number|null);
        exp?: (number|null);
    }

    class CS2GC_PlayerInfo implements ICS2GC_PlayerInfo {
        constructor(properties?: Protos.ICS2GC_PlayerInfo);
        public vaild: boolean;
        public gcNID: Long;
        public actorID: number;
        public team: number;
        public nickname: string;
        public avatar: string;
        public gender: number;
        public money: number;
        public diamoned: number;
        public rank: number;
        public exp: number;
        public static create(properties?: Protos.ICS2GC_PlayerInfo): Protos.CS2GC_PlayerInfo;
        public static encode(message: Protos.ICS2GC_PlayerInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.ICS2GC_PlayerInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.CS2GC_PlayerInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.CS2GC_PlayerInfo;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.CS2GC_PlayerInfo;
        public static toObject(message: Protos.CS2GC_PlayerInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ICS2GC_MatchState {
        opts?: (Protos.IMsgOpts|null);
        playerInfos?: (Protos.ICS2GC_PlayerInfo[]|null);
    }

    class CS2GC_MatchState implements ICS2GC_MatchState {
        constructor(properties?: Protos.ICS2GC_MatchState);
        public opts?: (Protos.IMsgOpts|null);
        public playerInfos: Protos.ICS2GC_PlayerInfo[];
        public static create(properties?: Protos.ICS2GC_MatchState): Protos.CS2GC_MatchState;
        public static encode(message: Protos.ICS2GC_MatchState, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.ICS2GC_MatchState, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.CS2GC_MatchState;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.CS2GC_MatchState;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.CS2GC_MatchState;
        public static toObject(message: Protos.CS2GC_MatchState, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ICS2GC_AddToMatch {
        opts?: (Protos.IMsgOpts|null);
    }

    class CS2GC_AddToMatch implements ICS2GC_AddToMatch {
        constructor(properties?: Protos.ICS2GC_AddToMatch);
        public opts?: (Protos.IMsgOpts|null);
        public static create(properties?: Protos.ICS2GC_AddToMatch): Protos.CS2GC_AddToMatch;
        public static encode(message: Protos.ICS2GC_AddToMatch, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.ICS2GC_AddToMatch, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.CS2GC_AddToMatch;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.CS2GC_AddToMatch;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.CS2GC_AddToMatch;
        public static toObject(message: Protos.CS2GC_AddToMatch, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ICS2GC_RemoveFromMatch {
        opts?: (Protos.IMsgOpts|null);
    }

    class CS2GC_RemoveFromMatch implements ICS2GC_RemoveFromMatch {
        constructor(properties?: Protos.ICS2GC_RemoveFromMatch);
        public opts?: (Protos.IMsgOpts|null);
        public static create(properties?: Protos.ICS2GC_RemoveFromMatch): Protos.CS2GC_RemoveFromMatch;
        public static encode(message: Protos.ICS2GC_RemoveFromMatch, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.ICS2GC_RemoveFromMatch, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.CS2GC_RemoveFromMatch;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.CS2GC_RemoveFromMatch;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.CS2GC_RemoveFromMatch;
        public static toObject(message: Protos.CS2GC_RemoveFromMatch, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ICS2GC_EnterBattle {
        opts?: (Protos.IMsgOpts|null);
        gcNID?: (Long|null);
        ip?: (string|null);
        port?: (number|null);
        result?: (Protos.CS2GC_EnterBattle.Result|null);
    }

    class CS2GC_EnterBattle implements ICS2GC_EnterBattle {
        constructor(properties?: Protos.ICS2GC_EnterBattle);
        public opts?: (Protos.IMsgOpts|null);
        public gcNID: Long;
        public ip: string;
        public port: number;
        public result: Protos.CS2GC_EnterBattle.Result;
        public static create(properties?: Protos.ICS2GC_EnterBattle): Protos.CS2GC_EnterBattle;
        public static encode(message: Protos.ICS2GC_EnterBattle, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.ICS2GC_EnterBattle, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.CS2GC_EnterBattle;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.CS2GC_EnterBattle;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.CS2GC_EnterBattle;
        public static toObject(message: Protos.CS2GC_EnterBattle, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    namespace CS2GC_EnterBattle {

        enum Result {
            Success = 0,
            BSNotFound = 1,
            BSLost = 2,
            BattleCreateFailed = 3
        }
    }

    interface ICS2GC_BSLose {
        opts?: (Protos.IMsgOpts|null);
    }

    class CS2GC_BSLose implements ICS2GC_BSLose {
        constructor(properties?: Protos.ICS2GC_BSLose);
        public opts?: (Protos.IMsgOpts|null);
        public static create(properties?: Protos.ICS2GC_BSLose): Protos.CS2GC_BSLose;
        public static encode(message: Protos.ICS2GC_BSLose, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.ICS2GC_BSLose, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.CS2GC_BSLose;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.CS2GC_BSLose;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.CS2GC_BSLose;
        public static toObject(message: Protos.CS2GC_BSLose, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ICS2GC_BattleEnd {
        opts?: (Protos.IMsgOpts|null);
        result?: (Protos.CS2GC_BattleEnd.Result|null);
        gRank?: (number|null);
        gMoney?: (number|null);
        gDiamoned?: (number|null);
        gExp?: (number|null);
        rank?: (number|null);
        money?: (number|null);
        diamoned?: (number|null);
        exp?: (number|null);
    }

    class CS2GC_BattleEnd implements ICS2GC_BattleEnd {
        constructor(properties?: Protos.ICS2GC_BattleEnd);
        public opts?: (Protos.IMsgOpts|null);
        public result: Protos.CS2GC_BattleEnd.Result;
        public gRank: number;
        public gMoney: number;
        public gDiamoned: number;
        public gExp: number;
        public rank: number;
        public money: number;
        public diamoned: number;
        public exp: number;
        public static create(properties?: Protos.ICS2GC_BattleEnd): Protos.CS2GC_BattleEnd;
        public static encode(message: Protos.ICS2GC_BattleEnd, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.ICS2GC_BattleEnd, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.CS2GC_BattleEnd;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.CS2GC_BattleEnd;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.CS2GC_BattleEnd;
        public static toObject(message: Protos.CS2GC_BattleEnd, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    namespace CS2GC_BattleEnd {

        enum Result {
            Win = 0,
            Draw = 1,
            Lose = 2
        }
    }

    interface ICS2GC_RankingInfo {
        ukey?: (number|null);
        name?: (string|null);
        gender?: (number|null);
        avatar?: (string|null);
        lastLoginTime?: (Long|null);
        rank?: (number|null);
        exp?: (number|null);
    }

    class CS2GC_RankingInfo implements ICS2GC_RankingInfo {
        constructor(properties?: Protos.ICS2GC_RankingInfo);
        public ukey: number;
        public name: string;
        public gender: number;
        public avatar: string;
        public lastLoginTime: Long;
        public rank: number;
        public exp: number;
        public static create(properties?: Protos.ICS2GC_RankingInfo): Protos.CS2GC_RankingInfo;
        public static encode(message: Protos.ICS2GC_RankingInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.ICS2GC_RankingInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.CS2GC_RankingInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.CS2GC_RankingInfo;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.CS2GC_RankingInfo;
        public static toObject(message: Protos.CS2GC_RankingInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ICS2GC_QueryRankingRet {
        opts?: (Protos.IMsgOpts|null);
        rankingInfos?: (Protos.ICS2GC_RankingInfo[]|null);
    }

    class CS2GC_QueryRankingRet implements ICS2GC_QueryRankingRet {
        constructor(properties?: Protos.ICS2GC_QueryRankingRet);
        public opts?: (Protos.IMsgOpts|null);
        public rankingInfos: Protos.ICS2GC_RankingInfo[];
        public static create(properties?: Protos.ICS2GC_QueryRankingRet): Protos.CS2GC_QueryRankingRet;
        public static encode(message: Protos.ICS2GC_QueryRankingRet, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.ICS2GC_QueryRankingRet, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.CS2GC_QueryRankingRet;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.CS2GC_QueryRankingRet;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.CS2GC_QueryRankingRet;
        public static toObject(message: Protos.CS2GC_QueryRankingRet, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ICS2GC_QueryChampionsRet {
        opts?: (Protos.IMsgOpts|null);
        cids?: (number[]|null);
    }

    class CS2GC_QueryChampionsRet implements ICS2GC_QueryChampionsRet {
        constructor(properties?: Protos.ICS2GC_QueryChampionsRet);
        public opts?: (Protos.IMsgOpts|null);
        public cids: number[];
        public static create(properties?: Protos.ICS2GC_QueryChampionsRet): Protos.CS2GC_QueryChampionsRet;
        public static encode(message: Protos.ICS2GC_QueryChampionsRet, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.ICS2GC_QueryChampionsRet, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.CS2GC_QueryChampionsRet;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.CS2GC_QueryChampionsRet;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.CS2GC_QueryChampionsRet;
        public static toObject(message: Protos.CS2GC_QueryChampionsRet, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ICS2GC_BuyChampionRet {
        opts?: (Protos.IMsgOpts|null);
        result?: (Protos.CS2GC_BuyChampionRet.Result|null);
        money?: (number|null);
        diamoned?: (number|null);
        cids?: (number[]|null);
    }

    class CS2GC_BuyChampionRet implements ICS2GC_BuyChampionRet {
        constructor(properties?: Protos.ICS2GC_BuyChampionRet);
        public opts?: (Protos.IMsgOpts|null);
        public result: Protos.CS2GC_BuyChampionRet.Result;
        public money: number;
        public diamoned: number;
        public cids: number[];
        public static create(properties?: Protos.ICS2GC_BuyChampionRet): Protos.CS2GC_BuyChampionRet;
        public static encode(message: Protos.ICS2GC_BuyChampionRet, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.ICS2GC_BuyChampionRet, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.CS2GC_BuyChampionRet;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.CS2GC_BuyChampionRet;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.CS2GC_BuyChampionRet;
        public static toObject(message: Protos.CS2GC_BuyChampionRet, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    namespace CS2GC_BuyChampionRet {

        enum Result {
            Success = 0,
            NotEnoughMoney = 1,
            NotEnoughDiamoned = 2,
            NotEnoughExp = 3,
            FAILED = 4
        }
    }

    interface ICS2GS_GCLoginRet {
        opts?: (Protos.IMsgOpts|null);
        result?: (Protos.CS2GS_GCLoginRet.EResult|null);
        gcState?: (Protos.CS2GS_GCLoginRet.EGCCState|null);
        userInfo?: (Protos.IG_UserInfo|null);
        gcNID?: (Long|null);
        bsIP?: (string|null);
        bsPort?: (number|null);
    }

    class CS2GS_GCLoginRet implements ICS2GS_GCLoginRet {
        constructor(properties?: Protos.ICS2GS_GCLoginRet);
        public opts?: (Protos.IMsgOpts|null);
        public result: Protos.CS2GS_GCLoginRet.EResult;
        public gcState: Protos.CS2GS_GCLoginRet.EGCCState;
        public userInfo?: (Protos.IG_UserInfo|null);
        public gcNID: Long;
        public bsIP: string;
        public bsPort: number;
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
            IllegalLogin = 1
        }

        enum EGCCState {
            Idle = 0,
            Battle = 1
        }
    }

    interface ICS2GS_KickGC {
        opts?: (Protos.IMsgOpts|null);
        gcNID?: (Long|null);
        reason?: (Protos.CS2GS_KickGC.EReason|null);
    }

    class CS2GS_KickGC implements ICS2GS_KickGC {
        constructor(properties?: Protos.ICS2GS_KickGC);
        public opts?: (Protos.IMsgOpts|null);
        public gcNID: Long;
        public reason: Protos.CS2GS_KickGC.EReason;
        public static create(properties?: Protos.ICS2GS_KickGC): Protos.CS2GS_KickGC;
        public static encode(message: Protos.ICS2GS_KickGC, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.ICS2GS_KickGC, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.CS2GS_KickGC;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.CS2GS_KickGC;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.CS2GS_KickGC;
        public static toObject(message: Protos.CS2GS_KickGC, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    namespace CS2GS_KickGC {

        enum EReason {
            DuplicateLogin = 0,
            OutOfSync = 1,
            BSLost = 2,
            Other = 3
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

    interface IDB2CS_RankingInfo {
        ukey?: (number|null);
        name?: (string|null);
        gender?: (number|null);
        avatar?: (string|null);
        lastLoginTime?: (Long|null);
        rank?: (number|null);
        exp?: (number|null);
    }

    class DB2CS_RankingInfo implements IDB2CS_RankingInfo {
        constructor(properties?: Protos.IDB2CS_RankingInfo);
        public ukey: number;
        public name: string;
        public gender: number;
        public avatar: string;
        public lastLoginTime: Long;
        public rank: number;
        public exp: number;
        public static create(properties?: Protos.IDB2CS_RankingInfo): Protos.DB2CS_RankingInfo;
        public static encode(message: Protos.IDB2CS_RankingInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.IDB2CS_RankingInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.DB2CS_RankingInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.DB2CS_RankingInfo;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.DB2CS_RankingInfo;
        public static toObject(message: Protos.DB2CS_RankingInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IDB2CS_QueryRankingRet {
        opts?: (Protos.IMsgOpts|null);
        rankingInfos?: (Protos.IDB2CS_RankingInfo[]|null);
    }

    class DB2CS_QueryRankingRet implements IDB2CS_QueryRankingRet {
        constructor(properties?: Protos.IDB2CS_QueryRankingRet);
        public opts?: (Protos.IMsgOpts|null);
        public rankingInfos: Protos.IDB2CS_RankingInfo[];
        public static create(properties?: Protos.IDB2CS_QueryRankingRet): Protos.DB2CS_QueryRankingRet;
        public static encode(message: Protos.IDB2CS_QueryRankingRet, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.IDB2CS_QueryRankingRet, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.DB2CS_QueryRankingRet;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.DB2CS_QueryRankingRet;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.DB2CS_QueryRankingRet;
        public static toObject(message: Protos.DB2CS_QueryRankingRet, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IDB2CS_BuyChampionRet {
        opts?: (Protos.IMsgOpts|null);
        result?: (Protos.Global.ECommon|null);
    }

    class DB2CS_BuyChampionRet implements IDB2CS_BuyChampionRet {
        constructor(properties?: Protos.IDB2CS_BuyChampionRet);
        public opts?: (Protos.IMsgOpts|null);
        public result: Protos.Global.ECommon;
        public static create(properties?: Protos.IDB2CS_BuyChampionRet): Protos.DB2CS_BuyChampionRet;
        public static encode(message: Protos.IDB2CS_BuyChampionRet, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.IDB2CS_BuyChampionRet, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.DB2CS_BuyChampionRet;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.DB2CS_BuyChampionRet;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.DB2CS_BuyChampionRet;
        public static toObject(message: Protos.DB2CS_BuyChampionRet, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IDB2LS_QueryAccountRet {
        opts?: (Protos.IMsgOpts|null);
        result?: (Protos.Global.ECommon|null);
    }

    class DB2LS_QueryAccountRet implements IDB2LS_QueryAccountRet {
        constructor(properties?: Protos.IDB2LS_QueryAccountRet);
        public opts?: (Protos.IMsgOpts|null);
        public result: Protos.Global.ECommon;
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
        result?: (Protos.Global.ECommon|null);
        ukey?: (number|null);
        channel?: (Protos.Global.Channel|null);
        browser?: (Protos.Global.Browser|null);
        platform?: (Protos.Global.Platform|null);
        unionID?: (string|null);
        nickname?: (string|null);
        avatar?: (string|null);
        gender?: (number|null);
        money?: (number|null);
        diamoned?: (number|null);
        rank?: (number|null);
        exp?: (number|null);
        champions?: (string|null);
        actorID?: (number|null);
    }

    class DB2LS_QueryLoginRet implements IDB2LS_QueryLoginRet {
        constructor(properties?: Protos.IDB2LS_QueryLoginRet);
        public opts?: (Protos.IMsgOpts|null);
        public result: Protos.Global.ECommon;
        public ukey: number;
        public channel: Protos.Global.Channel;
        public browser: Protos.Global.Browser;
        public platform: Protos.Global.Platform;
        public unionID: string;
        public nickname: string;
        public avatar: string;
        public gender: number;
        public money: number;
        public diamoned: number;
        public rank: number;
        public exp: number;
        public champions: string;
        public actorID: number;
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
        result?: (Protos.Global.ECommon|null);
        row?: (number|null);
        id?: (number|null);
    }

    class DB2LS_ExecRet implements IDB2LS_ExecRet {
        constructor(properties?: Protos.IDB2LS_ExecRet);
        public opts?: (Protos.IMsgOpts|null);
        public result: Protos.Global.ECommon;
        public row: number;
        public id: number;
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
        sessionID?: (Long|null);
    }

    class GC2BS_AskLogin implements IGC2BS_AskLogin {
        constructor(properties?: Protos.IGC2BS_AskLogin);
        public opts?: (Protos.IMsgOpts|null);
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

    interface IGC2BS_RequestSnapshot {
        opts?: (Protos.IMsgOpts|null);
        frame?: (number|null);
    }

    class GC2BS_RequestSnapshot implements IGC2BS_RequestSnapshot {
        constructor(properties?: Protos.IGC2BS_RequestSnapshot);
        public opts?: (Protos.IMsgOpts|null);
        public frame: number;
        public static create(properties?: Protos.IGC2BS_RequestSnapshot): Protos.GC2BS_RequestSnapshot;
        public static encode(message: Protos.IGC2BS_RequestSnapshot, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.IGC2BS_RequestSnapshot, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.GC2BS_RequestSnapshot;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.GC2BS_RequestSnapshot;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.GC2BS_RequestSnapshot;
        public static toObject(message: Protos.GC2BS_RequestSnapshot, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGC2BS_FrameActionInfo {
        frame?: (number|null);
        inputFlag?: (number|null);
        v0?: (number|null);
        v1?: (number|null);
    }

    class GC2BS_FrameActionInfo implements IGC2BS_FrameActionInfo {
        constructor(properties?: Protos.IGC2BS_FrameActionInfo);
        public frame: number;
        public inputFlag: number;
        public v0: number;
        public v1: number;
        public static create(properties?: Protos.IGC2BS_FrameActionInfo): Protos.GC2BS_FrameActionInfo;
        public static encode(message: Protos.IGC2BS_FrameActionInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.IGC2BS_FrameActionInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.GC2BS_FrameActionInfo;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.GC2BS_FrameActionInfo;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.GC2BS_FrameActionInfo;
        public static toObject(message: Protos.GC2BS_FrameActionInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGC2BS_FrameAction {
        opts?: (Protos.IMsgOpts|null);
        infos?: (Protos.IGC2BS_FrameActionInfo[]|null);
    }

    class GC2BS_FrameAction implements IGC2BS_FrameAction {
        constructor(properties?: Protos.IGC2BS_FrameAction);
        public opts?: (Protos.IMsgOpts|null);
        public infos: Protos.IGC2BS_FrameActionInfo[];
        public static create(properties?: Protos.IGC2BS_FrameAction): Protos.GC2BS_FrameAction;
        public static encode(message: Protos.IGC2BS_FrameAction, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.IGC2BS_FrameAction, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.GC2BS_FrameAction;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.GC2BS_FrameAction;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.GC2BS_FrameAction;
        public static toObject(message: Protos.GC2BS_FrameAction, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGC2BS_RequestFrameActions {
        opts?: (Protos.IMsgOpts|null);
        from?: (number|null);
        to?: (number|null);
    }

    class GC2BS_RequestFrameActions implements IGC2BS_RequestFrameActions {
        constructor(properties?: Protos.IGC2BS_RequestFrameActions);
        public opts?: (Protos.IMsgOpts|null);
        public from: number;
        public to: number;
        public static create(properties?: Protos.IGC2BS_RequestFrameActions): Protos.GC2BS_RequestFrameActions;
        public static encode(message: Protos.IGC2BS_RequestFrameActions, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.IGC2BS_RequestFrameActions, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.GC2BS_RequestFrameActions;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.GC2BS_RequestFrameActions;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.GC2BS_RequestFrameActions;
        public static toObject(message: Protos.GC2BS_RequestFrameActions, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGC2BS_CommitSnapshot {
        opts?: (Protos.IMsgOpts|null);
        frame?: (number|null);
        data?: (Uint8Array|null);
    }

    class GC2BS_CommitSnapshot implements IGC2BS_CommitSnapshot {
        constructor(properties?: Protos.IGC2BS_CommitSnapshot);
        public opts?: (Protos.IMsgOpts|null);
        public frame: number;
        public data: Uint8Array;
        public static create(properties?: Protos.IGC2BS_CommitSnapshot): Protos.GC2BS_CommitSnapshot;
        public static encode(message: Protos.IGC2BS_CommitSnapshot, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.IGC2BS_CommitSnapshot, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.GC2BS_CommitSnapshot;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.GC2BS_CommitSnapshot;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.GC2BS_CommitSnapshot;
        public static toObject(message: Protos.GC2BS_CommitSnapshot, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGC2BS_EndBattle {
        opts?: (Protos.IMsgOpts|null);
        winTeam?: (number|null);
        snapshot?: (Uint8Array|null);
    }

    class GC2BS_EndBattle implements IGC2BS_EndBattle {
        constructor(properties?: Protos.IGC2BS_EndBattle);
        public opts?: (Protos.IMsgOpts|null);
        public winTeam: number;
        public snapshot: Uint8Array;
        public static create(properties?: Protos.IGC2BS_EndBattle): Protos.GC2BS_EndBattle;
        public static encode(message: Protos.IGC2BS_EndBattle, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.IGC2BS_EndBattle, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.GC2BS_EndBattle;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.GC2BS_EndBattle;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.GC2BS_EndBattle;
        public static toObject(message: Protos.GC2BS_EndBattle, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGC2CS_BeginMatch {
        opts?: (Protos.IMsgOpts|null);
        mode?: (Protos.GC2CS_BeginMatch.EMode|null);
        actorID?: (number|null);
    }

    class GC2CS_BeginMatch implements IGC2CS_BeginMatch {
        constructor(properties?: Protos.IGC2CS_BeginMatch);
        public opts?: (Protos.IMsgOpts|null);
        public mode: Protos.GC2CS_BeginMatch.EMode;
        public actorID: number;
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

    namespace GC2CS_BeginMatch {

        enum EMode {
            T1P1 = 0,
            T2P1 = 1,
            T2P2 = 2,
            T3P1 = 3,
            T3P2 = 4,
            T4P1 = 5,
            T4P2 = 6,
            T4P3 = 7,
            T4P4 = 8
        }
    }

    interface IGC2CS_CancelMatch {
        opts?: (Protos.IMsgOpts|null);
    }

    class GC2CS_CancelMatch implements IGC2CS_CancelMatch {
        constructor(properties?: Protos.IGC2CS_CancelMatch);
        public opts?: (Protos.IMsgOpts|null);
        public static create(properties?: Protos.IGC2CS_CancelMatch): Protos.GC2CS_CancelMatch;
        public static encode(message: Protos.IGC2CS_CancelMatch, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.IGC2CS_CancelMatch, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.GC2CS_CancelMatch;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.GC2CS_CancelMatch;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.GC2CS_CancelMatch;
        public static toObject(message: Protos.GC2CS_CancelMatch, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGC2CS_CreateRoom {
        opts?: (Protos.IMsgOpts|null);
        numTeam?: (number|null);
        numPlayerPerTeam?: (number|null);
    }

    class GC2CS_CreateRoom implements IGC2CS_CreateRoom {
        constructor(properties?: Protos.IGC2CS_CreateRoom);
        public opts?: (Protos.IMsgOpts|null);
        public numTeam: number;
        public numPlayerPerTeam: number;
        public static create(properties?: Protos.IGC2CS_CreateRoom): Protos.GC2CS_CreateRoom;
        public static encode(message: Protos.IGC2CS_CreateRoom, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.IGC2CS_CreateRoom, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.GC2CS_CreateRoom;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.GC2CS_CreateRoom;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.GC2CS_CreateRoom;
        public static toObject(message: Protos.GC2CS_CreateRoom, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGC2CS_LeaveRoom {
        opts?: (Protos.IMsgOpts|null);
    }

    class GC2CS_LeaveRoom implements IGC2CS_LeaveRoom {
        constructor(properties?: Protos.IGC2CS_LeaveRoom);
        public opts?: (Protos.IMsgOpts|null);
        public static create(properties?: Protos.IGC2CS_LeaveRoom): Protos.GC2CS_LeaveRoom;
        public static encode(message: Protos.IGC2CS_LeaveRoom, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.IGC2CS_LeaveRoom, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.GC2CS_LeaveRoom;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.GC2CS_LeaveRoom;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.GC2CS_LeaveRoom;
        public static toObject(message: Protos.GC2CS_LeaveRoom, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGC2CS_JoinRoom {
        opts?: (Protos.IMsgOpts|null);
        roomID?: (number|null);
    }

    class GC2CS_JoinRoom implements IGC2CS_JoinRoom {
        constructor(properties?: Protos.IGC2CS_JoinRoom);
        public opts?: (Protos.IMsgOpts|null);
        public roomID: number;
        public static create(properties?: Protos.IGC2CS_JoinRoom): Protos.GC2CS_JoinRoom;
        public static encode(message: Protos.IGC2CS_JoinRoom, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.IGC2CS_JoinRoom, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.GC2CS_JoinRoom;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.GC2CS_JoinRoom;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.GC2CS_JoinRoom;
        public static toObject(message: Protos.GC2CS_JoinRoom, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGC2CS_QueryRanking {
        opts?: (Protos.IMsgOpts|null);
        sortType?: (Protos.GC2CS_QueryRanking.SortType|null);
        from?: (number|null);
        count?: (number|null);
    }

    class GC2CS_QueryRanking implements IGC2CS_QueryRanking {
        constructor(properties?: Protos.IGC2CS_QueryRanking);
        public opts?: (Protos.IMsgOpts|null);
        public sortType: Protos.GC2CS_QueryRanking.SortType;
        public from: number;
        public count: number;
        public static create(properties?: Protos.IGC2CS_QueryRanking): Protos.GC2CS_QueryRanking;
        public static encode(message: Protos.IGC2CS_QueryRanking, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.IGC2CS_QueryRanking, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.GC2CS_QueryRanking;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.GC2CS_QueryRanking;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.GC2CS_QueryRanking;
        public static toObject(message: Protos.GC2CS_QueryRanking, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    namespace GC2CS_QueryRanking {

        enum SortType {
            Rank = 0
        }
    }

    interface IGC2CS_QueryChampions {
        opts?: (Protos.IMsgOpts|null);
    }

    class GC2CS_QueryChampions implements IGC2CS_QueryChampions {
        constructor(properties?: Protos.IGC2CS_QueryChampions);
        public opts?: (Protos.IMsgOpts|null);
        public static create(properties?: Protos.IGC2CS_QueryChampions): Protos.GC2CS_QueryChampions;
        public static encode(message: Protos.IGC2CS_QueryChampions, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.IGC2CS_QueryChampions, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.GC2CS_QueryChampions;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.GC2CS_QueryChampions;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.GC2CS_QueryChampions;
        public static toObject(message: Protos.GC2CS_QueryChampions, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGC2CS_BuyChampion {
        opts?: (Protos.IMsgOpts|null);
        cid?: (number|null);
    }

    class GC2CS_BuyChampion implements IGC2CS_BuyChampion {
        constructor(properties?: Protos.IGC2CS_BuyChampion);
        public opts?: (Protos.IMsgOpts|null);
        public cid: number;
        public static create(properties?: Protos.IGC2CS_BuyChampion): Protos.GC2CS_BuyChampion;
        public static encode(message: Protos.IGC2CS_BuyChampion, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.IGC2CS_BuyChampion, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.GC2CS_BuyChampion;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.GC2CS_BuyChampion;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.GC2CS_BuyChampion;
        public static toObject(message: Protos.GC2CS_BuyChampion, options?: $protobuf.IConversionOptions): { [k: string]: any };
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
        id?: (string|null);
        passwd?: (string|null);
    }

    class GC2LS_AskRegister implements IGC2LS_AskRegister {
        constructor(properties?: Protos.IGC2LS_AskRegister);
        public opts?: (Protos.IMsgOpts|null);
        public id: string;
        public passwd: string;
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
        id?: (string|null);
        passwd?: (string|null);
        channel?: (Protos.Global.Channel|null);
        browser?: (Protos.Global.Browser|null);
        platform?: (Protos.Global.Platform|null);
    }

    class GC2LS_AskLogin implements IGC2LS_AskLogin {
        constructor(properties?: Protos.IGC2LS_AskLogin);
        public opts?: (Protos.IMsgOpts|null);
        public id: string;
        public passwd: string;
        public channel: Protos.Global.Channel;
        public browser: Protos.Global.Browser;
        public platform: Protos.Global.Platform;
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

    interface IGC2LS_AskSmartLogin {
        opts?: (Protos.IMsgOpts|null);
        id?: (string|null);
        channel?: (Protos.Global.Channel|null);
        browser?: (Protos.Global.Browser|null);
        platform?: (Protos.Global.Platform|null);
    }

    class GC2LS_AskSmartLogin implements IGC2LS_AskSmartLogin {
        constructor(properties?: Protos.IGC2LS_AskSmartLogin);
        public opts?: (Protos.IMsgOpts|null);
        public id: string;
        public channel: Protos.Global.Channel;
        public browser: Protos.Global.Browser;
        public platform: Protos.Global.Platform;
        public static create(properties?: Protos.IGC2LS_AskSmartLogin): Protos.GC2LS_AskSmartLogin;
        public static encode(message: Protos.IGC2LS_AskSmartLogin, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.IGC2LS_AskSmartLogin, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.GC2LS_AskSmartLogin;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.GC2LS_AskSmartLogin;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.GC2LS_AskSmartLogin;
        public static toObject(message: Protos.GC2LS_AskSmartLogin, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGC2LS_AskWXLogin {
        opts?: (Protos.IMsgOpts|null);
        code?: (string|null);
        browser?: (Protos.Global.Browser|null);
        platform?: (Protos.Global.Platform|null);
        nickname?: (string|null);
        avatar?: (string|null);
        gender?: (number|null);
    }

    class GC2LS_AskWXLogin implements IGC2LS_AskWXLogin {
        constructor(properties?: Protos.IGC2LS_AskWXLogin);
        public opts?: (Protos.IMsgOpts|null);
        public code: string;
        public browser: Protos.Global.Browser;
        public platform: Protos.Global.Platform;
        public nickname: string;
        public avatar: string;
        public gender: number;
        public static create(properties?: Protos.IGC2LS_AskWXLogin): Protos.GC2LS_AskWXLogin;
        public static encode(message: Protos.IGC2LS_AskWXLogin, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.IGC2LS_AskWXLogin, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.GC2LS_AskWXLogin;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.GC2LS_AskWXLogin;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.GC2LS_AskWXLogin;
        public static toObject(message: Protos.GC2LS_AskWXLogin, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGC2LC_UpdateProfile {
        opts?: (Protos.IMsgOpts|null);
        nickname?: (string|null);
        avatar?: (string|null);
        gender?: (number|null);
    }

    class GC2LC_UpdateProfile implements IGC2LC_UpdateProfile {
        constructor(properties?: Protos.IGC2LC_UpdateProfile);
        public opts?: (Protos.IMsgOpts|null);
        public nickname: string;
        public avatar: string;
        public gender: number;
        public static create(properties?: Protos.IGC2LC_UpdateProfile): Protos.GC2LC_UpdateProfile;
        public static encode(message: Protos.IGC2LC_UpdateProfile, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.IGC2LC_UpdateProfile, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.GC2LC_UpdateProfile;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.GC2LC_UpdateProfile;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.GC2LC_UpdateProfile;
        public static toObject(message: Protos.GC2LC_UpdateProfile, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGS2GC_LoginRet {
        opts?: (Protos.IMsgOpts|null);
        result?: (Protos.GS2GC_LoginRet.EResult|null);
        gcState?: (Protos.GS2GC_LoginRet.EGCCState|null);
        userInfo?: (Protos.IG_UserInfo|null);
        gcNID?: (Long|null);
        bsIP?: (string|null);
        bsPort?: (number|null);
        defs?: (Uint8Array|null);
    }

    class GS2GC_LoginRet implements IGS2GC_LoginRet {
        constructor(properties?: Protos.IGS2GC_LoginRet);
        public opts?: (Protos.IMsgOpts|null);
        public result: Protos.GS2GC_LoginRet.EResult;
        public gcState: Protos.GS2GC_LoginRet.EGCCState;
        public userInfo?: (Protos.IG_UserInfo|null);
        public gcNID: Long;
        public bsIP: string;
        public bsPort: number;
        public defs: Uint8Array;
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
            SessionExpire = 1
        }

        enum EGCCState {
            Idle = 0,
            Battle = 1
        }
    }

    interface IGS2GC_Kick {
        opts?: (Protos.IMsgOpts|null);
        reason?: (Protos.CS2GS_KickGC.EReason|null);
    }

    class GS2GC_Kick implements IGS2GC_Kick {
        constructor(properties?: Protos.IGS2GC_Kick);
        public opts?: (Protos.IMsgOpts|null);
        public reason: Protos.CS2GS_KickGC.EReason;
        public static create(properties?: Protos.IGS2GC_Kick): Protos.GS2GC_Kick;
        public static encode(message: Protos.IGS2GC_Kick, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.IGS2GC_Kick, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.GS2GC_Kick;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.GS2GC_Kick;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.GS2GC_Kick;
        public static toObject(message: Protos.GS2GC_Kick, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface IGS2GC_CSLost {
        opts?: (Protos.IMsgOpts|null);
    }

    class GS2GC_CSLost implements IGS2GC_CSLost {
        constructor(properties?: Protos.IGS2GC_CSLost);
        public opts?: (Protos.IMsgOpts|null);
        public static create(properties?: Protos.IGS2GC_CSLost): Protos.GS2GC_CSLost;
        public static encode(message: Protos.IGS2GC_CSLost, writer?: $protobuf.Writer): $protobuf.Writer;
        public static encodeDelimited(message: Protos.IGS2GC_CSLost, writer?: $protobuf.Writer): $protobuf.Writer;
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.GS2GC_CSLost;
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.GS2GC_CSLost;
        public static verify(message: { [k: string]: any }): (string|null);
        public static fromObject(object: { [k: string]: any }): Protos.GS2GC_CSLost;
        public static toObject(message: Protos.GS2GC_CSLost, options?: $protobuf.IConversionOptions): { [k: string]: any };
        public toJSON(): { [k: string]: any };
    }

    interface ILS2CS_GCLogin {
        opts?: (Protos.IMsgOpts|null);
        gcNID?: (Long|null);
        id?: (string|null);
        ukey?: (number|null);
        channel?: (Protos.Global.Channel|null);
        browser?: (Protos.Global.Browser|null);
        platform?: (Protos.Global.Platform|null);
        sessionKey?: (string|null);
        unionID?: (string|null);
        nickname?: (string|null);
        avatar?: (string|null);
        gender?: (number|null);
        money?: (number|null);
        diamoned?: (number|null);
        rank?: (number|null);
        exp?: (number|null);
        champions?: (string|null);
        actorID?: (number|null);
    }

    class LS2CS_GCLogin implements ILS2CS_GCLogin {
        constructor(properties?: Protos.ILS2CS_GCLogin);
        public opts?: (Protos.IMsgOpts|null);
        public gcNID: Long;
        public id: string;
        public ukey: number;
        public channel: Protos.Global.Channel;
        public browser: Protos.Global.Browser;
        public platform: Protos.Global.Platform;
        public sessionKey: string;
        public unionID: string;
        public nickname: string;
        public avatar: string;
        public gender: number;
        public money: number;
        public diamoned: number;
        public rank: number;
        public exp: number;
        public champions: string;
        public actorID: number;
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
        vertPwd?: (boolean|null);
        ip?: (string|null);
        time?: (Long|null);
        channel?: (Protos.Global.Channel|null);
        browser?: (Protos.Global.Browser|null);
        platform?: (Protos.Global.Platform|null);
        unionID?: (string|null);
        nickname?: (string|null);
        avatar?: (string|null);
        gender?: (number|null);
        money?: (number|null);
        diamoned?: (number|null);
        rank?: (number|null);
        exp?: (number|null);
        champions?: (string|null);
    }

    class LS2DB_QueryLogin implements ILS2DB_QueryLogin {
        constructor(properties?: Protos.ILS2DB_QueryLogin);
        public opts?: (Protos.IMsgOpts|null);
        public name: string;
        public pwd: string;
        public vertPwd: boolean;
        public ip: string;
        public time: Long;
        public channel: Protos.Global.Channel;
        public browser: Protos.Global.Browser;
        public platform: Protos.Global.Platform;
        public unionID: string;
        public nickname: string;
        public avatar: string;
        public gender: number;
        public money: number;
        public diamoned: number;
        public rank: number;
        public exp: number;
        public champions: string;
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
            InvalidUname = 2,
            Busy = 3,
            InvalidCode = 4,
            Frequent = 5
        }
    }
}
