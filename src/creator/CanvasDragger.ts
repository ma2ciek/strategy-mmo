import EventEmitter from './utils/EventEmitter';
import Point from './utils/Point';

interface IMouseCallbacks {
    [name: string]: IMouseCallback
}

interface IMouseCallback {
    (e: MouseEvent): void;
}

export default class CanvasDragger extends EventEmitter {
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
            this.emit('drop', new Point(e.clientX, e.clientY), e);
        this.mouseDown = false;
    }

    private onDragging(e: MouseEvent) {
        if (this.mouseDown)
            this.emit('dragging', new Point(e.clientX, e.clientY), e);
    }

    private onDragStart(e: MouseEvent) {
        this.mouseDown = true;
        this.emit('dragstart', new Point(e.clientX, e.clientY), e);
    }

    private preventDefault(e: MouseEvent) {
        e.preventDefault();
    }
}
