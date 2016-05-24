import { IRect } from './shapes/Rectangle';
import { IPoint } from './utils/Point';

export default class DirtRect {
    private minX: number;
    private maxX: number;
    private minY: number;
    private maxY: number;
    private view: IRect = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    };

    constructor() {
        this.clear();
    }

    public updateDimensions(width: number, height: number) {
        this.view.width = width;
        this.view.height = height;
        this.dirtAll();
    }
    
    public updatePosition(p: IPoint) {
        this.view.x = p.x;
        this.view.y = p.y;
    }
    
    public dirtAll() {
        this.add(this.view);
    }

    public add(rect: IRect) {
        this.minX = Math.min(this.minX, rect.x);
        this.minY = Math.min(this.minY, rect.y);
        this.maxX = Math.max(this.maxX, rect.x + rect.width);
        this.maxY = Math.max(this.maxY, rect.y + rect.height);
    }

    public clear() {
        this.minX = Infinity;
        this.minY = Infinity;
        this.maxX = -Infinity;
        this.maxY = -Infinity;
    }

    public get(): IRect {
        this.normalizeValues();
        return this.createRect();
    }

    private normalizeValues() {
        this.minX = Math.max(this.minX, this.view.x);
        this.minY = Math.max(this.minY, this.view.y);
        this.maxX = Math.min(this.maxX, this.view.x + this.view.width);
        this.maxY = Math.min(this.maxY, this.view.y + this.view.height);
    }

    private createRect() {
        return {
            x: this.minX,
            y: this.minY,
            width: this.maxX - this.minX,
            height: this.maxY - this.minY
        };
    }
}
