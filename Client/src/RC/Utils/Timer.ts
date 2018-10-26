export class Timer {
	public static get utcTime(): number {
		let d1 = new Date();
		return new Date(d1.getUTCFullYear(), d1.getUTCMonth(), d1.getUTCDate(), d1.getUTCHours(), d1.getUTCMinutes(), d1.getUTCSeconds(), d1.getUTCMilliseconds()).getTime();
	}

	public static ToLocalTimeString(utc: number): string {
		let d1 = new Date(utc);
		let d2 = Date.UTC(d1.getFullYear(), d1.getMonth(), d1.getDate(), d1.getHours(), d1.getMinutes(), d1.getSeconds(), d1.getMilliseconds());
		return d2.toLocaleString();
	}
}