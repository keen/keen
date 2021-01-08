import React from 'react';
import styled, { css } from 'styled-components';
import { typography } from 'styled-system';
import { Typography } from '../types';

type Props = {
  children: React.ReactNode;
  truncate?: boolean;
} & Typography;

export const BaseText = styled.div<Props>`
  ${typography}
  color: ${(props) => props.fontColor};
  margin: 0;
  padding: 0;

  ${(props) =>
    props.truncate &&
    css`
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `}
`;

const Text = ({ children, truncate = false, ...props }: Props) => (
  <BaseText truncate={truncate} {...props}>
    {children}
  </BaseText>
);

export default Text;
