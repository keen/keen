/* eslint-disable react-hooks/rules-of-hooks, @typescript-eslint/naming-convention */
import * as React from 'react';
import KeenAnalysis from 'keen-analysis';

import KeenDataViz from '../visualizer';

export default {
  title: 'Visualizations|Choropleth Chart/Dataviz',
  parameters: {
    componentSubtitle: 'Choropleth created with @keen.io/dataviz library',
  },
};

const analysisConfig = {
  projectId: '5c87b64ec9e77c0001cf5b6e',
  readKey: 'FB952962910C97DE3E1C6A25EB2FC6B22FDB1ACA9D572948EA18227287BC4E12',
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
