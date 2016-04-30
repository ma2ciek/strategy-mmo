const floor = Math.floor;

export interface IPoint {
    x: number;
    y: number;
}

export class Point implements IPoint {
    constructor(
        public x: number,
        public y: number
    ) { }

    public static copy(p: IPoint) {
        return new Point(p.x, p.y)
    }

    public static fromFloored(p: IPoint) {
        return new Point(floor(p.x), floor(p.y))
    }

    public static sum(p1: IPoint, p2: IPoint) {
        return new Point(p1.x + p2.x, p1.y + p2.y);
    }
}

export default Point;
