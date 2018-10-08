﻿//<auto-generated>
//	Generated by proto generator.  DO NOT EDIT!
//</auto-generated>
//ReSharper disable CheckNamespace
import { Protos } from "../libs/protos";

export class ProtoCreator {
	private static readonly _TYPE2ID = new Map<new () => any, Protos.MsgID>([
		[Protos.G_AskPing, <Protos.MsgID>10],
		[Protos.G_AskPingRet, <Protos.MsgID>11],
		[Protos.GC2LS_AskRegister, <Protos.MsgID>1000],
		[Protos.GC2LS_AskLogin, <Protos.MsgID>1001],
		[Protos.GC2GS_AskLogin, <Protos.MsgID>1100],
		[Protos.GC2GS_KeepAlive, <Protos.MsgID>1101],
		[Protos.GC2BS_AskLogin, <Protos.MsgID>1200],
		[Protos.GC2BS_KeepAlive, <Protos.MsgID>1201],
		[Protos.GC2CS_BeginMatch, <Protos.MsgID>1300],
		[Protos.LS2GC_GSInfo, <Protos.MsgID>2000],
		[Protos.LS2GC_AskRegRet, <Protos.MsgID>2001],
		[Protos.LS2GC_AskLoginRet, <Protos.MsgID>2002],
		[Protos.LS2CS_GCLogin, <Protos.MsgID>2100],
		[Protos.LS2DB_QueryAccount, <Protos.MsgID>2200],
		[Protos.LS2DB_QueryLogin, <Protos.MsgID>2201],
		[Protos.LS2DB_Exec, <Protos.MsgID>2202],
		[Protos.GS2CS_ReportState, <Protos.MsgID>3000],
		[Protos.GS2CS_GCAskLogin, <Protos.MsgID>3001],
		[Protos.GS2CS_GCLost, <Protos.MsgID>3002],
		[Protos.GS2GC_LoginRet, <Protos.MsgID>3100],
		[Protos.BS2CS_ReportState, <Protos.MsgID>4000],
		[Protos.BS2CS_GCAskLogin, <Protos.MsgID>4001],
		[Protos.BS2CS_GCLost, <Protos.MsgID>4002],
		[Protos.BS2CS_RommInfoRet, <Protos.MsgID>4003],
		[Protos.BS2GC_LoginRet, <Protos.MsgID>4100],
		[Protos.CS2LS_GSInfos, <Protos.MsgID>5000],
		[Protos.CS2LS_GSInfo, <Protos.MsgID>5001],
		[Protos.CS2LS_GSLost, <Protos.MsgID>5002],
		[Protos.CS2LS_GCLoginRet, <Protos.MsgID>5003],
		[Protos.CS2GS_GCLoginRet, <Protos.MsgID>5100],
		[Protos.CS2BS_GCLoginRet, <Protos.MsgID>5200],
		[Protos.CS2BS_RoomInfo, <Protos.MsgID>5201],
		[Protos.CS2GC_BeginMatchRet, <Protos.MsgID>5300],
		[Protos.DB2LS_QueryAccountRet, <Protos.MsgID>8000],
		[Protos.DB2LS_QueryLoginRet, <Protos.MsgID>8001],
		[Protos.DB2LS_ExecRet, <Protos.MsgID>8002],
	]);

