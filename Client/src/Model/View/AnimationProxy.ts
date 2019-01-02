import { Hashtable } from "../../RC/Utils/Hashtable";

export enum AnimationPlayMode {
	Loop,
	Clamp,
	Pingpong
}

export class AnimationSetting {
	public id: number;
	public alias: string;
	public playMode: AnimationPlayMode;
	public length: number;
	public interval: number;
}

export class AnimationProxy extends fairygui.GGraph {
	public static readonly TEMPLATE_CACHE = new Set<string>();

	public get available(): boolean { return this._aniSettings != null && this._animation != null; }
	public get animation(): Laya.Animation { return this._animation; }

	private readonly _aniSettings = new Map<number, AnimationSetting>();
	private _animation: Laya.Animation;
	private _playingID: number = -1;

	public Init(def: Hashtable) {
		const model = Hashtable.GetString(def, "model");
		if (model == null) {
			return;
		}
		const aniDefs = Hashtable.GetMapArray(def, "animations");
		if (aniDefs == null) {
			return;
		}
		for (const aniDef of aniDefs) {
			//创建图形
			const id = Hashtable.GetNumber(aniDef, "id");
			const aniName = Hashtable.GetString(aniDef, "name");
			const alias = `${model}_${id}`;

			if (!AnimationProxy.TEMPLATE_CACHE.has(alias)) {
				const startFrame = Hashtable.GetNumber(aniDef, "start_frame");
				const length = Hashtable.GetNumber(aniDef, "length");
				const urls: string[] = [];
				for (let i = startFrame; i < length; ++i) {
					urls.push(`${model}/${aniName}${i}.png`);
				}
				//创建动画模板
				Laya.Animation.createFrames(urls, alias);
				AnimationProxy.TEMPLATE_CACHE.add(alias);
			}

			const aniSetting = new AnimationSetting();
			aniSetting.id = id;
			aniSetting.alias = alias;
			aniSetting.playMode = Hashtable.GetNumber(aniDef, "play_mode");
			aniSetting.length = length;
			aniSetting.interval = Hashtable.GetNumber(aniDef, "interval");
			this._aniSettings.set(id, aniSetting);
		}

		const roleAni = new Laya.Animation();
		roleAni.autoSize = true;

		this.setPivot(0.5, 0.5, true);
		this.setNativeObject(roleAni);
		this.setSize(roleAni.width, roleAni.height);

		this._animation = roleAni;

		const dAnimation = Hashtable.GetNumber(def, "defaule_animation");
		if (dAnimation != null) {
			this.Play(dAnimation, 0);
		}
	}

	/**
	 * 播放动画
	 * @param id 动画id
	 * @param startFrame 开始帧数
	 * @param timeScale 时间缩放
	 * @param force 是否强制重新播放
	 */
	public Play(id: number, startFrame: number, timeScale: number = 1, force: boolean = false): void {
		if (!this.available)
			return;
		if (!force && this._playingID == id)
			return;
		this._playingID = id;
		const aniSetting = this.GetAnimationSetting(id);
		this._animation.interval = aniSetting.interval * timeScale;
		this._animation.play(startFrame, aniSetting.playMode == AnimationPlayMode.Loop, aniSetting.alias);
		this.setSize(this._animation.width, this._animation.height);
	}

	public GetAnimationSetting(id: number): AnimationSetting {
		if (!this.available)
			return null;
		return this._aniSettings.get(id);
	}

	public dispose(): void {
		if (this._animation != null)
			this._animation.destroy();
		super.dispose();
	}
}