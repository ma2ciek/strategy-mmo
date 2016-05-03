import { extend } from '../utils/util';
import { IPoint } from '../utils/Point';
import { IRect } from './Rectangle';
import EventEmitter from '../utils/EventEmitter';

export interface IShapeOptions {
    x: number;
    y: number;
    draggable?: boolean;
}

export interface IShape extends EventEmitter, IShapeOptions {
    moveBy(p: IPoint): void;
    getBoundingRect(): IRect;
    containsRect(rect: IRect): boolean;
    contains(p: IPoint): boolean;
    draw(ctx: CanvasRenderingContext2D): void;
}

export class Shape extends EventEmitter {
    public x: number;
    public y: number;
    public draggable: boolean;

    constructor(options: IShapeOptions) {
        super();
        this.x = options.x;
        this.y = options.y;
        this.draggable = true;
    }

    public moveBy(p: IPoint) {
        this.x += p.x;
        this.y += p.y;
    }
}

export default Shape;