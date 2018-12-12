define(["require", "exports", "../../Global", "../../Libs/decimal", "../../Libs/protobufjs", "../../Libs/protos", "../../Net/ProtoHelper", "../../RC/Collections/Queue", "../../RC/FMath/FRect", "../../RC/FMath/FVec2", "../../RC/Math/MathUtils", "../../RC/Utils/Hashtable", "../CDefs", "../Defs", "../EntityType", "../Events/SyncEvent", "../FrameAction", "../FrameActionGroup", "./Champion"], function (require, exports, Global_1, decimal_1, $protobuf, protos_1, ProtoHelper_1, Queue_1, FRect_1, FVec2_1, MathUtils_1, Hashtable_1, CDefs_1, Defs_1, EntityType_1, SyncEvent_1, FrameAction_1, FrameActionGroup_1, Champion_1) {
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
            this._destroied = false;
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
        get bounds() { return this._bounds; }
        SetBattleInfo(battleInfo) {
            this._destroied = false;
            this._frameRate = battleInfo.frameRate;
            this._keyframeStep = battleInfo.keyframeStep;
            this._snapshotStep = battleInfo.snapshotStep;
            this._timeout = battleInfo.battleTime;
            this._mapID = battleInfo.mapID;
            this._msPerFrame = new decimal_1.default(1000 / this._frameRate);
            this._cdef = CDefs_1.CDefs.GetMap(this._mapID);
            this._def = Defs_1.Defs.GetMap(this._mapID);
            const bWidth = Hashtable_1.Hashtable.GetNumber(this._cdef, "width");
            const bHeight = Hashtable_1.Hashtable.GetNumber(this._cdef, "height");
            this._bounds = new FRect_1.FRect(new decimal_1.default(-MathUtils_1.MathUtils.Floor(bWidth * 0.5)), new decimal_1.default(-MathUtils_1.MathUtils.Floor(bHeight * 0.5)), new decimal_1.default(bWidth), new decimal_1.default(bHeight));
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
            this._frame = 0;
            this._nextKeyFrame = 0;
            this._logicElapsed = null;
            this._realElapsed = null;
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
                    this._realElapsed = new decimal_1.default(0);
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