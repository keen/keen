import { colors } from '@keen/colors';

import { Theme } from './types';

export const chartColors = [
  colors.lightBlue[500],
  colors.orange[500],
  colors.yellow[500],
  colors.green[500],
  colors.pink[500],
];

export const theme: Theme = {
  colors: chartColors,
  axisX: {
    enabled: true,
    tickSize: 10,
    tickPadding: 10,
    stroke: 1,
    color: colors.blue['100'],
    labels: {
      enabled: true,
      typography: {
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 12,
        fontColor: colors.black['500'],
      },
    },
  },
  axisY: {
    enabled: true,
    tickSize: 0,
    tickPadding: 5,
    stroke: 0,
    color: colors.blue['100'],
    labels: {
      enabled: true,
      typography: {
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 12,
        fontColor: colors.black['500'],
      },
    },
  },
  gridX: {
    enabled: true,
    color: colors.gray['500'],
  },
  gridY: {
    enabled: true,
    color: colors.gray['500'],
  },
};
