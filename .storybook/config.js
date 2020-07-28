import React from 'react';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';
import { configure, addParameters, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withPerformance } from 'storybook-addon-performance';

import theme from './theme';

addDecorator(withKnobs);
addDecorator(withPerformance);

addParameters({
  docs: {
    container: DocsContainer,
    page: DocsPage,
  },
  options: {
    theme,
    showPanel: true,
    panelPosition: 'right',
    storySort: (a, b) => {
      if (a[0].includes('description-')) return -1;
      if (a[0].includes('introduction-')) return -5;
      if (a[0].includes('docs-charts-')) return -4;
      if (a[0].includes('docs-widgets-')) return -3;
      if (a[0].includes('dataviz-')) return 0;
      return 1;
    }
  },
});

const setStories = () => {
  return [
    require.context('../docs', true, /readme-intro.mdx/),
    require.context('../docs', true, /charts-intro.mdx/),
    require.context('../docs', true, /widgets-intro.mdx/),
    require.context('../docs', true, /dataviz-intro.mdx/),
    require.context('../docs', true, /theme-intro.mdx/),
    require.context('../docs/charts', true, /\.mdx/),
    require.context('../packages', true, /\.stories\.(tsx$|mdx)/)
  ];
}

configure(setStories(), module);
