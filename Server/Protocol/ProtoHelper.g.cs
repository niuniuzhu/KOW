﻿//<auto-generated>
//	Generated by proto generator.  DO NOT EDIT!
//</auto-generated>
using Google.Protobuf;

public static class ProtoCreator {
	#region mappings
	internal static readonly System.Collections.Generic.Dictionary<System.Type, Protos.MsgID> _TYPE2ID = new System.Collections.Generic.Dictionary<System.Type, Protos.MsgID> {
		{typeof(Protos.G_AskPing), (Protos.MsgID)10},
		{typeof(Protos.G_AskPingRet), (Protos.MsgID)11},
		{typeof(Protos.GC2LS_AskRegister), (Protos.MsgID)1000},
		{typeof(Protos.GC2LS_AskLogin), (Protos.MsgID)1001},
		{typeof(Protos.GC2GS_AskLogin), (Protos.MsgID)1100},
		{typeof(Protos.GC2GS_KeepAlive), (Protos.MsgID)1101},
		{typeof(Protos.GC2BS_AskLogin), (Protos.MsgID)1200},
		{typeof(Protos.GC2BS_KeepAlive), (Protos.MsgID)1201},
		{typeof(Protos.GC2CS_BeginMatch), (Protos.MsgID)1300},
		{typeof(Protos.LS2GC_GSInfo), (Protos.MsgID)2000},
		{typeof(Protos.LS2GC_AskRegRet), (Protos.MsgID)2001},
		{typeof(Protos.LS2GC_AskLoginRet), (Protos.MsgID)2002},
		{typeof(Protos.LS2CS_GCLogin), (Protos.MsgID)2100},
		{typeof(Protos.LS2DB_QueryAccount), (Protos.MsgID)2200},
		{typeof(Protos.LS2DB_QueryLogin), (Protos.MsgID)2201},
		{typeof(Protos.LS2DB_Exec), (Protos.MsgID)2202},
		{typeof(Protos.GS2CS_ReportState), (Protos.MsgID)3000},
		{typeof(Protos.GS2CS_GCAskLogin), (Protos.MsgID)3001},
		{typeof(Protos.GS2CS_GCLost), (Protos.MsgID)3002},
		{typeof(Protos.GS2GC_LoginRet), (Protos.MsgID)3100},
		{typeof(Protos.BS2CS_ReportState), (Protos.MsgID)4000},
		{typeof(Protos.BS2CS_GCAskLogin), (Protos.MsgID)4001},
		{typeof(Protos.BS2CS_GCLost), (Protos.MsgID)4002},
		{typeof(Protos.BS2CS_RommInfoRet), (Protos.MsgID)4003},
		{typeof(Protos.BS2GC_LoginRet), (Protos.MsgID)4100},
		{typeof(Protos.CS2LS_GSInfos), (Protos.MsgID)5000},
		{typeof(Protos.CS2LS_GSInfo), (Protos.MsgID)5001},
		{typeof(Protos.CS2LS_GSLost), (Protos.MsgID)5002},
		{typeof(Protos.CS2LS_GCLoginRet), (Protos.MsgID)5003},
		{typeof(Protos.CS2GS_GCLoginRet), (Protos.MsgID)5100},
		{typeof(Protos.CS2BS_GCLoginRet), (Protos.MsgID)5200},
		{typeof(Protos.CS2BS_RoomInfo), (Protos.MsgID)5201},
		{typeof(Protos.CS2GC_BeginMatchRet), (Protos.MsgID)5300},
		{typeof(Protos.CS2GC_BeginBattle), (Protos.MsgID)5301},
		{typeof(Protos.DB2LS_QueryAccountRet), (Protos.MsgID)8000},
		{typeof(Protos.DB2LS_QueryLoginRet), (Protos.MsgID)8001},
		{typeof(Protos.DB2LS_ExecRet), (Protos.MsgID)8002},
	};

	internal static readonly System.Collections.Generic.Dictionary<Protos.MsgID, System.Type> _ID2TYPE = new System.Collections.Generic.Dictionary<Protos.MsgID, System.Type> {
		{(Protos.MsgID)10, typeof(Protos.G_AskPing)},
		{(Protos.MsgID)11, typeof(Protos.G_AskPingRet)},
		{(Protos.MsgID)1000, typeof(Protos.GC2LS_AskRegister)},
		{(Protos.MsgID)1001, typeof(Protos.GC2LS_AskLogin)},
		{(Protos.MsgID)1100, typeof(Protos.GC2GS_AskLogin)},
		{(Protos.MsgID)1101, typeof(Protos.GC2GS_KeepAlive)},
		{(Protos.MsgID)1200, typeof(Protos.GC2BS_AskLogin)},
		{(Protos.MsgID)1201, typeof(Protos.GC2BS_KeepAlive)},
		{(Protos.MsgID)1300, typeof(Protos.GC2CS_BeginMatch)},
		{(Protos.MsgID)2000, typeof(Protos.LS2GC_GSInfo)},
		{(Protos.MsgID)2001, typeof(Protos.LS2GC_AskRegRet)},
		{(Protos.MsgID)2002, typeof(Protos.LS2GC_AskLoginRet)},
		{(Protos.MsgID)2100, typeof(Protos.LS2CS_GCLogin)},
		{(Protos.MsgID)2200, typeof(Protos.LS2DB_QueryAccount)},
		{(Protos.MsgID)2201, typeof(Protos.LS2DB_QueryLogin)},
		{(Protos.MsgID)2202, typeof(Protos.LS2DB_Exec)},
		{(Protos.MsgID)3000, typeof(Protos.GS2CS_ReportState)},
		{(Protos.MsgID)3001, typeof(Protos.GS2CS_GCAskLogin)},
		{(Protos.MsgID)3002, typeof(Protos.GS2CS_GCLost)},
		{(Protos.MsgID)3100, typeof(Protos.GS2GC_LoginRet)},
		{(Protos.MsgID)4000, typeof(Protos.BS2CS_ReportState)},
		{(Protos.MsgID)4001, typeof(Protos.BS2CS_GCAskLogin)},
		{(Protos.MsgID)4002, typeof(Protos.BS2CS_GCLost)},
		{(Protos.MsgID)4003, typeof(Protos.BS2CS_RommInfoRet)},
		{(Protos.MsgID)4100, typeof(Protos.BS2GC_LoginRet)},
		{(Protos.MsgID)5000, typeof(Protos.CS2LS_GSInfos)},
		{(Protos.MsgID)5001, typeof(Protos.CS2LS_GSInfo)},
		{(Protos.MsgID)5002, typeof(Protos.CS2LS_GSLost)},
		{(Protos.MsgID)5003, typeof(Protos.CS2LS_GCLoginRet)},
		{(Protos.MsgID)5100, typeof(Protos.CS2GS_GCLoginRet)},
		{(Protos.MsgID)5200, typeof(Protos.CS2BS_GCLoginRet)},
		{(Protos.MsgID)5201, typeof(Protos.CS2BS_RoomInfo)},
		{(Protos.MsgID)5300, typeof(Protos.CS2GC_BeginMatchRet)},
		{(Protos.MsgID)5301, typeof(Protos.CS2GC_BeginBattle)},
		{(Protos.MsgID)8000, typeof(Protos.DB2LS_QueryAccountRet)},
		{(Protos.MsgID)8001, typeof(Protos.DB2LS_QueryLoginRet)},
		{(Protos.MsgID)8002, typeof(Protos.DB2LS_ExecRet)},
	};
	#endregion

