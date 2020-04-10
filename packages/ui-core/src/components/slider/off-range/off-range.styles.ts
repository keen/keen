import styled from 'styled-components';
import { colors } from '@keen.io/colors';

export const Container = styled.div<{
  position: number;
  size: number;
  borderRadius: number;
}>`
  position: absolute;
  top: 50%;
  left: ${props => props.position}px;
  transform: translateY(-50%);

  width: calc(100% - ${props => props.position}px);
  height: ${props => props.size}px;
  border-radius: ${props => props.borderRadius}px;
  background: ${colors.gray['400']};
`;
