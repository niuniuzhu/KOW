import * as $protobuf from "protobufjs";
/** Namespace Protos. */
export namespace Protos {

    /** Properties of a BSInfo. */
    interface IBSInfo {

        /** BSInfo id */
        id?: (number|null);

        /** BSInfo ip */
        ip?: (string|null);

        /** BSInfo port */
        port?: (number|null);

        /** BSInfo state */
        state?: (Protos.BSInfo.State|null);
    }

    /** Represents a BSInfo. */
    class BSInfo implements IBSInfo {

        /**
         * Constructs a new BSInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: Protos.IBSInfo);

        /** BSInfo id. */
        public id: number;

        /** BSInfo ip. */
        public ip: string;

        /** BSInfo port. */
        public port: number;

        /** BSInfo state. */
        public state: Protos.BSInfo.State;

        /**
         * Creates a new BSInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BSInfo instance
         */
        public static create(properties?: Protos.IBSInfo): Protos.BSInfo;

        /**
         * Encodes the specified BSInfo message. Does not implicitly {@link Protos.BSInfo.verify|verify} messages.
         * @param message BSInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Protos.IBSInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BSInfo message, length delimited. Does not implicitly {@link Protos.BSInfo.verify|verify} messages.
         * @param message BSInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Protos.IBSInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BSInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BSInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.BSInfo;

        /**
         * Decodes a BSInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BSInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.BSInfo;

        /**
         * Verifies a BSInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BSInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BSInfo
         */
        public static fromObject(object: { [k: string]: any }): Protos.BSInfo;

        /**
         * Creates a plain object from a BSInfo message. Also converts values to other types if specified.
         * @param message BSInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Protos.BSInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BSInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace BSInfo {

        /** State enum. */
        enum State {
            Free = 0,
            Busy = 1,
            Full = 2,
            Close = 3
        }
    }

    /** Properties of a BS2CS_ReportState. */
    interface IBS2CS_ReportState {

        /** BS2CS_ReportState opts */
        opts?: (Protos.IMsgOpts|null);

        /** BS2CS_ReportState bsInfo */
        bsInfo?: (Protos.IBSInfo|null);
    }

    /** Represents a BS2CS_ReportState. */
    class BS2CS_ReportState implements IBS2CS_ReportState {

        /**
         * Constructs a new BS2CS_ReportState.
         * @param [properties] Properties to set
         */
        constructor(properties?: Protos.IBS2CS_ReportState);

        /** BS2CS_ReportState opts. */
        public opts?: (Protos.IMsgOpts|null);

        /** BS2CS_ReportState bsInfo. */
        public bsInfo?: (Protos.IBSInfo|null);

        /**
         * Creates a new BS2CS_ReportState instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BS2CS_ReportState instance
         */
        public static create(properties?: Protos.IBS2CS_ReportState): Protos.BS2CS_ReportState;

        /**
         * Encodes the specified BS2CS_ReportState message. Does not implicitly {@link Protos.BS2CS_ReportState.verify|verify} messages.
         * @param message BS2CS_ReportState message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Protos.IBS2CS_ReportState, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BS2CS_ReportState message, length delimited. Does not implicitly {@link Protos.BS2CS_ReportState.verify|verify} messages.
         * @param message BS2CS_ReportState message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Protos.IBS2CS_ReportState, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BS2CS_ReportState message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BS2CS_ReportState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.BS2CS_ReportState;

        /**
         * Decodes a BS2CS_ReportState message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BS2CS_ReportState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.BS2CS_ReportState;

        /**
         * Verifies a BS2CS_ReportState message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BS2CS_ReportState message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BS2CS_ReportState
         */
        public static fromObject(object: { [k: string]: any }): Protos.BS2CS_ReportState;

        /**
         * Creates a plain object from a BS2CS_ReportState message. Also converts values to other types if specified.
         * @param message BS2CS_ReportState
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Protos.BS2CS_ReportState, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BS2CS_ReportState to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BS2CS_BattleInfoRet. */
    interface IBS2CS_BattleInfoRet {

        /** BS2CS_BattleInfoRet opts */
        opts?: (Protos.IMsgOpts|null);

        /** BS2CS_BattleInfoRet bid */
        bid?: (number|null);
    }

    /** Represents a BS2CS_BattleInfoRet. */
    class BS2CS_BattleInfoRet implements IBS2CS_BattleInfoRet {

        /**
         * Constructs a new BS2CS_BattleInfoRet.
         * @param [properties] Properties to set
         */
        constructor(properties?: Protos.IBS2CS_BattleInfoRet);

        /** BS2CS_BattleInfoRet opts. */
        public opts?: (Protos.IMsgOpts|null);

        /** BS2CS_BattleInfoRet bid. */
        public bid: number;

        /**
         * Creates a new BS2CS_BattleInfoRet instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BS2CS_BattleInfoRet instance
         */
        public static create(properties?: Protos.IBS2CS_BattleInfoRet): Protos.BS2CS_BattleInfoRet;

        /**
         * Encodes the specified BS2CS_BattleInfoRet message. Does not implicitly {@link Protos.BS2CS_BattleInfoRet.verify|verify} messages.
         * @param message BS2CS_BattleInfoRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Protos.IBS2CS_BattleInfoRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BS2CS_BattleInfoRet message, length delimited. Does not implicitly {@link Protos.BS2CS_BattleInfoRet.verify|verify} messages.
         * @param message BS2CS_BattleInfoRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Protos.IBS2CS_BattleInfoRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BS2CS_BattleInfoRet message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BS2CS_BattleInfoRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.BS2CS_BattleInfoRet;

        /**
         * Decodes a BS2CS_BattleInfoRet message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BS2CS_BattleInfoRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.BS2CS_BattleInfoRet;

        /**
         * Verifies a BS2CS_BattleInfoRet message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BS2CS_BattleInfoRet message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BS2CS_BattleInfoRet
         */
        public static fromObject(object: { [k: string]: any }): Protos.BS2CS_BattleInfoRet;

        /**
         * Creates a plain object from a BS2CS_BattleInfoRet message. Also converts values to other types if specified.
         * @param message BS2CS_BattleInfoRet
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Protos.BS2CS_BattleInfoRet, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BS2CS_BattleInfoRet to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BS2CS_BattleStart. */
    interface IBS2CS_BattleStart {

        /** BS2CS_BattleStart opts */
        opts?: (Protos.IMsgOpts|null);

        /** BS2CS_BattleStart bid */
        bid?: (number|null);
    }

    /** Represents a BS2CS_BattleStart. */
    class BS2CS_BattleStart implements IBS2CS_BattleStart {

        /**
         * Constructs a new BS2CS_BattleStart.
         * @param [properties] Properties to set
         */
        constructor(properties?: Protos.IBS2CS_BattleStart);

        /** BS2CS_BattleStart opts. */
        public opts?: (Protos.IMsgOpts|null);

        /** BS2CS_BattleStart bid. */
        public bid: number;

        /**
         * Creates a new BS2CS_BattleStart instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BS2CS_BattleStart instance
         */
        public static create(properties?: Protos.IBS2CS_BattleStart): Protos.BS2CS_BattleStart;

        /**
         * Encodes the specified BS2CS_BattleStart message. Does not implicitly {@link Protos.BS2CS_BattleStart.verify|verify} messages.
         * @param message BS2CS_BattleStart message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Protos.IBS2CS_BattleStart, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BS2CS_BattleStart message, length delimited. Does not implicitly {@link Protos.BS2CS_BattleStart.verify|verify} messages.
         * @param message BS2CS_BattleStart message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Protos.IBS2CS_BattleStart, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BS2CS_BattleStart message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BS2CS_BattleStart
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.BS2CS_BattleStart;

        /**
         * Decodes a BS2CS_BattleStart message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BS2CS_BattleStart
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.BS2CS_BattleStart;

        /**
         * Verifies a BS2CS_BattleStart message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BS2CS_BattleStart message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BS2CS_BattleStart
         */
        public static fromObject(object: { [k: string]: any }): Protos.BS2CS_BattleStart;

        /**
         * Creates a plain object from a BS2CS_BattleStart message. Also converts values to other types if specified.
         * @param message BS2CS_BattleStart
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Protos.BS2CS_BattleStart, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BS2CS_BattleStart to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BS2CS_BattleEnd. */
    interface IBS2CS_BattleEnd {

        /** BS2CS_BattleEnd opts */
        opts?: (Protos.IMsgOpts|null);

        /** BS2CS_BattleEnd bid */
        bid?: (number|null);
    }

    /** Represents a BS2CS_BattleEnd. */
    class BS2CS_BattleEnd implements IBS2CS_BattleEnd {

        /**
         * Constructs a new BS2CS_BattleEnd.
         * @param [properties] Properties to set
         */
        constructor(properties?: Protos.IBS2CS_BattleEnd);

        /** BS2CS_BattleEnd opts. */
        public opts?: (Protos.IMsgOpts|null);

        /** BS2CS_BattleEnd bid. */
        public bid: number;

        /**
         * Creates a new BS2CS_BattleEnd instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BS2CS_BattleEnd instance
         */
        public static create(properties?: Protos.IBS2CS_BattleEnd): Protos.BS2CS_BattleEnd;

        /**
         * Encodes the specified BS2CS_BattleEnd message. Does not implicitly {@link Protos.BS2CS_BattleEnd.verify|verify} messages.
         * @param message BS2CS_BattleEnd message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Protos.IBS2CS_BattleEnd, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BS2CS_BattleEnd message, length delimited. Does not implicitly {@link Protos.BS2CS_BattleEnd.verify|verify} messages.
         * @param message BS2CS_BattleEnd message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Protos.IBS2CS_BattleEnd, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BS2CS_BattleEnd message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BS2CS_BattleEnd
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.BS2CS_BattleEnd;

        /**
         * Decodes a BS2CS_BattleEnd message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BS2CS_BattleEnd
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.BS2CS_BattleEnd;

        /**
         * Verifies a BS2CS_BattleEnd message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BS2CS_BattleEnd message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BS2CS_BattleEnd
         */
        public static fromObject(object: { [k: string]: any }): Protos.BS2CS_BattleEnd;

        /**
         * Creates a plain object from a BS2CS_BattleEnd message. Also converts values to other types if specified.
         * @param message BS2CS_BattleEnd
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Protos.BS2CS_BattleEnd, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BS2CS_BattleEnd to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** MsgID enum. */
    enum MsgID {
        Undefine = 0,
        eG_AskPing = 10,
        eG_AskPingRet = 11,
        eGC2LS_AskRegister = 1000,
        eGC2LS_AskLogin = 1001,
        eGC2LS_AskSmartLogin = 1002,
        eGC2GS_AskLogin = 1100,
        eGC2GS_KeepAlive = 1101,
        eGC2BS_AskLogin = 1200,
        eGC2BS_KeepAlive = 1201,
        eGC2CS_BeginMatch = 1300,
        eGC2CS_UpdatePlayerInfo = 1301,
        eLS2GC_GSInfo = 2000,
        eLS2GC_AskRegRet = 2001,
        eLS2GC_AskLoginRet = 2002,
        eLS2CS_GCLogin = 2100,
        eLS2DB_QueryAccount = 2200,
        eLS2DB_QueryLogin = 2201,
        eLS2DB_Exec = 2202,
        eGS2CS_ReportState = 3000,
        eGS2CS_GCAskLogin = 3001,
        eGS2CS_GCLost = 3002,
        eGS2CS_KickGCRet = 3003,
        eGS2GC_LoginRet = 3100,
        eGS2GC_Kick = 3101,
        eBS2CS_ReportState = 4000,
        eBS2CS_BattleInfoRet = 4001,
        eBS2CS_BattleStart = 4002,
        eBS2CS_BattleEnd = 4003,
        eBS2GC_LoginRet = 4100,
        eBS2GC_BattleStart = 4102,
        eBS2GC_BattleEnd = 4103,
        eCS2LS_GSInfos = 5000,
        eCS2LS_GSInfo = 5001,
        eCS2LS_GSLost = 5002,
        eCS2LS_GCLoginRet = 5003,
        eCS2GS_GCLoginRet = 5100,
        eCS2GS_KickGC = 5101,
        eCS2BS_BattleInfo = 5200,
        eCS2BS_BattleStartRet = 5201,
        eCS2BS_BattleEndRet = 5202,
        eCS2GC_BeginMatchRet = 5300,
        eCS2GC_PlayerJoin = 5301,
        eCS2GC_PlayerLeave = 5302,
        eCS2GC_RoomInfo = 5303,
        eCS2GC_EnterBattle = 5304,
        eDB2LS_QueryAccountRet = 8000,
        eDB2LS_QueryLoginRet = 8001,
        eDB2LS_ExecRet = 8002
    }

    /** Properties of a MsgOpts. */
    interface IMsgOpts {

        /** MsgOpts flag */
        flag?: (number|null);

        /** MsgOpts pid */
        pid?: (number|null);

        /** MsgOpts rpid */
        rpid?: (number|null);

        /** MsgOpts transid */
        transid?: (Long|null);
    }

    /** Represents a MsgOpts. */
    class MsgOpts implements IMsgOpts {

        /**
         * Constructs a new MsgOpts.
         * @param [properties] Properties to set
         */
        constructor(properties?: Protos.IMsgOpts);

        /** MsgOpts flag. */
        public flag: number;

        /** MsgOpts pid. */
        public pid: number;

        /** MsgOpts rpid. */
        public rpid: number;

        /** MsgOpts transid. */
        public transid: Long;

        /**
         * Creates a new MsgOpts instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MsgOpts instance
         */
        public static create(properties?: Protos.IMsgOpts): Protos.MsgOpts;

        /**
         * Encodes the specified MsgOpts message. Does not implicitly {@link Protos.MsgOpts.verify|verify} messages.
         * @param message MsgOpts message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Protos.IMsgOpts, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MsgOpts message, length delimited. Does not implicitly {@link Protos.MsgOpts.verify|verify} messages.
         * @param message MsgOpts message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Protos.IMsgOpts, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MsgOpts message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MsgOpts
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.MsgOpts;

        /**
         * Decodes a MsgOpts message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MsgOpts
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.MsgOpts;

        /**
         * Verifies a MsgOpts message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MsgOpts message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MsgOpts
         */
        public static fromObject(object: { [k: string]: any }): Protos.MsgOpts;

        /**
         * Creates a plain object from a MsgOpts message. Also converts values to other types if specified.
         * @param message MsgOpts
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Protos.MsgOpts, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MsgOpts to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace MsgOpts {

        /** Flag enum. */
        enum Flag {
            Norm = 0,
            RPC = 1,
            RESP = 2,
            TRANS = 3
        }

        /** TransTarget enum. */
        enum TransTarget {
            Undefine = 0,
            GC = 1,
            CS = 2,
            BS = 3,
            LS = 4,
            DB = 5,
            GS = 6
        }
    }

    /** Properties of a G_AskPing. */
    interface IG_AskPing {

        /** G_AskPing opts */
        opts?: (Protos.IMsgOpts|null);

        /** G_AskPing time */
        time?: (Long|null);
    }

    /** Represents a G_AskPing. */
    class G_AskPing implements IG_AskPing {

        /**
         * Constructs a new G_AskPing.
         * @param [properties] Properties to set
         */
        constructor(properties?: Protos.IG_AskPing);

        /** G_AskPing opts. */
        public opts?: (Protos.IMsgOpts|null);

