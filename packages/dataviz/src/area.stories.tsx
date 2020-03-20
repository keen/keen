/* eslint-disable react-hooks/rules-of-hooks, @typescript-eslint/camelcase */
import * as React from 'react';
import KeenAnalysis from 'keen-analysis';

import Visualizer from './visualizer';

import { analysisConfig } from './fixture';

export default {
  title: 'Visualizations|Area Chart/Dataviz',
  parameters: {
    componentSubtitle: 'Area charts created with @keen.io/dataviz library',
  },
};

export const simpleResults = () => {
  const container = React.useRef(null);

  React.useEffect(() => {
    const client = new KeenAnalysis(analysisConfig);
    const dataviz = new Visualizer({
      type: 'area',
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
    const dataviz = new Visualizer({
      type: 'area',
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

export const multipleResultsStep = () => {
  const container = React.useRef(null);

  React.useEffect(() => {
    const client = new KeenAnalysis(analysisConfig);
    const dataviz = new Visualizer({
      type: 'area',
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
    const dataviz = new Visualizer({
      type: 'area',
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
    const dataviz = new Visualizer({
      type: 'area',
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
