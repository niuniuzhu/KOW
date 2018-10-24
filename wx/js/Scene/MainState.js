import { SceneState } from "./SceneState";
import { UIManager } from "../UI/UIManager";
export class MainState extends SceneState {
    constructor(type) {
        super(type);
        this.__ui = this._ui = UIManager.main;
    }
}
//# sourceMappingURL=MainState.js.map