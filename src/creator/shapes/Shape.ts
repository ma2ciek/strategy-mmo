import { extend } from '../utils/util';
import { IPoint } from '../utils/Point';
import { IRect } from './Rectangle';
import EventEmitter from '../utils/EventEmitter';
import { CURSOR_DEFAULT } from '../config';

export interface IShapeOptions {
    x: number;
    y: number;
    draggable?: boolean; 
    cursor?: string;
    selectable?: boolean;    
}

const defaultTrue = (x: any) => typeof x == 'boolean' ? x : true;

export interface IShape extends EventEmitter<any>, IShapeOptions {
    type: string;
    x: number;
    y: number;
    draggable: boolean;
    cursor: string;
    selectable: boolean;
    
    moveBy(p: IPoint): void;
    getBoundingRect(): IRect;
    containsRect(rect: IRect): boolean;
    contains(p: IPoint): boolean;
    draw(ctx: CanvasRenderingContext2D): void;
}

export class Shape extends EventEmitter<any> {
    public x: number;
    public y: number;
    public draggable: boolean;
    public cursor: string;
    public selectable: boolean;

    constructor(options: IShapeOptions) {
        super();
        this.x = options.x;
        this.y = options.y;
        this.draggable = !!options.draggable; // Default is false.
        this.selectable = defaultTrue(options.selectable) 
        this.cursor = options.cursor || CURSOR_DEFAULT;        
    }

    public moveBy(p: IPoint) {
        this.x += p.x;
        this.y += p.y;
    }
}

export default Shape;