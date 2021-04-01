import * as React from 'react';
import { select } from '@storybook/addon-knobs';
import { colors } from '@keen.io/colors';

import { TooltipMode } from '../tooltip';
import MousePositionedTooltip from './mouse-positioned-tooltip';
import { BodyText } from '@keen.io/typography';
import styled from 'styled-components';

export default {
  title: 'Components / Mouse Positioned Tooltip',
  parameters: {
    component: MousePositionedTooltip,
    componentSubtitle: 'Displays mouse positioned tooltip',
  },
};

const options = {
  mode: {
    none: 'none',
    light: 'light',
    dark: 'dark',
  },
};

const Wrapper = styled.div`
  width: 250px;
`;

export const LightMode = () => (
  <Wrapper>
    <MousePositionedTooltip
      tooltipTheme={
        select('Mode', options.mode, options.mode.light, 'Mode') as TooltipMode
      }
      isActive={true}
      renderContent={() => (
        <BodyText variant="body3" fontWeight={400} color={colors.black[500]}>
          This is a description
        </BodyText>
      )}
    >
      <BodyText variant="body2">Hover on this text to show tooltip</BodyText>
    </MousePositionedTooltip>
  </Wrapper>
);

LightMode.story = {
  parameters: {
    docs: {
      storyDescription: 'Tooltip displayed in `light mode`',
    },
  },
};

export const DarkMode = () => (
  <Wrapper>
    <MousePositionedTooltip
      tooltipTheme={
        select('Mode', options.mode, options.mode.dark, 'Mode') as TooltipMode
      }
      isActive={true}
      renderContent={() => (
        <BodyText variant="body3" fontWeight={400} color={colors.white[500]}>
          This is a description
        </BodyText>
      )}
    >
      <BodyText variant="body2">Hover on this text to show tooltip</BodyText>
    </MousePositionedTooltip>
  </Wrapper>
);

DarkMode.story = {
  parameters: {
    docs: {
      storyDescription: 'Tooltip displayed in `dark mode`',
    },
  },
};
