import assert from 'node:assert/strict'
import test from 'node:test'
import {stringifyPosition} from './index.js'
import * as mod from './index.js'

test('stringifyPosition', function () {
  assert.deepEqual(
    Object.keys(mod).sort(),
    ['stringifyPosition'],
    'should expose the public api'
  )

  assert.equal(
    stringifyPosition(),
    '',
    'should return empty `string` with `undefined`'
  )
  assert.equal(
    stringifyPosition(null),
    '',
    'should return empty `string` with `null`'
  )
  assert.equal(
    // @ts-expect-error runtime.
    stringifyPosition('foo'),
    '',
    'should return empty `string` with `string`'
  )
  assert.equal(
    // @ts-expect-error runtime.
    stringifyPosition(5),
    '',
    'should return empty `string` with `number`'
  )
  assert.equal(
    stringifyPosition({}),
    '',
    'should return empty `string` with `{}`'
  )

  assert.equal(
    stringifyPosition({type: 'text'}),
    '1:1-1:1',
    'should return a range for a `node` without `position`'
  )

  assert.equal(
    // @ts-expect-error runtime.
    stringifyPosition({type: 'text', position: 3}),
    '1:1-1:1',
    'should return a range for `node` with invalid `position` #1'
  )

  assert.equal(
    stringifyPosition({
      type: 'text',
      position: {start: {}, end: {}}
    }),
    '1:1-1:1',
    'should return a range for `node` with invalid `position` #2'
  )

  assert.equal(
    stringifyPosition({
      type: 'text',
      position: {
        start: {line: null, column: null},
        end: {line: null, column: null}
      }
    }),
    '1:1-1:1',
    'should return a range for `node` with invalid `position` #3'
  )

  assert.equal(
    stringifyPosition({
      type: 'text',
      position: {
        start: {line: 2, column: 5},
        end: {line: 2, column: 6}
      }
    }),
    '2:5-2:6',
    'should return a range for `node` with valid `position` (types: literal object)'
  )

  assert.equal(
    stringifyPosition(
      /** @type {import('mdast').Root} */ ({
        type: 'root',
        children: [],
        position: {
          start: {line: 1, column: 1},
          end: {line: 2, column: 1}
        }
      })
    ),
    '1:1-2:1',
    'should return a range for `node` with valid `position` (types: explicit instance of node)'
  )

  assert.equal(
    stringifyPosition({start: null, end: null}),
    '1:1-1:1',
    'should return a range for a `position` without `point`s'
  )

  assert.equal(
    // @ts-expect-error runtime.
    stringifyPosition({start: 3, end: 6}),
    '1:1-1:1',
    'should return a range for `position` with invalid `point`s #1'
  )

  assert.equal(
    stringifyPosition({start: {}, end: {}}),
    '1:1-1:1',
    'should return range for `position` with invalid `point`s #1'
  )

  assert.equal(
    stringifyPosition({
      start: {line: null, column: null},
      end: {line: null, column: null}
    }),
    '1:1-1:1',
    'should return range for `position` with invalid `point`s #3'
  )

  assert.equal(
    stringifyPosition({
      start: {line: 2, column: 5},
      end: {line: 2, column: 6}
    }),
    '2:5-2:6',
    'should return range for `position` with valid `point`s'
  )

  assert.equal(
    stringifyPosition({line: null, column: null}),
    '1:1',
    'should return a point for a `point` without indices'
  )

  assert.equal(
    // @ts-expect-error runtime.
    stringifyPosition({line: 'foo', column: 'bar'}),
    '1:1',
    'should return a point for a `point` with invalid indices #1'
  )

  assert.equal(
    stringifyPosition({line: 4}),
    '4:1',
    'should return a point for a partially valid `point` #1'
  )

  assert.equal(
    stringifyPosition({column: 12}),
    '1:12',
    'should return a point for a partially valid `point` #1'
  )

  assert.equal(
    stringifyPosition({line: 5, column: 2}),
    '5:2',
    'should return a point for a valid `point`'
  )
})
