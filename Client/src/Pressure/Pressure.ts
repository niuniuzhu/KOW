import { ConnectionTest } from "./ConnectionTest";

export class Pressure {
	private static readonly UPDATE_INTERVAL: number = 20;

	private _tests: ConnectionTest[] = [];

	constructor() {
		for (let i = 0; i < 2; ++i) {
			const test = new ConnectionTest();
			this._tests.push(test);
		}

		setInterval(() => { this.Update() }, Pressure.UPDATE_INTERVAL);
	}

	private Update(): void {
		for (let i = 0; i < this._tests.length; i++) {
			const test = this._tests[i];
			test.Update(Pressure.UPDATE_INTERVAL);
		}
	}
}