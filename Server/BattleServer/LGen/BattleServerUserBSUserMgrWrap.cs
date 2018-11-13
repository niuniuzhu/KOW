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
    public class BattleServerUserBSUserMgrWrap 
    {
        public static void __Register(RealStatePtr L)
        {
			ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			System.Type type = typeof(BattleServer.User.BSUserMgr);
			Utils.BeginObjectRegister(type, L, translator, 0, 8, 1, 0);
			
			Utils.RegisterFunc(L, Utils.METHOD_IDX, "HasUser", _m_HasUser);
			Utils.RegisterFunc(L, Utils.METHOD_IDX, "GetUser", _m_GetUser);
			Utils.RegisterFunc(L, Utils.METHOD_IDX, "SendToUser", _m_SendToUser);
			Utils.RegisterFunc(L, Utils.METHOD_IDX, "CreateUser", _m_CreateUser);
			Utils.RegisterFunc(L, Utils.METHOD_IDX, "DestroyUser", _m_DestroyUser);
			Utils.RegisterFunc(L, Utils.METHOD_IDX, "Online", _m_Online);
			Utils.RegisterFunc(L, Utils.METHOD_IDX, "Offline", _m_Offline);
			Utils.RegisterFunc(L, Utils.METHOD_IDX, "KickUser", _m_KickUser);
			
			
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
					
					BattleServer.User.BSUserMgr __cl_gen_ret = new BattleServer.User.BSUserMgr();
					translator.Push(L, __cl_gen_ret);
                    
					return 1;
				}
				
			}
			catch(System.Exception __gen_e) {
				return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
			}
            return LuaAPI.luaL_error(L, "invalid arguments to BattleServer.User.BSUserMgr constructor!");
            
        }
        
		
        
		
        
        
        
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _m_HasUser(RealStatePtr L)
        {
		    try {
            
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
            
            
                BattleServer.User.BSUserMgr __cl_gen_to_be_invoked = (BattleServer.User.BSUserMgr)translator.FastGetCSObj(L, 1);
            
            
			    int __gen_param_count = LuaAPI.lua_gettop(L);
            
                if(__gen_param_count == 2&& (LuaTypes.LUA_TNUMBER == LuaAPI.lua_type(L, 2) || LuaAPI.lua_isuint64(L, 2))) 
                {
                    ulong gcNID = LuaAPI.lua_touint64(L, 2);
                    
                        bool __cl_gen_ret = __cl_gen_to_be_invoked.HasUser( gcNID );
                        LuaAPI.lua_pushboolean(L, __cl_gen_ret);
                    
                    
                    
                    return 1;
                }
                if(__gen_param_count == 2&& LuaTypes.LUA_TNUMBER == LuaAPI.lua_type(L, 2)) 
                {
                    uint sid = LuaAPI.xlua_touint(L, 2);
                    
                        bool __cl_gen_ret = __cl_gen_to_be_invoked.HasUser( sid );
                        LuaAPI.lua_pushboolean(L, __cl_gen_ret);
                    
                    
                    
                    return 1;
                }
                
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            
            return LuaAPI.luaL_error(L, "invalid arguments to BattleServer.User.BSUserMgr.HasUser!");
            
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _m_GetUser(RealStatePtr L)
        {
		    try {
            
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
            
            
                BattleServer.User.BSUserMgr __cl_gen_to_be_invoked = (BattleServer.User.BSUserMgr)translator.FastGetCSObj(L, 1);
            
            
			    int __gen_param_count = LuaAPI.lua_gettop(L);
            
                if(__gen_param_count == 2&& (LuaTypes.LUA_TNUMBER == LuaAPI.lua_type(L, 2) || LuaAPI.lua_isuint64(L, 2))) 
                {
                    ulong gcNID = LuaAPI.lua_touint64(L, 2);
                    
                        BattleServer.User.BSUser __cl_gen_ret = __cl_gen_to_be_invoked.GetUser( gcNID );
                        translator.Push(L, __cl_gen_ret);
                    
                    
                    
                    return 1;
                }
                if(__gen_param_count == 2&& LuaTypes.LUA_TNUMBER == LuaAPI.lua_type(L, 2)) 
                {
                    uint sid = LuaAPI.xlua_touint(L, 2);
                    
                        BattleServer.User.BSUser __cl_gen_ret = __cl_gen_to_be_invoked.GetUser( sid );
                        translator.Push(L, __cl_gen_ret);
                    
                    
                    
                    return 1;
                }
                
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            
            return LuaAPI.luaL_error(L, "invalid arguments to BattleServer.User.BSUserMgr.GetUser!");
            
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _m_SendToUser(RealStatePtr L)
        {
		    try {
            
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
            
            
                BattleServer.User.BSUserMgr __cl_gen_to_be_invoked = (BattleServer.User.BSUserMgr)translator.FastGetCSObj(L, 1);
            
            
                
                {
                    ulong gcNID = LuaAPI.lua_touint64(L, 2);
                    Google.Protobuf.IMessage message = (Google.Protobuf.IMessage)translator.GetObject(L, 3, typeof(Google.Protobuf.IMessage));
                    
                        bool __cl_gen_ret = __cl_gen_to_be_invoked.SendToUser( gcNID, message );
                        LuaAPI.lua_pushboolean(L, __cl_gen_ret);
                    
                    
                    
                    return 1;
                }
                
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _m_CreateUser(RealStatePtr L)
        {
		    try {
            
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
            
            
                BattleServer.User.BSUserMgr __cl_gen_to_be_invoked = (BattleServer.User.BSUserMgr)translator.FastGetCSObj(L, 1);
            
            
                
                {
                    ulong gcNID = LuaAPI.lua_touint64(L, 2);
                    BattleServer.Battle.Battle battle = (BattleServer.Battle.Battle)translator.GetObject(L, 3, typeof(BattleServer.Battle.Battle));
                    
                        BattleServer.User.BSUser __cl_gen_ret = __cl_gen_to_be_invoked.CreateUser( gcNID, battle );
                        translator.Push(L, __cl_gen_ret);
                    
                    
                    
                    return 1;
                }
                
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _m_DestroyUser(RealStatePtr L)
        {
		    try {
            
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
            
            
                BattleServer.User.BSUserMgr __cl_gen_to_be_invoked = (BattleServer.User.BSUserMgr)translator.FastGetCSObj(L, 1);
            
            
                
                {
                    BattleServer.User.BSUser user = (BattleServer.User.BSUser)translator.GetObject(L, 2, typeof(BattleServer.User.BSUser));
                    
                    __cl_gen_to_be_invoked.DestroyUser( user );
                    
                    
                    
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
            
            
                BattleServer.User.BSUserMgr __cl_gen_to_be_invoked = (BattleServer.User.BSUserMgr)translator.FastGetCSObj(L, 1);
            
            
                
                {
                    ulong gcNID = LuaAPI.lua_touint64(L, 2);
                    uint sid = LuaAPI.xlua_touint(L, 3);
                    
                        BattleServer.User.BSUser __cl_gen_ret = __cl_gen_to_be_invoked.Online( gcNID, sid );
                        translator.Push(L, __cl_gen_ret);
                    
                    
                    
                    return 1;
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
            
            
                BattleServer.User.BSUserMgr __cl_gen_to_be_invoked = (BattleServer.User.BSUserMgr)translator.FastGetCSObj(L, 1);
            
            
                
                {
                    BattleServer.User.BSUser user = (BattleServer.User.BSUser)translator.GetObject(L, 2, typeof(BattleServer.User.BSUser));
                    
                    __cl_gen_to_be_invoked.Offline( user );
                    
                    
                    
                    return 0;
                }
                
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _m_KickUser(RealStatePtr L)
        {
		    try {
            
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
            
            
                BattleServer.User.BSUserMgr __cl_gen_to_be_invoked = (BattleServer.User.BSUserMgr)translator.FastGetCSObj(L, 1);
            
            
                
                {
                    BattleServer.User.BSUser user = (BattleServer.User.BSUser)translator.GetObject(L, 2, typeof(BattleServer.User.BSUser));
                    string reason = LuaAPI.lua_tostring(L, 3);
                    
                    __cl_gen_to_be_invoked.KickUser( user, reason );
                    
                    
                    
                    return 0;
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
			
                BattleServer.User.BSUserMgr __cl_gen_to_be_invoked = (BattleServer.User.BSUserMgr)translator.FastGetCSObj(L, 1);
                LuaAPI.xlua_pushinteger(L, __cl_gen_to_be_invoked.count);
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 1;
        }
        
        
        
		
		
		
		
    }
}
