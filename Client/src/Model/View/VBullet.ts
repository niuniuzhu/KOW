import { VEntity } from "./VEntity";
import { Defs } from "../Defs";
import { CDefs } from "../CDefs";

export class VBullet extends VEntity {
	protected LoadDefs(): void {
		this._defs = Defs.GetBullet(this._id);
		this._cdefs = CDefs.GetBullet(this._id);
	}
}