define(["require", "exports", "../../Libs/protobufjs", "../../RC/Collections/Queue", "../../RC/Utils/Hashtable", "../EntityType", "../Events/SyncEvent", "../FrameAction", "../FrameActionGroup", "./Champion", "../../Libs/ByteBuffer", "../Defs", "../../RC/Math/Vec2"], function (require, exports, $protobuf, Queue_1, Hashtable_1, EntityType_1, SyncEvent_1, FrameAction_1, FrameActionGroup_1, Champion_1, ByteBuffer, Defs_1, Vec2_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Battle {
        constructor() {
            this._frameRate = 0;
            this._keyframeStep = 0;
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
        get timeout() { return this._timeout; }
        get mapID() { return this._mapID; }
        get frame() { return this._frame; }
        SetBattleInfo(battleInfo) {
            this._frameRate = battleInfo.frameRate;
            this._keyframeStep = battleInfo.keyframeStep;
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
        Update(dt) {
            this.Chase(true);
            this._realElapsed += dt;
            if (this.frame < this._nextKeyFrame) {
                this._logicElapsed += dt;
                while (this._logicElapsed >= this._msPerFrame) {
                    if (this.frame >= this._nextKeyFrame)
                        break;
                    this.UpdateLogic(this._msPerFrame);
                    this.SyncToView();
                    if (this.frame == this._nextKeyFrame) {
                    }
                    this._realElapsed = 0;
                    this._logicElapsed -= this._msPerFrame;
                }
            }
        }
        UpdateLogic(dt) {
            ++this._frame;
            const count = this._entities.length;
            for (let i = 0; i < count; i++) {
                const entity = this._entities[i];
                entity.Update(dt);
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
        Chase(updateView) {
            while (!this._frameActionGroups.isEmpty()) {
                const frameActionGroup = this._frameActionGroups.dequeue();
                let length = frameActionGroup.frame - this.frame;
                while (length >= 0) {
                    if (length == 0) {
                        this.ApplyFrameActionGroup(frameActionGroup);
                    }
                    else {
                        this.UpdateLogic(this._msPerFrame);
                        if (updateView)
                            this.SyncToView();
                    }
                    --length;
                }
                this._nextKeyFrame = frameActionGroup.frame + this.keyframeStep;
            }
        }
        CreatePlayers(playerInfos) {
            let arr = Hashtable_1.Hashtable.GetArray(this._def, "born_pos");
            let count = arr.length;
            const bornPoses = [];
            for (let i = 0; i < count; i++) {
                const pi = arr[i];
                bornPoses.push(new Vec2_1.Vec2(pi[0], pi[1]));
            }
            arr = Hashtable_1.Hashtable.GetArray(this._def, "born_dir");
            count = arr.length;
            const bornDirs = [];
            for (let i = 0; i < count; i++) {
                const pi = arr[i];
                bornDirs.push(new Vec2_1.Vec2(pi[0], pi[1]));
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
            const fag = new FrameActionGroup_1.FrameActionGroup(frame);
            const buffer = new ByteBuffer();
            buffer.littleEndian = true;
            buffer.append(data);
            buffer.offset = 0;
            const count = buffer.readByte();
            for (let i = 0; i < count; ++i) {
                const frameAction = new FrameAction_1.FrameAction(frame);
                frameAction.DeSerialize(buffer);
                fag.Add(frameAction);
            }
            this._frameActionGroups.enqueue(fag);
        }
    }
    exports.Battle = Battle;
});
//# sourceMappingURL=Battle.js.map