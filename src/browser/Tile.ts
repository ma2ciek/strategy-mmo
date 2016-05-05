import Image from '../creator/shapes/Image';

export interface IDictionary {
    [name: string]: string;
}

export const TILE_SIZE = 64;
export const IMAGES: IDictionary = {
    wood: '/images/forest.jpg',
    stone: '/images/stone.jpg',
    iron: '/images/iron.png'
};

export interface ITileConfig {
    left: number;
    top: number;
    type: string;
}

export class Tile extends Image {
    constructor(config: ITileConfig) {
        super({
            width: TILE_SIZE,
            height: TILE_SIZE,
            x: config.left * TILE_SIZE,
            y: config.top * TILE_SIZE,
            src: IMAGES[config.type]
        })
    }
}

export default Tile;