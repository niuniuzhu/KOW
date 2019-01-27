define(["require", "exports", "../../RC/Math/MathUtils"], function (require, exports, MathUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Shaker {
        constructor(startX, startY, amplitude, frequency, damping, duration, backToPosition) {
            this._startX = 0;
            this._startY = 0;
            this._duration = 0;
            this._backToPosition = true;
            this._tmpX = 0;
            this._tmpY = 0;
            this._targetX = 0;
            this._targetY = 0;
            this._curX = 0;
            this._curY = 0;
            this._time = 0;
            this._totalTime = 0;
            this._state = 0;
            this._finished = false;
            this._tmpX = this._startX = startX;
            this._tmpY = this._startY = startY;
            this._amplitude = amplitude;
            this._frequency = frequency;
            this._damping = damping;
            this._duration = duration;
            this._backToPosition = backToPosition;
            this.UpdateTarget();
        }
        Stop(backToPosition) {
            if (backToPosition) {
                this._state = 1;
                this._time = 0;
                this._tmpX = this._curX;
                this._tmpY = this._curY;
            }
            else {
                if (this.onComplete != null) {
                    this.onComplete();
                }
                this._finished = true;
            }
        }
        Update(dt) {
            if (this._finished) {
                return;
            }
            if (this._state == 0) {
                this.UpdateState0(dt);
            }
            else {
                this.UpdateState1(dt);
            }
        }
        UpdateState0(dt) {
            const t = MathUtils_1.MathUtils.Floor(1000 / this._frequency);
            this._curX = MathUtils_1.MathUtils.LerpUnclamped(this._tmpX, this._targetX, this._time / t);
            this._curY = MathUtils_1.MathUtils.LerpUnclamped(this._tmpY, this._targetY, this._time / t);
            this._time += dt;
            this._totalTime += dt;
            if (this._time >= t) {
                this._time = 0;
                this._tmpX = this._curX;
                this._tmpY = this._curY;
                this.UpdateTarget();
            }
            if (this.onUpdate != null) {
                this.onUpdate(this._curX, this._curY);
            }
            if (this._totalTime >= this._duration) {
                this.Stop(this._backToPosition);
            }
        }
        UpdateState1(dt) {
            const t = MathUtils_1.MathUtils.Floor(1000 / this._frequency);
            this._curX = MathUtils_1.MathUtils.LerpUnclamped(this._tmpX, this._startX, this._time / t);
            this._curY = MathUtils_1.MathUtils.LerpUnclamped(this._tmpY, this._startY, this._time / t);
            this._time += dt;
            if (this.onUpdate != null) {
                this.onUpdate(this._curX, this._curY);
            }
            if (this._time >= t) {
                if (this.onComplete != null) {
                    this.onComplete();
                }
                this._state = 0;
                this._finished = true;
            }
        }
        UpdateTarget() {
            const angle = Math.random() * MathUtils_1.MathUtils.PI2;
            this._targetX = this._startX + this._amplitude * MathUtils_1.MathUtils.Cos(angle);
            this._targetY = this._startY + this._amplitude * MathUtils_1.MathUtils.Sin(angle);
            this._amplitude *= this._damping;
        }
    }
    exports.Shaker = Shaker;
});
//# sourceMappingURL=Shaker.js.map