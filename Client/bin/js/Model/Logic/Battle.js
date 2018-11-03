define(["require", "exports", "../../RC/Collections/Queue", "../FrameAction", "./Champion", "../../Libs/protobufjs"], function (require, exports, Queue_1, FrameAction_1, Champion_1, $protobuf) {
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
            this._chaseCount = 0;
            this._frameActions = new Queue_1.default();
            this._entities = [];
            this._idToEntity = new Map();
        }
        get frameRate() { return this._frameRate; }
        get keyframeStep() { return this._keyframeStep; }
        get timeout() { return this._timeout; }
        get mapID() { return this._mapID; }
        get frame() { return this._frame; }
        Init(battleInfo) {
            this._frameRate = battleInfo.frameRate;
            this._keyframeStep = battleInfo.keyframeStep;
            this._timeout = battleInfo.battleTime;
            this._mapID = battleInfo.mapID;
            this._msPerFrame = 1000 / this._frameRate;
            const reader = $protobuf.Reader.create(battleInfo.snapshot);
            this.DecodeSnapshot(reader);
        }
        End() {
            const count = this._entities.length;
            for (let i = 0; i < count; i++)
                this._entities[i].Dispose();
            this._frame = 0;
            this._nextKeyFrame = 0;
            this._logicElapsed = 0;
            this._realElapsed = 0;
            this._chaseCount = 0;
            this._frameActions.clear();
        }
        DecodeSnapshot(reader) {
            this._frame = reader.int32();
            const count = reader.int32();
            for (let i = 0; i < count; i++) {
                const id = reader.uint64();
                const entity = this.CreateChampion(id);
                entity.DecodeSnapshot(reader);
            }
        }
        Chase() {
            while (!this._frameActions.isEmpty()) {
                const frameAction = this._frameActions.dequeue();
                let length = frameAction.frame - this.frame;
                while (length >= 0) {
                    if (length == 0)
                        this.ApplyFrameAction(frameAction);
                    else {
                        this.UpdateLogic(0, this._msPerFrame);
                    }
                    --length;
                }
                this._nextKeyFrame = frameAction.frame + this.keyframeStep;
            }
        }
        Update(dt) {
            this.Chase();
            this._realElapsed += dt;
            if (this.frame < this._nextKeyFrame) {
                this._logicElapsed += dt;
                while (this._logicElapsed >= this._msPerFrame) {
                    if (this.frame >= this._nextKeyFrame)
                        break;
                    this.UpdateLogic(this._realElapsed, this._msPerFrame);
                    if (this.frame == this._nextKeyFrame) {
                    }
                    this._realElapsed = 0;
                    this._logicElapsed -= this._msPerFrame;
                }
            }
        }
        UpdateLogic(rdt, dt) {
            ++this._frame;
            const count = this._entities.length;
            for (let i = 0; i < count; i++) {
                const entity = this._entities[i];
                entity.Update(dt);
            }
        }
        ApplyFrameAction(frameAction) {
            this._frameActions.clear();
        }
        OnFrameAction(frame, data) {
            const count = data[0];
            const reader = $protobuf.Reader.create(data);
            reader.pos = 1;
            for (let i = 0; i < count; ++i) {
                const frameAction = new FrameAction_1.FrameAction(frame);
                frameAction.DeSerialize(reader);
                this._frameActions.enqueue(frameAction);
            }
        }
        CreateChampion(id) {
            const entity = new Champion_1.Champion();
            entity.Init(id, this);
            this._entities.push(entity);
            this._idToEntity.set(entity.id, entity);
            return entity;
        }
    }
    Battle.MAX_FRAME_CHASE = 10;
    exports.Battle = Battle;
});
//# sourceMappingURL=Battle.js.map