import React from 'react';
import styled from 'styled-components';
import { typography } from 'styled-system';
import { Typography } from '../types';

type Props = {
  children: React.ReactNode;
} & Typography;

const BaseText = styled.div<Props>`
  ${typography}
  color: ${props => props.fontColor}
`;

const Text = ({ children, ...props }: Props) => (
  <BaseText {...props}>{children}</BaseText>
);

export default Text;
