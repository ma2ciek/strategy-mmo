import Emitter from './Emitter';
import * as assert from 'assert';

describe('Emitter', () => {
    let emitter: Emitter<any>;
    let x: number;
    const callback = () => x += 1;
    const callback2 = () => x += 2;

    beforeEach(() => {
        x = 0;
        emitter = new Emitter();
    })

    it('should add few subscribents', () => {
        emitter.subscribe(callback);
        emitter.subscribe(callback2);
        emitter.subscribe(callback2);

        emitter.emit();
        assert.equal(x, 5);
    })

    it('subscribe() should subscribe to all emits', () => {
        emitter.subscribe(callback);
        emitter.subscribe(callback2);

        emitter.emit();
        emitter.emit();
        assert.equal(x, 6);
    });

    it('should subscribe and unsubscribe', () => {
        emitter.subscribe(callback);
        emitter.unsubscribe(callback);

        emitter.emit();
        assert.equal(x, 0);
    })

    it('should remove few subscribents', () => {
        emitter.subscribe(callback);
        emitter.subscribe(callback2);
        emitter.subscribe(callback);
        emitter.unsubscribe(callback);

        emitter.emit();
        assert.equal(x, 2);
    });

    it('#unsubscribeAll()', () => {
        emitter.subscribe(callback);
        emitter.subscribe(callback2);
        emitter.subscribe(callback);
        emitter.unsubscribeAll();

        emitter.emit();
        assert.equal(x, 0);
    });

    it('#once()', () => {
        emitter.once(callback);

        emitter.emit();
        emitter.emit();
        assert.equal(x, 1);
    })
})