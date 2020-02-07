/* eslint-disable react-hooks/rules-of-hooks, @typescript-eslint/camelcase */
import * as React from 'react';
import KeenAnalysis from 'keen-analysis';

import Visualizer from './visualizer';

import { analysisConfig } from './fixture';

export default {
  title: 'DataViz / Line Charts',
  parameters: {
    componentSubtitle: 'Line charts created with @keen.io/dataviz library',
  },
};

export const simpleResults = () => {
  const container = React.useRef(null);

  React.useEffect(() => {
    const client = new KeenAnalysis(analysisConfig);
    const dataviz = new Visualizer({
      type: 'line',
      container: container.current,
      widget: {
        title: 'Mobile purchases',
        subtitle: 'Total',
      },
    });

    client
      .query({
        analysis_type: 'count',
        event_collection: 'mobile_purchases',
        timeframe: {
          start: '2019-03-20T00:00:00.000-00:00',
          end: '2019-03-26T00:00:00.000-00:00',
        },
        interval: 'daily',
      })
      .then((res: any) => dataviz.render(res));
  }, []);

  return <div style={{ width: '600px', height: '300px' }} ref={container} />;
};

export const multipleResults = () => {
  const container = React.useRef(null);

  React.useEffect(() => {
    const client = new KeenAnalysis(analysisConfig);
    const dataviz = new Visualizer({
      type: 'line',
      container: container.current,
    });

    client
      .query({
        analysis_type: 'count',
        event_collection: 'mobile_purchases',
        timeframe: {
          start: '2019-03-20T00:00:00.000-00:00',
          end: '2019-03-26T00:00:00.000-00:00',
        },
        group_by: ['product.name'],
        interval: 'daily',
      })
      .then((res: any) => dataviz.render(res));
  }, []);

  return <div style={{ width: '600px', height: '300px' }} ref={container} />;
};
