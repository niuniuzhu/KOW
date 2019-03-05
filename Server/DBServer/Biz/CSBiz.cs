using Shared;
using Shared.Net;

namespace DBServer.Biz
{
	public partial class BizProcessor
	{
		public ErrorCode OnCs2DbUpdateRank( NetSessionBase session, Google.Protobuf.IMessage message )
		{
			Protos.CS2DB_UpdateRank request = ( Protos.CS2DB_UpdateRank )message;
			//combine id
			string ids = string.Empty;
			int count = request.Gains.Count;
			for ( int i = 0; i < count; i++ )
			{
				Protos.CS2DB_Gain gain = request.Gains[i];
				if ( i < count - 1 )
					ids += $"{gain.Ukey},";
				else
					ids += gain.Ukey;
			}
			string money = "money = CASE id ";
			string diamoned = "diamoned = CASE id ";
			string exp = "exp = CASE id ";
			string ranking = "ranking = CASE id ";
			for ( int i = 0; i < count; i++ )
			{
				Protos.CS2DB_Gain gain = request.Gains[i];
				money += $"WHEN {gain.Ukey} THEN {gain.Money} ";
				diamoned += $"WHEN {gain.Ukey} THEN {gain.Diamoned} ";
				exp += $"WHEN {gain.Ukey} THEN {gain.Exp} ";
				ranking += $"WHEN {gain.Ukey} THEN {gain.Rank} ";
			}
			//update command
			string str = "UPDATE account_user SET ";
			str += money + "END, ";
			str += diamoned + "END, ";
			str += exp + "END, ";
			str += ranking + "END ";
			str += $"WHERE id IN ({ids})";

			ErrorCode errorCode = DB.instance.accountDB.SqlExecNonQuery( str, out _, out uint _ );
			return ErrorCode.Success;
		}

		public ErrorCode OnCs2DbQueryRanking( NetSessionBase session, Google.Protobuf.IMessage message )
		{
			Protos.CS2DB_QueryRanking request = ( Protos.CS2DB_QueryRanking )message;
			int @from = request.From;
			int count = request.Count;
			Protos.DB2CS_QueryRankingRet resp = ProtoCreator.R_CS2DB_QueryRanking( request.Opts.Pid );
			string str = $"SELECT id,uname,nickname,avatar,gender,last_login_time,ranking,exp FROM account_user ORDER BY ranking DESC LIMIT {@from}, {count}";
			ErrorCode errorCode = DB.instance.accountDB.SqlExecQuery( str, dataReader =>
			 {
				 while ( dataReader.Read() )
				 {
					 Protos.DB2CS_RankingInfo rankingInfo = new Protos.DB2CS_RankingInfo();
					 rankingInfo.Ukey = dataReader.GetUInt32( "id" );
					 rankingInfo.Name = dataReader.GetString( "nickname" );
					 rankingInfo.Avatar = dataReader.GetString( "avatar" );
					 rankingInfo.Gender = dataReader.GetByte( "gender" );
					 rankingInfo.LastLoginTime = dataReader.GetInt64( "last_login_time" );
					 rankingInfo.Rank = dataReader.GetInt32( "ranking" );
					 rankingInfo.Exp = dataReader.GetInt32( "exp" );
					 resp.RankingInfos.Add( rankingInfo );
				 }
				 return ErrorCode.Success;
			 } );
			session.Send( resp );
			return ErrorCode.Success;
		}
	}
}