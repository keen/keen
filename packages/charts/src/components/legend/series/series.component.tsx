import React, { FC } from 'react';
import { Layout, Typography, Position, CardSettings } from '@keen.io/ui-core';

import SeriesHorizontal from './series-horizontal.component';
import SeriesVertical from './series-vertical.component';

import { SingleSerie } from './series.styles';

import Label from '../label';

import { DataSerie } from './types';

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
  card: CardSettings;
  /** Handler for item click event */
  onClick: (key: string, disabled: boolean, index: number) => void;
};

export const SeriesLegend: FC<Props> = ({
  layout,
  labels,
  position,
  typography,
  card,
  onClick,
}) => {
  const items = labels.map(({ name, color }: DataSerie, idx: number) => (
    <SingleSerie key={name}>
      <Label
        typography={typography}
        markColor={color}
        onClick={(disabled: boolean) => onClick(name, disabled, idx)}
        text={name}
      />
    </SingleSerie>
  ));

  const commonProps = {
    typography,
    position,
    card,
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
