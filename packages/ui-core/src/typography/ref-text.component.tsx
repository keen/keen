import React, { FC, forwardRef, Ref } from 'react';
import { Typography } from '../types';
import { BaseText } from './text.component';

type Props = {
  children: React.ReactNode;
  truncate?: boolean;
  ref: Ref<HTMLDivElement>;
} & Typography;

const RefText: FC<Props> = forwardRef(
  ({ children, truncate = false, ...props }, ref) => {
    return (
      <BaseText ref={ref} truncate={truncate} {...props}>
        {children}
      </BaseText>
    );
  }
);

RefText.displayName = 'RefText';

export default RefText;
