using Shared;
using Shared.Net;

namespace DBServer.Biz
{
	public class BizProcessor
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
			queryUserRet.Result = errorCode == ErrorCode.Success ? Protos.DB2LS_QueryResult.Success : Protos.DB2LS_QueryResult.Failed;
			session.Send( queryUserRet );
			return ErrorCode.Success;
		}

		public ErrorCode OnLs2DbQueryLogin( NetSessionBase session, Google.Protobuf.IMessage message )
		{
			Protos.LS2DB_QueryLogin queryLogin = ( Protos.LS2DB_QueryLogin )message;

			Protos.DB2LS_QueryLoginRet queryLoginRet = ProtoCreator.R_LS2DB_QueryLogin( queryLogin.Opts.Pid );
			ErrorCode errorCode = DB.instance.accountDB.SqlExecQuery(
				$"select id,pwd,nickname,avatar,gender from account_user where uname=\'{queryLogin.Name}\'",
				dataReader =>
				{
					if ( !dataReader.HasRows )
						return ErrorCode.InvalidUname;
					dataReader.Read();
					queryLoginRet.Ukey = dataReader.GetUInt32( "id" );
					queryLoginRet.Nickname = dataReader.GetString( "nickname" );
					queryLoginRet.Avatar = dataReader.GetString( "avatar" );
					queryLoginRet.Gender = dataReader.GetByte( "gender" );
					ErrorCode QueryError = ErrorCode.Success;
					if ( queryLogin.VertPwd )
					{
						if ( dataReader.GetString( "pwd" ) != queryLogin.Pwd )
							QueryError = ErrorCode.InvalidPwd;
					}
					return QueryError;
				} );

			if ( errorCode == ErrorCode.Success )
				errorCode = DB.instance.accountDB.SqlExecNonQuery(
					$"update account_user SET channel={( int )queryLogin.Channel}, browser={( int )queryLogin.Browser}, platform={( int )queryLogin.Platform}, last_login_time={queryLogin.Time},last_login_ip=\'{queryLogin.Ip}\' where uname=\'{queryLogin.Name}\'", out _, out uint _ );

			switch ( errorCode )
			{
				case ErrorCode.Success:
					queryLoginRet.Result = Protos.DB2LS_QueryResult.Success;
					break;
				case ErrorCode.InvalidPwd:
					queryLoginRet.Result = Protos.DB2LS_QueryResult.InvalidPwd;
					break;
				case ErrorCode.InvalidUname:
					queryLoginRet.Result = Protos.DB2LS_QueryResult.InvalidUname;
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
			execRet.Result = errorCode == ErrorCode.Success ? Protos.DB2LS_QueryResult.Success : Protos.DB2LS_QueryResult.Failed;
			session.Send( execRet );
			return ErrorCode.Success;
		}
	}
}