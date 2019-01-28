using Core.Misc;
using Shared;
using Shared.Net;
using System.Collections;
using System.Collections.Generic;
using System.Net;
using System.Threading;
using GSInfo = Shared.GSInfo;

namespace LoginServer.Biz
{
	public partial class BizProcessor
	{
		class LoginContext
		{
			public Protos.Global.Types.Channel channel;
			public Protos.Global.Types.Browser browser;
			public Protos.Global.Types.Platform platform;
			public string id;
			public uint ukey;
			public string sessionKey = string.Empty;
			public string unionID = string.Empty;
			public string nickname = string.Empty;
			public string avatar = string.Empty;
			public byte gender;
		}

		public ErrorCode OnGc2LsAskWxlogin( NetSessionBase session, Google.Protobuf.IMessage message )
		{
			uint sid = session.id;
			string remote = session.connection.remoteEndPoint.ToString();

			Protos.GC2LS_AskWXLogin login = ( Protos.GC2LS_AskWXLogin )message;
			Protos.LS2GC_AskLoginRet gcLoginRet = ProtoCreator.R_GC2LS_AskLogin( login.Opts.Pid );
			string reqUrl = string.Format( LS.instance.config.code2sessionUrl, LS.instance.config.wxAppID, LS.instance.config.wxAppSecret, login.Code );
			WebClient client = new WebClient();
			client.DownloadStringTaskAsync( reqUrl ).ContinueWith( ( t, o ) =>
			{
				Hashtable json = ( Hashtable )MiniJSON.JsonDecode( t.Result );
				int errorCode = json.GetInt( "errcode" );
				if ( errorCode != 0 )
				{
					//错误码,参考 https://developers.weixin.qq.com/minigame/dev/api/code2Session.html
					switch ( errorCode )
					{
						case -1:
							gcLoginRet.Result = Protos.LS2GC_AskLoginRet.Types.EResult.Busy;
							break;
						case 40029:
							gcLoginRet.Result = Protos.LS2GC_AskLoginRet.Types.EResult.InvalidCode;
							break;
						case 45011:
							gcLoginRet.Result = Protos.LS2GC_AskLoginRet.Types.EResult.Frequent;
							break;
					}
					session.Send( gcLoginRet );
					session.Close( true, $"login fail:{errorCode}" );
				}
				else
				{
					string openID = json.GetString( "openid" );
					string sessionKey = json.GetString( "session_key" );
					string unionID = json.GetString( "unionid" );

					Logger.Log( $"wxLogin success, id:{openID}, sessionKey:{sessionKey}, unionID:{unionID}" );

					LoginContext context = new LoginContext();
					context.id = openID;
					context.channel = Protos.Global.Types.Channel.Wxmini;
					context.browser = login.Browser;
					context.platform = login.Platform;
					context.sessionKey = sessionKey;
					context.unionID = unionID;
					context.nickname = login.Nickname;
					context.avatar = login.Avatar;
					context.gender = ( byte )login.Gender;

					//查询数据库
					//若查询失败则自动注册
					Protos.LS2DB_QueryLogin queryLogin = ProtoCreator.Q_LS2DB_QueryLogin();
					queryLogin.Name = openID;
					queryLogin.VertPwd = false;
					queryLogin.Time = TimeUtils.utcTime;
					queryLogin.Ip = remote;
					queryLogin.Channel = Protos.Global.Types.Channel.Wxmini;
					queryLogin.Browser = login.Browser;
					queryLogin.Platform = login.Platform;
					queryLogin.UnionID = unionID;
					queryLogin.Nickname = login.Nickname;
					queryLogin.Avatar = login.Avatar;
					queryLogin.Gender = login.Gender;
					LS.instance.netSessionMgr.Send( SessionType.ServerL2DB, queryLogin,
													RPCEntry.Pop( OnSmartQueryLoginRet, gcLoginRet, sid, context ) );
				}
			}, null, CancellationToken.None );
			return ErrorCode.Success;
		}

		public ErrorCode OnGc2LsAskSmartLogin( NetSessionBase session, Google.Protobuf.IMessage message )
		{
			if ( LS.instance.config.pwdVerification )
			{
				Logger.Error( "the password verification must be shutdown before use smart login" );
				return ErrorCode.Failed;
			}

			uint sid = session.id;
			string remote = session.connection.remoteEndPoint.ToString();

			Protos.GC2LS_AskSmartLogin login = ( Protos.GC2LS_AskSmartLogin )message;
			Protos.LS2GC_AskLoginRet gcLoginRet = ProtoCreator.R_GC2LS_AskLogin( login.Opts.Pid );

			Logger.Log( $"GC {login.Id}, {session.connection.remoteEndPoint} ask login" );

			//检测用户名的合法性
			if ( !CheckUsername( login.Id ) )
			{
				gcLoginRet.Result = Protos.LS2GC_AskLoginRet.Types.EResult.InvalidUname;
				session.Send( gcLoginRet );
				session.Close( true, "login failed" );
				return ErrorCode.Success;
			}

			LoginContext context = new LoginContext();
			context.id = login.Id;
			context.channel = login.Channel;
			context.browser = login.Browser;
			context.platform = login.Platform;

			//查询数据库
			//若查询失败则自动注册
			Protos.LS2DB_QueryLogin queryLogin = ProtoCreator.Q_LS2DB_QueryLogin();
			queryLogin.Name = login.Id;
			queryLogin.VertPwd = false;
			queryLogin.Time = TimeUtils.utcTime;
			queryLogin.Ip = remote;
			queryLogin.Channel = login.Channel;
			queryLogin.Browser = login.Browser;
			queryLogin.Platform = login.Platform;
			LS.instance.netSessionMgr.Send( SessionType.ServerL2DB, queryLogin,
											RPCEntry.Pop( OnSmartQueryLoginRet, gcLoginRet, sid, context ) );
			return ErrorCode.Success;
		}

