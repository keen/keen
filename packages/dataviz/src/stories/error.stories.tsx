/* eslint-disable react-hooks/rules-of-hooks, @typescript-eslint/naming-convention */
import * as React from 'react';
import KeenAnalysis from 'keen-analysis';

import KeenDataViz from '../visualizer';

export default {
  title: 'Visualizations /Errors',
  parameters: {
    componentSubtitle: 'Dataviz error handler component',
  },
};

const analysisConfig = {
  projectId: '5c87b64ec9e77c0001cf5b6e',
  readKey: 'FB952962910C97DE3E1C6A25EB2FC6B22FDB1ACA9D572948EA18227287BC4E12',
};

export const invalidQuery = () => {
  const container = React.useRef(null);

  React.useEffect(() => {
    const client = new KeenAnalysis(analysisConfig);
    const dataviz = new KeenDataViz({
      type: 'funnel',
      container: container.current,
      widget: {
        title: {
          content: 'Last month results',
        },
      },
    });

    client
      .query({
        analysis_type: 'count',
        steps: [],
      })
      .then((res) => dataviz.render(res))
      .catch((err) => dataviz.error(err.body));
  }, []);

  return <div style={{ width: '600px', height: '400px' }} ref={container} />;
};
