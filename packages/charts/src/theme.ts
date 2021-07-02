import { colors } from '@keen.io/colors';

import { Theme, Margins } from './types';

export const chartColors = [
  colors.lightBlue[500],
  colors.green[500],
  colors.orange[400],
  colors.blue[500],
  colors.yellow[500],
  colors.red[400],
  colors.purple[500],
  colors.green[200],
  colors.pink[500],
  colors.blue[200],
  colors.yellow[200],
  colors.purple[100],
  colors.lightBlue[100],
  colors.pink[200],
];

export const margins: Margins = { top: 50, right: 20, bottom: 50, left: 40 };

export const theme: Theme = {
  colors: chartColors,
  bar: {
    values: {
      typography: {
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 10,
        fontFamily: 'Lato, sans-serif',
        fontColor: colors.white['500'],
      },
    },
  },
  choropleth: {
    map: {
      stroke: colors.black['500'],
    },
    sphere: {
      enabled: false,
      backgroundColor: colors.gray['200'],
    },
    graticule: {
      enabled: false,
      color: colors.gray['400'],
    },
  },
  funnel: {
    header: {
      badge: {
        enabled: true,
        variant: 'black',
        typography: {
          fontStyle: 'normal',
          fontWeight: 'normal',
          fontSize: 14,
          fontFamily: 'Lato, sans-serif',
          fontColor: 'inherit',
        },
      },
      value: {
        enabled: true,
        typography: {
          fontStyle: 'normal',
          fontWeight: 'normal',
          fontSize: 20,
          fontFamily: 'Lato, sans-serif',
          fontColor: colors.blue['500'],
        },
      },
      title: {
        typography: {
          fontStyle: 'normal',
          fontWeight: 'normal',
          fontSize: 12,
          fontFamily: 'Lato, sans-serif',
          fontColor: colors.black['500'],
        },
      },
      backgroundColor: colors.gray['100'],
    },
    step: {
      backgroundColor: colors.gray['300'],
    },
  },
  metric: {
    value: {
      typography: {
        fontStyle: 'normal',
        fontWeight: 'lighter',
        fontSize: 60,
        fontFamily: 'Lato, sans-serif',
        fontColor: colors.blue['500'],
      },
    },
    prefix: {
      typography: {
        fontStyle: 'normal',
        fontWeight: 'lighter',
        fontSize: 20,
        fontFamily: 'Lato, sans-serif',
        fontColor: colors.blue['500'],
      },
    },
    suffix: {
      typography: {
        fontStyle: 'normal',
        fontWeight: 'lighter',
        fontSize: 20,
        fontFamily: 'Lato, sans-serif',
        fontColor: colors.blue['500'],
      },
    },
    icon: {
      enabled: false,
      position: 'top',
      style: 'solid',
      margins: { top: 0, left: 0, bottom: 0, right: 0 },
      type: 'brand',
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
        fontFamily: 'Lato, sans-serif',
        fontColor: colors.black['500'],
      },
    },
  },
  pie: {
    labels: {
      enabled: true,
      typography: {
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 12,
        fontFamily: 'Gangster Grotesk, sans-serif',
        fontColor: colors.black['500'],
      },
    },
  },
  gauge: {
    labels: {
      enabled: true,
      typography: {
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 14,
        fontFamily: 'Lato, sans-serif',
        fontColor: colors.black['500'],
      },
    },
    border: {
      backgroundColor: colors.blue['500'],
    },
    total: {
      enabled: true,
      typography: {
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 60,
        fontFamily: 'Lato, sans-serif',
        fontColor: colors.blue['400'],
      },
    },
  },
  donut: {
    labels: {
      enabled: true,
      typography: {
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 10,
        fontFamily: 'Gangster Grotesk, sans-serif',
        fontColor: colors.black['500'],
      },
    },
    total: {
      enabled: true,
      label: {
        typography: {
          fontStyle: 'normal',
          fontWeight: 'normal',
          fontSize: 14,
          fontFamily: 'Lato, sans-serif',
          fontColor: colors.black['400'],
        },
      },
      value: {
        typography: {
          fontStyle: 'normal',
          fontWeight: 'normal',
          fontSize: 24,
          fontFamily: 'Lato, sans-serif',
          fontColor: colors.blue['400'],
        },
      },
    },
  },
  table: {
    header: {
      typography: {
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 14,
        fontFamily: 'Gangster Grotesk, sans-serif',
        fontColor: colors.white['500'],
        lineHeight: '17px',
      },
    },
    body: {
      typography: {
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 14,
        fontFamily: 'Lato, sans-serif',
        fontColor: colors.black['400'],
        lineHeight: '17px',
      },
    },
  },
  tooltip: {
    enabled: true,
    mode: 'light',
    labels: {
      typography: {
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 11,
        fontFamily: 'Lato, sans-serif',
        fontColor: colors.black['500'],
      },
    },
    values: {
      typography: {
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 11,
        fontFamily: 'Lato, sans-serif',
        fontColor: colors.black['500'],
      },
    },
  },
  axisX: {
    enabled: true,
    padding: 5,
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
        fontFamily: 'Gangster Grotesk, sans-serif',
        fontColor: colors.black['500'],
      },
      radiusAngle: 0,
    },
    title: {
      alignment: 'center',
      padding: 20,
      typography: {
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 14,
        fontFamily: 'Lato, sans-serif',
        fontColor: colors.blue['500'],
      },
    },
  },
  axisY: {
    enabled: true,
    padding: 5,
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
        fontFamily: 'Gangster Grotesk, sans-serif',
        fontColor: colors.black['500'],
      },
      radiusAngle: 0,
    },
    title: {
      alignment: 'center',
      padding: 20,
      typography: {
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 14,
        fontFamily: 'Lato, sans-serif',
        fontColor: colors.blue['500'],
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
  zeroIntersection: {
    color: colors.blue['500'],
  },
  hoverBar: {
    enabled: true,
    type: 'dark',
  },
};
