import { Shape, IShape, IShapeOptions} from './Shape';
import { IPoint } from '../utils/Point';
import { IRect } from './Rectangle';

const sqrt = Math.sqrt;
const pow2 = (x: number) => Math.pow(x, 2);

export interface ICircleOptions extends IShapeOptions {
    radius: number;
    color: string;
}

export default class Circle extends Shape implements IShape {
    public radius: number;
    public color: string;

    constructor(options: ICircleOptions) {
        super(options);
        this.radius = options.radius;
        this.color = options.color;
    }
    
    public draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }
    
    public contains(p: IPoint) {
        return pow2(this.x - p.x) + pow2(this.y - p.y) <= pow2(this.radius);
    }

    public containsRect(rect: IRect) {
        return this.x + this.radius > rect.x &&
            this.y + this.radius > rect.y &&
            this.x - this.radius <= rect.x + rect.width &&
            this.y - this.radius < rect.y + rect.height;
    }

    public getBoundingRect() {
        
        return {
            x: this.x - this.radius,
            y: this.y - this.radius,
            width: this.radius * 2,
            height: this.radius * 2
        }
    }
}
