/* eslint-disable react-hooks/rules-of-hooks, @typescript-eslint/naming-convention */
import * as React from 'react';
import KeenAnalysis from 'keen-analysis';
import { colors } from '@keen.io/colors';

import KeenDataViz from '../visualizer';

import { analysisConfig } from '../fixture';

import { query } from './circular-chart.fixtures';

export default {
  title: 'Visualizations /Donut Chart/Dataviz',
  parameters: {
    componentSubtitle: 'Donut charts created with @keen.io/dataviz library',
  },
};

export const singleResult = () => {
  const container = React.useRef(null);

  React.useEffect(() => {
    const client = new KeenAnalysis(analysisConfig);
    const dataviz = new KeenDataViz({
      type: 'donut',
      container: container.current,
      widget: {
        title: {
          content: 'Book purchases',
        },
      },
    });

    client
      .query({
        analysis_type: 'count',
        event_collection: 'book_purchase',
        timeframe: {
          start: '2020-01-01T00:00:00.000-00:00',
          end: '2020-02-01T16:00:00.000-00:00',
        },
      })
      .then((res: any) => dataviz.render(res));
  }, []);

  return <div style={{ width: '500px', height: '500px' }} ref={container} />;
};

export const simpleResults = () => {
  const container = React.useRef(null);

  React.useEffect(() => {
    const client = new KeenAnalysis(analysisConfig);
    const dataviz = new KeenDataViz({
      type: 'donut',
      container: container.current,
      widget: {
        title: {
          content: 'Book purchases',
        },
      },
    });

    client
      .query({
        analysis_type: 'count',
        event_collection: 'book_purchase',
        timeframe: {
          start: '2020-01-01T00:00:00.000-00:00',
          end: '2020-02-01T16:00:00.000-00:00',
        },
        interval: 'monthly',
      })
      .then((res: any) => dataviz.render(res));
  }, []);

  return <div style={{ width: '500px', height: '500px' }} ref={container} />;
};

export const multipleResults = () => {
  const container = React.useRef(null);

  React.useEffect(() => {
    const client = new KeenAnalysis(analysisConfig);
    const dataviz = new KeenDataViz({
      type: 'donut',
      container: container.current,
      widget: {
        title: {
          content: 'Book purchases',
        },
      },
    });

    client
      .query({
        analysis_type: 'count',
        event_collection: 'book_purchase',
        timeframe: {
          start: '2020-01-01T00:00:00.000-00:00',
          end: '2020-02-01T16:00:00.000-00:00',
        },
        group_by: ['name'],
      })
      .then((res: any) => dataviz.render(res));
  }, []);

  return <div style={{ width: '500px', height: '500px' }} ref={container} />;
};

export const multipleResultOthersSlice = () => {
  const container = React.useRef(null);

  React.useEffect(() => {
    const dataviz = new KeenDataViz({
      type: 'donut',
      container: container.current,
      widget: {
        title: {
          content: 'Purchases',
        },
      },
    });

    dataviz.render(query);
  }, []);

  return <div style={{ width: '600px', height: '450px' }} ref={container} />;
};

export const ColorsOutOfRange = () => {
  const container = React.useRef(null);

  React.useEffect(() => {
    const client = new KeenAnalysis(analysisConfig);
    const dataviz = new KeenDataViz({
      type: 'donut',
      container: container.current,
      settings: {
        theme: {
          colors: [colors.lightBlue[500], colors.orange[500]],
        },
      },
    });

    client
      .query({
        analysis_type: 'count',
        event_collection: 'book_purchase',
        timeframe: {
          start: '2020-01-01T00:00:00.000-00:00',
          end: '2020-02-01T16:00:00.000-00:00',
        },
        group_by: ['name'],
        interval: 'weekly',
      })
      .then((res: any) => dataviz.render(res));
  }, []);

  return <div style={{ width: '600px', height: '300px' }} ref={container} />;
};

ColorsOutOfRange.story = {
  parameters: {
    docs: {
      storyDescription:
        'Chart shows example when only two colors are available',
    },
  },
};

const data = [
  { name: 'Da Vinci Code,The', result: 3 },
  { name: 'Harry Potter and the Deathly Hallows	', result: 52 },
  { name: 'Fifty Shades of Grey', result: 12 },
  { name: 'Angels and Demons', result: 24 },
  {
    name: 'Harry Potter and the Half-blood Prince:Childrens Edition',
    result: 33,
  },
  { name: 'Twilight', result: 12 },
  { name: 'Girl with the Dragon Tattoo,The:Millennium Trilogy', result: 43 },
  { name: 'Lost Symbol,The', result: 32 },
  { name: 'New Moon', result: 24 },
  { name: 'Deception Point', result: 4 },
  { name: 'Eclipse', result: 1 },
  { name: 'Lovely Bones,The', result: 31 },
  { name: 'Curious Incident of the Dog in the Night-time,The', result: 12 },
  { name: 'Digital Fortress', result: 56 },
  {
    name: 'Very Hungry Caterpillar,The:The Very Hungry Caterpillar',
    result: 1,
  },
  { name: 'Gruffalo,The', result: 32 },
  { name: 'One Day', result: 5 },
];

export const SliderLegendHorizontal = () => {
  const container = React.useRef(null);

  React.useEffect(() => {
    new KeenDataViz({
      type: 'donut',
      container: container.current,
      settings: {
        data,
        labelSelector: 'name',
        keys: ['result'],
      },
    }).render();
  }, []);

  return <div style={{ width: '600px', height: '300px' }} ref={container} />;
};

SliderLegendHorizontal.story = {
  parameters: {
    docs: {
      storyDescription:
        'Chart shows example when only two colors are available',
    },
  },
};

export const SliderLegendVertical = () => {
  const container = React.useRef(null);

  React.useEffect(() => {
    new KeenDataViz({
      type: 'donut',
      container: container.current,
      settings: {
        data,
        labelSelector: 'name',
        keys: ['result'],
      },
      widget: {
        legend: {
          position: 'left',
          layout: 'vertical',
        },
      },
    }).render();
  }, []);

  return <div style={{ width: '600px', height: '300px' }} ref={container} />;
};

SliderLegendVertical.story = {
  parameters: {
    docs: {
      storyDescription:
        'Chart shows example when only two colors are available',
    },
  },
};
