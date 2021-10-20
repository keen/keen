import styled from 'styled-components';
import { Typography } from '../../../../types';

export const Head = styled.thead<{
  typography?: Typography;
  backgroundColor: string;
}>`
  ${(props) => props.typography};
  color: ${(props) => props.typography.fontColor};
  background: ${(props) => props.backgroundColor};
  position: sticky;
  top: 0;
  z-index: 1;
`;
