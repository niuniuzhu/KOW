using Core.Misc;
using Core.Net;
using Shared;
using Shared.DB;
using Shared.Net;
using StackExchange.Redis;
using System.Collections.Generic;
using GSInfo = Shared.GSInfo;

namespace LoginServer.Net
{
	public class ClientSession : SrvCliSession
	{
		protected ClientSession( uint id, ProtoType type ) : base( id, type )
		{
			this._msgCenter.Register( Protos.MsgID.EGc2LsAskRegister, this.OnGCtoLSAskRegister );
			this._msgCenter.Register( Protos.MsgID.EGc2LsAskLogin, this.OnGCtoLSAskLogin );
		}

		protected override void OnEstablish()
		{
			base.OnEstablish();
			Logger.Info( $"client({this.id}) connected" );
		}

		protected override void OnClose( string reason )
		{
			base.OnClose( reason );
			Logger.Info( $"client({this.id}) disconnected with msg:{reason}" );
		}

		private ErrorCode OnGCtoLSAskRegister( Google.Protobuf.IMessage message )
		{
			Protos.GC2LS_AskRegister register = ( Protos.GC2LS_AskRegister ) message;
			Protos.LS2GC_AskRegRet regRet = ProtoCreator.R_GC2LS_AskRegister( register.Opts.Pid );

			regRet.Result = Protos.LS2GC_AskRegRet.Types.EResult.Success;

			//检测用户名是否存在
			if ( LS.instance.userNameToGcNID.ContainsKey( register.Name ) )
			{
				regRet.Result = Protos.LS2GC_AskRegRet.Types.EResult.UnameExists;
				this.Send( regRet );
				this.DelayClose( 500, "register finish" );
				return ErrorCode.Success;
			}

			//检测用户名的合法性
			if ( string.IsNullOrEmpty( register.Name ) || register.Name.Length < Consts.DEFAULT_UNAME_LEN )
			{
				regRet.Result = Protos.LS2GC_AskRegRet.Types.EResult.UnameIllegal;
				this.Send( regRet );
				this.DelayClose( 500, "register finish" );
				return ErrorCode.Success;
			}

			string pwd;
			if ( LS.instance.config.pwdVerification )
			{
				//检测密码合法性
				if ( string.IsNullOrEmpty( register.Passwd ) ||
					 register.Passwd.Length < Consts.DEFAULT_PWD_LEN ||
					 !Consts.REGEX_PWD.IsMatch( register.Passwd ) )
				{
					regRet.Result = Protos.LS2GC_AskRegRet.Types.EResult.PwdIllegal;
					this.Send( regRet );
					this.DelayClose( 500, "register finish" );
					return ErrorCode.Success;
				}
				pwd = register.Passwd;
			}
			else
				pwd = string.Empty;

			//若Redis可用，则查询；不可用就直接查询数据库
			RedisWrapper redisWrapper = LS.instance.redisWrapper;
			if ( redisWrapper.IsConnected && redisWrapper.HashExists( "unames", register.Name ) )
			{
				//redis存在相同用户名
				regRet.Result = Protos.LS2GC_AskRegRet.Types.EResult.UnameExists;
				this.Send( regRet );
				this.DelayClose( 500, "register finish" );
				return ErrorCode.Success;
			}
			//md5编码密码
			string pwdmd5 = Core.Crypto.MD5Util.GetMd5HexDigest( pwd ).Replace( "-", string.Empty ).ToLower();
			//查询数据库
			Protos.LS2DB_QueryAccount queryAccount = ProtoCreator.Q_LS2DB_QueryAccount();
			queryAccount.Name = register.Name;
			this.owner.Send( SessionType.ServerL2DB, queryAccount, OnLS2DB_QueryAccount );

			return ErrorCode.Success;

			void OnLS2DB_QueryAccount( Google.Protobuf.IMessage m )
			{
				Protos.DB2LS_QueryAccountRet queryAccountRet = ( Protos.DB2LS_QueryAccountRet ) m;
				regRet.Result = queryAccountRet.Result == Protos.DB2LS_QueryResult.Success
									? Protos.LS2GC_AskRegRet.Types.EResult.Success : Protos.LS2GC_AskRegRet.Types.EResult.UnameExists;
				if ( regRet.Result == Protos.LS2GC_AskRegRet.Types.EResult.Success )
				{
					//请求DB服务器注册账号
					Protos.LS2DB_Exec sqlExec = ProtoCreator.Q_LS2DB_Exec();
					sqlExec.Cmd = $"insert account_user( sdk,uname,pwd ) values({register.Sdk}, \'{register.Name}\', \'{pwdmd5}\');";
					this.owner.Send( SessionType.ServerL2DB, sqlExec, OnCheckAccount );
				}
				else
				{
					//发送注册结果到gc
					this.Send( regRet );
					//关闭连接
					this.DelayClose( 500, "register finish" );
				}
			}

			//DB服务端回调
			void OnCheckAccount( Google.Protobuf.IMessage m )
			{
				Protos.DB2LS_ExecRet sqlExecRet = ( Protos.DB2LS_ExecRet ) m;
				regRet.Result = ( Protos.LS2GC_AskRegRet.Types.EResult ) sqlExecRet.Result;
				if ( regRet.Result == Protos.LS2GC_AskRegRet.Types.EResult.Success )
				{
					//写入redis缓存
					if ( redisWrapper.IsConnected )
					{
						redisWrapper.HashSet( "unames", register.Name, pwdmd5 );
						redisWrapper.HashSet( "ukeys", register.Name, sqlExecRet.Id );
					}
				}
				//发送注册结果到gc
				this.Send( regRet );
				//关闭连接
				this.DelayClose( 500, "register finish" );
			}
		}