        /** G_AskPing time. */
        public time: Long;

        /**
         * Creates a new G_AskPing instance using the specified properties.
         * @param [properties] Properties to set
         * @returns G_AskPing instance
         */
        public static create(properties?: Protos.IG_AskPing): Protos.G_AskPing;

        /**
         * Encodes the specified G_AskPing message. Does not implicitly {@link Protos.G_AskPing.verify|verify} messages.
         * @param message G_AskPing message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Protos.IG_AskPing, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified G_AskPing message, length delimited. Does not implicitly {@link Protos.G_AskPing.verify|verify} messages.
         * @param message G_AskPing message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Protos.IG_AskPing, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a G_AskPing message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns G_AskPing
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.G_AskPing;

        /**
         * Decodes a G_AskPing message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns G_AskPing
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.G_AskPing;

        /**
         * Verifies a G_AskPing message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a G_AskPing message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns G_AskPing
         */
        public static fromObject(object: { [k: string]: any }): Protos.G_AskPing;

        /**
         * Creates a plain object from a G_AskPing message. Also converts values to other types if specified.
         * @param message G_AskPing
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Protos.G_AskPing, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this G_AskPing to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a G_AskPingRet. */
    interface IG_AskPingRet {

        /** G_AskPingRet opts */
        opts?: (Protos.IMsgOpts|null);

        /** G_AskPingRet stime */
        stime?: (Long|null);

        /** G_AskPingRet time */
        time?: (Long|null);
    }

    /** Represents a G_AskPingRet. */
    class G_AskPingRet implements IG_AskPingRet {

        /**
         * Constructs a new G_AskPingRet.
         * @param [properties] Properties to set
         */
        constructor(properties?: Protos.IG_AskPingRet);

        /** G_AskPingRet opts. */
        public opts?: (Protos.IMsgOpts|null);

        /** G_AskPingRet stime. */
        public stime: Long;

        /** G_AskPingRet time. */
        public time: Long;

        /**
         * Creates a new G_AskPingRet instance using the specified properties.
         * @param [properties] Properties to set
         * @returns G_AskPingRet instance
         */
        public static create(properties?: Protos.IG_AskPingRet): Protos.G_AskPingRet;

        /**
         * Encodes the specified G_AskPingRet message. Does not implicitly {@link Protos.G_AskPingRet.verify|verify} messages.
         * @param message G_AskPingRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Protos.IG_AskPingRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified G_AskPingRet message, length delimited. Does not implicitly {@link Protos.G_AskPingRet.verify|verify} messages.
         * @param message G_AskPingRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Protos.IG_AskPingRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a G_AskPingRet message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns G_AskPingRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.G_AskPingRet;

        /**
         * Decodes a G_AskPingRet message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns G_AskPingRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.G_AskPingRet;

        /**
         * Verifies a G_AskPingRet message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a G_AskPingRet message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns G_AskPingRet
         */
        public static fromObject(object: { [k: string]: any }): Protos.G_AskPingRet;

        /**
         * Creates a plain object from a G_AskPingRet message. Also converts values to other types if specified.
         * @param message G_AskPingRet
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Protos.G_AskPingRet, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this G_AskPingRet to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Global. */
    interface IGlobal {
    }

    /** Represents a Global. */
    class Global implements IGlobal {

        /**
         * Constructs a new Global.
         * @param [properties] Properties to set
         */
        constructor(properties?: Protos.IGlobal);

        /**
         * Creates a new Global instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Global instance
         */
        public static create(properties?: Protos.IGlobal): Protos.Global;

        /**
         * Encodes the specified Global message. Does not implicitly {@link Protos.Global.verify|verify} messages.
         * @param message Global message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Protos.IGlobal, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Global message, length delimited. Does not implicitly {@link Protos.Global.verify|verify} messages.
         * @param message Global message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Protos.IGlobal, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Global message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Global
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.Global;

        /**
         * Decodes a Global message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Global
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.Global;

        /**
         * Verifies a Global message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Global message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Global
         */
        public static fromObject(object: { [k: string]: any }): Protos.Global;

        /**
         * Creates a plain object from a Global message. Also converts values to other types if specified.
         * @param message Global
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Protos.Global, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Global to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace Global {

        /** ECommon enum. */
        enum ECommon {
            Success = 0,
            Failed = 1
        }
    }

    /** Properties of a BS2GC_LoginRet. */
    interface IBS2GC_LoginRet {

        /** BS2GC_LoginRet opts */
        opts?: (Protos.IMsgOpts|null);

        /** BS2GC_LoginRet result */
        result?: (Protos.BS2GC_LoginRet.EResult|null);
    }

    /** Represents a BS2GC_LoginRet. */
    class BS2GC_LoginRet implements IBS2GC_LoginRet {

        /**
         * Constructs a new BS2GC_LoginRet.
         * @param [properties] Properties to set
         */
        constructor(properties?: Protos.IBS2GC_LoginRet);

        /** BS2GC_LoginRet opts. */
        public opts?: (Protos.IMsgOpts|null);

        /** BS2GC_LoginRet result. */
        public result: Protos.BS2GC_LoginRet.EResult;

        /**
         * Creates a new BS2GC_LoginRet instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BS2GC_LoginRet instance
         */
        public static create(properties?: Protos.IBS2GC_LoginRet): Protos.BS2GC_LoginRet;

        /**
         * Encodes the specified BS2GC_LoginRet message. Does not implicitly {@link Protos.BS2GC_LoginRet.verify|verify} messages.
         * @param message BS2GC_LoginRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Protos.IBS2GC_LoginRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BS2GC_LoginRet message, length delimited. Does not implicitly {@link Protos.BS2GC_LoginRet.verify|verify} messages.
         * @param message BS2GC_LoginRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Protos.IBS2GC_LoginRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BS2GC_LoginRet message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BS2GC_LoginRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.BS2GC_LoginRet;

        /**
         * Decodes a BS2GC_LoginRet message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BS2GC_LoginRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.BS2GC_LoginRet;

        /**
         * Verifies a BS2GC_LoginRet message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BS2GC_LoginRet message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BS2GC_LoginRet
         */
        public static fromObject(object: { [k: string]: any }): Protos.BS2GC_LoginRet;

        /**
         * Creates a plain object from a BS2GC_LoginRet message. Also converts values to other types if specified.
         * @param message BS2GC_LoginRet
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Protos.BS2GC_LoginRet, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BS2GC_LoginRet to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace BS2GC_LoginRet {

        /** EResult enum. */
        enum EResult {
            Success = 0,
            Failed = 1
        }
    }

    /** Properties of a BS2GC_BattleStart. */
    interface IBS2GC_BattleStart {

        /** BS2GC_BattleStart opts */
        opts?: (Protos.IMsgOpts|null);

        /** BS2GC_BattleStart id */
        id?: (number|null);
    }

    /** Represents a BS2GC_BattleStart. */
    class BS2GC_BattleStart implements IBS2GC_BattleStart {

        /**
         * Constructs a new BS2GC_BattleStart.
         * @param [properties] Properties to set
         */
        constructor(properties?: Protos.IBS2GC_BattleStart);

        /** BS2GC_BattleStart opts. */
        public opts?: (Protos.IMsgOpts|null);

        /** BS2GC_BattleStart id. */
        public id: number;

        /**
         * Creates a new BS2GC_BattleStart instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BS2GC_BattleStart instance
         */
        public static create(properties?: Protos.IBS2GC_BattleStart): Protos.BS2GC_BattleStart;

        /**
         * Encodes the specified BS2GC_BattleStart message. Does not implicitly {@link Protos.BS2GC_BattleStart.verify|verify} messages.
         * @param message BS2GC_BattleStart message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Protos.IBS2GC_BattleStart, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BS2GC_BattleStart message, length delimited. Does not implicitly {@link Protos.BS2GC_BattleStart.verify|verify} messages.
         * @param message BS2GC_BattleStart message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Protos.IBS2GC_BattleStart, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BS2GC_BattleStart message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BS2GC_BattleStart
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.BS2GC_BattleStart;

        /**
         * Decodes a BS2GC_BattleStart message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BS2GC_BattleStart
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.BS2GC_BattleStart;

        /**
         * Verifies a BS2GC_BattleStart message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BS2GC_BattleStart message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BS2GC_BattleStart
         */
        public static fromObject(object: { [k: string]: any }): Protos.BS2GC_BattleStart;

        /**
         * Creates a plain object from a BS2GC_BattleStart message. Also converts values to other types if specified.
         * @param message BS2GC_BattleStart
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Protos.BS2GC_BattleStart, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BS2GC_BattleStart to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BS2GC_BattleEnd. */
    interface IBS2GC_BattleEnd {

        /** BS2GC_BattleEnd opts */
        opts?: (Protos.IMsgOpts|null);

        /** BS2GC_BattleEnd id */
        id?: (number|null);
    }

    /** Represents a BS2GC_BattleEnd. */
    class BS2GC_BattleEnd implements IBS2GC_BattleEnd {

        /**
         * Constructs a new BS2GC_BattleEnd.
         * @param [properties] Properties to set
         */
        constructor(properties?: Protos.IBS2GC_BattleEnd);

        /** BS2GC_BattleEnd opts. */
        public opts?: (Protos.IMsgOpts|null);

        /** BS2GC_BattleEnd id. */
        public id: number;

        /**
         * Creates a new BS2GC_BattleEnd instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BS2GC_BattleEnd instance
         */
        public static create(properties?: Protos.IBS2GC_BattleEnd): Protos.BS2GC_BattleEnd;

        /**
         * Encodes the specified BS2GC_BattleEnd message. Does not implicitly {@link Protos.BS2GC_BattleEnd.verify|verify} messages.
         * @param message BS2GC_BattleEnd message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Protos.IBS2GC_BattleEnd, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BS2GC_BattleEnd message, length delimited. Does not implicitly {@link Protos.BS2GC_BattleEnd.verify|verify} messages.
         * @param message BS2GC_BattleEnd message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Protos.IBS2GC_BattleEnd, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BS2GC_BattleEnd message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BS2GC_BattleEnd
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.BS2GC_BattleEnd;

        /**
         * Decodes a BS2GC_BattleEnd message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BS2GC_BattleEnd
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.BS2GC_BattleEnd;

        /**
         * Verifies a BS2GC_BattleEnd message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BS2GC_BattleEnd message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BS2GC_BattleEnd
         */
        public static fromObject(object: { [k: string]: any }): Protos.BS2GC_BattleEnd;

        /**
         * Creates a plain object from a BS2GC_BattleEnd message. Also converts values to other types if specified.
         * @param message BS2GC_BattleEnd
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Protos.BS2GC_BattleEnd, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BS2GC_BattleEnd to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CS2BS_PlayerInfo. */
    interface ICS2BS_PlayerInfo {

        /** CS2BS_PlayerInfo gcNID */
        gcNID?: (Long|null);

        /** CS2BS_PlayerInfo name */
        name?: (string|null);

        /** CS2BS_PlayerInfo actorID */
        actorID?: (number|null);
    }

    /** Represents a CS2BS_PlayerInfo. */
    class CS2BS_PlayerInfo implements ICS2BS_PlayerInfo {

        /**
         * Constructs a new CS2BS_PlayerInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: Protos.ICS2BS_PlayerInfo);

        /** CS2BS_PlayerInfo gcNID. */
        public gcNID: Long;

        /** CS2BS_PlayerInfo name. */
        public name: string;

        /** CS2BS_PlayerInfo actorID. */
        public actorID: number;

        /**
         * Creates a new CS2BS_PlayerInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CS2BS_PlayerInfo instance
         */
        public static create(properties?: Protos.ICS2BS_PlayerInfo): Protos.CS2BS_PlayerInfo;

        /**
         * Encodes the specified CS2BS_PlayerInfo message. Does not implicitly {@link Protos.CS2BS_PlayerInfo.verify|verify} messages.
         * @param message CS2BS_PlayerInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Protos.ICS2BS_PlayerInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CS2BS_PlayerInfo message, length delimited. Does not implicitly {@link Protos.CS2BS_PlayerInfo.verify|verify} messages.
         * @param message CS2BS_PlayerInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Protos.ICS2BS_PlayerInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CS2BS_PlayerInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CS2BS_PlayerInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.CS2BS_PlayerInfo;

        /**
         * Decodes a CS2BS_PlayerInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CS2BS_PlayerInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.CS2BS_PlayerInfo;

        /**
         * Verifies a CS2BS_PlayerInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CS2BS_PlayerInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CS2BS_PlayerInfo
         */
        public static fromObject(object: { [k: string]: any }): Protos.CS2BS_PlayerInfo;

        /**
         * Creates a plain object from a CS2BS_PlayerInfo message. Also converts values to other types if specified.
         * @param message CS2BS_PlayerInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Protos.CS2BS_PlayerInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CS2BS_PlayerInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CS2BS_BattleInfo. */
    interface ICS2BS_BattleInfo {

        /** CS2BS_BattleInfo opts */
        opts?: (Protos.IMsgOpts|null);

        /** CS2BS_BattleInfo mapID */
        mapID?: (number|null);

        /** CS2BS_BattleInfo timeout */
        timeout?: (number|null);

        /** CS2BS_BattleInfo playerInfo */
        playerInfo?: (Protos.ICS2BS_PlayerInfo[]|null);
    }

    /** Represents a CS2BS_BattleInfo. */
    class CS2BS_BattleInfo implements ICS2BS_BattleInfo {

        /**
         * Constructs a new CS2BS_BattleInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: Protos.ICS2BS_BattleInfo);

        /** CS2BS_BattleInfo opts. */
        public opts?: (Protos.IMsgOpts|null);

        /** CS2BS_BattleInfo mapID. */
        public mapID: number;

        /** CS2BS_BattleInfo timeout. */
        public timeout: number;

        /** CS2BS_BattleInfo playerInfo. */
        public playerInfo: Protos.ICS2BS_PlayerInfo[];

        /**
         * Creates a new CS2BS_BattleInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CS2BS_BattleInfo instance
         */
        public static create(properties?: Protos.ICS2BS_BattleInfo): Protos.CS2BS_BattleInfo;

        /**
         * Encodes the specified CS2BS_BattleInfo message. Does not implicitly {@link Protos.CS2BS_BattleInfo.verify|verify} messages.
         * @param message CS2BS_BattleInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Protos.ICS2BS_BattleInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CS2BS_BattleInfo message, length delimited. Does not implicitly {@link Protos.CS2BS_BattleInfo.verify|verify} messages.
         * @param message CS2BS_BattleInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Protos.ICS2BS_BattleInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CS2BS_BattleInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CS2BS_BattleInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.CS2BS_BattleInfo;

        /**
         * Decodes a CS2BS_BattleInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CS2BS_BattleInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.CS2BS_BattleInfo;

        /**
         * Verifies a CS2BS_BattleInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CS2BS_BattleInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CS2BS_BattleInfo
         */
        public static fromObject(object: { [k: string]: any }): Protos.CS2BS_BattleInfo;

        /**
         * Creates a plain object from a CS2BS_BattleInfo message. Also converts values to other types if specified.
         * @param message CS2BS_BattleInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Protos.CS2BS_BattleInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CS2BS_BattleInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CS2BS_BattleStartRet. */
    interface ICS2BS_BattleStartRet {

