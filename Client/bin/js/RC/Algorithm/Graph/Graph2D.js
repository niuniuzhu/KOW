define(["require", "exports", "./GraphBase", "../../Math/MathUtils"], function (require, exports, GraphBase_1, MathUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Graph2D extends GraphBase_1.GraphBase {
        get row() { return this._row; }
        get col() { return this._col; }
        constructor(row, col) {
            super(row * col);
            this._row = row;
            this._col = col;
        }
        GetNode(row, col) {
            return this.GetNodeAt(row * this.col + col);
        }
        static CreateFullDigraph(row, col, rndFunc) {
            let graph = new Graph2D(row, col);
            let r = graph.row;
            let c = graph.col;
            for (let i = 0; i < r; i++) {
                for (let j = 0; j < c; j++) {
                    let cur = i * c + j;
                    let node = graph.GetNodeAt(cur);
                    if (j < c - 1)
                        node.AddEdge(cur, cur + 1, rndFunc == null ? 0 : rndFunc(cur + 1));
                    if (j > 0)
                        node.AddEdge(cur, cur - 1, rndFunc == null ? 0 : rndFunc(cur - 1));
                    if (i < r - 1)
                        node.AddEdge(cur, cur + c, rndFunc == null ? 0 : rndFunc(cur + c));
                    if (i > 0)
                        node.AddEdge(cur, cur - c, rndFunc == null ? 0 : rndFunc(cur - c));
                    if (j < c - 1 && i < r - 1)
                        node.AddEdge(cur, cur + c + 1, rndFunc == null ? 0 : rndFunc(cur + 1));
                    if (j > 0 && i < r - 1)
                        node.AddEdge(cur, cur + c - 1, rndFunc == null ? 0 : rndFunc(cur + 1));
                    if (j < c - 1 && i > 0)
                        node.AddEdge(cur, cur - c + 1, rndFunc == null ? 0 : rndFunc(cur + 1));
                    if (j > 0 && i > 0)
                        node.AddEdge(cur, cur - c - 1, rndFunc == null ? 0 : rndFunc(cur + 1));
                }
            }
            return graph;
        }
        static CreateHVDigraph(row, col, rndFunc) {
            let graph = new Graph2D(row, col);
            let r = graph.row;
            let c = graph.col;
            for (let i = 0; i < r; i++) {
                for (let j = 0; j < c; j++) {
                    let cur = i * c + j;
                    let node = graph.GetNodeAt(cur);
                    if (j < c - 1)
                        node.AddEdge(cur, cur + 1, rndFunc == null ? 0 : rndFunc(cur + 1));
                    if (j > 0)
                        node.AddEdge(cur, cur - 1, rndFunc == null ? 0 : rndFunc(cur - 1));
                    if (i < r - 1)
                        node.AddEdge(cur, cur + c, rndFunc == null ? 0 : rndFunc(cur + c));
                    if (i > 0)
                        node.AddEdge(cur, cur - c, rndFunc == null ? 0 : rndFunc(cur - c));
                }
            }
            return graph;
        }
        CoordToIndex(x, y) {
            return y * this.col + x;
        }
        IndexToCoord(index) {
            let coord = [];
            coord[0] = index % this.col;
            coord[1] = MathUtils_1.MathUtils.Floor(index / this.col);
            return coord;
        }
    }
    exports.Graph2D = Graph2D;
});
//# sourceMappingURL=Graph2D.js.map