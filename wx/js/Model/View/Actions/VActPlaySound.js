import { Hashtable } from "../../../RC/Utils/Hashtable";
import { Sound } from "../Sound";
import { SoundManager } from "../SoundManager";
import { VEntityAction } from "./VEntityAction";
export class VActPlaySound extends VEntityAction {
    OnInit(def) {
        super.OnInit(def);
        this._soundID = Hashtable.GetNumber(def, "sound");
        this._interval = Hashtable.GetNumber(def, "interval", -1);
    }
    OnEnter(param) {
        super.OnEnter(param);
        this._lastPlaySoundTime = 0;
    }
    OnTrigger() {
        super.OnTrigger();
        const sound = new Sound(this._soundID);
        SoundManager.PlaySound(sound);
    }
    OnUpdate(dt) {
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
