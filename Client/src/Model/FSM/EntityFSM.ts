import { FSM } from "../../RC/FSM/FSM";
import { FSMState } from "../../RC/FSM/FSMState";
import { EntityState } from "./EntityState";
import { StateType } from "./StateEnums";

export class EntityFSM extends FSM {
	public Init() {
		this._stateMap.forEach((state: FSMState, type: StateType, _) => {
			const entityFSM = <EntityState>state;
			entityFSM.Init();
		});
	}

	/**
	 * 转换状态
	 * @param type 转换类型
	 * @param param 携带参数
	 * @param igroneIntrptList 是否忽略中断列表
	 * @param force 是否强制转换
	 */
	public ChangeState(type: StateType, param: any = null, igroneIntrptList: boolean = false, force: boolean = false): boolean {
		if (!igroneIntrptList) {
			const state = <EntityState>this.currentState;
			if (state != null &&
				!state.IsStateAvailable(type)) {
				return false;
			}
		}
		return super.ChangeState(type, param, force);
	}
}