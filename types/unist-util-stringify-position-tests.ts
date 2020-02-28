import stringify = require('unist-util-stringify-position')

/* eslint-disable @typescript-eslint/no-unused-vars */

// Point
const stringValue: string = stringify({line: 2, column: 3}) // => '2:3'

// Position
const stringValue2: string = stringify({
  start: {line: 2, column: 1},
  end: {line: 3, column: 1}
}) // => '2:1-3:1'

// Node
const stringValue3: string = stringify({
  type: 'text',
  value: '!',
  position: {
    start: {line: 5, column: 11},
    end: {line: 5, column: 12}
  }
}) // => '5:11-5:12'

/* eslint-enable @typescript-eslint/no-unused-vars */
