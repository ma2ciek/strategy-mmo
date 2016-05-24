import EventEmitter from './utils/EventEmitter';
import Point from './utils/Point';

interface IMouseCallbacks {
    [name: string]: IMouseCallback
}

interface IMouseCallback {
    (e: MouseEvent): void;
}

export default class MouseEventHandler extends EventEmitter<any> {

    private isMouseDown = false;
    private eventListeners: IMouseCallbacks = {
        mousedown: this.onMouseDown,
        mouseup: this.onMouseUp,
        mousemove: this.onMouseMove,
        mouseout: this.onMouseOut,
    };

    constructor(private container: HTMLCanvasElement) {
        super();
        this.addEventListeners();
    }

    private addEventListeners() {
        const ael = this.container.addEventListener;
        for (var eventName in this.eventListeners) {
            const handler = this.eventListeners[eventName];
            ael(eventName, e => handler.call(this, e));
        }
    }

    private onMouseDown(e: MouseEvent) {
        this.isMouseDown = true;
        this.emit('mouseDown', this.getPoint(e), e);
    }

    private onMouseOut(e: MouseEvent) {
        this.isMouseDown = false;
        this.emit('mouseOut', this.getPoint(e), e);
    }

    private onMouseMove(e: MouseEvent) {
        this.isMouseDown ?
            this.emit('dragging', this.getPoint(e), e) :
            this.emit('mouseMove', this.getPoint(e), e);
    }

    private onMouseUp(e: MouseEvent) {
        this.isMouseDown = false;
        this.emit('mouseUp', this.getPoint(e), e);
    }

    private getPoint(e: MouseEvent) {
        var rect = this.container.getBoundingClientRect();
        return new Point(e.clientX - rect.left, e.clientY - rect.top);
    }
}
