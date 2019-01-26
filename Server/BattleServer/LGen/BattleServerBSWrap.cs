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
    public class BattleServerBSWrap 
    {
        public static void __Register(RealStatePtr L)
        {
			ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			System.Type type = typeof(BattleServer.BS);
			Utils.BeginObjectRegister(type, L, translator, 0, 5, 6, 1);
			
			Utils.RegisterFunc(L, Utils.METHOD_IDX, "Initialize", _m_Initialize);
			Utils.RegisterFunc(L, Utils.METHOD_IDX, "Start", _m_Start);
			Utils.RegisterFunc(L, Utils.METHOD_IDX, "Update", _m_Update);
			Utils.RegisterFunc(L, Utils.METHOD_IDX, "Dispose", _m_Dispose);
			Utils.RegisterFunc(L, Utils.METHOD_IDX, "ReloadDefs", _m_ReloadDefs);
			
			
			Utils.RegisterFunc(L, Utils.GETTER_IDX, "config", _g_get_config);
            Utils.RegisterFunc(L, Utils.GETTER_IDX, "netSessionMgr", _g_get_netSessionMgr);
            Utils.RegisterFunc(L, Utils.GETTER_IDX, "bizProcessor", _g_get_bizProcessor);
            Utils.RegisterFunc(L, Utils.GETTER_IDX, "battleMgr", _g_get_battleManager);
            Utils.RegisterFunc(L, Utils.GETTER_IDX, "userMgr", _g_get_userMgr);
            Utils.RegisterFunc(L, Utils.GETTER_IDX, "state", _g_get_state);
            
			Utils.RegisterFunc(L, Utils.SETTER_IDX, "state", _s_set_state);
            
			
			Utils.EndObjectRegister(type, L, translator, null, null,
			    null, null, null);

		    Utils.BeginClassRegister(type, L, __CreateInstance, 1, 1, 0);
			
			
            
			Utils.RegisterFunc(L, Utils.CLS_GETTER_IDX, "instance", _g_get_instance);
            
			
			
			Utils.EndClassRegister(type, L, translator);
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int __CreateInstance(RealStatePtr L)
        {
            
			try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
				if(LuaAPI.lua_gettop(L) == 1)
				{
					
					BattleServer.BS __cl_gen_ret = new BattleServer.BS();
					translator.Push(L, __cl_gen_ret);
                    
					return 1;
				}
				
			}
			catch(System.Exception __gen_e) {
				return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
			}
            return LuaAPI.luaL_error(L, "invalid arguments to BattleServer.BS constructor!");
            
        }
        
		
        
		
        
        
        
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _m_Initialize(RealStatePtr L)
        {
		    try {
            
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
            
            
                BattleServer.BS __cl_gen_to_be_invoked = (BattleServer.BS)translator.FastGetCSObj(L, 1);
            
            
                
                {
                    BattleServer.Options opts = (BattleServer.Options)translator.GetObject(L, 2, typeof(BattleServer.Options));
                    
                        Shared.ErrorCode __cl_gen_ret = __cl_gen_to_be_invoked.Initialize( opts );
                        translator.Push(L, __cl_gen_ret);
                    
                    
                    
                    return 1;
                }
                
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _m_Start(RealStatePtr L)
        {
		    try {
            
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
            
            
                BattleServer.BS __cl_gen_to_be_invoked = (BattleServer.BS)translator.FastGetCSObj(L, 1);
            
            
                
                {
                    
                        Shared.ErrorCode __cl_gen_ret = __cl_gen_to_be_invoked.Start(  );
                        translator.Push(L, __cl_gen_ret);
                    
                    
                    
                    return 1;
                }
                
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _m_Update(RealStatePtr L)
        {
		    try {
            
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
            
            
                BattleServer.BS __cl_gen_to_be_invoked = (BattleServer.BS)translator.FastGetCSObj(L, 1);
            
            
                
                {
                    long elapsed = LuaAPI.lua_toint64(L, 2);
                    long dt = LuaAPI.lua_toint64(L, 3);
                    
                    __cl_gen_to_be_invoked.Update( elapsed, dt );
                    
                    
                    
                    return 0;
                }
                
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _m_Dispose(RealStatePtr L)
        {
		    try {
            
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
            
            
                BattleServer.BS __cl_gen_to_be_invoked = (BattleServer.BS)translator.FastGetCSObj(L, 1);
            
            
                
                {
                    
                    __cl_gen_to_be_invoked.Dispose(  );
                    
                    
                    
                    return 0;
                }
                
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _m_ReloadDefs(RealStatePtr L)
        {
		    try {
            
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
            
            
                BattleServer.BS __cl_gen_to_be_invoked = (BattleServer.BS)translator.FastGetCSObj(L, 1);
            
            
                
                {
                    
                    __cl_gen_to_be_invoked.ReloadDefs(  );
                    
                    
                    
                    return 0;
                }
                
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            
        }
        
        
        
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _g_get_instance(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			    translator.Push(L, BattleServer.BS.instance);
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 1;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _g_get_config(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.BS __cl_gen_to_be_invoked = (BattleServer.BS)translator.FastGetCSObj(L, 1);
                translator.Push(L, __cl_gen_to_be_invoked.config);
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 1;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _g_get_netSessionMgr(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.BS __cl_gen_to_be_invoked = (BattleServer.BS)translator.FastGetCSObj(L, 1);
                translator.Push(L, __cl_gen_to_be_invoked.netSessionMgr);
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 1;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _g_get_bizProcessor(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.BS __cl_gen_to_be_invoked = (BattleServer.BS)translator.FastGetCSObj(L, 1);
                translator.Push(L, __cl_gen_to_be_invoked.bizProcessor);
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 1;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _g_get_battleManager(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.BS __cl_gen_to_be_invoked = (BattleServer.BS)translator.FastGetCSObj(L, 1);
                translator.Push(L, __cl_gen_to_be_invoked.battleMgr);
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 1;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _g_get_userMgr(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.BS __cl_gen_to_be_invoked = (BattleServer.BS)translator.FastGetCSObj(L, 1);
                translator.Push(L, __cl_gen_to_be_invoked.userMgr);
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 1;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _g_get_state(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.BS __cl_gen_to_be_invoked = (BattleServer.BS)translator.FastGetCSObj(L, 1);
                translator.Push(L, __cl_gen_to_be_invoked.state);
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 1;
        }
        
        
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _s_set_state(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.BS __cl_gen_to_be_invoked = (BattleServer.BS)translator.FastGetCSObj(L, 1);
                BattleServer.BSConfig.State __cl_gen_value;translator.Get(L, 2, out __cl_gen_value);
				__cl_gen_to_be_invoked.state = __cl_gen_value;
            
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 0;
        }
        
		
		
		
		
    }
}
