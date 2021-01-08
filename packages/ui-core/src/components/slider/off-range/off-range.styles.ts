import styled from 'styled-components';
import { colors } from '@keen.io/colors';

export const Container = styled.div<{
  borderRadius: number;
}>`
  border-radius: ${(props) => props.borderRadius}px;
  background: ${colors.gray['400']};
`;
