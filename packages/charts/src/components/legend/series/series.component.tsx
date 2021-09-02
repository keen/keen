import React, { FC } from 'react';
import { Layout, Typography, Position, Alignment } from '@keen.io/ui-core';

import SeriesHorizontal from './series-horizontal.component';
import SeriesVertical from './series-vertical.component';

import Label from '../label';

import { DataSerie } from './types';
import { LegendCardSettings } from '../types';

type Props = {
  /** Layout used on list elements */
  layout: Layout;
  /** Legend position in widget */
  position: Position;
  /** Array of legend items */
  alignment: Alignment;
  /* Legend data series */
  dataSeries: DataSerie[];
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
  /** Color palette */
  colorPalette?: string[];
  /** Disabled keys */
  disabledKeys?: string[];
  /** Update visibile data series offset */
  onOffsetUpdate?: (offset: [number, number]) => void;
};

export const SeriesLegend: FC<Props> = ({
  layout,
  dataSeries,
  position,
  alignment,
  typography,
  card,
  onClick,
  onActivate,
  onDeactivate,
  colorPalette,
  disabledKeys,
  onOffsetUpdate,
}) => {
  const commonProps = {
    typography,
    position,
    alignment,
    card,
    colorPalette,
    dataSeries,
  };

  const renderNodes = (
    series: DataSerie[],
    elementRef: React.MutableRefObject<any>,
    itemWidth?: number
  ) =>
    series.map(({ name, color }: DataSerie, index: number) => (
      <div key={name} ref={index === 0 ? elementRef : null}>
        <Label
          text={name}
          maxWidth={itemWidth}
          typography={typography}
          markColor={color}
          onClick={(disabled: boolean, label: string) => {
            onClick(label, disabled, index);
            if (onDeactivate && disabled) onDeactivate();
            if (onActivate && !disabled) onActivate(label);
          }}
          onMouseEnter={(label: string) => {
            if (onActivate) onActivate(label);
          }}
          onMouseLeave={() => {
            onDeactivate && onDeactivate();
          }}
          isDisabled={disabledKeys.includes(name)}
        />
      </div>
    ));

  return (
    <>
      {layout === 'horizontal' ? (
        <SeriesHorizontal
          {...commonProps}
          renderNodes={renderNodes}
          onOffsetUpdate={(offset) => onOffsetUpdate(offset)}
        />
      ) : (
        <SeriesVertical
          {...commonProps}
          renderNodes={renderNodes}
          onOffsetUpdate={(offset) => onOffsetUpdate(offset)}
        />
      )}
    </>
  );
};

export default SeriesLegend;
