import styled from 'styled-components';
import { colors } from '@keen.io/colors';

export const InteractionLegendWrapper = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: ${colors.gray[500]};
  width: 40px;
  height: 20px;
  opacity: 0.5;
  border-radius: 4px;

  & div {
    display: flex;
    align-content: center;
    justify-content: center;
  }
`;