	#region proto generator class
	public static Protos.G_AskPing Q_G_AskPing() {
		var msg = new Protos.G_AskPing();
		msg.Opts = new Protos.MsgOpts();
		msg.Opts.Flag |= 1 << (int)Protos.MsgOpts.Types.Flag.Rpc;
		return msg;
	}

	public static Protos.G_AskPingRet Q_G_AskPingRet() {
		var msg = new Protos.G_AskPingRet();
		msg.Opts = new Protos.MsgOpts();
		return msg;
	}

	public static Protos.GC2LS_AskRegister Q_GC2LS_AskRegister() {
		var msg = new Protos.GC2LS_AskRegister();
		msg.Opts = new Protos.MsgOpts();
		msg.Opts.Flag |= 1 << (int)Protos.MsgOpts.Types.Flag.Rpc;
		return msg;
	}

	public static Protos.GC2LS_AskLogin Q_GC2LS_AskLogin() {
		var msg = new Protos.GC2LS_AskLogin();
		msg.Opts = new Protos.MsgOpts();
		msg.Opts.Flag |= 1 << (int)Protos.MsgOpts.Types.Flag.Rpc;
		return msg;
	}

	public static Protos.GC2GS_AskLogin Q_GC2GS_AskLogin() {
		var msg = new Protos.GC2GS_AskLogin();
		msg.Opts = new Protos.MsgOpts();
		msg.Opts.Flag |= 1 << (int)Protos.MsgOpts.Types.Flag.Rpc;
		return msg;
	}

	public static Protos.GC2GS_KeepAlive Q_GC2GS_KeepAlive() {
		var msg = new Protos.GC2GS_KeepAlive();
		msg.Opts = new Protos.MsgOpts();
		return msg;
	}

	public static Protos.GC2BS_AskLogin Q_GC2BS_AskLogin() {
		var msg = new Protos.GC2BS_AskLogin();
		msg.Opts = new Protos.MsgOpts();
		msg.Opts.Flag |= 1 << (int)Protos.MsgOpts.Types.Flag.Rpc;
		return msg;
	}

	public static Protos.GC2BS_KeepAlive Q_GC2BS_KeepAlive() {
		var msg = new Protos.GC2BS_KeepAlive();
		msg.Opts = new Protos.MsgOpts();
		return msg;
	}

	public static Protos.GC2CS_BeginMatch Q_GC2CS_BeginMatch() {
		var msg = new Protos.GC2CS_BeginMatch();
		msg.Opts = new Protos.MsgOpts();
		msg.Opts.Flag |= 1 << (int)Protos.MsgOpts.Types.Flag.Rpc;
		return msg;
	}

	public static Protos.LS2GC_GSInfo Q_LS2GC_GSInfo() {
		var msg = new Protos.LS2GC_GSInfo();
		msg.Opts = new Protos.MsgOpts();
		return msg;
	}

	public static Protos.LS2GC_AskRegRet Q_LS2GC_AskRegRet() {
		var msg = new Protos.LS2GC_AskRegRet();
		msg.Opts = new Protos.MsgOpts();
		return msg;
	}

	public static Protos.LS2GC_AskLoginRet Q_LS2GC_AskLoginRet() {
		var msg = new Protos.LS2GC_AskLoginRet();
		msg.Opts = new Protos.MsgOpts();
		return msg;
	}

	public static Protos.LS2CS_GCLogin Q_LS2CS_GCLogin() {
		var msg = new Protos.LS2CS_GCLogin();
		msg.Opts = new Protos.MsgOpts();
		msg.Opts.Flag |= 1 << (int)Protos.MsgOpts.Types.Flag.Rpc;
		return msg;
	}

	public static Protos.LS2DB_QueryAccount Q_LS2DB_QueryAccount() {
		var msg = new Protos.LS2DB_QueryAccount();
		msg.Opts = new Protos.MsgOpts();
		msg.Opts.Flag |= 1 << (int)Protos.MsgOpts.Types.Flag.Rpc;
		return msg;
	}

	public static Protos.LS2DB_QueryLogin Q_LS2DB_QueryLogin() {
		var msg = new Protos.LS2DB_QueryLogin();
		msg.Opts = new Protos.MsgOpts();
		msg.Opts.Flag |= 1 << (int)Protos.MsgOpts.Types.Flag.Rpc;
		return msg;
	}

