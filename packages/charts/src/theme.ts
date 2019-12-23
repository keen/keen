import { colors } from '@keen/colors';

import { Theme } from './types';

export const chartColors = [
  colors.yellow,
  colors.green,
  colors.blue,
  colors.green,
  colors.orange,
  colors.violet,
  colors.marine,
  colors.pink,
];

export const theme: Theme = {
  colors: chartColors,
  axisX: {
    enabled: true,
    tickSize: 10,
    tickPadding: 5,
    color: colors.darkBlue,
    labels: {
      enabled: true,
      typhography: {
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 14,
        fontColor: colors.black,
      },
    },
  },
  axisY: {
    enabled: true,
    tickSize: 0,
    tickPadding: 5,
    color: colors.darkBlue,
    labels: {
      enabled: true,
      typhography: {
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 14,
        fontColor: colors.black,
      },
    },
  },
  gridX: {
    enabled: true,
    color: colors.gray,
  },
  gridY: {
    enabled: true,
    color: colors.gray,
  },
};
