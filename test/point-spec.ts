'use strict';

import * as assert from 'assert';
import * as mocha from 'mocha';
import Point from '../build/Point';

var p = new Point(1, 2);

describe('simple test', function() {
    it('should be true,', function() {
        assert.ok(1);
    });
});