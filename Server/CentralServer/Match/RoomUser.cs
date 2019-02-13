namespace CentralServer.Match
{
	public class RoomUser
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
		/// 玩家所在房间
		/// </summary>
		internal Room room;

		public RoomUser( ulong id, int rank )
		{
			this.id = id;
			this.rank = rank;
		}

		public string Dump() => $"id:{this.id},rank:{this.rank}";
	}
}