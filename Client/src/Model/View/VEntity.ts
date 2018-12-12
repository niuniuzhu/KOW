import { Consts } from "../../Consts";
import { CDefs } from "../CDefs";
import { Global } from "../../Global";
import * as $protobuf from "../../Libs/protobufjs";
import { FSM } from "../../RC/FSM/FSM";
import { MathUtils } from "../../RC/Math/MathUtils";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { Attribute } from "../Attribute";
import { AniHolder } from "./AniHolder";
import { VEntityState } from "./FSM/VEntityState";
import { VBattle } from "./VBattle";
import { FVec2 } from "../../RC/FMath/FVec2";
import Decimal from "../../Libs/decimal";
import { Defs } from "../Defs";

export class VEntity {
	public get id(): Long { return this._id; }
	public get actorID(): number { return this._actorID; }
	public get team(): number { return this._team; }
	public get name(): string { return this._name; }
	public get def(): Hashtable { return this._def; }
	public get root(): fairygui.GComponent { return this._root; }

	public readonly attribute: Attribute = new Attribute();

	public get position(): FVec2 { return this._position; }
	public set position(value: FVec2) {
		if (this._position.EqualsTo(value))
			return;
		const delta = FVec2.Sub(value, this._position);
		this._position = value;
		this.OnPositionChanged(delta);
	}

	public get rotation(): number { return this._rotation; }
	public set rotation(value: number) {
		if (this._rotation == value)
			return;
		const delta = value - this._rotation;
		this._rotation = value;
		this.OnRatationChanged(delta);
	}

	public get worldPosition(): FVec2 { return this._worldPosition; }

	private _battle: VBattle;
	private _id: Long;
	private _actorID: number;
	private _team: number;
	private _name: string;
	private _def: Hashtable;

	private _position: FVec2 = FVec2.zero;
	private _worldPosition: FVec2 = FVec2.zero;
	private _rotation: number = 0;
	private _logicPos: FVec2 = FVec2.zero;
	private _logicRot: number = 0;
	private _playingName: string = "";

	private readonly _fsm: FSM = new FSM();
	private readonly _root = new fairygui.GComponent();
	private readonly _animations: Map<string, AniHolder> = new Map<string, AniHolder>();

	private static readonly D_SMALL0 = new Decimal(0.012);

	constructor() {
		this._root.setSize(0, 0);
		this._root.setPivot(0.5, 0.5, true);
		Global.graphic.entityRoot.addChild(this._root);
		this._fsm.AddState(new VEntityState(VEntityState.Type.Idle, this));
		this._fsm.AddState(new VEntityState(VEntityState.Type.Move, this));
		this._fsm.AddState(new VEntityState(VEntityState.Type.Attack, this));
		this._fsm.AddState(new VEntityState(VEntityState.Type.Die, this));
	}

	public Init(id: Long, battle: VBattle): void {
		this._id = id;
		this._battle = battle;
	}

	public Dispose(): void {
		this._animations.forEach((v, k, map) => {
			v.dispose();
		});
		this._animations.clear();
		this._root.dispose();
	}

	public Update(dt: number): void {
		this.position = FVec2.Lerp(this._position, this._logicPos, VEntity.D_SMALL0.mul(dt));
		this.rotation = MathUtils.LerpAngle(this._rotation, this._logicRot, dt * 0.018);
	}

	private OnPositionChanged(delta: FVec2): void {
		this._root.setXY(this._position.x.toNumber(), this._position.y.toNumber());
		let point = new Laya.Point();
		this._root.localToGlobal(0, 0, point);
		this._worldPosition.x = new Decimal(point.x);
		this._worldPosition.y = new Decimal(point.y);
	}

	private OnRatationChanged(delta: number): void {
		this._root.rotation = this._rotation;
	}

	/**
	 * 初始化快照
	 */
	public InitSnapshot(reader: $protobuf.Reader | $protobuf.BufferReader): void {
		this._actorID = reader.int32();

		//加载配置
		this._def = Defs.GetEntity(this._actorID);
		const aniDefs = Hashtable.GetMapArray(CDefs.GetEntity(this._actorID), "animations");
		for (let i = 0; i < aniDefs.length; ++i) {
			const aniDef = aniDefs[i];
			const aniName = Hashtable.GetString(aniDef, "name");
			const length = Hashtable.GetNumber(aniDef, "length");
			//创建图形
			const urls: string[] = [];
			for (let i = 0; i < length; ++i) {
				urls.push((Consts.ASSETS_ENTITY_PREFIX + this._actorID) + "/" + aniName + i + ".png");
			}
			this._animations.set(aniName, new AniHolder(urls));
		}

		this._team = reader.int32();
		this._name = reader.string();
		this.position = new FVec2(new Decimal(reader.float()), new Decimal(reader.float()));
		this._logicPos.CopyFrom(this.position);
		const logicDir = new FVec2(new Decimal(reader.float()), new Decimal(reader.float()));
		this.rotation = MathUtils.RadToDeg(MathUtils.Acos(logicDir.Dot(FVec2.down).toNumber()));
		if (logicDir.x.lessThan(MathUtils.D_ZERO))
			this.rotation = 360 - this.rotation;
		this._logicRot = this.rotation;
		//move direction
		const moveDirection = new FVec2(new Decimal(reader.float()), new Decimal(reader.float()));
		this._fsm.ChangeState(reader.int32(), null);
		(<VEntityState>this._fsm.currentState).time = reader.float();
		const count = reader.int32();
		for (let i = 0; i < count; i++) {
			this.attribute.Set(reader.int32(), new Decimal(reader.float()));
		}
	}

	/**
	 * 解码快照
	 */
	public DecodeSnapshot(reader: $protobuf.Reader | $protobuf.BufferReader): void {
		this._actorID = reader.int32();
		this._team = reader.int32();
		this._name = reader.string();
		this._logicPos = new FVec2(new Decimal(reader.float()), new Decimal(reader.float()));
		const logicDir = new FVec2(new Decimal(reader.float()), new Decimal(reader.float()));
		this._logicRot = MathUtils.RadToDeg(MathUtils.Acos(logicDir.Dot(FVec2.down).toNumber()));
		if (logicDir.x.lessThan(MathUtils.D_ZERO))
			this._logicRot = 360 - this._logicRot;
		//move direction
		const moveDirection = new FVec2(new Decimal(reader.float()), new Decimal(reader.float()));
		this._fsm.ChangeState(reader.int32(), null);
		(<VEntityState>this._fsm.currentState).time = reader.float();
		const count = reader.int32();
		for (let i = 0; i < count; i++) {
			this.attribute.Set(reader.int32(), new Decimal(reader.float()));
		}
	}

	/**
	 * 播放动画
	 * @param name 动画名称
	 * @param force 是否强制重新播放
	 */
	public PlayAnim(name: string, force: boolean = false): void {
		if (!force && this._playingName == name)
			return;
		this._playingName = name;
		const aniHilder = this._animations.get(name);
		this._root.removeChildren();
		this._root.addChild(aniHilder);
		aniHilder.Play();
	}
}