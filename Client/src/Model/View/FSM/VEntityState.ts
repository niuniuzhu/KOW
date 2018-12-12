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
	 * 获取状态运行时间
	 */
	public get time(): number { return this._time; }
	/**
	 * 设置状态运行时间
	 */
	public set time(value: number) {
		if (this._time == value)
			return;
		this._time = value;
		this.OnStateTimeChanged();
	}

	/**
	 * 所属实体
	 */
	private _owner: VEntity;
	/**
	 * 状态持续时长
	 */
	private _duration: number;
	/**
	 * 动画事件是否自动适配状态时长
	 */
	private _autoScaleAniTime: boolean;
	/**
	 * 动画播放模式
	 */
	private _animationPlayMode;
	/**
	 * 状态的运行时间
	 */
	private _time: number;

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

	protected OnStateTimeChanged(): void {
		//can be overrided
	}
}