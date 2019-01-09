import { FSMState } from "../../RC/FSM/FSMState";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { ActAttack } from "./ActAttack";
import { ActEntityAttrs } from "./ActEntityAttrs";
import { ActMove } from "./ActMove";
import { ActSprint } from "./ActSprint";
import { ActVelocity } from "./ActVelocity";
import { EntityStateAction } from "./EntityStateAction";
import { VActShake } from "./VActShake";
import { VEntityStateAction } from "./VEntityStateAction";

export enum StateType {
	Idle,
	Move,
	Attack,
	Die = 6
}

export enum ActionType {
	None = -1,
	EntityAttrs = 1,
	Velocity = 2,
	Shake = 3,
	Attack = 4,
	Move = 5,
	Sprint = 6
}

export enum InterruptType {
	Timeup,//指定时间
	Collision,//碰撞
	Input,
}

export const ID_TO_STATE_ACTION = new Map<number, new (state: FSMState, type: ActionType, def: Hashtable) => EntityStateAction>();
ID_TO_STATE_ACTION.set(ActionType.EntityAttrs, ActEntityAttrs);
ID_TO_STATE_ACTION.set(ActionType.Velocity, ActVelocity);
ID_TO_STATE_ACTION.set(ActionType.Shake, EntityStateAction);
ID_TO_STATE_ACTION.set(ActionType.Attack, ActAttack);
ID_TO_STATE_ACTION.set(ActionType.Move, ActMove);
ID_TO_STATE_ACTION.set(ActionType.Sprint, ActSprint);

export enum VActionType {
	None = -1,
	Shake = 3
}

export const V_ID_TO_STATE_ACTION = new Map<number, new (state: FSMState, type: VActionType, def: Hashtable) => VEntityStateAction>();
V_ID_TO_STATE_ACTION.set(VActionType.Shake, VActShake);