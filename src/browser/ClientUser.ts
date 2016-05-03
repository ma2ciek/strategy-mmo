import Keyboard from './Keyboard';
import * as transfer from '../shared/ITransfer';
import {Town, ITownObject} from '../shared/Town';
import TownModal from './TownModal';

export class User {
    private x = 100;
    private y = 100;
    private activeTownIndex = 0;
    private view: TownModal;

    private towns: Town[];
    private visibleArea: transfer.IDict;

    private keyboard: Keyboard;

    constructor(data: transfer.IClientData) {
        this.keyboard = new Keyboard();
        this.view = new TownModal()
        this.update(data);
    }

    public updatePosition() {
        this.x += +this.keyboard.isPressed('right') - +this.keyboard.isPressed('left');
        this.y += -this.keyboard.isPressed('down') + +this.keyboard.isPressed('up');
    }

    public getActiveTown() {
        return this.towns[this.activeTownIndex];
    }

    public nextTown() {
        this.activeTownIndex++;
        this.activeTownIndex %= this.towns.length;
    }
    
    public update(data: transfer.IClientData) {
        this.towns = data.towns.map(data => Town.fromObject(data));
        this.visibleArea = data.visibleArea;
        this.view.render(this.getActiveTown());
    }
    
    public draw(ctx: CanvasRenderingContext2D) {
        const town = this.getActiveTown();
        const center = town.getPosition();
        
        
    }
}

export default User;
