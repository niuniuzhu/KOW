#if USE_UNI_LUA
using LuaAPI = UniLua.Lua;
using RealStatePtr = UniLua.ILuaState;
using LuaCSFunction = UniLua.CSharpFunctionDelegate;
#else
using LuaAPI = XLua.LuaDLL.Lua;
using RealStatePtr = System.IntPtr;
using LuaCSFunction = XLua.LuaDLL.lua_CSFunction;
#endif

using XLua;
using System.Collections.Generic;


namespace XLua.CSObjectWrap
{
    using Utils = XLua.Utils;
    public class CentralServerMatchMatcherWrap 
    {
        public static void __Register(RealStatePtr L)
        {
			ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			System.Type type = typeof(CentralServer.Match.Matcher);
			Utils.BeginObjectRegister(type, L, translator, 0, 3, 1, 0);
			
			Utils.RegisterFunc(L, Utils.METHOD_IDX, "ContainsUser", _m_ContainsUser);
			Utils.RegisterFunc(L, Utils.METHOD_IDX, "OnUserKicked", _m_OnUserKicked);
			Utils.RegisterFunc(L, Utils.METHOD_IDX, "BeginMatch", _m_BeginMatch);
			
			
			Utils.RegisterFunc(L, Utils.GETTER_IDX, "numOpenRooms", _g_get_numOpenRooms);
            
			
			
			Utils.EndObjectRegister(type, L, translator, null, null,
			    null, null, null);

		    Utils.BeginClassRegister(type, L, __CreateInstance, 1, 0, 0);
			
			
            
			
			
			
			Utils.EndClassRegister(type, L, translator);
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int __CreateInstance(RealStatePtr L)
        {
            
			try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
				if(LuaAPI.lua_gettop(L) == 1)
				{
					
					CentralServer.Match.Matcher __cl_gen_ret = new CentralServer.Match.Matcher();
					translator.Push(L, __cl_gen_ret);
                    
					return 1;
				}
				
			}
			catch(System.Exception __gen_e) {
				return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
			}
            return LuaAPI.luaL_error(L, "invalid arguments to CentralServer.Match.Matcher constructor!");
            
        }
        
		
        
		
        
        
        
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _m_ContainsUser(RealStatePtr L)
        {
		    try {
            
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
            
            
                CentralServer.Match.Matcher __cl_gen_to_be_invoked = (CentralServer.Match.Matcher)translator.FastGetCSObj(L, 1);
            
            
                
                {
                    CentralServer.User.CSUser user = (CentralServer.User.CSUser)translator.GetObject(L, 2, typeof(CentralServer.User.CSUser));
                    
                        bool __cl_gen_ret = __cl_gen_to_be_invoked.ContainsUser( user );
                        LuaAPI.lua_pushboolean(L, __cl_gen_ret);
                    
                    
                    
                    return 1;
                }
                
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _m_OnUserKicked(RealStatePtr L)
        {
		    try {
            
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
            
            
                CentralServer.Match.Matcher __cl_gen_to_be_invoked = (CentralServer.Match.Matcher)translator.FastGetCSObj(L, 1);
            
            
                
                {
                    CentralServer.User.CSUser user = (CentralServer.User.CSUser)translator.GetObject(L, 2, typeof(CentralServer.User.CSUser));
                    
                    __cl_gen_to_be_invoked.OnUserKicked( user );
                    
                    
                    
                    return 0;
                }
                
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _m_BeginMatch(RealStatePtr L)
        {
		    try {
            
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
            
            
                CentralServer.Match.Matcher __cl_gen_to_be_invoked = (CentralServer.Match.Matcher)translator.FastGetCSObj(L, 1);
            
            
                
                {
                    Shared.Net.NetSessionBase session = (Shared.Net.NetSessionBase)translator.GetObject(L, 2, typeof(Shared.Net.NetSessionBase));
                    Protos.GC2CS_BeginMatch beginMatch = (Protos.GC2CS_BeginMatch)translator.GetObject(L, 3, typeof(Protos.GC2CS_BeginMatch));
                    
                    __cl_gen_to_be_invoked.BeginMatch( session, beginMatch );
                    
                    
                    
                    return 0;
                }
                
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            
        }
        
        
        
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _g_get_numOpenRooms(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                CentralServer.Match.Matcher __cl_gen_to_be_invoked = (CentralServer.Match.Matcher)translator.FastGetCSObj(L, 1);
                LuaAPI.xlua_pushinteger(L, __cl_gen_to_be_invoked.numOpenRooms);
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 1;
        }
        
        
        
		
		
		
		
    }
}
