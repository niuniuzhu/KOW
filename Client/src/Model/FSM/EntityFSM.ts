import * as $protobuf from "../../Libs/protobufjs";
import { FSM } from "../../RC/FSM/FSM";
import { ISnapshotable } from "../ISnapshotable";
import { EntityState } from "./EntityState";
import { StateType } from "./StateEnums";

export class EntityFSM extends FSM implements ISnapshotable {
	public get currentEntityState(): EntityState { return <EntityState>this.currentState; }
	public get previousEntityState(): EntityState { return <EntityState>this.previousState; }

	public Init() {
		for (const state of this._states) {
			const entityFSM = <EntityState>state;
			entityFSM.Init();
		}
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
		for (const state of this._states) {
			const entityFSM = <EntityState>state;
			entityFSM.EncodeSnapshot(writer);
		}
		if (this.globalState != null) {
			(<EntityState>this.globalState).EncodeSnapshot(writer);
		}
		writer.int32(this.currentEntityState.type);
		writer.int32(this.previousEntityState.type);
	}

	public DecodeSnapshot(reader: $protobuf.Reader | $protobuf.BufferReader): void {
		for (const state of this._states) {
			const entityFSM = <EntityState>state;
			entityFSM.DecodeSnapshot(reader);
		}
		if (this.globalState != null) {
			(<EntityState>this.globalState).DecodeSnapshot(reader);
		}
		this._currentState = this.GetState(reader.int32());
		this._previousState = this.GetState(reader.int32());
	}
}