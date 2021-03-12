/* eslint-disable react-hooks/rules-of-hooks, @typescript-eslint/naming-convention */
import * as React from 'react';
import KeenAnalysis from 'keen-analysis';

import KeenDataViz from '../visualizer';

export default {
  title: 'Visualizations /Choropleth Chart/Dataviz',
  parameters: {
    componentSubtitle: 'Choropleth created with @keen.io/dataviz library',
  },
};

const analysisConfig = {
  projectId: '5c87b64ec9e77c0001cf5b6e',
  readKey: 'FB952962910C97DE3E1C6A25EB2FC6B22FDB1ACA9D572948EA18227287BC4E12',
};

export const worldMapDoubleGroupBy = () => {
  const container = React.useRef(null);

  React.useEffect(() => {
    const dataviz = new KeenDataViz({
      type: 'choropleth',
      container: container.current,
      settings: {
        tooltipSettings: {
          formatValue: '${number; 0.00}£',
        },
      },
      widget: {
        title: {
          content: 'Homepage views ',
        },
        subtitle: {
          content: 'Worldwide',
        },
      },
    });

    dataviz.render({
      query: {
        analysis_type: 'count',
        event_collection: 'logins',
        timeframe: 'last_14_days',
        group_by: ['user.address.country', 'product.name'],
      },
      result: [
        {
          'product.name': 'Free',
          'user.address.country': 'Germany',
          result: 310,
        },
        {
          'product.name': 'Trial',
          'user.address.country': 'Germany',
          result: 70,
        },
        {
          'product.name': 'Free',
          'user.address.country': 'Poland',
          result: 120,
        },
        {
          'product.name': 'Free',
          'user.address.country': 'United States',
          result: 200,
        },
        {
          'product.name': 'Business',
          'user.address.country': 'United States',
          result: 37,
        },
        {
          'product.name': 'Team',
          'user.address.country': 'United States',
          result: 24,
        },
      ],
    });
  }, []);

  return <div style={{ width: '700px', height: '400px' }} ref={container} />;
};

export const worldMapMatchError = () => {
  const container = React.useRef(null);

  React.useEffect(() => {
    const dataviz = new KeenDataViz({
      type: 'choropleth',
      container: container.current,
      widget: {
        title: {
          content: 'Homepage views ',
        },
        subtitle: {
          content: 'Worldwide',
        },
      },
    });

    dataviz.render({
      query: {
        analysis_type: 'count',
        event_collection: 'logins',
        timeframe: 'last_14_days',
        group_by: ['user.address.country'],
      },
      result: [
        {
          'user.address.country': 'Lermany',
          result: 310,
        },
      ],
    });
  }, []);

  return <div style={{ width: '700px', height: '400px' }} ref={container} />;
};

export const worldMap = () => {
  const container = React.useRef(null);

  React.useEffect(() => {
    const client = new KeenAnalysis(analysisConfig);
    const dataviz = new KeenDataViz({
      type: 'choropleth',
      container: container.current,
      widget: {
        title: {
          content: 'Homepage views ',
        },
        subtitle: {
          content: 'Worldwide',
        },
      },
    });

    client
      .query({
        analysis_type: 'count',
        event_collection: 'homepage_views',
        timeframe: {
          start: '2019-04-13T00:00:00.000-00:00',
          end: '2019-04-14T00:00:00.000-00:00',
        },
        group_by: ['geo.country'],
      })
      .then((res: any) => dataviz.render(res));
  }, []);

  return <div style={{ width: '700px', height: '400px' }} ref={container} />;
};

export const worldMapOrthographic = () => {
  const container = React.useRef(null);

  React.useEffect(() => {
    const client = new KeenAnalysis(analysisConfig);
    const dataviz = new KeenDataViz({
      type: 'choropleth',
      container: container.current,
      widget: {
        title: {
          content: 'Homepage views ',
        },
        subtitle: {
          content: 'Worldwide',
        },
      },
      settings: {
        projection: 'orthographic',
        theme: {
          choropleth: {
            sphere: {
              enabled: true,
            },
            graticule: {
              enabled: true,
            },
          },
        },
      },
    });

    client
      .query({
        analysis_type: 'count',
        event_collection: 'homepage_views',
        timeframe: {
          start: '2019-04-13T00:00:00.000-00:00',
          end: '2019-04-14T00:00:00.000-00:00',
        },
        group_by: ['geo.country'],
      })
      .then((res: any) => dataviz.render(res));
  }, []);

  return <div style={{ width: '400px', height: '300px' }} ref={container} />;
};

export const unitedStatesMap = () => {
  const container = React.useRef(null);

  React.useEffect(() => {
    const client = new KeenAnalysis(analysisConfig);
    const dataviz = new KeenDataViz({
      type: 'choropleth',
      container: container.current,
      widget: {
        title: {
          content: 'Homepage views ',
        },
        subtitle: {
          content: 'United States',
        },
        geographicArea: 'us',
      },
      settings: {
        projection: 'geoAlbersUsa',
        projectionScale: 350,
      },
    });

    client
      .query({
        analysis_type: 'count',
        event_collection: 'homepage_views',
        timeframe: {
          start: '2019-04-13T00:00:00.000-00:00',
          end: '2019-04-14T00:00:00.000-00:00',
        },
        group_by: ['geo.province'],
        filters: [
          {
            propertyName: 'geo.country',
            operator: 'eq',
            propertyValue: 'United States',
          },
        ],
      })
      .then((res: any) => dataviz.render(res));
  }, []);

  return <div style={{ width: '400px', height: '300px' }} ref={container} />;
};
