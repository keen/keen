import React, { FC, useRef } from 'react';

import {
  Position,
  Layout,
  Alignment,
  Typography,
  Group,
  CardSettings,
} from '@keen.io/ui-core';

import LegendLabel from './legend-label.component';
import Slider from './legend-slider.component';

import { useRenderMode, ContentDimension, RenderMode } from './legend.utils';

import {
  LegendLayout,
  LegendCard,
  LegendGroup,
  LegendItem,
} from './legend.styles';

type Item = {
  name: string;
  color: string;
};

export const renderLegend = (
  elements: JSX.Element[],
  mode: RenderMode,
  initialDimension: ContentDimension,
  layout: Layout
) => {
  switch (mode) {
    case 'list':
      return <LegendLayout type={layout}>{elements}</LegendLayout>;
    case 'group':
      return (
        <LegendLayout type={layout}>
          <Group groupNode={LegendGroup}>{elements}</Group>
        </LegendLayout>
      );
    case 'slider':
      return (
        <Slider mode={layout} contentDimension={initialDimension}>
          {elements}
        </Slider>
      );
  }
};

type Props = {
  /** Layout used on list elements */
  layout: Layout;
  /** Array of legend items */
  labels: Item[];
  /** typography styles */
  typography: Typography;
  /** Legend card styles */
  card: CardSettings;
  /** Handler for item click event */
  onClick: (key: string, disabled: boolean, index: number) => void;
  /** Position in widget */
  position?: Position;
  /** Legend alignment */
  alignment?: Alignment;
};

/**
- Support two different layouts - horizontal and vertical.
- Automatically adjust render mode based on content.
- Fully customized Typography and Card wrapper.
- Could be used to disable series on chart.
**/
export const Legend: FC<Props> = ({
  layout,
  labels,
  card,
  typography,
  onClick,
  alignment = 'left',
  position = 'top',
}) => {
  const wrapper = useRef(null);
  const overflowMask = useRef(null);

  const items = labels.map(({ name, color }: Item, idx: number) => (
    <LegendItem key={name}>
      <LegendLabel
        typography={typography}
        markColor={color}
        onClick={(disabled: boolean) => onClick(name, disabled, idx)}
        text={name}
      />
    </LegendItem>
  ));

  const element = layout === 'horizontal' ? overflowMask : wrapper;

  const { mode, initialDimension } = useRenderMode(
    element,
    layout,
    position,
    'list'
  );

  return (
    <div ref={wrapper} style={{ width: '100%', height: '100%' }}>
      <LegendCard
        alignment={alignment}
        position={position}
        renderMode={mode}
        layout={layout}
        {...card}
      >
        <div ref={overflowMask} style={{ overflow: 'hidden' }}>
          {renderLegend(items, mode, initialDimension, layout)}
        </div>
      </LegendCard>
    </div>
  );
};

export default Legend;
