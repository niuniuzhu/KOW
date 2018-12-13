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
    public class CentralServerMatchBattleStagingWrap 
    {
        public static void __Register(RealStatePtr L)
        {
			ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			System.Type type = typeof(CentralServer.Match.BattleStaging);
			Utils.BeginObjectRegister(type, L, translator, 0, 8, 0, 0);
			
			Utils.RegisterFunc(L, Utils.METHOD_IDX, "OnBattleCreated", _m_OnBattleCreated);
			Utils.RegisterFunc(L, Utils.METHOD_IDX, "OnBattleDestory", _m_OnBattleDestory);
			Utils.RegisterFunc(L, Utils.METHOD_IDX, "ListALLLBIDToUser", _m_ListALLLBIDToUser);
			Utils.RegisterFunc(L, Utils.METHOD_IDX, "ListLBIDToUser", _m_ListLBIDToUser);
			Utils.RegisterFunc(L, Utils.METHOD_IDX, "GetNumUsersByLBID", _m_GetNumUsersByLBID);
			Utils.RegisterFunc(L, Utils.METHOD_IDX, "ListALLLIDToBID", _m_ListALLLIDToBID);
			Utils.RegisterFunc(L, Utils.METHOD_IDX, "ListLIDToBID", _m_ListLIDToBID);
			Utils.RegisterFunc(L, Utils.METHOD_IDX, "GetNumBattlesByLID", _m_GetNumBattlesByLID);
			
			
			
			
			
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
					
					CentralServer.Match.BattleStaging __cl_gen_ret = new CentralServer.Match.BattleStaging();
					translator.Push(L, __cl_gen_ret);
                    
					return 1;
				}
				
			}
			catch(System.Exception __gen_e) {
				return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
			}
            return LuaAPI.luaL_error(L, "invalid arguments to CentralServer.Match.BattleStaging constructor!");
            
        }
        
		
        
		
        
        
        
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _m_OnBattleCreated(RealStatePtr L)
        {
		    try {
            
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
            
            
                CentralServer.Match.BattleStaging __cl_gen_to_be_invoked = (CentralServer.Match.BattleStaging)translator.FastGetCSObj(L, 1);
            
            
                
                {
                    uint lid = LuaAPI.xlua_touint(L, 2);
                    uint bid = LuaAPI.xlua_touint(L, 3);
                    
                    __cl_gen_to_be_invoked.OnBattleCreated( lid, bid );
                    
                    
                    
                    return 0;
                }
                
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _m_OnBattleDestory(RealStatePtr L)
        {
		    try {
            
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
            
            
                CentralServer.Match.BattleStaging __cl_gen_to_be_invoked = (CentralServer.Match.BattleStaging)translator.FastGetCSObj(L, 1);
            
            
                
                {
                    uint lid = LuaAPI.xlua_touint(L, 2);
                    uint bid = LuaAPI.xlua_touint(L, 3);
                    
                    __cl_gen_to_be_invoked.OnBattleDestory( lid, bid );
                    
                    
                    
                    return 0;
                }
                
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _m_ListALLLBIDToUser(RealStatePtr L)
        {
		    try {
            
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
            
            
                CentralServer.Match.BattleStaging __cl_gen_to_be_invoked = (CentralServer.Match.BattleStaging)translator.FastGetCSObj(L, 1);
            
            
                
                {
                    
                        string __cl_gen_ret = __cl_gen_to_be_invoked.ListALLLBIDToUser(  );
                        LuaAPI.lua_pushstring(L, __cl_gen_ret);
                    
                    
                    
                    return 1;
                }
                
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _m_ListLBIDToUser(RealStatePtr L)
        {
		    try {
            
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
            
            
                CentralServer.Match.BattleStaging __cl_gen_to_be_invoked = (CentralServer.Match.BattleStaging)translator.FastGetCSObj(L, 1);
            
            
                
                {
                    uint lid = LuaAPI.xlua_touint(L, 2);
                    uint bid = LuaAPI.xlua_touint(L, 3);
                    
                        string __cl_gen_ret = __cl_gen_to_be_invoked.ListLBIDToUser( lid, bid );
                        LuaAPI.lua_pushstring(L, __cl_gen_ret);
                    
                    
                    
                    return 1;
                }
                
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _m_GetNumUsersByLBID(RealStatePtr L)
        {
		    try {
            
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
            
            
                CentralServer.Match.BattleStaging __cl_gen_to_be_invoked = (CentralServer.Match.BattleStaging)translator.FastGetCSObj(L, 1);
            
            
                
                {
                    uint lid = LuaAPI.xlua_touint(L, 2);
                    uint bid = LuaAPI.xlua_touint(L, 3);
                    
                        int __cl_gen_ret = __cl_gen_to_be_invoked.GetNumUsersByLBID( lid, bid );
                        LuaAPI.xlua_pushinteger(L, __cl_gen_ret);
                    
                    
                    
                    return 1;
                }
                
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _m_ListALLLIDToBID(RealStatePtr L)
        {
		    try {
            
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
            
            
                CentralServer.Match.BattleStaging __cl_gen_to_be_invoked = (CentralServer.Match.BattleStaging)translator.FastGetCSObj(L, 1);
            
            
                
                {
                    
                        string __cl_gen_ret = __cl_gen_to_be_invoked.ListALLLIDToBID(  );
                        LuaAPI.lua_pushstring(L, __cl_gen_ret);
                    
                    
                    
                    return 1;
                }
                
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _m_ListLIDToBID(RealStatePtr L)
        {
		    try {
            
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
            
            
                CentralServer.Match.BattleStaging __cl_gen_to_be_invoked = (CentralServer.Match.BattleStaging)translator.FastGetCSObj(L, 1);
            
            
                
                {
                    uint lid = LuaAPI.xlua_touint(L, 2);
                    
                        string __cl_gen_ret = __cl_gen_to_be_invoked.ListLIDToBID( lid );
                        LuaAPI.lua_pushstring(L, __cl_gen_ret);
                    
                    
                    
                    return 1;
                }
                
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _m_GetNumBattlesByLID(RealStatePtr L)
        {
		    try {
            
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
            
            
                CentralServer.Match.BattleStaging __cl_gen_to_be_invoked = (CentralServer.Match.BattleStaging)translator.FastGetCSObj(L, 1);
            
            
                
                {
                    uint lid = LuaAPI.xlua_touint(L, 2);
                    
                        int __cl_gen_ret = __cl_gen_to_be_invoked.GetNumBattlesByLID( lid );
                        LuaAPI.xlua_pushinteger(L, __cl_gen_ret);
                    
                    
                    
                    return 1;
                }
                
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            
        }
        
        
        
        
        
        
		
		
		
		
    }
}
