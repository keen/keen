import { ScaleBand } from 'd3-scale';
import { ScaleSettings, formatValue } from '@keen.io/charts-utils';

type Options = {
  scale: ScaleBand<string>;
  settings: ScaleSettings;
  index: number;
};

/**
 * Get heatmap category label for tooltip
 *
 * @param scale - scale
 * @param settings - scale settings
 * @param index - heatmap block coordinate
 * @return label
 *
 */
export const getTooltipLabel = ({ scale, settings, index }: Options) => {
  const label = scale.domain()[index];
  if (settings?.type === 'time' && settings.formatLabel) {
    const { formatLabel } = settings;
    return formatValue(label, formatLabel);
  }

  return label;
};
