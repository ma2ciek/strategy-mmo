import { IRect} from './Rectangle';
import { Shape, IShape, IShapeOptions} from './Shape';
import { IPoint } from '../utils/Point';
import util from '../utils/util';

export interface IImageOptions extends IShapeOptions {
    src: string;    
    width?: number;
    height?: number;
}

export interface IImage extends IShape {
    src: string;
    width: number;
    height: number;
 }

export class Image extends Shape implements IImage {
    public type = 'image';
    public src: string;
    
    public width: number;
    public height: number;
    
    private el: HTMLImageElement;

    constructor(options: IImageOptions) {
        super(options);

        this.src = options.src;
        this.initialize(options);
    }

    private initialize(options: IImageOptions) {
        this.el = util.createImage(this.src, () => {
            this.width = options.width || this.el.width;
            this.height = options.height || this.el.height; 
            this.emit('dirt');            
        });
    }

    public draw(ctx: CanvasRenderingContext2D) {
        if (!this.el.width)
            return;

        ctx.drawImage(this.el, this.x, this.y, this.width, this.height);
    }

    public contains(p: IPoint): boolean {
        return this.x + this.width > p.x &&
            this.y + this.height > p.y &&
            this.x < p.x &&
            this.y < p.y;
    }

    public containsRect(rect: IRect): boolean {
        return this.x + this.width > rect.x &&
            this.y + this.height > rect.y &&
            this.x < rect.x + rect.width &&
            this.y < rect.y + rect.height;
    }

    public getBoundingRect(): IRect {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };
    }
}

export default Image