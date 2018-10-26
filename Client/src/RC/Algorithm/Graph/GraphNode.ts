import { GraphEdge } from "./GraphEdge";

export class GraphNode {
	private _index: number;
	private readonly _edges: GraphEdge[];

	public get index(): number { return this._index; }
	public get edges(): GraphEdge[] { return this._edges; }

	constructor(index: number) {
		this._index = index;
		this._edges = [];
	}

	public AddEdge(from: number, to: number, cost: number): GraphEdge {
		let edge = new GraphEdge(from, to, cost);
		this.edges.push(edge);
		return edge;
	}
}