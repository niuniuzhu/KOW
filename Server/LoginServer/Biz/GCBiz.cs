using Core.Misc;
using Core.Net;
using Shared;
using Shared.DB;
using Shared.Net;
using StackExchange.Redis;
using System.Collections;
using System.Collections.Generic;
using System.Net;
using System.Text;
using System.Threading;
using GSInfo = Shared.GSInfo;

namespace LoginServer.Biz
{
	public partial class BizProcessor
	{
		struct CSLoginParam
		{
			public Protos.Global.Types.Channel channel;
			public Protos.Global.Types.Browser browser;
			public Protos.Global.Types.Platform platform;
			public uint ukey;
			public uint sid;
			public string openID;
			public string sessionKey;
			public string unionID;
			public string nickname;
			public string avatar;
			public byte gender;
		}

		public ErrorCode OnGCtoLSAskRegister( NetSessionBase session, Google.Protobuf.IMessage message )
		{
			Protos.GC2LS_AskRegister register = ( Protos.GC2LS_AskRegister )message;
			Protos.LS2GC_AskRegRet regRet = ProtoCreator.R_GC2LS_AskRegister( register.Opts.Pid );

			regRet.Result = Protos.LS2GC_AskRegRet.Types.EResult.Success;

			//检测用户名的合法性
			if ( !this.CheckUsername( register.Name ) )
			{
				regRet.Result = Protos.LS2GC_AskRegRet.Types.EResult.UnameIllegal;
				session.Send( regRet );
				session.DelayClose( 500, "register finish" );
				return ErrorCode.Success;
			}

			string pwd;
			if ( LS.instance.config.pwdVerification )
			{
				//检测密码合法性
				if ( !this.CheckPassword( register.Passwd ) )
				{
					regRet.Result = Protos.LS2GC_AskRegRet.Types.EResult.PwdIllegal;
					session.Send( regRet );
					session.DelayClose( 500, "register finish" );
					return ErrorCode.Success;
				}
				pwd = register.Passwd;
			}
			else
				pwd = string.Empty;

			//若Redis可用，则查询；不可用就直接查询数据库
			if ( LS.instance.redisWrapper.IsConnected &&
				 LS.instance.redisWrapper.HashExists( "unames", register.Name ) )
			{
				//redis存在相同用户名
				regRet.Result = Protos.LS2GC_AskRegRet.Types.EResult.UnameExists;
				session.Send( regRet );
				session.DelayClose( 500, "register finish" );
				return ErrorCode.Success;
			}
			//md5编码密码
			string pwdmd5 = Core.Crypto.MD5Util.GetMd5HexDigest( pwd ).Replace( "-", string.Empty ).ToLower();
			//查询数据库
			Protos.LS2DB_QueryAccount queryAccount = ProtoCreator.Q_LS2DB_QueryAccount();
			queryAccount.Name = register.Name;

			LS.instance.netSessionMgr.Send( SessionType.ServerL2DB, queryAccount, RPCEntry.Pop( OnLS2DB_QueryAccount, pwdmd5, session.connection.remoteEndPoint.ToString() ) );

			return ErrorCode.Success;
		}

		private static void OnLS2DB_QueryAccount( NetSessionBase session, Google.Protobuf.IMessage message, object[] args )
		{
			Protos.GC2LS_AskRegister register = ( Protos.GC2LS_AskRegister )args[0];
			Protos.LS2GC_AskRegRet regRet = ( Protos.LS2GC_AskRegRet )args[1];
			string pwdmd5 = ( string )args[2];
			string remote = ( string )args[3];

			Protos.DB2LS_QueryAccountRet queryAccountRet = ( Protos.DB2LS_QueryAccountRet )message;
			regRet.Result = queryAccountRet.Result == Protos.DB2LS_QueryResult.Success
								? Protos.LS2GC_AskRegRet.Types.EResult.Success : Protos.LS2GC_AskRegRet.Types.EResult.UnameExists;
			if ( regRet.Result == Protos.LS2GC_AskRegRet.Types.EResult.Success )
			{
				//请求DB服务器注册账号
				Protos.LS2DB_Exec sqlExec = ProtoCreator.Q_LS2DB_Exec();
				sqlExec.Cmd = $"insert account_user( channel,browser,platform,uname,pwd,nickname,avatar,gender,last_login_time,last_login_ip ) values(0, 0, 0, \'{register.Name}\', \'{pwdmd5}\', \'{string.Empty}\', \'{string.Empty}\', 0, {TimeUtils.utcTime}, \'{remote}\');";
				LS.instance.netSessionMgr.Send( SessionType.ServerL2DB, sqlExec, RPCEntry.Pop( OnCheckAccount, register, regRet, pwdmd5 ) );
			}
			else
			{
				//发送注册结果到gc
				session.Send( regRet );
				//关闭连接
				session.DelayClose( 500, "register finish" );
			}
		}

