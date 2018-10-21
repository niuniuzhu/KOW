using System.Collections.Generic;
using Core.Misc;

namespace BattleServer.Battle
{
	public struct WaitingClient
	{
		public ulong gcNID;
		public string name;
		public int actorID;

		public WaitingClient( ulong gcNID, string name, int actorID )
		{
			this.gcNID = gcNID;
			this.name = name;
			this.actorID = actorID;
		}
	}

	/// <summary>
	/// 等待房间
	/// 该类维护BS发送来的战场信息,等待玩家连接
	/// 该类大部分方法的参数不进行合法性检测,由WaitingRoomMgr代理
	/// </summary>
	public class WaitingRoom : IPoolObject
	{
		private static uint _gid;

		public uint id { get; }

		public int mapID;
		public long timeout;

		public bool isTimeout => this._time >= this.timeout;
		public bool isAllGCConnected => this._gcNIDs.Count == 0;

		private readonly Dictionary<ulong, WaitingClient> _gcNIDs = new Dictionary<ulong, WaitingClient>();
		private readonly List<WaitingClient> _clients = new List<WaitingClient>();

		private long _time;

		public WaitingRoom()
		{
			System.Diagnostics.Debug.Assert( _gid < uint.MaxValue, "maximum id of waiting room!!" );
			this.id = _gid++;
		}

		public void Clear()
		{
			this._gcNIDs.Clear();
			this._clients.Clear();
			this._time = 0;
		}

		/// <summary>
		/// CS通知有房间完成,把客户端加入到等待列表
		/// </summary>
		public void AddClient( WaitingClient gc ) => this._gcNIDs[gc.gcNID] = gc;

		/// <summary>
		/// 客户端连接到BS后调用
		/// </summary>
		public void GCConnected( ulong gcNID )
		{
			WaitingClient gc = this._gcNIDs[gcNID];
			this._gcNIDs.Remove( gcNID );
			this._clients.Add( gc );
		}

		/// <summary>
		/// 战场开始前把所有客户端设置为已连接
		/// 通常在超时后进行该操作,即使客户端未连接也不再等待
		/// </summary>
		public void SetAllGCConnected()
		{
			if ( this._gcNIDs.Count == 0 )
				return;
			foreach ( KeyValuePair<ulong, WaitingClient> kv in this._gcNIDs )
				this._clients.Add( kv.Value );
			this._gcNIDs.Clear();
		}

		/// <summary>
		/// 获取战场描述里的玩家信息
		/// </summary>
		public List<PlayerDescript> GetPlayerDescripts()
		{
			List<PlayerDescript> playerDescripts = new List<PlayerDescript>();
			int count = this._clients.Count;
			for ( var i = 0; i < count; i++ )
			{
				WaitingClient client = this._clients[i];
				PlayerDescript playerDescript;
				playerDescript.gcNID = client.gcNID;
				playerDescript.actorID = client.actorID;
				playerDescript.name = client.name;
				playerDescripts.Add( playerDescript );
			}
			return playerDescripts;
		}

		public void Update( long dt )
		{
			this._time += dt;
		}
	}
}