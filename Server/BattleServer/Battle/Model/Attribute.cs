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
		TURN_SPEED
	}

	public class Attribute
	{
		private readonly Dictionary<Attr, Fix64> _map = new Dictionary<Attr, Fix64>();

		public void Foreach( Action<Attr, Fix64> handler )
		{
			foreach ( KeyValuePair<Attr, Fix64> kv in this._map )
				handler( kv.Key, kv.Value );
		}

		public void Set( Attr attr, Fix64 value ) => this._map[attr] = value;

		public Fix64 Get( Attr attr )
		{
			this._map.TryGetValue( attr, out Fix64 value );
			return value;
		}

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