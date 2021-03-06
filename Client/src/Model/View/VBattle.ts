import { Consts } from "../../Consts";
import { Global } from "../../Global";
import * as $protobuf from "../../Libs/protobufjs";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { SyncEvent } from "../BattleEvent/SyncEvent";
import { BattleInfo } from "../BattleInfo";
import { Defs } from "../Defs";
import { EntityType } from "../EntityType";
import { BattleAssetsMgr } from "./BattleAssetsMgr";
import { Camera } from "./Camera";
import { EffectPool } from "./EffectPool";
import { VBullet } from "./VBullet";
import { VChampion } from "./VChampion";
import { VEffect } from "./VEffect";
import { VSceneItem } from "./VSceneItem";
import { VTeam } from "./VTeam";

export class VBattle {
	private _mapID: number = 0;
	private _player: VChampion;
	private readonly _camera: Camera = new Camera();
	private readonly _assetsManager: BattleAssetsMgr = new BattleAssetsMgr();
	/**
	 * 特效资源池
	 */
	private readonly _effectPool: EffectPool;
	private readonly _teams: VTeam[] = [];
	private readonly _champions: VChampion[] = [];
	private readonly _idToChampion: Map<string, VChampion> = new Map<string, VChampion>();
	private readonly _bullets: VBullet[] = [];
	private readonly _idToBullet: Map<string, VBullet> = new Map<string, VBullet>();
	private readonly _effects: VEffect[] = [];
	private readonly _items: VSceneItem[] = [];
	private readonly _idToItem: Map<string, VSceneItem> = new Map<string, VSceneItem>();

	private _root: fairygui.GComponent;
	private _logicFrame: number;
	private _destroied: boolean = true;

	/**
	 * 地图ID
	 */
	public get mapID(): number { return this._mapID; }
	/**
	 * 主控
	 */
	public get player(): VChampion { return this._player; }
	/**
	 * 虚拟摄像机
	 */
	public get camera(): Camera { return this._camera; }
	/**
	 * 战场资源管理器
	 */
	public get assetsManager(): BattleAssetsMgr { return this._assetsManager; }

	constructor() {
		this._effectPool = new EffectPool(this);
	}

	/**
	 * 战场结束
	 */
	public Destroy(): void {
		if (this._destroied)
			return;
		this._destroied = true;

		SyncEvent.RemoveListener(SyncEvent.E_BATTLE_INIT);
		SyncEvent.RemoveListener(SyncEvent.E_ENTITY_CREATED);
		SyncEvent.RemoveListener(SyncEvent.E_SNAPSHOT);
		SyncEvent.RemoveListener(SyncEvent.E_HIT);
		SyncEvent.RemoveListener(SyncEvent.E_BULLET_COLLISION);
		SyncEvent.RemoveListener(SyncEvent.E_SCENE_ITEM_COLLISION);
		SyncEvent.RemoveListener(SyncEvent.E_SCENE_ITEM_TRIGGER);

		//destroy champions
		for (let i = 0, count = this._champions.length; i < count; ++i) {
			this._champions[i].Destroy();
		}
		this._champions.splice(0);
		this._idToChampion.clear();
		this._teams.splice(0);

		//destroy bullets
		for (let i = 0, count = this._bullets.length; i < count; ++i) {
			this._bullets[i].Destroy();
		}
		this._bullets.splice(0);
		this._idToBullet.clear();

		//destroy items
		for (let i = 0, count = this._items.length; i < count; ++i) {
			this._items[i].Destroy();
		}
		this._items.splice(0);
		this._idToItem.clear();

		//destroy effects
		for (let i = 0, count = this._effects.length; i < count; ++i) {
			this._effectPool.Release(this._effects[i]);
		}
		this._effects.splice(0);
		this._effectPool.Dispose();

		this._root.dispose();
		this._root = null;
		this._logicFrame = 0;

		this._assetsManager.Destroy();
	}

	/**
	 * 预加载资源前调用
	 */
	public Preload(battleInfo: BattleInfo, caller: any, onComplete: () => void, onProgress: (p: number) => void): void {
		this._assetsManager.Preload(battleInfo, caller, onComplete, onProgress);
	}

