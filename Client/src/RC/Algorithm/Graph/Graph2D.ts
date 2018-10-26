import { GraphBase } from "./GraphBase";
import { GraphNode } from "./GraphNode";
import { MathUtils } from "../../Math/MathUtils";

export class Graph2D extends GraphBase {
	private _row: number;
	private _col: number;

	public get row(): number { return this._row; }
	public get col(): number { return this._col; }

	constructor(row: number, col: number) {
		super(row * col);
		this._row = row;
		this._col = col;
	}

	public GetNode(row: number, col: number): GraphNode | undefined {
		return this.GetNodeAt(row * this.col + col);
	}

	public static CreateFullDigraph(row: number, col: number, rndFunc?: (index: number) => number): Graph2D {
		let graph = new Graph2D(row, col);
		let r = graph.row;
		let c = graph.col;
		for (let i = 0; i < r; i++) {
			for (let j = 0; j < c; j++) {
				let cur = i * c + j;
				let node = graph.GetNodeAt(cur);
				if (j < c - 1)
					node.AddEdge(cur, cur + 1, rndFunc == null ? 0 : rndFunc(cur + 1));
				if (j > 0)
					node.AddEdge(cur, cur - 1, rndFunc == null ? 0 : rndFunc(cur - 1));
				if (i < r - 1)
					node.AddEdge(cur, cur + c, rndFunc == null ? 0 : rndFunc(cur + c));
				if (i > 0)
					node.AddEdge(cur, cur - c, rndFunc == null ? 0 : rndFunc(cur - c));
				if (j < c - 1 && i < r - 1)
					node.AddEdge(cur, cur + c + 1, rndFunc == null ? 0 : rndFunc(cur + 1));
				if (j > 0 && i < r - 1)
					node.AddEdge(cur, cur + c - 1, rndFunc == null ? 0 : rndFunc(cur + 1));
				if (j < c - 1 && i > 0)
					node.AddEdge(cur, cur - c + 1, rndFunc == null ? 0 : rndFunc(cur + 1));
				if (j > 0 && i > 0)
					node.AddEdge(cur, cur - c - 1, rndFunc == null ? 0 : rndFunc(cur + 1));
			}
		}
		return graph;
	}

	public static CreateHVDigraph(row: number, col: number, rndFunc?: (index: number) => number): Graph2D {
		let graph = new Graph2D(row, col);
		let r = graph.row;
		let c = graph.col;
		for (let i = 0; i < r; i++) {
			for (let j = 0; j < c; j++) {
				let cur = i * c + j;
				let node = graph.GetNodeAt(cur);
				if (j < c - 1)
					node.AddEdge(cur, cur + 1, rndFunc == null ? 0 : rndFunc(cur + 1));
				if (j > 0)
					node.AddEdge(cur, cur - 1, rndFunc == null ? 0 : rndFunc(cur - 1));
				if (i < r - 1)
					node.AddEdge(cur, cur + c, rndFunc == null ? 0 : rndFunc(cur + c));
				if (i > 0)
					node.AddEdge(cur, cur - c, rndFunc == null ? 0 : rndFunc(cur - c));
			}
		}
		return graph;
	}

	public CoordToIndex(x: number, y: number): number {
		return y * this.col + x;
	}

	public IndexToCoord(index: number): number[] {
		let coord: number[] = [];
		coord[0] = index % this.col;
		coord[1] = MathUtils.Floor(index / this.col);
		return coord;
	}
}