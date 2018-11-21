using System;
using System.Collections.Generic;
using Core.FMath;

namespace BattleServer.Battle.Model
{
	public enum Attr
	{
		MHP,
		HP,
		MMP,
		MP,
		ATK,
		DEF,
		MOVE_SPEED,
	}

	/// <summary>
	/// 属性管理器
	/// </summary>
	public class Attribute
	{
		private readonly SortedDictionary<Attr, Fix64> _map = new SortedDictionary<Attr, Fix64>();

		public int count => this._map.Count;

		/// <summary>
		/// 遍历属性
		/// </summary>
		/// <param name="handler">回调函数</param>
		public void Foreach( Action<Attr, Fix64> handler )
		{
			foreach ( KeyValuePair<Attr, Fix64> kv in this._map )
				handler( kv.Key, kv.Value );
		}

		/// <summary>
		/// 设置属性值
		/// </summary>
		public void Set( Attr attr, Fix64 value ) => this._map[attr] = value;

		/// <summary>
		/// 获取属性值
		/// </summary>
		public Fix64 Get( Attr attr )
		{
			this._map.TryGetValue( attr, out Fix64 value );
			return value;
		}

		/// <summary>
		/// 是否存在指定属性
		/// </summary>
		public bool Contains( Attr attr ) => this._map.ContainsKey( attr );

		public void Add( Attr attr, Fix64 delta )
		{
			this._map.TryGetValue( attr, out Fix64 value );
			this._map[attr] = value + delta;
		}

		public void Sub( Attr attr, Fix64 delta )
		{
			this._map.TryGetValue( attr, out Fix64 value );
			this._map[attr] = value - delta;
		}

		public void Mul( Attr attr, Fix64 factor )
		{
			this._map.TryGetValue( attr, out Fix64 value );
			this._map[attr] = value * factor;
		}

		public void Div( Attr attr, Fix64 factor )
		{
			this._map.TryGetValue( attr, out Fix64 value );
			this._map[attr] = value / factor;
		}

		public void Mod( Attr attr, Fix64 mod )
		{
			this._map.TryGetValue( attr, out Fix64 value );
			this._map[attr] = Fix64.FastMod( value, mod );
		}

		public void Pow( Attr attr, Fix64 exp )
		{
			this._map.TryGetValue( attr, out Fix64 value );
			this._map[attr] = Fix64.Pow( value, exp );
		}

		public void Abs( Attr attr )
		{
			this._map.TryGetValue( attr, out Fix64 value );
			this._map[attr] = Fix64.FastAbs( value );
		}

		public void Sin( Attr attr )
		{
			this._map.TryGetValue( attr, out Fix64 value );
			this._map[attr] = Fix64.FastSin( value );
		}
	}
}