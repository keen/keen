/* eslint-disable react-hooks/rules-of-hooks, @typescript-eslint/camelcase */
import * as React from 'react';
import KeenAnalysis from 'keen-analysis';

import KeenDataViz from '../visualizer';

import { analysisConfig } from '../fixture';

export default {
  title: 'Visualizations|Line Chart/Dataviz',
  parameters: {
    componentSubtitle: 'Line charts created with @keen.io/dataviz library',
  },
};

export const simpleResults = () => {
  const container = React.useRef(null);

  React.useEffect(() => {
    const client = new KeenAnalysis(analysisConfig);
    const dataviz = new KeenDataViz({
      type: 'line',
      container: container.current,
      widget: {
        title: {
          content: 'Book purchases',
        },
        subtitle: {
          content: 'hourly',
        },
      },
      settings: {
        margins: { top: 30, left: 45, right: 30, bottom: 60 },
        theme: {
          axisX: {
            labels: {
              radiusAngle: 60,
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
          start: '2020-02-01T00:00:00.000-00:00',
          end: '2020-02-01T16:00:00.000-00:00',
        },
        interval: 'hourly',
      })
      .then((res: any) => dataviz.render(res));
  }, []);

  return <div style={{ width: '700px', height: '500px' }} ref={container} />;
};

export const multipleResultsSpline = () => {
  const container = React.useRef(null);

  React.useEffect(() => {
    const client = new KeenAnalysis(analysisConfig);
    const dataviz = new KeenDataViz({
      type: 'line',
      container: container.current,
      widget: {
        title: {
          content: 'Book purchases',
        },
        subtitle: {
          content: 'Multiple results',
        },
      },
      settings: {
        margins: { top: 20, left: 45, right: 15, bottom: 30 },
        curve: 'spline',
        theme: {
          axisY: {
            tickPadding: 13,
          },
        },
      },
    });

    client
      .query({
        analysis_type: 'count',
        event_collection: 'book_purchase',
        timeframe: {
          start: '2019-08-01T00:00:00.000-00:00',
          end: '2020-02-01T00:00:00.000-00:00',
        },
        group_by: ['author'],
        interval: 'monthly',
      })
      .then((res: any) => dataviz.render(res));
  }, []);

  return <div style={{ width: '700px', height: '500px' }} ref={container} />;
};

export const multiAnalysys = () => {
  const container = React.useRef(null);

  React.useEffect(() => {
    const client = new KeenAnalysis({
      projectId: '5c87b64ec9e77c0001cf5b6e',
      readKey:
        'FB952962910C97DE3E1C6A25EB2FC6B22FDB1ACA9D572948EA18227287BC4E12',
    });

    const dataviz = new KeenDataViz({
      type: 'line',
      container: container.current,
      mappings: {
        '0.users.maximum.keen.value': 'Maximum',
        '1.users.average.keen.value': 'Average',
        '2.users.minimum.keen.value': 'Minimum',
      },
      widget: {
        title: {
          content: 'Website users age',
        },
        subtitle: {
          content: 'Maximum, minimum and average',
        },
      },
    });

    const countMin = client.query({
      analysis_type: 'minimum',
      target_property: 'age',
      event_collection: 'users',
      timeframe: {
        start: '2019-03-10T00:00:00.000-00:00',
        end: '2019-03-17T00:00:00.000-00:00',
      },
      interval: 'daily',
    });

    const countAverage = client.query({
      analysis_type: 'average',
      target_property: 'age',
      event_collection: 'users',
      timeframe: {
        start: '2019-03-10T00:00:00.000-00:00',
        end: '2019-03-17T00:00:00.000-00:00',
      },
      interval: 'daily',
    });

    const countMax = client.query({
      event_collection: 'users',
      analysis_type: 'maximum',
      target_property: 'age',
      timeframe: {
        start: '2019-03-10T00:00:00.000-00:00',
        end: '2019-03-17T00:00:00.000-00:00',
      },
      interval: 'daily',
    });

    client
      .run([countMax, countAverage, countMin])
      .then((res: any) => dataviz.render(res));
  }, []);

  return <div style={{ width: '700px', height: '500px' }} ref={container} />;
};

export const multipleResultsStep = () => {
  const container = React.useRef(null);

  React.useEffect(() => {
    const client = new KeenAnalysis(analysisConfig);
    const dataviz = new KeenDataViz({
      type: 'line',
      container: container.current,
      widget: {
        title: {
          content: 'Book purchases',
        },
        subtitle: {
          content: 'Multiple results',
        },
      },
      settings: {
        margins: { top: 20, left: 45, right: 15, bottom: 30 },
        curve: 'step',
        theme: {
          axisY: {
            tickPadding: 13,
          },
        },
      },
    });

    client
      .query({
        analysis_type: 'count',
        event_collection: 'book_purchase',
        timeframe: {
          start: '2019-08-01T00:00:00.000-00:00',
          end: '2020-02-01T00:00:00.000-00:00',
        },
        group_by: ['author'],
        interval: 'monthly',
      })
      .then((res: any) => dataviz.render(res));
  }, []);

  return <div style={{ width: '700px', height: '500px' }} ref={container} />;
};

export const StackedNormalSpline = () => {
  const container = React.useRef(null);

  React.useEffect(() => {
    const client = new KeenAnalysis(analysisConfig);
    const dataviz = new KeenDataViz({
      type: 'line',
      container: container.current,
      widget: {
        title: {
          content: 'Book purchases',
        },
        subtitle: {
          content: 'Spline',
        },
      },
      settings: {
        margins: { top: 20, left: 45, right: 25, bottom: 30 },
        curve: 'spline',
        groupMode: 'stacked',
        stackMode: 'normal',
        theme: {
          axisY: {
            tickPadding: 13,
          },
        },
      },
    });

    client
      .query({
        analysis_type: 'count',
        event_collection: 'book_purchase',
        timeframe: {
          start: '2018-01-01T00:00:00.000-00:00',
          end: '2020-02-01T00:00:00.000-00:00',
        },
        group_by: ['author', 'name'],
        interval: 'yearly',
      })
      .then((res: any) => dataviz.render(res));
  }, []);

  return <div style={{ width: '700px', height: '500px' }} ref={container} />;
};

export const StackedNormalStep = () => {
  const container = React.useRef(null);

  React.useEffect(() => {
    const client = new KeenAnalysis(analysisConfig);
    const dataviz = new KeenDataViz({
      type: 'line',
      container: container.current,
      widget: {
        title: {
          content: 'Book purchases',
        },
        subtitle: {
          content: 'Stacked results',
        },
      },
      settings: {
        curve: 'step',
        groupMode: 'stacked',
        stackMode: 'normal',
        margins: { top: 20, left: 45, right: 15, bottom: 30 },
        theme: {
          axisY: {
            tickPadding: 13,
          },
        },
      },
    });

    client
      .query({
        analysis_type: 'count',
        event_collection: 'book_purchase',
        timeframe: {
          start: '2018-01-01T00:00:00.000-00:00',
          end: '2020-02-10T00:00:00.000-00:00',
        },
        group_by: ['author', 'name'],
        interval: 'yearly',
      })
      .then((res: any) => dataviz.render(res));
  }, []);

  return <div style={{ width: '700px', height: '500px' }} ref={container} />;
};
