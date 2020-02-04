/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react';

import Visualizer from './visualizer';

import { fixture as analysisResponse } from './fixture';

export default {
  title: 'DataViz / Bar Chart',
  parameters: {
    componentSubtitle: 'Displays information about chart data series',
  },
};

export const withKnobs = () => {
  const container = React.useRef(null);

  React.useEffect(() => {
    new Visualizer({
      container: container.current,
    }).render(analysisResponse);
  }, []);

  return <div style={{ width: '600px', height: '300px' }} ref={container} />;
};
