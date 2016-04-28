'use strict';

import * as assert from 'assert';
import * as mocha from 'mocha';
import GameMap from '../build/GameMap';

describe('GameMap', function () {
    let map: GameMap;
    
    beforeEach(function () {
        map = new GameMap();
    });
    
    describe('#constuctor()', function () {
        it('should create big array', function () {
            assert.equal(map.map.length, 100 * 100);
        });
    });
})