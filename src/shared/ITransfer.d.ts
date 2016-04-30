import { ITownObject } from './Town';
import { ITileData } from './Tile';

export interface ITileNumberDict {
    [name: number]: ITileData;
}

export interface IDict {
    [id: number]: ITileData;
}

export interface IClientData {
    visibleArea: IDict;
    towns: ITownObject[];
}

export interface IMapData {
    width: number;
    height: number;
}