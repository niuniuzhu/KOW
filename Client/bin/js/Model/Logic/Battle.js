define(["require", "exports", "../../Global", "../../Libs/decimal", "../../Libs/protobufjs", "../../Libs/protos", "../../Net/ProtoHelper", "../../RC/Collections/Queue", "../../RC/FMath/FMathUtils", "../../RC/FMath/FRandom", "../../RC/FMath/FRect", "../../RC/FMath/FVec2", "../../RC/Math/MathUtils", "../../RC/Utils/Hashtable", "../BattleEvent/SyncEvent", "../CDefs", "../Defs", "../EntityType", "../FrameAction", "../FrameActionGroup", "./Bullet", "./Champion", "./Emitter", "./Entity", "../../Libs/long"], function (require, exports, Global_1, decimal_1, $protobuf, protos_1, ProtoHelper_1, Queue_1, FMathUtils_1, FRandom_1, FRect_1, FVec2_1, MathUtils_1, Hashtable_1, SyncEvent_1, CDefs_1, Defs_1, EntityType_1, FrameAction_1, FrameActionGroup_1, Bullet_1, Champion_1, Emitter_1, Entity_1, Long) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const TYPE_TO_CONSTRUCT = new Map();
    TYPE_TO_CONSTRUCT.set(EntityType_1.EntityType.Champion, Champion_1.Champion);
    TYPE_TO_CONSTRUCT.set(EntityType_1.EntityType.Bullet, Bullet_1.Bullet);
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
            this._random = new FRandom_1.FRandom(new decimal_1.default(battleInfo.rndSeed));
            this._timeout = battleInfo.battleTime;
            this._mapID = battleInfo.mapID;
            this._msPerFrame = new decimal_1.default(1000 / this._frameRate);
            this._frame = 0;
            this._nextKeyFrame = 0;
            this._logicElapsed = new decimal_1.default(0);
            this._realElapsed = new decimal_1.default(0);
            this._cdef = CDefs_1.CDefs.GetMap(this._mapID);
            this._def = Defs_1.Defs.GetMap(this._mapID);
            const bWidth = Hashtable_1.Hashtable.GetNumber(this._cdef, "width");
            const bHeight = Hashtable_1.Hashtable.GetNumber(this._cdef, "height");
            this._bounds = new FRect_1.FRect(new decimal_1.default(-MathUtils_1.MathUtils.Floor(bWidth * 0.5)), new decimal_1.default(-MathUtils_1.MathUtils.Floor(bHeight * 0.5)), new decimal_1.default(bWidth), new decimal_1.default(bHeight));
        }
        Destroy() {
            if (this._destroied)
                return;
            this._destroied = true;
            const count = this._entities.length;
            for (let i = 0; i < count; i++)
                this._entities[i].Destroy();
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
                    this._realElapsed = new decimal_1.default(0);
                    this._logicElapsed = this._logicElapsed.sub(this._msPerFrame);
                }
            }
        }
        UpdateLogic(dt, updateView, commitSnapshot) {
            ++this._frame;
            let count = this._entities.length;
            for (let i = 0; i < count; i++) {
                const entity = this._entities[i];
                entity.Update(dt);
            }
            count = this._emitters.length;
            for (let i = 0; i < count; i++) {
                const emitter = this._emitters[i];
                emitter.Update(dt);
            }
            if (updateView) {
                this.SyncToView();
            }
            count = this._entities.length;
            for (let i = 0; i < count; i++) {
                const entity = this._entities[i];
                if (entity.markToDestroy) {
                    this.DestroyEntityAt(i);
                    --i;
                    --count;
                }
            }
            count = this._emitters.length;
            for (let i = 0; i < count; i++) {
                const emitter = this._emitters[i];
                if (emitter.markToDestroy) {
                    this.DestroyEmitterAt(i);
                    --i;
                    --count;
                }
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
                writer.int32(entity.type);
                entity.EncodeSnapshot(writer);
            }
        }
        DecodeSnapshot(reader) {
            this._frame = reader.int32();
            const count = reader.int32();
            for (let i = 0; i < count; i++) {
                const type = reader.int32();
                const ctr = TYPE_TO_CONSTRUCT.get(type);
                const entity = new ctr(this);
                entity.DecodeSnapshot(reader);
                this._entities.push(entity);
                this._idToEntity.set(entity.rid.toString(), entity);
            }
        }
        EncodeSync(writer) {
            writer.int32(this._frame);
            const count = this._entities.length;
            writer.int32(count);
            for (let i = 0; i < count; i++) {
                const entity = this._entities[i];
                writer.int32(entity.type);
                entity.EncodeSync(writer);
            }
        }
        SyncInitToView() {
            const writer = $protobuf.Writer.create();
            this.EncodeSync(writer);
            const data = writer.finish();
            SyncEvent_1.SyncEvent.BattleInit(data);
        }
        SyncToView() {
            const writer = $protobuf.Writer.create();
            this.EncodeSync(writer);
            const data = writer.finish();
            SyncEvent_1.SyncEvent.Snapshot(data);
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
            const rnd = this._random.NextFloor(FMathUtils_1.FMathUtils.D_ZERO, FMathUtils_1.FMathUtils.D_BIG);
            return Long.fromBits(id, rnd.toNumber());
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
            const params = new Entity_1.EntityInitParams();
            count = playerInfos.length;
            for (let i = 0; i < count; ++i) {
                const playerInfo = playerInfos[i];
                params.rid = playerInfo.gcNID;
                params.id = playerInfo.actorID;
                params.team = playerInfo.team;
                params.name = playerInfo.name;
                const player = this.CreateEntity(EntityType_1.EntityType.Champion, params);
                if (player.team >= bornPoses.length ||
                    player.team >= bornDirs.length) {
                    throw new Error("invalid team:" + player.team + ", player:" + player.rid);
                }
                player.position.CopyFrom(bornPoses[player.team]);
                player.direction.CopyFrom(bornDirs[player.team]);
            }
        }
        CreateEntity(type, params) {
            const ctr = TYPE_TO_CONSTRUCT.get(type);
            const entity = new ctr(this);
            entity.Init(params);
            this._entities.push(entity);
            this._idToEntity.set(entity.rid.toString(), entity);
            return entity;
        }
        DestroyEntity(entity) {
            entity.Destroy();
            this._entities.splice(this._entities.indexOf(entity), 1);
            this._idToEntity.delete(entity.rid.toString());
        }
        DestroyEntityAt(index) {
            const entity = this._entities[index];
            entity.Destroy();
            this._entities.splice(index, 1);
            this._idToEntity.delete(entity.rid.toString());
        }
        GetEntity(rid) {
            return this._idToEntity.get(rid.toString());
        }
        CreateEmitter(id, casterID, skillID) {
            const emitter = new Emitter_1.Emitter(this);
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
        ApplyFrameActionGroup(frameActionGroup) {
            for (let i = 0; i < frameActionGroup.numActions; i++) {
                this.ApplyFrameAction(frameActionGroup.Get(i));
            }
        }
        ApplyFrameAction(frameAction) {
            const entity = this.GetEntity(frameAction.gcNID);
            if ((frameAction.inputFlag & FrameAction_1.FrameAction.InputFlag.Move) > 0) {
                entity.BeginMove(frameAction.dx, frameAction.dy);
            }
            if ((frameAction.inputFlag & FrameAction_1.FrameAction.InputFlag.Skill) > 0) {
                entity.UseSkill(frameAction.sid);
            }
        }
        HandleSnapShot(ret) {
            const reader = $protobuf.Reader.create(ret.snapshot);
            this.DecodeSnapshot(reader);
        }
        HandleFrameAction(frame, data) {
            const frameActionGroup = new FrameActionGroup_1.FrameActionGroup(frame);
            frameActionGroup.Deserialize(data);
            this._frameActionGroups.enqueue(frameActionGroup);
        }
    }
    exports.Battle = Battle;
});
//# sourceMappingURL=Battle.js.map