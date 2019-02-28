import { FMathUtils } from "./FMathUtils";

export class FRandom {
	public seed: number;

	constructor(seed?: number) {
		this.seed = seed || Math.random();
	}

	public Next(): number {
		this.seed = (this.seed * 9301 + 49297) % 233280;
		const result = FMathUtils.Div(this.seed, 233280.0);
		return result;
	}

	public NextDouble(min: number, max: number): number {
		//max不能超过0xfffff
		const r = this.Next();
		return FMathUtils.Add(FMathUtils.Mul(r, FMathUtils.Sub(max, min)), min);
	}

	public NextFloor(min: number, max: number): number {
		return FMathUtils.Floor(this.NextDouble(min, max));
	}

	public NextRound(min: number, max: number): number {
		return FMathUtils.Round(this.NextDouble(min, max));
	}

	public NextCeil(min: number, max: number): number {
		return FMathUtils.Ceil(this.NextDouble(min, max));
	}
}