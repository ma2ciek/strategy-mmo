import * as winston from 'winston';
import Manager from './Manager';
import User from './User';

export type Socket = SocketIO.Socket;

export class UserManager extends Manager<User> {
    public handle(socket: Socket) {
        const clientIp = <string>socket.request.connection.remoteAddress;

        const searchFn = User.prototype.getIp;
        let user = this.findBy(searchFn, clientIp);

        if (!user) {
            user = new User(socket);
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
}

export default UserManager;
