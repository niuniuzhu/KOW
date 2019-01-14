import * as $protobuf from "../../Libs/protobufjs";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { CDefs } from "../CDefs";
import { VEntity } from "./VEntity";

export class VSceneItem extends VEntity {
	protected BeforeLoadDefs(): Hashtable {
		return CDefs.GetSceneItem(this._id);
	}

	protected AfterLoadDefs(cdefs: Hashtable): void {
		this.DisplayRoot();
	}

	public DecodeSync(rid: Long, reader: $protobuf.Reader | $protobuf.BufferReader, isNew: boolean): void {
		super.DecodeSync(rid, reader, isNew);
	}
}