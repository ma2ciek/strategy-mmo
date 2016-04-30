export interface IResourceConfig {
    chance: number;
    name: string;
}

export const resources = [
    { name: 'wood', chance: 4 },
    { name: 'stone', chance: 2 },
    { name: 'copper', chance: 1 },
];

export class ResourceManager {
    private totalChance = 0;

    constructor() {
        for (var resource of resources) {
            this.totalChance += resource.chance;
        }
    }

    public getCodeOfRandom() {
        let rand = Math.random() * this.totalChance;
        for (var i = 0; i < resources.length; i++) {
            rand -= resources[i].chance;
            if (rand < 0)
                break;
        }
        return i;
    }
}

const resourceManager = new ResourceManager();

export default resourceManager;
