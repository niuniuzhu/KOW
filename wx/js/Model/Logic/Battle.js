import { Global } from "../../Global";
import Decimal from "../../Libs/decimal";
import * as $protobuf from "../../Libs/protobufjs";
import { Protos } from "../../Libs/protos";
import { ProtoCreator } from "../../Net/ProtoHelper";
import Queue from "../../RC/Collections/Queue";
import { FRect } from "../../RC/FMath/FRect";
import { FVec2 } from "../../RC/FMath/FVec2";
import { MathUtils } from "../../RC/Math/MathUtils";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { SyncEvent } from "../BattleEvent/SyncEvent";
import { CDefs } from "../CDefs";
import { Defs } from "../Defs";
import { EntityType } from "../EntityType";
import { FrameAction } from "../FrameAction";
import { FrameActionGroup } from "../FrameActionGroup";
import { Champion } from "./Champion";
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
        this._entities = [];
        this._idToEntity = new Map();
    }
    get frameRate() { return this._frameRate; }
    get keyframeStep() { return this._keyframeStep; }
    get snapshotStep() { return this._snapshotStep; }
    get timeout() { return this._timeout; }
    get mapID() { return this._mapID; }
    get frame() { return this._frame; }
    get bounds() { return this._bounds; }
    SetBattleInfo(battleInfo) {
        this._destroied = false;
        this._frameRate = battleInfo.frameRate;
        this._keyframeStep = battleInfo.keyframeStep;
        this._snapshotStep = battleInfo.snapshotStep;
        this._timeout = battleInfo.battleTime;
        this._mapID = battleInfo.mapID;
        this._msPerFrame = new Decimal(1000 / this._frameRate);
        this._frame = 0;
        this._nextKeyFrame = 0;
        this._logicElapsed = new Decimal(0);
        this._realElapsed = new Decimal(0);
        this._cdef = CDefs.GetMap(this._mapID);
        this._def = Defs.GetMap(this._mapID);
        const bWidth = Hashtable.GetNumber(this._cdef, "width");
        const bHeight = Hashtable.GetNumber(this._cdef, "height");
        this._bounds = new FRect(new Decimal(-MathUtils.Floor(bWidth * 0.5)), new Decimal(-MathUtils.Floor(bHeight * 0.5)), new Decimal(bWidth), new Decimal(bHeight));
        this.CreatePlayers(battleInfo.playerInfos);
    }
    Destroy() {
        if (this._destroied)
            return;
        this._destroied = true;
        const count = this._entities.length;
        for (let i = 0; i < count; i++)
            this._entities[i].Dispose();
        this._entities.splice(0);
        this._idToEntity.clear();
        this._frameActionGroups.clear();
        this._def = null;
        this._bounds = null;
    }
    Update(dt) {
        this.Chase(this._frameActionGroups, true, true);
        this._realElapsed = this._realElapsed.add(dt);
        if (this.frame < this._nextKeyFrame) {
            this._logicElapsed = this._logicElapsed.add(dt);
            while (this._logicElapsed.greaterThanOrEqualTo(this._msPerFrame)) {
                if (this.frame >= this._nextKeyFrame)
                    break;
                this.UpdateLogic(this._msPerFrame, true, true);
                this._realElapsed = new Decimal(0);
                this._logicElapsed = this._logicElapsed.sub(this._msPerFrame);
            }
        }
    }
    UpdateLogic(dt, updateView, commitSnapshot) {
        ++this._frame;
        const count = this._entities.length;
        for (let i = 0; i < count; i++) {
            const entity = this._entities[i];
            entity.Update(dt);
        }
        if (updateView) {
            this.SyncToView();
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
        const count = this._entities.length;
        writer.int32(count);
        for (let i = 0; i < count; i++) {
            const entity = this._entities[i];
            entity.EncodeSnapshot(writer);
        }
    }
    DecodeSnapshot(reader) {
        this._frame = reader.int32();
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
    EncodeSync(writer) {
        writer.int32(this._frame);
        const count = this._entities.length;
        writer.int32(count);
        for (let i = 0; i < count; i++) {
            const entity = this._entities[i];
            entity.EncodeSync(writer);
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
    CreatePlayers(playerInfos) {
        let arr = Hashtable.GetArray(this._def, "born_pos");
        let count = arr.length;
        const bornPoses = [];
        for (let i = 0; i < count; i++) {
            const pi = arr[i];
            bornPoses.push(new FVec2(new Decimal(pi[0]), new Decimal(pi[1])));
        }
        arr = Hashtable.GetArray(this._def, "born_dir");
        count = arr.length;
        const bornDirs = [];
        for (let i = 0; i < count; i++) {
            const pi = arr[i];
            bornDirs.push(new FVec2(new Decimal(pi[0]), new Decimal(pi[1])));
        }
        count = playerInfos.length;
        for (let i = 0; i < count; ++i) {
            const playerInfo = playerInfos[i];
            const player = this.CreateEntity(EntityType.Champion, playerInfo.gcNID, playerInfo.actorID, playerInfo.team, playerInfo.name);
            if (player.team >= bornPoses.length ||
                player.team >= bornDirs.length) {
                throw new Error("invalid team:" + player.team + ", player:" + player.id);
            }
            player.position = bornPoses[player.team];
            player.direction = bornDirs[player.team];
        }
    }
    CreateEntity(type, id, actorID, team, name) {
        let entity;
        switch (type) {
            case EntityType.Champion:
                entity = new Champion();
                break;
            default:
                throw new Error("not supported entity type:" + type);
        }
        entity.Init(this, id, actorID, team, name);
        this._entities.push(entity);
        this._idToEntity.set(entity.id.toString(), entity);
        return entity;
    }
    GetEntity(id) {
        return this._idToEntity.get(id);
    }
    ApplyFrameActionGroup(frameActionGroup) {
        for (let i = 0; i < frameActionGroup.numActions; i++) {
            this.ApplyFrameAction(frameActionGroup.Get(i));
        }
    }
    ApplyFrameAction(frameAction) {
        const entity = this.GetEntity(frameAction.gcNID.toString());
        if ((frameAction.inputFlag & FrameAction.InputFlag.Move) > 0) {
            entity.BeginMove(frameAction.dx, frameAction.dy);
        }
        if ((frameAction.inputFlag & FrameAction.InputFlag.Skill) > 0) {
            entity.UseSkill(frameAction.sid);
        }
    }
    HandleSnapShot(ret) {
        if (ret.snapshot.length == 0)
            return;
        const reader = $protobuf.Reader.create(ret.snapshot);
        this.DecodeSnapshot(reader);
    }
    HandleFrameAction(frame, data) {
        const frameActionGroup = new FrameActionGroup(frame);
        frameActionGroup.Deserialize(data);
        this._frameActionGroups.enqueue(frameActionGroup);
    }
}
