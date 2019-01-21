"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AssetType;
(function (AssetType) {
    AssetType[AssetType["Text"] = 0] = "Text";
    AssetType[AssetType["Json"] = 1] = "Json";
    AssetType[AssetType["Xml"] = 2] = "Xml";
    AssetType[AssetType["Binary"] = 3] = "Binary";
    AssetType[AssetType["Image"] = 4] = "Image";
    AssetType[AssetType["Sound"] = 5] = "Sound";
    AssetType[AssetType["Font"] = 6] = "Font";
    AssetType[AssetType["Atlas"] = 7] = "Atlas";
})(AssetType = exports.AssetType || (exports.AssetType = {}));
class AssetsManager {
    static Load(url, type, caller, completeHandler, progressHandler) {
        const strType = this.ConvertType(type);
        Laya.loader.load(url, completeHandler ? Laya.Handler.create(caller, completeHandler) : null, progressHandler ? new Laya.Handler(caller, progressHandler) : null, strType, 0, true);
    }
    static LoadUIPacket(name, atlasCount = 1, caller, completeHandler, progressHandler) {
        const urls = [];
        urls.push({ url: `res/ui/${name}.bin`, type: AssetType.Binary });
        for (let i = 0; i < atlasCount; ++i) {
            urls.push({ url: `res/ui/${name}_atlas${i}.png`, type: AssetType.Image });
        }
        this.LoadBatch(urls, caller, completeHandler, progressHandler);
    }
    static LoadBatch(batch, caller, completeHandler, progressHandler) {
        const urls = [];
        for (const item of batch) {
            urls.push({ url: item.url, type: this.ConvertType(item.type) });
        }
        this.LoadBatchStr(urls, caller, completeHandler, progressHandler);
    }
    static LoadBatchStr(batch, caller, completeHandler, progressHandler) {
        Laya.loader.load(batch, completeHandler ? Laya.Handler.create(caller, completeHandler) : null, progressHandler ? new Laya.Handler(caller, progressHandler) : null);
    }
    static ConvertType(type) {
        switch (type) {
            case AssetType.Text:
                return Laya.Loader.TEXT;
            case AssetType.Json:
                return Laya.Loader.JSON;
            case AssetType.Xml:
                return Laya.Loader.XML;
            case AssetType.Binary:
                return Laya.Loader.BUFFER;
            case AssetType.Image:
                return Laya.Loader.IMAGE;
            case AssetType.Sound:
                return Laya.Loader.SOUND;
            case AssetType.Font:
                return Laya.Loader.FONT;
            case AssetType.Atlas:
                return Laya.Loader.ATLAS;
        }
    }
}
exports.AssetsManager = AssetsManager;
