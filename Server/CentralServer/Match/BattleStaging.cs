using CentralServer.User;
using Core.Misc;
using System.Collections.Generic;
using System.Text;

namespace CentralServer.Match
{
	/// <summary>
	/// 战场暂存区
	/// 管理进入战场的玩家
	/// </summary>
	public class BattleStaging
	{
		/// <summary>
		/// BS逻辑ID和战场ID的组合对应的玩家
		/// BS逻辑ID和战场ID可组合成唯一ID
		/// </summary>
		private readonly Dictionary<ulong, List<CSUser>> _lbIDToUser = new Dictionary<ulong, List<CSUser>>();
		/// <summary>
		/// BS逻辑ID对应的所有战场ID
		/// </summary>
		private readonly Dictionary<uint, List<uint>> _lidToBID = new Dictionary<uint, List<uint>>();

		public void OnBattleCreated( uint lid, uint bid ) => this._lidToBID.AddToList( lid, bid );

		public void OnBattleDestory( uint lid, uint bid ) => this._lidToBID.RemoveFromList( lid, bid );

		/// <summary>
		/// 把玩家添加到暂存区
		/// </summary>
		/// <param name="user">玩家</param>
		/// <param name="lid">BS的逻辑ID</param>
		/// <param name="sid">BS的SessionID</param>
		/// <param name="bid">战场ID</param>
		internal void Add( CSUser user, uint lid, uint sid, uint bid )
		{
			System.Diagnostics.Debug.Assert( !user.isInBattle, $"user:{user.gcNID} already in battle staging" );
			//记录BS sessionID
			user.EnterBattle( sid, lid, bid );
			this._lbIDToUser.AddToList( lid | ( ulong )bid << 32, user );
			Logger.Log( $"user:{user.gcNID} join staging. lid:{lid}, bid:{bid}" );
		}

		/// <summary>
		/// 移除指定bsgcNID的玩家
		/// </summary>
		internal void Remove( ulong bsgcNID )
		{
			uint ukey = ( uint )( bsgcNID & uint.MaxValue );
			CSUser user = CS.instance.userMgr.GetUser( ukey );
			if ( user == null )
				return;
			ulong lbID = user.bsLID | ( ulong )user.bid << 32;
			user.LeaveBattle();
			Logger.Log( $"user:{user.gcNID} leave staging. lid:{user.bsLID}, bid:{user.bid}" );
			//检查GC是否已断线
			if ( !user.isConnected )
				CS.instance.userMgr.DestroyUser( user );
			this._lbIDToUser.Remove( lbID );
		}

		/// <summary>
		/// 移除指定BS里指定战场里的所有玩家
		/// </summary>
		/// <param name="lid">BS逻辑ID</param>
		/// <param name="bid">战场ID</param>
		internal void Remove( uint lid, uint bid )
		{
			ulong lbID = lid | ( ulong )bid << 32;
			List<CSUser> users = this._lbIDToUser[lbID];
			int c2 = users.Count;
			for ( int i = 0; i < c2; i++ )
			{
				CSUser user = users[i];
				System.Diagnostics.Debug.Assert( user.isInBattle, $"user:{user.gcNID} not in battle staging" );
				user.LeaveBattle();
				Logger.Log( $"user:{user.gcNID} leave staging. lid:{lid}, bid:{bid}" );
				//检查GC是否已断线
				if ( !user.isConnected )
					CS.instance.userMgr.DestroyUser( user );
			}
			this._lbIDToUser.Remove( lbID );
			this.OnBattleDestory( lid, bid );
		}

		/// <summary>
		/// 移除指定逻辑ID的BS里的所有战场里所有玩家
		/// </summary>
		internal void Remove( uint lid )
		{
			if ( !this._lidToBID.TryGetValue( lid, out List<uint> bids ) )
				return;
			while ( bids.Count > 0 )
				this.Remove( lid, bids[0] );
		}

		/// <summary>
		/// 获取指定BS逻辑ID的指定BID的所有玩家的sid
		/// </summary>
		internal List<uint> GetUserSIDs( uint lid, uint bid )
		{
			List<uint> sids = new List<uint>();
			ulong lbID = lid | ( ulong )bid << 32;
			List<CSUser> users = this._lbIDToUser[lbID];
			int c2 = users.Count;
			for ( int i = 0; i < c2; i++ )
			{
				CSUser user = users[i];
				if ( !user.isConnected )
					continue;
				sids.Add( user.gsSID );
			}
			return sids;
		}

