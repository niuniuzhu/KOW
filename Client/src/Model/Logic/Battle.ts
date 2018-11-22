import * as $protobuf from "../../Libs/protobufjs";
import { Protos } from "../../Libs/protos";
import Queue from "../../RC/Collections/Queue";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { BattleInfo } from "../BattleInfo";
import { EntityType } from "../EntityType";
import { SyncEvent } from "../Events/SyncEvent";
import { FrameAction } from "../FrameAction";
import { FrameActionGroup } from "../FrameActionGroup";
import { ISnapshotable } from "../ISnapshotable";
import { Champion } from "./Champion";
import { Entity } from "./Entity";
import ByteBuffer = require("../../Libs/ByteBuffer");
import { Defs } from "../Defs";
import { Vec2 } from "../../RC/Math/Vec2";
import { ProtoCreator } from "../../Net/ProtoHelper";
import { Global } from "../../Global";
import { Logger } from "../../RC/Utils/Logger";

export class Battle implements ISnapshotable {
	private _frameRate: number = 0;
	private _keyframeStep: number = 0;
	private _snapshotStep: number = 0;
	private _timeout: number = 0;
	private _mapID: number = 0;
	private _frame: number = 0;

	public get frameRate(): number { return this._frameRate; }
	public get keyframeStep(): number { return this._keyframeStep; }
	public get snapshotStep(): number { return this._snapshotStep; }
	public get timeout(): number { return this._timeout; }
	public get mapID(): number { return this._mapID; }
	public get frame(): number { return this._frame; }

	private _msPerFrame: number = 0;
	private _nextKeyFrame: number = 0;
	private _logicElapsed: number = 0;
	private _realElapsed: number = 0;
	private _def: Hashtable;

	private readonly _frameActionGroups: Queue<FrameActionGroup> = new Queue<FrameActionGroup>();
	private readonly _entities: Entity[] = [];
	private readonly _idToEntity: Map<string, Entity> = new Map<string, Entity>();

	/**
	 * 设置战场信息
	 * @param battleInfo 战场信息
	 */
	public SetBattleInfo(battleInfo: BattleInfo): void {
		this._frameRate = battleInfo.frameRate;
		this._keyframeStep = battleInfo.keyframeStep;
		this._snapshotStep = battleInfo.snapshotStep;
		this._timeout = battleInfo.battleTime;
		this._mapID = battleInfo.mapID
		this._msPerFrame = 1000 / this._frameRate;

		this._def = Defs.GetMap(this._mapID);

		//创建玩家
		this.CreatePlayers(battleInfo.playerInfos);
	}

	/**
	 * 战场结束
	 */
	public End(): void {
		const count = this._entities.length;
		for (let i = 0; i < count; i++)
			this._entities[i].Dispose();
		this._entities.splice(0);
		this._idToEntity.clear();
		this._frame = 0;
		this._nextKeyFrame = 0;
		this._logicElapsed = 0;
		this._realElapsed = 0;
		this._frameActionGroups.clear();
	}

	/**
	 * 心跳更新
	 * @param dt 上次更新到当前流逝的时间
	 */
	public Update(dt: number): void {
		//追帧
		this.Chase(true, true);

		this._realElapsed += dt;
		if (this.frame < this._nextKeyFrame) {
			this._logicElapsed += dt;

			while (this._logicElapsed >= this._msPerFrame) {
				if (this.frame >= this._nextKeyFrame)
					break;

				this.UpdateLogic(this._msPerFrame, true, true);
				this._realElapsed = 0;
				this._logicElapsed -= this._msPerFrame;
			}
		}
	}

