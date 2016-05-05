import { Component } from '@angular/core';
import { Town, IResources } from '../shared/Town';
import { User } from './User';

@Component({
    selector: 'game-header',
    template: `
        <div class="row">
            <div class="flex col-xs-6">
                <button class="btn btn-default"><</button>
                <div>Town #{{ id }} </div>
                <button class="btn btn-default">></button>            
            </div>
            <div class="flex col-sx-6">
                <div><label>Wood </label><span>{{ resources.wood }}</span></div>
                <div><label>Stone </label><span>{{ resources.stone }}</span></div>
                <div><label>Iron </label><span>{{ resources.iron }}</span></div>
            </div>
        </div>
    `,
    styles: [`
        game-header {
            padding: 2px;
            border-bottom: 2px solid #AAA;
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
    `]
})

export default class GameHeader {
    private id: number;
    private resources: IResources = {
        wood: 0,
        stone: 0,
        iron: 0
    };

    constructor(user: User) {
        user.updateEmitter.subscribe(() =>
            this.update(user.getActiveTown()));
    }

    public update(town: Town) {
        this.id = town.getId();
        this.resources = town.getResources();
    }
}