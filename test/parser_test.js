'use strict';

var parser = require('../lib/parse');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.parser = {
  setUp: function(done) {
    var returnFalse = function () { return false };

    this.intOptions = {
      parser: parseInt,
      protect: returnFalse
    };

    this.floatOptions = {
      parser: parseFloat,
      protect: returnFalse
    };

    this.protectOptions = {
      parser: parseInt,
      protect: function (key) {
        return key === 'id';
      }
    }

    done();
  },

  integer: function(test) {
    test.deepEqual(
      parser({
        a: '8'
      }, this.intOptions),
      {
        a: 8
      },
      'Should convert integers.'
    );

    test.done();
  },

  radix: function(test) {
    test.deepEqual(
      parser({
        a: '08'
      }, this.intOptions),
      {
        a: 8
      },
      'Should convert strings starting with 0.'
    );

    test.done();
  },

  float: function(test) {
    test.deepEqual(
      parser({
        a: '0.8'
      }, this.floatOptions),
      {
        a: 0.8
      },
      'Should convert floating point numbers.'
    );

    test.done();
  },

  deep: function(test) {
    test.deepEqual(
      parser({
        a: {
          b: '8'
        }
      }, this.intOptions),
      {
        a: {
          b: 8
        }
      },
      'Should convert recursively.'
    );

    test.done();
  },

  string: function(test) {
    test.deepEqual(
      parser({
        a: 'string'
      }, this.intOptions),
      {
        a: 'string'
      },
      'Should not convert regular string.'
    );

    test.done();
  },

  protect: function(test) {
    test.deepEqual(
      parser({
        num: '12345',
        id: '12345'
      }, this.protectOptions),
      {
        num: 12345,
        id: '12345'
      },
      'Should protect the given key.'
    );

    test.done();
  }
};
