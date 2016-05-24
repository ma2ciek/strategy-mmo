import * as creator from '../creator/Core';
import { Component, AfterViewInit, ViewChild } from '@angular/core';
import TileManager from './TileManager';
import Keyboard from './Keyboard';
import * as transfer from '../shared/ITransfer';
import { User } from './User';
import Town from '../shared/Town';

@Component({
    selector: 'map',
    template: '<canvas #map></canvas>',
    styles: [`
        canvas {
            position: absolute;
            top: 0;
            left: 0;
            z-index: -1;
        }
    `]
})

export class WorldMap {
    private keyboard: Keyboard;
    public tileManager: TileManager;

    @ViewChild('map') map: any;

    constructor(private user: User) {
        this.keyboard = new Keyboard();
        this.tileManager = new TileManager();
    }

    public ngAfterViewInit() {
        const canvas = this.map.nativeElement;
        this.tileManager.setCanvas(canvas);

        this.user.townEmitter.subscribe((town: Town) =>
            this.tileManager.setCenterTile(town.getPosition()));

        this.user.visibleAreaEmitter.subscribe((data: transfer.IDict) =>
            this.tileManager.setTilesFromData(data));

        this.tileManager.townSelectionEmitter.subscribe((town: number) =>
            this.user.selectTown(town));

        this.updatePlayerPosition();
    }

    private updatePlayerPosition() {
        const keys = this.keyboard;
        const dirX = -keys.isPressed('left') + +keys.isPressed('right');
        const dirY = -keys.isPressed('down') + +keys.isPressed('up');

        if (dirX || dirY)
            this.tileManager.moveBy({ x: dirX * 10, y: dirY * 10 });
        window.requestAnimationFrame(() => this.updatePlayerPosition());
    }

    public setMapData(dimensions: transfer.IMapData) {
        this.tileManager.setDimensions(dimensions)
    }
}

export default WorldMap;