        /** CS2BS_BattleStartRet opts */
        opts?: (Protos.IMsgOpts|null);
    }

    /** Represents a CS2BS_BattleStartRet. */
    class CS2BS_BattleStartRet implements ICS2BS_BattleStartRet {

        /**
         * Constructs a new CS2BS_BattleStartRet.
         * @param [properties] Properties to set
         */
        constructor(properties?: Protos.ICS2BS_BattleStartRet);

        /** CS2BS_BattleStartRet opts. */
        public opts?: (Protos.IMsgOpts|null);

        /**
         * Creates a new CS2BS_BattleStartRet instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CS2BS_BattleStartRet instance
         */
        public static create(properties?: Protos.ICS2BS_BattleStartRet): Protos.CS2BS_BattleStartRet;

        /**
         * Encodes the specified CS2BS_BattleStartRet message. Does not implicitly {@link Protos.CS2BS_BattleStartRet.verify|verify} messages.
         * @param message CS2BS_BattleStartRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Protos.ICS2BS_BattleStartRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CS2BS_BattleStartRet message, length delimited. Does not implicitly {@link Protos.CS2BS_BattleStartRet.verify|verify} messages.
         * @param message CS2BS_BattleStartRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Protos.ICS2BS_BattleStartRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CS2BS_BattleStartRet message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CS2BS_BattleStartRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.CS2BS_BattleStartRet;

        /**
         * Decodes a CS2BS_BattleStartRet message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CS2BS_BattleStartRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.CS2BS_BattleStartRet;

        /**
         * Verifies a CS2BS_BattleStartRet message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CS2BS_BattleStartRet message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CS2BS_BattleStartRet
         */
        public static fromObject(object: { [k: string]: any }): Protos.CS2BS_BattleStartRet;

        /**
         * Creates a plain object from a CS2BS_BattleStartRet message. Also converts values to other types if specified.
         * @param message CS2BS_BattleStartRet
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Protos.CS2BS_BattleStartRet, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CS2BS_BattleStartRet to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CS2BS_BattleEndRet. */
    interface ICS2BS_BattleEndRet {

        /** CS2BS_BattleEndRet opts */
        opts?: (Protos.IMsgOpts|null);
    }

    /** Represents a CS2BS_BattleEndRet. */
    class CS2BS_BattleEndRet implements ICS2BS_BattleEndRet {

        /**
         * Constructs a new CS2BS_BattleEndRet.
         * @param [properties] Properties to set
         */
        constructor(properties?: Protos.ICS2BS_BattleEndRet);

        /** CS2BS_BattleEndRet opts. */
        public opts?: (Protos.IMsgOpts|null);

        /**
         * Creates a new CS2BS_BattleEndRet instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CS2BS_BattleEndRet instance
         */
        public static create(properties?: Protos.ICS2BS_BattleEndRet): Protos.CS2BS_BattleEndRet;

        /**
         * Encodes the specified CS2BS_BattleEndRet message. Does not implicitly {@link Protos.CS2BS_BattleEndRet.verify|verify} messages.
         * @param message CS2BS_BattleEndRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Protos.ICS2BS_BattleEndRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CS2BS_BattleEndRet message, length delimited. Does not implicitly {@link Protos.CS2BS_BattleEndRet.verify|verify} messages.
         * @param message CS2BS_BattleEndRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Protos.ICS2BS_BattleEndRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CS2BS_BattleEndRet message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CS2BS_BattleEndRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.CS2BS_BattleEndRet;

        /**
         * Decodes a CS2BS_BattleEndRet message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CS2BS_BattleEndRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.CS2BS_BattleEndRet;

        /**
         * Verifies a CS2BS_BattleEndRet message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CS2BS_BattleEndRet message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CS2BS_BattleEndRet
         */
        public static fromObject(object: { [k: string]: any }): Protos.CS2BS_BattleEndRet;

        /**
         * Creates a plain object from a CS2BS_BattleEndRet message. Also converts values to other types if specified.
         * @param message CS2BS_BattleEndRet
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Protos.CS2BS_BattleEndRet, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CS2BS_BattleEndRet to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CS2GC_BeginMatchRet. */
    interface ICS2GC_BeginMatchRet {

        /** CS2GC_BeginMatchRet opts */
        opts?: (Protos.IMsgOpts|null);

        /** CS2GC_BeginMatchRet result */
        result?: (Protos.CS2GC_BeginMatchRet.EResult|null);

        /** CS2GC_BeginMatchRet id */
        id?: (number|null);

        /** CS2GC_BeginMatchRet mapID */
        mapID?: (number|null);

        /** CS2GC_BeginMatchRet maxPlayer */
        maxPlayer?: (number|null);

        /** CS2GC_BeginMatchRet playerInfos */
        playerInfos?: (Protos.ICS2GC_PlayerInfo[]|null);
    }

    /** Represents a CS2GC_BeginMatchRet. */
    class CS2GC_BeginMatchRet implements ICS2GC_BeginMatchRet {

        /**
         * Constructs a new CS2GC_BeginMatchRet.
         * @param [properties] Properties to set
         */
        constructor(properties?: Protos.ICS2GC_BeginMatchRet);

        /** CS2GC_BeginMatchRet opts. */
        public opts?: (Protos.IMsgOpts|null);

        /** CS2GC_BeginMatchRet result. */
        public result: Protos.CS2GC_BeginMatchRet.EResult;

        /** CS2GC_BeginMatchRet id. */
        public id: number;

        /** CS2GC_BeginMatchRet mapID. */
        public mapID: number;

        /** CS2GC_BeginMatchRet maxPlayer. */
        public maxPlayer: number;

        /** CS2GC_BeginMatchRet playerInfos. */
        public playerInfos: Protos.ICS2GC_PlayerInfo[];

        /**
         * Creates a new CS2GC_BeginMatchRet instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CS2GC_BeginMatchRet instance
         */
        public static create(properties?: Protos.ICS2GC_BeginMatchRet): Protos.CS2GC_BeginMatchRet;

        /**
         * Encodes the specified CS2GC_BeginMatchRet message. Does not implicitly {@link Protos.CS2GC_BeginMatchRet.verify|verify} messages.
         * @param message CS2GC_BeginMatchRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Protos.ICS2GC_BeginMatchRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CS2GC_BeginMatchRet message, length delimited. Does not implicitly {@link Protos.CS2GC_BeginMatchRet.verify|verify} messages.
         * @param message CS2GC_BeginMatchRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Protos.ICS2GC_BeginMatchRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CS2GC_BeginMatchRet message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CS2GC_BeginMatchRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.CS2GC_BeginMatchRet;

        /**
         * Decodes a CS2GC_BeginMatchRet message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CS2GC_BeginMatchRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.CS2GC_BeginMatchRet;

        /**
         * Verifies a CS2GC_BeginMatchRet message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CS2GC_BeginMatchRet message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CS2GC_BeginMatchRet
         */
        public static fromObject(object: { [k: string]: any }): Protos.CS2GC_BeginMatchRet;

        /**
         * Creates a plain object from a CS2GC_BeginMatchRet message. Also converts values to other types if specified.
         * @param message CS2GC_BeginMatchRet
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Protos.CS2GC_BeginMatchRet, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CS2GC_BeginMatchRet to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace CS2GC_BeginMatchRet {

        /** EResult enum. */
        enum EResult {
            Success = 0,
            Failed = 1,
            IllegalID = 2,
            NoRoom = 3,
            UserInBattle = 4,
            UserInRoom = 5
        }
    }

    /** Properties of a CS2GC_PlayerInfo. */
    interface ICS2GC_PlayerInfo {

        /** CS2GC_PlayerInfo gcNID */
        gcNID?: (Long|null);

        /** CS2GC_PlayerInfo name */
        name?: (string|null);

        /** CS2GC_PlayerInfo actorID */
        actorID?: (number|null);
    }

    /** Represents a CS2GC_PlayerInfo. */
    class CS2GC_PlayerInfo implements ICS2GC_PlayerInfo {

        /**
         * Constructs a new CS2GC_PlayerInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: Protos.ICS2GC_PlayerInfo);

        /** CS2GC_PlayerInfo gcNID. */
        public gcNID: Long;

        /** CS2GC_PlayerInfo name. */
        public name: string;

        /** CS2GC_PlayerInfo actorID. */
        public actorID: number;

        /**
         * Creates a new CS2GC_PlayerInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CS2GC_PlayerInfo instance
         */
        public static create(properties?: Protos.ICS2GC_PlayerInfo): Protos.CS2GC_PlayerInfo;

        /**
         * Encodes the specified CS2GC_PlayerInfo message. Does not implicitly {@link Protos.CS2GC_PlayerInfo.verify|verify} messages.
         * @param message CS2GC_PlayerInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Protos.ICS2GC_PlayerInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CS2GC_PlayerInfo message, length delimited. Does not implicitly {@link Protos.CS2GC_PlayerInfo.verify|verify} messages.
         * @param message CS2GC_PlayerInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Protos.ICS2GC_PlayerInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CS2GC_PlayerInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CS2GC_PlayerInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.CS2GC_PlayerInfo;

        /**
         * Decodes a CS2GC_PlayerInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CS2GC_PlayerInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.CS2GC_PlayerInfo;

        /**
         * Verifies a CS2GC_PlayerInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CS2GC_PlayerInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CS2GC_PlayerInfo
         */
        public static fromObject(object: { [k: string]: any }): Protos.CS2GC_PlayerInfo;

        /**
         * Creates a plain object from a CS2GC_PlayerInfo message. Also converts values to other types if specified.
         * @param message CS2GC_PlayerInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Protos.CS2GC_PlayerInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CS2GC_PlayerInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CS2GC_PlayerJoin. */
    interface ICS2GC_PlayerJoin {

        /** CS2GC_PlayerJoin opts */
        opts?: (Protos.IMsgOpts|null);

        /** CS2GC_PlayerJoin playerInfos */
        playerInfos?: (Protos.ICS2GC_PlayerInfo|null);
    }

    /** Represents a CS2GC_PlayerJoin. */
    class CS2GC_PlayerJoin implements ICS2GC_PlayerJoin {

        /**
         * Constructs a new CS2GC_PlayerJoin.
         * @param [properties] Properties to set
         */
        constructor(properties?: Protos.ICS2GC_PlayerJoin);

        /** CS2GC_PlayerJoin opts. */
        public opts?: (Protos.IMsgOpts|null);

        /** CS2GC_PlayerJoin playerInfos. */
        public playerInfos?: (Protos.ICS2GC_PlayerInfo|null);

        /**
         * Creates a new CS2GC_PlayerJoin instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CS2GC_PlayerJoin instance
         */
        public static create(properties?: Protos.ICS2GC_PlayerJoin): Protos.CS2GC_PlayerJoin;

        /**
         * Encodes the specified CS2GC_PlayerJoin message. Does not implicitly {@link Protos.CS2GC_PlayerJoin.verify|verify} messages.
         * @param message CS2GC_PlayerJoin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Protos.ICS2GC_PlayerJoin, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CS2GC_PlayerJoin message, length delimited. Does not implicitly {@link Protos.CS2GC_PlayerJoin.verify|verify} messages.
         * @param message CS2GC_PlayerJoin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Protos.ICS2GC_PlayerJoin, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CS2GC_PlayerJoin message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CS2GC_PlayerJoin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.CS2GC_PlayerJoin;

        /**
         * Decodes a CS2GC_PlayerJoin message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CS2GC_PlayerJoin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.CS2GC_PlayerJoin;

        /**
         * Verifies a CS2GC_PlayerJoin message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CS2GC_PlayerJoin message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CS2GC_PlayerJoin
         */
        public static fromObject(object: { [k: string]: any }): Protos.CS2GC_PlayerJoin;

        /**
         * Creates a plain object from a CS2GC_PlayerJoin message. Also converts values to other types if specified.
         * @param message CS2GC_PlayerJoin
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Protos.CS2GC_PlayerJoin, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CS2GC_PlayerJoin to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CS2GC_PlayerLeave. */
    interface ICS2GC_PlayerLeave {

        /** CS2GC_PlayerLeave opts */
        opts?: (Protos.IMsgOpts|null);

        /** CS2GC_PlayerLeave gcNID */
        gcNID?: (Long|null);
    }

    /** Represents a CS2GC_PlayerLeave. */
    class CS2GC_PlayerLeave implements ICS2GC_PlayerLeave {

        /**
         * Constructs a new CS2GC_PlayerLeave.
         * @param [properties] Properties to set
         */
        constructor(properties?: Protos.ICS2GC_PlayerLeave);

        /** CS2GC_PlayerLeave opts. */
        public opts?: (Protos.IMsgOpts|null);

        /** CS2GC_PlayerLeave gcNID. */
        public gcNID: Long;

        /**
         * Creates a new CS2GC_PlayerLeave instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CS2GC_PlayerLeave instance
         */
        public static create(properties?: Protos.ICS2GC_PlayerLeave): Protos.CS2GC_PlayerLeave;

        /**
         * Encodes the specified CS2GC_PlayerLeave message. Does not implicitly {@link Protos.CS2GC_PlayerLeave.verify|verify} messages.
         * @param message CS2GC_PlayerLeave message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Protos.ICS2GC_PlayerLeave, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CS2GC_PlayerLeave message, length delimited. Does not implicitly {@link Protos.CS2GC_PlayerLeave.verify|verify} messages.
         * @param message CS2GC_PlayerLeave message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Protos.ICS2GC_PlayerLeave, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CS2GC_PlayerLeave message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CS2GC_PlayerLeave
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.CS2GC_PlayerLeave;

        /**
         * Decodes a CS2GC_PlayerLeave message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CS2GC_PlayerLeave
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.CS2GC_PlayerLeave;

        /**
         * Verifies a CS2GC_PlayerLeave message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CS2GC_PlayerLeave message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CS2GC_PlayerLeave
         */
        public static fromObject(object: { [k: string]: any }): Protos.CS2GC_PlayerLeave;

        /**
         * Creates a plain object from a CS2GC_PlayerLeave message. Also converts values to other types if specified.
         * @param message CS2GC_PlayerLeave
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Protos.CS2GC_PlayerLeave, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CS2GC_PlayerLeave to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CS2GC_RoomInfo. */
    interface ICS2GC_RoomInfo {

        /** CS2GC_RoomInfo opts */
        opts?: (Protos.IMsgOpts|null);

        /** CS2GC_RoomInfo playerInfos */
        playerInfos?: (Protos.ICS2GC_PlayerInfo[]|null);

        /** CS2GC_RoomInfo progresses */
        progresses?: (number[]|null);
    }

    /** Represents a CS2GC_RoomInfo. */
    class CS2GC_RoomInfo implements ICS2GC_RoomInfo {

        /**
         * Constructs a new CS2GC_RoomInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: Protos.ICS2GC_RoomInfo);

        /** CS2GC_RoomInfo opts. */
        public opts?: (Protos.IMsgOpts|null);

        /** CS2GC_RoomInfo playerInfos. */
        public playerInfos: Protos.ICS2GC_PlayerInfo[];

        /** CS2GC_RoomInfo progresses. */
        public progresses: number[];

        /**
         * Creates a new CS2GC_RoomInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CS2GC_RoomInfo instance
         */
        public static create(properties?: Protos.ICS2GC_RoomInfo): Protos.CS2GC_RoomInfo;

