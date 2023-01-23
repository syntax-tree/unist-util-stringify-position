import test from 'tape'
import {stringifyPosition} from './index.js'

test('stringifyPosition', function (t) {
  t.equal(
    stringifyPosition(),
    '',
    'should return empty `string` with `undefined`'
  )
  t.equal(
    stringifyPosition(null),
    '',
    'should return empty `string` with `null`'
  )
  t.equal(
    // @ts-expect-error runtime.
    stringifyPosition('foo'),
    '',
    'should return empty `string` with `string`'
  )
  t.equal(
    // @ts-expect-error runtime.
    stringifyPosition(5),
    '',
    'should return empty `string` with `number`'
  )
  t.equal(stringifyPosition({}), '', 'should return empty `string` with `{}`')

  t.equal(
    stringifyPosition({type: 'text'}),
    '1:1-1:1',
    'should return a range for a `node` without `position`'
  )

  t.equal(
    // @ts-expect-error runtime.
    stringifyPosition({type: 'text', position: 3}),
    '1:1-1:1',
    'should return a range for `node` with invalid `position` #1'
  )

  t.equal(
    stringifyPosition({
      type: 'text',
      position: {start: {}, end: {}}
    }),
    '1:1-1:1',
    'should return a range for `node` with invalid `position` #2'
  )

  t.equal(
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

  t.equal(
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

  t.equal(
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

  t.equal(
    stringifyPosition({start: null, end: null}),
    '1:1-1:1',
    'should return a range for a `position` without `point`s'
  )

  t.equal(
    // @ts-expect-error runtime.
    stringifyPosition({start: 3, end: 6}),
    '1:1-1:1',
    'should return a range for `position` with invalid `point`s #1'
  )

  t.equal(
    stringifyPosition({start: {}, end: {}}),
    '1:1-1:1',
    'should return range for `position` with invalid `point`s #1'
  )

  t.equal(
    stringifyPosition({
      start: {line: null, column: null},
      end: {line: null, column: null}
    }),
    '1:1-1:1',
    'should return range for `position` with invalid `point`s #3'
  )

  t.equal(
    stringifyPosition({
      start: {line: 2, column: 5},
      end: {line: 2, column: 6}
    }),
    '2:5-2:6',
    'should return range for `position` with valid `point`s'
  )

  t.equal(
    stringifyPosition({line: null, column: null}),
    '1:1',
    'should return a point for a `point` without indices'
  )

  t.equal(
    // @ts-expect-error runtime.
    stringifyPosition({line: 'foo', column: 'bar'}),
    '1:1',
    'should return a point for a `point` with invalid indices #1'
  )

  t.equal(
    stringifyPosition({line: 4}),
    '4:1',
    'should return a point for a partially valid `point` #1'
  )

  t.equal(
    stringifyPosition({column: 12}),
    '1:12',
    'should return a point for a partially valid `point` #1'
  )

  t.equal(
    stringifyPosition({line: 5, column: 2}),
    '5:2',
    'should return a point for a valid `point`'
  )

  t.end()
})
