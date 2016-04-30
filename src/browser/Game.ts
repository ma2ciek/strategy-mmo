import * as io from 'socket.io';
import * as transfer from '../shared/ITransfer';
import ClientMap from './ClientMap';
import ClientUser from './ClientUser';

export class Game {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private user: ClientUser;
    private map: ClientMap;

    constructor(socket: SocketIO.Socket) {
        this.canvas = <HTMLCanvasElement>document.querySelector('#c');
        this.ctx = this.canvas.getContext('2d');
        window.addEventListener('resize', () => this.resizeCanvas());
        this.resizeCanvas();

        socket.on('player', (data: transfer.IClientData) => {
            this.user = new ClientUser(data);
            this.nextFrame();
        });
        
        socket.on('player-update', (data: transfer.IClientData) => {
            this.user.update(data);
        });
    }

    private resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    private nextFrame() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.user.draw(this.ctx);
        

        requestAnimationFrame(() => this.nextFrame());
    }
}

export default Game;