	private static readonly _ID2TYPE = new Map<Protos.MsgID, new () => any>([
		[<Protos.MsgID>10, Protos.G_AskPing],
		[<Protos.MsgID>11, Protos.G_AskPingRet],
		[<Protos.MsgID>1000, Protos.GC2LS_AskRegister],
		[<Protos.MsgID>1001, Protos.GC2LS_AskLogin],
		[<Protos.MsgID>1100, Protos.GC2GS_AskLogin],
		[<Protos.MsgID>1101, Protos.GC2GS_KeepAlive],
		[<Protos.MsgID>1200, Protos.GC2BS_AskLogin],
		[<Protos.MsgID>1201, Protos.GC2BS_KeepAlive],
		[<Protos.MsgID>1300, Protos.GC2CS_BeginMatch],
		[<Protos.MsgID>2000, Protos.LS2GC_GSInfo],
		[<Protos.MsgID>2001, Protos.LS2GC_AskRegRet],
		[<Protos.MsgID>2002, Protos.LS2GC_AskLoginRet],
		[<Protos.MsgID>2100, Protos.LS2CS_GCLogin],
		[<Protos.MsgID>2200, Protos.LS2DB_QueryAccount],
		[<Protos.MsgID>2201, Protos.LS2DB_QueryLogin],
		[<Protos.MsgID>2202, Protos.LS2DB_Exec],
		[<Protos.MsgID>3000, Protos.GS2CS_ReportState],
		[<Protos.MsgID>3001, Protos.GS2CS_GCAskLogin],
		[<Protos.MsgID>3002, Protos.GS2CS_GCLost],
		[<Protos.MsgID>3100, Protos.GS2GC_LoginRet],
		[<Protos.MsgID>4000, Protos.BS2CS_ReportState],
		[<Protos.MsgID>4001, Protos.BS2CS_GCAskLogin],
		[<Protos.MsgID>4002, Protos.BS2CS_GCLost],
		[<Protos.MsgID>4003, Protos.BS2CS_RommInfoRet],
		[<Protos.MsgID>4100, Protos.BS2GC_LoginRet],
		[<Protos.MsgID>5000, Protos.CS2LS_GSInfos],
		[<Protos.MsgID>5001, Protos.CS2LS_GSInfo],
		[<Protos.MsgID>5002, Protos.CS2LS_GSLost],
		[<Protos.MsgID>5003, Protos.CS2LS_GCLoginRet],
		[<Protos.MsgID>5100, Protos.CS2GS_GCLoginRet],
		[<Protos.MsgID>5200, Protos.CS2BS_GCLoginRet],
		[<Protos.MsgID>5201, Protos.CS2BS_RoomInfo],
		[<Protos.MsgID>5300, Protos.CS2GC_BeginMatchRet],
		[<Protos.MsgID>8000, Protos.DB2LS_QueryAccountRet],
		[<Protos.MsgID>8001, Protos.DB2LS_QueryLoginRet],
		[<Protos.MsgID>8002, Protos.DB2LS_ExecRet],
	]);

	public static Q_G_AskPing(): Protos.G_AskPing {
		let msg = new Protos.G_AskPing();
		msg.opts = new Protos.MsgOpts();
		msg.opts.flag |= 1 << Protos.MsgOpts.Flag.RPC;
		return msg;
	}

	public static Q_G_AskPingRet(): Protos.G_AskPingRet {
		let msg = new Protos.G_AskPingRet();
		msg.opts = new Protos.MsgOpts();
		return msg;
	}

	public static Q_GC2LS_AskRegister(): Protos.GC2LS_AskRegister {
		let msg = new Protos.GC2LS_AskRegister();
		msg.opts = new Protos.MsgOpts();
		msg.opts.flag |= 1 << Protos.MsgOpts.Flag.RPC;
		return msg;
	}

	public static Q_GC2LS_AskLogin(): Protos.GC2LS_AskLogin {
		let msg = new Protos.GC2LS_AskLogin();
		msg.opts = new Protos.MsgOpts();
		msg.opts.flag |= 1 << Protos.MsgOpts.Flag.RPC;
		return msg;
	}

	public static Q_GC2GS_AskLogin(): Protos.GC2GS_AskLogin {
		let msg = new Protos.GC2GS_AskLogin();
		msg.opts = new Protos.MsgOpts();
		msg.opts.flag |= 1 << Protos.MsgOpts.Flag.RPC;
		return msg;
	}

	public static Q_GC2GS_KeepAlive(): Protos.GC2GS_KeepAlive {
		let msg = new Protos.GC2GS_KeepAlive();
		msg.opts = new Protos.MsgOpts();
		return msg;
	}

	public static Q_GC2BS_AskLogin(): Protos.GC2BS_AskLogin {
		let msg = new Protos.GC2BS_AskLogin();
		msg.opts = new Protos.MsgOpts();
		msg.opts.flag |= 1 << Protos.MsgOpts.Flag.RPC;
		return msg;
	}

	public static Q_GC2BS_KeepAlive(): Protos.GC2BS_KeepAlive {
		let msg = new Protos.GC2BS_KeepAlive();
		msg.opts = new Protos.MsgOpts();
		return msg;
	}