	public static Protos.LS2DB_Exec Q_LS2DB_Exec() {
		var msg = new Protos.LS2DB_Exec();
		msg.Opts = new Protos.MsgOpts();
		msg.Opts.Flag |= 1 << (int)Protos.MsgOpts.Types.Flag.Rpc;
		return msg;
	}

	public static Protos.GS2CS_ReportState Q_GS2CS_ReportState() {
		var msg = new Protos.GS2CS_ReportState();
		msg.Opts = new Protos.MsgOpts();
		return msg;
	}

	public static Protos.GS2CS_GCAskLogin Q_GS2CS_GCAskLogin() {
		var msg = new Protos.GS2CS_GCAskLogin();
		msg.Opts = new Protos.MsgOpts();
		msg.Opts.Flag |= 1 << (int)Protos.MsgOpts.Types.Flag.Rpc;
		return msg;
	}

	public static Protos.GS2CS_GCLost Q_GS2CS_GCLost() {
		var msg = new Protos.GS2CS_GCLost();
		msg.Opts = new Protos.MsgOpts();
		return msg;
	}

	public static Protos.GS2GC_LoginRet Q_GS2GC_LoginRet() {
		var msg = new Protos.GS2GC_LoginRet();
		msg.Opts = new Protos.MsgOpts();
		return msg;
	}

	public static Protos.BS2CS_ReportState Q_BS2CS_ReportState() {
		var msg = new Protos.BS2CS_ReportState();
		msg.Opts = new Protos.MsgOpts();
		return msg;
	}

	public static Protos.BS2CS_GCAskLogin Q_BS2CS_GCAskLogin() {
		var msg = new Protos.BS2CS_GCAskLogin();
		msg.Opts = new Protos.MsgOpts();
		msg.Opts.Flag |= 1 << (int)Protos.MsgOpts.Types.Flag.Rpc;
		return msg;
	}

	public static Protos.BS2CS_GCLost Q_BS2CS_GCLost() {
		var msg = new Protos.BS2CS_GCLost();
		msg.Opts = new Protos.MsgOpts();
		return msg;
	}

	public static Protos.BS2CS_RommInfoRet Q_BS2CS_RommInfoRet() {
		var msg = new Protos.BS2CS_RommInfoRet();
		msg.Opts = new Protos.MsgOpts();
		return msg;
	}

	public static Protos.BS2GC_LoginRet Q_BS2GC_LoginRet() {
		var msg = new Protos.BS2GC_LoginRet();
		msg.Opts = new Protos.MsgOpts();
		return msg;
	}

	public static Protos.CS2LS_GSInfos Q_CS2LS_GSInfos() {
		var msg = new Protos.CS2LS_GSInfos();
		msg.Opts = new Protos.MsgOpts();
		return msg;
	}

	public static Protos.CS2LS_GSInfo Q_CS2LS_GSInfo() {
		var msg = new Protos.CS2LS_GSInfo();
		msg.Opts = new Protos.MsgOpts();
		return msg;
	}

	public static Protos.CS2LS_GSLost Q_CS2LS_GSLost() {
		var msg = new Protos.CS2LS_GSLost();
		msg.Opts = new Protos.MsgOpts();
		return msg;
	}

	public static Protos.CS2LS_GCLoginRet Q_CS2LS_GCLoginRet() {
		var msg = new Protos.CS2LS_GCLoginRet();
		msg.Opts = new Protos.MsgOpts();
		return msg;
	}

	public static Protos.CS2GS_GCLoginRet Q_CS2GS_GCLoginRet() {
		var msg = new Protos.CS2GS_GCLoginRet();
		msg.Opts = new Protos.MsgOpts();
		return msg;
	}

	public static Protos.CS2BS_GCLoginRet Q_CS2BS_GCLoginRet() {
		var msg = new Protos.CS2BS_GCLoginRet();
		msg.Opts = new Protos.MsgOpts();
		return msg;
	}

	public static Protos.CS2BS_RoomInfo Q_CS2BS_RoomInfo() {
		var msg = new Protos.CS2BS_RoomInfo();
		msg.Opts = new Protos.MsgOpts();
		msg.Opts.Flag |= 1 << (int)Protos.MsgOpts.Types.Flag.Rpc;
		return msg;
	}

	public static Protos.CS2GC_BeginMatchRet Q_CS2GC_BeginMatchRet() {
		var msg = new Protos.CS2GC_BeginMatchRet();
		msg.Opts = new Protos.MsgOpts();
		return msg;
	}

	public static Protos.CS2GC_BeginBattle Q_CS2GC_BeginBattle() {
		var msg = new Protos.CS2GC_BeginBattle();
		msg.Opts = new Protos.MsgOpts();
		return msg;
	}

	public static Protos.DB2LS_QueryAccountRet Q_DB2LS_QueryAccountRet() {
		var msg = new Protos.DB2LS_QueryAccountRet();
		msg.Opts = new Protos.MsgOpts();
		return msg;
	}

	public static Protos.DB2LS_QueryLoginRet Q_DB2LS_QueryLoginRet() {
		var msg = new Protos.DB2LS_QueryLoginRet();
		msg.Opts = new Protos.MsgOpts();
		return msg;
	}

	public static Protos.DB2LS_ExecRet Q_DB2LS_ExecRet() {
		var msg = new Protos.DB2LS_ExecRet();
		msg.Opts = new Protos.MsgOpts();
		return msg;
	}

	#endregion

	#region response message static functions
	public static Protos.G_AskPingRet R_G_AskPing( uint pid ) {
		var msg = new Protos.G_AskPingRet();
		msg.Opts = new Protos.MsgOpts();
		msg.Opts.Flag |= 1 << (int)Protos.MsgOpts.Types.Flag.Resp;
		msg.Opts.Rpid = pid;
		return msg;
	}

	public static Protos.CS2LS_GCLoginRet R_LS2CS_GCLogin( uint pid ) {
		var msg = new Protos.CS2LS_GCLoginRet();
		msg.Opts = new Protos.MsgOpts();
		msg.Opts.Flag |= 1 << (int)Protos.MsgOpts.Types.Flag.Resp;
		msg.Opts.Rpid = pid;
		return msg;
	}

