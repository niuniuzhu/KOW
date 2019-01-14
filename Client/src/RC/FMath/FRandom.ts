import { FMathUtils } from "./FMathUtils";

export class FRandom {
	private _seed: number;

	constructor(seed?: number) {
		this._seed = seed || Math.random();
	}

	public Next(): number {
		this._seed = (this._seed * 9301 + 49297) % 233280;
		const result = FMathUtils.Div(this._seed, 233280.0);
		return result;
	}

	public NextD(min: number, max: number): number {
		//max不能超过0xfffff
		const r = this.Next();
		return FMathUtils.Add(FMathUtils.Mul(r, FMathUtils.Sub(max, min)), min);
	}

	public NextFloor(min: number, max: number): number {
		return FMathUtils.Floor(this.NextD(min, max));
	}

	public NextRound(min: number, max: number): number {
		return FMathUtils.Round(this.NextD(min, max));
	}

	public NextCeil(min: number, max: number): number {
		return FMathUtils.Ceil(this.NextD(min, max));
	}
}