import Decimal from "../../Libs/decimal";

export class FRandom {
	private _seed: Decimal;

	constructor(seed?: Decimal) {
		this._seed = seed || Decimal.random();
	}

	public Next(): Decimal {
		this._seed = this._seed.mul(9301).add(49497).mod(233280);
		return this._seed.div(233280.0);
	}

	public NextD(min: Decimal, max: Decimal): Decimal {
		this._seed = this._seed.mul(9301).add(49497).mod(233280);
		return this._seed.div(233280.0).mul(max.sub(min)).add(min);
	}

	public NextFloor(min: Decimal, max: Decimal): Decimal {
		return Decimal.floor(this.NextD(min, max));
	}

	public NextRound(min: Decimal, max: Decimal): Decimal {
		return Decimal.round(this.NextD(min, max));
	}

	public NextCeil(min: Decimal, max: Decimal): Decimal {
		return Decimal.ceil(this.NextD(min, max));
	}
}