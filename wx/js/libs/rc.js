"use strict";
var RC;
(function (RC) {
    class Test {
        constructor() {
            this._i = 0;
            let v = RC.Numerics.Vec2.right;
            console.log(v.Rotate(RC.Numerics.MathUtils.DegToRad(90)));
            let graph = RC.Algorithm.Graph.Graph2D.CreateFullDigraph(3, 3, this.F.bind(this));
            let path = RC.Algorithm.Graph.GraphSearcher.MazeSearch(graph, 0, -1, RC.Numerics.MathUtils.Random);
            console.log(path);
        }
        F(index) {
            return this._i++;
        }
    }
    RC.Test = Test;
})(RC || (RC = {}));
var RC;
(function (RC) {
    var Algorithm;
    (function (Algorithm) {
        var Graph;
        (function (Graph) {
            class GraphBase {
                constructor(size) {
                    this._idToNodes = new RC.Collections.Dictionary();
                    let ns = [];
                    for (let i = 0; i < size; i++)
                        ns[i] = new Graph.GraphNode(i);
                    this.nodes = ns;
                }
                get size() { return this._nodes.length; }
                set nodes(value) {
                    this._nodes = value;
                    this._idToNodes.clear();
                    for (let node of this._nodes) {
                        this._idToNodes.setValue(node.index, node);
                    }
                }
                GetNodeAt(index) {
                    return this._idToNodes.getValue(index);
                }
                Foreach(loopFunc) {
                    for (let node of this._nodes)
                        loopFunc(node);
                }
            }
            Graph.GraphBase = GraphBase;
        })(Graph = Algorithm.Graph || (Algorithm.Graph = {}));
    })(Algorithm = RC.Algorithm || (RC.Algorithm = {}));
})(RC || (RC = {}));
var RC;
(function (RC) {
    var Algorithm;
    (function (Algorithm) {
        var Graph;
        (function (Graph) {
            class Graph2D extends Graph.GraphBase {
                constructor(row, col) {
                    super(row * col);
                    this._row = row;
                    this._col = col;
                }
                get row() { return this._row; }
                get col() { return this._col; }
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
                    coord[1] = RC.Numerics.MathUtils.Floor(index / this.col);
                    return coord;
                }
            }
            Graph.Graph2D = Graph2D;
        })(Graph = Algorithm.Graph || (Algorithm.Graph = {}));
    })(Algorithm = RC.Algorithm || (RC.Algorithm = {}));
})(RC || (RC = {}));
var RC;
(function (RC) {
    var Algorithm;
    (function (Algorithm) {
        var Graph;
        (function (Graph) {
            class GraphEdge {
                constructor(from, to, cost = 0) {
                    this._from = from;
                    this._to = to;
                    this._cost = cost;
                }
                get from() { return this._from; }
                get to() { return this._to; }
                get cost() { return this._cost; }
                static Compare(a, b) {
                    if (a._cost > b._cost) {
                        return -1;
                    }
                    if (a._cost < b._cost) {
                        return 1;
                    }
                    return 0;
                }
            }
            Graph.GraphEdge = GraphEdge;
        })(Graph = Algorithm.Graph || (Algorithm.Graph = {}));
    })(Algorithm = RC.Algorithm || (RC.Algorithm = {}));
})(RC || (RC = {}));
var RC;
(function (RC) {
    var Algorithm;
    (function (Algorithm) {
        var Graph;
        (function (Graph) {
            class GraphNode {
                constructor(index) {
                    this._index = index;
                    this._edges = [];
                }
                get index() { return this._index; }
                get edges() { return this._edges; }
                AddEdge(from, to, cost) {
                    let edge = new Graph.GraphEdge(from, to, cost);
                    this.edges.push(edge);
                    return edge;
                }
            }
            Graph.GraphNode = GraphNode;
        })(Graph = Algorithm.Graph || (Algorithm.Graph = {}));
    })(Algorithm = RC.Algorithm || (RC.Algorithm = {}));
})(RC || (RC = {}));
var RC;
(function (RC) {
    var Algorithm;
    (function (Algorithm) {
        var Graph;
        (function (Graph) {
            class GraphSearcher {
                static MazeSearch(graph, start, maxStep, rndFunc) {
                    let visitedNodes = [];
                    let edges = [];
                    let curStep = 0;
                    let node = graph.GetNodeAt(start);
                    while (node != null) {
                        if (maxStep >= 0 && curStep == maxStep)
                            break;
                        visitedNodes.push(node.index);
                        edges.splice(0);
                        let allVisited = true;
                        for (let edge of node.edges) {
                            if (visitedNodes.indexOf(edge.to) < 0) {
                                allVisited = false;
                                edges.push(edge);
                            }
                        }
                        if (allVisited)
                            break;
                        let edge = edges[RC.Numerics.MathUtils.Floor(rndFunc(0, edges.length))];
                        node = graph.GetNodeAt(edge.to);
                        ++curStep;
                    }
                    return visitedNodes;
                }
                static PrimSearch(graph, start) {
                    let shortestPathPredecessors = [];
                    let visitedNodes = new Set();
                    let nodeQueue = new RC.Collections.PriorityQueue(Graph.GraphEdge.Compare);
                    let node = graph.GetNodeAt(start);
                    while (node != null) {
                        visitedNodes.add(node.index);
                        for (let edge of node.edges)
                            nodeQueue.enqueue(edge);
                        let edage = nodeQueue.dequeue();
                        while (edage != null && visitedNodes.has(edage.to)) {
                            edage = nodeQueue.dequeue();
                        }
                        if (edage == null)
                            break;
                        shortestPathPredecessors.push(edage);
                        node = graph.GetNodeAt(edage.to);
                    }
                    return shortestPathPredecessors;
                }
                static AStarSearch(graph, start, end) {
                    let shortestPathPredecessors = new RC.Collections.Dictionary();
                    let frontierPredecessors = new RC.Collections.Dictionary();
                    let nodeQueue = new RC.Collections.PriorityQueue(NumberPair.NumberCompare);
                    let costToNode = new RC.Collections.Dictionary();
                    costToNode.setValue(start, 0);
                    frontierPredecessors.setValue(start, null);
                    nodeQueue.enqueue(new NumberPair(start, 0));
                    while (nodeQueue.size() > 0) {
                        let nextClosestNode = nodeQueue.dequeue();
                        let predecessor = frontierPredecessors.getValue(nextClosestNode.first);
                        shortestPathPredecessors.setValue(nextClosestNode.first, predecessor);
                        if (end == nextClosestNode.first)
                            break;
                        let edages = graph.GetNodeAt(nextClosestNode.first).edges;
                        for (let edge of edages) {
                            let totalCost = costToNode.getValue(nextClosestNode.first) + edge.cost;
                            let estimatedTotalCostViaNode = totalCost + 0;
                            if (!frontierPredecessors.containsKey(edge.to)) {
                                costToNode.setValue(edge.to, totalCost);
                                frontierPredecessors.setValue(edge.to, edge);
                                nodeQueue.enqueue(new NumberPair(edge.to, estimatedTotalCostViaNode));
                            }
                            else if (totalCost < costToNode.getValue(edge.to) &&
                                !shortestPathPredecessors.containsKey(edge.to)) {
                                costToNode.setValue(edge.to, totalCost);
                                frontierPredecessors.setValue(edge.to, edge);
                                nodeQueue.forEach((element) => {
                                    if (element.first == edge.to) {
                                        element.second = estimatedTotalCostViaNode;
                                        return;
                                    }
                                });
                                nodeQueue.update();
                            }
                        }
                    }
                    let pathList = [];
                    for (let node = end; shortestPathPredecessors.getValue(node) != null; node = shortestPathPredecessors.getValue(node).from)
                        pathList.push(node);
                    pathList.push(start);
                    pathList.reverse();
                    return pathList;
                }
            }
            Graph.GraphSearcher = GraphSearcher;
            class NumberPair {
                constructor(first, second) {
                    this.first = first;
                    this.second = second;
                }
                static NumberCompare(a, b) {
                    if (a.second > b.second) {
                        return -1;
                    }
                    if (a.second < b.second) {
                        return 1;
                    }
                    return 0;
                }
            }
            Graph.NumberPair = NumberPair;
        })(Graph = Algorithm.Graph || (Algorithm.Graph = {}));
    })(Algorithm = RC.Algorithm || (RC.Algorithm = {}));
})(RC || (RC = {}));
var RC;
(function (RC) {
    var Collections;
    (function (Collections) {
        class Arrays {
            static indexOf(array, item, equalsFunction) {
                const equals = equalsFunction || Collections.Utils.defaultEquals;
                const length = array.length;
                for (let i = 0; i < length; i++) {
                    if (equals(array[i], item)) {
                        return i;
                    }
                }
                return -1;
            }
            static lastIndexOf(array, item, equalsFunction) {
                const equals = equalsFunction || Collections.Utils.defaultEquals;
                const length = array.length;
                for (let i = length - 1; i >= 0; i--) {
                    if (equals(array[i], item)) {
                        return i;
                    }
                }
                return -1;
            }
            static contains(array, item, equalsFunction) {
                return Arrays.indexOf(array, item, equalsFunction) >= 0;
            }
            static remove(array, item, equalsFunction) {
                const index = Arrays.indexOf(array, item, equalsFunction);
                if (index < 0) {
                    return false;
                }
                array.splice(index, 1);
                return true;
            }
            static frequency(array, item, equalsFunction) {
                const equals = equalsFunction || Collections.Utils.defaultEquals;
                const length = array.length;
                let freq = 0;
                for (let i = 0; i < length; i++) {
                    if (equals(array[i], item)) {
                        freq++;
                    }
                }
                return freq;
            }
            static equals(array1, array2, equalsFunction) {
                const equals = equalsFunction || Collections.Utils.defaultEquals;
                if (array1.length !== array2.length) {
                    return false;
                }
                const length = array1.length;
                for (let i = 0; i < length; i++) {
                    if (!equals(array1[i], array2[i])) {
                        return false;
                    }
                }
                return true;
            }
            static copy(array) {
                return array.concat();
            }
            static swap(array, i, j) {
                if (i < 0 || i >= array.length || j < 0 || j >= array.length) {
                    return false;
                }
                const temp = array[i];
                array[i] = array[j];
                array[j] = temp;
                return true;
            }
            static toString(array) {
                return '[' + array.toString() + ']';
            }
            static forEach(array, callback) {
                for (const ele of array) {
                    if (callback(ele) === false) {
                        return;
                    }
                }
            }
        }
        Collections.Arrays = Arrays;
    })(Collections = RC.Collections || (RC.Collections = {}));
})(RC || (RC = {}));
var RC;
(function (RC) {
    var Collections;
    (function (Collections) {
        class BSTreeKV {
            constructor(compareFunction) {
                this.root = null;
                this.compare = compareFunction || Collections.Utils.defaultCompare;
                this.nElements = 0;
            }
            add(element) {
                if (Collections.Utils.isUndefined(element)) {
                    return false;
                }
                if (this.insertNode(this.createNode(element)) !== null) {
                    this.nElements++;
                    return true;
                }
                return false;
            }
            clear() {
                this.root = null;
                this.nElements = 0;
            }
            isEmpty() {
                return this.nElements === 0;
            }
            size() {
                return this.nElements;
            }
            contains(element) {
                if (Collections.Utils.isUndefined(element)) {
                    return false;
                }
                return this.searchNode(this.root, element) !== null;
            }
            search(element) {
                const ret = this.searchNode(this.root, element);
                if (ret === null) {
                    return null;
                }
                return ret.element;
            }
            remove(element) {
                const node = this.searchNode(this.root, element);
                if (node === null) {
                    return false;
                }
                this.removeNode(node);
                this.nElements--;
                return true;
            }
            inorderTraversal(callback) {
                this.inorderTraversalAux(this.root, callback, {
                    stop: false
                });
            }
            preorderTraversal(callback) {
                this.preorderTraversalAux(this.root, callback, {
                    stop: false
                });
            }
            postorderTraversal(callback) {
                this.postorderTraversalAux(this.root, callback, {
                    stop: false
                });
            }
            levelTraversal(callback) {
                this.levelTraversalAux(this.root, callback);
            }
            minimum() {
                if (this.isEmpty() || this.root === null) {
                    return null;
                }
                return this.minimumAux(this.root).element;
            }
            maximum() {
                if (this.isEmpty() || this.root === null) {
                    return null;
                }
                return this.maximumAux(this.root).element;
            }
            forEach(callback) {
                this.inorderTraversal(callback);
            }
            toArray() {
                const array = [];
                this.inorderTraversal(function (element) {
                    array.push(element);
                    return true;
                });
                return array;
            }
            height() {
                return this.heightAux(this.root);
            }
            searchNode(node, element) {
                let cmp = 1;
                while (node !== null && cmp !== 0) {
                    cmp = this.compare(element, node.element);
                    if (cmp < 0) {
                        node = node.leftCh;
                    }
                    else if (cmp > 0) {
                        node = node.rightCh;
                    }
                }
                return node;
            }
            transplant(n1, n2) {
                if (n1.parent === null) {
                    this.root = n2;
                }
                else if (n1 === n1.parent.leftCh) {
                    n1.parent.leftCh = n2;
                }
                else {
                    n1.parent.rightCh = n2;
                }
                if (n2 !== null) {
                    n2.parent = n1.parent;
                }
            }
            removeNode(node) {
                if (node.leftCh === null) {
                    this.transplant(node, node.rightCh);
                }
                else if (node.rightCh === null) {
                    this.transplant(node, node.leftCh);
                }
                else {
                    const y = this.minimumAux(node.rightCh);
                    if (y.parent !== node) {
                        this.transplant(y, y.rightCh);
                        y.rightCh = node.rightCh;
                        y.rightCh.parent = y;
                    }
                    this.transplant(node, y);
                    y.leftCh = node.leftCh;
                    y.leftCh.parent = y;
                }
            }
            inorderTraversalAux(node, callback, signal) {
                if (node === null || signal.stop) {
                    return;
                }
                this.inorderTraversalAux(node.leftCh, callback, signal);
                if (signal.stop) {
                    return;
                }
                signal.stop = callback(node.element) === false;
                if (signal.stop) {
                    return;
                }
                this.inorderTraversalAux(node.rightCh, callback, signal);
            }
            levelTraversalAux(node, callback) {
                const queue = new Collections.Queue();
                if (node !== null) {
                    queue.enqueue(node);
                }
                node = queue.dequeue() || null;
                while (node != null) {
                    if (callback(node.element) === false) {
                        return;
                    }
                    if (node.leftCh !== null) {
                        queue.enqueue(node.leftCh);
                    }
                    if (node.rightCh !== null) {
                        queue.enqueue(node.rightCh);
                    }
                    node = queue.dequeue() || null;
                }
            }
            preorderTraversalAux(node, callback, signal) {
                if (node === null || signal.stop) {
                    return;
                }
                signal.stop = callback(node.element) === false;
                if (signal.stop) {
                    return;
                }
                this.preorderTraversalAux(node.leftCh, callback, signal);
                if (signal.stop) {
                    return;
                }
                this.preorderTraversalAux(node.rightCh, callback, signal);
            }
            postorderTraversalAux(node, callback, signal) {
                if (node === null || signal.stop) {
                    return;
                }
                this.postorderTraversalAux(node.leftCh, callback, signal);
                if (signal.stop) {
                    return;
                }
                this.postorderTraversalAux(node.rightCh, callback, signal);
                if (signal.stop) {
                    return;
                }
                signal.stop = callback(node.element) === false;
            }
            minimumAux(node) {
                while (node != null && node.leftCh !== null) {
                    node = node.leftCh;
                }
                return node;
            }
            maximumAux(node) {
                while (node != null && node.rightCh !== null) {
                    node = node.rightCh;
                }
                return node;
            }
            heightAux(node) {
                if (node === null) {
                    return -1;
                }
                return Math.max(this.heightAux(node.leftCh), this.heightAux(node.rightCh)) + 1;
            }
            insertNode(node) {
                let parent;
                let position = this.root;
                while (position !== null) {
                    const cmp = this.compare(node.element, position.element);
                    if (cmp === 0) {
                        return null;
                    }
                    else if (cmp < 0) {
                        parent = position;
                        position = position.leftCh;
                    }
                    else {
                        parent = position;
                        position = position.rightCh;
                    }
                }
                node.parent = parent;
                if (parent === null) {
                    this.root = node;
                }
                else if (this.compare(node.element, parent.element) < 0) {
                    parent.leftCh = node;
                }
                else {
                    parent.rightCh = node;
                }
                return node;
            }
            createNode(element) {
                return {
                    element: element,
                    leftCh: null,
                    rightCh: null,
                    parent: null
                };
            }
        }
        Collections.BSTreeKV = BSTreeKV;
        class BSTree extends BSTreeKV {
        }
        Collections.BSTree = BSTree;
    })(Collections = RC.Collections || (RC.Collections = {}));
})(RC || (RC = {}));
var RC;
(function (RC) {
    var Collections;
    (function (Collections) {
        class Bag {
            constructor(toStrFunction) {
                this.toStrF = toStrFunction || Collections.Utils.defaultToString;
                this.dictionary = new Collections.Dictionary(this.toStrF);
                this.nElements = 0;
            }
            add(element, nCopies = 1) {
                if (Collections.Utils.isUndefined(element) || nCopies <= 0) {
                    return false;
                }
                if (!this.contains(element)) {
                    const node = {
                        value: element,
                        copies: nCopies
                    };
                    this.dictionary.setValue(element, node);
                }
                else {
                    this.dictionary.getValue(element).copies += nCopies;
                }
                this.nElements += nCopies;
                return true;
            }
            count(element) {
                if (!this.contains(element)) {
                    return 0;
                }
                else {
                    return this.dictionary.getValue(element).copies;
                }
            }
            contains(element) {
                return this.dictionary.containsKey(element);
            }
            remove(element, nCopies = 1) {
                if (Collections.Utils.isUndefined(element) || nCopies <= 0) {
                    return false;
                }
                if (!this.contains(element)) {
                    return false;
                }
                else {
                    const node = this.dictionary.getValue(element);
                    if (nCopies > node.copies) {
                        this.nElements -= node.copies;
                    }
                    else {
                        this.nElements -= nCopies;
                    }
                    node.copies -= nCopies;
                    if (node.copies <= 0) {
                        this.dictionary.remove(element);
                    }
                    return true;
                }
            }
            toArray() {
                const a = [];
                const values = this.dictionary.values();
                for (const node of values) {
                    const element = node.value;
                    const copies = node.copies;
                    for (let j = 0; j < copies; j++) {
                        a.push(element);
                    }
                }
                return a;
            }
            toSet() {
                const toret = new Collections.Set(this.toStrF);
                const elements = this.dictionary.values();
                for (const ele of elements) {
                    const value = ele.value;
                    toret.add(value);
                }
                return toret;
            }
            forEach(callback) {
                this.dictionary.forEach(function (k, v) {
                    const value = v.value;
                    const copies = v.copies;
                    for (let i = 0; i < copies; i++) {
                        if (callback(value) === false) {
                            return false;
                        }
                    }
                    return true;
                });
            }
            size() {
                return this.nElements;
            }
            isEmpty() {
                return this.nElements === 0;
            }
            clear() {
                this.nElements = 0;
                this.dictionary.clear();
            }
        }
        Collections.Bag = Bag;
    })(Collections = RC.Collections || (RC.Collections = {}));
})(RC || (RC = {}));
var RC;
(function (RC) {
    var Collections;
    (function (Collections) {
        class Dictionary {
            constructor(toStrFunction) {
                this.table = {};
                this.nElements = 0;
                this.toStr = toStrFunction || Collections.Utils.defaultToString;
            }
            getValue(key) {
                const pair = this.table['$' + this.toStr(key)];
                if (Collections.Utils.isUndefined(pair)) {
                    return undefined;
                }
                return pair.value;
            }
            setValue(key, value) {
                if (Collections.Utils.isUndefined(key) || Collections.Utils.isUndefined(value)) {
                    return undefined;
                }
                let ret;
                const k = '$' + this.toStr(key);
                const previousElement = this.table[k];
                if (Collections.Utils.isUndefined(previousElement)) {
                    this.nElements++;
                    ret = undefined;
                }
                else {
                    ret = previousElement.value;
                }
                this.table[k] = {
                    key: key,
                    value: value
                };
                return ret;
            }
            remove(key) {
                const k = '$' + this.toStr(key);
                const previousElement = this.table[k];
                if (!Collections.Utils.isUndefined(previousElement)) {
                    delete this.table[k];
                    this.nElements--;
                    return previousElement.value;
                }
                return undefined;
            }
            keys() {
                const array = [];
                for (const name in this.table) {
                    if (Collections.has(this.table, name)) {
                        const pair = this.table[name];
                        array.push(pair.key);
                    }
                }
                return array;
            }
            values() {
                const array = [];
                for (const name in this.table) {
                    if (Collections.has(this.table, name)) {
                        const pair = this.table[name];
                        array.push(pair.value);
                    }
                }
                return array;
            }
            forEach(callback) {
                for (const name in this.table) {
                    if (Collections.has(this.table, name)) {
                        const pair = this.table[name];
                        const ret = callback(pair.key, pair.value);
                        if (ret === false) {
                            return;
                        }
                    }
                }
            }
            containsKey(key) {
                return !Collections.Utils.isUndefined(this.getValue(key));
            }
            clear() {
                this.table = {};
                this.nElements = 0;
            }
            size() {
                return this.nElements;
            }
            isEmpty() {
                return this.nElements <= 0;
            }
            toString() {
                let toret = '{';
                this.forEach((k, v) => {
                    toret += `\n\t${k} : ${v}`;
                });
                return toret + '\n}';
            }
        }
        Collections.Dictionary = Dictionary;
    })(Collections = RC.Collections || (RC.Collections = {}));
})(RC || (RC = {}));
var RC;
(function (RC) {
    var Collections;
    (function (Collections) {
        class FactoryDictionary extends Collections.Dictionary {
            constructor(defaultFactoryFunction, toStrFunction) {
                super(toStrFunction);
                this.defaultFactoryFunction = defaultFactoryFunction;
            }
            setDefault(key, defaultValue) {
                const currentValue = super.getValue(key);
                if (Collections.Utils.isUndefined(currentValue)) {
                    this.setValue(key, defaultValue);
                    return defaultValue;
                }
                return currentValue;
            }
            getValue(key) {
                return this.setDefault(key, this.defaultFactoryFunction());
            }
        }
        Collections.FactoryDictionary = FactoryDictionary;
    })(Collections = RC.Collections || (RC.Collections = {}));
})(RC || (RC = {}));
var RC;
(function (RC) {
    var Collections;
    (function (Collections) {
        class Heap {
            constructor(compareFunction) {
                this.data = [];
                this.compare = compareFunction || Collections.Utils.defaultCompare;
            }
            leftChildIndex(nodeIndex) {
                return (2 * nodeIndex) + 1;
            }
            rightChildIndex(nodeIndex) {
                return (2 * nodeIndex) + 2;
            }
            parentIndex(nodeIndex) {
                return Math.floor((nodeIndex - 1) / 2);
            }
            minIndex(leftChild, rightChild) {
                if (rightChild >= this.data.length) {
                    if (leftChild >= this.data.length) {
                        return -1;
                    }
                    else {
                        return leftChild;
                    }
                }
                else {
                    if (this.compare(this.data[leftChild], this.data[rightChild]) <= 0) {
                        return leftChild;
                    }
                    else {
                        return rightChild;
                    }
                }
            }
            siftUp(index) {
                let parent = this.parentIndex(index);
                while (index > 0 && this.compare(this.data[parent], this.data[index]) > 0) {
                    Collections.Arrays.swap(this.data, parent, index);
                    index = parent;
                    parent = this.parentIndex(index);
                }
            }
            siftDown(nodeIndex) {
                let min = this.minIndex(this.leftChildIndex(nodeIndex), this.rightChildIndex(nodeIndex));
                while (min >= 0 && this.compare(this.data[nodeIndex], this.data[min]) > 0) {
                    Collections.Arrays.swap(this.data, min, nodeIndex);
                    nodeIndex = min;
                    min = this.minIndex(this.leftChildIndex(nodeIndex), this.rightChildIndex(nodeIndex));
                }
            }
            peek() {
                if (this.data.length > 0) {
                    return this.data[0];
                }
                else {
                    return undefined;
                }
            }
            add(element) {
                if (Collections.Utils.isUndefined(element)) {
                    return false;
                }
                this.data.push(element);
                this.siftUp(this.data.length - 1);
                return true;
            }
            removeRoot() {
                if (this.data.length > 0) {
                    const obj = this.data[0];
                    this.data[0] = this.data[this.data.length - 1];
                    this.data.splice(this.data.length - 1, 1);
                    if (this.data.length > 0) {
                        this.siftDown(0);
                    }
                    return obj;
                }
                return undefined;
            }
            contains(element) {
                const equF = Collections.Utils.compareToEquals(this.compare);
                return Collections.Arrays.contains(this.data, element, equF);
            }
            size() {
                return this.data.length;
            }
            isEmpty() {
                return this.data.length <= 0;
            }
            clear() {
                this.data.length = 0;
            }
            forEach(callback) {
                Collections.Arrays.forEach(this.data, callback);
            }
            update() {
                if (this.data.length > 0)
                    this.siftDown(0);
            }
        }
        Collections.Heap = Heap;
    })(Collections = RC.Collections || (RC.Collections = {}));
})(RC || (RC = {}));
var RC;
(function (RC) {
    var Collections;
    (function (Collections) {
        class LinkedDictionaryPair {
            constructor(key, value) {
                this.key = key;
                this.value = value;
            }
            unlink() {
                this.prev.next = this.next;
                this.next.prev = this.prev;
            }
        }
        class HeadOrTailLinkedDictionaryPair {
            constructor() {
                this.key = null;
                this.value = null;
            }
            unlink() {
                this.prev.next = this.next;
                this.next.prev = this.prev;
            }
        }
        function isHeadOrTailLinkedDictionaryPair(p) {
            return p.next === null;
        }
        class LinkedDictionary extends Collections.Dictionary {
            constructor(toStrFunction) {
                super(toStrFunction);
                this.head = new HeadOrTailLinkedDictionaryPair();
                this.tail = new HeadOrTailLinkedDictionaryPair();
                this.head.next = this.tail;
                this.tail.prev = this.head;
            }
            appendToTail(entry) {
                const lastNode = this.tail.prev;
                lastNode.next = entry;
                entry.prev = lastNode;
                entry.next = this.tail;
                this.tail.prev = entry;
            }
            getLinkedDictionaryPair(key) {
                if (Collections.Utils.isUndefined(key)) {
                    return undefined;
                }
                const k = '$' + this.toStr(key);
                const pair = (this.table[k]);
                return pair;
            }
            getValue(key) {
                const pair = this.getLinkedDictionaryPair(key);
                if (!Collections.Utils.isUndefined(pair)) {
                    return pair.value;
                }
                return undefined;
            }
            remove(key) {
                const pair = this.getLinkedDictionaryPair(key);
                if (!Collections.Utils.isUndefined(pair)) {
                    super.remove(key);
                    pair.unlink();
                    return pair.value;
                }
                return undefined;
            }
            clear() {
                super.clear();
                this.head.next = this.tail;
                this.tail.prev = this.head;
            }
            replace(oldPair, newPair) {
                const k = '$' + this.toStr(newPair.key);
                newPair.next = oldPair.next;
                newPair.prev = oldPair.prev;
                this.remove(oldPair.key);
                newPair.prev.next = newPair;
                newPair.next.prev = newPair;
                this.table[k] = newPair;
                ++this.nElements;
            }
            setValue(key, value) {
                if (Collections.Utils.isUndefined(key) || Collections.Utils.isUndefined(value)) {
                    return undefined;
                }
                const existingPair = this.getLinkedDictionaryPair(key);
                const newPair = new LinkedDictionaryPair(key, value);
                const k = '$' + this.toStr(key);
                if (!Collections.Utils.isUndefined(existingPair)) {
                    this.replace(existingPair, newPair);
                    return existingPair.value;
                }
                else {
                    this.appendToTail(newPair);
                    this.table[k] = newPair;
                    ++this.nElements;
                    return undefined;
                }
            }
            keys() {
                const array = [];
                this.forEach((key, value) => {
                    array.push(key);
                });
                return array;
            }
            values() {
                const array = [];
                this.forEach((key, value) => {
                    array.push(value);
                });
                return array;
            }
            forEach(callback) {
                let crawlNode = this.head.next;
                while (!isHeadOrTailLinkedDictionaryPair(crawlNode)) {
                    const ret = callback(crawlNode.key, crawlNode.value);
                    if (ret === false) {
                        return;
                    }
                    crawlNode = crawlNode.next;
                }
            }
        }
        Collections.LinkedDictionary = LinkedDictionary;
    })(Collections = RC.Collections || (RC.Collections = {}));
})(RC || (RC = {}));
var RC;
(function (RC) {
    var Collections;
    (function (Collections) {
        class LinkedList {
            constructor() {
                this.firstNode = null;
                this.lastNode = null;
                this.nElements = 0;
            }
            add(item, index) {
                if (Collections.Utils.isUndefined(index)) {
                    index = this.nElements;
                }
                if (index < 0 || index > this.nElements || Collections.Utils.isUndefined(item)) {
                    return false;
                }
                const newNode = this.createNode(item);
                if (this.nElements === 0 || this.lastNode === null) {
                    this.firstNode = newNode;
                    this.lastNode = newNode;
                }
                else if (index === this.nElements) {
                    this.lastNode.next = newNode;
                    this.lastNode = newNode;
                }
                else if (index === 0) {
                    newNode.next = this.firstNode;
                    this.firstNode = newNode;
                }
                else {
                    const prev = this.nodeAtIndex(index - 1);
                    if (prev == null) {
                        return false;
                    }
                    newNode.next = prev.next;
                    prev.next = newNode;
                }
                this.nElements++;
                return true;
            }
            first() {
                if (this.firstNode !== null) {
                    return this.firstNode.element;
                }
                return null;
            }
            last() {
                if (this.lastNode !== null) {
                    return this.lastNode.element;
                }
                return null;
            }
            elementAtIndex(index) {
                const node = this.nodeAtIndex(index);
                if (node === null) {
                    return null;
                }
                return node.element;
            }
            indexOf(item, equalsFunction) {
                const equalsF = equalsFunction || Collections.Utils.defaultEquals;
                if (Collections.Utils.isUndefined(item)) {
                    return -1;
                }
                let currentNode = this.firstNode;
                let index = 0;
                while (currentNode !== null) {
                    if (equalsF(currentNode.element, item)) {
                        return index;
                    }
                    index++;
                    currentNode = currentNode.next;
                }
                return -1;
            }
            contains(item, equalsFunction) {
                return (this.indexOf(item, equalsFunction) >= 0);
            }
            remove(item, equalsFunction) {
                const equalsF = equalsFunction || Collections.Utils.defaultEquals;
                if (this.nElements < 1 || Collections.Utils.isUndefined(item)) {
                    return false;
                }
                let previous = null;
                let currentNode = this.firstNode;
                while (currentNode !== null) {
                    if (equalsF(currentNode.element, item)) {
                        if (previous == null) {
                            this.firstNode = currentNode.next;
                            if (currentNode === this.lastNode) {
                                this.lastNode = null;
                            }
                        }
                        else if (currentNode === this.lastNode) {
                            this.lastNode = previous;
                            previous.next = currentNode.next;
                            currentNode.next = null;
                        }
                        else {
                            previous.next = currentNode.next;
                            currentNode.next = null;
                        }
                        this.nElements--;
                        return true;
                    }
                    previous = currentNode;
                    currentNode = currentNode.next;
                }
                return false;
            }
            clear() {
                this.firstNode = null;
                this.lastNode = null;
                this.nElements = 0;
            }
            equals(other, equalsFunction) {
                const eqF = equalsFunction || Collections.Utils.defaultEquals;
                if (!(other instanceof LinkedList)) {
                    return false;
                }
                if (this.size() !== other.size()) {
                    return false;
                }
                return this.equalsAux(this.firstNode, other.firstNode, eqF);
            }
            equalsAux(n1, n2, eqF) {
                while (n1 !== null && n2 !== null) {
                    if (!eqF(n1.element, n2.element)) {
                        return false;
                    }
                    n1 = n1.next;
                    n2 = n2.next;
                }
                return true;
            }
            removeElementAtIndex(index) {
                if (index < 0 || index >= this.nElements || this.firstNode === null || this.lastNode === null) {
                    return null;
                }
                let element = null;
                if (this.nElements === 1) {
                    element = this.firstNode.element;
                    this.firstNode = null;
                    this.lastNode = null;
                }
                else {
                    const previous = this.nodeAtIndex(index - 1);
                    if (previous === null) {
                        element = this.firstNode.element;
                        this.firstNode = this.firstNode.next;
                    }
                    else if (previous.next === this.lastNode) {
                        element = this.lastNode.element;
                        this.lastNode = previous;
                    }
                    if (previous !== null && previous.next !== null) {
                        element = previous.next.element;
                        previous.next = previous.next.next;
                    }
                }
                this.nElements--;
                return element;
            }
            forEach(callback) {
                let currentNode = this.firstNode;
                while (currentNode !== null) {
                    if (callback(currentNode.element) === false) {
                        break;
                    }
                    currentNode = currentNode.next;
                }
            }
            reverse() {
                let previous = null;
                let current = this.firstNode;
                let temp;
                while (current !== null) {
                    temp = current.next;
                    current.next = previous;
                    previous = current;
                    current = temp;
                }
                temp = this.firstNode;
                this.firstNode = this.lastNode;
                this.lastNode = temp;
            }
            toArray() {
                const array = [];
                let currentNode = this.firstNode;
                while (currentNode !== null) {
                    array.push(currentNode.element);
                    currentNode = currentNode.next;
                }
                return array;
            }
            size() {
                return this.nElements;
            }
            isEmpty() {
                return this.nElements <= 0;
            }
            toString() {
                return Collections.Arrays.toString(this.toArray());
            }
            nodeAtIndex(index) {
                if (index < 0 || index >= this.nElements) {
                    return null;
                }
                if (index === (this.nElements - 1)) {
                    return this.lastNode;
                }
                let node = this.firstNode;
                for (let i = 0; i < index && node != null; i++) {
                    node = node.next;
                }
                return node;
            }
            createNode(item) {
                return {
                    element: item,
                    next: null
                };
            }
        }
        Collections.LinkedList = LinkedList;
    })(Collections = RC.Collections || (RC.Collections = {}));
})(RC || (RC = {}));
var RC;
(function (RC) {
    var Collections;
    (function (Collections) {
        class MultiDictionary {
            constructor(toStrFunction, valuesEqualsFunction, allowDuplicateValues = false) {
                this.dict = new Collections.Dictionary(toStrFunction);
                this.equalsF = valuesEqualsFunction || Collections.Utils.defaultEquals;
                this.allowDuplicate = allowDuplicateValues;
            }
            getValue(key) {
                const values = this.dict.getValue(key);
                if (Collections.Utils.isUndefined(values)) {
                    return [];
                }
                return Collections.Arrays.copy(values);
            }
            setValue(key, value) {
                if (Collections.Utils.isUndefined(key) || Collections.Utils.isUndefined(value)) {
                    return false;
                }
                const array = this.dict.getValue(key);
                if (Collections.Utils.isUndefined(array)) {
                    this.dict.setValue(key, [value]);
                    return true;
                }
                if (!this.allowDuplicate) {
                    if (Collections.Arrays.contains(array, value, this.equalsF)) {
                        return false;
                    }
                }
                array.push(value);
                return true;
            }
            remove(key, value) {
                if (Collections.Utils.isUndefined(value)) {
                    const v = this.dict.remove(key);
                    return !Collections.Utils.isUndefined(v);
                }
                const array = this.dict.getValue(key);
                if (!Collections.Utils.isUndefined(array) && Collections.Arrays.remove(array, value, this.equalsF)) {
                    if (array.length === 0) {
                        this.dict.remove(key);
                    }
                    return true;
                }
                return false;
            }
            keys() {
                return this.dict.keys();
            }
            values() {
                const values = this.dict.values();
                const array = [];
                for (const v of values) {
                    for (const w of v) {
                        array.push(w);
                    }
                }
                return array;
            }
            containsKey(key) {
                return this.dict.containsKey(key);
            }
            clear() {
                this.dict.clear();
            }
            size() {
                return this.dict.size();
            }
            isEmpty() {
                return this.dict.isEmpty();
            }
        }
        Collections.MultiDictionary = MultiDictionary;
    })(Collections = RC.Collections || (RC.Collections = {}));
})(RC || (RC = {}));
var RC;
(function (RC) {
    var Collections;
    (function (Collections) {
        let Direction;
        (function (Direction) {
            Direction[Direction["BEFORE"] = 0] = "BEFORE";
            Direction[Direction["AFTER"] = 1] = "AFTER";
            Direction[Direction["INSIDE_AT_END"] = 2] = "INSIDE_AT_END";
            Direction[Direction["INSIDE_AT_START"] = 3] = "INSIDE_AT_START";
        })(Direction || (Direction = {}));
        class MultiRootTree {
            constructor(rootIds = [], nodes = {}) {
                this.rootIds = rootIds;
                this.nodes = nodes;
                this.initRootIds();
                this.initNodes();
            }
            initRootIds() {
                for (let rootId of this.rootIds) {
                    this.createEmptyNodeIfNotExist(rootId);
                }
            }
            initNodes() {
                for (let nodeKey in this.nodes) {
                    if (this.nodes.hasOwnProperty(nodeKey)) {
                        for (let nodeListItem of this.nodes[nodeKey]) {
                            this.createEmptyNodeIfNotExist(nodeListItem);
                        }
                    }
                }
            }
            createEmptyNodeIfNotExist(nodeKey) {
                if (!this.nodes[nodeKey]) {
                    this.nodes[nodeKey] = [];
                }
            }
            getRootIds() {
                let clone = this.rootIds.slice();
                return clone;
            }
            getNodes() {
                let clone = {};
                for (let nodeKey in this.nodes) {
                    if (this.nodes.hasOwnProperty(nodeKey)) {
                        clone[nodeKey] = this.nodes[nodeKey].slice();
                    }
                }
                return clone;
            }
            getObject() {
                return {
                    rootIds: this.getRootIds(),
                    nodes: this.getNodes(),
                };
            }
            toObject() {
                return this.getObject();
            }
            flatten() {
                const _this = this;
                let extraPropsObject = [];
                for (const rootId of this.rootIds) {
                    extraPropsObject.push({
                        id: rootId,
                        level: 0,
                        hasParent: false,
                        childrenCount: 0,
                    });
                    traverse(rootId, this.nodes, extraPropsObject, 0);
                }
                for (let o of extraPropsObject) {
                    o.childrenCount = countChildren(o.id);
                }
                return extraPropsObject;
                function countChildren(id) {
                    if (!_this.nodes[id]) {
                        return 0;
                    }
                    else {
                        const childrenCount = _this.nodes[id].length;
                        return childrenCount;
                    }
                }
                function traverse(startId, nodes, returnArray, level = 0) {
                    if (!startId || !nodes || !returnArray || !nodes[startId]) {
                        return;
                    }
                    level++;
                    let idsList = nodes[startId];
                    for (const id of idsList) {
                        returnArray.push({ id, level, hasParent: true });
                        traverse(id, nodes, returnArray, level);
                    }
                    level--;
                }
            }
            moveIdBeforeId(moveId, beforeId) {
                return this.moveId(moveId, beforeId, Direction.BEFORE);
            }
            moveIdAfterId(moveId, afterId) {
                return this.moveId(moveId, afterId, Direction.AFTER);
            }
            moveIdIntoId(moveId, insideId, atStart = true) {
                if (atStart) {
                    return this.moveId(moveId, insideId, Direction.INSIDE_AT_START);
                }
                else {
                    return this.moveId(moveId, insideId, Direction.INSIDE_AT_END);
                }
            }
            swapRootIdWithRootId(rootId, withRootId) {
                let leftIndex = this.findRootId(rootId);
                let rightIndex = this.findRootId(withRootId);
                this.swapRootPositionWithRootPosition(leftIndex, rightIndex);
            }
            swapRootPositionWithRootPosition(swapRootPosition, withRootPosition) {
                let temp = this.rootIds[withRootPosition];
                this.rootIds[withRootPosition] = this.rootIds[swapRootPosition];
                this.rootIds[swapRootPosition] = temp;
            }
            deleteId(id) {
                this.rootDeleteId(id);
                this.nodeAndSubNodesDelete(id);
                this.nodeRefrencesDelete(id);
            }
            insertIdBeforeId(beforeId, insertId) {
                let foundRootIdIndex = this.findRootId(beforeId);
                if (foundRootIdIndex > -1) {
                    this.insertIdIntoRoot(insertId, foundRootIdIndex);
                }
                for (let nodeKey in this.nodes) {
                    if (this.nodes.hasOwnProperty(nodeKey)) {
                        let foundNodeIdIndex = this.findNodeId(nodeKey, beforeId);
                        if (foundNodeIdIndex > -1) {
                            this.insertIdIntoNode(nodeKey, insertId, foundNodeIdIndex);
                        }
                    }
                }
            }
            insertIdAfterId(belowId, insertId) {
                let foundRootIdIndex = this.findRootId(belowId);
                if (foundRootIdIndex > -1) {
                    this.insertIdIntoRoot(insertId, foundRootIdIndex + 1);
                }
                for (let nodeKey in this.nodes) {
                    if (this.nodes.hasOwnProperty(nodeKey)) {
                        let foundNodeIdIndex = this.findNodeId(nodeKey, belowId);
                        if (foundNodeIdIndex > -1) {
                            this.insertIdIntoNode(nodeKey, insertId, foundNodeIdIndex + 1);
                        }
                    }
                }
            }
            insertIdIntoId(insideId, insertId) {
                this.nodeInsertAtEnd(insideId, insertId);
                this.nodes[insertId] = [];
            }
            insertIdIntoRoot(id, position) {
                if (position === undefined) {
                    this.rootInsertAtEnd(id);
                }
                else {
                    if (position < 0) {
                        const length = this.rootIds.length;
                        this.rootIds.splice((position + length + 1), 0, id);
                    }
                    else {
                        this.rootIds.splice(position, 0, id);
                    }
                }
                this.nodes[id] = this.nodes[id] || [];
            }
            insertIdIntoNode(nodeKey, id, position) {
                this.nodes[nodeKey] = this.nodes[nodeKey] || [];
                this.nodes[id] = this.nodes[id] || [];
                if (position === undefined) {
                    this.nodeInsertAtEnd(nodeKey, id);
                }
                else {
                    if (position < 0) {
                        const length = this.nodes[nodeKey].length;
                        this.nodes[nodeKey].splice((position + length + 1), 0, id);
                    }
                    else {
                        this.nodes[nodeKey].splice(position, 0, id);
                    }
                }
            }
            moveId(moveId, beforeId, direction) {
                let sourceId = moveId;
                const sourceRootIndex = this.findRootId(sourceId);
                let sourceNodeKey;
                let sourceNodeIdIndex;
                if (this.nodes[beforeId]) {
                    sourceNodeKey = beforeId;
                }
                for (let nodeKey in this.nodes) {
                    if (this.nodes.hasOwnProperty(nodeKey)) {
                        sourceNodeIdIndex = this.findNodeId(nodeKey, beforeId);
                        break;
                    }
                }
                let targetId = beforeId;
                let targetRootIndex = this.findRootId(targetId);
                let targetNodeKey;
                let targetNodeIdIndex;
                if (this.nodes[beforeId]) {
                    targetNodeKey = beforeId;
                }
                for (let nodeKey in this.nodes) {
                    if (this.nodes.hasOwnProperty(nodeKey)) {
                        targetNodeIdIndex = this.findNodeId(nodeKey, beforeId);
                        break;
                    }
                }
                if (sourceRootIndex > -1) {
                    if (targetRootIndex > -1) {
                        this.rootDelete(sourceRootIndex);
                        if (targetRootIndex > sourceRootIndex) {
                            targetRootIndex--;
                        }
                        else {
                        }
                        switch (direction) {
                            case Direction.BEFORE:
                                this.insertIdIntoRoot(sourceId, targetRootIndex);
                                break;
                            case Direction.AFTER:
                                this.insertIdIntoRoot(sourceId, targetRootIndex + 1);
                                break;
                            case Direction.INSIDE_AT_START:
                                this.nodeInsertAtStart(targetId, sourceId);
                                break;
                            case Direction.INSIDE_AT_END:
                                this.nodeInsertAtEnd(targetId, sourceId);
                                break;
                        }
                    }
                    else {
                        this.rootDelete(sourceRootIndex);
                        for (let nodeKey in this.nodes) {
                            if (this.nodes.hasOwnProperty(nodeKey)) {
                                let index = this.findNodeId(nodeKey, targetId);
                                if (index > -1) {
                                    switch (direction) {
                                        case Direction.BEFORE:
                                            this.insertIdIntoNode(nodeKey, sourceId, index);
                                            break;
                                        case Direction.AFTER:
                                            this.insertIdIntoNode(nodeKey, sourceId, index + 1);
                                            break;
                                        case Direction.INSIDE_AT_START:
                                            this.nodeInsertAtStart(targetId, sourceId);
                                            break;
                                        case Direction.INSIDE_AT_END:
                                            this.nodeInsertAtEnd(targetId, sourceId);
                                            break;
                                    }
                                    break;
                                }
                            }
                        }
                    }
                }
                else {
                    if (targetRootIndex > -1) {
                        for (let nodeKey in this.nodes) {
                            if (this.nodes.hasOwnProperty(nodeKey)) {
                                let index = this.findNodeId(nodeKey, sourceId);
                                if (index > -1) {
                                    this.nodeDeleteAtIndex(nodeKey, index);
                                    break;
                                }
                            }
                        }
                        switch (direction) {
                            case Direction.BEFORE:
                                this.insertIdIntoRoot(sourceId, targetRootIndex);
                                break;
                            case Direction.AFTER:
                                this.insertIdIntoRoot(sourceId, targetRootIndex + 1);
                                break;
                            case Direction.INSIDE_AT_START:
                                this.nodeInsertAtStart(targetId, sourceId);
                                break;
                            case Direction.INSIDE_AT_END:
                                this.nodeInsertAtEnd(targetId, sourceId);
                                break;
                        }
                    }
                    else {
                        for (let nodeKey in this.nodes) {
                            if (this.nodes.hasOwnProperty(nodeKey)) {
                                let index = this.findNodeId(nodeKey, sourceId);
                                if (index > -1) {
                                    this.nodeDeleteAtIndex(nodeKey, index);
                                    break;
                                }
                            }
                        }
                        for (let nodeKey in this.nodes) {
                            if (this.nodes.hasOwnProperty(nodeKey)) {
                                let index = this.findNodeId(nodeKey, targetId);
                                if (index > -1) {
                                    switch (direction) {
                                        case Direction.BEFORE:
                                            this.insertIdIntoNode(nodeKey, sourceId, index);
                                            break;
                                        case Direction.AFTER:
                                            this.insertIdIntoNode(nodeKey, sourceId, index + 1);
                                            break;
                                        case Direction.INSIDE_AT_START:
                                            this.nodeInsertAtStart(targetId, sourceId);
                                            break;
                                        case Direction.INSIDE_AT_END:
                                            this.nodeInsertAtEnd(targetId, sourceId);
                                            break;
                                    }
                                    break;
                                }
                            }
                        }
                    }
                }
            }
            swapArrayElements(arr, indexA, indexB) {
                let temp = arr[indexA];
                arr[indexA] = arr[indexB];
                arr[indexB] = temp;
                return arr;
            }
            rootDeleteId(id) {
                let index = this.findRootId(id);
                if (index > -1) {
                    this.rootDelete(index);
                }
            }
            nodeAndSubNodesDelete(nodeKey) {
                let toDeleteLater = [];
                for (const id of this.nodes[nodeKey]) {
                    this.nodeAndSubNodesDelete(id);
                    toDeleteLater.push(nodeKey);
                }
                this.nodeDelete(nodeKey);
                for (const str of toDeleteLater) {
                    this.nodeDelete(str);
                }
            }
            nodeRefrencesDelete(id) {
                for (let nodeKey in this.nodes) {
                    if (this.nodes.hasOwnProperty(nodeKey)) {
                        for (let i = 0; i < this.nodes[nodeKey].length; i++) {
                            let targetId = this.nodes[nodeKey][i];
                            if (targetId === id) {
                                this.nodeDeleteAtIndex(nodeKey, i);
                            }
                        }
                    }
                }
            }
            nodeDelete(nodeKey) {
                delete this.nodes[nodeKey];
            }
            findRootId(id) {
                return this.rootIds.indexOf(id);
            }
            findNodeId(nodeKey, id) {
                return this.nodes[nodeKey].indexOf(id);
            }
            findNode(nodeKey) {
                return this.nodes[nodeKey];
            }
            nodeInsertAtStart(nodeKey, id) {
                this.nodes[nodeKey].unshift(id);
            }
            nodeInsertAtEnd(nodeKey, id) {
                this.nodes[nodeKey].push(id);
            }
            rootDelete(index) {
                this.rootIds.splice(index, 1);
            }
            nodeDeleteAtIndex(nodeKey, index) {
                this.nodes[nodeKey].splice(index, 1);
            }
            rootInsertAtStart(id) {
                this.rootIds.unshift(id);
            }
            rootInsertAtEnd(id) {
                this.rootIds.push(id);
            }
        }
        Collections.MultiRootTree = MultiRootTree;
    })(Collections = RC.Collections || (RC.Collections = {}));
})(RC || (RC = {}));
var RC;
(function (RC) {
    var Collections;
    (function (Collections) {
        class PriorityQueue {
            constructor(compareFunction) {
                this.heap = new Collections.Heap(Collections.Utils.reverseCompareFunction(compareFunction));
            }
            enqueue(element) {
                return this.heap.add(element);
            }
            add(element) {
                return this.heap.add(element);
            }
            dequeue() {
                if (this.heap.size() !== 0) {
                    const el = this.heap.peek();
                    this.heap.removeRoot();
                    return el;
                }
                return undefined;
            }
            peek() {
                return this.heap.peek();
            }
            contains(element) {
                return this.heap.contains(element);
            }
            isEmpty() {
                return this.heap.isEmpty();
            }
            size() {
                return this.heap.size();
            }
            clear() {
                this.heap.clear();
            }
            forEach(callback) {
                this.heap.forEach(callback);
            }
            update() {
                this.heap.update();
            }
        }
        Collections.PriorityQueue = PriorityQueue;
    })(Collections = RC.Collections || (RC.Collections = {}));
})(RC || (RC = {}));
var RC;
(function (RC) {
    var Collections;
    (function (Collections) {
        class Queue {
            constructor() {
                this.list = new Collections.LinkedList();
            }
            enqueue(elem) {
                return this.list.add(elem);
            }
            add(elem) {
                return this.list.add(elem);
            }
            dequeue() {
                if (this.list.size() !== 0) {
                    const el = this.list.first();
                    this.list.removeElementAtIndex(0);
                    return el;
                }
                return null;
            }
            peek() {
                if (this.list.size() !== 0) {
                    return this.list.first();
                }
                return null;
            }
            size() {
                return this.list.size();
            }
            contains(elem, equalsFunction) {
                return this.list.contains(elem, equalsFunction);
            }
            isEmpty() {
                return this.list.size() <= 0;
            }
            clear() {
                this.list.clear();
            }
            forEach(callback) {
                this.list.forEach(callback);
            }
        }
        Collections.Queue = Queue;
    })(Collections = RC.Collections || (RC.Collections = {}));
})(RC || (RC = {}));
var RC;
(function (RC) {
    var Collections;
    (function (Collections) {
        class Set {
            constructor(toStringFunction) {
                this.dictionary = new Collections.Dictionary(toStringFunction);
            }
            contains(element) {
                return this.dictionary.containsKey(element);
            }
            add(element) {
                if (this.contains(element) || Collections.Utils.isUndefined(element)) {
                    return false;
                }
                else {
                    this.dictionary.setValue(element, element);
                    return true;
                }
            }
            intersection(otherSet) {
                const set = this;
                this.forEach(function (element) {
                    if (!otherSet.contains(element)) {
                        set.remove(element);
                    }
                    return true;
                });
            }
            union(otherSet) {
                const set = this;
                otherSet.forEach(function (element) {
                    set.add(element);
                    return true;
                });
            }
            difference(otherSet) {
                const set = this;
                otherSet.forEach(function (element) {
                    set.remove(element);
                    return true;
                });
            }
            isSubsetOf(otherSet) {
                if (this.size() > otherSet.size()) {
                    return false;
                }
                let isSub = true;
                this.forEach(function (element) {
                    if (!otherSet.contains(element)) {
                        isSub = false;
                        return false;
                    }
                    return true;
                });
                return isSub;
            }
            remove(element) {
                if (!this.contains(element)) {
                    return false;
                }
                else {
                    this.dictionary.remove(element);
                    return true;
                }
            }
            forEach(callback) {
                this.dictionary.forEach(function (k, v) {
                    return callback(v);
                });
            }
            toArray() {
                return this.dictionary.values();
            }
            isEmpty() {
                return this.dictionary.isEmpty();
            }
            size() {
                return this.dictionary.size();
            }
            clear() {
                this.dictionary.clear();
            }
            toString() {
                return Collections.Arrays.toString(this.toArray());
            }
        }
        Collections.Set = Set;
    })(Collections = RC.Collections || (RC.Collections = {}));
})(RC || (RC = {}));
var RC;
(function (RC) {
    var Collections;
    (function (Collections) {
        class Stack {
            constructor() {
                this.list = new Collections.LinkedList();
            }
            push(elem) {
                return this.list.add(elem, 0);
            }
            add(elem) {
                return this.list.add(elem, 0);
            }
            pop() {
                return this.list.removeElementAtIndex(0);
            }
            peek() {
                return this.list.first();
            }
            size() {
                return this.list.size();
            }
            contains(elem, equalsFunction) {
                return this.list.contains(elem, equalsFunction);
            }
            isEmpty() {
                return this.list.isEmpty();
            }
            clear() {
                this.list.clear();
            }
            forEach(callback) {
                this.list.forEach(callback);
            }
        }
        Collections.Stack = Stack;
    })(Collections = RC.Collections || (RC.Collections = {}));
})(RC || (RC = {}));
var RC;
(function (RC) {
    var Collections;
    (function (Collections) {
        const _hasOwnProperty = Object.prototype.hasOwnProperty;
        Collections.has = function (obj, prop) {
            return _hasOwnProperty.call(obj, prop);
        };
        class Utils {
            static defaultCompare(a, b) {
                if (a < b) {
                    return -1;
                }
                else if (a === b) {
                    return 0;
                }
                else {
                    return 1;
                }
            }
            static defaultEquals(a, b) {
                return a === b;
            }
            static defaultToString(item) {
                if (item === null) {
                    return 'COLLECTION_NULL';
                }
                else if (Utils.isUndefined(item)) {
                    return 'COLLECTION_UNDEFINED';
                }
                else if (Utils.isString(item)) {
                    return '$s' + item;
                }
                else {
                    return '$o' + item.toString();
                }
            }
            static makeString(item, join = ',') {
                if (item === null) {
                    return 'COLLECTION_NULL';
                }
                else if (Utils.isUndefined(item)) {
                    return 'COLLECTION_UNDEFINED';
                }
                else if (Utils.isString(item)) {
                    return item.toString();
                }
                else {
                    let toret = '{';
                    let first = true;
                    for (const prop in item) {
                        if (Collections.has(item, prop)) {
                            if (first) {
                                first = false;
                            }
                            else {
                                toret = toret + join;
                            }
                            toret = toret + prop + ':' + item[prop];
                        }
                    }
                    return toret + '}';
                }
            }
            static isFunction(func) {
                return (typeof func) === 'function';
            }
            static isUndefined(obj) {
                return (typeof obj) === 'undefined';
            }
            static isString(obj) {
                return Object.prototype.toString.call(obj) === '[object String]';
            }
            static reverseCompareFunction(compareFunction) {
                if (Utils.isUndefined(compareFunction) || !Utils.isFunction(compareFunction)) {
                    return function (a, b) {
                        if (a < b) {
                            return 1;
                        }
                        else if (a === b) {
                            return 0;
                        }
                        else {
                            return -1;
                        }
                    };
                }
                else {
                    return function (d, v) {
                        return compareFunction(d, v) * -1;
                    };
                }
            }
            static compareToEquals(compareFunction) {
                return function (a, b) {
                    return compareFunction(a, b) === 0;
                };
            }
        }
        Collections.Utils = Utils;
    })(Collections = RC.Collections || (RC.Collections = {}));
})(RC || (RC = {}));
var RC;
(function (RC) {
    var Crypto;
    (function (Crypto) {
        class Md5 {
            constructor() {
                this._state = new Int32Array(4);
                this._buffer = new ArrayBuffer(68);
                this._buffer8 = new Uint8Array(this._buffer, 0, 68);
                this._buffer32 = new Uint32Array(this._buffer, 0, 17);
                this.start();
            }
            static hashStr(str, raw = false) {
                return this.onePassHasher
                    .start()
                    .appendStr(str)
                    .end(raw);
            }
            static hashAsciiStr(str, raw = false) {
                return this.onePassHasher
                    .start()
                    .appendAsciiStr(str)
                    .end(raw);
            }
            static _hex(x) {
                const hc = Md5.hexChars;
                const ho = Md5.hexOut;
                let n;
                let offset;
                let j;
                let i;
                for (i = 0; i < 4; i += 1) {
                    offset = i * 8;
                    n = x[i];
                    for (j = 0; j < 8; j += 2) {
                        ho[offset + 1 + j] = hc.charAt(n & 0x0F);
                        n >>>= 4;
                        ho[offset + 0 + j] = hc.charAt(n & 0x0F);
                        n >>>= 4;
                    }
                }
                return ho.join('');
            }
            static _md5cycle(x, k) {
                let a = x[0];
                let b = x[1];
                let c = x[2];
                let d = x[3];
                a += (b & c | ~b & d) + k[0] - 680876936 | 0;
                a = (a << 7 | a >>> 25) + b | 0;
                d += (a & b | ~a & c) + k[1] - 389564586 | 0;
                d = (d << 12 | d >>> 20) + a | 0;
                c += (d & a | ~d & b) + k[2] + 606105819 | 0;
                c = (c << 17 | c >>> 15) + d | 0;
                b += (c & d | ~c & a) + k[3] - 1044525330 | 0;
                b = (b << 22 | b >>> 10) + c | 0;
                a += (b & c | ~b & d) + k[4] - 176418897 | 0;
                a = (a << 7 | a >>> 25) + b | 0;
                d += (a & b | ~a & c) + k[5] + 1200080426 | 0;
                d = (d << 12 | d >>> 20) + a | 0;
                c += (d & a | ~d & b) + k[6] - 1473231341 | 0;
                c = (c << 17 | c >>> 15) + d | 0;
                b += (c & d | ~c & a) + k[7] - 45705983 | 0;
                b = (b << 22 | b >>> 10) + c | 0;
                a += (b & c | ~b & d) + k[8] + 1770035416 | 0;
                a = (a << 7 | a >>> 25) + b | 0;
                d += (a & b | ~a & c) + k[9] - 1958414417 | 0;
                d = (d << 12 | d >>> 20) + a | 0;
                c += (d & a | ~d & b) + k[10] - 42063 | 0;
                c = (c << 17 | c >>> 15) + d | 0;
                b += (c & d | ~c & a) + k[11] - 1990404162 | 0;
                b = (b << 22 | b >>> 10) + c | 0;
                a += (b & c | ~b & d) + k[12] + 1804603682 | 0;
                a = (a << 7 | a >>> 25) + b | 0;
                d += (a & b | ~a & c) + k[13] - 40341101 | 0;
                d = (d << 12 | d >>> 20) + a | 0;
                c += (d & a | ~d & b) + k[14] - 1502002290 | 0;
                c = (c << 17 | c >>> 15) + d | 0;
                b += (c & d | ~c & a) + k[15] + 1236535329 | 0;
                b = (b << 22 | b >>> 10) + c | 0;
                a += (b & d | c & ~d) + k[1] - 165796510 | 0;
                a = (a << 5 | a >>> 27) + b | 0;
                d += (a & c | b & ~c) + k[6] - 1069501632 | 0;
                d = (d << 9 | d >>> 23) + a | 0;
                c += (d & b | a & ~b) + k[11] + 643717713 | 0;
                c = (c << 14 | c >>> 18) + d | 0;
                b += (c & a | d & ~a) + k[0] - 373897302 | 0;
                b = (b << 20 | b >>> 12) + c | 0;
                a += (b & d | c & ~d) + k[5] - 701558691 | 0;
                a = (a << 5 | a >>> 27) + b | 0;
                d += (a & c | b & ~c) + k[10] + 38016083 | 0;
                d = (d << 9 | d >>> 23) + a | 0;
                c += (d & b | a & ~b) + k[15] - 660478335 | 0;
                c = (c << 14 | c >>> 18) + d | 0;
                b += (c & a | d & ~a) + k[4] - 405537848 | 0;
                b = (b << 20 | b >>> 12) + c | 0;
                a += (b & d | c & ~d) + k[9] + 568446438 | 0;
                a = (a << 5 | a >>> 27) + b | 0;
                d += (a & c | b & ~c) + k[14] - 1019803690 | 0;
                d = (d << 9 | d >>> 23) + a | 0;
                c += (d & b | a & ~b) + k[3] - 187363961 | 0;
                c = (c << 14 | c >>> 18) + d | 0;
                b += (c & a | d & ~a) + k[8] + 1163531501 | 0;
                b = (b << 20 | b >>> 12) + c | 0;
                a += (b & d | c & ~d) + k[13] - 1444681467 | 0;
                a = (a << 5 | a >>> 27) + b | 0;
                d += (a & c | b & ~c) + k[2] - 51403784 | 0;
                d = (d << 9 | d >>> 23) + a | 0;
                c += (d & b | a & ~b) + k[7] + 1735328473 | 0;
                c = (c << 14 | c >>> 18) + d | 0;
                b += (c & a | d & ~a) + k[12] - 1926607734 | 0;
                b = (b << 20 | b >>> 12) + c | 0;
                a += (b ^ c ^ d) + k[5] - 378558 | 0;
                a = (a << 4 | a >>> 28) + b | 0;
                d += (a ^ b ^ c) + k[8] - 2022574463 | 0;
                d = (d << 11 | d >>> 21) + a | 0;
                c += (d ^ a ^ b) + k[11] + 1839030562 | 0;
                c = (c << 16 | c >>> 16) + d | 0;
                b += (c ^ d ^ a) + k[14] - 35309556 | 0;
                b = (b << 23 | b >>> 9) + c | 0;
                a += (b ^ c ^ d) + k[1] - 1530992060 | 0;
                a = (a << 4 | a >>> 28) + b | 0;
                d += (a ^ b ^ c) + k[4] + 1272893353 | 0;
                d = (d << 11 | d >>> 21) + a | 0;
                c += (d ^ a ^ b) + k[7] - 155497632 | 0;
                c = (c << 16 | c >>> 16) + d | 0;
                b += (c ^ d ^ a) + k[10] - 1094730640 | 0;
                b = (b << 23 | b >>> 9) + c | 0;
                a += (b ^ c ^ d) + k[13] + 681279174 | 0;
                a = (a << 4 | a >>> 28) + b | 0;
                d += (a ^ b ^ c) + k[0] - 358537222 | 0;
                d = (d << 11 | d >>> 21) + a | 0;
                c += (d ^ a ^ b) + k[3] - 722521979 | 0;
                c = (c << 16 | c >>> 16) + d | 0;
                b += (c ^ d ^ a) + k[6] + 76029189 | 0;
                b = (b << 23 | b >>> 9) + c | 0;
                a += (b ^ c ^ d) + k[9] - 640364487 | 0;
                a = (a << 4 | a >>> 28) + b | 0;
                d += (a ^ b ^ c) + k[12] - 421815835 | 0;
                d = (d << 11 | d >>> 21) + a | 0;
                c += (d ^ a ^ b) + k[15] + 530742520 | 0;
                c = (c << 16 | c >>> 16) + d | 0;
                b += (c ^ d ^ a) + k[2] - 995338651 | 0;
                b = (b << 23 | b >>> 9) + c | 0;
                a += (c ^ (b | ~d)) + k[0] - 198630844 | 0;
                a = (a << 6 | a >>> 26) + b | 0;
                d += (b ^ (a | ~c)) + k[7] + 1126891415 | 0;
                d = (d << 10 | d >>> 22) + a | 0;
                c += (a ^ (d | ~b)) + k[14] - 1416354905 | 0;
                c = (c << 15 | c >>> 17) + d | 0;
                b += (d ^ (c | ~a)) + k[5] - 57434055 | 0;
                b = (b << 21 | b >>> 11) + c | 0;
                a += (c ^ (b | ~d)) + k[12] + 1700485571 | 0;
                a = (a << 6 | a >>> 26) + b | 0;
                d += (b ^ (a | ~c)) + k[3] - 1894986606 | 0;
                d = (d << 10 | d >>> 22) + a | 0;
                c += (a ^ (d | ~b)) + k[10] - 1051523 | 0;
                c = (c << 15 | c >>> 17) + d | 0;
                b += (d ^ (c | ~a)) + k[1] - 2054922799 | 0;
                b = (b << 21 | b >>> 11) + c | 0;
                a += (c ^ (b | ~d)) + k[8] + 1873313359 | 0;
                a = (a << 6 | a >>> 26) + b | 0;
                d += (b ^ (a | ~c)) + k[15] - 30611744 | 0;
                d = (d << 10 | d >>> 22) + a | 0;
                c += (a ^ (d | ~b)) + k[6] - 1560198380 | 0;
                c = (c << 15 | c >>> 17) + d | 0;
                b += (d ^ (c | ~a)) + k[13] + 1309151649 | 0;
                b = (b << 21 | b >>> 11) + c | 0;
                a += (c ^ (b | ~d)) + k[4] - 145523070 | 0;
                a = (a << 6 | a >>> 26) + b | 0;
                d += (b ^ (a | ~c)) + k[11] - 1120210379 | 0;
                d = (d << 10 | d >>> 22) + a | 0;
                c += (a ^ (d | ~b)) + k[2] + 718787259 | 0;
                c = (c << 15 | c >>> 17) + d | 0;
                b += (d ^ (c | ~a)) + k[9] - 343485551 | 0;
                b = (b << 21 | b >>> 11) + c | 0;
                x[0] = a + x[0] | 0;
                x[1] = b + x[1] | 0;
                x[2] = c + x[2] | 0;
                x[3] = d + x[3] | 0;
            }
            start() {
                this._dataLength = 0;
                this._bufferLength = 0;
                this._state.set(Md5.stateIdentity);
                return this;
            }
            appendStr(str) {
                const buf8 = this._buffer8;
                const buf32 = this._buffer32;
                let bufLen = this._bufferLength;
                let code;
                let i;
                for (i = 0; i < str.length; i += 1) {
                    code = str.charCodeAt(i);
                    if (code < 128) {
                        buf8[bufLen++] = code;
                    }
                    else if (code < 0x800) {
                        buf8[bufLen++] = (code >>> 6) + 0xC0;
                        buf8[bufLen++] = code & 0x3F | 0x80;
                    }
                    else if (code < 0xD800 || code > 0xDBFF) {
                        buf8[bufLen++] = (code >>> 12) + 0xE0;
                        buf8[bufLen++] = (code >>> 6 & 0x3F) | 0x80;
                        buf8[bufLen++] = (code & 0x3F) | 0x80;
                    }
                    else {
                        code = ((code - 0xD800) * 0x400) + (str.charCodeAt(++i) - 0xDC00) + 0x10000;
                        if (code > 0x10FFFF) {
                            throw new Error('Unicode standard supports code points up to U+10FFFF');
                        }
                        buf8[bufLen++] = (code >>> 18) + 0xF0;
                        buf8[bufLen++] = (code >>> 12 & 0x3F) | 0x80;
                        buf8[bufLen++] = (code >>> 6 & 0x3F) | 0x80;
                        buf8[bufLen++] = (code & 0x3F) | 0x80;
                    }
                    if (bufLen >= 64) {
                        this._dataLength += 64;
                        Md5._md5cycle(this._state, buf32);
                        bufLen -= 64;
                        buf32[0] = buf32[16];
                    }
                }
                this._bufferLength = bufLen;
                return this;
            }
            appendAsciiStr(str) {
                const buf8 = this._buffer8;
                const buf32 = this._buffer32;
                let bufLen = this._bufferLength;
                let i;
                let j = 0;
                for (;;) {
                    i = Math.min(str.length - j, 64 - bufLen);
                    while (i--) {
                        buf8[bufLen++] = str.charCodeAt(j++);
                    }
                    if (bufLen < 64) {
                        break;
                    }
                    this._dataLength += 64;
                    Md5._md5cycle(this._state, buf32);
                    bufLen = 0;
                }
                this._bufferLength = bufLen;
                return this;
            }
            appendByteArray(input) {
                const buf8 = this._buffer8;
                const buf32 = this._buffer32;
                let bufLen = this._bufferLength;
                let i;
                let j = 0;
                for (;;) {
                    i = Math.min(input.length - j, 64 - bufLen);
                    while (i--) {
                        buf8[bufLen++] = input[j++];
                    }
                    if (bufLen < 64) {
                        break;
                    }
                    this._dataLength += 64;
                    Md5._md5cycle(this._state, buf32);
                    bufLen = 0;
                }
                this._bufferLength = bufLen;
                return this;
            }
            getState() {
                const self = this;
                const s = self._state;
                return {
                    buffer: String.fromCharCode.apply(null, self._buffer8),
                    buflen: self._bufferLength,
                    length: self._dataLength,
                    state: [s[0], s[1], s[2], s[3]]
                };
            }
            setState(state) {
                const buf = state.buffer;
                const x = state.state;
                const s = this._state;
                let i;
                this._dataLength = state.length;
                this._bufferLength = state.buflen;
                s[0] = x[0];
                s[1] = x[1];
                s[2] = x[2];
                s[3] = x[3];
                for (i = 0; i < buf.length; i += 1) {
                    this._buffer8[i] = buf.charCodeAt(i);
                }
            }
            end(raw = false) {
                const bufLen = this._bufferLength;
                const buf8 = this._buffer8;
                const buf32 = this._buffer32;
                const i = (bufLen >> 2) + 1;
                let dataBitsLen;
                this._dataLength += bufLen;
                buf8[bufLen] = 0x80;
                buf8[bufLen + 1] = buf8[bufLen + 2] = buf8[bufLen + 3] = 0;
                buf32.set(Md5.buffer32Identity.subarray(i), i);
                if (bufLen > 55) {
                    Md5._md5cycle(this._state, buf32);
                    buf32.set(Md5.buffer32Identity);
                }
                dataBitsLen = this._dataLength * 8;
                if (dataBitsLen <= 0xFFFFFFFF) {
                    buf32[14] = dataBitsLen;
                }
                else {
                    const matches = dataBitsLen.toString(16).match(/(.*?)(.{0,8})$/);
                    if (matches === null) {
                        return;
                    }
                    const lo = parseInt(matches[2], 16);
                    const hi = parseInt(matches[1], 16) || 0;
                    buf32[14] = lo;
                    buf32[15] = hi;
                }
                Md5._md5cycle(this._state, buf32);
                return raw ? this._state : Md5._hex(this._state);
            }
        }
        Md5.stateIdentity = new Int32Array([1732584193, -271733879, -1732584194, 271733878]);
        Md5.buffer32Identity = new Int32Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        Md5.hexChars = '0123456789abcdef';
        Md5.hexOut = [];
        Md5.onePassHasher = new Md5();
        Crypto.Md5 = Md5;
    })(Crypto = RC.Crypto || (RC.Crypto = {}));
})(RC || (RC = {}));
var RC;
(function (RC) {
    var Numerics;
    (function (Numerics) {
        let Axis;
        (function (Axis) {
            Axis[Axis["X"] = 0] = "X";
            Axis[Axis["Y"] = 1] = "Y";
            Axis[Axis["Z"] = 2] = "Z";
        })(Axis = Numerics.Axis || (Numerics.Axis = {}));
        class Bounds {
            constructor(center, size) {
                this._center = center;
                this._extents = Numerics.Vec3.MulN(size, 0.5);
            }
            get center() { return this._center.Clone(); }
            set center(value) { this._center = value.Clone(); }
            get size() { return Numerics.Vec3.MulN(this._extents, 2); }
            set size(value) { this._extents = Numerics.Vec3.MulN(value, 0.5); }
            get extents() { return this._extents.Clone(); }
            set extents(value) { this._extents = value.Clone(); }
            get min() { return Numerics.Vec3.Sub(this.center, this.extents); }
            set min(value) { this.SetMinMax(value, this.max); }
            get max() { return Numerics.Vec3.Add(this.center, this.extents); }
            set max(value) { this.SetMinMax(this.min, value); }
            Contains(ponumber) {
                if (ponumber.x < this.min.x ||
                    ponumber.y < this.min.y ||
                    ponumber.z < this.min.z ||
                    ponumber.x > this.max.x ||
                    ponumber.y > this.max.y ||
                    ponumber.z > this.max.z)
                    return false;
                return true;
            }
            ClosestPonumber(point, outDistance) {
                let distance = 0;
                let t = Numerics.Vec3.Sub(point, this.center);
                let closest = [t.x, t.y, t.z];
                let et = [this._extents.x, this._extents.y, this._extents.z];
                for (let i = 0; i < 3; i++) {
                    let delta;
                    let f = et[i];
                    if (closest[i] < -f) {
                        delta = closest[i] + f;
                        distance = distance + delta * delta;
                        closest[i] = -f;
                    }
                    else if (closest[i] > f) {
                        delta = closest[i] - f;
                        distance = distance + delta * delta;
                        closest[i] = f;
                    }
                }
                if (distance == 0)
                    return point;
                let v = this.center.Clone();
                v.x += closest[0];
                v.y += closest[1];
                v.z += closest[2];
                return v;
            }
            SetMinMax(min, max) {
                this._extents = Numerics.Vec3.MulN(Numerics.Vec3.Sub(max, min), 0.5);
                this._center = Numerics.Vec3.Add(min, this.extents);
            }
            Encapsulate(point) {
                this.SetMinMax(Numerics.Vec3.Min(this.min, point), Numerics.Vec3.Max(this.max, point));
            }
            EncapsulateBounds(bounds) {
                this.Encapsulate(Numerics.Vec3.Sub(bounds.center, bounds.extents));
                this.Encapsulate(Numerics.Vec3.Add(bounds.center, bounds.extents));
            }
            Expand(amount) {
                this._extents = Numerics.Vec3.Add(this._extents, Numerics.Vec3.MulN(amount, 0.5));
            }
            Intersect(bounds, boundsIntersect) {
                if (this.min.x > bounds.max.x)
                    return false;
                if (this.max.x < bounds.min.x)
                    return false;
                if (this.min.y > bounds.max.y)
                    return false;
                if (this.max.y < bounds.min.y)
                    return false;
                if (this.min.z > bounds.max.z)
                    return false;
                if (this.max.z < bounds.min.z)
                    return false;
                boundsIntersect[0].min = Numerics.Vec3.Max(this.min, bounds.min);
                boundsIntersect[0].max = Numerics.Vec3.Max(this.max, bounds.max);
                return true;
            }
            IntersectMovingBoundsByAxis(bounds, d, axis, outT) {
                if (Numerics.MathUtils.Approximately(d, 0.0)) {
                    outT[0] = Numerics.MathUtils.MAX_VALUE;
                    return false;
                }
                let min00;
                let max00;
                let min01;
                let max01;
                let min10;
                let max10;
                let min11;
                let max11;
                let min20;
                let max20;
                let min21;
                let max21;
                switch (axis) {
                    case Axis.X:
                        min10 = this.min.y;
                        max10 = this.max.y;
                        min11 = bounds.min.y;
                        max11 = bounds.max.y;
                        min20 = this.min.z;
                        max20 = this.max.z;
                        min21 = bounds.min.z;
                        max21 = bounds.max.z;
                        break;
                    case Axis.Y:
                        min10 = this.min.z;
                        max10 = this.max.z;
                        min11 = bounds.min.z;
                        max11 = bounds.max.z;
                        min20 = this.min.x;
                        max20 = this.max.x;
                        min21 = bounds.min.x;
                        max21 = bounds.max.x;
                        break;
                    default:
                        min10 = this.min.x;
                        max10 = this.max.x;
                        min11 = bounds.min.x;
                        max11 = bounds.max.x;
                        min20 = this.min.y;
                        max20 = this.max.y;
                        min21 = bounds.min.y;
                        max21 = bounds.max.y;
                        break;
                }
                if (min10 >= max11 ||
                    max10 <= min11 ||
                    min20 >= max21 ||
                    max20 <= min21) {
                    outT[0] = Numerics.MathUtils.MAX_VALUE;
                    return false;
                }
                switch (axis) {
                    case Axis.X:
                        min00 = this.min.x;
                        max00 = this.max.x;
                        min01 = bounds.min.x;
                        max01 = bounds.max.x;
                        break;
                    case Axis.Y:
                        min00 = this.min.y;
                        max00 = this.max.y;
                        min01 = bounds.min.y;
                        max01 = bounds.max.y;
                        break;
                    default:
                        min00 = this.min.z;
                        max00 = this.max.z;
                        min01 = bounds.min.z;
                        max01 = bounds.max.z;
                        break;
                }
                let oneOverD = 1.0 / d;
                let enter = (min00 - max01) * oneOverD;
                let leave = (max00 - min01) * oneOverD;
                if (enter > leave) {
                    let t = enter;
                    enter = leave;
                    leave = t;
                }
                outT[0] = enter;
                return enter < 1.0 && enter >= 0;
            }
            IntersectMovingBounds(bounds, d) {
                let tEnter = -Numerics.MathUtils.MAX_VALUE;
                let tLeave = Numerics.MathUtils.MAX_VALUE;
                if (Numerics.MathUtils.Approximately(d.x, 0.0)) {
                    if (this.min.x >= bounds.max.x ||
                        this.max.x <= bounds.min.x)
                        return Numerics.MathUtils.MAX_VALUE;
                }
                else {
                    let oneOverD = 1.0 / d.x;
                    let xEnter = (this.min.x - bounds.max.x) * oneOverD;
                    let xLeave = (this.max.x - bounds.min.x) * oneOverD;
                    if (xEnter > xLeave) {
                        let t = xEnter;
                        xEnter = xLeave;
                        xLeave = t;
                    }
                    if (xEnter > tEnter)
                        tEnter = xEnter;
                    if (xLeave < tLeave)
                        tLeave = xLeave;
                    if (tEnter > tLeave)
                        return Numerics.MathUtils.MAX_VALUE;
                }
                if (Numerics.MathUtils.Approximately(d.y, 0.0)) {
                    if (this.min.y >= bounds.max.y ||
                        this.max.y <= bounds.min.y)
                        return Numerics.MathUtils.MAX_VALUE;
                }
                else {
                    let oneOverD = 1.0 / d.y;
                    let yEnter = (this.min.y - bounds.max.y) * oneOverD;
                    let yLeave = (this.max.y - bounds.min.y) * oneOverD;
                    if (yEnter > yLeave) {
                        let t = yEnter;
                        yEnter = yLeave;
                        yLeave = t;
                    }
                    if (yEnter > tEnter)
                        tEnter = yEnter;
                    if (yLeave < tLeave)
                        tLeave = yLeave;
                    if (tEnter > tLeave)
                        return Numerics.MathUtils.MAX_VALUE;
                }
                if (Numerics.MathUtils.Approximately(d.z, 0.0)) {
                    if (this.min.z >= bounds.max.z ||
                        this.max.z <= bounds.min.z)
                        return Numerics.MathUtils.MAX_VALUE;
                }
                else {
                    let oneOverD = 1.0 / d.z;
                    let zEnter = (this.min.z - bounds.max.z) * oneOverD;
                    let zLeave = (this.max.z - bounds.min.z) * oneOverD;
                    if (zEnter > zLeave) {
                        let t = zEnter;
                        zEnter = zLeave;
                        zLeave = t;
                    }
                    if (zEnter > tEnter)
                        tEnter = zEnter;
                    if (zLeave < tLeave)
                        tLeave = zLeave;
                    if (tEnter > tLeave)
                        return Numerics.MathUtils.MAX_VALUE;
                }
                return tEnter;
            }
            static Equals(b1, b2) {
                if (b1 == null || b2 == null)
                    return false;
                return (b1.center.EqualsTo(b2.center) && b1.extents.EqualsTo(b2.extents));
            }
            EqualsTo(b) {
                return Bounds.Equals(this, b);
            }
            ToString() {
                return "(extents:" + this._extents.ToString() + "center:" + this._center.ToString() + ")";
            }
        }
        Numerics.Bounds = Bounds;
    })(Numerics = RC.Numerics || (RC.Numerics = {}));
})(RC || (RC = {}));
var RC;
(function (RC) {
    var Numerics;
    (function (Numerics) {
        class Line3 {
            constructor(point1 = Numerics.Vec3.zero, point2 = Numerics.Vec3.zero) {
                this.point1 = point1;
                this.point2 = point2;
            }
            Transform(matrix) {
                return new Line3(matrix.Transform(this.point1), matrix.Transform(this.point2));
            }
            Length() {
                return Numerics.Vec3.Sub(this.point1, this.point2).Magnitude();
            }
            InersectPlane(planeNormal, planeLocation) {
                let dot = -(planeNormal.x * planeLocation.x) - planeNormal.y * planeLocation.y - planeNormal.z * planeLocation.z;
                let dot3 = planeNormal.x * (this.point2.x - this.point1.x) + planeNormal.y * (this.point2.y - this.point1.y) +
                    planeNormal.z * (this.point2.z - this.point1.z);
                let dot2 = -((dot + planeNormal.x * this.point1.x + planeNormal.y * this.point1.y + planeNormal.z * this.point1.z) / dot3);
                return Numerics.Vec3.Add(this.point1, Numerics.Vec3.MulN(Numerics.Vec3.Sub(this.point2, this.point1), dot2));
            }
            static InersectPlane(line, planeNormal, planeLocation) {
                let dot = -(planeNormal.x * planeLocation.x) - planeNormal.y * planeLocation.y - planeNormal.z * planeLocation.z;
                let dot3 = planeNormal.x * (line.point2.x - line.point1.x) + planeNormal.y * (line.point2.y - line.point1.y) +
                    planeNormal.z * (line.point2.z - line.point1.z);
                let dot2 = -((dot + planeNormal.x * line.point1.x + planeNormal.y * line.point1.y + planeNormal.z * line.point1.z) / dot3);
                return Numerics.Vec3.Add(line.point1, Numerics.Vec3.MulN(Numerics.Vec3.Sub(line.point2, line.point1), dot2));
            }
            Inersect(line) {
                let vector = Numerics.Vec3.Sub(this.point1, line.point1);
                let vector2 = Numerics.Vec3.Sub(line.point2, line.point1);
                let vector3 = Numerics.Vec3.Sub(this.point2, this.point1);
                let dot1 = vector.Dot(vector2);
                let dot2 = vector2.Dot(vector3);
                let dot3 = vector.Dot(vector3);
                let dot4 = vector2.SqrMagnitude();
                let dot5 = vector3.SqrMagnitude();
                let mul1 = (dot1 * dot2 - dot3 * dot4) / (dot5 * dot4 - dot2 * dot2);
                let mul2 = (dot1 + dot2 * mul1) / dot4;
                return new Line3(Numerics.Vec3.Add(this.point1, Numerics.Vec3.MulN(vector3, mul1)), Numerics.Vec3.Add(line.point1, Numerics.Vec3.MulN(vector2, mul2)));
            }
            static Equals(l1, l2) {
                if (l1 == null || l2 == null)
                    return false;
                return (l1.point1.EqualsTo(l2.point1) && l1.point2.EqualsTo(l2.point2));
            }
            EqualsTo(l) {
                return Line3.Equals(this, l);
            }
        }
        Numerics.Line3 = Line3;
    })(Numerics = RC.Numerics || (RC.Numerics = {}));
})(RC || (RC = {}));
var RC;
(function (RC) {
    var Numerics;
    (function (Numerics) {
        class Mat2 {
            constructor(x = Numerics.Vec2.zero, y = Numerics.Vec2.zero) {
                this.x = x;
                this.y = y;
            }
            static get identity() {
                return new Mat2(new Numerics.Vec2(1, 0), new Numerics.Vec2(0, 1));
            }
            CopyFrom(m) {
                this.x.CopyFrom(m.x);
                this.y.CopyFrom(m.y);
            }
            Clone() {
                let m = new Mat2();
                m.x = this.x.Clone();
                m.y = this.y.Clone();
                return m;
            }
            Add(p2) {
                this.x.Add(p2.x);
                this.y.Add(p2.y);
                return this;
            }
            AddN(p2) {
                this.x.AddN(p2);
                this.y.AddN(p2);
                return this;
            }
            Sub(p2) {
                this.x.Sub(p2.x);
                this.y.Sub(p2.y);
                return this;
            }
            SubN(p2) {
                this.x.SubN(p2);
                this.y.SubN(p2);
                return this;
            }
            SubN2(n) {
                this.x.SubN2(n);
                this.y.SubN2(n);
                return this;
            }
            Mul(m) {
                let xx = this.x.x * m.x.x + this.x.y * m.y.x;
                let xy = this.x.x * m.x.y + this.x.y * m.y.y;
                let yx = this.y.x * m.x.x + this.y.y * m.y.x;
                let yy = this.y.x * m.x.y + this.y.y * m.y.y;
                this.x.x = xx;
                this.x.y = xy;
                this.y.x = yx;
                this.y.y = yy;
                return this;
            }
            Mul2(m) {
                let xx = m.x.x * this.x.x + m.x.y * this.y.x;
                let xy = m.x.x * this.x.y + m.x.y * this.y.y;
                let yx = m.y.x * this.x.x + m.y.y * this.y.x;
                let yy = m.y.x * this.x.y + m.y.y * this.y.y;
                this.x.x = xx;
                this.x.y = xy;
                this.y.x = yx;
                this.y.y = yy;
                return this;
            }
            MulN(p2) {
                this.x.MulN(p2);
                this.y.MulN(p2);
                return this;
            }
            Div(p2) {
                this.x.Div(p2.x);
                this.y.Div(p2.y);
                return this;
            }
            DivN(p2) {
                this.x.DivN(p2);
                this.y.DivN(p2);
                return this;
            }
            DivN2(n) {
                this.x.DivN2(n);
                this.y.DivN2(n);
                return this;
            }
            Identity() {
                this.x.x = 1;
                this.x.y = 0;
                this.y.x = 0;
                this.y.y = 1;
            }
            Transform(v) {
                return new Numerics.Vec2(v.x * this.x.x + v.y * this.y.x, v.x * this.x.y + v.y * this.y.y);
            }
            Transpose() {
                let m00 = this.x.x;
                let m01 = this.y.x;
                let m10 = this.x.y;
                let m11 = this.y.y;
                this.x.x = m00;
                this.x.y = m01;
                this.y.x = m10;
                this.y.y = m11;
                return this;
            }
            Determinant() {
                return this.x.x * this.y.y - this.x.y * this.y.x;
            }
            Invert() {
                let determinant = 1 / (this.x.x * this.y.y - this.x.y * this.y.x);
                let m00 = this.y.y * determinant;
                let m01 = -this.x.y * determinant;
                let m10 = -this.y.x * determinant;
                let m11 = this.x.x * determinant;
                this.x.x = m00;
                this.x.y = m01;
                this.y.x = m10;
                this.y.y = m11;
                return this;
            }
            EqualsTo(m) {
                return Mat2.Equals(this, m);
            }
            ToString() {
                return `(${this.x.ToString()}, ${this.y.ToString()})`;
            }
            static FromCross(xVector) {
                return new Mat2(xVector, new Numerics.Vec2(-xVector.y, xVector.x));
            }
            static Abs(m) {
                return new Mat2(Numerics.Vec2.Abs(m.x), Numerics.Vec2.Abs(m.y));
            }
            static Transpose(m) {
                m = m.Clone();
                return m.Transpose();
            }
            static Invert(m) {
                m = m.Clone();
                return m.Invert();
            }
            static Add(m1, m2) {
                m1 = m1.Clone();
                return m1.Add(m2);
            }
            static AddN(m, n) {
                m = m.Clone();
                return m.AddN(n);
            }
            static Sub(m1, m2) {
                m1 = m1.Clone();
                return m1.Sub(m2);
            }
            static SubN(m, n) {
                m = m.Clone();
                return m.SubN(n);
            }
            static SubN2(n, m) {
                m = m.Clone();
                return m.SubN2(n);
            }
            static Mul(m1, m2) {
                m1 = m1.Clone();
                return m1.Mul(m2);
            }
            static MulN(m, n) {
                m = m.Clone();
                return m.MulN(n);
            }
            static Div(m1, m2) {
                m1 = m1.Clone();
                return m1.Div(m2);
            }
            static DivN(m, n) {
                m = m.Clone();
                return m.DivN(n);
            }
            static DivN2(n, m) {
                m = m.Clone();
                return m.DivN2(n);
            }
            static Equals(m1, m2) {
                if (m1 == null || m2 == null)
                    return false;
                return m1.x.EqualsTo(m2.x) && m1.y.EqualsTo(m2.y);
            }
        }
        Numerics.Mat2 = Mat2;
    })(Numerics = RC.Numerics || (RC.Numerics = {}));
})(RC || (RC = {}));
var RC;
(function (RC) {
    var Numerics;
    (function (Numerics) {
        class Mat3 {
            constructor(x = Numerics.Vec3.zero, y = Numerics.Vec3.zero, z = Numerics.Vec3.zero) {
                this.x = x;
                this.y = y;
                this.z = z;
            }
            static get identity() {
                return new Mat3(new Numerics.Vec3(1, 0, 0), new Numerics.Vec3(0, 1, 0), new Numerics.Vec3(0, 0, 1));
            }
            ;
            CopyFrom(m) {
                this.x.CopyFrom(m.x);
                this.y.CopyFrom(m.y);
                this.z.CopyFrom(m.z);
            }
            Clone() {
                let m = new Mat3();
                m.x = this.x.Clone();
                m.y = this.y.Clone();
                m.z = this.z.Clone();
                return m;
            }
            Add(m) {
                this.x.Add(m.x);
                this.y.Add(m.y);
                this.z.Add(m.z);
                return this;
            }
            AddN(n) {
                this.x.AddN(n);
                this.y.AddN(n);
                this.z.AddN(n);
                return this;
            }
            Sub(m) {
                this.x.Sub(m.x);
                this.y.Sub(m.y);
                this.z.Sub(m.z);
                return this;
            }
            SubN(n) {
                this.x.SubN(n);
                this.y.SubN(n);
                this.z.SubN(n);
                return this;
            }
            SubN2(n) {
                this.x.SubN2(n);
                this.y.SubN2(n);
                this.z.SubN2(n);
                return this;
            }
            Mul(m) {
                let xx = this.x.x * m.x.x + this.x.y * m.y.x + this.x.z * m.z.x;
                let xy = this.x.x * m.x.y + this.x.y * m.y.y + this.x.z * m.z.y;
                let xz = this.x.x * m.x.z + this.x.y * m.y.z + this.x.z * m.z.z;
                let yx = this.y.x * m.x.x + this.y.y * m.y.x + this.y.z * m.z.x;
                let yy = this.y.x * m.x.y + this.y.y * m.y.y + this.y.z * m.z.y;
                let yz = this.y.x * m.x.z + this.y.y * m.y.z + this.y.z * m.z.z;
                let zx = this.z.x * m.x.x + this.z.y * m.y.x + this.z.z * m.z.x;
                let zy = this.z.x * m.x.y + this.z.y * m.y.y + this.z.z * m.z.y;
                let zz = this.z.x * m.x.z + this.z.y * m.y.z + this.z.z * m.z.z;
                this.x.x = xx;
                this.x.y = xy;
                this.x.z = xz;
                this.y.x = yx;
                this.y.y = yy;
                this.y.z = yz;
                this.z.x = zx;
                this.z.y = zy;
                this.z.z = zz;
                return this;
            }
            Mul2(m) {
                let xx = m.x.x * this.x.x + m.x.y * this.y.x + m.x.z * this.z.x;
                let xy = m.x.x * this.x.y + m.x.y * this.y.y + m.x.z * this.z.y;
                let xz = m.x.x * this.x.z + m.x.y * this.y.z + m.x.z * this.z.z;
                let yx = m.y.x * this.x.x + m.y.y * this.y.x + m.y.z * this.z.x;
                let yy = m.y.x * this.x.y + m.y.y * this.y.y + m.y.z * this.z.y;
                let yz = m.y.x * this.x.z + m.y.y * this.y.z + m.y.z * this.z.z;
                let zx = m.z.x * this.x.x + m.z.y * this.y.x + m.z.z * this.z.x;
                let zy = m.z.x * this.x.y + m.z.y * this.y.y + m.z.z * this.z.y;
                let zz = m.z.x * this.x.z + m.z.y * this.y.z + m.z.z * this.z.z;
                this.x.x = xx;
                this.x.y = xy;
                this.x.z = xz;
                this.y.x = yx;
                this.y.y = yy;
                this.y.z = yz;
                this.z.x = zx;
                this.z.y = zy;
                this.z.z = zz;
                return this;
            }
            MulN(n) {
                this.x.MulN(n);
                this.y.MulN(n);
                this.z.MulN(n);
                return this;
            }
            Div(m) {
                this.x.Div(m.x);
                this.y.Div(m.y);
                this.z.Div(m.z);
                return this;
            }
            DivN(n) {
                this.x.DivN(n);
                this.y.DivN(n);
                this.z.DivN(n);
                return this;
            }
            DivN2(n) {
                this.x.DivN2(n);
                this.y.DivN2(n);
                this.z.DivN2(n);
                return this;
            }
            Transform(v) {
                return new Numerics.Vec3(v.x * this.x.x + v.y * this.y.x + v.z * this.z.x, v.x * this.x.y + v.y * this.y.y + v.z * this.z.y, v.x * this.x.z + v.y * this.y.z + v.z * this.z.z);
            }
            TransformPoint(v) {
                return new Numerics.Vec2(v.x * this.x.x + v.y * this.y.x + this.z.x, v.x * this.x.y + v.y * this.y.y + this.z.y);
            }
            TransformVector(v) {
                return new Numerics.Vec2(v.x * this.x.x + v.y * this.y.x, v.x * this.x.y + v.y * this.y.y);
            }
            Identity() {
                this.x.x = 1;
                this.x.y = 0;
                this.x.z = 0;
                this.y.x = 0;
                this.y.y = 1;
                this.y.z = 0;
                this.z.x = 0;
                this.z.y = 0;
                this.z.z = 1;
                return this;
            }
            Euler() {
                if (this.z.x < 1) {
                    if (this.z.x > -1) {
                        return new Numerics.Vec3(Numerics.MathUtils.Atan2(this.z.y, this.z.z), Numerics.MathUtils.Asin(-this.z.x), Numerics.MathUtils.Atan2(this.y.x, this.x.x));
                    }
                    return new Numerics.Vec3(0, Numerics.MathUtils.PI_HALF, -Numerics.MathUtils.Atan2(this.y.z, this.y.y));
                }
                return new Numerics.Vec3(0, -Numerics.MathUtils.PI_HALF, Numerics.MathUtils.Atan2(-this.y.z, this.y.y));
            }
            Transpose() {
                let m00 = this.x.x;
                let m01 = this.y.x;
                let m02 = this.z.x;
                let m10 = this.x.y;
                let m11 = this.y.y;
                let m12 = this.z.y;
                let m20 = this.x.z;
                let m21 = this.y.z;
                let m22 = this.z.z;
                this.x.x = m00;
                this.x.y = m01;
                this.x.z = m02;
                this.y.x = m10;
                this.y.y = m11;
                this.y.z = m12;
                this.z.x = m20;
                this.z.y = m21;
                this.z.z = m22;
                return this;
            }
            MultiplyTransposed(matrix) {
                return new Mat3(new Numerics.Vec3(this.x.x * matrix.x.x + this.y.x * matrix.y.x + this.z.x * matrix.z.x, this.x.x * matrix.x.y + this.y.x * matrix.y.y + this.z.x * matrix.z.y, this.x.x * matrix.x.z + this.y.x * matrix.y.z + this.z.x * matrix.z.z), new Numerics.Vec3(this.x.y * matrix.x.x + this.y.y * matrix.y.x + this.z.y * matrix.z.x, this.x.y * matrix.x.y + this.y.y * matrix.y.y + this.z.y * matrix.z.y, this.x.y * matrix.x.z + this.y.y * matrix.y.z + this.z.y * matrix.z.z), new Numerics.Vec3(this.x.z * matrix.x.x + this.y.z * matrix.y.x + this.z.z * matrix.z.x, this.x.z * matrix.x.y + this.y.z * matrix.y.y + this.z.z * matrix.z.y, this.x.z * matrix.x.z + this.y.z * matrix.y.z + this.z.z * matrix.z.z));
            }
            Determinant() {
                return this.x.x * this.y.y * this.z.z + this.x.y * this.y.z * this.z.x + this.x.z * this.y.x * this.z.y -
                    this.z.x * this.y.y * this.x.z - this.z.y * this.y.z * this.x.x - this.z.z * this.y.x * this.x.y;
            }
            NonhomogeneousInvert() {
                let m2 = new Numerics.Mat2();
                m2.x.x = this.x.x;
                m2.x.y = this.x.y;
                m2.y.x = this.y.x;
                m2.y.y = this.y.y;
                m2.Invert();
                let o = Mat3.identity;
                this.x.x = m2.x.x;
                this.x.y = m2.x.y;
                this.y.x = m2.y.x;
                this.y.y = m2.y.y;
                let v = m2.Transform(new Numerics.Vec2(this.z.x, this.z.y));
                this.z.x = -v.x;
                this.z.y = -v.y;
                return this;
            }
            Invert() {
                let determinant = 1 / this.Determinant();
                let m00 = (this.y.y * this.z.z - this.y.z * this.z.y) * determinant;
                let m01 = (this.x.z * this.z.y - this.z.z * this.x.y) * determinant;
                let m02 = (this.x.y * this.y.z - this.y.y * this.x.z) * determinant;
                let m10 = (this.y.z * this.z.x - this.y.x * this.z.z) * determinant;
                let m11 = (this.x.x * this.z.z - this.x.z * this.z.x) * determinant;
                let m12 = (this.x.z * this.y.x - this.x.x * this.y.z) * determinant;
                let m20 = (this.y.x * this.z.y - this.y.y * this.z.x) * determinant;
                let m21 = (this.x.y * this.z.x - this.x.x * this.z.y) * determinant;
                let m22 = (this.x.x * this.y.y - this.x.y * this.y.x) * determinant;
                this.x.x = m00;
                this.x.y = m01;
                this.x.z = m02;
                this.y.x = m10;
                this.y.y = m11;
                this.y.z = m12;
                this.z.x = m20;
                this.z.y = m21;
                this.z.z = m22;
                return this;
            }
            RotateAroundAxisX(angle) {
                angle = Numerics.MathUtils.DegToRad(angle);
                let tCos = Numerics.MathUtils.Cos(angle);
                let tSin = Numerics.MathUtils.Sin(angle);
                let m00 = this.x.x;
                let m01 = this.y.x * tCos - this.z.x * tSin;
                let m02 = this.y.x * tSin + this.z.x * tCos;
                let m10 = this.x.y;
                let m11 = this.y.y * tCos - this.z.y * tSin;
                let m12 = this.y.y * tSin + this.z.y * tCos;
                let m20 = this.x.z;
                let m21 = this.y.z * tCos - this.z.z * tSin;
                let m22 = this.y.z * tSin + this.z.z * tCos;
                this.x.x = m00;
                this.x.y = m01;
                this.x.z = m02;
                this.y.x = m10;
                this.y.y = m11;
                this.y.z = m12;
                this.z.x = m20;
                this.z.y = m21;
                this.z.z = m22;
                return this;
            }
            RotateAroundAxisY(angle) {
                angle = Numerics.MathUtils.DegToRad(angle);
                let tCos = Numerics.MathUtils.Cos(angle);
                let tSin = Numerics.MathUtils.Sin(angle);
                let m00 = this.z.x * tSin + this.x.x * tCos;
                let m01 = this.y.x;
                let m02 = this.z.x * tCos - this.x.x * tSin;
                let m10 = this.z.y * tSin + this.x.y * tCos;
                let m11 = this.y.y;
                let m12 = this.z.y * tCos - this.x.y * tSin;
                let m20 = this.z.z * tSin + this.x.z * tCos;
                let m21 = this.y.z;
                let m22 = this.z.z * tCos - this.x.z * tSin;
                this.x.x = m00;
                this.x.y = m01;
                this.x.z = m02;
                this.y.x = m10;
                this.y.y = m11;
                this.y.z = m12;
                this.z.x = m20;
                this.z.y = m21;
                this.z.z = m22;
                return this;
            }
            RotateAroundAxisZ(angle) {
                angle = Numerics.MathUtils.DegToRad(angle);
                let tCos = Numerics.MathUtils.Cos(angle);
                let tSin = Numerics.MathUtils.Sin(angle);
                let m00 = this.x.x * tCos - this.y.x * tSin;
                let m01 = this.x.x * tSin + this.y.x * tCos;
                let m02 = this.z.x;
                let m10 = this.x.y * tCos - this.y.y * tSin;
                let m11 = this.x.y * tSin + this.y.y * tCos;
                let m12 = this.z.y;
                let m20 = this.x.z * tCos - this.y.z * tSin;
                let m21 = this.x.z * tSin + this.y.z * tCos;
                let m22 = this.z.z;
                this.x.x = m00;
                this.x.y = m01;
                this.x.z = m02;
                this.y.x = m10;
                this.y.y = m11;
                this.y.z = m12;
                this.z.x = m20;
                this.z.y = m21;
                this.z.z = m22;
                return this;
            }
            RotateAroundWorldAxisX(angle) {
                angle = Numerics.MathUtils.DegToRad(angle);
                angle = -angle;
                let tCos = Numerics.MathUtils.Cos(angle);
                let tSin = Numerics.MathUtils.Sin(angle);
                let m00 = this.x.x;
                let m01 = this.y.x;
                let m02 = this.z.x;
                let m10 = this.x.y * tCos - this.x.z * tSin;
                let m11 = this.y.y * tCos - this.y.z * tSin;
                let m12 = this.z.y * tCos - this.z.z * tSin;
                let m20 = this.x.y * tSin + this.x.z * tCos;
                let m21 = this.y.y * tSin + this.y.z * tCos;
                let m22 = this.z.y * tSin + this.z.z * tCos;
                this.x.x = m00;
                this.x.y = m01;
                this.x.z = m02;
                this.y.x = m10;
                this.y.y = m11;
                this.y.z = m12;
                this.z.x = m20;
                this.z.y = m21;
                this.z.z = m22;
                return this;
            }
            RotateAroundWorldAxisY(angle) {
                angle = Numerics.MathUtils.DegToRad(angle);
                angle = -angle;
                let tCos = Numerics.MathUtils.Cos(angle);
                let tSin = Numerics.MathUtils.Sin(angle);
                let m00 = this.x.z * tSin + this.x.x * tCos;
                let m01 = this.y.z * tSin + this.y.x * tCos;
                let m02 = this.z.z * tSin + this.z.x * tCos;
                let m10 = this.x.y;
                let m11 = this.y.y;
                let m12 = this.z.y;
                let m20 = this.x.z * tCos - this.x.x * tSin;
                let m21 = this.y.z * tCos - this.y.x * tSin;
                let m22 = this.z.z * tCos - this.z.x * tSin;
                this.x.x = m00;
                this.x.y = m01;
                this.x.z = m02;
                this.y.x = m10;
                this.y.y = m11;
                this.y.z = m12;
                this.z.x = m20;
                this.z.y = m21;
                this.z.z = m22;
                return this;
            }
            RotateAroundWorldAxisZ(angle) {
                angle = Numerics.MathUtils.DegToRad(angle);
                angle = -angle;
                let tCos = Numerics.MathUtils.Cos(angle);
                let tSin = Numerics.MathUtils.Sin(angle);
                let m00 = this.x.x * tCos - this.x.y * tSin;
                let m01 = this.y.x * tCos - this.y.y * tSin;
                let m02 = this.z.x * tCos - this.z.y * tSin;
                let m10 = this.x.x * tSin + this.x.y * tCos;
                let m11 = this.y.x * tSin + this.y.y * tCos;
                let m12 = this.z.x * tSin + this.z.y * tCos;
                let m20 = this.x.z;
                let m21 = this.y.z;
                let m22 = this.z.z;
                this.x.x = m00;
                this.x.y = m01;
                this.x.z = m02;
                this.y.x = m10;
                this.y.y = m11;
                this.y.z = m12;
                this.z.x = m20;
                this.z.y = m21;
                this.z.z = m22;
                return this;
            }
            RotateAround(angle, axis) {
                let quaternion = Numerics.Quat.AngleAxis(0, axis).Conjugate();
                this.Mul2(Mat3.FromQuaternion(quaternion));
                quaternion = Numerics.Quat.AngleAxis(angle, axis);
                let qMat = Mat3.FromQuaternion(quaternion);
                this.Mul2(qMat);
                return this;
            }
            EqualsTo(m) {
                return Mat3.Equals(this, m);
            }
            ToString() {
                return `(${this.x.ToString()}, ${this.y.ToString()}, ${this.z.ToString()})`;
            }
            static FromScale(scale) {
                return new Mat3(new Numerics.Vec3(scale.x, 0, 0), new Numerics.Vec3(0, scale.y, 0), new Numerics.Vec3(0, 0, scale.z));
            }
            static FromOuterProduct(vector1, vector2) {
                return new Mat3(new Numerics.Vec3(vector1.x * vector2.x, vector1.x * vector2.y, vector1.x * vector2.z), new Numerics.Vec3(vector1.y * vector2.x, vector1.y * vector2.y, vector1.y * vector2.z), new Numerics.Vec3(vector1.z * vector2.x, vector1.z * vector2.y, vector1.z * vector2.z));
            }
            static FromEuler(euler) {
                let x = Numerics.MathUtils.DegToRad(euler.x);
                let y = Numerics.MathUtils.DegToRad(euler.y);
                let z = Numerics.MathUtils.DegToRad(euler.z);
                let cx = Numerics.MathUtils.Cos(x);
                let sx = Numerics.MathUtils.Sin(x);
                let cy = Numerics.MathUtils.Cos(y);
                let sy = Numerics.MathUtils.Sin(y);
                let cz = Numerics.MathUtils.Cos(z);
                let sz = Numerics.MathUtils.Sin(z);
                return new Mat3(new Numerics.Vec3(cy * cz, cy * sz, -sy), new Numerics.Vec3(cz * sx * sy - cx * sz, cx * cz + sx * sy * sz, cy * sx), new Numerics.Vec3(cx * cz * sy + sx * sz, -cz * sx + cx * sy * sz, cx * cy));
            }
            static FromQuaternion(quaternion) {
                let squared = new Numerics.Vec4(quaternion.x * quaternion.x, quaternion.y * quaternion.y, quaternion.z * quaternion.z, quaternion.w * quaternion.w);
                let invSqLength = 1 / (squared.x + squared.y + squared.z + squared.w);
                let temp1 = quaternion.x * quaternion.y;
                let temp2 = quaternion.z * quaternion.w;
                let temp3 = quaternion.x * quaternion.z;
                let temp4 = quaternion.y * quaternion.w;
                let temp5 = quaternion.y * quaternion.z;
                let temp6 = quaternion.x * quaternion.w;
                return new Mat3(new Numerics.Vec3((squared.x - squared.y - squared.z + squared.w) * invSqLength, 2 * (temp1 + temp2) * invSqLength, 2 * (temp3 - temp4) * invSqLength), new Numerics.Vec3(2 * (temp1 - temp2) * invSqLength, (-squared.x + squared.y - squared.z + squared.w) * invSqLength, 2 * (temp5 + temp6) * invSqLength), new Numerics.Vec3(2 * (temp3 + temp4) * invSqLength, 2 * (temp5 - temp6) * invSqLength, (-squared.x - squared.y + squared.z + squared.w) * invSqLength));
            }
            static FromRotationAxis(angle, axis) {
                let quaternion = Numerics.Quat.AngleAxis(angle, axis);
                return Mat3.FromQuaternion(quaternion);
            }
            static LookAt(forward, up) {
                let z = Numerics.Vec3.Normalize(forward);
                let x = Numerics.Vec3.Normalize(up.Cross(z));
                let y = z.Cross(x);
                return new Mat3(x, y, z);
            }
            static FromCross(vector) {
                let result = new Mat3();
                result.x.x = 0;
                result.x.y = -vector.z;
                result.x.z = vector.y;
                result.y.x = vector.z;
                result.y.y = 0;
                result.y.z = -vector.x;
                result.z.x = -vector.y;
                result.z.y = vector.x;
                result.z.z = 0;
                return result;
            }
            static NonhomogeneousInvert(m) {
                let m1 = m.Clone();
                m1.NonhomogeneousInvert();
                return m1;
            }
            static Invert(m) {
                m = m.Clone();
                return m.Invert();
            }
            static Transpose(m) {
                m = m.Clone();
                return m.Transpose();
            }
            static Abs(m) {
                return new Mat3(Numerics.Vec3.Abs(m.x), Numerics.Vec3.Abs(m.y), Numerics.Vec3.Abs(m.z));
            }
            static Add(m1, m2) {
                m1 = m1.Clone();
                return m1.Add(m2);
            }
            static AddN(m1, n) {
                m1 = m1.Clone();
                return m1.AddN(n);
            }
            static Sub(m1, m2) {
                m1 = m1.Clone();
                return m1.Sub(m2);
            }
            static SubN(m1, n) {
                m1 = m1.Clone();
                return m1.SubN(n);
            }
            static SubN2(n, p) {
                p = p.Clone();
                return p.SubN2(n);
            }
            static Mul(m1, m2) {
                m1 = m1.Clone();
                return m1.Mul(m2);
            }
            static Mul2(m1, m2) {
                m1 = m1.Clone();
                return m1.Mul2(m2);
            }
            static MulN(m, n) {
                m = m.Clone();
                return m.MulN(n);
            }
            static Div(m1, m2) {
                m1 = m1.Clone();
                return m1.Div(m2);
            }
            static DivN(m, n) {
                m = m.Clone();
                return m.DivN(n);
            }
            static DivN2(n, m) {
                m = m.Clone();
                return m.DivN2(n);
            }
            static Equals(m1, m2) {
                if (m1 == null || m2 == null)
                    return false;
                return m1.x.EqualsTo(m2.x) && m1.y.EqualsTo(m2.y) && m1.z.EqualsTo(m2.z);
            }
        }
        Numerics.Mat3 = Mat3;
    })(Numerics = RC.Numerics || (RC.Numerics = {}));
})(RC || (RC = {}));
var RC;
(function (RC) {
    var Numerics;
    (function (Numerics) {
        class Mat4 {
            constructor(x = Numerics.Vec4.zero, y = Numerics.Vec4.zero, z = Numerics.Vec4.zero, w = Numerics.Vec4.zero) {
                this.x = x;
                this.y = y;
                this.z = z;
                this.w = w;
            }
            static get identity() {
                return new Mat4(new Numerics.Vec4(1, 0, 0, 0), new Numerics.Vec4(0, 1, 0, 0), new Numerics.Vec4(0, 0, 1, 0), new Numerics.Vec4(0, 0, 0, 1));
            }
            ;
            CopyFrom(m) {
                this.x.CopyFrom(m.x);
                this.y.CopyFrom(m.y);
                this.z.CopyFrom(m.z);
                this.w.CopyFrom(m.w);
            }
            Clone() {
                let m = new Mat4();
                m.x = this.x.Clone();
                m.y = this.y.Clone();
                m.z = this.z.Clone();
                m.w = this.w.Clone();
                return m;
            }
            Add(m) {
                this.x.Add(m.x);
                this.y.Add(m.y);
                this.z.Add(m.z);
                this.w.Add(m.w);
                return this;
            }
            AddN(m) {
                this.x.AddN(m);
                this.y.AddN(m);
                this.z.AddN(m);
                this.w.AddN(m);
                return this;
            }
            Sub(m) {
                this.x.Sub(m.x);
                this.y.Sub(m.y);
                this.z.Sub(m.z);
                this.w.Sub(m.w);
                return this;
            }
            SubN(m) {
                this.x.SubN(m);
                this.y.SubN(m);
                this.z.SubN(m);
                this.w.SubN(m);
                return this;
            }
            SubN2(n) {
                this.x.SubN2(n);
                this.y.SubN2(n);
                this.z.SubN2(n);
                this.w.SubN2(n);
                return this;
            }
            Mul(m) {
                let xx = this.x.x * m.x.x + this.x.y * m.y.x + this.x.z * m.z.x + this.x.w * m.w.x;
                let xy = this.x.x * m.x.y + this.x.y * m.y.y + this.x.z * m.z.y + this.x.w * m.w.y;
                let xz = this.x.x * m.x.z + this.x.y * m.y.z + this.x.z * m.z.z + this.x.w * m.w.z;
                let xw = this.x.x * m.x.w + this.x.y * m.y.w + this.x.z * m.z.w + this.x.w * m.w.w;
                let yx = this.y.x * m.x.x + this.y.y * m.y.x + this.y.z * m.z.x + this.y.w * m.w.x;
                let yy = this.y.x * m.x.y + this.y.y * m.y.y + this.y.z * m.z.y + this.y.w * m.w.y;
                let yz = this.y.x * m.x.z + this.y.y * m.y.z + this.y.z * m.z.z + this.y.w * m.w.z;
                let yw = this.y.x * m.x.w + this.y.y * m.y.w + this.y.z * m.z.w + this.y.w * m.w.w;
                let zx = this.z.x * m.x.x + this.z.y * m.y.x + this.z.z * m.z.x + this.z.w * m.w.x;
                let zy = this.z.x * m.x.y + this.z.y * m.y.y + this.z.z * m.z.y + this.z.w * m.w.y;
                let zz = this.z.x * m.x.z + this.z.y * m.y.z + this.z.z * m.z.z + this.z.w * m.w.z;
                let zw = this.z.x * m.x.w + this.z.y * m.y.w + this.z.z * m.z.w + this.z.w * m.w.w;
                let wx = this.w.x * m.x.x + this.w.y * m.y.x + this.w.z * m.z.x + this.w.w * m.w.x;
                let wy = this.w.x * m.x.y + this.w.y * m.y.y + this.w.z * m.z.y + this.w.w * m.w.y;
                let wz = this.w.x * m.x.z + this.w.y * m.y.z + this.w.z * m.z.z + this.w.w * m.w.z;
                let ww = this.w.x * m.x.w + this.w.y * m.y.w + this.w.z * m.z.w + this.w.w * m.w.w;
                this.x.x = xx;
                this.x.y = xy;
                this.x.z = xz;
                this.x.w = xw;
                this.y.x = yx;
                this.y.y = yy;
                this.y.z = yz;
                this.y.w = yw;
                this.z.x = zx;
                this.z.y = zy;
                this.z.z = zz;
                this.z.w = zw;
                this.w.x = wx;
                this.w.y = wy;
                this.w.z = wz;
                this.w.w = ww;
                return this;
            }
            Mul2(m) {
                let xx = m.x.x * this.x.x + m.x.y * this.y.x + m.x.z * this.z.x + m.x.w * this.w.x;
                let xy = m.x.x * this.x.y + m.x.y * this.y.y + m.x.z * this.z.y + m.x.w * this.w.y;
                let xz = m.x.x * this.x.z + m.x.y * this.y.z + m.x.z * this.z.z + m.x.w * this.w.z;
                let xw = m.x.x * this.x.w + m.x.y * this.y.w + m.x.z * this.z.w + m.x.w * this.w.w;
                let yx = m.y.x * this.x.x + m.y.y * this.y.x + m.y.z * this.z.x + m.y.w * this.w.x;
                let yy = m.y.x * this.x.y + m.y.y * this.y.y + m.y.z * this.z.y + m.y.w * this.w.y;
                let yz = m.y.x * this.x.z + m.y.y * this.y.z + m.y.z * this.z.z + m.y.w * this.w.z;
                let yw = m.y.x * this.x.w + m.y.y * this.y.w + m.y.z * this.z.w + m.y.w * this.w.w;
                let zx = m.z.x * this.x.x + m.z.y * this.y.x + m.z.z * this.z.x + m.z.w * this.w.x;
                let zy = m.z.x * this.x.y + m.z.y * this.y.y + m.z.z * this.z.y + m.z.w * this.w.y;
                let zz = m.z.x * this.x.z + m.z.y * this.y.z + m.z.z * this.z.z + m.z.w * this.w.z;
                let zw = m.z.x * this.x.w + m.z.y * this.y.w + m.z.z * this.z.w + m.z.w * this.w.w;
                let wx = m.w.x * this.x.x + m.w.y * this.y.x + m.w.z * this.z.x + m.w.w * this.w.x;
                let wy = m.w.x * this.x.y + m.w.y * this.y.y + m.w.z * this.z.y + m.w.w * this.w.y;
                let wz = m.w.x * this.x.z + m.w.y * this.y.z + m.w.z * this.z.z + m.w.w * this.w.z;
                let ww = m.w.x * this.x.w + m.w.y * this.y.w + m.w.z * this.z.w + m.w.w * this.w.w;
                this.x.x = xx;
                this.x.y = xy;
                this.x.z = xz;
                this.x.w = xw;
                this.y.x = yx;
                this.y.y = yy;
                this.y.z = yz;
                this.y.w = yw;
                this.z.x = zx;
                this.z.y = zy;
                this.z.z = zz;
                this.z.w = zw;
                this.w.x = wx;
                this.w.y = wy;
                this.w.z = wz;
                this.w.w = ww;
                return this;
            }
            MulN(m) {
                this.x.MulN(m);
                this.y.MulN(m);
                this.z.MulN(m);
                this.w.MulN(m);
                return this;
            }
            Div(m) {
                this.x.Div(m.x);
                this.y.Div(m.y);
                this.z.Div(m.z);
                this.w.Div(m.w);
                return this;
            }
            DivN(m) {
                this.x.DivN(m);
                this.y.DivN(m);
                this.z.DivN(m);
                this.w.DivN(m);
                return this;
            }
            DivN2(n) {
                this.x.DivN2(n);
                this.y.DivN2(n);
                this.z.DivN2(n);
                this.w.DivN2(n);
                return this;
            }
            Transform(v) {
                return new Numerics.Vec4(v.x * this.x.x + v.y * this.y.x + v.z * this.z.x + v.w * this.w.x, v.x * this.x.y + v.y * this.y.y + v.z * this.z.y + v.w * this.w.y, v.x * this.x.z + v.y * this.y.z + v.z * this.z.z + v.w * this.w.z, v.x * this.x.w + v.y * this.y.w + v.z * this.z.w + v.w * this.w.w);
            }
            TransformPoint(v) {
                return new Numerics.Vec3(v.x * this.x.x + v.y * this.y.x + v.z * this.z.x + this.w.x, v.x * this.x.y + v.y * this.y.y + v.z * this.z.y + this.w.y, v.x * this.x.z + v.y * this.y.z + v.z * this.z.z + this.w.z);
            }
            TransformVector(v) {
                return new Numerics.Vec3(v.x * this.x.x + v.y * this.y.x + v.z * this.z.x, v.x * this.x.y + v.y * this.y.y + v.z * this.z.y, v.x * this.x.z + v.y * this.y.z + v.z * this.z.z);
            }
            Identity() {
                this.x.x = 1;
                this.x.y = 0;
                this.x.z = 0;
                this.x.w = 0;
                this.y.x = 0;
                this.y.y = 1;
                this.y.z = 0;
                this.y.w = 0;
                this.z.x = 0;
                this.z.y = 0;
                this.z.z = 1;
                this.z.w = 0;
                this.w.x = 0;
                this.w.y = 0;
                this.w.z = 0;
                this.w.w = 1;
                return this;
            }
            SetTranslate(translate) {
                this.w.x = translate.x;
                this.w.y = translate.y;
                this.w.z = translate.z;
                return this;
            }
            SetScale(scale) {
                this.x.x = scale.x;
                this.x.y = 0;
                this.x.z = 0;
                this.x.w = 0;
                this.y.x = 0;
                this.y.y = scale.y;
                this.y.z = 0;
                this.y.w = 0;
                this.z.x = 0;
                this.z.y = 0;
                this.z.z = scale.z;
                this.z.w = 0;
                this.w.x = 0;
                this.w.y = 0;
                this.w.z = 0;
                this.w.w = 1;
                return this;
            }
            SetRotation(quaternion) {
                let squared = new Numerics.Vec4(quaternion.x * quaternion.x, quaternion.y * quaternion.y, quaternion.z * quaternion.z, quaternion.w * quaternion.w);
                let invSqLength = 1 / (squared.x + squared.y + squared.z + squared.w);
                let temp1 = quaternion.x * quaternion.y;
                let temp2 = quaternion.z * quaternion.w;
                let temp3 = quaternion.x * quaternion.z;
                let temp4 = quaternion.y * quaternion.w;
                let temp5 = quaternion.y * quaternion.z;
                let temp6 = quaternion.x * quaternion.w;
                this.x.x = (squared.x - squared.y - squared.z + squared.w) * invSqLength;
                this.x.y = 2 * (temp1 + temp2) * invSqLength;
                this.x.z = 2 * (temp3 - temp4) * invSqLength;
                this.x.w = 0;
                this.y.x = 2 * (temp1 - temp2) * invSqLength;
                this.y.y = (-squared.x + squared.y - squared.z + squared.w) * invSqLength;
                this.y.z = 2 * (temp5 + temp6) * invSqLength;
                this.y.w = 0;
                this.z.x = 2 * (temp3 + temp4) * invSqLength;
                this.z.y = 2 * (temp5 - temp6) * invSqLength;
                this.z.z = (-squared.x - squared.y + squared.z + squared.w) * invSqLength;
                this.z.w = 0;
                this.w.x = 0;
                this.w.y = 0;
                this.w.z = 0;
                this.w.w = 1;
                return this;
            }
            Transpose() {
                let m00 = this.x.x;
                let m01 = this.y.x;
                let m02 = this.z.x;
                let m03 = this.w.x;
                let m10 = this.x.y;
                let m11 = this.y.y;
                let m12 = this.z.y;
                let m13 = this.w.y;
                let m20 = this.x.z;
                let m21 = this.y.z;
                let m22 = this.z.z;
                let m23 = this.w.z;
                let m30 = this.x.w;
                let m31 = this.y.w;
                let m32 = this.z.w;
                let m33 = this.w.w;
                this.x.x = m00;
                this.x.y = m01;
                this.x.z = m02;
                this.x.w = m03;
                this.y.x = m10;
                this.y.y = m11;
                this.y.z = m12;
                this.y.w = m13;
                this.z.x = m20;
                this.z.y = m21;
                this.z.z = m22;
                this.z.w = m23;
                this.w.x = m30;
                this.w.y = m31;
                this.w.z = m32;
                this.w.w = m33;
                return this;
            }
            Determinant() {
                let det1 = this.z.z * this.w.w - this.z.w * this.w.z;
                let det2 = this.z.y * this.w.w - this.z.w * this.w.y;
                let det3 = this.z.y * this.w.z - this.z.z * this.w.y;
                let det4 = this.z.x * this.w.w - this.z.w * this.w.x;
                let det5 = this.z.x * this.w.z - this.z.z * this.w.x;
                let det6 = this.z.x * this.w.y - this.z.y * this.w.x;
                return this.x.x * (this.y.y * det1 - this.y.z * det2 + this.y.w * det3) -
                    this.x.y * (this.y.x * det1 - this.y.z * det4 + this.y.w * det5) +
                    this.x.z * (this.y.x * det2 - this.y.y * det4 + this.y.w * det6) -
                    this.x.w * (this.y.x * det3 - this.y.y * det5 + this.y.z * det6);
            }
            NonhomogeneousInvert() {
                let m3 = new Numerics.Mat3();
                m3.x.x = this.x.x;
                m3.x.y = this.x.y;
                m3.x.z = this.x.z;
                m3.y.x = this.y.x;
                m3.y.y = this.y.y;
                m3.y.z = this.y.z;
                m3.z.x = this.z.x;
                m3.z.y = this.z.y;
                m3.z.z = this.z.z;
                m3.Invert();
                let o = Mat4.identity;
                this.x.x = m3.x.x;
                this.x.y = m3.x.y;
                this.x.z = m3.x.z;
                this.y.x = m3.y.x;
                this.y.y = m3.y.y;
                this.y.z = m3.y.z;
                this.z.x = m3.z.x;
                this.z.y = m3.z.y;
                this.z.z = m3.z.z;
                let v = m3.Transform(new Numerics.Vec3(this.w.x, this.w.y, this.w.z));
                this.w.x = -v.x;
                this.w.y = -v.y;
                this.w.z = -v.z;
                return this;
            }
            Invert() {
                let determinant = 1 / this.Determinant();
                let m00 = (this.y.y * this.z.z * this.w.w + this.y.z * this.z.w * this.w.y + this.y.w * this.z.y * this.w.z -
                    this.y.y * this.z.w * this.w.z - this.y.z * this.z.y * this.w.w - this.y.w * this.z.z * this.w.y) * determinant;
                let m01 = (this.x.y * this.z.w * this.w.z + this.x.z * this.z.y * this.w.w + this.x.w * this.z.z * this.w.y -
                    this.x.y * this.z.z * this.w.w - this.x.z * this.z.w * this.w.y - this.x.w * this.z.y * this.w.z) * determinant;
                let m02 = (this.x.y * this.y.z * this.w.w + this.x.z * this.y.w * this.w.y + this.x.w * this.y.y * this.w.z -
                    this.x.y * this.y.w * this.w.z - this.x.z * this.y.y * this.w.w - this.x.w * this.y.z * this.w.y) * determinant;
                let m03 = (this.x.y * this.y.w * this.z.z + this.x.z * this.y.y * this.z.w + this.x.w * this.y.z * this.z.y -
                    this.x.y * this.y.z * this.z.w - this.x.z * this.y.w * this.z.y - this.x.w * this.y.y * this.z.z) * determinant;
                let m10 = (this.y.x * this.z.w * this.w.z + this.y.z * this.z.x * this.w.w + this.y.w * this.z.z * this.w.x -
                    this.y.x * this.z.z * this.w.w - this.y.z * this.z.w * this.w.x - this.y.w * this.z.x * this.w.z) * determinant;
                let m11 = (this.x.x * this.z.z * this.w.w + this.x.z * this.z.w * this.w.x + this.x.w * this.z.x * this.w.z -
                    this.x.x * this.z.w * this.w.z - this.x.z * this.z.x * this.w.w - this.x.w * this.z.z * this.w.x) * determinant;
                let m12 = (this.x.x * this.y.w * this.w.z + this.x.z * this.y.x * this.w.w + this.x.w * this.y.z * this.w.x -
                    this.x.x * this.y.z * this.w.w - this.x.z * this.y.w * this.w.x - this.x.w * this.y.x * this.w.z) * determinant;
                let m13 = (this.x.x * this.y.z * this.z.w + this.x.z * this.y.w * this.z.x + this.x.w * this.y.x * this.z.z -
                    this.x.x * this.y.w * this.z.z - this.x.z * this.y.x * this.z.w - this.x.w * this.y.z * this.z.x) * determinant;
                let m20 = (this.y.x * this.z.y * this.w.w + this.y.y * this.z.w * this.w.x + this.y.w * this.z.x * this.w.y -
                    this.y.x * this.z.w * this.w.y - this.y.y * this.z.x * this.w.w - this.y.w * this.z.y * this.w.x) * determinant;
                let m21 = (this.x.x * this.z.w * this.w.y + this.x.y * this.z.x * this.w.w + this.x.w * this.z.y * this.w.x -
                    this.x.x * this.z.y * this.w.w - this.x.y * this.z.w * this.w.x - this.x.w * this.z.x * this.w.y) * determinant;
                let m22 = (this.x.x * this.y.y * this.w.w + this.x.y * this.y.w * this.w.x + this.x.w * this.y.x * this.w.y -
                    this.x.x * this.y.w * this.w.y - this.x.y * this.y.x * this.w.w - this.x.w * this.y.y * this.w.x) * determinant;
                let m23 = (this.x.x * this.y.w * this.z.y + this.x.y * this.y.x * this.z.w + this.x.w * this.y.y * this.z.x -
                    this.x.x * this.y.y * this.z.w - this.x.y * this.y.w * this.z.x - this.x.w * this.y.x * this.z.y) * determinant;
                let m30 = (this.y.x * this.z.z * this.w.y + this.y.y * this.z.x * this.w.z + this.y.z * this.z.y * this.w.x -
                    this.y.x * this.z.y * this.w.z - this.y.y * this.z.z * this.w.x - this.y.z * this.z.x * this.w.y) * determinant;
                let m31 = (this.x.x * this.z.y * this.w.z + this.x.y * this.z.z * this.w.x + this.x.z * this.z.x * this.w.y -
                    this.x.x * this.z.z * this.w.y - this.x.y * this.z.x * this.w.z - this.x.z * this.z.y * this.w.x) * determinant;
                let m32 = (this.x.x * this.y.z * this.w.y + this.x.y * this.y.x * this.w.z + this.x.z * this.y.y * this.w.x -
                    this.x.x * this.y.y * this.w.z - this.x.y * this.y.z * this.w.x - this.x.z * this.y.x * this.w.y) * determinant;
                let m33 = (this.x.x * this.y.y * this.z.z + this.x.y * this.y.z * this.z.x + this.x.z * this.y.x * this.z.y -
                    this.x.x * this.y.z * this.z.y - this.x.y * this.y.x * this.z.z - this.x.z * this.y.y * this.z.x) * determinant;
                this.x.x = m00;
                this.x.y = m01;
                this.x.z = m02;
                this.x.w = m03;
                this.y.x = m10;
                this.y.y = m11;
                this.y.z = m12;
                this.y.w = m13;
                this.z.x = m20;
                this.z.y = m21;
                this.z.z = m22;
                this.z.w = m23;
                this.w.x = m30;
                this.w.y = m31;
                this.w.z = m32;
                this.w.w = m33;
                return this;
            }
            EqualsTo(m) {
                return Mat4.Equals(this, m);
            }
            ToString() {
                return `(${this.x.ToString()}, ${this.y.ToString()}, ${this.z.ToString()}, ${this.w.ToString()})`;
            }
            static FromScale(scale) {
                return new Mat4(new Numerics.Vec4(scale.x, 0, 0, 0), new Numerics.Vec4(0, scale.y, 0, 0), new Numerics.Vec4(0, 0, scale.z, 0), new Numerics.Vec4(0, 0, 0, 1));
            }
            static FromEuler(euler) {
                let eulerX = Numerics.MathUtils.DegToRad(euler.x);
                let eulerY = Numerics.MathUtils.DegToRad(euler.y);
                let eulerZ = Numerics.MathUtils.DegToRad(euler.z);
                let cx = Numerics.MathUtils.Cos(eulerX);
                let sx = Numerics.MathUtils.Sin(eulerX);
                let cy = Numerics.MathUtils.Cos(eulerY);
                let sy = Numerics.MathUtils.Sin(eulerY);
                let cz = Numerics.MathUtils.Cos(eulerZ);
                let sz = Numerics.MathUtils.Sin(eulerZ);
                return new Mat4(new Numerics.Vec4(cy * cz, cy * sz, -sy, 0), new Numerics.Vec4(cz * sx * sy - cx * sz, cx * cz + sx * sy * sz, cy * sx, 0), new Numerics.Vec4(cx * cz * sy + sx * sz, -cz * sx + cx * sy * sz, cx * cy, 0), new Numerics.Vec4(0, 0, 0, 1));
            }
            static FromQuaternion(quaternion) {
                let squared = new Numerics.Vec4(quaternion.x * quaternion.x, quaternion.y * quaternion.y, quaternion.z * quaternion.z, quaternion.w * quaternion.w);
                let invSqLength = 1 / (squared.x + squared.y + squared.z + squared.w);
                let temp1 = quaternion.x * quaternion.y;
                let temp2 = quaternion.z * quaternion.w;
                let temp3 = quaternion.x * quaternion.z;
                let temp4 = quaternion.y * quaternion.w;
                let temp5 = quaternion.y * quaternion.z;
                let temp6 = quaternion.x * quaternion.w;
                return new Mat4(new Numerics.Vec4((squared.x - squared.y - squared.z + squared.w) * invSqLength, 2 * (temp1 + temp2) * invSqLength, 2 * (temp3 - temp4) * invSqLength, 0), new Numerics.Vec4(2 * (temp1 - temp2) * invSqLength, (-squared.x + squared.y - squared.z + squared.w) * invSqLength, 2 * (temp5 + temp6) * invSqLength, 0), new Numerics.Vec4(2 * (temp3 + temp4) * invSqLength, 2 * (temp5 - temp6) * invSqLength, (-squared.x - squared.y + squared.z + squared.w) * invSqLength, 0), new Numerics.Vec4(0, 0, 0, 1));
            }
            static FromRotationAxis(angle, axis) {
                let quaternion = Numerics.Quat.AngleAxis(angle, axis);
                return Mat4.FromQuaternion(quaternion);
            }
            static FromTRS(pos, q, scale) {
                let m = Mat4.FromScale(scale).Mul(Mat4.FromQuaternion(q));
                m.w.x = pos.x;
                m.w.y = pos.y;
                m.w.z = pos.z;
                return m;
            }
            static NonhomogeneousInvert(m) {
                let m1 = m.Clone();
                m1.NonhomogeneousInvert();
                return m1;
            }
            static Invert(m) {
                m = m.Clone();
                return m.Invert();
            }
            static Transpose(m) {
                m = m.Clone();
                return m.Transpose();
            }
            static Equals(m1, m2) {
                if (m1 == null || m2 == null)
                    return false;
                return m1.x.EqualsTo(m2.x) && m1.y.EqualsTo(m2.y) && m1.z.EqualsTo(m2.z) && m1.w.EqualsTo(m2.w);
            }
            static Abs(m) {
                return new Mat4(Numerics.Vec4.Abs(m.x), Numerics.Vec4.Abs(m.y), Numerics.Vec4.Abs(m.z), Numerics.Vec4.Abs(m.w));
            }
            static Add(m1, m2) {
                m1 = m1.Clone();
                return m1.Add(m2);
            }
            static AddN(m1, n) {
                m1 = m1.Clone();
                return m1.AddN(n);
            }
            static Sub(m1, m2) {
                m1 = m1.Clone();
                return m1.Sub(m2);
            }
            static SubN(m1, n) {
                m1 = m1.Clone();
                return m1.SubN(n);
            }
            static SubN2(n, p) {
                p = p.Clone();
                return p.SubN2(n);
            }
            static Mul(m1, m2) {
                m1 = m1.Clone();
                return m1.Mul(m2);
            }
            static Mul2(m1, m2) {
                m1 = m1.Clone();
                return m1.Mul2(m2);
            }
            static MulN(m, n) {
                m = m.Clone();
                return m.MulN(n);
            }
            static Div(m1, m2) {
                m1 = m1.Clone();
                return m1.Div(m2);
            }
            static DivN(m, n) {
                m = m.Clone();
                return m.DivN(n);
            }
            static DivN2(n, m) {
                m = m.Clone();
                return m.DivN2(n);
            }
            static View(position, lookAt, upVector) {
                let forward = Numerics.Vec3.Normalize(Numerics.Vec3.Sub(lookAt, position));
                let xVec = Numerics.Vec3.Normalize(forward.Cross(upVector));
                let up = xVec.Cross(forward);
                let result = new Mat4();
                result.x.x = xVec.x;
                result.x.y = xVec.y;
                result.x.z = xVec.z;
                result.x.w = Numerics.Vec3.Dot(position, Numerics.Vec3.Negate(xVec));
                result.y.x = up.x;
                result.y.y = up.y;
                result.y.z = up.z;
                result.y.w = Numerics.Vec3.Dot(position, Numerics.Vec3.Negate(up));
                result.z.x = -forward.x;
                result.z.y = -forward.y;
                result.z.z = -forward.z;
                result.z.w = Numerics.Vec3.Dot(position, forward);
                result.w.x = 0;
                result.w.y = 0;
                result.w.z = 0;
                result.w.w = 1;
                return result;
            }
            static Perspective(fov, aspect, near, far) {
                let top = near * Numerics.MathUtils.Tan(fov * .5);
                let bottom = -top;
                let right = top * aspect;
                let left = -right;
                return Mat4.Frustum(left, right, bottom, top, near, far);
            }
            static Frustum(left, right, bottom, top, near, far) {
                let width = right - left;
                let height = top - bottom;
                let depth = far - near;
                let n = near * 2;
                let result = new Mat4();
                result.x.x = n / width;
                result.x.y = 0;
                result.x.z = (right + left) / width;
                result.x.w = 0;
                result.y.x = 0;
                result.y.y = n / height;
                result.y.z = (top + bottom) / height;
                result.y.w = 0;
                result.z.x = 0;
                result.z.y = 0;
                result.z.z = -(far + near) / depth;
                result.z.w = -(n * far) / depth;
                result.w.x = 0;
                result.w.y = 0;
                result.w.z = -1;
                result.w.w = 0;
                return result;
            }
            static Orthographic(left, right, bottom, top, near, far) {
                let width = right - left;
                let height = top - bottom;
                let depth = far - near;
                let result = new Mat4();
                ;
                result.x.x = 2 / width;
                result.x.y = 0;
                result.x.z = 0;
                result.x.w = -(right + left) / width;
                result.y.x = 0;
                result.y.y = 2 / height;
                result.y.z = 0;
                result.y.w = -(top + bottom) / height;
                result.z.x = 0;
                result.z.y = 0;
                result.z.z = -2 / depth;
                result.z.w = -(far + near) / depth;
                result.w.x = 0;
                result.w.y = 0;
                result.w.z = 0;
                result.w.w = 1;
                return result;
            }
            static OrthographicCentered(left, right, bottom, top, near, far) {
                let width = right - left;
                let height = top - bottom;
                let depth = far - near;
                let result = new Mat4();
                ;
                result.x.x = 2 / width;
                result.x.y = 0;
                result.x.z = 0;
                result.x.w = 0;
                result.y.x = 0;
                result.y.y = 2 / height;
                result.y.z = 0;
                result.y.w = 0;
                result.z.x = 0;
                result.z.y = 0;
                result.z.z = -2 / depth;
                result.z.w = -((far + near) / depth);
                result.w.x = 0;
                result.w.y = 0;
                result.w.z = 0;
                result.w.w = 1;
                return result;
            }
        }
        Numerics.Mat4 = Mat4;
    })(Numerics = RC.Numerics || (RC.Numerics = {}));
})(RC || (RC = {}));
var RC;
(function (RC) {
    var Numerics;
    (function (Numerics) {
        class MathUtils {
            static Random(min, max) {
                return Math.random() * (max - min) + min;
            }
            static RandomFloor(min, max) {
                return this.Floor(this.Random(min, max));
            }
            static RandomRound(min, max) {
                return this.Round(this.Random(min, max));
            }
            static RandomCeil(min, max) {
                return this.Ceil(this.Random(min, max));
            }
            static Sin(f) {
                return Math.sin(f);
            }
            static Cos(f) {
                return Math.cos(f);
            }
            static Tan(f) {
                return Math.tan(f);
            }
            static Asin(f) {
                return Math.asin(f);
            }
            static Acos(f) {
                return Math.acos(f);
            }
            static Atan(f) {
                return Math.atan(f);
            }
            static Atan2(y, x) {
                return Math.atan2(y, x);
            }
            static Sqrt(f) {
                return Math.sqrt(f);
            }
            static Abs(f) {
                return Math.abs(f);
            }
            static Min(a, b) {
                return (a >= b) ? b : a;
            }
            static Min2(...values) {
                if (values.length == 0)
                    return 0;
                let num2 = values[0];
                for (let i = 1; i < values.length; i++) {
                    if (values[i] < num2) {
                        num2 = values[i];
                    }
                }
                return num2;
            }
            static Max(a, b) {
                return (a <= b) ? b : a;
            }
            static Max2(...values) {
                if (values.length == 0)
                    return 0;
                let num2 = values[0];
                for (let i = 1; i < values.length; i++) {
                    if (values[i] > num2) {
                        num2 = values[i];
                    }
                }
                return num2;
            }
            static Pow(f, p) {
                return Math.pow(f, p);
            }
            static Exp(power) {
                return Math.exp(power);
            }
            static Log(f) {
                return Math.log(f);
            }
            static Ceil(f) {
                return Math.ceil(f);
            }
            static Floor(f) {
                return Math.floor(f);
            }
            static Round(f) {
                return Math.round(f);
            }
            static Sign(f) {
                return (f < 0) ? -1 : 1;
            }
            static Clamp(value, min, max) {
                if (value < min) {
                    value = min;
                }
                else if (value > max) {
                    value = max;
                }
                return value;
            }
            static Clamp01(value) {
                let result;
                if (value < 0) {
                    result = 0;
                }
                else if (value > 1) {
                    result = 1;
                }
                else {
                    result = value;
                }
                return result;
            }
            static Lerp(a, b, t) {
                return a + (b - a) * MathUtils.Clamp01(t);
            }
            static LerpUnclamped(a, b, t) {
                return a + (b - a) * t;
            }
            static LerpAngle(a, b, t) {
                let num = MathUtils.Repeat(b - a, 360);
                if (num > 180) {
                    num -= 360;
                }
                return a + num * MathUtils.Clamp01(t);
            }
            static MoveTowards(current, target, maxDelta) {
                let result;
                if (MathUtils.Abs(target - current) <= maxDelta) {
                    result = target;
                }
                else {
                    result = current + MathUtils.Sign(target - current) * maxDelta;
                }
                return result;
            }
            static MoveTowardsAngle(current, target, maxDelta) {
                let num = MathUtils.DeltaAngle(current, target);
                let result;
                if (-maxDelta < num && num < maxDelta) {
                    result = target;
                }
                else {
                    target = current + num;
                    result = MathUtils.MoveTowards(current, target, maxDelta);
                }
                return result;
            }
            static FromToDirection(from, to, t, forward) {
                let q1 = Numerics.Quat.FromToRotation(forward, from);
                let q2 = Numerics.Quat.FromToRotation(forward, to);
                let q3 = Numerics.Quat.Lerp(q1, q2, t);
                return q3.Transform(forward);
            }
            static SmoothStep(from, to, t) {
                t = MathUtils.Clamp01(t);
                t = -2 * t * t * t + 3 * t * t;
                return to * t + from * (1 - t);
            }
            static Gamma(value, absmax, gamma) {
                let flag = value < 0;
                let num = MathUtils.Abs(value);
                let result;
                if (num > absmax)
                    result = ((!flag) ? num : (-num));
                else {
                    let num2 = MathUtils.Pow(num / absmax, gamma) * absmax;
                    result = ((!flag) ? num2 : (-num2));
                }
                return result;
            }
            static Approximately(a, b) {
                return MathUtils.Abs(b - a) < MathUtils.Max(1E-06 * MathUtils.Max(MathUtils.Abs(a), MathUtils.Abs(b)), MathUtils.EPSILON * 8);
            }
            static SmoothDamp(current, target, currentVelocity, smoothTime, maxSpeed, deltaTime) {
                smoothTime = MathUtils.Max(0.0001, smoothTime);
                let num = 2 / smoothTime;
                let num2 = num * deltaTime;
                let num3 = 1 / (1 + num2 + 0.48 * num2 * num2 + 0.235 * num2 * num2 * num2);
                let num4 = current - target;
                let num5 = target;
                let num6 = maxSpeed * smoothTime;
                num4 = MathUtils.Clamp(num4, -num6, num6);
                target = current - num4;
                let num7 = (currentVelocity[0] + num * num4) * deltaTime;
                currentVelocity[0] = (currentVelocity[0] - num * num7) * num3;
                let num8 = target + (num4 + num7) * num3;
                if (num5 - current > 0 == num8 > num5) {
                    num8 = num5;
                    currentVelocity[0] = (num8 - num5) / deltaTime;
                }
                return num8;
            }
            static SmoothDampAngle(current, target, currentVelocity, smoothTime, maxSpeed, deltaTime) {
                target = current + MathUtils.DeltaAngle(current, target);
                return MathUtils.SmoothDamp(current, target, currentVelocity, smoothTime, maxSpeed, deltaTime);
            }
            static Repeat(t, length) {
                return MathUtils.Clamp(t - MathUtils.Floor(t / length) * length, 0, length);
            }
            static PingPong(t, length) {
                t = MathUtils.Repeat(t, length * 2);
                return length - MathUtils.Abs(t - length);
            }
            static InverseLerp(a, b, value) {
                return a != b ? MathUtils.Clamp01((value - a) / (b - a)) : 0;
            }
            static DeltaAngle(current, target) {
                let num = MathUtils.Repeat(target - current, 360);
                if (num > 180) {
                    num -= 360;
                }
                return num;
            }
            static LineIntersection(p1, p2, p3, p4, result) {
                let num = p2.x - p1.x;
                let num2 = p2.y - p1.y;
                let num3 = p4.x - p3.x;
                let num4 = p4.y - p3.y;
                let num5 = num * num4 - num2 * num3;
                let result2;
                if (num5 == 0) {
                    result2 = false;
                }
                else {
                    let num6 = p3.x - p1.x;
                    let num7 = p3.y - p1.y;
                    let num8 = (num6 * num4 - num7 * num3) / num5;
                    result[0] = new Numerics.Vec2(p1.x + num8 * num, p1.y + num8 * num2);
                    result2 = true;
                }
                return result2;
            }
            static LineSegmentIntersection(p1, p2, p3, p4, result) {
                let num = p2.x - p1.x;
                let num2 = p2.y - p1.y;
                let num3 = p4.x - p3.x;
                let num4 = p4.y - p3.y;
                let num5 = num * num4 - num2 * num3;
                let result2;
                if (num5 == 0) {
                    result2 = false;
                }
                else {
                    let num6 = p3.x - p1.x;
                    let num7 = p3.y - p1.y;
                    let num8 = (num6 * num4 - num7 * num3) / num5;
                    if (num8 < 0 || num8 > 1) {
                        result2 = false;
                    }
                    else {
                        let num9 = (num6 * num2 - num7 * num) / num5;
                        if (num9 < 0 || num9 > 1) {
                            result2 = false;
                        }
                        else {
                            result[0] = new Numerics.Vec2(p1.x + num8 * num, p1.y + num8 * num2);
                            result2 = true;
                        }
                    }
                }
                return result2;
            }
            static DegToRad(deg) {
                return deg * MathUtils.DEG_TO_RAD;
            }
            static RadToDeg(rad) {
                return rad * MathUtils.RAD_TO_DEG;
            }
            static LinearToGammaSpace(value) {
                return MathUtils.Pow(value, 1 / 2.2);
            }
            static GammaToLinearSpace(value) {
                return MathUtils.Pow(value, 2.2);
            }
            static RubberDelta(overStretching, viewSize) {
                return (1 - (1 / ((RC.Numerics.MathUtils.Abs(overStretching) * 0.55 / viewSize) + 1))) * viewSize * RC.Numerics.MathUtils.Sign(overStretching);
            }
        }
        MathUtils.EPSILON = 0.0001;
        MathUtils.MAX_VALUE = Number.MAX_VALUE;
        MathUtils.MIN_VALUE = Number.MIN_VALUE;
        MathUtils.PI = Math.PI;
        MathUtils.PI2 = MathUtils.PI * 2;
        MathUtils.PI4 = MathUtils.PI * 4;
        MathUtils.PI_HALF = MathUtils.PI * 0.5;
        MathUtils.PI_QUARTER = MathUtils.PI * 0.25;
        MathUtils.PI_DELTA = 1 / MathUtils.PI;
        MathUtils.PI_HALF_DELTA = MathUtils.PI_DELTA * 2;
        MathUtils.PI_QUARTER_DELTA = MathUtils.PI_DELTA * 4;
        MathUtils.DEG_TO_RAD = MathUtils.PI / 180;
        MathUtils.RAD_TO_DEG = 180 / MathUtils.PI;
        MathUtils.INFINITY = Number.POSITIVE_INFINITY;
        MathUtils.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
        Numerics.MathUtils = MathUtils;
    })(Numerics = RC.Numerics || (RC.Numerics = {}));
})(RC || (RC = {}));
var RC;
(function (RC) {
    var Numerics;
    (function (Numerics) {
        class Quat {
            constructor(x = 0, y = 0, z = 0, w = 0) {
                this.x = x;
                this.y = y;
                this.z = z;
                this.w = w;
            }
            static get identity() {
                return new Quat(0, 0, 0, 1);
            }
            get xyz() {
                return new Numerics.Vec3(this.x, this.y, this.z);
            }
            set xyz(v) {
                this.x = v.x;
                this.y = v.y;
                this.z = v.z;
            }
            set eulerAngles(value) {
                let q = Quat.FromEulerRad(Numerics.Vec3.MulN(value, Numerics.MathUtils.DEG_TO_RAD));
                this.x = q.x;
                this.y = q.y;
                this.z = q.z;
                this.w = q.w;
            }
            get eulerAngles() {
                return Numerics.Vec3.MulN(Quat.ToEulerRad(this), Numerics.MathUtils.RAD_TO_DEG);
            }
            get length() {
                return Numerics.MathUtils.Sqrt(this.lengthSquared);
            }
            get lengthSquared() {
                return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
            }
            Clone() {
                let q = new Quat();
                q.x = this.x;
                q.y = this.y;
                q.z = this.z;
                q.w = this.w;
                return q;
            }
            CopyFrom(q) {
                this.x = q.x;
                this.y = q.y;
                this.z = q.z;
                this.w = q.w;
            }
            Set(newX, newY, newZ, newW) {
                this.x = newX;
                this.y = newY;
                this.z = newZ;
                this.w = newW;
            }
            Normalize() {
                let l = this.length;
                if (l == 0) {
                    this.x = 0;
                    this.y = 0;
                    this.z = 0;
                    this.w = 0;
                    return;
                }
                let scale = 1.0 / l;
                this.x *= scale;
                this.y *= scale;
                this.z *= scale;
                this.w *= scale;
            }
            static Normalize(q) {
                let scale = 1.0 / q.length;
                let result = new Quat(q.x * scale, q.y * scale, q.z * scale, q.w * scale);
                return result;
            }
            static Dot(a, b) {
                return a.x * b.x + a.y * b.y + a.z * b.z + a.w * b.w;
            }
            Transform(v) {
                let x2 = this.x + this.x;
                let y2 = this.y + this.y;
                let z2 = this.z + this.z;
                let xx2 = this.x * x2;
                let xy2 = this.x * y2;
                let xz2 = this.x * z2;
                let yy2 = this.y * y2;
                let yz2 = this.y * z2;
                let zz2 = this.z * z2;
                let wx2 = this.w * x2;
                let wy2 = this.w * y2;
                let wz2 = this.w * z2;
                return new Numerics.Vec3(v.x * (1 - yy2 - zz2) + v.y * (xy2 - wz2) + v.z * (xz2 + wy2), v.x * (xy2 + wz2) + v.y * (1 - xx2 - zz2) + v.z * (yz2 - wx2), v.x * (xz2 - wy2) + v.y * (yz2 + wx2) + v.z * (1 - xx2 - yy2));
            }
            static AngleAxis(angle, axis) {
                let result = Quat.identity;
                let thetaOver2 = angle * Numerics.MathUtils.DEG_TO_RAD * 0.5;
                let sinThetaOver2 = Numerics.MathUtils.Sin(thetaOver2);
                result.x = axis.x * sinThetaOver2;
                result.y = axis.y * sinThetaOver2;
                result.z = axis.z * sinThetaOver2;
                result.w = Numerics.MathUtils.Cos(thetaOver2);
                return result;
            }
            ToAngleAxis() {
                let result = Quat.ToAxisAngleRad(this);
                Numerics.Vec3.MulN(result[1], Numerics.MathUtils.RAD_TO_DEG);
                return result;
            }
            static FromToRotation(from, to) {
                let result = Quat.identity;
                let dot = from.Dot(to);
                if (dot < -1 + 1e-6) {
                    let v = Numerics.Vec3.Normalize(Quat.Orthogonal(from));
                    result.Set(v.x, v.y, v.z, 0);
                }
                else if (dot > 1 - 1e-6) {
                    result.Set(0, 0, 0, 1);
                }
                else {
                    let angle = Numerics.MathUtils.Acos(dot);
                    let axis = Numerics.Vec3.Normalize(from.Cross(to));
                    let thetaOver2 = angle * 0.5;
                    let sinThetaOver2 = Numerics.MathUtils.Sin(thetaOver2);
                    result.x = axis.x * sinThetaOver2;
                    result.y = axis.y * sinThetaOver2;
                    result.z = axis.z * sinThetaOver2;
                    result.w = Numerics.MathUtils.Cos(thetaOver2);
                }
                return result;
            }
            static Orthogonal(v) {
                let x = Numerics.MathUtils.Abs(v.x);
                let y = Numerics.MathUtils.Abs(v.y);
                let z = Numerics.MathUtils.Abs(v.z);
                let other = x < y ? (x < z ? Numerics.Vec3.right : Numerics.Vec3.forward) : (y < z ? Numerics.Vec3.up : Numerics.Vec3.forward);
                return Numerics.Vec3.Cross(v, other);
            }
            static LookRotation(forward, upwards) {
                forward = Numerics.Vec3.Normalize(forward);
                let right = Numerics.Vec3.Normalize(upwards.Cross(forward));
                upwards = forward.Cross(right);
                let m00 = right.x;
                let m01 = right.y;
                let m02 = right.z;
                let m10 = upwards.x;
                let m11 = upwards.y;
                let m12 = upwards.z;
                let m20 = forward.x;
                let m21 = forward.y;
                let m22 = forward.z;
                let num8 = m00 + m11 + m22;
                let quaternion = new Quat();
                if (num8 > 0) {
                    let num = Numerics.MathUtils.Sqrt(num8 + 1);
                    quaternion.w = num * 0.5;
                    num = 0.5 / num;
                    quaternion.x = (m12 - m21) * num;
                    quaternion.y = (m20 - m02) * num;
                    quaternion.z = (m01 - m10) * num;
                    return quaternion;
                }
                if ((m00 >= m11) &&
                    (m00 >= m22)) {
                    let num7 = Numerics.MathUtils.Sqrt(1 + m00 - m11 - m22);
                    let num4 = 0.5 / num7;
                    quaternion.x = 0.5 * num7;
                    quaternion.y = (m01 + m10) * num4;
                    quaternion.z = (m02 + m20) * num4;
                    quaternion.w = (m12 - m21) * num4;
                    return quaternion;
                }
                if (m11 > m22) {
                    let num6 = Numerics.MathUtils.Sqrt(1 + m11 - m00 - m22);
                    let num3 = 0.5 / num6;
                    quaternion.x = (m10 + m01) * num3;
                    quaternion.y = 0.5 * num6;
                    quaternion.z = (m21 + m12) * num3;
                    quaternion.w = (m20 - m02) * num3;
                    return quaternion;
                }
                let num5 = Numerics.MathUtils.Sqrt(1 + m22 - m00 - m11);
                let num2 = 0.5 / num5;
                quaternion.x = (m20 + m02) * num2;
                quaternion.y = (m21 + m12) * num2;
                quaternion.z = 0.5 * num5;
                quaternion.w = (m01 - m10) * num2;
                return quaternion;
            }
            SetLookRotation(view, up) {
                let rot = Quat.LookRotation(view, up);
                this.Set(rot.x, rot.y, rot.z, rot.w);
            }
            Conjugate() {
                return new Quat(-this.x, -this.y, -this.z, this.w);
            }
            static Slerp(a, b, t) {
                t = Numerics.MathUtils.Clamp(t, 0, 1);
                return Quat.SlerpUnclamped(a, b, t);
            }
            static SlerpUnclamped(a, b, t) {
                if (a.lengthSquared == 0.0) {
                    if (b.lengthSquared == 0.0)
                        return Quat.identity;
                    return b;
                }
                if (b.lengthSquared == 0.0)
                    return a;
                let cosHalfAngle = a.w * b.w + a.xyz.Dot(b.xyz);
                if (cosHalfAngle >= 1.0 ||
                    cosHalfAngle <= -1.0) {
                    return a;
                }
                if (cosHalfAngle < 0.0) {
                    b.xyz = Numerics.Vec3.Negate(b.xyz);
                    b.w = -b.w;
                    cosHalfAngle = -cosHalfAngle;
                }
                let blendA;
                let blendB;
                if (cosHalfAngle < 0.99) {
                    let halfAngle = Numerics.MathUtils.Acos(cosHalfAngle);
                    let sinHalfAngle = Numerics.MathUtils.Sin(halfAngle);
                    let oneOverSinHalfAngle = 1.0 / sinHalfAngle;
                    blendA = Numerics.MathUtils.Sin(halfAngle * (1.0 - t)) * oneOverSinHalfAngle;
                    blendB = Numerics.MathUtils.Sin(halfAngle * t) * oneOverSinHalfAngle;
                }
                else {
                    blendA = 1.0 - t;
                    blendB = t;
                }
                let v = Numerics.Vec3.Add(Numerics.Vec3.MulN(a.xyz, blendA), Numerics.Vec3.MulN(b.xyz, blendB));
                let result = new Quat(v.x, v.y, v.z, blendA * a.w + blendB * b.w);
                if (result.lengthSquared > 0.0)
                    return Quat.Normalize(result);
                return Quat.identity;
            }
            static Lerp(q1, q2, t) {
                t = Numerics.MathUtils.Clamp(t, 0, 1);
                return Quat.LerpUnclamped(q1, q2, t);
            }
            static LerpUnclamped(q1, q2, t) {
                let q = Quat.identity;
                if (Quat.Dot(q1, q2) < 0) {
                    q.x = q1.x + t * (-q2.x - q1.x);
                    q.y = q1.y + t * (-q2.y - q1.y);
                    q.z = q1.z + t * (-q2.z - q1.z);
                    q.w = q1.w + t * (-q2.w - q1.w);
                }
                else {
                    q.x = q1.x + (q2.x - q1.x) * t;
                    q.y = q1.y + (q2.y - q1.y) * t;
                    q.z = q1.z + (q2.z - q1.z) * t;
                    q.w = q1.w + (q2.w - q1.w) * t;
                }
                q.Normalize();
                return q;
            }
            static RotateTowards(from, to, maxDegreesDelta) {
                let num = Quat.Angle(from, to);
                if (num == 0)
                    return to;
                let t = Numerics.MathUtils.Min(1, maxDegreesDelta / num);
                return Quat.SlerpUnclamped(from, to, t);
            }
            static Invert(rotation) {
                let lengthSq = rotation.lengthSquared;
                if (lengthSq != 0.0) {
                    let i = 1.0 / lengthSq;
                    let v = Numerics.Vec3.MulN(rotation.xyz, -i);
                    return new Quat(v.x, v.y, v.z, rotation.w * i);
                }
                return rotation;
            }
            ToString() {
                return `(${this.x}, ${this.y}, ${this.z}, ${this.w})`;
            }
            static Angle(a, b) {
                let f = Quat.Dot(a, b);
                return Numerics.MathUtils.Acos(Numerics.MathUtils.Min(Numerics.MathUtils.Abs(f), 1)) * 2 * Numerics.MathUtils.RAD_TO_DEG;
            }
            static Euler(euler) {
                return Quat.FromEulerRad(Numerics.Vec3.MulN(euler, Numerics.MathUtils.DEG_TO_RAD));
            }
            static ToEulerRad(rotation) {
                let sqw = rotation.w * rotation.w;
                let sqx = rotation.x * rotation.x;
                let sqy = rotation.y * rotation.y;
                let sqz = rotation.z * rotation.z;
                let unit = sqx + sqy + sqz + sqw;
                let test = rotation.x * rotation.w - rotation.y * rotation.z;
                let v = new Numerics.Vec3();
                if (test > 0.4995 * unit) {
                    v.y = 2 * Numerics.MathUtils.Atan2(rotation.y, rotation.x);
                    v.x = Numerics.MathUtils.PI / 2;
                    v.z = 0;
                    return Quat.NormalizeAngles(Numerics.Vec3.MulN(v, Numerics.MathUtils.RAD_TO_DEG));
                }
                if (test < -0.4995 * unit) {
                    v.y = -2 * Numerics.MathUtils.Atan2(rotation.y, rotation.x);
                    v.x = -Numerics.MathUtils.PI / 2;
                    v.z = 0;
                    return Quat.NormalizeAngles(Numerics.Vec3.MulN(v, Numerics.MathUtils.RAD_TO_DEG));
                }
                let q = new Quat(rotation.w, rotation.z, rotation.x, rotation.y);
                v.y = Numerics.MathUtils.Atan2(2 * q.x * q.w + 2 * q.y * q.z, 1 - 2 * (q.z * q.z + q.w * q.w));
                v.x = Numerics.MathUtils.Asin(2 * (q.x * q.z - q.w * q.y));
                v.z = Numerics.MathUtils.Atan2(2 * q.x * q.y + 2 * q.z * q.w, 1 - 2 * (q.y * q.y + q.z * q.z));
                return Quat.NormalizeAngles(Numerics.Vec3.MulN(v, Numerics.MathUtils.RAD_TO_DEG));
            }
            static NormalizeAngles(angles) {
                angles.x = Quat.NormalizeAngle(angles.x);
                angles.y = Quat.NormalizeAngle(angles.y);
                angles.z = Quat.NormalizeAngle(angles.z);
                return angles;
            }
            static NormalizeAngle(angle) {
                while (angle > 360)
                    angle -= 360;
                while (angle < 0)
                    angle += 360;
                return angle;
            }
            static FromEulerRad(euler) {
                let yaw = euler.x;
                let pitch = euler.y;
                let roll = euler.z;
                let yawOver2 = yaw * 0.5;
                let cosYawOver2 = Numerics.MathUtils.Cos(yawOver2);
                let sinYawOver2 = Numerics.MathUtils.Sin(yawOver2);
                let pitchOver2 = pitch * 0.5;
                let cosPitchOver2 = Numerics.MathUtils.Cos(pitchOver2);
                let sinPitchOver2 = Numerics.MathUtils.Sin(pitchOver2);
                let rollOver2 = roll * 0.5;
                let cosRollOver2 = Numerics.MathUtils.Cos(rollOver2);
                let sinRollOver2 = Numerics.MathUtils.Sin(rollOver2);
                let result = new Quat();
                result.w = cosYawOver2 * cosPitchOver2 * cosRollOver2 + sinYawOver2 * sinPitchOver2 * sinRollOver2;
                result.x = sinYawOver2 * cosPitchOver2 * cosRollOver2 + cosYawOver2 * sinPitchOver2 * sinRollOver2;
                result.y = cosYawOver2 * sinPitchOver2 * cosRollOver2 - sinYawOver2 * cosPitchOver2 * sinRollOver2;
                result.z = cosYawOver2 * cosPitchOver2 * sinRollOver2 - sinYawOver2 * sinPitchOver2 * cosRollOver2;
                return result;
            }
            static ToAxisAngleRad(q) {
                if (Numerics.MathUtils.Abs(q.w) > 1.0)
                    q = Quat.Normalize(q);
                let angle = 2.0 * Numerics.MathUtils.Acos(q.w);
                let den = Numerics.MathUtils.Sqrt(1.0 - q.w * q.w);
                let axis;
                if (den > 0.0001)
                    axis = Numerics.Vec3.DivN(q.xyz, den);
                else {
                    axis = new Numerics.Vec3(1, 0, 0);
                }
                return [angle, axis];
            }
            static Equals(q1, q2) {
                if (q1 == null || q2 == null)
                    return false;
                return q1.x == q2.x && q1.y == q2.y && q1.z == q2.z && q1.w == q2.w;
            }
            EqualsTo(q) {
                return Quat.Equals(this, q);
            }
            static Mul(lhs, rhs) {
                return new Quat(lhs.w * rhs.x + lhs.x * rhs.w + lhs.y * rhs.z - lhs.z * rhs.y, lhs.w * rhs.y + lhs.y * rhs.w + lhs.z * rhs.x - lhs.x * rhs.z, lhs.w * rhs.z + lhs.z * rhs.w + lhs.x * rhs.y - lhs.y * rhs.x, lhs.w * rhs.w - lhs.x * rhs.x - lhs.y * rhs.y - lhs.z * rhs.z);
            }
        }
        Numerics.Quat = Quat;
    })(Numerics = RC.Numerics || (RC.Numerics = {}));
})(RC || (RC = {}));
var RC;
(function (RC) {
    var Numerics;
    (function (Numerics) {
        class Rect {
            constructor(x = 0, y = 0, width = 0, height = 0) {
                this._xMin = x;
                this._yMin = y;
                this._width = width;
                this._height = height;
            }
            static get zero() {
                return new Rect();
            }
            get x() { return this._xMin; }
            set x(value) { this._xMin = value; }
            get y() { return this._yMin; }
            set y(value) { this._yMin = value; }
            get position() { return new Numerics.Vec2(this._xMin, this._yMin); }
            set position(value) {
                this._xMin = value.x;
                this._yMin = value.y;
            }
            get center() { return new Numerics.Vec2(this.x + this._width / 2, this.y + this._height / 2); }
            set center(value) {
                this._xMin = value.x - this._width / 2;
                this._yMin = value.y - this._height / 2;
            }
            get min() { return new Numerics.Vec2(this.xMin, this.yMin); }
            set min(value) {
                this.xMin = value.x;
                this.yMin = value.y;
            }
            get max() { return new Numerics.Vec2(this.xMax, this.yMax); }
            set max(value) {
                this.xMax = value.x;
                this.yMax = value.y;
            }
            get width() { return this._width; }
            set width(value) { this._width = value; }
            get height() { return this._height; }
            set height(value) { this.height = value; }
            get size() { return new Numerics.Vec2(this._width, this._height); }
            set size(value) {
                this._width = value.x;
                this._height = value.y;
            }
            get xMin() { return this._xMin; }
            set xMin(value) {
                let xMax = this.xMax;
                this._xMin = value;
                this._width = xMax - this._xMin;
            }
            get yMin() { return this._yMin; }
            set yMin(value) {
                let yMax = this.yMax;
                this._yMin = value;
                this._height = yMax - this._yMin;
            }
            get xMax() { return this._width + this._xMin; }
            set xMax(value) {
                this._width = value - this._xMin;
            }
            get yMax() { return this._height + this._yMin; }
            set yMax(value) {
                this._height = value - this._yMin;
            }
            CopyFrom(source) {
                this._xMin = source._xMin;
                this._yMin = source._yMin;
                this._width = source._width;
                this._height = source._height;
            }
            Clone() {
                let rect = new Rect();
                rect._xMin = this._xMin;
                rect._yMin = this._yMin;
                rect._width = this._width;
                rect._height = this._height;
                return rect;
            }
            static MinMaxRect(xmin, ymin, xmax, ymax) {
                return new Rect(xmin, ymin, xmax - xmin, ymax - ymin);
            }
            Set(x, y, width, height) {
                this._xMin = x;
                this._yMin = y;
                this._width = width;
                this._height = height;
            }
            Contains(point, allowInverse = false) {
                let result;
                if (!allowInverse) {
                    result = point.x >= this.xMin && point.x < this.xMax && point.y >= this.yMin && point.y < this.yMax;
                }
                else {
                    let flag = false;
                    if ((this.width < 0 && point.x <= this.xMin && point.x > this.xMax) || (this.width >= 0 && point.x >= this.xMin && point.x < this.xMax)) {
                        flag = true;
                    }
                    result = (flag && ((this.height < 0 && point.y <= this.yMin && point.y > this.yMax) || (this.height >= 0 && point.y >= this.yMin && point.y < this.yMax)));
                }
                return result;
            }
            static OrderMinMax(rect) {
                if (rect.xMin > rect.xMax) {
                    let xMin = rect.xMin;
                    rect.xMin = rect.xMax;
                    rect.xMax = xMin;
                }
                if (rect.yMin > rect.yMax) {
                    let yMin = rect.yMin;
                    rect.yMin = rect.yMax;
                    rect.yMax = yMin;
                }
                return rect;
            }
            Overlaps(other, allowInverse = false) {
                let rect = this.Clone();
                if (allowInverse) {
                    rect = Rect.OrderMinMax(rect);
                    other = Rect.OrderMinMax(other);
                }
                return other.xMax > rect.xMin && other.xMin < rect.xMax && other.yMax > rect.yMin && other.yMin < rect.yMax;
            }
            static NormalizedToPoint(rectangle, normalizedRectCoordinates) {
                return new Numerics.Vec2(Numerics.MathUtils.Lerp(rectangle.x, rectangle.xMax, normalizedRectCoordinates.x), Numerics.MathUtils.Lerp(rectangle.y, rectangle.yMax, normalizedRectCoordinates.y));
            }
            static PointToNormalized(rectangle, point) {
                return new Numerics.Vec2(Numerics.MathUtils.InverseLerp(rectangle.x, rectangle.xMax, point.x), Numerics.MathUtils.InverseLerp(rectangle.y, rectangle.yMax, point.y));
            }
        }
        Numerics.Rect = Rect;
    })(Numerics = RC.Numerics || (RC.Numerics = {}));
})(RC || (RC = {}));
var RC;
(function (RC) {
    var Numerics;
    (function (Numerics) {
        class Vec2 {
            constructor(x = 0, y = 0) {
                this.x = x;
                this.y = y;
            }
            static get one() {
                return new Vec2(1, 1);
            }
            static get minusOne() {
                return new Vec2(-1, -1);
            }
            static get zero() {
                return new Vec2(0, 0);
            }
            static get right() {
                return new Vec2(1, 0);
            }
            ;
            static get left() {
                return new Vec2(-1, 0);
            }
            ;
            static get up() {
                return new Vec2(0, 1);
            }
            ;
            static get down() {
                return new Vec2(0, -1);
            }
            ;
            static get positiveInfinityVector() {
                return new Vec2(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
            }
            ;
            static get negativeInfinityVector() {
                return new Vec2(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
            }
            ;
            Set(x, y) {
                this.x = x;
                this.y = y;
            }
            Clone() {
                let v = new Vec2();
                v.x = this.x;
                v.y = this.y;
                return v;
            }
            CopyFrom(v) {
                this.x = v.x;
                this.y = v.y;
            }
            Clamp(min, max) {
                this.x = Numerics.MathUtils.Clamp(this.x, min.x, max.x);
                this.y = Numerics.MathUtils.Clamp(this.y, min.y, max.y);
                return this;
            }
            Add(v) {
                this.x += v.x;
                this.y += v.y;
                return this;
            }
            AddN(n) {
                this.x += n;
                this.y += n;
                return this;
            }
            Sub(v) {
                this.x -= v.x;
                this.y -= v.y;
                return this;
            }
            SubN(n) {
                this.x -= n;
                this.y -= n;
                return this;
            }
            SubN2(n) {
                this.x = n - this.x;
                this.y = n - this.y;
                return this;
            }
            Mul(v) {
                this.x *= v.x;
                this.y *= v.y;
                return this;
            }
            MulN(n) {
                this.x *= n;
                this.y *= n;
                return this;
            }
            Div(v) {
                this.x /= v.x;
                this.y /= v.y;
                return this;
            }
            DivN(n) {
                this.x /= n;
                this.y /= n;
                return this;
            }
            DivN2(n) {
                this.x = n / this.x;
                this.y = n / this.y;
                return this;
            }
            Negate() {
                this.x = -this.x;
                this.y = -this.y;
                return this;
            }
            Scale(scale) {
                this.x *= scale.x;
                this.y *= scale.y;
            }
            Dot(vector) {
                return this.x * vector.x + this.y * vector.y;
            }
            Normalize() {
                let f = 1 / this.Magnitude();
                this.x *= f;
                this.y *= f;
            }
            NormalizeSafe() {
                let f = this.Magnitude();
                if (f == 0)
                    return;
                this.x *= f;
                this.y *= f;
            }
            ClampMagnitude(maxLength) {
                let sqrMagnitude = this.SqrMagnitude();
                if (sqrMagnitude > (maxLength * maxLength)) {
                    let f = maxLength / Numerics.MathUtils.Sqrt(sqrMagnitude);
                    this.x *= f;
                    this.y *= f;
                }
            }
            Magnitude() {
                return Numerics.MathUtils.Sqrt(this.x * this.x + this.y * this.y);
            }
            SqrMagnitude() {
                return this.x * this.x + this.y * this.y;
            }
            Distance(vector) {
                return Vec2.Sub(vector, this).Magnitude();
            }
            DistanceSquared(vector) {
                return Vec2.Sub(vector, this).SqrMagnitude();
            }
            AproxEqualsBox(vector, tolerance) {
                return (Numerics.MathUtils.Abs(this.x - vector.x) <= tolerance) &&
                    (Numerics.MathUtils.Abs(this.y - vector.y) <= tolerance);
            }
            ApproxEquals(vector, tolerance) {
                return this.Distance(vector) <= tolerance;
            }
            Angle(vector) {
                let vec = Vec2.Normalize(this);
                let val = vec.Dot(Vec2.Normalize(vector));
                val = val > 1 ? 1 : val;
                val = val < -1 ? -1 : val;
                return Numerics.MathUtils.Acos(val);
            }
            Rotate(angle) {
                let x = this.x * Numerics.MathUtils.Cos(angle) - this.y * Numerics.MathUtils.Sin(angle);
                let y = this.x * Numerics.MathUtils.Sin(angle) + this.y * Numerics.MathUtils.Cos(angle);
                return new RC.Numerics.Vec2(x, y);
            }
            EqualsTo(v) {
                return Vec2.Equals(this, v);
            }
            ToString() {
                return `(${this.x}, ${this.y})`;
            }
            static Add(v1, v2) {
                v1 = v1.Clone();
                return v1.Add(v2);
            }
            static AddN(v, n) {
                v = v.Clone();
                return v.AddN(n);
            }
            static Sub(v1, v2) {
                v1 = v1.Clone();
                return v1.Sub(v2);
            }
            static SubN(v, n) {
                v = v.Clone();
                return v.SubN(n);
            }
            static SubN2(n, v) {
                v = v.Clone();
                return v.SubN2(n);
            }
            static Mul(v1, v2) {
                v1 = v1.Clone();
                return v1.Mul(v2);
            }
            static MulN(v, n) {
                v = v.Clone();
                return v.MulN(n);
            }
            static Div(v1, v2) {
                v1 = v1.Clone();
                return v1.Div(v2);
            }
            static DivN(v, n) {
                v = v.Clone();
                return v.DivN(n);
            }
            static DivN2(n, v) {
                v = v.Clone();
                return v.DivN2(n);
            }
            static Negate(v) {
                v = v.Clone();
                return v.Negate();
            }
            static Normalize(v) {
                return Vec2.MulN(v, (1 / v.Magnitude()));
            }
            static NormalizeSafe(v) {
                let dis = v.Magnitude();
                if (dis == 0)
                    return new Vec2();
                return Vec2.MulN(v, (1 / dis));
            }
            static Dot(v0, v1) {
                return v0.x * v1.x + v0.y * v1.y;
            }
            static Distance(v0, v1) {
                return Vec2.Sub(v1, v0).Magnitude();
            }
            static DistanceSquared(v0, v1) {
                return Vec2.Sub(v1, v0).SqrMagnitude();
            }
            static ClampMagnitude(v, maxLength) {
                let nor = v.Clone();
                let sqrMagnitude = nor.SqrMagnitude();
                if (sqrMagnitude > (maxLength * maxLength))
                    nor = Vec2.MulN(nor, (maxLength / Numerics.MathUtils.Sqrt(sqrMagnitude)));
                return nor;
            }
            static LerpUnclamped(from, to, t) {
                return new Vec2(from.x + (to.x - from.x) * t, from.y + (to.y - from.y) * t);
            }
            static Lerp(from, to, t) {
                return t <= 0 ? from.Clone() : (t >= 1 ? to.Clone() : Vec2.LerpUnclamped(from, to, t));
            }
            static SlopeXy(v) {
                return v.x / v.y;
            }
            static SlopeYx(v) {
                return v.y / v.x;
            }
            static DegToRad(v) {
                return new Vec2(Numerics.MathUtils.DegToRad(v.x), Numerics.MathUtils.DegToRad(v.y));
            }
            static RadToDeg(v) {
                return new Vec2(Numerics.MathUtils.RadToDeg(v.x), Numerics.MathUtils.RadToDeg(v.y));
            }
            static Abs(v) {
                return new Vec2(Numerics.MathUtils.Abs(v.x), Numerics.MathUtils.Abs(v.y));
            }
            static Pow(v, value) {
                return new Vec2(Numerics.MathUtils.Pow(v.x, value), Numerics.MathUtils.Pow(v.y, value));
            }
            static Floor(v) {
                return new Vec2(Numerics.MathUtils.Floor(v.x), Numerics.MathUtils.Floor(v.y));
            }
            static Round(v) {
                return new Vec2(Numerics.MathUtils.Round(v.x), Numerics.MathUtils.Round(v.y));
            }
            static Equals(v1, v2) {
                if (v1 == null || v2 == null)
                    return false;
                return v1.x == v2.x && v1.y == v2.y;
            }
        }
        Numerics.Vec2 = Vec2;
    })(Numerics = RC.Numerics || (RC.Numerics = {}));
})(RC || (RC = {}));
var RC;
(function (RC) {
    var Numerics;
    (function (Numerics) {
        class Vec3 {
            constructor(x = 0, y = 0, z = 0) {
                this.x = x;
                this.y = y;
                this.z = z;
            }
            static get one() {
                return new Vec3(1, 1, 1);
            }
            static get minusOne() {
                return new Vec3(-1, -1, -1);
            }
            static get zero() {
                return new Vec3(0, 0, 0);
            }
            static get right() {
                return new Vec3(1, 0, 0);
            }
            ;
            static get left() {
                return new Vec3(-1, 0, 0);
            }
            ;
            static get up() {
                return new Vec3(0, 1, 0);
            }
            ;
            static get down() {
                return new Vec3(0, -1, 0);
            }
            ;
            static get forward() {
                return new Vec3(0, 0, 1);
            }
            ;
            static get backward() {
                return new Vec3(0, 0, -1);
            }
            ;
            static get positiveInfinityVector() {
                return new Vec3(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
            }
            ;
            static get negativeInfinityVector() {
                return new Vec3(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
            }
            ;
            Clone() {
                let v = new Vec3();
                v.x = this.x;
                v.y = this.y;
                v.z = this.z;
                return v;
            }
            CopyFrom(v) {
                this.x = v.x;
                this.y = v.y;
                this.z = v.z;
            }
            Set(x, y, z) {
                this.x = x;
                this.y = y;
                this.z = z;
            }
            Clamp(min, max) {
                this.x = Numerics.MathUtils.Clamp(this.x, min.x, max.x);
                this.y = Numerics.MathUtils.Clamp(this.y, min.y, max.y);
                this.z = Numerics.MathUtils.Clamp(this.z, min.z, max.z);
                return this;
            }
            Add(v) {
                this.x += v.x;
                this.y += v.y;
                this.z += v.z;
                return this;
            }
            AddN(n) {
                this.x += n;
                this.y += n;
                this.z += n;
                return this;
            }
            Sub(v) {
                this.x -= v.x;
                this.y -= v.y;
                this.z -= v.z;
                return this;
            }
            SubN(n) {
                this.x -= n;
                this.y -= n;
                this.z -= n;
                return this;
            }
            SubN2(n) {
                this.x = n - this.x;
                this.y = n - this.y;
                this.z = n - this.z;
                return this;
            }
            Negate() {
                this.x = -this.x;
                this.y = -this.y;
                this.z = -this.z;
                return this;
            }
            Mul(v) {
                this.x *= v.x;
                this.y *= v.y;
                this.z *= v.z;
                return this;
            }
            MulN(n) {
                this.x *= n;
                this.y *= n;
                this.z *= n;
                return this;
            }
            Div(v) {
                this.x /= v.x;
                this.y /= v.y;
                this.z /= v.z;
                return this;
            }
            DivN(n) {
                this.x /= n;
                this.y /= n;
                this.z /= n;
                return this;
            }
            DivN2(n) {
                this.x = n / this.x;
                this.y = n / this.y;
                this.z = n / this.z;
                return this;
            }
            ClampMagnitude(maxLength) {
                let sqrMagnitude = this.SqrMagnitude();
                if (sqrMagnitude > maxLength * maxLength) {
                    let f = maxLength / Numerics.MathUtils.Sqrt(sqrMagnitude);
                    this.x *= f;
                    this.y *= f;
                    this.z *= f;
                }
            }
            Magnitude() {
                return Numerics.MathUtils.Sqrt(this.SqrMagnitude());
            }
            SqrMagnitude() {
                return this.x * this.x + this.y * this.y + this.z * this.z;
            }
            Distance(vector) {
                return Vec3.Sub(vector, this).Magnitude();
            }
            DistanceSquared(vector) {
                return Vec3.Sub(vector, this).SqrMagnitude();
            }
            Scale(scale) {
                this.x *= scale.x;
                this.y *= scale.y;
                this.z *= scale.z;
            }
            Dot(v) {
                return this.x * v.x + this.y * v.y + this.z * v.z;
            }
            Cross(v) {
                return new Vec3(this.y * v.z - this.z * v.y, this.z * v.x - this.x * v.z, this.x * v.y - this.y * v.x);
            }
            Normalize() {
                let f = 1 / this.Magnitude();
                this.x *= f;
                this.y *= f;
                this.z *= f;
            }
            NormalizeSafe() {
                let f = this.Magnitude();
                if (f == 0)
                    return;
                this.x *= f;
                this.y *= f;
                this.z *= f;
            }
            AproxEqualsBox(vector, tolerance) {
                return (Numerics.MathUtils.Abs(this.x - vector.x) <= tolerance) && (Numerics.MathUtils.Abs(this.y - vector.y) <= tolerance) && (Numerics.MathUtils.Abs(this.z - vector.z) <= tolerance);
            }
            ApproxEquals(vector, tolerance) {
                return this.Distance(vector) <= tolerance;
            }
            RotateAround(angle, axis) {
                let quaternion = Numerics.Quat.AngleAxis(0, axis);
                quaternion = quaternion.Conjugate();
                let worldSpaceVector = quaternion.Transform(this);
                quaternion = Numerics.Quat.AngleAxis(angle, axis);
                worldSpaceVector = quaternion.Transform(worldSpaceVector);
                return worldSpaceVector;
            }
            IntersectsTriangle(p0, p1, p2) {
                let v0 = Vec3.Sub(p1, p0);
                let v1 = Vec3.Sub(p2, p0);
                let v2 = Vec3.Sub(this, p0);
                let dot00 = v0.SqrMagnitude();
                let dot01 = v0.Dot(v1);
                let dot02 = v0.Dot(v2);
                let dot11 = v1.SqrMagnitude();
                let dot12 = v1.Dot(v2);
                let invDenom = 1 / (dot00 * dot11 - dot01 * dot01);
                let u = (dot11 * dot02 - dot01 * dot12) * invDenom;
                let v = (dot00 * dot12 - dot01 * dot02) * invDenom;
                return (u > 0) && (v > 0) && (u + v < 1);
            }
            Reflect(planeNormal) {
                return Vec3.Sub(this, Vec3.MulN(planeNormal, this.Dot(planeNormal) * 2));
            }
            Refract(normal, refractionIndex) {
                let cosI = -normal.Dot(this);
                let sinT2 = refractionIndex * refractionIndex * (1.0 - cosI * cosI);
                if (sinT2 > 1.0)
                    return this;
                let cosT = Numerics.MathUtils.Sqrt(1.0 - sinT2);
                return Vec3.Add(Vec3.MulN(this, refractionIndex), Vec3.MulN(normal, (refractionIndex * cosI - cosT)));
            }
            InersectNormal(normal) {
                return Vec3.MulN(normal, this.Dot(normal));
            }
            InersectRay(rayOrigin, rayDirection) {
                let v = Vec3.Sub(this, rayOrigin);
                return Vec3.Add(Vec3.MulN(rayDirection, v.Dot(rayDirection)), rayOrigin);
            }
            InersectLine(line) {
                let pointOffset = Vec3.Sub(this, line.point1);
                let vector = Vec3.Normalize(Vec3.Sub(line.point2, line.point1));
                return Vec3.Add(Vec3.MulN(vector, pointOffset.Dot(vector)), line.point1);
            }
            InersectPlane(planeNormal, planeLocation) {
                let v = Vec3.Sub(this, planeLocation);
                return Vec3.Sub(this, Vec3.MulN(planeNormal, v.Dot(planeNormal)));
            }
            EqualsTo(v) {
                return Vec3.Equals(this, v);
            }
            ToString() {
                return `(${this.x}, ${this.y}, ${this.z})`;
            }
            static Add(v1, v2) {
                v1 = v1.Clone();
                return v1.Add(v2);
            }
            static AddN(v, n) {
                v = v.Clone();
                return v.AddN(n);
            }
            static Sub(v1, v2) {
                v1 = v1.Clone();
                return v1.Sub(v2);
            }
            static SubN(v, n) {
                v = v.Clone();
                return v.SubN(n);
            }
            static SubN2(n, v) {
                v = v.Clone();
                return v.SubN2(n);
            }
            static Mul(v1, v2) {
                v1 = v1.Clone();
                return v1.Mul(v2);
            }
            static MulN(v, n) {
                v = v.Clone();
                return v.MulN(n);
            }
            static Div(v1, v2) {
                v1 = v1.Clone();
                return v1.Div(v2);
            }
            static DivN(v, n) {
                v = v.Clone();
                return v.DivN(n);
            }
            static DivN2(n, v) {
                v = v.Clone();
                return v.DivN2(n);
            }
            static Negate(v) {
                v = v.Clone();
                return v.Negate();
            }
            static Equals(v1, v2) {
                if (v1 == null || v2 == null)
                    return false;
                return v1.x == v2.x && v1.y == v2.y && v1.z == v2.z;
            }
            static Distance(v0, v1) {
                return Vec3.Sub(v1, v0).Magnitude();
            }
            static DistanceSquared(v0, v1) {
                return Vec3.Sub(v1, v0).SqrMagnitude();
            }
            static Angle(from, to) {
                let v = Vec3.Dot(Vec3.Normalize(from), Vec3.Normalize(to));
                return Numerics.MathUtils.Acos(Numerics.MathUtils.Clamp(v, -1, 1)) * Numerics.MathUtils.RAD_TO_DEG;
            }
            static ClampMagnitude(v, maxLength) {
                let nor = v.Clone();
                let sqrMagnitude = nor.SqrMagnitude();
                if (sqrMagnitude > (maxLength * maxLength))
                    nor = Vec3.MulN(nor, (maxLength / Numerics.MathUtils.Sqrt(sqrMagnitude)));
                return nor;
            }
            static Normalize(v) {
                return Vec3.MulN(v, (1 / v.Magnitude()));
            }
            static NormalizeSafe(v) {
                let dis = v.Magnitude();
                if (dis == 0)
                    return Vec3.zero;
                return Vec3.MulN(v, 1 / dis);
            }
            static Dot(v0, v1) {
                return v0.Dot(v1);
            }
            static Cross(v0, v1) {
                return v0.Cross(v1);
            }
            static OrthoNormalVector(v) {
                let res = new Vec3();
                if (Numerics.MathUtils.Abs(v.z) > Vec3.OVER_SQRT2) {
                    let a = v.y * v.y + v.z * v.z;
                    let k = 1 / Numerics.MathUtils.Sqrt(a);
                    res.x = 0;
                    res.y = -v.z * k;
                    res.z = v.y * k;
                }
                else {
                    let a = v.x * v.x + v.y * v.y;
                    let k = 1 / Numerics.MathUtils.Sqrt(a);
                    res.x = -v.y * k;
                    res.y = v.x * k;
                    res.z = 0;
                }
                return res;
            }
            static SlerpUnclamped(from, to, t) {
                let scale0;
                let scale1;
                let len2 = to.Magnitude();
                let len1 = from.Magnitude();
                let v2 = Vec3.DivN(to, len2);
                let v1 = Vec3.DivN(from, len1);
                let len = (len2 - len1) * t + len1;
                let cosom = Vec3.Dot(v1, v2);
                if (cosom > 1 - 1e-6) {
                    scale0 = 1 - t;
                    scale1 = t;
                }
                else if (cosom < -1 + 1e-6) {
                    let axis = Vec3.OrthoNormalVector(from);
                    let q = Numerics.Quat.AngleAxis(180.0 * t, axis);
                    let v = Vec3.MulN(q.Transform(from), len);
                    return v;
                }
                else {
                    let omega = Numerics.MathUtils.Acos(cosom);
                    let sinom = Numerics.MathUtils.Sin(omega);
                    scale0 = Numerics.MathUtils.Sin((1 - t) * omega) / sinom;
                    scale1 = Numerics.MathUtils.Sin(t * omega) / sinom;
                }
                v2 = Vec3.MulN(Vec3.Add(Vec3.MulN(v2, scale1), Vec3.MulN(v1, scale0)), len);
                return v2;
            }
            static Slerp(from, to, t) {
                return t <= 0 ? from.Clone() : (t >= 1 ? to.Clone() : Vec3.SlerpUnclamped(from, to, t));
            }
            static LerpUnclamped(from, to, t) {
                return new Vec3(from.x + (to.x - from.x) * t, from.y + (to.y - from.y) * t, from.z + (to.z - from.z) * t);
            }
            static Lerp(from, to, t) {
                return t <= 0 ? from.Clone() : (t >= 1 ? to.Clone() : Vec3.LerpUnclamped(from, to, t));
            }
            static SmoothDamp(current, target, currentVelocity, smoothTime, maxSpeed, deltaTime) {
                smoothTime = Numerics.MathUtils.Max(0.0001, smoothTime);
                let num = 2 / smoothTime;
                let num2 = num * deltaTime;
                let num3 = 1 / (1 + num2 + 0.48 * num2 * num2 + 0.235 * num2 * num2 * num2);
                let maxLength = maxSpeed * smoothTime;
                let vector = Vec3.Sub(current, target);
                vector.ClampMagnitude(maxLength);
                target = Vec3.Sub(current, vector);
                let v = Vec3.MulN(Vec3.Add(currentVelocity[0], Vec3.MulN(vector, num)), deltaTime);
                currentVelocity[0] = Vec3.MulN(Vec3.Sub(currentVelocity[0], Vec3.MulN(v, num)), num3);
                let v2 = Vec3.Add(target, Vec3.MulN(Vec3.Add(vector, v), num3));
                if (Vec3.Dot(Vec3.Sub(target, current), Vec3.Sub(v2, target)) > 0) {
                    v2 = target;
                    currentVelocity[0].Set(0, 0, 0);
                }
                return v2;
            }
            static MoveTowards(current, target, maxDistanceDelta) {
                let delta = Vec3.Sub(target, current);
                let sqrDelta = delta.SqrMagnitude();
                let sqrDistance = maxDistanceDelta * maxDistanceDelta;
                if (sqrDelta > sqrDistance) {
                    let magnitude = Numerics.MathUtils.Sqrt(sqrDelta);
                    if (magnitude > 1e-6) {
                        delta = Vec3.Add(Vec3.DivN(Vec3.MulN(delta, maxDistanceDelta), magnitude), current);
                        return delta;
                    }
                    return current.Clone();
                }
                return target.Clone();
            }
            static ClampedMove(lhs, rhs, clampedDelta) {
                let delta = rhs - lhs;
                if (delta > 0)
                    return lhs + Numerics.MathUtils.Min(delta, clampedDelta);
                return lhs - Numerics.MathUtils.Min(-delta, clampedDelta);
            }
            static RotateTowards(current, target, maxRadiansDelta, maxMagnitudeDelta) {
                let len1 = current.Magnitude();
                let len2 = target.Magnitude();
                if (len1 > 1e-6 && len2 > 1e-6) {
                    let from = Vec3.DivN(current, len1);
                    let to = Vec3.DivN(target, len2);
                    let cosom = Vec3.Dot(from, to);
                    if (cosom > 1 - 1e-6)
                        return Vec3.MoveTowards(current, target, maxMagnitudeDelta);
                    if (cosom < -1 + 1e-6) {
                        let q = Numerics.Quat.AngleAxis(maxRadiansDelta * Numerics.MathUtils.RAD_TO_DEG, Vec3.OrthoNormalVector(from));
                        return Vec3.MulN(q.Transform(from), Vec3.ClampedMove(len1, len2, maxMagnitudeDelta));
                    }
                    else {
                        let angle = Numerics.MathUtils.Acos(cosom);
                        let q = Numerics.Quat.AngleAxis(Numerics.MathUtils.Min(maxRadiansDelta, angle) * Numerics.MathUtils.RAD_TO_DEG, Vec3.Normalize(Vec3.Cross(from, to)));
                        return Vec3.MulN(q.Transform(from), Vec3.ClampedMove(len1, len2, maxMagnitudeDelta));
                    }
                }
                return Vec3.MoveTowards(current, target, maxMagnitudeDelta);
            }
            static OrthoNormalize(va, vb, vc) {
                va[0].Normalize();
                vb[0] = Vec3.Sub(vb[0], Vec3.Project(vb[0], va[0]));
                vb[0].Normalize();
                vc[0] = Vec3.Sub(vc[0], Vec3.Project(vc[0], va[0]));
                vc[0] = Vec3.Sub(vc[0], Vec3.Project(vc[0], vb[0]));
                vc[0].Normalize();
            }
            static Project(vector, onNormal) {
                let num = onNormal.SqrMagnitude();
                if (num < 1.175494e-38)
                    return Vec3.zero;
                let num2 = Vec3.Dot(vector, onNormal);
                let v3 = Vec3.MulN(onNormal, (num2 / num));
                return v3;
            }
            static ProjectOnPlane(vector, planeNormal) {
                return Vec3.Add(Vec3.Negate(Vec3.Project(vector, planeNormal)), vector);
            }
            static Reflect(inDirection, inNormal) {
                let num = -2 * Vec3.Dot(inNormal, inDirection);
                inNormal = Vec3.MulN(inNormal, num);
                inNormal = Vec3.Add(inNormal, inDirection);
                return inNormal;
            }
            static Hermite(value1, tangent1, value2, tangent2, t) {
                let weightSquared = t * t;
                let weightCubed = t * weightSquared;
                let value1Blend = 2 * weightCubed - 3 * weightSquared + 1;
                let tangent1Blend = weightCubed - 2 * weightSquared + t;
                let value2Blend = -2 * weightCubed + 3 * weightSquared;
                let tangent2Blend = weightCubed - weightSquared;
                return new Vec3(value1.x * value1Blend + value2.x * value2Blend + tangent1.x * tangent1Blend + tangent2.x * tangent2Blend, value1.y * value1Blend + value2.y * value2Blend + tangent1.y * tangent1Blend + tangent2.y * tangent2Blend, value1.z * value1Blend + value2.z * value2Blend + tangent1.z * tangent1Blend + tangent2.z * tangent2Blend);
            }
            static DegToRad(v) {
                return new Vec3(Numerics.MathUtils.DegToRad(v.x), Numerics.MathUtils.DegToRad(v.y), Numerics.MathUtils.DegToRad(v.z));
            }
            static RadToDeg(v) {
                return new Vec3(Numerics.MathUtils.RadToDeg(v.x), Numerics.MathUtils.RadToDeg(v.y), Numerics.MathUtils.RadToDeg(v.z));
            }
            static MaxN(v, value) {
                return new Vec3(Numerics.MathUtils.Max(v.x, value), Numerics.MathUtils.Max(v.y, value), Numerics.MathUtils.Max(v.z, value));
            }
            static Max(v, v1) {
                return new Vec3(Numerics.MathUtils.Max(v.x, v1.x), Numerics.MathUtils.Max(v.y, v1.y), Numerics.MathUtils.Max(v.z, v1.z));
            }
            static MinN(v, v1) {
                return new Vec3(Numerics.MathUtils.Min(v.x, v1), Numerics.MathUtils.Min(v.y, v1), Numerics.MathUtils.Min(v.z, v1));
            }
            static Min(v, v1) {
                return new Vec3(Numerics.MathUtils.Min(v.x, v1.x), Numerics.MathUtils.Min(v.y, v1.y), Numerics.MathUtils.Min(v.z, v1.z));
            }
            static Abs(v) {
                return new Vec3(Numerics.MathUtils.Abs(v.x), Numerics.MathUtils.Abs(v.y), Numerics.MathUtils.Abs(v.z));
            }
            static Pow(v, value) {
                return new Vec3(Numerics.MathUtils.Pow(v.x, value), Numerics.MathUtils.Pow(v.y, value), Numerics.MathUtils.Pow(v.z, value));
            }
            static Floor(v) {
                return new Vec3(Numerics.MathUtils.Floor(v.x), Numerics.MathUtils.Floor(v.y), Numerics.MathUtils.Floor(v.z));
            }
            static Round(v) {
                return new Vec3(Numerics.MathUtils.Round(v.x), Numerics.MathUtils.Round(v.y), Numerics.MathUtils.Round(v.z));
            }
        }
        Vec3.OVER_SQRT2 = 0.7071067811865475244008443621048490;
        Numerics.Vec3 = Vec3;
    })(Numerics = RC.Numerics || (RC.Numerics = {}));
})(RC || (RC = {}));
var RC;
(function (RC) {
    var Numerics;
    (function (Numerics) {
        class Vec4 {
            constructor(x = 0, y = 0, z = 0, w = 0) {
                this.x = x;
                this.y = y;
                this.z = z;
                this.w = w;
            }
            static get one() {
                return new Vec4(1, 1, 1, 1);
            }
            static get minusOne() {
                return new Vec4(-1, -1, -1, -1);
            }
            static get zero() {
                return new Vec4(0, 0, 0, 0);
            }
            static get right() {
                return new Vec4(1, 0, 0, 0);
            }
            ;
            static get left() {
                return new Vec4(-1, 0, 0, 0);
            }
            ;
            static get up() {
                return new Vec4(0, 1, 0, 0);
            }
            ;
            static get down() {
                return new Vec4(0, -1, 0, 0);
            }
            ;
            static get forward() {
                return new Vec4(0, 0, 1, 0);
            }
            ;
            static get height() {
                return new Vec4(0, 0, 0, 1);
            }
            ;
            static get low() {
                return new Vec4(0, 0, 0, -1);
            }
            ;
            static get backward() {
                return new Vec4(0, 0, -1, 0);
            }
            ;
            static get positiveInfinityVector() {
                return new Vec4(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
            }
            ;
            static get negativeInfinityVector() {
                return new Vec4(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
            }
            ;
            Clone() {
                let v = new Vec4();
                v.x = this.x;
                v.y = this.y;
                v.z = this.z;
                v.w = this.w;
                return v;
            }
            CopyFrom(v) {
                this.x = v.x;
                this.y = v.y;
                this.z = v.z;
                this.w = v.w;
            }
            Set(x, y, z, w) {
                this.x = x;
                this.y = y;
                this.z = z;
                this.w = w;
            }
            Clamp(min, max) {
                this.x = Numerics.MathUtils.Clamp(this.x, min.x, max.x);
                this.y = Numerics.MathUtils.Clamp(this.y, min.y, max.y);
                this.z = Numerics.MathUtils.Clamp(this.z, min.z, max.z);
                this.w = Numerics.MathUtils.Clamp(this.w, min.w, max.w);
                return this;
            }
            Add(v) {
                this.x += v.x;
                this.y += v.y;
                this.z += v.z;
                this.w += v.w;
                return this;
            }
            AddN(n) {
                this.x += n;
                this.y += n;
                this.z += n;
                this.w += n;
                return this;
            }
            Sub(v) {
                this.x -= v.x;
                this.y -= v.y;
                this.z -= v.z;
                this.w -= v.w;
                return this;
            }
            SubN(n) {
                this.x -= n;
                this.y -= n;
                this.z -= n;
                this.w -= n;
                return this;
            }
            SubN2(n) {
                this.x = n - this.x;
                this.y = n - this.y;
                this.z = n - this.z;
                this.w = n - this.w;
                return this;
            }
            Mul(v) {
                this.x *= v.x;
                this.y *= v.y;
                this.z *= v.z;
                this.w *= v.w;
                return this;
            }
            MulN(n) {
                this.x *= n;
                this.y *= n;
                this.z *= n;
                this.w *= n;
                return this;
            }
            Div(v) {
                this.x /= v.x;
                this.y /= v.y;
                this.z /= v.z;
                this.w /= v.w;
                return this;
            }
            DivN(n) {
                this.x /= n;
                this.y /= n;
                this.z /= n;
                this.w /= n;
                return this;
            }
            DivN2(n) {
                this.x = n / this.x;
                this.y = n / this.y;
                this.z = n / this.z;
                this.w = n / this.w;
                return this;
            }
            Negate() {
                this.x = -this.x;
                this.y = -this.y;
                this.z = -this.z;
                this.w = -this.w;
                return this;
            }
            ClampMagnitude(maxLength) {
                let sqrMagnitude = this.SqrMagnitude();
                if (sqrMagnitude > (maxLength * maxLength)) {
                    let f = maxLength / Numerics.MathUtils.Sqrt(sqrMagnitude);
                    this.x *= f;
                    this.y *= f;
                    this.z *= f;
                    this.w *= f;
                }
            }
            Magnitude() {
                return Numerics.MathUtils.Sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
            }
            SqrMagnitude() {
                return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
            }
            Distance(vector) {
                return Vec4.Sub(vector, this).Magnitude();
            }
            DistanceSquared(vector) {
                return Vec4.Sub(vector, this).SqrMagnitude();
            }
            Scale(scale) {
                this.x *= scale.x;
                this.y *= scale.y;
                this.z *= scale.z;
                this.w *= scale.w;
            }
            Dot(vector) {
                return this.x * vector.x + this.y * vector.y + this.z * vector.z + this.w * vector.w;
            }
            Normalize() {
                let f = 1 / this.Magnitude();
                this.x *= f;
                this.y *= f;
                this.z *= f;
                this.w *= f;
            }
            NormalizeSafe() {
                let f = this.Magnitude();
                if (f == 0)
                    return;
                this.x *= f;
                this.y *= f;
                this.z *= f;
                this.w *= f;
            }
            AproxEqualsBox(vector, tolerance) {
                return (Numerics.MathUtils.Abs(this.x - vector.x) <= tolerance) &&
                    (Numerics.MathUtils.Abs(this.y - vector.y) <= tolerance) &&
                    (Numerics.MathUtils.Abs(this.z - vector.z) <= tolerance) &&
                    (Numerics.MathUtils.Abs(this.w - vector.w) <= tolerance);
            }
            ApproxEquals(vector, tolerance) {
                return this.Distance(vector) <= tolerance;
            }
            EqualsTo(v) {
                return Vec4.Equals(this, v);
            }
            ToString() {
                return `(${this.x}, ${this.y}, ${this.z}, ${this.w})`;
            }
            static Add(v1, v2) {
                v1 = v1.Clone();
                return v1.Add(v2);
            }
            static AddN(v, n) {
                v = v.Clone();
                return v.AddN(n);
            }
            static Sub(v1, v2) {
                v1 = v1.Clone();
                return v1.Sub(v2);
            }
            static SubN(v, n) {
                v = v.Clone();
                return v.SubN(n);
            }
            static SubN2(n, v) {
                v = v.Clone();
                return v.SubN2(n);
            }
            static Mul(v1, v2) {
                v1 = v1.Clone();
                return v1.Mul(v2);
            }
            static MulN(v, n) {
                v = v.Clone();
                return v.MulN(n);
            }
            static Div(v1, v2) {
                v1 = v1.Clone();
                return v1.Div(v2);
            }
            static DivN(v, n) {
                v = v.Clone();
                return v.DivN(n);
            }
            static DivN2(n, v) {
                v = v.Clone();
                return v.DivN2(n);
            }
            static Equals(v1, v2) {
                if (v1 == null || v2 == null)
                    return false;
                return v1.x == v2.x && v1.y == v2.y && v1.z == v2.z && v1.w == v2.w;
            }
            static Distance(v0, v1) {
                return Vec4.Sub(v1, v0).Magnitude();
            }
            static DistanceSquared(v0, v1) {
                return Vec4.Sub(v1, v0).SqrMagnitude();
            }
            static ClampMagnitude(v, maxLength) {
                let nor = v.Clone();
                let sqrMagnitude = nor.SqrMagnitude();
                if (sqrMagnitude > (maxLength * maxLength))
                    nor = Vec4.MulN(nor, (maxLength / Numerics.MathUtils.Sqrt(sqrMagnitude)));
                return nor;
            }
            static Normalize(v) {
                return Vec4.MulN(v, (1 / v.Magnitude()));
            }
            static NormalizeSafe(v) {
                let f = v.Magnitude();
                if (f == 0)
                    return new Vec4();
                return Vec4.MulN(v, (1 / f));
            }
            static LerpUnclamped(from, to, t) {
                return new Vec4(from.x + (to.x - from.x) * t, from.y + (to.y - from.y) * t, from.z + (to.z - from.z) * t, from.w + (to.w - from.w) * t);
            }
            static Lerp(from, to, t) {
                return t <= 0 ? from.Clone() : (t >= 1 ? to.Clone() : Vec4.LerpUnclamped(from, to, t));
            }
            static Abs(v) {
                return new Vec4(Numerics.MathUtils.Abs(v.x), Numerics.MathUtils.Abs(v.y), Numerics.MathUtils.Abs(v.z), Numerics.MathUtils.Abs(v.w));
            }
            static Pow(v, power) {
                return new Vec4(Numerics.MathUtils.Pow(v.x, power), Numerics.MathUtils.Pow(v.y, power), Numerics.MathUtils.Pow(v.z, power), Numerics.MathUtils.Pow(v.w, power));
            }
            static Floor(v) {
                return new Vec4(Numerics.MathUtils.Floor(v.x), Numerics.MathUtils.Floor(v.y), Numerics.MathUtils.Floor(v.z), Numerics.MathUtils.Floor(v.w));
            }
            static Round(v) {
                return new Vec4(Numerics.MathUtils.Round(v.x), Numerics.MathUtils.Round(v.y), Numerics.MathUtils.Round(v.z), Numerics.MathUtils.Round(v.w));
            }
        }
        Numerics.Vec4 = Vec4;
    })(Numerics = RC.Numerics || (RC.Numerics = {}));
})(RC || (RC = {}));
var RC;
(function (RC) {
    var Utils;
    (function (Utils) {
        class ConsistentRandom {
            constructor(seed) {
                this.seed = seed;
            }
            Next(min, max) {
                max = max || 0;
                min = min || 0;
                this.seed = (this.seed * 9301 + 49297) % 233280;
                let rnd = this.seed / 233280;
                return min + rnd * (max - min);
            }
            NextInt(min, max) {
                return Math.round(this.Next(min, max));
            }
            NextDouble() {
                return this.Next(0, 1);
            }
            Pick(collection) {
                return collection[this.NextInt(0, collection.length - 1)];
            }
        }
        Utils.ConsistentRandom = ConsistentRandom;
    })(Utils = RC.Utils || (RC.Utils = {}));
})(RC || (RC = {}));
var RC;
(function (RC) {
    var Utils;
    (function (Utils) {
        let GuidFormat;
        (function (GuidFormat) {
            GuidFormat[GuidFormat["BRACES"] = 1] = "BRACES";
            GuidFormat[GuidFormat["DASHES"] = 2] = "DASHES";
        })(GuidFormat = Utils.GuidFormat || (Utils.GuidFormat = {}));
        class GUID {
            constructor(val, val2, val3, val4) {
                this.data1 = new Uint8Array(4);
                this.data2 = new Uint8Array(2);
                this.data3 = new Uint8Array(2);
                this.data4 = new Uint8Array(8);
                if (val != null) {
                    if (typeof val === 'string') {
                        this.ParseImpl(val);
                        return;
                    }
                    let ctor = val.constructor;
                    if (ctor.name === 'GUID') {
                        this.CopyCtor(val);
                        return;
                    }
                    if (ctor.name === 'Uint8Array') {
                        let dummy = val;
                        this.data1 = dummy;
                    }
                    else {
                        throw Error('Argument exception : val1 is of invalid type');
                    }
                    if (val2 != null) {
                        this.data2 = val2;
                    }
                    else {
                        throw Error('Argument exception : val2 is null');
                    }
                    if (val3 != null) {
                        this.data3 = val3;
                    }
                    else {
                        throw Error('Argument exception : val3 is null');
                    }
                    if (val4 != null) {
                        this.data4 = val4;
                    }
                    else {
                        throw Error('Argument exception : val4 is null');
                    }
                }
            }
            CopyCtor(val) {
                if (val == null)
                    throw Error('val is null');
                for (let i = 0; i < val.Data1.length; ++i)
                    this.data1[i] = val.Data1[i];
                for (let i = 0; i < val.Data2.length; ++i)
                    this.data2[i] = val.Data2[i];
                for (let i = 0; i < val.Data3.length; ++i)
                    this.data3[i] = val.Data3[i];
                for (let i = 0; i < val.Data4.length; ++i)
                    this.data4[i] = val.Data4[i];
            }
            ParseImpl(val) {
                if (val == null)
                    throw Error('val is null');
                let ret = GUID.Parse(val);
                this.CopyCtor(ret);
            }
            ToString(format) {
                if (format == null) {
                    format = GuidFormat.BRACES | GuidFormat.DASHES;
                }
                let data = [
                    GUID.ToStringHexUint8(this.data1),
                    GUID.ToStringHexUint8(this.data2),
                    GUID.ToStringHexUint8(this.data3),
                    GUID.ToStringHexUint8(this.data4, 0, 2),
                    GUID.ToStringHexUint8(this.data4, 2)
                ];
                let str = data.join(format & GuidFormat.DASHES ? '-' : '');
                if (format & GuidFormat.BRACES) {
                    str = '{' + str + '}';
                }
                return str;
            }
            static Parse(value) {
                if (value == null) {
                    throw Error('value is null');
                }
                if (value == undefined) {
                    throw Error('value is undefined');
                }
                if (typeof value != 'string') {
                    throw Error('value must be a string');
                }
                if (value.length == 0) {
                    throw Error('value is empty');
                }
                value = value.trim().toUpperCase();
                if (value.length != 32 &&
                    value.length != 34 &&
                    value.length != 36 &&
                    value.length != 38) {
                    throw Error('invalid format length');
                }
                let validCharacters = ['A', 'B', 'C', 'D', 'E', 'F', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '{', '}', '-'];
                for (let i = 0; i < value.length; ++i) {
                    if (validCharacters.indexOf(value[i]) == -1) {
                        throw Error('invalid format character');
                    }
                }
                let posPadding = 0;
                let end = value.length;
                let start = value.indexOf('{');
                if (start != -1) {
                    end = value.indexOf('}');
                    if (start != 0 || end == -1 || end != value.length - 1) {
                        throw Error('Invalid format braces');
                    }
                    start = 1;
                }
                else {
                    start = 0;
                }
                let hasDashes = value.indexOf('-') != -1;
                if (hasDashes &&
                    (value[start + 8] != '-' ||
                        value[start + 13] != '-' ||
                        value[start + 18] != '-' ||
                        value[start + 23] != '-')) {
                    throw Error('invalid format dashes');
                }
                if (hasDashes) {
                    ++posPadding;
                }
                let data1 = value.substring(start, start = (start + 8));
                let data2 = value.substring(start + posPadding, start = (start + 4 + posPadding));
                let data3 = value.substring(start + posPadding, start = (start + 4 + posPadding));
                let data4H = value.substring(start + posPadding, start = (start + 4 + posPadding));
                let data4L = value.substring(start + posPadding, end);
                return new GUID(GUID.StringToUint8(data1), GUID.StringToUint8(data2), GUID.StringToUint8(data3), GUID.StringToUint8(data4H + data4L));
            }
            static Generate(seed) {
                if (seed == null) {
                    seed = new Date().getTime();
                }
                let guid = new GUID();
                crypto.getRandomValues(guid.data1);
                crypto.getRandomValues(guid.data2);
                crypto.getRandomValues(guid.data3);
                crypto.getRandomValues(guid.data4);
                return guid;
            }
            static ToStringHexUint8(values, start, end) {
                start = start == null ? 0 : start;
                end = end == null ? values.length : end;
                let str = '';
                for (let i = start; i < end; ++i) {
                    let val = values[i].toString(16);
                    str += val.length == 1 ? '0' + val : val;
                }
                return str.toUpperCase();
            }
            static StringToUint8(val) {
                if (val == null)
                    throw Error('val is null');
                if (val == undefined)
                    throw Error('val is undefined');
                if (typeof val != 'string')
                    throw Error('val should be a string');
                let arr = new Uint8Array(val.length / 2);
                let j = 0;
                for (let i = 0; i < val.length; ++i, ++j) {
                    let tmp = val[j] + val[++j];
                    arr[i] = parseInt(tmp, 16);
                }
                return arr;
            }
            static Convolution(f, g) {
                if (f == null)
                    throw Error('f is null');
                if (g == null)
                    throw Error('g is null');
                if (f == undefined)
                    throw Error('f is undefined');
                if (g == undefined)
                    throw Error('g is undefined');
                if (f.length == 0)
                    throw Error('f needs to be >= 1');
                if (g.length == 0)
                    throw Error('g needs to be >= 1');
                const SIZE = f.length + g.length - 1;
                let ret = new Uint8Array(SIZE);
                for (let n = 0; n < SIZE; ++n) {
                    let tmp = 0;
                    let kmin = (n >= g.length - 1) ? n - (g.length - 1) : 0;
                    let kmaX = (n < f.length - 1) ? n : f.length - 1;
                    for (let k = kmin; k <= kmaX; ++k) {
                        let signal = f[k];
                        let kernel = g[n - k];
                        tmp += (signal * kernel);
                    }
                    ret[n] = tmp;
                }
                return ret;
            }
        }
        GUID.empty = new GUID();
        Utils.GUID = GUID;
    })(Utils = RC.Utils || (RC.Utils = {}));
})(RC || (RC = {}));
var RC;
(function (RC) {
    var Utils;
    (function (Utils) {
        class Hashtable {
            static Concat(map, map2) {
                for (let k in map2) {
                    if (map[k] == undefined) {
                        map[k] = map2[k];
                    }
                }
            }
            static GetArray(map, key) {
                return map[key];
            }
            static GetMap(map, key) {
                return map[key];
            }
            static GetString(map, key) {
                return map[key];
            }
            static GetNumber(map, key) {
                return map[key];
            }
            static GetBool(map, key) {
                return map[key];
            }
            static GetStringArray(map, key) {
                return this.GetArray(map, key);
            }
            static GetNumberArray(map, key) {
                return this.GetArray(map, key);
            }
            static GetBoolArray(map, key) {
                return this.GetArray(map, key);
            }
            static GetVec2Array(map, key) {
                let arrs = this.GetArray(map, key);
                if (arrs == null)
                    return null;
                let result = [];
                for (let arr of arrs) {
                    result.push(new RC.Numerics.Vec2(arr[0], arr[1]));
                }
                return result;
            }
            static GetVec3Array(map, key) {
                let arrs = this.GetArray(map, key);
                if (arrs == null)
                    return null;
                let result = [];
                for (let arr of arrs) {
                    result.push(new RC.Numerics.Vec3(arr[0], arr[1], arr[2]));
                }
                return result;
            }
            static GetVec4Array(map, key) {
                let arrs = this.GetArray(map, key);
                if (arrs == null)
                    return null;
                let result = [];
                for (let arr of arrs) {
                    result.push(new RC.Numerics.Vec4(arr[0], arr[1], arr[2], arr[3]));
                }
                return result;
            }
            static GetVec2(map, key) {
                let arr = this.GetArray(map, key);
                if (arr == null)
                    return null;
                return new RC.Numerics.Vec2(arr[0], arr[1]);
            }
            static GetVec3(map, key) {
                let arr = this.GetArray(map, key);
                if (arr == null)
                    return null;
                return new RC.Numerics.Vec3(arr[0], arr[1], arr[2]);
            }
            static GetVec4(map, key) {
                let arr = this.GetArray(map, key);
                if (arr == null)
                    return null;
                return new RC.Numerics.Vec4(arr[0], arr[1], arr[2], arr[3]);
            }
        }
        Utils.Hashtable = Hashtable;
    })(Utils = RC.Utils || (RC.Utils = {}));
})(RC || (RC = {}));
var RC;
(function (RC) {
    class Logger {
        static Log(message) {
            console.log(message);
        }
        static Warn(message) {
            console.warn(message);
        }
        static Error(message) {
            console.error(message);
        }
        static Info(message) {
            console.info(message);
        }
        static Debug(message) {
            console.debug(message);
        }
        static Trace(message) {
            console.trace(message);
        }
        static Assert(condition, message) {
            console.assert(condition, message);
        }
        static Exception(message) {
            console.exception(message);
        }
    }
    RC.Logger = Logger;
})(RC || (RC = {}));
var RC;
(function (RC) {
    var Utils;
    (function (Utils) {
        class Timer {
            static get utcTime() {
                let d1 = new Date();
                return new Date(d1.getUTCFullYear(), d1.getUTCMonth(), d1.getUTCDate(), d1.getUTCHours(), d1.getUTCMinutes(), d1.getUTCSeconds(), d1.getUTCMilliseconds()).getTime();
            }
            static ToLocalTimeString(utc) {
                let d1 = new Date(utc);
                let d2 = Date.UTC(d1.getFullYear(), d1.getMonth(), d1.getDate(), d1.getHours(), d1.getMinutes(), d1.getSeconds(), d1.getMilliseconds());
                return d2.toLocaleString();
            }
        }
        Utils.Timer = Timer;
    })(Utils = RC.Utils || (RC.Utils = {}));
})(RC || (RC = {}));