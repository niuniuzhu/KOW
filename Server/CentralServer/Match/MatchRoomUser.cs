namespace CentralServer.Match
{
	public class MatchRoomUser : BattleUser
	{
		/// <summary>
		/// 积分
		/// </summary>
		public int rank { get; }
		/// <summary>
		/// 玩家所在房间
		/// </summary>
		internal MatchRoom room;

		public MatchRoomUser( ulong id, int rank ) : base( id )
		{
			this.rank = rank;
		}

		public override string Dump() => $"id:{this.id},rank:{this.rank}";
	}
}