	/**
	 * 设置战场信息,资源预加载后调用
	 * @param battleInfo 战场信息
	 */
	public SetBattleInfo(battleInfo: BattleInfo): void {
		SyncEvent.AddListener(SyncEvent.E_BATTLE_INIT, this.OnBattleInit.bind(this));
		SyncEvent.AddListener(SyncEvent.E_ENTITY_CREATED, this.OnEntityCreated.bind(this));
		SyncEvent.AddListener(SyncEvent.E_SNAPSHOT, this.OnSnapshot.bind(this));
		SyncEvent.AddListener(SyncEvent.E_HIT, this.OnHit.bind(this));
		SyncEvent.AddListener(SyncEvent.E_BULLET_COLLISION, this.OnBulletCollision.bind(this));
		SyncEvent.AddListener(SyncEvent.E_SCENE_ITEM_COLLISION, this.OnItemCollision.bind(this));
		SyncEvent.AddListener(SyncEvent.E_SCENE_ITEM_TRIGGER, this.OnItemTrigger.bind(this));

		this._destroied = false;
		this._mapID = battleInfo.mapID
		//加载配置
		const def = Defs.GetMap(this._mapID);

		this._camera.SetBounds(Hashtable.GetNumber(def, "width") * Consts.LOGIC_TO_PIXEL_RATIO,
			Hashtable.GetNumber(def, "height") * Consts.LOGIC_TO_PIXEL_RATIO);

		fairygui.UIPackage.addPackage("res/ui/assets");
		this._root = fairygui.UIPackage.createObject("assets", Consts.ASSETS_MAP_PREFIX + battleInfo.mapID).asCom;
		this._root.touchable = false;
		this._root.displayObject.cacheAs = "bitmap";
		this._root.displayObject.staticCache = true;
		Global.graphic.mapRoot.addChild(this._root);
	}

	public Update(dt: number): void {
		//更新摄像机
		this._camera.Update(dt);

		//update items
		for (let i = 0, count = this._items.length; i < count; i++) {
			const item = this._items[i];
			item.Update(dt);
		}

		//update effects
		for (let i = 0, count = this._effects.length; i < count; i++) {
			const effect = this._effects[i];
			effect.Update(dt);
		}

		//update champions
		for (let i = 0, count = this._champions.length; i < count; i++) {
			const champion = this._champions[i];
			champion.Update(dt);
		}

		//update bullets
		for (let i = 0, count = this._bullets.length; i < count; i++) {
			const bullet = this._bullets[i];
			bullet.Update(dt);
		}

		//destroy champions
		for (let i = 0, count = this._champions.length; i < count; i++) {
			const champion = this._champions[i];
			if (champion.markToDestroy) {
				this.DestroyChampionAt(i);
				--i;
				--count;
			}
		}

		//destroy bullets
		for (let i = 0, count = this._bullets.length; i < count; i++) {
			const bullet = this._bullets[i];
			if (bullet.markToDestroy) {
				this.DestroyBulletAt(i);
				--i;
				--count;
			}
		}

		//destroy effects
		for (let i = 0, count = this._effects.length; i < count; i++) {
			const effect = this._effects[i];
			if (effect.markToDestroy) {
				this.DespawnEffectAt(i);
				--i;
				--count;
			}
		}

		//destroy items
		for (let i = 0, count = this._items.length; i < count; i++) {
			const item = this._items[i];
			if (item.markToDestroy) {
				this.DestroySceneItemAt(i);
				--i;
				--count;
			}
		}
	}

	/**
	 * 解码同步数据
	 */
	public DecodeSync(reader: $protobuf.Reader | $protobuf.BufferReader): void {
		this._logicFrame = reader.int32();

		//teams
		let count = reader.int32();
		for (let i = 0; i < count; i++) {
			const id = reader.int32();
			let team = this.GetTeam(id);
			if (team == null) {
				team = new VTeam();
			}
			team.DecodeSync(id, reader);
		}

		//champions
		count = reader.int32();
		for (let i = 0; i < count; i++) {
			const rid = <Long>reader.uint64();
			let champion = this.GetChampion(rid);
			if (champion == null) {
				champion = this.CreateChampion(rid, reader);
			}
			else {
				champion.DecodeSync(rid, reader, false);
			}
		}

		//bullets
		count = reader.int32();
		for (let i = 0; i < count; i++) {
			const rid = <Long>reader.uint64();
			let bullet = this.GetBullet(rid);
			if (bullet == null) {
				bullet = this.CreateBullet(rid, reader);
			}
			else {
				bullet.DecodeSync(rid, reader, false);
			}
		}

		//sceneitems
		count = reader.int32();
		for (let i = 0; i < count; i++) {
			const rid = <Long>reader.uint64();
			let item = this.GetSceneItem(rid);
			if (item == null) {
				item = this.CreateSceneItem(rid, reader);
			}
			else {
				item.DecodeSync(rid, reader, false);
			}
		}
	}

	/**
	 * 创建战士
	 */
	public CreateChampion(rid: Long, reader: $protobuf.Reader | $protobuf.BufferReader): VChampion {
		const champion = new VChampion(this);
		champion.DecodeSync(rid, reader, true);
		this._champions.push(champion);
		this._idToChampion.set(champion.rid.toString(), champion);
		if (champion.self) {
			this._camera.lookAt = champion;
			this._camera.UpdatePos();
		}
		else{
			champion.ShowDecal();
		}
		return champion;
	}

