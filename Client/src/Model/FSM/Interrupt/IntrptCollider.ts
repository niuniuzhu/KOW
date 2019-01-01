import { Hashtable } from "../../../RC/Utils/Hashtable";
import { ISnapshotable } from "../../ISnapshotable";
import { IntrptBase } from "./IntrptBase";
import { EntityState } from "../EntityState";

enum IntrptColliderTargetType {
	Opponent,
	Teamate,
	Bullet
}

/**
 * 碰撞中断
 */
export class IntrptCollider extends IntrptBase implements ISnapshotable {
	private _targetType: IntrptColliderTargetType;

	protected OnInit(def: Hashtable) {
		super.OnInit(def);
		this._targetType = Hashtable.GetNumber(def, "target_type");
	}

	protected OnUpdatePhysic(dt: number): void {
		super.OnUpdatePhysic(dt);
		const owner = (<EntityState>this._state).owner;
		if (owner.intersections.length == 0) {
			return;
		}
		switch (this._targetType) {
			case IntrptColliderTargetType.Opponent: {
				for (const intersestion of owner.intersections) {
					const target = owner.battle.GetChampion(intersestion.rid);
					if (target.team != owner.team) {
						this.ChangeState();
						return;
					}
				}
				break;
			}

			case IntrptColliderTargetType.Teamate: {
				for (const intersestion of owner.intersections) {
					const target = owner.battle.GetChampion(intersestion.rid);
					if (target.team == owner.team) {
						this.ChangeState();
						return;
					}
				}
				break;
			}

			case IntrptColliderTargetType.Bullet: {
				//todo
				break;
			}
		}
	}
}