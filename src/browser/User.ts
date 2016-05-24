import * as transfer from '../shared/ITransfer';
import { Town, ITownObject } from '../shared/Town';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class User {
    public visibleAreaEmitter: EventEmitter<transfer.IDict> = new EventEmitter();
    public townEmitter: EventEmitter<Town> = new EventEmitter<Town>();

    private activeTownIndex = 0;

    private towns: Town[];
    private visibleArea: transfer.IDict;

    public getActiveTown() {
        return this.towns[this.activeTownIndex];
    }
    
    public selectTown(id: number) {
        const index = this.towns.map(t => t.getId()).indexOf(id);
        
        if(index == -1) 
            return;
            
        this.activeTownIndex = index;
        this.fixTownIndexAndEmitChange();     
    }

    public nextTown() {
        this.activeTownIndex++;
        this.fixTownIndexAndEmitChange();
    }

    public prevTown() {
        this.activeTownIndex--;
        this.fixTownIndexAndEmitChange();
    }

    private fixTownIndexAndEmitChange() {
        // prevent negative values        
        this.activeTownIndex += this.towns.length;
        this.activeTownIndex %= this.towns.length;
        this.townEmitter.emit(this.getActiveTown());
    }

    public update(data: transfer.IClientData) {
        this.towns = data.towns.map(data => Town.fromObject(data));
        this.visibleArea = data.visibleArea;
        this.visibleAreaEmitter.emit(this.visibleArea);
        this.townEmitter.emit(this.getActiveTown());        
    }
}

export default User;
