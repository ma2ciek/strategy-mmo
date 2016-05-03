export interface IFrames {
    [name: string]: number[];
}

namespace logger {
    const frames: IFrames = {};
    let max = 50;

    export function getMs(name: string) {
        return (get(name) | 0) + 'ms';
    }

    export function getFPS(name: string) {
        return 1000 / get(name) | 0;
    }

    function get(name: string) {
        return frames[name].reduce((a, b) => a + b) / frames[name].length;
    }

    export function frameStart(name: string) {
        if (!frames[name])
            frames[name] = [];

        const frame = frames[name];

        frame.push(-performance.now());
        if (frame.length > max)
            frame.shift();
    }

    export function frameEnd(name: string) {
        const frame = frames[name];
        if (!frame)
            frames[name] = [];

        frame[frame.length - 1] += performance.now();
    }
}

export default logger;
