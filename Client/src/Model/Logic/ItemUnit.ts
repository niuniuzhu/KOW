import * as $protobuf from "../../Libs/protobufjs";
import { FMathUtils } from "../../RC/FMath/FMathUtils";
import { SyncEvent } from "../BattleEvent/SyncEvent";
import { ISnapshotable } from "../ISnapshotable";
import { CalcationManager } from "./CalcationManager";
import { ICalcUnit } from "./ICalcUnit";
import { SceneItemAttrOp } from "./SceneItem";


export class ItemUnit implements ISnapshotable, ICalcUnit {
	private readonly _manager: CalcationManager;
	private _itemID: Long;
	private _targetID: Long;

	constructor(manager: CalcationManager) {
		this._manager = manager;
	}

	public Init(itemID: Long, targetID: Long): void {
		this._itemID = itemID;
		this._targetID = targetID;
	}

	public Calculate(): void {
		const item = this._manager.battle.GetSceneItem(this._itemID);
		const target = this._manager.battle.GetChampion(this._targetID);
		const count = item.attrs.length;
		for (let i = 0; i < count; ++i) {
			const attr = item.attrs[i];
			let value = item.values[i];
			const op = item.ops[i];
			const old = target.GetAttr(attr);
			switch (op) {
				case SceneItemAttrOp.Add:
					value = FMathUtils.Add(value, old);
					break;
				case SceneItemAttrOp.Mul:
					value = FMathUtils.Mul(value, old);
					break;
				case SceneItemAttrOp.Pow:
					value = FMathUtils.Pow(value, old);
					break;
				case SceneItemAttrOp.Sin:
					value = FMathUtils.Sin(old);
					break;
				case SceneItemAttrOp.Cos:
					value = FMathUtils.Cos(old);
					break;
			}
			target.SetAttr(attr, value);
		}

		if (!item.battle.chase) {
			SyncEvent.ItemTrigger(this._itemID, this._targetID);
		}
	}

	public EncodeSnapshot(writer: $protobuf.Writer | $protobuf.BufferWriter): void {
		writer.uint64(this._itemID);
		writer.uint64(this._targetID);
	}

	public DecodeSnapshot(reader: $protobuf.Reader | $protobuf.BufferReader): void {
		this._itemID = <Long>reader.uint64();
		this._targetID = <Long>reader.uint64();
	}
}