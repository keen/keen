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
  colorPalette?: string[];
};

const SERIES = [
  { name: 'ka', color: '#487650' },
  { name: 'l2a', color: 'pink' },
  { name: 'li1', color: 'gray' },
  { name: 'la3ffffsd3x', color: 'black' },
  { name: 'licfsdfdsfsdenkaka', color: 'pink' },
  { name: ' walca na 6', color: 'gray' },
  { name: 'lor', color: 'aqua' },
  { name: 'sa3333331sa', color: 'blue' },
  { name: 'licen', color: 'yellow' },
  { name: '1  411', color: 'red' },
  { name: 'af', color: 'black' },
  { name: 'r', color: 'aqua' },
  { name: 'a31r', color: 'aqua' },
  { name: 'l3r', color: 'aqua' },
];

export const SeriesLegend: FC<Props> = ({
  layout,
  labels,
  position,
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
    card,
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
