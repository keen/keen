/* eslint-disable react-hooks/rules-of-hooks, @typescript-eslint/camelcase */
import * as React from 'react';
import KeenAnalysis from 'keen-analysis';

import KeenDataViz from '../visualizer';

import { analysisConfig } from '../fixture';

export default {
  title: 'Visualizations|Metric Chart/Dataviz',
  parameters: {
    componentSubtitle: 'Metrics created with @keen.io/dataviz library',
  },
};

export const compareMetric = () => {
  const container = React.useRef(null);

  React.useEffect(() => {
    const client = new KeenAnalysis(analysisConfig);

    const dataviz = new KeenDataViz({
      type: 'metric',
      container: container.current,
      widget: {
        title: {
          content: 'Book purchases',
        },
        subtitle: {
          content: 'Last month',
        },
      },
      settings: {
        type: 'compare',
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

  return <div style={{ width: '200px', height: '200px' }} ref={container} />;
};

export const percentMetric = () => {
  const container = React.useRef(null);

  React.useEffect(() => {
    const client = new KeenAnalysis(analysisConfig);

    const dataviz = new KeenDataViz({
      type: 'metric',
      container: container.current,
      widget: {
        card: {
          backgroundColor: '#fafafa',
        },
        title: {
          content: 'Book purchases',
        },
        subtitle: {
          content: 'Percentage',
        },
      },
      settings: {
        type: 'percent',
        labelSuffix: ' Qty.',
      },
    });

    client
      .query({
        analysis_type: 'count',
        event_collection: 'book_purchase',
        timeframe: {
          start: '2020-01-01T00:00:00.000-00:00',
          end: '2020-02-20T00:00:00.000-00:00',
        },
        interval: 'monthly',
      })
      .then((res: any) => dataviz.render(res));
  }, []);

  return <div style={{ width: '300px', height: '200px' }} ref={container} />;
};

export const customizedMetric = () => {
  const container = React.useRef(null);

  React.useEffect(() => {
    const client = new KeenAnalysis(analysisConfig);

    const dataviz = new KeenDataViz({
      type: 'metric',
      container: container.current,
      widget: {
        card: {
          backgroundColor: '#25404E',
        },
        title: {
          content: 'Book purchases',
          typography: {
            fontColor: '#ccc',
          },
        },
        subtitle: {
          content: 'Percentage',
          typography: {
            fontColor: '#ccc',
          },
        },
      },
      settings: {
        type: 'percent',
        labelSuffix: ' Qty.',
        theme: {
          metric: {
            excerpt: {
              backgroundColor: '#213642',
              typography: {
                fontColor: '#ccc',
              },
            },
            label: {
              typography: {
                fontSize: 40,
                fontColor: '#fff',
              },
            },
          },
        },
      },
    });

    client
      .query({
        analysis_type: 'count',
        event_collection: 'book_purchase',
        timeframe: {
          start: '2019-10-01T00:00:00.000-00:00',
          end: '2019-12-01T00:00:00.000-00:00',
        },
        interval: 'monthly',
      })
      .then((res: any) => dataviz.render(res));
  }, []);

  return <div style={{ width: '300px', height: '200px' }} ref={container} />;
};

export const differenceMetric = () => {
  const container = React.useRef(null);

  React.useEffect(() => {
    const client = new KeenAnalysis(analysisConfig);

    const dataviz = new KeenDataViz({
      type: 'metric',
      container: container.current,
      widget: {
        title: {
          content: 'Book purchases',
        },
        subtitle: {
          content: 'Two months difference',
        },
      },
      settings: {
        type: 'difference',
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

  return <div style={{ width: '200px', height: '200px' }} ref={container} />;
};

export const singleMetric = () => {
  const container = React.useRef(null);

  React.useEffect(() => {
    const client = new KeenAnalysis(analysisConfig);

    const dataviz = new KeenDataViz({
      type: 'metric',
      container: container.current,
      widget: {
        title: {
          content: 'Book purchases',
        },
        subtitle: {
          content: 'Last month',
        },
      },
      settings: {
        type: 'compare',
      },
    });

    client
      .query({
        analysis_type: 'count',
        event_collection: 'book_purchase',
        timeframe: 'this_1_month',
      })
      .then((res: any) => dataviz.render(res));
  }, []);

  return <div style={{ width: '200px', height: '160px' }} ref={container} />;
};
