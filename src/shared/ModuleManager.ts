export interface IClassDictionary {
    [name: string]: IClass;
}

export interface IClass {
    new (): IModule;
    dependencies?: string[]
}

export interface IModuleDictionary {
    [name: string]: IModule;
}

export interface IModule {
    [dependency: string]: IModule;
}

export class ModuleManager {
    private modules: IModuleDictionary = {};

    constructor(dict: IClassDictionary) {
        for (var name in dict) {
            this.modules[name] = new dict[name]();
        }

        for (var name in dict) {
            const module = this.modules[name];
            const klass = dict[name];

            const dependencies = klass.dependencies;
            if (!dependencies)
                continue;

            for (let dependency of dependencies) {
                module[dependency] = this.modules[dependency];
            }
        }
    }

    public get(name: string) {
        return this.modules[name];
    }
}

export default ModuleManager;
