define(["require", "exports", "../../RC/Collections/Queue", "../../RC/Utils/Logger"], function (require, exports, Queue_1, Logger_1) {
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
            this._frameActions = new Queue_1.default();
        }
        get frameRate() { return this._frameRate; }
        get keyframeStep() { return this._keyframeStep; }
        get timeout() { return this._timeout; }
        get mapID() { return this._mapID; }
        get frame() { return this._frame; }
        Init(loginRet) {
            this._frameRate = loginRet.frameRate;
            this._keyframeStep = loginRet.keyframeStep;
            this._timeout = loginRet.battleTime;
            this._mapID = loginRet.mapID;
            this._msPerFrame = 1000 / this._frameRate;
        }
        Clear() {
            this._frame = 0;
            this._nextKeyFrame = 0;
            this._logicElapsed = 0;
            this._realElapsed = 0;
            this._frameActions.clear();
        }
        Update(dt) {
            this._realElapsed += dt;
            while (!this._frameActions.isEmpty()) {
                let frameAction = this._frameActions.dequeue();
                let length = frameAction.frame - this.frame;
                while (length >= 0) {
                    if (length == 0)
                        this.HandleFrameAction(frameAction);
                    else {
                        this.UpdateLogic(this._realElapsed, this._msPerFrame);
                        this._realElapsed = 0;
                    }
                    --length;
                }
                this._nextKeyFrame = frameAction.frame + this.keyframeStep;
            }
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
        HandleFrameAction(frameAction) {
        }
        UpdateLogic(rdt, dt) {
            Logger_1.Logger.Log("rdt:" + rdt + ",dt:" + dt);
            ++this._frame;
        }
        OnFrameAction(frameAction) {
            this._frameActions.enqueue(frameAction);
        }
    }
    exports.Battle = Battle;
});
//# sourceMappingURL=Battle.js.map