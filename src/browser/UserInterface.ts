import { Component, ViewChild } from '@angular/core';
import GameHeader from './GameHeader';
import CityOverview from './CityOverview';

@Component({
    selector: 'gui',
    template: `
        <game-header></game-header>
        <city-overview></city-overview>
    `,
    directives: [GameHeader, CityOverview]
})

export default class UserInterface {
    @ViewChild(GameHeader) header: GameHeader;
    @ViewChild(CityOverview) city: CityOverview;
}
