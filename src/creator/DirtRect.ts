import { IRect } from './shapes/Rectangle';

export default class DirtRect {
    private minX: number;
    private maxX: number;
    private minY: number;
    private maxY: number;
    private rect: IRect;

    constructor() {
        this.clear();
    }

    public set(width: number, height: number) {
        this.rect = {
            width, height,
            x: 0, y: 0
        };
        this.dirtAll();
    }
    
    public dirtAll() {
        this.add(this.rect);
    }

    public add(params: IRect) {
        this.minX = Math.min(this.minX, params.x | 0);
        this.minY = Math.min(this.minY, params.y | 0);
        this.maxX = Math.max(this.maxX, params.x + params.width | 0);
        this.maxY = Math.max(this.maxY, params.y + params.height | 0);
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
        this.minX = Math.max(this.minX, this.rect.x);
        this.minY = Math.max(this.minY, this.rect.y);
        this.maxX = Math.min(this.maxX, this.rect.x + this.rect.width);
        this.maxY = Math.min(this.maxY, this.rect.y + this.rect.height);
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