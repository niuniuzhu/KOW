import { ConnectionTest } from "./ConnectionTest";
import { MathUtils } from "../RC/Math/MathUtils";

export class Pressure {
	private static readonly UPDATE_INTERVAL: number = 20;
	private static readonly CONNECT_INTERVAL: number = 500;
	private static readonly MAX_CONNECTION: number = 9999;

	private _tests: ConnectionTest[] = [];
	private _numConnections: number = 0;
	private _time: number = 0;

	constructor() {
		setInterval(() => { this.Update() }, Pressure.UPDATE_INTERVAL);
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
		this._time += Pressure.UPDATE_INTERVAL;
		if (this._time >= MathUtils.RandomCeil(Pressure.CONNECT_INTERVAL - 100, Pressure.CONNECT_INTERVAL + 100)) {
			this._time = 0;
			this.DoConnect();
		}
	}
}