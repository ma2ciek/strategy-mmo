import EventEmitter from './utils/EventEmitter';
import { IShape } from './shapes/Shape';

export default class LayerManager {
    private layers: IShape[] = [];

    public add(object: IShape, position?: number) {
        typeof position == 'undefined' ?
            this.layers.push(object) :
            this.layers.splice(position, 0, object);
    }
    // todo: not working?
    public bringObjectForward(object: IShape) {
        const index = this.layers.indexOf(object);
        this.layers.splice(index, 1);
        this.layers.push(object);
    }

    public each(fn: Function) {
        const len = this.layers.length;
        for (let i = 0; i < len; i++)
            fn(this.layers[i], i, this.layers);
    }

    public backwardEach(fn: Function) {
        let i = this.layers.length;
        while (i--)
            fn(this.layers[i], i, this.layers);
    }
}
