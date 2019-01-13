import * as $protobuf from "../../../Libs/protobufjs";
import { FSM } from "../../../RC/FSM/FSM";
import { Hashtable } from "../../../RC/Utils/Hashtable";
import { ISnapshotable } from "../../ISnapshotable";
import { StateType } from "../../StateEnums";
import { InputType } from "../InputAagent";
import { EntityState } from "./EntityState";
import { EntityStateContext } from "./EntityStateContext";

export class EntityFSM extends FSM implements ISnapshotable {
	public readonly context: EntityStateContext = new EntityStateContext();
	public get currentEntityState(): EntityState { return <EntityState>this.currentState; }
	public get previousEntityState(): EntityState { return <EntityState>this.previousState; }
	public get globalEntityState(): EntityState { return <EntityState>this.globalState; }

	public Init(statesDef: Hashtable) {
		for (const state of this._states) {
			const entityFSM = <EntityState>state;
			entityFSM.Init(statesDef);
		}
	}

	public UpdatePhysic(dt: number): void {
		if (this.globalEntityState != null)
			this.globalEntityState.UpdatePhysic(dt);
		if (this.currentEntityState != null)
			this.currentEntityState.UpdatePhysic(dt);
	}

	/**
	 * 转换状态
	 * @param type 转换类型
	 * @param param 携带参数
	 * @param igroneIntrptList 是否忽略中断列表
	 * @param force 是否强制转换
	 */
	public ChangeState(type: StateType, param: any = null, igroneIntrptList: boolean = false, force: boolean = false): boolean {
		if (!igroneIntrptList) {
			const state = <EntityState>this.currentState;
			if (state != null &&
				!state.IsStateAvailable(type)) {
				return false;
			}
		}
		return super.ChangeState(type, param, force);
	}

	public EncodeSnapshot(writer: $protobuf.Writer | $protobuf.BufferWriter): void {
		writer.fork();
		for (const state of this._states) {
			const entityFSM = <EntityState>state;
			entityFSM.EncodeSnapshot(writer);
		}

		if (this.globalEntityState != null) {
			(<EntityState>this.globalEntityState).EncodeSnapshot(writer);
		}
		writer.ldelim();

		writer.bool(this.currentEntityState != null);
		if (this.currentEntityState != null)
			writer.int32(this.currentEntityState.type);

		writer.bool(this.previousEntityState != null);
		if (this.previousEntityState != null)
			writer.int32(this.previousEntityState.type);

		this.context.EncodeSnapshot(writer);
	}

	public DecodeSnapshot(reader: $protobuf.Reader | $protobuf.BufferReader): void {
		reader.int32();
		for (const state of this._states) {
			const entityFSM = <EntityState>state;
			entityFSM.DecodeSnapshot(reader);
		}

		if (this.globalEntityState != null) {
			this.globalEntityState.DecodeSnapshot(reader);
		}

		if (reader.bool()) {
			this._currentState = this.GetState(reader.int32());
		}

		if (reader.bool()) {
			this._previousState = this.GetState(reader.int32());
		}

		this.context.DecodeSnapshot(reader);
	}

	public HandleInput(type: InputType, press: boolean): void {
		this.currentEntityState.HandleInput(type, press);
	}

	public Dump(): string {
		let str = "";
		str += `state count:${this._states.length}\n`;
		for (const state of this._states) {
			str += (<EntityState>state).Dump();
		}
		if (this.globalEntityState != null) {
			str += `global state:${this.globalEntityState.Dump()}\n`;
		}
		str += "current state:" + this.currentEntityState.Dump();
		if (this.previousEntityState != null)
			str += `previous state:${this.previousEntityState.Dump()}\n`;
		return str;
	}
}