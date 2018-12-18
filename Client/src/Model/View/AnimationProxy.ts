import { Consts } from "../../Consts";
import { Hashtable } from "../../RC/Utils/Hashtable";

export enum AnimationPlayMode {
	Loop,
	Clamp,
	Pingpong
}

export class AnimationSetting {
	public playMode: AnimationPlayMode;
	public length: number;
	public interval: number;
}

export class AnimationProxy extends fairygui.GGraph {
	public get animation(): Laya.Animation { return this._animation; }

	private readonly _aniSettings = new Map<string, AnimationSetting>();
	private _animation: Laya.Animation;
	private _playingName: string = "";

	public Init(actorID: number, def: Hashtable) {
		const aniDefs = Hashtable.GetMapArray(def, "animations");
		for (const aniDef of aniDefs) {
			//创建图形
			const aniName = Hashtable.GetString(aniDef, "name");
			const length = Hashtable.GetNumber(aniDef, "length");
			const urls: string[] = [];
			for (let i = 0; i < length; ++i) {
				urls.push((Consts.ASSETS_ENTITY_PREFIX + actorID) + "/" + aniName + i + ".png");
			}
			//创建动画模板
			Laya.Animation.createFrames(urls, aniName);
			const aniSetting = new AnimationSetting();
			aniSetting.playMode = Hashtable.GetNumber(aniDef, "play_mode");
			aniSetting.length = length;
			aniSetting.interval = Hashtable.GetNumber(aniDef, "interval");
			this._aniSettings.set(aniName, aniSetting);
		}

		const roleAni = new Laya.Animation();
		roleAni.autoSize = true;

		this.setPivot(0.5, 0.5, true);
		this.setNativeObject(roleAni);
		this.setSize(roleAni.width, roleAni.height);

		this._animation = roleAni;
	}

	public Play(name: string, startFrame: number, timeScale: number = 1, force: boolean = false): void {
		if (!force && this._playingName == name)
			return;
		this._playingName = name;
		const aniSetting = this.GetAnimationSetting(name);
		this._animation.interval = aniSetting.interval * timeScale;
		this._animation.play(startFrame, aniSetting.playMode == AnimationPlayMode.Loop, name);
		this.setSize(this._animation.width, this._animation.height);
	}

	public GetAnimationSetting(name: string): AnimationSetting {
		return this._aniSettings.get(name);
	}

	public dispose(): void {
		this.animation.destroy();
		super.dispose();
	}
}