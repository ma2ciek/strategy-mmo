import Building from './Building';
import { Point, IPoint } from './Point';

export interface ITownObject extends ITownOptions {
    position: IPoint;
    range: number;
    buildings: Building[];
    resources: IResources;
    ownerId: string;
    id: number;
}

export interface ITownOptions {
    position: IPoint;
    ownerId: string;
    income?: IResources;
    id?: number;
    range: number;
    resources?: IResources;
    buildings?: Building[];
    lastCalculationDate?: number;
    queue?: IQueue;
}

export interface IResources {
    wood: number;
    stone: number;
    iron: number;
    [name: string]: number;
}

export interface IQueue {

}

let id = 0;

export class Town {
    private range: number;
    private buildings: Building[] = [];
    private resources: IResources;
    private position: IPoint;
    private ownerId: string;
    private id: number;
    private queue: IQueue;
    private income: IResources;
    private lastCalculationDate: number;

    constructor(options: ITownOptions) {
        this.position = options.position;
        this.resources = options.resources;
        this.id = options.id || ++id;
        this.ownerId = options.ownerId;
        this.buildings = options.buildings || [];
        this.range = options.range;
        this.income = options.income;
        this.queue = options.queue || [];
        this.lastCalculationDate = options.lastCalculationDate || Date.now();
    }

    public static fromObject(config: ITownObject) {
        return new Town(config);
    }

    public toObject(): ITownObject {
        return JSON.parse(JSON.stringify(this));
    }

    public getRange() {
        return this.range;
    }

    public getPosition() {
        return this.position;
    }

    public getId() {
        return this.id;
    }

    public getResources(): IResources {
        const timeDelta = (Date.now() - this.lastCalculationDate) / (1000 * 60 * 60);
        return {
            wood: this.getResource('wood', timeDelta),
            stone: this.getResource('stone', timeDelta),
            iron: this.getResource('iron', timeDelta)
        }
    }

    private getResource(name: string, timeDelta: number) {
        return this.resources[name] + this.income[name] * timeDelta | 0;
    }

    public setIncome(income: IResources) {
        this.income = income;
    }

    public getIncome() {
        return this.income;
    }
}

export default Town;
