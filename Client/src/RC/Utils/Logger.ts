export class Logger {
	public static Log(message: any): void {
		console.log(message);
	}

	public static Warn(message: any): void {
		console.warn(message);
	}

	public static Error(message: any): void {
		console.error(message);
	}

	public static Info(message: any): void {
		console.info(message);
	}

	public static Debug(message: any): void {
		console.debug(message);
	}

	public static Trace(message: any): void {
		console.trace(message);
	}

	public static Assert(condition: boolean, message: string): void {
		console.assert(condition, message);
	}

	public static Exception(message: string): void {
		console.exception(message);
	}
}