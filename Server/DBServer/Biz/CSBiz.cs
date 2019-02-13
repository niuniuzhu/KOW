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
	}
}