import { ActAutoState } from "./ActAutoState";
import { ActEntityAttrs } from "./ActEntityAttrs";
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
}

export const ID_TO_STATE_ACTION = new Map<number, new (EntityState, any) => EntityStateAction>();
ID_TO_STATE_ACTION.set(0, ActAutoState);
ID_TO_STATE_ACTION.set(1, ActVelocity);
ID_TO_STATE_ACTION.set(2, ActVelocityAcceleration);
ID_TO_STATE_ACTION.set(3, ActEntityAttrs);
ID_TO_STATE_ACTION.set(4, ActStateAttrs);