		//DB服务端回调
		private static void OnCheckAccount( NetSessionBase session, Google.Protobuf.IMessage message, object[] args )
		{
			Protos.GC2LS_AskRegister register = ( Protos.GC2LS_AskRegister )args[0];
			Protos.LS2GC_AskRegRet regRet = ( Protos.LS2GC_AskRegRet )args[1];
			string pwdmd5 = ( string )args[2];

			Protos.DB2LS_ExecRet sqlExecRet = ( Protos.DB2LS_ExecRet )message;
			regRet.Result = ( Protos.LS2GC_AskRegRet.Types.EResult )sqlExecRet.Result;
			if ( regRet.Result == Protos.LS2GC_AskRegRet.Types.EResult.Success )
			{
				//写入redis缓存
				if ( LS.instance.redisWrapper.IsConnected )
				{
					LS.instance.redisWrapper.HashSet( "unames", register.Name, pwdmd5 );
					LS.instance.redisWrapper.HashSet( "ukeys", register.Name, sqlExecRet.Id );
					LS.instance.redisWrapper.HashSet( "nickname", register.Name, string.Empty );
					LS.instance.redisWrapper.HashSet( "avatar", register.Name, string.Empty );
					LS.instance.redisWrapper.HashSet( "gender", register.Name, 0 );
				}
			}
			//发送注册结果到gc
			session.Send( regRet );
			//关闭连接
			session.DelayClose( 500, "register finish" );
		}

