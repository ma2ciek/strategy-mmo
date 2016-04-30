'use strict';

import * as io from 'socket.io';
import Game from './browser/Game'; 

const socket = <any> io();

document.addEventListener('DOMContentLoaded', () => new Game(socket));
(document.readyState == 'complete') && new Game(socket);