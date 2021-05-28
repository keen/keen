import styled from 'styled-components';
import { colors } from '@keen.io/colors';

export const StyledColorPicker = styled.div`
  width: 220px;
  .sketch-picker {
    box-shadow: none !important;
  }
`;

export const Buttons = styled.div`
  border-top: 1px solid ${colors.gray[300]};
  padding: 8px;
  display: flex;
  justify-content: space-between;
`;
