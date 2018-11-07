using System.Collections.Generic;
using CentralServer.User;
using Core.Misc;

namespace CentralServer.Match
{
	/// <summary>
	/// 战场暂存区
	/// 管理进入战场的玩家
	/// </summary>
	public class BattleStaging
	{
		/// <summary>
		/// BS逻辑ID和战场ID的组合对应的玩家网络ID
		/// BS逻辑ID和战场ID可组合成唯一ID
		/// </summary>
		private readonly Dictionary<ulong, List<CSUser>> _lbIDToUser = new Dictionary<ulong, List<CSUser>>();
		/// <summary>
		/// BS逻辑ID对应的所有战场ID
		/// </summary>
		private readonly Dictionary<uint, List<uint>> _lidToBID = new Dictionary<uint, List<uint>>();

		/// <summary>
		/// 把玩家添加到暂存区
		/// </summary>
		/// <param name="user">玩家</param>
		/// <param name="lid">BS的逻辑ID</param>
		/// <param name="sid">BS的SessionID</param>
		/// <param name="bid">战场ID</param>
		public void Add( CSUser user, uint lid, uint sid, uint bid )
		{
			System.Diagnostics.Debug.Assert( !user.isInBattle, $"user:{user.gcNID} already in battle staging" );
			//记录BS sessionID
			user.EnterBattle( sid, lid );
			this._lidToBID.AddToList( lid, bid );
			this._lbIDToUser.AddToList( lid | ( ulong )bid << 32, user );
			Logger.Log( $"user:{user.gcNID} join staging. lid:{lid}, bid:{bid}" );
		}

		/// <summary>
		/// 移除指定BS里指定战场里的所有玩家
		/// </summary>
		/// <param name="lid">BS逻辑ID</param>
		/// <param name="bid">战场ID</param>
		public void Remove( uint lid, uint bid )
		{
			ulong lbID = lid | ( ulong )bid << 32;
			List<CSUser> users = this._lbIDToUser[lbID];
			int c2 = users.Count;
			for ( int j = 0; j < c2; j++ )
			{
				CSUser user = users[j];
				System.Diagnostics.Debug.Assert( user.isInBattle, $"user:{user.gcNID} not in battle staging" );
				user.LeaveBattle();
				//检查GC是否已断线
				if ( !user.isConnected )
					CS.instance.userMgr.DestroyUser( user );
				Logger.Log( $"user:{user.gcNID} leave staging. lid:{lid}, bid:{bid}" );
			}
			this._lbIDToUser.Remove( lbID );
			this._lidToBID.RemoveFromList( lid, bid );
		}

		/// <summary>
		/// 移除指定逻辑ID的BS里的所有战场里所有玩家
		/// </summary>
		public void Remove( uint lid )
		{
			if ( !this._lidToBID.TryGetValue( lid, out List<uint> bids ) )
				return;
			while ( bids.Count > 0 )
				this.Remove( lid, bids[0] );
		}
	}
}