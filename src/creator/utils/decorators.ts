export function seal(target: any, key: string, descriptor: PropertyDescriptor) {
    descriptor.configurable = false;
    return descriptor;
}

export function readonly(target: any, key: string, descriptor: PropertyDescriptor) {
    descriptor.writable = false;
    return descriptor;
}

export function log(target: any, key: string, descriptor: PropertyDescriptor) {
    return {
        value: function (...args: any[]) {
            console.log(target.constructor.name + '::' + key);
            for (let arg of args)
                console.log(arg);
            descriptor.value.apply(this, args);
        }
    }
}
