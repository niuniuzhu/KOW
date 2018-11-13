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
    public class CentralServerUserCSUserMgrWrap 
    {
        public static void __Register(RealStatePtr L)
        {
			ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			System.Type type = typeof(CentralServer.User.CSUserMgr);
			Utils.BeginObjectRegister(type, L, translator, 0, 11, 1, 0);
			
			Utils.RegisterFunc(L, Utils.METHOD_IDX, "HasUser", _m_HasUser);
			Utils.RegisterFunc(L, Utils.METHOD_IDX, "GetUser", _m_GetUser);
			Utils.RegisterFunc(L, Utils.METHOD_IDX, "GetUserByUKey", _m_GetUserByUKey);
			Utils.RegisterFunc(L, Utils.METHOD_IDX, "GetUserByGcNID", _m_GetUserByGcNID);
			Utils.RegisterFunc(L, Utils.METHOD_IDX, "CreateUser", _m_CreateUser);
			Utils.RegisterFunc(L, Utils.METHOD_IDX, "DestroyUser", _m_DestroyUser);
			Utils.RegisterFunc(L, Utils.METHOD_IDX, "Online", _m_Online);
			Utils.RegisterFunc(L, Utils.METHOD_IDX, "Offline", _m_Offline);
			Utils.RegisterFunc(L, Utils.METHOD_IDX, "KickUser", _m_KickUser);
			Utils.RegisterFunc(L, Utils.METHOD_IDX, "OnGSDisconnect", _m_OnGSDisconnect);
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
					
					CentralServer.User.CSUserMgr __cl_gen_ret = new CentralServer.User.CSUserMgr();
					translator.Push(L, __cl_gen_ret);
                    
					return 1;
				}
				
			}
			catch(System.Exception __gen_e) {
				return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
			}
            return LuaAPI.luaL_error(L, "invalid arguments to CentralServer.User.CSUserMgr constructor!");
            
        }
        
		
        
		
        
        
        
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _m_HasUser(RealStatePtr L)
        {
		    try {
            
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
            
            
                CentralServer.User.CSUserMgr __cl_gen_to_be_invoked = (CentralServer.User.CSUserMgr)translator.FastGetCSObj(L, 1);
            
            
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
                    uint ukey = LuaAPI.xlua_touint(L, 2);
                    
                        bool __cl_gen_ret = __cl_gen_to_be_invoked.HasUser( ukey );
                        LuaAPI.lua_pushboolean(L, __cl_gen_ret);
                    
                    
                    
                    return 1;
                }
                
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            
            return LuaAPI.luaL_error(L, "invalid arguments to CentralServer.User.CSUserMgr.HasUser!");
            
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _m_GetUser(RealStatePtr L)
        {
		    try {
            
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
            
            
                CentralServer.User.CSUserMgr __cl_gen_to_be_invoked = (CentralServer.User.CSUserMgr)translator.FastGetCSObj(L, 1);
            
            
			    int __gen_param_count = LuaAPI.lua_gettop(L);
            
                if(__gen_param_count == 2&& (LuaTypes.LUA_TNUMBER == LuaAPI.lua_type(L, 2) || LuaAPI.lua_isuint64(L, 2))) 
                {
                    ulong gcNID = LuaAPI.lua_touint64(L, 2);
                    
                        CentralServer.User.CSUser __cl_gen_ret = __cl_gen_to_be_invoked.GetUser( gcNID );
                        translator.Push(L, __cl_gen_ret);
                    
                    
                    
                    return 1;
                }
                if(__gen_param_count == 2&& LuaTypes.LUA_TNUMBER == LuaAPI.lua_type(L, 2)) 
                {
                    uint ukey = LuaAPI.xlua_touint(L, 2);
                    
                        CentralServer.User.CSUser __cl_gen_ret = __cl_gen_to_be_invoked.GetUser( ukey );
                        translator.Push(L, __cl_gen_ret);
                    
                    
                    
                    return 1;
                }
                
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            
            return LuaAPI.luaL_error(L, "invalid arguments to CentralServer.User.CSUserMgr.GetUser!");
            
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _m_GetUserByUKey(RealStatePtr L)
        {
		    try {
            
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
            
            
                CentralServer.User.CSUserMgr __cl_gen_to_be_invoked = (CentralServer.User.CSUserMgr)translator.FastGetCSObj(L, 1);
            
            
                
                {
                    uint ukey = LuaAPI.xlua_touint(L, 2);
                    
                        CentralServer.User.CSUser __cl_gen_ret = __cl_gen_to_be_invoked.GetUserByUKey( ukey );
                        translator.Push(L, __cl_gen_ret);
                    
                    
                    
                    return 1;
                }
                
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _m_GetUserByGcNID(RealStatePtr L)
        {
		    try {
            
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
            
            
                CentralServer.User.CSUserMgr __cl_gen_to_be_invoked = (CentralServer.User.CSUserMgr)translator.FastGetCSObj(L, 1);
            
            
                
                {
                    ulong gcNID = LuaAPI.lua_touint64(L, 2);
                    
                        CentralServer.User.CSUser __cl_gen_ret = __cl_gen_to_be_invoked.GetUserByGcNID( gcNID );
                        translator.Push(L, __cl_gen_ret);
                    
                    
                    
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
            
            
                CentralServer.User.CSUserMgr __cl_gen_to_be_invoked = (CentralServer.User.CSUserMgr)translator.FastGetCSObj(L, 1);
            
            
                
                {
                    uint ukey = LuaAPI.xlua_touint(L, 2);
                    ulong gcNID = LuaAPI.lua_touint64(L, 3);
                    
                        CentralServer.User.CSUser __cl_gen_ret = __cl_gen_to_be_invoked.CreateUser( ukey, gcNID );
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
            
            
                CentralServer.User.CSUserMgr __cl_gen_to_be_invoked = (CentralServer.User.CSUserMgr)translator.FastGetCSObj(L, 1);
            
            
                
                {
                    CentralServer.User.CSUser user = (CentralServer.User.CSUser)translator.GetObject(L, 2, typeof(CentralServer.User.CSUser));
                    
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
            
            
                CentralServer.User.CSUserMgr __cl_gen_to_be_invoked = (CentralServer.User.CSUserMgr)translator.FastGetCSObj(L, 1);
            
            
                
                {
                    ulong gcNID = LuaAPI.lua_touint64(L, 2);
                    uint sid = LuaAPI.xlua_touint(L, 3);
                    uint lid = LuaAPI.xlua_touint(L, 4);
                    
                        CentralServer.User.CSUser __cl_gen_ret = __cl_gen_to_be_invoked.Online( gcNID, sid, lid );
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
            
            
                CentralServer.User.CSUserMgr __cl_gen_to_be_invoked = (CentralServer.User.CSUserMgr)translator.FastGetCSObj(L, 1);
            
            
			    int __gen_param_count = LuaAPI.lua_gettop(L);
            
                if(__gen_param_count == 2&& (LuaTypes.LUA_TNUMBER == LuaAPI.lua_type(L, 2) || LuaAPI.lua_isuint64(L, 2))) 
                {
                    ulong gcNID = LuaAPI.lua_touint64(L, 2);
                    
                        bool __cl_gen_ret = __cl_gen_to_be_invoked.Offline( gcNID );
                        LuaAPI.lua_pushboolean(L, __cl_gen_ret);
                    
                    
                    
                    return 1;
                }
                if(__gen_param_count == 2&& translator.Assignable<CentralServer.User.CSUser>(L, 2)) 
                {
                    CentralServer.User.CSUser user = (CentralServer.User.CSUser)translator.GetObject(L, 2, typeof(CentralServer.User.CSUser));
                    
                    __cl_gen_to_be_invoked.Offline( user );
                    
                    
                    
                    return 0;
                }
                
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            
            return LuaAPI.luaL_error(L, "invalid arguments to CentralServer.User.CSUserMgr.Offline!");
            
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _m_KickUser(RealStatePtr L)
        {
		    try {
            
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
            
            
                CentralServer.User.CSUserMgr __cl_gen_to_be_invoked = (CentralServer.User.CSUserMgr)translator.FastGetCSObj(L, 1);
            
            
			    int __gen_param_count = LuaAPI.lua_gettop(L);
            
                if(__gen_param_count == 3&& (LuaTypes.LUA_TNUMBER == LuaAPI.lua_type(L, 2) || LuaAPI.lua_isuint64(L, 2))&& LuaTypes.LUA_TNUMBER == LuaAPI.lua_type(L, 3)) 
                {
                    ulong gcNID = LuaAPI.lua_touint64(L, 2);
                    int reason = LuaAPI.xlua_tointeger(L, 3);
                    
                        bool __cl_gen_ret = __cl_gen_to_be_invoked.KickUser( gcNID, reason );
                        LuaAPI.lua_pushboolean(L, __cl_gen_ret);
                    
                    
                    
                    return 1;
                }
                if(__gen_param_count == 3&& translator.Assignable<CentralServer.User.CSUser>(L, 2)&& LuaTypes.LUA_TNUMBER == LuaAPI.lua_type(L, 3)) 
                {
                    CentralServer.User.CSUser user = (CentralServer.User.CSUser)translator.GetObject(L, 2, typeof(CentralServer.User.CSUser));
                    int reason = LuaAPI.xlua_tointeger(L, 3);
                    
                    __cl_gen_to_be_invoked.KickUser( user, reason );
                    
                    
                    
                    return 0;
                }
                
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            
            return LuaAPI.luaL_error(L, "invalid arguments to CentralServer.User.CSUserMgr.KickUser!");
            
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _m_OnGSDisconnect(RealStatePtr L)
        {
		    try {
            
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
            
            
                CentralServer.User.CSUserMgr __cl_gen_to_be_invoked = (CentralServer.User.CSUserMgr)translator.FastGetCSObj(L, 1);
            
            
                
                {
                    uint gsLID = LuaAPI.xlua_touint(L, 2);
                    
                    __cl_gen_to_be_invoked.OnGSDisconnect( gsLID );
                    
                    
                    
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
            
            
                CentralServer.User.CSUserMgr __cl_gen_to_be_invoked = (CentralServer.User.CSUserMgr)translator.FastGetCSObj(L, 1);
            
            
                
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
			
                CentralServer.User.CSUserMgr __cl_gen_to_be_invoked = (CentralServer.User.CSUserMgr)translator.FastGetCSObj(L, 1);
                LuaAPI.xlua_pushinteger(L, __cl_gen_to_be_invoked.count);
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 1;
        }
        
        
        
		
		
		
		
    }
}
