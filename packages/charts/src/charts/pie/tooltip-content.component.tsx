import React, { FC } from 'react';

import { getTooltipContent } from './utils';

import { DataSelector } from '../../types';

type Props = {
  data: Record<string, any>[];
  keys: string[];
  selectors: { selector: DataSelector; color: string }[];
};

export const TooltipContent: FC<Props> = ({ data, keys, selectors }) => {
  const content = getTooltipContent({ data, keys, selectors });

  return (
    <>
      {content.map(({ name, value }) => (
        <div key={`${name}-${value}`}>
          {name} - {value}
        </div>
      ))}
    </>
  );
};

export default TooltipContent;