	/**
	 * 更新逻辑帧
	 * @param dt 上一帧到当前帧流逝的时间
	 */
	private UpdateLogic(dt: number, updateView: boolean, commitSnapshot: boolean): void {
		++this._frame;
		Logger.Log("f:" + this._frame);
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
			Logger.Log(this._frame);
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
			entity.EncodeSnapshot(writer);
		}
	}

	/**
	 * 解码快照
	 */
	public DecodeSnapshot(reader: $protobuf.Reader | $protobuf.BufferReader): void {
		this._frame = reader.int32();
		Logger.Log("recv snapshot, frame:" + this._frame);
		const count = reader.int32();
		for (let i = 0; i < count; i++) {
			const type = <EntityType>reader.int32();
			const id = <Long>reader.uint64();
			const entity = this.GetEntity(id.toString());
			if (entity == null)
				continue;
			entity.DecodeSnapshot(reader);
		}
	}

	/**
	 * 把初始状态同步到表现层
	 */
	public InitSyncToView(): void {
		const writer = $protobuf.Writer.create();
		this.EncodeSnapshot(writer);
		const data = writer.finish();
		SyncEvent.BattleInit(data);
	}

	/**
	 * 把战场状态同步到表现层
	 */
	public SyncToView(): void {
		const writer = $protobuf.Writer.create();
		this.EncodeSnapshot(writer);
		const data = writer.finish();
		SyncEvent.Snapshot(data);
	}

	/**
	 * 追赶服务端帧数
	 */
	public Chase(updateView: boolean, commitSnapshot: boolean): void {
		while (!this._frameActionGroups.isEmpty()) {
			const frameActionGroup = this._frameActionGroups.dequeue();
			let length = frameActionGroup.frame - this.frame;
			while (length >= 0) {
				if (length == 0) {
					this.ApplyFrameActionGroup(frameActionGroup);
				}
				else {
					this.UpdateLogic(this._msPerFrame, updateView, commitSnapshot);
				}
				--length;
			}
			this._nextKeyFrame = frameActionGroup.frame + this.keyframeStep;
		}
	}

	/**
	 * 创建玩家
	 * @param playerInfos 玩家信息
	 */
	private CreatePlayers(playerInfos: Protos.ICS2BS_PlayerInfo[]): void {
		let arr = Hashtable.GetArray(this._def, "born_pos");
		let count = arr.length;
		const bornPoses: Vec2[] = [];
		for (let i = 0; i < count; i++) {
			const pi = <number[]>arr[i];
			bornPoses.push(new Vec2(pi[0], pi[1]));
		}

		arr = Hashtable.GetArray(this._def, "born_dir");
		count = arr.length;
		const bornDirs: Vec2[] = [];
		for (let i = 0; i < count; i++) {
			const pi = <number[]>arr[i];
			bornDirs.push(new Vec2(pi[0], pi[1]));
		}

		count = playerInfos.length;
		for (let i = 0; i < count; ++i) {
			const playerInfo = playerInfos[i];
			const player = this.CreateEntity(EntityType.Champion, playerInfo.gcNID, playerInfo.actorID, playerInfo.team, playerInfo.name);
			if (player.team >= bornPoses.length ||
				player.team >= bornDirs.length) {
				throw new Error("invalid team:" + player.team + ", player:" + player.id);
			}

			player.position = bornPoses[player.team];
			player.direction = bornDirs[player.team];
		}
	}

	/**
	 * 创建实体
	 */
	public CreateEntity(type: EntityType, id: Long, actorID: number, team: number, name: string): Entity {
		let entity: Entity;
		switch (type) {
			case EntityType.Champion:
				entity = new Champion();
				break;
			default:
				throw new Error("not supported entity type:" + type);
		}
		entity.Init(this, id, actorID, team, name);
		this._entities.push(entity);
		this._idToEntity.set(entity.id.toString(), entity);
		return entity;
	}

	public GetEntity(id: string): Entity {
		return this._idToEntity.get(id);
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
		const entity = this.GetEntity(frameAction.gcNID.toString());
		if ((frameAction.inputFlag & FrameAction.InputFlag.Move) > 0) {
			entity.BeginMove(frameAction.dx, frameAction.dy);
		}
	}

	/**
	 * 处理服务器下发的快照信息
	 * @param ret 协议
	 */
	public HandleSnapShot(ret: Protos.BS2GC_RequestSnapshotRet): void {
		if (ret.snapshot.length == 0)
			return;
		//解码快照
		const reader = $protobuf.Reader.create(ret.snapshot);
		this.DecodeSnapshot(reader);
	}

	/**
	 * 处理服务端下发的帧行为
	 * @param msg 协议
	 */
	public HandleFrameAction(frame: number, data: Uint8Array): void {
		const fag = new FrameActionGroup(frame);
		const buffer = new ByteBuffer();
		buffer.littleEndian = true;
		buffer.append(data);
		buffer.offset = 0;
		const count = buffer.readByte();
		for (let i = 0; i < count; ++i) {
			const frameAction = new FrameAction(frame);
			frameAction.DeSerialize(buffer);
			fag.Add(frameAction);
		}
		this._frameActionGroups.enqueue(fag);
	}
}