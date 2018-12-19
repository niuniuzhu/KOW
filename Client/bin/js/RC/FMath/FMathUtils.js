define(["require", "exports", "../../Libs/decimal"], function (require, exports, decimal_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class FMathUtils {
    }
    FMathUtils.D_ZERO = new decimal_1.default(0);
    FMathUtils.D_ONE = new decimal_1.default(1);
    FMathUtils.D_TWO = new decimal_1.default(2);
    FMathUtils.D_THREE = new decimal_1.default(3);
    FMathUtils.D_FOUR = new decimal_1.default(4);
    FMathUtils.D_FIVE = new decimal_1.default(5);
    FMathUtils.D_HALF = new decimal_1.default(0.5);
    FMathUtils.D_N_ONE = new decimal_1.default(-1);
    FMathUtils.D_SMALL = new decimal_1.default(0.01);
    FMathUtils.D_SMALL1 = new decimal_1.default(0.001);
    FMathUtils.D_BIG = new decimal_1.default(0xffffffff);
    exports.FMathUtils = FMathUtils;
});
//# sourceMappingURL=FMathUtils.js.map