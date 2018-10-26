export class ConsistentRandom {
	private seed: number;

	constructor(seed: number) {
		this.seed = seed;
	}

	private Next(min: number, max: number): number {
		max = max || 0;
		min = min || 0;

		this.seed = (this.seed * 9301 + 49297) % 233280;
		let rnd = this.seed / 233280;

		return min + rnd * (max - min);
	}

	public NextInt(min: number, max: number): number {
		return Math.round(this.Next(min, max));
	}

	public NextDouble(): number {
		return this.Next(0, 1);
	}

	public Pick(collection: any[]): any {
		return collection[this.NextInt(0, collection.length - 1)];
	}
}
