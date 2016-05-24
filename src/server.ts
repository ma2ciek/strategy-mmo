import * as express from 'express';
import * as http from 'http';
import * as sockets from 'socket.io';
import ModuleManager from './shared/ModuleManager';
import UserManager from './server/UserManager';
import GameMap from './server/GameMap';

const app = express();
const server = http.createServer(app);
const io = sockets(server);

const game = new ModuleManager(<any>{
    gameMap: GameMap,
    userManager: UserManager,
});

app.use(express.static('build'));

app.get('/', (req: any, res: any) =>
    res.sendFile('index.html'));

io.on('connection', socket => {
    const user = <UserManager><any> game.get('userManager');
    user.handle(socket);
    user.updateResources();    
});

server.listen(8080, () =>
    console.log('listening on *:8080'));
