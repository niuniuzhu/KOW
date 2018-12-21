import { FMathUtils } from "./FMathUtils";

export class FRandom {
	private _seed: number;

	constructor(seed?: number) {
		this._seed = seed || Math.random();
	}

	public Next(): number {
		this._seed = FMathUtils.Mod(FMathUtils.Add(FMathUtils.Mul(this._seed, 9301), 49497), 233280);
		return FMathUtils.Div(this._seed, 233280);
	}

	public NextD(min: number, max: number): number {
		this._seed = FMathUtils.Mod(FMathUtils.Add(FMathUtils.Mul(this._seed, 9301), 49497), 233280);
		return FMathUtils.Add(FMathUtils.Mul(FMathUtils.Div(this._seed, 233280), FMathUtils.Sub(max, min)), min);
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