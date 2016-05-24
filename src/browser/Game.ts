import * as io from 'socket.io';
import * as transfer from '../shared/ITransfer';
import UserInterface from './UserInterface';
import WorldMap from './WorldMap';
import { Component, ViewChild } from '@angular/core';
import { User } from './User';

@Component({
    selector: 'app',
    template: `
        <map></map>    
        <gui></gui>
    `,
    directives: [UserInterface, WorldMap]
})

export class Game {
    private socket: SocketIO.Server;

    @ViewChild(UserInterface) gui: UserInterface
    @ViewChild(WorldMap) map: WorldMap;

    constructor(user: User) {
        this.socket = io();

        this.socket.once('player-update', (data: transfer.IClientData) => {
            user.update(data);
        });

        this.socket.on('map', (data: transfer.IMapData) => {
            this.map.setMapData(data);
        });
    }
}
