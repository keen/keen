/* eslint-disable react-hooks/rules-of-hooks, @typescript-eslint/naming-convention */
import * as React from 'react';
import KeenAnalysis from 'keen-analysis';
import { colors } from '@keen.io/colors';

import KeenDataViz from '../visualizer';

import { analysisConfig } from '../fixture';
import { query } from './line-chart.fixtures';

export default {
  title: 'Visualizations /Line Chart/Dataviz',
  parameters: {
    componentSubtitle: 'Line charts created with @keen.io/dataviz library',
  },
};

/* Asia/Colombo UTC +05:30 / (330) minutes */
export const simpleResults = () => {
  const container = React.useRef(null);

  React.useEffect(() => {
    const client = new KeenAnalysis(analysisConfig);
    const dataviz = new KeenDataViz({
      type: 'line',
      container: container.current,
      presentationTimezone: 'Asia/Colombo',
      widget: {
        title: {
          content: 'Book purchases',
        },
        subtitle: {
          content: 'hourly',
        },
      },
    });

    client
      .query({
        analysis_type: 'count',
        event_collection: 'book_purchase',
        timeframe: {
          start: '2020-02-01T12:00:00.000+05:30',
          end: '2020-02-01T16:00:00.000+05:30',
        },
        interval: 'every_5_minutes',
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

export const ColorsOutOfRange = () => {
  const container = React.useRef(null);

  React.useEffect(() => {
    const client = new KeenAnalysis(analysisConfig);
    const dataviz = new KeenDataViz({
      type: 'line',
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

export const SliderLegendHorizontal = () => {
  const container = React.useRef(null);

  React.useEffect(() => {
    const dataviz = new KeenDataViz({
      type: 'line',
      container: container.current,
    });

    dataviz.render(query);
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
    const dataviz = new KeenDataViz({
      type: 'line',
      container: container.current,
      widget: {
        legend: {
          position: 'left',
          layout: 'vertical',
        },
      },
    });

    dataviz.render(query);
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
