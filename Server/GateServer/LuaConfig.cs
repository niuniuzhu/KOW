using System;
using System.Collections.Generic;
using XLua;

namespace GateServer
{
	public static class LuaConfig
	{
		[LuaCallCSharp]
		public static List<Type> LuaCallCSharp = new List<Type>
		{
			typeof( object ),
			typeof( GS ),
			typeof( GSUserMgr )
		};
	}
}