        /**
         * Encodes the specified CS2GC_RoomInfo message. Does not implicitly {@link Protos.CS2GC_RoomInfo.verify|verify} messages.
         * @param message CS2GC_RoomInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Protos.ICS2GC_RoomInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CS2GC_RoomInfo message, length delimited. Does not implicitly {@link Protos.CS2GC_RoomInfo.verify|verify} messages.
         * @param message CS2GC_RoomInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Protos.ICS2GC_RoomInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CS2GC_RoomInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CS2GC_RoomInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.CS2GC_RoomInfo;

        /**
         * Decodes a CS2GC_RoomInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CS2GC_RoomInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.CS2GC_RoomInfo;

        /**
         * Verifies a CS2GC_RoomInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CS2GC_RoomInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CS2GC_RoomInfo
         */
        public static fromObject(object: { [k: string]: any }): Protos.CS2GC_RoomInfo;

        /**
         * Creates a plain object from a CS2GC_RoomInfo message. Also converts values to other types if specified.
         * @param message CS2GC_RoomInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Protos.CS2GC_RoomInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CS2GC_RoomInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CS2GC_EnterBattle. */
    interface ICS2GC_EnterBattle {

        /** CS2GC_EnterBattle opts */
        opts?: (Protos.IMsgOpts|null);

        /** CS2GC_EnterBattle gcNID */
        gcNID?: (Long|null);

        /** CS2GC_EnterBattle ip */
        ip?: (string|null);

        /** CS2GC_EnterBattle port */
        port?: (number|null);

        /** CS2GC_EnterBattle error */
        error?: (Protos.CS2GC_EnterBattle.Error|null);
    }

    /** Represents a CS2GC_EnterBattle. */
    class CS2GC_EnterBattle implements ICS2GC_EnterBattle {

        /**
         * Constructs a new CS2GC_EnterBattle.
         * @param [properties] Properties to set
         */
        constructor(properties?: Protos.ICS2GC_EnterBattle);

        /** CS2GC_EnterBattle opts. */
        public opts?: (Protos.IMsgOpts|null);

        /** CS2GC_EnterBattle gcNID. */
        public gcNID: Long;

        /** CS2GC_EnterBattle ip. */
        public ip: string;

        /** CS2GC_EnterBattle port. */
        public port: number;

        /** CS2GC_EnterBattle error. */
        public error: Protos.CS2GC_EnterBattle.Error;

        /**
         * Creates a new CS2GC_EnterBattle instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CS2GC_EnterBattle instance
         */
        public static create(properties?: Protos.ICS2GC_EnterBattle): Protos.CS2GC_EnterBattle;

        /**
         * Encodes the specified CS2GC_EnterBattle message. Does not implicitly {@link Protos.CS2GC_EnterBattle.verify|verify} messages.
         * @param message CS2GC_EnterBattle message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Protos.ICS2GC_EnterBattle, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CS2GC_EnterBattle message, length delimited. Does not implicitly {@link Protos.CS2GC_EnterBattle.verify|verify} messages.
         * @param message CS2GC_EnterBattle message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Protos.ICS2GC_EnterBattle, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CS2GC_EnterBattle message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CS2GC_EnterBattle
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.CS2GC_EnterBattle;

        /**
         * Decodes a CS2GC_EnterBattle message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CS2GC_EnterBattle
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.CS2GC_EnterBattle;

        /**
         * Verifies a CS2GC_EnterBattle message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CS2GC_EnterBattle message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CS2GC_EnterBattle
         */
        public static fromObject(object: { [k: string]: any }): Protos.CS2GC_EnterBattle;

        /**
         * Creates a plain object from a CS2GC_EnterBattle message. Also converts values to other types if specified.
         * @param message CS2GC_EnterBattle
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Protos.CS2GC_EnterBattle, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CS2GC_EnterBattle to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace CS2GC_EnterBattle {

        /** Error enum. */
        enum Error {
            Success = 0,
            BSNotFound = 1,
            BSLost = 2
        }
    }

    /** Properties of a CS2GS_GCLoginRet. */
    interface ICS2GS_GCLoginRet {

        /** CS2GS_GCLoginRet opts */
        opts?: (Protos.IMsgOpts|null);

        /** CS2GS_GCLoginRet result */
        result?: (Protos.CS2GS_GCLoginRet.EResult|null);

        /** CS2GS_GCLoginRet gcState */
        gcState?: (Protos.CS2GS_GCLoginRet.EGCCState|null);

        /** CS2GS_GCLoginRet gcNID */
        gcNID?: (Long|null);

        /** CS2GS_GCLoginRet bsIP */
        bsIP?: (string|null);

        /** CS2GS_GCLoginRet bsPort */
        bsPort?: (number|null);
    }

    /** Represents a CS2GS_GCLoginRet. */
    class CS2GS_GCLoginRet implements ICS2GS_GCLoginRet {

        /**
         * Constructs a new CS2GS_GCLoginRet.
         * @param [properties] Properties to set
         */
        constructor(properties?: Protos.ICS2GS_GCLoginRet);

        /** CS2GS_GCLoginRet opts. */
        public opts?: (Protos.IMsgOpts|null);

        /** CS2GS_GCLoginRet result. */
        public result: Protos.CS2GS_GCLoginRet.EResult;

        /** CS2GS_GCLoginRet gcState. */
        public gcState: Protos.CS2GS_GCLoginRet.EGCCState;

        /** CS2GS_GCLoginRet gcNID. */
        public gcNID: Long;

        /** CS2GS_GCLoginRet bsIP. */
        public bsIP: string;

        /** CS2GS_GCLoginRet bsPort. */
        public bsPort: number;

        /**
         * Creates a new CS2GS_GCLoginRet instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CS2GS_GCLoginRet instance
         */
        public static create(properties?: Protos.ICS2GS_GCLoginRet): Protos.CS2GS_GCLoginRet;

        /**
         * Encodes the specified CS2GS_GCLoginRet message. Does not implicitly {@link Protos.CS2GS_GCLoginRet.verify|verify} messages.
         * @param message CS2GS_GCLoginRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Protos.ICS2GS_GCLoginRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CS2GS_GCLoginRet message, length delimited. Does not implicitly {@link Protos.CS2GS_GCLoginRet.verify|verify} messages.
         * @param message CS2GS_GCLoginRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Protos.ICS2GS_GCLoginRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CS2GS_GCLoginRet message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CS2GS_GCLoginRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.CS2GS_GCLoginRet;

        /**
         * Decodes a CS2GS_GCLoginRet message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CS2GS_GCLoginRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.CS2GS_GCLoginRet;

        /**
         * Verifies a CS2GS_GCLoginRet message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CS2GS_GCLoginRet message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CS2GS_GCLoginRet
         */
        public static fromObject(object: { [k: string]: any }): Protos.CS2GS_GCLoginRet;

        /**
         * Creates a plain object from a CS2GS_GCLoginRet message. Also converts values to other types if specified.
         * @param message CS2GS_GCLoginRet
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Protos.CS2GS_GCLoginRet, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CS2GS_GCLoginRet to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace CS2GS_GCLoginRet {

        /** EResult enum. */
        enum EResult {
            Success = 0,
            IllegalLogin = 1
        }

        /** EGCCState enum. */
        enum EGCCState {
            Idle = 0,
            Battle = 1
        }
    }

    /** Properties of a CS2GS_KickGC. */
    interface ICS2GS_KickGC {

        /** CS2GS_KickGC opts */
        opts?: (Protos.IMsgOpts|null);

        /** CS2GS_KickGC gcNID */
        gcNID?: (Long|null);

        /** CS2GS_KickGC reason */
        reason?: (Protos.CS2GS_KickGC.EReason|null);
    }

    /** Represents a CS2GS_KickGC. */
    class CS2GS_KickGC implements ICS2GS_KickGC {

        /**
         * Constructs a new CS2GS_KickGC.
         * @param [properties] Properties to set
         */
        constructor(properties?: Protos.ICS2GS_KickGC);

        /** CS2GS_KickGC opts. */
        public opts?: (Protos.IMsgOpts|null);

        /** CS2GS_KickGC gcNID. */
        public gcNID: Long;

        /** CS2GS_KickGC reason. */
        public reason: Protos.CS2GS_KickGC.EReason;

        /**
         * Creates a new CS2GS_KickGC instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CS2GS_KickGC instance
         */
        public static create(properties?: Protos.ICS2GS_KickGC): Protos.CS2GS_KickGC;

        /**
         * Encodes the specified CS2GS_KickGC message. Does not implicitly {@link Protos.CS2GS_KickGC.verify|verify} messages.
         * @param message CS2GS_KickGC message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Protos.ICS2GS_KickGC, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CS2GS_KickGC message, length delimited. Does not implicitly {@link Protos.CS2GS_KickGC.verify|verify} messages.
         * @param message CS2GS_KickGC message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Protos.ICS2GS_KickGC, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CS2GS_KickGC message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CS2GS_KickGC
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.CS2GS_KickGC;

        /**
         * Decodes a CS2GS_KickGC message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CS2GS_KickGC
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.CS2GS_KickGC;

        /**
         * Verifies a CS2GS_KickGC message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CS2GS_KickGC message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CS2GS_KickGC
         */
        public static fromObject(object: { [k: string]: any }): Protos.CS2GS_KickGC;

        /**
         * Creates a plain object from a CS2GS_KickGC message. Also converts values to other types if specified.
         * @param message CS2GS_KickGC
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Protos.CS2GS_KickGC, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CS2GS_KickGC to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace CS2GS_KickGC {

        /** EReason enum. */
        enum EReason {
            DuplicateLogin = 0,
            Other = 1
        }
    }

    /** Properties of a CS2LS_GSInfos. */
    interface ICS2LS_GSInfos {

        /** CS2LS_GSInfos opts */
        opts?: (Protos.IMsgOpts|null);

        /** CS2LS_GSInfos gsInfo */
        gsInfo?: (Protos.IGSInfo[]|null);
    }

    /** Represents a CS2LS_GSInfos. */
    class CS2LS_GSInfos implements ICS2LS_GSInfos {

        /**
         * Constructs a new CS2LS_GSInfos.
         * @param [properties] Properties to set
         */
        constructor(properties?: Protos.ICS2LS_GSInfos);

        /** CS2LS_GSInfos opts. */
        public opts?: (Protos.IMsgOpts|null);

        /** CS2LS_GSInfos gsInfo. */
        public gsInfo: Protos.IGSInfo[];

        /**
         * Creates a new CS2LS_GSInfos instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CS2LS_GSInfos instance
         */
        public static create(properties?: Protos.ICS2LS_GSInfos): Protos.CS2LS_GSInfos;

        /**
         * Encodes the specified CS2LS_GSInfos message. Does not implicitly {@link Protos.CS2LS_GSInfos.verify|verify} messages.
         * @param message CS2LS_GSInfos message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Protos.ICS2LS_GSInfos, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CS2LS_GSInfos message, length delimited. Does not implicitly {@link Protos.CS2LS_GSInfos.verify|verify} messages.
         * @param message CS2LS_GSInfos message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Protos.ICS2LS_GSInfos, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CS2LS_GSInfos message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CS2LS_GSInfos
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.CS2LS_GSInfos;

        /**
         * Decodes a CS2LS_GSInfos message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CS2LS_GSInfos
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.CS2LS_GSInfos;

        /**
         * Verifies a CS2LS_GSInfos message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CS2LS_GSInfos message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CS2LS_GSInfos
         */
        public static fromObject(object: { [k: string]: any }): Protos.CS2LS_GSInfos;

        /**
         * Creates a plain object from a CS2LS_GSInfos message. Also converts values to other types if specified.
         * @param message CS2LS_GSInfos
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Protos.CS2LS_GSInfos, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CS2LS_GSInfos to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CS2LS_GSInfo. */
    interface ICS2LS_GSInfo {

        /** CS2LS_GSInfo opts */
        opts?: (Protos.IMsgOpts|null);

        /** CS2LS_GSInfo gsInfo */
        gsInfo?: (Protos.IGSInfo|null);
    }

    /** Represents a CS2LS_GSInfo. */
    class CS2LS_GSInfo implements ICS2LS_GSInfo {

        /**
         * Constructs a new CS2LS_GSInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: Protos.ICS2LS_GSInfo);

        /** CS2LS_GSInfo opts. */
        public opts?: (Protos.IMsgOpts|null);

        /** CS2LS_GSInfo gsInfo. */
        public gsInfo?: (Protos.IGSInfo|null);

        /**
         * Creates a new CS2LS_GSInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CS2LS_GSInfo instance
         */
        public static create(properties?: Protos.ICS2LS_GSInfo): Protos.CS2LS_GSInfo;

        /**
         * Encodes the specified CS2LS_GSInfo message. Does not implicitly {@link Protos.CS2LS_GSInfo.verify|verify} messages.
         * @param message CS2LS_GSInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Protos.ICS2LS_GSInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CS2LS_GSInfo message, length delimited. Does not implicitly {@link Protos.CS2LS_GSInfo.verify|verify} messages.
         * @param message CS2LS_GSInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Protos.ICS2LS_GSInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CS2LS_GSInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CS2LS_GSInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.CS2LS_GSInfo;

        /**
         * Decodes a CS2LS_GSInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CS2LS_GSInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.CS2LS_GSInfo;

        /**
         * Verifies a CS2LS_GSInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CS2LS_GSInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CS2LS_GSInfo
         */
        public static fromObject(object: { [k: string]: any }): Protos.CS2LS_GSInfo;

        /**
         * Creates a plain object from a CS2LS_GSInfo message. Also converts values to other types if specified.
         * @param message CS2LS_GSInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Protos.CS2LS_GSInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CS2LS_GSInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CS2LS_GSLost. */
    interface ICS2LS_GSLost {

        /** CS2LS_GSLost opts */
        opts?: (Protos.IMsgOpts|null);

        /** CS2LS_GSLost gsid */
        gsid?: (number|null);
    }

    /** Represents a CS2LS_GSLost. */
    class CS2LS_GSLost implements ICS2LS_GSLost {

        /**
         * Constructs a new CS2LS_GSLost.
         * @param [properties] Properties to set
         */
        constructor(properties?: Protos.ICS2LS_GSLost);

        /** CS2LS_GSLost opts. */
        public opts?: (Protos.IMsgOpts|null);

        /** CS2LS_GSLost gsid. */
        public gsid: number;

        /**
         * Creates a new CS2LS_GSLost instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CS2LS_GSLost instance
         */
        public static create(properties?: Protos.ICS2LS_GSLost): Protos.CS2LS_GSLost;

        /**
         * Encodes the specified CS2LS_GSLost message. Does not implicitly {@link Protos.CS2LS_GSLost.verify|verify} messages.
         * @param message CS2LS_GSLost message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Protos.ICS2LS_GSLost, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CS2LS_GSLost message, length delimited. Does not implicitly {@link Protos.CS2LS_GSLost.verify|verify} messages.
         * @param message CS2LS_GSLost message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Protos.ICS2LS_GSLost, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CS2LS_GSLost message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CS2LS_GSLost
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.CS2LS_GSLost;

        /**
         * Decodes a CS2LS_GSLost message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CS2LS_GSLost
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.CS2LS_GSLost;

        /**
         * Verifies a CS2LS_GSLost message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CS2LS_GSLost message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CS2LS_GSLost
         */
        public static fromObject(object: { [k: string]: any }): Protos.CS2LS_GSLost;

