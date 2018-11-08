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
    public class GateServerGSUserMgrWrap 
    {
        public static void __Register(RealStatePtr L)
        {
			ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			System.Type type = typeof(GateServer.GSUserMgr);
			Utils.BeginObjectRegister(type, L, translator, 0, 7, 1, 0);
			
			Utils.RegisterFunc(L, Utils.METHOD_IDX, "HasClient", _m_HasClient);
			Utils.RegisterFunc(L, Utils.METHOD_IDX, "GetClientSID", _m_GetClientSID);
			Utils.RegisterFunc(L, Utils.METHOD_IDX, "RemoveClient", _m_RemoveClient);
			Utils.RegisterFunc(L, Utils.METHOD_IDX, "AddClient", _m_AddClient);
			Utils.RegisterFunc(L, Utils.METHOD_IDX, "GetClients", _m_GetClients);
			Utils.RegisterFunc(L, Utils.METHOD_IDX, "ClearClients", _m_ClearClients);
			Utils.RegisterFunc(L, Utils.METHOD_IDX, "LS", _m_LS);
			
			
			Utils.RegisterFunc(L, Utils.GETTER_IDX, "count", _g_get_count);
            
			
			
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
					
					GateServer.GSUserMgr __cl_gen_ret = new GateServer.GSUserMgr();
					translator.Push(L, __cl_gen_ret);
                    
					return 1;
				}
				
			}
			catch(System.Exception __gen_e) {
				return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
			}
            return LuaAPI.luaL_error(L, "invalid arguments to GateServer.GSUserMgr constructor!");
            
        }
        
		
        
		
        
        
        
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _m_HasClient(RealStatePtr L)
        {
		    try {
            
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
            
            
                GateServer.GSUserMgr __cl_gen_to_be_invoked = (GateServer.GSUserMgr)translator.FastGetCSObj(L, 1);
            
            
                
                {
                    ulong gcNID = LuaAPI.lua_touint64(L, 2);
                    
                        bool __cl_gen_ret = __cl_gen_to_be_invoked.HasClient( gcNID );
                        LuaAPI.lua_pushboolean(L, __cl_gen_ret);
                    
                    
                    
                    return 1;
                }
                
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _m_GetClientSID(RealStatePtr L)
        {
		    try {
            
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
            
            
                GateServer.GSUserMgr __cl_gen_to_be_invoked = (GateServer.GSUserMgr)translator.FastGetCSObj(L, 1);
            
            
                
                {
                    ulong gcNID = LuaAPI.lua_touint64(L, 2);
                    uint sid;
                    
                        bool __cl_gen_ret = __cl_gen_to_be_invoked.GetClientSID( gcNID, out sid );
                        LuaAPI.lua_pushboolean(L, __cl_gen_ret);
                    LuaAPI.xlua_pushuint(L, sid);
                        
                    
                    
                    
                    return 2;
                }
                
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _m_RemoveClient(RealStatePtr L)
        {
		    try {
            
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
            
            
                GateServer.GSUserMgr __cl_gen_to_be_invoked = (GateServer.GSUserMgr)translator.FastGetCSObj(L, 1);
            
            
                
                {
                    ulong gcNID = LuaAPI.lua_touint64(L, 2);
                    
                        bool __cl_gen_ret = __cl_gen_to_be_invoked.RemoveClient( gcNID );
                        LuaAPI.lua_pushboolean(L, __cl_gen_ret);
                    
                    
                    
                    return 1;
                }
                
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _m_AddClient(RealStatePtr L)
        {
		    try {
            
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
            
            
                GateServer.GSUserMgr __cl_gen_to_be_invoked = (GateServer.GSUserMgr)translator.FastGetCSObj(L, 1);
            
            
                
                {
                    ulong gcNID = LuaAPI.lua_touint64(L, 2);
                    uint sid = LuaAPI.xlua_touint(L, 3);
                    
                    __cl_gen_to_be_invoked.AddClient( gcNID, sid );
                    
                    
                    
                    return 0;
                }
                
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _m_GetClients(RealStatePtr L)
        {
		    try {
            
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
            
            
                GateServer.GSUserMgr __cl_gen_to_be_invoked = (GateServer.GSUserMgr)translator.FastGetCSObj(L, 1);
            
            
                
                {
                    
                        uint[] __cl_gen_ret = __cl_gen_to_be_invoked.GetClients(  );
                        translator.Push(L, __cl_gen_ret);
                    
                    
                    
                    return 1;
                }
                
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _m_ClearClients(RealStatePtr L)
        {
		    try {
            
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
            
            
                GateServer.GSUserMgr __cl_gen_to_be_invoked = (GateServer.GSUserMgr)translator.FastGetCSObj(L, 1);
            
            
                
                {
                    
                    __cl_gen_to_be_invoked.ClearClients(  );
                    
                    
                    
                    return 0;
                }
                
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _m_LS(RealStatePtr L)
        {
		    try {
            
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
            
            
                GateServer.GSUserMgr __cl_gen_to_be_invoked = (GateServer.GSUserMgr)translator.FastGetCSObj(L, 1);
            
            
                
                {
                    
                        string __cl_gen_ret = __cl_gen_to_be_invoked.LS(  );
                        LuaAPI.lua_pushstring(L, __cl_gen_ret);
                    
                    
                    
                    return 1;
                }
                
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            
        }
        
        
        
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _g_get_count(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                GateServer.GSUserMgr __cl_gen_to_be_invoked = (GateServer.GSUserMgr)translator.FastGetCSObj(L, 1);
                LuaAPI.xlua_pushinteger(L, __cl_gen_to_be_invoked.count);
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 1;
        }
        
        
        
		
		
		
		
    }
}
