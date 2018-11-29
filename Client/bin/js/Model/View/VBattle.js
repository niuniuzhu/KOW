define(["require", "exports", "../../Consts", "../CDefs", "../../Global", "../../Libs/protobufjs", "../../RC/Utils/Hashtable", "../EntityType", "../Events/EventManager", "../Events/SyncEvent", "./Camera", "./VChampion"], function (require, exports, Consts_1, CDefs_1, Global_1, $protobuf, Hashtable_1, EntityType_1, EventManager_1, SyncEvent_1, Camera_1, VChampion_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class VBattle {
        constructor() {
            this._mapID = 0;
            this._entities = [];
            this._idToEntity = new Map();
            this._destroied = false;
            this._camera = new Camera_1.Camera();
        }
        SetBattleInfo(battleInfo) {
            EventManager_1.EventManager.AddListener(SyncEvent_1.SyncEvent.E_BATTLE_INIT, this.OnBattleInit.bind(this));
            EventManager_1.EventManager.AddListener(SyncEvent_1.SyncEvent.E_SNAPSHOT, this.OnSnapshot.bind(this));
            this._destroied = false;
            this._mapID = battleInfo.mapID;
            this._def = CDefs_1.CDefs.GetMap(this._mapID);
            this._camera.SetBounds(Hashtable_1.Hashtable.GetNumber(this._def, "width"), Hashtable_1.Hashtable.GetNumber(this._def, "height"));
            this._playerID = battleInfo.playerID;
            this._root = fairygui.UIPackage.createObject("assets", Consts_1.Consts.ASSETS_MAP_PREFIX + battleInfo.mapID).asCom;
            this._root.touchable = false;
            Global_1.Global.graphic.mapRoot.addChild(this._root);
        }
        Destroy() {
            if (this._destroied)
                return;
            this._destroied = true;
            EventManager_1.EventManager.RemoveListener(SyncEvent_1.SyncEvent.E_BATTLE_INIT);
            EventManager_1.EventManager.RemoveListener(SyncEvent_1.SyncEvent.E_SNAPSHOT);
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
                if (entity.id.equals(this._playerID)) {
                    this._camera.lookAt = entity;
                }
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
                case EntityType_1.EntityType.Champion:
                    entity = new VChampion_1.VChampion();
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
        OnBattleInit(baseEvent) {
            const e = baseEvent;
            const reader = $protobuf.Reader.create(e.data);
            this.InitSnapshot(reader);
        }
        OnSnapshot(baseEvent) {
            const e = baseEvent;
            const reader = $protobuf.Reader.create(e.data);
            this.DecodeSnapshot(reader);
        }
    }
    exports.VBattle = VBattle;
});
//# sourceMappingURL=VBattle.js.map