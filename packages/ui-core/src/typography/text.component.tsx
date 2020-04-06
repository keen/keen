import React, { FC, forwardRef } from 'react';
import styled, { css } from 'styled-components';
import { typography } from 'styled-system';
import { Typography } from '../types';

type Props = {
  children: React.ReactNode;
  truncate?: boolean;
  ref?: any;
} & Typography;

const BaseText = styled.div<Props>`
  ${typography}
  color: ${props => props.fontColor};

  ${props =>
    props.truncate &&
    css`
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `}
`;

const Text: FC<Props> = forwardRef(
  ({ children, truncate = false, ...props }, ref) => {
    return (
      <BaseText ref={ref} truncate={truncate} {...props}>
        {children}
      </BaseText>
    );
  }
);

Text.displayName = 'Text';

export default Text;
