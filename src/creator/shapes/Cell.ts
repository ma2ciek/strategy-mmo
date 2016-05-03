import { IShape } from './Shape';
import Point from '../utils/Point';
import { Rectangle, IRectangleOptions } from './Rectangle';
import util from '../utils/util';
import CanvasDragger from '../CanvasDragger'
import { IMask } from './mask';

export interface ICellOptions extends IRectangleOptions {
    src: string;
    mask?: IMask;
}

export interface ICell extends IShape { }

export class Cell extends Rectangle implements ICell {
    public src: string;
    protected el: HTMLImageElement;

    private mask: IMask;
    private offset = new Point(0, 0);
    private startPoint: Point;

    constructor(options: ICellOptions) {
        super(options);

        this.mask = options.mask;
        this.src = options.src;
        this.initialize();
    }

    private initialize(): void {
        this.el = util.createImage(this.src, () => this.emit('dirt'))
        this.on('dragstart', this.dragStart.bind(this));
        this.on('dragging', this.move.bind(this));
        this.on('drop', this.correctOffset.bind(this));
    }

    private dragStart(point: Point, e: MouseEvent) {
        this.startPoint = point;
    }

    private move(point: Point) {
        this.offset.add(this.startPoint.getSubtract(point))
        this.startPoint = point;
        this.emit('dirt');
    }

    private correctOffset() {
        this.offset.x = util.normalize(this.offset.x, 0, this.el.width - this.width)
        this.offset.y = util.normalize(this.offset.y, 0, this.el.height - this.height)
        this.emit('dirt');
    }

    public draw(ctx: CanvasRenderingContext2D) {
        if (!this.el.width)
            return;

        this.mask && this.mask(ctx, {
            x: this.x + this.width / 2,
            y: this.y + this.height / 2,
            r: Math.min(this.width / 2, this.height / 2)
        });

        ctx.drawImage(this.el,
            this.offset.x, this.offset.y, this.width, this.height,
            this.x, this.y, this.width, this.height);


        this.mask && ctx.restore();
    }

    public addImage(src: string) {
        this.src = src;
        this.el = util.createImage(src, () => this.emit('dirt'));
    }
}

export default Cell;