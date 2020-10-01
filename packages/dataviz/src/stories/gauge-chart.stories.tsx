/* eslint-disable react-hooks/rules-of-hooks, @typescript-eslint/naming-convention */
import * as React from 'react';
import KeenAnalysis from 'keen-analysis';

import KeenDataViz from '../visualizer';

import { analysisConfig } from '../fixture';

export default {
  title: 'Visualizations/Gauge Chart/Dataviz',
  parameters: {
    componentSubtitle: 'Gauge charts created with @keen.io/dataviz library',
  },
};

export const singleResultPercent = () => {
  const container = React.useRef(null);

  React.useEffect(() => {
    const client = new KeenAnalysis(analysisConfig);
    const dataviz = new KeenDataViz({
      type: 'gauge',
      container: container.current,
      settings: {
        maxValue: 10000,
      },
      widget: {
        title: {
          content: 'Books purchases',
        },
        subtitle: {
          content: 'Monthly target',
        },
      },
    });

    client
      .query({
        analysis_type: 'count',
        event_collection: 'book_purchase',
        timeframe: {
          start: '2019-01-01T00:00:00.000-00:00',
          end: '2020-02-01T16:00:00.000-00:00',
        },
      })
      .then((res: any) => dataviz.render(res));
  }, []);

  return <div style={{ width: '300px', height: '350px' }} ref={container} />;
};

export const singleResult = () => {
  const container = React.useRef(null);

  React.useEffect(() => {
    const client = new KeenAnalysis(analysisConfig);
    const dataviz = new KeenDataViz({
      type: 'gauge',
      container: container.current,
      settings: {
        progressType: 'normal',
        formatValue: (v: number) => `${v} books`,
        maxValue: 10000,
        theme: {
          gauge: {
            total: {
              typography: {
                fontSize: 24,
              },
            },
          },
        },
      },
      widget: {
        title: {
          content: 'Books purchases',
        },
        subtitle: {
          content: 'Monthly target',
        },
      },
    });

    client
      .query({
        analysis_type: 'count',
        event_collection: 'book_purchase',
        timeframe: {
          start: '2019-01-01T00:00:00.000-00:00',
          end: '2020-02-01T16:00:00.000-00:00',
        },
      })
      .then((res: any) => dataviz.render(res));
  }, []);

  return <div style={{ width: '300px', height: '350px' }} ref={container} />;
};
