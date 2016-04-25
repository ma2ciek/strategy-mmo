import * as express from 'express';
import * as http from 'http';
import * as sockets from 'socket.io';
import UserManager from './UserManager';

const app = express();
const server = http.createServer(app);
const io = sockets(server);
const users = new UserManager();

app.use(express.static('public'));

app.get('/', (req: any, res: any) =>
    res.sendFile('index.html'));

io.on('connection', socket =>
    users.handle(socket));

server.listen(8080, () =>
    console.log('listening on *:8080'));
