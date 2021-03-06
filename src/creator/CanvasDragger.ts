import EventEmitter from './utils/EventEmitter';
import Point from './utils/Point';

interface IMouseCallbacks {
    [name: string]: IMouseCallback
}

interface IMouseCallback {
    (e: MouseEvent): void;
}

export default class CanvasDragger extends EventEmitter<any> {
    private mouseDown = false;
    private eventListeners: IMouseCallbacks = {
        mousedown: this.onDragStart,
        mouseup: this.onDrop,
        mousemove: this.onDragging,
        mouseout: this.onDrop,
        contextmenu: this.preventDefault,
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

    private onDrop(e: MouseEvent) {
        if (this.mouseDown)
            this.emit('drop', this.getPoint(e), e);
        this.mouseDown = false;
    }

    private onDragging(e: MouseEvent) {
        if (this.mouseDown)
            this.emit('dragging', this.getPoint(e), e);
    }

    private onDragStart(e: MouseEvent) {
        this.mouseDown = true;
        this.emit('dragstart', this.getPoint(e), e);
    }

    private preventDefault(e: MouseEvent) {
        e.preventDefault();
    }
    
    private getPoint(e: MouseEvent) {
        var rect = this.container.getBoundingClientRect();
        return new Point(e.clientX - rect.left, e.clientY - rect.top);
    }
}
