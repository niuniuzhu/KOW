import { FSMState } from "../../RC/FSM/FSMState";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { EntityStateAction } from "./EntityStateAction";
import { ID_TO_STATE_ACTION } from "./StateEnums";

export abstract class EntityStateBase extends FSMState {
	private readonly _idToActions: Map<number, EntityStateAction> = new Map<number, EntityStateAction>();

	protected Init(def: Hashtable): void {
		//初始化状态行为
		const actionsDef = Hashtable.GetMapArray(def, "actions");
		if (actionsDef != null)
			this.CreateActions(actionsDef);
	}

	private CreateActions(actionsDef: Hashtable[]): void {
		let actionDef: Hashtable;
		for (actionDef of actionsDef) {
			const id = Hashtable.GetNumber(actionDef, "id");
			const ctr = ID_TO_STATE_ACTION.get(id);
			const action = new ctr(this, id, actionDef);
			this.AddAction(action);
		}
	}

	public AddAction(action: EntityStateAction): void {
		super.AddAction(action);
		this._idToActions.set(action.id, action);
	}

	public RemoveAction(action: EntityStateAction): void {
		super.RemoveAction(action);
		this._idToActions.delete(action.id);
	}

	public GetAction(id: number): EntityStateAction {
		return this._idToActions.get(id);
	}
}