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
				
				translator.DelayWrapLoader(typeof(GateServer.GS), GateServerGSWrap.__Register);
				
				translator.DelayWrapLoader(typeof(GateServer.GSUserMgr), GateServerGSUserMgrWrap.__Register);
				
				
				
			});
		}
	}
}
