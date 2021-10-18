import styled from 'styled-components';
import { Typography } from '../../../../types';

export const Head = styled.thead<{
  typography?: Typography;
  backgroundColor: string;
}>`
  ${(props) => props.typography};
  color: ${(props) => props.typography.fontColor};
  background: ${(props) => props.backgroundColor};
  display: flex;
  align-items: center;
  gap: 5px;
  box-sizing: border-box;
  min-height: 20px;
  padding: 20px;
`;
