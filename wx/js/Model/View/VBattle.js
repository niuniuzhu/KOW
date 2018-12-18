import { Consts } from "../../Consts";
import { Global } from "../../Global";
import * as $protobuf from "../../Libs/protobufjs";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { SyncEvent } from "../BattleEvent/SyncEvent";
import { UIEvent } from "../BattleEvent/UIEvent";
import { CDefs } from "../CDefs";
import { EntityType } from "../EntityType";
import { Camera } from "./Camera";
import { VChampion } from "./VChampion";
export class VBattle {
    constructor() {
        this._mapID = 0;
        this._entities = [];
        this._idToEntity = new Map();
        this._destroied = false;
        this._camera = new Camera();
    }
    SetBattleInfo(battleInfo) {
        SyncEvent.AddListener(SyncEvent.E_BATTLE_INIT, this.OnBattleInit.bind(this));
        SyncEvent.AddListener(SyncEvent.E_SNAPSHOT, this.OnSnapshot.bind(this));
        this._destroied = false;
        this._mapID = battleInfo.mapID;
        this._def = CDefs.GetMap(this._mapID);
        this._camera.SetBounds(Hashtable.GetNumber(this._def, "width"), Hashtable.GetNumber(this._def, "height"));
        this._playerID = battleInfo.playerID;
        this._root = fairygui.UIPackage.createObject("assets", Consts.ASSETS_MAP_PREFIX + battleInfo.mapID).asCom;
        this._root.touchable = false;
        Global.graphic.mapRoot.addChild(this._root);
    }
    Destroy() {
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
    Update(dt) {
        this._camera.Update(dt);
        const count = this._entities.length;
        for (let i = 0; i < count; i++) {
            const entity = this._entities[i];
            entity.Update(dt);
        }
    }
    InitSnapshot(reader) {
        this._logicFrame = reader.int32();
        const count = reader.int32();
        for (let i = 0; i < count; i++) {
            const type = reader.int32();
            const id = reader.uint64();
            const entity = this.CreateEntity(type, id);
            entity.InitSnapshot(reader);
            const isSelf = entity.id.equals(this._playerID);
            if (isSelf) {
                this._camera.lookAt = entity;
            }
            UIEvent.EntityInit(entity, isSelf);
        }
    }
    DecodeSnapshot(reader) {
        this._logicFrame = reader.int32();
        const count = reader.int32();
        for (let i = 0; i < count; i++) {
            const type = reader.int32();
            const id = reader.uint64();
            const entity = this.GetEntity(id.toString());
            if (entity == null)
                continue;
            entity.DecodeSnapshot(reader);
        }
    }
    CreateEntity(type, id) {
        let entity;
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
    GetEntity(id) {
        return this._idToEntity.get(id);
    }
    OnBattleInit(e) {
        const reader = $protobuf.Reader.create(e.data);
        this.InitSnapshot(reader);
    }
    OnSnapshot(e) {
        const reader = $protobuf.Reader.create(e.data);
        this.DecodeSnapshot(reader);
    }
}