        /**
         * Creates a plain object from a CS2LS_GSLost message. Also converts values to other types if specified.
         * @param message CS2LS_GSLost
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Protos.CS2LS_GSLost, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CS2LS_GSLost to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CS2LS_GCLoginRet. */
    interface ICS2LS_GCLoginRet {

        /** CS2LS_GCLoginRet opts */
        opts?: (Protos.IMsgOpts|null);

        /** CS2LS_GCLoginRet result */
        result?: (Protos.CS2LS_GCLoginRet.EResult|null);
    }

    /** Represents a CS2LS_GCLoginRet. */
    class CS2LS_GCLoginRet implements ICS2LS_GCLoginRet {

        /**
         * Constructs a new CS2LS_GCLoginRet.
         * @param [properties] Properties to set
         */
        constructor(properties?: Protos.ICS2LS_GCLoginRet);

        /** CS2LS_GCLoginRet opts. */
        public opts?: (Protos.IMsgOpts|null);

        /** CS2LS_GCLoginRet result. */
        public result: Protos.CS2LS_GCLoginRet.EResult;

        /**
         * Creates a new CS2LS_GCLoginRet instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CS2LS_GCLoginRet instance
         */
        public static create(properties?: Protos.ICS2LS_GCLoginRet): Protos.CS2LS_GCLoginRet;

        /**
         * Encodes the specified CS2LS_GCLoginRet message. Does not implicitly {@link Protos.CS2LS_GCLoginRet.verify|verify} messages.
         * @param message CS2LS_GCLoginRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Protos.ICS2LS_GCLoginRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CS2LS_GCLoginRet message, length delimited. Does not implicitly {@link Protos.CS2LS_GCLoginRet.verify|verify} messages.
         * @param message CS2LS_GCLoginRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Protos.ICS2LS_GCLoginRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CS2LS_GCLoginRet message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CS2LS_GCLoginRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.CS2LS_GCLoginRet;

        /**
         * Decodes a CS2LS_GCLoginRet message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CS2LS_GCLoginRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.CS2LS_GCLoginRet;

        /**
         * Verifies a CS2LS_GCLoginRet message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CS2LS_GCLoginRet message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CS2LS_GCLoginRet
         */
        public static fromObject(object: { [k: string]: any }): Protos.CS2LS_GCLoginRet;

        /**
         * Creates a plain object from a CS2LS_GCLoginRet message. Also converts values to other types if specified.
         * @param message CS2LS_GCLoginRet
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Protos.CS2LS_GCLoginRet, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CS2LS_GCLoginRet to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace CS2LS_GCLoginRet {

        /** EResult enum. */
        enum EResult {
            Success = 0,
            Failed = 1
        }
    }

    /** Properties of a GSInfo. */
    interface IGSInfo {

        /** GSInfo id */
        id?: (number|null);

        /** GSInfo name */
        name?: (string|null);

        /** GSInfo ip */
        ip?: (string|null);

        /** GSInfo port */
        port?: (number|null);

        /** GSInfo password */
        password?: (string|null);

        /** GSInfo state */
        state?: (Protos.GSInfo.State|null);
    }

    /** Represents a GSInfo. */
    class GSInfo implements IGSInfo {

        /**
         * Constructs a new GSInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: Protos.IGSInfo);

        /** GSInfo id. */
        public id: number;

        /** GSInfo name. */
        public name: string;

        /** GSInfo ip. */
        public ip: string;

        /** GSInfo port. */
        public port: number;

        /** GSInfo password. */
        public password: string;

        /** GSInfo state. */
        public state: Protos.GSInfo.State;

        /**
         * Creates a new GSInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GSInfo instance
         */
        public static create(properties?: Protos.IGSInfo): Protos.GSInfo;

        /**
         * Encodes the specified GSInfo message. Does not implicitly {@link Protos.GSInfo.verify|verify} messages.
         * @param message GSInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Protos.IGSInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GSInfo message, length delimited. Does not implicitly {@link Protos.GSInfo.verify|verify} messages.
         * @param message GSInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Protos.IGSInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GSInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GSInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.GSInfo;

        /**
         * Decodes a GSInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GSInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.GSInfo;

        /**
         * Verifies a GSInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GSInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GSInfo
         */
        public static fromObject(object: { [k: string]: any }): Protos.GSInfo;

        /**
         * Creates a plain object from a GSInfo message. Also converts values to other types if specified.
         * @param message GSInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Protos.GSInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GSInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace GSInfo {

        /** State enum. */
        enum State {
            Free = 0,
            Busy = 1,
            Full = 2,
            Close = 3
        }
    }

    /** Properties of a GS2CS_ReportState. */
    interface IGS2CS_ReportState {

        /** GS2CS_ReportState opts */
        opts?: (Protos.IMsgOpts|null);

        /** GS2CS_ReportState gsInfo */
        gsInfo?: (Protos.IGSInfo|null);
    }

    /** Represents a GS2CS_ReportState. */
    class GS2CS_ReportState implements IGS2CS_ReportState {

        /**
         * Constructs a new GS2CS_ReportState.
         * @param [properties] Properties to set
         */
        constructor(properties?: Protos.IGS2CS_ReportState);

        /** GS2CS_ReportState opts. */
        public opts?: (Protos.IMsgOpts|null);

        /** GS2CS_ReportState gsInfo. */
        public gsInfo?: (Protos.IGSInfo|null);

        /**
         * Creates a new GS2CS_ReportState instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GS2CS_ReportState instance
         */
        public static create(properties?: Protos.IGS2CS_ReportState): Protos.GS2CS_ReportState;

        /**
         * Encodes the specified GS2CS_ReportState message. Does not implicitly {@link Protos.GS2CS_ReportState.verify|verify} messages.
         * @param message GS2CS_ReportState message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Protos.IGS2CS_ReportState, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GS2CS_ReportState message, length delimited. Does not implicitly {@link Protos.GS2CS_ReportState.verify|verify} messages.
         * @param message GS2CS_ReportState message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Protos.IGS2CS_ReportState, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GS2CS_ReportState message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GS2CS_ReportState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.GS2CS_ReportState;

        /**
         * Decodes a GS2CS_ReportState message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GS2CS_ReportState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.GS2CS_ReportState;

        /**
         * Verifies a GS2CS_ReportState message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GS2CS_ReportState message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GS2CS_ReportState
         */
        public static fromObject(object: { [k: string]: any }): Protos.GS2CS_ReportState;

        /**
         * Creates a plain object from a GS2CS_ReportState message. Also converts values to other types if specified.
         * @param message GS2CS_ReportState
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Protos.GS2CS_ReportState, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GS2CS_ReportState to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GS2CS_GCAskLogin. */
    interface IGS2CS_GCAskLogin {

        /** GS2CS_GCAskLogin opts */
        opts?: (Protos.IMsgOpts|null);

        /** GS2CS_GCAskLogin sessionID */
        sessionID?: (Long|null);
    }

    /** Represents a GS2CS_GCAskLogin. */
    class GS2CS_GCAskLogin implements IGS2CS_GCAskLogin {

        /**
         * Constructs a new GS2CS_GCAskLogin.
         * @param [properties] Properties to set
         */
        constructor(properties?: Protos.IGS2CS_GCAskLogin);

        /** GS2CS_GCAskLogin opts. */
        public opts?: (Protos.IMsgOpts|null);

        /** GS2CS_GCAskLogin sessionID. */
        public sessionID: Long;

        /**
         * Creates a new GS2CS_GCAskLogin instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GS2CS_GCAskLogin instance
         */
        public static create(properties?: Protos.IGS2CS_GCAskLogin): Protos.GS2CS_GCAskLogin;

        /**
         * Encodes the specified GS2CS_GCAskLogin message. Does not implicitly {@link Protos.GS2CS_GCAskLogin.verify|verify} messages.
         * @param message GS2CS_GCAskLogin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Protos.IGS2CS_GCAskLogin, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GS2CS_GCAskLogin message, length delimited. Does not implicitly {@link Protos.GS2CS_GCAskLogin.verify|verify} messages.
         * @param message GS2CS_GCAskLogin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Protos.IGS2CS_GCAskLogin, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GS2CS_GCAskLogin message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GS2CS_GCAskLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.GS2CS_GCAskLogin;

        /**
         * Decodes a GS2CS_GCAskLogin message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GS2CS_GCAskLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.GS2CS_GCAskLogin;

        /**
         * Verifies a GS2CS_GCAskLogin message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GS2CS_GCAskLogin message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GS2CS_GCAskLogin
         */
        public static fromObject(object: { [k: string]: any }): Protos.GS2CS_GCAskLogin;

        /**
         * Creates a plain object from a GS2CS_GCAskLogin message. Also converts values to other types if specified.
         * @param message GS2CS_GCAskLogin
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Protos.GS2CS_GCAskLogin, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GS2CS_GCAskLogin to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GS2CS_GCLost. */
    interface IGS2CS_GCLost {

        /** GS2CS_GCLost opts */
        opts?: (Protos.IMsgOpts|null);

        /** GS2CS_GCLost sessionID */
        sessionID?: (Long|null);
    }

    /** Represents a GS2CS_GCLost. */
    class GS2CS_GCLost implements IGS2CS_GCLost {

        /**
         * Constructs a new GS2CS_GCLost.
         * @param [properties] Properties to set
         */
        constructor(properties?: Protos.IGS2CS_GCLost);

        /** GS2CS_GCLost opts. */
        public opts?: (Protos.IMsgOpts|null);

        /** GS2CS_GCLost sessionID. */
        public sessionID: Long;

        /**
         * Creates a new GS2CS_GCLost instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GS2CS_GCLost instance
         */
        public static create(properties?: Protos.IGS2CS_GCLost): Protos.GS2CS_GCLost;

        /**
         * Encodes the specified GS2CS_GCLost message. Does not implicitly {@link Protos.GS2CS_GCLost.verify|verify} messages.
         * @param message GS2CS_GCLost message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Protos.IGS2CS_GCLost, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GS2CS_GCLost message, length delimited. Does not implicitly {@link Protos.GS2CS_GCLost.verify|verify} messages.
         * @param message GS2CS_GCLost message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Protos.IGS2CS_GCLost, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GS2CS_GCLost message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GS2CS_GCLost
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.GS2CS_GCLost;

        /**
         * Decodes a GS2CS_GCLost message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GS2CS_GCLost
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.GS2CS_GCLost;

        /**
         * Verifies a GS2CS_GCLost message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GS2CS_GCLost message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GS2CS_GCLost
         */
        public static fromObject(object: { [k: string]: any }): Protos.GS2CS_GCLost;

        /**
         * Creates a plain object from a GS2CS_GCLost message. Also converts values to other types if specified.
         * @param message GS2CS_GCLost
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Protos.GS2CS_GCLost, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GS2CS_GCLost to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GS2CS_KickGCRet. */
    interface IGS2CS_KickGCRet {

        /** GS2CS_KickGCRet opts */
        opts?: (Protos.IMsgOpts|null);

        /** GS2CS_KickGCRet result */
        result?: (Protos.Global.ECommon|null);
    }

    /** Represents a GS2CS_KickGCRet. */
    class GS2CS_KickGCRet implements IGS2CS_KickGCRet {

        /**
         * Constructs a new GS2CS_KickGCRet.
         * @param [properties] Properties to set
         */
        constructor(properties?: Protos.IGS2CS_KickGCRet);

        /** GS2CS_KickGCRet opts. */
        public opts?: (Protos.IMsgOpts|null);

        /** GS2CS_KickGCRet result. */
        public result: Protos.Global.ECommon;

        /**
         * Creates a new GS2CS_KickGCRet instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GS2CS_KickGCRet instance
         */
        public static create(properties?: Protos.IGS2CS_KickGCRet): Protos.GS2CS_KickGCRet;

        /**
         * Encodes the specified GS2CS_KickGCRet message. Does not implicitly {@link Protos.GS2CS_KickGCRet.verify|verify} messages.
         * @param message GS2CS_KickGCRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Protos.IGS2CS_KickGCRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GS2CS_KickGCRet message, length delimited. Does not implicitly {@link Protos.GS2CS_KickGCRet.verify|verify} messages.
         * @param message GS2CS_KickGCRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Protos.IGS2CS_KickGCRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GS2CS_KickGCRet message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GS2CS_KickGCRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.GS2CS_KickGCRet;

        /**
         * Decodes a GS2CS_KickGCRet message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GS2CS_KickGCRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.GS2CS_KickGCRet;

        /**
         * Verifies a GS2CS_KickGCRet message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GS2CS_KickGCRet message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GS2CS_KickGCRet
         */
        public static fromObject(object: { [k: string]: any }): Protos.GS2CS_KickGCRet;

        /**
         * Creates a plain object from a GS2CS_KickGCRet message. Also converts values to other types if specified.
         * @param message GS2CS_KickGCRet
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Protos.GS2CS_KickGCRet, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GS2CS_KickGCRet to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** DB2LS_QueryResult enum. */
    enum DB2LS_QueryResult {
        Success = 0,
        Failed = 1,
        UsernameExist = 2,
        InvalidUname = 3,
        InvalidPwd = 4
    }

    /** Properties of a DB2LS_QueryAccountRet. */
    interface IDB2LS_QueryAccountRet {

        /** DB2LS_QueryAccountRet opts */
        opts?: (Protos.IMsgOpts|null);

        /** DB2LS_QueryAccountRet result */
        result?: (Protos.DB2LS_QueryResult|null);
    }

    /** Represents a DB2LS_QueryAccountRet. */
    class DB2LS_QueryAccountRet implements IDB2LS_QueryAccountRet {

        /**
         * Constructs a new DB2LS_QueryAccountRet.
         * @param [properties] Properties to set
         */
        constructor(properties?: Protos.IDB2LS_QueryAccountRet);

        /** DB2LS_QueryAccountRet opts. */
        public opts?: (Protos.IMsgOpts|null);

        /** DB2LS_QueryAccountRet result. */
        public result: Protos.DB2LS_QueryResult;

        /**
         * Creates a new DB2LS_QueryAccountRet instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DB2LS_QueryAccountRet instance
         */
        public static create(properties?: Protos.IDB2LS_QueryAccountRet): Protos.DB2LS_QueryAccountRet;

        /**
         * Encodes the specified DB2LS_QueryAccountRet message. Does not implicitly {@link Protos.DB2LS_QueryAccountRet.verify|verify} messages.
         * @param message DB2LS_QueryAccountRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Protos.IDB2LS_QueryAccountRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DB2LS_QueryAccountRet message, length delimited. Does not implicitly {@link Protos.DB2LS_QueryAccountRet.verify|verify} messages.
         * @param message DB2LS_QueryAccountRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Protos.IDB2LS_QueryAccountRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DB2LS_QueryAccountRet message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DB2LS_QueryAccountRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.DB2LS_QueryAccountRet;

        /**
         * Decodes a DB2LS_QueryAccountRet message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DB2LS_QueryAccountRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.DB2LS_QueryAccountRet;

        /**
         * Verifies a DB2LS_QueryAccountRet message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DB2LS_QueryAccountRet message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DB2LS_QueryAccountRet
         */
        public static fromObject(object: { [k: string]: any }): Protos.DB2LS_QueryAccountRet;

