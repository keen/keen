import { Icon } from '@keen.io/icons';
import { colors } from '@keen.io/colors';
import React from 'react';
import { InteractionLegendWrapper } from './chart-interaction-legend.styles';
import { MousePositionedTooltip } from '@keen.io/ui-core';
import { BodyText } from '@keen.io/typography';

const chartInteractionTooltip = (text: string) => (
  <BodyText variant="body3" fontWeight="normal" color={colors.white[500]}>
    {text}
  </BodyText>
);

const ChartInteractionLegend = () => (
  <InteractionLegendWrapper>
    <MousePositionedTooltip
      isActive
      tooltipTheme="dark"
      renderContent={() =>
        chartInteractionTooltip('Drag and drop to move the map.')
      }
    >
      <Icon type="move" fill={colors.black[500]} width={11} height={11} />
    </MousePositionedTooltip>
    <MousePositionedTooltip
      isActive
      tooltipTheme="dark"
      renderContent={() =>
        chartInteractionTooltip('Scroll to zoom-in or zoom-out.')
      }
    >
      <Icon type="zoom" fill={colors.black[500]} width={11} height={11} />
    </MousePositionedTooltip>
  </InteractionLegendWrapper>
);

export default ChartInteractionLegend;
