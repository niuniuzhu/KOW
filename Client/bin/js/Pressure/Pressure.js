define(["require", "exports", "./ConnectionTest"], function (require, exports, ConnectionTest_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Pressure {
        constructor() {
            this._tests = [];
            for (let i = 0; i < 2; ++i) {
                const test = new ConnectionTest_1.ConnectionTest();
                this._tests.push(test);
            }
            setInterval(() => { this.Update(); }, Pressure.UPDATE_INTERVAL);
        }
        Update() {
            for (let i = 0; i < this._tests.length; i++) {
                const test = this._tests[i];
                test.Update(Pressure.UPDATE_INTERVAL);
            }
        }
    }
    Pressure.UPDATE_INTERVAL = 20;
    exports.Pressure = Pressure;
});
//# sourceMappingURL=Pressure.js.map