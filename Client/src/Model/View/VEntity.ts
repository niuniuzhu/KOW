import { Consts } from "../../Consts";
import { Global } from "../../Global";
import * as $protobuf from "../../Libs/protobufjs";
import { FSM } from "../../RC/FSM/FSM";
import { Vec2 } from "../../RC/Math/Vec2";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { Attribute } from "../Attribute";
import { VEntityState } from "../FSM/VEntityState";
import { VBattle } from "./VBattle";

export class VEntity {
	public get id(): Long { return this._id; }
	public get actorID(): number { return this._actorID; }
	public get team(): number { return this._team; }
	public get name(): string { return this._name; }

	public readonly attribute: Attribute = new Attribute();

	public get position(): Vec2 { return this._position; }
	public set position(value: Vec2) {
		if (this._position.EqualsTo(value))
			return;
		const delta = Vec2.Sub(value, this._position);
		this._position = value;
		this.OnPositionChanged(delta);
	}

	public get direction(): Vec2 { return this._direction; }
	public set direction(value: Vec2) {
		if (this._direction.EqualsTo(value))
			return;
		const delta = Vec2.Sub(value, this._direction);
		this._direction = value;
		this.OnDirectionChanged(delta);
	}

	private _battle: VBattle;
	private _id: Long;
	private _actorID: number;
	private _team: number;
	private _name: string;
	private _def: JSON;

	private _position: Vec2 = Vec2.zero;
	private _direction: Vec2 = Vec2.zero;
	private _logicPos: Vec2 = Vec2.zero;
	private _logicDir: Vec2 = Vec2.zero;

	private readonly _fsm: FSM = new FSM();
	private readonly _root = new fairygui.GComponent();
	private readonly _roleAni = new Laya.Animation();

	constructor() {
		this._roleAni.autoSize = true;
		this._roleAni.autoPlay = true;
		this._roleAni.interval = 100;
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
		this._fsm.ChangeState(VEntityState.Type.Idle);
	}

	public Dispose(): void {
		this._roleAni.destroy();
		this._root.dispose();
	}

	private OnPositionChanged(delta: Vec2): void {
		this._root.setXY(this._position.x, this._position.y);
	}

	private OnDirectionChanged(delta: Vec2): void {
	}

	public InitSnapshot(reader: $protobuf.Reader | $protobuf.BufferReader): void {
		this._actorID = reader.int32();
		this._team = reader.int32();
		this._name = reader.string();
		this.position = new Vec2(reader.float(), reader.float());
		this.direction = new Vec2(reader.float(), reader.float());
		this._fsm.ChangeState(reader.int32(), null, true);
		(<VEntityState>this._fsm.currentState).time = reader.int32();
		const count = reader.int32();
		for (let i = 0; i < count; i++) {
			this.attribute.Set(reader.int32(), reader.float());
		}

		//加载配置
		this._def = <JSON>Laya.loader.getRes("res/roles/" + Consts.ASSETS_ENTITY_PREFIX + this._actorID + ".config.json");

		//播放动画
		this.PlayAnim("stand");

		const holder = new fairygui.GGraph();
		holder.setNativeObject(this._roleAni);
		this._root.addChild(holder);
	}

	public DecodeSnapshot(reader: $protobuf.Reader | $protobuf.BufferReader): void {
	}

	public PlayAnim(name: string): void {
		const aniDef = Hashtable.GetMap(this._def, "animations");
		const group = Hashtable.GetMap(aniDef, name);
		const length = Hashtable.GetNumber(group, "length");
		//创建图形
		const urls: string[] = [];
		for (let i = 0; i < length; ++i) {
			urls.push((Consts.ASSETS_ENTITY_PREFIX + this._actorID) + "/" + name + i + ".png");
		}
		this._roleAni.loadImages(urls);
		this._root.setSize(this._roleAni.width, this._roleAni.height);
	}
}