	public static Protos.LS2GC_AskRegRet R_GC2LS_AskRegister( uint pid ) {
		var msg = new Protos.LS2GC_AskRegRet();
		msg.Opts = new Protos.MsgOpts();
		msg.Opts.Flag |= 1 << (int)Protos.MsgOpts.Types.Flag.Resp;
		msg.Opts.Rpid = pid;
		return msg;
	}

	public static Protos.LS2GC_AskLoginRet R_GC2LS_AskLogin( uint pid ) {
		var msg = new Protos.LS2GC_AskLoginRet();
		msg.Opts = new Protos.MsgOpts();
		msg.Opts.Flag |= 1 << (int)Protos.MsgOpts.Types.Flag.Resp;
		msg.Opts.Rpid = pid;
		return msg;
	}

	public static Protos.GS2GC_LoginRet R_GC2GS_AskLogin( uint pid ) {
		var msg = new Protos.GS2GC_LoginRet();
		msg.Opts = new Protos.MsgOpts();
		msg.Opts.Flag |= 1 << (int)Protos.MsgOpts.Types.Flag.Resp;
		msg.Opts.Rpid = pid;
		return msg;
	}

	public static Protos.CS2GS_GCLoginRet R_GS2CS_GCAskLogin( uint pid ) {
		var msg = new Protos.CS2GS_GCLoginRet();
		msg.Opts = new Protos.MsgOpts();
		msg.Opts.Flag |= 1 << (int)Protos.MsgOpts.Types.Flag.Resp;
		msg.Opts.Rpid = pid;
		return msg;
	}

	public static Protos.CS2BS_GCLoginRet R_BS2CS_GCAskLogin( uint pid ) {
		var msg = new Protos.CS2BS_GCLoginRet();
		msg.Opts = new Protos.MsgOpts();
		msg.Opts.Flag |= 1 << (int)Protos.MsgOpts.Types.Flag.Resp;
		msg.Opts.Rpid = pid;
		return msg;
	}

	public static Protos.BS2GC_LoginRet R_GC2BS_AskLogin( uint pid ) {
		var msg = new Protos.BS2GC_LoginRet();
		msg.Opts = new Protos.MsgOpts();
		msg.Opts.Flag |= 1 << (int)Protos.MsgOpts.Types.Flag.Resp;
		msg.Opts.Rpid = pid;
		return msg;
	}

	public static Protos.DB2LS_QueryAccountRet R_LS2DB_QueryAccount( uint pid ) {
		var msg = new Protos.DB2LS_QueryAccountRet();
		msg.Opts = new Protos.MsgOpts();
		msg.Opts.Flag |= 1 << (int)Protos.MsgOpts.Types.Flag.Resp;
		msg.Opts.Rpid = pid;
		return msg;
	}

	public static Protos.DB2LS_QueryLoginRet R_LS2DB_QueryLogin( uint pid ) {
		var msg = new Protos.DB2LS_QueryLoginRet();
		msg.Opts = new Protos.MsgOpts();
		msg.Opts.Flag |= 1 << (int)Protos.MsgOpts.Types.Flag.Resp;
		msg.Opts.Rpid = pid;
		return msg;
	}

	public static Protos.DB2LS_ExecRet R_LS2DB_Exec( uint pid ) {
		var msg = new Protos.DB2LS_ExecRet();
		msg.Opts = new Protos.MsgOpts();
		msg.Opts.Flag |= 1 << (int)Protos.MsgOpts.Types.Flag.Resp;
		msg.Opts.Rpid = pid;
		return msg;
	}

	public static Protos.CS2GC_BeginMatchRet R_GC2CS_BeginMatch( uint pid ) {
		var msg = new Protos.CS2GC_BeginMatchRet();
		msg.Opts = new Protos.MsgOpts();
		msg.Opts.Flag |= 1 << (int)Protos.MsgOpts.Types.Flag.Resp;
		msg.Opts.Rpid = pid;
		return msg;
	}

	public static Protos.BS2CS_RommInfoRet R_CS2BS_RoomInfo( uint pid ) {
		var msg = new Protos.BS2CS_RommInfoRet();
		msg.Opts = new Protos.MsgOpts();
		msg.Opts.Flag |= 1 << (int)Protos.MsgOpts.Types.Flag.Resp;
		msg.Opts.Rpid = pid;
		return msg;
	}

	#endregion

