/* eslint-disable react-hooks/rules-of-hooks, @typescript-eslint/camelcase */
import * as React from 'react';
import KeenAnalysis from 'keen-analysis';

import Visualizer from './visualizer';

import { analysisConfig } from './fixture';

export default {
  title: 'DataViz / Bar Charts',
  parameters: {
    componentSubtitle: 'Bar charts created with @keen.io/dataviz library',
  },
};

export const singleResult = () => {
  const container = React.useRef(null);

  React.useEffect(() => {
    const client = new KeenAnalysis(analysisConfig);
    const dataviz = new Visualizer({
      type: 'bar',
      container: container.current,
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
    const dataviz = new Visualizer({
      type: 'bar',
      container: container.current,
      settings: {
        margins: { top: 30, left: 50, bottom: 40, right: 10 },
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
        interval: 'monthly',
      })
      .then((res: any) => dataviz.render(res));
  }, []);

  return <div style={{ width: '600px', height: '300px' }} ref={container} />;
};

SimpleResults.story = {
  parameters: {
    docs: {
      storyDescription: 'Results displayed "horizontally"',
    },
  },
};

export const MultipleResults = () => {
  const container = React.useRef(null);

  React.useEffect(() => {
    const client = new KeenAnalysis(analysisConfig);
    const dataviz = new Visualizer({
      type: 'bar',
      container: container.current,
      widget: {
        title: 'Books',
        subtitle: 'Monthly',
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

  return <div style={{ width: '600px', height: '300px' }} ref={container} />;
};

MultipleResults.story = {
  parameters: {
    docs: {
      storyDescription: 'Multiple results displayed in bar groups',
    },
  },
};

export const StackedNormal = () => {
  const container = React.useRef(null);

  React.useEffect(() => {
    const client = new KeenAnalysis(analysisConfig);
    const dataviz = new Visualizer({
      type: 'bar',
      container: container.current,
      widget: {
        title: 'Books',
        subtitle: 'Monthly',
      },
      settings: {
        groupMode: 'stacked',
        stackMode: 'normal',
        barPadding: 0.3,
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

  return <div style={{ width: '600px', height: '300px' }} ref={container} />;
};

StackedNormal.story = {
  parameters: {
    docs: {
      storyDescription: 'Results stacked normal',
    },
  },
};

export const StackedPercentage = () => {
  const container = React.useRef(null);

  React.useEffect(() => {
    const client = new KeenAnalysis(analysisConfig);
    const dataviz = new Visualizer({
      type: 'bar',
      container: container.current,
      widget: {
        title: 'Books',
        subtitle: 'Monthly',
      },
      settings: {
        groupMode: 'stacked',
        stackMode: 'percent',
        barPadding: 0.3,
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

  return <div style={{ width: '600px', height: '300px' }} ref={container} />;
};

StackedPercentage.story = {
  parameters: {
    docs: {
      storyDescription: 'Results stacked percentage',
    },
  },
};

export const Grouped = () => {
  const container = React.useRef(null);

  React.useEffect(() => {
    const client = new KeenAnalysis(analysisConfig);
    const dataviz = new Visualizer({
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
    const dataviz = new Visualizer({
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
        group_by: ['author', 'name'],
      })
      .then((res: any) => dataviz.render(res));
  }, []);

  return <div style={{ width: '600px', height: '300px' }} ref={container} />;
};

DoubleGrouped.story = {
  parameters: {
    docs: {
      storyDescription: 'Results grouped by two properties',
    },
  },
};
