import * as winston from 'winston';
import Manager from '../shared/Manager';
import User from './User';
import GameMap from './GameMap';

export type Socket = SocketIO.Socket;

export class UserManager extends Manager<User> {

    public static dependencies = ['gameMap'];

    private gameMap: GameMap;

    public handle(socket: Socket) {
        const clientIp = <string>socket.request.connection.remoteAddress;

        const searchFn = User.prototype.getIp;
        let user = this.findBy(searchFn, clientIp);

        if (!user) {
            user = new User(socket, this.gameMap);
            this.handleGlobalEvents(user);
            this.list.push(user);
        } else {
            user.handleSocket(socket);
        }

        winston.log('info', '' + user.getConnections());
    }

    private handleGlobalEvents(user: User) {
        user.on('getOnlineMembers', () => this.getOnlineMembers());
    }

    public getOnlineMembers() {
        return this.list.filter(u => u.isOnline());
    }

    public updateResources() {
        this.list.forEach(user => user.updateResources());
    }
}

export default UserManager;
