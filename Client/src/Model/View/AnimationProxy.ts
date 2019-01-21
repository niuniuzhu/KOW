import { Consts } from "../../Consts";
import { Vec2 } from "../../RC/Math/Vec2";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { CDefs } from "../CDefs";
import { VEntity } from "./VEntity";

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
	public size: Vec2;
}

export class AnimationProxy extends fairygui.GGraph {
	public get available(): boolean { return this._aniSettings != null && this._animation != null; }
	public get animation(): Laya.Animation { return this._animation; }

	private readonly _aniSettings = new Map<number, AnimationSetting>();
	private _animation: Laya.Animation;
	private _playingID: number = -1;

	constructor(owner: VEntity, id: number) {
		super();
		const def = CDefs.GetModel(id);
		const model = Consts.ASSETS_MODEL_PREFIX + id;
		const aniDefs = Hashtable.GetMapArray(def, "animations");
		if (aniDefs == null) {
			return;
		}
		for (const aniDef of aniDefs) {
			//创建图形
			const id = Hashtable.GetNumber(aniDef, "id");
			const alias = `${model}_${id}`;
			const aniName = Hashtable.GetString(aniDef, "name");
			const length = Hashtable.GetNumber(aniDef, "length");

			//todo 应该记录到缓存池,能按key读取
			//setting也保存到缓存池
			//计算所有graphic的大小,选取最大一个为该动画的大小
			let setting = owner.battle.assetsManager.GetAniSetting(alias);
			if (setting == null) {
				const startFrame = Hashtable.GetNumber(aniDef, "start_frame");
				const urls: string[] = [];
				for (let i = startFrame; i < length; ++i) {
					urls.push(`${model}/${aniName}${i}.png`);
				}
				//创建动画模板
				let mw: number = 0, mh: number = 0;
				const template: laya.display.Graphics[] = Laya.Animation.createFrames(urls, alias);
				for (const g of template) {
					const texture = <laya.resource.Texture>g._one[0];
					if (texture.sourceWidth > mw) {
						mw = texture.sourceWidth;
					}
					if (texture.sourceHeight > mh) {
						mh = texture.sourceHeight;
					}
				}
				setting = new AnimationSetting();
				setting.id = id;
				setting.alias = alias;
				setting.size = new Vec2(mw, mh);
				setting.playMode = Hashtable.GetNumber(aniDef, "play_mode");
				setting.length = length;
				setting.interval = Hashtable.GetNumber(aniDef, "interval");
				owner.battle.assetsManager.AddAniSetting(alias, setting);
			}
			this._aniSettings.set(id, owner.battle.assetsManager.GetAniSetting(alias));
		}

		this._animation = new Laya.Animation();
		// this._animation.autoSize = true;

		this.setPivot(0.5, 0.5, true);
		this.setNativeObject(this._animation);
		//计算所有graphic的大小,选取最大一个为该动画的大小
		// this.setSize(0, 0);
	}

	public GetSetting(id: number): AnimationSetting {
		return this._aniSettings.get(id);
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
		this.setSize(aniSetting.size.x, aniSetting.size.y);
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