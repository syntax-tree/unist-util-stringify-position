var own = {}.hasOwnProperty

export function stringifyPosition(value) {
  // Nothing.
  if (!value || typeof value !== 'object') {
    return ''
  }

  // Node.
  if (own.call(value, 'position') || own.call(value, 'type')) {
    return position(value.position)
  }

  // Position.
  if (own.call(value, 'start') || own.call(value, 'end')) {
    return position(value)
  }

  // Point.
  if (own.call(value, 'line') || own.call(value, 'column')) {
    return point(value)
  }

  // ?
  return ''
}

function point(point) {
  return index(point && point.line) + ':' + index(point && point.column)
}

function position(pos) {
  return point(pos && pos.start) + '-' + point(pos && pos.end)
}

function index(value) {
  return value && typeof value === 'number' ? value : 1
}
