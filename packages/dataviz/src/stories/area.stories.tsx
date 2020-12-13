/* eslint-disable react-hooks/rules-of-hooks, @typescript-eslint/naming-convention */
import * as React from 'react';
import KeenAnalysis from 'keen-analysis';

import KeenDataViz from '../visualizer';

import { analysisConfig } from '../fixture';

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
    const dataviz = new KeenDataViz({
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
        timeframe: 'last_2_years',
        interval: 'every_110_days',
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
    const dataviz = new KeenDataViz({
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

export const ImageExport = () => {
  const container = React.useRef(null);
  const dataviz = React.useRef(null);

  React.useEffect(() => {
    const client = new KeenAnalysis(analysisConfig);
    dataviz.current = new KeenDataViz({
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
      .then((res: any) => dataviz.current.render(res));
  }, []);

  return (
    <>
      <div style={{ width: '700px', height: '500px' }} ref={container} />
      <button onClick={() => dataviz.current.exportImage()}>
        Export to image
      </button>
    </>
  );
};
