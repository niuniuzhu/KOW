define(["require", "exports", "../../Consts", "../../Global", "../Events/EventManager", "../Events/SyncEvent", "../../Libs/protobufjs", "../EntityType", "./VChampion"], function (require, exports, Consts_1, Global_1, EventManager_1, SyncEvent_1, $protobuf, EntityType_1, VChampion_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class VBattle {
        constructor() {
            this._entities = [];
            this._idToEntity = new Map();
        }
        Init(battleInfo) {
            EventManager_1.EventManager.AddListener(SyncEvent_1.SyncEvent.E_BATTLE_INIT, this.OnBattleInit.bind(this));
            EventManager_1.EventManager.AddListener(SyncEvent_1.SyncEvent.E_SNAPSHOT, this.OnSnapshot.bind(this));
            this._root = fairygui.UIPackage.createObject("assets", Consts_1.Consts.ASSETS_MAP_PREFIX + battleInfo.mapID).asCom;
            Global_1.Global.graphic.battleRoot.addChild(this._root);
        }
        End() {
            EventManager_1.EventManager.RemoveListener(SyncEvent_1.SyncEvent.E_SNAPSHOT);
        }
        Clear() {
        }
        Update(dt) {
        }
        OnBattleInit(baseEvent) {
            const e = baseEvent;
            const reader = $protobuf.Reader.create(e.data);
            this._logicFrame = reader.int32();
            const count = reader.int32();
            for (let i = 0; i < count; i++) {
                const id = reader.uint64();
            }
        }
        OnSnapshot(baseEvent) {
        }
        CreateEntity(type, id) {
            let entity;
            switch (type) {
                case EntityType_1.EntityType.Champion:
                    entity = new VChampion_1.VChampion();
                    break;
            }
            entity.Init(id, this);
            this._entities.push(entity);
            this._idToEntity.set(entity.id, entity);
            return entity;
        }
    }
    exports.VBattle = VBattle;
});
//# sourceMappingURL=VBattle.js.map