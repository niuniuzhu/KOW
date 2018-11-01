enum Platform {
	Editor,
	Web,
	WXMini
}

export class Env {
	public static readonly Platform = Platform;
	
	public static platform: Platform;
}