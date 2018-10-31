﻿using Core.Misc;
using System.Collections;

namespace Shared.Battle
{
	public static class Defs
	{
		private const string DEFS_MAP_PREFIX = "m";
		private const string DEFS_ENTITY_PREFIX = "e";

		private static Hashtable _defs;

		public static void Init( Hashtable defs ) => _defs = defs;

		public static Hashtable GetMap( int id ) => _defs.GetMap( "map" ).GetMap( DEFS_MAP_PREFIX + id );

		public static int GetMapCount() => _defs.GetMap( "map" ).Count;

		public static Hashtable GetEntity( int id ) => _defs.GetMap( "entity" ).GetMap( DEFS_ENTITY_PREFIX + id );

		public static int GetEntityCount() => _defs.GetMap( "entity" ).Count;
	}
}