        /**
         * Creates a plain object from a DB2LS_QueryAccountRet message. Also converts values to other types if specified.
         * @param message DB2LS_QueryAccountRet
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Protos.DB2LS_QueryAccountRet, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DB2LS_QueryAccountRet to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a DB2LS_QueryLoginRet. */
    interface IDB2LS_QueryLoginRet {

        /** DB2LS_QueryLoginRet opts */
        opts?: (Protos.IMsgOpts|null);

        /** DB2LS_QueryLoginRet result */
        result?: (Protos.DB2LS_QueryResult|null);

        /** DB2LS_QueryLoginRet ukey */
        ukey?: (number|null);
    }

    /** Represents a DB2LS_QueryLoginRet. */
    class DB2LS_QueryLoginRet implements IDB2LS_QueryLoginRet {

        /**
         * Constructs a new DB2LS_QueryLoginRet.
         * @param [properties] Properties to set
         */
        constructor(properties?: Protos.IDB2LS_QueryLoginRet);

        /** DB2LS_QueryLoginRet opts. */
        public opts?: (Protos.IMsgOpts|null);

        /** DB2LS_QueryLoginRet result. */
        public result: Protos.DB2LS_QueryResult;

        /** DB2LS_QueryLoginRet ukey. */
        public ukey: number;

        /**
         * Creates a new DB2LS_QueryLoginRet instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DB2LS_QueryLoginRet instance
         */
        public static create(properties?: Protos.IDB2LS_QueryLoginRet): Protos.DB2LS_QueryLoginRet;

        /**
         * Encodes the specified DB2LS_QueryLoginRet message. Does not implicitly {@link Protos.DB2LS_QueryLoginRet.verify|verify} messages.
         * @param message DB2LS_QueryLoginRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Protos.IDB2LS_QueryLoginRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DB2LS_QueryLoginRet message, length delimited. Does not implicitly {@link Protos.DB2LS_QueryLoginRet.verify|verify} messages.
         * @param message DB2LS_QueryLoginRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Protos.IDB2LS_QueryLoginRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DB2LS_QueryLoginRet message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DB2LS_QueryLoginRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.DB2LS_QueryLoginRet;

        /**
         * Decodes a DB2LS_QueryLoginRet message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DB2LS_QueryLoginRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.DB2LS_QueryLoginRet;

        /**
         * Verifies a DB2LS_QueryLoginRet message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DB2LS_QueryLoginRet message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DB2LS_QueryLoginRet
         */
        public static fromObject(object: { [k: string]: any }): Protos.DB2LS_QueryLoginRet;

        /**
         * Creates a plain object from a DB2LS_QueryLoginRet message. Also converts values to other types if specified.
         * @param message DB2LS_QueryLoginRet
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Protos.DB2LS_QueryLoginRet, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DB2LS_QueryLoginRet to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a DB2LS_ExecRet. */
    interface IDB2LS_ExecRet {

        /** DB2LS_ExecRet opts */
        opts?: (Protos.IMsgOpts|null);

        /** DB2LS_ExecRet result */
        result?: (Protos.DB2LS_QueryResult|null);

        /** DB2LS_ExecRet row */
        row?: (number|null);

        /** DB2LS_ExecRet id */
        id?: (Long|null);
    }

    /** Represents a DB2LS_ExecRet. */
    class DB2LS_ExecRet implements IDB2LS_ExecRet {

        /**
         * Constructs a new DB2LS_ExecRet.
         * @param [properties] Properties to set
         */
        constructor(properties?: Protos.IDB2LS_ExecRet);

        /** DB2LS_ExecRet opts. */
        public opts?: (Protos.IMsgOpts|null);

        /** DB2LS_ExecRet result. */
        public result: Protos.DB2LS_QueryResult;

        /** DB2LS_ExecRet row. */
        public row: number;

        /** DB2LS_ExecRet id. */
        public id: Long;

        /**
         * Creates a new DB2LS_ExecRet instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DB2LS_ExecRet instance
         */
        public static create(properties?: Protos.IDB2LS_ExecRet): Protos.DB2LS_ExecRet;

        /**
         * Encodes the specified DB2LS_ExecRet message. Does not implicitly {@link Protos.DB2LS_ExecRet.verify|verify} messages.
         * @param message DB2LS_ExecRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Protos.IDB2LS_ExecRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DB2LS_ExecRet message, length delimited. Does not implicitly {@link Protos.DB2LS_ExecRet.verify|verify} messages.
         * @param message DB2LS_ExecRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Protos.IDB2LS_ExecRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DB2LS_ExecRet message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DB2LS_ExecRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.DB2LS_ExecRet;

        /**
         * Decodes a DB2LS_ExecRet message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DB2LS_ExecRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.DB2LS_ExecRet;

        /**
         * Verifies a DB2LS_ExecRet message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DB2LS_ExecRet message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DB2LS_ExecRet
         */
        public static fromObject(object: { [k: string]: any }): Protos.DB2LS_ExecRet;

        /**
         * Creates a plain object from a DB2LS_ExecRet message. Also converts values to other types if specified.
         * @param message DB2LS_ExecRet
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Protos.DB2LS_ExecRet, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DB2LS_ExecRet to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GC2BS_AskLogin. */
    interface IGC2BS_AskLogin {

        /** GC2BS_AskLogin opts */
        opts?: (Protos.IMsgOpts|null);

        /** GC2BS_AskLogin sessionID */
        sessionID?: (Long|null);
    }

    /** Represents a GC2BS_AskLogin. */
    class GC2BS_AskLogin implements IGC2BS_AskLogin {

        /**
         * Constructs a new GC2BS_AskLogin.
         * @param [properties] Properties to set
         */
        constructor(properties?: Protos.IGC2BS_AskLogin);

        /** GC2BS_AskLogin opts. */
        public opts?: (Protos.IMsgOpts|null);

        /** GC2BS_AskLogin sessionID. */
        public sessionID: Long;

        /**
         * Creates a new GC2BS_AskLogin instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GC2BS_AskLogin instance
         */
        public static create(properties?: Protos.IGC2BS_AskLogin): Protos.GC2BS_AskLogin;

        /**
         * Encodes the specified GC2BS_AskLogin message. Does not implicitly {@link Protos.GC2BS_AskLogin.verify|verify} messages.
         * @param message GC2BS_AskLogin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Protos.IGC2BS_AskLogin, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GC2BS_AskLogin message, length delimited. Does not implicitly {@link Protos.GC2BS_AskLogin.verify|verify} messages.
         * @param message GC2BS_AskLogin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Protos.IGC2BS_AskLogin, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GC2BS_AskLogin message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GC2BS_AskLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.GC2BS_AskLogin;

        /**
         * Decodes a GC2BS_AskLogin message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GC2BS_AskLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.GC2BS_AskLogin;

        /**
         * Verifies a GC2BS_AskLogin message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GC2BS_AskLogin message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GC2BS_AskLogin
         */
        public static fromObject(object: { [k: string]: any }): Protos.GC2BS_AskLogin;

        /**
         * Creates a plain object from a GC2BS_AskLogin message. Also converts values to other types if specified.
         * @param message GC2BS_AskLogin
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Protos.GC2BS_AskLogin, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GC2BS_AskLogin to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GC2BS_KeepAlive. */
    interface IGC2BS_KeepAlive {

        /** GC2BS_KeepAlive opts */
        opts?: (Protos.IMsgOpts|null);
    }

    /** Represents a GC2BS_KeepAlive. */
    class GC2BS_KeepAlive implements IGC2BS_KeepAlive {

        /**
         * Constructs a new GC2BS_KeepAlive.
         * @param [properties] Properties to set
         */
        constructor(properties?: Protos.IGC2BS_KeepAlive);

        /** GC2BS_KeepAlive opts. */
        public opts?: (Protos.IMsgOpts|null);

        /**
         * Creates a new GC2BS_KeepAlive instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GC2BS_KeepAlive instance
         */
        public static create(properties?: Protos.IGC2BS_KeepAlive): Protos.GC2BS_KeepAlive;

        /**
         * Encodes the specified GC2BS_KeepAlive message. Does not implicitly {@link Protos.GC2BS_KeepAlive.verify|verify} messages.
         * @param message GC2BS_KeepAlive message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Protos.IGC2BS_KeepAlive, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GC2BS_KeepAlive message, length delimited. Does not implicitly {@link Protos.GC2BS_KeepAlive.verify|verify} messages.
         * @param message GC2BS_KeepAlive message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Protos.IGC2BS_KeepAlive, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GC2BS_KeepAlive message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GC2BS_KeepAlive
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.GC2BS_KeepAlive;

        /**
         * Decodes a GC2BS_KeepAlive message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GC2BS_KeepAlive
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.GC2BS_KeepAlive;

        /**
         * Verifies a GC2BS_KeepAlive message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GC2BS_KeepAlive message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GC2BS_KeepAlive
         */
        public static fromObject(object: { [k: string]: any }): Protos.GC2BS_KeepAlive;

        /**
         * Creates a plain object from a GC2BS_KeepAlive message. Also converts values to other types if specified.
         * @param message GC2BS_KeepAlive
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Protos.GC2BS_KeepAlive, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GC2BS_KeepAlive to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GC2CS_BeginMatch. */
    interface IGC2CS_BeginMatch {

        /** GC2CS_BeginMatch opts */
        opts?: (Protos.IMsgOpts|null);

        /** GC2CS_BeginMatch actorID */
        actorID?: (number|null);
    }

    /** Represents a GC2CS_BeginMatch. */
    class GC2CS_BeginMatch implements IGC2CS_BeginMatch {

        /**
         * Constructs a new GC2CS_BeginMatch.
         * @param [properties] Properties to set
         */
        constructor(properties?: Protos.IGC2CS_BeginMatch);

        /** GC2CS_BeginMatch opts. */
        public opts?: (Protos.IMsgOpts|null);

        /** GC2CS_BeginMatch actorID. */
        public actorID: number;

        /**
         * Creates a new GC2CS_BeginMatch instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GC2CS_BeginMatch instance
         */
        public static create(properties?: Protos.IGC2CS_BeginMatch): Protos.GC2CS_BeginMatch;

        /**
         * Encodes the specified GC2CS_BeginMatch message. Does not implicitly {@link Protos.GC2CS_BeginMatch.verify|verify} messages.
         * @param message GC2CS_BeginMatch message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Protos.IGC2CS_BeginMatch, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GC2CS_BeginMatch message, length delimited. Does not implicitly {@link Protos.GC2CS_BeginMatch.verify|verify} messages.
         * @param message GC2CS_BeginMatch message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Protos.IGC2CS_BeginMatch, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GC2CS_BeginMatch message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GC2CS_BeginMatch
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.GC2CS_BeginMatch;

        /**
         * Decodes a GC2CS_BeginMatch message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GC2CS_BeginMatch
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.GC2CS_BeginMatch;

        /**
         * Verifies a GC2CS_BeginMatch message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GC2CS_BeginMatch message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GC2CS_BeginMatch
         */
        public static fromObject(object: { [k: string]: any }): Protos.GC2CS_BeginMatch;

        /**
         * Creates a plain object from a GC2CS_BeginMatch message. Also converts values to other types if specified.
         * @param message GC2CS_BeginMatch
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Protos.GC2CS_BeginMatch, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GC2CS_BeginMatch to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GC2CS_UpdatePlayerInfo. */
    interface IGC2CS_UpdatePlayerInfo {

        /** GC2CS_UpdatePlayerInfo opts */
        opts?: (Protos.IMsgOpts|null);

        /** GC2CS_UpdatePlayerInfo progress */
        progress?: (number|null);
    }

    /** Represents a GC2CS_UpdatePlayerInfo. */
    class GC2CS_UpdatePlayerInfo implements IGC2CS_UpdatePlayerInfo {

        /**
         * Constructs a new GC2CS_UpdatePlayerInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: Protos.IGC2CS_UpdatePlayerInfo);

        /** GC2CS_UpdatePlayerInfo opts. */
        public opts?: (Protos.IMsgOpts|null);

        /** GC2CS_UpdatePlayerInfo progress. */
        public progress: number;

        /**
         * Creates a new GC2CS_UpdatePlayerInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GC2CS_UpdatePlayerInfo instance
         */
        public static create(properties?: Protos.IGC2CS_UpdatePlayerInfo): Protos.GC2CS_UpdatePlayerInfo;

        /**
         * Encodes the specified GC2CS_UpdatePlayerInfo message. Does not implicitly {@link Protos.GC2CS_UpdatePlayerInfo.verify|verify} messages.
         * @param message GC2CS_UpdatePlayerInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Protos.IGC2CS_UpdatePlayerInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GC2CS_UpdatePlayerInfo message, length delimited. Does not implicitly {@link Protos.GC2CS_UpdatePlayerInfo.verify|verify} messages.
         * @param message GC2CS_UpdatePlayerInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Protos.IGC2CS_UpdatePlayerInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GC2CS_UpdatePlayerInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GC2CS_UpdatePlayerInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.GC2CS_UpdatePlayerInfo;

        /**
         * Decodes a GC2CS_UpdatePlayerInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GC2CS_UpdatePlayerInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.GC2CS_UpdatePlayerInfo;

        /**
         * Verifies a GC2CS_UpdatePlayerInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GC2CS_UpdatePlayerInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GC2CS_UpdatePlayerInfo
         */
        public static fromObject(object: { [k: string]: any }): Protos.GC2CS_UpdatePlayerInfo;

        /**
         * Creates a plain object from a GC2CS_UpdatePlayerInfo message. Also converts values to other types if specified.
         * @param message GC2CS_UpdatePlayerInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Protos.GC2CS_UpdatePlayerInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GC2CS_UpdatePlayerInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GC2GS_AskLogin. */
    interface IGC2GS_AskLogin {

        /** GC2GS_AskLogin opts */
        opts?: (Protos.IMsgOpts|null);

        /** GC2GS_AskLogin pwd */
        pwd?: (string|null);

        /** GC2GS_AskLogin sessionID */
        sessionID?: (Long|null);
    }

    /** Represents a GC2GS_AskLogin. */
    class GC2GS_AskLogin implements IGC2GS_AskLogin {

        /**
         * Constructs a new GC2GS_AskLogin.
         * @param [properties] Properties to set
         */
        constructor(properties?: Protos.IGC2GS_AskLogin);

        /** GC2GS_AskLogin opts. */
        public opts?: (Protos.IMsgOpts|null);

        /** GC2GS_AskLogin pwd. */
        public pwd: string;

        /** GC2GS_AskLogin sessionID. */
        public sessionID: Long;

        /**
         * Creates a new GC2GS_AskLogin instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GC2GS_AskLogin instance
         */
        public static create(properties?: Protos.IGC2GS_AskLogin): Protos.GC2GS_AskLogin;

        /**
         * Encodes the specified GC2GS_AskLogin message. Does not implicitly {@link Protos.GC2GS_AskLogin.verify|verify} messages.
         * @param message GC2GS_AskLogin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Protos.IGC2GS_AskLogin, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GC2GS_AskLogin message, length delimited. Does not implicitly {@link Protos.GC2GS_AskLogin.verify|verify} messages.
         * @param message GC2GS_AskLogin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Protos.IGC2GS_AskLogin, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GC2GS_AskLogin message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GC2GS_AskLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.GC2GS_AskLogin;

        /**
         * Decodes a GC2GS_AskLogin message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GC2GS_AskLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.GC2GS_AskLogin;

        /**
         * Verifies a GC2GS_AskLogin message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GC2GS_AskLogin message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GC2GS_AskLogin
         */
        public static fromObject(object: { [k: string]: any }): Protos.GC2GS_AskLogin;

