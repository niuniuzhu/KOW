import { ActAttack } from "./Logic/Actions/ActAttack";
import { ActBulletChangeAttrs } from "./Logic/Actions/ActBulletChangeAttrs";
import { ActBulletIntrptState } from "./Logic/Actions/ActBulletIntrptState";
import { ActChangeAttrs } from "./Logic/Actions/ActChangeAttrs";
import { ActIntrptCollider } from "./Logic/Actions/ActIntrptCollider";
import { ActIntrptInput } from "./Logic/Actions/ActIntrptInput";
import { ActIntrptTimeup } from "./Logic/Actions/ActIntrptTimeup";
import { ActMove } from "./Logic/Actions/ActMove";
import { ActShake } from "./Logic/Actions/ActShake";
import { ActSprint } from "./Logic/Actions/ActSprint";
import { ActVelocity } from "./Logic/Actions/ActVelocity";
import { BulletAction } from "./Logic/Actions/BulletAction";
import { EntityAction } from "./Logic/Actions/EntityAction";
import { Bullet } from "./Logic/Bullet";
import { Champion } from "./Logic/Champion";
import { VActAnimation } from "./View/Actions/VActAnimation";
import { VActEffect } from "./View/Actions/VActEffect";
import { VActShakeEffect } from "./View/Actions/VActShakeEffect";
import { VEntityAction } from "./View/Actions/VEntityAction";
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
	ChangeAttrs = 1,
	Velocity = 2,
	Shake = 3,
	Attack = 4,
	Move = 5,
	Sprint = 6,
	//打断
	Timeup = 100,//指定时间
	Collision = 101,//碰撞
	Input = 102,
	Custom = 999
}

export enum VActionType {
	None = -1,
	Animation = 0,
	ShakeEffect = 4,
	Effect = 5,
	Custom = 999
}

export enum BulletActionType {
	None = -1,
	IntrptState = 0,
	ChangeAttrs = 1
}

export const STATE_ACTION_CTOR_MAP = new Map<number, new (owner: Champion, type: ActionType) => EntityAction>();
STATE_ACTION_CTOR_MAP.set(ActionType.ChangeAttrs, ActChangeAttrs);
STATE_ACTION_CTOR_MAP.set(ActionType.Velocity, ActVelocity);
STATE_ACTION_CTOR_MAP.set(ActionType.Shake, ActShake);
STATE_ACTION_CTOR_MAP.set(ActionType.Attack, ActAttack);
STATE_ACTION_CTOR_MAP.set(ActionType.Move, ActMove);
STATE_ACTION_CTOR_MAP.set(ActionType.Sprint, ActSprint);
STATE_ACTION_CTOR_MAP.set(ActionType.Timeup, ActIntrptTimeup);
STATE_ACTION_CTOR_MAP.set(ActionType.Collision, ActIntrptCollider);
STATE_ACTION_CTOR_MAP.set(ActionType.Input, ActIntrptInput);

export const V_STATE_ACTION_CTOR_MAP = new Map<number, new (owner: VChampion, type: VActionType) => VEntityAction>();
V_STATE_ACTION_CTOR_MAP.set(VActionType.Animation, VActAnimation);
V_STATE_ACTION_CTOR_MAP.set(VActionType.ShakeEffect, VActShakeEffect);
V_STATE_ACTION_CTOR_MAP.set(VActionType.Effect, VActEffect);

export const BULLET_ACTION_CTOR_MAP = new Map<number, new (owner: Bullet, type: BulletActionType) => BulletAction>();
BULLET_ACTION_CTOR_MAP.set(BulletActionType.IntrptState, ActBulletIntrptState);
BULLET_ACTION_CTOR_MAP.set(BulletActionType.ChangeAttrs, ActBulletChangeAttrs);