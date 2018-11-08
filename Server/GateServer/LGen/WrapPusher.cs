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


namespace XLua
{
    public static class WrapPusher
    {
        public static void Init()
		{
        
		}
        
		// table cast optimze
		
        
    }
	
	public class StaticLuaCallbacksEx
    {
	    internal static bool __tryArrayGet(Type type, RealStatePtr L, XLua.ObjectTranslator translator, object obj, int index)
		{
		
            return false;
		}
		
		internal static bool __tryArraySet(Type type, RealStatePtr L, XLua.ObjectTranslator translator, object obj, int array_idx, int obj_idx)
		{
		
            return false;
		}
	}
}