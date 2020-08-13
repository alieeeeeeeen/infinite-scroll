// node add children remove children

class Node {
    data: any;
    children: any[]
    constructor(data: any) {
        this.data = data;
        this.children = [];
    }

    add(data: any) {
        this.children.push(new Node(data))
    }

    remove(data: any) {
        this.children = this.children.filter(node => node !== data);
    }
}

class Tree {
    root: any;
    constructor() {
        this.root = null;
    }

    traverseBF(fn: Function) {
        const arr = [this.root];
        while(arr.length) {
            const node = arr.shift();
            arr.push(...node.children);
            fn(node);
        }
    }

    traverseDF(fn: Function) {
        const arr = [this.root];
        while(arr.length) {
            const node = arr.shift();
            arr.unshift(...node.children);
            fn(node);
        }
    }
}


class BinaryNode {
    data: any;
    left: any;
    right: any;
    constructor(data: any) {
        this.data = data;
        this.left = null;
        this.right = null;
    }

    insert(data: any) {
        if(data < this.data && this.left) {
            this.left.insert(data);
        } else if(data < this.data && !this.left) {
            this.left = new Node(data);
        } else if(data > this.data && this.right) {
            this.right.insert(data);
        } else if(data > this.data && !this.right) {
            this.right = new Node(data);
        }
    }

    contains(data: any) {
        if(this.data === data) {
            return data;
        } else if(this.data < data && this.right) {
            return this.right.contains(data);
        } else if(this.data > data && this.left) {
            return this.left.contains(data);
        }
        return null;
    }
}


class Event {
    events: any;
    constructor() {
        this.events = {}
    }

    on(eventName: any, callback: Function) {
        if(this.events[eventName]) {
            this.events[eventName].push(callback);
        } else {
            this.events[eventName] = [callback];
        }
    }

    trigger(evnetName: any) {
        if(this.events[evnetName]) {
            for(let cb of this.events[evnetName]) {
                cb();
            }
        }
    }

    off(evnetName: any) {
        delete this.events[evnetName];
    }
}

export {
    Node,
    Tree,
    BinaryNode,
    Event
}