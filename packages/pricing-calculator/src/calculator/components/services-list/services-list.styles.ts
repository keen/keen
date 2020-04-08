import styled from 'styled-components';
import { colors } from '@keen.io/colors';

export const Label = styled.div`
  font-size: 16px;
  line-height: 19px;
  color: ${colors.black['300']}
  font-family: 'Lato Regular', sans-serif;
  margin: 0 8px 0 8px;
  cursor: pointer;
`;

export const TooltipContent = styled.div`
  max-width: 180px;
  font-size: 12px;
  line-height: 15px;
  color: ${colors.white['500']}
  font-family: 'Lato Regular', sans-serif;
`;

export const ServiceWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Contaier = styled.div`
  ${ServiceWrapper} + ${ServiceWrapper} {
    margin-top: 20px;
  }
`;
