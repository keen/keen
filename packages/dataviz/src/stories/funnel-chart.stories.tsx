/* eslint-disable react-hooks/rules-of-hooks, @typescript-eslint/naming-convention */
import * as React from 'react';
import KeenAnalysis from 'keen-analysis';

import KeenDataViz from '../visualizer';

export default {
  title: 'Visualizations/Funnel Chart/Dataviz',
  parameters: {
    componentSubtitle: 'Funnel charts created with @keen.io/dataviz library',
  },
};

const analysisConfig = {
  projectId: '5c87b64ec9e77c0001cf5b6e',
  readKey: 'FB952962910C97DE3E1C6A25EB2FC6B22FDB1ACA9D572948EA18227287BC4E12',
};

export const simple = () => {
  const container = React.useRef(null);

  React.useEffect(() => {
    const client = new KeenAnalysis(analysisConfig);
    const dataviz = new KeenDataViz({
      type: 'funnel',
      container: container.current,
      mappings: {
        pageviews: 'Views',
        signups: 'Signups',
        purchases: 'Purchsases',
      },
      widget: {
        title: {
          content: 'Last month results',
        },
      },
    });

    client
      .query({
        analysis_type: 'funnel',
        steps: [
          {
            event_collection: 'pageviews',
            actor_property: 'user.uuid',
            timeframe: {
              start: '2019-03-13T00:00:00.000Z',
              end: '2019-08-14T00:00:00.000Z',
            },
          },
          {
            event_collection: 'signups',
            actor_property: 'user.uuid',
            timeframe: {
              start: '2019-03-13T00:00:00.000Z',
              end: '2019-08-14T00:00:00.000Z',
            },
          },
          {
            event_collection: 'purchases',
            actor_property: 'user.uuid',
            timeframe: {
              start: '2019-03-13T00:00:00.000Z',
              end: '2019-08-14T00:00:00.000Z',
            },
          },
        ],
      })
      .then(res => dataviz.render(res));
  }, []);

  return <div style={{ width: '600px', height: '400px' }} ref={container} />;
};
