
export function Log(target: any, propertyName: string | Symbol) {
    console.log(target, propertyName);
}

export function Log2(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
    console.log(target, name, descriptor);
}

export function Logger(title: string) {
    return function(constructor: Function) {
        console.log(title);
    }
}

export function template(template: string, id: string) {
    return function<T extends {new (...args: any[]): {title: string}}>(
        originalConstructor: T) {
        return class extends originalConstructor {
            constructor(...args: any[]) {
                super()
                const hookEl = document.getElementById(id);
                if(hookEl) {
                    hookEl.innerHTML = template;
                    hookEl.querySelector('h1')!.textContent = this.title;
                }
            }
        }
    }
}

@Logger('template')
class Product {
    @Log
    title: string;
    private _price: number;

    constructor(title: string, p: number) {
        this.title = title;
        this._price = p;
    }

    @Log2
    set price(val: number) {
        if(val > 0) this._price = val;
        else throw new Error('number is not valid');
    }
}

export {
    Product
}