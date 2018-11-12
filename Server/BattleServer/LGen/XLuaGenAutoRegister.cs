#if USE_UNI_LUA
using LuaAPI = UniLua.Lua;
using RealStatePtr = UniLua.ILuaState;
using LuaCSFunction = UniLua.CSharpFunctionDelegate;
#else
using LuaAPI = XLua.LuaDLL.Lua;
using RealStatePtr = System.IntPtr;
using LuaCSFunction = XLua.LuaDLL.lua_CSFunction;
#endif

using System;
using System.Collections.Generic;
using System.Reflection;
using XLua.CSObjectWrap;


namespace XLua
{
    public static class XLuaGenIniterRegister
	{
	    

	    public static void Init()
        {
		    XLua.InternalGlobals.extensionMethodMap = new Dictionary<Type, IEnumerable<MethodInfo>>()
			{
			    
			};
			
			XLua.InternalGlobals.genTryArrayGetPtr = StaticLuaCallbacksEx.__tryArrayGet;
            XLua.InternalGlobals.genTryArraySetPtr = StaticLuaCallbacksEx.__tryArraySet;

		    XLua.LuaEnv.AddIniter((luaenv, translator) => {
			    
				translator.DelayWrapLoader(typeof(object), SystemObjectWrap.__Register);
				
				translator.DelayWrapLoader(typeof(Core.FMath.FVec2), CoreFMathFVec2Wrap.__Register);
				
				translator.DelayWrapLoader(typeof(BattleServer.BS), BattleServerBSWrap.__Register);
				
				translator.DelayWrapLoader(typeof(BattleServer.User.BSUser), BattleServerUserBSUserWrap.__Register);
				
				translator.DelayWrapLoader(typeof(BattleServer.User.BSUserMgr), BattleServerUserBSUserMgrWrap.__Register);
				
				translator.DelayWrapLoader(typeof(BattleServer.Battle.Model.Entity), BattleServerBattleModelEntityWrap.__Register);
				
				translator.DelayWrapLoader(typeof(BattleServer.Battle.Model.Champion), BattleServerBattleModelChampionWrap.__Register);
				
				translator.DelayWrapLoader(typeof(BattleServer.Battle.Model.Player), BattleServerBattleModelPlayerWrap.__Register);
				
				translator.DelayWrapLoader(typeof(BattleServer.Battle.Snapshot.SnapshotMgr), BattleServerBattleSnapshotSnapshotMgrWrap.__Register);
				
				translator.DelayWrapLoader(typeof(BattleServer.Battle.FrameActionMgr), BattleServerBattleFrameActionMgrWrap.__Register);
				
				translator.DelayWrapLoader(typeof(BattleServer.Battle.Battle), BattleServerBattleBattleWrap.__Register);
				
				translator.DelayWrapLoader(typeof(BattleServer.Battle.BattleManager), BattleServerBattleBattleManagerWrap.__Register);
				
				
				
			});
		}
	}
}
