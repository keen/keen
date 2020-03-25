/* eslint-disable react-hooks/rules-of-hooks, @typescript-eslint/camelcase */
import * as React from 'react';
import KeenAnalysis from 'keen-analysis';

import Visualizer from './visualizer';

import { analysisConfig } from './fixture';

export default {
  title: 'Visualizations|Bubble Chart/Dataviz',
  parameters: {
    componentSubtitle: 'Bubble charts created with @keen.io/dataviz library',
  },
};

export const simple = () => {
  const container = React.useRef(null);

  React.useEffect(() => {
    const client = new KeenAnalysis(analysisConfig);
    const dataviz = new Visualizer({
      type: 'bubble',
      container: container.current,
      mapKeys: {
        '0.ad_campaing_view.count.keen.value': 'Views',
        '1.ad_campaing_cost.sum.keen.value': 'Cost',
        '2.ad_campaing_conversion.count.keen.value': 'Conversion',
      },
      widget: {
        title: {
          content: 'Ad Campaing',
        },
        subtitle: {
          content: 'Correlation between views, conversion and cost',
        },
      },
    });

    const conversionQuery = client.query({
      analysis_type: 'count',
      event_collection: 'ad_campaing_conversion',
      group_by: ['channel'],
      timeframe: {
        start: '2020-03-01T00:00:00.000-00:00',
        end: '2020-03-27T00:00:00.000-00:00',
      },
    });

    const viewQuery = client.query({
      analysis_type: 'count',
      event_collection: 'ad_campaing_view',
      group_by: ['channel'],
      timeframe: {
        start: '2020-03-01T00:00:00.000-00:00',
        end: '2020-03-27T00:00:00.000-00:00',
      },
    });

    const costsQuery = client.query({
      analysis_type: 'sum',
      event_collection: 'ad_campaing_cost',
      target_property: 'value',
      group_by: ['channel'],
      timeframe: {
        start: '2020-03-01T00:00:00.000-00:00',
        end: '2020-03-27T00:00:00.000-00:00',
      },
    });

    client
      .run([viewQuery, costsQuery, conversionQuery])
      .then((res: any) => dataviz.render(res));
  }, []);

  return <div style={{ width: '600px', height: '300px' }} ref={container} />;
};
