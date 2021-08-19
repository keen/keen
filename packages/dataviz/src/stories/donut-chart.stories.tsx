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

export const multipleResultOthersSlice = () => {
  const container = React.useRef(null);

  React.useEffect(() => {
    const dataviz = new KeenDataViz({
      type: 'donut',
      container: container.current,
      widget: {
        title: {
          content: 'Purchases',
        },
      },
    });

    dataviz.render({
      query: {
        analysis_type: 'count',
        event_collection: 'purchases',
        group_by: ['geo_information.country', 'platform'],
        timeframe: 'this_1400_days',
      },
      result: [
        {
          platform: 'Mobile',
          result: 2,
          'geo_information.country': 'Argentina',
        },
        {
          platform: 'Mobile',
          result: 3,
          'geo_information.country': 'Australia',
        },
        { platform: 'Mobile', result: 1, 'geo_information.country': 'Austria' },
        { platform: 'Mobile', result: 1, 'geo_information.country': 'Belgium' },
        { platform: 'Mobile', result: 1, 'geo_information.country': 'Bolivia' },
        {
          platform: 'Web',
          result: 1,
          'geo_information.country': 'Bosnia and Herzegovina',
        },
        { platform: 'Mobile', result: 4, 'geo_information.country': 'Brazil' },
        { platform: 'Web', result: 1, 'geo_information.country': 'Brazil' },
        { platform: 'Mobile', result: 5, 'geo_information.country': 'Canada' },
        { platform: 'Web', result: 2, 'geo_information.country': 'Canada' },
        { platform: 'Mobile', result: 17, 'geo_information.country': 'China' },
        { platform: 'Web', result: 2, 'geo_information.country': 'China' },
        {
          platform: 'Mobile',
          result: 3,
          'geo_information.country': 'Colombia',
        },
        { platform: 'Web', result: 1, 'geo_information.country': 'Colombia' },
        { platform: 'Mobile', result: 2, 'geo_information.country': 'Congo' },
        { platform: 'Web', result: 1, 'geo_information.country': 'Costa Rica' },
        { platform: 'Mobile', result: 1, 'geo_information.country': 'Croatia' },
        { platform: 'Mobile', result: 1, 'geo_information.country': 'Czechia' },
        { platform: 'Mobile', result: 1, 'geo_information.country': 'Denmark' },
        { platform: 'Mobile', result: 1, 'geo_information.country': 'Ecuador' },
        { platform: 'Mobile', result: 1, 'geo_information.country': 'Finland' },
        { platform: 'Mobile', result: 5, 'geo_information.country': 'France' },
        { platform: 'Web', result: 3, 'geo_information.country': 'France' },
        { platform: 'Mobile', result: 3, 'geo_information.country': 'Germany' },
        { platform: 'Web', result: 2, 'geo_information.country': 'Germany' },
        { platform: 'Mobile', result: 1, 'geo_information.country': 'Greece' },
        { platform: 'Mobile', result: 2, 'geo_information.country': 'Hungary' },
        { platform: 'Mobile', result: 3, 'geo_information.country': 'India' },
        { platform: 'Mobile', result: 1, 'geo_information.country': 'Ireland' },
        { platform: 'Mobile', result: 5, 'geo_information.country': 'Italy' },
        { platform: 'Mobile', result: 11, 'geo_information.country': 'Japan' },
        { platform: 'Web', result: 1, 'geo_information.country': 'Japan' },
        {
          platform: 'Mobile',
          result: 2,
          'geo_information.country': 'Malaysia',
        },
        { platform: 'Mobile', result: 3, 'geo_information.country': 'Mexico' },
        { platform: 'Web', result: 1, 'geo_information.country': 'Mexico' },
        {
          platform: 'Mobile',
          result: 3,
          'geo_information.country': 'Netherlands',
        },
        { platform: 'Mobile', result: 1, 'geo_information.country': 'Norway' },
        { platform: 'Mobile', result: 2, 'geo_information.country': 'Poland' },
        { platform: 'Web', result: 1, 'geo_information.country': 'Poland' },
        {
          platform: 'Mobile',
          result: 11,
          'geo_information.country': 'Republic of Korea',
        },
        {
          platform: 'Web',
          result: 1,
          'geo_information.country': 'Republic of Lithuania',
        },
        {
          platform: 'Mobile',
          result: 1,
          'geo_information.country': 'Republic of Moldova',
        },
        { platform: 'Mobile', result: 1, 'geo_information.country': 'Romania' },
        { platform: 'Mobile', result: 3, 'geo_information.country': 'Russia' },
        {
          platform: 'Mobile',
          result: 2,
          'geo_information.country': 'Singapore',
        },
        {
          platform: 'Mobile',
          result: 1,
          'geo_information.country': 'Slovakia',
        },
        {
          platform: 'Mobile',
          result: 1,
          'geo_information.country': 'South Africa',
        },
        {
          platform: 'Web',
          result: 1,
          'geo_information.country': 'South Africa',
        },
        { platform: 'Mobile', result: 2, 'geo_information.country': 'Sweden' },
        { platform: 'Web', result: 1, 'geo_information.country': 'Sweden' },
        { platform: 'Mobile', result: 4, 'geo_information.country': 'Taiwan' },
        { platform: 'Web', result: 5, 'geo_information.country': 'Taiwan' },
        {
          platform: 'Mobile',
          result: 1,
          'geo_information.country': 'Thailand',
        },
        { platform: 'Mobile', result: 1, 'geo_information.country': 'Turkey' },
        { platform: 'Mobile', result: 1, 'geo_information.country': 'Ukraine' },
        {
          platform: 'Mobile',
          result: 3,
          'geo_information.country': 'United Kingdom',
        },
        {
          platform: 'Mobile',
          result: 82,
          'geo_information.country': 'United States',
        },
        {
          platform: 'Web',
          result: 17,
          'geo_information.country': 'United States',
        },
        { platform: 'Mobile', result: 2, 'geo_information.country': 'Vietnam' },
        { platform: 'Mobile', result: 36, 'geo_information.country': null },
        { platform: 'Web', result: 11, 'geo_information.country': null },
      ],
    });
  }, []);

  return <div style={{ width: '600px', height: '450px' }} ref={container} />;
};
