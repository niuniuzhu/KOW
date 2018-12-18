import { Hashtable } from "../../RC/Utils/Hashtable";
import { Consts } from "../../Consts";
import { CDefs } from "../CDefs";

enum PlayMode {
	Loop,
	Clamp,
	Pingpong
}

class AniSetting {
	public playMode: PlayMode;
	public scaleTime: boolean;
	public interval: number;
}

export class AniHolder extends fairygui.GGraph {
	public get animation(): Laya.Animation { return this._animation; }
	public get aniName(): string { return this._aniName; }
	public get length(): number { return this._length; }
	public get scaleTime(): boolean { return this._scaleTime; }

	private _aniName: string;
	private _length: number;
	private _scaleTime: boolean;
	private _animation: Laya.Animation;
	private readonly _aniSettings = new Map<string, AniSetting>();
	private _playingName: string = "";

	public Init(actorID: number) {
		const aniDefs = Hashtable.GetMapArray(CDefs.GetEntity(actorID), "animations");
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
			const aniSetting = new AniSetting();
			aniSetting.playMode = Hashtable.GetNumber(aniDef, "play_mode");
			aniSetting.scaleTime = Hashtable.GetBool(aniDef, "auto_scale_time");
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

	public Play(name: string, startFrame: number, force: boolean = false): void {
		if (!force && this._playingName == name)
			return;
		this._playingName = name;
		const aniSetting = this._aniSettings.get(name);
		this._animation.interval = aniSetting.interval;
		this._animation.play(startFrame, aniSetting.playMode == PlayMode.Loop, name);
		this.setSize(this._animation.width, this._animation.height);
	}

	public dispose(): void {
		this.animation.destroy();
		super.dispose();
	}
}