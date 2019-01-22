export class MsgCenter {
    constructor() {
        this._generalHandlers = new Map();
    }
    Register(msgID, handler) {
        if (this._generalHandlers.has(msgID))
            return;
        this._generalHandlers.set(msgID, handler);
    }
    Unregister(msgID, handler) {
        return this._generalHandlers.delete(msgID);
    }
    GetHandler(msgID) {
        return this._generalHandlers.get(msgID);
    }
}