	public static Q_GC2CS_BeginMatch(): Protos.GC2CS_BeginMatch {
		let msg = new Protos.GC2CS_BeginMatch();
		msg.opts = new Protos.MsgOpts();
		msg.opts.flag |= 1 << Protos.MsgOpts.Flag.RPC;
		return msg;
	}

	public static Q_LS2GC_GSInfo(): Protos.LS2GC_GSInfo {
		let msg = new Protos.LS2GC_GSInfo();
		msg.opts = new Protos.MsgOpts();
		return msg;
	}

	public static Q_LS2GC_AskRegRet(): Protos.LS2GC_AskRegRet {
		let msg = new Protos.LS2GC_AskRegRet();
		msg.opts = new Protos.MsgOpts();
		return msg;
	}

	public static Q_LS2GC_AskLoginRet(): Protos.LS2GC_AskLoginRet {
		let msg = new Protos.LS2GC_AskLoginRet();
		msg.opts = new Protos.MsgOpts();
		return msg;
	}

	public static Q_LS2CS_GCLogin(): Protos.LS2CS_GCLogin {
		let msg = new Protos.LS2CS_GCLogin();
		msg.opts = new Protos.MsgOpts();
		msg.opts.flag |= 1 << Protos.MsgOpts.Flag.RPC;
		return msg;
	}

	public static Q_LS2DB_QueryAccount(): Protos.LS2DB_QueryAccount {
		let msg = new Protos.LS2DB_QueryAccount();
		msg.opts = new Protos.MsgOpts();
		msg.opts.flag |= 1 << Protos.MsgOpts.Flag.RPC;
		return msg;
	}

	public static Q_LS2DB_QueryLogin(): Protos.LS2DB_QueryLogin {
		let msg = new Protos.LS2DB_QueryLogin();
		msg.opts = new Protos.MsgOpts();
		msg.opts.flag |= 1 << Protos.MsgOpts.Flag.RPC;
		return msg;
	}

	public static Q_LS2DB_Exec(): Protos.LS2DB_Exec {
		let msg = new Protos.LS2DB_Exec();
		msg.opts = new Protos.MsgOpts();
		msg.opts.flag |= 1 << Protos.MsgOpts.Flag.RPC;
		return msg;
	}

	public static Q_GS2CS_ReportState(): Protos.GS2CS_ReportState {
		let msg = new Protos.GS2CS_ReportState();
		msg.opts = new Protos.MsgOpts();
		return msg;
	}

	public static Q_GS2CS_GCAskLogin(): Protos.GS2CS_GCAskLogin {
		let msg = new Protos.GS2CS_GCAskLogin();
		msg.opts = new Protos.MsgOpts();
		msg.opts.flag |= 1 << Protos.MsgOpts.Flag.RPC;
		return msg;
	}

	public static Q_GS2CS_GCLost(): Protos.GS2CS_GCLost {
		let msg = new Protos.GS2CS_GCLost();
		msg.opts = new Protos.MsgOpts();
		return msg;
	}

	public static Q_GS2GC_LoginRet(): Protos.GS2GC_LoginRet {
		let msg = new Protos.GS2GC_LoginRet();
		msg.opts = new Protos.MsgOpts();
		return msg;
	}

	public static Q_BS2CS_ReportState(): Protos.BS2CS_ReportState {
		let msg = new Protos.BS2CS_ReportState();
		msg.opts = new Protos.MsgOpts();
		return msg;
	}

	public static Q_BS2CS_GCAskLogin(): Protos.BS2CS_GCAskLogin {
		let msg = new Protos.BS2CS_GCAskLogin();
		msg.opts = new Protos.MsgOpts();
		msg.opts.flag |= 1 << Protos.MsgOpts.Flag.RPC;
		return msg;
	}

	public static Q_BS2CS_GCLost(): Protos.BS2CS_GCLost {
		let msg = new Protos.BS2CS_GCLost();
		msg.opts = new Protos.MsgOpts();
		return msg;
	}

	public static Q_BS2CS_RommInfoRet(): Protos.BS2CS_RommInfoRet {
		let msg = new Protos.BS2CS_RommInfoRet();
		msg.opts = new Protos.MsgOpts();
		return msg;
	}