        /**
         * Creates a plain object from a GC2GS_AskLogin message. Also converts values to other types if specified.
         * @param message GC2GS_AskLogin
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Protos.GC2GS_AskLogin, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GC2GS_AskLogin to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GC2GS_KeepAlive. */
    interface IGC2GS_KeepAlive {

        /** GC2GS_KeepAlive opts */
        opts?: (Protos.IMsgOpts|null);
    }

    /** Represents a GC2GS_KeepAlive. */
    class GC2GS_KeepAlive implements IGC2GS_KeepAlive {

        /**
         * Constructs a new GC2GS_KeepAlive.
         * @param [properties] Properties to set
         */
        constructor(properties?: Protos.IGC2GS_KeepAlive);

        /** GC2GS_KeepAlive opts. */
        public opts?: (Protos.IMsgOpts|null);

        /**
         * Creates a new GC2GS_KeepAlive instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GC2GS_KeepAlive instance
         */
        public static create(properties?: Protos.IGC2GS_KeepAlive): Protos.GC2GS_KeepAlive;

        /**
         * Encodes the specified GC2GS_KeepAlive message. Does not implicitly {@link Protos.GC2GS_KeepAlive.verify|verify} messages.
         * @param message GC2GS_KeepAlive message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Protos.IGC2GS_KeepAlive, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GC2GS_KeepAlive message, length delimited. Does not implicitly {@link Protos.GC2GS_KeepAlive.verify|verify} messages.
         * @param message GC2GS_KeepAlive message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Protos.IGC2GS_KeepAlive, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GC2GS_KeepAlive message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GC2GS_KeepAlive
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.GC2GS_KeepAlive;

        /**
         * Decodes a GC2GS_KeepAlive message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GC2GS_KeepAlive
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.GC2GS_KeepAlive;

        /**
         * Verifies a GC2GS_KeepAlive message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GC2GS_KeepAlive message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GC2GS_KeepAlive
         */
        public static fromObject(object: { [k: string]: any }): Protos.GC2GS_KeepAlive;

        /**
         * Creates a plain object from a GC2GS_KeepAlive message. Also converts values to other types if specified.
         * @param message GC2GS_KeepAlive
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Protos.GC2GS_KeepAlive, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GC2GS_KeepAlive to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GC2LS_AskRegister. */
    interface IGC2LS_AskRegister {

        /** GC2LS_AskRegister opts */
        opts?: (Protos.IMsgOpts|null);

        /** GC2LS_AskRegister sdk */
        sdk?: (number|null);

        /** GC2LS_AskRegister name */
        name?: (string|null);

        /** GC2LS_AskRegister passwd */
        passwd?: (string|null);

        /** GC2LS_AskRegister platform */
        platform?: (number|null);
    }

    /** Represents a GC2LS_AskRegister. */
    class GC2LS_AskRegister implements IGC2LS_AskRegister {

        /**
         * Constructs a new GC2LS_AskRegister.
         * @param [properties] Properties to set
         */
        constructor(properties?: Protos.IGC2LS_AskRegister);

        /** GC2LS_AskRegister opts. */
        public opts?: (Protos.IMsgOpts|null);

        /** GC2LS_AskRegister sdk. */
        public sdk: number;

        /** GC2LS_AskRegister name. */
        public name: string;

        /** GC2LS_AskRegister passwd. */
        public passwd: string;

        /** GC2LS_AskRegister platform. */
        public platform: number;

        /**
         * Creates a new GC2LS_AskRegister instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GC2LS_AskRegister instance
         */
        public static create(properties?: Protos.IGC2LS_AskRegister): Protos.GC2LS_AskRegister;

        /**
         * Encodes the specified GC2LS_AskRegister message. Does not implicitly {@link Protos.GC2LS_AskRegister.verify|verify} messages.
         * @param message GC2LS_AskRegister message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Protos.IGC2LS_AskRegister, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GC2LS_AskRegister message, length delimited. Does not implicitly {@link Protos.GC2LS_AskRegister.verify|verify} messages.
         * @param message GC2LS_AskRegister message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Protos.IGC2LS_AskRegister, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GC2LS_AskRegister message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GC2LS_AskRegister
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.GC2LS_AskRegister;

        /**
         * Decodes a GC2LS_AskRegister message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GC2LS_AskRegister
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.GC2LS_AskRegister;

        /**
         * Verifies a GC2LS_AskRegister message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GC2LS_AskRegister message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GC2LS_AskRegister
         */
        public static fromObject(object: { [k: string]: any }): Protos.GC2LS_AskRegister;

        /**
         * Creates a plain object from a GC2LS_AskRegister message. Also converts values to other types if specified.
         * @param message GC2LS_AskRegister
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Protos.GC2LS_AskRegister, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GC2LS_AskRegister to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GC2LS_AskLogin. */
    interface IGC2LS_AskLogin {

        /** GC2LS_AskLogin opts */
        opts?: (Protos.IMsgOpts|null);

        /** GC2LS_AskLogin name */
        name?: (string|null);

        /** GC2LS_AskLogin passwd */
        passwd?: (string|null);
    }

    /** Represents a GC2LS_AskLogin. */
    class GC2LS_AskLogin implements IGC2LS_AskLogin {

        /**
         * Constructs a new GC2LS_AskLogin.
         * @param [properties] Properties to set
         */
        constructor(properties?: Protos.IGC2LS_AskLogin);

        /** GC2LS_AskLogin opts. */
        public opts?: (Protos.IMsgOpts|null);

        /** GC2LS_AskLogin name. */
        public name: string;

        /** GC2LS_AskLogin passwd. */
        public passwd: string;

        /**
         * Creates a new GC2LS_AskLogin instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GC2LS_AskLogin instance
         */
        public static create(properties?: Protos.IGC2LS_AskLogin): Protos.GC2LS_AskLogin;

        /**
         * Encodes the specified GC2LS_AskLogin message. Does not implicitly {@link Protos.GC2LS_AskLogin.verify|verify} messages.
         * @param message GC2LS_AskLogin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Protos.IGC2LS_AskLogin, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GC2LS_AskLogin message, length delimited. Does not implicitly {@link Protos.GC2LS_AskLogin.verify|verify} messages.
         * @param message GC2LS_AskLogin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Protos.IGC2LS_AskLogin, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GC2LS_AskLogin message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GC2LS_AskLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.GC2LS_AskLogin;

        /**
         * Decodes a GC2LS_AskLogin message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GC2LS_AskLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.GC2LS_AskLogin;

        /**
         * Verifies a GC2LS_AskLogin message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GC2LS_AskLogin message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GC2LS_AskLogin
         */
        public static fromObject(object: { [k: string]: any }): Protos.GC2LS_AskLogin;

        /**
         * Creates a plain object from a GC2LS_AskLogin message. Also converts values to other types if specified.
         * @param message GC2LS_AskLogin
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Protos.GC2LS_AskLogin, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GC2LS_AskLogin to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GC2LS_AskSmartLogin. */
    interface IGC2LS_AskSmartLogin {

        /** GC2LS_AskSmartLogin opts */
        opts?: (Protos.IMsgOpts|null);

        /** GC2LS_AskSmartLogin sdk */
        sdk?: (number|null);

        /** GC2LS_AskSmartLogin name */
        name?: (string|null);

        /** GC2LS_AskSmartLogin platform */
        platform?: (number|null);
    }

    /** Represents a GC2LS_AskSmartLogin. */
    class GC2LS_AskSmartLogin implements IGC2LS_AskSmartLogin {

        /**
         * Constructs a new GC2LS_AskSmartLogin.
         * @param [properties] Properties to set
         */
        constructor(properties?: Protos.IGC2LS_AskSmartLogin);

        /** GC2LS_AskSmartLogin opts. */
        public opts?: (Protos.IMsgOpts|null);

        /** GC2LS_AskSmartLogin sdk. */
        public sdk: number;

        /** GC2LS_AskSmartLogin name. */
        public name: string;

        /** GC2LS_AskSmartLogin platform. */
        public platform: number;

        /**
         * Creates a new GC2LS_AskSmartLogin instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GC2LS_AskSmartLogin instance
         */
        public static create(properties?: Protos.IGC2LS_AskSmartLogin): Protos.GC2LS_AskSmartLogin;

        /**
         * Encodes the specified GC2LS_AskSmartLogin message. Does not implicitly {@link Protos.GC2LS_AskSmartLogin.verify|verify} messages.
         * @param message GC2LS_AskSmartLogin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Protos.IGC2LS_AskSmartLogin, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GC2LS_AskSmartLogin message, length delimited. Does not implicitly {@link Protos.GC2LS_AskSmartLogin.verify|verify} messages.
         * @param message GC2LS_AskSmartLogin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Protos.IGC2LS_AskSmartLogin, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GC2LS_AskSmartLogin message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GC2LS_AskSmartLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.GC2LS_AskSmartLogin;

        /**
         * Decodes a GC2LS_AskSmartLogin message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GC2LS_AskSmartLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.GC2LS_AskSmartLogin;

        /**
         * Verifies a GC2LS_AskSmartLogin message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GC2LS_AskSmartLogin message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GC2LS_AskSmartLogin
         */
        public static fromObject(object: { [k: string]: any }): Protos.GC2LS_AskSmartLogin;

        /**
         * Creates a plain object from a GC2LS_AskSmartLogin message. Also converts values to other types if specified.
         * @param message GC2LS_AskSmartLogin
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Protos.GC2LS_AskSmartLogin, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GC2LS_AskSmartLogin to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GS2GC_LoginRet. */
    interface IGS2GC_LoginRet {

        /** GS2GC_LoginRet opts */
        opts?: (Protos.IMsgOpts|null);

        /** GS2GC_LoginRet result */
        result?: (Protos.GS2GC_LoginRet.EResult|null);

        /** GS2GC_LoginRet gcState */
        gcState?: (Protos.GS2GC_LoginRet.EGCCState|null);

        /** GS2GC_LoginRet gcNID */
        gcNID?: (Long|null);

        /** GS2GC_LoginRet bsIP */
        bsIP?: (string|null);

        /** GS2GC_LoginRet bsPort */
        bsPort?: (number|null);
    }

    /** Represents a GS2GC_LoginRet. */
    class GS2GC_LoginRet implements IGS2GC_LoginRet {

        /**
         * Constructs a new GS2GC_LoginRet.
         * @param [properties] Properties to set
         */
        constructor(properties?: Protos.IGS2GC_LoginRet);

        /** GS2GC_LoginRet opts. */
        public opts?: (Protos.IMsgOpts|null);

        /** GS2GC_LoginRet result. */
        public result: Protos.GS2GC_LoginRet.EResult;

        /** GS2GC_LoginRet gcState. */
        public gcState: Protos.GS2GC_LoginRet.EGCCState;

        /** GS2GC_LoginRet gcNID. */
        public gcNID: Long;

        /** GS2GC_LoginRet bsIP. */
        public bsIP: string;

        /** GS2GC_LoginRet bsPort. */
        public bsPort: number;

        /**
         * Creates a new GS2GC_LoginRet instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GS2GC_LoginRet instance
         */
        public static create(properties?: Protos.IGS2GC_LoginRet): Protos.GS2GC_LoginRet;

        /**
         * Encodes the specified GS2GC_LoginRet message. Does not implicitly {@link Protos.GS2GC_LoginRet.verify|verify} messages.
         * @param message GS2GC_LoginRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Protos.IGS2GC_LoginRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GS2GC_LoginRet message, length delimited. Does not implicitly {@link Protos.GS2GC_LoginRet.verify|verify} messages.
         * @param message GS2GC_LoginRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Protos.IGS2GC_LoginRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GS2GC_LoginRet message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GS2GC_LoginRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.GS2GC_LoginRet;

        /**
         * Decodes a GS2GC_LoginRet message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GS2GC_LoginRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.GS2GC_LoginRet;

        /**
         * Verifies a GS2GC_LoginRet message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GS2GC_LoginRet message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GS2GC_LoginRet
         */
        public static fromObject(object: { [k: string]: any }): Protos.GS2GC_LoginRet;

        /**
         * Creates a plain object from a GS2GC_LoginRet message. Also converts values to other types if specified.
         * @param message GS2GC_LoginRet
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Protos.GS2GC_LoginRet, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GS2GC_LoginRet to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace GS2GC_LoginRet {

        /** EResult enum. */
        enum EResult {
            Success = 0,
            SessionExpire = 1
        }

        /** EGCCState enum. */
        enum EGCCState {
            Idle = 0,
            Battle = 1
        }
    }

    /** Properties of a GS2GC_Kick. */
    interface IGS2GC_Kick {

        /** GS2GC_Kick opts */
        opts?: (Protos.IMsgOpts|null);

        /** GS2GC_Kick reason */
        reason?: (Protos.CS2GS_KickGC.EReason|null);
    }

    /** Represents a GS2GC_Kick. */
    class GS2GC_Kick implements IGS2GC_Kick {

        /**
         * Constructs a new GS2GC_Kick.
         * @param [properties] Properties to set
         */
        constructor(properties?: Protos.IGS2GC_Kick);

        /** GS2GC_Kick opts. */
        public opts?: (Protos.IMsgOpts|null);

        /** GS2GC_Kick reason. */
        public reason: Protos.CS2GS_KickGC.EReason;

        /**
         * Creates a new GS2GC_Kick instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GS2GC_Kick instance
         */
        public static create(properties?: Protos.IGS2GC_Kick): Protos.GS2GC_Kick;

        /**
         * Encodes the specified GS2GC_Kick message. Does not implicitly {@link Protos.GS2GC_Kick.verify|verify} messages.
         * @param message GS2GC_Kick message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Protos.IGS2GC_Kick, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GS2GC_Kick message, length delimited. Does not implicitly {@link Protos.GS2GC_Kick.verify|verify} messages.
         * @param message GS2GC_Kick message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Protos.IGS2GC_Kick, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GS2GC_Kick message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GS2GC_Kick
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.GS2GC_Kick;

        /**
         * Decodes a GS2GC_Kick message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GS2GC_Kick
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.GS2GC_Kick;

        /**
         * Verifies a GS2GC_Kick message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GS2GC_Kick message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GS2GC_Kick
         */
        public static fromObject(object: { [k: string]: any }): Protos.GS2GC_Kick;

        /**
         * Creates a plain object from a GS2GC_Kick message. Also converts values to other types if specified.
         * @param message GS2GC_Kick
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Protos.GS2GC_Kick, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GS2GC_Kick to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a LS2CS_GCLogin. */
    interface ILS2CS_GCLogin {

        /** LS2CS_GCLogin opts */
        opts?: (Protos.IMsgOpts|null);

        /** LS2CS_GCLogin sessionID */
        sessionID?: (Long|null);

        /** LS2CS_GCLogin ukey */
        ukey?: (number|null);
    }

    /** Represents a LS2CS_GCLogin. */
    class LS2CS_GCLogin implements ILS2CS_GCLogin {

        /**
         * Constructs a new LS2CS_GCLogin.
         * @param [properties] Properties to set
         */
        constructor(properties?: Protos.ILS2CS_GCLogin);

        /** LS2CS_GCLogin opts. */
        public opts?: (Protos.IMsgOpts|null);

        /** LS2CS_GCLogin sessionID. */
        public sessionID: Long;

