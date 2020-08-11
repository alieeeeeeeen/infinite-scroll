

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


export {
    Node
}