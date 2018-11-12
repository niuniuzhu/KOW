import { ConnectionTest } from "./ConnectionTest";

export class Pressure {
	private static readonly UPDATE_INTERVAL: number = 20;
	private static readonly CONNECT_INTERVAL: number = 20;
	private static readonly MAX_CONNECTION: number = 1;

	private _tests: ConnectionTest[] = [];
	private _numConnections: number = 0;

	constructor() {
		setInterval(() => { this.Update() }, Pressure.UPDATE_INTERVAL);
		setInterval(() => { this.DoConnect() }, Pressure.CONNECT_INTERVAL);
	}

	private DoConnect(): void {
		if (this._numConnections >= Pressure.MAX_CONNECTION)
			return;
		++this._numConnections;
		const test = new ConnectionTest();
		this._tests.push(test);
	}

	private Update(): void {
		for (let i = 0; i < this._tests.length; i++) {
			const test = this._tests[i];
			test.Update(Pressure.UPDATE_INTERVAL);
		}
	}
}