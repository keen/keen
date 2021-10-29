import styled from 'styled-components';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

export const SelectedRowsWrapper = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 120px;
`;

export const SelectedRowsBox = styled.div`
  background: ${colors.white[500]};
  height: 47px;
  min-width: 316px;
  z-index: 1;
  box-shadow: 0 10px 24px ${transparentize(0.75, colors.black[500])};
  display: flex;
`;

export const SelectedRowsCount = styled.div`
  box-sizing: border-box;
  min-width: 137px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 20px;
  border: 1px solid ${transparentize(0.85, colors.black[500])};
`;

export const Clear = styled.div`
  cursor: pointer;
  min-width: 73px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid ${transparentize(0.85, colors.black[500])};
  border-bottom: 1px solid ${transparentize(0.85, colors.black[500])};
`;

export const Copy = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${colors.green[400]};
  min-width: 106px;
`;
