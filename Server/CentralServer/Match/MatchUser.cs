namespace CentralServer.Match
{
	public class MatchUser
	{
		/// <summary>
		/// 玩家ID
		/// </summary>
		public ulong id { get; }
		/// <summary>
		/// 积分
		/// </summary>
		public int rank { get; }
		/// <summary>
		/// 自定义数据
		/// </summary>
		public object userdata;
		/// <summary>
		/// 所属分段
		/// </summary>
		internal Grading grading;
		/// <summary>
		/// 已加入的等候室
		/// </summary>
		internal MatchingLounge lounge;

		public MatchUser( ulong id, int rank )
		{
			this.id = id;
			this.rank = rank;
		}

		public string Dump() => $"id:{this.id},rank:{this.rank}";
	}
}