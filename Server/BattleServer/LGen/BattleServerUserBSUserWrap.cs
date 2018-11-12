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
    public class BattleServerUserBSUserWrap 
    {
        public static void __Register(RealStatePtr L)
        {
			ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			System.Type type = typeof(BattleServer.User.BSUser);
			Utils.BeginObjectRegister(type, L, translator, 0, 3, 4, 0);
			
			Utils.RegisterFunc(L, Utils.METHOD_IDX, "Send", _m_Send);
			Utils.RegisterFunc(L, Utils.METHOD_IDX, "Online", _m_Online);
			Utils.RegisterFunc(L, Utils.METHOD_IDX, "Offline", _m_Offline);
			
			
			Utils.RegisterFunc(L, Utils.GETTER_IDX, "gcSID", _g_get_gcSID);
            Utils.RegisterFunc(L, Utils.GETTER_IDX, "isOnline", _g_get_isOnline);
            Utils.RegisterFunc(L, Utils.GETTER_IDX, "gcNID", _g_get_gcNID);
            Utils.RegisterFunc(L, Utils.GETTER_IDX, "battle", _g_get_battle);
            
			
			
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
				if(LuaAPI.lua_gettop(L) == 3 && (LuaTypes.LUA_TNUMBER == LuaAPI.lua_type(L, 2) || LuaAPI.lua_isuint64(L, 2)) && translator.Assignable<BattleServer.Battle.Battle>(L, 3))
				{
					ulong gcNID = LuaAPI.lua_touint64(L, 2);
					BattleServer.Battle.Battle battle = (BattleServer.Battle.Battle)translator.GetObject(L, 3, typeof(BattleServer.Battle.Battle));
					
					BattleServer.User.BSUser __cl_gen_ret = new BattleServer.User.BSUser(gcNID, battle);
					translator.Push(L, __cl_gen_ret);
                    
					return 1;
				}
				
			}
			catch(System.Exception __gen_e) {
				return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
			}
            return LuaAPI.luaL_error(L, "invalid arguments to BattleServer.User.BSUser constructor!");
            
        }
        
		
        
		
        
        
        
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _m_Send(RealStatePtr L)
        {
		    try {
            
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
            
            
                BattleServer.User.BSUser __cl_gen_to_be_invoked = (BattleServer.User.BSUser)translator.FastGetCSObj(L, 1);
            
            
                
                {
                    Google.Protobuf.IMessage msg = (Google.Protobuf.IMessage)translator.GetObject(L, 2, typeof(Google.Protobuf.IMessage));
                    
                        bool __cl_gen_ret = __cl_gen_to_be_invoked.Send( msg );
                        LuaAPI.lua_pushboolean(L, __cl_gen_ret);
                    
                    
                    
                    return 1;
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
            
            
                BattleServer.User.BSUser __cl_gen_to_be_invoked = (BattleServer.User.BSUser)translator.FastGetCSObj(L, 1);
            
            
                
                {
                    uint gcSID = LuaAPI.xlua_touint(L, 2);
                    
                    __cl_gen_to_be_invoked.Online( gcSID );
                    
                    
                    
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
            
            
                BattleServer.User.BSUser __cl_gen_to_be_invoked = (BattleServer.User.BSUser)translator.FastGetCSObj(L, 1);
            
            
                
                {
                    
                    __cl_gen_to_be_invoked.Offline(  );
                    
                    
                    
                    return 0;
                }
                
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            
        }
        
        
        
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _g_get_gcSID(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.User.BSUser __cl_gen_to_be_invoked = (BattleServer.User.BSUser)translator.FastGetCSObj(L, 1);
                LuaAPI.xlua_pushuint(L, __cl_gen_to_be_invoked.gcSID);
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 1;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _g_get_isOnline(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.User.BSUser __cl_gen_to_be_invoked = (BattleServer.User.BSUser)translator.FastGetCSObj(L, 1);
                LuaAPI.lua_pushboolean(L, __cl_gen_to_be_invoked.isOnline);
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
			
                BattleServer.User.BSUser __cl_gen_to_be_invoked = (BattleServer.User.BSUser)translator.FastGetCSObj(L, 1);
                LuaAPI.lua_pushuint64(L, __cl_gen_to_be_invoked.gcNID);
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 1;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _g_get_battle(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.User.BSUser __cl_gen_to_be_invoked = (BattleServer.User.BSUser)translator.FastGetCSObj(L, 1);
                translator.Push(L, __cl_gen_to_be_invoked.battle);
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 1;
        }
        
        
        
		
		
		
		
    }
}
