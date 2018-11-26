define(["require", "exports", "../../Global", "../../Libs/decimal", "../../Libs/protobufjs", "../../Libs/protos", "../../Net/ProtoHelper", "../../RC/Collections/Queue", "../../RC/FVec2", "../../RC/Utils/Hashtable", "../../RC/Utils/Logger", "../Defs", "../EntityType", "../Events/SyncEvent", "../FrameAction", "../FrameActionGroup", "./Champion"], function (require, exports, Global_1, decimal_1, $protobuf, protos_1, ProtoHelper_1, Queue_1, FVec2_1, Hashtable_1, Logger_1, Defs_1, EntityType_1, SyncEvent_1, FrameAction_1, FrameActionGroup_1, Champion_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Battle {
        constructor() {
            this._frameRate = 0;
            this._keyframeStep = 0;
            this._snapshotStep = 0;
            this._timeout = 0;
            this._mapID = 0;
            this._frame = 0;
            this._msPerFrame = 0;
            this._nextKeyFrame = 0;
            this._logicElapsed = 0;
            this._realElapsed = 0;
            this._frameActionGroups = new Queue_1.default();
            this._entities = [];
            this._idToEntity = new Map();
        }
        get frameRate() { return this._frameRate; }
        get keyframeStep() { return this._keyframeStep; }
        get snapshotStep() { return this._snapshotStep; }
        get timeout() { return this._timeout; }
        get mapID() { return this._mapID; }
        get frame() { return this._frame; }
        SetBattleInfo(battleInfo) {
            this._frameRate = battleInfo.frameRate;
            this._keyframeStep = battleInfo.keyframeStep;
            this._snapshotStep = battleInfo.snapshotStep;
            this._timeout = battleInfo.battleTime;
            this._mapID = battleInfo.mapID;
            this._msPerFrame = 1000 / this._frameRate;
            this._def = Defs_1.Defs.GetMap(this._mapID);
            this.CreatePlayers(battleInfo.playerInfos);
        }
        End() {
            const count = this._entities.length;
            for (let i = 0; i < count; i++)
                this._entities[i].Dispose();
            this._entities.splice(0);
            this._idToEntity.clear();
            this._frame = 0;
            this._nextKeyFrame = 0;
            this._logicElapsed = 0;
            this._realElapsed = 0;
            this._frameActionGroups.clear();
        }
        Update(dt) {
            this.Chase(this._frameActionGroups, true, true);
            this._realElapsed += dt;
            if (this.frame < this._nextKeyFrame) {
                this._logicElapsed += dt;
                while (this._logicElapsed >= this._msPerFrame) {
                    if (this.frame >= this._nextKeyFrame)
                        break;
                    this.UpdateLogic(this._msPerFrame, true, true);
                    this._realElapsed = 0;
                    this._logicElapsed -= this._msPerFrame;
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
                Logger_1.Logger.Log(`commit snapshot:${this._frame}, length:${data.length}`);
                const request = ProtoHelper_1.ProtoCreator.Q_GC2BS_CommitSnapshot();
                request.frame = this._frame;
                request.data = data;
                Global_1.Global.connector.SendToBS(protos_1.Protos.GC2BS_CommitSnapshot, request);
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
            Logger_1.Logger.Log("recv snapshot, frame:" + this._frame);
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
        InitSyncToView() {
            const writer = $protobuf.Writer.create();
            this.EncodeSnapshot(writer);
            const data = writer.finish();
            SyncEvent_1.SyncEvent.BattleInit(data);
        }
        SyncToView() {
            const writer = $protobuf.Writer.create();
            this.EncodeSnapshot(writer);
            const data = writer.finish();
            SyncEvent_1.SyncEvent.Snapshot(data);
        }
        Chase(frameActionGroups, updateView, commitSnapshot) {
            while (!frameActionGroups.isEmpty()) {
                const frameActionGroup = frameActionGroups.dequeue();
                let length = frameActionGroup.frame - this.frame;
                while (length > 0) {
                    this.UpdateLogic(this._msPerFrame, updateView, commitSnapshot);
                    Logger_1.Logger.Log("f:" + this._frame + ",L:" + length + ",S:" + frameActionGroup.frame);
                    --length;
                }
                this.ApplyFrameActionGroup(frameActionGroup);
                this._nextKeyFrame = frameActionGroup.frame + this.keyframeStep;
            }
        }
        CreatePlayers(playerInfos) {
            let arr = Hashtable_1.Hashtable.GetArray(this._def, "born_pos");
            let count = arr.length;
            const bornPoses = [];
            for (let i = 0; i < count; i++) {
                const pi = arr[i];
                bornPoses.push(new FVec2_1.FVec2(new decimal_1.default(pi[0]), new decimal_1.default(pi[1])));
            }
            arr = Hashtable_1.Hashtable.GetArray(this._def, "born_dir");
            count = arr.length;
            const bornDirs = [];
            for (let i = 0; i < count; i++) {
                const pi = arr[i];
                bornDirs.push(new FVec2_1.FVec2(new decimal_1.default(pi[0]), new decimal_1.default(pi[1])));
            }
            count = playerInfos.length;
            for (let i = 0; i < count; ++i) {
                const playerInfo = playerInfos[i];
                const player = this.CreateEntity(EntityType_1.EntityType.Champion, playerInfo.gcNID, playerInfo.actorID, playerInfo.team, playerInfo.name);
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
                case EntityType_1.EntityType.Champion:
                    entity = new Champion_1.Champion();
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
            if ((frameAction.inputFlag & FrameAction_1.FrameAction.InputFlag.Move) > 0) {
                entity.BeginMove(frameAction.dx, frameAction.dy);
            }
        }
        HandleSnapShot(ret) {
            if (ret.snapshot.length == 0)
                return;
            const reader = $protobuf.Reader.create(ret.snapshot);
            this.DecodeSnapshot(reader);
        }
        HandleFrameAction(frame, data) {
            const frameActionGroup = new FrameActionGroup_1.FrameActionGroup(frame);
            frameActionGroup.DeSerialize(data);
            this._frameActionGroups.enqueue(frameActionGroup);
        }
    }
    exports.Battle = Battle;
});
//# sourceMappingURL=Battle.js.map