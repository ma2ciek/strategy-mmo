import DirtyRect from './DirtyRect';
import { IShape } from './shapes/Shape';
import Draggability from './Draggability';
import { Point, IPoint } from './utils/Point';
import LayerManager from './LayerManager';
import EventEmitter from './utils/EventEmitter';
import Cursor from './Cursor';
import MapMove from './MapMove';
import CanvasPosition from './CanvasPosition';

export interface IWorldConfig {
    centralized?: boolean;
    autoResize?: boolean;
    mapMove?: boolean;
    width?: number;
    height?: number;
}

export interface IFinder {
    (point: IPoint): IShape;
}

const eventNames = ['click', 'mouseDown', 'mouseUp', 'mouseMove'];

export default class World extends EventEmitter<any> {
    public canvasPosition: CanvasPosition;

    private ctx: CanvasRenderingContext2D;
    private dirtyRect: DirtyRect;
    private layerManager: LayerManager;
    private draggability: Draggability;
    private mapMove: MapMove;
    private cursor: Cursor;

    constructor(
        private canvas: HTMLCanvasElement,
        private config: IWorldConfig = {}
    ) {
        super();
        this.ctx = canvas.getContext('2d');
        this.initializeModules(canvas, config);
        this.draw();
    }

    private initializeModules(canvas: HTMLCanvasElement, config: IWorldConfig) {
        const finder: IFinder = this.getObject.bind(this);

        this.dirtyRect = new DirtyRect();
        this.layerManager = new LayerManager();
        this.cursor = new Cursor(canvas, finder);

        this.draggability = new Draggability(canvas, finder);
        this.draggability.on('dirt', rect => this.dirtyRect.add(rect));

        if (config.mapMove) {
            this.mapMove = new MapMove(canvas, finder);
            this.mapMove.onMoveEmitter.subscribe((change: IPoint) => {
                this.canvasPosition.moveBy(change);
            });
        }

        this.canvasPosition = new CanvasPosition(canvas, config);
        this.canvasPosition.positionEmitter.subscribe((newPosition: IPoint) => {
            this.dirtyRect.updatePosition(newPosition);
            this.renderAll();
        });
        this.canvasPosition.dimensionEmitter.subscribe((width: number, height: number) =>
            this.dirtyRect.updateDimensions(width, height));
    }

    public add(object: IShape, position?: number) {
        this.layerManager.add(object, position);
        object.on('dirt', () => this.dirtyRect.add(object.getBoundingRect()))
        this.dirtyRect.add(object.getBoundingRect());

        eventNames.forEach(eventName =>
            object.on(eventName, () => {
                this.emit(eventName, object)
                this.emit(object.type + ':' + eventName, object);
            })
        );
    }

    public renderAll() {
        this.dirtyRect.dirtAll();
    }

    private draw() {
        const rect = this.dirtyRect.get();
        const pos = this.canvasPosition.get();

        this.ctx.save();
        this.ctx.translate(-pos.x, -pos.y);
        this.ctx.beginPath();
        this.ctx.rect(rect.x, rect.y, rect.width, rect.height);
        this.ctx.clip();
        this.ctx.clearRect(rect.x, rect.y, rect.width, rect.height);

        this.layerManager
            .each((i: IShape) => i.containsRect(rect) && i.draw(this.ctx));

        this.ctx.restore();
        this.dirtyRect.clear();

        window.requestAnimationFrame(() => this.draw());
    }

    private getObject(p: IPoint): IShape {
        let result: IShape = null;
        let transformed = this.canvasPosition.canvasToWorld(p);
        this.layerManager.each((object: IShape) => {
            if (object.contains(transformed)) {
                result = object;
                return;
            }
        });
        return result;
    }
}
