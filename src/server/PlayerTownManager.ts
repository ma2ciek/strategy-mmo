import * as _ from 'lodash';
import Manager from '../shared/Manager';
import { Town, ITownObject, IResources } from '../shared/Town';
import GameMap from './GameMap';
import { IPoint, Point }from '../shared/Point';
import { ITileData } from '../shared/Tile';
import * as transfer from '../shared/ITransfer';
import { resources } from '../shared/ResourceManager';

export class PlayerTownManager extends Manager<Town> {
    constructor(private map: GameMap, private playerId: string) {
        super();
    }

    public createTown(point: Point) {
        const town = new Town({
            position: point,
            ownerId: this.playerId,
            range: 10,
            resources: {
                wood: 100,
                stone: 50,
                iron: 20
            }
        });

        const income = this.getIncome(town);
        town.setIncome(income);
        this.list.push(town)
        this.map.getTile(point).setTown(town)
    }

    private getIncome(town: Town): IResources {
        let res = this.getVisibleTownArea(town)
            .map(point => this.map.getTile(point))
            .map(tile => resources[tile.res].name)

        return {
            wood: res.filter(name => name == 'wood').length / 10,
            iron: res.filter(name => name == 'iron').length / 10,
            stone: res.filter(name => name == 'stone').length / 10,
        }
    }

    public getVisibleArea() {
        const visibleArea: IPoint[] = [];

        for (let town of this.list)
            visibleArea.push(...this.getVisibleTownArea(town));

        const uniquePoints = (<IPoint[]>((<any>_).uniqWith)(visibleArea));
        const tiles: transfer.ITileNumberDict = {};
        for (var point of uniquePoints) {
            tiles[this.map.toId(point)] = this.map.getTile(point).toObject();
        }

        return tiles;
    }

    private getVisibleTownArea(town: Town) {
        const visibleArea: IPoint[] = [];
        const m = this.map;
        const range = town.getRange();
        const position = town.getPosition();

        for (let x = m.normalizeX(position.x - range); x <= m.normalizeX(position.x + range); x++) {
            for (let y = m.normalizeY(position.y - range); y <= m.normalizeY(position.y + range); y++) {
                if ((x - position.x) * (x - position.x) + (y - position.y) * (y - position.y) < range * range) {
                    visibleArea.push({ x, y });
                }
            }
        }
        return visibleArea;
    }

    public toObjects() {
        return this.list.map(town => town.toObject());
    }
}

export default PlayerTownManager;
