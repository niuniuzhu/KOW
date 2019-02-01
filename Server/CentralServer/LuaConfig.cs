using CentralServer.Match;
using CentralServer.User;
using System;
using System.Collections.Generic;
using XLua;

namespace CentralServer
{
	public static class LuaConfig
	{
		[LuaCallCSharp]
		public static List<Type> LuaCallCSharp = new List<Type>
		{
			typeof( object ),
			typeof( CS ),
			typeof( CSUser ),
			typeof( CSUserMgr ),
			typeof( RoomPlayer ),
			typeof( Room ),
			typeof( Matcher2 ),
			typeof( BattleStaging ),
		};
	}
}