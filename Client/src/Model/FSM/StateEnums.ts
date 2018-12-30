import { FSMState } from "../../RC/FSM/FSMState";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { ActAttack } from "./ActAttack";
import { ActEntityAttrs } from "./ActEntityAttrs";
import { ActMove } from "./ActMove";
import { ActVelocity } from "./ActVelocity";
import { ActVelocityAcceleration } from "./ActVelocityAcceleration";
import { EntityStateAction } from "./EntityStateAction";

export enum StateType {
	Idle,
	Move,
	Attack,
	Die,
	Energia
}

export enum ActionType {
	None = -1,
	EntityAttrs = 1,
	Velocity = 2,
	VelocityAcceleration = 3,
	Attack = 4,
	Move = 5,
}

export enum InterruptType {
	Timeup,//指定时间
	Collision,//碰撞
	Input,
}

export const ID_TO_STATE_ACTION = new Map<number, new (state: FSMState, type: ActionType, def: Hashtable) => EntityStateAction>();
ID_TO_STATE_ACTION.set(ActionType.EntityAttrs, ActEntityAttrs);
ID_TO_STATE_ACTION.set(ActionType.Velocity, ActVelocity);
ID_TO_STATE_ACTION.set(ActionType.VelocityAcceleration, ActVelocityAcceleration);
ID_TO_STATE_ACTION.set(ActionType.Attack, ActAttack);
ID_TO_STATE_ACTION.set(ActionType.Move, ActMove);