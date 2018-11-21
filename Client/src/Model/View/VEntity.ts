import { Consts } from "../../Consts";
import { Defs } from "../../Defs";
import { Global } from "../../Global";
import * as $protobuf from "../../Libs/protobufjs";
import { FSM } from "../../RC/FSM/FSM";
import { MathUtils } from "../../RC/Math/MathUtils";
import { Vec2 } from "../../RC/Math/Vec2";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { Attribute } from "../Attribute";
import { AniHolder } from "./AniHolder";
import { VEntityState } from "./FSM/VEntityState";
import { VIdle } from "./FSM/VIdle";
import { VMove } from "./FSM/VMove";
import { VBattle } from "./VBattle";

export class VEntity {
	public get id(): Long { return this._id; }
	public get actorID(): number { return this._actorID; }
	public get team(): number { return this._team; }
	public get name(): string { return this._name; }
	public get root(): fairygui.GComponent { return this._root; }

	public readonly attribute: Attribute = new Attribute();

	public get position(): Vec2 { return this._position; }
	public set position(value: Vec2) {
		if (this._position.EqualsTo(value))
			return;
		const delta = Vec2.Sub(value, this._position);
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

	public get worldPosition(): Vec2 { return this._worldPosition; }

	private _battle: VBattle;
	private _id: Long;
	private _actorID: number;
	private _team: number;
	private _name: string;
	private _def: Hashtable;

	private _position: Vec2 = Vec2.zero;
	private _rotation: number = 0;
	private _worldPosition: Vec2 = Vec2.zero;
	private _logicPos: Vec2 = Vec2.zero;
	private _logicRot: number = 0;
	private _playingName: string = "";

	private readonly _fsm: FSM = new FSM();
	private readonly _root = new fairygui.GComponent();
	private readonly _animations: Map<string, AniHolder> = new Map<string, AniHolder>();

	constructor() {
		this._root.setSize(0, 0);
		this._root.setPivot(0.5, 0.5, true);
		Global.graphic.entityRoot.addChild(this._root);
		this._fsm.AddState(new VIdle(VEntityState.Type.Idle, this));
		this._fsm.AddState(new VMove(VEntityState.Type.Move, this));
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
		this.position = Vec2.Lerp(this._position, this._logicPos, dt * 0.012);
		this.rotation = MathUtils.LerpAngle(this._rotation, this._logicRot, dt * 0.018);
	}

	private OnPositionChanged(delta: Vec2): void {
		this._root.setXY(this._position.x, this._position.y);
		let point = new Laya.Point();
		this._root.localToGlobal(0, 0, point);
		this._worldPosition.x = point.x;
		this._worldPosition.y = point.y;
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
		this._def = Defs.GetEntity(Consts.ASSETS_ENTITY_PREFIX + this._actorID);
		const aniDefs = Hashtable.GetMapArray(this._def, "animations");
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
		this.position = new Vec2(reader.float(), reader.float());
		const logicDir = new Vec2(reader.float(), reader.float());
		this._logicRot = MathUtils.RadToDeg(MathUtils.Acos(logicDir.Dot(Vec2.down)));
		if (logicDir.x < 0)
			this._logicRot = 360 - this._logicRot;
		this._fsm.ChangeState(reader.int32(), null);
		(<VEntityState>this._fsm.currentState).time = reader.int32();
		const count = reader.int32();
		for (let i = 0; i < count; i++) {
			this.attribute.Set(reader.int32(), reader.float());
		}
	}

	/**
	 * 解码快照
	 */
	public DecodeSnapshot(reader: $protobuf.Reader | $protobuf.BufferReader): void {
		this._actorID = reader.int32();
		this._team = reader.int32();
		this._name = reader.string();
		this._logicPos = new Vec2(reader.float(), reader.float());
		const logicDir = new Vec2(reader.float(), reader.float());
		this._logicRot = MathUtils.RadToDeg(MathUtils.Acos(logicDir.Dot(Vec2.down)));
		if (logicDir.x < 0)
			this._logicRot = 360 - this._logicRot;
		this._fsm.ChangeState(reader.int32(), null);
		(<VEntityState>this._fsm.currentState).time = reader.int32();
		const count = reader.int32();
		for (let i = 0; i < count; i++) {
			this.attribute.Set(reader.int32(), reader.float());
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