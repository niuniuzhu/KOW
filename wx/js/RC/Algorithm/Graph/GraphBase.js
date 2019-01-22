import { GraphNode } from "./GraphNode";
export class GraphBase {
    constructor(size) {
        this._idToNodes = new Map();
        let ns = [];
        for (let i = 0; i < size; i++)
            ns[i] = new GraphNode(i);
        this.nodes = ns;
    }
    get size() { return this._nodes.length; }
    set nodes(value) {
        this._nodes = value;
        this._idToNodes.clear();
        for (let node of this._nodes) {
            this._idToNodes.set(node.index, node);
        }
    }
    GetNodeAt(index) {
        return this._idToNodes.get(index);
    }
    Foreach(loopFunc) {
        for (let node of this._nodes)
            loopFunc(node);
    }
}
