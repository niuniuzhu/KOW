using System.Collections.Generic;
using System.Linq;
using System.Text;
using Core.Misc;

namespace GateServer
{
	public class GSUserMgr
	{
		private readonly Dictionary<ulong, uint> _gcNIDToSID = new Dictionary<ulong, uint>();
		private readonly Dictionary<uint, ulong> _sIDToGcNID = new Dictionary<uint, ulong>();

		/// <summary>
		/// 客户端数量
		/// </summary>
		public int count => this._gcNIDToSID.Count;

		/// <summary>
		/// 是否存在指定gcNID的客户端
		/// </summary>
		public bool HasClient( ulong gcNID ) => this._gcNIDToSID.ContainsKey( gcNID );

		/// <summary>
		/// 是否存在指定SessionID的客户端
		/// </summary>
		public bool HasClient( uint sid ) => this._sIDToGcNID.ContainsKey( sid );

		/// <summary>
		/// 获取指定gcNID的SessionID
		/// </summary>
		public bool GetSID( ulong gcNID, out uint sid ) => this._gcNIDToSID.TryGetValue( gcNID, out sid );

		/// <summary>
		/// 获取指定SessionID的gcNID
		/// </summary>
		public bool GetGcNID( uint sid, out ulong gcNID ) => this._sIDToGcNID.TryGetValue( sid, out gcNID );

		/// <summary>
		/// 按指定gcNID移除客户端
		/// </summary>
		internal bool RemoveClient( ulong gcNID )
		{
			if ( !this._gcNIDToSID.TryGetValue( gcNID, out uint sid ) )
				return false;
			this._sIDToGcNID.Remove( sid );
			this._gcNIDToSID.Remove( gcNID );
			Logger.Log( $"destroy client:{gcNID}" );
			return true;
		}

		/// <summary>
		/// 添加客户端
		/// </summary>
		internal void AddClient( ulong gcNID, uint sid )
		{
			this._gcNIDToSID.Add( gcNID, sid );
			this._sIDToGcNID.Add( sid, gcNID );
			Logger.Info( $"client:{gcNID} was created" );
		}

		/// <summary>
		/// 获取客户端的SessionID列表
		/// </summary>
		public uint[] GetClients() => this._gcNIDToSID.Values.ToArray();

		/// <summary>
		/// 清空客户端信息
		/// </summary>
		internal void ClearClients()
		{
			this._gcNIDToSID.Clear();
			this._sIDToGcNID.Clear();
		}

		/// <summary>
		/// 以字符串的形式返回玩家信息
		/// </summary>
		public string LS()
		{
			StringBuilder sb = new StringBuilder();
			foreach ( var kv in this._gcNIDToSID )
				sb.AppendLine( $"{kv.Key}:{kv.Value}" );
			return sb.ToString();
		}
	}
}