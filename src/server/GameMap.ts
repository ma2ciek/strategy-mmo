import { Point, IPoint } from '../shared/Point';
import resources from '../shared/ResourceManager';
import * as utils from '../shared/utils';
import * as winston from 'winston';
import Tile from '../shared/Tile';

export class GameMap {
    private width = 1000;
    private height = 1000;
    private map: Tile[];

    constructor() {
        this.map = new Array(this.width * this.height);
    }

    public getTile(p: IPoint) {
        p = Point.fromFloored(p);
        this.assert(p);
        return this.map[p.y * this.width + p.x] ||
            (this.map[p.y * this.width + p.x] = Tile.fromRandom());
    }

    public getSurroundingArea(p: Point) {
        const p2 = Point.fromFloored(p);
        const minX = Math.max(0, p2.x - 1);
        const maxX = Math.min(this.width, p2.x + 1);
        const minY = Math.max(0, p2.y - 1);
        const maxY = Math.min(this.height, p2.y + 1);
        // TODO
    }

    private assert(p: IPoint) {
        if (p.x >= this.width && p.x < 0 &&
            p.y >= this.height && p.y < 0) {
            winston.info('bad point: ' + JSON.stringify(p));
        }
    }

    public normalize(p: IPoint) {
        p = Point.fromFloored(p);
        p.x = utils.normalize(p.x, 0, this.width);
        p.y = utils.normalize(p.y, 0, this.height);
        return p;
    }

    public normalizeX(x: number) {
        return utils.normalize(x, 0, this.width);
    }

    public normalizeY(y: number) {
        return utils.normalize(y, 0, this.height);
    }

    public randomPoint() {
        return new Point(Math.random() * this.width | 0, Math.random() * this.height | 0);
    }

    public toId(p: IPoint) {
        return p.y * this.width + p.x;
    }

    public getData() {
        return {
            width: this.width,
            height: this.height
        };
    }
}

export default GameMap;
