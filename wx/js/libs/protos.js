/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs";

const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const Protos = $root.Protos = (() => {

    const Protos = {};

    Protos.BSInfo = (function() {

        function BSInfo(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        BSInfo.prototype.id = 0;
        BSInfo.prototype.ip = "";
        BSInfo.prototype.port = 0;
        BSInfo.prototype.state = 0;

        BSInfo.create = function create(properties) {
            return new BSInfo(properties);
        };

        BSInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && message.hasOwnProperty("id"))
                writer.uint32(8).uint32(message.id);
            if (message.ip != null && message.hasOwnProperty("ip"))
                writer.uint32(26).string(message.ip);
            if (message.port != null && message.hasOwnProperty("port"))
                writer.uint32(32).int32(message.port);
            if (message.state != null && message.hasOwnProperty("state"))
                writer.uint32(48).int32(message.state);
            return writer;
        };

        BSInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        BSInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.BSInfo();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.uint32();
                    break;
                case 3:
                    message.ip = reader.string();
                    break;
                case 4:
                    message.port = reader.int32();
                    break;
                case 6:
                    message.state = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        BSInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        BSInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isInteger(message.id))
                    return "id: integer expected";
            if (message.ip != null && message.hasOwnProperty("ip"))
                if (!$util.isString(message.ip))
                    return "ip: string expected";
            if (message.port != null && message.hasOwnProperty("port"))
                if (!$util.isInteger(message.port))
                    return "port: integer expected";
            if (message.state != null && message.hasOwnProperty("state"))
                switch (message.state) {
                default:
                    return "state: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                    break;
                }
            return null;
        };

        BSInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.BSInfo)
                return object;
            let message = new $root.Protos.BSInfo();
            if (object.id != null)
                message.id = object.id >>> 0;
            if (object.ip != null)
                message.ip = String(object.ip);
            if (object.port != null)
                message.port = object.port | 0;
            switch (object.state) {
            case "Free":
            case 0:
                message.state = 0;
                break;
            case "Busy":
            case 1:
                message.state = 1;
                break;
            case "Full":
            case 2:
                message.state = 2;
                break;
            case "Close":
            case 3:
                message.state = 3;
                break;
            }
            return message;
        };

        BSInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.id = 0;
                object.ip = "";
                object.port = 0;
                object.state = options.enums === String ? "Free" : 0;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.ip != null && message.hasOwnProperty("ip"))
                object.ip = message.ip;
            if (message.port != null && message.hasOwnProperty("port"))
                object.port = message.port;
            if (message.state != null && message.hasOwnProperty("state"))
                object.state = options.enums === String ? $root.Protos.BSInfo.State[message.state] : message.state;
            return object;
        };

        BSInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        BSInfo.State = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "Free"] = 0;
            values[valuesById[1] = "Busy"] = 1;
            values[valuesById[2] = "Full"] = 2;
            values[valuesById[3] = "Close"] = 3;
            return values;
        })();

        return BSInfo;
    })();

    Protos.BS2CS_ReportState = (function() {

        function BS2CS_ReportState(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        BS2CS_ReportState.prototype.opts = null;
        BS2CS_ReportState.prototype.bsInfo = null;

        BS2CS_ReportState.create = function create(properties) {
            return new BS2CS_ReportState(properties);
        };

        BS2CS_ReportState.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.opts != null && message.hasOwnProperty("opts"))
                $root.Protos.MsgOpts.encode(message.opts, writer.uint32(10).fork()).ldelim();
            if (message.bsInfo != null && message.hasOwnProperty("bsInfo"))
                $root.Protos.BSInfo.encode(message.bsInfo, writer.uint32(18).fork()).ldelim();
            return writer;
        };

        BS2CS_ReportState.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        BS2CS_ReportState.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.BS2CS_ReportState();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.bsInfo = $root.Protos.BSInfo.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        BS2CS_ReportState.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        BS2CS_ReportState.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.opts != null && message.hasOwnProperty("opts")) {
                let error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            if (message.bsInfo != null && message.hasOwnProperty("bsInfo")) {
                let error = $root.Protos.BSInfo.verify(message.bsInfo);
                if (error)
                    return "bsInfo." + error;
            }
            return null;
        };

        BS2CS_ReportState.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.BS2CS_ReportState)
                return object;
            let message = new $root.Protos.BS2CS_ReportState();
            if (object.opts != null) {
                if (typeof object.opts !== "object")
                    throw TypeError(".Protos.BS2CS_ReportState.opts: object expected");
                message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
            }
            if (object.bsInfo != null) {
                if (typeof object.bsInfo !== "object")
                    throw TypeError(".Protos.BS2CS_ReportState.bsInfo: object expected");
                message.bsInfo = $root.Protos.BSInfo.fromObject(object.bsInfo);
            }
            return message;
        };

        BS2CS_ReportState.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.opts = null;
                object.bsInfo = null;
            }
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            if (message.bsInfo != null && message.hasOwnProperty("bsInfo"))
                object.bsInfo = $root.Protos.BSInfo.toObject(message.bsInfo, options);
            return object;
        };

        BS2CS_ReportState.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BS2CS_ReportState;
    })();

    Protos.BS2CS_BattleInfoRet = (function() {

        function BS2CS_BattleInfoRet(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        BS2CS_BattleInfoRet.prototype.opts = null;
        BS2CS_BattleInfoRet.prototype.bid = 0;

        BS2CS_BattleInfoRet.create = function create(properties) {
            return new BS2CS_BattleInfoRet(properties);
        };

        BS2CS_BattleInfoRet.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.opts != null && message.hasOwnProperty("opts"))
                $root.Protos.MsgOpts.encode(message.opts, writer.uint32(10).fork()).ldelim();
            if (message.bid != null && message.hasOwnProperty("bid"))
                writer.uint32(16).uint32(message.bid);
            return writer;
        };

        BS2CS_BattleInfoRet.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        BS2CS_BattleInfoRet.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.BS2CS_BattleInfoRet();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.bid = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        BS2CS_BattleInfoRet.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        BS2CS_BattleInfoRet.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.opts != null && message.hasOwnProperty("opts")) {
                let error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            if (message.bid != null && message.hasOwnProperty("bid"))
                if (!$util.isInteger(message.bid))
                    return "bid: integer expected";
            return null;
        };

        BS2CS_BattleInfoRet.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.BS2CS_BattleInfoRet)
                return object;
            let message = new $root.Protos.BS2CS_BattleInfoRet();
            if (object.opts != null) {
                if (typeof object.opts !== "object")
                    throw TypeError(".Protos.BS2CS_BattleInfoRet.opts: object expected");
                message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
            }
            if (object.bid != null)
                message.bid = object.bid >>> 0;
            return message;
        };

        BS2CS_BattleInfoRet.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.opts = null;
                object.bid = 0;
            }
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            if (message.bid != null && message.hasOwnProperty("bid"))
                object.bid = message.bid;
            return object;
        };

        BS2CS_BattleInfoRet.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BS2CS_BattleInfoRet;
    })();

    Protos.BS2CS_BattleStart = (function() {

        function BS2CS_BattleStart(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        BS2CS_BattleStart.prototype.opts = null;
        BS2CS_BattleStart.prototype.bid = 0;

        BS2CS_BattleStart.create = function create(properties) {
            return new BS2CS_BattleStart(properties);
        };

        BS2CS_BattleStart.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.opts != null && message.hasOwnProperty("opts"))
                $root.Protos.MsgOpts.encode(message.opts, writer.uint32(10).fork()).ldelim();
            if (message.bid != null && message.hasOwnProperty("bid"))
                writer.uint32(16).uint32(message.bid);
            return writer;
        };

        BS2CS_BattleStart.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        BS2CS_BattleStart.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.BS2CS_BattleStart();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.bid = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        BS2CS_BattleStart.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        BS2CS_BattleStart.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.opts != null && message.hasOwnProperty("opts")) {
                let error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            if (message.bid != null && message.hasOwnProperty("bid"))
                if (!$util.isInteger(message.bid))
                    return "bid: integer expected";
            return null;
        };

        BS2CS_BattleStart.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.BS2CS_BattleStart)
                return object;
            let message = new $root.Protos.BS2CS_BattleStart();
            if (object.opts != null) {
                if (typeof object.opts !== "object")
                    throw TypeError(".Protos.BS2CS_BattleStart.opts: object expected");
                message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
            }
            if (object.bid != null)
                message.bid = object.bid >>> 0;
            return message;
        };

        BS2CS_BattleStart.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.opts = null;
                object.bid = 0;
            }
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            if (message.bid != null && message.hasOwnProperty("bid"))
                object.bid = message.bid;
            return object;
        };

        BS2CS_BattleStart.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BS2CS_BattleStart;
    })();

    Protos.BS2CS_BattleEnd = (function() {

        function BS2CS_BattleEnd(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        BS2CS_BattleEnd.prototype.opts = null;
        BS2CS_BattleEnd.prototype.bid = 0;

        BS2CS_BattleEnd.create = function create(properties) {
            return new BS2CS_BattleEnd(properties);
        };

        BS2CS_BattleEnd.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.opts != null && message.hasOwnProperty("opts"))
                $root.Protos.MsgOpts.encode(message.opts, writer.uint32(10).fork()).ldelim();
            if (message.bid != null && message.hasOwnProperty("bid"))
                writer.uint32(16).uint32(message.bid);
            return writer;
        };

        BS2CS_BattleEnd.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        BS2CS_BattleEnd.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.BS2CS_BattleEnd();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.bid = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        BS2CS_BattleEnd.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        BS2CS_BattleEnd.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.opts != null && message.hasOwnProperty("opts")) {
                let error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            if (message.bid != null && message.hasOwnProperty("bid"))
                if (!$util.isInteger(message.bid))
                    return "bid: integer expected";
            return null;
        };

        BS2CS_BattleEnd.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.BS2CS_BattleEnd)
                return object;
            let message = new $root.Protos.BS2CS_BattleEnd();
            if (object.opts != null) {
                if (typeof object.opts !== "object")
                    throw TypeError(".Protos.BS2CS_BattleEnd.opts: object expected");
                message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
            }
            if (object.bid != null)
                message.bid = object.bid >>> 0;
            return message;
        };

        BS2CS_BattleEnd.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.opts = null;
                object.bid = 0;
            }
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            if (message.bid != null && message.hasOwnProperty("bid"))
                object.bid = message.bid;
            return object;
        };

        BS2CS_BattleEnd.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BS2CS_BattleEnd;
    })();

    Protos.MsgID = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "Undefine"] = 0;
        values[valuesById[10] = "eG_AskPing"] = 10;
        values[valuesById[11] = "eG_AskPingRet"] = 11;
        values[valuesById[1000] = "eGC2LS_AskRegister"] = 1000;
        values[valuesById[1001] = "eGC2LS_AskLogin"] = 1001;
        values[valuesById[1002] = "eGC2LS_AskSmartLogin"] = 1002;
        values[valuesById[1100] = "eGC2GS_AskLogin"] = 1100;
        values[valuesById[1101] = "eGC2GS_KeepAlive"] = 1101;
        values[valuesById[1200] = "eGC2BS_AskLogin"] = 1200;
        values[valuesById[1201] = "eGC2BS_KeepAlive"] = 1201;
        values[valuesById[1300] = "eGC2CS_BeginMatch"] = 1300;
        values[valuesById[1301] = "eGC2CS_UpdatePlayerInfo"] = 1301;
        values[valuesById[2000] = "eLS2GC_GSInfo"] = 2000;
        values[valuesById[2001] = "eLS2GC_AskRegRet"] = 2001;
        values[valuesById[2002] = "eLS2GC_AskLoginRet"] = 2002;
        values[valuesById[2100] = "eLS2CS_GCLogin"] = 2100;
        values[valuesById[2200] = "eLS2DB_QueryAccount"] = 2200;
        values[valuesById[2201] = "eLS2DB_QueryLogin"] = 2201;
        values[valuesById[2202] = "eLS2DB_Exec"] = 2202;
        values[valuesById[3000] = "eGS2CS_ReportState"] = 3000;
        values[valuesById[3001] = "eGS2CS_GCAskLogin"] = 3001;
        values[valuesById[3002] = "eGS2CS_GCLost"] = 3002;
        values[valuesById[3003] = "eGS2CS_KickGCRet"] = 3003;
        values[valuesById[3100] = "eGS2GC_LoginRet"] = 3100;
        values[valuesById[3101] = "eGS2GC_Kick"] = 3101;
        values[valuesById[4000] = "eBS2CS_ReportState"] = 4000;
        values[valuesById[4001] = "eBS2CS_BattleInfoRet"] = 4001;
        values[valuesById[4002] = "eBS2CS_BattleStart"] = 4002;
        values[valuesById[4003] = "eBS2CS_BattleEnd"] = 4003;
        values[valuesById[4100] = "eBS2GC_LoginRet"] = 4100;
        values[valuesById[4102] = "eBS2GC_BattleStart"] = 4102;
        values[valuesById[4103] = "eBS2GC_BattleEnd"] = 4103;
        values[valuesById[5000] = "eCS2LS_GSInfos"] = 5000;
        values[valuesById[5001] = "eCS2LS_GSInfo"] = 5001;
        values[valuesById[5002] = "eCS2LS_GSLost"] = 5002;
        values[valuesById[5003] = "eCS2LS_GCLoginRet"] = 5003;
        values[valuesById[5100] = "eCS2GS_GCLoginRet"] = 5100;
        values[valuesById[5101] = "eCS2GS_KickGC"] = 5101;
        values[valuesById[5200] = "eCS2BS_BattleInfo"] = 5200;
        values[valuesById[5201] = "eCS2BS_BattleStartRet"] = 5201;
        values[valuesById[5202] = "eCS2BS_BattleEndRet"] = 5202;
        values[valuesById[5300] = "eCS2GC_BeginMatchRet"] = 5300;
        values[valuesById[5301] = "eCS2GC_PlayerJoin"] = 5301;
        values[valuesById[5302] = "eCS2GC_PlayerLeave"] = 5302;
        values[valuesById[5303] = "eCS2GC_RoomInfo"] = 5303;
        values[valuesById[5304] = "eCS2GC_EnterBattle"] = 5304;
        values[valuesById[8000] = "eDB2LS_QueryAccountRet"] = 8000;
        values[valuesById[8001] = "eDB2LS_QueryLoginRet"] = 8001;
        values[valuesById[8002] = "eDB2LS_ExecRet"] = 8002;
        return values;
    })();

    Protos.MsgOpts = (function() {

        function MsgOpts(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        MsgOpts.prototype.flag = 0;
        MsgOpts.prototype.pid = 0;
        MsgOpts.prototype.rpid = 0;
        MsgOpts.prototype.transid = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        MsgOpts.create = function create(properties) {
            return new MsgOpts(properties);
        };

        MsgOpts.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.flag != null && message.hasOwnProperty("flag"))
                writer.uint32(8).uint32(message.flag);
            if (message.pid != null && message.hasOwnProperty("pid"))
                writer.uint32(16).uint32(message.pid);
            if (message.rpid != null && message.hasOwnProperty("rpid"))
                writer.uint32(24).uint32(message.rpid);
            if (message.transid != null && message.hasOwnProperty("transid"))
                writer.uint32(32).uint64(message.transid);
            return writer;
        };

        MsgOpts.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        MsgOpts.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.MsgOpts();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.flag = reader.uint32();
                    break;
                case 2:
                    message.pid = reader.uint32();
                    break;
                case 3:
                    message.rpid = reader.uint32();
                    break;
                case 4:
                    message.transid = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        MsgOpts.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        MsgOpts.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.flag != null && message.hasOwnProperty("flag"))
                if (!$util.isInteger(message.flag))
                    return "flag: integer expected";
            if (message.pid != null && message.hasOwnProperty("pid"))
                if (!$util.isInteger(message.pid))
                    return "pid: integer expected";
            if (message.rpid != null && message.hasOwnProperty("rpid"))
                if (!$util.isInteger(message.rpid))
                    return "rpid: integer expected";
            if (message.transid != null && message.hasOwnProperty("transid"))
                if (!$util.isInteger(message.transid) && !(message.transid && $util.isInteger(message.transid.low) && $util.isInteger(message.transid.high)))
                    return "transid: integer|Long expected";
            return null;
        };

        MsgOpts.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.MsgOpts)
                return object;
            let message = new $root.Protos.MsgOpts();
            if (object.flag != null)
                message.flag = object.flag >>> 0;
            if (object.pid != null)
                message.pid = object.pid >>> 0;
            if (object.rpid != null)
                message.rpid = object.rpid >>> 0;
            if (object.transid != null)
                if ($util.Long)
                    (message.transid = $util.Long.fromValue(object.transid)).unsigned = true;
                else if (typeof object.transid === "string")
                    message.transid = parseInt(object.transid, 10);
                else if (typeof object.transid === "number")
                    message.transid = object.transid;
                else if (typeof object.transid === "object")
                    message.transid = new $util.LongBits(object.transid.low >>> 0, object.transid.high >>> 0).toNumber(true);
            return message;
        };

        MsgOpts.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.flag = 0;
                object.pid = 0;
                object.rpid = 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.transid = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.transid = options.longs === String ? "0" : 0;
            }
            if (message.flag != null && message.hasOwnProperty("flag"))
                object.flag = message.flag;
            if (message.pid != null && message.hasOwnProperty("pid"))
                object.pid = message.pid;
            if (message.rpid != null && message.hasOwnProperty("rpid"))
                object.rpid = message.rpid;
            if (message.transid != null && message.hasOwnProperty("transid"))
                if (typeof message.transid === "number")
                    object.transid = options.longs === String ? String(message.transid) : message.transid;
                else
                    object.transid = options.longs === String ? $util.Long.prototype.toString.call(message.transid) : options.longs === Number ? new $util.LongBits(message.transid.low >>> 0, message.transid.high >>> 0).toNumber(true) : message.transid;
            return object;
        };

        MsgOpts.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        MsgOpts.Flag = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "Norm"] = 0;
            values[valuesById[1] = "RPC"] = 1;
            values[valuesById[2] = "RESP"] = 2;
            values[valuesById[3] = "TRANS"] = 3;
            return values;
        })();

        MsgOpts.TransTarget = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "Undefine"] = 0;
            values[valuesById[1] = "GC"] = 1;
            values[valuesById[2] = "CS"] = 2;
            values[valuesById[3] = "BS"] = 3;
            values[valuesById[4] = "LS"] = 4;
            values[valuesById[5] = "DB"] = 5;
            values[valuesById[6] = "GS"] = 6;
            return values;
        })();

        return MsgOpts;
    })();

    Protos.G_AskPing = (function() {

        function G_AskPing(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        G_AskPing.prototype.opts = null;
        G_AskPing.prototype.time = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        G_AskPing.create = function create(properties) {
            return new G_AskPing(properties);
        };

        G_AskPing.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.opts != null && message.hasOwnProperty("opts"))
                $root.Protos.MsgOpts.encode(message.opts, writer.uint32(10).fork()).ldelim();
            if (message.time != null && message.hasOwnProperty("time"))
                writer.uint32(16).int64(message.time);
            return writer;
        };

        G_AskPing.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        G_AskPing.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.G_AskPing();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.time = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        G_AskPing.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        G_AskPing.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.opts != null && message.hasOwnProperty("opts")) {
                let error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            if (message.time != null && message.hasOwnProperty("time"))
                if (!$util.isInteger(message.time) && !(message.time && $util.isInteger(message.time.low) && $util.isInteger(message.time.high)))
                    return "time: integer|Long expected";
            return null;
        };

        G_AskPing.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.G_AskPing)
                return object;
            let message = new $root.Protos.G_AskPing();
            if (object.opts != null) {
                if (typeof object.opts !== "object")
                    throw TypeError(".Protos.G_AskPing.opts: object expected");
                message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
            }
            if (object.time != null)
                if ($util.Long)
                    (message.time = $util.Long.fromValue(object.time)).unsigned = false;
                else if (typeof object.time === "string")
                    message.time = parseInt(object.time, 10);
                else if (typeof object.time === "number")
                    message.time = object.time;
                else if (typeof object.time === "object")
                    message.time = new $util.LongBits(object.time.low >>> 0, object.time.high >>> 0).toNumber();
            return message;
        };

        G_AskPing.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.opts = null;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.time = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.time = options.longs === String ? "0" : 0;
            }
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            if (message.time != null && message.hasOwnProperty("time"))
                if (typeof message.time === "number")
                    object.time = options.longs === String ? String(message.time) : message.time;
                else
                    object.time = options.longs === String ? $util.Long.prototype.toString.call(message.time) : options.longs === Number ? new $util.LongBits(message.time.low >>> 0, message.time.high >>> 0).toNumber() : message.time;
            return object;
        };

        G_AskPing.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return G_AskPing;
    })();

    Protos.G_AskPingRet = (function() {

        function G_AskPingRet(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        G_AskPingRet.prototype.opts = null;
        G_AskPingRet.prototype.stime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
        G_AskPingRet.prototype.time = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        G_AskPingRet.create = function create(properties) {
            return new G_AskPingRet(properties);
        };

        G_AskPingRet.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.opts != null && message.hasOwnProperty("opts"))
                $root.Protos.MsgOpts.encode(message.opts, writer.uint32(10).fork()).ldelim();
            if (message.stime != null && message.hasOwnProperty("stime"))
                writer.uint32(16).int64(message.stime);
            if (message.time != null && message.hasOwnProperty("time"))
                writer.uint32(24).int64(message.time);
            return writer;
        };

        G_AskPingRet.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        G_AskPingRet.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.G_AskPingRet();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.stime = reader.int64();
                    break;
                case 3:
                    message.time = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        G_AskPingRet.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        G_AskPingRet.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.opts != null && message.hasOwnProperty("opts")) {
                let error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            if (message.stime != null && message.hasOwnProperty("stime"))
                if (!$util.isInteger(message.stime) && !(message.stime && $util.isInteger(message.stime.low) && $util.isInteger(message.stime.high)))
                    return "stime: integer|Long expected";
            if (message.time != null && message.hasOwnProperty("time"))
                if (!$util.isInteger(message.time) && !(message.time && $util.isInteger(message.time.low) && $util.isInteger(message.time.high)))
                    return "time: integer|Long expected";
            return null;
        };

        G_AskPingRet.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.G_AskPingRet)
                return object;
            let message = new $root.Protos.G_AskPingRet();
            if (object.opts != null) {
                if (typeof object.opts !== "object")
                    throw TypeError(".Protos.G_AskPingRet.opts: object expected");
                message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
            }
            if (object.stime != null)
                if ($util.Long)
                    (message.stime = $util.Long.fromValue(object.stime)).unsigned = false;
                else if (typeof object.stime === "string")
                    message.stime = parseInt(object.stime, 10);
                else if (typeof object.stime === "number")
                    message.stime = object.stime;
                else if (typeof object.stime === "object")
                    message.stime = new $util.LongBits(object.stime.low >>> 0, object.stime.high >>> 0).toNumber();
            if (object.time != null)
                if ($util.Long)
                    (message.time = $util.Long.fromValue(object.time)).unsigned = false;
                else if (typeof object.time === "string")
                    message.time = parseInt(object.time, 10);
                else if (typeof object.time === "number")
                    message.time = object.time;
                else if (typeof object.time === "object")
                    message.time = new $util.LongBits(object.time.low >>> 0, object.time.high >>> 0).toNumber();
            return message;
        };

        G_AskPingRet.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.opts = null;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.stime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.stime = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.time = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.time = options.longs === String ? "0" : 0;
            }
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            if (message.stime != null && message.hasOwnProperty("stime"))
                if (typeof message.stime === "number")
                    object.stime = options.longs === String ? String(message.stime) : message.stime;
                else
                    object.stime = options.longs === String ? $util.Long.prototype.toString.call(message.stime) : options.longs === Number ? new $util.LongBits(message.stime.low >>> 0, message.stime.high >>> 0).toNumber() : message.stime;
            if (message.time != null && message.hasOwnProperty("time"))
                if (typeof message.time === "number")
                    object.time = options.longs === String ? String(message.time) : message.time;
                else
                    object.time = options.longs === String ? $util.Long.prototype.toString.call(message.time) : options.longs === Number ? new $util.LongBits(message.time.low >>> 0, message.time.high >>> 0).toNumber() : message.time;
            return object;
        };

        G_AskPingRet.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return G_AskPingRet;
    })();

    Protos.Global = (function() {

        function Global(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        Global.create = function create(properties) {
            return new Global(properties);
        };

        Global.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        Global.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        Global.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.Global();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        Global.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        Global.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        Global.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.Global)
                return object;
            return new $root.Protos.Global();
        };

        Global.toObject = function toObject() {
            return {};
        };

        Global.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        Global.ECommon = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "Success"] = 0;
            values[valuesById[1] = "Failed"] = 1;
            return values;
        })();

        return Global;
    })();

    Protos.BS2GC_LoginRet = (function() {

        function BS2GC_LoginRet(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        BS2GC_LoginRet.prototype.opts = null;
        BS2GC_LoginRet.prototype.result = 0;

        BS2GC_LoginRet.create = function create(properties) {
            return new BS2GC_LoginRet(properties);
        };

        BS2GC_LoginRet.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.opts != null && message.hasOwnProperty("opts"))
                $root.Protos.MsgOpts.encode(message.opts, writer.uint32(10).fork()).ldelim();
            if (message.result != null && message.hasOwnProperty("result"))
                writer.uint32(16).int32(message.result);
            return writer;
        };

        BS2GC_LoginRet.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        BS2GC_LoginRet.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.BS2GC_LoginRet();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.result = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        BS2GC_LoginRet.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        BS2GC_LoginRet.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.opts != null && message.hasOwnProperty("opts")) {
                let error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            if (message.result != null && message.hasOwnProperty("result"))
                switch (message.result) {
                default:
                    return "result: enum value expected";
                case 0:
                case 1:
                    break;
                }
            return null;
        };

        BS2GC_LoginRet.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.BS2GC_LoginRet)
                return object;
            let message = new $root.Protos.BS2GC_LoginRet();
            if (object.opts != null) {
                if (typeof object.opts !== "object")
                    throw TypeError(".Protos.BS2GC_LoginRet.opts: object expected");
                message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
            }
            switch (object.result) {
            case "Success":
            case 0:
                message.result = 0;
                break;
            case "Failed":
            case 1:
                message.result = 1;
                break;
            }
            return message;
        };

        BS2GC_LoginRet.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.opts = null;
                object.result = options.enums === String ? "Success" : 0;
            }
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            if (message.result != null && message.hasOwnProperty("result"))
                object.result = options.enums === String ? $root.Protos.BS2GC_LoginRet.EResult[message.result] : message.result;
            return object;
        };

        BS2GC_LoginRet.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        BS2GC_LoginRet.EResult = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "Success"] = 0;
            values[valuesById[1] = "Failed"] = 1;
            return values;
        })();

        return BS2GC_LoginRet;
    })();

    Protos.BS2GC_BattleStart = (function() {

        function BS2GC_BattleStart(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        BS2GC_BattleStart.prototype.opts = null;
        BS2GC_BattleStart.prototype.id = 0;

        BS2GC_BattleStart.create = function create(properties) {
            return new BS2GC_BattleStart(properties);
        };

        BS2GC_BattleStart.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.opts != null && message.hasOwnProperty("opts"))
                $root.Protos.MsgOpts.encode(message.opts, writer.uint32(10).fork()).ldelim();
            if (message.id != null && message.hasOwnProperty("id"))
                writer.uint32(16).uint32(message.id);
            return writer;
        };

        BS2GC_BattleStart.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        BS2GC_BattleStart.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.BS2GC_BattleStart();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.id = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        BS2GC_BattleStart.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        BS2GC_BattleStart.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.opts != null && message.hasOwnProperty("opts")) {
                let error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isInteger(message.id))
                    return "id: integer expected";
            return null;
        };

        BS2GC_BattleStart.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.BS2GC_BattleStart)
                return object;
            let message = new $root.Protos.BS2GC_BattleStart();
            if (object.opts != null) {
                if (typeof object.opts !== "object")
                    throw TypeError(".Protos.BS2GC_BattleStart.opts: object expected");
                message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
            }
            if (object.id != null)
                message.id = object.id >>> 0;
            return message;
        };

        BS2GC_BattleStart.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.opts = null;
                object.id = 0;
            }
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            return object;
        };

        BS2GC_BattleStart.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BS2GC_BattleStart;
    })();

    Protos.BS2GC_BattleEnd = (function() {

        function BS2GC_BattleEnd(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        BS2GC_BattleEnd.prototype.opts = null;
        BS2GC_BattleEnd.prototype.id = 0;

        BS2GC_BattleEnd.create = function create(properties) {
            return new BS2GC_BattleEnd(properties);
        };

        BS2GC_BattleEnd.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.opts != null && message.hasOwnProperty("opts"))
                $root.Protos.MsgOpts.encode(message.opts, writer.uint32(10).fork()).ldelim();
            if (message.id != null && message.hasOwnProperty("id"))
                writer.uint32(16).uint32(message.id);
            return writer;
        };

        BS2GC_BattleEnd.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        BS2GC_BattleEnd.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.BS2GC_BattleEnd();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.id = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        BS2GC_BattleEnd.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        BS2GC_BattleEnd.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.opts != null && message.hasOwnProperty("opts")) {
                let error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isInteger(message.id))
                    return "id: integer expected";
            return null;
        };

        BS2GC_BattleEnd.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.BS2GC_BattleEnd)
                return object;
            let message = new $root.Protos.BS2GC_BattleEnd();
            if (object.opts != null) {
                if (typeof object.opts !== "object")
                    throw TypeError(".Protos.BS2GC_BattleEnd.opts: object expected");
                message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
            }
            if (object.id != null)
                message.id = object.id >>> 0;
            return message;
        };

        BS2GC_BattleEnd.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.opts = null;
                object.id = 0;
            }
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            return object;
        };

        BS2GC_BattleEnd.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BS2GC_BattleEnd;
    })();

    Protos.CS2BS_PlayerInfo = (function() {

        function CS2BS_PlayerInfo(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        CS2BS_PlayerInfo.prototype.gcNID = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
        CS2BS_PlayerInfo.prototype.name = "";
        CS2BS_PlayerInfo.prototype.actorID = 0;

        CS2BS_PlayerInfo.create = function create(properties) {
            return new CS2BS_PlayerInfo(properties);
        };

        CS2BS_PlayerInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.gcNID != null && message.hasOwnProperty("gcNID"))
                writer.uint32(8).uint64(message.gcNID);
            if (message.name != null && message.hasOwnProperty("name"))
                writer.uint32(18).string(message.name);
            if (message.actorID != null && message.hasOwnProperty("actorID"))
                writer.uint32(24).int32(message.actorID);
            return writer;
        };

        CS2BS_PlayerInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        CS2BS_PlayerInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.CS2BS_PlayerInfo();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.gcNID = reader.uint64();
                    break;
                case 2:
                    message.name = reader.string();
                    break;
                case 3:
                    message.actorID = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        CS2BS_PlayerInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        CS2BS_PlayerInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.gcNID != null && message.hasOwnProperty("gcNID"))
                if (!$util.isInteger(message.gcNID) && !(message.gcNID && $util.isInteger(message.gcNID.low) && $util.isInteger(message.gcNID.high)))
                    return "gcNID: integer|Long expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.actorID != null && message.hasOwnProperty("actorID"))
                if (!$util.isInteger(message.actorID))
                    return "actorID: integer expected";
            return null;
        };

        CS2BS_PlayerInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.CS2BS_PlayerInfo)
                return object;
            let message = new $root.Protos.CS2BS_PlayerInfo();
            if (object.gcNID != null)
                if ($util.Long)
                    (message.gcNID = $util.Long.fromValue(object.gcNID)).unsigned = true;
                else if (typeof object.gcNID === "string")
                    message.gcNID = parseInt(object.gcNID, 10);
                else if (typeof object.gcNID === "number")
                    message.gcNID = object.gcNID;
                else if (typeof object.gcNID === "object")
                    message.gcNID = new $util.LongBits(object.gcNID.low >>> 0, object.gcNID.high >>> 0).toNumber(true);
            if (object.name != null)
                message.name = String(object.name);
            if (object.actorID != null)
                message.actorID = object.actorID | 0;
            return message;
        };

        CS2BS_PlayerInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.gcNID = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.gcNID = options.longs === String ? "0" : 0;
                object.name = "";
                object.actorID = 0;
            }
            if (message.gcNID != null && message.hasOwnProperty("gcNID"))
                if (typeof message.gcNID === "number")
                    object.gcNID = options.longs === String ? String(message.gcNID) : message.gcNID;
                else
                    object.gcNID = options.longs === String ? $util.Long.prototype.toString.call(message.gcNID) : options.longs === Number ? new $util.LongBits(message.gcNID.low >>> 0, message.gcNID.high >>> 0).toNumber(true) : message.gcNID;
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.actorID != null && message.hasOwnProperty("actorID"))
                object.actorID = message.actorID;
            return object;
        };

        CS2BS_PlayerInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CS2BS_PlayerInfo;
    })();

    Protos.CS2BS_BattleInfo = (function() {

        function CS2BS_BattleInfo(properties) {
            this.playerInfo = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        CS2BS_BattleInfo.prototype.opts = null;
        CS2BS_BattleInfo.prototype.mapID = 0;
        CS2BS_BattleInfo.prototype.timeout = 0;
        CS2BS_BattleInfo.prototype.playerInfo = $util.emptyArray;

        CS2BS_BattleInfo.create = function create(properties) {
            return new CS2BS_BattleInfo(properties);
        };

        CS2BS_BattleInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.opts != null && message.hasOwnProperty("opts"))
                $root.Protos.MsgOpts.encode(message.opts, writer.uint32(10).fork()).ldelim();
            if (message.mapID != null && message.hasOwnProperty("mapID"))
                writer.uint32(16).int32(message.mapID);
            if (message.timeout != null && message.hasOwnProperty("timeout"))
                writer.uint32(24).int32(message.timeout);
            if (message.playerInfo != null && message.playerInfo.length)
                for (let i = 0; i < message.playerInfo.length; ++i)
                    $root.Protos.CS2BS_PlayerInfo.encode(message.playerInfo[i], writer.uint32(34).fork()).ldelim();
            return writer;
        };

        CS2BS_BattleInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        CS2BS_BattleInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.CS2BS_BattleInfo();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.mapID = reader.int32();
                    break;
                case 3:
                    message.timeout = reader.int32();
                    break;
                case 4:
                    if (!(message.playerInfo && message.playerInfo.length))
                        message.playerInfo = [];
                    message.playerInfo.push($root.Protos.CS2BS_PlayerInfo.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        CS2BS_BattleInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        CS2BS_BattleInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.opts != null && message.hasOwnProperty("opts")) {
                let error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            if (message.mapID != null && message.hasOwnProperty("mapID"))
                if (!$util.isInteger(message.mapID))
                    return "mapID: integer expected";
            if (message.timeout != null && message.hasOwnProperty("timeout"))
                if (!$util.isInteger(message.timeout))
                    return "timeout: integer expected";
            if (message.playerInfo != null && message.hasOwnProperty("playerInfo")) {
                if (!Array.isArray(message.playerInfo))
                    return "playerInfo: array expected";
                for (let i = 0; i < message.playerInfo.length; ++i) {
                    let error = $root.Protos.CS2BS_PlayerInfo.verify(message.playerInfo[i]);
                    if (error)
                        return "playerInfo." + error;
                }
            }
            return null;
        };

        CS2BS_BattleInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.CS2BS_BattleInfo)
                return object;
            let message = new $root.Protos.CS2BS_BattleInfo();
            if (object.opts != null) {
                if (typeof object.opts !== "object")
                    throw TypeError(".Protos.CS2BS_BattleInfo.opts: object expected");
                message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
            }
            if (object.mapID != null)
                message.mapID = object.mapID | 0;
            if (object.timeout != null)
                message.timeout = object.timeout | 0;
            if (object.playerInfo) {
                if (!Array.isArray(object.playerInfo))
                    throw TypeError(".Protos.CS2BS_BattleInfo.playerInfo: array expected");
                message.playerInfo = [];
                for (let i = 0; i < object.playerInfo.length; ++i) {
                    if (typeof object.playerInfo[i] !== "object")
                        throw TypeError(".Protos.CS2BS_BattleInfo.playerInfo: object expected");
                    message.playerInfo[i] = $root.Protos.CS2BS_PlayerInfo.fromObject(object.playerInfo[i]);
                }
            }
            return message;
        };

        CS2BS_BattleInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.playerInfo = [];
            if (options.defaults) {
                object.opts = null;
                object.mapID = 0;
                object.timeout = 0;
            }
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            if (message.mapID != null && message.hasOwnProperty("mapID"))
                object.mapID = message.mapID;
            if (message.timeout != null && message.hasOwnProperty("timeout"))
                object.timeout = message.timeout;
            if (message.playerInfo && message.playerInfo.length) {
                object.playerInfo = [];
                for (let j = 0; j < message.playerInfo.length; ++j)
                    object.playerInfo[j] = $root.Protos.CS2BS_PlayerInfo.toObject(message.playerInfo[j], options);
            }
            return object;
        };

        CS2BS_BattleInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CS2BS_BattleInfo;
    })();

    Protos.CS2BS_BattleStartRet = (function() {

        function CS2BS_BattleStartRet(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        CS2BS_BattleStartRet.prototype.opts = null;

        CS2BS_BattleStartRet.create = function create(properties) {
            return new CS2BS_BattleStartRet(properties);
        };

        CS2BS_BattleStartRet.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.opts != null && message.hasOwnProperty("opts"))
                $root.Protos.MsgOpts.encode(message.opts, writer.uint32(10).fork()).ldelim();
            return writer;
        };

        CS2BS_BattleStartRet.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        CS2BS_BattleStartRet.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.CS2BS_BattleStartRet();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        CS2BS_BattleStartRet.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        CS2BS_BattleStartRet.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.opts != null && message.hasOwnProperty("opts")) {
                let error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            return null;
        };

        CS2BS_BattleStartRet.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.CS2BS_BattleStartRet)
                return object;
            let message = new $root.Protos.CS2BS_BattleStartRet();
            if (object.opts != null) {
                if (typeof object.opts !== "object")
                    throw TypeError(".Protos.CS2BS_BattleStartRet.opts: object expected");
                message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
            }
            return message;
        };

        CS2BS_BattleStartRet.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.opts = null;
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            return object;
        };

        CS2BS_BattleStartRet.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CS2BS_BattleStartRet;
    })();

    Protos.CS2BS_BattleEndRet = (function() {

        function CS2BS_BattleEndRet(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        CS2BS_BattleEndRet.prototype.opts = null;

        CS2BS_BattleEndRet.create = function create(properties) {
            return new CS2BS_BattleEndRet(properties);
        };

        CS2BS_BattleEndRet.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.opts != null && message.hasOwnProperty("opts"))
                $root.Protos.MsgOpts.encode(message.opts, writer.uint32(10).fork()).ldelim();
            return writer;
        };

        CS2BS_BattleEndRet.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        CS2BS_BattleEndRet.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.CS2BS_BattleEndRet();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        CS2BS_BattleEndRet.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        CS2BS_BattleEndRet.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.opts != null && message.hasOwnProperty("opts")) {
                let error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            return null;
        };

        CS2BS_BattleEndRet.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.CS2BS_BattleEndRet)
                return object;
            let message = new $root.Protos.CS2BS_BattleEndRet();
            if (object.opts != null) {
                if (typeof object.opts !== "object")
                    throw TypeError(".Protos.CS2BS_BattleEndRet.opts: object expected");
                message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
            }
            return message;
        };

        CS2BS_BattleEndRet.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.opts = null;
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            return object;
        };

        CS2BS_BattleEndRet.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CS2BS_BattleEndRet;
    })();

    Protos.CS2GC_BeginMatchRet = (function() {

        function CS2GC_BeginMatchRet(properties) {
            this.playerInfos = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        CS2GC_BeginMatchRet.prototype.opts = null;
        CS2GC_BeginMatchRet.prototype.result = 0;
        CS2GC_BeginMatchRet.prototype.id = 0;
        CS2GC_BeginMatchRet.prototype.mapID = 0;
        CS2GC_BeginMatchRet.prototype.maxPlayer = 0;
        CS2GC_BeginMatchRet.prototype.playerInfos = $util.emptyArray;

        CS2GC_BeginMatchRet.create = function create(properties) {
            return new CS2GC_BeginMatchRet(properties);
        };

        CS2GC_BeginMatchRet.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.opts != null && message.hasOwnProperty("opts"))
                $root.Protos.MsgOpts.encode(message.opts, writer.uint32(10).fork()).ldelim();
            if (message.result != null && message.hasOwnProperty("result"))
                writer.uint32(16).int32(message.result);
            if (message.id != null && message.hasOwnProperty("id"))
                writer.uint32(24).uint32(message.id);
            if (message.mapID != null && message.hasOwnProperty("mapID"))
                writer.uint32(32).int32(message.mapID);
            if (message.maxPlayer != null && message.hasOwnProperty("maxPlayer"))
                writer.uint32(40).int32(message.maxPlayer);
            if (message.playerInfos != null && message.playerInfos.length)
                for (let i = 0; i < message.playerInfos.length; ++i)
                    $root.Protos.CS2GC_PlayerInfo.encode(message.playerInfos[i], writer.uint32(50).fork()).ldelim();
            return writer;
        };

        CS2GC_BeginMatchRet.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        CS2GC_BeginMatchRet.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.CS2GC_BeginMatchRet();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.result = reader.int32();
                    break;
                case 3:
                    message.id = reader.uint32();
                    break;
                case 4:
                    message.mapID = reader.int32();
                    break;
                case 5:
                    message.maxPlayer = reader.int32();
                    break;
                case 6:
                    if (!(message.playerInfos && message.playerInfos.length))
                        message.playerInfos = [];
                    message.playerInfos.push($root.Protos.CS2GC_PlayerInfo.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        CS2GC_BeginMatchRet.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        CS2GC_BeginMatchRet.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.opts != null && message.hasOwnProperty("opts")) {
                let error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            if (message.result != null && message.hasOwnProperty("result"))
                switch (message.result) {
                default:
                    return "result: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    break;
                }
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isInteger(message.id))
                    return "id: integer expected";
            if (message.mapID != null && message.hasOwnProperty("mapID"))
                if (!$util.isInteger(message.mapID))
                    return "mapID: integer expected";
            if (message.maxPlayer != null && message.hasOwnProperty("maxPlayer"))
                if (!$util.isInteger(message.maxPlayer))
                    return "maxPlayer: integer expected";
            if (message.playerInfos != null && message.hasOwnProperty("playerInfos")) {
                if (!Array.isArray(message.playerInfos))
                    return "playerInfos: array expected";
                for (let i = 0; i < message.playerInfos.length; ++i) {
                    let error = $root.Protos.CS2GC_PlayerInfo.verify(message.playerInfos[i]);
                    if (error)
                        return "playerInfos." + error;
                }
            }
            return null;
        };

        CS2GC_BeginMatchRet.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.CS2GC_BeginMatchRet)
                return object;
            let message = new $root.Protos.CS2GC_BeginMatchRet();
            if (object.opts != null) {
                if (typeof object.opts !== "object")
                    throw TypeError(".Protos.CS2GC_BeginMatchRet.opts: object expected");
                message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
            }
            switch (object.result) {
            case "Success":
            case 0:
                message.result = 0;
                break;
            case "Failed":
            case 1:
                message.result = 1;
                break;
            case "IllegalID":
            case 2:
                message.result = 2;
                break;
            case "NoRoom":
            case 3:
                message.result = 3;
                break;
            case "UserInBattle":
            case 4:
                message.result = 4;
                break;
            case "UserInRoom":
            case 5:
                message.result = 5;
                break;
            }
            if (object.id != null)
                message.id = object.id >>> 0;
            if (object.mapID != null)
                message.mapID = object.mapID | 0;
            if (object.maxPlayer != null)
                message.maxPlayer = object.maxPlayer | 0;
            if (object.playerInfos) {
                if (!Array.isArray(object.playerInfos))
                    throw TypeError(".Protos.CS2GC_BeginMatchRet.playerInfos: array expected");
                message.playerInfos = [];
                for (let i = 0; i < object.playerInfos.length; ++i) {
                    if (typeof object.playerInfos[i] !== "object")
                        throw TypeError(".Protos.CS2GC_BeginMatchRet.playerInfos: object expected");
                    message.playerInfos[i] = $root.Protos.CS2GC_PlayerInfo.fromObject(object.playerInfos[i]);
                }
            }
            return message;
        };

        CS2GC_BeginMatchRet.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.playerInfos = [];
            if (options.defaults) {
                object.opts = null;
                object.result = options.enums === String ? "Success" : 0;
                object.id = 0;
                object.mapID = 0;
                object.maxPlayer = 0;
            }
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            if (message.result != null && message.hasOwnProperty("result"))
                object.result = options.enums === String ? $root.Protos.CS2GC_BeginMatchRet.EResult[message.result] : message.result;
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.mapID != null && message.hasOwnProperty("mapID"))
                object.mapID = message.mapID;
            if (message.maxPlayer != null && message.hasOwnProperty("maxPlayer"))
                object.maxPlayer = message.maxPlayer;
            if (message.playerInfos && message.playerInfos.length) {
                object.playerInfos = [];
                for (let j = 0; j < message.playerInfos.length; ++j)
                    object.playerInfos[j] = $root.Protos.CS2GC_PlayerInfo.toObject(message.playerInfos[j], options);
            }
            return object;
        };

        CS2GC_BeginMatchRet.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        CS2GC_BeginMatchRet.EResult = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "Success"] = 0;
            values[valuesById[1] = "Failed"] = 1;
            values[valuesById[2] = "IllegalID"] = 2;
            values[valuesById[3] = "NoRoom"] = 3;
            values[valuesById[4] = "UserInBattle"] = 4;
            values[valuesById[5] = "UserInRoom"] = 5;
            return values;
        })();

        return CS2GC_BeginMatchRet;
    })();

    Protos.CS2GC_PlayerInfo = (function() {

        function CS2GC_PlayerInfo(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        CS2GC_PlayerInfo.prototype.gcNID = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
        CS2GC_PlayerInfo.prototype.name = "";
        CS2GC_PlayerInfo.prototype.actorID = 0;

        CS2GC_PlayerInfo.create = function create(properties) {
            return new CS2GC_PlayerInfo(properties);
        };

        CS2GC_PlayerInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.gcNID != null && message.hasOwnProperty("gcNID"))
                writer.uint32(8).uint64(message.gcNID);
            if (message.name != null && message.hasOwnProperty("name"))
                writer.uint32(18).string(message.name);
            if (message.actorID != null && message.hasOwnProperty("actorID"))
                writer.uint32(24).int32(message.actorID);
            return writer;
        };

        CS2GC_PlayerInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        CS2GC_PlayerInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.CS2GC_PlayerInfo();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.gcNID = reader.uint64();
                    break;
                case 2:
                    message.name = reader.string();
                    break;
                case 3:
                    message.actorID = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        CS2GC_PlayerInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        CS2GC_PlayerInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.gcNID != null && message.hasOwnProperty("gcNID"))
                if (!$util.isInteger(message.gcNID) && !(message.gcNID && $util.isInteger(message.gcNID.low) && $util.isInteger(message.gcNID.high)))
                    return "gcNID: integer|Long expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.actorID != null && message.hasOwnProperty("actorID"))
                if (!$util.isInteger(message.actorID))
                    return "actorID: integer expected";
            return null;
        };

        CS2GC_PlayerInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.CS2GC_PlayerInfo)
                return object;
            let message = new $root.Protos.CS2GC_PlayerInfo();
            if (object.gcNID != null)
                if ($util.Long)
                    (message.gcNID = $util.Long.fromValue(object.gcNID)).unsigned = true;
                else if (typeof object.gcNID === "string")
                    message.gcNID = parseInt(object.gcNID, 10);
                else if (typeof object.gcNID === "number")
                    message.gcNID = object.gcNID;
                else if (typeof object.gcNID === "object")
                    message.gcNID = new $util.LongBits(object.gcNID.low >>> 0, object.gcNID.high >>> 0).toNumber(true);
            if (object.name != null)
                message.name = String(object.name);
            if (object.actorID != null)
                message.actorID = object.actorID | 0;
            return message;
        };

        CS2GC_PlayerInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.gcNID = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.gcNID = options.longs === String ? "0" : 0;
                object.name = "";
                object.actorID = 0;
            }
            if (message.gcNID != null && message.hasOwnProperty("gcNID"))
                if (typeof message.gcNID === "number")
                    object.gcNID = options.longs === String ? String(message.gcNID) : message.gcNID;
                else
                    object.gcNID = options.longs === String ? $util.Long.prototype.toString.call(message.gcNID) : options.longs === Number ? new $util.LongBits(message.gcNID.low >>> 0, message.gcNID.high >>> 0).toNumber(true) : message.gcNID;
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.actorID != null && message.hasOwnProperty("actorID"))
                object.actorID = message.actorID;
            return object;
        };

        CS2GC_PlayerInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CS2GC_PlayerInfo;
    })();

    Protos.CS2GC_PlayerJoin = (function() {

        function CS2GC_PlayerJoin(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        CS2GC_PlayerJoin.prototype.opts = null;
        CS2GC_PlayerJoin.prototype.playerInfos = null;

        CS2GC_PlayerJoin.create = function create(properties) {
            return new CS2GC_PlayerJoin(properties);
        };

        CS2GC_PlayerJoin.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.opts != null && message.hasOwnProperty("opts"))
                $root.Protos.MsgOpts.encode(message.opts, writer.uint32(10).fork()).ldelim();
            if (message.playerInfos != null && message.hasOwnProperty("playerInfos"))
                $root.Protos.CS2GC_PlayerInfo.encode(message.playerInfos, writer.uint32(18).fork()).ldelim();
            return writer;
        };

        CS2GC_PlayerJoin.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        CS2GC_PlayerJoin.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.CS2GC_PlayerJoin();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.playerInfos = $root.Protos.CS2GC_PlayerInfo.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        CS2GC_PlayerJoin.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        CS2GC_PlayerJoin.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.opts != null && message.hasOwnProperty("opts")) {
                let error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            if (message.playerInfos != null && message.hasOwnProperty("playerInfos")) {
                let error = $root.Protos.CS2GC_PlayerInfo.verify(message.playerInfos);
                if (error)
                    return "playerInfos." + error;
            }
            return null;
        };

        CS2GC_PlayerJoin.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.CS2GC_PlayerJoin)
                return object;
            let message = new $root.Protos.CS2GC_PlayerJoin();
            if (object.opts != null) {
                if (typeof object.opts !== "object")
                    throw TypeError(".Protos.CS2GC_PlayerJoin.opts: object expected");
                message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
            }
            if (object.playerInfos != null) {
                if (typeof object.playerInfos !== "object")
                    throw TypeError(".Protos.CS2GC_PlayerJoin.playerInfos: object expected");
                message.playerInfos = $root.Protos.CS2GC_PlayerInfo.fromObject(object.playerInfos);
            }
            return message;
        };

        CS2GC_PlayerJoin.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.opts = null;
                object.playerInfos = null;
            }
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            if (message.playerInfos != null && message.hasOwnProperty("playerInfos"))
                object.playerInfos = $root.Protos.CS2GC_PlayerInfo.toObject(message.playerInfos, options);
            return object;
        };

        CS2GC_PlayerJoin.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CS2GC_PlayerJoin;
    })();

    Protos.CS2GC_PlayerLeave = (function() {

        function CS2GC_PlayerLeave(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        CS2GC_PlayerLeave.prototype.opts = null;
        CS2GC_PlayerLeave.prototype.gcNID = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        CS2GC_PlayerLeave.create = function create(properties) {
            return new CS2GC_PlayerLeave(properties);
        };

        CS2GC_PlayerLeave.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.opts != null && message.hasOwnProperty("opts"))
                $root.Protos.MsgOpts.encode(message.opts, writer.uint32(10).fork()).ldelim();
            if (message.gcNID != null && message.hasOwnProperty("gcNID"))
                writer.uint32(16).uint64(message.gcNID);
            return writer;
        };

        CS2GC_PlayerLeave.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        CS2GC_PlayerLeave.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.CS2GC_PlayerLeave();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.gcNID = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        CS2GC_PlayerLeave.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        CS2GC_PlayerLeave.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.opts != null && message.hasOwnProperty("opts")) {
                let error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            if (message.gcNID != null && message.hasOwnProperty("gcNID"))
                if (!$util.isInteger(message.gcNID) && !(message.gcNID && $util.isInteger(message.gcNID.low) && $util.isInteger(message.gcNID.high)))
                    return "gcNID: integer|Long expected";
            return null;
        };

        CS2GC_PlayerLeave.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.CS2GC_PlayerLeave)
                return object;
            let message = new $root.Protos.CS2GC_PlayerLeave();
            if (object.opts != null) {
                if (typeof object.opts !== "object")
                    throw TypeError(".Protos.CS2GC_PlayerLeave.opts: object expected");
                message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
            }
            if (object.gcNID != null)
                if ($util.Long)
                    (message.gcNID = $util.Long.fromValue(object.gcNID)).unsigned = true;
                else if (typeof object.gcNID === "string")
                    message.gcNID = parseInt(object.gcNID, 10);
                else if (typeof object.gcNID === "number")
                    message.gcNID = object.gcNID;
                else if (typeof object.gcNID === "object")
                    message.gcNID = new $util.LongBits(object.gcNID.low >>> 0, object.gcNID.high >>> 0).toNumber(true);
            return message;
        };

        CS2GC_PlayerLeave.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.opts = null;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.gcNID = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.gcNID = options.longs === String ? "0" : 0;
            }
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            if (message.gcNID != null && message.hasOwnProperty("gcNID"))
                if (typeof message.gcNID === "number")
                    object.gcNID = options.longs === String ? String(message.gcNID) : message.gcNID;
                else
                    object.gcNID = options.longs === String ? $util.Long.prototype.toString.call(message.gcNID) : options.longs === Number ? new $util.LongBits(message.gcNID.low >>> 0, message.gcNID.high >>> 0).toNumber(true) : message.gcNID;
            return object;
        };

        CS2GC_PlayerLeave.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CS2GC_PlayerLeave;
    })();

    Protos.CS2GC_RoomInfo = (function() {

        function CS2GC_RoomInfo(properties) {
            this.playerInfos = [];
            this.progresses = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        CS2GC_RoomInfo.prototype.opts = null;
        CS2GC_RoomInfo.prototype.playerInfos = $util.emptyArray;
        CS2GC_RoomInfo.prototype.progresses = $util.emptyArray;

        CS2GC_RoomInfo.create = function create(properties) {
            return new CS2GC_RoomInfo(properties);
        };

        CS2GC_RoomInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.opts != null && message.hasOwnProperty("opts"))
                $root.Protos.MsgOpts.encode(message.opts, writer.uint32(10).fork()).ldelim();
            if (message.playerInfos != null && message.playerInfos.length)
                for (let i = 0; i < message.playerInfos.length; ++i)
                    $root.Protos.CS2GC_PlayerInfo.encode(message.playerInfos[i], writer.uint32(18).fork()).ldelim();
            if (message.progresses != null && message.progresses.length) {
                writer.uint32(26).fork();
                for (let i = 0; i < message.progresses.length; ++i)
                    writer.int32(message.progresses[i]);
                writer.ldelim();
            }
            return writer;
        };

        CS2GC_RoomInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        CS2GC_RoomInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.CS2GC_RoomInfo();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                    break;
                case 2:
                    if (!(message.playerInfos && message.playerInfos.length))
                        message.playerInfos = [];
                    message.playerInfos.push($root.Protos.CS2GC_PlayerInfo.decode(reader, reader.uint32()));
                    break;
                case 3:
                    if (!(message.progresses && message.progresses.length))
                        message.progresses = [];
                    if ((tag & 7) === 2) {
                        let end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.progresses.push(reader.int32());
                    } else
                        message.progresses.push(reader.int32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        CS2GC_RoomInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        CS2GC_RoomInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.opts != null && message.hasOwnProperty("opts")) {
                let error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            if (message.playerInfos != null && message.hasOwnProperty("playerInfos")) {
                if (!Array.isArray(message.playerInfos))
                    return "playerInfos: array expected";
                for (let i = 0; i < message.playerInfos.length; ++i) {
                    let error = $root.Protos.CS2GC_PlayerInfo.verify(message.playerInfos[i]);
                    if (error)
                        return "playerInfos." + error;
                }
            }
            if (message.progresses != null && message.hasOwnProperty("progresses")) {
                if (!Array.isArray(message.progresses))
                    return "progresses: array expected";
                for (let i = 0; i < message.progresses.length; ++i)
                    if (!$util.isInteger(message.progresses[i]))
                        return "progresses: integer[] expected";
            }
            return null;
        };

        CS2GC_RoomInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.CS2GC_RoomInfo)
                return object;
            let message = new $root.Protos.CS2GC_RoomInfo();
            if (object.opts != null) {
                if (typeof object.opts !== "object")
                    throw TypeError(".Protos.CS2GC_RoomInfo.opts: object expected");
                message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
            }
            if (object.playerInfos) {
                if (!Array.isArray(object.playerInfos))
                    throw TypeError(".Protos.CS2GC_RoomInfo.playerInfos: array expected");
                message.playerInfos = [];
                for (let i = 0; i < object.playerInfos.length; ++i) {
                    if (typeof object.playerInfos[i] !== "object")
                        throw TypeError(".Protos.CS2GC_RoomInfo.playerInfos: object expected");
                    message.playerInfos[i] = $root.Protos.CS2GC_PlayerInfo.fromObject(object.playerInfos[i]);
                }
            }
            if (object.progresses) {
                if (!Array.isArray(object.progresses))
                    throw TypeError(".Protos.CS2GC_RoomInfo.progresses: array expected");
                message.progresses = [];
                for (let i = 0; i < object.progresses.length; ++i)
                    message.progresses[i] = object.progresses[i] | 0;
            }
            return message;
        };

        CS2GC_RoomInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults) {
                object.playerInfos = [];
                object.progresses = [];
            }
            if (options.defaults)
                object.opts = null;
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            if (message.playerInfos && message.playerInfos.length) {
                object.playerInfos = [];
                for (let j = 0; j < message.playerInfos.length; ++j)
                    object.playerInfos[j] = $root.Protos.CS2GC_PlayerInfo.toObject(message.playerInfos[j], options);
            }
            if (message.progresses && message.progresses.length) {
                object.progresses = [];
                for (let j = 0; j < message.progresses.length; ++j)
                    object.progresses[j] = message.progresses[j];
            }
            return object;
        };

        CS2GC_RoomInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CS2GC_RoomInfo;
    })();

    Protos.CS2GC_EnterBattle = (function() {

        function CS2GC_EnterBattle(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        CS2GC_EnterBattle.prototype.opts = null;
        CS2GC_EnterBattle.prototype.gcNID = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
        CS2GC_EnterBattle.prototype.ip = "";
        CS2GC_EnterBattle.prototype.port = 0;
        CS2GC_EnterBattle.prototype.error = 0;

        CS2GC_EnterBattle.create = function create(properties) {
            return new CS2GC_EnterBattle(properties);
        };

        CS2GC_EnterBattle.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.opts != null && message.hasOwnProperty("opts"))
                $root.Protos.MsgOpts.encode(message.opts, writer.uint32(10).fork()).ldelim();
            if (message.gcNID != null && message.hasOwnProperty("gcNID"))
                writer.uint32(16).uint64(message.gcNID);
            if (message.ip != null && message.hasOwnProperty("ip"))
                writer.uint32(26).string(message.ip);
            if (message.port != null && message.hasOwnProperty("port"))
                writer.uint32(32).int32(message.port);
            if (message.error != null && message.hasOwnProperty("error"))
                writer.uint32(40).int32(message.error);
            return writer;
        };

        CS2GC_EnterBattle.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        CS2GC_EnterBattle.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.CS2GC_EnterBattle();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.gcNID = reader.uint64();
                    break;
                case 3:
                    message.ip = reader.string();
                    break;
                case 4:
                    message.port = reader.int32();
                    break;
                case 5:
                    message.error = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        CS2GC_EnterBattle.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        CS2GC_EnterBattle.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.opts != null && message.hasOwnProperty("opts")) {
                let error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            if (message.gcNID != null && message.hasOwnProperty("gcNID"))
                if (!$util.isInteger(message.gcNID) && !(message.gcNID && $util.isInteger(message.gcNID.low) && $util.isInteger(message.gcNID.high)))
                    return "gcNID: integer|Long expected";
            if (message.ip != null && message.hasOwnProperty("ip"))
                if (!$util.isString(message.ip))
                    return "ip: string expected";
            if (message.port != null && message.hasOwnProperty("port"))
                if (!$util.isInteger(message.port))
                    return "port: integer expected";
            if (message.error != null && message.hasOwnProperty("error"))
                switch (message.error) {
                default:
                    return "error: enum value expected";
                case 0:
                case 1:
                case 2:
                    break;
                }
            return null;
        };

        CS2GC_EnterBattle.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.CS2GC_EnterBattle)
                return object;
            let message = new $root.Protos.CS2GC_EnterBattle();
            if (object.opts != null) {
                if (typeof object.opts !== "object")
                    throw TypeError(".Protos.CS2GC_EnterBattle.opts: object expected");
                message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
            }
            if (object.gcNID != null)
                if ($util.Long)
                    (message.gcNID = $util.Long.fromValue(object.gcNID)).unsigned = true;
                else if (typeof object.gcNID === "string")
                    message.gcNID = parseInt(object.gcNID, 10);
                else if (typeof object.gcNID === "number")
                    message.gcNID = object.gcNID;
                else if (typeof object.gcNID === "object")
                    message.gcNID = new $util.LongBits(object.gcNID.low >>> 0, object.gcNID.high >>> 0).toNumber(true);
            if (object.ip != null)
                message.ip = String(object.ip);
            if (object.port != null)
                message.port = object.port | 0;
            switch (object.error) {
            case "Success":
            case 0:
                message.error = 0;
                break;
            case "BSNotFound":
            case 1:
                message.error = 1;
                break;
            case "BSLost":
            case 2:
                message.error = 2;
                break;
            }
            return message;
        };

        CS2GC_EnterBattle.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.opts = null;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.gcNID = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.gcNID = options.longs === String ? "0" : 0;
                object.ip = "";
                object.port = 0;
                object.error = options.enums === String ? "Success" : 0;
            }
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            if (message.gcNID != null && message.hasOwnProperty("gcNID"))
                if (typeof message.gcNID === "number")
                    object.gcNID = options.longs === String ? String(message.gcNID) : message.gcNID;
                else
                    object.gcNID = options.longs === String ? $util.Long.prototype.toString.call(message.gcNID) : options.longs === Number ? new $util.LongBits(message.gcNID.low >>> 0, message.gcNID.high >>> 0).toNumber(true) : message.gcNID;
            if (message.ip != null && message.hasOwnProperty("ip"))
                object.ip = message.ip;
            if (message.port != null && message.hasOwnProperty("port"))
                object.port = message.port;
            if (message.error != null && message.hasOwnProperty("error"))
                object.error = options.enums === String ? $root.Protos.CS2GC_EnterBattle.Error[message.error] : message.error;
            return object;
        };

        CS2GC_EnterBattle.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        CS2GC_EnterBattle.Error = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "Success"] = 0;
            values[valuesById[1] = "BSNotFound"] = 1;
            values[valuesById[2] = "BSLost"] = 2;
            return values;
        })();

        return CS2GC_EnterBattle;
    })();

    Protos.CS2GS_GCLoginRet = (function() {

        function CS2GS_GCLoginRet(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        CS2GS_GCLoginRet.prototype.opts = null;
        CS2GS_GCLoginRet.prototype.result = 0;
        CS2GS_GCLoginRet.prototype.gcState = 0;
        CS2GS_GCLoginRet.prototype.gcNID = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
        CS2GS_GCLoginRet.prototype.bsIP = "";
        CS2GS_GCLoginRet.prototype.bsPort = 0;

        CS2GS_GCLoginRet.create = function create(properties) {
            return new CS2GS_GCLoginRet(properties);
        };

        CS2GS_GCLoginRet.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.opts != null && message.hasOwnProperty("opts"))
                $root.Protos.MsgOpts.encode(message.opts, writer.uint32(10).fork()).ldelim();
            if (message.result != null && message.hasOwnProperty("result"))
                writer.uint32(16).int32(message.result);
            if (message.gcState != null && message.hasOwnProperty("gcState"))
                writer.uint32(24).int32(message.gcState);
            if (message.gcNID != null && message.hasOwnProperty("gcNID"))
                writer.uint32(32).uint64(message.gcNID);
            if (message.bsIP != null && message.hasOwnProperty("bsIP"))
                writer.uint32(42).string(message.bsIP);
            if (message.bsPort != null && message.hasOwnProperty("bsPort"))
                writer.uint32(48).int32(message.bsPort);
            return writer;
        };

        CS2GS_GCLoginRet.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        CS2GS_GCLoginRet.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.CS2GS_GCLoginRet();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.result = reader.int32();
                    break;
                case 3:
                    message.gcState = reader.int32();
                    break;
                case 4:
                    message.gcNID = reader.uint64();
                    break;
                case 5:
                    message.bsIP = reader.string();
                    break;
                case 6:
                    message.bsPort = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        CS2GS_GCLoginRet.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        CS2GS_GCLoginRet.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.opts != null && message.hasOwnProperty("opts")) {
                let error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            if (message.result != null && message.hasOwnProperty("result"))
                switch (message.result) {
                default:
                    return "result: enum value expected";
                case 0:
                case 1:
                    break;
                }
            if (message.gcState != null && message.hasOwnProperty("gcState"))
                switch (message.gcState) {
                default:
                    return "gcState: enum value expected";
                case 0:
                case 1:
                    break;
                }
            if (message.gcNID != null && message.hasOwnProperty("gcNID"))
                if (!$util.isInteger(message.gcNID) && !(message.gcNID && $util.isInteger(message.gcNID.low) && $util.isInteger(message.gcNID.high)))
                    return "gcNID: integer|Long expected";
            if (message.bsIP != null && message.hasOwnProperty("bsIP"))
                if (!$util.isString(message.bsIP))
                    return "bsIP: string expected";
            if (message.bsPort != null && message.hasOwnProperty("bsPort"))
                if (!$util.isInteger(message.bsPort))
                    return "bsPort: integer expected";
            return null;
        };

        CS2GS_GCLoginRet.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.CS2GS_GCLoginRet)
                return object;
            let message = new $root.Protos.CS2GS_GCLoginRet();
            if (object.opts != null) {
                if (typeof object.opts !== "object")
                    throw TypeError(".Protos.CS2GS_GCLoginRet.opts: object expected");
                message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
            }
            switch (object.result) {
            case "Success":
            case 0:
                message.result = 0;
                break;
            case "IllegalLogin":
            case 1:
                message.result = 1;
                break;
            }
            switch (object.gcState) {
            case "Idle":
            case 0:
                message.gcState = 0;
                break;
            case "Battle":
            case 1:
                message.gcState = 1;
                break;
            }
            if (object.gcNID != null)
                if ($util.Long)
                    (message.gcNID = $util.Long.fromValue(object.gcNID)).unsigned = true;
                else if (typeof object.gcNID === "string")
                    message.gcNID = parseInt(object.gcNID, 10);
                else if (typeof object.gcNID === "number")
                    message.gcNID = object.gcNID;
                else if (typeof object.gcNID === "object")
                    message.gcNID = new $util.LongBits(object.gcNID.low >>> 0, object.gcNID.high >>> 0).toNumber(true);
            if (object.bsIP != null)
                message.bsIP = String(object.bsIP);
            if (object.bsPort != null)
                message.bsPort = object.bsPort | 0;
            return message;
        };

        CS2GS_GCLoginRet.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.opts = null;
                object.result = options.enums === String ? "Success" : 0;
                object.gcState = options.enums === String ? "Idle" : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.gcNID = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.gcNID = options.longs === String ? "0" : 0;
                object.bsIP = "";
                object.bsPort = 0;
            }
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            if (message.result != null && message.hasOwnProperty("result"))
                object.result = options.enums === String ? $root.Protos.CS2GS_GCLoginRet.EResult[message.result] : message.result;
            if (message.gcState != null && message.hasOwnProperty("gcState"))
                object.gcState = options.enums === String ? $root.Protos.CS2GS_GCLoginRet.EGCCState[message.gcState] : message.gcState;
            if (message.gcNID != null && message.hasOwnProperty("gcNID"))
                if (typeof message.gcNID === "number")
                    object.gcNID = options.longs === String ? String(message.gcNID) : message.gcNID;
                else
                    object.gcNID = options.longs === String ? $util.Long.prototype.toString.call(message.gcNID) : options.longs === Number ? new $util.LongBits(message.gcNID.low >>> 0, message.gcNID.high >>> 0).toNumber(true) : message.gcNID;
            if (message.bsIP != null && message.hasOwnProperty("bsIP"))
                object.bsIP = message.bsIP;
            if (message.bsPort != null && message.hasOwnProperty("bsPort"))
                object.bsPort = message.bsPort;
            return object;
        };

        CS2GS_GCLoginRet.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        CS2GS_GCLoginRet.EResult = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "Success"] = 0;
            values[valuesById[1] = "IllegalLogin"] = 1;
            return values;
        })();

        CS2GS_GCLoginRet.EGCCState = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "Idle"] = 0;
            values[valuesById[1] = "Battle"] = 1;
            return values;
        })();

        return CS2GS_GCLoginRet;
    })();

    Protos.CS2GS_KickGC = (function() {

        function CS2GS_KickGC(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        CS2GS_KickGC.prototype.opts = null;
        CS2GS_KickGC.prototype.gcNID = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
        CS2GS_KickGC.prototype.reason = 0;

        CS2GS_KickGC.create = function create(properties) {
            return new CS2GS_KickGC(properties);
        };

        CS2GS_KickGC.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.opts != null && message.hasOwnProperty("opts"))
                $root.Protos.MsgOpts.encode(message.opts, writer.uint32(10).fork()).ldelim();
            if (message.gcNID != null && message.hasOwnProperty("gcNID"))
                writer.uint32(16).uint64(message.gcNID);
            if (message.reason != null && message.hasOwnProperty("reason"))
                writer.uint32(24).int32(message.reason);
            return writer;
        };

        CS2GS_KickGC.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        CS2GS_KickGC.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.CS2GS_KickGC();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.gcNID = reader.uint64();
                    break;
                case 3:
                    message.reason = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        CS2GS_KickGC.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        CS2GS_KickGC.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.opts != null && message.hasOwnProperty("opts")) {
                let error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            if (message.gcNID != null && message.hasOwnProperty("gcNID"))
                if (!$util.isInteger(message.gcNID) && !(message.gcNID && $util.isInteger(message.gcNID.low) && $util.isInteger(message.gcNID.high)))
                    return "gcNID: integer|Long expected";
            if (message.reason != null && message.hasOwnProperty("reason"))
                switch (message.reason) {
                default:
                    return "reason: enum value expected";
                case 0:
                case 1:
                    break;
                }
            return null;
        };

        CS2GS_KickGC.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.CS2GS_KickGC)
                return object;
            let message = new $root.Protos.CS2GS_KickGC();
            if (object.opts != null) {
                if (typeof object.opts !== "object")
                    throw TypeError(".Protos.CS2GS_KickGC.opts: object expected");
                message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
            }
            if (object.gcNID != null)
                if ($util.Long)
                    (message.gcNID = $util.Long.fromValue(object.gcNID)).unsigned = true;
                else if (typeof object.gcNID === "string")
                    message.gcNID = parseInt(object.gcNID, 10);
                else if (typeof object.gcNID === "number")
                    message.gcNID = object.gcNID;
                else if (typeof object.gcNID === "object")
                    message.gcNID = new $util.LongBits(object.gcNID.low >>> 0, object.gcNID.high >>> 0).toNumber(true);
            switch (object.reason) {
            case "DuplicateLogin":
            case 0:
                message.reason = 0;
                break;
            case "Other":
            case 1:
                message.reason = 1;
                break;
            }
            return message;
        };

        CS2GS_KickGC.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.opts = null;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.gcNID = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.gcNID = options.longs === String ? "0" : 0;
                object.reason = options.enums === String ? "DuplicateLogin" : 0;
            }
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            if (message.gcNID != null && message.hasOwnProperty("gcNID"))
                if (typeof message.gcNID === "number")
                    object.gcNID = options.longs === String ? String(message.gcNID) : message.gcNID;
                else
                    object.gcNID = options.longs === String ? $util.Long.prototype.toString.call(message.gcNID) : options.longs === Number ? new $util.LongBits(message.gcNID.low >>> 0, message.gcNID.high >>> 0).toNumber(true) : message.gcNID;
            if (message.reason != null && message.hasOwnProperty("reason"))
                object.reason = options.enums === String ? $root.Protos.CS2GS_KickGC.EReason[message.reason] : message.reason;
            return object;
        };

        CS2GS_KickGC.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        CS2GS_KickGC.EReason = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "DuplicateLogin"] = 0;
            values[valuesById[1] = "Other"] = 1;
            return values;
        })();

        return CS2GS_KickGC;
    })();

    Protos.CS2LS_GSInfos = (function() {

        function CS2LS_GSInfos(properties) {
            this.gsInfo = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        CS2LS_GSInfos.prototype.opts = null;
        CS2LS_GSInfos.prototype.gsInfo = $util.emptyArray;

        CS2LS_GSInfos.create = function create(properties) {
            return new CS2LS_GSInfos(properties);
        };

        CS2LS_GSInfos.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.opts != null && message.hasOwnProperty("opts"))
                $root.Protos.MsgOpts.encode(message.opts, writer.uint32(10).fork()).ldelim();
            if (message.gsInfo != null && message.gsInfo.length)
                for (let i = 0; i < message.gsInfo.length; ++i)
                    $root.Protos.GSInfo.encode(message.gsInfo[i], writer.uint32(18).fork()).ldelim();
            return writer;
        };

        CS2LS_GSInfos.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        CS2LS_GSInfos.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.CS2LS_GSInfos();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                    break;
                case 2:
                    if (!(message.gsInfo && message.gsInfo.length))
                        message.gsInfo = [];
                    message.gsInfo.push($root.Protos.GSInfo.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        CS2LS_GSInfos.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        CS2LS_GSInfos.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.opts != null && message.hasOwnProperty("opts")) {
                let error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            if (message.gsInfo != null && message.hasOwnProperty("gsInfo")) {
                if (!Array.isArray(message.gsInfo))
                    return "gsInfo: array expected";
                for (let i = 0; i < message.gsInfo.length; ++i) {
                    let error = $root.Protos.GSInfo.verify(message.gsInfo[i]);
                    if (error)
                        return "gsInfo." + error;
                }
            }
            return null;
        };

        CS2LS_GSInfos.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.CS2LS_GSInfos)
                return object;
            let message = new $root.Protos.CS2LS_GSInfos();
            if (object.opts != null) {
                if (typeof object.opts !== "object")
                    throw TypeError(".Protos.CS2LS_GSInfos.opts: object expected");
                message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
            }
            if (object.gsInfo) {
                if (!Array.isArray(object.gsInfo))
                    throw TypeError(".Protos.CS2LS_GSInfos.gsInfo: array expected");
                message.gsInfo = [];
                for (let i = 0; i < object.gsInfo.length; ++i) {
                    if (typeof object.gsInfo[i] !== "object")
                        throw TypeError(".Protos.CS2LS_GSInfos.gsInfo: object expected");
                    message.gsInfo[i] = $root.Protos.GSInfo.fromObject(object.gsInfo[i]);
                }
            }
            return message;
        };

        CS2LS_GSInfos.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.gsInfo = [];
            if (options.defaults)
                object.opts = null;
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            if (message.gsInfo && message.gsInfo.length) {
                object.gsInfo = [];
                for (let j = 0; j < message.gsInfo.length; ++j)
                    object.gsInfo[j] = $root.Protos.GSInfo.toObject(message.gsInfo[j], options);
            }
            return object;
        };

        CS2LS_GSInfos.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CS2LS_GSInfos;
    })();

    Protos.CS2LS_GSInfo = (function() {

        function CS2LS_GSInfo(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        CS2LS_GSInfo.prototype.opts = null;
        CS2LS_GSInfo.prototype.gsInfo = null;

        CS2LS_GSInfo.create = function create(properties) {
            return new CS2LS_GSInfo(properties);
        };

        CS2LS_GSInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.opts != null && message.hasOwnProperty("opts"))
                $root.Protos.MsgOpts.encode(message.opts, writer.uint32(10).fork()).ldelim();
            if (message.gsInfo != null && message.hasOwnProperty("gsInfo"))
                $root.Protos.GSInfo.encode(message.gsInfo, writer.uint32(18).fork()).ldelim();
            return writer;
        };

        CS2LS_GSInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        CS2LS_GSInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.CS2LS_GSInfo();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.gsInfo = $root.Protos.GSInfo.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        CS2LS_GSInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        CS2LS_GSInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.opts != null && message.hasOwnProperty("opts")) {
                let error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            if (message.gsInfo != null && message.hasOwnProperty("gsInfo")) {
                let error = $root.Protos.GSInfo.verify(message.gsInfo);
                if (error)
                    return "gsInfo." + error;
            }
            return null;
        };

        CS2LS_GSInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.CS2LS_GSInfo)
                return object;
            let message = new $root.Protos.CS2LS_GSInfo();
            if (object.opts != null) {
                if (typeof object.opts !== "object")
                    throw TypeError(".Protos.CS2LS_GSInfo.opts: object expected");
                message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
            }
            if (object.gsInfo != null) {
                if (typeof object.gsInfo !== "object")
                    throw TypeError(".Protos.CS2LS_GSInfo.gsInfo: object expected");
                message.gsInfo = $root.Protos.GSInfo.fromObject(object.gsInfo);
            }
            return message;
        };

        CS2LS_GSInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.opts = null;
                object.gsInfo = null;
            }
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            if (message.gsInfo != null && message.hasOwnProperty("gsInfo"))
                object.gsInfo = $root.Protos.GSInfo.toObject(message.gsInfo, options);
            return object;
        };

        CS2LS_GSInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CS2LS_GSInfo;
    })();

    Protos.CS2LS_GSLost = (function() {

        function CS2LS_GSLost(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        CS2LS_GSLost.prototype.opts = null;
        CS2LS_GSLost.prototype.gsid = 0;

        CS2LS_GSLost.create = function create(properties) {
            return new CS2LS_GSLost(properties);
        };

        CS2LS_GSLost.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.opts != null && message.hasOwnProperty("opts"))
                $root.Protos.MsgOpts.encode(message.opts, writer.uint32(10).fork()).ldelim();
            if (message.gsid != null && message.hasOwnProperty("gsid"))
                writer.uint32(16).uint32(message.gsid);
            return writer;
        };

        CS2LS_GSLost.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        CS2LS_GSLost.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.CS2LS_GSLost();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.gsid = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        CS2LS_GSLost.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        CS2LS_GSLost.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.opts != null && message.hasOwnProperty("opts")) {
                let error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            if (message.gsid != null && message.hasOwnProperty("gsid"))
                if (!$util.isInteger(message.gsid))
                    return "gsid: integer expected";
            return null;
        };

        CS2LS_GSLost.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.CS2LS_GSLost)
                return object;
            let message = new $root.Protos.CS2LS_GSLost();
            if (object.opts != null) {
                if (typeof object.opts !== "object")
                    throw TypeError(".Protos.CS2LS_GSLost.opts: object expected");
                message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
            }
            if (object.gsid != null)
                message.gsid = object.gsid >>> 0;
            return message;
        };

        CS2LS_GSLost.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.opts = null;
                object.gsid = 0;
            }
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            if (message.gsid != null && message.hasOwnProperty("gsid"))
                object.gsid = message.gsid;
            return object;
        };

        CS2LS_GSLost.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CS2LS_GSLost;
    })();

    Protos.CS2LS_GCLoginRet = (function() {

        function CS2LS_GCLoginRet(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        CS2LS_GCLoginRet.prototype.opts = null;
        CS2LS_GCLoginRet.prototype.result = 0;

        CS2LS_GCLoginRet.create = function create(properties) {
            return new CS2LS_GCLoginRet(properties);
        };

        CS2LS_GCLoginRet.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.opts != null && message.hasOwnProperty("opts"))
                $root.Protos.MsgOpts.encode(message.opts, writer.uint32(10).fork()).ldelim();
            if (message.result != null && message.hasOwnProperty("result"))
                writer.uint32(16).int32(message.result);
            return writer;
        };

        CS2LS_GCLoginRet.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        CS2LS_GCLoginRet.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.CS2LS_GCLoginRet();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.result = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        CS2LS_GCLoginRet.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        CS2LS_GCLoginRet.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.opts != null && message.hasOwnProperty("opts")) {
                let error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            if (message.result != null && message.hasOwnProperty("result"))
                switch (message.result) {
                default:
                    return "result: enum value expected";
                case 0:
                case 1:
                    break;
                }
            return null;
        };

        CS2LS_GCLoginRet.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.CS2LS_GCLoginRet)
                return object;
            let message = new $root.Protos.CS2LS_GCLoginRet();
            if (object.opts != null) {
                if (typeof object.opts !== "object")
                    throw TypeError(".Protos.CS2LS_GCLoginRet.opts: object expected");
                message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
            }
            switch (object.result) {
            case "Success":
            case 0:
                message.result = 0;
                break;
            case "Failed":
            case 1:
                message.result = 1;
                break;
            }
            return message;
        };

        CS2LS_GCLoginRet.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.opts = null;
                object.result = options.enums === String ? "Success" : 0;
            }
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            if (message.result != null && message.hasOwnProperty("result"))
                object.result = options.enums === String ? $root.Protos.CS2LS_GCLoginRet.EResult[message.result] : message.result;
            return object;
        };

        CS2LS_GCLoginRet.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        CS2LS_GCLoginRet.EResult = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "Success"] = 0;
            values[valuesById[1] = "Failed"] = 1;
            return values;
        })();

        return CS2LS_GCLoginRet;
    })();

    Protos.GSInfo = (function() {

        function GSInfo(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        GSInfo.prototype.id = 0;
        GSInfo.prototype.name = "";
        GSInfo.prototype.ip = "";
        GSInfo.prototype.port = 0;
        GSInfo.prototype.password = "";
        GSInfo.prototype.state = 0;

        GSInfo.create = function create(properties) {
            return new GSInfo(properties);
        };

        GSInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && message.hasOwnProperty("id"))
                writer.uint32(8).uint32(message.id);
            if (message.name != null && message.hasOwnProperty("name"))
                writer.uint32(18).string(message.name);
            if (message.ip != null && message.hasOwnProperty("ip"))
                writer.uint32(26).string(message.ip);
            if (message.port != null && message.hasOwnProperty("port"))
                writer.uint32(32).int32(message.port);
            if (message.password != null && message.hasOwnProperty("password"))
                writer.uint32(42).string(message.password);
            if (message.state != null && message.hasOwnProperty("state"))
                writer.uint32(48).int32(message.state);
            return writer;
        };

        GSInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        GSInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.GSInfo();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.uint32();
                    break;
                case 2:
                    message.name = reader.string();
                    break;
                case 3:
                    message.ip = reader.string();
                    break;
                case 4:
                    message.port = reader.int32();
                    break;
                case 5:
                    message.password = reader.string();
                    break;
                case 6:
                    message.state = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        GSInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        GSInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isInteger(message.id))
                    return "id: integer expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.ip != null && message.hasOwnProperty("ip"))
                if (!$util.isString(message.ip))
                    return "ip: string expected";
            if (message.port != null && message.hasOwnProperty("port"))
                if (!$util.isInteger(message.port))
                    return "port: integer expected";
            if (message.password != null && message.hasOwnProperty("password"))
                if (!$util.isString(message.password))
                    return "password: string expected";
            if (message.state != null && message.hasOwnProperty("state"))
                switch (message.state) {
                default:
                    return "state: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                    break;
                }
            return null;
        };

        GSInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.GSInfo)
                return object;
            let message = new $root.Protos.GSInfo();
            if (object.id != null)
                message.id = object.id >>> 0;
            if (object.name != null)
                message.name = String(object.name);
            if (object.ip != null)
                message.ip = String(object.ip);
            if (object.port != null)
                message.port = object.port | 0;
            if (object.password != null)
                message.password = String(object.password);
            switch (object.state) {
            case "Free":
            case 0:
                message.state = 0;
                break;
            case "Busy":
            case 1:
                message.state = 1;
                break;
            case "Full":
            case 2:
                message.state = 2;
                break;
            case "Close":
            case 3:
                message.state = 3;
                break;
            }
            return message;
        };

        GSInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.id = 0;
                object.name = "";
                object.ip = "";
                object.port = 0;
                object.password = "";
                object.state = options.enums === String ? "Free" : 0;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.ip != null && message.hasOwnProperty("ip"))
                object.ip = message.ip;
            if (message.port != null && message.hasOwnProperty("port"))
                object.port = message.port;
            if (message.password != null && message.hasOwnProperty("password"))
                object.password = message.password;
            if (message.state != null && message.hasOwnProperty("state"))
                object.state = options.enums === String ? $root.Protos.GSInfo.State[message.state] : message.state;
            return object;
        };

        GSInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        GSInfo.State = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "Free"] = 0;
            values[valuesById[1] = "Busy"] = 1;
            values[valuesById[2] = "Full"] = 2;
            values[valuesById[3] = "Close"] = 3;
            return values;
        })();

        return GSInfo;
    })();

    Protos.GS2CS_ReportState = (function() {

        function GS2CS_ReportState(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        GS2CS_ReportState.prototype.opts = null;
        GS2CS_ReportState.prototype.gsInfo = null;

        GS2CS_ReportState.create = function create(properties) {
            return new GS2CS_ReportState(properties);
        };

        GS2CS_ReportState.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.opts != null && message.hasOwnProperty("opts"))
                $root.Protos.MsgOpts.encode(message.opts, writer.uint32(10).fork()).ldelim();
            if (message.gsInfo != null && message.hasOwnProperty("gsInfo"))
                $root.Protos.GSInfo.encode(message.gsInfo, writer.uint32(18).fork()).ldelim();
            return writer;
        };

        GS2CS_ReportState.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        GS2CS_ReportState.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.GS2CS_ReportState();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.gsInfo = $root.Protos.GSInfo.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        GS2CS_ReportState.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        GS2CS_ReportState.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.opts != null && message.hasOwnProperty("opts")) {
                let error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            if (message.gsInfo != null && message.hasOwnProperty("gsInfo")) {
                let error = $root.Protos.GSInfo.verify(message.gsInfo);
                if (error)
                    return "gsInfo." + error;
            }
            return null;
        };

        GS2CS_ReportState.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.GS2CS_ReportState)
                return object;
            let message = new $root.Protos.GS2CS_ReportState();
            if (object.opts != null) {
                if (typeof object.opts !== "object")
                    throw TypeError(".Protos.GS2CS_ReportState.opts: object expected");
                message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
            }
            if (object.gsInfo != null) {
                if (typeof object.gsInfo !== "object")
                    throw TypeError(".Protos.GS2CS_ReportState.gsInfo: object expected");
                message.gsInfo = $root.Protos.GSInfo.fromObject(object.gsInfo);
            }
            return message;
        };

        GS2CS_ReportState.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.opts = null;
                object.gsInfo = null;
            }
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            if (message.gsInfo != null && message.hasOwnProperty("gsInfo"))
                object.gsInfo = $root.Protos.GSInfo.toObject(message.gsInfo, options);
            return object;
        };

        GS2CS_ReportState.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GS2CS_ReportState;
    })();

    Protos.GS2CS_GCAskLogin = (function() {

        function GS2CS_GCAskLogin(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        GS2CS_GCAskLogin.prototype.opts = null;
        GS2CS_GCAskLogin.prototype.sessionID = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        GS2CS_GCAskLogin.create = function create(properties) {
            return new GS2CS_GCAskLogin(properties);
        };

        GS2CS_GCAskLogin.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.opts != null && message.hasOwnProperty("opts"))
                $root.Protos.MsgOpts.encode(message.opts, writer.uint32(10).fork()).ldelim();
            if (message.sessionID != null && message.hasOwnProperty("sessionID"))
                writer.uint32(16).uint64(message.sessionID);
            return writer;
        };

        GS2CS_GCAskLogin.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        GS2CS_GCAskLogin.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.GS2CS_GCAskLogin();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.sessionID = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        GS2CS_GCAskLogin.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        GS2CS_GCAskLogin.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.opts != null && message.hasOwnProperty("opts")) {
                let error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            if (message.sessionID != null && message.hasOwnProperty("sessionID"))
                if (!$util.isInteger(message.sessionID) && !(message.sessionID && $util.isInteger(message.sessionID.low) && $util.isInteger(message.sessionID.high)))
                    return "sessionID: integer|Long expected";
            return null;
        };

        GS2CS_GCAskLogin.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.GS2CS_GCAskLogin)
                return object;
            let message = new $root.Protos.GS2CS_GCAskLogin();
            if (object.opts != null) {
                if (typeof object.opts !== "object")
                    throw TypeError(".Protos.GS2CS_GCAskLogin.opts: object expected");
                message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
            }
            if (object.sessionID != null)
                if ($util.Long)
                    (message.sessionID = $util.Long.fromValue(object.sessionID)).unsigned = true;
                else if (typeof object.sessionID === "string")
                    message.sessionID = parseInt(object.sessionID, 10);
                else if (typeof object.sessionID === "number")
                    message.sessionID = object.sessionID;
                else if (typeof object.sessionID === "object")
                    message.sessionID = new $util.LongBits(object.sessionID.low >>> 0, object.sessionID.high >>> 0).toNumber(true);
            return message;
        };

        GS2CS_GCAskLogin.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.opts = null;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.sessionID = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.sessionID = options.longs === String ? "0" : 0;
            }
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            if (message.sessionID != null && message.hasOwnProperty("sessionID"))
                if (typeof message.sessionID === "number")
                    object.sessionID = options.longs === String ? String(message.sessionID) : message.sessionID;
                else
                    object.sessionID = options.longs === String ? $util.Long.prototype.toString.call(message.sessionID) : options.longs === Number ? new $util.LongBits(message.sessionID.low >>> 0, message.sessionID.high >>> 0).toNumber(true) : message.sessionID;
            return object;
        };

        GS2CS_GCAskLogin.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GS2CS_GCAskLogin;
    })();

    Protos.GS2CS_GCLost = (function() {

        function GS2CS_GCLost(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        GS2CS_GCLost.prototype.opts = null;
        GS2CS_GCLost.prototype.sessionID = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        GS2CS_GCLost.create = function create(properties) {
            return new GS2CS_GCLost(properties);
        };

        GS2CS_GCLost.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.opts != null && message.hasOwnProperty("opts"))
                $root.Protos.MsgOpts.encode(message.opts, writer.uint32(10).fork()).ldelim();
            if (message.sessionID != null && message.hasOwnProperty("sessionID"))
                writer.uint32(16).uint64(message.sessionID);
            return writer;
        };

        GS2CS_GCLost.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        GS2CS_GCLost.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.GS2CS_GCLost();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.sessionID = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        GS2CS_GCLost.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        GS2CS_GCLost.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.opts != null && message.hasOwnProperty("opts")) {
                let error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            if (message.sessionID != null && message.hasOwnProperty("sessionID"))
                if (!$util.isInteger(message.sessionID) && !(message.sessionID && $util.isInteger(message.sessionID.low) && $util.isInteger(message.sessionID.high)))
                    return "sessionID: integer|Long expected";
            return null;
        };

        GS2CS_GCLost.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.GS2CS_GCLost)
                return object;
            let message = new $root.Protos.GS2CS_GCLost();
            if (object.opts != null) {
                if (typeof object.opts !== "object")
                    throw TypeError(".Protos.GS2CS_GCLost.opts: object expected");
                message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
            }
            if (object.sessionID != null)
                if ($util.Long)
                    (message.sessionID = $util.Long.fromValue(object.sessionID)).unsigned = true;
                else if (typeof object.sessionID === "string")
                    message.sessionID = parseInt(object.sessionID, 10);
                else if (typeof object.sessionID === "number")
                    message.sessionID = object.sessionID;
                else if (typeof object.sessionID === "object")
                    message.sessionID = new $util.LongBits(object.sessionID.low >>> 0, object.sessionID.high >>> 0).toNumber(true);
            return message;
        };

        GS2CS_GCLost.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.opts = null;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.sessionID = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.sessionID = options.longs === String ? "0" : 0;
            }
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            if (message.sessionID != null && message.hasOwnProperty("sessionID"))
                if (typeof message.sessionID === "number")
                    object.sessionID = options.longs === String ? String(message.sessionID) : message.sessionID;
                else
                    object.sessionID = options.longs === String ? $util.Long.prototype.toString.call(message.sessionID) : options.longs === Number ? new $util.LongBits(message.sessionID.low >>> 0, message.sessionID.high >>> 0).toNumber(true) : message.sessionID;
            return object;
        };

        GS2CS_GCLost.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GS2CS_GCLost;
    })();

    Protos.GS2CS_KickGCRet = (function() {

        function GS2CS_KickGCRet(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        GS2CS_KickGCRet.prototype.opts = null;
        GS2CS_KickGCRet.prototype.result = 0;

        GS2CS_KickGCRet.create = function create(properties) {
            return new GS2CS_KickGCRet(properties);
        };

        GS2CS_KickGCRet.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.opts != null && message.hasOwnProperty("opts"))
                $root.Protos.MsgOpts.encode(message.opts, writer.uint32(10).fork()).ldelim();
            if (message.result != null && message.hasOwnProperty("result"))
                writer.uint32(16).int32(message.result);
            return writer;
        };

        GS2CS_KickGCRet.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        GS2CS_KickGCRet.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.GS2CS_KickGCRet();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.result = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        GS2CS_KickGCRet.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        GS2CS_KickGCRet.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.opts != null && message.hasOwnProperty("opts")) {
                let error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            if (message.result != null && message.hasOwnProperty("result"))
                switch (message.result) {
                default:
                    return "result: enum value expected";
                case 0:
                case 1:
                    break;
                }
            return null;
        };

        GS2CS_KickGCRet.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.GS2CS_KickGCRet)
                return object;
            let message = new $root.Protos.GS2CS_KickGCRet();
            if (object.opts != null) {
                if (typeof object.opts !== "object")
                    throw TypeError(".Protos.GS2CS_KickGCRet.opts: object expected");
                message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
            }
            switch (object.result) {
            case "Success":
            case 0:
                message.result = 0;
                break;
            case "Failed":
            case 1:
                message.result = 1;
                break;
            }
            return message;
        };

        GS2CS_KickGCRet.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.opts = null;
                object.result = options.enums === String ? "Success" : 0;
            }
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            if (message.result != null && message.hasOwnProperty("result"))
                object.result = options.enums === String ? $root.Protos.Global.ECommon[message.result] : message.result;
            return object;
        };

        GS2CS_KickGCRet.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GS2CS_KickGCRet;
    })();

    Protos.DB2LS_QueryResult = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "Success"] = 0;
        values[valuesById[1] = "Failed"] = 1;
        values[valuesById[2] = "UsernameExist"] = 2;
        values[valuesById[3] = "InvalidUname"] = 3;
        values[valuesById[4] = "InvalidPwd"] = 4;
        return values;
    })();

    Protos.DB2LS_QueryAccountRet = (function() {

        function DB2LS_QueryAccountRet(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        DB2LS_QueryAccountRet.prototype.opts = null;
        DB2LS_QueryAccountRet.prototype.result = 0;

        DB2LS_QueryAccountRet.create = function create(properties) {
            return new DB2LS_QueryAccountRet(properties);
        };

        DB2LS_QueryAccountRet.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.opts != null && message.hasOwnProperty("opts"))
                $root.Protos.MsgOpts.encode(message.opts, writer.uint32(10).fork()).ldelim();
            if (message.result != null && message.hasOwnProperty("result"))
                writer.uint32(16).int32(message.result);
            return writer;
        };

        DB2LS_QueryAccountRet.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        DB2LS_QueryAccountRet.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.DB2LS_QueryAccountRet();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.result = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        DB2LS_QueryAccountRet.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        DB2LS_QueryAccountRet.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.opts != null && message.hasOwnProperty("opts")) {
                let error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            if (message.result != null && message.hasOwnProperty("result"))
                switch (message.result) {
                default:
                    return "result: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                    break;
                }
            return null;
        };

        DB2LS_QueryAccountRet.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.DB2LS_QueryAccountRet)
                return object;
            let message = new $root.Protos.DB2LS_QueryAccountRet();
            if (object.opts != null) {
                if (typeof object.opts !== "object")
                    throw TypeError(".Protos.DB2LS_QueryAccountRet.opts: object expected");
                message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
            }
            switch (object.result) {
            case "Success":
            case 0:
                message.result = 0;
                break;
            case "Failed":
            case 1:
                message.result = 1;
                break;
            case "UsernameExist":
            case 2:
                message.result = 2;
                break;
            case "InvalidUname":
            case 3:
                message.result = 3;
                break;
            case "InvalidPwd":
            case 4:
                message.result = 4;
                break;
            }
            return message;
        };

        DB2LS_QueryAccountRet.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.opts = null;
                object.result = options.enums === String ? "Success" : 0;
            }
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            if (message.result != null && message.hasOwnProperty("result"))
                object.result = options.enums === String ? $root.Protos.DB2LS_QueryResult[message.result] : message.result;
            return object;
        };

        DB2LS_QueryAccountRet.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return DB2LS_QueryAccountRet;
    })();

    Protos.DB2LS_QueryLoginRet = (function() {

        function DB2LS_QueryLoginRet(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        DB2LS_QueryLoginRet.prototype.opts = null;
        DB2LS_QueryLoginRet.prototype.result = 0;
        DB2LS_QueryLoginRet.prototype.ukey = 0;

        DB2LS_QueryLoginRet.create = function create(properties) {
            return new DB2LS_QueryLoginRet(properties);
        };

        DB2LS_QueryLoginRet.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.opts != null && message.hasOwnProperty("opts"))
                $root.Protos.MsgOpts.encode(message.opts, writer.uint32(10).fork()).ldelim();
            if (message.result != null && message.hasOwnProperty("result"))
                writer.uint32(16).int32(message.result);
            if (message.ukey != null && message.hasOwnProperty("ukey"))
                writer.uint32(24).uint32(message.ukey);
            return writer;
        };

        DB2LS_QueryLoginRet.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        DB2LS_QueryLoginRet.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.DB2LS_QueryLoginRet();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.result = reader.int32();
                    break;
                case 3:
                    message.ukey = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        DB2LS_QueryLoginRet.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        DB2LS_QueryLoginRet.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.opts != null && message.hasOwnProperty("opts")) {
                let error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            if (message.result != null && message.hasOwnProperty("result"))
                switch (message.result) {
                default:
                    return "result: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                    break;
                }
            if (message.ukey != null && message.hasOwnProperty("ukey"))
                if (!$util.isInteger(message.ukey))
                    return "ukey: integer expected";
            return null;
        };

        DB2LS_QueryLoginRet.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.DB2LS_QueryLoginRet)
                return object;
            let message = new $root.Protos.DB2LS_QueryLoginRet();
            if (object.opts != null) {
                if (typeof object.opts !== "object")
                    throw TypeError(".Protos.DB2LS_QueryLoginRet.opts: object expected");
                message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
            }
            switch (object.result) {
            case "Success":
            case 0:
                message.result = 0;
                break;
            case "Failed":
            case 1:
                message.result = 1;
                break;
            case "UsernameExist":
            case 2:
                message.result = 2;
                break;
            case "InvalidUname":
            case 3:
                message.result = 3;
                break;
            case "InvalidPwd":
            case 4:
                message.result = 4;
                break;
            }
            if (object.ukey != null)
                message.ukey = object.ukey >>> 0;
            return message;
        };

        DB2LS_QueryLoginRet.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.opts = null;
                object.result = options.enums === String ? "Success" : 0;
                object.ukey = 0;
            }
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            if (message.result != null && message.hasOwnProperty("result"))
                object.result = options.enums === String ? $root.Protos.DB2LS_QueryResult[message.result] : message.result;
            if (message.ukey != null && message.hasOwnProperty("ukey"))
                object.ukey = message.ukey;
            return object;
        };

        DB2LS_QueryLoginRet.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return DB2LS_QueryLoginRet;
    })();

    Protos.DB2LS_ExecRet = (function() {

        function DB2LS_ExecRet(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        DB2LS_ExecRet.prototype.opts = null;
        DB2LS_ExecRet.prototype.result = 0;
        DB2LS_ExecRet.prototype.row = 0;
        DB2LS_ExecRet.prototype.id = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        DB2LS_ExecRet.create = function create(properties) {
            return new DB2LS_ExecRet(properties);
        };

        DB2LS_ExecRet.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.opts != null && message.hasOwnProperty("opts"))
                $root.Protos.MsgOpts.encode(message.opts, writer.uint32(10).fork()).ldelim();
            if (message.result != null && message.hasOwnProperty("result"))
                writer.uint32(16).int32(message.result);
            if (message.row != null && message.hasOwnProperty("row"))
                writer.uint32(24).int32(message.row);
            if (message.id != null && message.hasOwnProperty("id"))
                writer.uint32(32).int64(message.id);
            return writer;
        };

        DB2LS_ExecRet.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        DB2LS_ExecRet.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.DB2LS_ExecRet();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.result = reader.int32();
                    break;
                case 3:
                    message.row = reader.int32();
                    break;
                case 4:
                    message.id = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        DB2LS_ExecRet.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        DB2LS_ExecRet.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.opts != null && message.hasOwnProperty("opts")) {
                let error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            if (message.result != null && message.hasOwnProperty("result"))
                switch (message.result) {
                default:
                    return "result: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                    break;
                }
            if (message.row != null && message.hasOwnProperty("row"))
                if (!$util.isInteger(message.row))
                    return "row: integer expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isInteger(message.id) && !(message.id && $util.isInteger(message.id.low) && $util.isInteger(message.id.high)))
                    return "id: integer|Long expected";
            return null;
        };

        DB2LS_ExecRet.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.DB2LS_ExecRet)
                return object;
            let message = new $root.Protos.DB2LS_ExecRet();
            if (object.opts != null) {
                if (typeof object.opts !== "object")
                    throw TypeError(".Protos.DB2LS_ExecRet.opts: object expected");
                message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
            }
            switch (object.result) {
            case "Success":
            case 0:
                message.result = 0;
                break;
            case "Failed":
            case 1:
                message.result = 1;
                break;
            case "UsernameExist":
            case 2:
                message.result = 2;
                break;
            case "InvalidUname":
            case 3:
                message.result = 3;
                break;
            case "InvalidPwd":
            case 4:
                message.result = 4;
                break;
            }
            if (object.row != null)
                message.row = object.row | 0;
            if (object.id != null)
                if ($util.Long)
                    (message.id = $util.Long.fromValue(object.id)).unsigned = false;
                else if (typeof object.id === "string")
                    message.id = parseInt(object.id, 10);
                else if (typeof object.id === "number")
                    message.id = object.id;
                else if (typeof object.id === "object")
                    message.id = new $util.LongBits(object.id.low >>> 0, object.id.high >>> 0).toNumber();
            return message;
        };

        DB2LS_ExecRet.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.opts = null;
                object.result = options.enums === String ? "Success" : 0;
                object.row = 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.id = options.longs === String ? "0" : 0;
            }
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            if (message.result != null && message.hasOwnProperty("result"))
                object.result = options.enums === String ? $root.Protos.DB2LS_QueryResult[message.result] : message.result;
            if (message.row != null && message.hasOwnProperty("row"))
                object.row = message.row;
            if (message.id != null && message.hasOwnProperty("id"))
                if (typeof message.id === "number")
                    object.id = options.longs === String ? String(message.id) : message.id;
                else
                    object.id = options.longs === String ? $util.Long.prototype.toString.call(message.id) : options.longs === Number ? new $util.LongBits(message.id.low >>> 0, message.id.high >>> 0).toNumber() : message.id;
            return object;
        };

        DB2LS_ExecRet.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return DB2LS_ExecRet;
    })();

    Protos.GC2BS_AskLogin = (function() {

        function GC2BS_AskLogin(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        GC2BS_AskLogin.prototype.opts = null;
        GC2BS_AskLogin.prototype.sessionID = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        GC2BS_AskLogin.create = function create(properties) {
            return new GC2BS_AskLogin(properties);
        };

        GC2BS_AskLogin.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.opts != null && message.hasOwnProperty("opts"))
                $root.Protos.MsgOpts.encode(message.opts, writer.uint32(10).fork()).ldelim();
            if (message.sessionID != null && message.hasOwnProperty("sessionID"))
                writer.uint32(16).uint64(message.sessionID);
            return writer;
        };

        GC2BS_AskLogin.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        GC2BS_AskLogin.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.GC2BS_AskLogin();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.sessionID = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        GC2BS_AskLogin.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        GC2BS_AskLogin.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.opts != null && message.hasOwnProperty("opts")) {
                let error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            if (message.sessionID != null && message.hasOwnProperty("sessionID"))
                if (!$util.isInteger(message.sessionID) && !(message.sessionID && $util.isInteger(message.sessionID.low) && $util.isInteger(message.sessionID.high)))
                    return "sessionID: integer|Long expected";
            return null;
        };

        GC2BS_AskLogin.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.GC2BS_AskLogin)
                return object;
            let message = new $root.Protos.GC2BS_AskLogin();
            if (object.opts != null) {
                if (typeof object.opts !== "object")
                    throw TypeError(".Protos.GC2BS_AskLogin.opts: object expected");
                message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
            }
            if (object.sessionID != null)
                if ($util.Long)
                    (message.sessionID = $util.Long.fromValue(object.sessionID)).unsigned = true;
                else if (typeof object.sessionID === "string")
                    message.sessionID = parseInt(object.sessionID, 10);
                else if (typeof object.sessionID === "number")
                    message.sessionID = object.sessionID;
                else if (typeof object.sessionID === "object")
                    message.sessionID = new $util.LongBits(object.sessionID.low >>> 0, object.sessionID.high >>> 0).toNumber(true);
            return message;
        };

        GC2BS_AskLogin.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.opts = null;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.sessionID = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.sessionID = options.longs === String ? "0" : 0;
            }
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            if (message.sessionID != null && message.hasOwnProperty("sessionID"))
                if (typeof message.sessionID === "number")
                    object.sessionID = options.longs === String ? String(message.sessionID) : message.sessionID;
                else
                    object.sessionID = options.longs === String ? $util.Long.prototype.toString.call(message.sessionID) : options.longs === Number ? new $util.LongBits(message.sessionID.low >>> 0, message.sessionID.high >>> 0).toNumber(true) : message.sessionID;
            return object;
        };

        GC2BS_AskLogin.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GC2BS_AskLogin;
    })();

    Protos.GC2BS_KeepAlive = (function() {

        function GC2BS_KeepAlive(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        GC2BS_KeepAlive.prototype.opts = null;

        GC2BS_KeepAlive.create = function create(properties) {
            return new GC2BS_KeepAlive(properties);
        };

        GC2BS_KeepAlive.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.opts != null && message.hasOwnProperty("opts"))
                $root.Protos.MsgOpts.encode(message.opts, writer.uint32(10).fork()).ldelim();
            return writer;
        };

        GC2BS_KeepAlive.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        GC2BS_KeepAlive.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.GC2BS_KeepAlive();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        GC2BS_KeepAlive.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        GC2BS_KeepAlive.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.opts != null && message.hasOwnProperty("opts")) {
                let error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            return null;
        };

        GC2BS_KeepAlive.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.GC2BS_KeepAlive)
                return object;
            let message = new $root.Protos.GC2BS_KeepAlive();
            if (object.opts != null) {
                if (typeof object.opts !== "object")
                    throw TypeError(".Protos.GC2BS_KeepAlive.opts: object expected");
                message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
            }
            return message;
        };

        GC2BS_KeepAlive.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.opts = null;
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            return object;
        };

        GC2BS_KeepAlive.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GC2BS_KeepAlive;
    })();

    Protos.GC2CS_BeginMatch = (function() {

        function GC2CS_BeginMatch(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        GC2CS_BeginMatch.prototype.opts = null;
        GC2CS_BeginMatch.prototype.actorID = 0;

        GC2CS_BeginMatch.create = function create(properties) {
            return new GC2CS_BeginMatch(properties);
        };

        GC2CS_BeginMatch.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.opts != null && message.hasOwnProperty("opts"))
                $root.Protos.MsgOpts.encode(message.opts, writer.uint32(10).fork()).ldelim();
            if (message.actorID != null && message.hasOwnProperty("actorID"))
                writer.uint32(16).int32(message.actorID);
            return writer;
        };

        GC2CS_BeginMatch.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        GC2CS_BeginMatch.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.GC2CS_BeginMatch();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.actorID = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        GC2CS_BeginMatch.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        GC2CS_BeginMatch.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.opts != null && message.hasOwnProperty("opts")) {
                let error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            if (message.actorID != null && message.hasOwnProperty("actorID"))
                if (!$util.isInteger(message.actorID))
                    return "actorID: integer expected";
            return null;
        };

        GC2CS_BeginMatch.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.GC2CS_BeginMatch)
                return object;
            let message = new $root.Protos.GC2CS_BeginMatch();
            if (object.opts != null) {
                if (typeof object.opts !== "object")
                    throw TypeError(".Protos.GC2CS_BeginMatch.opts: object expected");
                message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
            }
            if (object.actorID != null)
                message.actorID = object.actorID | 0;
            return message;
        };

        GC2CS_BeginMatch.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.opts = null;
                object.actorID = 0;
            }
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            if (message.actorID != null && message.hasOwnProperty("actorID"))
                object.actorID = message.actorID;
            return object;
        };

        GC2CS_BeginMatch.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GC2CS_BeginMatch;
    })();

    Protos.GC2CS_UpdatePlayerInfo = (function() {

        function GC2CS_UpdatePlayerInfo(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        GC2CS_UpdatePlayerInfo.prototype.opts = null;
        GC2CS_UpdatePlayerInfo.prototype.progress = 0;

        GC2CS_UpdatePlayerInfo.create = function create(properties) {
            return new GC2CS_UpdatePlayerInfo(properties);
        };

        GC2CS_UpdatePlayerInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.opts != null && message.hasOwnProperty("opts"))
                $root.Protos.MsgOpts.encode(message.opts, writer.uint32(10).fork()).ldelim();
            if (message.progress != null && message.hasOwnProperty("progress"))
                writer.uint32(16).int32(message.progress);
            return writer;
        };

        GC2CS_UpdatePlayerInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        GC2CS_UpdatePlayerInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.GC2CS_UpdatePlayerInfo();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.progress = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        GC2CS_UpdatePlayerInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        GC2CS_UpdatePlayerInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.opts != null && message.hasOwnProperty("opts")) {
                let error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            if (message.progress != null && message.hasOwnProperty("progress"))
                if (!$util.isInteger(message.progress))
                    return "progress: integer expected";
            return null;
        };

        GC2CS_UpdatePlayerInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.GC2CS_UpdatePlayerInfo)
                return object;
            let message = new $root.Protos.GC2CS_UpdatePlayerInfo();
            if (object.opts != null) {
                if (typeof object.opts !== "object")
                    throw TypeError(".Protos.GC2CS_UpdatePlayerInfo.opts: object expected");
                message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
            }
            if (object.progress != null)
                message.progress = object.progress | 0;
            return message;
        };

        GC2CS_UpdatePlayerInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.opts = null;
                object.progress = 0;
            }
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            if (message.progress != null && message.hasOwnProperty("progress"))
                object.progress = message.progress;
            return object;
        };

        GC2CS_UpdatePlayerInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GC2CS_UpdatePlayerInfo;
    })();

    Protos.GC2GS_AskLogin = (function() {

        function GC2GS_AskLogin(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        GC2GS_AskLogin.prototype.opts = null;
        GC2GS_AskLogin.prototype.pwd = "";
        GC2GS_AskLogin.prototype.sessionID = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        GC2GS_AskLogin.create = function create(properties) {
            return new GC2GS_AskLogin(properties);
        };

        GC2GS_AskLogin.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.opts != null && message.hasOwnProperty("opts"))
                $root.Protos.MsgOpts.encode(message.opts, writer.uint32(10).fork()).ldelim();
            if (message.pwd != null && message.hasOwnProperty("pwd"))
                writer.uint32(18).string(message.pwd);
            if (message.sessionID != null && message.hasOwnProperty("sessionID"))
                writer.uint32(24).uint64(message.sessionID);
            return writer;
        };

        GC2GS_AskLogin.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        GC2GS_AskLogin.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.GC2GS_AskLogin();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.pwd = reader.string();
                    break;
                case 3:
                    message.sessionID = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        GC2GS_AskLogin.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        GC2GS_AskLogin.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.opts != null && message.hasOwnProperty("opts")) {
                let error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            if (message.pwd != null && message.hasOwnProperty("pwd"))
                if (!$util.isString(message.pwd))
                    return "pwd: string expected";
            if (message.sessionID != null && message.hasOwnProperty("sessionID"))
                if (!$util.isInteger(message.sessionID) && !(message.sessionID && $util.isInteger(message.sessionID.low) && $util.isInteger(message.sessionID.high)))
                    return "sessionID: integer|Long expected";
            return null;
        };

        GC2GS_AskLogin.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.GC2GS_AskLogin)
                return object;
            let message = new $root.Protos.GC2GS_AskLogin();
            if (object.opts != null) {
                if (typeof object.opts !== "object")
                    throw TypeError(".Protos.GC2GS_AskLogin.opts: object expected");
                message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
            }
            if (object.pwd != null)
                message.pwd = String(object.pwd);
            if (object.sessionID != null)
                if ($util.Long)
                    (message.sessionID = $util.Long.fromValue(object.sessionID)).unsigned = true;
                else if (typeof object.sessionID === "string")
                    message.sessionID = parseInt(object.sessionID, 10);
                else if (typeof object.sessionID === "number")
                    message.sessionID = object.sessionID;
                else if (typeof object.sessionID === "object")
                    message.sessionID = new $util.LongBits(object.sessionID.low >>> 0, object.sessionID.high >>> 0).toNumber(true);
            return message;
        };

        GC2GS_AskLogin.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.opts = null;
                object.pwd = "";
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.sessionID = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.sessionID = options.longs === String ? "0" : 0;
            }
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            if (message.pwd != null && message.hasOwnProperty("pwd"))
                object.pwd = message.pwd;
            if (message.sessionID != null && message.hasOwnProperty("sessionID"))
                if (typeof message.sessionID === "number")
                    object.sessionID = options.longs === String ? String(message.sessionID) : message.sessionID;
                else
                    object.sessionID = options.longs === String ? $util.Long.prototype.toString.call(message.sessionID) : options.longs === Number ? new $util.LongBits(message.sessionID.low >>> 0, message.sessionID.high >>> 0).toNumber(true) : message.sessionID;
            return object;
        };

        GC2GS_AskLogin.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GC2GS_AskLogin;
    })();

    Protos.GC2GS_KeepAlive = (function() {

        function GC2GS_KeepAlive(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        GC2GS_KeepAlive.prototype.opts = null;

        GC2GS_KeepAlive.create = function create(properties) {
            return new GC2GS_KeepAlive(properties);
        };

        GC2GS_KeepAlive.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.opts != null && message.hasOwnProperty("opts"))
                $root.Protos.MsgOpts.encode(message.opts, writer.uint32(10).fork()).ldelim();
            return writer;
        };

        GC2GS_KeepAlive.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        GC2GS_KeepAlive.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.GC2GS_KeepAlive();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        GC2GS_KeepAlive.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        GC2GS_KeepAlive.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.opts != null && message.hasOwnProperty("opts")) {
                let error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            return null;
        };

        GC2GS_KeepAlive.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.GC2GS_KeepAlive)
                return object;
            let message = new $root.Protos.GC2GS_KeepAlive();
            if (object.opts != null) {
                if (typeof object.opts !== "object")
                    throw TypeError(".Protos.GC2GS_KeepAlive.opts: object expected");
                message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
            }
            return message;
        };

        GC2GS_KeepAlive.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.opts = null;
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            return object;
        };

        GC2GS_KeepAlive.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GC2GS_KeepAlive;
    })();

    Protos.GC2LS_AskRegister = (function() {

        function GC2LS_AskRegister(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        GC2LS_AskRegister.prototype.opts = null;
        GC2LS_AskRegister.prototype.sdk = 0;
        GC2LS_AskRegister.prototype.name = "";
        GC2LS_AskRegister.prototype.passwd = "";
        GC2LS_AskRegister.prototype.platform = 0;

        GC2LS_AskRegister.create = function create(properties) {
            return new GC2LS_AskRegister(properties);
        };

        GC2LS_AskRegister.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.opts != null && message.hasOwnProperty("opts"))
                $root.Protos.MsgOpts.encode(message.opts, writer.uint32(10).fork()).ldelim();
            if (message.sdk != null && message.hasOwnProperty("sdk"))
                writer.uint32(16).int32(message.sdk);
            if (message.name != null && message.hasOwnProperty("name"))
                writer.uint32(26).string(message.name);
            if (message.passwd != null && message.hasOwnProperty("passwd"))
                writer.uint32(34).string(message.passwd);
            if (message.platform != null && message.hasOwnProperty("platform"))
                writer.uint32(40).uint32(message.platform);
            return writer;
        };

        GC2LS_AskRegister.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        GC2LS_AskRegister.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.GC2LS_AskRegister();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.sdk = reader.int32();
                    break;
                case 3:
                    message.name = reader.string();
                    break;
                case 4:
                    message.passwd = reader.string();
                    break;
                case 5:
                    message.platform = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        GC2LS_AskRegister.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        GC2LS_AskRegister.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.opts != null && message.hasOwnProperty("opts")) {
                let error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            if (message.sdk != null && message.hasOwnProperty("sdk"))
                if (!$util.isInteger(message.sdk))
                    return "sdk: integer expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.passwd != null && message.hasOwnProperty("passwd"))
                if (!$util.isString(message.passwd))
                    return "passwd: string expected";
            if (message.platform != null && message.hasOwnProperty("platform"))
                if (!$util.isInteger(message.platform))
                    return "platform: integer expected";
            return null;
        };

        GC2LS_AskRegister.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.GC2LS_AskRegister)
                return object;
            let message = new $root.Protos.GC2LS_AskRegister();
            if (object.opts != null) {
                if (typeof object.opts !== "object")
                    throw TypeError(".Protos.GC2LS_AskRegister.opts: object expected");
                message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
            }
            if (object.sdk != null)
                message.sdk = object.sdk | 0;
            if (object.name != null)
                message.name = String(object.name);
            if (object.passwd != null)
                message.passwd = String(object.passwd);
            if (object.platform != null)
                message.platform = object.platform >>> 0;
            return message;
        };

        GC2LS_AskRegister.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.opts = null;
                object.sdk = 0;
                object.name = "";
                object.passwd = "";
                object.platform = 0;
            }
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            if (message.sdk != null && message.hasOwnProperty("sdk"))
                object.sdk = message.sdk;
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.passwd != null && message.hasOwnProperty("passwd"))
                object.passwd = message.passwd;
            if (message.platform != null && message.hasOwnProperty("platform"))
                object.platform = message.platform;
            return object;
        };

        GC2LS_AskRegister.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GC2LS_AskRegister;
    })();

    Protos.GC2LS_AskLogin = (function() {

        function GC2LS_AskLogin(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        GC2LS_AskLogin.prototype.opts = null;
        GC2LS_AskLogin.prototype.name = "";
        GC2LS_AskLogin.prototype.passwd = "";

        GC2LS_AskLogin.create = function create(properties) {
            return new GC2LS_AskLogin(properties);
        };

        GC2LS_AskLogin.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.opts != null && message.hasOwnProperty("opts"))
                $root.Protos.MsgOpts.encode(message.opts, writer.uint32(10).fork()).ldelim();
            if (message.name != null && message.hasOwnProperty("name"))
                writer.uint32(18).string(message.name);
            if (message.passwd != null && message.hasOwnProperty("passwd"))
                writer.uint32(26).string(message.passwd);
            return writer;
        };

        GC2LS_AskLogin.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        GC2LS_AskLogin.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.GC2LS_AskLogin();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.name = reader.string();
                    break;
                case 3:
                    message.passwd = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        GC2LS_AskLogin.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        GC2LS_AskLogin.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.opts != null && message.hasOwnProperty("opts")) {
                let error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.passwd != null && message.hasOwnProperty("passwd"))
                if (!$util.isString(message.passwd))
                    return "passwd: string expected";
            return null;
        };

        GC2LS_AskLogin.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.GC2LS_AskLogin)
                return object;
            let message = new $root.Protos.GC2LS_AskLogin();
            if (object.opts != null) {
                if (typeof object.opts !== "object")
                    throw TypeError(".Protos.GC2LS_AskLogin.opts: object expected");
                message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
            }
            if (object.name != null)
                message.name = String(object.name);
            if (object.passwd != null)
                message.passwd = String(object.passwd);
            return message;
        };

        GC2LS_AskLogin.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.opts = null;
                object.name = "";
                object.passwd = "";
            }
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.passwd != null && message.hasOwnProperty("passwd"))
                object.passwd = message.passwd;
            return object;
        };

        GC2LS_AskLogin.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GC2LS_AskLogin;
    })();

    Protos.GC2LS_AskSmartLogin = (function() {

        function GC2LS_AskSmartLogin(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        GC2LS_AskSmartLogin.prototype.opts = null;
        GC2LS_AskSmartLogin.prototype.sdk = 0;
        GC2LS_AskSmartLogin.prototype.name = "";
        GC2LS_AskSmartLogin.prototype.platform = 0;

        GC2LS_AskSmartLogin.create = function create(properties) {
            return new GC2LS_AskSmartLogin(properties);
        };

        GC2LS_AskSmartLogin.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.opts != null && message.hasOwnProperty("opts"))
                $root.Protos.MsgOpts.encode(message.opts, writer.uint32(10).fork()).ldelim();
            if (message.sdk != null && message.hasOwnProperty("sdk"))
                writer.uint32(16).int32(message.sdk);
            if (message.name != null && message.hasOwnProperty("name"))
                writer.uint32(26).string(message.name);
            if (message.platform != null && message.hasOwnProperty("platform"))
                writer.uint32(32).uint32(message.platform);
            return writer;
        };

        GC2LS_AskSmartLogin.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        GC2LS_AskSmartLogin.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.GC2LS_AskSmartLogin();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.sdk = reader.int32();
                    break;
                case 3:
                    message.name = reader.string();
                    break;
                case 4:
                    message.platform = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        GC2LS_AskSmartLogin.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        GC2LS_AskSmartLogin.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.opts != null && message.hasOwnProperty("opts")) {
                let error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            if (message.sdk != null && message.hasOwnProperty("sdk"))
                if (!$util.isInteger(message.sdk))
                    return "sdk: integer expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.platform != null && message.hasOwnProperty("platform"))
                if (!$util.isInteger(message.platform))
                    return "platform: integer expected";
            return null;
        };

        GC2LS_AskSmartLogin.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.GC2LS_AskSmartLogin)
                return object;
            let message = new $root.Protos.GC2LS_AskSmartLogin();
            if (object.opts != null) {
                if (typeof object.opts !== "object")
                    throw TypeError(".Protos.GC2LS_AskSmartLogin.opts: object expected");
                message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
            }
            if (object.sdk != null)
                message.sdk = object.sdk | 0;
            if (object.name != null)
                message.name = String(object.name);
            if (object.platform != null)
                message.platform = object.platform >>> 0;
            return message;
        };

        GC2LS_AskSmartLogin.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.opts = null;
                object.sdk = 0;
                object.name = "";
                object.platform = 0;
            }
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            if (message.sdk != null && message.hasOwnProperty("sdk"))
                object.sdk = message.sdk;
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.platform != null && message.hasOwnProperty("platform"))
                object.platform = message.platform;
            return object;
        };

        GC2LS_AskSmartLogin.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GC2LS_AskSmartLogin;
    })();

    Protos.GS2GC_LoginRet = (function() {

        function GS2GC_LoginRet(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        GS2GC_LoginRet.prototype.opts = null;
        GS2GC_LoginRet.prototype.result = 0;
        GS2GC_LoginRet.prototype.gcState = 0;
        GS2GC_LoginRet.prototype.gcNID = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
        GS2GC_LoginRet.prototype.bsIP = "";
        GS2GC_LoginRet.prototype.bsPort = 0;

        GS2GC_LoginRet.create = function create(properties) {
            return new GS2GC_LoginRet(properties);
        };

        GS2GC_LoginRet.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.opts != null && message.hasOwnProperty("opts"))
                $root.Protos.MsgOpts.encode(message.opts, writer.uint32(10).fork()).ldelim();
            if (message.result != null && message.hasOwnProperty("result"))
                writer.uint32(16).int32(message.result);
            if (message.gcState != null && message.hasOwnProperty("gcState"))
                writer.uint32(24).int32(message.gcState);
            if (message.gcNID != null && message.hasOwnProperty("gcNID"))
                writer.uint32(32).uint64(message.gcNID);
            if (message.bsIP != null && message.hasOwnProperty("bsIP"))
                writer.uint32(42).string(message.bsIP);
            if (message.bsPort != null && message.hasOwnProperty("bsPort"))
                writer.uint32(48).int32(message.bsPort);
            return writer;
        };

        GS2GC_LoginRet.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        GS2GC_LoginRet.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.GS2GC_LoginRet();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.result = reader.int32();
                    break;
                case 3:
                    message.gcState = reader.int32();
                    break;
                case 4:
                    message.gcNID = reader.uint64();
                    break;
                case 5:
                    message.bsIP = reader.string();
                    break;
                case 6:
                    message.bsPort = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        GS2GC_LoginRet.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        GS2GC_LoginRet.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.opts != null && message.hasOwnProperty("opts")) {
                let error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            if (message.result != null && message.hasOwnProperty("result"))
                switch (message.result) {
                default:
                    return "result: enum value expected";
                case 0:
                case 1:
                    break;
                }
            if (message.gcState != null && message.hasOwnProperty("gcState"))
                switch (message.gcState) {
                default:
                    return "gcState: enum value expected";
                case 0:
                case 1:
                    break;
                }
            if (message.gcNID != null && message.hasOwnProperty("gcNID"))
                if (!$util.isInteger(message.gcNID) && !(message.gcNID && $util.isInteger(message.gcNID.low) && $util.isInteger(message.gcNID.high)))
                    return "gcNID: integer|Long expected";
            if (message.bsIP != null && message.hasOwnProperty("bsIP"))
                if (!$util.isString(message.bsIP))
                    return "bsIP: string expected";
            if (message.bsPort != null && message.hasOwnProperty("bsPort"))
                if (!$util.isInteger(message.bsPort))
                    return "bsPort: integer expected";
            return null;
        };

        GS2GC_LoginRet.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.GS2GC_LoginRet)
                return object;
            let message = new $root.Protos.GS2GC_LoginRet();
            if (object.opts != null) {
                if (typeof object.opts !== "object")
                    throw TypeError(".Protos.GS2GC_LoginRet.opts: object expected");
                message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
            }
            switch (object.result) {
            case "Success":
            case 0:
                message.result = 0;
                break;
            case "SessionExpire":
            case 1:
                message.result = 1;
                break;
            }
            switch (object.gcState) {
            case "Idle":
            case 0:
                message.gcState = 0;
                break;
            case "Battle":
            case 1:
                message.gcState = 1;
                break;
            }
            if (object.gcNID != null)
                if ($util.Long)
                    (message.gcNID = $util.Long.fromValue(object.gcNID)).unsigned = true;
                else if (typeof object.gcNID === "string")
                    message.gcNID = parseInt(object.gcNID, 10);
                else if (typeof object.gcNID === "number")
                    message.gcNID = object.gcNID;
                else if (typeof object.gcNID === "object")
                    message.gcNID = new $util.LongBits(object.gcNID.low >>> 0, object.gcNID.high >>> 0).toNumber(true);
            if (object.bsIP != null)
                message.bsIP = String(object.bsIP);
            if (object.bsPort != null)
                message.bsPort = object.bsPort | 0;
            return message;
        };

        GS2GC_LoginRet.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.opts = null;
                object.result = options.enums === String ? "Success" : 0;
                object.gcState = options.enums === String ? "Idle" : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.gcNID = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.gcNID = options.longs === String ? "0" : 0;
                object.bsIP = "";
                object.bsPort = 0;
            }
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            if (message.result != null && message.hasOwnProperty("result"))
                object.result = options.enums === String ? $root.Protos.GS2GC_LoginRet.EResult[message.result] : message.result;
            if (message.gcState != null && message.hasOwnProperty("gcState"))
                object.gcState = options.enums === String ? $root.Protos.GS2GC_LoginRet.EGCCState[message.gcState] : message.gcState;
            if (message.gcNID != null && message.hasOwnProperty("gcNID"))
                if (typeof message.gcNID === "number")
                    object.gcNID = options.longs === String ? String(message.gcNID) : message.gcNID;
                else
                    object.gcNID = options.longs === String ? $util.Long.prototype.toString.call(message.gcNID) : options.longs === Number ? new $util.LongBits(message.gcNID.low >>> 0, message.gcNID.high >>> 0).toNumber(true) : message.gcNID;
            if (message.bsIP != null && message.hasOwnProperty("bsIP"))
                object.bsIP = message.bsIP;
            if (message.bsPort != null && message.hasOwnProperty("bsPort"))
                object.bsPort = message.bsPort;
            return object;
        };

        GS2GC_LoginRet.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        GS2GC_LoginRet.EResult = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "Success"] = 0;
            values[valuesById[1] = "SessionExpire"] = 1;
            return values;
        })();

        GS2GC_LoginRet.EGCCState = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "Idle"] = 0;
            values[valuesById[1] = "Battle"] = 1;
            return values;
        })();

        return GS2GC_LoginRet;
    })();

    Protos.GS2GC_Kick = (function() {

        function GS2GC_Kick(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        GS2GC_Kick.prototype.opts = null;
        GS2GC_Kick.prototype.reason = 0;

        GS2GC_Kick.create = function create(properties) {
            return new GS2GC_Kick(properties);
        };

        GS2GC_Kick.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.opts != null && message.hasOwnProperty("opts"))
                $root.Protos.MsgOpts.encode(message.opts, writer.uint32(10).fork()).ldelim();
            if (message.reason != null && message.hasOwnProperty("reason"))
                writer.uint32(16).int32(message.reason);
            return writer;
        };

        GS2GC_Kick.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        GS2GC_Kick.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.GS2GC_Kick();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.reason = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        GS2GC_Kick.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        GS2GC_Kick.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.opts != null && message.hasOwnProperty("opts")) {
                let error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            if (message.reason != null && message.hasOwnProperty("reason"))
                switch (message.reason) {
                default:
                    return "reason: enum value expected";
                case 0:
                case 1:
                    break;
                }
            return null;
        };

        GS2GC_Kick.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.GS2GC_Kick)
                return object;
            let message = new $root.Protos.GS2GC_Kick();
            if (object.opts != null) {
                if (typeof object.opts !== "object")
                    throw TypeError(".Protos.GS2GC_Kick.opts: object expected");
                message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
            }
            switch (object.reason) {
            case "DuplicateLogin":
            case 0:
                message.reason = 0;
                break;
            case "Other":
            case 1:
                message.reason = 1;
                break;
            }
            return message;
        };

        GS2GC_Kick.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.opts = null;
                object.reason = options.enums === String ? "DuplicateLogin" : 0;
            }
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            if (message.reason != null && message.hasOwnProperty("reason"))
                object.reason = options.enums === String ? $root.Protos.CS2GS_KickGC.EReason[message.reason] : message.reason;
            return object;
        };

        GS2GC_Kick.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GS2GC_Kick;
    })();

    Protos.LS2CS_GCLogin = (function() {

        function LS2CS_GCLogin(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        LS2CS_GCLogin.prototype.opts = null;
        LS2CS_GCLogin.prototype.sessionID = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
        LS2CS_GCLogin.prototype.ukey = 0;

        LS2CS_GCLogin.create = function create(properties) {
            return new LS2CS_GCLogin(properties);
        };

        LS2CS_GCLogin.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.opts != null && message.hasOwnProperty("opts"))
                $root.Protos.MsgOpts.encode(message.opts, writer.uint32(10).fork()).ldelim();
            if (message.sessionID != null && message.hasOwnProperty("sessionID"))
                writer.uint32(16).uint64(message.sessionID);
            if (message.ukey != null && message.hasOwnProperty("ukey"))
                writer.uint32(24).uint32(message.ukey);
            return writer;
        };

        LS2CS_GCLogin.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        LS2CS_GCLogin.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.LS2CS_GCLogin();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.sessionID = reader.uint64();
                    break;
                case 3:
                    message.ukey = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        LS2CS_GCLogin.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        LS2CS_GCLogin.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.opts != null && message.hasOwnProperty("opts")) {
                let error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            if (message.sessionID != null && message.hasOwnProperty("sessionID"))
                if (!$util.isInteger(message.sessionID) && !(message.sessionID && $util.isInteger(message.sessionID.low) && $util.isInteger(message.sessionID.high)))
                    return "sessionID: integer|Long expected";
            if (message.ukey != null && message.hasOwnProperty("ukey"))
                if (!$util.isInteger(message.ukey))
                    return "ukey: integer expected";
            return null;
        };

        LS2CS_GCLogin.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.LS2CS_GCLogin)
                return object;
            let message = new $root.Protos.LS2CS_GCLogin();
            if (object.opts != null) {
                if (typeof object.opts !== "object")
                    throw TypeError(".Protos.LS2CS_GCLogin.opts: object expected");
                message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
            }
            if (object.sessionID != null)
                if ($util.Long)
                    (message.sessionID = $util.Long.fromValue(object.sessionID)).unsigned = true;
                else if (typeof object.sessionID === "string")
                    message.sessionID = parseInt(object.sessionID, 10);
                else if (typeof object.sessionID === "number")
                    message.sessionID = object.sessionID;
                else if (typeof object.sessionID === "object")
                    message.sessionID = new $util.LongBits(object.sessionID.low >>> 0, object.sessionID.high >>> 0).toNumber(true);
            if (object.ukey != null)
                message.ukey = object.ukey >>> 0;
            return message;
        };

        LS2CS_GCLogin.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.opts = null;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.sessionID = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.sessionID = options.longs === String ? "0" : 0;
                object.ukey = 0;
            }
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            if (message.sessionID != null && message.hasOwnProperty("sessionID"))
                if (typeof message.sessionID === "number")
                    object.sessionID = options.longs === String ? String(message.sessionID) : message.sessionID;
                else
                    object.sessionID = options.longs === String ? $util.Long.prototype.toString.call(message.sessionID) : options.longs === Number ? new $util.LongBits(message.sessionID.low >>> 0, message.sessionID.high >>> 0).toNumber(true) : message.sessionID;
            if (message.ukey != null && message.hasOwnProperty("ukey"))
                object.ukey = message.ukey;
            return object;
        };

        LS2CS_GCLogin.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return LS2CS_GCLogin;
    })();

    Protos.LS2DB_QueryAccount = (function() {

        function LS2DB_QueryAccount(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        LS2DB_QueryAccount.prototype.opts = null;
        LS2DB_QueryAccount.prototype.name = "";

        LS2DB_QueryAccount.create = function create(properties) {
            return new LS2DB_QueryAccount(properties);
        };

        LS2DB_QueryAccount.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.opts != null && message.hasOwnProperty("opts"))
                $root.Protos.MsgOpts.encode(message.opts, writer.uint32(10).fork()).ldelim();
            if (message.name != null && message.hasOwnProperty("name"))
                writer.uint32(18).string(message.name);
            return writer;
        };

        LS2DB_QueryAccount.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        LS2DB_QueryAccount.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.LS2DB_QueryAccount();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.name = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        LS2DB_QueryAccount.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        LS2DB_QueryAccount.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.opts != null && message.hasOwnProperty("opts")) {
                let error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            return null;
        };

        LS2DB_QueryAccount.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.LS2DB_QueryAccount)
                return object;
            let message = new $root.Protos.LS2DB_QueryAccount();
            if (object.opts != null) {
                if (typeof object.opts !== "object")
                    throw TypeError(".Protos.LS2DB_QueryAccount.opts: object expected");
                message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
            }
            if (object.name != null)
                message.name = String(object.name);
            return message;
        };

        LS2DB_QueryAccount.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.opts = null;
                object.name = "";
            }
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            return object;
        };

        LS2DB_QueryAccount.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return LS2DB_QueryAccount;
    })();

    Protos.LS2DB_QueryLogin = (function() {

        function LS2DB_QueryLogin(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        LS2DB_QueryLogin.prototype.opts = null;
        LS2DB_QueryLogin.prototype.name = "";
        LS2DB_QueryLogin.prototype.pwd = "";
        LS2DB_QueryLogin.prototype.vertPwd = false;
        LS2DB_QueryLogin.prototype.ip = "";
        LS2DB_QueryLogin.prototype.time = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        LS2DB_QueryLogin.create = function create(properties) {
            return new LS2DB_QueryLogin(properties);
        };

        LS2DB_QueryLogin.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.opts != null && message.hasOwnProperty("opts"))
                $root.Protos.MsgOpts.encode(message.opts, writer.uint32(10).fork()).ldelim();
            if (message.name != null && message.hasOwnProperty("name"))
                writer.uint32(18).string(message.name);
            if (message.pwd != null && message.hasOwnProperty("pwd"))
                writer.uint32(26).string(message.pwd);
            if (message.vertPwd != null && message.hasOwnProperty("vertPwd"))
                writer.uint32(32).bool(message.vertPwd);
            if (message.ip != null && message.hasOwnProperty("ip"))
                writer.uint32(42).string(message.ip);
            if (message.time != null && message.hasOwnProperty("time"))
                writer.uint32(48).int64(message.time);
            return writer;
        };

        LS2DB_QueryLogin.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        LS2DB_QueryLogin.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.LS2DB_QueryLogin();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.name = reader.string();
                    break;
                case 3:
                    message.pwd = reader.string();
                    break;
                case 4:
                    message.vertPwd = reader.bool();
                    break;
                case 5:
                    message.ip = reader.string();
                    break;
                case 6:
                    message.time = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        LS2DB_QueryLogin.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        LS2DB_QueryLogin.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.opts != null && message.hasOwnProperty("opts")) {
                let error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.pwd != null && message.hasOwnProperty("pwd"))
                if (!$util.isString(message.pwd))
                    return "pwd: string expected";
            if (message.vertPwd != null && message.hasOwnProperty("vertPwd"))
                if (typeof message.vertPwd !== "boolean")
                    return "vertPwd: boolean expected";
            if (message.ip != null && message.hasOwnProperty("ip"))
                if (!$util.isString(message.ip))
                    return "ip: string expected";
            if (message.time != null && message.hasOwnProperty("time"))
                if (!$util.isInteger(message.time) && !(message.time && $util.isInteger(message.time.low) && $util.isInteger(message.time.high)))
                    return "time: integer|Long expected";
            return null;
        };

        LS2DB_QueryLogin.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.LS2DB_QueryLogin)
                return object;
            let message = new $root.Protos.LS2DB_QueryLogin();
            if (object.opts != null) {
                if (typeof object.opts !== "object")
                    throw TypeError(".Protos.LS2DB_QueryLogin.opts: object expected");
                message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
            }
            if (object.name != null)
                message.name = String(object.name);
            if (object.pwd != null)
                message.pwd = String(object.pwd);
            if (object.vertPwd != null)
                message.vertPwd = Boolean(object.vertPwd);
            if (object.ip != null)
                message.ip = String(object.ip);
            if (object.time != null)
                if ($util.Long)
                    (message.time = $util.Long.fromValue(object.time)).unsigned = false;
                else if (typeof object.time === "string")
                    message.time = parseInt(object.time, 10);
                else if (typeof object.time === "number")
                    message.time = object.time;
                else if (typeof object.time === "object")
                    message.time = new $util.LongBits(object.time.low >>> 0, object.time.high >>> 0).toNumber();
            return message;
        };

        LS2DB_QueryLogin.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.opts = null;
                object.name = "";
                object.pwd = "";
                object.vertPwd = false;
                object.ip = "";
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.time = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.time = options.longs === String ? "0" : 0;
            }
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.pwd != null && message.hasOwnProperty("pwd"))
                object.pwd = message.pwd;
            if (message.vertPwd != null && message.hasOwnProperty("vertPwd"))
                object.vertPwd = message.vertPwd;
            if (message.ip != null && message.hasOwnProperty("ip"))
                object.ip = message.ip;
            if (message.time != null && message.hasOwnProperty("time"))
                if (typeof message.time === "number")
                    object.time = options.longs === String ? String(message.time) : message.time;
                else
                    object.time = options.longs === String ? $util.Long.prototype.toString.call(message.time) : options.longs === Number ? new $util.LongBits(message.time.low >>> 0, message.time.high >>> 0).toNumber() : message.time;
            return object;
        };

        LS2DB_QueryLogin.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return LS2DB_QueryLogin;
    })();

    Protos.LS2DB_Exec = (function() {

        function LS2DB_Exec(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        LS2DB_Exec.prototype.opts = null;
        LS2DB_Exec.prototype.cmd = "";

        LS2DB_Exec.create = function create(properties) {
            return new LS2DB_Exec(properties);
        };

        LS2DB_Exec.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.opts != null && message.hasOwnProperty("opts"))
                $root.Protos.MsgOpts.encode(message.opts, writer.uint32(10).fork()).ldelim();
            if (message.cmd != null && message.hasOwnProperty("cmd"))
                writer.uint32(18).string(message.cmd);
            return writer;
        };

        LS2DB_Exec.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        LS2DB_Exec.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.LS2DB_Exec();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.cmd = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        LS2DB_Exec.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        LS2DB_Exec.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.opts != null && message.hasOwnProperty("opts")) {
                let error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            if (message.cmd != null && message.hasOwnProperty("cmd"))
                if (!$util.isString(message.cmd))
                    return "cmd: string expected";
            return null;
        };

        LS2DB_Exec.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.LS2DB_Exec)
                return object;
            let message = new $root.Protos.LS2DB_Exec();
            if (object.opts != null) {
                if (typeof object.opts !== "object")
                    throw TypeError(".Protos.LS2DB_Exec.opts: object expected");
                message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
            }
            if (object.cmd != null)
                message.cmd = String(object.cmd);
            return message;
        };

        LS2DB_Exec.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.opts = null;
                object.cmd = "";
            }
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            if (message.cmd != null && message.hasOwnProperty("cmd"))
                object.cmd = message.cmd;
            return object;
        };

        LS2DB_Exec.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return LS2DB_Exec;
    })();

    Protos.LS2GC_GSInfo = (function() {

        function LS2GC_GSInfo(properties) {
            this.gsInfos = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        LS2GC_GSInfo.prototype.opts = null;
        LS2GC_GSInfo.prototype.gsInfos = $util.emptyArray;

        LS2GC_GSInfo.create = function create(properties) {
            return new LS2GC_GSInfo(properties);
        };

        LS2GC_GSInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.opts != null && message.hasOwnProperty("opts"))
                $root.Protos.MsgOpts.encode(message.opts, writer.uint32(10).fork()).ldelim();
            if (message.gsInfos != null && message.gsInfos.length)
                for (let i = 0; i < message.gsInfos.length; ++i)
                    $root.Protos.GSInfo.encode(message.gsInfos[i], writer.uint32(18).fork()).ldelim();
            return writer;
        };

        LS2GC_GSInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        LS2GC_GSInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.LS2GC_GSInfo();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                    break;
                case 2:
                    if (!(message.gsInfos && message.gsInfos.length))
                        message.gsInfos = [];
                    message.gsInfos.push($root.Protos.GSInfo.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        LS2GC_GSInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        LS2GC_GSInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.opts != null && message.hasOwnProperty("opts")) {
                let error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            if (message.gsInfos != null && message.hasOwnProperty("gsInfos")) {
                if (!Array.isArray(message.gsInfos))
                    return "gsInfos: array expected";
                for (let i = 0; i < message.gsInfos.length; ++i) {
                    let error = $root.Protos.GSInfo.verify(message.gsInfos[i]);
                    if (error)
                        return "gsInfos." + error;
                }
            }
            return null;
        };

        LS2GC_GSInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.LS2GC_GSInfo)
                return object;
            let message = new $root.Protos.LS2GC_GSInfo();
            if (object.opts != null) {
                if (typeof object.opts !== "object")
                    throw TypeError(".Protos.LS2GC_GSInfo.opts: object expected");
                message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
            }
            if (object.gsInfos) {
                if (!Array.isArray(object.gsInfos))
                    throw TypeError(".Protos.LS2GC_GSInfo.gsInfos: array expected");
                message.gsInfos = [];
                for (let i = 0; i < object.gsInfos.length; ++i) {
                    if (typeof object.gsInfos[i] !== "object")
                        throw TypeError(".Protos.LS2GC_GSInfo.gsInfos: object expected");
                    message.gsInfos[i] = $root.Protos.GSInfo.fromObject(object.gsInfos[i]);
                }
            }
            return message;
        };

        LS2GC_GSInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.gsInfos = [];
            if (options.defaults)
                object.opts = null;
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            if (message.gsInfos && message.gsInfos.length) {
                object.gsInfos = [];
                for (let j = 0; j < message.gsInfos.length; ++j)
                    object.gsInfos[j] = $root.Protos.GSInfo.toObject(message.gsInfos[j], options);
            }
            return object;
        };

        LS2GC_GSInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return LS2GC_GSInfo;
    })();

    Protos.LS2GC_AskRegRet = (function() {

        function LS2GC_AskRegRet(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        LS2GC_AskRegRet.prototype.opts = null;
        LS2GC_AskRegRet.prototype.result = 0;

        LS2GC_AskRegRet.create = function create(properties) {
            return new LS2GC_AskRegRet(properties);
        };

        LS2GC_AskRegRet.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.opts != null && message.hasOwnProperty("opts"))
                $root.Protos.MsgOpts.encode(message.opts, writer.uint32(10).fork()).ldelim();
            if (message.result != null && message.hasOwnProperty("result"))
                writer.uint32(16).int32(message.result);
            return writer;
        };

        LS2GC_AskRegRet.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        LS2GC_AskRegRet.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.LS2GC_AskRegRet();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.result = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        LS2GC_AskRegRet.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        LS2GC_AskRegRet.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.opts != null && message.hasOwnProperty("opts")) {
                let error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            if (message.result != null && message.hasOwnProperty("result"))
                switch (message.result) {
                default:
                    return "result: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                    break;
                }
            return null;
        };

        LS2GC_AskRegRet.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.LS2GC_AskRegRet)
                return object;
            let message = new $root.Protos.LS2GC_AskRegRet();
            if (object.opts != null) {
                if (typeof object.opts !== "object")
                    throw TypeError(".Protos.LS2GC_AskRegRet.opts: object expected");
                message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
            }
            switch (object.result) {
            case "Success":
            case 0:
                message.result = 0;
                break;
            case "Failed":
            case 1:
                message.result = 1;
                break;
            case "UnameExists":
            case 2:
                message.result = 2;
                break;
            case "UnameIllegal":
            case 3:
                message.result = 3;
                break;
            case "PwdIllegal":
            case 4:
                message.result = 4;
                break;
            }
            return message;
        };

        LS2GC_AskRegRet.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.opts = null;
                object.result = options.enums === String ? "Success" : 0;
            }
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            if (message.result != null && message.hasOwnProperty("result"))
                object.result = options.enums === String ? $root.Protos.LS2GC_AskRegRet.EResult[message.result] : message.result;
            return object;
        };

        LS2GC_AskRegRet.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        LS2GC_AskRegRet.EResult = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "Success"] = 0;
            values[valuesById[1] = "Failed"] = 1;
            values[valuesById[2] = "UnameExists"] = 2;
            values[valuesById[3] = "UnameIllegal"] = 3;
            values[valuesById[4] = "PwdIllegal"] = 4;
            return values;
        })();

        return LS2GC_AskRegRet;
    })();

    Protos.LS2GC_AskLoginRet = (function() {

        function LS2GC_AskLoginRet(properties) {
            this.gsInfos = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        LS2GC_AskLoginRet.prototype.opts = null;
        LS2GC_AskLoginRet.prototype.result = 0;
        LS2GC_AskLoginRet.prototype.sessionID = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
        LS2GC_AskLoginRet.prototype.gsInfos = $util.emptyArray;

        LS2GC_AskLoginRet.create = function create(properties) {
            return new LS2GC_AskLoginRet(properties);
        };

        LS2GC_AskLoginRet.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.opts != null && message.hasOwnProperty("opts"))
                $root.Protos.MsgOpts.encode(message.opts, writer.uint32(10).fork()).ldelim();
            if (message.result != null && message.hasOwnProperty("result"))
                writer.uint32(16).int32(message.result);
            if (message.sessionID != null && message.hasOwnProperty("sessionID"))
                writer.uint32(24).uint64(message.sessionID);
            if (message.gsInfos != null && message.gsInfos.length)
                for (let i = 0; i < message.gsInfos.length; ++i)
                    $root.Protos.GSInfo.encode(message.gsInfos[i], writer.uint32(34).fork()).ldelim();
            return writer;
        };

        LS2GC_AskLoginRet.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        LS2GC_AskLoginRet.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.LS2GC_AskLoginRet();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.result = reader.int32();
                    break;
                case 3:
                    message.sessionID = reader.uint64();
                    break;
                case 4:
                    if (!(message.gsInfos && message.gsInfos.length))
                        message.gsInfos = [];
                    message.gsInfos.push($root.Protos.GSInfo.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        LS2GC_AskLoginRet.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        LS2GC_AskLoginRet.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.opts != null && message.hasOwnProperty("opts")) {
                let error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            if (message.result != null && message.hasOwnProperty("result"))
                switch (message.result) {
                default:
                    return "result: enum value expected";
                case 0:
                case 1:
                case 3:
                case 4:
                    break;
                }
            if (message.sessionID != null && message.hasOwnProperty("sessionID"))
                if (!$util.isInteger(message.sessionID) && !(message.sessionID && $util.isInteger(message.sessionID.low) && $util.isInteger(message.sessionID.high)))
                    return "sessionID: integer|Long expected";
            if (message.gsInfos != null && message.hasOwnProperty("gsInfos")) {
                if (!Array.isArray(message.gsInfos))
                    return "gsInfos: array expected";
                for (let i = 0; i < message.gsInfos.length; ++i) {
                    let error = $root.Protos.GSInfo.verify(message.gsInfos[i]);
                    if (error)
                        return "gsInfos." + error;
                }
            }
            return null;
        };

        LS2GC_AskLoginRet.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.LS2GC_AskLoginRet)
                return object;
            let message = new $root.Protos.LS2GC_AskLoginRet();
            if (object.opts != null) {
                if (typeof object.opts !== "object")
                    throw TypeError(".Protos.LS2GC_AskLoginRet.opts: object expected");
                message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
            }
            switch (object.result) {
            case "Success":
            case 0:
                message.result = 0;
                break;
            case "Failed":
            case 1:
                message.result = 1;
                break;
            case "InvalidUname":
            case 3:
                message.result = 3;
                break;
            case "InvalidPwd":
            case 4:
                message.result = 4;
                break;
            }
            if (object.sessionID != null)
                if ($util.Long)
                    (message.sessionID = $util.Long.fromValue(object.sessionID)).unsigned = true;
                else if (typeof object.sessionID === "string")
                    message.sessionID = parseInt(object.sessionID, 10);
                else if (typeof object.sessionID === "number")
                    message.sessionID = object.sessionID;
                else if (typeof object.sessionID === "object")
                    message.sessionID = new $util.LongBits(object.sessionID.low >>> 0, object.sessionID.high >>> 0).toNumber(true);
            if (object.gsInfos) {
                if (!Array.isArray(object.gsInfos))
                    throw TypeError(".Protos.LS2GC_AskLoginRet.gsInfos: array expected");
                message.gsInfos = [];
                for (let i = 0; i < object.gsInfos.length; ++i) {
                    if (typeof object.gsInfos[i] !== "object")
                        throw TypeError(".Protos.LS2GC_AskLoginRet.gsInfos: object expected");
                    message.gsInfos[i] = $root.Protos.GSInfo.fromObject(object.gsInfos[i]);
                }
            }
            return message;
        };

        LS2GC_AskLoginRet.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.gsInfos = [];
            if (options.defaults) {
                object.opts = null;
                object.result = options.enums === String ? "Success" : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.sessionID = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.sessionID = options.longs === String ? "0" : 0;
            }
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            if (message.result != null && message.hasOwnProperty("result"))
                object.result = options.enums === String ? $root.Protos.LS2GC_AskLoginRet.EResult[message.result] : message.result;
            if (message.sessionID != null && message.hasOwnProperty("sessionID"))
                if (typeof message.sessionID === "number")
                    object.sessionID = options.longs === String ? String(message.sessionID) : message.sessionID;
                else
                    object.sessionID = options.longs === String ? $util.Long.prototype.toString.call(message.sessionID) : options.longs === Number ? new $util.LongBits(message.sessionID.low >>> 0, message.sessionID.high >>> 0).toNumber(true) : message.sessionID;
            if (message.gsInfos && message.gsInfos.length) {
                object.gsInfos = [];
                for (let j = 0; j < message.gsInfos.length; ++j)
                    object.gsInfos[j] = $root.Protos.GSInfo.toObject(message.gsInfos[j], options);
            }
            return object;
        };

        LS2GC_AskLoginRet.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        LS2GC_AskLoginRet.EResult = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "Success"] = 0;
            values[valuesById[1] = "Failed"] = 1;
            values[valuesById[3] = "InvalidUname"] = 3;
            values[valuesById[4] = "InvalidPwd"] = 4;
            return values;
        })();

        return LS2GC_AskLoginRet;
    })();

    return Protos;
})();

export { $root as default };