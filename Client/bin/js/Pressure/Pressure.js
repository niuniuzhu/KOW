define(["require", "exports", "./ConnectionTest"], function (require, exports, ConnectionTest_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Pressure {
        constructor() {
            this._tests = [];
            this._numConnections = 0;
            setInterval(() => { this.Update(); }, Pressure.UPDATE_INTERVAL);
            setInterval(() => { this.DoConnect(); }, Pressure.CONNECT_INTERVAL);
        }
        DoConnect() {
            if (this._numConnections >= Pressure.MAX_CONNECTION)
                return;
            ++this._numConnections;
            const test = new ConnectionTest_1.ConnectionTest();
            this._tests.push(test);
        }
        Update() {
            for (let i = 0; i < this._tests.length; i++) {
                const test = this._tests[i];
                test.Update(Pressure.UPDATE_INTERVAL);
            }
        }
    }
    Pressure.UPDATE_INTERVAL = 20;
    Pressure.CONNECT_INTERVAL = 20;
    Pressure.MAX_CONNECTION = 1;
    exports.Pressure = Pressure;
});
//# sourceMappingURL=Pressure.js.map