		private ErrorCode OnGCtoLSAskLogin( Google.Protobuf.IMessage message )
		{
			Protos.GC2LS_AskLogin login = ( Protos.GC2LS_AskLogin ) message;
			Protos.LS2GC_AskLoginRet gcLoginRet = ProtoCreator.R_GC2LS_AskLogin( login.Opts.Pid );

			//检测用户名的合法性
			if ( string.IsNullOrEmpty( login.Name ) || login.Name.Length < Consts.DEFAULT_UNAME_LEN )
			{
				gcLoginRet.Result = Protos.LS2GC_AskLoginRet.Types.EResult.InvalidUname;
				this.Send( gcLoginRet );
				this.DelayClose( 500, "login complete" );
				return ErrorCode.Success;
			}

			string pwd;
			if ( LS.instance.config.pwdVerification )
			{
				//检测密码合法性
				if ( string.IsNullOrEmpty( login.Passwd ) ||
					 login.Passwd.Length < Consts.DEFAULT_PWD_LEN ||
					 !Consts.REGEX_PWD.IsMatch( login.Passwd ) )
				{
					gcLoginRet.Result = Protos.LS2GC_AskLoginRet.Types.EResult.InvalidPwd;
					this.Send( gcLoginRet );
					this.DelayClose( 500, "login complete" );
					return ErrorCode.Success;
				}
				pwd = login.Passwd;
			}
			else
				pwd = string.Empty;

			//登录id 
			uint ukey = 0;
			//若Redis可用则查询；不可用就直接查询数据库
			RedisWrapper redisWrapper = LS.instance.redisWrapper;
			//尝试从缓存中查找账号
			if ( redisWrapper.IsConnected )
			{
				RedisValue cachedPwd = redisWrapper.HashGet( "unames", login.Name );
				if ( !cachedPwd.HasValue ) //redis找不到用户名
				{
					gcLoginRet.Result = Protos.LS2GC_AskLoginRet.Types.EResult.InvalidUname;
					this.Send( gcLoginRet );
					this.DelayClose( 500, "login complete" );
					return ErrorCode.Success;
				}
				if ( LS.instance.config.pwdVerification )
				{
					//验证密码
					if ( cachedPwd != Core.Crypto.MD5Util.GetMd5HexDigest( pwd ).Replace( "-", string.Empty ).ToLower() ) //密码不正确
					{
						gcLoginRet.Result = Protos.LS2GC_AskLoginRet.Types.EResult.InvalidPwd;
						this.Send( gcLoginRet );
						this.DelayClose( 500, "login complete" );
						return ErrorCode.Success;
					}
				}
				ukey = ( uint ) redisWrapper.HashGet( "ukeys", login.Name );//从redis取回ukey
				HandlerLoginSuccess();
			}
			else
			{
				string pwdmd5 = Core.Crypto.MD5Util.GetMd5HexDigest( pwd ).Replace( "-", string.Empty ).ToLower();
				Protos.LS2DB_QueryLogin queryLogin = ProtoCreator.Q_LS2DB_QueryLogin();
				queryLogin.Name = login.Name;
				queryLogin.Pwd = pwdmd5;
				queryLogin.VertPwd = LS.instance.config.pwdVerification;
				this.owner.Send( SessionType.ServerL2DB, queryLogin, m =>
				{
					Protos.DB2LS_QueryLoginRet queryLoginRet = ( Protos.DB2LS_QueryLoginRet ) m;
					gcLoginRet.Result = ( Protos.LS2GC_AskLoginRet.Types.EResult ) queryLoginRet.Result;
					ukey = queryLoginRet.Ukey;//从数据库取回ukey
					if ( gcLoginRet.Result == Protos.LS2GC_AskLoginRet.Types.EResult.Success )
					{
						//写入redis缓存
						if ( redisWrapper.IsConnected )
						{
							redisWrapper.HashSet( "unames", login.Name, pwdmd5 );
							redisWrapper.HashSet( "ukeys", login.Name, ukey );
						}
						HandlerLoginSuccess();
					}
					else
					{
						this.Send( gcLoginRet );
						this.DelayClose( 500, "login complete" );
					}
				} );
			}
			return ErrorCode.Success;

			void HandlerLoginSuccess()
			{
				//为当前客户端分配唯一id
				ulong sessionID = GuidHash.GetUInt64();
				//通知cs,客户端登陆成功
				Protos.LS2CS_GCLogin csLogin = ProtoCreator.Q_LS2CS_GCLogin();
				csLogin.SessionID = sessionID;
				csLogin.Ukey = ukey;
				this.owner.Send( SessionType.ServerL2CS, csLogin, m =>
				{
					Protos.CS2LS_GCLoginRet csLoginRet = ( Protos.CS2LS_GCLoginRet ) m;

					gcLoginRet.Result = ( Protos.LS2GC_AskLoginRet.Types.EResult ) csLoginRet.Result;
					if ( gcLoginRet.Result == Protos.LS2GC_AskLoginRet.Types.EResult.Success )
					{
						gcLoginRet.SessionID = sessionID;
						foreach ( KeyValuePair<uint, GSInfo> kv in LS.instance.gsInfos )
						{
							GSInfo info = kv.Value;
							Protos.GSInfo gsInfo = new Protos.GSInfo
							{
								Name = info.name,
								Ip = info.ip,
								Port = info.port,
								Password = info.password,
								State = ( Protos.GSInfo.Types.State ) info.state
							};
							gcLoginRet.GsInfos.Add( gsInfo );
						}
						Logger.Log( $"client:{login.Name}, sid:{sessionID} login success" );
					}
					else
						Logger.Log( $"client:{login.Name} login failed" );
					this.Send( gcLoginRet );
					this.DelayClose( 500, "login complete" );
				} );
			}
		}
	}
}