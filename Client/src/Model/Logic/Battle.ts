import * as $protobuf from "../../Libs/protobufjs";
import Queue from "../../RC/Collections/Queue";
import { BattleInfo } from "../BattleInfo";
import { EntityType } from "../EntityType";
import { SyncEvent } from "../Events/SyncEvent";
import { FrameAction } from "../FrameAction";
import { FrameActionGroup } from "../FrameActionGroup";
import { ISnapshotable } from "../ISnapshotable";
import { Champion } from "./Champion";
import { Entity } from "./Entity";
import ByteBuffer = require("../../Libs/ByteBuffer");

export class Battle implements ISnapshotable {
	private _frameRate: number = 0;
	private _keyframeStep: number = 0;
	private _timeout: number = 0;
	private _mapID: number = 0;
	private _frame: number = 0;

	public get frameRate(): number { return this._frameRate; }
	public get keyframeStep(): number { return this._keyframeStep; }
	public get timeout(): number { return this._timeout; }
	public get mapID(): number { return this._mapID; }
	public get frame(): number { return this._frame; }

	private _msPerFrame: number = 0;
	private _nextKeyFrame: number = 0;
	private _logicElapsed: number = 0;
	private _realElapsed: number = 0;

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
		this._timeout = battleInfo.battleTime;
		this._mapID = battleInfo.mapID
		this._msPerFrame = 1000 / this._frameRate;

		//解码快照
		const reader = $protobuf.Reader.create(battleInfo.snapshot);
		this.InitSnapshot(reader);

		//把初始状态同步到表现层
		const writer = $protobuf.Writer.create();
		this.EncodeSnapshot(writer);
		const data = writer.finish();
		SyncEvent.BattleInit(data);
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
	 * 解码初始化快照
	 */
	public InitSnapshot(reader: $protobuf.Reader | $protobuf.BufferReader): void {
		this._frame = reader.int32();
		const count = reader.int32();
		for (let i = 0; i < count; i++) {
			const type = <EntityType>reader.int32();
			const id = <Long>reader.uint64();
			const entity = this.CreateEntity(type, id);
			entity.DecodeSnapshot(reader);
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
	 * 心跳更新
	 * @param dt 上次更新到当前流逝的时间
	 */
	public Update(dt: number): void {
		//追帧
		this.Chase(true);
		this._realElapsed += dt;
		if (this.frame < this._nextKeyFrame) {
			this._logicElapsed += dt;

			while (this._logicElapsed >= this._msPerFrame) {
				if (this.frame >= this._nextKeyFrame)
					break;

				this.UpdateLogic(this._msPerFrame);
				this.SyncToView();

				if (this.frame == this._nextKeyFrame) {
					//todo send action
				}
				this._realElapsed = 0;
				this._logicElapsed -= this._msPerFrame;
			}
		}
	}

	/**
	 * 更新逻辑帧
	 * @param dt 上一帧到当前帧流逝的时间
	 */
	private UpdateLogic(dt: number): void {
		++this._frame;
		const count = this._entities.length;
		for (let i = 0; i < count; i++) {
			const entity = this._entities[i];
			entity.Update(dt);
		}
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
	public Chase(updateView: boolean): void {
		while (!this._frameActionGroups.isEmpty()) {
			const frameActionGroup = this._frameActionGroups.dequeue();
			let length = frameActionGroup.frame - this.frame;
			while (length >= 0) {
				if (length == 0) {
					this.ApplyFrameActionGroup(frameActionGroup);
				}
				else {
					this.UpdateLogic(this._msPerFrame);
					if (updateView)
						this.SyncToView();
				}
				--length;
			}
			this._nextKeyFrame = frameActionGroup.frame + this.keyframeStep;
		}
	}

	/**
	 * 创建实体
	 */
	public CreateEntity(type: EntityType, id: Long): Entity {
		let entity: Entity;
		switch (type) {
			case EntityType.Champion:
				entity = new Champion();
				break;
			default:
				throw new Error("not supported entity type:" + type);
		}
		entity.Init(id, this);
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
	 * 处理服务端下发的帧行为
	 * @param msg 协议
	 */
	public OnFrameAction(frame: number, data: Uint8Array): void {
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