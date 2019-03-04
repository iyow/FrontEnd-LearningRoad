export default class Observer {
    constructor() {
        this.events = new Map()
    }
    on(key, ...handle) {
        if (key === undefined || handle.length === 0) {
            console.error('two params:at least 1 key 1 handle');
            return false
        }

        !this.events.has(key) && this.events.set(key, [])
        this.events.get(key).push(...handle)
        return this
    }
    off(key, fn) {
        if (key === undefined || typeof fn !== 'function') {
            console.error('params error');
            return false
        }
        let index = this.events.get(key).indexOf(fn)
        if (index >= 0) {
            this.events.get(key).splice(index, 1)
        }
    }
    emit(key, ...params) {
        if (!this.events.has(key)) {
            console.error(`cannot found ${key}`);
            return false
        }
        this.events.get(key).forEach(func => {
            func.apply(this, params)
            // func.call(this,...params)
            // func.bind(this,...params)()
        });
        return this
    }
    clear(key) {
        if (key !== undefined && !this.events.has(key)) {
            console.error(`Cannot found ${key} in ${this.constructor.name}`);
            return false
        }
        return key ? this.events.delete(key) : this.events.clear()
    }
}

