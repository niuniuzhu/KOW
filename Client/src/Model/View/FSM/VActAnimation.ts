import { Hashtable } from "../../../RC/Utils/Hashtable";
import { VEntityState } from "./VEntityState";
import { VEntityStateAction } from "./VEntityStateAction";

export class VActAnimation extends VEntityStateAction {
	private _animationID: number;
	private _autoScaleTime: boolean;
	private _duration: number;

	protected OnInit(def: Hashtable): void {
		super.OnInit(def);
		this._animationID = Hashtable.GetNumber(def, "animation");
		this._autoScaleTime = Hashtable.GetBool(def, "auto_scale_time");
		this._duration = Hashtable.GetNumber(def, "duration");
	}

	protected OnEnter(param: any): void {
		super.OnEnter(param);
		const owner = (<VEntityState>this.state).owner;
		if (owner.animationProxy != null && owner.animationProxy.available) {
			//播放动画
			if (this._animationID >= 0) {
				let timeScale = 1;
				if (this._autoScaleTime) {
					const animationSetting = owner.animationProxy.GetAnimationSetting(this._animationID);
					timeScale = this._duration / (animationSetting.length * animationSetting.interval);
				}
				owner.animationProxy.Play(this._animationID, 0, timeScale);
			}
		}
	}
}