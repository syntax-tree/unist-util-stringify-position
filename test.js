'use strict'

var test = require('tape')
var stringify = require('.')

test('stringifyPosition', function (t) {
  t.equal(stringify(), '', 'should return empty `string` with `undefined`')
  t.equal(stringify(null), '', 'should return empty `string` with `null`')
  t.equal(stringify('foo'), '', 'should return empty `string` with `string`')
  t.equal(stringify(5), '', 'should return empty `string` with `number`')
  t.equal(stringify({}), '', 'should return empty `string` with `{}`')

  t.equal(
    stringify({type: 'text'}),
    '1:1-1:1',
    'should return a range for a `node` without `position`'
  )

  t.equal(
    stringify({type: 'text', position: 3}),
    '1:1-1:1',
    'should return a range for `node` with invalid `position` #1'
  )

  t.equal(
    stringify({
      type: 'text',
      position: {start: {}, end: {}}
    }),
    '1:1-1:1',
    'should return a range for `node` with invalid `position` #2'
  )

  t.equal(
    stringify({
      type: 'text',
      position: {
        start: {line: null, column: null},
        end: {line: null, column: null}
      }
    }),
    '1:1-1:1',
    'should return a range for `node` with invalid `position` #3'
  )

  t.equal(
    stringify({
      type: 'text',
      position: {
        start: {line: 2, column: 5},
        end: {line: 2, column: 6}
      }
    }),
    '2:5-2:6',
    'should return a range for `node` with valid `position`'
  )

  t.equal(
    stringify({start: null, end: null}),
    '1:1-1:1',
    'should return a range for a `position` without `point`s'
  )

  t.equal(
    stringify({start: 3, end: 6}),
    '1:1-1:1',
    'should return a range for `position` with invalid `point`s #1'
  )

  t.equal(
    stringify({start: {}, end: {}}),
    '1:1-1:1',
    'should return range for `position` with invalid `point`s #1'
  )

  t.equal(
    stringify({
      start: {line: null, column: null},
      end: {line: null, column: null}
    }),
    '1:1-1:1',
    'should return range for `position` with invalid `point`s #3'
  )

  t.equal(
    stringify({
      start: {line: 2, column: 5},
      end: {line: 2, column: 6}
    }),
    '2:5-2:6',
    'should return range for `position` with valid `point`s'
  )

  t.equal(
    stringify({line: null, column: null}),
    '1:1',
    'should return a point for a `point` without indices'
  )

  t.equal(
    stringify({line: 'foo', column: 'bar'}),
    '1:1',
    'should return a point for a `point` with invalid indices #1'
  )

  t.equal(
    stringify({line: 4}),
    '4:1',
    'should return a point for a partially valid `point` #1'
  )

  t.equal(
    stringify({column: 12}),
    '1:12',
    'should return a point for a partially valid `point` #1'
  )

  t.equal(
    stringify({line: 5, column: 2}),
    '5:2',
    'should return a point for a valid `point`'
  )

  t.end()
})
