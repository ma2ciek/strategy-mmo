import * as creator from '../creator/Core';
import { Component, AfterViewInit, ViewChild } from '@angular/core';
import TileManager from './TileManager';
import Keyboard from './Keyboard';
import * as transfer from '../shared/ITransfer';
import { User } from './User';

@Component({
    selector: 'map',
    template: '<canvas #map></canvas>',
    styles: [`
        #map {
            position: absolute;
            top: 0;
            left: 0;
        }
    `]
})

export class WorldMap {
    private keyboard: Keyboard;
    private tileManager: TileManager;

    @ViewChild('map') map: any;

    constructor(private user: User) {
        this.keyboard = new Keyboard();
    }

    public ngAfterViewInit() {
        const canvas = this.map.nativeElement;
        this.tileManager = new TileManager(canvas);
        this.user.updateEmitter.subscribe(
            () => this.tileManager.setCenterTile(this.user.getActiveTown().getPosition()),
            (err: any) => console.log(err)
        );
    }

    public updateVisibleArea(tiles: transfer.IDict) {
        this.tileManager.setTilesFromData(tiles);
    }

    public setMap(dimensions: transfer.IMapData) {
        this.tileManager.setDimensions(dimensions)
    }
}

export default WorldMap;