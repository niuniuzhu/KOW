﻿#if USE_UNI_LUA
using LuaAPI = UniLua.Lua;
using RealStatePtr = UniLua.ILuaState;
using LuaCSFunction = UniLua.CSharpFunctionDelegate;
#else
using LuaAPI = XLua.LuaDLL.Lua;
using RealStatePtr = System.IntPtr;
using LuaCSFunction = XLua.LuaDLL.lua_CSFunction;
#endif

using System;


namespace XLua
{
    public static class DelegatesGensBridge
    {
		
        
		public static void Init()
		{
		    DelegateBridge.Gen_Flag = true;

			DelegateBridgeBase.getDelegateByTypeHook = ( d, type ) =>
			{
			
				return null;
			};
		}
	}
}