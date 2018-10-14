using Core.Misc;
using Core.Net;
using Shared;
using Shared.Net;

namespace DBServer.Net
{
	public class LoginSession : SrvCliSession
	{
		protected LoginSession( uint id, ProtoType type ) : base( id, type )
		{
			this._msgCenter.Register( Protos.MsgID.ELs2DbQueryAccount, this.OnLs2DbQueryAccount );
			this._msgCenter.Register( Protos.MsgID.ELs2DbQueryLogin, this.OnLs2DbQueryLogin );
			this._msgCenter.Register( Protos.MsgID.ELs2DbExec, this.OnLs2DbExec );
		}

		protected override void OnEstablish()
		{
			base.OnEstablish();
			Logger.Info( $"LS({this.id}) connected" );
		}

		protected override void OnClose( string reason )
		{
			base.OnClose( reason );
			Logger.Info( $"LS({this.id}) disconnected with msg:{reason}" );
		}

		private ErrorCode OnLs2DbQueryAccount( Google.Protobuf.IMessage message )
		{
			Protos.LS2DB_QueryAccount queryUser = ( Protos.LS2DB_QueryAccount ) message;
			Protos.DB2LS_QueryAccountRet queryUserRet = ProtoCreator.R_LS2DB_QueryAccount( queryUser.Opts.Pid );
			ErrorCode errorCode = DB.instance.accountDB.SqlExecQuery( $"select id from account_user where uname=\'{queryUser.Name}\'",
															 dataReader =>
															 {
																 if ( dataReader.HasRows )
																	 return ErrorCode.UsernameExists;
																 return ErrorCode.Success;
															 } );
			queryUserRet.Result = errorCode == ErrorCode.Success ? Protos.DB2LS_QueryResult.Success : Protos.DB2LS_QueryResult.Failed;
			this.Send( queryUserRet );
			return ErrorCode.Success;
		}

		private ErrorCode OnLs2DbQueryLogin( Google.Protobuf.IMessage message )
		{
			Protos.LS2DB_QueryLogin queryLogin = ( Protos.LS2DB_QueryLogin ) message;

			Protos.DB2LS_QueryLoginRet queryLoginRet = ProtoCreator.R_LS2DB_QueryLogin( queryLogin.Opts.Pid );
			ErrorCode errorCode = DB.instance.accountDB.SqlExecQuery(
				$"select id,pwd from account_user where uname=\'{queryLogin.Name}\'",
				dataReader =>
				{
					if ( !dataReader.HasRows )
						return ErrorCode.InvalidUname;
					dataReader.Read();
					queryLoginRet.Ukey = dataReader.GetUInt32( "id" );
					if ( queryLogin.VertPwd )
					{
						return dataReader.GetString( "pwd" ) != queryLogin.Pwd
								   ? ErrorCode.InvalidPwd
								   : ErrorCode.Success;
					}
					return ErrorCode.Success;
				} );
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
			this.Send( queryLoginRet );
			return ErrorCode.Success;
		}

		private ErrorCode OnLs2DbExec( Google.Protobuf.IMessage message )
		{
			Protos.LS2DB_Exec exec = ( Protos.LS2DB_Exec ) message;
			Protos.DB2LS_ExecRet execRet = ProtoCreator.R_LS2DB_Exec( exec.Opts.Pid );
			ErrorCode errorCode = DB.instance.accountDB.SqlExecNonQuery( exec.Cmd, out int row, out long id );
			execRet.Row = row;
			execRet.Id = id;
			execRet.Result = errorCode == ErrorCode.Success ? Protos.DB2LS_QueryResult.Success : Protos.DB2LS_QueryResult.Failed;
			this.Send( execRet );
			return ErrorCode.Success;
		}
	}
}