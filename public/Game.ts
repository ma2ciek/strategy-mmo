import User from './User';

export class Game {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private user: User;

    constructor() {
        this.canvas = <HTMLCanvasElement>document.querySelector('#c');
        this.ctx = this.canvas.getContext('2d');
        window.addEventListener('resize', () => this.resizeCanvas());
        this.resizeCanvas();
        this.user = new User();
        this.nextFrame();
    }

    private resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    private nextFrame() {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.user.updatePosition();
        this.user.draw(this.ctx);

        requestAnimationFrame(() => this.nextFrame());
    }
}

export default Game;
