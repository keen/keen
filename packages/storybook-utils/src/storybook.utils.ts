import { boolean, number, select, color, text } from '@storybook/addon-knobs';

import { colors } from '@keen.io/colors';

const typographyOptions = {
  fontStyle: {
    normal: 'normal',
    italic: 'italic',
  },
  fontWeight: {
    normal: 'normal',
    bold: 'bold',
  },
  fontFamily: {
    GangsterGroteskBold: 'Gangster Grotesk Bold',
    GangsterGroteskLight: 'Gangster Grotesk Light',
    GangsterGroteskRegular: 'Gangster Grotesk Regular',
    LatoBold: 'Lato Bold',
    LatoLight: 'Lato Light',
    LatoRegular: 'Lato Regular',
  },
};

const layoutOptions = {
  vertical: 'vertical',
  horizontal: 'horizontal',
};

const alignmentOptions = {
  left: 'left',
  center: 'center',
  right: 'right',
};

const positionOptions = {
  top: 'top',
  bottom: 'bottom',
  left: 'left',
  right: 'right',
};

export const createCardKnobs = (namespace: string) => ({
  hasShadow: boolean('Shadow On / Off', true, namespace),
  border: text('Border', '', namespace),
  borderRadius: text('Border Radius', '0px', namespace),
  backgroundColor: color('Background Color', colors.white['500'], namespace),
});

export const createLayoutKnobs = (
  namespace: string,
  defaultValue: string = layoutOptions.vertical
) => select('Layout', layoutOptions, defaultValue, namespace);

export const createTypographyKnobs = (
  namespace: string,
  fonts: string[] = []
) => {
  let fontsList: Record<string, string> | string[] =
    typographyOptions.fontFamily;
  if (fonts && fonts.length) {
    fontsList = [...Object.values(typographyOptions.fontFamily), ...fonts];
  }

  return {
    fontSize: number('Font Size', 10, {}, namespace),
    fontStyle: select(
      'Font Style',
      typographyOptions.fontStyle,
      typographyOptions.fontStyle.normal,
      namespace
    ) as any,
    fontWeight: select(
      'Font Weight',
      typographyOptions.fontWeight,
      typographyOptions.fontWeight.normal,
      namespace
    ) as any,
    fontColor: color('Font Color', colors.black['500'], namespace),
    fontFamily: select(
      'Font Family',
      fontsList,
      typographyOptions.fontFamily.GangsterGroteskRegular,
      namespace
    ),
  };
};

export const createLegendKnobs = (namespace: string) => ({
  enabled: boolean('Enabled', true, namespace),
  position: select(
    'Position',
    positionOptions,
    positionOptions.top,
    namespace
  ) as any,
  alignment: select(
    'Alignment',
    alignmentOptions,
    alignmentOptions.left,
    namespace
  ),
  layout: createLayoutKnobs(namespace, layoutOptions.horizontal),
  typography: createTypographyKnobs(namespace),
  card: createCardKnobs(namespace),
});

type ThemeProperties = 'axisX' | 'axisY' | 'gridX' | 'gridY' | 'labels';

const defaultThemeOptions: ThemeProperties[] = [
  'axisX',
  'axisY',
  'gridX',
  'gridY',
];

export const createThemeKnobs = (
  options: ThemeProperties[] = defaultThemeOptions
) => {
  const axisX = () => ({
    axisX: {
      enabled: boolean('Enabled', true, 'Axis X'),
      tickSize: number('Tick Size', 10, {}, 'Axis X'),
      tickPadding: number('Tick Padding', 10, {}, 'Axis X'),
      stroke: number('Stroke', 1, {}, 'Axis X'),
      color: color('Line Color', colors.blue['100'], 'Axis X'),
      labels: {
        enabled: boolean('Show Labels', true, 'Axis X'),
        typography: createTypographyKnobs('Axis X'),
      },
    },
  });

  const axisY = () => ({
    axisY: {
      enabled: boolean('Enabled', true, 'Axis Y'),
      tickSize: number('Tick Size', 0, {}, 'Axis Y'),
      tickPadding: number('Tick Padding', 10, {}, 'Axis Y'),
      stroke: number('Stroke', 0, {}, 'Axis Y'),
      color: color('Line Color', colors.blue['100'], 'Axis Y'),
      labels: {
        enabled: boolean('Show Labels', true, 'Axis Y'),
        typography: createTypographyKnobs('Axis Y'),
      },
    },
  });

  const gridX = () => ({
    gridX: {
      enabled: boolean('Enabled', true, 'Grid X'),
      color: color('Color', colors.gray['500'], 'Grid X'),
    },
  });

  const gridY = () => ({
    gridY: {
      enabled: boolean('Enabled', true, 'Grid Y'),
      color: color('Color', colors.gray['500'], 'Grid Y'),
    },
  });

  const labels = () => ({
    labels: {
      enabled: boolean('Enabled', true, 'Labels'),
      typography: createTypographyKnobs('Labels'),
    },
  });

  return {
    ...(options.includes('axisX') ? axisX() : {}),
    ...(options.includes('axisY') ? axisY() : {}),
    ...(options.includes('gridX') ? gridX() : {}),
    ...(options.includes('gridY') ? gridY() : {}),
    ...(options.includes('labels') ? labels() : {}),
  };
};

export const getGoogleFonts = async () => {
  const GOOGLE_FONTS_API =
    'https://www.googleapis.com/webfonts/v1/webfonts/?key=AIzaSyC529qus-Wu8LEftuMjSSBOt7mKu5lMm2E';

  const fonts = await fetch(GOOGLE_FONTS_API)
    .then(data => data.json())
    .then(res => {
      const { items } = res;
      const filteredItems = items
        .filter(
          (item: { category: string; family: string }) =>
            item.category !== 'handwriting' && item.family !== 'Lato'
        )
        .map((item: { family: string }) => item.family);

      return filteredItems;
    })
    .catch(err => console.error(err));

  return fonts;
};
