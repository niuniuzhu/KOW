import { Global } from "../../Global";
import * as Long from "../../Libs/long";
import * as $protobuf from "../../Libs/protobufjs";
import { Protos } from "../../Libs/protos";
import { ProtoCreator } from "../../Net/ProtoHelper";
import { FMathUtils } from "../../RC/FMath/FMathUtils";
import { FRandom } from "../../RC/FMath/FRandom";
import { FRect } from "../../RC/FMath/FRect";
import { FVec2 } from "../../RC/FMath/FVec2";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { Logger } from "../../RC/Utils/Logger";
import { SyncEvent } from "../BattleEvent/SyncEvent";
import { Defs } from "../Defs";
import { Bullet } from "./Bullet";
import { CalcationManager } from "./CalcationManager";
import { Champion } from "./Champion";
import { Emitter } from "./Emitter";
import { EntityInitParams } from "./Entity";
import { FrameActionGroup } from "./FrameActionGroup";
import { HPPacket } from "./HPPacket";
import { SceneItem } from "./SceneItem";
import { Team } from "./Team";
export class Battle {
    constructor() {
        this.chase = false;
        this._frameRate = 0;
        this._keyframeStep = 0;
        this._snapshotStep = 0;
        this._frame = 0;
        this._timeout = 0;
        this._mapID = 0;
        this._bornPoses = [];
        this._bornDirs = [];
        this._finished = false;
        this._destroied = true;
        this._frameActionGroups = [];
        this._teams = [];
        this._champions = [];
        this._idToChampion = new Map();
        this._emitters = [];
        this._idToEmitter = new Map();
        this._bullets = [];
        this._idToBullet = new Map();
        this._items = [];
        this._idToItem = new Map();
        this._hpPacket = new HPPacket(this);
        this._calcManager = new CalcationManager(this);
    }
    get frameRate() { return this._frameRate; }
    get keyframeStep() { return this._keyframeStep; }
    get snapshotStep() { return this._snapshotStep; }
    get timeout() { return this._timeout; }
    get mapID() { return this._mapID; }
    get frame() { return this._frame; }
    get bounds() { return this._bounds; }
    get gladiatorTimeout() { return this._gladiatorTimeout; }
    get gladiatorPos() { return this._gladiatorPos; }
    get gladiatorRadius() { return this._gladiatorRadius; }
    get random() { return this._random; }
    get calcManager() { return this._calcManager; }
    get finished() { return this._finished; }
    Destroy() {
        if (this._destroied)
            return;
        this._destroied = true;
        this._bounds = null;
        this._frameActionGroups.splice(0);
        this._calcManager.Destroy();
        for (let i = 0, count = this._champions.length; i < count; i++)
            this._champions[i].Destroy();
        this._champions.splice(0);
        this._idToChampion.clear();
        for (let i = 0, count = this._teams.length; i < count; i++)
            this._teams[i].Destroy();
        this._teams.splice(0);
        for (let i = 0, count = this._emitters.length; i < count; i++)
            this._emitters[i].Destroy();
        this._emitters.splice(0);
        this._idToEmitter.clear();
        for (let i = 0, count = this._bullets.length; i < count; i++)
            this._bullets[i].Destroy();
        this._bullets.splice(0);
        this._idToBullet.clear();
        for (let i = 0, count = this._items.length; i < count; i++)
            this._items[i].Destroy();
        this._items.splice(0);
        this._idToItem.clear();
    }
    SetBattleInfo(battleInfo) {
        this._destroied = false;
        this._frameRate = battleInfo.frameRate;
        this._keyframeStep = battleInfo.keyframeStep;
        this._snapshotStep = battleInfo.snapshotStep;
        this._random = new FRandom(battleInfo.rndSeed);
        this._timeout = battleInfo.battleTime;
        this._mapID = battleInfo.mapID;
        this._msPerFrame = FMathUtils.ToFixed(1000 / this._frameRate);
        this._frame = 0;
        this._nextKeyFrame = 0;
        this._logicElapsed = 0;
        this._finished = false;
        const defs = Defs.GetMap(this._mapID);
        let arr = Hashtable.GetArray(defs, "born_pos");
        let count = arr.length;
        for (let i = 0; i < count; i++) {
            const pi = arr[i];
            this._bornPoses.push(new FVec2(FMathUtils.ToFixed(pi[0]), FMathUtils.ToFixed(pi[1])));
        }
        arr = Hashtable.GetArray(defs, "born_dir");
        count = arr.length;
        for (let i = 0; i < count; i++) {
            const pi = arr[i];
            this._bornDirs.push(new FVec2(FMathUtils.ToFixed(pi[0]), FMathUtils.ToFixed(pi[1])));
        }
        const bWidth = Hashtable.GetNumber(defs, "width");
        const bHeight = Hashtable.GetNumber(defs, "height");
        this._bounds = new FRect(-FMathUtils.Floor(bWidth * 0.5), -FMathUtils.Floor(bHeight * 0.5), bWidth, bHeight);
        this._gladiatorTimeout = Hashtable.GetNumber(defs, "gladiator_timeout");
        this._gladiatorPos = Hashtable.GetFVec2(defs, "gladiator_pos");
        this._gladiatorRadius = Hashtable.GetNumber(defs, "gladiator_radius");
        this._hpPacket.Init(defs);
    }
    Update(dt) {
        this.Chase(this._frameActionGroups);
        if (this.frame < this._nextKeyFrame) {
            this._logicElapsed = FMathUtils.Add(this._logicElapsed, dt);
            while (this._logicElapsed >= this._msPerFrame) {
                if (this.frame >= this._nextKeyFrame)
                    break;
                this.UpdateLogic(this._msPerFrame);
                this._logicElapsed = FMathUtils.Sub(this._logicElapsed, this._msPerFrame);
            }
        }
    }
    UpdateLogic(dt) {
        ++this._frame;
        this._hpPacket.Update(dt);
        for (let i = 0, count = this._champions.length; i < count; i++) {
            const champion = this._champions[i];
            champion.Update(dt);
        }
        for (let i = 0, count = this._champions.length - 1; i < count; i++) {
            const champion = this._champions[i];
            champion.IntersectionTest(this._champions, i + 1);
        }
        for (let i = 0, count = this._champions.length; i < count; i++) {
            const champion = this._champions[i];
            champion.UpdatePhysic(dt);
        }
        for (let i = 0, count = this._champions.length; i < count; i++) {
            const champion = this._champions[i];
            champion.AfterUpdate(dt);
        }
        for (let i = 0, count = this._emitters.length; i < count; i++) {
            const emitter = this._emitters[i];
            emitter.Update(dt);
        }
        for (let i = 0, count = this._bullets.length; i < count; i++) {
            const bullet = this._bullets[i];
            bullet.Update(dt);
        }
        for (let i = 0, count = this._items.length; i < count; i++) {
            const item = this._items[i];
            item.Update(dt);
        }
        for (let i = 0, count = this._items.length; i < count; i++) {
            const item = this._items[i];
            item.Intersect();
        }
        for (let i = 0, count = this._bullets.length; i < count; i++) {
            const bullet = this._bullets[i];
            bullet.Intersect();
        }
        this._calcManager.Update();
        for (let i = 0, count = this._champions.length; i < count; i++) {
            const champion = this._champions[i];
            champion.UpdateAfterHit();
        }
        let championInGladiator = null;
        for (let i = 0, count = this._teams.length; i < count; i++) {
            const team = this._teams[i];
            for (let j = 0; j < team.numChanpions; j++) {
                const champion = team.GetChampionAt(j);
                if (champion.isDead || !champion.isInGladiator)
                    continue;
                if (championInGladiator != null) {
                    championInGladiator = null;
                    break;
                }
                championInGladiator = champion;
                break;
            }
        }
        if (championInGladiator != null) {
            this.GetTeam(championInGladiator.team).UpdateGladiator(dt);
        }
        if (!this.chase) {
            this.SyncToView();
        }
        for (let i = 0, count = this._champions.length; i < count; i++) {
            const champion = this._champions[i];
            if (champion.markToDestroy) {
                this.DestroyChampionAt(i);
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
        for (let i = 0, count = this._bullets.length; i < count; i++) {
            const bullet = this._bullets[i];
            if (bullet.markToDestroy) {
                this.DestroyBulletAt(i);
                --i;
                --count;
            }
        }
        for (let i = 0, count = this._emitters.length; i < count; i++) {
            const emitter = this._emitters[i];
            if (emitter.markToDestroy) {
                this.DestroyEmitterAt(i);
                --i;
                --count;
            }
        }
        this.CheckBattleEnd();
        if (!this.chase && (this._frame % this._snapshotStep) == 0) {
            const writer = $protobuf.Writer.create();
            this.EncodeSnapshot(writer);
            const data = writer.finish();
            const request = ProtoCreator.Q_GC2BS_CommitSnapshot();
            request.frame = this._frame;
            request.data = data;
            Global.connector.SendToBS(Protos.GC2BS_CommitSnapshot, request);
        }
    }
    EncodeSnapshot(writer) {
        writer.int32(this._frame);
        writer.bool(this._finished);
        writer.double(this._random.seed);
        let count = this._teams.length;
        writer.int32(count);
        for (let i = 0; i < count; i++) {
            const team = this._teams[i];
            team.EncodeSnapshot(writer);
        }
        count = this._champions.length;
        writer.int32(count);
        for (let i = 0; i < count; i++) {
            const champion = this._champions[i];
            champion.EncodeSnapshot(writer);
        }
        count = this._emitters.length;
        writer.int32(count);
        for (let i = 0; i < count; i++) {
            const emitter = this._emitters[i];
            emitter.EncodeSnapshot(writer);
        }
        count = this._bullets.length;
        writer.int32(count);
        for (let i = 0; i < count; i++) {
            const bullet = this._bullets[i];
            bullet.EncodeSnapshot(writer);
        }
        count = this._items.length;
        writer.int32(count);
        for (let i = 0; i < count; i++) {
            const item = this._items[i];
            item.EncodeSnapshot(writer);
        }
        this._calcManager.EncodeSnapshot(writer);
    }
    DecodeSnapshot(reader) {
        this._frame = reader.int32();
        this._finished = reader.bool();
        this._random.seed = reader.double();
        let count = reader.int32();
        for (let i = 0; i < count; i++) {
            const team = new Team(this);
            team.DecodeSnapshot(reader);
            this._teams.push(team);
        }
        count = reader.int32();
        for (let i = 0; i < count; i++) {
            const champion = new Champion(this);
            champion.DecodeSnapshot(reader);
            this._champions.push(champion);
            this._idToChampion.set(champion.rid.toString(), champion);
        }
        count = reader.int32();
        for (let i = 0; i < count; i++) {
            const emitter = new Emitter(this);
            emitter.DecodeSnapshot(reader);
            this._emitters.push(emitter);
            this._idToEmitter.set(emitter.rid.toString(), emitter);
        }
        count = reader.int32();
        for (let i = 0; i < count; i++) {
            const bullet = new Bullet(this);
            bullet.DecodeSnapshot(reader);
            this._bullets.push(bullet);
            this._idToBullet.set(bullet.rid.toString(), bullet);
        }
        count = reader.int32();
        for (let i = 0; i < count; i++) {
            const item = new SceneItem(this);
            item.DecodeSnapshot(reader);
            this._items.push(item);
            this._idToItem.set(item.rid.toString(), item);
        }
        this._calcManager.DecodeSnapshot(reader);
    }
    EncodeSync(writer) {
        writer.int32(this._frame);
        let count = this._teams.length;
        writer.int32(count);
        for (let i = 0; i < count; i++) {
            const team = this._teams[i];
            team.EncodeSync(writer);
        }
        count = this._champions.length;
        writer.int32(count);
        for (let i = 0; i < count; i++) {
            const champion = this._champions[i];
            champion.EncodeSync(writer);
        }
        count = this._bullets.length;
        writer.int32(count);
        for (let i = 0; i < count; i++) {
            const bullet = this._bullets[i];
            bullet.EncodeSync(writer);
        }
        count = this._items.length;
        writer.int32(count);
        for (let i = 0; i < count; i++) {
            const bullet = this._items[i];
            bullet.EncodeSync(writer);
        }
    }
    SyncInitToView() {
        const writer = $protobuf.Writer.create();
        this.EncodeSync(writer);
        const data = writer.finish();
        SyncEvent.BattleInit(data);
    }
    SyncToView() {
        const writer = $protobuf.Writer.create();
        this.EncodeSync(writer);
        const data = writer.finish();
        SyncEvent.Snapshot(data);
    }
    Chase(frameActionGroups) {
        for (const frameActionGroup of frameActionGroups) {
            let length = frameActionGroup.frame - this.frame;
            while (length > 0) {
                this.UpdateLogic(this._msPerFrame);
                --length;
            }
            this.ApplyFrameActionGroup(frameActionGroup);
            this._nextKeyFrame = frameActionGroup.frame + this.keyframeStep;
        }
        frameActionGroups.splice(0);
    }
    MakeRid(id) {
        const rnd = this._random.NextFloor(0, 0xfffff);
        return Long.fromBits(id, rnd);
    }
    CreatePlayers(_teamInfos) {
        const c1 = _teamInfos.length;
        for (let i = 0; i < c1; ++i) {
            const team = new Team(this);
            team.id = i;
            this._teams.push(team);
            const _teamInfo = _teamInfos[i];
            const c2 = _teamInfo.playerInfos.length;
            for (let j = 0; j < c2; ++j) {
                const _playerInfo = _teamInfo.playerInfos[j];
                const playerInfo = new EntityInitParams();
                playerInfo.rid = _playerInfo.gcNID;
                playerInfo.id = _playerInfo.actorID;
                playerInfo.name = _playerInfo.nickname;
                playerInfo.team = i;
                playerInfo.position = this._bornPoses[i * c2 + j];
                playerInfo.direction = this._bornDirs[i * c2 + j];
                const champion = this.CreateChampion(playerInfo);
                team.AddChampion(champion);
            }
        }
    }
    CreateChampion(params) {
        const champion = new Champion(this);
        champion.Init(params);
        this._champions.push(champion);
        this._idToChampion.set(champion.rid.toString(), champion);
        const writer = $protobuf.Writer.create();
        champion.EncodeSnapshot(writer);
        const data = writer.finish();
        SyncEvent.EntityCreated(champion.type, data);
        return champion;
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
    GetChampions() {
        return this._champions;
    }
    GetTeam(id) {
        return this._teams[id];
    }
    CreateEmitter(id, casterID, skillID) {
        const emitter = new Emitter(this);
        emitter.Init(this.MakeRid(id), id, casterID, skillID);
        this._emitters.push(emitter);
        this._idToEmitter.set(emitter.rid.toString(), emitter);
        return emitter;
    }
    DestroyEmitter(emitter) {
        emitter.Destroy();
        this._emitters.splice(this._emitters.indexOf(emitter), 1);
        this._idToEmitter.delete(emitter.rid.toString());
    }
    DestroyEmitterAt(index) {
        const emitter = this._emitters[index];
        emitter.Destroy();
        this._emitters.splice(index, 1);
        this._idToEmitter.delete(emitter.rid.toString());
    }
    GetEmitter(rid) {
        return this._idToEmitter.get(rid.toString());
    }
    CreateBullet(id, casterID, skillID, position, direction) {
        const params = new EntityInitParams();
        params.rid = this.MakeRid(id);
        params.id = id;
        params.casterID = casterID;
        params.skillID = skillID;
        params.position = position;
        params.direction = direction;
        const bullet = new Bullet(this);
        bullet.Init(params);
        this._bullets.push(bullet);
        this._idToBullet.set(bullet.rid.toString(), bullet);
        const writer = $protobuf.Writer.create();
        bullet.EncodeSnapshot(writer);
        const data = writer.finish();
        SyncEvent.EntityCreated(bullet.type, data);
        return bullet;
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
    CreateSceneItem(id, position = FVec2.zero, direction = FVec2.down) {
        const params = new EntityInitParams();
        params.rid = this.MakeRid(id);
        params.id = id;
        params.position = position;
        params.direction = direction;
        const item = new SceneItem(this);
        item.Init(params);
        this._items.push(item);
        this._idToItem.set(item.rid.toString(), item);
        const writer = $protobuf.Writer.create();
        item.EncodeSnapshot(writer);
        const data = writer.finish();
        SyncEvent.EntityCreated(item.type, data);
        return item;
    }
    GetSceneItems() {
        return this._items;
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
    ApplyFrameActionGroup(frameActionGroup) {
        for (let i = 0; i < frameActionGroup.numActions; i++) {
            const frameAction = frameActionGroup.Get(i);
            const champion = this.GetChampion(frameAction.gcNID);
            champion.FrameAction(frameAction);
        }
    }
    CheckBattleEnd() {
        if (this._finished)
            return;
        let team0Win = false;
        let team1Win = false;
        for (const champion of this._champions) {
            if (this.GetTeam(champion.team).gladiatorTime >= this._gladiatorTimeout) {
                if (champion.team == 0)
                    team0Win = true;
                else
                    team1Win = true;
            }
        }
        if (!team0Win && !team1Win && this._champions.length > 1) {
            team0Win = true;
            team1Win = true;
            for (const champion of this._champions) {
                if (champion.team == 0 && !champion.isDead) {
                    team1Win = false;
                }
                if (champion.team == 1 && !champion.isDead) {
                    team0Win = false;
                }
            }
        }
        let winTeam = 0;
        if (team0Win && !team1Win) {
            winTeam = 1 << 0;
        }
        else if (!team0Win && team1Win) {
            winTeam = 1 << 1;
        }
        else if (team0Win && team1Win) {
            winTeam = (1 << 0) | (1 << 1);
        }
        if (winTeam != 0) {
            const writer = $protobuf.Writer.create();
            this.EncodeSnapshot(writer);
            const data = writer.finish();
            const msg = ProtoCreator.Q_GC2BS_EndBattle();
            msg.winTeam = winTeam;
            msg.snapshot = data;
            Global.connector.bsConnector.Send(Protos.GC2BS_EndBattle, msg);
            this._finished = true;
        }
    }
    HandleSnapShot(ret) {
        const reader = $protobuf.Reader.create(ret.snapshot);
        this.DecodeSnapshot(reader);
    }
    HandleFrameAction(frame, data) {
        const frameActionGroup = new FrameActionGroup(frame);
        frameActionGroup.Deserialize(data);
        this._frameActionGroups.push(frameActionGroup);
    }
    HandleOutOfSync(msg) {
        let str = "===============data1===============";
        let reader = $protobuf.Reader.create(msg.data1);
        str += this.Dump(reader);
        str += "===============data2===============";
        reader = $protobuf.Reader.create(msg.data2);
        str += this.Dump(reader);
        Logger.Log(str);
    }
    Dump(reader) {
        let str = "";
        reader.int32();
        reader.bool();
        reader.double();
        let count = reader.int32();
        for (let i = 0; i < count; i++) {
            const champion = new Champion(this);
            champion.DecodeSnapshot(reader);
            str += "======champion======\n";
            str += champion.Dump();
        }
        count = reader.int32();
        for (let i = 0; i < count; i++) {
            const emitter = new Emitter(this);
            emitter.DecodeSnapshot(reader);
            str += "======emitter======\n";
            str += emitter.Dump();
        }
        count = reader.int32();
        for (let i = 0; i < count; i++) {
            const bullet = new Bullet(this);
            bullet.DecodeSnapshot(reader);
            str += "======bullet======\n";
            str += bullet.Dump();
        }
        count = reader.int32();
        for (let i = 0; i < count; i++) {
            const item = new SceneItem(this);
            item.DecodeSnapshot(reader);
            str += "======scene_item======\n";
            str += item.Dump();
        }
        return str;
    }
}
