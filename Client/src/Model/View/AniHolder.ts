import { Hashtable } from "../../RC/Utils/Hashtable";
import { Consts } from "../../Consts";

export enum AnimationMode {
	Loop,
	Clamp,
	Pingpong
}

export class AniHolder extends fairygui.GGraph {
	public get animation(): Laya.Animation { return this._animation; }
	public get aniName(): string { return this._aniName; }
	public get length(): number { return this._length; }
	public get aniMode(): AnimationMode { return this._aniMode; }
	public get scaleTime(): boolean { return this._scaleTime; }

	private _aniName: string;
	private _length: number;
	private _aniMode: AnimationMode;
	private _scaleTime: boolean;
	private _animation: Laya.Animation;

	constructor(actorID: number, def: Hashtable) {
		super();

		this._aniName = Hashtable.GetString(def, "name");
		this._length = Hashtable.GetNumber(def, "length");
		this._aniMode = Hashtable.GetNumber(def, "play_mode");
		this._scaleTime = Hashtable.GetBool(def, "auto_scale_time");

		//创建图形
		const urls: string[] = [];
		for (let i = 0; i < this._length; ++i) {
			urls.push((Consts.ASSETS_ENTITY_PREFIX + actorID) + "/" + this._aniName + i + ".png");
		}

		const roleAni = new Laya.Animation();
		roleAni.autoSize = true;
		roleAni.interval = 100;
		roleAni.loadImages(urls);

		this.setPivot(0.5, 0.5, true);
		this.setNativeObject(roleAni);
		this.setSize(roleAni.width, roleAni.height);

		this._animation = roleAni;
	}

	public Play(startFrame?: any): void {
		this._animation.play(startFrame, this._aniMode == AnimationMode.Loop);
	}

	public dispose(): void {
		this.animation.destroy();
		super.dispose();
	}
}