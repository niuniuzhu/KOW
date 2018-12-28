import { FSMState } from "../../RC/FSM/FSMState";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { VEntity } from "../View/VEntity";

export class VEntityState extends FSMState {
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
	 * 状态的运行时间
	 */
	private _time: number;

	constructor(type: number, owner: VEntity) {
		super(type);
		this._owner = owner;
	}

	protected OnEnter(param: any): void {
		if (this.owner.animationProxy.available) {
			const vDef = Hashtable.GetMap(Hashtable.GetMap(this.owner.cdefs, "states"), this.type.toString());
			//播放动画
			const id = Hashtable.GetNumber(vDef, "animation", -1);
			if (id >= 0) {
				const scaleTime = Hashtable.GetBool(vDef, "auto_scale_time");
				const duration = Hashtable.GetNumber(vDef, "duration");
				let timeScale = 1;
				if (scaleTime) {
					const animationSetting = this.owner.animationProxy.GetAnimationSetting(id);
					timeScale = duration / (animationSetting.length * animationSetting.interval);
				}
				this.owner.animationProxy.Play(id, 0, timeScale);
			}
		}
		this._time = 0;
	}

	protected OnUpdate(dt: number): void {
		this._time += dt;
	}

	protected OnStateTimeChanged(): void {
		//can be overrided
	}
}