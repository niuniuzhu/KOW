import Queue from "../../RC/Collections/Queue";
import { FrameAction } from "../FrameAction";
import { Champion } from "./Champion";
import * as $protobuf from "../../Libs/protobufjs";
import { Logger } from "../../RC/Utils/Logger";
import { FrameActionGroup } from "../FrameActionGroup";
export class Battle {
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
        this._frameActionGroups = new Queue();
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
        this._frameActionGroups.clear();
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
        while (!this._frameActionGroups.isEmpty()) {
            const frameActionGroup = this._frameActionGroups.dequeue();
            let length = frameActionGroup.frame - this.frame;
            while (length >= 0) {
                if (length == 0) {
                    for (let i = 0; i < frameActionGroup.numActions; ++i) {
                        this.ApplyFrameAction(frameActionGroup[i]);
                    }
                }
                else {
                    this.UpdateLogic(0, this._msPerFrame);
                }
                --length;
            }
            this._nextKeyFrame = frameActionGroup.frame + this.keyframeStep;
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
        Logger.Log("f" + this._frame);
        const count = this._entities.length;
        for (let i = 0; i < count; i++) {
            const entity = this._entities[i];
            entity.Update(dt);
        }
    }
    ApplyFrameAction(frameAction) {
    }
    OnFrameAction(frame, data) {
        const fag = new FrameActionGroup(frame);
        const count = data[0];
        const reader = $protobuf.Reader.create(data);
        reader.pos = 1;
        for (let i = 0; i < count; ++i) {
            const frameAction = new FrameAction(frame);
            frameAction.DeSerialize(reader);
            fag.Add(frameAction);
        }
        this._frameActionGroups.enqueue(fag);
    }
    CreateChampion(id) {
        const entity = new Champion();
        entity.Init(id, this);
        this._entities.push(entity);
        this._idToEntity.set(entity.id, entity);
        return entity;
    }
}
Battle.MAX_FRAME_CHASE = 10;
