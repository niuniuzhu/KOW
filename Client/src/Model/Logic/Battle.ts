import { Global } from "../../Global";
import Decimal from "../../Libs/decimal";
import * as $protobuf from "../../Libs/protobufjs";
import { Protos } from "../../Libs/protos";
import { ProtoCreator } from "../../Net/ProtoHelper";
import Queue from "../../RC/Collections/Queue";
import { FMathUtils } from "../../RC/FMath/FMathUtils";
import { FRandom } from "../../RC/FMath/FRandom";
import { FRect } from "../../RC/FMath/FRect";
import { FVec2 } from "../../RC/FMath/FVec2";
import { MathUtils } from "../../RC/Math/MathUtils";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { Bullet } from "../Attack/Bullet";
import { Emitter } from "../Attack/Emitter";
import { SyncEvent } from "../BattleEvent/SyncEvent";
import { BattleInfo } from "../BattleInfo";
import { CDefs } from "../CDefs";
import { Defs } from "../Defs";
import { EntityType } from "../EntityType";
import { FrameAction } from "../FrameAction";
import { FrameActionGroup } from "../FrameActionGroup";
import { ISnapshotable } from "../ISnapshotable";
import { Skill } from "../Skill";
import { Champion } from "./Champion";
import { Entity, EntityInitParams } from "./Entity";
import Long = require("../../Libs/long");

const TYPE_TO_CONSTRUCT = new Map<EntityType, new (battle: Battle) => Entity>();
TYPE_TO_CONSTRUCT.set(EntityType.Champion, Champion);
TYPE_TO_CONSTRUCT.set(EntityType.Bullet, Bullet);

export class Battle implements ISnapshotable {
	private _frameRate: number = 0;
	private _keyframeStep: number = 0;
	private _snapshotStep: number = 0;
	private _timeout: number = 0;
	private _mapID: number = 0;
	private _frame: number = 0;
	private _random: FRandom;

	public get frameRate(): number { return this._frameRate; }
	public get keyframeStep(): number { return this._keyframeStep; }
	public get snapshotStep(): number { return this._snapshotStep; }
	public get timeout(): number { return this._timeout; }
	public get mapID(): number { return this._mapID; }
	public get frame(): number { return this._frame; }
	public get bounds(): FRect { return this._bounds; }
	public get random(): FRandom { return this._random; }

	private _msPerFrame: Decimal;
	private _logicElapsed: Decimal;
	private _realElapsed: Decimal;
	private _nextKeyFrame: number;
	private _def: Hashtable;
	private _cdef: Hashtable;
	private _bounds: FRect;
	private _destroied: boolean = false;

	private readonly _frameActionGroups: Queue<FrameActionGroup> = new Queue<FrameActionGroup>();
	private readonly _entities: Entity[] = [];
	private readonly _idToEntity: Map<string, Entity> = new Map<string, Entity>();
	private readonly _emitters: Emitter[] = [];
	private readonly _idToEmitter: Map<string, Emitter> = new Map<string, Emitter>();
	private readonly _bullets: Bullet[] = [];
	private readonly _idToBullet: Map<string, Bullet> = new Map<string, Bullet>();

	/**
	 * 设置战场信息
	 * @param battleInfo 战场信息
	 */
	public SetBattleInfo(battleInfo: BattleInfo): void {
		this._destroied = false;
		this._frameRate = battleInfo.frameRate;
		this._keyframeStep = battleInfo.keyframeStep;
		this._snapshotStep = battleInfo.snapshotStep;
		this._random = new FRandom(new Decimal(battleInfo.rndSeed));
		this._timeout = battleInfo.battleTime;
		this._mapID = battleInfo.mapID
		this._msPerFrame = new Decimal(1000 / this._frameRate);
		this._frame = 0;
		this._nextKeyFrame = 0;
		this._logicElapsed = new Decimal(0);
		this._realElapsed = new Decimal(0);

		this._cdef = CDefs.GetMap(this._mapID);
		this._def = Defs.GetMap(this._mapID);
		const bWidth = Hashtable.GetNumber(this._cdef, "width");
		const bHeight = Hashtable.GetNumber(this._cdef, "height");
		this._bounds = new FRect(new Decimal(-MathUtils.Floor(bWidth * 0.5)),
			new Decimal(-MathUtils.Floor(bHeight * 0.5)), new Decimal(bWidth), new Decimal(bHeight));
	}

