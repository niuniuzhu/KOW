using Core.Misc;
using Core.Net;
using Shared;
using Shared.DB;
using Shared.Net;
using StackExchange.Redis;
using System;
using System.Collections.Generic;

namespace LoginServer.Biz
{
	public partial class BizProcessor
	{
		public ErrorCode OnGCtoLSAskRegister( NetSessionBase session, Google.Protobuf.IMessage message )
		{
			string remote = session.connection.remoteEndPoint.ToString();

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
			LS.instance.netSessionMgr.Send( SessionType.ServerL2DB, queryAccount, OnLS2DB_QueryAccount );

			return ErrorCode.Success;

			void OnLS2DB_QueryAccount( NetSessionBase session_, Google.Protobuf.IMessage m )
			{
				Protos.DB2LS_QueryAccountRet queryAccountRet = ( Protos.DB2LS_QueryAccountRet )m;
				regRet.Result = queryAccountRet.Result == Protos.DB2LS_QueryResult.Success
									? Protos.LS2GC_AskRegRet.Types.EResult.Success : Protos.LS2GC_AskRegRet.Types.EResult.UnameExists;
				if ( regRet.Result == Protos.LS2GC_AskRegRet.Types.EResult.Success )
				{
					//请求DB服务器注册账号
					Protos.LS2DB_Exec sqlExec = ProtoCreator.Q_LS2DB_Exec();
					sqlExec.Cmd = $"insert account_user( sdk,uname,pwd,last_login_time,last_login_ip ) values({register.Sdk}, \'{register.Name}\', \'{pwdmd5}\', {TimeUtils.utcTime}, \'{remote}\');";
					LS.instance.netSessionMgr.Send( SessionType.ServerL2DB, sqlExec, OnCheckAccount );
				}
				else
				{
					//发送注册结果到gc
					session_.Send( regRet );
					//关闭连接
					session_.DelayClose( 500, "register finish" );
				}
			}

			//DB服务端回调
			void OnCheckAccount( NetSessionBase session_, Google.Protobuf.IMessage m )
			{
				Protos.DB2LS_ExecRet sqlExecRet = ( Protos.DB2LS_ExecRet )m;
				regRet.Result = ( Protos.LS2GC_AskRegRet.Types.EResult )sqlExecRet.Result;
				if ( regRet.Result == Protos.LS2GC_AskRegRet.Types.EResult.Success )
				{
					//写入redis缓存
					if ( LS.instance.redisWrapper.IsConnected )
					{
						LS.instance.redisWrapper.HashSet( "unames", register.Name, pwdmd5 );
						LS.instance.redisWrapper.HashSet( "ukeys", register.Name, sqlExecRet.Id );
					}
				}
				//发送注册结果到gc
				session_.Send( regRet );
				//关闭连接
				session_.DelayClose( 500, "register finish" );
			}
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
			uint ukey;
			//若Redis可用则查询；不可用就直接查询数据库
			RedisWrapper redisWrapper = LS.instance.redisWrapper;
			//尝试从缓存中查找账号
			if ( redisWrapper.IsConnected )
			{
				RedisValue cachedPwd = redisWrapper.HashGet( "unames", login.Name );
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
				ukey = ( uint )redisWrapper.HashGet( "ukeys", login.Name );
				this.HandleLoginSuccess( session.id, gcLoginRet, login.Name, ukey );
			}
			//从数据库中查找
			else
			{
				uint sid = session.id;
				string pwdmd5 = Core.Crypto.MD5Util.GetMd5HexDigest( pwd ).Replace( "-", string.Empty ).ToLower();
				Protos.LS2DB_QueryLogin queryLogin = ProtoCreator.Q_LS2DB_QueryLogin();
				queryLogin.Name = login.Name;
				queryLogin.Pwd = pwdmd5;
				queryLogin.VertPwd = LS.instance.config.pwdVerification;
				queryLogin.Time = TimeUtils.utcTime;
				queryLogin.Ip = session.connection.remoteEndPoint.ToString();
				LS.instance.netSessionMgr.Send( SessionType.ServerL2DB, queryLogin, ( session_, ret ) =>
				{
					Protos.DB2LS_QueryLoginRet queryLoginRet = ( Protos.DB2LS_QueryLoginRet )ret;
					gcLoginRet.Result = ( Protos.LS2GC_AskLoginRet.Types.EResult )queryLoginRet.Result;
					if ( gcLoginRet.Result == Protos.LS2GC_AskLoginRet.Types.EResult.Success )
					{
						//从数据库取回ukey
						ukey = queryLoginRet.Ukey;
						//写入redis缓存
						if ( redisWrapper.IsConnected )
						{
							redisWrapper.HashSet( "unames", login.Name, pwdmd5 );
							redisWrapper.HashSet( "ukeys", login.Name, ukey );
						}
						this.HandleLoginSuccess( sid, gcLoginRet, login.Name, ukey );
					}
					else
					{
						session_.Send( gcLoginRet );
						session_.DelayClose( 500, "login complete" );
					}
				} );
			}
			return ErrorCode.Success;
		}

