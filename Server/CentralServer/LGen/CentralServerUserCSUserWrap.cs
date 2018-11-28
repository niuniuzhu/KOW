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
    public class CentralServerUserCSUserWrap 
    {
        public static void __Register(RealStatePtr L)
        {
			ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			System.Type type = typeof(CentralServer.User.CSUser);
			Utils.BeginObjectRegister(type, L, translator, 0, 8, 11, 1);
			
			Utils.RegisterFunc(L, Utils.METHOD_IDX, "Send", _m_Send);
			Utils.RegisterFunc(L, Utils.METHOD_IDX, "CanOffline", _m_CanOffline);
			Utils.RegisterFunc(L, Utils.METHOD_IDX, "OnCreate", _m_OnCreate);
			Utils.RegisterFunc(L, Utils.METHOD_IDX, "Online", _m_Online);
			Utils.RegisterFunc(L, Utils.METHOD_IDX, "Offline", _m_Offline);
			Utils.RegisterFunc(L, Utils.METHOD_IDX, "EnterBattle", _m_EnterBattle);
			Utils.RegisterFunc(L, Utils.METHOD_IDX, "LeaveBattle", _m_LeaveBattle);
			Utils.RegisterFunc(L, Utils.METHOD_IDX, "ToString", _m_ToString);
			
			
			Utils.RegisterFunc(L, Utils.GETTER_IDX, "ukey", _g_get_ukey);
            Utils.RegisterFunc(L, Utils.GETTER_IDX, "gcNID", _g_get_gcNID);
            Utils.RegisterFunc(L, Utils.GETTER_IDX, "isConnected", _g_get_isConnected);
            Utils.RegisterFunc(L, Utils.GETTER_IDX, "gsSID", _g_get_gsSID);
            Utils.RegisterFunc(L, Utils.GETTER_IDX, "gsLID", _g_get_gsLID);
            Utils.RegisterFunc(L, Utils.GETTER_IDX, "loginTime", _g_get_loginTime);
            Utils.RegisterFunc(L, Utils.GETTER_IDX, "bsSID", _g_get_bsSID);
            Utils.RegisterFunc(L, Utils.GETTER_IDX, "bsLID", _g_get_bsLID);
            Utils.RegisterFunc(L, Utils.GETTER_IDX, "bid", _g_get_bid);
            Utils.RegisterFunc(L, Utils.GETTER_IDX, "isInBattle", _g_get_isInBattle);
            Utils.RegisterFunc(L, Utils.GETTER_IDX, "name", _g_get_name);
            
			Utils.RegisterFunc(L, Utils.SETTER_IDX, "name", _s_set_name);
            
			
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
					
					CentralServer.User.CSUser __cl_gen_ret = new CentralServer.User.CSUser();
					translator.Push(L, __cl_gen_ret);
                    
					return 1;
				}
				
			}
			catch(System.Exception __gen_e) {
				return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
			}
            return LuaAPI.luaL_error(L, "invalid arguments to CentralServer.User.CSUser constructor!");
            
        }
        
		
        
		
        
        
        
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _m_Send(RealStatePtr L)
        {
		    try {
            
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
            
            
                CentralServer.User.CSUser __cl_gen_to_be_invoked = (CentralServer.User.CSUser)translator.FastGetCSObj(L, 1);
            
            
                
                {
                    Google.Protobuf.IMessage msg = (Google.Protobuf.IMessage)translator.GetObject(L, 2, typeof(Google.Protobuf.IMessage));
                    
                    __cl_gen_to_be_invoked.Send( msg );
                    
                    
                    
                    return 0;
                }
                
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _m_CanOffline(RealStatePtr L)
        {
		    try {
            
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
            
            
                CentralServer.User.CSUser __cl_gen_to_be_invoked = (CentralServer.User.CSUser)translator.FastGetCSObj(L, 1);
            
            
                
                {
                    
                        bool __cl_gen_ret = __cl_gen_to_be_invoked.CanOffline(  );
                        LuaAPI.lua_pushboolean(L, __cl_gen_ret);
                    
                    
                    
                    return 1;
                }
                
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _m_OnCreate(RealStatePtr L)
        {
		    try {
            
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
            
            
                CentralServer.User.CSUser __cl_gen_to_be_invoked = (CentralServer.User.CSUser)translator.FastGetCSObj(L, 1);
            
            
                
                {
                    uint ukey = LuaAPI.xlua_touint(L, 2);
                    ulong gcNID = LuaAPI.lua_touint64(L, 3);
                    long loginTime = LuaAPI.lua_toint64(L, 4);
                    
                    __cl_gen_to_be_invoked.OnCreate( ukey, gcNID, loginTime );
                    
                    
                    
                    return 0;
                }
                
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _m_Online(RealStatePtr L)
        {
		    try {
            
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
            
            
                CentralServer.User.CSUser __cl_gen_to_be_invoked = (CentralServer.User.CSUser)translator.FastGetCSObj(L, 1);
            
            
                
                {
                    uint sid = LuaAPI.xlua_touint(L, 2);
                    uint lid = LuaAPI.xlua_touint(L, 3);
                    
                    __cl_gen_to_be_invoked.Online( sid, lid );
                    
                    
                    
                    return 0;
                }
                
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _m_Offline(RealStatePtr L)
        {
		    try {
            
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
            
            
                CentralServer.User.CSUser __cl_gen_to_be_invoked = (CentralServer.User.CSUser)translator.FastGetCSObj(L, 1);
            
            
                
                {
                    
                    __cl_gen_to_be_invoked.Offline(  );
                    
                    
                    
                    return 0;
                }
                
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _m_EnterBattle(RealStatePtr L)
        {
		    try {
            
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
            
            
                CentralServer.User.CSUser __cl_gen_to_be_invoked = (CentralServer.User.CSUser)translator.FastGetCSObj(L, 1);
            
            
                
                {
                    uint bsSID = LuaAPI.xlua_touint(L, 2);
                    uint bsLID = LuaAPI.xlua_touint(L, 3);
                    uint bid = LuaAPI.xlua_touint(L, 4);
                    
                    __cl_gen_to_be_invoked.EnterBattle( bsSID, bsLID, bid );
                    
                    
                    
                    return 0;
                }
                
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _m_LeaveBattle(RealStatePtr L)
        {
		    try {
            
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
            
            
                CentralServer.User.CSUser __cl_gen_to_be_invoked = (CentralServer.User.CSUser)translator.FastGetCSObj(L, 1);
            
            
                
                {
                    
                    __cl_gen_to_be_invoked.LeaveBattle(  );
                    
                    
                    
                    return 0;
                }
                
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _m_ToString(RealStatePtr L)
        {
		    try {
            
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
            
            
                CentralServer.User.CSUser __cl_gen_to_be_invoked = (CentralServer.User.CSUser)translator.FastGetCSObj(L, 1);
            
            
                
                {
                    
                        string __cl_gen_ret = __cl_gen_to_be_invoked.ToString(  );
                        LuaAPI.lua_pushstring(L, __cl_gen_ret);
                    
                    
                    
                    return 1;
                }
                
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            
        }
        
        
        
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _g_get_ukey(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                CentralServer.User.CSUser __cl_gen_to_be_invoked = (CentralServer.User.CSUser)translator.FastGetCSObj(L, 1);
                LuaAPI.xlua_pushuint(L, __cl_gen_to_be_invoked.ukey);
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 1;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _g_get_gcNID(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                CentralServer.User.CSUser __cl_gen_to_be_invoked = (CentralServer.User.CSUser)translator.FastGetCSObj(L, 1);
                LuaAPI.lua_pushuint64(L, __cl_gen_to_be_invoked.gcNID);
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 1;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _g_get_isConnected(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                CentralServer.User.CSUser __cl_gen_to_be_invoked = (CentralServer.User.CSUser)translator.FastGetCSObj(L, 1);
                LuaAPI.lua_pushboolean(L, __cl_gen_to_be_invoked.isConnected);
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 1;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _g_get_gsSID(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                CentralServer.User.CSUser __cl_gen_to_be_invoked = (CentralServer.User.CSUser)translator.FastGetCSObj(L, 1);
                LuaAPI.xlua_pushuint(L, __cl_gen_to_be_invoked.gsSID);
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 1;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _g_get_gsLID(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                CentralServer.User.CSUser __cl_gen_to_be_invoked = (CentralServer.User.CSUser)translator.FastGetCSObj(L, 1);
                LuaAPI.xlua_pushuint(L, __cl_gen_to_be_invoked.gsLID);
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 1;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _g_get_loginTime(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                CentralServer.User.CSUser __cl_gen_to_be_invoked = (CentralServer.User.CSUser)translator.FastGetCSObj(L, 1);
                LuaAPI.lua_pushint64(L, __cl_gen_to_be_invoked.loginTime);
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 1;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _g_get_bsSID(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                CentralServer.User.CSUser __cl_gen_to_be_invoked = (CentralServer.User.CSUser)translator.FastGetCSObj(L, 1);
                LuaAPI.xlua_pushuint(L, __cl_gen_to_be_invoked.bsSID);
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 1;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _g_get_bsLID(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                CentralServer.User.CSUser __cl_gen_to_be_invoked = (CentralServer.User.CSUser)translator.FastGetCSObj(L, 1);
                LuaAPI.xlua_pushuint(L, __cl_gen_to_be_invoked.bsLID);
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 1;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _g_get_bid(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                CentralServer.User.CSUser __cl_gen_to_be_invoked = (CentralServer.User.CSUser)translator.FastGetCSObj(L, 1);
                LuaAPI.xlua_pushuint(L, __cl_gen_to_be_invoked.bid);
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 1;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _g_get_isInBattle(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                CentralServer.User.CSUser __cl_gen_to_be_invoked = (CentralServer.User.CSUser)translator.FastGetCSObj(L, 1);
                LuaAPI.lua_pushboolean(L, __cl_gen_to_be_invoked.isInBattle);
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 1;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _g_get_name(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                CentralServer.User.CSUser __cl_gen_to_be_invoked = (CentralServer.User.CSUser)translator.FastGetCSObj(L, 1);
                LuaAPI.lua_pushstring(L, __cl_gen_to_be_invoked.name);
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 1;
        }
        
        
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _s_set_name(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                CentralServer.User.CSUser __cl_gen_to_be_invoked = (CentralServer.User.CSUser)translator.FastGetCSObj(L, 1);
                __cl_gen_to_be_invoked.name = LuaAPI.lua_tostring(L, 2);
            
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 0;
        }
        
		
		
		
		
    }
}
