import { select } from '@storybook/addon-knobs';

const geoProjectionOptions = {
  mercator: 'mercator',
  equalEarth: 'equalEarth',
  naturalEarth: 'naturalEarth',
  geoAlbersUsa: 'geoAlbersUsa',
  orthographic: 'orthographic',
  azimuthalEqualArea: 'azimuthalEqualArea',
};

export const geoProjectionKnobs = (
  namespace: string,
  defaultValue: string = geoProjectionOptions['mercator']
) => select('Projection', geoProjectionOptions, defaultValue, namespace);

const iconOptions = {
  'arrow-up': 'arrow-up',
  'arrow-down': 'arrow-down',
  'caret-down': 'caret-down',
  'caret-up': 'caret-up',
  'caret-left': 'caret-left',
  'caret-right': 'caret-right',
  brand: 'brand',
};

export const iconKnobs = (
  namespace: string,
  defaultValue: string = iconOptions['arrow-up']
) => select('Icon', iconOptions, defaultValue, namespace);

const stackModeOptions = {
  percent: 'percent',
  normal: 'normal',
};

export const stackModeKnobs = (
  namespace: string,
  defaultValue: string = stackModeOptions.normal
) => select('Stack mode', stackModeOptions, defaultValue, namespace);

const groupModeOptions = {
  grouped: 'grouped',
  stacked: 'stacked',
};

export const groupModeKnobs = (
  namespace: string,
  defaultValue: string = groupModeOptions.grouped
) => select('Group mode', groupModeOptions, defaultValue, namespace);

const metricTypeOptions = {
  percent: 'percent',
  difference: 'difference',
  compare: 'compare',
};

export const metricTypeKnobs = (
  namespace: string,
  defaultValue: string = metricTypeOptions.compare
) => select('Metric type', metricTypeOptions, defaultValue, namespace);

const lineStackModeOptions = {
  normal: 'normal',
};

export const lineStackModeKnobs = (
  namespace: string,
  defaultValue: string = lineStackModeOptions.normal
) => select('Stack mode', lineStackModeOptions, defaultValue, namespace);

const curveOptions = {
  linear: 'linear',
  spline: 'spline',
  step: 'step',
};

export const curveKnobs = (
  namespace: string,
  defaultValue: string = curveOptions.linear
) => select('Curve', curveOptions, defaultValue, namespace);

const layoutOptions = {
  vertical: 'vertical',
  horizontal: 'horizontal',
};

export const layoutKnobs = (
  namespace: string,
  defaultValue: string = layoutOptions.vertical
) => select('Layout', layoutOptions, defaultValue, namespace);

const colorModeOptions = {
  continuous: 'continuous',
  discrete: 'discrete',
};

export const colorModeKnobs = (
  namespace: string,
  defaultValue: string = colorModeOptions.continuous
) => select('Color mode', colorModeOptions, defaultValue, namespace);
