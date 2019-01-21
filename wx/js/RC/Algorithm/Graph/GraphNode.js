"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GraphEdge_1 = require("./GraphEdge");
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
