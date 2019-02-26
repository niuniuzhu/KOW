define(["require", "exports", "../../Consts", "../../RC/Collections/Queue"], function (require, exports, Consts_1, Queue_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SoundManager {
        static PlayMusic(url, loops) {
            Laya.SoundManager.playMusic(url, loops);
        }
        static PlaySound(sound) {
            if (this._playingNum == this.GLOBAL_MAX_OVERLAY)
                return false;
            if (!this.ID_TO_OVERLAY.has(sound.name)) {
                this.ID_TO_OVERLAY.set(sound.name, 0);
            }
            let count = this.ID_TO_OVERLAY.get(sound.name);
            if (count == sound.maxOverlay)
                return false;
            this.QUEUE.enqueue(sound);
            this.ID_TO_OVERLAY.set(sound.name, ++count);
            ++this._playingNum;
            return true;
        }
        static Update() {
            while (this.QUEUE.size() > 0) {
                const sound = this.QUEUE.dequeue();
                const volume = Laya.SoundManager.soundVolume;
                Laya.SoundManager.soundVolume = sound.volume;
                Laya.SoundManager.playSound(Consts_1.Consts.SOUND_ASSET_NAME_PREFIX + sound.name, sound.loop ? 0 : 1);
                Laya.SoundManager.soundVolume = volume;
                let count = this.ID_TO_OVERLAY.get(sound.name);
                this.ID_TO_OVERLAY.set(sound.name, --count);
                --this._playingNum;
            }
        }
    }
    SoundManager.GLOBAL_MAX_OVERLAY = 5;
    SoundManager.ID_TO_OVERLAY = new Map();
    SoundManager.QUEUE = new Queue_1.default();
    SoundManager._playingNum = 0;
    exports.SoundManager = SoundManager;
});
//# sourceMappingURL=SoundManager.js.map