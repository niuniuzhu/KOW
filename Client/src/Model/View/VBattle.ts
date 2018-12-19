import { Consts } from "../../Consts";
import { Global } from "../../Global";
import * as $protobuf from "../../Libs/protobufjs";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { SyncEvent } from "../BattleEvent/SyncEvent";
import { UIEvent } from "../BattleEvent/UIEvent";
import { BattleInfo } from "../BattleInfo";
import { CDefs } from "../CDefs";
import { EntityType } from "../EntityType";
import { Camera } from "./Camera";
import { VChampion } from "./VChampion";
import { VEntity } from "./VEntity";

export class VBattle {
	private _mapID: number = 0;
	private _playerID: Long;
	private readonly _camera: Camera;
	private readonly _entities: VEntity[] = [];
	private readonly _idToEntity: Map<string, VEntity> = new Map<string, VEntity>();

	private _root: fairygui.GComponent;
	private _logicFrame: number;
	private _def: Hashtable;
	private _destroied: boolean = false;

	constructor() {
		this._camera = new Camera();
	}

	/**
	 * 设置战场信息
	 * @param battleInfo 战场信息
	 */
	public SetBattleInfo(battleInfo: BattleInfo): void {
		SyncEvent.AddListener(SyncEvent.E_BATTLE_INIT, this.OnBattleInit.bind(this));
		SyncEvent.AddListener(SyncEvent.E_SNAPSHOT, this.OnSnapshot.bind(this));

		this._destroied = false;
		this._mapID = battleInfo.mapID
		//加载配置
		this._def = CDefs.GetMap(this._mapID);

		this._camera.SetBounds(Hashtable.GetNumber(this._def, "width"), Hashtable.GetNumber(this._def, "height"));

		this._playerID = battleInfo.playerID;

		this._root = fairygui.UIPackage.createObject("assets", Consts.ASSETS_MAP_PREFIX + battleInfo.mapID).asCom;
		this._root.touchable = false;
		Global.graphic.mapRoot.addChild(this._root);
	}

	/**
	 * 战场结束
	 */
	public Destroy(): void {
		if (this._destroied)
			return;
		this._destroied = true;

		SyncEvent.RemoveListener(SyncEvent.E_BATTLE_INIT);
		SyncEvent.RemoveListener(SyncEvent.E_SNAPSHOT);

		const count = this._entities.length;
		for (let i = 0; i < count; ++i) {
			this._entities[i].Dispose();
		}
		this._entities.splice(0);
		this._idToEntity.clear();
		this._root.dispose();
		this._root = null;
		this._def = null;
		this._logicFrame = 0;
	}

	public Update(dt: number): void {
		//更新摄像机
		this._camera.Update(dt);

		const count = this._entities.length;
		for (let i = 0; i < count; i++) {
			const entity = this._entities[i];
			entity.Update(dt);
		}
	}

	/**
	 * 解码初始化快照
	 */
	public InitSnapshot(reader: $protobuf.Reader | $protobuf.BufferReader): void {
		this._logicFrame = reader.int32();
		const count = reader.int32();
		for (let i = 0; i < count; i++) {
			const type = <EntityType>reader.int32();
			const rid = <Long>reader.uint64();
			const entity = this.CreateEntity(type, rid);
			entity.InitSnapshot(reader);

			const isSelf = entity.id.equals(this._playerID);
			if (isSelf) {
				this._camera.lookAt = entity;
			}

			//通知UI创建实体
			UIEvent.EntityInit(entity, isSelf);
		}
	}

	/**
	 * 解码快照
	 */
	public DecodeSnapshot(reader: $protobuf.Reader | $protobuf.BufferReader): void {
		this._logicFrame = reader.int32();
		const count = reader.int32();
		for (let i = 0; i < count; i++) {
			const type = <EntityType>reader.int32();
			const rid = <Long>reader.uint64();
			const entity = this.GetEntity(rid);
			if (entity == null)
				continue;
			entity.DecodeSnapshot(reader);
		}
	}

	/**
	 * 创建实体
	 */
	public CreateEntity(type: EntityType, id: Long): VEntity {
		let entity: VEntity;
		switch (type) {
			case EntityType.Champion:
				entity = new VChampion();
				break;
			default:
				throw new Error("not supported entity type:" + type);
		}
		entity.Init(id, this);
		this._entities.push(entity);
		this._idToEntity.set(entity.id.toString(), entity);
		return entity;
	}

	/**
	 * 获取指定ID的实体
	 * @param rid 实体ID
	 */
	public GetEntity(rid: Long): VEntity {
		return this._idToEntity.get(rid.toString());
	}

	private OnBattleInit(e: SyncEvent): void {
		const reader = $protobuf.Reader.create(e.data);
		this.InitSnapshot(reader);
	}

	private OnSnapshot(e: SyncEvent): void {
		const reader = $protobuf.Reader.create(e.data);
		this.DecodeSnapshot(reader);
	}
}