		public ErrorCode OnGCtoLSAskLogin( NetSessionBase session, Google.Protobuf.IMessage message )
		{
			Protos.GC2LS_AskLogin login = ( Protos.GC2LS_AskLogin )message;
			Protos.LS2GC_AskLoginRet gcLoginRet = ProtoCreator.R_GC2LS_AskLogin( login.Opts.Pid );

			//检测用户名的合法性
			if ( !this.CheckUsername( login.Name ) )
			{
				gcLoginRet.Result = Protos.LS2GC_AskLoginRet.Types.EResult.InvalidUname;
				session.Send( gcLoginRet );
				session.DelayClose( 500, "login complete" );
				return ErrorCode.Success;
			}

			string pwd;
			if ( LS.instance.config.pwdVerification )
			{
				//检测密码合法性
				if ( !this.CheckPassword( login.Passwd ) )
				{
					gcLoginRet.Result = Protos.LS2GC_AskLoginRet.Types.EResult.InvalidPwd;
					session.Send( gcLoginRet );
					session.DelayClose( 500, "login complete" );
					return ErrorCode.Success;
				}
				pwd = login.Passwd;
			}
			else
				pwd = string.Empty;

			//登录id 
			//若Redis可用则查询；不可用就直接查询数据库
			//尝试从缓存中查找账号
			if ( LS.instance.redisWrapper.IsConnected )
			{
				RedisValue cachedPwd = LS.instance.redisWrapper.HashGet( "unames", login.Name );
				if ( !cachedPwd.HasValue ) //redis找不到用户名
				{
					gcLoginRet.Result = Protos.LS2GC_AskLoginRet.Types.EResult.InvalidUname;
					session.Send( gcLoginRet );
					session.DelayClose( 500, "login complete" );
					return ErrorCode.Success;
				}
				if ( LS.instance.config.pwdVerification )
				{
					//验证密码
					if ( cachedPwd != Core.Crypto.MD5Util.GetMd5HexDigest( pwd ).Replace( "-", string.Empty ).ToLower() ) //密码不正确
					{
						gcLoginRet.Result = Protos.LS2GC_AskLoginRet.Types.EResult.InvalidPwd;
						session.Send( gcLoginRet );
						session.DelayClose( 500, "login complete" );
						return ErrorCode.Success;
					}
				}
				//从redis取回ukey
				uint ukey = ( uint )LS.instance.redisWrapper.HashGet( "ukeys", login.Name );
				string nickname = LS.instance.redisWrapper.HashGet( "nickname", login.Name );
				string avatar = LS.instance.redisWrapper.HashGet( "avatar", login.Name );
				byte gender = ( byte )LS.instance.redisWrapper.HashGet( "gender", login.Name );
				CSLoginParam param;
				param.channel = login.Channel;
				param.browser = login.Browser;
				param.platform = login.Platform;
				param.openID = string.Empty;
				param.sessionKey = string.Empty;
				param.unionID = string.Empty;
				param.sid = session.id;
				param.ukey = ukey;
				param.nickname = nickname;
				param.avatar = avatar;
				param.gender = gender;
				HandleLoginSuccess( gcLoginRet, param );
			}
			//从数据库中查找
			else
			{
				string pwdmd5 = Core.Crypto.MD5Util.GetMd5HexDigest( pwd ).Replace( "-", string.Empty ).ToLower();
				Protos.LS2DB_QueryLogin queryLogin = ProtoCreator.Q_LS2DB_QueryLogin();
				queryLogin.Channel = login.Channel;
				queryLogin.Browser = login.Browser;
				queryLogin.Platform = login.Platform;
				queryLogin.Name = login.Name;
				queryLogin.Pwd = pwdmd5;
				queryLogin.VertPwd = LS.instance.config.pwdVerification;
				queryLogin.Time = TimeUtils.utcTime;
				queryLogin.Ip = session.connection.remoteEndPoint.ToString();

				LS.instance.netSessionMgr.Send( SessionType.ServerL2DB, queryLogin,
												RPCEntry.Pop( OnQueryLoginRet, gcLoginRet, session.id, login.Name, pwdmd5, login.Channel, login.Browser, login.Platform ) );
			}
			return ErrorCode.Success;
		}

		private static void OnQueryLoginRet( NetSessionBase session, Google.Protobuf.IMessage message, object[] args )
		{
			Protos.LS2GC_AskLoginRet gcLoginRet = ( Protos.LS2GC_AskLoginRet )args[0];
			uint sid = ( uint )args[1];
			string uname = ( string )args[2];
			string pwdmd5 = ( string )args[3];
			Protos.Global.Types.Channel channel = ( Protos.Global.Types.Channel )args[4];
			Protos.Global.Types.Browser browser = ( Protos.Global.Types.Browser )args[5];
			Protos.Global.Types.Platform platform = ( Protos.Global.Types.Platform )args[6];

			Protos.DB2LS_QueryLoginRet queryLoginRet = ( Protos.DB2LS_QueryLoginRet )message;
			gcLoginRet.Result = ( Protos.LS2GC_AskLoginRet.Types.EResult )queryLoginRet.Result;
			if ( gcLoginRet.Result == Protos.LS2GC_AskLoginRet.Types.EResult.Success )
			{
				//从数据库取回ukey
				uint ukey = queryLoginRet.Ukey;
				string nickname = queryLoginRet.Nickname;
				string avatar = queryLoginRet.Avatar;
				byte gender = ( byte )queryLoginRet.Gender;
				//写入redis缓存
				if ( LS.instance.redisWrapper.IsConnected )
				{
					LS.instance.redisWrapper.HashSet( "unames", uname, pwdmd5 );
					LS.instance.redisWrapper.HashSet( "ukeys", uname, ukey );
					LS.instance.redisWrapper.HashSet( "nickname", uname, nickname );
					LS.instance.redisWrapper.HashSet( "avatar", uname, avatar );
					LS.instance.redisWrapper.HashSet( "gender", uname, gender );
				}

				CSLoginParam param;
				param.channel = channel;
				param.browser = browser;
				param.platform = platform;
				param.openID = string.Empty;
				param.sessionKey = string.Empty;
				param.unionID = string.Empty;
				param.sid = sid;
				param.ukey = ukey;
				param.nickname = nickname;
				param.avatar = avatar;
				param.gender = gender;
				HandleLoginSuccess( gcLoginRet, param );
			}
			else
			{
				session.Send( gcLoginRet );
				session.DelayClose( 500, "login complete" );
			}
		}

