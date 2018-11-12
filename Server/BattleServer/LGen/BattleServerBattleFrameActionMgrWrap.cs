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
    public class BattleServerBattleFrameActionMgrWrap 
    {
        public static void __Register(RealStatePtr L)
        {
			ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			System.Type type = typeof(BattleServer.Battle.FrameActionMgr);
			Utils.BeginObjectRegister(type, L, translator, 0, 4, 1, 0);
			
			Utils.RegisterFunc(L, Utils.METHOD_IDX, "Init", _m_Init);
			Utils.RegisterFunc(L, Utils.METHOD_IDX, "Clear", _m_Clear);
			Utils.RegisterFunc(L, Utils.METHOD_IDX, "MergeFromProto", _m_MergeFromProto);
			Utils.RegisterFunc(L, Utils.METHOD_IDX, "FillHistoryToMessage", _m_FillHistoryToMessage);
			
			
			Utils.RegisterFunc(L, Utils.GETTER_IDX, "latestHistory", _g_get_latestHistory);
            
			
			
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
					
					BattleServer.Battle.FrameActionMgr __cl_gen_ret = new BattleServer.Battle.FrameActionMgr();
					translator.Push(L, __cl_gen_ret);
                    
					return 1;
				}
				
			}
			catch(System.Exception __gen_e) {
				return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
			}
            return LuaAPI.luaL_error(L, "invalid arguments to BattleServer.Battle.FrameActionMgr constructor!");
            
        }
        
		
        
		
        
        
        
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _m_Init(RealStatePtr L)
        {
		    try {
            
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
            
            
                BattleServer.Battle.FrameActionMgr __cl_gen_to_be_invoked = (BattleServer.Battle.FrameActionMgr)translator.FastGetCSObj(L, 1);
            
            
                
                {
                    BattleServer.Battle.Battle battle = (BattleServer.Battle.Battle)translator.GetObject(L, 2, typeof(BattleServer.Battle.Battle));
                    
                    __cl_gen_to_be_invoked.Init( battle );
                    
                    
                    
                    return 0;
                }
                
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _m_Clear(RealStatePtr L)
        {
		    try {
            
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
            
            
                BattleServer.Battle.FrameActionMgr __cl_gen_to_be_invoked = (BattleServer.Battle.FrameActionMgr)translator.FastGetCSObj(L, 1);
            
            
                
                {
                    
                    __cl_gen_to_be_invoked.Clear(  );
                    
                    
                    
                    return 0;
                }
                
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _m_MergeFromProto(RealStatePtr L)
        {
		    try {
            
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
            
            
                BattleServer.Battle.FrameActionMgr __cl_gen_to_be_invoked = (BattleServer.Battle.FrameActionMgr)translator.FastGetCSObj(L, 1);
            
            
                
                {
                    ulong gcNID = LuaAPI.lua_touint64(L, 2);
                    Protos.GC2BS_FrameAction action = (Protos.GC2BS_FrameAction)translator.GetObject(L, 3, typeof(Protos.GC2BS_FrameAction));
                    
                    __cl_gen_to_be_invoked.MergeFromProto( gcNID, action );
                    
                    
                    
                    return 0;
                }
                
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _m_FillHistoryToMessage(RealStatePtr L)
        {
		    try {
            
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
            
            
                BattleServer.Battle.FrameActionMgr __cl_gen_to_be_invoked = (BattleServer.Battle.FrameActionMgr)translator.FastGetCSObj(L, 1);
            
            
                
                {
                    int from = LuaAPI.xlua_tointeger(L, 2);
                    int to = LuaAPI.xlua_tointeger(L, 3);
                    Protos.BS2GC_RequestFrameActionsRet ret = (Protos.BS2GC_RequestFrameActionsRet)translator.GetObject(L, 4, typeof(Protos.BS2GC_RequestFrameActionsRet));
                    
                    __cl_gen_to_be_invoked.FillHistoryToMessage( from, to, ret );
                    
                    
                    
                    return 0;
                }
                
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            
        }
        
        
        
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _g_get_latestHistory(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.Battle.FrameActionMgr __cl_gen_to_be_invoked = (BattleServer.Battle.FrameActionMgr)translator.FastGetCSObj(L, 1);
                translator.Push(L, __cl_gen_to_be_invoked.latestHistory);
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 1;
        }
        
        
        
		
		
		
		
    }
}
