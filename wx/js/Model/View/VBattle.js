import { Consts } from "../../Consts";
import { Global } from "../../Global";
import * as $protobuf from "../../Libs/protobufjs";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { SyncEvent } from "../BattleEvent/SyncEvent";
import { UIEvent } from "../BattleEvent/UIEvent";
import { CDefs } from "../CDefs";
import { Camera } from "./Camera";
import { VBullet } from "./VBullet";
import { VChampion } from "./VChampion";
export class VBattle {
    constructor() {
        this._mapID = 0;
        this._champions = [];
        this._idToChampion = new Map();
        this._bullets = [];
        this._idToBullet = new Map();
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
                champion = new VChampion(this);
                champion.DecodeSync(rid, reader, true);
                this._champions.push(champion);
                this._idToChampion.set(champion.rid.toString(), champion);
                const isSelf = champion.rid.equals(this._playerID);
                if (isSelf) {
                    this._camera.lookAt = champion;
                }
                UIEvent.ChampionInit(champion, isSelf);
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
                bullet = new VBullet(this);
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
}
