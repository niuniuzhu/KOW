define(["require", "exports", "../../../RC/Utils/Hashtable", "../Sound", "../SoundManager", "./VEntityAction"], function (require, exports, Hashtable_1, Sound_1, SoundManager_1, VEntityAction_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class VActPlaySound extends VEntityAction_1.VEntityAction {
        OnInit(def) {
            super.OnInit(def);
            this._soundID = Hashtable_1.Hashtable.GetNumber(def, "sound");
            this._interval = Hashtable_1.Hashtable.GetNumber(def, "interval", -1);
        }
        OnEnter(param) {
            super.OnEnter(param);
            this._lastPlaySoundTime = 0;
        }
        OnTrigger() {
            super.OnTrigger();
            const sound = new Sound_1.Sound(this._soundID);
            SoundManager_1.SoundManager.PlaySound(sound);
        }
        OnUpdate(dt) {
            super.OnUpdate(dt);
            if (this._interval < 0)
                return;
            this._lastPlaySoundTime += dt;
            if (this._lastPlaySoundTime >= this._interval) {
                this._lastPlaySoundTime -= this._interval;
                const sound = new Sound_1.Sound(this._soundID);
                SoundManager_1.SoundManager.PlaySound(sound);
            }
        }
    }
    exports.VActPlaySound = VActPlaySound;
});
//# sourceMappingURL=VActPlaySound.js.map