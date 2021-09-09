import { getBlueness } from '../src/util'

const testCases = [
  [
    [255, 0, 0],
    'red',
    0
  ],
  [
    [0, 255, 0],
    'green',
    0
  ],
  [
    [255, 255, 0],
    'yellow',
    0
  ],
  [
    [0, 255, 255],
    'cyan',
    0.5
  ],
  [
    [0, 0, 255],
    'blue',
    1
  ],
  [
    [0, 0, 127.5],
    'dark blue',
    0.5
  ],
  [
    [0, 0, 0],
    'black',
    0
  ],
  [
    [255, 255, 255],
    'white',
    0
  ],
  [
    [127.5, 127.5, 255],
    'light blue',
    0.5
  ],
]

testCases.forEach(([testCase, name, expected]) => {
  const value = getBlueness(testCase)
  console.log(name, testCase, value == expected, value);
});