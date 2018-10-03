declare namespace RC {
    class Test {
        constructor();
        private _i;
        private F;
    }
}
declare namespace RC.Algorithm.Graph {
    class GraphBase {
        private _nodes;
        private readonly _idToNodes;
        readonly size: number;
        nodes: GraphNode[];
        constructor(size: number);
        GetNodeAt(index: number): GraphNode;
        Foreach(loopFunc: (node: GraphNode) => void): void;
    }
}
declare namespace RC.Algorithm.Graph {
    class Graph2D extends GraphBase {
        private _row;
        private _col;
        readonly row: number;
        readonly col: number;
        constructor(row: number, col: number);
        GetNode(row: number, col: number): GraphNode | undefined;
        static CreateFullDigraph(row: number, col: number, rndFunc?: (index: number) => number): Graph2D;
        static CreateHVDigraph(row: number, col: number, rndFunc?: (index: number) => number): Graph2D;
        CoordToIndex(x: number, y: number): number;
        IndexToCoord(index: number): number[];
    }
}
declare namespace RC.Algorithm.Graph {
    class GraphEdge {
        private _from;
        private _to;
        private _cost;
        readonly from: number;
        readonly to: number;
        readonly cost: number;
        constructor(from: number, to: number, cost?: number);
        static Compare(a: GraphEdge, b: GraphEdge): number;
    }
}
declare namespace RC.Algorithm.Graph {
    class GraphNode {
        private _index;
        private readonly _edges;
        readonly index: number;
        readonly edges: GraphEdge[];
        constructor(index: number);
        AddEdge(from: number, to: number, cost: number): GraphEdge;
    }
}
declare namespace RC.Algorithm.Graph {
    class GraphSearcher {
        static MazeSearch(graph: GraphBase, start: number, maxStep: number, rndFunc: (min: number, max: number) => number): number[];
        static PrimSearch(graph: GraphBase, start: number): GraphEdge[];
        static AStarSearch(graph: GraphBase, start: number, end: number): number[];
    }
    class NumberPair {
        first: number;
        second: number;
        constructor(first: number, second: number);
        static NumberCompare(a: NumberPair, b: NumberPair): number;
    }
}
declare namespace RC.Collections {
    class Arrays {
        static indexOf<T>(array: T[], item: T, equalsFunction?: IEqualsFunction<T>): number;
        static lastIndexOf<T>(array: T[], item: T, equalsFunction?: IEqualsFunction<T>): number;
        static contains<T>(array: T[], item: T, equalsFunction?: IEqualsFunction<T>): boolean;
        static remove<T>(array: T[], item: T, equalsFunction?: IEqualsFunction<T>): boolean;
        static frequency<T>(array: T[], item: T, equalsFunction?: IEqualsFunction<T>): number;
        static equals<T>(array1: T[], array2: T[], equalsFunction?: IEqualsFunction<T>): boolean;
        static copy<T>(array: T[]): T[];
        static swap<T>(array: T[], i: number, j: number): boolean;
        static toString<T>(array: T[]): string;
        static forEach<T>(array: T[], callback: ILoopFunction<T>): void;
    }
}
declare namespace RC.Collections {
    class BSTreeKV<K, V extends K> {
        private root;
        private compare;
        private nElements;
        constructor(compareFunction?: ICompareFunction<K>);
        add(element: V): boolean;
        clear(): void;
        isEmpty(): boolean;
        size(): number;
        contains(element: K): boolean;
        search(element: K): V | null;
        remove(element: K): boolean;
        inorderTraversal(callback: ILoopFunction<V>): void;
        preorderTraversal(callback: ILoopFunction<V>): void;
        postorderTraversal(callback: ILoopFunction<V>): void;
        levelTraversal(callback: ILoopFunction<V>): void;
        minimum(): V | null;
        maximum(): V | null;
        forEach(callback: ILoopFunction<V>): void;
        toArray(): V[];
        height(): number;
        private searchNode;
        private transplant;
        private removeNode;
        private inorderTraversalAux;
        private levelTraversalAux;
        private preorderTraversalAux;
        private postorderTraversalAux;
        private minimumAux;
        private maximumAux;
        private heightAux;
        private insertNode;
        private createNode;
    }
    class BSTree<T> extends BSTreeKV<T, T> {
    }
}
declare namespace RC.Collections {
    class Bag<T> {
        private toStrF;
        private dictionary;
        private nElements;
        constructor(toStrFunction?: (item: T) => string);
        add(element: T, nCopies?: number): boolean;
        count(element: T): number;
        contains(element: T): boolean;
        remove(element: T, nCopies?: number): boolean;
        toArray(): T[];
        toSet(): Set<T>;
        forEach(callback: ILoopFunction<T>): void;
        size(): number;
        isEmpty(): boolean;
        clear(): void;
    }
}
declare namespace RC.Collections {
    interface IDictionaryPair<K, V> {
        key: K;
        value: V;
    }
    class Dictionary<K, V> {
        protected table: {
            [key: string]: IDictionaryPair<K, V>;
        };
        protected nElements: number;
        protected toStr: (key: K) => string;
        constructor(toStrFunction?: (key: K) => string);
        getValue(key: K): V | undefined;
        setValue(key: K, value: V): V | undefined;
        remove(key: K): V | undefined;
        keys(): K[];
        values(): V[];
        forEach(callback: (key: K, value: V) => any): void;
        containsKey(key: K): boolean;
        clear(): void;
        size(): number;
        isEmpty(): boolean;
        toString(): string;
    }
}
declare namespace RC.Collections {
    class FactoryDictionary<K, V> extends Dictionary<K, V> {
        protected defaultFactoryFunction: () => V;
        constructor(defaultFactoryFunction: () => V, toStrFunction?: (key: K) => string);
        setDefault(key: K, defaultValue: V): V;
        getValue(key: K): V;
    }
}
declare namespace RC.Collections {
    class Heap<T> {
        private data;
        private compare;
        constructor(compareFunction?: ICompareFunction<T>);
        private leftChildIndex;
        private rightChildIndex;
        private parentIndex;
        private minIndex;
        private siftUp;
        private siftDown;
        peek(): T | undefined;
        add(element: T): boolean;
        removeRoot(): T | undefined;
        contains(element: T): boolean;
        size(): number;
        isEmpty(): boolean;
        clear(): void;
        forEach(callback: ILoopFunction<T>): void;
        update(): void;
    }
}
declare namespace RC.Collections {
    class LinkedDictionary<K, V> extends Dictionary<K, V> {
        private head;
        private tail;
        constructor(toStrFunction?: (key: K) => string);
        private appendToTail;
        private getLinkedDictionaryPair;
        getValue(key: K): V | undefined;
        remove(key: K): V | undefined;
        clear(): void;
        private replace;
        setValue(key: K, value: V): V | undefined;
        keys(): K[];
        values(): V[];
        forEach(callback: (key: K, value: V) => any): void;
    }
}
declare namespace RC.Collections {
    interface ILinkedListNode<T> {
        element: T;
        next: ILinkedListNode<T> | null;
    }
    class LinkedList<T> {
        firstNode: ILinkedListNode<T> | null;
        private lastNode;
        private nElements;
        constructor();
        add(item: T, index?: number): boolean;
        first(): T | null;
        last(): T | null;
        elementAtIndex(index: number): T | null;
        indexOf(item: T, equalsFunction?: IEqualsFunction<T>): number;
        contains(item: T, equalsFunction?: IEqualsFunction<T>): boolean;
        remove(item: T, equalsFunction?: IEqualsFunction<T>): boolean;
        clear(): void;
        equals(other: any, equalsFunction?: IEqualsFunction<T>): boolean;
        private equalsAux;
        removeElementAtIndex(index: number): T | null;
        forEach(callback: ILoopFunction<T>): void;
        reverse(): void;
        toArray(): T[];
        size(): number;
        isEmpty(): boolean;
        toString(): string;
        private nodeAtIndex;
        private createNode;
    }
}
declare namespace RC.Collections {
    class MultiDictionary<K, V> {
        private dict;
        private equalsF;
        private allowDuplicate;
        constructor(toStrFunction?: (key: K) => string, valuesEqualsFunction?: IEqualsFunction<V>, allowDuplicateValues?: boolean);
        getValue(key: K): V[];
        setValue(key: K, value: V): boolean;
        remove(key: K, value?: V): boolean;
        keys(): K[];
        values(): V[];
        containsKey(key: K): boolean;
        clear(): void;
        size(): number;
        isEmpty(): boolean;
    }
}
declare namespace RC.Collections {
    interface IFlatTreeNode {
        id: string;
        level: number;
        hasParent: boolean;
        childrenCount: number;
    }
    class MultiRootTree {
        rootIds: string[];
        nodes: {
            [id: string]: string[];
        };
        constructor(rootIds?: string[], nodes?: {
            [id: string]: string[];
        });
        initRootIds(): void;
        initNodes(): void;
        createEmptyNodeIfNotExist(nodeKey: string): void;
        getRootIds(): string[];
        getNodes(): {
            [id: string]: string[];
        };
        getObject(): {
            rootIds: string[];
            nodes: {
                [id: string]: string[];
            };
        };
        toObject(): {
            rootIds: string[];
            nodes: {
                [id: string]: string[];
            };
        };
        flatten(): IFlatTreeNode[];
        moveIdBeforeId(moveId: string, beforeId: string): void;
        moveIdAfterId(moveId: string, afterId: string): void;
        moveIdIntoId(moveId: string, insideId: string, atStart?: boolean): void;
        swapRootIdWithRootId(rootId: string, withRootId: string): void;
        swapRootPositionWithRootPosition(swapRootPosition: number, withRootPosition: number): void;
        deleteId(id: string): void;
        insertIdBeforeId(beforeId: string, insertId: string): void;
        insertIdAfterId(belowId: string, insertId: string): void;
        insertIdIntoId(insideId: string, insertId: string): void;
        insertIdIntoRoot(id: string, position?: number): void;
        insertIdIntoNode(nodeKey: string, id: string, position?: number): void;
        private moveId;
        private swapArrayElements;
        private rootDeleteId;
        private nodeAndSubNodesDelete;
        private nodeRefrencesDelete;
        private nodeDelete;
        private findRootId;
        private findNodeId;
        private findNode;
        private nodeInsertAtStart;
        private nodeInsertAtEnd;
        private rootDelete;
        private nodeDeleteAtIndex;
        private rootInsertAtStart;
        private rootInsertAtEnd;
    }
}
declare namespace RC.Collections {
    class PriorityQueue<T> {
        private heap;
        constructor(compareFunction?: ICompareFunction<T>);
        enqueue(element: T): boolean;
        add(element: T): boolean;
        dequeue(): T | undefined;
        peek(): T | undefined;
        contains(element: T): boolean;
        isEmpty(): boolean;
        size(): number;
        clear(): void;
        forEach(callback: ILoopFunction<T>): void;
        update(): void;
    }
}
declare namespace RC.Collections {
    class Queue<T> {
        private list;
        constructor();
        enqueue(elem: T): boolean;
        add(elem: T): boolean;
        dequeue(): T | null;
        peek(): T | null;
        size(): number;
        contains(elem: T, equalsFunction?: IEqualsFunction<T>): boolean;
        isEmpty(): boolean;
        clear(): void;
        forEach(callback: ILoopFunction<T>): void;
    }
}
declare namespace RC.Collections {
    class Set<T> {
        protected dictionary: Dictionary<T, any>;
        constructor(toStringFunction?: (item: T) => string);
        contains(element: T): boolean;
        add(element: T): boolean;
        intersection(otherSet: Set<T>): void;
        union(otherSet: Set<T>): void;
        difference(otherSet: Set<T>): void;
        isSubsetOf(otherSet: Set<T>): boolean;
        remove(element: T): boolean;
        forEach(callback: ILoopFunction<T>): void;
        toArray(): T[];
        isEmpty(): boolean;
        size(): number;
        clear(): void;
        toString(): string;
    }
}
declare namespace RC.Collections {
    class Stack<T> {
        private list;
        constructor();
        push(elem: T): boolean;
        add(elem: T): boolean;
        pop(): T | null;
        peek(): T | null;
        size(): number;
        contains(elem: T, equalsFunction?: IEqualsFunction<T>): boolean;
        isEmpty(): boolean;
        clear(): void;
        forEach(callback: ILoopFunction<T>): void;
    }
}
declare namespace RC.Collections {
    const has: (obj: any, prop: any) => any;
    interface ICompareFunction<T> {
        (a: T, b: T): number;
    }
    interface IEqualsFunction<T> {
        (a: T, b: T): boolean;
    }
    interface ILoopFunction<T> {
        (a: T): boolean | void;
    }
    class Utils {
        static defaultCompare<T>(a: T, b: T): number;
        static defaultEquals<T>(a: T, b: T): boolean;
        static defaultToString(item: any): string;
        static makeString<T>(item: T, join?: string): string;
        static isFunction(func: any): boolean;
        static isUndefined(obj: any): obj is undefined;
        static isString(obj: any): boolean;
        static reverseCompareFunction<T>(compareFunction?: ICompareFunction<T>): ICompareFunction<T>;
        static compareToEquals<T>(compareFunction: ICompareFunction<T>): IEqualsFunction<T>;
    }
}
declare namespace RC.Crypto {
    class Md5 {
        static hashStr(str: string, raw?: boolean): string | Int32Array;
        static hashAsciiStr(str: string, raw?: boolean): string | Int32Array;
        private static stateIdentity;
        private static buffer32Identity;
        private static hexChars;
        private static hexOut;
        private static onePassHasher;
        private static _hex;
        private static _md5cycle;
        private _dataLength;
        private _bufferLength;
        private _state;
        private _buffer;
        private _buffer8;
        private _buffer32;
        constructor();
        start(): this;
        appendStr(str: string): this;
        appendAsciiStr(str: string): this;
        appendByteArray(input: Uint8Array): this;
        getState(): {
            buffer: any;
            buflen: number;
            length: number;
            state: number[];
        };
        setState(state: any): void;
        end(raw?: boolean): string | Int32Array;
    }
}
declare namespace RC.Numerics {
    enum Axis {
        X = 0,
        Y = 1,
        Z = 2
    }
    class Bounds {
        private _center;
        private _extents;
        center: Vec3;
        size: Vec3;
        extents: Vec3;
        min: Vec3;
        max: Vec3;
        constructor(center: Vec3, size: Vec3);
        Contains(ponumber: Vec3): boolean;
        ClosestPonumber(point: Vec3, outDistance: number[]): Vec3;
        SetMinMax(min: Vec3, max: Vec3): void;
        Encapsulate(point: Vec3): void;
        EncapsulateBounds(bounds: Bounds): void;
        Expand(amount: Vec3): void;
        Intersect(bounds: Bounds, boundsIntersect: Bounds[]): boolean;
        IntersectMovingBoundsByAxis(bounds: Bounds, d: number, axis: Axis, outT: number[]): boolean;
        IntersectMovingBounds(bounds: Bounds, d: Vec3): number;
        static Equals(b1: Bounds, b2: Bounds): boolean;
        EqualsTo(b: Bounds): boolean;
        ToString(): string;
    }
}
declare namespace RC.Numerics {
    class Line3 {
        point1: Vec3;
        point2: Vec3;
        constructor(point1?: Vec3, point2?: Vec3);
        Transform(matrix: Mat3): Line3;
        Length(): number;
        InersectPlane(planeNormal: Vec3, planeLocation: Vec3): Vec3;
        static InersectPlane(line: Line3, planeNormal: Vec3, planeLocation: Vec3): Vec3;
        Inersect(line: Line3): Line3;
        static Equals(l1: Line3, l2: Line3): boolean;
        EqualsTo(l: Line3): boolean;
    }
}
declare namespace RC.Numerics {
    class Mat2 {
        x: Vec2;
        y: Vec2;
        static readonly identity: Mat2;
        constructor(x?: Vec2, y?: Vec2);
        CopyFrom(m: Mat2): void;
        Clone(): Mat2;
        Add(p2: Mat2): Mat2;
        AddN(p2: number): Mat2;
        Sub(p2: Mat2): Mat2;
        SubN(p2: number): Mat2;
        SubN2(n: number): Mat2;
        Mul(m: Mat2): Mat2;
        Mul2(m: Mat2): Mat2;
        MulN(p2: number): Mat2;
        Div(p2: Mat2): Mat2;
        DivN(p2: number): Mat2;
        DivN2(n: number): Mat2;
        Identity(): void;
        Transform(v: Vec2): Vec2;
        Transpose(): Mat2;
        Determinant(): number;
        Invert(): Mat2;
        EqualsTo(m: Mat2): boolean;
        ToString(): string;
        static FromCross(xVector: Vec2): Mat2;
        static Abs(m: Mat2): Mat2;
        static Transpose(m: Mat2): Mat2;
        static Invert(m: Mat2): Mat2;
        static Add(m1: Mat2, m2: Mat2): Mat2;
        static AddN(m: Mat2, n: number): Mat2;
        static Sub(m1: Mat2, m2: Mat2): Mat2;
        static SubN(m: Mat2, n: number): Mat2;
        static SubN2(n: number, m: Mat2): Mat2;
        static Mul(m1: Mat2, m2: Mat2): Mat2;
        static MulN(m: Mat2, n: number): Mat2;
        static Div(m1: Mat2, m2: Mat2): Mat2;
        static DivN(m: Mat2, n: number): Mat2;
        static DivN2(n: number, m: Mat2): Mat2;
        static Equals(m1: Mat2, m2: Mat2): boolean;
    }
}
declare namespace RC.Numerics {
    class Mat3 {
        x: Vec3;
        y: Vec3;
        z: Vec3;
        static readonly identity: Mat3;
        constructor(x?: Vec3, y?: Vec3, z?: Vec3);
        CopyFrom(m: Mat3): void;
        Clone(): Mat3;
        Add(m: Mat3): Mat3;
        AddN(n: number): Mat3;
        Sub(m: Mat3): Mat3;
        SubN(n: number): Mat3;
        SubN2(n: number): Mat3;
        Mul(m: Mat3): Mat3;
        Mul2(m: Mat3): Mat3;
        MulN(n: number): Mat3;
        Div(m: Mat3): Mat3;
        DivN(n: number): Mat3;
        DivN2(n: number): Mat3;
        Transform(v: Vec3): Vec3;
        TransformPoint(v: Vec2): Vec2;
        TransformVector(v: Vec2): Vec2;
        Identity(): Mat3;
        Euler(): Vec3;
        Transpose(): Mat3;
        MultiplyTransposed(matrix: Mat3): Mat3;
        Determinant(): number;
        NonhomogeneousInvert(): Mat3;
        Invert(): Mat3;
        RotateAroundAxisX(angle: number): Mat3;
        RotateAroundAxisY(angle: number): Mat3;
        RotateAroundAxisZ(angle: number): Mat3;
        RotateAroundWorldAxisX(angle: number): Mat3;
        RotateAroundWorldAxisY(angle: number): Mat3;
        RotateAroundWorldAxisZ(angle: number): Mat3;
        RotateAround(angle: number, axis: Vec3): Mat3;
        EqualsTo(m: Mat3): boolean;
        ToString(): string;
        static FromScale(scale: Vec3): Mat3;
        static FromOuterProduct(vector1: Vec3, vector2: Vec3): Mat3;
        static FromEuler(euler: Vec3): Mat3;
        static FromQuaternion(quaternion: Quat): Mat3;
        static FromRotationAxis(angle: number, axis: Vec3): Mat3;
        static LookAt(forward: Vec3, up: Vec3): Mat3;
        static FromCross(vector: Vec3): Mat3;
        static NonhomogeneousInvert(m: Mat3): Mat3;
        static Invert(m: Mat3): Mat3;
        static Transpose(m: Mat3): Mat3;
        static Abs(m: Mat3): Mat3;
        static Add(m1: Mat3, m2: Mat3): Mat3;
        static AddN(m1: Mat3, n: number): Mat3;
        static Sub(m1: Mat3, m2: Mat3): Mat3;
        static SubN(m1: Mat3, n: number): Mat3;
        static SubN2(n: number, p: Mat3): Mat3;
        static Mul(m1: Mat3, m2: Mat3): Mat3;
        static Mul2(m1: Mat3, m2: Mat3): Mat3;
        static MulN(m: Mat3, n: number): Mat3;
        static Div(m1: Mat3, m2: Mat3): Mat3;
        static DivN(m: Mat3, n: number): Mat3;
        static DivN2(n: number, m: Mat3): Mat3;
        static Equals(m1: Mat3, m2: Mat3): boolean;
    }
}
declare namespace RC.Numerics {
    class Mat4 {
        x: Vec4;
        y: Vec4;
        z: Vec4;
        w: Vec4;
        static readonly identity: Mat4;
        constructor(x?: Vec4, y?: Vec4, z?: Vec4, w?: Vec4);
        CopyFrom(m: Mat4): void;
        Clone(): Mat4;
        Add(m: Mat4): Mat4;
        AddN(m: number): Mat4;
        Sub(m: Mat4): Mat4;
        SubN(m: number): Mat4;
        SubN2(n: number): Mat4;
        Mul(m: Mat4): Mat4;
        Mul2(m: Mat4): Mat4;
        MulN(m: number): Mat4;
        Div(m: Mat4): Mat4;
        DivN(m: number): Mat4;
        DivN2(n: number): Mat4;
        Transform(v: Vec4): Vec4;
        TransformPoint(v: Vec3): Vec3;
        TransformVector(v: Vec3): Vec3;
        Identity(): Mat4;
        SetTranslate(translate: Vec3): Mat4;
        SetScale(scale: Vec3): Mat4;
        SetRotation(quaternion: Quat): Mat4;
        Transpose(): Mat4;
        Determinant(): number;
        NonhomogeneousInvert(): Mat4;
        Invert(): Mat4;
        EqualsTo(m: Mat4): boolean;
        ToString(): string;
        static FromScale(scale: Vec3): Mat4;
        static FromEuler(euler: Vec3): Mat4;
        static FromQuaternion(quaternion: Quat): Mat4;
        static FromRotationAxis(angle: number, axis: Vec3): Mat4;
        static FromTRS(pos: Vec3, q: Quat, scale: Vec3): Mat4;
        static NonhomogeneousInvert(m: Mat4): Mat4;
        static Invert(m: Mat4): Mat4;
        static Transpose(m: Mat4): Mat4;
        static Equals(m1: Mat4, m2: Mat4): boolean;
        static Abs(m: Mat4): Mat4;
        static Add(m1: Mat4, m2: Mat4): Mat4;
        static AddN(m1: Mat4, n: number): Mat4;
        static Sub(m1: Mat4, m2: Mat4): Mat4;
        static SubN(m1: Mat4, n: number): Mat4;
        static SubN2(n: number, p: Mat4): Mat4;
        static Mul(m1: Mat4, m2: Mat4): Mat4;
        static Mul2(m1: Mat4, m2: Mat4): Mat4;
        static MulN(m: Mat4, n: number): Mat4;
        static Div(m1: Mat4, m2: Mat4): Mat4;
        static DivN(m: Mat4, n: number): Mat4;
        static DivN2(n: number, m: Mat4): Mat4;
        static View(position: Vec3, lookAt: Vec3, upVector: Vec3): Mat4;
        static Perspective(fov: number, aspect: number, near: number, far: number): Mat4;
        static Frustum(left: number, right: number, bottom: number, top: number, near: number, far: number): Mat4;
        static Orthographic(left: number, right: number, bottom: number, top: number, near: number, far: number): Mat4;
        static OrthographicCentered(left: number, right: number, bottom: number, top: number, near: number, far: number): Mat4;
    }
}
declare namespace RC.Numerics {
    class MathUtils {
        static readonly EPSILON: number;
        static readonly MAX_VALUE: number;
        static readonly MIN_VALUE: number;
        static readonly PI: number;
        static readonly PI2: number;
        static readonly PI4: number;
        static readonly PI_HALF: number;
        static readonly PI_QUARTER: number;
        static readonly PI_DELTA: number;
        static readonly PI_HALF_DELTA: number;
        static readonly PI_QUARTER_DELTA: number;
        static readonly DEG_TO_RAD: number;
        static readonly RAD_TO_DEG: number;
        static readonly INFINITY: number;
        static readonly NEGATIVE_INFINITY: number;
        static Random(min: number, max: number): number;
        static RandomFloor(min: number, max: number): number;
        static RandomRound(min: number, max: number): number;
        static RandomCeil(min: number, max: number): number;
        static Sin(f: number): number;
        static Cos(f: number): number;
        static Tan(f: number): number;
        static Asin(f: number): number;
        static Acos(f: number): number;
        static Atan(f: number): number;
        static Atan2(y: number, x: number): number;
        static Sqrt(f: number): number;
        static Abs(f: number): number;
        static Min(a: number, b: number): number;
        static Min2(...values: number[]): number;
        static Max(a: number, b: number): number;
        static Max2(...values: number[]): number;
        static Pow(f: number, p: number): number;
        static Exp(power: number): number;
        static Log(f: number): number;
        static Ceil(f: number): number;
        static Floor(f: number): number;
        static Round(f: number): number;
        static Sign(f: number): number;
        static Clamp(value: number, min: number, max: number): number;
        static Clamp01(value: number): number;
        static Lerp(a: number, b: number, t: number): number;
        static LerpUnclamped(a: number, b: number, t: number): number;
        static LerpAngle(a: number, b: number, t: number): number;
        static MoveTowards(current: number, target: number, maxDelta: number): number;
        static MoveTowardsAngle(current: number, target: number, maxDelta: number): number;
        static FromToDirection(from: Vec3, to: Vec3, t: number, forward: Vec3): Vec3;
        static SmoothStep(from: number, to: number, t: number): number;
        static Gamma(value: number, absmax: number, gamma: number): number;
        static Approximately(a: number, b: number): boolean;
        static SmoothDamp(current: number, target: number, currentVelocity: number[], smoothTime: number, maxSpeed: number, deltaTime: number): number;
        static SmoothDampAngle(current: number, target: number, currentVelocity: number[], smoothTime: number, maxSpeed: number, deltaTime: number): number;
        static Repeat(t: number, length: number): number;
        static PingPong(t: number, length: number): number;
        static InverseLerp(a: number, b: number, value: number): number;
        static DeltaAngle(current: number, target: number): number;
        static LineIntersection(p1: Vec2, p2: Vec2, p3: Vec2, p4: Vec2, result: Vec2[]): boolean;
        static LineSegmentIntersection(p1: Vec2, p2: Vec2, p3: Vec2, p4: Vec2, result: Vec2[]): boolean;
        static DegToRad(deg: number): number;
        static RadToDeg(rad: number): number;
        static LinearToGammaSpace(value: number): number;
        static GammaToLinearSpace(value: number): number;
        static RubberDelta(overStretching: number, viewSize: number): number;
    }
}
declare namespace RC.Numerics {
    class Quat {
        x: number;
        y: number;
        z: number;
        w: number;
        static readonly identity: Quat;
        xyz: Vec3;
        eulerAngles: Vec3;
        readonly length: number;
        readonly lengthSquared: number;
        constructor(x?: number, y?: number, z?: number, w?: number);
        Clone(): Quat;
        CopyFrom(q: Quat): void;
        Set(newX: number, newY: number, newZ: number, newW: number): void;
        Normalize(): void;
        static Normalize(q: Quat): Quat;
        static Dot(a: Quat, b: Quat): number;
        Transform(v: Vec3): Vec3;
        static AngleAxis(angle: number, axis: Vec3): Quat;
        ToAngleAxis(): any[];
        static FromToRotation(from: Vec3, to: Vec3): Quat;
        static Orthogonal(v: Vec3): Vec3;
        static LookRotation(forward: Vec3, upwards: Vec3): Quat;
        SetLookRotation(view: Vec3, up: Vec3): void;
        Conjugate(): Quat;
        static Slerp(a: Quat, b: Quat, t: number): Quat;
        static SlerpUnclamped(a: Quat, b: Quat, t: number): Quat;
        static Lerp(q1: Quat, q2: Quat, t: number): Quat;
        static LerpUnclamped(q1: Quat, q2: Quat, t: number): Quat;
        static RotateTowards(from: Quat, to: Quat, maxDegreesDelta: number): Quat;
        static Invert(rotation: Quat): Quat;
        ToString(): string;
        static Angle(a: Quat, b: Quat): number;
        static Euler(euler: Vec3): Quat;
        private static ToEulerRad;
        private static NormalizeAngles;
        private static NormalizeAngle;
        private static FromEulerRad;
        private static ToAxisAngleRad;
        static Equals(q1: Quat, q2: Quat): boolean;
        EqualsTo(q: Quat): boolean;
        static Mul(lhs: Quat, rhs: Quat): Quat;
    }
}
declare namespace RC.Numerics {
    class Rect {
        private _xMin;
        private _yMin;
        private _width;
        private _height;
        static readonly zero: Rect;
        x: number;
        y: number;
        position: Vec2;
        center: Vec2;
        min: Vec2;
        max: Vec2;
        width: number;
        height: number;
        size: Vec2;
        xMin: number;
        yMin: number;
        xMax: number;
        yMax: number;
        constructor(x?: number, y?: number, width?: number, height?: number);
        CopyFrom(source: Rect): void;
        Clone(): Rect;
        static MinMaxRect(xmin: number, ymin: number, xmax: number, ymax: number): Rect;
        Set(x: number, y: number, width: number, height: number): void;
        Contains(point: Vec2, allowInverse?: boolean): boolean;
        private static OrderMinMax;
        Overlaps(other: Rect, allowInverse?: boolean): boolean;
        static NormalizedToPoint(rectangle: Rect, normalizedRectCoordinates: Vec2): Vec2;
        static PointToNormalized(rectangle: Rect, point: Vec2): Vec2;
    }
}
declare namespace RC.Numerics {
    class Vec2 {
        x: number;
        y: number;
        static readonly one: Vec2;
        static readonly minusOne: Vec2;
        static readonly zero: Vec2;
        static readonly right: Vec2;
        static readonly left: Vec2;
        static readonly up: Vec2;
        static readonly down: Vec2;
        static readonly positiveInfinityVector: Vec2;
        static readonly negativeInfinityVector: Vec2;
        constructor(x?: number, y?: number);
        Set(x: number, y: number): void;
        Clone(): Vec2;
        CopyFrom(v: Vec2): void;
        Clamp(min: Vec2, max: Vec2): Vec2;
        Add(v: Vec2): Vec2;
        AddN(n: number): Vec2;
        Sub(v: Vec2): Vec2;
        SubN(n: number): Vec2;
        SubN2(n: number): Vec2;
        Mul(v: Vec2): Vec2;
        MulN(n: number): Vec2;
        Div(v: Vec2): Vec2;
        DivN(n: number): Vec2;
        DivN2(n: number): Vec2;
        Negate(): Vec2;
        Scale(scale: Vec2): void;
        Dot(vector: Vec2): number;
        Normalize(): void;
        NormalizeSafe(): void;
        ClampMagnitude(maxLength: number): void;
        Magnitude(): number;
        SqrMagnitude(): number;
        Distance(vector: Vec2): number;
        DistanceSquared(vector: Vec2): number;
        AproxEqualsBox(vector: Vec2, tolerance: number): boolean;
        ApproxEquals(vector: Vec2, tolerance: number): boolean;
        Angle(vector: Vec2): number;
        Rotate(angle: number): Vec2;
        EqualsTo(v: Vec2): boolean;
        ToString(): string;
        static Add(v1: Vec2, v2: Vec2): Vec2;
        static AddN(v: Vec2, n: number): Vec2;
        static Sub(v1: Vec2, v2: Vec2): Vec2;
        static SubN(v: Vec2, n: number): Vec2;
        static SubN2(n: number, v: Vec2): Vec2;
        static Mul(v1: Vec2, v2: Vec2): Vec2;
        static MulN(v: Vec2, n: number): Vec2;
        static Div(v1: Vec2, v2: Vec2): Vec2;
        static DivN(v: Vec2, n: number): Vec2;
        static DivN2(n: number, v: Vec2): Vec2;
        static Negate(v: Vec2): Vec2;
        static Normalize(v: Vec2): Vec2;
        static NormalizeSafe(v: Vec2): Vec2;
        static Dot(v0: Vec2, v1: Vec2): number;
        static Distance(v0: Vec2, v1: Vec2): number;
        static DistanceSquared(v0: Vec2, v1: Vec2): number;
        static ClampMagnitude(v: Vec2, maxLength: number): Vec2;
        static LerpUnclamped(from: Vec2, to: Vec2, t: number): Vec2;
        static Lerp(from: Vec2, to: Vec2, t: number): Vec2;
        static SlopeXy(v: Vec2): number;
        static SlopeYx(v: Vec2): number;
        static DegToRad(v: Vec2): Vec2;
        static RadToDeg(v: Vec2): Vec2;
        static Abs(v: Vec2): Vec2;
        static Pow(v: Vec2, value: number): Vec2;
        static Floor(v: Vec2): Vec2;
        static Round(v: Vec2): Vec2;
        static Equals(v1: Vec2, v2: Vec2): boolean;
    }
}
declare namespace RC.Numerics {
    class Vec3 {
        x: number;
        y: number;
        z: number;
        static readonly OVER_SQRT2: number;
        static readonly one: Vec3;
        static readonly minusOne: Vec3;
        static readonly zero: Vec3;
        static readonly right: Vec3;
        static readonly left: Vec3;
        static readonly up: Vec3;
        static readonly down: Vec3;
        static readonly forward: Vec3;
        static readonly backward: Vec3;
        static readonly positiveInfinityVector: Vec3;
        static readonly negativeInfinityVector: Vec3;
        constructor(x?: number, y?: number, z?: number);
        Clone(): Vec3;
        CopyFrom(v: Vec3): void;
        Set(x: number, y: number, z: number): void;
        Clamp(min: Vec3, max: Vec3): Vec3;
        Add(v: Vec3): Vec3;
        AddN(n: number): Vec3;
        Sub(v: Vec3): Vec3;
        SubN(n: number): Vec3;
        SubN2(n: number): Vec3;
        Negate(): Vec3;
        Mul(v: Vec3): Vec3;
        MulN(n: number): Vec3;
        Div(v: Vec3): Vec3;
        DivN(n: number): Vec3;
        DivN2(n: number): Vec3;
        ClampMagnitude(maxLength: number): void;
        Magnitude(): number;
        SqrMagnitude(): number;
        Distance(vector: Vec3): number;
        DistanceSquared(vector: Vec3): number;
        Scale(scale: Vec3): void;
        Dot(v: Vec3): number;
        Cross(v: Vec3): Vec3;
        Normalize(): void;
        NormalizeSafe(): void;
        AproxEqualsBox(vector: Vec3, tolerance: number): boolean;
        ApproxEquals(vector: Vec3, tolerance: number): boolean;
        RotateAround(angle: number, axis: Vec3): Vec3;
        IntersectsTriangle(p0: Vec3, p1: Vec3, p2: Vec3): boolean;
        Reflect(planeNormal: Vec3): Vec3;
        Refract(normal: Vec3, refractionIndex: number): Vec3;
        InersectNormal(normal: Vec3): Vec3;
        InersectRay(rayOrigin: Vec3, rayDirection: Vec3): Vec3;
        InersectLine(line: Line3): Vec3;
        InersectPlane(planeNormal: Vec3, planeLocation: Vec3): Vec3;
        EqualsTo(v: Vec3): boolean;
        ToString(): string;
        static Add(v1: Vec3, v2: Vec3): Vec3;
        static AddN(v: Vec3, n: number): Vec3;
        static Sub(v1: Vec3, v2: Vec3): Vec3;
        static SubN(v: Vec3, n: number): Vec3;
        static SubN2(n: number, v: Vec3): Vec3;
        static Mul(v1: Vec3, v2: Vec3): Vec3;
        static MulN(v: Vec3, n: number): Vec3;
        static Div(v1: Vec3, v2: Vec3): Vec3;
        static DivN(v: Vec3, n: number): Vec3;
        static DivN2(n: number, v: Vec3): Vec3;
        static Negate(v: Vec3): Vec3;
        static Equals(v1: Vec3, v2: Vec3): boolean;
        static Distance(v0: Vec3, v1: Vec3): number;
        static DistanceSquared(v0: Vec3, v1: Vec3): number;
        static Angle(from: Vec3, to: Vec3): number;
        static ClampMagnitude(v: Vec3, maxLength: number): Vec3;
        static Normalize(v: Vec3): Vec3;
        static NormalizeSafe(v: Vec3): Vec3;
        static Dot(v0: Vec3, v1: Vec3): number;
        static Cross(v0: Vec3, v1: Vec3): Vec3;
        static OrthoNormalVector(v: Vec3): Vec3;
        static SlerpUnclamped(from: Vec3, to: Vec3, t: number): Vec3;
        static Slerp(from: Vec3, to: Vec3, t: number): Vec3;
        static LerpUnclamped(from: Vec3, to: Vec3, t: number): Vec3;
        static Lerp(from: Vec3, to: Vec3, t: number): Vec3;
        static SmoothDamp(current: Vec3, target: Vec3, currentVelocity: Vec3[], smoothTime: number, maxSpeed: number, deltaTime: number): Vec3;
        static MoveTowards(current: Vec3, target: Vec3, maxDistanceDelta: number): Vec3;
        private static ClampedMove;
        static RotateTowards(current: Vec3, target: Vec3, maxRadiansDelta: number, maxMagnitudeDelta: number): Vec3;
        static OrthoNormalize(va: Vec3[], vb: Vec3[], vc: Vec3[]): void;
        static Project(vector: Vec3, onNormal: Vec3): Vec3;
        static ProjectOnPlane(vector: Vec3, planeNormal: Vec3): Vec3;
        static Reflect(inDirection: Vec3, inNormal: Vec3): Vec3;
        static Hermite(value1: Vec3, tangent1: Vec3, value2: Vec3, tangent2: Vec3, t: number): Vec3;
        static DegToRad(v: Vec3): Vec3;
        static RadToDeg(v: Vec3): Vec3;
        static MaxN(v: Vec3, value: number): Vec3;
        static Max(v: Vec3, v1: Vec3): Vec3;
        static MinN(v: Vec3, v1: number): Vec3;
        static Min(v: Vec3, v1: Vec3): Vec3;
        static Abs(v: Vec3): Vec3;
        static Pow(v: Vec3, value: number): Vec3;
        static Floor(v: Vec3): Vec3;
        static Round(v: Vec3): Vec3;
    }
}
declare namespace RC.Numerics {
    class Vec4 {
        x: number;
        y: number;
        z: number;
        w: number;
        static readonly one: Vec4;
        static readonly minusOne: Vec4;
        static readonly zero: Vec4;
        static readonly right: Vec4;
        static readonly left: Vec4;
        static readonly up: Vec4;
        static readonly down: Vec4;
        static readonly forward: Vec4;
        static readonly height: Vec4;
        static readonly low: Vec4;
        static readonly backward: Vec4;
        static readonly positiveInfinityVector: Vec4;
        static readonly negativeInfinityVector: Vec4;
        constructor(x?: number, y?: number, z?: number, w?: number);
        Clone(): Vec4;
        CopyFrom(v: Vec4): void;
        Set(x: number, y: number, z: number, w: number): void;
        Clamp(min: Vec4, max: Vec4): Vec4;
        Add(v: Vec4): Vec4;
        AddN(n: number): Vec4;
        Sub(v: Vec4): Vec4;
        SubN(n: number): Vec4;
        SubN2(n: number): Vec4;
        Mul(v: Vec4): Vec4;
        MulN(n: number): Vec4;
        Div(v: Vec4): Vec4;
        DivN(n: number): Vec4;
        DivN2(n: number): Vec4;
        Negate(): Vec4;
        ClampMagnitude(maxLength: number): void;
        Magnitude(): number;
        SqrMagnitude(): number;
        Distance(vector: Vec4): number;
        DistanceSquared(vector: Vec4): number;
        Scale(scale: Vec4): void;
        Dot(vector: Vec4): number;
        Normalize(): void;
        NormalizeSafe(): void;
        AproxEqualsBox(vector: Vec4, tolerance: number): boolean;
        ApproxEquals(vector: Vec4, tolerance: number): boolean;
        EqualsTo(v: Vec4): boolean;
        ToString(): string;
        static Add(v1: Vec4, v2: Vec4): Vec4;
        static AddN(v: Vec4, n: number): Vec4;
        static Sub(v1: Vec4, v2: Vec4): Vec4;
        static SubN(v: Vec4, n: number): Vec4;
        static SubN2(n: number, v: Vec4): Vec4;
        static Mul(v1: Vec4, v2: Vec4): Vec4;
        static MulN(v: Vec4, n: number): Vec4;
        static Div(v1: Vec4, v2: Vec4): Vec4;
        static DivN(v: Vec4, n: number): Vec4;
        static DivN2(n: number, v: Vec4): Vec4;
        static Equals(v1: Vec4, v2: Vec4): boolean;
        static Distance(v0: Vec4, v1: Vec4): number;
        static DistanceSquared(v0: Vec4, v1: Vec4): number;
        static ClampMagnitude(v: Vec4, maxLength: number): Vec4;
        static Normalize(v: Vec4): Vec4;
        static NormalizeSafe(v: Vec4): Vec4;
        static LerpUnclamped(from: Vec4, to: Vec4, t: number): Vec4;
        static Lerp(from: Vec4, to: Vec4, t: number): Vec4;
        static Abs(v: Vec4): Vec4;
        static Pow(v: Vec4, power: number): Vec4;
        static Floor(v: Vec4): Vec4;
        static Round(v: Vec4): Vec4;
    }
}
declare namespace RC.Utils {
    class ConsistentRandom {
        private seed;
        constructor(seed: number);
        private Next;
        NextInt(min: number, max: number): number;
        NextDouble(): number;
        Pick(collection: any[]): any;
    }
}
declare namespace RC.Utils {
    enum GuidFormat {
        BRACES = 1,
        DASHES = 2
    }
    class GUID {
        static readonly empty: GUID;
        private readonly data1;
        private readonly data2;
        private readonly data3;
        private readonly data4;
        constructor();
        constructor(val: string);
        constructor(val: GUID);
        constructor(val1: Uint8Array, val2: Uint8Array, val3: Uint8Array, val4: Uint8Array);
        private CopyCtor;
        private ParseImpl;
        ToString(format?: GuidFormat): string;
        static Parse(value: string): GUID;
        static Generate(seed?: number): GUID;
        private static ToStringHexUint8;
        private static StringToUint8;
        private static Convolution;
    }
}
declare namespace RC.Utils {
    class Hashtable {
        static Concat(map: {
            [k: string]: any;
        }, map2: {
            [k: string]: any;
        }): void;
        static GetArray(map: {
            [k: string]: any;
        }, key: string): any[];
        static GetMap(map: {
            [k: string]: any;
        }, key: string): {
            [k: string]: any;
        };
        static GetString(map: {
            [k: string]: any;
        }, key: string): string;
        static GetNumber(map: {
            [k: string]: any;
        }, key: string): number;
        static GetBool(map: {
            [k: string]: any;
        }, key: string): boolean;
        static GetStringArray(map: {
            [k: string]: any;
        }, key: string): string[];
        static GetNumberArray(map: {
            [k: string]: any;
        }, key: string): number[];
        static GetBoolArray(map: {
            [k: string]: any;
        }, key: string): boolean[];
        static GetVec2Array(map: {
            [k: string]: any;
        }, key: string): RC.Numerics.Vec2[] | null;
        static GetVec3Array(map: {
            [k: string]: any;
        }, key: string): RC.Numerics.Vec3[] | null;
        static GetVec4Array(map: {
            [k: string]: any;
        }, key: string): RC.Numerics.Vec4[] | null;
        static GetVec2(map: {
            [k: string]: any;
        }, key: string): RC.Numerics.Vec2 | null;
        static GetVec3(map: {
            [k: string]: any;
        }, key: string): RC.Numerics.Vec3 | null;
        static GetVec4(map: {
            [k: string]: any;
        }, key: string): RC.Numerics.Vec4 | null;
    }
}
declare namespace RC {
    class Logger {
        static Log(message: any): void;
        static Warn(message: any): void;
        static Error(message: any): void;
        static Info(message: any): void;
        static Debug(message: any): void;
        static Trace(message: any): void;
        static Assert(condition: boolean, message: string): void;
        static Exception(message: string): void;
    }
}
declare namespace RC.Utils {
    class Timer {
        static readonly utcTime: number;
        static ToLocalTimeString(utc: number): string;
    }
}
