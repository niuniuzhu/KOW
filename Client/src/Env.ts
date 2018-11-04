enum Platform {
	Editor,
	Web,
	WXMini
}

enum RunMode {
	Game,
	Pressure
}

export class Env {
	public static readonly Platform = Platform;
	public static readonly RunMode = RunMode;
	
	public static platform: Platform;
}