	#region decode message static functions
	public static Google.Protobuf.IMessage DecodeMsg( Protos.MsgID msgID, byte[] data, int offset, int size ) {
		switch ( msgID ) {
			case (Protos.MsgID)10: {
				var msg = new Protos.G_AskPing();
				msg.MergeFrom( data, offset, size );
				return msg;
			}
			case (Protos.MsgID)11: {
				var msg = new Protos.G_AskPingRet();
				msg.MergeFrom( data, offset, size );
				return msg;
			}
			case (Protos.MsgID)1000: {
				var msg = new Protos.GC2LS_AskRegister();
				msg.MergeFrom( data, offset, size );
				return msg;
			}
			case (Protos.MsgID)1001: {
				var msg = new Protos.GC2LS_AskLogin();
				msg.MergeFrom( data, offset, size );
				return msg;
			}
			case (Protos.MsgID)1100: {
				var msg = new Protos.GC2GS_AskLogin();
				msg.MergeFrom( data, offset, size );
				return msg;
			}
			case (Protos.MsgID)1101: {
				var msg = new Protos.GC2GS_KeepAlive();
				msg.MergeFrom( data, offset, size );
				return msg;
			}
			case (Protos.MsgID)1200: {
				var msg = new Protos.GC2BS_AskLogin();
				msg.MergeFrom( data, offset, size );
				return msg;
			}
			case (Protos.MsgID)1201: {
				var msg = new Protos.GC2BS_KeepAlive();
				msg.MergeFrom( data, offset, size );
				return msg;
			}
			case (Protos.MsgID)1300: {
				var msg = new Protos.GC2CS_BeginMatch();
				msg.MergeFrom( data, offset, size );
				return msg;
			}
			case (Protos.MsgID)2000: {
				var msg = new Protos.LS2GC_GSInfo();
				msg.MergeFrom( data, offset, size );
				return msg;
			}
			case (Protos.MsgID)2001: {
				var msg = new Protos.LS2GC_AskRegRet();
				msg.MergeFrom( data, offset, size );
				return msg;
			}
			case (Protos.MsgID)2002: {
				var msg = new Protos.LS2GC_AskLoginRet();
				msg.MergeFrom( data, offset, size );
				return msg;
			}
			case (Protos.MsgID)2100: {
				var msg = new Protos.LS2CS_GCLogin();
				msg.MergeFrom( data, offset, size );
				return msg;
			}
			case (Protos.MsgID)2200: {
				var msg = new Protos.LS2DB_QueryAccount();
				msg.MergeFrom( data, offset, size );
				return msg;
			}
			case (Protos.MsgID)2201: {
				var msg = new Protos.LS2DB_QueryLogin();
				msg.MergeFrom( data, offset, size );
				return msg;
			}
			case (Protos.MsgID)2202: {
				var msg = new Protos.LS2DB_Exec();
				msg.MergeFrom( data, offset, size );
				return msg;
			}
			case (Protos.MsgID)3000: {
				var msg = new Protos.GS2CS_ReportState();
				msg.MergeFrom( data, offset, size );
				return msg;
			}
			case (Protos.MsgID)3001: {
				var msg = new Protos.GS2CS_GCAskLogin();
				msg.MergeFrom( data, offset, size );
				return msg;
			}
			case (Protos.MsgID)3002: {
				var msg = new Protos.GS2CS_GCLost();
				msg.MergeFrom( data, offset, size );
				return msg;
			}
			case (Protos.MsgID)3100: {
				var msg = new Protos.GS2GC_LoginRet();
				msg.MergeFrom( data, offset, size );
				return msg;
			}
			case (Protos.MsgID)4000: {
				var msg = new Protos.BS2CS_ReportState();
				msg.MergeFrom( data, offset, size );
				return msg;
			}
			case (Protos.MsgID)4001: {
				var msg = new Protos.BS2CS_GCAskLogin();
				msg.MergeFrom( data, offset, size );
				return msg;
			}
			case (Protos.MsgID)4002: {
				var msg = new Protos.BS2CS_GCLost();
				msg.MergeFrom( data, offset, size );
				return msg;
			}
			case (Protos.MsgID)4003: {
				var msg = new Protos.BS2CS_RommInfoRet();
				msg.MergeFrom( data, offset, size );
				return msg;
			}
			case (Protos.MsgID)4100: {
				var msg = new Protos.BS2GC_LoginRet();
				msg.MergeFrom( data, offset, size );
				return msg;
			}
			case (Protos.MsgID)5000: {
				var msg = new Protos.CS2LS_GSInfos();
				msg.MergeFrom( data, offset, size );
				return msg;
			}
			case (Protos.MsgID)5001: {
				var msg = new Protos.CS2LS_GSInfo();
				msg.MergeFrom( data, offset, size );
				return msg;
			}
			case (Protos.MsgID)5002: {
				var msg = new Protos.CS2LS_GSLost();
				msg.MergeFrom( data, offset, size );
				return msg;
			}
			case (Protos.MsgID)5003: {
				var msg = new Protos.CS2LS_GCLoginRet();
				msg.MergeFrom( data, offset, size );
				return msg;
			}
			case (Protos.MsgID)5100: {
				var msg = new Protos.CS2GS_GCLoginRet();
				msg.MergeFrom( data, offset, size );
				return msg;
			}
			case (Protos.MsgID)5200: {
				var msg = new Protos.CS2BS_GCLoginRet();
				msg.MergeFrom( data, offset, size );
				return msg;
			}
			case (Protos.MsgID)5201: {
				var msg = new Protos.CS2BS_RoomInfo();
				msg.MergeFrom( data, offset, size );
				return msg;
			}
			case (Protos.MsgID)5300: {
				var msg = new Protos.CS2GC_BeginMatchRet();
				msg.MergeFrom( data, offset, size );
				return msg;
			}
			case (Protos.MsgID)5301: {
				var msg = new Protos.CS2GC_BeginBattle();
				msg.MergeFrom( data, offset, size );
				return msg;
			}
			case (Protos.MsgID)8000: {
				var msg = new Protos.DB2LS_QueryAccountRet();
				msg.MergeFrom( data, offset, size );
				return msg;
			}
			case (Protos.MsgID)8001: {
				var msg = new Protos.DB2LS_QueryLoginRet();
				msg.MergeFrom( data, offset, size );
				return msg;
			}
			case (Protos.MsgID)8002: {
				var msg = new Protos.DB2LS_ExecRet();
				msg.MergeFrom( data, offset, size );
				return msg;
			}
		}
		return null;
	}

	public static Protos.G_AskPing D_G_AskPing( byte[] data, int offset, int size ) {
		var msg = new Protos.G_AskPing();
		msg.MergeFrom( data, offset, size );
		return msg;
	}

	public static Protos.G_AskPingRet D_G_AskPingRet( byte[] data, int offset, int size ) {
		var msg = new Protos.G_AskPingRet();
		msg.MergeFrom( data, offset, size );
		return msg;
	}

	public static Protos.GC2LS_AskRegister D_GC2LS_AskRegister( byte[] data, int offset, int size ) {
		var msg = new Protos.GC2LS_AskRegister();
		msg.MergeFrom( data, offset, size );
		return msg;
	}

	public static Protos.GC2LS_AskLogin D_GC2LS_AskLogin( byte[] data, int offset, int size ) {
		var msg = new Protos.GC2LS_AskLogin();
		msg.MergeFrom( data, offset, size );
		return msg;
	}

