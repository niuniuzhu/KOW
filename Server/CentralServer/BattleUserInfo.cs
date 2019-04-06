using System;
using System.Text;

namespace CentralServer
{
	public class BattleUserInfo
	{
		internal BattleUser[] users;
		internal BattleUser[][] tUsers;

		internal BattleUserInfo( int numTeam, int numUserPerTeam, BattleUser[] users )
		{
			int numUsers = numTeam * numUserPerTeam;
			this.users = new BattleUser[numUsers];
			Array.Copy( users, this.users, numUsers );
			this.tUsers = new BattleUser[numTeam][];
			//每个队伍获得的玩家数量
			for ( int i = 0, k = 0; i < numTeam; i++ )
			{
				this.tUsers[i] = new BattleUser[numUserPerTeam];
				//分配玩家
				for ( int j = 0; j < numUserPerTeam; j++, k++ )
					this.tUsers[i][j] = this.users[k];
			}
		}

		public string Dump()
		{
			StringBuilder sb = new StringBuilder();
			int count = this.users.Length;
			for ( int i = 0; i < count; i++ )
			{
				BattleUser user = this.users[i];
				if ( user == null )
					continue;
				sb.AppendLine( $"#{i}" );
				sb.AppendLine( user.Dump() );
			}
			return sb.ToString();
		}
	}
}
