export class GraphEdge {
	private _from: number;
	private _to: number;
	private _cost: number;

	public get from(): number { return this._from; }
	public get to(): number { return this._to; }
	public get cost(): number { return this._cost; }

	public constructor(from: number, to: number, cost: number = 0) {
		this._from = from;
		this._to = to;
		this._cost = cost;
	}

	public static Compare(a: GraphEdge, b: GraphEdge): number {
		if (a._cost > b._cost) {
			return -1;
		} if (a._cost < b._cost) {
			return 1;
		}
		return 0;
	}
}