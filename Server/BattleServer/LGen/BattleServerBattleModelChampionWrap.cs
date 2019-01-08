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
    public class BattleServerBattleModelChampionWrap 
    {
        public static void __Register(RealStatePtr L)
        {
			ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			System.Type type = typeof(BattleServer.Battle.Model.Champion);
			Utils.BeginObjectRegister(type, L, translator, 0, 1, 35, 33);
			
			Utils.RegisterFunc(L, Utils.METHOD_IDX, "DecodeSnapshot", _m_DecodeSnapshot);
			
			
			Utils.RegisterFunc(L, Utils.GETTER_IDX, "user", _g_get_user);
            Utils.RegisterFunc(L, Utils.GETTER_IDX, "team", _g_get_team);
            Utils.RegisterFunc(L, Utils.GETTER_IDX, "name", _g_get_name);
            Utils.RegisterFunc(L, Utils.GETTER_IDX, "hp", _g_get_hp);
            Utils.RegisterFunc(L, Utils.GETTER_IDX, "mhp", _g_get_mhp);
            Utils.RegisterFunc(L, Utils.GETTER_IDX, "mp", _g_get_mp);
            Utils.RegisterFunc(L, Utils.GETTER_IDX, "mmp", _g_get_mmp);
            Utils.RegisterFunc(L, Utils.GETTER_IDX, "atk", _g_get_atk);
            Utils.RegisterFunc(L, Utils.GETTER_IDX, "def", _g_get_def);
            Utils.RegisterFunc(L, Utils.GETTER_IDX, "disableMove", _g_get_disableMove);
            Utils.RegisterFunc(L, Utils.GETTER_IDX, "disableTurn", _g_get_disableTurn);
            Utils.RegisterFunc(L, Utils.GETTER_IDX, "disableSkill", _g_get_disableSkill);
            Utils.RegisterFunc(L, Utils.GETTER_IDX, "disableCollision", _g_get_disableCollision);
            Utils.RegisterFunc(L, Utils.GETTER_IDX, "supperArmor", _g_get_supperArmor);
            Utils.RegisterFunc(L, Utils.GETTER_IDX, "invulnerAbility", _g_get_invulnerAbility);
            Utils.RegisterFunc(L, Utils.GETTER_IDX, "moveDirection", _g_get_moveDirection);
            Utils.RegisterFunc(L, Utils.GETTER_IDX, "intersectVector", _g_get_intersectVector);
            Utils.RegisterFunc(L, Utils.GETTER_IDX, "phyxSpeed", _g_get_phyxSpeed);
            Utils.RegisterFunc(L, Utils.GETTER_IDX, "velocity", _g_get_velocity);
            Utils.RegisterFunc(L, Utils.GETTER_IDX, "isDead", _g_get_isDead);
            Utils.RegisterFunc(L, Utils.GETTER_IDX, "t_hp_add", _g_get_t_hp_add);
            Utils.RegisterFunc(L, Utils.GETTER_IDX, "t_mp_add", _g_get_t_mp_add);
            Utils.RegisterFunc(L, Utils.GETTER_IDX, "t_atk_add", _g_get_t_atk_add);
            Utils.RegisterFunc(L, Utils.GETTER_IDX, "t_def_add", _g_get_t_def_add);
            Utils.RegisterFunc(L, Utils.GETTER_IDX, "t_speed_add", _g_get_t_speed_add);
            Utils.RegisterFunc(L, Utils.GETTER_IDX, "fsm", _g_get_fsm);
            Utils.RegisterFunc(L, Utils.GETTER_IDX, "win", _g_get_win);
            Utils.RegisterFunc(L, Utils.GETTER_IDX, "damage", _g_get_damage);
            Utils.RegisterFunc(L, Utils.GETTER_IDX, "hurt", _g_get_hurt);
            Utils.RegisterFunc(L, Utils.GETTER_IDX, "heal", _g_get_heal);
            Utils.RegisterFunc(L, Utils.GETTER_IDX, "occupyTime", _g_get_occupyTime);
            Utils.RegisterFunc(L, Utils.GETTER_IDX, "skill0Used", _g_get_skill0Used);
            Utils.RegisterFunc(L, Utils.GETTER_IDX, "skill1Used", _g_get_skill1Used);
            Utils.RegisterFunc(L, Utils.GETTER_IDX, "skill0Damage", _g_get_skill0Damage);
            Utils.RegisterFunc(L, Utils.GETTER_IDX, "skill1Damage", _g_get_skill1Damage);
            
			Utils.RegisterFunc(L, Utils.SETTER_IDX, "team", _s_set_team);
            Utils.RegisterFunc(L, Utils.SETTER_IDX, "name", _s_set_name);
            Utils.RegisterFunc(L, Utils.SETTER_IDX, "hp", _s_set_hp);
            Utils.RegisterFunc(L, Utils.SETTER_IDX, "mhp", _s_set_mhp);
            Utils.RegisterFunc(L, Utils.SETTER_IDX, "mp", _s_set_mp);
            Utils.RegisterFunc(L, Utils.SETTER_IDX, "mmp", _s_set_mmp);
            Utils.RegisterFunc(L, Utils.SETTER_IDX, "atk", _s_set_atk);
            Utils.RegisterFunc(L, Utils.SETTER_IDX, "def", _s_set_def);
            Utils.RegisterFunc(L, Utils.SETTER_IDX, "disableMove", _s_set_disableMove);
            Utils.RegisterFunc(L, Utils.SETTER_IDX, "disableTurn", _s_set_disableTurn);
            Utils.RegisterFunc(L, Utils.SETTER_IDX, "disableSkill", _s_set_disableSkill);
            Utils.RegisterFunc(L, Utils.SETTER_IDX, "disableCollision", _s_set_disableCollision);
            Utils.RegisterFunc(L, Utils.SETTER_IDX, "supperArmor", _s_set_supperArmor);
            Utils.RegisterFunc(L, Utils.SETTER_IDX, "invulnerAbility", _s_set_invulnerAbility);
            Utils.RegisterFunc(L, Utils.SETTER_IDX, "moveDirection", _s_set_moveDirection);
            Utils.RegisterFunc(L, Utils.SETTER_IDX, "intersectVector", _s_set_intersectVector);
            Utils.RegisterFunc(L, Utils.SETTER_IDX, "phyxSpeed", _s_set_phyxSpeed);
            Utils.RegisterFunc(L, Utils.SETTER_IDX, "velocity", _s_set_velocity);
            Utils.RegisterFunc(L, Utils.SETTER_IDX, "isDead", _s_set_isDead);
            Utils.RegisterFunc(L, Utils.SETTER_IDX, "t_hp_add", _s_set_t_hp_add);
            Utils.RegisterFunc(L, Utils.SETTER_IDX, "t_mp_add", _s_set_t_mp_add);
            Utils.RegisterFunc(L, Utils.SETTER_IDX, "t_atk_add", _s_set_t_atk_add);
            Utils.RegisterFunc(L, Utils.SETTER_IDX, "t_def_add", _s_set_t_def_add);
            Utils.RegisterFunc(L, Utils.SETTER_IDX, "t_speed_add", _s_set_t_speed_add);
            Utils.RegisterFunc(L, Utils.SETTER_IDX, "win", _s_set_win);
            Utils.RegisterFunc(L, Utils.SETTER_IDX, "damage", _s_set_damage);
            Utils.RegisterFunc(L, Utils.SETTER_IDX, "hurt", _s_set_hurt);
            Utils.RegisterFunc(L, Utils.SETTER_IDX, "heal", _s_set_heal);
            Utils.RegisterFunc(L, Utils.SETTER_IDX, "occupyTime", _s_set_occupyTime);
            Utils.RegisterFunc(L, Utils.SETTER_IDX, "skill0Used", _s_set_skill0Used);
            Utils.RegisterFunc(L, Utils.SETTER_IDX, "skill1Used", _s_set_skill1Used);
            Utils.RegisterFunc(L, Utils.SETTER_IDX, "skill0Damage", _s_set_skill0Damage);
            Utils.RegisterFunc(L, Utils.SETTER_IDX, "skill1Damage", _s_set_skill1Damage);
            
			
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
				if(LuaAPI.lua_gettop(L) == 2 && translator.Assignable<BattleServer.Battle.Battle>(L, 2))
				{
					BattleServer.Battle.Battle battle = (BattleServer.Battle.Battle)translator.GetObject(L, 2, typeof(BattleServer.Battle.Battle));
					
					BattleServer.Battle.Model.Champion __cl_gen_ret = new BattleServer.Battle.Model.Champion(battle);
					translator.Push(L, __cl_gen_ret);
                    
					return 1;
				}
				
			}
			catch(System.Exception __gen_e) {
				return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
			}
            return LuaAPI.luaL_error(L, "invalid arguments to BattleServer.Battle.Model.Champion constructor!");
            
        }
        
		
        
		
        
        
        
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _m_DecodeSnapshot(RealStatePtr L)
        {
		    try {
            
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
            
            
                BattleServer.Battle.Model.Champion __cl_gen_to_be_invoked = (BattleServer.Battle.Model.Champion)translator.FastGetCSObj(L, 1);
            
            
                
                {
                    ulong rid = LuaAPI.lua_touint64(L, 2);
                    bool isNew = LuaAPI.lua_toboolean(L, 3);
                    Google.Protobuf.CodedInputStream reader = (Google.Protobuf.CodedInputStream)translator.GetObject(L, 4, typeof(Google.Protobuf.CodedInputStream));
                    
                    __cl_gen_to_be_invoked.DecodeSnapshot( rid, isNew, reader );
                    
                    
                    
                    return 0;
                }
                
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            
        }
        
        
        
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _g_get_user(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.Battle.Model.Champion __cl_gen_to_be_invoked = (BattleServer.Battle.Model.Champion)translator.FastGetCSObj(L, 1);
                translator.Push(L, __cl_gen_to_be_invoked.user);
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 1;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _g_get_team(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.Battle.Model.Champion __cl_gen_to_be_invoked = (BattleServer.Battle.Model.Champion)translator.FastGetCSObj(L, 1);
                LuaAPI.xlua_pushinteger(L, __cl_gen_to_be_invoked.team);
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
			
                BattleServer.Battle.Model.Champion __cl_gen_to_be_invoked = (BattleServer.Battle.Model.Champion)translator.FastGetCSObj(L, 1);
                LuaAPI.lua_pushstring(L, __cl_gen_to_be_invoked.name);
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 1;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _g_get_hp(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.Battle.Model.Champion __cl_gen_to_be_invoked = (BattleServer.Battle.Model.Champion)translator.FastGetCSObj(L, 1);
                LuaAPI.xlua_pushinteger(L, __cl_gen_to_be_invoked.hp);
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 1;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _g_get_mhp(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.Battle.Model.Champion __cl_gen_to_be_invoked = (BattleServer.Battle.Model.Champion)translator.FastGetCSObj(L, 1);
                LuaAPI.xlua_pushinteger(L, __cl_gen_to_be_invoked.mhp);
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 1;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _g_get_mp(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.Battle.Model.Champion __cl_gen_to_be_invoked = (BattleServer.Battle.Model.Champion)translator.FastGetCSObj(L, 1);
                LuaAPI.xlua_pushinteger(L, __cl_gen_to_be_invoked.mp);
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 1;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _g_get_mmp(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.Battle.Model.Champion __cl_gen_to_be_invoked = (BattleServer.Battle.Model.Champion)translator.FastGetCSObj(L, 1);
                LuaAPI.xlua_pushinteger(L, __cl_gen_to_be_invoked.mmp);
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 1;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _g_get_atk(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.Battle.Model.Champion __cl_gen_to_be_invoked = (BattleServer.Battle.Model.Champion)translator.FastGetCSObj(L, 1);
                LuaAPI.xlua_pushinteger(L, __cl_gen_to_be_invoked.atk);
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 1;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _g_get_def(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.Battle.Model.Champion __cl_gen_to_be_invoked = (BattleServer.Battle.Model.Champion)translator.FastGetCSObj(L, 1);
                LuaAPI.xlua_pushinteger(L, __cl_gen_to_be_invoked.def);
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 1;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _g_get_disableMove(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.Battle.Model.Champion __cl_gen_to_be_invoked = (BattleServer.Battle.Model.Champion)translator.FastGetCSObj(L, 1);
                LuaAPI.xlua_pushinteger(L, __cl_gen_to_be_invoked.disableMove);
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 1;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _g_get_disableTurn(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.Battle.Model.Champion __cl_gen_to_be_invoked = (BattleServer.Battle.Model.Champion)translator.FastGetCSObj(L, 1);
                LuaAPI.xlua_pushinteger(L, __cl_gen_to_be_invoked.disableTurn);
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 1;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _g_get_disableSkill(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.Battle.Model.Champion __cl_gen_to_be_invoked = (BattleServer.Battle.Model.Champion)translator.FastGetCSObj(L, 1);
                LuaAPI.xlua_pushinteger(L, __cl_gen_to_be_invoked.disableSkill);
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 1;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _g_get_disableCollision(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.Battle.Model.Champion __cl_gen_to_be_invoked = (BattleServer.Battle.Model.Champion)translator.FastGetCSObj(L, 1);
                LuaAPI.xlua_pushinteger(L, __cl_gen_to_be_invoked.disableCollision);
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 1;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _g_get_supperArmor(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.Battle.Model.Champion __cl_gen_to_be_invoked = (BattleServer.Battle.Model.Champion)translator.FastGetCSObj(L, 1);
                LuaAPI.xlua_pushinteger(L, __cl_gen_to_be_invoked.supperArmor);
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 1;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _g_get_invulnerAbility(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.Battle.Model.Champion __cl_gen_to_be_invoked = (BattleServer.Battle.Model.Champion)translator.FastGetCSObj(L, 1);
                LuaAPI.xlua_pushinteger(L, __cl_gen_to_be_invoked.invulnerAbility);
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 1;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _g_get_moveDirection(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.Battle.Model.Champion __cl_gen_to_be_invoked = (BattleServer.Battle.Model.Champion)translator.FastGetCSObj(L, 1);
                translator.Push(L, __cl_gen_to_be_invoked.moveDirection);
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 1;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _g_get_intersectVector(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.Battle.Model.Champion __cl_gen_to_be_invoked = (BattleServer.Battle.Model.Champion)translator.FastGetCSObj(L, 1);
                translator.Push(L, __cl_gen_to_be_invoked.intersectVector);
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 1;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _g_get_phyxSpeed(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.Battle.Model.Champion __cl_gen_to_be_invoked = (BattleServer.Battle.Model.Champion)translator.FastGetCSObj(L, 1);
                translator.Push(L, __cl_gen_to_be_invoked.phyxSpeed);
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 1;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _g_get_velocity(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.Battle.Model.Champion __cl_gen_to_be_invoked = (BattleServer.Battle.Model.Champion)translator.FastGetCSObj(L, 1);
                translator.Push(L, __cl_gen_to_be_invoked.velocity);
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 1;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _g_get_isDead(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.Battle.Model.Champion __cl_gen_to_be_invoked = (BattleServer.Battle.Model.Champion)translator.FastGetCSObj(L, 1);
                LuaAPI.lua_pushboolean(L, __cl_gen_to_be_invoked.isDead);
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 1;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _g_get_t_hp_add(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.Battle.Model.Champion __cl_gen_to_be_invoked = (BattleServer.Battle.Model.Champion)translator.FastGetCSObj(L, 1);
                LuaAPI.xlua_pushinteger(L, __cl_gen_to_be_invoked.t_hp_add);
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 1;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _g_get_t_mp_add(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.Battle.Model.Champion __cl_gen_to_be_invoked = (BattleServer.Battle.Model.Champion)translator.FastGetCSObj(L, 1);
                LuaAPI.xlua_pushinteger(L, __cl_gen_to_be_invoked.t_mp_add);
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 1;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _g_get_t_atk_add(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.Battle.Model.Champion __cl_gen_to_be_invoked = (BattleServer.Battle.Model.Champion)translator.FastGetCSObj(L, 1);
                LuaAPI.xlua_pushinteger(L, __cl_gen_to_be_invoked.t_atk_add);
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 1;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _g_get_t_def_add(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.Battle.Model.Champion __cl_gen_to_be_invoked = (BattleServer.Battle.Model.Champion)translator.FastGetCSObj(L, 1);
                LuaAPI.xlua_pushinteger(L, __cl_gen_to_be_invoked.t_def_add);
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 1;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _g_get_t_speed_add(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.Battle.Model.Champion __cl_gen_to_be_invoked = (BattleServer.Battle.Model.Champion)translator.FastGetCSObj(L, 1);
                LuaAPI.xlua_pushinteger(L, __cl_gen_to_be_invoked.t_speed_add);
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 1;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _g_get_fsm(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.Battle.Model.Champion __cl_gen_to_be_invoked = (BattleServer.Battle.Model.Champion)translator.FastGetCSObj(L, 1);
                translator.Push(L, __cl_gen_to_be_invoked.fsm);
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 1;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _g_get_win(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.Battle.Model.Champion __cl_gen_to_be_invoked = (BattleServer.Battle.Model.Champion)translator.FastGetCSObj(L, 1);
                LuaAPI.lua_pushboolean(L, __cl_gen_to_be_invoked.win);
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 1;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _g_get_damage(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.Battle.Model.Champion __cl_gen_to_be_invoked = (BattleServer.Battle.Model.Champion)translator.FastGetCSObj(L, 1);
                LuaAPI.xlua_pushuint(L, __cl_gen_to_be_invoked.damage);
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 1;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _g_get_hurt(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.Battle.Model.Champion __cl_gen_to_be_invoked = (BattleServer.Battle.Model.Champion)translator.FastGetCSObj(L, 1);
                LuaAPI.xlua_pushuint(L, __cl_gen_to_be_invoked.hurt);
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 1;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _g_get_heal(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.Battle.Model.Champion __cl_gen_to_be_invoked = (BattleServer.Battle.Model.Champion)translator.FastGetCSObj(L, 1);
                LuaAPI.xlua_pushuint(L, __cl_gen_to_be_invoked.heal);
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 1;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _g_get_occupyTime(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.Battle.Model.Champion __cl_gen_to_be_invoked = (BattleServer.Battle.Model.Champion)translator.FastGetCSObj(L, 1);
                LuaAPI.xlua_pushuint(L, __cl_gen_to_be_invoked.occupyTime);
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 1;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _g_get_skill0Used(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.Battle.Model.Champion __cl_gen_to_be_invoked = (BattleServer.Battle.Model.Champion)translator.FastGetCSObj(L, 1);
                LuaAPI.xlua_pushuint(L, __cl_gen_to_be_invoked.skill0Used);
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 1;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _g_get_skill1Used(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.Battle.Model.Champion __cl_gen_to_be_invoked = (BattleServer.Battle.Model.Champion)translator.FastGetCSObj(L, 1);
                LuaAPI.xlua_pushuint(L, __cl_gen_to_be_invoked.skill1Used);
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 1;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _g_get_skill0Damage(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.Battle.Model.Champion __cl_gen_to_be_invoked = (BattleServer.Battle.Model.Champion)translator.FastGetCSObj(L, 1);
                LuaAPI.xlua_pushuint(L, __cl_gen_to_be_invoked.skill0Damage);
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 1;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _g_get_skill1Damage(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.Battle.Model.Champion __cl_gen_to_be_invoked = (BattleServer.Battle.Model.Champion)translator.FastGetCSObj(L, 1);
                LuaAPI.xlua_pushuint(L, __cl_gen_to_be_invoked.skill1Damage);
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 1;
        }
        
        
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _s_set_team(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.Battle.Model.Champion __cl_gen_to_be_invoked = (BattleServer.Battle.Model.Champion)translator.FastGetCSObj(L, 1);
                __cl_gen_to_be_invoked.team = LuaAPI.xlua_tointeger(L, 2);
            
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 0;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _s_set_name(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.Battle.Model.Champion __cl_gen_to_be_invoked = (BattleServer.Battle.Model.Champion)translator.FastGetCSObj(L, 1);
                __cl_gen_to_be_invoked.name = LuaAPI.lua_tostring(L, 2);
            
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 0;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _s_set_hp(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.Battle.Model.Champion __cl_gen_to_be_invoked = (BattleServer.Battle.Model.Champion)translator.FastGetCSObj(L, 1);
                __cl_gen_to_be_invoked.hp = LuaAPI.xlua_tointeger(L, 2);
            
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 0;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _s_set_mhp(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.Battle.Model.Champion __cl_gen_to_be_invoked = (BattleServer.Battle.Model.Champion)translator.FastGetCSObj(L, 1);
                __cl_gen_to_be_invoked.mhp = LuaAPI.xlua_tointeger(L, 2);
            
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 0;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _s_set_mp(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.Battle.Model.Champion __cl_gen_to_be_invoked = (BattleServer.Battle.Model.Champion)translator.FastGetCSObj(L, 1);
                __cl_gen_to_be_invoked.mp = LuaAPI.xlua_tointeger(L, 2);
            
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 0;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _s_set_mmp(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.Battle.Model.Champion __cl_gen_to_be_invoked = (BattleServer.Battle.Model.Champion)translator.FastGetCSObj(L, 1);
                __cl_gen_to_be_invoked.mmp = LuaAPI.xlua_tointeger(L, 2);
            
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 0;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _s_set_atk(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.Battle.Model.Champion __cl_gen_to_be_invoked = (BattleServer.Battle.Model.Champion)translator.FastGetCSObj(L, 1);
                __cl_gen_to_be_invoked.atk = LuaAPI.xlua_tointeger(L, 2);
            
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 0;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _s_set_def(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.Battle.Model.Champion __cl_gen_to_be_invoked = (BattleServer.Battle.Model.Champion)translator.FastGetCSObj(L, 1);
                __cl_gen_to_be_invoked.def = LuaAPI.xlua_tointeger(L, 2);
            
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 0;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _s_set_disableMove(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.Battle.Model.Champion __cl_gen_to_be_invoked = (BattleServer.Battle.Model.Champion)translator.FastGetCSObj(L, 1);
                __cl_gen_to_be_invoked.disableMove = LuaAPI.xlua_tointeger(L, 2);
            
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 0;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _s_set_disableTurn(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.Battle.Model.Champion __cl_gen_to_be_invoked = (BattleServer.Battle.Model.Champion)translator.FastGetCSObj(L, 1);
                __cl_gen_to_be_invoked.disableTurn = LuaAPI.xlua_tointeger(L, 2);
            
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 0;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _s_set_disableSkill(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.Battle.Model.Champion __cl_gen_to_be_invoked = (BattleServer.Battle.Model.Champion)translator.FastGetCSObj(L, 1);
                __cl_gen_to_be_invoked.disableSkill = LuaAPI.xlua_tointeger(L, 2);
            
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 0;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _s_set_disableCollision(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.Battle.Model.Champion __cl_gen_to_be_invoked = (BattleServer.Battle.Model.Champion)translator.FastGetCSObj(L, 1);
                __cl_gen_to_be_invoked.disableCollision = LuaAPI.xlua_tointeger(L, 2);
            
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 0;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _s_set_supperArmor(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.Battle.Model.Champion __cl_gen_to_be_invoked = (BattleServer.Battle.Model.Champion)translator.FastGetCSObj(L, 1);
                __cl_gen_to_be_invoked.supperArmor = LuaAPI.xlua_tointeger(L, 2);
            
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 0;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _s_set_invulnerAbility(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.Battle.Model.Champion __cl_gen_to_be_invoked = (BattleServer.Battle.Model.Champion)translator.FastGetCSObj(L, 1);
                __cl_gen_to_be_invoked.invulnerAbility = LuaAPI.xlua_tointeger(L, 2);
            
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 0;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _s_set_moveDirection(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.Battle.Model.Champion __cl_gen_to_be_invoked = (BattleServer.Battle.Model.Champion)translator.FastGetCSObj(L, 1);
                Core.FMath.FVec2 __cl_gen_value;translator.Get(L, 2, out __cl_gen_value);
				__cl_gen_to_be_invoked.moveDirection = __cl_gen_value;
            
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 0;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _s_set_intersectVector(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.Battle.Model.Champion __cl_gen_to_be_invoked = (BattleServer.Battle.Model.Champion)translator.FastGetCSObj(L, 1);
                Core.FMath.FVec2 __cl_gen_value;translator.Get(L, 2, out __cl_gen_value);
				__cl_gen_to_be_invoked.intersectVector = __cl_gen_value;
            
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 0;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _s_set_phyxSpeed(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.Battle.Model.Champion __cl_gen_to_be_invoked = (BattleServer.Battle.Model.Champion)translator.FastGetCSObj(L, 1);
                Core.FMath.FVec2 __cl_gen_value;translator.Get(L, 2, out __cl_gen_value);
				__cl_gen_to_be_invoked.phyxSpeed = __cl_gen_value;
            
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 0;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _s_set_velocity(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.Battle.Model.Champion __cl_gen_to_be_invoked = (BattleServer.Battle.Model.Champion)translator.FastGetCSObj(L, 1);
                Core.FMath.Fix64 __cl_gen_value;translator.Get(L, 2, out __cl_gen_value);
				__cl_gen_to_be_invoked.velocity = __cl_gen_value;
            
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 0;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _s_set_isDead(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.Battle.Model.Champion __cl_gen_to_be_invoked = (BattleServer.Battle.Model.Champion)translator.FastGetCSObj(L, 1);
                __cl_gen_to_be_invoked.isDead = LuaAPI.lua_toboolean(L, 2);
            
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 0;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _s_set_t_hp_add(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.Battle.Model.Champion __cl_gen_to_be_invoked = (BattleServer.Battle.Model.Champion)translator.FastGetCSObj(L, 1);
                __cl_gen_to_be_invoked.t_hp_add = LuaAPI.xlua_tointeger(L, 2);
            
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 0;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _s_set_t_mp_add(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.Battle.Model.Champion __cl_gen_to_be_invoked = (BattleServer.Battle.Model.Champion)translator.FastGetCSObj(L, 1);
                __cl_gen_to_be_invoked.t_mp_add = LuaAPI.xlua_tointeger(L, 2);
            
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 0;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _s_set_t_atk_add(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.Battle.Model.Champion __cl_gen_to_be_invoked = (BattleServer.Battle.Model.Champion)translator.FastGetCSObj(L, 1);
                __cl_gen_to_be_invoked.t_atk_add = LuaAPI.xlua_tointeger(L, 2);
            
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 0;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _s_set_t_def_add(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.Battle.Model.Champion __cl_gen_to_be_invoked = (BattleServer.Battle.Model.Champion)translator.FastGetCSObj(L, 1);
                __cl_gen_to_be_invoked.t_def_add = LuaAPI.xlua_tointeger(L, 2);
            
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 0;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _s_set_t_speed_add(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.Battle.Model.Champion __cl_gen_to_be_invoked = (BattleServer.Battle.Model.Champion)translator.FastGetCSObj(L, 1);
                __cl_gen_to_be_invoked.t_speed_add = LuaAPI.xlua_tointeger(L, 2);
            
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 0;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _s_set_win(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.Battle.Model.Champion __cl_gen_to_be_invoked = (BattleServer.Battle.Model.Champion)translator.FastGetCSObj(L, 1);
                __cl_gen_to_be_invoked.win = LuaAPI.lua_toboolean(L, 2);
            
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 0;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _s_set_damage(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.Battle.Model.Champion __cl_gen_to_be_invoked = (BattleServer.Battle.Model.Champion)translator.FastGetCSObj(L, 1);
                __cl_gen_to_be_invoked.damage = LuaAPI.xlua_touint(L, 2);
            
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 0;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _s_set_hurt(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.Battle.Model.Champion __cl_gen_to_be_invoked = (BattleServer.Battle.Model.Champion)translator.FastGetCSObj(L, 1);
                __cl_gen_to_be_invoked.hurt = LuaAPI.xlua_touint(L, 2);
            
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 0;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _s_set_heal(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.Battle.Model.Champion __cl_gen_to_be_invoked = (BattleServer.Battle.Model.Champion)translator.FastGetCSObj(L, 1);
                __cl_gen_to_be_invoked.heal = LuaAPI.xlua_touint(L, 2);
            
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 0;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _s_set_occupyTime(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.Battle.Model.Champion __cl_gen_to_be_invoked = (BattleServer.Battle.Model.Champion)translator.FastGetCSObj(L, 1);
                __cl_gen_to_be_invoked.occupyTime = LuaAPI.xlua_touint(L, 2);
            
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 0;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _s_set_skill0Used(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.Battle.Model.Champion __cl_gen_to_be_invoked = (BattleServer.Battle.Model.Champion)translator.FastGetCSObj(L, 1);
                __cl_gen_to_be_invoked.skill0Used = LuaAPI.xlua_touint(L, 2);
            
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 0;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _s_set_skill1Used(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.Battle.Model.Champion __cl_gen_to_be_invoked = (BattleServer.Battle.Model.Champion)translator.FastGetCSObj(L, 1);
                __cl_gen_to_be_invoked.skill1Used = LuaAPI.xlua_touint(L, 2);
            
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 0;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _s_set_skill0Damage(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.Battle.Model.Champion __cl_gen_to_be_invoked = (BattleServer.Battle.Model.Champion)translator.FastGetCSObj(L, 1);
                __cl_gen_to_be_invoked.skill0Damage = LuaAPI.xlua_touint(L, 2);
            
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 0;
        }
        
        [MonoPInvokeCallbackAttribute(typeof(LuaCSFunction))]
        static int _s_set_skill1Damage(RealStatePtr L)
        {
		    try {
                ObjectTranslator translator = ObjectTranslatorPool.Instance.Find(L);
			
                BattleServer.Battle.Model.Champion __cl_gen_to_be_invoked = (BattleServer.Battle.Model.Champion)translator.FastGetCSObj(L, 1);
                __cl_gen_to_be_invoked.skill1Damage = LuaAPI.xlua_touint(L, 2);
            
            } catch(System.Exception __gen_e) {
                return LuaAPI.luaL_error(L, "c# exception:" + __gen_e);
            }
            return 0;
        }
        
		
		
		
		
    }
}
