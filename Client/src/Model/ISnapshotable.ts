import { Reader, BufferReader, Writer, BufferWriter } from "../Libs/protobufjs";

export interface ISnapshotable {
	/**
	 * 编码快照
	 * @param reader 数据写入器
	 */
	EncodeSnapshot(reader: Writer | BufferWriter): void

	/**
	 * 解码快照
	 * @param reader 数据读取器
	 */
	DecodeSnapshot(reader: Reader | BufferReader): void
}