	public static Q_BS2GC_LoginRet(): Protos.BS2GC_LoginRet {
		let msg = new Protos.BS2GC_LoginRet();
		msg.opts = new Protos.MsgOpts();
		return msg;
	}

	public static Q_CS2LS_GSInfos(): Protos.CS2LS_GSInfos {
		let msg = new Protos.CS2LS_GSInfos();
		msg.opts = new Protos.MsgOpts();
		return msg;
	}

	public static Q_CS2LS_GSInfo(): Protos.CS2LS_GSInfo {
		let msg = new Protos.CS2LS_GSInfo();
		msg.opts = new Protos.MsgOpts();
		return msg;
	}

	public static Q_CS2LS_GSLost(): Protos.CS2LS_GSLost {
		let msg = new Protos.CS2LS_GSLost();
		msg.opts = new Protos.MsgOpts();
		return msg;
	}

	public static Q_CS2LS_GCLoginRet(): Protos.CS2LS_GCLoginRet {
		let msg = new Protos.CS2LS_GCLoginRet();
		msg.opts = new Protos.MsgOpts();
		return msg;
	}

	public static Q_CS2GS_GCLoginRet(): Protos.CS2GS_GCLoginRet {
		let msg = new Protos.CS2GS_GCLoginRet();
		msg.opts = new Protos.MsgOpts();
		return msg;
	}

	public static Q_CS2BS_GCLoginRet(): Protos.CS2BS_GCLoginRet {
		let msg = new Protos.CS2BS_GCLoginRet();
		msg.opts = new Protos.MsgOpts();
		return msg;
	}

	public static Q_CS2BS_RoomInfo(): Protos.CS2BS_RoomInfo {
		let msg = new Protos.CS2BS_RoomInfo();
		msg.opts = new Protos.MsgOpts();
		msg.opts.flag |= 1 << Protos.MsgOpts.Flag.RPC;
		return msg;
	}

	public static Q_CS2GC_BeginMatchRet(): Protos.CS2GC_BeginMatchRet {
		let msg = new Protos.CS2GC_BeginMatchRet();
		msg.opts = new Protos.MsgOpts();
		return msg;
	}

	public static Q_DB2LS_QueryAccountRet(): Protos.DB2LS_QueryAccountRet {
		let msg = new Protos.DB2LS_QueryAccountRet();
		msg.opts = new Protos.MsgOpts();
		return msg;
	}

	public static Q_DB2LS_QueryLoginRet(): Protos.DB2LS_QueryLoginRet {
		let msg = new Protos.DB2LS_QueryLoginRet();
		msg.opts = new Protos.MsgOpts();
		return msg;
	}

	public static Q_DB2LS_ExecRet(): Protos.DB2LS_ExecRet {
		let msg = new Protos.DB2LS_ExecRet();
		msg.opts = new Protos.MsgOpts();
		return msg;
	}


	public static R_G_AskPing(pid: number): Protos.G_AskPingRet {
		let msg = new Protos.G_AskPingRet();
		msg.opts = new Protos.MsgOpts();
		msg.opts.flag |= 1 << Protos.MsgOpts.Flag.RESP;
		msg.opts.rpid = pid;
		return msg;
	}

	public static R_LS2CS_GCLogin(pid: number): Protos.CS2LS_GCLoginRet {
		let msg = new Protos.CS2LS_GCLoginRet();
		msg.opts = new Protos.MsgOpts();
		msg.opts.flag |= 1 << Protos.MsgOpts.Flag.RESP;
		msg.opts.rpid = pid;
		return msg;
	}

	public static R_GC2LS_AskRegister(pid: number): Protos.LS2GC_AskRegRet {
		let msg = new Protos.LS2GC_AskRegRet();
		msg.opts = new Protos.MsgOpts();
		msg.opts.flag |= 1 << Protos.MsgOpts.Flag.RESP;
		msg.opts.rpid = pid;
		return msg;
	}

	public static R_GC2LS_AskLogin(pid: number): Protos.LS2GC_AskLoginRet {
		let msg = new Protos.LS2GC_AskLoginRet();
		msg.opts = new Protos.MsgOpts();
		msg.opts.flag |= 1 << Protos.MsgOpts.Flag.RESP;
		msg.opts.rpid = pid;
		return msg;
	}

