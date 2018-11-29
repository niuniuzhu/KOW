import { FSMState } from "../../../RC/FSM/FSMState";
import { Hashtable } from "../../../RC/Utils/Hashtable";
import { VEntity } from "../VEntity";

enum Type {
	Idle,
	Move,
	Attack,
	Die
}

export class VEntityState extends FSMState {
	public static readonly Type = Type;
	/**
	 * 所属实体
	 */
	public get owner(): VEntity { return this._owner; }

	/**
	 * 状态的运行时间
	 */
	public time: number;

	private _owner: VEntity;

	constructor(type: number, owner: VEntity) {
		super(type);
		this._owner = owner;
	}

	protected OnEnter(param: any): void {
		const def = Hashtable.GetMap(Hashtable.GetMap(this.owner.def, "states"), this.type.toString());
		//播放动画
		const aniName = Hashtable.GetString(def, "animation");
		this.owner.PlayAnim(aniName);
	}
}