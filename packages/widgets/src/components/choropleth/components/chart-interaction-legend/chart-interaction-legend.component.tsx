import { Icon } from '@keen.io/icons';
import { colors } from '@keen.io/colors';
import React from 'react';
import { InteractionLegendWrapper } from './chart-interaction-legend.styles';
import { MousePositionedTooltip } from '@keen.io/ui-core';
import { BodyText } from '@keen.io/typography';

const chartInteractionTooltip = (text: string) => (
  <BodyText variant="body3" fontWeight="normal">
    {text}
  </BodyText>
);

const ChartInteractionLegend = () => (
  <InteractionLegendWrapper>
    <MousePositionedTooltip
      isActive
      tooltipPinPlacement="top-left"
      tooltipTheme="light"
      renderContent={() =>
        chartInteractionTooltip('Drag and drop to move the map.')
      }
    >
      <Icon type="move" fill={colors.black[500]} width={11} height={11} />
    </MousePositionedTooltip>
    <MousePositionedTooltip
      isActive
      tooltipPinPlacement="top-left"
      tooltipTheme="light"
      renderContent={() =>
        chartInteractionTooltip('Scroll to zoom-in or zoom-out.')
      }
    >
      <Icon type="zoom" fill={colors.black[500]} width={11} height={11} />
    </MousePositionedTooltip>
  </InteractionLegendWrapper>
);

export default ChartInteractionLegend;
