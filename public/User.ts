import Keyboard from './Keyboard';

export class User {
    private x = 100;
    private y = 100;
    private keyboard: Keyboard;

    constructor() {
        this.keyboard = new Keyboard();
    }

    public updatePosition() {
        this.x += +this.keyboard.isPressed('right') - +this.keyboard.isPressed('left');
        this.y += -this.keyboard.isPressed('down') + +this.keyboard.isPressed('up');
    }

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI, false);
        ctx.closePath();
        ctx.fill();
    }
}

export default User;