	public static Protos.GC2GS_AskLogin D_GC2GS_AskLogin( byte[] data, int offset, int size ) {
		var msg = new Protos.GC2GS_AskLogin();
		msg.MergeFrom( data, offset, size );
		return msg;
	}

	public static Protos.GC2GS_KeepAlive D_GC2GS_KeepAlive( byte[] data, int offset, int size ) {
		var msg = new Protos.GC2GS_KeepAlive();
		msg.MergeFrom( data, offset, size );
		return msg;
	}

	public static Protos.GC2BS_AskLogin D_GC2BS_AskLogin( byte[] data, int offset, int size ) {
		var msg = new Protos.GC2BS_AskLogin();
		msg.MergeFrom( data, offset, size );
		return msg;
	}

	public static Protos.GC2BS_KeepAlive D_GC2BS_KeepAlive( byte[] data, int offset, int size ) {
		var msg = new Protos.GC2BS_KeepAlive();
		msg.MergeFrom( data, offset, size );
		return msg;
	}

	public static Protos.GC2CS_BeginMatch D_GC2CS_BeginMatch( byte[] data, int offset, int size ) {
		var msg = new Protos.GC2CS_BeginMatch();
		msg.MergeFrom( data, offset, size );
		return msg;
	}

	public static Protos.LS2GC_GSInfo D_LS2GC_GSInfo( byte[] data, int offset, int size ) {
		var msg = new Protos.LS2GC_GSInfo();
		msg.MergeFrom( data, offset, size );
		return msg;
	}

	public static Protos.LS2GC_AskRegRet D_LS2GC_AskRegRet( byte[] data, int offset, int size ) {
		var msg = new Protos.LS2GC_AskRegRet();
		msg.MergeFrom( data, offset, size );
		return msg;
	}

	public static Protos.LS2GC_AskLoginRet D_LS2GC_AskLoginRet( byte[] data, int offset, int size ) {
		var msg = new Protos.LS2GC_AskLoginRet();
		msg.MergeFrom( data, offset, size );
		return msg;
	}

	public static Protos.LS2CS_GCLogin D_LS2CS_GCLogin( byte[] data, int offset, int size ) {
		var msg = new Protos.LS2CS_GCLogin();
		msg.MergeFrom( data, offset, size );
		return msg;
	}

	public static Protos.LS2DB_QueryAccount D_LS2DB_QueryAccount( byte[] data, int offset, int size ) {
		var msg = new Protos.LS2DB_QueryAccount();
		msg.MergeFrom( data, offset, size );
		return msg;
	}

	public static Protos.LS2DB_QueryLogin D_LS2DB_QueryLogin( byte[] data, int offset, int size ) {
		var msg = new Protos.LS2DB_QueryLogin();
		msg.MergeFrom( data, offset, size );
		return msg;
	}

	public static Protos.LS2DB_Exec D_LS2DB_Exec( byte[] data, int offset, int size ) {
		var msg = new Protos.LS2DB_Exec();
		msg.MergeFrom( data, offset, size );
		return msg;
	}

	public static Protos.GS2CS_ReportState D_GS2CS_ReportState( byte[] data, int offset, int size ) {
		var msg = new Protos.GS2CS_ReportState();
		msg.MergeFrom( data, offset, size );
		return msg;
	}

	public static Protos.GS2CS_GCAskLogin D_GS2CS_GCAskLogin( byte[] data, int offset, int size ) {
		var msg = new Protos.GS2CS_GCAskLogin();
		msg.MergeFrom( data, offset, size );
		return msg;
	}

	public static Protos.GS2CS_GCLost D_GS2CS_GCLost( byte[] data, int offset, int size ) {
		var msg = new Protos.GS2CS_GCLost();
		msg.MergeFrom( data, offset, size );
		return msg;
	}

	public static Protos.GS2GC_LoginRet D_GS2GC_LoginRet( byte[] data, int offset, int size ) {
		var msg = new Protos.GS2GC_LoginRet();
		msg.MergeFrom( data, offset, size );
		return msg;
	}

	public static Protos.BS2CS_ReportState D_BS2CS_ReportState( byte[] data, int offset, int size ) {
		var msg = new Protos.BS2CS_ReportState();
		msg.MergeFrom( data, offset, size );
		return msg;
	}

	public static Protos.BS2CS_GCAskLogin D_BS2CS_GCAskLogin( byte[] data, int offset, int size ) {
		var msg = new Protos.BS2CS_GCAskLogin();
		msg.MergeFrom( data, offset, size );
		return msg;
	}

	public static Protos.BS2CS_GCLost D_BS2CS_GCLost( byte[] data, int offset, int size ) {
		var msg = new Protos.BS2CS_GCLost();
		msg.MergeFrom( data, offset, size );
		return msg;
	}

	public static Protos.BS2CS_RommInfoRet D_BS2CS_RommInfoRet( byte[] data, int offset, int size ) {
		var msg = new Protos.BS2CS_RommInfoRet();
		msg.MergeFrom( data, offset, size );
		return msg;
	}

	public static Protos.BS2GC_LoginRet D_BS2GC_LoginRet( byte[] data, int offset, int size ) {
		var msg = new Protos.BS2GC_LoginRet();
		msg.MergeFrom( data, offset, size );
		return msg;
	}

	public static Protos.CS2LS_GSInfos D_CS2LS_GSInfos( byte[] data, int offset, int size ) {
		var msg = new Protos.CS2LS_GSInfos();
		msg.MergeFrom( data, offset, size );
		return msg;
	}

	public static Protos.CS2LS_GSInfo D_CS2LS_GSInfo( byte[] data, int offset, int size ) {
		var msg = new Protos.CS2LS_GSInfo();
		msg.MergeFrom( data, offset, size );
		return msg;
	}

	public static Protos.CS2LS_GSLost D_CS2LS_GSLost( byte[] data, int offset, int size ) {
		var msg = new Protos.CS2LS_GSLost();
		msg.MergeFrom( data, offset, size );
		return msg;
	}

