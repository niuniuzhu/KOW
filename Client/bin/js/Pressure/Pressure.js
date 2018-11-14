define(["require", "exports", "./ConnectionTest", "../RC/Math/MathUtils"], function (require, exports, ConnectionTest_1, MathUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Pressure {
        constructor() {
            this._tests = [];
            this._numConnections = 0;
            this._time = 0;
            setInterval(() => { this.Update(); }, Pressure.UPDATE_INTERVAL);
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
            this._time += Pressure.UPDATE_INTERVAL;
            if (this._time >= MathUtils_1.MathUtils.RandomCeil(Pressure.CONNECT_INTERVAL - 100, Pressure.CONNECT_INTERVAL + 100)) {
                this._time = 0;
                this.DoConnect();
            }
        }
    }
    Pressure.UPDATE_INTERVAL = 20;
    Pressure.CONNECT_INTERVAL = 50;
    Pressure.MAX_CONNECTION = 280;
    exports.Pressure = Pressure;
});
//# sourceMappingURL=Pressure.js.map