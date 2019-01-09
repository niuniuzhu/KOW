import { FSMStateAction } from "../../../RC/FSM/FSMStateAction";
export class VEntityStateAction extends FSMStateAction {
    constructor(state, type, def) {
        super(state, type);
        this.OnInit(def);
    }
    OnInit(def) {
    }
}
