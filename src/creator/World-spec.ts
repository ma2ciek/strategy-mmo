import * as assert from 'assert';
import * as Canvas from 'canvas';

import World from './World';
import { makeStubs, makeMocks } from './unit-tests-utils';

makeStubs('requestAnimationFrame');
makeMocks('window');

describe('World', () => {

    let world: World;
    let canvas: Canvas;

    beforeEach(() => {
        canvas = new Canvas(500, 500);
        canvas.addEventListener = () => { };
        world = new World(canvas, {
            width: 500,
            height: 500
        });
        
    })
    describe('#constructor()', () => {
        it('should conifgure canvas', () => {
            assert.equal(canvas.width, 500);
            assert.equal(canvas.height, 500);
        })
    })
});
