import React, { FC } from 'react';
import { Layout, Typography, Position } from '@keen.io/ui-core';

import SeriesHorizontal from './series-horizontal.component';
import SeriesVertical from './series-vertical.component';

import { SingleSerie } from './series.styles';

import Label from '../label';

import { DataSerie } from './types';
import { LegendCardSettings } from '../types';

type Props = {
  /** Layout used on list elements */
  layout: Layout;
  /** Legend position in widget */
  position: Position;
  /** Array of legend items */
  labels: DataSerie[];
  /** typography styles */
  typography: Typography;
  /** Legend card styles */
  card: LegendCardSettings;
  /** Handler for item click event */
  onClick: (key: string, disabled: boolean, index: number) => void;
  /** Activate data serie handler */
  onActivate?: (dataSerie: string | boolean) => void;
  /** Deactive data serie handler */
  onDeactivate?: () => void;
};

export const SeriesLegend: FC<Props> = ({
  layout,
  labels,
  position,
  typography,
  card,
  onClick,
  onActivate,
  onDeactivate,
}) => {
  const items = labels.map(({ name, color }: DataSerie, idx: number) => (
    <SingleSerie key={name}>
      <Label
        typography={typography}
        markColor={color}
        onClick={(disabled, label) => {
          onClick(label, disabled, idx);
          if (onDeactivate && disabled) onDeactivate();
          if (onActivate && !disabled) onActivate(label);
        }}
        onMouseEnter={(label) => {
          if (onActivate) onActivate(label);
        }}
        onMouseLeave={() => {
          onDeactivate && onDeactivate();
        }}
        text={name}
      />
    </SingleSerie>
  ));

  const commonProps = {
    typography,
    position,
    card,
    labelsLength: labels.length,
  };

  return (
    <>
      {layout === 'horizontal' ? (
        <SeriesHorizontal {...commonProps}>{items}</SeriesHorizontal>
      ) : (
        <SeriesVertical
          {...commonProps}
          adaptiveHeight={position === 'top' || position === 'bottom'}
        >
          {items}
        </SeriesVertical>
      )}
    </>
  );
};

export default SeriesLegend;
