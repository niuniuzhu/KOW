export enum AssetType {
	Text,
	Json,
	Xml,
	Binary,
	Image,
	Sound,
	Font,
	Atlas
}

/**
 * 资源路径描述接口
 */
export interface IUrlDesc {
	url: string;
	type: AssetType;
}

/**
 * 资源路径描述接口
 */
export interface IUrlDesc2 {
	url: string;
	type: string;
}

/**
 * 资源管理器
 * 由于laya已经有缓存机制,这里就只封装一下api好了
 */
export class AssetsManager {
	public static Load(url: string, type: AssetType, caller: any, completeHandler?: () => void, progressHandler?: (p: number) => void): void {
		const strType = this.ConvertType(type);
		Laya.loader.load(url, completeHandler ? Laya.Handler.create(caller, completeHandler) : null, progressHandler ? new Laya.Handler(caller, progressHandler) : null, strType, 0, true);
	}

	public static LoadUIPacket(name: string, atlasCount: number = 1, caller: any, completeHandler?: () => void, progressHandler?: (p: number) => void): void {
		const urls: IUrlDesc[] = [];
		urls.push({ url: `res/ui/${name}.bin`, type: AssetType.Binary });
		for (let i = 0; i < atlasCount; ++i) {
			urls.push({ url: `res/ui/${name}_atlas${i}.png`, type: AssetType.Image });
		}
		this.LoadBatch(urls, caller, completeHandler, progressHandler);
	}

	public static LoadBatch(batch: IUrlDesc[], caller: any, completeHandler?: () => void, progressHandler?: (p: number) => void): void {
		const urls: IUrlDesc2[] = [];
		for (const item of batch) {
			urls.push({ url: item.url, type: this.ConvertType(item.type) });
		}
		this.LoadBatchStr(urls, caller, completeHandler, progressHandler);
	}

	public static LoadBatchStr(batch: IUrlDesc2[], caller: any, completeHandler?: () => void, progressHandler?: (p: number) => void): void {
		Laya.loader.load(batch, completeHandler ? Laya.Handler.create(caller, completeHandler) : null, progressHandler ? new Laya.Handler(caller, progressHandler) : null);
	}

	private static ConvertType(type: AssetType): string {
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