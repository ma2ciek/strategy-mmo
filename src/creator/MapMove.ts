import MouseEventHandler from './MouseEventHandler';
import { Point, IPoint } from './utils/Point';
import { IShape } from './shapes/Shape';
import { IFinder } from './World';
import Emitter from './utils/Emitter';

export default class MapMove {
    public onMoveEmitter = new Emitter<IPoint>();
    
    private meh: MouseEventHandler;
    private object: IShape;
    private lastPoint: Point;
    
    constructor(private canvas: HTMLCanvasElement, private getCanvasObjectFromPosition: IFinder) {
        this.meh = new MouseEventHandler(canvas);
        this.addEventListeners();
    }
    
    private addEventListeners() {
        this.meh.on('mouseDown', (point: Point) => {
            this.object = this.getCanvasObjectFromPosition(point);
            this.lastPoint = point;
        })
        
        this.meh.on('dragging', (point: Point) => {
            if(!this.object || !this.object.draggable) {
                this.onMoveEmitter.emit(this.lastPoint.getSubtract(point));
                this.lastPoint = point;
            }
        });
        
        this.meh.on('mouseUp', () => {
            this.lastPoint = null;
        });
        
        this.meh.on('mouseOut', () => {
            this.lastPoint = null;
        });
    }
}