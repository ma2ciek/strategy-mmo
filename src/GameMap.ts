import { Point, IPoint } from './Point';
import resources from './ResourceManager';

export interface ITile {
    res: resources;
}

export class Tile implements ITile {
    public res: resources;
}

export class GameMap {
    private width = 1000;
    private height = 1000;
    private map: ITile[] = new Array(this.width * this.height);

    public get(p: IPoint) {
        const p2 = Point.toIntegers(p);

        return this.assert(p2) ?
            this.getTile(p2) :
            new Error('wrong point');
    }

    public getSurroundingArea(p: Point) {
        const p2 = Point.toIntegers(p);
        const minX = Math.max(0, p2.x - 1);
        const maxX = Math.min(this.width, p2.x + 1);
        const minY = Math.max(0, p2.y - 1);
        const maxY = Math.min(this.height, p2.y + 1);
    }

    private getTile(p: IPoint) {
        return this.map[p.y * this.width + p.x];
    }

    private assert(p: IPoint) {
        return p.x < this.width && p.x >= 0 &&
            p.y < this.height && p.y >= 0;
    }
}

export default GameMap;
