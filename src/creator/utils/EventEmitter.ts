export interface IHandlers<T> {
    [name: string]: ICallback<T>[];
}

export interface ICallback<T> {
    (...args: T[]): void;
}

export default class EventEmitter<T> {
    private __handlers: IHandlers<T> = {};

    public on(eventName: string, fn: ICallback<T>) {
        this.__handlers[eventName] ?
            this.__handlers[eventName].push(fn) :
            this.__handlers[eventName] = [fn];
    }

    public emit(eventName: string, ...data: T[]) {
        if (this.__handlers[eventName])
            this.__handlers[eventName].forEach(e => e(...data));
    }
}