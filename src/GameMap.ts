import { Point, IPoint } from './Point';

export class Tile {}

export class GameMap {
    private width = 1000;
    private height = 1000;
    private map: Tile[] = new Array(this.width * this.height);

    public getFromPoint(p: IPoint) {
        const p2 = Point.toIntegers(p);

        return this.assert(p) ?
            this.getTile(p) :
            new Error('wrong point');
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