		private void HandleLoginSuccess( uint sid, Protos.LS2GC_AskLoginRet gcLoginRet, string uname, uint ukey )
		{
			ulong sessionID = GuidHash.GetUInt64();
			//通知cs,客户端登陆成功
			Protos.LS2CS_GCLogin csLogin = ProtoCreator.Q_LS2CS_GCLogin();
			csLogin.SessionID = sessionID;
			csLogin.Ukey = ukey;
			LS.instance.netSessionMgr.Send( SessionType.ServerL2CS, csLogin, ( session_, ret ) =>
			{
				Protos.CS2LS_GCLoginRet csLoginRet = ( Protos.CS2LS_GCLoginRet )ret;

				gcLoginRet.Result = ( Protos.LS2GC_AskLoginRet.Types.EResult )csLoginRet.Result;
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
							State = ( Protos.GSInfo.Types.State )info.state
						};
						gcLoginRet.GsInfos.Add( gsInfo );
					}
					Logger.Log( $"client:{uname}, sid:{sessionID} login success" );
				}
				else
					Logger.Log( $"client:{uname} login failed" );

				//通知客户端登陆结果
				LS.instance.netSessionMgr.Send( sid, gcLoginRet );
				LS.instance.netSessionMgr.DelayCloseSession( sid, 500, "login complete" );
			} );
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

			//检测用户名的合法性
			if ( !this.CheckUsername( login.Name ) )
			{
				gcLoginRet.Result = Protos.LS2GC_AskLoginRet.Types.EResult.InvalidUname;
				session.Send( gcLoginRet );
				session.DelayClose( 500, "login complete" );
				return ErrorCode.Success;
			}

			bool hasUsername = false;
			//登录id 
			uint ukey = 0;
			//若Redis可用则查询；不可用就直接查询数据库
			//尝试从缓存中查找账号
			if ( LS.instance.redisWrapper.IsConnected )
			{
				RedisValue cachedPwd = LS.instance.redisWrapper.HashGet( "unames", login.Name );
				if ( cachedPwd.HasValue ) //redis找到用户名
				{
					hasUsername = true;
					//从redis取回ukey
					ukey = ( uint )LS.instance.redisWrapper.HashGet( "ukeys", login.Name );
				}
				OnUsernameChecked();
			}
			//从数据库中查找
			else
			{
				Protos.LS2DB_QueryLogin queryLogin = ProtoCreator.Q_LS2DB_QueryLogin();
				queryLogin.Name = login.Name;
				queryLogin.VertPwd = false;
				queryLogin.Time = TimeUtils.utcTime;
				queryLogin.Ip = remote;
				LS.instance.netSessionMgr.Send( SessionType.ServerL2DB, queryLogin, ( session_, ret ) =>
				{
					Protos.DB2LS_QueryLoginRet queryLoginRet = ( Protos.DB2LS_QueryLoginRet )ret;
					gcLoginRet.Result = ( Protos.LS2GC_AskLoginRet.Types.EResult )queryLoginRet.Result;
					if ( gcLoginRet.Result == Protos.LS2GC_AskLoginRet.Types.EResult.Success )
					{
						hasUsername = true;
						//从数据库取回ukey
						ukey = queryLoginRet.Ukey;
						//写入redis缓存
						if ( LS.instance.redisWrapper.IsConnected )
						{
							LS.instance.redisWrapper.HashSet( "unames", login.Name, string.Empty );
							LS.instance.redisWrapper.HashSet( "ukeys", login.Name, ukey );
						}
					}
					OnUsernameChecked();
				} );
			}

			void OnUsernameChecked()
			{
				if ( !hasUsername )
				{
					//找不到用户名则自动注册
					this.SmartRegister( login.Sdk, login.Name, login.Platform, remote, ret =>
					{
						ukey = ret.Id;
						if ( ret.Result == Protos.DB2LS_QueryResult.Success )
							this.HandleLoginSuccess( sid, gcLoginRet, login.Name, ukey );
						else
						{
							//这里不应该会失败,以防万一打印一些信息
							Logger.Error( $"smart register occurs an error:{ret}" );
							gcLoginRet.Result = ( Protos.LS2GC_AskLoginRet.Types.EResult )ret.Result;

							//通知客户端登陆结果
							LS.instance.netSessionMgr.Send( sid, gcLoginRet );
							LS.instance.netSessionMgr.DelayCloseSession( sid, 500, "login complete" );
						}
					} );
				}
				else
					this.HandleLoginSuccess( sid, gcLoginRet, login.Name, ukey );
			}
			return ErrorCode.Success;
		}

		private void SmartRegister( int sdk, string uname, uint platform, string networkAddress, Action<Protos.DB2LS_ExecRet> callback )
		{
			//无需检测用户名的合法性和是否存在,进入该方法前已经判定
			//请求DB服务器注册账号
			Protos.LS2DB_Exec sqlExec = ProtoCreator.Q_LS2DB_Exec();
			sqlExec.Cmd =
				$"insert account_user( sdk,uname,pwd,last_login_time,last_login_ip ) values({sdk}, \'{uname}\', \'{string.Empty}\', {TimeUtils.utcTime}, \'{networkAddress}\');";
			LS.instance.netSessionMgr.Send( SessionType.ServerL2DB, sqlExec, OnCheckAccount );

			//DB服务端回调
			void OnCheckAccount( INetSession session, Google.Protobuf.IMessage m )
			{
				Protos.DB2LS_ExecRet sqlExecRet = ( Protos.DB2LS_ExecRet )m;
				if ( sqlExecRet.Result == Protos.DB2LS_QueryResult.Success )
				{
					RedisWrapper redisWrapper = LS.instance.redisWrapper;
					//写入redis缓存
					if ( redisWrapper.IsConnected )
					{
						redisWrapper.HashSet( "unames", uname, string.Empty );
						redisWrapper.HashSet( "ukeys", uname, sqlExecRet.Id );
					}
					callback( sqlExecRet );
				}
				else
					callback( sqlExecRet );
			}
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
	}
}