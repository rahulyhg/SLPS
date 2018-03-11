export class EnumSymbol {
    sym = Symbol.for(this.name);

    constructor(name, {value, description}) {
        this.name = name;
        if(!Object.is(value, undefined)) this.value  = value;
        if(description) this.description  = description;

        Object.freeze(this);
    }

    get display() {
        return this.description || Symbol.keyFor(this.sym);
    }

    toString() {
        return this.sym;
    }

    valueOf() {
        return this.value;
    }
}

export class Enum {
    constructor(enumLiterals) {
        for (let key in enumLiterals) {
            if(!enumLiterals[key]) throw new TypeError('each enum should have been initialized with atleast empty {} value');
            this[key] =  new EnumSymbol(key, enumLiterals[key]);
        }
        Object.freeze(this);
    }

    // symbols() {
    //     return [for (key of Object.keys(this)) this[key] ];
    // }

    keys() {
        return Object.keys(this);
    }

    contains(sym) {
        if (!(sym instanceof EnumSymbol)) return false;
        return this[Symbol.keyFor(sym.sym)] === sym;
    }
}