	public static Protos.CS2LS_GCLoginRet D_CS2LS_GCLoginRet( byte[] data, int offset, int size ) {
		var msg = new Protos.CS2LS_GCLoginRet();
		msg.MergeFrom( data, offset, size );
		return msg;
	}

	public static Protos.CS2GS_GCLoginRet D_CS2GS_GCLoginRet( byte[] data, int offset, int size ) {
		var msg = new Protos.CS2GS_GCLoginRet();
		msg.MergeFrom( data, offset, size );
		return msg;
	}

	public static Protos.CS2BS_GCLoginRet D_CS2BS_GCLoginRet( byte[] data, int offset, int size ) {
		var msg = new Protos.CS2BS_GCLoginRet();
		msg.MergeFrom( data, offset, size );
		return msg;
	}

	public static Protos.CS2BS_RoomInfo D_CS2BS_RoomInfo( byte[] data, int offset, int size ) {
		var msg = new Protos.CS2BS_RoomInfo();
		msg.MergeFrom( data, offset, size );
		return msg;
	}

	public static Protos.CS2GC_BeginMatchRet D_CS2GC_BeginMatchRet( byte[] data, int offset, int size ) {
		var msg = new Protos.CS2GC_BeginMatchRet();
		msg.MergeFrom( data, offset, size );
		return msg;
	}

	public static Protos.CS2GC_BeginBattle D_CS2GC_BeginBattle( byte[] data, int offset, int size ) {
		var msg = new Protos.CS2GC_BeginBattle();
		msg.MergeFrom( data, offset, size );
		return msg;
	}

	public static Protos.DB2LS_QueryAccountRet D_DB2LS_QueryAccountRet( byte[] data, int offset, int size ) {
		var msg = new Protos.DB2LS_QueryAccountRet();
		msg.MergeFrom( data, offset, size );
		return msg;
	}

	public static Protos.DB2LS_QueryLoginRet D_DB2LS_QueryLoginRet( byte[] data, int offset, int size ) {
		var msg = new Protos.DB2LS_QueryLoginRet();
		msg.MergeFrom( data, offset, size );
		return msg;
	}

	public static Protos.DB2LS_ExecRet D_DB2LS_ExecRet( byte[] data, int offset, int size ) {
		var msg = new Protos.DB2LS_ExecRet();
		msg.MergeFrom( data, offset, size );
		return msg;
	}

	#endregion

	#region create message static functions
	public static Google.Protobuf.IMessage CreateMsgByID( Protos.MsgID msgID ) {
		switch ( msgID ) {
			case (Protos.MsgID)10: {
				return new Protos.G_AskPing();
			}
			case (Protos.MsgID)11: {
				return new Protos.G_AskPingRet();
			}
			case (Protos.MsgID)1000: {
				return new Protos.GC2LS_AskRegister();
			}
			case (Protos.MsgID)1001: {
				return new Protos.GC2LS_AskLogin();
			}
			case (Protos.MsgID)1100: {
				return new Protos.GC2GS_AskLogin();
			}
			case (Protos.MsgID)1101: {
				return new Protos.GC2GS_KeepAlive();
			}
			case (Protos.MsgID)1200: {
				return new Protos.GC2BS_AskLogin();
			}
			case (Protos.MsgID)1201: {
				return new Protos.GC2BS_KeepAlive();
			}
			case (Protos.MsgID)1300: {
				return new Protos.GC2CS_BeginMatch();
			}
			case (Protos.MsgID)2000: {
				return new Protos.LS2GC_GSInfo();
			}
			case (Protos.MsgID)2001: {
				return new Protos.LS2GC_AskRegRet();
			}
			case (Protos.MsgID)2002: {
				return new Protos.LS2GC_AskLoginRet();
			}
			case (Protos.MsgID)2100: {
				return new Protos.LS2CS_GCLogin();
			}
			case (Protos.MsgID)2200: {
				return new Protos.LS2DB_QueryAccount();
			}
			case (Protos.MsgID)2201: {
				return new Protos.LS2DB_QueryLogin();
			}
			case (Protos.MsgID)2202: {
				return new Protos.LS2DB_Exec();
			}
			case (Protos.MsgID)3000: {
				return new Protos.GS2CS_ReportState();
			}
			case (Protos.MsgID)3001: {
				return new Protos.GS2CS_GCAskLogin();
			}
			case (Protos.MsgID)3002: {
				return new Protos.GS2CS_GCLost();
			}
			case (Protos.MsgID)3100: {
				return new Protos.GS2GC_LoginRet();
			}
			case (Protos.MsgID)4000: {
				return new Protos.BS2CS_ReportState();
			}
			case (Protos.MsgID)4001: {
				return new Protos.BS2CS_GCAskLogin();
			}
			case (Protos.MsgID)4002: {
				return new Protos.BS2CS_GCLost();
			}
			case (Protos.MsgID)4003: {
				return new Protos.BS2CS_RommInfoRet();
			}
			case (Protos.MsgID)4100: {
				return new Protos.BS2GC_LoginRet();
			}
			case (Protos.MsgID)5000: {
				return new Protos.CS2LS_GSInfos();
			}
			case (Protos.MsgID)5001: {
				return new Protos.CS2LS_GSInfo();
			}
			case (Protos.MsgID)5002: {
				return new Protos.CS2LS_GSLost();
			}
			case (Protos.MsgID)5003: {
				return new Protos.CS2LS_GCLoginRet();
			}
			case (Protos.MsgID)5100: {
				return new Protos.CS2GS_GCLoginRet();
			}
			case (Protos.MsgID)5200: {
				return new Protos.CS2BS_GCLoginRet();
			}
			case (Protos.MsgID)5201: {
				return new Protos.CS2BS_RoomInfo();
			}
			case (Protos.MsgID)5300: {
				return new Protos.CS2GC_BeginMatchRet();
			}
			case (Protos.MsgID)5301: {
				return new Protos.CS2GC_BeginBattle();
			}
			case (Protos.MsgID)8000: {
				return new Protos.DB2LS_QueryAccountRet();
			}
			case (Protos.MsgID)8001: {
				return new Protos.DB2LS_QueryLoginRet();
			}
			case (Protos.MsgID)8002: {
				return new Protos.DB2LS_ExecRet();
			}
		}
		return null;
	}
	#endregion

