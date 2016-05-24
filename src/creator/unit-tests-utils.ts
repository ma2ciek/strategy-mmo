const _global: any = <any>global;

interface IDictionary {
    [name: string]: any;
}

const stubs: IDictionary = {
    requestAnimationFrame: () => { },
};

const mocks: IDictionary = {
    window: global
};

const makeGlobalsFactory = (dictionary: IDictionary) => (...names: string[]) => {
    for (let name of names) {
        let object = dictionary[name];
        _global[name] = object;
    }
}

export const makeStubs = makeGlobalsFactory(stubs);
export const makeMocks = makeGlobalsFactory(mocks);
