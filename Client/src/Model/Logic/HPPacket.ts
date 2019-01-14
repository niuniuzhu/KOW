import { Battle } from "./Battle";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { FVec2 } from "../../RC/FMath/FVec2";

export class HPPacket {
	private _battle: Battle;
	private _max: number;
	private _refreshInterval: number;//int32
	private _padding: number;
	private _time: number;

	constructor(battle: Battle) {
		this._battle = battle;
	}

	public Init(defs: Hashtable): void {
		this._max = Hashtable.GetNumber(defs, "max_hp_packet");
		this._refreshInterval = Hashtable.GetNumber(defs, "hp_packet_refresh_interval");
		this._padding = Hashtable.GetNumber(defs, "hp_packet_padding");
		this._time = 0;
	}

	public Update(dt: number): void {
		while (this._time >= this._refreshInterval) {
			this._time -= this._refreshInterval;

			const rndx = this._battle.random.NextD(this._battle.bounds.xMin + this._padding, this._battle.bounds.xMax - this._padding);
			const rndy = this._battle.random.NextD(this._battle.bounds.yMin + this._padding, this._battle.bounds.yMax - this._padding);
			const item = this._battle.CreateSceneItem(0, new FVec2(rndx, rndy));
		}
		if (this._battle.GetSceneItems().length < this._max) {
			this._time += dt;
		}
	}
}