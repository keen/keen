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
    storySort: (a, b) => {
      if (a[0].includes('docs-')) {
        if (a[0].includes('intro-')) {
          return -1;
        }

        return 0;
      }

      return 1;
    }
  },
});

configure(require.context('../packages', true, /\.stories\.(tsx$|mdx)/), module);
configure(require.context('../docs', true, /\.mdx/), module);
