import { FSMState } from "../../RC/FSM/FSMState";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { ActEntityAttrs } from "./ActEntityAttrs";
import { ActInterrupt } from "./ActInterrupt";
import { ActStateAttrs } from "./ActStateAttrs";
import { ActVelocity } from "./ActVelocity";
import { ActVelocityAcceleration } from "./ActVelocityAcceleration";
import { EntityStateAction } from "./EntityStateAction";

export enum StateType {
	None = -1,
	Idle,
	Move,
	Attack,
	Die
}

export enum StateOp {
	Equal,
	Add,
	Mul,
	Mod,
	Pow,
	Exp
}

export enum StateAttr {
	DisableMove = 1 << 0,
	DisableTurn = 1 << 1,
	SuperArmor = 1 << 2,//霸体
	Invulnerability = 1 << 3,//刀枪不入
	ClearLastBullets = 1 << 4,//清理上次子弹
	DisableUseSkill = 1 << 5,//禁止使用技能
}

export const AutoStateID: number = 0;
export const VelocityID: number = 1;
export const VelocityAccelerationID: number = 2;
export const EntityAttrsID: number = 3;
export const StateAttrsID: number = 4;

export const ID_TO_STATE_ACTION = new Map<number, new (state: FSMState, id: number, def: Hashtable) => EntityStateAction>();
ID_TO_STATE_ACTION.set(AutoStateID, ActInterrupt);
ID_TO_STATE_ACTION.set(VelocityID, ActVelocity);
ID_TO_STATE_ACTION.set(VelocityAccelerationID, ActVelocityAcceleration);
ID_TO_STATE_ACTION.set(EntityAttrsID, ActEntityAttrs);
ID_TO_STATE_ACTION.set(StateAttrsID, ActStateAttrs);