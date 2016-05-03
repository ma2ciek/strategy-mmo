import { IDictionary } from '../utils/util';

export function circleMask(ctx: CanvasRenderingContext2D, circle: ICircle) {
    ctx.beginPath();
    ctx.save();
    ctx.arc(circle.x, circle.y, circle.r, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.clip();
}

export interface ICircle {
    x: number;
    y: number;
    r: number;
}

export interface IMask {
    (ctx: CanvasRenderingContext2D, config: IDictionary): void;
}