	public static R_GC2GS_AskLogin(pid: number): Protos.GS2GC_LoginRet {
		let msg = new Protos.GS2GC_LoginRet();
		msg.opts = new Protos.MsgOpts();
		msg.opts.flag |= 1 << Protos.MsgOpts.Flag.RESP;
		msg.opts.rpid = pid;
		return msg;
	}

	public static R_GS2CS_GCAskLogin(pid: number): Protos.CS2GS_GCLoginRet {
		let msg = new Protos.CS2GS_GCLoginRet();
		msg.opts = new Protos.MsgOpts();
		msg.opts.flag |= 1 << Protos.MsgOpts.Flag.RESP;
		msg.opts.rpid = pid;
		return msg;
	}

	public static R_BS2CS_GCAskLogin(pid: number): Protos.CS2BS_GCLoginRet {
		let msg = new Protos.CS2BS_GCLoginRet();
		msg.opts = new Protos.MsgOpts();
		msg.opts.flag |= 1 << Protos.MsgOpts.Flag.RESP;
		msg.opts.rpid = pid;
		return msg;
	}

	public static R_GC2BS_AskLogin(pid: number): Protos.BS2GC_LoginRet {
		let msg = new Protos.BS2GC_LoginRet();
		msg.opts = new Protos.MsgOpts();
		msg.opts.flag |= 1 << Protos.MsgOpts.Flag.RESP;
		msg.opts.rpid = pid;
		return msg;
	}

	public static R_LS2DB_QueryAccount(pid: number): Protos.DB2LS_QueryAccountRet {
		let msg = new Protos.DB2LS_QueryAccountRet();
		msg.opts = new Protos.MsgOpts();
		msg.opts.flag |= 1 << Protos.MsgOpts.Flag.RESP;
		msg.opts.rpid = pid;
		return msg;
	}

	public static R_LS2DB_QueryLogin(pid: number): Protos.DB2LS_QueryLoginRet {
		let msg = new Protos.DB2LS_QueryLoginRet();
		msg.opts = new Protos.MsgOpts();
		msg.opts.flag |= 1 << Protos.MsgOpts.Flag.RESP;
		msg.opts.rpid = pid;
		return msg;
	}

	public static R_LS2DB_Exec(pid: number): Protos.DB2LS_ExecRet {
		let msg = new Protos.DB2LS_ExecRet();
		msg.opts = new Protos.MsgOpts();
		msg.opts.flag |= 1 << Protos.MsgOpts.Flag.RESP;
		msg.opts.rpid = pid;
		return msg;
	}

	public static R_GC2CS_BeginMatch(pid: number): Protos.CS2GC_BeginMatchRet {
		let msg = new Protos.CS2GC_BeginMatchRet();
		msg.opts = new Protos.MsgOpts();
		msg.opts.flag |= 1 << Protos.MsgOpts.Flag.RESP;
		msg.opts.rpid = pid;
		return msg;
	}

	public static R_CS2BS_RoomInfo(pid: number): Protos.BS2CS_RommInfoRet {
		let msg = new Protos.BS2CS_RommInfoRet();
		msg.opts = new Protos.MsgOpts();
		msg.opts.flag |= 1 << Protos.MsgOpts.Flag.RESP;
		msg.opts.rpid = pid;
		return msg;
	}


