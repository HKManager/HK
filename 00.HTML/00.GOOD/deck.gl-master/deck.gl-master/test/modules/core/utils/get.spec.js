// Copyright (c) 2015 - 2017 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import test from 'tape-catch';
import {get} from '@deck.gl/core/utils/get';

const GET_TEST_CASES = [
  {
    title: 'simple array, integer key',
    container: [1, 2],
    key: 1,
    result: 2
  },
  {
    title: 'simple array, array key',
    container: [1],
    key: [0],
    result: 1
  },
  {
    title: 'simple object',
    container: {a: 1},
    key: 'a',
    result: 1
  },
  {
    title: 'simple object, array key',
    container: {a: 1},
    key: ['a'],
    result: 1
  },
  {
    title: 'nested object',
    container: {a: {b: {c: 1}}},
    key: 'a.b.c',
    result: 1
  },
  {
    title: 'nested object, same key, different value',
    container: {a: {b: {c: 2}}},
    key: 'a.b.c',
    result: 2
  },
  {
    title: 'nested object, array key',
    container: {a: {b: {c: 2}}},
    key: ['a', 'b', 'c'],
    result: 2
  },
  {
    title: 'ES6 Map',
    container: new Map([['a', 1]]),
    key: 'a',
    result: 1
  },
  {
    title: 'ES6 Map nested',
    container: new Map([['a', new Map([['b', 2]])]]),
    key: 'a.b',
    result: 2
  },
  {
    title: 'ES6 Map/Object nested',
    container: new Map([['a', {b: new Map([['c', 3]])}]]),
    key: 'a.b.c',
    result: 3
  }
];

test('get#import', t => {
  t.ok(typeof get === 'function', 'get imported OK');
  t.end();
});

test('container#get', t => {
  for (const tc of GET_TEST_CASES) {
    const result = get(tc.container, tc.key);
    t.deepEqual(result, tc.result, `get() on ${tc.title} returned expected result`);
  }
  t.end();
});