		/// <summary>
		/// 获取指定BS逻辑ID的指定BID的所有玩家
		/// </summary>
		internal List<CSUser> GetUsers( uint lid, uint bid )
		{
			List<CSUser> users = new List<CSUser>();
			ulong lbID = lid | ( ulong )bid << 32;
			users.AddRange( this._lbIDToUser[lbID] );
			return users;
		}

		/// <summary>
		/// 获取指定BS逻辑ID的所有玩家
		/// </summary>
		internal List<uint> GetUserSIDs( uint lid )
		{
			if ( !this._lidToBID.TryGetValue( lid, out List<uint> bids ) )
				return null;
			if ( bids.Count == 0 )
				return null;
			List<uint> sids = new List<uint>();
			int count = bids.Count;
			for ( int i = 0; i < count; i++ )
			{
				ulong lbID = lid | ( ulong )bids[i] << 32;
				List<CSUser> users = this._lbIDToUser[lbID];
				int c2 = users.Count;
				for ( int j = 0; j < c2; j++ )
				{
					CSUser user = users[j];
					if ( !user.isConnected )
						continue;
					sids.Add( user.gsSID );
				}
			}
			return sids;
		}

		/// <summary>
		/// 获取指定BS逻辑ID的所有玩家
		/// </summary>
		internal List<CSUser> GetUsers( uint lid )
		{
			if ( !this._lidToBID.TryGetValue( lid, out List<uint> bids ) )
				return null;
			if ( bids.Count == 0 )
				return null;
			List<CSUser> users = new List<CSUser>();
			int count = bids.Count;
			for ( int i = 0; i < count; i++ )
			{
				ulong lbID = lid | ( ulong )bids[i] << 32;
				users.AddRange( this._lbIDToUser[lbID] );
			}
			return users;
		}

		/// <summary>
		/// 以字符串形式返回所有BS逻辑ID和战场ID的组合对应玩家的关系
		/// </summary>
		public string ListALLLBIDToUser()
		{
			StringBuilder sb = new StringBuilder();
			foreach ( var kv in this._lbIDToUser )
			{
				sb.AppendLine( kv.Key.ToString() );
				List<CSUser> users = kv.Value;
				foreach ( CSUser user in users )
					sb.AppendLine( $"\t{user}" );
			}
			return sb.ToString();
		}

		/// <summary>
		/// 以字符串形式返回BS逻辑ID和战场ID的组合对应玩家的关系
		/// </summary>
		public string ListLBIDToUser( uint lid, uint bid )
		{
			ulong lbID = lid | ( ulong )bid << 32;
			if ( !this._lbIDToUser.TryGetValue( lbID, out List<CSUser> users ) )
				return string.Empty;
			StringBuilder sb = new StringBuilder();
			foreach ( CSUser user in users )
				sb.AppendLine( user.ToString() );
			return sb.ToString();
		}

		/// <summary>
		/// 返回BS逻辑ID和战场ID的组合对应的玩家数量
		/// </summary>
		public int GetNumUsersByLBID( uint lid, uint bid )
		{
			ulong lbID = lid | ( ulong )bid << 32;
			if ( !this._lbIDToUser.TryGetValue( lbID, out List<CSUser> users ) )
				return -1;
			return users.Count;
		}

		/// <summary>
		/// 以字符串格式返回所有BS逻辑ID和战场ID的对应关系
		/// </summary>
		public string ListALLLIDToBID()
		{
			StringBuilder sb = new StringBuilder();
			foreach ( var kv in this._lidToBID )
			{
				sb.AppendLine( kv.Key.ToString() );
				List<uint> bids = kv.Value;
				foreach ( uint bid in bids )
					sb.AppendLine( $"\t{bid}" );
			}
			return sb.ToString();
		}

		/// <summary>
		/// 以字符串的形式返回指定lid下的战场ID
		/// </summary>
		public string ListLIDToBID( uint lid )
		{
			if ( !this._lidToBID.TryGetValue( lid, out List<uint> bids ) )
				return string.Empty;
			StringBuilder sb = new StringBuilder();
			foreach ( uint bid in bids )
				sb.AppendLine( bid.ToString() );
			return sb.ToString();
		}

		/// <summary>
		/// 获取指定逻辑ID的BS对应的战场数量
		/// </summary>
		public int GetNumBattlesByLID( uint lid )
		{
			if ( !this._lidToBID.TryGetValue( lid, out List<uint> bids ) )
				return -1;
			return bids.Count;
		}
	}
}