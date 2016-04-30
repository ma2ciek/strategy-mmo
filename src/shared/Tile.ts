import resourceManager from './ResourceManager';
import Town from './Town';

export interface ITileData {
    res: number;
    town: number | boolean;
}

export interface ITile {
    res: number;
}

export class Tile implements ITile {
    public res: number;
    public town: Town;

    constructor(res: number) {
        this.res = res;
    }

    public static fromRandom() {
        return new Tile(resourceManager.getCodeOfRandom())
    }

    public setTown(town: Town) {
        this.town = town;
    }

    public toObject() {
        return {
            res: this.res,
            town: this.town && this.town.getId()
        }
    }
}

export default Tile;
