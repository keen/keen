import { ChartTheme } from './types';

export const colors = {
  white: '#fff',
  black: '#1d2729',
  blue: '#27566d',
  green: '#487650',
  orange: '#cb5623',
  violet: '#6042a1',
  yellow: '#e29b1e',
  marine: '#85b4c3',
  pink: '#f4q083',
  gray: '#E1E2E4',
  darkBlue: '#27566D',
};

export const chartColors = [
  colors.blue,
  colors.green,
  colors.orange,
  colors.violet,
  colors.yellow,
  colors.marine,
  colors.pink,
];

export const keenTheme: ChartTheme = {
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
  }
};
