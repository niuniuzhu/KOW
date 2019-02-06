using Shared;
using Shared.Net;

namespace DBServer.Biz
{
	public partial class BizProcessor
	{
		public ErrorCode OnCs2DbUpdateRank( NetSessionBase session, Google.Protobuf.IMessage message )
		{
			Protos.CS2DB_UpdateRank request = ( Protos.CS2DB_UpdateRank )message;
			string str = "UPDATE account_user SET ranking = CASE id ";
			string ids = string.Join( ",", request.Ukeys );
			int count = request.Ukeys.Count;
			for ( int i = 0; i < count; i++ )
			{
				str += $"WHEN {request.Ukeys[i]} THEN {request.Ranks[i]} ";
			}
			str += $"END WHERE id IN ({ids})";
			ErrorCode errorCode = DB.instance.accountDB.SqlExecNonQuery( str, out _, out uint _ );
			return ErrorCode.Success;
		}
	}
}