	/**
	 * 战场结束
	 */
	public Destroy(): void {
		if (this._destroied)
			return;
		this._destroied = true;
		const count = this._entities.length;
		for (let i = 0; i < count; i++)
			this._entities[i].Dispose();
		this._entities.splice(0);
		this._idToEntity.clear();
		this._frameActionGroups.clear();
		this._def = null;
		this._bounds = null;
	}

	/**
	 * 心跳更新
	 * @param dt 上次更新到当前流逝的时间
	 */
	public Update(dt: Decimal): void {
		//追帧
		this.Chase(this._frameActionGroups, true, true);

		this._realElapsed = this._realElapsed.add(dt);
		if (this.frame < this._nextKeyFrame) {
			this._logicElapsed = this._logicElapsed.add(dt);

			while (this._logicElapsed.greaterThanOrEqualTo(this._msPerFrame)) {
				if (this.frame >= this._nextKeyFrame)
					break;

				this.UpdateLogic(this._msPerFrame, true, true);
				this._realElapsed = new Decimal(0);
				this._logicElapsed = this._logicElapsed.sub(this._msPerFrame);
			}
		}
	}

	/**
	 * 更新逻辑帧
	 * @param dt 上一帧到当前帧流逝的时间
	 */
	private UpdateLogic(dt: Decimal, updateView: boolean, commitSnapshot: boolean): void {
		++this._frame;
		const count = this._entities.length;
		for (let i = 0; i < count; i++) {
			const entity = this._entities[i];
			entity.Update(dt);
		}

		if (updateView) {
			//同步到表现层
			this.SyncToView();
		}

		//判断是否需要提交快照数据
		if (commitSnapshot && (this._frame % this._snapshotStep) == 0) {
			const writer = $protobuf.Writer.create();
			this.EncodeSnapshot(writer);
			const data = writer.finish();
			//提交快照
			const request = ProtoCreator.Q_GC2BS_CommitSnapshot();
			request.frame = this._frame;
			request.data = data;
			Global.connector.SendToBS(Protos.GC2BS_CommitSnapshot, request);
		}
	}

	/**
	 * 编码快照
	 */
	public EncodeSnapshot(writer: $protobuf.Writer | $protobuf.BufferWriter): void {
		writer.int32(this._frame);
		const count = this._entities.length;
		writer.int32(count);
		for (let i = 0; i < count; i++) {
			const entity = this._entities[i];
			writer.int32(entity.type);
			entity.EncodeSnapshot(writer);
		}
	}

	/**
	 * 解码快照
	 */
	public DecodeSnapshot(reader: $protobuf.Reader | $protobuf.BufferReader): void {
		this._frame = reader.int32();
		const count = reader.int32();
		for (let i = 0; i < count; i++) {
			//create entity
			const type = <EntityType>reader.int32();
			const ctr = TYPE_TO_CONSTRUCT.get(type);
			const entity = new ctr(this);
			entity.DecodeSnapshot(reader);
			this._entities.push(entity);
			this._idToEntity.set(entity.rid.toString(), entity);

		}
	}

	/**
	 * 同步数据编码
	 */
	public EncodeSync(writer: $protobuf.Writer | $protobuf.BufferWriter): void {
		writer.int32(this._frame);
		const count = this._entities.length;
		writer.int32(count);
		for (let i = 0; i < count; i++) {
			const entity = this._entities[i];
			entity.EncodeSync(writer);
		}
	}

	/**
	 * 把初始状态同步到表现层
	 */
	public SyncInitToView(): void {
		const writer = $protobuf.Writer.create();
		this.EncodeSync(writer);
		const data = writer.finish();
		SyncEvent.BattleInit(data);
	}

	/**
	 * 把战场状态同步到表现层
	 */
	public SyncToView(): void {
		const writer = $protobuf.Writer.create();
		this.EncodeSync(writer);
		const data = writer.finish();
		SyncEvent.Snapshot(data);
	}

	/**
	 * 追赶服务端帧数
	 */
	public Chase(frameActionGroups: Queue<FrameActionGroup>, updateView: boolean, commitSnapshot: boolean): void {
		if (frameActionGroups == null)
			return;
		while (!frameActionGroups.isEmpty()) {
			const frameActionGroup = frameActionGroups.dequeue();
			let length = frameActionGroup.frame - this.frame;
			while (length > 0) {
				this.UpdateLogic(this._msPerFrame, updateView, commitSnapshot);
				--length;
			}
			this.ApplyFrameActionGroup(frameActionGroup);
			this._nextKeyFrame = frameActionGroup.frame + this.keyframeStep;
		}
	}

