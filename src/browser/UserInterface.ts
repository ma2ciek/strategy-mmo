import { Component, ViewChild } from '@angular/core';
import GameHeader from './GameHeader';

@Component({
    selector: 'gui',
    template: '<game-header></game-header>',
    directives: [GameHeader]
})

export class UserInterface {
    @ViewChild(GameHeader) header: GameHeader;
}

export default UserInterface;
