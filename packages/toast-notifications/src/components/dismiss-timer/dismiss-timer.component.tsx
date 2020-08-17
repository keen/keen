import React, { FC } from 'react';
import { AppearanceTypes } from 'react-toast-notifications';

import { Progress } from './dismiss-timer.styles';

type Props = {
  /** Apperance variant */
  appearance: AppearanceTypes;
  /** Dismiss time in seconds */
  dismissTime: number;
};

const DismissTimer: FC<Props> = ({ dismissTime, appearance }) => (
  <Progress
    data-testid="dismiss-timer"
    appearance={appearance}
    initial={{ width: '0%' }}
    animate={{ width: '100%' }}
    transition={{
      ease: 'linear',
      duration: dismissTime,
    }}
  />
);

export default DismissTimer;
