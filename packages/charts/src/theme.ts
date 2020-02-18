import { colors } from '@keen.io/colors';

import { Theme, Margins } from './types';

export const chartColors = [
  colors.lightBlue[500],
  colors.orange[500],
  colors.yellow[500],
  colors.green[500],
  colors.pink[500],
];

export const margins: Margins = { top: 50, right: 20, bottom: 50, left: 40 };

export const theme: Theme = {
  colors: chartColors,
  metric: {
    label: {
      typography: {
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 60,
        fontFamily: 'Lato Light, sans-serif',
        fontColor: colors.blue['500'],
      },
    },
    excerpt: {
      icons: {
        increase: {
          color: colors.green['500'],
          type: 'arrow-up',
        },
        decrease: {
          color: colors.orange['500'],
          type: 'arrow-down',
        },
      },
      backgroundColor: colors.white['400'],
      typography: {
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 16,
        fontFamily: 'Lato Regular, sans-serif',
        fontColor: colors.black['500'],
      },
    },
  },
  tooltip: {
    enabled: true,
    mode: 'dark',
  },
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
        fontSize: 10,
        fontFamily: 'Gangster Grotesk Regular, sans-serif',
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
        fontSize: 10,
        fontFamily: 'Gangster Grotesk Regular, sans-serif',
        fontColor: colors.black['500'],
      },
    },
  },
  gridX: {
    enabled: true,
    color: colors.gray['400'],
  },
  gridY: {
    enabled: true,
    color: colors.gray['400'],
  },
  labels: {
    enabled: true,
    typography: {
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: 10,
      fontFamily: 'Gangster Grotesk Regular, sans-serif',
      fontColor: colors.black['500'],
    },
  },
};
