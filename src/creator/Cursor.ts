import MouseEventHandler from './MouseEventHandler';
import { IPoint } from './utils/Point';
import { CURSOR_DEFAULT, CURSOR_DRAGGING } from './config';
import { IShape } from './shapes/Shape';
import { IFinder } from './World';

export default class Cursor {
    private meh: MouseEventHandler;

    constructor(private canvas: HTMLCanvasElement, private getCanvasObjectFromPosition: IFinder) {
        this.meh = new MouseEventHandler(canvas);
        this.addEventListeners();
    }

    private addEventListeners() {
        this.meh.on('mouseMove', (position: IPoint) => this.updateCursor(position));
        this.meh.on('mouseUp', (position: IPoint) => this.updateCursor(position));        
        this.meh.on('mouseOut', () => this.restoreCursor());
        this.meh.on('dragging', () => this.setDraggingCursor());
    }

    private updateCursor(position: IPoint) {
        const elem = this.getCanvasObjectFromPosition(position);
        this.canvas.style.cursor = (elem) ? elem.cursor : CURSOR_DEFAULT;
    }
    
    private restoreCursor() {
        this.canvas.style.cursor = CURSOR_DEFAULT;
    }
    
    private setDraggingCursor() {
        this.canvas.style.cursor = CURSOR_DRAGGING;
    }
}