	#region get message options static functions
	public static Protos.MsgOpts GetMsgOpts( this Google.Protobuf.IMessage message ) {
		var msgID = message.GetMsgID();
		switch ( msgID ) {
			case (Protos.MsgID)10: {
				return ((Protos.G_AskPing)message).Opts;
			}
			case (Protos.MsgID)11: {
				return ((Protos.G_AskPingRet)message).Opts;
			}
			case (Protos.MsgID)1000: {
				return ((Protos.GC2LS_AskRegister)message).Opts;
			}
			case (Protos.MsgID)1001: {
				return ((Protos.GC2LS_AskLogin)message).Opts;
			}
			case (Protos.MsgID)1100: {
				return ((Protos.GC2GS_AskLogin)message).Opts;
			}
			case (Protos.MsgID)1101: {
				return ((Protos.GC2GS_KeepAlive)message).Opts;
			}
			case (Protos.MsgID)1200: {
				return ((Protos.GC2BS_AskLogin)message).Opts;
			}
			case (Protos.MsgID)1201: {
				return ((Protos.GC2BS_KeepAlive)message).Opts;
			}
			case (Protos.MsgID)1300: {
				return ((Protos.GC2CS_BeginMatch)message).Opts;
			}
			case (Protos.MsgID)2000: {
				return ((Protos.LS2GC_GSInfo)message).Opts;
			}
			case (Protos.MsgID)2001: {
				return ((Protos.LS2GC_AskRegRet)message).Opts;
			}
			case (Protos.MsgID)2002: {
				return ((Protos.LS2GC_AskLoginRet)message).Opts;
			}
			case (Protos.MsgID)2100: {
				return ((Protos.LS2CS_GCLogin)message).Opts;
			}
			case (Protos.MsgID)2200: {
				return ((Protos.LS2DB_QueryAccount)message).Opts;
			}
			case (Protos.MsgID)2201: {
				return ((Protos.LS2DB_QueryLogin)message).Opts;
			}
			case (Protos.MsgID)2202: {
				return ((Protos.LS2DB_Exec)message).Opts;
			}
			case (Protos.MsgID)3000: {
				return ((Protos.GS2CS_ReportState)message).Opts;
			}
			case (Protos.MsgID)3001: {
				return ((Protos.GS2CS_GCAskLogin)message).Opts;
			}
			case (Protos.MsgID)3002: {
				return ((Protos.GS2CS_GCLost)message).Opts;
			}
			case (Protos.MsgID)3100: {
				return ((Protos.GS2GC_LoginRet)message).Opts;
			}
			case (Protos.MsgID)4000: {
				return ((Protos.BS2CS_ReportState)message).Opts;
			}
			case (Protos.MsgID)4001: {
				return ((Protos.BS2CS_GCAskLogin)message).Opts;
			}
			case (Protos.MsgID)4002: {
				return ((Protos.BS2CS_GCLost)message).Opts;
			}
			case (Protos.MsgID)4003: {
				return ((Protos.BS2CS_RommInfoRet)message).Opts;
			}
			case (Protos.MsgID)4100: {
				return ((Protos.BS2GC_LoginRet)message).Opts;
			}
			case (Protos.MsgID)5000: {
				return ((Protos.CS2LS_GSInfos)message).Opts;
			}
			case (Protos.MsgID)5001: {
				return ((Protos.CS2LS_GSInfo)message).Opts;
			}
			case (Protos.MsgID)5002: {
				return ((Protos.CS2LS_GSLost)message).Opts;
			}
			case (Protos.MsgID)5003: {
				return ((Protos.CS2LS_GCLoginRet)message).Opts;
			}
			case (Protos.MsgID)5100: {
				return ((Protos.CS2GS_GCLoginRet)message).Opts;
			}
			case (Protos.MsgID)5200: {
				return ((Protos.CS2BS_GCLoginRet)message).Opts;
			}
			case (Protos.MsgID)5201: {
				return ((Protos.CS2BS_RoomInfo)message).Opts;
			}
			case (Protos.MsgID)5300: {
				return ((Protos.CS2GC_BeginMatchRet)message).Opts;
			}
			case (Protos.MsgID)5301: {
				return ((Protos.CS2GC_BeginBattle)message).Opts;
			}
			case (Protos.MsgID)8000: {
				return ((Protos.DB2LS_QueryAccountRet)message).Opts;
			}
			case (Protos.MsgID)8001: {
				return ((Protos.DB2LS_QueryLoginRet)message).Opts;
			}
			case (Protos.MsgID)8002: {
				return ((Protos.DB2LS_ExecRet)message).Opts;
			}
		}
		return null;
	}
	#endregion

	#region construct transpose message
	public static void MTrans( this Google.Protobuf.IMessage msg, Protos.MsgOpts.Types.TransTarget transTarget, ulong transID ) {
		var opts = msg.GetMsgOpts();
		opts.Flag |= 1 << 3;//mark as transpose
		opts.Flag |= (uint)(1 << (3+( int ) transTarget));//mark the target
		opts.Transid = transID;
	}
	#endregion

	#region get message static functions
	public static Protos.MsgID GetMsgID( System.Type type ) => _TYPE2ID[type];

	public static Protos.MsgID GetMsgID<T>() where T : Google.Protobuf.IMessage => _TYPE2ID[typeof( T )];

	public static Protos.MsgID GetMsgID( this Google.Protobuf.IMessage message ) => _TYPE2ID[message.GetType()];

	public static Protos.MsgID GetMsgID<T>( this Google.Protobuf.IMessage<T> message ) where T : Google.Protobuf.IMessage<T> => _TYPE2ID[message.GetType()];
	#endregion
} //end class
