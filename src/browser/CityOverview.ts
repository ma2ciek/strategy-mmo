import { Component, ViewChild } from '@angular/core';
import { User } from './User';
import { ITownObject } from '../shared/Town';
import KeyValuePipe from './pipes/KeyValuePipe';

@Component({
    selector: 'city-overview',
    template: `
        <div [class.active]="isActive" *ngIf="town" class="container">  
            <button class="close" (click)="hide()">Close</button>
            <div id="position">
                <div>Position: {{ town.position.x }} : {{ town.position.y }} </div>
            </div>
            <div id="income">
                <h3>Income</h3>
                <div *ngFor="let resource of town.income | keyvalue"> {{ resource.key }}: {{ resource.value }} </div>
            </div>
            
            <div id="warehouse">
                <h3>WareHouse</h3>
                <div *ngFor="let resource of town.getResources() | keyvalue"> {{ resource.key }}: {{ resource.value }} </div>                
            </div>
            
            <div id="buildings">
                <div class="building" *ngFor="let building of town.buildings"></div>
            </div>
            <div id="queue">
                <div class="queue-element"></div>
            </div>
        </div>
    `,
    styles: [`
        .container {
            width: 1000px;
            margin: 30px auto 0;
            background: rgba(220,240,255,.9);
            height: 500px;
            border: 2px solid #AAA;
            border-radius: 30px;
            padding: 20px 30px;
            display: none;
        }
        
        .container.active {
            display: block;
        }
        
        h3 { 
            margin: 0 0 10px;
        }
        
        #income, #warehouse {
            margin-top: 10px;
            padding: 10px;
            border: 1px solid black;
            display: inline-block;
        }
    `],
    pipes: [KeyValuePipe]
})

export default class CityOverView {
    public isActive = false;
    private town: ITownObject;

    constructor(private user: User) {
        this.user.townEmitter.subscribe(this.getTownData.bind(this));
    }

    private getTownData(town: ITownObject) {
        this.isActive = true;
        this.town = town;
    }

    private hide() {
        this.isActive = false;
    }
}
