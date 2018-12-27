import { Global } from "../../Global";
import * as Long from "../../Libs/long";
import * as $protobuf from "../../Libs/protobufjs";
import { Protos } from "../../Libs/protos";
import { ProtoCreator } from "../../Net/ProtoHelper";
import Queue from "../../RC/Collections/Queue";
import { FMathUtils } from "../../RC/FMath/FMathUtils";
import { FRandom } from "../../RC/FMath/FRandom";
import { FRect } from "../../RC/FMath/FRect";
import { FVec2 } from "../../RC/FMath/FVec2";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { Logger } from "../../RC/Utils/Logger";
import { SyncEvent } from "../BattleEvent/SyncEvent";
import { CDefs } from "../CDefs";
import { Defs } from "../Defs";
import { FrameActionGroup } from "../FrameActionGroup";
import { Bullet } from "./Bullet";
import { Champion } from "./Champion";
import { Emitter } from "./Emitter";
import { EntityInitParams } from "./Entity";
export class Battle {
    constructor() {
        this._frameRate = 0;
        this._keyframeStep = 0;
        this._snapshotStep = 0;
        this._timeout = 0;
        this._mapID = 0;
        this._frame = 0;
        this._destroied = false;
        this._frameActionGroups = new Queue();
        this._champions = [];
        this._idToChampion = new Map();
        this._emitters = [];
        this._idToEmitter = new Map();
        this._bullets = [];
        this._idToBullet = new Map();
    }
    get frameRate() { return this._frameRate; }
    get keyframeStep() { return this._keyframeStep; }
    get snapshotStep() { return this._snapshotStep; }
    get timeout() { return this._timeout; }
    get mapID() { return this._mapID; }
    get frame() { return this._frame; }
    get bounds() { return this._bounds; }
    get random() { return this._random; }
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
        this._realElapsed = 0;
        this._cdef = CDefs.GetMap(this._mapID);
        this._def = Defs.GetMap(this._mapID);
        const bWidth = Hashtable.GetNumber(this._cdef, "width");
        const bHeight = Hashtable.GetNumber(this._cdef, "height");
        this._bounds = new FRect(-FMathUtils.Floor(bWidth * 0.5), -FMathUtils.Floor(bHeight * 0.5), bWidth, bHeight);
    }
    Destroy() {
        if (this._destroied)
            return;
        this._destroied = true;
        this._def = null;
        this._cdef = null;
        this._bounds = null;
        this._frameActionGroups.clear();
        for (let i = 0, count = this._bullets.length; i < count; i++)
            this._bullets[i].Destroy();
        this._bullets.splice(0);
        this._idToBullet.clear();
        for (let i = 0, count = this._emitters.length; i < count; i++)
            this._emitters[i].Destroy();
        this._emitters.splice(0);
        this._idToEmitter.clear();
        for (let i = 0, count = this._champions.length; i < count; i++)
            this._champions[i].Destroy();
        this._champions.splice(0);
        this._idToChampion.clear();
    }
    Update(dt) {
        this.Chase(this._frameActionGroups, true, true);
        this._realElapsed = FMathUtils.Add(this._realElapsed, dt);
        if (this.frame < this._nextKeyFrame) {
            this._logicElapsed = FMathUtils.Add(this._logicElapsed, dt);
            while (this._logicElapsed >= this._msPerFrame) {
                if (this.frame >= this._nextKeyFrame)
                    break;
                this.UpdateLogic(this._msPerFrame, true, true);
                this._realElapsed = 0;
                this._logicElapsed = FMathUtils.Sub(this._logicElapsed, this._msPerFrame);
            }
        }
    }
    UpdateLogic(dt, updateView, commitSnapshot) {
        ++this._frame;
        for (let i = 0, count = this._champions.length; i < count; i++) {
            const champion = this._champions[i];
            champion.Update(dt);
        }
        for (let i = 0, count = this._champions.length; i < count; i++) {
            const champion = this._champions[i];
            champion.Intersect(this._champions);
        }
        for (let i = 0, count = this._emitters.length; i < count; i++) {
            const emitter = this._emitters[i];
            emitter.Update(dt);
        }
        for (let i = 0, count = this._bullets.length; i < count; i++) {
            const bullet = this._bullets[i];
            bullet.Update(dt);
        }
        for (let i = 0, count = this._bullets.length; i < count; i++) {
            const bullet = this._bullets[i];
            bullet.Intersect();
        }
        if (updateView) {
            this.SyncToView();
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
        for (let i = 0, count = this._champions.length; i < count; i++) {
            const champion = this._champions[i];
            if (champion.markToDestroy) {
                this.DestroyChampionAt(i);
                --i;
                --count;
            }
        }
        if (commitSnapshot && (this._frame % this._snapshotStep) == 0) {
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
        let count = this._champions.length;
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
    }
    DecodeSnapshot(reader) {
        this._frame = reader.int32();
        let count = reader.int32();
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
    }
    EncodeSync(writer) {
        writer.int32(this._frame);
        let count = this._champions.length;
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
    Chase(frameActionGroups, updateView, commitSnapshot) {
        if (frameActionGroups == null)
            return;
        while (!frameActionGroups.isEmpty()) {
            const frameActionGroup = frameActionGroups.dequeue();
            let length = frameActionGroup.frame - this.frame;
            while (length > 0) {
                this.UpdateLogic(this._msPerFrame, updateView, commitSnapshot);
                --length;
            }
            this.ApplyFrameActionGroup(frameActionGroup);
            this._nextKeyFrame = frameActionGroup.frame + this.keyframeStep;
        }
    }
    MakeRid(id) {
        const rnd = this._random.NextFloor(0, 0xfffff);
        return Long.fromBits(id, rnd);
    }
    CreatePlayers(playerInfos) {
        let arr = Hashtable.GetArray(this._def, "born_pos");
        let count = arr.length;
        const bornPoses = [];
        for (let i = 0; i < count; i++) {
            const pi = arr[i];
            bornPoses.push(new FVec2(FMathUtils.ToFixed(pi[0]), FMathUtils.ToFixed(pi[1])));
        }
        arr = Hashtable.GetArray(this._def, "born_dir");
        count = arr.length;
        const bornDirs = [];
        for (let i = 0; i < count; i++) {
            const pi = arr[i];
            bornDirs.push(new FVec2(FMathUtils.ToFixed(pi[0]), FMathUtils.ToFixed(pi[1])));
        }
        const params = new EntityInitParams();
        count = playerInfos.length;
        for (let i = 0; i < count; ++i) {
            const playerInfo = playerInfos[i];
            params.rid = playerInfo.gcNID;
            params.id = playerInfo.actorID;
            params.team = playerInfo.team;
            params.name = playerInfo.name;
            const player = this.CreateChampion(params);
            if (player.team >= bornPoses.length ||
                player.team >= bornDirs.length) {
                throw new Error("invalid team:" + player.team + ", player:" + player.rid);
            }
            player.position.CopyFrom(bornPoses[player.team]);
            player.direction.CopyFrom(bornDirs[player.team]);
        }
    }
    CreateChampion(params) {
        const champion = new Champion(this);
        champion.Init(params);
        this._champions.push(champion);
        this._idToChampion.set(champion.rid.toString(), champion);
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
    ApplyFrameActionGroup(frameActionGroup) {
        for (let i = 0; i < frameActionGroup.numActions; i++) {
            this.ApplyFrameAction(frameActionGroup.Get(i));
        }
    }
    ApplyFrameAction(frameAction) {
        const champion = this.GetChampion(frameAction.gcNID);
        champion.FrameAction(frameAction);
    }
    HandleSnapShot(ret) {
        const reader = $protobuf.Reader.create(ret.snapshot);
        this.DecodeSnapshot(reader);
    }
    HandleFrameAction(frame, data) {
        const frameActionGroup = new FrameActionGroup(frame);
        frameActionGroup.Deserialize(data);
        this._frameActionGroups.enqueue(frameActionGroup);
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
        return str;
    }
}
