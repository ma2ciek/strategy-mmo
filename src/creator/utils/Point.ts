export interface IPoint {
    x: number;
    y: number;
}

export class Point {
    constructor(
        public x: number,
        public y: number
    ) { }

    public getDistance(p: IPoint) {
        return Math.sqrt(this.squareDistance(p));
    }

    public squareDistance(p: IPoint) {
        return (this.x - p.x) * (this.x - p.x) + (this.y - p.y) * (this.y - p.y);
    }

    public add(p: IPoint) {
        this.x += p.x;
        this.y += p.y;
    }
    
    public subtract(p: IPoint) {
        this.x -= p.x;
        this.y -= p.y;
    }

    public getSubtract(p: IPoint) {
        return new Point(
            this.x - p.x,
            this.y - p.y
        );
    }
    
    public set(p: IPoint) {
        this.x = p.x;
        this.y = p.y;
    }
    
    public static create(p: IPoint) {
        return new Point(p.x, p.y);
    }
}

export default Point;