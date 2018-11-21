import { Consts } from "../../Consts";
import { CDefs } from "../CDefs";
import { Global } from "../../Global";
import * as $protobuf from "../../Libs/protobufjs";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { BattleInfo } from "../BattleInfo";
import { EntityType } from "../EntityType";
import { BaseEvent } from "../Events/BaseEvent";
import { EventManager } from "../Events/EventManager";
import { SyncEvent } from "../Events/SyncEvent";
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

	constructor() {
		this._camera = new Camera();
	}

	/**
	 * 设置战场信息
	 * @param battleInfo 战场信息
	 */
	public SetBattleInfo(battleInfo: BattleInfo): void {
		EventManager.AddListener(SyncEvent.E_BATTLE_INIT, this.OnBattleInit.bind(this));
		EventManager.AddListener(SyncEvent.E_SNAPSHOT, this.OnSnapshot.bind(this));

		this._mapID = battleInfo.mapID
		//加载配置
		this._def = CDefs.GetMap(Consts.ASSETS_MAP_PREFIX + this._mapID);

		this._camera.SetBounds(Hashtable.GetNumber(this._def, "width"), Hashtable.GetNumber(this._def, "height"));

		this._playerID = battleInfo.playerID;
		this._root = fairygui.UIPackage.createObject("assets", Consts.ASSETS_MAP_PREFIX + battleInfo.mapID).asCom;
		this._root.touchable = false;
		Global.graphic.mapRoot.addChild(this._root);
	}

	/**
	 * 战场结束
	 */
	public End(): void {
		EventManager.RemoveListener(SyncEvent.E_BATTLE_INIT);
		EventManager.RemoveListener(SyncEvent.E_SNAPSHOT);

		const count = this._entities.length;
		for (let i = 0; i < count; ++i) {
			this._entities[i].Dispose();
		}
		this._entities.splice(0);
		this._idToEntity.clear();
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
			const id = <Long>reader.uint64();
			const entity = this.CreateEntity(type, id);
			entity.InitSnapshot(reader);

			if (entity.id.equals(this._playerID)) {
				this._camera.lookAt = entity;
			}
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
			const id = <Long>reader.uint64();
			const entity = this.GetEntity(id.toString());
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
	 * @param id 实体ID
	 */
	public GetEntity(id: string): VEntity {
		return this._idToEntity.get(id);
	}

	private OnBattleInit(baseEvent: BaseEvent): void {
		const e = <SyncEvent>baseEvent;
		const reader = $protobuf.Reader.create(e.data);
		this.InitSnapshot(reader);
	}

	private OnSnapshot(baseEvent: BaseEvent): void {
		const e = <SyncEvent>baseEvent;
		const reader = $protobuf.Reader.create(e.data);
		this.DecodeSnapshot(reader);
	}
}