	/**
	 * 销毁战士
	 */
	public DestroyChampion(champion: VChampion): void {
		champion.Destroy();
		this._champions.splice(this._champions.indexOf(champion), 1);
		this._idToChampion.delete(champion.rid.toString());
	}

	/**
	 * 销毁战士
	 */
	private DestroyChampionAt(index: number): void {
		const champion = this._champions[index];
		champion.Destroy();
		this._champions.splice(index, 1);
		this._idToChampion.delete(champion.rid.toString());
	}

	/**
	 * 获取指定rid的战士
	 */
	public GetChampion(rid: Long): VChampion {
		return this._idToChampion.get(rid.toString());
	}

	/**
	 * 获取指定id队伍
	 * @param id 队伍id
	 */
	public GetTeam(id: number): VTeam {
		return this._teams[id];
	}

	/**
	 * 创建子弹
	 */
	public CreateBullet(rid: Long, reader: $protobuf.Reader | $protobuf.BufferReader): VBullet {
		const bullet = new VBullet(this);
		bullet.DecodeSync(rid, reader, true);
		this._bullets.push(bullet);
		this._idToBullet.set(bullet.rid.toString(), bullet);
		return bullet;
	}

	/**
	 * 销毁子弹
	 */
	public DestroyBullet(bullet: VBullet): void {
		bullet.Destroy();
		this._bullets.splice(this._bullets.indexOf(bullet), 1);
		this._idToBullet.delete(bullet.rid.toString());
	}

	/**
	 * 销毁子弹
	 */
	private DestroyBulletAt(index: number): void {
		const bullet = this._bullets[index];
		bullet.Destroy();
		this._bullets.splice(index, 1);
		this._idToBullet.delete(bullet.rid.toString());
	}

	/**
	 * 获取指定rid的子弹
	 */
	public GetBullet(rid: Long): VBullet {
		return this._idToBullet.get(rid.toString());
	}

	public CreateSceneItem(rid: Long, reader: $protobuf.Reader | $protobuf.BufferReader): VSceneItem {
		const item = new VSceneItem(this);
		item.DecodeSync(rid, reader, true);
		this._items.push(item);
		this._idToItem.set(item.rid.toString(), item);
		return item;
	}

	/**
	 * 销毁场景物品
	 */
	public DestroySceneItem(sceneItem: VSceneItem): void {
		sceneItem.Destroy();
		this._items.splice(this._items.indexOf(sceneItem), 1);
		this._idToItem.delete(sceneItem.rid.toString());
	}

	/**
	 * 销毁场景物品
	 */
	private DestroySceneItemAt(index: number): void {
		const item = this._items[index];
		item.Destroy();
		this._items.splice(index, 1);
		this._idToItem.delete(item.rid.toString());
	}

	/**
	 * 获取指定rid的场景物品
	 */
	public GetSceneItem(rid: Long): VSceneItem {
		return this._idToItem.get(rid.toString());
	}

	public SpawnEffect(id: number): VEffect {
		const effect = this._effectPool.Get(id);
		this._effects.push(effect);
		return effect;
	}

	public DespawnEffect(fx: VEffect): void {
		this._effects.splice(this._effects.indexOf(fx), 1);
		this._effectPool.Release(fx);
	}

	public DespawnEffectAt(index: number): void {
		const fx = this._effects[index];
		this._effects.splice(index, 1);
		this._effectPool.Release(fx);
	}

	private OnBattleInit(e: SyncEvent): void {
		const reader = $protobuf.Reader.create(e.data);
		this.DecodeSync(reader);
	}

	private OnEntityCreated(e: SyncEvent): void {
		const reader = $protobuf.Reader.create(e.data);
		const rid = <Long>reader.uint64();
		switch (e.entityType) {
			case EntityType.Champion:
				this.CreateChampion(rid, reader);
				break;
			case EntityType.Bullet:
				this.CreateBullet(rid, reader);
				break;
			case EntityType.SceneItem:
				this.CreateSceneItem(rid, reader);
				break;
		}
	}

	private OnSnapshot(e: SyncEvent): void {
		const reader = $protobuf.Reader.create(e.data);
		this.DecodeSync(reader);
	}

	private OnHit(e: SyncEvent): void {
		const target = this.GetChampion(e.rid1);
		target.hud.PopText(e.v0);
	}

	private OnItemCollision(e: SyncEvent): void {
	}

	private OnItemTrigger(e: SyncEvent): void {
	}

	private OnBulletCollision(e: SyncEvent): void {
		const bullet = this.GetBullet(e.rid0);
		const caster = this.GetChampion(e.rid1);
		const target = this.GetChampion(e.rid2);
		bullet.OnCollision(caster, target);
	}
}