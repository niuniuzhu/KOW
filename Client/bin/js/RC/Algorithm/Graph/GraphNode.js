define(["require", "exports", "./GraphEdge"], function (require, exports, GraphEdge_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GraphNode {
        get index() { return this._index; }
        get edges() { return this._edges; }
        constructor(index) {
            this._index = index;
            this._edges = [];
        }
        AddEdge(from, to, cost) {
            let edge = new GraphEdge_1.GraphEdge(from, to, cost);
            this.edges.push(edge);
            return edge;
        }
    }
    exports.GraphNode = GraphNode;
});
//# sourceMappingURL=GraphNode.js.map