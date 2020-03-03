/* eslint-disable react-hooks/rules-of-hooks, @typescript-eslint/camelcase */
import * as React from 'react';
import KeenAnalysis from 'keen-analysis';

import Visualizer from './visualizer';

import { analysisConfig } from './fixture';

export default {
  title: 'DataViz / Pie Charts',
  parameters: {
    componentSubtitle: 'Pie charts created with @keen.io/dataviz library',
  },
};

export const singleResult = () => {
  const container = React.useRef(null);

  React.useEffect(() => {
    const client = new KeenAnalysis(analysisConfig);
    const dataviz = new Visualizer({
      type: 'pie',
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

  return <div style={{ width: '400px', height: '300px' }} ref={container} />;
};

export const simpleResults = () => {
  const container = React.useRef(null);

  React.useEffect(() => {
    const client = new KeenAnalysis(analysisConfig);
    const dataviz = new Visualizer({
      type: 'pie',
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

  return <div style={{ width: '400px', height: '300px' }} ref={container} />;
};

export const multipleResults = () => {
  const container = React.useRef(null);

  React.useEffect(() => {
    const client = new KeenAnalysis(analysisConfig);
    const dataviz = new Visualizer({
      type: 'pie',
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

  return <div style={{ width: '400px', height: '300px' }} ref={container} />;
};
