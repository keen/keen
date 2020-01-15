import React from 'react';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';
import { configure, addParameters, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import theme from './theme';

addDecorator(withKnobs);

addParameters({
  docs: {
    container: DocsContainer,
    page: DocsPage,
  },
  options: {
    theme,
    showPanel: true,
    panelPosition: 'right',
  },
});

configure(require.context('../packages', true, /\.stories\.tsx$/), module);
