'use strict';

import * as assert from 'assert';
import * as mocha from 'mocha';
import Point from '../build/Point';

var p = new Point(1, 2);

describe('Point', function () {
    it('should be an instance,', function () {
        assert.equal(typeof p, 'object');
    });

    it('#toIntegers return rounded values', function () {
        assert.deepEqual(Point.toIntegers({ x: 1.1, y: 8.9 }), { x: 1, y: 9 });
        assert.deepEqual(Point.toIntegers({ x: -1.1, y: -8.9 }), { x: -1, y: -9 });
    });
});