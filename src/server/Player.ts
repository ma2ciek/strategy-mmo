import GameMap from './GameMap';
import PlayerTownManager from './PlayerTownManager';
import { IPoint } from '../shared/Point';
import { ITile } from '../shared/Tile';
import Town from '../shared/Town';
import * as transfer from '../shared/ITransfer';

export class Player {
    private townManager: PlayerTownManager;

    constructor(private map: GameMap, id: string) {
        this.townManager = new PlayerTownManager(map, id);

        this.townManager.createTown(map.randomPoint());
        this.townManager.createTown(map.randomPoint());
        this.townManager.createTown(map.randomPoint());
        this.townManager.createTown(map.randomPoint());
    }

    public getData(): transfer.IClientData {
        return {
            visibleArea: this.townManager.getVisibleArea(),
            towns: this.townManager.toObjects()
        }
    }

    public getTowns() {
        return this.townManager.getAll();
    }
}

export default Player;
