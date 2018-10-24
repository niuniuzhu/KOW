export class Debug {
	public static Log(message: any) {
		console.log(message);
	}

	public static Warn(message: any) {
		console.warn(message);
	}

	public static Error(message: any) {
		console.error(message);
	}

	public static Exception(message: any) {
		console.exception(message);
	}

	public static Info(message: any) {
		console.info(message);
	}

	public static Trace(message: any) {
		console.trace(message);
	}

	public static Debug(message: any) {
		console.debug(message);
	}

	public static Assert(value: any, message: any) {
		console.assert(value, message);
	}
}