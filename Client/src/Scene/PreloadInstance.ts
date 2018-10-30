import { Protos } from "../Libs/protos";

export class PreloadInstance {
	private static _init: boolean;

	public static instances: Map<string, fairygui.GComponent>;

	private static LoadPacket(mapID: number, playerInfos: Protos.ICS2GC_PlayerInfo[], completeHandler: () => void): void {
		let urls = [];
		urls.push({ url: "res/ui/assets.bin", type: Laya.Loader.BUFFER });
		urls.push({ url: "res/ui/assets_atlas0.png", type: Laya.Loader.IMAGE });
		Laya.loader.load(urls, Laya.Handler.create(this, () => {
			fairygui.UIPackage.addPackage("res/ui/assets");
			this.LoadAssets(mapID, playerInfos, completeHandler);
		}));
	}

	public static Load(mapID: number, playerInfos: Protos.ICS2GC_PlayerInfo[], completeHandler: () => void): void {
		if (!this._init) {
			this.LoadPacket(mapID, playerInfos, completeHandler);
			this._init = true;
		}
		this.LoadAssets(mapID, playerInfos, completeHandler);
	}

	private static LoadAssets(mapID: number, playerInfos: Protos.ICS2GC_PlayerInfo[], completeHandler: () => void): void {
		this.instances = new Map<string, fairygui.GComponent>();
		this.instances.set("map", fairygui.UIPackage.createObject("assets", "m" + mapID).asCom);
		let count = playerInfos.length;
		for (let i = 0; i < count; i++) {
			const playerInfo = playerInfos[i];
			this.instances.set("e" + playerInfo.actorID, fairygui.UIPackage.createObject("assets", "e" + playerInfo.actorID).asCom);
		}
		completeHandler();
	}

	public static Clear(): void {
		this.instances.clear();
	}
}