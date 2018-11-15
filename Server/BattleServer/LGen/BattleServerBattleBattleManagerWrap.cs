﻿#if USE_UNI_LUA
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
    public class BattleServerBattleBattleManagerWrap 
    {
        public static void __Register(RealStatePtr L)
        {
			ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			System.Type type = typeof(BattleServer.Battle.BattleManager);
			Utils.BeginObjectRegister(type, L, translator, 0, 5, 1, 0);
			
			Utils.RegisterFunc(L, Utils.METHOD_IDX, "GetValidedBattle", _m_GetValidedBattle);
			Utils.RegisterFunc(L, Utils.METHOD_IDX, "CreateBattle", _m_CreateBattle);
			Utils.RegisterFunc(L, Utils.METHOD_IDX, "StopAllBattles", _m_StopAllBattles);
			Utils.RegisterFunc(L, Utils.METHOD_IDX, "GetBattleAt", _m_GetBattleAt);
			Utils.RegisterFunc(L, Utils.METHOD_IDX, "ListBids", _m_ListBids);
			
			
			Utils.RegisterFunc(L, Utils.GETTER_IDX, "numBattles", _g_get_numBattles);
            
			
			
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
					
					BattleServer.Battle.BattleManager __cl_gen_ret = new BattleServer.Battle.BattleManager();
					translator.Push(L, __cl_gen_ret);
                    
					return 1;
				}
				
			}
			catch(System.Exception __gen_e) {
				return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
			}
            return LuaAPI.luaL_error(L, "invalid arguments to BattleServer.Battle.BattleManager constructor!");
            
        }
        
		
        
		
        
        
        
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _m_GetValidedBattle(RealStatePtr L)
        {
		    try {
            
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
            
            
                BattleServer.Battle.BattleManager __cl_gen_to_be_invoked = (BattleServer.Battle.BattleManager)translator.FastGetCSObj(L, 1);
            
            
                
                {
                    ulong gcNID = LuaAPI.lua_touint64(L, 2);
                    
                        BattleServer.Battle.Battle __cl_gen_ret = __cl_gen_to_be_invoked.GetValidedBattle( gcNID );
                        translator.Push(L, __cl_gen_ret);
                    
                    
                    
                    return 1;
                }
                
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _m_CreateBattle(RealStatePtr L)
        {
		    try {
            
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
            
            
                BattleServer.Battle.BattleManager __cl_gen_to_be_invoked = (BattleServer.Battle.BattleManager)translator.FastGetCSObj(L, 1);
            
            
                
                {
                    Protos.CS2BS_BattleInfo battleInfo = (Protos.CS2BS_BattleInfo)translator.GetObject(L, 2, typeof(Protos.CS2BS_BattleInfo));
                    uint bid;
                    
                        Shared.ErrorCode __cl_gen_ret = __cl_gen_to_be_invoked.CreateBattle( battleInfo, out bid );
                        translator.Push(L, __cl_gen_ret);
                    LuaAPI.xlua_pushuint(L, bid);
                        
                    
                    
                    
                    return 2;
                }
                
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _m_StopAllBattles(RealStatePtr L)
        {
		    try {
            
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
            
            
                BattleServer.Battle.BattleManager __cl_gen_to_be_invoked = (BattleServer.Battle.BattleManager)translator.FastGetCSObj(L, 1);
            
            
                
                {
                    
                    __cl_gen_to_be_invoked.StopAllBattles(  );
                    
                    
                    
                    return 0;
                }
                
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _m_GetBattleAt(RealStatePtr L)
        {
		    try {
            
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
            
            
                BattleServer.Battle.BattleManager __cl_gen_to_be_invoked = (BattleServer.Battle.BattleManager)translator.FastGetCSObj(L, 1);
            
            
                
                {
                    int index = LuaAPI.xlua_tointeger(L, 2);
                    
                        BattleServer.Battle.Battle __cl_gen_ret = __cl_gen_to_be_invoked.GetBattleAt( index );
                        translator.Push(L, __cl_gen_ret);
                    
                    
                    
                    return 1;
                }
                
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _m_ListBids(RealStatePtr L)
        {
		    try {
            
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
            
            
                BattleServer.Battle.BattleManager __cl_gen_to_be_invoked = (BattleServer.Battle.BattleManager)translator.FastGetCSObj(L, 1);
            
            
                
                {
                    
                        string __cl_gen_ret = __cl_gen_to_be_invoked.ListBids(  );
                        LuaAPI.lua_pushstring(L, __cl_gen_ret);
                    
                    
                    
                    return 1;
                }
                
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            
        }
        
        
        
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _g_get_numBattles(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.Battle.BattleManager __cl_gen_to_be_invoked = (BattleServer.Battle.BattleManager)translator.FastGetCSObj(L, 1);
                LuaAPI.xlua_pushinteger(L, __cl_gen_to_be_invoked.numBattles);
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 1;
        }
        
        
        
		
		
		
		
    }
}