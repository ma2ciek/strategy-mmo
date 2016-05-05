import * as io from 'socket.io';
import * as transfer from '../shared/ITransfer';
import WorldMap from './WorldMap';
import UserInterface from './UserInterface';
import { Component, ViewChild } from '@angular/core';
import { User } from './User';

@Component({
    selector: 'app',
    template: `
        <gui #gui></gui>
        <map #map></map>
    `,
    directives: [UserInterface, WorldMap]
})

export class Game {
    private socket: SocketIO.Server;

    @ViewChild(UserInterface) gui: UserInterface
    @ViewChild('map') map: WorldMap;

    constructor(user: User) {
        this.socket = io();

        this.socket.on('player-update', (data: transfer.IClientData) => {
            user.update(data);
        });

        this.socket.on('map', (data: transfer.IMapData) => {
            this.map.setMap(data);
        });
    }
}
