/* eslint-disable @typescript-eslint/no-this-alias */
import { advanceTo, clear as clearDate } from 'jest-date-mock';

import getDefaultAbsoluteTime from './get-default-absolute-time';

beforeEach(() => {
  // Wednesday, 31 March 2021 00:00:00
  advanceTo(1617148800000);
});

afterAll(() => {
  clearDate();
});

test('get default timeframe', () => {
  expect(getDefaultAbsoluteTime()).toMatchInlineSnapshot(`
    Object {
      "end": "2021-03-31T00:00:00",
      "start": "2021-03-30T00:00:00",
    }
  `);
});
