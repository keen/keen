/* eslint-disable react-hooks/rules-of-hooks, @typescript-eslint/naming-convention */
import * as React from 'react';
import KeenAnalysis from 'keen-analysis';

import KeenDataViz from '../visualizer';

import { analysisConfig } from '../fixture';

export default {
  title: 'Visualizations /Donut Chart/Dataviz',
  parameters: {
    componentSubtitle: 'Donut charts created with @keen.io/dataviz library',
  },
};

export const singleResult = () => {
  const container = React.useRef(null);

  React.useEffect(() => {
    const client = new KeenAnalysis(analysisConfig);
    const dataviz = new KeenDataViz({
      type: 'donut',
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

  return <div style={{ width: '500px', height: '500px' }} ref={container} />;
};

export const simpleResults = () => {
  const container = React.useRef(null);

  React.useEffect(() => {
    const client = new KeenAnalysis(analysisConfig);
    const dataviz = new KeenDataViz({
      type: 'donut',
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

  return <div style={{ width: '500px', height: '500px' }} ref={container} />;
};

export const multipleResults = () => {
  const container = React.useRef(null);

  React.useEffect(() => {
    const client = new KeenAnalysis(analysisConfig);
    const dataviz = new KeenDataViz({
      type: 'donut',
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

  return <div style={{ width: '500px', height: '500px' }} ref={container} />;
};

const keenAnalysisConfig = {
  projectId: '5de6365c46e0fb00016563bc',
  readKey:
    'E6100206A8F145BB407AD97B2928CB53BA965CBC9C2304FA3BCBC8CFAA10A290F341286293F89CE884E52E20A9922FBC3300043834A0448285197AAE4669D34248A2D5CD15DB9D5E1C9551F870E43E0156DB478D635B99C125CDFC0B4ED52F5E',
  host: 'staging-api.keen.io',
};

export const multipleResultOthersSlice = () => {
  const container = React.useRef(null);

  React.useEffect(() => {
    const client = new KeenAnalysis(keenAnalysisConfig);
    const dataviz = new KeenDataViz({
      type: 'donut',
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
        event_collection: 'purchases',
        timeframe: 'this_1400_days',
        group_by: ['geo_information.country', 'platform'],
      })
      .then((res: any) => dataviz.render(res));
  }, []);

  return <div style={{ width: '600px', height: '450px' }} ref={container} />;
};
