using Core.Misc;
using Shared;
using System.Collections.Generic;

namespace CentralServer
{
	/// <summary>
	/// 登陆凭证类
	/// 当GC丢失时,凭证可以不主动移除,该类有超时机制
	/// 凭证由GC登陆LS时产生,当GC登陆CS时需要验证是否合法登陆,如果凭证存在(GC丢失时不会马上移除凭证)则更新登陆时间即可
	/// 通常需要主动移除凭证是由于玩家顶号登陆
	/// </summary>
	public class LoginCertificate
	{
		class Entry
		{
			public readonly uint ukey;
			public ulong gcNID;
			public long loginTime;

			public Entry( uint ukey )
			{
				this.ukey = ukey;
			}
		}

		private readonly Dictionary<ulong, Entry> _gcNIDToEntry = new Dictionary<ulong, Entry>();
		private readonly Dictionary<ulong, Entry> _ukeyToEntry = new Dictionary<ulong, Entry>();
		private readonly List<Entry> _entries = new List<Entry>();

		public uint GetUKey( ulong gcNID ) => this._gcNIDToEntry[gcNID].ukey;

		public bool Check( ulong gcNID ) => this._gcNIDToEntry.ContainsKey( gcNID );

		public ErrorCode Add( ulong gcNID, uint ukey )
		{
			//检查gcNID是否重复
			if ( this._gcNIDToEntry.ContainsKey( gcNID ) )
			{
				Logger.Warn( $"duplicate gcNID:{gcNID}" );
				return ErrorCode.DuplicateGCNID;
			}
			//检查entry是否存在
			if ( !this._ukeyToEntry.TryGetValue( ukey, out Entry entry ) )
			{
				entry = new Entry( ukey );
				this._ukeyToEntry[ukey] = entry;
				this._entries.Add( entry );
			}
			//更新网络ID
			entry.gcNID = gcNID;
			//更新登陆时间
			entry.loginTime = TimeUtils.utcTime;
			this._gcNIDToEntry[gcNID] = entry;
			return ErrorCode.Success;
		}

		/// <summary>
		/// 移除凭证
		/// 通常由于玩家顶号登陆后才会主动调用此方法
		/// </summary>
		public bool Remove( ulong gcNID )
		{
			if ( !this._gcNIDToEntry.TryGetValue( gcNID, out Entry entry ) )
			{
				Logger.Warn( $"invalid gcNID:{gcNID} to remove" );
				return false;
			}
			this._gcNIDToEntry.Remove( gcNID );
			this._ukeyToEntry.Remove( entry.ukey );
			this._entries.Remove( entry );
			return true;
		}

		/// <summary>
		/// 检查过期的凭证
		/// </summary>
		private void CheckExpired()
		{
			long currTime = TimeUtils.utcTime;
			long expTime = CS.instance.config.sessionExpTime;
			for ( int i = 0, count = this._entries.Count; i < count; ++i )
			{
				Entry entry = this._entries[i];
				if ( currTime < entry.loginTime + expTime )
					continue;
				//移除超时
				this._gcNIDToEntry.Remove( entry.gcNID );
				this._ukeyToEntry.Remove( entry.ukey );
				this._entries.RemoveAt( i );
				--i;
				--count;
			}
		}

		public void OnHeartBeat()
		{
			this.CheckExpired();
		}
	}
}