		private static void OnGCLoginCSRet( NetSessionBase session, Google.Protobuf.IMessage message, object[] args )
		{
			Protos.LS2GC_AskLoginRet gcLoginRet = ( Protos.LS2GC_AskLoginRet )args[0];
			uint sid = ( uint )args[1];
			ulong gcNID = ( ulong )args[2];

			Protos.CS2LS_GCLoginRet csLoginRet = ( Protos.CS2LS_GCLoginRet )message;
			gcLoginRet.Result = ( Protos.LS2GC_AskLoginRet.Types.EResult )csLoginRet.Result;
			if ( gcLoginRet.Result == Protos.LS2GC_AskLoginRet.Types.EResult.Success )
			{
				gcLoginRet.SessionID = gcNID;
				foreach ( KeyValuePair<uint, GSInfo> kv in LS.instance.gsInfos )
				{
					GSInfo info = kv.Value;
					Protos.GSInfo gsInfo = new Protos.GSInfo { Name = info.name, Ip = info.ip, Port = info.port, Password = info.password, State = ( Protos.GSInfo.Types.State )info.state };
					gcLoginRet.GsInfos.Add( gsInfo );
				}

				Logger.Log( $"client:{gcNID} login success" );
			}
			else
				Logger.Log( $"client:{gcNID} login failed" );

			//通知客户端登陆结果
			LS.instance.netSessionMgr.Send( sid, gcLoginRet );
			LS.instance.netSessionMgr.DelayCloseSession( sid, 100, "login complete" );
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

			Logger.Log( $"GC {login.Name}, {session.connection.remoteEndPoint} ask login" );

			//检测用户名的合法性
			if ( !this.CheckUsername( login.Name ) )
			{
				gcLoginRet.Result = Protos.LS2GC_AskLoginRet.Types.EResult.InvalidUname;
				session.Send( gcLoginRet );
				session.DelayClose( 500, "login complete" );
				return ErrorCode.Success;
			}

			bool success = false;
			//登录id 
			//若Redis可用则查询；不可用就直接查询数据库
			//尝试从缓存中查找账号
			if ( LS.instance.redisWrapper.IsConnected )
			{
				RedisValue cachedPwd = LS.instance.redisWrapper.HashGet( "unames", login.Name );
				if ( cachedPwd.HasValue ) //redis找到用户名
				{
					success = true;
					//从redis取回ukey
					uint ukey = ( uint )LS.instance.redisWrapper.HashGet( "ukeys", login.Name );
					string nickname = LS.instance.redisWrapper.HashGet( "nickname", login.Name );
					string avatar = LS.instance.redisWrapper.HashGet( "avatar", login.Name );
					byte gender = ( byte )LS.instance.redisWrapper.HashGet( "gender", login.Name );
					CSLoginParam param;
					param.channel = login.Channel;
					param.browser = login.Browser;
					param.platform = login.Platform;
					param.openID = string.Empty;
					param.sessionKey = string.Empty;
					param.unionID = string.Empty;
					param.sid = sid;
					param.ukey = ukey;
					param.nickname = nickname;
					param.avatar = avatar;
					param.gender = gender;
					HandleLoginSuccess( gcLoginRet, param );
				}
			}
			//从数据库中查找
			if ( !success )
			{
				Protos.LS2DB_QueryLogin queryLogin = ProtoCreator.Q_LS2DB_QueryLogin();
				queryLogin.Name = login.Name;
				queryLogin.VertPwd = false;
				queryLogin.Time = TimeUtils.utcTime;
				queryLogin.Ip = remote;
				LS.instance.netSessionMgr.Send( SessionType.ServerL2DB, queryLogin,
												RPCEntry.Pop( OnSmartQueryLoginRet, gcLoginRet, login, sid, remote ) );
			}
			return ErrorCode.Success;
		}

