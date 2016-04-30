import * as _ from 'lodash';
import Manager from '../shared/Manager';
import { Town, ITownObject } from '../shared/Town';
import GameMap from './GameMap';
import { IPoint, Point }from '../shared/Point';
import { ITileData } from '../shared/Tile';
import * as transfer from '../shared/ITransfer';

export class PlayerTownManager extends Manager<Town> {
    constructor(private map: GameMap, private playerId: string) {
        super();
    }

    public createTown(point: Point) {
        const town = new Town({
            position: point,
            ownerId: this.playerId
        });
        this.list.push(town)
        this.map.getTile(point).setTown(town)
    }

    public getVisibleArea() {
        const visibleArea: IPoint[] = [];

        for (let town of this.list) {
            const m = this.map;
            const range = town.getRange();
            const position = town.getPosition();

            for (let x = m.normalizeX(position.x - range); x < m.normalizeX(position.x + range); x++) {
                for (let y = m.normalizeY(position.y - range); y < m.normalizeY(position.y + range); y++) {
                    if ((x - position.x) * (x - position.x) + (y - position.y) * (y - position.y) < range * range) {
                        visibleArea.push({ x, y });
                    }
                }
            }
        }
        const uniquePoints = (<IPoint[]>_.uniqWith(visibleArea));
        const tiles: transfer.ITileNumberDict = {};
        for (var point of uniquePoints) {
            tiles[this.map.toId(point)] = this.map.getTile(point).toObject();
        }

        return tiles;
    }

    public toObjects() {
        var arr: ITownObject[] = [];
        for (let town of this.list) {
            arr.push(town.toObject());
        }
        return arr;
    }
}

export default PlayerTownManager;
