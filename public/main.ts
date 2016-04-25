'use strict';

import Game from './Game'; 

import * as io from './lib/socket.io';

const socket = io();

document.addEventListener('DOMContentLoaded', () => new Game());
(document.readyState == 'complete') && new Game();
