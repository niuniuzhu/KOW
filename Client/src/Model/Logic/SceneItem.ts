import * as $protobuf from "../../Libs/protobufjs";
import { Intersection, IntersectionType } from "../../RC/FMath/Intersection";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { SyncEvent } from "../BattleEvent/SyncEvent";
import { Defs } from "../Defs";
import { EntityType } from "../EntityType";
import { ISnapshotable } from "./ISnapshotable";
import { EAttr } from "./Attribute";
import { Entity } from "./Entity";

export enum SceneItemAttrOp {
	Add,
	Mul,
	Pow,
	Sin,
	Cos
}

export class SceneItem extends Entity implements ISnapshotable {
	public get type(): EntityType { return EntityType.SceneItem; }
	public get radius(): number { return this._radius; }
	public get attrs(): EAttr[] { return this._attrs; }
	public get values(): number[] { return this._values; }
	public get ops(): SceneItemAttrOp[] { return this._ops; }

	private _radius: number;
	private _attrs: EAttr[];
	private _values: number[];
	private _ops: SceneItemAttrOp[];

	protected LoadDefs(): void {
		const defs = Defs.GetSceneItem(this._id);
		this._radius = Hashtable.GetNumber(defs, "radius");
		this._attrs = Hashtable.GetNumberArray(defs, "attrs");
		this._values = Hashtable.GetNumberArray(defs, "values");
		this._ops = Hashtable.GetNumberArray(defs, "ops");
	}

	public EncodeSnapshot(writer: $protobuf.Writer | $protobuf.BufferWriter): void {
		super.EncodeSnapshot(writer);
	}

	public DecodeSnapshot(reader: $protobuf.Reader | $protobuf.BufferReader): void {
		super.DecodeSnapshot(reader);
	}

	public EncodeSync(writer: $protobuf.Writer | $protobuf.BufferWriter): void {
		super.EncodeSync(writer);
	}

	public Intersect(): void {
		const champions = this._battle.GetChampions();
		let hit: boolean = false;
		for (const target of champions) {
			if (target.isDead)
				continue;
			const intersectType = Intersection.IntersectsCC(this.position, this._radius, target.position, target.radius);
			if (intersectType == IntersectionType.Cling || intersectType == IntersectionType.Inside) {
				//派发物品碰撞通知
				if (!target.battle.chase) {
					SyncEvent.ScenItemCollision(this.rid, target.rid);
				}
				//添加物品使用单元
				this._battle.calcManager.AddItemUnit(this.rid, target.rid);
				hit = true;
			}
			if (hit) {
				break;
			}
		}
		if (hit) {
			this._markToDestroy = true;
		}
	}
}