	/**
	 * 给定指定id制作运行时id
	 */
	public MakeRid(id: number): Long {
		const rnd = this._random.NextFloor(FMathUtils.D_ZERO, FMathUtils.D_BIG);
		return Long.fromBits(id, rnd.toNumber());
	}

	/**
	 * 创建玩家
	 * @param playerInfos 玩家信息
	 */
	public CreatePlayers(playerInfos: Protos.ICS2BS_PlayerInfo[]): void {
		let arr = Hashtable.GetArray(this._def, "born_pos");
		let count = arr.length;
		const bornPoses: FVec2[] = [];
		for (let i = 0; i < count; i++) {
			const pi = <number[]>arr[i];
			bornPoses.push(new FVec2(new Decimal(pi[0]), new Decimal(pi[1])));
		}

		arr = Hashtable.GetArray(this._def, "born_dir");
		count = arr.length;
		const bornDirs: FVec2[] = [];
		for (let i = 0; i < count; i++) {
			const pi = <number[]>arr[i];
			bornDirs.push(new FVec2(new Decimal(pi[0]), new Decimal(pi[1])));
		}

		const params = new EntityInitParams();
		count = playerInfos.length;
		for (let i = 0; i < count; ++i) {
			const playerInfo = playerInfos[i];
			params.rid = playerInfo.gcNID;
			params.id = playerInfo.actorID;
			params.team = playerInfo.team;
			params.name = playerInfo.name;
			const player = <Champion>this.CreateEntity(EntityType.Champion, params);
			if (player.team >= bornPoses.length ||
				player.team >= bornDirs.length) {
				throw new Error("invalid team:" + player.team + ", player:" + player.rid);
			}
			player.position = bornPoses[player.team];
			player.direction = bornDirs[player.team];
		}
	}

	/**
	 * 创建实体
	 */
	public CreateEntity(type: EntityType, params: EntityInitParams): Entity {
		const ctr = TYPE_TO_CONSTRUCT.get(type);
		const entity = new ctr(this);
		entity.Init(params);
		this._entities.push(entity);
		this._idToEntity.set(entity.rid.toString(), entity);
		return entity;
	}

	/**
	 * 获取指定id的实体
	 */
	public GetEntity(rid: Long): Entity {
		return this._idToEntity.get(rid.toString());
	}

	/**
	 * 创建发射器
	 */
	public CreateEmitter(id: number, caster: Entity, skill: Skill): Emitter {
		const emitter = new Emitter(this, this.MakeRid(id), id);
		emitter.Init(caster, skill);
		this._emitters.push(emitter);
		this._idToEmitter.set(emitter.rid.toString(), emitter);
		return emitter;
	}

	/**
	 * 应用帧行为
	 * @param frameAction 帧行为
	 */
	private ApplyFrameActionGroup(frameActionGroup: FrameActionGroup): void {
		for (let i = 0; i < frameActionGroup.numActions; i++) {
			this.ApplyFrameAction(frameActionGroup.Get(i));
		}
	}

	private ApplyFrameAction(frameAction: FrameAction): void {
		const entity = <Champion>this.GetEntity(frameAction.gcNID);
		if ((frameAction.inputFlag & FrameAction.InputFlag.Move) > 0) {
			entity.BeginMove(frameAction.dx, frameAction.dy);
		}
		if ((frameAction.inputFlag & FrameAction.InputFlag.Skill) > 0) {
			entity.UseSkill(frameAction.sid);
		}
	}

	/**
	 * 处理服务器下发的快照信息
	 * @param ret 协议
	 */
	public HandleSnapShot(ret: Protos.BS2GC_RequestSnapshotRet): void {
		//解码快照
		const reader = $protobuf.Reader.create(ret.snapshot);
		this.DecodeSnapshot(reader);
	}

	/**
	 * 处理服务端下发的帧行为
	 * @param msg 协议
	 */
	public HandleFrameAction(frame: number, data: Uint8Array): void {
		const frameActionGroup = new FrameActionGroup(frame);
		frameActionGroup.Deserialize(data);
		this._frameActionGroups.enqueue(frameActionGroup);
	}
}