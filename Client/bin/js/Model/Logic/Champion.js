define(["require", "exports", "./Entity", "../EntityType"], function (require, exports, Entity_1, EntityType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Champion extends Entity_1.Entity {
        get type() { return EntityType_1.EntityType.Champion; }
    }
    exports.Champion = Champion;
});
//# sourceMappingURL=Champion.js.map