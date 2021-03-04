/* eslint-disable react-hooks/rules-of-hooks, @typescript-eslint/naming-convention */
import * as React from 'react';
import KeenAnalysis from 'keen-analysis';
import { colors } from '@keen.io/colors';

import KeenDataViz from '../visualizer';

import { analysisConfig } from '../fixture';

export default {
  title: 'Visualizations /Bar Chart/Dataviz',
  parameters: {
    componentSubtitle: 'Bar charts created with @keen.io/dataviz library',
  },
};

export const singleResult = () => {
  const container = React.useRef(null);

  React.useEffect(() => {
    const client = new KeenAnalysis(analysisConfig);
    const dataviz = new KeenDataViz({
      type: 'bar',
      container: container.current,
      widget: {
        title: {
          content: 'Total purchases',
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

  return <div style={{ width: '600px', height: '300px' }} ref={container} />;
};

export const SimpleResults = () => {
  const container = React.useRef(null);

  React.useEffect(() => {
    const client = new KeenAnalysis(analysisConfig);
    const dataviz = new KeenDataViz({
      type: 'bar',
      container: container.current,
      widget: {
        legend: {
          enabled: true,
        },
        title: {
          content: 'Book purchases',
        },
        subtitle: {
          content: 'Monthly',
        },
      },
      settings: {
        layout: 'horizontal',
      },
    });

    client
      .query({
        analysis_type: 'count',
        event_collection: 'book_purchase',
        timeframe: {
          start: '2019-01-01T00:00:00.000-00:00',
          end: '2019-05-01T16:00:00.000-00:00',
        },
        group_by: ['author'],
        orderBy: { property_name: 'result', direction: 'ASC' },
        interval: 'monthly',
      })
      .then((res: any) => dataviz.render(res));
  }, []);

  return <div style={{ width: '600px', height: '400px' }} ref={container} />;
};

SimpleResults.story = {
  parameters: {
    docs: {
      storyDescription:
        'Results displayed "horizontally" with disabled legend component',
    },
  },
};

export const MultipleResultsPlot = () => {
  const container = React.useRef(null);

  React.useEffect(() => {
    const client = new KeenAnalysis(analysisConfig);
    const dataviz = new KeenDataViz({
      type: 'bar',
      container: container.current,
      widget: {
        title: {
          content: 'Book purchases',
        },
        subtitle: {
          content: 'Different authors',
        },
      },
      settings: {
        barPadding: 0,
        theme: {
          colors: ['#DBD56E', '#88AB75', '#2D93AD', '#2D93AD', '#DE8F6E'],
          axisX: { enabled: false },
          axisY: { enabled: false },
          gridY: { color: '#ddd' },
          gridX: { color: '#ddd' },
          tooltip: {
            mode: 'light',
            labels: { typography: { fontColor: colors.black['500'] } },
            values: { typography: { fontColor: colors.black['500'] } },
          },
        },
      },
    });

    client
      .query({
        analysis_type: 'count',
        event_collection: 'book_purchase',
        timeframe: {
          start: '2019-05-01T00:00:00.000-00:00',
          end: '2019-05-30T16:00:00.000-00:00',
        },
        interval: 'daily',
        group_by: ['author'],
      })
      .then((res: any) => dataviz.render(res));
  }, []);

  return <div style={{ width: '800px', height: '400px' }} ref={container} />;
};

MultipleResultsPlot.story = {
  parameters: {
    docs: {
      storyDescription: 'Multiple results displayed as customized widget',
    },
  },
};

export const MultipleResults = () => {
  const container = React.useRef(null);

  React.useEffect(() => {
    const client = new KeenAnalysis(analysisConfig);
    const dataviz = new KeenDataViz({
      type: 'bar',
      container: container.current,
      widget: {
        title: {
          content: 'Book purchases',
        },
        legend: {
          position: 'left',
          layout: 'vertical',
        },
      },
      settings: {
        barPadding: 0.1,
      },
    });

    client
      .query({
        analysis_type: 'count',
        event_collection: 'book_purchase',
        timeframe: {
          start: '2019-05-01T00:00:00.000-00:00',
          end: '2019-08-01T16:00:00.000-00:00',
        },
        interval: 'monthly',
        group_by: ['author'],
      })
      .then((res: any) => dataviz.render(res));
  }, []);

  return <div style={{ width: '700px', height: '400px' }} ref={container} />;
};

MultipleResults.story = {
  parameters: {
    docs: {
      storyDescription:
        'Multiple results displayed in bar groups with custom padding and X scale label formatter',
    },
  },
};

export const StackedNormal = () => {
  const container = React.useRef(null);

  React.useEffect(() => {
    const client = new KeenAnalysis(analysisConfig);
    const dataviz = new KeenDataViz({
      type: 'bar',
      container: container.current,
      settings: {
        groupMode: 'stacked',
        stackMode: 'normal',
        barPadding: 0.3,
        theme: {
          colors: ['#84DCC6', '#D6EDFF', '#ACD7EC', '#8B95C9', '#478978'],
          tooltip: {
            mode: 'light',
            labels: { typography: { fontColor: colors.black['500'] } },
            values: { typography: { fontColor: colors.black['500'] } },
          },
        },
      },
    });

    client
      .query({
        analysis_type: 'count',
        event_collection: 'book_purchase',
        timeframe: {
          start: '2019-02-01T00:00:00.000-00:00',
          end: '2019-06-01T00:00:00.000-00:00',
        },
        interval: 'monthly',
        group_by: ['author'],
      })
      .then((res: any) => dataviz.render(res));
  }, []);

  return <div style={{ width: '600px', height: '400px' }} ref={container} />;
};

StackedNormal.story = {
  parameters: {
    docs: {
      storyDescription:
        'Stacked results with custom colors and tooltip in "light" mode.',
    },
  },
};

export const StackedPercentage = () => {
  const container = React.useRef(null);

  React.useEffect(() => {
    const client = new KeenAnalysis(analysisConfig);
    const dataviz = new KeenDataViz({
      type: 'bar',
      container: container.current,
      settings: {
        groupMode: 'stacked',
        stackMode: 'percent',
        barPadding: 0.3,
        yScaleSettings: {
          formatLabel: (value: number) => `${value}%`,
        },
      },
    });

    client
      .query({
        analysis_type: 'count',
        event_collection: 'book_purchase',
        timeframe: {
          start: '2019-12-01T00:00:00.000-00:00',
          end: '2020-02-01T16:00:00.000-00:00',
        },
        interval: 'monthly',
        group_by: ['author', 'name'],
      })
      .then((res: any) => dataviz.render(res));
  }, []);

  return <div style={{ width: '600px', height: '400px' }} ref={container} />;
};

StackedPercentage.story = {
  parameters: {
    docs: {
      storyDescription:
        'Results stacked percentage with custom Y scale label formatter',
    },
  },
};

export const Grouped = () => {
  const container = React.useRef(null);

  React.useEffect(() => {
    const client = new KeenAnalysis(analysisConfig);
    const dataviz = new KeenDataViz({
      type: 'bar',
      container: container.current,
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

  return <div style={{ width: '600px', height: '300px' }} ref={container} />;
};

Grouped.story = {
  parameters: {
    docs: {
      storyDescription: 'Results grouped by specific property',
    },
  },
};

export const DoubleGrouped = () => {
  const container = React.useRef(null);

  React.useEffect(() => {
    const client = new KeenAnalysis(analysisConfig);
    const dataviz = new KeenDataViz({
      type: 'bar',
      container: container.current,
      widget: {
        legend: {
          enabled: false,
        },
        title: {
          content: 'Book purchases',
        },
        subtitle: {
          content: 'Most popular authors',
        },
      },
      settings: {
        theme: {
          axisX: {
            labels: {
              radiusAngle: -25,
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
          start: '2020-01-01T00:00:00.000-00:00',
          end: '2020-02-01T16:00:00.000-00:00',
        },
        group_by: ['name', 'author'],
      })
      .then((res: any) => dataviz.render(res));
  }, []);

  return <div style={{ width: '650px', height: '400px' }} ref={container} />;
};

DoubleGrouped.story = {
  parameters: {
    docs: {
      storyDescription: 'Results grouped by two properties',
    },
  },
};

export const GroupedWithInterval = () => {
  const container = React.useRef(null);

  React.useEffect(() => {
    const client = new KeenAnalysis(analysisConfig);
    const dataviz = new KeenDataViz({
      type: 'bar',
      container: container.current,
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

GroupedWithInterval.story = {
  parameters: {
    docs: {
      storyDescription: 'Results grouped by specific property with interval',
    },
  },
};
