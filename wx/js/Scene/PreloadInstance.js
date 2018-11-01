import { Consts } from "../Consts";
export class PreloadInstance {
    static LoadPacket(mapID, playerInfos, completeHandler) {
        const urls = [];
        urls.push({ url: "res/ui/assets.bin", type: Laya.Loader.BUFFER });
        urls.push({ url: "res/ui/assets_atlas0.png", type: Laya.Loader.IMAGE });
        Laya.loader.load(urls, Laya.Handler.create(this, () => {
            fairygui.UIPackage.addPackage("res/ui/assets");
            this.LoadAssets(mapID, playerInfos, completeHandler);
        }));
    }
    static Load(mapID, playerInfos, completeHandler) {
        if (!this._init) {
            this.LoadPacket(mapID, playerInfos, completeHandler);
            this._init = true;
        }
        else
            this.LoadAssets(mapID, playerInfos, completeHandler);
    }
    static LoadAssets(mapID, playerInfos, completeHandler) {
        this.instances = new Map();
        const assetMapID = Consts.ASSETS_MAP_PREFIX + mapID;
        this.instances.set(assetMapID, fairygui.UIPackage.createObject("assets", assetMapID).asCom);
        let count = playerInfos.length;
        for (let i = 0; i < count; i++) {
            const playerInfo = playerInfos[i];
            const assetEntityID = Consts.ASSETS_ENTITY_PREFIX + playerInfo.actorID;
            this.instances.set(assetEntityID, fairygui.UIPackage.createObject("assets", assetEntityID).asCom);
        }
        completeHandler();
    }
    static Clear() {
        this.instances.clear();
    }
}
