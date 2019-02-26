import { Hashtable } from "../../../RC/Utils/Hashtable";
import { Sound } from "../Sound";
import { SoundManager } from "../SoundManager";
import { VEntityAction } from "./VEntityAction";

export class VActPlaySound extends VEntityAction {
	private _soundID: number;
	private _interval: number;
	private _lastPlaySoundTime: number;

	protected OnInit(def: Hashtable): void {
		super.OnInit(def);
		this._soundID = Hashtable.GetNumber(def, "sound");
		this._interval = Hashtable.GetNumber(def, "interval", -1);
	}

	protected OnEnter(param: any): void {
		super.OnEnter(param);
		this._lastPlaySoundTime = 0;
	}

	protected OnTrigger(): void {
		super.OnTrigger();
		const sound = new Sound(this._soundID);
		SoundManager.PlaySound(sound);
	}

	protected OnUpdate(dt: number): void {
		super.OnUpdate(dt);
		if (this._interval < 0)
			return;
		this._lastPlaySoundTime += dt;
		if (this._lastPlaySoundTime >= this._interval) {
			this._lastPlaySoundTime -= this._interval;
			const sound = new Sound(this._soundID);
			SoundManager.PlaySound(sound);
		}
	}
}