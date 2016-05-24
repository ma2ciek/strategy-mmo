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
    
    public add(p: IPoint) {
        this.x += p.x;
        this.y += p.y;
    }

    public static copy(p: IPoint) {
        return new Point(p.x, p.y)
    }

    public static fromFloored(p: IPoint) {
        return new Point(floor(p.x), floor(p.y))
    }

    public static sum(p1: IPoint, p2: IPoint) {
        return new Point(p1.x + p2.x, p1.y + p2.y);
    }
    
    public static multiply(p: IPoint, value: number) {
        return new Point(p.x * value, p.y * value);
    }
        
    public static create(p: IPoint) {
        return new Point(p.x, p.y);
    }
}

export default Point;
