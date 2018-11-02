import { Reader, BufferReader } from "../Libs/protobufjs";

export interface ISnapshotable {
	/**
	 * 解码快照
	 * @param reader 数据读取器
	 */
	DecodeSnapshot(reader: Reader | BufferReader): void
}