import { AssetsManager, AssetType, IUrlDesc } from "../../AssetsManager";
import { Consts } from "../../Consts";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { BattleInfo } from "../BattleInfo";
import { CDefs } from "../CDefs";
import { AnimationSetting } from "./AnimationProxy";

/**
 * 战场资源管理器
 */
export class BattleAssetsMgr {
	private readonly assetsPath: IUrlDesc[] = [];
	private readonly _aniSettingPool = new Map<string, AnimationSetting>();

	public Destroy(): void {
		for (const path of this.assetsPath) {
			Laya.loader.clearRes(path.url);
		}
		this.assetsPath.splice(0);
		this._aniSettingPool.clear();
	}
	/**
	 * 读取资源载入内存
	 */
	public Preload(battleInfo: BattleInfo, caller: any, onComplete: () => void, onProgress: (p: number) => void): void {
		//获取场景预加载资源路径
		const mapDef = CDefs.GetMap(battleInfo.mapID);
		const preloads = Hashtable.GetStringArray(mapDef, "preloads");
		for (const u of preloads) {
			const ss = u.split(",");
			this.assetsPath.push({ url: "res/" + ss[0], type: Number.parseInt(ss[1]) });
		}
		//压入角色资源
		const c1 = battleInfo.teamInfos.length;
		for (let i = 0; i < c1; ++i) {
			const playerInfos = battleInfo.teamInfos[i].playerInfos;
			const c2 = playerInfos.length;
			for (let j = 0; j < c2; ++j) {
				const playerInfo = playerInfos[j];
				this.assetsPath.push({ url: "res/roles/" + Consts.ASSETS_MODEL_PREFIX + playerInfo.actorID + ".atlas", type: AssetType.Atlas });
			}
		}

		//压入地图资源
		this.assetsPath.push({ url: "res/ui/assets.bin", type: AssetType.Binary });
		this.assetsPath.push({ url: "res/ui/assets_atlas0.png", type: AssetType.Image });

		AssetsManager.LoadBatch(this.assetsPath, caller, onComplete, onProgress);
	}

	public AddAniSetting(name: string, setting: AnimationSetting): void {
		this._aniSettingPool.set(name, setting);
	}

	public GetAniSetting(name: string): AnimationSetting {
		return this._aniSettingPool.get(name);
	}

	public HasAniSetting(name: string): boolean {
		return this._aniSettingPool.has(name);
	}
}