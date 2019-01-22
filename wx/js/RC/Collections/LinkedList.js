import * as util from './Util';
import * as arrays from './Arrays';
export default class LinkedList {
    constructor() {
        this.firstNode = null;
        this.lastNode = null;
        this.nElements = 0;
    }
    add(item, index) {
        if (util.isUndefined(index)) {
            index = this.nElements;
        }
        if (index < 0 || index > this.nElements || util.isUndefined(item)) {
            return false;
        }
        const newNode = this.createNode(item);
        if (this.nElements === 0) {
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
        return undefined;
    }
    last() {
        if (this.lastNode !== null) {
            return this.lastNode.element;
        }
        return undefined;
    }
    elementAtIndex(index) {
        const node = this.nodeAtIndex(index);
        if (node === null) {
            return undefined;
        }
        return node.element;
    }
    indexOf(item, equalsFunction) {
        const equalsF = equalsFunction || util.defaultEquals;
        if (util.isUndefined(item)) {
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
        const equalsF = equalsFunction || util.defaultEquals;
        if (this.nElements < 1 || util.isUndefined(item)) {
            return false;
        }
        let previous = null;
        let currentNode = this.firstNode;
        while (currentNode !== null) {
            if (equalsF(currentNode.element, item)) {
                if (currentNode === this.firstNode) {
                    this.firstNode = this.firstNode.next;
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
        const eqF = equalsFunction || util.defaultEquals;
        if (!(other instanceof LinkedList)) {
            return false;
        }
        if (this.size() !== other.size()) {
            return false;
        }
        return this.equalsAux(this.firstNode, other.firstNode, eqF);
    }
    equalsAux(n1, n2, eqF) {
        while (n1 !== null) {
            if (!eqF(n1.element, n2.element)) {
                return false;
            }
            n1 = n1.next;
            n2 = n2.next;
        }
        return true;
    }
    removeElementAtIndex(index) {
        if (index < 0 || index >= this.nElements) {
            return undefined;
        }
        let element;
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
            if (previous !== null) {
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
        let temp = null;
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
        return arrays.toString(this.toArray());
    }
    nodeAtIndex(index) {
        if (index < 0 || index >= this.nElements) {
            return null;
        }
        if (index === (this.nElements - 1)) {
            return this.lastNode;
        }
        let node = this.firstNode;
        for (let i = 0; i < index; i++) {
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
