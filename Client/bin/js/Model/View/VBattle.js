define(["require", "exports", "../../Consts", "../../Global", "../../Libs/protobufjs", "../../RC/Utils/Hashtable", "../BattleEvent/SyncEvent", "../BattleEvent/UIEvent", "../Defs", "./Camera", "./HUD", "./VBullet", "./VChampion"], function (require, exports, Consts_1, Global_1, $protobuf, Hashtable_1, SyncEvent_1, UIEvent_1, Defs_1, Camera_1, HUD_1, VBullet_1, VChampion_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class VBattle {
        constructor() {
            this._mapID = 0;
            this._champions = [];
            this._idToChampion = new Map();
            this._bullets = [];
            this._idToBullet = new Map();
            this._destroied = false;
            this._camera = new Camera_1.Camera();
        }
        SetBattleInfo(battleInfo) {
            SyncEvent_1.SyncEvent.AddListener(SyncEvent_1.SyncEvent.E_BATTLE_INIT, this.OnBattleInit.bind(this));
            SyncEvent_1.SyncEvent.AddListener(SyncEvent_1.SyncEvent.E_SNAPSHOT, this.OnSnapshot.bind(this));
            SyncEvent_1.SyncEvent.AddListener(SyncEvent_1.SyncEvent.E_HIT, this.OnHit.bind(this));
            this._destroied = false;
            this._mapID = battleInfo.mapID;
            this._def = Defs_1.Defs.GetMap(this._mapID);
            this._camera.SetBounds(Hashtable_1.Hashtable.GetNumber(this._def, "width") * Consts_1.Consts.LOGIC_TO_PIXEL_RATIO, Hashtable_1.Hashtable.GetNumber(this._def, "height") * Consts_1.Consts.LOGIC_TO_PIXEL_RATIO);
            this._playerID = battleInfo.playerID;
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
            for (let i = 0, count = this._bullets.length; i < count; ++i) {
                this._bullets[i].Destroy();
            }
            this._bullets.splice(0);
            this._idToBullet.clear();
            for (let i = 0, count = this._champions.length; i < count; ++i) {
                this._champions[i].Destroy();
            }
            this._champions.splice(0);
            this._idToChampion.clear();
            this._root.dispose();
            this._root = null;
            this._def = null;
            this._logicFrame = 0;
        }
        Update(dt) {
            this._camera.Update(dt);
            for (let i = 0, count = this._champions.length; i < count; i++) {
                const champion = this._champions[i];
                champion.Update(dt);
            }
            for (let i = 0, count = this._bullets.length; i < count; i++) {
                const bullet = this._bullets[i];
                bullet.Update(dt);
            }
            for (let i = 0, count = this._bullets.length; i < count; i++) {
                const bullet = this._bullets[i];
                if (bullet.markToDestroy) {
                    this.DestroyBulletAt(i);
                    --i;
                    --count;
                }
            }
            for (let i = 0, count = this._champions.length; i < count; i++) {
                const champion = this._champions[i];
                if (champion.markToDestroy) {
                    this.DestroyChampionAt(i);
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
                    const isSelf = champion.rid.equals(this._playerID);
                    if (isSelf) {
                        this._camera.lookAt = champion;
                    }
                    UIEvent_1.UIEvent.ChampionInit(champion, isSelf);
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
        OnBattleInit(e) {
            const reader = $protobuf.Reader.create(e.data);
            this.DecodeSync(reader);
        }
        OnSnapshot(e) {
            const reader = $protobuf.Reader.create(e.data);
            this.DecodeSync(reader);
        }
        OnHit(e) {
            const target = this.GetChampion(e.rid);
            target.hud.PopText(HUD_1.PopTextType.Hurt, e.v0);
        }
    }
    exports.VBattle = VBattle;
});
//# sourceMappingURL=VBattle.js.map