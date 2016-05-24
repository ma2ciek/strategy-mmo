import Image from '../creator/shapes/Image';
import { IShape } from '../creator/shapes/Shape';
import { resources } from '../shared/ResourceManager';

export interface IMapResource {
    [name: string]: string;
    wood: string;
    iron: string;
    town: string;
    stone: string;
}

export const TILE_SIZE = 64;
export const IMAGES: IMapResource = {
    wood: '/images/forest.jpg',
    stone: '/images/stone.jpg',
    iron: '/images/iron.png',
    town: '/images/castle.png'
};

export interface ITileConfig {
    left: number;
    top: number;
    resourceId: number;
    townId: number | boolean;
}

const isNumber = (x: any) => typeof x == 'number';

export class Tile extends Image implements IShape {
    public type = 'tile';
    public townId: number | boolean;

    private resourceId: number;

    constructor(config: ITileConfig) {
        super({
            width: TILE_SIZE,
            height: TILE_SIZE,
            x: config.left * TILE_SIZE,
            y: config.top * TILE_SIZE,
            src: IMAGES[isNumber(config.townId) ? 'town' : resources[config.resourceId].name],
            cursor: isNumber(config.townId) ? 'pointer': null
        });
        this.townId = config.townId;
        this.resourceId = config.resourceId;
    }

    public getResourceName() {
        return resources[this.resourceId].name;
    }

    public containsTown() {
        return isNumber(this.townId);
    }
}

export default Tile;