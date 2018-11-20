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
    public class CentralServerCSWrap 
    {
        public static void __Register(RealStatePtr L)
        {
			ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			System.Type type = typeof(CentralServer.CS);
			Utils.BeginObjectRegister(type, L, translator, 0, 7, 12, 0);
			
			Utils.RegisterFunc(L, Utils.METHOD_IDX, "Initialize", _m_Initialize);
			Utils.RegisterFunc(L, Utils.METHOD_IDX, "Start", _m_Start);
			Utils.RegisterFunc(L, Utils.METHOD_IDX, "Update", _m_Update);
			Utils.RegisterFunc(L, Utils.METHOD_IDX, "Dispose", _m_Dispose);
			Utils.RegisterFunc(L, Utils.METHOD_IDX, "UpdateAppropriateGSInfo", _m_UpdateAppropriateGSInfo);
			Utils.RegisterFunc(L, Utils.METHOD_IDX, "UpdateAppropriateBSInfo", _m_UpdateAppropriateBSInfo);
			Utils.RegisterFunc(L, Utils.METHOD_IDX, "ReloadDefs", _m_ReloadDefs);
			
			
			Utils.RegisterFunc(L, Utils.GETTER_IDX, "config", _g_get_config);
            Utils.RegisterFunc(L, Utils.GETTER_IDX, "dbConfig", _g_get_dbConfig);
            Utils.RegisterFunc(L, Utils.GETTER_IDX, "appropriateGSInfo", _g_get_appropriateGSInfo);
            Utils.RegisterFunc(L, Utils.GETTER_IDX, "appropriateBSInfo", _g_get_appropriateBSInfo);
            Utils.RegisterFunc(L, Utils.GETTER_IDX, "netSessionMgr", _g_get_netSessionMgr);
            Utils.RegisterFunc(L, Utils.GETTER_IDX, "redisWrapper", _g_get_redisWrapper);
            Utils.RegisterFunc(L, Utils.GETTER_IDX, "bizProcessor", _g_get_bizProcessor);
            Utils.RegisterFunc(L, Utils.GETTER_IDX, "userMgr", _g_get_userMgr);
            Utils.RegisterFunc(L, Utils.GETTER_IDX, "matcher", _g_get_matcher);
            Utils.RegisterFunc(L, Utils.GETTER_IDX, "battleStaging", _g_get_battleStaging);
            Utils.RegisterFunc(L, Utils.GETTER_IDX, "lIDToGSInfos", _g_get_lIDToGSInfos);
            Utils.RegisterFunc(L, Utils.GETTER_IDX, "lIDToBSInfos", _g_get_lIDToBSInfos);
            
			
			
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
					
					CentralServer.CS __cl_gen_ret = new CentralServer.CS();
					translator.Push(L, __cl_gen_ret);
                    
					return 1;
				}
				
			}
			catch(System.Exception __gen_e) {
				return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
			}
            return LuaAPI.luaL_error(L, "invalid arguments to CentralServer.CS constructor!");
            
        }
        
		
        
		
        
        
        
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _m_Initialize(RealStatePtr L)
        {
		    try {
            
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
            
            
                CentralServer.CS __cl_gen_to_be_invoked = (CentralServer.CS)translator.FastGetCSObj(L, 1);
            
            
                
                {
                    CentralServer.Options opts = (CentralServer.Options)translator.GetObject(L, 2, typeof(CentralServer.Options));
                    
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
            
            
                CentralServer.CS __cl_gen_to_be_invoked = (CentralServer.CS)translator.FastGetCSObj(L, 1);
            
            
                
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
            
            
                CentralServer.CS __cl_gen_to_be_invoked = (CentralServer.CS)translator.FastGetCSObj(L, 1);
            
            
                
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
            
            
                CentralServer.CS __cl_gen_to_be_invoked = (CentralServer.CS)translator.FastGetCSObj(L, 1);
            
            
                
                {
                    
                    __cl_gen_to_be_invoked.Dispose(  );
                    
                    
                    
                    return 0;
                }
                
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _m_UpdateAppropriateGSInfo(RealStatePtr L)
        {
		    try {
            
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
            
            
                CentralServer.CS __cl_gen_to_be_invoked = (CentralServer.CS)translator.FastGetCSObj(L, 1);
            
            
                
                {
                    
                    __cl_gen_to_be_invoked.UpdateAppropriateGSInfo(  );
                    
                    
                    
                    return 0;
                }
                
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _m_UpdateAppropriateBSInfo(RealStatePtr L)
        {
		    try {
            
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
            
            
                CentralServer.CS __cl_gen_to_be_invoked = (CentralServer.CS)translator.FastGetCSObj(L, 1);
            
            
                
                {
                    
                    __cl_gen_to_be_invoked.UpdateAppropriateBSInfo(  );
                    
                    
                    
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
            
            
                CentralServer.CS __cl_gen_to_be_invoked = (CentralServer.CS)translator.FastGetCSObj(L, 1);
            
            
                
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
			    translator.Push(L, CentralServer.CS.instance);
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
			
                CentralServer.CS __cl_gen_to_be_invoked = (CentralServer.CS)translator.FastGetCSObj(L, 1);
                translator.Push(L, __cl_gen_to_be_invoked.config);
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 1;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _g_get_dbConfig(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                CentralServer.CS __cl_gen_to_be_invoked = (CentralServer.CS)translator.FastGetCSObj(L, 1);
                translator.Push(L, __cl_gen_to_be_invoked.dbConfig);
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 1;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _g_get_appropriateGSInfo(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                CentralServer.CS __cl_gen_to_be_invoked = (CentralServer.CS)translator.FastGetCSObj(L, 1);
                translator.Push(L, __cl_gen_to_be_invoked.appropriateGSInfo);
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 1;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _g_get_appropriateBSInfo(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                CentralServer.CS __cl_gen_to_be_invoked = (CentralServer.CS)translator.FastGetCSObj(L, 1);
                translator.Push(L, __cl_gen_to_be_invoked.appropriateBSInfo);
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
			
                CentralServer.CS __cl_gen_to_be_invoked = (CentralServer.CS)translator.FastGetCSObj(L, 1);
                translator.Push(L, __cl_gen_to_be_invoked.netSessionMgr);
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 1;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _g_get_redisWrapper(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                CentralServer.CS __cl_gen_to_be_invoked = (CentralServer.CS)translator.FastGetCSObj(L, 1);
                translator.Push(L, __cl_gen_to_be_invoked.redisWrapper);
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
			
                CentralServer.CS __cl_gen_to_be_invoked = (CentralServer.CS)translator.FastGetCSObj(L, 1);
                translator.Push(L, __cl_gen_to_be_invoked.bizProcessor);
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
			
                CentralServer.CS __cl_gen_to_be_invoked = (CentralServer.CS)translator.FastGetCSObj(L, 1);
                translator.Push(L, __cl_gen_to_be_invoked.userMgr);
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 1;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _g_get_matcher(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                CentralServer.CS __cl_gen_to_be_invoked = (CentralServer.CS)translator.FastGetCSObj(L, 1);
                translator.Push(L, __cl_gen_to_be_invoked.matcher);
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 1;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _g_get_battleStaging(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                CentralServer.CS __cl_gen_to_be_invoked = (CentralServer.CS)translator.FastGetCSObj(L, 1);
                translator.Push(L, __cl_gen_to_be_invoked.battleStaging);
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 1;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _g_get_lIDToGSInfos(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                CentralServer.CS __cl_gen_to_be_invoked = (CentralServer.CS)translator.FastGetCSObj(L, 1);
                translator.Push(L, __cl_gen_to_be_invoked.lIDToGSInfos);
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 1;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _g_get_lIDToBSInfos(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                CentralServer.CS __cl_gen_to_be_invoked = (CentralServer.CS)translator.FastGetCSObj(L, 1);
                translator.Push(L, __cl_gen_to_be_invoked.lIDToBSInfos);
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 1;
        }
        
        
        
		
		
		
		
    }
}
