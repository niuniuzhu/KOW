type GeneralHandler = (message:any) => void;

export class MsgCenter {
	private readonly _generalHandlers: Map<number, GeneralHandler>;

	constructor() {
		this._generalHandlers = new Map<number, GeneralHandler>();
	}

	public Register(msgID: number, handler: GeneralHandler): void {
		if (this._generalHandlers.has(msgID))
			return;
		this._generalHandlers[msgID] = handler;
	}

	public Unregister(msgID: number, handler: GeneralHandler): boolean {
		return this._generalHandlers.delete(msgID);
	}

	public GetHandler(msgID: number): GeneralHandler {
		return this._generalHandlers.get(msgID);
	}
}