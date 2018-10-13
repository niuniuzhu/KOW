/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
define(["libs/protobufjs"], function($protobuf) {
    "use strict";

    // Common aliases
    var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;
    
    // Exported root namespace
    var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
    
    $root.Protos = (function() {
    
        /**
         * Namespace Protos.
         * @exports Protos
         * @namespace
         */
        var Protos = {};
    
        Protos.BSInfo = (function() {
    
            /**
             * Properties of a BSInfo.
             * @memberof Protos
             * @interface IBSInfo
             * @property {number|null} [id] BSInfo id
             * @property {string|null} [ip] BSInfo ip
             * @property {number|null} [port] BSInfo port
             * @property {Protos.BSInfo.State|null} [state] BSInfo state
             */
    
            /**
             * Constructs a new BSInfo.
             * @memberof Protos
             * @classdesc Represents a BSInfo.
             * @implements IBSInfo
             * @constructor
             * @param {Protos.IBSInfo=} [properties] Properties to set
             */
            function BSInfo(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * BSInfo id.
             * @member {number} id
             * @memberof Protos.BSInfo
             * @instance
             */
            BSInfo.prototype.id = 0;
    
            /**
             * BSInfo ip.
             * @member {string} ip
             * @memberof Protos.BSInfo
             * @instance
             */
            BSInfo.prototype.ip = "";
    
            /**
             * BSInfo port.
             * @member {number} port
             * @memberof Protos.BSInfo
             * @instance
             */
            BSInfo.prototype.port = 0;
    
            /**
             * BSInfo state.
             * @member {Protos.BSInfo.State} state
             * @memberof Protos.BSInfo
             * @instance
             */
            BSInfo.prototype.state = 0;
    
            /**
             * Creates a new BSInfo instance using the specified properties.
             * @function create
             * @memberof Protos.BSInfo
             * @static
             * @param {Protos.IBSInfo=} [properties] Properties to set
             * @returns {Protos.BSInfo} BSInfo instance
             */
            BSInfo.create = function create(properties) {
                return new BSInfo(properties);
            };
    
            /**
             * Encodes the specified BSInfo message. Does not implicitly {@link Protos.BSInfo.verify|verify} messages.
             * @function encode
             * @memberof Protos.BSInfo
             * @static
             * @param {Protos.IBSInfo} message BSInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            BSInfo.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.id != null && message.hasOwnProperty("id"))
                    writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.id);
                if (message.ip != null && message.hasOwnProperty("ip"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.ip);
                if (message.port != null && message.hasOwnProperty("port"))
                    writer.uint32(/* id 4, wireType 0 =*/32).int32(message.port);
                if (message.state != null && message.hasOwnProperty("state"))
                    writer.uint32(/* id 6, wireType 0 =*/48).int32(message.state);
                return writer;
            };
    
            /**
             * Encodes the specified BSInfo message, length delimited. Does not implicitly {@link Protos.BSInfo.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Protos.BSInfo
             * @static
             * @param {Protos.IBSInfo} message BSInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            BSInfo.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a BSInfo message from the specified reader or buffer.
             * @function decode
             * @memberof Protos.BSInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Protos.BSInfo} BSInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
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
    
            /**
             * Decodes a BSInfo message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Protos.BSInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Protos.BSInfo} BSInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            BSInfo.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a BSInfo message.
             * @function verify
             * @memberof Protos.BSInfo
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
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
    
            /**
             * Creates a BSInfo message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Protos.BSInfo
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Protos.BSInfo} BSInfo
             */
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
    
            /**
             * Creates a plain object from a BSInfo message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Protos.BSInfo
             * @static
             * @param {Protos.BSInfo} message BSInfo
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
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
    
            /**
             * Converts this BSInfo to JSON.
             * @function toJSON
             * @memberof Protos.BSInfo
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            BSInfo.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * State enum.
             * @name Protos.BSInfo.State
             * @enum {string}
             * @property {number} Free=0 Free value
             * @property {number} Busy=1 Busy value
             * @property {number} Full=2 Full value
             * @property {number} Close=3 Close value
             */
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
    
            /**
             * Properties of a BS2CS_ReportState.
             * @memberof Protos
             * @interface IBS2CS_ReportState
             * @property {Protos.IMsgOpts|null} [opts] BS2CS_ReportState opts
             * @property {Protos.IBSInfo|null} [bsInfo] BS2CS_ReportState bsInfo
             */
    
            /**
             * Constructs a new BS2CS_ReportState.
             * @memberof Protos
             * @classdesc Represents a BS2CS_ReportState.
             * @implements IBS2CS_ReportState
             * @constructor
             * @param {Protos.IBS2CS_ReportState=} [properties] Properties to set
             */
            function BS2CS_ReportState(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * BS2CS_ReportState opts.
             * @member {Protos.IMsgOpts|null|undefined} opts
             * @memberof Protos.BS2CS_ReportState
             * @instance
             */
            BS2CS_ReportState.prototype.opts = null;
    
            /**
             * BS2CS_ReportState bsInfo.
             * @member {Protos.IBSInfo|null|undefined} bsInfo
             * @memberof Protos.BS2CS_ReportState
             * @instance
             */
            BS2CS_ReportState.prototype.bsInfo = null;
    
            /**
             * Creates a new BS2CS_ReportState instance using the specified properties.
             * @function create
             * @memberof Protos.BS2CS_ReportState
             * @static
             * @param {Protos.IBS2CS_ReportState=} [properties] Properties to set
             * @returns {Protos.BS2CS_ReportState} BS2CS_ReportState instance
             */
            BS2CS_ReportState.create = function create(properties) {
                return new BS2CS_ReportState(properties);
            };
    
            /**
             * Encodes the specified BS2CS_ReportState message. Does not implicitly {@link Protos.BS2CS_ReportState.verify|verify} messages.
             * @function encode
             * @memberof Protos.BS2CS_ReportState
             * @static
             * @param {Protos.IBS2CS_ReportState} message BS2CS_ReportState message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            BS2CS_ReportState.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.opts != null && message.hasOwnProperty("opts"))
                    $root.Protos.MsgOpts.encode(message.opts, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.bsInfo != null && message.hasOwnProperty("bsInfo"))
                    $root.Protos.BSInfo.encode(message.bsInfo, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified BS2CS_ReportState message, length delimited. Does not implicitly {@link Protos.BS2CS_ReportState.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Protos.BS2CS_ReportState
             * @static
             * @param {Protos.IBS2CS_ReportState} message BS2CS_ReportState message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            BS2CS_ReportState.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a BS2CS_ReportState message from the specified reader or buffer.
             * @function decode
             * @memberof Protos.BS2CS_ReportState
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Protos.BS2CS_ReportState} BS2CS_ReportState
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
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
    
            /**
             * Decodes a BS2CS_ReportState message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Protos.BS2CS_ReportState
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Protos.BS2CS_ReportState} BS2CS_ReportState
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            BS2CS_ReportState.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a BS2CS_ReportState message.
             * @function verify
             * @memberof Protos.BS2CS_ReportState
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
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
    
            /**
             * Creates a BS2CS_ReportState message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Protos.BS2CS_ReportState
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Protos.BS2CS_ReportState} BS2CS_ReportState
             */
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
    
            /**
             * Creates a plain object from a BS2CS_ReportState message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Protos.BS2CS_ReportState
             * @static
             * @param {Protos.BS2CS_ReportState} message BS2CS_ReportState
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
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
    
            /**
             * Converts this BS2CS_ReportState to JSON.
             * @function toJSON
             * @memberof Protos.BS2CS_ReportState
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            BS2CS_ReportState.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return BS2CS_ReportState;
        })();
    
        Protos.BS2CS_GCAskLogin = (function() {
    
            /**
             * Properties of a BS2CS_GCAskLogin.
             * @memberof Protos
             * @interface IBS2CS_GCAskLogin
             * @property {Protos.IMsgOpts|null} [opts] BS2CS_GCAskLogin opts
             * @property {Long|null} [sessionID] BS2CS_GCAskLogin sessionID
             */
    
            /**
             * Constructs a new BS2CS_GCAskLogin.
             * @memberof Protos
             * @classdesc Represents a BS2CS_GCAskLogin.
             * @implements IBS2CS_GCAskLogin
             * @constructor
             * @param {Protos.IBS2CS_GCAskLogin=} [properties] Properties to set
             */
            function BS2CS_GCAskLogin(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * BS2CS_GCAskLogin opts.
             * @member {Protos.IMsgOpts|null|undefined} opts
             * @memberof Protos.BS2CS_GCAskLogin
             * @instance
             */
            BS2CS_GCAskLogin.prototype.opts = null;
    
            /**
             * BS2CS_GCAskLogin sessionID.
             * @member {Long} sessionID
             * @memberof Protos.BS2CS_GCAskLogin
             * @instance
             */
            BS2CS_GCAskLogin.prototype.sessionID = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
    
            /**
             * Creates a new BS2CS_GCAskLogin instance using the specified properties.
             * @function create
             * @memberof Protos.BS2CS_GCAskLogin
             * @static
             * @param {Protos.IBS2CS_GCAskLogin=} [properties] Properties to set
             * @returns {Protos.BS2CS_GCAskLogin} BS2CS_GCAskLogin instance
             */
            BS2CS_GCAskLogin.create = function create(properties) {
                return new BS2CS_GCAskLogin(properties);
            };
    
            /**
             * Encodes the specified BS2CS_GCAskLogin message. Does not implicitly {@link Protos.BS2CS_GCAskLogin.verify|verify} messages.
             * @function encode
             * @memberof Protos.BS2CS_GCAskLogin
             * @static
             * @param {Protos.IBS2CS_GCAskLogin} message BS2CS_GCAskLogin message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            BS2CS_GCAskLogin.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.opts != null && message.hasOwnProperty("opts"))
                    $root.Protos.MsgOpts.encode(message.opts, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.sessionID != null && message.hasOwnProperty("sessionID"))
                    writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.sessionID);
                return writer;
            };
    
            /**
             * Encodes the specified BS2CS_GCAskLogin message, length delimited. Does not implicitly {@link Protos.BS2CS_GCAskLogin.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Protos.BS2CS_GCAskLogin
             * @static
             * @param {Protos.IBS2CS_GCAskLogin} message BS2CS_GCAskLogin message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            BS2CS_GCAskLogin.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a BS2CS_GCAskLogin message from the specified reader or buffer.
             * @function decode
             * @memberof Protos.BS2CS_GCAskLogin
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Protos.BS2CS_GCAskLogin} BS2CS_GCAskLogin
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            BS2CS_GCAskLogin.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.BS2CS_GCAskLogin();
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
    
            /**
             * Decodes a BS2CS_GCAskLogin message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Protos.BS2CS_GCAskLogin
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Protos.BS2CS_GCAskLogin} BS2CS_GCAskLogin
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            BS2CS_GCAskLogin.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a BS2CS_GCAskLogin message.
             * @function verify
             * @memberof Protos.BS2CS_GCAskLogin
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            BS2CS_GCAskLogin.verify = function verify(message) {
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
    
            /**
             * Creates a BS2CS_GCAskLogin message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Protos.BS2CS_GCAskLogin
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Protos.BS2CS_GCAskLogin} BS2CS_GCAskLogin
             */
            BS2CS_GCAskLogin.fromObject = function fromObject(object) {
                if (object instanceof $root.Protos.BS2CS_GCAskLogin)
                    return object;
                var message = new $root.Protos.BS2CS_GCAskLogin();
                if (object.opts != null) {
                    if (typeof object.opts !== "object")
                        throw TypeError(".Protos.BS2CS_GCAskLogin.opts: object expected");
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
    
            /**
             * Creates a plain object from a BS2CS_GCAskLogin message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Protos.BS2CS_GCAskLogin
             * @static
             * @param {Protos.BS2CS_GCAskLogin} message BS2CS_GCAskLogin
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            BS2CS_GCAskLogin.toObject = function toObject(message, options) {
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
    
            /**
             * Converts this BS2CS_GCAskLogin to JSON.
             * @function toJSON
             * @memberof Protos.BS2CS_GCAskLogin
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            BS2CS_GCAskLogin.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return BS2CS_GCAskLogin;
        })();
    
        Protos.BS2CS_GCLost = (function() {
    
            /**
             * Properties of a BS2CS_GCLost.
             * @memberof Protos
             * @interface IBS2CS_GCLost
             * @property {Protos.IMsgOpts|null} [opts] BS2CS_GCLost opts
             * @property {Long|null} [sessionID] BS2CS_GCLost sessionID
             */
    
            /**
             * Constructs a new BS2CS_GCLost.
             * @memberof Protos
             * @classdesc Represents a BS2CS_GCLost.
             * @implements IBS2CS_GCLost
             * @constructor
             * @param {Protos.IBS2CS_GCLost=} [properties] Properties to set
             */
            function BS2CS_GCLost(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * BS2CS_GCLost opts.
             * @member {Protos.IMsgOpts|null|undefined} opts
             * @memberof Protos.BS2CS_GCLost
             * @instance
             */
            BS2CS_GCLost.prototype.opts = null;
    
            /**
             * BS2CS_GCLost sessionID.
             * @member {Long} sessionID
             * @memberof Protos.BS2CS_GCLost
             * @instance
             */
            BS2CS_GCLost.prototype.sessionID = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
    
            /**
             * Creates a new BS2CS_GCLost instance using the specified properties.
             * @function create
             * @memberof Protos.BS2CS_GCLost
             * @static
             * @param {Protos.IBS2CS_GCLost=} [properties] Properties to set
             * @returns {Protos.BS2CS_GCLost} BS2CS_GCLost instance
             */
            BS2CS_GCLost.create = function create(properties) {
                return new BS2CS_GCLost(properties);
            };
    
            /**
             * Encodes the specified BS2CS_GCLost message. Does not implicitly {@link Protos.BS2CS_GCLost.verify|verify} messages.
             * @function encode
             * @memberof Protos.BS2CS_GCLost
             * @static
             * @param {Protos.IBS2CS_GCLost} message BS2CS_GCLost message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            BS2CS_GCLost.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.opts != null && message.hasOwnProperty("opts"))
                    $root.Protos.MsgOpts.encode(message.opts, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.sessionID != null && message.hasOwnProperty("sessionID"))
                    writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.sessionID);
                return writer;
            };
    
            /**
             * Encodes the specified BS2CS_GCLost message, length delimited. Does not implicitly {@link Protos.BS2CS_GCLost.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Protos.BS2CS_GCLost
             * @static
             * @param {Protos.IBS2CS_GCLost} message BS2CS_GCLost message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            BS2CS_GCLost.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a BS2CS_GCLost message from the specified reader or buffer.
             * @function decode
             * @memberof Protos.BS2CS_GCLost
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Protos.BS2CS_GCLost} BS2CS_GCLost
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            BS2CS_GCLost.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.BS2CS_GCLost();
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
    
            /**
             * Decodes a BS2CS_GCLost message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Protos.BS2CS_GCLost
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Protos.BS2CS_GCLost} BS2CS_GCLost
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            BS2CS_GCLost.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a BS2CS_GCLost message.
             * @function verify
             * @memberof Protos.BS2CS_GCLost
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            BS2CS_GCLost.verify = function verify(message) {
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
    
            /**
             * Creates a BS2CS_GCLost message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Protos.BS2CS_GCLost
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Protos.BS2CS_GCLost} BS2CS_GCLost
             */
            BS2CS_GCLost.fromObject = function fromObject(object) {
                if (object instanceof $root.Protos.BS2CS_GCLost)
                    return object;
                var message = new $root.Protos.BS2CS_GCLost();
                if (object.opts != null) {
                    if (typeof object.opts !== "object")
                        throw TypeError(".Protos.BS2CS_GCLost.opts: object expected");
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
    
            /**
             * Creates a plain object from a BS2CS_GCLost message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Protos.BS2CS_GCLost
             * @static
             * @param {Protos.BS2CS_GCLost} message BS2CS_GCLost
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            BS2CS_GCLost.toObject = function toObject(message, options) {
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
    
            /**
             * Converts this BS2CS_GCLost to JSON.
             * @function toJSON
             * @memberof Protos.BS2CS_GCLost
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            BS2CS_GCLost.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return BS2CS_GCLost;
        })();
    
        Protos.BS2CS_RommInfoRet = (function() {
    
            /**
             * Properties of a BS2CS_RommInfoRet.
             * @memberof Protos
             * @interface IBS2CS_RommInfoRet
             * @property {Protos.IMsgOpts|null} [opts] BS2CS_RommInfoRet opts
             */
    
            /**
             * Constructs a new BS2CS_RommInfoRet.
             * @memberof Protos
             * @classdesc Represents a BS2CS_RommInfoRet.
             * @implements IBS2CS_RommInfoRet
             * @constructor
             * @param {Protos.IBS2CS_RommInfoRet=} [properties] Properties to set
             */
            function BS2CS_RommInfoRet(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * BS2CS_RommInfoRet opts.
             * @member {Protos.IMsgOpts|null|undefined} opts
             * @memberof Protos.BS2CS_RommInfoRet
             * @instance
             */
            BS2CS_RommInfoRet.prototype.opts = null;
    
            /**
             * Creates a new BS2CS_RommInfoRet instance using the specified properties.
             * @function create
             * @memberof Protos.BS2CS_RommInfoRet
             * @static
             * @param {Protos.IBS2CS_RommInfoRet=} [properties] Properties to set
             * @returns {Protos.BS2CS_RommInfoRet} BS2CS_RommInfoRet instance
             */
            BS2CS_RommInfoRet.create = function create(properties) {
                return new BS2CS_RommInfoRet(properties);
            };
    
            /**
             * Encodes the specified BS2CS_RommInfoRet message. Does not implicitly {@link Protos.BS2CS_RommInfoRet.verify|verify} messages.
             * @function encode
             * @memberof Protos.BS2CS_RommInfoRet
             * @static
             * @param {Protos.IBS2CS_RommInfoRet} message BS2CS_RommInfoRet message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            BS2CS_RommInfoRet.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.opts != null && message.hasOwnProperty("opts"))
                    $root.Protos.MsgOpts.encode(message.opts, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified BS2CS_RommInfoRet message, length delimited. Does not implicitly {@link Protos.BS2CS_RommInfoRet.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Protos.BS2CS_RommInfoRet
             * @static
             * @param {Protos.IBS2CS_RommInfoRet} message BS2CS_RommInfoRet message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            BS2CS_RommInfoRet.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a BS2CS_RommInfoRet message from the specified reader or buffer.
             * @function decode
             * @memberof Protos.BS2CS_RommInfoRet
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Protos.BS2CS_RommInfoRet} BS2CS_RommInfoRet
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            BS2CS_RommInfoRet.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.BS2CS_RommInfoRet();
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
    
            /**
             * Decodes a BS2CS_RommInfoRet message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Protos.BS2CS_RommInfoRet
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Protos.BS2CS_RommInfoRet} BS2CS_RommInfoRet
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            BS2CS_RommInfoRet.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a BS2CS_RommInfoRet message.
             * @function verify
             * @memberof Protos.BS2CS_RommInfoRet
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            BS2CS_RommInfoRet.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.opts != null && message.hasOwnProperty("opts")) {
                    var error = $root.Protos.MsgOpts.verify(message.opts);
                    if (error)
                        return "opts." + error;
                }
                return null;
            };
    
            /**
             * Creates a BS2CS_RommInfoRet message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Protos.BS2CS_RommInfoRet
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Protos.BS2CS_RommInfoRet} BS2CS_RommInfoRet
             */
            BS2CS_RommInfoRet.fromObject = function fromObject(object) {
                if (object instanceof $root.Protos.BS2CS_RommInfoRet)
                    return object;
                var message = new $root.Protos.BS2CS_RommInfoRet();
                if (object.opts != null) {
                    if (typeof object.opts !== "object")
                        throw TypeError(".Protos.BS2CS_RommInfoRet.opts: object expected");
                    message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
                }
                return message;
            };
    
            /**
             * Creates a plain object from a BS2CS_RommInfoRet message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Protos.BS2CS_RommInfoRet
             * @static
             * @param {Protos.BS2CS_RommInfoRet} message BS2CS_RommInfoRet
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            BS2CS_RommInfoRet.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.opts = null;
                if (message.opts != null && message.hasOwnProperty("opts"))
                    object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
                return object;
            };
    
            /**
             * Converts this BS2CS_RommInfoRet to JSON.
             * @function toJSON
             * @memberof Protos.BS2CS_RommInfoRet
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            BS2CS_RommInfoRet.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return BS2CS_RommInfoRet;
        })();
    
        /**
         * MsgID enum.
         * @name Protos.MsgID
         * @enum {string}
         * @property {number} Undefine=0 Undefine value
         * @property {number} eG_AskPing=10 eG_AskPing value
         * @property {number} eG_AskPingRet=11 eG_AskPingRet value
         * @property {number} eGC2LS_AskRegister=1000 eGC2LS_AskRegister value
         * @property {number} eGC2LS_AskLogin=1001 eGC2LS_AskLogin value
         * @property {number} eGC2GS_AskLogin=1100 eGC2GS_AskLogin value
         * @property {number} eGC2GS_KeepAlive=1101 eGC2GS_KeepAlive value
         * @property {number} eGC2BS_AskLogin=1200 eGC2BS_AskLogin value
         * @property {number} eGC2BS_KeepAlive=1201 eGC2BS_KeepAlive value
         * @property {number} eGC2CS_BeginMatch=1300 eGC2CS_BeginMatch value
         * @property {number} eLS2GC_GSInfo=2000 eLS2GC_GSInfo value
         * @property {number} eLS2GC_AskRegRet=2001 eLS2GC_AskRegRet value
         * @property {number} eLS2GC_AskLoginRet=2002 eLS2GC_AskLoginRet value
         * @property {number} eLS2CS_GCLogin=2100 eLS2CS_GCLogin value
         * @property {number} eLS2DB_QueryAccount=2200 eLS2DB_QueryAccount value
         * @property {number} eLS2DB_QueryLogin=2201 eLS2DB_QueryLogin value
         * @property {number} eLS2DB_Exec=2202 eLS2DB_Exec value
         * @property {number} eGS2CS_ReportState=3000 eGS2CS_ReportState value
         * @property {number} eGS2CS_GCAskLogin=3001 eGS2CS_GCAskLogin value
         * @property {number} eGS2CS_GCLost=3002 eGS2CS_GCLost value
         * @property {number} eGS2CS_KickGCRet=3003 eGS2CS_KickGCRet value
         * @property {number} eGS2GC_LoginRet=3100 eGS2GC_LoginRet value
         * @property {number} eGS2GC_Kick=3101 eGS2GC_Kick value
         * @property {number} eBS2CS_ReportState=4000 eBS2CS_ReportState value
         * @property {number} eBS2CS_GCAskLogin=4001 eBS2CS_GCAskLogin value
         * @property {number} eBS2CS_GCLost=4002 eBS2CS_GCLost value
         * @property {number} eBS2CS_RommInfoRet=4003 eBS2CS_RommInfoRet value
         * @property {number} eBS2GC_LoginRet=4100 eBS2GC_LoginRet value
         * @property {number} eCS2LS_GSInfos=5000 eCS2LS_GSInfos value
         * @property {number} eCS2LS_GSInfo=5001 eCS2LS_GSInfo value
         * @property {number} eCS2LS_GSLost=5002 eCS2LS_GSLost value
         * @property {number} eCS2LS_GCLoginRet=5003 eCS2LS_GCLoginRet value
         * @property {number} eCS2GS_GCLoginRet=5100 eCS2GS_GCLoginRet value
         * @property {number} eCS2GS_KickGC=5101 eCS2GS_KickGC value
         * @property {number} eCS2BS_GCLoginRet=5200 eCS2BS_GCLoginRet value
         * @property {number} eCS2BS_RoomInfo=5201 eCS2BS_RoomInfo value
         * @property {number} eCS2GC_BeginMatchRet=5300 eCS2GC_BeginMatchRet value
         * @property {number} eCS2GC_BeginBattle=5301 eCS2GC_BeginBattle value
         * @property {number} eDB2LS_QueryAccountRet=8000 eDB2LS_QueryAccountRet value
         * @property {number} eDB2LS_QueryLoginRet=8001 eDB2LS_QueryLoginRet value
         * @property {number} eDB2LS_ExecRet=8002 eDB2LS_ExecRet value
         */
        Protos.MsgID = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "Undefine"] = 0;
            values[valuesById[10] = "eG_AskPing"] = 10;
            values[valuesById[11] = "eG_AskPingRet"] = 11;
            values[valuesById[1000] = "eGC2LS_AskRegister"] = 1000;
            values[valuesById[1001] = "eGC2LS_AskLogin"] = 1001;
            values[valuesById[1100] = "eGC2GS_AskLogin"] = 1100;
            values[valuesById[1101] = "eGC2GS_KeepAlive"] = 1101;
            values[valuesById[1200] = "eGC2BS_AskLogin"] = 1200;
            values[valuesById[1201] = "eGC2BS_KeepAlive"] = 1201;
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
            values[valuesById[3003] = "eGS2CS_KickGCRet"] = 3003;
            values[valuesById[3100] = "eGS2GC_LoginRet"] = 3100;
            values[valuesById[3101] = "eGS2GC_Kick"] = 3101;
            values[valuesById[4000] = "eBS2CS_ReportState"] = 4000;
            values[valuesById[4001] = "eBS2CS_GCAskLogin"] = 4001;
            values[valuesById[4002] = "eBS2CS_GCLost"] = 4002;
            values[valuesById[4003] = "eBS2CS_RommInfoRet"] = 4003;
            values[valuesById[4100] = "eBS2GC_LoginRet"] = 4100;
            values[valuesById[5000] = "eCS2LS_GSInfos"] = 5000;
            values[valuesById[5001] = "eCS2LS_GSInfo"] = 5001;
            values[valuesById[5002] = "eCS2LS_GSLost"] = 5002;
            values[valuesById[5003] = "eCS2LS_GCLoginRet"] = 5003;
            values[valuesById[5100] = "eCS2GS_GCLoginRet"] = 5100;
            values[valuesById[5101] = "eCS2GS_KickGC"] = 5101;
            values[valuesById[5200] = "eCS2BS_GCLoginRet"] = 5200;
            values[valuesById[5201] = "eCS2BS_RoomInfo"] = 5201;
            values[valuesById[5300] = "eCS2GC_BeginMatchRet"] = 5300;
            values[valuesById[5301] = "eCS2GC_BeginBattle"] = 5301;
            values[valuesById[8000] = "eDB2LS_QueryAccountRet"] = 8000;
            values[valuesById[8001] = "eDB2LS_QueryLoginRet"] = 8001;
            values[valuesById[8002] = "eDB2LS_ExecRet"] = 8002;
            return values;
        })();
    
        Protos.MsgOpts = (function() {
    
            /**
             * Properties of a MsgOpts.
             * @memberof Protos
             * @interface IMsgOpts
             * @property {number|null} [flag] MsgOpts flag
             * @property {number|null} [pid] MsgOpts pid
             * @property {number|null} [rpid] MsgOpts rpid
             * @property {Long|null} [transid] MsgOpts transid
             */
    
            /**
             * Constructs a new MsgOpts.
             * @memberof Protos
             * @classdesc Represents a MsgOpts.
             * @implements IMsgOpts
             * @constructor
             * @param {Protos.IMsgOpts=} [properties] Properties to set
             */
            function MsgOpts(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * MsgOpts flag.
             * @member {number} flag
             * @memberof Protos.MsgOpts
             * @instance
             */
            MsgOpts.prototype.flag = 0;
    
            /**
             * MsgOpts pid.
             * @member {number} pid
             * @memberof Protos.MsgOpts
             * @instance
             */
            MsgOpts.prototype.pid = 0;
    
            /**
             * MsgOpts rpid.
             * @member {number} rpid
             * @memberof Protos.MsgOpts
             * @instance
             */
            MsgOpts.prototype.rpid = 0;
    
            /**
             * MsgOpts transid.
             * @member {Long} transid
             * @memberof Protos.MsgOpts
             * @instance
             */
            MsgOpts.prototype.transid = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
    
            /**
             * Creates a new MsgOpts instance using the specified properties.
             * @function create
             * @memberof Protos.MsgOpts
             * @static
             * @param {Protos.IMsgOpts=} [properties] Properties to set
             * @returns {Protos.MsgOpts} MsgOpts instance
             */
            MsgOpts.create = function create(properties) {
                return new MsgOpts(properties);
            };
    
            /**
             * Encodes the specified MsgOpts message. Does not implicitly {@link Protos.MsgOpts.verify|verify} messages.
             * @function encode
             * @memberof Protos.MsgOpts
             * @static
             * @param {Protos.IMsgOpts} message MsgOpts message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MsgOpts.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.flag != null && message.hasOwnProperty("flag"))
                    writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.flag);
                if (message.pid != null && message.hasOwnProperty("pid"))
                    writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.pid);
                if (message.rpid != null && message.hasOwnProperty("rpid"))
                    writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.rpid);
                if (message.transid != null && message.hasOwnProperty("transid"))
                    writer.uint32(/* id 4, wireType 0 =*/32).uint64(message.transid);
                return writer;
            };
    
            /**
             * Encodes the specified MsgOpts message, length delimited. Does not implicitly {@link Protos.MsgOpts.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Protos.MsgOpts
             * @static
             * @param {Protos.IMsgOpts} message MsgOpts message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MsgOpts.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a MsgOpts message from the specified reader or buffer.
             * @function decode
             * @memberof Protos.MsgOpts
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Protos.MsgOpts} MsgOpts
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
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
    
            /**
             * Decodes a MsgOpts message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Protos.MsgOpts
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Protos.MsgOpts} MsgOpts
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            MsgOpts.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a MsgOpts message.
             * @function verify
             * @memberof Protos.MsgOpts
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
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
    
            /**
             * Creates a MsgOpts message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Protos.MsgOpts
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Protos.MsgOpts} MsgOpts
             */
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
    
            /**
             * Creates a plain object from a MsgOpts message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Protos.MsgOpts
             * @static
             * @param {Protos.MsgOpts} message MsgOpts
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
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
    
            /**
             * Converts this MsgOpts to JSON.
             * @function toJSON
             * @memberof Protos.MsgOpts
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            MsgOpts.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Flag enum.
             * @name Protos.MsgOpts.Flag
             * @enum {string}
             * @property {number} Norm=0 Norm value
             * @property {number} RPC=1 RPC value
             * @property {number} RESP=2 RESP value
             * @property {number} TRANS=3 TRANS value
             */
            MsgOpts.Flag = (function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "Norm"] = 0;
                values[valuesById[1] = "RPC"] = 1;
                values[valuesById[2] = "RESP"] = 2;
                values[valuesById[3] = "TRANS"] = 3;
                return values;
            })();
    
            /**
             * TransTarget enum.
             * @name Protos.MsgOpts.TransTarget
             * @enum {string}
             * @property {number} Undefine=0 Undefine value
             * @property {number} GC=1 GC value
             * @property {number} CS=2 CS value
             * @property {number} BS=3 BS value
             * @property {number} LS=4 LS value
             * @property {number} DB=5 DB value
             * @property {number} GS=6 GS value
             */
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
    
            /**
             * Properties of a G_AskPing.
             * @memberof Protos
             * @interface IG_AskPing
             * @property {Protos.IMsgOpts|null} [opts] G_AskPing opts
             * @property {Long|null} [time] G_AskPing time
             */
    
            /**
             * Constructs a new G_AskPing.
             * @memberof Protos
             * @classdesc Represents a G_AskPing.
             * @implements IG_AskPing
             * @constructor
             * @param {Protos.IG_AskPing=} [properties] Properties to set
             */
            function G_AskPing(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * G_AskPing opts.
             * @member {Protos.IMsgOpts|null|undefined} opts
             * @memberof Protos.G_AskPing
             * @instance
             */
            G_AskPing.prototype.opts = null;
    
            /**
             * G_AskPing time.
             * @member {Long} time
             * @memberof Protos.G_AskPing
             * @instance
             */
            G_AskPing.prototype.time = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
            /**
             * Creates a new G_AskPing instance using the specified properties.
             * @function create
             * @memberof Protos.G_AskPing
             * @static
             * @param {Protos.IG_AskPing=} [properties] Properties to set
             * @returns {Protos.G_AskPing} G_AskPing instance
             */
            G_AskPing.create = function create(properties) {
                return new G_AskPing(properties);
            };
    
            /**
             * Encodes the specified G_AskPing message. Does not implicitly {@link Protos.G_AskPing.verify|verify} messages.
             * @function encode
             * @memberof Protos.G_AskPing
             * @static
             * @param {Protos.IG_AskPing} message G_AskPing message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            G_AskPing.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.opts != null && message.hasOwnProperty("opts"))
                    $root.Protos.MsgOpts.encode(message.opts, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.time != null && message.hasOwnProperty("time"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int64(message.time);
                return writer;
            };
    
            /**
             * Encodes the specified G_AskPing message, length delimited. Does not implicitly {@link Protos.G_AskPing.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Protos.G_AskPing
             * @static
             * @param {Protos.IG_AskPing} message G_AskPing message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            G_AskPing.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a G_AskPing message from the specified reader or buffer.
             * @function decode
             * @memberof Protos.G_AskPing
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Protos.G_AskPing} G_AskPing
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
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
    
            /**
             * Decodes a G_AskPing message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Protos.G_AskPing
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Protos.G_AskPing} G_AskPing
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            G_AskPing.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a G_AskPing message.
             * @function verify
             * @memberof Protos.G_AskPing
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
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
    
            /**
             * Creates a G_AskPing message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Protos.G_AskPing
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Protos.G_AskPing} G_AskPing
             */
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
    
            /**
             * Creates a plain object from a G_AskPing message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Protos.G_AskPing
             * @static
             * @param {Protos.G_AskPing} message G_AskPing
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
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
    
            /**
             * Converts this G_AskPing to JSON.
             * @function toJSON
             * @memberof Protos.G_AskPing
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            G_AskPing.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return G_AskPing;
        })();
    
        Protos.G_AskPingRet = (function() {
    
            /**
             * Properties of a G_AskPingRet.
             * @memberof Protos
             * @interface IG_AskPingRet
             * @property {Protos.IMsgOpts|null} [opts] G_AskPingRet opts
             * @property {Long|null} [stime] G_AskPingRet stime
             * @property {Long|null} [time] G_AskPingRet time
             */
    
            /**
             * Constructs a new G_AskPingRet.
             * @memberof Protos
             * @classdesc Represents a G_AskPingRet.
             * @implements IG_AskPingRet
             * @constructor
             * @param {Protos.IG_AskPingRet=} [properties] Properties to set
             */
            function G_AskPingRet(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * G_AskPingRet opts.
             * @member {Protos.IMsgOpts|null|undefined} opts
             * @memberof Protos.G_AskPingRet
             * @instance
             */
            G_AskPingRet.prototype.opts = null;
    
            /**
             * G_AskPingRet stime.
             * @member {Long} stime
             * @memberof Protos.G_AskPingRet
             * @instance
             */
            G_AskPingRet.prototype.stime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
            /**
             * G_AskPingRet time.
             * @member {Long} time
             * @memberof Protos.G_AskPingRet
             * @instance
             */
            G_AskPingRet.prototype.time = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
            /**
             * Creates a new G_AskPingRet instance using the specified properties.
             * @function create
             * @memberof Protos.G_AskPingRet
             * @static
             * @param {Protos.IG_AskPingRet=} [properties] Properties to set
             * @returns {Protos.G_AskPingRet} G_AskPingRet instance
             */
            G_AskPingRet.create = function create(properties) {
                return new G_AskPingRet(properties);
            };
    
            /**
             * Encodes the specified G_AskPingRet message. Does not implicitly {@link Protos.G_AskPingRet.verify|verify} messages.
             * @function encode
             * @memberof Protos.G_AskPingRet
             * @static
             * @param {Protos.IG_AskPingRet} message G_AskPingRet message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            G_AskPingRet.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.opts != null && message.hasOwnProperty("opts"))
                    $root.Protos.MsgOpts.encode(message.opts, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.stime != null && message.hasOwnProperty("stime"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int64(message.stime);
                if (message.time != null && message.hasOwnProperty("time"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int64(message.time);
                return writer;
            };
    
            /**
             * Encodes the specified G_AskPingRet message, length delimited. Does not implicitly {@link Protos.G_AskPingRet.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Protos.G_AskPingRet
             * @static
             * @param {Protos.IG_AskPingRet} message G_AskPingRet message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            G_AskPingRet.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a G_AskPingRet message from the specified reader or buffer.
             * @function decode
             * @memberof Protos.G_AskPingRet
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Protos.G_AskPingRet} G_AskPingRet
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
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
    
            /**
             * Decodes a G_AskPingRet message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Protos.G_AskPingRet
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Protos.G_AskPingRet} G_AskPingRet
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            G_AskPingRet.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a G_AskPingRet message.
             * @function verify
             * @memberof Protos.G_AskPingRet
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
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
    
            /**
             * Creates a G_AskPingRet message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Protos.G_AskPingRet
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Protos.G_AskPingRet} G_AskPingRet
             */
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
    
            /**
             * Creates a plain object from a G_AskPingRet message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Protos.G_AskPingRet
             * @static
             * @param {Protos.G_AskPingRet} message G_AskPingRet
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
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
    
            /**
             * Converts this G_AskPingRet to JSON.
             * @function toJSON
             * @memberof Protos.G_AskPingRet
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            G_AskPingRet.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return G_AskPingRet;
        })();
    
        Protos.Global = (function() {
    
            /**
             * Properties of a Global.
             * @memberof Protos
             * @interface IGlobal
             */
    
            /**
             * Constructs a new Global.
             * @memberof Protos
             * @classdesc Represents a Global.
             * @implements IGlobal
             * @constructor
             * @param {Protos.IGlobal=} [properties] Properties to set
             */
            function Global(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Creates a new Global instance using the specified properties.
             * @function create
             * @memberof Protos.Global
             * @static
             * @param {Protos.IGlobal=} [properties] Properties to set
             * @returns {Protos.Global} Global instance
             */
            Global.create = function create(properties) {
                return new Global(properties);
            };
    
            /**
             * Encodes the specified Global message. Does not implicitly {@link Protos.Global.verify|verify} messages.
             * @function encode
             * @memberof Protos.Global
             * @static
             * @param {Protos.IGlobal} message Global message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Global.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };
    
            /**
             * Encodes the specified Global message, length delimited. Does not implicitly {@link Protos.Global.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Protos.Global
             * @static
             * @param {Protos.IGlobal} message Global message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Global.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a Global message from the specified reader or buffer.
             * @function decode
             * @memberof Protos.Global
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Protos.Global} Global
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
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
    
            /**
             * Decodes a Global message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Protos.Global
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Protos.Global} Global
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Global.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a Global message.
             * @function verify
             * @memberof Protos.Global
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Global.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };
    
            /**
             * Creates a Global message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Protos.Global
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Protos.Global} Global
             */
            Global.fromObject = function fromObject(object) {
                if (object instanceof $root.Protos.Global)
                    return object;
                return new $root.Protos.Global();
            };
    
            /**
             * Creates a plain object from a Global message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Protos.Global
             * @static
             * @param {Protos.Global} message Global
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Global.toObject = function toObject() {
                return {};
            };
    
            /**
             * Converts this Global to JSON.
             * @function toJSON
             * @memberof Protos.Global
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Global.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * ECommon enum.
             * @name Protos.Global.ECommon
             * @enum {string}
             * @property {number} Success=0 Success value
             * @property {number} Failed=1 Failed value
             */
            Global.ECommon = (function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "Success"] = 0;
                values[valuesById[1] = "Failed"] = 1;
                return values;
            })();
    
            return Global;
        })();
    
        Protos.BS2GC_LoginRet = (function() {
    
            /**
             * Properties of a BS2GC_LoginRet.
             * @memberof Protos
             * @interface IBS2GC_LoginRet
             * @property {Protos.IMsgOpts|null} [opts] BS2GC_LoginRet opts
             * @property {Protos.BS2GC_LoginRet.EResult|null} [result] BS2GC_LoginRet result
             */
    
            /**
             * Constructs a new BS2GC_LoginRet.
             * @memberof Protos
             * @classdesc Represents a BS2GC_LoginRet.
             * @implements IBS2GC_LoginRet
             * @constructor
             * @param {Protos.IBS2GC_LoginRet=} [properties] Properties to set
             */
            function BS2GC_LoginRet(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * BS2GC_LoginRet opts.
             * @member {Protos.IMsgOpts|null|undefined} opts
             * @memberof Protos.BS2GC_LoginRet
             * @instance
             */
            BS2GC_LoginRet.prototype.opts = null;
    
            /**
             * BS2GC_LoginRet result.
             * @member {Protos.BS2GC_LoginRet.EResult} result
             * @memberof Protos.BS2GC_LoginRet
             * @instance
             */
            BS2GC_LoginRet.prototype.result = 0;
    
            /**
             * Creates a new BS2GC_LoginRet instance using the specified properties.
             * @function create
             * @memberof Protos.BS2GC_LoginRet
             * @static
             * @param {Protos.IBS2GC_LoginRet=} [properties] Properties to set
             * @returns {Protos.BS2GC_LoginRet} BS2GC_LoginRet instance
             */
            BS2GC_LoginRet.create = function create(properties) {
                return new BS2GC_LoginRet(properties);
            };
    
            /**
             * Encodes the specified BS2GC_LoginRet message. Does not implicitly {@link Protos.BS2GC_LoginRet.verify|verify} messages.
             * @function encode
             * @memberof Protos.BS2GC_LoginRet
             * @static
             * @param {Protos.IBS2GC_LoginRet} message BS2GC_LoginRet message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            BS2GC_LoginRet.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.opts != null && message.hasOwnProperty("opts"))
                    $root.Protos.MsgOpts.encode(message.opts, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.result != null && message.hasOwnProperty("result"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.result);
                return writer;
            };
    
            /**
             * Encodes the specified BS2GC_LoginRet message, length delimited. Does not implicitly {@link Protos.BS2GC_LoginRet.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Protos.BS2GC_LoginRet
             * @static
             * @param {Protos.IBS2GC_LoginRet} message BS2GC_LoginRet message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            BS2GC_LoginRet.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a BS2GC_LoginRet message from the specified reader or buffer.
             * @function decode
             * @memberof Protos.BS2GC_LoginRet
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Protos.BS2GC_LoginRet} BS2GC_LoginRet
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
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
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a BS2GC_LoginRet message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Protos.BS2GC_LoginRet
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Protos.BS2GC_LoginRet} BS2GC_LoginRet
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            BS2GC_LoginRet.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a BS2GC_LoginRet message.
             * @function verify
             * @memberof Protos.BS2GC_LoginRet
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
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
                return null;
            };
    
            /**
             * Creates a BS2GC_LoginRet message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Protos.BS2GC_LoginRet
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Protos.BS2GC_LoginRet} BS2GC_LoginRet
             */
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
                return message;
            };
    
            /**
             * Creates a plain object from a BS2GC_LoginRet message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Protos.BS2GC_LoginRet
             * @static
             * @param {Protos.BS2GC_LoginRet} message BS2GC_LoginRet
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            BS2GC_LoginRet.toObject = function toObject(message, options) {
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
                    object.result = options.enums === String ? $root.Protos.BS2GC_LoginRet.EResult[message.result] : message.result;
                return object;
            };
    
            /**
             * Converts this BS2GC_LoginRet to JSON.
             * @function toJSON
             * @memberof Protos.BS2GC_LoginRet
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            BS2GC_LoginRet.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * EResult enum.
             * @name Protos.BS2GC_LoginRet.EResult
             * @enum {string}
             * @property {number} Success=0 Success value
             * @property {number} Failed=1 Failed value
             */
            BS2GC_LoginRet.EResult = (function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "Success"] = 0;
                values[valuesById[1] = "Failed"] = 1;
                return values;
            })();
    
            return BS2GC_LoginRet;
        })();
    
        Protos.CS2BS_GCLoginRet = (function() {
    
            /**
             * Properties of a CS2BS_GCLoginRet.
             * @memberof Protos
             * @interface ICS2BS_GCLoginRet
             * @property {Protos.IMsgOpts|null} [opts] CS2BS_GCLoginRet opts
             * @property {Protos.CS2BS_GCLoginRet.EResult|null} [result] CS2BS_GCLoginRet result
             */
    
            /**
             * Constructs a new CS2BS_GCLoginRet.
             * @memberof Protos
             * @classdesc Represents a CS2BS_GCLoginRet.
             * @implements ICS2BS_GCLoginRet
             * @constructor
             * @param {Protos.ICS2BS_GCLoginRet=} [properties] Properties to set
             */
            function CS2BS_GCLoginRet(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * CS2BS_GCLoginRet opts.
             * @member {Protos.IMsgOpts|null|undefined} opts
             * @memberof Protos.CS2BS_GCLoginRet
             * @instance
             */
            CS2BS_GCLoginRet.prototype.opts = null;
    
            /**
             * CS2BS_GCLoginRet result.
             * @member {Protos.CS2BS_GCLoginRet.EResult} result
             * @memberof Protos.CS2BS_GCLoginRet
             * @instance
             */
            CS2BS_GCLoginRet.prototype.result = 0;
    
            /**
             * Creates a new CS2BS_GCLoginRet instance using the specified properties.
             * @function create
             * @memberof Protos.CS2BS_GCLoginRet
             * @static
             * @param {Protos.ICS2BS_GCLoginRet=} [properties] Properties to set
             * @returns {Protos.CS2BS_GCLoginRet} CS2BS_GCLoginRet instance
             */
            CS2BS_GCLoginRet.create = function create(properties) {
                return new CS2BS_GCLoginRet(properties);
            };
    
            /**
             * Encodes the specified CS2BS_GCLoginRet message. Does not implicitly {@link Protos.CS2BS_GCLoginRet.verify|verify} messages.
             * @function encode
             * @memberof Protos.CS2BS_GCLoginRet
             * @static
             * @param {Protos.ICS2BS_GCLoginRet} message CS2BS_GCLoginRet message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CS2BS_GCLoginRet.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.opts != null && message.hasOwnProperty("opts"))
                    $root.Protos.MsgOpts.encode(message.opts, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.result != null && message.hasOwnProperty("result"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.result);
                return writer;
            };
    
            /**
             * Encodes the specified CS2BS_GCLoginRet message, length delimited. Does not implicitly {@link Protos.CS2BS_GCLoginRet.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Protos.CS2BS_GCLoginRet
             * @static
             * @param {Protos.ICS2BS_GCLoginRet} message CS2BS_GCLoginRet message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CS2BS_GCLoginRet.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a CS2BS_GCLoginRet message from the specified reader or buffer.
             * @function decode
             * @memberof Protos.CS2BS_GCLoginRet
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Protos.CS2BS_GCLoginRet} CS2BS_GCLoginRet
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CS2BS_GCLoginRet.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.CS2BS_GCLoginRet();
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
    
            /**
             * Decodes a CS2BS_GCLoginRet message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Protos.CS2BS_GCLoginRet
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Protos.CS2BS_GCLoginRet} CS2BS_GCLoginRet
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CS2BS_GCLoginRet.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a CS2BS_GCLoginRet message.
             * @function verify
             * @memberof Protos.CS2BS_GCLoginRet
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            CS2BS_GCLoginRet.verify = function verify(message) {
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
    
            /**
             * Creates a CS2BS_GCLoginRet message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Protos.CS2BS_GCLoginRet
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Protos.CS2BS_GCLoginRet} CS2BS_GCLoginRet
             */
            CS2BS_GCLoginRet.fromObject = function fromObject(object) {
                if (object instanceof $root.Protos.CS2BS_GCLoginRet)
                    return object;
                var message = new $root.Protos.CS2BS_GCLoginRet();
                if (object.opts != null) {
                    if (typeof object.opts !== "object")
                        throw TypeError(".Protos.CS2BS_GCLoginRet.opts: object expected");
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
    
            /**
             * Creates a plain object from a CS2BS_GCLoginRet message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Protos.CS2BS_GCLoginRet
             * @static
             * @param {Protos.CS2BS_GCLoginRet} message CS2BS_GCLoginRet
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            CS2BS_GCLoginRet.toObject = function toObject(message, options) {
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
                    object.result = options.enums === String ? $root.Protos.CS2BS_GCLoginRet.EResult[message.result] : message.result;
                return object;
            };
    
            /**
             * Converts this CS2BS_GCLoginRet to JSON.
             * @function toJSON
             * @memberof Protos.CS2BS_GCLoginRet
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            CS2BS_GCLoginRet.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * EResult enum.
             * @name Protos.CS2BS_GCLoginRet.EResult
             * @enum {string}
             * @property {number} Success=0 Success value
             * @property {number} Failed=1 Failed value
             */
            CS2BS_GCLoginRet.EResult = (function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "Success"] = 0;
                values[valuesById[1] = "Failed"] = 1;
                return values;
            })();
    
            return CS2BS_GCLoginRet;
        })();
    
        Protos.BS_PlayerInfo = (function() {
    
            /**
             * Properties of a BS_PlayerInfo.
             * @memberof Protos
             * @interface IBS_PlayerInfo
             * @property {number|null} [gsid] BS_PlayerInfo gsid
             */
    
            /**
             * Constructs a new BS_PlayerInfo.
             * @memberof Protos
             * @classdesc Represents a BS_PlayerInfo.
             * @implements IBS_PlayerInfo
             * @constructor
             * @param {Protos.IBS_PlayerInfo=} [properties] Properties to set
             */
            function BS_PlayerInfo(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * BS_PlayerInfo gsid.
             * @member {number} gsid
             * @memberof Protos.BS_PlayerInfo
             * @instance
             */
            BS_PlayerInfo.prototype.gsid = 0;
    
            /**
             * Creates a new BS_PlayerInfo instance using the specified properties.
             * @function create
             * @memberof Protos.BS_PlayerInfo
             * @static
             * @param {Protos.IBS_PlayerInfo=} [properties] Properties to set
             * @returns {Protos.BS_PlayerInfo} BS_PlayerInfo instance
             */
            BS_PlayerInfo.create = function create(properties) {
                return new BS_PlayerInfo(properties);
            };
    
            /**
             * Encodes the specified BS_PlayerInfo message. Does not implicitly {@link Protos.BS_PlayerInfo.verify|verify} messages.
             * @function encode
             * @memberof Protos.BS_PlayerInfo
             * @static
             * @param {Protos.IBS_PlayerInfo} message BS_PlayerInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            BS_PlayerInfo.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.gsid != null && message.hasOwnProperty("gsid"))
                    writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.gsid);
                return writer;
            };
    
            /**
             * Encodes the specified BS_PlayerInfo message, length delimited. Does not implicitly {@link Protos.BS_PlayerInfo.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Protos.BS_PlayerInfo
             * @static
             * @param {Protos.IBS_PlayerInfo} message BS_PlayerInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            BS_PlayerInfo.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a BS_PlayerInfo message from the specified reader or buffer.
             * @function decode
             * @memberof Protos.BS_PlayerInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Protos.BS_PlayerInfo} BS_PlayerInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            BS_PlayerInfo.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.BS_PlayerInfo();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.gsid = reader.uint32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a BS_PlayerInfo message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Protos.BS_PlayerInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Protos.BS_PlayerInfo} BS_PlayerInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            BS_PlayerInfo.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a BS_PlayerInfo message.
             * @function verify
             * @memberof Protos.BS_PlayerInfo
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            BS_PlayerInfo.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.gsid != null && message.hasOwnProperty("gsid"))
                    if (!$util.isInteger(message.gsid))
                        return "gsid: integer expected";
                return null;
            };
    
            /**
             * Creates a BS_PlayerInfo message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Protos.BS_PlayerInfo
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Protos.BS_PlayerInfo} BS_PlayerInfo
             */
            BS_PlayerInfo.fromObject = function fromObject(object) {
                if (object instanceof $root.Protos.BS_PlayerInfo)
                    return object;
                var message = new $root.Protos.BS_PlayerInfo();
                if (object.gsid != null)
                    message.gsid = object.gsid >>> 0;
                return message;
            };
    
            /**
             * Creates a plain object from a BS_PlayerInfo message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Protos.BS_PlayerInfo
             * @static
             * @param {Protos.BS_PlayerInfo} message BS_PlayerInfo
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            BS_PlayerInfo.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.gsid = 0;
                if (message.gsid != null && message.hasOwnProperty("gsid"))
                    object.gsid = message.gsid;
                return object;
            };
    
            /**
             * Converts this BS_PlayerInfo to JSON.
             * @function toJSON
             * @memberof Protos.BS_PlayerInfo
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            BS_PlayerInfo.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return BS_PlayerInfo;
        })();
    
        Protos.CS2BS_RoomInfo = (function() {
    
            /**
             * Properties of a CS2BS_RoomInfo.
             * @memberof Protos
             * @interface ICS2BS_RoomInfo
             * @property {Protos.IMsgOpts|null} [opts] CS2BS_RoomInfo opts
             * @property {Array.<Protos.IBS_PlayerInfo>|null} [playerInfo] CS2BS_RoomInfo playerInfo
             */
    
            /**
             * Constructs a new CS2BS_RoomInfo.
             * @memberof Protos
             * @classdesc Represents a CS2BS_RoomInfo.
             * @implements ICS2BS_RoomInfo
             * @constructor
             * @param {Protos.ICS2BS_RoomInfo=} [properties] Properties to set
             */
            function CS2BS_RoomInfo(properties) {
                this.playerInfo = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * CS2BS_RoomInfo opts.
             * @member {Protos.IMsgOpts|null|undefined} opts
             * @memberof Protos.CS2BS_RoomInfo
             * @instance
             */
            CS2BS_RoomInfo.prototype.opts = null;
    
            /**
             * CS2BS_RoomInfo playerInfo.
             * @member {Array.<Protos.IBS_PlayerInfo>} playerInfo
             * @memberof Protos.CS2BS_RoomInfo
             * @instance
             */
            CS2BS_RoomInfo.prototype.playerInfo = $util.emptyArray;
    
            /**
             * Creates a new CS2BS_RoomInfo instance using the specified properties.
             * @function create
             * @memberof Protos.CS2BS_RoomInfo
             * @static
             * @param {Protos.ICS2BS_RoomInfo=} [properties] Properties to set
             * @returns {Protos.CS2BS_RoomInfo} CS2BS_RoomInfo instance
             */
            CS2BS_RoomInfo.create = function create(properties) {
                return new CS2BS_RoomInfo(properties);
            };
    
            /**
             * Encodes the specified CS2BS_RoomInfo message. Does not implicitly {@link Protos.CS2BS_RoomInfo.verify|verify} messages.
             * @function encode
             * @memberof Protos.CS2BS_RoomInfo
             * @static
             * @param {Protos.ICS2BS_RoomInfo} message CS2BS_RoomInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CS2BS_RoomInfo.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.opts != null && message.hasOwnProperty("opts"))
                    $root.Protos.MsgOpts.encode(message.opts, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.playerInfo != null && message.playerInfo.length)
                    for (var i = 0; i < message.playerInfo.length; ++i)
                        $root.Protos.BS_PlayerInfo.encode(message.playerInfo[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified CS2BS_RoomInfo message, length delimited. Does not implicitly {@link Protos.CS2BS_RoomInfo.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Protos.CS2BS_RoomInfo
             * @static
             * @param {Protos.ICS2BS_RoomInfo} message CS2BS_RoomInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CS2BS_RoomInfo.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a CS2BS_RoomInfo message from the specified reader or buffer.
             * @function decode
             * @memberof Protos.CS2BS_RoomInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Protos.CS2BS_RoomInfo} CS2BS_RoomInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CS2BS_RoomInfo.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.CS2BS_RoomInfo();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.opts = $root.Protos.MsgOpts.decode(reader, reader.uint32());
                        break;
                    case 2:
                        if (!(message.playerInfo && message.playerInfo.length))
                            message.playerInfo = [];
                        message.playerInfo.push($root.Protos.BS_PlayerInfo.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a CS2BS_RoomInfo message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Protos.CS2BS_RoomInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Protos.CS2BS_RoomInfo} CS2BS_RoomInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CS2BS_RoomInfo.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a CS2BS_RoomInfo message.
             * @function verify
             * @memberof Protos.CS2BS_RoomInfo
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            CS2BS_RoomInfo.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.opts != null && message.hasOwnProperty("opts")) {
                    var error = $root.Protos.MsgOpts.verify(message.opts);
                    if (error)
                        return "opts." + error;
                }
                if (message.playerInfo != null && message.hasOwnProperty("playerInfo")) {
                    if (!Array.isArray(message.playerInfo))
                        return "playerInfo: array expected";
                    for (var i = 0; i < message.playerInfo.length; ++i) {
                        var error = $root.Protos.BS_PlayerInfo.verify(message.playerInfo[i]);
                        if (error)
                            return "playerInfo." + error;
                    }
                }
                return null;
            };
    
            /**
             * Creates a CS2BS_RoomInfo message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Protos.CS2BS_RoomInfo
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Protos.CS2BS_RoomInfo} CS2BS_RoomInfo
             */
            CS2BS_RoomInfo.fromObject = function fromObject(object) {
                if (object instanceof $root.Protos.CS2BS_RoomInfo)
                    return object;
                var message = new $root.Protos.CS2BS_RoomInfo();
                if (object.opts != null) {
                    if (typeof object.opts !== "object")
                        throw TypeError(".Protos.CS2BS_RoomInfo.opts: object expected");
                    message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
                }
                if (object.playerInfo) {
                    if (!Array.isArray(object.playerInfo))
                        throw TypeError(".Protos.CS2BS_RoomInfo.playerInfo: array expected");
                    message.playerInfo = [];
                    for (var i = 0; i < object.playerInfo.length; ++i) {
                        if (typeof object.playerInfo[i] !== "object")
                            throw TypeError(".Protos.CS2BS_RoomInfo.playerInfo: object expected");
                        message.playerInfo[i] = $root.Protos.BS_PlayerInfo.fromObject(object.playerInfo[i]);
                    }
                }
                return message;
            };
    
            /**
             * Creates a plain object from a CS2BS_RoomInfo message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Protos.CS2BS_RoomInfo
             * @static
             * @param {Protos.CS2BS_RoomInfo} message CS2BS_RoomInfo
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            CS2BS_RoomInfo.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.playerInfo = [];
                if (options.defaults)
                    object.opts = null;
                if (message.opts != null && message.hasOwnProperty("opts"))
                    object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
                if (message.playerInfo && message.playerInfo.length) {
                    object.playerInfo = [];
                    for (var j = 0; j < message.playerInfo.length; ++j)
                        object.playerInfo[j] = $root.Protos.BS_PlayerInfo.toObject(message.playerInfo[j], options);
                }
                return object;
            };
    
            /**
             * Converts this CS2BS_RoomInfo to JSON.
             * @function toJSON
             * @memberof Protos.CS2BS_RoomInfo
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            CS2BS_RoomInfo.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return CS2BS_RoomInfo;
        })();
    
        Protos.CS2GC_BeginMatchRet = (function() {
    
            /**
             * Properties of a CS2GC_BeginMatchRet.
             * @memberof Protos
             * @interface ICS2GC_BeginMatchRet
             * @property {Protos.IMsgOpts|null} [opts] CS2GC_BeginMatchRet opts
             * @property {Protos.Global.ECommon|null} [result] CS2GC_BeginMatchRet result
             */
    
            /**
             * Constructs a new CS2GC_BeginMatchRet.
             * @memberof Protos
             * @classdesc Represents a CS2GC_BeginMatchRet.
             * @implements ICS2GC_BeginMatchRet
             * @constructor
             * @param {Protos.ICS2GC_BeginMatchRet=} [properties] Properties to set
             */
            function CS2GC_BeginMatchRet(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * CS2GC_BeginMatchRet opts.
             * @member {Protos.IMsgOpts|null|undefined} opts
             * @memberof Protos.CS2GC_BeginMatchRet
             * @instance
             */
            CS2GC_BeginMatchRet.prototype.opts = null;
    
            /**
             * CS2GC_BeginMatchRet result.
             * @member {Protos.Global.ECommon} result
             * @memberof Protos.CS2GC_BeginMatchRet
             * @instance
             */
            CS2GC_BeginMatchRet.prototype.result = 0;
    
            /**
             * Creates a new CS2GC_BeginMatchRet instance using the specified properties.
             * @function create
             * @memberof Protos.CS2GC_BeginMatchRet
             * @static
             * @param {Protos.ICS2GC_BeginMatchRet=} [properties] Properties to set
             * @returns {Protos.CS2GC_BeginMatchRet} CS2GC_BeginMatchRet instance
             */
            CS2GC_BeginMatchRet.create = function create(properties) {
                return new CS2GC_BeginMatchRet(properties);
            };
    
            /**
             * Encodes the specified CS2GC_BeginMatchRet message. Does not implicitly {@link Protos.CS2GC_BeginMatchRet.verify|verify} messages.
             * @function encode
             * @memberof Protos.CS2GC_BeginMatchRet
             * @static
             * @param {Protos.ICS2GC_BeginMatchRet} message CS2GC_BeginMatchRet message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CS2GC_BeginMatchRet.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.opts != null && message.hasOwnProperty("opts"))
                    $root.Protos.MsgOpts.encode(message.opts, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.result != null && message.hasOwnProperty("result"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.result);
                return writer;
            };
    
            /**
             * Encodes the specified CS2GC_BeginMatchRet message, length delimited. Does not implicitly {@link Protos.CS2GC_BeginMatchRet.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Protos.CS2GC_BeginMatchRet
             * @static
             * @param {Protos.ICS2GC_BeginMatchRet} message CS2GC_BeginMatchRet message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CS2GC_BeginMatchRet.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a CS2GC_BeginMatchRet message from the specified reader or buffer.
             * @function decode
             * @memberof Protos.CS2GC_BeginMatchRet
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Protos.CS2GC_BeginMatchRet} CS2GC_BeginMatchRet
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
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
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a CS2GC_BeginMatchRet message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Protos.CS2GC_BeginMatchRet
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Protos.CS2GC_BeginMatchRet} CS2GC_BeginMatchRet
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CS2GC_BeginMatchRet.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a CS2GC_BeginMatchRet message.
             * @function verify
             * @memberof Protos.CS2GC_BeginMatchRet
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
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
                        break;
                    }
                return null;
            };
    
            /**
             * Creates a CS2GC_BeginMatchRet message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Protos.CS2GC_BeginMatchRet
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Protos.CS2GC_BeginMatchRet} CS2GC_BeginMatchRet
             */
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
                }
                return message;
            };
    
            /**
             * Creates a plain object from a CS2GC_BeginMatchRet message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Protos.CS2GC_BeginMatchRet
             * @static
             * @param {Protos.CS2GC_BeginMatchRet} message CS2GC_BeginMatchRet
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            CS2GC_BeginMatchRet.toObject = function toObject(message, options) {
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
    
            /**
             * Converts this CS2GC_BeginMatchRet to JSON.
             * @function toJSON
             * @memberof Protos.CS2GC_BeginMatchRet
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            CS2GC_BeginMatchRet.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return CS2GC_BeginMatchRet;
        })();
    
        Protos.CS_PlayerInfo = (function() {
    
            /**
             * Properties of a CS_PlayerInfo.
             * @memberof Protos
             * @interface ICS_PlayerInfo
             * @property {Long|null} [id] CS_PlayerInfo id
             * @property {string|null} [name] CS_PlayerInfo name
             * @property {number|null} [job] CS_PlayerInfo job
             * @property {number|null} [sex] CS_PlayerInfo sex
             */
    
            /**
             * Constructs a new CS_PlayerInfo.
             * @memberof Protos
             * @classdesc Represents a CS_PlayerInfo.
             * @implements ICS_PlayerInfo
             * @constructor
             * @param {Protos.ICS_PlayerInfo=} [properties] Properties to set
             */
            function CS_PlayerInfo(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * CS_PlayerInfo id.
             * @member {Long} id
             * @memberof Protos.CS_PlayerInfo
             * @instance
             */
            CS_PlayerInfo.prototype.id = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
    
            /**
             * CS_PlayerInfo name.
             * @member {string} name
             * @memberof Protos.CS_PlayerInfo
             * @instance
             */
            CS_PlayerInfo.prototype.name = "";
    
            /**
             * CS_PlayerInfo job.
             * @member {number} job
             * @memberof Protos.CS_PlayerInfo
             * @instance
             */
            CS_PlayerInfo.prototype.job = 0;
    
            /**
             * CS_PlayerInfo sex.
             * @member {number} sex
             * @memberof Protos.CS_PlayerInfo
             * @instance
             */
            CS_PlayerInfo.prototype.sex = 0;
    
            /**
             * Creates a new CS_PlayerInfo instance using the specified properties.
             * @function create
             * @memberof Protos.CS_PlayerInfo
             * @static
             * @param {Protos.ICS_PlayerInfo=} [properties] Properties to set
             * @returns {Protos.CS_PlayerInfo} CS_PlayerInfo instance
             */
            CS_PlayerInfo.create = function create(properties) {
                return new CS_PlayerInfo(properties);
            };
    
            /**
             * Encodes the specified CS_PlayerInfo message. Does not implicitly {@link Protos.CS_PlayerInfo.verify|verify} messages.
             * @function encode
             * @memberof Protos.CS_PlayerInfo
             * @static
             * @param {Protos.ICS_PlayerInfo} message CS_PlayerInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CS_PlayerInfo.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.id != null && message.hasOwnProperty("id"))
                    writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.id);
                if (message.name != null && message.hasOwnProperty("name"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
                if (message.job != null && message.hasOwnProperty("job"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.job);
                if (message.sex != null && message.hasOwnProperty("sex"))
                    writer.uint32(/* id 4, wireType 0 =*/32).int32(message.sex);
                return writer;
            };
    
            /**
             * Encodes the specified CS_PlayerInfo message, length delimited. Does not implicitly {@link Protos.CS_PlayerInfo.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Protos.CS_PlayerInfo
             * @static
             * @param {Protos.ICS_PlayerInfo} message CS_PlayerInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CS_PlayerInfo.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a CS_PlayerInfo message from the specified reader or buffer.
             * @function decode
             * @memberof Protos.CS_PlayerInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Protos.CS_PlayerInfo} CS_PlayerInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CS_PlayerInfo.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.CS_PlayerInfo();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.id = reader.uint64();
                        break;
                    case 2:
                        message.name = reader.string();
                        break;
                    case 3:
                        message.job = reader.int32();
                        break;
                    case 4:
                        message.sex = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a CS_PlayerInfo message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Protos.CS_PlayerInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Protos.CS_PlayerInfo} CS_PlayerInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CS_PlayerInfo.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a CS_PlayerInfo message.
             * @function verify
             * @memberof Protos.CS_PlayerInfo
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            CS_PlayerInfo.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.id != null && message.hasOwnProperty("id"))
                    if (!$util.isInteger(message.id) && !(message.id && $util.isInteger(message.id.low) && $util.isInteger(message.id.high)))
                        return "id: integer|Long expected";
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.job != null && message.hasOwnProperty("job"))
                    if (!$util.isInteger(message.job))
                        return "job: integer expected";
                if (message.sex != null && message.hasOwnProperty("sex"))
                    if (!$util.isInteger(message.sex))
                        return "sex: integer expected";
                return null;
            };
    
            /**
             * Creates a CS_PlayerInfo message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Protos.CS_PlayerInfo
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Protos.CS_PlayerInfo} CS_PlayerInfo
             */
            CS_PlayerInfo.fromObject = function fromObject(object) {
                if (object instanceof $root.Protos.CS_PlayerInfo)
                    return object;
                var message = new $root.Protos.CS_PlayerInfo();
                if (object.id != null)
                    if ($util.Long)
                        (message.id = $util.Long.fromValue(object.id)).unsigned = true;
                    else if (typeof object.id === "string")
                        message.id = parseInt(object.id, 10);
                    else if (typeof object.id === "number")
                        message.id = object.id;
                    else if (typeof object.id === "object")
                        message.id = new $util.LongBits(object.id.low >>> 0, object.id.high >>> 0).toNumber(true);
                if (object.name != null)
                    message.name = String(object.name);
                if (object.job != null)
                    message.job = object.job | 0;
                if (object.sex != null)
                    message.sex = object.sex | 0;
                return message;
            };
    
            /**
             * Creates a plain object from a CS_PlayerInfo message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Protos.CS_PlayerInfo
             * @static
             * @param {Protos.CS_PlayerInfo} message CS_PlayerInfo
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            CS_PlayerInfo.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, true);
                        object.id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.id = options.longs === String ? "0" : 0;
                    object.name = "";
                    object.job = 0;
                    object.sex = 0;
                }
                if (message.id != null && message.hasOwnProperty("id"))
                    if (typeof message.id === "number")
                        object.id = options.longs === String ? String(message.id) : message.id;
                    else
                        object.id = options.longs === String ? $util.Long.prototype.toString.call(message.id) : options.longs === Number ? new $util.LongBits(message.id.low >>> 0, message.id.high >>> 0).toNumber(true) : message.id;
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.job != null && message.hasOwnProperty("job"))
                    object.job = message.job;
                if (message.sex != null && message.hasOwnProperty("sex"))
                    object.sex = message.sex;
                return object;
            };
    
            /**
             * Converts this CS_PlayerInfo to JSON.
             * @function toJSON
             * @memberof Protos.CS_PlayerInfo
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            CS_PlayerInfo.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return CS_PlayerInfo;
        })();
    
        Protos.CS2GC_BeginBattle = (function() {
    
            /**
             * Properties of a CS2GC_BeginBattle.
             * @memberof Protos
             * @interface ICS2GC_BeginBattle
             * @property {Protos.IMsgOpts|null} [opts] CS2GC_BeginBattle opts
             * @property {number|null} [mapID] CS2GC_BeginBattle mapID
             * @property {Array.<Protos.ICS_PlayerInfo>|null} [playInfos] CS2GC_BeginBattle playInfos
             */
    
            /**
             * Constructs a new CS2GC_BeginBattle.
             * @memberof Protos
             * @classdesc Represents a CS2GC_BeginBattle.
             * @implements ICS2GC_BeginBattle
             * @constructor
             * @param {Protos.ICS2GC_BeginBattle=} [properties] Properties to set
             */
            function CS2GC_BeginBattle(properties) {
                this.playInfos = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * CS2GC_BeginBattle opts.
             * @member {Protos.IMsgOpts|null|undefined} opts
             * @memberof Protos.CS2GC_BeginBattle
             * @instance
             */
            CS2GC_BeginBattle.prototype.opts = null;
    
            /**
             * CS2GC_BeginBattle mapID.
             * @member {number} mapID
             * @memberof Protos.CS2GC_BeginBattle
             * @instance
             */
            CS2GC_BeginBattle.prototype.mapID = 0;
    
            /**
             * CS2GC_BeginBattle playInfos.
             * @member {Array.<Protos.ICS_PlayerInfo>} playInfos
             * @memberof Protos.CS2GC_BeginBattle
             * @instance
             */
            CS2GC_BeginBattle.prototype.playInfos = $util.emptyArray;
    
            /**
             * Creates a new CS2GC_BeginBattle instance using the specified properties.
             * @function create
             * @memberof Protos.CS2GC_BeginBattle
             * @static
             * @param {Protos.ICS2GC_BeginBattle=} [properties] Properties to set
             * @returns {Protos.CS2GC_BeginBattle} CS2GC_BeginBattle instance
             */
            CS2GC_BeginBattle.create = function create(properties) {
                return new CS2GC_BeginBattle(properties);
            };
    
            /**
             * Encodes the specified CS2GC_BeginBattle message. Does not implicitly {@link Protos.CS2GC_BeginBattle.verify|verify} messages.
             * @function encode
             * @memberof Protos.CS2GC_BeginBattle
             * @static
             * @param {Protos.ICS2GC_BeginBattle} message CS2GC_BeginBattle message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CS2GC_BeginBattle.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.opts != null && message.hasOwnProperty("opts"))
                    $root.Protos.MsgOpts.encode(message.opts, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.mapID != null && message.hasOwnProperty("mapID"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.mapID);
                if (message.playInfos != null && message.playInfos.length)
                    for (var i = 0; i < message.playInfos.length; ++i)
                        $root.Protos.CS_PlayerInfo.encode(message.playInfos[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified CS2GC_BeginBattle message, length delimited. Does not implicitly {@link Protos.CS2GC_BeginBattle.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Protos.CS2GC_BeginBattle
             * @static
             * @param {Protos.ICS2GC_BeginBattle} message CS2GC_BeginBattle message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CS2GC_BeginBattle.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a CS2GC_BeginBattle message from the specified reader or buffer.
             * @function decode
             * @memberof Protos.CS2GC_BeginBattle
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Protos.CS2GC_BeginBattle} CS2GC_BeginBattle
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CS2GC_BeginBattle.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.CS2GC_BeginBattle();
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
                        if (!(message.playInfos && message.playInfos.length))
                            message.playInfos = [];
                        message.playInfos.push($root.Protos.CS_PlayerInfo.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a CS2GC_BeginBattle message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Protos.CS2GC_BeginBattle
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Protos.CS2GC_BeginBattle} CS2GC_BeginBattle
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CS2GC_BeginBattle.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a CS2GC_BeginBattle message.
             * @function verify
             * @memberof Protos.CS2GC_BeginBattle
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            CS2GC_BeginBattle.verify = function verify(message) {
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
                if (message.playInfos != null && message.hasOwnProperty("playInfos")) {
                    if (!Array.isArray(message.playInfos))
                        return "playInfos: array expected";
                    for (var i = 0; i < message.playInfos.length; ++i) {
                        var error = $root.Protos.CS_PlayerInfo.verify(message.playInfos[i]);
                        if (error)
                            return "playInfos." + error;
                    }
                }
                return null;
            };
    
            /**
             * Creates a CS2GC_BeginBattle message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Protos.CS2GC_BeginBattle
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Protos.CS2GC_BeginBattle} CS2GC_BeginBattle
             */
            CS2GC_BeginBattle.fromObject = function fromObject(object) {
                if (object instanceof $root.Protos.CS2GC_BeginBattle)
                    return object;
                var message = new $root.Protos.CS2GC_BeginBattle();
                if (object.opts != null) {
                    if (typeof object.opts !== "object")
                        throw TypeError(".Protos.CS2GC_BeginBattle.opts: object expected");
                    message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
                }
                if (object.mapID != null)
                    message.mapID = object.mapID | 0;
                if (object.playInfos) {
                    if (!Array.isArray(object.playInfos))
                        throw TypeError(".Protos.CS2GC_BeginBattle.playInfos: array expected");
                    message.playInfos = [];
                    for (var i = 0; i < object.playInfos.length; ++i) {
                        if (typeof object.playInfos[i] !== "object")
                            throw TypeError(".Protos.CS2GC_BeginBattle.playInfos: object expected");
                        message.playInfos[i] = $root.Protos.CS_PlayerInfo.fromObject(object.playInfos[i]);
                    }
                }
                return message;
            };
    
            /**
             * Creates a plain object from a CS2GC_BeginBattle message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Protos.CS2GC_BeginBattle
             * @static
             * @param {Protos.CS2GC_BeginBattle} message CS2GC_BeginBattle
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            CS2GC_BeginBattle.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.playInfos = [];
                if (options.defaults) {
                    object.opts = null;
                    object.mapID = 0;
                }
                if (message.opts != null && message.hasOwnProperty("opts"))
                    object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
                if (message.mapID != null && message.hasOwnProperty("mapID"))
                    object.mapID = message.mapID;
                if (message.playInfos && message.playInfos.length) {
                    object.playInfos = [];
                    for (var j = 0; j < message.playInfos.length; ++j)
                        object.playInfos[j] = $root.Protos.CS_PlayerInfo.toObject(message.playInfos[j], options);
                }
                return object;
            };
    
            /**
             * Converts this CS2GC_BeginBattle to JSON.
             * @function toJSON
             * @memberof Protos.CS2GC_BeginBattle
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            CS2GC_BeginBattle.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return CS2GC_BeginBattle;
        })();
    
        Protos.CS2GS_GCLoginRet = (function() {
    
            /**
             * Properties of a CS2GS_GCLoginRet.
             * @memberof Protos
             * @interface ICS2GS_GCLoginRet
             * @property {Protos.IMsgOpts|null} [opts] CS2GS_GCLoginRet opts
             * @property {Protos.CS2GS_GCLoginRet.EResult|null} [result] CS2GS_GCLoginRet result
             */
    
            /**
             * Constructs a new CS2GS_GCLoginRet.
             * @memberof Protos
             * @classdesc Represents a CS2GS_GCLoginRet.
             * @implements ICS2GS_GCLoginRet
             * @constructor
             * @param {Protos.ICS2GS_GCLoginRet=} [properties] Properties to set
             */
            function CS2GS_GCLoginRet(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * CS2GS_GCLoginRet opts.
             * @member {Protos.IMsgOpts|null|undefined} opts
             * @memberof Protos.CS2GS_GCLoginRet
             * @instance
             */
            CS2GS_GCLoginRet.prototype.opts = null;
    
            /**
             * CS2GS_GCLoginRet result.
             * @member {Protos.CS2GS_GCLoginRet.EResult} result
             * @memberof Protos.CS2GS_GCLoginRet
             * @instance
             */
            CS2GS_GCLoginRet.prototype.result = 0;
    
            /**
             * Creates a new CS2GS_GCLoginRet instance using the specified properties.
             * @function create
             * @memberof Protos.CS2GS_GCLoginRet
             * @static
             * @param {Protos.ICS2GS_GCLoginRet=} [properties] Properties to set
             * @returns {Protos.CS2GS_GCLoginRet} CS2GS_GCLoginRet instance
             */
            CS2GS_GCLoginRet.create = function create(properties) {
                return new CS2GS_GCLoginRet(properties);
            };
    
            /**
             * Encodes the specified CS2GS_GCLoginRet message. Does not implicitly {@link Protos.CS2GS_GCLoginRet.verify|verify} messages.
             * @function encode
             * @memberof Protos.CS2GS_GCLoginRet
             * @static
             * @param {Protos.ICS2GS_GCLoginRet} message CS2GS_GCLoginRet message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CS2GS_GCLoginRet.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.opts != null && message.hasOwnProperty("opts"))
                    $root.Protos.MsgOpts.encode(message.opts, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.result != null && message.hasOwnProperty("result"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.result);
                return writer;
            };
    
            /**
             * Encodes the specified CS2GS_GCLoginRet message, length delimited. Does not implicitly {@link Protos.CS2GS_GCLoginRet.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Protos.CS2GS_GCLoginRet
             * @static
             * @param {Protos.ICS2GS_GCLoginRet} message CS2GS_GCLoginRet message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CS2GS_GCLoginRet.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a CS2GS_GCLoginRet message from the specified reader or buffer.
             * @function decode
             * @memberof Protos.CS2GS_GCLoginRet
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Protos.CS2GS_GCLoginRet} CS2GS_GCLoginRet
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
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
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a CS2GS_GCLoginRet message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Protos.CS2GS_GCLoginRet
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Protos.CS2GS_GCLoginRet} CS2GS_GCLoginRet
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CS2GS_GCLoginRet.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a CS2GS_GCLoginRet message.
             * @function verify
             * @memberof Protos.CS2GS_GCLoginRet
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
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
                return null;
            };
    
            /**
             * Creates a CS2GS_GCLoginRet message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Protos.CS2GS_GCLoginRet
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Protos.CS2GS_GCLoginRet} CS2GS_GCLoginRet
             */
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
                return message;
            };
    
            /**
             * Creates a plain object from a CS2GS_GCLoginRet message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Protos.CS2GS_GCLoginRet
             * @static
             * @param {Protos.CS2GS_GCLoginRet} message CS2GS_GCLoginRet
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            CS2GS_GCLoginRet.toObject = function toObject(message, options) {
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
                    object.result = options.enums === String ? $root.Protos.CS2GS_GCLoginRet.EResult[message.result] : message.result;
                return object;
            };
    
            /**
             * Converts this CS2GS_GCLoginRet to JSON.
             * @function toJSON
             * @memberof Protos.CS2GS_GCLoginRet
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            CS2GS_GCLoginRet.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * EResult enum.
             * @name Protos.CS2GS_GCLoginRet.EResult
             * @enum {string}
             * @property {number} Success=0 Success value
             * @property {number} IllegalLogin=1 IllegalLogin value
             */
            CS2GS_GCLoginRet.EResult = (function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "Success"] = 0;
                values[valuesById[1] = "IllegalLogin"] = 1;
                return values;
            })();
    
            return CS2GS_GCLoginRet;
        })();
    
        Protos.CS2GS_KickGC = (function() {
    
            /**
             * Properties of a CS2GS_KickGC.
             * @memberof Protos
             * @interface ICS2GS_KickGC
             * @property {Protos.IMsgOpts|null} [opts] CS2GS_KickGC opts
             * @property {Long|null} [gcNID] CS2GS_KickGC gcNID
             * @property {Protos.CS2GS_KickGC.EReason|null} [reason] CS2GS_KickGC reason
             */
    
            /**
             * Constructs a new CS2GS_KickGC.
             * @memberof Protos
             * @classdesc Represents a CS2GS_KickGC.
             * @implements ICS2GS_KickGC
             * @constructor
             * @param {Protos.ICS2GS_KickGC=} [properties] Properties to set
             */
            function CS2GS_KickGC(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * CS2GS_KickGC opts.
             * @member {Protos.IMsgOpts|null|undefined} opts
             * @memberof Protos.CS2GS_KickGC
             * @instance
             */
            CS2GS_KickGC.prototype.opts = null;
    
            /**
             * CS2GS_KickGC gcNID.
             * @member {Long} gcNID
             * @memberof Protos.CS2GS_KickGC
             * @instance
             */
            CS2GS_KickGC.prototype.gcNID = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
    
            /**
             * CS2GS_KickGC reason.
             * @member {Protos.CS2GS_KickGC.EReason} reason
             * @memberof Protos.CS2GS_KickGC
             * @instance
             */
            CS2GS_KickGC.prototype.reason = 0;
    
            /**
             * Creates a new CS2GS_KickGC instance using the specified properties.
             * @function create
             * @memberof Protos.CS2GS_KickGC
             * @static
             * @param {Protos.ICS2GS_KickGC=} [properties] Properties to set
             * @returns {Protos.CS2GS_KickGC} CS2GS_KickGC instance
             */
            CS2GS_KickGC.create = function create(properties) {
                return new CS2GS_KickGC(properties);
            };
    
            /**
             * Encodes the specified CS2GS_KickGC message. Does not implicitly {@link Protos.CS2GS_KickGC.verify|verify} messages.
             * @function encode
             * @memberof Protos.CS2GS_KickGC
             * @static
             * @param {Protos.ICS2GS_KickGC} message CS2GS_KickGC message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CS2GS_KickGC.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.opts != null && message.hasOwnProperty("opts"))
                    $root.Protos.MsgOpts.encode(message.opts, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.gcNID != null && message.hasOwnProperty("gcNID"))
                    writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.gcNID);
                if (message.reason != null && message.hasOwnProperty("reason"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.reason);
                return writer;
            };
    
            /**
             * Encodes the specified CS2GS_KickGC message, length delimited. Does not implicitly {@link Protos.CS2GS_KickGC.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Protos.CS2GS_KickGC
             * @static
             * @param {Protos.ICS2GS_KickGC} message CS2GS_KickGC message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CS2GS_KickGC.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a CS2GS_KickGC message from the specified reader or buffer.
             * @function decode
             * @memberof Protos.CS2GS_KickGC
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Protos.CS2GS_KickGC} CS2GS_KickGC
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
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
    
            /**
             * Decodes a CS2GS_KickGC message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Protos.CS2GS_KickGC
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Protos.CS2GS_KickGC} CS2GS_KickGC
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CS2GS_KickGC.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a CS2GS_KickGC message.
             * @function verify
             * @memberof Protos.CS2GS_KickGC
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
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
                        break;
                    }
                return null;
            };
    
            /**
             * Creates a CS2GS_KickGC message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Protos.CS2GS_KickGC
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Protos.CS2GS_KickGC} CS2GS_KickGC
             */
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
                case "Other":
                case 1:
                    message.reason = 1;
                    break;
                }
                return message;
            };
    
            /**
             * Creates a plain object from a CS2GS_KickGC message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Protos.CS2GS_KickGC
             * @static
             * @param {Protos.CS2GS_KickGC} message CS2GS_KickGC
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
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
    
            /**
             * Converts this CS2GS_KickGC to JSON.
             * @function toJSON
             * @memberof Protos.CS2GS_KickGC
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            CS2GS_KickGC.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * EReason enum.
             * @name Protos.CS2GS_KickGC.EReason
             * @enum {string}
             * @property {number} DuplicateLogin=0 DuplicateLogin value
             * @property {number} Other=1 Other value
             */
            CS2GS_KickGC.EReason = (function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "DuplicateLogin"] = 0;
                values[valuesById[1] = "Other"] = 1;
                return values;
            })();
    
            return CS2GS_KickGC;
        })();
    
        Protos.CS2LS_GSInfos = (function() {
    
            /**
             * Properties of a CS2LS_GSInfos.
             * @memberof Protos
             * @interface ICS2LS_GSInfos
             * @property {Protos.IMsgOpts|null} [opts] CS2LS_GSInfos opts
             * @property {Array.<Protos.IGSInfo>|null} [gsInfo] CS2LS_GSInfos gsInfo
             */
    
            /**
             * Constructs a new CS2LS_GSInfos.
             * @memberof Protos
             * @classdesc Represents a CS2LS_GSInfos.
             * @implements ICS2LS_GSInfos
             * @constructor
             * @param {Protos.ICS2LS_GSInfos=} [properties] Properties to set
             */
            function CS2LS_GSInfos(properties) {
                this.gsInfo = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * CS2LS_GSInfos opts.
             * @member {Protos.IMsgOpts|null|undefined} opts
             * @memberof Protos.CS2LS_GSInfos
             * @instance
             */
            CS2LS_GSInfos.prototype.opts = null;
    
            /**
             * CS2LS_GSInfos gsInfo.
             * @member {Array.<Protos.IGSInfo>} gsInfo
             * @memberof Protos.CS2LS_GSInfos
             * @instance
             */
            CS2LS_GSInfos.prototype.gsInfo = $util.emptyArray;
    
            /**
             * Creates a new CS2LS_GSInfos instance using the specified properties.
             * @function create
             * @memberof Protos.CS2LS_GSInfos
             * @static
             * @param {Protos.ICS2LS_GSInfos=} [properties] Properties to set
             * @returns {Protos.CS2LS_GSInfos} CS2LS_GSInfos instance
             */
            CS2LS_GSInfos.create = function create(properties) {
                return new CS2LS_GSInfos(properties);
            };
    
            /**
             * Encodes the specified CS2LS_GSInfos message. Does not implicitly {@link Protos.CS2LS_GSInfos.verify|verify} messages.
             * @function encode
             * @memberof Protos.CS2LS_GSInfos
             * @static
             * @param {Protos.ICS2LS_GSInfos} message CS2LS_GSInfos message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CS2LS_GSInfos.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.opts != null && message.hasOwnProperty("opts"))
                    $root.Protos.MsgOpts.encode(message.opts, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.gsInfo != null && message.gsInfo.length)
                    for (var i = 0; i < message.gsInfo.length; ++i)
                        $root.Protos.GSInfo.encode(message.gsInfo[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified CS2LS_GSInfos message, length delimited. Does not implicitly {@link Protos.CS2LS_GSInfos.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Protos.CS2LS_GSInfos
             * @static
             * @param {Protos.ICS2LS_GSInfos} message CS2LS_GSInfos message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CS2LS_GSInfos.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a CS2LS_GSInfos message from the specified reader or buffer.
             * @function decode
             * @memberof Protos.CS2LS_GSInfos
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Protos.CS2LS_GSInfos} CS2LS_GSInfos
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
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
    
            /**
             * Decodes a CS2LS_GSInfos message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Protos.CS2LS_GSInfos
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Protos.CS2LS_GSInfos} CS2LS_GSInfos
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CS2LS_GSInfos.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a CS2LS_GSInfos message.
             * @function verify
             * @memberof Protos.CS2LS_GSInfos
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
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
    
            /**
             * Creates a CS2LS_GSInfos message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Protos.CS2LS_GSInfos
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Protos.CS2LS_GSInfos} CS2LS_GSInfos
             */
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
    
            /**
             * Creates a plain object from a CS2LS_GSInfos message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Protos.CS2LS_GSInfos
             * @static
             * @param {Protos.CS2LS_GSInfos} message CS2LS_GSInfos
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
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
    
            /**
             * Converts this CS2LS_GSInfos to JSON.
             * @function toJSON
             * @memberof Protos.CS2LS_GSInfos
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            CS2LS_GSInfos.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return CS2LS_GSInfos;
        })();
    
        Protos.CS2LS_GSInfo = (function() {
    
            /**
             * Properties of a CS2LS_GSInfo.
             * @memberof Protos
             * @interface ICS2LS_GSInfo
             * @property {Protos.IMsgOpts|null} [opts] CS2LS_GSInfo opts
             * @property {Protos.IGSInfo|null} [gsInfo] CS2LS_GSInfo gsInfo
             */
    
            /**
             * Constructs a new CS2LS_GSInfo.
             * @memberof Protos
             * @classdesc Represents a CS2LS_GSInfo.
             * @implements ICS2LS_GSInfo
             * @constructor
             * @param {Protos.ICS2LS_GSInfo=} [properties] Properties to set
             */
            function CS2LS_GSInfo(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * CS2LS_GSInfo opts.
             * @member {Protos.IMsgOpts|null|undefined} opts
             * @memberof Protos.CS2LS_GSInfo
             * @instance
             */
            CS2LS_GSInfo.prototype.opts = null;
    
            /**
             * CS2LS_GSInfo gsInfo.
             * @member {Protos.IGSInfo|null|undefined} gsInfo
             * @memberof Protos.CS2LS_GSInfo
             * @instance
             */
            CS2LS_GSInfo.prototype.gsInfo = null;
    
            /**
             * Creates a new CS2LS_GSInfo instance using the specified properties.
             * @function create
             * @memberof Protos.CS2LS_GSInfo
             * @static
             * @param {Protos.ICS2LS_GSInfo=} [properties] Properties to set
             * @returns {Protos.CS2LS_GSInfo} CS2LS_GSInfo instance
             */
            CS2LS_GSInfo.create = function create(properties) {
                return new CS2LS_GSInfo(properties);
            };
    
            /**
             * Encodes the specified CS2LS_GSInfo message. Does not implicitly {@link Protos.CS2LS_GSInfo.verify|verify} messages.
             * @function encode
             * @memberof Protos.CS2LS_GSInfo
             * @static
             * @param {Protos.ICS2LS_GSInfo} message CS2LS_GSInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CS2LS_GSInfo.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.opts != null && message.hasOwnProperty("opts"))
                    $root.Protos.MsgOpts.encode(message.opts, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.gsInfo != null && message.hasOwnProperty("gsInfo"))
                    $root.Protos.GSInfo.encode(message.gsInfo, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified CS2LS_GSInfo message, length delimited. Does not implicitly {@link Protos.CS2LS_GSInfo.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Protos.CS2LS_GSInfo
             * @static
             * @param {Protos.ICS2LS_GSInfo} message CS2LS_GSInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CS2LS_GSInfo.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a CS2LS_GSInfo message from the specified reader or buffer.
             * @function decode
             * @memberof Protos.CS2LS_GSInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Protos.CS2LS_GSInfo} CS2LS_GSInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
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
    
            /**
             * Decodes a CS2LS_GSInfo message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Protos.CS2LS_GSInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Protos.CS2LS_GSInfo} CS2LS_GSInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CS2LS_GSInfo.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a CS2LS_GSInfo message.
             * @function verify
             * @memberof Protos.CS2LS_GSInfo
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
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
    
            /**
             * Creates a CS2LS_GSInfo message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Protos.CS2LS_GSInfo
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Protos.CS2LS_GSInfo} CS2LS_GSInfo
             */
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
    
            /**
             * Creates a plain object from a CS2LS_GSInfo message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Protos.CS2LS_GSInfo
             * @static
             * @param {Protos.CS2LS_GSInfo} message CS2LS_GSInfo
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
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
    
            /**
             * Converts this CS2LS_GSInfo to JSON.
             * @function toJSON
             * @memberof Protos.CS2LS_GSInfo
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            CS2LS_GSInfo.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return CS2LS_GSInfo;
        })();
    
        Protos.CS2LS_GSLost = (function() {
    
            /**
             * Properties of a CS2LS_GSLost.
             * @memberof Protos
             * @interface ICS2LS_GSLost
             * @property {Protos.IMsgOpts|null} [opts] CS2LS_GSLost opts
             * @property {number|null} [gsid] CS2LS_GSLost gsid
             */
    
            /**
             * Constructs a new CS2LS_GSLost.
             * @memberof Protos
             * @classdesc Represents a CS2LS_GSLost.
             * @implements ICS2LS_GSLost
             * @constructor
             * @param {Protos.ICS2LS_GSLost=} [properties] Properties to set
             */
            function CS2LS_GSLost(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * CS2LS_GSLost opts.
             * @member {Protos.IMsgOpts|null|undefined} opts
             * @memberof Protos.CS2LS_GSLost
             * @instance
             */
            CS2LS_GSLost.prototype.opts = null;
    
            /**
             * CS2LS_GSLost gsid.
             * @member {number} gsid
             * @memberof Protos.CS2LS_GSLost
             * @instance
             */
            CS2LS_GSLost.prototype.gsid = 0;
    
            /**
             * Creates a new CS2LS_GSLost instance using the specified properties.
             * @function create
             * @memberof Protos.CS2LS_GSLost
             * @static
             * @param {Protos.ICS2LS_GSLost=} [properties] Properties to set
             * @returns {Protos.CS2LS_GSLost} CS2LS_GSLost instance
             */
            CS2LS_GSLost.create = function create(properties) {
                return new CS2LS_GSLost(properties);
            };
    
            /**
             * Encodes the specified CS2LS_GSLost message. Does not implicitly {@link Protos.CS2LS_GSLost.verify|verify} messages.
             * @function encode
             * @memberof Protos.CS2LS_GSLost
             * @static
             * @param {Protos.ICS2LS_GSLost} message CS2LS_GSLost message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CS2LS_GSLost.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.opts != null && message.hasOwnProperty("opts"))
                    $root.Protos.MsgOpts.encode(message.opts, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.gsid != null && message.hasOwnProperty("gsid"))
                    writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.gsid);
                return writer;
            };
    
            /**
             * Encodes the specified CS2LS_GSLost message, length delimited. Does not implicitly {@link Protos.CS2LS_GSLost.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Protos.CS2LS_GSLost
             * @static
             * @param {Protos.ICS2LS_GSLost} message CS2LS_GSLost message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CS2LS_GSLost.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a CS2LS_GSLost message from the specified reader or buffer.
             * @function decode
             * @memberof Protos.CS2LS_GSLost
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Protos.CS2LS_GSLost} CS2LS_GSLost
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
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
    
            /**
             * Decodes a CS2LS_GSLost message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Protos.CS2LS_GSLost
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Protos.CS2LS_GSLost} CS2LS_GSLost
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CS2LS_GSLost.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a CS2LS_GSLost message.
             * @function verify
             * @memberof Protos.CS2LS_GSLost
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
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
    
            /**
             * Creates a CS2LS_GSLost message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Protos.CS2LS_GSLost
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Protos.CS2LS_GSLost} CS2LS_GSLost
             */
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
    
            /**
             * Creates a plain object from a CS2LS_GSLost message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Protos.CS2LS_GSLost
             * @static
             * @param {Protos.CS2LS_GSLost} message CS2LS_GSLost
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
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
    
            /**
             * Converts this CS2LS_GSLost to JSON.
             * @function toJSON
             * @memberof Protos.CS2LS_GSLost
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            CS2LS_GSLost.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return CS2LS_GSLost;
        })();
    
        Protos.CS2LS_GCLoginRet = (function() {
    
            /**
             * Properties of a CS2LS_GCLoginRet.
             * @memberof Protos
             * @interface ICS2LS_GCLoginRet
             * @property {Protos.IMsgOpts|null} [opts] CS2LS_GCLoginRet opts
             * @property {Protos.CS2LS_GCLoginRet.EResult|null} [result] CS2LS_GCLoginRet result
             */
    
            /**
             * Constructs a new CS2LS_GCLoginRet.
             * @memberof Protos
             * @classdesc Represents a CS2LS_GCLoginRet.
             * @implements ICS2LS_GCLoginRet
             * @constructor
             * @param {Protos.ICS2LS_GCLoginRet=} [properties] Properties to set
             */
            function CS2LS_GCLoginRet(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * CS2LS_GCLoginRet opts.
             * @member {Protos.IMsgOpts|null|undefined} opts
             * @memberof Protos.CS2LS_GCLoginRet
             * @instance
             */
            CS2LS_GCLoginRet.prototype.opts = null;
    
            /**
             * CS2LS_GCLoginRet result.
             * @member {Protos.CS2LS_GCLoginRet.EResult} result
             * @memberof Protos.CS2LS_GCLoginRet
             * @instance
             */
            CS2LS_GCLoginRet.prototype.result = 0;
    
            /**
             * Creates a new CS2LS_GCLoginRet instance using the specified properties.
             * @function create
             * @memberof Protos.CS2LS_GCLoginRet
             * @static
             * @param {Protos.ICS2LS_GCLoginRet=} [properties] Properties to set
             * @returns {Protos.CS2LS_GCLoginRet} CS2LS_GCLoginRet instance
             */
            CS2LS_GCLoginRet.create = function create(properties) {
                return new CS2LS_GCLoginRet(properties);
            };
    
            /**
             * Encodes the specified CS2LS_GCLoginRet message. Does not implicitly {@link Protos.CS2LS_GCLoginRet.verify|verify} messages.
             * @function encode
             * @memberof Protos.CS2LS_GCLoginRet
             * @static
             * @param {Protos.ICS2LS_GCLoginRet} message CS2LS_GCLoginRet message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CS2LS_GCLoginRet.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.opts != null && message.hasOwnProperty("opts"))
                    $root.Protos.MsgOpts.encode(message.opts, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.result != null && message.hasOwnProperty("result"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.result);
                return writer;
            };
    
            /**
             * Encodes the specified CS2LS_GCLoginRet message, length delimited. Does not implicitly {@link Protos.CS2LS_GCLoginRet.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Protos.CS2LS_GCLoginRet
             * @static
             * @param {Protos.ICS2LS_GCLoginRet} message CS2LS_GCLoginRet message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CS2LS_GCLoginRet.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a CS2LS_GCLoginRet message from the specified reader or buffer.
             * @function decode
             * @memberof Protos.CS2LS_GCLoginRet
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Protos.CS2LS_GCLoginRet} CS2LS_GCLoginRet
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
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
    
            /**
             * Decodes a CS2LS_GCLoginRet message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Protos.CS2LS_GCLoginRet
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Protos.CS2LS_GCLoginRet} CS2LS_GCLoginRet
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CS2LS_GCLoginRet.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a CS2LS_GCLoginRet message.
             * @function verify
             * @memberof Protos.CS2LS_GCLoginRet
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
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
    
            /**
             * Creates a CS2LS_GCLoginRet message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Protos.CS2LS_GCLoginRet
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Protos.CS2LS_GCLoginRet} CS2LS_GCLoginRet
             */
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
    
            /**
             * Creates a plain object from a CS2LS_GCLoginRet message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Protos.CS2LS_GCLoginRet
             * @static
             * @param {Protos.CS2LS_GCLoginRet} message CS2LS_GCLoginRet
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
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
    
            /**
             * Converts this CS2LS_GCLoginRet to JSON.
             * @function toJSON
             * @memberof Protos.CS2LS_GCLoginRet
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            CS2LS_GCLoginRet.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * EResult enum.
             * @name Protos.CS2LS_GCLoginRet.EResult
             * @enum {string}
             * @property {number} Success=0 Success value
             * @property {number} Failed=1 Failed value
             */
            CS2LS_GCLoginRet.EResult = (function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "Success"] = 0;
                values[valuesById[1] = "Failed"] = 1;
                return values;
            })();
    
            return CS2LS_GCLoginRet;
        })();
    
        Protos.GSInfo = (function() {
    
            /**
             * Properties of a GSInfo.
             * @memberof Protos
             * @interface IGSInfo
             * @property {number|null} [id] GSInfo id
             * @property {string|null} [name] GSInfo name
             * @property {string|null} [ip] GSInfo ip
             * @property {number|null} [port] GSInfo port
             * @property {string|null} [password] GSInfo password
             * @property {Protos.GSInfo.State|null} [state] GSInfo state
             */
    
            /**
             * Constructs a new GSInfo.
             * @memberof Protos
             * @classdesc Represents a GSInfo.
             * @implements IGSInfo
             * @constructor
             * @param {Protos.IGSInfo=} [properties] Properties to set
             */
            function GSInfo(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * GSInfo id.
             * @member {number} id
             * @memberof Protos.GSInfo
             * @instance
             */
            GSInfo.prototype.id = 0;
    
            /**
             * GSInfo name.
             * @member {string} name
             * @memberof Protos.GSInfo
             * @instance
             */
            GSInfo.prototype.name = "";
    
            /**
             * GSInfo ip.
             * @member {string} ip
             * @memberof Protos.GSInfo
             * @instance
             */
            GSInfo.prototype.ip = "";
    
            /**
             * GSInfo port.
             * @member {number} port
             * @memberof Protos.GSInfo
             * @instance
             */
            GSInfo.prototype.port = 0;
    
            /**
             * GSInfo password.
             * @member {string} password
             * @memberof Protos.GSInfo
             * @instance
             */
            GSInfo.prototype.password = "";
    
            /**
             * GSInfo state.
             * @member {Protos.GSInfo.State} state
             * @memberof Protos.GSInfo
             * @instance
             */
            GSInfo.prototype.state = 0;
    
            /**
             * Creates a new GSInfo instance using the specified properties.
             * @function create
             * @memberof Protos.GSInfo
             * @static
             * @param {Protos.IGSInfo=} [properties] Properties to set
             * @returns {Protos.GSInfo} GSInfo instance
             */
            GSInfo.create = function create(properties) {
                return new GSInfo(properties);
            };
    
            /**
             * Encodes the specified GSInfo message. Does not implicitly {@link Protos.GSInfo.verify|verify} messages.
             * @function encode
             * @memberof Protos.GSInfo
             * @static
             * @param {Protos.IGSInfo} message GSInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GSInfo.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.id != null && message.hasOwnProperty("id"))
                    writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.id);
                if (message.name != null && message.hasOwnProperty("name"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
                if (message.ip != null && message.hasOwnProperty("ip"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.ip);
                if (message.port != null && message.hasOwnProperty("port"))
                    writer.uint32(/* id 4, wireType 0 =*/32).int32(message.port);
                if (message.password != null && message.hasOwnProperty("password"))
                    writer.uint32(/* id 5, wireType 2 =*/42).string(message.password);
                if (message.state != null && message.hasOwnProperty("state"))
                    writer.uint32(/* id 6, wireType 0 =*/48).int32(message.state);
                return writer;
            };
    
            /**
             * Encodes the specified GSInfo message, length delimited. Does not implicitly {@link Protos.GSInfo.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Protos.GSInfo
             * @static
             * @param {Protos.IGSInfo} message GSInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GSInfo.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a GSInfo message from the specified reader or buffer.
             * @function decode
             * @memberof Protos.GSInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Protos.GSInfo} GSInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
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
    
            /**
             * Decodes a GSInfo message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Protos.GSInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Protos.GSInfo} GSInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GSInfo.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a GSInfo message.
             * @function verify
             * @memberof Protos.GSInfo
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
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
    
            /**
             * Creates a GSInfo message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Protos.GSInfo
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Protos.GSInfo} GSInfo
             */
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
    
            /**
             * Creates a plain object from a GSInfo message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Protos.GSInfo
             * @static
             * @param {Protos.GSInfo} message GSInfo
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
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
    
            /**
             * Converts this GSInfo to JSON.
             * @function toJSON
             * @memberof Protos.GSInfo
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GSInfo.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * State enum.
             * @name Protos.GSInfo.State
             * @enum {string}
             * @property {number} Free=0 Free value
             * @property {number} Busy=1 Busy value
             * @property {number} Full=2 Full value
             * @property {number} Close=3 Close value
             */
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
    
            /**
             * Properties of a GS2CS_ReportState.
             * @memberof Protos
             * @interface IGS2CS_ReportState
             * @property {Protos.IMsgOpts|null} [opts] GS2CS_ReportState opts
             * @property {Protos.IGSInfo|null} [gsInfo] GS2CS_ReportState gsInfo
             */
    
            /**
             * Constructs a new GS2CS_ReportState.
             * @memberof Protos
             * @classdesc Represents a GS2CS_ReportState.
             * @implements IGS2CS_ReportState
             * @constructor
             * @param {Protos.IGS2CS_ReportState=} [properties] Properties to set
             */
            function GS2CS_ReportState(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * GS2CS_ReportState opts.
             * @member {Protos.IMsgOpts|null|undefined} opts
             * @memberof Protos.GS2CS_ReportState
             * @instance
             */
            GS2CS_ReportState.prototype.opts = null;
    
            /**
             * GS2CS_ReportState gsInfo.
             * @member {Protos.IGSInfo|null|undefined} gsInfo
             * @memberof Protos.GS2CS_ReportState
             * @instance
             */
            GS2CS_ReportState.prototype.gsInfo = null;
    
            /**
             * Creates a new GS2CS_ReportState instance using the specified properties.
             * @function create
             * @memberof Protos.GS2CS_ReportState
             * @static
             * @param {Protos.IGS2CS_ReportState=} [properties] Properties to set
             * @returns {Protos.GS2CS_ReportState} GS2CS_ReportState instance
             */
            GS2CS_ReportState.create = function create(properties) {
                return new GS2CS_ReportState(properties);
            };
    
            /**
             * Encodes the specified GS2CS_ReportState message. Does not implicitly {@link Protos.GS2CS_ReportState.verify|verify} messages.
             * @function encode
             * @memberof Protos.GS2CS_ReportState
             * @static
             * @param {Protos.IGS2CS_ReportState} message GS2CS_ReportState message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GS2CS_ReportState.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.opts != null && message.hasOwnProperty("opts"))
                    $root.Protos.MsgOpts.encode(message.opts, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.gsInfo != null && message.hasOwnProperty("gsInfo"))
                    $root.Protos.GSInfo.encode(message.gsInfo, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified GS2CS_ReportState message, length delimited. Does not implicitly {@link Protos.GS2CS_ReportState.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Protos.GS2CS_ReportState
             * @static
             * @param {Protos.IGS2CS_ReportState} message GS2CS_ReportState message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GS2CS_ReportState.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a GS2CS_ReportState message from the specified reader or buffer.
             * @function decode
             * @memberof Protos.GS2CS_ReportState
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Protos.GS2CS_ReportState} GS2CS_ReportState
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
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
    
            /**
             * Decodes a GS2CS_ReportState message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Protos.GS2CS_ReportState
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Protos.GS2CS_ReportState} GS2CS_ReportState
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GS2CS_ReportState.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a GS2CS_ReportState message.
             * @function verify
             * @memberof Protos.GS2CS_ReportState
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
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
    
            /**
             * Creates a GS2CS_ReportState message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Protos.GS2CS_ReportState
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Protos.GS2CS_ReportState} GS2CS_ReportState
             */
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
    
            /**
             * Creates a plain object from a GS2CS_ReportState message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Protos.GS2CS_ReportState
             * @static
             * @param {Protos.GS2CS_ReportState} message GS2CS_ReportState
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
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
    
            /**
             * Converts this GS2CS_ReportState to JSON.
             * @function toJSON
             * @memberof Protos.GS2CS_ReportState
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GS2CS_ReportState.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return GS2CS_ReportState;
        })();
    
        Protos.GS2CS_GCAskLogin = (function() {
    
            /**
             * Properties of a GS2CS_GCAskLogin.
             * @memberof Protos
             * @interface IGS2CS_GCAskLogin
             * @property {Protos.IMsgOpts|null} [opts] GS2CS_GCAskLogin opts
             * @property {Long|null} [sessionID] GS2CS_GCAskLogin sessionID
             */
    
            /**
             * Constructs a new GS2CS_GCAskLogin.
             * @memberof Protos
             * @classdesc Represents a GS2CS_GCAskLogin.
             * @implements IGS2CS_GCAskLogin
             * @constructor
             * @param {Protos.IGS2CS_GCAskLogin=} [properties] Properties to set
             */
            function GS2CS_GCAskLogin(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * GS2CS_GCAskLogin opts.
             * @member {Protos.IMsgOpts|null|undefined} opts
             * @memberof Protos.GS2CS_GCAskLogin
             * @instance
             */
            GS2CS_GCAskLogin.prototype.opts = null;
    
            /**
             * GS2CS_GCAskLogin sessionID.
             * @member {Long} sessionID
             * @memberof Protos.GS2CS_GCAskLogin
             * @instance
             */
            GS2CS_GCAskLogin.prototype.sessionID = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
    
            /**
             * Creates a new GS2CS_GCAskLogin instance using the specified properties.
             * @function create
             * @memberof Protos.GS2CS_GCAskLogin
             * @static
             * @param {Protos.IGS2CS_GCAskLogin=} [properties] Properties to set
             * @returns {Protos.GS2CS_GCAskLogin} GS2CS_GCAskLogin instance
             */
            GS2CS_GCAskLogin.create = function create(properties) {
                return new GS2CS_GCAskLogin(properties);
            };
    
            /**
             * Encodes the specified GS2CS_GCAskLogin message. Does not implicitly {@link Protos.GS2CS_GCAskLogin.verify|verify} messages.
             * @function encode
             * @memberof Protos.GS2CS_GCAskLogin
             * @static
             * @param {Protos.IGS2CS_GCAskLogin} message GS2CS_GCAskLogin message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GS2CS_GCAskLogin.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.opts != null && message.hasOwnProperty("opts"))
                    $root.Protos.MsgOpts.encode(message.opts, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.sessionID != null && message.hasOwnProperty("sessionID"))
                    writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.sessionID);
                return writer;
            };
    
            /**
             * Encodes the specified GS2CS_GCAskLogin message, length delimited. Does not implicitly {@link Protos.GS2CS_GCAskLogin.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Protos.GS2CS_GCAskLogin
             * @static
             * @param {Protos.IGS2CS_GCAskLogin} message GS2CS_GCAskLogin message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GS2CS_GCAskLogin.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a GS2CS_GCAskLogin message from the specified reader or buffer.
             * @function decode
             * @memberof Protos.GS2CS_GCAskLogin
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Protos.GS2CS_GCAskLogin} GS2CS_GCAskLogin
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
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
    
            /**
             * Decodes a GS2CS_GCAskLogin message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Protos.GS2CS_GCAskLogin
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Protos.GS2CS_GCAskLogin} GS2CS_GCAskLogin
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GS2CS_GCAskLogin.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a GS2CS_GCAskLogin message.
             * @function verify
             * @memberof Protos.GS2CS_GCAskLogin
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
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
    
            /**
             * Creates a GS2CS_GCAskLogin message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Protos.GS2CS_GCAskLogin
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Protos.GS2CS_GCAskLogin} GS2CS_GCAskLogin
             */
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
    
            /**
             * Creates a plain object from a GS2CS_GCAskLogin message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Protos.GS2CS_GCAskLogin
             * @static
             * @param {Protos.GS2CS_GCAskLogin} message GS2CS_GCAskLogin
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
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
    
            /**
             * Converts this GS2CS_GCAskLogin to JSON.
             * @function toJSON
             * @memberof Protos.GS2CS_GCAskLogin
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GS2CS_GCAskLogin.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return GS2CS_GCAskLogin;
        })();
    
        Protos.GS2CS_GCLost = (function() {
    
            /**
             * Properties of a GS2CS_GCLost.
             * @memberof Protos
             * @interface IGS2CS_GCLost
             * @property {Protos.IMsgOpts|null} [opts] GS2CS_GCLost opts
             * @property {Long|null} [sessionID] GS2CS_GCLost sessionID
             */
    
            /**
             * Constructs a new GS2CS_GCLost.
             * @memberof Protos
             * @classdesc Represents a GS2CS_GCLost.
             * @implements IGS2CS_GCLost
             * @constructor
             * @param {Protos.IGS2CS_GCLost=} [properties] Properties to set
             */
            function GS2CS_GCLost(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * GS2CS_GCLost opts.
             * @member {Protos.IMsgOpts|null|undefined} opts
             * @memberof Protos.GS2CS_GCLost
             * @instance
             */
            GS2CS_GCLost.prototype.opts = null;
    
            /**
             * GS2CS_GCLost sessionID.
             * @member {Long} sessionID
             * @memberof Protos.GS2CS_GCLost
             * @instance
             */
            GS2CS_GCLost.prototype.sessionID = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
    
            /**
             * Creates a new GS2CS_GCLost instance using the specified properties.
             * @function create
             * @memberof Protos.GS2CS_GCLost
             * @static
             * @param {Protos.IGS2CS_GCLost=} [properties] Properties to set
             * @returns {Protos.GS2CS_GCLost} GS2CS_GCLost instance
             */
            GS2CS_GCLost.create = function create(properties) {
                return new GS2CS_GCLost(properties);
            };
    
            /**
             * Encodes the specified GS2CS_GCLost message. Does not implicitly {@link Protos.GS2CS_GCLost.verify|verify} messages.
             * @function encode
             * @memberof Protos.GS2CS_GCLost
             * @static
             * @param {Protos.IGS2CS_GCLost} message GS2CS_GCLost message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GS2CS_GCLost.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.opts != null && message.hasOwnProperty("opts"))
                    $root.Protos.MsgOpts.encode(message.opts, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.sessionID != null && message.hasOwnProperty("sessionID"))
                    writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.sessionID);
                return writer;
            };
    
            /**
             * Encodes the specified GS2CS_GCLost message, length delimited. Does not implicitly {@link Protos.GS2CS_GCLost.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Protos.GS2CS_GCLost
             * @static
             * @param {Protos.IGS2CS_GCLost} message GS2CS_GCLost message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GS2CS_GCLost.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a GS2CS_GCLost message from the specified reader or buffer.
             * @function decode
             * @memberof Protos.GS2CS_GCLost
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Protos.GS2CS_GCLost} GS2CS_GCLost
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
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
    
            /**
             * Decodes a GS2CS_GCLost message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Protos.GS2CS_GCLost
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Protos.GS2CS_GCLost} GS2CS_GCLost
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GS2CS_GCLost.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a GS2CS_GCLost message.
             * @function verify
             * @memberof Protos.GS2CS_GCLost
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
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
    
            /**
             * Creates a GS2CS_GCLost message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Protos.GS2CS_GCLost
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Protos.GS2CS_GCLost} GS2CS_GCLost
             */
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
    
            /**
             * Creates a plain object from a GS2CS_GCLost message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Protos.GS2CS_GCLost
             * @static
             * @param {Protos.GS2CS_GCLost} message GS2CS_GCLost
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
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
    
            /**
             * Converts this GS2CS_GCLost to JSON.
             * @function toJSON
             * @memberof Protos.GS2CS_GCLost
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GS2CS_GCLost.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return GS2CS_GCLost;
        })();
    
        Protos.GS2CS_KickGCRet = (function() {
    
            /**
             * Properties of a GS2CS_KickGCRet.
             * @memberof Protos
             * @interface IGS2CS_KickGCRet
             * @property {Protos.IMsgOpts|null} [opts] GS2CS_KickGCRet opts
             * @property {Protos.Global.ECommon|null} [result] GS2CS_KickGCRet result
             */
    
            /**
             * Constructs a new GS2CS_KickGCRet.
             * @memberof Protos
             * @classdesc Represents a GS2CS_KickGCRet.
             * @implements IGS2CS_KickGCRet
             * @constructor
             * @param {Protos.IGS2CS_KickGCRet=} [properties] Properties to set
             */
            function GS2CS_KickGCRet(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * GS2CS_KickGCRet opts.
             * @member {Protos.IMsgOpts|null|undefined} opts
             * @memberof Protos.GS2CS_KickGCRet
             * @instance
             */
            GS2CS_KickGCRet.prototype.opts = null;
    
            /**
             * GS2CS_KickGCRet result.
             * @member {Protos.Global.ECommon} result
             * @memberof Protos.GS2CS_KickGCRet
             * @instance
             */
            GS2CS_KickGCRet.prototype.result = 0;
    
            /**
             * Creates a new GS2CS_KickGCRet instance using the specified properties.
             * @function create
             * @memberof Protos.GS2CS_KickGCRet
             * @static
             * @param {Protos.IGS2CS_KickGCRet=} [properties] Properties to set
             * @returns {Protos.GS2CS_KickGCRet} GS2CS_KickGCRet instance
             */
            GS2CS_KickGCRet.create = function create(properties) {
                return new GS2CS_KickGCRet(properties);
            };
    
            /**
             * Encodes the specified GS2CS_KickGCRet message. Does not implicitly {@link Protos.GS2CS_KickGCRet.verify|verify} messages.
             * @function encode
             * @memberof Protos.GS2CS_KickGCRet
             * @static
             * @param {Protos.IGS2CS_KickGCRet} message GS2CS_KickGCRet message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GS2CS_KickGCRet.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.opts != null && message.hasOwnProperty("opts"))
                    $root.Protos.MsgOpts.encode(message.opts, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.result != null && message.hasOwnProperty("result"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.result);
                return writer;
            };
    
            /**
             * Encodes the specified GS2CS_KickGCRet message, length delimited. Does not implicitly {@link Protos.GS2CS_KickGCRet.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Protos.GS2CS_KickGCRet
             * @static
             * @param {Protos.IGS2CS_KickGCRet} message GS2CS_KickGCRet message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GS2CS_KickGCRet.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a GS2CS_KickGCRet message from the specified reader or buffer.
             * @function decode
             * @memberof Protos.GS2CS_KickGCRet
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Protos.GS2CS_KickGCRet} GS2CS_KickGCRet
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GS2CS_KickGCRet.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protos.GS2CS_KickGCRet();
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
    
            /**
             * Decodes a GS2CS_KickGCRet message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Protos.GS2CS_KickGCRet
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Protos.GS2CS_KickGCRet} GS2CS_KickGCRet
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GS2CS_KickGCRet.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a GS2CS_KickGCRet message.
             * @function verify
             * @memberof Protos.GS2CS_KickGCRet
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            GS2CS_KickGCRet.verify = function verify(message) {
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
    
            /**
             * Creates a GS2CS_KickGCRet message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Protos.GS2CS_KickGCRet
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Protos.GS2CS_KickGCRet} GS2CS_KickGCRet
             */
            GS2CS_KickGCRet.fromObject = function fromObject(object) {
                if (object instanceof $root.Protos.GS2CS_KickGCRet)
                    return object;
                var message = new $root.Protos.GS2CS_KickGCRet();
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
    
            /**
             * Creates a plain object from a GS2CS_KickGCRet message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Protos.GS2CS_KickGCRet
             * @static
             * @param {Protos.GS2CS_KickGCRet} message GS2CS_KickGCRet
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GS2CS_KickGCRet.toObject = function toObject(message, options) {
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
    
            /**
             * Converts this GS2CS_KickGCRet to JSON.
             * @function toJSON
             * @memberof Protos.GS2CS_KickGCRet
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GS2CS_KickGCRet.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return GS2CS_KickGCRet;
        })();
    
        /**
         * DB2LS_QueryResult enum.
         * @name Protos.DB2LS_QueryResult
         * @enum {string}
         * @property {number} Success=0 Success value
         * @property {number} Failed=1 Failed value
         * @property {number} UsernameExist=2 UsernameExist value
         * @property {number} InvalidUname=3 InvalidUname value
         * @property {number} InvalidPwd=4 InvalidPwd value
         */
        Protos.DB2LS_QueryResult = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "Success"] = 0;
            values[valuesById[1] = "Failed"] = 1;
            values[valuesById[2] = "UsernameExist"] = 2;
            values[valuesById[3] = "InvalidUname"] = 3;
            values[valuesById[4] = "InvalidPwd"] = 4;
            return values;
        })();
    
        Protos.DB2LS_QueryAccountRet = (function() {
    
            /**
             * Properties of a DB2LS_QueryAccountRet.
             * @memberof Protos
             * @interface IDB2LS_QueryAccountRet
             * @property {Protos.IMsgOpts|null} [opts] DB2LS_QueryAccountRet opts
             * @property {Protos.DB2LS_QueryResult|null} [result] DB2LS_QueryAccountRet result
             */
    
            /**
             * Constructs a new DB2LS_QueryAccountRet.
             * @memberof Protos
             * @classdesc Represents a DB2LS_QueryAccountRet.
             * @implements IDB2LS_QueryAccountRet
             * @constructor
             * @param {Protos.IDB2LS_QueryAccountRet=} [properties] Properties to set
             */
            function DB2LS_QueryAccountRet(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * DB2LS_QueryAccountRet opts.
             * @member {Protos.IMsgOpts|null|undefined} opts
             * @memberof Protos.DB2LS_QueryAccountRet
             * @instance
             */
            DB2LS_QueryAccountRet.prototype.opts = null;
    
            /**
             * DB2LS_QueryAccountRet result.
             * @member {Protos.DB2LS_QueryResult} result
             * @memberof Protos.DB2LS_QueryAccountRet
             * @instance
             */
            DB2LS_QueryAccountRet.prototype.result = 0;
    
            /**
             * Creates a new DB2LS_QueryAccountRet instance using the specified properties.
             * @function create
             * @memberof Protos.DB2LS_QueryAccountRet
             * @static
             * @param {Protos.IDB2LS_QueryAccountRet=} [properties] Properties to set
             * @returns {Protos.DB2LS_QueryAccountRet} DB2LS_QueryAccountRet instance
             */
            DB2LS_QueryAccountRet.create = function create(properties) {
                return new DB2LS_QueryAccountRet(properties);
            };
    
            /**
             * Encodes the specified DB2LS_QueryAccountRet message. Does not implicitly {@link Protos.DB2LS_QueryAccountRet.verify|verify} messages.
             * @function encode
             * @memberof Protos.DB2LS_QueryAccountRet
             * @static
             * @param {Protos.IDB2LS_QueryAccountRet} message DB2LS_QueryAccountRet message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DB2LS_QueryAccountRet.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.opts != null && message.hasOwnProperty("opts"))
                    $root.Protos.MsgOpts.encode(message.opts, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.result != null && message.hasOwnProperty("result"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.result);
                return writer;
            };
    
            /**
             * Encodes the specified DB2LS_QueryAccountRet message, length delimited. Does not implicitly {@link Protos.DB2LS_QueryAccountRet.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Protos.DB2LS_QueryAccountRet
             * @static
             * @param {Protos.IDB2LS_QueryAccountRet} message DB2LS_QueryAccountRet message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DB2LS_QueryAccountRet.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a DB2LS_QueryAccountRet message from the specified reader or buffer.
             * @function decode
             * @memberof Protos.DB2LS_QueryAccountRet
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Protos.DB2LS_QueryAccountRet} DB2LS_QueryAccountRet
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
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
    
            /**
             * Decodes a DB2LS_QueryAccountRet message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Protos.DB2LS_QueryAccountRet
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Protos.DB2LS_QueryAccountRet} DB2LS_QueryAccountRet
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DB2LS_QueryAccountRet.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a DB2LS_QueryAccountRet message.
             * @function verify
             * @memberof Protos.DB2LS_QueryAccountRet
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
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
                    case 2:
                    case 3:
                    case 4:
                        break;
                    }
                return null;
            };
    
            /**
             * Creates a DB2LS_QueryAccountRet message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Protos.DB2LS_QueryAccountRet
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Protos.DB2LS_QueryAccountRet} DB2LS_QueryAccountRet
             */
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
    
            /**
             * Creates a plain object from a DB2LS_QueryAccountRet message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Protos.DB2LS_QueryAccountRet
             * @static
             * @param {Protos.DB2LS_QueryAccountRet} message DB2LS_QueryAccountRet
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
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
                    object.result = options.enums === String ? $root.Protos.DB2LS_QueryResult[message.result] : message.result;
                return object;
            };
    
            /**
             * Converts this DB2LS_QueryAccountRet to JSON.
             * @function toJSON
             * @memberof Protos.DB2LS_QueryAccountRet
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            DB2LS_QueryAccountRet.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return DB2LS_QueryAccountRet;
        })();
    
        Protos.DB2LS_QueryLoginRet = (function() {
    
            /**
             * Properties of a DB2LS_QueryLoginRet.
             * @memberof Protos
             * @interface IDB2LS_QueryLoginRet
             * @property {Protos.IMsgOpts|null} [opts] DB2LS_QueryLoginRet opts
             * @property {Protos.DB2LS_QueryResult|null} [result] DB2LS_QueryLoginRet result
             * @property {number|null} [ukey] DB2LS_QueryLoginRet ukey
             */
    
            /**
             * Constructs a new DB2LS_QueryLoginRet.
             * @memberof Protos
             * @classdesc Represents a DB2LS_QueryLoginRet.
             * @implements IDB2LS_QueryLoginRet
             * @constructor
             * @param {Protos.IDB2LS_QueryLoginRet=} [properties] Properties to set
             */
            function DB2LS_QueryLoginRet(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * DB2LS_QueryLoginRet opts.
             * @member {Protos.IMsgOpts|null|undefined} opts
             * @memberof Protos.DB2LS_QueryLoginRet
             * @instance
             */
            DB2LS_QueryLoginRet.prototype.opts = null;
    
            /**
             * DB2LS_QueryLoginRet result.
             * @member {Protos.DB2LS_QueryResult} result
             * @memberof Protos.DB2LS_QueryLoginRet
             * @instance
             */
            DB2LS_QueryLoginRet.prototype.result = 0;
    
            /**
             * DB2LS_QueryLoginRet ukey.
             * @member {number} ukey
             * @memberof Protos.DB2LS_QueryLoginRet
             * @instance
             */
            DB2LS_QueryLoginRet.prototype.ukey = 0;
    
            /**
             * Creates a new DB2LS_QueryLoginRet instance using the specified properties.
             * @function create
             * @memberof Protos.DB2LS_QueryLoginRet
             * @static
             * @param {Protos.IDB2LS_QueryLoginRet=} [properties] Properties to set
             * @returns {Protos.DB2LS_QueryLoginRet} DB2LS_QueryLoginRet instance
             */
            DB2LS_QueryLoginRet.create = function create(properties) {
                return new DB2LS_QueryLoginRet(properties);
            };
    
            /**
             * Encodes the specified DB2LS_QueryLoginRet message. Does not implicitly {@link Protos.DB2LS_QueryLoginRet.verify|verify} messages.
             * @function encode
             * @memberof Protos.DB2LS_QueryLoginRet
             * @static
             * @param {Protos.IDB2LS_QueryLoginRet} message DB2LS_QueryLoginRet message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DB2LS_QueryLoginRet.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.opts != null && message.hasOwnProperty("opts"))
                    $root.Protos.MsgOpts.encode(message.opts, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.result != null && message.hasOwnProperty("result"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.result);
                if (message.ukey != null && message.hasOwnProperty("ukey"))
                    writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.ukey);
                return writer;
            };
    
            /**
             * Encodes the specified DB2LS_QueryLoginRet message, length delimited. Does not implicitly {@link Protos.DB2LS_QueryLoginRet.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Protos.DB2LS_QueryLoginRet
             * @static
             * @param {Protos.IDB2LS_QueryLoginRet} message DB2LS_QueryLoginRet message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DB2LS_QueryLoginRet.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a DB2LS_QueryLoginRet message from the specified reader or buffer.
             * @function decode
             * @memberof Protos.DB2LS_QueryLoginRet
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Protos.DB2LS_QueryLoginRet} DB2LS_QueryLoginRet
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
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
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a DB2LS_QueryLoginRet message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Protos.DB2LS_QueryLoginRet
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Protos.DB2LS_QueryLoginRet} DB2LS_QueryLoginRet
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DB2LS_QueryLoginRet.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a DB2LS_QueryLoginRet message.
             * @function verify
             * @memberof Protos.DB2LS_QueryLoginRet
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
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
    
            /**
             * Creates a DB2LS_QueryLoginRet message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Protos.DB2LS_QueryLoginRet
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Protos.DB2LS_QueryLoginRet} DB2LS_QueryLoginRet
             */
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
    
            /**
             * Creates a plain object from a DB2LS_QueryLoginRet message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Protos.DB2LS_QueryLoginRet
             * @static
             * @param {Protos.DB2LS_QueryLoginRet} message DB2LS_QueryLoginRet
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            DB2LS_QueryLoginRet.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
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
    
            /**
             * Converts this DB2LS_QueryLoginRet to JSON.
             * @function toJSON
             * @memberof Protos.DB2LS_QueryLoginRet
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            DB2LS_QueryLoginRet.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return DB2LS_QueryLoginRet;
        })();
    
        Protos.DB2LS_ExecRet = (function() {
    
            /**
             * Properties of a DB2LS_ExecRet.
             * @memberof Protos
             * @interface IDB2LS_ExecRet
             * @property {Protos.IMsgOpts|null} [opts] DB2LS_ExecRet opts
             * @property {Protos.DB2LS_QueryResult|null} [result] DB2LS_ExecRet result
             * @property {number|null} [row] DB2LS_ExecRet row
             * @property {Long|null} [id] DB2LS_ExecRet id
             */
    
            /**
             * Constructs a new DB2LS_ExecRet.
             * @memberof Protos
             * @classdesc Represents a DB2LS_ExecRet.
             * @implements IDB2LS_ExecRet
             * @constructor
             * @param {Protos.IDB2LS_ExecRet=} [properties] Properties to set
             */
            function DB2LS_ExecRet(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * DB2LS_ExecRet opts.
             * @member {Protos.IMsgOpts|null|undefined} opts
             * @memberof Protos.DB2LS_ExecRet
             * @instance
             */
            DB2LS_ExecRet.prototype.opts = null;
    
            /**
             * DB2LS_ExecRet result.
             * @member {Protos.DB2LS_QueryResult} result
             * @memberof Protos.DB2LS_ExecRet
             * @instance
             */
            DB2LS_ExecRet.prototype.result = 0;
    
            /**
             * DB2LS_ExecRet row.
             * @member {number} row
             * @memberof Protos.DB2LS_ExecRet
             * @instance
             */
            DB2LS_ExecRet.prototype.row = 0;
    
            /**
             * DB2LS_ExecRet id.
             * @member {Long} id
             * @memberof Protos.DB2LS_ExecRet
             * @instance
             */
            DB2LS_ExecRet.prototype.id = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
            /**
             * Creates a new DB2LS_ExecRet instance using the specified properties.
             * @function create
             * @memberof Protos.DB2LS_ExecRet
             * @static
             * @param {Protos.IDB2LS_ExecRet=} [properties] Properties to set
             * @returns {Protos.DB2LS_ExecRet} DB2LS_ExecRet instance
             */
            DB2LS_ExecRet.create = function create(properties) {
                return new DB2LS_ExecRet(properties);
            };
    
            /**
             * Encodes the specified DB2LS_ExecRet message. Does not implicitly {@link Protos.DB2LS_ExecRet.verify|verify} messages.
             * @function encode
             * @memberof Protos.DB2LS_ExecRet
             * @static
             * @param {Protos.IDB2LS_ExecRet} message DB2LS_ExecRet message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DB2LS_ExecRet.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.opts != null && message.hasOwnProperty("opts"))
                    $root.Protos.MsgOpts.encode(message.opts, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.result != null && message.hasOwnProperty("result"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.result);
                if (message.row != null && message.hasOwnProperty("row"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.row);
                if (message.id != null && message.hasOwnProperty("id"))
                    writer.uint32(/* id 4, wireType 0 =*/32).int64(message.id);
                return writer;
            };
    
            /**
             * Encodes the specified DB2LS_ExecRet message, length delimited. Does not implicitly {@link Protos.DB2LS_ExecRet.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Protos.DB2LS_ExecRet
             * @static
             * @param {Protos.IDB2LS_ExecRet} message DB2LS_ExecRet message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DB2LS_ExecRet.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a DB2LS_ExecRet message from the specified reader or buffer.
             * @function decode
             * @memberof Protos.DB2LS_ExecRet
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Protos.DB2LS_ExecRet} DB2LS_ExecRet
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
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
                        message.id = reader.int64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a DB2LS_ExecRet message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Protos.DB2LS_ExecRet
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Protos.DB2LS_ExecRet} DB2LS_ExecRet
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DB2LS_ExecRet.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a DB2LS_ExecRet message.
             * @function verify
             * @memberof Protos.DB2LS_ExecRet
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
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
    
            /**
             * Creates a DB2LS_ExecRet message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Protos.DB2LS_ExecRet
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Protos.DB2LS_ExecRet} DB2LS_ExecRet
             */
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
    
            /**
             * Creates a plain object from a DB2LS_ExecRet message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Protos.DB2LS_ExecRet
             * @static
             * @param {Protos.DB2LS_ExecRet} message DB2LS_ExecRet
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            DB2LS_ExecRet.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.opts = null;
                    object.result = options.enums === String ? "Success" : 0;
                    object.row = 0;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
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
    
            /**
             * Converts this DB2LS_ExecRet to JSON.
             * @function toJSON
             * @memberof Protos.DB2LS_ExecRet
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            DB2LS_ExecRet.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return DB2LS_ExecRet;
        })();
    
        Protos.GC2BS_AskLogin = (function() {
    
            /**
             * Properties of a GC2BS_AskLogin.
             * @memberof Protos
             * @interface IGC2BS_AskLogin
             * @property {Protos.IMsgOpts|null} [opts] GC2BS_AskLogin opts
             * @property {string|null} [pwd] GC2BS_AskLogin pwd
             * @property {Long|null} [sessionID] GC2BS_AskLogin sessionID
             */
    
            /**
             * Constructs a new GC2BS_AskLogin.
             * @memberof Protos
             * @classdesc Represents a GC2BS_AskLogin.
             * @implements IGC2BS_AskLogin
             * @constructor
             * @param {Protos.IGC2BS_AskLogin=} [properties] Properties to set
             */
            function GC2BS_AskLogin(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * GC2BS_AskLogin opts.
             * @member {Protos.IMsgOpts|null|undefined} opts
             * @memberof Protos.GC2BS_AskLogin
             * @instance
             */
            GC2BS_AskLogin.prototype.opts = null;
    
            /**
             * GC2BS_AskLogin pwd.
             * @member {string} pwd
             * @memberof Protos.GC2BS_AskLogin
             * @instance
             */
            GC2BS_AskLogin.prototype.pwd = "";
    
            /**
             * GC2BS_AskLogin sessionID.
             * @member {Long} sessionID
             * @memberof Protos.GC2BS_AskLogin
             * @instance
             */
            GC2BS_AskLogin.prototype.sessionID = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
    
            /**
             * Creates a new GC2BS_AskLogin instance using the specified properties.
             * @function create
             * @memberof Protos.GC2BS_AskLogin
             * @static
             * @param {Protos.IGC2BS_AskLogin=} [properties] Properties to set
             * @returns {Protos.GC2BS_AskLogin} GC2BS_AskLogin instance
             */
            GC2BS_AskLogin.create = function create(properties) {
                return new GC2BS_AskLogin(properties);
            };
    
            /**
             * Encodes the specified GC2BS_AskLogin message. Does not implicitly {@link Protos.GC2BS_AskLogin.verify|verify} messages.
             * @function encode
             * @memberof Protos.GC2BS_AskLogin
             * @static
             * @param {Protos.IGC2BS_AskLogin} message GC2BS_AskLogin message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GC2BS_AskLogin.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.opts != null && message.hasOwnProperty("opts"))
                    $root.Protos.MsgOpts.encode(message.opts, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.pwd != null && message.hasOwnProperty("pwd"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.pwd);
                if (message.sessionID != null && message.hasOwnProperty("sessionID"))
                    writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.sessionID);
                return writer;
            };
    
            /**
             * Encodes the specified GC2BS_AskLogin message, length delimited. Does not implicitly {@link Protos.GC2BS_AskLogin.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Protos.GC2BS_AskLogin
             * @static
             * @param {Protos.IGC2BS_AskLogin} message GC2BS_AskLogin message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GC2BS_AskLogin.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a GC2BS_AskLogin message from the specified reader or buffer.
             * @function decode
             * @memberof Protos.GC2BS_AskLogin
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Protos.GC2BS_AskLogin} GC2BS_AskLogin
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
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
    
            /**
             * Decodes a GC2BS_AskLogin message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Protos.GC2BS_AskLogin
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Protos.GC2BS_AskLogin} GC2BS_AskLogin
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GC2BS_AskLogin.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a GC2BS_AskLogin message.
             * @function verify
             * @memberof Protos.GC2BS_AskLogin
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            GC2BS_AskLogin.verify = function verify(message) {
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
    
            /**
             * Creates a GC2BS_AskLogin message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Protos.GC2BS_AskLogin
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Protos.GC2BS_AskLogin} GC2BS_AskLogin
             */
            GC2BS_AskLogin.fromObject = function fromObject(object) {
                if (object instanceof $root.Protos.GC2BS_AskLogin)
                    return object;
                var message = new $root.Protos.GC2BS_AskLogin();
                if (object.opts != null) {
                    if (typeof object.opts !== "object")
                        throw TypeError(".Protos.GC2BS_AskLogin.opts: object expected");
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
    
            /**
             * Creates a plain object from a GC2BS_AskLogin message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Protos.GC2BS_AskLogin
             * @static
             * @param {Protos.GC2BS_AskLogin} message GC2BS_AskLogin
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GC2BS_AskLogin.toObject = function toObject(message, options) {
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
    
            /**
             * Converts this GC2BS_AskLogin to JSON.
             * @function toJSON
             * @memberof Protos.GC2BS_AskLogin
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GC2BS_AskLogin.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return GC2BS_AskLogin;
        })();
    
        Protos.GC2BS_KeepAlive = (function() {
    
            /**
             * Properties of a GC2BS_KeepAlive.
             * @memberof Protos
             * @interface IGC2BS_KeepAlive
             * @property {Protos.IMsgOpts|null} [opts] GC2BS_KeepAlive opts
             */
    
            /**
             * Constructs a new GC2BS_KeepAlive.
             * @memberof Protos
             * @classdesc Represents a GC2BS_KeepAlive.
             * @implements IGC2BS_KeepAlive
             * @constructor
             * @param {Protos.IGC2BS_KeepAlive=} [properties] Properties to set
             */
            function GC2BS_KeepAlive(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * GC2BS_KeepAlive opts.
             * @member {Protos.IMsgOpts|null|undefined} opts
             * @memberof Protos.GC2BS_KeepAlive
             * @instance
             */
            GC2BS_KeepAlive.prototype.opts = null;
    
            /**
             * Creates a new GC2BS_KeepAlive instance using the specified properties.
             * @function create
             * @memberof Protos.GC2BS_KeepAlive
             * @static
             * @param {Protos.IGC2BS_KeepAlive=} [properties] Properties to set
             * @returns {Protos.GC2BS_KeepAlive} GC2BS_KeepAlive instance
             */
            GC2BS_KeepAlive.create = function create(properties) {
                return new GC2BS_KeepAlive(properties);
            };
    
            /**
             * Encodes the specified GC2BS_KeepAlive message. Does not implicitly {@link Protos.GC2BS_KeepAlive.verify|verify} messages.
             * @function encode
             * @memberof Protos.GC2BS_KeepAlive
             * @static
             * @param {Protos.IGC2BS_KeepAlive} message GC2BS_KeepAlive message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GC2BS_KeepAlive.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.opts != null && message.hasOwnProperty("opts"))
                    $root.Protos.MsgOpts.encode(message.opts, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified GC2BS_KeepAlive message, length delimited. Does not implicitly {@link Protos.GC2BS_KeepAlive.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Protos.GC2BS_KeepAlive
             * @static
             * @param {Protos.IGC2BS_KeepAlive} message GC2BS_KeepAlive message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GC2BS_KeepAlive.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a GC2BS_KeepAlive message from the specified reader or buffer.
             * @function decode
             * @memberof Protos.GC2BS_KeepAlive
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Protos.GC2BS_KeepAlive} GC2BS_KeepAlive
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
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
    
            /**
             * Decodes a GC2BS_KeepAlive message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Protos.GC2BS_KeepAlive
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Protos.GC2BS_KeepAlive} GC2BS_KeepAlive
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GC2BS_KeepAlive.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a GC2BS_KeepAlive message.
             * @function verify
             * @memberof Protos.GC2BS_KeepAlive
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
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
    
            /**
             * Creates a GC2BS_KeepAlive message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Protos.GC2BS_KeepAlive
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Protos.GC2BS_KeepAlive} GC2BS_KeepAlive
             */
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
    
            /**
             * Creates a plain object from a GC2BS_KeepAlive message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Protos.GC2BS_KeepAlive
             * @static
             * @param {Protos.GC2BS_KeepAlive} message GC2BS_KeepAlive
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
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
    
            /**
             * Converts this GC2BS_KeepAlive to JSON.
             * @function toJSON
             * @memberof Protos.GC2BS_KeepAlive
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GC2BS_KeepAlive.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return GC2BS_KeepAlive;
        })();
    
        Protos.GC2CS_BeginMatch = (function() {
    
            /**
             * Properties of a GC2CS_BeginMatch.
             * @memberof Protos
             * @interface IGC2CS_BeginMatch
             * @property {Protos.IMsgOpts|null} [opts] GC2CS_BeginMatch opts
             */
    
            /**
             * Constructs a new GC2CS_BeginMatch.
             * @memberof Protos
             * @classdesc Represents a GC2CS_BeginMatch.
             * @implements IGC2CS_BeginMatch
             * @constructor
             * @param {Protos.IGC2CS_BeginMatch=} [properties] Properties to set
             */
            function GC2CS_BeginMatch(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * GC2CS_BeginMatch opts.
             * @member {Protos.IMsgOpts|null|undefined} opts
             * @memberof Protos.GC2CS_BeginMatch
             * @instance
             */
            GC2CS_BeginMatch.prototype.opts = null;
    
            /**
             * Creates a new GC2CS_BeginMatch instance using the specified properties.
             * @function create
             * @memberof Protos.GC2CS_BeginMatch
             * @static
             * @param {Protos.IGC2CS_BeginMatch=} [properties] Properties to set
             * @returns {Protos.GC2CS_BeginMatch} GC2CS_BeginMatch instance
             */
            GC2CS_BeginMatch.create = function create(properties) {
                return new GC2CS_BeginMatch(properties);
            };
    
            /**
             * Encodes the specified GC2CS_BeginMatch message. Does not implicitly {@link Protos.GC2CS_BeginMatch.verify|verify} messages.
             * @function encode
             * @memberof Protos.GC2CS_BeginMatch
             * @static
             * @param {Protos.IGC2CS_BeginMatch} message GC2CS_BeginMatch message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GC2CS_BeginMatch.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.opts != null && message.hasOwnProperty("opts"))
                    $root.Protos.MsgOpts.encode(message.opts, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified GC2CS_BeginMatch message, length delimited. Does not implicitly {@link Protos.GC2CS_BeginMatch.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Protos.GC2CS_BeginMatch
             * @static
             * @param {Protos.IGC2CS_BeginMatch} message GC2CS_BeginMatch message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GC2CS_BeginMatch.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a GC2CS_BeginMatch message from the specified reader or buffer.
             * @function decode
             * @memberof Protos.GC2CS_BeginMatch
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Protos.GC2CS_BeginMatch} GC2CS_BeginMatch
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
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
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a GC2CS_BeginMatch message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Protos.GC2CS_BeginMatch
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Protos.GC2CS_BeginMatch} GC2CS_BeginMatch
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GC2CS_BeginMatch.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a GC2CS_BeginMatch message.
             * @function verify
             * @memberof Protos.GC2CS_BeginMatch
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            GC2CS_BeginMatch.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.opts != null && message.hasOwnProperty("opts")) {
                    var error = $root.Protos.MsgOpts.verify(message.opts);
                    if (error)
                        return "opts." + error;
                }
                return null;
            };
    
            /**
             * Creates a GC2CS_BeginMatch message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Protos.GC2CS_BeginMatch
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Protos.GC2CS_BeginMatch} GC2CS_BeginMatch
             */
            GC2CS_BeginMatch.fromObject = function fromObject(object) {
                if (object instanceof $root.Protos.GC2CS_BeginMatch)
                    return object;
                var message = new $root.Protos.GC2CS_BeginMatch();
                if (object.opts != null) {
                    if (typeof object.opts !== "object")
                        throw TypeError(".Protos.GC2CS_BeginMatch.opts: object expected");
                    message.opts = $root.Protos.MsgOpts.fromObject(object.opts);
                }
                return message;
            };
    
            /**
             * Creates a plain object from a GC2CS_BeginMatch message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Protos.GC2CS_BeginMatch
             * @static
             * @param {Protos.GC2CS_BeginMatch} message GC2CS_BeginMatch
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GC2CS_BeginMatch.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.opts = null;
                if (message.opts != null && message.hasOwnProperty("opts"))
                    object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
                return object;
            };
    
            /**
             * Converts this GC2CS_BeginMatch to JSON.
             * @function toJSON
             * @memberof Protos.GC2CS_BeginMatch
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GC2CS_BeginMatch.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return GC2CS_BeginMatch;
        })();
    
        Protos.GC2GS_AskLogin = (function() {
    
            /**
             * Properties of a GC2GS_AskLogin.
             * @memberof Protos
             * @interface IGC2GS_AskLogin
             * @property {Protos.IMsgOpts|null} [opts] GC2GS_AskLogin opts
             * @property {string|null} [pwd] GC2GS_AskLogin pwd
             * @property {Long|null} [sessionID] GC2GS_AskLogin sessionID
             */
    
            /**
             * Constructs a new GC2GS_AskLogin.
             * @memberof Protos
             * @classdesc Represents a GC2GS_AskLogin.
             * @implements IGC2GS_AskLogin
             * @constructor
             * @param {Protos.IGC2GS_AskLogin=} [properties] Properties to set
             */
            function GC2GS_AskLogin(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * GC2GS_AskLogin opts.
             * @member {Protos.IMsgOpts|null|undefined} opts
             * @memberof Protos.GC2GS_AskLogin
             * @instance
             */
            GC2GS_AskLogin.prototype.opts = null;
    
            /**
             * GC2GS_AskLogin pwd.
             * @member {string} pwd
             * @memberof Protos.GC2GS_AskLogin
             * @instance
             */
            GC2GS_AskLogin.prototype.pwd = "";
    
            /**
             * GC2GS_AskLogin sessionID.
             * @member {Long} sessionID
             * @memberof Protos.GC2GS_AskLogin
             * @instance
             */
            GC2GS_AskLogin.prototype.sessionID = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
    
            /**
             * Creates a new GC2GS_AskLogin instance using the specified properties.
             * @function create
             * @memberof Protos.GC2GS_AskLogin
             * @static
             * @param {Protos.IGC2GS_AskLogin=} [properties] Properties to set
             * @returns {Protos.GC2GS_AskLogin} GC2GS_AskLogin instance
             */
            GC2GS_AskLogin.create = function create(properties) {
                return new GC2GS_AskLogin(properties);
            };
    
            /**
             * Encodes the specified GC2GS_AskLogin message. Does not implicitly {@link Protos.GC2GS_AskLogin.verify|verify} messages.
             * @function encode
             * @memberof Protos.GC2GS_AskLogin
             * @static
             * @param {Protos.IGC2GS_AskLogin} message GC2GS_AskLogin message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GC2GS_AskLogin.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.opts != null && message.hasOwnProperty("opts"))
                    $root.Protos.MsgOpts.encode(message.opts, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.pwd != null && message.hasOwnProperty("pwd"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.pwd);
                if (message.sessionID != null && message.hasOwnProperty("sessionID"))
                    writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.sessionID);
                return writer;
            };
    
            /**
             * Encodes the specified GC2GS_AskLogin message, length delimited. Does not implicitly {@link Protos.GC2GS_AskLogin.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Protos.GC2GS_AskLogin
             * @static
             * @param {Protos.IGC2GS_AskLogin} message GC2GS_AskLogin message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GC2GS_AskLogin.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a GC2GS_AskLogin message from the specified reader or buffer.
             * @function decode
             * @memberof Protos.GC2GS_AskLogin
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Protos.GC2GS_AskLogin} GC2GS_AskLogin
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
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
    
            /**
             * Decodes a GC2GS_AskLogin message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Protos.GC2GS_AskLogin
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Protos.GC2GS_AskLogin} GC2GS_AskLogin
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GC2GS_AskLogin.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a GC2GS_AskLogin message.
             * @function verify
             * @memberof Protos.GC2GS_AskLogin
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
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
    
            /**
             * Creates a GC2GS_AskLogin message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Protos.GC2GS_AskLogin
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Protos.GC2GS_AskLogin} GC2GS_AskLogin
             */
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
    
            /**
             * Creates a plain object from a GC2GS_AskLogin message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Protos.GC2GS_AskLogin
             * @static
             * @param {Protos.GC2GS_AskLogin} message GC2GS_AskLogin
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
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
    
            /**
             * Converts this GC2GS_AskLogin to JSON.
             * @function toJSON
             * @memberof Protos.GC2GS_AskLogin
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GC2GS_AskLogin.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return GC2GS_AskLogin;
        })();
    
        Protos.GC2GS_KeepAlive = (function() {
    
            /**
             * Properties of a GC2GS_KeepAlive.
             * @memberof Protos
             * @interface IGC2GS_KeepAlive
             * @property {Protos.IMsgOpts|null} [opts] GC2GS_KeepAlive opts
             */
    
            /**
             * Constructs a new GC2GS_KeepAlive.
             * @memberof Protos
             * @classdesc Represents a GC2GS_KeepAlive.
             * @implements IGC2GS_KeepAlive
             * @constructor
             * @param {Protos.IGC2GS_KeepAlive=} [properties] Properties to set
             */
            function GC2GS_KeepAlive(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * GC2GS_KeepAlive opts.
             * @member {Protos.IMsgOpts|null|undefined} opts
             * @memberof Protos.GC2GS_KeepAlive
             * @instance
             */
            GC2GS_KeepAlive.prototype.opts = null;
    
            /**
             * Creates a new GC2GS_KeepAlive instance using the specified properties.
             * @function create
             * @memberof Protos.GC2GS_KeepAlive
             * @static
             * @param {Protos.IGC2GS_KeepAlive=} [properties] Properties to set
             * @returns {Protos.GC2GS_KeepAlive} GC2GS_KeepAlive instance
             */
            GC2GS_KeepAlive.create = function create(properties) {
                return new GC2GS_KeepAlive(properties);
            };
    
            /**
             * Encodes the specified GC2GS_KeepAlive message. Does not implicitly {@link Protos.GC2GS_KeepAlive.verify|verify} messages.
             * @function encode
             * @memberof Protos.GC2GS_KeepAlive
             * @static
             * @param {Protos.IGC2GS_KeepAlive} message GC2GS_KeepAlive message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GC2GS_KeepAlive.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.opts != null && message.hasOwnProperty("opts"))
                    $root.Protos.MsgOpts.encode(message.opts, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified GC2GS_KeepAlive message, length delimited. Does not implicitly {@link Protos.GC2GS_KeepAlive.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Protos.GC2GS_KeepAlive
             * @static
             * @param {Protos.IGC2GS_KeepAlive} message GC2GS_KeepAlive message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GC2GS_KeepAlive.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a GC2GS_KeepAlive message from the specified reader or buffer.
             * @function decode
             * @memberof Protos.GC2GS_KeepAlive
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Protos.GC2GS_KeepAlive} GC2GS_KeepAlive
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
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
    
            /**
             * Decodes a GC2GS_KeepAlive message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Protos.GC2GS_KeepAlive
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Protos.GC2GS_KeepAlive} GC2GS_KeepAlive
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GC2GS_KeepAlive.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a GC2GS_KeepAlive message.
             * @function verify
             * @memberof Protos.GC2GS_KeepAlive
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
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
    
            /**
             * Creates a GC2GS_KeepAlive message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Protos.GC2GS_KeepAlive
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Protos.GC2GS_KeepAlive} GC2GS_KeepAlive
             */
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
    
            /**
             * Creates a plain object from a GC2GS_KeepAlive message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Protos.GC2GS_KeepAlive
             * @static
             * @param {Protos.GC2GS_KeepAlive} message GC2GS_KeepAlive
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
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
    
            /**
             * Converts this GC2GS_KeepAlive to JSON.
             * @function toJSON
             * @memberof Protos.GC2GS_KeepAlive
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GC2GS_KeepAlive.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return GC2GS_KeepAlive;
        })();
    
        Protos.GC2LS_AskRegister = (function() {
    
            /**
             * Properties of a GC2LS_AskRegister.
             * @memberof Protos
             * @interface IGC2LS_AskRegister
             * @property {Protos.IMsgOpts|null} [opts] GC2LS_AskRegister opts
             * @property {number|null} [sdk] GC2LS_AskRegister sdk
             * @property {string|null} [name] GC2LS_AskRegister name
             * @property {string|null} [passwd] GC2LS_AskRegister passwd
             * @property {number|null} [platform] GC2LS_AskRegister platform
             */
    
            /**
             * Constructs a new GC2LS_AskRegister.
             * @memberof Protos
             * @classdesc Represents a GC2LS_AskRegister.
             * @implements IGC2LS_AskRegister
             * @constructor
             * @param {Protos.IGC2LS_AskRegister=} [properties] Properties to set
             */
            function GC2LS_AskRegister(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * GC2LS_AskRegister opts.
             * @member {Protos.IMsgOpts|null|undefined} opts
             * @memberof Protos.GC2LS_AskRegister
             * @instance
             */
            GC2LS_AskRegister.prototype.opts = null;
    
            /**
             * GC2LS_AskRegister sdk.
             * @member {number} sdk
             * @memberof Protos.GC2LS_AskRegister
             * @instance
             */
            GC2LS_AskRegister.prototype.sdk = 0;
    
            /**
             * GC2LS_AskRegister name.
             * @member {string} name
             * @memberof Protos.GC2LS_AskRegister
             * @instance
             */
            GC2LS_AskRegister.prototype.name = "";
    
            /**
             * GC2LS_AskRegister passwd.
             * @member {string} passwd
             * @memberof Protos.GC2LS_AskRegister
             * @instance
             */
            GC2LS_AskRegister.prototype.passwd = "";
    
            /**
             * GC2LS_AskRegister platform.
             * @member {number} platform
             * @memberof Protos.GC2LS_AskRegister
             * @instance
             */
            GC2LS_AskRegister.prototype.platform = 0;
    
            /**
             * Creates a new GC2LS_AskRegister instance using the specified properties.
             * @function create
             * @memberof Protos.GC2LS_AskRegister
             * @static
             * @param {Protos.IGC2LS_AskRegister=} [properties] Properties to set
             * @returns {Protos.GC2LS_AskRegister} GC2LS_AskRegister instance
             */
            GC2LS_AskRegister.create = function create(properties) {
                return new GC2LS_AskRegister(properties);
            };
    
            /**
             * Encodes the specified GC2LS_AskRegister message. Does not implicitly {@link Protos.GC2LS_AskRegister.verify|verify} messages.
             * @function encode
             * @memberof Protos.GC2LS_AskRegister
             * @static
             * @param {Protos.IGC2LS_AskRegister} message GC2LS_AskRegister message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GC2LS_AskRegister.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.opts != null && message.hasOwnProperty("opts"))
                    $root.Protos.MsgOpts.encode(message.opts, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.sdk != null && message.hasOwnProperty("sdk"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.sdk);
                if (message.name != null && message.hasOwnProperty("name"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.name);
                if (message.passwd != null && message.hasOwnProperty("passwd"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.passwd);
                if (message.platform != null && message.hasOwnProperty("platform"))
                    writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.platform);
                return writer;
            };
    
            /**
             * Encodes the specified GC2LS_AskRegister message, length delimited. Does not implicitly {@link Protos.GC2LS_AskRegister.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Protos.GC2LS_AskRegister
             * @static
             * @param {Protos.IGC2LS_AskRegister} message GC2LS_AskRegister message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GC2LS_AskRegister.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a GC2LS_AskRegister message from the specified reader or buffer.
             * @function decode
             * @memberof Protos.GC2LS_AskRegister
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Protos.GC2LS_AskRegister} GC2LS_AskRegister
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
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
    
            /**
             * Decodes a GC2LS_AskRegister message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Protos.GC2LS_AskRegister
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Protos.GC2LS_AskRegister} GC2LS_AskRegister
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GC2LS_AskRegister.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a GC2LS_AskRegister message.
             * @function verify
             * @memberof Protos.GC2LS_AskRegister
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            GC2LS_AskRegister.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.opts != null && message.hasOwnProperty("opts")) {
                    var error = $root.Protos.MsgOpts.verify(message.opts);
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
    
            /**
             * Creates a GC2LS_AskRegister message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Protos.GC2LS_AskRegister
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Protos.GC2LS_AskRegister} GC2LS_AskRegister
             */
            GC2LS_AskRegister.fromObject = function fromObject(object) {
                if (object instanceof $root.Protos.GC2LS_AskRegister)
                    return object;
                var message = new $root.Protos.GC2LS_AskRegister();
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
    
            /**
             * Creates a plain object from a GC2LS_AskRegister message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Protos.GC2LS_AskRegister
             * @static
             * @param {Protos.GC2LS_AskRegister} message GC2LS_AskRegister
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GC2LS_AskRegister.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
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
    
            /**
             * Converts this GC2LS_AskRegister to JSON.
             * @function toJSON
             * @memberof Protos.GC2LS_AskRegister
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GC2LS_AskRegister.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return GC2LS_AskRegister;
        })();
    
        Protos.GC2LS_AskLogin = (function() {
    
            /**
             * Properties of a GC2LS_AskLogin.
             * @memberof Protos
             * @interface IGC2LS_AskLogin
             * @property {Protos.IMsgOpts|null} [opts] GC2LS_AskLogin opts
             * @property {string|null} [name] GC2LS_AskLogin name
             * @property {string|null} [passwd] GC2LS_AskLogin passwd
             */
    
            /**
             * Constructs a new GC2LS_AskLogin.
             * @memberof Protos
             * @classdesc Represents a GC2LS_AskLogin.
             * @implements IGC2LS_AskLogin
             * @constructor
             * @param {Protos.IGC2LS_AskLogin=} [properties] Properties to set
             */
            function GC2LS_AskLogin(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * GC2LS_AskLogin opts.
             * @member {Protos.IMsgOpts|null|undefined} opts
             * @memberof Protos.GC2LS_AskLogin
             * @instance
             */
            GC2LS_AskLogin.prototype.opts = null;
    
            /**
             * GC2LS_AskLogin name.
             * @member {string} name
             * @memberof Protos.GC2LS_AskLogin
             * @instance
             */
            GC2LS_AskLogin.prototype.name = "";
    
            /**
             * GC2LS_AskLogin passwd.
             * @member {string} passwd
             * @memberof Protos.GC2LS_AskLogin
             * @instance
             */
            GC2LS_AskLogin.prototype.passwd = "";
    
            /**
             * Creates a new GC2LS_AskLogin instance using the specified properties.
             * @function create
             * @memberof Protos.GC2LS_AskLogin
             * @static
             * @param {Protos.IGC2LS_AskLogin=} [properties] Properties to set
             * @returns {Protos.GC2LS_AskLogin} GC2LS_AskLogin instance
             */
            GC2LS_AskLogin.create = function create(properties) {
                return new GC2LS_AskLogin(properties);
            };
    
            /**
             * Encodes the specified GC2LS_AskLogin message. Does not implicitly {@link Protos.GC2LS_AskLogin.verify|verify} messages.
             * @function encode
             * @memberof Protos.GC2LS_AskLogin
             * @static
             * @param {Protos.IGC2LS_AskLogin} message GC2LS_AskLogin message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GC2LS_AskLogin.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.opts != null && message.hasOwnProperty("opts"))
                    $root.Protos.MsgOpts.encode(message.opts, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.name != null && message.hasOwnProperty("name"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
                if (message.passwd != null && message.hasOwnProperty("passwd"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.passwd);
                return writer;
            };
    
            /**
             * Encodes the specified GC2LS_AskLogin message, length delimited. Does not implicitly {@link Protos.GC2LS_AskLogin.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Protos.GC2LS_AskLogin
             * @static
             * @param {Protos.IGC2LS_AskLogin} message GC2LS_AskLogin message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GC2LS_AskLogin.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a GC2LS_AskLogin message from the specified reader or buffer.
             * @function decode
             * @memberof Protos.GC2LS_AskLogin
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Protos.GC2LS_AskLogin} GC2LS_AskLogin
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
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
    
            /**
             * Decodes a GC2LS_AskLogin message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Protos.GC2LS_AskLogin
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Protos.GC2LS_AskLogin} GC2LS_AskLogin
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GC2LS_AskLogin.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a GC2LS_AskLogin message.
             * @function verify
             * @memberof Protos.GC2LS_AskLogin
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            GC2LS_AskLogin.verify = function verify(message) {
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
                if (message.passwd != null && message.hasOwnProperty("passwd"))
                    if (!$util.isString(message.passwd))
                        return "passwd: string expected";
                return null;
            };
    
            /**
             * Creates a GC2LS_AskLogin message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Protos.GC2LS_AskLogin
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Protos.GC2LS_AskLogin} GC2LS_AskLogin
             */
            GC2LS_AskLogin.fromObject = function fromObject(object) {
                if (object instanceof $root.Protos.GC2LS_AskLogin)
                    return object;
                var message = new $root.Protos.GC2LS_AskLogin();
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
    
            /**
             * Creates a plain object from a GC2LS_AskLogin message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Protos.GC2LS_AskLogin
             * @static
             * @param {Protos.GC2LS_AskLogin} message GC2LS_AskLogin
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GC2LS_AskLogin.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
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
    
            /**
             * Converts this GC2LS_AskLogin to JSON.
             * @function toJSON
             * @memberof Protos.GC2LS_AskLogin
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GC2LS_AskLogin.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return GC2LS_AskLogin;
        })();
    
        Protos.GS2GC_LoginRet = (function() {
    
            /**
             * Properties of a GS2GC_LoginRet.
             * @memberof Protos
             * @interface IGS2GC_LoginRet
             * @property {Protos.IMsgOpts|null} [opts] GS2GC_LoginRet opts
             * @property {Protos.GS2GC_LoginRet.EResult|null} [result] GS2GC_LoginRet result
             */
    
            /**
             * Constructs a new GS2GC_LoginRet.
             * @memberof Protos
             * @classdesc Represents a GS2GC_LoginRet.
             * @implements IGS2GC_LoginRet
             * @constructor
             * @param {Protos.IGS2GC_LoginRet=} [properties] Properties to set
             */
            function GS2GC_LoginRet(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * GS2GC_LoginRet opts.
             * @member {Protos.IMsgOpts|null|undefined} opts
             * @memberof Protos.GS2GC_LoginRet
             * @instance
             */
            GS2GC_LoginRet.prototype.opts = null;
    
            /**
             * GS2GC_LoginRet result.
             * @member {Protos.GS2GC_LoginRet.EResult} result
             * @memberof Protos.GS2GC_LoginRet
             * @instance
             */
            GS2GC_LoginRet.prototype.result = 0;
    
            /**
             * Creates a new GS2GC_LoginRet instance using the specified properties.
             * @function create
             * @memberof Protos.GS2GC_LoginRet
             * @static
             * @param {Protos.IGS2GC_LoginRet=} [properties] Properties to set
             * @returns {Protos.GS2GC_LoginRet} GS2GC_LoginRet instance
             */
            GS2GC_LoginRet.create = function create(properties) {
                return new GS2GC_LoginRet(properties);
            };
    
            /**
             * Encodes the specified GS2GC_LoginRet message. Does not implicitly {@link Protos.GS2GC_LoginRet.verify|verify} messages.
             * @function encode
             * @memberof Protos.GS2GC_LoginRet
             * @static
             * @param {Protos.IGS2GC_LoginRet} message GS2GC_LoginRet message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GS2GC_LoginRet.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.opts != null && message.hasOwnProperty("opts"))
                    $root.Protos.MsgOpts.encode(message.opts, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.result != null && message.hasOwnProperty("result"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.result);
                return writer;
            };
    
            /**
             * Encodes the specified GS2GC_LoginRet message, length delimited. Does not implicitly {@link Protos.GS2GC_LoginRet.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Protos.GS2GC_LoginRet
             * @static
             * @param {Protos.IGS2GC_LoginRet} message GS2GC_LoginRet message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GS2GC_LoginRet.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a GS2GC_LoginRet message from the specified reader or buffer.
             * @function decode
             * @memberof Protos.GS2GC_LoginRet
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Protos.GS2GC_LoginRet} GS2GC_LoginRet
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
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
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a GS2GC_LoginRet message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Protos.GS2GC_LoginRet
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Protos.GS2GC_LoginRet} GS2GC_LoginRet
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GS2GC_LoginRet.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a GS2GC_LoginRet message.
             * @function verify
             * @memberof Protos.GS2GC_LoginRet
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
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
                    case 2:
                        break;
                    }
                return null;
            };
    
            /**
             * Creates a GS2GC_LoginRet message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Protos.GS2GC_LoginRet
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Protos.GS2GC_LoginRet} GS2GC_LoginRet
             */
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
                case "IllegalLogin":
                case 2:
                    message.result = 2;
                    break;
                }
                return message;
            };
    
            /**
             * Creates a plain object from a GS2GC_LoginRet message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Protos.GS2GC_LoginRet
             * @static
             * @param {Protos.GS2GC_LoginRet} message GS2GC_LoginRet
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GS2GC_LoginRet.toObject = function toObject(message, options) {
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
                    object.result = options.enums === String ? $root.Protos.GS2GC_LoginRet.EResult[message.result] : message.result;
                return object;
            };
    
            /**
             * Converts this GS2GC_LoginRet to JSON.
             * @function toJSON
             * @memberof Protos.GS2GC_LoginRet
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GS2GC_LoginRet.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * EResult enum.
             * @name Protos.GS2GC_LoginRet.EResult
             * @enum {string}
             * @property {number} Success=0 Success value
             * @property {number} SessionExpire=1 SessionExpire value
             * @property {number} IllegalLogin=2 IllegalLogin value
             */
            GS2GC_LoginRet.EResult = (function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "Success"] = 0;
                values[valuesById[1] = "SessionExpire"] = 1;
                values[valuesById[2] = "IllegalLogin"] = 2;
                return values;
            })();
    
            return GS2GC_LoginRet;
        })();
    
        Protos.GS2GC_Kick = (function() {
    
            /**
             * Properties of a GS2GC_Kick.
             * @memberof Protos
             * @interface IGS2GC_Kick
             * @property {Protos.IMsgOpts|null} [opts] GS2GC_Kick opts
             * @property {Protos.CS2GS_KickGC.EReason|null} [reason] GS2GC_Kick reason
             */
    
            /**
             * Constructs a new GS2GC_Kick.
             * @memberof Protos
             * @classdesc Represents a GS2GC_Kick.
             * @implements IGS2GC_Kick
             * @constructor
             * @param {Protos.IGS2GC_Kick=} [properties] Properties to set
             */
            function GS2GC_Kick(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * GS2GC_Kick opts.
             * @member {Protos.IMsgOpts|null|undefined} opts
             * @memberof Protos.GS2GC_Kick
             * @instance
             */
            GS2GC_Kick.prototype.opts = null;
    
            /**
             * GS2GC_Kick reason.
             * @member {Protos.CS2GS_KickGC.EReason} reason
             * @memberof Protos.GS2GC_Kick
             * @instance
             */
            GS2GC_Kick.prototype.reason = 0;
    
            /**
             * Creates a new GS2GC_Kick instance using the specified properties.
             * @function create
             * @memberof Protos.GS2GC_Kick
             * @static
             * @param {Protos.IGS2GC_Kick=} [properties] Properties to set
             * @returns {Protos.GS2GC_Kick} GS2GC_Kick instance
             */
            GS2GC_Kick.create = function create(properties) {
                return new GS2GC_Kick(properties);
            };
    
            /**
             * Encodes the specified GS2GC_Kick message. Does not implicitly {@link Protos.GS2GC_Kick.verify|verify} messages.
             * @function encode
             * @memberof Protos.GS2GC_Kick
             * @static
             * @param {Protos.IGS2GC_Kick} message GS2GC_Kick message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GS2GC_Kick.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.opts != null && message.hasOwnProperty("opts"))
                    $root.Protos.MsgOpts.encode(message.opts, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.reason != null && message.hasOwnProperty("reason"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.reason);
                return writer;
            };
    
            /**
             * Encodes the specified GS2GC_Kick message, length delimited. Does not implicitly {@link Protos.GS2GC_Kick.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Protos.GS2GC_Kick
             * @static
             * @param {Protos.IGS2GC_Kick} message GS2GC_Kick message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GS2GC_Kick.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a GS2GC_Kick message from the specified reader or buffer.
             * @function decode
             * @memberof Protos.GS2GC_Kick
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Protos.GS2GC_Kick} GS2GC_Kick
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
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
    
            /**
             * Decodes a GS2GC_Kick message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Protos.GS2GC_Kick
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Protos.GS2GC_Kick} GS2GC_Kick
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GS2GC_Kick.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a GS2GC_Kick message.
             * @function verify
             * @memberof Protos.GS2GC_Kick
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
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
                        break;
                    }
                return null;
            };
    
            /**
             * Creates a GS2GC_Kick message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Protos.GS2GC_Kick
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Protos.GS2GC_Kick} GS2GC_Kick
             */
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
                case "Other":
                case 1:
                    message.reason = 1;
                    break;
                }
                return message;
            };
    
            /**
             * Creates a plain object from a GS2GC_Kick message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Protos.GS2GC_Kick
             * @static
             * @param {Protos.GS2GC_Kick} message GS2GC_Kick
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
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
    
            /**
             * Converts this GS2GC_Kick to JSON.
             * @function toJSON
             * @memberof Protos.GS2GC_Kick
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GS2GC_Kick.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return GS2GC_Kick;
        })();
    
        Protos.LS2CS_GCLogin = (function() {
    
            /**
             * Properties of a LS2CS_GCLogin.
             * @memberof Protos
             * @interface ILS2CS_GCLogin
             * @property {Protos.IMsgOpts|null} [opts] LS2CS_GCLogin opts
             * @property {Long|null} [sessionID] LS2CS_GCLogin sessionID
             * @property {number|null} [ukey] LS2CS_GCLogin ukey
             */
    
            /**
             * Constructs a new LS2CS_GCLogin.
             * @memberof Protos
             * @classdesc Represents a LS2CS_GCLogin.
             * @implements ILS2CS_GCLogin
             * @constructor
             * @param {Protos.ILS2CS_GCLogin=} [properties] Properties to set
             */
            function LS2CS_GCLogin(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * LS2CS_GCLogin opts.
             * @member {Protos.IMsgOpts|null|undefined} opts
             * @memberof Protos.LS2CS_GCLogin
             * @instance
             */
            LS2CS_GCLogin.prototype.opts = null;
    
            /**
             * LS2CS_GCLogin sessionID.
             * @member {Long} sessionID
             * @memberof Protos.LS2CS_GCLogin
             * @instance
             */
            LS2CS_GCLogin.prototype.sessionID = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
    
            /**
             * LS2CS_GCLogin ukey.
             * @member {number} ukey
             * @memberof Protos.LS2CS_GCLogin
             * @instance
             */
            LS2CS_GCLogin.prototype.ukey = 0;
    
            /**
             * Creates a new LS2CS_GCLogin instance using the specified properties.
             * @function create
             * @memberof Protos.LS2CS_GCLogin
             * @static
             * @param {Protos.ILS2CS_GCLogin=} [properties] Properties to set
             * @returns {Protos.LS2CS_GCLogin} LS2CS_GCLogin instance
             */
            LS2CS_GCLogin.create = function create(properties) {
                return new LS2CS_GCLogin(properties);
            };
    
            /**
             * Encodes the specified LS2CS_GCLogin message. Does not implicitly {@link Protos.LS2CS_GCLogin.verify|verify} messages.
             * @function encode
             * @memberof Protos.LS2CS_GCLogin
             * @static
             * @param {Protos.ILS2CS_GCLogin} message LS2CS_GCLogin message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LS2CS_GCLogin.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.opts != null && message.hasOwnProperty("opts"))
                    $root.Protos.MsgOpts.encode(message.opts, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.sessionID != null && message.hasOwnProperty("sessionID"))
                    writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.sessionID);
                if (message.ukey != null && message.hasOwnProperty("ukey"))
                    writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.ukey);
                return writer;
            };
    
            /**
             * Encodes the specified LS2CS_GCLogin message, length delimited. Does not implicitly {@link Protos.LS2CS_GCLogin.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Protos.LS2CS_GCLogin
             * @static
             * @param {Protos.ILS2CS_GCLogin} message LS2CS_GCLogin message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LS2CS_GCLogin.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a LS2CS_GCLogin message from the specified reader or buffer.
             * @function decode
             * @memberof Protos.LS2CS_GCLogin
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Protos.LS2CS_GCLogin} LS2CS_GCLogin
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
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
    
            /**
             * Decodes a LS2CS_GCLogin message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Protos.LS2CS_GCLogin
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Protos.LS2CS_GCLogin} LS2CS_GCLogin
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LS2CS_GCLogin.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a LS2CS_GCLogin message.
             * @function verify
             * @memberof Protos.LS2CS_GCLogin
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            LS2CS_GCLogin.verify = function verify(message) {
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
                if (message.ukey != null && message.hasOwnProperty("ukey"))
                    if (!$util.isInteger(message.ukey))
                        return "ukey: integer expected";
                return null;
            };
    
            /**
             * Creates a LS2CS_GCLogin message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Protos.LS2CS_GCLogin
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Protos.LS2CS_GCLogin} LS2CS_GCLogin
             */
            LS2CS_GCLogin.fromObject = function fromObject(object) {
                if (object instanceof $root.Protos.LS2CS_GCLogin)
                    return object;
                var message = new $root.Protos.LS2CS_GCLogin();
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
    
            /**
             * Creates a plain object from a LS2CS_GCLogin message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Protos.LS2CS_GCLogin
             * @static
             * @param {Protos.LS2CS_GCLogin} message LS2CS_GCLogin
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            LS2CS_GCLogin.toObject = function toObject(message, options) {
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
    
            /**
             * Converts this LS2CS_GCLogin to JSON.
             * @function toJSON
             * @memberof Protos.LS2CS_GCLogin
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            LS2CS_GCLogin.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return LS2CS_GCLogin;
        })();
    
        Protos.LS2DB_QueryAccount = (function() {
    
            /**
             * Properties of a LS2DB_QueryAccount.
             * @memberof Protos
             * @interface ILS2DB_QueryAccount
             * @property {Protos.IMsgOpts|null} [opts] LS2DB_QueryAccount opts
             * @property {string|null} [name] LS2DB_QueryAccount name
             */
    
            /**
             * Constructs a new LS2DB_QueryAccount.
             * @memberof Protos
             * @classdesc Represents a LS2DB_QueryAccount.
             * @implements ILS2DB_QueryAccount
             * @constructor
             * @param {Protos.ILS2DB_QueryAccount=} [properties] Properties to set
             */
            function LS2DB_QueryAccount(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * LS2DB_QueryAccount opts.
             * @member {Protos.IMsgOpts|null|undefined} opts
             * @memberof Protos.LS2DB_QueryAccount
             * @instance
             */
            LS2DB_QueryAccount.prototype.opts = null;
    
            /**
             * LS2DB_QueryAccount name.
             * @member {string} name
             * @memberof Protos.LS2DB_QueryAccount
             * @instance
             */
            LS2DB_QueryAccount.prototype.name = "";
    
            /**
             * Creates a new LS2DB_QueryAccount instance using the specified properties.
             * @function create
             * @memberof Protos.LS2DB_QueryAccount
             * @static
             * @param {Protos.ILS2DB_QueryAccount=} [properties] Properties to set
             * @returns {Protos.LS2DB_QueryAccount} LS2DB_QueryAccount instance
             */
            LS2DB_QueryAccount.create = function create(properties) {
                return new LS2DB_QueryAccount(properties);
            };
    
            /**
             * Encodes the specified LS2DB_QueryAccount message. Does not implicitly {@link Protos.LS2DB_QueryAccount.verify|verify} messages.
             * @function encode
             * @memberof Protos.LS2DB_QueryAccount
             * @static
             * @param {Protos.ILS2DB_QueryAccount} message LS2DB_QueryAccount message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LS2DB_QueryAccount.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.opts != null && message.hasOwnProperty("opts"))
                    $root.Protos.MsgOpts.encode(message.opts, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.name != null && message.hasOwnProperty("name"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
                return writer;
            };
    
            /**
             * Encodes the specified LS2DB_QueryAccount message, length delimited. Does not implicitly {@link Protos.LS2DB_QueryAccount.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Protos.LS2DB_QueryAccount
             * @static
             * @param {Protos.ILS2DB_QueryAccount} message LS2DB_QueryAccount message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LS2DB_QueryAccount.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a LS2DB_QueryAccount message from the specified reader or buffer.
             * @function decode
             * @memberof Protos.LS2DB_QueryAccount
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Protos.LS2DB_QueryAccount} LS2DB_QueryAccount
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
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
    
            /**
             * Decodes a LS2DB_QueryAccount message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Protos.LS2DB_QueryAccount
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Protos.LS2DB_QueryAccount} LS2DB_QueryAccount
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LS2DB_QueryAccount.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a LS2DB_QueryAccount message.
             * @function verify
             * @memberof Protos.LS2DB_QueryAccount
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
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
    
            /**
             * Creates a LS2DB_QueryAccount message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Protos.LS2DB_QueryAccount
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Protos.LS2DB_QueryAccount} LS2DB_QueryAccount
             */
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
    
            /**
             * Creates a plain object from a LS2DB_QueryAccount message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Protos.LS2DB_QueryAccount
             * @static
             * @param {Protos.LS2DB_QueryAccount} message LS2DB_QueryAccount
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
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
    
            /**
             * Converts this LS2DB_QueryAccount to JSON.
             * @function toJSON
             * @memberof Protos.LS2DB_QueryAccount
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            LS2DB_QueryAccount.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return LS2DB_QueryAccount;
        })();
    
        Protos.LS2DB_QueryLogin = (function() {
    
            /**
             * Properties of a LS2DB_QueryLogin.
             * @memberof Protos
             * @interface ILS2DB_QueryLogin
             * @property {Protos.IMsgOpts|null} [opts] LS2DB_QueryLogin opts
             * @property {string|null} [name] LS2DB_QueryLogin name
             * @property {string|null} [pwd] LS2DB_QueryLogin pwd
             */
    
            /**
             * Constructs a new LS2DB_QueryLogin.
             * @memberof Protos
             * @classdesc Represents a LS2DB_QueryLogin.
             * @implements ILS2DB_QueryLogin
             * @constructor
             * @param {Protos.ILS2DB_QueryLogin=} [properties] Properties to set
             */
            function LS2DB_QueryLogin(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * LS2DB_QueryLogin opts.
             * @member {Protos.IMsgOpts|null|undefined} opts
             * @memberof Protos.LS2DB_QueryLogin
             * @instance
             */
            LS2DB_QueryLogin.prototype.opts = null;
    
            /**
             * LS2DB_QueryLogin name.
             * @member {string} name
             * @memberof Protos.LS2DB_QueryLogin
             * @instance
             */
            LS2DB_QueryLogin.prototype.name = "";
    
            /**
             * LS2DB_QueryLogin pwd.
             * @member {string} pwd
             * @memberof Protos.LS2DB_QueryLogin
             * @instance
             */
            LS2DB_QueryLogin.prototype.pwd = "";
    
            /**
             * Creates a new LS2DB_QueryLogin instance using the specified properties.
             * @function create
             * @memberof Protos.LS2DB_QueryLogin
             * @static
             * @param {Protos.ILS2DB_QueryLogin=} [properties] Properties to set
             * @returns {Protos.LS2DB_QueryLogin} LS2DB_QueryLogin instance
             */
            LS2DB_QueryLogin.create = function create(properties) {
                return new LS2DB_QueryLogin(properties);
            };
    
            /**
             * Encodes the specified LS2DB_QueryLogin message. Does not implicitly {@link Protos.LS2DB_QueryLogin.verify|verify} messages.
             * @function encode
             * @memberof Protos.LS2DB_QueryLogin
             * @static
             * @param {Protos.ILS2DB_QueryLogin} message LS2DB_QueryLogin message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LS2DB_QueryLogin.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.opts != null && message.hasOwnProperty("opts"))
                    $root.Protos.MsgOpts.encode(message.opts, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.name != null && message.hasOwnProperty("name"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
                if (message.pwd != null && message.hasOwnProperty("pwd"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.pwd);
                return writer;
            };
    
            /**
             * Encodes the specified LS2DB_QueryLogin message, length delimited. Does not implicitly {@link Protos.LS2DB_QueryLogin.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Protos.LS2DB_QueryLogin
             * @static
             * @param {Protos.ILS2DB_QueryLogin} message LS2DB_QueryLogin message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LS2DB_QueryLogin.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a LS2DB_QueryLogin message from the specified reader or buffer.
             * @function decode
             * @memberof Protos.LS2DB_QueryLogin
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Protos.LS2DB_QueryLogin} LS2DB_QueryLogin
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
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
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a LS2DB_QueryLogin message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Protos.LS2DB_QueryLogin
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Protos.LS2DB_QueryLogin} LS2DB_QueryLogin
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LS2DB_QueryLogin.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a LS2DB_QueryLogin message.
             * @function verify
             * @memberof Protos.LS2DB_QueryLogin
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
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
                return null;
            };
    
            /**
             * Creates a LS2DB_QueryLogin message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Protos.LS2DB_QueryLogin
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Protos.LS2DB_QueryLogin} LS2DB_QueryLogin
             */
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
                return message;
            };
    
            /**
             * Creates a plain object from a LS2DB_QueryLogin message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Protos.LS2DB_QueryLogin
             * @static
             * @param {Protos.LS2DB_QueryLogin} message LS2DB_QueryLogin
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            LS2DB_QueryLogin.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.opts = null;
                    object.name = "";
                    object.pwd = "";
                }
                if (message.opts != null && message.hasOwnProperty("opts"))
                    object.opts = $root.Protos.MsgOpts.toObject(message.opts, options);
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.pwd != null && message.hasOwnProperty("pwd"))
                    object.pwd = message.pwd;
                return object;
            };
    
            /**
             * Converts this LS2DB_QueryLogin to JSON.
             * @function toJSON
             * @memberof Protos.LS2DB_QueryLogin
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            LS2DB_QueryLogin.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return LS2DB_QueryLogin;
        })();
    
        Protos.LS2DB_Exec = (function() {
    
            /**
             * Properties of a LS2DB_Exec.
             * @memberof Protos
             * @interface ILS2DB_Exec
             * @property {Protos.IMsgOpts|null} [opts] LS2DB_Exec opts
             * @property {string|null} [cmd] LS2DB_Exec cmd
             */
    
            /**
             * Constructs a new LS2DB_Exec.
             * @memberof Protos
             * @classdesc Represents a LS2DB_Exec.
             * @implements ILS2DB_Exec
             * @constructor
             * @param {Protos.ILS2DB_Exec=} [properties] Properties to set
             */
            function LS2DB_Exec(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * LS2DB_Exec opts.
             * @member {Protos.IMsgOpts|null|undefined} opts
             * @memberof Protos.LS2DB_Exec
             * @instance
             */
            LS2DB_Exec.prototype.opts = null;
    
            /**
             * LS2DB_Exec cmd.
             * @member {string} cmd
             * @memberof Protos.LS2DB_Exec
             * @instance
             */
            LS2DB_Exec.prototype.cmd = "";
    
            /**
             * Creates a new LS2DB_Exec instance using the specified properties.
             * @function create
             * @memberof Protos.LS2DB_Exec
             * @static
             * @param {Protos.ILS2DB_Exec=} [properties] Properties to set
             * @returns {Protos.LS2DB_Exec} LS2DB_Exec instance
             */
            LS2DB_Exec.create = function create(properties) {
                return new LS2DB_Exec(properties);
            };
    
            /**
             * Encodes the specified LS2DB_Exec message. Does not implicitly {@link Protos.LS2DB_Exec.verify|verify} messages.
             * @function encode
             * @memberof Protos.LS2DB_Exec
             * @static
             * @param {Protos.ILS2DB_Exec} message LS2DB_Exec message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LS2DB_Exec.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.opts != null && message.hasOwnProperty("opts"))
                    $root.Protos.MsgOpts.encode(message.opts, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.cmd != null && message.hasOwnProperty("cmd"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.cmd);
                return writer;
            };
    
            /**
             * Encodes the specified LS2DB_Exec message, length delimited. Does not implicitly {@link Protos.LS2DB_Exec.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Protos.LS2DB_Exec
             * @static
             * @param {Protos.ILS2DB_Exec} message LS2DB_Exec message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LS2DB_Exec.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a LS2DB_Exec message from the specified reader or buffer.
             * @function decode
             * @memberof Protos.LS2DB_Exec
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Protos.LS2DB_Exec} LS2DB_Exec
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
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
    
            /**
             * Decodes a LS2DB_Exec message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Protos.LS2DB_Exec
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Protos.LS2DB_Exec} LS2DB_Exec
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LS2DB_Exec.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a LS2DB_Exec message.
             * @function verify
             * @memberof Protos.LS2DB_Exec
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
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
    
            /**
             * Creates a LS2DB_Exec message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Protos.LS2DB_Exec
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Protos.LS2DB_Exec} LS2DB_Exec
             */
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
    
            /**
             * Creates a plain object from a LS2DB_Exec message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Protos.LS2DB_Exec
             * @static
             * @param {Protos.LS2DB_Exec} message LS2DB_Exec
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
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
    
            /**
             * Converts this LS2DB_Exec to JSON.
             * @function toJSON
             * @memberof Protos.LS2DB_Exec
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            LS2DB_Exec.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return LS2DB_Exec;
        })();
    
        Protos.LS2GC_GSInfo = (function() {
    
            /**
             * Properties of a LS2GC_GSInfo.
             * @memberof Protos
             * @interface ILS2GC_GSInfo
             * @property {Protos.IMsgOpts|null} [opts] LS2GC_GSInfo opts
             * @property {Array.<Protos.IGSInfo>|null} [gsInfos] LS2GC_GSInfo gsInfos
             */
    
            /**
             * Constructs a new LS2GC_GSInfo.
             * @memberof Protos
             * @classdesc Represents a LS2GC_GSInfo.
             * @implements ILS2GC_GSInfo
             * @constructor
             * @param {Protos.ILS2GC_GSInfo=} [properties] Properties to set
             */
            function LS2GC_GSInfo(properties) {
                this.gsInfos = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * LS2GC_GSInfo opts.
             * @member {Protos.IMsgOpts|null|undefined} opts
             * @memberof Protos.LS2GC_GSInfo
             * @instance
             */
            LS2GC_GSInfo.prototype.opts = null;
    
            /**
             * LS2GC_GSInfo gsInfos.
             * @member {Array.<Protos.IGSInfo>} gsInfos
             * @memberof Protos.LS2GC_GSInfo
             * @instance
             */
            LS2GC_GSInfo.prototype.gsInfos = $util.emptyArray;
    
            /**
             * Creates a new LS2GC_GSInfo instance using the specified properties.
             * @function create
             * @memberof Protos.LS2GC_GSInfo
             * @static
             * @param {Protos.ILS2GC_GSInfo=} [properties] Properties to set
             * @returns {Protos.LS2GC_GSInfo} LS2GC_GSInfo instance
             */
            LS2GC_GSInfo.create = function create(properties) {
                return new LS2GC_GSInfo(properties);
            };
    
            /**
             * Encodes the specified LS2GC_GSInfo message. Does not implicitly {@link Protos.LS2GC_GSInfo.verify|verify} messages.
             * @function encode
             * @memberof Protos.LS2GC_GSInfo
             * @static
             * @param {Protos.ILS2GC_GSInfo} message LS2GC_GSInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LS2GC_GSInfo.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.opts != null && message.hasOwnProperty("opts"))
                    $root.Protos.MsgOpts.encode(message.opts, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.gsInfos != null && message.gsInfos.length)
                    for (var i = 0; i < message.gsInfos.length; ++i)
                        $root.Protos.GSInfo.encode(message.gsInfos[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified LS2GC_GSInfo message, length delimited. Does not implicitly {@link Protos.LS2GC_GSInfo.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Protos.LS2GC_GSInfo
             * @static
             * @param {Protos.ILS2GC_GSInfo} message LS2GC_GSInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LS2GC_GSInfo.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a LS2GC_GSInfo message from the specified reader or buffer.
             * @function decode
             * @memberof Protos.LS2GC_GSInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Protos.LS2GC_GSInfo} LS2GC_GSInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
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
    
            /**
             * Decodes a LS2GC_GSInfo message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Protos.LS2GC_GSInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Protos.LS2GC_GSInfo} LS2GC_GSInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LS2GC_GSInfo.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a LS2GC_GSInfo message.
             * @function verify
             * @memberof Protos.LS2GC_GSInfo
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
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
    
            /**
             * Creates a LS2GC_GSInfo message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Protos.LS2GC_GSInfo
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Protos.LS2GC_GSInfo} LS2GC_GSInfo
             */
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
    
            /**
             * Creates a plain object from a LS2GC_GSInfo message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Protos.LS2GC_GSInfo
             * @static
             * @param {Protos.LS2GC_GSInfo} message LS2GC_GSInfo
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
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
    
            /**
             * Converts this LS2GC_GSInfo to JSON.
             * @function toJSON
             * @memberof Protos.LS2GC_GSInfo
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            LS2GC_GSInfo.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return LS2GC_GSInfo;
        })();
    
        Protos.LS2GC_AskRegRet = (function() {
    
            /**
             * Properties of a LS2GC_AskRegRet.
             * @memberof Protos
             * @interface ILS2GC_AskRegRet
             * @property {Protos.IMsgOpts|null} [opts] LS2GC_AskRegRet opts
             * @property {Protos.LS2GC_AskRegRet.EResult|null} [result] LS2GC_AskRegRet result
             */
    
            /**
             * Constructs a new LS2GC_AskRegRet.
             * @memberof Protos
             * @classdesc Represents a LS2GC_AskRegRet.
             * @implements ILS2GC_AskRegRet
             * @constructor
             * @param {Protos.ILS2GC_AskRegRet=} [properties] Properties to set
             */
            function LS2GC_AskRegRet(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * LS2GC_AskRegRet opts.
             * @member {Protos.IMsgOpts|null|undefined} opts
             * @memberof Protos.LS2GC_AskRegRet
             * @instance
             */
            LS2GC_AskRegRet.prototype.opts = null;
    
            /**
             * LS2GC_AskRegRet result.
             * @member {Protos.LS2GC_AskRegRet.EResult} result
             * @memberof Protos.LS2GC_AskRegRet
             * @instance
             */
            LS2GC_AskRegRet.prototype.result = 0;
    
            /**
             * Creates a new LS2GC_AskRegRet instance using the specified properties.
             * @function create
             * @memberof Protos.LS2GC_AskRegRet
             * @static
             * @param {Protos.ILS2GC_AskRegRet=} [properties] Properties to set
             * @returns {Protos.LS2GC_AskRegRet} LS2GC_AskRegRet instance
             */
            LS2GC_AskRegRet.create = function create(properties) {
                return new LS2GC_AskRegRet(properties);
            };
    
            /**
             * Encodes the specified LS2GC_AskRegRet message. Does not implicitly {@link Protos.LS2GC_AskRegRet.verify|verify} messages.
             * @function encode
             * @memberof Protos.LS2GC_AskRegRet
             * @static
             * @param {Protos.ILS2GC_AskRegRet} message LS2GC_AskRegRet message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LS2GC_AskRegRet.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.opts != null && message.hasOwnProperty("opts"))
                    $root.Protos.MsgOpts.encode(message.opts, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.result != null && message.hasOwnProperty("result"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.result);
                return writer;
            };
    
            /**
             * Encodes the specified LS2GC_AskRegRet message, length delimited. Does not implicitly {@link Protos.LS2GC_AskRegRet.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Protos.LS2GC_AskRegRet
             * @static
             * @param {Protos.ILS2GC_AskRegRet} message LS2GC_AskRegRet message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LS2GC_AskRegRet.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a LS2GC_AskRegRet message from the specified reader or buffer.
             * @function decode
             * @memberof Protos.LS2GC_AskRegRet
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Protos.LS2GC_AskRegRet} LS2GC_AskRegRet
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
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
    
            /**
             * Decodes a LS2GC_AskRegRet message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Protos.LS2GC_AskRegRet
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Protos.LS2GC_AskRegRet} LS2GC_AskRegRet
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LS2GC_AskRegRet.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a LS2GC_AskRegRet message.
             * @function verify
             * @memberof Protos.LS2GC_AskRegRet
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
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
    
            /**
             * Creates a LS2GC_AskRegRet message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Protos.LS2GC_AskRegRet
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Protos.LS2GC_AskRegRet} LS2GC_AskRegRet
             */
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
    
            /**
             * Creates a plain object from a LS2GC_AskRegRet message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Protos.LS2GC_AskRegRet
             * @static
             * @param {Protos.LS2GC_AskRegRet} message LS2GC_AskRegRet
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
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
    
            /**
             * Converts this LS2GC_AskRegRet to JSON.
             * @function toJSON
             * @memberof Protos.LS2GC_AskRegRet
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            LS2GC_AskRegRet.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * EResult enum.
             * @name Protos.LS2GC_AskRegRet.EResult
             * @enum {string}
             * @property {number} Success=0 Success value
             * @property {number} Failed=1 Failed value
             * @property {number} UnameExists=2 UnameExists value
             * @property {number} UnameIllegal=3 UnameIllegal value
             * @property {number} PwdIllegal=4 PwdIllegal value
             */
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
    
            /**
             * Properties of a LS2GC_AskLoginRet.
             * @memberof Protos
             * @interface ILS2GC_AskLoginRet
             * @property {Protos.IMsgOpts|null} [opts] LS2GC_AskLoginRet opts
             * @property {Protos.LS2GC_AskLoginRet.EResult|null} [result] LS2GC_AskLoginRet result
             * @property {Long|null} [sessionID] LS2GC_AskLoginRet sessionID
             * @property {Array.<Protos.IGSInfo>|null} [gsInfos] LS2GC_AskLoginRet gsInfos
             */
    
            /**
             * Constructs a new LS2GC_AskLoginRet.
             * @memberof Protos
             * @classdesc Represents a LS2GC_AskLoginRet.
             * @implements ILS2GC_AskLoginRet
             * @constructor
             * @param {Protos.ILS2GC_AskLoginRet=} [properties] Properties to set
             */
            function LS2GC_AskLoginRet(properties) {
                this.gsInfos = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * LS2GC_AskLoginRet opts.
             * @member {Protos.IMsgOpts|null|undefined} opts
             * @memberof Protos.LS2GC_AskLoginRet
             * @instance
             */
            LS2GC_AskLoginRet.prototype.opts = null;
    
            /**
             * LS2GC_AskLoginRet result.
             * @member {Protos.LS2GC_AskLoginRet.EResult} result
             * @memberof Protos.LS2GC_AskLoginRet
             * @instance
             */
            LS2GC_AskLoginRet.prototype.result = 0;
    
            /**
             * LS2GC_AskLoginRet sessionID.
             * @member {Long} sessionID
             * @memberof Protos.LS2GC_AskLoginRet
             * @instance
             */
            LS2GC_AskLoginRet.prototype.sessionID = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
    
            /**
             * LS2GC_AskLoginRet gsInfos.
             * @member {Array.<Protos.IGSInfo>} gsInfos
             * @memberof Protos.LS2GC_AskLoginRet
             * @instance
             */
            LS2GC_AskLoginRet.prototype.gsInfos = $util.emptyArray;
    
            /**
             * Creates a new LS2GC_AskLoginRet instance using the specified properties.
             * @function create
             * @memberof Protos.LS2GC_AskLoginRet
             * @static
             * @param {Protos.ILS2GC_AskLoginRet=} [properties] Properties to set
             * @returns {Protos.LS2GC_AskLoginRet} LS2GC_AskLoginRet instance
             */
            LS2GC_AskLoginRet.create = function create(properties) {
                return new LS2GC_AskLoginRet(properties);
            };
    
            /**
             * Encodes the specified LS2GC_AskLoginRet message. Does not implicitly {@link Protos.LS2GC_AskLoginRet.verify|verify} messages.
             * @function encode
             * @memberof Protos.LS2GC_AskLoginRet
             * @static
             * @param {Protos.ILS2GC_AskLoginRet} message LS2GC_AskLoginRet message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LS2GC_AskLoginRet.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.opts != null && message.hasOwnProperty("opts"))
                    $root.Protos.MsgOpts.encode(message.opts, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.result != null && message.hasOwnProperty("result"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.result);
                if (message.sessionID != null && message.hasOwnProperty("sessionID"))
                    writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.sessionID);
                if (message.gsInfos != null && message.gsInfos.length)
                    for (var i = 0; i < message.gsInfos.length; ++i)
                        $root.Protos.GSInfo.encode(message.gsInfos[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified LS2GC_AskLoginRet message, length delimited. Does not implicitly {@link Protos.LS2GC_AskLoginRet.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Protos.LS2GC_AskLoginRet
             * @static
             * @param {Protos.ILS2GC_AskLoginRet} message LS2GC_AskLoginRet message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LS2GC_AskLoginRet.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a LS2GC_AskLoginRet message from the specified reader or buffer.
             * @function decode
             * @memberof Protos.LS2GC_AskLoginRet
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Protos.LS2GC_AskLoginRet} LS2GC_AskLoginRet
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
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
    
            /**
             * Decodes a LS2GC_AskLoginRet message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Protos.LS2GC_AskLoginRet
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Protos.LS2GC_AskLoginRet} LS2GC_AskLoginRet
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LS2GC_AskLoginRet.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a LS2GC_AskLoginRet message.
             * @function verify
             * @memberof Protos.LS2GC_AskLoginRet
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
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
                    for (var i = 0; i < message.gsInfos.length; ++i) {
                        var error = $root.Protos.GSInfo.verify(message.gsInfos[i]);
                        if (error)
                            return "gsInfos." + error;
                    }
                }
                return null;
            };
    
            /**
             * Creates a LS2GC_AskLoginRet message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Protos.LS2GC_AskLoginRet
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Protos.LS2GC_AskLoginRet} LS2GC_AskLoginRet
             */
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
                    for (var i = 0; i < object.gsInfos.length; ++i) {
                        if (typeof object.gsInfos[i] !== "object")
                            throw TypeError(".Protos.LS2GC_AskLoginRet.gsInfos: object expected");
                        message.gsInfos[i] = $root.Protos.GSInfo.fromObject(object.gsInfos[i]);
                    }
                }
                return message;
            };
    
            /**
             * Creates a plain object from a LS2GC_AskLoginRet message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Protos.LS2GC_AskLoginRet
             * @static
             * @param {Protos.LS2GC_AskLoginRet} message LS2GC_AskLoginRet
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
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
    
            /**
             * Converts this LS2GC_AskLoginRet to JSON.
             * @function toJSON
             * @memberof Protos.LS2GC_AskLoginRet
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            LS2GC_AskLoginRet.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * EResult enum.
             * @name Protos.LS2GC_AskLoginRet.EResult
             * @enum {string}
             * @property {number} Success=0 Success value
             * @property {number} Failed=1 Failed value
             * @property {number} InvalidUname=3 InvalidUname value
             * @property {number} InvalidPwd=4 InvalidPwd value
             */
            LS2GC_AskLoginRet.EResult = (function() {
                var valuesById = {}, values = Object.create(valuesById);
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

    return $root;
});
