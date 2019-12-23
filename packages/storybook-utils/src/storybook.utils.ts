import { boolean, number, select, color } from '@storybook/addon-knobs';

import { colors } from '@keen/colors';

const typhographyOptions = {
  fontStyle: {
    normal: 'normal',
    italic: 'italic',
  },
  fontWeight: {
    normal: 'normal',
    bold: 'bold',
  },
};

export const createThemeKnobs = () => ({
  axisX: {
    enabled: boolean('Enabled', true, 'Axis X'),
    tickSize: number('Tick Size', 10, {}, 'Axis X'),
    tickPadding: number('Tick Padding', 10, {}, 'Axis X'),
    color: color('Line Color', colors.darkBlue, 'Axis X'),
    labels: {
      enabled: boolean('Show Labels', true, 'Axis X'),
      typhography: {
        fontSize: number('Font Size', 10, {}, 'Axis X'),
        fontStyle: select(
          'Font Style',
          typhographyOptions.fontStyle,
          typhographyOptions.fontStyle.normal,
          'Axis X'
        ) as any,
        fontWeight: select(
          'Font Weight',
          typhographyOptions.fontWeight,
          typhographyOptions.fontWeight.normal,
          'Axis X'
        ) as any,
        fontColor: color('Color', colors.black, 'Axis X'),
      },
    },
  },
  axisY: {
    enabled: boolean('Enabled', true, 'Axis Y'),
    tickSize: number('Tick Size', 10, {}, 'Axis Y'),
    tickPadding: number('Tick Padding', 10, {}, 'Axis Y'),
    color: color('Line Color', colors.darkBlue, 'Axis Y'),
    labels: {
      enabled: boolean('Show Labels', true, 'Axis Y'),
      typhography: {
        fontSize: number('Font Size', 10, {}, 'Axis Y'),
        fontStyle: select(
          'Font Style',
          typhographyOptions.fontStyle,
          typhographyOptions.fontStyle.normal,
          'Axis Y'
        ) as any,
        fontWeight: select(
          'Font Weight',
          typhographyOptions.fontWeight,
          typhographyOptions.fontWeight.normal,
          'Axis Y'
        ) as any,
        fontColor: color('Color', colors.black, 'Axis Y'),
      },
    },
  },
  gridX: {
    enabled: boolean('Enabled', true, 'Grid X'),
    color: color('Color', colors.gray, 'Grid X'),
  },
  gridY: {
    enabled: boolean('Enabled', true, 'Grid Y'),
    color: color('Color', colors.gray, 'Grid Y'),
  },
});
