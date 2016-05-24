import { IPoint, Point } from './utils/Point';
import Emitter from './utils/Emitter';
import { IWorldConfig } from './World';

export default class CanvasPosition {
    public positionEmitter = new Emitter<IPoint>();
    public dimensionEmitter = new Emitter<number>();
    private position = new Point(0, 0);

    constructor(
        private canvas: HTMLCanvasElement,
        private config: IWorldConfig
    ) {
        this.setCanvasDimensions(config);
    }

    private setCanvasDimensions(config: IWorldConfig) {
        if (config.autoResize) {
            this.fixCanvasSize();
            window.addEventListener('resize', () => this.fixCanvasSize());
        } else {
            this.canvas.width = config.width;
            this.canvas.height = config.height;
        }
    }

    public canvasToWorld(p: IPoint): IPoint {
        return {
            x: p.x + this.position.x,
            y: p.y + this.position.y
        };
    }

    public worldToCanvas(p: IPoint): IPoint {
        return {
            x: p.x - this.position.x,
            y: p.y - this.position.y
        };
    }

    public moveToPoint(p: IPoint) {
        this.position.set({
            x: p.x - this.canvas.width / 2,
            y: p.y - this.canvas.height / 2
        });
        this.positionEmitter.emit(this.position);
    }

    public moveBy(vector: IPoint) {
        this.position.add(vector);
        this.positionEmitter.emit(this.position);
    }

    public get() {
        return this.position;
    }

    private fixCanvasSize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.dimensionEmitter.emit(window.innerWidth, window.innerHeight);
    }
}
