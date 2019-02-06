using Shared;
using Shared.Net;

namespace DBServer.Biz
{
	public partial class BizProcessor
	{
		public ErrorCode OnLs2DbQueryAccount( NetSessionBase session, Google.Protobuf.IMessage message )
		{
			Protos.LS2DB_QueryAccount queryUser = ( Protos.LS2DB_QueryAccount )message;
			Protos.DB2LS_QueryAccountRet queryUserRet = ProtoCreator.R_LS2DB_QueryAccount( queryUser.Opts.Pid );
			ErrorCode errorCode = DB.instance.accountDB.SqlExecQuery( $"select id from account_user where uname=\'{queryUser.Name}\'",
															 dataReader =>
															 {
																 if ( dataReader.HasRows )
																	 return ErrorCode.UsernameExists;
																 return ErrorCode.Success;
															 } );
			queryUserRet.Result = errorCode == ErrorCode.Success ? Protos.Global.Types.ECommon.Success : Protos.Global.Types.ECommon.Failed;
			session.Send( queryUserRet );
			return ErrorCode.Success;
		}

		public ErrorCode OnLs2DbQueryLogin( NetSessionBase session, Google.Protobuf.IMessage message )
		{
			Protos.LS2DB_QueryLogin queryLogin = ( Protos.LS2DB_QueryLogin )message;
			Protos.DB2LS_QueryLoginRet queryLoginRet = ProtoCreator.R_LS2DB_QueryLogin( queryLogin.Opts.Pid );
			ErrorCode errorCode = DB.instance.accountDB.SqlExecQuery(
				$"select * from account_user where uname=\'{queryLogin.Name}\'",
				dataReader =>
				{
					if ( !dataReader.HasRows )
						return ErrorCode.InvalidUname;
					dataReader.Read();
					queryLoginRet.Ukey = dataReader.GetUInt32( "id" );
					queryLoginRet.Channel = ( Protos.Global.Types.Channel )dataReader.GetByte( "channel" );
					queryLoginRet.Browser = ( Protos.Global.Types.Browser )dataReader.GetByte( "browser" );
					queryLoginRet.Platform = ( Protos.Global.Types.Platform )dataReader.GetByte( "platform" );
					queryLoginRet.UnionID = dataReader.GetString( "unionID" );
					queryLoginRet.Nickname = dataReader.GetString( "nickname" );
					queryLoginRet.Avatar = dataReader.GetString( "avatar" );
					queryLoginRet.Gender = dataReader.GetByte( "gender" );
					queryLoginRet.Money = dataReader.GetInt32( "money" );
					queryLoginRet.Diamoned = dataReader.GetInt32( "diamoned" );
					queryLoginRet.Rank = dataReader.GetInt32( "rank" );

					ErrorCode QueryError = ErrorCode.Success;
					if ( queryLogin.VertPwd )
					{
						if ( dataReader.GetString( "pwd" ) != queryLogin.Pwd )
							QueryError = ErrorCode.InvalidPwd;
					}
					return QueryError;
				} );

			if ( errorCode == ErrorCode.Success )
			{
				//成功则更新记录
				errorCode = DB.instance.accountDB.SqlExecNonQuery(
					$"update account_user SET channel={( byte )queryLogin.Channel},browser={( byte )queryLogin.Browser},platform={( byte )queryLogin.Platform}," +
					$"unionID=\'{queryLogin.UnionID}\',nickname=\'{queryLogin.Nickname}\',avatar=\'{queryLogin.Avatar}\',gender={( byte )queryLogin.Gender}," +
					$"last_login_time={queryLogin.Time},last_login_ip=\'{queryLogin.Ip}\'" +
					$" where uname=\'{queryLogin.Name}\'",
					out _, out uint _ );
			}
			else
			{
				//自动注册
				errorCode = DB.instance.accountDB.SqlExecNonQuery(
					$"insert account_user( uname,channel,browser,platform,unionID,nickname,avatar,gender,money,diamoned,ranking,last_login_time,last_login_ip ) values" +
					$"(\'{queryLogin.Name}\',{( byte )queryLogin.Channel},{( byte )queryLogin.Browser},{( byte )queryLogin.Platform}," +
					$"\'{queryLogin.UnionID}\',\'{queryLogin.Nickname}\',\'{queryLogin.Avatar}\',\'{( byte )queryLogin.Gender}\'," +
					$"{queryLogin.Money},{queryLogin.Diamoned},{queryLogin.Rank}," +
					$"{queryLogin.Time},\'{queryLogin.Ip}\');",
					out _, out uint id );

				queryLoginRet.Ukey = id;
				queryLoginRet.Channel = queryLogin.Channel;
				queryLoginRet.Browser = queryLogin.Browser;
				queryLoginRet.Platform = queryLogin.Platform;
				queryLoginRet.UnionID = queryLogin.UnionID;
				queryLoginRet.Nickname = queryLogin.Nickname;
				queryLoginRet.Avatar = queryLogin.Avatar;
				queryLoginRet.Gender = queryLogin.Gender;
				queryLoginRet.Money = queryLogin.Money;
				queryLoginRet.Diamoned = queryLogin.Diamoned;
				queryLoginRet.Rank = queryLogin.Rank;

			}
			switch ( errorCode )
			{
				case ErrorCode.Success:
					queryLoginRet.Result = Protos.Global.Types.ECommon.Success;
					break;
				default:
					queryLoginRet.Result = Protos.Global.Types.ECommon.Failed;
					break;
			}
			session.Send( queryLoginRet );
			return ErrorCode.Success;
		}

		public ErrorCode OnLs2DbExec( NetSessionBase session, Google.Protobuf.IMessage message )
		{
			Protos.LS2DB_Exec exec = ( Protos.LS2DB_Exec )message;
			Protos.DB2LS_ExecRet execRet = ProtoCreator.R_LS2DB_Exec( exec.Opts.Pid );
			ErrorCode errorCode = DB.instance.accountDB.SqlExecNonQuery( exec.Cmd, out int row, out uint id );
			execRet.Row = row;
			execRet.Id = id;
			execRet.Result = errorCode == ErrorCode.Success ? Protos.Global.Types.ECommon.Success : Protos.Global.Types.ECommon.Failed;
			session.Send( execRet );
			return ErrorCode.Success;
		}
	}
}