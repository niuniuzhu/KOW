import { Consts } from "../../Consts";
import { BattleInfo } from "../BattleInfo";
import { Global } from "../../Global";
import { EventManager } from "../Events/EventManager";
import { SyncEvent } from "../Events/SyncEvent";
import { BaseEvent } from "../Events/BaseEvent";
import * as $protobuf from "../../Libs/protobufjs";
import { EntityType } from "../EntityType";
import { VEntity } from "./VEntity";
import { VChampion } from "./VChampion";

export class VBattle {
	private _root: fairygui.GComponent;

	private _logicFrame: number;
	private readonly _entities: VEntity[] = [];
	private readonly _idToEntity: Map<Long, VEntity> = new Map<Long, VEntity>();

	public Init(battleInfo: BattleInfo): void {
		EventManager.AddListener(SyncEvent.E_BATTLE_INIT, this.OnBattleInit.bind(this));
		EventManager.AddListener(SyncEvent.E_SNAPSHOT, this.OnSnapshot.bind(this));

		this._root = fairygui.UIPackage.createObject("assets", Consts.ASSETS_MAP_PREFIX + battleInfo.mapID).asCom;
		Global.graphic.battleRoot.addChild(this._root);
	}

	/**
	 * 战场结束
	 */
	public End(): void {
		EventManager.RemoveListener(SyncEvent.E_SNAPSHOT);
	}

	public Clear(): void {

	}

	public Update(dt: number): void {
	}

	private OnBattleInit(baseEvent: BaseEvent): void {
		const e = <SyncEvent>baseEvent;
		const reader = $protobuf.Reader.create(e.data);
		this._logicFrame = reader.int32();
		const count = reader.int32();
		for (let i = 0; i < count; i++) {
			const id = <Long>reader.uint64();

		}
	}

	private OnSnapshot(baseEvent: BaseEvent): void {
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
		}
		entity.Init(id, this);
		this._entities.push(entity);
		this._idToEntity.set(entity.id, entity);
		return entity;
	}
}