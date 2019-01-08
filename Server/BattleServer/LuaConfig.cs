using BattleServer.Battle;
using BattleServer.Battle.Model;
using BattleServer.Battle.Snapshot;
using BattleServer.User;
using Core.FMath;
using System;
using System.Collections.Generic;
using XLua;

namespace BattleServer
{
	public static class LuaConfig
	{
		[LuaCallCSharp]
		public static List<Type> LuaCallCSharp = new List<Type>
		{
			typeof( object ),
			typeof( FVec2 ),
			typeof( BS ),
			typeof( BSUser ),
			typeof( BSUserMgr ),
			typeof( Entity ),
			typeof( Champion ),
			typeof( SnapshotMgr ),
			typeof( FrameActionMgr ),
			typeof( BattleEndProcessor ),
			typeof( Battle.Battle ),
			typeof( BattleManager ),
		};
	}
}