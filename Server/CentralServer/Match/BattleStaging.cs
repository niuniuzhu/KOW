using System.Collections.Generic;
using CentralServer.User;
using Core.Misc;

namespace CentralServer.Match
{
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

		public void Add( uint lid, uint sid, uint bid, CSUser user )
		{
			//记录BS sessionID
			user.bsSID = sid;
			//设置玩家为战场状态
			user.state = CSUser.State.Battle;
			//记录玩家登录BS的网络ID
			user.gcbsNID = user.ukey | ( ulong ) lid << 32;
			this._lidToBID.AddToList( lid, bid );
			this._lbIDToUser.AddToList( lid | ( ulong ) bid << 32, user );
			Logger.Log( $"user:{user.gcNID} join staging. lid:{lid}, bid:{bid}" );
		}

		/// <summary>
		/// 移除指定BS里指定战场里的所有玩家
		/// </summary>
		/// <param name="lid">BS逻辑ID</param>
		/// <param name="bid">战场ID</param>
		public void Remove( uint lid, uint bid )
		{
			ulong lbID = lid | ( ulong ) bid << 32;
			List<CSUser> users = this._lbIDToUser[lbID];
			int c2 = users.Count;
			for ( int j = 0; j < c2; j++ )
			{
				CSUser user = users[j];
				user.bsSID = 0;
				user.gcbsNID = 0;
				user.state = CSUser.State.Idle;
				Logger.Log( $"user:{user.gcNID} leave staging. lid:{lid}, bid:{bid}" );
			}
			this._lbIDToUser.Remove( lbID );
		}

		/// <summary>
		/// 移除指定逻辑ID的BS里的所有玩家
		/// </summary>
		public void Remove( uint lid )
		{
			if ( !this._lidToBID.TryGetValue( lid, out List<uint> bids ) )
				return;
			int count = bids.Count;
			for ( int i = 0; i < count; i++ )
			{
				uint bid = bids[i];
				this.Remove( lid, bid );
			}
		}
	}
}