		/// <summary>
		/// DB返回查询登陆结果
		/// </summary>
		private static void OnSmartQueryLoginRet( NetSessionBase session, Google.Protobuf.IMessage message, object[] args )
		{
			Protos.LS2GC_AskLoginRet gcLoginRet = ( Protos.LS2GC_AskLoginRet )args[0];
			Protos.GC2LS_AskSmartLogin login = ( Protos.GC2LS_AskSmartLogin )args[1];
			uint sid = ( uint )args[2];
			string remote = ( string )args[3];

			Protos.DB2LS_QueryLoginRet queryLoginRet = ( Protos.DB2LS_QueryLoginRet )message;
			gcLoginRet.Result = ( Protos.LS2GC_AskLoginRet.Types.EResult )queryLoginRet.Result;
			//如果查询成功,写入redis缓存
			if ( gcLoginRet.Result == Protos.LS2GC_AskLoginRet.Types.EResult.Success )
			{
				//从数据库取回ukey
				uint ukey = queryLoginRet.Ukey;
				string nickname = queryLoginRet.Nickname;
				string avatar = queryLoginRet.Avatar;
				byte gender = ( byte )queryLoginRet.Gender;

				//写入redis缓存
				if ( LS.instance.redisWrapper.IsConnected )
				{
					LS.instance.redisWrapper.HashSet( "unames", login.Name, string.Empty );
					LS.instance.redisWrapper.HashSet( "ukeys", login.Name, ukey );
					LS.instance.redisWrapper.HashSet( "nickname", login.Name, nickname );
					LS.instance.redisWrapper.HashSet( "avatar", login.Name, avatar );
					LS.instance.redisWrapper.HashSet( "gender", login.Name, gender );
				}

				CSLoginParam param;
				param.channel = login.Channel;
				param.browser = login.Browser;
				param.platform = login.Platform;
				param.openID = string.Empty;
				param.sessionKey = string.Empty;
				param.unionID = string.Empty;
				param.sid = sid;
				param.ukey = ukey;
				param.nickname = nickname;
				param.avatar = avatar;
				param.gender = gender;
				HandleLoginSuccess( gcLoginRet, param );
			}
			//数据库也查询失败,自动注册
			else
			{
				//无需检测用户名的合法性和是否存在,进入该方法前已经判定
				//请求DB服务器注册账号
				Protos.LS2DB_Exec sqlExec = ProtoCreator.Q_LS2DB_Exec();
				sqlExec.Cmd =
					$"insert account_user( channel,browser,platform,uname,pwd,nickname,avatar,gender,last_login_time,last_login_ip ) values({( int )login.Channel},{( int )login.Browser},{( int )login.Platform}, \'{login.Name}\', \'{string.Empty}\', \'{string.Empty}\', \'{string.Empty}\', 0, {TimeUtils.utcTime}, \'{remote}\');";
				LS.instance.netSessionMgr.Send( SessionType.ServerL2DB, sqlExec, RPCEntry.Pop( OnSmartRegisterAccount, gcLoginRet, sid, login.Name, login.Channel, login.Browser, login.Platform ) );
			}
		}

		/// <summary>
		/// DB返回注册结果
		/// </summary>
		private static void OnSmartRegisterAccount( INetSession session, Google.Protobuf.IMessage message, object[] args )
		{
			Protos.LS2GC_AskLoginRet gcLoginRet = ( Protos.LS2GC_AskLoginRet )args[0];
			uint sid = ( uint )args[1];
			string uname = ( string )args[2];
			Protos.Global.Types.Channel channel = ( Protos.Global.Types.Channel )args[3];
			Protos.Global.Types.Browser browser = ( Protos.Global.Types.Browser )args[3];
			Protos.Global.Types.Platform platform = ( Protos.Global.Types.Platform )args[3];

			//返回的消息
			Protos.DB2LS_ExecRet sqlExecRet = ( Protos.DB2LS_ExecRet )message;
			if ( sqlExecRet.Result == Protos.DB2LS_QueryResult.Success )
			{
				RedisWrapper redisWrapper = LS.instance.redisWrapper;
				//写入redis缓存
				if ( redisWrapper.IsConnected )
				{
					redisWrapper.HashSet( "unames", uname, string.Empty );
					redisWrapper.HashSet( "ukeys", uname, sqlExecRet.Id );
					redisWrapper.HashSet( "nickname", uname, string.Empty );
					redisWrapper.HashSet( "avatar", uname, string.Empty );
					redisWrapper.HashSet( "gender", uname, 0 );
				}
			}

			uint ukey = sqlExecRet.Id;
			if ( sqlExecRet.Result == Protos.DB2LS_QueryResult.Success )
			{
				CSLoginParam param;
				param.channel = channel;
				param.browser = browser;
				param.platform = platform;
				param.openID = string.Empty;
				param.sessionKey = string.Empty;
				param.unionID = string.Empty;
				param.sid = sid;
				param.ukey = ukey;
				param.nickname = string.Empty;
				param.avatar = string.Empty;
				param.gender = 0;
				HandleLoginSuccess( gcLoginRet, param );
			}
			else
			{
				//这里不应该会失败,以防万一打印一些信息
				Logger.Error( $"smart register occurs an error:{sqlExecRet}" );
				gcLoginRet.Result = ( Protos.LS2GC_AskLoginRet.Types.EResult )sqlExecRet.Result;

				//通知客户端登陆结果
				LS.instance.netSessionMgr.Send( sid, gcLoginRet );
				LS.instance.netSessionMgr.DelayCloseSession( sid, 100, "login complete" );
			}
		}

