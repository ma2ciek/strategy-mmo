import { IRect} from './Rectangle';
import { Shape, IShape, IShapeOptions} from './Shape';
import { IPoint } from '../utils/Point';
import util from '../utils/util';

export interface IImageOptions extends IShapeOptions {
    width?: number;
    height?: number;
    src: string;
}

export interface IImage extends IShape, IImageOptions { }

export class Image extends Shape implements IImage {
    public src: string;
    private el: HTMLImageElement;

    constructor(options: IImageOptions) {
        super(options);

        this.src = options.src;
        this.initialize();
    }

    private initialize(): void {
        this.el = util.createImage(this.src, () => this.emit('dirt'))
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        if (!this.el.width)
            return;

        ctx.drawImage(this.el, this.x, this.y, this.el.width, this.el.height);
    }

    public contains(p: IPoint): boolean {
        return this.x + this.el.width > p.x &&
            this.y + this.el.height > p.y &&
            this.x < p.x &&
            this.y < p.y;
    }

    public containsRect(rect: IRect): boolean {
        return this.x + this.el.width > rect.x &&
            this.y + this.el.height > rect.y &&
            this.x < rect.x + rect.width &&
            this.y < rect.y + rect.height;
    }

    public getBoundingRect(): IRect {
        return {
            x: this.x,
            y: this.y,
            width: this.el.width,
            height: this.el.height
        };
    }
}

export default Image