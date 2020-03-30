import * as React from 'react';
import styled from 'styled-components';

import { action } from '@storybook/addon-actions';
import { colors } from '@keen.io/colors';
<<<<<<< HEAD
import { Slider, Typography } from '@keen.io/ui-core';
=======
import { Typography, Card } from '@keen.io/ui-core';
>>>>>>> refactor: 💡 legend refactoring

import { typographyKnobs, cardKnobs } from '@keen.io/storybook-utils';

import { SeriesLegend } from './series/series.component';
import { labels } from './legend.fixtures';

const legendTypography = {
  fontSize: 12,
  fontFamily: 'Lato Regular',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontColor: colors.black['500'],
};

const Grid = styled.div`
  padding: 15px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 100px;
  grid-gap: 20px;
  grid-row-gap: 15px;
`;

const GridItem = styled.div`
  background: #ccc;
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 4;
  min-height: 0; /* NEW */
  min-width: 0; /* NEW; needed for Firefox */
`;

const GridItem2 = styled.div`
  background: #ccc;
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 4;
`;

const GridItem3 = styled.div`
  background: #ccc;
  grid-column-start: 3;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 4;
`;

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
      storyDescription: 'Horizontal `layout` with grouped legend items.',
    },
  },
};

export const GroupSlider = () => (
  <Grid>
    <GridItem2>1</GridItem2>
    <GridItem>
      <Card>
        <div>
          <SeriesLegend
            position="top"
            card={cardKnobs('Card')}
            onClick={action('Legend element click')}
            typography={typographyKnobs(
              'typography',
              legendTypography as Typography
            )}
            layout="horizontal"
            labels={labels}
          />
        </div>
      </Card>
    </GridItem>
    <GridItem3>2</GridItem3>
  </Grid>
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
      storyDescription:
        'Vertical `layout` with legend items displayed in single column.',
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
        'Vertical `layout` with legend items displayed as slider.',
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
  <div style={{ width: '260px', height: '130px' }}>
    <Legend
      card={cardKnobs('Card')}
      typography={typographyKnobs('typography', legendTypography as Typography)}
      layout="vertical"
    >
      <Slider
        colors={colorArray}
        controls={{ number: 2 }}
        ruler={{ enabled: false }}
      />
    </Legend>
  </div>
);

RangeSlider.story = {
  parameters: {
    docs: {
      storyDescription:
        'Vertical `layout` with legend items displayed as slider.',
    },
  },
};
