// Dependencies:
var stringifyPosition = require('./index.js');

// Given a position:
var result = stringifyPosition({ 'line': 2, 'column': 3 });

// Yields:
console.log('txt', String(result));

// Given a (partial) location:
result = stringifyPosition({
    'start': { 'line': 2 },
    'end': { 'line': 3 }
});

// Yields:
console.log('txt', String(result));

// Given a node:
result = stringifyPosition({
    'type': 'text',
    'value': '!',
    'position': {
        'start': { 'line': 5, 'column': 11 },
        'end': { 'line': 5, 'column': 12 }
    }
});

// Yields:
console.log('txt', String(result));
