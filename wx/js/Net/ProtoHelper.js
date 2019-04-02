import { Protos } from "../Libs/protos";
export class ProtoCreator {
    static Init() {
        if (this._init) {
            return;
        }
        this._init = true;
        ProtoCreator._TYPE2ID.set(Protos.G_AskPing, 10);
        ProtoCreator._TYPE2ID.set(Protos.G_AskPingRet, 11);
        ProtoCreator._TYPE2ID.set(Protos.GC2LS_AskRegister, 1000);
        ProtoCreator._TYPE2ID.set(Protos.GC2LS_AskLogin, 1001);
        ProtoCreator._TYPE2ID.set(Protos.GC2LS_AskSmartLogin, 1002);
        ProtoCreator._TYPE2ID.set(Protos.GC2LS_AskWXLogin, 1003);
        ProtoCreator._TYPE2ID.set(Protos.GC2LC_UpdateProfile, 1004);
        ProtoCreator._TYPE2ID.set(Protos.GC2GS_AskLogin, 1100);
        ProtoCreator._TYPE2ID.set(Protos.GC2GS_KeepAlive, 1101);
        ProtoCreator._TYPE2ID.set(Protos.GC2BS_AskLogin, 1200);
        ProtoCreator._TYPE2ID.set(Protos.GC2BS_KeepAlive, 1201);
        ProtoCreator._TYPE2ID.set(Protos.GC2BS_RequestSnapshot, 1202);
        ProtoCreator._TYPE2ID.set(Protos.GC2BS_FrameAction, 1203);
        ProtoCreator._TYPE2ID.set(Protos.GC2BS_RequestFrameActions, 1204);
        ProtoCreator._TYPE2ID.set(Protos.GC2BS_CommitSnapshot, 1205);
        ProtoCreator._TYPE2ID.set(Protos.GC2BS_EndBattle, 1206);
        ProtoCreator._TYPE2ID.set(Protos.GC2CS_BeginMatch, 1300);
        ProtoCreator._TYPE2ID.set(Protos.GC2CS_CancelMatch, 1301);
        ProtoCreator._TYPE2ID.set(Protos.GC2CS_QueryRanking, 1302);
        ProtoCreator._TYPE2ID.set(Protos.GC2CS_QueryChampions, 1303);
        ProtoCreator._TYPE2ID.set(Protos.GC2CS_BuyChampion, 1304);
        ProtoCreator._TYPE2ID.set(Protos.LS2GC_GSInfo, 2000);
        ProtoCreator._TYPE2ID.set(Protos.LS2GC_AskRegRet, 2001);
        ProtoCreator._TYPE2ID.set(Protos.LS2GC_AskLoginRet, 2002);
        ProtoCreator._TYPE2ID.set(Protos.LS2CS_GCLogin, 2100);
        ProtoCreator._TYPE2ID.set(Protos.LS2DB_QueryAccount, 2200);
        ProtoCreator._TYPE2ID.set(Protos.LS2DB_QueryLogin, 2201);
        ProtoCreator._TYPE2ID.set(Protos.LS2DB_Exec, 2202);
        ProtoCreator._TYPE2ID.set(Protos.GS2CS_ReportState, 3000);
        ProtoCreator._TYPE2ID.set(Protos.GS2CS_GCAskLogin, 3001);
        ProtoCreator._TYPE2ID.set(Protos.GS2CS_GCLost, 3002);
        ProtoCreator._TYPE2ID.set(Protos.GS2GC_LoginRet, 3100);
        ProtoCreator._TYPE2ID.set(Protos.GS2GC_Kick, 3101);
        ProtoCreator._TYPE2ID.set(Protos.GS2GC_CSLost, 3102);
        ProtoCreator._TYPE2ID.set(Protos.BS2CS_ReportState, 4000);
        ProtoCreator._TYPE2ID.set(Protos.BS2CS_BattleInfoRet, 4001);
        ProtoCreator._TYPE2ID.set(Protos.BS2CS_BattleEnd, 4002);
        ProtoCreator._TYPE2ID.set(Protos.BS2CS_KickUser, 4003);
        ProtoCreator._TYPE2ID.set(Protos.BS2GC_LoginRet, 4100);
        ProtoCreator._TYPE2ID.set(Protos.BS2GC_RequestSnapshotRet, 4101);
        ProtoCreator._TYPE2ID.set(Protos.BS2GC_FrameAction, 4102);
        ProtoCreator._TYPE2ID.set(Protos.BS2GC_RequestFrameActionsRet, 4103);
        ProtoCreator._TYPE2ID.set(Protos.BS2GC_OutOfSync, 4104);
        ProtoCreator._TYPE2ID.set(Protos.CS2LS_GSInfos, 5000);
        ProtoCreator._TYPE2ID.set(Protos.CS2LS_GSInfo, 5001);
        ProtoCreator._TYPE2ID.set(Protos.CS2LS_GSLost, 5002);
        ProtoCreator._TYPE2ID.set(Protos.CS2LS_GCLoginRet, 5003);
        ProtoCreator._TYPE2ID.set(Protos.CS2GS_GCLoginRet, 5100);
        ProtoCreator._TYPE2ID.set(Protos.CS2GS_KickGC, 5101);
        ProtoCreator._TYPE2ID.set(Protos.CS2BS_BattleInfo, 5200);
        ProtoCreator._TYPE2ID.set(Protos.CS2BS_BattleEndRet, 5201);
        ProtoCreator._TYPE2ID.set(Protos.CS2GC_BeginMatchRet, 5300);
        ProtoCreator._TYPE2ID.set(Protos.CS2GC_MatchState, 5303);
        ProtoCreator._TYPE2ID.set(Protos.CS2GC_AddToMatch, 5304);
        ProtoCreator._TYPE2ID.set(Protos.CS2GC_RemoveFromMatch, 5305);
        ProtoCreator._TYPE2ID.set(Protos.CS2GC_EnterBattle, 5306);
        ProtoCreator._TYPE2ID.set(Protos.CS2GC_BattleEnd, 5307);
        ProtoCreator._TYPE2ID.set(Protos.CS2GC_BSLose, 5308);
        ProtoCreator._TYPE2ID.set(Protos.CS2GC_QueryRankingRet, 5309);
        ProtoCreator._TYPE2ID.set(Protos.CS2GC_QueryChampionsRet, 5310);
        ProtoCreator._TYPE2ID.set(Protos.CS2GC_BuyChampionRet, 5111);
        ProtoCreator._TYPE2ID.set(Protos.CS2DB_UpdateRank, 5400);
        ProtoCreator._TYPE2ID.set(Protos.CS2DB_QueryRanking, 5401);
        ProtoCreator._TYPE2ID.set(Protos.CS2DB_BuyChampion, 5402);
        ProtoCreator._TYPE2ID.set(Protos.DB2LS_QueryAccountRet, 8000);
        ProtoCreator._TYPE2ID.set(Protos.DB2LS_QueryLoginRet, 8001);
        ProtoCreator._TYPE2ID.set(Protos.DB2LS_ExecRet, 8002);
        ProtoCreator._TYPE2ID.set(Protos.DB2CS_QueryRankingRet, 9000);
        ProtoCreator._TYPE2ID.set(Protos.DB2CS_BuyChampionRet, 9001);
        ProtoCreator._ID2TYPE.set(10, Protos.G_AskPing);
        ProtoCreator._ID2TYPE.set(11, Protos.G_AskPingRet);
        ProtoCreator._ID2TYPE.set(1000, Protos.GC2LS_AskRegister);
        ProtoCreator._ID2TYPE.set(1001, Protos.GC2LS_AskLogin);
        ProtoCreator._ID2TYPE.set(1002, Protos.GC2LS_AskSmartLogin);
        ProtoCreator._ID2TYPE.set(1003, Protos.GC2LS_AskWXLogin);
        ProtoCreator._ID2TYPE.set(1004, Protos.GC2LC_UpdateProfile);
        ProtoCreator._ID2TYPE.set(1100, Protos.GC2GS_AskLogin);
        ProtoCreator._ID2TYPE.set(1101, Protos.GC2GS_KeepAlive);
        ProtoCreator._ID2TYPE.set(1200, Protos.GC2BS_AskLogin);
        ProtoCreator._ID2TYPE.set(1201, Protos.GC2BS_KeepAlive);
        ProtoCreator._ID2TYPE.set(1202, Protos.GC2BS_RequestSnapshot);
        ProtoCreator._ID2TYPE.set(1203, Protos.GC2BS_FrameAction);
        ProtoCreator._ID2TYPE.set(1204, Protos.GC2BS_RequestFrameActions);
        ProtoCreator._ID2TYPE.set(1205, Protos.GC2BS_CommitSnapshot);
        ProtoCreator._ID2TYPE.set(1206, Protos.GC2BS_EndBattle);
        ProtoCreator._ID2TYPE.set(1300, Protos.GC2CS_BeginMatch);
        ProtoCreator._ID2TYPE.set(1301, Protos.GC2CS_CancelMatch);
        ProtoCreator._ID2TYPE.set(1302, Protos.GC2CS_QueryRanking);
        ProtoCreator._ID2TYPE.set(1303, Protos.GC2CS_QueryChampions);
        ProtoCreator._ID2TYPE.set(1304, Protos.GC2CS_BuyChampion);
        ProtoCreator._ID2TYPE.set(2000, Protos.LS2GC_GSInfo);
        ProtoCreator._ID2TYPE.set(2001, Protos.LS2GC_AskRegRet);
        ProtoCreator._ID2TYPE.set(2002, Protos.LS2GC_AskLoginRet);
        ProtoCreator._ID2TYPE.set(2100, Protos.LS2CS_GCLogin);
        ProtoCreator._ID2TYPE.set(2200, Protos.LS2DB_QueryAccount);
        ProtoCreator._ID2TYPE.set(2201, Protos.LS2DB_QueryLogin);
        ProtoCreator._ID2TYPE.set(2202, Protos.LS2DB_Exec);
        ProtoCreator._ID2TYPE.set(3000, Protos.GS2CS_ReportState);
        ProtoCreator._ID2TYPE.set(3001, Protos.GS2CS_GCAskLogin);
        ProtoCreator._ID2TYPE.set(3002, Protos.GS2CS_GCLost);
        ProtoCreator._ID2TYPE.set(3100, Protos.GS2GC_LoginRet);
        ProtoCreator._ID2TYPE.set(3101, Protos.GS2GC_Kick);
        ProtoCreator._ID2TYPE.set(3102, Protos.GS2GC_CSLost);
        ProtoCreator._ID2TYPE.set(4000, Protos.BS2CS_ReportState);
        ProtoCreator._ID2TYPE.set(4001, Protos.BS2CS_BattleInfoRet);
        ProtoCreator._ID2TYPE.set(4002, Protos.BS2CS_BattleEnd);
        ProtoCreator._ID2TYPE.set(4003, Protos.BS2CS_KickUser);
        ProtoCreator._ID2TYPE.set(4100, Protos.BS2GC_LoginRet);
        ProtoCreator._ID2TYPE.set(4101, Protos.BS2GC_RequestSnapshotRet);
        ProtoCreator._ID2TYPE.set(4102, Protos.BS2GC_FrameAction);
        ProtoCreator._ID2TYPE.set(4103, Protos.BS2GC_RequestFrameActionsRet);
        ProtoCreator._ID2TYPE.set(4104, Protos.BS2GC_OutOfSync);
        ProtoCreator._ID2TYPE.set(5000, Protos.CS2LS_GSInfos);
        ProtoCreator._ID2TYPE.set(5001, Protos.CS2LS_GSInfo);
        ProtoCreator._ID2TYPE.set(5002, Protos.CS2LS_GSLost);
        ProtoCreator._ID2TYPE.set(5003, Protos.CS2LS_GCLoginRet);
        ProtoCreator._ID2TYPE.set(5100, Protos.CS2GS_GCLoginRet);
        ProtoCreator._ID2TYPE.set(5101, Protos.CS2GS_KickGC);
        ProtoCreator._ID2TYPE.set(5200, Protos.CS2BS_BattleInfo);
        ProtoCreator._ID2TYPE.set(5201, Protos.CS2BS_BattleEndRet);
        ProtoCreator._ID2TYPE.set(5300, Protos.CS2GC_BeginMatchRet);
        ProtoCreator._ID2TYPE.set(5303, Protos.CS2GC_MatchState);
        ProtoCreator._ID2TYPE.set(5304, Protos.CS2GC_AddToMatch);
        ProtoCreator._ID2TYPE.set(5305, Protos.CS2GC_RemoveFromMatch);
        ProtoCreator._ID2TYPE.set(5306, Protos.CS2GC_EnterBattle);
        ProtoCreator._ID2TYPE.set(5307, Protos.CS2GC_BattleEnd);
        ProtoCreator._ID2TYPE.set(5308, Protos.CS2GC_BSLose);
        ProtoCreator._ID2TYPE.set(5309, Protos.CS2GC_QueryRankingRet);
        ProtoCreator._ID2TYPE.set(5310, Protos.CS2GC_QueryChampionsRet);
        ProtoCreator._ID2TYPE.set(5111, Protos.CS2GC_BuyChampionRet);
        ProtoCreator._ID2TYPE.set(5400, Protos.CS2DB_UpdateRank);
        ProtoCreator._ID2TYPE.set(5401, Protos.CS2DB_QueryRanking);
        ProtoCreator._ID2TYPE.set(5402, Protos.CS2DB_BuyChampion);
        ProtoCreator._ID2TYPE.set(8000, Protos.DB2LS_QueryAccountRet);
        ProtoCreator._ID2TYPE.set(8001, Protos.DB2LS_QueryLoginRet);
        ProtoCreator._ID2TYPE.set(8002, Protos.DB2LS_ExecRet);
        ProtoCreator._ID2TYPE.set(9000, Protos.DB2CS_QueryRankingRet);
        ProtoCreator._ID2TYPE.set(9001, Protos.DB2CS_BuyChampionRet);
    }
    static MakeTransMessage(msg, transTarget, transID) {
        msg.opts.flag |= 1 << 3;
        msg.opts.flag |= 1 << (3 + transTarget);
        msg.opts.transid = transID;
    }
    static Q_G_AskPing() {
        let msg = new Protos.G_AskPing();
        msg.opts = new Protos.MsgOpts();
        msg.opts.flag |= 1 << Protos.MsgOpts.Flag.RPC;
        return msg;
    }
    static Q_G_AskPingRet() {
        let msg = new Protos.G_AskPingRet();
        msg.opts = new Protos.MsgOpts();
        return msg;
    }
    static Q_GC2LS_AskRegister() {
        let msg = new Protos.GC2LS_AskRegister();
        msg.opts = new Protos.MsgOpts();
        msg.opts.flag |= 1 << Protos.MsgOpts.Flag.RPC;
        return msg;
    }
    static Q_GC2LS_AskLogin() {
        let msg = new Protos.GC2LS_AskLogin();
        msg.opts = new Protos.MsgOpts();
        msg.opts.flag |= 1 << Protos.MsgOpts.Flag.RPC;
        return msg;
    }
    static Q_GC2LS_AskSmartLogin() {
        let msg = new Protos.GC2LS_AskSmartLogin();
        msg.opts = new Protos.MsgOpts();
        msg.opts.flag |= 1 << Protos.MsgOpts.Flag.RPC;
        return msg;
    }
    static Q_GC2LS_AskWXLogin() {
        let msg = new Protos.GC2LS_AskWXLogin();
        msg.opts = new Protos.MsgOpts();
        msg.opts.flag |= 1 << Protos.MsgOpts.Flag.RPC;
        return msg;
    }
    static Q_GC2LC_UpdateProfile() {
        let msg = new Protos.GC2LC_UpdateProfile();
        msg.opts = new Protos.MsgOpts();
        return msg;
    }
    static Q_GC2GS_AskLogin() {
        let msg = new Protos.GC2GS_AskLogin();
        msg.opts = new Protos.MsgOpts();
        msg.opts.flag |= 1 << Protos.MsgOpts.Flag.RPC;
        return msg;
    }
    static Q_GC2GS_KeepAlive() {
        let msg = new Protos.GC2GS_KeepAlive();
        msg.opts = new Protos.MsgOpts();
        return msg;
    }
    static Q_GC2BS_AskLogin() {
        let msg = new Protos.GC2BS_AskLogin();
        msg.opts = new Protos.MsgOpts();
        msg.opts.flag |= 1 << Protos.MsgOpts.Flag.RPC;
        return msg;
    }
    static Q_GC2BS_KeepAlive() {
        let msg = new Protos.GC2BS_KeepAlive();
        msg.opts = new Protos.MsgOpts();
        return msg;
    }
    static Q_GC2BS_RequestSnapshot() {
        let msg = new Protos.GC2BS_RequestSnapshot();
        msg.opts = new Protos.MsgOpts();
        msg.opts.flag |= 1 << Protos.MsgOpts.Flag.RPC;
        return msg;
    }
    static Q_GC2BS_FrameAction() {
        let msg = new Protos.GC2BS_FrameAction();
        msg.opts = new Protos.MsgOpts();
        return msg;
    }
    static Q_GC2BS_RequestFrameActions() {
        let msg = new Protos.GC2BS_RequestFrameActions();
        msg.opts = new Protos.MsgOpts();
        msg.opts.flag |= 1 << Protos.MsgOpts.Flag.RPC;
        return msg;
    }
    static Q_GC2BS_CommitSnapshot() {
        let msg = new Protos.GC2BS_CommitSnapshot();
        msg.opts = new Protos.MsgOpts();
        return msg;
    }
    static Q_GC2BS_EndBattle() {
        let msg = new Protos.GC2BS_EndBattle();
        msg.opts = new Protos.MsgOpts();
        return msg;
    }
    static Q_GC2CS_BeginMatch() {
        let msg = new Protos.GC2CS_BeginMatch();
        msg.opts = new Protos.MsgOpts();
        msg.opts.flag |= 1 << Protos.MsgOpts.Flag.RPC;
        return msg;
    }
    static Q_GC2CS_CancelMatch() {
        let msg = new Protos.GC2CS_CancelMatch();
        msg.opts = new Protos.MsgOpts();
        return msg;
    }
    static Q_GC2CS_QueryRanking() {
        let msg = new Protos.GC2CS_QueryRanking();
        msg.opts = new Protos.MsgOpts();
        msg.opts.flag |= 1 << Protos.MsgOpts.Flag.RPC;
        return msg;
    }
    static Q_GC2CS_QueryChampions() {
        let msg = new Protos.GC2CS_QueryChampions();
        msg.opts = new Protos.MsgOpts();
        msg.opts.flag |= 1 << Protos.MsgOpts.Flag.RPC;
        return msg;
    }
    static Q_GC2CS_BuyChampion() {
        let msg = new Protos.GC2CS_BuyChampion();
        msg.opts = new Protos.MsgOpts();
        msg.opts.flag |= 1 << Protos.MsgOpts.Flag.RPC;
        return msg;
    }
    static Q_LS2GC_GSInfo() {
        let msg = new Protos.LS2GC_GSInfo();
        msg.opts = new Protos.MsgOpts();
        return msg;
    }
    static Q_LS2GC_AskRegRet() {
        let msg = new Protos.LS2GC_AskRegRet();
        msg.opts = new Protos.MsgOpts();
        return msg;
    }
    static Q_LS2GC_AskLoginRet() {
        let msg = new Protos.LS2GC_AskLoginRet();
        msg.opts = new Protos.MsgOpts();
        return msg;
    }
    static Q_LS2CS_GCLogin() {
        let msg = new Protos.LS2CS_GCLogin();
        msg.opts = new Protos.MsgOpts();
        msg.opts.flag |= 1 << Protos.MsgOpts.Flag.RPC;
        return msg;
    }
    static Q_LS2DB_QueryAccount() {
        let msg = new Protos.LS2DB_QueryAccount();
        msg.opts = new Protos.MsgOpts();
        msg.opts.flag |= 1 << Protos.MsgOpts.Flag.RPC;
        return msg;
    }
    static Q_LS2DB_QueryLogin() {
        let msg = new Protos.LS2DB_QueryLogin();
        msg.opts = new Protos.MsgOpts();
        msg.opts.flag |= 1 << Protos.MsgOpts.Flag.RPC;
        return msg;
    }
    static Q_LS2DB_Exec() {
        let msg = new Protos.LS2DB_Exec();
        msg.opts = new Protos.MsgOpts();
        msg.opts.flag |= 1 << Protos.MsgOpts.Flag.RPC;
        return msg;
    }
    static Q_GS2CS_ReportState() {
        let msg = new Protos.GS2CS_ReportState();
        msg.opts = new Protos.MsgOpts();
        return msg;
    }
    static Q_GS2CS_GCAskLogin() {
        let msg = new Protos.GS2CS_GCAskLogin();
        msg.opts = new Protos.MsgOpts();
        msg.opts.flag |= 1 << Protos.MsgOpts.Flag.RPC;
        return msg;
    }
    static Q_GS2CS_GCLost() {
        let msg = new Protos.GS2CS_GCLost();
        msg.opts = new Protos.MsgOpts();
        return msg;
    }
    static Q_GS2GC_LoginRet() {
        let msg = new Protos.GS2GC_LoginRet();
        msg.opts = new Protos.MsgOpts();
        return msg;
    }
    static Q_GS2GC_Kick() {
        let msg = new Protos.GS2GC_Kick();
        msg.opts = new Protos.MsgOpts();
        return msg;
    }
    static Q_GS2GC_CSLost() {
        let msg = new Protos.GS2GC_CSLost();
        msg.opts = new Protos.MsgOpts();
        return msg;
    }
    static Q_BS2CS_ReportState() {
        let msg = new Protos.BS2CS_ReportState();
        msg.opts = new Protos.MsgOpts();
        return msg;
    }
    static Q_BS2CS_BattleInfoRet() {
        let msg = new Protos.BS2CS_BattleInfoRet();
        msg.opts = new Protos.MsgOpts();
        return msg;
    }
    static Q_BS2CS_BattleEnd() {
        let msg = new Protos.BS2CS_BattleEnd();
        msg.opts = new Protos.MsgOpts();
        msg.opts.flag |= 1 << Protos.MsgOpts.Flag.RPC;
        return msg;
    }
    static Q_BS2CS_KickUser() {
        let msg = new Protos.BS2CS_KickUser();
        msg.opts = new Protos.MsgOpts();
        return msg;
    }
    static Q_BS2GC_LoginRet() {
        let msg = new Protos.BS2GC_LoginRet();
        msg.opts = new Protos.MsgOpts();
        return msg;
    }
    static Q_BS2GC_RequestSnapshotRet() {
        let msg = new Protos.BS2GC_RequestSnapshotRet();
        msg.opts = new Protos.MsgOpts();
        return msg;
    }
    static Q_BS2GC_FrameAction() {
        let msg = new Protos.BS2GC_FrameAction();
        msg.opts = new Protos.MsgOpts();
        return msg;
    }
    static Q_BS2GC_RequestFrameActionsRet() {
        let msg = new Protos.BS2GC_RequestFrameActionsRet();
        msg.opts = new Protos.MsgOpts();
        return msg;
    }
    static Q_BS2GC_OutOfSync() {
        let msg = new Protos.BS2GC_OutOfSync();
        msg.opts = new Protos.MsgOpts();
        return msg;
    }
    static Q_CS2LS_GSInfos() {
        let msg = new Protos.CS2LS_GSInfos();
        msg.opts = new Protos.MsgOpts();
        return msg;
    }
    static Q_CS2LS_GSInfo() {
        let msg = new Protos.CS2LS_GSInfo();
        msg.opts = new Protos.MsgOpts();
        return msg;
    }
    static Q_CS2LS_GSLost() {
        let msg = new Protos.CS2LS_GSLost();
        msg.opts = new Protos.MsgOpts();
        return msg;
    }
    static Q_CS2LS_GCLoginRet() {
        let msg = new Protos.CS2LS_GCLoginRet();
        msg.opts = new Protos.MsgOpts();
        return msg;
    }
    static Q_CS2GS_GCLoginRet() {
        let msg = new Protos.CS2GS_GCLoginRet();
        msg.opts = new Protos.MsgOpts();
        return msg;
    }
    static Q_CS2GS_KickGC() {
        let msg = new Protos.CS2GS_KickGC();
        msg.opts = new Protos.MsgOpts();
        return msg;
    }
    static Q_CS2BS_BattleInfo() {
        let msg = new Protos.CS2BS_BattleInfo();
        msg.opts = new Protos.MsgOpts();
        msg.opts.flag |= 1 << Protos.MsgOpts.Flag.RPC;
        return msg;
    }
    static Q_CS2BS_BattleEndRet() {
        let msg = new Protos.CS2BS_BattleEndRet();
        msg.opts = new Protos.MsgOpts();
        return msg;
    }
    static Q_CS2GC_BeginMatchRet() {
        let msg = new Protos.CS2GC_BeginMatchRet();
        msg.opts = new Protos.MsgOpts();
        return msg;
    }
    static Q_CS2GC_MatchState() {
        let msg = new Protos.CS2GC_MatchState();
        msg.opts = new Protos.MsgOpts();
        return msg;
    }
    static Q_CS2GC_AddToMatch() {
        let msg = new Protos.CS2GC_AddToMatch();
        msg.opts = new Protos.MsgOpts();
        return msg;
    }
    static Q_CS2GC_RemoveFromMatch() {
        let msg = new Protos.CS2GC_RemoveFromMatch();
        msg.opts = new Protos.MsgOpts();
        return msg;
    }
    static Q_CS2GC_EnterBattle() {
        let msg = new Protos.CS2GC_EnterBattle();
        msg.opts = new Protos.MsgOpts();
        return msg;
    }
    static Q_CS2GC_BattleEnd() {
        let msg = new Protos.CS2GC_BattleEnd();
        msg.opts = new Protos.MsgOpts();
        return msg;
    }
    static Q_CS2GC_BSLose() {
        let msg = new Protos.CS2GC_BSLose();
        msg.opts = new Protos.MsgOpts();
        return msg;
    }
    static Q_CS2GC_QueryRankingRet() {
        let msg = new Protos.CS2GC_QueryRankingRet();
        msg.opts = new Protos.MsgOpts();
        return msg;
    }
    static Q_CS2GC_QueryChampionsRet() {
        let msg = new Protos.CS2GC_QueryChampionsRet();
        msg.opts = new Protos.MsgOpts();
        return msg;
    }
    static Q_CS2GC_BuyChampionRet() {
        let msg = new Protos.CS2GC_BuyChampionRet();
        msg.opts = new Protos.MsgOpts();
        return msg;
    }
    static Q_CS2DB_UpdateRank() {
        let msg = new Protos.CS2DB_UpdateRank();
        msg.opts = new Protos.MsgOpts();
        return msg;
    }
    static Q_CS2DB_QueryRanking() {
        let msg = new Protos.CS2DB_QueryRanking();
        msg.opts = new Protos.MsgOpts();
        msg.opts.flag |= 1 << Protos.MsgOpts.Flag.RPC;
        return msg;
    }
    static Q_CS2DB_BuyChampion() {
        let msg = new Protos.CS2DB_BuyChampion();
        msg.opts = new Protos.MsgOpts();
        msg.opts.flag |= 1 << Protos.MsgOpts.Flag.RPC;
        return msg;
    }
    static Q_DB2LS_QueryAccountRet() {
        let msg = new Protos.DB2LS_QueryAccountRet();
        msg.opts = new Protos.MsgOpts();
        return msg;
    }
    static Q_DB2LS_QueryLoginRet() {
        let msg = new Protos.DB2LS_QueryLoginRet();
        msg.opts = new Protos.MsgOpts();
        return msg;
    }
    static Q_DB2LS_ExecRet() {
        let msg = new Protos.DB2LS_ExecRet();
        msg.opts = new Protos.MsgOpts();
        return msg;
    }
    static Q_DB2CS_QueryRankingRet() {
        let msg = new Protos.DB2CS_QueryRankingRet();
        msg.opts = new Protos.MsgOpts();
        return msg;
    }
    static Q_DB2CS_BuyChampionRet() {
        let msg = new Protos.DB2CS_BuyChampionRet();
        msg.opts = new Protos.MsgOpts();
        return msg;
    }
    static R_GC2LS_AskWXLogin(pid) {
        let msg = new Protos.LS2GC_AskLoginRet();
        msg.opts = new Protos.MsgOpts();
        msg.opts.flag |= 1 << Protos.MsgOpts.Flag.RESP;
        msg.opts.rpid = pid;
        return msg;
    }
    static R_GC2CS_QueryRanking(pid) {
        let msg = new Protos.CS2GC_QueryRankingRet();
        msg.opts = new Protos.MsgOpts();
        msg.opts.flag |= 1 << Protos.MsgOpts.Flag.RESP;
        msg.opts.rpid = pid;
        return msg;
    }
    static R_GC2LS_AskLogin(pid) {
        let msg = new Protos.LS2GC_AskLoginRet();
        msg.opts = new Protos.MsgOpts();
        msg.opts.flag |= 1 << Protos.MsgOpts.Flag.RESP;
        msg.opts.rpid = pid;
        return msg;
    }
    static R_GC2LS_AskRegister(pid) {
        let msg = new Protos.LS2GC_AskRegRet();
        msg.opts = new Protos.MsgOpts();
        msg.opts.flag |= 1 << Protos.MsgOpts.Flag.RESP;
        msg.opts.rpid = pid;
        return msg;
    }
    static R_LS2DB_Exec(pid) {
        let msg = new Protos.DB2LS_ExecRet();
        msg.opts = new Protos.MsgOpts();
        msg.opts.flag |= 1 << Protos.MsgOpts.Flag.RESP;
        msg.opts.rpid = pid;
        return msg;
    }
    static R_G_AskPing(pid) {
        let msg = new Protos.G_AskPingRet();
        msg.opts = new Protos.MsgOpts();
        msg.opts.flag |= 1 << Protos.MsgOpts.Flag.RESP;
        msg.opts.rpid = pid;
        return msg;
    }
    static R_GC2CS_QueryChampions(pid) {
        let msg = new Protos.CS2GC_QueryChampionsRet();
        msg.opts = new Protos.MsgOpts();
        msg.opts.flag |= 1 << Protos.MsgOpts.Flag.RESP;
        msg.opts.rpid = pid;
        return msg;
    }
    static R_BS2CS_BattleEnd(pid) {
        let msg = new Protos.CS2BS_BattleEndRet();
        msg.opts = new Protos.MsgOpts();
        msg.opts.flag |= 1 << Protos.MsgOpts.Flag.RESP;
        msg.opts.rpid = pid;
        return msg;
    }
    static R_LS2DB_QueryLogin(pid) {
        let msg = new Protos.DB2LS_QueryLoginRet();
        msg.opts = new Protos.MsgOpts();
        msg.opts.flag |= 1 << Protos.MsgOpts.Flag.RESP;
        msg.opts.rpid = pid;
        return msg;
    }
    static R_GC2CS_BeginMatch(pid) {
        let msg = new Protos.CS2GC_BeginMatchRet();
        msg.opts = new Protos.MsgOpts();
        msg.opts.flag |= 1 << Protos.MsgOpts.Flag.RESP;
        msg.opts.rpid = pid;
        return msg;
    }
    static R_LS2DB_QueryAccount(pid) {
        let msg = new Protos.DB2LS_QueryAccountRet();
        msg.opts = new Protos.MsgOpts();
        msg.opts.flag |= 1 << Protos.MsgOpts.Flag.RESP;
        msg.opts.rpid = pid;
        return msg;
    }
    static R_GC2GS_AskLogin(pid) {
        let msg = new Protos.GS2GC_LoginRet();
        msg.opts = new Protos.MsgOpts();
        msg.opts.flag |= 1 << Protos.MsgOpts.Flag.RESP;
        msg.opts.rpid = pid;
        return msg;
    }
    static R_GC2BS_RequestSnapshot(pid) {
        let msg = new Protos.BS2GC_RequestSnapshotRet();
        msg.opts = new Protos.MsgOpts();
        msg.opts.flag |= 1 << Protos.MsgOpts.Flag.RESP;
        msg.opts.rpid = pid;
        return msg;
    }
    static R_GC2CS_BuyChampion(pid) {
        let msg = new Protos.CS2GC_BuyChampionRet();
        msg.opts = new Protos.MsgOpts();
        msg.opts.flag |= 1 << Protos.MsgOpts.Flag.RESP;
        msg.opts.rpid = pid;
        return msg;
    }
    static R_GC2BS_RequestFrameActions(pid) {
        let msg = new Protos.BS2GC_RequestFrameActionsRet();
        msg.opts = new Protos.MsgOpts();
        msg.opts.flag |= 1 << Protos.MsgOpts.Flag.RESP;
        msg.opts.rpid = pid;
        return msg;
    }
    static R_CS2DB_BuyChampion(pid) {
        let msg = new Protos.DB2CS_BuyChampionRet();
        msg.opts = new Protos.MsgOpts();
        msg.opts.flag |= 1 << Protos.MsgOpts.Flag.RESP;
        msg.opts.rpid = pid;
        return msg;
    }
    static R_GC2LS_AskSmartLogin(pid) {
        let msg = new Protos.LS2GC_AskLoginRet();
        msg.opts = new Protos.MsgOpts();
        msg.opts.flag |= 1 << Protos.MsgOpts.Flag.RESP;
        msg.opts.rpid = pid;
        return msg;
    }
    static R_LS2CS_GCLogin(pid) {
        let msg = new Protos.CS2LS_GCLoginRet();
        msg.opts = new Protos.MsgOpts();
        msg.opts.flag |= 1 << Protos.MsgOpts.Flag.RESP;
        msg.opts.rpid = pid;
        return msg;
    }
    static R_GC2BS_AskLogin(pid) {
        let msg = new Protos.BS2GC_LoginRet();
        msg.opts = new Protos.MsgOpts();
        msg.opts.flag |= 1 << Protos.MsgOpts.Flag.RESP;
        msg.opts.rpid = pid;
        return msg;
    }
    static R_CS2DB_QueryRanking(pid) {
        let msg = new Protos.DB2CS_QueryRankingRet();
        msg.opts = new Protos.MsgOpts();
        msg.opts.flag |= 1 << Protos.MsgOpts.Flag.RESP;
        msg.opts.rpid = pid;
        return msg;
    }
    static R_CS2BS_BattleInfo(pid) {
        let msg = new Protos.BS2CS_BattleInfoRet();
        msg.opts = new Protos.MsgOpts();
        msg.opts.flag |= 1 << Protos.MsgOpts.Flag.RESP;
        msg.opts.rpid = pid;
        return msg;
    }
    static R_GS2CS_GCAskLogin(pid) {
        let msg = new Protos.CS2GS_GCLoginRet();
        msg.opts = new Protos.MsgOpts();
        msg.opts.flag |= 1 << Protos.MsgOpts.Flag.RESP;
        msg.opts.rpid = pid;
        return msg;
    }
    static DecodeMsg(msgID, data, size) {
        switch (msgID) {
            case 10: {
                let msg = Protos.G_AskPing.decode(data, size);
                return msg;
            }
            case 11: {
                let msg = Protos.G_AskPingRet.decode(data, size);
                return msg;
            }
            case 1000: {
                let msg = Protos.GC2LS_AskRegister.decode(data, size);
                return msg;
            }
            case 1001: {
                let msg = Protos.GC2LS_AskLogin.decode(data, size);
                return msg;
            }
            case 1002: {
                let msg = Protos.GC2LS_AskSmartLogin.decode(data, size);
                return msg;
            }
            case 1003: {
                let msg = Protos.GC2LS_AskWXLogin.decode(data, size);
                return msg;
            }
            case 1004: {
                let msg = Protos.GC2LC_UpdateProfile.decode(data, size);
                return msg;
            }
            case 1100: {
                let msg = Protos.GC2GS_AskLogin.decode(data, size);
                return msg;
            }
            case 1101: {
                let msg = Protos.GC2GS_KeepAlive.decode(data, size);
                return msg;
            }
            case 1200: {
                let msg = Protos.GC2BS_AskLogin.decode(data, size);
                return msg;
            }
            case 1201: {
                let msg = Protos.GC2BS_KeepAlive.decode(data, size);
                return msg;
            }
            case 1202: {
                let msg = Protos.GC2BS_RequestSnapshot.decode(data, size);
                return msg;
            }
            case 1203: {
                let msg = Protos.GC2BS_FrameAction.decode(data, size);
                return msg;
            }
            case 1204: {
                let msg = Protos.GC2BS_RequestFrameActions.decode(data, size);
                return msg;
            }
            case 1205: {
                let msg = Protos.GC2BS_CommitSnapshot.decode(data, size);
                return msg;
            }
            case 1206: {
                let msg = Protos.GC2BS_EndBattle.decode(data, size);
                return msg;
            }
            case 1300: {
                let msg = Protos.GC2CS_BeginMatch.decode(data, size);
                return msg;
            }
            case 1301: {
                let msg = Protos.GC2CS_CancelMatch.decode(data, size);
                return msg;
            }
            case 1302: {
                let msg = Protos.GC2CS_QueryRanking.decode(data, size);
                return msg;
            }
            case 1303: {
                let msg = Protos.GC2CS_QueryChampions.decode(data, size);
                return msg;
            }
            case 1304: {
                let msg = Protos.GC2CS_BuyChampion.decode(data, size);
                return msg;
            }
            case 2000: {
                let msg = Protos.LS2GC_GSInfo.decode(data, size);
                return msg;
            }
            case 2001: {
                let msg = Protos.LS2GC_AskRegRet.decode(data, size);
                return msg;
            }
            case 2002: {
                let msg = Protos.LS2GC_AskLoginRet.decode(data, size);
                return msg;
            }
            case 2100: {
                let msg = Protos.LS2CS_GCLogin.decode(data, size);
                return msg;
            }
            case 2200: {
                let msg = Protos.LS2DB_QueryAccount.decode(data, size);
                return msg;
            }
            case 2201: {
                let msg = Protos.LS2DB_QueryLogin.decode(data, size);
                return msg;
            }
            case 2202: {
                let msg = Protos.LS2DB_Exec.decode(data, size);
                return msg;
            }
            case 3000: {
                let msg = Protos.GS2CS_ReportState.decode(data, size);
                return msg;
            }
            case 3001: {
                let msg = Protos.GS2CS_GCAskLogin.decode(data, size);
                return msg;
            }
            case 3002: {
                let msg = Protos.GS2CS_GCLost.decode(data, size);
                return msg;
            }
            case 3100: {
                let msg = Protos.GS2GC_LoginRet.decode(data, size);
                return msg;
            }
            case 3101: {
                let msg = Protos.GS2GC_Kick.decode(data, size);
                return msg;
            }
            case 3102: {
                let msg = Protos.GS2GC_CSLost.decode(data, size);
                return msg;
            }
            case 4000: {
                let msg = Protos.BS2CS_ReportState.decode(data, size);
                return msg;
            }
            case 4001: {
                let msg = Protos.BS2CS_BattleInfoRet.decode(data, size);
                return msg;
            }
            case 4002: {
                let msg = Protos.BS2CS_BattleEnd.decode(data, size);
                return msg;
            }
            case 4003: {
                let msg = Protos.BS2CS_KickUser.decode(data, size);
                return msg;
            }
            case 4100: {
                let msg = Protos.BS2GC_LoginRet.decode(data, size);
                return msg;
            }
            case 4101: {
                let msg = Protos.BS2GC_RequestSnapshotRet.decode(data, size);
                return msg;
            }
            case 4102: {
                let msg = Protos.BS2GC_FrameAction.decode(data, size);
                return msg;
            }
            case 4103: {
                let msg = Protos.BS2GC_RequestFrameActionsRet.decode(data, size);
                return msg;
            }
            case 4104: {
                let msg = Protos.BS2GC_OutOfSync.decode(data, size);
                return msg;
            }
            case 5000: {
                let msg = Protos.CS2LS_GSInfos.decode(data, size);
                return msg;
            }
            case 5001: {
                let msg = Protos.CS2LS_GSInfo.decode(data, size);
                return msg;
            }
            case 5002: {
                let msg = Protos.CS2LS_GSLost.decode(data, size);
                return msg;
            }
            case 5003: {
                let msg = Protos.CS2LS_GCLoginRet.decode(data, size);
                return msg;
            }
            case 5100: {
                let msg = Protos.CS2GS_GCLoginRet.decode(data, size);
                return msg;
            }
            case 5101: {
                let msg = Protos.CS2GS_KickGC.decode(data, size);
                return msg;
            }
            case 5200: {
                let msg = Protos.CS2BS_BattleInfo.decode(data, size);
                return msg;
            }
            case 5201: {
                let msg = Protos.CS2BS_BattleEndRet.decode(data, size);
                return msg;
            }
            case 5300: {
                let msg = Protos.CS2GC_BeginMatchRet.decode(data, size);
                return msg;
            }
            case 5303: {
                let msg = Protos.CS2GC_MatchState.decode(data, size);
                return msg;
            }
            case 5304: {
                let msg = Protos.CS2GC_AddToMatch.decode(data, size);
                return msg;
            }
            case 5305: {
                let msg = Protos.CS2GC_RemoveFromMatch.decode(data, size);
                return msg;
            }
            case 5306: {
                let msg = Protos.CS2GC_EnterBattle.decode(data, size);
                return msg;
            }
            case 5307: {
                let msg = Protos.CS2GC_BattleEnd.decode(data, size);
                return msg;
            }
            case 5308: {
                let msg = Protos.CS2GC_BSLose.decode(data, size);
                return msg;
            }
            case 5309: {
                let msg = Protos.CS2GC_QueryRankingRet.decode(data, size);
                return msg;
            }
            case 5310: {
                let msg = Protos.CS2GC_QueryChampionsRet.decode(data, size);
                return msg;
            }
            case 5111: {
                let msg = Protos.CS2GC_BuyChampionRet.decode(data, size);
                return msg;
            }
            case 5400: {
                let msg = Protos.CS2DB_UpdateRank.decode(data, size);
                return msg;
            }
            case 5401: {
                let msg = Protos.CS2DB_QueryRanking.decode(data, size);
                return msg;
            }
            case 5402: {
                let msg = Protos.CS2DB_BuyChampion.decode(data, size);
                return msg;
            }
            case 8000: {
                let msg = Protos.DB2LS_QueryAccountRet.decode(data, size);
                return msg;
            }
            case 8001: {
                let msg = Protos.DB2LS_QueryLoginRet.decode(data, size);
                return msg;
            }
            case 8002: {
                let msg = Protos.DB2LS_ExecRet.decode(data, size);
                return msg;
            }
            case 9000: {
                let msg = Protos.DB2CS_QueryRankingRet.decode(data, size);
                return msg;
            }
            case 9001: {
                let msg = Protos.DB2CS_BuyChampionRet.decode(data, size);
                return msg;
            }
        }
        return null;
    }
    static D_G_AskPing(data, size) {
        let msg = Protos.G_AskPing.decode(data, size);
        return msg;
    }
    static D_G_AskPingRet(data, size) {
        let msg = Protos.G_AskPingRet.decode(data, size);
        return msg;
    }
    static D_GC2LS_AskRegister(data, size) {
        let msg = Protos.GC2LS_AskRegister.decode(data, size);
        return msg;
    }
    static D_GC2LS_AskLogin(data, size) {
        let msg = Protos.GC2LS_AskLogin.decode(data, size);
        return msg;
    }
    static D_GC2LS_AskSmartLogin(data, size) {
        let msg = Protos.GC2LS_AskSmartLogin.decode(data, size);
        return msg;
    }
    static D_GC2LS_AskWXLogin(data, size) {
        let msg = Protos.GC2LS_AskWXLogin.decode(data, size);
        return msg;
    }
    static D_GC2LC_UpdateProfile(data, size) {
        let msg = Protos.GC2LC_UpdateProfile.decode(data, size);
        return msg;
    }
    static D_GC2GS_AskLogin(data, size) {
        let msg = Protos.GC2GS_AskLogin.decode(data, size);
        return msg;
    }
    static D_GC2GS_KeepAlive(data, size) {
        let msg = Protos.GC2GS_KeepAlive.decode(data, size);
        return msg;
    }
    static D_GC2BS_AskLogin(data, size) {
        let msg = Protos.GC2BS_AskLogin.decode(data, size);
        return msg;
    }
    static D_GC2BS_KeepAlive(data, size) {
        let msg = Protos.GC2BS_KeepAlive.decode(data, size);
        return msg;
    }
    static D_GC2BS_RequestSnapshot(data, size) {
        let msg = Protos.GC2BS_RequestSnapshot.decode(data, size);
        return msg;
    }
    static D_GC2BS_FrameAction(data, size) {
        let msg = Protos.GC2BS_FrameAction.decode(data, size);
        return msg;
    }
    static D_GC2BS_RequestFrameActions(data, size) {
        let msg = Protos.GC2BS_RequestFrameActions.decode(data, size);
        return msg;
    }
    static D_GC2BS_CommitSnapshot(data, size) {
        let msg = Protos.GC2BS_CommitSnapshot.decode(data, size);
        return msg;
    }
    static D_GC2BS_EndBattle(data, size) {
        let msg = Protos.GC2BS_EndBattle.decode(data, size);
        return msg;
    }
    static D_GC2CS_BeginMatch(data, size) {
        let msg = Protos.GC2CS_BeginMatch.decode(data, size);
        return msg;
    }
    static D_GC2CS_CancelMatch(data, size) {
        let msg = Protos.GC2CS_CancelMatch.decode(data, size);
        return msg;
    }
    static D_GC2CS_QueryRanking(data, size) {
        let msg = Protos.GC2CS_QueryRanking.decode(data, size);
        return msg;
    }
    static D_GC2CS_QueryChampions(data, size) {
        let msg = Protos.GC2CS_QueryChampions.decode(data, size);
        return msg;
    }
    static D_GC2CS_BuyChampion(data, size) {
        let msg = Protos.GC2CS_BuyChampion.decode(data, size);
        return msg;
    }
    static D_LS2GC_GSInfo(data, size) {
        let msg = Protos.LS2GC_GSInfo.decode(data, size);
        return msg;
    }
    static D_LS2GC_AskRegRet(data, size) {
        let msg = Protos.LS2GC_AskRegRet.decode(data, size);
        return msg;
    }
    static D_LS2GC_AskLoginRet(data, size) {
        let msg = Protos.LS2GC_AskLoginRet.decode(data, size);
        return msg;
    }
    static D_LS2CS_GCLogin(data, size) {
        let msg = Protos.LS2CS_GCLogin.decode(data, size);
        return msg;
    }
    static D_LS2DB_QueryAccount(data, size) {
        let msg = Protos.LS2DB_QueryAccount.decode(data, size);
        return msg;
    }
    static D_LS2DB_QueryLogin(data, size) {
        let msg = Protos.LS2DB_QueryLogin.decode(data, size);
        return msg;
    }
    static D_LS2DB_Exec(data, size) {
        let msg = Protos.LS2DB_Exec.decode(data, size);
        return msg;
    }
    static D_GS2CS_ReportState(data, size) {
        let msg = Protos.GS2CS_ReportState.decode(data, size);
        return msg;
    }
    static D_GS2CS_GCAskLogin(data, size) {
        let msg = Protos.GS2CS_GCAskLogin.decode(data, size);
        return msg;
    }
    static D_GS2CS_GCLost(data, size) {
        let msg = Protos.GS2CS_GCLost.decode(data, size);
        return msg;
    }
    static D_GS2GC_LoginRet(data, size) {
        let msg = Protos.GS2GC_LoginRet.decode(data, size);
        return msg;
    }
    static D_GS2GC_Kick(data, size) {
        let msg = Protos.GS2GC_Kick.decode(data, size);
        return msg;
    }
    static D_GS2GC_CSLost(data, size) {
        let msg = Protos.GS2GC_CSLost.decode(data, size);
        return msg;
    }
    static D_BS2CS_ReportState(data, size) {
        let msg = Protos.BS2CS_ReportState.decode(data, size);
        return msg;
    }
    static D_BS2CS_BattleInfoRet(data, size) {
        let msg = Protos.BS2CS_BattleInfoRet.decode(data, size);
        return msg;
    }
    static D_BS2CS_BattleEnd(data, size) {
        let msg = Protos.BS2CS_BattleEnd.decode(data, size);
        return msg;
    }
    static D_BS2CS_KickUser(data, size) {
        let msg = Protos.BS2CS_KickUser.decode(data, size);
        return msg;
    }
    static D_BS2GC_LoginRet(data, size) {
        let msg = Protos.BS2GC_LoginRet.decode(data, size);
        return msg;
    }
    static D_BS2GC_RequestSnapshotRet(data, size) {
        let msg = Protos.BS2GC_RequestSnapshotRet.decode(data, size);
        return msg;
    }
    static D_BS2GC_FrameAction(data, size) {
        let msg = Protos.BS2GC_FrameAction.decode(data, size);
        return msg;
    }
    static D_BS2GC_RequestFrameActionsRet(data, size) {
        let msg = Protos.BS2GC_RequestFrameActionsRet.decode(data, size);
        return msg;
    }
    static D_BS2GC_OutOfSync(data, size) {
        let msg = Protos.BS2GC_OutOfSync.decode(data, size);
        return msg;
    }
    static D_CS2LS_GSInfos(data, size) {
        let msg = Protos.CS2LS_GSInfos.decode(data, size);
        return msg;
    }
    static D_CS2LS_GSInfo(data, size) {
        let msg = Protos.CS2LS_GSInfo.decode(data, size);
        return msg;
    }
    static D_CS2LS_GSLost(data, size) {
        let msg = Protos.CS2LS_GSLost.decode(data, size);
        return msg;
    }
    static D_CS2LS_GCLoginRet(data, size) {
        let msg = Protos.CS2LS_GCLoginRet.decode(data, size);
        return msg;
    }
    static D_CS2GS_GCLoginRet(data, size) {
        let msg = Protos.CS2GS_GCLoginRet.decode(data, size);
        return msg;
    }
    static D_CS2GS_KickGC(data, size) {
        let msg = Protos.CS2GS_KickGC.decode(data, size);
        return msg;
    }
    static D_CS2BS_BattleInfo(data, size) {
        let msg = Protos.CS2BS_BattleInfo.decode(data, size);
        return msg;
    }
    static D_CS2BS_BattleEndRet(data, size) {
        let msg = Protos.CS2BS_BattleEndRet.decode(data, size);
        return msg;
    }
    static D_CS2GC_BeginMatchRet(data, size) {
        let msg = Protos.CS2GC_BeginMatchRet.decode(data, size);
        return msg;
    }
    static D_CS2GC_MatchState(data, size) {
        let msg = Protos.CS2GC_MatchState.decode(data, size);
        return msg;
    }
    static D_CS2GC_AddToMatch(data, size) {
        let msg = Protos.CS2GC_AddToMatch.decode(data, size);
        return msg;
    }
    static D_CS2GC_RemoveFromMatch(data, size) {
        let msg = Protos.CS2GC_RemoveFromMatch.decode(data, size);
        return msg;
    }
    static D_CS2GC_EnterBattle(data, size) {
        let msg = Protos.CS2GC_EnterBattle.decode(data, size);
        return msg;
    }
    static D_CS2GC_BattleEnd(data, size) {
        let msg = Protos.CS2GC_BattleEnd.decode(data, size);
        return msg;
    }
    static D_CS2GC_BSLose(data, size) {
        let msg = Protos.CS2GC_BSLose.decode(data, size);
        return msg;
    }
    static D_CS2GC_QueryRankingRet(data, size) {
        let msg = Protos.CS2GC_QueryRankingRet.decode(data, size);
        return msg;
    }
    static D_CS2GC_QueryChampionsRet(data, size) {
        let msg = Protos.CS2GC_QueryChampionsRet.decode(data, size);
        return msg;
    }
    static D_CS2GC_BuyChampionRet(data, size) {
        let msg = Protos.CS2GC_BuyChampionRet.decode(data, size);
        return msg;
    }
    static D_CS2DB_UpdateRank(data, size) {
        let msg = Protos.CS2DB_UpdateRank.decode(data, size);
        return msg;
    }
    static D_CS2DB_QueryRanking(data, size) {
        let msg = Protos.CS2DB_QueryRanking.decode(data, size);
        return msg;
    }
    static D_CS2DB_BuyChampion(data, size) {
        let msg = Protos.CS2DB_BuyChampion.decode(data, size);
        return msg;
    }
    static D_DB2LS_QueryAccountRet(data, size) {
        let msg = Protos.DB2LS_QueryAccountRet.decode(data, size);
        return msg;
    }
    static D_DB2LS_QueryLoginRet(data, size) {
        let msg = Protos.DB2LS_QueryLoginRet.decode(data, size);
        return msg;
    }
    static D_DB2LS_ExecRet(data, size) {
        let msg = Protos.DB2LS_ExecRet.decode(data, size);
        return msg;
    }
    static D_DB2CS_QueryRankingRet(data, size) {
        let msg = Protos.DB2CS_QueryRankingRet.decode(data, size);
        return msg;
    }
    static D_DB2CS_BuyChampionRet(data, size) {
        let msg = Protos.DB2CS_BuyChampionRet.decode(data, size);
        return msg;
    }
    static CreateMsgByID(msgID) {
        switch (msgID) {
            case 10: {
                return new Protos.G_AskPing();
            }
            case 11: {
                return new Protos.G_AskPingRet();
            }
            case 1000: {
                return new Protos.GC2LS_AskRegister();
            }
            case 1001: {
                return new Protos.GC2LS_AskLogin();
            }
            case 1002: {
                return new Protos.GC2LS_AskSmartLogin();
            }
            case 1003: {
                return new Protos.GC2LS_AskWXLogin();
            }
            case 1004: {
                return new Protos.GC2LC_UpdateProfile();
            }
            case 1100: {
                return new Protos.GC2GS_AskLogin();
            }
            case 1101: {
                return new Protos.GC2GS_KeepAlive();
            }
            case 1200: {
                return new Protos.GC2BS_AskLogin();
            }
            case 1201: {
                return new Protos.GC2BS_KeepAlive();
            }
            case 1202: {
                return new Protos.GC2BS_RequestSnapshot();
            }
            case 1203: {
                return new Protos.GC2BS_FrameAction();
            }
            case 1204: {
                return new Protos.GC2BS_RequestFrameActions();
            }
            case 1205: {
                return new Protos.GC2BS_CommitSnapshot();
            }
            case 1206: {
                return new Protos.GC2BS_EndBattle();
            }
            case 1300: {
                return new Protos.GC2CS_BeginMatch();
            }
            case 1301: {
                return new Protos.GC2CS_CancelMatch();
            }
            case 1302: {
                return new Protos.GC2CS_QueryRanking();
            }
            case 1303: {
                return new Protos.GC2CS_QueryChampions();
            }
            case 1304: {
                return new Protos.GC2CS_BuyChampion();
            }
            case 2000: {
                return new Protos.LS2GC_GSInfo();
            }
            case 2001: {
                return new Protos.LS2GC_AskRegRet();
            }
            case 2002: {
                return new Protos.LS2GC_AskLoginRet();
            }
            case 2100: {
                return new Protos.LS2CS_GCLogin();
            }
            case 2200: {
                return new Protos.LS2DB_QueryAccount();
            }
            case 2201: {
                return new Protos.LS2DB_QueryLogin();
            }
            case 2202: {
                return new Protos.LS2DB_Exec();
            }
            case 3000: {
                return new Protos.GS2CS_ReportState();
            }
            case 3001: {
                return new Protos.GS2CS_GCAskLogin();
            }
            case 3002: {
                return new Protos.GS2CS_GCLost();
            }
            case 3100: {
                return new Protos.GS2GC_LoginRet();
            }
            case 3101: {
                return new Protos.GS2GC_Kick();
            }
            case 3102: {
                return new Protos.GS2GC_CSLost();
            }
            case 4000: {
                return new Protos.BS2CS_ReportState();
            }
            case 4001: {
                return new Protos.BS2CS_BattleInfoRet();
            }
            case 4002: {
                return new Protos.BS2CS_BattleEnd();
            }
            case 4003: {
                return new Protos.BS2CS_KickUser();
            }
            case 4100: {
                return new Protos.BS2GC_LoginRet();
            }
            case 4101: {
                return new Protos.BS2GC_RequestSnapshotRet();
            }
            case 4102: {
                return new Protos.BS2GC_FrameAction();
            }
            case 4103: {
                return new Protos.BS2GC_RequestFrameActionsRet();
            }
            case 4104: {
                return new Protos.BS2GC_OutOfSync();
            }
            case 5000: {
                return new Protos.CS2LS_GSInfos();
            }
            case 5001: {
                return new Protos.CS2LS_GSInfo();
            }
            case 5002: {
                return new Protos.CS2LS_GSLost();
            }
            case 5003: {
                return new Protos.CS2LS_GCLoginRet();
            }
            case 5100: {
                return new Protos.CS2GS_GCLoginRet();
            }
            case 5101: {
                return new Protos.CS2GS_KickGC();
            }
            case 5200: {
                return new Protos.CS2BS_BattleInfo();
            }
            case 5201: {
                return new Protos.CS2BS_BattleEndRet();
            }
            case 5300: {
                return new Protos.CS2GC_BeginMatchRet();
            }
            case 5303: {
                return new Protos.CS2GC_MatchState();
            }
            case 5304: {
                return new Protos.CS2GC_AddToMatch();
            }
            case 5305: {
                return new Protos.CS2GC_RemoveFromMatch();
            }
            case 5306: {
                return new Protos.CS2GC_EnterBattle();
            }
            case 5307: {
                return new Protos.CS2GC_BattleEnd();
            }
            case 5308: {
                return new Protos.CS2GC_BSLose();
            }
            case 5309: {
                return new Protos.CS2GC_QueryRankingRet();
            }
            case 5310: {
                return new Protos.CS2GC_QueryChampionsRet();
            }
            case 5111: {
                return new Protos.CS2GC_BuyChampionRet();
            }
            case 5400: {
                return new Protos.CS2DB_UpdateRank();
            }
            case 5401: {
                return new Protos.CS2DB_QueryRanking();
            }
            case 5402: {
                return new Protos.CS2DB_BuyChampion();
            }
            case 8000: {
                return new Protos.DB2LS_QueryAccountRet();
            }
            case 8001: {
                return new Protos.DB2LS_QueryLoginRet();
            }
            case 8002: {
                return new Protos.DB2LS_ExecRet();
            }
            case 9000: {
                return new Protos.DB2CS_QueryRankingRet();
            }
            case 9001: {
                return new Protos.DB2CS_BuyChampionRet();
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
            case 1003: {
                return message.opts;
            }
            case 1004: {
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
            case 1202: {
                return message.opts;
            }
            case 1203: {
                return message.opts;
            }
            case 1204: {
                return message.opts;
            }
            case 1205: {
                return message.opts;
            }
            case 1206: {
                return message.opts;
            }
            case 1300: {
                return message.opts;
            }
            case 1301: {
                return message.opts;
            }
            case 1302: {
                return message.opts;
            }
            case 1303: {
                return message.opts;
            }
            case 1304: {
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
            case 3100: {
                return message.opts;
            }
            case 3101: {
                return message.opts;
            }
            case 3102: {
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
            case 4101: {
                return message.opts;
            }
            case 4102: {
                return message.opts;
            }
            case 4103: {
                return message.opts;
            }
            case 4104: {
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
            case 5303: {
                return message.opts;
            }
            case 5304: {
                return message.opts;
            }
            case 5305: {
                return message.opts;
            }
            case 5306: {
                return message.opts;
            }
            case 5307: {
                return message.opts;
            }
            case 5308: {
                return message.opts;
            }
            case 5309: {
                return message.opts;
            }
            case 5310: {
                return message.opts;
            }
            case 5111: {
                return message.opts;
            }
            case 5400: {
                return message.opts;
            }
            case 5401: {
                return message.opts;
            }
            case 5402: {
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
            case 9000: {
                return message.opts;
            }
            case 9001: {
                return message.opts;
            }
        }
        return null;
    }
    static GetMsgIDByType(type) { return ProtoCreator._TYPE2ID.get(type); }
    static GetMsgID(message) { return ProtoCreator._TYPE2ID.get(message.constructor); }
}
ProtoCreator._init = false;
ProtoCreator._TYPE2ID = new Map();
ProtoCreator._ID2TYPE = new Map();
