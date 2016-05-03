interface IHandlers {
    [name: string]: ICallback[];
}

export interface ICallback {
    (...fns: any[]): void;
}

export default class EventEmitter {
    private __handlers: IHandlers = {};

    public on(eventName: string, fn: ICallback) {
        this.__handlers[eventName] ?
            this.__handlers[eventName].push(fn) :
            this.__handlers[eventName] = [fn];
    }

    public emit(eventName: string, ...data: any[]) {
        if (this.__handlers[eventName])
            this.__handlers[eventName].forEach(e => e(...data));
    }
}