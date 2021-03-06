﻿using CentralServer.User;
using Core.Misc;
using Shared;
using Shared.Net;

namespace CentralServer.Biz
{
	public partial class BizProcessor
	{
		public ErrorCode OnLSAskPing( NetSessionBase session, Google.Protobuf.IMessage message )
		{
			Protos.G_AskPing askPing = ( Protos.G_AskPing )message;
			Protos.G_AskPingRet askPingRet = ProtoCreator.R_G_AskPing( askPing.Opts.Pid );
			askPingRet.Stime = askPing.Time;
			askPingRet.Time = TimeUtils.utcTime;
			session.Send( askPingRet );
			return ErrorCode.Success;
		}

		/// <summary>
		/// LS通知CS有客户端登录成功
		/// </summary>
		public ErrorCode OnLs2CsGclogin( NetSessionBase session, Google.Protobuf.IMessage message )
		{
			Protos.LS2CS_GCLogin gcLogin = ( Protos.LS2CS_GCLogin )message;
			CSUser user = CS.instance.userMgr.CreateUser( gcLogin );

			Protos.CS2LS_GCLoginRet gcLoginRet = ProtoCreator.R_LS2CS_GCLogin( gcLogin.Opts.Pid );
			gcLoginRet.Result = user != null
									? Protos.CS2LS_GCLoginRet.Types.EResult.Success
									: Protos.CS2LS_GCLoginRet.Types.EResult.Failed;
			session.Send( gcLoginRet );
			return ErrorCode.Success;
		}

		public void NotifyGSInfosToLS( uint sid )
		{
			Protos.CS2LS_GSInfos gsInfos = ProtoCreator.Q_CS2LS_GSInfos();
			foreach ( var kv in CS.instance.lIDToGSInfos )
			{
				GSInfo mGSInfo = kv.Value;
				Protos.GSInfo gsInfo = new Protos.GSInfo
				{
					Id = mGSInfo.lid,
					Name = mGSInfo.name,
					Ip = mGSInfo.ip,
					Port = mGSInfo.port,
					Password = mGSInfo.password,
					State = ( Protos.GSInfo.Types.State )mGSInfo.state
				};
				gsInfos.GsInfo.Add( gsInfo );
			}
			CS.instance.netSessionMgr.Send( sid, gsInfos );
		}
	}
}