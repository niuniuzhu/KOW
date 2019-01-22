define(["require", "exports", "./Dictionary", "./Util"], function (require, exports, Dictionary_1, util) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class FactoryDictionary extends Dictionary_1.default {
        constructor(defaultFactoryFunction, toStrFunction) {
            super(toStrFunction);
            this.defaultFactoryFunction = defaultFactoryFunction;
        }
        setDefault(key, defaultValue) {
            const currentValue = super.getValue(key);
            if (util.isUndefined(currentValue)) {
                this.setValue(key, defaultValue);
                return defaultValue;
            }
            return currentValue;
        }
        getValue(key) {
            return this.setDefault(key, this.defaultFactoryFunction());
        }
    }
    exports.default = FactoryDictionary;
});
//# sourceMappingURL=FactoryDictionary.js.map