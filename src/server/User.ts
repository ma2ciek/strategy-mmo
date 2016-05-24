import * as winston from 'winston';
import { EventEmitter } from 'events';
import Player from './Player';
import GameMap from './GameMap';
import Town from '../shared/Town';

export type Socket = SocketIO.Socket;

export class User extends EventEmitter {
    private connections = 0;
    private socket: Socket;
    private player: Player;
    private online = true;

    constructor(socket: Socket, private map: GameMap) {
        super();
        this.player = new Player(map, socket.request.connection.remoteAddress);
        this.handleSocket(socket);
    }

    public handleSocket(socket: Socket) {
        this.socket = socket;
        this.online = true;
        this.socket.on('disconnect', this.onDisconnect.bind(this));
        this.socket.emit('map', this.map.getData());
    }

    private onDisconnect() {
        this.connections++;
        this.online = false;
        this.socket.broadcast.emit('socket disconnect', this.getIp());
    }

    public getConnections() {
        return this.connections;
    }

    public isOnline() {
        return this.online;
    }

    public getIp(): string {
        return this.socket.request.connection.remoteAddress;
    }
    
    public updateResources() {
        this.socket.emit('player-update', this.player.getData())
    }
}

export default User;
