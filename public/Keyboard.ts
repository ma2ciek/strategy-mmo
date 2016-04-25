export interface ICallback {
    (): any;
}

export interface IKeyWatcher {
    keyDown: ICallback;
    keyUp: ICallback;
    [name: string]: ICallback;
}

interface INumberDictionary {
    [name: string]: number;
}

export interface IKeyWatchers {
    [keyCode: number]: IKeyWatcher[];
}

export class Keyboard {
    private keyDown: boolean[] = [];
    private watchers: IKeyWatchers = {};
    private keyCodes: INumberDictionary = {
        up: 40,
        right: 39,
        down: 38,
        left: 37,
    };

    constructor() {
        for (let i = 0; i < 256; i++)
            this.keyDown.push(false);

        window.addEventListener('keydown', e => this.resolve('keyDown', e.keyCode));
        window.addEventListener('keyup', e => this.resolve('keyUp', e.keyCode));
    }

    public watch(keyName: string, keyDown: ICallback, keyUp: ICallback) {
        let keyCode = this.getKeyCode(keyName);
        this.watchers[keyCode] || (this.watchers[keyCode] = []).push({ keyDown, keyUp });
    }

    public resolve(eventName: 'keyDown' | 'keyUp', keyCode: number) {
        const isPressed = (eventName == 'keyDown');
        if (this.keyDown[keyCode] == isPressed)
            return;

        this.keyDown[keyCode] = isPressed;

        if (!this.watchers[keyCode])
            return;

        for (let watcher of this.watchers[keyCode]) {
            const fn = watcher[eventName];
            fn && fn();
        }
    }

    public isPressed(keyName: string) {
        const keyCode = this.getKeyCode(keyName);
        return this.keyDown[keyCode];
    }

    private getKeyCode(keyName: string) {
        let keyCode = this.keyCodes[keyName];
        if (!keyCode)
            console.error('wrong key name: ', keyName);
        return keyCode;
    }
}

export default Keyboard;