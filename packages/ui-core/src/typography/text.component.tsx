import React from 'react';
import styled, { css } from 'styled-components';
import { typography } from 'styled-system';
import { Typography } from '../types';

type Props = {
  children: React.ReactNode;
  truncate?: boolean;
  /** Type of HTML element */
  htmlElement?: string | React.ComponentType<any>;
} & Typography;

export const BaseText = styled.div<Props>`
  ${typography};
  color: ${(props) => props.fontColor};
  margin: 0;
  padding: 0;

  ${(props) =>
    props.truncate &&
    css`
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `};
`;

const Text = ({
  children,
  truncate = false,
  htmlElement = 'div',
  ...props
}: Props) => (
  <BaseText as={htmlElement} truncate={truncate} {...props}>
    {children}
  </BaseText>
);

export default Text;
