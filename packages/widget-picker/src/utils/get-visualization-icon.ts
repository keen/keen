import { WIDGETS } from '@keen.io/widget-picker';

import { PickerWidgets } from '../types';

type Params = {
  type: PickerWidgets;
  chartSettings: Record<string, any>;
};

export const getVisualizationIcon = ({ type, chartSettings }: Params) => {
  const activeVisualization = WIDGETS.find(({ isActive }) =>
    isActive(type, chartSettings)
  );

  if (activeVisualization) {
    return activeVisualization.icon;
  }

  const { icon } = WIDGETS.find(({ widget }) => widget === type);
  return icon;
};
