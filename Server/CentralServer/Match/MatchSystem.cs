using Core.Misc;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;

namespace CentralServer.Match
{
	static class MatchRoomPool
	{
		private static readonly Dictionary<byte, Queue<MatchRoom>> POOL = new Dictionary<byte, Queue<MatchRoom>>();
		private const int INC = 10;

		internal static MatchRoom Pop( MatchSystem system )
		{
			Queue<MatchRoom> rooms;
			if ( !POOL.TryGetValue( system.mode, out rooms ) )
			{
				rooms = new Queue<MatchRoom>();
				POOL[system.mode] = rooms;
			}
			if ( rooms.Count == 0 )
			{
				for ( int i = 0; i < INC; i++ )
					rooms.Enqueue( new MatchRoom( system ) );
			}
			MatchRoom room = rooms.Dequeue();
			return room;
		}

		internal static void Push( MatchRoom room )
		{
			if ( !POOL.TryGetValue( room.mode, out Queue<MatchRoom> rooms ) )
				return;
			room.Clear();
			rooms.Enqueue( room );
		}
	}

	public class MatchSystem
	{
		public Action<MatchEvent.Type, MatchRoomUser, BattleUserInfo> eventHandler;
		/// <summary>
		/// 模式(高4位代表队伍数量,低4位代表每个队伍的玩家数量)
		/// </summary>
		public byte mode { get; private set; }
		/// <summary>
		/// 队伍数量
		/// </summary>
		public int numTeam { get; private set; }
		/// <summary>
		/// 每个队伍的玩家数量
		/// </summary>
		public int numUserPerTeam { get; private set; }
		/// <summary>
		/// 需要匹配的玩家数量
		/// </summary>
		public int numUsers { get; private set; }
		/// <summary>
		/// 扩展搜索的范围值
		/// </summary>
		public int extendRange { get; set; }
		/// <summary>
		/// 扩展搜索范围的间隔
		/// </summary>
		public long extendInterval { get; private set; }
		/// <summary>
		/// 搜索间隔的衰减值
		/// </summary>
		public float intervalAttenuation { get; private set; }
		/// <summary>
		/// 最大扩展次数
		/// </summary>
		public int maxExtendCount { get; private set; }

		private readonly List<MatchRoom> _rooms = new List<MatchRoom>();
		//private long _checkRoomInterval;

		public void InitFromDefs( Hashtable json )
		{
			this.mode = json.GetByte( "mode" );
			this.numTeam = this.mode >> 4;
			this.numUserPerTeam = this.mode & 0xf;
			this.numUsers = this.numTeam * this.numUserPerTeam;
			this.extendInterval = json.GetLong( "extend_interval" );
			this.intervalAttenuation = json.GetFloat( "interval_attenuation" );
			this.extendRange = json.GetInt( "extend_range" );
			this.maxExtendCount = json.GetInt( "max_extend_count" );
			//this._checkRoomInterval = json.GetLong( "check_room_interval" );
		}

		/// <summary>
		/// 玩家加入房间
		/// </summary>
		public bool Join( MatchRoomUser user )
		{
			MatchRoom room = null;
			//搜索房间
			int count = this._rooms.Count;
			for ( int i = 0; i < count; i++ )
			{
				MatchRoom r = this._rooms[i];
				if ( user.rank >= r.from &&
					 user.rank < r.to )
				{
					room = r;
					break;
				}
			}
			if ( room == null )
			{
				//创建房间
				room = MatchRoomPool.Pop( this );
				room.from = user.rank - this.extendRange;
				room.to = user.rank + this.extendRange;
				this._rooms.Add( room );
			}
			if ( !room.AddUser( user ) )
				return false;

			this.eventHandler( MatchEvent.Type.AddToRoom, user, null );
			this.eventHandler( MatchEvent.Type.RoomInfo, null, room.GetRoomInfo() );

			if ( room.isFull )
				this.OnRoomFull( room );

			return true;
		}

		/// <summary>
		/// 玩家离开房间
		/// </summary>
		public bool Leave( MatchRoomUser user )
		{
			MatchRoom room = user.room;
			if ( room == null )
				return false;
			if ( !room.RemoveUser( user ) )
				return false;
			this.eventHandler( MatchEvent.Type.RemoveFromRoom, user, null );
			this.eventHandler( MatchEvent.Type.RoomInfo, null, room.GetRoomInfo() );
			if ( room.isEmpty )
			{
				this._rooms.Remove( room );
				MatchRoomPool.Push( room );
			}
			return true;
		}

		public void Update( long dt )
		{
			int count = this._rooms.Count;
			for ( int i = 0; i < count; i++ )
				this._rooms[i].Update( dt );
		}

		public void CheckRoom()
		{
			//检查每个房间是否有可合并的玩家
			for ( int i = 0; i < this._rooms.Count - 1; i++ )
			{
				MatchRoom cur = this._rooms[i];
				for ( int j = i + 1; j < this._rooms.Count; j++ )
				{
					MatchRoom nxt = this._rooms[j];
					//先检查两个房间是否有重叠的分数区域
					//按from的大小排序
					MatchRoom r0, r1;
					if ( cur.from < nxt.from )
					{
						r0 = cur;
						r1 = nxt;
					}
					else
					{
						r0 = nxt;
						r1 = cur;
					}
					//判断重叠,注意to是闭区间
					if ( r0.to <= r1.@from )
						continue;
					//重叠
					//搜索房间玩家,符合范围的会被抢到当前房间
					for ( int k = 0; k < nxt.numUsers; ++k )
					{
						MatchRoomUser user = nxt.GetUserAt( k );
						if ( user == null )
							continue;
						//检查玩家分数是否在范围内
						if ( user.rank >= cur.@from &&
							 user.rank < cur.to )
						{
							System.Diagnostics.Debug.Assert( nxt.RemoveUser( user ) );
							System.Diagnostics.Debug.Assert( cur.AddUser( user ) );
							this.eventHandler( MatchEvent.Type.RoomInfo, null, cur.GetRoomInfo() );
							if ( nxt.isEmpty || cur.isFull )
								break;
						}
					}
					if ( nxt.isEmpty )
					{
						this._rooms.RemoveAt( j );
						MatchRoomPool.Push( nxt );
						--j;
					}
					//如果满员则不用继续往下搜索了
					if ( cur.isFull )
					{
						this.OnRoomFull( cur );
						--i;
						break;
					}
				}
			}
		}

		private void OnRoomFull( MatchRoom room )
		{
			BattleUserInfo roomInfo = room.GetRoomInfo();
			for ( int i = 0; i < room.numUsers; ++i )
			{
				MatchRoomUser user = room.GetUserAt( i );
				room.RemoveUser( user );
			}
			this._rooms.Remove( room );
			MatchRoomPool.Push( room );
			this.eventHandler( MatchEvent.Type.MatchSuccess, null, roomInfo );
		}

		public string Dump()
		{
			StringBuilder sb = new StringBuilder();
			sb.AppendLine( $"mode:{this.mode}" );
			int count = this._rooms.Count;
			sb.AppendLine( $"room count:{count}" );
			for ( int i = 0; i < count; i++ )
			{
				sb.AppendLine( $"#{i}" );
				sb.AppendLine( this._rooms[i].Dump() );
			}
			return sb.ToString();
		}
	}
}