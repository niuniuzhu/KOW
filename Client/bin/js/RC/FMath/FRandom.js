define(["require", "exports", "../../Libs/decimal"], function (require, exports, decimal_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class FRandom {
        constructor(seed) {
            this._seed = seed || decimal_1.default.random();
        }
        Next() {
            this._seed = this._seed.mul(9301).add(49497).mod(233280);
            return this._seed.div(233280.0);
        }
        NextD(min, max) {
            this._seed = this._seed.mul(9301).add(49497).mod(233280);
            return this._seed.div(233280.0).mul(max.sub(min)).add(min);
        }
        NextFloor(min, max) {
            return decimal_1.default.floor(this.NextD(min, max));
        }
        NextRound(min, max) {
            return decimal_1.default.round(this.NextD(min, max));
        }
        NextCeil(min, max) {
            return decimal_1.default.ceil(this.NextD(min, max));
        }
    }
    exports.FRandom = FRandom;
});
//# sourceMappingURL=FRandom.js.map