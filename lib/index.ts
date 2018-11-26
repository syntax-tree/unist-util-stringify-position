import * as Unist from 'unist'

const own = {}.hasOwnProperty
function hasProperty(value: any, propertyName: string): boolean {
  return own.call(value, propertyName)
}

function isNode(value: any): value is Unist.Node {
  return hasProperty(value, 'position') || hasProperty(value, 'type')
}

function isPosition(value: any): value is Unist.Position {
  return hasProperty(value, 'start') || hasProperty(value, 'end')
}

function isPoint(value: any): value is Unist.Point {
  return hasProperty(value, 'line') || hasProperty(value, 'column')
}

export = stringify

function stringify(
  value: Unist.Node | Unist.Position | Unist.Point,
): string | null {
  /* Nothing. */
  if (!value || typeof value !== 'object') {
    return null
  }

  /* Node. */
  if (isNode(value)) {
    return stringifyPosition(value.position)
  }

  /* Position. */
  if (isPosition(value)) {
    return stringifyPosition(value)
  }

  /* Point. */
  if (isPoint(value)) {
    return stringifyPoint(value)
  }

  /* ? */
  return null
}

function stringifyPoint(point: Unist.Point) {
  if (!point || typeof point !== 'object') {
    point = {
      line: 1,
      column: 1,
    }
  }

  return (
    convertIndexToNumber(point.line) + ':' + convertIndexToNumber(point.column)
  )
}

function stringifyPosition(pos?: Unist.Position) {
  if (!pos || typeof pos !== 'object') {
    pos = {
      start: {
        line: 1,
        column: 1,
      },
      end: {
        line: 1,
        column: 1,
      },
    }
  }

  return stringifyPoint(pos.start) + '-' + stringifyPoint(pos.end)
}

function convertIndexToNumber(value: any): number {
  return value && typeof value === 'number' ? value : 1
}
