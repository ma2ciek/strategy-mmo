import { Component } from '@angular/core';
import { Town, IResources } from '../shared/Town';
import { User } from './User';
import KeyValuePipe from './pipes/KeyValuePipe';

@Component({
    selector: 'game-header',
    template: `
        <div class="row">
            <div class="flex col-xs-6">
                <button (click)="user.prevTown()" class="btn btn-default"><</button>
                <div>Town #{{ id }} </div>
                <button (click)="user.nextTown()" class="btn btn-default">></button>            
            </div>
            <div class="flex col-sx-6">
                <div *ngFor="let resource of resources | keyvalue">
                    <label>{{ resource.key }}</label>
                    <span>{{ resource.value }}</span>
                    <span class="gold">(+{{ income[resource.key] }})</span>
                </div>
            </div>
        </div>
    `,
    styles: [`
        :host {
            display: block;
            padding: 2px;
            border-bottom: 2px solid #AAA;
            background-color: #fff;
        }
        .flex {
            display: flex;
            justify-content: center;
            align-items: center;
            line-height: 34px;
        }
        .flex > * {
            margin: 0 5px;
        }   
        .gold {
            color: gold;
        }    
    `],
    pipes: [KeyValuePipe]
})

export default class GameHeader {
    private id: number;
    private resources: IResources;
    private income: IResources;

    constructor(private user: User) {
        user.townEmitter.subscribe((town: Town) =>this.update(town));
    }

    public update(town: Town) {
        this.id = town.getId();
        this.resources = town.getResources();
        this.income = town.getIncome();
    }
}