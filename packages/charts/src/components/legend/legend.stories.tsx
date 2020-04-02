import * as React from 'react';
import { action } from '@storybook/addon-actions';
import { colors } from '@keen.io/colors';
import { Slider, Typography } from '@keen.io/ui-core';

import { typographyKnobs, cardKnobs } from '@keen.io/storybook-utils';

import LegendBase from './legend-base.component';
import BubbleLegend from './bubble';
import { SeriesLegend } from './series/series.component';
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
    component: SeriesLegend,
    componentSubtitle: 'Displays information about chart data series',
  },
};

export const Row = () => (
  <div style={{ width: '650px' }}>
    <SeriesLegend
      position="top"
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
    <SeriesLegend
      position="top"
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
      storyDescription: 'Grouped data series.',
    },
  },
};

export const GroupSlider = () => (
  <div style={{ width: '270px' }}>
    <SeriesLegend
      position="top"
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
      storyDescription: 'Grouped data series displayed as slider.',
    },
  },
};

export const Column = () => (
  <div style={{ width: '280px' }}>
    <SeriesLegend
      card={cardKnobs('Card')}
      position="left"
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
      storyDescription: 'Data series displayed in single column.',
    },
  },
};

export const ColumnSlider = () => (
  <div style={{ width: '260px', height: '120px', background: 'red' }}>
    <SeriesLegend
      position="top"
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
        'Vertical `layout` with data series displayed as column slider.',
    },
  },
};

const colorArray = [
  colors.lightBlue[500],
  colors.orange[500],
  colors.yellow[500],
  colors.green[500],
  colors.pink[500],
];

export const RangeSlider = () => (
  <div style={{ width: '260px', height: '60px' }}>
    <LegendBase
      card={cardKnobs('Card') as any}
      typography={typographyKnobs('typography', legendTypography as Typography)}
      layout="vertical"
    >
      <Slider
        colors={colorArray}
        controls={{ number: 2 }}
        ruler={{ enabled: false }}
      />
    </LegendBase>
  </div>
);

RangeSlider.story = {
  parameters: {
    docs: {
      storyDescription: 'Legend series displayed as range slider.',
    },
  },
};

export const Bubble = () => (
  <div style={{ width: '300px', height: '150px' }}>
    <BubbleLegend
      minRadius={5}
      maxRadius={40}
      domain={[100, 200]}
      typography={typographyKnobs('typography', legendTypography as Typography)}
      title={{
        value: 'Bubble chart legend',
        typography: typographyKnobs('title', legendTypography as Typography),
      }}
    />
  </div>
);

Bubble.story = {
  parameters: {
    docs: {
      storyDescription: 'Displays information about bubble chart data series',
    },
  },
};
