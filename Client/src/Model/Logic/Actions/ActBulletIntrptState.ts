import { BulletAction, BulletActionPhase } from "./BulletAction";
import { Hashtable } from "../../../RC/Utils/Hashtable";
import { Champion } from "../Champion";

/**
 * 子弹中断目标状态
 */
export class ActBulletIntrptState extends BulletAction {
	private _destStates: number;

	protected OnInit(def: Hashtable): void {
		super.OnInit(def);
		//强制设置在碰撞阶段
		this._phase = BulletActionPhase.Collision;
		this._destStates = Hashtable.GetNumber(def, "dest_state");
	}

	/**
	 * 程序限定仅在碰撞时生效,请配置时注意
	 */
	protected OnBulletCollision(target: Champion): void {
		target.fsm.ChangeState(this._destStates, null, true);
	}
}