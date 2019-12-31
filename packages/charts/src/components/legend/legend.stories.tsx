import * as React from 'react';
import { action } from '@storybook/addon-actions';

import { createTyphographyKnobs, createCardKnobs } from '@keen/storybook-utils';

import { Legend } from './legend.component';
import { labels } from './legend.fixtures';

export default {
  title: 'Components / Legend',
  parameters: {
    component: Legend,
    componentSubtitle: 'Displays information about chart data series',
  },
};

export const Row = () => (
  <div style={{ width: '650px' }}>
    <Legend
      card={createCardKnobs('Card')}
      onClick={action('Legend element click')}
      typhography={createTyphographyKnobs('Typhography')}
      layout="horizontal"
      labels={labels}
    />
  </div>
);

export const Group = () => (
  <div style={{ width: '500px' }}>
    <Legend
      card={createCardKnobs('Card')}
      onClick={action('Legend element click')}
      typhography={createTyphographyKnobs('Typhography')}
      layout="horizontal"
      labels={labels}
    />
  </div>
);

Group.story = {
  parameters: {
    docs: {
      storyDescription: 'Horizontal `layout` with grouped legend items.',
    },
  },
};

export const GroupSlider = () => (
  <div style={{ width: '400px' }}>
    <Legend
      card={createCardKnobs('Card')}
      onClick={action('Legend element click')}
      typhography={createTyphographyKnobs('Typhography')}
      layout="horizontal"
      labels={labels}
    />
  </div>
);

GroupSlider.story = {
  parameters: {
    docs: {
      storyDescription:
        'Horizontal `layout` with grouped legend items displayed in slider.',
    },
  },
};

export const Column = () => (
  <div style={{ width: '280px' }}>
    <Legend
      card={createCardKnobs('Card')}
      onClick={action('Legend element click')}
      typhography={createTyphographyKnobs('Typhography')}
      layout="vertical"
      labels={labels}
    />
  </div>
);

Column.story = {
  parameters: {
    docs: {
      storyDescription:
        'Vertical `layout` with legend items displayed in single column.',
    },
  },
};

export const ColumnSlider = () => (
  <div style={{ width: '260px', height: '130px' }}>
    <Legend
      card={createCardKnobs('Card')}
      onClick={action('Legend element click')}
      typhography={createTyphographyKnobs('Typhography')}
      layout="vertical"
      labels={labels}
    />
  </div>
);

ColumnSlider.story = {
  parameters: {
    docs: {
      storyDescription:
        'Vertical `layout` with legend items displayed as slider.',
    },
  },
};
