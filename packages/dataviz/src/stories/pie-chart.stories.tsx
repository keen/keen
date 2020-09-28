/* eslint-disable react-hooks/rules-of-hooks, @typescript-eslint/naming-convention */
import * as React from 'react';
import KeenAnalysis from 'keen-analysis';

import KeenDataviz from '../visualizer';

import { analysisConfig } from '../fixture';

export default {
  title: 'Visualizations|Pie Chart/Dataviz',
  parameters: {
    componentSubtitle: 'Pie charts created with @keen.io/dataviz library',
  },
};

export const ownData = () => {
  const container = React.useRef(null);

  const data = [
    { name: 'JavaScript', jobOffers: 225 },
    { name: 'Python', jobOffers: 122 },
    { name: 'Go', jobOffers: 10 },
    { name: 'PHP', jobOffers: 11 },
    { name: 'Java', jobOffers: 134 },
    { name: 'Scala', jobOffers: 98 },
    { name: 'Groovy', jobOffers: 11 },
  ];

  React.useEffect(() => {
    new KeenDataviz({
      type: 'pie',
      container: container.current,
      widget: {
        title: {
          content: 'Job offers',
        },
        subtitle: {
          content: 'By programming languages',
        },
      },
      settings: {
        data,
        keys: ['jobOffers'],
        labelSelector: 'name',
      },
    }).render();
  }, []);

  return <div style={{ width: '600px', height: '450px' }} ref={container} />;
};

export const singleResult = () => {
  const container = React.useRef(null);

  React.useEffect(() => {
    const client = new KeenAnalysis(analysisConfig);
    const dataviz = new KeenDataviz({
      type: 'pie',
      container: container.current,
      widget: {
        title: {
          content: 'Book purchases',
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
      })
      .then((res: any) => dataviz.render(res));
  }, []);

  return <div style={{ width: '600px', height: '450px' }} ref={container} />;
};

export const simpleResults = () => {
  const container = React.useRef(null);

  React.useEffect(() => {
    const client = new KeenAnalysis(analysisConfig);
    const dataviz = new KeenDataviz({
      type: 'pie',
      container: container.current,
      widget: {
        title: {
          content: 'Book purchases',
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
        interval: 'monthly',
      })
      .then((res: any) => dataviz.render(res));
  }, []);

  return <div style={{ width: '600px', height: '450px' }} ref={container} />;
};

export const multipleResults = () => {
  const container = React.useRef(null);

  React.useEffect(() => {
    const client = new KeenAnalysis(analysisConfig);
    const dataviz = new KeenDataviz({
      type: 'pie',
      container: container.current,
      widget: {
        title: {
          content: 'Book purchases',
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
      })
      .then((res: any) => dataviz.render(res));
  }, []);

  return <div style={{ width: '600px', height: '450px' }} ref={container} />;
};
