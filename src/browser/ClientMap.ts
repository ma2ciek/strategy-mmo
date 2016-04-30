import { IMapData } from '../shared/ITransfer';
import { ITownObject } from '../shared/Town';

export class ClientMap {
    width: number;
    height: number;

    constructor(data: IMapData) {
        this.width = data.width;
        this.height = data.height;
    }

    public draw(ctx: CanvasRenderingContext2D) {

    }
}

export default ClientMap;