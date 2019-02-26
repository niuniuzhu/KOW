import { Consts } from "../../Consts";
import Queue from "../../RC/Collections/Queue";
import { Sound } from "./Sound";

export class SoundManager {
	private static readonly GLOBAL_MAX_OVERLAY: number = 5;

	private static readonly ID_TO_OVERLAY = new Map<string, number>();
	private static readonly QUEUE = new Queue<Sound>();
	private static _playingNum: number = 0;

	public static PlayMusic(url: string, loops: number): void {
		Laya.SoundManager.playMusic(url, loops);
	}

	public static PlaySound(sound: Sound): boolean {
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

	public static Update(): void {
		while (this.QUEUE.size() > 0) {
			const sound = this.QUEUE.dequeue();
			const volume = Laya.SoundManager.soundVolume;
			Laya.SoundManager.soundVolume = sound.volume;
			Laya.SoundManager.playSound(Consts.SOUND_ASSET_NAME_PREFIX + sound.name, sound.loop ? 0 : 1);
			Laya.SoundManager.soundVolume = volume;

			let count = this.ID_TO_OVERLAY.get(sound.name);
			this.ID_TO_OVERLAY.set(sound.name, --count);
			--this._playingNum;
		}
	}
}