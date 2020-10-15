import { useState } from 'react';

import { Margins } from '../types';

const useDynamicChartLayout = (
  useDynamicLayout: boolean,
  initialMargins: Margins
) => {
  const [layoutMargins, setLayoutMargins] = useState<Margins>(initialMargins);
  const [layoutReady, setLayoutReady] = useState(!useDynamicLayout);

  return {
    layoutReady,
    layoutMargins,
    setLayoutReady,
    setLayoutMargins,
  };
};

export default useDynamicChartLayout;