		/// <summary>
		/// DB返回查询登陆结果
		/// </summary>
		private static void OnSmartQueryLoginRet( NetSessionBase session, Google.Protobuf.IMessage message, object[] args )
		{
			Protos.LS2GC_AskLoginRet gcLoginRet = ( Protos.LS2GC_AskLoginRet )args[0];
			uint sid = ( uint )args[1];
			LoginContext context = ( LoginContext )args[2];

			Protos.DB2LS_QueryLoginRet queryLoginRet = ( Protos.DB2LS_QueryLoginRet )message;
			//如果查询成功
			if ( queryLoginRet.Result == Protos.Global.Types.ECommon.Success )
			{
				gcLoginRet.Result = Protos.LS2GC_AskLoginRet.Types.EResult.Success;

				//写入redis缓存
				if ( LS.instance.redisWrapper.IsConnected )
					LS.instance.redisWrapper.HashSet( "unames", context.id, string.Empty );

				context.ukey = queryLoginRet.Ukey;
				context.channel = queryLoginRet.Channel;
				context.browser = queryLoginRet.Browser;
				context.platform = queryLoginRet.Platform;
				context.unionID = queryLoginRet.UnionID;
				context.nickname = queryLoginRet.Nickname;
				context.avatar = queryLoginRet.Avatar;
				context.gender = ( byte )queryLoginRet.Gender;
				HandleLoginSuccess( gcLoginRet, sid, context );
			}
			else
			{
				Logger.Error( $"smart register occurs an error:{queryLoginRet.Result}" );

				gcLoginRet.Result = Protos.LS2GC_AskLoginRet.Types.EResult.Failed;
				//通知客户端登陆失败
				LS.instance.netSessionMgr.Send( sid, gcLoginRet );
				LS.instance.netSessionMgr.CloseSession( sid, "login failed" );
			}
		}

		private static void HandleLoginSuccess( Protos.LS2GC_AskLoginRet gcLoginRet, uint sid, LoginContext context )
		{
			ulong gcNID = GuidHash.GetUInt64();
			//通知cs,客户端登陆成功
			Protos.LS2CS_GCLogin csLogin = ProtoCreator.Q_LS2CS_GCLogin();
			csLogin.GcNID = gcNID;
			csLogin.Id = context.id;
			csLogin.Ukey = context.ukey;
			csLogin.Channel = context.channel;
			csLogin.Browser = context.browser;
			csLogin.Platform = context.platform;
			csLogin.SessionKey = context.sessionKey;
			csLogin.UnionID = context.unionID;
			csLogin.Nickname = context.nickname;
			csLogin.Avatar = context.avatar;
			csLogin.Gender = context.gender;
			LS.instance.netSessionMgr.Send( SessionType.ServerL2CS, csLogin,
											RPCEntry.Pop( OnGCLoginCSRet, gcLoginRet, sid, gcNID ) );
		}

		private static void OnGCLoginCSRet( NetSessionBase session, Google.Protobuf.IMessage message, object[] args )
		{
			Protos.LS2GC_AskLoginRet gcLoginRet = ( Protos.LS2GC_AskLoginRet )args[0];
			uint sid = ( uint )args[1];
			ulong gcNID = ( ulong )args[2];

			Protos.CS2LS_GCLoginRet csLoginRet = ( Protos.CS2LS_GCLoginRet )message;
			if ( csLoginRet.Result == Protos.CS2LS_GCLoginRet.Types.EResult.Success )
			{
				gcLoginRet.Result = Protos.LS2GC_AskLoginRet.Types.EResult.Success;
				gcLoginRet.SessionID = gcNID;
				foreach ( KeyValuePair<uint, GSInfo> kv in LS.instance.gsInfos )
				{
					GSInfo info = kv.Value;
					Protos.GSInfo gsInfo = new Protos.GSInfo { Name = info.name, Ip = info.ip, Port = info.port, Password = info.password, State = ( Protos.GSInfo.Types.State )info.state };
					gcLoginRet.GsInfos.Add( gsInfo );
				}

				Logger.Log( $"client:{gcNID} login success" );

				//通知客户端登陆结果
				LS.instance.netSessionMgr.Send( sid, gcLoginRet );
				LS.instance.netSessionMgr.CloseSession( sid, "login complete" );
			}
			else
			{
				Logger.Log( $"client:{gcNID} login failed" );

				gcLoginRet.Result = Protos.LS2GC_AskLoginRet.Types.EResult.Failed;
				//通知客户端登陆结果
				LS.instance.netSessionMgr.Send( sid, gcLoginRet );
				LS.instance.netSessionMgr.CloseSession( sid, "login failed" );
			}
		}

		private static bool CheckUsername( string uname )
		{
			if ( string.IsNullOrEmpty( uname ) ||
				 uname.Length < Consts.DEFAULT_UNAME_MIN_LEN ||
				 uname.Length > Consts.DEFAULT_UNAME_MAX_LEN )
				return false;
			return true;
		}
	}
}