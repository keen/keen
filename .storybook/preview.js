import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';
import { addParameters, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withPerformance } from 'storybook-addon-performance';

addDecorator(withKnobs);
addDecorator(withPerformance);

addParameters({
  docs: {
    container: DocsContainer,
    page: DocsPage,
  },
  options: {
    showPanel: true,
    panelPosition: 'right',
    storySort: {
      order: ['Docs', 'Visualizations', 'Forms', 'Others']
    }
  },
});

