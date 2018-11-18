define(["require", "exports", "../../Libs/protobufjs", "../../RC/Collections/Queue", "../../RC/Utils/Logger", "../EntityType", "../Events/SyncEvent", "../FrameAction", "../FrameActionGroup", "./Champion"], function (require, exports, $protobuf, Queue_1, Logger_1, EntityType_1, SyncEvent_1, FrameAction_1, FrameActionGroup_1, Champion_1) {
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
            const reader = $protobuf.Reader.create(battleInfo.snapshot);
            this.InitSnapshot(reader);
            const writer = $protobuf.Writer.create();
            this.EncodeSnapshot(writer);
            const data = writer.finish();
            SyncEvent_1.SyncEvent.BattleInit(data);
        }
        End() {
            const count = this._entities.length;
            for (let i = 0; i < count; i++)
                this._entities[i].Dispose();
            this._frame = 0;
            this._nextKeyFrame = 0;
            this._logicElapsed = 0;
            this._realElapsed = 0;
            this._frameActionGroups.clear();
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
        InitSnapshot(reader) {
            this._frame = reader.int32();
            const count = reader.int32();
            for (let i = 0; i < count; i++) {
                const type = reader.int32();
                const id = reader.uint64();
                const entity = this.CreateEntity(type, id);
                entity.DecodeSnapshot(reader);
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
                const entity = this.GetEntity(id);
                if (entity == null)
                    continue;
                entity.DecodeSnapshot(reader);
            }
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
        SyncToView() {
            const writer = $protobuf.Writer.create();
            this.EncodeSnapshot(writer);
            const data = writer.finish();
            SyncEvent_1.SyncEvent.Snapshot(data);
        }
        CreateEntity(type, id) {
            let entity;
            switch (type) {
                case EntityType_1.EntityType.Champion:
                    entity = new Champion_1.Champion();
                    break;
                default:
                    throw new Error("not supported entity type:" + type);
            }
            entity.Init(id, this);
            this._entities.push(entity);
            this._idToEntity.set(entity.id, entity);
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
            Logger_1.Logger.Log(frameAction.dx + ":" + frameAction.dy);
        }
        OnFrameAction(frame, data) {
            const fag = new FrameActionGroup_1.FrameActionGroup(frame);
            const count = data[0];
            const reader = $protobuf.Reader.create(data);
            reader.pos = 1;
            for (let i = 0; i < count; ++i) {
                const frameAction = new FrameAction_1.FrameAction(frame);
                frameAction.DeSerialize(reader);
                fag.Add(frameAction);
            }
            this._frameActionGroups.enqueue(fag);
        }
    }
    exports.Battle = Battle;
});
//# sourceMappingURL=Battle.js.map