		private static void HandleLoginSuccess( Protos.LS2GC_AskLoginRet gcLoginRet, CSLoginParam param )
		{
			ulong gcNID = GuidHash.GetUInt64();
			//通知cs,客户端登陆成功
			Protos.LS2CS_GCLogin csLogin = ProtoCreator.Q_LS2CS_GCLogin();
			csLogin.Channel = param.channel;
			csLogin.Browser = param.browser;
			csLogin.Platform = param.platform;
			csLogin.SessionID = gcNID;
			csLogin.Ukey = param.ukey;
			csLogin.OpenID = param.openID;
			csLogin.SessionKey = param.sessionKey;
			csLogin.UnionID = param.unionID;
			csLogin.Nickname = param.nickname;
			csLogin.Avatar = param.avatar;
			csLogin.Gender = param.gender;

			LS.instance.netSessionMgr.Send( SessionType.ServerL2CS, csLogin,
											RPCEntry.Pop( OnGCLoginCSRet, gcLoginRet, param.sid, gcNID ) );
		}

		private bool CheckUsername( string uname )
		{
			if ( string.IsNullOrEmpty( uname ) ||
				 uname.Length < Consts.DEFAULT_UNAME_MIN_LEN ||
				 uname.Length > Consts.DEFAULT_UNAME_MAX_LEN )
				return false;
			return true;
		}

		private bool CheckPassword( string pwd )
		{
			if ( string.IsNullOrEmpty( pwd ) ||
				 pwd.Length < Consts.DEFAULT_PWD_MIN_LEN ||
				 pwd.Length > Consts.DEFAULT_PWD_MAX_LEN ||
				 !Consts.REGEX_PWD.IsMatch( pwd ) )
				return false;
			return true;
		}

		public ErrorCode OnGc2LsAskWxlogin( NetSessionBase session, Google.Protobuf.IMessage message )
		{
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
					session.DelayClose( 500, $"login fail:{errorCode}" );
				}
				else
				{
					string openID = json.GetString( "openid" );
					string sessionKey = json.GetString( "session_key" );
					string unionID = json.GetString( "unionid" );
					uint ukey = Core.Crypto.CRC32.Compute( Encoding.UTF8.GetBytes( openID ) );

					Logger.Log( $"wxLogin success, openID:{openID}, sessionKey:{sessionKey}, unionID:{unionID}, ukey:{ukey}" );

					CSLoginParam param;
					param.channel = Protos.Global.Types.Channel.Wxmini;
					param.browser = login.Browser;
					param.platform = login.Platform;
					param.openID = openID;
					param.sessionKey = sessionKey;
					param.unionID = unionID;
					param.sid = session.id;
					param.ukey = ukey;
					param.nickname = login.Nickname;
					param.avatar = login.Avatar;
					param.gender = ( byte )login.Gender;
					HandleLoginSuccess( gcLoginRet, param );
				}
			}, null, CancellationToken.None );
			return ErrorCode.Success;
		}
	}
}