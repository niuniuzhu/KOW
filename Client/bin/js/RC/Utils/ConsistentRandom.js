define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ConsistentRandom {
        constructor(seed) {
            this.seed = seed;
        }
        Next(min, max) {
            max = max || 0;
            min = min || 0;
            this.seed = (this.seed * 9301 + 49297) % 233280;
            let rnd = this.seed / 233280;
            return min + rnd * (max - min);
        }
        NextInt(min, max) {
            return Math.round(this.Next(min, max));
        }
        NextDouble() {
            return this.Next(0, 1);
        }
        Pick(collection) {
            return collection[this.NextInt(0, collection.length - 1)];
        }
    }
    exports.ConsistentRandom = ConsistentRandom;
});
//# sourceMappingURL=ConsistentRandom.js.map