using Core.Misc;
using Google.Protobuf;
using System.Collections;
using System.Text;

namespace Shared.Battle
{
	public static class Defs
	{
		private const string DEFS_MAP_PREFIX = "m";
		private const string DEFS_ENTITY_PREFIX = "e";

		private static readonly Hashtable _defs = new Hashtable();

		public static ByteString binary { get; private set; }

		public static void Load( string json )
		{
			Hashtable defs = ( Hashtable )MiniJSON.JsonDecode( json );
			_defs.Clear();
			foreach ( DictionaryEntry de in defs )
				_defs[de.Key] = de.Value;
			binary = ByteString.CopyFrom( json, Encoding.UTF8 );
		}

		public static Hashtable GetMap( int id ) => _defs.GetMap( "map" ).GetMap( DEFS_MAP_PREFIX + id );

		public static int GetMapCount() => _defs.GetMap( "map" ).Count;

		public static Hashtable GetEntity( int id ) => _defs.GetMap( "entity" ).GetMap( DEFS_ENTITY_PREFIX + id );

		public static int GetEntityCount() => _defs.GetMap( "entity" ).Count;
	}
}