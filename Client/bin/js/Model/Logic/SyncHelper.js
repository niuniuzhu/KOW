define(["require", "exports", "../../Libs/protobufjs", "../../RC/Utils/Logger"], function (require, exports, $protobuf, Logger_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SyncHelper {
        static Print(msg) {
            const reader = $protobuf.Reader.create(msg.data1);
            let str = this.DecodeData(reader);
            Logger_1.Logger.Warn("out of sync:" + str);
        }
        static DecodeData(reader) {
            let str = "";
            str += `frame:${reader.int32()}\n`;
            let count = reader.int32();
            str += `champion count:${count}\n`;
            str += this.DecodeChampion(reader);
            return str;
        }
        static DecodeChampion(reader) {
            let str = "";
            str += `rid:${reader.uint64().toString()}\n`;
            str += `id:${reader.int32()}\n`;
            str += `markToDestroy:${reader.bool()}\n`;
            str += `positionX:${reader.double()}, positionY:${reader.double()}\n`;
            str += `directionX:${reader.double()}, directionY:${reader.double()}\n`;
            let count = reader.int32();
            str += `attribute count:${count}\n`;
            for (let i = 0; i < count; i++) {
                str += `  attr:${reader.int32()}, v:${reader.double()}\n`;
            }
            return str;
        }
        static DecodeFSM(reader) {
            let str = "";
            const count = reader.int32();
            str += `state count:${count}\n`;
            str += `\n`;
            let b = reader.bool();
            if (b) {
            }
            str += `current state:${reader.int32()}\n`;
            b = reader.bool();
            if (b) {
                str += `previous state:${reader.int32()}\n`;
            }
            return str;
        }
    }
    exports.SyncHelper = SyncHelper;
});
//# sourceMappingURL=SyncHelper.js.map