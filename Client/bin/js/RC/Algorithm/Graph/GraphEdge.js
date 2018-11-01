define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GraphEdge {
        get from() { return this._from; }
        get to() { return this._to; }
        get cost() { return this._cost; }
        constructor(from, to, cost = 0) {
            this._from = from;
            this._to = to;
            this._cost = cost;
        }
        static Compare(a, b) {
            if (a._cost > b._cost) {
                return -1;
            }
            if (a._cost < b._cost) {
                return 1;
            }
            return 0;
        }
    }
    exports.GraphEdge = GraphEdge;
});
//# sourceMappingURL=GraphEdge.js.map