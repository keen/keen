import { configure, addParameters } from '@storybook/react';

import theme from './theme';

const req = require.context('../src/', true, /.stories.tsx$/);

function loadStories() {
  req.keys().forEach(req);
}

addParameters({
  options: {
    theme,
  },
});

configure(loadStories, module);
