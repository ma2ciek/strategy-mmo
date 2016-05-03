import * as io from 'socket.io';
import * as transfer from '../shared/ITransfer';
import ClientMap from './ClientMap';
import ClientUser from './ClientUser';
import * as creator from '../creator/Core';

export class Game {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private user: ClientUser;
    private map: ClientMap;
    private world: creator.World;

    constructor(socket: SocketIO.Socket) {
        this.canvas = <HTMLCanvasElement>document.querySelector('#c');
        this.world = new creator.World(this.canvas);

        socket.on('player', (data: transfer.IClientData) => {
            this.user = new ClientUser(data);
        });
        
        socket.on('player-update', (data: transfer.IClientData) => {
            this.user.update(data);
        });
    }
}

export default Game;
