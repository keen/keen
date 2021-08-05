import { PickerWidgets } from '../types';
import { WIDGETS } from '../constants';

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
