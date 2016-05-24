import * as assert from 'assert';
import EventEmitter from './EventEmitter';

describe('EventEmitter', () => {
    let eventEmitter: EventEmitter<any>;

    beforeEach(() => {
        eventEmitter = new EventEmitter();
    })

    it('should add event listener and then fire it', done => {
        const firstCallback = done;
        eventEmitter.on('test', firstCallback);
        eventEmitter.emit('test');
    });

    it('should fire events in proper order', () => {
        let result = 0;
        const firstCallback = () => result += 10;
        const secondCallback = () => result *= 2;

        eventEmitter.on('test', firstCallback);
        eventEmitter.on('test', secondCallback);

        eventEmitter.emit('test');
        assert.equal(result, (0 + 10) * 2);
    });

    it('should not fire if the event name is different', () => {
        const wrongCallback = () => { throw new Error("shouldn't throw this") };

        eventEmitter.on('correct', () => {});
        eventEmitter.on('bad', wrongCallback);
        
        eventEmitter.emit('correct');
    });
});