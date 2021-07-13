/* eslint-disable react-hooks/rules-of-hooks, @typescript-eslint/naming-convention */
import * as React from 'react';
import KeenAnalysis from 'keen-analysis';

import KeenDataViz from '../visualizer';

import { analysisConfig } from '../fixture';

import { theme as keenTheme } from '@keen.io/charts';

export default {
  title: 'Visualizations /Heatmap Chart/Dataviz',
  parameters: {
    componentSubtitle: 'Heatmap created with @keen.io/dataviz library',
  },
};

export const simpleResults = () => {
  const container = React.useRef(null);

  React.useEffect(() => {
    const client = new KeenAnalysis(analysisConfig);
    const dataviz = new KeenDataViz({
      type: 'heatmap',
      container: container.current,
      presentationTimezone: 180,
      settings: {
        layout: 'horizontal',
      },
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
          start: '2020-02-01T00:00:00.000+03:00',
          end: '2020-02-01T16:00:00.000+03:00',
        },
        interval: 'hourly',
      })
      .then((res: any) => dataviz.render(res));
  }, []);

  return <div style={{ width: '900px', height: '500px' }} ref={container} />;
};

export const multipleResults = () => {
  const container = React.useRef(null);

  React.useEffect(() => {
    const client = new KeenAnalysis(analysisConfig);
    const dataviz = new KeenDataViz({
      type: 'heatmap',
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

export const DoubleGroupBy = () => {
  const container = React.useRef(null);

  React.useEffect(() => {
    const client = new KeenAnalysis(analysisConfig);
    const dataviz = new KeenDataViz({
      type: 'heatmap',
      container: container.current,
      widget: {
        title: {
          content: 'Book purchases',
        },
        subtitle: {
          content: 'Multiple results',
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
        group_by: ['author', 'name'],
      })
      .then((res: any) => dataviz.render(res));
  }, []);

  return <div style={{ width: '700px', height: '500px' }} ref={container} />;
};

export const PositiveValuesOnly = () => {
  const container = React.useRef(null);

  const data = [
    { name: 'Windows XP 2013', users: 3, licenses: 52, shops: 12 },
    { name: 'MacOS', users: 19, licenses: 82, shops: 15 },
    { name: 'Linux', users: 20, licenses: 0, shops: 23 },
    { name: 'Android', users: 3, licenses: 15, shops: 30 },
  ];

  React.useEffect(() => {
    new KeenDataViz({
      type: 'heatmap',
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
        data,
        keys: ['users', 'licenses', 'shops'],
        labelSelector: 'name',
      },
    }).render();
  }, []);

  return <div style={{ width: '700px', height: '500px' }} ref={container} />;
};

export const NegativeValuesOnly = () => {
  const container = React.useRef(null);

  const data = [
    { name: 'Windows XP 2013', users: -3, licenses: -52, shops: -12 },
    { name: 'MacOS', users: -19, licenses: -82, shops: -15 },
    { name: 'Linux', users: -20, licenses: -0, shops: -23 },
    { name: 'Android', users: -3, licenses: -15, shops: -30 },
  ];

  React.useEffect(() => {
    new KeenDataViz({
      type: 'heatmap',
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
        data,
        keys: ['users', 'licenses', 'shops'],
        labelSelector: 'name',
      },
    }).render();
  }, []);

  return <div style={{ width: '700px', height: '500px' }} ref={container} />;
};

export const PositiveValuesBigger = () => {
  const container = React.useRef(null);

  const data = [
    { name: 'Windows XP 2013', users: -3, licenses: 520000, shops: 12000 },
    { name: 'MacOS', users: 190000, licenses: 82000, shops: 150000 },
    { name: 'Linux', users: 20000, licenses: 0, shops: 2300 },
    { name: 'Android', users: 30000, licenses: 150100, shops: 3000000 },
  ];

  React.useEffect(() => {
    new KeenDataViz({
      type: 'heatmap',
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
        data,
        keys: ['users', 'licenses', 'shops'],
        labelSelector: 'name',
      },
    }).render();
  }, []);

  return <div style={{ width: '700px', height: '500px' }} ref={container} />;
};

export const NegativeValuesBigger = () => {
  const container = React.useRef(null);

  const data = [
    { name: 'Windows XP 2013', users: 3, licenses: -52000, shops: -120000 },
    { name: 'MacOS', users: -1900, licenses: -820000, shops: -1500 },
    { name: 'Linux', users: -200000, licenses: 0, shops: -23000 },
    { name: 'Android', users: -30000, licenses: -15000, shops: -3000000 },
  ];

  React.useEffect(() => {
    new KeenDataViz({
      type: 'heatmap',
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
        data,
        keys: ['users', 'licenses', 'shops'],
        labelSelector: 'name',
      },
    }).render();
  }, []);

  return <div style={{ width: '700px', height: '500px' }} ref={container} />;
};

export const OneKeenThemeColor = () => {
  const container = React.useRef(null);

  const data = [
    { name: 'Marketing', people: -3, licenses: 52, cars: 10, documents: 11 },
    { name: 'IT', people: 19, licenses: 82, cars: 12, documents: 13 },
    { name: 'Sales', people: -20, licenses: 15, cars: 0, documents: 19 },
    { name: 'Product', people: 29, licenses: -12, cars: 2, documents: 29 },
  ];

  React.useEffect(() => {
    new KeenDataViz({
      type: 'heatmap',
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
        data,
        keys: ['users', 'licenses', 'shops'],
        labelSelector: 'name',
        theme: {
          colors: [keenTheme.colors[0]],
        },
      },
    }).render();
  }, []);

  return <div style={{ width: '700px', height: '500px' }} ref={container} />;
};

export const OneCustomThemeColor = () => {
  const container = React.useRef(null);

  const data = [
    { name: 'Marketing', people: -3, licenses: 52, cars: 10, documents: 11 },
    { name: 'IT', people: 19, licenses: 82, cars: 12, documents: 13 },
    { name: 'Sales', people: -20, licenses: 15, cars: 0, documents: 19 },
    { name: 'Product', people: 29, licenses: -12, cars: 2, documents: 29 },
  ];

  React.useEffect(() => {
    new KeenDataViz({
      type: 'heatmap',
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
        data,
        keys: ['users', 'licenses', 'shops'],
        labelSelector: 'name',
        theme: {
          colors: ['#900C3F'],
        },
      },
    }).render();
  }, []);

  return <div style={{ width: '700px', height: '500px' }} ref={container} />;
};
