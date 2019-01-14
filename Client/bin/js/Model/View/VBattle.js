define(["require", "exports", "../../Consts", "../../Global", "../../Libs/protobufjs", "../../RC/Utils/Hashtable", "../BattleEvent/SyncEvent", "../Defs", "./Camera", "./EffectPool", "./HUD", "./VBullet", "./VChampion", "./VSceneItem"], function (require, exports, Consts_1, Global_1, $protobuf, Hashtable_1, SyncEvent_1, Defs_1, Camera_1, EffectPool_1, HUD_1, VBullet_1, VChampion_1, VSceneItem_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class VBattle {
        constructor() {
            this._mapID = 0;
            this._camera = new Camera_1.Camera();
            this._champions = [];
            this._idToChampion = new Map();
            this._bullets = [];
            this._idToBullet = new Map();
            this._effects = [];
            this._items = [];
            this._idToItem = new Map();
            this._destroied = false;
            this._effectPool = new EffectPool_1.EffectPool(this);
        }
        get mapID() { return this._mapID; }
        get camera() { return this._camera; }
        SetBattleInfo(battleInfo) {
            SyncEvent_1.SyncEvent.AddListener(SyncEvent_1.SyncEvent.E_BATTLE_INIT, this.OnBattleInit.bind(this));
            SyncEvent_1.SyncEvent.AddListener(SyncEvent_1.SyncEvent.E_SNAPSHOT, this.OnSnapshot.bind(this));
            SyncEvent_1.SyncEvent.AddListener(SyncEvent_1.SyncEvent.E_HIT, this.OnHit.bind(this));
            SyncEvent_1.SyncEvent.AddListener(SyncEvent_1.SyncEvent.E_BULLET_COLLISION, this.OnBulletCollision.bind(this));
            this._destroied = false;
            this._mapID = battleInfo.mapID;
            const def = Defs_1.Defs.GetMap(this._mapID);
            this._camera.SetBounds(Hashtable_1.Hashtable.GetNumber(def, "width") * Consts_1.Consts.LOGIC_TO_PIXEL_RATIO, Hashtable_1.Hashtable.GetNumber(def, "height") * Consts_1.Consts.LOGIC_TO_PIXEL_RATIO);
            this._root = fairygui.UIPackage.createObject("assets", Consts_1.Consts.ASSETS_MAP_PREFIX + battleInfo.mapID).asCom;
            this._root.touchable = false;
            Global_1.Global.graphic.mapRoot.addChild(this._root);
        }
        Destroy() {
            if (this._destroied)
                return;
            this._destroied = true;
            SyncEvent_1.SyncEvent.RemoveListener(SyncEvent_1.SyncEvent.E_BATTLE_INIT);
            SyncEvent_1.SyncEvent.RemoveListener(SyncEvent_1.SyncEvent.E_SNAPSHOT);
            SyncEvent_1.SyncEvent.RemoveListener(SyncEvent_1.SyncEvent.E_HIT);
            SyncEvent_1.SyncEvent.RemoveListener(SyncEvent_1.SyncEvent.E_BULLET_COLLISION);
            for (let i = 0, count = this._champions.length; i < count; ++i) {
                this._champions[i].Destroy();
            }
            this._champions.splice(0);
            this._idToChampion.clear();
            for (let i = 0, count = this._bullets.length; i < count; ++i) {
                this._bullets[i].Destroy();
            }
            this._bullets.splice(0);
            this._idToBullet.clear();
            for (let i = 0, count = this._items.length; i < count; ++i) {
                this._items[i].Destroy();
            }
            this._items.splice(0);
            this._idToItem.clear();
            for (let i = 0, count = this._effects.length; i < count; ++i) {
                this._effectPool.Release(this._effects[i]);
            }
            this._effects.splice(0);
            this._effectPool.Dispose();
            this._root.dispose();
            this._root = null;
            this._logicFrame = 0;
        }
        Update(dt) {
            this._camera.Update(dt);
            for (let i = 0, count = this._items.length; i < count; i++) {
                const item = this._items[i];
                item.Update(dt);
            }
            for (let i = 0, count = this._effects.length; i < count; i++) {
                const effect = this._effects[i];
                effect.Update(dt);
            }
            for (let i = 0, count = this._champions.length; i < count; i++) {
                const champion = this._champions[i];
                champion.Update(dt);
            }
            for (let i = 0, count = this._bullets.length; i < count; i++) {
                const bullet = this._bullets[i];
                bullet.Update(dt);
            }
            for (let i = 0, count = this._champions.length; i < count; i++) {
                const champion = this._champions[i];
                if (champion.markToDestroy) {
                    this.DestroyChampionAt(i);
                    --i;
                    --count;
                }
            }
            for (let i = 0, count = this._bullets.length; i < count; i++) {
                const bullet = this._bullets[i];
                if (bullet.markToDestroy) {
                    this.DestroyBulletAt(i);
                    --i;
                    --count;
                }
            }
            for (let i = 0, count = this._effects.length; i < count; i++) {
                const effect = this._effects[i];
                if (effect.markToDestroy) {
                    this.DespawnEffectAt(i);
                    --i;
                    --count;
                }
            }
            for (let i = 0, count = this._items.length; i < count; i++) {
                const item = this._items[i];
                if (item.markToDestroy) {
                    this.DestroySceneItemAt(i);
                    --i;
                    --count;
                }
            }
        }
        DecodeSync(reader) {
            this._logicFrame = reader.int32();
            let count = reader.int32();
            for (let i = 0; i < count; i++) {
                const rid = reader.uint64();
                let champion = this.GetChampion(rid);
                if (champion == null) {
                    champion = new VChampion_1.VChampion(this);
                    champion.DecodeSync(rid, reader, true);
                    this._champions.push(champion);
                    this._idToChampion.set(champion.rid.toString(), champion);
                    const isSelf = champion.rid.equals(Global_1.Global.battleManager.playerID);
                    if (isSelf) {
                        this._camera.lookAt = champion;
                    }
                }
                else {
                    champion.DecodeSync(rid, reader, false);
                }
            }
            count = reader.int32();
            for (let i = 0; i < count; i++) {
                const rid = reader.uint64();
                let bullet = this.GetBullet(rid);
                if (bullet == null) {
                    bullet = new VBullet_1.VBullet(this);
                    bullet.DecodeSync(rid, reader, true);
                    this._bullets.push(bullet);
                    this._idToBullet.set(bullet.rid.toString(), bullet);
                }
                else {
                    bullet.DecodeSync(rid, reader, false);
                }
            }
            count = reader.int32();
            for (let i = 0; i < count; i++) {
                const rid = reader.uint64();
                let item = this.GetSceneItem(rid);
                if (item == null) {
                    item = new VSceneItem_1.VSceneItem(this);
                    item.DecodeSync(rid, reader, true);
                    this._items.push(item);
                    this._idToItem.set(item.rid.toString(), item);
                }
                else {
                    item.DecodeSync(rid, reader, false);
                }
            }
        }
        DestroyChampion(champion) {
            champion.Destroy();
            this._champions.splice(this._champions.indexOf(champion), 1);
            this._idToChampion.delete(champion.rid.toString());
        }
        DestroyChampionAt(index) {
            const champion = this._champions[index];
            champion.Destroy();
            this._champions.splice(index, 1);
            this._idToChampion.delete(champion.rid.toString());
        }
        GetChampion(rid) {
            return this._idToChampion.get(rid.toString());
        }
        DestroyBullet(bullet) {
            bullet.Destroy();
            this._bullets.splice(this._bullets.indexOf(bullet), 1);
            this._idToBullet.delete(bullet.rid.toString());
        }
        DestroyBulletAt(index) {
            const bullet = this._bullets[index];
            bullet.Destroy();
            this._bullets.splice(index, 1);
            this._idToBullet.delete(bullet.rid.toString());
        }
        GetBullet(rid) {
            return this._idToBullet.get(rid.toString());
        }
        SpawnEffect(id) {
            const effect = this._effectPool.Get(id);
            this._effects.push(effect);
            return effect;
        }
        DespawnEffect(fx) {
            this._effects.splice(this._effects.indexOf(fx), 1);
            this._effectPool.Release(fx);
        }
        DespawnEffectAt(index) {
            const fx = this._effects[index];
            this._effects.splice(index, 1);
            this._effectPool.Release(fx);
        }
        DestroySceneItem(sceneItem) {
            sceneItem.Destroy();
            this._items.splice(this._items.indexOf(sceneItem), 1);
            this._idToItem.delete(sceneItem.rid.toString());
        }
        DestroySceneItemAt(index) {
            const item = this._items[index];
            item.Destroy();
            this._items.splice(index, 1);
            this._idToItem.delete(item.rid.toString());
        }
        GetSceneItem(rid) {
            return this._idToItem.get(rid.toString());
        }
        OnBattleInit(e) {
            const reader = $protobuf.Reader.create(e.data);
            this.DecodeSync(reader);
        }
        OnSnapshot(e) {
            const reader = $protobuf.Reader.create(e.data);
            this.DecodeSync(reader);
        }
        OnHit(e) {
            const target = this.GetChampion(e.rid0);
            target.hud.PopText(HUD_1.PopTextType.Hurt, e.v0);
        }
        OnBulletCollision(e) {
            const bullet = this.GetBullet(e.rid0);
            const caster = this.GetChampion(e.rid1);
            const target = this.GetChampion(e.rid2);
            bullet.OnCollision(caster, target);
        }
    }
    exports.VBattle = VBattle;
});
//# sourceMappingURL=VBattle.js.map