        /** LS2CS_GCLogin ukey. */
        public ukey: number;

        /**
         * Creates a new LS2CS_GCLogin instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LS2CS_GCLogin instance
         */
        public static create(properties?: Protos.ILS2CS_GCLogin): Protos.LS2CS_GCLogin;

        /**
         * Encodes the specified LS2CS_GCLogin message. Does not implicitly {@link Protos.LS2CS_GCLogin.verify|verify} messages.
         * @param message LS2CS_GCLogin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Protos.ILS2CS_GCLogin, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LS2CS_GCLogin message, length delimited. Does not implicitly {@link Protos.LS2CS_GCLogin.verify|verify} messages.
         * @param message LS2CS_GCLogin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Protos.ILS2CS_GCLogin, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LS2CS_GCLogin message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LS2CS_GCLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.LS2CS_GCLogin;

        /**
         * Decodes a LS2CS_GCLogin message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LS2CS_GCLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.LS2CS_GCLogin;

        /**
         * Verifies a LS2CS_GCLogin message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LS2CS_GCLogin message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LS2CS_GCLogin
         */
        public static fromObject(object: { [k: string]: any }): Protos.LS2CS_GCLogin;

        /**
         * Creates a plain object from a LS2CS_GCLogin message. Also converts values to other types if specified.
         * @param message LS2CS_GCLogin
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Protos.LS2CS_GCLogin, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LS2CS_GCLogin to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a LS2DB_QueryAccount. */
    interface ILS2DB_QueryAccount {

        /** LS2DB_QueryAccount opts */
        opts?: (Protos.IMsgOpts|null);

        /** LS2DB_QueryAccount name */
        name?: (string|null);
    }

    /** Represents a LS2DB_QueryAccount. */
    class LS2DB_QueryAccount implements ILS2DB_QueryAccount {

        /**
         * Constructs a new LS2DB_QueryAccount.
         * @param [properties] Properties to set
         */
        constructor(properties?: Protos.ILS2DB_QueryAccount);

        /** LS2DB_QueryAccount opts. */
        public opts?: (Protos.IMsgOpts|null);

        /** LS2DB_QueryAccount name. */
        public name: string;

        /**
         * Creates a new LS2DB_QueryAccount instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LS2DB_QueryAccount instance
         */
        public static create(properties?: Protos.ILS2DB_QueryAccount): Protos.LS2DB_QueryAccount;

        /**
         * Encodes the specified LS2DB_QueryAccount message. Does not implicitly {@link Protos.LS2DB_QueryAccount.verify|verify} messages.
         * @param message LS2DB_QueryAccount message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Protos.ILS2DB_QueryAccount, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LS2DB_QueryAccount message, length delimited. Does not implicitly {@link Protos.LS2DB_QueryAccount.verify|verify} messages.
         * @param message LS2DB_QueryAccount message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Protos.ILS2DB_QueryAccount, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LS2DB_QueryAccount message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LS2DB_QueryAccount
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.LS2DB_QueryAccount;

        /**
         * Decodes a LS2DB_QueryAccount message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LS2DB_QueryAccount
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.LS2DB_QueryAccount;

        /**
         * Verifies a LS2DB_QueryAccount message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LS2DB_QueryAccount message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LS2DB_QueryAccount
         */
        public static fromObject(object: { [k: string]: any }): Protos.LS2DB_QueryAccount;

        /**
         * Creates a plain object from a LS2DB_QueryAccount message. Also converts values to other types if specified.
         * @param message LS2DB_QueryAccount
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Protos.LS2DB_QueryAccount, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LS2DB_QueryAccount to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a LS2DB_QueryLogin. */
    interface ILS2DB_QueryLogin {

        /** LS2DB_QueryLogin opts */
        opts?: (Protos.IMsgOpts|null);

        /** LS2DB_QueryLogin name */
        name?: (string|null);

        /** LS2DB_QueryLogin pwd */
        pwd?: (string|null);

        /** LS2DB_QueryLogin vertPwd */
        vertPwd?: (boolean|null);

        /** LS2DB_QueryLogin ip */
        ip?: (string|null);

        /** LS2DB_QueryLogin time */
        time?: (Long|null);
    }

    /** Represents a LS2DB_QueryLogin. */
    class LS2DB_QueryLogin implements ILS2DB_QueryLogin {

        /**
         * Constructs a new LS2DB_QueryLogin.
         * @param [properties] Properties to set
         */
        constructor(properties?: Protos.ILS2DB_QueryLogin);

        /** LS2DB_QueryLogin opts. */
        public opts?: (Protos.IMsgOpts|null);

        /** LS2DB_QueryLogin name. */
        public name: string;

        /** LS2DB_QueryLogin pwd. */
        public pwd: string;

        /** LS2DB_QueryLogin vertPwd. */
        public vertPwd: boolean;

        /** LS2DB_QueryLogin ip. */
        public ip: string;

        /** LS2DB_QueryLogin time. */
        public time: Long;

        /**
         * Creates a new LS2DB_QueryLogin instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LS2DB_QueryLogin instance
         */
        public static create(properties?: Protos.ILS2DB_QueryLogin): Protos.LS2DB_QueryLogin;

        /**
         * Encodes the specified LS2DB_QueryLogin message. Does not implicitly {@link Protos.LS2DB_QueryLogin.verify|verify} messages.
         * @param message LS2DB_QueryLogin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Protos.ILS2DB_QueryLogin, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LS2DB_QueryLogin message, length delimited. Does not implicitly {@link Protos.LS2DB_QueryLogin.verify|verify} messages.
         * @param message LS2DB_QueryLogin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Protos.ILS2DB_QueryLogin, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LS2DB_QueryLogin message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LS2DB_QueryLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.LS2DB_QueryLogin;

        /**
         * Decodes a LS2DB_QueryLogin message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LS2DB_QueryLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.LS2DB_QueryLogin;

        /**
         * Verifies a LS2DB_QueryLogin message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LS2DB_QueryLogin message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LS2DB_QueryLogin
         */
        public static fromObject(object: { [k: string]: any }): Protos.LS2DB_QueryLogin;

        /**
         * Creates a plain object from a LS2DB_QueryLogin message. Also converts values to other types if specified.
         * @param message LS2DB_QueryLogin
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Protos.LS2DB_QueryLogin, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LS2DB_QueryLogin to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a LS2DB_Exec. */
    interface ILS2DB_Exec {

        /** LS2DB_Exec opts */
        opts?: (Protos.IMsgOpts|null);

        /** LS2DB_Exec cmd */
        cmd?: (string|null);
    }

    /** Represents a LS2DB_Exec. */
    class LS2DB_Exec implements ILS2DB_Exec {

        /**
         * Constructs a new LS2DB_Exec.
         * @param [properties] Properties to set
         */
        constructor(properties?: Protos.ILS2DB_Exec);

        /** LS2DB_Exec opts. */
        public opts?: (Protos.IMsgOpts|null);

        /** LS2DB_Exec cmd. */
        public cmd: string;

        /**
         * Creates a new LS2DB_Exec instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LS2DB_Exec instance
         */
        public static create(properties?: Protos.ILS2DB_Exec): Protos.LS2DB_Exec;

        /**
         * Encodes the specified LS2DB_Exec message. Does not implicitly {@link Protos.LS2DB_Exec.verify|verify} messages.
         * @param message LS2DB_Exec message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Protos.ILS2DB_Exec, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LS2DB_Exec message, length delimited. Does not implicitly {@link Protos.LS2DB_Exec.verify|verify} messages.
         * @param message LS2DB_Exec message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Protos.ILS2DB_Exec, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LS2DB_Exec message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LS2DB_Exec
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.LS2DB_Exec;

        /**
         * Decodes a LS2DB_Exec message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LS2DB_Exec
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.LS2DB_Exec;

        /**
         * Verifies a LS2DB_Exec message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LS2DB_Exec message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LS2DB_Exec
         */
        public static fromObject(object: { [k: string]: any }): Protos.LS2DB_Exec;

        /**
         * Creates a plain object from a LS2DB_Exec message. Also converts values to other types if specified.
         * @param message LS2DB_Exec
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Protos.LS2DB_Exec, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LS2DB_Exec to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a LS2GC_GSInfo. */
    interface ILS2GC_GSInfo {

        /** LS2GC_GSInfo opts */
        opts?: (Protos.IMsgOpts|null);

        /** LS2GC_GSInfo gsInfos */
        gsInfos?: (Protos.IGSInfo[]|null);
    }

    /** Represents a LS2GC_GSInfo. */
    class LS2GC_GSInfo implements ILS2GC_GSInfo {

        /**
         * Constructs a new LS2GC_GSInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: Protos.ILS2GC_GSInfo);

        /** LS2GC_GSInfo opts. */
        public opts?: (Protos.IMsgOpts|null);

        /** LS2GC_GSInfo gsInfos. */
        public gsInfos: Protos.IGSInfo[];

        /**
         * Creates a new LS2GC_GSInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LS2GC_GSInfo instance
         */
        public static create(properties?: Protos.ILS2GC_GSInfo): Protos.LS2GC_GSInfo;

        /**
         * Encodes the specified LS2GC_GSInfo message. Does not implicitly {@link Protos.LS2GC_GSInfo.verify|verify} messages.
         * @param message LS2GC_GSInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Protos.ILS2GC_GSInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LS2GC_GSInfo message, length delimited. Does not implicitly {@link Protos.LS2GC_GSInfo.verify|verify} messages.
         * @param message LS2GC_GSInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Protos.ILS2GC_GSInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LS2GC_GSInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LS2GC_GSInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.LS2GC_GSInfo;

        /**
         * Decodes a LS2GC_GSInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LS2GC_GSInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.LS2GC_GSInfo;

        /**
         * Verifies a LS2GC_GSInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LS2GC_GSInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LS2GC_GSInfo
         */
        public static fromObject(object: { [k: string]: any }): Protos.LS2GC_GSInfo;

        /**
         * Creates a plain object from a LS2GC_GSInfo message. Also converts values to other types if specified.
         * @param message LS2GC_GSInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Protos.LS2GC_GSInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LS2GC_GSInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a LS2GC_AskRegRet. */
    interface ILS2GC_AskRegRet {

        /** LS2GC_AskRegRet opts */
        opts?: (Protos.IMsgOpts|null);

        /** LS2GC_AskRegRet result */
        result?: (Protos.LS2GC_AskRegRet.EResult|null);
    }

    /** Represents a LS2GC_AskRegRet. */
    class LS2GC_AskRegRet implements ILS2GC_AskRegRet {

        /**
         * Constructs a new LS2GC_AskRegRet.
         * @param [properties] Properties to set
         */
        constructor(properties?: Protos.ILS2GC_AskRegRet);

        /** LS2GC_AskRegRet opts. */
        public opts?: (Protos.IMsgOpts|null);

        /** LS2GC_AskRegRet result. */
        public result: Protos.LS2GC_AskRegRet.EResult;

        /**
         * Creates a new LS2GC_AskRegRet instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LS2GC_AskRegRet instance
         */
        public static create(properties?: Protos.ILS2GC_AskRegRet): Protos.LS2GC_AskRegRet;

        /**
         * Encodes the specified LS2GC_AskRegRet message. Does not implicitly {@link Protos.LS2GC_AskRegRet.verify|verify} messages.
         * @param message LS2GC_AskRegRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Protos.ILS2GC_AskRegRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LS2GC_AskRegRet message, length delimited. Does not implicitly {@link Protos.LS2GC_AskRegRet.verify|verify} messages.
         * @param message LS2GC_AskRegRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Protos.ILS2GC_AskRegRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LS2GC_AskRegRet message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LS2GC_AskRegRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.LS2GC_AskRegRet;

        /**
         * Decodes a LS2GC_AskRegRet message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LS2GC_AskRegRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.LS2GC_AskRegRet;

        /**
         * Verifies a LS2GC_AskRegRet message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LS2GC_AskRegRet message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LS2GC_AskRegRet
         */
        public static fromObject(object: { [k: string]: any }): Protos.LS2GC_AskRegRet;

        /**
         * Creates a plain object from a LS2GC_AskRegRet message. Also converts values to other types if specified.
         * @param message LS2GC_AskRegRet
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Protos.LS2GC_AskRegRet, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LS2GC_AskRegRet to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace LS2GC_AskRegRet {

        /** EResult enum. */
        enum EResult {
            Success = 0,
            Failed = 1,
            UnameExists = 2,
            UnameIllegal = 3,
            PwdIllegal = 4
        }
    }

    /** Properties of a LS2GC_AskLoginRet. */
    interface ILS2GC_AskLoginRet {

        /** LS2GC_AskLoginRet opts */
        opts?: (Protos.IMsgOpts|null);

        /** LS2GC_AskLoginRet result */
        result?: (Protos.LS2GC_AskLoginRet.EResult|null);

        /** LS2GC_AskLoginRet sessionID */
        sessionID?: (Long|null);

        /** LS2GC_AskLoginRet gsInfos */
        gsInfos?: (Protos.IGSInfo[]|null);
    }

    /** Represents a LS2GC_AskLoginRet. */
    class LS2GC_AskLoginRet implements ILS2GC_AskLoginRet {

        /**
         * Constructs a new LS2GC_AskLoginRet.
         * @param [properties] Properties to set
         */
        constructor(properties?: Protos.ILS2GC_AskLoginRet);

        /** LS2GC_AskLoginRet opts. */
        public opts?: (Protos.IMsgOpts|null);

        /** LS2GC_AskLoginRet result. */
        public result: Protos.LS2GC_AskLoginRet.EResult;

        /** LS2GC_AskLoginRet sessionID. */
        public sessionID: Long;

        /** LS2GC_AskLoginRet gsInfos. */
        public gsInfos: Protos.IGSInfo[];

        /**
         * Creates a new LS2GC_AskLoginRet instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LS2GC_AskLoginRet instance
         */
        public static create(properties?: Protos.ILS2GC_AskLoginRet): Protos.LS2GC_AskLoginRet;

        /**
         * Encodes the specified LS2GC_AskLoginRet message. Does not implicitly {@link Protos.LS2GC_AskLoginRet.verify|verify} messages.
         * @param message LS2GC_AskLoginRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Protos.ILS2GC_AskLoginRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LS2GC_AskLoginRet message, length delimited. Does not implicitly {@link Protos.LS2GC_AskLoginRet.verify|verify} messages.
         * @param message LS2GC_AskLoginRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Protos.ILS2GC_AskLoginRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LS2GC_AskLoginRet message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LS2GC_AskLoginRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protos.LS2GC_AskLoginRet;

        /**
         * Decodes a LS2GC_AskLoginRet message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LS2GC_AskLoginRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protos.LS2GC_AskLoginRet;

        /**
         * Verifies a LS2GC_AskLoginRet message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LS2GC_AskLoginRet message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LS2GC_AskLoginRet
         */
        public static fromObject(object: { [k: string]: any }): Protos.LS2GC_AskLoginRet;

        /**
         * Creates a plain object from a LS2GC_AskLoginRet message. Also converts values to other types if specified.
         * @param message LS2GC_AskLoginRet
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Protos.LS2GC_AskLoginRet, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LS2GC_AskLoginRet to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace LS2GC_AskLoginRet {

        /** EResult enum. */
        enum EResult {
            Success = 0,
            Failed = 1,
            InvalidUname = 3,
            InvalidPwd = 4
        }
    }
}
