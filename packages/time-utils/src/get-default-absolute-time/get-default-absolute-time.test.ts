/* eslint-disable @typescript-eslint/no-this-alias */
import { advanceTo, clear as clearDate } from 'jest-date-mock';

const utcPlugin = jest.requireActual('dayjs/plugin/utc');

/**
 * This is naive implementation of dayjs.utcOffset method.
 * It was created to make test deterministic and
 * prevent timezone DST values from affecting test results.
 */
jest.mock(
  'dayjs/plugin/utc',
  () => (
    option: string,
    Dayjs: Record<string, any>,
    dayjs: Record<string, any>
  ) => {
    const proto = Dayjs.prototype;
    const plugin = utcPlugin(option, Dayjs, dayjs);
    const hourOffset = 60;

    proto.utcOffset = function (input: number, keepLocalTime?: boolean) {
      const instace = this;
      if (!input) return hourOffset;
      if (input && keepLocalTime) {
        instace.$offset = hourOffset;
        instace.$u = input === 0;
        return instace;
      }

      return instace;
    };

    return plugin;
  }
);

import getDefaultAbsoluteTime from './get-default-absolute-time';

beforeEach(() => {
  // Wednesday, 31 March 2021 00:00:00
  advanceTo(1617148800000);
});

afterAll(() => {
  clearDate();
});

test('get default timeframe for "Europe/Warsaw" timezone', () => {
  expect(getDefaultAbsoluteTime('Europe/Warsaw')).toMatchInlineSnapshot(`
    Object {
      "end": "2021-03-31T00:00:00+01:00",
      "start": "2021-03-30T00:00:00+01:00",
    }
  `);
});
