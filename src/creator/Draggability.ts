import { IShape } from './shapes/Shape';
import EventEmitter from './utils/EventEmitter';
import Point from './utils/Point';
import CanvasDragger from './CanvasDragger';

export default class Draggability extends EventEmitter<any> {

    private active: IShape;
    private mousePosition: Point;

    constructor(
        canvas: HTMLCanvasElement,
        private getInstance: (p: Point) => IShape
    ) {
        super();
        var canvasDragger = new CanvasDragger(canvas);
        canvasDragger.on('dragstart', this.onDragStart.bind(this));
        canvasDragger.on('dragging', this.onDragging.bind(this));
        canvasDragger.on('drop', this.onDrop.bind(this));
    }

    public getAvtive() {
        return this.active;
    }

    public setActive(active: IShape) {
        this.active = active;
    }

    private onDragStart(point: Point, e: MouseEvent) {
        this.active = this.getInstance(point);
        this.mousePosition = point;

        if (!this.active)
            return;

        if (this.isSpecialKeyPressed(e))
            this.active.emit('dragstart', point)
        else {
            this.active.emit('click');
            this.active.emit('mouseDown');
            this.emit('dirt', this.active.getBoundingRect());
        }
    }

    private onDragging(point: Point, e: MouseEvent) {
        if (!this.active || !this.active.draggable)
            return;

        this.active.emit('mouseMove')

        if (this.isSpecialKeyPressed(e))
            this.active.emit('dragging', point);
        else {
            this.emit('dirt', this.active.getBoundingRect());
            this.active.moveBy(point.getSubtract(this.mousePosition));
            this.emit('dirt', this.active.getBoundingRect());
            this.mousePosition = point;
        }
    }

    private onDrop(point: Point, e: MouseEvent) {
        if (!this.active)
            return;

        if (this.isSpecialKeyPressed(e))
            this.active.emit('drop', point)
        else {
            this.active.emit('mouseUp');
            this.active = null;
        }
    }

    private isSpecialKeyPressed(e: MouseEvent): boolean {
        return e.which == 3;
    }
}
