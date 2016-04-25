const round = Math.round;

export interface IPoint {
    x: number;
    y: number;
}

export class Point implements IPoint {
    constructor(
        public x: number,
        public y: number
    ) { }

    static toIntegers(p: IPoint) {
        return new Point(round(p.x), round(p.y))
    }
}

export default Point;
