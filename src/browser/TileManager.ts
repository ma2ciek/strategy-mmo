import World from '../creator/World';
import { Tile, TILE_SIZE } from './Tile';
import * as transfer from '../shared/ITransfer';
import { IPoint, Point } from '../shared/Point';
import { EventEmitter } from '@angular/core';

export class TileManager {
    private world: World;
    private mapWidth: number;
    private mapHeight: number;
    public townSelectionEmitter = new EventEmitter<number>();

    public setCanvas(canvas: HTMLCanvasElement) {
        this.world = new World(canvas, {
            centralized: true,
            autoResize: true,
            mapMove: true
        });

        this.world.on('click', (obj: Tile) =>
            obj.containsTown() && this.townSelectionEmitter.emit(<number>obj.townId));
    }

    public setDimensions(dimensions: transfer.IMapData) {
        this.mapWidth = dimensions.width;
        this.mapHeight = dimensions.height;
    }

    public setTilesFromData(data: transfer.IDict) {
        for (let index in data) {
            const tile = data[index];
            const resourceId = tile.res;
            const x = +index % this.mapWidth;
            const y = +index / this.mapWidth | 0;

            this.world.add(new Tile({
                left: x,
                top: y,
                resourceId: resourceId,
                townId: tile.town
            }));
        }
    }

    public setCenterTile(p: IPoint) {
        this.world.canvasPosition.moveToPoint(new Point(
            (p.x + 1 / 2) * TILE_SIZE,
            (p.y + 1 / 2) * TILE_SIZE
        ));
    }

    public moveBy(vector: IPoint) {
        this.world.canvasPosition.moveBy(vector);
    }
}

export default TileManager;