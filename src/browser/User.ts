import * as transfer from '../shared/ITransfer';
import { Town, ITownObject } from '../shared/Town';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class User {
    public updateEmitter: EventEmitter<any> = new EventEmitter();

    private x = 100;
    private y = 100;
    private activeTownIndex = 0;

    private towns: Town[];
    private visibleArea: transfer.IDict;

    constructor() {
        console.log(0);
    }

    public getActiveTown() {
        return this.towns[this.activeTownIndex];
    }

    public nextTown() {
        this.activeTownIndex++;
        this.fixTownIndex();
    }

    public prevTown() {
        this.activeTownIndex--;
        this.fixTownIndex();
    }

    private fixTownIndex() {
        // prevent negative values        
        this.activeTownIndex += this.towns.length;
        this.activeTownIndex %= this.towns.length;
    }

    public update(data: transfer.IClientData) {
        this.towns = data.towns.map(data => Town.fromObject(data));
        this.visibleArea = data.visibleArea;
        this.updateEmitter.next(null);
    }
}