	public static DecodeMsg(msgID: Protos.MsgID, data: Uint8Array, size: number): any {
		switch ( msgID ) {
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
			case 1300: {
				let msg = Protos.GC2CS_BeginMatch.decode(data, size);
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
			case 4000: {
				let msg = Protos.BS2CS_ReportState.decode(data, size);
				return msg;
			}
			case 4001: {
				let msg = Protos.BS2CS_GCAskLogin.decode(data, size);
				return msg;
			}
			case 4002: {
				let msg = Protos.BS2CS_GCLost.decode(data, size);
				return msg;
			}
			case 4003: {
				let msg = Protos.BS2CS_RommInfoRet.decode(data, size);
				return msg;
			}
			case 4100: {
				let msg = Protos.BS2GC_LoginRet.decode(data, size);
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
			case 5200: {
				let msg = Protos.CS2BS_GCLoginRet.decode(data, size);
				return msg;
			}
			case 5201: {
				let msg = Protos.CS2BS_RoomInfo.decode(data, size);
				return msg;
			}
			case 5300: {
				let msg = Protos.CS2GC_BeginMatchRet.decode(data, size);
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
		}
		return null;
	}

	public static D_G_AskPing(data: Uint8Array, size: number): Protos.G_AskPing {
		let msg = Protos.G_AskPing.decode(data, size);
		return msg;
	}

	public static D_G_AskPingRet(data: Uint8Array, size: number): Protos.G_AskPingRet {
		let msg = Protos.G_AskPingRet.decode(data, size);
		return msg;
	}

	public static D_GC2LS_AskRegister(data: Uint8Array, size: number): Protos.GC2LS_AskRegister {
		let msg = Protos.GC2LS_AskRegister.decode(data, size);
		return msg;
	}

	public static D_GC2LS_AskLogin(data: Uint8Array, size: number): Protos.GC2LS_AskLogin {
		let msg = Protos.GC2LS_AskLogin.decode(data, size);
		return msg;
	}

	public static D_GC2GS_AskLogin(data: Uint8Array, size: number): Protos.GC2GS_AskLogin {
		let msg = Protos.GC2GS_AskLogin.decode(data, size);
		return msg;
	}

	public static D_GC2GS_KeepAlive(data: Uint8Array, size: number): Protos.GC2GS_KeepAlive {
		let msg = Protos.GC2GS_KeepAlive.decode(data, size);
		return msg;
	}

	public static D_GC2BS_AskLogin(data: Uint8Array, size: number): Protos.GC2BS_AskLogin {
		let msg = Protos.GC2BS_AskLogin.decode(data, size);
		return msg;
	}

	public static D_GC2BS_KeepAlive(data: Uint8Array, size: number): Protos.GC2BS_KeepAlive {
		let msg = Protos.GC2BS_KeepAlive.decode(data, size);
		return msg;
	}

	public static D_GC2CS_BeginMatch(data: Uint8Array, size: number): Protos.GC2CS_BeginMatch {
		let msg = Protos.GC2CS_BeginMatch.decode(data, size);
		return msg;
	}

	public static D_LS2GC_GSInfo(data: Uint8Array, size: number): Protos.LS2GC_GSInfo {
		let msg = Protos.LS2GC_GSInfo.decode(data, size);
		return msg;
	}

	public static D_LS2GC_AskRegRet(data: Uint8Array, size: number): Protos.LS2GC_AskRegRet {
		let msg = Protos.LS2GC_AskRegRet.decode(data, size);
		return msg;
	}

	public static D_LS2GC_AskLoginRet(data: Uint8Array, size: number): Protos.LS2GC_AskLoginRet {
		let msg = Protos.LS2GC_AskLoginRet.decode(data, size);
		return msg;
	}

	public static D_LS2CS_GCLogin(data: Uint8Array, size: number): Protos.LS2CS_GCLogin {
		let msg = Protos.LS2CS_GCLogin.decode(data, size);
		return msg;
	}

	public static D_LS2DB_QueryAccount(data: Uint8Array, size: number): Protos.LS2DB_QueryAccount {
		let msg = Protos.LS2DB_QueryAccount.decode(data, size);
		return msg;
	}

	public static D_LS2DB_QueryLogin(data: Uint8Array, size: number): Protos.LS2DB_QueryLogin {
		let msg = Protos.LS2DB_QueryLogin.decode(data, size);
		return msg;
	}

	public static D_LS2DB_Exec(data: Uint8Array, size: number): Protos.LS2DB_Exec {
		let msg = Protos.LS2DB_Exec.decode(data, size);
		return msg;
	}

	public static D_GS2CS_ReportState(data: Uint8Array, size: number): Protos.GS2CS_ReportState {
		let msg = Protos.GS2CS_ReportState.decode(data, size);
		return msg;
	}

	public static D_GS2CS_GCAskLogin(data: Uint8Array, size: number): Protos.GS2CS_GCAskLogin {
		let msg = Protos.GS2CS_GCAskLogin.decode(data, size);
		return msg;
	}

	public static D_GS2CS_GCLost(data: Uint8Array, size: number): Protos.GS2CS_GCLost {
		let msg = Protos.GS2CS_GCLost.decode(data, size);
		return msg;
	}

	public static D_GS2GC_LoginRet(data: Uint8Array, size: number): Protos.GS2GC_LoginRet {
		let msg = Protos.GS2GC_LoginRet.decode(data, size);
		return msg;
	}

	public static D_BS2CS_ReportState(data: Uint8Array, size: number): Protos.BS2CS_ReportState {
		let msg = Protos.BS2CS_ReportState.decode(data, size);
		return msg;
	}

	public static D_BS2CS_GCAskLogin(data: Uint8Array, size: number): Protos.BS2CS_GCAskLogin {
		let msg = Protos.BS2CS_GCAskLogin.decode(data, size);
		return msg;
	}

	public static D_BS2CS_GCLost(data: Uint8Array, size: number): Protos.BS2CS_GCLost {
		let msg = Protos.BS2CS_GCLost.decode(data, size);
		return msg;
	}

	public static D_BS2CS_RommInfoRet(data: Uint8Array, size: number): Protos.BS2CS_RommInfoRet {
		let msg = Protos.BS2CS_RommInfoRet.decode(data, size);
		return msg;
	}

	public static D_BS2GC_LoginRet(data: Uint8Array, size: number): Protos.BS2GC_LoginRet {
		let msg = Protos.BS2GC_LoginRet.decode(data, size);
		return msg;
	}

	public static D_CS2LS_GSInfos(data: Uint8Array, size: number): Protos.CS2LS_GSInfos {
		let msg = Protos.CS2LS_GSInfos.decode(data, size);
		return msg;
	}

	public static D_CS2LS_GSInfo(data: Uint8Array, size: number): Protos.CS2LS_GSInfo {
		let msg = Protos.CS2LS_GSInfo.decode(data, size);
		return msg;
	}

	public static D_CS2LS_GSLost(data: Uint8Array, size: number): Protos.CS2LS_GSLost {
		let msg = Protos.CS2LS_GSLost.decode(data, size);
		return msg;
	}

	public static D_CS2LS_GCLoginRet(data: Uint8Array, size: number): Protos.CS2LS_GCLoginRet {
		let msg = Protos.CS2LS_GCLoginRet.decode(data, size);
		return msg;
	}

	public static D_CS2GS_GCLoginRet(data: Uint8Array, size: number): Protos.CS2GS_GCLoginRet {
		let msg = Protos.CS2GS_GCLoginRet.decode(data, size);
		return msg;
	}

	public static D_CS2BS_GCLoginRet(data: Uint8Array, size: number): Protos.CS2BS_GCLoginRet {
		let msg = Protos.CS2BS_GCLoginRet.decode(data, size);
		return msg;
	}

	public static D_CS2BS_RoomInfo(data: Uint8Array, size: number): Protos.CS2BS_RoomInfo {
		let msg = Protos.CS2BS_RoomInfo.decode(data, size);
		return msg;
	}

	public static D_CS2GC_BeginMatchRet(data: Uint8Array, size: number): Protos.CS2GC_BeginMatchRet {
		let msg = Protos.CS2GC_BeginMatchRet.decode(data, size);
		return msg;
	}

	public static D_DB2LS_QueryAccountRet(data: Uint8Array, size: number): Protos.DB2LS_QueryAccountRet {
		let msg = Protos.DB2LS_QueryAccountRet.decode(data, size);
		return msg;
	}

	public static D_DB2LS_QueryLoginRet(data: Uint8Array, size: number): Protos.DB2LS_QueryLoginRet {
		let msg = Protos.DB2LS_QueryLoginRet.decode(data, size);
		return msg;
	}

	public static D_DB2LS_ExecRet(data: Uint8Array, size: number): Protos.DB2LS_ExecRet {
		let msg = Protos.DB2LS_ExecRet.decode(data, size);
		return msg;
	}


	public static CreateMsgByID(msgID:Protos.MsgID): any {
		switch ( msgID ) {
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
			case 1300: {
				return new Protos.GC2CS_BeginMatch();
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
			case 4000: {
				return new Protos.BS2CS_ReportState();
			}
			case 4001: {
				return new Protos.BS2CS_GCAskLogin();
			}
			case 4002: {
				return new Protos.BS2CS_GCLost();
			}
			case 4003: {
				return new Protos.BS2CS_RommInfoRet();
			}
			case 4100: {
				return new Protos.BS2GC_LoginRet();
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
			case 5200: {
				return new Protos.CS2BS_GCLoginRet();
			}
			case 5201: {
				return new Protos.CS2BS_RoomInfo();
			}
			case 5300: {
				return new Protos.CS2GC_BeginMatchRet();
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
		}
		return null;
	}

	public static GetMsgOpts(message: any): Protos.IMsgOpts {
		let msgID = ProtoCreator.GetMsgID(message);
		switch ( msgID ) {
			case 10: {
				return (<Protos.G_AskPing>message).opts;
			}
			case 11: {
				return (<Protos.G_AskPingRet>message).opts;
			}
			case 1000: {
				return (<Protos.GC2LS_AskRegister>message).opts;
			}
			case 1001: {
				return (<Protos.GC2LS_AskLogin>message).opts;
			}
			case 1100: {
				return (<Protos.GC2GS_AskLogin>message).opts;
			}
			case 1101: {
				return (<Protos.GC2GS_KeepAlive>message).opts;
			}
			case 1200: {
				return (<Protos.GC2BS_AskLogin>message).opts;
			}
			case 1201: {
				return (<Protos.GC2BS_KeepAlive>message).opts;
			}
			case 1300: {
				return (<Protos.GC2CS_BeginMatch>message).opts;
			}
			case 2000: {
				return (<Protos.LS2GC_GSInfo>message).opts;
			}
			case 2001: {
				return (<Protos.LS2GC_AskRegRet>message).opts;
			}
			case 2002: {
				return (<Protos.LS2GC_AskLoginRet>message).opts;
			}
			case 2100: {
				return (<Protos.LS2CS_GCLogin>message).opts;
			}
			case 2200: {
				return (<Protos.LS2DB_QueryAccount>message).opts;
			}
			case 2201: {
				return (<Protos.LS2DB_QueryLogin>message).opts;
			}
			case 2202: {
				return (<Protos.LS2DB_Exec>message).opts;
			}
			case 3000: {
				return (<Protos.GS2CS_ReportState>message).opts;
			}
			case 3001: {
				return (<Protos.GS2CS_GCAskLogin>message).opts;
			}
			case 3002: {
				return (<Protos.GS2CS_GCLost>message).opts;
			}
			case 3100: {
				return (<Protos.GS2GC_LoginRet>message).opts;
			}
			case 4000: {
				return (<Protos.BS2CS_ReportState>message).opts;
			}
			case 4001: {
				return (<Protos.BS2CS_GCAskLogin>message).opts;
			}
			case 4002: {
				return (<Protos.BS2CS_GCLost>message).opts;
			}
			case 4003: {
				return (<Protos.BS2CS_RommInfoRet>message).opts;
			}
			case 4100: {
				return (<Protos.BS2GC_LoginRet>message).opts;
			}
			case 5000: {
				return (<Protos.CS2LS_GSInfos>message).opts;
			}
			case 5001: {
				return (<Protos.CS2LS_GSInfo>message).opts;
			}
			case 5002: {
				return (<Protos.CS2LS_GSLost>message).opts;
			}
			case 5003: {
				return (<Protos.CS2LS_GCLoginRet>message).opts;
			}
			case 5100: {
				return (<Protos.CS2GS_GCLoginRet>message).opts;
			}
			case 5200: {
				return (<Protos.CS2BS_GCLoginRet>message).opts;
			}
			case 5201: {
				return (<Protos.CS2BS_RoomInfo>message).opts;
			}
			case 5300: {
				return (<Protos.CS2GC_BeginMatchRet>message).opts;
			}
			case 8000: {
				return (<Protos.DB2LS_QueryAccountRet>message).opts;
			}
			case 8001: {
				return (<Protos.DB2LS_QueryLoginRet>message).opts;
			}
			case 8002: {
				return (<Protos.DB2LS_ExecRet>message).opts;
			}
		}
		return null;
	}

	public static GetMsgIDByType(type: new () => any): Protos.MsgID { return ProtoCreator._TYPE2ID.get(type); }

	public static GetMsgID(message: any): Protos.MsgID { return ProtoCreator._TYPE2ID.get(message.constructor); }

} //end class
