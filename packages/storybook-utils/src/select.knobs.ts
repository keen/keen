import { select } from '@storybook/addon-knobs';

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
  defaultValue: string = curveOptions.step
) => select('Curve', curveOptions, defaultValue, namespace);
