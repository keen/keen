import * as React from 'react';
import { select } from '@storybook/addon-knobs';

import { TooltipMode } from '../tooltip';
import MousePositionedTooltip from './mouse-positioned-tooltip';

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

export const LightMode = () => (
  <div>
    <MousePositionedTooltip
      tooltipTheme={
        select('Mode', options.mode, options.mode.light, 'Mode') as TooltipMode
      }
      isActive={true}
      renderContent={() => <p>This is a description</p>}
    >
      Hover on this text to show tooltip
    </MousePositionedTooltip>
  </div>
);

LightMode.story = {
  parameters: {
    docs: {
      storyDescription: 'Tooltip displayed in `light mode`',
    },
  },
};

export const DarkMode = () => (
  <div>
    <MousePositionedTooltip
      tooltipTheme={
        select('Mode', options.mode, options.mode.dark, 'Mode') as TooltipMode
      }
      isActive={true}
      renderContent={() => <p>This is a description</p>}
    >
      Hover on this text to show tooltip
    </MousePositionedTooltip>
  </div>
);

DarkMode.story = {
  parameters: {
    docs: {
      storyDescription: 'Tooltip displayed in `dark mode`',
    },
  },
};
