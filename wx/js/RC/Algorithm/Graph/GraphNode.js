import { GraphEdge } from "./GraphEdge";
export class GraphNode {
    get index() { return this._index; }
    get edges() { return this._edges; }
    constructor(index) {
        this._index = index;
        this._edges = [];
    }
    AddEdge(from, to, cost) {
        let edge = new GraphEdge(from, to, cost);
        this.edges.push(edge);
        return edge;
    }
}
