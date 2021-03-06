import { Hashtable } from "../../../RC/Utils/Hashtable";
import { ISnapshotable } from "../ISnapshotable";
import { ActIntrptBase } from "./ActIntrptBase";

enum IntrptColliderTargetType {
	Opponent,
	Teamate,
	Bullet
}

/**
 * 碰撞中断
 */
export class ActIntrptCollider extends ActIntrptBase implements ISnapshotable {
	private _targetType: IntrptColliderTargetType;

	protected OnInit(def: Hashtable) {
		super.OnInit(def);
		this._targetType = Hashtable.GetNumber(def, "target_type");
	}

	protected OnUpdatePhysic(dt: number): void {
		super.OnUpdatePhysic(dt);
		if (this.owner.intersectionCache.length == 0) {
			return;
		}
		switch (this._targetType) {
			case IntrptColliderTargetType.Opponent: {
				for (const intersestion of this.owner.intersectionCache) {
					const target = this.owner.battle.GetChampion(intersestion.rid);
					if (target.team != this.owner.team) {
						this.DoCollision();
						return;
					}
				}
				break;
			}

			case IntrptColliderTargetType.Teamate: {
				for (const intersestion of this.owner.intersectionCache) {
					const target = this.owner.battle.GetChampion(intersestion.rid);
					if (target.team == this.owner.team) {
						this.DoCollision();
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

	private DoCollision(): void {
		// const owner = (<EntityState>this._state).owner;
		// if (owner.intersectionCache.length > 0) {
		// 	const offset = FVec2.zero;

		// 	for (const intersectInfo of owner.intersectionCache) {
		// 		//相交深度
		// 		const delta = intersectInfo.tRadius - intersectInfo.magnitude;
		// 		const direction = intersectInfo.distanceVector.DivN(intersectInfo.magnitude);//归一
		// 		offset.Add(FVec2.MulN(direction, delta));
		// 	}
		// 	owner.intersectVector.Set(0, 0);
		// 	Logger.Log("reset v");
		// 	owner.position.Add(offset);
		// }
		if (this.CheckFilter()) {
			this.ChangeState();
		}
	}
}