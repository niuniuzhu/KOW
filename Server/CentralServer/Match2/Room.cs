using Core.Misc;
using System;
using System.Collections.Generic;
using System.Text;

namespace CentralServer.Match2
{
	public static class RoomPool
	{
		private static readonly Dictionary<byte, Queue<Room>> POOL = new Dictionary<byte, Queue<Room>>();
		private const int INC = 10;

		internal static Room Pop( MatchSystem2 system )
		{
			Queue<Room> rooms;
			if ( !POOL.TryGetValue( system.mode, out rooms ) )
			{
				rooms = new Queue<Room>();
				POOL[system.mode] = rooms;
			}
			if ( rooms.Count == 0 )
			{
				for ( int i = 0; i < INC; i++ )
					rooms.Enqueue( new Room( system ) );
			}
			Room room = rooms.Dequeue();
			return room;
		}

		internal static void Push( Room room )
		{
			if ( !POOL.TryGetValue( room.mode, out Queue<Room> rooms ) )
				return;
			room.Clear();
			rooms.Enqueue( room );
		}
	}

	public class Room : IPoolObject
	{
		/// <summary>
		/// 所属系统
		/// </summary>
		public MatchSystem2 system { get; }
		/// <summary>
		/// 搜索分数下限,开区间
		/// </summary>
		public int from
		{
			get => this._from;
			set => this._from = value < 0 ? 0 : value;
		}
		/// <summary>
		/// 搜索分数上限,闭区间
		/// </summary>
		public int to { get; set; }
		/// <summary>
		/// 模式
		/// </summary>
		public byte mode => this.system.mode;
		/// <summary>
		/// 队伍数量
		/// </summary>
		public int numTeam => this.system.mode >> 4;
		/// <summary>
		/// 每个队伍的玩家数量
		/// </summary>
		public int numUserPerTeam => this.system.mode & 0xf;
		/// <summary>
		/// 获取可容纳的最大玩家数量
		/// </summary>
		public int numUsers => this.system.numUsers;
		/// <summary>
		/// 房间是否满员
		/// </summary>
		public bool isFull => this.currUserCount == this.system.numUsers;
		/// <summary>
		/// 房间是否空的
		/// </summary>
		public bool isEmpty => this.currUserCount == 0;
		/// <summary>
		/// 当前玩家数量
		/// </summary>
		public int currUserCount { get; private set; }

		private int _from;
		private readonly RoomUser[] _users;
		private int _extendCount;
		private long _time;

		internal Room( MatchSystem2 system )
		{
			this.system = system;
			this._users = new RoomUser[this.numTeam * this.numUserPerTeam];
		}

		public void Clear()
		{
			Array.Clear( this._users, 0, this._users.Length );
			this.from = 0;
			this.to = 0;
			this.currUserCount = 0;
			this._time = 0;
			this._extendCount = 0;
		}

		/// <summary>
		/// 把玩家添加到等候室,已存在的将会忽略并返回失败
		/// </summary>
		internal bool AddUser( RoomUser user )
		{
			if ( user.room != null )
				return false;
			int index = Array.IndexOf( this._users, null );
			if ( index < 0 )
				return false;
			this._users[index] = user;
			++this.currUserCount;
			user.room = this;
			return true;
		}

		/// <summary>
		/// 从等候室中移除玩家
		/// </summary>
		internal bool RemoveUser( RoomUser user )
		{
			if ( user.room == null )
				return false;
			int index = Array.IndexOf( this._users, user );
			if ( index < 0 )
				return false;
			this._users[index] = null;
			--this.currUserCount;
			user.room = null;
			return true;
		}

		internal RoomUser GetUserAt( int index ) => this._users[index];

		internal RoomInfo GetRoomInfo()
		{
			RoomInfo roomInfo = new RoomInfo( this.numTeam, this.numUserPerTeam, this._users );
			return roomInfo;
		}

		internal void Update( long dt )
		{
			if ( this._extendCount == this.system.maxExtendCount )
				return;
			if ( this._time >= this.system.extendInterval )
			{
				++this._extendCount;
				this._time = 0;
				this.@from -= this.system.extendRange;
				this.to += this.system.extendRange;
			}
			else
				this._time += dt;
		}

		public string Dump()
		{
			StringBuilder sb = new StringBuilder();
			sb.AppendLine( $"from:{this.@from}" );
			sb.AppendLine( $"to:{this.to}" );
			sb.AppendLine( $"extend count:{this._extendCount}" );
			sb.AppendLine( $"time:{this._time}" );
			sb.AppendLine( $"num_users:{this.currUserCount}" );
			int count = this._users.Length;
			for ( int i = 0; i < count; i++ )
			{
				RoomUser user = this._users[i];
				if ( user == null )
					continue;
				sb.AppendLine( $"#{i}" );
				sb.AppendLine( user.Dump() );
			}
			return sb.ToString();
		}
	}

	public class RoomInfo
	{
		internal RoomUser[] users;
		internal RoomUser[][] tUsers;

		internal RoomInfo( int numTeam, int numUserPerTeam, RoomUser[] users )
		{
			int numUsers = numTeam * numUserPerTeam;
			this.users = new RoomUser[numUsers];
			Array.Copy( users, this.users, numUsers );
			this.tUsers = new RoomUser[numTeam][];
			//每个队伍获得的玩家数量
			for ( int i = 0, k = 0; i < numTeam; i++ )
			{
				this.tUsers[i] = new RoomUser[numUserPerTeam];
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
				RoomUser user = this.users[i];
				if ( user == null )
					continue;
				sb.AppendLine( $"#{i}" );
				sb.AppendLine( user.Dump() );
			}
			return sb.ToString();
		}
	}
}