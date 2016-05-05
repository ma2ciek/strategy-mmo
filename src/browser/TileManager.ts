import World from '../creator/World';
import { Tile, TILE_SIZE } from './Tile';
import * as transfer from '../shared/ITransfer';
import { resources } from '../shared/ResourceManager';
import Point from '../shared/Point';

export class TileManager {
    private world: World;
    private mapWidth: number;
    private mapHeight: number;
    private center: Point;

    constructor(canvas: HTMLCanvasElement) {
        this.world = new World(canvas, {
            centralized: true
        });
    }

    public setDimensions(dimensions: transfer.IMapData) {
        this.mapWidth = dimensions.width;
        this.mapHeight = dimensions.height;
    }

    public setTilesFromData(data: transfer.IDict) {
        for (let index in data) {
            const tile = data[index];
            const resource = resources[tile.res].name;
            const x = +index % this.mapWidth;
            const y = +index / this.mapWidth | 0;

            this.world.add(new Tile({
                left: x,
                top: y,
                type: resource
            }))
        }
    }
    
    public setCenterTile(p: Point) {
        this.center = Point.multiply(p, TILE_SIZE);
        this.world.zoomToPoint(this.center, 1);
    }
}

export default TileManager;