import { Consts } from "../../Consts";
import { Global } from "../../Global";
import * as $protobuf from "../../Libs/protobufjs";
import { FSM } from "../../RC/FSM/FSM";
import { Vec2 } from "../../RC/Math/Vec2";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { Attribute } from "../Attribute";
import { VEntityState } from "./FSM/VEntityState";
import { VIdle } from "./FSM/VIdle";
import { VBattle } from "./VBattle";
import { MathUtils } from "../../RC/Math/MathUtils";
import { Logger } from "../../RC/Utils/Logger";

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
	private _playingName: string = "";

	private readonly _fsm: FSM = new FSM();
	private readonly _root = new fairygui.GComponent();
	private readonly _holder = new fairygui.GGraph();
	private readonly _animations: Map<string, Laya.Animation> = new Map<string, Laya.Animation>();

	constructor() {
		this._root.setPivot(0.5, 0.5, true);
		this._root.addChild(this._holder);
		Global.graphic.entityRoot.addChild(this._root);
		this._fsm.AddState(new VIdle(VEntityState.Type.Idle, this));
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
			v.destroy();
		});
		this._animations.clear();
		this._root.dispose();
	}

	private OnPositionChanged(delta: Vec2): void {
		this._root.setXY(this._position.x, this._position.y);
	}

	private OnDirectionChanged(delta: Vec2): void {
		this._root.rotation = MathUtils.RadToDeg(this._direction.Dot(Vec2.up));
		Logger.Log(this._direction.Dot(Vec2.up));
	}

	public InitSnapshot(reader: $protobuf.Reader | $protobuf.BufferReader): void {
		this._actorID = reader.int32();

		//加载配置
		this._def = <JSON>Laya.loader.getRes("res/roles/" + Consts.ASSETS_ENTITY_PREFIX + this._actorID + ".config.json");
		const aniDef = Hashtable.GetMap(this._def, "animations");
		for (let key in aniDef) {
			const group = Hashtable.GetMap(aniDef, key);
			const length = Hashtable.GetNumber(group, "length");
			//创建图形
			const urls: string[] = [];
			for (let i = 0; i < length; ++i) {
				urls.push((Consts.ASSETS_ENTITY_PREFIX + this._actorID) + "/" + key + i + ".png");
			}
			const roleAni = new Laya.Animation();
			roleAni.autoSize = true;
			roleAni.interval = 100;
			roleAni.loadImages(urls);
			this._animations.set(key, roleAni);
		}

		this._team = reader.int32();
		this._name = reader.string();
		this.position = new Vec2(reader.float(), reader.float());
		this.direction = new Vec2(reader.float(), reader.float());
		this._fsm.ChangeState(reader.int32(), null);
		(<VEntityState>this._fsm.currentState).time = reader.int32();
		const count = reader.int32();
		for (let i = 0; i < count; i++) {
			this.attribute.Set(reader.int32(), reader.float());
		}

	}

	public DecodeSnapshot(reader: $protobuf.Reader | $protobuf.BufferReader): void {
		this._actorID = reader.int32();
		this._team = reader.int32();
		this._name = reader.string();
		this.position = new Vec2(reader.float(), reader.float());
		this.direction = new Vec2(reader.float(), reader.float());
		this._fsm.ChangeState(reader.int32(), null);
		(<VEntityState>this._fsm.currentState).time = reader.int32();
		const count = reader.int32();
		for (let i = 0; i < count; i++) {
			this.attribute.Set(reader.int32(), reader.float());
		}
	}

	public PlayAnim(name: string, force: boolean = false): void {
		if (!force && this._playingName == name)
			return;
		this._playingName = name;
		const animation = this._animations.get(name);
		this._holder.setNativeObject(animation);
		this._root.setSize(animation.width, animation.height);
		animation.play();
	}
}