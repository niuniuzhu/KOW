import Decimal from "../../Libs/decimal";
import * as $protobuf from "../../Libs/protobufjs";
import { FSM } from "../../RC/FSM/FSM";
import { FVec2 } from "../../RC/FVec2";
import { MathUtils } from "../../RC/Math/MathUtils";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { Attribute, EAttr } from "../Attribute";
import { Defs } from "../Defs";
import { EntityType } from "../EntityType";
import { ISnapshotable } from "../ISnapshotable";
import { Battle } from "./Battle";
import { EntityState } from "./FSM/EntityState";

export class Entity implements ISnapshotable {
	public get type(): EntityType { return EntityType.Undefined; }
	public get id(): Long { return this._id; }
	public get battle(): Battle { return this._battle; }
	public get actorID(): number { return this._actorID; }
	public get team(): number { return this._team; }
	public get name(): string { return this._name; }
	public get def(): Hashtable { return this._def; }

	public readonly attribute: Attribute = new Attribute();
	public position: FVec2 = FVec2.zero;
	public direction: FVec2 = FVec2.zero;

	private _battle: Battle;
	private _id: Long;
	private _actorID: number;
	private _team: number;
	private _name: string;
	private _def: Hashtable;

	private _moveDirection: FVec2 = FVec2.zero;

	private readonly _fsm: FSM = new FSM();

	constructor() {
		this._fsm.AddState(new EntityState(EntityState.Type.Idle, this));
		this._fsm.AddState(new EntityState(EntityState.Type.Move, this));
		this._fsm.AddState(new EntityState(EntityState.Type.Attack, this));
		this._fsm.AddState(new EntityState(EntityState.Type.Die, this));
	}

	public Init(battle: Battle, id: Long, actorID: number, team: number, name: string): void {
		this._battle = battle;
		this._id = id;
		this._actorID = actorID;
		this._team = team;
		this._name = name;
		this.LoadDef();
		this._fsm.ChangeState(EntityState.Type.Idle);
	}

	public Dispose(): void {

	}

	private LoadDef(): void {
		this._def = Defs.GetEntity(this.actorID);
		this.attribute.Set(EAttr.MHP, new Decimal(Hashtable.GetNumber(this._def, "mhp")));
		this.attribute.Set(EAttr.HP, this.attribute.Get(EAttr.MHP));
		this.attribute.Set(EAttr.MMP, new Decimal(Hashtable.GetNumber(this._def, "mmp")));
		this.attribute.Set(EAttr.MP, this.attribute.Get(EAttr.MMP));
		this.attribute.Set(EAttr.MOVE_SPEED, new Decimal(Hashtable.GetNumber(this._def, "move_speed")));
	}

	/**
	 * 编码快照
	 */
	public EncodeSnapshot(writer: $protobuf.Writer | $protobuf.BufferWriter): void {
		writer.int32(this.type);
		writer.uint64(this._id);
		writer.int32(this._actorID);
		writer.int32(this._team);
		writer.string(this._name);
		writer.float(this.position.x.toNumber()).float(this.position.y.toNumber());
		writer.float(this.direction.x.toNumber()).float(this.direction.y.toNumber());
		writer.float(this._moveDirection.x.toNumber()).float(this._moveDirection.y.toNumber());
		writer.int32(this._fsm.currentState.type);
		writer.int32((<EntityState>this._fsm.currentState).time);
		const count = this.attribute.count;
		writer.int32(count);
		this.attribute.Foreach((v, k, map) => {
			writer.int32(k).float(v.toNumber());
		});
	}

	/**
	 * 解码快照
	 */
	public DecodeSnapshot(reader: $protobuf.Reader | $protobuf.BufferReader): void {
		this._actorID = reader.int32();
		this._team = reader.int32();
		this._name = reader.string();
		this.position = new FVec2(new Decimal(reader.float()), new Decimal(reader.float()));
		this.direction = new FVec2(new Decimal(reader.float()), new Decimal(reader.float()));
		this._moveDirection = new FVec2(new Decimal(reader.float()), new Decimal(reader.float()));
		this._fsm.ChangeState(reader.int32(), null, true);
		(<EntityState>this._fsm.currentState).time = reader.int32();
		const count = reader.int32();
		for (let i = 0; i < count; i++) {
			this.attribute.Set(reader.int32(), new Decimal(reader.float()));
		}
	}

	public Update(dt: number): void {
		this._fsm.Update(dt);
		this.MoveStep(this._moveDirection, dt);
	}

	public BeginMove(dx: number, dy: number): void {
		this._moveDirection = new FVec2(new Decimal(dx), new Decimal(dy));
		if (this._moveDirection.SqrMagnitude().lessThan(MathUtils.D_SMALL))
			this._fsm.ChangeState(EntityState.Type.Idle)
		else
			this._fsm.ChangeState(EntityState.Type.Move);
	}

	protected MoveStep(direction: FVec2, dt: number): void {
		if (direction.SqrMagnitude().lessThan(MathUtils.D_SMALL))
			return;
		const speed = this.attribute.Get(EAttr.MOVE_SPEED);
		const moveDelta = FVec2.MulN(FVec2.MulN(direction, speed), MathUtils.D_SMALL1.mul(dt));
		this.position = FVec2.Add(this.position, moveDelta);
		this.direction = direction;
	}
}