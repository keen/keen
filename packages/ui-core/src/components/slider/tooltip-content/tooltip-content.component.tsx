import React, { FC } from 'react';

import { TOOLTIP_CONTENT_MAX_WIDTH } from '../constants';

type Props = {
  children: React.ReactNode;
};

const TooltipContent: FC<Props> = ({ children }) => {
  return (
    <div
      style={{
        maxWidth: TOOLTIP_CONTENT_MAX_WIDTH,
        overflowWrap: 'break-word',
        width: 'max-content',
      }}
    >
      {children}
    </div>
  );
};

export default TooltipContent;
