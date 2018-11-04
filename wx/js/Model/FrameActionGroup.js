export class FrameActionGroup {
    constructor(frame) {
        this._frameActions = [];
        this._frame = frame;
    }
    get frame() { return this._frame; }
    get numActions() { return this._frameActions.length; }
    Add(frameAction) {
        this._frameActions.push(frameAction);
    }
    Get(index) {
        return this._frameActions[index];
    }
}
