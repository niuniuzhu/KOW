import * as Long from "../../Libs/long";
import * as $protobuf from "../../Libs/protobufjs";
import { Battle } from "./Battle";
import { Champion } from "./Champion";
import { ISnapshotable } from "./ISnapshotable";

export class Team implements ISnapshotable {
	private readonly _battle: Battle;
	private readonly _champions: Long[] = [];

	public id: number;
	public get numChanpions(): number { return this._champions.length; }
	/**
	 * 停留在禁区的时间
	 */
	public gladiatorTime: number = -1;

	constructor(battle: Battle) {
		this._battle = battle;
	}

	public Destroy(): void {
		this._champions.splice(0);
	}

	public UpdateGladiator(dt: number): void {
		this.gladiatorTime += dt;
		if (this.gladiatorTime > this._battle.gladiatorTimeout)
			this.gladiatorTime = this._battle.gladiatorTimeout;
	}

	public AddChampion(champion: Champion): void {
		for (const c of this._champions) {
			if (c.equals(champion.rid))
				return;
		}
		this._champions.push(Long.fromValue(champion.rid));
	}

	public RemoveChampion(champion: Champion): void {
		const count = this._champions.length;
		for (let i = 0; i < count; ++i) {
			if (this._champions[i].equals(champion.rid)) {
				this._champions.splice(i, 1);
				return;
			}
		}
	}

	public RemoveChampionAt(index: number): void {
		this._champions.splice(index, 1);
	}

	public GetChampionAt(index: number): Champion {
		return this._battle.GetChampion(this._champions[index]);
	}

	public EncodeSnapshot(writer: $protobuf.Writer | $protobuf.BufferWriter): void {
		writer.int32(this.id);
		writer.int32(this.gladiatorTime);
		const count = this._champions.length;
		writer.int32(count);
		for (let i = 0; i < count; ++i) {
			writer.uint64(this._champions[i]);
		}
	}

	public DecodeSnapshot(reader: $protobuf.Reader | $protobuf.BufferReader): void {
		this.id = reader.int32();
		this.gladiatorTime = reader.int32();
		const count = reader.int32();
		for (let i = 0; i < count; ++i) {
			this._champions[i] = <Long>reader.uint64();
		}
	}

	public EncodeSync(writer: $protobuf.Writer | $protobuf.BufferWriter): void {
		writer.int32(this.id);
		writer.int32(this.gladiatorTime);
	}

	public Dump(): string {
		let str = "";
		str += `numChanpions:${this.numChanpions}\n`;
		str += `gladiatorTime:${this.gladiatorTime}\n`;
		return str;
	}
}