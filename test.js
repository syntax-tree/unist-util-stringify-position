import assert from 'node:assert/strict'
import test from 'node:test'
import {stringifyPosition} from 'unist-util-stringify-position'

test('stringifyPosition', async function (t) {
  await t.test('should expose the public api', async function () {
    assert.deepEqual(
      Object.keys(await import('unist-util-stringify-position')).sort(),
      ['stringifyPosition']
    )
  })

  await t.test(
    'should return empty `string` with `undefined`',
    async function () {
      assert.equal(stringifyPosition(), '')
    }
  )

  await t.test('should return empty `string` with `null`', async function () {
    assert.equal(stringifyPosition(null), '')
  })

  await t.test('should return empty `string` with `string`', async function () {
    assert.equal(
      // @ts-expect-error runtime.
      stringifyPosition('foo'),
      ''
    )
  })

  await t.test('should return empty `string` with `number`', async function () {
    assert.equal(
      // @ts-expect-error runtime.
      stringifyPosition(5),
      ''
    )
  })

  await t.test('should return empty `string` with `{}`', async function () {
    assert.equal(stringifyPosition({}), '')
  })

  await t.test(
    'should return a range for a `node` without `position`',
    async function () {
      assert.equal(stringifyPosition({type: 'text'}), '1:1-1:1')
    }
  )

  await t.test(
    'should return a range for `node` with invalid `position` #1',
    async function () {
      assert.equal(
        // @ts-expect-error runtime.
        stringifyPosition({type: 'text', position: 3}),
        '1:1-1:1'
      )
    }
  )

  await t.test(
    'should return a range for `node` with invalid `position` #2',
    async function () {
      assert.equal(
        stringifyPosition({
          type: 'text',
          position: {start: {}, end: {}}
        }),
        '1:1-1:1'
      )
    }
  )

  await t.test(
    'should return a range for `node` with invalid `position` #3',
    async function () {
      assert.equal(
        stringifyPosition({
          type: 'text',
          position: {
            start: {line: null, column: null},
            end: {line: null, column: null}
          }
        }),
        '1:1-1:1'
      )
    }
  )

  await t.test(
    'should return a range for `node` with valid `position` (types: literal object)',
    async function () {
      assert.equal(
        stringifyPosition({
          type: 'text',
          position: {
            start: {line: 2, column: 5},
            end: {line: 2, column: 6}
          }
        }),
        '2:5-2:6'
      )
    }
  )

  await t.test(
    'should return a range for `node` with valid `position` (types: explicit instance of node)',
    async function () {
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
        '1:1-2:1'
      )
    }
  )

  await t.test(
    'should return a range for a `position` without `point`s',
    async function () {
      assert.equal(stringifyPosition({start: null, end: null}), '1:1-1:1')
    }
  )

  await t.test(
    'should return a range for `position` with invalid `point`s #1',
    async function () {
      assert.equal(
        // @ts-expect-error runtime.
        stringifyPosition({start: 3, end: 6}),
        '1:1-1:1'
      )
    }
  )

  await t.test(
    'should return range for `position` with invalid `point`s #1',
    async function () {
      assert.equal(stringifyPosition({start: {}, end: {}}), '1:1-1:1')
    }
  )

  await t.test(
    'should return range for `position` with invalid `point`s #3',
    async function () {
      assert.equal(
        stringifyPosition({
          start: {line: null, column: null},
          end: {line: null, column: null}
        }),
        '1:1-1:1'
      )
    }
  )

  await t.test(
    'should return range for `position` with valid `point`s',
    async function () {
      assert.equal(
        stringifyPosition({
          start: {line: 2, column: 5},
          end: {line: 2, column: 6}
        }),
        '2:5-2:6'
      )
    }
  )

  await t.test(
    'should return a point for a `point` without indices',
    async function () {
      assert.equal(stringifyPosition({line: null, column: null}), '1:1')
    }
  )

  await t.test(
    'should return a point for a `point` with invalid indices #1',
    async function () {
      assert.equal(
        // @ts-expect-error runtime.
        stringifyPosition({line: 'foo', column: 'bar'}),
        '1:1'
      )
    }
  )

  await t.test(
    'should return a point for a partially valid `point` #1',
    async function () {
      assert.equal(stringifyPosition({line: 4}), '4:1')
    }
  )

  await t.test(
    'should return a point for a partially valid `point` #1',
    async function () {
      assert.equal(stringifyPosition({column: 12}), '1:12')
    }
  )

  await t.test('should return a point for a valid `point`', async function () {
    assert.equal(stringifyPosition({line: 5, column: 2}), '5:2')
  })
})
