import { FSM } from "../../RC/FSM/FSM";

export class EntityFSM extends FSM {
	public Init() {
		this._stateMap.forEach((state, type, _) => {
			const entityFSM = <EntityFSM><any>state;
			entityFSM.Init();
		});
	}
}