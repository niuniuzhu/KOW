import { ActAttack } from "./Logic/Actions/ActAttack";
import { ActEntityAttrs } from "./Logic/Actions/ActEntityAttrs";
import { ActMove } from "./Logic/Actions/ActMove";
import { ActSprint } from "./Logic/Actions/ActSprint";
import { ActVelocity } from "./Logic/Actions/ActVelocity";
import { EntityAction } from "./Logic/Actions/EntityAction";
import { Champion } from "./Logic/Champion";
import { ActIntrptCollider } from "./Logic/Actions/ActIntrptCollider";
import { ActIntrptInput } from "./Logic/Actions/ActIntrptInput";
import { ActIntrptTimeup } from "./Logic/Actions/ActIntrptTimeup";
import { VActAnimation } from "./View/FSM/VActAnimation";
import { VActEffect } from "./View/FSM/VActEffect";
import { VActShake } from "./View/FSM/VActShake";
import { VEntityAction } from "./View/FSM/VEntityAction";
import { VChampion } from "./View/VChampion";

export enum StateType {
	Idle = 0,
	Move = 1,
	Attack = 2,
	Shake = 3,
	Sprint = 4,
	Attack3 = 5,
	Die = 6,
	Attack2 = 7
}

export enum ActionType {
	None = -1,
	EntityAttrs = 1,
	Velocity = 2,
	Shake = 3,
	Attack = 4,
	Move = 5,
	Sprint = 6,
	//打断
	Timeup = 100,//指定时间
	Collision = 101,//碰撞
	Input = 102
}

export const ID_TO_STATE_ACTION = new Map<number, new (owner: Champion, type: ActionType) => EntityAction>();
ID_TO_STATE_ACTION.set(ActionType.EntityAttrs, ActEntityAttrs);
ID_TO_STATE_ACTION.set(ActionType.Velocity, ActVelocity);
ID_TO_STATE_ACTION.set(ActionType.Shake, EntityAction);
ID_TO_STATE_ACTION.set(ActionType.Attack, ActAttack);
ID_TO_STATE_ACTION.set(ActionType.Move, ActMove);
ID_TO_STATE_ACTION.set(ActionType.Sprint, ActSprint);
ID_TO_STATE_ACTION.set(ActionType.Timeup, ActIntrptTimeup);
ID_TO_STATE_ACTION.set(ActionType.Collision, ActIntrptCollider);
ID_TO_STATE_ACTION.set(ActionType.Input, ActIntrptInput);

export enum VActionType {
	None = -1,
	Animation = 0,
	Shake = 4,
	Effect = 5,
}

export const V_ID_TO_STATE_ACTION = new Map<number, new (owner: VChampion, type: VActionType) => VEntityAction>();
V_ID_TO_STATE_ACTION.set(VActionType.Animation, VActAnimation);
V_ID_TO_STATE_ACTION.set(VActionType.Shake, VActShake);
V_ID_TO_STATE_ACTION.set(VActionType.Effect, VActEffect);