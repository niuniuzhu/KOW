import * as util from './util';
import Queue from './Queue';
export default class BSTree {
    constructor(compareFunction) {
        this.root = null;
        this.compare = compareFunction || util.defaultCompare;
        this.nElements = 0;
    }
    add(element) {
        if (util.isUndefined(element)) {
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
        if (util.isUndefined(element)) {
            return false;
        }
        return this.searchNode(this.root, element) !== null;
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
        if (this.isEmpty()) {
            return undefined;
        }
        return this.minimumAux(this.root).element;
    }
    maximum() {
        if (this.isEmpty()) {
            return undefined;
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
        let cmp = null;
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
        const queue = new Queue();
        if (node !== null) {
            queue.enqueue(node);
        }
        while (!queue.isEmpty()) {
            node = queue.dequeue();
            if (callback(node.element) === false) {
                return;
            }
            if (node.leftCh !== null) {
                queue.enqueue(node.leftCh);
            }
            if (node.rightCh !== null) {
                queue.enqueue(node.rightCh);
            }
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
        while (node.leftCh !== null) {
            node = node.leftCh;
        }
        return node;
    }
    maximumAux(node) {
        while (node.rightCh !== null) {
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
        let parent = null;
        let position = this.root;
        let cmp = null;
        while (position !== null) {
            cmp = this.compare(node.element, position.element);
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
