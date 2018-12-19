import { FSMState } from "../../RC/FSM/FSMState";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { ActAttack } from "./ActAttack";
import { ActEntityAttrs } from "./ActEntityAttrs";
import { ActInterrupt } from "./ActInterrupt";
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

export enum ActionType {
	None = -1,
	Interrupt = 0,
	EntityAttrs = 1,
	Velocity = 2,
	VelocityAcceleration = 3,
	Attack = 4,
}

export const ID_TO_STATE_ACTION = new Map<number, new (state: FSMState, type: ActionType, def: Hashtable) => EntityStateAction>();
ID_TO_STATE_ACTION.set(ActionType.Interrupt, ActInterrupt);
ID_TO_STATE_ACTION.set(ActionType.EntityAttrs, ActEntityAttrs);
ID_TO_STATE_ACTION.set(ActionType.Velocity, ActVelocity);
ID_TO_STATE_ACTION.set(ActionType.VelocityAcceleration, ActVelocityAcceleration);
ID_TO_STATE_ACTION.set(ActionType.Attack, ActAttack);