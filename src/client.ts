'use strict';

import { Game } from './browser/Game'; 
import { bootstrap } from '@angular/platform-browser-dynamic';
import { User } from './browser/User';

bootstrap(Game, [User]).catch((err: any) => console.error(err))