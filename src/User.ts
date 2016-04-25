import * as winston from 'winston';
import { EventEmitter } from 'events';

export type Socket = SocketIO.Socket;

export class User extends EventEmitter {
    private connections = 0;
    private socket: Socket;
    private online = true;

    constructor(socket: Socket) {
        super();
        this.handleSocket(socket);
    }

    public handleSocket(socket: Socket) {
        this.socket = socket;
        this.online = true;
        this.socket.on('disconnect', this.onDisconnect.bind(this));
        this.socket.on('keyup', (keyCode: number) =>
            winston.log('info', this.getIp() + ' up: ' + keyCode))
        this.socket.on('keydown', (keyCode: number) =>
            winston.log('info', this.getIp() + ' down: ' + keyCode))
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

    public getIp() {
        return this.socket.request.connection.remoteAddress;
    }
}

export default User;
