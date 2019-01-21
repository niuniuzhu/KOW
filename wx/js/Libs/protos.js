/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("./protobufjs");

var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.Protos = (function() {

    var Protos = {};

    Protos.BSInfo = (function() {

        function BSInfo(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
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
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.BSInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
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
            var message = new $root.Protos.BSInfo();
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
            var object = {};
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
            var valuesById = {}, values = Object.create(valuesById);
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
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
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
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.BS2CS_ReportState();
            while (reader.pos < end) {
                var tag = reader.uint32();
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
                var error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            if (message.bsInfo != null && message.hasOwnProperty("bsInfo")) {
                var error = $root.Protos.BSInfo.verify(message.bsInfo);
                if (error)
                    return "bsInfo." + error;
            }
            return null;
        };

        BS2CS_ReportState.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.BS2CS_ReportState)
                return object;
            var message = new $root.Protos.BS2CS_ReportState();
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
            var object = {};
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
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        BS2CS_BattleInfoRet.prototype.opts = null;
        BS2CS_BattleInfoRet.prototype.result = 0;
        BS2CS_BattleInfoRet.prototype.bid = 0;

        BS2CS_BattleInfoRet.create = function create(properties) {
            return new BS2CS_BattleInfoRet(properties);
        };

        BS2CS_BattleInfoRet.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.opts != null && message.hasOwnProperty("opts"))
                $root.Protos.MsgOpts.encode(message.opts, writer.uint32(10).fork()).ldelim();
            if (message.result != null && message.hasOwnProperty("result"))
                writer.uint32(16).int32(message.result);
            if (message.bid != null && message.hasOwnProperty("bid"))
                writer.uint32(24).uint32(message.bid);
            return writer;
        };

        BS2CS_BattleInfoRet.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        BS2CS_BattleInfoRet.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.BS2CS_BattleInfoRet();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.result = reader.int32();
                    break;
                case 3:
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
                var error = $root.Protos.MsgOpts.verify(message.opts);
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
            if (message.bid != null && message.hasOwnProperty("bid"))
                if (!$util.isInteger(message.bid))
                    return "bid: integer expected";
            return null;
        };

        BS2CS_BattleInfoRet.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.BS2CS_BattleInfoRet)
                return object;
            var message = new $root.Protos.BS2CS_BattleInfoRet();
            if (object.opts != null) {
                if (typeof object.opts !== "object")
                    throw TypeError(".Protos.BS2CS_BattleInfoRet.opts: object expected");
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
            if (object.bid != null)
                message.bid = object.bid >>> 0;
            return message;
        };

        BS2CS_BattleInfoRet.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.opts = null;
                object.result = options.enums === String ? "Success" : 0;
                object.bid = 0;
            }
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            if (message.result != null && message.hasOwnProperty("result"))
                object.result = options.enums === String ? $root.Protos.Global.ECommon[message.result] : message.result;
            if (message.bid != null && message.hasOwnProperty("bid"))
                object.bid = message.bid;
            return object;
        };

        BS2CS_BattleInfoRet.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BS2CS_BattleInfoRet;
    })();

    Protos.BS2CS_BattleEndInfo = (function() {

        function BS2CS_BattleEndInfo(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        BS2CS_BattleEndInfo.prototype.win = false;
        BS2CS_BattleEndInfo.prototype.damage = 0;
        BS2CS_BattleEndInfo.prototype.hurt = 0;
        BS2CS_BattleEndInfo.prototype.heal = 0;
        BS2CS_BattleEndInfo.prototype.occupyTime = 0;
        BS2CS_BattleEndInfo.prototype.skill0Used = 0;
        BS2CS_BattleEndInfo.prototype.skill1Used = 0;
        BS2CS_BattleEndInfo.prototype.skill0Damage = 0;
        BS2CS_BattleEndInfo.prototype.skill1Damage = 0;

        BS2CS_BattleEndInfo.create = function create(properties) {
            return new BS2CS_BattleEndInfo(properties);
        };

        BS2CS_BattleEndInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.win != null && message.hasOwnProperty("win"))
                writer.uint32(16).bool(message.win);
            if (message.damage != null && message.hasOwnProperty("damage"))
                writer.uint32(24).uint32(message.damage);
            if (message.hurt != null && message.hasOwnProperty("hurt"))
                writer.uint32(32).uint32(message.hurt);
            if (message.heal != null && message.hasOwnProperty("heal"))
                writer.uint32(40).uint32(message.heal);
            if (message.occupyTime != null && message.hasOwnProperty("occupyTime"))
                writer.uint32(48).uint32(message.occupyTime);
            if (message.skill0Used != null && message.hasOwnProperty("skill0Used"))
                writer.uint32(56).uint32(message.skill0Used);
            if (message.skill1Used != null && message.hasOwnProperty("skill1Used"))
                writer.uint32(64).uint32(message.skill1Used);
            if (message.skill0Damage != null && message.hasOwnProperty("skill0Damage"))
                writer.uint32(72).uint32(message.skill0Damage);
            if (message.skill1Damage != null && message.hasOwnProperty("skill1Damage"))
                writer.uint32(80).uint32(message.skill1Damage);
            return writer;
        };

        BS2CS_BattleEndInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        BS2CS_BattleEndInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.BS2CS_BattleEndInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 2:
                    message.win = reader.bool();
                    break;
                case 3:
                    message.damage = reader.uint32();
                    break;
                case 4:
                    message.hurt = reader.uint32();
                    break;
                case 5:
                    message.heal = reader.uint32();
                    break;
                case 6:
                    message.occupyTime = reader.uint32();
                    break;
                case 7:
                    message.skill0Used = reader.uint32();
                    break;
                case 8:
                    message.skill1Used = reader.uint32();
                    break;
                case 9:
                    message.skill0Damage = reader.uint32();
                    break;
                case 10:
                    message.skill1Damage = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        BS2CS_BattleEndInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        BS2CS_BattleEndInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.win != null && message.hasOwnProperty("win"))
                if (typeof message.win !== "boolean")
                    return "win: boolean expected";
            if (message.damage != null && message.hasOwnProperty("damage"))
                if (!$util.isInteger(message.damage))
                    return "damage: integer expected";
            if (message.hurt != null && message.hasOwnProperty("hurt"))
                if (!$util.isInteger(message.hurt))
                    return "hurt: integer expected";
            if (message.heal != null && message.hasOwnProperty("heal"))
                if (!$util.isInteger(message.heal))
                    return "heal: integer expected";
            if (message.occupyTime != null && message.hasOwnProperty("occupyTime"))
                if (!$util.isInteger(message.occupyTime))
                    return "occupyTime: integer expected";
            if (message.skill0Used != null && message.hasOwnProperty("skill0Used"))
                if (!$util.isInteger(message.skill0Used))
                    return "skill0Used: integer expected";
            if (message.skill1Used != null && message.hasOwnProperty("skill1Used"))
                if (!$util.isInteger(message.skill1Used))
                    return "skill1Used: integer expected";
            if (message.skill0Damage != null && message.hasOwnProperty("skill0Damage"))
                if (!$util.isInteger(message.skill0Damage))
                    return "skill0Damage: integer expected";
            if (message.skill1Damage != null && message.hasOwnProperty("skill1Damage"))
                if (!$util.isInteger(message.skill1Damage))
                    return "skill1Damage: integer expected";
            return null;
        };

        BS2CS_BattleEndInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.BS2CS_BattleEndInfo)
                return object;
            var message = new $root.Protos.BS2CS_BattleEndInfo();
            if (object.win != null)
                message.win = Boolean(object.win);
            if (object.damage != null)
                message.damage = object.damage >>> 0;
            if (object.hurt != null)
                message.hurt = object.hurt >>> 0;
            if (object.heal != null)
                message.heal = object.heal >>> 0;
            if (object.occupyTime != null)
                message.occupyTime = object.occupyTime >>> 0;
            if (object.skill0Used != null)
                message.skill0Used = object.skill0Used >>> 0;
            if (object.skill1Used != null)
                message.skill1Used = object.skill1Used >>> 0;
            if (object.skill0Damage != null)
                message.skill0Damage = object.skill0Damage >>> 0;
            if (object.skill1Damage != null)
                message.skill1Damage = object.skill1Damage >>> 0;
            return message;
        };

        BS2CS_BattleEndInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.win = false;
                object.damage = 0;
                object.hurt = 0;
                object.heal = 0;
                object.occupyTime = 0;
                object.skill0Used = 0;
                object.skill1Used = 0;
                object.skill0Damage = 0;
                object.skill1Damage = 0;
            }
            if (message.win != null && message.hasOwnProperty("win"))
                object.win = message.win;
            if (message.damage != null && message.hasOwnProperty("damage"))
                object.damage = message.damage;
            if (message.hurt != null && message.hasOwnProperty("hurt"))
                object.hurt = message.hurt;
            if (message.heal != null && message.hasOwnProperty("heal"))
                object.heal = message.heal;
            if (message.occupyTime != null && message.hasOwnProperty("occupyTime"))
                object.occupyTime = message.occupyTime;
            if (message.skill0Used != null && message.hasOwnProperty("skill0Used"))
                object.skill0Used = message.skill0Used;
            if (message.skill1Used != null && message.hasOwnProperty("skill1Used"))
                object.skill1Used = message.skill1Used;
            if (message.skill0Damage != null && message.hasOwnProperty("skill0Damage"))
                object.skill0Damage = message.skill0Damage;
            if (message.skill1Damage != null && message.hasOwnProperty("skill1Damage"))
                object.skill1Damage = message.skill1Damage;
            return object;
        };

        BS2CS_BattleEndInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BS2CS_BattleEndInfo;
    })();

    Protos.BS2CS_BattleEnd = (function() {

        function BS2CS_BattleEnd(properties) {
            this.infos = {};
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        BS2CS_BattleEnd.prototype.opts = null;
        BS2CS_BattleEnd.prototype.bid = 0;
        BS2CS_BattleEnd.prototype.infos = $util.emptyObject;

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
            if (message.infos != null && message.hasOwnProperty("infos"))
                for (var keys = Object.keys(message.infos), i = 0; i < keys.length; ++i) {
                    writer.uint32(26).fork().uint32(8).uint64(keys[i]);
                    $root.Protos.BS2CS_BattleEndInfo.encode(message.infos[keys[i]], writer.uint32(18).fork()).ldelim().ldelim();
                }
            return writer;
        };

        BS2CS_BattleEnd.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        BS2CS_BattleEnd.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.BS2CS_BattleEnd(), key;
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.bid = reader.uint32();
                    break;
                case 3:
                    reader.skip().pos++;
                    if (message.infos === $util.emptyObject)
                        message.infos = {};
                    key = reader.uint64();
                    reader.pos++;
                    message.infos[typeof key === "object" ? $util.longToHash(key) : key] = $root.Protos.BS2CS_BattleEndInfo.decode(reader, reader.uint32());
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
                var error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            if (message.bid != null && message.hasOwnProperty("bid"))
                if (!$util.isInteger(message.bid))
                    return "bid: integer expected";
            if (message.infos != null && message.hasOwnProperty("infos")) {
                if (!$util.isObject(message.infos))
                    return "infos: object expected";
                var key = Object.keys(message.infos);
                for (var i = 0; i < key.length; ++i) {
                    if (!$util.key64Re.test(key[i]))
                        return "infos: integer|Long key{k:uint64} expected";
                    {
                        var error = $root.Protos.BS2CS_BattleEndInfo.verify(message.infos[key[i]]);
                        if (error)
                            return "infos." + error;
                    }
                }
            }
            return null;
        };

        BS2CS_BattleEnd.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.BS2CS_BattleEnd)
                return object;
            var message = new $root.Protos.BS2CS_BattleEnd();
            if (object.opts != null) {
                if (typeof object.opts !== "object")
                    throw TypeError(".Protos.BS2CS_BattleEnd.opts: object expected");
                message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
            }
            if (object.bid != null)
                message.bid = object.bid >>> 0;
            if (object.infos) {
                if (typeof object.infos !== "object")
                    throw TypeError(".Protos.BS2CS_BattleEnd.infos: object expected");
                message.infos = {};
                for (var keys = Object.keys(object.infos), i = 0; i < keys.length; ++i) {
                    if (typeof object.infos[keys[i]] !== "object")
                        throw TypeError(".Protos.BS2CS_BattleEnd.infos: object expected");
                    message.infos[keys[i]] = $root.Protos.BS2CS_BattleEndInfo.fromObject(object.infos[keys[i]]);
                }
            }
            return message;
        };

        BS2CS_BattleEnd.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.objects || options.defaults)
                object.infos = {};
            if (options.defaults) {
                object.opts = null;
                object.bid = 0;
            }
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            if (message.bid != null && message.hasOwnProperty("bid"))
                object.bid = message.bid;
            var keys2;
            if (message.infos && (keys2 = Object.keys(message.infos)).length) {
                object.infos = {};
                for (var j = 0; j < keys2.length; ++j)
                    object.infos[keys2[j]] = $root.Protos.BS2CS_BattleEndInfo.toObject(message.infos[keys2[j]], options);
            }
            return object;
        };

        BS2CS_BattleEnd.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BS2CS_BattleEnd;
    })();

    Protos.BS2CS_KickUser = (function() {

        function BS2CS_KickUser(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        BS2CS_KickUser.prototype.opts = null;
        BS2CS_KickUser.prototype.gcNID = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
        BS2CS_KickUser.prototype.reason = 0;

        BS2CS_KickUser.create = function create(properties) {
            return new BS2CS_KickUser(properties);
        };

        BS2CS_KickUser.encode = function encode(message, writer) {
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

        BS2CS_KickUser.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        BS2CS_KickUser.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.BS2CS_KickUser();
            while (reader.pos < end) {
                var tag = reader.uint32();
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

        BS2CS_KickUser.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        BS2CS_KickUser.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.opts != null && message.hasOwnProperty("opts")) {
                var error = $root.Protos.MsgOpts.verify(message.opts);
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
                    break;
                }
            return null;
        };

        BS2CS_KickUser.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.BS2CS_KickUser)
                return object;
            var message = new $root.Protos.BS2CS_KickUser();
            if (object.opts != null) {
                if (typeof object.opts !== "object")
                    throw TypeError(".Protos.BS2CS_KickUser.opts: object expected");
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
            case "OutOfSync":
            case 0:
                message.reason = 0;
                break;
            }
            return message;
        };

        BS2CS_KickUser.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.opts = null;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.gcNID = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.gcNID = options.longs === String ? "0" : 0;
                object.reason = options.enums === String ? "OutOfSync" : 0;
            }
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            if (message.gcNID != null && message.hasOwnProperty("gcNID"))
                if (typeof message.gcNID === "number")
                    object.gcNID = options.longs === String ? String(message.gcNID) : message.gcNID;
                else
                    object.gcNID = options.longs === String ? $util.Long.prototype.toString.call(message.gcNID) : options.longs === Number ? new $util.LongBits(message.gcNID.low >>> 0, message.gcNID.high >>> 0).toNumber(true) : message.gcNID;
            if (message.reason != null && message.hasOwnProperty("reason"))
                object.reason = options.enums === String ? $root.Protos.BS2CS_KickUser.Reason[message.reason] : message.reason;
            return object;
        };

        BS2CS_KickUser.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        BS2CS_KickUser.Reason = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "OutOfSync"] = 0;
            return values;
        })();

        return BS2CS_KickUser;
    })();

    Protos.MsgID = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "Undefine"] = 0;
        values[valuesById[10] = "eG_AskPing"] = 10;
        values[valuesById[11] = "eG_AskPingRet"] = 11;
        values[valuesById[1000] = "eGC2LS_AskRegister"] = 1000;
        values[valuesById[1001] = "eGC2LS_AskLogin"] = 1001;
        values[valuesById[1002] = "eGC2LS_AskSmartLogin"] = 1002;
        values[valuesById[1003] = "eGC2LS_AskWXLogin"] = 1003;
        values[valuesById[1004] = "eGC2LC_UpdateProfile"] = 1004;
        values[valuesById[1100] = "eGC2GS_AskLogin"] = 1100;
        values[valuesById[1101] = "eGC2GS_KeepAlive"] = 1101;
        values[valuesById[1200] = "eGC2BS_AskLogin"] = 1200;
        values[valuesById[1201] = "eGC2BS_KeepAlive"] = 1201;
        values[valuesById[1202] = "eGC2BS_RequestSnapshot"] = 1202;
        values[valuesById[1203] = "eGC2BS_FrameAction"] = 1203;
        values[valuesById[1204] = "eGC2BS_RequestFrameActions"] = 1204;
        values[valuesById[1205] = "eGC2BS_CommitSnapshot"] = 1205;
        values[valuesById[1206] = "eGC2BS_EndBattle"] = 1206;
        values[valuesById[1300] = "eGC2CS_BeginMatch"] = 1300;
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
        values[valuesById[3100] = "eGS2GC_LoginRet"] = 3100;
        values[valuesById[3101] = "eGS2GC_Kick"] = 3101;
        values[valuesById[3102] = "eGS2GC_CSLost"] = 3102;
        values[valuesById[4000] = "eBS2CS_ReportState"] = 4000;
        values[valuesById[4001] = "eBS2CS_BattleInfoRet"] = 4001;
        values[valuesById[4002] = "eBS2CS_BattleEnd"] = 4002;
        values[valuesById[4003] = "eBS2CS_KickUser"] = 4003;
        values[valuesById[4100] = "eBS2GC_LoginRet"] = 4100;
        values[valuesById[4101] = "eBS2GC_RequestSnapshotRet"] = 4101;
        values[valuesById[4102] = "eBS2GC_FrameAction"] = 4102;
        values[valuesById[4103] = "eBS2GC_RequestFrameActionsRet"] = 4103;
        values[valuesById[4104] = "eBS2GC_OutOfSync"] = 4104;
        values[valuesById[5000] = "eCS2LS_GSInfos"] = 5000;
        values[valuesById[5001] = "eCS2LS_GSInfo"] = 5001;
        values[valuesById[5002] = "eCS2LS_GSLost"] = 5002;
        values[valuesById[5003] = "eCS2LS_GCLoginRet"] = 5003;
        values[valuesById[5100] = "eCS2GS_GCLoginRet"] = 5100;
        values[valuesById[5101] = "eCS2GS_KickGC"] = 5101;
        values[valuesById[5200] = "eCS2BS_BattleInfo"] = 5200;
        values[valuesById[5300] = "eCS2GC_BeginMatchRet"] = 5300;
        values[valuesById[5301] = "eCS2GC_PlayerJoin"] = 5301;
        values[valuesById[5302] = "eCS2GC_PlayerLeave"] = 5302;
        values[valuesById[5303] = "eCS2GC_RoomInfo"] = 5303;
        values[valuesById[5304] = "eCS2GC_EnterBattle"] = 5304;
        values[valuesById[5305] = "eCS2GC_BattleEnd"] = 5305;
        values[valuesById[5306] = "eCS2GC_BSLose"] = 5306;
        values[valuesById[8000] = "eDB2LS_QueryAccountRet"] = 8000;
        values[valuesById[8001] = "eDB2LS_QueryLoginRet"] = 8001;
        values[valuesById[8002] = "eDB2LS_ExecRet"] = 8002;
        return values;
    })();

    Protos.MsgOpts = (function() {

        function MsgOpts(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
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
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.MsgOpts();
            while (reader.pos < end) {
                var tag = reader.uint32();
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
            var message = new $root.Protos.MsgOpts();
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
            var object = {};
            if (options.defaults) {
                object.flag = 0;
                object.pid = 0;
                object.rpid = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
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
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "Norm"] = 0;
            values[valuesById[1] = "RPC"] = 1;
            values[valuesById[2] = "RESP"] = 2;
            values[valuesById[3] = "TRANS"] = 3;
            return values;
        })();

        MsgOpts.TransTarget = (function() {
            var valuesById = {}, values = Object.create(valuesById);
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
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
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
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.G_AskPing();
            while (reader.pos < end) {
                var tag = reader.uint32();
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
                var error = $root.Protos.MsgOpts.verify(message.opts);
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
            var message = new $root.Protos.G_AskPing();
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
            var object = {};
            if (options.defaults) {
                object.opts = null;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
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
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
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
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.G_AskPingRet();
            while (reader.pos < end) {
                var tag = reader.uint32();
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
                var error = $root.Protos.MsgOpts.verify(message.opts);
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
            var message = new $root.Protos.G_AskPingRet();
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
            var object = {};
            if (options.defaults) {
                object.opts = null;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.stime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.stime = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
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
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
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
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.Global();
            while (reader.pos < end) {
                var tag = reader.uint32();
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
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "Success"] = 0;
            values[valuesById[1] = "Failed"] = 1;
            return values;
        })();

        Global.Channel = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "Web"] = 0;
            values[valuesById[1] = "WXMini"] = 1;
            return values;
        })();

        Global.Platform = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "PC"] = 0;
            values[valuesById[1] = "Android"] = 1;
            values[valuesById[2] = "IOS"] = 2;
            values[valuesById[3] = "WP"] = 3;
            return values;
        })();

        Global.Browser = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "Chrome"] = 0;
            values[valuesById[1] = "Firefox"] = 1;
            values[valuesById[2] = "Safair"] = 2;
            values[valuesById[3] = "Edge"] = 3;
            values[valuesById[4] = "IE"] = 4;
            return values;
        })();

        return Global;
    })();

    Protos.G_UserInfo = (function() {

        function G_UserInfo(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        G_UserInfo.prototype.gcNID = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
        G_UserInfo.prototype.nickname = "";
        G_UserInfo.prototype.avatar = "";
        G_UserInfo.prototype.gender = 0;
        G_UserInfo.prototype.honor = 0;

        G_UserInfo.create = function create(properties) {
            return new G_UserInfo(properties);
        };

        G_UserInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.gcNID != null && message.hasOwnProperty("gcNID"))
                writer.uint32(8).uint64(message.gcNID);
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                writer.uint32(18).string(message.nickname);
            if (message.avatar != null && message.hasOwnProperty("avatar"))
                writer.uint32(26).string(message.avatar);
            if (message.gender != null && message.hasOwnProperty("gender"))
                writer.uint32(32).int32(message.gender);
            if (message.honor != null && message.hasOwnProperty("honor"))
                writer.uint32(40).int32(message.honor);
            return writer;
        };

        G_UserInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        G_UserInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.G_UserInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.gcNID = reader.uint64();
                    break;
                case 2:
                    message.nickname = reader.string();
                    break;
                case 3:
                    message.avatar = reader.string();
                    break;
                case 4:
                    message.gender = reader.int32();
                    break;
                case 5:
                    message.honor = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        G_UserInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        G_UserInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.gcNID != null && message.hasOwnProperty("gcNID"))
                if (!$util.isInteger(message.gcNID) && !(message.gcNID && $util.isInteger(message.gcNID.low) && $util.isInteger(message.gcNID.high)))
                    return "gcNID: integer|Long expected";
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                if (!$util.isString(message.nickname))
                    return "nickname: string expected";
            if (message.avatar != null && message.hasOwnProperty("avatar"))
                if (!$util.isString(message.avatar))
                    return "avatar: string expected";
            if (message.gender != null && message.hasOwnProperty("gender"))
                if (!$util.isInteger(message.gender))
                    return "gender: integer expected";
            if (message.honor != null && message.hasOwnProperty("honor"))
                if (!$util.isInteger(message.honor))
                    return "honor: integer expected";
            return null;
        };

        G_UserInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.G_UserInfo)
                return object;
            var message = new $root.Protos.G_UserInfo();
            if (object.gcNID != null)
                if ($util.Long)
                    (message.gcNID = $util.Long.fromValue(object.gcNID)).unsigned = true;
                else if (typeof object.gcNID === "string")
                    message.gcNID = parseInt(object.gcNID, 10);
                else if (typeof object.gcNID === "number")
                    message.gcNID = object.gcNID;
                else if (typeof object.gcNID === "object")
                    message.gcNID = new $util.LongBits(object.gcNID.low >>> 0, object.gcNID.high >>> 0).toNumber(true);
            if (object.nickname != null)
                message.nickname = String(object.nickname);
            if (object.avatar != null)
                message.avatar = String(object.avatar);
            if (object.gender != null)
                message.gender = object.gender | 0;
            if (object.honor != null)
                message.honor = object.honor | 0;
            return message;
        };

        G_UserInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.gcNID = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.gcNID = options.longs === String ? "0" : 0;
                object.nickname = "";
                object.avatar = "";
                object.gender = 0;
                object.honor = 0;
            }
            if (message.gcNID != null && message.hasOwnProperty("gcNID"))
                if (typeof message.gcNID === "number")
                    object.gcNID = options.longs === String ? String(message.gcNID) : message.gcNID;
                else
                    object.gcNID = options.longs === String ? $util.Long.prototype.toString.call(message.gcNID) : options.longs === Number ? new $util.LongBits(message.gcNID.low >>> 0, message.gcNID.high >>> 0).toNumber(true) : message.gcNID;
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                object.nickname = message.nickname;
            if (message.avatar != null && message.hasOwnProperty("avatar"))
                object.avatar = message.avatar;
            if (message.gender != null && message.hasOwnProperty("gender"))
                object.gender = message.gender;
            if (message.honor != null && message.hasOwnProperty("honor"))
                object.honor = message.honor;
            return object;
        };

        G_UserInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return G_UserInfo;
    })();

    Protos.BS2GC_LoginRet = (function() {

        function BS2GC_LoginRet(properties) {
            this.playerInfos = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        BS2GC_LoginRet.prototype.opts = null;
        BS2GC_LoginRet.prototype.result = 0;
        BS2GC_LoginRet.prototype.playerID = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
        BS2GC_LoginRet.prototype.rndSeed = 0;
        BS2GC_LoginRet.prototype.frameRate = 0;
        BS2GC_LoginRet.prototype.keyframeStep = 0;
        BS2GC_LoginRet.prototype.snapshotStep = 0;
        BS2GC_LoginRet.prototype.battleTime = 0;
        BS2GC_LoginRet.prototype.mapID = 0;
        BS2GC_LoginRet.prototype.curFrame = 0;
        BS2GC_LoginRet.prototype.playerInfos = $util.emptyArray;

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
            if (message.playerID != null && message.hasOwnProperty("playerID"))
                writer.uint32(24).uint64(message.playerID);
            if (message.rndSeed != null && message.hasOwnProperty("rndSeed"))
                writer.uint32(32).int32(message.rndSeed);
            if (message.frameRate != null && message.hasOwnProperty("frameRate"))
                writer.uint32(40).int32(message.frameRate);
            if (message.keyframeStep != null && message.hasOwnProperty("keyframeStep"))
                writer.uint32(48).int32(message.keyframeStep);
            if (message.snapshotStep != null && message.hasOwnProperty("snapshotStep"))
                writer.uint32(56).int32(message.snapshotStep);
            if (message.battleTime != null && message.hasOwnProperty("battleTime"))
                writer.uint32(64).int32(message.battleTime);
            if (message.mapID != null && message.hasOwnProperty("mapID"))
                writer.uint32(72).int32(message.mapID);
            if (message.curFrame != null && message.hasOwnProperty("curFrame"))
                writer.uint32(80).int32(message.curFrame);
            if (message.playerInfos != null && message.playerInfos.length)
                for (var i = 0; i < message.playerInfos.length; ++i)
                    $root.Protos.CS2BS_PlayerInfo.encode(message.playerInfos[i], writer.uint32(90).fork()).ldelim();
            return writer;
        };

        BS2GC_LoginRet.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        BS2GC_LoginRet.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.BS2GC_LoginRet();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.result = reader.int32();
                    break;
                case 3:
                    message.playerID = reader.uint64();
                    break;
                case 4:
                    message.rndSeed = reader.int32();
                    break;
                case 5:
                    message.frameRate = reader.int32();
                    break;
                case 6:
                    message.keyframeStep = reader.int32();
                    break;
                case 7:
                    message.snapshotStep = reader.int32();
                    break;
                case 8:
                    message.battleTime = reader.int32();
                    break;
                case 9:
                    message.mapID = reader.int32();
                    break;
                case 10:
                    message.curFrame = reader.int32();
                    break;
                case 11:
                    if (!(message.playerInfos && message.playerInfos.length))
                        message.playerInfos = [];
                    message.playerInfos.push($root.Protos.CS2BS_PlayerInfo.decode(reader, reader.uint32()));
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
                var error = $root.Protos.MsgOpts.verify(message.opts);
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
            if (message.playerID != null && message.hasOwnProperty("playerID"))
                if (!$util.isInteger(message.playerID) && !(message.playerID && $util.isInteger(message.playerID.low) && $util.isInteger(message.playerID.high)))
                    return "playerID: integer|Long expected";
            if (message.rndSeed != null && message.hasOwnProperty("rndSeed"))
                if (!$util.isInteger(message.rndSeed))
                    return "rndSeed: integer expected";
            if (message.frameRate != null && message.hasOwnProperty("frameRate"))
                if (!$util.isInteger(message.frameRate))
                    return "frameRate: integer expected";
            if (message.keyframeStep != null && message.hasOwnProperty("keyframeStep"))
                if (!$util.isInteger(message.keyframeStep))
                    return "keyframeStep: integer expected";
            if (message.snapshotStep != null && message.hasOwnProperty("snapshotStep"))
                if (!$util.isInteger(message.snapshotStep))
                    return "snapshotStep: integer expected";
            if (message.battleTime != null && message.hasOwnProperty("battleTime"))
                if (!$util.isInteger(message.battleTime))
                    return "battleTime: integer expected";
            if (message.mapID != null && message.hasOwnProperty("mapID"))
                if (!$util.isInteger(message.mapID))
                    return "mapID: integer expected";
            if (message.curFrame != null && message.hasOwnProperty("curFrame"))
                if (!$util.isInteger(message.curFrame))
                    return "curFrame: integer expected";
            if (message.playerInfos != null && message.hasOwnProperty("playerInfos")) {
                if (!Array.isArray(message.playerInfos))
                    return "playerInfos: array expected";
                for (var i = 0; i < message.playerInfos.length; ++i) {
                    var error = $root.Protos.CS2BS_PlayerInfo.verify(message.playerInfos[i]);
                    if (error)
                        return "playerInfos." + error;
                }
            }
            return null;
        };

        BS2GC_LoginRet.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.BS2GC_LoginRet)
                return object;
            var message = new $root.Protos.BS2GC_LoginRet();
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
            if (object.playerID != null)
                if ($util.Long)
                    (message.playerID = $util.Long.fromValue(object.playerID)).unsigned = true;
                else if (typeof object.playerID === "string")
                    message.playerID = parseInt(object.playerID, 10);
                else if (typeof object.playerID === "number")
                    message.playerID = object.playerID;
                else if (typeof object.playerID === "object")
                    message.playerID = new $util.LongBits(object.playerID.low >>> 0, object.playerID.high >>> 0).toNumber(true);
            if (object.rndSeed != null)
                message.rndSeed = object.rndSeed | 0;
            if (object.frameRate != null)
                message.frameRate = object.frameRate | 0;
            if (object.keyframeStep != null)
                message.keyframeStep = object.keyframeStep | 0;
            if (object.snapshotStep != null)
                message.snapshotStep = object.snapshotStep | 0;
            if (object.battleTime != null)
                message.battleTime = object.battleTime | 0;
            if (object.mapID != null)
                message.mapID = object.mapID | 0;
            if (object.curFrame != null)
                message.curFrame = object.curFrame | 0;
            if (object.playerInfos) {
                if (!Array.isArray(object.playerInfos))
                    throw TypeError(".Protos.BS2GC_LoginRet.playerInfos: array expected");
                message.playerInfos = [];
                for (var i = 0; i < object.playerInfos.length; ++i) {
                    if (typeof object.playerInfos[i] !== "object")
                        throw TypeError(".Protos.BS2GC_LoginRet.playerInfos: object expected");
                    message.playerInfos[i] = $root.Protos.CS2BS_PlayerInfo.fromObject(object.playerInfos[i]);
                }
            }
            return message;
        };

        BS2GC_LoginRet.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.playerInfos = [];
            if (options.defaults) {
                object.opts = null;
                object.result = options.enums === String ? "Success" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.playerID = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.playerID = options.longs === String ? "0" : 0;
                object.rndSeed = 0;
                object.frameRate = 0;
                object.keyframeStep = 0;
                object.snapshotStep = 0;
                object.battleTime = 0;
                object.mapID = 0;
                object.curFrame = 0;
            }
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            if (message.result != null && message.hasOwnProperty("result"))
                object.result = options.enums === String ? $root.Protos.Global.ECommon[message.result] : message.result;
            if (message.playerID != null && message.hasOwnProperty("playerID"))
                if (typeof message.playerID === "number")
                    object.playerID = options.longs === String ? String(message.playerID) : message.playerID;
                else
                    object.playerID = options.longs === String ? $util.Long.prototype.toString.call(message.playerID) : options.longs === Number ? new $util.LongBits(message.playerID.low >>> 0, message.playerID.high >>> 0).toNumber(true) : message.playerID;
            if (message.rndSeed != null && message.hasOwnProperty("rndSeed"))
                object.rndSeed = message.rndSeed;
            if (message.frameRate != null && message.hasOwnProperty("frameRate"))
                object.frameRate = message.frameRate;
            if (message.keyframeStep != null && message.hasOwnProperty("keyframeStep"))
                object.keyframeStep = message.keyframeStep;
            if (message.snapshotStep != null && message.hasOwnProperty("snapshotStep"))
                object.snapshotStep = message.snapshotStep;
            if (message.battleTime != null && message.hasOwnProperty("battleTime"))
                object.battleTime = message.battleTime;
            if (message.mapID != null && message.hasOwnProperty("mapID"))
                object.mapID = message.mapID;
            if (message.curFrame != null && message.hasOwnProperty("curFrame"))
                object.curFrame = message.curFrame;
            if (message.playerInfos && message.playerInfos.length) {
                object.playerInfos = [];
                for (var j = 0; j < message.playerInfos.length; ++j)
                    object.playerInfos[j] = $root.Protos.CS2BS_PlayerInfo.toObject(message.playerInfos[j], options);
            }
            return object;
        };

        BS2GC_LoginRet.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BS2GC_LoginRet;
    })();

    Protos.BS2GC_RequestSnapshotRet = (function() {

        function BS2GC_RequestSnapshotRet(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        BS2GC_RequestSnapshotRet.prototype.opts = null;
        BS2GC_RequestSnapshotRet.prototype.result = 0;
        BS2GC_RequestSnapshotRet.prototype.reqFrame = 0;
        BS2GC_RequestSnapshotRet.prototype.curFrame = 0;
        BS2GC_RequestSnapshotRet.prototype.snapshot = $util.newBuffer([]);

        BS2GC_RequestSnapshotRet.create = function create(properties) {
            return new BS2GC_RequestSnapshotRet(properties);
        };

        BS2GC_RequestSnapshotRet.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.opts != null && message.hasOwnProperty("opts"))
                $root.Protos.MsgOpts.encode(message.opts, writer.uint32(10).fork()).ldelim();
            if (message.result != null && message.hasOwnProperty("result"))
                writer.uint32(16).int32(message.result);
            if (message.reqFrame != null && message.hasOwnProperty("reqFrame"))
                writer.uint32(24).int32(message.reqFrame);
            if (message.curFrame != null && message.hasOwnProperty("curFrame"))
                writer.uint32(32).int32(message.curFrame);
            if (message.snapshot != null && message.hasOwnProperty("snapshot"))
                writer.uint32(42).bytes(message.snapshot);
            return writer;
        };

        BS2GC_RequestSnapshotRet.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        BS2GC_RequestSnapshotRet.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.BS2GC_RequestSnapshotRet();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.result = reader.int32();
                    break;
                case 3:
                    message.reqFrame = reader.int32();
                    break;
                case 4:
                    message.curFrame = reader.int32();
                    break;
                case 5:
                    message.snapshot = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        BS2GC_RequestSnapshotRet.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        BS2GC_RequestSnapshotRet.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.opts != null && message.hasOwnProperty("opts")) {
                var error = $root.Protos.MsgOpts.verify(message.opts);
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
                    break;
                }
            if (message.reqFrame != null && message.hasOwnProperty("reqFrame"))
                if (!$util.isInteger(message.reqFrame))
                    return "reqFrame: integer expected";
            if (message.curFrame != null && message.hasOwnProperty("curFrame"))
                if (!$util.isInteger(message.curFrame))
                    return "curFrame: integer expected";
            if (message.snapshot != null && message.hasOwnProperty("snapshot"))
                if (!(message.snapshot && typeof message.snapshot.length === "number" || $util.isString(message.snapshot)))
                    return "snapshot: buffer expected";
            return null;
        };

        BS2GC_RequestSnapshotRet.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.BS2GC_RequestSnapshotRet)
                return object;
            var message = new $root.Protos.BS2GC_RequestSnapshotRet();
            if (object.opts != null) {
                if (typeof object.opts !== "object")
                    throw TypeError(".Protos.BS2GC_RequestSnapshotRet.opts: object expected");
                message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
            }
            switch (object.result) {
            case "Success":
            case 0:
                message.result = 0;
                break;
            case "InvalidUser":
            case 1:
                message.result = 1;
                break;
            case "InvalidBattle":
            case 2:
                message.result = 2;
                break;
            }
            if (object.reqFrame != null)
                message.reqFrame = object.reqFrame | 0;
            if (object.curFrame != null)
                message.curFrame = object.curFrame | 0;
            if (object.snapshot != null)
                if (typeof object.snapshot === "string")
                    $util.base64.decode(object.snapshot, message.snapshot = $util.newBuffer($util.base64.length(object.snapshot)), 0);
                else if (object.snapshot.length)
                    message.snapshot = object.snapshot;
            return message;
        };

        BS2GC_RequestSnapshotRet.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.opts = null;
                object.result = options.enums === String ? "Success" : 0;
                object.reqFrame = 0;
                object.curFrame = 0;
                if (options.bytes === String)
                    object.snapshot = "";
                else {
                    object.snapshot = [];
                    if (options.bytes !== Array)
                        object.snapshot = $util.newBuffer(object.snapshot);
                }
            }
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            if (message.result != null && message.hasOwnProperty("result"))
                object.result = options.enums === String ? $root.Protos.BS2GC_RequestSnapshotRet.EResult[message.result] : message.result;
            if (message.reqFrame != null && message.hasOwnProperty("reqFrame"))
                object.reqFrame = message.reqFrame;
            if (message.curFrame != null && message.hasOwnProperty("curFrame"))
                object.curFrame = message.curFrame;
            if (message.snapshot != null && message.hasOwnProperty("snapshot"))
                object.snapshot = options.bytes === String ? $util.base64.encode(message.snapshot, 0, message.snapshot.length) : options.bytes === Array ? Array.prototype.slice.call(message.snapshot) : message.snapshot;
            return object;
        };

        BS2GC_RequestSnapshotRet.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        BS2GC_RequestSnapshotRet.EResult = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "Success"] = 0;
            values[valuesById[1] = "InvalidUser"] = 1;
            values[valuesById[2] = "InvalidBattle"] = 2;
            return values;
        })();

        return BS2GC_RequestSnapshotRet;
    })();

    Protos.BS2GC_FrameAction = (function() {

        function BS2GC_FrameAction(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        BS2GC_FrameAction.prototype.opts = null;
        BS2GC_FrameAction.prototype.frame = 0;
        BS2GC_FrameAction.prototype.action = $util.newBuffer([]);

        BS2GC_FrameAction.create = function create(properties) {
            return new BS2GC_FrameAction(properties);
        };

        BS2GC_FrameAction.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.opts != null && message.hasOwnProperty("opts"))
                $root.Protos.MsgOpts.encode(message.opts, writer.uint32(10).fork()).ldelim();
            if (message.frame != null && message.hasOwnProperty("frame"))
                writer.uint32(16).int32(message.frame);
            if (message.action != null && message.hasOwnProperty("action"))
                writer.uint32(26).bytes(message.action);
            return writer;
        };

        BS2GC_FrameAction.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        BS2GC_FrameAction.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.BS2GC_FrameAction();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.frame = reader.int32();
                    break;
                case 3:
                    message.action = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        BS2GC_FrameAction.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        BS2GC_FrameAction.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.opts != null && message.hasOwnProperty("opts")) {
                var error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            if (message.frame != null && message.hasOwnProperty("frame"))
                if (!$util.isInteger(message.frame))
                    return "frame: integer expected";
            if (message.action != null && message.hasOwnProperty("action"))
                if (!(message.action && typeof message.action.length === "number" || $util.isString(message.action)))
                    return "action: buffer expected";
            return null;
        };

        BS2GC_FrameAction.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.BS2GC_FrameAction)
                return object;
            var message = new $root.Protos.BS2GC_FrameAction();
            if (object.opts != null) {
                if (typeof object.opts !== "object")
                    throw TypeError(".Protos.BS2GC_FrameAction.opts: object expected");
                message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
            }
            if (object.frame != null)
                message.frame = object.frame | 0;
            if (object.action != null)
                if (typeof object.action === "string")
                    $util.base64.decode(object.action, message.action = $util.newBuffer($util.base64.length(object.action)), 0);
                else if (object.action.length)
                    message.action = object.action;
            return message;
        };

        BS2GC_FrameAction.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.opts = null;
                object.frame = 0;
                if (options.bytes === String)
                    object.action = "";
                else {
                    object.action = [];
                    if (options.bytes !== Array)
                        object.action = $util.newBuffer(object.action);
                }
            }
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            if (message.frame != null && message.hasOwnProperty("frame"))
                object.frame = message.frame;
            if (message.action != null && message.hasOwnProperty("action"))
                object.action = options.bytes === String ? $util.base64.encode(message.action, 0, message.action.length) : options.bytes === Array ? Array.prototype.slice.call(message.action) : message.action;
            return object;
        };

        BS2GC_FrameAction.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BS2GC_FrameAction;
    })();

    Protos.BS2GC_RequestFrameActionsRet = (function() {

        function BS2GC_RequestFrameActionsRet(properties) {
            this.frames = [];
            this.actions = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        BS2GC_RequestFrameActionsRet.prototype.opts = null;
        BS2GC_RequestFrameActionsRet.prototype.frames = $util.emptyArray;
        BS2GC_RequestFrameActionsRet.prototype.actions = $util.emptyArray;

        BS2GC_RequestFrameActionsRet.create = function create(properties) {
            return new BS2GC_RequestFrameActionsRet(properties);
        };

        BS2GC_RequestFrameActionsRet.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.opts != null && message.hasOwnProperty("opts"))
                $root.Protos.MsgOpts.encode(message.opts, writer.uint32(10).fork()).ldelim();
            if (message.frames != null && message.frames.length) {
                writer.uint32(18).fork();
                for (var i = 0; i < message.frames.length; ++i)
                    writer.int32(message.frames[i]);
                writer.ldelim();
            }
            if (message.actions != null && message.actions.length)
                for (var i = 0; i < message.actions.length; ++i)
                    writer.uint32(26).bytes(message.actions[i]);
            return writer;
        };

        BS2GC_RequestFrameActionsRet.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        BS2GC_RequestFrameActionsRet.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.BS2GC_RequestFrameActionsRet();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                    break;
                case 2:
                    if (!(message.frames && message.frames.length))
                        message.frames = [];
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.frames.push(reader.int32());
                    } else
                        message.frames.push(reader.int32());
                    break;
                case 3:
                    if (!(message.actions && message.actions.length))
                        message.actions = [];
                    message.actions.push(reader.bytes());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        BS2GC_RequestFrameActionsRet.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        BS2GC_RequestFrameActionsRet.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.opts != null && message.hasOwnProperty("opts")) {
                var error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            if (message.frames != null && message.hasOwnProperty("frames")) {
                if (!Array.isArray(message.frames))
                    return "frames: array expected";
                for (var i = 0; i < message.frames.length; ++i)
                    if (!$util.isInteger(message.frames[i]))
                        return "frames: integer[] expected";
            }
            if (message.actions != null && message.hasOwnProperty("actions")) {
                if (!Array.isArray(message.actions))
                    return "actions: array expected";
                for (var i = 0; i < message.actions.length; ++i)
                    if (!(message.actions[i] && typeof message.actions[i].length === "number" || $util.isString(message.actions[i])))
                        return "actions: buffer[] expected";
            }
            return null;
        };

        BS2GC_RequestFrameActionsRet.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.BS2GC_RequestFrameActionsRet)
                return object;
            var message = new $root.Protos.BS2GC_RequestFrameActionsRet();
            if (object.opts != null) {
                if (typeof object.opts !== "object")
                    throw TypeError(".Protos.BS2GC_RequestFrameActionsRet.opts: object expected");
                message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
            }
            if (object.frames) {
                if (!Array.isArray(object.frames))
                    throw TypeError(".Protos.BS2GC_RequestFrameActionsRet.frames: array expected");
                message.frames = [];
                for (var i = 0; i < object.frames.length; ++i)
                    message.frames[i] = object.frames[i] | 0;
            }
            if (object.actions) {
                if (!Array.isArray(object.actions))
                    throw TypeError(".Protos.BS2GC_RequestFrameActionsRet.actions: array expected");
                message.actions = [];
                for (var i = 0; i < object.actions.length; ++i)
                    if (typeof object.actions[i] === "string")
                        $util.base64.decode(object.actions[i], message.actions[i] = $util.newBuffer($util.base64.length(object.actions[i])), 0);
                    else if (object.actions[i].length)
                        message.actions[i] = object.actions[i];
            }
            return message;
        };

        BS2GC_RequestFrameActionsRet.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults) {
                object.frames = [];
                object.actions = [];
            }
            if (options.defaults)
                object.opts = null;
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            if (message.frames && message.frames.length) {
                object.frames = [];
                for (var j = 0; j < message.frames.length; ++j)
                    object.frames[j] = message.frames[j];
            }
            if (message.actions && message.actions.length) {
                object.actions = [];
                for (var j = 0; j < message.actions.length; ++j)
                    object.actions[j] = options.bytes === String ? $util.base64.encode(message.actions[j], 0, message.actions[j].length) : options.bytes === Array ? Array.prototype.slice.call(message.actions[j]) : message.actions[j];
            }
            return object;
        };

        BS2GC_RequestFrameActionsRet.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BS2GC_RequestFrameActionsRet;
    })();

    Protos.BS2GC_OutOfSync = (function() {

        function BS2GC_OutOfSync(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        BS2GC_OutOfSync.prototype.opts = null;
        BS2GC_OutOfSync.prototype.frame = 0;
        BS2GC_OutOfSync.prototype.data1 = $util.newBuffer([]);
        BS2GC_OutOfSync.prototype.data2 = $util.newBuffer([]);

        BS2GC_OutOfSync.create = function create(properties) {
            return new BS2GC_OutOfSync(properties);
        };

        BS2GC_OutOfSync.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.opts != null && message.hasOwnProperty("opts"))
                $root.Protos.MsgOpts.encode(message.opts, writer.uint32(10).fork()).ldelim();
            if (message.frame != null && message.hasOwnProperty("frame"))
                writer.uint32(16).int32(message.frame);
            if (message.data1 != null && message.hasOwnProperty("data1"))
                writer.uint32(26).bytes(message.data1);
            if (message.data2 != null && message.hasOwnProperty("data2"))
                writer.uint32(34).bytes(message.data2);
            return writer;
        };

        BS2GC_OutOfSync.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        BS2GC_OutOfSync.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.BS2GC_OutOfSync();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.frame = reader.int32();
                    break;
                case 3:
                    message.data1 = reader.bytes();
                    break;
                case 4:
                    message.data2 = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        BS2GC_OutOfSync.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        BS2GC_OutOfSync.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.opts != null && message.hasOwnProperty("opts")) {
                var error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            if (message.frame != null && message.hasOwnProperty("frame"))
                if (!$util.isInteger(message.frame))
                    return "frame: integer expected";
            if (message.data1 != null && message.hasOwnProperty("data1"))
                if (!(message.data1 && typeof message.data1.length === "number" || $util.isString(message.data1)))
                    return "data1: buffer expected";
            if (message.data2 != null && message.hasOwnProperty("data2"))
                if (!(message.data2 && typeof message.data2.length === "number" || $util.isString(message.data2)))
                    return "data2: buffer expected";
            return null;
        };

        BS2GC_OutOfSync.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.BS2GC_OutOfSync)
                return object;
            var message = new $root.Protos.BS2GC_OutOfSync();
            if (object.opts != null) {
                if (typeof object.opts !== "object")
                    throw TypeError(".Protos.BS2GC_OutOfSync.opts: object expected");
                message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
            }
            if (object.frame != null)
                message.frame = object.frame | 0;
            if (object.data1 != null)
                if (typeof object.data1 === "string")
                    $util.base64.decode(object.data1, message.data1 = $util.newBuffer($util.base64.length(object.data1)), 0);
                else if (object.data1.length)
                    message.data1 = object.data1;
            if (object.data2 != null)
                if (typeof object.data2 === "string")
                    $util.base64.decode(object.data2, message.data2 = $util.newBuffer($util.base64.length(object.data2)), 0);
                else if (object.data2.length)
                    message.data2 = object.data2;
            return message;
        };

        BS2GC_OutOfSync.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.opts = null;
                object.frame = 0;
                if (options.bytes === String)
                    object.data1 = "";
                else {
                    object.data1 = [];
                    if (options.bytes !== Array)
                        object.data1 = $util.newBuffer(object.data1);
                }
                if (options.bytes === String)
                    object.data2 = "";
                else {
                    object.data2 = [];
                    if (options.bytes !== Array)
                        object.data2 = $util.newBuffer(object.data2);
                }
            }
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            if (message.frame != null && message.hasOwnProperty("frame"))
                object.frame = message.frame;
            if (message.data1 != null && message.hasOwnProperty("data1"))
                object.data1 = options.bytes === String ? $util.base64.encode(message.data1, 0, message.data1.length) : options.bytes === Array ? Array.prototype.slice.call(message.data1) : message.data1;
            if (message.data2 != null && message.hasOwnProperty("data2"))
                object.data2 = options.bytes === String ? $util.base64.encode(message.data2, 0, message.data2.length) : options.bytes === Array ? Array.prototype.slice.call(message.data2) : message.data2;
            return object;
        };

        BS2GC_OutOfSync.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BS2GC_OutOfSync;
    })();

    Protos.CS2BS_PlayerInfo = (function() {

        function CS2BS_PlayerInfo(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        CS2BS_PlayerInfo.prototype.gcNID = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
        CS2BS_PlayerInfo.prototype.nickname = "";
        CS2BS_PlayerInfo.prototype.avatar = "";
        CS2BS_PlayerInfo.prototype.gender = 0;
        CS2BS_PlayerInfo.prototype.honor = 0;
        CS2BS_PlayerInfo.prototype.actorID = 0;
        CS2BS_PlayerInfo.prototype.team = 0;

        CS2BS_PlayerInfo.create = function create(properties) {
            return new CS2BS_PlayerInfo(properties);
        };

        CS2BS_PlayerInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.gcNID != null && message.hasOwnProperty("gcNID"))
                writer.uint32(8).uint64(message.gcNID);
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                writer.uint32(18).string(message.nickname);
            if (message.avatar != null && message.hasOwnProperty("avatar"))
                writer.uint32(26).string(message.avatar);
            if (message.gender != null && message.hasOwnProperty("gender"))
                writer.uint32(32).int32(message.gender);
            if (message.honor != null && message.hasOwnProperty("honor"))
                writer.uint32(40).int32(message.honor);
            if (message.actorID != null && message.hasOwnProperty("actorID"))
                writer.uint32(48).int32(message.actorID);
            if (message.team != null && message.hasOwnProperty("team"))
                writer.uint32(56).int32(message.team);
            return writer;
        };

        CS2BS_PlayerInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        CS2BS_PlayerInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.CS2BS_PlayerInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.gcNID = reader.uint64();
                    break;
                case 2:
                    message.nickname = reader.string();
                    break;
                case 3:
                    message.avatar = reader.string();
                    break;
                case 4:
                    message.gender = reader.int32();
                    break;
                case 5:
                    message.honor = reader.int32();
                    break;
                case 6:
                    message.actorID = reader.int32();
                    break;
                case 7:
                    message.team = reader.int32();
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
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                if (!$util.isString(message.nickname))
                    return "nickname: string expected";
            if (message.avatar != null && message.hasOwnProperty("avatar"))
                if (!$util.isString(message.avatar))
                    return "avatar: string expected";
            if (message.gender != null && message.hasOwnProperty("gender"))
                if (!$util.isInteger(message.gender))
                    return "gender: integer expected";
            if (message.honor != null && message.hasOwnProperty("honor"))
                if (!$util.isInteger(message.honor))
                    return "honor: integer expected";
            if (message.actorID != null && message.hasOwnProperty("actorID"))
                if (!$util.isInteger(message.actorID))
                    return "actorID: integer expected";
            if (message.team != null && message.hasOwnProperty("team"))
                if (!$util.isInteger(message.team))
                    return "team: integer expected";
            return null;
        };

        CS2BS_PlayerInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.CS2BS_PlayerInfo)
                return object;
            var message = new $root.Protos.CS2BS_PlayerInfo();
            if (object.gcNID != null)
                if ($util.Long)
                    (message.gcNID = $util.Long.fromValue(object.gcNID)).unsigned = true;
                else if (typeof object.gcNID === "string")
                    message.gcNID = parseInt(object.gcNID, 10);
                else if (typeof object.gcNID === "number")
                    message.gcNID = object.gcNID;
                else if (typeof object.gcNID === "object")
                    message.gcNID = new $util.LongBits(object.gcNID.low >>> 0, object.gcNID.high >>> 0).toNumber(true);
            if (object.nickname != null)
                message.nickname = String(object.nickname);
            if (object.avatar != null)
                message.avatar = String(object.avatar);
            if (object.gender != null)
                message.gender = object.gender | 0;
            if (object.honor != null)
                message.honor = object.honor | 0;
            if (object.actorID != null)
                message.actorID = object.actorID | 0;
            if (object.team != null)
                message.team = object.team | 0;
            return message;
        };

        CS2BS_PlayerInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.gcNID = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.gcNID = options.longs === String ? "0" : 0;
                object.nickname = "";
                object.avatar = "";
                object.gender = 0;
                object.honor = 0;
                object.actorID = 0;
                object.team = 0;
            }
            if (message.gcNID != null && message.hasOwnProperty("gcNID"))
                if (typeof message.gcNID === "number")
                    object.gcNID = options.longs === String ? String(message.gcNID) : message.gcNID;
                else
                    object.gcNID = options.longs === String ? $util.Long.prototype.toString.call(message.gcNID) : options.longs === Number ? new $util.LongBits(message.gcNID.low >>> 0, message.gcNID.high >>> 0).toNumber(true) : message.gcNID;
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                object.nickname = message.nickname;
            if (message.avatar != null && message.hasOwnProperty("avatar"))
                object.avatar = message.avatar;
            if (message.gender != null && message.hasOwnProperty("gender"))
                object.gender = message.gender;
            if (message.honor != null && message.hasOwnProperty("honor"))
                object.honor = message.honor;
            if (message.actorID != null && message.hasOwnProperty("actorID"))
                object.actorID = message.actorID;
            if (message.team != null && message.hasOwnProperty("team"))
                object.team = message.team;
            return object;
        };

        CS2BS_PlayerInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CS2BS_PlayerInfo;
    })();

    Protos.CS2BS_BattleInfo = (function() {

        function CS2BS_BattleInfo(properties) {
            this.playerInfos = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        CS2BS_BattleInfo.prototype.opts = null;
        CS2BS_BattleInfo.prototype.mapID = 0;
        CS2BS_BattleInfo.prototype.connTimeout = 0;
        CS2BS_BattleInfo.prototype.playerInfos = $util.emptyArray;

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
            if (message.connTimeout != null && message.hasOwnProperty("connTimeout"))
                writer.uint32(24).int32(message.connTimeout);
            if (message.playerInfos != null && message.playerInfos.length)
                for (var i = 0; i < message.playerInfos.length; ++i)
                    $root.Protos.CS2BS_PlayerInfo.encode(message.playerInfos[i], writer.uint32(34).fork()).ldelim();
            return writer;
        };

        CS2BS_BattleInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        CS2BS_BattleInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.CS2BS_BattleInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.mapID = reader.int32();
                    break;
                case 3:
                    message.connTimeout = reader.int32();
                    break;
                case 4:
                    if (!(message.playerInfos && message.playerInfos.length))
                        message.playerInfos = [];
                    message.playerInfos.push($root.Protos.CS2BS_PlayerInfo.decode(reader, reader.uint32()));
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
                var error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            if (message.mapID != null && message.hasOwnProperty("mapID"))
                if (!$util.isInteger(message.mapID))
                    return "mapID: integer expected";
            if (message.connTimeout != null && message.hasOwnProperty("connTimeout"))
                if (!$util.isInteger(message.connTimeout))
                    return "connTimeout: integer expected";
            if (message.playerInfos != null && message.hasOwnProperty("playerInfos")) {
                if (!Array.isArray(message.playerInfos))
                    return "playerInfos: array expected";
                for (var i = 0; i < message.playerInfos.length; ++i) {
                    var error = $root.Protos.CS2BS_PlayerInfo.verify(message.playerInfos[i]);
                    if (error)
                        return "playerInfos." + error;
                }
            }
            return null;
        };

        CS2BS_BattleInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.CS2BS_BattleInfo)
                return object;
            var message = new $root.Protos.CS2BS_BattleInfo();
            if (object.opts != null) {
                if (typeof object.opts !== "object")
                    throw TypeError(".Protos.CS2BS_BattleInfo.opts: object expected");
                message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
            }
            if (object.mapID != null)
                message.mapID = object.mapID | 0;
            if (object.connTimeout != null)
                message.connTimeout = object.connTimeout | 0;
            if (object.playerInfos) {
                if (!Array.isArray(object.playerInfos))
                    throw TypeError(".Protos.CS2BS_BattleInfo.playerInfos: array expected");
                message.playerInfos = [];
                for (var i = 0; i < object.playerInfos.length; ++i) {
                    if (typeof object.playerInfos[i] !== "object")
                        throw TypeError(".Protos.CS2BS_BattleInfo.playerInfos: object expected");
                    message.playerInfos[i] = $root.Protos.CS2BS_PlayerInfo.fromObject(object.playerInfos[i]);
                }
            }
            return message;
        };

        CS2BS_BattleInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.playerInfos = [];
            if (options.defaults) {
                object.opts = null;
                object.mapID = 0;
                object.connTimeout = 0;
            }
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            if (message.mapID != null && message.hasOwnProperty("mapID"))
                object.mapID = message.mapID;
            if (message.connTimeout != null && message.hasOwnProperty("connTimeout"))
                object.connTimeout = message.connTimeout;
            if (message.playerInfos && message.playerInfos.length) {
                object.playerInfos = [];
                for (var j = 0; j < message.playerInfos.length; ++j)
                    object.playerInfos[j] = $root.Protos.CS2BS_PlayerInfo.toObject(message.playerInfos[j], options);
            }
            return object;
        };

        CS2BS_BattleInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CS2BS_BattleInfo;
    })();

    Protos.CS2GC_PlayerInfo = (function() {

        function CS2GC_PlayerInfo(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        CS2GC_PlayerInfo.prototype.gcNID = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
        CS2GC_PlayerInfo.prototype.nickname = "";
        CS2GC_PlayerInfo.prototype.avatar = "";
        CS2GC_PlayerInfo.prototype.gender = 0;
        CS2GC_PlayerInfo.prototype.honor = 0;
        CS2GC_PlayerInfo.prototype.actorID = 0;
        CS2GC_PlayerInfo.prototype.team = 0;

        CS2GC_PlayerInfo.create = function create(properties) {
            return new CS2GC_PlayerInfo(properties);
        };

        CS2GC_PlayerInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.gcNID != null && message.hasOwnProperty("gcNID"))
                writer.uint32(8).uint64(message.gcNID);
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                writer.uint32(18).string(message.nickname);
            if (message.avatar != null && message.hasOwnProperty("avatar"))
                writer.uint32(26).string(message.avatar);
            if (message.gender != null && message.hasOwnProperty("gender"))
                writer.uint32(32).int32(message.gender);
            if (message.honor != null && message.hasOwnProperty("honor"))
                writer.uint32(40).int32(message.honor);
            if (message.actorID != null && message.hasOwnProperty("actorID"))
                writer.uint32(48).int32(message.actorID);
            if (message.team != null && message.hasOwnProperty("team"))
                writer.uint32(56).int32(message.team);
            return writer;
        };

        CS2GC_PlayerInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        CS2GC_PlayerInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.CS2GC_PlayerInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.gcNID = reader.uint64();
                    break;
                case 2:
                    message.nickname = reader.string();
                    break;
                case 3:
                    message.avatar = reader.string();
                    break;
                case 4:
                    message.gender = reader.int32();
                    break;
                case 5:
                    message.honor = reader.int32();
                    break;
                case 6:
                    message.actorID = reader.int32();
                    break;
                case 7:
                    message.team = reader.int32();
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
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                if (!$util.isString(message.nickname))
                    return "nickname: string expected";
            if (message.avatar != null && message.hasOwnProperty("avatar"))
                if (!$util.isString(message.avatar))
                    return "avatar: string expected";
            if (message.gender != null && message.hasOwnProperty("gender"))
                if (!$util.isInteger(message.gender))
                    return "gender: integer expected";
            if (message.honor != null && message.hasOwnProperty("honor"))
                if (!$util.isInteger(message.honor))
                    return "honor: integer expected";
            if (message.actorID != null && message.hasOwnProperty("actorID"))
                if (!$util.isInteger(message.actorID))
                    return "actorID: integer expected";
            if (message.team != null && message.hasOwnProperty("team"))
                if (!$util.isInteger(message.team))
                    return "team: integer expected";
            return null;
        };

        CS2GC_PlayerInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.CS2GC_PlayerInfo)
                return object;
            var message = new $root.Protos.CS2GC_PlayerInfo();
            if (object.gcNID != null)
                if ($util.Long)
                    (message.gcNID = $util.Long.fromValue(object.gcNID)).unsigned = true;
                else if (typeof object.gcNID === "string")
                    message.gcNID = parseInt(object.gcNID, 10);
                else if (typeof object.gcNID === "number")
                    message.gcNID = object.gcNID;
                else if (typeof object.gcNID === "object")
                    message.gcNID = new $util.LongBits(object.gcNID.low >>> 0, object.gcNID.high >>> 0).toNumber(true);
            if (object.nickname != null)
                message.nickname = String(object.nickname);
            if (object.avatar != null)
                message.avatar = String(object.avatar);
            if (object.gender != null)
                message.gender = object.gender | 0;
            if (object.honor != null)
                message.honor = object.honor | 0;
            if (object.actorID != null)
                message.actorID = object.actorID | 0;
            if (object.team != null)
                message.team = object.team | 0;
            return message;
        };

        CS2GC_PlayerInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.gcNID = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.gcNID = options.longs === String ? "0" : 0;
                object.nickname = "";
                object.avatar = "";
                object.gender = 0;
                object.honor = 0;
                object.actorID = 0;
                object.team = 0;
            }
            if (message.gcNID != null && message.hasOwnProperty("gcNID"))
                if (typeof message.gcNID === "number")
                    object.gcNID = options.longs === String ? String(message.gcNID) : message.gcNID;
                else
                    object.gcNID = options.longs === String ? $util.Long.prototype.toString.call(message.gcNID) : options.longs === Number ? new $util.LongBits(message.gcNID.low >>> 0, message.gcNID.high >>> 0).toNumber(true) : message.gcNID;
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                object.nickname = message.nickname;
            if (message.avatar != null && message.hasOwnProperty("avatar"))
                object.avatar = message.avatar;
            if (message.gender != null && message.hasOwnProperty("gender"))
                object.gender = message.gender;
            if (message.honor != null && message.hasOwnProperty("honor"))
                object.honor = message.honor;
            if (message.actorID != null && message.hasOwnProperty("actorID"))
                object.actorID = message.actorID;
            if (message.team != null && message.hasOwnProperty("team"))
                object.team = message.team;
            return object;
        };

        CS2GC_PlayerInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CS2GC_PlayerInfo;
    })();

    Protos.CS2GC_BeginMatchRet = (function() {

        function CS2GC_BeginMatchRet(properties) {
            this.playerInfos = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
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
                for (var i = 0; i < message.playerInfos.length; ++i)
                    $root.Protos.CS2GC_PlayerInfo.encode(message.playerInfos[i], writer.uint32(50).fork()).ldelim();
            return writer;
        };

        CS2GC_BeginMatchRet.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        CS2GC_BeginMatchRet.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.CS2GC_BeginMatchRet();
            while (reader.pos < end) {
                var tag = reader.uint32();
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
                var error = $root.Protos.MsgOpts.verify(message.opts);
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
                for (var i = 0; i < message.playerInfos.length; ++i) {
                    var error = $root.Protos.CS2GC_PlayerInfo.verify(message.playerInfos[i]);
                    if (error)
                        return "playerInfos." + error;
                }
            }
            return null;
        };

        CS2GC_BeginMatchRet.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.CS2GC_BeginMatchRet)
                return object;
            var message = new $root.Protos.CS2GC_BeginMatchRet();
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
                for (var i = 0; i < object.playerInfos.length; ++i) {
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
            var object = {};
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
                for (var j = 0; j < message.playerInfos.length; ++j)
                    object.playerInfos[j] = $root.Protos.CS2GC_PlayerInfo.toObject(message.playerInfos[j], options);
            }
            return object;
        };

        CS2GC_BeginMatchRet.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        CS2GC_BeginMatchRet.EResult = (function() {
            var valuesById = {}, values = Object.create(valuesById);
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

    Protos.CS2GC_PlayerJoin = (function() {

        function CS2GC_PlayerJoin(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        CS2GC_PlayerJoin.prototype.opts = null;
        CS2GC_PlayerJoin.prototype.playerInfo = null;

        CS2GC_PlayerJoin.create = function create(properties) {
            return new CS2GC_PlayerJoin(properties);
        };

        CS2GC_PlayerJoin.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.opts != null && message.hasOwnProperty("opts"))
                $root.Protos.MsgOpts.encode(message.opts, writer.uint32(10).fork()).ldelim();
            if (message.playerInfo != null && message.hasOwnProperty("playerInfo"))
                $root.Protos.CS2GC_PlayerInfo.encode(message.playerInfo, writer.uint32(18).fork()).ldelim();
            return writer;
        };

        CS2GC_PlayerJoin.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        CS2GC_PlayerJoin.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.CS2GC_PlayerJoin();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.playerInfo = $root.Protos.CS2GC_PlayerInfo.decode(reader, reader.uint32());
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
                var error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            if (message.playerInfo != null && message.hasOwnProperty("playerInfo")) {
                var error = $root.Protos.CS2GC_PlayerInfo.verify(message.playerInfo);
                if (error)
                    return "playerInfo." + error;
            }
            return null;
        };

        CS2GC_PlayerJoin.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.CS2GC_PlayerJoin)
                return object;
            var message = new $root.Protos.CS2GC_PlayerJoin();
            if (object.opts != null) {
                if (typeof object.opts !== "object")
                    throw TypeError(".Protos.CS2GC_PlayerJoin.opts: object expected");
                message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
            }
            if (object.playerInfo != null) {
                if (typeof object.playerInfo !== "object")
                    throw TypeError(".Protos.CS2GC_PlayerJoin.playerInfo: object expected");
                message.playerInfo = $root.Protos.CS2GC_PlayerInfo.fromObject(object.playerInfo);
            }
            return message;
        };

        CS2GC_PlayerJoin.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.opts = null;
                object.playerInfo = null;
            }
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            if (message.playerInfo != null && message.hasOwnProperty("playerInfo"))
                object.playerInfo = $root.Protos.CS2GC_PlayerInfo.toObject(message.playerInfo, options);
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
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
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
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.CS2GC_PlayerLeave();
            while (reader.pos < end) {
                var tag = reader.uint32();
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
                var error = $root.Protos.MsgOpts.verify(message.opts);
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
            var message = new $root.Protos.CS2GC_PlayerLeave();
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
            var object = {};
            if (options.defaults) {
                object.opts = null;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
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
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
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
                for (var i = 0; i < message.playerInfos.length; ++i)
                    $root.Protos.CS2GC_PlayerInfo.encode(message.playerInfos[i], writer.uint32(18).fork()).ldelim();
            if (message.progresses != null && message.progresses.length) {
                writer.uint32(26).fork();
                for (var i = 0; i < message.progresses.length; ++i)
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
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.CS2GC_RoomInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
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
                        var end2 = reader.uint32() + reader.pos;
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
                var error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            if (message.playerInfos != null && message.hasOwnProperty("playerInfos")) {
                if (!Array.isArray(message.playerInfos))
                    return "playerInfos: array expected";
                for (var i = 0; i < message.playerInfos.length; ++i) {
                    var error = $root.Protos.CS2GC_PlayerInfo.verify(message.playerInfos[i]);
                    if (error)
                        return "playerInfos." + error;
                }
            }
            if (message.progresses != null && message.hasOwnProperty("progresses")) {
                if (!Array.isArray(message.progresses))
                    return "progresses: array expected";
                for (var i = 0; i < message.progresses.length; ++i)
                    if (!$util.isInteger(message.progresses[i]))
                        return "progresses: integer[] expected";
            }
            return null;
        };

        CS2GC_RoomInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.CS2GC_RoomInfo)
                return object;
            var message = new $root.Protos.CS2GC_RoomInfo();
            if (object.opts != null) {
                if (typeof object.opts !== "object")
                    throw TypeError(".Protos.CS2GC_RoomInfo.opts: object expected");
                message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
            }
            if (object.playerInfos) {
                if (!Array.isArray(object.playerInfos))
                    throw TypeError(".Protos.CS2GC_RoomInfo.playerInfos: array expected");
                message.playerInfos = [];
                for (var i = 0; i < object.playerInfos.length; ++i) {
                    if (typeof object.playerInfos[i] !== "object")
                        throw TypeError(".Protos.CS2GC_RoomInfo.playerInfos: object expected");
                    message.playerInfos[i] = $root.Protos.CS2GC_PlayerInfo.fromObject(object.playerInfos[i]);
                }
            }
            if (object.progresses) {
                if (!Array.isArray(object.progresses))
                    throw TypeError(".Protos.CS2GC_RoomInfo.progresses: array expected");
                message.progresses = [];
                for (var i = 0; i < object.progresses.length; ++i)
                    message.progresses[i] = object.progresses[i] | 0;
            }
            return message;
        };

        CS2GC_RoomInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
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
                for (var j = 0; j < message.playerInfos.length; ++j)
                    object.playerInfos[j] = $root.Protos.CS2GC_PlayerInfo.toObject(message.playerInfos[j], options);
            }
            if (message.progresses && message.progresses.length) {
                object.progresses = [];
                for (var j = 0; j < message.progresses.length; ++j)
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
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        CS2GC_EnterBattle.prototype.opts = null;
        CS2GC_EnterBattle.prototype.gcNID = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
        CS2GC_EnterBattle.prototype.ip = "";
        CS2GC_EnterBattle.prototype.port = 0;
        CS2GC_EnterBattle.prototype.result = 0;

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
            if (message.result != null && message.hasOwnProperty("result"))
                writer.uint32(40).int32(message.result);
            return writer;
        };

        CS2GC_EnterBattle.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        CS2GC_EnterBattle.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.CS2GC_EnterBattle();
            while (reader.pos < end) {
                var tag = reader.uint32();
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
                    message.result = reader.int32();
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
                var error = $root.Protos.MsgOpts.verify(message.opts);
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
            if (message.result != null && message.hasOwnProperty("result"))
                switch (message.result) {
                default:
                    return "result: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                    break;
                }
            return null;
        };

        CS2GC_EnterBattle.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.CS2GC_EnterBattle)
                return object;
            var message = new $root.Protos.CS2GC_EnterBattle();
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
            switch (object.result) {
            case "Success":
            case 0:
                message.result = 0;
                break;
            case "BSNotFound":
            case 1:
                message.result = 1;
                break;
            case "BSLost":
            case 2:
                message.result = 2;
                break;
            case "BattleCreateFailed":
            case 3:
                message.result = 3;
                break;
            }
            return message;
        };

        CS2GC_EnterBattle.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.opts = null;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.gcNID = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.gcNID = options.longs === String ? "0" : 0;
                object.ip = "";
                object.port = 0;
                object.result = options.enums === String ? "Success" : 0;
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
            if (message.result != null && message.hasOwnProperty("result"))
                object.result = options.enums === String ? $root.Protos.CS2GC_EnterBattle.Result[message.result] : message.result;
            return object;
        };

        CS2GC_EnterBattle.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        CS2GC_EnterBattle.Result = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "Success"] = 0;
            values[valuesById[1] = "BSNotFound"] = 1;
            values[valuesById[2] = "BSLost"] = 2;
            values[valuesById[3] = "BattleCreateFailed"] = 3;
            return values;
        })();

        return CS2GC_EnterBattle;
    })();

    Protos.CS2GC_BSLose = (function() {

        function CS2GC_BSLose(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        CS2GC_BSLose.prototype.opts = null;

        CS2GC_BSLose.create = function create(properties) {
            return new CS2GC_BSLose(properties);
        };

        CS2GC_BSLose.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.opts != null && message.hasOwnProperty("opts"))
                $root.Protos.MsgOpts.encode(message.opts, writer.uint32(10).fork()).ldelim();
            return writer;
        };

        CS2GC_BSLose.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        CS2GC_BSLose.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.CS2GC_BSLose();
            while (reader.pos < end) {
                var tag = reader.uint32();
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

        CS2GC_BSLose.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        CS2GC_BSLose.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.opts != null && message.hasOwnProperty("opts")) {
                var error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            return null;
        };

        CS2GC_BSLose.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.CS2GC_BSLose)
                return object;
            var message = new $root.Protos.CS2GC_BSLose();
            if (object.opts != null) {
                if (typeof object.opts !== "object")
                    throw TypeError(".Protos.CS2GC_BSLose.opts: object expected");
                message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
            }
            return message;
        };

        CS2GC_BSLose.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.opts = null;
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            return object;
        };

        CS2GC_BSLose.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CS2GC_BSLose;
    })();

    Protos.CS2GC_BattleEnd = (function() {

        function CS2GC_BattleEnd(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        CS2GC_BattleEnd.prototype.opts = null;
        CS2GC_BattleEnd.prototype.win = false;
        CS2GC_BattleEnd.prototype.honour = 0;

        CS2GC_BattleEnd.create = function create(properties) {
            return new CS2GC_BattleEnd(properties);
        };

        CS2GC_BattleEnd.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.opts != null && message.hasOwnProperty("opts"))
                $root.Protos.MsgOpts.encode(message.opts, writer.uint32(10).fork()).ldelim();
            if (message.win != null && message.hasOwnProperty("win"))
                writer.uint32(16).bool(message.win);
            if (message.honour != null && message.hasOwnProperty("honour"))
                writer.uint32(24).int32(message.honour);
            return writer;
        };

        CS2GC_BattleEnd.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        CS2GC_BattleEnd.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.CS2GC_BattleEnd();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.win = reader.bool();
                    break;
                case 3:
                    message.honour = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        CS2GC_BattleEnd.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        CS2GC_BattleEnd.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.opts != null && message.hasOwnProperty("opts")) {
                var error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            if (message.win != null && message.hasOwnProperty("win"))
                if (typeof message.win !== "boolean")
                    return "win: boolean expected";
            if (message.honour != null && message.hasOwnProperty("honour"))
                if (!$util.isInteger(message.honour))
                    return "honour: integer expected";
            return null;
        };

        CS2GC_BattleEnd.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.CS2GC_BattleEnd)
                return object;
            var message = new $root.Protos.CS2GC_BattleEnd();
            if (object.opts != null) {
                if (typeof object.opts !== "object")
                    throw TypeError(".Protos.CS2GC_BattleEnd.opts: object expected");
                message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
            }
            if (object.win != null)
                message.win = Boolean(object.win);
            if (object.honour != null)
                message.honour = object.honour | 0;
            return message;
        };

        CS2GC_BattleEnd.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.opts = null;
                object.win = false;
                object.honour = 0;
            }
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            if (message.win != null && message.hasOwnProperty("win"))
                object.win = message.win;
            if (message.honour != null && message.hasOwnProperty("honour"))
                object.honour = message.honour;
            return object;
        };

        CS2GC_BattleEnd.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CS2GC_BattleEnd;
    })();

    Protos.CS2GS_GCLoginRet = (function() {

        function CS2GS_GCLoginRet(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        CS2GS_GCLoginRet.prototype.opts = null;
        CS2GS_GCLoginRet.prototype.result = 0;
        CS2GS_GCLoginRet.prototype.gcState = 0;
        CS2GS_GCLoginRet.prototype.userInfo = null;
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
            if (message.userInfo != null && message.hasOwnProperty("userInfo"))
                $root.Protos.G_UserInfo.encode(message.userInfo, writer.uint32(34).fork()).ldelim();
            if (message.gcNID != null && message.hasOwnProperty("gcNID"))
                writer.uint32(40).uint64(message.gcNID);
            if (message.bsIP != null && message.hasOwnProperty("bsIP"))
                writer.uint32(50).string(message.bsIP);
            if (message.bsPort != null && message.hasOwnProperty("bsPort"))
                writer.uint32(56).int32(message.bsPort);
            return writer;
        };

        CS2GS_GCLoginRet.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        CS2GS_GCLoginRet.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.CS2GS_GCLoginRet();
            while (reader.pos < end) {
                var tag = reader.uint32();
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
                    message.userInfo = $root.Protos.G_UserInfo.decode(reader, reader.uint32());
                    break;
                case 5:
                    message.gcNID = reader.uint64();
                    break;
                case 6:
                    message.bsIP = reader.string();
                    break;
                case 7:
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
                var error = $root.Protos.MsgOpts.verify(message.opts);
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
            if (message.userInfo != null && message.hasOwnProperty("userInfo")) {
                var error = $root.Protos.G_UserInfo.verify(message.userInfo);
                if (error)
                    return "userInfo." + error;
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
            var message = new $root.Protos.CS2GS_GCLoginRet();
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
            if (object.userInfo != null) {
                if (typeof object.userInfo !== "object")
                    throw TypeError(".Protos.CS2GS_GCLoginRet.userInfo: object expected");
                message.userInfo = $root.Protos.G_UserInfo.fromObject(object.userInfo);
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
            var object = {};
            if (options.defaults) {
                object.opts = null;
                object.result = options.enums === String ? "Success" : 0;
                object.gcState = options.enums === String ? "Idle" : 0;
                object.userInfo = null;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
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
            if (message.userInfo != null && message.hasOwnProperty("userInfo"))
                object.userInfo = $root.Protos.G_UserInfo.toObject(message.userInfo, options);
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
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "Success"] = 0;
            values[valuesById[1] = "IllegalLogin"] = 1;
            return values;
        })();

        CS2GS_GCLoginRet.EGCCState = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "Idle"] = 0;
            values[valuesById[1] = "Battle"] = 1;
            return values;
        })();

        return CS2GS_GCLoginRet;
    })();

    Protos.CS2GS_KickGC = (function() {

        function CS2GS_KickGC(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
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
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.CS2GS_KickGC();
            while (reader.pos < end) {
                var tag = reader.uint32();
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
                var error = $root.Protos.MsgOpts.verify(message.opts);
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
                case 2:
                    break;
                }
            return null;
        };

        CS2GS_KickGC.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.CS2GS_KickGC)
                return object;
            var message = new $root.Protos.CS2GS_KickGC();
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
            case "OutOfSync":
            case 1:
                message.reason = 1;
                break;
            case "Other":
            case 2:
                message.reason = 2;
                break;
            }
            return message;
        };

        CS2GS_KickGC.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.opts = null;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
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
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "DuplicateLogin"] = 0;
            values[valuesById[1] = "OutOfSync"] = 1;
            values[valuesById[2] = "Other"] = 2;
            return values;
        })();

        return CS2GS_KickGC;
    })();

    Protos.CS2LS_GSInfos = (function() {

        function CS2LS_GSInfos(properties) {
            this.gsInfo = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
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
                for (var i = 0; i < message.gsInfo.length; ++i)
                    $root.Protos.GSInfo.encode(message.gsInfo[i], writer.uint32(18).fork()).ldelim();
            return writer;
        };

        CS2LS_GSInfos.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        CS2LS_GSInfos.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.CS2LS_GSInfos();
            while (reader.pos < end) {
                var tag = reader.uint32();
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
                var error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            if (message.gsInfo != null && message.hasOwnProperty("gsInfo")) {
                if (!Array.isArray(message.gsInfo))
                    return "gsInfo: array expected";
                for (var i = 0; i < message.gsInfo.length; ++i) {
                    var error = $root.Protos.GSInfo.verify(message.gsInfo[i]);
                    if (error)
                        return "gsInfo." + error;
                }
            }
            return null;
        };

        CS2LS_GSInfos.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.CS2LS_GSInfos)
                return object;
            var message = new $root.Protos.CS2LS_GSInfos();
            if (object.opts != null) {
                if (typeof object.opts !== "object")
                    throw TypeError(".Protos.CS2LS_GSInfos.opts: object expected");
                message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
            }
            if (object.gsInfo) {
                if (!Array.isArray(object.gsInfo))
                    throw TypeError(".Protos.CS2LS_GSInfos.gsInfo: array expected");
                message.gsInfo = [];
                for (var i = 0; i < object.gsInfo.length; ++i) {
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
            var object = {};
            if (options.arrays || options.defaults)
                object.gsInfo = [];
            if (options.defaults)
                object.opts = null;
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            if (message.gsInfo && message.gsInfo.length) {
                object.gsInfo = [];
                for (var j = 0; j < message.gsInfo.length; ++j)
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
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
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
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.CS2LS_GSInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
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
                var error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            if (message.gsInfo != null && message.hasOwnProperty("gsInfo")) {
                var error = $root.Protos.GSInfo.verify(message.gsInfo);
                if (error)
                    return "gsInfo." + error;
            }
            return null;
        };

        CS2LS_GSInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.CS2LS_GSInfo)
                return object;
            var message = new $root.Protos.CS2LS_GSInfo();
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
            var object = {};
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
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
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
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.CS2LS_GSLost();
            while (reader.pos < end) {
                var tag = reader.uint32();
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
                var error = $root.Protos.MsgOpts.verify(message.opts);
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
            var message = new $root.Protos.CS2LS_GSLost();
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
            var object = {};
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
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
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
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.CS2LS_GCLoginRet();
            while (reader.pos < end) {
                var tag = reader.uint32();
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
                var error = $root.Protos.MsgOpts.verify(message.opts);
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
            var message = new $root.Protos.CS2LS_GCLoginRet();
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
            var object = {};
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
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "Success"] = 0;
            values[valuesById[1] = "Failed"] = 1;
            return values;
        })();

        return CS2LS_GCLoginRet;
    })();

    Protos.GSInfo = (function() {

        function GSInfo(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
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
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.GSInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
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
            var message = new $root.Protos.GSInfo();
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
            var object = {};
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
            var valuesById = {}, values = Object.create(valuesById);
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
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
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
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.GS2CS_ReportState();
            while (reader.pos < end) {
                var tag = reader.uint32();
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
                var error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            if (message.gsInfo != null && message.hasOwnProperty("gsInfo")) {
                var error = $root.Protos.GSInfo.verify(message.gsInfo);
                if (error)
                    return "gsInfo." + error;
            }
            return null;
        };

        GS2CS_ReportState.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.GS2CS_ReportState)
                return object;
            var message = new $root.Protos.GS2CS_ReportState();
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
            var object = {};
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
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
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
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.GS2CS_GCAskLogin();
            while (reader.pos < end) {
                var tag = reader.uint32();
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
                var error = $root.Protos.MsgOpts.verify(message.opts);
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
            var message = new $root.Protos.GS2CS_GCAskLogin();
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
            var object = {};
            if (options.defaults) {
                object.opts = null;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
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
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
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
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.GS2CS_GCLost();
            while (reader.pos < end) {
                var tag = reader.uint32();
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
                var error = $root.Protos.MsgOpts.verify(message.opts);
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
            var message = new $root.Protos.GS2CS_GCLost();
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
            var object = {};
            if (options.defaults) {
                object.opts = null;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
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

    Protos.DB2LS_QueryAccountRet = (function() {

        function DB2LS_QueryAccountRet(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
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
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.DB2LS_QueryAccountRet();
            while (reader.pos < end) {
                var tag = reader.uint32();
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
                var error = $root.Protos.MsgOpts.verify(message.opts);
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

        DB2LS_QueryAccountRet.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.DB2LS_QueryAccountRet)
                return object;
            var message = new $root.Protos.DB2LS_QueryAccountRet();
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
            }
            return message;
        };

        DB2LS_QueryAccountRet.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
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

        DB2LS_QueryAccountRet.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return DB2LS_QueryAccountRet;
    })();

    Protos.DB2LS_QueryLoginRet = (function() {

        function DB2LS_QueryLoginRet(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        DB2LS_QueryLoginRet.prototype.opts = null;
        DB2LS_QueryLoginRet.prototype.result = 0;
        DB2LS_QueryLoginRet.prototype.ukey = 0;
        DB2LS_QueryLoginRet.prototype.channel = 0;
        DB2LS_QueryLoginRet.prototype.browser = 0;
        DB2LS_QueryLoginRet.prototype.platform = 0;
        DB2LS_QueryLoginRet.prototype.unionID = "";
        DB2LS_QueryLoginRet.prototype.nickname = "";
        DB2LS_QueryLoginRet.prototype.avatar = "";
        DB2LS_QueryLoginRet.prototype.gender = 0;

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
            if (message.channel != null && message.hasOwnProperty("channel"))
                writer.uint32(32).int32(message.channel);
            if (message.browser != null && message.hasOwnProperty("browser"))
                writer.uint32(40).int32(message.browser);
            if (message.platform != null && message.hasOwnProperty("platform"))
                writer.uint32(48).int32(message.platform);
            if (message.unionID != null && message.hasOwnProperty("unionID"))
                writer.uint32(58).string(message.unionID);
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                writer.uint32(66).string(message.nickname);
            if (message.avatar != null && message.hasOwnProperty("avatar"))
                writer.uint32(74).string(message.avatar);
            if (message.gender != null && message.hasOwnProperty("gender"))
                writer.uint32(80).int32(message.gender);
            return writer;
        };

        DB2LS_QueryLoginRet.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        DB2LS_QueryLoginRet.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.DB2LS_QueryLoginRet();
            while (reader.pos < end) {
                var tag = reader.uint32();
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
                case 4:
                    message.channel = reader.int32();
                    break;
                case 5:
                    message.browser = reader.int32();
                    break;
                case 6:
                    message.platform = reader.int32();
                    break;
                case 7:
                    message.unionID = reader.string();
                    break;
                case 8:
                    message.nickname = reader.string();
                    break;
                case 9:
                    message.avatar = reader.string();
                    break;
                case 10:
                    message.gender = reader.int32();
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
                var error = $root.Protos.MsgOpts.verify(message.opts);
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
            if (message.ukey != null && message.hasOwnProperty("ukey"))
                if (!$util.isInteger(message.ukey))
                    return "ukey: integer expected";
            if (message.channel != null && message.hasOwnProperty("channel"))
                switch (message.channel) {
                default:
                    return "channel: enum value expected";
                case 0:
                case 1:
                    break;
                }
            if (message.browser != null && message.hasOwnProperty("browser"))
                switch (message.browser) {
                default:
                    return "browser: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                    break;
                }
            if (message.platform != null && message.hasOwnProperty("platform"))
                switch (message.platform) {
                default:
                    return "platform: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                    break;
                }
            if (message.unionID != null && message.hasOwnProperty("unionID"))
                if (!$util.isString(message.unionID))
                    return "unionID: string expected";
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                if (!$util.isString(message.nickname))
                    return "nickname: string expected";
            if (message.avatar != null && message.hasOwnProperty("avatar"))
                if (!$util.isString(message.avatar))
                    return "avatar: string expected";
            if (message.gender != null && message.hasOwnProperty("gender"))
                if (!$util.isInteger(message.gender))
                    return "gender: integer expected";
            return null;
        };

        DB2LS_QueryLoginRet.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.DB2LS_QueryLoginRet)
                return object;
            var message = new $root.Protos.DB2LS_QueryLoginRet();
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
            }
            if (object.ukey != null)
                message.ukey = object.ukey >>> 0;
            switch (object.channel) {
            case "Web":
            case 0:
                message.channel = 0;
                break;
            case "WXMini":
            case 1:
                message.channel = 1;
                break;
            }
            switch (object.browser) {
            case "Chrome":
            case 0:
                message.browser = 0;
                break;
            case "Firefox":
            case 1:
                message.browser = 1;
                break;
            case "Safair":
            case 2:
                message.browser = 2;
                break;
            case "Edge":
            case 3:
                message.browser = 3;
                break;
            case "IE":
            case 4:
                message.browser = 4;
                break;
            }
            switch (object.platform) {
            case "PC":
            case 0:
                message.platform = 0;
                break;
            case "Android":
            case 1:
                message.platform = 1;
                break;
            case "IOS":
            case 2:
                message.platform = 2;
                break;
            case "WP":
            case 3:
                message.platform = 3;
                break;
            }
            if (object.unionID != null)
                message.unionID = String(object.unionID);
            if (object.nickname != null)
                message.nickname = String(object.nickname);
            if (object.avatar != null)
                message.avatar = String(object.avatar);
            if (object.gender != null)
                message.gender = object.gender | 0;
            return message;
        };

        DB2LS_QueryLoginRet.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.opts = null;
                object.result = options.enums === String ? "Success" : 0;
                object.ukey = 0;
                object.channel = options.enums === String ? "Web" : 0;
                object.browser = options.enums === String ? "Chrome" : 0;
                object.platform = options.enums === String ? "PC" : 0;
                object.unionID = "";
                object.nickname = "";
                object.avatar = "";
                object.gender = 0;
            }
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            if (message.result != null && message.hasOwnProperty("result"))
                object.result = options.enums === String ? $root.Protos.Global.ECommon[message.result] : message.result;
            if (message.ukey != null && message.hasOwnProperty("ukey"))
                object.ukey = message.ukey;
            if (message.channel != null && message.hasOwnProperty("channel"))
                object.channel = options.enums === String ? $root.Protos.Global.Channel[message.channel] : message.channel;
            if (message.browser != null && message.hasOwnProperty("browser"))
                object.browser = options.enums === String ? $root.Protos.Global.Browser[message.browser] : message.browser;
            if (message.platform != null && message.hasOwnProperty("platform"))
                object.platform = options.enums === String ? $root.Protos.Global.Platform[message.platform] : message.platform;
            if (message.unionID != null && message.hasOwnProperty("unionID"))
                object.unionID = message.unionID;
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                object.nickname = message.nickname;
            if (message.avatar != null && message.hasOwnProperty("avatar"))
                object.avatar = message.avatar;
            if (message.gender != null && message.hasOwnProperty("gender"))
                object.gender = message.gender;
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
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        DB2LS_ExecRet.prototype.opts = null;
        DB2LS_ExecRet.prototype.result = 0;
        DB2LS_ExecRet.prototype.row = 0;
        DB2LS_ExecRet.prototype.id = 0;

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
                writer.uint32(32).uint32(message.id);
            return writer;
        };

        DB2LS_ExecRet.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        DB2LS_ExecRet.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.DB2LS_ExecRet();
            while (reader.pos < end) {
                var tag = reader.uint32();
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
                    message.id = reader.uint32();
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
                var error = $root.Protos.MsgOpts.verify(message.opts);
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
            if (message.row != null && message.hasOwnProperty("row"))
                if (!$util.isInteger(message.row))
                    return "row: integer expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isInteger(message.id))
                    return "id: integer expected";
            return null;
        };

        DB2LS_ExecRet.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.DB2LS_ExecRet)
                return object;
            var message = new $root.Protos.DB2LS_ExecRet();
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
            }
            if (object.row != null)
                message.row = object.row | 0;
            if (object.id != null)
                message.id = object.id >>> 0;
            return message;
        };

        DB2LS_ExecRet.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.opts = null;
                object.result = options.enums === String ? "Success" : 0;
                object.row = 0;
                object.id = 0;
            }
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            if (message.result != null && message.hasOwnProperty("result"))
                object.result = options.enums === String ? $root.Protos.Global.ECommon[message.result] : message.result;
            if (message.row != null && message.hasOwnProperty("row"))
                object.row = message.row;
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
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
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
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
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.GC2BS_AskLogin();
            while (reader.pos < end) {
                var tag = reader.uint32();
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
                var error = $root.Protos.MsgOpts.verify(message.opts);
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
            var message = new $root.Protos.GC2BS_AskLogin();
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
            var object = {};
            if (options.defaults) {
                object.opts = null;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
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
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
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
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.GC2BS_KeepAlive();
            while (reader.pos < end) {
                var tag = reader.uint32();
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
                var error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            return null;
        };

        GC2BS_KeepAlive.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.GC2BS_KeepAlive)
                return object;
            var message = new $root.Protos.GC2BS_KeepAlive();
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
            var object = {};
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

    Protos.GC2BS_RequestSnapshot = (function() {

        function GC2BS_RequestSnapshot(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        GC2BS_RequestSnapshot.prototype.opts = null;
        GC2BS_RequestSnapshot.prototype.frame = 0;

        GC2BS_RequestSnapshot.create = function create(properties) {
            return new GC2BS_RequestSnapshot(properties);
        };

        GC2BS_RequestSnapshot.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.opts != null && message.hasOwnProperty("opts"))
                $root.Protos.MsgOpts.encode(message.opts, writer.uint32(10).fork()).ldelim();
            if (message.frame != null && message.hasOwnProperty("frame"))
                writer.uint32(16).int32(message.frame);
            return writer;
        };

        GC2BS_RequestSnapshot.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        GC2BS_RequestSnapshot.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.GC2BS_RequestSnapshot();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.frame = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        GC2BS_RequestSnapshot.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        GC2BS_RequestSnapshot.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.opts != null && message.hasOwnProperty("opts")) {
                var error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            if (message.frame != null && message.hasOwnProperty("frame"))
                if (!$util.isInteger(message.frame))
                    return "frame: integer expected";
            return null;
        };

        GC2BS_RequestSnapshot.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.GC2BS_RequestSnapshot)
                return object;
            var message = new $root.Protos.GC2BS_RequestSnapshot();
            if (object.opts != null) {
                if (typeof object.opts !== "object")
                    throw TypeError(".Protos.GC2BS_RequestSnapshot.opts: object expected");
                message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
            }
            if (object.frame != null)
                message.frame = object.frame | 0;
            return message;
        };

        GC2BS_RequestSnapshot.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.opts = null;
                object.frame = 0;
            }
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            if (message.frame != null && message.hasOwnProperty("frame"))
                object.frame = message.frame;
            return object;
        };

        GC2BS_RequestSnapshot.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GC2BS_RequestSnapshot;
    })();

    Protos.GC2BS_FrameActionInfo = (function() {

        function GC2BS_FrameActionInfo(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        GC2BS_FrameActionInfo.prototype.frame = 0;
        GC2BS_FrameActionInfo.prototype.inputFlag = 0;
        GC2BS_FrameActionInfo.prototype.v0 = 0;
        GC2BS_FrameActionInfo.prototype.v1 = 0;

        GC2BS_FrameActionInfo.create = function create(properties) {
            return new GC2BS_FrameActionInfo(properties);
        };

        GC2BS_FrameActionInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.frame != null && message.hasOwnProperty("frame"))
                writer.uint32(8).int32(message.frame);
            if (message.inputFlag != null && message.hasOwnProperty("inputFlag"))
                writer.uint32(16).int32(message.inputFlag);
            if (message.v0 != null && message.hasOwnProperty("v0"))
                writer.uint32(24).int32(message.v0);
            if (message.v1 != null && message.hasOwnProperty("v1"))
                writer.uint32(32).int32(message.v1);
            return writer;
        };

        GC2BS_FrameActionInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        GC2BS_FrameActionInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.GC2BS_FrameActionInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.frame = reader.int32();
                    break;
                case 2:
                    message.inputFlag = reader.int32();
                    break;
                case 3:
                    message.v0 = reader.int32();
                    break;
                case 4:
                    message.v1 = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        GC2BS_FrameActionInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        GC2BS_FrameActionInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.frame != null && message.hasOwnProperty("frame"))
                if (!$util.isInteger(message.frame))
                    return "frame: integer expected";
            if (message.inputFlag != null && message.hasOwnProperty("inputFlag"))
                if (!$util.isInteger(message.inputFlag))
                    return "inputFlag: integer expected";
            if (message.v0 != null && message.hasOwnProperty("v0"))
                if (!$util.isInteger(message.v0))
                    return "v0: integer expected";
            if (message.v1 != null && message.hasOwnProperty("v1"))
                if (!$util.isInteger(message.v1))
                    return "v1: integer expected";
            return null;
        };

        GC2BS_FrameActionInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.GC2BS_FrameActionInfo)
                return object;
            var message = new $root.Protos.GC2BS_FrameActionInfo();
            if (object.frame != null)
                message.frame = object.frame | 0;
            if (object.inputFlag != null)
                message.inputFlag = object.inputFlag | 0;
            if (object.v0 != null)
                message.v0 = object.v0 | 0;
            if (object.v1 != null)
                message.v1 = object.v1 | 0;
            return message;
        };

        GC2BS_FrameActionInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.frame = 0;
                object.inputFlag = 0;
                object.v0 = 0;
                object.v1 = 0;
            }
            if (message.frame != null && message.hasOwnProperty("frame"))
                object.frame = message.frame;
            if (message.inputFlag != null && message.hasOwnProperty("inputFlag"))
                object.inputFlag = message.inputFlag;
            if (message.v0 != null && message.hasOwnProperty("v0"))
                object.v0 = message.v0;
            if (message.v1 != null && message.hasOwnProperty("v1"))
                object.v1 = message.v1;
            return object;
        };

        GC2BS_FrameActionInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GC2BS_FrameActionInfo;
    })();

    Protos.GC2BS_FrameAction = (function() {

        function GC2BS_FrameAction(properties) {
            this.infos = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        GC2BS_FrameAction.prototype.opts = null;
        GC2BS_FrameAction.prototype.infos = $util.emptyArray;

        GC2BS_FrameAction.create = function create(properties) {
            return new GC2BS_FrameAction(properties);
        };

        GC2BS_FrameAction.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.opts != null && message.hasOwnProperty("opts"))
                $root.Protos.MsgOpts.encode(message.opts, writer.uint32(10).fork()).ldelim();
            if (message.infos != null && message.infos.length)
                for (var i = 0; i < message.infos.length; ++i)
                    $root.Protos.GC2BS_FrameActionInfo.encode(message.infos[i], writer.uint32(18).fork()).ldelim();
            return writer;
        };

        GC2BS_FrameAction.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        GC2BS_FrameAction.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.GC2BS_FrameAction();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                    break;
                case 2:
                    if (!(message.infos && message.infos.length))
                        message.infos = [];
                    message.infos.push($root.Protos.GC2BS_FrameActionInfo.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        GC2BS_FrameAction.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        GC2BS_FrameAction.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.opts != null && message.hasOwnProperty("opts")) {
                var error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            if (message.infos != null && message.hasOwnProperty("infos")) {
                if (!Array.isArray(message.infos))
                    return "infos: array expected";
                for (var i = 0; i < message.infos.length; ++i) {
                    var error = $root.Protos.GC2BS_FrameActionInfo.verify(message.infos[i]);
                    if (error)
                        return "infos." + error;
                }
            }
            return null;
        };

        GC2BS_FrameAction.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.GC2BS_FrameAction)
                return object;
            var message = new $root.Protos.GC2BS_FrameAction();
            if (object.opts != null) {
                if (typeof object.opts !== "object")
                    throw TypeError(".Protos.GC2BS_FrameAction.opts: object expected");
                message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
            }
            if (object.infos) {
                if (!Array.isArray(object.infos))
                    throw TypeError(".Protos.GC2BS_FrameAction.infos: array expected");
                message.infos = [];
                for (var i = 0; i < object.infos.length; ++i) {
                    if (typeof object.infos[i] !== "object")
                        throw TypeError(".Protos.GC2BS_FrameAction.infos: object expected");
                    message.infos[i] = $root.Protos.GC2BS_FrameActionInfo.fromObject(object.infos[i]);
                }
            }
            return message;
        };

        GC2BS_FrameAction.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.infos = [];
            if (options.defaults)
                object.opts = null;
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            if (message.infos && message.infos.length) {
                object.infos = [];
                for (var j = 0; j < message.infos.length; ++j)
                    object.infos[j] = $root.Protos.GC2BS_FrameActionInfo.toObject(message.infos[j], options);
            }
            return object;
        };

        GC2BS_FrameAction.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GC2BS_FrameAction;
    })();

    Protos.GC2BS_RequestFrameActions = (function() {

        function GC2BS_RequestFrameActions(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        GC2BS_RequestFrameActions.prototype.opts = null;
        GC2BS_RequestFrameActions.prototype.from = 0;
        GC2BS_RequestFrameActions.prototype.to = 0;

        GC2BS_RequestFrameActions.create = function create(properties) {
            return new GC2BS_RequestFrameActions(properties);
        };

        GC2BS_RequestFrameActions.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.opts != null && message.hasOwnProperty("opts"))
                $root.Protos.MsgOpts.encode(message.opts, writer.uint32(10).fork()).ldelim();
            if (message.from != null && message.hasOwnProperty("from"))
                writer.uint32(16).int32(message.from);
            if (message.to != null && message.hasOwnProperty("to"))
                writer.uint32(24).int32(message.to);
            return writer;
        };

        GC2BS_RequestFrameActions.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        GC2BS_RequestFrameActions.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.GC2BS_RequestFrameActions();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.from = reader.int32();
                    break;
                case 3:
                    message.to = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        GC2BS_RequestFrameActions.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        GC2BS_RequestFrameActions.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.opts != null && message.hasOwnProperty("opts")) {
                var error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            if (message.from != null && message.hasOwnProperty("from"))
                if (!$util.isInteger(message.from))
                    return "from: integer expected";
            if (message.to != null && message.hasOwnProperty("to"))
                if (!$util.isInteger(message.to))
                    return "to: integer expected";
            return null;
        };

        GC2BS_RequestFrameActions.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.GC2BS_RequestFrameActions)
                return object;
            var message = new $root.Protos.GC2BS_RequestFrameActions();
            if (object.opts != null) {
                if (typeof object.opts !== "object")
                    throw TypeError(".Protos.GC2BS_RequestFrameActions.opts: object expected");
                message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
            }
            if (object.from != null)
                message.from = object.from | 0;
            if (object.to != null)
                message.to = object.to | 0;
            return message;
        };

        GC2BS_RequestFrameActions.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.opts = null;
                object.from = 0;
                object.to = 0;
            }
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            if (message.from != null && message.hasOwnProperty("from"))
                object.from = message.from;
            if (message.to != null && message.hasOwnProperty("to"))
                object.to = message.to;
            return object;
        };

        GC2BS_RequestFrameActions.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GC2BS_RequestFrameActions;
    })();

    Protos.GC2BS_CommitSnapshot = (function() {

        function GC2BS_CommitSnapshot(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        GC2BS_CommitSnapshot.prototype.opts = null;
        GC2BS_CommitSnapshot.prototype.frame = 0;
        GC2BS_CommitSnapshot.prototype.data = $util.newBuffer([]);

        GC2BS_CommitSnapshot.create = function create(properties) {
            return new GC2BS_CommitSnapshot(properties);
        };

        GC2BS_CommitSnapshot.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.opts != null && message.hasOwnProperty("opts"))
                $root.Protos.MsgOpts.encode(message.opts, writer.uint32(10).fork()).ldelim();
            if (message.frame != null && message.hasOwnProperty("frame"))
                writer.uint32(16).int32(message.frame);
            if (message.data != null && message.hasOwnProperty("data"))
                writer.uint32(26).bytes(message.data);
            return writer;
        };

        GC2BS_CommitSnapshot.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        GC2BS_CommitSnapshot.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.GC2BS_CommitSnapshot();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.frame = reader.int32();
                    break;
                case 3:
                    message.data = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        GC2BS_CommitSnapshot.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        GC2BS_CommitSnapshot.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.opts != null && message.hasOwnProperty("opts")) {
                var error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            if (message.frame != null && message.hasOwnProperty("frame"))
                if (!$util.isInteger(message.frame))
                    return "frame: integer expected";
            if (message.data != null && message.hasOwnProperty("data"))
                if (!(message.data && typeof message.data.length === "number" || $util.isString(message.data)))
                    return "data: buffer expected";
            return null;
        };

        GC2BS_CommitSnapshot.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.GC2BS_CommitSnapshot)
                return object;
            var message = new $root.Protos.GC2BS_CommitSnapshot();
            if (object.opts != null) {
                if (typeof object.opts !== "object")
                    throw TypeError(".Protos.GC2BS_CommitSnapshot.opts: object expected");
                message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
            }
            if (object.frame != null)
                message.frame = object.frame | 0;
            if (object.data != null)
                if (typeof object.data === "string")
                    $util.base64.decode(object.data, message.data = $util.newBuffer($util.base64.length(object.data)), 0);
                else if (object.data.length)
                    message.data = object.data;
            return message;
        };

        GC2BS_CommitSnapshot.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.opts = null;
                object.frame = 0;
                if (options.bytes === String)
                    object.data = "";
                else {
                    object.data = [];
                    if (options.bytes !== Array)
                        object.data = $util.newBuffer(object.data);
                }
            }
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            if (message.frame != null && message.hasOwnProperty("frame"))
                object.frame = message.frame;
            if (message.data != null && message.hasOwnProperty("data"))
                object.data = options.bytes === String ? $util.base64.encode(message.data, 0, message.data.length) : options.bytes === Array ? Array.prototype.slice.call(message.data) : message.data;
            return object;
        };

        GC2BS_CommitSnapshot.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GC2BS_CommitSnapshot;
    })();

    Protos.GC2BS_EndBattle = (function() {

        function GC2BS_EndBattle(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        GC2BS_EndBattle.prototype.opts = null;
        GC2BS_EndBattle.prototype.winTeam = 0;
        GC2BS_EndBattle.prototype.snapshot = $util.newBuffer([]);

        GC2BS_EndBattle.create = function create(properties) {
            return new GC2BS_EndBattle(properties);
        };

        GC2BS_EndBattle.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.opts != null && message.hasOwnProperty("opts"))
                $root.Protos.MsgOpts.encode(message.opts, writer.uint32(10).fork()).ldelim();
            if (message.winTeam != null && message.hasOwnProperty("winTeam"))
                writer.uint32(16).uint32(message.winTeam);
            if (message.snapshot != null && message.hasOwnProperty("snapshot"))
                writer.uint32(26).bytes(message.snapshot);
            return writer;
        };

        GC2BS_EndBattle.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        GC2BS_EndBattle.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.GC2BS_EndBattle();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.winTeam = reader.uint32();
                    break;
                case 3:
                    message.snapshot = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        GC2BS_EndBattle.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        GC2BS_EndBattle.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.opts != null && message.hasOwnProperty("opts")) {
                var error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            if (message.winTeam != null && message.hasOwnProperty("winTeam"))
                if (!$util.isInteger(message.winTeam))
                    return "winTeam: integer expected";
            if (message.snapshot != null && message.hasOwnProperty("snapshot"))
                if (!(message.snapshot && typeof message.snapshot.length === "number" || $util.isString(message.snapshot)))
                    return "snapshot: buffer expected";
            return null;
        };

        GC2BS_EndBattle.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.GC2BS_EndBattle)
                return object;
            var message = new $root.Protos.GC2BS_EndBattle();
            if (object.opts != null) {
                if (typeof object.opts !== "object")
                    throw TypeError(".Protos.GC2BS_EndBattle.opts: object expected");
                message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
            }
            if (object.winTeam != null)
                message.winTeam = object.winTeam >>> 0;
            if (object.snapshot != null)
                if (typeof object.snapshot === "string")
                    $util.base64.decode(object.snapshot, message.snapshot = $util.newBuffer($util.base64.length(object.snapshot)), 0);
                else if (object.snapshot.length)
                    message.snapshot = object.snapshot;
            return message;
        };

        GC2BS_EndBattle.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.opts = null;
                object.winTeam = 0;
                if (options.bytes === String)
                    object.snapshot = "";
                else {
                    object.snapshot = [];
                    if (options.bytes !== Array)
                        object.snapshot = $util.newBuffer(object.snapshot);
                }
            }
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            if (message.winTeam != null && message.hasOwnProperty("winTeam"))
                object.winTeam = message.winTeam;
            if (message.snapshot != null && message.hasOwnProperty("snapshot"))
                object.snapshot = options.bytes === String ? $util.base64.encode(message.snapshot, 0, message.snapshot.length) : options.bytes === Array ? Array.prototype.slice.call(message.snapshot) : message.snapshot;
            return object;
        };

        GC2BS_EndBattle.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GC2BS_EndBattle;
    })();

    Protos.GC2CS_BeginMatch = (function() {

        function GC2CS_BeginMatch(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        GC2CS_BeginMatch.prototype.opts = null;
        GC2CS_BeginMatch.prototype.mode = 0;
        GC2CS_BeginMatch.prototype.actorID = 0;

        GC2CS_BeginMatch.create = function create(properties) {
            return new GC2CS_BeginMatch(properties);
        };

        GC2CS_BeginMatch.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.opts != null && message.hasOwnProperty("opts"))
                $root.Protos.MsgOpts.encode(message.opts, writer.uint32(10).fork()).ldelim();
            if (message.mode != null && message.hasOwnProperty("mode"))
                writer.uint32(16).int32(message.mode);
            if (message.actorID != null && message.hasOwnProperty("actorID"))
                writer.uint32(24).int32(message.actorID);
            return writer;
        };

        GC2CS_BeginMatch.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        GC2CS_BeginMatch.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.GC2CS_BeginMatch();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.mode = reader.int32();
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

        GC2CS_BeginMatch.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        GC2CS_BeginMatch.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.opts != null && message.hasOwnProperty("opts")) {
                var error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            if (message.mode != null && message.hasOwnProperty("mode"))
                switch (message.mode) {
                default:
                    return "mode: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                    break;
                }
            if (message.actorID != null && message.hasOwnProperty("actorID"))
                if (!$util.isInteger(message.actorID))
                    return "actorID: integer expected";
            return null;
        };

        GC2CS_BeginMatch.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.GC2CS_BeginMatch)
                return object;
            var message = new $root.Protos.GC2CS_BeginMatch();
            if (object.opts != null) {
                if (typeof object.opts !== "object")
                    throw TypeError(".Protos.GC2CS_BeginMatch.opts: object expected");
                message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
            }
            switch (object.mode) {
            case "Single1V1":
            case 0:
                message.mode = 0;
                break;
            case "Single2V2":
            case 1:
                message.mode = 1;
                break;
            case "Team2V2":
            case 2:
                message.mode = 2;
                break;
            case "All":
            case 3:
                message.mode = 3;
                break;
            }
            if (object.actorID != null)
                message.actorID = object.actorID | 0;
            return message;
        };

        GC2CS_BeginMatch.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.opts = null;
                object.mode = options.enums === String ? "Single1V1" : 0;
                object.actorID = 0;
            }
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            if (message.mode != null && message.hasOwnProperty("mode"))
                object.mode = options.enums === String ? $root.Protos.GC2CS_BeginMatch.EMode[message.mode] : message.mode;
            if (message.actorID != null && message.hasOwnProperty("actorID"))
                object.actorID = message.actorID;
            return object;
        };

        GC2CS_BeginMatch.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        GC2CS_BeginMatch.EMode = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "Single1V1"] = 0;
            values[valuesById[1] = "Single2V2"] = 1;
            values[valuesById[2] = "Team2V2"] = 2;
            values[valuesById[3] = "All"] = 3;
            return values;
        })();

        return GC2CS_BeginMatch;
    })();

    Protos.GC2GS_AskLogin = (function() {

        function GC2GS_AskLogin(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
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
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.GC2GS_AskLogin();
            while (reader.pos < end) {
                var tag = reader.uint32();
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
                var error = $root.Protos.MsgOpts.verify(message.opts);
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
            var message = new $root.Protos.GC2GS_AskLogin();
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
            var object = {};
            if (options.defaults) {
                object.opts = null;
                object.pwd = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
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
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
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
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.GC2GS_KeepAlive();
            while (reader.pos < end) {
                var tag = reader.uint32();
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
                var error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            return null;
        };

        GC2GS_KeepAlive.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.GC2GS_KeepAlive)
                return object;
            var message = new $root.Protos.GC2GS_KeepAlive();
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
            var object = {};
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
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        GC2LS_AskRegister.prototype.opts = null;
        GC2LS_AskRegister.prototype.id = "";
        GC2LS_AskRegister.prototype.passwd = "";

        GC2LS_AskRegister.create = function create(properties) {
            return new GC2LS_AskRegister(properties);
        };

        GC2LS_AskRegister.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.opts != null && message.hasOwnProperty("opts"))
                $root.Protos.MsgOpts.encode(message.opts, writer.uint32(10).fork()).ldelim();
            if (message.id != null && message.hasOwnProperty("id"))
                writer.uint32(18).string(message.id);
            if (message.passwd != null && message.hasOwnProperty("passwd"))
                writer.uint32(26).string(message.passwd);
            return writer;
        };

        GC2LS_AskRegister.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        GC2LS_AskRegister.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.GC2LS_AskRegister();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.id = reader.string();
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

        GC2LS_AskRegister.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        GC2LS_AskRegister.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.opts != null && message.hasOwnProperty("opts")) {
                var error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.passwd != null && message.hasOwnProperty("passwd"))
                if (!$util.isString(message.passwd))
                    return "passwd: string expected";
            return null;
        };

        GC2LS_AskRegister.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.GC2LS_AskRegister)
                return object;
            var message = new $root.Protos.GC2LS_AskRegister();
            if (object.opts != null) {
                if (typeof object.opts !== "object")
                    throw TypeError(".Protos.GC2LS_AskRegister.opts: object expected");
                message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
            }
            if (object.id != null)
                message.id = String(object.id);
            if (object.passwd != null)
                message.passwd = String(object.passwd);
            return message;
        };

        GC2LS_AskRegister.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.opts = null;
                object.id = "";
                object.passwd = "";
            }
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.passwd != null && message.hasOwnProperty("passwd"))
                object.passwd = message.passwd;
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
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        GC2LS_AskLogin.prototype.opts = null;
        GC2LS_AskLogin.prototype.id = "";
        GC2LS_AskLogin.prototype.passwd = "";
        GC2LS_AskLogin.prototype.channel = 0;
        GC2LS_AskLogin.prototype.browser = 0;
        GC2LS_AskLogin.prototype.platform = 0;

        GC2LS_AskLogin.create = function create(properties) {
            return new GC2LS_AskLogin(properties);
        };

        GC2LS_AskLogin.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.opts != null && message.hasOwnProperty("opts"))
                $root.Protos.MsgOpts.encode(message.opts, writer.uint32(10).fork()).ldelim();
            if (message.id != null && message.hasOwnProperty("id"))
                writer.uint32(18).string(message.id);
            if (message.passwd != null && message.hasOwnProperty("passwd"))
                writer.uint32(26).string(message.passwd);
            if (message.channel != null && message.hasOwnProperty("channel"))
                writer.uint32(32).int32(message.channel);
            if (message.browser != null && message.hasOwnProperty("browser"))
                writer.uint32(40).int32(message.browser);
            if (message.platform != null && message.hasOwnProperty("platform"))
                writer.uint32(48).int32(message.platform);
            return writer;
        };

        GC2LS_AskLogin.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        GC2LS_AskLogin.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.GC2LS_AskLogin();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.id = reader.string();
                    break;
                case 3:
                    message.passwd = reader.string();
                    break;
                case 4:
                    message.channel = reader.int32();
                    break;
                case 5:
                    message.browser = reader.int32();
                    break;
                case 6:
                    message.platform = reader.int32();
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
                var error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.passwd != null && message.hasOwnProperty("passwd"))
                if (!$util.isString(message.passwd))
                    return "passwd: string expected";
            if (message.channel != null && message.hasOwnProperty("channel"))
                switch (message.channel) {
                default:
                    return "channel: enum value expected";
                case 0:
                case 1:
                    break;
                }
            if (message.browser != null && message.hasOwnProperty("browser"))
                switch (message.browser) {
                default:
                    return "browser: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                    break;
                }
            if (message.platform != null && message.hasOwnProperty("platform"))
                switch (message.platform) {
                default:
                    return "platform: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                    break;
                }
            return null;
        };

        GC2LS_AskLogin.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.GC2LS_AskLogin)
                return object;
            var message = new $root.Protos.GC2LS_AskLogin();
            if (object.opts != null) {
                if (typeof object.opts !== "object")
                    throw TypeError(".Protos.GC2LS_AskLogin.opts: object expected");
                message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
            }
            if (object.id != null)
                message.id = String(object.id);
            if (object.passwd != null)
                message.passwd = String(object.passwd);
            switch (object.channel) {
            case "Web":
            case 0:
                message.channel = 0;
                break;
            case "WXMini":
            case 1:
                message.channel = 1;
                break;
            }
            switch (object.browser) {
            case "Chrome":
            case 0:
                message.browser = 0;
                break;
            case "Firefox":
            case 1:
                message.browser = 1;
                break;
            case "Safair":
            case 2:
                message.browser = 2;
                break;
            case "Edge":
            case 3:
                message.browser = 3;
                break;
            case "IE":
            case 4:
                message.browser = 4;
                break;
            }
            switch (object.platform) {
            case "PC":
            case 0:
                message.platform = 0;
                break;
            case "Android":
            case 1:
                message.platform = 1;
                break;
            case "IOS":
            case 2:
                message.platform = 2;
                break;
            case "WP":
            case 3:
                message.platform = 3;
                break;
            }
            return message;
        };

        GC2LS_AskLogin.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.opts = null;
                object.id = "";
                object.passwd = "";
                object.channel = options.enums === String ? "Web" : 0;
                object.browser = options.enums === String ? "Chrome" : 0;
                object.platform = options.enums === String ? "PC" : 0;
            }
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.passwd != null && message.hasOwnProperty("passwd"))
                object.passwd = message.passwd;
            if (message.channel != null && message.hasOwnProperty("channel"))
                object.channel = options.enums === String ? $root.Protos.Global.Channel[message.channel] : message.channel;
            if (message.browser != null && message.hasOwnProperty("browser"))
                object.browser = options.enums === String ? $root.Protos.Global.Browser[message.browser] : message.browser;
            if (message.platform != null && message.hasOwnProperty("platform"))
                object.platform = options.enums === String ? $root.Protos.Global.Platform[message.platform] : message.platform;
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
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        GC2LS_AskSmartLogin.prototype.opts = null;
        GC2LS_AskSmartLogin.prototype.id = "";
        GC2LS_AskSmartLogin.prototype.channel = 0;
        GC2LS_AskSmartLogin.prototype.browser = 0;
        GC2LS_AskSmartLogin.prototype.platform = 0;

        GC2LS_AskSmartLogin.create = function create(properties) {
            return new GC2LS_AskSmartLogin(properties);
        };

        GC2LS_AskSmartLogin.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.opts != null && message.hasOwnProperty("opts"))
                $root.Protos.MsgOpts.encode(message.opts, writer.uint32(10).fork()).ldelim();
            if (message.id != null && message.hasOwnProperty("id"))
                writer.uint32(18).string(message.id);
            if (message.channel != null && message.hasOwnProperty("channel"))
                writer.uint32(24).int32(message.channel);
            if (message.browser != null && message.hasOwnProperty("browser"))
                writer.uint32(32).int32(message.browser);
            if (message.platform != null && message.hasOwnProperty("platform"))
                writer.uint32(40).int32(message.platform);
            return writer;
        };

        GC2LS_AskSmartLogin.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        GC2LS_AskSmartLogin.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.GC2LS_AskSmartLogin();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.id = reader.string();
                    break;
                case 3:
                    message.channel = reader.int32();
                    break;
                case 4:
                    message.browser = reader.int32();
                    break;
                case 5:
                    message.platform = reader.int32();
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
                var error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.channel != null && message.hasOwnProperty("channel"))
                switch (message.channel) {
                default:
                    return "channel: enum value expected";
                case 0:
                case 1:
                    break;
                }
            if (message.browser != null && message.hasOwnProperty("browser"))
                switch (message.browser) {
                default:
                    return "browser: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                    break;
                }
            if (message.platform != null && message.hasOwnProperty("platform"))
                switch (message.platform) {
                default:
                    return "platform: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                    break;
                }
            return null;
        };

        GC2LS_AskSmartLogin.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.GC2LS_AskSmartLogin)
                return object;
            var message = new $root.Protos.GC2LS_AskSmartLogin();
            if (object.opts != null) {
                if (typeof object.opts !== "object")
                    throw TypeError(".Protos.GC2LS_AskSmartLogin.opts: object expected");
                message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
            }
            if (object.id != null)
                message.id = String(object.id);
            switch (object.channel) {
            case "Web":
            case 0:
                message.channel = 0;
                break;
            case "WXMini":
            case 1:
                message.channel = 1;
                break;
            }
            switch (object.browser) {
            case "Chrome":
            case 0:
                message.browser = 0;
                break;
            case "Firefox":
            case 1:
                message.browser = 1;
                break;
            case "Safair":
            case 2:
                message.browser = 2;
                break;
            case "Edge":
            case 3:
                message.browser = 3;
                break;
            case "IE":
            case 4:
                message.browser = 4;
                break;
            }
            switch (object.platform) {
            case "PC":
            case 0:
                message.platform = 0;
                break;
            case "Android":
            case 1:
                message.platform = 1;
                break;
            case "IOS":
            case 2:
                message.platform = 2;
                break;
            case "WP":
            case 3:
                message.platform = 3;
                break;
            }
            return message;
        };

        GC2LS_AskSmartLogin.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.opts = null;
                object.id = "";
                object.channel = options.enums === String ? "Web" : 0;
                object.browser = options.enums === String ? "Chrome" : 0;
                object.platform = options.enums === String ? "PC" : 0;
            }
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.channel != null && message.hasOwnProperty("channel"))
                object.channel = options.enums === String ? $root.Protos.Global.Channel[message.channel] : message.channel;
            if (message.browser != null && message.hasOwnProperty("browser"))
                object.browser = options.enums === String ? $root.Protos.Global.Browser[message.browser] : message.browser;
            if (message.platform != null && message.hasOwnProperty("platform"))
                object.platform = options.enums === String ? $root.Protos.Global.Platform[message.platform] : message.platform;
            return object;
        };

        GC2LS_AskSmartLogin.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GC2LS_AskSmartLogin;
    })();

    Protos.GC2LS_AskWXLogin = (function() {

        function GC2LS_AskWXLogin(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        GC2LS_AskWXLogin.prototype.opts = null;
        GC2LS_AskWXLogin.prototype.code = "";
        GC2LS_AskWXLogin.prototype.browser = 0;
        GC2LS_AskWXLogin.prototype.platform = 0;
        GC2LS_AskWXLogin.prototype.nickname = "";
        GC2LS_AskWXLogin.prototype.avatar = "";
        GC2LS_AskWXLogin.prototype.gender = 0;

        GC2LS_AskWXLogin.create = function create(properties) {
            return new GC2LS_AskWXLogin(properties);
        };

        GC2LS_AskWXLogin.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.opts != null && message.hasOwnProperty("opts"))
                $root.Protos.MsgOpts.encode(message.opts, writer.uint32(10).fork()).ldelim();
            if (message.code != null && message.hasOwnProperty("code"))
                writer.uint32(18).string(message.code);
            if (message.browser != null && message.hasOwnProperty("browser"))
                writer.uint32(24).int32(message.browser);
            if (message.platform != null && message.hasOwnProperty("platform"))
                writer.uint32(32).int32(message.platform);
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                writer.uint32(42).string(message.nickname);
            if (message.avatar != null && message.hasOwnProperty("avatar"))
                writer.uint32(50).string(message.avatar);
            if (message.gender != null && message.hasOwnProperty("gender"))
                writer.uint32(56).int32(message.gender);
            return writer;
        };

        GC2LS_AskWXLogin.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        GC2LS_AskWXLogin.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.GC2LS_AskWXLogin();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.code = reader.string();
                    break;
                case 3:
                    message.browser = reader.int32();
                    break;
                case 4:
                    message.platform = reader.int32();
                    break;
                case 5:
                    message.nickname = reader.string();
                    break;
                case 6:
                    message.avatar = reader.string();
                    break;
                case 7:
                    message.gender = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        GC2LS_AskWXLogin.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        GC2LS_AskWXLogin.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.opts != null && message.hasOwnProperty("opts")) {
                var error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            if (message.code != null && message.hasOwnProperty("code"))
                if (!$util.isString(message.code))
                    return "code: string expected";
            if (message.browser != null && message.hasOwnProperty("browser"))
                switch (message.browser) {
                default:
                    return "browser: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                    break;
                }
            if (message.platform != null && message.hasOwnProperty("platform"))
                switch (message.platform) {
                default:
                    return "platform: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                    break;
                }
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                if (!$util.isString(message.nickname))
                    return "nickname: string expected";
            if (message.avatar != null && message.hasOwnProperty("avatar"))
                if (!$util.isString(message.avatar))
                    return "avatar: string expected";
            if (message.gender != null && message.hasOwnProperty("gender"))
                if (!$util.isInteger(message.gender))
                    return "gender: integer expected";
            return null;
        };

        GC2LS_AskWXLogin.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.GC2LS_AskWXLogin)
                return object;
            var message = new $root.Protos.GC2LS_AskWXLogin();
            if (object.opts != null) {
                if (typeof object.opts !== "object")
                    throw TypeError(".Protos.GC2LS_AskWXLogin.opts: object expected");
                message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
            }
            if (object.code != null)
                message.code = String(object.code);
            switch (object.browser) {
            case "Chrome":
            case 0:
                message.browser = 0;
                break;
            case "Firefox":
            case 1:
                message.browser = 1;
                break;
            case "Safair":
            case 2:
                message.browser = 2;
                break;
            case "Edge":
            case 3:
                message.browser = 3;
                break;
            case "IE":
            case 4:
                message.browser = 4;
                break;
            }
            switch (object.platform) {
            case "PC":
            case 0:
                message.platform = 0;
                break;
            case "Android":
            case 1:
                message.platform = 1;
                break;
            case "IOS":
            case 2:
                message.platform = 2;
                break;
            case "WP":
            case 3:
                message.platform = 3;
                break;
            }
            if (object.nickname != null)
                message.nickname = String(object.nickname);
            if (object.avatar != null)
                message.avatar = String(object.avatar);
            if (object.gender != null)
                message.gender = object.gender | 0;
            return message;
        };

        GC2LS_AskWXLogin.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.opts = null;
                object.code = "";
                object.browser = options.enums === String ? "Chrome" : 0;
                object.platform = options.enums === String ? "PC" : 0;
                object.nickname = "";
                object.avatar = "";
                object.gender = 0;
            }
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = message.code;
            if (message.browser != null && message.hasOwnProperty("browser"))
                object.browser = options.enums === String ? $root.Protos.Global.Browser[message.browser] : message.browser;
            if (message.platform != null && message.hasOwnProperty("platform"))
                object.platform = options.enums === String ? $root.Protos.Global.Platform[message.platform] : message.platform;
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                object.nickname = message.nickname;
            if (message.avatar != null && message.hasOwnProperty("avatar"))
                object.avatar = message.avatar;
            if (message.gender != null && message.hasOwnProperty("gender"))
                object.gender = message.gender;
            return object;
        };

        GC2LS_AskWXLogin.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GC2LS_AskWXLogin;
    })();

    Protos.GC2LC_UpdateProfile = (function() {

        function GC2LC_UpdateProfile(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        GC2LC_UpdateProfile.prototype.opts = null;
        GC2LC_UpdateProfile.prototype.nickname = "";
        GC2LC_UpdateProfile.prototype.avatar = "";
        GC2LC_UpdateProfile.prototype.gender = 0;

        GC2LC_UpdateProfile.create = function create(properties) {
            return new GC2LC_UpdateProfile(properties);
        };

        GC2LC_UpdateProfile.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.opts != null && message.hasOwnProperty("opts"))
                $root.Protos.MsgOpts.encode(message.opts, writer.uint32(10).fork()).ldelim();
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                writer.uint32(18).string(message.nickname);
            if (message.avatar != null && message.hasOwnProperty("avatar"))
                writer.uint32(26).string(message.avatar);
            if (message.gender != null && message.hasOwnProperty("gender"))
                writer.uint32(32).int32(message.gender);
            return writer;
        };

        GC2LC_UpdateProfile.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        GC2LC_UpdateProfile.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.GC2LC_UpdateProfile();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.nickname = reader.string();
                    break;
                case 3:
                    message.avatar = reader.string();
                    break;
                case 4:
                    message.gender = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        GC2LC_UpdateProfile.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        GC2LC_UpdateProfile.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.opts != null && message.hasOwnProperty("opts")) {
                var error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                if (!$util.isString(message.nickname))
                    return "nickname: string expected";
            if (message.avatar != null && message.hasOwnProperty("avatar"))
                if (!$util.isString(message.avatar))
                    return "avatar: string expected";
            if (message.gender != null && message.hasOwnProperty("gender"))
                if (!$util.isInteger(message.gender))
                    return "gender: integer expected";
            return null;
        };

        GC2LC_UpdateProfile.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.GC2LC_UpdateProfile)
                return object;
            var message = new $root.Protos.GC2LC_UpdateProfile();
            if (object.opts != null) {
                if (typeof object.opts !== "object")
                    throw TypeError(".Protos.GC2LC_UpdateProfile.opts: object expected");
                message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
            }
            if (object.nickname != null)
                message.nickname = String(object.nickname);
            if (object.avatar != null)
                message.avatar = String(object.avatar);
            if (object.gender != null)
                message.gender = object.gender | 0;
            return message;
        };

        GC2LC_UpdateProfile.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.opts = null;
                object.nickname = "";
                object.avatar = "";
                object.gender = 0;
            }
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                object.nickname = message.nickname;
            if (message.avatar != null && message.hasOwnProperty("avatar"))
                object.avatar = message.avatar;
            if (message.gender != null && message.hasOwnProperty("gender"))
                object.gender = message.gender;
            return object;
        };

        GC2LC_UpdateProfile.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GC2LC_UpdateProfile;
    })();

    Protos.GS2GC_LoginRet = (function() {

        function GS2GC_LoginRet(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        GS2GC_LoginRet.prototype.opts = null;
        GS2GC_LoginRet.prototype.result = 0;
        GS2GC_LoginRet.prototype.gcState = 0;
        GS2GC_LoginRet.prototype.userInfo = null;
        GS2GC_LoginRet.prototype.gcNID = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
        GS2GC_LoginRet.prototype.bsIP = "";
        GS2GC_LoginRet.prototype.bsPort = 0;
        GS2GC_LoginRet.prototype.defs = $util.newBuffer([]);

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
            if (message.userInfo != null && message.hasOwnProperty("userInfo"))
                $root.Protos.G_UserInfo.encode(message.userInfo, writer.uint32(34).fork()).ldelim();
            if (message.gcNID != null && message.hasOwnProperty("gcNID"))
                writer.uint32(40).uint64(message.gcNID);
            if (message.bsIP != null && message.hasOwnProperty("bsIP"))
                writer.uint32(50).string(message.bsIP);
            if (message.bsPort != null && message.hasOwnProperty("bsPort"))
                writer.uint32(56).int32(message.bsPort);
            if (message.defs != null && message.hasOwnProperty("defs"))
                writer.uint32(66).bytes(message.defs);
            return writer;
        };

        GS2GC_LoginRet.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        GS2GC_LoginRet.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.GS2GC_LoginRet();
            while (reader.pos < end) {
                var tag = reader.uint32();
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
                    message.userInfo = $root.Protos.G_UserInfo.decode(reader, reader.uint32());
                    break;
                case 5:
                    message.gcNID = reader.uint64();
                    break;
                case 6:
                    message.bsIP = reader.string();
                    break;
                case 7:
                    message.bsPort = reader.int32();
                    break;
                case 8:
                    message.defs = reader.bytes();
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
                var error = $root.Protos.MsgOpts.verify(message.opts);
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
            if (message.userInfo != null && message.hasOwnProperty("userInfo")) {
                var error = $root.Protos.G_UserInfo.verify(message.userInfo);
                if (error)
                    return "userInfo." + error;
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
            if (message.defs != null && message.hasOwnProperty("defs"))
                if (!(message.defs && typeof message.defs.length === "number" || $util.isString(message.defs)))
                    return "defs: buffer expected";
            return null;
        };

        GS2GC_LoginRet.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.GS2GC_LoginRet)
                return object;
            var message = new $root.Protos.GS2GC_LoginRet();
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
            if (object.userInfo != null) {
                if (typeof object.userInfo !== "object")
                    throw TypeError(".Protos.GS2GC_LoginRet.userInfo: object expected");
                message.userInfo = $root.Protos.G_UserInfo.fromObject(object.userInfo);
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
            if (object.defs != null)
                if (typeof object.defs === "string")
                    $util.base64.decode(object.defs, message.defs = $util.newBuffer($util.base64.length(object.defs)), 0);
                else if (object.defs.length)
                    message.defs = object.defs;
            return message;
        };

        GS2GC_LoginRet.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.opts = null;
                object.result = options.enums === String ? "Success" : 0;
                object.gcState = options.enums === String ? "Idle" : 0;
                object.userInfo = null;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.gcNID = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.gcNID = options.longs === String ? "0" : 0;
                object.bsIP = "";
                object.bsPort = 0;
                if (options.bytes === String)
                    object.defs = "";
                else {
                    object.defs = [];
                    if (options.bytes !== Array)
                        object.defs = $util.newBuffer(object.defs);
                }
            }
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            if (message.result != null && message.hasOwnProperty("result"))
                object.result = options.enums === String ? $root.Protos.GS2GC_LoginRet.EResult[message.result] : message.result;
            if (message.gcState != null && message.hasOwnProperty("gcState"))
                object.gcState = options.enums === String ? $root.Protos.GS2GC_LoginRet.EGCCState[message.gcState] : message.gcState;
            if (message.userInfo != null && message.hasOwnProperty("userInfo"))
                object.userInfo = $root.Protos.G_UserInfo.toObject(message.userInfo, options);
            if (message.gcNID != null && message.hasOwnProperty("gcNID"))
                if (typeof message.gcNID === "number")
                    object.gcNID = options.longs === String ? String(message.gcNID) : message.gcNID;
                else
                    object.gcNID = options.longs === String ? $util.Long.prototype.toString.call(message.gcNID) : options.longs === Number ? new $util.LongBits(message.gcNID.low >>> 0, message.gcNID.high >>> 0).toNumber(true) : message.gcNID;
            if (message.bsIP != null && message.hasOwnProperty("bsIP"))
                object.bsIP = message.bsIP;
            if (message.bsPort != null && message.hasOwnProperty("bsPort"))
                object.bsPort = message.bsPort;
            if (message.defs != null && message.hasOwnProperty("defs"))
                object.defs = options.bytes === String ? $util.base64.encode(message.defs, 0, message.defs.length) : options.bytes === Array ? Array.prototype.slice.call(message.defs) : message.defs;
            return object;
        };

        GS2GC_LoginRet.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        GS2GC_LoginRet.EResult = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "Success"] = 0;
            values[valuesById[1] = "SessionExpire"] = 1;
            return values;
        })();

        GS2GC_LoginRet.EGCCState = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "Idle"] = 0;
            values[valuesById[1] = "Battle"] = 1;
            return values;
        })();

        return GS2GC_LoginRet;
    })();

    Protos.GS2GC_Kick = (function() {

        function GS2GC_Kick(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
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
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.GS2GC_Kick();
            while (reader.pos < end) {
                var tag = reader.uint32();
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
                var error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            if (message.reason != null && message.hasOwnProperty("reason"))
                switch (message.reason) {
                default:
                    return "reason: enum value expected";
                case 0:
                case 1:
                case 2:
                    break;
                }
            return null;
        };

        GS2GC_Kick.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.GS2GC_Kick)
                return object;
            var message = new $root.Protos.GS2GC_Kick();
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
            case "OutOfSync":
            case 1:
                message.reason = 1;
                break;
            case "Other":
            case 2:
                message.reason = 2;
                break;
            }
            return message;
        };

        GS2GC_Kick.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
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

    Protos.GS2GC_CSLost = (function() {

        function GS2GC_CSLost(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        GS2GC_CSLost.prototype.opts = null;

        GS2GC_CSLost.create = function create(properties) {
            return new GS2GC_CSLost(properties);
        };

        GS2GC_CSLost.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.opts != null && message.hasOwnProperty("opts"))
                $root.Protos.MsgOpts.encode(message.opts, writer.uint32(10).fork()).ldelim();
            return writer;
        };

        GS2GC_CSLost.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        GS2GC_CSLost.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.GS2GC_CSLost();
            while (reader.pos < end) {
                var tag = reader.uint32();
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

        GS2GC_CSLost.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        GS2GC_CSLost.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.opts != null && message.hasOwnProperty("opts")) {
                var error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            return null;
        };

        GS2GC_CSLost.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.GS2GC_CSLost)
                return object;
            var message = new $root.Protos.GS2GC_CSLost();
            if (object.opts != null) {
                if (typeof object.opts !== "object")
                    throw TypeError(".Protos.GS2GC_CSLost.opts: object expected");
                message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
            }
            return message;
        };

        GS2GC_CSLost.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.opts = null;
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            return object;
        };

        GS2GC_CSLost.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GS2GC_CSLost;
    })();

    Protos.LS2CS_GCLogin = (function() {

        function LS2CS_GCLogin(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        LS2CS_GCLogin.prototype.opts = null;
        LS2CS_GCLogin.prototype.gcNID = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
        LS2CS_GCLogin.prototype.id = "";
        LS2CS_GCLogin.prototype.ukey = 0;
        LS2CS_GCLogin.prototype.channel = 0;
        LS2CS_GCLogin.prototype.browser = 0;
        LS2CS_GCLogin.prototype.platform = 0;
        LS2CS_GCLogin.prototype.sessionKey = "";
        LS2CS_GCLogin.prototype.unionID = "";
        LS2CS_GCLogin.prototype.nickname = "";
        LS2CS_GCLogin.prototype.avatar = "";
        LS2CS_GCLogin.prototype.gender = 0;

        LS2CS_GCLogin.create = function create(properties) {
            return new LS2CS_GCLogin(properties);
        };

        LS2CS_GCLogin.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.opts != null && message.hasOwnProperty("opts"))
                $root.Protos.MsgOpts.encode(message.opts, writer.uint32(10).fork()).ldelim();
            if (message.gcNID != null && message.hasOwnProperty("gcNID"))
                writer.uint32(16).uint64(message.gcNID);
            if (message.id != null && message.hasOwnProperty("id"))
                writer.uint32(26).string(message.id);
            if (message.ukey != null && message.hasOwnProperty("ukey"))
                writer.uint32(32).uint32(message.ukey);
            if (message.channel != null && message.hasOwnProperty("channel"))
                writer.uint32(40).int32(message.channel);
            if (message.browser != null && message.hasOwnProperty("browser"))
                writer.uint32(48).int32(message.browser);
            if (message.platform != null && message.hasOwnProperty("platform"))
                writer.uint32(56).int32(message.platform);
            if (message.sessionKey != null && message.hasOwnProperty("sessionKey"))
                writer.uint32(66).string(message.sessionKey);
            if (message.unionID != null && message.hasOwnProperty("unionID"))
                writer.uint32(74).string(message.unionID);
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                writer.uint32(82).string(message.nickname);
            if (message.avatar != null && message.hasOwnProperty("avatar"))
                writer.uint32(90).string(message.avatar);
            if (message.gender != null && message.hasOwnProperty("gender"))
                writer.uint32(96).int32(message.gender);
            return writer;
        };

        LS2CS_GCLogin.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        LS2CS_GCLogin.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.LS2CS_GCLogin();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.gcNID = reader.uint64();
                    break;
                case 3:
                    message.id = reader.string();
                    break;
                case 4:
                    message.ukey = reader.uint32();
                    break;
                case 5:
                    message.channel = reader.int32();
                    break;
                case 6:
                    message.browser = reader.int32();
                    break;
                case 7:
                    message.platform = reader.int32();
                    break;
                case 8:
                    message.sessionKey = reader.string();
                    break;
                case 9:
                    message.unionID = reader.string();
                    break;
                case 10:
                    message.nickname = reader.string();
                    break;
                case 11:
                    message.avatar = reader.string();
                    break;
                case 12:
                    message.gender = reader.int32();
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
                var error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            if (message.gcNID != null && message.hasOwnProperty("gcNID"))
                if (!$util.isInteger(message.gcNID) && !(message.gcNID && $util.isInteger(message.gcNID.low) && $util.isInteger(message.gcNID.high)))
                    return "gcNID: integer|Long expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.ukey != null && message.hasOwnProperty("ukey"))
                if (!$util.isInteger(message.ukey))
                    return "ukey: integer expected";
            if (message.channel != null && message.hasOwnProperty("channel"))
                switch (message.channel) {
                default:
                    return "channel: enum value expected";
                case 0:
                case 1:
                    break;
                }
            if (message.browser != null && message.hasOwnProperty("browser"))
                switch (message.browser) {
                default:
                    return "browser: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                    break;
                }
            if (message.platform != null && message.hasOwnProperty("platform"))
                switch (message.platform) {
                default:
                    return "platform: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                    break;
                }
            if (message.sessionKey != null && message.hasOwnProperty("sessionKey"))
                if (!$util.isString(message.sessionKey))
                    return "sessionKey: string expected";
            if (message.unionID != null && message.hasOwnProperty("unionID"))
                if (!$util.isString(message.unionID))
                    return "unionID: string expected";
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                if (!$util.isString(message.nickname))
                    return "nickname: string expected";
            if (message.avatar != null && message.hasOwnProperty("avatar"))
                if (!$util.isString(message.avatar))
                    return "avatar: string expected";
            if (message.gender != null && message.hasOwnProperty("gender"))
                if (!$util.isInteger(message.gender))
                    return "gender: integer expected";
            return null;
        };

        LS2CS_GCLogin.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.LS2CS_GCLogin)
                return object;
            var message = new $root.Protos.LS2CS_GCLogin();
            if (object.opts != null) {
                if (typeof object.opts !== "object")
                    throw TypeError(".Protos.LS2CS_GCLogin.opts: object expected");
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
            if (object.id != null)
                message.id = String(object.id);
            if (object.ukey != null)
                message.ukey = object.ukey >>> 0;
            switch (object.channel) {
            case "Web":
            case 0:
                message.channel = 0;
                break;
            case "WXMini":
            case 1:
                message.channel = 1;
                break;
            }
            switch (object.browser) {
            case "Chrome":
            case 0:
                message.browser = 0;
                break;
            case "Firefox":
            case 1:
                message.browser = 1;
                break;
            case "Safair":
            case 2:
                message.browser = 2;
                break;
            case "Edge":
            case 3:
                message.browser = 3;
                break;
            case "IE":
            case 4:
                message.browser = 4;
                break;
            }
            switch (object.platform) {
            case "PC":
            case 0:
                message.platform = 0;
                break;
            case "Android":
            case 1:
                message.platform = 1;
                break;
            case "IOS":
            case 2:
                message.platform = 2;
                break;
            case "WP":
            case 3:
                message.platform = 3;
                break;
            }
            if (object.sessionKey != null)
                message.sessionKey = String(object.sessionKey);
            if (object.unionID != null)
                message.unionID = String(object.unionID);
            if (object.nickname != null)
                message.nickname = String(object.nickname);
            if (object.avatar != null)
                message.avatar = String(object.avatar);
            if (object.gender != null)
                message.gender = object.gender | 0;
            return message;
        };

        LS2CS_GCLogin.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.opts = null;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.gcNID = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.gcNID = options.longs === String ? "0" : 0;
                object.id = "";
                object.ukey = 0;
                object.channel = options.enums === String ? "Web" : 0;
                object.browser = options.enums === String ? "Chrome" : 0;
                object.platform = options.enums === String ? "PC" : 0;
                object.sessionKey = "";
                object.unionID = "";
                object.nickname = "";
                object.avatar = "";
                object.gender = 0;
            }
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            if (message.gcNID != null && message.hasOwnProperty("gcNID"))
                if (typeof message.gcNID === "number")
                    object.gcNID = options.longs === String ? String(message.gcNID) : message.gcNID;
                else
                    object.gcNID = options.longs === String ? $util.Long.prototype.toString.call(message.gcNID) : options.longs === Number ? new $util.LongBits(message.gcNID.low >>> 0, message.gcNID.high >>> 0).toNumber(true) : message.gcNID;
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.ukey != null && message.hasOwnProperty("ukey"))
                object.ukey = message.ukey;
            if (message.channel != null && message.hasOwnProperty("channel"))
                object.channel = options.enums === String ? $root.Protos.Global.Channel[message.channel] : message.channel;
            if (message.browser != null && message.hasOwnProperty("browser"))
                object.browser = options.enums === String ? $root.Protos.Global.Browser[message.browser] : message.browser;
            if (message.platform != null && message.hasOwnProperty("platform"))
                object.platform = options.enums === String ? $root.Protos.Global.Platform[message.platform] : message.platform;
            if (message.sessionKey != null && message.hasOwnProperty("sessionKey"))
                object.sessionKey = message.sessionKey;
            if (message.unionID != null && message.hasOwnProperty("unionID"))
                object.unionID = message.unionID;
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                object.nickname = message.nickname;
            if (message.avatar != null && message.hasOwnProperty("avatar"))
                object.avatar = message.avatar;
            if (message.gender != null && message.hasOwnProperty("gender"))
                object.gender = message.gender;
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
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
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
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.LS2DB_QueryAccount();
            while (reader.pos < end) {
                var tag = reader.uint32();
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
                var error = $root.Protos.MsgOpts.verify(message.opts);
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
            var message = new $root.Protos.LS2DB_QueryAccount();
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
            var object = {};
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
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        LS2DB_QueryLogin.prototype.opts = null;
        LS2DB_QueryLogin.prototype.name = "";
        LS2DB_QueryLogin.prototype.pwd = "";
        LS2DB_QueryLogin.prototype.vertPwd = false;
        LS2DB_QueryLogin.prototype.ip = "";
        LS2DB_QueryLogin.prototype.time = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
        LS2DB_QueryLogin.prototype.channel = 0;
        LS2DB_QueryLogin.prototype.browser = 0;
        LS2DB_QueryLogin.prototype.platform = 0;
        LS2DB_QueryLogin.prototype.unionID = "";
        LS2DB_QueryLogin.prototype.nickname = "";
        LS2DB_QueryLogin.prototype.avatar = "";
        LS2DB_QueryLogin.prototype.gender = 0;

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
            if (message.channel != null && message.hasOwnProperty("channel"))
                writer.uint32(56).int32(message.channel);
            if (message.browser != null && message.hasOwnProperty("browser"))
                writer.uint32(64).int32(message.browser);
            if (message.platform != null && message.hasOwnProperty("platform"))
                writer.uint32(72).int32(message.platform);
            if (message.unionID != null && message.hasOwnProperty("unionID"))
                writer.uint32(82).string(message.unionID);
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                writer.uint32(90).string(message.nickname);
            if (message.avatar != null && message.hasOwnProperty("avatar"))
                writer.uint32(98).string(message.avatar);
            if (message.gender != null && message.hasOwnProperty("gender"))
                writer.uint32(104).int32(message.gender);
            return writer;
        };

        LS2DB_QueryLogin.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        LS2DB_QueryLogin.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.LS2DB_QueryLogin();
            while (reader.pos < end) {
                var tag = reader.uint32();
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
                case 7:
                    message.channel = reader.int32();
                    break;
                case 8:
                    message.browser = reader.int32();
                    break;
                case 9:
                    message.platform = reader.int32();
                    break;
                case 10:
                    message.unionID = reader.string();
                    break;
                case 11:
                    message.nickname = reader.string();
                    break;
                case 12:
                    message.avatar = reader.string();
                    break;
                case 13:
                    message.gender = reader.int32();
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
                var error = $root.Protos.MsgOpts.verify(message.opts);
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
            if (message.channel != null && message.hasOwnProperty("channel"))
                switch (message.channel) {
                default:
                    return "channel: enum value expected";
                case 0:
                case 1:
                    break;
                }
            if (message.browser != null && message.hasOwnProperty("browser"))
                switch (message.browser) {
                default:
                    return "browser: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                    break;
                }
            if (message.platform != null && message.hasOwnProperty("platform"))
                switch (message.platform) {
                default:
                    return "platform: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                    break;
                }
            if (message.unionID != null && message.hasOwnProperty("unionID"))
                if (!$util.isString(message.unionID))
                    return "unionID: string expected";
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                if (!$util.isString(message.nickname))
                    return "nickname: string expected";
            if (message.avatar != null && message.hasOwnProperty("avatar"))
                if (!$util.isString(message.avatar))
                    return "avatar: string expected";
            if (message.gender != null && message.hasOwnProperty("gender"))
                if (!$util.isInteger(message.gender))
                    return "gender: integer expected";
            return null;
        };

        LS2DB_QueryLogin.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.LS2DB_QueryLogin)
                return object;
            var message = new $root.Protos.LS2DB_QueryLogin();
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
            switch (object.channel) {
            case "Web":
            case 0:
                message.channel = 0;
                break;
            case "WXMini":
            case 1:
                message.channel = 1;
                break;
            }
            switch (object.browser) {
            case "Chrome":
            case 0:
                message.browser = 0;
                break;
            case "Firefox":
            case 1:
                message.browser = 1;
                break;
            case "Safair":
            case 2:
                message.browser = 2;
                break;
            case "Edge":
            case 3:
                message.browser = 3;
                break;
            case "IE":
            case 4:
                message.browser = 4;
                break;
            }
            switch (object.platform) {
            case "PC":
            case 0:
                message.platform = 0;
                break;
            case "Android":
            case 1:
                message.platform = 1;
                break;
            case "IOS":
            case 2:
                message.platform = 2;
                break;
            case "WP":
            case 3:
                message.platform = 3;
                break;
            }
            if (object.unionID != null)
                message.unionID = String(object.unionID);
            if (object.nickname != null)
                message.nickname = String(object.nickname);
            if (object.avatar != null)
                message.avatar = String(object.avatar);
            if (object.gender != null)
                message.gender = object.gender | 0;
            return message;
        };

        LS2DB_QueryLogin.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.opts = null;
                object.name = "";
                object.pwd = "";
                object.vertPwd = false;
                object.ip = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.time = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.time = options.longs === String ? "0" : 0;
                object.channel = options.enums === String ? "Web" : 0;
                object.browser = options.enums === String ? "Chrome" : 0;
                object.platform = options.enums === String ? "PC" : 0;
                object.unionID = "";
                object.nickname = "";
                object.avatar = "";
                object.gender = 0;
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
            if (message.channel != null && message.hasOwnProperty("channel"))
                object.channel = options.enums === String ? $root.Protos.Global.Channel[message.channel] : message.channel;
            if (message.browser != null && message.hasOwnProperty("browser"))
                object.browser = options.enums === String ? $root.Protos.Global.Browser[message.browser] : message.browser;
            if (message.platform != null && message.hasOwnProperty("platform"))
                object.platform = options.enums === String ? $root.Protos.Global.Platform[message.platform] : message.platform;
            if (message.unionID != null && message.hasOwnProperty("unionID"))
                object.unionID = message.unionID;
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                object.nickname = message.nickname;
            if (message.avatar != null && message.hasOwnProperty("avatar"))
                object.avatar = message.avatar;
            if (message.gender != null && message.hasOwnProperty("gender"))
                object.gender = message.gender;
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
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
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
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.LS2DB_Exec();
            while (reader.pos < end) {
                var tag = reader.uint32();
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
                var error = $root.Protos.MsgOpts.verify(message.opts);
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
            var message = new $root.Protos.LS2DB_Exec();
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
            var object = {};
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
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
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
                for (var i = 0; i < message.gsInfos.length; ++i)
                    $root.Protos.GSInfo.encode(message.gsInfos[i], writer.uint32(18).fork()).ldelim();
            return writer;
        };

        LS2GC_GSInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        LS2GC_GSInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.LS2GC_GSInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
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
                var error = $root.Protos.MsgOpts.verify(message.opts);
                if (error)
                    return "opts." + error;
            }
            if (message.gsInfos != null && message.hasOwnProperty("gsInfos")) {
                if (!Array.isArray(message.gsInfos))
                    return "gsInfos: array expected";
                for (var i = 0; i < message.gsInfos.length; ++i) {
                    var error = $root.Protos.GSInfo.verify(message.gsInfos[i]);
                    if (error)
                        return "gsInfos." + error;
                }
            }
            return null;
        };

        LS2GC_GSInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.LS2GC_GSInfo)
                return object;
            var message = new $root.Protos.LS2GC_GSInfo();
            if (object.opts != null) {
                if (typeof object.opts !== "object")
                    throw TypeError(".Protos.LS2GC_GSInfo.opts: object expected");
                message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
            }
            if (object.gsInfos) {
                if (!Array.isArray(object.gsInfos))
                    throw TypeError(".Protos.LS2GC_GSInfo.gsInfos: array expected");
                message.gsInfos = [];
                for (var i = 0; i < object.gsInfos.length; ++i) {
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
            var object = {};
            if (options.arrays || options.defaults)
                object.gsInfos = [];
            if (options.defaults)
                object.opts = null;
            if (message.opts != null && message.hasOwnProperty("opts"))
                object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
            if (message.gsInfos && message.gsInfos.length) {
                object.gsInfos = [];
                for (var j = 0; j < message.gsInfos.length; ++j)
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
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
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
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.LS2GC_AskRegRet();
            while (reader.pos < end) {
                var tag = reader.uint32();
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
                var error = $root.Protos.MsgOpts.verify(message.opts);
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
            var message = new $root.Protos.LS2GC_AskRegRet();
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
            var object = {};
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
            var valuesById = {}, values = Object.create(valuesById);
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
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
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
                for (var i = 0; i < message.gsInfos.length; ++i)
                    $root.Protos.GSInfo.encode(message.gsInfos[i], writer.uint32(34).fork()).ldelim();
            return writer;
        };

        LS2GC_AskLoginRet.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        LS2GC_AskLoginRet.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.LS2GC_AskLoginRet();
            while (reader.pos < end) {
                var tag = reader.uint32();
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
                var error = $root.Protos.MsgOpts.verify(message.opts);
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
            if (message.sessionID != null && message.hasOwnProperty("sessionID"))
                if (!$util.isInteger(message.sessionID) && !(message.sessionID && $util.isInteger(message.sessionID.low) && $util.isInteger(message.sessionID.high)))
                    return "sessionID: integer|Long expected";
            if (message.gsInfos != null && message.hasOwnProperty("gsInfos")) {
                if (!Array.isArray(message.gsInfos))
                    return "gsInfos: array expected";
                for (var i = 0; i < message.gsInfos.length; ++i) {
                    var error = $root.Protos.GSInfo.verify(message.gsInfos[i]);
                    if (error)
                        return "gsInfos." + error;
                }
            }
            return null;
        };

        LS2GC_AskLoginRet.fromObject = function fromObject(object) {
            if (object instanceof $root.Protos.LS2GC_AskLoginRet)
                return object;
            var message = new $root.Protos.LS2GC_AskLoginRet();
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
            case 2:
                message.result = 2;
                break;
            case "Busy":
            case 3:
                message.result = 3;
                break;
            case "InvalidCode":
            case 4:
                message.result = 4;
                break;
            case "Frequent":
            case 5:
                message.result = 5;
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
                for (var i = 0; i < object.gsInfos.length; ++i) {
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
            var object = {};
            if (options.arrays || options.defaults)
                object.gsInfos = [];
            if (options.defaults) {
                object.opts = null;
                object.result = options.enums === String ? "Success" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
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
                for (var j = 0; j < message.gsInfos.length; ++j)
                    object.gsInfos[j] = $root.Protos.GSInfo.toObject(message.gsInfos[j], options);
            }
            return object;
        };

        LS2GC_AskLoginRet.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        LS2GC_AskLoginRet.EResult = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "Success"] = 0;
            values[valuesById[1] = "Failed"] = 1;
            values[valuesById[2] = "InvalidUname"] = 2;
            values[valuesById[3] = "Busy"] = 3;
            values[valuesById[4] = "InvalidCode"] = 4;
            values[valuesById[5] = "Frequent"] = 5;
            return values;
        })();

        return LS2GC_AskLoginRet;
    })();

    return Protos;
})();

module.exports = $root;
