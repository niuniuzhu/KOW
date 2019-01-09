import { GraphNode } from "./GraphNode";

export class GraphBase {
	private _nodes: GraphNode[];
	private readonly _idToNodes = new Map<number, GraphNode>();

	public get size(): number { return this._nodes.length; }

	public set nodes(value: GraphNode[]) {
		this._nodes = value;
		this._idToNodes.clear();
		for (let node of this._nodes) {
			this._idToNodes.set(node.index, node);
		}
	}

	constructor(size: number) {
		let ns: GraphNode[] = [];
		for (let i = 0; i < size; i++)
			ns[i] = new GraphNode(i);
		this.nodes = ns;
	}

	public GetNodeAt(index: number): GraphNode {
		return this._idToNodes.get(index);
	}

	public Foreach(loopFunc: (node: GraphNode) => void): void {
		for (let node of this._nodes)
			loopFunc(node);
	}
}