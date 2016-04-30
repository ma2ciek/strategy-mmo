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
    id?: number;
    range?: number;
    resources?: IResources;
    buildings?: Building[];
}

export interface IResources {
    wood: number;
    stone: number;
    iron: number;
    [name: string]: number;
}

let id = -1;

export class Town {
    private range = 2;
    private buildings: Building[] = [];
    private resources: IResources;
    private position: Point;
    private ownerId: string;
    private id: number;

    private initialSpeed: IResources = {
        wood: 0.1,
        stone: 0.05,
        iron: 0.02
    };

    constructor(options: ITownOptions) {
        this.position = options.position;
        this.resources = options.resources || {
            wood: 100,
            stone: 50,
            iron: 20
        };
        this.id = typeof options.id == 'number' ? options.id : ++id;
        this.ownerId = options.ownerId;
        this.buildings = options.buildings || [];
    }

    public static fromObject(config: ITownObject) {
        return new Town(config);
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

    public toObject(): ITownObject {
        return {
            position: this.position,
            range: this.range,
            buildings: this.buildings,
            resources: {
                wood: this.resources.wood | 0,
                stone: this.resources.stone | 0,
                iron: this.resources.iron | 0,
            },
            ownerId: this.ownerId,
            id: this.id
        };
    }

    public updateResources() {
        const resourceSpeed = this.getSpeed();
        for (let name in resourceSpeed) {
            this.resources[name] += resourceSpeed[name];
        }
    }

    private getSpeed() {
        // TODO
        return this.initialSpeed;
    }
}

export default Town;
