import React, { FC } from 'react';
import { Layout, Typography, Position, Alignment } from '@keen.io/ui-core';

import SeriesHorizontal from './series-horizontal.component';
import SeriesVertical from './series-vertical.component';

import { DataSerie } from './types';
import { LegendCardSettings } from '../types';

type Props = {
  /** Layout used on list elements */
  layout: Layout;
  /** Legend position in widget */
  position: Position;
  /** Array of legend items */
  alignment: Alignment;
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
  colorPalette?: string[];
};

const SERIES = [
  { name: 'a', color: '#487650' },
  { name: 'lfdsfdsfdsfssfd2a', color: 'pink' },
  { name: 'c', color: 'gray' },
  { name: 'la3fdsffffsd3x', color: 'black' },
  { name: 'licfsdfdsfsdenkaka', color: 'pink' },
  { name: ' wafdsfdslca na 6', color: 'gray' },
  { name: 'lfdsfsdr', color: 'aqua' },
  { name: 'sa3333331sa', color: 'blue' },
  { name: 'licen', color: 'yellow' },
  { name: '1  411', color: 'red' },
  { name: 'af', color: 'black' },
  { name: 'r', color: 'aqua' },
  { name: 'a31r', color: 'aqua' },
  { name: 'l3r', color: 'aqua' },
];

/*
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

*/

export const SeriesLegend: FC<Props> = ({
  layout,
  labels,
  position,
  alignment,
  typography,
  card,
  onClick,
  onActivate,
  onDeactivate,
  colorPalette,
}) => {
  const commonProps = {
    typography,
    position,
    alignment,
    card,
    onItemClick: onClick,
    onItemActivate: onActivate,
    onItemDeactivate: onDeactivate,
  };

  return (
    <>
      <SeriesHorizontal
        {...commonProps}
        onOffsetUpdate={() => {}}
        colorPalette={colorPalette}
        dataSeries={SERIES}
      />
    </>
  );
};

export default SeriesLegend;
