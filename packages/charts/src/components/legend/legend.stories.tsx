import * as React from 'react';
import { action } from '@storybook/addon-actions';
import { colors } from '@keen.io/colors';
import { Typography } from '@keen.io/ui-core';

import { typographyKnobs, cardKnobs } from '@keen.io/storybook-utils';

import { Legend } from './legend.component';
import { labels } from './legend.fixtures';

const legendTypography = {
  fontSize: 12,
  fontFamily: 'Lato Regular',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontColor: colors.black['500'],
};

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
      card={cardKnobs('Card')}
      onClick={action('Legend element click')}
      typography={typographyKnobs('typography', legendTypography as Typography)}
      layout="horizontal"
      labels={labels}
    />
  </div>
);

export const Group = () => (
  <div style={{ width: '500px' }}>
    <Legend
      card={cardKnobs('Card')}
      onClick={action('Legend element click')}
      typography={typographyKnobs('typography', legendTypography as Typography)}
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
      card={cardKnobs('Card')}
      onClick={action('Legend element click')}
      typography={typographyKnobs('typography', legendTypography as Typography)}
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
      card={cardKnobs('Card')}
      onClick={action('Legend element click')}
      typography={typographyKnobs('typography', legendTypography as Typography)}
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
      card={cardKnobs('Card')}
      onClick={action('Legend element click')}
      typography={typographyKnobs('typography', legendTypography as Typography)}
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
